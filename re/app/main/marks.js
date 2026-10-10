const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
//#region ../../packages/workbuddy-server/src/perf/logger.ts
/**
* Performance Logger
*
* Records performance marks to JSONL files for tracing flow durations.
*
* This logger is the single writer for perf log files. Main/app-server callers
* and renderer callers via RPC relay write through this module.
*/
var PerfFlow = {
	/** Conversation list: renderer list mount/filter to per-space provider settle and paint */
	CONVERSATION_LIST: "conversation-list",
	/** New session creation: from user click to conversational state */
	SESSION_CREATION: "session-creation",
	/** Conversation prompt TTFT: user send to first rendered assistant token */
	CONVERSATION_TTFT: "conversation-ttft",
	/** Load existing session: from user click to ready state */
	SESSION_LOAD: "session-load",
	/** App startup: from process spawn to renderer first-interactive / daemon state ready (A0~F19) */
	STARTUP: "startup"
};
var SDK_PERF_FLOWS = /* @__PURE__ */ new Set([
	PerfFlow.CONVERSATION_LIST,
	PerfFlow.SESSION_CREATION,
	PerfFlow.CONVERSATION_TTFT,
	PerfFlow.SESSION_LOAD
]);
var DISABLED_PERF_FLOWS = /* @__PURE__ */ new Set([PerfFlow.CONVERSATION_LIST]);
var WORKBUDDY_SDK_PERF_JSONL_ENABLED_ENV = "WORKBUDDY_SDK_PERF_JSONL_ENABLED";
function isSdkPerfFlow(flowType) {
	return SDK_PERF_FLOWS.has(flowType);
}
function isPerfFlowDisabled(flowType) {
	return DISABLED_PERF_FLOWS.has(flowType);
}
/** Conversation SDK 性能 JSONL 默认关闭，仅显式设置为 true/1/on/yes 时落盘。 */
function isSdkPerfJsonlEnabled() {
	const value = process.env[WORKBUDDY_SDK_PERF_JSONL_ENABLED_ENV]?.trim().toLowerCase();
	return value === "1" || value === "true" || value === "on" || value === "yes";
}
function formatDate(date) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
var perfMarkObservers = /* @__PURE__ */ new Set();
/**
* 注册 perf mark 观察者。每次任意 flow 的 `mark()` / `markAbsolute()` 都会通知
* 全部已注册观察者，观察者自己按 flowType 过滤（比如只关心 `startup`）。
*
* 主要消费者：
* - 主进程 / daemon 各自装一个，把 startup flow 的每条 mark 镜像到自己的 electron-log
*   scope（`windowLog` / daemon logger），格式统一 `[FirstScreen] MARK <key> ...`
*
* @returns 注销函数
*/
function addPerfMarkObserver(observer) {
	perfMarkObservers.add(observer);
	return () => {
		perfMarkObservers.delete(observer);
	};
}
function notifyPerfMarkObservers(flowType, phase, info) {
	if (perfMarkObservers.size === 0) return;
	for (const observer of perfMarkObservers) try {
		observer(flowType, phase, info);
	} catch {}
}
var WorkbuddyPerfLogger = class {
	constructor(flowType, traceId) {
		this.marks = [];
		this.phaseStartTimes = /* @__PURE__ */ new Map();
		this.summaryWritten = false;
		this.flowType = flowType;
		this.traceId = traceId;
		this.startTime = performance.now();
		this.lastMarkTime = this.startTime;
		this.startupCtx = flowType === PerfFlow.STARTUP ? require_code_cache.getStartupContext() : void 0;
		this.rawJsonLines = isSdkPerfFlow(flowType);
		this.logFilePath = this.resolveLogFilePath(flowType, this.startupCtx);
	}
	/**
	* 解析落盘路径。
	* - startup flow 且 context 就位：`logs/startup/<date>/<pid>-<time>.jsonl`
	*   —— **一次启动一个文件**（pid=main pid 天然隔离不同启动，time=HHmmss 便于人读/排序）。
	*   各进程（main 直写、daemon 直写、preload/renderer relay 到 daemon）都 append 到这同一个
	*   文件；每行自带 `proc`/`source` 字段区分来源，聚合按行内字段归类（见 startup-perf-aggregator）。
	*   pid/time 均取自跨进程一致的 StartupContext，保证四进程落到同一文件。
	*   跨进程并发 append 在本地 FS 上按行原子（每条 mark 一次 write），不会串行/损坏。
	* - conversation-list：性能打点已停用，不落本地文件。
	* - 其余 Conversation SDK flows：`logs/<YYYY-MM-DD>/sdk/perf/<YYYY-MM-DD>.jsonl`，
	*   所有 flow/trace 共享每日单文件，具体链路由每行的 flowType/traceId 区分。
	* - 其余（非 startup / context 未就位）：沿用 `logs/perf/<flowType>-<ts>.jsonl` 扁平命名。
	*/
	resolveLogFilePath(flowType, ctx) {
		if (ctx) {
			const dir = require_code_cache.getWorkbuddyRuntimeLogsDir("startup", ctx.date);
			this.ensureDir(dir);
			return node_path.join(dir, `${ctx.pid}-${ctx.time}.jsonl`);
		}
		if (isPerfFlowDisabled(flowType)) return "";
		if (isSdkPerfFlow(flowType)) return this.resolveSdkPerfLogFilePath();
		const logDir = require_code_cache.getWorkbuddyRuntimeLogsDir("perf");
		this.ensureDir(logDir);
		const ts = this.formatTimestamp(/* @__PURE__ */ new Date());
		return node_path.join(logDir, `${flowType}-${ts}.jsonl`);
	}
	/**
	* Get the log file path (used by renderer RPC relay to write to the same file)
	*/
	getLogFilePath() {
		if (isPerfFlowDisabled(this.flowType)) return "";
		return this.rawJsonLines ? this.resolveSdkPerfLogFilePath() : this.logFilePath;
	}
	/** Release this logger from the registry without writing a synthetic summary. */
	release() {
		releaseWorkbuddyPerfLogger(this.flowType, this.traceId);
	}
	/**
	* Record a performance mark
	*/
	mark(phase, data) {
		const now = performance.now();
		const epochMs = Date.now();
		const elapsed = now - this.startTime;
		const delta = now - this.lastMarkTime;
		this.lastMarkTime = now;
		const mark = {
			timestamp: now,
			epochMs,
			phase,
			elapsed: Math.round(elapsed * 100) / 100,
			delta: Math.round(delta * 100) / 100,
			source: this.startupCtx?.proc ?? "main",
			...this.startupCtx ? {
				pid: this.startupCtx.pid,
				proc: this.startupCtx.proc,
				timeOrigin: this.startupCtx.timeOrigin
			} : {},
			...data ? { data } : {}
		};
		this.marks.push(mark);
		this.appendLine(JSON.stringify({
			_type: "mark",
			...mark
		}));
		notifyPerfMarkObservers(this.flowType, phase, {
			elapsedMs: mark.elapsed,
			deltaMs: mark.delta,
			epochMs,
			proc: mark.proc,
			pid: mark.pid,
			data: mark.data
		});
	}
	/**
	* 记录一条「绝对时刻」mark：只带 `epochMs`（墙上时钟），**不带 timestamp/elapsed/delta**。
	*
	* 用于表达一个**过去的、已知 epoch 的时刻**（如进程创建 `process.getCreationTime()`），
	* 它不是"现在采样"的 (performance.now, Date.now) 对，因此若按普通 mark 写会污染对齐/段耗时：
	* - 不带 `timestamp` → 聚合器 `computeClockOffsets` 跳过它（不污染本进程 offset 中位数），
	*   `markAbsEpoch` 直接用它的 `epochMs` 作为绝对时间轴坐标；
	* - 不带 `elapsed` → 聚合器段内 max-min 跳过它（不扭曲段时长）；
	* - 不 push 进 `this.marks`（本进程 summary 用 timestamp 算，A0 无 timestamp 不参与）。
	*
	* 全程吞异常——绝不阻塞启动。
	*/
	markAbsolute(phase, epochMs, data) {
		const mark = {
			_type: "mark",
			epochMs,
			phase,
			source: this.startupCtx?.proc ?? "main",
			...this.startupCtx ? {
				pid: this.startupCtx.pid,
				proc: this.startupCtx.proc,
				timeOrigin: this.startupCtx.timeOrigin
			} : {},
			...data ? { data } : {}
		};
		this.appendLine(JSON.stringify(mark));
		notifyPerfMarkObservers(this.flowType, phase, {
			epochMs,
			proc: this.startupCtx?.proc ?? "main",
			pid: this.startupCtx?.pid,
			data
		});
	}
	/**
	* Mark phase start
	*/
	startPhase(phaseName) {
		this.phaseStartTimes.set(phaseName, performance.now());
		this.mark(`${phaseName}_start`);
	}
	/**
	* Mark phase end, returns duration in ms
	*/
	endPhase(phaseName) {
		const start = this.phaseStartTimes.get(phaseName) ?? this.startTime;
		const duration = performance.now() - start;
		this.mark(`${phaseName}_end`, { durationMs: Math.round(duration) });
		this.phaseStartTimes.delete(phaseName);
		return duration;
	}
	/**
	* Append a raw JSONL line from renderer (RPC relay)
	*
	* relay 场景（preload/renderer 打的点、main 观测 daemon 打的点，见
	* `markDaemonObservedFromMain`）：JSON 已在源端构造好，这里只写盘。为了让首屏
	* log 镜像也能覆盖 relay 上来的 D/E/F14~F19 各段，尝试解析行内容通知观察者。
	* 解析失败一律吞（旧行为完全兼容）。
	*/
	appendRendererLine(jsonLine) {
		const trimmed = jsonLine.trimEnd();
		this.appendLine(trimmed);
		try {
			const parsed = JSON.parse(trimmed);
			if (parsed._type !== "mark" || typeof parsed.phase !== "string") return;
			notifyPerfMarkObservers(this.flowType, parsed.phase, {
				elapsedMs: typeof parsed.elapsed === "number" ? parsed.elapsed : void 0,
				deltaMs: typeof parsed.delta === "number" ? parsed.delta : void 0,
				epochMs: typeof parsed.epochMs === "number" ? parsed.epochMs : Date.now(),
				proc: parsed.proc ?? parsed.source,
				pid: parsed.pid,
				data: parsed.data
			});
		} catch {}
	}
	/**
	* Write summary and finalize the log file
	*/
	flush() {
		if (this.summaryWritten) return;
		const summary = this.getSummary();
		this.appendLine(JSON.stringify({
			_type: "summary",
			...summary
		}));
		this.summaryWritten = true;
	}
	getSummary() {
		const phases = {};
		const starts = /* @__PURE__ */ new Map();
		for (const m of this.marks) if (m.phase.endsWith("_start")) {
			const name = m.phase.slice(0, -6);
			starts.set(name, {
				time: m.timestamp,
				count: (starts.get(name)?.count ?? 0) + 1
			});
		} else if (m.phase.endsWith("_end")) {
			const name = m.phase.slice(0, -4);
			const s = starts.get(name);
			if (s) phases[name] = {
				durationMs: m.data?.durationMs ?? Math.round(m.timestamp - s.time),
				markCount: s.count + 1
			};
		}
		return {
			flowType: this.flowType,
			...this.traceId ? { traceId: this.traceId } : {},
			totalDurationMs: Math.round(performance.now() - this.startTime),
			totalMarks: this.marks.length,
			phases
		};
	}
	appendLine(line) {
		if (isPerfFlowDisabled(this.flowType)) return;
		if (this.rawJsonLines && !isSdkPerfJsonlEnabled()) return;
		try {
			const payload = this.rawJsonLines ? line : `[${(/* @__PURE__ */ new Date()).toISOString()}] ${line}`;
			const logFilePath = this.getLogFilePath();
			this.ensureDir(node_path.dirname(logFilePath));
			node_fs.appendFileSync(logFilePath, `${payload}\n`, "utf-8");
		} catch {}
	}
	resolveSdkPerfLogFilePath() {
		const date = formatDate(/* @__PURE__ */ new Date());
		return node_path.join(require_code_cache.getWorkbuddyRuntimeLogsDir(date, "sdk", "perf"), `${date}.jsonl`);
	}
	ensureDir(dir) {
		try {
			if (!node_fs.existsSync(dir)) node_fs.mkdirSync(dir, { recursive: true });
		} catch {}
	}
	formatTimestamp(date) {
		const pad = (n) => String(n).padStart(2, "0");
		return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
	}
};
var perfLoggers = /* @__PURE__ */ new Map();
function perfLoggerKey(flowType, traceId) {
	return traceId ? `${flowType}:${traceId}` : String(flowType);
}
/**
* Get or create a perf logger for a specific flow type.
* Same flowType + traceId always returns the same instance.
*/
function getWorkbuddyPerfLogger(flowType, traceId) {
	const key = perfLoggerKey(flowType, traceId);
	if (!perfLoggers.has(key)) perfLoggers.set(key, new WorkbuddyPerfLogger(String(flowType), traceId));
	return perfLoggers.get(key);
}
/**
* Remove a logger without writing a summary. Use for raw per-trace SDK JSONL
* where each mark line already carries complete timing data.
*/
function releaseWorkbuddyPerfLogger(flowType, traceId) {
	perfLoggers.delete(perfLoggerKey(flowType, traceId));
}
/**
* 清理超过 keepDays 天的 startup 遥测日期目录（`logs/startup/<YYYY-MM-DD>/`）。
*
* 按**目录名日期**判定，不依赖 mtime——删整天目录连同其下所有 pid 分片。
* 只在 main 进程启动早期调一次即可（子进程不必重复）。全程吞异常，绝不阻塞启动。
*/
function cleanupOldStartupLogs(keepDays = 5) {
	try {
		const root = require_code_cache.getWorkbuddyRuntimeLogsDir("startup");
		if (!node_fs.existsSync(root)) return;
		const cutoff = Date.now() - keepDays * 864e5;
		for (const dayDir of node_fs.readdirSync(root)) {
			const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayDir);
			if (!m) continue;
			const t = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
			if (Number.isFinite(t) && t < cutoff) node_fs.rmSync(node_path.join(root, dayDir), {
				recursive: true,
				force: true
			});
		}
	} catch {}
}
//#endregion
//#region ../../packages/workbuddy-server/src/perf/marks.ts
/**
* Startup Performance Marks — 单一真相 schema
*
* 定义桌面端首屏启动链路的 64 个标准打点，按 6 个 Phase 分组：
*   A 进程启动     （process spawn → app.whenReady）         A0~A9
*   B bootstrap   （平台/DB/daemon 桥接/wsRpc/后台服务）      B1~B15
*   C 窗口创建     （WindowManager → BrowserWindow → show）   C1~C7
*   D preload     （preload 注入 → __bootstrap → RPC 就绪）   D1~D5
*   E renderer    （renderer 加载 → adapter 就绪 → 首屏可交互）E1~E8
*   F daemon      （daemon 子进程 + main 观测 daemon RPC）    F1~F19（与 C/D/E 并行）
*
* A/B/C 段在主进程打点（index.ts + main-bootstrap.ts + window-manager.ts），
* D 段在 preload、E 段在 renderer，经 daemon perf RPC（perf:appendLine，
* flowType='startup'）写入同一条 startup JSONL。main 侧拿到 logFilePath 后重新聚合，
* 再输出 summary / per-mark log / metric / trace。
*
* ⚠️ 这是双端共享的单一真相（main / preload / renderer 都从这里取 id/phase/key）。
* 放在 workbuddy-server/perf 是因为它是 perf logger 基建所在地，且 desktop 与
* workbuddy-app 都依赖 workbuddy-server（依赖方向干净，避免 app 反向依赖 desktop）。
*
* 节点 id / phase 归属以本表为准，调用方一律引用这里的常量，不写裸字符串。
* schema 共建：jshzhang × zochen × stanwei × dicky。
*/
/** Phase 分组标识（与 summary 里的 phase key 对齐）。 */
var PerfPhase = {
	A: "A_process",
	B: "B_bootstrap",
	C: "C_window",
	D: "D_preload",
	E: "E_renderer",
	F: "F_daemon"
};
var STARTUP_MARKS = {
	A0: {
		id: "A0",
		phase: PerfPhase.A,
		key: "process_created"
	},
	A1: {
		id: "A1",
		phase: PerfPhase.A,
		key: "process_started"
	},
	A2: {
		id: "A2",
		phase: PerfPhase.A,
		key: "imports_completed"
	},
	A3: {
		id: "A3",
		phase: PerfPhase.A,
		key: "bundled_assets_root_set"
	},
	A4: {
		id: "A4",
		phase: PerfPhase.A,
		key: "logger_configured"
	},
	A5: {
		id: "A5",
		phase: PerfPhase.A,
		key: "crash_writer_installed"
	},
	A6: {
		id: "A6",
		phase: PerfPhase.A,
		key: "shell_env_loaded"
	},
	A7: {
		id: "A7",
		phase: PerfPhase.A,
		key: "electron_app_configured"
	},
	A8: {
		id: "A8",
		phase: PerfPhase.A,
		key: "single_instance_locked"
	},
	A9: {
		id: "A9",
		phase: PerfPhase.A,
		key: "app_ready"
	},
	B1: {
		id: "B1",
		phase: PerfPhase.B,
		key: "bootstrap_entered"
	},
	B2: {
		id: "B2",
		phase: PerfPhase.B,
		key: "platform_created"
	},
	B3: {
		id: "B3",
		phase: PerfPhase.B,
		key: "celljs_container_ready"
	},
	B4: {
		id: "B4",
		phase: PerfPhase.B,
		key: "database_initialized"
	},
	B5: {
		id: "B5",
		phase: PerfPhase.B,
		key: "migration_context_ready"
	},
	B6: {
		id: "B6",
		phase: PerfPhase.B,
		key: "daemon_bridge_handlers_registered"
	},
	B7: {
		id: "B7",
		phase: PerfPhase.B,
		key: "daemon_env_ready"
	},
	B8: {
		id: "B8",
		phase: PerfPhase.B,
		key: "daemon_process_started"
	},
	B9: {
		id: "B9",
		phase: PerfPhase.B,
		key: "daemon_connection_created"
	},
	B10: {
		id: "B10",
		phase: PerfPhase.B,
		key: "renderer_migration_bridge_ready"
	},
	B11: {
		id: "B11",
		phase: PerfPhase.B,
		key: "daemon_event_bridges_registered"
	},
	B12: {
		id: "B12",
		phase: PerfPhase.B,
		key: "desktop_host_rpc_registered"
	},
	B13: {
		id: "B13",
		phase: PerfPhase.B,
		key: "wsrpc_ready"
	},
	B14: {
		id: "B14",
		phase: PerfPhase.B,
		key: "background_services_kicked"
	},
	B15: {
		id: "B15",
		phase: PerfPhase.B,
		key: "bootstrap_complete"
	},
	C1: {
		id: "C1",
		phase: PerfPhase.C,
		key: "window_manager_created"
	},
	C2: {
		id: "C2",
		phase: PerfPhase.C,
		key: "splash_shown"
	},
	C3: {
		id: "C3",
		phase: PerfPhase.C,
		key: "vendor_ensured"
	},
	C4: {
		id: "C4",
		phase: PerfPhase.C,
		key: "main_window_creating"
	},
	C5: {
		id: "C5",
		phase: PerfPhase.C,
		key: "main_window_created"
	},
	C6: {
		id: "C6",
		phase: PerfPhase.C,
		key: "browser_window_load_url"
	},
	C7: {
		id: "C7",
		phase: PerfPhase.C,
		key: "index_html_load"
	},
	D1: {
		id: "D1",
		phase: PerfPhase.D,
		key: "preload_start"
	},
	D2: {
		id: "D2",
		phase: PerfPhase.D,
		key: "preload_bootstrap_requested"
	},
	D3: {
		id: "D3",
		phase: PerfPhase.D,
		key: "preload_bootstrap_resolved"
	},
	D4: {
		id: "D4",
		phase: PerfPhase.D,
		key: "preload_rpc_connected"
	},
	D5: {
		id: "D5",
		phase: PerfPhase.D,
		key: "preload_exposed"
	},
	E1: {
		id: "E1",
		phase: PerfPhase.E,
		key: "renderer_nav_start"
	},
	E2: {
		id: "E2",
		phase: PerfPhase.E,
		key: "renderer_response_end"
	},
	E3: {
		id: "E3",
		phase: PerfPhase.E,
		key: "renderer_dom_interactive"
	},
	E4: {
		id: "E4",
		phase: PerfPhase.E,
		key: "renderer_web_first_paint"
	},
	E5: {
		id: "E5",
		phase: PerfPhase.E,
		key: "renderer_dom_content_loaded"
	},
	E6: {
		id: "E6",
		phase: PerfPhase.E,
		key: "renderer_script_start"
	},
	E7: {
		id: "E7",
		phase: PerfPhase.E,
		key: "renderer_dom_ready"
	},
	E8: {
		id: "E8",
		phase: PerfPhase.E,
		key: "renderer_react_mounted"
	},
	E9: {
		id: "E9",
		phase: PerfPhase.E,
		key: "renderer_adapter_init_start"
	},
	E10: {
		id: "E10",
		phase: PerfPhase.E,
		key: "renderer_first_paint"
	},
	E11: {
		id: "E11",
		phase: PerfPhase.E,
		key: "renderer_web_first_contentful_paint"
	},
	E12: {
		id: "E12",
		phase: PerfPhase.E,
		key: "renderer_adapter_connected"
	},
	E13: {
		id: "E13",
		phase: PerfPhase.E,
		key: "renderer_skeleton_gone"
	},
	E14: {
		id: "E14",
		phase: PerfPhase.E,
		key: "renderer_app_ready"
	},
	F1: {
		id: "F1",
		phase: PerfPhase.F,
		key: "daemon_started"
	},
	F2: {
		id: "F2",
		phase: PerfPhase.F,
		key: "daemon_db_ready"
	},
	F3: {
		id: "F3",
		phase: PerfPhase.F,
		key: "daemon_celljs_deps_resolved"
	},
	F4: {
		id: "F4",
		phase: PerfPhase.F,
		key: "daemon_tencent_docs_ready"
	},
	F5: {
		id: "F5",
		phase: PerfPhase.F,
		key: "daemon_migration_service_ready"
	},
	F6: {
		id: "F6",
		phase: PerfPhase.F,
		key: "daemon_sidecar_manager_ready"
	},
	F7: {
		id: "F7",
		phase: PerfPhase.F,
		key: "daemon_rpc_ready"
	},
	F8: {
		id: "F8",
		phase: PerfPhase.F,
		key: "daemon_domain_ready"
	},
	F9: {
		id: "F9",
		phase: PerfPhase.F,
		key: "daemon_ready"
	},
	F10: {
		id: "F10",
		phase: PerfPhase.F,
		key: "daemon_startup_migration_done"
	},
	F11: {
		id: "F11",
		phase: PerfPhase.F,
		key: "daemon_mcp_apps_host_ready"
	},
	F12: {
		id: "F12",
		phase: PerfPhase.F,
		key: "daemon_services_kicked"
	},
	F13: {
		id: "F13",
		phase: PerfPhase.F,
		key: "daemon_background_completed"
	},
	F14: {
		id: "F14",
		phase: PerfPhase.F,
		key: "daemon_state_refresh_started"
	},
	F15: {
		id: "F15",
		phase: PerfPhase.F,
		key: "daemon_auth_account_ready"
	},
	F16: {
		id: "F16",
		phase: PerfPhase.F,
		key: "daemon_auth_token_ready"
	},
	F17: {
		id: "F17",
		phase: PerfPhase.F,
		key: "daemon_config_request_sent"
	},
	F18: {
		id: "F18",
		phase: PerfPhase.F,
		key: "daemon_config_response_received"
	},
	F19: {
		id: "F19",
		phase: PerfPhase.F,
		key: "daemon_state_ready"
	}
};
//#endregion
Object.defineProperty(exports, "PerfFlow", {
	enumerable: true,
	get: function() {
		return PerfFlow;
	}
});
Object.defineProperty(exports, "STARTUP_MARKS", {
	enumerable: true,
	get: function() {
		return STARTUP_MARKS;
	}
});
Object.defineProperty(exports, "addPerfMarkObserver", {
	enumerable: true,
	get: function() {
		return addPerfMarkObserver;
	}
});
Object.defineProperty(exports, "cleanupOldStartupLogs", {
	enumerable: true,
	get: function() {
		return cleanupOldStartupLogs;
	}
});
Object.defineProperty(exports, "getWorkbuddyPerfLogger", {
	enumerable: true,
	get: function() {
		return getWorkbuddyPerfLogger;
	}
});
Object.defineProperty(exports, "isSdkPerfFlow", {
	enumerable: true,
	get: function() {
		return isSdkPerfFlow;
	}
});
