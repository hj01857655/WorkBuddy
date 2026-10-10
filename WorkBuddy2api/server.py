# -*- coding: utf-8 -*-
"""WorkBuddy2api — WorkBuddy 本地 OpenAI 兼容网关（Python 版）。

把 WorkBuddy 云端的 ``/v2/chat/completions`` 包装成标准 OpenAI Chat Completions，
任意支持自定义 Base URL 的客户端（Cherry Studio / Cline / OpenAI SDK）指向
``http://127.0.0.1:8377/v1`` 即可使用 WorkBuddy 云端模型，``usage.credit`` 随响应透传。

启动:
    pip install -r requirements.txt
    python server.py

默认监听 ``127.0.0.1:8377``（避开 codearts2api 占用的 8787）。
环境变量：``HOST`` / ``PORT`` / ``API_KEY``（设了 API_KEY 则要求 Bearer 本地鉴权），
可写在项目根目录的 ``.env`` 里。
"""
import json
import logging
import os
import subprocess
import sys
import threading
import time
import uuid
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler

import requests
from dotenv import load_dotenv
from flask import Flask, Response, g, jsonify, request

import credential
import workbuddy

# 加载 .env（项目根目录），让 API_KEY 等配置可写在文件里
load_dotenv()

LISTEN_HOST = os.getenv("HOST", "127.0.0.1")
LISTEN_PORT = int(os.getenv("PORT", "8377"))
API_KEY = os.getenv("API_KEY", "").strip()

app = Flask(__name__)
PANEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "panel.html")


# ── 本地鉴权与 CORS ───────────────────────────────────────────────────
def _authorized() -> bool:
    """未设 API_KEY 时仅监听回环、不校验；设了就要求 Bearer 匹配。"""
    if not API_KEY:
        return True
    return request.headers.get("Authorization", "") == "Bearer " + API_KEY


def _cors(resp: Response) -> Response:
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return resp


@app.after_request
def after_request(resp: Response) -> Response:
    return _cors(resp)


def _guard():
    """返回 None 表示放行，否则返回一个 401 响应。"""
    if _authorized():
        return None
    return _cors(jsonify({"error": {"message": "invalid api key", "type": "auth_error"}})), 401


# ── 请求日志（与 qoder2api 同一标准：request.log 轮转 + rid + in:/done: 双行）──
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "request.log")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        RotatingFileHandler(LOG_FILE, maxBytes=2 * 1024 * 1024, backupCount=3, encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)
# werkzeug 访问行在响应*开始*时打（流式会误导，且与 done 行重复），禁掉
logging.getLogger("werkzeug").disabled = True

# ── 请求/响应原文落盘（默认 dumps/，DUMP_DIR 改路径，DUMP=0 关闭）─────────────
# 只落 body 原文，绝不落 HTTP header：Authorization 里是明文网关 key，且 body 需可直接重放
DUMP_DIR = os.environ.get("DUMP_DIR", "") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "dumps")
DUMP_ON = os.environ.get("DUMP", "1").strip() != "0"
DUMP_MAX_BYTES = 512 * 1024   # 单方向落盘上限，防超大响应撑爆磁盘
DUMP_MAX_FILES = int(os.environ.get("DUMP_MAX_FILES", "200"))  # ≤0 表示不轮转

_seq_lock = threading.Lock()
_req_seq = 0


def _next_req_id():
    global _req_seq
    with _seq_lock:
        _req_seq += 1
        return "r%04d" % _req_seq


def _dump_trim():
    """dump 数量超过 DUMP_MAX_FILES 时按 mtime 删最旧（明文提示词会无限增长）。"""
    if DUMP_MAX_FILES <= 0:
        return
    try:
        entries = sorted((e for e in os.scandir(DUMP_DIR) if e.is_file()),
                         key=lambda e: e.stat().st_mtime)
    except OSError:
        return
    for stale in entries[:len(entries) - DUMP_MAX_FILES]:
        try:
            os.remove(stale.path)
        except OSError:
            pass


def _dump_save(rid, kind, data):
    """把请求/响应原文落盘到 dumps/<rid>.<kind>.txt（DUMP=0 时跳过）。"""
    if not DUMP_ON or not data:
        return
    try:
        os.makedirs(DUMP_DIR, exist_ok=True)
        text = data if isinstance(data, str) else data.decode("utf-8", "replace")
        truncated = len(text) > DUMP_MAX_BYTES
        path = os.path.join(DUMP_DIR, "%s.%s.txt%s" % (rid, kind, ".truncated" if truncated else ""))
        with open(path, "w", encoding="utf-8") as f:
            f.write(text[:DUMP_MAX_BYTES])
        _dump_trim()
    except OSError as e:
        logger.warning("[%s] 落盘失败: %s", rid, e)


@app.before_request
def _log_request():
    """rid/t0 在最早的 before_request 赋值（401 短路也要有 done 行可关联）。"""
    g.rid = _next_req_id()
    g.t0 = time.time()
    if request.path in ("/", "/admin", "/health", "/favicon.ico"):
        return
    body = request.get_data(as_text=True)
    summary = ""
    try:
        j = json.loads(body)
        summary = "model=%s msgs=%d tools=%d stream=%s" % (
            j.get("model"), len(j.get("messages") or []),
            len(j.get("tools") or []), j.get("stream"))
    except Exception:
        pass
    # UA 是日志里唯一的客户端归因维度（API key 全客户端共用、ip 恒为 127.0.0.1）；
    # 折掉换行防伪造多行日志
    ua = (request.headers.get("User-Agent") or "-").replace("\r", " ").replace("\n", " ")
    logger.info("[%s] in: %s %s | %s | ua=%s | body=%dB",
                g.rid, request.method, request.path, summary or "n/a", ua, len(body))
    _dump_save(g.rid, "req", body)
    return None


@app.after_request
def _log_response(response):
    """非流式记 done 并落盘 dumps/<rid>.resp.txt；流式响应不能在这里读取（会整块缓冲），
    完成行与落盘由 _stream_log 在流末发出。"""
    if request.path in ("/", "/admin", "/health", "/favicon.ico"):
        return response
    if response.is_streamed:
        return response
    try:
        resp_body = response.get_data(as_text=True)
    except Exception:
        return response
    logger.info("[%s] done: status=%d %dB %.1fs",
                getattr(g, "rid", "?"), response.status_code,
                len(resp_body), time.time() - getattr(g, "t0", time.time()))
    _dump_save(getattr(g, "rid", "?"), "resp", resp_body)
    return response


def _stream_log(gen, rid, t0):
    """包裹 SSE 生成器：TTFT、字节数、原文落盘 dumps/<rid>.resp.txt、done/断开/中断日志。
    rid/t0 必须在请求上下文中取出后传入（生成器被消费时 g 已销毁）。"""
    total = 0
    ttft = None
    buf = [] if DUMP_ON else None
    try:
        for piece in gen:
            if ttft is None:
                ttft = time.time() - t0
            total += len(piece)
            if buf is not None:
                buf.append(piece)
            yield piece
        if buf is not None:
            _dump_save(rid, "resp", b"".join(buf))
        logger.info("[%s] done: stream %dB %.1fs ttft=%s",
                    rid, total, time.time() - t0,
                    ("%.1fs" % ttft) if ttft is not None else "-")
    except GeneratorExit:
        logger.warning("[%s] client 断开: stream %dB %.1fs", rid, total, time.time() - t0)
        raise
    except Exception as e:
        logger.error("[%s] stream 中断: %s (%dB %.1fs)", rid, e, total, time.time() - t0)
        raise


# ── 上游错误归一 ──────────────────────────────────────────────────────
def _upstream_error(resp) -> tuple:
    """把上游错误转成 OpenAI error 结构。

    401 等网关层拦截返回的是 HTML，**绝不能原样吐给客户端**——统一成 502 + JSON。
    扁平码族 ``{code,msg,displayMsg}`` 里的 ``code`` 是通用码，语义看 ``msg``。
    """
    text = ""
    try:
        text = resp.text[:2000]
    except requests.RequestException:
        text = ""
    ctype = (resp.headers.get("Content-Type") or "").lower()

    if "json" in ctype:
        try:
            body = resp.json()
        except ValueError:
            body = None
        if isinstance(body, dict):
            message = body.get("msg") or body.get("message") or text
            display = body.get("displayMsg") or {}
            if isinstance(display, dict) and display.get("zh"):
                message = "%s（%s）" % (message, display["zh"])
            return jsonify({"error": {
                "message": message,
                "type": "workbuddy_error",
                "code": body.get("code"),
            }}), resp.status_code

    return jsonify({"error": {
        "message": "上游网关拦截（HTTP %s，非 JSON 响应）" % resp.status_code,
        "type": "upstream_error",
        "code": resp.status_code,
    }}), 502


# ── OpenAI 兼容面 ─────────────────────────────────────────────────────
@app.route("/v1/models", methods=["GET", "OPTIONS"])
def list_models():
    if request.method == "OPTIONS":
        return _cors(Response(""))
    denied = _guard()
    if denied:
        return denied
    try:
        models = workbuddy.list_models()
    except Exception as error:
        return _cors(jsonify({"error": {"message": str(error), "type": "upstream_error"}})), 502
    # 带上本账号可调性结果（未探测的模型返回 callable=null，呌面板/管理员跑探测）
    probe = workbuddy.load_probe()
    return _cors(jsonify({
        "object": "list",
        "data": [workbuddy.to_openai_model(model, probe.get(model.get("id")))
                 for model in models if model.get("id")],
    }))


@app.route("/v1/chat/completions", methods=["POST", "OPTIONS"])
def chat_completions():
    if request.method == "OPTIONS":
        return _cors(Response(""))
    denied = _guard()
    if denied:
        return denied

    body = request.get_json(silent=True)
    if not isinstance(body, dict) or not body.get("messages"):
        return _cors(jsonify({"error": {
            "message": "invalid request: 'messages' is required",
            "type": "invalid_request_error",
        }})), 400

    payload = workbuddy.build_payload(body)
    model = payload["model"]
    want_stream = bool(body.get("stream"))
    want_usage = bool((body.get("stream_options") or {}).get("include_usage"))
    chunk_id = "chatcmpl-" + uuid.uuid4().hex[:24]

    try:
        cred = credential.load()
        upstream = workbuddy.open_chat_stream(payload, cred)
    except Exception as error:
        return _cors(jsonify({"error": {"message": str(error), "type": "upstream_error"}})), 502

    if upstream.status_code != 200:
        with upstream:
            status_body, status_code = _upstream_error(upstream)
        return _cors(status_body), status_code

    if not want_stream:
        with upstream:
            result = workbuddy.aggregate(upstream, model, chunk_id)
        return _cors(Response(
            json.dumps(result, ensure_ascii=False, separators=(",", ":")).encode("utf-8"),
            status=200,
            content_type="application/json; charset=utf-8",
        ))

    def generate():
        finish_reason, usage, saw_tool_calls, sent_role = None, None, False, False
        try:
            for kind, value in workbuddy.iter_sse(upstream):
                if kind == "done":
                    break
                if kind == "content":
                    frame = workbuddy.make_chunk(chunk_id, model, {"content": value})
                elif kind == "reasoning":
                    frame = workbuddy.make_chunk(chunk_id, model, {"reasoning_content": value})
                elif kind == "tool_calls":
                    saw_tool_calls = True
                    frame = workbuddy.make_chunk(chunk_id, model, {"tool_calls": value})
                elif kind == "finish":
                    finish_reason = value
                    continue
                elif kind == "usage":
                    usage = value
                    continue
                else:
                    continue
                if not sent_role:
                    # 上游每帧都带 delta.role，但 OpenAI 惯例是只首帧带角色，
                    # 客户端靠它初始化 message（与 stream=false 的 message.role 对齐）
                    first = frame["choices"][0]
                    first["delta"] = dict({"role": "assistant"}, **(first.get("delta") or {}))
                    sent_role = True
                yield b"data: " + json.dumps(
                    frame, ensure_ascii=False, separators=(",", ":")
                ).encode("utf-8") + b"\n\n"

            # 收尾：上游 finish_reason 与 usage 内联在同一帧，这里拆成标准形态下发
            tail = workbuddy.make_chunk(
                chunk_id, model, {},
                finish_reason or ("tool_calls" if saw_tool_calls else "stop"),
            )
            if usage and not want_usage:
                tail["usage"] = usage        # 客户端没要独立 usage 帧时内联在收尾帧
            yield b"data: " + json.dumps(
                tail, ensure_ascii=False, separators=(",", ":")
            ).encode("utf-8") + b"\n\n"
            if usage and want_usage:
                yield b"data: " + json.dumps(
                    workbuddy.make_chunk(chunk_id, model, {}, usage=usage),
                    ensure_ascii=False, separators=(",", ":"),
                ).encode("utf-8") + b"\n\n"
            yield b"data: [DONE]\n\n"
        finally:
            upstream.close()

    resp = Response(_stream_log(generate(), g.rid, g.t0), status=200,
                    mimetype="text/event-stream")
    resp.headers["Cache-Control"] = "no-cache, no-transform"
    resp.headers["X-Accel-Buffering"] = "no"
    return _cors(resp)


@app.route("/health", methods=["GET", "OPTIONS"])
def health():
    if request.method == "OPTIONS":
        return _cors(Response(""))
    return _cors(jsonify({"ok": True, "service": "WorkBuddy2api"}))


# ── 管理面板 ──────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
@app.route("/admin", methods=["GET"])
def serve_panel():
    with open(PANEL_PATH, "r", encoding="utf-8") as file:
        return Response(file.read(), content_type="text/html; charset=utf-8")


@app.route("/admin/api/overview", methods=["GET", "OPTIONS"])
def admin_overview():
    if request.method == "OPTIONS":
        return _cors(Response(""))
    denied = _guard()
    if denied:
        return denied

    info = {"uid": "", "nickname": "", "domain": "", "valid": False,
            "remain_text": "—", "notice": ""}
    try:
        cred = credential.load()
        info.update({
            "uid": cred["uid"],
            "nickname": cred["nickname"],
            "domain": cred["domain"],
            "valid": bool(cred["token"]),
            "remain_text": credential.remain_text(cred["expires_at"]),
        })
    except Exception as error:
        info["notice"] = str(error)

    models = []
    probe = workbuddy.load_probe()
    try:
        for model in workbuddy.list_models():
            if not model.get("id"):
                continue
            models.append({
                "id": model["id"],
                "name": model.get("name") or model["id"],
                "vendor": model.get("vendor") or "",
                "credits": model.get("credits") or "",
                "tools": bool(model.get("supportsToolCall")),
                "images": bool(model.get("supportsImages")),
                "efforts": (model.get("reasoning") or {}).get("supportedEfforts") or [],
                "callable": (probe.get(model["id"]) or {}).get("callable"),
            })
    except Exception as error:
        info["notice"] = info["notice"] or str(error)

    probed = [m for m in models if m.get("callable") is not None]
    return _cors(jsonify({
        "service": "WorkBuddy2api",
        "credential": info,
        "models": models,
        "local_auth": bool(API_KEY),
        "probe": {"done": len(probed), "total": len(models),
                  "unavailable": sum(1 for m in probed if m["callable"] is False)},
        # 提醒：usage.completion_tokens_details.reasoning_tokens 在 WorkBuddy 上恒为 0，
        # 真实思维链量在 usage.completion_thinking_tokens
        "usage_note": "reasoning_tokens 恒为 0；真实思维链量看 completion_thinking_tokens",
    }))


@app.route("/admin/api/refresh-token", methods=["POST", "OPTIONS"])
def admin_refresh_token():
    if request.method == "OPTIONS":
        return _cors(Response(""))
    denied = _guard()
    if denied:
        return denied
    try:
        credential.refresh()
        return _cors(jsonify({"ok": True, "message": "令牌已刷新"}))
    except Exception as error:
        return _cors(jsonify({"ok": False, "message": str(error)})), 500


@app.route("/admin/api/probe-models", methods=["POST", "OPTIONS"])
def admin_probe_models():
    """逐模型实一发极小请求，标出本账号到底哪些模型调得动。

    会向真实模型发请求（每个 `max_tokens=8`，credit 小但非零），所以只给手动触发。
    """
    if request.method == "OPTIONS":
        return _cors(Response(""))
    denied = _guard()
    if denied:
        return denied
    force = bool((request.get_json(silent=True) or {}).get("force"))
    try:
        cache = workbuddy.probe_models(force=force)
    except Exception as error:
        return _cors(jsonify({"ok": False, "message": str(error)})), 502
    ok = [k for k, v in cache.items() if v.get("callable")]
    bad = {k: v.get("code") for k, v in cache.items()
           if v.get("probed") and not v.get("callable")}
    unknown = [k for k, v in cache.items() if not v.get("probed")]
    logger.info("[probe] 可调 %d / 不可调 %d / 未判定 %d %s",
                len(ok), len(bad), len(unknown), bad)
    return _cors(jsonify({"ok": True, "callable": len(ok), "unavailable": bad,
                          "undecided": unknown,
                          "message": "可调 %d 个，不可调 %d 个，未判定 %d 个（网络抖动不计结论）"
                                     % (len(ok), len(bad), len(unknown))}))


# ── 每日自动签到（qoder2api 同款：daemon 线程，启动补签 + 每天定点）───────────
# 签到 CLI 就在本目录（checkin.py）：网关自包含，不引用反代目录以外的文件
CHECKIN_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "checkin.py")
CHECKIN_HOUR = 10  # 每天 10:00（本地时间）


def _run_checkin(reason: str) -> None:
    """调签到 CLI 跑一次 claim（幂等：已签会返回「今天已签到过」）"""
    try:
        # 强制子进程 UTF-8：Windows 控制台默认 GBK，打不出 ℹ/emoji 会直接
        # UnicodeEncodeError 崩掉签到（17:41 实测 exit=1）
        env = dict(os.environ, PYTHONIOENCODING="utf-8")
        r = subprocess.run(
            [sys.executable, CHECKIN_SCRIPT, "claim"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=60, env=env,
            cwd=os.path.dirname(os.path.abspath(CHECKIN_SCRIPT)),
        )
        out = (r.stdout or r.stderr or "").strip().splitlines()
        tail = out[-1] if out else "(无输出)"
        logger.info("[checkin] %s: exit=%s %s", reason, r.returncode, tail[:120])
    except Exception as e:
        logger.warning("[checkin] %s 失败: %s", reason, e)


def _checkin_loop() -> None:
    """启动时先补签一次（防反代重启错过签到点），之后每天 CHECKIN_HOUR 点整跑"""
    # 启动补签：今天已签则幂等返回，无副作用
    _run_checkin("启动补签")
    while True:
        now = datetime.now()
        target = now.replace(hour=CHECKIN_HOUR, minute=0, second=0, microsecond=0)
        if now >= target:
            target += timedelta(days=1)
        wait = (target - now).total_seconds()
        logger.info("[checkin] 下次签到: %s（%.0fs 后）", target.strftime("%Y-%m-%d %H:%M"), wait)
        time.sleep(wait)
        _run_checkin("定时签到")


if __name__ == "__main__":
    try:
        cred = credential.load()
        print("凭证账号: %s (%s)" % (cred["nickname"] or "未命名", cred["uid"]))
        print("令牌有效期: %s" % credential.remain_text(cred["expires_at"]))
    except Exception as error:
        print("凭证不可用: %s" % error)
        print("请先运行签到脚本引导凭据：python checkin.py doctor")
    print("WorkBuddy2api 已启动: http://%s:%s" % (LISTEN_HOST, LISTEN_PORT))
    print("OpenAI Base URL: http://%s:%s/v1" % (LISTEN_HOST, LISTEN_PORT))
    print("本地鉴权: %s" % ("已开启（API_KEY）" if API_KEY else "未开启（仅回环）"))
    threading.Thread(target=_checkin_loop, daemon=True).start()
    app.run(host=LISTEN_HOST, port=LISTEN_PORT, threaded=True)
