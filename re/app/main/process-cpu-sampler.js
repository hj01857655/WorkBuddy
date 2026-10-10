const require_rolldown_runtime = require("./rolldown-runtime.js");
let fs = require("fs");
fs = require_rolldown_runtime.__toESM(fs);
let os = require("os");
os = require_rolldown_runtime.__toESM(os);
let path = require("path");
path = require_rolldown_runtime.__toESM(path);
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
let node_path$1 = require_rolldown_runtime.__toESM(node_path, 1);
node_path = require_rolldown_runtime.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
node_fs_promises = require_rolldown_runtime.__toESM(node_fs_promises);
let node_os = require("node:os");
node_os = require_rolldown_runtime.__toESM(node_os);
let node_crypto = require("node:crypto");
let node_perf_hooks = require("node:perf_hooks");
let util = require("util");
let child_process = require("child_process");
let tls = require("tls");
tls = require_rolldown_runtime.__toESM(tls);
let crypto = require("crypto");
//#region ../../packages/monitor/src/common/crash-reporter/crash-type.ts
/**
* 「主动终止」信号集合：daemon / sidecar / main 生命周期管理正常关闭子进程所用的信号。
*
* 这些信号意味着父进程主动请求子进程退出（killSession / idle TTL 回收 /
* prewarm 池替换 / 应用退出清理），属于 expected shutdown，不计入 crash。
*
* 注意 SIGKILL(9) 不在此集合：它既可能是 pool 强杀（良性）也可能是系统
* OOM killer（异常），保持上报、由消费端（self-check）按进程名消歧。
*/
var GRACEFUL_TERMINATION_SIGNAL_NAMES = /* @__PURE__ */ new Set([
	"SIGTERM",
	"SIGINT",
	"SIGHUP",
	"SIGBREAK"
]);
/** 数字信号值 → 名称映射（与名称集合保持同步的最小表）。 */
var GRACEFUL_TERMINATION_SIGNAL_NUMBERS = /* @__PURE__ */ new Set([
	15,
	2,
	1,
	21
]);
/**
* 判断一个退出信号是否为「主动终止」（expected shutdown）。
*
* 同时兼容字符串名称（Node child_process 'exit' 事件、crash entry 的
* `signal` 字段）与数字（node-pty onExit payload、signalNameToNumber 结果）
* 两种形式。null/undefined（未被信号杀死）返回 false。
*/
function isGracefulTerminationSignal(signal) {
	if (signal === null || signal === void 0 || signal === "") return false;
	if (typeof signal === "number") return GRACEFUL_TERMINATION_SIGNAL_NUMBERS.has(signal);
	return GRACEFUL_TERMINATION_SIGNAL_NAMES.has(signal);
}
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-writer.ts
/**
* Crash Writer — 同步落盘实现
*
* 设计要点：
* - **同步写盘**：crash handler 触发后进程随时可能被终结，异步 IO 有概率丢数据
* - **同次启动追加**：本次进程启动后所有 crash 写入同一文件 entries[]
* - **永不抛异常**：写盘失败仅 best-effort，不影响业务进程行为
* - **去重保护**：单次启动最多保留 maxEntriesPerLaunch 条，多余的计入 droppedCount
* - **多实例安全**：文件名带 pid 后缀，同一 logsDir 下多进程互不覆盖
*
* 落盘路径：{logsDir}/Crash-Log/crash-report-{processName}-{pid}.json
*/
var DEFAULT_MAX_ENTRIES = 50;
var CRASH_LOG_DIR_NAME = "Crash-Log";
var MAX_PROCESS_NAME_LENGTH = 32;
/**
* 生成本地时间 ISO 8601 字符串，带时区偏移。
* 示例：2026-05-11T00:01:56.924+08:00
*
* 选择本地时间而非 UTC 的原因：crash 日志主要面向研发 / SRE 快速定位问题，
* 本地时间可直接对照体感时间，省去脑内 UTC→本地 的换算步骤。
* 保留 ±HH:MM 偏移确保跨时区仍可还原绝对时刻。
*/
function localISOString(date = /* @__PURE__ */ new Date()) {
	const offset = -date.getTimezoneOffset();
	const sign = offset >= 0 ? "+" : "-";
	const absOffset = Math.abs(offset);
	const hh = String(Math.floor(absOffset / 60)).padStart(2, "0");
	const mm = String(absOffset % 60).padStart(2, "0");
	const pad = (n, len = 2) => String(n).padStart(len, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}${sign}${hh}:${mm}`;
}
/**
* 生成紧凑的文件名时间戳：YYYYMMDDTHHmmss
* 用于文件名中标识启动时刻，避免 PID 回绕导致的文件碰撞。
*/
function compactTimestamp(date = /* @__PURE__ */ new Date()) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
var installed = false;
var writerState = {
	reportPath: null,
	cachedFile: null,
	maxEntries: DEFAULT_MAX_ENTRIES,
	launchedAt: localISOString(),
	startupTag: compactTimestamp()
};
/**
* 安装 Crash Writer。
*
* 自动 hook `process.on('uncaughtException')` 和 `process.on('unhandledRejection')`。
* 对于 Electron 主进程的 `render-process-gone` / `child-process-gone` 事件，
* 调用方需要自行 hook 并调用返回的 `handle.write()` 写入。
*
* 模块级防重复：同一进程多次调用是 no-op，返回同一 handle。
*/
function installCrashWriter(options) {
	const { logsDir, processName, appVersion, extraMeta, maxEntriesPerLaunch } = options;
	writerState.maxEntries = maxEntriesPerLaunch ?? DEFAULT_MAX_ENTRIES;
	writerState.launchedAt = localISOString();
	writerState.startupTag = compactTimestamp();
	const handle = {
		write: (entry) => writeCrashEntry(logsDir, processName, appVersion, extraMeta, entry),
		getReportPath: () => writerState.reportPath
	};
	if (installed) return handle;
	installed = true;
	process.on("uncaughtException", (error) => {
		handle.write({
			type: "uncaught_exception",
			error
		});
	});
	process.on("unhandledRejection", (reason) => {
		handle.write({
			type: "unhandled_rejection",
			error: reason
		});
	});
	return handle;
}
/**
* 包装子进程，监控其异常退出并写入 child_process_crash entry。
*
* issue #105913：SIGTERM/SIGINT/SIGHUP/SIGBREAK 是父进程生命周期管理的
* 正常关闭方式（idle TTL 回收 / prewarm 池替换 / 应用退出清理），被这些
* 信号终止属于 expected shutdown，不计入 crash。历史上这类退出占崩溃
* 条目的 56%（388/684），严重掩盖真实的 exit:1 崩溃。
*
* @param child - child_process.spawn() 返回的 ChildProcess 对象
* @param meta - 子进程标识信息
* @param writerHandle - installCrashWriter() 返回的 handle
*/
function wrapChildProcess(child, meta, writerHandle) {
	child.on("exit", (code, signal) => {
		if (code === 0 && !signal) return;
		if (isGracefulTerminationSignal(signal)) return;
		writerHandle.write({
			type: "child_process_crash",
			childProcess: {
				processType: "spawned",
				reason: signal ? `signal:${signal}` : `exit:${code}`,
				exitCode: code ?? -1,
				name: meta.name,
				signal: signal ?? void 0,
				disposition: "unexpected_crash"
			}
		});
	});
	child.on("error", (err) => {
		writerHandle.write({
			type: "child_process_crash",
			childProcess: {
				processType: "spawned",
				reason: `spawn-error:${err.message}`,
				exitCode: -1,
				name: meta.name,
				disposition: "unexpected_crash"
			}
		});
	});
}
function writeCrashEntry(logsDir, processName, appVersion, extraMeta, input) {
	if (!logsDir) return null;
	try {
		const safeName = sanitizeProcessName(processName);
		const crashLogDir = node_path.join(logsDir, CRASH_LOG_DIR_NAME);
		const filename = `crash-report-${safeName}-${process.pid}-${writerState.startupTag}.json`;
		const reportPath = node_path.join(crashLogDir, filename);
		if (!writerState.reportPath) writerState.reportPath = reportPath;
		node_fs.mkdirSync(crashLogDir, { recursive: true });
		if (!writerState.cachedFile) writerState.cachedFile = readExistingFile(reportPath) ?? buildInitialFile(safeName, appVersion, extraMeta);
		const file = writerState.cachedFile;
		if (file.entries.length >= writerState.maxEntries) file.droppedCount += 1;
		else {
			const entry = buildEntry(input);
			file.entries.push(entry);
		}
		node_fs.writeFileSync(reportPath, JSON.stringify(file, null, 2), "utf8");
		return reportPath;
	} catch {
		return null;
	}
}
function buildInitialFile(processName, appVersion, extraMeta) {
	return {
		launchedAt: writerState.launchedAt,
		pid: process.pid,
		processName,
		versions: {
			node: process.versions.node,
			electron: process.versions.electron,
			chrome: process.versions.chrome,
			v8: process.versions.v8
		},
		platform: process.platform,
		arch: process.arch,
		appVersion,
		extraMeta,
		entries: [],
		droppedCount: 0
	};
}
function buildEntry(input) {
	const timestamp = localISOString();
	const { type, error, renderer, childProcess: childProc } = input;
	if (type === "renderer_crash" && renderer) return {
		timestamp,
		type,
		errorName: "RendererCrash",
		errorMessage: `Renderer process gone: reason=${renderer.reason}, exitCode=${renderer.exitCode}`,
		stack: null,
		renderer
	};
	if (type === "child_process_crash" && childProc) return {
		timestamp,
		type,
		errorName: "ChildProcessCrash",
		errorMessage: `Child process gone (${childProc.serviceName || childProc.name || childProc.processType}): reason=${childProc.reason}, exitCode=${childProc.exitCode}`,
		stack: null,
		childProcess: childProc,
		disposition: childProc.disposition
	};
	return {
		timestamp,
		type,
		...serializeReason(error)
	};
}
function serializeReason(reason) {
	if (reason instanceof Error) return {
		errorName: reason.name || "Error",
		errorMessage: reason.message ?? "",
		stack: reason.stack ?? null
	};
	let raw;
	try {
		raw = typeof reason === "string" ? reason : JSON.stringify(reason);
	} catch {
		raw = String(reason);
	}
	return {
		errorName: "NonError",
		errorMessage: typeof reason === "string" ? reason : raw,
		stack: null,
		raw
	};
}
function readExistingFile(reportPath) {
	try {
		if (!node_fs.existsSync(reportPath)) return null;
		const raw = node_fs.readFileSync(reportPath, "utf8");
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.entries)) return null;
		if (typeof parsed.droppedCount !== "number") parsed.droppedCount = 0;
		return parsed;
	} catch {
		return null;
	}
}
/**
* 清洗进程名为安全文件路径片段。
* 仅保留 A-Za-z0-9._-，其余替换为 _，截断到 32 字符。
*/
function sanitizeProcessName(rawName) {
	if (!rawName) return "unknown";
	return rawName.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").slice(0, MAX_PROCESS_NAME_LENGTH) || "unknown";
}
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-filter.ts
/** 内置消息排除模式（常见噪音） */
var DEFAULT_EXCLUDE_PATTERNS = [
	/EPIPE/,
	/ECONNRESET/,
	/ECONNREFUSED/,
	/ETIMEDOUT/,
	/ENETUNREACH/,
	/EHOSTUNREACH/,
	/ENOTFOUND/,
	/ERR_SOCKET_CONNECTION_TIMEOUT/,
	/^Canceled/,
	/OTLPExporterError/,
	/^Timeout$/,
	/^Not connected$/,
	/^\[?\{\}\]?$/,
	/ResizeObserver loop/,
	/Object has been destroyed/,
	/ERR_IPC_CHANNEL_CLOSED/,
	/GPU process .* terminated with exit code 0/
];
var DEFAULT_DEDUP_WINDOW_MS = 6e4;
var DEFAULT_MAX_PER_WINDOW = 100;
var CrashFilter = class {
	constructor(config) {
		this.deduplicateMap = /* @__PURE__ */ new Map();
		this.windowStart = Date.now();
		this.windowCount = 0;
		this.messagePatterns = config.messageExcludePatterns;
		this.typeExcludes = new Set(config.typeExcludes ?? []);
		this.deduplicateWindowMs = config.deduplicateWindowMs ?? DEFAULT_DEDUP_WINDOW_MS;
		this.maxReportsPerWindow = config.maxReportsPerWindow ?? DEFAULT_MAX_PER_WINDOW;
		this.customFilter = config.customFilter;
	}
	/**
	* 判断一条 crash entry 是否应该过滤（不上报）。
	* @returns true = 过滤（不上报）；false = 放行
	*/
	shouldFilter(entry) {
		if (this.typeExcludes.has(entry.type)) return true;
		const msg = entry.errorMessage;
		for (const pattern of this.messagePatterns) if (typeof pattern === "string") {
			if (msg.includes(pattern)) return true;
		} else if (pattern.test(msg)) return true;
		if (this.customFilter && this.customFilter(entry)) return true;
		const now = Date.now();
		if (now - this.windowStart > this.deduplicateWindowMs) {
			this.windowStart = now;
			this.windowCount = 0;
			this.cleanExpiredDedup(now);
		}
		this.windowCount++;
		if (this.windowCount > this.maxReportsPerWindow) return true;
		const fingerprint = this.buildFingerprint(entry);
		const existing = this.deduplicateMap.get(fingerprint);
		if (existing && now - existing.lastTime < this.deduplicateWindowMs) return true;
		this.deduplicateMap.set(fingerprint, {
			fingerprint,
			lastTime: now
		});
		return false;
	}
	buildFingerprint(entry) {
		const stackPart = (entry.stack ?? "").slice(0, 200);
		return `${entry.type}:${entry.errorName}:${entry.errorMessage.slice(0, 100)}:${stackPart}`;
	}
	cleanExpiredDedup(now) {
		for (const [key, value] of this.deduplicateMap) if (now - value.lastTime > this.deduplicateWindowMs * 2) this.deduplicateMap.delete(key);
	}
};
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-sanitizer.ts
/**
* Crash Sanitizer — 脱敏处理
*
* 对 crash entry 中的堆栈路径和错误消息进行脱敏，
* 确保上报到伽利略平台的数据不含用户本地路径和敏感信息。
*/
var SENSITIVE_PATTERNS = [
	/(?:token|apikey|api_key|password|secret|authorization|bearer)\s*[=:]\s*\S+/i,
	/eyJ[\w-]+\.eyJ[\w-]+\.[\w-]+/,
	/(?:ghp_|gho_|github_pat_|sk-|pk_live_|pk_test_)\w+/
];
/** 错误消息最大长度 */
var MAX_MESSAGE_LENGTH = 500;
var CrashSanitizer = class {
	constructor() {
		this.homeDir = node_os.homedir();
		this.homeDirEscaped = this.homeDir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	/**
	* 对一条 CrashEntry 执行完整脱敏，返回新对象（不修改原对象）
	*/
	sanitizeEntry(entry) {
		return {
			...entry,
			errorMessage: this.sanitizeMessage(entry.errorMessage),
			stack: entry.stack ? this.sanitizeStack(entry.stack) : null,
			raw: entry.raw ? this.sanitizeMessage(entry.raw) : void 0
		};
	}
	/**
	* 堆栈路径脱敏：
	* - macOS/Linux: /Users/xxx/ → ~/
	* - Windows: C:\Users\xxx\ → ~\
	*/
	sanitizeStack(stack) {
		if (!stack) return stack;
		const pattern = new RegExp(this.homeDirEscaped, "g");
		return stack.replace(pattern, "~");
	}
	/**
	* 错误消息脱敏：
	* - 替换 token/password/secret 等敏感值为 [REDACTED]
	* - 替换 home 目录路径
	* - 截断至 MAX_MESSAGE_LENGTH
	*/
	sanitizeMessage(message) {
		if (!message) return message;
		let result = message;
		for (const pattern of SENSITIVE_PATTERNS) result = result.replace(new RegExp(pattern.source, pattern.flags + "g"), "[REDACTED]");
		const homePattern = new RegExp(this.homeDirEscaped, "g");
		result = result.replace(homePattern, "~");
		if (result.length > MAX_MESSAGE_LENGTH) result = result.slice(0, MAX_MESSAGE_LENGTH) + "...[truncated]";
		return result;
	}
};
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-log-exporter.ts
/**
* Crash Log Exporter — 定时扫描 Crash-Log/ 目录并上报伽利略
*
* 工作流程：
* 1. 定时扫描 Crash-Log/ 目录下的 JSON 文件
* 2. 过滤已处理文件（.processed-crashes.json）
* 3. 对每条 entry 执行：Filter → Sanitize → Enrich Context → 构建 LogRecord
* 4. 批量上报：通过 CrashExportTransport 发送
* 5. 更新已处理记录
*
* 设计要点：
* - 与 CrashWriter 完全解耦，通过文件系统松耦合
* - 异步执行，不影响主进程性能
* - 失败不抛异常，仅记录日志
*/
var DEFAULT_SCAN_INTERVAL_MS = 3e4;
var DEFAULT_RETENTION_DAYS = 30;
var PROCESSED_FILE = ".processed-crashes.json";
var CrashLogExporter = class CrashLogExporter {
	static {
		this.MAX_PREVIOUS_SESSION = 1;
	}
	static {
		this.MAX_CURRENT_SESSION = 5;
	}
	constructor(config) {
		this.timer = null;
		this.isScanning = false;
		this.processedState = { files: {} };
		this.reportedPreviousSession = 0;
		this.reportedCurrentSession = 0;
		this.crashLogDir = config.crashLogDir;
		this.contextProvider = config.contextProvider;
		this.transport = config.transport;
		this.scanIntervalMs = config.scanIntervalMs ?? DEFAULT_SCAN_INTERVAL_MS;
		this.retentionDays = config.retentionDays ?? DEFAULT_RETENTION_DAYS;
		this.appLaunchedAtMs = config.appLaunchedAtMs ?? Date.now();
		this.enableUpload = config.enableUpload ?? true;
		this.filter = config.filter ? new CrashFilter(config.filter) : null;
		this.sanitizer = new CrashSanitizer();
	}
	/** 启动定时扫描（立即执行一次 + 定时） */
	start() {
		this.loadProcessedState();
		if (this.enableUpload) this.reportStartupEvent().catch(() => {});
		this.scanAndExport().catch(() => {});
		this.timer = setInterval(() => {
			this.scanAndExport().catch(() => {});
		}, this.scanIntervalMs);
		if (this.timer.unref) this.timer.unref();
	}
	/** 停止定时扫描 */
	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	/** 手动触发一次扫描上报（如进程退出前） */
	async flush() {
		await this.scanAndExport();
	}
	/**
	* 上报一条 `codebuddy.app_startup` 日志，用于计算 Crash 率的 DAU 分母。
	* 与 crash 数据同 target、同通道（/v1/logs），确保分子分母数据源一致。
	*/
	async reportStartupEvent() {
		try {
			const context = this.contextProvider.getContext();
			const record = {
				timestamp: Date.now(),
				level: "info",
				message: "app.startup",
				attributes: {
					"event": "codebuddy.app_startup",
					"host.ide_name": context.host.ideName,
					"host.ide_type": context.host.ideType,
					"host.machine_id": context.host.machineId,
					"host.session_id": context.host.sessionId,
					"host.ide_version": context.host.ideVersion,
					"host.download_channel": context.host.downloadChannel,
					"os.name": context.os.os,
					"os.arch": context.os.arch,
					"user.id": context.user.userId
				}
			};
			await this.transport.exportLogs([record]);
		} catch {}
	}
	async scanAndExport() {
		if (this.isScanning) return;
		this.isScanning = true;
		try {
			try {
				await node_fs_promises.access(this.crashLogDir);
			} catch {
				return;
			}
			const files = (await node_fs_promises.readdir(this.crashLogDir)).filter((f) => f.startsWith("crash-report-") && f.endsWith(".json"));
			if (files.length === 0) return;
			await this.cleanupExpiredFiles(files);
			if (!this.enableUpload) return;
			const remainingFiles = [];
			for (const f of files) try {
				await node_fs_promises.access(node_path.join(this.crashLogDir, f));
				remainingFiles.push(f);
			} catch {}
			const logRecords = [];
			const context = this.contextProvider.getContext();
			for (const filename of remainingFiles) {
				const newRecords = await this.processFile(filename, context);
				logRecords.push(...newRecords);
			}
			const dedupedRecords = this.deduplicateRecords(logRecords);
			const quotaRecords = this.applyReportQuota(dedupedRecords);
			if (quotaRecords.length > 0) await this.transport.exportLogs(quotaRecords);
			await this.saveProcessedState();
		} catch {} finally {
			this.isScanning = false;
		}
	}
	async processFile(filename, context) {
		const records = [];
		try {
			const filePath = node_path.join(this.crashLogDir, filename);
			const raw = await node_fs_promises.readFile(filePath, "utf8");
			const report = JSON.parse(raw);
			if (!report || !Array.isArray(report.entries)) return records;
			const processedCount = this.processedState.files[filename] ?? 0;
			const newEntries = report.entries.slice(processedCount);
			if (newEntries.length === 0) return records;
			for (const entry of newEntries) {
				if (this.filter && this.filter.shouldFilter(entry)) continue;
				const sanitized = this.sanitizer.sanitizeEntry(entry);
				const record = this.buildLogRecord(sanitized, report, context);
				records.push(record);
			}
			this.processedState.files[filename] = report.entries.length;
		} catch {}
		return records;
	}
	buildLogRecord(entry, file, context) {
		const attributes = {
			"event": "codebuddy.crash",
			"crash_type": entry.type,
			"process_name": file.processName,
			"host.ide_name": context.host.ideName,
			"host.ide_type": context.host.ideType,
			"host.machine_id": context.host.machineId,
			"host.session_id": context.host.sessionId,
			"host.ide_version": context.host.ideVersion,
			"host.download_channel": context.host.downloadChannel,
			"os.name": context.os.os,
			"os.arch": context.os.arch,
			"os.version": context.os.osVersion,
			"os.cpu_model": context.os.cpuModel,
			"os.cpu_cores": context.os.cpuCores,
			"os.memory_gb": context.os.memorySize,
			"user.id": context.user.userId,
			"user.name": context.user.username,
			"user.nickname": context.user.userNickname,
			"product.type": context.product.product,
			"product.commit": context.product.commit,
			"error.name": entry.errorName,
			"error.message": entry.errorMessage
		};
		if (entry.stack) attributes["error.stack"] = entry.stack;
		if (context.user.enterpriseId) attributes["user.enterprise_id"] = context.user.enterpriseId;
		if (context.user.tenantId) attributes["user.tenant_id"] = context.user.tenantId;
		if (context.product.releaseDate) attributes["product.release_date"] = String(context.product.releaseDate);
		if (entry.renderer) {
			attributes["renderer.reason"] = entry.renderer.reason;
			attributes["renderer.exit_code"] = entry.renderer.exitCode;
			if (entry.renderer.url) attributes["renderer.url"] = entry.renderer.url;
		}
		if (entry.childProcess) {
			attributes["child_process.type"] = entry.childProcess.processType;
			attributes["child_process.reason"] = entry.childProcess.reason;
			attributes["child_process.exit_code"] = entry.childProcess.exitCode;
			if (entry.childProcess.serviceName) attributes["child_process.service"] = entry.childProcess.serviceName;
			if (entry.childProcess.name) attributes["child_process.name"] = entry.childProcess.name;
		}
		if (file.extraMeta) for (const [key, value] of Object.entries(file.extraMeta)) attributes[`meta.${key}`] = String(value);
		attributes["report_origin"] = new Date(file.launchedAt).getTime() >= this.appLaunchedAtMs ? "current_session" : "previous_session";
		return {
			timestamp: new Date(entry.timestamp).getTime(),
			level: "error",
			message: `crash.${entry.type}`,
			attributes
		};
	}
	/**
	* 对同一批 LogRecord 做去重：相同 (timestamp, crash_type, message) 只保留首条。
	* 防止 CrashWriter 短时间内写入多条完全相同的 entry（如 EPIPE 连续触发、
	* renderer_js_error 高频重复等）导致伽利略侧出现大量重复日志。
	*/
	deduplicateRecords(records) {
		const seen = /* @__PURE__ */ new Set();
		return records.filter((r) => {
			const fp = `${r.timestamp}|${r.attributes["crash_type"] ?? ""}|${String(r.attributes["error.message"] ?? "").slice(0, 120)}`;
			if (seen.has(fp)) return false;
			seen.add(fp);
			return true;
		});
	}
	/**
	* 按 report_origin 限制上报数量（整个进程生命周期内累计）：
	* - previous_session（上次启动遗留）：最多 1 条
	* - current_session（当次启动产生）：最多 5 条
	*
	* 保留最后 N 条（取 slice 尾部），确保上报的是最新的 crash。
	*/
	applyReportQuota(records) {
		const result = [];
		const previous = records.filter((r) => r.attributes["report_origin"] === "previous_session");
		const current = records.filter((r) => r.attributes["report_origin"] === "current_session");
		const prevRemaining = CrashLogExporter.MAX_PREVIOUS_SESSION - this.reportedPreviousSession;
		if (prevRemaining > 0 && previous.length > 0) {
			const take = previous.slice(-prevRemaining);
			result.push(...take);
			this.reportedPreviousSession += take.length;
		}
		const currRemaining = CrashLogExporter.MAX_CURRENT_SESSION - this.reportedCurrentSession;
		if (currRemaining > 0 && current.length > 0) {
			const take = current.slice(-currRemaining);
			result.push(...take);
			this.reportedCurrentSession += take.length;
		}
		return result;
	}
	/**
	* 删除超过 retentionDays 的 crash report 文件，并清理 processedState 中对应的记录。
	* 判断依据：文件的 mtime（最后修改时间）。
	*/
	async cleanupExpiredFiles(files) {
		const cutoffMs = Date.now() - this.retentionDays * 24 * 60 * 60 * 1e3;
		for (const filename of files) try {
			const filePath = node_path.join(this.crashLogDir, filename);
			if ((await node_fs_promises.stat(filePath)).mtimeMs < cutoffMs) {
				await node_fs_promises.unlink(filePath);
				delete this.processedState.files[filename];
			}
		} catch {}
	}
	loadProcessedState() {
		try {
			const stateFile = node_path.join(this.crashLogDir, PROCESSED_FILE);
			if (node_fs.existsSync(stateFile)) {
				const raw = node_fs.readFileSync(stateFile, "utf8");
				const parsed = JSON.parse(raw);
				this.processedState = parsed && parsed.files ? parsed : { files: {} };
			}
		} catch {
			this.processedState = { files: {} };
		}
	}
	async saveProcessedState() {
		try {
			const stateFile = node_path.join(this.crashLogDir, PROCESSED_FILE);
			await node_fs_promises.mkdir(this.crashLogDir, { recursive: true });
			const existingFiles = new Set((await node_fs_promises.readdir(this.crashLogDir).catch(() => [])).filter((f) => f.startsWith("crash-report-") && f.endsWith(".json")));
			for (const key of Object.keys(this.processedState.files)) if (!existingFiles.has(key)) delete this.processedState.files[key];
			await node_fs_promises.writeFile(stateFile, JSON.stringify(this.processedState, null, 2), "utf8");
		} catch {}
	}
};
//#endregion
//#region ../../packages/at-rest-crypto/dist/key-normalize-2t2Jeyvk.mjs
function encodeUint32(value) {
	if (!Number.isSafeInteger(value) || value < 0 || value > MAX_UINT32) throw new RangeError("value must be a uint32");
	const bytes = Buffer.allocUnsafe(4);
	bytes.writeUInt32BE(value);
	return bytes;
}
function encodeLengthPrefixed(value) {
	const bytes = Buffer.from(value, "utf8");
	if (bytes.length === 0 || bytes.length > MAX_UINT32) throw new RangeError("authenticated string must contain 1..2^32-1 UTF-8 bytes");
	return Buffer.concat([encodeUint32(bytes.length), bytes]);
}
function encodeOptionalString(value) {
	return value === void 0 ? Buffer.from([0]) : Buffer.concat([Buffer.from([1]), encodeLengthPrefixed(value)]);
}
function encodeOptionalUint64(value) {
	if (value === void 0) return Buffer.from([0]);
	if (typeof value !== "bigint" || value < 0n || value > MAX_UINT64$1) throw new RangeError("sequence must be a uint64");
	const bytes = Buffer.allocUnsafe(9);
	bytes[0] = 1;
	bytes.writeBigUInt64BE(value, 1);
	return bytes;
}
function assertSymmetricContextShape(context) {
	if (context.purpose !== void 0 || context.resourceId !== void 0 || context.fieldPath !== void 0) throw new TypeError("sym-v1 context must not carry purpose, resourceId or fieldPath");
	switch (context.framing) {
		case "file":
		case "field":
			if (context.sequence !== void 0 || context.final !== void 0) throw new TypeError("sym-v1 whole-value context must not carry sequence or final");
			break;
		case "record":
			if (typeof context.sequence !== "bigint" || context.final !== void 0) throw new TypeError("record context requires only sequence");
			break;
		case "stream":
			if (typeof context.sequence !== "bigint" || typeof context.final !== "boolean") throw new TypeError("stream context requires sequence and final");
			break;
		default: {
			const neverFraming = context.framing;
			throw new TypeError(`unsupported framing: ${String(neverFraming)}`);
		}
	}
}
function assertAsymmetricContextShape(context) {
	if (typeof context.purpose !== "string" || typeof context.resourceId !== "string") throw new TypeError("purpose and resourceId must be strings");
	encodeLengthPrefixed(context.purpose);
	encodeLengthPrefixed(context.resourceId);
	if (context.sequence !== void 0 || context.final !== void 0) throw new TypeError("asym-v1 context must not carry sequence or final");
	switch (context.framing) {
		case "file":
			if (context.fieldPath !== void 0) throw new TypeError("file context contains forbidden authenticated fields");
			break;
		case "field":
			if (typeof context.fieldPath !== "string" || context.fieldPath.length === 0) throw new TypeError("field context requires fieldPath");
			break;
		default: throw new TypeError("asym-v1 supports only file and field framing");
	}
}
function buildAuthenticatedContextAad(keyId, suite, context, scheme = "sym-v1") {
	if (!/^[0-9a-f]{16}$/.test(keyId)) throw new TypeError("keyId must be 16 lowercase hexadecimal characters");
	if (scheme === "sym-v1") {
		assertSymmetricContextShape(context);
		return Buffer.concat([
			AAD_DOMAIN,
			Buffer.from([1]),
			encodeLengthPrefixed(STANDARD_FORMAT_ID[context.framing]),
			encodeLengthPrefixed(scheme),
			encodeUint32(suite),
			encodeLengthPrefixed(keyId),
			Buffer.from([FRAMING_CODE[context.framing]]),
			encodeOptionalUint64(context.sequence),
			Buffer.from([context.final === void 0 ? 0 : context.final ? 2 : 1])
		]);
	}
	assertAsymmetricContextShape(context);
	return Buffer.concat([
		AAD_DOMAIN,
		Buffer.from([1]),
		encodeLengthPrefixed(context.framing === "file" ? ADVANCED_FORMAT_ID.file : ADVANCED_FORMAT_ID.field),
		encodeLengthPrefixed(scheme),
		encodeUint32(suite),
		encodeLengthPrefixed(keyId),
		Buffer.from([FRAMING_CODE[context.framing]]),
		encodeLengthPrefixed(context.purpose),
		encodeLengthPrefixed(context.resourceId),
		encodeOptionalString(context.fieldPath),
		encodeOptionalUint64(void 0),
		Buffer.from([0])
	]);
}
function buildFileKeyWrapContext(input) {
	assertAsymmetricContextShape(input.context);
	if (!/^[0-9a-f]{16}$/.test(input.fileKeyId)) throw new TypeError("fileKeyId must be 16 lowercase hexadecimal characters");
	if (!/^[0-9a-f]{64}$/.test(input.developerPublicKeyId)) throw new TypeError("developerPublicKeyId must be 64 lowercase hexadecimal characters");
	const formatId = ADVANCED_FORMAT_ID[input.context.framing];
	return Buffer.concat([
		WRAP_DOMAIN,
		Buffer.from([1]),
		encodeLengthPrefixed(formatId),
		encodeLengthPrefixed("asym-v1"),
		encodeUint32(input.suite),
		encodeLengthPrefixed(input.fileKeyId),
		encodeLengthPrefixed(input.developerPublicKeyId),
		Buffer.from([FRAMING_CODE[input.context.framing]]),
		encodeLengthPrefixed(input.context.purpose),
		encodeLengthPrefixed(input.context.resourceId),
		encodeOptionalString(input.context.fieldPath)
	]);
}
function hasReservedWbeMagic(bytes) {
	if (bytes.length < 6) return false;
	const header = bytes.subarray(0, 6);
	return header.subarray(0, 3).equals(Buffer.from("WBE", "ascii")) && header[3] >= 65 && header[3] <= 90 && header[4] >= 48 && header[4] <= 57 && (header[5] === 10 || header[5] === 58);
}
function classifyWholeFileBytes(bytes) {
	if (!hasReservedWbeMagic(bytes)) return "legacy";
	if (bytes.subarray(0, 6).equals(WHOLE_FILE_MAGIC$1)) return "WBEF1";
	if (bytes.subarray(0, 6).equals(ADVANCED_WHOLE_FILE_MAGIC$1)) return "WBEA1";
	throw new UnsupportedCiphertextError(`unsupported ciphertext framing ${bytes.subarray(0, 6).toString("ascii")}`);
}
function decodeCanonicalBase64$1(value, field) {
	if (typeof value !== "string" || value.length === 0) throw new IntegrityError(`${field} must be non-empty canonical base64`);
	const decoded = Buffer.from(value, "base64");
	if (decoded.toString("base64") !== value) throw new IntegrityError(`${field} must be canonical base64`);
	return decoded;
}
function parseEnvelopeObject(envelopeBytes) {
	if (envelopeBytes.length > 67108864) throw new UnsupportedCiphertextError("envelope exceeds this reader limit");
	let value;
	try {
		value = JSON.parse(envelopeBytes.toString("utf8"));
	} catch (cause) {
		throw new IntegrityError("envelope is not valid JSON", { cause });
	}
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new IntegrityError("envelope must be an object");
	return value;
}
function parseSupportedEnvelope(envelopeBytes) {
	const envelope = parseEnvelopeObject(envelopeBytes);
	if (!Number.isInteger(envelope.suite)) throw new IntegrityError("suite must be an integer");
	const suite = envelope.suite;
	if (suite < MIN_ACCEPTED_SUITE || !SUPPORTED_SUITES.has(suite)) throw new UnsupportedCiphertextError(`unsupported suite ${suite}`);
	const keys = Object.keys(envelope).sort();
	if (keys.length !== ENVELOPE_KEYS.length || keys.some((key, index) => key !== ENVELOPE_KEYS[index])) throw new IntegrityError("suite 1 envelope fields do not match the schema");
	if (typeof envelope.keyId !== "string" || !/^[0-9a-f]{16}$/.test(envelope.keyId)) throw new IntegrityError("keyId must be 16 lowercase hexadecimal characters");
	const nonce = decodeCanonicalBase64$1(envelope.nonce, "nonce");
	const authTag = decodeCanonicalBase64$1(envelope.authTag, "authTag");
	const ciphertext = typeof envelope.ciphertext === "string" && envelope.ciphertext === "" ? Buffer.alloc(0) : decodeCanonicalBase64$1(envelope.ciphertext, "ciphertext");
	if (nonce.length !== 12 || authTag.length !== 16) throw new IntegrityError("suite 1 nonce or authentication tag has the wrong length");
	return {
		suite,
		keyId: envelope.keyId,
		nonce,
		authTag,
		ciphertext
	};
}
function isCanonical32ByteBase64(value) {
	if (typeof value !== "string" || value.length !== 44) return false;
	const decoded = Buffer.from(value, "base64");
	try {
		return decoded.length === 32 && decoded.toString("base64") === value;
	} finally {
		decoded.fill(0);
	}
}
function isZeroKeySentinel(value) {
	const decoded = Buffer.from(value, "base64");
	try {
		return decoded.every((byte) => byte === 0);
	} finally {
		decoded.fill(0);
	}
}
function parseKeyPayload(rawPayload) {
	let value;
	try {
		value = JSON.parse(rawPayload);
	} catch (cause) {
		throw new KeyPayloadParseError("workbuddy key payload is not valid JSON", "KEY_PAYLOAD_PARSE_FAILED", { cause });
	}
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new KeyPayloadParseError("workbuddy key payload must be an object", "KEY_PAYLOAD_SCHEMA_INVALID");
	const payload = value;
	if (payload.version !== 1) throw new KeyPayloadParseError("workbuddy key payload version must be 1", "KEY_PAYLOAD_VERSION_UNSUPPORTED");
	if (!isCanonical32ByteBase64(payload.atRestSecretKey)) throw new KeyPayloadParseError("atRestSecretKey must be canonical base64 for 32 bytes", "AT_REST_SECRET_KEY_INVALID");
	if (isZeroKeySentinel(payload.atRestSecretKey)) throw new KeyPayloadParseError("atRestSecretKey sentinel is not allowed", "AT_REST_SECRET_KEY_INVALID");
	return {
		version: 1,
		atRestSecretKey: payload.atRestSecretKey
	};
}
function deriveAtRestKeyId(key) {
	if (key.byteLength !== 32) throw new KeyPayloadParseError("normalized at-rest key must be exactly 32 bytes", "AT_REST_KEY_LENGTH_INVALID");
	return (0, node_crypto.createHash)("sha256").update(key).digest("hex").slice(0, 16);
}
function normalizeAtRestKeyPayload(rawPayload) {
	const payload = parseKeyPayload(rawPayload);
	const key = (0, node_crypto.createHash)("sha256").update(payload.atRestSecretKey, "utf8").digest();
	return {
		key,
		keyId: deriveAtRestKeyId(key)
	};
}
function decodeCanonicalBase64$2(value, field) {
	if (typeof value !== "string" || value.length === 0) throw new KeyPayloadParseError(`${field} must be non-empty canonical base64`, "DEVELOPER_PUBLIC_KEY_INVALID");
	const decoded = Buffer.from(value, "base64");
	if (decoded.length === 0 || decoded.toString("base64") !== value) {
		decoded.fill(0);
		throw new KeyPayloadParseError(`${field} must be canonical base64`, "DEVELOPER_PUBLIC_KEY_INVALID");
	}
	return decoded;
}
function normalizeAtRestDeveloperPublicKey(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new KeyPayloadParseError("at-rest developer public key must be an object", "DEVELOPER_PUBLIC_KEY_INVALID");
	const input = value;
	const keys = Object.keys(input).sort();
	if (keys.length !== 3 || keys[0] !== "alg" || keys[1] !== "id" || keys[2] !== "key") throw new KeyPayloadParseError("at-rest developer public key fields do not match the schema", "DEVELOPER_PUBLIC_KEY_INVALID");
	if (input.alg !== "RSA-OAEP-256" || typeof input.id !== "string" || !/^[0-9a-f]{64}$/.test(input.id)) throw new KeyPayloadParseError("at-rest developer public key metadata is invalid", "DEVELOPER_PUBLIC_KEY_INVALID");
	const keyDer = decodeCanonicalBase64$2(input.key, "at-rest developer public key");
	const id = (0, node_crypto.createHash)("sha256").update(keyDer).digest("hex");
	if (id !== input.id) {
		keyDer.fill(0);
		throw new KeyPayloadParseError("at-rest developer public key id does not match key material", "DEVELOPER_PUBLIC_KEY_ID_MISMATCH");
	}
	try {
		const key = (0, node_crypto.createPublicKey)({
			key: keyDer,
			format: "der",
			type: "spki"
		});
		if (key.asymmetricKeyType !== "rsa" || key.asymmetricKeyDetails?.modulusLength !== 3072) throw new Error("not RSA-3072");
	} catch (cause) {
		keyDer.fill(0);
		throw new KeyPayloadParseError("at-rest developer public key must be RSA-3072 SPKI DER", "DEVELOPER_PUBLIC_KEY_INVALID", { cause });
	}
	return {
		alg: "RSA-OAEP-256",
		id,
		keyDer
	};
}
function normalizeAtRestBuildKeyCapabilities(rawPayload) {
	let value;
	try {
		value = JSON.parse(rawPayload);
	} catch {
		return unavailableBuildCapabilities("invalid-key");
	}
	if (typeof value !== "object" || value === null || Array.isArray(value)) return unavailableBuildCapabilities("invalid-key");
	const payload = value;
	const allowedKeys = /* @__PURE__ */ new Set([
		"version",
		"atRestSecretKey",
		"atRestDeveloperPublicKey"
	]);
	if (Object.keys(payload).some((key) => !allowedKeys.has(key)) || payload.version !== 1) return unavailableBuildCapabilities("invalid-key");
	let symmetric;
	try {
		symmetric = {
			status: "available",
			value: normalizeAtRestKeyPayload(JSON.stringify({
				version: 1,
				atRestSecretKey: payload.atRestSecretKey
			}))
		};
	} catch {
		symmetric = {
			status: "unavailable",
			category: payload.atRestSecretKey === void 0 ? "missing-key" : "invalid-key"
		};
	}
	let developerPublicKey;
	if (!Object.prototype.hasOwnProperty.call(payload, "atRestDeveloperPublicKey")) developerPublicKey = {
		status: "unavailable",
		category: "missing-key"
	};
	else try {
		developerPublicKey = {
			status: "available",
			value: normalizeAtRestDeveloperPublicKey(payload.atRestDeveloperPublicKey)
		};
	} catch {
		developerPublicKey = {
			status: "unavailable",
			category: "invalid-key"
		};
	}
	return {
		symmetric,
		developerPublicKey
	};
}
function unavailableBuildCapabilities(category) {
	return {
		symmetric: {
			status: "unavailable",
			category
		},
		developerPublicKey: {
			status: "unavailable",
			category
		}
	};
}
var AAD_DOMAIN, WRAP_DOMAIN, MAX_UINT32, MAX_UINT64$1, FRAMING_CODE, STANDARD_FORMAT_ID, ADVANCED_FORMAT_ID, AtRestCryptoError, CryptoUnavailableError, KeyPayloadParseError, IntegrityError, UnsupportedCiphertextError, KeyMismatchError, PayloadTooLargeError, MIN_ACCEPTED_SUITE, SUPPORTED_SUITES, ENVELOPE_KEYS, WHOLE_FILE_MAGIC$1, ADVANCED_WHOLE_FILE_MAGIC$1;
var init_key_normalize_2t2Jeyvk = require_rolldown_runtime.__esmMin((() => {
	AAD_DOMAIN = Buffer.from("WB-AAD\0", "ascii");
	WRAP_DOMAIN = Buffer.from("WB-WRAP\0", "ascii");
	MAX_UINT32 = 4294967295;
	MAX_UINT64$1 = 18446744073709551615n;
	FRAMING_CODE = {
		file: 1,
		field: 2,
		record: 3,
		stream: 4
	};
	STANDARD_FORMAT_ID = {
		file: "WBEF1",
		field: "WBEV1",
		record: "WBER1",
		stream: "WBES1"
	};
	ADVANCED_FORMAT_ID = {
		file: "WBEA1",
		field: "WBEV1"
	};
	AtRestCryptoError = class extends Error {
		constructor(message, code, options) {
			super(message, options);
			this.code = code;
			this.name = new.target.name;
		}
	};
	CryptoUnavailableError = class extends AtRestCryptoError {
		constructor(message, code = "CRYPTO_UNAVAILABLE", options) {
			super(message, code, options);
		}
	};
	KeyPayloadParseError = class extends CryptoUnavailableError {
		constructor(message, code, options) {
			super(message, code, options);
		}
	};
	IntegrityError = class extends AtRestCryptoError {
		constructor(message, options) {
			super(message, "INTEGRITY_ERROR", options);
		}
	};
	UnsupportedCiphertextError = class extends AtRestCryptoError {
		constructor(message, options) {
			super(message, "UNSUPPORTED_CIPHERTEXT", options);
		}
	};
	KeyMismatchError = class extends AtRestCryptoError {
		constructor(declaredKeyId) {
			super(`ciphertext declares a different key id: ${declaredKeyId}`, "KEY_MISMATCH");
			this.declaredKeyId = declaredKeyId;
		}
	};
	PayloadTooLargeError = class extends AtRestCryptoError {
		constructor(message) {
			super(message, "PAYLOAD_TOO_LARGE");
		}
	};
	MIN_ACCEPTED_SUITE = 1;
	SUPPORTED_SUITES = /* @__PURE__ */ new Set([1]);
	ENVELOPE_KEYS = [
		"authTag",
		"ciphertext",
		"keyId",
		"nonce",
		"suite"
	];
	WHOLE_FILE_MAGIC$1 = Buffer.from("WBEF1\n", "ascii");
	ADVANCED_WHOLE_FILE_MAGIC$1 = Buffer.from("WBEA1\n", "ascii");
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/aes-gcm-4L6MEmMw.mjs
var AtRestCrypto;
var init_aes_gcm_4L6MEmMw = require_rolldown_runtime.__esmMin((() => {
	init_key_normalize_2t2Jeyvk();
	AtRestCrypto = class {
		key;
		keyId;
		disposed = false;
		constructor(current, nonceSource = () => (0, node_crypto.randomBytes)(12), scheme = "sym-v1") {
			this.nonceSource = nonceSource;
			this.scheme = scheme;
			if (current.key.byteLength !== 32) throw new CryptoUnavailableError("at-rest key must be exactly 32 bytes");
			const derivedKeyId = deriveAtRestKeyId(current.key);
			if (current.keyId !== derivedKeyId) throw new CryptoUnavailableError("at-rest key id does not match the key bytes");
			this.key = Buffer.from(current.key);
			this.keyId = current.keyId;
		}
		seal(plaintext, context) {
			this.assertUsable();
			const nonce = this.nonceSource();
			if (nonce.length !== 12) throw new CryptoUnavailableError("nonce source must return exactly 12 bytes");
			const cipher = (0, node_crypto.createCipheriv)("aes-256-gcm", this.key, nonce, { authTagLength: 16 });
			cipher.setAAD(buildAuthenticatedContextAad(this.keyId, 1, context, this.scheme));
			const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
			const envelope = {
				suite: 1,
				keyId: this.keyId,
				nonce: nonce.toString("base64"),
				authTag: cipher.getAuthTag().toString("base64"),
				ciphertext: ciphertext.toString("base64")
			};
			const envelopeBytes = Buffer.from(JSON.stringify(envelope), "utf8");
			if (envelopeBytes.length > 67108864) throw new PayloadTooLargeError("whole-file envelope exceeds this reader limit");
			return envelopeBytes;
		}
		open(envelope, context) {
			this.assertUsable();
			if (envelope.keyId !== this.keyId) throw new KeyMismatchError(envelope.keyId);
			try {
				const decipher = (0, node_crypto.createDecipheriv)("aes-256-gcm", this.key, envelope.nonce, { authTagLength: 16 });
				decipher.setAAD(buildAuthenticatedContextAad(envelope.keyId, envelope.suite, context, this.scheme));
				decipher.setAuthTag(envelope.authTag);
				return Buffer.concat([decipher.update(envelope.ciphertext), decipher.final()]);
			} catch (cause) {
				throw new IntegrityError("ciphertext authentication failed", { cause });
			}
		}
		dispose() {
			this.key.fill(0);
			this.disposed = true;
		}
		assertUsable() {
			if (this.disposed) throw new CryptoUnavailableError("at-rest crypto has been disposed");
		}
	};
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/asymmetric-envelope-DhFQSwLY.mjs
function isObject$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasExactKeys(value, keys) {
	const actual = Object.keys(value).sort();
	const expected = [...keys].sort();
	return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}
function decodeCanonicalBase64(value, field, expectedLength) {
	if (typeof value !== "string") throw new IntegrityError(`${field} must be canonical base64`);
	const decoded = Buffer.from(value, "base64");
	if (decoded.toString("base64") !== value || expectedLength !== void 0 && decoded.length !== expectedLength) {
		decoded.fill(0);
		throw new IntegrityError(`${field} must be canonical base64 with the expected length`);
	}
	return decoded;
}
function validatePublicKey(material) {
	if (material.alg !== "RSA-OAEP-256" || !/^[0-9a-f]{64}$/.test(material.id)) throw new CryptoUnavailableError("developer public key metadata is invalid");
	const der = Buffer.from(material.keyDer);
	if ((0, node_crypto.createHash)("sha256").update(der).digest("hex") !== material.id) throw new CryptoUnavailableError("developer public key id does not match key material");
	try {
		const key = (0, node_crypto.createPublicKey)({
			key: der,
			format: "der",
			type: "spki"
		});
		if (key.asymmetricKeyType !== "rsa" || key.asymmetricKeyDetails?.modulusLength !== 3072) throw new Error("not RSA-3072");
		return key;
	} catch (cause) {
		throw new CryptoUnavailableError("developer public key must be RSA-3072 SPKI DER", "DEVELOPER_PUBLIC_KEY_INVALID", { cause });
	}
}
function serializePayloadEnvelope(envelope) {
	return JSON.parse(envelope.toString("utf8"));
}
function sealUserWrap(fileKey, userKey, aad) {
	validateUserKey(userKey);
	const nonce = (0, node_crypto.randomBytes)(12);
	const cipher = (0, node_crypto.createCipheriv)("aes-256-gcm", userKey.key, nonce, { authTagLength: 16 });
	cipher.setAAD(aad);
	const ciphertext = Buffer.concat([cipher.update(fileKey), cipher.final()]);
	return {
		suite: 1,
		keyId: userKey.keyId,
		nonce: nonce.toString("base64"),
		authTag: cipher.getAuthTag().toString("base64"),
		ciphertext: ciphertext.toString("base64")
	};
}
function validateUserKey(userKey) {
	if (userKey.key.byteLength !== 32 || deriveAtRestKeyId(userKey.key) !== userKey.keyId) throw new CryptoUnavailableError("user key is invalid");
}
function openUserWrap(wrap, userKey, aad) {
	if (wrap.keyId !== userKey.keyId) throw new KeyMismatchError(wrap.keyId);
	try {
		const decipher = (0, node_crypto.createDecipheriv)("aes-256-gcm", userKey.key, Buffer.from(wrap.nonce, "base64"), { authTagLength: 16 });
		decipher.setAAD(aad);
		decipher.setAuthTag(Buffer.from(wrap.authTag, "base64"));
		return Buffer.concat([decipher.update(Buffer.from(wrap.ciphertext, "base64")), decipher.final()]);
	} catch (cause) {
		throw new IntegrityError("user key wrap authentication failed", { cause });
	}
}
function parseAsymmetricEnvelope(bytes, context) {
	if (bytes.length > 67108864) throw new UnsupportedCiphertextError("advanced envelope exceeds this reader limit");
	let value;
	try {
		const text = bytes.toString("utf8");
		if (!Buffer.from(text, "utf8").equals(bytes)) throw new Error("invalid UTF-8");
		value = JSON.parse(text);
	} catch (cause) {
		throw new IntegrityError("advanced envelope is not valid UTF-8 JSON", { cause });
	}
	if (!isObject$2(value) || !Number.isInteger(value.suite)) throw new IntegrityError("advanced envelope suite is invalid");
	if (value.suite !== 1) throw new UnsupportedCiphertextError(`unsupported advanced suite ${String(value.suite)}`);
	if (!hasExactKeys(value, context.framing === "field" ? FIELD_KEYS : FILE_KEYS)) throw new IntegrityError("advanced envelope fields do not match the schema");
	if (value.scheme !== "asym-v1" || typeof value.keyId !== "string" || !/^[0-9a-f]{16}$/.test(value.keyId) || value.purpose !== context.purpose || value.resourceId !== context.resourceId || context.framing === "field" && value.fieldPath !== context.fieldPath) throw new IntegrityError("advanced envelope context does not match the requested resource");
	if (!isObject$2(value.userWrap) || !hasExactKeys(value.userWrap, USER_WRAP_KEYS) || value.userWrap.suite !== 1 || typeof value.userWrap.keyId !== "string" || !/^[0-9a-f]{16}$/.test(value.userWrap.keyId)) throw new IntegrityError("user wrap fields do not match the schema");
	if (!isObject$2(value.developerWrap) || !hasExactKeys(value.developerWrap, DEVELOPER_WRAP_KEYS) || value.developerWrap.alg !== "RSA-OAEP-256" || typeof value.developerWrap.publicKeyId !== "string" || !/^[0-9a-f]{64}$/.test(value.developerWrap.publicKeyId)) throw new IntegrityError("developer wrap fields do not match the schema");
	decodeCanonicalBase64(value.userWrap.nonce, "userWrap.nonce", 12).fill(0);
	decodeCanonicalBase64(value.userWrap.authTag, "userWrap.authTag", 16).fill(0);
	decodeCanonicalBase64(value.userWrap.ciphertext, "userWrap.ciphertext", 32).fill(0);
	decodeCanonicalBase64(value.developerWrap.ciphertext, "developerWrap.ciphertext", 384).fill(0);
	decodeCanonicalBase64(value.nonce, "nonce", 12).fill(0);
	decodeCanonicalBase64(value.authTag, "authTag", 16).fill(0);
	decodeCanonicalBase64(value.ciphertext, "ciphertext").fill(0);
	return value;
}
function openPayload(envelope, context, fileKey) {
	if (deriveAtRestKeyId(fileKey) !== envelope.keyId) {
		fileKey.fill(0);
		throw new IntegrityError("unwrapped file key does not match the envelope key id");
	}
	const crypto = new AtRestCrypto({
		keyId: envelope.keyId,
		key: fileKey
	}, () => (0, node_crypto.randomBytes)(12), "asym-v1");
	try {
		return crypto.open({
			suite: envelope.suite,
			keyId: envelope.keyId,
			nonce: Buffer.from(envelope.nonce, "base64"),
			authTag: Buffer.from(envelope.authTag, "base64"),
			ciphertext: Buffer.from(envelope.ciphertext, "base64")
		}, context);
	} finally {
		crypto.dispose();
		fileKey.fill(0);
	}
}
function sealAsymmetricEnvelope(plaintext, context, material) {
	const publicKey = validatePublicKey(material.developerPublicKey);
	const fileKey = (0, node_crypto.randomBytes)(32);
	const fileKeyId = deriveAtRestKeyId(fileKey);
	const wrapContext = buildFileKeyWrapContext({
		suite: 1,
		fileKeyId,
		developerPublicKeyId: material.developerPublicKey.id,
		context
	});
	const payloadCrypto = new AtRestCrypto({
		keyId: fileKeyId,
		key: fileKey
	}, () => (0, node_crypto.randomBytes)(12), "asym-v1");
	try {
		const payload = serializePayloadEnvelope(payloadCrypto.seal(plaintext, context));
		const userWrap = sealUserWrap(fileKey, material.userKey, wrapContext);
		const developerCiphertext = (0, node_crypto.publicEncrypt)({
			key: publicKey,
			padding: node_crypto.constants.RSA_PKCS1_OAEP_PADDING,
			oaepHash: "sha256",
			oaepLabel: (0, node_crypto.createHash)("sha256").update(wrapContext).digest()
		}, fileKey);
		const envelope = {
			suite: payload.suite,
			scheme: "asym-v1",
			keyId: fileKeyId,
			purpose: context.purpose,
			resourceId: context.resourceId,
			...context.framing === "field" ? { fieldPath: context.fieldPath } : {},
			userWrap,
			developerWrap: {
				alg: "RSA-OAEP-256",
				publicKeyId: material.developerPublicKey.id,
				ciphertext: developerCiphertext.toString("base64")
			},
			nonce: payload.nonce,
			authTag: payload.authTag,
			ciphertext: payload.ciphertext
		};
		const bytes = Buffer.from(JSON.stringify(envelope), "utf8");
		if (bytes.length > 67108864) throw new PayloadTooLargeError("advanced envelope exceeds this reader limit");
		return bytes;
	} finally {
		payloadCrypto.dispose();
		fileKey.fill(0);
	}
}
function openAsymmetricEnvelope(bytes, context, material) {
	const envelope = parseAsymmetricEnvelope(bytes, context);
	validateUserKey(material.userKey);
	validatePublicKey(material.developerPublicKey);
	if (envelope.developerWrap.publicKeyId !== material.developerPublicKey.id) throw new KeyMismatchError(envelope.developerWrap.publicKeyId);
	const wrapContext = buildFileKeyWrapContext({
		suite: envelope.suite,
		fileKeyId: envelope.keyId,
		developerPublicKeyId: envelope.developerWrap.publicKeyId,
		context
	});
	return openPayload(envelope, context, openUserWrap(envelope.userWrap, material.userKey, wrapContext));
}
var FILE_KEYS, FIELD_KEYS, USER_WRAP_KEYS, DEVELOPER_WRAP_KEYS;
var init_asymmetric_envelope_DhFQSwLY = require_rolldown_runtime.__esmMin((() => {
	init_key_normalize_2t2Jeyvk();
	init_aes_gcm_4L6MEmMw();
	FILE_KEYS = [
		"authTag",
		"ciphertext",
		"developerWrap",
		"keyId",
		"nonce",
		"purpose",
		"resourceId",
		"scheme",
		"suite",
		"userWrap"
	];
	FIELD_KEYS = [...FILE_KEYS, "fieldPath"].sort();
	USER_WRAP_KEYS = [
		"authTag",
		"ciphertext",
		"keyId",
		"nonce",
		"suite"
	];
	DEVELOPER_WRAP_KEYS = [
		"alg",
		"ciphertext",
		"publicKeyId"
	];
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/file-permissions-Burk2rhy.mjs
async function fsyncDirectory(directoryPath) {
	if (process.platform === "win32") return;
	const handle = await (0, node_fs_promises.open)(directoryPath, "r");
	try {
		await handle.sync();
	} finally {
		await handle.close();
	}
}
var init_file_permissions_Burk2rhy = require_rolldown_runtime.__esmMin((() => {}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/failure-registry-HWe3iSX2.mjs
function isMissing(error) {
	return error.code === "ENOENT";
}
function isValidResourceId(resourceId) {
	if (!RESOURCE_ID_PATTERN.test(resourceId) || node_path$1.default.posix.isAbsolute(resourceId)) return false;
	return resourceId.split("/").every((segment) => segment !== "" && segment !== "." && segment !== "..");
}
function isFailureEntry(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const entry = value;
	const keys = Object.keys(value).sort();
	return keys.length === ENTRY_KEYS.length && keys.every((key, index) => key === ENTRY_KEYS[index]) && typeof entry.resourceId === "string" && isValidResourceId(entry.resourceId) && typeof entry.adapter === "string" && /^[A-Za-z0-9._:-]{1,64}$/.test(entry.adapter) && OPERATIONS.has(entry.operation) && FAILURE_CATEGORIES$1.has(entry.category) && PROCESS_ROLES.has(entry.processRole) && Number.isFinite(entry.firstFailureAt) && Number.isFinite(entry.lastFailureAt) && Number.isSafeInteger(entry.attemptCount) && Number.isFinite(entry.nextRetryAt) && entry.attemptCount > 0 && entry.firstFailureAt >= 0 && entry.lastFailureAt >= entry.firstFailureAt && entry.nextRetryAt >= entry.lastFailureAt;
}
function isRecoveryEntry(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const entry = value;
	const keys = Object.keys(value).sort();
	return keys.length === RECOVERY_KEYS.length && keys.every((key, index) => key === RECOVERY_KEYS[index]) && typeof entry.resourceId === "string" && isValidResourceId(entry.resourceId) && typeof entry.adapter === "string" && /^[A-Za-z0-9._:-]{1,64}$/.test(entry.adapter) && OPERATIONS.has(entry.operation) && Number.isFinite(entry.recoveredAt) && entry.recoveredAt >= 0;
}
var WHOLE_FILE_MAGIC, ADVANCED_WHOLE_FILE_MAGIC, ProtectedWholeFileCodec, BASE_RETRY_MS, MAX_RETRY_MS, RESOURCE_ID_PATTERN, ENTRY_KEYS, OPERATIONS, PROCESS_ROLES, FAILURE_CATEGORIES$1, RECOVERY_KEYS, AtRestFailureRegistry;
var init_failure_registry_HWe3iSX2 = require_rolldown_runtime.__esmMin((() => {
	init_key_normalize_2t2Jeyvk();
	init_aes_gcm_4L6MEmMw();
	init_asymmetric_envelope_DhFQSwLY();
	init_file_permissions_Burk2rhy();
	WHOLE_FILE_MAGIC = Buffer.from("WBEF1\n", "ascii");
	ADVANCED_WHOLE_FILE_MAGIC = Buffer.from("WBEA1\n", "ascii");
	ProtectedWholeFileCodec = class {
		asymmetricKeyMaterial;
		crypto;
		mode;
		protection;
		constructor(options) {
			this.mode = options.mode;
			this.crypto = options.key ? new AtRestCrypto(options.key) : void 0;
			this.protection = options.protection ?? "standard";
			this.asymmetricKeyMaterial = options.asymmetricKeyMaterial;
		}
		decode(bytes, context) {
			const source = classifyWholeFileBytes(bytes);
			if (source === "legacy") return {
				plaintext: Buffer.from(bytes),
				source,
				needsRewrite: this.mode === "required"
			};
			if (source === "WBEA1") return {
				plaintext: openAsymmetricEnvelope(bytes.subarray(ADVANCED_WHOLE_FILE_MAGIC.length), this.requireAdvancedContext(context), this.requireAsymmetricKeyMaterial()),
				source,
				needsRewrite: false
			};
			const envelope = parseSupportedEnvelope(bytes.subarray(WHOLE_FILE_MAGIC.length));
			return {
				plaintext: this.requireCrypto().open(envelope, { framing: "file" }),
				source,
				needsRewrite: this.protection === "advanced"
			};
		}
		encode(plaintext, context) {
			if (this.mode === "disabled") return Buffer.from(plaintext);
			if (this.protection === "advanced") return Buffer.concat([ADVANCED_WHOLE_FILE_MAGIC, sealAsymmetricEnvelope(plaintext, this.requireAdvancedContext(context), this.requireAsymmetricKeyMaterial())]);
			return Buffer.concat([WHOLE_FILE_MAGIC, this.requireCrypto().seal(plaintext, { framing: "file" })]);
		}
		dispose() {
			this.crypto?.dispose();
		}
		requireCrypto() {
			if (!this.crypto) throw new CryptoUnavailableError("at-rest key is not ready");
			return this.crypto;
		}
		requireAsymmetricKeyMaterial() {
			if (!this.asymmetricKeyMaterial) throw new CryptoUnavailableError("advanced at-rest key material is not ready");
			return this.asymmetricKeyMaterial;
		}
		requireAdvancedContext(context) {
			if (!context) throw new CryptoUnavailableError("advanced whole-file protection requires a context");
			return {
				framing: "file",
				...context
			};
		}
	};
	BASE_RETRY_MS = 6e4;
	MAX_RETRY_MS = 864e5;
	RESOURCE_ID_PATTERN = /^[A-Za-z0-9._/@:-]{1,256}$/;
	ENTRY_KEYS = [
		"adapter",
		"attemptCount",
		"category",
		"firstFailureAt",
		"lastFailureAt",
		"nextRetryAt",
		"operation",
		"processRole",
		"resourceId"
	];
	OPERATIONS = /* @__PURE__ */ new Set([
		"read",
		"write",
		"migrate",
		"bootstrap"
	]);
	PROCESS_ROLES = /* @__PURE__ */ new Set([
		"main",
		"daemon",
		"cbc",
		"sidecar",
		"prewarm"
	]);
	FAILURE_CATEGORIES$1 = /* @__PURE__ */ new Set([
		"missing-key",
		"invalid-key",
		"safe-storage",
		"transport",
		"timeout",
		"mode-mismatch",
		"integrity",
		"unsupported",
		"lock",
		"io",
		"unknown"
	]);
	RECOVERY_KEYS = [
		"adapter",
		"operation",
		"recoveredAt",
		"resourceId"
	];
	AtRestFailureRegistry = class {
		filePath;
		configDir;
		logger;
		now;
		processRole;
		withFileLock;
		operationTail = Promise.resolve();
		constructor(options) {
			this.configDir = node_path$1.default.resolve(options.configDir);
			this.filePath = node_path$1.default.join(this.configDir, "security", "at-rest-failures-v1.json");
			this.processRole = options.processRole;
			this.withFileLock = options.withFileLock;
			this.logger = options.logger;
			this.now = options.now ?? (() => node_perf_hooks.performance.timeOrigin + node_perf_hooks.performance.now());
		}
		record(input) {
			const observedAt = this.now();
			return this.enqueue(() => this.recordNow(input, observedAt));
		}
		clear(selector) {
			const observedAt = this.now();
			return this.enqueue(() => this.clearNow(selector, observedAt, true));
		}
		clearOrdered(selector) {
			const observedAt = this.now();
			return this.enqueue(() => this.clearNow(selector, observedAt, false));
		}
		shouldRetry(selector, now = this.now()) {
			return this.enqueue(() => this.shouldRetryNow(selector, now));
		}
		shouldRetrySync(selector, now = this.now()) {
			if (!this.validateSelector(selector)) return true;
			try {
				const entry = this.parseRegistry((0, node_fs.readFileSync)(this.filePath)).entries.find((candidate) => candidate.resourceId === selector.resourceId && candidate.adapter === selector.adapter && candidate.operation === selector.operation);
				return entry === void 0 || entry.nextRetryAt <= now;
			} catch {
				return true;
			}
		}
		hasFailureSync(selector) {
			if (!this.validateSelector(selector)) return false;
			try {
				return this.parseRegistry((0, node_fs.readFileSync)(this.filePath)).entries.some((entry) => entry.resourceId === selector.resourceId && entry.adapter === selector.adapter && entry.operation === selector.operation);
			} catch {
				return false;
			}
		}
		async recordNow(input, observedAt) {
			if (!this.validateInput(input)) return;
			this.safeWarn(`[AtRestEncryption] unavailable adapter=${input.adapter} resource=${input.resourceId} operation=${input.operation} category=${input.category} role=${this.processRole}`);
			try {
				await this.withFileLock(this.filePath, async () => {
					const registry = await this.readRegistry();
					if (registry.recoveries.some((recovery) => recovery.resourceId === input.resourceId && recovery.adapter === input.adapter && recovery.operation === input.operation && recovery.recoveredAt >= observedAt)) return;
					const now = observedAt;
					const current = registry.entries.find((entry) => entry.resourceId === input.resourceId && entry.adapter === input.adapter && entry.operation === input.operation);
					if (current) {
						if (current.lastFailureAt > observedAt) return;
						current.category = input.category;
						current.processRole = this.processRole;
						current.lastFailureAt = now;
						current.attemptCount += 1;
						current.nextRetryAt = now + this.retryDelay(current.attemptCount);
					} else registry.entries.push({
						...input,
						processRole: this.processRole,
						firstFailureAt: now,
						lastFailureAt: now,
						attemptCount: 1,
						nextRetryAt: now + this.retryDelay(1)
					});
					await this.writeRegistry(registry);
				});
			} catch {
				this.safeWarn("[AtRestEncryption] failure-registry operation=record category=io");
			}
		}
		async clearNow(selector, observedAt, persistRecovery) {
			if (!this.validateSelector(selector)) {
				this.safeWarn("[AtRestEncryption] failure-registry operation=clear category=invalid-resource");
				return;
			}
			try {
				let cleared = false;
				await this.withFileLock(this.filePath, async () => {
					const registry = await this.readRegistry();
					const retained = registry.entries.filter((entry) => {
						const matches = entry.resourceId === selector.resourceId && entry.adapter === selector.adapter && entry.operation === selector.operation && entry.lastFailureAt <= observedAt;
						cleared ||= matches;
						return !matches;
					});
					if (!persistRecovery) {
						const recoveries = registry.recoveries.filter((entry) => entry.resourceId !== selector.resourceId || entry.adapter !== selector.adapter || entry.operation !== selector.operation);
						if (!cleared && recoveries.length === registry.recoveries.length) return;
						await this.writeRegistry({
							version: 1,
							entries: retained,
							recoveries
						});
						return;
					}
					const recovery = registry.recoveries.find((entry) => entry.resourceId === selector.resourceId && entry.adapter === selector.adapter && entry.operation === selector.operation);
					if (recovery) recovery.recoveredAt = Math.max(recovery.recoveredAt, observedAt);
					else registry.recoveries.push({
						...selector,
						recoveredAt: observedAt
					});
					await this.writeRegistry({
						version: 1,
						entries: retained,
						recoveries: registry.recoveries
					});
				});
				if (cleared) this.safeInfo(`[AtRestEncryption] recovered adapter=${selector.adapter} resource=${selector.resourceId} operation=${selector.operation}`);
			} catch (error) {
				if (!isMissing(error)) this.safeWarn("[AtRestEncryption] failure-registry operation=clear category=io");
			}
		}
		async shouldRetryNow(selector, now) {
			if (!this.validateSelector(selector)) return true;
			try {
				return await this.withFileLock(this.filePath, async () => {
					const entry = (await this.readRegistry()).entries.find((candidate) => candidate.resourceId === selector.resourceId && candidate.adapter === selector.adapter && candidate.operation === selector.operation);
					return entry === void 0 || entry.nextRetryAt <= now;
				});
			} catch {
				return true;
			}
		}
		enqueue(operation) {
			const result = this.operationTail.then(operation, operation);
			this.operationTail = result.then(() => void 0, () => void 0);
			return result;
		}
		async readRegistry() {
			let bytes;
			try {
				bytes = await (0, node_fs_promises.readFile)(this.filePath);
			} catch (error) {
				if (isMissing(error)) return {
					version: 1,
					entries: [],
					recoveries: []
				};
				throw error;
			}
			return this.parseRegistry(bytes);
		}
		parseRegistry(bytes) {
			let value;
			try {
				value = JSON.parse(bytes.toString("utf8"));
			} catch {
				throw new Error("invalid at-rest failure registry");
			}
			if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("invalid at-rest failure registry");
			const registry = value;
			if (registry.version !== 1 || !Array.isArray(registry.entries) || !registry.entries.every(isFailureEntry) || registry.recoveries !== void 0 && (!Array.isArray(registry.recoveries) || !registry.recoveries.every(isRecoveryEntry))) throw new Error("invalid at-rest failure registry");
			return {
				version: 1,
				entries: registry.entries,
				recoveries: registry.recoveries ?? []
			};
		}
		async writeRegistry(registry) {
			const directory = node_path$1.default.dirname(this.filePath);
			await (0, node_fs_promises.mkdir)(directory, {
				recursive: true,
				mode: 448
			});
			if (process.platform !== "win32") await (0, node_fs_promises.chmod)(directory, 448);
			const tempPath = `${this.filePath}.${process.pid}.${(0, node_crypto.randomBytes)(16).toString("hex")}.tmp`;
			let renamed = false;
			try {
				const handle = await (0, node_fs_promises.open)(tempPath, "wx", 384);
				try {
					await handle.writeFile(`${JSON.stringify(registry, void 0, 2)}\n`, "utf8");
					await handle.sync();
				} finally {
					await handle.close();
				}
				await (0, node_fs_promises.rename)(tempPath, this.filePath);
				renamed = true;
				await fsyncDirectory(directory);
			} finally {
				if (!renamed) await (0, node_fs_promises.rm)(tempPath, { force: true });
			}
		}
		retryDelay(attemptCount) {
			return Math.min(MAX_RETRY_MS, BASE_RETRY_MS * 2 ** Math.min(10, attemptCount - 1));
		}
		validateInput(input) {
			if (!this.validateSelector(input)) {
				this.safeWarn("[AtRestEncryption] failure-registry operation=record category=invalid-resource");
				return false;
			}
			return true;
		}
		validateSelector(selector) {
			return isValidResourceId(selector.resourceId) && /^[A-Za-z0-9._:-]{1,64}$/.test(selector.adapter) && OPERATIONS.has(selector.operation);
		}
		safeWarn(message) {
			try {
				this.logger.warn(message);
			} catch {}
		}
		safeInfo(message) {
			try {
				this.logger.info?.(message);
			} catch {}
		}
	};
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/index.mjs
function isAtRestEncryptionPolicy(value) {
	return AT_REST_ENCRYPTION_POLICIES.includes(value);
}
/** 阶梯比较：策略是否达到指定最低等级（供迁移行为等非-scope 门槛使用）。 */
function atRestPolicyAtLeast(policy, minimum) {
	return POLICY_RANK[policy] >= POLICY_RANK[minimum];
}
function resolveAtRestEncryptionMode(policy, scope) {
	const minimum = SCOPE_MINIMUM_POLICY[scope];
	if (minimum === void 0) return "disabled";
	return POLICY_RANK[policy] >= POLICY_RANK[minimum] ? "required" : "disabled";
}
function keyblobPathFor(configDir) {
	return node_path$1.default.join(configDir, KEYBLOB_FILE_NAME);
}
function unavailable(category) {
	return {
		status: "unavailable",
		category
	};
}
function isObject$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseKeyblob(bytes) {
	if (bytes.length === 0 || bytes.length > KEYBLOB_MAX_BYTES) return;
	let value;
	try {
		value = JSON.parse(bytes.toString("utf8"));
	} catch {
		return;
	}
	if (!isObject$1(value) || value.version !== 1 || typeof value.keyId !== "string" || !Array.isArray(value.slots) || !value.slots.every((slot) => isObject$1(slot) && typeof slot.type === "string")) return;
	return value;
}
function serializeKeyblob(masterKey, protector) {
	const crypto = new AtRestCrypto(protector);
	try {
		const wrapped = crypto.seal(masterKey, KEYBLOB_SLOT_CONTEXT);
		const wire = {
			version: 1,
			keyId: deriveAtRestKeyId(masterKey),
			slots: [{
				type: KEYBLOB_SLOT_STATIC_V1,
				protectorKeyId: protector.keyId,
				wrapped: wrapped.toString("base64")
			}]
		};
		return Buffer.from(JSON.stringify(wire), "utf8");
	} finally {
		crypto.dispose();
	}
}
function unwrapStaticV1Slot(slot, declaredKeyId, protector) {
	if (typeof slot.wrapped !== "string") return;
	if (slot.protectorKeyId !== void 0 && slot.protectorKeyId !== protector.keyId) return;
	const crypto = new AtRestCrypto(protector);
	try {
		const envelope = parseSupportedEnvelope(Buffer.from(slot.wrapped, "base64"));
		const masterKey = crypto.open(envelope, KEYBLOB_SLOT_CONTEXT);
		if (masterKey.length !== MASTER_KEY_BYTES || deriveAtRestKeyId(masterKey) !== declaredKeyId) {
			masterKey.fill(0);
			return;
		}
		return {
			keyId: declaredKeyId,
			key: masterKey
		};
	} catch {
		return;
	} finally {
		crypto.dispose();
	}
}
function unwrapKeyblob(wire, protector) {
	for (const slot of wire.slots) {
		if (slot.type !== KEYBLOB_SLOT_STATIC_V1) continue;
		const masterKey = unwrapStaticV1Slot(slot, wire.keyId, protector);
		if (masterKey) return {
			status: "available",
			value: masterKey
		};
	}
	return unavailable("missing-key");
}
/**
* 以 link(2) 的 EEXIST 语义原子创建 keyblob：先写 owner-only 临时文件，
* 再硬链接到目标路径——目标已存在则失败，绝不覆盖并发赢家的内容。
*
* 同步实现：keyblob 加载处于 Electron 主进程 whenReady 前的同步关键路径
* （privileged scheme 注册之前），不能引入 await 让事件循环让出。
*/
function createKeyblobExclusive(keyblobPath, bytes) {
	const tmpPath = `${keyblobPath}.${process.pid}.${(0, node_crypto.randomBytes)(8).toString("hex")}.tmp`;
	const fd = (0, node_fs.openSync)(tmpPath, "wx", 384);
	try {
		(0, node_fs.writeSync)(fd, bytes);
		(0, node_fs.fsyncSync)(fd);
	} finally {
		(0, node_fs.closeSync)(fd);
	}
	try {
		(0, node_fs.linkSync)(tmpPath, keyblobPath);
		return true;
	} catch (error) {
		if (error.code === "EEXIST") return false;
		throw error;
	} finally {
		try {
			(0, node_fs.unlinkSync)(tmpPath);
		} catch {}
	}
}
/**
* 读取（并在缺失时惰性创建）keyblob，解封主密钥。同步实现（见 createKeyblobExclusive）。
*
* 失败语义：
* - 文件缺失且不允许创建 → missing-key
* - 文件存在但无法解析 → invalid-key（保留原文件，不重建）
* - 无任何可解封槽 → missing-key（保留原文件，不重建）
* 返回的主密钥副本由调用方负责用后清零。
*/
function loadOrCreateKeyblobMasterKey(options) {
	const { keyblobPath, protectorKey } = options;
	const createIfMissing = options.createIfMissing !== false;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		let bytes;
		try {
			bytes = (0, node_fs.readFileSync)(keyblobPath);
		} catch (error) {
			if (error.code !== "ENOENT") return unavailable("io");
		}
		if (bytes !== void 0) {
			const wire = parseKeyblob(bytes);
			if (!wire) return unavailable("invalid-key");
			return unwrapKeyblob(wire, protectorKey);
		}
		if (!createIfMissing) return unavailable("missing-key");
		const masterKey = (0, node_crypto.randomBytes)(MASTER_KEY_BYTES);
		try {
			if (createKeyblobExclusive(keyblobPath, serializeKeyblob(masterKey, protectorKey))) return {
				status: "available",
				value: {
					keyId: deriveAtRestKeyId(masterKey),
					key: masterKey
				}
			};
		} catch {
			masterKey.fill(0);
			return unavailable("io");
		}
		masterKey.fill(0);
	}
	return unavailable("io");
}
function invalid(message) {
	throw new KeyPayloadParseError(message, "AT_REST_BOOTSTRAP_INVALID");
}
function isObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function assertOnlyKeys(value, allowed) {
	const actual = Object.keys(value).sort();
	const expected = [...allowed].sort();
	if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) invalid("at-rest encryption bootstrap contains unsupported fields");
}
function decodeCanonicalKey(value, label) {
	if (typeof value !== "string" || value.length !== 44) return invalid(`${label} must be canonical base64 for 32 bytes`);
	const key = Buffer.from(value, "base64");
	if (key.length !== 32 || key.toString("base64") !== value) {
		key.fill(0);
		return invalid(`${label} must be canonical base64 for 32 bytes`);
	}
	return key;
}
function validatePolicy(value) {
	if (!isAtRestEncryptionPolicy(value)) return invalid("at-rest encryption policy must be one of off, fields, files");
	return value;
}
function isFailureCategory(value) {
	return typeof value === "string" && FAILURE_CATEGORIES.has(value);
}
function encodeKey(key, label) {
	const bytes = Buffer.from(key.key);
	try {
		if (bytes.length !== 32) return invalid(`${label} must be exactly 32 bytes`);
		const keyId = deriveAtRestKeyId(bytes);
		if (key.keyId !== keyId) return invalid(`${label} keyId does not match key material`);
		return {
			keyId,
			keyBase64: bytes.toString("base64")
		};
	} finally {
		bytes.fill(0);
	}
}
function decodeKey(value, label) {
	if (!isObject(value)) return invalid(`${label} is missing`);
	assertOnlyKeys(value, ["keyId", "keyBase64"]);
	if (typeof value.keyId !== "string") return invalid(`${label} keyId must be a string`);
	const key = decodeCanonicalKey(value.keyBase64, label);
	const keyId = deriveAtRestKeyId(key);
	if (value.keyId !== keyId) {
		key.fill(0);
		return invalid("at-rest encryption keyId does not match key material");
	}
	return {
		keyId,
		key
	};
}
function encodeDeveloperPublicKey(key) {
	const normalized = normalizeAtRestDeveloperPublicKey({
		alg: key.alg,
		id: key.id,
		key: Buffer.from(key.keyDer).toString("base64")
	});
	return {
		alg: normalized.alg,
		id: normalized.id,
		keyDerBase64: Buffer.from(normalized.keyDer).toString("base64")
	};
}
function decodeDeveloperPublicKey(value) {
	if (!isObject(value)) return invalid("developer public key is missing");
	assertOnlyKeys(value, [
		"alg",
		"id",
		"keyDerBase64"
	]);
	return normalizeAtRestDeveloperPublicKey({
		alg: value.alg,
		id: value.id,
		key: value.keyDerBase64
	});
}
function encodeAtRestEncryptionBootstrap(bootstrap) {
	const symmetric = bootstrap.symmetricKey ? { symmetricKey: encodeKey(bootstrap.symmetricKey, "symmetric key") } : { symmetricUnavailable: bootstrap.symmetricUnavailable };
	const asymmetric = bootstrap.userKey && bootstrap.developerPublicKey ? {
		userKey: encodeKey(bootstrap.userKey, "user key"),
		developerPublicKey: encodeDeveloperPublicKey(bootstrap.developerPublicKey)
	} : { asymmetricUnavailable: bootstrap.asymmetricUnavailable };
	return {
		version: 1,
		policy: bootstrap.policy,
		...symmetric,
		...asymmetric
	};
}
function decodeAtRestEncryptionBootstrap(value) {
	if (!isObject(value) || value.version !== 1) return invalid("at-rest encryption bootstrap version must be 1");
	const policy = validatePolicy(value.policy);
	if (policy === "off" && Object.keys(value).length === 2) {
		assertOnlyKeys(value, ["version", "policy"]);
		return {
			policy,
			symmetricUnavailable: "missing-key",
			asymmetricUnavailable: "missing-key"
		};
	}
	const hasSymmetricKey = isObject(value.symmetricKey);
	const hasSymmetricUnavailable = isFailureCategory(value.symmetricUnavailable);
	const hasUserKey = isObject(value.userKey);
	const hasDeveloperPublicKey = isObject(value.developerPublicKey);
	const hasAsymmetricUnavailable = isFailureCategory(value.asymmetricUnavailable);
	if (hasSymmetricKey === hasSymmetricUnavailable) return invalid("at-rest encryption bootstrap must describe both capabilities");
	if (hasUserKey !== hasDeveloperPublicKey || hasAsymmetricUnavailable === hasUserKey) return invalid("required at-rest encryption asymmetric capability is invalid");
	const allowedKeys = ["version", "policy"];
	allowedKeys.push(hasSymmetricKey ? "symmetricKey" : "symmetricUnavailable");
	if (hasUserKey) allowedKeys.push("userKey", "developerPublicKey");
	else allowedKeys.push("asymmetricUnavailable");
	assertOnlyKeys(value, allowedKeys);
	const symmetricKey = hasSymmetricKey ? decodeKey(value.symmetricKey, "symmetric key") : void 0;
	let userKey;
	try {
		userKey = hasUserKey ? decodeKey(value.userKey, "user key") : void 0;
		return {
			policy,
			...symmetricKey ? { symmetricKey } : { symmetricUnavailable: value.symmetricUnavailable },
			...userKey ? {
				userKey,
				developerPublicKey: decodeDeveloperPublicKey(value.developerPublicKey)
			} : { asymmetricUnavailable: value.asymmetricUnavailable }
		};
	} catch (error) {
		symmetricKey?.key.fill(0);
		userKey?.key.fill(0);
		throw error;
	}
}
function createUnavailableAtRestEncryptionBootstrap(policy, category) {
	return {
		policy,
		symmetricUnavailable: category,
		asymmetricUnavailable: category
	};
}
function getAtRestAsymmetricKeyMaterial(bootstrap) {
	if (!bootstrap.userKey || !bootstrap.developerPublicKey) return;
	return {
		userKey: bootstrap.userKey,
		developerPublicKey: bootstrap.developerPublicKey
	};
}
function disposeAtRestEncryptionBootstrap(bootstrap) {
	bootstrap.symmetricKey?.key.fill(0);
	bootstrap.userKey?.key.fill(0);
}
var AT_REST_ENCRYPTION_POLICIES, POLICY_RANK, SCOPE_MINIMUM_POLICY, KEYBLOB_FILE_NAME, KEYBLOB_SLOT_STATIC_V1, MASTER_KEY_BYTES, KEYBLOB_MAX_BYTES, KEYBLOB_SLOT_CONTEXT, FAILURE_CATEGORIES;
var init_dist = require_rolldown_runtime.__esmMin((() => {
	init_key_normalize_2t2Jeyvk();
	init_aes_gcm_4L6MEmMw();
	init_failure_registry_HWe3iSX2();
	AT_REST_ENCRYPTION_POLICIES = [
		"off",
		"fields",
		"files"
	];
	POLICY_RANK = {
		off: 0,
		fields: 1,
		files: 2
	};
	SCOPE_MINIMUM_POLICY = {
		field: "fields",
		file: "files",
		record: void 0,
		stream: void 0
	};
	KEYBLOB_FILE_NAME = "keyblob";
	KEYBLOB_SLOT_STATIC_V1 = "static-v1";
	MASTER_KEY_BYTES = 32;
	KEYBLOB_MAX_BYTES = 65536;
	KEYBLOB_SLOT_CONTEXT = { framing: "file" };
	FAILURE_CATEGORIES = /* @__PURE__ */ new Set([
		"missing-key",
		"invalid-key",
		"safe-storage",
		"transport",
		"timeout",
		"mode-mismatch",
		"integrity",
		"unsupported",
		"lock",
		"io",
		"unknown"
	]);
}));
//#endregion
//#region ../../packages/workbuddy-server/src/net/system-ca-fallback.ts
/**
* macOS 系统 CA 证书 fallback 读取。
*
* ## 背景
*
* macOS 26.x Apple Silicon 上 Node.js 原生 `tls.getCACertificates('system')` 触发
* `node::crypto::ReadMacOSKeychainCertificates` 中的 SIGSEGV（#62883），且 try/catch
* 兜不住（信号级崩溃）。当 `WORKBUDDY_DISABLE_SYSTEM_CA=1` 时该 API 被完全跳过。
*
* 但用户在系统钥匙串中安装了 MITM 代理（Charles/Fiddler）的根 CA 证书后，
* WorkBuddy 的 HTTPS 请求因缺少对该 CA 的信任而失败。
*
* ## 方案
*
* 用 macOS `security` 命令行工具（不触发原生 SIGSEGV）从系统钥匙串导出受信任的
* CA 证书（PEM 格式），作为 `tls.getCACertificates('system')` 的安全替代。
*
* 此方案只覆盖 macOS；Windows/Linux 不受 #62883 影响，直接用原生 API。
*
* ## 性能
*
* `security find-certificate` 命令在本地执行约 200-500ms，结果缓存在进程内存中
* （证书变更需重启生效，与原生 API 行为一致）。仅在首次调用时执行。
*/
var CERT_REGEX$1 = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
/** 缓存已读取的系统 CA，进程生命周期内不变（与原生 API 行为一致）。 */
var cachedSystemCAs;
/**
* 通过 macOS `security` CLI 读取系统钥匙串中的受信任 CA 证书。
*
* 读取范围：
* - `~/Library/Keychains/login.keychain-db` — 用户钥匙串（Whistle/Charles 等工具的 CA 通常在这里）
* - `/Library/Keychains/System.keychain` — 系统级证书（管理员安装的 CA）
* - `/System/Library/Keychains/SystemRootCertificates.keychain` — Apple 预置根证书
*
* @returns PEM 格式证书数组，读取失败返回空数组（不阻塞启动）
*/
function readSystemCAsViaCli() {
	if (cachedSystemCAs !== void 0) return cachedSystemCAs;
	if (process.platform !== "darwin") {
		cachedSystemCAs = [];
		return cachedSystemCAs;
	}
	const certs = [];
	const os$2 = require("os");
	const keychains = [
		require("path").join(os$2.homedir(), "Library", "Keychains", "login.keychain-db"),
		"/Library/Keychains/System.keychain",
		"/System/Library/Keychains/SystemRootCertificates.keychain"
	];
	for (const keychain of keychains) try {
		const matches = (0, child_process.execFileSync)("security", [
			"find-certificate",
			"-a",
			"-p",
			keychain
		], {
			encoding: "utf-8",
			timeout: 5e3,
			maxBuffer: 10485760
		}).match(CERT_REGEX$1);
		if (matches) certs.push(...matches);
	} catch {}
	cachedSystemCAs = [...new Set(certs)];
	return cachedSystemCAs;
}
//#endregion
//#region ../../packages/workbuddy-server/src/sidecar/protocol.ts
/**
* 纪元地址环境变量名：与 sandbox-cli 的 SANDBOX_CENTER_IPC_ADDRESS_ENV 同名
* 常量（此处仅按字面量读取/写回，不引包——sidecar 协议层保持零依赖）。
* sidecar spawn 时经 buildSidecarProcessEnv 从 daemon env 继承，出生时冻结。
*/
var SANDBOX_CENTER_IPC_ADDRESS_ENV = "SANDBOX_CENTER_IPC_ADDRESS";
var DEFAULT_RING_BUFFER_BYTES = 8388608;
var IDLE_TIMEOUT_MS = 18e5;
var RPC_TIMEOUT_MS = 1e4;
var SESSION_LIFECYCLE_RPC_TIMEOUT_MS = 6e4;
/**
* Preserve the historical per-session cold-start budget. Before auto-port
* readiness, `session.create` returned after spawn and the backend waited up
* to 180s for the ACP endpoint. Now that `session.create` waits for the child
* ready ACK, the same budget must live in the sidecar.
*/
var SESSION_ENDPOINT_READY_TIMEOUT_MS = 18e4;
/**
* `session.create` must outlive endpoint readiness long enough for the
* sidecar to serialize the result (or clean up a timed-out child) and deliver
* the JSON-RPC response. Other lifecycle calls retain their 60s budget.
*/
var SESSION_CREATE_RPC_TIMEOUT_MS = 195e3;
var SIDECAR_READY_SOCKET_ENV = "CODEBUDDY_SIDECAR_READY_SOCKET";
var SIDECAR_READY_TOKEN_ENV = "CODEBUDDY_SIDECAR_READY_TOKEN";
var SIDECAR_READY_SESSION_ID_ENV = "CODEBUDDY_SIDECAR_READY_SESSION_ID";
var SIDECAR_CREDENTIAL_BOOTSTRAP_SOCKET_ENV = "CODEBUDDY_SIDECAR_CREDENTIAL_BOOTSTRAP_SOCKET";
/**
* sidecar 优雅退出的等待上限（shutdown ack 后等控制 socket 关闭）。正常收尾
* （杀掉全部会话，每个 2s SIGTERM 宽限）在几秒内完成；超时后调用方按"进程可能
* 仍在收尾"处理，不能拖住 daemon 启动清理 / 应用退出。
*/
var SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS = 1e4;
var WINDOWS_PIPE_PREFIX = "\\\\.\\pipe\\";
var CONTROL_PIPE_KEY = "sidecar-control";
var DATA_PIPE_KEY = "sidecar-data";
/**
* macOS `struct sockaddr_un.sun_path` is 104 bytes (incl. terminating NUL).
* Linux allows 108; using 104 as the conservative upper bound covers both.
*
* A small safety margin is kept because some kernels include the NUL in the
* accounted length and others don't, and tooling (e.g. strace) may add prefix
* bytes in some edge cases.
*/
var SUN_PATH_MAX_BYTES = 104;
var SUN_PATH_SAFETY_MARGIN = 3;
/**
* Path to the user's workbuddy config dir (~/.workbuddy or an override). Used
* both as the stable hash input for the install-scoped instance token and by
* one-shot cleanup of pre-migration sidecar files. Nothing is written here.
*/
function workbuddyConfigDir() {
	return process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy");
}
function instanceToken() {
	return hashToken(workbuddyConfigDir(), 12);
}
function isWritableDir(dir) {
	try {
		if (!fs.statSync(dir).isDirectory()) return false;
		fs.accessSync(dir, fs.constants.W_OK);
		return true;
	} catch {
		return false;
	}
}
/**
* Runtime directory for sockets and the sidecar PID file.
*
* Linux prefers `$XDG_RUNTIME_DIR` → `/run/user/<uid>`; elsewhere (macOS,
* Linux without XDG, Windows) falls back to `os.tmpdir()`. Kept short so
* per-session sockets stay within macOS's 104-byte sun_path limit.
*
* Not memoized: tests mutate the config-dir env between cases, and call
* frequency is low (a handful of lookups per sidecar lifecycle).
*/
function sidecarRuntimeDir() {
	const token = instanceToken();
	const uid = typeof process.getuid === "function" ? process.getuid() : void 0;
	if (process.platform === "linux") {
		const xdg = process.env.XDG_RUNTIME_DIR?.trim();
		if (xdg && isWritableDir(xdg)) return path.join(xdg, "workbuddy", token);
		if (uid !== void 0) {
			const runUser = `/run/user/${uid}`;
			if (isWritableDir(runUser)) return path.join(runUser, "workbuddy", token);
		}
	}
	const base = uid !== void 0 ? `wb-${hashToken(String(uid), 6)}` : "wb";
	return path.join(os.tmpdir().trim(), base, token);
}
/** Create the runtime directory (0700) if missing. Idempotent. */
async function ensureSidecarRuntimeDir() {
	const dir = sidecarRuntimeDir();
	await fs.promises.mkdir(dir, {
		recursive: true,
		mode: 448
	});
	try {
		await fs.promises.chmod(dir, 448);
	} catch {}
	return dir;
}
/**
* 计算 control socket / named pipe 的完整路径。
*
* @param controlPipeUuid 每次 sidecar 启动时生成的随机 id（见
*   `SIDECAR_CONTROL_PIPE_UUID_LENGTH`）。传入时返回带 uuid 后缀的
*   隔离路径，例如 Windows 的 `\\.\pipe\workbuddy-<inst>-sidecar-control-<uuid>`
*   或 POSIX 的 `<runtimeDir>/sidecar-<uuid>.sock`。不传时回退到固定名
*   `sidecar-control` / `sidecar.sock`——**仅供 legacy 清理路径使用**
*   （见 sidecar-manager.cleanupLegacySidecarArtifacts），新版 sidecar 与
*   主进程都必须传 uuid。
*/
function controlSocketPath(controlPipeUuid) {
	const suffix = controlPipeUuid ? `-${controlPipeUuid}` : "";
	if (isNamedPipe()) return buildNamedPipePath(`${CONTROL_PIPE_KEY}${suffix}`);
	return path.join(sidecarRuntimeDir(), `sidecar${suffix}.sock`);
}
/**
* 生成一个 sidecar 控制通道的随机 uuid。长度 = `SIDECAR_CONTROL_PIPE_UUID_LENGTH`
* 个十六进制字符。使用 crypto 随机源，避免可预测。
*/
function generateControlPipeUuid() {
	return (0, crypto.randomBytes)(Math.ceil(4)).toString("hex").slice(0, 8);
}
/**
* 从 POSIX 控制 socket 文件名（`sidecar-<uuid>.sock`）中反解 uuid。
* 匹配失败返回 null（例如碰到固定名 `sidecar.sock` legacy 遗留，或不相关文件）。
*
* Windows 上 control pipe 不是磁盘文件，扫地逻辑不会用到，因此本函数仅在
* POSIX 扫地路径消费。
*/
function matchControlSocketFile(filename) {
	const match = filename.match(/^sidecar-([a-f0-9]+)\.sock$/);
	if (!match) return null;
	return { uuid: match[1] };
}
function dataSocketPath(id) {
	if (isNamedPipe()) return buildNamedPipePath(`${DATA_PIPE_KEY}-${sanitizePipeToken(id)}-${hashToken(id, 8)}`);
	const primary = path.join(sidecarRuntimeDir(), `s-${hashToken(id, 16)}.sock`);
	if (Buffer.byteLength(primary) + SUN_PATH_SAFETY_MARGIN <= SUN_PATH_MAX_BYTES) return primary;
	const uid = typeof process.getuid === "function" ? process.getuid() : void 0;
	const base = uid !== void 0 ? `wb-${hashToken(String(uid), 6)}` : "wb";
	const shortDir = path.join("/tmp", base, instanceToken());
	try {
		fs.mkdirSync(shortDir, {
			recursive: true,
			mode: 448
		});
		try {
			fs.chmodSync(shortDir, 448);
		} catch {}
	} catch {}
	return path.join(shortDir, `s-${hashToken(id, 16)}.sock`);
}
function pidFilePath() {
	return path.join(sidecarRuntimeDir(), "sidecar.pid");
}
/**
* 每个会话子进程一份 `<pid>.json` 的落盘账本目录。sidecar 被 SIGKILL/崩溃时
* 子进程会脱管（内存 session Map 随 sidecar 消失），下一次 sidecar 启动靠
* 这里的账本对账补杀（见 session-journal.ts）。目录随 sidecarRuntimeDir()
* 跨重启确定性可推导。
*/
function sessionJournalDir() {
	return path.join(sidecarRuntimeDir(), "sessions");
}
function isNamedPipe() {
	return process.platform === "win32";
}
function buildNamedPipePath(name) {
	return `${WINDOWS_PIPE_PREFIX}workbuddy-${instanceToken()}-${name}`;
}
function sanitizePipeToken(value) {
	return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "session";
}
function hashToken(value, length) {
	return (0, crypto.createHash)("sha1").update(value).digest("hex").slice(0, length);
}
var JSON_RPC_PARSE_ERROR = -32700;
var JSON_RPC_METHOD_NOT_FOUND = -32601;
var JSON_RPC_INVALID_PARAMS = -32602;
var JSON_RPC_INTERNAL_ERROR = -32603;
var JSON_RPC_SESSION_NOT_FOUND = -32e3;
//#endregion
//#region ../../packages/workbuddy-server/src/net/system-ca-bundle.ts
/**
* 系统信任库私有 CA 兜底：读操作系统证书库里用户/管理员安装的额外 CA
* （企业透明代理 / MITM 抓包工具如 Whistle / Charles / Fiddler 的根证书），
* 生成一份 PEM bundle，供 WorkBuddy spawn 的 Node 子进程通过
* `NODE_EXTRA_CA_CERTS` 信任。
*
* ## 背景
*
* WorkBuddy 的 daemon 子进程与 CLI backend 子进程都是 Node 进程，发起 HTTPS
* 请求时默认只信任 Node 内置的 Mozilla 根证书列表，不读操作系统证书库。企业
* 代理做 TLS 拦截、用自签私有 CA 换证书后，这些子进程会报证书校验失败
* （`UNABLE_TO_VERIFY_LEAF_SIGNATURE` / `SELF_SIGNED_CERT_IN_CHAIN`）。
*
* Chromium 侧走系统信任库、能正常访问，于是出现「浏览器/网络诊断通、但
* daemon/CLI 报证书错」的分裂现象。
*
* ## 方案
*
* 从系统证书库导出证书，滤掉 Node 已内置的根，只把「额外的」私有 CA 写进
* `<configDir>/system-ca-bundle.pem`，再通过 `NODE_EXTRA_CA_CERTS` 注入子进程。
* 这条路只读文件、不调用会崩溃的原生钥匙串 API，因此可安全用于所有平台。
*
* - macOS：复用 `system-ca-fallback.ts` 的 `readSystemCAsViaCli()`（`security
*   find-certificate` 读 login + System + SystemRootCertificates 三个钥匙串，
*   带进程内缓存）——不在本模块重复实现 keychain 读取，避免两套并行逻辑对
*   同一系统证书库读出不一致的结果（#110445 CR：曾各自维护一份且已产生分歧）。
* - Windows：PowerShell 读 `Cert:\LocalMachine` 与 `Cert:\CurrentUser` 下的
*   Root（受信任的根证书颁发机构）与 CA（中间证书颁发机构）store。
* - 其它平台：不处理（Linux 通常已有系统 CA 路径，或用户自行配置）。
*
* ## 生成 vs 检测的分工
*
* 读系统证书库要 spawn 子进程（Windows 上 PowerShell 冷启动可达数百毫秒），
* 不能放在启动关键路径上。因此本模块把「检测已生成的 bundle」（纯文件判断，
* 零开销）与「生成 bundle」（同步/异步两种）分开：
* - 启动关键路径（daemon fork 前）用 {@link getExistingSystemCaBundlePath}。
* - daemon fork 之后用 {@link ensureSystemCaBundleAsync} 异步预热生成。
* - CLI 子进程 env 组装（非关键路径）用同步的 {@link ensureSystemCaBundle}。
*
* ## 触发条件与缓存
*
* 只在「检测到代理」时才生成——无代理即无 MITM 场景。生成结果按 configDir 缓存
* 为文件，存在即复用（证书变更需重启生效，与 `tls.getCACertificates('system')`
* 的进程内缓存行为一致）。
*/
var execFileAsync = (0, util.promisify)(child_process.execFile);
/** 匹配一整块 PEM 证书。 */
var CERT_REGEX = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
/** bundle 文件名，落在渠道包 configDir 下。 */
var SYSTEM_CA_BUNDLE_FILENAME = "system-ca-bundle.pem";
/** 读系统证书库的子进程超时（毫秒）。 */
var READ_TIMEOUT_MS = 5e3;
/** 系统证书库可能有数百张证书，放宽输出缓冲上限。 */
var READ_MAX_BUFFER = 10485760;
/**
* 当前平台读系统信任库要执行的命令列表（Windows 专用；macOS 走
* {@link readSystemCAsViaCli} 而非命令拼装，见下方读取函数）。
* 不支持的平台返回空列表。
*/
function getCertReadCommands() {
	if (process.platform === "win32") return [{
		command: "powershell.exe",
		args: [
			"-NoProfile",
			"-NonInteractive",
			"-ExecutionPolicy",
			"Bypass",
			"-Command",
			[
				"$ErrorActionPreference = \"SilentlyContinue\";",
				"Get-ChildItem -Path",
				"Cert:\\LocalMachine\\Root,",
				"Cert:\\LocalMachine\\CA,",
				"Cert:\\CurrentUser\\Root,",
				"Cert:\\CurrentUser\\CA",
				"| ForEach-Object {",
				"\"-----BEGIN CERTIFICATE-----\";",
				"[System.Convert]::ToBase64String($_.RawData, [System.Base64FormattingOptions]::InsertLineBreaks);",
				"\"-----END CERTIFICATE-----\"",
				"}"
			].join(" ")
		]
	}];
	return [];
}
/** 从命令输出里抽取所有 PEM 证书块。 */
function extractCertificates(output) {
	const matches = output.match(CERT_REGEX);
	return matches ? matches : [];
}
/**
* 异步版 {@link readSystemTrustedCertificates}，Windows 上不阻塞事件循环。
*
* macOS 同样复用 {@link readSystemCAsViaCli}：首次调用是同步 `security` CLI
* （约 200-500ms，与该模块既有行为一致），命中缓存后近乎零开销；不在此重新
* 实现一套异步 keychain 读取，避免引入第二份缓存语义。
*/
async function readSystemTrustedCertificatesAsync() {
	if (process.platform === "darwin") return readSystemCAsViaCli();
	const certs = [];
	for (const { command, args } of getCertReadCommands()) try {
		const { stdout } = await execFileAsync(command, args, {
			encoding: "utf-8",
			timeout: READ_TIMEOUT_MS,
			maxBuffer: READ_MAX_BUFFER,
			windowsHide: true
		});
		certs.push(...extractCertificates(String(stdout)));
	} catch {}
	return certs;
}
/**
* 用读到的系统证书写出 bundle：滤掉 Node 内置根，只留额外的私有 CA。
* 无额外 CA 返回 undefined、不写文件。
*/
function writeBundleFromCertificates(caBundlePath, certs) {
	if (certs.length === 0) return;
	const builtinSet = new Set(tls.default.rootCertificates);
	const extra = [...new Set(certs)].filter((cert) => !builtinSet.has(cert));
	if (extra.length === 0) return;
	fs.default.mkdirSync(path.default.dirname(caBundlePath), { recursive: true });
	fs.default.writeFileSync(caBundlePath, extra.join("\n"), "utf-8");
	return caBundlePath;
}
/**
* 检测 `<configDir>/system-ca-bundle.pem` 是否已生成——纯文件判断，零子进程开销，
* 可安全用于启动关键路径。返回已存在的路径，否则 undefined。
*/
function getExistingSystemCaBundlePath(configDir) {
	try {
		if (!configDir) return;
		const caBundlePath = path.default.join(configDir, SYSTEM_CA_BUNDLE_FILENAME);
		return fs.default.existsSync(caBundlePath) ? caBundlePath : void 0;
	} catch {
		return;
	}
}
/**
* 异步确保 bundle 就绪——读系统证书库走异步子进程，不阻塞事件循环。
* 用于 daemon fork 之后的预热，让首次冷启动也能尽快具备私有 CA 信任
* （生成后供本次 CLI spawn 与下次 daemon 冷启动使用）。整体不抛错。
*/
async function ensureSystemCaBundleAsync(options) {
	const { configDir, hasProxy } = options;
	try {
		if (!configDir) return;
		const existing = getExistingSystemCaBundlePath(configDir);
		if (existing) return existing;
		if (!hasProxy) return;
		const readCertificates = options.readCertificates ?? readSystemTrustedCertificatesAsync;
		return writeBundleFromCertificates(path.default.join(configDir, SYSTEM_CA_BUNDLE_FILENAME), await readCertificates());
	} catch {
		return;
	}
}
/**
* 解析渠道包 configDir：优先 WorkBuddy / CodeBuddy 显式环境变量，回退 `~/.workbuddy`。
* 与 CLI env 组装口径一致，供 daemon 与 CLI 两侧共用。
*/
function resolveWorkbuddyConfigDir(hostEnv = process.env) {
	return hostEnv.WORKBUDDY_CONFIG_DIR || hostEnv.CODEBUDDY_CONFIG_DIR || path.default.join(os.default.homedir(), ".workbuddy");
}
/** 从一份 env 判断是否配置了 HTTP/HTTPS 代理（大小写兼容）。 */
function hasProxyConfigured(env) {
	return !!(env.HTTPS_PROXY || env.HTTP_PROXY || env.https_proxy || env.http_proxy);
}
//#endregion
//#region src/main/system/process-lifetime/app-lifetime-job.ts
/**
* Bind the daemon subtree (sidecar / prewarm / CLI runtime / MCP) to the
* Electron **main** process lifetime on Windows.
*
* Why a Job Object owned by main, not daemon:
*   - Windows does not kill children when a parent PID dies.
*   - sidecar is spawned `detached` so a **daemon** crash can reconnect to the
*     still-running CLI tree. That must keep working.
*   - Task Manager / crash of WorkBuddy.exe must still reap the tree.
*     `JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE` fires when the last Job handle
*     closes — that handle lives only in main.
*
* Daemon and sidecar OpenJob + Assign + CloseHandle. They must not keep a
* handle: an extra handle would keep the Job alive after main dies, and the
* tree would follow daemon again.
*
* Normal voluntary quit (QuitController.finishQuit) must call
* `disarmAppLifetimeJobKillOnClose()` immediately before `app.exit` when
* cleanup completed. That clears the kill-on-close flag so daemon/sidecar
* finish their own teardown. The Job handle stays in this process so koffi
* GC cannot CloseHandle early. Cleanup timeout and win32 update quit must
* keep the flag so a wedged tree is still reaped when main dies (#115197).
* Crash / hard kill never reach the JS disarm path.
*/
var WORKBUDDY_APP_LIFETIME_JOB_ENV = "WORKBUDDY_APP_LIFETIME_JOB";
var WORKBUDDY_DISABLE_APP_LIFETIME_JOB_ENV = "WORKBUDDY_DISABLE_APP_LIFETIME_JOB";
var JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 8192;
var JOB_OBJECT_EXTENDED_LIMIT_INFORMATION = 9;
var JOB_OBJECT_ASSIGN_PROCESS = 1;
/** x64 / arm64 JOBOBJECT_EXTENDED_LIMIT_INFORMATION. */
var EXTENDED_LIMIT_INFO_BYTES = 144;
var LIMIT_FLAGS_OFFSET = 16;
var heldJob;
var loadedApi;
function isAppLifetimeJobDisabled(env = process.env) {
	const value = env[WORKBUDDY_DISABLE_APP_LIFETIME_JOB_ENV];
	return value === "1" || value === "true";
}
function isNullHandle(handle) {
	return handle === null || handle === void 0 || handle === 0 || handle === 0n;
}
/** Join runs before file loggers exist; default to stderr (parent keeps a crash tail). */
function writeJobLog(logger, level, message) {
	if (logger) {
		logger[level](message);
		return;
	}
	try {
		process.stderr.write(`${message}\n`);
	} catch {}
}
function loadWin32Api() {
	if (loadedApi !== void 0) return loadedApi;
	if (process.platform !== "win32") {
		loadedApi = null;
		return null;
	}
	try {
		const kernel32 = require("koffi").load("kernel32.dll");
		loadedApi = {
			CreateJobObjectW: kernel32.func("void * __stdcall CreateJobObjectW(void *, str16)"),
			SetInformationJobObject: kernel32.func("int32 __stdcall SetInformationJobObject(void *, int32, void *, uint32)"),
			OpenJobObjectW: kernel32.func("void * __stdcall OpenJobObjectW(uint32, int32, str16)"),
			OpenProcess: kernel32.func("void * __stdcall OpenProcess(uint32, int32, uint32)"),
			AssignProcessToJobObject: kernel32.func("int32 __stdcall AssignProcessToJobObject(void *, void *)"),
			CloseHandle: kernel32.func("int32 __stdcall CloseHandle(void *)"),
			GetCurrentProcess: kernel32.func("void * __stdcall GetCurrentProcess()"),
			GetLastError: kernel32.func("uint32 __stdcall GetLastError()")
		};
		return loadedApi;
	} catch {
		loadedApi = null;
		return null;
	}
}
function buildExtendedLimitInfo() {
	const info = Buffer.alloc(EXTENDED_LIMIT_INFO_BYTES);
	info.writeUInt32LE(JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE, LIMIT_FLAGS_OFFSET);
	return info;
}
/**
* Create (once) the unnamed-to-JS / named-to-Win32 Job and keep its handle in
* this module until the OS process exits. Do not CloseHandle while
* KILL_ON_JOB_CLOSE is still set: that would reap the tree immediately.
* Voluntary quit only clears the flag; the handle stays until process death.
*/
function ensureWindowsAppLifetimeJob(options = {}) {
	const platform = options.platform ?? process.platform;
	const env = options.env ?? process.env;
	if (platform !== "win32" || isAppLifetimeJobDisabled(env)) return;
	if (heldJob) return heldJob.name;
	const api = options.api === void 0 ? loadWin32Api() : options.api;
	if (!api) {
		options.logger?.warn("[AppLifetimeJob] koffi/kernel32 unavailable; sidecar will not follow main on hard kill");
		return;
	}
	const name = options.randomName?.() ?? `Local\\WBAppJob-${process.pid}-${(0, node_crypto.randomBytes)(8).toString("hex")}`;
	const handle = api.CreateJobObjectW(null, name);
	if (isNullHandle(handle)) {
		options.logger?.warn(`[AppLifetimeJob] CreateJobObjectW failed win32=${api.GetLastError()}`);
		return;
	}
	const info = buildExtendedLimitInfo();
	if (!api.SetInformationJobObject(handle, JOB_OBJECT_EXTENDED_LIMIT_INFORMATION, info, info.length)) {
		const code = api.GetLastError();
		api.CloseHandle(handle);
		options.logger?.warn(`[AppLifetimeJob] SetInformationJobObject failed win32=${code}`);
		return;
	}
	heldJob = {
		name,
		handle,
		api,
		disarmed: false
	};
	options.logger?.info(`[AppLifetimeJob] created kill-on-close job ${name}`);
	return name;
}
/** Assign a live child PID to the Job held by this process. Does not duplicate the Job handle to the child. */
function assignPidToAppLifetimeJob(pid, options = {}) {
	if (!heldJob || !Number.isInteger(pid) || pid <= 0) return false;
	const { api, handle, name } = heldJob;
	const processHandle = api.OpenProcess(257, 0, pid);
	if (isNullHandle(processHandle)) {
		options.logger?.warn(`[AppLifetimeJob] OpenProcess pid=${pid} failed win32=${api.GetLastError()}`);
		return false;
	}
	try {
		if (!api.AssignProcessToJobObject(handle, processHandle)) {
			options.logger?.warn(`[AppLifetimeJob] AssignProcessToJobObject pid=${pid} failed win32=${api.GetLastError()}`);
			return false;
		}
		options.logger?.info(`[AppLifetimeJob] assigned pid=${pid} to ${name}`);
		return true;
	} finally {
		api.CloseHandle(processHandle);
	}
}
/**
* Member-side join: OpenJob, assign *this* process, close the Open handle
* immediately so KILL_ON_JOB_CLOSE still tracks the main-owned handle.
*/
function joinAppLifetimeJob(options = {}) {
	const platform = options.platform ?? process.platform;
	const env = options.env ?? process.env;
	if (platform !== "win32" || isAppLifetimeJobDisabled(env)) return false;
	const name = env[WORKBUDDY_APP_LIFETIME_JOB_ENV]?.trim();
	if (!name) return false;
	const api = options.api === void 0 ? loadWin32Api() : options.api;
	const logger = options.logger;
	if (!api) {
		writeJobLog(logger, "warn", "[AppLifetimeJob] join skipped: koffi/kernel32 unavailable");
		return false;
	}
	const job = api.OpenJobObjectW(JOB_OBJECT_ASSIGN_PROCESS, 0, name);
	if (isNullHandle(job)) {
		writeJobLog(logger, "warn", `[AppLifetimeJob] OpenJobObjectW failed win32=${api.GetLastError()}`);
		return false;
	}
	try {
		if (!api.AssignProcessToJobObject(job, api.GetCurrentProcess())) {
			writeJobLog(logger, "warn", `[AppLifetimeJob] self-assign failed win32=${api.GetLastError()}`);
			return false;
		}
		writeJobLog(logger, "info", `[AppLifetimeJob] joined ${name}`);
		return true;
	} finally {
		api.CloseHandle(job);
	}
}
/**
* Drop `KILL_ON_JOB_CLOSE` so a later main-process death does not
* TerminateProcess job members.
*
* Call this only after a completed voluntary cleanup, right before the
* process actually dies. Cleanup timeout and win32 update quit must keep
* the flag so a delayed `app.exit` / hard kill still reaps the tree. Keep
* the JS handle: koffi GC / CloseHandle with the flag still set would reap
* the tree immediately. Task Manager / crash never run this, so the kernel
* still closes the handle and reaps the tree on hard kill.
*/
function disarmAppLifetimeJobKillOnClose(options = {}) {
	if (!heldJob || heldJob.disarmed) return false;
	const { api, handle, name } = heldJob;
	const info = Buffer.alloc(EXTENDED_LIMIT_INFO_BYTES);
	if (!api.SetInformationJobObject(handle, JOB_OBJECT_EXTENDED_LIMIT_INFORMATION, info, info.length)) {
		options.logger?.warn(`[AppLifetimeJob] disarm kill-on-close failed win32=${api.GetLastError()}`);
		return false;
	}
	heldJob.disarmed = true;
	options.logger?.info(`[AppLifetimeJob] disarmed kill-on-close for ${name}`);
	return true;
}
/** Inject Job name into a spawn env snapshot (and process.env for in-main daemon). */
function applyAppLifetimeJobEnv(target, options = {}) {
	const name = ensureWindowsAppLifetimeJob(options);
	if (name) target[WORKBUDDY_APP_LIFETIME_JOB_ENV] = name;
	return target;
}
//#endregion
//#region src/main/system/logging/process-cpu-sampler.ts
/**
* 返回当前进程自上次采样以来的 CPU 百分比。
*
* process.cpuUsage() 是累计微秒值；用单调时钟的墙钟增量归一化后，
* 结果与 Electron ProcessMetric.cpu.percentCPUUsage 使用同一百分比口径。
*/
function createProcessCpuPercentSampler(options = {}) {
	const readUsage = options.readUsage ?? (() => process.cpuUsage());
	const nowNs = options.nowNs ?? (() => process.hrtime.bigint());
	let previousUsage = readUsage();
	let previousTimeNs = nowNs();
	return () => {
		const currentUsage = readUsage();
		const currentTimeNs = nowNs();
		const elapsedMicros = Number(currentTimeNs - previousTimeNs) / 1e3;
		const usedMicros = Math.max(0, currentUsage.user - previousUsage.user + currentUsage.system - previousUsage.system);
		previousUsage = currentUsage;
		previousTimeNs = currentTimeNs;
		return elapsedMicros > 0 ? usedMicros / elapsedMicros * 100 : 0;
	};
}
//#endregion
Object.defineProperty(exports, "AtRestCrypto", {
	enumerable: true,
	get: function() {
		return AtRestCrypto;
	}
});
Object.defineProperty(exports, "AtRestFailureRegistry", {
	enumerable: true,
	get: function() {
		return AtRestFailureRegistry;
	}
});
Object.defineProperty(exports, "CrashFilter", {
	enumerable: true,
	get: function() {
		return CrashFilter;
	}
});
Object.defineProperty(exports, "CrashLogExporter", {
	enumerable: true,
	get: function() {
		return CrashLogExporter;
	}
});
Object.defineProperty(exports, "CrashSanitizer", {
	enumerable: true,
	get: function() {
		return CrashSanitizer;
	}
});
Object.defineProperty(exports, "CryptoUnavailableError", {
	enumerable: true,
	get: function() {
		return CryptoUnavailableError;
	}
});
Object.defineProperty(exports, "DEFAULT_EXCLUDE_PATTERNS", {
	enumerable: true,
	get: function() {
		return DEFAULT_EXCLUDE_PATTERNS;
	}
});
Object.defineProperty(exports, "DEFAULT_RING_BUFFER_BYTES", {
	enumerable: true,
	get: function() {
		return DEFAULT_RING_BUFFER_BYTES;
	}
});
Object.defineProperty(exports, "IDLE_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return IDLE_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "IntegrityError", {
	enumerable: true,
	get: function() {
		return IntegrityError;
	}
});
Object.defineProperty(exports, "JSON_RPC_INTERNAL_ERROR", {
	enumerable: true,
	get: function() {
		return JSON_RPC_INTERNAL_ERROR;
	}
});
Object.defineProperty(exports, "JSON_RPC_INVALID_PARAMS", {
	enumerable: true,
	get: function() {
		return JSON_RPC_INVALID_PARAMS;
	}
});
Object.defineProperty(exports, "JSON_RPC_METHOD_NOT_FOUND", {
	enumerable: true,
	get: function() {
		return JSON_RPC_METHOD_NOT_FOUND;
	}
});
Object.defineProperty(exports, "JSON_RPC_PARSE_ERROR", {
	enumerable: true,
	get: function() {
		return JSON_RPC_PARSE_ERROR;
	}
});
Object.defineProperty(exports, "JSON_RPC_SESSION_NOT_FOUND", {
	enumerable: true,
	get: function() {
		return JSON_RPC_SESSION_NOT_FOUND;
	}
});
Object.defineProperty(exports, "ProtectedWholeFileCodec", {
	enumerable: true,
	get: function() {
		return ProtectedWholeFileCodec;
	}
});
Object.defineProperty(exports, "RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SANDBOX_CENTER_IPC_ADDRESS_ENV", {
	enumerable: true,
	get: function() {
		return SANDBOX_CENTER_IPC_ADDRESS_ENV;
	}
});
Object.defineProperty(exports, "SESSION_CREATE_RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_CREATE_RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SESSION_ENDPOINT_READY_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_ENDPOINT_READY_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SESSION_LIFECYCLE_RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_LIFECYCLE_RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SIDECAR_CREDENTIAL_BOOTSTRAP_SOCKET_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_CREDENTIAL_BOOTSTRAP_SOCKET_ENV;
	}
});
Object.defineProperty(exports, "SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_SESSION_ID_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_SESSION_ID_ENV;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_SOCKET_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_SOCKET_ENV;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_TOKEN_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_TOKEN_ENV;
	}
});
Object.defineProperty(exports, "WORKBUDDY_APP_LIFETIME_JOB_ENV", {
	enumerable: true,
	get: function() {
		return WORKBUDDY_APP_LIFETIME_JOB_ENV;
	}
});
Object.defineProperty(exports, "WORKBUDDY_DISABLE_APP_LIFETIME_JOB_ENV", {
	enumerable: true,
	get: function() {
		return WORKBUDDY_DISABLE_APP_LIFETIME_JOB_ENV;
	}
});
Object.defineProperty(exports, "applyAppLifetimeJobEnv", {
	enumerable: true,
	get: function() {
		return applyAppLifetimeJobEnv;
	}
});
Object.defineProperty(exports, "assignPidToAppLifetimeJob", {
	enumerable: true,
	get: function() {
		return assignPidToAppLifetimeJob;
	}
});
Object.defineProperty(exports, "atRestPolicyAtLeast", {
	enumerable: true,
	get: function() {
		return atRestPolicyAtLeast;
	}
});
Object.defineProperty(exports, "classifyWholeFileBytes", {
	enumerable: true,
	get: function() {
		return classifyWholeFileBytes;
	}
});
Object.defineProperty(exports, "controlSocketPath", {
	enumerable: true,
	get: function() {
		return controlSocketPath;
	}
});
Object.defineProperty(exports, "createProcessCpuPercentSampler", {
	enumerable: true,
	get: function() {
		return createProcessCpuPercentSampler;
	}
});
Object.defineProperty(exports, "createUnavailableAtRestEncryptionBootstrap", {
	enumerable: true,
	get: function() {
		return createUnavailableAtRestEncryptionBootstrap;
	}
});
Object.defineProperty(exports, "dataSocketPath", {
	enumerable: true,
	get: function() {
		return dataSocketPath;
	}
});
Object.defineProperty(exports, "decodeAtRestEncryptionBootstrap", {
	enumerable: true,
	get: function() {
		return decodeAtRestEncryptionBootstrap;
	}
});
Object.defineProperty(exports, "deriveAtRestKeyId", {
	enumerable: true,
	get: function() {
		return deriveAtRestKeyId;
	}
});
Object.defineProperty(exports, "disarmAppLifetimeJobKillOnClose", {
	enumerable: true,
	get: function() {
		return disarmAppLifetimeJobKillOnClose;
	}
});
Object.defineProperty(exports, "disposeAtRestEncryptionBootstrap", {
	enumerable: true,
	get: function() {
		return disposeAtRestEncryptionBootstrap;
	}
});
Object.defineProperty(exports, "encodeAtRestEncryptionBootstrap", {
	enumerable: true,
	get: function() {
		return encodeAtRestEncryptionBootstrap;
	}
});
Object.defineProperty(exports, "ensureSidecarRuntimeDir", {
	enumerable: true,
	get: function() {
		return ensureSidecarRuntimeDir;
	}
});
Object.defineProperty(exports, "ensureSystemCaBundleAsync", {
	enumerable: true,
	get: function() {
		return ensureSystemCaBundleAsync;
	}
});
Object.defineProperty(exports, "ensureWindowsAppLifetimeJob", {
	enumerable: true,
	get: function() {
		return ensureWindowsAppLifetimeJob;
	}
});
Object.defineProperty(exports, "generateControlPipeUuid", {
	enumerable: true,
	get: function() {
		return generateControlPipeUuid;
	}
});
Object.defineProperty(exports, "getAtRestAsymmetricKeyMaterial", {
	enumerable: true,
	get: function() {
		return getAtRestAsymmetricKeyMaterial;
	}
});
Object.defineProperty(exports, "getExistingSystemCaBundlePath", {
	enumerable: true,
	get: function() {
		return getExistingSystemCaBundlePath;
	}
});
Object.defineProperty(exports, "hasProxyConfigured", {
	enumerable: true,
	get: function() {
		return hasProxyConfigured;
	}
});
Object.defineProperty(exports, "init_aes_gcm_4L6MEmMw", {
	enumerable: true,
	get: function() {
		return init_aes_gcm_4L6MEmMw;
	}
});
Object.defineProperty(exports, "init_asymmetric_envelope_DhFQSwLY", {
	enumerable: true,
	get: function() {
		return init_asymmetric_envelope_DhFQSwLY;
	}
});
Object.defineProperty(exports, "init_dist", {
	enumerable: true,
	get: function() {
		return init_dist;
	}
});
Object.defineProperty(exports, "init_failure_registry_HWe3iSX2", {
	enumerable: true,
	get: function() {
		return init_failure_registry_HWe3iSX2;
	}
});
Object.defineProperty(exports, "init_key_normalize_2t2Jeyvk", {
	enumerable: true,
	get: function() {
		return init_key_normalize_2t2Jeyvk;
	}
});
Object.defineProperty(exports, "installCrashWriter", {
	enumerable: true,
	get: function() {
		return installCrashWriter;
	}
});
Object.defineProperty(exports, "isAppLifetimeJobDisabled", {
	enumerable: true,
	get: function() {
		return isAppLifetimeJobDisabled;
	}
});
Object.defineProperty(exports, "isAtRestEncryptionPolicy", {
	enumerable: true,
	get: function() {
		return isAtRestEncryptionPolicy;
	}
});
Object.defineProperty(exports, "isGracefulTerminationSignal", {
	enumerable: true,
	get: function() {
		return isGracefulTerminationSignal;
	}
});
Object.defineProperty(exports, "isNamedPipe", {
	enumerable: true,
	get: function() {
		return isNamedPipe;
	}
});
Object.defineProperty(exports, "joinAppLifetimeJob", {
	enumerable: true,
	get: function() {
		return joinAppLifetimeJob;
	}
});
Object.defineProperty(exports, "keyblobPathFor", {
	enumerable: true,
	get: function() {
		return keyblobPathFor;
	}
});
Object.defineProperty(exports, "loadOrCreateKeyblobMasterKey", {
	enumerable: true,
	get: function() {
		return loadOrCreateKeyblobMasterKey;
	}
});
Object.defineProperty(exports, "matchControlSocketFile", {
	enumerable: true,
	get: function() {
		return matchControlSocketFile;
	}
});
Object.defineProperty(exports, "normalizeAtRestBuildKeyCapabilities", {
	enumerable: true,
	get: function() {
		return normalizeAtRestBuildKeyCapabilities;
	}
});
Object.defineProperty(exports, "openAsymmetricEnvelope", {
	enumerable: true,
	get: function() {
		return openAsymmetricEnvelope;
	}
});
Object.defineProperty(exports, "parseSupportedEnvelope", {
	enumerable: true,
	get: function() {
		return parseSupportedEnvelope;
	}
});
Object.defineProperty(exports, "pidFilePath", {
	enumerable: true,
	get: function() {
		return pidFilePath;
	}
});
Object.defineProperty(exports, "readSystemCAsViaCli", {
	enumerable: true,
	get: function() {
		return readSystemCAsViaCli;
	}
});
Object.defineProperty(exports, "resolveAtRestEncryptionMode", {
	enumerable: true,
	get: function() {
		return resolveAtRestEncryptionMode;
	}
});
Object.defineProperty(exports, "resolveWorkbuddyConfigDir", {
	enumerable: true,
	get: function() {
		return resolveWorkbuddyConfigDir;
	}
});
Object.defineProperty(exports, "sealAsymmetricEnvelope", {
	enumerable: true,
	get: function() {
		return sealAsymmetricEnvelope;
	}
});
Object.defineProperty(exports, "sessionJournalDir", {
	enumerable: true,
	get: function() {
		return sessionJournalDir;
	}
});
Object.defineProperty(exports, "sidecarRuntimeDir", {
	enumerable: true,
	get: function() {
		return sidecarRuntimeDir;
	}
});
Object.defineProperty(exports, "workbuddyConfigDir", {
	enumerable: true,
	get: function() {
		return workbuddyConfigDir;
	}
});
Object.defineProperty(exports, "wrapChildProcess", {
	enumerable: true,
	get: function() {
		return wrapChildProcess;
	}
});
