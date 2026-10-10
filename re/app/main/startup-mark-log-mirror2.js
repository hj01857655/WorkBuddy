const require_marks = require("./marks.js");
//#region src/main/features/telemetry/startup-mark-log-mirror.ts
/**
* Startup mark → human-readable log mirror
*
* A/B/C/D/E/F 五段 76 个 startup mark（见 packages/workbuddy-server/src/perf/marks.ts）
* 会写进 `~/.workbuddy/logs/startup/*.jsonl` 供 startup-perf 聚合器 / startup-report.html
* 消费——但那份 JSONL **grep 不友好**（结构化 JSON，包多字段 relayed 从多进程来）。
*
* 本模块通过 `addPerfMarkObserver` 挂一个纯附加的旁路观察者，把 `startup` flow 的
* 每条 mark 翻译成一条格式统一的人类可读日志，写入调用方提供的 scoped electron-log
* logger。目的：让人类 `grep '\[FirstScreen\] MARK' ~/.workbuddy/logs/*.log` 就能
* 端到端串起首屏时间线，而不必去 startup JSONL 或聚合报告里翻。
*
* 三端各自安装一次：
* - 主进程：`installStartupMarkLogMirror(log.scope('firstscreen'))` 于 index.ts
*   electron-log 初始化之后（≥ A6 阶段），把 A/B/C 主进程点 + F14~F19 主进程观测 daemon
*   RPC 点 + relay 上来的 D/E/F 段点全部镜像到 `main.log` 的 `firstscreen` scope
* - daemon：`installStartupMarkLogMirror(log.scope('firstscreen'))` 于 daemon 入口
*   `initStartupContextFromEnv('daemon')` 之后，把 daemon 自身的 F 段点镜像到
*   `daemon.log`（daemon 拿不到 relay 的 D/E 行，正好隔离）
* - renderer：不走这个模块。renderer 首屏日志由 index.html inline IIFE / 主进程侧
*   `renderer-log:write` IPC 直接落 `renderer.log`
*
* 输出示例：
*   ```
*   [firstscreen] MARK B4(database_initialized) proc=main elapsed=845.20ms delta=42.15ms
*   [firstscreen] MARK F9(daemon_ready) proc=daemon elapsed=6712.30ms delta=118.44ms
*   [firstscreen] MARK E14(renderer_app_ready) proc=renderer elapsed=1856.44ms
*   ```
*
* grep 姿势：
*   ```bash
*   grep -E '\[FirstScreen\] MARK' ~/.workbuddy/logs/main.log ~/.workbuddy/logs/daemon.log
*   ```
*
* ⚠️ 只镜像 `PerfFlow.STARTUP`，其它 flow（session-load 等）不写，避免刷 log。
* ⚠️ 观察者全程吞异常，绝不阻塞 mark 落盘 / 启动。
*/
/**
* 反向查找 phase key → mark id（缓存一次，schema 76 项在启动早期就固定）。
*
* marks.ts 是 `id → { phase, key }`；打点时透传的 `phase` 参数其实是 `key`
* （snake_case），human-readable log 里加上 id 更方便对照 marks schema。
*/
var phaseToIdCache = null;
function getPhaseToIdMap() {
	if (phaseToIdCache) return phaseToIdCache;
	const map = /* @__PURE__ */ new Map();
	for (const def of Object.values(require_marks.STARTUP_MARKS)) map.set(def.key, def.id);
	phaseToIdCache = map;
	return map;
}
function formatMs(value) {
	return typeof value === "number" ? `${value.toFixed(2)}ms` : "n/a";
}
/**
* 安装 startup mark log mirror。返回注销函数（一般不需要卸载，进程生命周期常驻）。
*
* @param logger  scoped electron-log logger（推荐 `log.scope('firstscreen')`）
* @param options 可选过滤（如 daemon 侧只镜像 proc=daemon 的 F 段）
*/
function installStartupMarkLogMirror(logger, options) {
	const phaseToId = getPhaseToIdMap();
	const filter = options?.filter;
	return require_marks.addPerfMarkObserver((flowType, phase, info) => {
		if (flowType !== require_marks.PerfFlow.STARTUP) return;
		if (filter && !filter(flowType, phase, info)) return;
		const id = phaseToId.get(phase);
		const idTag = id ? `${id}(${phase})` : phase;
		const proc = info.proc ?? "unknown";
		const parts = [
			`MARK ${idTag}`,
			`proc=${proc}`,
			`elapsed=${formatMs(info.elapsedMs)}`
		];
		if (info.deltaMs !== void 0) parts.push(`delta=${formatMs(info.deltaMs)}`);
		if (info.pid !== void 0) parts.push(`pid=${info.pid}`);
		if (info.epochMs) parts.push(`epoch=${info.epochMs}`);
		if (info.data && Object.keys(info.data).length > 0) {
			const filtered = {};
			for (const [k, v] of Object.entries(info.data)) {
				if (k === "id" || k === "phase") continue;
				filtered[k] = v;
			}
			if (Object.keys(filtered).length > 0) {
				let dataJson = "";
				try {
					dataJson = JSON.stringify(filtered);
				} catch {
					dataJson = "<unserializable>";
				}
				parts.push(`data=${dataJson.length > 200 ? dataJson.slice(0, 200) + "..." : dataJson}`);
			}
		}
		logger.info(`[FirstScreen] ${parts.join(" ")}`);
	});
}
//#endregion
Object.defineProperty(exports, "installStartupMarkLogMirror", {
	enumerable: true,
	get: function() {
		return installStartupMarkLogMirror;
	}
});
