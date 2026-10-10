# WorkBuddy 逆向 22：会话核心（session-manager 243 KB + 配套策略层）

日期：2026-09-29　前置：workbuddy-03-ACP与签到计费（ACP 会话方法面）、workbuddy-19-agent-gateway（server.js 矿脉）
样本：`re/app/main/server.js` → `packages/workbuddy-server/src/session/**`（30+ region）+ `storage/session-mutation-policy.ts`

> **验证口径**：静态逆向。**未创建/加载过真实会话。**

## 1. 结构：30 个 region，`session-manager.ts` 占 242.9 KB

| 组 | 文件 |
|---|---|
| **核心** | `session-manager.ts`（242.9 KB） |
| **前置校验** | `session-cwd-precheck.ts`（4.7 KB） |
| **持久化** | `session-record-store.ts` / `session-persistence.ts` / `session-replay.ts` / `meta-writer.ts` + `meta/types.ts` |
| **运行时** | `session-runtime-event-service.ts` / `runtime/handlers.ts` / `runtime-config-resolver.ts` |
| **配置** | `session-config.ts` / `session-env.ts` / `session-projection.ts` / `mcp-config-coordinator.ts` |
| **扩展** | `addon-expander.ts` / `addon-composer.ts` / `addon-manifest.ts` / `skill-dirs.ts` / `plugin-context.ts` |
| **媒体** | `media-artifact-service.ts`（92.4 KB）/ `media-lifecycle.ts` / `media-extensions.ts` / `poi-cache.ts` / `mpeg-transport-stream.ts` |
| **其他** | `team-runtime-loader.ts` / `terminal-proxy.ts` / `usage-cache-service.ts` / `brain-artifact-service.ts` / `parse-edsdk-call.ts` |

## 2. `session-cwd-precheck.ts`：四条"故意如此"的设计（4.7 KB）

> 校验调用方为 new/load/resume 会话传入的工作目录，在**让 sidecar 用它 spawn 子进程之前**。没有这道守卫，子进程继承无效 cwd，在 webpack bundle 初始化调 `process.cwd()` 时炸掉（`uv_cwd` → EPERM/ENOENT），用户看到的是**静默的 `AGENT_UNAVAILABLE` 超时（180 秒）** —— issue #56876。

### 2.1 四条设计取舍（原文小标题即 "Intentional design choices"）

| 取舍 | 理由 |
|---|---|
| **无兜底** | 调用方要求在 X 工作；**悄悄换成 `$HOME` 会掩盖真实问题**（工作区丢失/改名），产出"为什么 agent 跑错地方了"这类报告 |
| **结构化错误** | `code` 被 daemon → client 桥提取为 `bizCode` 转发，renderer 可渲染**针对性提示**而非通用传输层失败 |
| **故意用异步 fs** | **macOS 上首次访问 TCC 保护目录会同步阻塞在系统权限弹窗**。用 `fs.promises.*` 让 daemon event loop 保持响应，用户在系统弹窗前犹豫时心跳/遥测等 RPC 仍在推进 |
| **用户文案在 renderer i18n** | 下面的 `message` 字段**故意是英文**，使 daemon 日志/遥测保持可检索、**不混入 locale** |

第三条很实际 —— 同步 fs 阻塞 event loop 会让整个 daemon 卡在权限弹窗上。

配套的 `resolveDefaultCwdOrThrow` 在 `session-manager.ts` 里，注释同样详细：`process.cwd()` 本身会在 daemon 工作目录被删时抛 ENOENT/EPERM，**不回落 `$HOME`**（同第一条），而是转成同一个 `SessionCwdUnavailableError`，让 renderer 显示标准"工作目录不存在或已被移动"toast。

## 3. `storage/session-mutation-policy.ts`：一个"闸门为何不能一刀切"的完整案例（2.9 KB）

**背景**（#85440 / #85831）：Conversation SDK 是 `sessions.status` 的**权威写入方**。旧的多写路径默认禁止改 status（避免覆盖 `terminated` 或误写成 `Failed`/`error`）。

```js
var enableLegacySessionRowMutations = false;   // 默认关
```

**但开关关闭时仍允许三种情况**：

1. `create`（行不存在 → INSERT）—— 旧引擎新建后侧栏可见
2. **status 未变化的 upsert**（如 rename 只改 title）
3. **旧值尚未收敛时的状态推进**

### 3.1 状态集合

```js
TERMINAL_STATUSES = new Set(["completed","failed","error","terminated","cancelled","canceled"]);
isSettledStatus(s) = TERMINAL_STATUSES.has(s) || s === "archived";
```

注释指出 `TERMINAL_STATUSES` **不含 `archived`** 的理由：

> archived 是**归档动作而非 turn 结果**，它的降级保护由 `database.upsertSession` 的 ON CONFLICT 合并策略负责，不该由本闸门放行。storage 是 session 的下层，因此这里保留独立常量而非反向 import。

**分层意识** —— 不越层 import，避免循环依赖。

### 3.2 为什么不能把"未收敛行"也拦掉（最有价值的一段）

> 闸门的真实目标是「**已收敛的结果不被旧路径改坏**」，而不是「旧路径一律不许改 status」。
> Conversation SDK 的 `runtimeStatusOps` 只有 markTerminated/markError/markActive，**没有 completed writer**；MainContentCore 链路上更不存在 `ConversationImpl` 实例。
> 因此把未收敛行的写入也一并拦掉，会让 sqlite **永久停在建行时的 `pending`**：
> - 拦掉「非终态 → 终态」→ 会话跑完了侧栏仍显示「待确认」；
> - 拦掉「非终态 → working/planning」→ 会话运行中侧栏显示「待确认」，而项目详情页读 `SessionManager.toSessionRecord` 的**内存实时态**显示「运行中」，**两处对不上（#86427）**。

即：**如果没有其他写入方完成最后一步迁移，闸门会把系统永久卡在中间态**，还制造 DB 与内存态的不一致。

**结论**：只拦「**已收敛 → 其它状态**」的竞写，未收敛行仍由 SessionManager 状态机推进。

### 3.3 注入式探测

```js
setEngineOwnedSessionProbe(probe);   // 生产 daemon conversations-setup 必须注入
isEngineOwnedSession(id) { if (!probe) return false; try { return probe(id) === true } catch { return false } }
```

**未注入时恒 false**（安全默认），**probe 抛异常也返回 false**（不因探测失败而误判为"已接管"而拦写）。依赖注入 + 双重兜底。

## 4. `session-manager.ts` 方法面（45+ async 方法）

**生命周期**：`createSession` / `loadSession` / `loadInactiveSessionState` / `destroySession` / `destroyAll` / `disposeActiveSession` / `archiveSession` / `moveSession` / `performDeleteSession` / `getActiveSessions`

**回合控制**：`cancel` / `cancelBeforeDestroy` / `cancelQuestion` / `cancelSessionRun` / `interruptTurn` / `answerQuestion` / `onProcessingStopped` / `awaitPendingSessionDisposal`

**消息队列**（存在完整队列机制）：`enqueueMessage` / `activateMessageQueue` / `pauseMessageQueue` / `cancelMessageQueue` / `getMessageQueue` / `getQueueState`

**运行时配置热更**：`applyPendingRuntimeConfigBeforePrompt` / `drainPendingRuntimeConfigWhileIdle` / `flushPendingRuntimeConfigIfIdle` / `applyDesiredConfig` / `awaitPendingBackendRestart` / `flushSessionEffects`

**持久化**：`emitSessionRecordUpsert` / `ensureStoredSessionRecord` / `getSessionRecord` / `getStoredEventSessionRecord` / `listSessionRecords` / `listSessions` / `persistDerivedTaskStatus` / `persistSessionContextWindow` / `persistLastUserPromptExpertSelection`

**扩展调用**：`callExtMethod` / `broadcastExtMethod` / `composePromptForBackend` / `getAvailableCommands` / `getSubagentList` / `finishPromptInvocation`

### 值得注意的三组

**① 运行时配置三方法** —— 名字直接说明了状态机：

```js
applyPendingRuntimeConfigBeforePrompt    // 发 prompt 前应用
drainPendingRuntimeConfigWhileIdle      // 空闲时排空
flushPendingRuntimeConfigIfIdle         // 空闲时刷
```

即**改配置（换模型/模式）不能在回合中途生效，要等空闲点**。与 03 号 §2.3 的 `session/set_model`、`session/set_mode` 对应。

**② 队列三态** —— `enqueue` / `activate` / `pause` / `cancel` + `getQueueState`。发消息时若上一回合未完，消息入队而非打断（与 `session/steer` 的"回合中插话"是两种不同语义）。

**③ `awaitPendingBackendRestart`** —— 后端重启是异步的，销毁会话前要 await 它。

## 5. 结论

**会话层的三条设计主线**：

1. **前置校验用"结构化失败"而非"静默兜底"**（§2）—— cwd 无效时宁可报错让用户重开，也不换目录假装成功；异步 fs 避免 macOS 权限弹窗卡死 event loop；daemon 侧文案保持英文以便日志检索
2. **写入闸门按"是否已收敛"分档，而非按"谁在写"一刀切**（§3）—— 因为迁移可能没有完成迁移方，闸门过严会把系统永久卡在中间态，还制造 DB/内存不一致
3. **配置变更只在空闲点生效**（§4）—— 回合中途换模型/换模式会破坏状态机

**与 03 号的对应**：03 号记的是云端 ACP 协议面（`session/prompt`/`steer`/`cancel`/`set_model`/`set_mode`/`rollback`），本文是本地 daemon 侧的实现。`boundAcpSessionId` 的动态注入（19 号 §18）在 `ConversationImpl`，不在本 region。

**未读**：`media-artifact-service.ts`（92.4 KB，媒体产物）、`team-runtime-loader.ts`、`terminal-proxy.ts`、`session-replay.ts`、`addon-*`（技能/插件注入到会话的路径）。

