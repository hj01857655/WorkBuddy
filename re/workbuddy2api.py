"""WorkBuddy2api — OpenAI-compatible local gateway backed by WorkBuddy cloud.

Endpoints:
  GET  /v1/models                     (live from /v3/config, 1h cache)
  POST /v1/chat/completions           (stream & non-stream; tools passthrough)

Auth: local key. Env WB_API_KEY to require `Authorization: Bearer <key>`;
if unset, open access on 127.0.0.1 only.

Upstream chain per request: decrypted .info bearer (or fresh_token.txt) ->
X-Device-Token via turing_sdk.node (cached, bg refresh 4min) ->
POST /v2/chat/completions (gzip, stream:true). Non-stream client requests are
aggregated server-side (upstream is stream-only, code 11101).

usage: python -u WorkBuddy2api.py [port]
"""
import gzip
import json
import os
import subprocess
import sys
import threading
import time
import urllib.request
import urllib.error
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, ORIGINS  # noqa: E402

TURING_CJS = r"C:/Program Files/WorkBuddy/resources/app.asar.unpacked/native/turing-sdk/index.cjs"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8377
API_KEY = os.environ.get("WB_API_KEY", "")
HERE = __file__.rsplit("\\", 1)[0] if "\\" in __file__ else "."

LOCK = threading.Lock()
STATE = {"token": None, "token_at": 0.0, "device": None, "device_at": 0.0,
         "models": None, "models_at": 0.0, "conv_i": 0}


def log(*a):
    print(time.strftime("[%H:%M:%S]"), *a, flush=True)


def load_token():
    with LOCK:
        if STATE["token"] and time.time() - STATE["token_at"] < 1500:  # 25min
            return STATE["token"]
        try:  # hook-captured fresh token first
            tok = open(os.path.join(HERE, "fresh_token.txt")).read().strip()
            if tok:
                STATE["token"], STATE["token_at"] = tok, time.time()
                return tok
        except FileNotFoundError:
            pass
        s = load_session()
        STATE["token"], STATE["token_at"] = s["token"], time.time()
        return STATE["token"]


def refresh_token():
    """Rotate bearer via the plugin refresh endpoint (old bearer in, new out)."""
    with LOCK:
        old = STATE["token"] or load_token()
    req = urllib.request.Request(ORIGINS[0] + "/v2/plugin/auth/token/refresh",
                                 data=b"", method="POST",
                                 headers={"Authorization": f"Bearer {old}",
                                          "Content-Type": "application/json",
                                          "User-Agent": "WorkBuddy/5.6.2 CLI/2.147.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            j = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        log("refresh HTTP", e.code, e.read()[:150].decode("utf-8", "replace"))
        return old
    data = j.get("data") or {}
    new = data.get("accessToken") or data.get("access_token")
    if new:
        with LOCK:
            STATE["token"], STATE["token_at"] = new, time.time()
        log("token refreshed")
        return new
    log("refresh returned no token:", str(j)[:150])
    return old


def device_token():
    with LOCK:
        if STATE["device"] and time.time() - STATE["device_at"] < 240:
            return STATE["device"]
    js = ("const b=require(process.argv[1]);"
          "b.configure(109144,'WorkBuddy','5.6.2');"
          "b.fetchDeviceToken({usingCachedMessage:true,includesOutdatedMessage:true,"
          "includesDeviceInfo:true,timeoutMs:15000})"
          ".then(t=>console.log(t)).catch(e=>{console.error('ERR '+(e.message||e));process.exit(1)})")
    out = subprocess.run(["node", "-e", js, TURING_CJS], capture_output=True, text=True, timeout=30)
    tok = out.stdout.strip()
    if not tok:
        raise RuntimeError(f"device token failed: {out.stderr.strip()[:150]}")
    with LOCK:
        STATE["device"], STATE["device_at"] = tok, time.time()
    return tok


def get_models():
    with LOCK:
        if STATE["models"] and time.time() - STATE["models_at"] < 3600:
            return STATE["models"]
    s = load_session()
    rid = uuid.uuid4().hex
    req = urllib.request.Request(ORIGINS[0] + "/v3/config", headers={
        "Authorization": f"Bearer {s['token']}", "Accept": "application/json",
        "X-Device-Token": device_token(), "X-User-Id": s["uid"], "X-Domain": s["domain"],
        "X-Product": "SaaS", "X-Request-ID": rid, "X-Agent-Intent": "craft",
        "x-codebuddy-request": "1", "User-Agent": "WorkBuddy/5.6.2 CLI/2.147.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        d = json.loads(r.read().decode())["data"]
    with LOCK:
        STATE["models"], STATE["models_at"] = d, time.time()
    return d


def build_headers(s, conv, rid, trace):
    return {
        "Accept": "application/json", "Accept-Encoding": "gzip, deflate, br",
        "Authorization": f"Bearer {s['token']}", "Content-Type": "application/json",
        "Content-Encoding": "gzip", "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "WorkBuddy/5.6.2 WorkBuddy/5.6.2 CLI/2.147.0",
        "X-Agent-Intent": "craft", "X-Agent-Purpose": "conversation",
        "X-Agent-Type": "main", "X-B3-Sampled": "1",
        "X-B3-SpanId": trace[:16], "X-B3-TraceId": trace,
        "X-Conversation-ID": conv, "X-Conversation-Message-ID": rid,
        "X-Conversation-Request-ID": uuid.uuid4().hex,
        "X-Device-Token": device_token(), "X-Domain": s["domain"],
        "X-Expert-Id": "ContentCreator", "X-IDE-Name": "WorkBuddy",
        "X-IDE-Type": "WorkBuddy", "X-IDE-Version": "5.6.2",
        "X-Private-Data": "true", "X-Product": "SaaS", "X-Request-ID": rid,
        "X-Trace-ID": trace, "X-User-Id": s["uid"],
        "acp-connection-id": str(uuid.uuid4()), "b3": f"{trace}-{trace[:16]}-01",
        "caller_method": "chat", "traceparent": f"00-{trace}-{trace[:16]}-01",
        "x-codebuddy-request": "1",
        "x-stainless-arch": "x64", "x-stainless-lang": "js", "x-stainless-os": "Windows",
        "x-stainless-package-version": "6.25.0", "x-stainless-retry-count": "0",
        "x-stainless-runtime": "node", "x-stainless-runtime-version": "v22.21.1",
    }


def upstream_stream(headers, body, on_chunk, on_done, on_error):
    """POST gzip body, iterate SSE, invoke callbacks per delta."""
    payload = gzip.compress(json.dumps(body, ensure_ascii=False).encode())
    req = urllib.request.Request(ORIGINS[0] + "/v2/chat/completions", data=payload,
                                 method="POST", headers=headers)
    try:
        r = urllib.request.urlopen(req, timeout=300)
    except urllib.error.HTTPError as e:
        on_error(e.code, e.read()[:400].decode("utf-8", "replace"))
        return
    text, tool_calls, usage = "", {}, None
    for raw in r:
        line = raw.decode("utf-8", "replace").strip()
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
        if ch:
            d = ch[0].get("delta", {})
            if d.get("content"):
                text += d["content"]
                on_chunk(d["content"])
            for tc in (d.get("tool_calls") or []):
                i = tc.get("index", 0)
                slot = tool_calls.setdefault(i, {"id": tc.get("id") or f"call_{i}",
                                                 "type": "function", "function": {"name": "", "arguments": ""}})
                fn = tc.get("function") or {}
                if fn.get("id"):
                    slot["id"] = fn["id"]
                if fn.get("name"):
                    slot["function"]["name"] += fn["name"]
                if fn.get("arguments"):
                    slot["function"]["arguments"] += fn["arguments"]
                on_chunk(None, tc)
    on_done(text, tool_calls, usage)


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        pass

    def _auth_ok(self):
        if not API_KEY:
            return True
        return self.headers.get("Authorization", "") == f"Bearer {API_KEY}"

    def _json(self, code, obj):
        b = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        if self.path == "/v1/models":
            if not self._auth_ok():
                return self._json(401, {"error": {"message": "bad key"}})
            try:
                d = get_models()
                models = [{"id": m.get("id"), "object": "model",
                           "context_window": (m.get("contextWindow") or {}).get("defaultLength"),
                           "credits": m.get("credits"), "supports_images": m.get("supportsImages")}
                          for m in d.get("models", []) if m.get("id")]
                self._json(200, {"object": "list", "data": models})
            except Exception as e:
                self._json(502, {"error": {"message": str(e)}})
        elif self.path == "/health":
            self._json(200, {"ok": True})
        else:
            self._json(404, {"error": {"message": "not found"}})

    def do_POST(self):
        if self.path != "/v1/chat/completions":
            return self._json(404, {"error": {"message": "not found"}})
        if not self._auth_ok():
            return self._json(401, {"error": {"message": "bad key"}})
        n = int(self.headers.get("Content-Length", 0))
        raw_req = self.rfile.read(n) or b"{}"
        try:
            req = json.loads(raw_req)
        except UnicodeDecodeError:
            req = json.loads(raw_req.decode("gbk", "replace"))
        model = req.get("model", "deepseek-v4.1-flash")
        msgs = req.get("messages", [])
        want_stream = bool(req.get("stream"))
        rid = uuid.uuid4().hex
        trace = uuid.uuid4().hex
        conv = "2api-" + uuid.uuid4().hex[:12]
        with LOCK:
            STATE["conv_i"] += 1
        s = load_session()

        body = {"model": model, "stream": True, "messages": msgs, "agent": "cli",
                "conversationRequestId": rid, "temperature": req.get("temperature", 1)}
        if req.get("tools"):
            body["tools"] = req["tools"]
        if req.get("max_tokens"):
            body["max_tokens"] = req["max_tokens"]

        for attempt in (1, 2):
            H = build_headers(s, conv, rid, trace)
            H["Authorization"] = f"Bearer {load_token()}"
            if attempt == 2:
                H["Authorization"] = f"Bearer {refresh_token()}"
            result = {}
            done_evt = threading.Event()

            if want_stream:
                self.send_response(200)
                self.send_header("Content-Type", "text/event-stream")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()

            def on_chunk(content, tc=None):
                if not want_stream:
                    return
                delta = {"content": content} if content else {}
                if tc:
                    delta["tool_calls"] = [tc]
                chunk = {"id": f"chatcmpl-{rid}", "object": "chat.completion.chunk",
                         "created": int(time.time()), "model": model,
                         "choices": [{"index": 0, "delta": delta, "finish_reason": None}]}
                try:
                    self.wfile.write(f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n".encode())
                    self.wfile.flush()
                except Exception:
                    pass

            def on_done(text, tool_calls, usage):
                result.update(text=text, tool_calls=tool_calls, usage=usage)
                done_evt.set()

            def on_error(code, msg):
                result.update(error=(code, msg))
                done_evt.set()

            try:
                upstream_stream(H, body, on_chunk, on_done, on_error)
            except (BrokenPipeError, ConnectionResetError):
                return
            done_evt.wait(timeout=300)

            if "error" in result and result["error"][0] == 401 and attempt == 1:
                continue  # refresh & retry once
            break

        if "error" in result:
            return self._json(result["error"][0],
                              {"error": {"message": result["error"][1]}})

        if want_stream:
            try:
                self.wfile.write(b"data: [DONE]\n\n")
                self.wfile.flush()
            except Exception:
                pass
            log("chat(stream) conv", conv[:16], "ok")
            return

        text = result.get("text", "")
        tcs = list((result.get("tool_calls") or {}).values())
        msg = {"role": "assistant", "content": text or None}
        if tcs:
            msg["tool_calls"] = tcs
            msg["content"] = None
        self._json(200, {"id": f"chatcmpl-{rid}", "object": "chat.completion",
                         "created": int(time.time()), "model": model,
                         "choices": [{"index": 0, "message": msg,
                                      "finish_reason": "tool_calls" if tcs else "stop"}],
                         "usage": result.get("usage") or {}})
        log("chat conv", conv[:16], "ok credit=", (result.get("usage") or {}).get("credit"))


if __name__ == "__main__":
    load_token()
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"WorkBuddy2api on http://127.0.0.1:{PORT}  key={'set' if API_KEY else 'OPEN'}")
    srv.serve_forever()
