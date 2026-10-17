# -*- coding: utf-8 -*-
"""双 realm（国内版 cn / 国际版 intl）离线验证：零网络，只碰临时目录里的假凭据。

覆盖：
  1. realm 归一化与判定（_realm 标记 > 域名 > JWT iss）
  2. 槽位路径与 resolve 优先级（显式 > WB_REALM > 有凭据的槽位）
  3. realm 感知的 UA / origin / 刷新端点
  4. 令牌缓存按 realm 分桶（不会串号）
  5. server 的请求级 realm 选择（头 / 查询参数）
  6. 模型目录缓存按 realm 分桶
"""
import base64
import json
import os
import shutil
import tempfile

import credential
import workbuddy
from server import app


def _fake_jwt(iss: str) -> str:
    def seg(obj):
        raw = json.dumps(obj).encode("utf-8")
        return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")
    return "%s.%s.%s" % (seg({"alg": "HS256"}), seg({"iss": iss, "sub": "u"}), "sig")


def _write_creds(path: str, realm: str, uid: str, token: str, domain: str) -> None:
    with open(path, "w", encoding="utf-8") as fh:
        json.dump({"accessToken": token, "refreshToken": "rt-" + uid, "expiresAt": 0,
                   "uid": uid, "nickname": realm + "-user", "domain": domain,
                   "_realm": realm}, fh)


def main() -> None:
    tmp = tempfile.mkdtemp(prefix="wb-realm-test-")
    backup_realms = {k: dict(v) for k, v in credential.REALMS.items()}
    backup_cache = dict(credential._CACHE)
    backup_models = dict(workbuddy._MODELS)
    backup_promos = dict(workbuddy._PROMOS)
    try:
        cn_store = os.path.join(tmp, "auth.json")
        intl_store = os.path.join(tmp, "auth-intl.json")
        credential.REALMS["cn"]["store"] = cn_store
        credential.REALMS["intl"]["store"] = intl_store
        credential._CACHE.clear()
        workbuddy._MODELS.clear()
        workbuddy._PROMOS.clear()

        # ---------- 1) 归一化与判定 ----------
        assert credential.normalize_realm("global") == "intl"
        assert credential.normalize_realm(" INTERNATional ") == "intl"
        assert credential.normalize_realm("cn") == "cn" and credential.normalize_realm("??") == ""
        assert credential.realm_of({"_realm": "global"}) == "intl"
        assert credential.realm_of({"_realm": "cn", "domain": "www.workbuddy.ai"}) == "cn"
        assert credential.realm_of({"domain": "www.workbuddy.ai"}) == "intl"
        assert credential.realm_of({"domain": "www.codebuddy.cn"}) == "cn"
        assert credential.realm_of({"domain": ""}) == credential.DEFAULT_REALM
        # 域名缺失时回落 JWT issuer
        assert credential.realm_of({"accessToken": _fake_jwt("https://www.workbuddy.ai")}) == "intl"
        assert credential.realm_of({"accessToken": _fake_jwt("https://copilot.tencent.com")}) == "cn"
        assert credential.realm_of({"accessToken": "not-a-jwt"}) == credential.DEFAULT_REALM

        # ---------- 2) 槽位与 resolve ----------
        assert credential.store("intl").endswith("auth-intl.json")
        assert credential.store("cn") == cn_store
        try:
            credential.resolve("intl")
        except RuntimeError as error:
            assert "oauth.py --realm global" in str(error), str(error)
        else:
            raise AssertionError("无凭据的 intl 槽位应当报错")
        assert credential.available_realms() == []
        try:
            credential.resolve()
        except RuntimeError as error:
            assert "auth-intl.json" in str(error), str(error)
        else:
            raise AssertionError("两个槽位都空时应当报错")

        _write_creds(cn_store, "cn", "cn-uid", "cn-token", "www.codebuddy.cn")
        assert credential.available_realms() == ["cn"]
        assert credential.resolve() == "cn"
        os.environ["WB_REALM"] = "intl"          # 环境变量指向空槽位 → 仍报错（显式配置优先）
        try:
            credential.resolve()
        except RuntimeError:
            pass
        else:
            raise AssertionError("WB_REALM=intl 但 intl 无凭据时应报错")
        _write_creds(intl_store, "intl", "intl-uid", "intl-token", "www.workbuddy.ai")
        assert credential.available_realms() == ["cn", "intl"]
        assert credential.resolve() == "intl", "WB_REALM 应优先于自动选择"
        assert credential.resolve("cn") == "cn"
        del os.environ["WB_REALM"]
        assert credential.resolve() == "cn", "无 WB_REALM 时优先 cn"

        # ---------- 3) realm 感知的 UA / origin / 刷新端点 ----------
        assert credential.user_agent("intl") != credential.user_agent("cn")
        for name in ("cn", "intl"):
            assert "CLI/" in credential.user_agent(name), credential.user_agent(name)
        assert "workbuddy-ai" in credential.user_agent("intl")
        assert credential.api_origin({"domain": "www.workbuddy.ai"}) == "https://www.workbuddy.ai"
        assert credential.api_origin("intl") == "https://www.workbuddy.ai"
        assert credential.api_origin({"domain": "www.codebuddy.cn"}) == "https://copilot.tencent.com"
        assert credential.refresh_origin({"domain": "www.workbuddy.ai", "_realm": "intl"}) == \
            "https://www.workbuddy.ai"
        assert credential.refresh_origin({"_realm": "intl"}) == "https://www.workbuddy.ai"
        assert credential.refresh_origin({"domain": "www.codebuddy.cn"}) == "https://www.codebuddy.cn"

        # ---------- 4) 令牌缓存按 realm 分桶 ----------
        assert credential.token(realm="cn") == "cn-token"
        assert credential.token(realm="intl") == "intl-token"
        assert credential.token(realm="cn") == "cn-token"
        loaded = credential.load("intl")
        assert loaded["realm"] == "intl" and loaded["token"] == "intl-token"
        assert loaded["realm_label"] == credential.REALMS["intl"]["label"]
        rows = {row["realm"]: row for row in credential.status()}
        assert rows["cn"]["present"] and rows["intl"]["present"]
        assert rows["intl"]["domain"] == "www.workbuddy.ai"

        # ---------- 5) server 的请求级 realm 选择 ----------
        with app.test_request_context("/v1/models", headers={"X-WorkBuddy-Realm": "intl"}):
            from server import _request_realm
            assert _request_realm() == "intl"
        with app.test_request_context("/v1/models?realm=global"):
            from server import _request_realm
            assert _request_realm() == "intl"
        with app.test_request_context("/v1/models"):
            from server import _request_realm
            assert _request_realm() is None
        with app.test_request_context("/v1/models", headers={"X-WorkBuddy-Realm": "mars"}):
            from server import _request_realm
            try:
                _request_realm()
            except RuntimeError as error:
                assert "未知 realm" in str(error)
            else:
                raise AssertionError("未知 realm 应当报错而不是静默回落")

        # ---------- 6) 模型目录缓存按 realm 分桶 ----------
        cn_bucket = workbuddy._cache_bucket(workbuddy._MODELS, "cn", None)
        intl_bucket = workbuddy._cache_bucket(workbuddy._MODELS, "intl", None)
        cn_bucket["data"], cn_bucket["at"] = [{"id": "cn-model"}], 1.0
        intl_bucket["data"], intl_bucket["at"] = [{"id": "intl-model"}], 1.0
        assert workbuddy._cache_bucket(workbuddy._MODELS, "cn")["data"] == [{"id": "cn-model"}]
        assert workbuddy._cache_bucket(workbuddy._MODELS, "intl")["data"] == [{"id": "intl-model"}]
        assert workbuddy.probe_cache_path("intl").endswith("models_probe_intl.json")
        assert workbuddy.probe_cache_path("cn") == workbuddy.PROBE_CACHE

        print("ALL PASS")
    finally:
        credential.REALMS.update(backup_realms)
        credential._CACHE.clear()
        credential._CACHE.update(backup_cache)
        workbuddy._MODELS.clear()
        workbuddy._MODELS.update(backup_models)
        workbuddy._PROMOS.clear()
        workbuddy._PROMOS.update(backup_promos)
        os.environ.pop("WB_REALM", None)
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
