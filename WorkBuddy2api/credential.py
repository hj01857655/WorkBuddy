# -*- coding: utf-8 -*-
"""WorkBuddy 凭证：读取本机登录态 + 令牌续期。

凭证直接复用签到脚本维护的 ``~/.workbuddy/checkin/auth.json``（**只读**，不写回），
所以网关与签到脚本的凭据始终是同一份，不会各存一份导致互相覆盖。

令牌失效时用**旧 Bearer** 调插件刷新端点换新令牌（实测：旧 token 进、新 token 出，
空 body）：``POST {domain}/v2/plugin/auth/token/refresh``。刷新结果只留在内存，
不落盘——auth.json 归签到脚本所有。
"""
import json
import os
import threading
import time

import requests

AUTH_STORE = os.path.join(os.path.expanduser("~"), ".workbuddy", "checkin", "auth.json")
CN_API_ORIGIN = "https://copilot.tencent.com"
GLOBAL_API_ORIGIN = "https://www.workbuddy.ai"
REFRESH_PATH = "/v2/plugin/auth/token/refresh"
USER_AGENT = "WorkBuddy/5.6.2 CLI/2.147.0"
# 内存在令牌有效期（与参考实现一致：25 分钟内复用，避免每请求都读盘/换票）
TOKEN_TTL = 25 * 60

_lock = threading.RLock()
_CACHE = {"token": None, "at": 0.0}


def _read_file() -> dict:
    if not os.path.isfile(AUTH_STORE):
        raise RuntimeError(
            "未找到 %s；请先引导凭据：python checkin.py doctor" % AUTH_STORE
        )
    try:
        with open(AUTH_STORE, "r", encoding="utf-8") as file:
            data = json.load(file)
    except (OSError, ValueError) as error:
        raise RuntimeError("凭据文件无法解析：%s" % error)
    for key in ("accessToken", "uid"):
        if not data.get(key):
            raise RuntimeError("凭据缺少字段 %s，请重新引导" % key)
    return data


def api_origin(data: dict) -> str:
    """聊天/模型网关地址：global 账号走 workbuddy.ai，其余走 CN。"""
    domain = data.get("domain") or ""
    return GLOBAL_API_ORIGIN if "workbuddy.ai" in domain else CN_API_ORIGIN


def refresh_origin(data: dict) -> str:
    """刷新端点与账号同域（CN 实测在 www.workbuddy.cn）。"""
    domain = (data.get("domain") or "").strip()
    return ("https://" + domain) if domain else CN_API_ORIGIN


def token(force: bool = False) -> str:
    """取当前可用 Bearer；命中内存缓存直接返回。"""
    with _lock:
        if not force and _CACHE["token"] and time.time() - _CACHE["at"] < TOKEN_TTL:
            return _CACHE["token"]
    data = _read_file()
    with _lock:
        _CACHE["token"], _CACHE["at"] = data["accessToken"], time.time()
        return _CACHE["token"]


def refresh() -> str:
    """用旧 Bearer 换新令牌（401 自愈用）；失败抛 RuntimeError。"""
    old = token()
    url = refresh_origin(_read_file()) + REFRESH_PATH
    try:
        resp = requests.post(
            url,
            data=b"",
            headers={
                "Authorization": "Bearer " + old,
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT,
            },
            timeout=30,
        )
    except requests.RequestException as error:
        raise RuntimeError("令牌刷新请求失败：%s" % error)
    if resp.status_code != 200:
        raise RuntimeError("令牌刷新失败 HTTP %s: %s" % (resp.status_code, resp.text[:200]))
    try:
        body = resp.json() if resp.content else {}
    except ValueError:
        raise RuntimeError("令牌刷新返回非 JSON：%s" % resp.text[:200])
    data = body.get("data") or {}
    new_token = data.get("accessToken") or data.get("access_token")
    if not new_token:
        raise RuntimeError("令牌刷新响应未包含新令牌：%s" % str(body)[:200])
    with _lock:
        _CACHE["token"], _CACHE["at"] = new_token, time.time()
    print("[credential] 令牌已自动刷新")
    return new_token


def load() -> dict:
    """返回当前账号与令牌快照 {uid, nickname, domain, token, expires_at}。"""
    data = _read_file()
    return {
        "uid": data.get("uid") or "",
        "nickname": data.get("nickname") or "",
        "domain": data.get("domain") or "",
        "token": token(),
        "expires_at": data.get("expiresAt") or 0,
    }


def remain_text(expires_at) -> str:
    """把毫秒时间戳转成人类可读的剩余有效期。"""
    try:
        remain = int(expires_at) / 1000 - time.time()
    except (TypeError, ValueError):
        return "未知"
    if remain <= 0:
        return "已过期（请求时自动刷新）"
    days, rest = divmod(int(remain), 86400)
    hours = rest // 3600
    return ("%d 天 %d 小时" % (days, hours)) if days else ("%d 小时" % hours)
