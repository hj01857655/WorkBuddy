"""WorkBuddy cloud API probe client (own-account live testing).

Reads the local auth session (decrypts via decrypt_auth machinery), builds the
desktop request headers (workbuddy-01 §4.2) and talks to CN_SAAS_CORE_API.

Masked output by default: tokens/phones truncated. Never prints full secrets.

usage:
  python wb_client.py auth                 # show derived auth state (masked)
  python wb_client.py get <path> [json]    # GET  {origin}{path}
  python wb_client.py post <path> [json]   # POST {origin}{path}
  python wb_client.py probe                # read-only probe set
"""
import base64
import hashlib
import json
import struct
import sys
import urllib.request
import urllib.error

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from decrypt_auth import open_envelope, BUILDKEY_PATH  # noqa: E402

INFO_PATH = r"C:/Users/12925/AppData/Local/CodeBuddyExtension/Data/Public/auth/workbuddy-desktop.info"
ORIGINS = ["https://www.workbuddy.cn", "https://copilot.tencent.com"]

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WorkBuddy/5.6.2 Chrome/136.0.0.0 Electron/37.10.3"


def load_session():
    bk = json.load(open(BUILDKEY_PATH, encoding="utf-8"))
    key = hashlib.sha256(bk["atRestSecretKey"].encode()).digest()
    doc = json.load(open(INFO_PATH, encoding="utf-8"))
    plain = lambda w: open_envelope(w["envelope"], key, "WBEV1", 2).decode()
    acct, auth = doc["account"], doc["auth"]
    return {
        "uid": acct["uid"],
        "domain": auth.get("domain") or "",
        "token": plain(auth["accessToken"]),
        "enterprise": acct.get("enterpriseId") or "",
    }


def headers(s, extra=None):
    h = {
        "Authorization": f"Bearer {s['token']}",
        "X-User-Id": s["uid"],
        "Accept": "application/json",
        "User-Agent": UA,
    }
    if s["domain"]:
        h["X-Domain"] = s["domain"]
    if s["enterprise"]:
        h["X-Enterprise-Id"] = s["enterprise"]
        h["X-Tenant-Id"] = s["enterprise"]
    if extra:
        h.update(extra)
    return h


def request(method, url, s, body=None, extra=None, timeout=30):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers=headers(s, extra))
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            raw = r.read().decode("utf-8", "replace")
            return r.status, raw
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def mask(s, keep=8):
    return s[:keep] + f"…(len {len(s)})" if s and len(s) > keep else s


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "probe"
    s = load_session()
    if cmd == "auth":
        print(json.dumps({"uid": s["uid"], "domain": s["domain"],
                          "token": mask(s["token"], 12), "enterprise": s["enterprise"]},
                         ensure_ascii=False))
        return
    if cmd in ("get", "post"):
        path = sys.argv[2]
        body = json.loads(sys.argv[3]) if len(sys.argv) > 3 and cmd == "post" else None
        for origin in ORIGINS:
            st, raw = request(cmd.upper(), origin + path, s, body)
            print(f"--- {origin}{path} -> {st}")
            print(raw[:1200])
            if st < 400:
                return
        return
    if cmd == "probe":
        for path, body in [
            ("/billing/meter/checkin-status", {}),
            ("/billing/meter/get-user-resource-summary", {}),
            ("/console/as/conversations/?type=cloud&page=1&size=5", None),
        ]:
            st, raw = request("POST" if body is not None else "GET", ORIGINS[0] + path, s, body)
            print(f"--- {path} -> {st}")
            print(raw[:900])
        return
    print(__doc__)


if __name__ == "__main__":
    main()
