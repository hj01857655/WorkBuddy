# WorkBuddy 逆向 18：腾讯文档 AI 引擎（tencent-docs）

日期：2026-09-29　前置：workbuddy-13-未探索地图（地图 #6）　销账：#6 tencent-docs 集成
样本：`re/app/node_modules/@tencent/tencent-docs-ai-engine/`（公开 npm 包，`@tencent` scope，MIT）

> **验证口径**：静态逆向。包内 TypeScript 编译产物**带完整 JSDoc 与 `//#region` 源路径**，设计意图可直读。但**未实机启动过 `editor_sdk.exe`**（200MB 二进制），运行期行为未验证。

## 1. 定位：一个本地 MCP server + 预览服务器

`package.json` 的 description 把架构说完了：

> Spawn-and-supervise wrapper around the bundled `editor_sdk` binary
> (serves the **JSON-RPC MCP endpoint `/mcp`** consumed by agent CLIs
> **and** the editor preview assets `/static/<type>/pc.html` on a **single port**, default **:39099**;
> lazy start, **stdout-based readiness detection**, graceful shutdown)
> plus the local-docs **scenario layer** (prompt fragment + variable collector + cwd-based detector)
> used by host system-prompt renderers.

拆成四块职责：

| 模块 | 大小 | 职责 |
|---|---|---|
| `tencent-docs-service.js` | 51.6 KB | 进程 spawn/监管、端口分配、预览 URL 构造 |
| `mcp/stdio-mcp-bridge.js` | 631.7 KB | stdio ⇄ HTTP MCP 桥（编译产物，含依赖） |
| `routing-prompt.js` | 17.9 KB | 路由提示词（决定何时用文档能力） |
| `scenario-detector.js` | 5.1 KB | 按 cwd 判断是否"本地文档编辑"场景 |

二进制：`bin/win32-x64/editor_sdk.exe` **204.6 MB**，`editor-sdk-version.json` 记录版本。

## 2. 工具名前缀（与 17 号 ardot 同一套约定）

`mcp-constants.js` 定义**两套** server 名：

```js
TENCENT_DOCS_LOCAL_MCP_NAME        = 'tencent_docs_local'   // 本地 stdio server
TENCENT_DOCS_LOCAL_MCP_TOOL_PREFIX = `mcp__${…}__`
TENCENT_DOCS_REMOTE_CONNECTOR_NAME = 'tencent_docs'         // 云端 connector
TENCENT_DOCS_REMOTE_MCP_TOOL_PREFIX = `mcp__${…}__`
```

即模型看到的工具名是 `mcp__tencent_docs_local__<tool>`（本地）或 `mcp__tencent_docs__<tool>`（远程）。**与 17 号 §11.5 的 `mcp__ardot__` 同一命名规则。**

注释里的告诫：

> Keep both apps importing this constant — **never hard-code the string elsewhere.**

## 3. 端口文件机制（跨进程发现）

```js
TENCENT_DOCS_ENGINE_PORT_FILE_ENV  = 'TENCENT_DOCS_ENGINE_PORT_FILE'
TENCENT_DOCS_ENGINE_PORT_FILENAME = 'tencent-docs-engine.port'
STDIO_MCP_BRIDGE_RELATIVE_PATH     = 'lib/mcp/stdio-mcp-bridge.js'
resolveEnginePortFilePath / FromEnv / FromConfigDir
writePortFile / readPortFile / deletePortFile
buildTencentDocsStdioMcpConfig / buildTencentDocsHttpMcpConfig / buildTencentDocsLocalMcpEnv
```

**引擎端口未知（默认 39099 但可能冲突），故用端口文件跨进程传递** —— 与 17 号 §13 的 `randomBytes(16)` token 是同类问题的两种解法。

常量：`PORT_ATTEMPTS = 5`、`PORT_SCAN_ATTEMPTS = 100`、`TIMEOUT_MS` 三档（`250` / `10_000` / `60_000`）。就绪检测走 **stdout**（非轮询端口）。

引擎侧端点只有两个：`/health`、`/localapi/editor/status`。

## 4. spawn 参数与两处防御性细节

```js
buildEditorSdkSpawnArgs(port, {corsOrigins, staticDir, logDir, enableTdProxy})
  → ['--port', port, `--cors_origin=${…}`, `--static_dir=${…}`, '--log_dir', …, '-td_proxy=true']
```

**① 引号**

> spawn **不经 shell**，勿给值加引号，否则 `editor_sdk` 会收到字面量 `"https://..."`。

**② 布尔开关必须严格 `=== true`**

> Strict `=== true` so accidental truthy values (e.g. **the string `'false'` from a config file**, `null`, `1`) cannot silently flip the proxy flag on. **Default behavior — omit the flag — is the safe path.**

配置文件里写 `"false"` 字符串 → 朴素实现当成真值 → **代理被意外打开**。收紧到 `=== true`，并让默认（省略）成为安全路径。

## 5. 预览 URL 与文档身份（`buildPreviewUrl`）

```js
url = `http://127.0.0.1:${port}/static/${type}/pc.html?title=…&localFilePath=…&globalPadId=…&…`
// doc 类型额外带 editorSdkUrl=http://127.0.0.1:${port}
```

**`globalPadId = md5(filePath)`** —— 注释说明了为什么不能用随机 per-view ID：

> `globalPadId` 是 SDK 侧识别"同一份本地文档"的**稳定身份**。
> **不能为了多开 preview 改成随机 per-view ID**；同文件跨窗口/iframe 的并发冲突
> **应由宿主做去重**，保持这里的文档身份语义稳定。

**职责划分**：SDK 保证"同一文件 = 同一身份"，并发去重是宿主的活。`getGlobalPadIdFromPreviewUrl` 可从 URL 反解。

## 6. 场景检测：`scenario-detector.js` 的四个设计决策

按 `cwd` **顶层**扫一遍，看有没有 office 文件，决定是否注入文档场景提示词。注释把四个决策都写明了。

**① 默认扩展集刻意极小**（4 个）

```js
OFFICE_BINARY_EXTENSIONS = .docx / .xlsx / .pptx / .pdf
```

> 作为**尚未接入引擎 curated 扩展集的调用方的兜底**。这 4 个扩展**排除了在无关项目中常见的格式**（`.md`、`.csv`、旧版 `.doc`/`.xls`/`.ppt`），以免把普通开发/数据分析工作区误判为"本地文档编辑"。

生产宿主**不应依赖此兜底**，应传 `SCENARIO_DETECTABLE_EXTENSIONS`（= `SUPPORTED_EXTENSIONS` 减去 `DEV_NOISY_EXTENSIONS`，约 25 个，含旧格式与腾讯 `.wps` 系）。

**② 不递归**

> we do NOT recurse —— recursion would **balloon cost on big workspaces** and the false-positive risk grows quickly.

**③ 缓存 60s，且明确记录了它的缺陷**

> Caching: results are memoised per `cwd` for `CACHE_TTL_MS` (default 60s) so a burst of `prompt-renderer` invocations does not re-scan the dir on every query.
> **Note that the cache key is `cwd` only** —— if a single process queries the same `cwd` with **two different extension sets, the second query gets the first's cached value**.
> In practice each host process pins one extension set, so this is fine; tests should call `clearScenarioDetectorCache()` between invocations.

**明写自己的缓存 key 设计缺陷 + 为何可接受 + 测试怎么绕过** —— 这种注释比假装没有要诚实。

**④ 失败降级**

> any IO error (cwd missing, no permission) returns `false` **without throwing** —— collectors should always degrade gracefully.


## 7. 支持格式（`supported-extensions.cjs`，25 个）

```
doc   : .doc .docx .dot .dotx .wps .wpt .docm .dotm
sheet : .csv .xls .xlsx .xlt .xltx .xlsm .xltm
slide : .pptx .ppt .pps .pot .pptm .ppsx .ppsm .potx .potm
pdf   : .pdf
```

**WPS 全系在列**（`.wps`/`.wpt`），旧版 OLE 格式（`.doc`/`.xls`/`.ppt`）全支持。

## 8. 与主进程的接线（`tencent-docs-main-integration.js`，2.8 KB）

`registerTencentDocsMainIntegration({windowManager, pushRendererEvent, logger})`：

- **对话框 parent 窗口解析**：`resolveDialogOwnerWindow()` → `showMessageBox`/`showOpenDialog`/`showSaveDialog` 均优先挂到 owner，无 owner 才用无 parent 调用
- **引擎就绪 → 推 renderer**：`ENGINE_READY`
- **预览重载 → 推 renderer**：`RELOAD_EMBEDDED_PREVIEW`
- **会话冲突查询**：`wireSessionConflictLookups({sessionManager, database})` —— 文档编辑中若会话被别处处理，从 DB 取会话标题提示

## 9. 结论：与 MCP Apps 是两套并行机制

| | MCP Apps（17 号） | 腾讯文档（本文） |
|---|---|---|
| 产物托管 | `StaticHtmlHttpServer` `/static-html/<token>/` | 引擎自带 `/static/<type>/pc.html` |
| 端口 | 复用 daemon 或 `listen(0)` 随机 | 引擎自选，默认 39099，端口文件传递 |
| 就绪检测 | — | **stdout 文本** |
| 工具前缀 | `mcp__ardot__` | `mcp__tencent_docs_local__` / `mcp__tencent_docs__` |

## 10. `routing-prompt.js`（18 KB）：提示词路由层 —— 全文

只导出两个符号：`isLocalOfficeFilePath` / `renderTencentDocsRoutingPrompt`。**这是决定模型"何时该用文档能力"的那一层。**

### 10.1 输出容器：`<tencent_docs_editor_context>`

```js
const lines = ['<tencent_docs_editor_context>'];
// …Local 段 / Remote 段…
return lines;
```

**关键设计：无内容时返回 `[]`（空数组）而非空 frame。** 注释：

> Returns an **empty array** when neither channel has anything to route in this turn
> — callers should treat that as "**skip this section entirely**", NOT as
> "emit an empty `<tencent_docs_editor_context></tencent_docs_editor_context>` frame".
> An empty frame would tell the model "**Tencent Docs routing applies but there's nothing to route**", which is confusing.

即**宁可不输出标签，也不输出空标签** —— 空标签反而给模型一个矛盾信号。

### 10.2 触发条件（两通道独立判定）

```js
hasLocalOfficeFiles = attachedOfficeFiles.length > 0
                   || mentionedOfficeFileNames.length > 0
                   || activeDocIsLocalOffice
hasRemoteDocs       = remoteDocs.length > 0 || activeDocIsRemote
if (!hasLocalOfficeFiles && !hasRemoteDocs) return [];
```

四个输入源：**附件绝对路径** / **仅提及文件名** / **当前预览的活动文档** / **远程文档**。

`isLocalOfficeFilePath` 的注释再次强调 `.csv` 的排除：

> `.csv` is **intentionally excluded** (it would trigger the routing block on **every dev workflow that uses pandas / awk on CSVs**).

### 10.3 首轮 / 后续轮双 Header（省 token 的关键）

```js
TENCENT_DOCS_ROUTING_HEADER = /* 首轮 */ "Before working with any local Tencent Docs document,
  invoke the `tencent-docs-routing` skill to determine the correct tool path.
  Purely local file operations that do not touch document content
  (e.g. format conversion like docx→pdf) are the exception and do not need the skill.
  Online / remote Tencent Docs do not use this skill."

TENCENT_DOCS_ROUTING_HEADER_RECALL = /* 后续轮 */ "…You already invoked the `tencent-docs-routing`
  skill **earlier this session, so its routing guidance is still in context** — MUST follow it…
  No need to re-invoke the skill unless you need to re-read that guidance."
```

`isFirstRouting = input.includeStaticRules ?? true` 由宿主传入。原文注释：

> here it decides whether to push the model to **INVOKE** the skill (first turn)
> or to **REUSE** the guidance it already loaded earlier (later turns) —
> so the skill fires **once per session, not every turn**.
> It also gates the LOCAL priority & fallback policy below.

**每会话只触发一次 skill，后续轮只回指。** 与 03 号 §2.3 的 `_meta['codebuddy.ai/messageId']` 属于同一类 token 预算控制。

另注：**HEADER / RECALL 只在本地文档在场时发** —— "online / remote docs do not go through `tencent-docs-routing`"。但 document inventory 两种都渲染。

### 10.4 Local 段落的 XML 化上下文

```xml
<active_document type="local" path="…" [file_id="…"] />
<local_files><file path="…" />…</local_files>
<local_file_mentions><file name="…" />…</local_file_mentions>
```

活动文档附带的自然语言指令：

> The user is currently focused on this active local document.
> **Unless the user specifies another file, prefer it.**
> If the user asks what document is currently open or being previewed, **answer from this context**.

即文档编辑场景下，模型对"我现在打开的是哪个文件"这类问题**直接从上下文答，不调工具**。

所有属性值过 `escapeXmlAttribute`；`mentionedOfficeFileNames` 会先剔除已解析出绝对路径的（`!resolvedLocalOfficeFileNames.has(name)`），避免同一文件出现两次。

### 10.5 优先级与回退阶梯（两级降级）

`buildLocalChannelPriorityAndFallback(localMode)`，`localMode` 为 `'mcp'`（默认）或 `'skill'`：

> For all content work (reading, editing, summarizing, translating, creating, etc.) on local documents,
> **invoke the `tencent-docs-routing` skill.**
> It takes **priority over ALL other tools** and handles MCP tool selection and batch operations internally.

降级阶梯（两种 mode 措辞不同，语义一致）：

```
1. tencent-docs-routing skill          ← 首选，凌驾所有其他工具
        ↓ 仅当 skill 不可用 或 报告具体失败
2. mcp: 直接调 local MCP 工具
   skill: 按 tencent-local-office-edit 文档的调用风格自行驱动引擎
        ↓ 若也失败
3. 其他工具（Bash / python / Read / Write / Edit）
   —— you MUST tell the user before doing so     ← 必须先告知用户
```

**"MUST tell the user before doing so"** 是硬约束：降级到通用工具前必须声明。

`localMode` 的选择只影响第 2 级的具体说法（注释：Remote 段已不再发 online-MCP 回退阶梯，"only their dynamic inventory"）。

### 10.6 两个 skill 的职责切分（`localMode === 'skill'` 才发）

`buildLocalSkillToolsAccessNote()`：

> Two skills, two roles — **do not conflate them**:
> (a) `tencent-docs-routing` is the ***decision* skill** that chooses which channel and path to use;
> (b) `tencent-local-office-edit` is the ***work* skill** that owns the local engine's tool catalog,
>     parameter schemas, and calling style.
> **They are NOT interchangeable** — one decides **what** to do, the other knows **how** to do it.

且注明：具体工具目录与 `file_id` 解析阶梯**刻意留在 skill 内部**，不进这段提示词 —— 即 18 KB 的 routing 层只管"走哪条路"，不管"怎么调"。

## 11. 全链路小结

```
用户提到 .docx / 打开文档预览
        │
        ▼
scenario-detector  ── 扫 cwd 顶层，60s 缓存 ──▶ 决定是否注入场景
        │
        ▼
routing-prompt     ── 拼 <tencent_docs_editor_context> ──▶ 系统提示词
        │              首轮 HEADER / 后续 RECALL（每会话只触发一次 skill）
        ▼
tencent-docs-routing skill（决策）
        │  localMode=mcp → MCP 工具
        │  localMode=skill → tencent-local-office-edit（执行）
        ▼
editor_sdk.exe :39099  ── /mcp + /static/<type>/pc.html（同端口）
        │  端口经 tencent-docs-engine.port 文件传递，就绪靠 stdout
        ▼
预览 UI  ── globalPadId=md5(filePath) 维持文档身份 ──▶ renderer
```

**设计取向**：路由决策放在**提示词 + skill** 而非代码里，靠 skill 每会话触发一次来省 token；代码侧只做"有没有东西要路由"的判定，且判定为假时**不输出任何标签**。


**下一步**：`routing-prompt.js`（17.9 KB 路由提示词全文）未读；`editor_sdk.exe` 内部 MCP 工具面（631 KB 的 stdio bridge 只是桥，真实工具在 exe 里）需实机启动才能取。

