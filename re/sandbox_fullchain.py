"""Full sandbox chain replica: center + cli + NDJSON RunExecutable.

Reproduces main/index.js sandbox-center-process-service + daemon-bootstrap
sandbox-cli spawn exactly, then exercises the 17-command IPC protocol.
"""
import json
import os
import subprocess
import time
import uuid

SBX = r"C:/Program Files/WorkBuddy/resources/app.asar.unpacked/cli/vendor/sandbox/5.6.10"
UID = "887e22c0-32df-4935-8811-226031b6d12d"
APP_HOME = r"C:/Users/12925/.workbuddy"
LAUNCHER_PID = os.getpid()  # any stable pid works as epoch component


def fnv1a64(path: str) -> str:
    h = 14695981039346656037
    for byte in path.encode("utf-8"):
        h ^= byte
        h = (h * 1099511628211) & 0xFFFFFFFFFFFFFFFF
    return f"{h:016x}"


legacy = f"\\\\.\\pipe\\WorkBuddy_SandboxCenter_{fnv1a64(APP_HOME)}"
center_addr = f"{legacy}_{LAUNCHER_PID}"
cli_addr = "Sandbox_" + uuid.uuid4().hex[:12]
cli_pipe = f"\\\\.\\pipe\\{cli_addr}"
print("center pipe:", center_addr)
print("cli pipe:    ", cli_pipe)

ENV = dict(os.environ, SANDBOX_CENTER_UID=UID)
center_cfg = json.dumps({
    "appHome": APP_HOME,
    "ipcAddress": center_addr,
    "cipher": {"detectionEnabled": True, "detectMaxFileSizeBytes": 1048576},
})
center = subprocess.Popen([SBX + r"\sandbox-center.exe", "--config", center_cfg,
                           "--app_home", APP_HOME], env=ENV, cwd=SBX,
                          stdout=open("center.out.log","wb"), stderr=open("center.err.log","wb"))
print("center pid:", center.pid)
time.sleep(4)

cli_cfg = json.dumps({"ipcAddress": cli_addr, "extraPath": [], "enableGlobalProjection": False})
cli = subprocess.Popen([SBX + r"\sandbox-cli.exe", "--config", cli_cfg,
                        "--rule_decision", "center", "--uid", UID,
                        "--app_home", APP_HOME],
                       env=dict(ENV, SANDBOX_CENTER_IPC_ADDRESS=center_addr), cwd=SBX,
                       stdout=open("cli.out.log","wb"), stderr=open("cli.err.log","wb"))
print("cli pid:", cli.pid)
time.sleep(3)
if cli.poll() is not None:
    print("cli exited early:", cli.returncode)
    center.terminate()
    raise SystemExit(1)

f = open(cli_pipe, "r+b", buffering=0)
buf = b""
out_text = ""

def send(c, d, mid):
    f.write((json.dumps({"sessionId": "s1", "messageId": mid, "command": c, "data": d}) + "\n").encode())
    print(">>>", c, flush=True)

def pump(sec, want):
    global buf, out_text
    end = time.time() + sec
    while time.time() < end:
        try:
            b = f.read(1)
        except OSError:
            time.sleep(0.05); continue
        if not b:
            time.sleep(0.05); continue
        buf += b
        while b"\n" in buf:
            line, buf = buf.split(b"\n", 1)
            try:
                j = json.loads(line)
            except Exception:
                continue
            cmd = j.get("command", "?")
            print("<<<", cmd, "success=", j.get("success"),
                  json.dumps(j.get("data"), ensure_ascii=False)[:200],
                  ("ERR=" + json.dumps(j.get("error"), ensure_ascii=False)[:200]) if j.get("error") else "",
                  flush=True)
            if j.get("command") == "ProcessOutput":
                out_text += str(j.get("data", {}).get("output", ""))
            want.discard(j.get("messageId"))
            if not want:
                return

send("Ping", {}, "m1"); pump(6, {"m1"})
send("OpenSession", {"name": "s1", "workingDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs"}, "m2"); pump(15, {"m2"})
send("RunExecutable", {"executable": "cmd.exe", "args": ["/c", "dir", "/b"],
                       "cwdDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs", "timeoutMs": 30000,
                       "executionMode": "sandbox", "stdoutMode": "pipe", "stdinMode": "null"}, "m3")
pump(25, {"m3"})
time.sleep(4)
pump(10, set())
print("=== collected ProcessOutput:", out_text[:400])
f.close()
cli.terminate()
center.terminate()
