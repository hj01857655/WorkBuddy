"""Direct sandbox IPC client — speaks NDJSON over the named pipe to sandbox-cli.exe.

Replicates the daemon's exact spawn args (main/daemon-bootstrap.js buildSpawnArgs)
and protocol (SandboxCliClientImpl): {sessionId, messageId, command, data}\n
"""
import json
import os
import subprocess
import sys
import time
import uuid

SBX = r"C:/Program Files/WorkBuddy/resources/app.asar.unpacked/cli/vendor/sandbox/5.6.10"
UID = "887e22c0-32df-4935-8811-226031b6d12d"
IPC = "Sandbox_" + uuid.uuid4().hex[:12]
PIPE = f"\\\\.\\pipe\\{IPC}"
APP_HOME = r"C:/Users/12925/.workbuddy"


def spawn():
    cfg = json.dumps({"ipcAddress": IPC, "extraPath": [], "enableGlobalProjection": False})
    env = dict(os.environ, SANDBOX_CENTER_UID=UID)
    args = [
        os.path.join(SBX, "sandbox-cli.exe"),
        "--config", cfg,
        "--rule_decision", "center",
        "--uid", UID,
        "--app_home", APP_HOME,
    ]
    print("spawn:", " ".join(args[:2]), cfg[:60], flush=True)
    return subprocess.Popen(args, env=env, cwd=SBX,
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    proc = spawn()
    print(f"cli pid={proc.pid} pipe={PIPE}", flush=True)
    time.sleep(3)
    if proc.poll() is not None:
        print("cli exited early:", proc.returncode)
        return

    f = open(PIPE, "r+b", buffering=0)

    def send(cmd, data, mid):
        msg = {"sessionId": "agent-session-1", "messageId": mid, "command": cmd, "data": data}
        f.write((json.dumps(msg) + "\n").encode())
        print(f">>> {cmd} id={mid}", flush=True)

    def pump(seconds, expect_ids):
        end = time.time() + seconds
        buf = b""
        while time.time() < end:
            try:
                b = f.read(1)
            except OSError:
                time.sleep(0.05)
                continue
            if not b:
                time.sleep(0.05)
                continue
            buf += b
            while b"\n" in buf:
                line, buf = buf.split(b"\n", 1)
                if not line.strip():
                    continue
                try:
                    j = json.loads(line)
                except Exception:
                    continue
                tag = j.get("command", "?")
                print(f"<<< [{tag}] success={j.get('success')} " +
                      json.dumps(j.get("data"), ensure_ascii=False)[:200], flush=True)
                if j.get("messageId") in expect_ids:
                    expect_ids.discard(j.get("messageId"))
                    if not expect_ids:
                        return
        print("(pump timeout)", flush=True)

    # 1) Ping
    send("Ping", {}, "m1")
    pump(5, {"m1"})
    # 2) OpenSession
    send("OpenSession", {"name": "agent-session-1", "workingDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs"}, "m2")
    pump(8, {"m2"})
    # 3) RunExecutable — dir via cmd
    send("RunExecutable", {
        "executable": "cmd", "args": ["/c", "dir", "/b"],
        "cwdDir": r"E:/VSCodeSpace/ZCode/workbuddy/docs",
        "timeoutMs": 15000, "executionMode": "sandbox",
        "stdoutMode": "pipe", "stdinMode": "null",
    }, "m3")
    pump(15, {"m3"})
    time.sleep(2)
    # drain remaining output events
    try:
        while True:
            b = f.read(1)
            if not b:
                break
            sys.stdout.buffer.write(b)
    except Exception:
        pass
    f.close()
    proc.terminate()


if __name__ == "__main__":
    main()
