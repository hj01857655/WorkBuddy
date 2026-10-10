# WorkBuddy 逆向 23：安全中心（security-center）

日期：2026-09-29　前置：workbuddy-05-威胁库（威胁库 betterleaks）、workbuddy-19-agent-gateway（server.js 矿脉）
样本：`re/app/main/server.js` → `packages/workbuddy-server/src/security-center/service.ts`（43.2 KB）

> **验证口径**：静态逆向。**纯本地子系统，无云端点**（全文检索无 `/security*` `/audit*` `/sandbox*` 端点），故不经服务端，与 05 号的云端威胁库是两套。**未触发过任何敏感操作审批。**

## 1. 定位

daemon 侧的**本地安全策略中心**：沙箱规则、系统工具策略、敏感操作反向审批、审计日志。全部走 RPC 通道，无 REST 端点。

## 2. 默认策略

```js
DEFAULT_SANDBOX_RULES = {
  maliciousDomainProtectionEnabled: true,
  httpIntercept: { remote: "ask", local: "allow" }
};

DEFAULT_LEGACY_SANDBOX_RULES = { ...DEFAULT_SANDBOX_RULES,
  allowedDomains: [], deniedDomains: [], denyAll: false };

DEFAULT_SYSTEM_TOOL_POLICY = "disabled";
```

**关键默认：本地 HTTP 放行、远程 HTTP 弹确认、恶意域名防护开。** 即"内网/localhost 不拦，出网要问"。

`DEFAULT_SYSTEM_TOOL_POLICY = "disabled"` —— 系统工具（与 05 号的沙箱工具相关）**默认关**，需用户显式开启。

## 3. 三个枚举（有序规则系统）

```js
VALID_SYSTEM_TOOL_POLICIES = new Set(["disabled","always_confirm","auto_execute"]);
ORDERED_RULES_CATEGORIES  = new Set(["file","command","network"]);
ORDERED_RULES_AUDIT_ACTIONS = new Set(["add","delete","update","reorder","reset"]);
ORDERED_RULES_PRESET_VERSION = 1;
```

**系统工具三档**：`disabled`（关）/ `always_confirm`（每次确认）/ `auto_execute`（自动放行）。注意**没有"每次阻止"档** —— 阻止是规则层的职责，工具层只管确认粒度。

**规则三类**（file/command/network）× **五个审计动作**（增删改排序重置）。`reorder` 与 `reset` 单独列出 —— 前者是调序，后者是清空，都不改内容但都要审计。

`ORDERED_RULES_PRESET_VERSION = 1` —— 预设带版本号，便于日后迁移。

## 4. 审计日志

```js
AUDIT_DECISIONS = new Set(["approved","rejected","blocked","allowed","failed","info"]);

DEFAULT_AUDIT_LOG_PAGE_SIZE   = 100;
MAX_AUDIT_LOG_PAGE_SIZE       = 500;
MAX_AUDIT_QUERY_TEXT_LENGTH   = 200;
```

**六种决策**分三层：`approved`/`allowed`（放行）、`rejected`（用户拒）、`blocked`（规则拦）、`failed`（执行失败）、`info`（记录性）。区分 `rejected` 与 `blocked` 关键 —— 前者是用户主动拒，后者是系统策略拦，排查时含义完全不同。

分页上限 500、查询串上限 200 —— 防止 `?text=` 塞超长串拖垮本地 DB。

### 4.1 Spool 机制（崩溃安全的审计）

```js
SPOOL_DRAIN_INTERVAL_MS = 36e5   // 1 小时
FILE_BACKUP_MIN_SIZE_MB = 1e3   // 1000 MB

async drainSpoolOnStartup() {
  const imported = await auditStore.importSpool();
  await auditStore.pruneRetention();
  if (imported > 0) logger.info(`Drained ${imported} spool entries on startup`);
}
startSpoolDrainTimer() { setInterval(() => drainSpoolOnStartup()…, 3600e5) }
```

**审计先写 spool 文件，定时/启动时导入主库并裁剪保留期**。即：审计记录**优先保证落盘**，导入失败不丢日志。

`FILE_BACKUP_MIN_SIZE_MB = 1000` —— 文件修改备份只对 ≥1GB 的文件做（1GB 以下不值得）。

## 5. 敏感操作：反向审批的 fail-open / fail-closed 分流

`requestSensitiveApproval` 的文档注释是本篇最关键的一段：

> 敏感 Open **反向审批**的路由入口。参数/身份校验失败返回 **deny**；审批链路不可用 **fail-open 为 `allow-original`**，**不抛给 Desktop**（避免 center 同步等待落空）。**日志只打非敏感项，绝不含明文。**

```js
const deny = (reason) => { logger.warn(`sensitive approval denied | reason=… | sessionId=… | detectionId=…`);
                           return { choice: "deny", reason }; };
const allowOriginal = (reason) => { logger.warn(`sensitive approval unavailable; fail-open allow-original | reason=…`);
                           return { choice: "allow-original", reason }; };
```

**三种结果**：`deny` / `allow-original`（放行原始操作）/ 正常审批。三条设计约束：

1. **参数/身份校验失败 → deny**（fail-closed）—— 校验不过说明请求本身有问题
2. **审批链路不可用 → allow-original**（fail-open）—— 审批组件挂了不该让用户完全不能用；且**不抛异常**，因为 Desktop 在同步等待，抛出去会导致等待落空
3. **日志绝不含明文** —— 只打 `reason` / `sessionId` / `detectionId`，不打被拦截的内容

第 2 条的思路值得注意：**审批系统本身故障 ≠ 操作有问题**。前者应降级放行，后者应拒绝。区分"请求非法"和"审批不可用"是这套设计的核心。

配套 `cancelSensitiveApproval`（用户主动取消）与 `executeSensitiveProtectionMutation`（执行保护性修改）。

## 6. 方法面（15 个）

**沙箱规则**：`getState` / `saveSandboxRulesConfig` / `saveSandboxSafetyEnabled`

**系统工具**：`updateToolControl`

**敏感保护**：`saveSensitiveProtectionEnabled` / `requestSensitiveApproval` / `cancelSensitiveApproval` / `executeSensitiveProtectionMutation` / `querySensitiveProtectionRules` / `querySensitiveProtectionEntries`

**审计**：`queryAuditLog`(推断) / `exportAuditLog` / `clearAuditLog` / `drainSpoolOnStartup` / `startSpoolDrainTimer` / `appendAuditEntry` / `openModifyBackupDir`

**实验特性**：`getExperimentalFeaturesConfig` / `saveExperimentalFeaturesConfig`

## 7. 实验特性：默认全关

```js
DISABLED_EXPERIMENTAL_FEATURES = {
  versionControl: false,
  deleteProtection: false,
  safeDeleteBulkThreshold: 50,     // ← 唯一有值的
  safeDeleteRuntimeEnabled: false
};
```

三个布尔全 `false`，**只有 `safeDeleteBulkThreshold: 50` 有值**。即"安全删除"的批量阈值已定为 **50 个文件**,但总开关 `safeDeleteRuntimeEnabled: false` 关着 —— 功能已实现待灰度。

（`versionControl` / `deleteProtection` 也是造好但关掉的实验项。）

## 8. 输入校验风格

`pickOptionalStringArray` / `pickOrderedRulesMutation` / `pickLegacySandboxRules` / `requireStringArray` 四个校验器，模式统一：

- **宽松字段**（可选数组）用 `pick*` —— 静默过滤非字符串项，不抛
- **必填字段**用 `require*` —— `throw new Error("Invalid sandbox rules config: ${fieldName} must be a string array")`，**错误信息带字段名**

`pickOrderedRulesMutation` 有一处细节：

```js
if (source.action === "reset")
  return Object.prototype.hasOwnProperty.call(source, "rules") ? void 0 : { category, action: "reset" };
```

**reset 不允许携带 `rules` 字段** —— 带了就判非法。防止客户端在"重置"请求里夹带规则，形成语义歧义。

## 9. 结论

**与 05 号（betterleaks 威胁库）的关系**：05 号是**云端** 45.7 万域名黑名单；本篇是**本地** 策略引擎。两者都管恶意域名，但一个在服务端下发、一个在客户端执行。本地 `maliciousDomainProtectionEnabled: true` 是默认开启的兜底。

**三个可抄的设计**：
1. **审批系统故障 ≠ 操作非法**（§5）—— 前者 fail-open 放行原始操作且不抛异常（避免同步等待落空），后者 fail-closed 拒绝
2. **审计先写 spool 再导入**（§4.1）—— 优先保证记录不丢，导入失败可重试
3. **`rejected` 与 `blocked` 分开记**（§4）—— 用户主动拒 vs 系统策略拦，排查语义完全不同

**实验特性全部默认关**（§7），只有一个阈值 `safeDeleteBulkThreshold: 50` 露出来 —— 说明"安全删除"的策略参数已定，运行时开关待灰度。
