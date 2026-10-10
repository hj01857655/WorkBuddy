# WorkBuddy 逆向 17：MCP Apps Host —— UI 扩展系统全貌

日期：2026-09-29　前置：workbuddy-13-未探索地图（地图 #4）　销账：#4 MCP apps host / plugin / permission-bridge
样本：`workbuddy/re/app/main/app-server-mcp-apps-host.js`（347 KB）
**本样本带 `//#region` 源路径标记，注释完整未剥离——是全部 16 篇中可读性最高的一份。**

> **验证口径**：本文为**静态逆向**——原文注释与源路径均在，函数名/参数名/常量可直接引用，可信度高。但**未经运行时抓包验证**（未在真机跑通一次 `ui://` 面板）。§2.1 的「Agent 驱动的打开永远 `bootstrapToolCall=false`」等行为性结论有 §9 `mcp-app-policy.ts` 的 `shouldHostBootstrapArdotMcpApp` 恒返回 `false` 佐证，但主路径未实测。

## 1. 定位：MCP Apps 是什么

MCP Apps 是 WorkBuddy 的 **UI 扩展系统**。MCP server 不只返回文本，还能返回 `ui://` 协议的 HTML；
WorkBuddy 把它渲染成可交互面板，用户在面板里操作，操作经 bridge 中继回 MCP server。

与 16 号 guest SDK 的区别：
- **16 号**是"外部页面嵌入 WorkBuddy"（第三方 WebView → postMessage → `window.wb`）
- **17 号**是"WorkBuddy 嵌入 MCP 提供的 UI"（MCP Tool → `ui://` HTML → WorkBuddy 渲染）

两者方向相反，是同一套桥接技术的两个应用面。

## 2. 核心编排：`mcp-apps/gateway.ts`（47.3 KB）

`AppGatewayService` —— Host 侧生命周期编排器，暴露给渲染层（经 Daemon）。职责三条：

1. **从 McpManager-owned controllers 直接列出 app-capable tools**
2. **materialize AppInstance**：fetch HTML + metadata + 分配稳定 loopback URL
3. **在渲染层 webview 与 MCP server 之间中继 bridge 消息**（`tools/call` / `resources/read`）

### 2.1 Agent Loop 集成

| 机制 | 说明 |
|---|---|
| `OpenHostAppParams.toolCallId` / `AppInstance.toolCallId` | 记录 Agent Runtime 调用身份，用于**结果关联** |
| `bootstrapToolCall = false` | **Agent 驱动的打开永远不重新执行 MCP Tool** |
| `pushToolResult` | 用原始标准 ToolResult 兑现实例的 `toolResultPromise`，再投递给 Guest |

**关键约束**：Host 绝不重复执行同一个 MCP Tool。面板是同一次 Tool 调用的延续，不是新调用。

## 3. 已确认的坑：缓存变体键

`buildResolverVariantKey(toolInput)` —— 原注释（逐字）：

> 绝大多数 App 的 `ui://` HTML 是静态的，同一 `resourceUri` 永远同一份内容，按 appId + resourceUri 缓存即可。
> **但有些 App 的 HTML 依赖入参** —— 例如 Miora viewer 会把「当前 `.miora` 的 loopback 地址」内联进它返回的薄壳。
> 这类 App 若共用一个缓存条目，**打开第二个画布时会拿到指向第一个画布的 HTML，且不报错**。

解法：**把整份入参归一后哈希，入参不同即不同变体**；入参为空时返回空串，缓存键退化成引入该维度之前的形态，既有 App 行为不变。

不硬编码任何具体 App 或字段名——纯通用归一化。

## 4. 完整模块树（region 标记还原，25 个源文件）

```
packages/workbuddy-server/src/
├── mcp-apps/
│   ├── gateway.ts                        47.3 KB  ★ AppGatewayService
│   ├── handlers.ts                               tools/call · resources/read 中继
│   ├── http-server.ts                            HTTP 服务
│   ├── resolver.ts                               App 解析（含变体键）
│   ├── session-runtime.ts                        会话运行时
│   ├── static-html-server.ts                     ui:// 静态托管
│   ├── local-file-viewer.ts                      本地文件查看器
│   ├── surface-metadata.ts                       面板元数据
│   ├── artifact-persist-policy.ts                产物持久化策略
│   ├── runtime-registry.ts                       Gateway 注册槽
│   ├── conversation-worker-extension-port.ts
│   ├── unknown-app-ready.ts
│   ├── diag.ts                                   诊断日志
│   └── index.ts
├── ardot/                                  ← #14 connector 生态的一角
│   ├── constants.ts
│   ├── access-token.ts                             OAuth 令牌
│   ├── mcp-app-policy.ts                           ★ App 准入策略
│   └── tool-result-artifact-manager.ts
└── sandbox/
    ├── envd-files-url.ts
    ├── sandbox-preview-handler.ts
    └── sandbox-preview-mount.ts
```

**顺带销掉 #14 的一部分**：`ardot/` 四个文件此前完全未动，现已定位（access-token = OAuth，mcp-app-policy = 准入策略）。

## 5. 宿主侧路由（`app-server-mcp-apps-host.js` 端点表）

| 路径 | 用途 |
|---|---|
| `/mcp-apps/` | MCP Apps 主入口（bundle 内 21 处引用） |
| `/workspace` | 工作区 |
| `/sandbox-preview/` | 沙箱预览 |
| `/static-html/` | `ui://` 静态托管 |
| `/_wbt/` | 内部标识（4 处） |
| `/_TMapService/` | 腾讯地图服务 |
| `/checkKey` | key 校验 |
| `/root` `/service` `/oversea` | 多区路由 |

## 6. MCP 能力面（vendored SDK，可作协议参考）

`elicitation` 26 次 / `sampling` 20 次 / `roots` 8 次 —— **MCP 2025-06 规范的完整客户端能力**：
- `sampling.requests.createMessage` —— server 请求 client 代跑模型
- `elicitation.requests.create` —— server 向用户要结构化输入（多选项时抛 `UrlElicitationRequired` 并带 `elicitations[]`）
- `roots/list` + `rootsChanged` —— server 读客户端文件系统根

`UrlElicitationRequired` 错误带 `elicitations` getter，**是 WorkBuddy 在 MCP 之上加的一层 UI 化 elicitation**（把结构化询问渲染成面板，而不是终端提示）。

## 7. 诊断通道

`mcp-apps/diag.ts` → `{WORKBUDDY_CONFIG_DIR|~/.workbuddy}/logs/mcp-apps-diag.log`
覆盖 Host ↔ MCP Server 全链路：App 命中、resourceUri、openHostApp、tools/call、resources/read、panel 打开失败原因。
截断上限：`MAX_STRING=4e3` / `MAX_JSON=12e3` / `MAX_ARRAY_PREVIEW=40`。

## 8. `handlers.ts` 完整 RPC 面（20 个 channel，10.4 KB）

渲染层 ↔ Host 的全部通道，前缀 `mcpApps:`。经 `registry.handle()` 注册。

### 8.1 全量 channel

| # | channel | 入参 | 出口 |
|---|---|---|---|
| 1 | `listApps` | — | `gateway.listApps()` |
| 2 | `ensureToolDiscovered` | `{appId?, prefixedToolName?}` | `{wait:false}` 探测 |
| 3 | `openHostApp` | `params` | `gateway.openHostApp()` |
| 4 | `closeHostApp` | `appInstanceId` | `gateway.closeInstance()` |
| 5 | `refreshToolResult` | `(appInstanceId, toolInput?)` | 重新拉结果 |
| 6 | `awaitBootstrapToolResult` | `appInstanceId` | 等待 bootstrap 结果 |
| 7 | `callTool` | `(appInstanceId, toolName, args?)` | `proxyAppToolCall` |
| 8 | `readResource` | `(appInstanceId, uri)` | `proxyAppResourceRead` |
| 9 | `getToken` | — | MCP server 鉴权 token |
| 10 | `getViewResource` | — | 面板视图资源 |
| 11 | `listTools` | `appInstanceId` | `listAppTools` |
| 12 | `listResources` | `appInstanceId` | `listAppResources` |
| 13 | `listResourceTemplates` | `appInstanceId` | `listAppResourceTemplates` |
| 14 | `listPrompts` | `appInstanceId` | `listAppPrompts` |
| 15 | `notifyToolCall` | `{sessionId?, projectId?, toolCallId, prefixedToolName, rawInput?, conversationRequestId?}` | `handleAgentToolCall` |
| 16 | `notifyToolCallUpdate` | `(toolCallId, result)` | `pushToolResult` |
| 17 | `openHostRequested` | — | 渲染层请求打开 |
| 18 | `appsChanged` | — | 目录变更推送 |
| 19 | `recordModelContextUpdate` | `(appInstanceId, update)` | 记录模型上下文 |
| 20 | `getModelContextUpdate` | `appInstanceId` | 取回上下文更新 |

**#15/#16 是结果回灌主链**：Agent CLI 经 ACP `mcpUi.toolResult` → `notifyToolCallUpdate` → `pushToolResult` → 兑现实例的 `toolResultPromise`。

### 8.2 三条中继方向（诊断日志原文标注）

```
callTool    direction: "Host→daemon→MCP Server tools/call"
readResource direction: "Host→daemon→MCP Server resources/read"
```

**中继是三跳的**，不是两跳——面板在渲染层，MCP server 在 daemon 侧，Host 居中转发。

### 8.3 参数校验不一致（值得注意）

- `closeHostApp` / `listTools` / `listResources` 等：**返回 `{ok:false, error}` 而非 throw**
- `callTool` / `readResource` / `refreshToolResult` / `awaitBootstrapToolResult`：**`throw new Error("xxx required")`**
- `notifyToolCall` / `notifyToolCallUpdate` / `recordModelContextUpdate`：缺参时**返回 `{handled:false}`**（静默）

复刻时要注意这三种失败语义的区别。

### 8.4 产物事件推送

```js
pushWorkbuddySessionExtNotification(publisher, sessionId, "_codebuddy.ai/artifact", {
  sessionId, event, artifact
})
```

MCP Apps 的产物走**会话扩展通知通道**（`_codebuddy.ai/artifact`），不是独立 RPC。

## 9. `mcp-app-policy.ts`：ardot 准入策略（0.87 KB）

原文注释（逐字）：

> Ardot Agent-live 与标准 MCP Apps 一致：**Host 不再 bootstrap tools/call**。
> 完整 CallToolResult 已由 Agent CLI 经 ACP `mcpUi.toolResult` 回灌
> （`notifyToolCallUpdate` → `pushToolResult`）。
> 无 Agent toolCall 的 UI 打开（会话恢复 / synthetic 新画布）仍由调用方显式
> `openHostApp({ bootstrapToolCall: true })` 负责。

```js
function shouldHostBootstrapArdotMcpApp(_appId) { return false; }   // 恒否

const ARDOT_OPEN_DESIGN_APP_ID = "ardot/open_design";

/** daemon 侧 Agent-live 准入保险。
 *  `open_design` 缺少 fileId/fileUrl 时创建出的 Guest 只能显示欢迎页，
 *  却会先取得 panel 独占并停放有效画布。
 *  旧 renderer 或事件竞态绕过 UI 门禁时必须在这里拒绝。 */
function shouldMaterializeArdotMcpApp(input) {
  if (input.appId !== ARDOT_OPEN_DESIGN_APP_ID) return true;
  return hasNonEmptyString(input.toolInput?.fileUrl)
      || hasNonEmptyString(input.toolInput?.fileId);
}
```

**两条防线**：
1. `shouldHostBootstrapArdotMcpApp` **恒返回 false** —— 印证 §2.1 的「Agent 驱动的打开永远 `bootstrapToolCall=false`」，ardot 是特例化实现
2. `shouldMaterializeArdotMcpApp` —— **daemon 侧的兜底**：`open_design` 缺 `fileId`/`fileUrl` 时直接拒绝 materialize。注释点明这是防"**旧 renderer 或事件竞态绕过 UI 门禁**"——即 UI 门禁失效时的第二道锁

**设计模式值得记**：UI 层做门禁只是快路径（体验好），daemon 侧必须再校验一次（安全性）。因为 UI 可被旧版 renderer 或竞态绕过。

## 10. `resolver.ts`：资源解析与缓存（4.8 KB）

### 10.1 HTML 提取：text 优先，blob 兜底

```js
function pickHtmlContent(contents) {
  for (const entry of contents) {
    if (typeof entry.text === "string" && entry.text.length > 0)
      return { html: entry.text, mimeType: entry.mimeType || "text/html;profile=mcp-app" };
    if (typeof entry.blob === "string" && entry.blob.length > 0)
      try { return { html: Buffer.from(entry.blob,"base64").toString("utf-8"),
                     mimeType: entry.mimeType || "text/html;profile=mcp-app" }; } catch {}
  }
}
```

MCP `contents[]` 里 **text 与 blob 二选一**，先遍历找 text，找不到才解 base64。自定义 MIME **`text/html;profile=mcp-app`**（§2 的 `ui://` 协议标识）。

### 10.2 缓存键：五元组 + 三级降级

```js
buildResolverCacheKey = `${app.mcpAppId}|${app.resourceUri}|${variantKey}|${projectId ?? ""}|${sessionId ?? ""}`
```

（`variantKey` 即 §2.3 那个"输入归一化哈希"—— 用它而非原始入参，正是为了避免 HTML 串做键。）

`findCachedResource` 有**三级回退**，注释虽无但逻辑清楚：

1. **精确匹配** 全五元组
2. **降级到 project 级** —— `sessionId` 置 `undefined` 重查
3. **前缀扫描** —— 先按 `appId|uri|variant|projectId|` 前缀，再按 `appId|uri|variant|` 前缀

即：**同一 project 下换 session 可复用缓存，再宽松到跨 session 复用。**

### 10.3 双命名空间（重要设计约定）

两个提取函数刻意分开：

| 函数 | 读 `_meta` 下 | 归属 |
|---|---|---|
| `extractResourceUiMetadata` | `.ui` | **MCP Apps 规范字段** |
| `extractWorkBuddyUiMetadata` | `.workbuddy.ui` | **WorkBuddy 私有命名空间** |

原文注释：

> 这里只做**形状**归一，不做任何信任判定 —— 值来自 MCP Server，安全校验全部在 `local-file-viewer.ts`。

**信任边界清晰**：解析层只认形状，校验层（`local-file-viewer.ts`）负责安全。同 `surface-metadata.ts` 的约定。

## 11. `surface-metadata.ts`：落盘限幅与敏感字段剥离（13.7 KB，最大模块）

### 11.1 launchSurface 决策：请求元数据优先

```js
function resolveMcpAppSurface(options) {
  const requested = readWorkBuddyUiMeta(options.requestMeta)?.launchSurface;
  const declared  = readWorkBuddyUiMeta(options.toolMeta)?.launchSurface;
  return requested ?? declared ?? options.hostDefault ?? "inline";
}
```

**优先级：requestMeta > toolMeta > hostDefault > `"inline"`**。`isSurface()` 只接受 `"inline"` / `"panel"` 两个值，其余（脏数据）被 `readWorkBuddyUiMeta` 直接丢弃。

### 11.2 限幅常量

```js
MCP_APP_TEXT_MAX_CHARS   = 65536   // 64 KB
MCP_APP_BLOB_MAX_CHARS   = 4096    // 4 KB（base64 串长度）
MCP_APP_STRING_MAX_CHARS = 16384   // 16 KB
```

### 11.3 敏感字段剥离（入库前）

```js
SENSITIVE_KEY_RE = /^(access[_-]?token|refresh[_-]?token|id[_-]?token|authorization
  |api[_-]?key|client[_-]?secret|secret|password|passwd|private[_-]?key)$/i;

SIGNED_QUERY_PARAM_RE = /^(signature|sig|token|access_token|x-amz-signature
  |x-amz-credential|x-amz-security-token|Expires|OSSAccessKeyId)$/i;
```

**两个正则都按 key 匹配、与值无关** —— 键名命中即剥离，不论值是不是真密钥。`SIGNED_QUERY_PARAM_RE` 专治**签名 URL 泄漏**（预签名 URL 里 `X-Amz-Signature` + `X-Amz-Credential` + `Expires` 三件套齐全，等价于临时凭据）。

### 11.4 产物快照：panel 与 inline 待遇不同

`McpAppToolResultArtifactManager` 原文注释：

> - **panel**：入库并 publish（产物卡可见）
> - **inline**：静默入库（不 publish，UI 不出卡），按 sessionId+toolCallId 可查，**供重启兜底**

`onToolResult` 有两道早退：`!input.sessionId` 或 `toolResult.isError` 直接返回（**错误结果不落盘**）。

in-flight 去重键 `` `${sessionId}:${uri}` ``，避免同一结果并发重复写。

`normalizeToolResult` 的注释点出容错设计：

> resolver 返回 ready 时使用规范化结果；defer/ignore 时保持原始 Guest 结果，**不能让可选的产品产物增强阻断标准 MCP Apps 回灌**。

即：产物增强是**可选旁路**，失败不能影响主链。

### 11.5 `unknown-app-ready.ts`（369 B，最小模块）

```js
/** 判断 openHost 目标是否是内置 Ardot MCP App，供建联 hook 使用。 */
function isArdotHostAppRef(input) {
  const appId = input.appId ?? "";
  const prefixed = input.prefixedToolName ?? "";
  return appId.startsWith("ardot/")
      || prefixed.includes("mcp__ardot__")
      || prefixed.startsWith("ardot_");
}
```

**三种 ardot 标识写法都认**（appId 前缀 / MCP 标准 `mcp__<server>__` / 下划线风格）。这个判定专供"建联 hook"——即 §9 `mcp-app-policy.ts` 那条 daemon 侧门禁的触发前置。

## 12. `static-html-server.ts`：产物托管（6.7 KB）

**存在理由**（原文注释）：

> Serves registered local directories over HTTP at `/static-html/<token>/<relPath>`.
> Designed to make HTML artifacts **same-origin with the tmap proxy**, avoiding
> cross-protocol (`file://` vs `http://`) CORS issues.

路由 `ROUTE_PREFIX = "/static-html/"`，**34 种扩展名白名单**（`ALLOWED_EXTENSIONS`）+ 全量 MIME 映射表。

**值得注意的自定义类型**：

```js
".miora": "application/vnd.miora.canvas"
```

`.miora` = miora canvas，腾讯自研画布格式（与 ardot 面板同域）。另有 3D 资产 `.glb`/`.gltf`、音视频全格式 —— 白名单面向**富产物展示**，不只是 HTML。

token 由 `index.ts` 生成：`randomBytes(16).toString("hex")`（32 hex），**每进程一次**，作为路径第一段做访问隔离。

## 13. `index.ts` 装配顺序（3.8 KB）

```js
const proxySecret = randomBytes(16).toString("hex");
const sessionRuntime = new SessionMcpAppsRuntime();
const sessionExecutorRegistration = mcpManager.registerAppSessionExecutor(sessionRuntime);
const resolver = new AppResolver(mcpManager);
const staticHtmlServer = httpServer ? new StaticHtmlHttpServer(getHttpPort, proxySecret) : undefined;
const gateway = new AppGatewayService({ mcpManager, resolver, accessTokenProvider, … });
```

原文注释：

> The host is intentionally **lazy and side-effect free until `start()` is called**;
> this matches the rest of the bootstrap that lives in `src/main/bootstrap/main-bootstrap.ts`.

**HTTP server 复用策略**（`app-server-mcp-apps-host.ts`）：

```js
const sharedHttpServer = daemon.server.getHttpServer();
const ownedHttpServer  = sharedHttpServer ? undefined : node_http.createServer();
// owned 时 listenOnLoopback → server.listen(0, "127.0.0.1")  ← 端口 0 = 随机端口
```

**有共享 server 就复用，没有才自建，且绑 `127.0.0.1` + 随机端口** —— 不占固定端口、不对外暴露。

`SessionMcpAppsRuntime` 的路由（不经 stdio spawn，直连当前会话）：

```js
callTool     → workerExtension(conversationId, "_codebuddy.ai/mcpUiCallTool",     {serverName, toolName, arguments})
readResource → workerExtension(conversationId, "_codebuddy.ai/mcpUiReadResource", {serverName, uri})
```

原文注释：**不 spawn stdio Server，也不保存 ACP session 映射**；`ConversationImpl` 每次发送时读取并注入真实 `boundAcpSessionId`。无 conversation 时抛 `Local MCP App "…" requires an active conversation`。

## 14. `local-file-viewer.ts`：安全校验层（7.4 KB，全文最完整的防御设计）

§10.3 说过解析层"只做形状归一，校验全在这里"。这文件是**整份代码里安全注释最密集的**——顶部直接列出六条安全不变量，并注明"逐条对应 `local-file-viewer.spec.ts` 的用例"。

### 14.1 为什么需要这层

原文注释解释了完整动机：

> 有些 App 的查看器产物极大且用**相对路径**加载兄弟资源（Miora 画布查看器 11.6MB + wasm/js/png）。这类产物：
> - **不能内联**进 `resources/read`：宿主用 `document.write` 把 HTML 写进 iframe（见 `sandbox-proxy.ts`，**刻意不用 srcdoc**），此时 `import.meta.url` 指向宿主 proxy 页地址，兄弟资源全部 404；且体积远超 Agent CLI 的 **256KiB 预取阈值**。
> - **不能由 App 自己拼地址**：App 是 Agent CLI 拉起的 stdio 子进程，**拿不到 daemon `StaticHtmlHttpServer` 的注册 token**。

于是约定：App 返回几 KB 薄壳（iframe src 是占位符）+ 一份 `_meta.workbuddy.ui.localFileViewer` 声明；宿主注册目录、拼 URL、替换占位符。

**关键设计**：占位符是**唯一固定字面量**：

```js
LOCAL_FILE_VIEWER_PLACEHOLDER = "__WB_LOCAL_FILE_VIEWER_SRC__"
```

原文注释解释了为什么不允许自定义：

> 声明方必须原样给出它 —— 不允许自定义，否则 App 可以要求宿主替换 HTML 里的**任意字符串**（例如某段脚本常量），把注入能力变成**任意内容改写**。

### 14.2 六条安全不变量（逐条对应测试用例）

> 注册目录 = 把该目录暴露到 loopback HTTP，且 `registerDir` 自身**不做任何路径校验**。声明又来自 MCP Server（Manager 同时管理第三方 remote MCP）。所以：

| # | 不变量 | 挡住的攻击 |
|---|---|---|
| 1 | **仅 bundled 内置 App 生效**：`runtimeSource !== 'session-stdio'` 一律忽略 | 第三方 remote App 写同样的 `_meta` 不产生任何效果 |
| 2 | **查看器产物由宿主自行定位**：按 `serverId` 推导 bundled 目录，声明只能给**一个文件名** | 否则等于让声明方决定挂哪个目录 |
| 3 | **目标后缀白名单由宿主持有**（`TARGET_EXTENSIONS`），**忽略声明里的 `extension`** | 否则声明 `.pem` 就能让宿主放行私钥目录 |
| 4 | **realpath 后复查后缀** | `bait.miora -> /etc/passwd` 这类 symlink |
| 5 | **必须是真实存在的普通文件** | 不存在的路径不该导致目录注册 |
| 6 | **任何一步失败都保留占位符原样**，绝不替换成空串 | 空 `src` 会让 iframe 加载宿主自身页面（**同源**），比白屏更难排查 |

第 3 条的注释尤其清醒：

> 目前只有 Miora 画布。新增前先想清楚：**注册的是该文件所在目录**，目录内所有 `static-html-server.ts:ALLOWED_EXTENSIONS` 后缀的文件都会可读。

即：白名单收窄到 1 个后缀不是因为保守，而是因为**粒度是整个目录**。

第 6 条的设计意图值得学：**宁可占位符失效，也不要产出"看起来成功但地址是空的"状态**。

### 14.3 校验链（`resolveTargetFile`，对应不变量 3/4/5）

```
isAbsolute(candidate)              否则 target_not_absolute
  → extname ∈ TARGET_EXTENSIONS     否则 target_ext_not_allowed
  → realpath()                      否则 target_unresolvable
  → extname(realpath) ∈ 白名单       否则 target_ext_not_allowed_after_realpath   ← 防 symlink
  → stat().isFile()                 否则 target_not_regular_file
```

**后缀查两次**——第一次查声明的路径，第二次查 realpath 之后的真实路径。第二次就是为挡 `bait.miora -> /etc/passwd`。

`TARGET_EXTENSIONS = new Set([".miora"])`，只有一个。

### 14.4 三个路径/标识校验器

```js
isSafePathSegment(v)    // 拒绝 . .. 隐藏文件(以 . 开头) 与任何分隔符
                        // 正则 ^[A-Za-z0-9][A-Za-z0-9._-]*$
isSafeIdentifier(v)     // ^[A-Za-z_][A-Za-z0-9_]*$ 且 !== "__proto__"
basenameOfAnyPlatform(v) // 按 [\\/] 切分取末段
```

`isSafeIdentifier` 显式挡掉 `__proto__` —— 声明里的 `inputField` 会被用作 `toolInput[declaration.inputField]` 取值，**原型污染风险**。

`basenameOfAnyPlatform` 的注释点出一个"碰巧安全"的坑：

> 不能只用 `path.basename`：daemon 可能跑在 POSIX 上而声明来自 Windows 侧配置，此时 `path.basename('C:\\x\\a.html')` 会原样返回整串，`isSafePathSegment` 恰好因为含 `\\` 而拒绝 —— 但那是**"碰巧安全"**。显式按两种分隔符切更可靠。

**"碰巧安全"不可靠** —— 这个判断很对。同理 `viewerEntry` 兼容旧字段时也只取 basename。

### 14.5 最终 URL 组装

```js
viewerToken = server.registerDir(dirname(plan.viewerEntry));   // 查看器目录
assetsToken = server.registerDir(dirname(targetPath));        // 目标文件目录
viewerUrl = `http://127.0.0.1:${port}/static-html/${viewerToken}/${basename(viewerEntry)}`
            + `?data=${encodeURIComponent(targetFileUrl)}&assetsBase=${assetsBase}`
html.replaceAll(PLACEHOLDER, escapeHtmlAttribute(viewerUrl))
```

`replaceAll` + `escapeHtmlAttribute`（转义 `& " < >`）—— URL 其余部分已 percent-encode，这里只处理 HTML 属性语法字符。

## 15. `tmap-proxy.ts`：腾讯地图代理（3.8 KB）

路由 `/_TMapService/_wbt/<proxySecret>/<subPath>`，把面板里的地图请求代理到腾讯地图 API 并注入 key。

### 15.1 dev 模式直连路由表

`createDevTmapProxyFetch(apiKey)` 绕过 WorkBuddy 后端直连腾讯地图（注释："Sub-path routing mirrors the Nginx glKeyDelegate example"）：

| subPath | 目标 |
|---|---|
| `/`（空） | `pr.map.qq.com/pingd?appid=jsapi_v3&key=` |
| `/checkKey` | `apikey.map.qq.com/mkey/index.php/mkey/check?key=` |
| `/oversea` | `overseactrl.map.qq.com`（用 `apikey` 参数名） |
| `/service/*` | `apis.map.qq.com/ws/*?key=` |

**注意 `/oversea` 用 `apikey=` 而非 `key=`** —— 海外接口参数名不同。

### 15.2 代理侧防护

- **方法白名单**：仅 `GET` / `HEAD`，其余 405 + `Allow: GET, HEAD`
- **token 比对**：`requestSecret !== this.proxySecret` → 403（与 §12 static-html 同一个 `randomBytes(16)` secret）
- **响应头白名单**：`SAFE_RESPONSE_HEADERS = {content-type, content-encoding, cache-control, etag, last-modified, expires}` —— **只透传这 6 个**，其余（`set-cookie`、`x-amz-*` 等）全部丢弃
- **异常兜底**：catch 后若未写完则 502 `Bad Gateway`

**响应头白名单是代理类代码的标准防泄漏做法** —— 上游若下发 `Set-Cookie` 会被原样带到 loopback 页面。

## 16. ardot 产物链：`tool-result-artifact-manager.ts`（8.3 KB）

§11.4 提到的注入点。**核心难点：ardot 返回的不是结构化对象，是一句人话。**

### 16.1 为什么要正则扒文本

```js
/** `Created Ardot design file: <name>, fileId <id>, url <url>` */
CREATED_ARDOT_FILE_RE = /Created Ardot design file:\s*(.+?),\s*fileId\s+(\d+),\s*url\s+(https?:\/\/[^\s"'\\]+)/i
FILE_ID_IN_TEXT_RE    = /\bfileId\s+(\d+)\b/i
URL_IN_TEXT_RE        = /\burl\s+(https?:\/\/[^\s"'\\]+)/i
OPENING_ARDOT_FILE_RE = /\bOpening Ardot editor for file\s+(\d+)\b/i
OPEN_ARDOT_DESIGN_FILE_RE = /\bOpen Ardot design file:\s*(https?:\/\/[^\s"'\\]+|\d+)/i
FILE_ID_IN_PATH_RE    = /\/file\/(\d+)\/?$/
```

**五个正则覆盖五种表述**（创建/打开/编辑器启动/路径尾部），外加 `UNWRAP_MAX_DEPTH = 5` 限制嵌套解包深度。`fileId` 一律 `(\d+)` 纯数字。

### 16.2 ACP 内容块 vs structuredContent 的区分

这是全文件最容易踩坑的地方，原文注释：

> ACP 内容块：**不能当成 MCP structuredContent 业务对象展开**。
> 有 fileId/fileUrl 的对象**即使带 `type` 也按业务字段保留**（不是纯包装）。

```js
function isAcpContentShaped(record) {
  const type = record.type;
  if (typeof type !== "string") return false;
  if (!["text","content","image","audio","resource","resource_link"].includes(type)) return false;
  return !readNonEmptyString(record.fileId) && !readNonEmptyString(record.fileUrl);
}
```

即：带 `type` **不一定是 ACP 块** —— 若同时有 `fileId`/`fileUrl`，判定为业务对象继续展开。ACP 块类型表与 03 号 §2.4 的 `session/prompt` block 类型一致。

### 16.3 两个 ardot App

```js
ARDOT_CREATE_DESIGN_APP_ID = "ardot/create_design"
ARDOT_OPEN_DESIGN_APP_ID   = "ardot/open_design"   // ← 与 §9 mcp-app-policy 同一个
ARDOT_APP_IDS = new Set([两者])
```

§9 的门禁只拦 `open_design`（缺 fileId/fileUrl 时拒绝 materialize），`create_design` 不受此限——新建画布本就没有 fileId。

## 17. `artifact-persist-policy.ts`：产品 resolver 链（610 B）

极简但语义明确：

```js
/** 按注册顺序组合产品 resolver；首个认领者具有最终决定权。 */
createMcpAppArtifactPersistResolver = (resolvers) => (input) => {
  for (const resolver of resolvers) {
    const decision = resolver(input);
    if (decision) return decision;      // 首个 truthy 即短路
  }
};

/** 未被产品 resolver 认领的标准 MCP App 使用 toolCallId 快照回放。 */
resolveMcpAppArtifactPersistDecision(input, resolver) = resolver?.(input) ?? {
  status: "ready",
  replay: { appId: input.appId, toolInput: input.toolInput ?? {}, preferExisting: false }
}
```

**链式责任链 + 默认兜底**：ardot 认领则走 ardot 规则，无人认领则回落到标准 MCP Apps 快照。`preferExisting: false` 表示标准路径不覆盖已有产物。

## 18. `conversation-worker-extension-port.ts`：与 core 的衔接（937 B）

最窄的一个口，**全部 937 字节**：

```js
var conversationResolver;   // 模块级单例

function registerMcpAppsConversationResolver(resolver) {
  conversationResolver = resolver;
  return () => { if (conversationResolver === resolver) conversationResolver = undefined; };  // 幂等注销
}

async function callMcpAppsConversationWorkerExtension(conversationId, method, params) {
  if (!conversationResolver) throw new Error("Conversation Engine runtime is not ready");
  const conversation = await conversationResolver(conversationId);
  if (!isWorkerExtensionConversation(conversation))
    throw new Error(`Conversation "${conversationId}" has no active local worker extension port`);
  return conversation.callWorkerExtension(method, params);
}
```

原文注释：

> 该窄口**不进入 renderer wire**，也不维护 conversationId 到 ACP sessionId 的副本；
> 真实 session binding 由 `ConversationImpl` 在发送时**动态注入**。

**无状态设计** —— 不存 conversationId→sessionId 映射表，绑定是每次现查现用。避免映射过期（这正是 §13 里 `SessionMcpAppsRuntime` 注释说的"不保存 ACP session 映射"的实现）。

两条错误分得很清：`runtime is not ready`（引擎没起来）vs `has no active local worker extension port`（引擎起来了但这个会话没有端口）。

## 19. 全局小结：这套系统的分层

```
renderer 面板  ──mcpApps:* 20 channel──▶  handlers.ts
                                          │
                                          ▼
                                     gateway.ts (47KB, Agent Loop 集成)
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              ▼                           ▼                           ▼
      resolver.ts                  local-file-viewer.ts         tmap-proxy.ts
      (形状归一+缓存)                (六条安全不变量)            (token+头白名单)
              │                           │                           │
              └───────────────────────────┴───────────────────────────┘
                                          │
                                          ▼
                              conversation-worker-extension-port.ts
                                   (937B 窄口, 无状态)
                                          │
                                          ▼
                                 ConversationImpl
                              (发送时动态注入 boundAcpSessionId)
                                          │
                                          ▼
                                  Agent CLI 进程
```

**三处防御纵深**：解析层只认形状 → 校验层做全部安全判定 → 端口层无状态不缓存绑定。任何一层失效,下一层仍能挡住（对应 §14 不变量 1 的 `runtimeSource` 检查：UI 门禁可被绕过,daemon 侧必须再校验）。

## 20. 待续

- `sandbox-proxy.ts`（§14.1 提到的 `document.write` iframe 宿主，本文件未包含）
- `ardot/access-token.ts` / `ardot/constants.ts`（OAuth 细节）
- `diag.ts` / `runtime-registry.ts`（诊断与实例注册内部）

