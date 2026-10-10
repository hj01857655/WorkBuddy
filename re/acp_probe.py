"""ACP over Streamable-HTTP live probe against a WorkBuddy cloud conversation.

Flow (workbuddy-03 §2): GET /acp (SSE) -> Acp-Connection-Id; POST /acp/bootstrap
(initialize+session/load); POST session/prompt; read session/update events.

Masked output; costs one minimal agent turn on the operator's own account.
"""
import json
import sys
import threading
import time
import urllib.request

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, request, ORIGINS  # noqa: E402

CONV_ID = sys.argv[1] if len(sys.argv) > 1 else None
PROMPT = sys.argv[2] if len(sys.argv) > 2 else "只回复两个字母：ok"


def sse_read(resp, on_event, stop):
    for raw in resp:
        line = raw.decode("utf-8", "replace").rstrip("\n")
        if line:
            on_event(line)
        if stop.is_set():
            break


def main():
    s = load_session()
    st, raw = request("GET", f"{ORIGINS[0]}/console/as/conversations/{CONV_ID}/session", s)
    sess = json.loads(raw)["data"]
    acp = sess["link"]
    tok = sess["token"]
    print(f"acp endpoint: {acp}")
    print(f"sandbox token: {tok[:24]}…  aud/iss claims only")

    def ah(extra=None):
        h = {"Authorization": f"Bearer {tok}", "Accept": "application/json, text/event-stream",
             "User-Agent": "WorkBuddy/5.6.2"}
        if extra:
            h.update(extra)
        return h

    # 1) bootstrap: POST /acp/bootstrap (initialize + session/load)
    boot_url = acp.replace("/acp", "/acp/bootstrap")
    body = {
        "initialize": {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
            "protocolVersion": 1, "clientCapabilities": {"fs": {"readTextFile": False, "writeTextFile": False}}}},
        "sessionLoad": {"jsonrpc": "2.0", "id": 2, "method": "session/load", "params": {
            "sessionId": CONV_ID, "cwd": "/workspace", "mcpServers": []}},
    }
    conn_id = None
    for attempt in range(6):
        req = urllib.request.Request(boot_url, data=json.dumps(body).encode(), method="POST",
                                     headers=ah({"Content-Type": "application/json"}))
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                conn_id = r.headers.get("Acp-Connection-Id")
                text = r.read().decode("utf-8", "replace")
            print(f"bootstrap[{attempt}] conn-id={conn_id}")
            print(text[:600])
            break
        except urllib.error.HTTPError as e:
            print(f"bootstrap[{attempt}] HTTP {e.code}: {e.read()[:200]!r}")
            if e.code in (502, 503, 504):
                time.sleep(5 * (attempt + 1))
                continue
            return
    if not conn_id:
        print("no connection id, abort")
        return

    # 2) session/prompt on the SSE channel; responses stream back on the GET SSE
    events = []
    got_resp = threading.Event()

    def on_event(line):
        if line.startswith("data:") or line.startswith("{"):
            events.append(line)
            if '"result"' in line or '"error"' in line or '"stopReason"' in line:
                got_resp.set()
        else:
            events.append(line)

    opener = urllib.request.build_opener()
    sse_req = urllib.request.Request(acp, headers=ah({"Accept": "text/event-stream"}))
    sse_resp = opener.open(sse_req, timeout=120)
    stop = threading.Event()
    t = threading.Thread(target=sse_read, args=(sse_resp, on_event, stop), daemon=True)
    t.start()
    print(f"SSE connected, first bytes: {events[:2]}")

    prompt_req = {"jsonrpc": "2.0", "id": 100, "method": "session/prompt", "params": {
        "sessionId": CONV_ID,
        "prompt": [{"type": "text", "text": PROMPT}],
        "_meta": {"codebuddy.ai/conversationRequestId": f"probe-{int(time.time())}"},
    }}
    req = urllib.request.Request(acp, data=json.dumps(prompt_req).encode(), method="POST",
                                 headers=ah({"Content-Type": "application/json",
                                             "Acp-Connection-Id": conn_id}))
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            print(f"prompt POST -> {r.status}")
            print(r.read(400).decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        print(f"prompt POST -> HTTP {e.code}: {e.read()[:300]!r}")
    got_resp.wait(timeout=90)
    stop.set()
    print(f"--- events ({len(events)}):")
    for e in events[-30:]:
        print(e[:260])


if __name__ == "__main__":
    main()
