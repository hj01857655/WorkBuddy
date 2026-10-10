"""WorkBuddy mini-agent: direct /v2/chat/completions with a real tool loop.

Tools executed locally: Glob/Read/Bash (subset). Tool results fed back as
role:"tool" messages (OpenAI standard) until the model answers in text.

usage: python -u wb_agent.py "task"
"""
import gzip
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error
import uuid
import glob as globmod

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, ORIGINS  # noqa: E402
from direct_chat import get_device_token  # noqa: E402

TOOLS = [
    {"type": "function", "function": {"name": "Glob", "description": "List files matching a glob pattern",
        "parameters": {"type": "object", "properties": {
            "pattern": {"type": "string"}, "path": {"type": "string", "description": "optional directory"}},
            "required": ["pattern"]}}},
    {"type": "function", "function": {"name": "Read", "description": "Read a text file (first N lines)",
        "parameters": {"type": "object", "properties": {"file_path": {"type": "string"}},
            "required": ["file_path"]}}},
    {"type": "function", "function": {"name": "Bash", "description": "Run a shell command (Git Bash)",
        "parameters": {"type": "object", "properties": {"command": {"type": "string"}},
            "required": ["command"]}}},
]


def exec_tool(name, args):
    try:
        if name == "Glob":
            pat = args.get("pattern", "*")
            path = args.get("path", ".")
            hits = globmod.glob(os.path.join(path, pat))[:50]
            return "\n".join(hits) or "(no matches)"
        if name == "Read":
            with open(args["file_path"], encoding="utf-8", errors="replace") as f:
                return "".join(f.readlines()[:120])
        if name == "Bash":
            r = subprocess.run(["bash", "-c", args["command"]], capture_output=True, text=True, timeout=30)
            return (r.stdout + r.stderr).strip()[:4000] or "(empty)"
        return f"unknown tool {name}"
    except Exception as e:
        return f"ERROR: {type(e).__name__}: {e}"


def stream_once(H, body):
    """One streaming request. Returns (text, tool_calls, usage)."""
    raw = gzip.compress(json.dumps(body, ensure_ascii=False).encode())
    req = urllib.request.Request(ORIGINS[0] + "/v2/chat/completions", data=raw, method="POST", headers=H)
    try:
        r = urllib.request.urlopen(req, timeout=180)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code}: {e.read()[:300].decode('utf-8', 'replace')}")
    text, tool_calls, usage = "", {}, None
    for raw_line in r:
        line = raw_line.decode("utf-8", "replace").strip()
        if not line.startswith("data:"):
            continue
        p = line[5:].strip()
        if p == "[DONE]":
            break
        try:
            j = json.loads(p)
        except Exception:
            continue
        if j.get("usage"):
            usage = j["usage"]
        ch = j.get("choices", [])
        if not ch:
            continue
        d = ch[0].get("delta", {})
        if d.get("content"):
            text += d["content"]
        for tc in (d.get("tool_calls") or []):
            i = tc.get("index", 0)
            slot = tool_calls.setdefault(i, {"id": tc.get("id") or f"call_{i}", "name": "", "args": ""})
            fn = tc.get("function") or {}
            if fn.get("id"):
                slot["id"] = fn["id"]
            if fn.get("name"):
                slot["name"] += fn["name"]
            if fn.get("arguments"):
                slot["args"] += fn["arguments"]
    return text, tool_calls, usage


def main():
    task = sys.argv[1] if len(sys.argv) > 1 else "列出当前目录的 md 文件并告诉我一共有几个。"
    s = load_session()
    try:
        s["token"] = open("fresh_token.txt").read().strip()
    except FileNotFoundError:
        pass
    tok = get_device_token()
    conv = "agent-" + uuid.uuid4().hex[:12]
    rid = uuid.uuid4().hex
    trace = uuid.uuid4().hex

    messages = [
        {"role": "system", "content":
            "You are a helpful assistant running inside a sandboxed workspace. "
            "Use the provided tools to accomplish the user's task, then answer concisely. "
            "Tools are executed locally and their results are returned to you as tool messages."},
        {"role": "user", "content": [{"type": "text", "text": f"<user_query>{task}</user_query>"}]},
    ]

    for turn in range(8):
        rid = uuid.uuid4().hex
        H = build_headers(s, tok, conv, rid, trace)
        body = {
            "model": "deepseek-v4.1-flash", "stream": True,
            "temperature": 1, "max_tokens": 8192,
            "stream_options": {"include_usage": True},
            "reasoning_effort": "high", "reasoning_summary": "auto",
            "messages": messages, "tools": TOOLS,
            "agent": "cli", "conversationRequestId": rid,
        }
        try:
            text, calls, usage = stream_once(H, body)
        except RuntimeError as e:
            print("!!", e)
            return
        if usage:
            print(f"[turn {turn}] credit={usage.get('credit')} tokens={usage.get('total_tokens')}")
        if not calls:
            print("FINAL:", text[:800])
            return
        messages.append({"role": "assistant", "content": text or None,
                         "tool_calls": [{"id": c["id"], "type": "function",
                                         "function": {"name": c["name"], "arguments": c["args"]}}
                                        for c in calls.values()]})
        for c in calls.values():
            print(f"  tool: {c['name']}({c['args'][:90]})")
            result = exec_tool(c["name"], json.loads(c["args"] or "{}"))
            print(f"    -> {result[:120]!r}")
            messages.append({"role": "tool", "tool_call_id": c["id"], "content": result})
    print("(turn limit reached)")


def build_headers(s, tok, conv, rid, trace):
    return {
        "Accept": "application/json", "Accept-Encoding": "gzip, deflate, br",
        "Authorization": f"Bearer {s['token']}", "Content-Type": "application/json",
        "Content-Encoding": "gzip", "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "WorkBuddy/5.6.2 WorkBuddy/5.6.2 CLI/2.147.0",
        "X-Agent-Intent": "craft", "X-Agent-Purpose": "conversation", "X-Agent-Type": "main",
        "X-B3-Sampled": "1", "X-B3-SpanId": trace[:16], "X-B3-TraceId": trace,
        "X-Conversation-ID": conv, "X-Conversation-Message-ID": rid,
        "X-Conversation-Request-ID": uuid.uuid4().hex,
        "X-Device-Token": tok, "X-Domain": s["domain"], "X-Expert-Id": "ContentCreator",
        "X-IDE-Name": "WorkBuddy", "X-IDE-Type": "WorkBuddy", "X-IDE-Version": "5.6.2",
        "X-Private-Data": "true", "X-Product": "SaaS", "X-Request-ID": rid,
        "X-Trace-ID": trace, "X-User-Id": s["uid"],
        "acp-connection-id": str(uuid.uuid4()),
        "b3": f"{trace}-{trace[:16]}-01", "caller_method": "chat",
        "traceparent": f"00-{trace}-{trace[:16]}-01",
        "x-codebuddy-request": "1",
        "x-stainless-arch": "x64", "x-stainless-lang": "js", "x-stainless-os": "Windows",
        "x-stainless-package-version": "6.25.0", "x-stainless-retry-count": "0",
        "x-stainless-runtime": "node", "x-stainless-runtime-version": "v22.21.1",
    }


if __name__ == "__main__":
    main()
