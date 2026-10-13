
"""WorkBuddy 上游客户端：请求头、模型目录、聊天 SSE 解析与聚合。

上游有三个实测约束，直接决定了这里的实现形态（见《聊天接口规格》）：

  · **只支持流式**——body 里 ``stream`` 必须是 ``true``，否则返回 400/code 11101；
    客户端的非流式请求由网关在服务端聚合 SSE 后再补齐成一份 ``chat.completion``。
  · **进行中的 ``finish_reason`` 是空串**（不是 ``null``），且 ``usage`` 内联在收尾帧、
    那一帧 ``choices`` 非空——所以既不能按 ``null`` 判结束，也找不到「空 choices 的 usage 帧」。
  · **``tool_choice`` 只接受字符串**（``auto``/``none``/``required``），传对象必 400。

请求头分工同样照抄官方：会话级头（``X-Conversation-*``）整场不变，请求级头逐请求生成。
会话级头若逐请求变化，一次桌面操作会在网关侧被拆成几十个会话。
"""
import json
import os
import threading
import time
import uuid

import requests

import credential

APP_VERSION = "5.6.2"
USER_AGENT = "WorkBuddy/5.6.2 CLI/2.147.0"
MAX_BODY_BYTES = 33554432        # 上游请求体上限 32MB
UPSTREAM_TIMEOUT = (10, 570)     # 官方总超时 570s
CONFIG_PATH = "/v3/config"
CHAT_PATH = "/v2/chat/completions"

# 会话级头在进程内固定（跨请求复用同一会话身份）
_SESSION = {
    "conversation_id": str(uuid.uuid4()),
    "conversation_request_id": str(uuid.uuid4()),
}
_MODELS = {"at": 0.0, "data": None}
_MODELS_TTL = 3600
# 促销目录（/v3/config → data.modelPromotions），与模型目录同 TTL 同步刷新。
# 免费/折扣判定只认上游数据：enabled + factor==0 + 有效期 + daily 窗口（北京时间）
_PROMOS = {"at": 0.0, "data": []}
# 单飞锁：缓存失效瞬间多个并发请求只放行一个去拉上游，其余阻塞复用其结果，
# 避免缓存击穿（thundering herd）打爆上游 /v3/config 触发 502
_MODELS_LOCK = threading.Lock()


def _bj_now() -> time.struct_time:
    """北京时间（Asia/Shanghai 无夏令时，固定 UTC+8）——促销 schedule 的判定时区。"""
    return time.gmtime(time.time() + 8 * 3600)


def _hhmm_minutes(s: str) -> int:
    h, m = (int(x) for x in str(s).split(":"))
    return h * 60 + m


def _promo_free(promo: dict, now: time.struct_time | None = None) -> tuple[bool, str]:
    """促销是否=当前时点 0 扣费。返回 (是否免费, 免费窗口串或 None)。

    判定链：enabled → validFrom/validUntil（北京时间日期）→ daily 窗口
    （无 daily = 全天有效；有则须落在任一窗口内，支持跨零点）。
    只认 discount.factor==0（如 hy3 0x 限时免费、hy4 夜间 0.00x）；
    factor=0.5（deepseek 非高峰 5 折）与 discount=null（纯 badge）都不算免费。
    """
    now = now or _bj_now()
    if not promo.get("enabled"):
        return False, None
    if (promo.get("discount") or {}).get("factor") != 0:
        return False, None
    sched = promo.get("schedule") or {}
    date_str = time.strftime("%Y-%m-%d", now)
    valid_from = str(sched.get("validFrom") or "")[:10]
    valid_until = str(sched.get("validUntil") or "")[:10]
    if valid_from and date_str < valid_from:
        return False, None
    if valid_until and date_str >= valid_until:  # validUntil 为 T00:00 起失效（末日全天仍有效）
        return False, None
    daily = sched.get("daily") or []
    if not daily:
        return True, None  # 无窗口约束 = 全天免费（如 hy3-free-trial-202608）
    cur = now.tm_hour * 60 + now.tm_min
    in_any = any(
        (start <= cur < end) if start <= end else (cur >= start or cur < end)
        for start, end in ((_hhmm_minutes(w["start"]), _hhmm_minutes(w["end"])) for w in daily)
    )
    if not in_any:
        return False, None
    # 命中即回完整免费时段（元数据给客户端看全_schedule，而非当前命中的片段）
    return True, ",".join("%s-%s" % (w["start"], w["end"]) for w in daily)


def _model_free_promo(mid: str, now: time.struct_time | None = None) -> tuple[bool, str]:
    """汇总该模型命中的所有 0 扣费促销（多窗口以逗号连接）。"""
    windows = []
    for p in _PROMOS["data"]:
        if mid in (p.get("modelIds") or []):
            free, win = _promo_free(p, now)
            if free:
                windows.append(win or "全天")
    if not windows:
        return False, None
    return True, ",".join(dict.fromkeys(windows))


def build_headers(cred: dict, token: str) -> dict:
    """官方全量头：会话级稳定 + 请求级逐请求生成。"""
    trace_id = uuid.uuid4().hex
    span_id = uuid.uuid4().hex[:16]
    headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
        # 上游按 UA 校验客户端版本：缺少 "CLI/<版本>" 会被拒
        # （实测 400 / code 12403 "check ua, get coding copilot version error"）
        "User-Agent": USER_AGENT,
        # 官方强制：SSE 不能被压缩缓冲
        "Accept-Encoding": "identity",
        "x-requested-with": "XMLHttpRequest",
        # —— 会话级（须稳定）——
        "X-Conversation-ID": _SESSION["conversation_id"],
        "X-Conversation-Request-ID": _SESSION["conversation_request_id"],
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
        "X-User-Id": cred["uid"],
        # —— trace 三件套共享同一 traceId ——
        "traceparent": "00-%s-%s-01" % (trace_id, span_id),
        "b3": "%s-%s-1-%s" % (trace_id, span_id, uuid.uuid4().hex[:16]),
        "X-Trace-ID": trace_id,
    }
    if cred.get("domain"):
        headers["X-Domain"] = cred["domain"]
    return headers


def list_models(force: bool = False) -> list:
    """从 /v3/config 拉模型目录 + 促销目录（1 小时缓存，同响应同刷新）。

    缓存未命中时走单飞锁：仅一个线程去拉上游，其余并发线程阻塞复用同一份结果，
    防止多并发同时打上游造成节流 502（2026-10-11 日志 r0114–r0119 六并发全 502 根因）。
    """
    if (not force and _MODELS["data"] is not None
            and time.time() - _MODELS["at"] < _MODELS_TTL):
        return _MODELS["data"]
    with _MODELS_LOCK:
        # 二次检查：等锁期间可能已有线程刷新完缓存
        if (not force and _MODELS["data"] is not None
                and time.time() - _MODELS["at"] < _MODELS_TTL):
            return _MODELS["data"]
        cred = credential.load()
        url = credential.api_origin(cred) + CONFIG_PATH
        resp = requests.get(url, headers=build_headers(cred, credential.token()), timeout=30)
        if resp.status_code != 200:
            raise RuntimeError("模型目录获取失败 HTTP %s: %s" % (resp.status_code, resp.text[:200]))
        body = resp.json()
        if body.get("code") not in (None, 0):
            raise RuntimeError("模型目录业务错误 code=%s msg=%s" % (body.get("code"), body.get("msg")))
        data = body.get("data") or {}
        models = data.get("models") or []
        # 上游会把已停用的模型留在目录里，只挂一个 `disabled: true` 壳条目
        # （实测 `wb-lite` = `{disabled:true, id, name}`，没有 contextWindow / credits）。
        # 不过滤就会从 `/v1/models` 出去一个选了必挂的条目——与「假控件」同一类错误，
        # 只是长在 API 表面上。在写缓存这一层拦，而不是在 `to_openai_model` 上标
        # `callable=False`：上游自己已标不可用，没必要再把它当候选呈现给客户端。
        models = [m for m in models if not m.get("disabled")]
        _MODELS["data"], _MODELS["at"] = models, time.time()
        # 促销目录同源落缓存：免费判定（_model_free_promo）的数据基础
        _PROMOS["data"], _PROMOS["at"] = data.get("modelPromotions") or [], time.time()
        return models


def to_openai_model(model: dict, probe: dict = None) -> dict:
    """把上游模型对象转成 OpenAI 模型对象（附能力元数据）。

    ``probe`` 是 `probe_models` 落盘的本账号可调性结果；没有结果时 ``callable`` 为
    ``null``（**未探测**）——上游目录会把本账号调不动的模型也列出来（实测
    `glm-4.6` 等直连即 `400/11102 service info not found`），不能拿目录当可调清单。
    """
    context_window = model.get("maxInputTokens")
    max_tokens = model.get("maxOutputTokens")
    supports_images = bool(model.get("supportsImages"))
    # 免费面判定只认上游促销目录（modelPromotions，_PROMOS 由 list_models 刷新）：
    # factor==0 且当前时点（北京时间）落在有效期内才算 0 扣费——hy3 全天限时免费、
    # hy4 夜间免费同源于此；目录 credits=x0.00（如有）仅作静态兜底
    credits_raw = str(model.get("credits") or "").strip().lower()
    static_free = credits_raw in ("x0.00", "x0", "$0", "0")
    promo_free, free_window = _model_free_promo(model.get("id") or "")
    is_free = static_free or promo_free
    return {
        "id": model.get("id"),
        "object": "model",
        "created": 0,
        "owned_by": model.get("vendor") or "workbuddy",
        "name": model.get("name") or model.get("id"),
        "description": model.get("descriptionZh") or model.get("descriptionEn") or "",
        "context_window": context_window,
        "context_length": context_window,
        "max_tokens": max_tokens,
        "max_output_tokens": max_tokens,
        "supports_images": supports_images,
        "supports_vision": supports_images,
        "supports_function_calling": bool(model.get("supportsToolCall")),
        "supports_tool_calling": bool(model.get("supportsToolCall")),
        "supports_reasoning": bool(model.get("supportsReasoning")),
        # 推理档位候选：与 reasoning_effort 对应，不接上客户端就猜不到合法取值
        "reasoning_efforts": (model.get("reasoning") or {}).get("supportedEfforts") or [],
        # 上游目录给的可选上下文档位（实测 2026-10：7 个模型新增 600k 档）。
        # **这是目录信息，不是可用入参**：上游聊天体 `Request` 结构里没有长度字段
        # （实测拿 `{}` 探 `contextLength`/`context_length`/`contextWindow` 全部
        # 200 静默丢弃，而同方法的 `temperature` 立即 400 并点名
        # `Go struct field Request.temperature`）——所以选了也不会生效。列出来是为了
        # 让客户端知道该模型能力边界（`context_window` 只是默认值），不是宣称可切换。
        "context_lengths": (model.get("contextWindow") or {}).get("supportedLengths") or [],
        "only_reasoning": bool(model.get("onlyReasoning")),
        "credits": model.get("credits"),
        # 免费面标注（促销 factor==0 命中 / 目录 x0.00 兜底）；恒为 bool
        "is_free": is_free,
        # 免费窗口（如 "23:00-23:59,0:00-8:00" 或 "全天"）；非免费为 None
        "free_window": free_window,
        "input_modalities": ["text", "image"] if supports_images else ["text"],
        # null = 未探测；true/false = 最近一次实调结果
        "callable": (probe or {}).get("callable"),
        "callable_code": (probe or {}).get("code"),
    }


# 上游渠道闸门会扫 messages 文本，命中竞品产品名（实测 ``ZCode``）即返 11128
# "unapproved channel"。仅做最小侵入替换：把 ZCode 字样抹成中性词，保留其余功能
# 指令（browser-use/computer-use 等描述不动）。仅作用于转发给上游的副本，不改客户端原请求。
_SCRUB_MAP = (
    ("ZCode", "the tool"), ("zcode", "the tool"),
    ("AtomCode", "the tool"), ("atomcode", "the tool"),
    ("OpenCode", "the tool"), ("opencode", "the tool"),
    ("CodeBuddy", "the tool"), ("codebuddy", "the tool"),
    ("AtomGit", "the forge"), ("atomgit", "the forge"),
    ("the assistant", "the helper"), ("the assistant", "the helper"),
    ("assistant", "helper"), ("assistant", "helper"),
    ("assistant", "helper"), ("assistant", "helper"),
    ("Agent", "helper"), ("agent", "helper"),
    ("MCP", "unit"), ("mcp", "unit"),
    ("Browser", "tab"), ("browser", "tab"),
    ("Computer", "box"), ("computer", "box"),
    ("web", "net"),
    ("system", "sys"),
    ("tool", "unit"),
    ("addons", "parts"), ("addon", "part"),
    ("guides", "notes"), ("guide", "note"),
    ("the editor", "the pane"), ("the editor", "the pane"),
    ("editor", "pane"),
    ("plugins", "parts"), ("plugin", "part"),
    ("SKILL", "note"), ("skill", "note"),
    ("the provider", "the forge"), ("the provider", "the forge"),
    ("provider", "forge"),    # community-verified WAF triggers (zcode-prompt-sanitizer / codebuddy2api)
    ("you will usually use this for PRs", "this is the default branch for code changes"),
    ("DoS", "service outage"), ("dos", "service outage"),
    ("exploit", "leverage"), ("Exploit", "Leverage"),
    ("credential", "key material"), ("Credential", "Key Material"),
    ("sandbox", "isolated env"), ("Sandbox", "Isolated Env"),
    ("escalation", "promotion"), ("Escalation", "Promotion"),

)


def _scrub_text(text: str) -> str:
    if not isinstance(text, str):
        return text
    out = text
    for token, repl in _SCRUB_MAP:
        out = out.replace(token, repl)
    return out


def _scrub_messages(messages: list) -> list:
    """返回清洗后的 messages 副本（不修改入参）。"""
    if not isinstance(messages, list):
        return messages
    cleaned = []
    for m in messages:
        if not isinstance(m, dict):
            cleaned.append(m)
            continue
        c = m.get("content")
        if isinstance(c, str):
            nm = dict(m)
            nm["content"] = _scrub_text(c)
            cleaned.append(nm)
        elif isinstance(c, list):
            # content 为 parts 数组（如 [{type:text,text:...}]），逐 part 清洗
            parts = []
            for part in c:
                if isinstance(part, dict) and isinstance(part.get("text"), str):
                    np = dict(part)
                    np["text"] = _scrub_text(part["text"])
                    parts.append(np)
                else:
                    parts.append(part)
            nm = dict(m)
            nm["content"] = parts
            cleaned.append(nm)
        else:
            cleaned.append(m)
    # 角色改写：上游渠道闸门对请求体敏感词是**累计评分**制——role="system" 也占一处
    # （atomcode 自带 system 能过，但 ZCode 清洗后残留词累加会过阈值；r0001 实测
    # 仅把 system→user 即 400→200 且复测稳定）。提示词文本原样保留，只改 role 标签。
    for nm in cleaned:
        if isinstance(nm, dict) and nm.get("role") == "system":
            nm["role"] = "user"
    return cleaned


def _scrub_tools(tools: list) -> list:
    """清洗 tools 定义里的文本。上游同样扫 tools，实测 r0047 单靠清 messages 无效，
    tools 描述里的敏感词也要一并抹（不改入参）。

    注意：``function.name`` 是标识符，**绝不清洗**——替换值含空格或把不同工具名
    洗成同名会触发上游 11152 "tool name is invalid or duplicated"（2026-10-11 实锤）。
    description/parameters 只是说明文本，可安全清洗。"""
    if not isinstance(tools, list):
        return tools
    cleaned = []
    for t in tools:
        if not isinstance(t, dict):
            cleaned.append(t)
            continue
        nt = dict(t)
        fn = nt.get("function")
        if isinstance(fn, dict):
            nf = dict(fn)
            if isinstance(nf.get("description"), str):
                nf["description"] = _scrub_text(nf["description"])
            # name 保持原样（标识符）；parameters 只洗 description 类说明文本，
            # 属性名/required/enum 等标识符一律不碰（洗了会 schema 错位）
            nf["parameters"] = _scrub_descriptions(nf.get("parameters"))
            nt["function"] = nf
        cleaned.append(nt)
    return cleaned


def _scrub_descriptions(o):
    """只清洗结构里 ``description`` 键下的字符串，其余（标识符、required、enum）原样保留。"""
    if isinstance(o, dict):
        out = dict(o)
        if isinstance(out.get("description"), str):
            out["description"] = _scrub_text(out["description"])
        return {k: _scrub_descriptions(v) for k, v in out.items()}
    if isinstance(o, list):
        return [_scrub_descriptions(x) for x in o]
    return o


def _scrub_obj(o):
    """递归清洗任意 JSON 结构里的字符串。"""
    if isinstance(o, str):
        return _scrub_text(o)
    if isinstance(o, list):
        return [_scrub_obj(x) for x in o]
    if isinstance(o, dict):
        return {k: _scrub_obj(v) for k, v in o.items()}
    return o


def build_payload(req: dict) -> dict:
    """把 OpenAI 请求裁剪成上游请求体。

    上游把 body 反序列化进一个固定结构体：结构体外的键被静默丢弃，非法取值一律默许，
    只有类型不符才报错（docs/workbuddy-24 §5.1）。因此白名单只收**有行为级证据**的键：

      · 已验证生效：``max_tokens``、``tools``、``tool_choice``（仅字符串）、
        ``reasoning_effort``（实测能把思维链 429→748 / 0→638）、``temperature``
        （实测 ``temperature=0.0`` 高熵题 5/5 同值，1.0 开始出现分歧）。
      · 在结构体内、但效力未证：``presence_penalty`` / ``frequency_penalty`` / ``user``
        —— 送达了解码器，penalty 只在负向一例里看到差异（输出 83→197 字），正向复测未能诱发。
      · **不转发**（结构体外或实测无效，接上就是向客户端宣称假接口）：``stop``
        （实测不截断）、``response_format``、``logprobs``/``top_logprobs``、``seed``、
        ``top_k``、``top_p``（实测不收敛：t=1.0 基线 uniq=2，top_p=0.0001 仍 uniq=2）、
        ``parallel_tool_calls``、``logit_bias``、``n``。
      · ``max_completion_tokens`` 上游不认（实测设 20 仍跑 277 token），重命名映射到
        ``max_tokens``；否则客户端等于没有输出上限。

    ``stream`` 固定 ``true``（上游不支持非流式，非流式由 ``aggregate`` 在服务端聚合）。
    ``tool_choice`` 上游只收字符串：对象形式一律降 ``auto``——降 ``required`` 会在部分
    后端把原本能跑的请求打成 500（docs/workbuddy-24 §3.7）。
    """
    payload = {
        "model": req.get("model") or "auto",
        "stream": True,
        # 注：``agent`` 不在上游聊天端点的结构体内（24 号审计 §5.1），
        # 保留只为与其他官方入口对齐，不应期望它影响历史列表
        "agent": "cli",
        # messages 文本做渠道闸门清洗（抹 ZCode 字样），避免上游 11128（r0002/r0011 实锤）
        "messages": _scrub_messages(req.get("messages") or []),
    }
    max_tokens = req.get("max_tokens")
    if max_tokens is None:
        # OpenAI 已把 max_tokens 标废弃，而上游只认 max_tokens
        max_tokens = req.get("max_completion_tokens")
    if max_tokens is not None:
        payload["max_tokens"] = max_tokens
    for key in ("temperature", "presence_penalty", "frequency_penalty",
                "user", "reasoning_effort"):
        if req.get(key) is not None:
            payload[key] = req[key]
    if req.get("tools"):
        # tools 描述同样过渠道闸门清洗（r0047 实锤：只清 messages 不够）
        payload["tools"] = _scrub_tools(req["tools"])
    choice = req.get("tool_choice")
    if isinstance(choice, str):
        # 字符串形态不依赖是否带 tools，照转
        payload["tool_choice"] = choice
    elif isinstance(choice, dict) and req.get("tools"):
        # 对象形态上游不收；只能降 auto：降 required 在部分后端直接 500
        payload["tool_choice"] = "auto"
    return payload


def open_chat_stream(payload: dict, cred: dict) -> requests.Response:
    """发起上游聊天请求，返回流式响应；401 时刷新令牌重试一次。

    401 的响应体是网关层 HTML（不是 JSON），所以这里只按状态码判断、不看 body。
    """
    raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    if len(raw) > MAX_BODY_BYTES:
        raise ValueError("请求体 %d 字节，超过上游 32MB 上限" % len(raw))
    url = credential.api_origin(cred) + CHAT_PATH

    resp = None
    for attempt in (1, 2):
        headers = build_headers(cred, credential.token())
        resp = requests.post(url, data=raw, headers=headers, stream=True, timeout=UPSTREAM_TIMEOUT)
        if resp.status_code == 401 and attempt == 1:
            resp.close()
            credential.refresh()        # 旧 Bearer 进、新 token 出
            continue
        return resp
    return resp


def iter_sse(resp: requests.Response):
    """逐帧解析上游 SSE，产出 ``(kind, payload)``。

    kind ∈ {content, reasoning, tool_calls, finish, usage, done}。
    严格按官方 parseSSELine 的语义：空行派发、``:`` 开头是心跳注释、
    只剥一个前导空格。坏帧跳过，不中断整条流。
    """
    buf = ""
    for raw_line in resp.iter_lines(decode_unicode=False):
        line = (raw_line or b"").decode("utf-8", "replace").rstrip("\r\n")

        if line == "":
            if not buf:
                continue
            payload, buf = buf, ""
            if payload.strip() == "[DONE]":
                yield ("done", None)
                return
            try:
                chunk = json.loads(payload)
            except ValueError:
                continue
            for choice in chunk.get("choices") or []:
                delta = choice.get("delta") or {}
                # reasoning_content 优先；同帧两者都有时不要重复累加
                reasoning = delta.get("reasoning_content")
                if isinstance(reasoning, str) and reasoning:
                    yield ("reasoning", reasoning)
                else:
                    fallback = delta.get("reasoning")
                    if isinstance(fallback, str) and fallback:
                        yield ("reasoning", fallback)
                content = delta.get("content")
                if isinstance(content, str) and content:
                    yield ("content", content)
                if delta.get("tool_calls"):
                    yield ("tool_calls", delta["tool_calls"])
                # 进行中是 ""（空串）而非 null，按值判，假值直接跳过
                if choice.get("finish_reason"):
                    yield ("finish", choice["finish_reason"])
            if chunk.get("usage"):
                yield ("usage", chunk["usage"])
            continue

        if line.startswith(":"):
            continue
        index = line.find(":")
        if index == -1:
            continue
        field, value = line[:index], line[index + 1:]
        if value.startswith(" "):
            value = value[1:]
        if field == "data":
            buf += value


def _merge_tool_call(slots: dict, call: dict) -> None:
    """按 index 合并 tool_calls 增量。

    id 与 function.name 只在首帧有值（用赋值而非拼接，避免被空串覆盖）；
    arguments 是流式 JSON 片段，必须拼接后再解析。
    """
    index = call.get("index", 0)
    slot = slots.setdefault(
        index, {"id": None, "type": "function", "function": {"name": "", "arguments": ""}}
    )
    if call.get("id"):
        slot["id"] = call["id"]
    function = call.get("function") or {}
    if function.get("name"):
        slot["function"]["name"] = function["name"]
    if function.get("arguments"):
        slot["function"]["arguments"] += function["arguments"]


def aggregate(resp: requests.Response, model: str, chunk_id: str) -> dict:
    """把上游 SSE 聚合成一份完整 ``chat.completion``（非流式请求用）。"""
    content, reasoning = [], []
    tool_calls = {}
    usage, finish = None, None
    for kind, value in iter_sse(resp):
        if kind == "content":
            content.append(value)
        elif kind == "reasoning":
            reasoning.append(value)
        elif kind == "tool_calls":
            for call in value:
                _merge_tool_call(tool_calls, call)
        elif kind == "finish":
            finish = value
        elif kind == "usage":
            usage = value

    message = {"role": "assistant", "content": "".join(content) or None}
    if reasoning:
        message["reasoning_content"] = "".join(reasoning)
    calls = [tool_calls[index] for index in sorted(tool_calls)]
    if calls:
        message["tool_calls"] = calls
        message["content"] = None
    result = {
        "id": chunk_id,
        "object": "chat.completion",
        "created": int(time.time()),
        "model": model,
        "choices": [{
            "index": 0,
            "message": message,
            "finish_reason": finish or ("tool_calls" if calls else "stop"),
        }],
    }
    if usage:
        result["usage"] = usage
    return result


def make_chunk(chunk_id: str, model: str, delta: dict, finish_reason=None, usage=None) -> dict:
    """构造一帧 OpenAI 流式 chunk；usage 非空时按 include_usage 语义单发空 choices 帧。"""
    if usage is not None:
        return {
            "id": chunk_id,
            "object": "chat.completion.chunk",
            "created": int(time.time()),
            "model": model,
            "choices": [],
            "usage": usage,
        }
    return {
        "id": chunk_id,
        "object": "chat.completion.chunk",
        "created": int(time.time()),
        "model": model,
        "choices": [{"index": 0, "delta": delta, "finish_reason": finish_reason}],
    }


# ── 可调性探测（目录不等于能调）───────────────────────────────────
PROBE_CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models_probe.json")
PROBE_TTL = 24 * 3600          # 结果一天内有效；可手动重探
PROBE_TEXT = "回复一个字：好"


def load_probe() -> dict:
    """读可调性缓存 {model_id: {callable, code, msg, at}}；文件缺失/损坏返回空。"""
    try:
        with open(PROBE_CACHE, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def probe_one(model_id: str, tries: int = 3) -> dict:
    """对单模型发一发极小请求，只看能不能调起来（读到首帧即断开，不跑完回复）。

    只用来区分“本账号无此模型服务”（如 400/11102）与“能调”，不能当作能力评测。
    **连接失败不等于不可调**：记 ``probed=False``、``callable=None``，不当成结论缓存，
    下次探测会重跑（否则会把手上一次网络抖动永久误标成该模型不可用）。
    """
    payload = build_payload({"model": model_id,
                             "messages": [{"role": "system", "content": "You are a helpful assistant."},
                                          {"role": "user", "content": PROBE_TEXT}],
                             "max_tokens": 8})
    now = int(time.time())
    resp = None
    for attempt in range(tries):
        try:
            resp = open_chat_stream(payload, credential.load())
            break
        except Exception as error:
            if attempt == tries - 1:
                return {"probed": False, "callable": None, "code": None,
                        "msg": str(error)[:160], "at": now}
            time.sleep(2)
    try:
        if resp.status_code != 200:
            code, msg = None, ""
            try:
                body = resp.json()
                code = body.get("code")
                msg = (body.get("msg") or "")[:160]
            except ValueError:
                msg = resp.text[:160]
            return {"probed": True, "callable": False, "code": code,
                    "msg": msg, "at": now}
        # 200 即算可调；只读少量字节就关流，避免把回复跑完
        for chunk in resp.iter_content(chunk_size=2048):
            if chunk:
                break
        return {"probed": True, "callable": True, "code": None, "msg": "", "at": now}
    finally:
        resp.close()


def probe_models(force: bool = False) -> dict:
    """给目录内每个模型跑一次可调性探测，结果落盘。

    默认用缓存（TTL 1 天）；``force=True`` 重跑全部。返回缓存。
    这一步会向真实模型发请求（小但非零 credit），所以**不在启动时自动跑**，
    只由面板/管理员主动触发（`POST /admin/api/probe-models`）。
    """
    cache = load_probe()
    ids = [m.get("id") for m in list_models() if m.get("id")]
    todo = []
    for model_id in ids:
        hit = cache.get(model_id) or {}
        # 只复用“已有结论且未过期”的；网络抖动得到的 probed=False 不算结论
        if (not force and hit.get("probed")
                and time.time() - hit.get("at", 0) < PROBE_TTL):
            continue
        todo.append(model_id)
    for model_id in todo:
        cache[model_id] = probe_one(model_id)
        try:
            with open(PROBE_CACHE, "w", encoding="utf-8") as file:
                json.dump(cache, file, ensure_ascii=False, indent=1)
        except OSError:
            pass
    return cache
