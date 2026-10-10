#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorkBuddy 每日签到（正式版）。

协议来源：逆向 WorkBuddy 桌面端产物 + 参考开源实现，详见同目录《认证与签到协议.md》。
本文件所有端点与请求头均经**本机实测跑通**（2026-09-26，实签到 +100 积分）。

设计要点
────────
1. **凭据引导一次，之后自续**：从桌面端本地登录态取 refreshToken，换取自己的
   accessToken/refreshToken 并存入本脚本自己的仓库；之后每天用 refresh 自续，
   不再依赖桌面端文件是否新鲜。
2. **只读桌面端文件，绝不改写**：桌面端数据归它自己管，动它可能弄坏应用。
3. **不发散**：日志与终端输出永不含令牌原文。
4. **幂等**：`code=0` 成功；`10001` 或 msg 含「已签到/already」视为已签（按成功处理），
   避免定时任务每天误报。

端点（实测）
────────────
    签到：POST {domain}/v2/billing/meter/daily-checkin      body {}
    状态：POST {domain}/v2/billing/meter/checkin-status
    续期：POST {domain}/v2/plugin/auth/token/refresh

必需请求头（缺 X-User-Id 必 401）：
    Authorization: Bearer <accessToken>
    X-User-Id: <uid>
    X-Requested-With: XMLHttpRequest
    Content-Type / Accept / Origin / Referer / User-Agent / X-Domain
续期额外：
    X-Refresh-Token: <refreshToken>
    X-Auth-Refresh-Source: plugin

用法
────
    python checkin.py doctor     # 体检：凭据从哪来、令牌什么形态
    python checkin.py claim      # 签到（幂等）
    python checkin.py status     # 查状态
    python checkin.py refresh    # 仅续期
    python checkin.py remind     # 兜底提醒
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

# ---------------------------------------------------------------- 常量

CONFIG_DIR = os.path.join(os.path.expanduser("~"), ".workbuddy", "checkin")
AUTH_STORE = os.path.join(CONFIG_DIR, "auth.json")      # 本脚本自己的凭据仓库
LOG_FILE = os.path.join(CONFIG_DIR, "checkin.log")

EP_CLAIM = "/v2/billing/meter/daily-checkin"
EP_STATUS = "/v2/billing/meter/checkin-status"
EP_REFRESH = "/v2/plugin/auth/token/refresh"

CODE_OK = 0
# 注意：10001 是**通用**业务错误码，不是「已签到」专用码。
# 实测同一码对应两种语义，必须靠 msg 区分：
#   「今天已签到，请明天再来」  → 幂等成功
#   「签到活动未开启或已过期」  → 真失败
CODE_ALREADY = 10001
REFRESH_AHEAD_SEC = 6 * 3600  # 剩余不足 6 小时就续期

TIMEOUT = 25
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36")

# 桌面端本地登录态（**只读**）
DESKTOP_AUTH_DIRS = [
    os.path.join(os.environ.get("LOCALAPPDATA", ""), "CodeBuddyExtension", "Data", "Public", "auth"),
    os.path.join(os.environ.get("APPDATA", ""), "CodeBuddyExtension", "Data", "Public", "auth"),
]


def log(msg: str) -> None:
    line = "[%s] %s" % (datetime.now().strftime("%Y-%m-%d %H:%M:%S"), msg)
    print(line, flush=True)
    try:
        os.makedirs(CONFIG_DIR, exist_ok=True)
        with open(LOG_FILE, "a", encoding="utf-8") as fh:
            fh.write(line + "\n")
    except OSError:
        pass


def harden_permissions(path: str) -> str:
    """Windows 下 POSIX 位无效，用 NTFS ACL 真正收紧；返回**实际生效**的描述。"""
    if os.name != "nt":
        os.chmod(path, 0o600)
        return "POSIX 0600"
    user = os.environ.get("USERNAME") or ""
    if not user:
        return "未收紧（取不到 USERNAME）"
    try:
        subprocess.run(["icacls", path, "/inheritance:r", "/grant:r", "%s:F" % user],
                       check=True, capture_output=True)
        return "NTFS ACL：仅 %s" % user
    except Exception as e:
        return "收紧失败(%s)" % type(e).__name__


# ---------------------------------------------------------------- HTTP

def _opener(no_proxy: bool):
    if no_proxy:
        return urllib.request.build_opener(urllib.request.ProxyHandler({}))
    return urllib.request.build_opener()


def http(method, url, headers, body=None, no_proxy=False):
    data = body if body is not None else (b"{}" if method == "POST" else None)
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with _opener(no_proxy).open(req, timeout=TIMEOUT) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8", "replace") or "{}")
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", "replace")
        try:
            return e.code, json.loads(raw)
        except ValueError:
            return e.code, {"_raw": raw[:200]}
    except Exception as e:
        return None, {"_err": "%s:%s" % (type(e).__name__, str(e)[:100])}


def api_headers(cred) -> dict:
    dom = cred["domain"]
    h = {
        "Authorization": "Bearer " + cred["accessToken"],
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-User-Id": cred["uid"],
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://" + dom,
        "Referer": "https://" + dom + "/",
        "User-Agent": UA,
        "X-Domain": dom,
    }
    if cred.get("enterpriseId"):
        h["X-Enterprise-Id"] = cred["enterpriseId"]
        h["X-Tenant-Id"] = cred["enterpriseId"]
    return h


# ---------------------------------------------------------------- 凭据

def load_store():
    try:
        with open(AUTH_STORE, "r", encoding="utf-8") as fh:
            d = json.load(fh)
        if d.get("refreshToken") and d.get("uid") and d.get("domain"):
            return d
    except (OSError, ValueError):
        pass
    return None


def save_store(d) -> str:
    os.makedirs(CONFIG_DIR, exist_ok=True)
    d = {k: v for k, v in d.items() if not k.startswith("_")}
    with open(AUTH_STORE, "w", encoding="utf-8") as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
    return harden_permissions(AUTH_STORE)


def active_account_uid():
    """
    读主文件 `workbuddy-desktop.info` 的 `account.uid` —— 这是**桌面端当前登录的账号**。

    为什么需要它：目录里可能同时存在多个账号的明文备份（例如 global 与 CN 两个号），
    而只有当前账号才是用户想签的那个。token 字段即使被 envelope 加密，
    `account.uid` 仍是明文，所以能可靠取到。
    """
    for d in DESKTOP_AUTH_DIRS:
        if not d:
            continue
        p = os.path.join(d, "workbuddy-desktop.info")
        if not os.path.isfile(p):
            continue
        try:
            j = json.load(open(p, encoding="utf-8"))
        except (OSError, ValueError):
            continue
        uid = str((j.get("account") or {}).get("uid") or "")
        if uid:
            return uid
    return None


def bootstrap_from_desktop(uid_prefix=None):
    """
    从桌面端本地登录态取**明文** refreshToken。

    注意：实测新版桌面端（5.6.2）把令牌包成 {$wbEncrypted, envelope} 加密形态，
    这种**取不到**，只能靠带时间戳的明文备份文件。故本函数扫描目录下全部 .info，
    只接受 refreshToken 为明文者。

    账号优先级：显式 uid_prefix > 主文件里的当前账号 > 按 expiresAt 取最新。
    （**不要**只用 expiresAt 排序：不同账号的令牌寿命不同，会选错号。）

    只读，绝不改写桌面端文件。
    """
    if not uid_prefix:
        uid_prefix = active_account_uid()

    cands = []
    for d in DESKTOP_AUTH_DIRS:
        if not d or not os.path.isdir(d):
            continue
        for p in glob.glob(os.path.join(d, "*.info")):
            try:
                j = json.load(open(p, encoding="utf-8"))
            except (OSError, ValueError):
                continue
            a = j.get("auth") or {}
            acct = j.get("account") or {}
            rt = a.get("refreshToken")
            if not isinstance(rt, str) or not rt:
                continue
            uid = str(acct.get("uid") or "")
            if uid_prefix and not uid.startswith(uid_prefix):
                continue
            at = a.get("accessToken")
            cands.append({
                "uid": uid,
                "nickname": acct.get("nickname") if isinstance(acct.get("nickname"), str) else "",
                "domain": a.get("domain") or "www.workbuddy.cn",
                "accessToken": at if isinstance(at, str) else "",
                "refreshToken": rt,
                "expiresAt": a.get("expiresAt") or 0,
                "enterpriseId": str(acct.get("enterpriseId") or ""),
                "_src": p,
            })
    if not cands:
        return None
    cands.sort(key=lambda c: c["expiresAt"], reverse=True)
    return cands[0]


def parse_jwt_exp(tok: str):
    try:
        import base64
        p = tok.split(".")[1]
        p += "=" * (-len(p) % 4)
        return json.loads(base64.urlsafe_b64decode(p)).get("exp")
    except Exception:
        return None


def do_refresh(cred) -> bool:
    """用 refreshToken 换新令牌，成功则写回仓库。"""
    dom = cred["domain"]
    h = api_headers(cred)
    h.pop("Authorization", None)
    h["X-Refresh-Token"] = cred["refreshToken"]
    h["X-Auth-Refresh-Source"] = "plugin"
    status, j = http("POST", "https://%s%s" % (dom, EP_REFRESH), h, body=b"")
    if status != 200 or not isinstance(j, dict) or j.get("code") != CODE_OK:
        log("续期失败：HTTP %s code=%s msg=%s"
            % (status, (j or {}).get("code"), (j or {}).get("msg") or (j or {}).get("_err")))
        return False
    d = j.get("data") or {}
    if not d.get("accessToken"):
        log("续期响应缺少 accessToken")
        return False
    cred["accessToken"] = d["accessToken"]
    if d.get("refreshToken"):
        cred["refreshToken"] = d["refreshToken"]
    if d.get("domain"):
        cred["domain"] = d["domain"]
    exp = parse_jwt_exp(cred["accessToken"])
    if exp:
        cred["expiresAt"] = exp * 1000
    desc = save_store(cred)
    left = ""
    if exp:
        left = "，有效期至 %s" % datetime.fromtimestamp(exp, timezone.utc).strftime("%Y-%m-%d")
    log("续期成功%s（凭据已存 %s）" % (left, desc))
    return True


def resolve_cred(args):
    """取可用凭据。顺序：自有仓库 → 临近过期则续期 → 从桌面端引导。"""
    cred = load_store()
    if cred:
        exp = cred.get("expiresAt")
        if exp and exp / 1000 - time.time() < REFRESH_AHEAD_SEC:
            log("本地凭据将于 %s 过期，先续期"
                % datetime.fromtimestamp(exp / 1000, timezone.utc).strftime("%Y-%m-%d %H:%M UTC"))
            if not do_refresh(cred):
                log("续期失败，尝试从桌面端重新引导")
                cred = None
        if cred:
            return cred

    boot = bootstrap_from_desktop(getattr(args, "uid", None))
    if not boot:
        log("桌面端未找到可用登录态。原因通常是：新版令牌为 envelope 加密形态，"
            "而目录里没有带明文 refreshToken 的备份文件。")
        log("请打开 WorkBuddy 桌面端确认已登录（或先重新登录一次），再重试。")
        return None
    log("从桌面端引导：%s（uid=%s）" % (boot["_src"], boot["uid"][:8] + "…"))
    if not do_refresh(boot):
        log("引导到的 refreshToken 已失效，请重新登录桌面端。")
        return None
    return boot


# ---------------------------------------------------------------- 子命令

def cmd_claim(args) -> int:
    cred = resolve_cred(args)
    if not cred:
        return 2
    dom = cred["domain"]
    status, j = http("POST", "https://%s%s" % (dom, EP_CLAIM), api_headers(cred),
                     no_proxy=args.no_proxy)
    if status is None:
        log("请求失败：%s" % (j or {}).get("_err"))
        return 1
    code = (j or {}).get("code")
    msg = str((j or {}).get("msg") or "")

    if code == CODE_OK:
        d = j.get("data") or {}
        log("✅ 签到成功：+%s 积分，连续 %s 天%s"
            % (d.get("credit", "-"), d.get("streak_days", "-"),
               "（连续奖励日）" if d.get("is_streak_day") else ""))
        return 0

    # 业务码 10001 是**通用**错误码，必须靠 msg 区分：
    #   「今天已签到，请明天再来」        → 幂等成功
    #   「签到活动未开启或已过期」        → 真失败（换账号或活动结束）
    low = msg.lower()
    if "已签到" in msg or "already" in low:
        log("ℹ 今天已签到过（code=%s，msg=%s），无需重复操作" % (code, msg))
        return 0
    if "未开启" in msg or "已过期" in msg:
        log("✗ 该账号无可用签到活动：%s（uid=%s domain=%s）"
            % (msg, cred["uid"][:8] + "…", dom))
        log("  若你有多个账号，用 --uid <前缀> 指定要签的那个。")
        return 1
    log("✗ 签到失败：HTTP %s code=%s msg=%s" % (status, code, msg or (j or {}).get("_raw")))
    return 1


def cmd_status(args) -> int:
    cred = resolve_cred(args)
    if not cred:
        return 2
    dom = cred["domain"]
    status, j = http("POST", "https://%s%s" % (dom, EP_STATUS), api_headers(cred),
                     no_proxy=args.no_proxy)
    if status != 200 or (j or {}).get("code") != CODE_OK:
        log("状态查询异常：HTTP %s %s" % (status, json.dumps(j, ensure_ascii=False)[:200]))
        return 1
    d = j.get("data") or {}
    if args.json:
        print(json.dumps(d, ensure_ascii=False, indent=2))
        return 0
    log("活动：%s  赛季：%s  累计积分：%s"
        % (d.get("activity_name") or "-", d.get("season", "-"), d.get("total_credits", "-")))
    log("今日已签：%s  连续天数：%s  本周：%s"
        % (d.get("today_checked_in"), d.get("streak_days"),
           "".join("●" if x else "○" for x in (d.get("week_progress") or []))))
    return 0


def cmd_refresh(args) -> int:
    cred = load_store()
    if not cred:
        cred = bootstrap_from_desktop(getattr(args, "uid", None))
        if not cred:
            log("无凭据可续期，请先跑一次 claim 引导。")
            return 2
    return 0 if do_refresh(cred) else 1


def cmd_doctor(args) -> int:
    print("== 本脚本凭据仓库 ==")
    st = load_store()
    if st:
        exp = st.get("expiresAt")
        print("  路径        : %s" % AUTH_STORE)
        print("  uid         : %s" % st.get("uid"))
        print("  domain      : %s" % st.get("domain"))
        print("  accessToken : len=%d" % len(st.get("accessToken", "")))
        print("  refreshToken: len=%d" % len(st.get("refreshToken", "")))
        if exp:
            left = (exp / 1000 - time.time()) / 86400
            print("  有效期至    : %s（剩余 %.1f 天）"
                  % (datetime.fromtimestamp(exp / 1000, timezone.utc).strftime("%Y-%m-%d %H:%M UTC"), left))
    else:
        print("  （空，尚未引导）")

    print("== 桌面端登录态（只读扫描）==")
    boot = bootstrap_from_desktop(getattr(args, "uid", None))
    if boot:
        print("  可用明文源 : %s" % boot["_src"])
        print("  uid/domain : %s / %s" % (boot["uid"], boot["domain"]))
    else:
        print("  未找到含明文 refreshToken 的 .info 文件")
    for d in DESKTOP_AUTH_DIRS:
        if d and os.path.isdir(d):
            for p in sorted(glob.glob(os.path.join(d, "*.info"))):
                try:
                    j = json.load(open(p, encoding="utf-8"))
                except Exception:
                    continue
                a = j.get("auth") or {}
                at = a.get("accessToken")
                shape = ("明文 len=%d" % len(at)) if isinstance(at, str) else (
                    "加密 %s" % list(at.keys()) if isinstance(at, dict) else "无")
                print("    %-50s accessToken=%s" % (os.path.basename(p)[:50], shape))
    return 0


def cmd_remind(args) -> int:
    log("🔔 提醒：%s" % (args.message or "该去 WorkBuddy 签到了（每日 +100 积分，连续第 7 天额外奖励）"))
    return 0


# ---------------------------------------------------------------- CLI

def _common(p):
    p.add_argument("--json", action="store_true", default=argparse.SUPPRESS)
    p.add_argument("--no-proxy", dest="no_proxy", action="store_true", default=argparse.SUPPRESS,
                   help="绕过环境变量里的代理直连")
    p.add_argument("--uid", default=argparse.SUPPRESS, help="指定账号 uid 前缀（多账号时用）")


def _parent():
    p = argparse.ArgumentParser(add_help=False)
    _common(p)
    return p


def main() -> int:
    ap = argparse.ArgumentParser(description="WorkBuddy 每日签到（正式版）")
    _common(ap)
    sub = ap.add_subparsers(dest="cmd")
    for name, helptext in (("claim", "签到（幂等，已签到视为成功）"),
                           ("status", "查询签到状态"),
                           ("refresh", "仅续期令牌"),
                           ("doctor", "体检：凭据来源与令牌形态"),
                           ("remind", "兜底提醒")):
        sp = sub.add_parser(name, parents=[_parent()], help=helptext)
        sp.add_argument("--message", help="remind 的自定义文案")
    args = ap.parse_args()
    for k, v in (("json", False), ("no_proxy", False), ("uid", None)):
        if not hasattr(args, k):
            setattr(args, k, v)
    if not args.cmd:
        ap.print_help()
        return 1
    fn = {"claim": cmd_claim, "status": cmd_status, "refresh": cmd_refresh,
          "doctor": cmd_doctor, "remind": cmd_remind}.get(args.cmd)
    if fn is None:
        ap.print_help()
        return 1
    return fn(args)


if __name__ == "__main__":
    sys.exit(main())
