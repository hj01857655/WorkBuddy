# -*- coding: utf-8 -*-
"""WorkBuddy 自有 OAuth 登录（设备授权流变体，不依赖桌面端）。

协议依据《docs/OAuth原理-GitHub参考实现.md》，并经《OAuth验证-WorkBuddy本地逆向.md》
与官方桌面端流量印证（auth/state?platform=CLI、auth/token/refresh 与官方一致）：

    POST {base}/v2/plugin/auth/state?platform=CLI   → { state, authUrl }
    （浏览器打开 authUrl 登录）
    GET  {base}/v2/plugin/auth/token?state=<state>  → 未完成 code!=0(pending 11217/12151)
                                                       完成 code=0 + token bundle
    GET  {base}/v2/plugin/login/account?state=...   → { uid, enterpriseId, nickname }

无 PKCE：安全性依赖服务端签发的一次性 state。准入三件套：Origin/Referer/UA 伪装官方 CLI。

用法：
    python oauth.py                 # 国内版：写 auth.json（与签到脚本同槽位）
    python oauth.py --realm global  # 国际版：写 auth-intl.json，不覆盖国内版凭据
"""
import argparse
import json
import os
import sys
import time

import requests

import credential

# realm → 上游 base / Origin（准入三件套之一）
REALMS = {
    "cn": {"base": "https://copilot.tencent.com",
           "origin": "https://www.codebuddy.cn"},
    "global": {"base": "https://www.workbuddy.ai",
               "origin": "https://www.workbuddy.ai"},
}
# 凭据仓库：与签到脚本共用同一份（auth.json 归两边共读，签到脚本负责续期落盘）
# 凭据落盘位置由 credential 按 realm 决定：cn → auth.json（签到脚本同槽位）、
# intl → auth-intl.json。以前两 realm 共用一份，登一个就把另一个冲掉。
AUTH_STORE = credential.AUTH_STORE
STATE_PATH = "/v2/plugin/auth/state?platform=CLI"
TOKEN_PATH = "/v2/plugin/auth/token"
ACCOUNT_PATH = "/v2/plugin/login/account"
UA_CLI = "CLI/2.63.2 CodeBuddy/2.63.2"
# 轮询 pending 业务码（app.asar loopGetToken 印证：11217/12151 均为未完成）
PENDING_CODES = {11217, 12151}
POLL_INTERVAL = 2.0
POLL_TIMEOUT = 300.0


def _headers(realm: str, bearer: str = "") -> dict:
    cfg = REALMS[realm]
    h = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": cfg["origin"],
        "Referer": cfg["origin"] + "/",
        "User-Agent": UA_CLI,
    }
    if bearer:
        h["Authorization"] = "Bearer " + bearer
    return h


def _envelope(resp) -> dict:
    """信封纪律：code!=0 一律当错误（返回 pending 码原样供调用方判断）。"""
    body = resp.json()
    if resp.status_code >= 300:
        raise RuntimeError("HTTP %s: %s" % (resp.status_code, str(body)[:200]))
    return body


def start_login(realm: str = "cn") -> dict:
    """第 1 步：拿服务端签发的 state 与浏览器授权 URL。"""
    r = requests.post(REALMS[realm]["base"] + STATE_PATH,
                      json={}, headers=_headers(realm), timeout=15)
    body = _envelope(r)
    if body.get("code") != 0:
        raise RuntimeError("auth/state 失败: %s" % str(body)[:200])
    data = body.get("data") or {}
    if not data.get("state") or not data.get("authUrl"):
        raise RuntimeError("auth/state 响应缺少 state/authUrl: %s" % str(data)[:200])
    return data


def poll_token(realm: str, state: str) -> dict:
    """第 2 步：轮询 auth/token 直到登录完成，返回 token bundle。"""
    url = REALMS[realm]["base"] + TOKEN_PATH
    deadline = time.time() + POLL_TIMEOUT
    while time.time() < deadline:
        r = requests.get(url, params={"state": state},
                         headers=_headers(realm), timeout=15)
        body = _envelope(r)
        if body.get("code") == 0:
            data = body.get("data") or {}
            if data.get("accessToken"):
                return data
        elif body.get("code") in PENDING_CODES:
            time.sleep(POLL_INTERVAL)
            continue
        else:
            raise RuntimeError("auth/token 失败: %s" % str(body)[:200])
    raise RuntimeError("轮询超时（%.0fs）：浏览器侧未完成登录" % POLL_TIMEOUT)


def fetch_account(realm: str, state: str, access_token: str) -> dict:
    """第 3 步：取账号信息。"""
    r = requests.get(REALMS[realm]["base"] + ACCOUNT_PATH,
                     params={"state": state},
                     headers=_headers(realm, access_token), timeout=15)
    body = _envelope(r)
    if body.get("code") != 0:
        raise RuntimeError("login/account 失败: %s" % str(body)[:200])
    return body.get("data") or {}


def save_credentials(bundle: dict, account: dict, realm: str) -> str:
    """合并 token + account 写入该 realm 的槽位（cn → auth.json，intl → auth-intl.json）。"""
    creds = {
        "accessToken": bundle.get("accessToken"),
        "refreshToken": bundle.get("refreshToken") or "",
        "expiresAt": int(time.time() * 1000) + int(bundle.get("expiresIn") or 0) * 1000,
        "uid": account.get("uid") or "",
        "nickname": account.get("nickname") or "",
        "domain": bundle.get("domain") or REALMS[realm]["base"].split("//")[1],
        "_realm": credential.normalize_realm(realm) or realm,
    }
    for key in ("accessToken", "uid"):
        if not creds.get(key):
            raise RuntimeError("凭据缺少 %s，不落盘" % key)
    path = credential.store(realm)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(creds, fh, ensure_ascii=False, indent=2)
    return path


def login(realm: str = "cn") -> dict:
    """完整设备流：state → 浏览器登录 → 轮询 → 账号 → 落盘。"""
    step1 = start_login(realm)
    print("[oauth] 请在浏览器打开并登录（realm=%s）：" % realm, flush=True)
    print("  " + step1["authUrl"], flush=True)
    bundle = poll_token(realm, step1["state"])
    print("[oauth] 登录完成，获取账号信息…", flush=True)
    account = fetch_account(realm, step1["state"], bundle["accessToken"])
    path = save_credentials(bundle, account, realm)
    print("[oauth] ✅ 凭据已写入 %s（uid=%s nickname=%s）"
          % (path, account.get("uid", "?")[:8], account.get("nickname", "?")), flush=True)
    return {"uid": account.get("uid"), "nickname": account.get("nickname")}


def main() -> int:
    ap = argparse.ArgumentParser(description="WorkBuddy OAuth 登录（自有 state 设备流）")
    ap.add_argument("--realm", choices=list(REALMS), default="cn")
    args = ap.parse_args()
    try:
        login(args.realm)
        return 0
    except Exception as error:
        print("[oauth] ✗ 登录失败: %s" % error, flush=True)
        return 1


if __name__ == "__main__":
    sys.exit(main())
