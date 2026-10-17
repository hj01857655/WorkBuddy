# -*- coding: utf-8 -*-
"""WorkBuddy 凭证：读取本机登录态 + 令牌续期（国内版 / 国际版双 realm）。

两个 realm 的凭证**分槽存放**，互不覆盖：

    国内版 cn    ~/.workbuddy/checkin/auth.json        ← 历史路径，签到脚本维护的槽位
    国际版 intl  ~/.workbuddy/checkin/auth-intl.json   ← oauth.py --realm global 写入

为什么要分槽：开国际版时若沿用同一份 auth.json，登一个号就把另一个号冲掉；而两个
realm 的 origin / UA / 模型目录都不通用，冲掉就得重新登录。

realm 决定三件事：请求 origin、UA、刷新端点。

· **UA 按段校验**：缺 `CLI/<版本>` 上游直接 400 / code 12403。两 realm 的段数还不一样——
  国际版多一段客户端名（`workbuddy-ai`），照抄各自桌面端抓包值，不混用（国际版来自
  5.8.4 抓包；国内版无对应抓包，维持原值）。
· **刷新**：`POST {origin}/v2/plugin/auth/token/refresh`，两 realm 同路径。国际版实测
  GET 该路径 404、POST 401 + `12153 token format error`——路由只收 POST，别把 GET 的
  404 当成「端点不存在」。

realm 选择优先级：显式参数 > 环境变量 `WB_REALM` > 有凭据的槽位（cn 优先）。
令牌刷新结果只留在内存，不落盘——两个 auth 文件都归登录方（签到脚本 / oauth.py）所有。
"""
import base64
import binascii
import json
import os
import threading
import time

import requests

STORE_DIR = os.path.join(os.path.expanduser("~"), ".workbuddy", "checkin")
AUTH_STORE = os.path.join(STORE_DIR, "auth.json")            # cn（历史路径，勿改）
AUTH_STORE_INTL = os.path.join(STORE_DIR, "auth-intl.json")  # intl
CN_API_ORIGIN = "https://copilot.tencent.com"
GLOBAL_API_ORIGIN = "https://www.workbuddy.ai"
REFRESH_PATH = "/v2/plugin/auth/token/refresh"

# 桌面端内置 CLI 子进程发的 UA：首段 WorkBuddy/<桌面版>，末段 CLI/<内置 CLI 版本>。
UA_CN = "WorkBuddy/5.6.2 CLI/2.147.0"
UA_INTL = "WorkBuddy/5.8.4 workbuddy-ai/5.8.4 CLI/2.161.0"
USER_AGENT = UA_CN            # 兼容旧调用点（新代码用 user_agent(realm)）

# 区域标识：domain / _realm / JWT issuer 里命中任意一个即判为该 realm。
# 国内版历史换过出口（copilot.tencent.com → codebuddy.cn → workbuddy.cn），三个都要认。
CN_MARKERS = ("copilot.tencent.com", "codebuddy.cn", "workbuddy.cn")
INTL_MARKERS = ("workbuddy.ai", "codebuddy.ai")

REALMS = {
    "cn": {"label": "国内版", "api_origin": CN_API_ORIGIN, "ua": UA_CN,
           "store": AUTH_STORE},
    "intl": {"label": "国际版", "api_origin": GLOBAL_API_ORIGIN, "ua": UA_INTL,
             "store": AUTH_STORE_INTL},
}
DEFAULT_REALM = "cn"
# 别名：oauth.py 的参数用 global，落盘/接口统一成 intl
REALM_ALIASES = {"cn": "cn", "china": "cn", "intl": "intl", "global": "intl",
                 "international": "intl", "oversea": "intl"}

# 内存在令牌有效期（与参考实现一致：25 分钟内复用，避免每请求都读盘/换票）
TOKEN_TTL = 25 * 60

_lock = threading.RLock()
_CACHE = {}                   # realm -> {"token": str, "at": float}


def normalize_realm(name) -> str:
    """把 global/cn/intl 之类写法统一成槽位名；不认识返回空串。"""
    return REALM_ALIASES.get(str(name or "").strip().lower(), "")


def store(realm: str) -> str:
    cfg = REALMS.get(normalize_realm(realm) or DEFAULT_REALM)
    return cfg["store"]


def configured_realm() -> str:
    """环境变量 WB_REALM（未设/写错返回空串）。"""
    return normalize_realm(os.environ.get("WB_REALM"))


def _jwt_issuer(token: str) -> str:
    """从 JWT 中段取 issuer（不验签，只读 claims）；不是 JWT 就返回空串。"""
    try:
        part = token.split(".")[1]
        part += "=" * (-len(part) % 4)
        payload = json.loads(base64.urlsafe_b64decode(part.encode("ascii")))
    except (IndexError, ValueError, binascii.Error, UnicodeError):
        return ""
    return str(payload.get("iss") or "")


def realm_of(data: dict) -> str:
    """判定一份凭据属于哪个 realm：显式标记 > 域名 > 令牌 issuer > 默认。"""
    marked = normalize_realm(data.get("_realm"))
    if marked:
        return marked
    haystacks = [str(data.get("domain") or "")]
    token = data.get("accessToken") or ""
    if token:
        haystacks.append(_jwt_issuer(token))
    for text in haystacks:
        low = text.lower()
        if any(marker in low for marker in INTL_MARKERS):
            return "intl"
        if any(marker in low for marker in CN_MARKERS):
            return "cn"
    return DEFAULT_REALM


def _has_credentials(path: str) -> bool:
    try:
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
    except (OSError, ValueError):
        return False
    return bool(data.get("accessToken") and data.get("uid"))


def available_realms() -> list:
    """哪此槽位里有可用凭据（顺序固定 cn → intl）。"""
    return [name for name in ("cn", "intl") if _has_credentials(REALMS[name]["store"])]


def resolve(realm: str = None) -> str:
    """决定本次请求用哪个 realm：显式 > WB_REALM > 有凭据的槽位。"""
    wanted = normalize_realm(realm)
    if wanted:
        if not _has_credentials(REALMS[wanted]["store"]):
            raise RuntimeError(
                "%s 尚无凭据（%s）；先登录：python oauth.py --realm %s"
                % (REALMS[wanted]["label"], REALMS[wanted]["store"],
                   "global" if wanted == "intl" else "cn"))
        return wanted
    env_realm = configured_realm()
    if env_realm:
        return resolve(env_realm)
    have = available_realms()
    if not have:
        raise RuntimeError(
            "未找到任何凭据：%s（国内版）或 %s（国际版）；请先引导：python checkin.py doctor"
            % (AUTH_STORE, AUTH_STORE_INTL))
    return have[0]


def _read_file(realm: str = None) -> dict:
    name = resolve(realm)
    path = REALMS[name]["store"]
    try:
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
    except OSError as error:
        raise RuntimeError("凭据文件无法读取：%s" % error)
    except ValueError as error:
        raise RuntimeError("凭据文件无法解析：%s" % error)
    if not data.get("_realm"):
        data["_realm"] = name      # 旧文件没标记，按判定结果补上，后续分支少一次判断
    for key in ("accessToken", "uid"):
        if not data.get(key):
            raise RuntimeError("凭据缺少字段 %s，请重新引导" % key)
    return data


def api_origin(source) -> str:
    """聊天/模型网关地址；接受凭据 dict 或 realm 名。"""
    if isinstance(source, dict):
        return REALMS[realm_of(source)]["api_origin"]
    return REALMS[resolve(source)]["api_origin"]


def user_agent(realm: str = None) -> str:
    """该 realm 的桌面端 UA（上游按段校验，两 realm 不通用）。"""
    name = normalize_realm(realm) or resolve()
    return REALMS[name]["ua"]


def refresh_origin(data: dict) -> str:
    """刷新端点与账号同域（CN 实测在 www.workbuddy.cn）；域名为空时回落 realm 默认值。"""
    domain = (data.get("domain") or "").strip()
    if domain:
        return "https://" + domain
    return REALMS[realm_of(data)]["api_origin"]


def token(force: bool = False, realm: str = None) -> str:
    """取当前可用 Bearer；命中该 realm 的内存缓存直接返回。"""
    name = resolve(realm)
    with _lock:
        cached = _CACHE.get(name) or {}
        if not force and cached.get("token") and time.time() - cached.get("at", 0) < TOKEN_TTL:
            return cached["token"]
    data = _read_file(name)
    with _lock:
        _CACHE[name] = {"token": data["accessToken"], "at": time.time()}
        return data["accessToken"]


def refresh(realm: str = None) -> str:
    """用旧 Bearer 换新令牌（401 自愈用）；失败抛 RuntimeError。"""
    name = resolve(realm)
    old = token(realm=name)
    data = _read_file(name)
    url = refresh_origin(data) + REFRESH_PATH
    try:
        resp = requests.post(
            url,
            data=b"",
            headers={
                "Authorization": "Bearer " + old,
                "Content-Type": "application/json",
                "User-Agent": REALMS[name]["ua"],
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
    payload = body.get("data") or {}
    new_token = payload.get("accessToken") or payload.get("access_token")
    if not new_token:
        raise RuntimeError("令牌刷新响应未包含新令牌：%s" % str(body)[:200])
    with _lock:
        _CACHE[name] = {"token": new_token, "at": time.time()}
    print("[credential] %s 令牌已自动刷新" % REALMS[name]["label"])
    return new_token


def load(realm: str = None) -> dict:
    """返回当前账号与令牌快照 {realm, uid, nickname, domain, token, expires_at}。"""
    name = resolve(realm)
    data = _read_file(name)
    return {
        "realm": name,
        "realm_label": REALMS[name]["label"],
        "uid": data.get("uid") or "",
        "nickname": data.get("nickname") or "",
        "domain": data.get("domain") or "",
        "token": token(realm=name),
        "expires_at": data.get("expiresAt") or 0,
    }


def status() -> list:
    """两个槽位的状态（面板用）：无凭据的槽位也列出来，带提示。"""
    rows = []
    for name in ("cn", "intl"):
        cfg = REALMS[name]
        row = {"realm": name, "label": cfg["label"], "store": cfg["store"],
               "api_origin": cfg["api_origin"], "present": _has_credentials(cfg["store"]),
               "uid": "", "nickname": "", "domain": "", "expires_at": 0,
               "remain_text": "—"}
        if row["present"]:
            try:
                with open(cfg["store"], "r", encoding="utf-8") as file:
                    data = json.load(file)
                row.update({"uid": data.get("uid") or "",
                            "nickname": data.get("nickname") or "",
                            "domain": data.get("domain") or "",
                            "expires_at": data.get("expiresAt") or 0})
                row["remain_text"] = remain_text(row["expires_at"])
            except (OSError, ValueError):
                row["present"] = False
        rows.append(row)
    return rows


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
