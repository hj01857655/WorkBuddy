# -*- coding: utf-8 -*-
"""WorkBuddy 每日签到 —— 独立可跑签到工具。

依据 docs/workbuddy-03.md §3：
  POST https://www.workbuddy.cn/billing/meter/checkin-status    查状态（只读）
  POST https://www.workbuddy.cn/billing/meter/daily-checkin      签到
  POST https://www.workbuddy.cn/v2/billing/meter/checkin-activity-status  活动状态 v2
  信封 {code,msg,data,requestId}；code===0 成功；重复签 code=10001「今天已签到」

零参数，直接跑：
  python tools/wb_checkin.py

行为：查 v2 状态 → 今日已签则跳过；未签则签到，然后复查并打印新状态。
"""
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ORIGIN = "https://www.workbuddy.cn"
HOME = Path(os.environ.get("USERPROFILE", "."))
CHECKIN_DIR = HOME / ".workbuddy" / "checkin"
AUTH_JSON = CHECKIN_DIR / "auth.json"
DESKTOP_AUTH = (Path(os.environ.get("LOCALAPPDATA", "")) /
                "CodeBuddyExtension" / "Data" / "Public" / "auth")
HERE = Path(__file__).resolve().parent
LOG = CHECKIN_DIR / "checkin.log"

CODE_OK = 0
CODE_ALREADY = 10001
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")


def log(msg: str) -> None:
    line = "[%s] %s" % (datetime.now().strftime("%Y-%m-%d %H:%M:%S"), msg)
    print(line)
    try:
        CHECKIN_DIR.mkdir(parents=True, exist_ok=True)
        with LOG.open("a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def post(path: str, token: str, body=None, timeout: int = 30):
    data = json.dumps(body if body is not None else {}).encode()
    req = urllib.request.Request(ORIGIN + path, data=data, method="POST", headers={
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": UA,
        "Referer": ORIGIN + "/",
        "Origin": ORIGIN,
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read(4000).decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read(2000).decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        return -1, "%s: %s" % (type(e).__name__, e)


def _grab(txt: str, key: str):
    """从解密输出里抠字段值（兼容 json 与 key: value 两种形态）。"""
    import re
    m = re.search(r'"%s"\s*:\s*"([^"]+)"' % re.escape(key), txt)
    if m:
        return m.group(1)
    m = re.search(r'%s[=:]\s*"?([A-Za-z0-9._\-]{40,})' % re.escape(key), txt)
    return m.group(1) if m else None


def bootstrap_from_desktop() -> dict:
    """从桌面端 auth/*.info 解密取 accessToken（见 02 号文档）。"""
    if not DESKTOP_AUTH.is_dir():
        raise SystemExit("找不到桌面端凭据目录：%s" % DESKTOP_AUTH)
    files = sorted(DESKTOP_AUTH.glob("*.info"),
                   key=lambda p: p.stat().st_mtime, reverse=True)
    if not files:
        raise SystemExit("目录内无 .info：%s" % DESKTOP_AUTH)
    src = files[0]
    log("从桌面端引导：%s" % src)
    dec = HERE / "decrypt_auth.py"
    if not dec.exists():
        raise SystemExit("缺少解密脚本：%s" % dec)
    import subprocess
    r = subprocess.run([sys.executable, str(dec), str(src), "--full"],
                       capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    txt = (r.stdout or "") + (r.stderr or "")
    tok = _grab(txt, "accessToken") or _grab(txt, "access_token")
    if not tok:
        log("解密输出里没找到 accessToken：\n%s" % txt[:400])
        raise SystemExit(1)
    exp = _grab(txt, "expiresAt") or _grab(txt, "expires_at")
    try:
        exp = int(float(exp)) if exp else int(time.time() * 1000) + 30 * 86400 * 1000
    except Exception:
        exp = int(time.time() * 1000) + 30 * 86400 * 1000
    d = {"accessToken": tok, "expiresAt": exp, "domain": "www.workbuddy.cn"}
    try:
        CHECKIN_DIR.mkdir(parents=True, exist_ok=True)
        AUTH_JSON.write_text(json.dumps(d, ensure_ascii=False, indent=2),
                             encoding="utf-8")
    except Exception:
        pass
    log("引导成功，已缓存到 %s" % AUTH_JSON)
    return d


def load_auth() -> dict:
    """取 web JWT：优先 checkin/auth.json，缺失则从桌面端凭据引导。"""
    if AUTH_JSON.exists():
        try:
            d = json.loads(AUTH_JSON.read_text(encoding="utf-8"))
            if d.get("accessToken"):
                return d
        except Exception as e:
            log("auth.json 解析失败：%s" % e)
    return bootstrap_from_desktop()




def show(d: dict, indent: str = "    ") -> None:
    """打印签到状态（字段名为实测 snake_case，见 03 §3）。"""
    if not isinstance(d, dict):
        log("%sdata=%s" % (indent, str(d)[:200]))
        return
    log("%s活动=%s  赛季=%s  主题=%s" %
        (indent, d.get("active"), d.get("season"), d.get("theme_name") or "-"))
    log("%s今日已签=%s  连续天数=%s  本周=%s/7" %
        (indent, d.get("today_checked_in"), d.get("streak_days"),
         d.get("week_checkin_days")))
    log("%s今日积分=%s  累计积分=%s  单日奖励=%s" %
        (indent, d.get("today_credit"), d.get("total_credits"),
         d.get("daily_credit")))
    dates = d.get("checkin_dates")
    if isinstance(dates, list) and dates:
        log("%s签到日期(%d): %s … %s" %
            (indent, len(dates), dates[-1], dates[0]))
    wp = d.get("week_progress")
    if isinstance(wp, list) and wp:
        log("%s本周格子: %s" % (indent, "".join("✓" if x else "○" for x in wp)))
    log("%s活动期: %s ~ %s" % (indent, d.get("start_time") or "-",
                              d.get("end_time") or "-"))


def do_status(token: str) -> dict:
    """查询签到状态。

    注意（实测 2026-09-29）：v1 与 v2 口径不一致。无活动时 v1 返回
    active=false / today_checked_in=false / streak_days=0 的空占位，
    即使当天实际已签；v2 才反映真实活动数据。故 v2 优先。
    """
    best: dict = {}
    for path in ("/v2/billing/meter/checkin-activity-status",
                 "/billing/meter/checkin-status"):
        st, txt = post(path, token)
        label = "v2" if path.startswith("/v2") else "v1"
        if st != 200 or not txt.strip().startswith("{"):
            log("  %s %s -> HTTP %s %s" % (label, path, st, txt[:120]))
            continue
        try:
            env = json.loads(txt)
        except Exception:
            log("  %s %s -> 非 JSON" % (label, path))
            continue
        if env.get("code") != CODE_OK:
            log("  %s %s -> code=%s msg=%s" % (label, path,
                                               env.get("code"), env.get("msg")))
            continue
        data = env.get("data") or {}
        if label == "v2":
            log("  v2 %s -> code=0  ← 采用此口径" % path)
            show(data)
            return data
        log("  v1 %s -> code=0（v1 无活动时为空占位，仅作参考）" % path)
        show(data)
        best = data if isinstance(data, dict) else {}
    return best


def do_claim(token: str) -> int:
    log("执行签到…")
    st, txt = post("/billing/meter/daily-checkin", token)
    if st != 200:
        log("  HTTP %s  %s" % (st, txt[:200]))
        return st
    try:
        env = json.loads(txt)
    except Exception:
        log("  响应非 JSON：%s" % txt[:200])
        return st
    code, msg = env.get("code"), env.get("msg")
    if code == CODE_OK:
        extra = ("  data=" + str(env.get("data"))[:120]) if env.get("data") else ""
        log("  ✅ 签到成功（code=0）%s" % extra)
        return 0
    if code == CODE_ALREADY:
        log("  ℹ 今天已签到过（code=10001，msg=%s），无需重复操作" % msg)
        return 0
    log("  ❌ 失败 code=%s msg=%s" % (code, msg))
    return st


def main() -> None:
    log("=== WorkBuddy 每日签到 ===")
    try:
        auth = load_auth()
    except SystemExit as e:
        log("取凭据失败：%s" % e)
        return
    tok = auth.get("accessToken", "")
    if not tok:
        log("无 accessToken，退出。")
        return
    exp = auth.get("expiresAt")
    if exp:
        try:
            log("凭据有效期至 %s" %
                datetime.fromtimestamp(int(exp) / 1000).strftime("%Y-%m-%d %H:%M"))
        except Exception:
            pass
    log("token %s…%s（len=%d）" % (tok[:6], tok[-4:], len(tok)))

    data = do_status(tok)
    # 字段为实测 snake_case（见 show() 注释）
    if data.get("today_checked_in"):
        log("ℹ 今日已签，跳过。")
    else:
        do_claim(tok)
        # 签完复查，把新状态打出来（连续天数/积分是否已更新）
        after = do_status(tok)
        if after:
            log("签到后状态：")
            show(after)


if __name__ == "__main__":
    main()
