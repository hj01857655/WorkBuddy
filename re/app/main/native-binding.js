const require_rolldown_runtime = require("./rolldown-runtime.js");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
//#region ../../packages/workbuddy-server/src/storage/sqlite/native-binding.ts
/**
* better-sqlite3 native addon 路径解析 + nativeBinding 注入 helper。
*
* 目标：跳过 `bindings` 包的 20 条候选路径 fs.statSync 探测（冷启动 5-30ms）。
*
* 契约：
* - Packaged Electron：`asarUnpack` 保证 `.node` 落在 app.asar.unpacked 下的
*   确定位置（由 apps/workbuddy-desktop 的 electron-builder.config.js +
*   scripts/bundled-assets-manifest.js 锁定 —— 见 unpackedNativePackages 里的
*   'better-sqlite3' 条目）。better-sqlite3 12.x 的 lib/database.js 支持
*   options.nativeBinding，接受此绝对路径后直接 `require(path)` 加载 .node。
* - 非 Electron / dev 未 packaged / 测试 / Node CLI：返回 null，走
*   better-sqlite3 默认的 bindings 原生解析（DEFAULT_ADDON module-scope cache
*   仍然只付一次 probe 成本）。
*
* 失败降级：任何路径不存在时返回 null，让 bindings 继续工作。方案 A 静默失效
* 等同于"未做优化"，不引入独占失败面。参见 issue #99797。
*
* 包边界（Hard Rule）：本模块**不** import `electron`。workbuddy-server 是
* 独立可运行包（AGENTS.md L14 明文），不得依赖宿主运行时模块。所有 Electron
* 事实通过 `process.env` / `process.versions.electron` / `process.resourcesPath`
* 三种进程原生属性获取——这三者在 Electron 主进程、ELECTRON_RUN_AS_NODE 子进程、
* 普通 Node 三种拓扑下都有一致语义。
*/
var cachedPath;
/**
* 从进程注入的运行时提示里判定当前所处的 Electron 运行拓扑。
*
* 拓扑矩阵：
*   1. stdio-fork daemon 子进程：`apps/workbuddy-desktop/src/main/startup-steps/
*      start-daemon-child-process.ts` 通过 `spawn(execPath, ..., env: {
*      ELECTRON_RUN_AS_NODE: '1', ... })` 拉起，`buildDaemonProcessEnv` 在 spawn
*      env 里同时注入 `WORKBUDDY_IS_PACKAGED` + `WORKBUDDY_RESOURCES_PATH`。
*      ELECTRON_RUN_AS_NODE 模式下 `process.resourcesPath` 不可用，只能靠 env
*      契约拿到 resourcesPath；但 `process.versions.electron` 仍然存在
*      （Electron runtime 保留版本号）。
*   2. evalMode / in-main daemon：daemon 与 Electron 主进程同进程运行。
*      `applyCliCommandLineSwitches` 极早期通过 `syncWorkbuddyPackagedRuntimeEnv`
*      无条件写入 `WORKBUDDY_IS_PACKAGED`（'1' 或 '0'）——该函数已通过应用路径
*      pattern 校正过 macOS 上 `app.isPackaged` 被 rename `Electron` 可执行文件
*      后的误判。此时 `process.resourcesPath` 是 Electron 主进程原生属性可直接读，
*      不需要 `WORKBUDDY_RESOURCES_PATH`（后者只由 daemon spawn 路径注入）。
*   3. dev Node CLI / vitest：三者都缺；返回 non-Electron。
*
* 规则（无 `require('electron')`）：
*   - `isElectron`: `typeof process.versions.electron === 'string'`
*     （主进程、ELECTRON_RUN_AS_NODE 子进程都为 true；纯 Node 为 false）
*   - `isPackaged`: 优先看 `WORKBUDDY_IS_PACKAGED === '1'`；env 缺失时判为 false。
*     desktop 侧 SSoT 已校正 macOS rename 场景；跨拓扑一致。
*   - `resourcesPath`: 优先 `WORKBUDDY_RESOURCES_PATH`（daemon 子进程唯一来源），
*     否则 `process.resourcesPath`（evalMode 主进程原生可用）。
*
* 契约变更请同步 `apps/workbuddy-desktop/src/main/startup-steps/start-daemon-child-process.ts`
* 的 spawn env 组装（`buildDaemonProcessEnv` 是 SSoT）以及
* `apps/workbuddy-desktop/src/main/system/runtime/workbuddy-packaged-runtime.ts`
* 的 `syncWorkbuddyPackagedRuntimeEnv`。
*/
function readBetterSqlite3RuntimeFacts() {
	const isElectron = typeof process.versions.electron === "string";
	const envIsPackaged = process.env.WORKBUDDY_IS_PACKAGED;
	const envResourcesPath = process.env.WORKBUDDY_RESOURCES_PATH;
	const runtimeResourcesPath = process.resourcesPath;
	return {
		isElectron,
		isPackaged: envIsPackaged === "1",
		resourcesPath: envResourcesPath ?? runtimeResourcesPath ?? ""
	};
}
function resolveBetterSqlite3NativePathFromEnv(env) {
	if (!env.isElectron || !env.isPackaged) return null;
	if (!env.resourcesPath) return null;
	const asarUnpackedPath = node_path.join(env.resourcesPath, "app.asar.unpacked", "node_modules", "better-sqlite3", "build", "Release", "better_sqlite3.node");
	if (env.fileExists(asarUnpackedPath)) return asarUnpackedPath;
	const noAsarPath = node_path.join(env.resourcesPath, "app", "node_modules", "better-sqlite3", "build", "Release", "better_sqlite3.node");
	if (env.fileExists(noAsarPath)) return noAsarPath;
	return null;
}
/**
* 返回 better-sqlite3 native addon 的绝对路径；无法确定时返回 null。
* 结果缓存，进程生命周期内仅计算一次；失败路径也缓存 null，避免每次都 statSync。
*/
function resolveBetterSqlite3NativePath() {
	if (cachedPath !== void 0) return cachedPath;
	return cachedPath = resolveBetterSqlite3NativePathFromEnv({
		...readBetterSqlite3RuntimeFacts(),
		fileExists: (absPath) => {
			try {
				return node_fs.existsSync(absPath);
			} catch {
				return false;
			}
		}
	});
}
/**
* 集中的 nativeBinding 注入 helper。connection.ts / readonly.ts 共享，避免
* 两条独立的注入路径（未来改注入策略只需要改这一处）。
*
* 语义：
*   - 调用方显式在 options 里传了 `nativeBinding`（含 null / undefined 字面量）→
*     一律优先，不做覆盖；便于测试注入 / recovery 特殊场景强制走 bindings。
*   - 否则 → 如果能算出 nativeBinding 就补上；不能算就原样返回 options。
*
* @internal 仅 sqlite/ 目录内其他文件使用
*/
function mergeNativeBindingOption(userOptions) {
	if (userOptions && "nativeBinding" in userOptions) return userOptions;
	const nativeBinding = resolveBetterSqlite3NativePath();
	if (!nativeBinding) return userOptions;
	return {
		...userOptions ?? {},
		nativeBinding
	};
}
//#endregion
Object.defineProperty(exports, "mergeNativeBindingOption", {
	enumerable: true,
	get: function() {
		return mergeNativeBindingOption;
	}
});
