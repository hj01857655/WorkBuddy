# WorkBuddy 逆向 21：插件管理体系（plugin-manager，283 KB —— 全 server.js 最大）

日期：2026-09-29　前置：workbuddy-19-agent-gateway（server.js 矿脉）　销账：#14 connector 生态（插件侧）
样本：`re/app/main/server.js` → `packages/workbuddy-server/src/plugin/**`（40+ region，`management/plugin-manager.ts` **283.4 KB**）

> **验证口径**：静态逆向。**未安装过任何插件、未触发任何 installer。**

## 1. 结构：40 个 region 分四层

| 层 | 文件 | 职责 |
|---|---|---|
| **管理核心** | `management/plugin-manager.ts`（283.4 KB） | 安装/卸载/启停、市场管理 |
| **安装器** | `installers/{npm, git, git-subdir, local}-plugin-installer.ts` | 四种源 |
| **市场** | `marketplaces/{base, directory, github}-marketplace.ts` 等 | 三种 provider |
| **横切** | `plugin-integrity-guard.ts` / `plugin-policy-service.ts` / `plugin-environment.ts` / `plugin-mcp-declaration-loader.ts` | 校验/策略/环境/MCP 声明 |

配套：`management/file-lock-service.ts`、`marketplace-path-safety.ts`、`marketplace-name-validator.ts`、`json-utils.ts`、`zip-utils.ts`、`plugin-error-collector.ts`、`concurrency{,-utils}.ts`。

云侧只有两个端点：`/api/v1/plugins`、`/api/v1/plugins/reload`。

## 2. 插件完整性校验（`plugin-integrity-guard.ts`，5.5 KB）—— 本篇最硬的安全设计

**受保护插件当前只有一个：`weixinpay`（微信支付）**，随包分发 `manifest.qmsig` 签名清单 + `prebuilds/win32-x64/QmProtectorLib.dll`（koffi FFI 验签）。

### 2.1 为什么校验必须在 daemon 侧（关键架构说明）

> Agent CLI 侧原本用 `WeixinpayIntegrityGuard` 在**加载插件组件**前挡一道；但 builtin 插件的 MCP 现已由 daemon 解析并投影进 `--mcp-config`（见 `ConnectorService.computePluginMcpConfigs`），**MCP 子进程的拉起不再经过 CLI 的插件加载路径** —— 校验必须跟着投影一起下沉，否则**被篡改的支付插件目录仍会被拉起**。

即：**校验点必须跟着"谁负责拉起进程"走**。CLI 不再拉起了，daemon 拉起，校验就得在 daemon。这是架构演进后安全边界跟着迁移的典型案例。

### 2.2 六分支判定表（原文照录）

| 情形 | 结论 | 理由 |
|---|---|---|
| 非受保护插件 / 非 Windows | 放行 | 签名产物只在 Windows 分发 |
| DLL 未随包分发 | 放行 | 开发态 / 非打包环境 |
| DLL 在但 `manifest.qmsig` 缺失 | **拦** | 可疑：验签库在却没有清单 |
| koffi 不可用 | 放行 | 优雅降级，不因 FFI 环境问题堵死功能 |
| HRESULT 失败 / 文件坏或缺失 | **拦** | 目录被篡改 |
| 校验过程抛异常 | **拦** | **保守取向** |

三个设计取舍读得出来：

- **"有验签库却没清单"要拦** —— 正常包两者同时存在,只留一个说明有人删了清单
- **"koffi 不可用"放行** —— 优雅降级,不让 FFI 环境问题堵死功能（可用性优先）
- **"抛异常"拦** —— 保守取向,与上一条相反（安全优先）

同一份表里两条相反的取向,取决于**失败是否意味着"检测到篡改"**还是"检测手段不可用"。

### 2.3 两侧必须对齐

```js
INTEGRITY_GUARDED_PLUGIN_NAMES = new Set(["weixinpay"]);
// 与 CLI 侧 WeixinpayIntegrityGuard 的 WEIXINPAY_PLUGIN_NAME 对齐；
// 新增受保护插件时**两侧都要加**，否则会出现「一条车道挡住、另一条放行」的不对称。
```

另注：**文件存在性检查用异步 fs**（避免插件 catalog refresh 阻塞 daemon event loop），但 koffi 的 `load`/调用仍是同步原生边界。

## 3. Git 安装器：SHA 固定与 checkout 分离（`git-plugin-installer.ts`，7.7 KB）

### 3.1 非交互 git 配置

```js
DEFAULT_GIT_OPTIONS = {
  windowsHide: true, timeout: 12e4,           // 2 分钟
  env: { ...process.env,
    GIT_TERMINAL_PROMPT: "0",                 // 禁止提示
    GIT_SSH_COMMAND: "ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new",
    NODE_OPTIONS: "" }                        // 清空，防子进程污染
}
```

`GIT_TERMINAL_PROMPT=0` 防 clone 时卡在凭据输入;`BatchMode=yes` 让 SSH 失败即失败而非交互。

### 3.2 按 SHA 走三步（而非直接 checkout）

```js
cloneArgs = ["clone", "--depth", "1"];
if (ref && !sha) cloneArgs.push("--branch", ref);
if (sha)       cloneArgs.push("--no-checkout");        // ← 只克隆，不检出
// git fetch origin <sha> --depth 1
// git checkout --detach FETCH_HEAD
const actualSha = (await git rev-parse HEAD).stdout.trim();
if (actualSha.toLowerCase() !== sha.toLowerCase())
  throw new Error(`Resolved Git SHA ${actualSha} does not match ${pluginSource.sha}`);
```

**`--no-checkout` + fetch 指定 SHA + `--detach FETCH_HEAD` + rev-parse 复核** —— 四步保证落到指定 commit。`--depth 1` 浅克隆省时间。

若只给 `ref`(分支名)不给 `sha`,则直接 `--branch ref` 检出,**不校验** —— 精度取决于源。

`resolveGitUrl` 拼 `https://github.com/${source.repo}.git`；`git-subdir-plugin-installer` 走 raw URL（支持 monorepo 子目录）。

## 4. 并发控制：文件锁 + 世代号

```js
INSTALLED_PLUGINS_LOCK_NAME  = "installed-plugins-registry"
MARKETPLACE_MUTATION_LOCK_PREFIX = "marketplace-mutation"
PLUGIN_CACHE_MUTATION_LOCK_PREFIX = "kylin-plugin-cache"

INSTALLED_PLUGINS_LOCK_OPTIONS   = { maxRetries: 10,  retryDelay: 200, staleTimeout: 12e4 }  // 2s/次, 2min
MARKETPLACE_MUTATION_LOCK_OPTIONS= { maxRetries: 120, retryDelay: 250, staleTimeout: 6e5 }  // 30s/次, 10min

DIRECTORY_PLUGIN_CACHE_PROJECTION_ENV = "CODEBUDDY_DIRECTORY_PLUGIN_CACHE_PROJECTION"
LEGACY_INSTALLED_PLUGINS_FILE_NAME    = "installed_plugins_v2.json"
```

**两个锁的重试策略差 12 倍** —— 市场变更锁要抗长期占用（网络下载 zip 可能几分钟），已安装注册表锁是本地写。

配套 `MarketplaceRegistryChangedError`（等锁期间市场源被换/被删）、`marketplaceGeneration` 世代号（乐观并发）。

## 5. 孤儿清理与在用标记

```js
PLUGIN_ORPHAN_MARKER = ".orphaned_at"    // 标记文件
PLUGIN_IN_USE_DIR    = ".in_use"         // 在用目录
PLUGIN_ORPHAN_RETENTION_MS = 12096e5     // 14 天
MARKETPLACE_TRANSIENT_MIN_AGE_MS = 36e5  // 1 小时，抖动期保护
```

**`.orphaned_at` 标记 + 14 天保留期** —— 卸载不立即删，先标记，14 天后再清。给"误卸载可恢复"留窗口。`MARKETPLACE_TRANSIENT_MIN_AGE_MS = 1h` 则相反：**市场配置刚写入 1 小时内不清理**，防写入抖动导致刚装的又被清。

`activePluginCacheMarkers` + `activePluginCacheMarkerExitCleanups` —— 进程退出时清理标记，异常退出用 `.in_use` 目录兜底。

## 6. 市场自动更新

```js
DEFAULT_MARKETPLACE_AUTO_UPDATE_INTERVAL_MS = 864e5   // 24 小时
MARKETPLACE_AUTO_UPDATE_INTERVAL_ENV_KEY = "CODEBUDDY_MARKETPLACE_AUTO_UPDATE_INTERVAL_MS"
```

24 小时一次，可用环境变量调。`isReinstallingBuiltInMarketplaces` + `pendingReinstallRequest` 双标志防重入。

## 7. `plugin-manager.ts` 方法面（283 KB 的实际内容）

40+ 个 async 方法,可归五组：

**生命周期**：`doInit` / `doLoadMarketplaces` / `doInstallBuiltInMarketplaces` / `dispose`

**安装与缓存**：
`copyPluginToCache` / `cleanupPluginCache` / `cleanupOrphanedPluginCache` / `findCachedPluginByDirectory` / `ensurePluginCacheForMigration` / `findPluginManifestPath` / `cleanupFinalPluginState`

**启停**：`enablePlugins` / `disablePlugins` / `getEnabledPlugins` / `getInstalledPlugins` / `getInlinePlugins` / `getInstalledPluginsForWorkspaceState`

**依赖图**（命名直接说明有依赖解析器）：
`enableDependenciesForPlugins` / `assertNoEnabledDependents` / `findEnabledDependents` / `findOrphanedAutoDependencies` / `dropLeakedSessionOnlyDependencyStates` / `collectPluginMcpServerNames` / `collectInstalledRecordMcpServerNames`

**市场**：`addMarketplace` / `getMarketplace` / `findMarketplaceBySource` / `autoUpdateMarketplaces` / `doUpdateMarketplace` / `doUpdateMarketplaceLocked` / `checkoutMarketplaceRef` / `getMarketplaceManifestMtimeMs` / `getMarketplacePublicationJournalRecoverySource` / `cleanupMarketplaceTransientArtifacts` / `getInstalledPluginIdsForMarketplace` / `getDirectoryBuiltInMarketplaceNames`

**策略**：`applySinglePolicy` / `doApplyManagedPolicies` / `enrichPluginInfo`

三个方法名值得注意：

- **`dropLeakedSessionOnlyDependencyStates`** —— 清理"只在会话内存在"的依赖状态残留。会话级依赖状态会泄漏，需要显式回收。
- **`assertNoEnabledDependents`** —— 停用插件前**断言无已启用的依赖者**，即依赖图的反向检查（不能停掉别人依赖的插件）。
- **`getMarketplacePublicationJournalRecoverySource`** —— 市场发布用**日志（journal）做崩溃恢复**。写入过程分步可恢复，不是全量重做。

`doUpdateMarketplace` / `doUpdateMarketplaceLocked` 成对，与 §4 的 `marketplace-mutation` 锁对应（加锁版是内部实现）。

## 8. 其他

- **依赖名正则**：`PLUGIN_DEPENDENCY_NAME_PATTERN = /^[A-Za-z0-9][-A-Za-z0-9._+]*$/`（首字符必须字母数字）
- **`plugin-policy-service.ts`** —— 插件级策略（是否允许启用等）
- **`plugin-mcp-declaration-loader.ts`** —— 读插件的 MCP 声明，配合 §2.1 的 `computePluginMcpConfigs` 投影
- **`builtin-local-mcp-apps.ts`** —— 内置本地 MCP App（与 17 号的 `runtimeSource === 'session-stdio'` 对应）
- **`semver`** 依赖 —— 插件版本约束

## 9. 结论

**插件体系的三层防护**：① 安装源校验（git SHA 四步复核 + 插件名正则）② 目录完整性（`weixinpay` 签名清单 + DLL 验签，六分支判定）③ 路径安全（`marketplace-path-safety.ts` + `marketplace-name-validator.ts`）。

**最值得记的是 §2.1** —— 校验层必须跟随"谁拉起进程"迁移。CLI 改成由 daemon 投影 MCP 配置后，CLI 侧的 guard 就成了摆设，必须下沉。这是架构演进中最容易漏掉的安全回归点。

**工程细节三则**：
- 两个文件锁重试策略差 12 倍（本地写 2s×10 vs 市场变更 250ms×120）—— 按预期持锁时长分级
- `.orphaned_at` 标记 + 14 天保留期（卸载可恢复），而市场侧是 +1 小时**不清理**（防写入抖动）—— 两个方向相反的缓冲策略
- 市场发布用 journal 做崩溃恢复，而非全量重做

**未读**：三种 marketplace provider 实现、`plugin-policy-service` 策略规则、`plugin-environment` 的环境变量面。
