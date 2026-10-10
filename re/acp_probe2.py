"""ACP live probe v2: create fresh conversation -> wait sandbox -> bootstrap-new -> prompt.

usage: python -u acp_probe2.py [conv_id] ["prompt text"]   # pass conv_id to reuse
"""
import json
import sys
import threading
import time
import urllib.error
import urllib.request

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, request, ORIGINS  # noqa: E402

PROMPT = sys.argv[1] if len(sys.argv) > 1 else "只回复两个字母：ok"
O = ORIGINS[0]


def wait_session(s, cid, max_s=240):
    t0 = time.time()
    while time.time() - t0 < max_s:
        st, raw = request("GET", f"{O}/console/as/conversations/{cid}/session", s)
        try:
            d = json.loads(raw)["data"]
        except Exception:
            print("session fetch fail:", st, raw[:200])
            return None
        status = d.get("sessionStatus")
        print(f"  sessionStatus={status} t+{int(time.time()-t0)}s", flush=True)
        if status and status not in ("CREATING", "PENDING"):
            return d
        time.sleep(8)
    return None


def main():
    s = load_session()
    arg1 = sys.argv[1] if len(sys.argv) > 1 else None
    if arg1 and arg1.isdigit():
        cid = arg1
        print("reuse conversation:", cid, flush=True)
    else:
        if arg1:
            globals()["PROMPT"] = arg1
        st, raw = request("POST", f"{O}/console/as/conversations/", s,
                          {"locale": "zh", "visibility": "PRIVATE"})
        print(f"create -> {st}: {raw[:300]}", flush=True)
        if st >= 400:
            return
        data = json.loads(raw)["data"]
        cid = data.get("id") or data.get("conversationId") or (data.get("conversation") or {}).get("id")
        print("conversation id:", cid, flush=True)

    sess = wait_session(s, cid)
    if not sess:
        print("sandbox never became ready")
        return
    acp, tok = sess["link"], sess["token"]
    print("acp:", acp, " token:", tok[:20] + "…", flush=True)

    ah = lambda extra=None: {**{"Authorization": f"Bearer {tok}",
                                "Accept": "application/json, text/event-stream",
                                "User-Agent": "WorkBuddy/5.6.2"}, **(extra or {})}

    boot_url = acp.replace("/acp", "/acp/bootstrap")
    body = {
        "initialize": {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
            "protocolVersion": 1,
            "clientCapabilities": {"fs": {"readTextFile": False, "writeTextFile": False}}}},
        "sessionNew": {"jsonrpc": "2.0", "id": 2, "method": "session/new", "params": {
            "sessionId": cid, "cwd": "/workspace", "mcpServers": []}},
    }
    conn_id, init_result = None, None
    for attempt in range(5):
        req = urllib.request.Request(boot_url, data=json.dumps(body).encode(), method="POST",
                                     headers=ah({"Content-Type": "application/json"}))
        try:
            with urllib.request.urlopen(req, timeout=45) as r:
                conn_id = r.headers.get("Acp-Connection-Id")
                init_result = r.read().decode("utf-8", "replace")
            break
        except urllib.error.HTTPError as e:
            print(f"bootstrap[{attempt}] HTTP {e.code}: {e.read()[:200]!r}", flush=True)
            if e.code in (502, 503, 504):
                time.sleep(6)
                continue
            return
        except Exception as e:
            print(f"bootstrap[{attempt}] {type(e).__name__} {str(e)[:120]}", flush=True)
            time.sleep(6)
    if not conn_id:
        print("no Acp-Connection-Id")
        return
    print("bootstrap ok, conn-id:", conn_id, flush=True)
    print("init/sessionNew result:", init_result[:500], flush=True)

    events, update_ids = [], set()
    got = threading.Event()

    def pump(resp):
        buf = []
        for raw in resp:
            line = raw.decode("utf-8", "replace").rstrip("\n")
            if line == "":
                if buf:
                    payload = "\n".join(buf)
                    buf = []
                    if payload.startswith("data:"):
                        payload = payload[5:].strip()
                    try:
                        msg = json.loads(payload)
                    except Exception:
                        events.append(("RAW", payload[:200]))
                        continue
                    if "id" in msg and msg.get("id") == 100:
                        events.append(("PROMPT_RESULT", json.dumps(msg, ensure_ascii=False)[:400]))
                        got.set()
                    elif "method" in msg:
                        events.append((msg["method"], json.dumps(msg.get("params", {}), ensure_ascii=False)[:220]))
                        if msg["method"].endswith("update"):
                            got.clear()
            else:
                buf.append(line)

    sse = urllib.request.urlopen(urllib.request.Request(acp, headers=ah()), timeout=180)
    stop = threading.Event()
    threading.Thread(target=lambda: [None for _ in [pump(sse)]], daemon=True).start()

    preq = {"jsonrpc": "2.0", "id": 100, "method": "session/prompt", "params": {
        "sessionId": cid,
        "prompt": [{"type": "text", "text": PROMPT}],
        "_meta": {"codebuddy.ai/conversationRequestId": f"probe-{int(time.time())}"},
    }}
    req = urllib.request.Request(acp, data=json.dumps(preq).encode(), method="POST",
                                 headers=ah({"Content-Type": "application/json",
                                             "Acp-Connection-Id": conn_id}))
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            print(f"prompt POST -> {r.status} {dict(r.headers).get('Content-Type')}", flush=True)
    except urllib.error.HTTPError as e:
        print(f"prompt POST -> HTTP {e.code}: {e.read()[:300]!r}", flush=True)
        return

    got.wait(timeout=150)
    time.sleep(1)
    print(f"--- {len(events)} events:", flush=True)
    for kind, detail in events[-40:]:
        print(f"[{kind}] {detail}", flush=True)


if __name__ == "__main__":
    main()
