"""WorkBuddy at-rest crypto decryptor.

Breaks the suite-1 field envelopes in `<CodeBuddyExtension>/Data/Public/auth/*.info`
and unwraps `~/.workbuddy/keyblob`, using the build key extracted from the
Electron fork's native `workbuddyStorage` binding (see docs/workbuddy-02.md).

usage:
  python decrypt_auth.py <path/to/auth.info>      # decrypt field envelopes (masked)
  python decrypt_auth.py <path/to/auth.info> --full
  python decrypt_auth.py <path/to/keyblob>        # unwrap master key (masked)
"""
import base64
import hashlib
import json
import struct
import sys

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

BUILDKEY_PATH = "buildkey.json"


def lp(s: str) -> bytes:
    b = s.encode("utf-8")
    return struct.pack(">I", len(b)) + b


def sym_aad(key_id: str, fmt: str, framing_code: int, suite: int = 1) -> bytes:
    # buildAuthenticatedContextAad, scheme sym-v1, context = {framing} only
    return (
        b"WB-AAD\x00\x01"
        + lp(fmt)          # STANDARD_FORMAT_ID: field=WBEV1 file=WBEF1
        + lp("sym-v1")
        + struct.pack(">I", suite)
        + lp(key_id)
        + bytes([framing_code])   # FRAMING_CODE: file=1 field=2
        + b"\x00"                 # optional uint64 sequence = absent
        + b"\x00"                 # final undefined -> 0
    )


def open_envelope(raw_env_b64: str, key: bytes, fmt: str, framing_code: int) -> bytes:
    env = json.loads(base64.b64decode(raw_env_b64))
    aad = sym_aad(env["keyId"], fmt, framing_code, env["suite"])
    return AESGCM(key).decrypt(
        base64.b64decode(env["nonce"]),
        base64.b64decode(env["ciphertext"]) + base64.b64decode(env["authTag"]),
        aad,
    )


def main() -> None:
    path, full = sys.argv[1], "--full" in sys.argv
    bk = json.load(open(BUILDKEY_PATH, encoding="utf-8"))
    key = hashlib.sha256(bk["atRestSecretKey"].encode("utf-8")).digest()
    key_id = hashlib.sha256(key).hexdigest()[:16]
    print(f"build key -> keyId {key_id}")

    doc = json.load(open(path, encoding="utf-8"))

    if path.endswith("keyblob") or "slots" in doc:
        slot = doc["slots"][0]
        master = open_envelope(slot["wrapped"], key, "WBEF1", 1)
        mkid = hashlib.sha256(master).hexdigest()[:16]
        print(f"master key keyId {mkid} (file declares {doc['keyId']}) len {len(master)}")
        if full:
            print("MASTER KEY (hex):", master.hex())
        return

    def walk(node, p=""):
        if isinstance(node, dict):
            if "$wbEncrypted" in node:
                try:
                    plain = open_envelope(node["envelope"], key, "WBEV1", 2).decode("utf-8")
                    shown = plain if full else plain[:10] + f"...(len {len(plain)})"
                    print(f"{p:40s} = {shown}")
                except Exception as e:
                    print(f"{p:40s} FAIL {type(e).__name__}")
                return
            for k, v in node.items():
                walk(v, f"{p}.{k}" if p else k)
        elif isinstance(node, list):
            for i, v in enumerate(node):
                walk(v, f"{p}[{i}]")

    walk(doc)


if __name__ == "__main__":
    main()
