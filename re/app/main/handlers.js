const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_conversations = require("./conversations.js");
const require_buddy_telemetry_context = require("./buddy-telemetry-context.js");
const require_quick_ask_tags = require("./quick-ask-tags.js");
const require_adm_zip$1 = require("./adm-zip.js");
const require_handler_registry = require("./handler-registry.js");
const require_contract = require("./contract2.js");
const require_traceparent = require("./traceparent.js");
const require_dist = require("./dist.js");
const require_task_status = require("./task-status.js");
const require_daemon_id_generator = require("./daemon-id-generator.js");
let fs = require("fs");
fs = require_rolldown_runtime.__toESM(fs);
let os = require("os");
os = require_rolldown_runtime.__toESM(os);
let path = require("path");
path = require_rolldown_runtime.__toESM(path);
let node_child_process = require("node:child_process");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
node_fs_promises = require_rolldown_runtime.__toESM(node_fs_promises);
let node_os = require("node:os");
node_os = require_rolldown_runtime.__toESM(node_os);
let node_crypto = require("node:crypto");
let node_perf_hooks = require("node:perf_hooks");
let node_util = require("node:util");
let node_url = require("node:url");
let child_process = require("child_process");
let tls = require("tls");
tls = require_rolldown_runtime.__toESM(tls);
let node_string_decoder = require("node:string_decoder");
//#region ../../packages/workbuddy-core/src/conversations/common/core/session-cwd-unavailable.ts
var SESSION_CWD_UNAVAILABLE_BIZ_CODE = 4011;
function classifySessionCwdErrno(errno) {
	switch (errno) {
		case "ENOENT":
		case "ENOTDIR": return "missing";
		case "EACCES":
		case "EPERM": return "permission_denied";
		default: return "unknown";
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/prompt/conversation-prompt-composition.ts
function deepFreeze$1(value) {
	if (value && typeof value === "object" && !Object.isFrozen(value)) {
		for (const child of Object.values(value)) deepFreeze$1(child);
		Object.freeze(value);
	}
	return value;
}
/** Builds the turn-scoped immutable draft before any wire materialization. */
function composeConversationPrompt(input) {
	const contributions = [{
		slot: "user",
		sourceId: "conversation.user",
		prompt: input.prompt
	}];
	if (input.prepared) contributions.push({
		slot: "host-prepared",
		sourceId: "conversation.promptPrepare",
		prompt: input.prepared.prompt
	});
	return deepFreeze$1(structuredClone({
		version: 1,
		contributions,
		...input.prepared?.meta || input.meta ? { meta: {
			...input.meta ?? {},
			...input.prepared?.meta ?? {}
		} } : {}
	}));
}
/**
* Materializes exactly one prompt for the transport. Host preparation is a
* typed replacement because the host composer already includes the user
* blocks; appending it would duplicate user content.
*/
function materializeConversationPromptComposition(composition) {
	const prepared = composition.contributions.find((item) => item.slot === "host-prepared");
	const user = composition.contributions.find((item) => item.slot === "user");
	return {
		prompt: prepared?.prompt ?? user?.prompt,
		...composition.meta ? { meta: composition.meta } : {}
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/domains/artifact/common/artifact-visibility.ts
/** 隐藏配置目录：落在这些目录下的文件默认不展示。 */
var HIDDEN_ARTIFACT_PATHS = ["Claw/.memory", ".workbuddy"];
/**
* 产物口径放行名单：命中隐藏目录但在名单内的状态子目录，仍可作为「产物」展示。
*
* 注意这里**不包含** memory 目录，理由见 `FILE_CHANGES_ONLY_ALLOWLIST_PATHS`。
*/
var ARTIFACT_ALLOWLIST_PATHS = [
	".workbuddy/brain/",
	".workbuddy/plans/",
	".workbuddy/tasks/",
	".workbuddy/todos/",
	".workbuddy/skills/",
	".workbuddy/artifact-index/",
	".codebuddy/brain/",
	".codebuddy/plans/",
	".codebuddy/tasks/",
	".codebuddy/todos/",
	".codebuddy/skills/"
];
/** 判定：命中隐藏目录且不在给定放行名单内。 */
function isHiddenBy(candidatePath, allowlist) {
	if (!HIDDEN_ARTIFACT_PATHS.some((p) => candidatePath.includes(p))) return false;
	return !allowlist.some((p) => candidatePath.includes(p));
}
/**
* 判定产物路径是否落在隐藏配置目录下（**产物**口径）。
*
* 记忆文件在此口径下一律判为隐藏，不会作为产物卡片出现（#100590）。
*
* 入参为 uri 或本地绝对路径均可（`file:///a/.workbuddy/x.md` 与 `/a/.workbuddy/x.md` 都命中），
* 因为匹配用的是子串包含而非路径分段比较。
*/
function isHiddenArtifactPath(candidatePath) {
	if (!candidatePath) return false;
	return isHiddenBy(candidatePath, ARTIFACT_ALLOWLIST_PATHS);
}
//#endregion
//#region ../../packages/workbuddy-core/src/domains/workspace/common/workspace-file-tree-ignore.ts
var DEFAULT_WORKSPACE_FILE_TREE_IGNORED_NAMES = /* @__PURE__ */ new Set([
	".DS_Store",
	".FullName",
	".cache",
	".idea",
	".nx",
	".worktrees",
	".changeset",
	"Thumbs.db",
	"ehthumbs.db",
	"desktop.ini",
	"$RECYCLE.BIN",
	"System Volume Information",
	".Trash",
	".Trashes",
	".git",
	".hg",
	".svn",
	".codebuddy",
	"node_modules",
	"dist",
	"build",
	"__pycache__",
	".venv",
	".tox"
]);
function isIgnoredWorkspaceFileTreeName(name) {
	return DEFAULT_WORKSPACE_FILE_TREE_IGNORED_NAMES.has(name);
}
/** 文件树只对后代节点降级权限错误；根路径/根目录的权限错误仍由扫描器抛出。 */
function isWorkspaceFileTreePermissionError(error) {
	return typeof error === "object" && error !== null && "code" in error && (error.code === "EPERM" || error.code === "EACCES");
}
/**
* 识别 Electron 抛的 `Invalid package <path>`：路径里带 `.asar` 的 realpath/stat 会被
* Electron 当归档解析，遇到内容不是合法 asar 的文件（如测试夹具）就抛这个错。
* 它没有 `code` 字段，只能按 message 判断；工作区扫描命中时跳过该文件即可，
* 不要因为它让整棵文件树扫描失败。（#119133）
*/
function isAsarPackageError(error) {
	return error instanceof Error && /^Invalid package /.test(error.message);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/core/cwd-normalize.ts
/**
* 会话 cwd 落库归一化（Issue #117204）。
*
* 背景：同一物理目录曾被落成两种字符串（`C:/a/b` 与 `C:\a\b`），侧栏按 cwd 分桶时
* 裂成两个空间组（"空间重复展示"）。修复分两层：
*   - **写入端**（本文件）：新建 / 更新会话时把 cwd 归一到正斜杠，杜绝继续混写；
*   - **消费端**（`list-grouping.ts` 的分桶 key、`use-task-grouping.ts`）：分桶用比较级
*     归一化，兜底存量已有的两种格式。
*
* 与「比较级归一化」的关键差异：
*   - 比较级（`normalizeWorkspacePathForCompare` / `normalizeBucketGroupValue` /
*     `normalizeTaskWorkspacePath`）额外 `toLowerCase()`，只用于比对，**不可落库**——
*     会把用户真实目录名（如 `WorkBuddy`）写成全小写，展示变形且与文件系统大小写不符。
*   - 本函数**保留大小写**，仅统一分隔符与尾斜杠，可安全写入 `sessions.cwd`。
*
* 两者组合幂等：比较级对本函数的输出再归一，结果与直接对原串归一一致，故写入端切换
* 格式后，新旧数据仍能被消费端正确归并。
*/
/**
* 落库前归一 cwd：`\` → `/` 并去掉尾部斜杠，**保留大小写**。
*
* `undefined` 原样透传（cwd 可空，需保持 NULL 语义）；空串 / 纯空白原样返回。
*/
function normalizeCwdForStorage(cwd) {
	if (cwd === void 0) return;
	const trimmed = cwd.trim();
	if (!trimmed) return trimmed;
	const slashed = trimmed.replace(/\\/g, "/");
	if (slashed === "/" || /^[a-zA-Z]:\/$/.test(slashed)) return slashed;
	return slashed.replace(/\/+$/, "");
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-hook-policy.ts
var TRUSTED_ONLY = ["trusted"];
function syncPolicy(name, failureMode = "degrade", logSuccess = true, composition = "single-owner") {
	return {
		name,
		execution: "sync",
		failureMode,
		allowedTrust: TRUSTED_ONLY,
		logSuccess,
		composition
	};
}
function asyncPolicy(name, timeoutMs, failureMode = "degrade", maxTimeoutMs = timeoutMs, composition = "single-owner") {
	return {
		name,
		execution: "async",
		timeoutMs,
		maxTimeoutMs,
		failureMode,
		allowedTrust: TRUSTED_ONLY,
		logSuccess: true,
		composition
	};
}
function observedAsyncPolicy(name, failureMode = "degrade", composition = "single-owner") {
	return {
		name,
		execution: "async",
		failureMode,
		allowedTrust: TRUSTED_ONLY,
		logSuccess: true,
		composition
	};
}
/** The only source of runtime policy for trusted Conversation host hooks. */
var CONVERSATION_HOOK_POLICIES = {
	resolveCommand: syncPolicy("resolveCommand"),
	"contributeEnv:pre": asyncPolicy("contributeEnv:pre", 3e3, "degrade", 3e3, "merge-env"),
	"contributeEnv:postConversationConfig": asyncPolicy("contributeEnv:postConversationConfig", 3e3, "degrade", 3e3, "merge-env"),
	"contributeEnv:postConversationConfig:expert": asyncPolicy("contributeEnv:postConversationConfig:expert", 3e3, "fail-operation", 3e3, "merge-env"),
	resolveMcpServers: asyncPolicy("resolveMcpServers", 1e4, "degrade", 6e4, "concat"),
	resolveMcpEnv: syncPolicy("resolveMcpEnv", "degrade", true, "merge-env"),
	resolveMcpServersTimeoutMs: syncPolicy("resolveMcpServersTimeoutMs", "degrade", false, "max"),
	reportPrepareStatus: syncPolicy("reportPrepareStatus", "fail-operation", false, "fan-out"),
	resolveConversationConfig: asyncPolicy("resolveConversationConfig", 15e3, "fail-operation"),
	refineConversationConfig: observedAsyncPolicy("refineConversationConfig", "fail-operation", "reduce"),
	beforePrompt: observedAsyncPolicy("beforePrompt", "degrade", "concat"),
	prepareConversationPrompt: observedAsyncPolicy("prepareConversationPrompt", "fail-operation", "reduce"),
	getConversationRuntimeRevision: syncPolicy("getConversationRuntimeRevision", "fail-operation", false, "revision-hash"),
	createConversationAdmission: syncPolicy("createConversationAdmission", "fail-operation"),
	"conversationAdmission:onInitialize": syncPolicy("conversationAdmission:onInitialize", "fail-operation"),
	"conversationAdmission:activate": observedAsyncPolicy("conversationAdmission:activate", "fail-operation"),
	"conversationAdmission:prepareSessionRequest": observedAsyncPolicy("conversationAdmission:prepareSessionRequest", "fail-operation"),
	"conversationAdmission:dispose": observedAsyncPolicy("conversationAdmission:dispose", "best-effort"),
	checkWorkspaceAccess: observedAsyncPolicy("checkWorkspaceAccess", "degrade", "all-must-allow"),
	acquireLocalHttpRuntime: observedAsyncPolicy("acquireLocalHttpRuntime", "fail-operation"),
	"acquiredRuntime:release": observedAsyncPolicy("acquiredRuntime:release", "best-effort"),
	releaseLocalHttpRuntime: observedAsyncPolicy("releaseLocalHttpRuntime", "best-effort"),
	resolveArtifactToolRules: syncPolicy("resolveArtifactToolRules", "degrade", false, "concat")
};
function getConversationHookPolicy(name) {
	return CONVERSATION_HOOK_POLICIES[name];
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-plugin.ts
/** Internal unchecked constructor; external code must use registerConversationPlugin. */
function createUncheckedConversationPlugin({ pluginId, hooks }) {
	return Object.freeze({
		manifest: Object.freeze({
			pluginId,
			apiVersion: 1,
			policyVersion: 1,
			trust: "trusted"
		}),
		hooks: Object.freeze({
			...hooks.launch ? { launch: Object.freeze({ ...hooks.launch }) } : {},
			...hooks.prompt ? { prompt: Object.freeze({ ...hooks.prompt }) } : {},
			...hooks.lifecycle ? { lifecycle: Object.freeze({ ...hooks.lifecycle }) } : {},
			...hooks.resources ? { resources: Object.freeze({ ...hooks.resources }) } : {}
		})
	});
}
function flattenConversationPluginHooks(plugin) {
	return {
		...plugin.hooks.launch,
		...plugin.hooks.prompt,
		...plugin.hooks.lifecycle
	};
}
/** Splits a legacy aggregate into the Launch/Prompt/Lifecycle Plugin Hook groups. */
function groupConversationWorkerHooks(hooks) {
	return {
		launch: {
			...hooks.resolveCommand ? { resolveCommand: hooks.resolveCommand } : {},
			...hooks.contributeEnv ? { contributeEnv: hooks.contributeEnv } : {},
			...hooks.resolveMcpServers ? { resolveMcpServers: hooks.resolveMcpServers } : {},
			...hooks.resolveMcpEnv ? { resolveMcpEnv: hooks.resolveMcpEnv } : {},
			...hooks.resolveMcpServersTimeoutMs ? { resolveMcpServersTimeoutMs: hooks.resolveMcpServersTimeoutMs } : {},
			...hooks.reportPrepareStatus ? { reportPrepareStatus: hooks.reportPrepareStatus } : {},
			...hooks.resolveConversationConfig ? { resolveConversationConfig: hooks.resolveConversationConfig } : {},
			...hooks.refineConversationConfig ? { refineConversationConfig: hooks.refineConversationConfig } : {},
			...hooks.beforePrompt ? { beforePrompt: hooks.beforePrompt } : {}
		},
		prompt: {
			...hooks.prepareConversationPrompt ? { prepareConversationPrompt: hooks.prepareConversationPrompt } : {},
			...hooks.getConversationRuntimeRevision ? { getConversationRuntimeRevision: hooks.getConversationRuntimeRevision } : {}
		},
		lifecycle: {
			...hooks.createConversationAdmission ? { createConversationAdmission: hooks.createConversationAdmission } : {},
			...hooks.checkWorkspaceAccess ? { checkWorkspaceAccess: hooks.checkWorkspaceAccess } : {},
			...hooks.acquireLocalHttpRuntime ? { acquireLocalHttpRuntime: hooks.acquireLocalHttpRuntime } : {},
			...hooks.releaseLocalHttpRuntime ? { releaseLocalHttpRuntime: hooks.releaseLocalHttpRuntime } : {}
		}
	};
}
/** Compatibility adapter for the pre-Plugin aggregate injection API. */
function defineLegacyConversationPlugin(hooks) {
	return createUncheckedConversationPlugin({
		pluginId: "legacy-conversation-worker-hooks",
		hooks: groupConversationWorkerHooks(hooks)
	});
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/conversation-log-archiver.ts
var import_adm_zip = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_adm_zip$1.require_adm_zip());
var IDLE_SAMPLE_MS = 3e4;
var BUSY_RETRY_MS = 3e4;
var MAX_EVENT_LOOP_UTILIZATION = .2;
var DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
/** 归档临时文件前缀，形如 `conversations.zip.tmp-<pid>-<ts>`；用于识别并清理历史残留。 */
var ARCHIVE_TMP_PREFIX = "conversations.zip.tmp-";
/** 跨进程互斥用的锁目录名；`mkdirSync` 在同目录内是原子操作，天然实现进程间互斥。 */
var ARCHIVE_LOCK_DIR = "conversations.zip.lock";
/** 锁被认为失效的时间（毫秒）；超过该时长的锁目录视为上次异常退出的残留，可抢占。 */
var ARCHIVE_LOCK_STALE_MS = 3e5;
function formatConversationLogDate(date) {
	const pad = (value) => String(value).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function previousLocalDate(date) {
	const previous = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	previous.setDate(previous.getDate() - 1);
	return formatConversationLogDate(previous);
}
/**
* Node 没有 requestIdleCallback；通过 eventLoopUtilization 采样，仅在 daemon 事件循环
* 连续采样窗口足够空闲时执行压缩。定时器 unref，不能阻止进程退出。
*/
function scheduleWhenCpuIdle(task) {
	let baseline = node_perf_hooks.performance.eventLoopUtilization();
	const probe = (delayMs) => {
		setTimeout(() => {
			if (node_perf_hooks.performance.eventLoopUtilization(baseline).utilization <= MAX_EVENT_LOOP_UTILIZATION) {
				Promise.resolve().then(task).catch((error) => {
					process.emitWarning(`Conversation CPU-idle task failed: ${String(error)}`, { code: "WORKBUDDY_CONVERSATION_IDLE_TASK_FAILED" });
				});
				return;
			}
			baseline = node_perf_hooks.performance.eventLoopUtilization();
			probe(BUSY_RETRY_MS);
		}, delayMs).unref();
	};
	probe(IDLE_SAMPLE_MS);
}
/** 每个 logsRoot 共享一个调度器，避免多个 Conversation logger 重复压缩同一天目录。 */
var ConversationLogArchiveScheduler = class {
	constructor(logsRoot, options = {}) {
		this.logsRoot = logsRoot;
		this.completedDates = /* @__PURE__ */ new Set();
		this.inFlightDates = /* @__PURE__ */ new Set();
		this.scheduleCpuIdle = options.scheduleCpuIdle ?? scheduleWhenCpuIdle;
		this.onError = options.onError ?? ((error, date) => {
			process.emitWarning(`Conversation log archive for ${date} failed: ${String(error)}`, { code: "WORKBUDDY_CONVERSATION_LOG_ARCHIVE_FAILED" });
		});
	}
	scheduleYesterday(now = /* @__PURE__ */ new Date()) {
		const date = previousLocalDate(now);
		if (this.completedDates.has(date) || this.inFlightDates.has(date)) return;
		this.inFlightDates.add(date);
		this.scheduleCpuIdle(() => {
			try {
				this.archiveDate(date);
				this.completedDates.add(date);
			} catch (error) {
				this.onError(error, date);
			} finally {
				this.inFlightDates.delete(date);
			}
		});
	}
	archiveDate(date) {
		if (!DATE_PATTERN.test(date)) throw new Error(`Invalid conversation log date: ${date}`);
		const sdkDir = node_path.join(this.logsRoot, date, "sdk");
		const sourceDir = node_path.join(sdkDir, "conversations");
		if (!node_fs.existsSync(sourceDir)) {
			this.cleanupStaleTmp(sdkDir);
			return;
		}
		const entries = node_fs.readdirSync(sourceDir, { withFileTypes: true }).filter((entry) => entry.isFile());
		if (entries.length === 0) {
			node_fs.rmSync(sourceDir, {
				recursive: true,
				force: true
			});
			this.cleanupStaleTmp(sdkDir);
			return;
		}
		node_fs.mkdirSync(sdkDir, { recursive: true });
		const lockDir = node_path.join(sdkDir, ARCHIVE_LOCK_DIR);
		if (!this.acquireLock(lockDir)) return;
		try {
			this.cleanupStaleTmp(sdkDir);
			const archivePath = node_path.join(sdkDir, "conversations.zip");
			const temporaryPath = `${archivePath}.tmp-${process.pid}-${Date.now()}`;
			try {
				const archive = new import_adm_zip.default();
				for (const entry of entries) archive.addLocalFile(node_path.join(sourceDir, entry.name));
				archive.writeZip(temporaryPath);
				node_fs.rmSync(archivePath, { force: true });
				this.renameArchive(temporaryPath, archivePath);
				node_fs.rmSync(sourceDir, {
					recursive: true,
					force: true
				});
			} finally {
				this.safeRemove(temporaryPath);
			}
		} finally {
			this.releaseLock(lockDir);
		}
	}
	/**
	* 原子 rename 封装为可覆盖方法：ESM 下无法 `vi.spyOn(fs, 'renameSync')`，
	* 单测通过 spy 本方法模拟 rename 失败（占用 / 权限），验证临时文件清理与不泄漏。
	*/
	renameArchive(temporaryPath, archivePath) {
		node_fs.renameSync(temporaryPath, archivePath);
	}
	/**
	* 清理 `sdkDir` 下所有 `conversations.zip.tmp-*` 历史残留（不限当前 pid），
	* 修复此前失败路径 / 异常退出 / 旧构建遗留导致临时文件无限堆积的问题。
	*/
	cleanupStaleTmp(sdkDir) {
		let names;
		try {
			names = node_fs.readdirSync(sdkDir);
		} catch {
			return;
		}
		for (const name of names) if (name.startsWith(ARCHIVE_TMP_PREFIX)) this.safeRemove(node_path.join(sdkDir, name));
	}
	/** 尝试获取目录锁：mkdir 成功即持锁；已存在但过期（stale）则抢占。 */
	acquireLock(lockDir) {
		try {
			node_fs.mkdirSync(lockDir);
			return true;
		} catch {
			try {
				const stat = node_fs.statSync(lockDir);
				if (Date.now() - stat.mtimeMs > ARCHIVE_LOCK_STALE_MS) {
					this.releaseLock(lockDir);
					node_fs.mkdirSync(lockDir);
					return true;
				}
			} catch {}
			return false;
		}
	}
	releaseLock(lockDir) {
		try {
			node_fs.rmSync(lockDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
	safeRemove(target) {
		try {
			node_fs.rmSync(target, { force: true });
		} catch {}
	}
};
var defaultSchedulers = /* @__PURE__ */ new Map();
function getConversationLogArchiveScheduler(logsRoot) {
	const key = node_path.resolve(logsRoot);
	let scheduler = defaultSchedulers.get(key);
	if (!scheduler) {
		scheduler = new ConversationLogArchiveScheduler(key);
		defaultSchedulers.set(key, scheduler);
	}
	return scheduler;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/conversation-file-logger.ts
var GLOBAL_MAX_LINES = 2e4;
var GLOBAL_MAX_BYTES = 8388608;
var PER_FILE_MAX_LINES = 4e3;
var PER_FILE_MAX_BYTES = 2097152;
var PER_FILE_DISK_MAX_BYTES = 10485760;
var PER_FILE_ROTATE_COUNT = 3;
var MAX_LINE_BYTES = 262144;
var BATCH_MAX_LINES = 256;
var BATCH_MAX_BYTES = 262144;
var MAX_BACKOFF_MS = 3e4;
var SANITIZE_MAX_NODES = 4096;
var SANITIZE_MAX_DEPTH = 32;
var SANITIZE_MAX_ARRAY_ITEMS = 512;
var SANITIZE_MAX_OBJECT_FIELDS = 512;
var SANITIZE_MAX_STRING_CHARS = 65536;
var SANITIZE_MAX_TOTAL_STRING_CHARS = 131072;
var SANITIZE_MAX_KEY_CHARS = 256;
var TRUNCATED_MARKER = "[truncated]";
var REDACTED_KEY_SUFFIX = /(?:authorization|proxyauthorization|cookie|setcookie|token|authtoken|accesstoken|refreshtoken|sessiontoken|password|secret|clientsecret|privatekey|apikey|endpoint|downloadurl|signedurl|signature|sig|qak|qsignature|xamzcredential|xamzsecuritytoken|xamzsignature|xcossignature|xgoogcredential|xgoogsignature)$/i;
var AUTH_HEADER_VALUE = /(\b(?:authorization|proxy-authorization)["']?\s*[:=]\s*["']?)(?:Bearer|Basic|Digest|Token)?\s*[^\s,;"'}]+/gi;
var COOKIE_HEADER_VALUE = /(\b(?:cookie|set-cookie)["']?\s*[:=]\s*["']?)[^\r\n,"'}]+/gi;
var GENERIC_SECRET_VALUE = /(\b(?:access[_-]?token|refresh[_-]?token|session[_-]?token|client[_-]?secret|api[_-]?key|private[_-]?key)["']?\s*[:=]\s*["']?)[^\s,;"'}]+/gi;
var BEARER_TOKEN = /\bBearer\s+[^\s"']+/gi;
var JWT_TOKEN = /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g;
var SENSITIVE_QUERY_VALUE = /([?&](?:access_token|refresh_token|token|signature|sig|q-ak|q-signature|x-amz-credential|x-amz-security-token|x-amz-signature|x-cos-signature|x-goog-credential|x-goog-signature)=)[^&#\s"']+/gi;
var dispatchers = /* @__PURE__ */ new WeakMap();
var ConversationLogDispatcher = class {
	constructor(context, options) {
		this.context = context;
		this.queues = /* @__PURE__ */ new Map();
		this.readyFiles = [];
		this.ensuredDirectories = /* @__PURE__ */ new Set();
		this.pendingArchiveDates = /* @__PURE__ */ new Map();
		this.totalResidentLines = 0;
		this.totalResidentBytes = 0;
		this.refs = 0;
		this.inFlight = false;
		this.flushScheduled = false;
		this.accepting = true;
		this.shuttingDown = false;
		this.backoffMs = 1e3;
		this.warnedThisEpisode = false;
		this.logsRoot = node_path.join(context.homeDir, "logs");
		this.now = options.now ?? (() => /* @__PURE__ */ new Date());
		this.archiveScheduler = options.archiveScheduler ?? getConversationLogArchiveScheduler(this.logsRoot);
		this.io = options.io ?? {
			mkdir: node_fs_promises.mkdir,
			appendFile: node_fs_promises.appendFile,
			stat: statExistingFile,
			rename: renameExistingFile,
			rm: removeExistingFile
		};
		this.perFileDiskMaxBytes = options.perFileDiskMaxBytes ?? PER_FILE_DISK_MAX_BYTES;
		this.schedule = options.schedule ?? ((callback) => {
			setImmediate(callback);
		});
		this.setTimer = options.setTimer ?? ((callback, ms) => setTimeout(callback, ms));
		this.clearTimer = options.clearTimer ?? ((timer) => clearTimeout(timer));
		const initialTime = this.now();
		this.latestDate = formatConversationLogDate(initialTime);
		this.archiveScheduler.scheduleYesterday(initialTime);
	}
	retain() {
		if (!this.accepting) return false;
		this.refs++;
		return true;
	}
	enqueue(fileName, tag, data) {
		if (!this.accepting) return;
		const writeTime = this.now();
		const date = formatConversationLogDate(writeTime);
		this.trackDateTransition(date, writeTime);
		const directory = node_path.join(this.logsRoot, date, "sdk", "conversations");
		const filePath = node_path.join(directory, fileName);
		const queue = this.getQueue(filePath, directory, date);
		if (this.totalResidentLines >= GLOBAL_MAX_LINES || this.totalResidentBytes >= GLOBAL_MAX_BYTES || queue.residentLines >= PER_FILE_MAX_LINES || queue.residentBytes >= PER_FILE_MAX_BYTES) {
			this.recordDropped(queue, 1, 0);
			return;
		}
		let line;
		try {
			line = `${writeTime.toISOString()} ${tag}${data === void 0 ? "" : ` ${JSON.stringify(sanitizeBounded(data))}`}\n`;
		} catch {
			this.recordDropped(queue, 1, 0);
			return;
		}
		const bytes = Buffer.byteLength(line);
		if (bytes > MAX_LINE_BYTES || this.totalResidentLines >= GLOBAL_MAX_LINES || this.totalResidentBytes + bytes > GLOBAL_MAX_BYTES || queue.residentLines >= PER_FILE_MAX_LINES || queue.residentBytes + bytes > PER_FILE_MAX_BYTES) {
			this.recordDropped(queue, 1, bytes);
			return;
		}
		queue.lines.push({
			text: line,
			bytes
		});
		queue.residentLines++;
		queue.residentBytes += bytes;
		this.totalResidentLines++;
		this.totalResidentBytes += bytes;
		this.markReady(queue);
		this.requestFlush();
	}
	release() {
		if (this.refs > 0) this.refs--;
		if (this.refs > 0 || this.shuttingDown) return this.closePromise ?? Promise.resolve();
		this.accepting = false;
		this.shuttingDown = true;
		this.closePromise = new Promise((resolve) => {
			this.resolveClose = resolve;
		});
		if (this.backoffTimer) {
			this.clearTimer(this.backoffTimer);
			this.backoffTimer = void 0;
		}
		if (!this.inFlight) {
			this.requestFlush();
			this.finishCloseIfDrained();
		}
		return this.closePromise;
	}
	getQueue(filePath, directory, date) {
		const existing = this.queues.get(filePath);
		if (existing) return existing;
		const queue = {
			filePath,
			directory,
			date,
			lines: [],
			residentLines: 0,
			residentBytes: 0,
			writtenBytes: 0,
			diskSized: false,
			droppedLines: 0,
			droppedBytes: 0,
			ready: false
		};
		this.queues.set(filePath, queue);
		return queue;
	}
	markReady(queue) {
		if (queue.ready || queue.lines.length === 0) return;
		queue.ready = true;
		this.readyFiles.push(queue);
	}
	requestFlush() {
		if (this.inFlight || this.flushScheduled || this.backoffTimer || this.readyFiles.length === 0) return;
		this.flushScheduled = true;
		this.schedule(() => {
			this.flushScheduled = false;
			this.startNextFlush();
		});
	}
	startNextFlush() {
		if (this.inFlight || this.backoffTimer) return;
		const queue = this.readyFiles.shift();
		if (!queue) {
			this.finishCloseIfDrained();
			return;
		}
		queue.ready = false;
		const summary = this.takeDroppedSummary(queue);
		const maxBusinessLines = BATCH_MAX_LINES - (summary ? 1 : 0);
		const maxBusinessBytes = BATCH_MAX_BYTES - (summary?.bytes ?? 0);
		const batch = [];
		let batchBytes = 0;
		while (batch.length < maxBusinessLines && queue.lines.length > 0) {
			const next = queue.lines[0];
			if (batch.length > 0 && batchBytes + next.bytes > maxBusinessBytes) break;
			if (next.bytes > maxBusinessBytes) {
				queue.lines.shift();
				this.removeResident(queue, next);
				this.recordDropped(queue, 1, next.bytes);
				continue;
			}
			queue.lines.shift();
			batch.push(next);
			batchBytes += next.bytes;
		}
		this.markReady(queue);
		if (batch.length === 0) {
			if (summary) this.recordDropped(queue, summary.droppedLines, summary.droppedBytes);
			this.requestFlush();
			this.finishCloseIfDrained();
			return;
		}
		this.inFlight = true;
		const chunk = `${summary?.text ?? ""}${batch.map((item) => item.text).join("")}`;
		this.flushBatch(queue, batch, summary, chunk).catch(() => void 0);
	}
	async flushBatch(queue, batch, summary, chunk) {
		try {
			if (!this.ensuredDirectories.has(queue.directory)) {
				await this.io.mkdir(queue.directory, { recursive: true });
				this.ensuredDirectories.add(queue.directory);
			}
			await this.ensureDiskSize(queue);
			await this.rotateIfNeeded(queue, Buffer.byteLength(chunk));
			await this.io.appendFile(queue.filePath, chunk, "utf8");
			queue.writtenBytes += Buffer.byteLength(chunk);
			for (const line of batch) this.removeResident(queue, line);
			this.warnedThisEpisode = false;
			this.backoffMs = 1e3;
			this.inFlight = false;
			this.maybeScheduleArchives();
			this.requestFlush();
			this.finishCloseIfDrained();
		} catch (error) {
			for (const line of batch) this.removeResident(queue, line);
			this.recordDropped(queue, (summary?.droppedLines ?? 0) + batch.length, (summary?.droppedBytes ?? 0) + batch.reduce((sum, line) => sum + line.bytes, 0));
			this.inFlight = false;
			if (!this.warnedThisEpisode) {
				this.warnedThisEpisode = true;
				this.context.logger.warn("[conversations] diagnostic log write failed", {
					code: error && typeof error === "object" && "code" in error ? String(error.code) : "UNKNOWN",
					droppedLines: queue.droppedLines,
					droppedBytes: queue.droppedBytes
				});
			}
			this.maybeScheduleArchives();
			if (this.shuttingDown) {
				this.dropPending();
				this.finishCloseIfDrained();
				return;
			}
			const delay = this.backoffMs;
			this.backoffMs = Math.min(this.backoffMs * 2, MAX_BACKOFF_MS);
			this.backoffTimer = this.setTimer(() => {
				this.backoffTimer = void 0;
				this.requestFlush();
			}, delay);
			this.backoffTimer.unref?.();
		}
	}
	async rotateIfNeeded(queue, nextBytes) {
		if (queue.writtenBytes === 0) return;
		if (queue.writtenBytes < this.perFileDiskMaxBytes && queue.writtenBytes + nextBytes <= this.perFileDiskMaxBytes) return;
		if (!this.io.rename) throw Object.assign(/* @__PURE__ */ new Error("conversation log rotate unavailable"), { code: "ROTATE_UNAVAILABLE" });
		await this.rotateFile(queue);
	}
	async rotateFile(queue) {
		const renameFile = this.io.rename;
		if (!renameFile) throw Object.assign(/* @__PURE__ */ new Error("conversation log rotate unavailable"), { code: "ROTATE_UNAVAILABLE" });
		const current = queue.filePath;
		await this.io.rm?.(rotatedPath(current, PER_FILE_ROTATE_COUNT));
		for (let index = 2; index >= 1; index--) await renameFile(rotatedPath(current, index), rotatedPath(current, index + 1));
		await renameFile(current, rotatedPath(current, 1));
		queue.writtenBytes = 0;
		queue.diskSized = true;
	}
	async ensureDiskSize(queue) {
		if (queue.diskSized) return;
		if (this.io.stat) try {
			queue.writtenBytes = (await this.io.stat(queue.filePath))?.size ?? 0;
		} catch {
			queue.writtenBytes = 0;
		}
		queue.diskSized = true;
	}
	removeResident(queue, line) {
		queue.residentLines--;
		queue.residentBytes -= line.bytes;
		this.totalResidentLines--;
		this.totalResidentBytes -= line.bytes;
	}
	recordDropped(queue, lines, bytes) {
		queue.droppedLines += lines;
		queue.droppedBytes += bytes;
	}
	takeDroppedSummary(queue) {
		if (queue.droppedLines === 0) return;
		const droppedLines = queue.droppedLines;
		const droppedBytes = queue.droppedBytes;
		const text = `${this.now().toISOString()} diagnostic-log:dropped ${JSON.stringify({
			droppedLines,
			droppedBytes
		})}\n`;
		queue.droppedLines = 0;
		queue.droppedBytes = 0;
		return {
			text,
			bytes: Buffer.byteLength(text),
			droppedLines,
			droppedBytes
		};
	}
	trackDateTransition(date, writeTime) {
		if (date === this.latestDate) return;
		this.pendingArchiveDates.set(this.latestDate, writeTime);
		this.latestDate = date;
		this.maybeScheduleArchives();
	}
	maybeScheduleArchives() {
		for (const [date, writeTime] of this.pendingArchiveDates) {
			if ([...this.queues.values()].some((queue) => queue.date === date && queue.residentLines > 0)) continue;
			this.pendingArchiveDates.delete(date);
			this.archiveScheduler.scheduleYesterday(writeTime);
		}
	}
	dropPending() {
		for (const queue of this.queues.values()) {
			while (queue.lines.length > 0) {
				const line = queue.lines.shift();
				this.removeResident(queue, line);
				this.recordDropped(queue, 1, line.bytes);
			}
			queue.ready = false;
		}
		this.readyFiles.length = 0;
		this.maybeScheduleArchives();
	}
	finishCloseIfDrained() {
		if (!this.shuttingDown || this.inFlight || this.totalResidentLines > 0) return;
		this.resolveClose?.();
		this.resolveClose = void 0;
		if (dispatchers.get(this.context) === this) dispatchers.delete(this.context);
	}
};
/** Context-scoped bounded file sink for Conversation diagnostics. */
function createConversationFileLogger(context, options = {}) {
	const existing = dispatchers.get(context);
	const dispatcher = existing?.retain() ? existing : new ConversationLogDispatcher(context, options);
	if (dispatcher !== existing) {
		dispatcher.retain();
		dispatchers.set(context, dispatcher);
	}
	let closed = false;
	let closePromise;
	return {
		conversation: (conversationId, tag, data) => {
			if (!closed) dispatcher.enqueue(`${safeFileName(conversationId)}.log`, tag, data);
		},
		operation: (tag, data) => {
			if (!closed) dispatcher.enqueue("operation.log", tag, data);
		},
		close: () => {
			if (closed) return closePromise ?? Promise.resolve();
			closed = true;
			closePromise = dispatcher.release();
			return closePromise;
		}
	};
}
function sanitizeBounded(value) {
	return sanitizeValue(value, 0, {
		nodes: 0,
		stringChars: 0
	}, /* @__PURE__ */ new WeakSet());
}
function sanitizeValue(value, depth, budget, seen) {
	if (budget.nodes >= SANITIZE_MAX_NODES) return TRUNCATED_MARKER;
	budget.nodes++;
	if (typeof value === "string") return sanitizeBoundedString(value, budget);
	if (typeof value === "bigint") return sanitizeBoundedString(value.toString(), budget);
	if (!value || typeof value !== "object") return value;
	if (depth >= SANITIZE_MAX_DEPTH) return TRUNCATED_MARKER;
	if (seen.has(value)) return "[circular]";
	seen.add(value);
	try {
		if (Array.isArray(value)) {
			const output = [];
			const limit = Math.min(value.length, SANITIZE_MAX_ARRAY_ITEMS);
			for (let index = 0; index < limit; index++) {
				if (budget.nodes >= SANITIZE_MAX_NODES) {
					output.push(TRUNCATED_MARKER);
					break;
				}
				output.push(sanitizeValue(value[index], depth + 1, budget, seen));
			}
			if (value.length > limit) output.push(TRUNCATED_MARKER);
			return output;
		}
		const output = {};
		if (value instanceof Date) return sanitizeBoundedString(value.toISOString(), budget);
		if (value instanceof Error) {
			output.name = sanitizeBoundedString(value.name, budget);
			output.message = sanitizeBoundedString(value.message, budget);
		}
		let fieldCount = 0;
		for (const key in value) {
			if (!Object.prototype.hasOwnProperty.call(value, key)) continue;
			if (value instanceof Error && (key === "name" || key === "message")) continue;
			if (fieldCount >= SANITIZE_MAX_OBJECT_FIELDS || budget.nodes >= SANITIZE_MAX_NODES) {
				output.__truncated__ = TRUNCATED_MARKER;
				break;
			}
			fieldCount++;
			const outputKey = sanitizeBoundedKey(key, budget);
			if (isSensitiveKey(key)) {
				output[outputKey] = "[redacted]";
				continue;
			}
			try {
				output[outputKey] = sanitizeValue(value[key], depth + 1, budget, seen);
			} catch {
				output[outputKey] = TRUNCATED_MARKER;
			}
		}
		return output;
	} finally {
		seen.delete(value);
	}
}
function sanitizeBoundedKey(value, budget) {
	const bounded = takeBoundedString(value, SANITIZE_MAX_KEY_CHARS, budget);
	return bounded.truncated ? `${bounded.value}${TRUNCATED_MARKER}` : bounded.value;
}
function sanitizeBoundedString(value, budget) {
	const bounded = takeBoundedString(value, SANITIZE_MAX_STRING_CHARS, budget);
	const sanitized = sanitizeString(bounded.value);
	return bounded.truncated ? `${sanitized}${TRUNCATED_MARKER}` : sanitized;
}
function takeBoundedString(value, perValueLimit, budget) {
	const remaining = Math.max(0, SANITIZE_MAX_TOTAL_STRING_CHARS - budget.stringChars);
	const length = Math.min(value.length, perValueLimit, remaining);
	budget.stringChars += length;
	return {
		value: value.slice(0, length),
		truncated: length < value.length
	};
}
function isSensitiveKey(key) {
	return REDACTED_KEY_SUFFIX.test(key.replace(/[^a-zA-Z0-9]/g, ""));
}
function sanitizeString(value) {
	return value.replace(AUTH_HEADER_VALUE, "$1[redacted]").replace(COOKIE_HEADER_VALUE, "$1[redacted]").replace(GENERIC_SECRET_VALUE, "$1[redacted]").replace(BEARER_TOKEN, "Bearer [redacted]").replace(JWT_TOKEN, "[redacted-jwt]").replace(SENSITIVE_QUERY_VALUE, "$1[redacted]");
}
function safeFileName(value) {
	return value.replace(/[^a-zA-Z0-9._-]/g, "_");
}
function rotatedPath(filePath, index) {
	return `${filePath}.${index}`;
}
function isEnoent$5(error) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
async function statExistingFile(filePath) {
	try {
		return await (0, node_fs_promises.stat)(filePath);
	} catch (error) {
		if (isEnoent$5(error)) return null;
		throw error;
	}
}
async function renameExistingFile(from, to) {
	try {
		await (0, node_fs_promises.rename)(from, to);
	} catch (error) {
		if (isEnoent$5(error)) return;
		throw error;
	}
}
async function removeExistingFile(filePath) {
	try {
		await (0, node_fs_promises.unlink)(filePath);
	} catch (error) {
		if (isEnoent$5(error)) return;
		throw error;
	}
}
/**
* djb2 哈希（对 UTF-8 字节），输出 base36。与 web-ui mcp-app-handlers 的 djb2
* 同构，但这里对**字节**而非 UTF-16 char code 取 hash，保证跨编码/跨 runtime 稳定。
*/
function djb2Base36(input) {
	const bytes = Buffer.from(input, "utf8");
	let h = 5381;
	for (let i = 0; i < bytes.length; i++) h = h * 33 ^ bytes[i] | 0;
	return (h >>> 0).toString(36);
}
/**
* 把字符串按 UTF-8 字节数截断到 `maxBytes`，且不切坏任何码点。
* 逐码点累加字节长度，超过上限即停。
*/
function truncateToByteLimitOnCodePoint(value, maxBytes) {
	let bytes = 0;
	let result = "";
	for (const ch of value) {
		const chBytes = Buffer.byteLength(ch, "utf8");
		if (bytes + chBytes > maxBytes) break;
		bytes += chBytes;
		result += ch;
	}
	return result;
}
/**
* 路径归一为「基础串」（未做长度守卫）：`/` `\` `:` → `-`，去首尾 `-`，
* 连续 `-` 折叠。`compressWorkspacePathName` 与读侧 legacy 兜底共用，
* 避免归一逻辑在写侧/读侧各存一份副本导致算法漂移（见
* workbuddy-core 的 `tryResolveLegacyProjectDirByPrefix`）。
*/
function normalizeWorkspacePathBase(dir) {
	return dir.replace(/[/\\:]/g, "-").replace(/^-+/, "").replace(/-+$/, "").replace(/-+/g, "-");
}
/**
* 把任意目录路径归一成一个安全的单段目录名。
*
* 例：'/Users/ericffan/my-project' → 'Users-ericffan-my-project'
*
* 超长（>255 字节）时：截断前缀（≤180B，码点边界）+ '-' + djb2Base36(完整归一串)，
* 总长 ≤ 180 + 1 + ~7 < 255B，且对同一输入稳定、可被读侧前缀扫描定位。
*/
function compressWorkspacePathName(dir) {
	const base = normalizeWorkspacePathBase(dir);
	if (Buffer.byteLength(base, "utf8") <= 255) return base;
	return `${truncateToByteLimitOnCodePoint(base, 180)}-${djb2Base36(base)}`;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/replay-history.ts
/**
* JSONL active-history 解析，结构与 Agent CLI `HistoryUtils.resolveReplayHistory/getActiveHistory` 对齐。
* 本实现留在 conversations/node，避免 workbuddy-core 反向依赖 agent-cli。
*/
var ConversationReplayHistory = class {
	static resolveReplayHistory(history) {
		const recovered = this.recoverLegacyReplayParents(history);
		if (!(recovered.some(isContentFilterNoticeItem) || recovered.some((item) => item.type === "resend-fork-notice") || hasSiblingRealUserParent(recovered))) return recovered.filter((item) => !isCustomItem(item));
		return this.getActiveHistory(recovered).filter((item) => !isCustomItem(item));
	}
	static getActiveHistory(history) {
		let targetId;
		for (let index = history.length - 1; index >= 0; index -= 1) {
			const item = history[index];
			if (typeof item.id === "string" && !isCustomItem(item)) {
				targetId = item.id;
				break;
			}
		}
		if (!targetId) return [];
		const result = [];
		for (let index = history.length - 1; index >= 0; index -= 1) {
			const item = history[index];
			if (item.id !== targetId) continue;
			result.unshift(item);
			while (index - 1 >= 0 && history[index - 1].id === targetId) {
				index -= 1;
				result.unshift(history[index]);
			}
			const head = history[index];
			targetId = resolveActiveHopTarget(history, index, head);
		}
		return result;
	}
	static recoverLegacyReplayParents(history) {
		const ids = new Set(history.map((item) => readString$2(item.id)).filter((id) => Boolean(id)));
		const itemById = new Map(history.map((item) => [readString$2(item.id), item]).filter((entry) => Boolean(entry[0])));
		let changed = false;
		const recovered = history.map((item, index) => {
			const id = readString$2(item.id);
			const parentId = readString$2(item.parentId);
			const brokenParent = !parentId || parentId === id || !ids.has(parentId);
			const recoverableCompact = isReplayRecoverableCompactMessage(item);
			const cyclicCompactParent = Boolean(parentId) && recoverableCompact && parentChainReaches(parentId, id, itemById);
			if (!id || !brokenParent && !cyclicCompactParent || readString$2(item.logicalParentId)) return item;
			if (!recoverableCompact && !isSystemTeammateMessage(item)) return item;
			const previousId = findPreviousId(history, index, id, itemById);
			if (!previousId) return item;
			changed = true;
			return isReplayRecoverableCompactMessage(item) ? {
				...item,
				parentId: void 0,
				logicalParentId: previousId
			} : {
				...item,
				parentId: previousId
			};
		});
		return changed ? recovered : [...history];
	}
};
/**
* 收集到 user message 时，向前跳过 custom / system teammate 后再认墓碑。
* 命中 resend-fork-notice 则 hop 到墓碑 parentId（空=root），不信任新 user.parentId。
* 级联多次编辑由链上回跳完成。
*/
function resolveActiveHopTarget(history, index, head) {
	if (isRealUserMessage(head)) {
		const forkNotice = findNearestPreviousForkNotice(history, index);
		if (forkNotice) return readString$2(forkNotice.parentId);
	}
	return readString$2(head.parentId) ?? readString$2(head.logicalParentId);
}
function findNearestPreviousForkNotice(history, before) {
	for (let cursor = before - 1; cursor >= 0; cursor -= 1) {
		const item = history[cursor];
		if (item.type === "resend-fork-notice") return item;
		if (isHopGapItem(item)) continue;
		return;
	}
}
/** 墓碑与新 user 之间可插入的非对话项；resend-fork-notice 本身不算 gap。 */
function isHopGapItem(item) {
	return isCustomItem(item) && item.type !== "resend-fork-notice" || isSystemTeammateMessage(item);
}
/** 两个 isRealUserMessage 共享非空 parentId（readString 后非空）才算兄弟分叉。 */
function hasSiblingRealUserParent(history) {
	const seenParents = /* @__PURE__ */ new Set();
	for (const item of history) {
		if (!isRealUserMessage(item)) continue;
		const parentId = readString$2(item.parentId);
		if (!parentId) continue;
		if (seenParents.has(parentId)) return true;
		seenParents.add(parentId);
	}
	return false;
}
function isRealUserMessage(item) {
	if (item.type !== "message" || item.role !== "user") return false;
	const providerData = isRecord$8(item.providerData) ? item.providerData : void 0;
	if (providerData?.skipRun === true || providerData?.isMeta === true || providerData?.isCompactInternal === true || typeof providerData?.compactType === "string" || require_conversations.isSteerUserMessage(item) || isSystemTeammateMessage(item)) return false;
	return true;
}
function findPreviousId(history, before, currentId, itemById) {
	for (let index = before - 1; index >= 0; index -= 1) {
		const candidate = history[index];
		const id = readString$2(candidate.id);
		if (!id || id === currentId || isCustomItem(candidate)) continue;
		if (parentChainReaches(id, currentId, itemById)) continue;
		return id;
	}
}
function parentChainReaches(startId, targetId, itemById) {
	if (!startId || !targetId) return false;
	const seen = /* @__PURE__ */ new Set();
	let cursor = startId;
	while (cursor && !seen.has(cursor)) {
		if (cursor === targetId) return true;
		seen.add(cursor);
		cursor = readString$2(itemById.get(cursor)?.parentId);
	}
	return false;
}
function isContentFilterNoticeItem(item) {
	return (isRecord$8(item.providerData) ? item.providerData : void 0)?.contentFilterNotice === true;
}
function isReplayRecoverableCompactMessage(item) {
	if (item.type !== "message" || item.role !== "user") return false;
	const providerData = isRecord$8(item.providerData) ? item.providerData : void 0;
	return providerData?.isCompactInternal === true || typeof providerData?.compactType === "string";
}
function isSystemTeammateMessage(item) {
	const providerData = isRecord$8(item.providerData) ? item.providerData : void 0;
	if (typeof (providerData && isRecord$8(providerData.teammateMessage) ? providerData.teammateMessage : void 0)?.from === "string") return true;
	return require_conversations.isTeammateMessageEnvelopeContent(item.content);
}
var CUSTOM_ITEM_TYPES = /* @__PURE__ */ new Set([
	"custom-title",
	"ai-title",
	"file-history-snapshot",
	"summary",
	"topic",
	"goal-result",
	"goal-progress",
	"resend-fork-notice"
]);
function isCustomItem(item) {
	return typeof item.type === "string" && CUSTOM_ITEM_TYPES.has(item.type);
}
function readString$2(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function isRecord$8(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/local-conversation-history-utils.ts
function messageIdentity(update) {
	const messageId = readString$1(update.messageId);
	return messageId ? { messageId } : {};
}
function parseRecord$1(value) {
	if (isRecord$7(value)) return value;
	if (typeof value !== "string") return {};
	try {
		const parsed = JSON.parse(value);
		return isRecord$7(parsed) ? parsed : {};
	} catch {
		return {};
	}
}
function extractText$1(value) {
	if (typeof value === "string") return value.trim();
	if (Array.isArray(value)) return value.map(extractText$1).filter(Boolean).join("\n").trim();
	if (!isRecord$7(value)) return "";
	if (typeof value.text === "string") return value.text.trim();
	if (typeof value.output === "string") return value.output.trim();
	if (value.content !== void 0) return extractText$1(value.content);
	if (value.output !== void 0) return extractText$1(value.output);
	if (value.message !== void 0) return extractText$1(value.message);
	return "";
}
function mergeRecords$1(left, right) {
	return left || right ? {
		...left ?? {},
		...right ?? {}
	} : void 0;
}
function readString$1(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function normalizeStatus$1(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function isRecord$7(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFileNotFound(error) {
	return typeof error === "object" && error !== null && error.code === "ENOENT";
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/local-conversation-snapshot-reader.ts
var COMPACT_RECORD_TRUNCATE_BYTES = 102400;
var COMPACT_PREVIEW_CHARS = 200;
function readTranscript(childFiles, id, label) {
	assertSafePathSegment(id, label);
	const fileName = `${id}.jsonl`;
	const raw = childFiles.get(fileName);
	return raw === void 0 ? [] : ConversationReplayHistory.resolveReplayHistory(parseJsonl(raw, fileName));
}
function parseJsonl(raw, source) {
	const records = [];
	const lines = raw.split(/\r?\n/);
	let lastNonEmpty = -1;
	for (let index = lines.length - 1; index >= 0; index -= 1) if (lines[index].trim()) {
		lastNonEmpty = index;
		break;
	}
	const hasTerminatedLastLine = /(?:\r?\n)$/.test(raw);
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		if (!line.trim()) continue;
		let parsed;
		try {
			parsed = JSON.parse(line);
		} catch (error) {
			if (index === lastNonEmpty && !hasTerminatedLastLine) break;
			const detail = error instanceof Error ? error.message : String(error);
			throw new Error(`[LocalConversationHistorySource] corrupt JSONL ${source}:${index + 1}: ${detail}`);
		}
		if (!isRecord$7(parsed)) throw new Error(`[LocalConversationHistorySource] corrupt JSONL ${source}:${index + 1}: record is not an object`);
		const lineBytes = Buffer.byteLength(line, "utf8");
		records.push(lineBytes > COMPACT_RECORD_TRUNCATE_BYTES ? compactTruncateRecord(parsed, lineBytes) : parsed);
	}
	return records;
}
function resolveJsonlPath(baseDir, id, label) {
	assertSafePathSegment(id, label);
	return resolveContainedPath(baseDir, `${id}.jsonl`);
}
function resolveContainedPath(baseDir, ...segments) {
	const root = node_path.resolve(baseDir);
	const candidate = node_path.resolve(root, ...segments);
	if (candidate !== root && !candidate.startsWith(`${root}${node_path.sep}`)) throw new Error("[LocalConversationHistorySource] history path escapes its storage root");
	return candidate;
}
function assertSafePathSegment(value, label) {
	if (!value || value !== value.trim() || value === "." || value === ".." || value.includes("/") || value.includes("\\") || value.includes("\0") || node_path.isAbsolute(value)) throw new Error(`[LocalConversationHistorySource] invalid ${label}`);
	if (Buffer.byteLength(value, "utf8") > 255) throw new Error(`[LocalConversationHistorySource] ${label} exceeds 255 bytes`);
}
function compactTruncateRecord(record, originalBytes) {
	const truncated = {
		...record,
		_compactTruncated: true,
		_originalBytes: originalBytes
	};
	if (typeof truncated.content === "string" && truncated.content.length > 400) truncated.content = `${truncated.content.slice(0, COMPACT_PREVIEW_CHARS)}\n…[truncated]`;
	else if (Array.isArray(truncated.content)) truncated.content = truncated.content.slice(0, 2);
	if (isRecord$7(truncated.providerData)) {
		const providerData = { ...truncated.providerData };
		if (typeof providerData.result === "string" && providerData.result.length > 400) providerData.result = `${providerData.result.slice(0, COMPACT_PREVIEW_CHARS)}\n…[truncated]`;
		if (isRecord$7(providerData.rawResponse)) providerData.rawResponse = { _compactTruncated: true };
		if (isRecord$7(providerData.toolResult)) {
			const toolResult = providerData.toolResult;
			const title = typeof toolResult.title === "string" ? toolResult.title : "";
			const content = typeof toolResult.content === "string" ? toolResult.content : JSON.stringify(toolResult.content ?? "");
			providerData.toolResult = {
				title,
				content: `${content.slice(0, COMPACT_PREVIEW_CHARS)}\n…[truncated]`,
				_compactTruncated: true,
				_originalContentLength: content.length
			};
		}
		truncated.providerData = providerData;
	}
	return truncated;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/persist-orphan-pending-cancelled-tools.ts
/**
* 与 agent-cli `INTERRUPTED_BY_USER_MESSAGE` 同文案。
* 写入 JSONL 给下一轮 session/resume 的模型看，不是用户可见 toast。
* 空 result 会被模型理解成授权卡还在等；这句才会让它当工具已中断并重试。
*/
var ORPHAN_PENDING_TOOL_INTERRUPTION = "Interrupted by user";
function resolveLocalSessionJsonlPath(homeDir, cwd, conversationId) {
	return resolveJsonlPath(resolveContainedPath(node_path.join(homeDir, "projects"), compressWorkspacePathName(cwd)), conversationId, "conversationId");
}
/**
* Cmd+Q / 进程被杀时 CLI 来不及给未应答 function_call 写 result。
* Core 打开孤儿 pending 会把会话收成 terminated，但 JSONL 仍缺 result，
* 「继续」走 session/resume 后模型会以为授权卡还在。调用方必须复用已经 hydrate 的
* 最新 Request 提供 calls；本函数只检查最后一个换行字节并追加，不读取/解析 transcript。
*/
async function persistOrphanPendingCancelledTools(jsonlPath, calls) {
	const pending = deduplicateCalls(calls);
	if (pending.length === 0) return 0;
	let handle;
	try {
		handle = await (0, node_fs_promises.open)(jsonlPath, node_fs.constants.O_RDWR | node_fs.constants.O_APPEND);
		const stat = await handle.stat();
		let prefix = "";
		if (stat.size > 0) {
			const lastByte = Buffer.allocUnsafe(1);
			const { bytesRead } = await handle.read(lastByte, 0, 1, stat.size - 1);
			if (bytesRead === 1 && lastByte[0] !== 10) prefix = "\n";
		}
		const now = Date.now();
		const lines = pending.map((call) => JSON.stringify(createCancelledResult(call, now)));
		await handle.appendFile(`${prefix}${lines.join("\n")}\n`, "utf8");
	} catch {
		return 0;
	} finally {
		await handle?.close().catch(() => void 0);
	}
	return pending.length;
}
function deduplicateCalls(calls) {
	const byId = /* @__PURE__ */ new Map();
	for (const call of calls) if (call.callId && !byId.has(call.callId)) byId.set(call.callId, call);
	return [...byId.values()];
}
function createCancelledResult(call, timestamp) {
	const result = {
		id: (0, node_crypto.randomUUID)(),
		type: "function_call_result",
		callId: call.callId,
		status: "cancelled",
		timestamp,
		output: {
			type: "text",
			text: ORPHAN_PENDING_TOOL_INTERRUPTION
		},
		providerData: {
			skipRun: true,
			...call.requestId ? { conversationRequestId: call.requestId } : {}
		}
	};
	if (call.id) result.parentId = call.id;
	if (call.name) result.name = call.name;
	if (call.sessionId) result.sessionId = call.sessionId;
	if (call.cwd) result.cwd = call.cwd;
	return result;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-hook-error.ts
/** Internal diagnostic error. It is never mapped to user-visible copy. */
var ConversationHookInvocationError = class extends Error {
	constructor(input) {
		super(`[conversation-hook] ${input.reason}`, { cause: input.cause });
		this.name = "ConversationHookInvocationError";
		this.reason = input.reason;
		this.hookName = input.hookName;
		this.pluginId = input.pluginId;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-hook-validation.ts
function createConversationHookCertificationHash(report) {
	const source = JSON.stringify({
		pluginId: report.pluginId,
		apiVersion: report.apiVersion,
		policyVersion: report.policyVersion,
		declaredHooks: [...report.declaredHooks].sort(),
		violations: report.violations.map((violation) => ({
			code: violation.code,
			hookName: violation.hookName
		}))
	});
	let hash = 2166136261;
	for (const value of source) {
		hash ^= value.charCodeAt(0);
		hash = Math.imul(hash, 16777619);
	}
	return `fnv1a32:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}
var HOOK_KEY_TO_NAMES = {
	resolveCommand: ["resolveCommand"],
	contributeEnv: ["contributeEnv:pre", "contributeEnv:postConversationConfig"],
	resolveMcpServers: ["resolveMcpServers"],
	resolveMcpEnv: ["resolveMcpEnv"],
	resolveMcpServersTimeoutMs: ["resolveMcpServersTimeoutMs"],
	reportPrepareStatus: ["reportPrepareStatus"],
	resolveConversationConfig: ["resolveConversationConfig"],
	refineConversationConfig: ["refineConversationConfig"],
	beforePrompt: ["beforePrompt"],
	prepareConversationPrompt: ["prepareConversationPrompt"],
	getConversationRuntimeRevision: ["getConversationRuntimeRevision"],
	createConversationAdmission: ["createConversationAdmission"],
	checkWorkspaceAccess: ["checkWorkspaceAccess"],
	acquireLocalHttpRuntime: ["acquireLocalHttpRuntime"],
	releaseLocalHttpRuntime: ["releaseLocalHttpRuntime"],
	resolveArtifactToolRules: ["resolveArtifactToolRules"]
};
var GROUP_HOOK_KEYS = {
	launch: /* @__PURE__ */ new Set([
		"resolveCommand",
		"contributeEnv",
		"resolveMcpServers",
		"resolveMcpEnv",
		"resolveMcpServersTimeoutMs",
		"reportPrepareStatus",
		"resolveConversationConfig",
		"refineConversationConfig",
		"beforePrompt"
	]),
	prompt: /* @__PURE__ */ new Set(["prepareConversationPrompt", "getConversationRuntimeRevision"]),
	lifecycle: /* @__PURE__ */ new Set([
		"createConversationAdmission",
		"checkWorkspaceAccess",
		"acquireLocalHttpRuntime",
		"releaseLocalHttpRuntime"
	]),
	resources: /* @__PURE__ */ new Set(["resolveArtifactToolRules"])
};
function declaredConversationHookNames(plugin) {
	const workerDeclared = Object.entries(flattenConversationPluginHooks(plugin)).flatMap(([key, value]) => typeof value === "function" ? [...HOOK_KEY_TO_NAMES[key] ?? []] : []);
	const resourceDeclared = Object.entries(plugin.hooks.resources ?? {}).flatMap(([key, value]) => typeof value === "function" ? [...HOOK_KEY_TO_NAMES[key] ?? []] : []);
	return [...workerDeclared, ...resourceDeclared];
}
function validateConversationPlugin(plugin) {
	const violations = [];
	const { manifest } = plugin;
	if (!/^[a-z0-9][a-z0-9._-]{2,63}$/i.test(manifest.pluginId)) violations.push({ code: "INVALID_PLUGIN_ID" });
	if (manifest.apiVersion !== 1) violations.push({ code: "UNSUPPORTED_API_VERSION" });
	if (manifest.policyVersion !== 1) violations.push({ code: "UNSUPPORTED_POLICY_VERSION" });
	for (const groupName of [
		"launch",
		"prompt",
		"lifecycle",
		"resources"
	]) for (const [key, value] of Object.entries(plugin.hooks[groupName] ?? {})) if (value !== void 0 && (!GROUP_HOOK_KEYS[groupName].has(key) || typeof value !== "function")) violations.push({ code: "UNKNOWN_HOOK" });
	const declaredHooks = declaredConversationHookNames(plugin);
	for (const hookName of declaredHooks) if (!CONVERSATION_HOOK_POLICIES[hookName].allowedTrust.includes(manifest.trust)) violations.push({
		code: "TRUST_NOT_ALLOWED",
		hookName
	});
	const report = {
		pluginId: manifest.pluginId,
		apiVersion: manifest.apiVersion,
		policyVersion: manifest.policyVersion,
		declaredHooks,
		valid: violations.length === 0,
		violations
	};
	return {
		...report,
		certificationHash: createConversationHookCertificationHash(report)
	};
}
function isRecord$6(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isStringRecord(value) {
	return isRecord$6(value) && Object.values(value).every((item) => typeof item === "string");
}
function isEnvContribution(value) {
	if (value === void 0) return true;
	if (!isRecord$6(value)) return false;
	return [
		"static",
		"host",
		"conversation",
		"credential"
	].every((key) => value[key] === void 0 || isStringRecord(value[key]));
}
/**
* Runtime output shape validation shared by production and conformance tests.
* Returns an internal reason key; payload contents are deliberately omitted.
*/
function validateConversationHookOutput(hookName, value) {
	switch (hookName) {
		case "resolveCommand": return value === void 0 || isRecord$6(value) && typeof value.command === "string" && (value.args === void 0 || Array.isArray(value.args) && value.args.every((item) => typeof item === "string")) ? void 0 : "worker-command-shape";
		case "contributeEnv:pre":
		case "contributeEnv:postConversationConfig":
		case "contributeEnv:postConversationConfig:expert": return isEnvContribution(value) ? void 0 : "env-contribution-shape";
		case "resolveMcpServers":
		case "beforePrompt": return value === void 0 || Array.isArray(value) ? void 0 : "array-shape";
		case "resolveMcpEnv": return value === void 0 || isStringRecord(value) ? void 0 : "env-shape";
		case "resolveMcpServersTimeoutMs": return value === void 0 || typeof value === "number" && Number.isFinite(value) && value > 0 ? void 0 : "positive-timeout";
		case "reportPrepareStatus":
		case "conversationAdmission:onInitialize":
		case "conversationAdmission:activate":
		case "conversationAdmission:dispose":
		case "acquiredRuntime:release":
		case "releaseLocalHttpRuntime": return value === void 0 ? void 0 : "void-result";
		case "resolveConversationConfig":
		case "refineConversationConfig": return value === void 0 || isRecord$6(value) ? void 0 : "conversation-config-shape";
		case "prepareConversationPrompt": return isRecord$6(value) && Object.prototype.hasOwnProperty.call(value, "prompt") ? void 0 : "prompt-result-shape";
		case "getConversationRuntimeRevision": return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? void 0 : "runtime-revision-shape";
		case "createConversationAdmission": return isRecord$6(value) && Array.isArray(value.launchArgs) && typeof value.onInitialize === "function" && typeof value.prepareSessionRequest === "function" ? void 0 : "admission-shape";
		case "conversationAdmission:prepareSessionRequest": return isRecord$6(value) && isRecord$6(value.params) ? void 0 : "session-request-shape";
		case "checkWorkspaceAccess": return isRecord$6(value) && typeof value.ok === "boolean" && typeof value.cwd === "string" ? void 0 : "workspace-access-shape";
		case "acquireLocalHttpRuntime": return isRecord$6(value) && typeof value.acpEndpoint === "string" ? void 0 : "acquired-runtime-shape";
		case "resolveArtifactToolRules": return isArtifactToolRules(value) ? void 0 : "artifact-tool-rules-shape";
		default: return "unknown-hook";
	}
}
var ARTIFACT_PATH_EXTRACTORS = /* @__PURE__ */ new Set([
	"file-path-fields",
	"bash-media-command",
	"nested-local-path",
	"present-files-input",
	"open-result-view",
	"preview-url"
]);
function isArtifactToolRules(value) {
	if (value === void 0) return true;
	if (!Array.isArray(value)) return false;
	return value.every((rule) => {
		if (!isRecord$6(rule) || typeof rule.id !== "string" || rule.id.length === 0) return false;
		if (rule.event !== "created" && rule.event !== "updated") return false;
		if (typeof rule.extractPaths !== "string" || !ARTIFACT_PATH_EXTRACTORS.has(rule.extractPaths)) return false;
		if (rule.completeWithoutStatus !== void 0 && typeof rule.completeWithoutStatus !== "boolean") return false;
		if (rule.sourceToolLabel !== void 0 && typeof rule.sourceToolLabel !== "string") return false;
		const match = rule.match;
		if (!isRecord$6(match)) return false;
		if (match.kind === "exact") return Array.isArray(match.names) && match.names.every((item) => typeof item === "string");
		if (match.kind === "includes") return Array.isArray(match.markers) && match.markers.every((item) => typeof item === "string");
		return false;
	});
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/hooks/conversation-hook-runner.ts
function isThenable(value) {
	return (typeof value === "object" && value !== null || typeof value === "function") && typeof value.then === "function";
}
function abortError(signal) {
	return signal.reason ?? new DOMException("Aborted", "AbortError");
}
/**
* The sole execution boundary for Plugin-owned Conversation hooks.
*
* It does not accept Plugin policy overrides. Logs contain identifiers and
* bounded metadata only; hook payloads, errors and stacks are never emitted.
*/
var ConversationHookRunner = class {
	constructor(plugin, options = {}) {
		this.plugin = plugin;
		this.invocationSequence = 0;
		this.report = validateConversationPlugin(plugin);
		this.logger = options.logger;
		this.now = options.now ?? performance.now.bind(performance);
		this.createInvocationId = options.createInvocationId ?? (() => `${plugin.manifest.pluginId}:${++this.invocationSequence}`);
		this.lifecycleSignal = options.lifecycleSignal;
		if (!this.report.valid) this.logger?.warn("[conversation-hook] plugin invalid", {
			pluginId: plugin.manifest.pluginId,
			apiVersion: plugin.manifest.apiVersion,
			policyVersion: plugin.manifest.policyVersion,
			violationCodes: this.report.violations.map((item) => item.code)
		});
	}
	get certificationReport() {
		return this.report;
	}
	runSync(hookName, invoke) {
		const policy = getConversationHookPolicy(hookName);
		const invocationId = this.createInvocationId();
		const start = this.now();
		if (policy.execution !== "sync") return this.handleViolation(hookName, invocationId, start, "INVALID_EXECUTION_MODE");
		if (!this.canInvoke(hookName, invocationId, start)) return this.failureResult(hookName, "INVALID_PLUGIN");
		if (this.lifecycleSignal?.aborted) {
			this.log("failed", hookName, invocationId, start, "ABORTED");
			return this.failureResult(hookName, "ABORTED", abortError(this.lifecycleSignal));
		}
		try {
			const value = invoke();
			if (isThenable(value)) return this.handleViolation(hookName, invocationId, start, "INVALID_EXECUTION_MODE");
			if (this.validateOutput(hookName, value)) return this.handleViolation(hookName, invocationId, start, "INVALID_OUTPUT");
			if (policy.timeoutMs !== void 0 && this.now() - start > policy.timeoutMs) return this.handleViolation(hookName, invocationId, start, "TIMEOUT");
			if (policy.logSuccess) this.log("completed", hookName, invocationId, start);
			return value;
		} catch (error) {
			this.log("failed", hookName, invocationId, start, "THREW");
			return this.failureResult(hookName, "THREW", error);
		}
	}
	async runAsync(hookName, invoke, parentSignal, timeoutMs, ignoreLifecycleAbort = false) {
		const policy = getConversationHookPolicy(hookName);
		const invocationId = this.createInvocationId();
		const start = this.now();
		if (policy.execution !== "async") return this.handleViolation(hookName, invocationId, start, "INVALID_EXECUTION_MODE");
		if (!this.canInvoke(hookName, invocationId, start)) return this.failureResult(hookName, "INVALID_PLUGIN");
		const budgetMs = policy.timeoutMs === void 0 ? void 0 : Math.min(Math.max(1, timeoutMs ?? policy.timeoutMs), policy.maxTimeoutMs ?? policy.timeoutMs);
		const controller = new AbortController();
		const sourceSignals = [parentSignal, ...ignoreLifecycleAbort ? [] : [this.lifecycleSignal]].filter((signal) => signal !== void 0);
		const abortListeners = /* @__PURE__ */ new Map();
		for (const signal of sourceSignals) {
			const listener = () => controller.abort(abortError(signal));
			abortListeners.set(signal, listener);
			if (signal.aborted) {
				controller.abort(abortError(signal));
				break;
			}
			signal.addEventListener("abort", listener, { once: true });
		}
		let timer;
		try {
			if (controller.signal.aborted) throw abortError(controller.signal);
			const invocation = Promise.resolve().then(() => invoke(controller.signal));
			const value = budgetMs === void 0 ? await invocation : await Promise.race([invocation, new Promise((_, reject) => {
				timer = setTimeout(() => {
					const error = new ConversationHookInvocationError({
						reason: "TIMEOUT",
						hookName,
						pluginId: this.plugin.manifest.pluginId
					});
					controller.abort(error);
					reject(error);
				}, budgetMs);
			})]);
			if (controller.signal.aborted) throw abortError(controller.signal);
			if (this.validateOutput(hookName, value)) return this.handleViolation(hookName, invocationId, start, "INVALID_OUTPUT");
			if (policy.logSuccess) this.log("completed", hookName, invocationId, start);
			return value;
		} catch (error) {
			const reason = error instanceof ConversationHookInvocationError ? error.reason : controller.signal.aborted ? "ABORTED" : "THREW";
			if (reason === "TIMEOUT") return this.handleViolation(hookName, invocationId, start, "TIMEOUT", error);
			this.log("failed", hookName, invocationId, start, reason);
			return this.failureResult(hookName, reason, error);
		} finally {
			if (timer !== void 0) clearTimeout(timer);
			for (const [signal, listener] of abortListeners) signal.removeEventListener("abort", listener);
		}
	}
	canInvoke(hookName, invocationId, start) {
		if (this.report.valid) return true;
		this.log("invalid", hookName, invocationId, start, "INVALID_PLUGIN");
		return false;
	}
	validateOutput(hookName, value) {
		return validateConversationHookOutput(hookName, value);
	}
	handleViolation(hookName, invocationId, start, reason, cause) {
		this.log(reason === "TIMEOUT" ? "timeout" : "invalid", hookName, invocationId, start, reason);
		return this.failureResult(hookName, reason, cause);
	}
	failureResult(hookName, reason, cause) {
		const policy = getConversationHookPolicy(hookName);
		if (reason === "ABORTED" && cause !== void 0) throw cause;
		if (policy.failureMode === "fail-operation" || reason === "ABORTED") {
			if (cause !== void 0 && reason === "THREW") throw cause;
			throw new ConversationHookInvocationError({
				reason,
				hookName,
				pluginId: this.plugin.manifest.pluginId,
				cause
			});
		}
	}
	log(status, hookName, invocationId, start, reasonCode) {
		const payload = {
			pluginId: this.plugin.manifest.pluginId,
			hookName,
			invocationId,
			durationMs: Math.max(0, Math.round(this.now() - start)),
			status,
			...reasonCode ? { reasonCode } : {}
		};
		if (status === "failed" || status === "invalid" || status === "timeout") {
			this.logger?.warn(`[conversation-hook] ${status}`, payload);
			return;
		}
		this.logger?.info(`[conversation-hook] ${status}`, payload);
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/hooks/create-governed-conversation-hooks.ts
function withSignal(context, signal) {
	return {
		...context,
		signal
	};
}
function governAdmission(admission, runner, parentSignal) {
	return {
		...admission,
		onInitialize: (response) => {
			runner.runSync("conversationAdmission:onInitialize", () => admission.onInitialize(response));
		},
		...admission.activate ? { activate: (send) => runner.runAsync("conversationAdmission:activate", () => admission.activate(send), parentSignal).then(() => void 0) } : {},
		prepareSessionRequest: (input) => runner.runAsync("conversationAdmission:prepareSessionRequest", () => admission.prepareSessionRequest(input), parentSignal).then((result) => result),
		...admission.dispose ? { dispose: () => runner.runAsync("conversationAdmission:dispose", () => admission.dispose(), void 0, void 0, true).then(() => void 0) } : {}
	};
}
function governAcquiredRuntime(runtime, runner) {
	return {
		...runtime,
		...runtime.release ? { release: () => runner.runAsync("acquiredRuntime:release", () => runtime.release(), void 0, void 0, true).then(() => void 0) } : {}
	};
}
/** Wraps every declared Plugin capability with Core-owned governance. */
function createGovernedConversationHooks(plugin, logger, lifecycleSignal) {
	const source = flattenConversationPluginHooks(plugin);
	const sourceResources = plugin.hooks.resources ?? {};
	const runner = new ConversationHookRunner(plugin, {
		logger,
		lifecycleSignal
	});
	const hooks = {
		...source.resolveCommand ? { resolveCommand: () => runner.runSync("resolveCommand", source.resolveCommand) } : {},
		...source.contributeEnv ? { contributeEnv: (ctx, phase, resolved) => {
			const hookName = phase === "postConversationConfig" && Boolean(resolved?.conversationConfig?.desired?.expertId) ? "contributeEnv:postConversationConfig:expert" : `contributeEnv:${phase}`;
			return runner.runAsync(hookName, (signal) => source.contributeEnv(withSignal(ctx, signal), phase, resolved), ctx.signal);
		} } : {},
		...source.resolveMcpServers ? { resolveMcpServers: (ctx, resolved) => {
			const requestedTimeout = source.resolveMcpServersTimeoutMs ? runner.runSync("resolveMcpServersTimeoutMs", () => source.resolveMcpServersTimeoutMs(ctx)) : void 0;
			return runner.runAsync("resolveMcpServers", (signal) => source.resolveMcpServers(withSignal(ctx, signal), resolved), ctx.signal, requestedTimeout);
		} } : {},
		...source.resolveMcpEnv ? { resolveMcpEnv: (ctx, servers) => runner.runSync("resolveMcpEnv", () => source.resolveMcpEnv(ctx, servers)) } : {},
		...source.resolveMcpServersTimeoutMs ? { resolveMcpServersTimeoutMs: (ctx) => runner.runSync("resolveMcpServersTimeoutMs", () => source.resolveMcpServersTimeoutMs(ctx)) } : {},
		...source.reportPrepareStatus ? { reportPrepareStatus: (ctx, status) => {
			runner.runSync("reportPrepareStatus", () => source.reportPrepareStatus(ctx, status));
		} } : {},
		...source.resolveConversationConfig ? { resolveConversationConfig: (ctx) => runner.runAsync("resolveConversationConfig", (signal) => source.resolveConversationConfig(withSignal(ctx, signal)), ctx.signal) } : {},
		...source.refineConversationConfig ? { refineConversationConfig: (ctx, config) => runner.runAsync("refineConversationConfig", (signal) => source.refineConversationConfig(withSignal(ctx, signal), config), ctx.signal) } : {},
		...source.beforePrompt ? { beforePrompt: (ctx) => runner.runAsync("beforePrompt", (signal) => source.beforePrompt(withSignal(ctx, signal)), ctx.signal) } : {},
		...source.prepareConversationPrompt ? { prepareConversationPrompt: (ctx) => runner.runAsync("prepareConversationPrompt", (signal) => source.prepareConversationPrompt(withSignal(ctx, signal)), ctx.signal).then((result) => result ?? {
			prompt: ctx.prompt,
			meta: ctx.meta
		}) } : {},
		...source.getConversationRuntimeRevision ? { getConversationRuntimeRevision: () => runner.runSync("getConversationRuntimeRevision", source.getConversationRuntimeRevision) ?? 0 } : {},
		...source.createConversationAdmission ? { createConversationAdmission: (ctx) => governAdmission(runner.runSync("createConversationAdmission", () => source.createConversationAdmission(ctx)), runner, ctx.signal) } : {},
		...source.checkWorkspaceAccess ? { checkWorkspaceAccess: (ctx) => runner.runAsync("checkWorkspaceAccess", (signal) => source.checkWorkspaceAccess(withSignal(ctx, signal)), ctx.signal).then((result) => result ?? {
			ok: true,
			cwd: ctx.cwd
		}) } : {},
		...source.acquireLocalHttpRuntime ? { acquireLocalHttpRuntime: (ctx, spec) => runner.runAsync("acquireLocalHttpRuntime", (signal) => source.acquireLocalHttpRuntime(withSignal(ctx, signal), spec), ctx.signal).then((result) => governAcquiredRuntime(result, runner)) } : {},
		...source.releaseLocalHttpRuntime ? { releaseLocalHttpRuntime: (conversationId) => runner.runAsync("releaseLocalHttpRuntime", () => source.releaseLocalHttpRuntime(conversationId), void 0, void 0, true).then(() => void 0) } : {}
	};
	const resources = sourceResources.resolveArtifactToolRules ? { resolveArtifactToolRules: () => runner.runSync("resolveArtifactToolRules", () => sourceResources.resolveArtifactToolRules()) ?? [] } : void 0;
	return {
		hooks,
		...resources ? { resources } : {},
		runner
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/config-error-detail.ts
function formatUnknownError(error) {
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
function describeUnknownError(error) {
	if (error instanceof Error) {
		const cause = error.cause;
		const code = error.code;
		const description = {
			name: error.name,
			message: error.message
		};
		if (code !== void 0) description.code = code;
		if (error.stack) description.stackHead = error.stack.split("\n").slice(0, 2).join(" | ");
		if (cause !== void 0) description.cause = cause instanceof Error ? {
			name: cause.name,
			message: cause.message,
			code: cause.code
		} : cause;
		return description;
	}
	if (typeof error === "string") return { rawString: error };
	if (error && typeof error === "object") return { rawObject: error };
	return { rawPrimitive: String(error) };
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/config-apply-executor.ts
var ConfigApplyExecutor = class {
	constructor(logSink) {
		this.logSink = logSink;
	}
	async execute(command, sessionId, send) {
		if (command.kind === "set-permission-mode") try {
			await send("session/set_mode", {
				sessionId,
				modeId: command.modeId
			});
			return true;
		} catch (error) {
			this.logSink?.warn("[config-manager] local deferred permission mode send failed", {
				transport: "local",
				sessionId,
				modeId: command.modeId,
				error: formatUnknownError(error),
				errorDetail: describeUnknownError(error)
			});
			return false;
		}
		if (command.kind === "set-config-option") return this.sendConfigOption(send, sessionId, command.configId, command.value, `local deferred ${command.configId} send failed`);
		try {
			await send("session/set_model", {
				sessionId,
				modelId: command.modelId
			});
			return true;
		} catch (error) {
			this.logSink?.warn("[config-manager] local deferred setModel send failed", {
				transport: "local",
				sessionId,
				model: command.modelId,
				error: formatUnknownError(error),
				errorDetail: describeUnknownError(error)
			});
			return false;
		}
	}
	async sendConfigOption(send, sessionId, configId, value, failEvent) {
		const payload = {
			sessionId,
			configId,
			value
		};
		try {
			await send("session/set_config_option", payload);
			return true;
		} catch {
			try {
				await send("session/set_config_option", payload);
				return true;
			} catch (error) {
				this.logSink?.warn(`[config-manager] ${failEvent}`, {
					transport: "local",
					sessionId,
					configId,
					value,
					error: error instanceof Error ? error.message : String(error)
				});
				return false;
			}
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/expert-selection-policy.ts
function sameExpertSelection(current, next) {
	return current?.id === next?.id && current?.marketExpertId === next?.marketExpertId && current?.marketplace === next?.marketplace && current?.runtimeIdentity === next?.runtimeIdentity && current?.locale === next?.locale;
}
function validateExpertSelection(expert) {
	if (!expert) return;
	if (expert.id.length === 0 || expert.id.length > 256 || hasAsciiControlCharacter(expert.id)) return {
		errorCode: "INVALID_EXPERT_ID",
		message: "Invalid expert id"
	};
	if (expert.marketplace && (expert.marketplace.length > 128 || expert.marketplace === "." || expert.marketplace.includes("..") || hasAsciiControlCharacter(expert.marketplace) || expert.marketplace.includes("/") || expert.marketplace.includes("\\"))) return {
		errorCode: "INVALID_EXPERT_MARKETPLACE",
		message: "Invalid expert marketplace"
	};
}
function hasAsciiControlCharacter(value) {
	for (const character of value) {
		const code = character.charCodeAt(0);
		if (code < 32 || code === 127) return true;
	}
	return false;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/config-apply-planner.ts
var LAUNCH_FIELDS = ["mode", "expert"];
function optionalConfigCommands(snapshot) {
	const { desired } = snapshot;
	const commands = [];
	if (desired.permissionMode && snapshot.dirtyFields.has("permissionMode")) commands.push({
		field: "permissionMode",
		kind: "set-permission-mode",
		modeId: desired.permissionMode,
		failure: "soft"
	});
	if (desired.thoughtLevel !== void 0 && (desired.thoughtLevel !== "" || snapshot.dirtyFields.has("thoughtLevel"))) commands.push({
		field: "thoughtLevel",
		kind: "set-config-option",
		configId: "thought_level",
		value: desired.thoughtLevel,
		failure: "soft"
	});
	if (desired.preMessageCompactPct !== void 0 && (desired.preMessageCompactPct !== "" || snapshot.dirtyFields.has("preMessageCompactPct"))) commands.push({
		field: "preMessageCompactPct",
		kind: "set-config-option",
		configId: "preMessageCompactPct",
		value: desired.preMessageCompactPct,
		failure: "soft"
	});
	if (desired.contextWindow !== void 0 && (desired.contextWindow !== "" || snapshot.dirtyFields.has("contextWindow"))) commands.push({
		field: "contextWindow",
		kind: "set-config-option",
		configId: "context_window",
		value: desired.contextWindow,
		failure: "soft"
	});
	return commands;
}
function createLocalConfigApplyPlan(snapshot) {
	const restartFields = LAUNCH_FIELDS.filter((field) => snapshot.dirtyFields.has(field));
	const afterAttach = optionalConfigCommands(snapshot);
	if (snapshot.dirtyFields.has("model") && snapshot.desired.model) afterAttach.unshift({
		field: "model",
		kind: "set-model",
		modelId: snapshot.desired.model,
		failure: "soft"
	});
	return {
		snapshotEpoch: snapshot.epoch,
		restart: restartFields.length > 0,
		restartFields,
		afterAttach
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/config-journal.ts
function cloneDesired(config) {
	return {
		...config,
		expert: config.expert ? { ...config.expert } : void 0
	};
}
var ImmutableReadonlySet = class {
	constructor(values) {
		this.valuesSet = new Set(values);
		Object.freeze(this);
	}
	get size() {
		return this.valuesSet.size;
	}
	has(value) {
		return this.valuesSet.has(value);
	}
	entries() {
		return this.valuesSet.entries();
	}
	keys() {
		return this.valuesSet.keys();
	}
	values() {
		return this.valuesSet.values();
	}
	forEach(callbackfn, thisArg) {
		this.valuesSet.forEach((value) => callbackfn.call(thisArg, value, value, this));
	}
	[Symbol.iterator]() {
		return this.values();
	}
	get [Symbol.toStringTag]() {
		return "Set";
	}
};
var ConfigJournal = class {
	constructor(initial) {
		this.desiredEpoch = 0;
		this.dirtyEpochByField = /* @__PURE__ */ new Map();
		this.appliedByGeneration = /* @__PURE__ */ new Map();
		this.desired = cloneDesired(initial);
	}
	commit(patch, dirtyFields) {
		const epoch = ++this.desiredEpoch;
		this.desired = cloneDesired({
			...this.desired,
			...patch
		});
		for (const field of dirtyFields) this.dirtyEpochByField.set(field, epoch);
		return this.capture();
	}
	capture() {
		const desired = cloneDesired(this.desired);
		if (desired.expert) Object.freeze(desired.expert);
		return Object.freeze({
			epoch: this.desiredEpoch,
			desired: Object.freeze(desired),
			dirtyFields: new ImmutableReadonlySet(this.dirtyEpochByField.keys())
		});
	}
	hasDirty(fields) {
		if (!fields) return this.dirtyEpochByField.size > 0;
		return fields.some((field) => this.dirtyEpochByField.has(field));
	}
	completeApply(completion) {
		const { snapshot, fields, targetGeneration, currentGeneration } = completion;
		if (targetGeneration !== void 0 && targetGeneration !== currentGeneration) return false;
		const generation = targetGeneration ?? currentGeneration ?? 0;
		const previous = this.appliedByGeneration.get(generation);
		const appliedFields = new Set(previous?.fields ?? []);
		for (const field of fields) {
			appliedFields.add(field);
			const dirtyEpoch = this.dirtyEpochByField.get(field);
			if (dirtyEpoch !== void 0 && dirtyEpoch <= snapshot.epoch) this.dirtyEpochByField.delete(field);
		}
		this.appliedByGeneration.set(generation, {
			epoch: Math.max(previous?.epoch ?? 0, snapshot.epoch),
			fields: appliedFields
		});
		return true;
	}
	appliedAt(generation) {
		const applied = this.appliedByGeneration.get(generation);
		return applied ? Object.freeze({
			epoch: applied.epoch,
			fields: new ImmutableReadonlySet(applied.fields)
		}) : void 0;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/local-config-journal-controller.ts
var LocalConfigJournalController = class {
	constructor(initial, getGeneration) {
		this.getGeneration = getGeneration;
		this.journal = new ConfigJournal(initial);
	}
	capturePrompt() {
		const snapshot = this.journal.capture();
		const expert = snapshot.desired.expert ? Object.freeze({ ...snapshot.desired.expert }) : void 0;
		return Object.freeze({
			epoch: snapshot.epoch,
			mode: snapshot.desired.mode,
			model: snapshot.desired.model,
			expert,
			permissionMode: snapshot.desired.permissionMode,
			thoughtLevel: snapshot.desired.thoughtLevel,
			contextWindow: snapshot.desired.contextWindow,
			preMessageCompactPct: snapshot.desired.preMessageCompactPct,
			applyToken: snapshot
		});
	}
	snapshotOf(snapshot) {
		return snapshot?.applyToken ?? this.journal.capture();
	}
	plan(snapshot) {
		return createLocalConfigApplyPlan(snapshot);
	}
	hasLaunchWork(snapshot) {
		return this.plan(snapshot).restart;
	}
	hasDirty(fields) {
		return this.journal.hasDirty(fields);
	}
	commit(patch, fields) {
		return this.journal.commit(patch, fields);
	}
	complete(snapshot, fields, targetGeneration = this.getGeneration(), currentGeneration = this.getGeneration()) {
		return this.journal.completeApply({
			snapshot,
			fields,
			targetGeneration,
			currentGeneration
		});
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/config/prompt-config-reservation-queue.ts
var PROMPT_CONFIG_RESERVATION = Symbol("prompt-config-reservation");
var PromptConfigReservationQueue = class {
	constructor(capturePrompt, fallbackSnapshotOf) {
		this.capturePrompt = capturePrompt;
		this.fallbackSnapshotOf = fallbackSnapshotOf;
		this.tail = Promise.resolve();
	}
	enqueue(operation) {
		const result = this.tail.then(operation, operation);
		this.tail = result.then(() => void 0, () => void 0);
		return result;
	}
	reserve() {
		let resolveSnapshot;
		let rejectSnapshot;
		let releaseBarrier;
		const snapshotPromise = new Promise((resolve, reject) => {
			resolveSnapshot = resolve;
			rejectSnapshot = reject;
		});
		const barrier = new Promise((resolve) => {
			releaseBarrier = resolve;
		});
		let released = false;
		const operation = this.tail.then(() => {
			const promptSnapshot = this.capturePrompt();
			const reservation = {
				kind: PROMPT_CONFIG_RESERVATION,
				snapshot: promptSnapshot.applyToken,
				release: () => {
					if (released) return;
					released = true;
					releaseBarrier();
				}
			};
			resolveSnapshot(Object.freeze({
				...promptSnapshot,
				applyToken: reservation
			}));
			return barrier;
		}).catch((error) => {
			rejectSnapshot(error);
			releaseBarrier();
		});
		this.tail = operation.then(() => void 0, () => void 0);
		return snapshotPromise;
	}
	snapshotOf(snapshot) {
		return this.reservationOf(snapshot)?.snapshot ?? this.fallbackSnapshotOf(snapshot);
	}
	run(snapshot, operation) {
		const reservation = this.reservationOf(snapshot);
		if (reservation) return operation(reservation.snapshot);
		return this.enqueue(() => operation(this.snapshotOf(snapshot)));
	}
	refresh(snapshot) {
		const refreshed = this.capturePrompt();
		const reservation = this.reservationOf(snapshot);
		if (!reservation) return refreshed;
		reservation.snapshot = refreshed.applyToken;
		return Object.freeze({
			...refreshed,
			applyToken: reservation
		});
	}
	release(snapshot) {
		this.reservationOf(snapshot)?.release();
	}
	reservationOf(snapshot) {
		const token = snapshot?.applyToken;
		return token?.kind === PROMPT_CONFIG_RESERVATION ? token : void 0;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-config-manager.ts
var MODES_WITHOUT_EXPERT$1 = /* @__PURE__ */ new Set(["plan", "ask"]);
function shouldClearExpertForMode$1(mode) {
	return MODES_WITHOUT_EXPERT$1.has(mode);
}
/** 组装共享一个配置事务的 UI ConfigManager 与 prompt 发送屏障。 */
function createLocalConfigManagerRuntime(init) {
	const configManager = new LocalConfigManager(init);
	return {
		configManager,
		promptRuntimeGate: configManager.createPromptRuntimeGate()
	};
}
var LocalConfigManager = class extends require_conversations.ConfigManagerImpl {
	/** @internal 创建与本实例共享事务队列的 Prompt 配置屏障。 */
	createPromptRuntimeGate() {
		return {
			captureSnapshot: () => this.configTransactions.reserve(),
			prepareExpertSelection: (input) => this.preparePromptExpertSelection(input.expertId, input.snapshot),
			needsSync: (snapshot) => this.configJournal.hasLaunchWork(this.configTransactions.snapshotOf(snapshot)),
			ensureReady: (input) => this.ensurePromptConfigReady(input.mode, input.snapshot),
			flushAfterSessionAttach: (input) => this.configTransactions.run(input.snapshot, (snapshot) => this.applyDeferredConfigForPrompt({
				...input,
				snapshot
			})),
			commitModelSelection: (input) => this.commitPromptModelSelection(input),
			releaseSnapshot: (snapshot) => this.configTransactions.release(snapshot)
		};
	}
	constructor(init) {
		super(init);
		this._connection = init?.connection;
		this._sessionId = init?.sessionId;
		this.persistConfig = init?.persistConfig;
		this.onExpertCleared = init?.onExpertCleared;
		this.configJournal = new LocalConfigJournalController({
			mode: this._mode,
			model: this._model,
			expert: this._expert,
			permissionMode: this._permissionMode,
			thoughtLevel: this._thoughtLevel,
			contextWindow: this._contextWindow,
			preMessageCompactPct: this._preMessageCompactPct
		}, () => this.runtimeGeneration());
		this.configTransactions = new PromptConfigReservationQueue(() => this.configJournal.capturePrompt(), (snapshot) => this.configJournal.snapshotOf(snapshot));
		this.configApplyExecutor = new ConfigApplyExecutor(this.logSink);
	}
	/** 兼容固定连接注入；ConversationImpl 使用动态运行时绑定。 */
	attachConnection(connection, sessionId) {
		this._connection = connection;
		this._sessionId = sessionId;
	}
	/** 动态读取当前连接与 ACP sessionId，避免 session/new 重新发号或重连后沿用旧值。 */
	attachRuntimeConnection(runtime) {
		this._runtimeConnection = runtime;
	}
	runtimeConnection() {
		return this._runtimeConnection?.getConnection() ?? this._connection;
	}
	runtimeSessionId() {
		return this._runtimeConnection?.getSessionId() ?? this._sessionId;
	}
	runtimeGeneration() {
		return this.runtimeConnection()?.generation;
	}
	async ensurePromptConfigReady(mode, snapshot) {
		await this.configTransactions.run(snapshot, (journalSnapshot) => this.applyDeferredLaunchSpecForPrompt(mode, journalSnapshot));
		return this.configTransactions.refresh(snapshot);
	}
	async preparePromptExpertSelection(expertId, snapshot) {
		await this.configTransactions.run(snapshot, async () => {
			const next = expertId ? { id: expertId } : void 0;
			if (validateExpertSelection(next)) return;
			const nextMode = next ? "craft" : this._mode;
			if (sameExpertSelection(this._expert, next) && this._mode === nextMode) return;
			const previousMode = this._mode;
			try {
				await this.persistExpertSelection(next, next ? "craft" : void 0);
			} catch {
				return;
			}
			this._expert = next;
			this._mode = nextMode;
			this.configJournal.commit({
				expert: next,
				mode: nextMode
			}, previousMode === nextMode ? ["expert"] : ["expert", "mode"]);
		});
		return this.configTransactions.refresh(snapshot);
	}
	async commitPromptModelSelection(input) {
		await this.configTransactions.run(input.snapshot, async () => {
			await super.setModel(input.model);
			const committed = this.configJournal.commit({ model: input.model }, ["model"]);
			if (input.applied && input.isGenerationCurrent?.() !== false) this.configJournal.complete(committed, ["model"], input.generation);
		});
		return this.configTransactions.refresh(input.snapshot);
	}
	/**
	* 注入 Scene Mode 切换的运行时能力（idle 守卫 + sidecar 重启）。
	* 由 ConversationImpl 在构造末尾调用（对称 {@link attachConnection}）。
	*
	* 这是 mode 切换的轻量通道；expert 切换使用 attachRuntimeLifecycle 的完整事务，
	* 二者共享同一配置串行队列，避免 rollback 与后续 mode 更新互相覆盖。
	*/
	attachRuntimeRefresh(refresh) {
		this._runtimeRefresh = refresh;
	}
	/** 注入 expert 切换的完整事务生命周期。 */
	attachRuntimeLifecycle(lifecycle) {
		this._expertRuntimeLifecycle = lifecycle;
	}
	setExpert(expert) {
		return this.enqueueConfigChange(() => this.performExpertChange(expert));
	}
	setMode(mode) {
		return this.enqueueConfigChange(() => this.applyModeSelection(mode, { deferRuntimeApply: true }));
	}
	async applyModeSelection(mode, options = {}) {
		const prevMode = this._mode;
		const shouldClearExpert = shouldClearExpertForMode$1(mode);
		const applyForCurrentPrompt = Boolean(options.allowDuringPromptDispatch && options.requireRuntimeReady);
		const deferRuntimeApply = options.deferRuntimeApply === true && !options.requireRuntimeReady;
		if (prevMode === mode) {
			if (shouldClearExpert && this._expert) {
				const sameModeGuard = deferRuntimeApply || options.allowDuringPromptDispatch ? void 0 : await this._runtimeRefresh?.assertIdle?.();
				if (sameModeGuard) return sameModeGuard;
				await this.persistExpertSelection(void 0);
				this._expert = void 0;
				const snapshot = this.configJournal.commit({ expert: void 0 }, ["expert"]);
				if (deferRuntimeApply) return;
				await this.refreshRuntimeForMode(mode, options.requireRuntimeReady, applyForCurrentPrompt);
				if (!applyForCurrentPrompt) this.configJournal.complete(snapshot, ["expert"]);
			} else if (options.requireRuntimeReady) await this.refreshRuntimeForMode(mode, true, applyForCurrentPrompt);
			return;
		}
		const guard = deferRuntimeApply || options.allowDuringPromptDispatch ? void 0 : await this._runtimeRefresh?.assertIdle?.();
		if (guard) return guard;
		this.logSink?.info("[config-manager] local setMode", {
			transport: "local",
			sessionId: this.runtimeSessionId(),
			prevMode,
			nextMode: mode,
			hasConnection: !!this.runtimeConnection(),
			deferRuntimeApply
		});
		try {
			if (this.onModeChange) await this.onModeChange(mode);
			else await this.persistConfig?.({ mode });
		} catch (error) {
			this.logSink?.warn("[config-manager] local setMode persist failed", {
				transport: "local",
				sessionId: this.runtimeSessionId(),
				nextMode: mode,
				error: formatUnknownError(error),
				errorDetail: describeUnknownError(error)
			});
			throw error;
		}
		this._mode = mode;
		this._permissionMode = "";
		if (shouldClearExpert) this._expert = void 0;
		const launchFields = shouldClearExpert ? [
			"mode",
			"expert",
			"permissionMode"
		] : ["mode", "permissionMode"];
		const snapshot = this.configJournal.commit({
			mode,
			permissionMode: "",
			...shouldClearExpert ? { expert: void 0 } : {}
		}, launchFields);
		if (deferRuntimeApply) return;
		const restarted = await this.refreshRuntimeForMode(mode, options.requireRuntimeReady, applyForCurrentPrompt);
		if (!applyForCurrentPrompt) this.configJournal.complete(snapshot, launchFields);
		this.logSink?.info("[config-manager] local setMode runtime refreshed", {
			transport: "local",
			sessionId: this.runtimeSessionId(),
			nextMode: mode,
			workerRestarted: restarted
		});
	}
	/** Prompt 出站前按捕获快照收敛 launch dirty。 */
	async applyDeferredLaunchSpecForPrompt(mode, snapshot) {
		const plan = this.configJournal.plan(snapshot);
		if (mode !== snapshot.desired.mode) {
			await this.applyModeSelection(mode, {
				allowDuringPromptDispatch: true,
				requireRuntimeReady: true
			});
			return;
		}
		if (!plan.restart) {
			if (mode !== this._mode) await this.applyModeSelection(mode, {
				allowDuringPromptDispatch: true,
				requireRuntimeReady: true
			});
			return;
		}
		await this.refreshRuntimeForMode(snapshot.desired.mode, true, true);
	}
	async applyDeferredConfigForPrompt(input) {
		const plan = this.configJournal.plan(input.snapshot);
		if (input.isGenerationCurrent?.() === false) return;
		if (plan.restartFields.length > 0) this.configJournal.complete(input.snapshot, plan.restartFields, input.generation);
		const commands = plan.afterAttach.filter((command) => input.phase === void 0 || input.phase === "model" && command.kind === "set-model" || input.phase === "runtime-options" && command.kind !== "set-model");
		for (const command of commands) {
			if (input.isGenerationCurrent?.() === false) return;
			if (await this.configApplyExecutor.execute(command, input.sessionId, input.send)) {
				if (input.isGenerationCurrent?.() === false) return;
				this.configJournal.complete(input.snapshot, [command.field], input.generation);
			}
		}
		if (input.isGenerationCurrent?.() === false) return;
		const commandFields = new Set(commands.map((command) => command.field));
		const completedWithoutCommand = (input.phase === "model" ? ["model"] : input.phase === "runtime-options" ? [
			"permissionMode",
			"thoughtLevel",
			"contextWindow",
			"preMessageCompactPct"
		] : []).filter((field) => input.snapshot.dirtyFields.has(field) && !commandFields.has(field));
		if (completedWithoutCommand.length > 0) this.configJournal.complete(input.snapshot, completedWithoutCommand, input.generation);
	}
	/** 兼容无 gate 装配：显式 set_model 成功后推进当前 model epoch。 */
	markModelApplied() {
		const snapshot = this.configJournal.snapshotOf();
		this.configJournal.complete(snapshot, ["model"]);
	}
	enqueueConfigChange(operation) {
		return this.configTransactions.enqueue(operation);
	}
	async performExpertChange(expert) {
		const next = expert ? { ...expert } : void 0;
		const invalid = validateExpertSelection(next);
		if (invalid) return invalid;
		const nextMode = next ? "craft" : this._mode;
		if (sameExpertSelection(this._expert, next) && this._mode === nextMode) return;
		const guard = await this._expertRuntimeLifecycle?.beforeExpertChange?.();
		if (guard) return guard;
		const previousExpert = this._expert ? { ...this._expert } : void 0;
		const previousMode = this._mode;
		try {
			await this.persistExpertSelection(next, next ? "craft" : void 0);
			this._expert = next;
			this._mode = nextMode;
			this.configJournal.commit({
				expert: next,
				mode: nextMode
			}, previousMode === nextMode ? ["expert"] : ["expert", "mode"]);
			this.logSink?.info("[LocalConfigManager] expert persisted deferred-runtime", {
				conversationId: this.runtimeSessionId(),
				transition: previousExpert ? next ? "active→active" : "active→null" : next ? "null→active" : "noop"
			});
			if (previousExpert && !next) {
				const conversationId = this.runtimeSessionId();
				if (conversationId) try {
					this.onExpertCleared?.(conversationId);
				} catch (error) {
					this.logSink?.warn("[LocalConfigManager] onExpertCleared callback failed", {
						conversationId,
						error: formatUnknownError(error)
					});
				}
			}
		} finally {
			this._expertRuntimeLifecycle?.completeExpertChange?.();
			this.logSink?.info("[LocalConfigManager] completeExpertChange", {
				conversationId: this.runtimeSessionId(),
				finalExpertId: this._expert?.id,
				launchDirty: this.configJournal.hasDirty(["mode", "expert"])
			});
		}
	}
	async persistExpertSelection(expert, mode) {
		if (this.persistConfig) {
			await this.persistConfig({
				...require_conversations.expertPatchFromPersistOptions(expert?.id ?? "", {
					locale: expert?.locale,
					marketplace: expert?.marketplace,
					marketExpertId: expert?.marketExpertId,
					runtimeIdentity: expert?.runtimeIdentity
				}),
				...mode ? { mode } : {}
			});
			return;
		}
		await super.setExpert(expert ?? null);
		if (mode && mode !== this._mode) await this.onModeChange?.(mode);
	}
	async refreshRuntimeForMode(mode, failOnError = false, applyForCurrentPrompt = false) {
		try {
			return await this._runtimeRefresh?.refreshRuntime?.(applyForCurrentPrompt ? { applyForCurrentPrompt: true } : void 0) === true;
		} catch (error) {
			this.logSink?.warn("[config-manager] local setMode runtime refresh failed", {
				transport: "local",
				sessionId: this.runtimeSessionId(),
				nextMode: mode,
				error: formatUnknownError(error),
				errorDetail: describeUnknownError(error)
			});
			if (failOnError) throw error;
			return false;
		}
	}
	setModel(model) {
		return this.enqueueConfigChange(async () => {
			await super.setModel(model);
			this.configJournal.commit({ model }, ["model"]);
		});
	}
	/** 持久化并热下发 reasoning effort（#87957）。 */
	setThoughtLevel(value) {
		return this.enqueueConfigChange(() => this.applyThoughtLevel(value));
	}
	async applyThoughtLevel(value) {
		await this.persistConfig?.({ thoughtLevel: value || null });
		await super.setThoughtLevel(value);
		const snapshot = this.configJournal.commit({ thoughtLevel: value }, ["thoughtLevel"]);
		const connection = this.runtimeConnection();
		const sessionId = this.runtimeSessionId();
		if (connection && sessionId) {
			const generation = this.runtimeGeneration();
			if (await this.sendConfigOption(connection, sessionId, "thought_level", value, "local setThoughtLevel send failed")) this.configJournal.complete(snapshot, ["thoughtLevel"], generation);
		}
	}
	/** 热下发 Max Mode compact pct（#90955）。 */
	setPreMessageCompactPct(value) {
		return this.enqueueConfigChange(() => this.applyPreMessageCompactPct(value));
	}
	async applyPreMessageCompactPct(value) {
		await super.setPreMessageCompactPct(value);
		const snapshot = this.configJournal.commit({ preMessageCompactPct: value }, ["preMessageCompactPct"]);
		const connection = this.runtimeConnection();
		const sessionId = this.runtimeSessionId();
		if (connection && sessionId) {
			const generation = this.runtimeGeneration();
			this.sendConfigOption(connection, sessionId, "preMessageCompactPct", value, "local setPreMessageCompactPct send failed").then((applied) => {
				if (applied) this.configJournal.complete(snapshot, ["preMessageCompactPct"], generation);
			}).catch(() => void 0);
		}
	}
	/** 持久化并热下发 context window；空串清除 override（#90769/#57413）。 */
	setContextWindow(value) {
		return this.enqueueConfigChange(() => this.applyContextWindow(value));
	}
	async applyContextWindow(value) {
		const parsedValue = value === "" ? null : Number(value);
		if (parsedValue !== null && !Number.isFinite(parsedValue)) return {
			errorCode: "INVALID_PARAMS",
			message: "context_window must be a finite number"
		};
		await this.persistConfig?.({ contextWindow: parsedValue });
		await super.setContextWindow(value);
		const snapshot = this.configJournal.commit({ contextWindow: value }, ["contextWindow"]);
		const connection = this.runtimeConnection();
		const sessionId = this.runtimeSessionId();
		if (connection && sessionId) {
			const generation = this.runtimeGeneration();
			if (await this.sendConfigOption(connection, sessionId, "context_window", value, "local setContextWindow send failed")) this.configJournal.complete(snapshot, ["contextWindow"], generation);
		}
	}
	setPermissionMode(mode) {
		return this.enqueueConfigChange(() => this.applyPermissionMode(mode));
	}
	async applyPermissionMode(mode) {
		const prevPermissionMode = this._permissionMode;
		await super.setPermissionMode(mode);
		const snapshot = this.configJournal.commit({ permissionMode: mode }, ["permissionMode"]);
		const connection = this.runtimeConnection();
		const sessionId = this.runtimeSessionId();
		const sessionAttached = this._runtimeConnection?.isSessionAttached ? this._runtimeConnection.isSessionAttached() : true;
		this.logSink?.info("[config-manager] local setPermissionMode", {
			transport: "local",
			sessionId,
			prevPermissionMode,
			nextPermissionMode: mode,
			hasConnection: !!connection,
			sessionAttached
		});
		if (connection && sessionId && sessionAttached) {
			const generation = this.runtimeGeneration();
			connection.send("session/set_mode", {
				sessionId,
				modeId: mode
			}).then(() => {
				this.configJournal.complete(snapshot, ["permissionMode"], generation);
			}).catch((error) => {
				this.logSink?.warn("[config-manager] local setPermissionMode send failed", {
					transport: "local",
					sessionId,
					nextPermissionMode: mode,
					error: formatUnknownError(error),
					errorDetail: describeUnknownError(error)
				});
			});
		}
	}
	/**
	* 安全中心沙箱开关热更新 · Issue #113404。
	*
	* 先持久化 `use_sandbox_cli`，再向已挂载会话下发 `sandbox` config option；
	* 没有活跃连接时由下次 runtime 启动从持久化配置恢复。
	*/
	setSandboxMode(enabled) {
		return this.enqueueConfigChange(() => this.performSandboxModeChange(enabled));
	}
	async performSandboxModeChange(enabled) {
		await super.setSandboxMode(enabled);
		const connection = this.runtimeConnection();
		const sessionId = this.runtimeSessionId();
		const sessionAttached = this._runtimeConnection?.isSessionAttached ? this._runtimeConnection.isSessionAttached() : true;
		if (connection && sessionId && sessionAttached) await this.sendConfigOption(connection, sessionId, "sandbox", enabled ? "true" : "false", "local setSandboxMode send failed");
	}
	/** 第一次失败后再打一帧；等待重试结束以保持同一配置的调用顺序，最终失败只记日志。 */
	async sendConfigOption(connection, sessionId, configId, value, failEvent) {
		return this.configApplyExecutor.sendConfigOption((method, params) => connection.send(method, params), sessionId, configId, value, failEvent);
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/acp-http/client-method-registry.ts
var ACP_CLIENT_METHOD_WIRES = {
	elicitation_complete: "elicitation/complete",
	elicitation_create: "elicitation/create",
	fs_read_text_file: "fs/read_text_file",
	fs_write_text_file: "fs/write_text_file",
	mcp_connect: "mcp/connect",
	mcp_disconnect: "mcp/disconnect",
	mcp_message: "mcp/message",
	session_request_permission: "session/request_permission",
	session_update: "session/update",
	terminal_create: "terminal/create",
	terminal_kill: "terminal/kill",
	terminal_output: "terminal/output",
	terminal_release: "terminal/release",
	terminal_wait_for_exit: "terminal/wait_for_exit"
};
var AcpMethodNotFoundError = class extends Error {
	constructor(method) {
		super(`"Method not found": ${method}`);
		this.code = -32601;
		this.name = "AcpMethodNotFoundError";
		this.data = { method };
	}
};
var R = ACP_CLIENT_METHOD_WIRES;
var LOCAL_CLIENT_EXTENSION_METHOD_REGISTRATIONS = [{
	wireName: "_codebuddy.ai/question",
	gate: "capability",
	capabilityPaths: ["_meta/codebuddy.ai/question"],
	defaultCapabilities: [{
		path: "_meta/codebuddy.ai/question",
		value: true
	}],
	securityClass: "conversation",
	staleGenerationResult: "empty"
}, {
	wireName: "_codebuddy.ai/delegateTool",
	gate: "allow",
	securityClass: "conversation",
	staleGenerationResult: "empty"
}];
var LOCAL_CLIENT_METHOD_REGISTRATIONS = [
	{
		wireName: R.session_update,
		kind: "notification",
		gate: "allow",
		securityClass: "conversation",
		staleGenerationResult: "drop",
		handlerKey: "sessionUpdate",
		defaultCapabilities: [
			{
				path: "_meta/codebuddy.ai/terminalOutput",
				value: true
			},
			{
				path: "_meta/codebuddy.ai/terminalOutputChunk",
				value: true
			},
			{
				path: "_meta/workbuddy.desktop/detailedCheckpoint",
				value: true
			}
		]
	},
	{
		wireName: R.session_request_permission,
		kind: "request",
		gate: "allow",
		securityClass: "conversation",
		staleGenerationResult: "cancelled",
		handlerKey: "requestPermission"
	},
	{
		wireName: R.elicitation_create,
		kind: "request",
		gate: "capability",
		capabilityPaths: ["elicitation/form", "elicitation/url"],
		securityClass: "conversation",
		staleGenerationResult: "cancelled",
		handlerKey: "unstable_createElicitation",
		defaultCapabilities: [
			{
				path: "elicitation/form",
				value: {}
			},
			{
				path: "elicitation/url",
				value: {}
			},
			{
				path: "_meta/codebuddy.ai/weixinpay/interception",
				value: true
			}
		]
	},
	{
		wireName: R.elicitation_complete,
		kind: "notification",
		gate: "capability",
		capabilityPaths: ["elicitation/url"],
		securityClass: "conversation",
		staleGenerationResult: "drop",
		handlerKey: "unstable_completeElicitation"
	},
	{
		wireName: R.fs_read_text_file,
		kind: "request",
		gate: "deny",
		capabilityPaths: ["fs/readTextFile"],
		defaultCapabilities: [{
			path: "fs/readTextFile",
			value: false
		}],
		securityClass: "filesystem",
		staleGenerationResult: "empty"
	},
	{
		wireName: R.fs_write_text_file,
		kind: "request",
		gate: "deny",
		capabilityPaths: ["fs/writeTextFile"],
		defaultCapabilities: [{
			path: "fs/writeTextFile",
			value: false
		}],
		securityClass: "filesystem",
		staleGenerationResult: "empty"
	},
	{
		wireName: R.terminal_create,
		kind: "request",
		gate: "deny",
		capabilityPaths: ["terminal"],
		defaultCapabilities: [{
			path: "terminal",
			value: false
		}],
		securityClass: "terminal",
		staleGenerationResult: "empty"
	},
	...[
		R.terminal_kill,
		R.terminal_output,
		R.terminal_release,
		R.terminal_wait_for_exit
	].map((wireName) => ({
		wireName,
		kind: "request",
		gate: "deny",
		capabilityPaths: ["terminal"],
		securityClass: "terminal",
		staleGenerationResult: "empty"
	})),
	...[
		R.mcp_connect,
		R.mcp_disconnect,
		R.mcp_message
	].map((wireName) => ({
		wireName,
		kind: "request",
		gate: "deny",
		securityClass: "mcp",
		staleGenerationResult: "empty"
	}))
];
function cloneCapabilityValue(value) {
	if (Array.isArray(value)) return value.map(cloneCapabilityValue);
	if (!value || typeof value !== "object") return value;
	return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, cloneCapabilityValue(child)]));
}
function cloneCapabilities(value) {
	const cloned = cloneCapabilityValue(value);
	return cloned && typeof cloned === "object" && !Array.isArray(cloned) ? cloned : {};
}
function setCapabilityPath(target, path, value) {
	const segments = path.split("/");
	let cursor = target;
	for (const segment of segments.slice(0, -1)) {
		const current = cursor[segment];
		if (!current || typeof current !== "object" || Array.isArray(current)) cursor[segment] = {};
		cursor = cursor[segment];
	}
	cursor[segments.at(-1)] = cloneCapabilityValue(value);
}
function capabilityAt(target, path) {
	return path.split("/").reduce((current, segment) => current && typeof current === "object" ? current[segment] : void 0, target);
}
function isCapabilityEnabled(value) {
	return value !== void 0 && value !== null && value !== false;
}
var ClientMethodRegistry = class {
	constructor(requestedCapabilities, registrations = LOCAL_CLIENT_METHOD_REGISTRATIONS, extensionMethods = LOCAL_CLIENT_EXTENSION_METHOD_REGISTRATIONS) {
		this.registrations = registrations;
		this.extensionMethods = extensionMethods;
		const capabilities = cloneCapabilities(requestedCapabilities);
		if (requestedCapabilities === void 0) for (const registration of [...registrations, ...extensionMethods]) for (const contribution of registration.defaultCapabilities ?? []) setCapabilityPath(capabilities, contribution.path, contribution.value);
		for (const registration of registrations) {
			if (registration.gate !== "deny") continue;
			for (const path of registration.capabilityPaths ?? []) setCapabilityPath(capabilities, path, false);
		}
		this.clientCapabilities = capabilities;
	}
	isHandlerEnabled(handlerKey) {
		const registration = this.registrations.find((entry) => entry.handlerKey === handlerKey);
		return registration ? this.isRegistrationEnabled(registration) : false;
	}
	listedWires() {
		return this.registrations.map((entry) => entry.wireName).sort();
	}
	staleGenerationResultFor(handlerKey) {
		return this.registrations.find((entry) => entry.handlerKey === handlerKey)?.staleGenerationResult;
	}
	isExtensionMethodEnabled(method) {
		const registration = this.extensionMethods.find((entry) => entry.wireName === method);
		if (!registration || registration.gate === "deny") return false;
		if (registration.gate === "allow") return true;
		return (registration.capabilityPaths ?? []).some((path) => isCapabilityEnabled(capabilityAt(this.clientCapabilities, path)));
	}
	isInboundRequestEnabled(method, params) {
		const registration = this.registrations.find((entry) => entry.wireName === method);
		if (!registration) return this.isExtensionMethodEnabled(method);
		if (registration.kind !== "request" || !this.isRegistrationEnabled(registration)) return false;
		if (registration.wireName !== ACP_CLIENT_METHOD_WIRES.elicitation_create) return true;
		const mode = params && typeof params === "object" ? params.mode : void 0;
		return this.isElicitationModeEnabled(mode);
	}
	isElicitationModeEnabled(mode) {
		if (mode !== "form" && mode !== "url") return false;
		return isCapabilityEnabled(capabilityAt(this.clientCapabilities, `elicitation/${mode}`));
	}
	isRegistrationEnabled(registration) {
		if (registration.gate === "allow") return true;
		if (registration.gate === "deny") return false;
		return (registration.capabilityPaths ?? []).some((path) => isCapabilityEnabled(capabilityAt(this.clientCapabilities, path)));
	}
};
new ClientMethodRegistry().clientCapabilities;
new Set(LOCAL_CLIENT_METHOD_REGISTRATIONS.filter((entry) => entry.gate !== "deny").map((entry) => entry.wireName));
new Set(LOCAL_CLIENT_METHOD_REGISTRATIONS.filter((entry) => entry.gate === "deny").map((entry) => entry.wireName));
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/launch-spec-diff.ts
/** fingerprint 的输入项中，能在 LaunchSpec 上直接读到的那些。 */
var COMPARABLE_KEYS = [
	"command",
	"args",
	"mcpServers",
	"sessionSettings",
	"beforePromptRequests",
	"requiredPluginIds"
];
/** 稳定序列化：对象按 key 排序递归，数组保序。与 fingerprint 的序列化口径一致。 */
function stableStringify$1(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
	if (Array.isArray(value)) return `[${value.map(stableStringify$1).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify$1(record[key])}`).join(",")}}`;
}
function diffEnvKeys(previous, next) {
	const before = previous ?? {};
	const after = next ?? {};
	return [.../* @__PURE__ */ new Set([...Object.keys(before), ...Object.keys(after)])].filter((key) => before[key] !== after[key]).sort();
}
/** previous 缺失时返回 undefined（首次连接没有基线可比）。 */
function diffLaunchSpecs(previous, next) {
	if (!previous) return;
	const changed = COMPARABLE_KEYS.filter((key) => stableStringify$1(previous[key]) !== stableStringify$1(next[key]));
	const envChangedKeys = diffEnvKeys(previous.env, next.env);
	if (envChangedKeys.length > 0) changed.push("env");
	return {
		changed,
		...envChangedKeys.length > 0 ? { envChangedKeys } : {},
		...changed.length === 0 ? { unexplained: true } : {}
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/evaluate-runtime-restart.ts
var LAUNCH_SPEC_STABILITY_FLAGS = [
	"--model",
	"--system-prompt-file",
	"--prompt-vars-file"
];
function listDroppedLaunchSpecStabilityFlags(committedArgs, nextArgs) {
	if (!committedArgs || nextArgs === void 0) return [];
	return LAUNCH_SPEC_STABILITY_FLAGS.filter((flag) => committedArgs.includes(flag) && !nextArgs.includes(flag));
}
/**
* 解析残缺：两条全部为真才算残缺。
* (a) committed.args 含 `--model` / `--system-prompt-file` / `--prompt-vars-file` 之一，
*     next.args 丢掉了其中至少一个
* (b) (next.args?.length ?? 0) < (committed.args?.length ?? 0)
*
* 缺 args（`next.args === undefined`）时失败闭合：不当残缺，允许重启。
*/
function isLaunchSpecParseIncomplete(committed, next) {
	if (next.args === void 0) return false;
	const committedArgs = committed.args ?? [];
	if (listDroppedLaunchSpecStabilityFlags(committedArgs, next.args).length === 0) return false;
	return next.args.length < committedArgs.length;
}
function evaluateRuntimeRestartDecision(input) {
	if (input.connecting || input.lastFingerprint === void 0) return {
		kind: "uncommitted",
		restart: false,
		logEvent: "runtime refresh skipped (connecting or fingerprint uncommitted)",
		logCtx: {
			sessionId: input.sessionId,
			state: input.state
		}
	};
	if (input.next === void 0) return { kind: "need-next" };
	if (input.next.restartFingerprint === input.lastFingerprint) return {
		kind: "unchanged",
		restart: false,
		logEvent: "runtime refresh skipped (fingerprint unchanged)",
		logCtx: { sessionId: input.sessionId }
	};
	if (input.currentLaunchSpec !== void 0 && isLaunchSpecParseIncomplete(input.currentLaunchSpec, input.next)) return {
		kind: "incomplete",
		restart: false,
		logEvent: "runtime refresh skipped (incomplete spec)",
		logCtx: {
			sessionId: input.sessionId,
			missingFlags: listDroppedLaunchSpecStabilityFlags(input.currentLaunchSpec.args, input.next.args),
			committedArgsCount: input.currentLaunchSpec.args?.length ?? 0,
			nextArgsCount: input.next.args?.length ?? 0,
			previousFingerprint: input.lastFingerprint,
			nextFingerprint: input.next.restartFingerprint
		}
	};
	return {
		kind: "restart",
		restart: true,
		logEvent: "runtime refresh requires worker restart",
		logCtx: {
			sessionId: input.sessionId,
			previousFingerprint: input.lastFingerprint,
			nextFingerprint: input.next.restartFingerprint,
			...diffLaunchSpecs(input.currentLaunchSpec, input.next) ?? {}
		}
	};
}
async function runRuntimeRestartEvaluation(input) {
	const gate = evaluateRuntimeRestartDecision(input);
	if (gate.kind === "uncommitted") {
		input.log(gate.logEvent, gate.logCtx);
		return false;
	}
	const next = await input.resolveNext();
	const decision = evaluateRuntimeRestartDecision({
		...input,
		next
	});
	if (decision.kind === "need-next" || decision.kind === "uncommitted") {
		if (decision.kind === "uncommitted") input.log(decision.logEvent, decision.logCtx);
		return false;
	}
	input.log(decision.logEvent, decision.logCtx);
	return decision.restart;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/utils/log-throttle/index.ts
var REAL_CLOCK = {
	now: () => Date.now(),
	setInterval: (fn, ms) => setInterval(fn, ms),
	clearInterval: (handle) => clearInterval(handle)
};
var DEFAULT_RATE_PER_SEC = 20;
var DEFAULT_FLUSH_INTERVAL_MS = 5e3;
var RateLimitedLogger = class {
	constructor(options) {
		this.suppressed = /* @__PURE__ */ new Map();
		this.disposed = false;
		this.tag = options.tag;
		this.capacity = options.ratePerSec ?? DEFAULT_RATE_PER_SEC;
		this.refillPerMs = this.capacity / 1e3;
		this.flushIntervalMs = options.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS;
		this.sink = options.sink ?? ((line) => {
			console.log(line);
		});
		this.clock = options.clock ?? REAL_CLOCK;
		this.tokens = this.capacity;
		this.lastRefillAt = this.clock.now();
	}
	/** 关键帧：生命周期 / 状态迁移 / 错误 / 竞态防护。永不限流。 */
	keyframe(event, ctx) {
		if (this.disposed) return;
		this.sink(this.format(event, ctx));
	}
	/** 高频帧：request 计时 / notification 等。token-bucket 限流，超额只计数不打。 */
	highFreq(event, ctx) {
		if (this.disposed) return;
		this.refill();
		if (this.tokens >= 1) {
			this.tokens -= 1;
			this.sink(this.format(event, ctx));
			return;
		}
		this.suppressed.set(event, (this.suppressed.get(event) ?? 0) + 1);
		this.ensureFlushTimer();
	}
	/** 立即 flush 抑制摘要（dispose 前 / 测试驱动用）。 */
	flushSuppressed() {
		if (this.suppressed.size === 0) return;
		const parts = [];
		for (const [event, count] of this.suppressed) parts.push(`${event} x${count}`);
		this.suppressed.clear();
		this.sink(this.format("suppressed high-freq logs", {
			window: `${this.flushIntervalMs}ms`,
			detail: parts.join(", ")
		}));
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.flushSuppressed();
		if (this.flushTimer !== void 0) {
			this.clock.clearInterval(this.flushTimer);
			this.flushTimer = void 0;
		}
	}
	refill() {
		const now = this.clock.now();
		const elapsed = now - this.lastRefillAt;
		if (elapsed <= 0) return;
		this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillPerMs);
		this.lastRefillAt = now;
	}
	/** 有抑制发生时才起 flush 定时器（避免空转）。 */
	ensureFlushTimer() {
		if (this.flushTimer !== void 0) return;
		this.flushTimer = this.clock.setInterval(() => {
			this.flushSuppressed();
			if (this.suppressed.size === 0 && this.flushTimer !== void 0) {
				this.clock.clearInterval(this.flushTimer);
				this.flushTimer = void 0;
			}
		}, this.flushIntervalMs);
	}
	format(event, ctx) {
		const meta = ctx ? " " + JSON.stringify(ctx) : "";
		return `[${this.tag}] ${event}${meta}`;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/resolve-outbound-prompt-images.ts
/**
* 出站 image block 解析：白名单 blobs 读成原始 base64；路径形态非白名单图丢块。
*
* 三步合同（步骤 1 失败必须落到 2/3，禁止对无扩展名 `/9j/` 在 realpath 失败后无条件丢图）：
*   1) blobPath 或「绝对路径+图片扩展名」且 realpath 落在 blobs 根下 → 读盘，data 换成原始 base64
*   2) 否则若像文件系统路径（绝对路径+图片扩展名，含假 data URI 尾巴）→ 丢块，且不 fs.open
*   3) 其余（JPEG/PNG 魔数、短 AAAA、真 data URI）原样
*/
var IMAGE_EXT_RE = /\.(?:png|jpe?g|gif|webp|bmp)$/i;
var FAKE_DATA_URI_PREFIX = /^data:image\/[A-Za-z0-9.+-]+;base64,/;
async function resolveOutboundPromptImages(blocks, options) {
	const blobsRoot = options?.blobsRoot ?? defaultBlobsRoot();
	const outbound = [];
	let resolved = 0;
	let dropped = 0;
	for (const block of blocks) {
		if (block?.type !== "image") {
			outbound.push(block);
			continue;
		}
		if (typeof block.uri === "string" && block.uri.startsWith("http")) {
			outbound.push(block);
			continue;
		}
		const outcome = await resolveImageBlock(block, blobsRoot);
		if (outcome === void 0) {
			dropped += 1;
			continue;
		}
		if (outcome !== block) resolved += 1;
		outbound.push(outcome);
	}
	if (resolved > 0 || dropped > 0) options?.log?.("outbound prompt images", {
		resolved,
		dropped
	});
	return outbound;
}
function defaultBlobsRoot() {
	return node_path.join(process.env.WORKBUDDY_CONFIG_DIR || node_path.join(node_os.homedir(), ".workbuddy"), "blobs");
}
async function resolveImageBlock(block, blobsRoot) {
	const blobPath = readBlobPath(block);
	const data = typeof block.data === "string" ? block.data : void 0;
	const dataPath = data === void 0 ? void 0 : parseFilesystemImagePath(data);
	const candidate = blobPath ?? dataPath;
	if (candidate !== void 0 && (blobPath !== void 0 || isAbsolutePathWithImageExt(candidate))) {
		if (isLexicalBlobsPath(candidate, blobsRoot)) {
			const base64 = await tryReadWhitelistedBlob(candidate, blobsRoot);
			if (base64 !== void 0) return {
				...block,
				data: base64
			};
			return;
		}
	}
	if (dataPath !== void 0 && isAbsolutePathWithImageExt(dataPath)) return;
	return block;
}
async function tryReadWhitelistedBlob(candidate, blobsRoot) {
	try {
		const realRoot = await node_fs_promises.realpath(blobsRoot);
		const realFile = await node_fs_promises.realpath(candidate);
		if (!isPathInside$1(realFile, realRoot)) return;
		if (!(await node_fs_promises.stat(realFile)).isFile()) return;
		return (await node_fs_promises.readFile(realFile)).toString("base64");
	} catch {
		return;
	}
}
function readBlobPath(block) {
	const meta = block._meta;
	if (!meta || typeof meta !== "object" || Array.isArray(meta)) return;
	const blobPath = meta.blobPath;
	return typeof blobPath === "string" && blobPath.length > 0 ? blobPath : void 0;
}
function parseFilesystemImagePath(data) {
	if (isAbsolutePathWithImageExt(data)) return data;
	const match = data.match(FAKE_DATA_URI_PREFIX);
	if (!match) return;
	const tail = data.slice(match[0].length);
	return isAbsolutePathWithImageExt(tail) ? tail : void 0;
}
function isAbsolutePathWithImageExt(value) {
	return (node_path.win32.isAbsolute(value) || node_path.posix.isAbsolute(value)) && IMAGE_EXT_RE.test(value);
}
function isLexicalBlobsPath(candidate, blobsRoot) {
	return isPathInside$1(node_path.resolve(candidate), node_path.resolve(blobsRoot));
}
function isPathInside$1(candidate, root) {
	const relative = node_path.relative(root, candidate);
	return relative === "" || !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/session-control-prompt.ts
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
/** 把公共 Conversation clear/compact 标记转换为 agent-cli 已支持的 ACP request-level meta。 */
function normalizeSessionControlPrompt(method, params, now = Date.now()) {
	if (method !== "session/prompt" || !Array.isArray(params?.prompt)) return params;
	const control = asRecord(params.prompt.find((block) => asRecord(block)["codebuddy.ai/sessionControl"] === "clear" || asRecord(block)["codebuddy.ai/sessionControl"] === "compact"))[require_conversations.CONVERSATION_SESSION_CONTROL_KEY];
	if (!control) return params;
	const meta = asRecord(params._meta);
	const codebuddyMeta = asRecord(meta["codebuddy.ai"]);
	const controlMeta = control === "clear" ? {
		isClearSession: true,
		clearMessageId: `session-separator-${now}`,
		clearExtra: { isSessionSeparator: true },
		clearCreateTime: now
	} : { isCompactSession: true };
	return {
		...params,
		prompt: [],
		_meta: {
			...meta,
			"codebuddy.ai": {
				...codebuddyMeta,
				...controlMeta
			}
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/outbound-request.ts
var isSessionStart = (method) => method === "session/load" || method === "session/new" || method === "session/resume";
var ACP_PROMPT = "session/prompt";
var ACP_CANCEL = "session/cancel";
function normalizeOutboundAcpImages(blocks) {
	return blocks.map((block) => block?.type === "image" && typeof block.uri === "string" && block.uri.startsWith("http") && typeof block.data !== "string" ? {
		...block,
		data: ""
	} : block);
}
/** Coordinates cancellation that arrives while a local Prompt is still being prepared. */
var OutboundPromptCancellation = class {
	constructor() {
		this.epoch = 0;
	}
	capture(method) {
		return method === ACP_PROMPT ? this.epoch : void 0;
	}
	recordNotification(method) {
		if (method === ACP_CANCEL) this.epoch += 1;
	}
	wasCancelled(capturedEpoch) {
		return capturedEpoch !== void 0 && capturedEpoch !== this.epoch;
	}
};
/** Shared ACP payload preparation for stdio and local HTTP transports. */
async function prepareOutboundRequest(options) {
	const controlAwareParams = normalizeSessionControlPrompt(options.method, options.params);
	let effectiveParams = isSessionStart(options.method) && options.launchSpec ? {
		...controlAwareParams,
		mcpServers: options.launchSpec.mcpServers
	} : controlAwareParams;
	const promptField = options.method === "session/prompt" ? "prompt" : options.method === "session/steer" ? "contentBlocks" : void 0;
	if (promptField && effectiveParams) {
		const originalMeta = effectiveParams._meta && typeof effectiveParams._meta === "object" ? effectiveParams._meta : void 0;
		const prompt = effectiveParams[promptField];
		const prepared = options.prepareConversationPrompt ? await options.prepareConversationPrompt({
			conversationId: options.conversationId,
			cwd: options.cwd,
			prompt,
			...originalMeta ? { meta: originalMeta } : {},
			hasPriorUserMessages: options.hasPriorUserMessages,
			...options.sessionId ? { workbuddySessionId: options.sessionId } : {}
		}) : void 0;
		const materialized = materializeConversationPromptComposition(composeConversationPrompt({
			prompt,
			...originalMeta ? { meta: originalMeta } : {},
			...prepared ? { prepared } : {}
		}));
		effectiveParams = {
			...effectiveParams,
			[promptField]: materialized.prompt,
			...materialized.meta ? { _meta: { ...materialized.meta } } : {}
		};
	}
	if (options.method === "session/prompt" && Array.isArray(effectiveParams?.prompt)) {
		const prompt = effectiveParams.prompt;
		options.log("session/prompt blocks", {
			blockCount: prompt.length,
			blocks: prompt.map((block) => {
				const missing = [];
				if (block?.type === "image") {
					if (typeof block.data !== "string" || !block.data) missing.push("data");
					if (typeof block.mimeType !== "string" || !block.mimeType) missing.push("mimeType");
				}
				if (block?.type === "resource_link") {
					if (typeof block.name !== "string" || !block.name) missing.push("name");
					if (typeof block.uri !== "string" || !block.uri) missing.push("uri");
				}
				return {
					type: block?.type,
					missing
				};
			})
		});
		const sendable = prompt.filter((block) => !require_conversations.isIllegalPromptImageBlock(block));
		if (prompt.length > 0 && sendable.length === 0) throw options.makeInvalidParamsError({
			code: -32602,
			message: "Invalid params"
		});
		const inboundPrompt = require_conversations.materializeConversationRuntimePrompt(sendable) ?? sendable;
		const outboundPrompt = normalizeOutboundAcpImages(await resolveOutboundPromptImages(inboundPrompt, { log: options.log }));
		if (inboundPrompt.length > 0 && outboundPrompt.length === 0) options.log("dropped all outbound prompt images", {
			method: options.method,
			inbound: inboundPrompt.length
		});
		effectiveParams = {
			...effectiveParams,
			prompt: outboundPrompt
		};
	}
	if (options.method === "session/steer" && Array.isArray(effectiveParams?.contentBlocks)) {
		const contentBlocks = effectiveParams.contentBlocks;
		const inboundBlocks = require_conversations.materializeConversationRuntimePrompt(contentBlocks) ?? contentBlocks;
		const outboundBlocks = normalizeOutboundAcpImages(await resolveOutboundPromptImages(inboundBlocks, { log: options.log }));
		if (inboundBlocks.length > 0 && outboundBlocks.length === 0) options.log("dropped all outbound prompt images", {
			method: options.method,
			inbound: inboundBlocks.length
		});
		effectiveParams = {
			...effectiveParams,
			contentBlocks: outboundBlocks
		};
	}
	return effectiveParams;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/runtime-preparation.ts
/** Per-worker singleflight for launch-spec requests that must precede prompt traffic. */
var RuntimePreparationCoordinator = class {
	constructor(host) {
		this.host = host;
		this.prompt = {};
	}
	reset() {
		this.prompt.preparedGeneration = void 0;
		this.prompt.inflight = void 0;
	}
	beforePrompt() {
		const state = this.prompt;
		const generation = this.host.getGeneration();
		if (state.preparedGeneration === generation) return Promise.resolve();
		if (state.inflight?.generation === generation) return state.inflight.promise;
		const requests = this.host.getLaunchSpec()?.beforePromptRequests;
		const tracked = (async () => {
			for (const request of requests ?? []) await this.host.sendRequest(request.method, request.params, request.timeoutMs);
			if (this.host.getGeneration() !== generation) throw this.host.makeConnectionLostError("prompt");
			state.preparedGeneration = generation;
		})().finally(() => {
			if (state.inflight?.promise === tracked) state.inflight = void 0;
		});
		state.inflight = {
			generation,
			promise: tracked
		};
		return tracked;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/stdio-pipe/pipe.ts
/** 脏帧摘要保留前 N 字节（脱敏，不整帧 dump）。 */
var DIRTY_FRAME_SUMMARY_BYTES = 64;
/** 连续 parse 失败超过此阈值 → 从 PROTOCOL_PARSE 升级为 PROTOCOL_MISMATCH。 */
var DEFAULT_PARSE_ERROR_THRESHOLD = 8;
function connErr(code, message, retryable, cause) {
	return {
		code,
		message,
		retryable,
		cause
	};
}
var StdioPipe = class {
	constructor(options) {
		this.buffer = "";
		this.nextId = 1;
		this.pending = /* @__PURE__ */ new Map();
		this.lateIds = /* @__PURE__ */ new Set();
		this.notificationHandlers = /* @__PURE__ */ new Set();
		this.errorHandlers = /* @__PURE__ */ new Set();
		this.inboundQueue = [];
		this.inboundSeq = 0;
		this.flushScheduled = false;
		this.parseErrorCount = 0;
		this.lateCount = 0;
		this.unknownCount = 0;
		this.backpressureCount = 0;
		this.closed = false;
		this.closeHandlers = /* @__PURE__ */ new Set();
		this.decoder = new TextDecoder();
		this.onDataBound = (chunk) => this.onChunk(chunk);
		this.onStdoutEndBound = () => this.handleStreamEnd();
		this.onStdoutErrorBound = (err) => this.handleStreamError(err);
		this.onStdinErrorBound = (err) => this.handleStreamError(err);
		this.stdin = options.stdin;
		this.stdout = options.stdout;
		this.parseErrorThreshold = options.parseErrorThreshold ?? DEFAULT_PARSE_ERROR_THRESHOLD;
		this.stdout.on("data", this.onDataBound);
		this.stdout.on("end", this.onStdoutEndBound);
		this.stdout.on("error", this.onStdoutErrorBound);
		this.stdin.on("error", this.onStdinErrorBound);
	}
	/** 订阅通道断开（stdout end/error、stdin error、显式 close）。用于上层更新 state。 */
	onClose(handler) {
		this.closeHandlers.add(handler);
		return () => this.closeHandlers.delete(handler);
	}
	sendRequest(method, params, options) {
		if (this.closed) return Promise.reject(connErr("CONNECTION_LOST", "pipe closed", true));
		const id = this.nextId++;
		const timeoutMs = options?.timeoutMs;
		return new Promise((resolve, reject) => {
			const entry = {
				resolve,
				reject,
				method
			};
			if (timeoutMs !== void 0) entry.timer = setTimeout(() => {
				this.pending.delete(id);
				this.lateIds.add(id);
				reject(connErr("REQUEST_TIMEOUT", `request timeout: ${method}`, true));
			}, timeoutMs);
			this.pending.set(id, entry);
			this.write({
				jsonrpc: "2.0",
				id,
				method,
				params
			});
		});
	}
	sendNotification(method, params) {
		if (this.closed) return;
		this.write({
			jsonrpc: "2.0",
			method,
			params
		});
	}
	onNotification(handler) {
		this.notificationHandlers.add(handler);
		return () => this.notificationHandlers.delete(handler);
	}
	/** 单消费者：覆盖式赋值；返回的 unsubscribe 只在仍是当前 handler 时清除。 */
	onRequest(handler) {
		this.requestHandler = handler;
		return () => {
			if (this.requestHandler === handler) this.requestHandler = void 0;
		};
	}
	onError(handler) {
		this.errorHandlers.add(handler);
		return () => this.errorHandlers.delete(handler);
	}
	/** 观测计数快照（供上层日志/trace）。queued/backpressure 暴露生产-消费失衡。 */
	getCounters() {
		return {
			pending: this.pending.size,
			late: this.lateCount,
			unknown: this.unknownCount,
			parseError: this.parseErrorCount,
			queued: this.inboundQueue.length,
			backpressure: this.backpressureCount
		};
	}
	/**
	* 断连清理：pending 全 reject + clearTimeout，解绑 stdout 监听。
	* 幂等。等待中的 worker→client permission 请求统一 reject；上层（LocalConnection）只发布一次 Conversation 失效通知。
	*/
	close(reason) {
		if (this.closed) return;
		this.closed = true;
		this.stdout.off("data", this.onDataBound);
		this.stdout.off("end", this.onStdoutEndBound);
		this.stdout.off("error", this.onStdoutErrorBound);
		this.stdin.off("error", this.onStdinErrorBound);
		this.inboundQueue.length = 0;
		const err = reason ?? connErr("CONNECTION_LOST", "pipe closed", true);
		for (const [, entry] of this.pending) {
			if (entry.timer) clearTimeout(entry.timer);
			entry.reject(err);
		}
		this.pending.clear();
		for (const handler of this.closeHandlers) try {
			handler(err);
		} catch {}
		this.closeHandlers.clear();
	}
	onChunk(chunk) {
		if (this.closed) return;
		this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
		const lines = this.buffer.split("\n");
		this.buffer = lines.pop() ?? "";
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed) continue;
			this.inboundQueue.push({
				seq: ++this.inboundSeq,
				line: trimmed
			});
		}
		this.scheduleFlush();
	}
	/** 微批调度：一个 microtask 内 flush 队列，避免同步分发一个大 chunk 内全部帧阻塞 read loop。 */
	scheduleFlush() {
		if (this.flushScheduled || this.inboundQueue.length === 0) return;
		this.flushScheduled = true;
		queueMicrotask(() => this.flushInbound());
	}
	/** 严格 FIFO 逐帧路由。close 后不处理（残帧丢弃，见 close 清空队列）。 */
	flushInbound() {
		this.flushScheduled = false;
		while (!this.closed && this.inboundQueue.length > 0) {
			const frame = this.inboundQueue.shift();
			this.parseAndRoute(frame.line, frame.seq);
		}
	}
	parseAndRoute(line, seq) {
		let msg;
		try {
			msg = JSON.parse(line);
		} catch {
			this.parseErrorCount++;
			const summary = line.slice(0, DIRTY_FRAME_SUMMARY_BYTES);
			const suffix = line.length > DIRTY_FRAME_SUMMARY_BYTES ? "…" : "";
			this.emitError(connErr("PROTOCOL_PARSE", `parse fail: ${summary}${suffix}`, true));
			if (this.parseErrorCount > this.parseErrorThreshold) this.emitError(connErr("PROTOCOL_MISMATCH", `parse errors exceeded ${this.parseErrorThreshold}`, false));
			return;
		}
		this.route(msg, seq);
	}
	route(msg, seq) {
		const hasId = msg.id !== void 0 && msg.id !== null;
		if (hasId && (msg.result !== void 0 || msg.error !== void 0)) this.resolveResponse(msg);
		else if (hasId && msg.method) this.handleWorkerRequest(msg).catch(() => {});
		else if (msg.method) this.dispatchNotification(msg, seq);
	}
	resolveResponse(msg) {
		const id = msg.id;
		const entry = this.pending.get(id);
		if (!entry) {
			if (this.lateIds.has(id)) this.lateCount++;
			else this.unknownCount++;
			return;
		}
		if (entry.timer) clearTimeout(entry.timer);
		this.pending.delete(id);
		if (msg.error) entry.reject(connErr("REQUEST_ERROR", msg.error.message || "worker request error", false, msg.error));
		else entry.resolve(msg.result);
	}
	async handleWorkerRequest(msg) {
		const id = msg.id;
		const method = msg.method;
		if (!this.requestHandler) {
			this.write({
				jsonrpc: "2.0",
				id,
				error: {
					code: -32601,
					message: `no handler for ${method}`
				}
			});
			return;
		}
		try {
			const result = await this.requestHandler(method, msg.params);
			if (this.closed) return;
			this.write({
				jsonrpc: "2.0",
				id,
				result
			});
		} catch (e) {
			if (this.closed) return;
			const message = e instanceof Error ? e.message : String(e);
			const error = e && typeof e === "object" ? e : void 0;
			const code = typeof error?.code === "number" ? error.code : -32603;
			this.write({
				jsonrpc: "2.0",
				id,
				error: {
					code,
					message,
					...error?.data === void 0 ? {} : { data: error.data }
				}
			});
		}
	}
	dispatchNotification(msg, seq) {
		for (const handler of this.notificationHandlers) try {
			handler(msg.method, msg.params, seq);
		} catch (e) {
			this.emitError(connErr("NOTIFICATION_HANDLER_ERROR", e instanceof Error ? e.message : String(e), true, e));
		}
	}
	handleStreamEnd() {
		if (this.closed) return;
		this.close(connErr("CONNECTION_LOST", "stdout stream ended", true));
	}
	handleStreamError(err) {
		if (this.closed) return;
		this.close(connErr("CONNECTION_LOST", `stdout stream error: ${err.message}`, true, err));
	}
	write(msg) {
		try {
			if (!this.stdin.write(JSON.stringify(msg) + "\n")) this.backpressureCount++;
		} catch (e) {
			this.close(connErr("CONNECTION_LOST", `write failed: ${e instanceof Error ? e.message : String(e)}`, true, e));
		}
	}
	emitError(error) {
		for (const handler of this.errorHandlers) try {
			handler(error);
		} catch {}
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/workspace-precheck.ts
var CONVERSATION_WORKSPACE_UNAVAILABLE_BIZ_CODE = SESSION_CWD_UNAVAILABLE_BIZ_CODE;
/**
* Conversation Engine 本地运行时的工作空间不可用错误。
*
* `bizCode` 供 ConversationTerminalError 归一化，`data.code` 保留 JSON-RPC
* 兼容形状；两者都必须是 4011，确保错误能经 CHANNEL_ERROR 投影到 UI banner。
*/
var ConversationWorkspaceUnavailableError = class extends Error {
	constructor(message, data) {
		super(message);
		this.bizCode = CONVERSATION_WORKSPACE_UNAVAILABLE_BIZ_CODE;
		this.name = "ConversationWorkspaceUnavailableError";
		this.data = {
			code: CONVERSATION_WORKSPACE_UNAVAILABLE_BIZ_CODE,
			...data
		};
	}
};
function unavailableFromFsError(cwd, error) {
	const errno = error.code;
	const reason = classifySessionCwdErrno(errno);
	if (reason === "unknown") throw error;
	return new ConversationWorkspaceUnavailableError(reason === "missing" ? `Conversation workspace does not exist or was removed: ${cwd}` : `Permission denied for conversation workspace: ${cwd}`, {
		cwd,
		reason,
		errno,
		systemMessage: error instanceof Error ? error.message : String(error)
	});
}
/** 校验本地 Conversation cwd，供连接建立和活跃 worker 的 prompt 出站边界复用。 */
async function assertConversationWorkspaceUsable(cwd) {
	let stat;
	try {
		stat = await node_fs.promises.stat(cwd);
	} catch (error) {
		throw unavailableFromFsError(cwd, error);
	}
	if (!stat.isDirectory()) throw new ConversationWorkspaceUnavailableError(`Conversation workspace path is not a directory: ${cwd}`, {
		cwd,
		reason: "not_a_directory"
	});
	try {
		await node_fs.promises.access(cwd, node_fs.constants.R_OK | node_fs.constants.X_OK);
	} catch (error) {
		throw unavailableFromFsError(cwd, error);
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/constants.ts
/**
* stdio ACP 模式启动 flag。worker 带此 flag 才进 AcpModeStrategy（stdin/stdout ndJSON），
* 否则退回交互模式把 initialize 当 prompt。worker-spawner 默认 args、withAcpFlag 归一化、
* desktop 装配注入三处统一引用，避免字符串漂移。
*/
var ACP_MODE_ARG = "--acp";
/**
* LocalConnection worker 的 argv0 前缀（`ps` COMMAND 首段）。
* 完整形态：`wb-acp:<conversationId>`，便于 `ps | grep wb-acp:` / 按会话 id 排查（#84563）。
*/
var ACP_WORKER_ARGV0_PREFIX = "wb-acp:";
/** 注入 worker env，与 argv0 双通道关联会话（environ / 诊断脚本可读）。 */
var WORKBUDDY_CONVERSATION_ID_ENV = "WORKBUDDY_CONVERSATION_ID";
/** 构造可 grep 的 worker argv0；非法 id 时回落为前缀本身。 */
function buildAcpWorkerArgv0(conversationId) {
	const id = conversationId.trim();
	if (!id || /[\s\0]/.test(id)) return ACP_WORKER_ARGV0_PREFIX.slice(0, -1);
	return `${ACP_WORKER_ARGV0_PREFIX}${id}`;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/worker-spawner/cli-process-env.ts
/**
* WorkBuddy CLI 子进程 env 硬规则 —— 白名单 hostEnv + 黑名单剥离 + managedEnv 覆盖。
*
* ─── 来源与同步策略 ─────────────────────────────────────────────────
*
* 从 `packages/workbuddy-server/src/common/cli-process-env.ts` **原样复制**过来。
* 复制而非跨包 import 的原因：
* - `packages/workbuddy-core`（本文件所在）是底层核心，不能反向依赖 `workbuddy-server`
*   （依赖方向：server → core，反过来禁止）
* - 抬到 core 层需要动跨包依赖 + 调整多处 import；release/5.4.0 hotfix 走复制更快
*
* ⚠️ 后续如需修改黑名单/白名单，请两处同步：
*   - `packages/workbuddy-server/src/common/cli-process-env.ts`（老 sidecar / prewarm）
*   - 本文件（新架构 worker-spawner）
* 待条件允许时再考虑上抬到独立 `@genie/agent-cli-runtime-env` 包统一维护。
*
* ─── 语义 ────────────────────────────────────────────────────────────
*
* `buildCliProcessEnv(managedEnv, hostEnv)`：
* 1. 遍历 hostEnv（即 `process.env`），按 canonical UPPERCASE 过滤 `ENV_BLOCKED_KEYS`
*    与 `ENV_BLOCKED_PREFIXES`，剥离父进程 ambient 里可能污染子进程的变量
* 2. `{ ...passedEnv, ...managedEnv }` —— managedEnv 最后 spread，为权威覆盖
* 3. macOS 场景自动生成/挂载 `NODE_EXTRA_CA_CERTS`（keychain 抓 MITM 代理根证书，供
*    Whistle/Charles 调试）
*
* ─── 修 issue #87521 ─────────────────────────────────────────────────
*
* 旧 `buildWorkerEnv` 直接 `{ ...process.env, ...whitelist }`，父进程遗留的
* `CODEBUDDY_API_KEY` / `ELECTRON_*` / `ACC_PRODUCT_CONFIG_V3` 等被原样带入 CLI
* 子进程，触发 401 → checkToLogout → 假登出。改走本模块的黑名单过滤后修正。
*/
/**
* Static managed overlay for every WorkBuddy-spawned CLI process, applied by
* both the cold sidecar-session path and the prewarm pool. The prewarm acquire
* gate compares the two paths' managed envs for exact equality, so these keys
* must come from this single definition rather than per-site literals.
*/
var CLI_STATIC_MANAGED_ENV = {
	ELECTRON_RUN_AS_NODE: "1",
	CODEBUDDY_DISABLE_IDE: "1",
	SERVER__PORT: "0",
	SERVER__HOST: "127.0.0.1"
};
/**
* Environment variable prefixes that must not leak from a host process into
* an agent-cli process. Managed values may still be supplied explicitly via
* `managedEnv`.
*/
var ENV_BLOCKED_PREFIXES = [
	"CODEBUDDY_",
	"ELECTRON_",
	"VITE_",
	"ACC_PRODUCT_CONFIG_"
];
/**
* Exact environment variable names that can change Node/Electron bootstrap or
* networking semantics and therefore must come from the managed environment.
*/
var ENV_BLOCKED_KEYS = /* @__PURE__ */ new Set([
	"NODE_OPTIONS",
	"NODE_CHANNEL_FD",
	"NODE_CHANNEL_SERIALIZATION_MODE",
	"NODE_PATH",
	"NODE_DEBUG",
	"NODE_DEBUG_NATIVE",
	"NODE_REPL_HISTORY",
	"NODE_PENDING_DEPRECATION",
	"NODE_REDIRECT_WARNINGS",
	"NODE_EXTRA_CA_CERTS",
	"NODE_TLS_REJECT_UNAUTHORIZED",
	"SSL_CERT_FILE",
	"SSL_CERT_DIR",
	"OPENSSL_CONF",
	"HTTP_PROXY",
	"HTTPS_PROXY",
	"ALL_PROXY",
	"NO_PROXY",
	"http_proxy",
	"https_proxy",
	"all_proxy",
	"no_proxy",
	"WORKBUDDY_PROXY_SOURCE",
	"WORKBUDDY_PAC_RPC_SOCKET",
	"WORKBUDDY_PAC_RPC_TOKEN",
	"WORKBUDDY_ROUTE_RPC_SOCKET",
	"WORKBUDDY_ROUTE_RPC_TOKEN",
	"SERVER__PORT",
	"SERVER__HOST",
	"UV_THREADPOOL_SIZE"
]);
/**
* Build the environment for an agent-cli process.
*
* Ordinary user/system variables (notably PATH and HOME) pass through, while
* WorkBuddy-managed and runtime-sensitive variables are removed.
* `managedEnv` is overlaid last as the authoritative source for both cold and
* prewarmed CLI processes.
*/
function buildCliProcessEnv(managedEnv, hostEnv = process.env) {
	const passedEnv = {};
	for (const [key, value] of Object.entries(hostEnv)) {
		if (value === void 0) continue;
		const canonicalKey = key.toUpperCase();
		if (ENV_BLOCKED_KEYS.has(canonicalKey)) continue;
		if (ENV_BLOCKED_PREFIXES.some((prefix) => canonicalKey.startsWith(prefix))) continue;
		passedEnv[key] = value;
	}
	const result = {
		...passedEnv,
		...managedEnv
	};
	if (!result.NODE_EXTRA_CA_CERTS && process.platform === "darwin") try {
		const configDir = process.env.WORKBUDDY_CONFIG_DIR || process.env.CODEBUDDY_CONFIG_DIR || path.default.join(os.default.homedir(), ".workbuddy");
		const caBundlePath = path.default.join(configDir, "system-ca-bundle.pem");
		if (!fs.default.existsSync(caBundlePath)) {
			if (!!(result.HTTPS_PROXY || result.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY)) {
				const CERT_REGEX = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
				const keychains = [path.default.join(os.default.homedir(), "Library", "Keychains", "login.keychain-db"), "/Library/Keychains/System.keychain"];
				const certs = [];
				for (const kc of keychains) try {
					const m = (0, child_process.execFileSync)("security", [
						"find-certificate",
						"-a",
						"-p",
						kc
					], {
						encoding: "utf-8",
						timeout: 5e3
					}).match(CERT_REGEX);
					if (m) certs.push(...m);
				} catch {}
				const builtinSet = new Set(tls.default.rootCertificates);
				const extra = [...new Set(certs)].filter((c) => !builtinSet.has(c));
				if (extra.length > 0) {
					fs.default.mkdirSync(path.default.dirname(caBundlePath), { recursive: true });
					fs.default.writeFileSync(caBundlePath, extra.join("\n"), "utf-8");
				}
			}
		}
		if (fs.default.existsSync(caBundlePath)) result.NODE_EXTRA_CA_CERTS = caBundlePath;
	} catch {}
	return result;
}
function quoteWindowsArgument(value) {
	if (value.length > 0 && !/[\s"]/u.test(value)) return value;
	let result = "\"";
	let backslashes = 0;
	for (const char of value) {
		if (char === "\\") {
			backslashes++;
			continue;
		}
		if (char === "\"") {
			result += "\\".repeat(backslashes * 2 + 1) + "\"";
			backslashes = 0;
			continue;
		}
		result += "\\".repeat(backslashes) + char;
		backslashes = 0;
	}
	return result + "\\".repeat(backslashes * 2) + "\"";
}
function estimateWindowsCommandLineLength(command, args) {
	return [command, ...args].map(quoteWindowsArgument).join(" ").length + 1;
}
/**
* 从 argv 里为一个二元 flag（`<flag> <value>`）构造落盘候选。
*
* 复用 SSOT：conversation launch-spec（worker-spawner 那套）与 sidecar 冷启
* （codebuddy-code-backend 那套）都用它把 `--system-prompt` / `--settings` /
* `--mcp-config` 这类大字段登记成「超限时可外置」的候选，避免两套架构各写一份。
*
* - `startIndex`：从该下标起 `indexOf(flag)`，跳过前缀里可能同名的 worker 固定参数。
* - `replacementFlag`：落盘后 flag 本身需要改写时提供（如 `--system-prompt`
*   落盘后要换成 `--system-prompt-file`）。
*
* flag 缺失、或其后没有值时返回 undefined（调用方 filter 掉）。
*/
function createArgFileCandidate(args, flag, fileName, startIndex = 0, replacementFlag) {
	const flagIndex = args.indexOf(flag, startIndex);
	if (flagIndex < 0 || args[flagIndex + 1] === void 0) return;
	return {
		flagIndex,
		fileName,
		...replacementFlag ? { replacementFlag } : {}
	};
}
function prepareWorkerArgs(command, args, candidates, platform) {
	const preparedArgs = [...args];
	if (platform !== "win32" || estimateWindowsCommandLineLength(command, preparedArgs) <= 3e4) return { args: preparedArgs };
	if (!candidates?.length) throw new Error("Windows worker command line is too long and has no file-backed arguments");
	const directory = (0, node_fs.mkdtempSync)((0, node_path.join)((0, node_os.tmpdir)(), "workbuddy-cli-args-"));
	let cleaned = false;
	let cleanupAttempts = 0;
	function cleanup() {
		if (cleaned || cleanupAttempts >= 3) return;
		cleanupAttempts++;
		try {
			(0, node_fs.rmSync)(directory, {
				recursive: true,
				force: true,
				maxRetries: 3,
				retryDelay: 50
			});
			cleaned = true;
		} catch {
			if (cleanupAttempts < 3) setTimeout(cleanup, 250).unref();
		}
	}
	try {
		const fileCandidates = candidates.map((candidate) => {
			const valueIndex = candidate.flagIndex + 1;
			const content = preparedArgs[valueIndex];
			if (candidate.flagIndex < 0 || content === void 0 || !candidate.fileName || candidate.fileName === "." || candidate.fileName === ".." || /[\\/]/u.test(candidate.fileName)) throw new Error("Invalid Windows worker file-backed argument metadata");
			return {
				...candidate,
				valueIndex,
				content
			};
		}).sort((a, b) => b.content.length - a.content.length);
		for (const candidate of fileCandidates) {
			const filePath = (0, node_path.join)(directory, candidate.fileName);
			(0, node_fs.writeFileSync)(filePath, candidate.content, {
				encoding: "utf8",
				mode: 384
			});
			if (candidate.replacementFlag) preparedArgs[candidate.flagIndex] = candidate.replacementFlag;
			preparedArgs[candidate.valueIndex] = filePath;
			if (estimateWindowsCommandLineLength(command, preparedArgs) <= 3e4) return {
				args: preparedArgs,
				cleanup
			};
		}
		throw new Error("Windows worker command line remains too long after file-backed argument compaction");
	} catch (error) {
		cleanup();
		throw error;
	}
}
var DEFAULT_WORKER_ARGS = [ACP_MODE_ARG];
/**
* 组装 spawn env：
* 1. `buildCliProcessEnv` 剥离 hostEnv 里的黑名单（`CODEBUDDY_*` / `ELECTRON_*` / `VITE_*` /
*    `ACC_PRODUCT_CONFIG_*` + 精确 key 如 `NODE_OPTIONS` / `HTTP_PROXY` / `SERVER__PORT` /
*    `SERVER__HOST` 等），避免父进程 ambient 污染 CLI（issue #87521）
* 2. `managedEnv` 分三层 spread（低→高覆盖）：
*    a. `CLI_STATIC_MANAGED_ENV` —— 与老 sidecar/prewarm 对齐的静态兜底
*       （`ELECTRON_RUN_AS_NODE=1` / `CODEBUDDY_DISABLE_IDE=1` / `SERVER__PORT=0` /
*       `SERVER__HOST=127.0.0.1`）。前两键 whitelist 通常有同名会覆盖；后两键
*       whitelist 无同名，兜底生效——防止黑名单剥了 process.env 里的 `SERVER__PORT` /
*       `SERVER__HOST` 后 agent-cli 侧 `EndpointProvider` / 嵌套 spawn 拿不到默认端点
*       （见 workbuddy-server/src/agent/cli-prewarm-pool.ts:945 与
*       agent-cli/src/node/session/tasks-controller.ts:11 的同源踩坑注释）
*    b. `whitelist`（= LaunchSpec.env 层2-6 合并结果）—— 显式声明的合法
*       `CODEBUDDY_*` / `ELECTRON_RUN_AS_NODE` 等覆盖 a 层
*    c. `NODE_OPTIONS: ''` —— 钉死（防止 whitelist 意外覆盖，也防止 hostEnv 泄漏）
*/
function buildWorkerEnv(whitelist) {
	return buildCliProcessEnv({
		...CLI_STATIC_MANAGED_ENV,
		...whitelist ?? {},
		NODE_OPTIONS: ""
	}, process.env);
}
/** spawn 出来的 Worker 句柄，封装进程 + pgid + tree-kill + exit 确认。 */
var WorkerHandle = class {
	constructor(child, deps) {
		this.exited = false;
		this.killRequested = false;
		this.child = child;
		this.pgid = typeof child.pid === "number" ? child.pid : void 0;
		this.killGraceMs = deps.killGraceMs;
		this.platform = deps.platform;
		this.spawnImpl = deps.spawnImpl;
		this.exitPromise = new Promise((resolve) => {
			child.once("exit", (code, signal) => {
				this.exited = true;
				this.exitInfo = {
					code,
					signal
				};
				resolve({
					code,
					signal
				});
			});
		});
	}
	get isWindows() {
		return this.platform === "win32";
	}
	get pid() {
		return this.child.pid;
	}
	get hasExited() {
		return this.exited;
	}
	/** 是否被主动 killTree 过（区分主动杀 vs 自发 crash）。 */
	get wasKillRequested() {
		return this.killRequested;
	}
	/** 等待进程退出确认（含 code/signal）。 */
	waitExit() {
		if (this.exited) return Promise.resolve(this.exitInfo ?? {
			code: null,
			signal: null
		});
		return this.exitPromise;
	}
	/**
	* tree-kill：先优雅后强杀，杀掉 Worker 及其孙进程。
	*
	* - POSIX：`process.kill(-pgid, SIGTERM)` 整组 → 宽限 → `process.kill(-pgid, SIGKILL)` 整组。
	* - Windows：无进程组语义，用 `taskkill /PID <pid> /T`（/T 杀进程树）→ 宽限 →
	*   `taskkill /PID <pid> /T /F`（/F 强制）。两段式同样满足「先优雅后强杀」。
	*
	* 返回 exit 确认（code/signal）。
	*/
	async killTree() {
		this.killRequested = true;
		if (this.exited) return this.exitInfo ?? {
			code: null,
			signal: null
		};
		this.terminateTree(false);
		const graced = await this.raceExit(this.killGraceMs);
		if (graced) return graced;
		this.terminateTree(true);
		return await this.raceExit(Math.max(this.killGraceMs, 3e3)) ?? {
			code: null,
			signal: "SIGKILL"
		};
	}
	/**
	* 终止整棵进程树。`force=false` 优雅（SIGTERM / taskkill 无 /F），`force=true` 强制（SIGKILL / taskkill /F）。
	*/
	terminateTree(force) {
		if (this.exited) return;
		if (this.isWindows) this.taskkillTree(force);
		else this.signalGroup(force ? "SIGKILL" : "SIGTERM");
	}
	/** POSIX：向整个进程组发信号（负 pgid = 整组）；进程组不存在/无权限时回退直接 kill 子进程。 */
	signalGroup(signal) {
		if (this.pgid !== void 0) try {
			process.kill(-this.pgid, signal);
			return;
		} catch {}
		try {
			this.child.kill(signal);
		} catch {}
	}
	/** Windows：`taskkill /PID <pid> /T [/F]` 杀进程树。无 pid 退化为 child.kill()。 */
	taskkillTree(force) {
		const pid = this.child.pid;
		if (pid === void 0) {
			try {
				this.child.kill();
			} catch {}
			return;
		}
		const args = [
			"/PID",
			String(pid),
			"/T"
		];
		if (force) args.push("/F");
		try {
			this.spawnImpl("taskkill", args, {
				stdio: "ignore",
				windowsHide: true
			}).on("error", () => {});
		} catch {
			try {
				this.child.kill();
			} catch {}
		}
	}
	raceExit(ms) {
		return new Promise((resolve) => {
			let done = false;
			const timer = setTimeout(() => {
				if (!done) {
					done = true;
					resolve(void 0);
				}
			}, ms);
			this.exitPromise.then((info) => {
				if (!done) {
					done = true;
					clearTimeout(timer);
					resolve(info);
				}
			}).catch(() => {});
		});
	}
};
/**
* spawn 一个 Worker 子进程。stdio: 'pipe'（stdin/stdout ndJSON + stderr drain）。
* 抛错场景：spawn 同步失败（ENOENT 等）由调用方 catch → CONNECT_FAILED。
*/
function spawnWorker(options) {
	const spawnImpl = options.spawnImpl ?? node_child_process.spawn;
	const platform = (options.platformProbe ?? (() => process.platform))();
	const command = options.command ?? "cbc";
	const { args, cleanup } = prepareWorkerArgs(command, options.args ?? DEFAULT_WORKER_ARGS, options.argFileCandidates, platform);
	const spawnOptions = {
		stdio: [
			"pipe",
			"pipe",
			"pipe"
		],
		detached: platform !== "win32",
		cwd: options.cwd,
		env: buildWorkerEnv(options.envWhitelist),
		windowsHide: true,
		...options.argv0 ? { argv0: options.argv0 } : {}
	};
	try {
		const child = spawnImpl(command, args, spawnOptions);
		if (options.onPhysicalSpawn) child.once("spawn", () => {
			try {
				options.onPhysicalSpawn?.(Date.now());
			} catch {}
		});
		if (cleanup) {
			child.once("error", cleanup);
			child.once("exit", cleanup);
		}
		return new WorkerHandle(child, {
			killGraceMs: options.killGraceMs ?? 3e3,
			platform,
			spawnImpl
		});
	} catch (error) {
		cleanup?.();
		throw error;
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/stderr-tail.ts
/**
* StderrTail —— Worker stderr 环形缓冲：按行切分保留最近 N 行，供异常退出时 dump 诊断。
* 自包含无状态耦合（不感知 generation/pipe），从 LocalConnection 抽出以收敛主类职责。
*/
var StderrTail = class {
	constructor(maxLines) {
		this.maxLines = maxLines;
		this.lines = [];
		this.buf = "";
	}
	/** 累积 stderr 文本，按 \n 切分维护最近 maxLines 行（超出裁剪头部）。 */
	append(text) {
		this.buf += text;
		const segs = this.buf.split("\n");
		this.buf = segs.pop() ?? "";
		for (const line of segs) this.lines.push(line);
		if (this.lines.length > this.maxLines) this.lines.splice(0, this.lines.length - this.maxLines);
	}
	/** 重置缓冲（新一代 worker attach 时）。 */
	reset() {
		this.lines.length = 0;
		this.buf = "";
	}
	/** 当前 tail 文本（含未完成尾行）。 */
	text() {
		return (this.buf ? [...this.lines, this.buf] : this.lines).join("\n");
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/types.ts
/**
* 通道 4 态状态机（值与 agent-provider `ConnectionState` string union 完全一致，
* 故可与之互赋、对外仍暴露 ConnectionState，不破坏跨包契约）。
*
* 合法迁移（非全连通，部分单向不可逆）：
*   Disconnected → Connecting            （connect/惰性 re-spawn 触发）
*   Connecting   → Connected             （initialize 握手成功）
*   Connecting   → Error                 （spawn/initialize 失败，connect 链终止）
*   Connected    → Disconnected          （pipe 断/killWorker，可再 re-spawn 回 Connecting）
*   Connected/Connecting → Error         （worker crash 自发退出，**优先于 pipe 断**，不可回退为 disconnected）
*   Error        → （终态之一）           worker crash 后不自动复活；实例 dispose 后不再 spawn
*
* 不可逆链路要点：
*   - crash（worker 自发 exit）一旦升级 Error，即使 pipe.onClose 已置 Disconnected 也覆盖为 Error。
*   - disconnect() 后实例 disposed，任何 connect 直接 reject（终态，不再进 Connecting）。
*/
var LocalConnectionState = /* @__PURE__ */ function(LocalConnectionState) {
	LocalConnectionState["Disconnected"] = "disconnected";
	LocalConnectionState["Connecting"] = "connecting";
	LocalConnectionState["Connected"] = "connected";
	LocalConnectionState["Error"] = "error";
	return LocalConnectionState;
}({});
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/lifecycle-manager.ts
var WorkerLifecycleManager = class {
	constructor(host, log) {
		this.host = host;
		this.log = log;
		this.pipeUnsubscribers = [];
		this.stderrTail = new StderrTail(50);
	}
	/** 当前活跃 pipe（sendRequest/sendNotification 用）。 */
	get activePipe() {
		return this.pipe;
	}
	/** worker 是否存活（singleflight 复用判据）。 */
	hasLiveWorker() {
		return this.worker !== void 0 && !this.worker.hasExited;
	}
	/** spawn Worker 进程；抛错交调用方 failConnect。返回 worker 供调用方做 stale 检查。 */
	spawn(cwd, spawnOpts) {
		return spawnWorker({
			cwd,
			...spawnOpts
		});
	}
	/** 绑定 worker（已通过 stale 检查后）：接管句柄 + attach 事件 + attach pipe。 */
	attach(worker, gen) {
		this.worker = worker;
		this.attachWorkerEvents(worker, gen);
		this.attachPipe(worker, gen);
	}
	/** 发 initialize 握手（attach 之后）。失败由调用方 teardown + failConnect。 */
	async sendInitialize(clientCapabilities, timeoutMs) {
		const { PROTOCOL_VERSION } = await Promise.resolve().then(() => require("./acp.js"));
		return this.pipe.sendRequest("initialize", {
			protocolVersion: PROTOCOL_VERSION,
			clientCapabilities
		}, { timeoutMs });
	}
	/** 杀某代 worker（仅当仍是该代）。initialize 失败 / 握手期作废时调用。 */
	async teardown(gen) {
		const worker = this.worker;
		this.pipe?.close(this.host.makeError("CONNECTION_LOST", "teardown"));
		this.clearPipeSubscriptions();
		if (worker) {
			const exit = await worker.killTree();
			this.log("teardown tree-kill done", {
				generation: gen,
				pid: worker.pid,
				code: exit.code,
				signal: exit.signal
			});
		}
		if (gen === this.host.generation) {
			this.worker = void 0;
			this.pipe = void 0;
		}
	}
	/**
	* 杀 Worker 保留调用方实例 + 订阅（idle LRU 回收；下次 sendRequest 惰性 re-spawn）。含 tree-kill + exit 确认。
	* setState 由 manager 负责（Disconnected）；stopping 标记由调用方管理。
	*/
	async killWorker() {
		const worker = this.worker;
		this.pipe?.close(this.host.makeError("CONNECTION_LOST", "killWorker"));
		this.clearPipeSubscriptions();
		if (worker) {
			const exit = await worker.killTree();
			this.log("killWorker tree-kill done", {
				pid: worker.pid,
				code: exit.code,
				signal: exit.signal
			});
		}
		this.worker = void 0;
		this.pipe = void 0;
		this.host.setState(LocalConnectionState.Disconnected);
	}
	/** dispose：彻底断开回收（tree-kill + 等 exit），返回本次捕获的 worker 供调用方日志。 */
	async disposeWorker() {
		const worker = this.worker;
		this.pipe?.close(this.host.makeError("CONNECTION_LOST", "disconnect"));
		this.clearPipeSubscriptions();
		if (worker) {
			const exit = await worker.killTree();
			this.log("disconnect tree-kill done", {
				pid: worker.pid,
				code: exit.code,
				signal: exit.signal
			});
		}
		this.worker = void 0;
		this.pipe = void 0;
	}
	attachPipe(worker, gen) {
		const stdin = worker.child.stdin;
		const stdout = worker.child.stdout;
		if (!stdin || !stdout) throw this.host.makeError("CONNECT_FAILED", "worker missing stdio pipes");
		const pipe = new StdioPipe({
			stdin,
			stdout
		});
		this.pipe = pipe;
		this.pipeUnsubscribers.push(pipe.onNotification((method, params, seq) => {
			if (gen !== this.host.generation) return;
			this.host.dispatchNotification(method, params, seq);
		}), pipe.onRequest(async (method, params) => {
			if (gen !== this.host.generation) throw this.host.makeError("CONNECTION_LOST", "stale generation");
			return this.host.handleRequest(method, params);
		}), pipe.onError((error) => {
			if (gen !== this.host.generation) return;
			this.host.emitError(error);
		}), pipe.onClose((reason) => {
			if (gen !== this.host.generation) return;
			setTimeout(() => {
				if (gen !== this.host.generation) return;
				const w = this.worker;
				if (!w || w.hasExited) {
					this.log("pipe closed (worker exited/crash)", {
						generation: gen,
						sessionId: this.host.sessionId,
						code: reason.code
					});
					this.pipe = void 0;
					return;
				}
				this.log("pipe closed (worker alive) — terminate orphan runtime", {
					generation: gen,
					sessionId: this.host.sessionId,
					code: reason.code
				});
				this.pipe = void 0;
				this.worker = void 0;
				if (this.host.currentState === LocalConnectionState.Connected || this.host.currentState === LocalConnectionState.Connecting) {
					this.host.emitError(this.host.makeError("WORKER_EXIT", `worker pipe closed unexpectedly: ${reason.message}`, false, reason));
					this.host.setState(LocalConnectionState.Error);
				}
				w.killTree().then((exit) => {
					this.log("pipe-close tree-kill done", {
						pid: w.pid,
						code: exit.code,
						signal: exit.signal
					});
				}).catch(() => {});
			}, 0);
		}));
		const stderr = worker.child.stderr;
		if (stderr) {
			this.stderrTail.reset();
			stderr.on("data", (chunk) => {
				if (gen !== this.host.generation) return;
				this.stderrTail.append(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
			});
		}
	}
	attachWorkerEvents(worker, gen) {
		worker.child.once("error", (err) => {
			if (gen !== this.host.generation) return;
			this.host.emitError(this.host.makeError("WORKER_EXIT", `worker error: ${err.message}`, false, err));
			this.host.setState(LocalConnectionState.Error);
		});
		worker.waitExit().then(({ code, signal }) => {
			if (gen !== this.host.generation) {
				this.log("worker exit (stale gen, ignored)", {
					generation: gen,
					currentGen: this.host.generation,
					code,
					signal
				});
				return;
			}
			if (worker.wasKillRequested) {
				this.log("worker exit (kill requested, ignored)", {
					generation: gen,
					code,
					signal
				});
				return;
			}
			const s = this.host.currentState;
			const tail = code !== 0 && code !== null || signal !== null ? this.stderrTail.text() : "";
			this.log("worker exit", {
				generation: gen,
				code,
				signal,
				state: s,
				wasKillRequested: worker.wasKillRequested,
				stderrTail: tail ? tail.slice(-1024) : void 0
			});
			this.host.emitError(this.host.makeError("WORKER_EXIT", `worker exited code=${code} signal=${signal}`, false));
			this.host.setState(LocalConnectionState.Error);
		}).catch(() => {});
	}
	clearPipeSubscriptions() {
		for (const unsub of this.pipeUnsubscribers) unsub();
		this.pipeUnsubscribers = [];
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-connection/local-connection.ts
var LAUNCH_SPEC_PREFETCH_TTL_MS = 3e4;
var LocalConnection = class {
	constructor(init) {
		this.transport = "local";
		this.outboundPromptCancellation = new OutboundPromptCancellation();
		this.observedRuntimeRevision = 0;
		this.hasSentPromptTurn = false;
		this.clientMethodRegistry = new ClientMethodRegistry();
		this._state = LocalConnectionState.Disconnected;
		this._generation = 0;
		this.stopping = false;
		this.disposed = false;
		this.events = new require_conversations.ManagedConnectionEvents();
		this.id = init.id;
		this.cwd = init.cwd;
		this._sessionId = init.sessionId;
		this.spawnOptions = init.spawnOptions;
		this.resolveLaunchSpec = init.resolveLaunchSpec;
		this.conversationAdmission = init.conversationAdmission;
		this.prepareConversationPrompt = init.prepareConversationPrompt;
		this.getConversationRuntimeRevision = init.getConversationRuntimeRevision;
		this.observedRuntimeRevision = init.getConversationRuntimeRevision?.() ?? 0;
		this.connectTimeoutMs = init.connectTimeoutMs ?? 3e4;
		this.logSink = init.logSink;
		const getGeneration = () => this._generation;
		const getCurrentState = () => this._state;
		const getSessionId = () => this._sessionId;
		const lifecycleHost = {
			get generation() {
				return getGeneration();
			},
			get currentState() {
				return getCurrentState();
			},
			get sessionId() {
				return getSessionId();
			},
			setState: (next) => this.setState(next),
			emitError: (error) => this.emitError(error),
			makeError: (code, message, retryable, cause) => this.makeError(code, message, retryable, cause),
			dispatchNotification: (method, params, seq) => this.dispatchNotification(method, params, seq),
			handleRequest: (method, params) => this.handleRequest(method, params)
		};
		this.lifecycle = new WorkerLifecycleManager(lifecycleHost, (event, ctx, level) => this.emit("LIFECYCLE_MANAGER", event, ctx, level));
		this.runtimePreparation = new RuntimePreparationCoordinator({
			getGeneration: () => this._generation,
			getLaunchSpec: () => this.currentLaunchSpec,
			sendRequest: (method, params, timeoutMs) => this.sendRequestRaw(method, params, timeoutMs),
			makeConnectionLostError: (stage) => this.makeError("CONNECTION_LOST", `worker changed during before-${stage} preparation`)
		});
		this.highFreqLog = new RateLimitedLogger({
			tag: "LocalConnection",
			ratePerSec: 20,
			sink: (line) => this.logRaw(line)
		});
	}
	get generation() {
		return this._generation;
	}
	get state() {
		return this._state;
	}
	/** LifecycleHost：内部 enum 态（crash 优先等决策用），避免与 Connection.state 签名冲突。 */
	get currentState() {
		return this._state;
	}
	get sessionId() {
		return this._sessionId;
	}
	dispatchNotification(method, params, seq) {
		this.events.notify(method, params, seq);
	}
	handleRequest(method, params) {
		if (!this.clientMethodRegistry.isInboundRequestEnabled(method, params)) return Promise.reject(new AcpMethodNotFoundError(method));
		if (!this.events.hasRequestHandler) return Promise.reject(this.makeError("PROTOCOL_PARSE", `no onRequest handler for ${method}`));
		return this.events.respond(method, params);
	}
	get isConnected() {
		return this._state === LocalConnectionState.Connected;
	}
	setWorkerStartupAttempt(attempt) {
		this.workerStartupAttempt = attempt;
	}
	/** 当前绑定的 sessionId（供上层 re-spawn 时 session/load 编排与日志链路关联）。 */
	getSessionId() {
		return this._sessionId;
	}
	/** 最近一次 spawn 使用的 LaunchSpec 指纹（未注入 resolveLaunchSpec 时为 undefined）。 */
	get lastFingerprint() {
		return this._lastFingerprint;
	}
	withSessionMcpPolicy(ctx) {
		const sessionMcpPolicy = this.getSessionMcpPolicy?.();
		return sessionMcpPolicy ? {
			...ctx,
			sessionMcpPolicy
		} : ctx;
	}
	/** preload 阶段只解析 LaunchSpec，不建立通道或 spawn Worker。 */
	preloadRuntime() {
		if (!this.resolveLaunchSpec || !this._sessionId || this.disposed) return;
		this.getOrStartLaunchSpec({
			conversationId: this.id,
			cwd: this.cwd
		}).catch((error) => {
			this.log("runtime preload failed", { errorKind: error instanceof Error ? error.name : typeof error }, "warn");
		});
	}
	getOrStartLaunchSpec(ctx) {
		const key = `${ctx.conversationId}\u0000${ctx.cwd}`;
		if (this.launchSpecPrefetch?.key === key && (this.launchSpecPrefetch.expiresAt === void 0 || this.launchSpecPrefetch.expiresAt > Date.now())) return this.launchSpecPrefetch.promise;
		const promise = Promise.resolve().then(() => this.resolveLaunchSpec(this.withSessionMcpPolicy(ctx)));
		this.launchSpecPrefetch = {
			key,
			promise
		};
		promise.then(() => {
			if (this.launchSpecPrefetch?.promise === promise) this.launchSpecPrefetch.expiresAt = Date.now() + LAUNCH_SPEC_PREFETCH_TTL_MS;
		}).catch(() => {
			if (this.launchSpecPrefetch?.promise === promise) this.launchSpecPrefetch = void 0;
		});
		return promise;
	}
	/**
	* 重新解析当前会话 LaunchSpec；fingerprint 变化且非残缺 spec 时回收 worker。
	* 下一次 sendPrompt 复用同一 LocalConnection惰性 spawn，并在 prompt 前重新 session/load。
	*/
	async refreshRuntime(options) {
		this.launchSpecPrefetch = void 0;
		if (!this.resolveLaunchSpec || !this._sessionId || !this.hasLiveWorker()) return false;
		if (options?.forceRestart) {
			this.log("runtime refresh force restart", {
				sessionId: this._sessionId,
				generation: this._generation
			});
			return this.killWorker({ force: true });
		}
		if (!await runRuntimeRestartEvaluation({
			connecting: this._state === LocalConnectionState.Connecting,
			lastFingerprint: this._lastFingerprint,
			currentLaunchSpec: this.currentLaunchSpec,
			sessionId: this._sessionId,
			state: this._state,
			resolveNext: () => this.resolveLaunchSpec(this.withSessionMcpPolicy({
				conversationId: this.id,
				cwd: this.cwd
			})),
			log: (event, ctx) => this.log(event, ctx)
		})) return false;
		return this.killWorker();
	}
	/**
	* 判断是否需要为「MCP 由不可用变可用」做一次性自愈探测，并原子标记本generation 已探测。
	*
	* 背景：MCP config projection 或本地 serving plane 首启失败时，首次 spawn 可能拿到空 MCP 而降级启动。
	* worker 一旦以空 MCP 起来，模型手里就没有对应工具，且没有任何事件会把它救回来——
	* `refreshRuntime` 只由用户改配置（专家 / Scene Mode）触发，launchSpec prefetch 也不比 fingerprint。
	*
	* 因此在每轮 prompt 前检查：上次 spawn 用的是空 MCP 且本 generation 尚未探测过，则返回 true，
	* 由上层重新解析 launchSpec 并按 fingerprint 决定是否回收 worker。
	* 以 generation 去重，保证「本来就没有 MCP」的会话每个 worker 至多多做一次解析（prefetch 命中，近乎零开销）。
	* 宿主声明 `mcpIntentionallyEmpty`（Ask 只读等）时空 MCP 是产品策略，不探测。
	*/
	consumeMcpRecoveryProbe() {
		if (!this.resolveLaunchSpec || !this._sessionId || !this.hasLiveWorker()) return false;
		if (this.currentLaunchSpec?.mcpIntentionallyEmpty) return false;
		if ((this.currentLaunchSpec?.mcpServers?.length ?? 0) > 0) return false;
		if (this.mcpRecoveryProbedGeneration === this._generation) return false;
		this.mcpRecoveryProbedGeneration = this._generation;
		return true;
	}
	/**
	* 建立通道（singleflight 包装）：connecting 期间并发调用复用同一 connectPromise，永不双 spawn（§3.1）。
	* 已连接直接返回。不做 session/new|load（上层显式发）。
	*/
	async connect(options) {
		if (options?.sessionId) this._sessionId = options.sessionId;
		await assertConversationWorkspaceUsable(options?.cwd ?? this.cwd);
		await this.ensureConnected(options);
	}
	/**
	* singleflight 核心（§2.5 / §3.1）：
	*   - 已 connected → 立即返回（不重连）
	*   - connecting 中 → 复用同一 connectPromise（禁止 `if(!hasLiveWorker)spawn` 的 TOCTOU 双 spawn）
	*   - 否则 → 启动 doConnect，存 connectPromise，finally 清空
	*/
	ensureConnected(options) {
		if (this.disposed) return Promise.reject(this.makeError("CONNECTION_LOST", "connection disposed", false));
		if (this.stoppingPromise) {
			this.log("ensureConnected wait for worker stop", { generation: this._generation });
			return this.stoppingPromise.then(() => this.ensureConnected(options));
		}
		if (this.stopping) return Promise.reject(this.makeError("CONNECTION_LOST", "connection stopping, retry later", true));
		if (this._state === LocalConnectionState.Connected && this.lifecycle.hasLiveWorker()) return Promise.resolve();
		if (this.connectPromise) {
			this.log("ensureConnected reuse in-flight connectPromise", { generation: this._generation });
			return this.connectPromise;
		}
		const promise = this.doConnect(options).finally(() => {
			this.connectPromise = void 0;
		});
		this.connectPromise = promise;
		return promise;
	}
	/**
	* 实际连接：spawn → attach → initialize → connected。每个 await 后校验 gen/aborted，
	* 被作废（disconnect/killWorker ++generation 或 abort）则杀刚起进程、不进 connected（§3.2 / §3.3）。
	*/
	async doConnect(options) {
		const abort = new AbortController();
		this.abortController = abort;
		const gen = ++this._generation;
		const methodRegistry = new ClientMethodRegistry(options?.clientCapabilities);
		this.clientMethodRegistry = methodRegistry;
		const startupAttempt = this.workerStartupAttempt;
		const startedAt = Date.now();
		let launchSpecMs = 0;
		this.log("spawn worker", {
			generation: gen,
			sessionId: this._sessionId,
			cwd: options?.cwd ?? this.cwd
		});
		this.setState(LocalConnectionState.Connecting);
		let launch;
		if (this.resolveLaunchSpec && this._sessionId) {
			const launchSpecStartedAt = Date.now();
			const launchSpecPromise = this.getOrStartLaunchSpec({
				conversationId: this.id,
				cwd: options?.cwd ?? this.cwd,
				signal: abort.signal
			});
			try {
				launch = await launchSpecPromise;
				launchSpecMs = Date.now() - launchSpecStartedAt;
			} catch (e) {
				this.failConnect("CONNECT_FAILED", `resolve launch spec failed: ${e instanceof Error ? e.message : String(e)}`, e);
				throw this.lastError;
			} finally {
				if (this.launchSpecPrefetch?.promise === launchSpecPromise) this.launchSpecPrefetch = void 0;
			}
			if (this.isStale(gen, abort)) {
				this.log("abort connect before spawn (stale after resolveLaunchSpec)", { generation: gen });
				throw this.makeError("CONNECT_FAILED", "stale after resolveLaunchSpec");
			}
		}
		let worker;
		let processSpawnedAt;
		let processSpawnMs;
		try {
			const effective = this.withAcpFlag(this.applyLaunchSpec(this.spawnOptions, launch));
			const argv0 = buildAcpWorkerArgv0(this.id);
			const processSpawnStartedAt = Date.now();
			startupAttempt?.onMark("W1", {
				attemptId: startupAttempt.traceId,
				startupPath: "stdio-cold",
				generation: gen,
				launchSpecMs
			});
			worker = this.lifecycle.spawn(options?.cwd ?? this.cwd, {
				...effective,
				argv0,
				envWhitelist: {
					...effective?.envWhitelist,
					[WORKBUDDY_CONVERSATION_ID_ENV]: this.id
				},
				onPhysicalSpawn: (physicalSpawnAtEpochMs) => {
					startupAttempt?.onMark("W2P", {
						attemptId: startupAttempt.traceId,
						startupPath: "stdio-cold",
						generation: gen,
						physicalSpawnAtEpochMs
					});
				}
			});
			processSpawnedAt = Date.now();
			processSpawnMs = processSpawnedAt - processSpawnStartedAt;
			this._lastFingerprint = launch?.restartFingerprint;
			this.currentLaunchSpec = launch;
			this.runtimePreparation.reset();
			this.log("worker spawned", {
				generation: gen,
				pid: worker.pid,
				argv0,
				launchSpecMs,
				processSpawnMs
			});
		} catch (e) {
			this.failConnect("CONNECT_FAILED", `spawn failed: ${e instanceof Error ? e.message : String(e)}`, e);
			throw this.lastError;
		}
		if (worker.pid === void 0) {
			worker.killTree().catch(() => {});
			this.failConnect("CONNECT_FAILED", "worker spawned without pid");
			throw this.lastError;
		}
		if (this.isStale(gen, abort)) {
			this.log("abort connect after spawn (stale)", { generation: gen });
			worker.killTree().catch(() => {});
			throw this.makeError("CONNECT_FAILED", "connect aborted (stale after spawn)");
		}
		this.lifecycle.attach(worker, gen);
		try {
			const initializeResponse = await this.lifecycle.sendInitialize(methodRegistry.clientCapabilities, this.connectTimeoutMs);
			this.conversationAdmission?.onInitialize(initializeResponse);
			await this.conversationAdmission?.activate?.((method, params) => this.sendRequestRaw(method, params));
		} catch (e) {
			await this.lifecycle.teardown(gen);
			const err = e;
			this.failConnect("CONNECT_FAILED", `initialize failed: ${err?.message ?? String(e)}`, e);
			throw this.lastError;
		}
		if (this.isStale(gen, abort)) {
			this.log("abort connect after initialize (stale) — kill just-spawned worker", { generation: gen });
			await this.lifecycle.teardown(gen);
			throw this.makeError("CONNECT_FAILED", "connect aborted (stale generation)");
		}
		this.log("connected", {
			generation: gen,
			sessionId: this._sessionId,
			pid: worker.pid,
			launchSpecMs,
			processSpawnMs,
			acpHandshakeMs: Date.now() - processSpawnedAt,
			connectMs: Date.now() - startedAt
		});
		this.setState(LocalConnectionState.Connected);
	}
	/**
	* 把 LaunchSpec 叠到 base spawnOptions（哑管子：不解析语义，只 command/args 覆盖 + env 合并）。
	* launch 为空 → 原样返回 base（AC6：未注入 resolveLaunchSpec 时与改动前完全一致）。
	*/
	applyLaunchSpec(base, launch) {
		const admissionArgs = this.conversationAdmission?.launchArgs ?? [];
		if (!launch && admissionArgs.length === 0) return base;
		const args = [...launch?.args ?? base?.args ?? [], ...admissionArgs];
		return {
			...base,
			...launch?.command ? { command: launch.command } : {},
			...args.length > 0 ? { args } : {},
			...launch?.argFileCandidates?.length ? { argFileCandidates: launch.argFileCandidates } : {},
			...launch ? { envWhitelist: {
				...base?.envWhitelist ?? {},
				...launch.env
			} } : {}
		};
	}
	/**
	* spawn args 归一化：确保带 ACP_MODE_ARG（stdio ACP 模式）。
	* 装配层只注入 [cliPath] 时补 flag，让 worker 进 AcpModeStrategy 而非交互模式；
	* 无 spawnOptions 时返回 undefined，交 worker-spawner 落 DEFAULT_WORKER_ARGS。
	*/
	withAcpFlag(spawnOptions) {
		if (!spawnOptions) return;
		const args = spawnOptions.args;
		if (!args || args.includes("--acp")) return spawnOptions;
		return {
			...spawnOptions,
			args: [...args, ACP_MODE_ARG]
		};
	}
	/** 是否已被作废：generation 变了 或 abort 已触发。 */
	isStale(gen, abort) {
		return gen !== this._generation || abort.signal.aborted;
	}
	/** 彻底断开并回收：abort+generation++ → pending reject → tree-kill+等 exit → pipe.close → 清事件订阅 → disconnected。 */
	async disconnect() {
		this.log("disconnect", {
			generation: this._generation,
			sessionId: this._sessionId
		});
		this.disposed = true;
		this.stopping = true;
		this._generation++;
		this.abortController?.abort();
		this.connectPromise = void 0;
		this.launchSpecPrefetch = void 0;
		try {
			await this.lifecycle.disposeWorker();
		} catch (error) {
			this.log("disposeWorker failed", {
				sessionId: this._sessionId,
				message: error instanceof Error ? error.message : String(error)
			});
		} finally {
			try {
				await this.conversationAdmission?.dispose?.();
			} catch (error) {
				this.log("admission dispose failed", {
					sessionId: this._sessionId,
					message: error instanceof Error ? error.message : String(error)
				});
			}
			this.events.clear();
			this.setState(LocalConnectionState.Disconnected);
			this.highFreqLog.dispose();
		}
	}
	/**
	* 公开 send：先 ensureConnected（singleflight，断开时惰性 re-spawn），再走内部 raw。
	* 惰性 re-spawn 场景下的 session 恢复（session/load）由上层 Conversation 编排，不在此自动发（哑管子原则）。
	*/
	async send(method, params) {
		const promptCancelEpoch = this.outboundPromptCancellation.capture(method);
		if (method === "session/prompt") await assertConversationWorkspaceUsable(this.cwd);
		await this.ensureConnected();
		if (method === "session/prompt") {
			await this.runtimePreparation.beforePrompt();
			await this.refreshPluginsIfRuntimeChanged();
		}
		let effectiveParams = await prepareOutboundRequest({
			method,
			params,
			launchSpec: this.currentLaunchSpec,
			conversationId: this.id,
			cwd: this.cwd,
			sessionId: this._sessionId,
			hasPriorUserMessages: this.hasSentPromptTurn,
			prepareConversationPrompt: this.prepareConversationPrompt,
			log: (event, ctx) => this.log(event, ctx),
			makeInvalidParamsError: (cause) => this.makeError("INVALID_PARAMS", "Invalid params", false, cause)
		});
		let commitAdmissionResponse;
		if (this.conversationAdmission && (method === "session/load" || method === "session/new" || method === "session/resume")) {
			const prepared = await this.conversationAdmission.prepareSessionRequest({
				method,
				params: effectiveParams ?? {},
				launchSpec: this.currentLaunchSpec
			});
			effectiveParams = prepared.params;
			commitAdmissionResponse = prepared.onResponse;
		}
		if (this.outboundPromptCancellation.wasCancelled(promptCancelEpoch)) {
			this.log("session/prompt cancelled before dispatch", {
				generation: this._generation,
				sessionId: this._sessionId
			});
			return { stopReason: "cancelled" };
		}
		const response = await this.sendRequestRaw(method, effectiveParams);
		commitAdmissionResponse?.(response);
		if (method === "session/prompt") this.hasSentPromptTurn = true;
		return response;
	}
	/** 每轮只做一次整数比较；插件/技能/专家配置有变更时才请求 worker 刷新。 */
	async refreshPluginsIfRuntimeChanged() {
		const revision = this.getConversationRuntimeRevision?.();
		if (revision === void 0 || revision === this.observedRuntimeRevision) return;
		await this.sendRequestRaw("_codebuddy.ai/refreshPlugins", {
			reason: "conversation-runtime-revision-changed",
			revision
		});
		this.observedRuntimeRevision = revision;
	}
	/** 内部 raw：不触发 ensureConnected，避免惰性 re-spawn 递归重入。 */
	sendRequestRaw(method, params, timeoutMsOverride) {
		const activePipe = this.lifecycle.activePipe;
		if (!activePipe) return Promise.reject(this.makeError("CONNECTION_LOST", "not connected"));
		const isPrompt = method === "session/prompt";
		const timeoutMs = isPrompt ? void 0 : (typeof timeoutMsOverride === "number" && timeoutMsOverride > 0 ? Math.min(timeoutMsOverride, 3e5) : void 0) ?? 3e4;
		const gen = this._generation;
		if (isPrompt) return activePipe.sendRequest(method, params, { timeoutMs });
		const startedAt = Date.now();
		return activePipe.sendRequest(method, params, { timeoutMs }).then((result) => {
			this.highFreqLog.highFreq("request ok", {
				method,
				ms: Date.now() - startedAt,
				generation: gen,
				sessionId: this._sessionId
			});
			return result;
		}, (error) => {
			this.log("request fail", {
				method,
				ms: Date.now() - startedAt,
				generation: gen,
				sessionId: this._sessionId
			}, "warn");
			throw error;
		});
	}
	sendNotification(method, params) {
		this.outboundPromptCancellation.recordNotification(method);
		this.lifecycle.activePipe?.sendNotification(method, params);
	}
	onReceive(handler) {
		return this.events.onNotification(handler);
	}
	onReceiveData(handler) {
		return this.events.onRequest(handler);
	}
	onReceiveCommand(handler) {
		return this.events.onState(handler);
	}
	onReceiveError(handler) {
		return this.events.onError(handler);
	}
	/** 杀 Worker 保留实例+订阅。shouldDeferKillWorker 为 true 时不拆、返回 false。 */
	async killWorker(options) {
		if (this.stoppingPromise) {
			await this.stoppingPromise;
			return true;
		}
		if (!options?.force && this.shouldDeferKillWorker?.()) {
			this.log("killWorker:deferred", {
				generation: this._generation,
				sessionId: this._sessionId
			});
			return false;
		}
		this.log("killWorker", {
			generation: this._generation,
			sessionId: this._sessionId
		});
		this.stopping = true;
		this._generation++;
		this.abortController?.abort();
		this.connectPromise = void 0;
		this.launchSpecPrefetch = void 0;
		const barrier = this.lifecycle.killWorker().finally(() => {
			this.stoppingPromise = void 0;
			this.stopping = false;
		});
		this.stoppingPromise = barrier;
		await barrier;
		return true;
	}
	hasLiveWorker() {
		return this.lifecycle.hasLiveWorker();
	}
	setState(next) {
		if (this._state === next) return;
		const from = this._state;
		this._state = next;
		this.events.state(from, next);
	}
	failConnect(code, message, cause) {
		this.lastError = this.makeError(code, message, false, cause);
		this.log("connect failed", {
			generation: this._generation,
			sessionId: this._sessionId,
			code,
			message
		});
		this.emitError(this.lastError);
		this.setState(LocalConnectionState.Error);
	}
	makeError(code, message, retryable = true, cause) {
		return {
			code,
			message,
			retryable,
			cause
		};
	}
	emitError(error) {
		this.log("error", {
			code: error.code,
			message: error.message,
			retryable: error.retryable
		}, "warn");
		this.events.error(error);
	}
	/** 统一诊断日志出口：为事件加模块前缀后交给 logSink（缺省静默；日志绝不影响连接逻辑）。 */
	emit(module, event, ctx, level = "info") {
		try {
			this.logSink?.(`${module} >> ${event}`, ctx, level);
		} catch {}
	}
	/** 关键帧日志（日志由 wb SDK 统一收敛）。 */
	log(event, ctx, level = "info") {
		this.emit("LOCAL_CONNECTION", event, ctx, level);
	}
	/** highFreqLog 的 sink。 */
	logRaw(line) {
		this.emit("LOCAL_CONNECTION", "highfreq", { line });
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/conversation-binding-coordinator.ts
var BINDING_METHODS = /* @__PURE__ */ new Set([
	"session/new",
	"session/load",
	"session/resume"
]);
var ConversationBindingCoordinator = class {
	constructor(host) {
		this.host = host;
		this.current = {
			status: "detached",
			generation: 0
		};
	}
	get state() {
		return this.current;
	}
	onGenerationChanged(generation) {
		if (this.current.generation === generation) return;
		this.current = {
			status: "detached",
			generation
		};
		this.record = void 0;
		this.pending = void 0;
	}
	remember(method, params, response, generation) {
		if (!BINDING_METHODS.has(method) || generation !== this.current.generation) return;
		const conversationId = this.extractConversationId(params, response);
		if (!conversationId) return;
		this.record = {
			generation,
			conversationId,
			resumeParams: {
				...params,
				sessionId: conversationId
			}
		};
		this.current = {
			status: "bound",
			generation,
			conversationId
		};
	}
	restoreAfterTransportReplacement(input) {
		if (input.generation !== this.current.generation) return Promise.resolve();
		if (input.failedMethod && BINDING_METHODS.has(input.failedMethod)) {
			this.current = {
				status: "detached",
				generation: input.generation
			};
			this.record = void 0;
			return Promise.resolve();
		}
		const record = this.record;
		if (!record || record.generation !== input.generation) return Promise.resolve();
		if (this.pending?.generation === input.generation) return this.pending.promise;
		this.current = {
			status: "binding",
			generation: input.generation,
			conversationId: record.conversationId
		};
		const tracked = input.send("session/resume", record.resumeParams).then(() => {
			if (this.record !== record || input.generation !== this.current.generation) return;
			this.current = {
				status: "bound",
				generation: input.generation,
				conversationId: record.conversationId
			};
			this.host.log("post failure conversation restored", {
				conversationId: record.conversationId,
				generation: input.generation
			});
		}).catch((error) => {
			if (this.record === record && input.generation === this.current.generation) this.current = {
				status: "detached",
				generation: input.generation
			};
			throw error;
		}).finally(() => {
			if (this.pending?.promise === tracked) this.pending = void 0;
		});
		this.pending = {
			generation: input.generation,
			promise: tracked
		};
		return tracked;
	}
	extractConversationId(params, response) {
		const responseId = response && typeof response === "object" ? response.sessionId : void 0;
		if (typeof responseId === "string" && responseId) return responseId;
		return typeof params.sessionId === "string" && params.sessionId ? params.sessionId : this.host.getConversationId();
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/acp-http/typed-client-forwarder.ts
async function methodNotFound(method) {
	throw (await Promise.resolve().then(() => require("./acp.js"))).RequestError?.methodNotFound(method) ?? new AcpMethodNotFoundError(method);
}
async function forwardExtensionMethod(host, registry, method, params) {
	if (!registry.isExtensionMethodEnabled(method)) return methodNotFound(method);
	try {
		return await host.respond(method, params);
	} catch (error) {
		if (!(error instanceof Error) || error.message !== `unhandled worker request: ${method}`) throw error;
		return methodNotFound(method);
	}
}
function staleRequestResult(registry, handlerKey, cancelled) {
	return registry.staleGenerationResultFor(handlerKey) === "empty" ? {} : cancelled;
}
/**
* 创建供 `ClientSideConnection` 使用的 typed Client。
* 不实现 fs/terminal/mcp；SDK 若调用未实现可选方法会走协议错误，符合显式拒绝。
*/
function createTypedClientForwarder(host, registry = new ClientMethodRegistry()) {
	const client = {
		sessionUpdate: async (params) => {
			if (!host.isGenerationCurrent()) return;
			host.notify(ACP_CLIENT_METHOD_WIRES.session_update, params);
		},
		requestPermission: async (params) => {
			if (!host.isGenerationCurrent()) return staleRequestResult(registry, "requestPermission", { outcome: { outcome: "cancelled" } });
			return await host.respond(ACP_CLIENT_METHOD_WIRES.session_request_permission, params);
		},
		extNotification: async (method, params) => {
			if (!host.isGenerationCurrent()) return;
			host.notify(method, params);
		},
		extMethod: async (method, params) => {
			if (!host.isGenerationCurrent()) return {};
			return forwardExtensionMethod(host, registry, method, params);
		},
		readTextFile: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.fs_read_text_file),
		writeTextFile: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.fs_write_text_file),
		createTerminal: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.terminal_create),
		terminalOutput: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.terminal_output),
		releaseTerminal: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.terminal_release),
		waitForTerminalExit: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.terminal_wait_for_exit),
		killTerminal: async () => methodNotFound(ACP_CLIENT_METHOD_WIRES.terminal_kill)
	};
	if (registry.isHandlerEnabled("unstable_createElicitation")) client.unstable_createElicitation = async (params) => {
		if (!registry.isElicitationModeEnabled(params.mode)) return methodNotFound(ACP_CLIENT_METHOD_WIRES.elicitation_create);
		if (!host.isGenerationCurrent()) return staleRequestResult(registry, "unstable_createElicitation", { action: "cancel" });
		return await host.respond(ACP_CLIENT_METHOD_WIRES.elicitation_create, params);
	};
	if (registry.isHandlerEnabled("unstable_completeElicitation")) client.unstable_completeElicitation = async (params) => {
		if (!host.isGenerationCurrent()) return;
		host.notify(ACP_CLIENT_METHOD_WIRES.elicitation_complete, params);
	};
	return client;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/acp-http/capability-gateway.ts
/**
* 原子产出 initialize capability 与同代 Client handler。
* 调用方不得再分别构造这两项，否则会重新引入 advertise/handler 漂移。
*/
var CapabilityGateway = class {
	constructor(requestedCapabilities) {
		this.registry = new ClientMethodRegistry(requestedCapabilities);
	}
	get clientCapabilities() {
		return this.registry.clientCapabilities;
	}
	createClient(host) {
		return createTypedClientForwarder(host, this.registry);
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/transport-policy.ts
var IDEMPOTENT_CONFIG_METHODS = /* @__PURE__ */ new Set([
	"session/set_model",
	"session/set_config_option",
	"session/set_mode",
	"_codebuddy.ai/refreshPlugins"
]);
var CONVERSATION_BIND_METHODS = /* @__PURE__ */ new Set([
	"session/new",
	"session/load",
	"session/resume"
]);
function classifyTransportMethod(method) {
	if (method === "session/prompt") return "prompt";
	if (method === "_codebuddy.ai/resolveInterruption") return "resolve-interruption";
	if (method && IDEMPOTENT_CONFIG_METHODS.has(method)) return "idempotent-config";
	if (method && CONVERSATION_BIND_METHODS.has(method)) return "conversation-bind";
	return "other-post";
}
/** Pure request-level replay/recovery policy. It must not read Conversation state. */
function decideTransportPolicy(input) {
	const { failure, methodClass } = input;
	if (methodClass === "prompt") return {
		replay: "never",
		recovery: "replace-transport",
		reason: "prompt-never-replay"
	};
	if (methodClass === "conversation-bind") return {
		replay: "never",
		recovery: "replace-transport",
		reason: "binding-owned-by-coordinator"
	};
	if (failure.attempt > 0) return {
		replay: "never",
		recovery: "replace-transport",
		reason: "retry-exhausted"
	};
	if (methodClass === "resolve-interruption" && failure.phase === "connect" && failure.delivery === "definitely-not-sent") return input.activePrompt ? {
		replay: "same-connection-once",
		recovery: "none",
		reason: "definite-connect-control-retry"
	} : {
		replay: "after-transport-replacement-once",
		recovery: "replace-transport",
		reason: "definite-connect-control-retry"
	};
	if (methodClass === "idempotent-config" && failure.kind === "channel-reset") return {
		replay: "after-transport-replacement-once",
		recovery: "replace-transport",
		reason: "idempotent-config-channel-reset"
	};
	if (failure.delivery === "possibly-sent") return {
		replay: "never",
		recovery: "replace-transport",
		reason: "delivery-uncertain"
	};
	return {
		replay: "never",
		recovery: "replace-transport",
		reason: "unsupported-method"
	};
}
function minimalTransportFailure(method, error) {
	const record = error !== null && typeof error === "object" ? error : void 0;
	const context = {
		method,
		...typeof record?.requestId === "string" || typeof record?.requestId === "number" ? { requestId: record.requestId } : {},
		connectionVersion: 0,
		elapsedMs: 0
	};
	return require_conversations.classifyPostFailure(error, context);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/http-acp-channel.ts
var CONNECTION_TIMEOUT_MS = 18e4;
var POST_TIMEOUT_MS = 108e5;
var SSE_RETRY_INITIAL_DELAY_MS = 200;
var SSE_RETRY_MAX_DELAY_MS = 1e3;
var CLOSE_TIMEOUT_MS = 5e3;
var ERROR_MESSAGE_MAX = 300;
function createLocalAcpFetch(endpoint, fetch) {
	const url = new URL(endpoint);
	if (![
		"127.0.0.1",
		"localhost",
		"[::1]"
	].includes(url.hostname)) return fetch;
	return (input, init) => {
		if (init?.method !== "POST" && init?.method !== "DELETE") return fetch(input, init);
		const headers = new Headers(init.headers);
		headers.set("Connection", "close");
		return fetch(input, {
			...init,
			headers
		});
	};
}
function rawMessageOf(error) {
	return error instanceof Error ? error.message : String(error);
}
function messageOf(error) {
	return rawMessageOf(error).slice(0, ERROR_MESSAGE_MAX);
}
var diagnosticValue = (value) => typeof value === "string" || typeof value === "number" ? value : void 0;
var errorDiagnostics = (error) => {
	const record = error;
	const cause = record.cause && typeof record.cause === "object" ? record.cause : void 0;
	const errorCode = diagnosticValue(record.code);
	const causeCode = diagnosticValue(cause?.code);
	const causeErrno = diagnosticValue(cause?.errno);
	const causeSyscall = diagnosticValue(cause?.syscall);
	const causeAddress = diagnosticValue(cause?.address);
	const causePort = diagnosticValue(cause?.port);
	return {
		errorKind: error.name,
		errorMessage: messageOf(error),
		...errorCode !== void 0 ? { errorCode } : {},
		...cause instanceof Error ? {
			causeKind: cause.name,
			causeMessage: messageOf(cause)
		} : {},
		...causeCode !== void 0 ? { causeCode } : {},
		...causeErrno !== void 0 ? { causeErrno } : {},
		...causeSyscall !== void 0 ? { causeSyscall } : {},
		...causeAddress !== void 0 ? { causeAddress } : {},
		...causePort !== void 0 ? { causePort } : {}
	};
};
var endpointOrigin = (endpoint) => {
	try {
		return new URL(endpoint).origin;
	} catch {
		return;
	}
};
var SSE_RETRY_MESSAGE_FRAGMENT = "StreamableHTTP SSE retry";
var SSE_HEARTBEAT_TIMEOUT_MESSAGE = "StreamableHTTP heartbeat timeout; reconnecting";
var SSE_HEARTBEAT_TIMEOUT_CAUSE_KIND = "sse_heartbeat_timeout";
function isRetryableSseMessage(message) {
	return message.includes(SSE_RETRY_MESSAGE_FRAGMENT);
}
function toConnectionLostCause(error, message) {
	if (message !== SSE_HEARTBEAT_TIMEOUT_MESSAGE) return error;
	return {
		kind: SSE_HEARTBEAT_TIMEOUT_CAUSE_KIND,
		error
	};
}
/** JSON-RPC notification：无 id（undefined / null）。有 id 的 inbound request 仍交给 SDK。 */
var isSessionUpdateNotification = (message) => {
	if (message === null || typeof message !== "object") return false;
	const frame = message;
	return frame.method === "session/update" && (frame.id === void 0 || frame.id === null);
};
/** Owns Streamable HTTP transport and ACP client mechanics; lifecycle policy stays in LocalHttpConnection. */
var HttpAcpChannel = class {
	constructor(host, fetch) {
		this.host = host;
		this.fetch = fetch;
		this.activePromptRequests = 0;
	}
	get isOpen() {
		return this.connection !== void 0 && this.transport !== void 0;
	}
	waitForRecovery() {
		return this.postFailureRecovery?.promise;
	}
	open(runtime, generation, abort) {
		const transport = require_conversations.streamableHttp({
			endpoint: runtime.acpEndpoint,
			fetch: createLocalAcpFetch(runtime.acpEndpoint, this.fetch ?? globalThis.fetch),
			authToken: runtime.authToken,
			signal: abort.signal,
			connectionTimeout: CONNECTION_TIMEOUT_MS,
			postTimeout: POST_TIMEOUT_MS,
			reconnect: {
				initialDelay: SSE_RETRY_INITIAL_DELAY_MS,
				maxDelay: SSE_RETRY_MAX_DELAY_MS
			},
			onConnect: (connectionId) => {
				if (generation !== this.host.getGeneration() || this.host.isDisposed()) return;
				this.host.log("sse connected", {
					generation,
					sessionId: this.host.getSessionId(),
					connectionId
				});
			},
			onDisconnect: (connectionId) => {
				if (generation !== this.host.getGeneration() || this.host.isDisposed() || abort.signal.aborted) return;
				this.host.log("sse disconnected; reconnecting", {
					generation,
					sessionId: this.host.getSessionId(),
					connectionId
				}, "warn");
			},
			onError: (error) => {
				if (this.transport !== transport) return;
				if (generation !== this.host.getGeneration() || this.host.isDisposed()) return;
				const message = rawMessageOf(error);
				if (this.host.getState() !== "connected" && isRetryableSseMessage(message)) {
					this.host.log("sse retry during handshake", { message: messageOf(error) });
					return;
				}
				this.host.emitError(this.host.makeError("CONNECTION_LOST", message, true, toConnectionLostCause(error, message)));
			},
			retryPost: (error, context) => this.activePromptRequests > 0 && decideTransportPolicy({
				methodClass: classifyTransportMethod(context.method),
				failure: context,
				activePrompt: true
			}).replay === "same-connection-once" ? 500 : void 0,
			onPostError: (error, context) => this.transport === transport ? this.schedulePostFailureRecovery(error, context) : void 0
		});
		this.interceptInboundSessionUpdates(transport, generation);
		this.transport = transport;
		return transport;
	}
	async initializeOrRetry(runtime, generation, abort, clientCapabilities, requestTimeoutMs) {
		this.recoveryContext = {
			runtime,
			generation,
			abort,
			clientCapabilities,
			requestTimeoutMs
		};
		try {
			return await this.initialize(generation, clientCapabilities, requestTimeoutMs);
		} catch (error) {
			if (error?.code !== "REQUEST_TIMEOUT") throw error;
			if (!await this.closeBounded("initialize-retry")) throw this.host.makeError("CONNECT_FAILED", "initialize transport did not close before retry", false, error);
			if (generation !== this.host.getGeneration() || abort.signal.aborted || this.host.isDisposed()) throw error;
			const retryTransport = this.open(runtime, generation, abort);
			await this.withTimeout(retryTransport.ready, CONNECTION_TIMEOUT_MS, this.host.makeError("CONNECT_FAILED", "streamableHttp ready timed out", false));
			if (generation !== this.host.getGeneration() || abort.signal.aborted || this.host.isDisposed()) throw error;
			return this.initialize(generation, clientCapabilities, requestTimeoutMs);
		}
	}
	async request(method, params) {
		const isPrompt = method === "session/prompt";
		if (isPrompt) this.activePromptRequests += 1;
		try {
			await this.postFailureRecovery?.promise;
			const connection = this.connection;
			if (!connection) throw this.host.makeError("CONNECTION_LOST", "not connected");
			try {
				return await this.dispatchRequest(connection, method, params);
			} catch (error) {
				const replayedPrefetch = await this.replayPrefetchAfterChannelReset(connection, method, params, error);
				if (replayedPrefetch !== void 0) return replayedPrefetch;
				const replayedControl = await this.replayControlAfterDefiniteConnectFailure(connection, method, params, error);
				if (replayedControl) return replayedControl.value;
				await this.postFailureRecovery?.promise.catch(() => void 0);
				throw error;
			}
		} finally {
			if (isPrompt) this.activePromptRequests -= 1;
		}
	}
	requestCurrent(method, params) {
		const connection = this.connection;
		if (!connection) return Promise.reject(this.host.makeError("CONNECTION_LOST", "replacement connection missing"));
		return this.dispatchRequest(connection, method, params);
	}
	/**
	* 白名单预发在通道 reset 且 onPostError 未换管时，主动 replace 并在新 client 上重发恰好一次。
	* 重发失败原样抛出。onPostError 已登记时返回 undefined，由 caller 只 await 已有 recovery。
	*/
	async replayPrefetchAfterChannelReset(failedConnection, method, params, error) {
		const failure = require_conversations.transportFailureFactOf(error) ?? minimalTransportFailure(method, error);
		if (decideTransportPolicy({
			methodClass: classifyTransportMethod(method),
			failure,
			activePrompt: this.activePromptRequests > 0
		}).replay !== "after-transport-replacement-once") return;
		if (this.postFailureRecovery) return;
		const recovery = this.schedulePostFailureRecovery(error instanceof Error ? error : new Error(String(error)), failure);
		if (recovery) await recovery;
		const next = this.connection;
		if (!next || next === failedConnection) return;
		return this.dispatchRequest(next, method, params);
	}
	/**
	* AskUserQuestion 回答等关键控制态在 TCP connect 明确失败时没有到达 worker。
	* 等同 endpoint 的 transport/client 恢复后补发恰好一次；结果未知的 read/reset
	* 错误不进入本路径，`session/prompt` 也永不重放。
	*/
	async replayControlAfterDefiniteConnectFailure(failedConnection, method, params, error) {
		const failure = require_conversations.transportFailureFactOf(error) ?? minimalTransportFailure(method, error);
		const methodClass = classifyTransportMethod(method);
		if (methodClass !== "resolve-interruption") return;
		if (decideTransportPolicy({
			methodClass,
			failure,
			activePrompt: this.activePromptRequests > 0
		}).replay !== "after-transport-replacement-once") return;
		const recovery = this.postFailureRecovery?.promise ?? this.schedulePostFailureRecovery(error instanceof Error ? error : new Error(String(error)), failure);
		if (!recovery) return;
		try {
			await recovery;
			const next = this.connection;
			if (!next || next === failedConnection) return;
			this.host.log("control request replay after connect failure", {
				method,
				generation: this.host.getGeneration(),
				sessionId: this.host.getSessionId()
			});
			return { value: await this.dispatchRequest(next, method, params) };
		} catch {
			return;
		}
	}
	notify(method, params) {
		const recovery = this.postFailureRecovery?.promise;
		if (recovery) {
			recovery.then(() => this.dispatchNotification(method, params)).catch(() => void 0);
			return;
		}
		this.dispatchNotification(method, params).catch(() => void 0);
	}
	dispatchNotification(method, params) {
		const connection = this.connection;
		if (!connection) return Promise.resolve();
		return method === "session/cancel" ? connection.cancel(params) : connection.extNotification(method, params);
	}
	async closeBounded(stage) {
		const transport = this.transport;
		this.transport = void 0;
		this.connection = void 0;
		if (!transport) return true;
		try {
			await this.withTimeout(transport.close().catch(() => void 0), CLOSE_TIMEOUT_MS, this.host.makeError("CONNECT_FAILED", `${stage}: transport close timed out`, false));
			return true;
		} catch (error) {
			this.host.log("runtime transport close failed or timed out", {
				stage,
				sessionId: this.host.getSessionId(),
				errorKind: error instanceof Error ? error.name : typeof error
			}, "warn");
			return false;
		}
	}
	dispatchRequest(connection, method, params) {
		switch (method) {
			case "initialize": return connection.initialize(params);
			case "session/new": return connection.newSession(params);
			case "session/load": return connection.loadSession(params);
			case "session/resume": return connection.resumeSession(params);
			case "session/prompt": return connection.prompt(params);
			case "session/cancel": return connection.cancel(params);
			case "session/set_mode": return connection.setSessionMode?.(params) ?? connection.extMethod(method, params);
			case "session/set_model": return connection.unstable_setSessionModel?.(params) ?? connection.extMethod(method, params);
			default: return connection.extMethod(method, params);
		}
	}
	schedulePostFailureRecovery(error, post) {
		const context = this.recoveryContext;
		if (!context || context.generation !== this.host.getGeneration() || context.abort.signal.aborted || this.host.isDisposed()) return;
		if (this.postFailureRecovery?.generation === context.generation) return this.postFailureRecovery.promise;
		const tracked = this.replaceTransportAfterPostFailure(context, error, post).catch(async (recoveryError) => {
			await this.host.recycleRuntime("post-failure-recovery", recoveryError, context.generation);
			throw recoveryError;
		}).finally(() => {
			if (this.postFailureRecovery?.promise === tracked) this.postFailureRecovery = void 0;
		});
		tracked.catch(() => void 0);
		this.postFailureRecovery = {
			generation: context.generation,
			promise: tracked
		};
		return tracked;
	}
	/**
	* 重建同一 worker endpoint 的 transport/client。
	* 默认当前 POST 不重发（prompt 永不重发）；明确未连上对端的关键控制态会在换管成功后补发一次。
	* 预发白名单在 request() catch 于 onPostError 未登记时主动调用本方法后再重发一次。
	*/
	async replaceTransportAfterPostFailure(context, error, post) {
		this.host.log("post failed — replace transport", {
			method: post.method,
			requestId: post.requestId,
			endpointOrigin: endpointOrigin(context.runtime.acpEndpoint),
			connectionId: post.connectionId,
			connectionVersion: post.connectionVersion,
			postElapsedMs: post.elapsedMs,
			failurePhase: post.phase,
			deliveryCertainty: post.delivery,
			retryAttempt: post.attempt,
			failureKind: post.kind,
			generation: context.generation,
			sessionId: this.host.getSessionId(),
			...errorDiagnostics(error)
		}, "warn");
		if (!await this.closeBounded("post-failure-recovery")) throw this.host.makeError("CONNECTION_LOST", "post failure transport did not close", true, error);
		if (this.isRecoveryStale(context)) throw this.host.makeError("CONNECTION_LOST", "post failure recovery became stale", true, error);
		const replacement = this.open(context.runtime, context.generation, context.abort);
		await this.withTimeout(replacement.ready, CONNECTION_TIMEOUT_MS, this.host.makeError("CONNECTION_LOST", "post failure replacement transport timed out", true, error));
		if (this.isRecoveryStale(context)) throw this.host.makeError("CONNECTION_LOST", "post failure replacement became stale", true, error);
		const initializeResponse = await this.initialize(context.generation, context.clientCapabilities, context.requestTimeoutMs);
		if (this.isRecoveryStale(context)) throw this.host.makeError("CONNECTION_LOST", "post failure initialize became stale", true, error);
		this.host.onInitialize(initializeResponse);
		await this.host.onTransportReplaced?.(context.generation, post.method);
		this.host.log("post failure transport replaced", {
			method: post.method,
			requestId: post.requestId,
			generation: context.generation,
			sessionId: this.host.getSessionId()
		});
	}
	isRecoveryStale(context) {
		return context.generation !== this.host.getGeneration() || context.abort.signal.aborted || this.host.isDisposed();
	}
	async initialize(generation, clientCapabilities, requestTimeoutMs) {
		if (!this.transport) throw this.host.makeError("CONNECT_FAILED", "http transport missing before initialize", false);
		const { ClientSideConnection: ConnectionCtor, PROTOCOL_VERSION } = await Promise.resolve().then(() => require("./acp.js"));
		const gateway = new CapabilityGateway(clientCapabilities);
		const connection = new ConnectionCtor(() => this.createClient(generation, gateway), this.transport);
		this.connection = connection;
		return this.withTimeout(connection.initialize({
			protocolVersion: PROTOCOL_VERSION,
			clientCapabilities: gateway.clientCapabilities
		}), requestTimeoutMs, this.host.makeError("REQUEST_TIMEOUT", "request timeout: initialize", true));
	}
	/**
	* SDK v1 `zSessionUpdate` 会丢掉未知 kind（例如 terminal_update）。
	* 在交给 ClientSideConnection 前转发无 id 的 session/update；每次重建 transport 都经 open() 安装。
	*/
	interceptInboundSessionUpdates(transport, generation) {
		const transform = new TransformStream({ transform: (chunk, controller) => {
			if (!isSessionUpdateNotification(chunk)) {
				controller.enqueue(chunk);
				return;
			}
			if (generation !== this.host.getGeneration() || this.host.isDisposed()) return;
			this.host.notify("session/update", chunk.params);
		} });
		transport.readable.pipeTo(transform.writable).catch(() => {});
		Object.defineProperty(transport, "readable", { value: transform.readable });
	}
	createClient(generation, gateway) {
		return gateway.createClient({
			isGenerationCurrent: () => generation === this.host.getGeneration() && !this.host.isDisposed(),
			notify: (method, params) => this.host.notify(method, params),
			respond: (method, params) => this.host.respond(method, params)
		});
	}
	async withTimeout(promise, timeoutMs, error) {
		let timeoutId;
		try {
			return await Promise.race([promise, new Promise((_, reject) => {
				timeoutId = setTimeout(() => reject(error), timeoutMs);
			})]);
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}
};
var LOCAL_HTTP_CONNECTION_TIMEOUT_MS = CONNECTION_TIMEOUT_MS;
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/local-http-runtime-cleanup.ts
/** HTTP runtime lease 的有界 close/release；连接主类只负责生命周期编排。 */
var LocalHttpRuntimeCleanup = class {
	constructor(init) {
		this.init = init;
		this.acquired = false;
	}
	markAcquired(exactRelease) {
		this.acquired = true;
		this.exactRelease = exactRelease;
	}
	/** close 卡死也必须继续 release，两步各自使用独立的最终期限。 */
	async teardown(stage) {
		await this.init.closeBounded(stage);
		try {
			await this.withTimeout(this.release(), 5e3, `${stage}: runtime release timed out`);
		} catch (error) {
			this.init.log("runtime release failed or timed out", {
				stage,
				sessionId: this.init.getSessionId(),
				errorKind: error instanceof Error ? error.name : typeof error
			}, "warn");
		}
	}
	async withTimeout(promise, timeoutMs, message) {
		let timeoutId;
		try {
			return await Promise.race([promise, new Promise((_, reject) => {
				timeoutId = setTimeout(() => reject(this.init.makeTimeoutError(message)), timeoutMs);
			})]);
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}
	async release() {
		if (!this.acquired) return;
		this.acquired = false;
		const exactRelease = this.exactRelease;
		this.exactRelease = void 0;
		if (exactRelease) await exactRelease();
		else await this.init.fallbackRelease?.();
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/local-http-workspace-preflight.ts
var WORKSPACE_PERMISSION_DENIED_CODE = "WORKSPACE_PERMISSION_DENIED";
async function preflightLocalHttpWorkspace(input) {
	let result;
	try {
		result = await input.checkWorkspaceAccess(input.context);
	} catch (error) {
		input.log("workspace access preflight unavailable", {
			sessionId: input.diagnosticConversationId,
			cwd: input.context.cwd,
			message: error instanceof Error ? error.message : String(error)
		}, "warn");
		return;
	}
	if (result.ok || !result.permissionDenied) return;
	const error = input.makeError(WORKSPACE_PERMISSION_DENIED_CODE, `Workspace access denied: ${result.cwd}`, false, {
		code: WORKSPACE_PERMISSION_DENIED_CODE,
		message: result.message ?? "Workspace access denied",
		data: {
			transportCode: WORKSPACE_PERMISSION_DENIED_CODE,
			fsCode: result.code,
			cwd: result.cwd,
			isMacProtectedLocation: result.isMacProtectedLocation === true
		}
	});
	input.log("workspace access preflight failed", {
		sessionId: input.diagnosticConversationId,
		cwd: result.cwd,
		fsCode: result.code,
		isMacProtectedLocation: result.isMacProtectedLocation === true
	}, "warn");
	return error;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/runtime-acquisition-marks.ts
function markRuntimeAcquired(input) {
	const { startupAttempt, generation, requestedAt, readyAt, runtime } = input;
	const acquisitionKind = runtime.acquisitionKind ?? "reused";
	const physicalSpawnAt = runtime.physicalSpawnAtEpochMs;
	const clockInvalid = physicalSpawnAt !== void 0 && (physicalSpawnAt < requestedAt || physicalSpawnAt > readyAt);
	if (physicalSpawnAt !== void 0 && !clockInvalid) startupAttempt?.onMark("W2P", {
		attemptId: startupAttempt.traceId,
		startupPath: acquisitionKind,
		generation,
		physicalSpawnAtEpochMs: physicalSpawnAt,
		clockInvalid: false
	});
	startupAttempt?.onMark("W2A", {
		attemptId: startupAttempt.traceId,
		startupPath: acquisitionKind,
		generation,
		acquireRequestedAtEpochMs: requestedAt,
		acquireReadyAtEpochMs: readyAt,
		measurementMissing: acquisitionKind !== "prewarm-hit" && (physicalSpawnAt === void 0 || clockInvalid),
		clockInvalid
	});
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/runtime-launch-spec-cache.ts
var PREFETCH_TTL_MS = 3e4;
var RuntimeLaunchSpecCache = class {
	constructor(host) {
		this.host = host;
	}
	get(context) {
		const key = `${context.conversationId}\u0000${context.cwd}`;
		if (this.current?.key === key && (this.current.expiresAt === void 0 || this.current.expiresAt > Date.now())) return this.current.promise;
		const promise = Promise.resolve().then(() => this.host.resolve(context));
		this.current = {
			key,
			promise
		};
		promise.then(() => {
			if (this.current?.promise === promise) this.current.expiresAt = Date.now() + PREFETCH_TTL_MS;
		}).catch(() => {
			this.release(promise);
		});
		return promise;
	}
	release(promise) {
		if (this.current?.promise === promise) this.current = void 0;
	}
	invalidate() {
		this.current = void 0;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/runtime-lifecycle-controller.ts
var RuntimeLifecycleController = class {
	constructor(host) {
		this.host = host;
		this.phase = "disconnected";
		this.publicState = LocalConnectionState.Disconnected;
		this.generationValue = 0;
		this.urgency = "high";
		this.terminalStopRequested = false;
	}
	get state() {
		return this.phase;
	}
	get connectionState() {
		return this.publicState;
	}
	get generation() {
		return this.generationValue;
	}
	get isDisposed() {
		return this.phase === "disposed";
	}
	get isStopping() {
		return this.phase === "stopping" || this.stopOperation !== void 0;
	}
	get stopBarrier() {
		return this.stopOperation;
	}
	get acquireUrgency() {
		return this.urgency;
	}
	setPublicState(next) {
		if (this.publicState === next) return;
		const from = this.publicState;
		this.publicState = next;
		this.host.onPublicStateChange(from, next);
	}
	ensureConnected(incomingUrgency, connect) {
		if (this.isDisposed) return Promise.reject(this.host.makeConnectionLostError("connection disposed", false));
		if (this.stopOperation) {
			this.host.log("ensureConnected wait for runtime stop", { generation: this.generationValue });
			return this.stopOperation.then(() => this.ensureConnected(incomingUrgency, connect));
		}
		if (this.phase === "stopping") return Promise.reject(this.host.makeConnectionLostError("connection stopping, retry later", true));
		if (this.connectOperation) {
			if (incomingUrgency === "high" && this.urgency !== "high") {
				this.urgency = "high";
				this.host.log("ensureConnected upgrade in-flight acquire to high", { generation: this.generationValue });
			}
			this.host.log("ensureConnected reuse in-flight connectPromise", { generation: this.generationValue });
			return this.connectOperation;
		}
		this.urgency = incomingUrgency;
		const operation = connect().finally(() => {
			if (this.connectOperation === operation) this.connectOperation = void 0;
		});
		this.connectOperation = operation;
		return operation;
	}
	beginConnect() {
		const abort = new AbortController();
		this.abortController = abort;
		this.generationValue += 1;
		this.phase = "acquiring";
		this.setPublicState(LocalConnectionState.Connecting);
		return {
			generation: this.generationValue,
			abort
		};
	}
	markHandshaking(token) {
		if (!this.isCurrent(token)) return false;
		this.phase = "handshaking";
		return true;
	}
	markReady(token) {
		if (!this.isCurrent(token)) return false;
		this.phase = "ready";
		this.setPublicState(LocalConnectionState.Connected);
		return true;
	}
	markError() {
		if (this.isDisposed) return;
		this.phase = "disconnected";
		this.setPublicState(LocalConnectionState.Error);
	}
	isCurrent(token) {
		return token.generation === this.generationValue && token.abort === this.abortController && !token.abort.signal.aborted;
	}
	async stop(dispose, teardown) {
		await this.runStop(dispose, "stopping", teardown);
	}
	async recover(teardown) {
		await this.runStop(false, "recovering", teardown);
	}
	async runStop(dispose, phase, teardown) {
		if (this.isDisposed) return;
		if (this.stopOperation) {
			if (!dispose || this.terminalStopRequested) {
				await this.stopOperation;
				return;
			}
			this.terminalStopRequested = true;
			const escalated = this.stopOperation.then(() => this.startStop(true, "stopping", teardown), (error) => this.startStop(true, "stopping", teardown).then(() => Promise.reject(error)));
			this.stopOperation = escalated;
			await escalated;
			return;
		}
		await this.startStop(dispose, phase, teardown);
	}
	async startStop(dispose, phase, teardown) {
		if (dispose) this.terminalStopRequested = true;
		this.phase = phase;
		this.generationValue += 1;
		const operation = Promise.resolve().then(teardown).finally(() => {
			this.setPublicState(LocalConnectionState.Disconnected);
			this.phase = dispose ? "disposed" : "disconnected";
			if (this.stopOperation === operation) this.stopOperation = void 0;
		});
		this.stopOperation = operation;
		this.connectOperation = void 0;
		this.abortController?.abort();
		await operation;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/core/local-http-connection/local-http-connection.ts
/** 总体 connect 超时；win 45s / 其它 60s，本实现先用 60s。 */
var DEFAULT_HTTP_CONNECT_TIMEOUT_MS = 6e4;
/** transport close / pool release 各自的最终期限；两步独立 bounded，close 卡死也必须进入 release。 */
var RUNTIME_CLEANUP_STEP_TIMEOUT_MS = 5e3;
var EMPTY_LAUNCH_SPEC = {
	env: {},
	mcpServers: [],
	restartFingerprint: ""
};
var LocalHttpConnection = class {
	constructor(init) {
		this.transport = "local";
		this.outboundPromptCancellation = new OutboundPromptCancellation();
		this.observedRuntimeRevision = 0;
		this.hasSentPromptTurn = false;
		this.events = new require_conversations.ManagedConnectionEvents();
		this.id = init.id;
		this.cwd = init.cwd;
		this._sessionId = init.sessionId;
		this.resolveLaunchSpec = init.resolveLaunchSpec;
		this.conversationAdmission = init.conversationAdmission;
		this.prepareConversationPrompt = init.prepareConversationPrompt;
		this.getConversationRuntimeRevision = init.getConversationRuntimeRevision;
		this.checkWorkspaceAccess = init.checkWorkspaceAccess;
		this.acquireLocalHttpRuntime = init.acquireLocalHttpRuntime;
		this.observedRuntimeRevision = init.getConversationRuntimeRevision?.() ?? 0;
		this.connectTimeoutMs = init.connectTimeoutMs ?? DEFAULT_HTTP_CONNECT_TIMEOUT_MS;
		this.logSink = init.logSink;
		this.highFreqLog = new RateLimitedLogger({
			tag: "LocalHttpConnection",
			ratePerSec: 20,
			sink: (line) => this.logRaw(line)
		});
		this.binding = new ConversationBindingCoordinator({
			getConversationId: () => this._sessionId,
			log: (event, context) => this.log(event, context)
		});
		this.runtimeLaunchSpecs = new RuntimeLaunchSpecCache({ resolve: (context) => this.resolveLaunchSpec(this.withSessionMcpPolicy(context)) });
		this.lifecycle = new RuntimeLifecycleController({
			onPublicStateChange: (from, to) => this.events.state(from, to),
			makeConnectionLostError: (message, retryable) => this.makeError("CONNECTION_LOST", message, retryable),
			log: (event, context) => this.log(event, context)
		});
		this.channel = new HttpAcpChannel({
			getGeneration: () => this.lifecycle.generation,
			getState: () => this.lifecycle.connectionState,
			getSessionId: () => this._sessionId,
			isDisposed: () => this.lifecycle.isDisposed,
			notify: (method, params) => this.events.notify(method, params),
			respond: (method, params) => this.events.respond(method, params),
			onInitialize: (response) => this.conversationAdmission?.onInitialize(response),
			onTransportReplaced: (generation, failedMethod) => this.binding.restoreAfterTransportReplacement({
				generation,
				failedMethod,
				send: (method, params) => this.runtimeCleanup.withTimeout(this.channel.requestCurrent(method, params), this.connectTimeoutMs, "request timeout: session/resume")
			}),
			recycleRuntime: (stage, error, generation) => this.recycleRuntimeAfterFailure(stage, error, generation),
			emitError: (error) => this.emitError(error),
			makeError: (code, message, retryable, cause) => this.makeError(code, message, retryable, cause),
			log: (event, ctx, level) => this.log(event, ctx, level)
		}, init.fetch);
		this.runtimeCleanup = new LocalHttpRuntimeCleanup({
			closeBounded: (stage) => this.channel.closeBounded(stage),
			fallbackRelease: init.releaseLocalHttpRuntime ? () => init.releaseLocalHttpRuntime(this.id) : void 0,
			getSessionId: () => this._sessionId,
			makeTimeoutError: (message) => this.makeError("CONNECT_FAILED", message, false),
			log: (event, ctx, level) => this.log(event, ctx, level)
		});
		this.runtimePreparation = new RuntimePreparationCoordinator({
			getGeneration: () => this.lifecycle.generation,
			getLaunchSpec: () => this.currentLaunchSpec,
			sendRequest: (method, params, timeoutMs) => this.sendRequestRaw(method, params, timeoutMs),
			makeConnectionLostError: (stage) => this.makeError("CONNECTION_LOST", `worker changed during before-${stage} preparation`)
		});
	}
	setWorkerStartupAttempt(attempt) {
		this.workerStartupAttempt = attempt;
	}
	get generation() {
		return this.lifecycle.generation;
	}
	get state() {
		return this.lifecycle.connectionState;
	}
	get currentState() {
		return this.lifecycle.connectionState;
	}
	get sessionId() {
		return this._sessionId;
	}
	get isConnected() {
		return this.lifecycle.connectionState === LocalConnectionState.Connected;
	}
	getSessionId() {
		return this._sessionId;
	}
	get lastFingerprint() {
		return this._lastFingerprint;
	}
	withSessionMcpPolicy(ctx) {
		const sessionMcpPolicy = this.getSessionMcpPolicy?.();
		return sessionMcpPolicy ? {
			...ctx,
			sessionMcpPolicy
		} : ctx;
	}
	preloadRuntime() {
		if (!this.resolveLaunchSpec || !this._sessionId || this.lifecycle.isDisposed) return;
		this.runtimeLaunchSpecs.get({
			conversationId: this.id,
			cwd: this.cwd
		}).catch((error) => {
			this.log("runtime preload failed", { errorKind: error instanceof Error ? error.name : typeof error }, "warn");
		});
	}
	async refreshRuntime(options) {
		this.runtimeLaunchSpecs.invalidate();
		if (!this.resolveLaunchSpec || !this._sessionId || !this.hasLiveWorker()) return false;
		if (options?.forceRestart) {
			this.log("runtime refresh force restart", {
				sessionId: this._sessionId,
				generation: this.generation
			});
			return this.killWorker({ force: true });
		}
		if (!await runRuntimeRestartEvaluation({
			connecting: this.lifecycle.connectionState === LocalConnectionState.Connecting,
			lastFingerprint: this._lastFingerprint,
			currentLaunchSpec: this.currentLaunchSpec,
			sessionId: this._sessionId,
			state: this.lifecycle.connectionState,
			resolveNext: () => this.resolveLaunchSpec(this.withSessionMcpPolicy({
				conversationId: this.id,
				cwd: this.cwd
			})),
			log: (event, ctx) => this.log(event, ctx)
		})) return false;
		return this.killWorker();
	}
	/**
	* 仅 Connected 且已写入空 MCP 的 generation 探测一次。
	* currentLaunchSpec 未写入 ≠ 空 MCP，且不得预支 mcpRecoveryProbedGeneration。
	*/
	consumeMcpRecoveryProbe() {
		if (!this.resolveLaunchSpec || !this._sessionId || !this.hasLiveWorker()) return false;
		if (this.lifecycle.connectionState !== LocalConnectionState.Connected || this.currentLaunchSpec === void 0) return false;
		if (this.currentLaunchSpec.mcpIntentionallyEmpty) return false;
		if (this.currentLaunchSpec.mcpServers.length !== 0) return false;
		if (this.mcpRecoveryProbedGeneration === this.lifecycle.generation) return false;
		this.mcpRecoveryProbedGeneration = this.lifecycle.generation;
		return true;
	}
	async connect(options) {
		if (options?.sessionId) this._sessionId = options.sessionId;
		await assertConversationWorkspaceUsable(options?.cwd ?? this.cwd);
		await this.ensureConnected(options);
	}
	ensureConnected(options) {
		const incomingUrgency = options?.urgency ?? "high";
		return this.lifecycle.ensureConnected(incomingUrgency, async () => {
			const postFailureRecovery = this.channel.waitForRecovery();
			if (postFailureRecovery) {
				await postFailureRecovery;
				return;
			}
			if (this.lifecycle.connectionState === LocalConnectionState.Connected && this.channel.isOpen) return;
			await this.doConnect(options);
		});
	}
	async doConnect(options) {
		const token = this.lifecycle.beginConnect();
		const { generation } = token;
		this.binding.onGenerationChanged(generation);
		const startupAttempt = this.workerStartupAttempt;
		const startedAt = Date.now();
		this.log("acquire local http runtime", {
			generation,
			sessionId: this._sessionId,
			cwd: options?.cwd ?? this.cwd
		});
		const { launch, launchSpecMs } = await this.resolveLaunchForConnect(options, token);
		this.assertCurrentGeneration(token, "after launch spec");
		const runtime = await this.acquireRuntimeForConnect(options, token, launch, launchSpecMs, startupAttempt);
		this.assertCurrentGeneration(token, "after runtime acquire");
		const httpStartedAt = await this.initializeRuntimeForConnect(runtime, token, options);
		this.assertCurrentGeneration(token, "after runtime initialize");
		this._lastFingerprint = launch.restartFingerprint;
		this.currentLaunchSpec = launch;
		this.runtimePreparation.reset();
		if (!this.lifecycle.markReady(token)) throw this.makeError("CONNECT_FAILED", "connect aborted before ready");
		this.log("connected", {
			generation,
			sessionId: this._sessionId,
			launchSpecMs,
			httpReadyMs: Date.now() - httpStartedAt,
			connectMs: Date.now() - startedAt
		});
	}
	async resolveLaunchForConnect(options, token) {
		if (!this.resolveLaunchSpec || !this._sessionId) return {
			launch: EMPTY_LAUNCH_SPEC,
			launchSpecMs: 0
		};
		const startedAt = Date.now();
		const launchSpecPromise = this.runtimeLaunchSpecs.get({
			conversationId: this.id,
			cwd: options?.cwd ?? this.cwd,
			signal: token.abort.signal
		});
		let launch;
		try {
			launch = await launchSpecPromise;
		} catch (error) {
			this.failConnect("CONNECT_FAILED", `resolve launch spec failed: ${error instanceof Error ? error.message : String(error)}`, error);
			throw this.lastError;
		} finally {
			this.runtimeLaunchSpecs.release(launchSpecPromise);
		}
		if (this.isStale(token)) {
			this.log("abort connect before acquire (stale after resolveLaunchSpec)", { generation: token.generation });
			throw this.makeError("CONNECT_FAILED", "stale after resolveLaunchSpec");
		}
		return {
			launch,
			launchSpecMs: Date.now() - startedAt
		};
	}
	async acquireRuntimeForConnect(options, token, launch, launchSpecMs, startupAttempt) {
		const admissionArgs = this.conversationAdmission?.launchArgs ?? [];
		const specForAcquire = {
			...launch,
			args: [...launch.args ?? [], ...admissionArgs]
		};
		if (this.checkWorkspaceAccess) {
			const workspaceError = await preflightLocalHttpWorkspace({
				checkWorkspaceAccess: this.checkWorkspaceAccess,
				context: this.withSessionMcpPolicy({
					conversationId: this.id,
					cwd: options?.cwd ?? this.cwd
				}),
				diagnosticConversationId: this._sessionId,
				makeError: (code, message, retryable, cause) => this.makeError(code, message, retryable, cause),
				log: (event, context, level) => this.log(event, context, level)
			});
			if (workspaceError) {
				this.lastError = workspaceError;
				this.emitError(workspaceError);
				this.setState(LocalConnectionState.Error);
				throw workspaceError;
			}
		}
		this.assertCurrentGeneration(token, "after workspace preflight");
		const requestedAt = Date.now();
		startupAttempt?.onMark("W1", {
			attemptId: startupAttempt.traceId,
			startupPath: "http",
			generation: token.generation,
			launchSpecMs
		});
		let runtime;
		try {
			runtime = await this.acquireLocalHttpRuntime(this.withSessionMcpPolicy({
				conversationId: this.id,
				cwd: options?.cwd ?? this.cwd,
				acquireUrgency: this.lifecycle.acquireUrgency,
				getAcquireUrgency: () => this.lifecycle.acquireUrgency
			}), specForAcquire);
			this.runtimeCleanup.markAcquired(runtime.release);
			markRuntimeAcquired({
				startupAttempt,
				generation: token.generation,
				requestedAt,
				readyAt: Date.now(),
				runtime
			});
		} catch (error) {
			this.failConnect("CONNECT_FAILED", `acquire local http runtime failed: ${error instanceof Error ? error.message : String(error)}`, error);
			throw this.lastError;
		}
		if (this.isStale(token) || this.lifecycle.isDisposed) {
			this.log("abort connect after acquire (stale) — release runtime", { generation: token.generation });
			await this.runtimeCleanup.teardown("stale-after-acquire");
			throw this.makeError("CONNECT_FAILED", "connect aborted (stale after acquire)");
		}
		return runtime;
	}
	async initializeRuntimeForConnect(runtime, token, options) {
		const startedAt = Date.now();
		if (!this.lifecycle.markHandshaking(token)) throw this.makeError("CONNECT_FAILED", "connect aborted before transport open");
		try {
			const transport = this.channel.open(runtime, token.generation, token.abort);
			await this.runtimeCleanup.withTimeout(transport.ready, LOCAL_HTTP_CONNECTION_TIMEOUT_MS, "streamableHttp ready timed out");
			if (this.isStale(token) || this.lifecycle.isDisposed) {
				await this.runtimeCleanup.teardown("stale-after-transport-ready");
				throw this.makeError("CONNECT_FAILED", "connect aborted (stale after transport ready)");
			}
			const response = await this.channel.initializeOrRetry(runtime, token.generation, token.abort, options?.clientCapabilities, this.connectTimeoutMs);
			this.conversationAdmission?.onInitialize(response);
			await this.conversationAdmission?.activate?.((method, params) => this.sendRequestRaw(method, params, this.connectTimeoutMs));
		} catch (error) {
			await this.runtimeCleanup.teardown("initialize-failed");
			const message = `initialize failed: ${error?.message ?? String(error)}`;
			const selfAborted = this.isStale(token) || token.abort.signal.aborted;
			this.failConnect("CONNECT_FAILED", message, error, selfAborted);
			throw this.lastError;
		}
		if (this.isStale(token) || this.lifecycle.isDisposed) {
			this.log("abort connect after initialize (stale) — release runtime", { generation: token.generation });
			await this.runtimeCleanup.teardown("stale-after-initialize");
			throw this.makeError("CONNECT_FAILED", "connect aborted (stale generation)");
		}
		return startedAt;
	}
	isStale(token) {
		return !this.lifecycle.isCurrent(token);
	}
	assertCurrentGeneration(token, stage) {
		if (this.lifecycle.isCurrent(token)) return;
		throw this.makeError("CONNECT_FAILED", `connect aborted (${stage})`);
	}
	async disconnect() {
		this.log("disconnect", {
			generation: this.lifecycle.generation,
			sessionId: this._sessionId
		});
		this.runtimeLaunchSpecs.invalidate();
		const stopping = this.lifecycle.stop(true, async () => {
			try {
				await this.runtimeCleanup.teardown("disconnect");
			} catch (error) {
				this.log("disconnect teardown failed", {
					sessionId: this._sessionId,
					message: error instanceof Error ? error.message : String(error)
				});
			}
			try {
				const disposeAdmission = this.conversationAdmission?.dispose?.();
				if (disposeAdmission) await this.runtimeCleanup.withTimeout(disposeAdmission, RUNTIME_CLEANUP_STEP_TIMEOUT_MS, "conversation admission dispose timed out");
			} catch (error) {
				this.log("admission dispose failed", {
					sessionId: this._sessionId,
					message: error instanceof Error ? error.message : String(error)
				});
			}
		});
		this.binding.onGenerationChanged(this.lifecycle.generation);
		await stopping;
		this.binding.onGenerationChanged(this.lifecycle.generation);
		this.events.clear();
		this.highFreqLog.dispose();
	}
	async send(method, params) {
		const promptCancelEpoch = this.outboundPromptCancellation.capture(method);
		if (method === "session/prompt") await assertConversationWorkspaceUsable(this.cwd);
		await this.ensureConnected();
		if (method === "session/prompt") await this.runtimePreparation.beforePrompt();
		let effectiveParams = await prepareOutboundRequest({
			method,
			params,
			launchSpec: this.currentLaunchSpec,
			conversationId: this.id,
			cwd: this.cwd,
			sessionId: this._sessionId,
			hasPriorUserMessages: this.hasSentPromptTurn,
			prepareConversationPrompt: this.prepareConversationPrompt,
			log: (event, ctx) => this.log(event, ctx),
			makeInvalidParamsError: (cause) => this.makeError("INVALID_PARAMS", "Invalid params", false, cause)
		});
		let commitAdmissionResponse;
		if (this.conversationAdmission && (method === "session/load" || method === "session/new" || method === "session/resume")) {
			const prepared = await this.conversationAdmission.prepareSessionRequest({
				method,
				params: effectiveParams ?? {},
				launchSpec: this.currentLaunchSpec
			});
			effectiveParams = prepared.params;
			commitAdmissionResponse = prepared.onResponse;
		}
		if (this.outboundPromptCancellation.wasCancelled(promptCancelEpoch)) {
			this.log("session/prompt cancelled before dispatch", {
				generation: this.lifecycle.generation,
				sessionId: this._sessionId
			});
			return { stopReason: "cancelled" };
		}
		const requestGeneration = this.lifecycle.generation;
		const response = await this.sendRequestRaw(method, effectiveParams);
		if (requestGeneration === this.lifecycle.generation) {
			commitAdmissionResponse?.(response);
			this.binding.remember(method, effectiveParams ?? {}, response, requestGeneration);
		}
		if (method === "session/prompt") this.hasSentPromptTurn = true;
		return response;
	}
	/**
	* 仅为已存活的 worker 补收敛运行态插件变更。
	*
	* 新 worker 的启动刷新由 Agent CLI 自己负责；这里不能建连或唤醒 worker，
	* 否则会把新 worker 又变成 Prompt 前的重复 refresh。
	*/
	async refreshPluginsIfRuntimeChanged(expectedGeneration) {
		const generation = this.lifecycle.generation;
		if (expectedGeneration !== void 0 && expectedGeneration !== generation || !this.hasLiveWorker()) return;
		const revision = this.getConversationRuntimeRevision?.();
		if (revision === void 0 || revision === this.observedRuntimeRevision) return;
		try {
			await this.sendRequestRaw("_codebuddy.ai/refreshPlugins", {
				reason: "conversation-runtime-revision-changed",
				revision
			});
		} catch (error) {
			this.log("refreshPlugins failed — continue prompt", {
				generation: this.lifecycle.generation,
				sessionId: this._sessionId,
				revision,
				errorCode: typeof error?.code === "string" ? error.code : void 0
			}, "warn");
			return;
		}
		if (this.lifecycle.generation === generation && this.hasLiveWorker()) this.observedRuntimeRevision = revision;
	}
	sendRequestRaw(method, params, timeoutMsOverride) {
		const isPrompt = method === "session/prompt";
		const timeoutMs = isPrompt ? void 0 : (typeof timeoutMsOverride === "number" && timeoutMsOverride > 0 ? Math.min(timeoutMsOverride, 3e5) : void 0) ?? 3e4;
		const gen = this.lifecycle.generation;
		const startedAt = Date.now();
		const request = this.channel.request(method, params ?? {});
		const timed = timeoutMs === void 0 ? request : this.runtimeCleanup.withTimeout(request, timeoutMs, `${method} timed out`);
		if (isPrompt) return timed;
		return timed.then((result) => {
			this.highFreqLog.highFreq("request ok", {
				method,
				ms: Date.now() - startedAt,
				generation: gen,
				sessionId: this._sessionId
			});
			return result;
		}, (error) => {
			this.log("request fail", {
				method,
				ms: Date.now() - startedAt,
				generation: gen,
				sessionId: this._sessionId
			}, "warn");
			throw error;
		});
	}
	/** POST transport 自恢复失败后废弃当前 runtime；与 prompt 活跃度监控无关。 */
	async recycleRuntimeAfterFailure(stage, error, failedGeneration) {
		if (failedGeneration !== this.lifecycle.generation) {
			this.log("runtime recycle skipped for stale generation", {
				stage,
				failedGeneration,
				generation: this.lifecycle.generation,
				sessionId: this._sessionId
			});
			return;
		}
		this.log("runtime recovery failed — recycle worker", {
			stage,
			generation: failedGeneration,
			sessionId: this._sessionId,
			errorKind: error instanceof Error ? error.name : typeof error
		}, "warn");
		this.runtimeLaunchSpecs.invalidate();
		this.runtimePreparation.reset();
		const recovering = this.lifecycle.recover(async () => {
			await this.runtimeCleanup.teardown(stage);
		});
		this.binding.onGenerationChanged(this.lifecycle.generation);
		await recovering;
	}
	sendNotification(method, params) {
		this.outboundPromptCancellation.recordNotification(method);
		this.channel.notify(method, params ?? {});
	}
	onReceive(handler) {
		return this.events.onNotification(handler);
	}
	onReceiveData(handler) {
		return this.events.onRequest(handler);
	}
	onReceiveCommand(handler) {
		return this.events.onState(handler);
	}
	onReceiveError(handler) {
		return this.events.onError(handler);
	}
	async killWorker(options) {
		if (this.lifecycle.stopBarrier) {
			await this.lifecycle.stopBarrier;
			return true;
		}
		if (!options?.force && this.shouldDeferKillWorker?.()) {
			this.log("killWorker:deferred", {
				generation: this.lifecycle.generation,
				sessionId: this._sessionId
			});
			return false;
		}
		this.log("killWorker", {
			generation: this.lifecycle.generation,
			sessionId: this._sessionId
		});
		this.runtimeLaunchSpecs.invalidate();
		const stopping = this.lifecycle.stop(false, async () => {
			await this.runtimeCleanup.teardown("kill-worker");
		});
		this.binding.onGenerationChanged(this.lifecycle.generation);
		await stopping;
		return true;
	}
	hasLiveWorker() {
		return this.channel.isOpen;
	}
	setState(next) {
		if (next === LocalConnectionState.Error) {
			this.lifecycle.markError();
			return;
		}
		this.lifecycle.setPublicState(next);
	}
	failConnect(code, message, cause, selfAborted = false) {
		this.lastError = selfAborted ? this.makeSelfAbortedConnectError(message, cause) : this.makeError(code, message, false, cause);
		this.log("connect failed", {
			generation: this.lifecycle.generation,
			sessionId: this._sessionId,
			code,
			message,
			selfAborted
		});
		this.emitError(this.lastError);
		if (!selfAborted) this.setState(LocalConnectionState.Error);
	}
	/** HTTP 自杀 / stale abort：结构化标记，禁止靠 message 文案识别。 */
	makeSelfAbortedConnectError(message, wrapped) {
		return {
			code: "CONNECT_FAILED",
			message,
			retryable: false,
			cause: {
				connectSelfAborted: true,
				...wrapped !== void 0 ? { wrapped } : {}
			},
			connectSelfAborted: true
		};
	}
	makeError(code, message, retryable = true, cause) {
		return {
			code,
			message,
			retryable,
			cause
		};
	}
	emitError(error) {
		this.log("error", {
			code: error.code,
			message: error.message,
			retryable: error.retryable
		}, "warn");
		this.events.error(error);
		this.scheduleReacquireAfterConnectionLost(error);
	}
	/**
	* 非 heartbeat 的 CONNECTION_LOST：废弃当前 runtime，让后续 send/retry 重新 acquire（新 spawn）。
	* heartbeat timeout 仍可能由 transport 自愈，不在此回收（与 Conversation 忽略策略对齐）。
	*/
	scheduleReacquireAfterConnectionLost(error) {
		if (error.code !== "CONNECTION_LOST" || !error.retryable) return;
		if (this.lifecycle.isDisposed || this.lifecycle.isStopping) return;
		if (this.lifecycle.connectionState !== LocalConnectionState.Connected) return;
		if (require_conversations.isInternalSseRecoveryError(error)) {
			this.log("connection lost transient sse — keep runtime for transport reconnect", {
				generation: this.lifecycle.generation,
				sessionId: this._sessionId,
				message: error.message
			});
			return;
		}
		this.recycleRuntimeAfterFailure("sse-connection-lost", error, this.lifecycle.generation).catch(() => void 0);
	}
	emit(module, event, ctx, level = "info") {
		try {
			this.logSink?.(`${module} >> ${event}`, ctx, level);
		} catch {}
	}
	log(event, ctx, level = "info") {
		this.emit("LOCAL_HTTP_CONNECTION", event, ctx, level);
	}
	logRaw(line) {
		this.emit("LOCAL_HTTP_CONNECTION", "highfreq", { line });
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-process-connection/reclaim-orphan-acp-workers.ts
/**
* 回收已死 WorkBuddy 留下的僵尸 ACP worker（#84563）。
*
* LocalConnection 以 `detached:true` spawn `* --acp`，父进程暴毙后 worker 常被
* init 收养（ppid=1）并持续 renew writer lease。daemon 的 pid-registry 孤儿回收
* 只覆盖 prewarm/session-id 托管 CLI，盖不住裸 `--acp` worker。
*
* 安全边界：
* - 只动 cmdline 含 `--acp` 的进程
* - 不碰当前 daemon 进程树内的后代（本实例仍在用的 worker）
* - 只动「父进程已死 / ppid<=1」的孤儿；仍挂在活着的 WorkBuddy 下的交给
*   SESSION_WRITER_BUSY / 启动 reap，避免误杀并行实例
*/
var execFileAsync = (0, node_util.promisify)(node_child_process.execFile);
var DEFAULT_GRACE_MS = 1500;
var DEFAULT_FORCE_WAIT_MS = 500;
var inFlight;
/** 是否像 LocalConnection / agent-cli 的 ACP worker。 */
function isAcpWorkerCommand(command) {
	if (command.includes("--type=")) return false;
	if (/(?:^|\s)wb-acp:[^\s]+/.test(command)) return true;
	if (!/(?:^|\s)--acp(?:\s|$)/.test(command)) return false;
	return /codebuddy|agent-cli|workbuddy|cbc(?:\.js|\.mjs|\.cjs)?(?:\s|$)/i.test(command);
}
/** 父已死或已被 init 收养 → 视为死 WorkBuddy 留下的僵尸 worker。 */
function isOrphanAcpWorker(proc, options) {
	if (options.protectPids.has(proc.pid)) return false;
	if (!isAcpWorkerCommand(proc.command)) return false;
	if (proc.ppid <= 1) return true;
	return !options.isAlive(proc.ppid);
}
function collectDescendantPids(rootPid, processes) {
	const childrenByParent = /* @__PURE__ */ new Map();
	for (const proc of processes) {
		const siblings = childrenByParent.get(proc.ppid);
		if (siblings) siblings.push(proc.pid);
		else childrenByParent.set(proc.ppid, [proc.pid]);
	}
	const protectedPids = /* @__PURE__ */ new Set([rootPid]);
	const stack = [rootPid];
	while (stack.length > 0) {
		const current = stack.pop();
		for (const child of childrenByParent.get(current) ?? []) {
			if (protectedPids.has(child)) continue;
			protectedPids.add(child);
			stack.push(child);
		}
	}
	return protectedPids;
}
/**
* 回收孤儿 ACP worker。多调用方并发时 singleflight 合并为一次扫描。
* @returns signaled>0 时调用方应重试 session/resume。
*/
function reclaimOrphanAcpWorkers(options = {}) {
	if (inFlight) return inFlight;
	inFlight = runReclaim(options).finally(() => {
		inFlight = void 0;
	});
	return inFlight;
}
async function runReclaim(options) {
	const platform = options.platform ?? process.platform;
	const listProcesses = options.listProcesses ?? (() => defaultListProcesses(platform));
	const isAlive = options.isAlive ?? defaultIsAlive;
	const sendSignal = options.sendSignal ?? defaultSendSignal;
	const sleep = options.sleep ?? defaultSleep;
	const graceMs = options.graceMs ?? DEFAULT_GRACE_MS;
	const protectAncestorPid = options.protectAncestorPid ?? process.pid;
	const processes = await listProcesses();
	const protectPids = collectDescendantPids(protectAncestorPid, processes);
	const orphans = processes.filter((proc) => isOrphanAcpWorker(proc, {
		protectPids,
		isAlive
	}));
	if (orphans.length === 0) return {
		inspected: processes.length,
		candidates: 0,
		signaled: 0,
		forced: 0
	};
	options.log?.("reclaim-orphan-acp:start", {
		candidates: orphans.length,
		pids: orphans.map((proc) => proc.pid).slice(0, 20)
	});
	const graceful = platform === "win32" ? "SIGTERM" : "SIGQUIT";
	let signaled = 0;
	for (const proc of orphans) if (sendSignal(proc.pid, graceful)) signaled += 1;
	if (signaled > 0) await sleep(graceMs);
	let forced = 0;
	for (const proc of orphans) {
		if (!isAlive(proc.pid)) continue;
		if (sendSignal(proc.pid, "SIGKILL")) forced += 1;
	}
	if (forced > 0) await sleep(DEFAULT_FORCE_WAIT_MS);
	options.log?.("reclaim-orphan-acp:done", {
		signaled,
		forced
	});
	return {
		inspected: processes.length,
		candidates: orphans.length,
		signaled,
		forced
	};
}
var DEFAULT_LIST_PROCESSES_TIMEOUT_MS = 1e4;
async function defaultListProcesses(platform) {
	try {
		if (platform === "win32") {
			const { stdout } = await execFileAsync("powershell.exe", [
				"-NoProfile",
				"-NonInteractive",
				"-Command",
				"Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,CommandLine | ConvertTo-Csv -NoTypeInformation"
			], {
				encoding: "utf-8",
				maxBuffer: 33554432,
				windowsHide: true,
				timeout: DEFAULT_LIST_PROCESSES_TIMEOUT_MS,
				killSignal: "SIGKILL"
			});
			return stdout.split(/\r?\n/).slice(1).flatMap((line) => {
				const match = /^"(\d+)","(\d+)","?([\s\S]*?)"?$/.exec(line.trim());
				if (!match) return [];
				return [{
					pid: Number(match[1]),
					ppid: Number(match[2]),
					command: match[3] ?? ""
				}];
			});
		}
		const { stdout } = await execFileAsync("ps", ["-Ao", "pid=,ppid=,command="], {
			encoding: "utf-8",
			maxBuffer: 33554432,
			timeout: DEFAULT_LIST_PROCESSES_TIMEOUT_MS,
			killSignal: "SIGKILL"
		});
		return stdout.split("\n").flatMap((line) => {
			const match = /^\s*(\d+)\s+(\d+)\s+([\s\S]+)$/.exec(line);
			if (!match) return [];
			return [{
				pid: Number(match[1]),
				ppid: Number(match[2]),
				command: match[3]
			}];
		});
	} catch {
		return [];
	}
}
function defaultIsAlive(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}
function defaultSendSignal(pid, signal) {
	try {
		if (process.platform !== "win32" && signal !== "SIGKILL") try {
			process.kill(-pid, signal);
			return true;
		} catch {}
		process.kill(pid, signal);
		return true;
	} catch {
		return false;
	}
}
function defaultSleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/mappers.ts
/** 解析 addon_selection 列：非法 JSON / 空值降级为 undefined（不抛错，恢复链路稳健）。 */
function parseAddonSelection(raw) {
	if (!raw) return;
	try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object" && parsed.version === 1) return parsed;
		return;
	} catch {
		return;
	}
}
/** session_settings 内专放 CreateParams.tags，避免与 plugin session settings 撞键。 */
var CONVERSATION_TAGS_SESSION_KEY = "conversationTags";
/** 解析 session_settings 列：只接受 JSON object；空值、数组、标量或非法 JSON 均降级。 */
function parseSessionSettings(raw) {
	if (!raw) return;
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : void 0;
	} catch {
		return;
	}
}
function toIso(timestamp) {
	return new Date(timestamp ?? 0).toISOString();
}
function titleOf(row) {
	return row.customTitle || row.title || "";
}
function conversationTagsFromSessionSettings(sessionSettings) {
	const raw = sessionSettings?.[CONVERSATION_TAGS_SESSION_KEY];
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
	const tags = Object.fromEntries(Object.entries(raw).filter((entry) => typeof entry[1] === "string"));
	return Object.keys(tags).length > 0 ? tags : void 0;
}
/**
* 读取某行存储的 conversation tags（不含 addonSelection 派生的 `scene`）。
*
* 供列表过滤复用，避免在 impl 里重复一遍「tags 存在 session_settings JSON 的
* 哪个键、如何降级」—— 存储格式只应有本文件一个出处（issue #100618）。
*/
function storedConversationTags(row) {
	return conversationTagsFromSessionSettings(parseSessionSettings(row.sessionSettings));
}
function mergeConversationTags(storedTags, sceneId) {
	if (!storedTags && !sceneId) return;
	return {
		...storedTags ?? {},
		...sceneId ? { scene: sceneId } : {}
	};
}
/** 将本地 session 行映射为轻量列表项。 */
function rowToConversationSummary(row) {
	const addonSelection = parseAddonSelection(row.addonSelection);
	const sceneId = addonSelection?.sceneId ?? addonSelection?.microSceneIds?.[0];
	const tags = mergeConversationTags(conversationTagsFromSessionSettings(parseSessionSettings(row.sessionSettings)), sceneId);
	return {
		id: row.id,
		userId: row.userId || "",
		title: titleOf(row),
		status: row.status,
		sessionStatus: row.status,
		lifecycle: row.status === "active" || row.status === "archived" || row.status === "completed" ? row.status : "active",
		visibility: "PRIVATE",
		conversationOrigin: "local",
		createdAt: toIso(row.createdAt),
		updatedAt: toIso(row.updatedAt),
		cwd: row.cwd,
		timestamp: rowLastActivity(row),
		isPlayground: row.isPlayground === null ? void 0 : Boolean(row.isPlayground),
		isBackgroundAutomation: Boolean(row.isBackgroundAutomation),
		sourceMode: row.sourceMode || void 0,
		welcomeMode: addonSelection?.welcomeMode || row.sourceMode || void 0,
		tags,
		projectId: row.projectId || void 0,
		role: row.projectId ? "creator" : void 0,
		isCollaborative: false,
		createdBy: row.userId || void 0,
		unread: row.unread === 1,
		isUserDefinedTitle: row.customTitle ? 1 : void 0
	};
}
/** 将本地 session 行映射为详情 DTO。 */
function rowToConversationDetail(row) {
	return {
		...rowToConversationSummary(row),
		mode: rowMode(row) || void 0,
		model: row.model || void 0,
		thoughtLevel: row.thoughtLevel || void 0,
		contextWindow: row.contextWindow ?? void 0,
		expertId: row.expertId || void 0,
		expertLocale: row.expertLocale || void 0,
		expertMarketplace: row.expertMarketplace || void 0,
		expertRuntimeIdentity: row.expertRuntimeIdentity || void 0,
		permissionMode: row.permissionMode || void 0,
		useSandboxCLI: row.useSandboxCli === null ? void 0 : Boolean(row.useSandboxCli),
		sessionId: row.id,
		addonSelection: parseAddonSelection(row.addonSelection),
		sessionSettings: parseSessionSettings(row.sessionSettings)
	};
}
function rowMode(row) {
	const candidate = row.mode || row.sourceMode;
	switch (candidate) {
		case "craft":
		case "ask":
		case "plan":
		case "expert":
		case "quick": return candidate;
		default: return "craft";
	}
}
function rowLastActivity(row) {
	return row.lastActivityAt ?? row.createdAt;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/artifact-index-stream-repair.ts
var ARTIFACT_STRIPPED_FIELDS = /* @__PURE__ */ new Set(["diff", "cachedContent"]);
/**
* Streams an oversized index into a bounded temporary file while replacing the
* legacy unbounded diff payloads. It never materializes the source file.
*/
async function writeRepairedArtifactIndex(sourcePath, outputPath, maxOutputBytes) {
	return writeSanitizedJsonIndex(sourcePath, outputPath, maxOutputBytes, ARTIFACT_STRIPPED_FIELDS);
}
/**
* 通用的有界 JSON lexical sanitizer。只按 key 跳过 value，不解析/物化整个源文件。
* 调用方仍须在写完后做结构校验。
*/
async function writeSanitizedJsonIndex(sourcePath, outputPath, maxOutputBytes, strippedFields) {
	const source = (0, node_fs.createReadStream)(sourcePath, { encoding: "utf-8" });
	const output = await node_fs_promises.open(outputPath, "wx");
	const sanitizer = new LegacyPayloadSanitizer(maxOutputBytes, (chunk) => output.write(chunk), strippedFields);
	try {
		for await (const chunk of source) await sanitizer.push(String(chunk));
		await sanitizer.finish();
	} finally {
		await output.close();
	}
}
/** Minimal JSON lexical sanitizer; structural validation still happens after writing. */
var LegacyPayloadSanitizer = class {
	constructor(maxOutputBytes, writeChunk, strippedFields) {
		this.maxOutputBytes = maxOutputBytes;
		this.writeChunk = writeChunk;
		this.strippedFields = strippedFields;
		this.inString = false;
		this.escaped = false;
		this.pendingWhitespace = "";
		this.skippingValue = false;
		this.skipInString = false;
		this.skipEscaped = false;
		this.skipDepth = 0;
		this.skipScalar = false;
		this.writtenBytes = 0;
	}
	async push(input) {
		let passthrough = "";
		const flush = async () => {
			if (!passthrough) return;
			const value = passthrough;
			passthrough = "";
			await this.write(value);
		};
		for (const char of input) {
			if (this.skippingValue) {
				if (this.consumeSkippedValue(char)) passthrough += char;
				continue;
			}
			if (this.pendingString && !this.inString) {
				if (/\s/.test(char)) {
					this.pendingWhitespace += char;
					continue;
				}
				const pending = this.pendingString;
				this.pendingString = void 0;
				if (char === ":" && this.strippedFields.has(pending.decoded)) {
					await flush();
					await this.write(`${pending.raw}${this.pendingWhitespace}:null`);
					this.pendingWhitespace = "";
					this.skippingValue = true;
					continue;
				}
				passthrough += pending.raw + this.pendingWhitespace + char;
				this.pendingWhitespace = "";
				continue;
			}
			if (!this.inString) {
				if (char === "\"") {
					await flush();
					this.inString = true;
					this.escaped = false;
					this.pendingString = {
						raw: "\"",
						decoded: "",
						escaped: false
					};
				} else passthrough += char;
				continue;
			}
			const pending = this.pendingString;
			pending.raw += char;
			if (this.escaped) {
				pending.decoded += decodeSimpleEscape(char);
				this.escaped = false;
				continue;
			}
			if (char === "\\") {
				this.escaped = true;
				continue;
			}
			if (char === "\"") {
				this.inString = false;
				continue;
			}
			pending.decoded += char;
		}
		await flush();
	}
	async finish() {
		if (this.inString || this.skippingValue) throw new SyntaxError("Incomplete artifact index JSON");
		if (this.pendingString) {
			await this.write(this.pendingString.raw + this.pendingWhitespace);
			this.pendingString = void 0;
			this.pendingWhitespace = "";
		}
	}
	/** Returns true when the current delimiter belongs to the outer JSON stream. */
	consumeSkippedValue(char) {
		if (this.skipInString) {
			if (this.skipEscaped) this.skipEscaped = false;
			else if (char === "\\") this.skipEscaped = true;
			else if (char === "\"") {
				this.skipInString = false;
				if (this.skipDepth === 0) this.skippingValue = false;
			}
			return false;
		}
		if (this.skipScalar) {
			if (char === "," || char === "}" || char === "]") {
				this.skipScalar = false;
				this.skippingValue = false;
				return true;
			}
			return false;
		}
		if (/\s/.test(char)) return false;
		if (char === "\"") {
			this.skipInString = true;
			return false;
		}
		if (char === "{" || char === "[") {
			this.skipDepth += 1;
			return false;
		}
		if (char === "}" || char === "]") {
			if (this.skipDepth > 0) {
				this.skipDepth -= 1;
				if (this.skipDepth === 0) this.skippingValue = false;
				return false;
			}
			this.skippingValue = false;
			return true;
		}
		if (this.skipDepth === 0) this.skipScalar = true;
		return false;
	}
	async write(value) {
		this.writtenBytes += Buffer.byteLength(value, "utf-8");
		if (this.writtenBytes > this.maxOutputBytes) throw new Error(`Repaired artifact index exceeds ${this.maxOutputBytes} bytes`);
		await this.writeChunk(value);
	}
};
function decodeSimpleEscape(value) {
	switch (value) {
		case "b": return "\b";
		case "f": return "\f";
		case "n": return "\n";
		case "r": return "\r";
		case "t": return "	";
		default: return value;
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/artifact-index-codec.ts
var ARTIFACT_INDEX_MAX_BYTES = 16777216;
var METADATA_STRING_MAX_BYTES = 65536;
var COMPACT_METADATA_STRING_MAX_BYTES = 4096;
/** Bounded artifact-index codec shared by every Conversation SDK reader/writer. */
var ArtifactIndexCodec = class {
	constructor(logger = console) {
		this.logger = logger;
	}
	async read(filePath) {
		try {
			return await this.readForUpdate(filePath);
		} catch (error) {
			this.warn("unreadable index", filePath, error);
			return emptyArtifactIndex();
		}
	}
	async readForUpdate(filePath) {
		try {
			return parseArtifactIndex(await readBoundedText$1(filePath, ARTIFACT_INDEX_MAX_BYTES));
		} catch (error) {
			if (isEnoent$4(error)) return emptyArtifactIndex();
			if (error instanceof BoundedJsonTooLargeError) return this.repairOversizedIndex(filePath, true);
			throw error;
		}
	}
	async readJson(filePath, fallback) {
		try {
			return JSON.parse(await readBoundedText$1(filePath, ARTIFACT_INDEX_MAX_BYTES));
		} catch (error) {
			if (isEnoent$4(error)) return fallback;
			this.warn("bounded JSON read failed", filePath, error);
			throw error;
		}
	}
	serialize(index) {
		const normalized = normalizeArtifactRecords(index.artifacts, index.lastUpdated ?? 0);
		let diffBytes = 0;
		const bounded = normalized.map((artifact) => boundLegacyPayloads(artifact, (bytes) => {
			if (bytes > 262144 || diffBytes + bytes > 1048576) return false;
			diffBytes += bytes;
			return true;
		}));
		const full = stringify$1({
			...index,
			artifacts: bounded
		});
		if (byteLength$1(full) <= 16777216) return full;
		const metadata = projectArtifactRecords(bounded, METADATA_STRING_MAX_BYTES);
		const firstFallback = stringify$1({
			...index,
			artifacts: metadata
		});
		if (byteLength$1(firstFallback) <= 16777216) return firstFallback;
		const serialized = serializeNewestThatFit(index, projectArtifactRecords(metadata, COMPACT_METADATA_STRING_MAX_BYTES).sort((left, right) => artifactTimestamp(right) - artifactTimestamp(left)));
		this.logger.warn("[ArtifactIndexCodec] compacted index to bounded metadata", {
			artifactsBefore: index.artifacts.length,
			artifactsAfter: JSON.parse(serialized).artifacts.length,
			sizeBytes: byteLength$1(serialized)
		});
		return serialized;
	}
	async repairOversizedIndex(filePath, throwOnFailure = false) {
		const temporary = `${filePath}.${process.pid}.${(0, node_crypto.randomUUID)()}.repair`;
		try {
			await writeRepairedArtifactIndex(filePath, temporary, ARTIFACT_INDEX_MAX_BYTES);
			const streamed = parseArtifactIndex(await readBoundedText$1(temporary, ARTIFACT_INDEX_MAX_BYTES));
			const repaired = {
				...streamed,
				artifacts: streamed.artifacts.map(stripAllLegacyPayloads)
			};
			await node_fs_promises.writeFile(temporary, this.serialize(repaired), "utf-8");
			await node_fs_promises.rename(temporary, filePath);
			this.logger.warn("[ArtifactIndexCodec] repaired oversized index", {
				path: filePath,
				artifacts: repaired.artifacts.length
			});
			return repaired;
		} catch (error) {
			await node_fs_promises.rm(temporary, { force: true }).catch(() => void 0);
			this.warn("oversized index repair failed", filePath, error);
			if (throwOnFailure) throw error;
			return emptyArtifactIndex();
		}
	}
	warn(message, filePath, error) {
		this.logger.warn(`[ArtifactIndexCodec] ${message}`, {
			path: filePath,
			error: error instanceof Error ? error.message : String(error)
		});
	}
};
var BoundedJsonTooLargeError = class extends Error {};
async function readBoundedText$1(filePath, maxBytes) {
	const chunks = [];
	let size = 0;
	for await (const value of (0, node_fs.createReadStream)(filePath)) {
		const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
		size += chunk.length;
		if (size > maxBytes) throw new BoundedJsonTooLargeError();
		chunks.push(chunk);
	}
	return Buffer.concat(chunks, size).toString("utf-8");
}
function parseArtifactIndex(content) {
	const value = JSON.parse(content);
	if (!value || value.version !== 1 || !Array.isArray(value.artifacts)) throw new SyntaxError("Invalid artifact index structure");
	const lastUpdated = typeof value.lastUpdated === "number" ? value.lastUpdated : void 0;
	return {
		version: 1,
		lastUpdated,
		artifacts: normalizeArtifactRecords(value.artifacts, lastUpdated ?? 0)
	};
}
function normalizeArtifactRecords(values, fallbackTimestamp) {
	const records = [];
	for (const value of values) {
		if (!isArtifactRecord(value)) continue;
		const record = require_conversations.normalizeArtifactRecord(value, fallbackTimestamp);
		if (record) records.push(record);
	}
	return records;
}
function projectArtifactRecords(artifacts, maxStringBytes) {
	const projected = [];
	for (const artifact of artifacts) {
		const record = require_conversations.projectArtifactRecordForCompaction(artifact, maxStringBytes, truncateUtf8$1);
		if (record) projected.push(record);
	}
	return projected;
}
function boundLegacyPayloads(artifact, admit) {
	if (!isRecord$5(artifact.fileChangeInfo)) return artifact;
	const fileChangeInfo = { ...artifact.fileChangeInfo };
	delete fileChangeInfo.cachedContent;
	const diff = fileChangeInfo.diff;
	if (typeof diff === "string" && !admit(byteLength$1(diff))) delete fileChangeInfo.diff;
	return {
		...artifact,
		fileChangeInfo
	};
}
function stripAllLegacyPayloads(artifact) {
	if (!isRecord$5(artifact.fileChangeInfo)) return artifact;
	const fileChangeInfo = { ...artifact.fileChangeInfo };
	delete fileChangeInfo.diff;
	delete fileChangeInfo.cachedContent;
	return {
		...artifact,
		fileChangeInfo
	};
}
function serializeNewestThatFit(index, artifacts) {
	let low = 0;
	let high = artifacts.length;
	let best = stringify$1({
		...index,
		artifacts: []
	});
	while (low <= high) {
		const count = Math.floor((low + high) / 2);
		const candidate = stringify$1({
			...index,
			artifacts: artifacts.slice(0, count)
		});
		if (byteLength$1(candidate) <= 16777216) {
			best = candidate;
			low = count + 1;
		} else high = count - 1;
	}
	return best;
}
function artifactTimestamp(artifact) {
	for (const key of [
		"lastUpdated",
		"updatedAt",
		"createdAt"
	]) {
		const value = artifact[key];
		if (typeof value === "number" && Number.isFinite(value)) return value;
	}
	return 0;
}
function truncateUtf8$1(value, maxBytes) {
	const buffer = Buffer.from(value, "utf-8");
	if (buffer.length <= maxBytes) return value;
	let end = maxBytes;
	while (end > 0 && (buffer[end] & 192) === 128) end -= 1;
	return buffer.subarray(0, end).toString("utf-8");
}
function stringify$1(value) {
	return JSON.stringify(value, null, 2);
}
function byteLength$1(value) {
	return Buffer.byteLength(value, "utf-8");
}
function emptyArtifactIndex() {
	return {
		version: 1,
		artifacts: []
	};
}
function isArtifactRecord(value) {
	return isRecord$5(value) && typeof value.uri === "string";
}
function isRecord$5(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isEnoent$4(error) {
	return isRecord$5(error) && error.code === "ENOENT";
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/artifact-index-store.ts
/** Atomic, per-conversation serialized artifact-index repository. */
var ArtifactIndexStore = class {
	constructor(configDir, logger = console) {
		this.configDir = configDir;
		this.queues = /* @__PURE__ */ new Map();
		this.codec = new ArtifactIndexCodec(logger);
	}
	async read(conversationId) {
		return this.codec.read(this.indexPath(conversationId));
	}
	async update(conversationId, mutate) {
		const indexPath = this.indexPath(conversationId);
		await this.enqueue(indexPath, async () => {
			const index = await this.codec.readForUpdate(indexPath);
			if (await mutate(index.artifacts) === false) return;
			await this.writeIndex(indexPath, {
				version: 1,
				lastUpdated: Date.now(),
				artifacts: index.artifacts
			});
		});
	}
	async writeIndex(indexPath, index) {
		const serialized = this.codec.serialize(index);
		await node_fs_promises.mkdir(node_path.dirname(indexPath), { recursive: true });
		const temporary = `${indexPath}.${process.pid}.${(0, node_crypto.randomUUID)()}.tmp`;
		try {
			await node_fs_promises.writeFile(temporary, serialized, {
				encoding: "utf-8",
				flag: "wx"
			});
			await node_fs_promises.rename(temporary, indexPath);
		} catch (error) {
			await node_fs_promises.rm(temporary, { force: true }).catch(() => void 0);
			throw error;
		}
	}
	indexPath(conversationId) {
		if (!conversationId || node_path.basename(conversationId) !== conversationId) throw new Error("Invalid conversation id for artifact index");
		return node_path.join(this.configDir, "artifact-index", `${conversationId}.json`);
	}
	async enqueue(key, task) {
		const operation = (this.queues.get(key) ?? Promise.resolve()).then(task, task);
		const tail = operation.catch(() => void 0);
		this.queues.set(key, tail);
		tail.finally(() => {
			if (this.queues.get(key) === tail) this.queues.delete(key);
		}).catch(() => void 0);
		return operation;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/resource-effect/node-local-media-policy.ts
/**
* 工作区内不登记为产物的隐藏/状态目录名。
*
* 与 desktop 老链路 `session/media-artifact-service.ts` 的 `IGNORED_DIR_NAMES`
* 以及 UI 侧 `domains/artifact/common/artifact-visibility.ts` 的 `HIDDEN_ARTIFACT_PATHS`
* 对齐：工作区根下这些目录里的文件由 Write/Edit/Checkpoint 写入，是 agent 的工作状态
* 而非交付物，不该进产物索引。
*/
var HIDDEN_DIR_NAMES = /* @__PURE__ */ new Set([
	".workbuddy",
	".codebuddy",
	".agent"
]);
/** 复合隐藏路径（按子串匹配，与 UI 侧 HIDDEN_ARTIFACT_PATHS 同款）。 */
var HIDDEN_PATH_FRAGMENTS = ["Claw/.memory"];
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
	"jpg",
	"jpeg",
	"png",
	"gif",
	"webp",
	"svg",
	"bmp",
	"ico"
]);
var DIAGRAM_EXTENSIONS = /* @__PURE__ */ new Set([
	"excalidraw",
	"drawio",
	"dio"
]);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([
	"mp4",
	"mov",
	"mkv",
	"avi",
	"webm",
	"wmv",
	"3gp",
	"3g2",
	"flv",
	"f4v",
	"m3u8",
	"mts",
	"m2ts",
	"mxf",
	"prores",
	"nev",
	"mpg",
	"mpeg",
	"m4v",
	"ogv",
	"vob",
	"asf",
	"rm",
	"rmvb"
]);
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([
	"mp3",
	"wav",
	"ogg",
	"aac",
	"flac",
	"m4a",
	"wma",
	"opus"
]);
var DOCUMENT_EXTENSIONS = /* @__PURE__ */ new Set([
	"pdf",
	"doc",
	"docx",
	"rtf",
	"txt",
	"md",
	"markdown",
	"html",
	"htm",
	"xlsx",
	"xls",
	"pptx",
	"csv"
]);
var SPREADSHEET_EXTENSIONS = /* @__PURE__ */ new Set([
	"csv",
	"tsv",
	"xlsx",
	"xls",
	"parquet"
]);
var PRESENTATION_EXTENSIONS = /* @__PURE__ */ new Set(["ppt", "pptx"]);
var CODE_LANGUAGES = {
	ts: "typescript",
	tsx: "typescript",
	js: "javascript",
	jsx: "javascript",
	mjs: "javascript",
	cjs: "javascript",
	py: "python",
	go: "go",
	rs: "rust",
	java: "java",
	kt: "kotlin",
	c: "c",
	cc: "cpp",
	cpp: "cpp",
	h: "c",
	hpp: "cpp",
	cs: "csharp",
	rb: "ruby",
	php: "php",
	swift: "swift",
	sh: "shell",
	bash: "shell",
	zsh: "shell",
	sql: "sql",
	json: "json",
	yaml: "yaml",
	yml: "yaml",
	toml: "toml",
	xml: "xml",
	css: "css",
	scss: "scss",
	less: "less",
	vue: "vue",
	svelte: "svelte",
	lua: "lua",
	r: "r"
};
/** Central local-media classification and workspace authorization policy. */
var NodeLocalMediaPolicy = class {
	constructor(configDir) {
		this.configDir = configDir;
	}
	isInternalIndexPath(filePath) {
		return [
			"artifact-index",
			"changes-index",
			"file-tree-manifests"
		].some((directory) => isPathInside(filePath, node_path.join(this.configDir, directory)));
	}
	async isAuthorizedUri(uri, conversationId, workspace) {
		const filePath = localMediaFilePath(uri);
		return filePath === void 0 || this.isAuthorizedPath(filePath, conversationId, workspace);
	}
	async isAuthorizedPath(filePath, conversationId, workspace, authorization) {
		if (require_conversations.isTrustedPresentFilesToolName(authorization?.toolName) && await this.isPresentFilesAuthorizedPath(filePath)) return true;
		const realFile = await resolveRealCandidate(filePath);
		const codebuddyConfig = process.env.CODEBUDDY_CONFIG_DIR?.trim() || node_path.join(node_os.homedir(), ".codebuddy");
		const brainRoots = [
			workspace ? node_path.join(workspace, ".codebuddy", "brain") : void 0,
			node_path.join(this.configDir, "brain", conversationId),
			node_path.join(codebuddyConfig, "brain", conversationId)
		].filter((root) => Boolean(root));
		for (const root of brainRoots) if (await this.isInsideRoot(realFile, root)) return true;
		if (!workspace || !await this.isInsideRoot(realFile, workspace)) return false;
		if (authorization?.allowHiddenStateDirs === true) return true;
		const relative = node_path.relative(node_path.resolve(workspace), realFile).replace(/\\/g, "/");
		if (relative.split("/").some((segment) => HIDDEN_DIR_NAMES.has(segment))) return false;
		return !HIDDEN_PATH_FRAGMENTS.some((fragment) => relative.includes(fragment));
	}
	async isInsideRoot(realFile, root) {
		try {
			return isPathInside(realFile, await node_fs_promises.realpath(root));
		} catch (error) {
			if (!isEnoent$3(error)) throw error;
			return false;
		}
	}
	/**
	* PresentFiles 显式交付：本地绝对路径、普通文件、非内部索引即可，即使 realpath 在 workspace 外。
	* 指向空间外的 symlink 也允许；watcher / Write / checkpoint 不得走这条。
	*/
	async isPresentFilesAuthorizedPath(filePath) {
		if (!node_path.isAbsolute(filePath)) return false;
		if (this.isInternalIndexPath(filePath)) return false;
		try {
			if (!(await node_fs_promises.stat(filePath)).isFile()) return false;
			const realFile = await node_fs_promises.realpath(filePath);
			return !this.isInternalIndexPath(realFile);
		} catch (error) {
			if (!isEnoent$3(error)) throw error;
			return false;
		}
	}
};
function mediaInfo(filePath) {
	const extension = node_path.extname(filePath).slice(1).toLowerCase();
	if (IMAGE_EXTENSIONS.has(extension)) return {
		mimeType: extension === "jpg" ? "image/jpeg" : `image/${extension}`,
		contentType: "image"
	};
	if (DIAGRAM_EXTENSIONS.has(extension)) return {
		mimeType: `application/x-${extension}`,
		contentType: "diagram"
	};
	if (VIDEO_EXTENSIONS.has(extension)) {
		let mimeType = `video/${extension}`;
		if (extension === "mp4") mimeType = "video/mp4";
		else if (extension === "m3u8") mimeType = "application/vnd.apple.mpegurl";
		return {
			mimeType,
			contentType: "video"
		};
	}
	if (AUDIO_EXTENSIONS.has(extension)) return {
		mimeType: extension === "mp3" ? "audio/mpeg" : `audio/${extension}`,
		contentType: "audio"
	};
	if (DOCUMENT_EXTENSIONS.has(extension)) {
		let mimeType = "application/octet-stream";
		if (extension === "pdf") mimeType = "application/pdf";
		else if (extension === "html" || extension === "htm") mimeType = "text/html";
		return {
			mimeType,
			contentType: "document"
		};
	}
}
function artifactFileInfo(filePath) {
	const extension = node_path.extname(filePath).slice(1).toLowerCase();
	const language = CODE_LANGUAGES[extension];
	if (language) {
		let mimeType = "text/plain";
		if (extension === "json") mimeType = "application/json";
		else if (extension === "xml") mimeType = "application/xml";
		return {
			mimeType,
			contentType: "code",
			language
		};
	}
	if (SPREADSHEET_EXTENSIONS.has(extension)) return {
		mimeType: extension === "csv" ? "text/csv" : "application/octet-stream",
		contentType: "spreadsheet"
	};
	if (PRESENTATION_EXTENSIONS.has(extension)) return {
		mimeType: "application/octet-stream",
		contentType: "presentation"
	};
	return mediaInfo(filePath) ?? {
		mimeType: "application/octet-stream",
		contentType: "file"
	};
}
function localMediaFilePath(value) {
	if (typeof value !== "string" || !value) return;
	if (value.startsWith("file://")) try {
		return (0, node_url.fileURLToPath)(value);
	} catch {
		return;
	}
	return node_path.isAbsolute(value) ? node_path.normalize(value) : void 0;
}
function isPathInside(candidate, root) {
	const relative = node_path.relative(node_path.resolve(root), node_path.resolve(candidate));
	return relative === "" || !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
async function resolveRealCandidate(candidate) {
	let cursor = node_path.resolve(candidate);
	const missing = [];
	while (true) try {
		return node_path.join(await node_fs_promises.realpath(cursor), ...missing.reverse());
	} catch (error) {
		if (!isEnoent$3(error)) throw error;
		const parent = node_path.dirname(cursor);
		if (parent === cursor) throw error;
		missing.push(node_path.basename(cursor));
		cursor = parent;
	}
}
function isEnoent$3(error) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
var CHANGES_MANIFEST_MAX_BYTES = 16777216;
var CHANGE_DETAIL_REQUEST_MAX_BYTES = 1048576;
var CHANGE_MANIFEST_MAX_FILES = 512;
var CHANGE_MANIFEST_MAX_SUMMARY_BYTES = 4096;
var CHANGE_MANIFEST_MAX_PATH_BYTES = 4096;
function projectChangeRevision(change, revision, detailRef) {
	let detailBytes = byteLength(JSON.stringify({
		...change,
		files: []
	}));
	let omittedFileCount = 0;
	const detailFiles = [];
	const manifestFiles = [];
	for (const rawFile of change.files) {
		const file = boundDetailFile(rawFile);
		const serializedBytes = byteLength(JSON.stringify(file));
		const canKeepDetail = detailBytes + serializedBytes <= CHANGE_DETAIL_REQUEST_MAX_BYTES;
		const detailStatus = canKeepDetail ? detailStatusOf(file) : "diff-omitted-size";
		if (canKeepDetail) {
			detailFiles.push(file);
			detailBytes += serializedBytes;
		}
		if (manifestFiles.length < CHANGE_MANIFEST_MAX_FILES && byteLength(rawFile.filePath) <= CHANGE_MANIFEST_MAX_PATH_BYTES) manifestFiles.push({
			filePath: rawFile.filePath,
			action: rawFile.action,
			language: rawFile.language,
			oldFilePath: rawFile.oldFilePath,
			additions: rawFile.additions,
			deletions: rawFile.deletions,
			diffStatus: rawFile.diffStatus,
			detailStatus
		});
		else omittedFileCount += 1;
	}
	const detail = {
		...change,
		files: detailFiles,
		revision
	};
	return {
		manifest: {
			id: change.id,
			conversationId: change.conversationId,
			requestId: change.requestId,
			summary: truncateUtf8(change.summary, CHANGE_MANIFEST_MAX_SUMMARY_BYTES),
			files: manifestFiles,
			fileCount: change.files.length,
			additions: change.additions,
			deletions: change.deletions,
			createdAt: change.createdAt,
			revision,
			detailRef,
			...omittedFileCount > 0 ? {
				omittedFileCount,
				manifestStatus: "files-compacted"
			} : {},
			..."checkpointId" in change && typeof change.checkpointId === "string" ? { checkpointId: change.checkpointId } : {}
		},
		detail
	};
}
function serializeManifestFile(file) {
	const changes = file.changes.map(boundManifest).sort((left, right) => left.createdAt - right.createdAt);
	let omittedRequestCount = file.omittedRequestCount ?? 0;
	let serialized = stringify({
		version: 2,
		changes,
		...omittedRequestCount ? { omittedRequestCount } : {}
	});
	if (byteLength(serialized) <= 12582912) return serialized;
	for (const manifest of changes) {
		if (byteLength(serialized) <= 12582912) break;
		if (manifest.files.length === 0) continue;
		manifest.omittedFileCount = (manifest.omittedFileCount ?? 0) + manifest.files.length;
		manifest.files = [];
		manifest.manifestStatus = "files-compacted";
		serialized = stringify({
			version: 2,
			changes,
			...omittedRequestCount ? { omittedRequestCount } : {}
		});
	}
	while (changes.length > 0 && byteLength(serialized) > 16777216) {
		changes.shift();
		omittedRequestCount += 1;
		serialized = stringify({
			version: 2,
			changes,
			omittedRequestCount
		});
	}
	if (byteLength(serialized) > 16777216) throw new Error(`CHANGES_MANIFEST_TOO_LARGE:${byteLength(serialized)}`);
	return serialized;
}
function parseManifestFile(value) {
	if (!isRecord$4(value) || value.version !== 2 || !Array.isArray(value.changes)) throw new SyntaxError("Invalid changes manifest structure");
	return {
		version: 2,
		changes: value.changes.flatMap((item) => normalizeManifest(item)),
		...typeof value.omittedRequestCount === "number" ? { omittedRequestCount: value.omittedRequestCount } : {}
	};
}
function normalizeLegacyChanges(value) {
	if (!isRecord$4(value) || value.version !== 1 || !Array.isArray(value.changes)) throw new SyntaxError("Invalid changes v1 structure");
	return value.changes.flatMap((item) => normalizeLegacyChange(item));
}
function parseDetailFile(value) {
	if (!isRecord$4(value) || value.version !== 1) throw new SyntaxError("Invalid change detail structure");
	const change = normalizeLegacyChanges({
		version: 1,
		changes: [value.change]
	})[0];
	const revision = isRecord$4(value.change) && typeof value.change.revision === "string" ? value.change.revision : void 0;
	if (!change || !revision) throw new SyntaxError("Invalid change detail payload");
	return {
		...change,
		revision
	};
}
function boundDetailFile(file) {
	let candidate = { ...file };
	if (byteLength(JSON.stringify(candidate)) <= 262144) return candidate;
	candidate = {
		...candidate,
		content: null
	};
	if (byteLength(JSON.stringify(candidate)) <= 262144) return candidate;
	return {
		...candidate,
		content: null,
		hunks: []
	};
}
function detailStatusOf(file) {
	if (file.hunks.length === 0) return "diff-omitted-size";
	if (file.content === null) return "content-omitted-size";
	return "available";
}
function boundManifest(manifest) {
	const files = manifest.files.flatMap((file) => {
		if (byteLength(file.filePath) > CHANGE_MANIFEST_MAX_PATH_BYTES) return [];
		return [{ ...file }];
	}).slice(0, CHANGE_MANIFEST_MAX_FILES);
	const omitted = (manifest.omittedFileCount ?? 0) + Math.max(0, manifest.files.length - files.length);
	return {
		...manifest,
		summary: truncateUtf8(manifest.summary, CHANGE_MANIFEST_MAX_SUMMARY_BYTES),
		files,
		...omitted > 0 ? {
			omittedFileCount: omitted,
			manifestStatus: "files-compacted"
		} : {}
	};
}
function normalizeManifest(value) {
	if (!isRecord$4(value) || typeof value.id !== "string" || typeof value.conversationId !== "string" || typeof value.requestId !== "string" || typeof value.detailRef !== "string" || typeof value.revision !== "string") return [];
	const files = Array.isArray(value.files) ? value.files.flatMap(normalizeManifestFile) : [];
	return [{
		id: value.id,
		conversationId: value.conversationId,
		requestId: value.requestId,
		summary: typeof value.summary === "string" ? value.summary : "",
		files,
		fileCount: typeof value.fileCount === "number" ? value.fileCount : files.length,
		additions: typeof value.additions === "number" ? value.additions : 0,
		deletions: typeof value.deletions === "number" ? value.deletions : 0,
		createdAt: typeof value.createdAt === "number" ? value.createdAt : 0,
		revision: value.revision,
		detailRef: value.detailRef,
		...typeof value.checkpointId === "string" ? { checkpointId: value.checkpointId } : {},
		...typeof value.omittedFileCount === "number" ? { omittedFileCount: value.omittedFileCount } : {},
		...value.manifestStatus === "files-compacted" || value.manifestStatus === "legacy-detail-omitted" ? { manifestStatus: value.manifestStatus } : {}
	}];
}
function normalizeManifestFile(value) {
	if (!isRecord$4(value) || typeof value.filePath !== "string") return [];
	const action = normalizeAction(value.action);
	return [{
		filePath: value.filePath,
		action,
		additions: typeof value.additions === "number" ? value.additions : 0,
		deletions: typeof value.deletions === "number" ? value.deletions : 0,
		...typeof value.language === "string" ? { language: value.language } : {},
		...typeof value.oldFilePath === "string" ? { oldFilePath: value.oldFilePath } : {},
		...value.diffStatus === "timeout" ? { diffStatus: value.diffStatus } : {},
		...typeof value.detailStatus === "string" ? { detailStatus: value.detailStatus } : {}
	}];
}
function normalizeLegacyChange(value) {
	if (!isRecord$4(value) || typeof value.id !== "string" || typeof value.conversationId !== "string" || typeof value.requestId !== "string") return [];
	const files = Array.isArray(value.files) ? value.files.flatMap(normalizeLegacyFile) : [];
	return [{
		id: value.id,
		conversationId: value.conversationId,
		requestId: value.requestId,
		summary: typeof value.summary === "string" ? value.summary : "",
		files,
		additions: typeof value.additions === "number" ? value.additions : 0,
		deletions: typeof value.deletions === "number" ? value.deletions : 0,
		createdAt: typeof value.createdAt === "number" ? value.createdAt : 0,
		...typeof value.checkpointId === "string" ? { checkpointId: value.checkpointId } : {}
	}];
}
function normalizeLegacyFile(value) {
	if (!isRecord$4(value) || typeof value.filePath !== "string") return [];
	return [{
		filePath: value.filePath,
		action: normalizeAction(value.action),
		additions: typeof value.additions === "number" ? value.additions : 0,
		deletions: typeof value.deletions === "number" ? value.deletions : 0,
		hunks: Array.isArray(value.hunks) ? value.hunks : [],
		content: typeof value.content === "string" ? value.content : null,
		...typeof value.language === "string" ? { language: value.language } : {},
		...typeof value.oldFilePath === "string" ? { oldFilePath: value.oldFilePath } : {},
		...value.diffStatus === "timeout" ? { diffStatus: value.diffStatus } : {}
	}];
}
function normalizeAction(value) {
	return value === "create" || value === "delete" || value === "rename" ? value : "modify";
}
function truncateUtf8(value, maxBytes) {
	const buffer = Buffer.from(value, "utf-8");
	if (buffer.length <= maxBytes) return value;
	let end = maxBytes;
	while (end > 0 && (buffer[end] & 192) === 128) end -= 1;
	return buffer.subarray(0, end).toString("utf-8");
}
function stringify(value) {
	return JSON.stringify(value, null, 2);
}
function byteLength(value) {
	return Buffer.byteLength(value, "utf-8");
}
function isRecord$4(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/changes-index-coordinator.ts
var DETAIL_REF_PATTERN = /^cd_[0-9a-f-]{36}\.[0-9a-f-]{36}\.json$/i;
var LEGACY_STRIPPED_FIELDS = /* @__PURE__ */ new Set([
	"hunks",
	"content",
	"diff",
	"cachedContent"
]);
var ORPHAN_MIN_AGE_MS = 864e5;
var ORPHAN_MAX_FILES_PER_RUN = 32;
var ORPHAN_MAX_BYTES_PER_RUN = 8388608;
/**
* changes-index 的唯一生命周期 owner。
* writer、reader、迁移、truncate 共用一条 per-conversation 队列，避免两个 rename 互相覆盖。
*/
var ChangesIndexCoordinator = class {
	constructor(configDir, logger = console) {
		this.configDir = configDir;
		this.logger = logger;
		this.mutations = /* @__PURE__ */ new Map();
		this.manifestReads = /* @__PURE__ */ new Map();
		this.detailReads = /* @__PURE__ */ new Map();
		this.manifestCache = /* @__PURE__ */ new Map();
	}
	async listManifests(conversationId) {
		if (!conversationId) return [];
		return (await this.loadManifest(conversationId)).changes.map((change) => ({
			...change,
			files: change.files.map((item) => ({ ...item }))
		}));
	}
	async getDetail(conversationId, detailRef) {
		if (!conversationId || !this.isSafeDetailRef(detailRef)) return null;
		const authorized = (await this.loadManifest(conversationId)).changes.find((change) => change.detailRef === detailRef);
		if (!authorized) return null;
		const detailPath = this.detailPath(conversationId, detailRef);
		const key = `${conversationId}:${detailRef}`;
		const inFlight = this.detailReads.get(key);
		if (inFlight) return inFlight;
		const read = (async () => {
			try {
				const detail = parseDetailFile(JSON.parse(await readBoundedText(detailPath, CHANGE_DETAIL_REQUEST_MAX_BYTES + 65536)));
				return detail.revision === authorized.revision && detail.requestId === authorized.requestId && detail.conversationId === conversationId ? detail : null;
			} catch (error) {
				if (isEnoent$2(error)) return null;
				this.warn("detail read failed", detailPath, error);
				throw error;
			}
		})().finally(() => {
			if (this.detailReads.get(key) === read) this.detailReads.delete(key);
		});
		this.detailReads.set(key, read);
		return read;
	}
	/** 旧完整 API 的兼容实现：顺序物化，避免并发复制整会话详情。 */
	async list(conversationId) {
		const manifests = await this.listManifests(conversationId);
		const changes = [];
		let aggregateBytes = 0;
		for (const manifest of manifests) {
			const detail = await this.getDetail(conversationId, manifest.detailRef);
			if (!detail) continue;
			aggregateBytes += Buffer.byteLength(JSON.stringify(detail), "utf-8");
			if (aggregateBytes > 16777216) throw new Error("CHANGES_AGGREGATE_TOO_LARGE");
			const change = { ...detail };
			delete change.revision;
			changes.push(change);
		}
		return changes;
	}
	async record(change) {
		if (!change.conversationId || !change.requestId || change.files.length === 0) return false;
		return this.enqueue(change.conversationId, async () => {
			const manifestFile = await this.loadManifestInsideQueue(change.conversationId);
			const existing = manifestFile.changes.find((item) => item.requestId === change.requestId);
			const previous = existing ? await this.readDetailFromManifest(change.conversationId, existing).catch(() => null) : null;
			const byPath = /* @__PURE__ */ new Map();
			previous?.files.forEach((file) => byPath.set(file.filePath, file));
			existing?.files.forEach((file) => {
				if (byPath.has(file.filePath)) return;
				byPath.set(file.filePath, {
					filePath: file.filePath,
					action: file.action,
					language: file.language,
					oldFilePath: file.oldFilePath,
					additions: file.additions,
					deletions: file.deletions,
					hunks: [],
					content: null,
					diffStatus: file.diffStatus
				});
			});
			change.files.forEach((file) => byPath.set(file.filePath, file));
			const files = [...byPath.values()];
			const merged = {
				...change,
				checkpointId: change.checkpointId ?? previous?.checkpointId,
				createdAt: previous?.createdAt ?? change.createdAt,
				files,
				additions: files.reduce((sum, file) => sum + file.additions, 0),
				deletions: files.reduce((sum, file) => sum + file.deletions, 0)
			};
			merged.summary = `${files.length} 个文件变更，+${merged.additions} −${merged.deletions}`;
			const revision = (0, node_crypto.randomUUID)();
			const detailRef = `cd_${(0, node_crypto.randomUUID)()}.${revision}.json`;
			const projected = projectChangeRevision(merged, revision, detailRef);
			await this.writeDetail(merged.conversationId, projected.detail, detailRef);
			const changes = manifestFile.changes.filter((item) => item.requestId !== change.requestId);
			changes.push(projected.manifest);
			const next = parseManifestFile(JSON.parse(serializeManifestFile({
				...manifestFile,
				version: 2,
				changes
			})));
			await this.writeManifest(change.conversationId, next);
			if (existing?.detailRef && existing.detailRef !== detailRef) await node_fs_promises.rm(this.detailPath(change.conversationId, existing.detailRef), { force: true }).catch(() => void 0);
			this.cleanupOrphans(change.conversationId, next).catch(() => void 0);
			return true;
		});
	}
	async readDetailFromManifest(conversationId, manifest) {
		if (!this.isSafeDetailRef(manifest.detailRef)) return null;
		const detail = parseDetailFile(JSON.parse(await readBoundedText(this.detailPath(conversationId, manifest.detailRef), CHANGE_DETAIL_REQUEST_MAX_BYTES + 65536)));
		return detail.revision === manifest.revision && detail.requestId === manifest.requestId ? detail : null;
	}
	async truncate(conversationId, requestIds) {
		if (!conversationId || requestIds.size === 0) return false;
		return this.enqueue(conversationId, async () => {
			const manifestFile = await this.loadManifestInsideQueue(conversationId);
			const removed = manifestFile.changes.filter((change) => requestIds.has(change.requestId));
			if (removed.length === 0) return false;
			const next = {
				...manifestFile,
				changes: manifestFile.changes.filter((change) => !requestIds.has(change.requestId))
			};
			await this.writeManifest(conversationId, next);
			await Promise.all(removed.map((change) => node_fs_promises.rm(this.detailPath(conversationId, change.detailRef), { force: true }).catch(() => void 0)));
			return true;
		});
	}
	async loadManifest(conversationId) {
		const cached = this.manifestCache.get(conversationId);
		if (cached) return cached;
		const inFlight = this.manifestReads.get(conversationId);
		if (inFlight) return inFlight;
		const read = this.enqueue(conversationId, () => this.loadManifestInsideQueue(conversationId)).finally(() => {
			if (this.manifestReads.get(conversationId) === read) this.manifestReads.delete(conversationId);
		});
		this.manifestReads.set(conversationId, read);
		return read;
	}
	async loadManifestInsideQueue(conversationId) {
		const cached = this.manifestCache.get(conversationId);
		if (cached) return cached;
		const indexPath = this.manifestPath(conversationId);
		try {
			const text = await readBoundedText(indexPath, CHANGES_MANIFEST_MAX_BYTES);
			const value = JSON.parse(text);
			if (value.version === 2) {
				const file = parseManifestFile(value);
				this.manifestCache.set(conversationId, file);
				return file;
			}
			return this.migrateV1(conversationId, indexPath, text);
		} catch (error) {
			if (isEnoent$2(error)) {
				const empty = emptyManifest();
				this.manifestCache.set(conversationId, empty);
				return empty;
			}
			if (error instanceof BoundedChangesJsonError) return this.migrateOversizedV1(conversationId, indexPath);
			return this.recoverCorruptV1(conversationId, indexPath, error);
		}
	}
	async migrateV1(conversationId, indexPath, text) {
		const changes = normalizeLegacyChanges(JSON.parse(text));
		return this.commitMigratedV1(conversationId, indexPath, changes, false);
	}
	async migrateOversizedV1(conversationId, indexPath) {
		const sanitized = `${indexPath}.${process.pid}.${(0, node_crypto.randomUUID)()}.sanitized`;
		try {
			await writeSanitizedJsonIndex(indexPath, sanitized, CHANGES_MANIFEST_MAX_BYTES, LEGACY_STRIPPED_FIELDS);
			const changes = normalizeLegacyChanges(JSON.parse(await readBoundedText(sanitized, CHANGES_MANIFEST_MAX_BYTES)));
			return await this.commitMigratedV1(conversationId, indexPath, changes, true);
		} catch (error) {
			this.warn("oversized v1 migration failed", indexPath, error);
			return this.recoverCorruptV1(conversationId, indexPath, error);
		} finally {
			await node_fs_promises.rm(sanitized, { force: true }).catch(() => void 0);
		}
	}
	async commitMigratedV1(conversationId, indexPath, changes, detailsOmitted) {
		const projectedChanges = [];
		for (const change of changes) {
			const revision = (0, node_crypto.randomUUID)();
			const projected = projectChangeRevision(change, revision, `cd_${(0, node_crypto.randomUUID)()}.${revision}.json`);
			if (detailsOmitted) {
				projected.manifest.manifestStatus = "legacy-detail-omitted";
				projected.manifest.files = projected.manifest.files.map((file) => ({
					...file,
					detailStatus: "legacy-detail-omitted"
				}));
			}
			projectedChanges.push(projected);
		}
		const next = parseManifestFile(JSON.parse(serializeManifestFile({
			version: 2,
			changes: projectedChanges.map((item) => item.manifest)
		})));
		const retainedRefs = new Set(next.changes.map((change) => change.detailRef));
		for (const projected of projectedChanges) if (retainedRefs.has(projected.manifest.detailRef)) await this.writeDetail(conversationId, projected.detail, projected.manifest.detailRef);
		await node_fs_promises.copyFile(indexPath, `${indexPath}.v1.bak`, node_fs.constants.COPYFILE_EXCL).catch(() => void 0);
		await this.writeManifest(conversationId, next);
		this.logger.warn("[ChangesIndexCoordinator] migrated v1 changes index", {
			conversationId,
			changes: next.changes.length,
			detailsOmitted
		});
		return next;
	}
	async recoverCorruptV1(conversationId, indexPath, error) {
		const quarantine = `${indexPath}.corrupt.${Date.now()}`;
		await node_fs_promises.copyFile(indexPath, quarantine).catch(() => void 0);
		const empty = emptyManifest();
		await this.writeManifest(conversationId, empty);
		this.warn("CHANGES_INDEX_CORRUPT", indexPath, error);
		return empty;
	}
	async writeDetail(conversationId, detail, detailRef) {
		if (!this.isSafeDetailRef(detailRef)) throw new Error("INVALID_CHANGE_DETAIL_REF");
		const content = JSON.stringify({
			version: 1,
			change: detail
		}, null, 2);
		if (Buffer.byteLength(content, "utf-8") > 1114112) throw new Error("CHANGE_DETAIL_TOO_LARGE");
		await writeAtomic(this.detailPath(conversationId, detailRef), content);
	}
	async writeManifest(conversationId, file) {
		const normalized = parseManifestFile(JSON.parse(serializeManifestFile(file)));
		await writeAtomic(this.manifestPath(conversationId), serializeManifestFile(normalized));
		this.manifestCache.set(conversationId, normalized);
		this.manifestReads.delete(conversationId);
	}
	async cleanupOrphans(conversationId, manifest) {
		const root = this.detailRoot(conversationId);
		const referenced = new Set(manifest.changes.map((change) => change.detailRef));
		const now = Date.now();
		let deletedFiles = 0;
		let deletedBytes = 0;
		const entries = await node_fs_promises.readdir(root, { withFileTypes: true }).catch(() => []);
		for (const entry of entries) {
			if (deletedFiles >= ORPHAN_MAX_FILES_PER_RUN || deletedBytes >= ORPHAN_MAX_BYTES_PER_RUN) break;
			if (!entry.isFile() || referenced.has(entry.name) || !this.isSafeDetailRef(entry.name)) continue;
			const candidate = node_path.join(root, entry.name);
			const stat = await node_fs_promises.stat(candidate).catch(() => void 0);
			if (!stat || now - stat.mtimeMs < ORPHAN_MIN_AGE_MS) continue;
			await node_fs_promises.rm(candidate, { force: true });
			deletedFiles += 1;
			deletedBytes += stat.size;
		}
	}
	enqueue(conversationId, task) {
		const operation = (this.mutations.get(conversationId) ?? Promise.resolve()).then(task, task);
		const tail = operation.catch(() => void 0);
		this.mutations.set(conversationId, tail);
		tail.finally(() => {
			if (this.mutations.get(conversationId) === tail) this.mutations.delete(conversationId);
		}).catch(() => void 0);
		return operation;
	}
	manifestPath(conversationId) {
		return node_path.join(this.configDir, "changes-index", `${encodeURIComponent(conversationId)}.json`);
	}
	detailRoot(conversationId) {
		return node_path.join(this.configDir, "changes-detail", encodeURIComponent(conversationId));
	}
	detailPath(conversationId, detailRef) {
		const root = this.detailRoot(conversationId);
		const candidate = node_path.resolve(root, detailRef);
		if (node_path.basename(detailRef) !== detailRef || !this.isSafeDetailRef(detailRef) || !candidate.startsWith(`${node_path.resolve(root)}${node_path.sep}`)) throw new Error("INVALID_CHANGE_DETAIL_REF");
		return candidate;
	}
	isSafeDetailRef(detailRef) {
		return DETAIL_REF_PATTERN.test(detailRef) && node_path.basename(detailRef) === detailRef;
	}
	warn(message, filePath, error) {
		this.logger.warn(`[ChangesIndexCoordinator] ${message}`, {
			path: filePath,
			error: error instanceof Error ? error.message : String(error)
		});
	}
};
var BoundedChangesJsonError = class extends Error {
	constructor(maxBytes) {
		super(`Changes JSON exceeds ${maxBytes} bytes`);
		this.name = "BoundedChangesJsonError";
	}
};
async function readBoundedText(filePath, maxBytes) {
	const chunks = [];
	let size = 0;
	for await (const value of (0, node_fs.createReadStream)(filePath)) {
		const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
		size += chunk.length;
		if (size > maxBytes) throw new BoundedChangesJsonError(maxBytes);
		chunks.push(chunk);
	}
	return Buffer.concat(chunks, size).toString("utf-8");
}
async function writeAtomic(filePath, content) {
	await node_fs_promises.mkdir(node_path.dirname(filePath), { recursive: true });
	const temporary = `${filePath}.${process.pid}.${(0, node_crypto.randomUUID)()}.tmp`;
	let handle;
	try {
		handle = await node_fs_promises.open(temporary, "wx");
		await handle.writeFile(content, "utf-8");
		await handle.sync();
		await handle.close();
		handle = void 0;
		await node_fs_promises.rename(temporary, filePath);
	} catch (error) {
		await handle?.close().catch(() => void 0);
		await node_fs_promises.rm(temporary, { force: true }).catch(() => void 0);
		throw error;
	}
}
function emptyManifest() {
	return {
		version: 2,
		changes: []
	};
}
function isEnoent$2(error) {
	return error !== null && typeof error === "object" && "code" in error && error.code === "ENOENT";
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/resource-index-json-store.ts
/** Shared bounded JSON reader and atomic queued writer for resource indexes. */
var ResourceIndexJsonStore = class {
	constructor(logger = console) {
		this.logger = logger;
		this.writeQueues = /* @__PURE__ */ new Map();
		this.codec = new ArtifactIndexCodec(logger);
	}
	read(filePath, fallback) {
		return this.codec.readJson(filePath, fallback);
	}
	async write(filePath, value) {
		await node_fs_promises.mkdir(node_path.dirname(filePath), { recursive: true });
		const temporary = `${filePath}.${process.pid}.${(0, node_crypto.randomUUID)()}.tmp`;
		try {
			await node_fs_promises.writeFile(temporary, JSON.stringify(value, null, 2), "utf-8");
			await node_fs_promises.rename(temporary, filePath);
		} catch (error) {
			await node_fs_promises.rm(temporary, { force: true }).catch(() => void 0);
			throw error;
		}
	}
	enqueue(key, task) {
		const operation = (this.writeQueues.get(key) ?? Promise.resolve()).then(task, task);
		const tail = operation.catch(() => void 0);
		this.writeQueues.set(key, tail);
		tail.finally(() => {
			if (this.writeQueues.get(key) === tail) this.writeQueues.delete(key);
		}).catch(() => void 0);
		return operation.catch((error) => {
			this.logger.warn("[ResourceIndexJsonStore] persist failed", {
				path: key,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		});
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/resource-effect/workspace-file-tree-scanner.ts
var MAX_DEPTH = 6;
var MAX_NODES = 2e3;
async function scanWorkspaceFileTree(conversationId, requestId, workspace) {
	const root = await node_fs_promises.realpath(workspace).catch((error) => {
		if (isEnoent$1(error)) return;
		throw error;
	});
	if (!root) return [];
	let count = 0;
	const walk = async (directory, depth) => {
		if (depth > MAX_DEPTH || count >= MAX_NODES) return [];
		const entries = await node_fs_promises.readdir(directory, { withFileTypes: true }).catch((error) => {
			if (isEnoent$1(error) || depth > 0 && isWorkspaceFileTreePermissionError(error)) return [];
			throw error;
		});
		const nodes = [];
		const childDirectories = [];
		for (const entry of entries) {
			if (count >= MAX_NODES || isIgnoredWorkspaceFileTreeName(entry.name) || entry.isSymbolicLink()) continue;
			const absolutePath = await node_fs_promises.realpath(node_path.resolve(directory, entry.name)).catch((error) => {
				if (isEnoent$1(error) || isWorkspaceFileTreePermissionError(error) || isAsarPackageError(error)) return;
				throw error;
			});
			if (!absolutePath || !isWithin$1(root, absolutePath)) continue;
			count += 1;
			if (entry.isDirectory()) {
				const node = {
					conversationId,
					requestId,
					path: absolutePath,
					name: entry.name,
					type: "directory"
				};
				nodes.push(node);
				childDirectories.push({
					absolutePath,
					node
				});
			} else if (entry.isFile()) {
				const stat = await node_fs_promises.stat(absolutePath).catch((error) => {
					if (isEnoent$1(error) || isWorkspaceFileTreePermissionError(error) || isAsarPackageError(error)) return;
					throw error;
				});
				nodes.push({
					conversationId,
					requestId,
					path: absolutePath,
					name: entry.name,
					type: "file",
					size: stat?.size,
					modifiedAt: stat ? Math.trunc(stat.mtimeMs) : void 0
				});
			}
		}
		for (const child of childDirectories) {
			if (count >= MAX_NODES) break;
			child.node.children = await walk(child.absolutePath, depth + 1);
		}
		return nodes;
	};
	return walk(root, 0);
}
function isWithin$1(root, candidate) {
	const relative = node_path.relative(root, candidate);
	return relative === "" || !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
function isEnoent$1(error) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/resource-effect/node-resource-index-service.ts
var HUNK_HEADER = /^@@\s*-(\d+)(?:,(\d+))?\s+\+(\d+)(?:,(\d+))?\s*@@(.*)$/;
/** 只写 #72410 新索引；不会读取、复制、修复或改写 legacy artifact-index。 */
var ResourceIndexService = class {
	constructor(configDir, logger = console, changesIndex) {
		this.configDir = configDir;
		this.jsonStore = new ResourceIndexJsonStore(logger);
		this.changesIndex = changesIndex ?? new ChangesIndexCoordinator(configDir, logger);
	}
	async recordCheckpoint(conversationId, requestId, checkpoint) {
		if (!conversationId || !requestId) return false;
		const fileChanges = checkpoint.fileChanges;
		if (!Array.isArray(fileChanges?.files)) return false;
		const projected = fileChanges.files.map((file) => this.projectFileChange(file)).filter((file) => file !== void 0);
		if (projected.length === 0) return false;
		const additions = projected.reduce((sum, file) => sum + file.additions, 0);
		const deletions = projected.reduce((sum, file) => sum + file.deletions, 0);
		const change = {
			id: `${encodeURIComponent(conversationId)},${encodeURIComponent(requestId)}`,
			conversationId,
			requestId,
			checkpointId: typeof checkpoint.id === "string" ? checkpoint.id : void 0,
			summary: `${projected.length} 个文件变更，+${additions} −${deletions}`,
			files: projected,
			additions,
			deletions,
			createdAt: typeof checkpoint.createdAt === "number" ? checkpoint.createdAt : Date.now()
		};
		return this.changesIndex.record(change);
	}
	async completeRequest(conversationId, requestId, workspace) {
		if (!conversationId || !requestId || !workspace) return;
		const files = await this.scanWorkspace(conversationId, requestId, workspace);
		const indexPath = this.indexPath("file-tree-manifests", conversationId);
		await this.jsonStore.enqueue(indexPath, async () => {
			const index = await this.jsonStore.read(indexPath, {
				version: 1,
				requests: {}
			});
			index.requests[requestId] = {
				createdAt: Date.now(),
				files
			};
			await this.jsonStore.write(indexPath, index);
		});
	}
	/**
	* 移除被撤回轮次留下的变更记录与文件树快照。
	*
	* @returns 是否真的删掉了记录，用于决定是否广播资源变更。
	*/
	async truncateRequests(conversationId, requestIds) {
		if (!conversationId || requestIds.size === 0) return false;
		const changesRemoved = await this.truncateChangesIndex(conversationId, requestIds);
		const manifestsRemoved = await this.truncateFileTreeManifests(conversationId, requestIds);
		return changesRemoved || manifestsRemoved;
	}
	async truncateChangesIndex(conversationId, requestIds) {
		return this.changesIndex.truncate(conversationId, requestIds);
	}
	async truncateFileTreeManifests(conversationId, requestIds) {
		const indexPath = this.indexPath("file-tree-manifests", conversationId);
		let removed = false;
		await this.jsonStore.enqueue(indexPath, async () => {
			const index = await this.jsonStore.read(indexPath, {
				version: 1,
				requests: {}
			});
			for (const requestId of requestIds) if (requestId in index.requests) {
				delete index.requests[requestId];
				removed = true;
			}
			if (!removed) return;
			await this.jsonStore.write(indexPath, index);
		});
		return removed;
	}
	projectFileChange(value) {
		if (!value || typeof value !== "object") return;
		const file = value;
		const filePath = this.filePath(file.uri);
		if (!filePath) return;
		const changeType = file.changeType;
		const action = changeType === "created" ? "create" : changeType === "deleted" ? "delete" : "modify";
		const diff = typeof file.diff === "string" ? file.diff : void 0;
		const cachedContent = typeof file.cachedContent === "string" ? file.cachedContent : void 0;
		return {
			filePath,
			action,
			language: typeof file.language === "string" ? file.language : void 0,
			additions: typeof file.additions === "number" ? file.additions : 0,
			deletions: typeof file.deletions === "number" ? file.deletions : 0,
			hunks: diff && Buffer.byteLength(diff, "utf-8") <= 262144 ? this.parseDiff(diff) : [],
			content: action === "delete" || !cachedContent || Buffer.byteLength(cachedContent, "utf-8") > 262144 ? null : cachedContent,
			...file.diffStatus === "timeout" ? { diffStatus: file.diffStatus } : {}
		};
	}
	filePath(value) {
		if (typeof value !== "string" || !value) return;
		if (value.startsWith("file://")) try {
			return (0, node_url.fileURLToPath)(value);
		} catch {
			return;
		}
		return node_path.isAbsolute(value) ? node_path.normalize(value) : void 0;
	}
	parseDiff(diff) {
		if (!diff) return [];
		const hunks = [];
		let current;
		for (const line of diff.split("\n")) {
			const match = HUNK_HEADER.exec(line);
			if (match) {
				if (current) hunks.push(current);
				current = {
					oldStart: Number(match[1]),
					oldLines: match[2] === void 0 ? 1 : Number(match[2]),
					newStart: Number(match[3]),
					newLines: match[4] === void 0 ? 1 : Number(match[4]),
					header: match[5]?.trim() || void 0,
					lines: []
				};
			} else if (current) current.lines.push(line);
		}
		if (current) hunks.push(current);
		return hunks;
	}
	scanWorkspace(conversationId, requestId, workspace) {
		return scanWorkspaceFileTree(conversationId, requestId, workspace);
	}
	indexPath(directory, conversationId) {
		return node_path.join(this.configDir, directory, `${encodeURIComponent(conversationId)}.json`);
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/resource-effect/workspace-media-watcher.ts
var IGNORED_DIRECTORIES = /* @__PURE__ */ new Set([
	".git",
	".codebuddy",
	".workbuddy",
	".cache",
	"node_modules",
	"dist",
	"build",
	"coverage",
	".next",
	".nx"
]);
var MEDIA_EXTENSIONS = /* @__PURE__ */ new Set([
	".jpg",
	".jpeg",
	".png",
	".gif",
	".webp",
	".svg",
	".bmp",
	".ico",
	".mp4",
	".mov",
	".mkv",
	".avi",
	".webm",
	".wmv",
	".m3u8",
	".mts",
	".m2ts",
	".mp3",
	".wav",
	".ogg",
	".aac",
	".flac",
	".m4a",
	".wma",
	".opus",
	".pdf",
	".doc",
	".docx",
	".xls",
	".xlsx",
	".ppt",
	".pptx",
	".csv",
	".md",
	".html",
	".htm"
]);
var EVENT_DEBOUNCE_MS = 120;
var MAX_EXECUTION_WATCH_MS = 18e5;
/** Watches only active conversation workspaces and reports bounded media files. */
var WorkspaceMediaWatcher = class {
	constructor(onMedia, logger = console) {
		this.onMedia = onMedia;
		this.logger = logger;
		this.active = /* @__PURE__ */ new Map();
	}
	async start(conversationId, workspace, requestId) {
		this.stop(conversationId);
		const root = await node_fs_promises.realpath(workspace).catch(() => void 0);
		if (!root) return;
		try {
			const pending = /* @__PURE__ */ new Map();
			const watcher = (0, node_fs.watch)(root, { recursive: true }, (_event, filename) => {
				if (!filename) return;
				const relativePath = filename.toString();
				if (shouldIgnore(relativePath)) return;
				const filePath = node_path.resolve(root, relativePath);
				if (!isWithin(root, filePath) || !isWorkspaceMediaPath(filePath)) return;
				const previous = pending.get(filePath);
				if (previous) clearTimeout(previous);
				pending.set(filePath, setTimeout(() => {
					pending.delete(filePath);
					this.reportIfAuthorized(conversationId, root, requestId, filePath).catch((error) => this.logger.warn("[WorkspaceMediaWatcher] media check failed", {
						conversationId,
						filePath,
						error: errorMessage(error)
					}));
				}, EVENT_DEBOUNCE_MS));
			});
			watcher.on("error", (error) => {
				this.logger.warn("[WorkspaceMediaWatcher] watcher failed", {
					conversationId,
					workspace: root,
					error: error.message
				});
				this.stop(conversationId);
			});
			const timeout = setTimeout(() => this.stop(conversationId), MAX_EXECUTION_WATCH_MS);
			timeout.unref();
			watcher.unref();
			this.active.set(conversationId, {
				root,
				watcher,
				timeout,
				pending
			});
		} catch (error) {
			this.logger.warn("[WorkspaceMediaWatcher] watcher start failed", {
				conversationId,
				workspace: root,
				error: errorMessage(error)
			});
		}
	}
	stop(conversationId) {
		const active = this.active.get(conversationId);
		if (!active) return;
		active.watcher.close();
		clearTimeout(active.timeout);
		for (const timeout of active.pending.values()) clearTimeout(timeout);
		this.active.delete(conversationId);
	}
	async reportIfAuthorized(conversationId, root, requestId, filePath) {
		const active = this.active.get(conversationId);
		if (!active || active.root !== root) return;
		const realPath = await node_fs_promises.realpath(filePath).catch(() => void 0);
		if (!realPath || !isWithin(root, realPath)) return;
		const stat = await node_fs_promises.stat(realPath).catch(() => void 0);
		if (!stat?.isFile() || stat.size === 0) return;
		await this.onMedia({
			conversationId,
			requestId,
			workspace: root,
			filePath: realPath
		});
	}
};
function isWorkspaceMediaPath(filePath) {
	return MEDIA_EXTENSIONS.has(node_path.extname(filePath).toLowerCase());
}
function shouldIgnore(relativePath) {
	return relativePath.split(/[\\/]/).some((segment) => IGNORED_DIRECTORIES.has(segment));
}
function isWithin(root, candidate) {
	const relative = node_path.relative(root, candidate);
	return relative !== "" && !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/resource-effect/node-resource-effect-port.ts
/** Node writer for effects emitted by the Conversation Event Machine. */
var NodeResourceEffectPort = class {
	constructor(configDir, logger, usagePort, changesIndex) {
		this.usagePort = usagePort;
		this.artifactIndexChangeHandlers = /* @__PURE__ */ new Map();
		const sink = logger ?? console;
		this.artifactIndex = new ArtifactIndexStore(configDir, sink);
		this.mediaPolicy = new NodeLocalMediaPolicy(configDir);
		this.resourceIndex = new ResourceIndexService(configDir, sink, changesIndex);
		this.workspaceWatcher = new WorkspaceMediaWatcher(async (input) => {
			const stat = await node_fs_promises.stat(input.filePath);
			const media = mediaInfo(input.filePath);
			if (!media) return;
			if (await this.persistArtifact({
				type: "artifact",
				conversationId: input.conversationId,
				requestId: input.requestId,
				workspace: input.workspace,
				event: "created",
				artifact: {
					type: "media",
					uri: (0, node_url.pathToFileURL)(input.filePath).href,
					name: node_path.basename(input.filePath),
					title: node_path.basename(input.filePath),
					mimeType: media.mimeType,
					contentType: media.contentType,
					size: stat.size,
					createdAt: Math.trunc(stat.birthtimeMs),
					updatedAt: Math.trunc(stat.mtimeMs),
					_meta: { sourceTool: "WorkspaceWatcher" }
				}
			})) this.emitArtifactIndexChanged(input.conversationId);
		}, sink);
	}
	onArtifactIndexChanged(conversationId, callback) {
		const handlers = this.artifactIndexChangeHandlers.get(conversationId) ?? /* @__PURE__ */ new Set();
		handlers.add(callback);
		this.artifactIndexChangeHandlers.set(conversationId, handlers);
		return () => {
			handlers.delete(callback);
			if (handlers.size === 0) this.artifactIndexChangeHandlers.delete(conversationId);
		};
	}
	async apply(effect) {
		switch (effect.type) {
			case "artifact": {
				const changed = await this.persistArtifact(effect);
				return {
					resourcesChanged: changed,
					artifactIndexChanged: changed
				};
			}
			case "checkpoint": {
				const projection = await this.projectCheckpoint(effect);
				return {
					resourcesChanged: await this.resourceIndex.recordCheckpoint(effect.conversationId, effect.requestId, projection.checkpoint) || projection.artifactIndexChanged,
					artifactIndexChanged: projection.artifactIndexChanged
				};
			}
			case "complete-request":
				await this.resourceIndex.completeRequest(effect.conversationId, effect.requestId, effect.workspace);
				return {
					resourcesChanged: false,
					artifactIndexChanged: false
				};
			case "truncate-requests": {
				const changed = await this.truncateRequests(effect.conversationId, effect.requestIds);
				return {
					resourcesChanged: changed,
					artifactIndexChanged: changed
				};
			}
			case "workspace-watch":
				if (effect.action === "start" && effect.workspace) await this.workspaceWatcher.start(effect.conversationId, effect.workspace, effect.requestId);
				else this.workspaceWatcher.stop(effect.conversationId);
				return {
					resourcesChanged: false,
					artifactIndexChanged: false
				};
			case "usage":
				await this.usagePort?.persistUsage(effect.conversationId, effect.requestId, effect.usage);
				return {
					resourcesChanged: false,
					artifactIndexChanged: false
				};
		}
	}
	emitArtifactIndexChanged(conversationId) {
		for (const handler of this.artifactIndexChangeHandlers.get(conversationId) ?? []) try {
			handler();
		} catch {}
	}
	/**
	* 裁剪被 resend rollback 撤回轮次的资源索引记录。
	*
	* 只删索引，不动工作区文件：轮次撤回不代表用户要丢弃产出物。产物记录只保留首次创建
	* 的 requestId（见 mergeArtifactRecord），因此复用同名文件的新轮会重新登记，不受影响。
	*/
	async truncateRequests(conversationId, requestIds) {
		const targets = new Set(requestIds.filter((requestId) => Boolean(requestId)));
		if (!conversationId || targets.size === 0) return false;
		let changed = false;
		await this.artifactIndex.update(conversationId, (artifacts) => {
			for (let index = artifacts.length - 1; index >= 0; index--) {
				const requestId = require_conversations.artifactRequestId(artifacts[index]);
				if (requestId && targets.has(requestId)) {
					artifacts.splice(index, 1);
					changed = true;
				}
			}
			return changed;
		});
		const resourceIndexChanged = await this.resourceIndex.truncateRequests(conversationId, targets);
		return changed || resourceIndexChanged;
	}
	async persistArtifact(effect) {
		const artifactPatch = withEffectOwnership(effect.artifact, effect.conversationId);
		const rawUri = typeof artifactPatch.uri === "string" ? artifactPatch.uri : void 0;
		if (!rawUri) return false;
		const localPath = localMediaFilePath(rawUri);
		let localStat;
		if (effect.event !== "deleted" && localPath) {
			const toolName = require_conversations.artifactToolName(artifactPatch);
			if (!await this.mediaPolicy.isAuthorizedPath(localPath, effect.conversationId, effect.workspace, { toolName }) && !await this.canUpdateAlreadyDeliveredArtifact(effect.conversationId, localPath, toolName)) return false;
			localStat = await statIfExists(localPath);
			if (!localStat?.isFile()) return false;
		}
		const observedAt = Date.now();
		const uri = localPath ? (0, node_url.pathToFileURL)(localPath).href : rawUri;
		const canonicalUri = canonicalArtifactUri(uri);
		const enrichment = effect.event === "deleted" || !localPath || !localStat ? void 0 : this.localArtifactEnrichment(localPath, localStat);
		let changed = false;
		await this.artifactIndex.update(effect.conversationId, (artifacts) => {
			const matchingPositions = [];
			for (const [index, artifact] of artifacts.entries()) if (canonicalArtifactUri(artifact.uri) === canonicalUri) matchingPositions.push(index);
			if (effect.event === "deleted") {
				for (const position of matchingPositions.reverse()) artifacts.splice(position, 1);
				changed = matchingPositions.length > 0;
				return changed;
			}
			const insertAt = matchingPositions[0];
			const existing = matchingPositions.reduce((merged, position) => require_conversations.mergeArtifactRecord(merged, artifacts[position], { observedAt }) ?? merged, void 0);
			const artifact = require_conversations.mergeArtifactRecord(existing, {
				...artifactPatch,
				uri
			}, {
				observedAt,
				requestId: effect.requestId,
				enrichment,
				touchUpdatedAt: effect.event === "updated"
			});
			if (!artifact) return false;
			changed = matchingPositions.length !== 1 || !existing || JSON.stringify(require_conversations.normalizeArtifactRecord(existing)) !== JSON.stringify(artifact);
			if (!changed) return false;
			for (const position of [...matchingPositions].reverse()) artifacts.splice(position, 1);
			if (insertAt === void 0) artifacts.push(artifact);
			else artifacts.splice(insertAt, 0, artifact);
			return true;
		});
		return changed;
	}
	/**
	* #103743：工作区外附件已由 PresentFiles 交付后，后续 Edit / replace_in_file 仍要能更新索引。
	* 不把所有 Edit 当显式交付；记忆等隐藏目录即使旧记录在，也不走这条。
	*/
	async canUpdateAlreadyDeliveredArtifact(conversationId, localPath, toolName) {
		if (!require_conversations.isArtifactEditToolName(toolName) || isHiddenArtifactPath(localPath)) return false;
		const existing = await this.findExistingArtifact(conversationId, localPath);
		return require_conversations.isTrustedPresentFilesDelivery(existing);
	}
	async findExistingArtifact(conversationId, localPath) {
		const index = await this.artifactIndex.read(conversationId);
		const canonicalUri = canonicalArtifactUri((0, node_url.pathToFileURL)(localPath).href);
		return index.artifacts.find((artifact) => canonicalArtifactUri(artifact.uri) === canonicalUri);
	}
	localArtifactEnrichment(filePath, stat) {
		const info = artifactFileInfo(filePath);
		const fileName = node_path.basename(filePath);
		return {
			name: fileName,
			title: fileName,
			mimeType: info?.mimeType,
			contentType: info?.contentType,
			language: info?.language,
			size: stat?.size,
			createdAt: stat ? Math.trunc(stat.birthtimeMs || stat.mtimeMs) : void 0,
			updatedAt: stat ? Math.trunc(stat.mtimeMs) : void 0
		};
	}
	async projectCheckpoint(effect) {
		const fileChanges = isRecord$3(effect.checkpoint.fileChanges) ? effect.checkpoint.fileChanges : void 0;
		const files = Array.isArray(fileChanges?.files) ? fileChanges.files : void 0;
		if (!files) return {
			checkpoint: effect.checkpoint,
			artifactIndexChanged: false
		};
		const retainedFiles = [];
		let artifactIndexChanged = false;
		for (const value of files) {
			if (!isRecord$3(value)) continue;
			const filePath = localMediaFilePath(value.uri);
			if (!filePath) {
				retainedFiles.push(value);
				continue;
			}
			if (this.mediaPolicy.isInternalIndexPath(filePath)) continue;
			if (!await this.mediaPolicy.isAuthorizedPath(filePath, effect.conversationId, effect.workspace, { allowHiddenStateDirs: true })) continue;
			retainedFiles.push(value);
			const media = mediaInfo(filePath);
			if (!media) continue;
			if (value.changeType !== "created") continue;
			const stat = await statIfExists(filePath);
			if (!stat?.isFile()) continue;
			const fileName = node_path.basename(filePath);
			const artifactChanged = await this.persistArtifact({
				type: "artifact",
				conversationId: effect.conversationId,
				requestId: effect.requestId,
				workspace: effect.workspace,
				event: "created",
				artifact: {
					type: "media",
					uri: (0, node_url.pathToFileURL)(filePath).href,
					name: fileName,
					title: fileName,
					mimeType: media.mimeType,
					contentType: media.contentType,
					size: stat.size,
					createdAt: Math.trunc(stat.birthtimeMs),
					updatedAt: Math.trunc(stat.mtimeMs),
					_meta: { sourceTool: "Checkpoint" }
				}
			});
			artifactIndexChanged ||= artifactChanged;
		}
		return {
			artifactIndexChanged,
			checkpoint: {
				...effect.checkpoint,
				fileChanges: {
					...fileChanges,
					files: retainedFiles,
					totalAdditions: retainedFiles.reduce((sum, file) => sum + numericField(file, "additions"), 0),
					totalDeletions: retainedFiles.reduce((sum, file) => sum + numericField(file, "deletions"), 0)
				}
			}
		};
	}
};
function canonicalArtifactUri(value) {
	if (typeof value !== "string" || !value) return;
	const filePath = localMediaFilePath(value);
	if (!filePath) return value;
	const canonicalPath = filePath === node_path.parse(filePath).root ? filePath : filePath.replace(/[\\/]+$/, "");
	return (0, node_url.pathToFileURL)(canonicalPath).href;
}
function statIfExists(filePath) {
	return node_fs_promises.stat(filePath).catch((error) => {
		if (isEnoent(error)) return;
		throw error;
	});
}
function isEnoent(error) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
function withEffectOwnership(artifact, conversationId) {
	const meta = isRecord$3(artifact._meta) ? artifact._meta : void 0;
	return {
		...artifact,
		_meta: {
			...meta,
			ownerConversationId: conversationId
		}
	};
}
function isRecord$3(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function numericField(value, key) {
	if (!isRecord$3(value)) return 0;
	const field = value[key];
	return typeof field === "number" ? field : 0;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/sqlite-conversation-usage-port.ts
/** Best-effort SQLite persistence for normalized Conversation usage. */
var SqliteConversationUsagePort = class {
	constructor(sqlite, logger = console) {
		this.sqlite = sqlite;
		this.logger = logger;
	}
	async persistUsage(conversationId, requestId, usage) {
		try {
			const previous = this.sqlite.prepare(`
                SELECT used, size, credit_json AS creditJson
                FROM session_usage
                WHERE session_id = ?
            `).get(conversationId);
			const incomingUsed = finiteInteger(usage.totalTokens ?? usage.inputTokens);
			const incomingSize = finiteInteger(usage.contextWindow);
			const creditOnly = incomingUsed === 0 && incomingSize === 0 && usage.cost !== void 0;
			const used = creditOnly ? previous?.used ?? 0 : incomingUsed ?? previous?.used ?? 0;
			const size = creditOnly ? previous?.size ?? 0 : incomingSize ?? previous?.size ?? 0;
			const credit = parseCredit(previous?.creditJson);
			if (requestId && usage.cost && Number.isFinite(usage.cost.amount) && usage.cost.amount >= 0) credit[requestId] = (credit[requestId] ?? 0) + usage.cost.amount;
			this.sqlite.prepare(`
                INSERT INTO session_usage (session_id, used, size, updated_at, credit_json)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(session_id) DO UPDATE SET
                    used = excluded.used,
                    size = excluded.size,
                    updated_at = excluded.updated_at,
                    credit_json = excluded.credit_json
            `).run(conversationId, used, size, Date.now(), Object.keys(credit).length > 0 ? JSON.stringify(credit) : null);
		} catch (error) {
			this.logger.warn("[SqliteConversationUsagePort] persist failed", {
				conversationId,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	async loadCredit(conversationId) {
		try {
			const row = this.sqlite.prepare(`
                SELECT credit_json AS creditJson
                FROM session_usage
                WHERE session_id = ?
            `).get(conversationId);
			return row ? parseCredit(row.creditJson) : void 0;
		} catch (error) {
			this.logger.warn("[SqliteConversationUsagePort] credit load failed", {
				conversationId,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
};
function finiteInteger(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.trunc(value) : void 0;
}
function parseCredit(value) {
	if (!value) return {};
	try {
		const parsed = JSON.parse(value);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		return Object.fromEntries(Object.entries(parsed).filter((entry) => typeof entry[1] === "number" && Number.isFinite(entry[1])));
	} catch {
		return {};
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/persistence/create-node-resource-effect-port.ts
/** Node persistence composition root for resource and usage side effects. */
function createNodeResourceEffectPort(context, changesIndex, usagePort) {
	const logger = { warn: (message, data) => context.logger.warn(message, data) };
	return new NodeResourceEffectPort(context.homeDir, logger, usagePort ?? new SqliteConversationUsagePort(context.sqlite, logger), changesIndex);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-launch-hooks.ts
var FAIL_CLOSED_MARK = "__conversationWorkerFailClosed";
/** Marks a host error that must abort launch instead of taking the ordinary AC9 degradation path. */
function markWorkerHookFailClosed(error) {
	Object.defineProperty(error, FAIL_CLOSED_MARK, {
		value: true,
		enumerable: false
	});
	return error;
}
/** Checks whether a host explicitly requested fail-closed launch behavior. */
function isWorkerHookFailClosed(error) {
	return Boolean(error && typeof error === "object" && error[FAIL_CLOSED_MARK] === true);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/build-conversation-agent-cli-args.ts
/**
* buildConversationAgentCliArgs —— per-session CLI 运行参数纯映射（Node-only 编排）。
*
* 从 `workbuddy-server/src/agent/cli-runtime-args.ts` 迁移的**纯映射** flag 逻辑，全部改从
* {@link ConversationRuntimeRequirements} / ctx 取值，剔除 SessionResolvedRuntimeConfig / CellJS /
* DB / Electron 耦合。
*
* requirements 为空时返回 []；env 与 args 的驱动职责相互独立。
*/
/** CLI 接受的 permission-mode 枚举；backend 内部其它值统一归一为 bypassPermissions。 */
var VALID_PERMISSION_MODES = /* @__PURE__ */ new Set([
	"fullAccess",
	"plan",
	"default",
	"acceptEdits",
	"bypassPermissions"
]);
/** 照抄 server `normalizeBackendPermissionMode`：非法/未知值归一为 bypassPermissions。 */
function normalizeBackendPermissionMode(mode) {
	return VALID_PERMISSION_MODES.has(mode) ? mode : "bypassPermissions";
}
/** 去尾部 `/` `\` 后追加 `/**`；照抄 server :73 派生逻辑。 */
function toTrustedGlob(dir) {
	return `${dir.replace(/[/\\]+$/, "") || dir}/**`;
}
/**
* 派生 trustedDirectories：显式 requirements.trustedDirectories 优先（逐项 glob 化），
* 否则回退到 ctx.cwd（照抄 server :72-75）；两者皆无则 undefined。
*/
function deriveTrustedDirectories(explicit, cwd) {
	if (explicit && explicit.length > 0) return explicit.map(toTrustedGlob);
	if (cwd) return [toTrustedGlob(cwd)];
}
function buildConversationAgentCliArgs(requirements, ctx) {
	const args = [];
	if (requirements.permissionMode !== void 0) args.push("--permission-mode", normalizeBackendPermissionMode(requirements.permissionMode));
	if (requirements.permissionModeBeforePlan) args.push("--permission-mode-before-plan", requirements.permissionModeBeforePlan);
	if (requirements.allowedTools && requirements.allowedTools.length > 0) args.push("--allowedTools", ...requirements.allowedTools);
	if (requirements.model) args.push("--model", requirements.model);
	if (requirements.tools !== void 0) args.push("--tools", requirements.tools);
	if (requirements.systemPromptFile) args.push("--system-prompt-file", requirements.systemPromptFile);
	else if (requirements.systemPrompt) args.push("--system-prompt", requirements.systemPrompt);
	const hasTrusted = requirements.trustedDirectories !== void 0 && requirements.trustedDirectories.length > 0;
	if (requirements.settings !== void 0 || hasTrusted) {
		const settingsPayload = { ...requirements.settings ?? {} };
		const trusted = deriveTrustedDirectories(requirements.trustedDirectories, ctx?.cwd);
		if (trusted) settingsPayload.trustedDirectories = trusted;
		mergeWorkspaceEscapeHardDeny(settingsPayload, node_os.default.homedir(), ctx?.cwd);
		if (Object.keys(settingsPayload).length > 0) args.push("--settings", JSON.stringify(settingsPayload));
	}
	if (requirements.mcpConfigJson) args.push("--mcp-config", requirements.mcpConfigJson, "--strict-mcp-config");
	if (requirements.promptVarsFile) args.push("--prompt-vars-file", requirements.promptVarsFile);
	return args;
}
/** #91287：permissions.deny 硬拦 Grep/Read 扫 `~/.workbuddy/projects`。不注入 sandbox denyRead，避免非敏感读写被当成「受保护文件修改」。 */
function mergeWorkspaceEscapeHardDeny(settings, homeDir, workspaceCwd) {
	mergeWorkspaceEscapePermissionDeny(settings, homeDir, workspaceCwd);
}
function mergeWorkspaceEscapePermissionDeny(settings, homeDir, workspaceCwd) {
	const denyRules = require_conversations.listWorkspaceEscapeDenyRules(homeDir, workspaceCwd);
	const permissions = settings.permissions && typeof settings.permissions === "object" ? { ...settings.permissions } : {};
	const existing = Array.isArray(permissions.deny) ? permissions.deny.filter((item) => typeof item === "string") : [];
	permissions.deny = [.../* @__PURE__ */ new Set([...existing, ...denyRules])];
	settings.permissions = permissions;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/build-conversation-agent-cli-env.ts
/** gateway 三键：staticCliEnv 是唯一可信来源。 */
var GATEWAY_PINNED_KEYS = [
	"CODEBUDDY_GATEWAY_AUTH",
	"CODEBUDDY_GATEWAY_PASSWORD",
	"CODEBUDDY_GATEWAY_DISABLE_API_DOCS"
];
var API_KEY_HELPER_DISABLED_KEY = "CODEBUDDY_API_KEY_HELPER_DISABLED";
var NODE_OPTIONS_KEY = "NODE_OPTIONS";
function buildConversationAgentCliEnv(facts, options) {
	const logger = options?.logger;
	const merged = {};
	/** owner[key] = 当前提供该 key 值的来源（脱敏冲突日志用，只记 source 不记 value）。 */
	const owner = {};
	const layers = [
		{
			source: "staticCliEnv",
			env: facts.staticCliEnv
		},
		{
			source: "hostEnv",
			env: facts.hostEnv
		},
		{
			source: "conversationEnv",
			env: facts.conversationEnv
		},
		{
			source: "credentialEnv",
			env: facts.credentialEnv
		}
	];
	for (const { source, env } of layers) {
		if (!env) continue;
		for (const key of Object.keys(env)) {
			const value = env[key];
			const prevSource = owner[key];
			if (prevSource !== void 0 && merged[key] !== value) logger?.warn("[conversation-runtime] env layer override", {
				envKeyCount: 1,
				winnerSource: source,
				loserSources: [prevSource]
			});
			merged[key] = value;
			owner[key] = source;
		}
	}
	applySecurityLayer(merged, owner, facts.staticCliEnv, logger);
	return merged;
}
/** 层6：安全强制。覆盖任何来源；秘密/端口 value 不入日志。 */
function applySecurityLayer(merged, owner, staticCliEnv, logger) {
	if (merged[NODE_OPTIONS_KEY] !== void 0 && merged[NODE_OPTIONS_KEY] !== "") logger?.warn("[conversation-runtime] NODE_OPTIONS forced empty", {
		envKeyCount: 1,
		overriddenSource: owner[NODE_OPTIONS_KEY]
	});
	merged[NODE_OPTIONS_KEY] = "";
	for (const key of GATEWAY_PINNED_KEYS) {
		const pinned = staticCliEnv?.[key];
		if (pinned !== void 0) {
			if (merged[key] !== pinned) logger?.warn("[conversation-runtime] gateway env pinned to staticCliEnv", {
				envKeyCount: 1,
				overriddenSource: owner[key]
			});
			merged[key] = pinned;
		} else if (merged[key] !== void 0) {
			logger?.warn("[conversation-runtime] gateway env stripped (not from staticCliEnv)", {
				envKeyCount: 1,
				strippedSource: owner[key]
			});
			delete merged[key];
		}
	}
	const apiKeyHelperDisabled = staticCliEnv?.[API_KEY_HELPER_DISABLED_KEY];
	if (apiKeyHelperDisabled !== void 0) {
		if (merged[API_KEY_HELPER_DISABLED_KEY] !== apiKeyHelperDisabled) logger?.warn("[conversation-runtime] apiKeyHelper disable env pinned to staticCliEnv", {
			envKeyCount: 1,
			overriddenSource: owner[API_KEY_HELPER_DISABLED_KEY]
		});
		merged[API_KEY_HELPER_DISABLED_KEY] = apiKeyHelperDisabled;
	} else if (merged[API_KEY_HELPER_DISABLED_KEY] !== void 0) {
		logger?.warn("[conversation-runtime] apiKeyHelper disable env stripped (not from staticCliEnv)", {
			envKeyCount: 1,
			strippedSource: owner[API_KEY_HELPER_DISABLED_KEY]
		});
		delete merged[API_KEY_HELPER_DISABLED_KEY];
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/patch-conversation-product-config-env.ts
/**
* patchConversationProductConfigEnv —— 把会话级 WorkBuddy systemPrompt / tools
* 回写进 spawn env 的 ACC_PRODUCT_CONFIG（#83882）。
*
* 根因：session-payload 架构下 CLI 的 EnvProductProvider（priority=ENV）会在
* CliOptionsProductProvider（--system-prompt / --system-prompt-file）之后合并，用 env
* 快照里的 `agents.cli.instructions = "cli-agent-prompt"` 覆盖掉已写入的 WorkBuddy 正文。
* WorkbuddyEnvAgentsPatchProductProvider 还显式「env 优先」，进一步钉死 CBC 模板名。
*
* 因此人设即便已经通过 argv 正确传入，最终 OwnerAgentSnapshot 仍渲染 CBC。宿主侧在
* LaunchSpec.env 组装完成后，把同一份 WorkBuddy prompt 写进 ACC product snapshot 的
* `cli.instructions`，让 Env 合并结果与 argv 一致（#92964 同一份正文的第二条送达路径）。
*/
var ACC_PRODUCT_CONFIG_PATH_ENV = "ACC_PRODUCT_CONFIG_PATH";
var ACC_PRODUCT_CONFIG_INLINE_ENVS = [
	"ACC_PRODUCT_CONFIG_V3",
	"ACC_PRODUCT_CONFIG_V2",
	"ACC_PRODUCT_CONFIG"
];
/**
* 与 server `applyConversationRuntimeAgentOverrides` 同语义：覆盖/补齐 `cli` agent
* 的 instructions / tools，保留其余 agents 与产品字段。
*/
function applyConversationProductConfigAgentOverrides(productConfig, overrides) {
	if (!overrides.systemPrompt && !overrides.tools) return productConfig;
	const agents = [...productConfig?.agents ?? []];
	const cliIndex = agents.findIndex((agent) => agent.name === "cli");
	if (cliIndex >= 0) agents[cliIndex] = {
		...agents[cliIndex],
		...overrides.systemPrompt ? { instructions: overrides.systemPrompt } : {},
		...overrides.tools ? { tools: overrides.tools } : {}
	};
	else agents.push({
		name: "cli",
		description: "cli agent",
		...overrides.systemPrompt ? { instructions: overrides.systemPrompt } : {},
		...overrides.tools ? { tools: overrides.tools } : {},
		tags: ["cli", "default"]
	});
	return {
		...productConfig ?? {},
		agents
	};
}
function readProductConfigFromEnv(env) {
	const pathValue = env[ACC_PRODUCT_CONFIG_PATH_ENV];
	if (pathValue) try {
		const raw = node_fs.readFileSync(pathValue, "utf8");
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return {
			config: parsed,
			source: {
				kind: "path",
				path: pathValue
			}
		};
	} catch {}
	for (const key of ACC_PRODUCT_CONFIG_INLINE_ENVS) {
		const raw = env[key];
		if (!raw) continue;
		try {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return {
				config: parsed,
				source: {
					kind: "inline",
					key
				}
			};
		} catch {}
	}
}
/**
* 进程私有 spill 基目录，首次落盘时建、之后复用。
*
* 目录名仍然随机（`mkdtempSync` 的 POSIX 语义即 0o700 独占创建）：文件名一旦确定化，
* 固定目录就会被本地同机其它用户预判并抢先放符号链接，`renameSync` 会写到目标之外。
* 随机基目录 + 确定文件名同时满足「路径可复现」与「不可预测」。
*/
var spillBaseDir;
/**
* 同一会话并发写时 `.tmp` 不能互相抢：递增序号只作用于中间文件，最终路径仍由
* conversationId 决定，`renameSync` 保证读者只会看到完整的旧版本或完整的新版本。
*/
var spillTmpSeq = 0;
/**
* 进程内「上次为该 spill 路径写入的内容 hash」。命中即跳过一次 ~41KB 同步写：
* 会话连发多条消息时 product snapshot 通常一字不变，没必要每条都落盘。
* 只是省 IO 的优化，正确性不依赖它——文件被外部删掉时 `existsSync` 会把写补回来。
*/
var spillContentDigests = /* @__PURE__ */ new Map();
function ensureSpillBaseDir() {
	spillBaseDir ??= node_fs.mkdtempSync((0, node_path.join)((0, node_os.tmpdir)(), "workbuddy-conversation-product-"));
	return spillBaseDir;
}
/**
* 落盘路径由 conversationId 派生，与内容无关。
*
* 路径只表示「文件在哪」，不携带「文件是什么内容」：内容变化通过对同一路径原地覆写送达，
* CLI 侧 `EnvProductProvider` 每次 `provide()` live 读该路径，因此不需要换路径、也不需要
* 重启 worker。仓内同形态样板是 `cli-runtime-process.ts` 的 `writeAgentCliPromptVarsFile`
* （确定路径 + 原地重写 + 不重启 CLI）。
*
* 相对旧的「内容 sha256 做文件名」实现的收益：
* - 每个会话只留一个 spill 文件。按内容哈希命名时，人设/工具面每变一次就多一个 ~41KB
*   文件，daemon 不重启就永不回收。
* - 会话中途的记忆/人设更新当轮即可生效：路径不变 ⇒ 已 spawn 的 worker 下次 live 读就
*   拿到新内容，不必等下一次冷启动。
*
* 基目录仍然随机（`mkdtempSync` 的 POSIX 语义即 0o700 独占创建）：文件名确定化之后，
* 固定目录会被本地同机其它用户预判并抢先放符号链接，`renameSync` 会写到目标之外。
*/
function writePrivateSpill(conversationId, json) {
	const idDigest = (0, node_crypto.createHash)("sha256").update(conversationId).digest("hex").slice(0, 16);
	const target = (0, node_path.join)(ensureSpillBaseDir(), `acc-product-config-v3-${idDigest}.json`);
	const contentDigest = (0, node_crypto.createHash)("sha256").update(json).digest("hex");
	if (spillContentDigests.get(target) === contentDigest && node_fs.existsSync(target)) return target;
	const tmpPath = `${target}.${spillTmpSeq++}.tmp`;
	node_fs.writeFileSync(tmpPath, json, {
		encoding: "utf8",
		mode: 384
	});
	try {
		publishSpillFile(tmpPath, target);
	} catch (error) {
		if (error.code !== "EXDEV") throw error;
		copySpillFile(tmpPath, target);
		try {
			removeSpillTempFile(tmpPath);
		} catch {}
		spillContentDigests.set(target, contentDigest);
		return target;
	}
	spillContentDigests.set(target, contentDigest);
	return target;
}
/** 最小 rename 封装，便于测试跨设备 EXDEV 降级。 */
function publishSpillFile(tmpPath, target) {
	node_fs.renameSync(tmpPath, target);
}
function copySpillFile(tmpPath, target) {
	node_fs.copyFileSync(tmpPath, target);
}
function removeSpillTempFile(tmpPath) {
	node_fs.unlinkSync(tmpPath);
}
/**
* 在 6 层 env 合并完成后，把会话 systemPrompt/tools 写进 ACC product snapshot。
* 无 override 或读不到 product config 时原样返回。
*/
function patchConversationProductConfigEnv(env, overrides, options) {
	if (!overrides.systemPrompt && !overrides.tools) return { ...env };
	const loaded = readProductConfigFromEnv(env);
	if (!loaded) {
		options.logger?.warn?.("[conversation-runtime] product-config env patch skipped: no ACC product config");
		return { ...env };
	}
	const patched = applyConversationProductConfigAgentOverrides(loaded.config, overrides);
	if (!patched) return { ...env };
	const cli = patched.agents?.find((agent) => agent.name === "cli");
	const before = loaded.config.agents?.find((agent) => agent.name === "cli");
	if (before?.instructions === cli?.instructions && JSON.stringify(before?.tools ?? null) === JSON.stringify(cli?.tools ?? null)) return { ...env };
	const json = JSON.stringify(patched);
	const next = { ...env };
	next[ACC_PRODUCT_CONFIG_PATH_ENV] = writePrivateSpill(options.conversationId, json);
	next.ACC_PRODUCT_CONFIG_V3 = "";
	next.ACC_PRODUCT_CONFIG_V2 = "";
	next.ACC_PRODUCT_CONFIG = "";
	options.logger?.info?.("[conversation-runtime] product-config env patched via private spill", {
		instructionsLength: overrides.systemPrompt?.length ?? 0,
		toolsCount: overrides.tools?.length ?? 0,
		source: loaded.source.kind
	});
	return next;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/runtime/resolve-conversation-runtime-launch-spec.ts
/**
* resolveConversationRuntimeLaunchSpec —— worker hooks 编排 → ConversationRuntimeLaunchSpec。
*
* Wave A 局部并行 + 链式约束：
*   并行：resolveConversationConfig / beforePrompt / contributeEnv('pre') / resolveMcpServers / resolveCommand
*   beforePrompt 物化专家（不套 peek/3000）；resolveConversationConfig 的 peek 只渲染 runtime
*   链式：contributeEnv('postConversationConfig') 必须在 resolveConversationConfig settle 之后启动
*         （host 侧 session env 内的 agentTeams 读取 runtimeConfig 写入的 expertType 缓存）
* Wave B 汇合：refineConversationConfig 补专家 facts + desired·runtime fail-closed + env/args/fingerprint 合并。
*
* 责任边界：编排骨架（短路 / 并行 / desired·runtime fail-closed / AC9 降级 / 6 层合并 / fingerprint）
* 留 core；产品字段的注入与其 fail-closed 触发（认识具体 env key 名的部分，如 agentTeams/qimei）下沉
* host 的 contributeEnv('postConversationConfig') 内，core 仅保证专家路径不吞其抛错（透传）。
*
* 同步 hook 包 try/catch，异步 hook 包 withTimeout；任一失败/超时只降级该结果为 undefined
* （脱敏 L3 warn），不阻断整体（AC9）。专家身份绑定时相关 hook 必须 fail-closed。
*
* 脱敏：日志只打 key / 来源 / 数量 / fingerprint / durationMs，绝不打 token/凭据/端口 value。
*/
var DEFAULT_PROVIDER_TIMEOUT_MS = 3e3;
/** daemon McpService 首次惰性启动可能超过通用 hook 窗口；单独放宽避免静默降级。 */
var DEFAULT_MCP_RESOLVE_TIMEOUT_MS = 1e4;
/**
* resolveConversationConfig 的独立预算（#93758）。
*
* 这个 hook 不走 runAsync 降级，超时即整条 resolve 抛错；冷启动首条消息上它常常压着 3000ms 线，
* 于是发送路径被一次配置解析打成失败。本预算必须大于 host peek
* （DEFAULT_RUNTIME_RESOLVE_TIMEOUT_MS=10000），专家 fail-closed 仍由 host 先超时返回
* 「desired 成功 + runtime 缺失」，再由下面的 expert fail-closed 判定抛出——判定权不在这个 timeout 上。
* contributeEnv 仍用 DEFAULT_PROVIDER_TIMEOUT_MS。
* beforePrompt 不走该篱笆：与 runtime peek 并行物化专家包，失败 fail-closed，不挡渲染。
*/
var CONVERSATION_CONFIG_TIMEOUT_MS = 15e3;
/** bounded 异步：超时 reject，交调用方降级。 */
function withTimeout(promise, ms) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(/* @__PURE__ */ new Error(`hook timed out after ${ms}ms`)), ms);
		promise.then((value) => {
			clearTimeout(timer);
			resolve(value);
		}, (error) => {
			clearTimeout(timer);
			reject(error);
		});
	});
}
function awaitWithSignal(promise, signal) {
	if (!signal) return promise;
	if (signal.aborted) return Promise.reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
	return new Promise((resolve, reject) => {
		const onAbort = () => reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
		signal.addEventListener("abort", onAbort, { once: true });
		promise.then((value) => {
			signal.removeEventListener("abort", onAbort);
			resolve(value);
		}, (error) => {
			signal.removeEventListener("abort", onAbort);
			reject(error);
		});
	});
}
/** 同步 hook 降级包装：抛错 → undefined + L3 warn（只记 hook + message + durationMs）。 */
function runSync(hook, fn, logger) {
	const start = performance.now();
	try {
		const result = fn();
		logger?.info("[conversation-runtime] hook timing", {
			hook,
			durationMs: Math.round(performance.now() - start),
			status: "ok"
		});
		return result;
	} catch (error) {
		logger?.warn("[conversation-runtime] hook skipped", {
			hook,
			durationMs: Math.round(performance.now() - start),
			status: "fail",
			errorKind: error instanceof Error ? error.name : typeof error
		});
		return;
	}
}
/**
* beforePrompt：与 resolveConversationConfig 并行，不套 peek/3000 篱笆。
* 普通抛错 AC9 降级；专家 fail-closed 透传。
*/
async function runBeforePrompt(fn, logger) {
	const start = performance.now();
	try {
		const result = await fn();
		logger?.info("[conversation-runtime] hook timing", {
			hook: "beforePrompt",
			durationMs: Math.round(performance.now() - start),
			status: "ok"
		});
		return result;
	} catch (error) {
		if (isWorkerHookFailClosed(error)) {
			logger?.warn("[conversation-runtime] hook skipped", {
				hook: "beforePrompt",
				durationMs: Math.round(performance.now() - start),
				status: "fail",
				errorKind: error instanceof Error ? error.name : typeof error
			});
			throw error;
		}
		logger?.warn("[conversation-runtime] hook skipped", {
			hook: "beforePrompt",
			durationMs: Math.round(performance.now() - start),
			status: "degraded",
			errorKind: error instanceof Error ? error.name : typeof error
		});
		return;
	}
}
/** 异步 hook 降级包装：超时/抛错 → undefined + L3 warn（只记 hook + message + durationMs）。 */
async function runAsync(hook, fn, ms, logger) {
	const start = performance.now();
	try {
		const result = await withTimeout(fn(), ms);
		logger?.info("[conversation-runtime] hook timing", {
			hook,
			durationMs: Math.round(performance.now() - start),
			status: "ok"
		});
		return result;
	} catch (error) {
		logger?.warn("[conversation-runtime] hook skipped", {
			hook,
			durationMs: Math.round(performance.now() - start),
			status: "degraded",
			errorKind: error instanceof Error ? error.name : typeof error
		});
		return;
	}
}
/** 记录 env 命中（脱敏 L2：只记数量 + 来源，避免泄漏环境变量 key 指纹）。 */
function logResolved(logger, source, env) {
	if (!logger || !env) return;
	logger.info("[conversation-runtime] env resolved", {
		source,
		envCount: Object.keys(env).length
	});
}
function resolveAutomationEnv(sessionSettings) {
	const raw = sessionSettings?.automation;
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
	const automation = raw;
	const env = {};
	if (automation.disableSessionSummary === true) env.CODEBUDDY_CODE_DISABLE_SESSION_SUMMARY = "1";
	if (automation.disableSessionTitle === true) env.CODEBUDDY_CODE_DISABLE_SESSION_TITLE = "1";
	if (automation.disableTerminalTitle === true) env.CODEBUDDY_CODE_DISABLE_TERMINAL_TITLE = "1";
	return Object.keys(env).length > 0 ? env : void 0;
}
/** 日志用：settings.enabledPlugins 里最终为 true 的 id，排序后返回。 */
function summarizeEnabledPluginIds(settings) {
	const enabledPlugins = settings?.enabledPlugins;
	if (!enabledPlugins || typeof enabledPlugins !== "object" || Array.isArray(enabledPlugins)) return [];
	return Object.entries(enabledPlugins).filter(([, enabled]) => enabled === true).map(([pluginId]) => pluginId).sort();
}
/** 稳定序列化：对象按 key 排序递归，数组保序；供 fingerprint 稳定 hash。 */
function stableStringify(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
	if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}
function isEmptyFingerprintCollection(value) {
	if (Array.isArray(value)) return value.length === 0;
	if (value !== null && typeof value === "object") return Object.keys(value).length === 0;
	return false;
}
/**
* 指纹视图：删掉值为 `{}` 或 `[]` 的键。
* 只影响重启判定；实际 sessionSettings 与 spawn 参数保持原样。
*/
function normalizeSessionSettingsForFingerprint(sessionSettings) {
	const normalized = {};
	for (const [key, value] of Object.entries(sessionSettings)) {
		if (isEmptyFingerprintCollection(value)) continue;
		normalized[key] = value;
	}
	return Object.keys(normalized).length > 0 ? normalized : void 0;
}
/** `--settings` 也使用同一指纹视图，避免 argv 中的空集合造成伪变化。 */
function toFingerprintArgsView(args) {
	if (args === void 0) return;
	const settingsFlagIndex = args.indexOf("--settings");
	const rawSettings = settingsFlagIndex >= 0 ? args[settingsFlagIndex + 1] : void 0;
	if (rawSettings === void 0) return args;
	try {
		const parsed = JSON.parse(rawSettings);
		if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return args;
		const normalized = normalizeSessionSettingsForFingerprint(parsed);
		const nextSettings = JSON.stringify(normalized ?? {});
		if (nextSettings === rawSettings) return args;
		const view = [...args];
		view[settingsFlagIndex + 1] = nextSettings;
		return view;
	} catch {
		return args;
	}
}
/**
* restartFingerprint 的 env 例外表（#93758）。
*
* 设计原则：**默认全部 env 进指纹，例外表是显式审计动作**。`computeRestartFingerprint`
* 哈希整份 env，漏判时的默认行为是「重启」——宁可多冷启一次，也不要「改了设置不生效」。
*
* 本轮只收 ACC 四键：spill 路径由 conversationId 派生（见
* `patch-conversation-product-config-env.ts`），内容更新走原地覆写 + CLI 侧
* `EnvProductProvider` live 读，路径/空串噪音不该杀掉在跑的 worker。
*/
var FINGERPRINT_EXCLUDED_ENV_KEYS = [
	"ACC_PRODUCT_CONFIG_PATH",
	"ACC_PRODUCT_CONFIG_V3",
	"ACC_PRODUCT_CONFIG_V2",
	"ACC_PRODUCT_CONFIG"
];
/**
* 指纹视图：从 env 副本里剔除例外表后再参与 hash。
* 返回值只喂 `computeRestartFingerprint`；`launchSpec.env`（spawn 用的那份）必须保持原样。
*/
function toFingerprintEnvView(env) {
	const view = { ...env };
	for (const key of FINGERPRINT_EXCLUDED_ENV_KEYS) delete view[key];
	return view;
}
function computeRestartFingerprint(input) {
	return (0, node_crypto.createHash)("sha256").update(stableStringify(input)).digest("hex");
}
async function resolveConversationRuntimeLaunchSpec(ctx, hooks, options) {
	const logger = options?.logger;
	const timeoutMs = options?.timeoutMs ?? DEFAULT_PROVIDER_TIMEOUT_MS;
	const hostMcpTimeoutMs = hooks.resolveMcpServersTimeoutMs ? runSync("resolveMcpServersTimeoutMs", () => hooks.resolveMcpServersTimeoutMs(ctx), logger) : void 0;
	const mcpTimeoutMs = options?.timeoutMs ?? (typeof hostMcpTimeoutMs === "number" && hostMcpTimeoutMs > 0 ? hostMcpTimeoutMs : void 0) ?? DEFAULT_MCP_RESOLVE_TIMEOUT_MS;
	const totalStart = performance.now();
	const beforePromptPromise = hooks.beforePrompt ? runBeforePrompt(() => hooks.beforePrompt(ctx), logger) : Promise.resolve(void 0);
	const conversationConfigStart = performance.now();
	const conversationConfigTimeoutMs = options?.timeoutMs ?? CONVERSATION_CONFIG_TIMEOUT_MS;
	const conversationConfigPromise = hooks.resolveConversationConfig ? withTimeout(hooks.resolveConversationConfig(ctx), conversationConfigTimeoutMs).then((value) => {
		logger?.info("[conversation-runtime] hook timing", {
			hook: "resolveConversationConfig",
			durationMs: Math.round(performance.now() - conversationConfigStart),
			status: "ok"
		});
		return value;
	}) : Promise.resolve(void 0);
	const preEnvPromise = hooks.contributeEnv ? runAsync("contributeEnv:pre", () => Promise.resolve(hooks.contributeEnv(ctx, "pre")), timeoutMs, logger) : Promise.resolve(void 0);
	const settledConversationConfigPromise = Promise.all([conversationConfigPromise, beforePromptPromise]).then(async ([raw]) => {
		if (!raw || !hooks.refineConversationConfig) return raw;
		return await hooks.refineConversationConfig(ctx, raw) ?? raw;
	});
	const runtimeCompositionPromise = settledConversationConfigPromise.then((conversationConfig) => {
		const composition = require_conversations.composeConversationRuntime({
			context: ctx,
			conversationConfig,
			hasConversationConfigProvider: hooks.resolveConversationConfig !== void 0,
			hashText: (value) => (0, node_crypto.createHash)("sha256").update(value).digest("hex")
		});
		logger?.info("[conversation-runtime] composition resolved", {
			sessionId: ctx.conversationId,
			manifestHash: composition.manifestHash,
			keys: Object.keys(composition.requirements),
			settingsKeys: composition.requirements.settings ? Object.keys(composition.requirements.settings).sort() : [],
			enabledPluginIds: summarizeEnabledPluginIds(composition.requirements.settings),
			allowedToolsCount: composition.requirements.allowedTools?.length ?? 0,
			requiredPluginCount: composition.requiredPluginIds.length,
			degraded: composition.degraded
		});
		return {
			conversationConfig,
			composition
		};
	});
	const conversationEnvStart = performance.now();
	const conversationEnvPromise = settledConversationConfigPromise.then((resolvedConversationConfig) => {
		if (!hooks.contributeEnv) return;
		return withTimeout(Promise.resolve(hooks.contributeEnv(ctx, "postConversationConfig", { conversationConfig: resolvedConversationConfig })), timeoutMs).then((value) => {
			logger?.info("[conversation-runtime] hook timing", {
				hook: "contributeEnv:postConversationConfig",
				durationMs: Math.round(performance.now() - conversationEnvStart),
				status: "ok"
			});
			return value;
		}, (error) => {
			if (resolvedConversationConfig?.desired?.expertId || isWorkerHookFailClosed(error)) throw error;
			logger?.warn("[conversation-runtime] hook skipped", {
				hook: "contributeEnv:postConversationConfig",
				durationMs: Math.round(performance.now() - conversationEnvStart),
				status: "degraded",
				errorKind: error instanceof Error ? error.name : typeof error
			});
		});
	});
	const mcpPromise = runtimeCompositionPromise.then(async (resolved) => {
		const resolvedConversationConfig = resolved.conversationConfig;
		if (!hooks.resolveMcpServers) return;
		try {
			hooks.reportPrepareStatus?.(ctx, {
				stage: "mcp",
				servers: []
			});
			return await runAsync("resolveMcpServers", () => Promise.resolve(hooks.resolveMcpServers(ctx, { conversationConfig: resolvedConversationConfig })), mcpTimeoutMs, logger);
		} finally {
			hooks.reportPrepareStatus?.(ctx, null);
		}
	});
	const workerCommand = hooks.resolveCommand ? runSync("resolveCommand", () => hooks.resolveCommand(), logger) : void 0;
	const [resolved, beforePromptRequests, preEnv, conversationEnvContribution, mcpFromHooks] = await awaitWithSignal(Promise.all([
		runtimeCompositionPromise,
		beforePromptPromise,
		preEnvPromise,
		conversationEnvPromise,
		mcpPromise
	]), ctx.signal);
	const conversationConfig = resolved.conversationConfig;
	const mcpEnv = mcpFromHooks?.length && hooks.resolveMcpEnv ? runSync("resolveMcpEnv", () => hooks.resolveMcpEnv(ctx, mcpFromHooks), logger) : void 0;
	const staticCliEnv = preEnv?.static;
	logResolved(logger, "staticCliEnv", staticCliEnv);
	const hostEnv = preEnv?.host;
	logResolved(logger, "hostEnv", hostEnv);
	const credentialEnv = preEnv?.credential || mcpEnv ? {
		...preEnv?.credential ?? {},
		...mcpEnv ?? {}
	} : void 0;
	logResolved(logger, "credentialEnv", credentialEnv);
	const { composition } = resolved;
	const requiredPluginIds = [...composition.requiredPluginIds];
	const projectedMcpConfigJson = conversationConfig?.runtime?.value?.mcpConfigJson;
	const promptVarsFile = conversationConfig?.runtime?.value?.promptVarsFile;
	const requirements = {
		...composition.requirements,
		...promptVarsFile ? { promptVarsFile } : {},
		...projectedMcpConfigJson ? { mcpConfigJson: projectedMcpConfigJson } : {}
	};
	if (composition.expert?.id && !beforePromptRequests?.length) throw new Error(`[conversation-runtime] expert before-prompt runtime unavailable for session ${ctx.conversationId}`);
	const automationEnv = resolveAutomationEnv(ctx.sessionSettings);
	const conversationEnv = conversationEnvContribution?.conversation || automationEnv ? {
		...conversationEnvContribution?.conversation ?? {},
		...automationEnv ?? {}
	} : void 0;
	logResolved(logger, "conversationEnv", conversationEnv);
	const mergedEnv = buildConversationAgentCliEnv({
		staticCliEnv,
		hostEnv,
		conversationEnv,
		credentialEnv
	}, { logger });
	const agentTools = requirements.tools ? requirements.tools.split(",").map((name) => name.trim()).filter(Boolean) : void 0;
	const env = patchConversationProductConfigEnv(mergedEnv, {
		...requirements.systemPrompt ? { systemPrompt: requirements.systemPrompt } : {},
		...agentTools ? { tools: agentTools } : {}
	}, {
		logger,
		conversationId: ctx.conversationId
	});
	const cliRuntimeArgs = buildConversationAgentCliArgs(requirements, { cwd: ctx.cwd });
	const command = workerCommand?.command;
	const args = workerCommand?.args !== void 0 || cliRuntimeArgs.length > 0 ? [...workerCommand?.args ?? [], ...cliRuntimeArgs] : void 0;
	const runtimeArgsStartIndex = workerCommand?.args?.length ?? 0;
	const argFileCandidates = args ? [
		createArgFileCandidate(args, "--system-prompt", "system-prompt.txt", runtimeArgsStartIndex, "--system-prompt-file"),
		createArgFileCandidate(args, "--settings", "settings.json", runtimeArgsStartIndex),
		createArgFileCandidate(args, "--mcp-config", "mcp-config.json", runtimeArgsStartIndex)
	].filter((candidate) => candidate !== void 0) : [];
	if (workerCommand) logger?.info("[conversation-runtime] hook resolved", {
		hook: "resolveCommand",
		hasCommand: command !== void 0,
		argsCount: workerCommand.args?.length ?? 0
	});
	const mcpServers = ctx.sessionMcpPolicy?.excludeLaunchSpecServers ? [] : mcpFromHooks ?? [];
	const mcpIntentionallyEmpty = conversationConfig?.runtime?.value?.mcpIntentionallyEmpty === true;
	const sessionSettings = requirements.settings;
	const expert = composition.expert;
	const fingerprintSessionSettings = sessionSettings ? normalizeSessionSettingsForFingerprint(sessionSettings) : void 0;
	const restartFingerprint = computeRestartFingerprint({
		command,
		args: toFingerprintArgsView(args),
		env: toFingerprintEnvView(env),
		mcpServers,
		...fingerprintSessionSettings ? { sessionSettings: fingerprintSessionSettings } : {},
		...beforePromptRequests?.length ? { beforePromptRequests } : {},
		...requiredPluginIds.length > 0 ? { requiredPluginIds } : {},
		...expert ? { expert } : {}
	});
	const totalDurationMs = Math.round(performance.now() - totalStart);
	logger?.info("[conversation-runtime] launch-spec resolved", {
		sessionId: ctx.conversationId,
		cwd: ctx.cwd,
		envCount: Object.keys(env).length,
		mcpCount: mcpServers.length,
		argsCount: args?.length ?? 0,
		fingerprint: restartFingerprint,
		totalDurationMs
	});
	return {
		...requirements.systemPrompt ? { systemPrompt: requirements.systemPrompt } : {},
		...requirements.tools ? { agentTools: requirements.tools.split(",").map((name) => name.trim()).filter(Boolean) } : {},
		...command ? { command } : {},
		...args !== void 0 ? { args } : {},
		...argFileCandidates.length > 0 ? { argFileCandidates } : {},
		env,
		mcpServers,
		...mcpIntentionallyEmpty ? { mcpIntentionallyEmpty: true } : {},
		...sessionSettings ? { sessionSettings } : {},
		...requiredPluginIds.length > 0 ? { requiredPluginIds } : {},
		...beforePromptRequests?.length ? { beforePromptRequests } : {},
		restartFingerprint
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/local-conversations-impl.ts
/**
* LocalConversationsImpl · 端侧本地任务会话管理（Node-only）。
*
* B 方案：直接继承 `ConversationsBase`，用 `NodeRuntimeContext.sqlite` raw SQL **直接实现**
* 数据访问抽象钩子——不再经由"注入 ConversationOps + 共享包装"这层。
*
* 直连 server 存量 `sessions` 表：不建表、不迁移，只做本地任务元数据 CRUD 与本地连接信息，
* 不制造 `local://` 伪 URL（实时通道由上层 SessionConnection 装配）。
*/
var MODES_WITHOUT_EXPERT = /* @__PURE__ */ new Set(["plan", "ask"]);
var LEGACY_UNREAD_NAMESPACE = "conversations";
var LEGACY_UNREAD_KEY = "unread-completed";
/**
* fetchList / listByIds 可用 live 覆盖 sqlite 的状态。
* idle 故意排除：专家团主 agent end_turn 后 live 变 idle，子 agent 常仍在跑，
* overlay idle 会把侧栏写成 completed。
*/
var LIVE_LIST_OVERLAY_STATES = /* @__PURE__ */ new Set([
	"pending",
	"working",
	"planning",
	"error",
	"failed",
	"terminated"
]);
/**
* DB 里可能是「上一生命周期残留」的终态。live 实例为 idle（活着且静止）时，这些 DB 值不可信，
* 归一到 idle，避免正常运行/刚结束的会话被旧 terminated/error/failed 染红。见 toConversationInfo。
*/
var STALE_TERMINAL_LIST_STATES = /* @__PURE__ */ new Set([
	"terminated",
	"error",
	"failed"
]);
/** sqlite 运行态 pending 及其历史别名。本地打开不 resume HITL（#93758），无活 PendingRequest 即孤儿。 */
var ORPHAN_PENDING_SQLITE_STATUSES = [
	"pending",
	"waiting_permission",
	"waiting_question",
	"paused"
];
function supportsOrphanToolRepair(source) {
	return typeof source.persistOrphanPendingCancelledTools === "function";
}
function shouldClearExpertForMode(mode) {
	return MODES_WITHOUT_EXPERT.has(mode);
}
function deepFreeze(value) {
	if (value && typeof value === "object" && !Object.isFrozen(value)) {
		for (const child of Object.values(value)) deepFreeze(child);
		Object.freeze(value);
	}
	return value;
}
function createLocalConversationDeps(context, creditPredictionPort, loadChanges, historySource, resourceQueries, resourceEffectPort, onPerfMark, resourceEffectPortWrapper, promptObserverPort, toolUpdateObserverPort) {
	const diagnosticLogger = createConversationFileLogger(context);
	const baseResourceEffectPort = resourceEffectPort ?? (typeof context.homeDir === "string" ? createNodeResourceEffectPort(context) : void 0);
	const effectiveResourceEffectPort = baseResourceEffectPort && resourceEffectPortWrapper ? resourceEffectPortWrapper(baseResourceEffectPort) : baseResourceEffectPort;
	return {
		storage: context.storage?.user,
		creditPredictionPort,
		capacityQueueApiClient: require_conversations.createCapacityQueueApiClient(context.http),
		loadChanges,
		historySource,
		resourceQueries,
		resourceEffectPort: effectiveResourceEffectPort,
		promptObserverPort,
		toolUpdateObserverPort,
		logOperation: diagnosticLogger.operation,
		logConversation: diagnosticLogger.conversation,
		tracer: context.tracer,
		onPerfMark
	};
}
function releasePluginLeaseOnDisconnect(connection, lease) {
	if (!lease) return connection;
	const disconnect = connection.disconnect.bind(connection);
	let released = false;
	connection.disconnect = async () => {
		try {
			await disconnect();
		} finally {
			if (!released) {
				released = true;
				lease.release();
			}
		}
	};
	return connection;
}
/** 本地任务会话管理：读取和维护当前用户可见的 local sessions（sqlite 直连）。 */
var LocalConversationsImpl = class extends require_conversations.ConversationsBase {
	/**
	* 同步：当前进程是否持有该 id 的未 dispose live ConversationImpl。
	* 与 `has()`（查 sqlite 行）不同，只反映内存 intern 实例。
	*/
	isLive(conversationId) {
		const live = this.liveById.get(conversationId);
		return live !== void 0 && !live.isDisposed;
	}
	/** 全局 MCP/context 策略变化时热刷新当前存活的本地会话。 */
	async refreshLiveRuntimeConfigs() {
		await Promise.all([...this.liveById.values()].filter((conversation) => !conversation.isDisposed).map((conversation) => conversation.refreshRuntimeConfig()));
	}
	/** Local：直接查 SQLite 行是否存在，不走 fetchDetail（不构造 ConversationDetail）。 */
	async hasConversation(conversationId) {
		await this.ensureUnreadMigrated();
		return this.getVisibleRow(conversationId) !== void 0;
	}
	constructor({ context, creditPredictionPort, generateCwd, resolveWorkerCommand, loadChanges, historySource, resourceQueries, resourceEffectPort, resolveAssistantCwd, isAssistantCwd, plugins, plugin, hooks, deleteSessionHost, onExpertCleared, onPerfMark, resourceEffectPortWrapper, promptObserverPort, toolUpdateObserverPort, onLocalCacheUpdated }) {
		super(createLocalConversationDeps(context, creditPredictionPort, loadChanges, historySource, resourceQueries, resourceEffectPort, onPerfMark, resourceEffectPortWrapper, promptObserverPort, toolUpdateObserverPort));
		this.unreadMigrationByIdentity = /* @__PURE__ */ new Map();
		this.has = (conversationId) => this.hasConversation(conversationId);
		this.liveById = /* @__PURE__ */ new Map();
		this.lastRuntimeStatusEmit = /* @__PURE__ */ new Map();
		this.pluginLeasesByConversation = /* @__PURE__ */ new Map();
		this.buddySnapshotCache = /* @__PURE__ */ new Map();
		this.staleTerminalOverlayLogged = /* @__PURE__ */ new Set();
		this.orphanPendingTerminatedPersisted = /* @__PURE__ */ new Set();
		this.orphanToolRepairRequired = /* @__PURE__ */ new Set();
		this.orphanToolRepairTasks = /* @__PURE__ */ new Map();
		this.staleWorkingHealed = /* @__PURE__ */ new Set();
		this.listHistorySource = historySource;
		this.sqlite = context.sqlite;
		this.context = context;
		this.diagnosticLog = createConversationFileLogger(context);
		this.generateCwd = generateCwd;
		this.resolveWorkerCommand = resolveWorkerCommand;
		this.resolveAssistantCwd = resolveAssistantCwd;
		this.isAssistantCwd = isAssistantCwd;
		this.plugins = plugins;
		this.deleteSessionHost = deleteSessionHost;
		this.onExpertCleared = onExpertCleared;
		this.onLocalCacheUpdated = onLocalCacheUpdated;
		const registeredPlugin = plugin ?? (hooks ? defineLegacyConversationPlugin(hooks) : void 0);
		const governedHooks = registeredPlugin ? createGovernedConversationHooks(registeredPlugin, this.context.logger).hooks : void 0;
		this.resolveLaunchSpec = governedHooks ? (ctx) => resolveConversationRuntimeLaunchSpec(ctx, governedHooks, { logger: this.context.logger }) : void 0;
		this.createConversationAdmission = governedHooks?.createConversationAdmission;
		this.prepareConversationPrompt = governedHooks?.prepareConversationPrompt;
		this.getConversationRuntimeRevision = governedHooks?.getConversationRuntimeRevision;
		this.checkWorkspaceAccess = governedHooks?.checkWorkspaceAccess;
		this.acquireLocalHttpRuntime = governedHooks?.acquireLocalHttpRuntime;
		this.releaseLocalHttpRuntime = governedHooks?.releaseLocalHttpRuntime;
	}
	buildConversation(detail, config, isPinned = false) {
		const existing = this.liveById.get(detail.id);
		if (existing && !existing.isDisposed) {
			existing.info.isPinned = isPinned;
			existing.info.unread = detail.unread === true;
			return existing;
		}
		const sqliteStatus = detail.sessionStatus ?? detail.status;
		if (ORPHAN_PENDING_SQLITE_STATUSES.includes(sqliteStatus ?? "")) {
			this.persistOrphanPendingTerminated(detail.id);
			detail = {
				...detail,
				status: "terminated",
				sessionStatus: "terminated"
			};
		}
		const pluginLease = this.plugins?.acquire();
		const { configManager, promptRuntimeGate } = createLocalConfigManagerRuntime({
			mode: detail.mode ?? detail.sourceMode ?? config?.mode,
			model: detail.model ?? config?.model,
			thoughtLevel: detail.thoughtLevel,
			contextWindow: detail.contextWindow === void 0 ? void 0 : String(detail.contextWindow),
			connectors: detail.addonSelection?.connectorIds?.map((name) => ({ name })) ?? [],
			expert: require_conversations.expertSelectionFromDetail(detail) ?? (config?.expertId ? { id: config.expertId } : void 0),
			permissionMode: detail.permissionMode ?? config?.permissionMode,
			useSandboxCLI: detail.useSandboxCLI ?? config?.useSandboxCLI,
			sessionId: detail.id,
			log: this.context.logger,
			onExpertCleared: () => this.onExpertCleared?.(detail.id),
			onConnectorsChange: (connectors) => this.patchConversation(detail.id, { addonSelection: {
				...detail.addonSelection ?? { version: 1 },
				connectorIds: connectors.map((connector) => connector.name)
			} }),
			onModeChange: (mode) => this.patchConversation(detail.id, {
				mode,
				permissionMode: mode === "plan" ? this.resolveLatestRuntimeSelection(detail.id)?.permissionMode ?? "bypassPermissions" : "",
				...shouldClearExpertForMode(mode) ? { expertId: "" } : {}
			}),
			onModelChange: (model) => this.patchConversation(detail.id, { model }),
			persistConfig: (patch) => this.patchConversation(detail.id, patch),
			onExpertIdChange: (expertId, options) => this.patchConversation(detail.id, require_conversations.expertPatchFromPersistOptions(expertId, options)),
			onPermissionModeChange: (permissionMode) => this.patchConversation(detail.id, { permissionMode }),
			onSandboxModeChange: (useSandboxCLI) => this.patchConversation(detail.id, { useSandboxCLI })
		});
		try {
			const conversation = super.buildConversation(detail, config, isPinned, {
				preloadRuntime: this.resolveLaunchSpec !== void 0 || (pluginLease?.pluginIds.length ?? 0) > 0,
				reclaimStaleExternalWriter: async () => {
					return (await reclaimOrphanAcpWorkers({ log: (message, data) => {
						this.context.logger?.warn?.(`[LocalConversations] ${message}`, data);
					} })).signaled > 0;
				},
				configManager,
				promptRuntimeGate,
				onDirectHistoryPageHydrated: (page) => this.repairOrphanToolsAfterHydration(detail, page),
				beforeRuntimeSessionResume: () => this.ensureOrphanToolRepair(detail),
				runtimeStatusOps: {
					markTerminated: (id) => this.patchConversation(id, { status: "terminated" }).then(() => this.emitLocalStatusChanged(id, "terminated")),
					markError: (id) => this.patchConversation(id, { status: "error" }).then(() => this.emitLocalStatusChanged(id, "error")),
					markActive: (id) => this.patchConversation(id, { status: "active" }).then(() => this.emitLocalStatusChanged(id, "active")),
					touchActivity: (id, at) => this.advanceActivity(id, at),
					updateStatus: (id, status) => {
						const previous = this.getVisibleRow(id)?.status;
						return this.patchConversation(id, { status }).then(() => {
							this.rememberOrphanPendingTerminated(id, previous, status);
							this.emitLocalStatusChanged(id, status);
						});
					}
				},
				...pluginLease && pluginLease.pluginIds.length > 0 ? { artifactToolRules: pluginLease.artifactToolRules } : {}
			});
			if (pluginLease) this.pluginLeasesByConversation.set(detail.id, pluginLease);
			return this.rememberLive(conversation, pluginLease);
		} catch (error) {
			pluginLease?.release();
			throw error;
		}
	}
	rememberLive(conversation, pluginLease) {
		const live = conversation;
		const originalDispose = live.dispose.bind(live);
		Object.defineProperty(live, "dispose", {
			configurable: true,
			writable: true,
			value: async () => {
				this.forgetLive(live.info.id, live);
				try {
					await originalDispose();
				} finally {
					if (this.pluginLeasesByConversation.get(live.info.id) === pluginLease) this.pluginLeasesByConversation.delete(live.info.id);
					pluginLease?.release();
				}
			}
		});
		this.liveById.set(live.info.id, live);
		return live;
	}
	forgetLive(conversationId, instance) {
		if (instance !== void 0 && this.liveById.get(conversationId) !== instance) return;
		this.liveById.delete(conversationId);
		this.lastRuntimeStatusEmit.delete(conversationId);
	}
	/**
	* 本地 runtime 状态转换落库后广播列表变更(#105712 单一链路收敛 · 阶段 1)。
	*
	* 背景:状态机 `setState`→`persistRuntimeStatus`→`runtimeStatusOps.updateStatus`→`patchConversation`
	* 仅写 sessions.status,历史上**不发任何列表 emit**,本地 `working→idle` 收敛只能靠 poller 30s
	* 发现(#86427/#98925)。此处在落库成功后主动发 `updated`,把"写库→读库→UI"单链路补齐。
	*
	* 高频去重:updateStatus 每 turn 多次调用,同 status 不重复 emit(避免 working 态抖动打爆侧栏重算);
	* 状态真变化才 emit。emit 仅带 id,消费者按 id 重读(overlay 在 toConversationInfo 叠加最新 live 态)。
	*
	* ⚠️ 断桥同标题:emitConversationChanged 只走 daemon 进程内 changeHandlers,且 #105712 已移除原来
	* 兜底的 30s poller(register-wb-bridge-channels.ts),进程内 emit 到不了侧栏。live 会话的状态图标
	* 另有 pool 转发的 WB_CONVERSATION_STATE_CHANGE 兜住;但会话出池(dispose)后 / 纯落库态,侧栏状态
	* 停在旧值直到下次整页 ListChange。故与标题同款,再走 onLocalCacheUpdated 补一条集合级、带完整
	* 快照、live 无关的 WB_CONVERSATION_LIST_CHANGED(装配层桥接);已去重,不会打爆侧栏。
	*/
	emitLocalStatusChanged(conversationId, status) {
		const dedupPrev = this.lastRuntimeStatusEmit.get(conversationId);
		const willEmit = dedupPrev !== status;
		if (status === "completed" || status === "terminated" || status === "error") {
			const row = this.getVisibleRow(conversationId);
			const projected = row ? this.toConversationInfo(row) : void 0;
			this.context.logger?.info?.("[cl-status-sync-105712] emitLocalStatusChanged terminal", {
				conversationId,
				incomingStatus: status,
				dedupPrev: dedupPrev ?? "<none>",
				willEmit,
				rawDbStatus: row?.status ?? "<no-row>",
				projectedState: projected?.state ?? "<no-row>",
				projectedHasRunningBackgroundTasks: projected?.hasRunningBackgroundTasks ?? "<no-row>",
				hasLive: this.liveById.has(conversationId)
			});
		}
		if (!willEmit) return;
		this.lastRuntimeStatusEmit.set(conversationId, status);
		this.emitConversationChanged("updated", { id: conversationId });
		this.onLocalCacheUpdated?.([conversationId]);
	}
	async fetchList(params) {
		if (!this.currentUserId()) {
			const accountSnapshot = this.context.accountProvider?.();
			this.context.logger?.warn?.(`[FirstScreen-107526] fetchList partial-empty (uid empty) space=${params?.space ?? "<none>"} page=${params?.page ?? "<none>"} size=${params?.size ?? "<none>"} accountProviderUid=${accountSnapshot?.uid ?? "<none>"} accountProviderEnterpriseId=${accountSnapshot?.enterpriseId ?? "<none>"}`);
			return {
				items: [],
				total: 0,
				independentTotal: 0,
				partial: true
			};
		}
		await this.ensureUnreadMigrated();
		const page = params?.page ?? 1;
		const size = params?.size ?? 50;
		const start = (page - 1) * size;
		const rows = this.applyListParams(this.visibleRows(params?.state), params);
		await this.healNonLiveStaleWorkingRows(rows);
		const infos = rows.map((row) => this.toConversationInfo(row));
		const independentTotal = infos.filter((info) => info.space.type === "local" && info.space.autoGenerated === true).length;
		return {
			items: infos.slice(start, start + size),
			total: infos.length,
			independentTotal
		};
	}
	/** 按 id 批量取本地会话（sqlite，当前用户可见范围内）。 */
	async listByIds(ids, _options) {
		const uid = this.currentUserId();
		if (ids.length === 0 || !uid) return [];
		await this.ensureUnreadMigrated();
		const uniqueIds = [...new Set(ids)];
		const placeholders = uniqueIds.map(() => "?").join(", ");
		const rows = this.sqlite.prepare(`
            SELECT ${require_conversations.SESSION_LIST_SELECT_COLUMNS}
            FROM sessions
            WHERE transport = 'local'
              AND deleted_at IS NULL
              AND (user_id = ? OR user_id = '')
              AND id IN (${placeholders})
            ORDER BY COALESCE(last_activity_at, created_at) DESC, id ASC
        `).all(uid, ...uniqueIds).filter((row) => !require_quick_ask_tags.hasQuickAskConversationTag(storedConversationTags(row)));
		await this.healNonLiveStaleWorkingRows(rows);
		return rows.map((row) => this.toConversationInfo(row));
	}
	/** list 第一页补齐窗口外置顶会话，复用公开批量读取实现。 */
	async fetchByIds(ids) {
		return [...await this.listByIds(ids)];
	}
	/**
	* 按 id 集合回查「本端已归档(sessions.status='archived' 且未软删)」的 id(#105712 闪烁根治)。
	* 供 poller 甄别「从主列表消失 = 归档 ≠ 删除」,避免本地归档终态会话被误报 deleted → 侧栏
	* 二次移除闪烁。同步 SQLite 读、无网络。无 uid 时返回空集。
	*/
	getArchivedIdsFromCache(ids) {
		const result = /* @__PURE__ */ new Set();
		const uid = this.currentUserId();
		if (ids.length === 0 || !uid) return result;
		const uniqueIds = [...new Set(ids)];
		const placeholders = uniqueIds.map(() => "?").join(", ");
		const rows = this.sqlite.prepare(`
            SELECT id FROM sessions
            WHERE transport = 'local'
              AND deleted_at IS NULL
              AND (user_id = ? OR user_id = '')
              AND status = 'archived'
              AND id IN (${placeholders})
        `).all(uid, ...uniqueIds);
		for (const row of rows) if (typeof row.id === "string") result.add(row.id);
		return result;
	}
	async fetchDetail(conversationId) {
		await this.ensureUnreadMigrated();
		const row = this.getVisibleRow(conversationId);
		if (!row) throw new Error(`[LocalConversationsImpl] session not found: ${conversationId}`);
		const detail = rowToConversationDetail(row);
		const buddySnapshot = this.loadBuddyConversationSnapshot(row);
		const projected = buddySnapshot ? {
			...detail,
			buddySnapshot
		} : detail;
		return this.isAssistantCwd?.(row.cwd) ? {
			...projected,
			kind: "assistant"
		} : projected;
	}
	async insertConversation(params) {
		const userId = this.currentUserId();
		if (!userId) throw new Error("[LocalConversationsImpl] create failed: no user id");
		if (!params.cwd) throw new Error("[LocalConversationsImpl] create failed: cwd is required");
		const id = params.conversationId ?? (0, node_crypto.randomUUID)();
		const expert = params.expert;
		const expertId = expert?.id ?? params.expertId;
		const now = Date.now();
		const buddyAppSnapshot = params.buddyAppSnapshot ? require_conversations.normalizeBuddyAppSnapshot(params.buddyAppSnapshot) : void 0;
		const buddySessionBinding = params.buddySessionBinding ? require_conversations.normalizeBuddySessionBinding(params.buddySessionBinding) : void 0;
		if (Boolean(buddyAppSnapshot) !== Boolean(buddySessionBinding)) throw new Error("[LocalConversationsImpl] Buddy snapshot and binding must be created together");
		if (buddyAppSnapshot && buddySessionBinding && buddyAppSnapshot.snapshotId !== buddySessionBinding.snapshotId) throw new Error("[LocalConversationsImpl] Buddy snapshot and binding must reference the same snapshot");
		const conversationTags = params.tags && Object.keys(params.tags).length > 0 ? params.tags : void 0;
		const sessionSettingsPayload = {
			...params.sessionSettings ?? {},
			...params.automation ? { automation: params.automation } : {},
			...conversationTags ? { [CONVERSATION_TAGS_SESSION_KEY]: conversationTags } : {}
		};
		const sessionSettingsJson = Object.keys(sessionSettingsPayload).length > 0 ? JSON.stringify(sessionSettingsPayload) : null;
		this.sqlite.transaction(() => {
			if (buddyAppSnapshot) this.insertBuddyAppSnapshotImmutable(buddyAppSnapshot);
			this.sqlite.prepare(`
                INSERT INTO sessions
                    (id, cwd, user_id, title, custom_title, status, created_at, updated_at, last_activity_at,
                     is_playground, source_mode, mode, model, expert_id, expert_locale, expert_marketplace,
                     expert_runtime_identity, permission_mode, use_sandbox_cli, project_id, addon_selection,
                     session_settings, is_background_automation, plugin_context_json, buddy_snapshot_id,
                     buddy_binding_json)
                VALUES (?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(id, normalizeCwdForStorage(params.cwd), userId, params.title ?? null, null, now, now, now, params.isPlayground ? 1 : 0, params.welcomeMode ?? params.mode ?? null, params.mode ?? null, params.model ?? null, expertId ?? null, expert?.locale ?? params.locale ?? null, expert?.marketplace ?? null, expert?.runtimeIdentity ?? (expertId ? expertId : null), params.permissionMode ?? null, params.useSandboxCLI === void 0 ? null : params.useSandboxCLI ? 1 : 0, params.projectId ?? null, params.addonSelection ? JSON.stringify(params.addonSelection) : null, sessionSettingsJson, params.isBackgroundAutomation ? 1 : null, null, buddyAppSnapshot?.snapshotId ?? null, buddySessionBinding ? require_conversations.serializeBuddySessionBinding(buddySessionBinding) : null);
		})();
		this.writeQuickAskSidecar(id, params);
		return id;
	}
	/**
	* 写划词临时会话的 sidecar 标记，**best-effort**。
	*
	* 失败一律吞掉：标记只服务于「DB 自愈重建时别把临时会话捞回列表」这个兜底场景，
	* 为它让建会话失败是本末倒置（用户点划词问答直接报错）。丢了标记的后果仅是
	* 未来某次 DB 重建会多出几条临时会话，可接受。
	*
	* 同步 IO 是刻意的：`insertConversation` 的调用方拿到 id 后会立即 spawn CLI 并
	* 开始写 jsonl，异步写有可能让 rebuild 在极窄窗口里看到「jsonl 在、标记还没落」。
	* 单个空文件的 `writeFileSync` 在百微秒级，不值得为它引入时序不确定性。
	*/
	writeQuickAskSidecar(conversationId, params) {
		if (!require_quick_ask_tags.hasQuickAskConversationTag(params.tags) || !params.cwd) return;
		try {
			const dir = node_path.join(this.context.homeDir, "projects", compressWorkspacePathName(params.cwd));
			(0, node_fs.mkdirSync)(dir, { recursive: true });
			(0, node_fs.writeFileSync)(node_path.join(dir, require_quick_ask_tags.quickAskSidecarFileName(conversationId)), "");
		} catch (error) {
			this.context.logger?.warn?.("[LocalConversations] failed to write quick-ask sidecar", {
				conversationId,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	async patchConversation(conversationId, params) {
		const existing = this.getVisibleRow(conversationId);
		if (!existing) throw new Error(`[LocalConversationsImpl] update failed: session not found: ${conversationId}`);
		const sets = ["updated_at = ?"];
		const values = [Date.now()];
		if (params.title !== void 0) {
			sets.push("title = ?");
			values.push(params.title);
			if (params.isUserDefinedTitle === 1) {
				sets.push("custom_title = ?");
				values.push(params.title);
			}
		}
		if (params.status !== void 0) {
			sets.push("status = ?");
			values.push(params.status);
		}
		if (params.mode !== void 0) {
			sets.push("mode = ?");
			values.push(params.mode || null);
		}
		if (params.expertId !== void 0) {
			sets.push("expert_id = ?");
			values.push(params.expertId || null);
			if (params.expertId) {
				sets.push("mode = ?");
				values.push("craft");
			} else {
				sets.push("expert_locale = ?", "expert_marketplace = ?", "expert_runtime_identity = ?");
				values.push(null, null, null);
			}
		}
		if (params.expertMarketplace !== void 0) {
			sets.push("expert_marketplace = ?");
			values.push(params.expertMarketplace || null);
		}
		if (params.expertRuntimeIdentity !== void 0) {
			sets.push("expert_runtime_identity = ?");
			values.push(params.expertRuntimeIdentity || null);
		}
		if (params.locale !== void 0) {
			sets.push("expert_locale = ?");
			values.push(params.locale || null);
		}
		if (params.cwd !== void 0) {
			sets.push("cwd = ?");
			values.push(normalizeCwdForStorage(params.cwd));
		}
		if (params.isPlayground !== void 0) {
			sets.push("is_playground = ?");
			values.push(params.isPlayground ? 1 : 0);
		}
		if (params.permissionMode !== void 0) {
			sets.push("permission_mode = ?");
			values.push(params.permissionMode || null);
		}
		if (params.useSandboxCLI !== void 0) {
			sets.push("use_sandbox_cli = ?");
			values.push(params.useSandboxCLI ? 1 : 0);
		}
		if (params.model !== void 0) {
			sets.push("model = ?");
			values.push(params.model || null);
		}
		if (params.thoughtLevel !== void 0) {
			sets.push("thought_level = ?");
			values.push(params.thoughtLevel || null);
		}
		if (params.contextWindow !== void 0) {
			sets.push("context_window = ?");
			values.push(params.contextWindow);
		}
		if (params.addonSelection !== void 0) {
			sets.push("addon_selection = ?");
			values.push(JSON.stringify(params.addonSelection));
		}
		values.push(existing.id);
		this.sqlite.prepare(`UPDATE sessions SET ${sets.join(", ")} WHERE id = ?`).run(...values);
		if (params.title !== void 0) {
			this.emitConversationChanged("updated", { id: existing.id });
			this.onLocalCacheUpdated?.([existing.id]);
		}
	}
	/**
	* 按 id 回查可展示的本地会话完整 ConversationInfo(装配层 onLocalCacheUpdated 桥接用)。
	* 复用 getVisibleRow(user 隔离 + 软删过滤)+ toConversationInfo(叠加 live 态覆盖),口径与主
	* 列表一致;查无(未落盘/已删)的 id 自动省略。与 cloud 的 getLocalInfosByIds 同名同形。
	*/
	getLocalInfosByIds(ids) {
		const infos = [];
		for (const id of ids) {
			const row = this.getVisibleRow(id);
			if (row) infos.push(this.toConversationInfo(row));
		}
		return infos;
	}
	/**
	* 单调推进 sessions.last_activity_at，**不触碰 updated_at**（活动排序与内容更新解耦）。
	* candidate 是已计算好的源时间（prompt accept / LLM 终态源时间，ms）；用标量 `MAX(a, b)`
	* 保证只前进不回退，避免迟到旧快照 / 重复终态让侧栏排序时间倒退。
	* last_activity_at 可能为 NULL（历史行），先 COALESCE 到 0 再取大值。
	*/
	async advanceActivity(conversationId, candidate) {
		if (!Number.isFinite(candidate)) return;
		const existing = this.getVisibleRow(conversationId);
		if (!existing) throw new Error(`[LocalConversationsImpl] advanceActivity failed: session not found: ${conversationId}`);
		this.sqlite.prepare("UPDATE sessions SET last_activity_at = MAX(COALESCE(last_activity_at, 0), ?) WHERE id = ?").run(candidate, existing.id);
	}
	async removeConversation(conversationId) {
		if (this.deleteSessionHost) {
			if (await this.deleteSessionHost(conversationId) === "cancelled") return "cancelled";
			this.forgetLive(conversationId);
			this.ensureLocalRowSoftDeleted(conversationId);
			return;
		}
		this.forgetLive(conversationId);
		try {
			const row = this.getVisibleRow(conversationId);
			if (!row) throw new Error(`[LocalConversationsImpl] delete failed: session not found: ${conversationId}`);
			const now = Date.now();
			this.sqlite.prepare("UPDATE sessions SET deleted_at = ?, updated_at = ?, unread = 0 WHERE id = ?").run(now, now, row.id);
		} finally {
			this.forgetLive(conversationId);
		}
	}
	/**
	* 幂等软删单条 local 会话行并**以 DB 为准校验**（raw SQL · 权威落库）。
	*
	* WHERE 带 `transport='local'` + user 守卫 + `deleted_at IS NULL`：只软删本人活跃 local 行，
	* 绝不误伤 cloud / 他人行，且已软删行不再命中（重复删除幂等）。
	*
	* 校验语义（治 analyze.md #4「删除假成功 + 任务复活」根因）：软删后该 id **不应再作为活跃
	* local 行可见**——
	*  - daemon 已软删 → 本次 UPDATE 0 行（幂等），`getVisibleRow` 空，通过；
	*  - daemon 未落库 → 本次 UPDATE 补上，`getVisibleRow` 空，通过（core 兜底成功）；
	*  - 会话从未持久化 → 0 行，`getVisibleRow` 本就空，通过（不阻断）；
	*  - 软删后仍可见（并发写回等真异常）→ 抛错，让 `delete()` 不 emit 'deleted'、UI 不误报成功。
	*/
	ensureLocalRowSoftDeleted(conversationId) {
		const uid = this.currentUserId();
		if (!uid) return;
		const now = Date.now();
		this.sqlite.prepare(`
                UPDATE sessions SET deleted_at = ?, updated_at = ?
                WHERE id = ? AND transport = 'local' AND deleted_at IS NULL
                  AND (user_id = ? OR user_id = '')
            `).run(now, now, conversationId, uid);
		if (this.getVisibleRow(conversationId)) throw new Error(`[LocalConversationsImpl] delete failed: session still active after soft-delete: ${conversationId}`);
	}
	async setArchived(conversationId, archived) {
		await this.patchConversation(conversationId, { status: archived ? "archived" : "active" });
		if (archived) await this.setUnread(conversationId, false);
	}
	/** Persist one local task's unread flag without changing activity or metadata timestamps. */
	async setUnread(conversationId, unread) {
		await this.ensureUnreadMigrated();
		const uid = this.currentUserId();
		if (!uid) throw new Error("[LocalConversationsImpl] unread update requires an authenticated user");
		if (this.sqlite.prepare(`
            UPDATE sessions
            SET unread = ?
            WHERE id = ?
              AND transport = 'local'
              AND deleted_at IS NULL
              AND (user_id = ? OR user_id = '')
        `).run(unread ? 1 : 0, conversationId, uid).changes === 0) throw new Error(`[LocalConversationsImpl] unread update failed: session not found: ${conversationId}`);
		const live = this.liveById.get(conversationId);
		if (live) live.info.unread = unread;
	}
	/** Local: cwd 为空时用 generateCwd 兜底。 */
	async prepareCreateParams(params) {
		if (!params.cwd && params.kind === "assistant" && this.resolveAssistantCwd) return {
			...params,
			cwd: this.resolveAssistantCwd()
		};
		if (!params.cwd && this.generateCwd) {
			const cwd = (await this.generateCwd()).path;
			return require_conversations.isQuickInteractionMode(params.mode) ? {
				...params,
				cwd,
				isPlayground: true
			} : {
				...params,
				cwd
			};
		}
		return params;
	}
	/** local 连接只需要 sessionId + cwd。 */
	async getConnectionInfo(conversationId) {
		const row = this.getVisibleRow(conversationId);
		if (!row) throw new Error(`[LocalConversationsImpl] connection info not found: ${conversationId}`);
		return {
			sessionId: row.id,
			cwd: row.cwd
		};
	}
	/** 创建本地 ACP 通道；注入 acquireLocalHttpRuntime 时走 HTTP/预热，否则走 stdio。 */
	createConnection(detail) {
		const workerCommand = this.resolveWorkerCommand?.();
		const hasConversationLease = this.pluginLeasesByConversation.has(detail.id);
		let pluginLease = this.pluginLeasesByConversation.get(detail.id) ?? this.plugins?.acquire();
		if (!hasConversationLease && pluginLease?.pluginIds.length === 0) {
			pluginLease.release();
			pluginLease = void 0;
		}
		const connectionOwnedLease = hasConversationLease ? void 0 : pluginLease;
		const pluginHooks = pluginLease && pluginLease.pluginIds.length > 0 ? pluginLease.hooks : void 0;
		const resolveLaunchSpec = pluginHooks ? (ctx) => resolveConversationRuntimeLaunchSpec(ctx, pluginHooks, { logger: this.context.logger }) : this.resolveLaunchSpec;
		const createConversationAdmission = pluginHooks?.createConversationAdmission ?? this.createConversationAdmission;
		const prepareConversationPrompt = pluginHooks?.prepareConversationPrompt ?? this.prepareConversationPrompt;
		const getConversationRuntimeRevision = pluginHooks?.getConversationRuntimeRevision ?? this.getConversationRuntimeRevision;
		const checkWorkspaceAccess = pluginHooks?.checkWorkspaceAccess ?? this.checkWorkspaceAccess;
		const acquireLocalHttpRuntime = pluginHooks?.acquireLocalHttpRuntime ?? this.acquireLocalHttpRuntime;
		const releaseLocalHttpRuntime = pluginHooks?.releaseLocalHttpRuntime ?? this.releaseLocalHttpRuntime;
		const runtimeContext = {
			conversationId: detail.id,
			cwd: detail.cwd ?? process.cwd(),
			projectId: detail.projectId,
			selection: detail.addonSelection,
			sessionSettings: detail.sessionSettings
		};
		const sharedInit = {
			id: detail.id,
			sessionId: detail.id,
			cwd: runtimeContext.cwd,
			...createConversationAdmission ? { conversationAdmission: createConversationAdmission(runtimeContext) } : {},
			...prepareConversationPrompt ? { prepareConversationPrompt: async (ctx) => prepareConversationPrompt({
				...runtimeContext,
				...ctx
			}) } : {},
			...getConversationRuntimeRevision ? { getConversationRuntimeRevision } : {},
			...checkWorkspaceAccess ? { checkWorkspaceAccess: (ctx) => checkWorkspaceAccess({
				...runtimeContext,
				...ctx
			}) } : {},
			...resolveLaunchSpec ? { resolveLaunchSpec: (ctx) => resolveLaunchSpec({
				...runtimeContext,
				selection: this.resolveLatestRuntimeSelection(detail.id) ?? runtimeContext.selection,
				...ctx
			}) } : {},
			logSink: (event, ctx, level) => this.diagnosticLog.conversation(detail.id, event, level === "warn" ? {
				...ctx ?? {},
				level
			} : ctx)
		};
		if (acquireLocalHttpRuntime) return releasePluginLeaseOnDisconnect(new LocalHttpConnection({
			...sharedInit,
			acquireLocalHttpRuntime,
			...releaseLocalHttpRuntime ? { releaseLocalHttpRuntime } : {}
		}), connectionOwnedLease);
		return releasePluginLeaseOnDisconnect(new LocalConnection({
			...sharedInit,
			...workerCommand ? { spawnOptions: workerCommand } : {}
		}), connectionOwnedLease);
	}
	/**
	* 用最新 sessions 行的 mode / permission_mode 覆盖 addonSelection 里的同名字段，消除创建时写入
	* addon_selection 列的死值。供 resolveLaunchSpec 闭包使用。
	*
	* 切 Scene Mode 只更新 sessions.mode / permission_mode 列，addon_selection 列不变。而下游两处都让
	* addonSelection 的值优先，若不同步会导致切换不生效：
	*   - interactionMode 优先于 desiredConfig.mode → work-mode 插件选旧 persona；
	*   - permissionMode 优先于 stored.permissionMode → plan 派生不出 plan，plan reminder 不注入。
	* 非 Plan 的 permission_mode 列在 setMode 时清空，这里覆盖为 undefined，交由 server
	* 按 mode 派生；Plan 则保留进入前偏好，供 server 派生 permissionModeBeforePlan。
	*/
	resolveLatestRuntimeSelection(conversationId) {
		const row = this.getVisibleRow(conversationId);
		if (!row) return;
		const detail = rowToConversationDetail(row);
		const selection = detail.addonSelection;
		const latestMode = detail.mode;
		const latestPermissionMode = detail.permissionMode;
		const next = { ...selection ?? { version: 1 } };
		if (latestMode) next.interactionMode = latestMode;
		if (latestPermissionMode) next.permissionMode = latestPermissionMode;
		else delete next.permissionMode;
		return next;
	}
	rememberOrphanPendingTerminated(conversationId, previous, next) {
		if (next !== "terminated") return;
		const prev = (previous ?? "").toLowerCase();
		if (!ORPHAN_PENDING_SQLITE_STATUSES.includes(previous ?? "") && prev !== "working" && prev !== "planning") return;
		this.orphanPendingTerminatedPersisted.add(conversationId);
	}
	/**
	* 无 live 的 sqlite working/planning：peek JSONL 末条收敛（#123755）。
	* 末条 completed/cancelled → completed；半截/空/读失败 → terminated。
	* 活着的会话在 liveById，绝不改写。
	*/
	async healNonLiveStaleWorkingRows(rows) {
		const historySource = this.listHistorySource;
		if (!historySource) return;
		const candidates = rows.filter((row) => {
			const status = (row.status ?? "").toLowerCase();
			return (status === "working" || status === "planning") && !this.isLive(row.id) && !this.staleWorkingHealed.has(row.id);
		});
		if (candidates.length === 0) return;
		await Promise.all(candidates.map(async (row) => {
			this.staleWorkingHealed.add(row.id);
			let nextStatus = "terminated";
			try {
				const latest = (await historySource.loadPage({
					conversationId: row.id,
					cwd: row.cwd,
					byteLength: require_conversations.REQUEST_HISTORY_PAGE_BYTE_LENGTH
				})).items.at(-1);
				if (latest?.state === "completed" || latest?.state === "cancelled") nextStatus = "completed";
			} catch {
				nextStatus = "terminated";
			}
			const previous = row.status;
			this.sqlite.prepare(`
                UPDATE sessions
                SET status = ?, updated_at = ?
                WHERE id = ?
                  AND transport = 'local'
                  AND LOWER(status) IN ('working', 'planning')
            `).run(nextStatus, Date.now(), row.id);
			row.status = nextStatus;
			this.rememberOrphanPendingTerminated(row.id, previous, nextStatus);
			this.emitLocalStatusChanged(row.id, nextStatus);
		}));
	}
	persistOrphanPendingTerminated(conversationId) {
		if (this.orphanPendingTerminatedPersisted.has(conversationId)) return;
		this.orphanPendingTerminatedPersisted.add(conversationId);
		this.orphanToolRepairRequired.add(conversationId);
		this.sqlite.prepare(`
            UPDATE sessions
            SET status = 'terminated', updated_at = ?
            WHERE id = ?
              AND transport = 'local'
              AND status IN (${ORPHAN_PENDING_SQLITE_STATUSES.map(() => "?").join(", ")})
        `).run(Date.now(), conversationId, ...ORPHAN_PENDING_SQLITE_STATUSES);
	}
	ensureOrphanToolRepair(detail, hydratedPage) {
		if (!this.orphanToolRepairRequired.has(detail.id)) return Promise.resolve();
		if (hydratedPage && hydratedPage.pendingToolCalls === void 0) return Promise.resolve();
		const existing = this.orphanToolRepairTasks.get(detail.id);
		if (existing) return existing;
		const task = this.runOrphanToolRepair(detail, hydratedPage).finally(() => {
			if (this.orphanToolRepairTasks.get(detail.id) === task) this.orphanToolRepairTasks.delete(detail.id);
		});
		this.orphanToolRepairTasks.set(detail.id, task);
		return task;
	}
	/** 历史打开不得因恢复写失败变成空白；resume 会复用严格任务并在失败时阻断出站。 */
	async repairOrphanToolsAfterHydration(detail, hydratedPage) {
		try {
			await this.ensureOrphanToolRepair(detail, hydratedPage);
		} catch (error) {
			this.context.logger?.warn?.("[LocalConversations] orphan tool repair failed", {
				conversationId: detail.id,
				errorKind: error instanceof Error ? error.name : typeof error
			});
		}
	}
	async runOrphanToolRepair(detail, hydratedPage) {
		const source = this.listHistorySource;
		const cwd = detail.cwd;
		if (!source || !cwd) throw new Error("[LocalConversations] orphan tool repair source is unavailable");
		const calls = (hydratedPage ?? await source.loadPage({
			conversationId: detail.id,
			cwd,
			byteLength: 5242880
		})).pendingToolCalls;
		if (calls === void 0) throw new Error("[LocalConversations] latest history page cannot identify pending tools");
		if (calls.length === 0) {
			this.orphanToolRepairRequired.delete(detail.id);
			return;
		}
		let appended = 0;
		if (supportsOrphanToolRepair(source)) appended = await source.persistOrphanPendingCancelledTools({
			conversationId: detail.id,
			cwd,
			calls
		});
		else if (this.context.homeDir) appended = await persistOrphanPendingCancelledTools(resolveLocalSessionJsonlPath(this.context.homeDir, cwd, detail.id), calls);
		if (appended === calls.length) {
			this.orphanToolRepairRequired.delete(detail.id);
			return;
		}
		throw new Error(`[LocalConversations] orphan tool repair incomplete: expected=${calls.length}, appended=${appended}`);
	}
	toConversationInfo(row) {
		const summary = rowToConversationSummary(row);
		const baseInfo = require_conversations.summaryToConversationInfo(this.isAssistantCwd?.(row.cwd) ? {
			...summary,
			kind: "assistant"
		} : summary);
		const live = this.liveById.get(baseInfo.id);
		const liveInfo = live && !live.isDisposed ? live.info : void 0;
		const info = liveInfo ? {
			...baseInfo,
			title: liveInfo.title || baseInfo.title,
			isUserDefinedTitle: liveInfo.isUserDefinedTitle
		} : baseInfo;
		const liveState = liveInfo?.state;
		const hasLiveHitl = live !== void 0 && !live.isDisposed && (live.hasActiveInteraction?.() ?? live.getPendingInfo() !== void 0);
		if (info.state === "pending" && !hasLiveHitl && liveState !== "working" && liveState !== "planning") {
			this.persistOrphanPendingTerminated(info.id);
			return {
				...info,
				hasRunningBackgroundTasks: liveInfo?.hasRunningBackgroundTasks === true,
				state: "terminated"
			};
		}
		if (!liveState) return info;
		const projectedInfo = {
			...info,
			hasRunningBackgroundTasks: liveInfo.hasRunningBackgroundTasks === true,
			hasActiveChildAgents: liveInfo.hasActiveChildAgents === true
		};
		if (liveState === "idle" && (liveInfo.hasActiveChildAgents === true || liveInfo.hasRunningBackgroundTasks === true)) return {
			...projectedInfo,
			state: "working"
		};
		if (liveState === "idle" && STALE_TERMINAL_LIST_STATES.has(info.state)) {
			if (info.state === "terminated" && this.orphanPendingTerminatedPersisted.has(info.id)) return {
				...projectedInfo,
				state: "terminated"
			};
			if (!this.staleTerminalOverlayLogged.has(info.id)) {
				this.staleTerminalOverlayLogged.add(info.id);
				this.context.logger?.warn?.("[LocalConversations] stale terminal DB status overlaid by live idle (#98925)", {
					conversationId: info.id,
					dbState: info.state
				});
			}
			return {
				...projectedInfo,
				state: "idle"
			};
		}
		if (!LIVE_LIST_OVERLAY_STATES.has(liveState) || liveState === projectedInfo.state) return projectedInfo;
		if (liveState === "pending" && !hasLiveHitl && (projectedInfo.state === "idle" || projectedInfo.state === "terminated")) return projectedInfo;
		return {
			...projectedInfo,
			state: liveState
		};
	}
	insertBuddyAppSnapshotImmutable(snapshot) {
		this.sqlite.prepare(`
            INSERT OR IGNORE INTO buddy_snapshots
                (snapshot_id, application_id, template_id, schema_version, template_version,
                 snapshot_format_version, config_json, config_digest, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(snapshot.snapshotId, snapshot.identity.applicationId, snapshot.identity.templateId, snapshot.identity.schemaVersion, snapshot.identity.templateVersion, snapshot.version, JSON.stringify(snapshot.config), snapshot.configDigest, snapshot.createdAt);
		const stored = this.readBuddyAppSnapshot(snapshot.snapshotId, false);
		if (!stored || stored.configDigest !== snapshot.configDigest) throw new Error(`[LocalConversationsImpl] Buddy snapshot digest conflict: ${snapshot.snapshotId}`);
	}
	loadBuddyConversationSnapshot(row) {
		if (!row.buddySnapshotId && !row.buddyBindingJson) return;
		try {
			const binding = require_conversations.parseBuddySessionBindingJson(row.buddyBindingJson);
			if (!row.buddySnapshotId || !binding || binding.snapshotId !== row.buddySnapshotId) throw new Error("Buddy session binding is missing or does not match its reference");
			const app = this.readBuddyAppSnapshot(row.buddySnapshotId);
			if (!app) throw new Error(`Buddy application snapshot not found: ${row.buddySnapshotId}`);
			return deepFreeze({
				app,
				binding
			});
		} catch (error) {
			this.context.logger?.warn?.("[LocalConversationsImpl] ignored invalid Buddy session snapshot", {
				sessionId: row.id,
				error: error instanceof Error ? error.message : String(error)
			});
			return;
		}
	}
	readBuddyAppSnapshot(snapshotId, useCache = true) {
		const cached = useCache ? this.buddySnapshotCache.get(snapshotId) : void 0;
		if (cached) {
			this.buddySnapshotCache.delete(snapshotId);
			this.buddySnapshotCache.set(snapshotId, cached);
			return cached;
		}
		const row = this.sqlite.prepare(`
            SELECT
                snapshot_id AS snapshotId,
                application_id AS applicationId,
                template_id AS templateId,
                schema_version AS schemaVersion,
                template_version AS templateVersion,
                snapshot_format_version AS snapshotFormatVersion,
                config_json AS configJson,
                config_digest AS configDigest,
                created_at AS createdAt
            FROM buddy_snapshots
            WHERE snapshot_id = ?
            LIMIT 1
        `).get(snapshotId);
		if (!row) return;
		const snapshot = deepFreeze(require_conversations.normalizeBuddyAppSnapshot({
			version: row.snapshotFormatVersion,
			snapshotId: row.snapshotId,
			configDigest: row.configDigest,
			createdAt: row.createdAt,
			identity: {
				applicationId: row.applicationId,
				templateId: row.templateId,
				schemaVersion: row.schemaVersion,
				templateVersion: row.templateVersion
			},
			config: JSON.parse(String(row.configJson))
		}));
		this.buddySnapshotCache.delete(snapshotId);
		this.buddySnapshotCache.set(snapshotId, snapshot);
		while (this.buddySnapshotCache.size > 32) {
			const oldestKey = this.buddySnapshotCache.keys().next().value;
			if (!oldestKey) break;
			this.buddySnapshotCache.delete(oldestKey);
		}
		return snapshot;
	}
	/** 当前用户 id 惰性读取，保证账号切换后查询立刻生效。 */
	currentUserId() {
		return this.context.accountProvider?.()?.uid?.trim() || void 0;
	}
	/**
	* One-time per-account migration from the legacy user-scoped unread ID set.
	* SQLite is committed before the old key is deleted, so interruption can only
	* cause a harmless idempotent retry.
	*/
	ensureUnreadMigrated() {
		const account = this.context.accountProvider?.();
		const uid = account?.uid?.trim();
		if (!uid) return Promise.resolve();
		const identity = `${uid}\u0000${account?.enterpriseId ?? ""}`;
		const existing = this.unreadMigrationByIdentity.get(identity);
		if (existing) return existing;
		const migration = this.migrateLegacyUnreadState(uid).catch((error) => {
			this.unreadMigrationByIdentity.delete(identity);
			throw error;
		});
		this.unreadMigrationByIdentity.set(identity, migration);
		return migration;
	}
	async migrateLegacyUnreadState(uid) {
		const storage = this.context.storage.user;
		const raw = await storage.get(LEGACY_UNREAD_NAMESPACE, LEGACY_UNREAD_KEY);
		if (raw === void 0) return;
		const ids = Array.isArray(raw) ? [...new Set(raw.filter((id) => typeof id === "string" && id.length > 0))] : [];
		const update = this.sqlite.prepare(`
            UPDATE sessions
            SET unread = 1
            WHERE id = ?
              AND ((transport = 'local' AND deleted_at IS NULL)
                OR (transport = 'cloud' AND deleted_at = -1))
              AND (user_id = ? OR user_id = '')
        `);
		this.sqlite.transaction(() => {
			for (const id of ids) update.run(id, uid);
		})();
		try {
			await storage.delete(LEGACY_UNREAD_NAMESPACE, LEGACY_UNREAD_KEY);
			await storage.flush?.call(storage);
		} catch (error) {
			await storage.set(LEGACY_UNREAD_NAMESPACE, LEGACY_UNREAD_KEY, raw).catch(() => void 0);
			throw error;
		}
	}
	/**
	* 本地任务只允许当前用户读取；迁移遗留空 userId 也归当前用户可见。
	* 直读 sessions 表并内联 `WHERE transport = 'local'`（#105712 端云统一单表后 cloud/local 同表，
	* 用 transport 隔离本地行、天然排除 cloud 行；不建视图）。**一次取全量**（不分页）：本地空间分组与
	* 计数需完整集合，见 fetchList 注释 / 01 §7.5 / #82590。
	*/
	visibleRows(state) {
		const uid = this.currentUserId();
		if (!uid) return [];
		const statuses = state ? this.statusesForConversationState(state) : [];
		const statusClause = statuses.length > 0 ? `AND status IN (${statuses.map(() => "?").join(", ")})` : "";
		return this.sqlite.prepare(`
            SELECT ${require_conversations.SESSION_LIST_SELECT_COLUMNS}
            FROM sessions
            WHERE transport = 'local'
              AND deleted_at IS NULL
              AND (user_id = ? OR user_id = '')
              ${statusClause}
            ORDER BY COALESCE(last_activity_at, created_at) DESC, id ASC
        `).all(uid, ...statuses);
	}
	getVisibleRow(id) {
		const uid = this.currentUserId();
		if (!uid) return;
		return this.sqlite.prepare(`
            SELECT ${require_conversations.SESSION_DETAIL_SELECT_COLUMNS}
            FROM sessions
            WHERE id = ?
              AND transport = 'local'
              AND deleted_at IS NULL
              AND (user_id = ? OR user_id = '')
            LIMIT 1
        `).get(id, uid);
	}
	statusesForConversationState(state) {
		switch (state) {
			case "planning": return ["planning"];
			case "working": return ["working", "streaming"];
			case "pending": return [
				"pending",
				"waiting_permission",
				"waiting_question",
				"paused"
			];
			case "error": return ["error", "interrupted"];
			case "failed": return ["failed"];
			case "terminated": return ["terminated"];
			case "idle": return [
				"idle",
				"active",
				"completed",
				"archived"
			];
			default: return [];
		}
	}
	applyListParams(rows, params) {
		require_conversations.assertTaskWorkspaceFilter(params);
		let result = rows;
		result = result.filter((row) => !require_quick_ask_tags.hasQuickAskConversationTag(storedConversationTags(row)));
		if (params?.conversationOrigin) {
			if (!(Array.isArray(params.conversationOrigin) ? params.conversationOrigin : [params.conversationOrigin]).includes("local")) return [];
		}
		if (params?.space || params?.kind) result = result.filter((row) => {
			const info = this.toConversationInfo(row);
			return (!params.space || info.space.type === params.space || params.space === "local" && info.space.type === "assistant") && (!params.kind || info.kind === params.kind);
		});
		const projectIds = params?.projectIds;
		if (projectIds) result = result.filter((row) => !row.projectId || projectIds.includes(row.projectId));
		if (params?.projectScope === "shared") return [];
		if (params?.projectTaskView === "active") result = result.filter((row) => row.status !== "archived");
		else if (params?.projectTaskView === "archived") result = result.filter((row) => row.status === "archived");
		if (params?.scope === "shared") return [];
		if (params?.projectId) result = result.filter((row) => row.projectId === params.projectId);
		if (params?.view) result = params.view === "archived" ? result.filter((row) => row.status === "archived") : result.filter((row) => row.status !== "archived");
		if (params?.workspacePath || params?.excludeWorkspace === true) result = result.filter((row) => require_conversations.matchesTaskWorkspaceFilter(this.toConversationInfo(row), params));
		if (params?.title) {
			const keyword = params.title.toLowerCase();
			result = result.filter((row) => (row.customTitle || row.title || row.id).toLowerCase().includes(keyword));
		}
		if (params?.dayRange) {
			const cutoff = Date.now() - params.dayRange * 24 * 60 * 60 * 1e3;
			result = result.filter((row) => rowLastActivity(row) >= cutoff);
		}
		if (params?.filters?.length) result = params.filters.reduce((current, filter) => current.filter((row) => this.matchesFilter(row, filter)), result);
		return [...result].sort((a, b) => this.compareRows(a, b, params?.sort));
	}
	matchesFilter(row, filter) {
		const values = filter.value.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
		if (values.length === 0) return true;
		return values.includes(String(this.filterFieldValue(row, filter.field)).toLowerCase());
	}
	filterFieldValue(row, field) {
		switch (field) {
			case "mode": return rowMode(row);
			case "status": return row.status;
			case "projectId": return row.projectId ?? "";
			case "model": return row.model ?? "";
			case "expertId": return row.expertId ?? "";
			case "isPlayground": return row.isPlayground ? "true" : "false";
			case "isBackgroundAutomation": return row.isBackgroundAutomation ? "true" : "false";
			default: return row[field] ?? "";
		}
	}
	compareRows(a, b, sort) {
		if (!sort) return rowLastActivity(b) - rowLastActivity(a);
		const av = this.comparableValue(this.filterFieldValue(a, sort.orderBy));
		const bv = this.comparableValue(this.filterFieldValue(b, sort.orderBy));
		const cmp = av === bv ? 0 : av < bv ? -1 : 1;
		return sort.order === "desc" ? -cmp : cmp;
	}
	comparableValue(value) {
		return typeof value === "number" ? value : String(value ?? "");
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/cloud/sync-scheduler.ts
var TICK_INTERVAL_MS = 3e5;
var WINDOW_MS = 3e5;
var PAGE_SIZE = 20;
var SEED_SIZE = 20;
var HARD_MAX_ITEMS = 500;
var FULL_PAGE_SIZE = 100;
var FULL_MAX_PAGES = 100;
var FULL_MAX_ITEMS = 1e4;
var HTTP_TIMEOUT_MS = 2e4;
var RECONCILE_EVERY_N = 10;
var RECONCILE_LIMIT = 20;
var RECONCILE_STALE_MS = 18e5;
var EVENT_COALESCE_MS = 400;
var EVENT_DEDUPE_CAPACITY = 1e3;
/**
* 合成多个 AbortSignal:任一 abort → 结果 signal abort。用于把 stop() 的 signal 与单次 GET 的 20s
* 超时 signal 合并成一个下发给 port。
*/
function anySignal(signals) {
	const controller = new AbortController();
	const onAbort = () => controller.abort();
	for (const signal of signals) {
		if (signal.aborted) {
			controller.abort();
			break;
		}
		signal.addEventListener("abort", onAbort, { once: true });
	}
	return controller.signal;
}
var SyncScheduler = class {
	constructor(options) {
		this.pullCount = 0;
		this.stopped = false;
		this.pendingEventPull = false;
		this.seenEventIds = /* @__PURE__ */ new Set();
		this.port = options.port;
		this.logger = options.logger;
		this.eventDedupeCapacity = options.eventDedupeCapacity && options.eventDedupeCapacity > 0 ? options.eventDedupeCapacity : EVENT_DEDUPE_CAPACITY;
	}
	/**
	* 启动:boot=true 冷启立即**全量兑现**(#105712 · A-3:启动/切账号 → 立即全量拉一次 + 删除对账,
	* 替代原种子);否则仅排定时器。boot 全量分页固定 size=100,不受 opts.size 影响(仅 windowStart 透传无意义,忽略)。
	*/
	async start(opts) {
		this.logger?.info("sync_scheduler_start", {
			boot: opts?.boot ?? false,
			wasStopped: this.stopped
		});
		this.stopped = false;
		if (opts?.boot) await this.triggerNow("boot", { mode: "full" });
		else this.scheduleNext();
	}
	/** 冷启对账兜底(T4a · 常态不跑):首屏种子失败 / 长连接重连时补一次一次性拉取。 */
	catchUp(size = SEED_SIZE) {
		if (this.stopped) return Promise.resolve();
		return this.triggerNow("catchup", { size });
	}
	/** 单飞触发:已有 in-flight 直接复用返回(不排队)。前序 settled 后排下一次 + 按周期数追加附加对账。 */
	triggerNow(reason, override) {
		if (this.inFlight) {
			if (reason === "event") this.pendingEventPull = true;
			return this.inFlight;
		}
		const controller = new AbortController();
		this.abortController = controller;
		const startedAt = Date.now();
		this.inFlight = this.pullOnce(override, controller.signal).then(() => {
			this.logger?.info("sync_pull_done", {
				reason,
				ms: Date.now() - startedAt
			});
		}).catch((err) => {
			this.logger?.warn("sync_pull_failed", reason, String(err));
		}).finally(() => {
			this.inFlight = void 0;
			this.abortController = void 0;
			this.pullCount += 1;
			if (!this.stopped && this.pullCount % RECONCILE_EVERY_N === 0 && !this.reconcileAbortController) this.reconcile().catch(() => void 0);
			if (this.pendingEventPull && !this.stopped) {
				this.pendingEventPull = false;
				this.triggerNow("event").catch(() => void 0);
			} else if (!this.stopped) this.scheduleNext();
		});
		return this.inFlight;
	}
	/**
	* 事件驱动主感知(#105712 批次 A):收到云会话变更信号 → eventId FIFO 去重 → deleted 立即软删 →
	* 防抖合并触发一次边界拉取。与既有单飞/兜底轮询协作(在途补一拍见 {@link triggerNow})。
	*/
	notifyChange(signal) {
		if (this.stopped) return;
		if (signal.eventId) {
			if (this.seenEventIds.has(signal.eventId)) return;
			this.rememberEventId(signal.eventId);
		}
		this.logger?.info("sync_change_event", {
			kind: signal.kind,
			hasConversationId: !!signal.conversationId
		});
		if (signal.kind === "deleted" && signal.conversationId) this.port.softDelete(signal.conversationId);
		this.scheduleDebouncedPull();
	}
	/** eventId FIFO 去重记忆(容量 EVENT_DEDUPE_CAPACITY · 超出逐出最老)· 无 eventId 不入此路径(放行)。 */
	rememberEventId(eventId) {
		this.seenEventIds.add(eventId);
		if (this.seenEventIds.size > this.eventDedupeCapacity) {
			const oldest = this.seenEventIds.values().next().value;
			if (oldest !== void 0) this.seenEventIds.delete(oldest);
		}
	}
	/** 合并 EVENT_COALESCE_MS 内的多条事件为一次拉取(clearTimeout 重排 → triggerNow('event'))。 */
	scheduleDebouncedPull() {
		if (this.debounceTimer !== void 0) clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => {
			this.debounceTimer = void 0;
			this.triggerNow("event").catch(() => void 0);
		}, EVENT_COALESCE_MS);
	}
	/** 单条验尸(T4c):打开会话时触发 · 200 → apply · 410 → softDelete · 其他错误跳过。 */
	async probe(id) {
		if (this.stopped || !id) return;
		const controller = new AbortController();
		await this.probeAndApply(id, controller.signal);
	}
	/** 停止:置 stopped + clearTimeout(兜底轮询 + 事件防抖)+ 中断定时主拉取与附加对账两条在途 GET。 */
	stop() {
		this.stopped = true;
		this.abortController?.abort();
		this.reconcileAbortController?.abort();
		if (this.timer !== void 0) {
			clearTimeout(this.timer);
			this.timer = void 0;
		}
		if (this.debounceTimer !== void 0) {
			clearTimeout(this.debounceTimer);
			this.debounceTimer = void 0;
		}
	}
	scheduleNext() {
		if (this.timer !== void 0) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.logger?.info("sync_tick_fire");
			this.triggerNow("tick", { mode: "full" }).catch(() => void 0);
		}, TICK_INTERVAL_MS);
	}
	/**
	* 一次拉取周期。缺省走**增量窗口**(CF 事件驱动 · 见 {@link pullIncremental});override.mode==='full'
	* 走**全量兑现**(定时 tick / 启动 / 切账号 · 见 {@link pullFull})——全量翻页 + 成功后删除对账。
	*/
	async pullOnce(override, abortSignal) {
		if (override?.mode === "full") {
			await this.pullFull(abortSignal);
			return;
		}
		await this.pullIncremental(override, abortSignal);
	}
	/**
	* 全量兑现(#105712 · A-3/A-4):size=100 翻页,翻到**空页**或**满 100 页**(上限 10000)停;
	* 全程无 windowStart 边界。**翻页成功跑完**后做删除对账——「本轮全量 id 全集 A」vs「缓存活跃
	* 非归档 id 全集 B」差集 `B−A` 逐个软删(归档行天然不在 B,自动跳过 · A-4)。中途失败/超时抛出
	* → triggerNow 的 .catch 吞掉,**不执行对账**(只保留已 upsert,不误删未拉到的 · DR-14.4)。
	*/
	async pullFull(abortSignal) {
		const pullStartedAt = Date.now();
		const pulledIds = /* @__PURE__ */ new Set();
		let page = 1;
		let truncated = false;
		for (;;) {
			const resp = await this.withTimeout((signal) => this.port.pullPage({
				size: FULL_PAGE_SIZE,
				page,
				signal
			}), abortSignal);
			if (resp.items.length === 0) {
				this.logger?.info("sync_full_page", {
					page,
					count: 0,
					empty: true
				});
				break;
			}
			this.port.applyPulledItems(resp.items);
			for (const item of resp.items) if (item.id) pulledIds.add(item.id);
			this.logger?.info("sync_full_page", {
				page,
				count: resp.items.length,
				total: resp.total,
				pulled: pulledIds.size
			});
			if (pulledIds.size >= FULL_MAX_ITEMS || page >= FULL_MAX_PAGES) {
				truncated = true;
				this.logger?.warn("sync_full_hit_cap", String(pulledIds.size), String(page));
				break;
			}
			page += 1;
		}
		if (truncated) return;
		this.reconcileDeletions(pulledIds, pullStartedAt);
	}
	/**
	* 删除对账(#105712 · A-4):缓存活跃非归档 id 全集 B 里「本轮全量结果 A 没有」的 → 软删。
	* B 由 `listActiveIdsForReconcile(pullStartedAt)` 已过滤软删 + 归档 + 本轮开始后被确认的行,
	* 故差集天然跳过归档与「翻页途中被 probe/增量确认」的活跃会话。逐个 softDelete 复用现成落盘
	* 出口(onAfterDelete emit deleted 上屏)。
	*/
	reconcileDeletions(pulledIds, pullStartedAt) {
		const activeIds = this.port.listActiveIdsForReconcile(pullStartedAt);
		let removed = 0;
		for (const id of activeIds) {
			if (this.stopped) break;
			if (!pulledIds.has(id)) {
				this.port.softDelete(id);
				removed += 1;
			}
		}
		this.logger?.info("sync_full_reconcile", {
			active: activeIds.size,
			pulled: pulledIds.size,
			removed
		});
	}
	/**
	* 增量窗口拉取(CF 事件驱动 · A-5 保留):pullStartAt 固化 → windowStart(含 pendingCoverStart 展宽)→
	* while 翻页落盘,直到某页最后一条 `updated_at < windowStart`(完整覆盖)或命中 HARD_MAX(截断记 low-water-mark)。
	*/
	async pullIncremental(override, abortSignal) {
		const defaultStart = Date.now() - WINDOW_MS;
		const windowStart = override?.windowStartOverride ?? Math.min(defaultStart, this.pendingCoverStart ?? defaultStart);
		const size = override?.size ?? PAGE_SIZE;
		let page = 1;
		let pulled = 0;
		for (;;) {
			const resp = await this.withTimeout((signal) => this.port.pullPage({
				size,
				page,
				signal
			}), abortSignal);
			if (resp.items.length === 0) {
				this.logger?.info("sync_pull_page", {
					page,
					count: 0,
					empty: true
				});
				break;
			}
			this.port.applyPulledItems(resp.items);
			pulled += resp.items.length;
			const lastItemUpdatedAt = resp.items[resp.items.length - 1].updatedAt;
			this.logger?.info("sync_pull_page", {
				page,
				count: resp.items.length,
				total: resp.total,
				lastUpdatedAt: lastItemUpdatedAt,
				windowStart,
				willStop: lastItemUpdatedAt < windowStart
			});
			if (lastItemUpdatedAt < windowStart) {
				this.pendingCoverStart = void 0;
				return;
			}
			if (pulled >= HARD_MAX_ITEMS) {
				this.pendingCoverStart = lastItemUpdatedAt;
				this.logger?.warn("sync_pull_hit_hard_max", String(pulled), String(page), String(lastItemUpdatedAt));
				return;
			}
			page += 1;
		}
		this.pendingCoverStart = void 0;
	}
	/** 附加对账(每 RECONCILE_EVERY_N 周期):独立 reconcileAbortController(Q3)· 扫陈旧行逐条验尸。 */
	async reconcile() {
		const controller = new AbortController();
		this.reconcileAbortController = controller;
		try {
			const stale = this.port.listStaleForReconcile(RECONCILE_LIMIT);
			for (const { id } of stale) {
				if (controller.signal.aborted || this.stopped) break;
				if (!id) continue;
				await this.probeAndApply(id, controller.signal);
			}
		} catch (err) {
			this.logger?.warn("sync_reconcile_failed", String(err));
		} finally {
			this.reconcileAbortController = void 0;
		}
	}
	/** 单条验尸 + 应用判定:200 → applyPulledItems · 410 → softDelete · 网络/abort 抛错 → 跳过。 */
	async probeAndApply(id, externalSignal) {
		try {
			const verdict = await this.withTimeout((signal) => this.port.probeConversation(id, signal), externalSignal);
			if (verdict.kind === "ok") this.port.applyPulledItems([verdict.data]);
			else this.port.softDelete(id);
		} catch (err) {
			this.logger?.warn("sync_probe_failed", id, String(err));
		}
	}
	/** 包一层 20s 硬超时:外部 signal(stop)与超时 signal 任一触发都中断在途请求。 */
	async withTimeout(run, externalSignal) {
		const timeoutCtrl = new AbortController();
		const timer = setTimeout(() => timeoutCtrl.abort(), HTTP_TIMEOUT_MS);
		try {
			return await run(anySignal([externalSignal, timeoutCtrl.signal]));
		} finally {
			clearTimeout(timer);
		}
	}
};
var DEFAULT_CLOUD_API_PREFIX = "/console/as/conversations";
/**
* 全量兑现/对账拉取的纯云任务来源白名单(#105712 方案②:与 UI 主列表 listCloudSpace 的
* PURE_CLOUD_TASK_CONVERSATION_ORIGINS 口径对齐)。不含本地上云镜像 legacy_workbuddy_local/
* local_scheduler——镜像行与云端同 id,若混入会让「拉取集」含镜像而缓存活跃集口径不一,
* 且分页去重不稳。此处内联(不跨包 import composite 常量,避免依赖方向耦合),二者需同步维护。
*
* #105712 · 云端自动化任务:加 scheduler(个人自动化) / teams_scheduler(项目自动化),让其落缓存,
* 供 grouped classify 分到「空间」下 cloudAutomation 子桶(按 task_id 聚合)。二者是纯云 origin,
* 无本地上云镜像,不影响镜像去重口径;它们不进 cloud 顶层 folder(listCloudSpace 的纯云白名单不含),
* 只经 grouped 的 this.cloud(fixed transport=cloud · 读缓存全量)进 space.cloudAutomation。
*
* #105712 · 应用发布会话(workbuddy-deploy · 用户 2026-09-14 拍板纳入左侧列表):加 workbuddy-deploy
* 让其落缓存 + 进全量兑现/删除对账链路。它是纯云 origin(恒 transport=cloud · 无本地上云镜像),
* 经 grouped classify 第 1 层归**顶层「云端任务」folder**(与 agents/openapi 并列);
* 同步纳入 listCloudSpace 的 PURE_CLOUD_TASK_CONVERSATION_ORIGINS(计数口径一致)。
*/
var PULL_PURE_CLOUD_ORIGINS = "agents,workbuddy-mp,workbuddy-app,openapi,workbuddy-deploy,scheduler,teams_scheduler";
/** verified_at 由 sync 层标记(impl.upsert 显式不写)· 写 sessions(transport='cloud') · 已软删行(deleted_at != -1)不回填。 */
var STAMP_VERIFIED_SQL = "UPDATE sessions SET verified_at = ? WHERE id = ? AND user_id = ? AND transport = 'cloud' AND deleted_at = -1";
/**
* 落盘**前**查缓存里已存在的活跃 id 集(#105712 阶段 0.5)· 供 applyPulledItems 区分 added/updated。
* enqueueEvent 落盘是 upsert,落盘后再查已分不清"本轮新建"与"本轮更新",故必须在落盘前定位。
* SQLite `all(...params)` 展开 IN 占位符;空 ids 直接返回空集(不发无谓 SQL)。读 sessions(transport='cloud')。
*/
function selectExistingActiveIds(sqlite, uid, ids) {
	if (ids.length === 0) return /* @__PURE__ */ new Set();
	const sql = `SELECT id FROM sessions WHERE user_id = ? AND transport = 'cloud' AND deleted_at = -1 AND id IN (${ids.map(() => "?").join(",")})`;
	const rows = sqlite.prepare(sql).all(uid, ...ids);
	const existing = /* @__PURE__ */ new Set();
	for (const row of rows) {
		const id = row.id;
		if (typeof id === "string" && id) existing.add(id);
	}
	return existing;
}
/** 陈旧行扫描 · verified_at ASC NULLS FIRST 让"从未验尸"的行优先。读 sessions(transport='cloud')。 */
var RECONCILE_SCAN_SQL = `
    SELECT id AS id, verified_at AS verifiedAt
    FROM sessions
    WHERE user_id = ?
      AND transport = 'cloud'
      AND deleted_at = -1
      AND (verified_at IS NULL OR verified_at < ?)
    ORDER BY verified_at ASC NULLS FIRST
    LIMIT ?
`;
/**
* 全量兑现删除对账活跃集(#105712 · A-4):user 级隔离 + 软删过滤(deleted_at = -1) + 归档过滤,与主列表
* 同口径。归档行(status='archived')不在结果内,故差集软删天然跳过归档。读 sessions(transport='cloud')。
*
* FU-1 `verified_at IS NOT NULL`:从未被真实拉取确认过的行(新建种子)不参与删除对账。
* blocker 修复 `verified_at < ?`(= 本轮 pullFull 开始时刻):本轮期间被 probe/增量确认过的行豁免对账。
*/
var RECONCILE_ACTIVE_IDS_SQL = `
    SELECT id FROM sessions
    WHERE user_id = ?
      AND transport = 'cloud'
      AND deleted_at = -1
      AND verified_at IS NOT NULL
      AND verified_at < ?
      AND (status IS NULL OR status != 'archived')
`;
function isRecord$2(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
/** envelope `{ code, data: { conversations, total } }` → 会话原始行数组。 */
function extractConversations(resp) {
	const data = isRecord$2(resp) ? resp.data : void 0;
	const list = isRecord$2(data) ? data.conversations : void 0;
	return Array.isArray(list) ? list.filter(isRecord$2) : [];
}
function extractTotal(resp) {
	const data = isRecord$2(resp) ? resp.data : void 0;
	const total = isRecord$2(data) ? data.total : void 0;
	return typeof total === "number" && Number.isFinite(total) ? total : void 0;
}
/** envelope `{ code, data: <conversation> }` → 单条会话原始行。 */
function extractDetail(resp) {
	const data = isRecord$2(resp) ? resp.data : void 0;
	return isRecord$2(data) ? data : {};
}
function readHttpStatus(error) {
	if (!error || typeof error !== "object") return;
	const record = error;
	const status = record.response?.status ?? record.status;
	return typeof status === "number" ? status : void 0;
}
/**
* 组合 CloudSyncPort 生产适配器。落盘复用 CloudConversationsImpl.enqueueEvent(权威 SQL 在 impl);
* verified_at 由本适配器直接 UPDATE(sync 层元数据 · impl 不写)· 陈旧扫描直接读 cloud_conversations。
*/
function createCloudSyncPort(deps) {
	const apiPrefix = deps.apiPrefix ?? DEFAULT_CLOUD_API_PREFIX;
	const currentUid = () => deps.accountProvider?.()?.uid?.trim() || void 0;
	const stampVerified = (items, uid, now) => {
		for (const item of items) if (item.id) deps.sqlite.prepare(STAMP_VERIFIED_SQL).run(now, item.id, uid);
	};
	return {
		async pullPage({ size, page, signal }) {
			const query = new URLSearchParams();
			query.set("type", "cloud");
			query.set("conversationOrigin", PULL_PURE_CLOUD_ORIGINS);
			query.set("size", String(size));
			query.set("sort", JSON.stringify({
				orderBy: "updatedAt",
				order: "desc"
			}));
			query.set("page", String(page));
			const resp = await deps.http.get(`${apiPrefix}/?${query.toString()}`, { signal });
			const now = Date.now();
			return {
				items: extractConversations(resp).map((row) => require_conversations.toCloudEventData(row, now)),
				total: extractTotal(resp)
			};
		},
		applyPulledItems(items) {
			deps.impl.promoteToLiveFromSync?.();
			const appliedIds = [];
			for (const item of items) if (item.id) appliedIds.push(item.id);
			const uid = currentUid();
			const existing = uid ? selectExistingActiveIds(deps.sqlite, uid, appliedIds) : /* @__PURE__ */ new Set();
			for (const item of items) if (item.id) deps.impl.enqueueEvent({
				conversationId: item.id,
				kind: "updated",
				data: item
			});
			if (uid) stampVerified(items, uid, Date.now());
			if (appliedIds.length > 0) {
				const added = [];
				const updated = [];
				for (const id of appliedIds) if (existing.has(id)) updated.push(id);
				else added.push(id);
				deps.onAfterApply?.({
					added,
					updated
				});
			}
		},
		softDelete(id) {
			if (id) {
				deps.impl.enqueueEvent({
					conversationId: id,
					kind: "deleted"
				});
				deps.onAfterDelete?.(id);
			}
		},
		async probeConversation(id, signal) {
			try {
				const resp = await deps.http.get(`${apiPrefix}/${encodeURIComponent(id)}`, { signal });
				return {
					kind: "ok",
					data: require_conversations.toCloudEventData(extractDetail(resp), Date.now())
				};
			} catch (err) {
				const status = readHttpStatus(err);
				if (status === 404 || status === 410) return { kind: "gone" };
				throw err;
			}
		},
		listStaleForReconcile(limit) {
			const uid = currentUid();
			if (!uid) return [];
			return deps.sqlite.prepare(RECONCILE_SCAN_SQL).all(uid, Date.now() - RECONCILE_STALE_MS, limit).map((row) => ({
				id: String(row.id ?? ""),
				verifiedAt: typeof row.verifiedAt === "number" ? row.verifiedAt : null
			}));
		},
		listActiveIdsForReconcile(verifiedBefore) {
			const uid = currentUid();
			if (!uid) return /* @__PURE__ */ new Set();
			const rows = deps.sqlite.prepare(RECONCILE_ACTIVE_IDS_SQL).all(uid, verifiedBefore);
			const ids = /* @__PURE__ */ new Set();
			for (const row of rows) {
				const id = row.id;
				if (typeof id === "string" && id) ids.add(id);
			}
			return ids;
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/unread-writer.ts
/** 创建 Core 内部未读 writer：写入成功后统一发布最新 Conversation info。 */
function createUnreadWriter(deps) {
	return async (conversationId, conversation) => {
		await deps.markUnread(conversationId);
		conversation.info.unread = true;
		deps.eventBus.emit(require_conversations.WB_CONVERSATION_INFO_CHANGE, {
			conversationId,
			info: conversation.info
		});
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/wb/index.ts
/**
* wb.conversations —— 会话管理 SDK 层。
*
* 设计：返回类型严格对齐 `object-types.ts`（SSOT）。
* - `list()` 返回 `WBListResult<ConversationInfo>`（信封：items + page + total，服务端分页 + 置顶收敛）。
* - `get()` / `create()` / `fork()` 返回 object-types 的 `Conversation` 富对象
*   （由注入的 env impl 构造），不再返回扁平 `ConversationDetail` DTO。
* - rename/update/delete/archive/unarchive 仍是按 id 的平面操作。
*
* 使用方式：
* ```ts
* const { items } = await wb.conversations.list({ page: 1, size: 20 });
* const conv  = await wb.conversations.create({ cwd: 'github/user/repo' });
* const same  = await wb.conversations.get(conv.info.id);
* await wb.conversations.rename(conv.info.id, '新标题');
* ```
*
* IPC 说明：Desktop bridge 的 `get/create/fork` 只返回 `RemoteConversationSnapshot` DTO，
* 富对象的连接态方法/事件由**本 SDK 层**在 `createConversationsApi` 内部重建
* （注入 `conversation` client + `eventBus`，见下方工厂）；
* agent-ui `conversations.provide.ts` 只在其上叠加 `ui`（renderer-only）。Web 直连同理走本层。
*/
/** create/fork 返回联合里 ApiError 的判别（避免对 ApiError 做重建）。 */
function isApiError(value) {
	return typeof value === "object" && value !== null && "errorCode" in value && "message" in value;
}
function withLocalListOrigin(filter, enabled) {
	if (!enabled || !filter?.conversationOrigin || filter.transport === "cloud") return filter;
	const originFilter = filter.conversationOrigin;
	const origins = typeof originFilter === "string" ? originFilter.split(",").map((item) => item.trim()).filter(Boolean) : [...originFilter];
	return origins.includes("local") ? filter : {
		...filter,
		conversationOrigin: [...origins, "local"]
	};
}
function stripTraceId(filter) {
	if (!filter?.traceId) return filter;
	const { traceId: _traceId, ...rest } = filter;
	return rest;
}
function conversationViews(conversations) {
	const fixedView = (fixed) => ({ list: (filter, options) => conversations.list({
		...filter,
		...fixed
	}, options) });
	return {
		local: conversations.local ?? fixedView({ transport: "local" }),
		cloud: conversations.cloud ?? fixedView({ transport: "cloud" }),
		claw: conversations.claw ?? { list: (filter) => Promise.resolve(require_conversations.emptyConversationList(filter)) },
		genie: conversations.genie ?? fixedView({ conversationOrigin: "genie" }),
		miniapp: conversations.miniapp ?? fixedView({
			transport: "cloud",
			conversationOrigin: "workbuddy-mp"
		}),
		app: conversations.app ?? fixedView({
			transport: "cloud",
			conversationOrigin: "workbuddy-app"
		})
	};
}
async function fetchListForSpace(conversations, views, space, filter) {
	const spaceFilter = stripTraceId({
		...filter,
		space
	});
	switch (space) {
		case "local": return views.local.list(spaceFilter);
		case "project": return conversations.list(spaceFilter);
		case "assistant": return views.claw.list(spaceFilter);
		case "genie": return views.genie.list(spaceFilter);
		case "cloud": return views.cloud.list(spaceFilter);
		default: return require_conversations.emptyConversationList(spaceFilter);
	}
}
function subscribeCollectionEvent(eventBus, event, callback, subscribeEvent) {
	if (event in require_conversations.COLLECTION_EVENT_BINDS) {
		const entry = require_conversations.COLLECTION_EVENT_BINDS[event];
		const cb = callback;
		const map = entry.map;
		return eventBus.on(entry.bind.busEvent, (payload) => cb(...map(payload)));
	}
	switch (event) {
		case require_conversations.ConversationsEvent.ListChange: return eventBus.on(require_conversations.WB_CONVERSATION_LIST_PROGRESS, (payload) => callback(payload.space, payload.list, payload.traceId));
		case require_conversations.ConversationsEvent.RequestUpdated: {
			const handler = callback;
			const unsubs = [eventBus.on(require_conversations.WB_CONVERSATION_REQUEST_UPDATE, (payload) => handler(payload.conversationId, payload.requestId, payload.messageId, payload.chunk, require_conversations.requireConversationRequestPatches(payload))), eventBus.on(require_conversations.WB_CONVERSATION_REQUEST_UPDATE_BATCH, (batch) => batch.updates.forEach((payload) => handler(payload.conversationId, payload.requestId, payload.messageId, payload.chunk, require_conversations.requireConversationRequestPatches(payload))))];
			const unsubscribeHost = subscribeEvent?.("*", require_conversations.ConversationEvent.RequestUpdate);
			return () => {
				unsubs.forEach((unsubscribe) => unsubscribe());
				unsubscribeHost?.();
			};
		}
		default: throw new Error(`Unsupported conversations event: ${String(event)}`);
	}
}
/** 找到一个能从旧顺序精确得到新顺序的单元素移动；不存在时不生成事件。 */
function resolveSinglePinnedMove(oldIds, newIds) {
	if (oldIds.length !== newIds.length) return;
	if (oldIds.every((id, index) => id === newIds[index])) return;
	const oldSet = new Set(oldIds);
	const newSet = new Set(newIds);
	if (oldSet.size !== oldIds.length || newSet.size !== newIds.length || oldSet.size !== newSet.size || oldIds.some((id) => !newSet.has(id))) return;
	for (const movedId of oldIds) {
		const beforeWhichId = newIds[newIds.indexOf(movedId) + 1];
		const projected = oldIds.filter((id) => id !== movedId);
		const insertAt = beforeWhichId ? projected.indexOf(beforeWhichId) : projected.length;
		if (insertAt < 0) continue;
		projected.splice(insertAt, 0, movedId);
		if (projected.every((id, index) => id === newIds[index])) return {
			conversationId: movedId,
			beforeWhichId
		};
	}
}
/** 串行执行置顶写入，并在原方法成功后发布对应语义事件。 */
function createPinnedMutationMethods(source, emit) {
	let mutationQueue = Promise.resolve();
	const enqueue = (operation) => {
		const result = mutationQueue.then(operation);
		mutationQueue = result.catch(() => void 0);
		return result;
	};
	return {
		pin: (id) => enqueue(async () => {
			await source.pin(id);
			emit(require_conversations.WB_CONVERSATION_PINNED, { conversationId: id });
		}),
		unpin: (id) => enqueue(async () => {
			await source.unpin(id);
			emit(require_conversations.WB_CONVERSATION_UNPINNED, { conversationId: id });
		}),
		reorderPinned: (orderedIds) => enqueue(async () => {
			const previousIds = (await source.listPinned()).map((item) => item.id);
			await source.reorderPinned(orderedIds);
			const move = resolveSinglePinnedMove(previousIds, orderedIds);
			if (move) emit(require_conversations.WB_CONVERSATION_PINS_REORDERED, move);
		})
	};
}
function createMarkReadMethod(source, onUpdated) {
	return { markRead: async (conversationId) => {
		await source.markRead(conversationId);
		await onUpdated(conversationId);
	} };
}
/**
* 装配 `wb.conversations`。
*
* B 方案：会话管理由 env 专属实现（`LocalConversationsImpl` / `CloudConversationsImpl`）
* **直接实现**（sqlite / http）。本工厂承担两种角色：
*
* 1. **富对象源侧**（daemon / 无 conversation provider）：直接透传 `providers.conversations`，
*    `get/create/fork` 返回带真实连接态方法的富对象（供 `ConversationPool.acquire` 复用）。
* 2. **消费侧**（renderer / Web · 传了 `conversation` + `eventBus`）：`get/create/fork` 拿到
*    原始富对象后（Desktop 已被 IPC 剥成纯数据 / Web 是真实例），用
*    `rehydrateConversation` 把连接态方法/事件重新绑上（委托 `conversation` +
*    `eventBus`）。`list/rename/update/archive/unarchive` 恒透传；`delete` 在用户取消
*    时短路（不 emit deleted、不 dispose 富对象）。
*
* 之所以仍走注入：`createConversationsApi` 是浏览器安全层（Web 也用），不能直接 import
* Node-only 的 sqlite 实现，故由各端装配点注入对应实现。
*
* D2 说明：连接态重建下沉到本函数（原先在 agent-ui provider）。
*/
function createConversationsApi(deps) {
	const { conversations, conversation } = deps.providers;
	const { eventBus, clientToolBridge } = deps;
	const views = conversationViews(conversations);
	if (!conversation || !eventBus) {
		const sourceList = conversations.list.bind(conversations);
		const sourceEnsureList = conversations.ensureList?.bind(conversations);
		const sourceListScope = conversations.listScope?.bind(conversations);
		const bus = eventBus ?? require_conversations.getBus();
		const sourceCreate = conversations.create.bind(conversations);
		const sourceFork = conversations.fork.bind(conversations);
		const sourceDelete = conversations.delete.bind(conversations);
		const sourceArchive = conversations.archive.bind(conversations);
		const sourceUnarchive = conversations.unarchive.bind(conversations);
		const sourceRename = conversations.rename.bind(conversations);
		const sourceMove = conversations.move.bind(conversations);
		const sourceGet = conversations.get.bind(conversations);
		const pinnedMutations = createPinnedMutationMethods({
			pin: conversations.pin.bind(conversations),
			unpin: conversations.unpin.bind(conversations),
			reorderPinned: conversations.reorderPinned.bind(conversations),
			listPinned: conversations.listPinned.bind(conversations)
		}, bus.emit.bind(bus));
		const emitInfoChangeSafe = async (id, source) => {
			try {
				const conv = await sourceGet(id);
				if (!conv?.info) return;
				bus.emit(require_conversations.WB_CONVERSATION_INFO_CHANGE, {
					conversationId: id,
					info: conv.info
				});
			} catch (err) {
				deps.context?.logger.warn(`[wb.conversations] emit WB_CONVERSATION_INFO_CHANGE (${source}) failed`, {
					conversationId: id,
					error: err instanceof Error ? err.message : String(err)
				});
			}
		};
		const markReadMethod = createMarkReadMethod({ markRead: conversations.markRead.bind(conversations) }, (conversationId) => emitInfoChangeSafe(conversationId, "markRead"));
		return Object.assign(conversations, views, {
			list: (filter, options) => sourceList(withLocalListOrigin(filter, deps.includeLocalListOrigin === true), options),
			ensureList: (space, filter) => sourceEnsureList ? sourceEnsureList(space, withLocalListOrigin(filter, deps.includeLocalListOrigin === true)) : sourceList(withLocalListOrigin({
				...filter,
				space
			}, deps.includeLocalListOrigin === true)).then(() => void 0),
			listScope: (space, filter) => sourceListScope ? sourceListScope(space, withLocalListOrigin(filter, deps.includeLocalListOrigin === true)) : sourceList(withLocalListOrigin({
				...filter,
				space
			}, deps.includeLocalListOrigin === true)),
			create: async (params) => {
				const conv = await sourceCreate(params);
				if (isApiError(conv)) return conv;
				try {
					bus.emit(require_conversations.WB_CONVERSATION_CREATED, {
						conversationId: conv.info.id,
						info: conv.info
					});
				} catch (err) {
					deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_CREATED failed", {
						conversationId: conv.info.id,
						error: err instanceof Error ? err.message : String(err)
					});
				}
				return conv;
			},
			fork: async (conversationId) => {
				const conv = await sourceFork(conversationId);
				if (isApiError(conv)) return conv;
				try {
					bus.emit(require_conversations.WB_CONVERSATION_CREATED, {
						conversationId: conv.info.id,
						info: conv.info
					});
				} catch (err) {
					deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_CREATED (fork) failed", {
						conversationId: conv.info.id,
						error: err instanceof Error ? err.message : String(err)
					});
				}
				return conv;
			},
			delete: async (id, transport) => {
				let deletedTransport = transport;
				if (!deletedTransport) try {
					deletedTransport = (await sourceGet(id))?.info.transport;
				} catch {}
				const result = await sourceDelete(id, transport);
				if (require_conversations.isConversationDeleteCancelled(result)) return result;
				try {
					bus.emit(require_conversations.WB_CONVERSATION_DELETED, {
						conversationId: id,
						transport: deletedTransport
					});
				} catch (err) {
					deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_DELETED failed", {
						conversationId: id,
						error: err instanceof Error ? err.message : String(err)
					});
				}
				return result;
			},
			archive: async (id, transport) => {
				let archivedTransport = transport;
				if (!archivedTransport) try {
					archivedTransport = (await sourceGet(id))?.info.transport;
				} catch {}
				await sourceArchive(id, transport);
				try {
					bus.emit(require_conversations.WB_CONVERSATION_ARCHIVED, {
						conversationId: id,
						transport: archivedTransport
					});
				} catch (err) {
					deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_ARCHIVED failed", {
						conversationId: id,
						error: err instanceof Error ? err.message : String(err)
					});
				}
			},
			unarchive: async (id, transport) => {
				let unarchivedTransport = transport;
				if (!unarchivedTransport) try {
					unarchivedTransport = (await sourceGet(id))?.info.transport;
				} catch {}
				await sourceUnarchive(id, transport);
				try {
					bus.emit(require_conversations.WB_CONVERSATION_UNARCHIVED, {
						conversationId: id,
						transport: unarchivedTransport
					});
				} catch (err) {
					deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_UNARCHIVED failed", {
						conversationId: id,
						error: err instanceof Error ? err.message : String(err)
					});
				}
			},
			rename: async (id, title, transport) => {
				await sourceRename(id, title, transport);
				emitInfoChangeSafe(id, "rename");
			},
			move: async (id, cwd, transport) => {
				await sourceMove(id, cwd, transport);
				emitInfoChangeSafe(id, "move");
			},
			...pinnedMutations,
			...markReadMethod
		});
	}
	const rehydratedById = /* @__PURE__ */ new Map();
	const inflightGetById = /* @__PURE__ */ new Map();
	const changeHandlers = /* @__PURE__ */ new Map();
	const emitChange = (type, change) => {
		for (const handler of changeHandlers.get(type) ?? []) try {
			handler(change);
		} catch (error) {
			deps.context?.logger.error("[wb.conversations] change handler failed", {
				type,
				conversationId: change.id,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	};
	const pinnedMutations = createPinnedMutationMethods({
		pin: conversations.pin.bind(conversations),
		unpin: conversations.unpin.bind(conversations),
		reorderPinned: conversations.reorderPinned.bind(conversations),
		listPinned: conversations.listPinned.bind(conversations)
	}, (event, payload) => eventBus.emit(event, payload));
	const markReadMethod = createMarkReadMethod({ markRead: conversations.markRead.bind(conversations) }, (conversationId) => emitChange("updated", { id: conversationId }));
	let listFeedRefs = 0;
	let releaseListFeedHost;
	const acquireListFeed = () => {
		listFeedRefs += 1;
		if (listFeedRefs === 1) {
			const unsubscribeBus = eventBus.on(require_conversations.WB_CONVERSATION_LIST_CHANGED, (payload) => {
				payload.added.forEach((info) => emitChange("added", info));
				payload.updated.forEach((info) => emitChange("updated", info));
				payload.deleted.forEach((id) => emitChange("deleted", { id }));
			});
			const unsubscribeHost = deps.subscribeListChanges?.();
			releaseListFeedHost = () => {
				unsubscribeBus();
				unsubscribeHost?.();
			};
		}
		let released = false;
		return () => {
			if (released) return;
			released = true;
			listFeedRefs = Math.max(0, listFeedRefs - 1);
			if (listFeedRefs === 0) {
				releaseListFeedHost?.();
				releaseListFeedHost = void 0;
			}
		};
	};
	const rehydrateAndCache = (conv) => {
		const existing = rehydratedById.get(conv.info.id);
		if (existing) {
			existing.syncInfo?.(conv.info);
			existing.syncConnectors?.(conv.configManager?.connectors);
			return existing.conversation;
		}
		const rehydrateDeps = {
			conversation,
			eventBus,
			clientToolBridge,
			answerPoiQuestion: deps.answerPoiQuestion,
			answerCloudServiceConfirmation: deps.answerCloudServiceConfirmation,
			readArtifact: deps.providers.artifacts ? (conversationId, uri, format) => deps.providers.artifacts.read({
				conversationId,
				uri,
				format
			}) : void 0,
			subscribeEvent: deps.subscribeEvent,
			onDelete: (conversationId) => rehydratedById.delete(conversationId)
		};
		const rehydrated = require_conversations.rehydrateConversation(conv, rehydrateDeps);
		rehydratedById.set(conv.info.id, {
			conversation: rehydrated,
			syncInfo: rehydrated.syncSourceInfo,
			syncConnectors: rehydrated.syncSourceConnectors,
			disposeInternal: rehydrated.disposeInternal
		});
		return rehydrated;
	};
	return {
		...views,
		list: (filter, options) => conversations.list(withLocalListOrigin(filter, deps.includeLocalListOrigin === true), options),
		ensureList: async (space, filter) => {
			const normalizedFilter = withLocalListOrigin(filter, deps.includeLocalListOrigin === true);
			if (conversations.ensureList) {
				await conversations.ensureList(space, normalizedFilter);
				return;
			}
			const list = await fetchListForSpace(conversations, views, space, normalizedFilter);
			eventBus.emit(require_conversations.WB_CONVERSATION_LIST_PROGRESS, {
				space,
				list,
				traceId: normalizedFilter?.traceId
			});
		},
		listScope: (space, filter) => {
			const normalizedFilter = withLocalListOrigin(filter, deps.includeLocalListOrigin === true);
			return conversations.listScope ? conversations.listScope(space, normalizedFilter) : fetchListForSpace(conversations, views, space, normalizedFilter);
		},
		listByIds: (ids, options) => conversations.listByIds?.(ids, options) ?? Promise.resolve([]),
		...markReadMethod,
		getArchivedIds: (ids) => conversations.getArchivedIds?.(ids) ?? /* @__PURE__ */ new Set(),
		get: (conversationId) => {
			const inflight = inflightGetById.get(conversationId);
			if (inflight) return inflight;
			const pending = conversations.get(conversationId).then((conv) => conv ? rehydrateAndCache(conv) : void 0).finally(() => {
				inflightGetById.delete(conversationId);
			});
			inflightGetById.set(conversationId, pending);
			return pending;
		},
		create: async (params) => {
			const conv = await conversations.create(params);
			if (isApiError(conv)) return conv;
			const rehydrated = rehydrateAndCache(conv);
			emitChange("added", rehydrated.info);
			eventBus.emit(require_conversations.WB_CONVERSATION_CREATED, {
				conversationId: rehydrated.info.id,
				info: rehydrated.info
			});
			return rehydrated;
		},
		fork: async (conversationId) => {
			const conv = await conversations.fork(conversationId);
			if (isApiError(conv)) return conv;
			const rehydrated = rehydrateAndCache(conv);
			emitChange("added", rehydrated.info);
			eventBus.emit(require_conversations.WB_CONVERSATION_CREATED, {
				conversationId: rehydrated.info.id,
				info: rehydrated.info
			});
			return rehydrated;
		},
		rename: async (id, title, transport) => {
			const active = rehydratedById.get(id)?.conversation;
			if (active && (!transport || active.info.transport === transport)) await active.rename(title);
			else await conversations.rename(id, title, transport);
			emitChange("updated", { id });
		},
		move: async (id, cwd, transport) => {
			await conversations.move(id, cwd, transport);
			emitChange("updated", { id });
		},
		delete: async (id, transport) => {
			let deletedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
			if (!deletedTransport) try {
				deletedTransport = (await conversations.get(id))?.info.transport;
			} catch {}
			const result = await conversations.delete(id, transport);
			if (require_conversations.isConversationDeleteCancelled(result)) return result;
			rehydratedById.get(id)?.disposeInternal?.();
			rehydratedById.delete(id);
			emitChange("deleted", { id });
			eventBus.emit(require_conversations.WB_CONVERSATION_DELETED, {
				conversationId: id,
				transport: deletedTransport
			});
		},
		archive: async (id, transport) => {
			let archivedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
			if (!archivedTransport) try {
				archivedTransport = (await conversations.get(id))?.info.transport;
			} catch {}
			await conversations.archive(id, transport);
			emitChange("updated", { id });
			eventBus.emit(require_conversations.WB_CONVERSATION_ARCHIVED, {
				conversationId: id,
				transport: archivedTransport
			});
		},
		unarchive: async (id, transport) => {
			let unarchivedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
			if (!unarchivedTransport) try {
				unarchivedTransport = (await conversations.get(id))?.info.transport;
			} catch {}
			await conversations.unarchive(id, transport);
			emitChange("updated", { id });
			eventBus.emit(require_conversations.WB_CONVERSATION_UNARCHIVED, {
				conversationId: id,
				transport: unarchivedTransport
			});
		},
		pin: async (id) => {
			await pinnedMutations.pin(id);
			emitChange("updated", { id });
		},
		unpin: async (id) => {
			await pinnedMutations.unpin(id);
			emitChange("updated", { id });
		},
		onConversationChanged: (type, handler) => {
			const handlers = changeHandlers.get(type) ?? /* @__PURE__ */ new Set();
			handlers.add(handler);
			changeHandlers.set(type, handlers);
			const releaseListFeed = acquireListFeed();
			let released = false;
			return () => {
				if (released) return;
				released = true;
				handlers.delete(handler);
				releaseListFeed();
			};
		},
		on: (event, callback) => subscribeCollectionEvent(eventBus, event, callback, deps.subscribeEvent),
		reorderPinned: pinnedMutations.reorderPinned,
		listPinned: () => conversations.listPinned()
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/cloud-workspace-file-search.ts
var WORKSPACE_ROOT = "/workspace";
var SEARCH_TIMEOUT_MS = 1e4;
var SEARCH_OUTPUT_MAX_LENGTH = 524288;
var SEARCH_RESULT_LIMIT = 100;
var SEARCH_COMMAND = [
	"count=0",
	"query=${WB_FILE_QUERY,,}",
	"while IFS= read -r -d '' entry; do",
	"path=${entry#?:}",
	"name=${path##*/}",
	"case \"${name,,}\" in",
	"*\"$query\"*) printf '%s\\0' \"$entry\"; count=$((count + 1)); [ \"$count\" -ge \"$WB_FILE_LIMIT\" ] && break;;",
	"esac",
	`done < <(${[
		"find /workspace -path /workspace -o",
		"\\( -name '.*' -o -name node_modules -o -name __pycache__ \\) -prune -o",
		"\\( -type f -exec /bin/bash -c 'printf \"f:%s\\0\" \"$@\"' _ {} +",
		"-o -type d -exec /bin/bash -c 'printf \"d:%s\\0\" \"$@\"' _ {} + \\)"
	].join(" ")})`,
	"true"
].join("\n");
/**
* Desktop daemon 专用的云端工作区搜索。
*
* 只执行固定 find 脚本：查询文本经环境变量传入，不会拼接为 shell 代码；搜索根目录、
* 用户、超时、结果数和输出大小都由此实现固定。Web 不注入本端口，保留 ListDir 快照回退。
*/
var searchCloudWorkspaceFiles = async ({ conversationId, options, resolveConnectionInfo }) => {
	const limit = Math.min(Math.max(Math.trunc(options.maxResults), 0), SEARCH_RESULT_LIMIT);
	if (limit === 0) return [];
	const info = await resolveConnectionInfo();
	if (!info.dataEndpoint || !info.sandboxId || !info.token) throw new Error("[CloudWorkspaceFileSearch] command endpoint is unavailable");
	const result = await new require_dist.Sandbox({
		sandboxId: info.sandboxId,
		sandboxUrl: info.dataEndpoint,
		envdAccessToken: info.token,
		envdVersion: "0.5.0"
	}).commands.run(SEARCH_COMMAND, {
		user: "root",
		cwd: WORKSPACE_ROOT,
		envs: {
			WB_FILE_QUERY: options.query.trim(),
			WB_FILE_LIMIT: String(limit)
		},
		timeoutMs: SEARCH_TIMEOUT_MS,
		requestTimeoutMs: SEARCH_TIMEOUT_MS
	});
	if (result.exitCode !== 0) throw new Error(`[CloudWorkspaceFileSearch] find failed: exit ${result.exitCode}`);
	if (result.stdout.length > SEARCH_OUTPUT_MAX_LENGTH) throw new Error("[CloudWorkspaceFileSearch] find returned too much output");
	return parseSearchResult(conversationId, result.stdout);
};
function parseSearchResult(conversationId, stdout) {
	const paths = /* @__PURE__ */ new Set();
	const results = [];
	for (const entry of stdout.split("\0")) {
		if (!entry) continue;
		const type = entry.startsWith("f:") ? "file" : entry.startsWith("d:") ? "directory" : void 0;
		if (!type) throw new Error("[CloudWorkspaceFileSearch] find returned an invalid entry");
		const path = normalizeWorkspacePath(entry.slice(2));
		if (path === WORKSPACE_ROOT || paths.has(path)) continue;
		paths.add(path);
		results.push({
			conversationId,
			path,
			name: path.slice(path.lastIndexOf("/") + 1),
			type
		});
	}
	return results;
}
function normalizeWorkspacePath(value) {
	if (value.includes("\0") || !value.startsWith("/")) throw new Error("[CloudWorkspaceFileSearch] find path is invalid");
	const segments = value.split("/");
	if (segments.some((segment) => segment === "." || segment === "..")) throw new Error("[CloudWorkspaceFileSearch] find path traversal is forbidden");
	const normalized = `/${segments.filter(Boolean).join("/")}`;
	if (normalized !== WORKSPACE_ROOT && !normalized.startsWith(`${WORKSPACE_ROOT}/`)) throw new Error("[CloudWorkspaceFileSearch] find path escaped /workspace");
	return normalized;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/common/ports/conversation-plugin-registration.ts
var ConversationPluginRegistrationError = class extends Error {
	constructor(report) {
		super("[conversation-plugin] registration rejected: " + report.violations.map((item) => item.code).join(", "));
		this.name = "ConversationPluginRegistrationError";
		this.report = report;
	}
};
/**
* Internal certification step used by the Bundle-scoped Plugin Registry.
*/
function certifyConversationPlugin(input) {
	const plugin = createUncheckedConversationPlugin(input);
	const report = validateConversationPlugin(plugin);
	if (!report.valid) throw new ConversationPluginRegistrationError(report);
	return plugin;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/hooks/compose-conversation-plugin-hooks.ts
function mergeEnvContributions(contributions) {
	const merged = {};
	let hasContribution = false;
	for (const contribution of contributions) {
		if (!contribution) continue;
		for (const layer of [
			"static",
			"host",
			"conversation",
			"credential"
		]) {
			if (!contribution[layer]) continue;
			merged[layer] = {
				...merged[layer],
				...contribution[layer]
			};
			hasContribution = true;
		}
	}
	return hasContribution ? merged : void 0;
}
function revisionHash(entries) {
	const revisionEntries = entries.flatMap(({ plugin, hooks }) => {
		const revision = hooks.getConversationRuntimeRevision?.();
		return revision === void 0 ? [] : [{
			revision,
			value: `${plugin.manifest.pluginId}:${revision}`
		}];
	});
	if (revisionEntries.length === 0) return 0;
	if (revisionEntries.length === 1) return revisionEntries[0].revision;
	let hash = 2166136261;
	for (const value of revisionEntries.map((item) => item.value).join("|")) {
		hash ^= value.charCodeAt(0);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
/** Core-owned deterministic composition for one leased Plugin snapshot. */
function composeConversationPluginHooks(entries) {
	const hookSets = entries.map((entry) => entry.hooks);
	const owner = (name) => hookSets.map((hooks) => hooks[name]).find((hook) => hook !== void 0);
	const envContributors = hookSets.filter((hooks) => hooks.contributeEnv);
	const mcpResolvers = hookSets.filter((hooks) => hooks.resolveMcpServers);
	const mcpEnvResolvers = hookSets.filter((hooks) => hooks.resolveMcpEnv);
	const statusReporters = hookSets.filter((hooks) => hooks.reportPrepareStatus);
	const configRefiners = hookSets.filter((hooks) => hooks.refineConversationConfig);
	const beforePromptHooks = hookSets.filter((hooks) => hooks.beforePrompt);
	const promptPreparers = hookSets.filter((hooks) => hooks.prepareConversationPrompt);
	const workspaceCheckers = hookSets.filter((hooks) => hooks.checkWorkspaceAccess);
	const revisionReaders = entries.filter((entry) => entry.hooks.getConversationRuntimeRevision);
	return {
		...owner("resolveCommand") ? { resolveCommand: owner("resolveCommand") } : {},
		...envContributors.length > 0 ? { contributeEnv: async (ctx, phase, resolved) => mergeEnvContributions(await Promise.all(envContributors.map((hooks) => hooks.contributeEnv(ctx, phase, resolved)))) } : {},
		...mcpResolvers.length > 0 ? { resolveMcpServers: async (ctx, resolved) => {
			const servers = (await Promise.all(mcpResolvers.map((hooks) => hooks.resolveMcpServers(ctx, resolved)))).flatMap((group) => group ?? []);
			return servers.length > 0 ? servers : void 0;
		} } : {},
		...mcpEnvResolvers.length > 0 ? { resolveMcpEnv: (ctx, servers) => {
			const merged = Object.assign({}, ...mcpEnvResolvers.map((hooks) => hooks.resolveMcpEnv(ctx, servers) ?? {}));
			return Object.keys(merged).length > 0 ? merged : void 0;
		} } : {},
		...hookSets.some((hooks) => hooks.resolveMcpServersTimeoutMs) ? { resolveMcpServersTimeoutMs: (ctx) => Math.max(0, ...hookSets.flatMap((hooks) => {
			const timeoutMs = hooks.resolveMcpServersTimeoutMs?.(ctx);
			return timeoutMs === void 0 ? [] : [timeoutMs];
		})) || void 0 } : {},
		...statusReporters.length > 0 ? { reportPrepareStatus: (ctx, status) => {
			let firstError;
			for (const hooks of statusReporters) try {
				hooks.reportPrepareStatus(ctx, status);
			} catch (error) {
				firstError ??= error;
			}
			if (firstError) throw firstError;
		} } : {},
		...owner("resolveConversationConfig") ? { resolveConversationConfig: owner("resolveConversationConfig") } : {},
		...configRefiners.length > 0 ? { refineConversationConfig: async (ctx, config) => {
			let current = config;
			for (const hooks of configRefiners) {
				if (!current) return;
				current = await hooks.refineConversationConfig(ctx, current);
			}
			return current;
		} } : {},
		...beforePromptHooks.length > 0 ? { beforePrompt: async (ctx) => {
			const requests = (await Promise.all(beforePromptHooks.map((hooks) => hooks.beforePrompt(ctx)))).flatMap((group) => group ?? []);
			return requests.length > 0 ? requests : void 0;
		} } : {},
		...promptPreparers.length > 0 ? { prepareConversationPrompt: async (ctx) => {
			let current = {
				prompt: ctx.prompt,
				...ctx.meta ? { meta: ctx.meta } : {}
			};
			for (const hooks of promptPreparers) current = await hooks.prepareConversationPrompt({
				...ctx,
				prompt: current.prompt,
				meta: current.meta
			});
			return current;
		} } : {},
		...revisionReaders.length > 0 ? { getConversationRuntimeRevision: () => revisionHash(revisionReaders) } : {},
		...owner("createConversationAdmission") ? { createConversationAdmission: owner("createConversationAdmission") } : {},
		...workspaceCheckers.length > 0 ? { checkWorkspaceAccess: async (ctx) => {
			const results = await Promise.all(workspaceCheckers.map((hooks) => hooks.checkWorkspaceAccess(ctx)));
			return results.find((result) => !result.ok) ?? results[0];
		} } : {},
		...owner("acquireLocalHttpRuntime") ? { acquireLocalHttpRuntime: owner("acquireLocalHttpRuntime") } : {},
		...owner("releaseLocalHttpRuntime") ? { releaseLocalHttpRuntime: owner("releaseLocalHttpRuntime") } : {}
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/hooks/conversation-plugin-registry.ts
var RUNTIME_OWNERSHIP_HOOKS = /* @__PURE__ */ new Set(["acquireLocalHttpRuntime", "releaseLocalHttpRuntime"]);
function conflictReport(plugin, hookName) {
	const violation = {
		code: hookName ? "DUPLICATE_HOOK_OWNER" : "DUPLICATE_PLUGIN_ID",
		...hookName ? { hookName } : {}
	};
	const report = {
		pluginId: plugin.manifest.pluginId,
		apiVersion: plugin.manifest.apiVersion,
		policyVersion: plugin.manifest.policyVersion,
		declaredHooks: declaredConversationHookNames(plugin),
		valid: false,
		violations: [violation]
	};
	return {
		...report,
		certificationHash: createConversationHookCertificationHash(report)
	};
}
var ConversationPluginRegistryImpl = class {
	constructor(logger) {
		this.logger = logger;
		this.entries = /* @__PURE__ */ new Map();
		this.registrationOrder = 0;
		this.registryRevision = 0;
	}
	get revision() {
		return this.registryRevision;
	}
	register(input) {
		const plugin = certifyConversationPlugin(input);
		const pluginId = plugin.manifest.pluginId;
		if (this.entries.has(pluginId)) throw new ConversationPluginRegistrationError(conflictReport(plugin));
		const declaredHooks = declaredConversationHookNames(plugin);
		const conflict = declaredHooks.find((hookName) => getConversationHookPolicy(hookName).composition === "single-owner" && this.activeEntries().some((entry) => declaredConversationHookNames(entry.plugin).includes(hookName)));
		const ownershipConflict = declaredHooks.find((hookName) => RUNTIME_OWNERSHIP_HOOKS.has(hookName) && this.activeEntries().some((entry) => declaredConversationHookNames(entry.plugin).some((existingHook) => RUNTIME_OWNERSHIP_HOOKS.has(existingHook))));
		if (conflict || ownershipConflict) throw new ConversationPluginRegistrationError(conflictReport(plugin, conflict ?? ownershipConflict));
		let resolveDrain;
		const drain = new Promise((resolve) => {
			resolveDrain = resolve;
		});
		const abortController = new AbortController();
		const governed = createGovernedConversationHooks(plugin, this.logger, abortController.signal);
		const entry = {
			plugin,
			hooks: governed.hooks,
			resolveArtifactToolRules: governed.resources?.resolveArtifactToolRules,
			abortController,
			order: ++this.registrationOrder,
			drain,
			resolveDrain,
			status: "active",
			leaseCount: 0
		};
		this.entries.set(pluginId, entry);
		this.registryRevision++;
		let disposePromise;
		return {
			pluginId,
			plugin,
			dispose: (options) => {
				if (entry.status === "removed") return entry.drain;
				if (disposePromise) {
					if (options?.force) this.forceRemove(entry);
					return disposePromise;
				}
				entry.status = "draining";
				this.registryRevision++;
				if (options?.force) this.forceRemove(entry);
				else this.finishIfDrained(entry);
				disposePromise = entry.drain;
				return disposePromise;
			}
		};
	}
	acquire() {
		const entries = this.activeEntries();
		for (const entry of entries) entry.leaseCount++;
		let released = false;
		return {
			hooks: composeConversationPluginHooks(entries),
			artifactToolRules: Object.freeze(entries.flatMap((entry) => entry.resolveArtifactToolRules?.() ?? [])),
			pluginIds: entries.map((entry) => entry.plugin.manifest.pluginId),
			release: () => {
				if (released) return;
				released = true;
				for (const entry of entries) {
					entry.leaseCount = Math.max(0, entry.leaseCount - 1);
					this.finishIfDrained(entry);
				}
			}
		};
	}
	plugins() {
		return this.activeEntries().map((entry) => entry.plugin);
	}
	async dispose() {
		const pending = [...this.entries.values()].map((entry) => {
			if (entry.status === "active") {
				entry.status = "draining";
				this.registryRevision++;
			}
			this.forceRemove(entry);
			return entry.drain;
		});
		await Promise.all(pending);
	}
	activeEntries() {
		return [...this.entries.values()].filter((entry) => entry.status === "active").sort((left, right) => left.order - right.order);
	}
	finishIfDrained(entry) {
		if (entry.status !== "draining" || entry.leaseCount > 0) return;
		entry.status = "removed";
		this.entries.delete(entry.plugin.manifest.pluginId);
		entry.resolveDrain();
	}
	forceRemove(entry) {
		if (entry.status === "removed") return;
		entry.status = "removed";
		entry.abortController.abort(new DOMException("Conversation Plugin force removed", "AbortError"));
		this.entries.delete(entry.plugin.manifest.pluginId);
		entry.resolveDrain();
	}
};
function createConversationPluginRegistry(logger) {
	return new ConversationPluginRegistryImpl(logger);
}
function registerConversationPlugin(registry, input) {
	return registry.register(input);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/conversations-bundle.ts
/**
* Builds the Node-side Conversation graph. The host owns domain repositories
* and injects only the workspace generator plus immutable resource query ports.
*/
function createConversationsBundle(deps) {
	const { context, eventBus, resourceQueries } = deps;
	const plugins = deps.plugins ?? createConversationPluginRegistry(context.logger);
	const localConversations = new LocalConversationsImpl({
		context,
		creditPredictionPort: deps.creditPredictionPort,
		generateCwd: deps.generateCwd,
		resolveWorkerCommand: deps.resolveWorkerCommand,
		resourceQueries,
		resourceEffectPort: deps.resourceEffectPort,
		historySource: deps.historySource,
		resolveAssistantCwd: deps.resolveAssistantCwd,
		isAssistantCwd: deps.isAssistantCwd,
		plugins,
		hooks: deps.hooks,
		deleteSessionHost: deps.deleteSessionHost,
		onExpertCleared: deps.onExpertCleared,
		onPerfMark: deps.onPerfMark,
		resourceEffectPortWrapper: deps.resourceEffectPortWrapper,
		promptObserverPort: deps.promptObserverPort,
		toolUpdateObserverPort: deps.toolUpdateObserverPort,
		onLocalCacheUpdated: (ids) => {
			const updatedInfos = localConversations.getLocalInfosByIds(ids);
			if (updatedInfos.length === 0) return;
			const terminalStates = /* @__PURE__ */ new Set([
				"idle",
				"terminated",
				"error",
				"failed"
			]);
			if (updatedInfos.some((i) => terminalStates.has(i.state))) context.logger?.info?.("[cl-status-sync-105712] onLocalCacheUpdated emit", {
				ids: [...ids],
				payload: updatedInfos.map((i) => ({
					id: i.id,
					state: i.state,
					hasRunningBackgroundTasks: i.hasRunningBackgroundTasks
				}))
			});
			eventBus.emit(require_conversations.WB_CONVERSATION_LIST_CHANGED, {
				added: [],
				updated: updatedInfos,
				deleted: []
			});
		}
	});
	const cloudDiagnosticLogger = createConversationFileLogger(context);
	const cloudConversations = new require_conversations.CloudConversationsImpl({
		context,
		creditPredictionPort: deps.creditPredictionPort,
		historyHttp: deps.historyHttp,
		historyMode: deps.cloudHistoryMode,
		logConversation: cloudDiagnosticLogger.conversation,
		workspaceFileSearch: searchCloudWorkspaceFiles,
		onPerfMark: deps.onPerfMark,
		sqlite: context.sqlite,
		onLocalCacheUpdated: (ids) => {
			const updatedInfos = cloudConversations.getLocalInfosByIds(ids);
			if (updatedInfos.length === 0) return;
			eventBus.emit(require_conversations.WB_CONVERSATION_LIST_CHANGED, {
				added: [],
				updated: updatedInfos,
				deleted: []
			});
		}
	});
	const syncScheduler = new SyncScheduler({
		port: createCloudSyncPort({
			http: context.http,
			sqlite: context.sqlite,
			accountProvider: context.accountProvider,
			impl: cloudConversations,
			logger: context.logger,
			onAfterApply: ({ added, updated }) => {
				const addedInfos = added.length > 0 ? cloudConversations.getLocalInfosByIds(added) : [];
				const updatedInfos = updated.length > 0 ? cloudConversations.getLocalInfosByIds(updated) : [];
				if (addedInfos.length === 0 && updatedInfos.length === 0) return;
				eventBus.emit(require_conversations.WB_CONVERSATION_LIST_CHANGED, {
					added: addedInfos,
					updated: updatedInfos,
					deleted: []
				});
			},
			onAfterDelete: (id) => {
				eventBus.emit(require_conversations.WB_CONVERSATION_LIST_CHANGED, {
					added: [],
					updated: [],
					deleted: [id]
				});
			}
		}),
		logger: context.logger
	});
	const conversations = new require_conversations.CompositeConversations({
		defaultProvider: "local",
		onListProgress: (space, list, traceId) => eventBus.emit(require_conversations.WB_CONVERSATION_LIST_PROGRESS, {
			space,
			list,
			traceId
		}),
		onPerfMark: deps.onPerfMark,
		providers: [{
			kind: "local",
			conversations: localConversations,
			has: localConversations.has
		}, {
			kind: "cloud",
			conversations: cloudConversations,
			has: cloudConversations.has,
			...deps.cloudAssistants ? { assistants: deps.cloudAssistants } : {}
		}]
	});
	const conversationsApi = createConversationsApi({
		context,
		providers: { conversations }
	});
	const conversationBridge = new require_conversations.ConversationBridge({
		conversations: conversationsApi,
		markUnread: createUnreadWriter({
			markUnread: conversations.markUnread.bind(conversations),
			eventBus
		}),
		eventBus,
		clientToolDispatcher: deps.clientToolDispatcher,
		resourceQueries,
		tracer: context.tracer,
		log: deps.poolLog,
		reportMonitorEvent: deps.reportPoolMonitorEvent
	});
	const conversationsService = require_conversations.createConversationsBridgeService(conversationsApi, conversationBridge);
	const disposeConversations = conversationsService._disposeAll.bind(conversationsService);
	conversationsService._disposeAll = async () => {
		await disposeConversations();
		await plugins.dispose();
		syncScheduler.stop();
	};
	return {
		localConversations,
		cloudConversations,
		conversations,
		resourceQueries,
		conversationBridge,
		conversationsService,
		conversationsApi,
		plugins,
		syncScheduler
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/assistant-display-snapshot-store.ts
var EMPTY_FILE = {
	version: 1,
	snapshots: []
};
/**
* WorkBuddy 自有旁路：按提问时间戳存每轮助理署名。
* 只写 `{configDir}/assistant-display/{conversationId}.json`。
* 不进 CLI JSONL，也不进 artifact-index / MediaArtifactService / ResourceEffect。
*/
var AssistantDisplaySnapshotStore = class {
	constructor(configDir) {
		this.configDir = configDir;
		this.jsonStore = new ResourceIndexJsonStore();
	}
	async load(conversationId) {
		try {
			return await this.loadUnsafe(conversationId);
		} catch {
			return /* @__PURE__ */ new Map();
		}
	}
	async loadUnsafe(conversationId) {
		const file = await this.readFile(conversationId);
		const snapshots = /* @__PURE__ */ new Map();
		for (const entry of file.snapshots) {
			if (typeof entry.timestamp !== "number" || !Number.isFinite(entry.timestamp) || entry.timestamp <= 0) continue;
			const display = require_conversations.sanitizePersistedAssistantDisplay(entry.assistantDisplay);
			if (!display) continue;
			snapshots.set(entry.timestamp, display);
		}
		return snapshots;
	}
	async save(conversationId, timestamp, display) {
		if (!Number.isFinite(timestamp) || timestamp <= 0) return;
		const sanitized = require_conversations.sanitizePersistedAssistantDisplay(display);
		if (!sanitized) return;
		const filePath = this.filePath(conversationId);
		await this.jsonStore.enqueue(filePath, async () => {
			const snapshots = (await this.readFile(conversationId)).snapshots.filter((entry) => entry.timestamp !== timestamp);
			snapshots.push({
				timestamp,
				assistantDisplay: sanitized
			});
			await this.jsonStore.write(filePath, {
				version: 1,
				snapshots
			});
		});
	}
	async readFile(conversationId) {
		const raw = await this.jsonStore.read(this.filePath(conversationId), EMPTY_FILE);
		return {
			version: 1,
			snapshots: Array.isArray(raw.snapshots) ? raw.snapshots : []
		};
	}
	filePath(conversationId) {
		assertSafePathSegment(conversationId, "conversationId");
		return node_path.join(this.configDir, "assistant-display", `${conversationId}.json`);
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/workspace-project-key.ts
/**
* 返回读侧候选，顺序即优先级：物理路径 key 优先，原始路径 key 只做存量 fallback。
* realpath 的 ENOENT/EACCES/ELOOP 等失败均降级为原路径，避免路径探测阻断历史读取。
*/
async function resolveWorkspaceProjectKeyCandidates(cwd) {
	let canonicalPath = cwd;
	try {
		canonicalPath = await node_fs_promises.realpath(cwd);
	} catch {}
	const candidates = [createCandidate(canonicalPath, "canonical")];
	const raw = createCandidate(cwd, "legacy-raw");
	if (raw.key !== candidates[0].key) candidates.push(raw);
	return candidates;
}
/** 仅超长 key 有旧截断算法恢复需求；普通 cwd 不触发目录扫描。 */
function legacyWorkspaceProjectKeyPrefix(candidate) {
	if (Buffer.byteLength(candidate.normalizedBase, "utf8") <= 255) return;
	return truncateToByteLimitOnCodePoint(candidate.normalizedBase, 180) || void 0;
}
/** 候选旧 key 必须确实来自当前完整归一串的更长前缀，不能只共享 180B。 */
function isCompatibleLegacyWorkspaceProjectKey(legacyKey, candidate) {
	const prefix = legacyWorkspaceProjectKeyPrefix(candidate);
	if (!prefix || legacyKey === candidate.key || !legacyKey.startsWith(prefix)) return false;
	const suffix = legacyKey.match(/^(.+)-[0-9a-z]{1,8}$/);
	const basePart = suffix ? suffix[1] : legacyKey;
	return basePart.length > prefix.length && candidate.normalizedBase.startsWith(basePart);
}
function createCandidate(workspacePath, source) {
	const normalizedBase = normalizeWorkspacePathBase(workspacePath);
	return {
		key: compressWorkspacePathName(workspacePath),
		source,
		workspacePath,
		normalizedBase
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-acp-session-binding.ts
/**
* Legacy CLI（如 2.133.1）`session/new` 自建 ACP sessionId，与 conversationId 可能不同。
* 把映射落在 projects/<cwd-key>/<conversationId>.acp-session.json，供：
* - session/resume / session/load 使用 ACP id
* - LocalConversationHistorySource 定位 CLI 落盘的 `<acpSessionId>.jsonl`
*/
var BINDING_SUFFIX = ".acp-session.json";
function bindingFilePath(projectDir, conversationId) {
	assertSafePathSegment(conversationId, "conversationId");
	return node_path.join(projectDir, `${conversationId}${BINDING_SUFFIX}`);
}
async function bindingProjectDirs(input) {
	assertSafePathSegment(input.conversationId, "conversationId");
	return (await resolveWorkspaceProjectKeyCandidates(input.cwd)).map((candidate) => {
		assertSafePathSegment(candidate.key, "workspace path");
		return resolveContainedPath(node_path.join(input.configDir, "projects"), candidate.key);
	});
}
async function readAcpSessionBindingFromProjectDir(projectDir, conversationId) {
	try {
		const raw = await node_fs_promises.readFile(bindingFilePath(projectDir, conversationId), "utf8");
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return;
		const acpSessionId = parsed.acpSessionId;
		return typeof acpSessionId === "string" && acpSessionId.length > 0 ? acpSessionId : void 0;
	} catch {
		return;
	}
}
/** 当前写侧 binding 的唯一位置；用于在 transcript 尚未创建时恢复刚持久化的绑定。 */
async function readCanonicalAcpSessionBinding(input) {
	if (!input.cwd) return;
	const [canonicalProjectDir] = await bindingProjectDirs(input);
	return canonicalProjectDir ? readAcpSessionBindingFromProjectDir(canonicalProjectDir, input.conversationId) : void 0;
}
async function writeAcpSessionBinding(input) {
	if (!input.cwd || !input.acpSessionId) return;
	assertSafePathSegment(input.acpSessionId, "acpSessionId");
	const [canonicalProjectDir] = await bindingProjectDirs(input);
	if (!canonicalProjectDir) return;
	const filePath = bindingFilePath(canonicalProjectDir, input.conversationId);
	await node_fs_promises.mkdir(node_path.dirname(filePath), { recursive: true });
	const payload = { acpSessionId: input.acpSessionId };
	const temporary = `${filePath}.${process.pid}.${(0, node_crypto.randomUUID)()}.tmp`;
	try {
		await node_fs_promises.writeFile(temporary, `${JSON.stringify(payload)}\n`, {
			encoding: "utf8",
			flag: "wx"
		});
		await node_fs_promises.rename(temporary, filePath);
	} catch (error) {
		await node_fs_promises.rm(temporary, { force: true }).catch(() => void 0);
		throw error;
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/sensitive-protection-projector.ts
var isRecord$1 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
/** Builds a UI-only plaintext/range projection from persisted item-local cipher mappings. */
function projectSensitiveReplayText(text, source) {
	const collected = collectCipherMappings(source);
	if (!collected.marked) return { text };
	if (collected.invalid) return failClosed(text);
	const mappings = [...collected.mappings.values()].filter((item) => text.includes(item.ciphertext));
	if (mappings.length === 0) return failClosed(text);
	if (mappings.some((item) => !item.plaintext)) return {
		text,
		meta: { sensitiveProtection: {
			version: 1,
			items: mappings.map(({ plaintext: _plaintext, ...item }) => item)
		} }
	};
	return restoreCiphertextRanges(text, mappings);
}
function collectCipherMappings(source) {
	let marked = false;
	let invalid = false;
	const mappings = /* @__PURE__ */ new Map();
	const visit = (value) => {
		if (Array.isArray(value)) {
			value.forEach(visit);
			return;
		}
		if (!isRecord$1(value)) return;
		const local = value.__codebuddyLocal;
		if (isRecord$1(local) && Object.prototype.hasOwnProperty.call(local, "sensitiveProtection")) {
			marked = true;
			const protection = local.sensitiveProtection;
			if (!isRecord$1(protection) || protection.version !== 1 || !Array.isArray(protection.items)) invalid = true;
			else for (const rawItem of protection.items) {
				const mapping = readCipherMapping(rawItem);
				if (!mapping) {
					invalid = true;
					continue;
				}
				const previous = mappings.get(mapping.ciphertext);
				if (previous && (previous.plaintext !== mapping.plaintext || previous.protectionId !== mapping.protectionId)) {
					invalid = true;
					continue;
				}
				mappings.set(mapping.ciphertext, mapping);
			}
		}
		for (const [key, nested] of Object.entries(value)) if (key !== "__codebuddyLocal") visit(nested);
	};
	visit(source);
	return {
		marked,
		invalid,
		mappings
	};
}
function readCipherMapping(value) {
	if (!isRecord$1(value) || typeof value.ciphertext !== "string" || !value.ciphertext) return;
	const ruleNames = Array.isArray(value.ruleNames) ? value.ruleNames.filter((name) => typeof name === "string" && Boolean(name.trim())) : void 0;
	return {
		ciphertext: value.ciphertext,
		...typeof value.plaintext === "string" && value.plaintext ? { plaintext: value.plaintext } : {},
		...typeof value.protectionId === "string" && value.protectionId ? { protectionId: value.protectionId } : {},
		...ruleNames?.length ? { ruleNames } : {}
	};
}
function restoreCiphertextRanges(text, mappings) {
	const items = [];
	let cursor = 0;
	let restored = "";
	while (cursor < text.length) {
		const match = mappings.map((mapping) => ({
			mapping,
			index: text.indexOf(mapping.ciphertext, cursor)
		})).filter((candidate) => candidate.index >= 0).sort((left, right) => left.index - right.index || right.mapping.ciphertext.length - left.mapping.ciphertext.length)[0];
		if (!match) break;
		restored += text.slice(cursor, match.index);
		const start = restored.length;
		restored += match.mapping.plaintext;
		items.push({
			start,
			end: restored.length,
			ciphertext: match.mapping.ciphertext,
			...match.mapping.protectionId ? { protectionId: match.mapping.protectionId } : {},
			...match.mapping.ruleNames ? { ruleNames: match.mapping.ruleNames } : {}
		});
		cursor = match.index + match.mapping.ciphertext.length;
	}
	restored += text.slice(cursor);
	return {
		text: restored,
		meta: { sensitiveProtection: {
			version: 2,
			items
		} }
	};
}
function failClosed(text) {
	return {
		text,
		meta: { sensitiveProtection: {
			version: 2,
			items: []
		} }
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/persisted-transcript-projector.ts
/**
* 历史投影里携带的 `mcpUi.html` 上限。
*
* 该 payload 会跟着每个 HistoryRequestDTO 走 RPC，比 broadcast 的一次性 256KB
* 更敏感；超限时只保留 `toolResourceUri`，Host 回放走 `resources/read` 重取。
*/
var MAX_PROJECTED_MCP_UI_HTML_BYTES = 65536;
/** Projects persisted CBC JSONL records into SDK-compatible session updates. */
function projectPersistedTranscriptItems(items, options = {}) {
	return mergeToolCallInputs(items.flatMap((item) => projectPersistedTranscriptItem(item, options)));
}
/** Derives terminal status from a child transcript without treating its spawn result as completion. */
function derivePersistedTranscriptStatus(items) {
	let terminal;
	for (const item of items) if (isCancellation(item)) terminal = "killed";
	else if (isFailure(item)) terminal = "failed";
	else if (isTranscriptProgress(item) || isPersistedAssistantProgress(item) || isVisibleUserTurn(item)) terminal = void 0;
	else if (item.type === "message" && item.role === "assistant" && extractText(item.content).trim()) terminal = "completed";
	return terminal;
}
function projectPersistedTranscriptItem(item, options) {
	if (shouldDropPersistedTranscriptItem(item, options)) {
		const providerData = isRecord(item.providerData) ? item.providerData : void 0;
		if (options.includeAssistantContentBoundaries && (providerData?.isCompactInternal === true || typeof providerData?.compactType === "string" || require_conversations.isLegacyCompactSummaryContent(item.content) || require_conversations.isLegacyCompactUserPromptContent(item.content))) return [{ sessionUpdate: "assistant_content_boundary" }];
		return [];
	}
	const timestamp = readTimestamp$2(item);
	const messageId = readMessageId(item);
	if (item._compactTruncated && (item.type === "function_call_result" || item.type === "function_call_output")) {
		const toolCallId = readString(item.callId) ?? readString(item.id);
		const pd = isRecord(item.providerData) ? item.providerData : void 0;
		const toolResult = pd && isRecord(pd.toolResult) ? pd.toolResult : void 0;
		const title = readString(toolResult?.title) ?? "";
		const preview = typeof item.content === "string" ? item.content : typeof toolResult?.content === "string" ? toolResult.content : "";
		return [{
			sessionUpdate: "tool_call_update",
			...toolCallId ? { toolCallId } : {},
			status: toToolStatus(item.status),
			rawOutput: { result: preview || "[Content too large — click to expand]" },
			...timestamp ? { timestamp } : {},
			_meta: {
				"codebuddy.ai/compactTruncated": true,
				"codebuddy.ai/originalBytes": item._originalBytes,
				...title ? { "codebuddy.ai/toolResultTitle": title } : {}
			}
		}];
	}
	if (item.type === "message" && item.role === "user" && item._compactTruncated) throw new require_conversations.HistoryIncompleteError("[LocalConversationHistorySource] oversized user record reached projection before hydration");
	if (item.type === "message" && item.role === "user") {
		const steerMeta = require_conversations.readSteerClientMeta(item);
		if (steerMeta) {
			const projected = projectUserMessage(item.content, void 0, void 0, item);
			const projectedBlocks = projected.map((update) => update.content).filter(isRecord);
			const metaBlocks = steerMeta.contentBlocks?.filter(isRecord) ?? [];
			const blocks = metaBlocks.length > 0 ? metaBlocks : projectedBlocks;
			const text = projected.map((update) => extractText(update.content)).join("").trim();
			return text || blocks.length > 0 ? [{
				sessionUpdate: "queue_guidance",
				content: {
					type: require_conversations.QUEUE_GUIDANCE_BLOCK_TYPE,
					queueItemId: steerMeta.queueItemId,
					text,
					blocks,
					status: "injected",
					...steerMeta.queueAcceptedAt !== void 0 ? { queueAcceptedAt: steerMeta.queueAcceptedAt } : {},
					...timestamp !== void 0 ? { timestamp } : {}
				}
			}] : [];
		}
		return projectUserMessage(item.content, messageId, timestamp, item);
	}
	if (item.type === "message" && item.role === "assistant") {
		const projection = projectSensitiveReplayText(extractText(item.content).trim(), item);
		return projection.text ? [{
			sessionUpdate: "agent_message_chunk",
			...messageId ? { messageId } : {},
			content: {
				type: "text",
				text: projection.text,
				...projection.meta ? { _meta: projection.meta } : {}
			},
			...timestamp ? { timestamp } : {}
		}] : [];
	}
	if (item.type === "reasoning") {
		const projection = projectSensitiveReplayText(extractReasoningText(item), item);
		return projection.text ? [{
			sessionUpdate: "agent_thought_chunk",
			...messageId ? { messageId } : {},
			content: {
				type: "text",
				text: projection.text,
				...projection.meta ? { _meta: projection.meta } : {}
			},
			...timestamp ? { timestamp } : {},
			...messageId ? { _meta: { "codebuddy.ai/messageId": messageId } } : {}
		}] : [];
	}
	if (item.type === "function_call") {
		const toolName = readString(item.name) ?? "tool";
		const toolCallId = readString(item.callId) ?? readString(item.id);
		return [{
			sessionUpdate: "tool_call",
			...toolCallId ? { toolCallId } : {},
			status: toToolStatus(item.status),
			toolName,
			title: toolName,
			kind: "other",
			rawInput: item._compactTruncated ? { _compactTruncated: true } : parseRecord(item.arguments, "arguments"),
			...timestamp ? { timestamp } : {},
			_meta: {
				"codebuddy.ai/toolName": toolName,
				...item._compactTruncated ? { "codebuddy.ai/compactTruncated": true } : {}
			}
		}];
	}
	if (item.type === "function_call_result" || item.type === "function_call_output") {
		const toolCallId = readString(item.callId) ?? readString(item.id);
		const rawResponse = extractRawResponse(item);
		const mcpUi = extractPersistedMcpUi(item);
		const meta = {
			...rawResponse ? { "codebuddy.ai/rawResponse": rawResponse } : {},
			...mcpUi ? { "codebuddy.ai": { toolMetaData: { mcpUi } } } : {}
		};
		return [{
			sessionUpdate: "tool_call_update",
			...toolCallId ? { toolCallId } : {},
			status: toToolStatus(item.status),
			rawOutput: parseRecord(item.output, "output"),
			...timestamp ? { timestamp } : {},
			...Object.keys(meta).length > 0 ? { _meta: meta } : {}
		}];
	}
	return [];
}
function projectUserMessage(content, messageId, timestamp, sensitiveSource) {
	const shouldPreserveMessageId = typeof content === "string";
	const persistedContent = typeof content === "string" ? [{
		type: shouldDecodePersistedText(content) ? "input_text" : "text",
		text: content
	}] : content;
	if (!Array.isArray(persistedContent)) return [];
	const decodableContent = persistedContent.map((block) => {
		if (!isRecord(block) || typeof block.text !== "string") return block;
		const text = projectSensitiveReplayText(repairLegacyAutoAttachedDesignSkills(preservePromptContextForDecode(block.text)), sensitiveSource).text;
		const displayBlock = { ...block };
		delete displayBlock.__codebuddyLocal;
		return {
			...displayBlock,
			...block.type === "text" && shouldDecodePersistedText(block.text) ? { type: "input_text" } : {},
			text
		};
	});
	return require_conversations.decodePersistedUserContentToAcpContentBlocks(decodableContent).map((block) => ({
		sessionUpdate: "user_message_chunk",
		...shouldPreserveMessageId && messageId ? { messageId } : {},
		content: { ...block },
		...timestamp ? { timestamp } : {}
	}));
}
function shouldDecodePersistedText(text) {
	return text.includes("<user_query>") || /<system-reminder\b/i.test(text) || text.includes("@long-text:") && text.includes("<long_text_quote>");
}
function mergeToolCallInputs(history) {
	const callsById = /* @__PURE__ */ new Map();
	for (const entry of history) {
		const toolCallId = readString(entry.toolCallId);
		if (toolCallId && entry.sessionUpdate === "tool_call") callsById.set(toolCallId, entry);
	}
	const seenUpdates = /* @__PURE__ */ new Set();
	return history.flatMap((entry) => {
		const toolCallId = readString(entry.toolCallId);
		if (!toolCallId) return [entry];
		if (entry.sessionUpdate === "tool_call") return seenUpdates.has(toolCallId) ? [] : [entry];
		if (entry.sessionUpdate !== "tool_call_update") return [entry];
		seenUpdates.add(toolCallId);
		const call = callsById.get(toolCallId);
		if (!call) return [entry];
		const meta = mergeRecords(call._meta, entry._meta);
		return [{
			...entry,
			...entry.rawInput === void 0 && call.rawInput !== void 0 ? { rawInput: call.rawInput } : {},
			...entry.title === void 0 && call.title !== void 0 ? { title: call.title } : {},
			...entry.kind === void 0 && call.kind !== void 0 ? { kind: call.kind } : {},
			...entry.locations === void 0 && call.locations !== void 0 ? { locations: call.locations } : {},
			...entry.toolName === void 0 && call.toolName !== void 0 ? { toolName: call.toolName } : {},
			...meta ? { _meta: meta } : {}
		}];
	});
}
function isPreservedPrompt(item, options) {
	return options.preserveMetaRecordId !== void 0 && readString(item.id) === options.preserveMetaRecordId;
}
/**
* 判断持久化记录是否会在 transcript 投影前被丢弃。
*
* HistorySource 在补读超大 user record 前复用该判定，避免为最终不可见的 compact/meta
* 脚手架消耗页级 hydration 预算；投影层仍保留同一防线，防止 compact preview 泄露。
*/
function shouldDropPersistedTranscriptItem(item, options = {}) {
	const preserveMeta = isPreservedPrompt(item, options);
	const providerData = isRecord(item.providerData) ? item.providerData : void 0;
	if (item.type === "message" && item.role === "user" && providerData?.isMeta === true && !preserveMeta || providerData?.isCompactInternal === true || typeof providerData?.compactType === "string") return true;
	const content = item.content;
	const text = extractText(content).trim();
	if (item.role === "user" && require_conversations.isLegacyCompactUserPromptContent(stripSystemTags(text))) return true;
	if ((item.role === "assistant" || item.role === "agent") && require_conversations.isLegacyCompactSummaryContent(content)) return true;
	return /^<system-reminder\b[^>]*data-role=["']compact-summary["']/i.test(text);
}
/** Saved partial text is progress, not evidence that its owning turn completed. */
function isPersistedAssistantProgress(item) {
	const status = normalizeStatus(item.status);
	return item.type === "message" && item.role === "assistant" && (status === "in_progress" || status === "streaming" || status === "pending");
}
function isTranscriptProgress(item) {
	return item.type === "reasoning" || item.type === "function_call" || item.type === "function_call_result" || item.type === "function_call_output";
}
function isVisibleUserTurn(item) {
	return item.type === "message" && item.role === "user" && item._compactTruncated !== true && stripSystemTags(extractText(item.content)).trim().length > 0;
}
function isCancellation(item) {
	const status = normalizeStatus(item.status);
	const error = isRecord(item.error) ? item.error : void 0;
	const providerData = isRecord(item.providerData) ? item.providerData : void 0;
	const providerError = providerData && isRecord(providerData.error) ? providerData.error : void 0;
	const codes = [
		error?.code,
		error?.status,
		providerError?.code,
		providerError?.status,
		item.code
	];
	return status === "cancelled" || status === "canceled" || status === "killed" || codes.some((code) => Number(code) === 499);
}
function isFailure(item) {
	const status = normalizeStatus(item.status);
	return status === "failed" || status === "error" || status === "incomplete";
}
function extractRawResponse(item) {
	const providerData = isRecord(item.providerData) ? item.providerData : void 0;
	const toolResult = providerData && isRecord(providerData.toolResult) ? providerData.toolResult : void 0;
	return isRecord(toolResult?.rawResponse) ? structuredClone(toolResult.rawResponse) : void 0;
}
/**
* 取出 MCP Apps 回放载荷。
*
* 落盘形状见 agent-cli `input-item-processors` 写入的
* `providerData.toolResult.mcpUi`；`toolResourceUri` 是 Host 重建 widget 的最小
* 必需字段，缺它的记录一律不投影。
*/
function extractPersistedMcpUi(item) {
	const providerData = isRecord(item.providerData) ? item.providerData : void 0;
	const toolResult = providerData && isRecord(providerData.toolResult) ? providerData.toolResult : void 0;
	const mcpUi = toolResult && isRecord(toolResult.mcpUi) ? toolResult.mcpUi : void 0;
	if (!mcpUi || !readString(mcpUi.toolResourceUri)) return;
	const projected = structuredClone(mcpUi);
	const html = typeof projected.html === "string" ? projected.html : void 0;
	if (html && Buffer.byteLength(html, "utf8") > MAX_PROJECTED_MCP_UI_HTML_BYTES) delete projected.html;
	return projected;
}
function extractReasoningText(item) {
	return (Array.isArray(item.rawContent) ? item.rawContent : []).filter((block) => isRecord(block) && block.type === "reasoning_text" && typeof block.text === "string").map((block) => String(block.text)).join("").trim();
}
function extractText(value) {
	if (typeof value === "string") return value;
	if (isRecord(value) && typeof value.text === "string") return value.text;
	if (!Array.isArray(value)) return "";
	return value.map((item) => isRecord(item) && (item.type === "text" || item.type === "input_text" || item.type === "output_text") && typeof item.text === "string" ? item.text : "").filter(Boolean).join("\n");
}
function parseRecord(value, wrapKey) {
	if (value === void 0 || value === null || value === "") return;
	if (isRecord(value)) return structuredClone(value);
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return isRecord(parsed) ? parsed : { [wrapKey]: value };
	} catch {
		return { [wrapKey]: value };
	}
	return { [wrapKey]: value };
}
function stripSystemTags(text) {
	return text.replace(/<system-reminder[^>]*>[\s\S]*?<\/system-reminder>\s*/g, "").replace(/<image_local_path>[\s\S]*?<\/image_local_path>\s*/g, "").replace(/<user_query>([\s\S]*?)<\/user_query>/g, "$1").trim();
}
function preservePromptContextForDecode(text) {
	if (!text.includes("<system-reminder") && !text.includes("<user_query>")) return stripSystemTags(text);
	return text.replace(/<image_local_path>[\s\S]*?<\/image_local_path>\s*/g, "");
}
var LEGACY_AUTO_ATTACHED_DESIGN_SKILL_GROUPS = [
	["ardot-design-core", "ardot-ui-design"],
	["ardot-design-core", "ardot-slides"],
	["ardot-design-core", "ardot-poster"],
	["ardot-design-core", "livestream-poster"],
	["ardot-design-core", "ardot-design-to-code"],
	["miora-creative-core", "miora-image-generation"],
	["miora-creative-core", "miora-video-generation"],
	["miora-creative-core", "miora-brand-design"]
];
function removeTrailingSkillSequence(query, skillNames) {
	let repaired = query;
	for (const skillName of [...skillNames].reverse()) {
		const match = new RegExp(`(?:^|\\s)@skill:(?:"${skillName}"|${skillName})\\s*$`, "i").exec(repaired);
		if (!match || match.index === void 0) return;
		repaired = repaired.slice(0, match.index).trimEnd();
	}
	return repaired;
}
/**
* 5.5.5 设计创意链路会把自动附加的 router 或“同族 core + 场景 skill”同时写入
* 隐藏 prompt 与 `<user_query>`。前者是给模型的上下文，后者会在重启回放时被
* 解码成可见 skill 胶囊。
*
* 旧记录已经丢失 resource_link 的 `autoAttached` 元数据，因此只处理已知设计路由
* 组合，且只移除出站编码追加在 user_query 末尾的一个完整序列。router 单独出现时
* 还要求存在 Ardot 设计标记；用户手动选择的前置 token 会继续正常回放。
*/
function repairLegacyAutoAttachedDesignSkills(text) {
	const attachedSection = /<manually_attached_skills>([\s\S]*?)<\/manually_attached_skills>/i.exec(text)?.[1];
	if (!attachedSection) return text;
	const attachedSkillNames = new Set([...attachedSection.matchAll(/(?:^|\r?\n)name:\s*([^\s<]+)\s*(?=\r?\n|$)/gi)].map((match) => match[1]?.toLowerCase()).filter((name) => Boolean(name)));
	const hasArdotDesignMarker = /<(?:ardot_image_gen|ardot_design_style|ardot_file_directive)\b/i.test(text);
	return text.replace(/<user_query>([\s\S]*?)<\/user_query>/i, (wrapped, query) => {
		for (const skillGroup of LEGACY_AUTO_ATTACHED_DESIGN_SKILL_GROUPS) {
			if (!skillGroup.every((skillName) => attachedSkillNames.has(skillName))) continue;
			const repairedQuery = removeTrailingSkillSequence(query, skillGroup);
			if (repairedQuery !== void 0) return `<user_query>${repairedQuery}</user_query>`;
		}
		if (hasArdotDesignMarker && attachedSkillNames.has("design-router")) {
			const repairedQuery = removeTrailingSkillSequence(query, ["design-router"]);
			if (repairedQuery !== void 0) return `<user_query>${repairedQuery}</user_query>`;
		}
		return wrapped;
	});
}
function toToolStatus(value) {
	switch (normalizeStatus(value)) {
		case "completed": return "completed";
		case "in_progress": return "in_progress";
		case "cancelled":
		case "canceled":
		case "killed": return "cancelled";
		case "incomplete":
		case "failed":
		case "error": return "failed";
		default: return "pending";
	}
}
function readMessageId(item) {
	const providerData = isRecord(item.providerData) ? item.providerData : void 0;
	if (item.type === "reasoning" || item.type === "message" && item.role === "assistant") return readString(providerData?.entryId) ?? readString(item.id) ?? readString(providerData?.messageId);
	return readString(providerData?.messageId) ?? readString(item.id);
}
function readTimestamp$2(item) {
	const timestamp = typeof item.timestamp === "number" ? item.timestamp : typeof item.timestamp === "string" ? Date.parse(item.timestamp) : NaN;
	return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : void 0;
}
function readString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function normalizeStatus(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function mergeRecords(left, right) {
	const leftRecord = isRecord(left) ? left : void 0;
	const rightRecord = isRecord(right) ? right : void 0;
	return leftRecord || rightRecord ? {
		...leftRecord ?? {},
		...rightRecord ?? {}
	} : void 0;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-request-projector.ts
/** parentId 链回溯上限，防御自引用或环状 parent 数据。 */
var MAX_PROMPT_CHAIN_HOPS = 32;
/**
* 入口：整份 JSONL 行数组 → UI 用的 Request 列表。
* 数据来源：`records` 已是 parse 后的行，不再读文件。
*/
function projectTranscriptRequests(records) {
	return groupByConversationRequest(records).map((group) => projectRequest(group.requestId, group.records, group.sequence, {
		...group.regenerationSourceRequestId ? { regenerationSourceRequestId: group.regenerationSourceRequestId } : {},
		...group.promptRecordId ? { promptRecordId: group.promptRecordId } : {}
	}));
}
/**
* 一组 JSONL 行打成一张 Request。
*
* 数据来源：
* - `requestId`：分组得到的 turn id（`providerData.conversationRequestId` / user 行 `id` / `legacy-request-N`）
* - `records`：这一轮的全部行
* - 提问时间：提问行顶层 `timestamp`
* - 内容：行先转成类 ACP update，再拆进 user / assistant content
* - usage / 模型 / 署名 / trace：各行 `providerData`，新协议 usage 也可能在行顶层
*/
function projectRequest(requestId, records, requestSeq, options = {}) {
	const projectedRecords = options.excludeSystemTeammateMessages ? records.filter((record) => !isSystemTeammateMessage(record)) : records;
	const promptRecord = options.promptRecordId ? projectedRecords.find((record) => readString$1(record.id) === options.promptRecordId) : void 0;
	const updates = projectPersistedTranscriptItems(projectedRecords, {
		includeAssistantContentBoundaries: true,
		...options.promptRecordId ? { preserveMetaRecordId: options.promptRecordId } : {}
	});
	const timestamp = normalizeProjectedTimestamp(promptRecord?.timestamp) ?? projectedRecords.filter(isRealUserMessage).map((record) => normalizeProjectedTimestamp(record.timestamp)).find((value) => value !== void 0);
	const userContent = [];
	const assistantContent = [];
	const toolContentIndexById = /* @__PURE__ */ new Map();
	const assistantWriters = new require_conversations.AssistantContentWriters();
	updates.forEach((update) => {
		appendProjectedUpdate(update, userContent, assistantContent, toolContentIndexById, assistantWriters);
	});
	const lastOutputTimestamp = [...updates].reverse().filter((update) => update.sessionUpdate === "agent_message_chunk" || update.sessionUpdate === "agent_thought_chunk" || update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update").map((update) => normalizeProjectedTimestamp(update.timestamp)).find((value) => value !== void 0);
	const finishTimestamp = assistantContent.length > 0 && lastOutputTimestamp !== void 0 && (timestamp === void 0 || lastOutputTimestamp >= timestamp) ? lastOutputTimestamp : void 0;
	const state = deriveRequestState(projectedRecords);
	return {
		id: requestId,
		conversationRequestId: requestId,
		...extractTraceId(projectedRecords),
		identity: extractRequestIdentity(requestId, projectedRecords, promptRecord),
		...options.regenerationSourceRequestId ? { regenerationSourceRequestId: options.regenerationSourceRequestId } : {},
		requestSeq,
		...timestamp !== void 0 ? { timestamp } : {},
		...finishTimestamp !== void 0 ? { finishTimestamp } : {},
		userMessage: {
			type: "text",
			content: userContent,
			state: "completed"
		},
		...assistantContent.length > 0 ? { assistantMessage: {
			type: "text",
			contentIdentity: "message",
			content: assistantContent,
			state: resolveAssistantMessageState(state)
		} } : {},
		state,
		...extractUsage(projectedRecords),
		...extractModelInfo(projectedRecords),
		...extractAssistantDisplayMeta(projectedRecords),
		...extractCompletedAt(projectedRecords, state)
	};
}
/**
* 给已投影的 Request 补一句终态文案。
* 数据来源：调用方传入的 `text`（父 agent 结果），不是 JSONL 行。
*/
function appendSyntheticTerminal(request, text) {
	const block = {
		type: "text",
		text,
		historySource: "parent-agent-result"
	};
	if (!request.assistantMessage) {
		request.assistantMessage = {
			type: "text",
			content: [block],
			state: "completed"
		};
		return;
	}
	request.assistantMessage.content.push(block);
	request.assistantMessage.state = "completed";
}
/**
* 把 JSONL 行切成 UI 轮次。
*
* 数据来源：每行 `readConversationRequestId(record)`（优先 `providerData.conversationRequestId`），
* 用户行还可能用顶层 `id`。提问归属靠顶层 `parentId` / `logicalParentId`，不靠相邻行猜测。
*
* 两趟：先按 turn id 收集；再给「有输出但没提问」的组沿 parent 链认领 user 行。
* 写侧用户行常常不带 turn id，只靠内容标记会漏掉 cron / 注入 / compact 续跑。
*
* 不变量：一条 user 行最多当一轮提问；`sequence` 按提问在文件中的位置递增。
*/
function groupByConversationRequest(records, options = {}) {
	const groups = collectRequestGroups(records, options);
	claimPromptRecords(groups, records, options);
	assignAutomaticContinuationSources(groups, records);
	return groups.filter((group) => group.records.length > 0).sort((left, right) => left.sequence - right.sequence).map(({ requestId, records: groupRecords, sequence, promptRecord, regenerationSourceRequestId }) => {
		const promptRecordId = promptRecord ? readString$1(promptRecord.id) : void 0;
		return {
			requestId,
			records: groupRecords,
			sequence,
			...promptRecordId ? { promptRecordId } : {},
			...regenerationSourceRequestId ? { regenerationSourceRequestId } : {}
		};
	});
}
/**
* 第一趟：顺序扫每一行，按显式 turn id 或真实 user 行开组。
* 数据来源：当前行的 `readConversationRequestId`、`record.id`、`record.role` / `type`。
*/
function collectRequestGroups(records, options) {
	const groups = [];
	const explicitGroups = /* @__PURE__ */ new Map();
	let suppressedInternalTurn;
	const pendingTeammates = [];
	let current;
	records.forEach((record, index) => {
		const explicitRequestId = readConversationRequestId(record);
		if (options.excludeSystemTeammateMessages && isSystemTeammateMessage(record)) {
			if (!(explicitRequestId ? explicitGroups.get(explicitRequestId) : void 0)?.hasRealUser) suppressedInternalTurn = explicitRequestId ? { requestId: explicitRequestId } : {};
			return;
		}
		if (!options.excludeSystemTeammateMessages && isSystemTeammateMessage(record) && !explicitRequestId) {
			pendingTeammates.push({
				record,
				sequence: index
			});
			return;
		}
		if (isRealUserMessage(record)) {
			suppressedInternalTurn = void 0;
			current = {
				requestId: require_conversations.generateConversationRequestId(explicitRequestId ?? readString$1(record.id) ?? `legacy-request-${index + 1}`),
				...explicitRequestId ? { explicitRequestId } : {},
				records: [...pendingTeammates.map((pending) => pending.record), record],
				sequence: pendingTeammates[0]?.sequence ?? index,
				hasRealUser: true,
				promptRecord: record
			};
			pendingTeammates.length = 0;
			groups.push(current);
			if (explicitRequestId) explicitGroups.set(explicitRequestId, current);
			return;
		}
		if (options.excludeSystemTeammateMessages && suppressedInternalTurn) {
			if (!(explicitRequestId !== void 0 && explicitRequestId !== suppressedInternalTurn.requestId && explicitGroups.get(explicitRequestId)?.hasRealUser === true)) return;
			suppressedInternalTurn = void 0;
		}
		if (explicitRequestId) {
			const existing = explicitGroups.get(explicitRequestId);
			if (existing) current = existing;
			else if (current && !current.explicitRequestId && pendingTeammates.length === 0) {
				current.requestId = explicitRequestId;
				current.explicitRequestId = explicitRequestId;
				explicitGroups.set(explicitRequestId, current);
			} else if (current && pendingTeammates.length === 0 && continuesCurrentRequestThroughCompact(record, current)) explicitGroups.set(explicitRequestId, current);
			else {
				current = {
					requestId: explicitRequestId,
					explicitRequestId,
					records: [],
					sequence: pendingTeammates[0]?.sequence ?? index,
					hasRealUser: false
				};
				groups.push(current);
				explicitGroups.set(explicitRequestId, current);
			}
			if (pendingTeammates.length > 0) {
				current.records.push(...pendingTeammates.map((pending) => pending.record));
				pendingTeammates.length = 0;
			}
		}
		if (current) current.records.push(record);
	});
	return groups;
}
/**
* 带新 turn id 的行是否仍属当前轮的 compact 续跑。
* 数据来源：本行和组内行的顶层 `parentId` / `logicalParentId`，以及 `providerData.isCompactInternal`。
* 不用「上一行是谁」猜测。出现新的真实 user 行时 `current` 已切轮，下一问不会并回旧轮。
*/
function continuesCurrentRequestThroughCompact(record, current) {
	if (!current.hasRealUser || current.records.length === 0) return false;
	const currentById = /* @__PURE__ */ new Map();
	for (const currentRecord of current.records) {
		const id = readString$1(currentRecord.id);
		if (id && !currentById.has(id)) currentById.set(id, currentRecord);
	}
	let crossedCompactRecord = isCompactInternalRecord(record);
	const pending = [readString$1(record.parentId), readString$1(record.logicalParentId)].filter((id) => id !== void 0);
	const seen = /* @__PURE__ */ new Set();
	while (pending.length > 0 && seen.size < MAX_PROMPT_CHAIN_HOPS) {
		const id = pending.shift();
		if (seen.has(id)) continue;
		seen.add(id);
		const ancestor = currentById.get(id);
		if (!ancestor) continue;
		crossedCompactRecord ||= isCompactInternalRecord(ancestor);
		if (crossedCompactRecord) return true;
		const parentId = readString$1(ancestor.parentId);
		const logicalParentId = readString$1(ancestor.logicalParentId);
		if (parentId) pending.push(parentId);
		if (logicalParentId) pending.push(logicalParentId);
	}
	return false;
}
/**
* 是否 compact 内部行。
* 数据来源：`record.providerData.isCompactInternal` 或 `providerData.compactType`。
*/
function isCompactInternalRecord(record) {
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	return providerData?.isCompactInternal === true || typeof providerData?.compactType === "string";
}
/**
* 给没有提问的组认领 user 行。
* 数据来源：组内行 → 首条输出行的 `parentId` / `logicalParentId` 链 → 文件里更靠前的未认领 user 行。
* 认领后把该行从别的组挪走，并用它在 JSONL 中的下标当 `sequence`。
*/
function claimPromptRecords(groups, records, options) {
	const pending = groups.filter((group) => !group.promptRecord);
	if (pending.length === 0) return;
	const byId = /* @__PURE__ */ new Map();
	const indexOf = /* @__PURE__ */ new Map();
	records.forEach((record, index) => {
		indexOf.set(record, index);
		const id = readString$1(record.id);
		if (id !== void 0 && !byId.has(id)) byId.set(id, record);
	});
	const claimed = new Set(groups.map((group) => group.promptRecord).filter((record) => record !== void 0));
	for (const group of pending) {
		const anchor = group.records[0];
		if (!anchor) continue;
		const resolved = resolvePrompt(group, anchor, {
			records,
			byId,
			claimed,
			anchorIndex: indexOf.get(anchor) ?? 0
		});
		if (!resolved) {
			options.onAnomaly?.({
				kind: "prompt-unresolved",
				requestId: group.requestId
			});
			continue;
		}
		claimed.add(resolved.record);
		transferPrompt(groups, group, resolved.record, indexOf);
		options.onAnomaly?.({
			kind: "prompt-recovered",
			requestId: group.requestId,
			via: resolved.via
		});
	}
}
/**
* 给一组找提问行。阶梯：组内候选 → parent 链 → 向前就近扫描。
* 数据来源：`group.records`、`anchor.parentId`、整份 `records` 数组下标。
*/
function resolvePrompt(group, anchor, context) {
	const fromGroup = group.records.find((record) => isPromptCandidate(record) && !context.claimed.has(record));
	if (fromGroup) return {
		record: fromGroup,
		via: "group"
	};
	const fromChain = resolvePromptByChain(anchor, context.byId, context.claimed);
	if (fromChain) return {
		record: fromChain,
		via: "chain"
	};
	const nearby = resolvePromptByProximity(context.records, context.anchorIndex, context.claimed);
	return nearby ? {
		record: nearby,
		via: "proximity"
	} : void 0;
}
/**
* 这行能不能当提问。
* 数据来源：顶层 `type`/`role`；排除 teammate、`<task-notification>`、steer。
* `providerData.isAdditionalData` / `startsNewUserRequest` 只作附加过滤。
* 刻意接受 `skipRun` / `isMeta` / `isCompactInternal`：那些只说明「别当普通输入展示」，
* 不能证明没开新轮。task-notification 不是提问，改由续跑回指根轮。
*/
function isPromptCandidate(record) {
	if (record.type !== "message" || record.role !== "user") return false;
	if (isSystemTeammateMessage(record)) return false;
	if (isTaskNotificationMessage(record)) return false;
	if (require_conversations.isSteerUserMessage(record)) return false;
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	return providerData?.isAdditionalData !== true && providerData?.startsNewUserRequest !== false;
}
/**
* 从本轮首条输出沿 parent 链找回提问。
* 数据来源：`anchor.parentId` / `logicalParentId`，用整份文件的 `id → record` 索引跳行。
*/
function resolvePromptByChain(anchor, byId, claimed) {
	const seen = /* @__PURE__ */ new Set();
	let cursor = readString$1(anchor.parentId) ?? readString$1(anchor.logicalParentId);
	while (cursor !== void 0 && !seen.has(cursor) && seen.size < MAX_PROMPT_CHAIN_HOPS) {
		seen.add(cursor);
		const candidate = byId.get(cursor);
		if (!candidate) return;
		if (isPromptCandidate(candidate)) return claimed.has(candidate) ? void 0 : candidate;
		cursor = readString$1(candidate.parentId) ?? readString$1(candidate.logicalParentId);
	}
}
/**
* parent 断链时的兜底：从 anchor 在文件中的位置向前扫最近未认领 user 行。
* 数据来源：整份 `records` 数组下标，不是 `providerData`。扫到已认领提问即停。
*/
function resolvePromptByProximity(records, anchorIndex, claimed) {
	for (let index = anchorIndex - 1; index >= 0; index -= 1) {
		const candidate = records[index];
		if (claimed.has(candidate)) return;
		if (isPromptCandidate(candidate)) return candidate;
	}
}
/**
* 把已认领的提问行迁入目标组。
* 数据来源：`prompt` 是 JSONL 里的同一行对象；`sequence` 用该行在文件中的下标。
*/
function transferPrompt(groups, target, prompt, indexOf) {
	for (const group of groups) {
		if (group === target) continue;
		const at = group.records.indexOf(prompt);
		if (at >= 0) group.records.splice(at, 1);
	}
	if (!target.records.includes(prompt)) target.records.unshift(prompt);
	target.promptRecord = prompt;
	const sequence = indexOf.get(prompt);
	if (sequence !== void 0) target.sequence = sequence;
}
/**
* 给没有可见提问的自动续跑轮回指根用户 Request。
* 数据来源：组内首行沿 parent 链找到的 `<task-notification>` 正文，或通知之后的真实 user 行。
*/
function assignAutomaticContinuationSources(groups, records) {
	const byId = /* @__PURE__ */ new Map();
	records.forEach((record) => {
		const id = readString$1(record.id);
		if (id && !byId.has(id)) byId.set(id, record);
	});
	for (const group of groups) {
		if (group.hasRealUser || group.records.length === 0) continue;
		group.regenerationSourceRequestId = resolveAutomaticContinuationSource(group, groups, byId);
	}
}
/**
* 解析续跑轮该回到哪一轮。
* 数据来源：通知正文里的 tool-use-id（对组内行的 `callId` / `toolCallId`），否则 parent 链上的根 user 行。
*/
function resolveAutomaticContinuationSource(target, groups, byId) {
	const anchor = target.records[0];
	if (!anchor) return;
	const notification = findTaskNotificationAncestor(anchor, byId);
	const toolCallId = notification ? require_conversations.readTaskNotificationToolCallId(extractText$1(notification.content)) : void 0;
	if (toolCallId) {
		const owners = groups.filter((group) => group !== target && group.records.some((record) => readToolCallId(record) === toolCallId));
		if (owners.length === 1) return owners[0].regenerationSourceRequestId ?? owners[0].requestId;
		if (owners.length > 1) return;
	}
	const prompt = findRootPromptAfterNotification(anchor, byId);
	if (!prompt) return;
	const owner = groups.find((group) => group !== target && group.records.includes(prompt));
	return owner?.regenerationSourceRequestId ?? owner?.requestId;
}
/**
* 从本行沿 parent 链找 `<task-notification>` 行。
* 数据来源：当前行或祖先行的 `providerData.isMeta` + `content` 文本前缀。
*/
function findTaskNotificationAncestor(anchor, byId) {
	if (isTaskNotificationMessage(anchor)) return anchor;
	return walkParentChain(anchor, byId, (candidate) => isTaskNotificationMessage(candidate));
}
/**
* 穿过 task-notification 后再找真实 user 行。
* 数据来源：顶层 `parentId` 链上的 `type`/`role`，以及通知行的 `providerData.isMeta`。
*/
function findRootPromptAfterNotification(anchor, byId) {
	let passedNotification = false;
	return walkParentChain(anchor, byId, (candidate) => {
		if (isTaskNotificationMessage(candidate)) {
			passedNotification = true;
			return false;
		}
		return passedNotification && isRealUserMessage(candidate);
	});
}
/**
* 沿顶层 `parentId` / `logicalParentId` 跳行。`byId` 的 key 是各行 `id`。
* 断链或环就停，不猜相邻行。
*/
function walkParentChain(anchor, byId, matches) {
	const seen = /* @__PURE__ */ new Set();
	let cursor = readString$1(anchor.parentId) ?? readString$1(anchor.logicalParentId);
	while (cursor && !seen.has(cursor) && seen.size < byId.size) {
		seen.add(cursor);
		const candidate = byId.get(cursor);
		if (!candidate) return;
		if (matches(candidate)) return candidate;
		cursor = readString$1(candidate.parentId) ?? readString$1(candidate.logicalParentId);
	}
}
/**
* 是否后台任务通知行。
* 数据来源：`providerData.isMeta === true`，且顶层 `content` 以 `<task-notification>` 开头。
*/
function isTaskNotificationMessage(record) {
	return (isRecord$7(record.providerData) ? record.providerData : void 0)?.isMeta === true && extractText$1(record.content).trimStart().startsWith("<task-notification>");
}
/**
* 读工具调用 id。
* 数据来源：顶层 `toolCallId` / `callId`，否则 `providerData` 同名字段。
*/
function readToolCallId(record) {
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	return readString$1(record.toolCallId) ?? readString$1(record.callId) ?? readString$1(providerData?.toolCallId) ?? readString$1(providerData?.callId);
}
/**
* 读这一行所属的 turn id。不读 `record.id`（那是 entry / ACP messageId）。
*
* 数据来源，从新到旧：
* 1. `record.providerData.conversationRequestId` — 现行字段
* 2. `record.providerData.requestId` — 旧 turn 别名
* 3. `record.conversationRequestId` — 少数行写在顶层
* 4. `record.requestId` — 更老的顶层别名
*
* 四个都没有（很老的 user 行常见）返回 undefined，由分轮退到 `record.id` / `legacy-request-N`。
*/
function readConversationRequestId(record) {
	if (!record) return;
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	return require_conversations.readPersistedConversationRequestId(providerData?.conversationRequestId) ?? require_conversations.readPersistedConversationRequestId(providerData?.requestId) ?? require_conversations.readPersistedConversationRequestId(record.conversationRequestId) ?? require_conversations.readPersistedConversationRequestId(record.requestId);
}
/**
* 本轮身份。
* 数据来源：`requestId` 是分组 turn id；`forkMessageId` 是提问行顶层 `id`（否则 `messageId`）。
*/
function extractRequestIdentity(requestId, records, promptRecord) {
	const userRecord = promptRecord ?? records.find(isRealUserMessage);
	const forkMessageId = userRecord && (require_conversations.readPersistedAcpMessageId(userRecord.id) ?? require_conversations.readPersistedAcpMessageId(userRecord.messageId));
	return {
		requestId,
		...forkMessageId ? { forkMessageId } : {},
		forkRequestId: requestId
	};
}
/**
* 这行是否取消证据。
* 数据来源：顶层 `status` / `error` / `code`、`providerData.error`，以及 CLI 标准用户中断记录。
* 499 视为取消；普通正文不得参与判断。
*/
function isCancelledRecord(record) {
	const status = normalizeStatus$1(record.status);
	const error = isRecord$7(record.error) ? record.error : void 0;
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	const providerError = providerData && isRecord$7(providerData.error) ? providerData.error : void 0;
	const codes = [
		error?.code,
		error?.status,
		providerError?.code,
		providerError?.status,
		record.code
	];
	const isUserInterrupted = record.type === "message" && record.role === "assistant" && status === "incomplete" && providerData?.skipRun === true && extractText$1(record.content) === "Interrupted by user";
	return status === "cancelled" || status === "canceled" || status === "killed" || codes.some((code) => Number(code) === 499) || isUserInterrupted;
}
/**
* 这行是否失败证据。
* 数据来源：顶层 `status`（failed / error / incomplete）。
*/
function isFailedRecord(record) {
	const status = normalizeStatus$1(record.status);
	return status === "failed" || status === "error" || status === "incomplete";
}
/**
* 把已转成 ACP 形态的 update 拼进 user / assistant content。
* 数据来源：`projectPersistedTranscriptItems` 的输出，不是原始 JSONL 行。
* 工具块按 `toolCallId` 合并。
*/
function appendProjectedUpdate(update, userContent, assistantContent, toolContentIndexById, assistantWriters) {
	if (update.sessionUpdate === "assistant_content_boundary") {
		assistantWriters.clear();
		return;
	}
	if (update.sessionUpdate === "queue_guidance") {
		if (isRecord$7(update.content) && update.content.type === "queue-guidance") {
			if (update.content.status === "injected") assistantWriters.clear();
			assistantContent.push({ ...update.content });
		}
		return;
	}
	if (update.sessionUpdate === "user_message_chunk") {
		if (!isRecord$7(update.content) || typeof update.content.type !== "string") return;
		if (update.content.type === "text") {
			const text = typeof update.content.text === "string" ? update.content.text : "";
			if (text.trim()) userContent.push({
				...update.content,
				text,
				...messageIdentity(update)
			});
			return;
		}
		userContent.push({
			...update.content,
			...messageIdentity(update)
		});
		return;
	}
	if (update.sessionUpdate === "agent_message_chunk" || update.sessionUpdate === "agent_thought_chunk") {
		const text = extractText$1(update.content);
		if (text) {
			const sourceContent = isRecord$7(update.content) ? update.content : {};
			const type = update.sessionUpdate === "agent_thought_chunk" ? "reasoning" : "text";
			const messageId = readString$1(update.messageId);
			const index = assistantWriters.get(type, messageId);
			const target = index !== void 0 ? assistantContent[index] : void 0;
			if (target && typeof target.text === "string") {
				const meta = require_conversations.mergeTextBlockMeta(require_conversations.readContentBlockMeta(target), require_conversations.readContentBlockMeta(sourceContent), target.text.length);
				target.text += text;
				if (meta) target._meta = meta;
				return;
			}
			assistantWriters.set(type, messageId, assistantContent.length);
			assistantContent.push({
				...sourceContent,
				type,
				text,
				...messageIdentity(update)
			});
		}
		return;
	}
	if (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update") {
		const usage = extractProjectedToolUsage(update);
		const next = {
			type: "tool",
			...update,
			...usage ? { usage } : {}
		};
		const toolCallId = readString$1(update.toolCallId);
		if (!toolCallId) {
			assistantWriters.closeAnonymousBefore(assistantContent.length);
			assistantContent.push(next);
			return;
		}
		const existingIndex = toolContentIndexById.get(toolCallId);
		if (existingIndex === void 0) {
			assistantWriters.closeAnonymousBefore(assistantContent.length);
			toolContentIndexById.set(toolCallId, assistantContent.length);
			assistantContent.push(next);
			return;
		}
		const existing = assistantContent[existingIndex];
		assistantContent[existingIndex] = update.sessionUpdate === "tool_call" && existing?.sessionUpdate === "tool_call_update" ? {
			...next,
			...existing
		} : {
			...existing,
			...next
		};
		assistantWriters.closeAnonymousBefore(existingIndex);
	}
}
/**
* 工具块用量。
* 数据来源：update 上的 `_meta['codebuddy.ai/rawResponse'].usage`，否则 `rawOutput.usage`。
*/
function extractProjectedToolUsage(update) {
	const meta = isRecord$7(update._meta) ? update._meta : void 0;
	const rawResponse = meta && isRecord$7(meta["codebuddy.ai/rawResponse"]) ? meta["codebuddy.ai/rawResponse"] : void 0;
	const rawOutput = isRecord$7(update.rawOutput) ? update.rawOutput : void 0;
	const result = rawResponse && isRecord$7(rawResponse.result) ? rawResponse.result : rawResponse;
	let usage;
	if (result && isRecord$7(result.usage)) usage = result.usage;
	else if (rawOutput && isRecord$7(rawOutput.usage)) usage = rawOutput.usage;
	return require_conversations.normalizeToolUsage(usage, readString$1(update.toolCallId));
}
/**
* 本轮终态。
* 数据来源：组内各行顶层 `status` / 取消码；`type` 为 reasoning / function_call* 视为仍在进行。
*/
function deriveRequestState(records) {
	let terminalState;
	for (const record of records) if (isCancelledRecord(record)) terminalState = "cancelled";
	else if (isFailedRecord(record)) terminalState = "error";
	else if (isTurnProgressRecord(record)) terminalState = void 0;
	else if (isCompletedRecord(record)) terminalState = "completed";
	return terminalState ?? "streaming";
}
/**
* 这行是否完成证据。
* 数据来源：顶层 `status === completed`，或 `type=message && role=assistant` 且 `content` 有文本。
*/
function isCompletedRecord(record) {
	return normalizeStatus$1(record.status) === "completed" || record.type === "message" && record.role === "assistant" && Boolean(extractText$1(record.content));
}
/**
* 这行是否说明本轮还在跑。
* 数据来源：顶层 `type`（reasoning / function_call / function_call_result / function_call_output）。
*/
function isTurnProgressRecord(record) {
	return isPersistedAssistantProgress(record) || record.type === "reasoning" || record.type === "function_call" || record.type === "function_call_result" || record.type === "function_call_output";
}
/**
* assistantMessage.state 跟 Request.state 对齐。
* 数据来源：已推导的 Request 终态，不是 JSONL 新字段。
*/
function resolveAssistantMessageState(state) {
	if (state === "error") return "error";
	if (state === "streaming") return "streaming";
	return "completed";
}
/**
* 把行上的时间收成毫秒数。
* 数据来源：通常是顶层 `timestamp`（number 或可 parse 的字符串）。
*/
function normalizeProjectedTimestamp(value) {
	const numeric = typeof value === "string" && value.trim() ? Number(value) : value;
	const timestamp = typeof numeric === "number" && Number.isFinite(numeric) ? numeric : typeof value === "string" ? Date.parse(value) : NaN;
	return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : void 0;
}
/**
* 本轮用量。
* 数据来源：各行 `providerData.usage` / `providerData.rawUsage.credit`；
* 新协议也可能是顶层 `sessionUpdate=usage_update` 的 `used`/`size`/`cost` 和 `_meta.usage`。
*/
function extractUsage(records) {
	let latestUsage;
	let totalCredit = 0;
	let hasCredit = false;
	const seenStageIds = /* @__PURE__ */ new Set();
	for (const record of records) {
		const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
		if (providerData && isRecord$7(providerData.usage)) latestUsage = providerData.usage;
		if (record.sessionUpdate === "usage_update") {
			const used = typeof record.used === "number" ? record.used : void 0;
			const size = typeof record.size === "number" ? record.size : void 0;
			if (used !== void 0 || size !== void 0) {
				const meta = isRecord$7(record._meta) ? record._meta : void 0;
				const rawMetaUsage = meta && isRecord$7(meta.usage) ? meta.usage : void 0;
				const outputTokens = rawMetaUsage ? typeof rawMetaUsage.completion_tokens === "number" ? rawMetaUsage.completion_tokens : typeof rawMetaUsage.output_tokens === "number" ? rawMetaUsage.output_tokens : void 0 : void 0;
				const byCategory = meta?.["codebuddy.ai/usageByCategory"];
				const usageByCategoryObj = isRecord$7(byCategory) ? { byCategory: {
					systemPrompt: typeof byCategory.systemPrompt === "number" ? byCategory.systemPrompt : 0,
					conversation: typeof byCategory.conversation === "number" ? byCategory.conversation : 0,
					tools: typeof byCategory.tools === "number" ? byCategory.tools : 0,
					mcp: typeof byCategory.mcp === "number" ? byCategory.mcp : 0,
					skills: typeof byCategory.skills === "number" ? byCategory.skills : 0,
					version: typeof byCategory.version === "number" ? byCategory.version : 1
				} } : {};
				latestUsage = {
					inputTokens: used ?? 0,
					outputTokens: outputTokens ?? 0,
					totalTokens: used,
					...size !== void 0 ? { contextWindow: size } : {},
					...usageByCategoryObj
				};
			}
		}
		const rawUsage = providerData && isRecord$7(providerData.rawUsage) ? providerData.rawUsage : void 0;
		if (typeof rawUsage?.credit === "number" && isFinite(rawUsage.credit) && rawUsage.credit >= 0) {
			const stageId = readString$1(record.id) ?? readString$1(record.messageId) ?? "";
			if (!stageId || !seenStageIds.has(stageId)) {
				if (stageId) seenStageIds.add(stageId);
				totalCredit += rawUsage.credit;
				hasCredit = true;
			}
		}
		if (record.sessionUpdate === "usage_update") {
			const cost = isRecord$7(record.cost) ? record.cost : void 0;
			if (cost && typeof cost.amount === "number" && isFinite(cost.amount) && cost.amount >= 0) {
				const stageId = readString$1(record.id) ?? readString$1(record.messageId) ?? "";
				if (!stageId || !seenStageIds.has(stageId)) {
					if (stageId) seenStageIds.add(stageId);
					totalCredit += cost.amount;
					hasCredit = true;
				}
			}
		}
	}
	if (!latestUsage && !hasCredit) return {};
	const result = { ...latestUsage ?? {} };
	if (hasCredit && !result.cost) result.cost = {
		amount: Math.round(totalCredit * 100) / 100,
		currency: "credit"
	};
	return { usage: result };
}
/**
* 本轮选用 / 实际模型。
* 数据来源：`providerData.requestModelId`/`requestModelName`，
* 以及 `providerData.responseModelId` 或 `providerData.model`。
*/
function extractModelInfo(records) {
	let requestedModel;
	let responseModel;
	for (const record of records) {
		const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
		if (!providerData) continue;
		if (!requestedModel) {
			const reqModelId = readString$1(providerData.requestModelId);
			if (reqModelId) requestedModel = {
				id: reqModelId,
				name: readString$1(providerData.requestModelName) || void 0
			};
		}
		if (!responseModel) {
			const respModelId = readString$1(providerData.responseModelId) ?? readString$1(providerData.model);
			if (respModelId) responseModel = {
				id: respModelId,
				name: readString$1(providerData.responseModelName) || void 0
			};
		}
		if (requestedModel && responseModel) break;
	}
	const result = {};
	if (requestedModel) result.requestedModel = requestedModel;
	if (responseModel) result.responseModel = responseModel;
	return result;
}
/**
* 专家署名。
* 数据来源：任一行 `providerData` 里已落盘的 assistantDisplay / 对应 meta 键。
*/
function extractAssistantDisplayMeta(records) {
	let meta;
	for (const record of records) {
		const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
		if (providerData && !meta) {
			const display = require_conversations.readPersistedAssistantDisplayFromMeta(providerData) ?? require_conversations.sanitizePersistedAssistantDisplay(providerData.assistantDisplay);
			if (display) meta = require_conversations.buildAssistantDisplayRequestMeta(display);
		}
		if (require_conversations.readQuickQaFromMeta(providerData) || require_conversations.readQuickQaFromMeta(record._meta)) meta = require_conversations.mergeQuickQaRequestMeta(meta, true);
	}
	return meta ? { _meta: meta } : {};
}
/**
* 本轮链路 id。
* 数据来源：`providerData.traceId`，否则顶层 `traceId`。
*/
function extractTraceId(records) {
	for (const record of records) {
		const traceId = readString$1((isRecord$7(record.providerData) ? record.providerData : void 0)?.traceId) ?? readString$1(record.traceId);
		if (traceId) return { traceId };
	}
	return {};
}
/**
* 本轮首次进入终态的时间。
* 数据来源：与最终 state 一致的最后一条证据行的顶层 `timestamp`；没有再用组内最后一行时间。
*/
function extractCompletedAt(records, state) {
	if (state === "pending" || state === "streaming") return {};
	for (const record of [...records].reverse()) {
		if (typeof record.timestamp !== "number" || record.timestamp <= 0) continue;
		if (state === "cancelled" ? isCancelledRecord(record) : state === "error" ? isFailedRecord(record) : !isTurnProgressRecord(record) && isCompletedRecord(record)) return { completedAt: record.timestamp };
	}
	for (const record of [...records].reverse()) if (typeof record.timestamp === "number" && record.timestamp > 0) return { completedAt: record.timestamp };
	return {};
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-child-projector.ts
async function projectChildren(input) {
	const invocations = collectAgentInvocations(input.records);
	const explicitMembers = collectExplicitTeamMemberStatus(input.records);
	const teamNamesByRequest = collectTeamNamesByRequest(input.records);
	const teamReactivations = collectTeamReactivations(input.records);
	const classifiedInvocations = invocations.map((invocation) => ({
		invocation,
		classification: classifyInvocation(invocation, explicitMembers, teamNamesByRequest)
	}));
	const teamInvocationCountByMember = /* @__PURE__ */ new Map();
	const teamSpawnsByMember = /* @__PURE__ */ new Map();
	for (const classified of classifiedInvocations) {
		const { classification } = classified;
		if (!classification.isTeamMember || !classification.memberId) continue;
		teamInvocationCountByMember.set(classification.memberId, (teamInvocationCountByMember.get(classification.memberId) ?? 0) + 1);
		teamSpawnsByMember.set(classification.memberId, [...teamSpawnsByMember.get(classification.memberId) ?? [], classified]);
	}
	const reactivationBindings = teamReactivations.map((reactivation) => {
		const priorSpawns = (teamSpawnsByMember.get(reactivation.memberId) ?? []).filter((item) => item.invocation.recordIndex < reactivation.recordIndex);
		return {
			reactivation,
			priorSpawns,
			source: priorSpawns[priorSpawns.length - 1]
		};
	});
	const reactivationsBySourceCall = /* @__PURE__ */ new Map();
	for (const { reactivation, source } of reactivationBindings) {
		if (!source || source.invocation.parentRequestId === reactivation.parentRequestId) continue;
		const callId = source.invocation.callId;
		reactivationsBySourceCall.set(callId, [...reactivationsBySourceCall.get(callId) ?? [], reactivation]);
	}
	const subAgents = [];
	const agentTeams = [];
	const seenOrdinary = /* @__PURE__ */ new Set();
	for (const { invocation, classification } of classifiedInvocations) {
		if (!input.parentIds.has(invocation.parentRequestId)) continue;
		if (classification.isTeamMember) {
			agentTeams.push({
				dto: await buildTeamMemberDTO(invocation, classification, input.childFiles, input.resolveTeamTaskByAssignment, input.resolveTeamTranscriptSummary, teamInvocationCountByMember.get(classification.memberId) === 1, firstTimestamp(reactivationsBySourceCall.get(invocation.callId))),
				recordIndex: invocation.recordIndex
			});
			continue;
		}
		if (!classification.structuredSubAgent) {
			subAgents.push(buildUnstructuredSubAgentDTO(invocation));
			continue;
		}
		await appendOrdinarySubAgent({
			invocation,
			subAgent: classification.structuredSubAgent,
			childFiles: input.childFiles,
			output: subAgents,
			seen: seenOrdinary
		});
	}
	for (const { reactivation, priorSpawns, source } of reactivationBindings) {
		if (!input.parentIds.has(reactivation.parentRequestId)) continue;
		if (priorSpawns.some((item) => item.invocation.parentRequestId === reactivation.parentRequestId)) continue;
		const dto = await buildReactivatedTeamMemberDTO(reactivation, source?.classification, input.childFiles, input.resolveTeamTaskByAssignment, input.resolveTeamTranscriptSummary, nextBoundReactivationTimestamp(reactivation, source ? reactivationsBySourceCall.get(source.invocation.callId) : void 0));
		if (dto) agentTeams.push({
			dto,
			recordIndex: reactivation.recordIndex
		});
	}
	return {
		subAgents,
		agentTeams: agentTeams.sort((left, right) => left.recordIndex - right.recordIndex).map((item) => item.dto)
	};
}
function classifyInvocation(invocation, explicitMembers, teamNamesByRequest) {
	const memberId = readString$1(invocation.input.name);
	const teamName = readString$1(invocation.input.team_name) ?? readString$1(invocation.input.teamName) ?? teamNamesByRequest.get(invocation.parentRequestId);
	const resultTaskId = extractTaskId(invocation.result);
	const matchedExplicit = memberId ? explicitMembers.get(teamMemberKey(invocation.parentRequestId, teamName, memberId)) ?? explicitMembers.get(teamMemberKey(invocation.parentRequestId, void 0, memberId)) ?? explicitMembers.get(teamMemberKey(void 0, teamName, memberId)) ?? explicitMembers.get(teamMemberKey(void 0, void 0, memberId)) : void 0;
	const explicit = matchedExplicit?.taskId && resultTaskId && matchedExplicit.taskId !== resultTaskId ? void 0 : matchedExplicit;
	const structuredSubAgent = extractStructuredSubAgent(invocation.result);
	return {
		memberId,
		teamName,
		explicit,
		resultTaskId,
		structuredSubAgent,
		isTeamMember: Boolean(memberId && !structuredSubAgent && (teamName || explicit || resultTaskId))
	};
}
async function buildTeamMemberDTO(invocation, c, childFiles, resolveTeamTaskByAssignment, resolveTeamTranscriptSummary, allowAssignmentFallback = true, beforeTimestamp) {
	let taskId = c.resultTaskId ?? c.explicit?.taskId;
	if (!taskId && allowAssignmentFallback) taskId = resolveTeamTaskByAssignment ? await resolveTeamTaskByAssignment(c.memberId) : findTeamTaskByAssignmentMarker(childFiles, c.memberId);
	const fullTranscript = taskId ? readTranscript(childFiles, taskId, "taskId") : [];
	const transcriptSummary = fullTranscript.length === 0 && taskId && resolveTeamTranscriptSummary ? await resolveTeamTranscriptSummary(taskId) : fullTranscript;
	const boundaryRecords = fullTranscript.length > 0 ? fullTranscript : transcriptSummary;
	const endIndex = beforeTimestamp === void 0 ? boundaryRecords.length : boundaryRecords.findIndex((record) => readTimestamp$1(record) >= beforeTimestamp);
	const effectiveEnd = endIndex < 0 ? boundaryRecords.length : endIndex;
	const transcript = fullTranscript.slice(0, effectiveEnd);
	const boundedSummary = transcriptSummary.slice(0, effectiveEnd);
	const lastId = effectiveEnd < boundaryRecords.length && effectiveEnd > 0 ? readString$1(boundaryRecords[effectiveEnd - 1]?.id) : void 0;
	const hasBoundedEmptyWindow = beforeTimestamp !== void 0 && effectiveEnd === 0;
	const persistedState = mapChildState(derivePersistedTranscriptStatus(boundedSummary));
	const fallbackState = deriveChildState(transcript, invocation.result, false, false);
	const explicitState = c.explicit?.status;
	const status = hasBoundedEmptyWindow ? persistedState ?? (explicitState === "error" || explicitState === "cancelled" ? explicitState : "completed") : explicitState === "running" ? persistedState ?? explicitState : explicitState ?? persistedState ?? fallbackState;
	return {
		kind: "team",
		parentRequestId: invocation.parentRequestId,
		teamName: c.explicit?.teamName ?? c.teamName,
		memberId: c.memberId,
		conversationId: c.explicit?.sessionId ?? firstSessionId(transcriptSummary) ?? "",
		...taskId ? {
			taskId,
			...!hasBoundedEmptyWindow ? { historyRef: {
				storeId: taskId,
				...lastId ? { lastId } : {}
			} } : {}
		} : {},
		status,
		requests: projectTranscriptRequests(transcript)
	};
}
async function buildReactivatedTeamMemberDTO(reactivation, source, childFiles, resolveTeamTaskByAssignment, resolveTeamTranscriptSummary, beforeTimestamp) {
	const taskId = source?.resultTaskId ?? source?.explicit?.taskId ?? (resolveTeamTaskByAssignment ? await resolveTeamTaskByAssignment(reactivation.memberId) : findTeamTaskByAssignmentMarker(childFiles, reactivation.memberId));
	if (!taskId) return;
	const fullTranscript = readTranscript(childFiles, taskId, "taskId");
	const transcriptSummary = fullTranscript.length === 0 && resolveTeamTranscriptSummary ? await resolveTeamTranscriptSummary(taskId) : fullTranscript;
	const boundaryRecords = fullTranscript.length > 0 ? fullTranscript : transcriptSummary;
	const startIndex = reactivation.timestamp === void 0 ? 0 : boundaryRecords.findIndex((record) => readTimestamp$1(record) >= reactivation.timestamp);
	const effectiveStart = startIndex < 0 ? boundaryRecords.length : startIndex;
	const endIndex = beforeTimestamp === void 0 ? boundaryRecords.length : boundaryRecords.findIndex((record) => readTimestamp$1(record) >= beforeTimestamp);
	const effectiveEnd = endIndex < 0 ? boundaryRecords.length : endIndex;
	const transcript = fullTranscript.slice(effectiveStart, effectiveEnd);
	const previousId = effectiveStart > 0 ? readString$1(boundaryRecords[effectiveStart - 1]?.id) : void 0;
	const lastId = effectiveEnd < boundaryRecords.length && effectiveEnd > effectiveStart ? readString$1(boundaryRecords[effectiveEnd - 1]?.id) : void 0;
	const hasBoundedEmptyWindow = beforeTimestamp !== void 0 && effectiveEnd <= effectiveStart;
	const status = mapChildState(derivePersistedTranscriptStatus(transcriptSummary.slice(effectiveStart, effectiveEnd))) ?? (hasBoundedEmptyWindow ? "completed" : deriveChildState(transcript, void 0, false, false));
	return {
		kind: "team",
		parentRequestId: reactivation.parentRequestId,
		teamName: source?.explicit?.teamName ?? source?.teamName,
		memberId: reactivation.memberId,
		conversationId: source?.explicit?.sessionId ?? firstSessionId(transcriptSummary) ?? "",
		taskId,
		...!hasBoundedEmptyWindow ? { historyRef: {
			storeId: taskId,
			...previousId ? { afterId: previousId } : {},
			...lastId ? { lastId } : {}
		} } : {},
		status,
		requests: projectTranscriptRequests(transcript)
	};
}
function buildUnstructuredSubAgentDTO(invocation) {
	return {
		kind: "subagent",
		parentRequestId: invocation.parentRequestId,
		parentToolCallId: invocation.callId,
		conversationId: invocation.callId,
		status: deriveChildState([], invocation.result, true),
		requests: []
	};
}
async function appendOrdinarySubAgent(input) {
	const storeId = readString$1(input.subAgent.sessionId);
	const identity = `${input.invocation.callId}\u0000${storeId ?? ""}`;
	if (input.seen.has(identity)) return;
	input.seen.add(identity);
	const window = sliceInvocationWindow(storeId ? readTranscript(input.childFiles, storeId, "storeId") : [], readString$1(input.subAgent.afterId), readString$1(input.subAgent.lastId), extractResultText(input.invocation.result));
	const requests = projectTranscriptRequests(window.records);
	if (window.syntheticTerminalText && requests.length > 0) appendSyntheticTerminal(requests[requests.length - 1], window.syntheticTerminalText);
	input.output.push({
		kind: "subagent",
		parentRequestId: input.invocation.parentRequestId,
		parentToolCallId: input.invocation.callId,
		conversationId: input.invocation.callId,
		...storeId ? { historyRef: {
			storeId,
			afterId: readString$1(input.subAgent.afterId),
			lastId: readString$1(input.subAgent.lastId)
		} } : {},
		status: deriveChildState(window.records, input.invocation.result, false),
		requests
	});
	for (const nested of collectAgentInvocations(window.records)) {
		const nestedSubAgent = extractStructuredSubAgent(nested.result);
		if (!nestedSubAgent) continue;
		await appendOrdinarySubAgent({
			invocation: nested,
			subAgent: nestedSubAgent,
			childFiles: input.childFiles,
			output: input.output,
			seen: input.seen
		});
	}
}
function sliceInvocationWindow(records, afterId, lastId, parentOutput) {
	const afterIndex = afterId ? records.findIndex((item) => readString$1(item.id) === afterId) : -1;
	const start = afterId ? afterIndex + 1 : 0;
	const lastIndex = lastId ? records.findIndex((item) => readString$1(item.id) === lastId) : records.length - 1;
	if (lastId && lastIndex < start) return { records: [] };
	const end = Math.min(records.length - 1, lastIndex);
	const window = records.slice(start, end + 1);
	if (!parentOutput || window.length === 0 || hasEquivalentAssistant(window, parentOutput)) return { records: window };
	const next = records[end + 1];
	const requestId = readConversationRequestId(window[window.length - 1]);
	if (next && readConversationRequestId(next) === requestId && next.type === "message" && next.role === "assistant" && equivalentText(extractText$1(next.content), parentOutput)) return { records: [...window, next] };
	return {
		records: window,
		syntheticTerminalText: parentOutput
	};
}
function collectAgentInvocations(records) {
	const calls = /* @__PURE__ */ new Map();
	for (const [recordIndex, record] of records.entries()) {
		if (record.type === "function_call" && readString$1(record.name) === "Agent") {
			const callId = readString$1(record.callId) ?? readString$1(record.id);
			const parentRequestId = readConversationRequestId(record);
			if (!callId || !parentRequestId) continue;
			calls.set(callId, {
				callId,
				parentRequestId,
				recordIndex,
				call: record,
				input: parseRecord$1(record.arguments)
			});
			continue;
		}
		if (record.type !== "function_call_result" && record.type !== "function_call_output") continue;
		const callId = readString$1(record.callId) ?? readString$1(record.id);
		const invocation = callId ? calls.get(callId) : void 0;
		if (invocation) invocation.result = record;
	}
	return [...calls.values()];
}
function collectTeamReactivations(records) {
	const callResults = /* @__PURE__ */ new Map();
	for (const record of records) {
		if (record.type !== "function_call_result" && record.type !== "function_call_output") continue;
		const callId = readString$1(record.callId) ?? readString$1(record.id);
		if (callId) callResults.set(callId, record);
	}
	const result = /* @__PURE__ */ new Map();
	for (const [recordIndex, record] of records.entries()) {
		if (record.type !== "function_call" || readString$1(record.name) !== "SendMessage") continue;
		const callId = readString$1(record.callId) ?? readString$1(record.id);
		const terminal = callId ? callResults.get(callId) : void 0;
		if (isFailedRecord(record) || isCancelledRecord(record) || terminal && (isFailedRecord(terminal) || isCancelledRecord(terminal))) continue;
		const input = parseRecord$1(record.arguments);
		const memberId = normalizeMemberRecipient(readString$1(input.recipient) ?? readString$1(input.target));
		const parentRequestId = readConversationRequestId(record);
		if (!memberId || !parentRequestId || !callId) continue;
		const key = `${parentRequestId}\u0000${memberId}`;
		if (!result.has(key)) result.set(key, {
			callId,
			parentRequestId,
			memberId,
			recordIndex,
			timestamp: readTimestamp$1(record) || void 0
		});
	}
	return [...result.values()];
}
function firstTimestamp(reactivations) {
	return reactivations?.find((item) => item.timestamp !== void 0)?.timestamp;
}
function nextBoundReactivationTimestamp(origin, reactivations) {
	const originIndex = reactivations?.findIndex((item) => item.callId === origin.callId) ?? -1;
	return originIndex < 0 ? void 0 : firstTimestamp(reactivations?.slice(originIndex + 1));
}
function collectTeamNamesByRequest(records) {
	const result = /* @__PURE__ */ new Map();
	for (const record of records) {
		if (record.type !== "function_call" || readString$1(record.name) !== "TeamCreate") continue;
		const requestId = readConversationRequestId(record);
		const args = parseRecord$1(record.arguments);
		const teamName = readString$1(args.team_name) ?? readString$1(args.teamName) ?? readString$1(args.name);
		if (requestId && teamName) result.set(requestId, teamName);
	}
	return result;
}
function collectExplicitTeamMemberStatus(records) {
	const result = /* @__PURE__ */ new Map();
	for (const record of records) {
		const update = isRecord$7(record.update) ? record.update : record;
		const meta = mergeRecords$1(isRecord$7(record._meta) ? record._meta : void 0, isRecord$7(update._meta) ? update._meta : void 0);
		const nested = isRecord$7(meta?.["codebuddy.ai"]) ? meta["codebuddy.ai"] : void 0;
		const teamUpdate = meta?.["codebuddy.ai/teamUpdate"] ?? nested?.teamUpdate;
		if (!isRecord$7(teamUpdate) || teamUpdate.type !== "member_status_change" || !Array.isArray(teamUpdate.members)) continue;
		const teamName = readString$1(teamUpdate.teamName);
		const parentRequestId = readConversationRequestId(record);
		for (const rawMember of teamUpdate.members) {
			if (!isRecord$7(rawMember)) continue;
			const name = readString$1(rawMember.name);
			if (!name) continue;
			result.set(teamMemberKey(parentRequestId, teamName, name), {
				status: mapChildState(readString$1(rawMember.status)),
				sessionId: readString$1(rawMember.sessionId),
				taskId: readString$1(rawMember.taskId),
				teamName,
				parentRequestId
			});
		}
	}
	return result;
}
function teamMemberKey(parentRequestId, teamName, memberName) {
	return `${parentRequestId ?? ""}\u0000${teamName ?? ""}\u0000${memberName}`;
}
function normalizeMemberRecipient(recipient) {
	if (!recipient) return;
	return (recipient.startsWith("@") ? recipient.slice(1) : recipient).split("@")[0] || void 0;
}
function readTimestamp$1(record) {
	if (typeof record.timestamp === "number" && Number.isFinite(record.timestamp)) return record.timestamp;
	if (typeof record.timestamp !== "string") return 0;
	const timestamp = Date.parse(record.timestamp);
	return Number.isFinite(timestamp) ? timestamp : 0;
}
function findTeamTaskByAssignmentMarker(childFiles, memberId) {
	for (const [fileName, raw] of childFiles) if (extractInitialAssignmentMember(raw.slice(0, 8192)) === memberId) return fileName.slice(0, -6);
}
function extractInitialAssignmentMember(text) {
	return text.match(/summary\s*=\s*\\?["']Initial task assignment for ([^"'\\]+)\\?["']/i)?.[1]?.trim() || void 0;
}
function extractStructuredSubAgent(result) {
	const providerData = result && isRecord$7(result.providerData) ? result.providerData : void 0;
	const toolResult = providerData && isRecord$7(providerData.toolResult) ? providerData.toolResult : void 0;
	return toolResult && isRecord$7(toolResult.subAgent) ? toolResult.subAgent : void 0;
}
function extractTaskId(result) {
	if (!result) return;
	const providerData = isRecord$7(result.providerData) ? result.providerData : void 0;
	const toolResult = providerData && isRecord$7(providerData.toolResult) ? providerData.toolResult : void 0;
	const direct = readString$1(toolResult?.taskId) ?? readString$1(toolResult?.task_id) ?? readString$1(result.taskId) ?? readString$1(result.task_id);
	if (direct) return direct;
	return extractResultText(result)?.match(/(?:^|\n)\s*task_id:\s*(\S+)/)?.[1]?.trim();
}
function extractResultText(result) {
	if (!result) return;
	return extractText$1(result.output) || extractText$1(result.content) || void 0;
}
function deriveChildState(transcript, result, missingTranscriptIsError, resultCompletesInvocation = true) {
	const transcriptStatus = derivePersistedTranscriptStatus(transcript);
	if (transcriptStatus === "killed") return "cancelled";
	if (transcriptStatus === "failed") return "error";
	if (result && isCancelledRecord(result)) return "cancelled";
	if (result && isFailedRecord(result)) return "error";
	if (resultCompletesInvocation && result && normalizeStatus$1(result.status) === "completed") return "completed";
	if (transcriptStatus === "completed") return "completed";
	if (transcript.length > 0) return "error";
	return missingTranscriptIsError ? "error" : "running";
}
function firstSessionId(records) {
	for (const record of records) {
		const sessionId = readString$1(record.sessionId);
		if (sessionId) return sessionId;
	}
}
function hasEquivalentAssistant(records, output) {
	return records.some((record) => record.type === "message" && record.role === "assistant" && equivalentText(extractText$1(record.content), output));
}
function equivalentText(left, right) {
	return normalizeAgentOutput(left) === normalizeAgentOutput(right);
}
function normalizeAgentOutput(value) {
	return value.replace(/^\s*\[Agent ID:[^\]]+\]\s*/i, "").replace(/\s*\[Agent ID:[^\]]+\]\s*$/i, "").trim();
}
function mapChildState(status) {
	const normalized = normalizeStatus$1(status);
	if (normalized === "completed") return "completed";
	if (normalized === "cancelled" || normalized === "canceled" || normalized === "killed") return "cancelled";
	if (normalized === "failed" || normalized === "error" || normalized === "incomplete") return "error";
	return normalized ? "running" : void 0;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-child-history-resolvers.ts
function createTeamTranscriptSummaryResolver(childDir, pager) {
	return async (taskId) => {
		const filePath = resolveJsonlPath(childDir, taskId, "taskId");
		try {
			const records = await pager.loadTailSummary(filePath);
			return ConversationReplayHistory.resolveReplayHistory(records);
		} catch (error) {
			if (isFileNotFound(error)) return [];
			throw error;
		}
	};
}
function createTeamTaskByAssignmentResolver(childDir) {
	const resolved = /* @__PURE__ */ new Map();
	let entriesPromise;
	return async (memberId) => {
		if (resolved.has(memberId)) return resolved.get(memberId);
		const entries = await (entriesPromise ??= readChildEntries(childDir));
		let matchedTaskId;
		for (const entry of entries) if (extractInitialAssignmentMember(await readChildPrefix(resolveContainedPath(childDir, entry.name))) === memberId) {
			const taskId = entry.name.slice(0, -6);
			if (matchedTaskId) {
				resolved.set(memberId, void 0);
				return;
			}
			matchedTaskId = taskId;
		}
		resolved.set(memberId, matchedTaskId);
		return matchedTaskId;
	};
}
async function readChildEntries(childDir) {
	let entries;
	try {
		entries = await node_fs_promises.readdir(childDir, {
			withFileTypes: true,
			encoding: "utf8"
		});
	} catch (error) {
		if (isFileNotFound(error)) return [];
		throw error;
	}
	return entries.filter((entry) => {
		if (!entry.name.endsWith(".jsonl")) return false;
		if (!entry.isFile() || entry.isSymbolicLink()) throw new Error(`[LocalConversationHistorySource] child history path is not a regular file: ${entry.name}`);
		return true;
	});
}
async function readChildPrefix(filePath) {
	const stat = await node_fs_promises.lstat(filePath);
	if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`[LocalConversationHistorySource] child history path is not a regular file: ${filePath}`);
	const handle = await node_fs_promises.open(filePath, "r");
	try {
		const chunkSize = 8192;
		const hardLimit = 262144;
		const targetNewlines = 2;
		const chunks = [];
		const buffer = Buffer.allocUnsafe(chunkSize);
		let totalRead = 0;
		let newlineCount = 0;
		while (totalRead < hardLimit && newlineCount < targetNewlines) {
			const { bytesRead } = await handle.read(buffer, 0, buffer.length, totalRead);
			if (bytesRead === 0) break;
			const chunk = buffer.subarray(0, bytesRead);
			chunks.push(Buffer.from(chunk));
			for (let index = 0; index < bytesRead; index += 1) if (chunk[index] === 10) {
				newlineCount += 1;
				if (newlineCount >= targetNewlines) break;
			}
			totalRead += bytesRead;
		}
		return Buffer.concat(chunks).toString("utf8");
	} finally {
		await handle.close();
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-history-path-resolver.ts
/**
* Local JSONL 的目录选择器。它把路径身份、布局优先级、旧 key 恢复和并发 fencing
* 封装在一起，让 HistorySource 只关心“读哪个稳定快照”。
*/
var LocalConversationHistoryPathResolver = class {
	constructor(options) {
		this.options = options;
		this.selectedPaths = /* @__PURE__ */ new Map();
		this.selectingPaths = /* @__PURE__ */ new Map();
		this.generations = /* @__PURE__ */ new Map();
		this.nextGeneration = 0;
	}
	async resolve(conversationId, cwd) {
		assertSafePathSegment(conversationId, "conversationId");
		const key = historySelectionKey(conversationId, cwd);
		const selected = this.selectedPaths.get(key);
		if (selected) return selected;
		const selecting = this.selectingPaths.get(key);
		if (selecting) return selecting;
		const generation = ++this.nextGeneration;
		this.generations.set(key, generation);
		const selection = this.resolveAndSelect(conversationId, cwd, key, generation);
		this.selectingPaths.set(key, selection);
		try {
			const resolved = await selection;
			this.assertActive(resolved);
			if (this.selectingPaths.get(key) === selection) this.selectedPaths.set(key, resolved);
			return resolved;
		} finally {
			if (this.selectingPaths.get(key) === selection) {
				this.selectingPaths.delete(key);
				if (!this.selectedPaths.has(key) && this.generations.get(key) === generation) this.generations.delete(key);
			}
		}
	}
	release(conversationId, cwd, onRelease) {
		const requestedKey = historySelectionKey(conversationId, cwd);
		const conversationPrefix = `${conversationId}\0`;
		const keys = /* @__PURE__ */ new Set([requestedKey]);
		for (const store of [
			this.generations,
			this.selectedPaths,
			this.selectingPaths
		]) for (const key of store.keys()) if (key.startsWith(conversationPrefix)) keys.add(key);
		const selected = [];
		const selecting = [];
		for (const key of keys) {
			const paths = this.selectedPaths.get(key);
			const selection = this.selectingPaths.get(key);
			if (paths) selected.push(paths);
			if (selection) selecting.push(selection);
			this.generations.delete(key);
			this.selectedPaths.delete(key);
			this.selectingPaths.delete(key);
		}
		const releasedProjectDirs = /* @__PURE__ */ new Set();
		const releaseIfUnused = (paths) => {
			if (releasedProjectDirs.has(paths.projectDir)) return;
			if ([...this.selectedPaths.values()].some((active) => active.projectDir === paths.projectDir)) return;
			releasedProjectDirs.add(paths.projectDir);
			onRelease(paths);
		};
		selected.forEach(releaseIfUnused);
		selecting.forEach((selection) => {
			selection.then(releaseIfUnused).catch(() => void 0);
		});
	}
	assertActive(paths) {
		if (this.generations.get(paths.selectionKey) !== paths.generation) throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] history layout was released during read");
	}
	async resolveAndSelect(conversationId, cwd, selectionKey, generation) {
		const projectCandidates = await resolveWorkspaceProjectKeyCandidates(cwd);
		for (const candidate of projectCandidates) assertSafePathSegment(candidate.key, "workspace path");
		return this.selectPaths(conversationId, projectCandidates, selectionKey, generation);
	}
	async selectPaths(conversationId, projectCandidates, selectionKey, generation) {
		const canonicalShared = resolveHistoryPaths(this.options.configDir, projectCandidates[0].key, conversationId, "shared", "shared-present", selectionKey, generation);
		const shared = await this.trySelectFromRoot({
			configDir: this.options.configDir,
			layout: "shared",
			projectCandidates,
			conversationId,
			selectionKey,
			generation,
			canonicalReason: "shared-present",
			legacyRawReason: "shared-enoent-legacy-raw",
			legacyPrefixReason: "shared-enoent-legacy-prefix"
		});
		if (shared) return shared;
		const ownerConfigDir = this.options.runtimeConfigDir?.();
		if (!ownerConfigDir || node_path.resolve(ownerConfigDir) === node_path.resolve(this.options.configDir)) return this.missing(conversationId, canonicalShared, "shared-enoent-owner-key-unavailable");
		const owner = await this.trySelectFromRoot({
			configDir: ownerConfigDir,
			layout: "owner-bucket",
			projectCandidates,
			conversationId,
			selectionKey,
			generation,
			canonicalReason: "shared-enoent",
			legacyRawReason: "shared-enoent-owner-legacy-raw",
			legacyPrefixReason: "shared-enoent-owner-legacy-prefix"
		});
		if (owner) return owner;
		return this.missing(conversationId, canonicalShared, "shared-enoent-owner-enoent");
	}
	async trySelectFromRoot(input) {
		for (const candidate of input.projectCandidates) {
			const base = resolveHistoryPaths(input.configDir, candidate.key, input.conversationId, input.layout, candidate.source === "canonical" ? input.canonicalReason : input.legacyRawReason, input.selectionKey, input.generation);
			const resolved = await this.tryResolveExistingPaths(base, input.conversationId);
			if (resolved) return this.selected(input.conversationId, resolved);
		}
		const legacy = await this.tryResolveLegacyProjectDirByPrefix(input);
		return legacy ? this.selected(input.conversationId, legacy) : void 0;
	}
	async tryResolveExistingPaths(base, conversationId) {
		try {
			await node_fs_promises.lstat(base.mainPath);
			return base;
		} catch (error) {
			if (!isFileNotFound(error)) {
				this.options.log?.("history-read-failed", {
					conversationId,
					layout: base.layout,
					fallbackReason: base.fallbackReason,
					...sanitizeHistoryError$1(error)
				});
				throw error;
			}
		}
		return this.tryResolveAcpAliasFromProjectDir(base, conversationId);
	}
	async tryResolveAcpAliasFromProjectDir(base, conversationId) {
		const acpSessionId = await readAcpSessionBindingFromProjectDir(base.projectDir, conversationId);
		if (!acpSessionId) return;
		try {
			assertSafePathSegment(acpSessionId, "acpSessionId");
		} catch {
			return;
		}
		const mainPath = resolveJsonlPath(base.projectDir, acpSessionId, "acpSessionId");
		try {
			const stat = await node_fs_promises.lstat(mainPath);
			if (!stat.isFile() || stat.isSymbolicLink()) return;
		} catch {
			return;
		}
		return {
			...base,
			mainPath,
			fallbackReason: base.fallbackReason === "shared-present" || base.fallbackReason === "shared-enoent" ? "acp-session-alias" : `${base.fallbackReason}-acp-alias`
		};
	}
	async tryResolveLegacyProjectDirByPrefix(input) {
		const truncatedCandidates = input.projectCandidates.filter(legacyWorkspaceProjectKeyPrefix);
		if (truncatedCandidates.length === 0) return;
		const projectsRoot = node_path.join(input.configDir, "projects");
		let entries;
		try {
			entries = await node_fs_promises.readdir(projectsRoot, { withFileTypes: true });
		} catch (error) {
			if (isFileNotFound(error)) return;
			throw error;
		}
		const exactKeys = new Set(input.projectCandidates.map((candidate) => candidate.key));
		const prefixMatches = /* @__PURE__ */ new Map();
		for (const entry of entries) {
			if (!entry.isDirectory() || exactKeys.has(entry.name)) continue;
			const matching = truncatedCandidates.find((candidate) => {
				const prefix = legacyWorkspaceProjectKeyPrefix(candidate);
				return prefix !== void 0 && entry.name.startsWith(prefix);
			});
			if (!matching) continue;
			if (!isCompatibleLegacyWorkspaceProjectKey(entry.name, matching)) this.options.log?.("history-legacy-prefix-rejected", {
				conversationId: input.conversationId,
				legacyKey: entry.name,
				currentKey: matching.key
			});
			prefixMatches.set(entry.name, matching);
		}
		const resolved = [];
		for (const [legacyKey, candidate] of prefixMatches) {
			assertSafePathSegment(legacyKey, "legacy workspace path");
			const base = resolveHistoryPaths(input.configDir, legacyKey, input.conversationId, input.layout, input.legacyPrefixReason, input.selectionKey, input.generation);
			const paths = await this.tryResolveExistingPaths(base, input.conversationId);
			if (paths) resolved.push({
				paths,
				legacyKey,
				currentKey: candidate.key,
				compatible: isCompatibleLegacyWorkspaceProjectKey(legacyKey, candidate)
			});
		}
		if (resolved.length > 1) {
			this.options.log?.("history-legacy-prefix-ambiguous", {
				conversationId: input.conversationId,
				currentKey: input.projectCandidates[0].key,
				candidateCount: resolved.length
			});
			return;
		}
		const match = resolved[0];
		if (!match?.compatible) return;
		this.options.log?.("history-legacy-prefix-recovered", {
			conversationId: input.conversationId,
			legacyKey: match.legacyKey,
			currentKey: match.currentKey
		});
		return match.paths;
	}
	selected(conversationId, paths) {
		this.options.log?.("layout-selected", {
			conversationId,
			layout: paths.layout,
			fallbackReason: paths.fallbackReason
		});
		return paths;
	}
	missing(conversationId, paths, fallbackReason) {
		const missing = {
			...paths,
			fallbackReason
		};
		this.options.log?.("history-missing", {
			conversationId,
			layout: missing.layout,
			fallbackReason: missing.fallbackReason
		});
		return missing;
	}
};
function resolveHistoryPaths(configDir, projectKey, conversationId, layout, fallbackReason, selectionKey, generation) {
	const projectDir = resolveContainedPath(node_path.join(configDir, "projects"), projectKey);
	return {
		layout,
		fallbackReason,
		projectDir,
		mainPath: resolveJsonlPath(projectDir, conversationId, "conversationId"),
		selectionKey,
		generation,
		childDir: resolveContainedPath(projectDir, conversationId, "subagents")
	};
}
function historySelectionKey(conversationId, cwd) {
	return `${conversationId}\0${cwd}`;
}
function sanitizeHistoryError$1(error) {
	const errorName = error instanceof Error ? error.name : "UnknownError";
	const errorCode = error && typeof error === "object" && typeof error.code === "string" ? error.code : void 0;
	return errorCode ? {
		errorName,
		errorCode
	} : { errorName };
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-jsonl-pager.ts
var DEFAULT_COMPACT_RECORD_BYTES = 102400;
var DEFAULT_WINDOW_OVERLAP_BYTES = 1048576;
var DEFAULT_LEGACY_LIMIT = 20;
var MAX_HYDRATED_USER_RECORD_BYTES = 4194304;
var MAX_HYDRATED_USER_PAGE_BYTES = require_conversations.REQUEST_HISTORY_PAGE_BYTE_LENGTH;
/**
* 无全量索引的 JSONL pager。只保留已经返回页面的锚点和 tool range；首次从文件尾部读取，
* 后续页面从上一页的 byte offset 继续向前，IO/解析/内存不随 transcript 总大小线性增长。
* `beforeRequestId` 锚点被 release 清掉后，只在最新一页（一个字节窗）里重定位；
* 不从尾部扫完整份 jsonl，保持懒加载。
*/
var LocalConversationJsonlPager = class {
	constructor() {
		this.states = /* @__PURE__ */ new Map();
	}
	async loadPage(filePath, query, options = {}) {
		const before = await readFileMetadata(filePath);
		const version = metadataToken(before);
		if (query.snapshotVersion && query.snapshotVersion !== version) throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] snapshotVersion changed during pagination");
		const state = this.stateFor(filePath, version);
		const endOffset = await resolveEndOffset(filePath, query, state, before.size, options);
		const page = await readRequestPage(filePath, endOffset, query, options);
		if (metadataToken(await readFileMetadata(filePath)) !== version) throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] persisted history changed while reading page");
		const oldestRequestId = page.groups[0]?.requestId;
		if (oldestRequestId) state.anchors.set(oldestRequestId, page.startOffset);
		const lookaheadRecords = state.lookaheadByOffset.get(endOffset) ?? [];
		state.lookaheadByOffset.set(page.startOffset, page.records.filter(isChildBoundaryRecord));
		for (const record of page.records) {
			if (record.type !== "function_call_result" && record.type !== "function_call_output") continue;
			const callId = readString$1(record.callId) ?? readString$1(record.id);
			const range = page.rangeByRecord.get(record);
			if (callId && range) state.toolRanges.set(callId, range);
		}
		return {
			groups: page.groups,
			records: page.records,
			snapshotVersion: version,
			hasMore: page.startOffset > 0,
			...page.startOffset > 0 ? { nextCursor: String(page.startOffset) } : {},
			lookaheadRecords,
			anomalies: page.anomalies,
			windowGroupCount: page.windowGroupCount,
			regenerationSourceResolved: page.regenerationSourceResolved,
			skippedRecords: page.skippedRecords
		};
	}
	async loadTailSummary(filePath) {
		return (await this.loadPage(filePath, { byteLength: require_conversations.REQUEST_HISTORY_PAGE_BYTE_LENGTH })).records;
	}
	async loadToolDetail(filePath, toolCallId) {
		const metadata = await readFileMetadata(filePath);
		const state = this.states.get(filePath);
		if (!state || state.snapshotVersion !== metadataToken(metadata)) return;
		const range = state.toolRanges.get(toolCallId);
		if (!range) return;
		return {
			toolCallId,
			content: extractToolDetailContent(await readJsonlRecord(filePath, range)),
			originalBytes: range.length
		};
	}
	release(fileOrDirectory) {
		const resolvedTarget = node_path.resolve(fileOrDirectory);
		const prefix = `${resolvedTarget}${node_path.sep}`;
		for (const key of [...this.states.keys()]) {
			const resolved = node_path.resolve(key);
			if (resolved === resolvedTarget || resolved.startsWith(prefix)) this.states.delete(key);
		}
	}
	clear() {
		this.states.clear();
	}
	stateFor(filePath, snapshotVersion) {
		const current = this.states.get(filePath);
		if (current?.snapshotVersion === snapshotVersion) return current;
		const next = {
			snapshotVersion,
			anchors: /* @__PURE__ */ new Map(),
			toolRanges: /* @__PURE__ */ new Map(),
			lookaheadByOffset: /* @__PURE__ */ new Map()
		};
		this.states.set(filePath, next);
		return next;
	}
};
async function readRequestPage(filePath, endOffset, query, options) {
	const byteLength = normalizeByteLength(query.byteLength);
	const limit = normalizeLimit(query.limit);
	const growthBytes = query.byteLength === void 0 ? DEFAULT_WINDOW_OVERLAP_BYTES : Math.max(byteLength, DEFAULT_WINDOW_OVERLAP_BYTES);
	let windowBytes = Math.min(endOffset, growthBytes + DEFAULT_WINDOW_OVERLAP_BYTES);
	while (true) {
		const parsed = await readWindow(filePath, Math.max(0, endOffset - windowBytes), endOffset);
		const active = parsed.startOffset === 0 ? ConversationReplayHistory.resolveReplayHistory(parsed.records) : resolvePagedWindowHistory(parsed.records);
		const anomalies = [];
		const groups = groupByConversationRequest(active, {
			excludeSystemTeammateMessages: options.excludeSystemTeammateMessages,
			onAnomaly: (anomaly) => anomalies.push(anomaly)
		});
		const selection = selectGroups(groups, query.byteLength, byteLength, limit, parsed.rangeByRecord);
		while (parsed.startOffset > 0 && selection.start > 0 && !hasRequestStart(groups[selection.start])) {
			selection.start -= 1;
			selection.bytes += groupBytes(groups.slice(selection.start, selection.start + 1), parsed.rangeByRecord);
		}
		const firstGroup = groups[selection.start];
		const boundaryResolved = parsed.startOffset === 0 || hasRequestStart(firstGroup);
		const pageFilled = selection.start > 0 || query.byteLength !== void 0 && selection.bytes >= byteLength && hasRequestStart(firstGroup);
		if (boundaryResolved && pageFilled || parsed.startOffset === 0) return hydrateSelectedPage(filePath, active, groups, selection.start, parsed, anomalies);
		if (windowBytes >= endOffset) return hydrateSelectedPage(filePath, active, groups, selection.start, parsed, anomalies);
		windowBytes = Math.min(endOffset, Math.max(windowBytes + growthBytes, windowBytes * 2));
	}
}
function hasRequestStart(group) {
	if (group?.promptRecordId === void 0) return false;
	return group.records.some((record) => record.id === group.promptRecordId && isRealUserMessage(record));
}
function selectGroups(groups, requestedByteLength, byteLength, limit, rangeByRecord) {
	const end = groups.length;
	if (requestedByteLength === void 0) {
		const start = Math.max(0, end - limit);
		return {
			start,
			bytes: groupBytes(groups.slice(start), rangeByRecord),
			count: end - start
		};
	}
	let selectedBytes = 0;
	let start = end;
	while (start > 0) {
		const bytes = groupBytes([groups[start - 1]], rangeByRecord);
		if (start < end && selectedBytes + bytes > byteLength) break;
		selectedBytes += bytes;
		start -= 1;
	}
	return {
		start,
		bytes: selectedBytes,
		count: end - start
	};
}
function groupBytes(groups, rangeByRecord) {
	return groups.reduce((total, group) => total + group.records.reduce((groupTotal, record) => groupTotal + (rangeByRecord.get(record)?.length ?? 0), 0), 0);
}
var PAGED_CUSTOM_RECORD_TYPES = /* @__PURE__ */ new Set([
	"custom-title",
	"ai-title",
	"file-history-snapshot",
	"summary",
	"topic",
	"goal-result",
	"goal-progress",
	"resend-fork-notice"
]);
function resolvePagedWindowHistory(records) {
	return records.filter((record) => typeof record.type !== "string" || !PAGED_CUSTOM_RECORD_TYPES.has(record.type));
}
async function hydrateSelectedPage(filePath, active, groups, start, parsed, anomalies) {
	const end = groups.length;
	const selectedGroups = groups.slice(start, end);
	const selectedRecords = new Set(selectedGroups.flatMap((group) => group.records));
	const from = start === 0 ? 0 : Math.max(0, active.findIndex((record) => selectedRecords.has(record)));
	const records = active.slice(from);
	const promptRecordIds = new Set(selectedGroups.map((group) => group.promptRecordId).filter((id) => id !== void 0));
	const replacements = /* @__PURE__ */ new Map();
	let hydratedUserBytes = 0;
	for (const record of records) {
		if (record.type !== "message" || record.role !== "user" || record._compactTruncated !== true) continue;
		const recordId = readString$1(record.id);
		if (shouldDropPersistedTranscriptItem(record, { ...recordId && promptRecordIds.has(recordId) ? { preserveMetaRecordId: recordId } : {} })) continue;
		const range = parsed.rangeByRecord.get(record);
		if (!range) throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] oversized user record range is missing");
		if (range.length > MAX_HYDRATED_USER_RECORD_BYTES) throw new require_conversations.HistoryIncompleteError("[LocalConversationHistorySource] oversized user record exceeds hydration limit");
		hydratedUserBytes += range.length;
		if (hydratedUserBytes > MAX_HYDRATED_USER_PAGE_BYTES) throw new require_conversations.HistoryIncompleteError("[LocalConversationHistorySource] selected user records exceed page hydration limit");
		replacements.set(record, await readJsonlRecord(filePath, range));
	}
	const hydratedGroups = selectedGroups.map((group) => ({
		...group,
		sequence: Math.max(0, group.sequence - from),
		records: group.records.map((record) => replacements.get(record) ?? record)
	}));
	const hydratedRecords = records.map((record) => replacements.get(record) ?? record);
	const rangeByRecord = /* @__PURE__ */ new WeakMap();
	for (const record of records) {
		const hydrated = replacements.get(record) ?? record;
		const range = parsed.rangeByRecord.get(record);
		if (range) rangeByRecord.set(hydrated, range);
	}
	return {
		groups: hydratedGroups,
		records: hydratedRecords,
		rangeByRecord,
		startOffset: hydratedRecords.map((record) => rangeByRecord.get(record)).find((range) => range !== void 0)?.offset ?? parsed.startOffset,
		anomalies,
		windowGroupCount: groups.length,
		regenerationSourceResolved: groups.filter((group) => group.regenerationSourceRequestId).length,
		skippedRecords: parsed.skippedRecords
	};
}
async function readWindow(filePath, requestedStart, endOffset) {
	const readStart = requestedStart > 0 ? requestedStart - 1 : 0;
	const length = Math.max(0, endOffset - readStart);
	const handle = await node_fs_promises.open(filePath, "r");
	let buffer;
	try {
		buffer = Buffer.allocUnsafe(length);
		const { bytesRead } = await handle.read(buffer, 0, length, readStart);
		buffer = buffer.subarray(0, bytesRead);
	} finally {
		await handle.close();
	}
	let dataStart = 0;
	let startOffset = readStart;
	if (requestedStart > 0) {
		if (buffer[0] === 10) {
			dataStart = 1;
			startOffset = requestedStart;
		} else {
			const newline = buffer.indexOf(10, 1);
			if (newline < 0) return {
				records: [],
				rangeByRecord: /* @__PURE__ */ new WeakMap(),
				startOffset: endOffset,
				skippedRecords: []
			};
			dataStart = newline + 1;
			startOffset = readStart + dataStart;
		}
	}
	const records = [];
	const skippedRecords = [];
	const rangeByRecord = /* @__PURE__ */ new WeakMap();
	let lineStart = dataStart;
	for (let cursor = dataStart; cursor <= buffer.length; cursor += 1) {
		const terminated = cursor < buffer.length && buffer[cursor] === 10;
		if (!terminated && cursor < buffer.length) continue;
		if (cursor === lineStart) {
			lineStart = cursor + (terminated ? 1 : 0);
			continue;
		}
		let lineEnd = cursor;
		if (buffer[lineEnd - 1] === 13) lineEnd -= 1;
		const line = buffer.subarray(lineStart, lineEnd);
		let record;
		try {
			record = parseJsonlRecord(line);
		} catch (error) {
			if (terminated || endOffset < (await node_fs_promises.stat(filePath)).size) skippedRecords.push({
				offset: readStart + lineStart,
				length: line.length,
				reason: classifySkippedRecord(error)
			});
		}
		if (record) {
			const range = {
				offset: readStart + lineStart,
				length: line.length
			};
			records.push(record);
			rangeByRecord.set(record, range);
		}
		lineStart = cursor + (terminated ? 1 : 0);
	}
	return {
		records,
		rangeByRecord,
		startOffset,
		skippedRecords
	};
}
function classifySkippedRecord(error) {
	if (error instanceof SyntaxError) return "invalid-json";
	const message = error instanceof Error ? error.message : String(error);
	if (message.includes("JSONL record is not an object")) return "non-object-json";
	if (message.includes("corrupt oversized JSONL record")) return "corrupt-oversized-json";
	return "invalid-record";
}
function parseJsonlRecord(buffer) {
	if (buffer.length > DEFAULT_COMPACT_RECORD_BYTES) {
		const scanner = new CompactRecordScanner();
		const chunkBytes = 65536;
		for (let offset = 0; offset < buffer.length; offset += chunkBytes) scanner.push(buffer.subarray(offset, Math.min(buffer.length, offset + chunkBytes)));
		return scanner.finish(buffer.length);
	}
	const parsed = JSON.parse(buffer.toString("utf8"));
	if (!isRecord$7(parsed)) throw new Error("[LocalConversationHistorySource] JSONL record is not an object");
	return parsed;
}
async function readJsonlRecord(filePath, range) {
	const handle = await node_fs_promises.open(filePath, "r");
	try {
		const buffer = Buffer.allocUnsafe(range.length);
		const { bytesRead } = await handle.read(buffer, 0, range.length, range.offset);
		if (bytesRead !== range.length) throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] paged record range changed");
		const parsed = JSON.parse(buffer.toString("utf8"));
		if (!isRecord$7(parsed)) throw new Error("[LocalConversationHistorySource] paged JSONL record is not an object");
		return parsed;
	} finally {
		await handle.close();
	}
}
async function resolveEndOffset(filePath, query, state, fileBytes, options) {
	if (query.beforeRequestId) {
		const offset = state.anchors.get(query.beforeRequestId);
		if (offset !== void 0) return offset;
		const recovered = await recoverRequestStartOffset(filePath, query.beforeRequestId, fileBytes, query, options);
		if (recovered === void 0) throw new require_conversations.HistorySnapshotChangedError(`[LocalConversationHistorySource] beforeRequestId cursor is unavailable: ${query.beforeRequestId}`);
		state.anchors.set(query.beforeRequestId, recovered);
		return recovered;
	}
	if (query.cursor) {
		const offset = Number.parseInt(query.cursor, 10);
		if (Number.isSafeInteger(offset) && offset >= 0 && offset <= fileBytes) return offset;
		throw new require_conversations.HistorySnapshotChangedError("[LocalConversationHistorySource] invalid history byte cursor");
	}
	return fileBytes;
}
async function recoverRequestStartOffset(filePath, requestId, fileBytes, query, options) {
	if (fileBytes <= 0) return;
	const page = await readRequestPage(filePath, fileBytes, { byteLength: query.byteLength ?? 5242880 }, options);
	const match = page.groups.find((group) => group.requestId === requestId);
	if (!match) return;
	return requestStartOffset(match, page);
}
function requestStartOffset(group, page) {
	for (const record of group.records) {
		const range = page.rangeByRecord.get(record);
		if (range) return range.offset;
	}
	return page.startOffset;
}
function normalizeByteLength(value) {
	if (value === void 0 || !Number.isFinite(value) || value <= 0) return require_conversations.REQUEST_HISTORY_PAGE_BYTE_LENGTH;
	return Math.max(1, Math.floor(value));
}
function normalizeLimit(value) {
	if (value === void 0 || !Number.isFinite(value)) return DEFAULT_LEGACY_LIMIT;
	return Math.max(1, Math.floor(value));
}
async function readFileMetadata(filePath) {
	const stat = await node_fs_promises.lstat(filePath);
	if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`[LocalConversationHistorySource] history path is not a regular file: ${filePath}`);
	return {
		size: stat.size,
		mtimeMs: stat.mtimeMs,
		ctimeMs: stat.ctimeMs,
		ino: stat.ino
	};
}
function metadataToken(metadata) {
	return `${metadata.ino}:${metadata.size}:${metadata.mtimeMs}:${metadata.ctimeMs}`;
}
function extractToolDetailContent(record) {
	const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
	const toolResult = providerData && isRecord$7(providerData.toolResult) ? providerData.toolResult : void 0;
	if (toolResult && typeof toolResult.content === "string") return toolResult.content;
	if (typeof record.content === "string") return record.content;
	if (typeof record.output === "string") return record.output;
	return JSON.stringify(record.output ?? record.content ?? "");
}
function isChildBoundaryRecord(record) {
	return record.type === "function_call" && (record.name === "SendMessage" || record.name === "Agent" || record.name === "TeamCreate");
}
/** 大单行只提取页面投影、分组和 tool detail 定位需要的短标量。 */
var CompactRecordScanner = class {
	constructor() {
		this.tail = "";
		this.depth = 0;
		this.inString = false;
		this.escaped = false;
		this.started = false;
		this.complete = false;
		this.strings = /* @__PURE__ */ new Map();
		this.subAgentStrings = /* @__PURE__ */ new Map();
		this.numbers = /* @__PURE__ */ new Map();
		this.booleans = /* @__PURE__ */ new Map();
		this.decoder = new node_string_decoder.StringDecoder("utf8");
	}
	push(buffer) {
		if (buffer.length === 0) return;
		this.processText(this.decoder.write(buffer));
	}
	finish(originalBytes) {
		this.processText(this.decoder.end());
		if (this.inString || this.depth !== 0 || !this.complete) throw new Error("[LocalConversationHistorySource] corrupt oversized JSONL record");
		const record = {
			_compactTruncated: true,
			_originalBytes: originalBytes
		};
		for (const key of [
			"id",
			"type",
			"role",
			"status",
			"callId",
			"name",
			"parentId",
			"logicalParentId",
			"sessionId"
		]) {
			const value = this.strings.get(key);
			if (value !== void 0) record[key] = value;
		}
		const timestamp = this.numbers.get("timestamp");
		if (timestamp !== void 0) record.timestamp = timestamp;
		const requestId = this.strings.get("conversationRequestId") ?? this.strings.get("requestId");
		const providerData = {};
		if (requestId) providerData.conversationRequestId = requestId;
		for (const key of ["compactType", "compactStatus"]) {
			const value = this.strings.get(key);
			if (value !== void 0) providerData[key] = value;
		}
		for (const key of [
			"isMeta",
			"isCompactInternal",
			"isCompacted",
			"isSummary",
			"contentFilterNotice"
		]) {
			const value = this.booleans.get(key);
			if (value !== void 0) providerData[key] = value;
		}
		if (record.type === "message" && record.role !== "user") {
			const preview = compactPreview(this.strings.get("content") ?? this.strings.get("text"));
			if (preview) record.content = preview;
		}
		if (record.type === "reasoning") {
			const preview = compactPreview(this.strings.get("text") ?? this.strings.get("content"));
			if (preview) record.rawContent = [{
				type: "reasoning_text",
				text: preview
			}];
		}
		if (record.type === "function_call_result" || record.type === "function_call_output") {
			const subAgent = this.subAgentStrings.size > 0 ? Object.fromEntries(this.subAgentStrings) : void 0;
			providerData.toolResult = {
				title: this.strings.get("title") ?? "",
				content: "[Content too large — click to expand]",
				_compactTruncated: true,
				_originalContentLength: originalBytes,
				...subAgent ? { subAgent } : {}
			};
		}
		if (Object.keys(providerData).length > 0) record.providerData = providerData;
		return record;
	}
	processText(text) {
		if (!text) return;
		this.scanStructure(text);
		this.capture(`${this.tail}${text}`);
		this.tail = `${this.tail}${text}`.slice(-8192);
	}
	scanStructure(text) {
		for (const char of text) {
			if (this.inString) {
				if (this.escaped) {
					this.escaped = false;
					continue;
				}
				if (char === "\\") {
					this.escaped = true;
					continue;
				}
				if (char === "\"") this.inString = false;
				continue;
			}
			if (char === "\"") {
				this.inString = true;
				continue;
			}
			if (char === "{" || char === "[") {
				this.started = true;
				this.depth += 1;
			} else if (char === "}" || char === "]") {
				this.depth -= 1;
				if (this.started && this.depth === 0) this.complete = true;
			}
		}
	}
	capture(text) {
		for (const match of text.matchAll(/"(id|type|role|status|callId|name|parentId|logicalParentId|conversationRequestId|requestId|sessionId|title)"\s*:\s*"((?:\\.|[^"\\]){0,512})"/g)) if (!this.strings.has(match[1])) this.strings.set(match[1], decodeJsonString(match[2]));
		for (const match of text.matchAll(/"(content|text)"\s*:\s*"((?:\\.|[^"\\]){0,512})/g)) if (!this.strings.has(match[1])) this.strings.set(match[1], decodeJsonString(match[2]));
		for (const match of text.matchAll(/"providerData"\s*:\s*\{([^{}]{0,4096})\}/g)) {
			for (const field of match[1].matchAll(/"(compactType|compactStatus)"\s*:\s*"((?:\\.|[^"\\]){0,512})"/g)) if (!this.strings.has(field[1])) this.strings.set(field[1], decodeJsonString(field[2]));
			for (const field of match[1].matchAll(/"(isCompacted|isSummary)"\s*:\s*(true|false)/g)) if (!this.booleans.has(field[1])) this.booleans.set(field[1], field[2] === "true");
		}
		for (const match of text.matchAll(/"subAgent"\s*:\s*\{([^{}]{0,4096})\}/g)) for (const field of match[1].matchAll(/"(sessionId|afterId|lastId)"\s*:\s*"((?:\\.|[^"\\]){0,512})"/g)) if (!this.subAgentStrings.has(field[1])) this.subAgentStrings.set(field[1], decodeJsonString(field[2]));
		for (const match of text.matchAll(/"timestamp"\s*:\s*(-?\d+(?:\.\d+)?)/g)) if (!this.numbers.has("timestamp")) this.numbers.set("timestamp", Number(match[1]));
		for (const match of text.matchAll(/"(isMeta|isCompactInternal|contentFilterNotice)"\s*:\s*(true|false)/g)) if (!this.booleans.has(match[1])) this.booleans.set(match[1], match[2] === "true");
	}
};
function decodeJsonString(value) {
	try {
		return JSON.parse(`"${value}"`);
	} catch {
		return value;
	}
}
function compactPreview(value) {
	return value ? `${value}\n…[truncated]` : void 0;
}
//#endregion
//#region ../../packages/workbuddy-core/src/conversations/node/history/local-conversation-history-source.ts
/** Conversation history source backed by bounded CBC JSONL byte windows; recovery writes append only. */
var LocalConversationHistorySource = class {
	constructor(options = {}) {
		this.pager = new LocalConversationJsonlPager();
		this.configDir = options.configDir ?? defaultConfigDir();
		this.log = options.log;
		this.loadPagePostProcessor = options.loadPagePostProcessor;
		if (options.maxSnapshotBytes !== void 0 && (!Number.isSafeInteger(options.maxSnapshotBytes) || options.maxSnapshotBytes <= 0)) throw new Error("[LocalConversationHistorySource] maxSnapshotBytes must be a positive safe integer");
		this.assistantDisplayStore = new AssistantDisplaySnapshotStore(this.configDir);
		this.pathResolver = new LocalConversationHistoryPathResolver({
			configDir: this.configDir,
			runtimeConfigDir: options.runtimeConfigDir,
			log: options.log
		});
	}
	persistAssistantDisplay(input) {
		return this.assistantDisplayStore.save(input.conversationId, input.timestamp, input.display);
	}
	async loadPage(input) {
		if (!input.cwd) throw new Error("[LocalConversationHistorySource] cwd is required");
		const paths = await this.resolvePaths(input.conversationId, input.cwd);
		const { childDir, mainPath } = paths;
		let page;
		try {
			page = await this.pager.loadPage(mainPath, input, { excludeSystemTeammateMessages: true });
		} catch (error) {
			this.assertActive(paths);
			if (!isFileNotFound(error)) {
				this.logReadFailure(input.conversationId, paths, error);
				throw error;
			}
			this.logMissing(input.conversationId, paths);
			return this.applyLoadPagePostProcessor(input, {
				items: [],
				subAgents: [],
				agentTeams: [],
				snapshotVersion: "missing",
				hasMore: false
			});
		}
		this.assertActive(paths);
		if (page.skippedRecords.length > 0) {
			const reasons = page.skippedRecords.reduce((counts, record) => {
				counts[record.reason] = (counts[record.reason] ?? 0) + 1;
				return counts;
			}, {});
			this.log?.("history-record-skipped", {
				conversationId: input.conversationId,
				layout: paths.layout,
				count: page.skippedRecords.length,
				bytes: page.skippedRecords.reduce((sum, record) => sum + record.length, 0),
				reasons,
				offsets: page.skippedRecords.slice(0, 5).map((record) => record.offset)
			});
		}
		const anomalies = createGroupAnomalyCollector();
		for (const anomaly of page.anomalies) anomalies.record(anomaly);
		anomalies.flush((summary) => this.log?.("history-group-anomaly", {
			conversationId: input.conversationId,
			layout: paths.layout,
			groups: page.windowGroupCount,
			regenerationSourceResolved: page.regenerationSourceResolved,
			...summary
		}));
		if (page.groups.length === 0) this.log?.("history-no-projectable-requests", {
			conversationId: input.conversationId,
			layout: paths.layout,
			fallbackReason: paths.fallbackReason
		});
		const parentIds = new Set(page.groups.map((group) => group.requestId));
		const items = page.groups.map((group) => projectRequest(group.requestId, group.records, group.sequence, {
			excludeSystemTeammateMessages: true,
			...group.regenerationSourceRequestId ? { regenerationSourceRequestId: group.regenerationSourceRequestId } : {},
			...group.promptRecordId ? { promptRecordId: group.promptRecordId } : {}
		}));
		const assistantDisplaySnapshots = await this.assistantDisplayStore.load(input.conversationId);
		this.assertActive(paths);
		for (const item of items) require_conversations.applyPersistedAssistantDisplayByTimestamp(item, assistantDisplaySnapshots);
		const isByteQuery = input.byteLength !== void 0;
		const childFiles = isByteQuery ? /* @__PURE__ */ new Map() : await readChildFiles(childDir);
		const children = await projectChildren({
			records: [...page.records, ...page.lookaheadRecords],
			parentIds,
			childFiles,
			resolveTeamTaskByAssignment: createTeamTaskByAssignmentResolver(childDir),
			...isByteQuery ? { resolveTeamTranscriptSummary: createTeamTranscriptSummaryResolver(childDir, this.pager) } : {}
		});
		this.assertActive(paths);
		return this.applyLoadPagePostProcessor(input, {
			items,
			...!input.beforeRequestId && !input.cursor ? { pendingToolCalls: collectLatestPendingToolCalls(items.at(-1), page.groups.at(-1)) } : {},
			timelineEvents: projectTimelineEvents(page.records, input.conversationId, page.groups),
			subAgents: children.subAgents,
			agentTeams: children.agentTeams,
			...page.nextCursor ? { nextCursor: page.nextCursor } : {},
			snapshotVersion: page.snapshotVersion,
			hasMore: page.hasMore
		});
	}
	async persistOrphanPendingCancelledTools(input) {
		if (!input.cwd || input.calls.length === 0) return 0;
		const paths = await this.resolvePaths(input.conversationId, input.cwd);
		try {
			const appended = await persistOrphanPendingCancelledTools(paths.mainPath, input.calls);
			this.assertActive(paths);
			if (appended > 0) this.pager.release(paths.mainPath);
			return appended;
		} catch (error) {
			this.assertActive(paths);
			if (isFileNotFound(error)) return 0;
			throw error;
		}
	}
	applyLoadPagePostProcessor(input, page) {
		if (!this.loadPagePostProcessor) return page;
		return this.loadPagePostProcessor(page, {
			conversationId: input.conversationId,
			...input.cwd ? { cwd: input.cwd } : {}
		});
	}
	async loadToolDetail(input) {
		if (!input.cwd) return;
		const paths = await this.resolvePaths(input.conversationId, input.cwd);
		const { mainPath } = paths;
		try {
			const detail = await this.pager.loadToolDetail(mainPath, input.toolCallId);
			this.assertActive(paths);
			return detail;
		} catch (error) {
			this.assertActive(paths);
			if (isFileNotFound(error)) return;
			throw error;
		}
	}
	async loadChildPage(input) {
		if (!input.cwd) throw new Error("[LocalConversationHistorySource] cwd is required");
		const { paths, childPath } = await this.resolveChildPath(input.conversationId, input.cwd, input.ref.storeId);
		let page;
		try {
			page = await this.pager.loadPage(childPath, input);
		} catch (error) {
			this.assertActive(paths);
			if (isFileNotFound(error)) return {
				items: [],
				snapshotVersion: "missing",
				hasMore: false
			};
			throw error;
		}
		this.assertActive(paths);
		const records = sliceChildWindow(page.records, input.ref);
		const allowedIds = new Set(records.map((record) => readString$1(record.id)).filter(Boolean));
		return {
			items: page.groups.map((group) => ({
				...group,
				records: group.records.filter((record) => {
					const id = readString$1(record.id);
					return id === void 0 || allowedIds.has(id);
				})
			})).filter((group) => group.records.length > 0).map((group) => projectRequest(group.requestId, group.records, group.sequence, {
				...group.regenerationSourceRequestId ? { regenerationSourceRequestId: group.regenerationSourceRequestId } : {},
				...group.promptRecordId ? { promptRecordId: group.promptRecordId } : {}
			})),
			...page.nextCursor ? { nextCursor: page.nextCursor } : {},
			snapshotVersion: page.snapshotVersion,
			hasMore: page.hasMore
		};
	}
	async loadChildToolDetail(input) {
		if (!input.cwd) return;
		const { paths, childPath } = await this.resolveChildPath(input.conversationId, input.cwd, input.ref.storeId);
		try {
			const detail = await this.pager.loadToolDetail(childPath, input.toolCallId);
			this.assertActive(paths);
			return detail;
		} catch (error) {
			this.assertActive(paths);
			if (isFileNotFound(error)) return;
			throw error;
		}
	}
	async hasPersistedSession(input) {
		if (!input.cwd) return false;
		const paths = await this.resolvePaths(input.conversationId, input.cwd);
		try {
			const stat = await node_fs_promises.lstat(paths.mainPath);
			this.assertActive(paths);
			return stat.isFile() && !stat.isSymbolicLink();
		} catch (error) {
			this.assertActive(paths);
			if (isFileNotFound(error)) {
				this.logMissing(input.conversationId, paths);
				return false;
			}
			this.logReadFailure(input.conversationId, paths, error);
			throw error;
		}
	}
	async resolveRuntimeSessionId(input) {
		if (!input.cwd) return;
		const canonicalBinding = await readCanonicalAcpSessionBinding({
			configDir: this.configDir,
			cwd: input.cwd,
			conversationId: input.conversationId
		});
		if (canonicalBinding) return canonicalBinding;
		return readAcpSessionBindingFromProjectDir((await this.resolvePaths(input.conversationId, input.cwd)).projectDir, input.conversationId);
	}
	async persistRuntimeSessionId(input) {
		if (!input.cwd || !input.runtimeSessionId) return;
		await writeAcpSessionBinding({
			configDir: this.configDir,
			cwd: input.cwd,
			conversationId: input.conversationId,
			acpSessionId: input.runtimeSessionId
		});
		this.release(input.conversationId, input.cwd);
	}
	release(conversationId, cwd) {
		if (!cwd) return;
		this.pathResolver.release(conversationId, cwd, (paths) => this.releasePaths(paths));
	}
	async resolveChildPath(conversationId, cwd, storeId) {
		assertSafePathSegment(storeId, "storeId");
		const paths = await this.resolvePaths(conversationId, cwd);
		return {
			paths,
			childPath: resolveJsonlPath(paths.childDir, storeId, "storeId")
		};
	}
	async resolvePaths(conversationId, cwd) {
		return this.pathResolver.resolve(conversationId, cwd);
	}
	releasePaths(paths) {
		this.pager.release(paths.mainPath);
		this.pager.release(paths.childDir);
		this.pager.release(paths.projectDir);
	}
	assertActive(paths) {
		this.pathResolver.assertActive(paths);
	}
	logMissing(conversationId, paths) {
		this.log?.("history-missing", {
			conversationId,
			layout: paths.layout,
			fallbackReason: paths.fallbackReason
		});
	}
	logReadFailure(conversationId, paths, error) {
		this.log?.("history-read-failed", {
			conversationId,
			layout: paths.layout,
			fallbackReason: paths.fallbackReason,
			...sanitizeHistoryError(error)
		});
	}
};
var TERMINAL_TOOL_STATUSES = /* @__PURE__ */ new Set([
	"executed",
	"completed",
	"success",
	"succeeded",
	"done",
	"failed",
	"error",
	"failure",
	"cancelled",
	"canceled",
	"killed",
	"destroyed",
	"terminated",
	"skipped"
]);
function collectLatestPendingToolCalls(latestRequest, latestGroup) {
	if (!latestRequest?.assistantMessage || !latestGroup) return [];
	const terminalResultCallIds = collectTerminalResultCallIds(latestGroup.records);
	const pendingCallIds = /* @__PURE__ */ new Set();
	for (const block of latestRequest.assistantMessage.content) {
		if (!isRecord$7(block) || block.type !== "tool") continue;
		const callId = readString$1(block.toolCallId);
		const status = readString$1(block.status)?.toLowerCase();
		if (callId && !terminalResultCallIds.has(callId) && (!status || !TERMINAL_TOOL_STATUSES.has(status))) pendingCallIds.add(callId);
	}
	if (pendingCallIds.size === 0) return [];
	const calls = [];
	const seen = /* @__PURE__ */ new Set();
	for (const record of latestGroup.records) {
		if (record.type !== "function_call") continue;
		const callId = readString$1(record.callId) ?? readString$1(record.id);
		if (!callId || !pendingCallIds.has(callId) || seen.has(callId)) continue;
		seen.add(callId);
		const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
		const id = readString$1(record.id);
		const name = readString$1(record.name);
		const requestId = readString$1(providerData?.conversationRequestId) ?? latestGroup.requestId;
		const sessionId = readString$1(record.sessionId);
		const recordCwd = readString$1(record.cwd);
		calls.push({
			callId,
			...id ? { id } : {},
			...name ? { name } : {},
			...requestId ? { requestId } : {},
			...sessionId ? { sessionId } : {},
			...recordCwd ? { cwd: recordCwd } : {}
		});
	}
	return calls;
}
function collectTerminalResultCallIds(records) {
	const terminal = /* @__PURE__ */ new Set();
	for (const record of records) {
		if (record.type !== "function_call_result" && record.type !== "function_call_output") continue;
		const callId = readString$1(record.callId) ?? readString$1(record.id);
		if (!callId) continue;
		const status = readString$1(record.status)?.toLowerCase();
		if (!status || TERMINAL_TOOL_STATUSES.has(status)) terminal.add(callId);
	}
	return terminal;
}
function createGroupAnomalyCollector() {
	let promptUnresolved = 0;
	const recoveredVia = {};
	const unresolvedRequestIds = [];
	return {
		record: (anomaly) => {
			if (anomaly.kind === "prompt-unresolved") {
				promptUnresolved += 1;
				if (unresolvedRequestIds.length < 5) unresolvedRequestIds.push(anomaly.requestId);
				return;
			}
			recoveredVia[anomaly.via] = (recoveredVia[anomaly.via] ?? 0) + 1;
		},
		flush: (emit) => {
			const promptRecovered = Object.values(recoveredVia).reduce((sum, value) => sum + value, 0);
			if (promptUnresolved === 0 && promptRecovered === 0) return;
			emit({
				promptRecovered,
				promptRecoveredVia: recoveredVia,
				promptUnresolved,
				...unresolvedRequestIds.length > 0 ? { unresolvedRequestIds } : {}
			});
		}
	};
}
function sanitizeHistoryError(error) {
	const errorName = error instanceof Error ? error.name : "UnknownError";
	const errorCode = isRecord$7(error) && typeof error.code === "string" ? error.code : void 0;
	return errorCode ? {
		errorName,
		errorCode
	} : { errorName };
}
function sliceChildWindow(records, ref) {
	const afterIndex = ref.afterId ? records.findIndex((record) => readRecordId(record) === ref.afterId) : -1;
	const start = ref.afterId ? afterIndex + 1 : 0;
	const lastIndex = ref.lastId ? records.findIndex((record) => readRecordId(record) === ref.lastId) : records.length - 1;
	if (ref.lastId && lastIndex < start) return [];
	return records.slice(start, Math.min(records.length - 1, lastIndex) + 1);
}
function readRecordId(record) {
	return typeof record.id === "string" ? record.id : void 0;
}
function projectTimelineEvents(records, conversationId, groups, recordOffset = 0) {
	const events = [];
	for (const [index, record] of records.entries()) {
		const providerData = isRecord$7(record.providerData) ? record.providerData : void 0;
		if (!providerData) continue;
		const createdAt = readTimestamp(providerData.createTime ?? (isRecord$7(providerData.separatorExtra) ? providerData.separatorExtra.createTime : void 0) ?? record.timestamp);
		const anchorRequestId = resolveTimelineAnchor(record, recordOffset + index, groups);
		if (providerData.isSessionSeparator === true) {
			const messageId = readString$1(providerData.separatorMessageId) ?? readString$1(record.id) ?? `separator-${index}`;
			events.push({
				conversationId,
				id: `session-boundary:${messageId}`,
				kind: "session-boundary",
				createdAt,
				history: true,
				...anchorRequestId ? { anchorRequestId } : {},
				data: isRecord$7(providerData.separatorExtra) ? providerData.separatorExtra : void 0
			});
			continue;
		}
		if (providerData.isCompacted === true || providerData.isSummary === true) {
			const compactType = readString$1(providerData.compactType);
			if (compactType === "pre-message-auto") continue;
			const messageId = readString$1(record.id) ?? `compact-${index}`;
			const compactStatus = readCompactStatus(providerData.compactStatus) ?? "completed";
			const anchorContentIndex = compactType === "user-command" ? void 0 : resolveAutomaticCompactAnchorContentIndex(record, anchorRequestId, groups);
			events.push({
				conversationId,
				id: `context-compaction:${messageId}`,
				kind: "context-compaction",
				createdAt,
				history: true,
				...anchorRequestId ? { anchorRequestId } : {},
				...anchorContentIndex !== void 0 ? { anchorContentIndex } : {},
				data: {
					compactStatus,
					...compactType ? { compactType } : {}
				}
			});
		}
	}
	return events;
}
/**
* Local 直接历史没有运行期 Timeline 状态，需从 compact marker 在所属 Request
* 记录序列中的位置恢复 canonical assistant block 边界。只对自动 compact 生效；
* 手动 compact 始终是轮次结束后的 standalone Timeline。
*/
function resolveAutomaticCompactAnchorContentIndex(record, anchorRequestId, groups) {
	if (!anchorRequestId) return;
	const group = groups.find((candidate) => candidate.requestId === anchorRequestId);
	if (!group) return;
	const recordIndex = group.records.indexOf(record);
	if (recordIndex < 0) return;
	return projectRequest(group.requestId, group.records.slice(0, recordIndex), group.sequence, {
		excludeSystemTeammateMessages: true,
		...group.regenerationSourceRequestId ? { regenerationSourceRequestId: group.regenerationSourceRequestId } : {},
		...group.promptRecordId ? { promptRecordId: group.promptRecordId } : {}
	}).assistantMessage?.content.length ?? 0;
}
/**
* Timeline 先使用持久化显式 requestId；无显式归属时绑定记录位置之前最近的 Request。
* 因而两轮之间的 separator 归前一轮，首轮之前的 separator 归第一轮。
*/
function resolveTimelineAnchor(record, recordIndex, groups) {
	const explicitRequestId = readConversationRequestId(record);
	if (explicitRequestId && groups.some((group) => group.requestId === explicitRequestId)) return explicitRequestId;
	for (let index = groups.length - 1; index >= 0; index--) if (groups[index].sequence <= recordIndex) return groups[index].requestId;
	return groups[0]?.requestId;
}
function readCompactStatus(value) {
	return value === "compacting" || value === "completed" || value === "cancelled" || value === "limit-reached" ? value : void 0;
}
function readTimestamp(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string") {
		const numeric = Number(value);
		if (Number.isFinite(numeric)) return numeric;
		const parsed = Date.parse(value);
		if (Number.isFinite(parsed)) return parsed;
	}
	return 0;
}
async function readChildFiles(childDir) {
	const entries = await readChildEntries(childDir);
	const files = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const filePath = resolveContainedPath(childDir, entry.name);
		files.set(entry.name, await node_fs_promises.readFile(filePath, "utf8"));
	}
	return files;
}
function defaultConfigDir() {
	return process.env.WORKBUDDY_CONFIG_DIR?.trim() || node_path.join(node_os.homedir(), ".workbuddy");
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/sandbox-content-height.ts
/**
* @returns 建议高度；无需调整时返回 undefined。
*/
function measureSandboxContentHeight(params) {
	const epsilon = params.epsilon === void 0 ? 8 : params.epsilon;
	const viewportHeight = params.viewportHeight;
	if (!(viewportHeight > 0) || !Number.isFinite(viewportHeight)) return;
	if (params.scrollHeight > viewportHeight + epsilon) return Math.ceil(params.scrollHeight);
	const contentHeight = Math.ceil(params.bodyHeight + params.bodyMarginTop + params.bodyMarginBottom);
	if (contentHeight > 0 && contentHeight < viewportHeight - epsilon) return contentHeight;
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/sandbox-proxy.ts
/**
* MCP Apps 官方 Sandbox Proxy 页面。
*
* 由 daemon loopback HTTP server 提供，与 Electron file:// 或 Web Host 不同源。
* 页面只负责创建内层 iframe，并透明转发非 sandbox 控制消息。
*
* 额外：对未上报 size-changed 的 Guest，同源测量内容高度并代发标准
* `ui/notifications/size-changed`（App 一旦自己上报即永久让位）。
*/
var MCP_APPS_SANDBOX_PROXY_PATH = "/mcp-apps/sandbox-proxy.html";
/** daemon loopback server 的合法 host（`[::1]` 是 URL.hostname 对 IPv6 的形态）。 */
var LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set([
	"127.0.0.1",
	"localhost",
	"[::1]"
]);
/**
* 是否为本页面的 URL。
*
* 供 Electron 主进程在 frame 树里认出本页那一帧——内层 App 文档是 about:blank，
* 申请剪贴板时不带 origin，只能靠本页帧的 origin 反推它是不是自家 App。
*
* 端口由 daemon 动态分配，所以不校验端口；但 host 与协议必须校验：调用方遍历的是
* 整个窗口 frame 树，其中有第三方 origin（App 声明的 frameDomains、腾讯文档、乐享
* 等）。只按 pathname 判定的话，任意站点在自己域名下放一个同路径页面就能挤进受信
* 集合，再用继承自己 origin 的 about:blank 子帧套出剪贴板权限，绕过按域名的白名单。
*/
function isMcpAppsSandboxProxyUrl(url) {
	try {
		const parsed = new URL(url);
		return parsed.protocol === "http:" && LOOPBACK_HOSTNAMES.has(parsed.hostname) && parsed.pathname === "/mcp-apps/sandbox-proxy.html";
	} catch {
		return false;
	}
}
var MCP_APPS_SANDBOX_PROXY_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>MCP Apps Sandbox Proxy</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; }
    #app { display: block; width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
<script>
(function () {
  'use strict';

  var PROXY_READY = 'ui/notifications/sandbox-proxy-ready';
  var RESOURCE_READY = 'ui/notifications/sandbox-resource-ready';
  var SIZE_CHANGED = 'ui/notifications/size-changed';
  var hostWindow = window.parent;
  var innerFrame = null;
  var innerWindow = null;
  var appOwnsSize = false;
  var lastSentHeight = 0;
  var measureTimer = 0;
  var resizeObserver = null;
  var measureSandboxContentHeight = ${measureSandboxContentHeight.toString()};

  function isSandboxControl(method) {
    return typeof method === 'string'
      && method.indexOf('ui/notifications/sandbox-') === 0;
  }

  function permissionAllow(permissions) {
    // 默认下放 clipboard-write：Ardot 等 App 的「复制链接」走
    // navigator.clipboard.writeText；仅靠 App 声明时，未声明的资源在
    // Chromium 双层 iframe 下会被 Permissions-Policy 直接拦截。
    // fullscreen 同理，供 App 内放映/全屏播放调 Element.requestFullscreen()；
    // 外层由 agent-ui 的 buildSandboxAllowAttribute 下放，两处必须同步。
    var values = ['clipboard-write', 'fullscreen'];
    if (permissions && typeof permissions === 'object') {
      if (permissions.camera) values.push('camera');
      if (permissions.microphone) values.push('microphone');
      if (permissions.geolocation) values.push('geolocation');
    }
    return values.join('; ');
  }

  function escapeAttribute(value) {
    return String(value).replace(/"/g, '&quot;');
  }

  function buildCspMeta(csp) {
    if (!csp || typeof csp !== 'object') return '';
    var connect = Array.isArray(csp.connectDomains)
      ? csp.connectDomains.join(' ')
      : '';
    var resource = Array.isArray(csp.resourceDomains)
      ? csp.resourceDomains.join(' ')
      : '';
    var frames = Array.isArray(csp.frameDomains)
      ? csp.frameDomains.join(' ')
      : '';
    var base = Array.isArray(csp.baseUriDomains)
      ? csp.baseUriDomains.join(' ')
      : '';
    var directives = [
      "default-src 'none'",
      "script-src 'unsafe-inline' 'unsafe-eval' blob: " + resource,
      "style-src 'unsafe-inline' " + resource,
      "img-src data: blob: " + resource,
      "font-src data: blob: " + resource,
      "media-src data: blob: " + resource,
      "connect-src " + connect,
      frames ? "frame-src " + frames : "frame-src 'none'",
      base ? "base-uri " + base : "base-uri 'none'",
      "object-src 'none'"
    ];
    return '<meta http-equiv="Content-Security-Policy" content="'
      + escapeAttribute(directives.join('; '))
      + '">';
  }

  function injectMeta(html, meta) {
    if (!meta) return html;
    if (/<head[^>]*>/i.test(html)) {
      return html.replace(/<head([^>]*)>/i, '<head$1>' + meta);
    }
    if (/<html[^>]*>/i.test(html)) {
      return html.replace(
        /<html([^>]*)>/i,
        '<html$1><head>' + meta + '</head>'
      );
    }
    return meta + html;
  }

  function stopMeasuring() {
    if (measureTimer) {
      clearTimeout(measureTimer);
      measureTimer = 0;
    }
    if (resizeObserver) {
      try { resizeObserver.disconnect(); } catch (e) {}
      resizeObserver = null;
    }
  }

  function scheduleMeasure() {
    if (appOwnsSize) return;
    if (measureTimer) clearTimeout(measureTimer);
    measureTimer = setTimeout(function () {
      measureTimer = 0;
      measureAndNotify();
    }, 50);
  }

  function measureAndNotify() {
    if (appOwnsSize || !innerFrame || !innerWindow) return;
    var doc = innerFrame.contentDocument
      || (innerWindow && innerWindow.document);
    if (!doc || !doc.documentElement || !doc.body) return;
    var style;
    try {
      style = innerWindow.getComputedStyle(doc.body);
    } catch (e) {
      return;
    }
    var target = measureSandboxContentHeight({
      viewportHeight: innerWindow.innerHeight || 0,
      scrollHeight: doc.documentElement.scrollHeight || 0,
      bodyHeight: doc.body.getBoundingClientRect().height || 0,
      bodyMarginTop: parseFloat(style.marginTop) || 0,
      bodyMarginBottom: parseFloat(style.marginBottom) || 0
    });
    if (typeof target !== 'number' || !(target > 0)) return;
    if (Math.abs(target - lastSentHeight) < 4) return;
    var vh = innerWindow.innerHeight || 0;
    if (Math.abs(target - vh) < 4) return;
    lastSentHeight = target;
    hostWindow.postMessage({
      jsonrpc: '2.0',
      method: SIZE_CHANGED,
      params: { height: target }
    }, '*');
  }

  function startMeasuring() {
    stopMeasuring();
    if (!innerFrame || !innerWindow) return;
    var doc = innerFrame.contentDocument
      || (innerWindow && innerWindow.document);
    if (!doc) return;
    scheduleMeasure();
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(function () { scheduleMeasure(); });
      try {
        resizeObserver.observe(doc.documentElement);
        if (doc.body) resizeObserver.observe(doc.body);
      } catch (e) {}
    }
    // 图片 / 字体异步加载后补测
    doc.addEventListener('load', function () { scheduleMeasure(); }, true);
  }

  function loadResource(params) {
    stopMeasuring();
    if (innerFrame) innerFrame.remove();
    appOwnsSize = false;
    lastSentHeight = 0;

    innerFrame = document.createElement('iframe');
    innerFrame.id = 'app';
    innerFrame.setAttribute(
      'sandbox',
      params.sandbox || 'allow-scripts allow-same-origin allow-forms'
    );
    innerFrame.setAttribute('allow', permissionAllow(params.permissions));
    innerFrame.style.width = '100%';
    innerFrame.style.height = '100%';
    innerFrame.style.border = '0';

    var html = typeof params.html === 'string' ? params.html : '';
    var docHtml = injectMeta(html, buildCspMeta(params.csp));
    // 必须先 append 到 DOM，contentDocument 才可用。
    document.body.appendChild(innerFrame);
    innerWindow = innerFrame.contentWindow;
    // 用 document.write 而非 srcdoc 载入 View HTML：srcdoc 内层文档是 opaque
    // origin，会让依赖 blob: worker / WebGL / canvas 的 App（Ardot neeko 画布、
    // CesiumJS 等）无法初始化，表现为 iframe 全绿但内容空白。document.write 让
    // 内层继承本代理真实源（http://127.0.0.1:port），worker/canvas 正常。
    // 对齐官方 ext-apps basic-host sandbox 参考实现（allow-same-origin 保证
    // 内层 about:blank 与代理同源，contentDocument 可写）。
    var innerDoc = innerFrame.contentDocument
      || (innerWindow && innerWindow.document);
    if (innerDoc) {
      innerDoc.open();
      innerDoc.write(docHtml);
      innerDoc.close();
    } else {
      // 兜底：拿不到 contentDocument 时退回 srcdoc。
      innerFrame.srcdoc = docHtml;
    }
    // document.write 同步完成；给 Guest 脚本一拍时间再测。
    setTimeout(startMeasuring, 0);
  }

  window.addEventListener('message', function (event) {
    var data = event.data;
    var method = data && data.method;

    if (event.source === hostWindow) {
      if (method === RESOURCE_READY) {
        loadResource(data.params || {});
      } else if (!isSandboxControl(method) && innerWindow) {
        innerWindow.postMessage(data, '*');
      }
      return;
    }

    if (innerWindow && event.source === innerWindow && !isSandboxControl(method)) {
      // App 自己上报后 proxy 永久让位，避免双源打架。
      if (method === SIZE_CHANGED) {
        appOwnsSize = true;
        stopMeasuring();
      }
      hostWindow.postMessage(data, '*');
    }
  });

  hostWindow.postMessage({
    jsonrpc: '2.0',
    method: PROXY_READY,
    params: {}
  }, '*');
})();
<\/script>
</body>
</html>`;
//#endregion
//#region ../../packages/workbuddy-server/src/session/local-paths.ts
require_code_cache.init_esm$6();
function extractPreviewUrlLocalPath(url) {
	if (typeof url !== "string" || !url) return;
	let filePath;
	if (url.startsWith("file://")) try {
		filePath = new URL(url).pathname;
		filePath = decodeURIComponent(filePath);
	} catch {
		return;
	}
	else if (node_path.isAbsolute(url)) filePath = url;
	else return;
	return filePath ? node_path.normalize(filePath) : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/session/handlers.ts
var WORKBUDDY_SESSION_AUX_RPC_CHANNELS = {
	GET_ACTIVE_SESSIONS: "daemon:getActiveSessions",
	GET_SESSION_ARTIFACTS: "getSessionArtifacts",
	FILE_WATCH_SUBSCRIBE: "fileWatch:subscribe",
	FILE_WATCH_UNSUBSCRIBE: "fileWatch:unsubscribe",
	DIRECTORY_WATCH_SUBSCRIBE: "directoryWatch:subscribe",
	DIRECTORY_WATCH_UNSUBSCRIBE: "directoryWatch:unsubscribe",
	DIRECTORY_WATCH_RELEASE_SESSION: "directoryWatch:releaseSession",
	LOCAL_EXPERTS_GET_WATCH_PATH: "localExperts:getWatchPath",
	LOCAL_EXPERTS_GET_PLUGIN_JSON_PATH: "localExperts:getPluginJsonPath",
	LOCAL_DOCS_REGISTER_MEDIA_ARTIFACT: "localDocs:registerMediaArtifact"
};
/**
* pending 系统通知防抖时长：瞬时 pending（如桌面 adapter 对非黑名单工具的 auto-approve）
* 会在该窗口内被 resolve，从而不弹系统通知；真面板 pending 持续更久，正常弹。
*/
var TASK_PENDING_NOTIFICATION_DEBOUNCE_MS = 1500;
function createTaskPendingNotificationScheduler(debounceMs = TASK_PENDING_NOTIFICATION_DEBOUNCE_MS) {
	const timers = /* @__PURE__ */ new Map();
	const cancel = (sessionId) => {
		const timer = timers.get(sessionId);
		if (timer) {
			clearTimeout(timer);
			timers.delete(sessionId);
		}
	};
	return {
		schedule(sessionId, notify) {
			cancel(sessionId);
			const timer = setTimeout(() => {
				timers.delete(sessionId);
				notify();
			}, debounceMs);
			timer.unref?.();
			timers.set(sessionId, timer);
		},
		cancel,
		dispose() {
			for (const timer of timers.values()) clearTimeout(timer);
			timers.clear();
		}
	};
}
function getArtifactUri(artifact) {
	if (!artifact || typeof artifact !== "object") return;
	const uri = artifact.uri;
	return typeof uri === "string" ? uri : void 0;
}
function isArtifactForLocalPath(artifact, filePath) {
	const uri = getArtifactUri(artifact);
	if (!uri) return false;
	const normalizedFilePath = node_path.normalize(filePath);
	if (uri === (0, node_url.pathToFileURL)(normalizedFilePath).href) return true;
	if (node_path.normalize(uri) === normalizedFilePath) return true;
	try {
		return node_path.normalize((0, node_url.fileURLToPath)(uri)) === normalizedFilePath;
	} catch {
		return false;
	}
}
function normalizePathForComparison(filePath) {
	const normalized = node_path.normalize(filePath);
	return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}
function isPathInsideDirectory(candidate, directory) {
	const relative = node_path.relative(normalizePathForComparison(directory), normalizePathForComparison(candidate));
	return relative === "" || !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
/** 无 targetSessionId 时，禁止把文件登记到 cwd 不含该路径的会话。cwd 未知则保持旧回退。 */
function isPresentFilesPathInsideOwnerSession(mediaService, sessionId, filePath) {
	const sessionCwd = mediaService.getSessionCwd?.(sessionId);
	if (!sessionCwd) return true;
	return isPathInsideDirectory(filePath, sessionCwd);
}
async function hasSessionArtifactForLocalPath(mediaService, sessionId, filePath) {
	if (typeof mediaService.getSessionArtifacts !== "function") return false;
	try {
		const artifacts = await mediaService.getSessionArtifacts(sessionId);
		return Array.isArray(artifacts) && artifacts.some((artifact) => isArtifactForLocalPath(artifact, filePath));
	} catch {
		return false;
	}
}
function pushWorkbuddySessionEvent(publisher, event) {
	publisher.push(`${require_contract.SESSION_RPC_CHANNELS.EVENT}:${event.sessionId}`, event);
}
function pushWorkbuddySessionExtNotification(publisher, sessionId, method, params) {
	pushWorkbuddySessionEvent(publisher, {
		type: "extNotification",
		sessionId,
		method,
		params
	});
}
function pushWorkbuddySessionNavigateEvent(publisher, event) {
	publisher.push(require_contract.SESSION_RPC_CHANNELS.NAVIGATE, event);
}
function registerSessionsHandlers(registry, deps) {
	const { permissionRequests, sessionManager, monitorEvent } = deps;
	require_handler_registry.handleRpc(registry, "createSession", async (params) => sessionManager.createSession(params ?? {}));
	require_handler_registry.handleRpc(registry, "destroySession", async (sessionId) => {
		permissionRequests.delete(sessionId);
		await sessionManager.destroySession(sessionId);
	});
	require_handler_registry.handleRpc(registry, "deleteSession", async (sessionId) => {
		if (typeof sessionId !== "string" || !sessionId.trim()) return { status: "cancelled" };
		const normalizedSessionId = sessionId.trim();
		if (typeof sessionManager.deleteSessionWithLifecycle === "function") return { status: await sessionManager.deleteSessionWithLifecycle(normalizedSessionId, {
			beforeDelete: async () => {
				const beforeDelete = await Promise.resolve(deps.beforeDeleteSession?.(normalizedSessionId) ?? "continue");
				if (beforeDelete === "continue") permissionRequests.delete(normalizedSessionId);
				return beforeDelete;
			},
			afterDelete: () => deps.broadcastSessionDeleted?.(normalizedSessionId),
			abortDelete: () => deps.abortDeleteSession?.(normalizedSessionId)
		}) };
		if (await Promise.resolve(deps.beforeDeleteSession?.(normalizedSessionId) ?? "continue") === "cancelled") return { status: "cancelled" };
		permissionRequests.delete(normalizedSessionId);
		try {
			await sessionManager.deleteSession(normalizedSessionId);
			await Promise.resolve(deps.broadcastSessionDeleted?.(normalizedSessionId));
			return { status: "deleted" };
		} catch (error) {
			await Promise.resolve(deps.abortDeleteSession?.(normalizedSessionId));
			throw error;
		}
	});
	require_handler_registry.handleRpc(registry, "listSessions", async (options) => {
		return {
			agents: await sessionManager.listSessionRecords(options),
			pagination: null
		};
	});
	require_handler_registry.handleRpc(registry, "getSession", async (sessionId) => {
		const active = sessionManager.getSession(sessionId);
		if (active) return active;
		return sessionManager.getSessionRecord(sessionId);
	});
	require_handler_registry.handleRpc(registry, "prompt", async (sessionId, raw, metaArg) => {
		let options = metaArg ? { _meta: metaArg } : void 0;
		const promptPayload = raw;
		let content;
		if (promptPayload && typeof promptPayload === "object" && !Array.isArray(promptPayload) && "content" in promptPayload) {
			content = promptPayload.content;
			if (promptPayload._meta) options = {
				...options,
				_meta: promptPayload._meta
			};
		} else content = promptPayload;
		const prompt = typeof content === "string" ? [{
			type: "text",
			text: content
		}] : content;
		const upstreamMeta = options?._meta;
		const upstreamCbMeta = upstreamMeta?.["codebuddy.ai"] ?? {};
		const upstreamTraceId = typeof upstreamCbMeta.traceId === "string" && require_traceparent.isValidW3CTraceId(upstreamCbMeta.traceId) ? upstreamCbMeta.traceId : void 0;
		const requestId = typeof upstreamCbMeta.requestId === "string" ? upstreamCbMeta.requestId : "";
		const userId = typeof upstreamCbMeta.userId === "string" ? upstreamCbMeta.userId : "";
		const clientSendTime = typeof upstreamCbMeta.clientSendTime === "number" ? upstreamCbMeta.clientSendTime : 0;
		const mode = String(upstreamCbMeta.mode ?? "");
		const model = String(upstreamCbMeta.model ?? "");
		const modelIsThinking = Boolean(upstreamCbMeta.modelIsThinking);
		const reasoningEffort = upstreamCbMeta.reasoningEffort;
		const isPlayground = Boolean(upstreamCbMeta.isPlayground);
		const expertId = String(upstreamCbMeta.expertId ?? "");
		const ardotFileAction = String(upstreamCbMeta.ardotFileAction ?? "");
		const upstreamConversationId = String(upstreamCbMeta.conversationId ?? sessionId);
		if (monitorEvent && upstreamTraceId) try {
			require_daemon_id_generator.daemonIdGenerator.setNextTraceId(upstreamTraceId);
			const receivedSpan = require_code_cache.trace.getTracer("workbuddy-server").startSpan("daemon.prompt.receive", {
				kind: require_code_cache.SpanKind.SERVER,
				attributes: {
					"conversation.request.id": requestId,
					"workbuddy.session_id": sessionId,
					"workbuddy.conversation_id": upstreamConversationId,
					"workbuddy.conversation_request_id": requestId,
					"workbuddy.prompt_request_id": requestId,
					"workbuddy.uid": userId,
					"workbuddy.client_send_time": clientSendTime,
					"workbuddy.client_to_main_ms": clientSendTime ? Date.now() - clientSendTime : 0,
					"workbuddy.mode": mode,
					"workbuddy.model": model,
					"workbuddy.model_is_thinking": modelIsThinking,
					...reasoningEffort ? { "workbuddy.reasoning_effort": reasoningEffort } : {},
					"workbuddy.is_playground": isPlayground,
					"workbuddy.expert_id": expertId,
					"workbuddy.ardot_file_action": ardotFileAction
				}
			}, require_code_cache.ROOT_CONTEXT);
			receivedSpan.setStatus({ code: require_code_cache.SpanStatusCode.OK });
			receivedSpan.end();
			require_daemon_id_generator.daemonIdGenerator.setNextTraceId(upstreamTraceId);
			const validateSpan = require_code_cache.trace.getTracer("workbuddy-server").startSpan("daemon.prompt.validate", {
				kind: require_code_cache.SpanKind.INTERNAL,
				attributes: {
					"conversation.request.id": requestId,
					"workbuddy.session_id": sessionId,
					"workbuddy.conversation_id": upstreamConversationId,
					"workbuddy.prompt_request_id": requestId
				}
			}, require_code_cache.ROOT_CONTEXT);
			validateSpan.setStatus({ code: require_code_cache.SpanStatusCode.OK });
			validateSpan.end();
		} catch {}
		if (upstreamTraceId) require_daemon_id_generator.daemonIdGenerator.setNextTraceId(upstreamTraceId);
		const daemonPromptSpan = require_code_cache.trace.getTracer("workbuddy-server").startSpan("daemon.prompt.forward", {
			kind: require_code_cache.SpanKind.CLIENT,
			attributes: {
				"conversation.request.id": requestId,
				"workbuddy.session_id": sessionId,
				"workbuddy.conversation_id": upstreamConversationId,
				"workbuddy.conversation_request_id": requestId,
				"workbuddy.prompt_request_id": requestId,
				"workbuddy.uid": userId,
				"workbuddy.client_send_time": clientSendTime,
				"workbuddy.client_to_main_ms": clientSendTime ? Date.now() - clientSendTime : 0,
				"workbuddy.mode": mode,
				"workbuddy.model": model,
				"workbuddy.model_is_thinking": modelIsThinking,
				...reasoningEffort ? { "workbuddy.reasoning_effort": reasoningEffort } : {},
				"workbuddy.is_playground": isPlayground,
				"workbuddy.expert_id": expertId,
				"workbuddy.ardot_file_action": ardotFileAction
			}
		}, require_code_cache.ROOT_CONTEXT);
		const daemonSpanCtx = daemonPromptSpan.spanContext();
		const daemonTraceparent = require_traceparent.formatTraceparent({
			traceId: daemonSpanCtx.traceId,
			spanId: daemonSpanCtx.spanId,
			flags: daemonSpanCtx.traceFlags ?? 1
		});
		daemonPromptSpan.setStatus({ code: require_code_cache.SpanStatusCode.OK });
		daemonPromptSpan.end();
		const mergedCbMeta = daemonTraceparent ? {
			...upstreamCbMeta,
			traceparent: daemonTraceparent
		} : upstreamCbMeta;
		const hasCbMeta = Object.keys(mergedCbMeta).length > 0;
		const buddyBaggage = require_conversations.mergeBuddyBaggage(upstreamMeta?.baggage, require_buddy_telemetry_context.getBuddyTelemetryContext());
		const metaWithTrace = {
			...upstreamMeta ?? {},
			...hasCbMeta ? { "codebuddy.ai": mergedCbMeta } : {},
			...buddyBaggage ? { baggage: buddyBaggage } : {},
			...options?.planMode ? { planMode: true } : {}
		};
		const meta = Object.keys(metaWithTrace).length > 0 ? metaWithTrace : void 0;
		if (monitorEvent) {
			const cbMeta = mergedCbMeta;
			const traceId = typeof cbMeta.traceId === "string" ? cbMeta.traceId : "";
			const requestId = typeof cbMeta.requestId === "string" ? cbMeta.requestId : "";
			const userId = typeof cbMeta.userId === "string" ? cbMeta.userId : "";
			const clientSendTime = typeof cbMeta.clientSendTime === "number" ? cbMeta.clientSendTime : 0;
			try {
				monitorEvent("wb_main_prompt_received", {
					ext1: traceId,
					ext2: sessionId,
					ext3: requestId,
					trace_id: traceId,
					span_id: daemonSpanCtx.spanId,
					conversation_id: sessionId,
					conversation_request_id: requestId,
					uid: userId,
					client_to_main_ms: clientSendTime ? Date.now() - clientSendTime : 0
				});
			} catch {}
		}
		const promptStartMs = Date.now();
		const emitDoneSpan = (ok, errorMessage, errorName) => {
			try {
				require_daemon_id_generator.daemonIdGenerator.setNextTraceId(daemonSpanCtx.traceId);
				const doneSpan = require_code_cache.trace.getTracer("workbuddy-server").startSpan("daemon.prompt.done", {
					kind: require_code_cache.SpanKind.INTERNAL,
					attributes: {
						"conversation.request.id": requestId,
						"workbuddy.session_id": sessionId,
						"workbuddy.conversation_id": upstreamConversationId,
						"workbuddy.conversation_request_id": requestId,
						"workbuddy.prompt_request_id": requestId,
						"workbuddy.uid": userId,
						"workbuddy.ok": ok ? 1 : 0,
						"workbuddy.duration_ms": Date.now() - promptStartMs,
						"workbuddy.status": ok ? "ok" : "error",
						"workbuddy.mode": mode,
						"workbuddy.model": model,
						"workbuddy.model_is_thinking": modelIsThinking,
						...reasoningEffort ? { "workbuddy.reasoning_effort": reasoningEffort } : {},
						"workbuddy.is_playground": isPlayground,
						"workbuddy.expert_id": expertId,
						"workbuddy.ardot_file_action": ardotFileAction,
						...errorMessage ? { "workbuddy.error_message": errorMessage } : {},
						...errorName ? { "workbuddy.error_name": errorName } : {}
					}
				}, require_code_cache.ROOT_CONTEXT);
				doneSpan.setStatus({ code: ok ? require_code_cache.SpanStatusCode.OK : require_code_cache.SpanStatusCode.ERROR });
				doneSpan.end();
			} catch {}
		};
		try {
			const promptResult = await sessionManager.prompt(sessionId, prompt, meta);
			emitDoneSpan(true);
			return promptResult;
		} catch (err) {
			emitDoneSpan(false, err instanceof Error ? err.message : String(err), err instanceof Error ? err.name : void 0);
			throw err;
		}
	});
	require_handler_registry.handleRpc(registry, "cancel", async (sessionId) => sessionManager.cancel(sessionId));
	/**
	* session/rollback: 将会话历史指针回退到指定 fork 点。
	* 通过 sessionManager.callExtMethod 调用 CLI 端 handleRollback。
	* @see issue #50495 / docs/plans/2026-06-20-resend-edit-unified-plan.md Phase 2
	*/
	require_handler_registry.handleRpc(registry, "sessionRollback", async (sessionId, params) => {
		const rollbackParams = params ?? {};
		const reason = rollbackParams.reason;
		const result = await sessionManager.callExtMethod(sessionId, "_codebuddy.ai/session/rollback", {
			sessionId,
			...rollbackParams
		});
		const applied = result?.applied;
		if (applied === true) sessionManager.invalidateStoredSessionHistory(sessionId);
		if (reason === "resend_edit" && applied && deps.releaseSessionOriginalFileTracking) await deps.releaseSessionOriginalFileTracking(sessionId).catch((err) => {
			console.warn("[TencentDocs] releaseSessionOriginalFileTracking failed", {
				sessionId,
				error: err instanceof Error ? err.message : String(err)
			});
		});
		return result;
	});
	require_handler_registry.handleRpc(registry, "loadSession", async (sessionId, params) => {
		const session = await sessionManager.loadSession(sessionId, params?.cwd, { forceRendererHistoryReplay: params?.forceRendererHistoryReplay === true });
		await sessionManager.replayPendingInputs(sessionId);
		return {
			...session,
			loaded: true,
			rendererHistoryReplayComplete: true
		};
	});
	require_handler_registry.handleRpc(registry, "notifyListenerReady", async (sessionId) => {
		await sessionManager.replayPendingInputs(sessionId);
		return {
			sessionId,
			replayed: true
		};
	});
	require_handler_registry.handleRpc(registry, "setSessionMode", async (sessionId, modeId) => {
		try {
			return await sessionManager.setSessionMode(sessionId, { modeId });
		} catch {
			return { success: true };
		}
	});
	require_handler_registry.handleRpc(registry, "setSessionModel", async (sessionId, modelId) => {
		try {
			return await sessionManager.setSessionModel(sessionId, { modelId });
		} catch {
			return { success: true };
		}
	});
	require_handler_registry.handleRpc(registry, "setSessionConfigOption", async (sessionId, configId, value) => {
		try {
			await sessionManager.setSessionConfigOption(sessionId, configId, value ?? "");
		} catch (err) {
			console.warn("[Workbuddy] setSessionConfigOption ignored", {
				sessionId,
				configId,
				error: err instanceof Error ? err.message : String(err)
			});
		}
	});
	require_handler_registry.handleRpc(registry, "updateSessionConfig", async (sessionId, patch, resumeCwd, options) => sessionManager.updateSessionConfig(sessionId, patch ?? {}, resumeCwd, options));
	require_handler_registry.handleRpc(registry, "archiveSession", async (sessionId) => sessionManager.archiveSession(sessionId));
	require_handler_registry.handleRpc(registry, "renameSession", async (sessionId, title) => sessionManager.renameSession(sessionId, title));
	require_handler_registry.handleRpc(registry, "moveSession", async (sessionId) => sessionManager.moveSession(sessionId));
	require_handler_registry.handleRpc(registry, "updateSessionStatus", async (sessionId, status) => sessionManager.updateSessionStatus(sessionId, status));
	require_handler_registry.handleRpc(registry, "getAvailableCommands", async (params) => {
		try {
			return await sessionManager.getAvailableCommands(params);
		} catch {
			return [];
		}
	});
	require_handler_registry.handleRpc(registry, "getSubagentList", async (params) => {
		try {
			return await sessionManager.getSubagentList(params);
		} catch {
			return {
				subagents: [],
				results: []
			};
		}
	});
	require_handler_registry.handleRpc(registry, "respondToSampling", async (sessionId, response) => sessionManager.respondToSampling(sessionId, response));
	require_handler_registry.handleRpc(registry, "respondToRoots", async (sessionId, response) => sessionManager.respondToRoots(sessionId, response));
	require_handler_registry.handleRpc(registry, "requestYield", async (sessionId) => {
		try {
			return await sessionManager.requestYield(sessionId);
		} catch {
			return false;
		}
	});
	require_handler_registry.handleRpc(registry, "getMessageQueue", async (sessionId) => {
		try {
			return await sessionManager.getMessageQueue(sessionId);
		} catch {
			return { items: [] };
		}
	});
	require_handler_registry.handleRpc(registry, "saveMessageQueue", async (data) => {
		try {
			await sessionManager.saveMessageQueue(data);
		} catch {}
	});
	require_handler_registry.handleRpc(registry, "enqueueMessage", async (sessionId, contentBlocks) => {
		try {
			return await sessionManager.enqueueMessage(sessionId, contentBlocks);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "removeQueueItem", async (sessionId, itemId) => {
		try {
			return await sessionManager.removeQueueItem(sessionId, itemId);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "popQueueItemForEdit", async (sessionId, itemId) => {
		try {
			return await sessionManager.popQueueItemForEdit(sessionId, itemId);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "reorderQueue", async (sessionId, orderedIds) => {
		try {
			return await sessionManager.reorderQueue(sessionId, orderedIds);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "sendQueueItemNow", async (sessionId, itemId) => {
		try {
			return await sessionManager.sendQueueItemNow(sessionId, itemId);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "activateQueue", async (sessionId) => {
		try {
			return await sessionManager.activateMessageQueue(sessionId);
		} catch {
			return { success: false };
		}
	});
	require_handler_registry.handleRpc(registry, "pauseQueue", async (sessionId, reason) => {
		try {
			return await sessionManager.pauseMessageQueue(sessionId, reason);
		} catch {
			return { success: false };
		}
	});
	require_handler_registry.handleRpc(registry, "resumeQueue", async (sessionId) => {
		try {
			return await sessionManager.resumeMessageQueue(sessionId);
		} catch {
			return { success: false };
		}
	});
	require_handler_registry.handleRpc(registry, "cancelQueue", async (sessionId) => {
		try {
			return await sessionManager.cancelMessageQueue(sessionId);
		} catch {
			return { success: false };
		}
	});
	require_handler_registry.handleRpc(registry, "getQueueState", async (sessionId) => {
		try {
			return await sessionManager.getQueueState(sessionId);
		} catch {
			return null;
		}
	});
	require_handler_registry.handleRpc(registry, "respondToPermission", async (sessionId, requestId, optionId) => sessionManager.respondToPermission(sessionId, requestId, optionId));
	require_handler_registry.handleRpc(registry, "rejectPermission", async (sessionId, requestId, reason) => sessionManager.rejectPermission(sessionId, requestId, reason));
	require_handler_registry.handleRpc(registry, "resolveInterruption", async (sessionId, toolCallId, decision, answers) => sessionManager.resolveInterruption(sessionId, toolCallId, decision, answers));
	require_handler_registry.handleRpc(registry, "answerQuestion", async (sessionId, toolCallId, answers) => sessionManager.answerQuestion(sessionId, toolCallId, answers));
	require_handler_registry.handleRpc(registry, "cancelQuestion", async (sessionId, toolCallId, reason) => sessionManager.cancelQuestion(sessionId, toolCallId, reason));
	require_handler_registry.handleRpc(registry, "answerCloudServiceConfirmation", async (sessionId, toolCallId, result) => sessionManager.answerCloudServiceConfirmation(sessionId, toolCallId, result));
	require_handler_registry.handleRpc(registry, "respondElicitation", async (sessionId, elicitationId, action, content) => sessionManager.respondElicitation(sessionId, elicitationId, action, content));
	if (deps.poiQuestionRegistry) {
		const poiRegistry = deps.poiQuestionRegistry;
		require_handler_registry.handleRpc(registry, "answerPoiQuestion", async (sessionId, requestId, result) => poiRegistry.answer(sessionId, requestId, result));
	}
	if (deps.applicationPickQuestionRegistry) require_handler_registry.handleRpc(registry, "answerAppPickQuestion", async (sessionId, requestId, result) => sessionManager.answerAppPickQuestion(sessionId, requestId, result));
	if (deps.pushSessionPoi) {
		const pushPoi = deps.pushSessionPoi;
		require_handler_registry.handleRpc(registry, "pushSessionPoi", async (sessionId, poi) => {
			pushPoi(sessionId, poi);
			return { success: true };
		});
	}
}
/**
* Push a builtin session command to the owning session when ownership can be
* inferred from a local artifact path or command cwd. Ambiguous openBrowser
* commands are intentionally dropped to avoid cross-session preview fanout.
*/
async function pushWorkbuddySessionCommand(deps, action, params) {
	const targetSessionId = typeof params.targetSessionId === "string" && params.targetSessionId.trim().length > 0 ? params.targetSessionId.trim() : void 0;
	const targetIsMainContentCore = targetSessionId ? deps.sessionManager.hasSession(targetSessionId) : false;
	const commandParams = targetSessionId ? Object.fromEntries(Object.entries(params).filter(([key]) => key !== "targetSessionId")) : params;
	if (action === "poiPick" && targetSessionId) {
		pushWorkbuddySessionExtNotification(deps.publisher, targetSessionId, "_codebuddy.ai/command", {
			action,
			params: commandParams
		});
		return;
	}
	if (targetSessionId && !targetIsMainContentCore && (action === "openBrowser" || action === "openResultView")) {
		deps.notifyConversationExtensionMethod?.({
			conversationId: targetSessionId,
			method: "command",
			params: {
				action,
				params: commandParams
			}
		});
		return;
	}
	let artifactFilePath;
	let commandCwd;
	let artifactSourceType;
	if (action === "openResultView" && typeof params.targetFile === "string") {
		artifactFilePath = params.targetFile;
		if (params.skipArtifact !== true) artifactSourceType = "open_result_view";
	} else if (action === "openBrowser" && typeof params.url === "string") {
		const localPath = extractPreviewUrlLocalPath(params.url);
		if (localPath) {
			artifactFilePath = localPath;
			if (params.skipArtifact !== true) artifactSourceType = "preview_url";
		} else if (typeof params.cwd === "string" && params.cwd.trim().length > 0) commandCwd = params.cwd.trim();
	}
	let ownerSessionId = targetIsMainContentCore ? targetSessionId : void 0;
	let sessionsCache;
	const listSessionsOnce = async () => {
		sessionsCache ??= await deps.sessionManager.listSessions();
		return sessionsCache;
	};
	const mediaService = deps.getMediaService();
	if (action === "presentFiles" && Array.isArray(params.files)) {
		const focusFile = require_conversations.normalizePresentFilesLocalInput(params.focusFile);
		const normalizedFiles = params.files.flatMap((raw) => {
			const filePath = require_conversations.normalizePresentFilesLocalInput(raw);
			if (!filePath && typeof raw === "string") deps.logger?.warn("[Daemon] Skip unresolved presentFiles path", { filePath: raw });
			return filePath ? [filePath] : [];
		});
		const normalizedCommandParams = {
			...Object.fromEntries(Object.entries(commandParams).filter(([key]) => key !== "files" && key !== "focusFile")),
			files: normalizedFiles,
			...focusFile ? { focusFile } : {}
		};
		const explanation = params.explanation;
		const requestId = typeof params.requestId === "string" ? params.requestId : void 0;
		if (targetSessionId && !targetIsMainContentCore) {
			if (focusFile) await pushWorkbuddySessionCommand(deps, "openResultView", {
				targetFile: focusFile,
				skipArtifact: true,
				viewType: "artifacts",
				...requestId ? { requestId } : {},
				...typeof explanation === "string" ? { explanation } : {},
				targetSessionId
			});
			else deps.notifyConversationExtensionMethod?.({
				conversationId: targetSessionId,
				method: "command",
				params: {
					action,
					params: normalizedCommandParams
				}
			});
			return;
		}
		if (!mediaService) {
			deps.logger?.warn("[Daemon] Skip presentFiles command because media service is unavailable", { params });
			return;
		}
		let existingArtifactFocusFile;
		const scopedSessionIds = /* @__PURE__ */ new Set();
		const beginScope = mediaService.beginArtifactBatchScope?.bind(mediaService);
		const endScope = mediaService.endArtifactBatchScope?.bind(mediaService);
		try {
			for (const filePath of normalizedFiles) {
				let sessionId = targetIsMainContentCore ? targetSessionId : void 0;
				if (!sessionId) {
					sessionId = mediaService.findOwnerSessionIdForPath(filePath);
					if (!sessionId && typeof params.cwd === "string") sessionId = mediaService.findOwnerSessionIdForCwd(params.cwd.trim());
					if (!sessionId) try {
						const sessions = await listSessionsOnce();
						if (sessions.length === 1) sessionId = sessions[0]?.sessionId;
					} catch {}
					if (sessionId && !isPresentFilesPathInsideOwnerSession(mediaService, sessionId, filePath)) continue;
				}
				if (!sessionId) continue;
				ownerSessionId ??= sessionId;
				if (!existingArtifactFocusFile && await hasSessionArtifactForLocalPath(mediaService, sessionId, filePath)) existingArtifactFocusFile = filePath;
				if (beginScope && !scopedSessionIds.has(sessionId)) {
					beginScope(sessionId);
					scopedSessionIds.add(sessionId);
				}
				mediaService.registerExplicitMedia({
					sessionId,
					filePath,
					sourceType: "present_files"
				});
				await mediaService.pushMediaForFile(sessionId, filePath, {
					sourceTool: "PresentFiles",
					allowUnknownExtension: true,
					requestId
				});
			}
		} finally {
			if (endScope) for (const sessionId of scopedSessionIds) endScope(sessionId);
		}
		for (const sessionId of scopedSessionIds) mediaService.flushPendingArtifactEventsForSession?.(sessionId);
		const focusSessionId = ownerSessionId;
		const targetFocusFile = existingArtifactFocusFile ?? focusFile;
		if (focusSessionId && targetFocusFile) {
			await pushWorkbuddySessionCommand(deps, "openResultView", {
				targetFile: targetFocusFile,
				skipArtifact: true,
				viewType: "artifacts",
				...requestId ? { requestId } : {},
				...typeof explanation === "string" ? { explanation } : {},
				...targetIsMainContentCore && targetSessionId ? { targetSessionId } : {}
			});
			return;
		}
		deps.logger?.warn("[Daemon] Skip presentFiles command because no file was registered into an owning session", { params });
		return;
	}
	if (artifactFilePath && mediaService) {
		const isKnownMedia = mediaService.isKnownMediaExtension(artifactFilePath);
		ownerSessionId ??= mediaService.findOwnerSessionIdForPath(artifactFilePath);
		if (!ownerSessionId) try {
			const sessions = await listSessionsOnce();
			if (sessions.length === 1) ownerSessionId = sessions[0]?.sessionId;
		} catch {}
		if (ownerSessionId && artifactSourceType && isKnownMedia) {
			mediaService.registerExplicitMedia({
				sessionId: ownerSessionId,
				filePath: artifactFilePath,
				sourceType: artifactSourceType
			});
			await mediaService.pushMediaForFile(ownerSessionId, artifactFilePath);
			mediaService.flushPendingArtifactEventsForSession?.(ownerSessionId);
		}
	}
	if (!ownerSessionId && commandCwd && mediaService) ownerSessionId = mediaService.findOwnerSessionIdForCwd(commandCwd);
	if (targetIsMainContentCore && targetSessionId) {
		pushWorkbuddySessionExtNotification(deps.publisher, targetSessionId, "_codebuddy.ai/command", {
			action,
			params: commandParams
		});
		return;
	}
	try {
		const sessions = await listSessionsOnce();
		if (!ownerSessionId && action === "openBrowser") {
			if (sessions.length === 1) ownerSessionId = sessions[0]?.sessionId;
			else {
				deps.logger?.warn(`[Daemon] Skip ${action} command because owner session is ambiguous`, { params });
				return;
			}
		}
		for (const session of sessions) {
			if (ownerSessionId && session.sessionId !== ownerSessionId) continue;
			pushWorkbuddySessionExtNotification(deps.publisher, session.sessionId, "_codebuddy.ai/command", {
				action,
				params
			});
		}
	} catch {}
}
function handleWorkbuddyClawSessionUpsertSinkEvent(channel, data, sink, clawCwd) {
	if (channel !== require_contract.SESSION_RPC_CHANNELS.UPSERTED || !clawCwd || !data || typeof data !== "object") return false;
	const payload = data;
	if (!isClawWorkspaceCwd(typeof payload.cwd === "string" ? payload.cwd : void 0, clawCwd)) return false;
	const sessionId = typeof payload.id === "string" ? payload.id : typeof payload.sessionId === "string" ? payload.sessionId : void 0;
	if (sessionId && typeof payload.status === "string") pushWorkbuddySessionEvent({ push: sink }, {
		type: "sessionStatusUpdate",
		sessionId,
		status: payload.status,
		pendingInputKind: payload.pendingInputKind,
		updatedAt: typeof payload.updatedAt === "number" ? payload.updatedAt : void 0,
		lastActivityAt: typeof payload.lastActivityAt === "number" ? payload.lastActivityAt : void 0
	});
	return true;
}
function handleWorkbuddySessionTaskStatusSinkEvent(channel, data, state, notifier, logger, pendingNotificationScheduler) {
	if (channel !== require_contract.SESSION_RPC_CHANNELS.UPSERTED || !data || typeof data !== "object") return;
	const payload = data;
	const sessionId = typeof payload.id === "string" ? payload.id : typeof payload.sessionId === "string" ? payload.sessionId : void 0;
	const newStatus = typeof payload.status === "string" ? payload.status : void 0;
	if (!sessionId || !newStatus) return;
	const prevStatus = state.get(sessionId);
	state.set(sessionId, newStatus);
	if (newStatus === "pending" || newStatus === "completed") {
		const pendingInputKind = typeof payload.pendingInputKind === "string" ? payload.pendingInputKind : void 0;
		logger?.log(`[TaskStatusNotifier] upsert received: session=${sessionId} prev=${prevStatus ?? "<none>"} new=${newStatus} kind=${pendingInputKind ?? "<none>"}`);
	}
	if (prevStatus === "pending" && newStatus !== "pending") pendingNotificationScheduler?.cancel(sessionId);
	if (newStatus === "completed" && prevStatus && prevStatus !== "completed" && prevStatus !== "archived") {
		const title = typeof payload.title === "string" && payload.title ? payload.title : typeof payload.name === "string" && payload.name ? payload.name : "任务";
		logger?.log(`[TaskStatusNotifier] Task completed: session=${sessionId} (was "${prevStatus}"), sending notification...`);
		notifier.showTaskCompletedNotification({
			sessionId,
			taskTitle: title
		});
	}
	if (newStatus === "pending" && prevStatus && prevStatus !== "pending") {
		const title = typeof payload.title === "string" && payload.title ? payload.title : typeof payload.name === "string" && payload.name ? payload.name : "任务";
		const pendingKind = payload.pendingInputKind === "permission" || payload.pendingInputKind === "question" || payload.pendingInputKind === "user_input" ? payload.pendingInputKind : "question";
		const notify = () => {
			if (state.get(sessionId) !== "pending") return;
			logger?.log(`[TaskStatusNotifier] Task pending confirmation: session=${sessionId} (was "${prevStatus}", kind=${pendingKind}), sending notification...`);
			notifier.showTaskPendingNotification({
				sessionId,
				taskTitle: title,
				pendingKind
			});
		};
		if (pendingNotificationScheduler) pendingNotificationScheduler.schedule(sessionId, notify);
		else notify();
	}
}
function trackWorkbuddySessionPermissionRequest(requestsBySession, data) {
	if (!data || typeof data !== "object") return;
	const payload = data;
	if (payload.type !== "permissionRequest") return;
	const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : null;
	const requestId = typeof payload.requestId === "string" ? payload.requestId : null;
	const toolCallId = typeof payload.request?.toolCall?.toolCallId === "string" ? payload.request.toolCall.toolCallId : null;
	if (!sessionId || !requestId || !toolCallId) return;
	let byToolCall = requestsBySession.get(sessionId);
	if (!byToolCall) {
		byToolCall = /* @__PURE__ */ new Map();
		requestsBySession.set(sessionId, byToolCall);
	}
	byToolCall.set(toolCallId, requestId);
}
function getWorkbuddySessionPermissionDiagnosticEvent(data) {
	if (!data || typeof data !== "object") return null;
	return data;
}
function isWorkbuddySessionPermissionDiagnosticEvent(event) {
	return event?.type === "permissionRequest" || event?.type === "questionRequest" || event?.type === "permissionResolved";
}
function handleWorkbuddySessionEventSinkEvent({ channel, data, sink, permissionRequests, imPermissions, detectLifecycle, clawCwd, lastKnownSessionStatus, taskStatusNotifier, taskStatusLogger, pendingNotificationScheduler, scheduleRuntimeSweep, logger }) {
	trackWorkbuddySessionPermissionRequest(permissionRequests, data);
	const eventPayload = getWorkbuddySessionPermissionDiagnosticEvent(data);
	if (isWorkbuddySessionPermissionDiagnosticEvent(eventPayload)) {
		const innerToolCallId = eventPayload?.request?.toolCall?.toolCallId;
		const innerToolName = eventPayload?.request?.toolCall?.rawInput?.name;
		logger?.info("[PermDiag][Main][EventSink] forwarding event", {
			channel,
			type: eventPayload?.type,
			sessionId: typeof eventPayload?.sessionId === "string" ? eventPayload.sessionId : "N/A",
			requestId: typeof eventPayload?.requestId === "string" ? eventPayload.requestId : "N/A",
			toolCallId: typeof eventPayload?.toolCallId === "string" ? eventPayload.toolCallId : typeof innerToolCallId === "string" ? innerToolCallId : "N/A",
			toolName: typeof innerToolName === "string" ? innerToolName : "N/A"
		});
	}
	handleWorkbuddySessionImPermissionRequestSinkEvent(imPermissions, data, logger);
	if (!detectLifecycle(channel, data, sink)) {
		if (!handleWorkbuddyClawSessionUpsertSinkEvent(channel, data, sink, clawCwd)) {
			if (isWorkbuddySessionPermissionDiagnosticEvent(eventPayload)) logger?.info("[PermDiag][Main][SinkDispatch] sink event to renderer", {
				channel,
				type: eventPayload?.type,
				sessionId: typeof eventPayload?.sessionId === "string" ? eventPayload.sessionId : "N/A",
				requestId: typeof eventPayload?.requestId === "string" ? eventPayload.requestId : "N/A"
			});
			sink(channel, data);
		}
	}
	handleWorkbuddySessionTaskStatusSinkEvent(channel, data, lastKnownSessionStatus, taskStatusNotifier, taskStatusLogger, pendingNotificationScheduler);
	if (channel === require_contract.SESSION_RPC_CHANNELS.DELETED) {
		const deletedSessionId = typeof eventPayload?.sessionId === "string" ? eventPayload.sessionId : void 0;
		if (deletedSessionId) {
			pendingNotificationScheduler?.cancel(deletedSessionId);
			lastKnownSessionStatus.delete(deletedSessionId);
		}
	}
	if (channel === require_contract.SESSION_RPC_CHANNELS.UPSERTED || channel === require_contract.SESSION_RPC_CHANNELS.DELETED) scheduleRuntimeSweep?.();
}
function pushWorkbuddySessionPermissionRequestToBridge(permissions, data, logger) {
	if (!data || typeof data !== "object") return false;
	const payload = data;
	if (payload.type !== "permissionRequest") return false;
	const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
	const requestId = typeof payload.requestId === "string" ? payload.requestId : "";
	const toolCall = payload.request?.toolCall;
	const toolCallId = typeof toolCall?.toolCallId === "string" ? toolCall.toolCallId : "";
	if (!sessionId || !requestId || !toolCallId) return false;
	const metaToolName = toolCall?._meta?.["codebuddy.ai/toolName"];
	const nestedCodebuddyMeta = toolCall?._meta?.["codebuddy.ai"];
	const clientRequestId = typeof toolCall?._meta?.["codebuddy.ai/clientRequestId"] === "string" ? toolCall._meta["codebuddy.ai/clientRequestId"] : nestedCodebuddyMeta && typeof nestedCodebuddyMeta === "object" && !Array.isArray(nestedCodebuddyMeta) && typeof nestedCodebuddyMeta.clientRequestId === "string" ? nestedCodebuddyMeta.clientRequestId : void 0;
	const rawInputObj = toolCall?.rawInput && typeof toolCall.rawInput === "object" ? toolCall.rawInput : void 0;
	const toolName = typeof metaToolName === "string" && metaToolName || (typeof rawInputObj?.name === "string" ? rawInputObj.name : "") || "unknown";
	let rawInput = "";
	try {
		rawInput = typeof toolCall?.rawInput === "string" ? toolCall.rawInput : JSON.stringify(toolCall?.rawInput ?? {});
	} catch {
		rawInput = "(unserializable)";
	}
	const options = normalizePermissionOptions(payload.request?.options);
	try {
		Promise.resolve(permissions.handlePermissionEvent(sessionId, {
			requestId,
			toolCallId,
			toolName,
			rawInput,
			...clientRequestId ? { clientRequestId } : {},
			...options && options.length > 0 ? { options } : {},
			description: `\u6267\u884c ${toolName}`
		})).catch((error) => {
			logger?.warn("[SessionPermissionBridge] Permission push failed", {
				sessionId,
				requestId,
				toolCallId,
				error: error instanceof Error ? error.message : String(error)
			});
		});
		return true;
	} catch (error) {
		logger?.warn("[SessionPermissionBridge] Permission push failed", {
			sessionId,
			requestId,
			toolCallId,
			error: error instanceof Error ? error.message : String(error)
		});
		return false;
	}
}
function handleWorkbuddySessionImPermissionRequestSinkEvent(permissions, data, logger) {
	if (!data || typeof data !== "object") return false;
	const payload = data;
	if (payload.type !== "permissionRequest" || typeof payload.sessionId !== "string") return false;
	const isImSession = permissions.findImConversationForSession(payload.sessionId);
	logger?.info?.("[PermDiag][Main][ClawRoute] permissionRequest routing decision", {
		sessionId: payload.sessionId,
		requestId: typeof payload.requestId === "string" ? payload.requestId : "N/A",
		isImSession,
		action: isImSession ? "route-to-claw-im" : "pass-through-to-renderer"
	});
	if (!isImSession) return false;
	return pushWorkbuddySessionPermissionRequestToBridge(permissions, data, logger);
}
function isClawWorkspaceCwd(cwd, clawCwd) {
	if (!cwd) return false;
	const trimmed = cwd.trim();
	if (trimmed.length === 0) return false;
	return node_path.resolve(trimmed).toLowerCase() === node_path.resolve(clawCwd).toLowerCase();
}
function toSessionInfoFromViewState(session) {
	return {
		sessionId: session.sessionId,
		userId: session.userId,
		cwd: session.cwd,
		createdAt: session.createdAt,
		config: session.config,
		status: session.status,
		pendingInputKind: session.pendingInputKind,
		hasActiveTeamMembers: session.hasActiveTeamMembers,
		lastBackendActivityAt: session.lastBackendActivityAt
	};
}
function getLatestClawSessionFromRuntimeSessions(sessions, clawCwd) {
	let latest;
	let latestActivityAt = -1;
	for (const session of sessions) {
		if (!isClawWorkspaceCwd(session.cwd, clawCwd)) continue;
		const activityAt = session.lastBackendActivityAt ?? session.createdAt;
		if (!latest || activityAt > latestActivityAt) {
			latest = session;
			latestActivityAt = activityAt;
		}
	}
	return latest;
}
function buildExplicitConfigPatch(opts) {
	const patch = { ...opts.config ?? {} };
	if (opts.mode !== void 0 && patch.mode === void 0) patch.mode = opts.mode;
	if (opts.model !== void 0 && patch.model === void 0) patch.model = opts.model;
	if (opts.permissionMode !== void 0 && patch.permissionMode === void 0) patch.permissionMode = opts.permissionMode;
	if (opts.expertId !== void 0 && patch.expertId === void 0) patch.expertId = opts.expertId;
	if (opts.locale !== void 0 && patch.locale === void 0) patch.locale = opts.locale;
	if (opts.systemPrompt !== void 0 && patch.systemPrompt === void 0) patch.systemPrompt = opts.systemPrompt;
	if (opts.tools !== void 0 && patch.tools === void 0) patch.tools = opts.tools;
	return Object.keys(patch).length > 0 ? patch : void 0;
}
async function applyExplicitConfigToReusedClawSession(sessionId, opts, deps) {
	const patch = buildExplicitConfigPatch(opts);
	if (!patch) return;
	deps.logger?.info?.("[Daemon][Claw] apply explicit config to reused session", {
		sessionId,
		mode: patch.mode
	});
	return deps.sessionManager.updateSessionConfig(sessionId, patch);
}
async function createOrReuseClawSession(opts, deps) {
	if (!isClawWorkspaceCwd(opts.cwd, deps.clawCwd)) return deps.sessionManager.createSession(opts);
	const key = node_path.resolve((opts.cwd || deps.clawCwd).trim()).toLowerCase();
	const existing = deps.inFlightCreates.get(key);
	if (existing) {
		deps.logger?.info?.("[Daemon][Claw] createSession join in-flight create", {
			cwd: opts.cwd,
			requestedMode: opts.config?.mode ?? opts.mode
		});
		const info = await existing;
		return await applyExplicitConfigToReusedClawSession(info.sessionId, opts, deps) ?? info;
	}
	const promise = (async () => {
		const latestRuntimeSession = getLatestClawSessionFromRuntimeSessions(await deps.sessionManager.listSessions(), deps.clawCwd);
		if (latestRuntimeSession) {
			const active = deps.sessionManager.getSession(latestRuntimeSession.sessionId);
			if (active) {
				deps.logger?.info?.("[Daemon][Claw] createSession reuse runtime session", {
					sessionId: latestRuntimeSession.sessionId,
					cwd: latestRuntimeSession.cwd
				});
				return await applyExplicitConfigToReusedClawSession(latestRuntimeSession.sessionId, opts, deps) ?? toSessionInfoFromViewState(active);
			}
			deps.logger?.info?.("[Daemon][Claw] createSession return runtime session info", {
				sessionId: latestRuntimeSession.sessionId,
				cwd: latestRuntimeSession.cwd
			});
			return await applyExplicitConfigToReusedClawSession(latestRuntimeSession.sessionId, opts, deps) ?? latestRuntimeSession;
		}
		const latest = deps.clawService.getLatestActiveConversation();
		if (latest && isClawWorkspaceCwd(latest.cwd, deps.clawCwd)) {
			const active = deps.sessionManager.getSession(latest.agentSessionId);
			if (active) {
				deps.logger?.info?.("[Daemon][Claw] createSession reuse active session", {
					sessionId: latest.agentSessionId,
					cwd: latest.cwd
				});
				return await applyExplicitConfigToReusedClawSession(latest.agentSessionId, opts, deps) ?? toSessionInfoFromViewState(active);
			}
			deps.logger?.info?.("[Daemon][Claw] createSession resume stored session", {
				sessionId: latest.agentSessionId,
				cwd: latest.cwd
			});
			const resumed = await deps.sessionManager.resumeSession(latest.agentSessionId, latest.cwd);
			return await applyExplicitConfigToReusedClawSession(resumed.sessionId, opts, deps) ?? resumed;
		}
		deps.logger?.info?.("[Daemon][Claw] createSession create new session", { cwd: opts.cwd });
		return deps.sessionManager.createSession(opts);
	})();
	deps.inFlightCreates.set(key, promise);
	try {
		return await promise;
	} finally {
		if (deps.inFlightCreates.get(key) === promise) deps.inFlightCreates.delete(key);
	}
}
function registerWorkbuddySessionCreateConfigHandlers(registry, deps) {
	registry.handle(require_contract.SESSION_RPC_CHANNELS.CREATE, async (params) => {
		const opts = params ?? {};
		const handlerStartedAt = Date.now();
		deps.logger?.info("[session-create] main createSession handler enter", { cwd: typeof opts.cwd === "string" ? opts.cwd : void 0 });
		if (isClawWorkspaceCwd(opts.cwd, deps.claw.cwd) && typeof opts.tools === "string" && opts.tools.length > 0) {
			const blacklist = new Set(deps.claw.disabledTools);
			const filteredStr = opts.tools.split(",").map((t) => t.trim()).filter((t) => t.length > 0 && !blacklist.has(t)).join(",");
			if (filteredStr !== opts.tools) {
				deps.logger?.warn("[Daemon][Claw] createSession: overriding explicit tools in Claw workspace", {
					cwd: opts.cwd,
					removed: opts.tools.split(",").filter((t) => blacklist.has(t.trim()))
				});
				opts.tools = filteredStr;
			}
		}
		const expertId = opts.config?.expertId ?? opts.expertId;
		let preloadedExpertType;
		if (typeof expertId === "string" && expertId.length > 0 && deps.expertResolver && deps.agentTeams) try {
			const resolved = await deps.expertResolver.resolveExpertLocation(expertId, opts.config?.expertMarketplace);
			if (resolved) {
				const { manifest } = resolved;
				preloadedExpertType = manifest.expertType;
				const envValue = deps.agentTeams.resolveEnv({ expertType: manifest.expertType });
				opts.env = {
					...opts.env,
					[deps.agentTeams.envKey]: envValue
				};
				deps.logger?.info(`[AgentTeamsEnvResolver] createSession preload expertId=${expertId} expertType=${manifest.expertType} env=${envValue}`);
			}
		} catch (err) {
			deps.logger?.warn("[AgentTeamsEnvResolver] createSession preload failed", {
				expertId,
				error: err instanceof Error ? err.message : String(err)
			});
		}
		if (opts.projectResources && opts.projectId && !opts.sessionId) opts.sessionId = (0, node_crypto.randomUUID)();
		const projectResourcesSessionId = opts.sessionId;
		let projectResourcesRegistered = false;
		if (opts.projectId && opts.projectResources && projectResourcesSessionId && deps.projectResources) try {
			const projectEnv = await deps.projectResources.registerSession(projectResourcesSessionId, opts.projectId, opts.projectResources);
			opts.env = {
				...opts.env,
				...projectEnv
			};
			projectResourcesRegistered = true;
		} catch (error) {
			deps.logger?.warn("[session-create] projectResources install failed (non-blocking)", error);
		}
		const result = await createOrReuseClawSession(opts, {
			clawCwd: deps.claw.cwd,
			clawService: deps.claw.service,
			sessionManager: deps.sessionManager,
			inFlightCreates: deps.claw.inFlightCreates,
			logger: deps.logger
		});
		deps.logger?.info("[session-create] main createSession handler done", {
			durationMs: Date.now() - handlerStartedAt,
			sessionId: result.sessionId
		});
		if (preloadedExpertType !== void 0 && result.sessionId) deps.agentTeams?.recordSessionExpertType(result.sessionId, preloadedExpertType);
		if (opts.projectId && result.sessionId && !projectResourcesRegistered) {
			if (opts.projectResources && deps.projectResources) try {
				await deps.projectResources.registerSession(result.sessionId, opts.projectId, opts.projectResources);
			} catch (error) {
				deps.logger?.warn("[session-create] projectResources late install failed (non-blocking)", error);
			}
			else deps.projectResources?.registerSessionFromRecord(result.sessionId, opts.projectId);
		} else if (opts.projectId && result.sessionId && projectResourcesRegistered && result.sessionId !== projectResourcesSessionId) deps.projectResources?.registerSessionFromRecord(result.sessionId, opts.projectId);
		return result;
	});
	registry.handle(require_contract.SESSION_RPC_CHANNELS.UPDATE_CONFIG, async (sessionId, patch, resumeCwd, options) => {
		let shouldRecordExpertType = false;
		let resolvedExpertType;
		const _ucStartedAt = Date.now();
		let _ucLastAt = _ucStartedAt;
		const _ucToMB = (bytes) => Math.round(bytes / 1024 / 1024 * 10) / 10;
		const _ucProbe = (stage, extra) => {
			try {
				const now = Date.now();
				const mu = process.memoryUsage();
				const totalMs = now - _ucStartedAt;
				const sinceLastMs = now - _ucLastAt;
				_ucLastAt = now;
				const sid = typeof sessionId === "string" ? sessionId : "<invalid>";
				const patchKeys = patch && typeof patch === "object" ? Object.keys(patch).join(",") : "";
				const kv = extra ? " " + Object.entries(extra).map(([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`).join(" ") : "";
				deps.logger?.info(`[UpdateConfigProbe] stage=${stage} sessionId=${sid} rssMB=${_ucToMB(mu.rss)} heapUsedMB=${_ucToMB(mu.heapUsed)} heapTotalMB=${_ucToMB(mu.heapTotal)} totalMs=${totalMs} sinceLastMs=${sinceLastMs} patchKeys=${patchKeys}${kv}`);
			} catch {}
		};
		_ucProbe("enter");
		if (typeof sessionId === "string" && sessionId.length > 0 && patch && typeof patch === "object" && "expertId" in patch) {
			const expertIdInPatch = patch.expertId;
			if (typeof expertIdInPatch === "string" && expertIdInPatch.length > 0) try {
				const expertMarketplace = patch.expertMarketplace;
				_ucProbe("beforeResolveExpert", { expertId: expertIdInPatch });
				const resolved = await deps.expertResolver?.resolveExpertLocation(expertIdInPatch, typeof expertMarketplace === "string" ? expertMarketplace : void 0);
				_ucProbe("afterResolveExpert", { resolvedType: resolved?.manifest?.expertType ?? "none" });
				if (resolved) {
					resolvedExpertType = resolved.manifest.expertType;
					shouldRecordExpertType = true;
				}
			} catch (err) {
				_ucProbe("resolveExpertFailed");
				deps.logger?.warn("[AgentTeamsEnvResolver] updateSessionConfig preload failed", {
					sessionId,
					expertId: expertIdInPatch,
					error: err instanceof Error ? err.message : String(err)
				});
			}
			else if (expertIdInPatch === "" || expertIdInPatch === null) shouldRecordExpertType = true;
		}
		_ucProbe("beforeSessionManagerUpdate");
		try {
			const result = await deps.sessionManager.updateSessionConfig(sessionId, patch ?? {}, resumeCwd, options && typeof options === "object" ? options : void 0);
			_ucProbe("afterSessionManagerUpdate", { ok: true });
			if (shouldRecordExpertType && result.configUpdateApplied !== false) {
				deps.agentTeams?.recordSessionExpertType(sessionId, resolvedExpertType);
				deps.logger?.info(`[AgentTeamsEnvResolver] updateSessionConfig preload sessionId=${String(sessionId)} expertType=${String(resolvedExpertType)}`);
			}
			return result;
		} catch (err) {
			_ucProbe("afterSessionManagerUpdate", {
				ok: false,
				err: err instanceof Error ? err.message : String(err)
			});
			throw err;
		}
	});
}
var RENDERER_HISTORY_REPLAY_META_KEY = "codebuddy.ai/rendererHistoryReplay";
function isMissingSessionReplayError(error) {
	const message = error instanceof Error ? error.message : String(error ?? "");
	return /\bENOENT\b|no such file|not found|\u4e0d\u5b58\u5728/i.test(message);
}
function isAutomationWorkspaceCwd(cwd) {
	return typeof cwd === "string" && /workbuddy-server-automation/i.test(cwd);
}
function toScopedSessionReplayPayload(event) {
	if (event.type === "sessionUpdate") return {
		sessionId: event.sessionId,
		update: event.update,
		...event._meta ? { _meta: event._meta } : {}
	};
	return {
		type: "extNotification",
		sessionId: event.sessionId,
		method: event.method,
		params: event.params ?? {}
	};
}
function markRendererHistoryReplayPayload(payload) {
	const existingMeta = payload._meta && typeof payload._meta === "object" && !Array.isArray(payload._meta) ? payload._meta : {};
	return {
		...payload,
		_meta: {
			...existingMeta,
			[RENDERER_HISTORY_REPLAY_META_KEY]: true
		}
	};
}
function trimEventsFromFirstUserMessage(events) {
	for (let i = 0; i < events.length; i += 1) {
		const event = events[i];
		if (event.type !== "sessionUpdate") continue;
		if (event.update?.sessionUpdate === "user_message_chunk") return i === 0 ? events : events.slice(i);
	}
	return events;
}
function isOwnerReplayHydratablePayload(payload) {
	const payloadType = typeof payload.type === "string" ? payload.type : null;
	if (payloadType === "questionRequest" || payloadType === "permissionRequest" || payloadType === "questionCancelled" || payloadType === "elicitationRequest" || payloadType === "elicitationSettled") return true;
	return Boolean(payload.update && typeof payload.update === "object");
}
function mapTaskStatusToStopReason(status) {
	switch (status) {
		case "terminated": return "cancelled";
		case "failed":
		case "error":
		case "completed":
		case "archived": return "end_turn";
		default: return "end_turn";
	}
}
function findReplayCwd(events) {
	for (const event of events) {
		if (event.type !== "sessionUpdate") continue;
		const cwd = normalizeLoadCwd(event.update?.cwd);
		if (cwd) return cwd;
	}
}
function normalizeLoadCwd(value) {
	if (typeof value !== "string") return;
	const trimmed = value.trim();
	if (!trimmed) return;
	const normalized = node_path.normalize(trimmed);
	const root = node_path.parse(normalized).root;
	let end = normalized.length;
	while (end > root.length && (normalized[end - 1] === "/" || normalized[end - 1] === "\\")) end -= 1;
	return normalized.slice(0, end);
}
function createReplayLoadResult(sessionId, record, replayTiming, fallbackCwd) {
	const { status: rawStatus, ...recordRest } = record ?? {};
	const normalizedRecord = record ? {
		...recordRest,
		...typeof rawStatus === "string" ? { status: require_task_status.normalizeTaskStatus(rawStatus) } : {}
	} : void 0;
	return {
		...normalizedRecord ?? {},
		id: normalizedRecord?.id ?? normalizedRecord?.sessionId ?? sessionId,
		sessionId,
		cwd: normalizeLoadCwd(normalizedRecord?.cwd) ?? fallbackCwd,
		loaded: true,
		rendererHistoryReplayComplete: true,
		...replayTiming ? { replayTiming } : {}
	};
}
function registerWorkbuddySessionLoadHandler(registry, deps) {
	const toMB = (bytes) => Math.round(bytes / 1024 / 1024 * 10) / 10;
	const currentRssMB = () => toMB(process.memoryUsage().rss);
	const snapshotMem = (stage, sessionId, extra) => {
		const mu = process.memoryUsage();
		const snapshot = {
			rssMB: toMB(mu.rss),
			heapUsedMB: toMB(mu.heapUsed),
			heapTotalMB: toMB(mu.heapTotal),
			externalMB: toMB(mu.external),
			arrayBuffersMB: toMB(mu.arrayBuffers)
		};
		const extraStr = extra ? " " + Object.entries(extra).map(([key, value]) => `${key}=${typeof value === "object" ? JSON.stringify(value) : value}`).join(" ") : "";
		deps.logger?.info(`[SessionLoadMem] stage=${stage} sessionId=${sessionId} rssMB=${snapshot.rssMB} heapUsedMB=${snapshot.heapUsedMB} heapTotalMB=${snapshot.heapTotalMB} externalMB=${snapshot.externalMB} arrayBuffersMB=${snapshot.arrayBuffersMB}${extraStr}`);
		return {
			rssMB: snapshot.rssMB,
			heapUsedMB: snapshot.heapUsedMB
		};
	};
	const pendingLoadSessions = /* @__PURE__ */ new Map();
	const inFlightReplayAbort = /* @__PURE__ */ new Map();
	const isMissingReplayError = deps.isMissingSessionReplayError ?? isMissingSessionReplayError;
	const isAutomationCwd = deps.isAutomationWorkspaceCwd ?? isAutomationWorkspaceCwd;
	registry.handle(require_contract.SESSION_RPC_CHANNELS.LOAD, async (sessionId, params) => {
		if (typeof sessionId !== "string" || sessionId.trim().length === 0) throw new Error("Session ID is required");
		const loadStartedAt = Date.now();
		let loadOutcome = "unknown";
		let outcomeEventsCount;
		let outcomeReplayFetchMs;
		let outcomeMainPushMs;
		deps.logger?.info(`[Daemon] LOAD session: sessionId=${sessionId}, params=${JSON.stringify(params)}`);
		const memEnter = snapshotMem("enter", sessionId);
		const requestedCwd = normalizeLoadCwd(params?.cwd);
		const loadRequestId = typeof params?.requestId === "string" ? params.requestId?.trim() : void 0;
		const forceRendererHistoryReplay = params?.forceRendererHistoryReplay === true;
		deps.recordMainLoadTime?.(loadRequestId || sessionId);
		const historyGeneration = deps.sessionManager.getHistoryStoreGeneration(sessionId);
		const loadKey = `${historyGeneration}\0${sessionId}\0${requestedCwd || ""}\0${forceRendererHistoryReplay ? "force" : "normal"}`;
		const pendingLoad = pendingLoadSessions.get(loadKey);
		if (pendingLoad && !pendingLoad.controller.signal.aborted) {
			deps.logger?.info(`[Daemon] LOAD deduped: sessionId=${sessionId}, requestId=${loadRequestId || "n/a"}`);
			loadOutcome = "deduped";
			const dedupedPromise = pendingLoad.promise;
			dedupedPromise.then(() => {
				deps.logger?.info(`[Daemon] LOAD summary sessionId=${sessionId} outcome=deduped elapsedMs=${Date.now() - loadStartedAt} requestId=${loadRequestId || "n/a"}`);
			}).catch(() => {});
			return dedupedPromise;
		}
		pendingLoadSessions.delete(loadKey);
		for (const [staleId, staleReplay] of inFlightReplayAbort) {
			staleReplay.controller.abort();
			inFlightReplayAbort.delete(staleId);
			deps.logger?.info(`[Daemon] LOAD aborting stale replay for "${staleId}" (superseded by "${sessionId}")`);
		}
		const replayAbortController = new AbortController();
		inFlightReplayAbort.set(sessionId, { controller: replayAbortController });
		const assertCurrent = () => {
			if (replayAbortController.signal.aborted) throw replayAbortController.signal.reason ?? /* @__PURE__ */ new Error(`Session replay aborted for "${sessionId}"`);
			if (deps.sessionManager.getHistoryStoreGeneration(sessionId) !== historyGeneration) throw new Error(`Session history generation changed while loading "${sessionId}"`);
		};
		const loadPromise = (async () => {
			const activeOwnerSnapshot = deps.sessionManager.getSession(sessionId);
			if (deps.sessionManager.replayStoredSessionHistory(sessionId)) {
				const record = activeOwnerSnapshot ?? await deps.sessionManager.getSessionRecord(sessionId);
				assertCurrent();
				if (record?.projectId) deps.projectResources?.registerSessionFromRecord(sessionId, record.projectId);
				const resolvedCwd = normalizeLoadCwd(activeOwnerSnapshot?.cwd) ?? normalizeLoadCwd(record?.cwd) ?? requestedCwd;
				if (resolvedCwd) {
					await deps.sessionManager.rememberSessionCwd(sessionId, resolvedCwd);
					assertCurrent();
					if (deps.media && !deps.media.getSessionCwd(sessionId)) deps.media.registerSession(sessionId, resolvedCwd);
				}
				deps.sessionManager.replayActivePendingInputs(sessionId);
				deps.scheduleRuntimeSweep?.();
				snapshotMem("fastReplayDone", sessionId, {
					deltaRssMB: currentRssMB() - memEnter.rssMB,
					elapsedMs: Date.now() - loadStartedAt
				});
				loadOutcome = "replay-shortcut";
				return createReplayLoadResult(sessionId, record, void 0, resolvedCwd);
			}
			const record = await deps.sessionManager.getSessionRecord(sessionId);
			assertCurrent();
			if (record?.projectId) deps.projectResources?.registerSessionFromRecord(sessionId, record.projectId);
			const replayRequestCwd = requestedCwd || (typeof record?.cwd === "string" && record.cwd.trim() ? record.cwd : void 0) || (typeof activeOwnerSnapshot?.cwd === "string" && activeOwnerSnapshot.cwd.trim() ? activeOwnerSnapshot.cwd : void 0);
			snapshotMem("beforeReplay", sessionId, { deltaRssMB: currentRssMB() - memEnter.rssMB });
			let replay;
			const beforeRequestReplayAt = Date.now();
			const replayFetchStartedAt = beforeRequestReplayAt;
			try {
				replay = await deps.requestSessionReplay(sessionId, {
					signal: replayAbortController.signal,
					cwd: replayRequestCwd
				});
				snapshotMem("afterRequestReplay", sessionId, {
					deltaRssMB: currentRssMB() - memEnter.rssMB,
					events: Array.isArray(replay?.events) ? replay.events.length : 0,
					requestMs: Date.now() - beforeRequestReplayAt
				});
				outcomeReplayFetchMs = Date.now() - replayFetchStartedAt;
			} catch (error) {
				outcomeReplayFetchMs = Date.now() - replayFetchStartedAt;
				loadOutcome = "replay-fetch-failed";
				if (replayAbortController.signal.aborted) {
					deps.logger?.info(`[Daemon] LOAD replay aborted for "${sessionId}" (superseded by newer load)`);
					throw error;
				}
				if (isMissingReplayError(error) && (record?.isBackgroundAutomation || isAutomationCwd(requestedCwd))) {
					deps.logger?.warn(`[Daemon] Automation session replay missing for "${sessionId}"; propagate to UI fallback`, error);
					throw error;
				}
				deps.logger?.warn(`[Daemon] Failed to fetch session replay for "${sessionId}", keeping renderer on stored snapshot without restoring a runtime`, error);
				const resolvedCwd = requestedCwd || (typeof record?.cwd === "string" && record.cwd.trim() ? record.cwd : void 0);
				if (resolvedCwd) await deps.sessionManager.rememberSessionCwd(sessionId, resolvedCwd);
				if (deps.media && resolvedCwd && !deps.media.getSessionCwd(sessionId)) deps.media.registerSession(sessionId, resolvedCwd);
				deps.scheduleRuntimeSweep?.();
				return {
					sessionId,
					loaded: true,
					rendererHistoryReplayComplete: false
				};
			}
			assertCurrent();
			const replayChannel = `${require_contract.SESSION_RPC_CHANNELS.EVENT}:${sessionId}`;
			const resolvedCwd = normalizeLoadCwd(record?.cwd) ?? normalizeLoadCwd(replay.cwd) ?? findReplayCwd(replay.events) ?? requestedCwd;
			if (resolvedCwd) {
				await deps.sessionManager.rememberSessionCwd(sessionId, resolvedCwd);
				assertCurrent();
			}
			if (deps.media && resolvedCwd) deps.media.registerSession(sessionId, resolvedCwd);
			const effectiveEvents = replay.historyInfo?.truncated ? trimEventsFromFirstUserMessage(replay.events) : replay.events;
			replay.events = effectiveEvents;
			const ownerReplayPayloads = effectiveEvents.map(toScopedSessionReplayPayload).filter(isOwnerReplayHydratablePayload);
			const beforeCommitAt = Date.now();
			snapshotMem("beforeCommit", sessionId, {
				deltaRssMB: currentRssMB() - memEnter.rssMB,
				events: effectiveEvents.length,
				ownerPayloads: ownerReplayPayloads.length,
				path: deps.sessionManager.hasSession(sessionId) ? "replace" : "prime"
			});
			if (deps.sessionManager.hasSession(sessionId)) await deps.sessionManager.replaceSessionReplay(sessionId, ownerReplayPayloads, resolvedCwd, historyGeneration);
			else await deps.sessionManager.primeSessionReplay(sessionId, ownerReplayPayloads, resolvedCwd, historyGeneration);
			assertCurrent();
			snapshotMem("afterReplayCommit", sessionId, {
				commitMs: Date.now() - beforeCommitAt,
				deltaRssMB: currentRssMB() - memEnter.rssMB,
				events: effectiveEvents.length,
				ownerPayloads: ownerReplayPayloads.length,
				elapsedMs: Date.now() - loadStartedAt
			});
			const mainPushStartedAt = Date.now();
			try {
				if (replay.historyInfo?.truncated) registry.push(replayChannel, {
					type: "historyInfo",
					sessionId,
					...replay.historyInfo
				});
				const push = (channel, data) => registry.push(channel, data);
				for (const event of effectiveEvents) {
					const scopedPayload = markRendererHistoryReplayPayload(toScopedSessionReplayPayload(event));
					if (!(deps.replayLifecycle?.(replayChannel, scopedPayload, push) ?? false)) registry.push(replayChannel, scopedPayload);
				}
			} finally {
				const finalMainPushMs = Date.now() - mainPushStartedAt;
				replay.replayTiming = {
					...replay.replayTiming || {},
					events: replay.events.length,
					mainPushMs: finalMainPushMs
				};
				outcomeMainPushMs = finalMainPushMs;
				outcomeEventsCount = replay.events.length;
				deps.replayingSessions?.delete(sessionId);
			}
			deps.sessionManager.replayActivePendingInputs(sessionId);
			deps.scheduleRuntimeSweep?.();
			try {
				const sessionInfo = deps.sessionManager.getSession(sessionId);
				const rawStatus = sessionInfo?.status ?? record?.status;
				const status = typeof rawStatus === "string" ? require_task_status.normalizeTaskStatus(rawStatus) : void 0;
				const isBackendIdle = !sessionInfo || !sessionInfo.isProcessing;
				const shouldSendSynthetic = !sessionInfo || status && require_task_status.isTerminalTaskStatus(status) || status && !require_task_status.isTerminalTaskStatus(status) && isBackendIdle;
				deps.logger?.info(`[DaemonBootstrap] LOAD synthetic check: sessionId=${sessionId}, status=${status}, isProcessing=${sessionInfo?.isProcessing}, isBackendIdle=${isBackendIdle}, shouldSendSynthetic=${shouldSendSynthetic}`);
				if (shouldSendSynthetic) {
					const stopReason = status && require_task_status.isTerminalTaskStatus(status) ? mapTaskStatusToStopReason(status) : "end_turn";
					const scheduledEventCount = sessionInfo?.eventHistory.length ?? ownerReplayPayloads.length;
					if (!status || !require_task_status.isTerminalTaskStatus(status)) deps.sessionManager.updateSessionStatus(sessionId, "completed").catch((err) => {
						deps.logger?.warn(`[DaemonBootstrap] Failed to update idle loaded session "${sessionId}" to completed:`, err);
					});
					setTimeout(() => {
						const currentSession = deps.sessionManager.getSession(sessionId);
						const currentEventCount = currentSession?.eventHistory.length;
						if (currentSession?.isProcessing === true || scheduledEventCount !== void 0 && currentEventCount !== void 0 && currentEventCount !== scheduledEventCount) {
							deps.logger?.info(`[DaemonBootstrap] Skip stale LOAD synthetic promptResponse: sessionId=${sessionId}, isProcessing=${currentSession?.isProcessing}, scheduledEventCount=${scheduledEventCount}, currentEventCount=${currentEventCount}`);
							return;
						}
						registry.push(`${require_contract.SESSION_RPC_CHANNELS.EVENT}:${sessionId}`, {
							type: "promptResponse",
							sessionId,
							origin: "synthetic",
							response: {
								stopReason,
								_meta: {}
							}
						});
					}, 500);
				}
			} catch (synthErr) {
				deps.logger?.warn(`[DaemonBootstrap] Failed to push synthetic promptResponse for hydrated session "${sessionId}":`, synthErr);
			}
			if (loadOutcome === "unknown") loadOutcome = "replay-fetch";
			return createReplayLoadResult(sessionId, record, replay.replayTiming, resolvedCwd);
		})();
		pendingLoadSessions.set(loadKey, {
			promise: loadPromise,
			controller: replayAbortController
		});
		try {
			const result = await loadPromise;
			deps.logger?.info(`[Daemon] LOAD summary sessionId=${sessionId} outcome=${loadOutcome} elapsedMs=${Date.now() - loadStartedAt} events=${outcomeEventsCount ?? -1} replayFetchMs=${outcomeReplayFetchMs ?? -1} mainPushMs=${outcomeMainPushMs ?? -1} requestId=${loadRequestId || "n/a"} historyGeneration=${historyGeneration}`);
			return result;
		} catch (error) {
			const wasAborted = replayAbortController.signal.aborted;
			const msg = error instanceof Error ? error.message : String(error);
			deps.logger?.warn(`[Daemon] LOAD summary sessionId=${sessionId} outcome=${loadOutcome === "unknown" ? "error" : loadOutcome} elapsedMs=${Date.now() - loadStartedAt} events=${outcomeEventsCount ?? -1} replayFetchMs=${outcomeReplayFetchMs ?? -1} mainPushMs=${outcomeMainPushMs ?? -1} aborted=${wasAborted} error=${msg}`);
			throw error;
		} finally {
			if (pendingLoadSessions.get(loadKey)?.promise === loadPromise) pendingLoadSessions.delete(loadKey);
			if (inFlightReplayAbort.get(sessionId)?.controller === replayAbortController) inFlightReplayAbort.delete(sessionId);
			snapshotMem("exit", sessionId, {
				deltaRssMB: currentRssMB() - memEnter.rssMB,
				totalMs: Date.now() - loadStartedAt
			});
		}
	});
}
function normalizeOwnerUserId(userId) {
	return typeof userId === "string" && userId.trim().length > 0 ? userId.trim() : void 0;
}
function shouldBroadcastSessionUpsertForCurrentUser(session, currentUserId) {
	const sessionUserId = normalizeOwnerUserId(session?.userId);
	if (!sessionUserId) return true;
	const normalizedCurrentUserId = normalizeOwnerUserId(currentUserId);
	if (!normalizedCurrentUserId) return true;
	return sessionUserId === normalizedCurrentUserId;
}
function registerWorkbuddySessionRuntimeEventBridge(publisher, deps) {
	deps.runtimeEvents.setBroadcastSinks({
		onSessionUpsert: (session) => {
			if (!shouldBroadcastSessionUpsertForCurrentUser(session, deps.getCurrentUserId?.())) return;
			publisher.push(require_contract.SESSION_RPC_CHANNELS.UPSERTED, session);
			const sessionId = typeof session.id === "string" ? session.id : void 0;
			const expertId = typeof session.expertId === "string" ? session.expertId : void 0;
			if (sessionId && expertId && deps.expertResolver && deps.agentTeams) Promise.resolve(deps.expertResolver.resolveExpertLocation(expertId)).then((resolved) => {
				if (resolved) deps.agentTeams?.recordSessionExpertType(sessionId, resolved.manifest.expertType);
			}).catch((err) => {
				deps.logger?.warn("[AgentTeamsEnvResolver] preload expertType failed", {
					sessionId,
					error: err instanceof Error ? err.message : String(err)
				});
			});
			const clawCwd = deps.getClawCwd?.();
			if (clawCwd && session.cwd && isClawWorkspaceCwd(session.cwd, clawCwd) && sessionId && session.status) publisher.push(`${require_contract.SESSION_RPC_CHANNELS.EVENT}:${sessionId}`, {
				type: "sessionStatusUpdate",
				sessionId,
				status: session.status,
				pendingInputKind: session.pendingInputKind,
				updatedAt: session.updatedAt,
				lastActivityAt: session.lastActivityAt
			});
		},
		onSessionDeleted: (event) => {
			const sessionId = event?.sessionId;
			if (typeof sessionId === "string" && sessionId) deps.agentTeams?.clearSession(sessionId);
			publisher.push(require_contract.SESSION_RPC_CHANNELS.DELETED, event);
		}
	});
}
function registerWorkbuddySessionAuxiliaryHandlers(registry, deps) {
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.GET_ACTIVE_SESSIONS, () => deps.activeSessions.getActiveSessions());
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.GET_SESSION_ARTIFACTS, async (sessionId) => {
		const artifacts = deps.getArtifactsService();
		if (!artifacts || typeof sessionId !== "string") return [];
		return artifacts.getSessionArtifacts(sessionId);
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.LOCAL_DOCS_REGISTER_MEDIA_ARTIFACT, async (params) => {
		const mediaService = deps.getMediaService?.();
		if (!mediaService) return {
			success: false,
			error: "MediaArtifactService not available"
		};
		const { sessionId, filePath } = params ?? {};
		if (typeof sessionId !== "string" || !sessionId) return {
			success: false,
			error: "sessionId is required"
		};
		if (typeof filePath !== "string" || !filePath) return {
			success: false,
			error: "filePath is required"
		};
		try {
			mediaService.registerExplicitMedia({
				sessionId,
				filePath,
				sourceType: "present_files"
			});
			await mediaService.pushMediaForFile(sessionId, filePath, {
				sourceTool: "PresentFiles",
				allowUnknownExtension: true
			});
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error)
			};
		}
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.FILE_WATCH_SUBSCRIBE, async (filePath) => {
		const fileWatch = deps.getFileWatchService();
		if (!fileWatch) throw new Error("FileWatchService not initialized");
		if (typeof filePath !== "string" || filePath.length === 0) throw new Error("fileWatch:subscribe: filePath must be a non-empty string");
		return { id: fileWatch.subscribe(filePath) };
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.FILE_WATCH_UNSUBSCRIBE, async (id) => {
		const fileWatch = deps.getFileWatchService();
		if (!fileWatch) return { ok: true };
		if (typeof id !== "string" || id.length === 0) return { ok: false };
		fileWatch.unsubscribe(id);
		return { ok: true };
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.DIRECTORY_WATCH_SUBSCRIBE, async (params) => {
		const mediaService = deps.getMediaService?.();
		if (!mediaService?.subscribeDirectoryWatch) return { id: void 0 };
		const { sessionId, dirPath } = params ?? {};
		if (typeof sessionId !== "string" || sessionId.length === 0) throw new Error("directoryWatch:subscribe: sessionId must be a non-empty string");
		if (typeof dirPath !== "string" || dirPath.length === 0) throw new Error("directoryWatch:subscribe: dirPath must be a non-empty string");
		return { id: mediaService.subscribeDirectoryWatch(sessionId, dirPath) };
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.DIRECTORY_WATCH_UNSUBSCRIBE, async (id) => {
		const mediaService = deps.getMediaService?.();
		if (!mediaService?.unsubscribeDirectoryWatch) return { ok: true };
		if (typeof id !== "string" || id.length === 0) return { ok: false };
		mediaService.unsubscribeDirectoryWatch(id);
		return { ok: true };
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.DIRECTORY_WATCH_RELEASE_SESSION, async (sessionId) => {
		const mediaService = deps.getMediaService?.();
		if (!mediaService?.releaseDirectoryWatchSession) return { ok: true };
		if (typeof sessionId !== "string" || sessionId.length === 0) return { ok: false };
		mediaService.releaseDirectoryWatchSession(sessionId);
		return { ok: true };
	});
	registry.handle(require_contract.SESSION_RPC_CHANNELS.GET_PERSISTED_USAGE, async (sessionId) => {
		if (typeof sessionId !== "string" || sessionId.trim().length === 0) return;
		return deps.usageCache.getPersisted(sessionId);
	});
	registry.handle(require_contract.SESSION_RPC_CHANNELS.GET_LAST_USAGE_EVENT, async (sessionId) => {
		if (typeof sessionId !== "string" || sessionId.trim().length === 0) return;
		return deps.usageCache.getLastEvent(sessionId);
	});
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.LOCAL_EXPERTS_GET_WATCH_PATH, async () => ({ filePath: deps.localExperts.getCustomExpertWatchPath() }));
	registry.handle(WORKBUDDY_SESSION_AUX_RPC_CHANNELS.LOCAL_EXPERTS_GET_PLUGIN_JSON_PATH, async (expertId) => {
		if (typeof expertId !== "string" || expertId.trim().length === 0) return { filePath: void 0 };
		if (expertId.includes("/") || expertId.includes("\\") || expertId.includes("..")) return { filePath: void 0 };
		return { filePath: deps.localExperts.getCustomExpertPluginJsonPath(expertId) };
	});
}
function registerWorkbuddySessionPermissionBridgeHandlers(registry, deps) {
	registry.handle(require_contract.SESSION_RPC_CHANNELS.NOTIFY_PERMISSION_PENDING_APPROVAL, (sessionId, requestId, toolName, rawInput, toolCallId, options, description, clientRequestId) => {
		if (typeof sessionId !== "string" || typeof requestId !== "string") return;
		const normalizedOptions = normalizePermissionOptions(options);
		return deps.permissions.handlePermissionEvent(sessionId, {
			requestId,
			toolCallId: typeof toolCallId === "string" && toolCallId ? toolCallId : requestId,
			toolName: typeof toolName === "string" ? toolName : "unknown",
			rawInput: typeof rawInput === "string" ? rawInput : "",
			...typeof clientRequestId === "string" && clientRequestId ? { clientRequestId } : {},
			...normalizedOptions && normalizedOptions.length > 0 ? { options: normalizedOptions } : {},
			...typeof description === "string" && description ? { description } : {}
		});
	});
	registry.handle(require_contract.SESSION_RPC_CHANNELS.NOTIFY_PERMISSION_RESOLVED_FROM_LOCAL, async (sessionId, requestId, decision, optionId, reason) => {
		if (typeof sessionId !== "string" || typeof requestId !== "string") return;
		const optionStr = typeof optionId === "string" ? optionId : void 0;
		let normalizedDecision;
		if (optionStr === "allow_always") normalizedDecision = "allow_always";
		else if (optionStr === "allow" || decision === "approve" || decision === "allow") normalizedDecision = "allow";
		else normalizedDecision = "reject";
		if (normalizedDecision !== "reject") deps.onApproved?.(sessionId);
		try {
			await deps.permissions.handlePermissionResolvedFromLocal({
				sessionId,
				requestId,
				decision: normalizedDecision,
				optionId: optionStr,
				reason: typeof reason === "string" ? reason : void 0
			});
		} catch (error) {
			deps.logger?.warn("[Daemon] notifyPermissionResolvedFromLocal failed:", error);
		}
	});
}
function normalizePermissionOptions(options) {
	if (!Array.isArray(options)) return;
	return options.flatMap((option) => {
		if (!option || typeof option !== "object") return [];
		const raw = option;
		const optionId = typeof raw.optionId === "string" ? raw.optionId : "";
		if (!optionId) return [];
		return [{
			optionId,
			name: typeof raw.name === "string" ? raw.name : optionId,
			kind: typeof raw.kind === "string" ? raw.kind : ""
		}];
	});
}
//#endregion
Object.defineProperty(exports, "ACP_MODE_ARG", {
	enumerable: true,
	get: function() {
		return ACP_MODE_ARG;
	}
});
Object.defineProperty(exports, "ArtifactIndexStore", {
	enumerable: true,
	get: function() {
		return ArtifactIndexStore;
	}
});
Object.defineProperty(exports, "ChangesIndexCoordinator", {
	enumerable: true,
	get: function() {
		return ChangesIndexCoordinator;
	}
});
Object.defineProperty(exports, "ConversationWorkspaceUnavailableError", {
	enumerable: true,
	get: function() {
		return ConversationWorkspaceUnavailableError;
	}
});
Object.defineProperty(exports, "DEFAULT_WORKSPACE_FILE_TREE_IGNORED_NAMES", {
	enumerable: true,
	get: function() {
		return DEFAULT_WORKSPACE_FILE_TREE_IGNORED_NAMES;
	}
});
Object.defineProperty(exports, "LocalConversationHistorySource", {
	enumerable: true,
	get: function() {
		return LocalConversationHistorySource;
	}
});
Object.defineProperty(exports, "MCP_APPS_SANDBOX_PROXY_HTML", {
	enumerable: true,
	get: function() {
		return MCP_APPS_SANDBOX_PROXY_HTML;
	}
});
Object.defineProperty(exports, "MCP_APPS_SANDBOX_PROXY_PATH", {
	enumerable: true,
	get: function() {
		return MCP_APPS_SANDBOX_PROXY_PATH;
	}
});
Object.defineProperty(exports, "SESSION_CWD_UNAVAILABLE_BIZ_CODE", {
	enumerable: true,
	get: function() {
		return SESSION_CWD_UNAVAILABLE_BIZ_CODE;
	}
});
Object.defineProperty(exports, "SqliteConversationUsagePort", {
	enumerable: true,
	get: function() {
		return SqliteConversationUsagePort;
	}
});
Object.defineProperty(exports, "WORKBUDDY_SESSION_AUX_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return WORKBUDDY_SESSION_AUX_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "assertConversationWorkspaceUsable", {
	enumerable: true,
	get: function() {
		return assertConversationWorkspaceUsable;
	}
});
Object.defineProperty(exports, "classifySessionCwdErrno", {
	enumerable: true,
	get: function() {
		return classifySessionCwdErrno;
	}
});
Object.defineProperty(exports, "compressWorkspacePathName", {
	enumerable: true,
	get: function() {
		return compressWorkspacePathName;
	}
});
Object.defineProperty(exports, "createArgFileCandidate", {
	enumerable: true,
	get: function() {
		return createArgFileCandidate;
	}
});
Object.defineProperty(exports, "createConversationFileLogger", {
	enumerable: true,
	get: function() {
		return createConversationFileLogger;
	}
});
Object.defineProperty(exports, "createConversationsBundle", {
	enumerable: true,
	get: function() {
		return createConversationsBundle;
	}
});
Object.defineProperty(exports, "createNodeResourceEffectPort", {
	enumerable: true,
	get: function() {
		return createNodeResourceEffectPort;
	}
});
Object.defineProperty(exports, "createTaskPendingNotificationScheduler", {
	enumerable: true,
	get: function() {
		return createTaskPendingNotificationScheduler;
	}
});
Object.defineProperty(exports, "extractPreviewUrlLocalPath", {
	enumerable: true,
	get: function() {
		return extractPreviewUrlLocalPath;
	}
});
Object.defineProperty(exports, "extractText", {
	enumerable: true,
	get: function() {
		return extractText$1;
	}
});
Object.defineProperty(exports, "handleWorkbuddySessionEventSinkEvent", {
	enumerable: true,
	get: function() {
		return handleWorkbuddySessionEventSinkEvent;
	}
});
Object.defineProperty(exports, "handleWorkbuddySessionTaskStatusSinkEvent", {
	enumerable: true,
	get: function() {
		return handleWorkbuddySessionTaskStatusSinkEvent;
	}
});
Object.defineProperty(exports, "isAsarPackageError", {
	enumerable: true,
	get: function() {
		return isAsarPackageError;
	}
});
Object.defineProperty(exports, "isClawWorkspaceCwd", {
	enumerable: true,
	get: function() {
		return isClawWorkspaceCwd;
	}
});
Object.defineProperty(exports, "isIgnoredWorkspaceFileTreeName", {
	enumerable: true,
	get: function() {
		return isIgnoredWorkspaceFileTreeName;
	}
});
Object.defineProperty(exports, "isMcpAppsSandboxProxyUrl", {
	enumerable: true,
	get: function() {
		return isMcpAppsSandboxProxyUrl;
	}
});
Object.defineProperty(exports, "isRecord", {
	enumerable: true,
	get: function() {
		return isRecord$7;
	}
});
Object.defineProperty(exports, "isWorkerHookFailClosed", {
	enumerable: true,
	get: function() {
		return isWorkerHookFailClosed;
	}
});
Object.defineProperty(exports, "isWorkspaceFileTreePermissionError", {
	enumerable: true,
	get: function() {
		return isWorkspaceFileTreePermissionError;
	}
});
Object.defineProperty(exports, "markWorkerHookFailClosed", {
	enumerable: true,
	get: function() {
		return markWorkerHookFailClosed;
	}
});
Object.defineProperty(exports, "prepareWorkerArgs", {
	enumerable: true,
	get: function() {
		return prepareWorkerArgs;
	}
});
Object.defineProperty(exports, "pushWorkbuddySessionCommand", {
	enumerable: true,
	get: function() {
		return pushWorkbuddySessionCommand;
	}
});
Object.defineProperty(exports, "pushWorkbuddySessionEvent", {
	enumerable: true,
	get: function() {
		return pushWorkbuddySessionEvent;
	}
});
Object.defineProperty(exports, "pushWorkbuddySessionExtNotification", {
	enumerable: true,
	get: function() {
		return pushWorkbuddySessionExtNotification;
	}
});
Object.defineProperty(exports, "pushWorkbuddySessionNavigateEvent", {
	enumerable: true,
	get: function() {
		return pushWorkbuddySessionNavigateEvent;
	}
});
Object.defineProperty(exports, "reclaimOrphanAcpWorkers", {
	enumerable: true,
	get: function() {
		return reclaimOrphanAcpWorkers;
	}
});
Object.defineProperty(exports, "registerConversationPlugin", {
	enumerable: true,
	get: function() {
		return registerConversationPlugin;
	}
});
Object.defineProperty(exports, "registerSessionsHandlers", {
	enumerable: true,
	get: function() {
		return registerSessionsHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddySessionAuxiliaryHandlers", {
	enumerable: true,
	get: function() {
		return registerWorkbuddySessionAuxiliaryHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddySessionCreateConfigHandlers", {
	enumerable: true,
	get: function() {
		return registerWorkbuddySessionCreateConfigHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddySessionLoadHandler", {
	enumerable: true,
	get: function() {
		return registerWorkbuddySessionLoadHandler;
	}
});
Object.defineProperty(exports, "registerWorkbuddySessionPermissionBridgeHandlers", {
	enumerable: true,
	get: function() {
		return registerWorkbuddySessionPermissionBridgeHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddySessionRuntimeEventBridge", {
	enumerable: true,
	get: function() {
		return registerWorkbuddySessionRuntimeEventBridge;
	}
});
