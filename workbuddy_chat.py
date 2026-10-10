#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorkBuddy 聊天接口参考客户端（OpenAI 兼容 · SSE）

特点是「把 SSE 的坑都填了」，而不是「调通就行」：
  · 逐行读，绝不 read()  —— SSE 一次性读会挂住
  · 先判 [DONE] 再 parse —— 否则对哨兵做 JSON.parse 会抛异常
  · 心跳注释帧（: heartbeat）直接跳过
  · finish_reason 判 ("stop","length","tool_calls","content_filter")，而不是判 None
  · usage 从 finish 帧里取（本接口不单独发 usage 帧）
  · reasoning_content 与 reasoning 二选一，避免思维链翻倍
  · tool_calls 按 index 合并、id/name 只在首帧、arguments 拼接后再解析
  · 401 响应是 HTML，先看 Content-Type 再决定怎么解析
  · 坏帧容错：单帧解析失败不中断整条流

用法：
    python workbuddy_chat.py "用一句话解释量子纠缠"
    python workbuddy_chat.py --model kimi-k3 --show-reasoning "你好"
    python workbuddy_chat.py --tools @tools.json --show-tools "北京天气"
    python workbuddy_chat.py --raw "hi"          # 打印原始 SSE 行（调试用）
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
import uuid

# ----------------------------------------------------------------- 配置
CN_URL = "https://copilot.tencent.com/v2/chat/completions"
GLOBAL_URL = "https://www.workbuddy.ai/v2/chat/completions"
# global 实测分叉：先 /console/chat/completions，404/405 再回退 /v2/chat/completions
GLOBAL_ALT = "https://www.workbuddy.ai/console/chat/completions"

AUTH_STORE = os.path.join(os.path.expanduser("~"), ".workbuddy", "checkin", "auth.json")
APP_VERSION = "5.6.2"

# 官方默认：上游总超时 570s、心跳判死 60s、请求体上限 32MB
UPSTREAM_TIMEOUT = 570
HEARTBEAT_TIMEOUT = 60
MAX_BODY_BYTES = 33554432

DONE_SENTINELS = ("[DONE]",)
FINAL_REASONS = ("stop", "length", "content_filter", "tool_calls")


def die(msg: str, code: int = 1):
    print("错误：%s" % msg, file=sys.stderr)
    raise SystemExit(code)


# ----------------------------------------------------------------- 凭据
def load_cred() -> dict:
    """从本机登录态读凭据（由签到脚本引导生成，只读）。"""
    if not os.path.isfile(AUTH_STORE):
        die("未找到 %s\n  请先运行签到脚本引导凭据：python workbuddy2api/checkin.py doctor" % AUTH_STORE)
    try:
        d = json.load(open(AUTH_STORE, encoding="utf-8"))
    except (OSError, ValueError) as e:
        die("凭据文件无法解析：%s" % e)
    for k in ("accessToken", "uid", "domain"):
        if not d.get(k):
            die("凭据缺少字段 %s，请重新运行签到脚本引导" % k)
    return d


def build_headers(cred: dict) -> dict:
    """
    官方全量头（见《聊天接口规格》第四节）。

    注意分工：**会话级头整场不变，请求级头逐请求生成**。
    官方注释点名后果：会话级头若逐请求变化，
    「同一次桌面操作的几十次调用会在网关侧被拆成几十个会话」。
    """
    tok, uid, dom = cred["accessToken"], cred["uid"], cred["domain"]
    eid = str(cred.get("enterpriseId") or "")

    trace_id = uuid.uuid4().hex                 # 16 字节
    span_id = uuid.uuid4().hex[:16]             # 8 字节
    parent_id = uuid.uuid4().hex[:16]

    # 会话级：进程内固定；跨进程调用可传入以便真正复用同一会话
    conv_id = os.environ.get("WB_CONVERSATION_ID") or str(uuid.uuid4())
    conv_req_id = os.environ.get("WB_CONVERSATION_REQUEST_ID") or str(uuid.uuid4())

    h = {
        "Authorization": "Bearer " + tok,
        "Content-Type": "application/json",
        # 官方此处是 application/json（不是 text/event-stream）——实测两种都 200
        "Accept": "application/json",
        # 官方强制：SSE 不能被压缩缓冲
        "Accept-Encoding": "identity",
        # 网关准入约定
        "x-requested-with": "XMLHttpRequest",
        # —— 会话级（须稳定）——
        "X-Conversation-ID": conv_id,
        "X-Conversation-Request-ID": conv_req_id,
        # —— 请求级（逐请求生成）——
        "X-Conversation-Message-ID": str(uuid.uuid4()),
        "X-Request-ID": str(uuid.uuid4()),
        "X-Agent-Intent": "craft",
        "X-Agent-Purpose": "conversation",
        "x-codebuddy-request": "1",
        # —— 产品身份 ——
        "X-Product": "SaaS",
        "X-IDE-Type": "WorkBuddy",
        "X-IDE-Name": "WorkBuddy",
        "X-IDE-Version": APP_VERSION,
        "X-Private-Data": "true",
        # —— 账号 ——
        "X-User-Id": uid,
        "X-Domain": dom,
        # —— trace 三件套共享同一 traceId ——
        "traceparent": "00-%s-%s-01" % (trace_id, span_id),
        "b3": "%s-%s-1-%s" % (trace_id, span_id, parent_id),
        "X-Trace-ID": trace_id,
    }
    if eid:
        h["X-Enterprise-Id"] = eid
        h["X-Tenant-Id"] = eid
    return h


# ----------------------------------------------------------------- 请求
def pick_url(cred: dict) -> str:
    dom = str(cred.get("domain") or "")
    return GLOBAL_URL if "workbuddy.ai" in dom else CN_URL


def make_request(url: str, headers: dict, body: dict):
    raw = json.dumps(body, ensure_ascii=False).encode("utf-8")
    if len(raw) > MAX_BODY_BYTES:
        die("请求体 %d 字节，超过上限 %d（官方代理限制）" % (len(raw), MAX_BODY_BYTES))
    req = urllib.request.Request(url, data=raw, headers=headers, method="POST")
    # 绕过环境里的本地代理：SSE 经代理容易被缓冲/掐断
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    return opener.open(req, timeout=UPSTREAM_TIMEOUT)


def explain_http_error(e: urllib.error.HTTPError) -> str:
    """按 Content-Type 分支解析错误；401 是 HTML，不能当 JSON 解。"""
    ctype = (e.headers.get("Content-Type") or "").lower()
    raw = e.read(2048)
    text = raw.decode("utf-8", "replace")

    if "json" not in ctype:
        first = " ".join(text.split())[:200]
        return "HTTP %s（非 JSON 响应，网关层拦截）\n  %s" % (e.code, first)

    try:
        j = json.loads(text)
    except ValueError:
        return "HTTP %s（JSON 解析失败）\n  %s" % (e.code, text[:200])

    lines = ["HTTP %s  code=%s  msg=%s" % (e.code, j.get("code"), j.get("msg"))]
    # 三语展示文案 —— 直接给用户看，别自己编
    dm = j.get("displayMsg") or {}
    dt = j.get("displayTips") or {}
    if dm.get("zh"):
        lines.append("  提示：%s" % dm["zh"])
    if dt.get("zh"):
        lines.append("  建议：%s" % dt["zh"])
    if j.get("actions"):
        lines.append("  可选动作：%s" % ", ".join(j["actions"]))
    # extError.param 直接指明是哪个字段被拒 —— 排查利器
    ee = j.get("extError") or {}
    if ee.get("param"):
        lines.append("  问题字段：%s（%s）" % (ee["param"], ee.get("code")))
    if j.get("requestId"):
        lines.append("  requestId：%s" % j["requestId"])
    return "\n".join(lines)


# ----------------------------------------------------------------- SSE
def iter_sse(resp):
    """
    产出 (kind, payload)：
      kind="reasoning" | "content" | "finish" | "usage" | "raw"

    严格按官方 parseSSELine 的语义：
      ① 空行 = 帧终止；② ':' 开头 = 注释（心跳）；③ 只剥一个前导空格；
      ④ 多行 data 直接拼接（注意：不是按 SSE 规范用 \\n 连接）。
    """
    buf = ""
    for raw_line in resp:                      # ★ 逐行迭代，不要 resp.read()
        line = raw_line.decode("utf-8", "replace").rstrip("\r\n")

        # ① 空行 → 派发
        if line == "":
            if not buf:
                continue
            payload, buf = buf, ""
            if payload.strip() in DONE_SENTINELS:
                yield ("done", None)
                return
            yield ("raw", payload)
            try:
                chunk = json.loads(payload)
            except ValueError:
                continue                        # 坏帧不致命，跳过
            for ch in chunk.get("choices") or []:
                d = ch.get("delta") or {}
                # reasoning_content 优先；同帧有 reasoning 时**不要**都累加
                rc = d.get("reasoning_content")
                if isinstance(rc, str) and rc:
                    yield ("reasoning", rc)
                else:
                    rr = d.get("reasoning")
                    if isinstance(rr, str) and rr:
                        yield ("reasoning", rr)
                c = d.get("content")
                if isinstance(c, str) and c:
                    yield ("content", c)
                # tool_calls 增量：原样透传，由调用方按 index 合并
                # （规则见《聊天接口规格》6.12：按 index 合并、id/name 只在首帧、
                #   arguments 是流式 JSON 片段须先拼接 —— 合并逻辑不放在这里，
                #   因为解析器只管拆帧，不管状态）
                tcs = d.get("tool_calls")
                if tcs:
                    yield ("tool_calls", tcs)
                fr = ch.get("finish_reason")
                # ② 进行中是 ""（空串）而非 null —— 必须按 value 判，不能判 None
                if fr:
                    yield ("finish", fr)
            if chunk.get("usage"):
                yield ("usage", chunk["usage"])
            continue

        # ③ 注释帧（: heartbeat）
        if line.startswith(":"):
            continue

        # ④ 解析 field: value
        i = line.find(":")
        if i == -1:
            continue
        field, value = line[:i], line[i + 1:]
        if value.startswith(" "):
            value = value[1:]
        if field == "data":
            buf += value
        # event / id 本接口不发，忽略


# ----------------------------------------------------------------- 主流程
def run(args) -> int:
    cred = load_cred()
    url = args.url or pick_url(cred)

    body = {
        "model": args.model,
        "stream": True,                          # ★ 硬要求，不传就 400/11101
        "messages": [],
    }
    if args.system:
        body["messages"].append({"role": "system", "content": args.system})
    body["messages"].append({"role": "user", "content": args.prompt})
    if args.max_tokens:
        body["max_tokens"] = args.max_tokens
    if args.temperature is not None:
        body["temperature"] = args.temperature
    if args.stop:
        body["stop"] = args.stop
    if args.seed is not None:
        body["seed"] = args.seed
    if args.tools:
        # 支持两种写法：@文件路径（读 JSON）或直接内联 JSON
        raw_tools = args.tools
        if raw_tools.startswith("@"):
            try:
                raw_tools = open(raw_tools[1:], encoding="utf-8").read()
            except OSError as e:
                die("读取 tools 文件失败：%s" % e)
        try:
            body["tools"] = json.loads(raw_tools)
        except ValueError as e:
            die("tools 不是合法 JSON：%s" % e)
        # ★ tool_choice 只接受字符串（传对象必 400）—— 见《聊天接口规格》5.2
        if args.tool_choice:
            body["tool_choice"] = args.tool_choice

    headers = build_headers(cred)
    t0 = time.time()

    try:
        resp = make_request(url, headers, body)
    except urllib.error.HTTPError as e:
        print(explain_http_error(e), file=sys.stderr)
        return 1
    except urllib.error.URLError as e:
        print("网络错误：%s" % e.reason, file=sys.stderr)
        return 1

    with resp:
        ctype = resp.headers.get("Content-Type", "")
        if "text/event-stream" not in ctype:
            print("警告：Content-Type 是 %r，预期 text/event-stream" % ctype, file=sys.stderr)

        answer, reasoning = [], []
        usage, finish, done = None, None, False
        n_frames = 0
        # tool_calls 按 index 合并（见《聊天接口规格》6.12）
        calls: dict = {}

        try:
            for kind, payload in iter_sse(resp):
                if kind == "done":
                    done = True
                    break
                if kind == "raw":
                    n_frames += 1
                    if args.raw:
                        print("\n[SSE] " + payload[:400], file=sys.stderr)
                    continue
                if kind == "reasoning":
                    reasoning.append(payload)
                    if args.show_reasoning:
                        print(payload, end="", file=sys.stderr, flush=True)
                    continue
                if kind == "content":
                    answer.append(payload)
                    print(payload, end="", flush=True)
                    continue
                if kind == "tool_calls":
                    # ★ 规则 1：按 index 合并，不按数组下标
                    # ★ 规则 2：id / function.name 只在首帧有值，别用 "" 覆盖
                    # ★ 规则 3：arguments 是流式 JSON 片段，先拼接再解析
                    for tc in payload:
                        i = tc.get("index", 0)
                        slot = calls.setdefault(i, {"id": None, "name": None, "args": ""})
                        if tc.get("id"):
                            slot["id"] = tc["id"]
                        fn = tc.get("function") or {}
                        if fn.get("name"):
                            slot["name"] = fn["name"]
                        if fn.get("arguments"):
                            slot["args"] += fn["arguments"]
                    continue
                if kind == "finish":
                    finish = payload
                    continue
                if kind == "usage":
                    usage = payload
        except KeyboardInterrupt:
            print("\n[已中断]", file=sys.stderr)

        print()  # 收尾换行

    # 函数调用：全部收到的帧已合并完，现在统一解析 arguments
    for i in sorted(calls):
        slot = calls[i]
        try:
            slot["parsed"] = json.loads(slot["args"]) if slot["args"] else None
        except ValueError as e:
            slot["parsed"] = None
            slot["parse_error"] = str(e)
        if args.show_tools:
            print("─" * 58, file=sys.stderr)
            print("[函数调用 #%d]" % i, file=sys.stderr)
            print("  id        : %s" % slot["id"], file=sys.stderr)
            print("  name      : %s" % slot["name"], file=sys.stderr)
            print("  arguments : %s" % slot["args"], file=sys.stderr)
            if slot["parsed"] is not None:
                print("  已解析    : %s"
                      % json.dumps(slot["parsed"], ensure_ascii=False), file=sys.stderr)
            elif slot.get("parse_error"):
                print("  解析失败  : %s" % slot["parse_error"], file=sys.stderr)

    el = time.time() - t0
    if args.stats:
        print("─" * 58, file=sys.stderr)
        print("模型        : %s" % args.model, file=sys.stderr)
        print("帧数        : %d   哨兵 [DONE]: %s" % (n_frames, done), file=sys.stderr)
        print("finish      : %s" % finish, file=sys.stderr)
        print("耗时        : %.1fs" % el, file=sys.stderr)
        print("思维链      : %d 字符" % len("".join(reasoning)), file=sys.stderr)
        if calls:
            print("函数调用    : %d 个" % len(calls), file=sys.stderr)
        if usage:
            print("tokens      : prompt=%s completion=%s total=%s"
                  % (usage.get("prompt_tokens"), usage.get("completion_tokens"),
                     usage.get("total_tokens")), file=sys.stderr)
            if usage.get("completion_thinking_tokens") is not None:
                print("thinking    : %s tokens" % usage["completion_thinking_tokens"], file=sys.stderr)
            print("credit 消耗 : %s" % usage.get("credit"), file=sys.stderr)

    # 退出码语义：finish 非正常结束 → 2，便于脚本判断
    if finish and finish not in FINAL_REASONS:
        return 2
    return 0


def main() -> int:
    p = argparse.ArgumentParser(
        description="WorkBuddy 聊天接口参考客户端（OpenAI 兼容 · SSE）",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="示例：\n"
               "  python workbuddy_chat.py \"用一句话解释量子纠缠\"\n"
               "  python workbuddy_chat.py --model kimi-k3 --show-reasoning \"你好\"\n"
               "  python workbuddy_chat.py --raw --stats \"hi\"\n"
               "  python workbuddy_chat.py --tools @tools.json --show-tools \"北京天气\"\n"
               "\n退出码：0 正常 ｜ 1 请求/凭据错误 ｜ 2 finish_reason 非正常值",
    )
    p.add_argument("prompt", help="用户消息")
    p.add_argument("--model", default="glm-5.3", help="模型 ID（默认 glm-5.3）")
    p.add_argument("--system", help="系统提示词")
    p.add_argument("--max-tokens", type=int, dest="max_tokens", help="最大输出 token")
    p.add_argument("--temperature", type=float, help="采样温度")
    p.add_argument("--stop", action="append", help="停止词（可重复）")
    p.add_argument("--seed", type=int, help="随机种子")
    p.add_argument("--tools", metavar="JSON|@FILE",
                   help="工具定义：内联 JSON 或 @文件路径。注意 tool_choice 只接受字符串")
    p.add_argument("--tool-choice", dest="tool_choice",
                   choices=["auto", "none", "required"],
                   help="工具选择策略（★ 只接受字符串，传对象必 400）")
    p.add_argument("--url", help="覆盖上游地址（默认按账号域自动选）")
    p.add_argument("--show-reasoning", action="store_true", dest="show_reasoning",
                   help="把思维链打到 stderr")
    p.add_argument("--show-tools", action="store_true", dest="show_tools",
                   help="打印合并后的函数调用（含已解析的 arguments）")
    p.add_argument("--raw", action="store_true", help="打印原始 SSE data 帧（调试）")
    p.add_argument("--no-stats", action="store_false", dest="stats",
                   help="不打印统计信息")
    args = p.parse_args()
    return run(args)


if __name__ == "__main__":
    raise SystemExit(main())
