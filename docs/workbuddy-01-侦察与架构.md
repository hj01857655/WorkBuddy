# WorkBuddy 逆向 01：侦察、总体架构与凭证体系

日期：2026-09-28　目标：WorkBuddy 5.6.2 (Windows x64)
工作目录：`workbuddy/`（本文档 `workbuddy/docs/`，解包产物 `workbuddy/re/app/`，自建工具 `workbuddy/re/asar_extract.py`）

## 1. 目标概况

| 项 | 值 |
|---|---|
| 产品 | WorkBuddy（腾讯 · AI 办公 Agent），包名 `@genie/workbuddy-desktop`，内部代号 **genie** |
| 官网 | `https://www.workbuddy.cn`（国际版 codebuddy.ai，同族产品 CodeBuddy IDE/CLI） |
| 版本 | 5.6.2（install-manifest generatedAt 2026-09-21） |
| 安装 | `C:\Program Files\WorkBuddy`，共 1.4G |
| 技术栈 | **Electron 37.10.3-24**（腾讯定制 fork，见 §6），主进程 rolldown 打包 |
| 主载荷 | `resources/app.asar` 317MB → 解包 792MB / 20547 文件 |
| 伴随组件 | `qimei.dll`（QIMEI 设备指纹）、`qm/qm-helper.exe`、`workbuddy-editor-sdk-supervisor.exe`、`RepairApp.exe` |

## 2. 代码可读性（重大利好）

rolldown 打包**完整保留模块文件名、函数名与原始中文注释**，region 注释直接给出源仓库路径
（`../../packages/workbuddy-server/src/...`、`packages/workbuddy-core/src/...`、`packages/core/src/node/n/...`）。
逆向体验接近读源码，只有 `cli/dist/codebuddy-headless.js`（12.4MB）和 renderer assets 是压缩混淆的。

```
workbuddy/re/app/
├── package.json        # @genie/workbuddy-desktop 5.6.2, main: main/index.js
├── main/               # Electron 主进程 ~300 chunk（可读，注释全）
├── renderer/           # SPA（assets 1122 文件，Vite 哈希名，压缩）
├── preload/
├── cli/                # 内嵌 CLI：dist/codebuddy-headless.js 12.4MB + codebuddy-lite-wb.mjs 11.3MB
│                       # + product.json ×5 变体（saas/selfhosted/cloudhosted/ioa/internal）
├── native/
├── node_modules/       # @genie/browser-runtime、workbuddy-browser-use、workbuddy-desktop-sdk
└── tencent-docs/       # @tencent/tencent-docs-ai-engine
```

关键依赖：`@modelcontextprotocol/sdk` 1.24.3、`@openai/agents` 0.5.2、better-sqlite3、koffi（FFI）、kiwi-schema、undici、`@lydell/node-pty`；IM SDK 全家桶（`@wecom/aibot-node-sdk`、`@larksuiteoapi/node-sdk`、`dingtalk-stream`、`@slack/socket-mode`、`@tencent-connect/qqbot-connector`）；`cos-nodejs-sdk-v5`；`@tencent/qimei-node`；内部包 `@genie/at-rest-crypto`（静态加密，已并入 main 打包层）。
vendor 自带运行时：`PortableGit.zip`、`node.zip`、`python.zip`（沙箱工具链）；`cli/vendor/sandbox/5.6.10/betterleasy.exe` + ripgrep。

## 3. 总体架构（已证实）

```
renderer(SPA) ─┐
               ├─ REST /api/v1/* ──> app-server daemon（workbuddy-server）
CLI(headless) ─┘    本地认证: x-codebuddy-request: 1
                    + Authorization: Bearer <gatewaySecret>   # per-process randomBytes(32).base64url
                    （main/server.js:149171、code-cache.js getGatewaySecret）
CLI ↔ app-server: ACP（Agent Client Protocol）
    /api/v1/acp、/api/v1/acp/connect；头 acp-connection-id、acp-session-token（TTL 可配）
app-server → CLI：POST /api/v1/llm/completions（CLI 侧 NestJS Controller，requireAuth）
```

- CLI headless 是 **Claude Code 系 fork**：hook 事件（PreToolUse/PostToolUse/SubagentStop…）、
  `hookSpecificOutput`/`continueRequest` 结构与 CC 同构；环境变量面 `CODEBUDDY_*`（数百个）。
- 云端注释自证：`daemon → 控制面 agentserver（copilot.tencent.com）、daemon → PaaS 控制面、
  daemon → 沙箱数据面反代域名（{port}-{sandboxId}.e2b.*）`——云端会话跑在 **e2b 类沙箱**。
- 代码注释中带自家漏洞编号（`CNVD-ZC-2026-6234 / #100839`），内部质量体系痕迹明显。

## 4. 云端 API 面

### 4.1 入口与故障转移（CLI 硬编码）

```
CN_SAAS_CORE_API_PRIMARY_ORIGIN   = https://www.workbuddy.cn
CN_SAAS_CORE_API_ALTERNATE_ORIGIN = https://copilot.tencent.com
CN_SAAS_CORE_API_BACKUP_ORIGIN    = https://wb.tencentbuddy.com   (+ resolveFailover* 前门选择逻辑)
```

product.json `officialEndpoints` 全集：`www.workbuddy.cn`、`staging.workbuddy.cn`、`wb.tencentbuddy.com`、`copilot.tencent.com`、`staging-copilot.tencent.com`、`www.codebuddy.ai`、`staging-codebuddy.tencent.com`。
SSO 域族：`tencent.sso.copilot.tencent.com`、`*.sso.copilot.qq.com`、`*.sso.codebuddy.cn` 等变体。

### 4.2 云端请求头（buildAuthHeaders，main/server.js:6122）

```
Authorization: Bearer <auth.accessToken>
X-User-Id: <account.uid>
X-Enterprise-Id / X-Tenant-Id: <account.enterpriseId>   # 企业租户
X-Domain: <auth.domain>                                  # 实测值 www.workbuddy.cn
X-B3-TraceId / X-B3-SpanId / X-B3-Sampled: 1 / X-Trace-Id / b3   # 三协议共享同一 traceId
```

产品身份头（PRODUCT_IDENTITY_FALLBACKS）：`X-IDE-Type: WorkBuddy`、`X-IDE-Name: WorkBuddy`、`X-Product: SaaS`、`X-Private-Data: true`。

### 4.3 会话主链路（main/conversations.js，源 packages/workbuddy-core）

| 调用 | 语义 |
|---|---|
| `POST /console/as/conversations/` | 建会话 |
| `GET /console/as/conversations/?type=cloud&page=1&size=100` | 列表 |
| `GET /console/as/conversations/{id}`、`/{id}/session` | 详情 / **沙箱凭证** |
| `POST /console/as/conversations/{id}`、`/{id}/{action}`、`/{id}/delete|fork|manifest|persistent`、`/batch-get` | 发送与操作 |
| `GET /console/as/projects/{projectId}/conversations` | 项目维度 |

`/{id}/session` 返回 sandbox 凭证 `{ link|endpoint（尾缀 /acp）, token, sessionId, e2bDataEndpoint }`。

**对话流 = ACP over SSE**（对 `{endpoint}`）：
- 首连：`POST {endpoint 去尾缀 /acp → /acp/bootstrap}`，JSON body，响应头下发 `Acp-Connection-Id`；
- 续传：`GET endpoint` + `Accept: text/event-stream` + `Acp-Connection-Id` + `Last-Event-ID`，心跳超时触发重连。

**容量排队**（capacity-queue）：`POST /v2/chat/queue/status|cancel`，头 `X-Conversation-Request-ID` + `X-Conversation-ID`；业务码 **6020 WAITING / 6021 FULL / 6022 USER_LIMIT**；轮询间隔按队列位置 2s/5s/10s。云端 QueueManager 走 `{endpoint_base}/tasks/{conversationId}/queue`（endpoint_base = connectionInfo.endpoint 去掉 `/acp`）。

### 4.4 其余云路径

| 路径 | 用途 |
|---|---|
| `/v2/as/connector/*` | **route_130**，Desktop 用 token/API Key 鉴权（`/console/as/connector` 是 route_129 浏览器 SSO Cookie 口径，Desktop 会整体改写前缀——APISIX `unauth_action=deny`） |
| `/console/as/netdrive/access-token` | 网盘 baseUrl+token 运行时下发 |
| `/console/as/support/presigned_url` | COS 上传/下载预签名 |
| `/openapi/knowledge_base/v1/*` | ima 知识库（get/add_knowledge、search_knowledge_base…） |
| `/openapi/media/v1/*` | 媒体；`preview_medias`/`download_medias` 在 ENCRYPTED_PATHS 集合（响应体加密） |
| `/openapi/drive/v2/util/temp-scene` | 腾讯云盘上传 |
| `/openapi/v2/skill-token` | 技能令牌 |
| `/v2/as/netdrive/cloudagent-config/download` | 云 agent 配置 |
| `/v2/service-proxy/*` + `X-Service-Id` | HookServiceProxy：网关微服务通用透传 |
| `/operation-platform/market/expert/*`、`/api/v2/open-platform/*` | 专家市场（运营位） |
| `/oauth/start`、`/oauth/callback`、`/login?platform=agents&state=0&redirect_uri=…` | OAuth/登录 |
| `/console/as/p/connector/oauth/lexiang-ol|tdocs-app/connect` | 乐享 / 腾讯文档连接器 OAuth 回跳 |

专家市场静态资源桶：`acc-1258344699.cos.accelerate.myqcloud.com/workbuddy/expert-marketplace`。

## 5. 凭证与静态加密体系（已完整还原）

### 5.1 认证文件（本机实测有活会话）

```
{sharedDataPath}/auth/{authenticationId}.info
authenticationId = product.json authentication.id = "workbuddy-desktop"   # 另见 workbuddy-desktop-ai.info
sharedDataPath   = ~/AppData/Local/CodeBuddyExtension/Data/Public    （EXTENSION_DATA_DIR_NAME="CodeBuddyExtension"）
```

JSON 顶层：`account`、`auth`、`accounts[]`、`allAccounts[]`（多账号）。本机字段全值见 02 号 §8 档案。关键字段：
`account.uid`(uuid)/`uin`(QQ号)/`type: personal`/`wechatOpenId`/`mpOpenId`/`loginChannels:["openplatform"]`；
`auth.accessToken`/`refreshToken`（Bearer）、`expiresIn: 2592000`(30d)/`refreshExpiresIn: 5183999`(60d)、
`sessionState`(uuid)、`domain`、`lastRefreshTime/expiresAt/refreshExpiresAt`（epoch ms）。

### 5.2 字段加密（suite-1 envelope，AES-256-GCM）

受保护字段（AUTH_CREDENTIAL_FIELDS）：`auth.accessToken`、`auth.refreshToken`、`account.phoneNumber`、
`account.nickname`、`account.departmentFullName`、`accounts/*/allAccounts.*` 同名字段。
存储形态：`{"$wbEncrypted":1, "envelope":"<b64>"}`；envelope 解开为：

```json
{"suite":1, "keyId":"9127dea1b44020a7"(16hex), "nonce":12B, "authTag":16B, "ciphertext":…}
```

密钥派生（main/process-cpu-sampler.js）：
```
key   = sha256(atRestSecretKey_b64_string_utf8)   # 32B
keyId = sha256(key).hex[:16]                       # 文件里见 '9127dea1b44020a7'
```
atRestSecretKey 来自 payload JSON `{version:1, atRestSecretKey, atRestDeveloperPublicKey?}`，零钥哨兵拒绝，canonical base64 校验。
非对称通道（advanced / asym-v1）：RSA-OAEP-256 开发者公钥包裹，envelope 多一个 `scheme:"asym-v1"` 字段并把 purpose/resourceId/fieldPath 明文写入、读取时比对。

### 5.3 密钥供给链（关键发现）

- 主进程：`loadMainCredentialProtectionBootstrap()` → `electron.workbuddyStorage.loggerGet()`
  —— **`workbuddyStorage` 是定制 Electron 的原生绑定**（`electron_api_workbuddy_storage.cc`，
  JS 包装 `lib/browser/api/workbuddy-storage.ts`：`createCipher/createDecipher/loggerGet`）。
  **at-rest 构建密钥（atRestSecretKey + developerPublicKey）编译在 WorkBuddy.exe 原生层**，运行时才交给 JS。
- keyblob：`~/.workbuddy/keyblob`（336B，`{version:1, keyId:"7ee32f57eb5befc4", slots:[{type:"static"…}]}`），
  由 `loadOrCreateKeyblobMasterKey({keyblobPath, protectorKey: 构建密钥})` 管理——非对称 userKey 落盘靠构建密钥保护。
- 策略环境变量 `WORKBUDDY_AT_REST_ENCRYPTION`（off/fields/files…），daemon 经 IPC gate 接收 bootstrap，policy 冲突拒绝。
- 旧版会话迁移（legacy-auth-session-migrator.js）用 Electron `safeStorage`（= DPAPI）。

→ 离线解密 `.info` 文件的路径：**从 WorkBuddy.exe 原生层提取 `loggerGet` 返回的 key payload**（静态找嵌入 blob 或 Frida 钩 `loggerGet`），再 `sha256` 派生 key 做 GCM 解密。列为 02 号文档目标。

### 5.4 本地安全周边

logout marker（`.logout` 写入即弃用会话，retire 带进程号+uuid）；认证文件原子写 + 文件锁 + 备份硬链接恢复 + 失败上报（`security/at-rest-failures-v1.json`）。

## 6. 定制 Electron fork（WorkBuddy.exe 204MB）

- version 文件 `37.10.3-24`；内嵌 JS bundle 可见 fork 增项：`./lib/browser/api/workbuddy-storage.ts`。
- 原生绑定符号：`electron_browser_workbuddy_storage`、`loggerGet/loggerIn/loggerOut`（loggerIn/Out 是进程日志管道）。
- `resources/qimei.dll` + `@tencent/qimei-node`：QIMEI 设备指纹；本地缓存 `~/.workbuddy/qimei-cache.json`（qimei36）。
- `%LOCALAPPDATA%\WorkBuddy`（仅 logs）、`%LOCALAPPDATA%\@genieworkbuddy-desktop-updater`（更新器）。

## 7. `~/.workbuddy` 主数据目录 schema（本机实测）

```
IDENTITY.md / MEMORY.md / SOUL.md / USER.md   # agent 记忆/人设四件套（OpenClaw 风格布局）
keyblob                                        # 见 §5.3
settings.json / models.json / mcp.json / mcp-approvals.json / mcp-tool-list.json
app-config.json                                # locale/personalization(toneStyle/customPrompt)/disableAgentTeams
sessions/ session/ memory/ plans/ projects/ audit-log/ checkin/
credentials/          # 技能凭证（gongyi-expert、meituan-living-deals-assistant）
checkin/              # 签到：auth.json + browser-profile/ + storage-state.json + screenshots/ + *.log
device-id / qimei-cache.json / failover.json / edge-sync-mapping-v{2,3,4}.db (sqlite)
```

签到目录带 **browser-profile + storage-state**——浏览器自动化签到（对应云端会员积分体系）。

## 8. CLI 嵌入与扩展面

- `cli/product.json` authentication：`cli-external-link`，`X-User-Id`(URLEncode) + Bearer，prefixPath `/plugin`。
- 环境变量面 `CODEBUDDY_*` 数百个（BASE_URL/API_KEY/AUTH_TOKEN/…），模型目录支持每模型自定义 url 与自定义头，OpenAI 兼容客户端强制尾缀 `/chat/completions` 规范化。
- IM/协作通道：WeCom aibot、飞书（含 encryptKey/verificationToken 凭证位）、钉钉 stream、Slack socket-mode、QQ bot、Discord gateway、元宝 bot `wss://bot-wss.yuanbao.tencent.com/wss/connection`。
- A2A 协议（agent2agent artifact 拉取）、workspace-dirs 同步、team messages、permission-bridge。

## 9. 待挖清单（按优先级）

1. ~~从 exe 提取 at-rest key payload → 离线解密 auth 文件~~ **已完成，见 workbuddy-02-凭证加密破解**（构建密钥提取 + suite-1 GCM 解密全链路打通，后端身份层确认为 Keycloak realm copilot）
2. ~~对话发送的完整 ACP 方法面~~ **已完成，见 workbuddy-03-ACP与签到计费 §2**（bootstrap 5合1、session/prompt、_codebuddy.ai 扩展方法、update 事件）
3. ~~QIMEI 体系~~ **已测绘，见 workbuddy-04-QIMEI与风控**（appKey/SDK 序号接口/helper 流/缓存位置/CODEBUDDY_QIMEI36 分发；dll 缓存加密与远程拉取 URL 留待抓包）
4. ~~签到体系~~ **已完成，见 workbuddy-03-ACP与签到计费 §3**（`POST /billing/meter/daily-checkin`，code=10001 重复签；本机 checkin/ 为外部自动化）
5. renderer SPA chat chunk 的 API client（lib-chat-ui、esm-* chunk）
6. `models.json`/settings.json 的加密字段（USER_SETTINGS_CREDENTIAL_FIELDS：`env.CODEBUDDY_API_KEY`、`gateway.password`、wecom webhook/botSecret）
7. CLI product.json config 块的 creditPurchaseActions（6005…，计费体系）
