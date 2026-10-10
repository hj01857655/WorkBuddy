# OAuth 验证 —— WorkBuddy 本地逆向（app.asar + 数据目录会话记录）

> 印证对象：《OAuth原理-GitHub参考实现.md》（WorkBuddy2api-panel `cmd/login/main.go`）。
> 逆向材料（2026-09-26）：
> ① 官方桌面端 `C:\Program Files\WorkBuddy\resources\app.asar`（5.6.2，317MB，Python 字节扫描 + ripgrep）；
> ② 数据目录 `C:\Users\12925\.workbuddy` 下的**真实会话/日志记录**（ripgrep grep）；
> ③ 无凭据实弹探测。
> **结论：参考实现声称的流程与官方客户端逐条吻合，且补充了参考实现没有的硬参数。**

## 一、会话记录里的实锤（数据目录，非推测）

用 grep 在 `~/.workbuddy` 中搜到的**真实流量记录**（客户端自己跑出来的）：

| 证据 | 文件:行 | 内容 |
|---|---|---|
| 登录发起 | `logs\2026-09-25\2026-08-23-23-26-35__628e93d4cc7046f230a82bf9669ece5c.log:33823,33831` | `auth/state?platform=CLI` |
| 同上 | `traces\21392\trace_b666809515b64226be90f91537c027c9.json`（多处） | `auth/state?platform=CLI` |
| 刷新 | `logs\2026-09-25\2026-08-23-23-26-35__....log:5229,22263,25097` | `auth/token/refresh` |
| 刷新（CLI host） | `logs\2026-09-25\__workbuddy_cli_host__-0-59de9db6__a54b03c3b063082e473e33f19e5a2034.log:196` | `auth/token/refresh` |

即：**官方桌面端日常会话就是用 `platform=CLI` 走 auth/state，用 `auth/token/refresh` 续期**——
与参考实现的路径、参数完全一致。注意 `logs\daemon.log` 里没有命中，认证流量走的是
per-project 会话日志与 trace，不在 daemon 日志里。

## 二、app.asar 代码级证据（字节偏移定位）

认证包为 `packages/authentication`（偏移 114M–118M 区间）。ripgrep 验证关键行：

```
1681340:v2${this.prefixPath}/auth/state?platform=${platform}
1681630:isLoginPollPending(envelope, 11217
1681673:isLoginPollPending(envelope, 12151
```

### 1. 端点与挂载（验证参考实现第二节、第三节步骤 1/3/4）

- `POST /v2${prefixPath}/auth/state?platform=${platform}`（@115909287、@115918556）
- `GET  /v2${prefixPath}/auth/token?state=${authState.state}`（@115922452）
- `GET  /v2${prefixPath}/login/account?state=...` + `Authorization: Bearer ${authToken.accessToken}`（@115924045）
- **`prefixPath = authentication?.attributes?.prefixPath || ""`**（@115929311 getter）——
  CLI/插件侧为 `plugin`（/v2/plugin/auth/*），桌面直连侧为空（/v2/auth/*）。同一服务端路由两种挂载。
- **`platform = authentication?.attributes?.platform ?? configuration.platform`**——
  是配置属性而非硬编码；合法枚举 `ClientPlatform`：`VSCode / JetBrains / Vim / XCode /
  VisualStudio / WebChat / WXIDE / CodeBuddyIDE / CLI`（@114033673）。会话记录证明实际用 `CLI`。

### 2. 轮询与 pending 业务码（验证第三节步骤 3，参考实现没有的细节）

`loopGetToken`（@115922100 起）：

```
while (Date.now() - startTime < SIGN_IN_PENDING_TIMEOUT) {
  await wait(SIGN_IN_FETCH_INTERVAL);
  ...
  if (hasUsableAuthToken(envelope?.data)) return authToken;
  if (isLoginPollPending(envelope, 11217)) continue;
  throw new SignError("Failed to fetch auth token");
}
```

- **pending 业务码有两个：`11217` 和 `12151`**（ripgrep 双命中 @1681630/@1681673）。
  参考实现只笼统写「code != 0」，官方判定是白名单这两个码。
- `hasUsableAuthToken(envelope?.data)` 成立才算登录完成。

### 3. 无凭据端点的官方头（补充第二节）

state 发起与 token 轮询都不带普通鉴权头，而是显式标记（@115918419、@115922752）：

```
X-No-Authorization: true
X-No-User-Id: true
X-No-Enterprise-Id: true
X-No-Department-Info: true
```

### 4. 刷新端点的请求头（补充参考实现第三节-3）

`POST /v2${prefixPath}/auth/token/refresh`（@115914939、@115935110）带：

```
X-Refresh-Token: <refreshToken>
X-Auth-Refresh-Source: plugin
```

### 5. 无 PKCE（验证参考实现第四节要点 1）

- 认证包区域（114M–118M）`code_challenge` **0 命中**；
- 全文件 67 处命中全部位于 MCP OAuth 客户端库等无关模块；
- 实弹探测返回的 authUrl 参数只有 `platform` + `state`，无任何 PKCE 参数。

## 三、实弹探测（global 端点，无凭据）

```
POST https://www.workbuddy.ai/v2/plugin/auth/state?platform=CLI
Headers: Origin/Referer https://www.workbuddy.ai, UA CLI/2.63.2 CodeBuddy/2.63.2
Body: {}
→ HTTP 200
{"code":0,"msg":"OK","requestId":"624081b0-...","data":{
  "state":"0332ecd2-aba3-4348-aabc-520346af52a0",
  "authUrl":"https://www.workbuddy.ai/login?platform=CLI&state=0332ecd2-aba3-4348-aabc-520346af52a0"}}
```

state 为服务端签发 UUID；authUrl 即登录页（浏览器打开完成登录）。

## 四、对照结论

| 参考实现声称 | 本地逆向/探测 | 判定 |
|---|---|---|
| `POST /v2/plugin/auth/state?platform=CLI` | asar 代码 + 会话日志 + 探测 200 | ✅ |
| `GET /v2/plugin/auth/token?state=` 轮询 | asar `loopGetToken` + 超时/间隔常量 | ✅ |
| pending 为 `code != 0` | 官方白名单 `11217` / `12151` | 🔧 细化 |
| `login/account?state=` + Bearer | asar @115924045 | ✅ |
| 刷新 `POST auth/token/refresh` | asar + 会话日志 5 处实际发生 | ✅（并补 `X-Refresh-Token` 头） |
| 无 PKCE | 认证包 0 命中 + authUrl 无该参数 | ✅ |
| realm cn/global 双端点 | 未在本机验证 cn 域（本机记录均为 global/workbuddy.ai 域形态） | ⬜ 待验 |

## 五、对网关实现的落地建议

1. 轮询 token 时把 `11217`、`12151` 当 pending 继续等，其他非 0 code 直接报错——比「所有非 0 都等」更早暴露真错误。
2. 无凭据请求照带 `X-No-*` 四件套；刷新照带 `X-Refresh-Token` + `X-Auth-Refresh-Source: plugin`。
3. `prefixPath` 做成配置（`plugin` / 空），platform 做成配置（默认 `CLI`），与官方客户端同构。
