"""WorkBuddy direct chat client — verified working (2026-09-29, see doc 09).

Chain: fresh bearer token (hook log or decrypt) -> turing_sdk.node for X-Device-Token ->
POST /v2/chat/completions (OpenAI-compatible, gzip, stream:true, SSE).

usage: python -u direct_chat.py ["prompt"]
"""
import gzip
import json
import random
import subprocess
import sys
import time
import urllib.request
import urllib.error
import uuid

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, ORIGINS  # noqa: E402

TURING_CJS = r"C:/Program Files/WorkBuddy/resources/app.asar.unpacked/native/turing-sdk/index.cjs"

# Verified header set: captured real headers with rotated values. Missing/extra fields -> APISIX 401.
HEADER_NAMES = ["Accept", "Accept-Encoding", "Authorization", "Content-Type", "Content-Encoding",
    "X-Requested-With", "User-Agent", "X-Agent-Intent", "X-Agent-Purpose", "X-Agent-Type",
    "X-B3-Sampled", "X-B3-SpanId", "X-B3-TraceId", "X-Conversation-ID", "X-Conversation-Message-ID",
    "X-Conversation-Request-ID", "X-Device-Token", "X-Domain", "X-Expert-Id", "X-IDE-Name",
    "X-IDE-Type", "X-IDE-Version", "X-Private-Data", "X-Product", "X-Request-ID",
    "X-Trace-ID", "X-User-Id", "acp-connection-id", "b3", "caller_method", "traceparent",
    "x-codebuddy-request", "x-stainless-arch", "x-stainless-lang", "x-stainless-os",
    "x-stainless-package-version", "x-stainless-retry-count", "x-stainless-runtime",
    "x-stainless-runtime-version"]


def get_device_token():
    js = ("const b=require(process.argv[1]);"
          "b.configure(109144,'WorkBuddy','5.6.2');"
          "b.fetchDeviceToken({usingCachedMessage:true,includesOutdatedMessage:true,includesDeviceInfo:true,timeoutMs:15000})"
          ".then(t=>console.log(t)).catch(e=>{console.error('ERR '+(e.message||e));process.exit(1)})")
    out = subprocess.run(["node", "-e", js, TURING_CJS], capture_output=True, text=True, timeout=30)
    tok = out.stdout.strip()
    if not tok:
        raise RuntimeError(f"turing fetch failed: {out.stderr.strip()[:200]}")
    return tok


SYS_PROMPT = "This conversation is powered by Deepseek-V4.1-Flash\r\n\r\nYour main goal is to follow the USER's instructions at each message, denoted by the <user_query> tag.\r\n"


def main():
    q = sys.argv[1] if len(sys.argv) > 1 else "你好，请用一句话自我介绍。"
    s = load_session()
    try:
        s["token"] = open("fresh_token.txt").read().strip()
    except FileNotFoundError:
        pass
    tok = get_device_token()
    rid = uuid.uuid4().hex
    trace = uuid.uuid4().hex
    conv = "direct-" + uuid.uuid4().hex[:12]
    H = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Authorization": f"Bearer {s['token']}",
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "WorkBuddy/5.6.2 WorkBuddy/5.6.2 CLI/2.147.0",
        "X-Agent-Intent": "craft",
        "X-Agent-Purpose": "conversation",
        "X-Agent-Type": "main",
        "X-B3-Sampled": "1",
        "X-B3-SpanId": trace[:16],
        "X-B3-TraceId": trace,
        "X-Conversation-ID": conv,
        "X-Conversation-Message-ID": rid,
        "X-Conversation-Request-ID": uuid.uuid4().hex,
        "X-Device-Token": tok,
        "X-Domain": s["domain"],
        "X-Expert-Id": "ContentCreator",
        "X-IDE-Name": "WorkBuddy",
        "X-IDE-Type": "WorkBuddy",
        "X-IDE-Version": "5.6.2",
        "X-Private-Data": "true",
        "X-Product": "SaaS",
        "X-Request-ID": rid,
        "X-Trace-ID": trace,
        "X-User-Id": s["uid"],
        "acp-connection-id": str(uuid.uuid4()),
        "b3": f"{trace}-{trace[:16]}-01",
        "caller_method": "chat",
        "traceparent": f"00-{trace}-{trace[:16]}-01",
        "x-codebuddy-request": "1",
        "x-stainless-arch": "x64", "x-stainless-lang": "js", "x-stainless-os": "Windows",
        "x-stainless-package-version": "6.25.0", "x-stainless-retry-count": "0",
        "x-stainless-runtime": "node", "x-stainless-runtime-version": "v22.21.1",
    }
    body = {
        "model": "deepseek-v4.1-flash",
        "stream": True,
        "messages": [
            {"role": "system",
             "content": SYS_PROMPT},
            {"role": "user",
             "content": [{"type": "text", "text": f"<user_query>{q}</user_query>"}]},
        ],
        "agent": "cli",
        "conversationRequestId": rid,
    }
    req = urllib.request.Request(ORIGINS[0] + "/v2/chat/completions",
                                 data=gzip.compress(json.dumps(body, ensure_ascii=False).encode()),
                                 method="POST", headers=H)
    try:
        r = urllib.request.urlopen(req, timeout=120)
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read()[:200].decode("utf-8", "replace"))
        return
    print("status:", r.status, " conv:", conv)
    text = ""
    for raw in r:
        line = raw.decode("utf-8", "replace").strip()
        if line.startswith("data:"):
            p = line[5:].strip()
            if p == "[DONE]":
                break
            try:
                j = json.loads(p)
                d = j["choices"][0].get("delta", {})
                c = d.get("content") or d.get("reasoning_content") or ""
                if c:
                    text += c
            except Exception:
                pass
    print("REPLY:", text[:500])


if __name__ == "__main__":
    main()
