"""Probe RunExecutable failure details + statistics."""
import json, os, subprocess, time, uuid

SBX = r"C:/Program Files/WorkBuddy/resources/app.asar.unpacked/cli/vendor/sandbox/5.6.10"
UID = "887e22c0-32df-4935-8811-226031b6d12d"
IPC = "Sandbox_" + uuid.uuid4().hex[:12]
PIPE = "\\\\.\\pipe\\" + IPC

cfg = json.dumps({"ipcAddress": IPC, "extraPath": [], "enableGlobalProjection": False})
p = subprocess.Popen([SBX + r"\sandbox-cli.exe", "--config", cfg, "--rule_decision", "center",
                      "--uid", UID, "--app_home", r"C:/Users/12925/.workbuddy"],
                     env=dict(os.environ, SANDBOX_CENTER_UID=UID), cwd=SBX,
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(3)
f = open(PIPE, "r+b", buffering=0)
buf = b""

def send(c, d, mid):
    f.write((json.dumps({"sessionId": "s1", "messageId": mid, "command": c, "data": d}) + "\n").encode())
    print(">>>", c, flush=True)

def pump(sec):
    global buf
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
            print("<<<", j.get("command"), "success=", j.get("success"),
                  "data=", json.dumps(j.get("data"), ensure_ascii=False)[:150],
                  "ERR=", json.dumps(j.get("error"), ensure_ascii=False)[:250], flush=True)

send("Ping", {}, "m1"); pump(4)
send("OpenSession", {"name": "s1", "workingDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs"}, "m2"); pump(30)
send("RunExecutable", {"executable": r"C:/Windows/System32/cmd.exe", "args": ["/c", "echo hello"],
                       "cwdDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs", "timeoutMs": 30000,
                       "executionMode": "sandbox", "stdoutMode": "pipe", "stdinMode": "null"}, "m3")
pump(15)
send("GetStatistics", {}, "m4"); pump(6)
f.close()
p.terminate()
