"""Probe the cloud sandbox data plane (e2bDataEndpoint, port 49983)."""
import json
import sys
import time
import urllib.request
import urllib.error

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from wb_client import load_session, request, ORIGINS  # noqa: E402

CID = open("probe_cid.txt").read().strip() if len(sys.argv) < 2 else sys.argv[1]
s = load_session()
st, raw = request("GET", f"{ORIGINS[0]}/console/as/conversations/{CID}/session", s)
d = json.loads(raw)["data"]
data_ep, tok = d["e2bDataEndpoint"], d["token"]
print("data plane:", data_ep, flush=True)


def probe(method, path, body=None, auth=True):
    h = {"Accept": "application/json", "User-Agent": "WorkBuddy/5.6.2"}
    if auth:
        h["Authorization"] = f"Bearer {tok}"
    data = json.dumps(body).encode() if body is not None else None
    if data:
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(data_ep + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            print(f"{method} {path} -> {r.status} {r.headers.get('Content-Type')}", flush=True)
            print("   ", r.read()[:220], flush=True)
            return r.status
    except urllib.error.HTTPError as e:
        print(f"{method} {path} -> HTTP {e.code}", e.read()[:150].decode('utf-8', 'replace'), flush=True)
    except Exception as e:
        print(f"{method} {path} -> {type(e).__name__} {str(e)[:80]}", flush=True)


for p in ["/health", "/", "/files?path=/workspace", "/dir/list?path=/workspace",
          "/tasks", f"/tasks/{CID}/queue"]:
    probe("GET", p)
probe("POST", "/files", {"path": "/workspace/probe.txt", "data": "hello"})
PY