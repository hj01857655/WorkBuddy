"""Capture full ACP wire shapes: tool-triggering prompt, all events to jsonl.

usage: python -u acp_toolcap.py <conv_id> "prompt"
output: workbuddy/re/cap-<ts>.jsonl (one SSE JSON-RPC message per line) + summary to stdout
"""
import json
import sys
import threading
import time
import urllib.error
import urllib.request

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, request, ORIGINS  # noqa: E402

CONV = sys.argv[1]
PROMPT = sys.argv[2] if len(sys.argv) > 2 else "用 bash 执行 ls /workspace 和 uname -a，把原样输出告诉我，只做这一件事。"
O = ORIGINS[0]
OUT = __file__.rsplit("\\", 1)[0] + f"\\cap-{int(time.time())}.jsonl"


def main():
    s = load_session()
    if CONV.isdigit():
        cid = CONV
    else:
        st, raw = request("POST", f"{O}/console/as/conversations/", s, {"locale": "zh", "visibility": "PRIVATE"})
        cid = json.loads(raw)["data"]["id"]
        print("created:", cid, flush=True)
    st, raw = request("GET", f"{O}/console/as/conversations/{cid}/session", s)
    d = json.loads(raw)["data"]
    acp, tok = d["link"], d["token"]
    print("acp:", acp, flush=True)

    boot = acp.replace("/acp", "/acp/bootstrap")
    body = {
        "initialize": {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
            "protocolVersion": 1,
            "clientCapabilities": {"fs": {"readTextFile": False, "writeTextFile": False}}}},
        "sessionNew": {"jsonrpc": "2.0", "id": 2, "method": "session/new", "params": {
            "sessionId": cid, "cwd": "/workspace", "mcpServers": []}},
    }
    req = urllib.request.Request(boot, data=json.dumps(body).encode(), method="POST",
                                 headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json",
                                          "Accept": "application/json, text/event-stream"})
    r = urllib.request.urlopen(req, timeout=180)
    conn = r.headers.get("Acp-Connection-Id")
    print("bootstrap:", r.status, "conn:", conn, flush=True)

    events, done, load_seen = [], threading.Event(), threading.Event()
    fh = open(OUT, "w", encoding="utf-8")
    fh_lock = threading.Lock()

    def wrec(obj):
        with fh_lock:
            fh.write(json.dumps(obj, ensure_ascii=False) + "\n")
            fh.flush()

    def pump(resp, tag):
        buf = []
        try:
            for raw in resp:
                line = raw.decode("utf-8", "replace").rstrip("\n")
                if line == "":
                    if buf:
                        p = "\n".join(buf); buf = []
                        if p.startswith("data:"):
                            p = p[5:].strip()
                        try:
                            msg = json.loads(p)
                        except Exception:
                            continue
                        events.append(msg)
                        wrec({"tag": tag, "ts": time.time(), "msg": msg})
                        if msg.get("id") == 2:
                            load_seen.set()
                        if msg.get("id") == 100:
                            done.set()
                    buf = []
                elif not line.startswith(":"):
                    buf.append(line)
                else:
                    wrec({"tag": tag, "ts": time.time(), "comment": line[:80]})
        except Exception as e:
            print(f"[{tag}] pump end: {type(e).__name__} {str(e)[:80]}", flush=True)

    # bootstrap SSE must be closed; holding it open steals event delivery (see doc 07)
    conn_stream = r.read(64)
    r.close()
    print("bootstrap stream drained+closed, first bytes:", conn_stream[:8], flush=True)
    time.sleep(2)
    try:
        g = urllib.request.urlopen(urllib.request.Request(
            acp, headers={"Authorization": f"Bearer {tok}", "Accept": "application/json, text/event-stream",
                          "Acp-Connection-Id": conn}), timeout=300)
        print("GET SSE:", g.status, flush=True)
        threading.Thread(target=pump, args=(g, "GET"), daemon=True).start()
    except Exception as e:
        print(f"GET SSE failed: {type(e).__name__} {str(e)[:100]}", flush=True)
    print(f"load replay seen: {load_seen.is_set()}", flush=True)

    preq = {"jsonrpc": "2.0", "id": 100, "method": "session/prompt", "params": {
        "sessionId": cid, "prompt": [{"type": "text", "text": PROMPT}],
        "_meta": {"codebuddy.ai/conversationRequestId": f"cap-{int(time.time())}"}}}
    t0 = time.time()
    for attempt in range(6):
        req = urllib.request.Request(acp, data=json.dumps(preq).encode(), method="POST",
                                     headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json",
                                              "Accept": "application/json, text/event-stream",
                                              "Acp-Connection-Id": conn})
        try:
            pr = urllib.request.urlopen(req, timeout=60)
            print(f"prompt POST [{attempt}]:", pr.status, flush=True)
            for hk, hv in pr.headers.items():
                if hk.lower() in ("acp-connection-id", "content-type", "mcp-session-id", "session-id"):
                    print(f"  resp header {hk}: {hv}", flush=True)
            new_conn = pr.headers.get("Acp-Connection-Id")
            threading.Thread(target=pump, args=(pr, "PROMPTRESP"), daemon=True).start()
            if new_conn and new_conn != conn:
                print(f"  conn rotated -> {new_conn}, opening GET on new id", flush=True)
                g2 = urllib.request.urlopen(urllib.request.Request(
                    acp, headers={"Authorization": f"Bearer {tok}", "Accept": "application/json, text/event-stream",
                                  "Acp-Connection-Id": new_conn}), timeout=300)
                print("  GET(new) SSE:", g2.status, flush=True)
                threading.Thread(target=pump, args=(g2, "GETNEW"), daemon=True).start()
            break
        except urllib.error.HTTPError as e:
            print("prompt POST HTTP", e.code, e.read()[:200], flush=True)
            return
        except Exception as e:
            wait = 20 * (attempt + 1)
            print(f"prompt POST [{attempt}] {type(e).__name__}, retry in {wait}s", flush=True)
            time.sleep(wait)
    else:
        print("prompt POST exhausted retries", flush=True)
        return

    done.wait(timeout=240)
    time.sleep(2)
    fh.close()
    print(f"--- captured {len(events)} events -> {OUT}", flush=True)
    from collections import Counter
    kinds = Counter()
    for m in events:
        if "method" in m:
            kinds[m["method"]] += 1
        elif "result" in m or "error" in m:
            kinds[f"id:{m.get('id')}"] += 1
    print(kinds, flush=True)
    print(f"total {time.time()-t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
