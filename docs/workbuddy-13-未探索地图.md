# WorkBuddy 逆向 13：未探索子系统地图（回答"还有没有可逆的"）

日期：2026-09-29　定位：对齐 zcode-plan-41 风格——已完成面与未探索面的总账

## 1. 直接回答

**主对话链路（凭证→协议→模型→工具→计费）已收官（01–12），但整个应用的可逆面远没有到底。**
本篇是对"还剩什么"的测绘，每项标注难度与价值。

## 2. 本轮新侦察（此前完全未触的两层）

### 2.1 本地沙箱运行时（Windows 沙箱全家桶，`cli/vendor/sandbox/5.6.10/`）

| 文件 | 大小 | 指纹 |
|---|---|---|
| `sandbox-center.exe` | 8.0MB | **Rust**，命名管道服务端 |
| `sandbox-cli.exe` | 2.1MB | Rust，管道客户端 |
| `sandbox-cli-gc.exe` | — | 垃圾回收 |
| `tsbx.dll` / `tsbx_sdk.dll` / `sandbox_ffi.dll` | 0.7MB+ | FFI 桥（Rust→C ABI→koffi） |

实测侦察：管道名 `\\.\pipe\WorkBuddy_SandboxCenter_*` 与 `*-prepare_execute`；
center 旗标含 `--mount --workspace --parent-pid --force-reinit --report-format json --redact --begin/--exit-code`——
**即本地"云端沙箱"的 Windows 对应物**：工作区挂载 + 进程监管 + JSON 报告。CLI 的 Bash 工具实际落在这套本地沙箱里
（betterleaks 密钥扫描 + 威胁库域名拦截都在其中）。
**价值：高**（做本地执行隔离/审计必读）；**难度：中**（Rust + 管道协议可黑盒）。

### 2.2 browser-use 协议（`@genie/workbuddy-browser-use`，TS 源码可读）

`protocol/index.ts`（97 行）定义了**浏览器提供方协议 v1**：
帧上限 16MB/截图 10MB、拖拽 256 点、DOM 快照 20k 字符、tab 管理（generation 防串台）、
错误分类（not_started/not_applied/applied/retryable）。`visual-layer/` 是光标 SVG 视觉层。
**价值：中高**（WorkBuddy 浏览器自动化=浏览器内 provider 注入模式，与 CDP/Playwright 路线不同）；
**难度：低**（源码可读，量小）。

### 2.3 edge-sync SQLite（本机 `~/.workbuddy/edge-sync-mapping-v4.db`）

三表已开：`edge_sync_mapping(session_id↔conversation_id, msg_channel)`、
`edge_sync_image_mapping(blob_id→cos_uri)`、`edge_sync_artifact_cache(file→hash/download_url/smh_path/expires)`。
**即多设备同步的映射层**：本地会话↔云端会话、产物 COS 地址带过期。**难度：低**；配合 08 号 `conversation-sync` 端点可复原整条同步协议。

## 3. 未探索面总地图（按价值排序）

| # | 子系统 | 现状 | 难度 | 价值 |
|---|---|---|---|---|
| 1 | **本地沙箱运行时**（§2.1：管道协议/挂载/监管） | 仅指纹 | 中 | 高——本地执行隔离的核心 |
| 2 | **CLI agent 本体**（codebuddy-headless 12.4MB，prompt 组装/工具实现/checkpoint/subagent/MCP 客户端） | 仅 grep | 中（与上游 CC diff） | 高 |
| 3 | **云端沙箱数据面**（e2bDataEndpoint 端口 49983 的文件/产物/终端协议） | REST+bootstrap 已通 | 中 | 高——完整复刻云端会话 |
| 4 | **MCP apps host / plugin / permission-bridge**（daemon） | 未动 | 中 | 中 |
| 5 | **IM 通道**（WeCom aibot/飞书/钉钉/Slack/QQ/元宝 ws 接入） | SDK 已列，协议未读 | 低-中 | 中（做 bot 接入有用） |
| 6 | **tencent-docs 集成**（@tencent/tencent-docs-ai-engine + tencent-docs/ 目录） | 未动 | 中 | 中（文档场景） |
| 7 | **conversation-sync / edge-sync 全协议** | DB 已开（§2.3） | 低 | 中 |
| 8 | **renderer SPA 内部**（1122 资产：状态机/本地存储 schema/视图路由） | 仅注入 | 中 | 低-中 |
| 9 | **qimei.dll 算法本体** | 节点已测绘，DLL 未拆 | 高 | 低（明文值可得+可伪造） |
| 10 | **TuringShieldSDK.dll 算法** | 已绕过未拆 | 高 | 低 |
| 11 | **editor-sdk-supervisor / wechat-copydata-decoder / perf-metrics** 原生件 | 未动 | 中 | 低 |
| 12 | **WorkBuddyShareTarget.msix**（Windows 分享目标） | 未动 | 低 | 低 |
| 13 | **wb-guest-sdk/wb.js**（游客模式） | 未读 | 低 | 低 |
| 14 | **connector 生态**（connector-plugins.zip 热更包、ardot OAuth、TAPD/乐享/腾讯文档连接器） | 端点已列 | 中 | 视需求 |
| 15 | **A2A 协议**（agent-gateway auth-proxy.local、发现/TTL） | 端点已列 | 中 | 中（agent 互操作） |

## 4. 判读

- 主对话链 + 网关（01–12）已把"用它的模型"这件事做完；剩余面属于**功能复制**（沙箱/浏览器/IM/文档）与**协议补全**（同步/A2A）。
- 若目标是"另一个 2api"，价值最高的是 #3（云端沙箱数据面）——补上后外部客户端能跑完整云端任务（文件产物/终端）。
- 若目标是"理解它怎么做的沙箱/浏览器"，#1 与 #2.2 是现成入口。

## 7. 13 号销账更新（2026-09-29 深夜第二轮）

| 项 | 状态 |
|---|---|
| ~~#1 本地沙箱~~ | ✅ 14 号全破 |
| ~~#3 云端沙箱数据面~~ | ✅ 15 号全破（envd + connect-rpc + 签名） |
| ~~#13 wb-guest-sdk~~ | ✅ **16 号**：`window.wb` 方法面（sendPrompt/runPrompt/clear/compact/artifacts/files/searchFiles/changes/changeManifests/cancel/resend/getCapacityQueueState/resolvePending/ensureRuntime/…）+ **22 个 `wb:conversation:*` 事件**（stateChange/permission/creditChanged/contextUsageChanged/estimatedCostChanged/capacityQueueUpdate/artifactUpdate/modeChange/timelineEvent/childAgentEvent/…）——即嵌入式 WebView 场景的完整 JS桥 API，`window.wbReady` 门控，postMessage `wb:event` 通道 |

实质剩余：#2 CLI 本体 diff（大）、#4 MCP host、#5 IM 通道、#6 tencent-docs、#7 sync 细节、#14 connector、#15 A2A。

## 8. 17 号销账更新（2026-09-29 深夜第三轮）

| 项 | 状态 |
|---|---|
| ~~#4 MCP apps host / plugin / permission-bridge~~ | ✅ **17 号（20 节完结）**：`app-server-mcp-apps-host.js`（347 KB，带 `//#region` 源路径标记 + 完整注释，全文可读）。已还原：`ui://` 协议与 `text/html;profile=mcp-app` MIME、gateway 47.3 KB 编排、**20 个 `mcpApps:*` RPC channel 全表**（§8）、缓存变体键的坑（§3）、**`local-file-viewer.ts` 六条安全不变量**（§14，真实路径查两次防 symlink）、`surface-metadata.ts` 敏感字段+签名 URL 剥离正则（§11）、`tmap-proxy.ts` 响应头白名单（§15）、三跳中继方向（§8.2）、ardot 准入双防线（§9）。MCP 2025-06 能力面齐（sampling 20 / elicitation 26 / roots 8），elicitation 被 WorkBuddy 做成 `UrlElicitationRequired` + 面板。诊断日志 `~/.workbuddy/logs/mcp-apps-diag.log`。**验证口径：静态逆向，未在真机跑通一次 `ui://` 面板** |
| ~~#5 IM 通道~~ | ✅ **20 号收官**：`claw/**` 60 region。**修正 01 号 —— 不是 6 个是 12 个通道**（wecom aibot/new/ioa 三套 + 微信服务号/客服/个人号 + 飞书 + 钉钉 + QQ + Slack + Telegram + Discord + 元宝 + 自定义）。三条策略：`IOA_ENTERPRISE_IDS` **硬编码两家企业**、`IOA_RESTRICTED_CHANNELS`（5 个）、`OVERSEAS_IM_CHANNELS`（3 个）。**单飞节流中继**（§4，`close()` 主动丢弃待发帧避免与 final 抢 streamId）。11 个幂等/去重 Map。正文间隙提示（IM 场景特有）。**未连接任何通道** |
| ~~#6 tencent-docs 集成~~ | ✅ **18 号**：`@tencent/tencent-docs-ai-engine`（公开 npm 包）。独立进程 + 独立端口（默认 39099，**端口文件**跨进程传递，`/mcp` + `/static/<type>/pc.html` 同端口）+ **stdout 就绪检测**。工具前缀 `mcp__tencent_docs_local__` / `mcp__tencent_docs__`（与 ardot 同一约定）。25 种格式含 WPS 全系与旧 OLE。`globalPadId=md5(filePath)` 作稳定文档身份。场景检测按 cwd 顶层扫（不递归，60s 缓存）。**routing-prompt 全文已读**（§10：首轮 HEADER/后续 RECALL，每会话只触发一次 skill；两级降级 + 「降级前 MUST tell user」）。二进制 `editor_sdk.exe` **204.6 MB**。**未实机启动过** |
| ~~#14 connector 生态（部分）~~ | 🔶 **21 号已取插件侧**（`plugin-manager.ts` 283.4 KB + 40 region）：四种 installer（npm/git/git-subdir/local）、三种 marketplace provider、**`weixinpay` 签名验签六分支判定**（关键：校验层随「谁拉起进程」从 CLI 下沉到 daemon）、git SHA 四步复核（`--no-checkout` + fetch + `--detach FETCH_HEAD` + `rev-parse` 比对）、两个文件锁重试策略差 12 倍、`.orphaned_at` + 14 天保留期（卸载可恢复）、市场发布用 journal 崩溃恢复。**AgentMail 已在 19 号读完**。**未读**：connector-plugins.zip 热更包、TAPD/乐享连接器、marketplace provider 实现、plugin-policy 规则 |
| ~~#15 A2A 协议~~ | 🔶 **19 号定性**：A2A 实质**不是一套独立协议**，而是两半 —— ① `/v2/user/cloudagent/*` **用户自建 Agent 全生命周期 CRUD**（create/clone/publishVersion/pin/unpin/quota/validate-field/orchestrator/instances/entitlements）；② `/console/agent-gateway/*` **MCP 聚合网关**（`agentmail`/`genie-baas`/`netdrive`/`internal_knot-skill` 四个 server）。**原记的「发现/TTL」在代码中未见对应实现，仍未验证** |

实质剩余：#2 CLI 本体 diff（大）、#7 sync 细节、#14 connector（余）、#15 A2A（余：cloud-agent handlers + netdrive）。

**新增矿脉提示**：`re/app/main/server.js` 含 **1012 个 `//#region`** 源路径块，可读性与 17 号同档，覆盖 `workbuddy-server/src/` 与 `workbuddy-core/src/domains/` 几乎全部子域 —— 后续优先从这里取。**体量 TOP5**（均未读）：`plugin/plugin-manager.ts` **283.4KB**、`session/session-manager.ts` **243KB**、`claw/claw-service.ts` 191.5KB（20 号已取主体）、`session/media-artifact-service.ts` 92.4KB、`automation/automation-main-service.ts` 88.1KB。
