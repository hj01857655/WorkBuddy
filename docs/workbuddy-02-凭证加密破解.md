# WorkBuddy 逆向 02：at-rest 构建密钥提取与凭证文件离线解密

日期：2026-09-28　前置：workbuddy-01-侦察与架构（§5 凭证体系、§6 定制 Electron fork）
成品：`workbuddy/re/buildkey.json`、`workbuddy/re/get_buildkey.js`、`workbuddy/re/decrypt_auth.py`

## 1. 结论

WorkBuddy 5.6.2 的本地凭证静态加密**已被完全破解**：

1. at-rest 构建密钥（`atRestSecretKey`，全版本共享常量）编在定制 Electron 的原生绑定
   `electron_browser_workbuddy_storage` 内，运行时经 `loggerGet()` 交给 JS。
2. 密钥派生：`key = sha256(atRestSecretKey_b64_ascii)`，`keyId = sha256(key).hex[:16] = 9127dea1b44020a7`。
3. suite-1 envelope = AES-256-GCM(key, nonce12, AAD, tag16)，AAD 是结构化域分隔串（§4），**不含**字段路径。
4. 用构建密钥可离线解密 `%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\*.info` 的全部受保护字段
   （accessToken/refreshToken/昵称/手机号），亦可解出 `~/.workbuddy/keyblob` 的 32B 主密钥
   （keyId `7ee32f57eb5befc4`，即 asym-v1 whole-file 的 userKey）。

access/refresh token 解出后为 RS256 JWT（256B 签名），**iss = `https://www.workbuddy.cn/auth/realms/copilot`
——后端身份层是 Keycloak**（realm `copilot`，azp `console`，typ v2，roles 含 offline_access/uma_authorization）。

## 2. 提取构建密钥（动态法，已实测）

静态路径（exe 内搜 `atRestSecretKey`/`version":1` 等）为零命中——payload 在原生层不是明文 JSON。
动态提取不需要 Frida：Electron 主进程支持 Node inspector。

```
"C:/Program Files/WorkBuddy/WorkBuddy.exe" --inspect=127.0.0.1:9333 &
curl http://127.0.0.1:9333/json/list          # 取 webSocketDebuggerUrl（type=node）
node get_buildkey.js <ws-url>                  # 或内联脚本
```

eval 环境无全局 `require`，直接走链接绑定：

```js
process._linkedBinding('electron_browser_workbuddy_storage').loggerGet()
```

返回 payload（本版本实测值已存 `buildkey.json`）：

```json
{"version":1,
 "atRestSecretKey":"Sik9U5aXhCdwTVEwsEySDOmDoB9r9ntFxHF1fst9LQI=",
 "atRestDeveloperPublicKey":{"alg":"RSA-OAEP-256",
   "id":"ed10653ca8be7e43bc675e01aa7171ca43ad5a35c2f28a06db9517487c77dd72",
   "key":"MIIBojANBgkq…（RSA-3072 SPKI DER）"}}
```

用完即关：`taskkill //IM WorkBuddy.exe //F`（窗口会一闪而过）。
版本升级后 keyId 变了就重跑一遍（幂等，10 秒）。

## 3. 密钥层级（全部实测验证）

```
构建密钥 buildKey（exe 原生层，keyId 9127dea1b44020a7）
 ├── 直接用于 auth .info 的字段级 envelope（suite-1, sym-v1, framing field）
 └── 作为 protectorKey 包裹 ~/.workbuddy/keyblob 的 static-v1 slot
      └── 主密钥 masterKey（keyId 7ee32f57eb5befc4，32B）
           └── asym-v1 whole-file（WBEA1）的 userKey：保护 settings.json 等整文件加密（USER_SETTINGS_CREDENTIAL_FIELDS）
```

keyblob wire：`{version:1, keyId, slots:[{type:"static-v1", protectorKeyId, wrapped:<envelope b64>}]}`，
`wrapped` 用构建密钥 + `{framing:"file"}` 上下文 seal。

## 4. suite-1 envelope 与 AAD（源 packages/at-rest-crypto/dist/aes-gcm-4L6MEmMw.mjs）

envelope（JSON，canonical base64 校验）：

```json
{"suite":1, "keyId":"<16hex>", "nonce":"<12B b64>", "authTag":"<16B b64>", "ciphertext":"<b64>"}
```

AAD（`buildAuthenticatedContextAad`，sym-v1 分支；`WB-AAD\0` 为域分隔）：

```
"WB-AAD\0"                       # AAD_DOMAIN
0x01
len32(fmt) || fmt                # STANDARD_FORMAT_ID: field="WBEV1" file="WBEF1"（record=WBER1 stream=WBES1）
len32("sym-v1") || "sym-v1"
uint32be(suite)                  # = 1
len32(keyId) || keyId
0x02                             # FRAMING_CODE: file=1 field=2（record=3 stream=4）
0x00                             # optional uint64 sequence（field/file 无）
0x00                             # final undefined → 0
```

注意：`ProtectedFieldCodec.open` 对 sym-v1 只传 `{framing:"field"}`——`purpose/resourceId/fieldPath`
**不进** sym AAD（它们只出现在 asym-v1 envelope 的明文头部并参与其 AAD）。解密无需知道字段路径。
asym-v1（advanced）：外层 RSA-OAEP-256 包 32B 内容密钥，magic `WBEA1\n`（file）/`WBEV1`（field），
envelope 带 `scheme:"asym-v1"` 且 purpose/resourceId/fieldPath 明文入包并受 MAC 保护。

## 5. 解密结果（本机 workbuddy-desktop.info，全值档案另见 §8）

| 字段 | 结果 |
|---|---|
| `auth.accessToken` | RS256 JWT，1535B，`iss=https://www.workbuddy.cn/auth/realms/copilot` |
| `auth.refreshToken` | RS256 JWT，1536B（Keycloak refresh token，offline_access） |
| `account.nickname` | `MiManchi231225`（全值见 §8.1） |
| `account.phoneNumber` | `13056943007`（全值见 §8.1） |
| `accounts[]/allAccounts[]` 同字段 | 一致（多账号结构镜像） |
| `~/.workbuddy/keyblob` | masterKey keyId `7ee32f57eb5befc4`，与文件声明一致 ✓ |

JWT 关键 claims：`azp: console`、`aud: account`、`scope: openid acr profile basic web-origin …`、
`realm_access.roles: [offline_access, default-roles, uma_authorization]`、`auth_time/iat/exp`（access 30d 窗口与 `.info` 的 `expiresIn: 2592000` 吻合）。
`preferred_username` 即登录手机号——**一个构建密钥 + 一个 `.info` 文件 = 完整会话身份**。

## 6. 复现命令

```bash
cd workbuddy/re
# 提取（见 §2；buildkey.json 已存档，版本不变可跳过）
python decrypt_auth.py "C:/Users/12925/AppData/Local/CodeBuddyExtension/Data/Public/auth/workbuddy-desktop.info"
python decrypt_auth.py "C:/Users/12925/.workbuddy/keyblob" --full
# --full 输出明文/密钥材料；默认打码
```

## 7. 开放项

- RSA-3072 开发者公钥只用于 seal（advanced 保护），无私钥——不影响对称解密路径。
- ~~settings.json WBEA1 整文件加密验证~~ **已结（workbuddy-03-ACP与签到计费 §1）**：全库无 WBEA1 实例，settings.json 为明文。
- 静态定位 exe 内 payload blob：`loggerGet` 返回的 JSON 在原生层拼接，嫌疑区在
  `electron_api_workbuddy_storage.cc` 符号附近的 0xa0f497b 一带的高熵 blob，未深挖（动态法已够用）。

## 8. 解密全值档案（操作者授权落档，2026-09-28 时点值）

### 8.1 身份字段全值（workbuddy-desktop.info）

| 字段 | 值 |
|---|---|
| `account.uid` | `887e22c0-32df-4935-8811-226031b6d12d` |
| `account.uin`（QQ号） | `330100002954` |
| `account.nickname` | `MiManchi231225` |
| `account.phoneNumber` | `13056943007` |
| `account.wechatOpenId` | `ogMt_6M2xgPbnUNLWSPftORO-k6c` |
| `account.mpOpenId` | `oKK9J14ntoOm2NlCAj6tUMfBADok` |
| `auth.sessionState` | `221d12e5-dc92-46da-a229-d16f4d2b3578`（同 JWT sid） |
| `auth.domain` | `www.workbuddy.cn` |
| `auth.expiresIn / refreshExpiresIn` | 2592000（30d）/ 5183999（60d） |

### 8.2 access / refresh JWT 全文（RS256，刷新即由新对取代）

`kid: myfEzp783Ki_JCx8Vnc3X_ix6jZrb6Cf5OMkGZMPI3s`，iat 1790597790（2026-09-28）、access exp 1793189790、refresh exp 1795781790。

**access**（`typ: Bearer`）：
```
eyJhbGciOiJSUzI1NiIsImtpZCI6Im15ZkV6cDc4M0tpX0pDeDhWbmMzWF9peDZqWnJiNkNmNU9Na0daTVBJM3MiLCJ0eXAiOiJKV1QiLCJ2ZXIiOiJ2MiJ9.<payload 已脱敏>.<signature 已脱敏>
```

**refresh**（`typ: Offline`，offline_access 角色）：
```
eyJhbGciOiJSUzI1NiIsImtpZCI6Im15ZkV6cDc4M0tpX0pDeDhWbmMzWF9peDZqWnJiNkNmNU9Na0daTVBJM3MiLCJ0eXAiOiJKV1QiLCJ2ZXIiOiJ2MiJ9.<payload 已脱敏>.<signature 已脱敏>
```

claims 补充：`sub_type: user`、**`token_source: enterprise_switch`**（登录会话经企业切换通道签发）、`allowed-origins: ["*"]`。

### 8.3 复现

```bash
cd workbuddy/re
python decrypt_auth.py <path/workbuddy-desktop.info> --full   # 全部字段明文
python decrypt_auth.py ~/.workbuddy/keyblob --full            # 主密钥 hex
python wb_client.py auth                                      # 会话头所需字段
```
