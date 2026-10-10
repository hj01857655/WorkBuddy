const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_process_cpu_sampler = require("./process-cpu-sampler.js");
const require_tencent_docs_prompt_selection = require("./tencent-docs-prompt-selection.js");
const require_wb_source = require("./wb-source.js");
const require_runtime_paths = require("./runtime-paths.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_proxy_agents = require("./proxy-agents.js");
const require_marks = require("./marks.js");
const require_server = require("./server.js");
const require_tar = require("./tar.js");
const require_adm_zip$1 = require("./adm-zip.js");
const require_handler_registry = require("./handler-registry.js");
const require_task_status = require("./task-status.js");
let node_child_process = require("node:child_process");
let node_fs = require("node:fs");
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
node_fs_promises = require_rolldown_runtime.__toESM(node_fs_promises);
let node_os = require("node:os");
node_os = require_rolldown_runtime.__toESM(node_os);
let node_crypto = require("node:crypto");
let stream = require("stream");
let node_util = require("node:util");
let _tencent_tencent_docs_ai_engine = require("@tencent/tencent-docs-ai-engine");
let node_net = require("node:net");
node_net = require_rolldown_runtime.__toESM(node_net);
let http = require("http");
http = require_rolldown_runtime.__toESM(http);
let node_http = require("node:http");
node_http = require_rolldown_runtime.__toESM(node_http);
let node_stream = require("node:stream");
let node_events = require("node:events");
let crypto = require("crypto");
let node_https = require("node:https");
node_https = require_rolldown_runtime.__toESM(node_https);
let node_stream_promises = require("node:stream/promises");
//#region ../../packages/workbuddy-server/src/server/server-http-fetch.ts
function createWorkbuddyServerHttpFetch(fetchImpl = globalThis.fetch.bind(globalThis)) {
	return (url, init) => fetchImpl(url, init);
}
//#endregion
//#region ../../packages/sandbox-cli/src/common/protocol.generated.ts
var SANDBOX_COMMANDS = {
	PING: "Ping",
	OPEN_SESSION: "OpenSession",
	CLOSE_SESSION: "CloseSession",
	DELETE_SESSION: "DeleteSession",
	RUN_EXECUTABLE: "RunExecutable",
	GET_STATISTICS: "GetStatistics",
	REPORT_BLOCK_CHOICE: "ReportBlockChoice",
	PROCESS_WRITE: "ProcessWrite",
	PROCESS_SEND_KEY: "ProcessSendKey",
	PROCESS_RESIZE: "ProcessResize",
	PROCESS_KILL: "ProcessKill",
	PROCESS_IS_ALIVE: "ProcessIsAlive",
	PROCESS_OUTPUT: "ProcessOutput",
	PROCESS_EXIT: "ProcessExit",
	REPORT_EVENT: "ReportEvent",
	RECORD_STATISTICS: "RecordStatistics",
	APPEND_USER_CHOICE: "AppendUserChoice"
};
//#endregion
//#region ../../packages/sandbox-cli/src/node/sandbox-cli-client.ts
var MAX_LINE_BUFFER_BYTES = 8388608;
var connectTimeoutErrors = /* @__PURE__ */ new WeakSet();
var FIRE_AND_FORGET_COMMANDS = /* @__PURE__ */ new Set([
	SANDBOX_COMMANDS.PROCESS_OUTPUT,
	SANDBOX_COMMANDS.PROCESS_EXIT,
	SANDBOX_COMMANDS.REPORT_EVENT
]);
var DEFAULT_CONFIG = {
	connectTimeoutMs: 1e4,
	requestTimeoutMs: 12e4,
	heartbeatIntervalMs: 3e4,
	heartbeatTimeoutMs: 5e3,
	autoReconnect: true,
	maxReconnectAttempts: 3
};
function createSandboxCliClient(logger) {
	return new SandboxCliClientImpl(logger);
}
function resolveSandboxCliIpcPath(address, platform = process.platform) {
	return platform === "win32" ? `\\\\.\\pipe\\${address}` : `/tmp/${address}.sock`;
}
/** sandbox-cli NDJSON client shared by agent-cli and daemon runtimes. */
var SandboxCliClientImpl = class {
	constructor(logger) {
		this._connected = false;
		this._messageCounter = 0;
		this._socket = null;
		this._lineBuffer = "";
		this._config = null;
		this._pendingRequests = /* @__PURE__ */ new Map();
		this._reverseListeners = [];
		this._disconnectListeners = /* @__PURE__ */ new Set();
		this.logger = logger;
	}
	setLogger(logger) {
		this.logger = logger;
	}
	async connect(config) {
		if (this._connected) {
			this.logger?.info?.("[SandboxCLIClient] Already connected, skipping");
			return;
		}
		this._config = {
			...DEFAULT_CONFIG,
			...config
		};
		const connectTimeoutMs = this._config.connectTimeoutMs ?? DEFAULT_CONFIG.connectTimeoutMs;
		const pipePath = resolveSandboxCliIpcPath(this._config.address);
		this.logger?.info?.(`[SandboxCLIClient] Connecting to ${pipePath} (timeout=${connectTimeoutMs}ms)`);
		const retryIntervalMs = 200;
		const deadline = Date.now() + connectTimeoutMs;
		let lastError;
		let attempt = 0;
		while (Date.now() < deadline) {
			attempt += 1;
			try {
				await this._tryConnect(pipePath, Math.min(3e3, deadline - Date.now()));
				this.logger?.info?.(`[SandboxCLIClient] Connected successfully (attempt ${attempt})`);
				return;
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));
				if (!isRetryableConnectError(lastError)) throw lastError;
				this.logger?.info?.(`[SandboxCLIClient] Pipe not ready (attempt ${attempt}), retrying in ${retryIntervalMs}ms...`);
				await new Promise((resolve) => setTimeout(resolve, retryIntervalMs));
			}
		}
		const timeoutError = /* @__PURE__ */ new Error(`IPC connect timeout after ${connectTimeoutMs}ms (${attempt} attempts): ${lastError?.message ?? "unknown"}`);
		connectTimeoutErrors.add(timeoutError);
		throw timeoutError;
	}
	async disconnect() {
		this.logger?.info?.("[SandboxCLIClient] Disconnecting...");
		const wasConnected = this._connected;
		this._rejectAllPending("Client disconnected");
		this._cleanupSocket();
		this._connected = false;
		this._lineBuffer = "";
		if (wasConnected) this._fireDisconnectListeners();
	}
	isConnected() {
		return this._connected;
	}
	async sendRequest(sessionId, command, data, context) {
		if (!this._connected || !this._socket) throw new Error("Not connected to sandbox-cli");
		const messageId = `ts-msg-${this._messageCounter++}`;
		const message = createIpcRequest(messageId, sessionId, command, data);
		const requestTimeoutMs = context?.timeoutMs ?? this._config?.requestTimeoutMs ?? DEFAULT_CONFIG.requestTimeoutMs;
		const runExecutableData = command === SANDBOX_COMMANDS.RUN_EXECUTABLE && data !== null && typeof data === "object" && !Array.isArray(data) ? data : void 0;
		const requestEnv = runExecutableData?.env;
		const envCount = requestEnv !== null && typeof requestEnv === "object" && !Array.isArray(requestEnv) ? Object.keys(requestEnv).length : 0;
		const envSummary = runExecutableData ? ` | envCount=${envCount}` : "";
		this.logger?.info?.(`[SandboxCLIClient] sendRequest | id=${messageId} | cmd=${command} | timeout=${requestTimeoutMs}ms${envSummary}`);
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				if (this._pendingRequests.delete(messageId)) reject(/* @__PURE__ */ new Error(`Request ${messageId} timed out after ${requestTimeoutMs}ms (command: ${command})`));
			}, requestTimeoutMs);
			this._pendingRequests.set(messageId, {
				resolve: (value) => resolve(value),
				reject,
				timer,
				conversationRequestId: context?.conversationRequestId
			});
			this._socket?.write(`${JSON.stringify(message)}\n`, (error) => {
				if (error) {
					this._pendingRequests.delete(messageId);
					clearTimeout(timer);
					reject(/* @__PURE__ */ new Error(`Failed to write IPC message: ${error.message}`));
				}
			});
		});
	}
	getPendingConversationRequestIds() {
		const ids = [];
		for (const pending of this._pendingRequests.values()) if (pending.conversationRequestId) ids.push(pending.conversationRequestId);
		return ids;
	}
	onReverseRequest(handler) {
		this._reverseRequestHandler = handler;
	}
	addReverseListener(options, handler) {
		const entry = {
			commands: new Set(options.commands),
			handler
		};
		this._reverseListeners.push(entry);
		return () => {
			const index = this._reverseListeners.indexOf(entry);
			if (index !== -1) this._reverseListeners.splice(index, 1);
		};
	}
	onDisconnect(handler) {
		this._disconnectListeners.add(handler);
		return () => {
			this._disconnectListeners.delete(handler);
		};
	}
	async ping() {
		const pingTimeoutMs = this._config?.heartbeatTimeoutMs ?? DEFAULT_CONFIG.heartbeatTimeoutMs;
		this.logger?.info?.(`[SandboxCLIClient] ping | timeout=${pingTimeoutMs}ms`);
		await this.sendRequest("", SANDBOX_COMMANDS.PING, void 0, { timeoutMs: pingTimeoutMs });
	}
	_tryConnect(pipePath, timeoutMs) {
		return new Promise((resolve, reject) => {
			let settled = false;
			const connectTimer = setTimeout(() => {
				if (settled) return;
				settled = true;
				this._cleanupSocket();
				const error = /* @__PURE__ */ new Error(`IPC connect attempt timeout after ${timeoutMs}ms`);
				error.code = "ETIMEDOUT";
				reject(error);
			}, timeoutMs);
			const socket = node_net.createConnection(pipePath);
			this._socket = socket;
			socket.on("connect", () => {
				if (settled) return;
				settled = true;
				clearTimeout(connectTimer);
				this._connected = true;
				resolve();
			});
			socket.on("error", (error) => {
				if (!settled) {
					settled = true;
					clearTimeout(connectTimer);
					this._cleanupSocket();
					reject(error);
					return;
				}
				this.logger?.info?.(`[SandboxCLIClient] Socket error: ${error.message}`);
				this._handleDisconnect();
			});
			socket.on("close", () => {
				if (!settled) {
					settled = true;
					clearTimeout(connectTimer);
					reject(/* @__PURE__ */ new Error("IPC connection closed before connect"));
					return;
				}
				this.logger?.info?.("[SandboxCLIClient] Socket closed");
				this._handleDisconnect();
			});
			socket.on("data", (chunk) => {
				this._onSocketData(chunk);
			});
		});
	}
	_onSocketData(chunk) {
		this._lineBuffer += chunk.toString("utf-8");
		if (this._lineBuffer.length > MAX_LINE_BUFFER_BYTES) {
			this.logger?.error?.(`[SandboxCLIClient] Line buffer exceeded ${MAX_LINE_BUFFER_BYTES} bytes (currentLen=${this._lineBuffer.length}) without newline, closing connection to force restart`);
			this._lineBuffer = "";
			this._handleDisconnect();
			return;
		}
		let newlineIndex = this._lineBuffer.indexOf("\n");
		while (newlineIndex !== -1) {
			const line = this._lineBuffer.slice(0, newlineIndex).trim();
			this._lineBuffer = this._lineBuffer.slice(newlineIndex + 1);
			if (line) try {
				this._handleMessage(JSON.parse(line));
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.logger?.info?.(`[SandboxCLIClient] Failed to parse IPC message: ${message}, line=${line.slice(0, 200)}`);
			}
			newlineIndex = this._lineBuffer.indexOf("\n");
		}
	}
	_handleMessage(message) {
		if (isIpcResponse(message)) {
			const pending = this._pendingRequests.get(message.messageId);
			if (!pending) {
				this.logger?.info?.(`[SandboxCLIClient] Received response for unknown messageId: ${message.messageId}`);
				return;
			}
			this._pendingRequests.delete(message.messageId);
			if (pending.timer) clearTimeout(pending.timer);
			if (message.success) {
				this.logger?.info?.(`[SandboxCLIClient] Response OK | id=${message.messageId} | cmd=${message.command} | data=${JSON.stringify(message.data ?? null).slice(0, 500)}`);
				pending.resolve(message.data);
				return;
			}
			this.logger?.info?.(`[SandboxCLIClient] Response ERR | id=${message.messageId} | error=${message.error}`);
			pending.reject(new Error(message.error || `Request ${message.messageId} failed`));
			return;
		}
		this.logger?.info?.(`[SandboxCLIClient] Reverse request | id=${message.messageId} | cmd=${message.command} | data=${JSON.stringify(message.data ?? null).slice(0, 500)}`);
		let consumed = false;
		for (const listener of this._reverseListeners) if (listener.commands.has(message.command)) {
			consumed = true;
			const onListenerError = (error) => {
				const detail = error instanceof Error ? error.message : String(error);
				this.logger?.info?.(`[SandboxCLIClient] Listener error for ${message.command}: ${detail}`);
			};
			try {
				Promise.resolve(listener.handler(message)).catch(onListenerError);
			} catch (error) {
				onListenerError(error);
			}
		}
		if (consumed) return;
		if (!this._reverseRequestHandler) {
			this._sendResponse(createIpcResponseErr(message.messageId, message.sessionId, message.command, "No reverse request handler registered"));
			return;
		}
		if (FIRE_AND_FORGET_COMMANDS.has(message.command)) {
			this._reverseRequestHandler(message).catch((error) => {
				const detail = error instanceof Error ? error.message : String(error);
				this.logger?.info?.(`[SandboxCLIClient] Fire-and-forget handler error for ${message.command}: ${detail}`);
			});
			return;
		}
		this._reverseRequestHandler(message).then((data) => {
			this._sendResponse(createIpcResponseOk(message.messageId, message.sessionId, message.command, data));
		}).catch((error) => {
			const detail = error instanceof Error ? error.message : "Reverse request handler failed";
			this._sendResponse(createIpcResponseErr(message.messageId, message.sessionId, message.command, detail));
		});
	}
	_sendResponse(message) {
		if (!this._connected || !this._socket) {
			this.logger?.info?.("[SandboxCLIClient] Cannot send response: not connected");
			return;
		}
		this._socket.write(`${JSON.stringify(message)}\n`, (error) => {
			if (error) this.logger?.info?.(`[SandboxCLIClient] Failed to send response: ${error.message}`);
		});
	}
	_rejectAllPending(reason) {
		for (const [id, pending] of this._pendingRequests) {
			if (pending.timer) clearTimeout(pending.timer);
			pending.reject(new Error(reason));
			this.logger?.info?.(`[SandboxCLIClient] Rejected pending request: ${id}`);
		}
		this._pendingRequests.clear();
	}
	_cleanupSocket() {
		if (!this._socket) return;
		this._socket.removeAllListeners();
		try {
			this._socket.destroy();
		} catch {}
		this._socket = null;
	}
	_handleDisconnect() {
		if (!this._connected) return;
		this._connected = false;
		this._rejectAllPending("Connection lost");
		this._cleanupSocket();
		this.logger?.info?.("[SandboxCLIClient] Disconnected from sandbox-cli");
		this._fireDisconnectListeners();
	}
	_fireDisconnectListeners() {
		const listeners = [...this._disconnectListeners];
		if (listeners.length > 0) this.logger?.info?.(`[SandboxCLIClient] firing ${listeners.length} disconnect listener(s)`);
		for (const listener of listeners) try {
			listener();
		} catch (error) {
			const detail = error instanceof Error ? error.message : String(error);
			this.logger?.info?.(`[SandboxCLIClient] disconnect listener error: ${detail}`);
		}
	}
};
function isIpcResponse(message) {
	return message.success !== void 0 && !FIRE_AND_FORGET_COMMANDS.has(message.command);
}
function createIpcRequest(messageId, sessionId, command, data) {
	return {
		sessionId,
		messageId,
		command,
		data
	};
}
function createIpcResponseOk(messageId, sessionId, command, data) {
	return {
		sessionId,
		messageId,
		command,
		data,
		success: true
	};
}
function createIpcResponseErr(messageId, sessionId, command, error) {
	return {
		sessionId,
		messageId,
		command,
		success: false,
		error
	};
}
function isRetryableConnectError(error) {
	const code = error.code;
	return code === "ENOENT" || code === "ECONNREFUSED" || error.message.includes("ENOENT") || error.message.includes("ECONNREFUSED");
}
//#endregion
//#region ../../packages/sandbox-cli/src/node/sandbox-cli-session.ts
var IPC_REQUEST_TIMEOUT_MS = 3e4;
var DEFAULT_STARTUP_GRACE_MS = 500;
function createSandboxCliSession(options) {
	return new SandboxCliSessionImpl(options);
}
/** One sandbox-cli process, IPC connection, and named session for a host-owned runtime. */
var SandboxCliSessionImpl = class {
	constructor(options) {
		this.options = options;
		this.opened = false;
		this.expectedClose = false;
		this.sandboxExitNotified = false;
		this.sessionId = options.sessionId;
		this.ipcAddress = options.ipcAddress ?? `Sandbox_${(0, node_crypto.randomBytes)(6).toString("hex")}`;
	}
	onProcessOutput(handler) {
		this.processOutputHandler = handler;
	}
	onProcessExit(handler) {
		this.processExitHandler = handler;
	}
	onSandboxExit(handler) {
		this.sandboxExitHandler = handler;
	}
	async openSession(workingDir) {
		await this.ensureConnected();
		const response = await this.request(SANDBOX_COMMANDS.OPEN_SESSION, {
			name: this.sessionId,
			workingDir
		});
		if (!response?.workingDir) throw new Error("OpenSession did not return workingDir");
		this.opened = true;
		return response.workingDir;
	}
	async closeSession() {
		this.expectedClose = true;
		try {
			if (this.opened && this.client?.isConnected()) await this.request(SANDBOX_COMMANDS.CLOSE_SESSION, {});
		} catch {} finally {
			this.opened = false;
			await this.dispose();
		}
	}
	async runExecutable(request) {
		if (!this.opened) throw new Error("sandbox-cli session is not open");
		const response = await this.request(SANDBOX_COMMANDS.RUN_EXECUTABLE, {
			executable: request.executable,
			args: request.args,
			cwdDir: request.cwdDir,
			timeoutMs: request.timeoutMs,
			executionMode: "sandbox",
			stdoutMode: "pipe",
			stdinMode: "null",
			...request.env ? { env: request.env } : {}
		});
		if (!response?.processId || typeof response.pid !== "number") throw new Error("RunExecutable did not return processId and pid");
		return response;
	}
	async processKill(processId, signal) {
		await this.request(SANDBOX_COMMANDS.PROCESS_KILL, {
			processId,
			...signal ? { signal: toSandboxKillSignal(signal) } : {}
		});
	}
	async ensureConnected() {
		if (this.client?.isConnected()) return;
		if (!this.connecting) this.connecting = this.connect().finally(() => {
			this.connecting = void 0;
		});
		await this.connecting;
	}
	async connect() {
		validateOptions(this.options);
		this.expectedClose = false;
		this.sandboxExitNotified = false;
		try {
			this.proc = this.spawnCliProcess(this.buildSpawnArgs(), this.buildSpawnEnvironment());
			let startupComplete = false;
			let rejectStartup = () => {};
			const startupError = new Promise((_resolve, reject) => {
				rejectStartup = reject;
			});
			this.proc.on("error", (error) => {
				if (!startupComplete) {
					rejectStartup(error);
					return;
				}
				const wasOpened = this.opened;
				this.opened = false;
				if (wasOpened && !this.expectedClose) this.notifySandboxExit(null, null);
			});
			this.proc.once("close", (code, signal) => {
				const wasOpened = this.opened;
				this.opened = false;
				if (wasOpened && !this.expectedClose) this.notifySandboxExit(code, signal);
			});
			await Promise.race([this.wait(this.options.startupGraceMs ?? DEFAULT_STARTUP_GRACE_MS), startupError]);
			if (this.proc.exitCode !== null) throw new Error(`sandbox-cli exited immediately with code ${this.proc.exitCode}`);
			const client = this.createClient();
			client.addReverseListener({ commands: [SANDBOX_COMMANDS.PROCESS_OUTPUT] }, (message) => {
				const event = readProcessOutputEvent(message.data);
				if (event) this.processOutputHandler?.(event);
			});
			client.addReverseListener({ commands: [SANDBOX_COMMANDS.PROCESS_EXIT] }, (message) => {
				const event = readProcessExitEvent(message.data);
				if (event) this.processExitHandler?.(event);
			});
			client.onDisconnect(() => {
				if (this.opened && !this.expectedClose) {
					this.opened = false;
					this.notifySandboxExit(this.proc?.exitCode ?? null, null);
				}
			});
			await Promise.race([client.connect({
				sessionId: this.sessionId,
				address: this.ipcAddress,
				autoReconnect: false
			}), startupError]);
			this.client = client;
			await Promise.race([client.ping(), startupError]);
			startupComplete = true;
		} catch (error) {
			this.expectedClose = true;
			await this.dispose();
			throw error;
		}
	}
	buildSpawnArgs() {
		const args = [
			"--config",
			JSON.stringify({
				ipcAddress: this.ipcAddress,
				extraPath: [],
				enableGlobalProjection: false
			}),
			"--rule_decision",
			"center",
			"--uid",
			this.options.uid.trim(),
			"--app_home",
			this.options.appHomeDir
		];
		if (process.platform === "darwin" && this.options.appGroupId) args.push("--app_group_id", this.options.appGroupId);
		return args;
	}
	buildSpawnEnvironment() {
		return {
			...process.env,
			NODE_OPTIONS: "",
			SANDBOX_CENTER_UID: this.options.uid.trim()
		};
	}
	spawnCliProcess(args, env) {
		const captureStderr = Boolean(this.options.logger);
		const proc = (0, node_child_process.spawn)(this.options.sandboxCliPath, args, {
			stdio: [
				"ignore",
				"ignore",
				captureStderr ? "pipe" : "ignore"
			],
			windowsHide: true,
			cwd: node_path.dirname(this.options.sandboxCliPath),
			env
		});
		if (captureStderr) attachCliStreamLogger(proc, "stderr", this.options.logger);
		return proc;
	}
	createClient() {
		return createSandboxCliClient(this.options.logger);
	}
	wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	request(command, data) {
		if (!this.client) return Promise.reject(/* @__PURE__ */ new Error("sandbox-cli IPC is not connected"));
		return this.client.sendRequest(this.sessionId, command, data, { timeoutMs: IPC_REQUEST_TIMEOUT_MS });
	}
	notifySandboxExit(exitCode, signal) {
		if (this.sandboxExitNotified) return;
		this.sandboxExitNotified = true;
		this.sandboxExitHandler?.(exitCode, signal);
	}
	async dispose() {
		const client = this.client;
		this.client = void 0;
		if (client) await client.disconnect().catch(() => void 0);
		const proc = this.proc;
		this.proc = void 0;
		if (proc?.exitCode === null) proc.kill();
	}
};
function toSandboxKillSignal(signal) {
	return signal === "SIGKILL" ? "kill" : "term";
}
function validateOptions(options) {
	if (!options.uid.trim()) throw new Error("sandbox-cli center mode requires an authenticated user");
	if (!options.appHomeDir.trim()) throw new Error("sandbox-cli center mode requires appHomeDir");
}
function attachCliStreamLogger(proc, stream, logger) {
	proc[stream]?.on("data", (chunk) => {
		const text = String(chunk).trimEnd();
		if (!text) return;
		for (const line of text.split(/\r?\n/)) {
			const trimmed = line.trimEnd();
			if (trimmed) logger?.info?.(`[sandbox-cli] ${stream}: ${trimmed}`);
		}
	});
}
function readProcessOutputEvent(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return;
	const event = value;
	if (typeof event.processId !== "string" || typeof event.data !== "string") return;
	return {
		processId: event.processId,
		data: event.data,
		stream: event.stream === "stderr" || event.stream === "stdout" ? event.stream : void 0
	};
}
function readProcessExitEvent(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return;
	const event = value;
	if (typeof event.processId !== "string" || typeof event.exitCode !== "number") return;
	return {
		processId: event.processId,
		exitCode: event.exitCode,
		killed: typeof event.killed === "boolean" ? event.killed : void 0,
		decisionRecords: Array.isArray(event.decisionRecords) ? event.decisionRecords : [],
		metrics: typeof event.metrics === "object" && event.metrics !== null && !Array.isArray(event.metrics) ? event.metrics : void 0
	};
}
//#endregion
//#region ../../packages/sandbox-cli/lib/common/command-policy.js
var require_command_policy = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compileCommandRules = compileCommandRules;
	function compileCommandRules(rules) {
		return rules.filter((rule) => rule.prefix.length > 0).map((rule) => ({
			cmd: rule.prefix[0],
			args: rule.prefix.slice(1),
			action: rule.action,
			...rule.reason ? { comment: rule.reason } : {}
		}));
	}
}));
//#endregion
//#region ../../packages/sandbox-cli/lib/node/file-policy.js
var require_file_policy = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.buildFileRules = buildFileRules;
	var node_path_1 = __importDefault(require("node:path"));
	var file_policy_1 = require_server.require_file_policy();
	function expandFilePolicyPath(rulePath, facts) {
		const api = facts.platform === "win32" ? node_path_1.default.win32 : node_path_1.default.posix;
		const normalized = rulePath.replace(/^[\uFF5E\u301C]/, "~");
		if (normalized === "~") return facts.homeDir;
		if (/^~[/\\]/.test(normalized)) return api.join(facts.homeDir, normalized.slice(2));
		if (normalized === "**" || /^\*\*[/\\]/.test(normalized)) return normalized.replace(/\\/g, "/");
		return api.isAbsolute(normalized) ? api.normalize(normalized) : api.resolve(facts.workspacePath, normalized);
	}
	/** Compile configuration only. No permission matching, approval or IPC occurs here. */
	function buildFileRules(configuredRules, facts) {
		const expand = (rule) => {
			const expanded = expandFilePolicyPath(rule.path, facts);
			return {
				...rule,
				path: expanded,
				isDirectory: rule.isDirectory || !/[?*]/.test(expanded) && facts.isDirectory?.(expanded) === true
			};
		};
		const defaults = (0, file_policy_1.getDefaultFileRules)(facts.platform);
		const source = configuredRules ?? defaults;
		const isDefaultSnapshot = source.length === defaults.length && source.every((rule, index) => rule.path === defaults[index].path && rule.action === defaults[index].action && rule.isDirectory === defaults[index].isDirectory);
		const rules = source.map(expand);
		const key = (rulePath) => {
			const normalized = rulePath.replace(/\\/g, "/").replace(/\/+$/, "");
			return facts.platform === "win32" ? normalized.toLowerCase() : normalized;
		};
		const configuredPaths = new Set(rules.map((rule) => key(rule.path)));
		const additional = [];
		const append = (rule) => {
			const expanded = expand(rule);
			if (!configuredPaths.has(key(expanded.path))) {
				configuredPaths.add(key(expanded.path));
				additional.push(expanded);
			}
		};
		for (const rule of facts.protectedRules ?? []) append(rule);
		const protectedCount = additional.length;
		for (const directory of facts.writableDirectories ?? []) append({
			path: directory,
			isDirectory: true,
			action: file_policy_1.FILE_ACTION_FULL_ALLOW
		});
		if (!rules.some((rule) => rule.path === "**" || rule.path === "/" || rule.path === "/**")) additional.push({
			path: "**",
			isDirectory: false,
			action: facts.allowDeleteFallback === true || facts.platform === "win32" && facts.modifyBackupEnabled === true ? file_policy_1.FILE_ACTION_FULL_ALLOW : file_policy_1.FILE_ACTION_PROTECT_DELETE
		});
		const immutable = (facts.readOnlyRuntimeDirectories ?? []).map((directory) => expand({
			path: directory,
			isDirectory: true,
			action: file_policy_1.FILE_ACTION_READ_ONLY
		}));
		const firstBasicAllow = isDefaultSnapshot ? rules.findIndex((rule) => rule.action === file_policy_1.FILE_ACTION_FULL_ALLOW) : -1;
		return firstBasicAllow < 0 ? [
			...immutable,
			...rules,
			...additional
		] : [
			...immutable,
			...rules.slice(0, firstBasicAllow),
			...additional.slice(0, protectedCount),
			...rules.slice(firstBasicAllow),
			...additional.slice(protectedCount)
		];
	}
}));
//#endregion
//#region ../../packages/sandbox-cli/lib/common/network-policy.js
var require_network_policy = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compileNetworkRules = compileNetworkRules;
	/** Callers retain their existing fallback and permission-mode behavior. */
	function compileNetworkRules(rules, defaultAction) {
		const compiled = rules.map((rule) => ({
			endpoint: rule.domain,
			action: rule.action
		}));
		return defaultAction && !compiled.some((rule) => rule.endpoint === "*") ? [...compiled, {
			endpoint: "*",
			action: defaultAction
		}] : compiled;
	}
}));
//#endregion
//#region ../../packages/workbuddy-server/src/docs/engine/editor-sdk-sandbox-center.ts
var import_command_policy = require_command_policy();
var import_file_policy = require_server.require_file_policy();
var import_file_policy$1 = require_file_policy();
var import_network_policy = require_network_policy();
var GLOBAL_ALLOW_RULE = {
	path: "**",
	read: "allow",
	write: "allow",
	delete: "allow",
	isDirectory: false
};
var GLOBAL_NETWORK_ALLOW_RULE = {
	endpoint: "*",
	action: "allow"
};
function encodeEditorSdkFileRuleAction(actions) {
	return (0, import_file_policy.encodeFileRuleAction)(actions);
}
function compileEditorSdkOrderedFileRules(orderedRules, options = {}) {
	const platform = options.platform ?? process.platform;
	const tempDir = options.tempDir ?? node_os.tmpdir();
	const macOSUserDir = platform === "darwin" ? node_path.posix.normalize(tempDir).match(/^(?:\/private)?(\/var\/folders\/[^/]+\/[^/]+)\/T\/?$/)?.[1] : void 0;
	return (0, import_file_policy$1.buildFileRules)(orderedRules.map(import_file_policy.fromFileRuleSettings), {
		platform,
		homeDir: options.homeDir ?? node_os.homedir(),
		workspacePath: options.workspacePath ?? process.cwd(),
		writableDirectories: [
			tempDir,
			...platform === "darwin" && tempDir.startsWith("/var/") ? [node_path.posix.join("/private", tempDir)] : [],
			...macOSUserDir ? [`${macOSUserDir}/C`, `/private${macOSUserDir}/C`] : []
		],
		isDirectory: options.isDirectory ?? defaultIsDirectory,
		modifyBackupEnabled: options.modifyBackupEnabled,
		allowDeleteFallback: true
	});
}
function compileEditorSdkFileRules(rules, options = {}) {
	const homeDir = options.homeDir ?? node_os.homedir();
	const isDirectory = options.isDirectory ?? defaultIsDirectory;
	const platform = options.platform ?? process.platform;
	return rules.map((rule) => {
		const rulePath = expandEditorSdkRulePath(rule.path, homeDir, platform);
		return {
			path: rulePath,
			action: encodeEditorSdkFileRuleAction(rule),
			isDirectory: rule.isDirectory ?? inferDirectoryRule(rulePath, isDirectory)
		};
	});
}
function compileEditorSdkCommandRules(rules) {
	return (0, import_command_policy.compileCommandRules)(rules);
}
function compileEditorSdkNetworkRules(rules) {
	return (0, import_network_policy.compileNetworkRules)(rules, "allow");
}
function createEditorSdkSandboxCenterClient(options) {
	return require_log_acl_guard.createSandboxCenterClient({
		clientRole: "editor-sdk",
		startMode: "connect-only",
		resolveRuntimeContext: async () => {
			const uid = (await options.getUid())?.trim();
			if (!uid) throw new Error("editor sdk sandbox requires an authenticated user");
			return {
				appHome: options.appHome,
				socketPath: require_log_acl_guard.consumeEpochCenterAddress(options.appHome),
				uid
			};
		}
	});
}
async function pushEditorSdkOperationalRules(client, sessionId, category, rules, compileOptions = {}) {
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_FILE_RULES, {
		category,
		rules: compileEditorSdkFileRules(rules, compileOptions)
	});
}
async function pushEditorSdkExecutionRules(client, sessionId, rules, compileOptions = {}) {
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_FILE_RULES, {
		category: "global",
		rules: compileEditorSdkOrderedFileRules(rules.file, compileOptions)
	});
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_NETWORK_RULES, {
		category: "global",
		rules: compileEditorSdkNetworkRules(rules.network)
	});
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_CMD_RULES, {
		category: "global",
		rules: compileEditorSdkCommandRules(rules.command)
	});
}
async function pushEditorSdkExecutionGlobalAllow(client, sessionId, compileOptions = {}) {
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_FILE_RULES, {
		category: "global",
		rules: compileEditorSdkFileRules([GLOBAL_ALLOW_RULE], compileOptions)
	});
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_NETWORK_RULES, {
		category: "global",
		rules: [GLOBAL_NETWORK_ALLOW_RULE]
	});
	await requestCenterRules(client, sessionId, require_log_acl_guard.SANDBOX_RULES_COMMANDS.SET_CMD_RULES, {
		category: "global",
		rules: []
	});
}
function requestCenterRules(client, sessionId, command, payload) {
	return client.request(command, payload, { sessionId });
}
function expandEditorSdkRulePath(rulePath, homeDir, platform) {
	const normalized = normalizeRulePattern(rulePath);
	const pathApi = platform === "win32" ? node_path.win32 : node_path.posix;
	if (normalized === "~") return pathApi.normalize(homeDir);
	if (normalized.startsWith("~/")) return pathApi.join(homeDir, normalized.slice(2));
	return normalized;
}
function normalizeRulePattern(rulePath) {
	const tildeNormalized = rulePath.replace(/^[\uFF5E\u301C]/, "~");
	const hasWildcard = tildeNormalized.endsWith("*");
	const withoutWildcard = hasWildcard ? tildeNormalized.slice(0, -1) : tildeNormalized;
	const hadTrailingSlash = !hasWildcard && /[/\\]$/.test(withoutWildcard);
	let normalized = node_path.posix.normalize(withoutWildcard.replace(/\\/g, "/"));
	if (hadTrailingSlash && !normalized.endsWith("/")) normalized += "/";
	return hasWildcard ? `${normalized}*` : normalized;
}
function inferDirectoryRule(rulePath, isDirectory) {
	const normalized = rulePath.replace(/\\/g, "/");
	if (normalized.endsWith("/**")) return false;
	return normalized.endsWith("/") || isDirectory(rulePath);
}
function defaultIsDirectory(filePath) {
	try {
		return (0, node_fs.statSync)(filePath).isDirectory();
	} catch {
		return false;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs/engine/sandbox-editor-sdk-process-launcher.ts
/** EditorSdkProcessLauncher backed by one sandbox-cli session per editor_sdk process. */
var SandboxEditorSdkProcessLauncher = class {
	constructor(options) {
		this.options = options;
		this.processes = /* @__PURE__ */ new Set();
		this.executionPolicy = {
			mode: "ordered",
			rules: {
				file: [],
				command: [],
				network: []
			}
		};
	}
	launch(request) {
		const managedProcess = new SandboxEditorSdkManagedProcess({
			request,
			options: this.options,
			policy: this.executionPolicy,
			onFinished: () => this.processes.delete(managedProcess)
		});
		this.processes.add(managedProcess);
		return managedProcess;
	}
	async syncExecutionPolicy(policy) {
		this.executionPolicy = cloneExecutionPolicy(policy);
		await Promise.all([...this.processes].map((process) => process.syncExecutionPolicy(policy)));
	}
};
var SandboxEditorSdkManagedProcess = class extends node_events.EventEmitter {
	constructor(options) {
		super();
		this.options = options;
		this.stdout = new node_stream.PassThrough();
		this.stderr = new node_stream.PassThrough();
		this.finished = false;
		this.killedByHost = false;
		this.policyChain = Promise.resolve();
		this.executionPolicy = cloneExecutionPolicy(options.policy);
		queueMicrotask(() => {
			this.start().then(() => void 0, () => void 0);
		});
	}
	get pid() {
		return this.processPid;
	}
	get killed() {
		return this.killedByHost;
	}
	on(event, listener) {
		return super.on(event, listener);
	}
	once(event, listener) {
		return super.once(event, listener);
	}
	removeListener(event, listener) {
		return super.removeListener(event, listener);
	}
	syncExecutionPolicy(policy) {
		this.executionPolicy = cloneExecutionPolicy(policy);
		return this.enqueuePolicy(async () => {
			if (this.center && !this.finished) {
				await this.syncOperationalRules();
				await applyExecutionPolicy(this.center, this.executionPolicy);
			}
		});
	}
	requestStop() {
		return this.requestKill("SIGTERM");
	}
	forceStop() {
		return this.requestKill("SIGKILL");
	}
	async start() {
		let uidHash;
		let sessionId;
		const requestedPort = readArgValue(this.options.request.args, "--port");
		try {
			const uid = (await this.options.options.getUid())?.trim();
			if (!uid) throw new Error("editor sdk sandbox requires an authenticated user");
			uidHash = hashDiagnosticId(uid);
			const sandboxCliPath = this.options.options.sandboxCliPath ?? require_log_acl_guard.getSandboxCliPath();
			if (!sandboxCliPath) throw new Error("editor sdk sandbox-cli is unavailable");
			sessionId = `editor-sdk-${process.pid}-${(0, node_crypto.randomBytes)(4).toString("hex")}`;
			this.options.options.logger?.info("[EditorSdkSandbox] process launch start", {
				sessionId,
				uidHash,
				requestedPort,
				cwd: this.options.request.cwd,
				binaryName: pathBasename(this.options.request.binaryPath),
				argsCount: this.options.request.args.length
			});
			const sessionOptions = {
				sandboxCliPath,
				sessionId,
				appHomeDir: this.options.options.appHomeDir,
				uid,
				appGroupId: this.options.options.appGroupId,
				ipcAddress: `EditorSdk_${(0, node_crypto.randomBytes)(6).toString("hex")}`,
				logger: toSandboxCliLogger(this.options.options.logger)
			};
			const session = this.options.options.createSession?.(sessionOptions) ?? createSandboxCliSession(sessionOptions);
			const center = this.options.options.createCenter?.(uid, sessionId) ?? createDefaultCenter(this.options.options, uid, sessionId);
			this.session = session;
			this.center = center;
			session.onProcessOutput((event) => {
				if (event.stream === "stderr") this.stderr.write(event.data);
				else this.stdout.write(event.data);
			});
			session.onProcessExit((event) => {
				if (!this.processId) this.pendingExit = event;
				else if (event.processId === this.processId) this.finishExit(event.exitCode, null);
			});
			session.onSandboxExit((code, signal) => {
				if (!this.finished) this.finishError(/* @__PURE__ */ new Error(`sandbox-cli exited unexpectedly code=${code} signal=${signal}`));
			});
			await session.openSession(this.options.options.workspaceDir);
			await this.applyCurrentPolicy();
			const launched = await session.runExecutable({
				executable: this.options.request.binaryPath,
				args: appendTmpDir(this.options.request.args, this.options.options.tmpDir),
				cwdDir: this.options.request.cwd,
				timeoutMs: 0
			});
			this.processId = launched.processId;
			this.processPid = launched.pid;
			this.options.options.logger?.info("[EditorSdkSandbox] process launch settled", {
				sessionId,
				uidHash,
				requestedPort,
				processId: this.processId,
				pid: this.processPid
			});
			if (this.pendingExit?.processId === this.processId) this.finishExit(this.pendingExit.exitCode, null);
			else if (this.pendingKillSignal) await this.killRemoteProcess(this.pendingKillSignal);
		} catch (error) {
			this.options.options.logger?.warn("[EditorSdkSandbox] process launch failed", {
				sessionId,
				uidHash,
				requestedPort,
				error: toError(error).message
			});
			this.finishError(toError(error));
		}
	}
	requestKill(signal) {
		this.killedByHost = true;
		this.pendingKillSignal = signal === "SIGKILL" ? "SIGKILL" : this.pendingKillSignal ?? signal;
		this.options.options.logger?.info("[EditorSdkSandbox] process kill requested", {
			requestedSignal: signal,
			pendingSignal: this.pendingKillSignal,
			processId: this.processId,
			pid: this.processPid,
			finished: this.finished
		});
		if (this.processId) this.killRemoteProcess(this.pendingKillSignal).then(() => void 0, () => void 0);
		return true;
	}
	async killRemoteProcess(signal) {
		const session = this.session;
		const processId = this.processId;
		if (!session || !processId) return;
		try {
			await session.processKill(processId, signal);
			this.options.options.logger?.info("[EditorSdkSandbox] process kill sent", {
				processId,
				pid: this.processPid,
				signal
			});
		} catch (error) {
			this.options.options.logger?.warn(`[EditorSdkSandbox] process kill failed: ${toError(error).message}`);
		}
	}
	applyCurrentPolicy() {
		return this.enqueuePolicy(async () => {
			if (this.center && !this.finished) {
				await this.syncOperationalRules();
				await applyExecutionPolicy(this.center, this.executionPolicy);
			}
		});
	}
	async syncOperationalRules() {
		const center = this.center;
		if (!center || this.finished) return;
		this.options.options.logger?.info("[EditorSdkSandbox] syncing operational rules", {
			processId: this.processId,
			tmpDir: this.options.options.tmpDir,
			logDir: this.options.options.logDir
		});
		await center.syncRules("session", require_tencent_docs_prompt_selection.buildEditorSdkOperationalRules({
			workspaceDir: this.options.options.workspaceDir,
			editorSdkPath: this.options.request.binaryPath,
			editorSdkCwd: this.options.request.cwd,
			tmpDir: this.options.options.tmpDir,
			logDir: this.options.options.logDir,
			staticDir: readArgValue(this.options.request.args, "--static_dir")
		}));
		await center.syncRules("auto_grant", []);
	}
	enqueuePolicy(work) {
		const next = this.policyChain.then(work, work);
		this.policyChain = next.then(() => void 0, () => void 0);
		return next;
	}
	finishExit(code, signal) {
		if (this.finished) return;
		this.finished = true;
		this.options.options.logger?.info("[EditorSdkSandbox] process exited", {
			processId: this.processId,
			pid: this.processPid,
			code,
			signal,
			killedByHost: this.killedByHost
		});
		this.stdout.end();
		this.stderr.end();
		this.emit("exit", code, signal);
		this.cleanupBackends().then(() => void 0, () => void 0);
	}
	finishError(error) {
		if (this.finished) return;
		this.finished = true;
		this.options.options.logger?.warn("[EditorSdkSandbox] process errored", {
			processId: this.processId,
			pid: this.processPid,
			killedByHost: this.killedByHost,
			error: error.message
		});
		this.stdout.end();
		this.stderr.end();
		this.emit("error", error);
		this.cleanupBackends().then(() => void 0, () => void 0);
	}
	cleanupBackends() {
		if (this.cleanupPromise) return this.cleanupPromise;
		const session = this.session;
		const center = this.center;
		this.session = void 0;
		this.center = void 0;
		this.options.onFinished();
		this.cleanupPromise = (async () => {
			await session?.closeSession().catch(() => void 0);
			await Promise.resolve(center?.close()).catch(() => void 0);
		})();
		return this.cleanupPromise;
	}
};
function createDefaultCenter(options, uid, sessionId) {
	const client = createEditorSdkSandboxCenterClient({
		appHome: options.appHomeDir,
		getUid: () => uid
	});
	return {
		syncRules: (category, rules) => pushEditorSdkOperationalRules(client, sessionId, category, rules),
		syncExecutionRules: (rules) => pushEditorSdkExecutionRules(client, sessionId, rules, { workspacePath: options.workspaceDir }),
		syncExecutionGlobalAllow: () => pushEditorSdkExecutionGlobalAllow(client, sessionId),
		close: () => client.close()
	};
}
function applyExecutionPolicy(center, policy) {
	return policy.mode === "global-allow" ? center.syncExecutionGlobalAllow() : center.syncExecutionRules(policy.rules);
}
function cloneExecutionPolicy(policy) {
	return policy.mode === "global-allow" ? policy : {
		mode: "ordered",
		rules: {
			file: policy.rules.file.map((rule) => ({ ...rule })),
			command: policy.rules.command.map((rule) => ({
				...rule,
				prefix: [...rule.prefix]
			})),
			network: policy.rules.network.map((rule) => ({ ...rule }))
		}
	};
}
function appendTmpDir(args, tmpDir) {
	return args.some((arg) => arg === "--tmp_dir" || arg.startsWith("--tmp_dir=")) ? [...args] : [...args, `--tmp_dir=${tmpDir}`];
}
function readArgValue(args, name) {
	const prefix = `${name}=`;
	const index = args.findIndex((arg) => arg === name || arg.startsWith(prefix));
	if (index < 0) return;
	const argument = args[index];
	return argument.startsWith(prefix) ? argument.slice(prefix.length) : args[index + 1];
}
function hashDiagnosticId(value) {
	return (0, node_crypto.createHash)("sha256").update(value).digest("hex").slice(0, 12);
}
function pathBasename(value) {
	return value.replace(/\\/g, "/").split("/").pop() || value;
}
function toSandboxCliLogger(logger) {
	if (!logger) return;
	return {
		info: (message) => logger.info(message),
		error: (message) => logger.warn(message)
	};
}
function toError(error) {
	return error instanceof Error ? error : new Error(String(error));
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs/engine/workbuddy-editor-sdk-sandbox.ts
var EMPTY_ORDERED_RULES = {
	file: {
		presetVersion: 0,
		customized: false,
		rules: []
	},
	command: {
		presetVersion: 0,
		customized: false,
		rules: []
	},
	network: {
		presetVersion: 0,
		customized: false,
		rules: []
	}
};
var NOOP_LIFECYCLE_HANDLERS = {
	onEngineReady() {},
	onUnexpectedExit() {}
};
var WINDOWS_REPLACE_RETRY_DELAYS_MS = [
	40,
	120,
	240
];
function isWindowsReplaceContention(error) {
	const code = error?.code;
	return code === "EPERM" || code === "EACCES" || code === "EBUSY";
}
/**
* 将 SDK 暂存导出写回目标文件。
*
* Windows 编辑器常持有不共享 DELETE 的原文件句柄，导致同目录 rename 覆盖持续 EPERM。
* 先短暂重试原子替换；仍被占用时回退为 daemon 直接覆盖写入。后者不具备原子性，但与
* 旧版 SDK 直接保存目标文件的语义一致，且优于把用户的编辑结果留在临时目录。
*/
async function replaceStagedSaveFile(stagingFilePath, targetFilePath, options = {}) {
	const operations = {
		copyFile: node_fs_promises.copyFile,
		rename: node_fs_promises.rename,
		rm: node_fs_promises.rm,
		sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
		...options.operations
	};
	const replacementFilePath = node_path.join(node_path.dirname(targetFilePath), `.${node_path.basename(targetFilePath)}.${(0, node_crypto.randomUUID)()}.workbuddy-save`);
	try {
		await operations.copyFile(stagingFilePath, replacementFilePath);
		const retryDelays = options.retryDelaysMs ?? WINDOWS_REPLACE_RETRY_DELAYS_MS;
		for (let attempt = 0;; attempt++) try {
			await operations.rename(replacementFilePath, targetFilePath);
			return { usedNonAtomicFallback: false };
		} catch (error) {
			if (!((options.platform ?? process.platform) === "win32" && isWindowsReplaceContention(error))) throw error;
			if (attempt < retryDelays.length) {
				await operations.sleep(retryDelays[attempt]);
				continue;
			}
			await operations.copyFile(stagingFilePath, targetFilePath);
			return { usedNonAtomicFallback: true };
		}
	} finally {
		await operations.rm(replacementFilePath, { force: true }).catch(() => void 0);
	}
}
function createWorkbuddyEditorSdkSandbox(options) {
	const appHomeDir = options.appHomeDir ?? require_runtime_paths.getWorkbuddyConfigDir();
	const workspaceDir = node_path.join(appHomeDir, "editor-sdk-sandbox-ws");
	const tmpDir = node_path.join(node_os.tmpdir(), "workbuddy-editor-sdk-sandbox", "tmp");
	const logDir = require_runtime_paths.getEditorSdkLogDir();
	const launcher = new SandboxEditorSdkProcessLauncher({
		appHomeDir,
		workspaceDir,
		tmpDir,
		logDir,
		getUid: options.getUid,
		appGroupId: options.appGroupId ?? process.env.SANDBOX_APP_GROUP_ID,
		logger: options.logger
	});
	return createEditorSdkSandboxEngine({
		createSandboxService: (lifecycleHandlers) => new _tencent_tencent_docs_ai_engine.TencentDocsService({
			editorSdkPath: options.editorSdkPath,
			portFileRootDir: appHomeDir,
			logDir,
			editorSdkProcessLauncher: launcher,
			...options.logger ? { logger: {
				info: (message, extra) => options.logger?.info(message, extra),
				warn: (message, extra) => options.logger?.warn(message, extra)
			} } : {},
			onEngineReady: lifecycleHandlers.onEngineReady,
			onUnexpectedExit: lifecycleHandlers.onUnexpectedExit
		}),
		createFallback: (lifecycleHandlers) => new _tencent_tencent_docs_ai_engine.TencentDocsService({
			logger: {
				info: (message, extra) => require_tencent_docs_prompt_selection.windowLog.info("[TencentDocsEngine:fallback]", message, ...extra !== void 0 ? [extra] : []),
				warn: (message, extra) => require_tencent_docs_prompt_selection.windowLog.warn("[TencentDocsEngine:fallback]", message, ...extra !== void 0 ? [extra] : [])
			},
			portFileRootDir: appHomeDir,
			logDir,
			onEngineReady: lifecycleHandlers.onEngineReady,
			onUnexpectedExit: lifecycleHandlers.onUnexpectedExit
		}),
		syncExecutionPolicy: (policy) => launcher.syncExecutionPolicy(policy),
		requireOrderedRulesBeforeStart: true,
		sandboxEnabled: options.sandboxEnabled ?? true,
		saveStagingDir: node_path.join(tmpDir, "document-save-staging"),
		prepareRuntime: async () => {
			await Promise.all([
				(0, node_fs_promises.mkdir)(workspaceDir, { recursive: true }),
				(0, node_fs_promises.mkdir)(tmpDir, { recursive: true }),
				(0, node_fs_promises.mkdir)(node_path.join(tmpDir, "document-save-staging"), { recursive: true }),
				(0, node_fs_promises.mkdir)(logDir, { recursive: true })
			]);
		},
		logger: options.logger
	});
}
function createEditorSdkSandboxEngine(options) {
	let handlers = NOOP_LIFECYCLE_HANDLERS;
	let fallback;
	let degraded = false;
	let orderedRules = EMPTY_ORDERED_RULES;
	let orderedRulesInitialized = !options.requireOrderedRulesBeforeStart;
	let sandboxEnabled = options.sandboxEnabled ?? true;
	let policyChain = Promise.resolve();
	/** SDK 暂存路径对调用方不可见；状态查询仍必须暴露用户选择的逻辑路径。 */
	const logicalFilePathByFileId = /* @__PURE__ */ new Map();
	const sandbox = options.createSandboxService({
		onEngineReady: () => handlers.onEngineReady(),
		onUnexpectedExit: (info) => {
			logicalFilePathByFileId.clear();
			handlers.onUnexpectedExit(info);
		}
	});
	function getActive() {
		return degraded ? getFallback() : sandbox;
	}
	function getFallback() {
		if (!fallback) {
			fallback = options.createFallback({
				onEngineReady: () => handlers.onEngineReady(),
				onUnexpectedExit: (info) => {
					logicalFilePathByFileId.clear();
					handlers.onUnexpectedExit(info);
				}
			});
			fallback.setLifecycleHandlers?.(handlers);
		}
		return fallback;
	}
	function assertRulesInitialized() {
		if (!orderedRulesInitialized) throw new require_tencent_docs_prompt_selection.EditorSdkAccessDeniedError("editor sdk sandbox ordered rules are not initialized");
	}
	function getEffectivePolicy() {
		return sandboxEnabled ? {
			mode: "ordered",
			rules: {
				file: orderedRules.file.rules,
				command: orderedRules.command.rules,
				network: orderedRules.network.rules
			}
		} : { mode: "global-allow" };
	}
	function enqueuePolicySync() {
		const next = policyChain.then(() => options.syncExecutionPolicy(getEffectivePolicy()), () => options.syncExecutionPolicy(getEffectivePolicy()));
		policyChain = next.then(() => void 0, () => void 0);
		return next;
	}
	async function ensureStarted() {
		assertRulesInitialized();
		await options.prepareRuntime?.();
		if (degraded) return getFallback().ensureStarted();
		try {
			await sandbox.ensureStarted();
		} catch (error) {
			if (require_tencent_docs_prompt_selection.isEditorSdkAccessDeniedError(error)) throw error;
			options.logger?.warn(`[EditorSdkSandbox] sandbox ensureStarted failed, degrading to direct engine: ${error instanceof Error ? error.message : String(error)}`);
			degraded = true;
			logicalFilePathByFileId.clear();
			await sandbox.dispose().catch(() => void 0);
			return getFallback().ensureStarted();
		}
	}
	function remapEditorStatusFilePaths(result) {
		if (!result.openEditors?.length) return result;
		return {
			...result,
			openEditors: result.openEditors.map((editor) => ({
				...editor,
				file_path: logicalFilePathByFileId.get(editor.file_id) ?? editor.file_path
			}))
		};
	}
	async function saveEditorViaStaging(fileId, saveOptions) {
		const targetFilePath = saveOptions?.filePath;
		if (!targetFilePath || !options.saveStagingDir || !sandboxEnabled || degraded) return getActive().saveEditor(fileId, saveOptions);
		await (0, node_fs_promises.mkdir)(options.saveStagingDir, { recursive: true });
		const extension = node_path.extname(targetFilePath);
		const stagingFilePath = node_path.join(options.saveStagingDir, `${(0, node_crypto.randomUUID)()}${extension}`);
		const result = await getActive().saveEditor(fileId, {
			...saveOptions,
			filePath: stagingFilePath
		});
		if (!result.success) {
			await (0, node_fs_promises.rm)(stagingFilePath, { force: true }).catch(() => void 0);
			return result;
		}
		try {
			if ((await replaceStagedSaveFile(stagingFilePath, targetFilePath)).usedNonAtomicFallback) options.logger?.warn("[EditorSdkSandbox] Windows target was busy; used direct overwrite fallback", {
				fileId,
				targetFilePath
			});
			await (0, node_fs_promises.rm)(stagingFilePath, { force: true }).catch(() => void 0);
			logicalFilePathByFileId.set(fileId, targetFilePath);
			return {
				...result,
				filePath: targetFilePath
			};
		} catch (error) {
			await (0, node_fs_promises.rm)(stagingFilePath, { force: true }).catch(() => void 0);
			const message = error instanceof Error ? error.message : String(error);
			options.logger?.warn("[EditorSdkSandbox] atomic replace after staged save failed", {
				fileId,
				targetFilePath,
				stagingFilePath,
				error: message
			});
			return {
				...result,
				success: false,
				filePath: targetFilePath,
				error: message,
				message
			};
		}
	}
	return {
		setLifecycleHandlers(next) {
			handlers = next;
			fallback?.setLifecycleHandlers?.(next);
		},
		setSandboxEnabled: async (enabled) => {
			if (sandboxEnabled === enabled) return;
			sandboxEnabled = enabled;
			await enqueuePolicySync();
		},
		syncOrderedRules: async (rules) => {
			orderedRules = cloneOrderedRules(rules);
			orderedRulesInitialized = true;
			await enqueuePolicySync();
		},
		canEnsureStart: async () => {
			if (!orderedRulesInitialized) return false;
			return getActive().canEnsureStart();
		},
		isStarted: () => getActive().isStarted(),
		getPort: () => getActive().getPort(),
		ensureStarted,
		restartWithStaticDir: async (staticDir, editorSdkPath) => {
			assertRulesInitialized();
			await options.prepareRuntime?.();
			logicalFilePathByFileId.clear();
			return getActive().restartWithStaticDir(staticDir, editorSdkPath);
		},
		getPreviewUrl: async (filePath, opts) => {
			await ensureStarted();
			const active = getActive();
			const previewLogContext = {
				filePath,
				mode: opts?.mode,
				sandboxEnabled,
				degraded,
				port: active.getPort?.()
			};
			options.logger?.info("[EditorSdkSandbox] reapplying execution policy before preview open", previewLogContext);
			await enqueuePolicySync();
			try {
				const result = await active.getPreviewUrl(filePath, opts);
				options.logger?.info("[EditorSdkSandbox] preview URL resolved", {
					...previewLogContext,
					hasUrl: Boolean(result)
				});
				return result;
			} catch (error) {
				options.logger?.warn("[EditorSdkSandbox] preview URL failed", {
					...previewLogContext,
					error: error instanceof Error ? error.message : String(error)
				});
				throw error;
			}
		},
		getEditorStatusByFilePath: async (filePath) => {
			const mappedFileId = [...logicalFilePathByFileId.entries()].find(([, logicalFilePath]) => node_path.resolve(logicalFilePath) === node_path.resolve(filePath))?.[0];
			return remapEditorStatusFilePaths(mappedFileId ? await getActive().getEditorStatusByFileId(mappedFileId) : await getActive().getEditorStatusByFilePath(filePath));
		},
		getEditorStatusByFileId: async (fileId) => remapEditorStatusFilePaths(await getActive().getEditorStatusByFileId(fileId)),
		saveEditor: async (fileId, saveOptions = {}) => {
			const result = await saveEditorViaStaging(fileId, saveOptions);
			return result.success && saveOptions.filePath && !result.filePath ? {
				...result,
				filePath: saveOptions.filePath
			} : result;
		},
		closeEditor: async (fileId, closeOptions) => {
			const rawResult = await getActive().closeEditor(fileId, closeOptions);
			const result = require_tencent_docs_prompt_selection.isEditorSdkNoEditorOpenResult(rawResult) ? {
				...rawResult,
				success: true,
				notFound: true
			} : rawResult;
			if (result.success || result.notFound) logicalFilePathByFileId.delete(fileId);
			return result;
		},
		dispose: async () => {
			logicalFilePathByFileId.clear();
			await sandbox.dispose().catch(() => void 0);
			await fallback?.dispose().catch(() => void 0);
		}
	};
}
function cloneOrderedRules(rules) {
	return {
		file: {
			...rules.file,
			rules: rules.file.rules.map((rule) => ({ ...rule }))
		},
		command: {
			...rules.command,
			rules: rules.command.rules.map((rule) => ({
				...rule,
				prefix: [...rule.prefix]
			}))
		},
		network: {
			...rules.network,
			rules: rules.network.rules.map((rule) => ({ ...rule }))
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs/local-docs-release-bridge.ts
function createLocalDocsReleaseBridgeFromFacade(facade) {
	return {
		releaseContext: (documentResourceUri, options) => facade.releaseContext(documentResourceUri, options),
		releaseContextIfClean: (documentResourceUri, options) => facade.releaseContextIfClean(documentResourceUri, options),
		saveContext: (documentResourceUri, options) => facade.saveContext(documentResourceUri, options)
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/channel-config.ts
var NATIVE_RUNTIME_BASE_URL_DOMESTIC = "https://static.workbuddy.cn/browser-computer-use/v1/";
var NATIVE_RUNTIME_BASE_URL_OVERSEA = "https://download.codebuddy.ai/browser-computer-use/v1/";
var NATIVE_RUNTIME_LOCAL_CONFIG_FILE = "native-runtime.json";
/**
* 地址来源：本地 `<configDir>/native-runtime.json` → 构建期烤进包里的 `buildBaseUrl`（内测包指向分支目录）
* → 云端 `nativeRuntime.baseUrl` → 按海外 / 国内的硬编码兜底。专享版私有化（`privateHost` 存在）且云端
* 没给地址时返回空，频道不可用。
*/
async function resolveNativeRuntimeChannelConfig(options) {
	const local = await readLocalConfig((0, node_path.join)(options.configDir, NATIVE_RUNTIME_LOCAL_CONFIG_FILE));
	if (local?.baseUrl) return {
		baseUrl: withTrailingSlash(local.baseUrl),
		verifySignatures: local.verifySignatures ?? true,
		source: "local"
	};
	const buildBaseUrl = options.buildBaseUrl?.trim();
	if (buildBaseUrl) return {
		baseUrl: withTrailingSlash(buildBaseUrl),
		verifySignatures: true,
		source: "build"
	};
	const product = options.productConfiguration;
	const cloudBaseUrl = product?.nativeRuntime?.baseUrl?.trim();
	if (cloudBaseUrl) return {
		baseUrl: withTrailingSlash(cloudBaseUrl),
		verifySignatures: true,
		source: "cloud"
	};
	if (product?.privateHost) return;
	return {
		baseUrl: product?.isOversea ? NATIVE_RUNTIME_BASE_URL_OVERSEA : NATIVE_RUNTIME_BASE_URL_DOMESTIC,
		verifySignatures: true,
		source: "default"
	};
}
async function readLocalConfig(path) {
	try {
		const parsed = JSON.parse(await node_fs.promises.readFile(path, "utf8"));
		return {
			...typeof parsed.baseUrl === "string" && parsed.baseUrl.trim() ? { baseUrl: parsed.baseUrl.trim() } : {},
			...typeof parsed.verifySignatures === "boolean" ? { verifySignatures: parsed.verifySignatures } : {}
		};
	} catch {
		return;
	}
}
function withTrailingSlash(url) {
	return url.endsWith("/") ? url : `${url}/`;
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/feature-gate.ts
require_code_cache.init_common$3();
var NATIVE_RUNTIME_PRODUCT_FEATURES = {
	"browser-use": require_code_cache.ProductFeature.BrowserUse,
	"computer-use": require_code_cache.ProductFeature.ComputerUse
};
function createNativeRuntimeFeatureGate(options) {
	const listeners = /* @__PURE__ */ new Set();
	let disposed = false;
	const read = (plugin) => !disposed && options.isSupported?.(plugin) !== false && options.getProductFeatures()?.[NATIVE_RUNTIME_PRODUCT_FEATURES[plugin]] === true;
	let snapshot = require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.map(read);
	const refresh = () => {
		if (disposed) return;
		const next = require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.map(read);
		const changed = next.some((allowed, index) => allowed !== snapshot[index]);
		snapshot = next;
		if (changed) for (const listener of listeners) listener();
	};
	const subscription = options.onProductChanged(refresh);
	return {
		isAllowed: read,
		refresh,
		onDidChange(listener) {
			listeners.add(listener);
			return { dispose: () => listeners.delete(listener) };
		},
		dispose() {
			disposed = true;
			subscription?.dispose();
			listeners.clear();
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/plugin-version.ts
var import_semver = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_code_cache.require_semver());
/**
* 原生运行时插件的版本号：`<major>.<minor>.<patch>` + 可选的第四段**构建标识**。
*
* Computer Use 用四段 `<上游 release>.<上游 commit 短号>`（如 `0.0.2.0278524f`）：优图交付的三段
* 版本号常常原地不动（同一个 `0.0.2` 反复交付新构建），第四段说清「到底是哪一份上游构建」，
* 完整的 commit 与 build-time 在随插件下发的 `VERSION.txt` 里。Browser Use 现编，三段就够。
*
* 第四段是**标识不是序号**：比大小只看前三段。要不要换版由 feed 条目的 sha256 决定
*（见 `service.ts` 的 `syncPlugin`），版本号不参与那个判断。
*
* 这里不能用 semver：`semver.valid('0.0.2.0278524f')` 是 null，而 `semver.coerce` 会把第四段
* 悄悄吃掉。主端版本区间（`minAppVersion` / `maxAppVersion`）仍是 semver，另走 `semver`。
*/
var PLUGIN_VERSION = /^(\d+)\.(\d+)\.(\d+)(?:\.[0-9a-f]{7,40})?$/;
function isPluginVersion(value) {
	return typeof value === "string" && PLUGIN_VERSION.test(value);
}
/** 只比前三段；非法（含缺失）的版本号一律不达标：读不出版本的安装当作不可用，走重装。 */
function isPluginVersionAtLeast(version, floor) {
	const left = release(version);
	const right = release(floor);
	if (!left || !right) return false;
	for (let index = 0; index < left.length; index += 1) if (left[index] !== right[index]) return left[index] > right[index];
	return true;
}
function release(version) {
	const matched = typeof version === "string" ? PLUGIN_VERSION.exec(version) : null;
	return matched ? [
		Number(matched[1]),
		Number(matched[2]),
		Number(matched[3])
	] : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/feed.ts
var NATIVE_RUNTIME_FEED_FILE = "version.json";
var NATIVE_RUNTIME_PLATFORM_KEYS = [
	"darwin-arm64",
	"darwin-x64",
	"win32-x64"
];
/** 两个插件当作两个各自 track 版本的东西：CDN 上各占一个目录，各自一份 `<baseUrl><plugin>/version.json`。 */
function resolveNativeRuntimeFeedUrl(baseUrl, plugin) {
	return `${baseUrl}${plugin}/${NATIVE_RUNTIME_FEED_FILE}`;
}
function resolveNativeRuntimePlatformKey(platform, arch) {
	const key = `${platform}-${arch}`;
	return NATIVE_RUNTIME_PLATFORM_KEYS.includes(key) ? key : void 0;
}
/**
* 文件必须自报 `plugin` 且与调用方要的一致：拿错目录的 feed 直接拒绝，不会把 A 的 zip 装成 B。
* 未知平台键静默忽略：新平台先上 feed 不会打挂老客户端。
*/
function parseNativeRuntimeFeed(value, plugin) {
	const record = asRecord$1(value);
	if (record?.schema !== 1 || !asRecord$1(record.platforms)) throw new Error("version.json must have schema 1 and a platforms object");
	if (record.plugin !== plugin) throw new Error(`version.json is for ${String(record.plugin)}, expected ${plugin}`);
	const platforms = {};
	for (const key of NATIVE_RUNTIME_PLATFORM_KEYS) {
		const entries = record.platforms[key];
		if (entries === void 0) continue;
		if (!Array.isArray(entries)) throw new Error(`version.json platforms.${key} must be an array`);
		platforms[key] = entries.map((entry, index) => parseEntry(entry, `${key}[${index}]`));
	}
	return {
		schema: 1,
		plugin,
		platforms
	};
}
/**
* 列表新的在前；取第一条主端版本落在 `[minAppVersion, maxAppVersion)` 里的。
* 选中的与已装的不同就换，不比大小 —— 把旧条目放回列表头就是回滚。
*/
function selectNativeRuntimeFeedEntry(feed, platform, appVersion) {
	const version = import_semver.coerce(appVersion);
	if (!version) return;
	return feed.platforms[platform]?.find((entry) => import_semver.gte(version, entry.minAppVersion) && (entry.maxAppVersion === void 0 || import_semver.lt(version, entry.maxAppVersion)));
}
function parseEntry(value, label) {
	const entry = asRecord$1(value);
	if (!entry) throw new Error(`version.json ${label} must be an object`);
	const { version, minAppVersion, maxAppVersion, url, sha256, size, publishedAt } = entry;
	if (!isPluginVersion(version)) throw new Error(`version.json ${label} needs an x.y.z plugin version, optionally with a commit-id segment`);
	if (!isSemver(minAppVersion) || maxAppVersion !== void 0 && !isSemver(maxAppVersion)) throw new Error(`version.json ${label} has an invalid app version bound`);
	if (typeof url !== "string" || !url || typeof sha256 !== "string" || !/^[0-9a-f]{64}$/i.test(sha256)) throw new Error(`version.json ${label} needs url and sha256`);
	return {
		version,
		minAppVersion,
		...maxAppVersion !== void 0 ? { maxAppVersion } : {},
		url,
		sha256: sha256.toLowerCase(),
		...typeof size === "number" ? { size } : {},
		...typeof publishedAt === "string" ? { publishedAt } : {}
	};
}
function isSemver(value) {
	return typeof value === "string" && import_semver.valid(value) !== null;
}
function asRecord$1(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/http.ts
var import_adm_zip = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_adm_zip$1.require_adm_zip());
var MAX_REDIRECTS = 5;
/** GET 一个完整响应体；带 `etag` 时发 `If-None-Match`，命中返回 304 与空 buffer。 */
async function fetchBuffer(url, options = {}) {
	return fetchWithRedirects(url, options, 0);
}
async function fetchWithRedirects(url, options, redirects) {
	const { agent, proxy } = await require_proxy_agents.getPacAwareNodeAgentForUrl(url);
	const startedAt = Date.now();
	const source = options.source ?? "NativeRuntime";
	return new Promise((resolve, reject) => {
		const parsed = new URL(url);
		const request = (parsed.protocol === "https:" ? node_https : node_http).request({
			method: "GET",
			protocol: parsed.protocol,
			hostname: parsed.hostname,
			port: parsed.port || void 0,
			path: parsed.pathname + parsed.search,
			headers: {
				"User-Agent": "WorkBuddy-NativeRuntime",
				...options.etag ? { "If-None-Match": `"${options.etag}"` } : {}
			},
			...agent ? { agent } : {}
		}, (response) => {
			const status = response.statusCode ?? 0;
			if (status >= 300 && status < 400 && response.headers.location && redirects < MAX_REDIRECTS) {
				response.resume();
				fetchWithRedirects(new URL(response.headers.location, url).toString(), options, redirects + 1).then(resolve, reject);
				return;
			}
			const etag = normalizeEtag(response.headers.etag);
			if (status === 304) {
				response.resume();
				require_proxy_agents.logNetRequest({
					method: "GET",
					url,
					proxy,
					status,
					durationMs: Date.now() - startedAt,
					source
				});
				resolve({
					status,
					buffer: Buffer.alloc(0),
					...etag ? { etag } : {}
				});
				return;
			}
			const chunks = [];
			response.on("data", (chunk) => chunks.push(chunk));
			response.on("error", reject);
			response.on("end", () => {
				const buffer = Buffer.concat(chunks);
				if (status < 200 || status >= 300) {
					const error = /* @__PURE__ */ new Error(`HTTP ${status} for ${parsed.pathname}`);
					require_proxy_agents.logNetRequest({
						method: "GET",
						url,
						proxy,
						status,
						durationMs: Date.now() - startedAt,
						error,
						source
					});
					reject(error);
					return;
				}
				require_proxy_agents.logNetRequest({
					method: "GET",
					url,
					proxy,
					status,
					durationMs: Date.now() - startedAt,
					source
				});
				resolve({
					status,
					buffer,
					...etag ? { etag } : {}
				});
			});
		});
		request.setTimeout(options.timeoutMs ?? 12e4, () => {
			request.destroy(/* @__PURE__ */ new Error(`request timed out: ${parsed.pathname}`));
		});
		request.on("error", (error) => {
			require_proxy_agents.logNetRequest({
				method: "GET",
				url,
				proxy,
				durationMs: Date.now() - startedAt,
				error,
				source
			});
			reject(error);
		});
		request.end();
	});
}
function normalizeEtag(raw) {
	const value = (Array.isArray(raw) ? raw[0] : raw)?.trim();
	if (!value) return;
	return value.replace(/^W\//i, "").replace(/^"|"$/g, "") || void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/archive.ts
async function downloadNativeRuntimeArchive(source) {
	const { buffer } = await fetchBuffer(source.url, { timeoutMs: 6e5 });
	const digest = (0, node_crypto.createHash)("sha256").update(buffer).digest("hex");
	if (digest !== source.sha256) throw new Error(`archive digest mismatch: expected ${source.sha256.slice(0, 12)}…, got ${digest.slice(0, 12)}…`);
	return buffer;
}
/** 解压到 `targetDir`（须不存在或为空），保留 zip 里的可执行位。 */
async function extractNativeRuntimeArchive(buffer, targetDir) {
	await node_fs.promises.mkdir(targetDir, { recursive: true });
	const zip = new import_adm_zip.default(buffer);
	for (const entry of zip.getEntries()) if (entry.entryName.includes("..") || entry.entryName.startsWith("/")) throw new Error(`archive entry escapes the marketplace directory: ${entry.entryName}`);
	await zip.extractAllToAsync(targetDir, true, true);
}
/** 校验一插件市场的固定布局：`marketplace.json` 只列这一个插件，与 `plugin.json` 的名字 / 版本一致。 */
async function readNativeRuntimeMarketplaceLayout(dir, plugin) {
	const marketplaceName = require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin];
	const manifest = JSON.parse(await node_fs.promises.readFile((0, node_path.join)(dir, ".codebuddy-plugin", "marketplace.json"), "utf8"));
	if (manifest.name !== marketplaceName) throw new Error(`marketplace.json is ${String(manifest.name)}, expected ${marketplaceName}`);
	const entries = Array.isArray(manifest.plugins) ? manifest.plugins : [];
	const entry = entries[0];
	if (entries.length !== 1 || !entry || entry.name !== plugin || typeof entry.version !== "string") throw new Error(`marketplace.json of ${marketplaceName} must list exactly the ${plugin} plugin with a version`);
	const root = (0, node_path.join)(dir, plugin);
	const pluginManifest = JSON.parse(await node_fs.promises.readFile((0, node_path.join)(root, ".codebuddy-plugin", "plugin.json"), "utf8"));
	if (pluginManifest.name !== plugin || pluginManifest.version !== entry.version) throw new Error(`plugin.json of ${plugin} disagrees with marketplace.json`);
	await node_fs.promises.access((0, node_path.join)(root, ".mcp.json"));
	return {
		marketplaceName,
		version: entry.version,
		root
	};
}
/** 原子替换市场目录：旧目录先挪到一边，新目录 rename 就位，最后尽力删掉旧的。 */
async function replaceDirectory(targetDir, stagedDir) {
	const backup = `${targetDir}.old-${process.pid}-${Date.now()}`;
	let hadPrevious = true;
	try {
		await node_fs.promises.rename(targetDir, backup);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
		hadPrevious = false;
	}
	try {
		await node_fs.promises.rename(stagedDir, targetDir);
	} catch (error) {
		if (hadPrevious) await node_fs.promises.rename(backup, targetDir).catch(() => void 0);
		throw error;
	}
	if (hadPrevious) await node_fs.promises.rm(backup, {
		recursive: true,
		force: true
	}).catch(() => void 0);
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/installed-plugins.ts
/** 只读两个原生插件的安装快照。市场源目录不代表已安装，不能作为缺失缓存的兜底。 */
async function readInstalledNativeRuntimePlugins(configDir, logger) {
	const [registry, settings] = await Promise.all([readObject((0, node_path.join)(configDir, "plugins", "installed_plugins.json"), logger), readObject((0, node_path.join)(configDir, "settings.json"), logger)]);
	const records = asRecord(registry.plugins);
	const enabled = asRecord(settings.enabledPlugins);
	const installed = /* @__PURE__ */ new Map();
	for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
		const marketplaceName = require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin];
		const pluginId = `${plugin}@${marketplaceName}`;
		const record = await require_server.selectDaemonPluginCacheRecord(configDir, pluginId, require_server.toInstalledRecords(records[pluginId]), (0, node_path.resolve)(configDir, "plugins", "cache"));
		if (!record?.installPath) continue;
		const manifest = await readObject((0, node_path.join)(record.installPath, ".codebuddy-plugin", "plugin.json"), logger);
		const version = record.resolvedVersion || record.version;
		if (manifest.name !== plugin || manifest.version !== version) {
			logger.warn(`[NativeRuntime] ignoring invalid installed snapshot for ${pluginId}`);
			continue;
		}
		installed.set(plugin, {
			name: plugin,
			marketplaceName,
			installedPath: record.installPath,
			version,
			status: enabled[pluginId] === true ? "enabled" : "disabled"
		});
	}
	return installed;
}
function asRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value) ? value : {};
}
async function readObject(filePath, logger) {
	try {
		return asRecord(require_server.parseJsonc(await (0, node_fs_promises.readFile)(filePath, "utf8")));
	} catch (error) {
		if (error.code !== "ENOENT") logger.warn(`[NativeRuntime] failed to read ${filePath}:`, error);
		return {};
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/signature.ts
var execFileAsync = (0, node_util.promisify)(node_child_process.execFile);
var MACHO_MAGICS = /* @__PURE__ */ new Set([
	4277009102,
	4277009103,
	3472551422,
	3489328638,
	3405691582,
	3199925962
]);
/**
* 逐个校验插件 `bin/` 下的可执行文件：darwin 走 `codesign --verify --strict` 并钉死 TeamIdentifier，
* win32 走 Authenticode。信任根是平台证书链，不是 manifest 里自报的 digest。
*/
async function verifyNativeRuntimeSignatures(pluginRoots, policy) {
	for (const root of pluginRoots) {
		const binRoot = (0, node_path.join)(root, "bin");
		const entries = await node_fs.promises.readdir(binRoot, { withFileTypes: true }).catch(() => []);
		for (const entry of entries) {
			const target = (0, node_path.join)(binRoot, entry.name);
			if (policy.platform === "darwin") {
				if (entry.isDirectory() && entry.name.endsWith(".app")) await verifyCodesign(target, policy.teamId ?? "FN2V63AD2J", true);
				else if (entry.isFile() && await isMachO(target)) await verifyCodesign(target, policy.teamId ?? "FN2V63AD2J", false);
			} else if (policy.platform === "win32" && entry.isFile() && /\.(exe|dll)$/i.test(entry.name)) await verifyAuthenticode(target);
		}
	}
}
async function verifyCodesign(target, teamId, deep) {
	await execFileAsync("/usr/bin/codesign", [
		"--verify",
		"--strict",
		...deep ? ["--deep"] : [],
		"--verbose=2",
		target
	]).catch((error) => {
		throw new Error(`codesign rejected ${target}: ${error.stderr?.trim() || "invalid signature"}`);
	});
	const { stderr } = await execFileAsync("/usr/bin/codesign", [
		"-dv",
		"--verbose=4",
		target
	]);
	const signedTeam = /TeamIdentifier=([A-Z0-9]+)/.exec(stderr)?.[1];
	if (signedTeam !== teamId) throw new Error(`${target} is signed by team ${signedTeam ?? "none"}, expected ${teamId}`);
}
async function verifyAuthenticode(target) {
	const { stdout } = await execFileAsync("powershell.exe", [
		"-NoProfile",
		"-NonInteractive",
		"-Command",
		`$s = Get-AuthenticodeSignature -LiteralPath '${target.replace(/'/g, "''")}'; "\$(\$s.Status)|\$(\$s.SignerCertificate.Subject)"`
	]);
	const [status, subject = ""] = stdout.trim().split("|");
	if (status !== "Valid" || !/Tencent/i.test(subject)) throw new Error(`Authenticode rejected ${target}: status=${status} subject=${subject}`);
}
async function isMachO(file) {
	const handle = await node_fs.promises.open(file, "r");
	try {
		const header = Buffer.alloc(4);
		const { bytesRead } = await handle.read(header, 0, 4, 0);
		return bytesRead === 4 && MACHO_MAGICS.has(header.readUInt32BE(0));
	} finally {
		await handle.close();
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/service.ts
var STARTUP_DELAY_MS = 18e4;
var STARTUP_JITTER_MS = 42e4;
var PROBE_INTERVAL_MS = 216e5;
var PROBE_JITTER_RATIO = .2;
var RETRY_BASE_MS = 6e4;
var RETRY_MAX_MS = 36e5;
var STATE_DIR = "native-runtimes";
var STATE_FILE = "state.json";
/**
* 两个原生运行时插件的探测 / 下载 / 安装 / 更新。每个插件是一个独立的一插件目录市场
* （`<configDir>/native-runtimes/<plugin>/`），各探测自己的 `<plugin>/version.json`，独立发布、独立更新。
*/
var NativeRuntimeService = class {
	constructor(deps) {
		this.deps = deps;
		this.listeners = /* @__PURE__ */ new Set();
		this.transient = /* @__PURE__ */ new Map();
		this.registered = /* @__PURE__ */ new Set();
		this.state = {};
		this.syncChain = Promise.resolve();
		this.syncing = 0;
		this.consecutiveFailures = 0;
		this.disposed = false;
		this.root = (0, node_path.join)(deps.configDir, STATE_DIR);
		this.statePath = (0, node_path.join)(this.root, STATE_FILE);
		this.platformKey = resolveNativeRuntimePlatformKey(deps.platform, deps.arch);
	}
	onChanged(listener) {
		this.listeners.add(listener);
		return { dispose: () => this.listeners.delete(listener) };
	}
	async start() {
		await this.loadState();
		if (!this.platformKey) {
			this.deps.logger.info(`[NativeRuntime] platform ${this.deps.platform}-${this.deps.arch} is not delivered`);
			return;
		}
		this.gateSubscription = this.deps.featureGate.onDidChange(() => {
			this.onFeatureGateChanged().catch((error) => {
				this.deps.logger.warn(`[NativeRuntime] feature gate change failed: ${describeError(error)}`);
			});
		});
		const installed = await this.installedPlugins();
		await this.activateHosts(installed);
		const wanted = this.wantsProbe(installed);
		if (wanted) this.schedule(STARTUP_DELAY_MS + this.random() * STARTUP_JITTER_MS);
		const marketplaces = require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.map((plugin) => `${plugin}@${this.state.marketplaces?.[plugin]?.version ?? "none"}`).join(",");
		this.deps.logger.info(`[NativeRuntime] start platform=${this.platformKey} installed=${[...installed.keys()].join(",") || "none"} marketplaces=${marketplaces} probe=${wanted}`);
	}
	dispose() {
		this.disposed = true;
		clearTimeout(this.timer);
		this.timer = void 0;
		this.gateSubscription?.dispose();
		this.gateSubscription = void 0;
		this.deps.featureGate.dispose();
		this.listeners.clear();
	}
	async getStatus() {
		return this.buildStatus(await this.installedPlugins());
	}
	async install(plugin) {
		if (!this.allowed(plugin)) {
			this.deps.logger.warn(`[NativeRuntime] install ${plugin} refused: product feature disabled`);
			return this.getStatus();
		}
		this.transient.set(plugin, { state: "installing" });
		await this.emit();
		try {
			if (!await this.marketplaceReady(plugin)) {
				const result = await this.sync({
					force: true,
					only: plugin
				});
				if (!await this.marketplaceReady(plugin)) throw new Error(this.describeUnavailable(result, plugin));
			}
			if (!this.allowed(plugin)) {
				this.transient.delete(plugin);
				return this.emit();
			}
			await this.ensureRegistered(plugin);
			const plugins = await this.deps.plugins;
			const marketplaceName = require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin];
			const result = (await this.installedPlugins()).has(plugin) ? await plugins.updatePlugin(plugin, marketplaceName) : await plugins.installPlugins([plugin], marketplaceName, "user");
			if (!result.success) throw new Error(result.error ?? "plugin install failed");
			if (!this.allowed(plugin)) {
				this.transient.delete(plugin);
				return this.emit();
			}
			await this.toggle(plugin, true);
			this.transient.delete(plugin);
			this.report("install", {
				plugin,
				outcome: "ok"
			});
			await this.activateHosts(await this.installedPlugins(), plugin);
		} catch (error) {
			const message = describeError(error);
			this.transient.set(plugin, {
				state: "failed",
				error: message
			});
			this.report("install", {
				plugin,
				outcome: "failed"
			});
			this.deps.logger.warn(`[NativeRuntime] install ${plugin} failed: ${message}`);
		}
		return this.emit();
	}
	async setEnabled(plugin, enabled) {
		if (enabled && !this.allowed(plugin)) {
			this.deps.logger.warn(`[NativeRuntime] enable ${plugin} refused: product feature disabled`);
			return this.getStatus();
		}
		try {
			await this.toggle(plugin, enabled);
			this.transient.delete(plugin);
			if (enabled) await this.activateHosts(await this.installedPlugins(), plugin);
		} catch (error) {
			this.transient.set(plugin, {
				state: "failed",
				error: describeError(error)
			});
		}
		return this.emit();
	}
	async checkForUpdates() {
		await this.runProbe({ force: true });
		return this.emit();
	}
	/** 产品开关已开启、已安装、已启用且满足主端最低版本时返回插件安装快照目录与版本。 */
	async getInstalledRuntime(plugin) {
		if (!this.allowed(plugin)) return;
		const record = (await this.installedPlugins()).get(plugin);
		return this.allowed(plugin) && record && this.isUsable(record) && record.status === "enabled" && record.installedPath ? {
			pluginRoot: record.installedPath,
			version: record.version ?? "0.0.0"
		} : void 0;
	}
	/** 产品开关是否放开该插件；缺省关闭，读取 ProductManager 的当前产品配置。 */
	allowed(plugin) {
		return this.deps.featureGate.isAllowed(plugin);
	}
	hasMigratedLegacyToggle(plugin) {
		return this.state.legacyMigrated === true || this.state.legacyMigratedPlugins?.includes(plugin) === true;
	}
	/** 有没有值得探测的插件：装过的、或旧开关待迁移的，且都得先命中产品开关。 */
	wantsProbe(installed) {
		return require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.some((plugin) => this.allowed(plugin) && (installed.has(plugin) || !this.hasMigratedLegacyToggle(plugin) && this.deps.legacyToggle(plugin)));
	}
	/**
	* 产品开关结论变化。**只做补票，不做撤销**：新放开的插件要把启动时跳过的宿主激活补上、
	* 并按需排一轮探测；新关掉的插件不必在这里动手 —— `getInstalledRuntime()` 已经不给运行时，
	* 下一次会话投影自然就没有那条 MCP 了。
	*/
	async onFeatureGateChanged() {
		if (this.disposed) return;
		const installed = await this.installedPlugins();
		await this.activateHosts(installed);
		if (!this.timer && this.wantsProbe(installed)) this.schedule(STARTUP_DELAY_MS + this.random() * STARTUP_JITTER_MS);
		await this.emit();
	}
	async runProbe(options = {}) {
		this.deps.featureGate.refresh();
		let result;
		try {
			result = await this.sync(options);
		} catch (error) {
			this.deps.logger.warn(`[NativeRuntime] probe failed: ${describeError(error)}`);
			this.report("probe", { outcome: "error" });
			this.scheduleRetry();
			return;
		}
		for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
			const outcome = result.plugins[plugin];
			if (outcome) this.report("probe", {
				plugin,
				outcome: outcome.outcome
			});
		}
		this.deps.logger.info(`[NativeRuntime] probe channel=${result.channel} ` + require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.map((plugin) => `${plugin}=${result.plugins[plugin]?.outcome ?? "skipped"}`).join(" "));
		if (result.channel === "ok") await this.settleInstalled();
		if (Object.values(result.plugins).some((item) => item.outcome === "failed")) {
			this.scheduleRetry();
			return;
		}
		this.consecutiveFailures = 0;
		this.schedule(PROBE_INTERVAL_MS * (1 + (this.random() * 2 - 1) * PROBE_JITTER_RATIO));
	}
	/** 旧开关迁移 + 过旧安装重装：市场就位的插件每轮探测过一遍。 */
	async settleInstalled() {
		const installed = await this.installedPlugins();
		for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
			if (!this.allowed(plugin) || !await this.marketplaceReady(plugin)) continue;
			const record = installed.get(plugin);
			const wanted = record ? !this.isUsable(record) : !this.hasMigratedLegacyToggle(plugin) && this.deps.legacyToggle(plugin);
			if (wanted) await this.install(plugin);
			if (!this.hasMigratedLegacyToggle(plugin) && (!wanted || (await this.installedPlugins()).has(plugin))) this.state.legacyMigratedPlugins = [...this.state.legacyMigratedPlugins ?? [], plugin];
		}
		if (!this.state.legacyMigrated) {
			this.state.legacyMigrated = require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.every((plugin) => this.hasMigratedLegacyToggle(plugin));
			await this.saveState();
		}
	}
	/** 所有同步串行：定时探测和两个「安装」可能同时到，不让同一个插件的市场目录被两边同时替换。 */
	sync(options) {
		this.syncing += 1;
		const run = this.syncChain.then(() => this.syncOnce(options)).finally(() => {
			this.syncing -= 1;
		});
		this.syncChain = run.catch(() => void 0);
		return run;
	}
	/** 每个插件各拉自己的 feed、各自比对、各自换目录；一个插件的 feed 坏了或下载失败不影响另一个。 */
	async syncOnce(options) {
		const platformKey = this.platformKey;
		if (!platformKey) return {
			channel: "unsupported",
			plugins: {}
		};
		await this.loadState();
		const channel = await resolveNativeRuntimeChannelConfig({
			configDir: this.deps.configDir,
			productConfiguration: this.deps.getProductConfiguration(),
			...this.deps.buildBaseUrl ? { buildBaseUrl: this.deps.buildBaseUrl } : {}
		});
		if (!channel) return {
			channel: "unavailable",
			plugins: {}
		};
		const result = {
			channel: "ok",
			plugins: {}
		};
		for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
			if (options.only && plugin !== options.only) continue;
			if (!this.allowed(plugin)) continue;
			result.plugins[plugin] = await this.syncPlugin(plugin, channel, platformKey, options.force === true);
		}
		return result;
	}
	async syncPlugin(plugin, channel, platformKey, force) {
		try {
			const entry = selectNativeRuntimeFeedEntry(await this.fetchFeed(plugin, channel, force), platformKey, this.deps.appVersion);
			if (!entry) return { outcome: "no-entry" };
			if (this.state.marketplaces?.[plugin]?.sha256 === entry.sha256 && await this.marketplaceReady(plugin)) return { outcome: "current" };
			await this.materialize(plugin, channel, entry);
			return { outcome: "updated" };
		} catch (error) {
			const message = describeError(error);
			this.deps.logger.warn(`[NativeRuntime] ${plugin} sync failed: ${message}`);
			return {
				outcome: "failed",
				error: message
			};
		}
	}
	async fetchFeed(plugin, channel, force) {
		const url = resolveNativeRuntimeFeedUrl(channel.baseUrl, plugin);
		const cached = this.state.feeds?.[plugin];
		const response = await fetchBuffer(url, {
			etag: !force && cached ? cached.etag : void 0,
			timeoutMs: 3e4
		}).catch((error) => {
			const status = /^HTTP (403|404) /.exec(describeError(error))?.[1];
			throw status ? /* @__PURE__ */ new Error(`no version.json published for ${plugin} at ${url} (HTTP ${status})`) : error;
		});
		if (response.status === 304 && cached) return cached.feed;
		const feed = parseNativeRuntimeFeed(JSON.parse(response.buffer.toString("utf8")), plugin);
		this.state.feeds = {
			...this.state.feeds,
			[plugin]: {
				feed,
				...response.etag ? { etag: response.etag } : {}
			}
		};
		await this.saveState();
		return feed;
	}
	async materialize(plugin, channel, entry) {
		const startedAt = Date.now();
		const buffer = await downloadNativeRuntimeArchive({
			url: new URL(entry.url, resolveNativeRuntimeFeedUrl(channel.baseUrl, plugin)).toString(),
			sha256: entry.sha256
		});
		const staged = (0, node_path.join)(this.root, `.${plugin}-${process.pid}-${Date.now()}`);
		let version;
		try {
			await extractNativeRuntimeArchive(buffer, staged);
			const layout = await readNativeRuntimeMarketplaceLayout(staged, plugin);
			if (layout.version !== entry.version) throw new Error(`archive carries ${plugin} ${layout.version}, version.json says ${entry.version}`);
			if (channel.verifySignatures) await verifyNativeRuntimeSignatures([layout.root], { platform: this.deps.platform });
			version = layout.version;
			await replaceDirectory(this.marketplaceDir(plugin), staged);
		} catch (error) {
			await node_fs.promises.rm(staged, {
				recursive: true,
				force: true
			}).catch(() => void 0);
			this.report("download", {
				plugin,
				outcome: "failed"
			});
			throw error;
		}
		this.state.marketplaces = {
			...this.state.marketplaces,
			[plugin]: {
				sha256: entry.sha256,
				url: entry.url,
				version,
				installedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
		await this.saveState();
		this.registered.delete(plugin);
		this.report("download", {
			plugin,
			outcome: "ok",
			durationMs: String(Date.now() - startedAt)
		});
		this.deps.logger.info(`[NativeRuntime] ${plugin} ${version} (${entry.sha256.slice(0, 8)}) ready`);
		await this.ensureRegistered(plugin);
		await this.refreshInstalled(plugin, version);
		await this.emit();
	}
	/** 市场目录换新后让插件系统重新物化已装快照；manifest 没变（同版本重发）时按版本补 update。 */
	async refreshInstalled(plugin, version) {
		if (!(await this.installedPlugins()).has(plugin)) return;
		const plugins = await this.deps.plugins;
		const marketplaceName = require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin];
		const refreshed = await plugins.refreshPluginMarketplace(marketplaceName);
		if (!refreshed.success) throw new Error(refreshed.error ?? "marketplace refresh failed");
		const record = (await this.installedPlugins()).get(plugin);
		if (record && record.version !== version) {
			const updated = await plugins.updatePlugin(plugin, marketplaceName);
			if (!updated.success) throw new Error(updated.error ?? "plugin update failed");
		}
		await this.activateHosts(await this.installedPlugins(), plugin);
	}
	async ensureRegistered(plugin) {
		if (this.registered.has(plugin)) return;
		const result = await (await this.deps.plugins).addPluginMarketplace(this.marketplaceDir(plugin), require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin]);
		if (!result.success) throw new Error(result.error ?? "marketplace registration failed");
		this.registered.add(plugin);
	}
	async toggle(plugin, enabled) {
		const failed = (await (await this.deps.plugins).batchTogglePlugins({ items: [{
			pluginName: plugin,
			marketplaceName: require_handler_registry.NATIVE_RUNTIME_MARKETPLACE_NAMES[plugin],
			scope: "user",
			operation: enabled ? "enable" : "disable"
		}] })).failedPlugins[0];
		if (failed) throw new Error(failed.error);
	}
	async activateHosts(installed, only) {
		for (const [plugin, record] of installed) {
			if (only && plugin !== only) continue;
			const host = this.deps.hosts[plugin];
			if (!host || !this.allowed(plugin)) continue;
			if (!this.isUsable(record) || record.status !== "enabled" || !record.installedPath) continue;
			try {
				await host.activate({
					pluginRoot: record.installedPath,
					version: record.version ?? "0.0.0"
				});
			} catch (error) {
				this.deps.logger.warn(`[NativeRuntime] activate ${plugin} failed: ${describeError(error)}`);
			}
		}
	}
	installedPlugins() {
		return readInstalledNativeRuntimePlugins(this.deps.configDir, this.deps.logger);
	}
	isUsable(record) {
		return Boolean(record.installedPath && isPluginVersionAtLeast(record.version, require_handler_registry.MIN_RUNTIME_VERSION[record.name]));
	}
	buildStatus(installed) {
		const plugins = {};
		for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
			const record = installed.get(plugin);
			const transient = this.transient.get(plugin);
			const availableVersion = this.state.marketplaces?.[plugin]?.version;
			let status;
			if (!this.platformKey || !this.allowed(plugin)) status = {
				plugin,
				state: "unavailable",
				enabled: false
			};
			else if (transient) status = {
				plugin,
				state: transient.state,
				enabled: record?.status === "enabled",
				error: transient.error
			};
			else if (record && this.isUsable(record)) status = {
				plugin,
				state: "installed",
				enabled: record.status === "enabled",
				installedVersion: record.version
			};
			else if (record) status = {
				plugin,
				state: "not-installed",
				enabled: false,
				installedVersion: record.version,
				error: `installed ${record.version ?? "unknown"} is below ${require_handler_registry.MIN_RUNTIME_VERSION[plugin]}`
			};
			else status = {
				plugin,
				state: "not-installed",
				enabled: false
			};
			plugins[plugin] = availableVersion ? {
				...status,
				availableVersion
			} : status;
		}
		return {
			...this.platformKey ? { platform: this.platformKey } : {},
			syncing: this.syncing > 0,
			plugins
		};
	}
	marketplaceDir(plugin) {
		return (0, node_path.join)(this.root, plugin);
	}
	async marketplaceReady(plugin) {
		if (!this.state.marketplaces?.[plugin]) return false;
		try {
			await node_fs.promises.access((0, node_path.join)(this.marketplaceDir(plugin), ".codebuddy-plugin", "marketplace.json"));
			return true;
		} catch {
			return false;
		}
	}
	describeUnavailable(result, plugin) {
		if (result.channel === "unsupported") return `platform ${this.deps.platform}-${this.deps.arch} is not delivered`;
		if (result.channel === "unavailable") return "download channel unavailable";
		const outcome = result.plugins[plugin];
		if (outcome?.outcome === "failed") return outcome.error ?? "download failed";
		return `no version.json entry for ${plugin} on ${this.platformKey} (app ${this.deps.appVersion})`;
	}
	scheduleRetry() {
		this.consecutiveFailures += 1;
		this.schedule(Math.min(RETRY_BASE_MS * 2 ** (this.consecutiveFailures - 1), RETRY_MAX_MS));
	}
	schedule(delayMs) {
		if (this.disposed) return;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.timer = void 0;
			this.runProbe().catch((error) => {
				this.deps.logger.error(`[NativeRuntime] scheduled probe crashed: ${describeError(error)}`);
			});
		}, delayMs);
		this.timer.unref?.();
	}
	loadState() {
		this.stateLoaded ??= node_fs.promises.readFile(this.statePath, "utf8").then((raw) => {
			const parsed = JSON.parse(raw);
			const feeds = {};
			for (const plugin of require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES) {
				const restored = restoreFeed(plugin, parsed.feeds?.[plugin]);
				if (restored) feeds[plugin] = restored;
			}
			this.state = {
				...parsed.marketplaces ? { marketplaces: parsed.marketplaces } : {},
				...parsed.legacyMigrated ? { legacyMigrated: true } : {},
				legacyMigratedPlugins: require_handler_registry.NATIVE_RUNTIME_PLUGIN_NAMES.filter((plugin) => Array.isArray(parsed.legacyMigratedPlugins) && parsed.legacyMigratedPlugins.includes(plugin)),
				feeds
			};
		}).catch(() => {
			this.state = {};
		});
		return this.stateLoaded;
	}
	async saveState() {
		await node_fs.promises.mkdir(this.root, { recursive: true });
		const temporary = `${this.statePath}.tmp-${process.pid}`;
		await node_fs.promises.writeFile(temporary, JSON.stringify(this.state, null, 2));
		await node_fs.promises.rename(temporary, this.statePath);
	}
	async emit() {
		const status = await this.getStatus();
		for (const listener of this.listeners) try {
			listener(status);
		} catch (error) {
			this.deps.logger.warn(`[NativeRuntime] status listener threw: ${describeError(error)}`);
		}
		return status;
	}
	report(name, dims) {
		this.deps.reportMetric?.(`wb.native_runtime.${name}`, dims);
	}
	random() {
		return this.deps.random?.() ?? Math.random();
	}
};
/** 落盘的 feed 副本坏了就丢掉、下次探测重拉，不连累安装记录。 */
function restoreFeed(plugin, cached) {
	if (!cached) return;
	try {
		return {
			...cached,
			feed: parseNativeRuntimeFeed(cached.feed, plugin)
		};
	} catch {
		return;
	}
}
function describeError(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/browser-use/browser-use-provider.ts
/**
* Browser Use 的稳定第一方身份与会话资源契约。
*
* 进程级 MCP item 由通用 FirstPartyMcpProvider 产出；这里只保留 Browser Use
* 特有的 session lease/env 生命周期。
*/
/** 第一方能力键。与 `origin.key` 一致，只出现在诊断里。 */
var BROWSER_USE_MCP_KEY = "browser-use";
/** Agent CLI 可见的服务名；第一方技能包按 `mcp__browser__*` 引用工具。 */
var BROWSER_USE_SERVER_NAME = "browser";
var BROWSER_USE_ORIGIN = {
	kind: "first-party",
	key: BROWSER_USE_MCP_KEY
};
/** 这条 MCP 的稳定标识。投影期剥掉前缀就是 {@link BROWSER_USE_SERVER_NAME}。 */
var BROWSER_USE_MCP_ID = require_tar.mintMcpId(BROWSER_USE_ORIGIN, BROWSER_USE_SERVER_NAME);
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/browser-use/browser-use-session-env.ts
var BrowserUseSessionEnv = class {
	constructor(deps) {
		this.deps = deps;
		this.id = BROWSER_USE_MCP_ID;
		this.leases = /* @__PURE__ */ new Map();
		this.tail = Promise.resolve();
	}
	async sessionDeselected(sessionId) {
		await this.releaseSession(sessionId);
	}
	/**
	* 取这个会话的接入 env。拿不到后端授权时返回 `undefined` —— **降级，不是错误**：会话照常
	* 创建，只是这一条不注入。非交付平台、缺 runtime、桥接失败都走这条。
	*/
	async contribute(_id, ctx) {
		const sessionId = ctx.sessionId;
		try {
			return await this.enqueue(async () => {
				const grant = await this.deps.acquire(sessionId);
				this.leases.set(sessionId, [grant.leaseId]);
				await this.deps.reconcile(this.snapshot());
				return { ...grant.env };
			});
		} catch (error) {
			this.deps.logger?.warn?.(`[BrowserUse] 取会话授权失败，本次不注入 browser server（会话照常创建）sessionId=${sessionId} error=${describe$2(error)}`);
			return;
		}
	}
	/**
	* 会话结束：归还该会话的全部租约，再对一次账。两件都做不是重复 —— `release` 让后端在最后
	* 一条归还时立刻拆桶，对账兜住 release 途中失败留下的残账。
	*
	* **读表与删表都在尾链里**，不在调用点。会话可能在一次投影还没算完时结束（用户点开就关）：
	* 在调用点读表会读到 `undefined`，删掉的是个空条目，随后排在前面的 `contribute` 才把租约
	* 写进去 —— 那条租约就永远没人还，浏览器桶被钉到进程退出。
	*
	* 同步签名：这是生命周期通知，调用方没有能力处理「回收失败」。
	*/
	sessionEnded(sessionId) {
		this.releaseSession(sessionId).catch((error) => {
			this.deps.logger?.warn?.(`[BrowserUse] 会话租约回收失败 sessionId=${sessionId} error=${describe$2(error)}`);
		});
	}
	releaseSession(sessionId) {
		return this.enqueue(async () => {
			const leases = this.leases.get(sessionId);
			this.leases.delete(sessionId);
			for (const leaseId of leases ?? []) await this.deps.release(leaseId);
			await this.deps.reconcile(this.snapshot());
		});
	}
	snapshot() {
		return [...this.leases].map(([sessionId, leaseIds]) => ({
			sessionId,
			leaseIds: [...leaseIds]
		}));
	}
	/** 串到尾链上。前一次失败不阻断后一次 —— 失败的处理归各自的调用点。 */
	enqueue(run) {
		const result = this.tail.then(run, run);
		this.tail = result.then(() => void 0, () => void 0);
		return result;
	}
};
function describe$2(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/computer-use-provider.ts
/**
* Computer Use 的稳定第一方身份与日志契约。
*
* 进程级 MCP item 由通用 FirstPartyMcpProvider 产出；这里只保留 Computer Use
* 特有的稳定身份。会话租约与 `WORKBUDDY_VLM_*` env 生命周期归
* `computer-use-session-env.ts`。
*/
/** 第一方能力键。与 `origin.key` 一致，只出现在诊断里。 */
var COMPUTER_USE_MCP_KEY = "computer-use";
/**
* Agent CLI 可见的服务名 —— **必须是 `computer-use`。**
*
* 三处对齐，改一处就全断：
*
* 1. 它要匹配 `workbuddy-cua` 二进制的 `serverInfo.name`；
* 2. 工具前缀因此是 `mcp__computer-use__*`；
* 3. 二进制 instructions 里引用的 computer-use skill 按这个前缀写工具名。
*
* 改名不会让编译或测试失败，只会让 skill 里写死的工具名整批落空。
*/
var COMPUTER_USE_SERVER_NAME = "computer-use";
var COMPUTER_USE_ORIGIN = {
	kind: "first-party",
	key: COMPUTER_USE_MCP_KEY
};
/** 这条 MCP 的稳定标识。投影期剥掉前缀就是 {@link COMPUTER_USE_SERVER_NAME}。 */
var COMPUTER_USE_MCP_ID = require_tar.mintMcpId(COMPUTER_USE_ORIGIN, COMPUTER_USE_SERVER_NAME);
var ComputerUseSessionEnv = class {
	constructor(deps) {
		this.deps = deps;
		this.id = COMPUTER_USE_MCP_ID;
		this.leases = /* @__PURE__ */ new Map();
		this.tail = Promise.resolve();
	}
	/**
	* 取这个会话的接入 env。拿不到后端授权（非 darwin、缺 runtime、桥接失败）或代理不可用时
	* 返回 `undefined` —— **降级，不是错误**：会话照常创建，其余 MCP 照常可用。
	*/
	async contribute(_id, ctx) {
		const sessionId = ctx.sessionId;
		try {
			return await this.enqueue(() => this.acquireBoth(sessionId));
		} catch (error) {
			this.deps.logger?.warn?.(`[ComputerUse] 取会话授权失败，本次不注入 computer-use server（会话照常创建）sessionId=${sessionId} error=${describe$1(error)}`);
			return;
		}
	}
	/**
	* 会话结束：还租约、退凭据。**两笔都在尾链里退**，不在调用点 —— 会话可能在一次投影还没
	* 算完时结束（用户点开就关），在调用点退的是「此刻表里有什么」，而排在前面的 `contribute`
	* 之后才把租约写进去，那条租约就永远没人还，把那台带 TCC 身份的原生服务钉到进程退出。
	*
	* 同步签名：这是生命周期通知，调用方没有能力处理「回收失败」。
	*/
	sessionEnded(sessionId) {
		this.enqueue(async () => {
			const leaseId = this.leases.get(sessionId);
			this.leases.delete(sessionId);
			this.releaseVlm(sessionId);
			if (leaseId !== void 0) await this.deps.release(sessionId, leaseId);
		}).catch((error) => {
			this.deps.logger?.warn?.(`[ComputerUse] 会话租约回收失败 sessionId=${sessionId} error=${describe$1(error)}`);
		});
	}
	/**
	* 两笔账一起拿，任一失败都把已经拿到的那笔还回去。**先拿新租约再还旧的**：后端按活着的
	* 租约数决定那台原生服务要不要重启，中途归零会让它在会话还活着时被拆掉。VLM 那侧本身
	* 幂等，不需要这套换位。
	*/
	async acquireBoth(sessionId) {
		const previous = this.leases.get(sessionId);
		const { leaseId, env } = await this.deps.acquire(sessionId);
		this.leases.set(sessionId, leaseId);
		if (previous !== void 0 && previous !== leaseId) await this.deps.release(sessionId, previous).catch((error) => {
			this.deps.logger?.warn?.(`[ComputerUse] 旧租约归还失败 sessionId=${sessionId} leaseId=${previous} error=${describe$1(error)}`);
		});
		try {
			const grant = await this.deps.vlm.acquireSession(sessionId);
			return {
				...env,
				WORKBUDDY_VLM_CHAT_URL: grant.url,
				WORKBUDDY_VLM_AUTH_TOKEN: grant.token,
				WORKBUDDY_VLM_CONTEXT: grant.context,
				WORKBUDDY_VLM_MODEL: this.deps.modelId ?? "kinfra-cua"
			};
		} catch (error) {
			this.leases.delete(sessionId);
			await this.deps.release(sessionId, leaseId).catch(() => void 0);
			throw error;
		}
	}
	releaseVlm(sessionId) {
		try {
			this.deps.vlm.releaseSession(sessionId);
		} catch (error) {
			this.deps.logger?.warn?.(`[ComputerUse] VLM 会话凭据回收失败 sessionId=${sessionId} error=${describe$1(error)}`);
		}
	}
	/** 串到尾链上。前一次失败不阻断后一次 —— 失败的处理归各自的调用点。 */
	enqueue(run) {
		const result = this.tail.then(run, run);
		this.tail = result.then(() => void 0, () => void 0);
		return result;
	}
};
function describe$1(error) {
	return error instanceof Error ? error.message : String(error);
}
/** Node 的 `req.headers` 一律小写化，查表用这个。 */
var COMPUTER_USE_VLM_CONTEXT_HEADER_LOWERCASE = "X-WorkBuddy-MCP-Context".toLowerCase();
var MIN_SECRET_BYTES = 32;
var ComputerUseVlmContextEnvelope = class {
	constructor(options = {}) {
		this.secret = Buffer.from(options.secret ?? (0, crypto.randomBytes)(MIN_SECRET_BYTES));
		if (this.secret.length < MIN_SECRET_BYTES) throw new Error("[ComputerUseVlm] 上下文签名密钥至少 32 字节");
	}
	sign(context) {
		const sessionId = context.sessionId.trim();
		if (!sessionId) throw new Error("[ComputerUseVlm] 上下文信封必须带 sessionId");
		const payload = Buffer.from(JSON.stringify({ sessionId }), "utf8").toString("base64url");
		return `${payload}.${this.digest(payload).toString("base64url")}`;
	}
	/**
	* 验签并解出会话身份。任何一步不对都返回 `undefined` —— 调用方据此回 401。
	*
	* 不区分「没带」「格式坏」「签名错」：区分了就是给攻击者一个预言机。
	*/
	verify(envelope) {
		if (!envelope) return;
		const separator = envelope.indexOf(".");
		if (separator <= 0 || separator !== envelope.lastIndexOf(".")) return;
		const payload = envelope.slice(0, separator);
		const expected = this.digest(payload);
		const actual = Buffer.from(envelope.slice(separator + 1), "base64url");
		if (actual.length !== expected.length || !(0, crypto.timingSafeEqual)(actual, expected)) return;
		try {
			const sessionId = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))?.sessionId;
			return typeof sessionId === "string" && sessionId.trim() ? { sessionId: sessionId.trim() } : void 0;
		} catch {
			return;
		}
	}
	digest(payload) {
		return (0, crypto.createHmac)("sha256", this.secret).update(payload).digest();
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/vlm/vlm-approval.ts
/**
* 高积分运行时确认。闸门放在 VLM 代理上，因为这里才是**积分消耗与数据出网的真实边界**：
* 截屏还在本机，未获批时一个字节都不会离开设备。契约在 daemon / `workbuddy-cua` 二进制 /
* computer-use skill 三处同步，形状不要动。
*
* | 决策 | 记到哪 | 何时失效 |
* |---|---|---|
* | `always` | 本次启动（进程内） | daemon 退出，或登出 / 切账号（{@link ComputerUseApprovalGate.revoke}） |
* | `once` | 本会话 | 会话释放 |
* | `deny` | 不记账 | 下次请求再问一次 |
*
* `always` **不落盘**：积分按账号计费，落盘等于跨账号、跨版本地替用户点了「一直允许」。
*/
var ComputerUseApprovalGate = class {
	constructor(deps) {
		this.deps = deps;
		this.approvedForThisLaunch = false;
		this.approvedSessions = /* @__PURE__ */ new Set();
		this.inFlight = /* @__PURE__ */ new Map();
	}
	/**
	* 这个会话现在能不能打 VLM。未获批则发起一次确认并按结果记账。
	*
	* **发起确认本身失败一律按未获批处理**（会话已释放、桥接异常、实现方抛错）：
	* 没有可承载浮层的载体就等于用户没批准，绝不静默放行。
	*/
	async ensureApproved(sessionId) {
		if (this.approvedForThisLaunch || this.approvedSessions.has(sessionId)) return true;
		const pending = this.inFlight.get(sessionId);
		if (pending) return await pending !== "deny";
		const requestId = (this.deps.newRequestId ?? crypto.randomUUID)();
		const started = this.deps.requestApproval(sessionId, requestId).catch((error) => {
			this.deps.logger?.warn?.(`[ComputerUseVlm] 发起确认失败，按未获批处理：sessionId=${sessionId} error=${describe(error)}`);
			return "deny";
		});
		this.inFlight.set(sessionId, started);
		let decision;
		try {
			decision = await started;
		} finally {
			this.inFlight.delete(sessionId);
		}
		if (decision === "always") this.approvedForThisLaunch = true;
		else if (decision === "once") this.approvedSessions.add(sessionId);
		this.deps.logger?.info?.(`[ComputerUseVlm] 确认结果 sessionId=${sessionId} decision=${decision}`);
		return decision !== "deny";
	}
	/** 会话结束：本会话的授权失效，下个会话重新问。 */
	forgetSession(sessionId) {
		this.approvedSessions.delete(sessionId);
	}
	/**
	* 登出 / 切账号：清空本次启动的授权。旧实现为此在模块级挂了一个可变的 `revokeHook`
	* 单例 —— 模块级可变状态在测试里会互相串台，且「谁登记了钩子」查不出来；改成让装配层
	* 直接持有代理并调它。
	*/
	revoke() {
		this.approvedForThisLaunch = false;
		this.approvedSessions.clear();
		this.deps.logger?.info?.("[ComputerUseVlm] 运行时授权已撤销");
	}
	/** 代理停止：连同在飞的确认一起丢弃。 */
	clear() {
		this.approvedSessions.clear();
		this.inFlight.clear();
	}
};
function describe(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/vlm/loopback.ts
/**
* 认得的回环 hostname。
*
* `parseHostAuthority` 会把 IPv6 的方括号剥掉，所以**表里必须写不带括号的形态**。
* 旧实现（`local-mcp-host.ts` 的 `LOOPBACK_HOSTS`）里 `[::1]` 与 `::1` 并列：前者是
* 死条目（剥完括号永远匹配不上），后者才是真正生效的那条 —— 所以旧实现并没有「IPv6
* 一律 403」，只是多带了一条永远不会命中的表项。这里去掉它，并补上展开形
* `0:0:0:0:0:0:0:1`：它是合法的 Host 值，旧表接不住。
*/
var LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set([
	"127.0.0.1",
	"localhost",
	"::1",
	"0:0:0:0:0:0:0:1"
]);
/** 解析 `Host` 头的 `hostname[:port]`，含 IPv6 的方括号形态。 */
function parseHostAuthority(value) {
	const host = value?.trim();
	if (!host) return;
	if (host.startsWith("[")) {
		const closing = host.indexOf("]");
		if (closing < 0) return;
		const hostname = host.slice(1, closing);
		const suffix = host.slice(closing + 1);
		if (!suffix) return { hostname };
		return /^:\d+$/.test(suffix) ? {
			hostname,
			port: Number(suffix.slice(1))
		} : void 0;
	}
	const parts = host.split(":");
	if (parts.length === 1) return { hostname: host };
	if (parts.length !== 2 || !/^\d+$/.test(parts[1])) return;
	return {
		hostname: parts[0],
		port: Number(parts[1])
	};
}
/**
* 只服务回环。
*
* 端口本身就 bind 在 127.0.0.1，这道门额外挡的是 DNS rebinding：攻击者把某个域名解到
* 127.0.0.1，浏览器就会带着那个域名的 `Host` 打进来。**校验 hostname 和端口** ——
* 重绑攻击常常靠端口不匹配露馅。
*/
function isLoopbackAuthority(host, port) {
	const authority = parseHostAuthority(host);
	return Boolean(authority && LOOPBACK_HOSTNAMES.has(authority.hostname.toLowerCase()) && authority.port === port);
}
/**
* 读一个 header。
*
* 数组 = 同名头出现了多次。取第一个会让「带两个 Authorization」变成可利用的歧义面，
* 所以整条当作没带。
*/
function readHeader(req, name) {
	const value = req.headers[name];
	return typeof value === "string" ? value : void 0;
}
/** 取 `Authorization: Bearer <token>` 里的 token。字符集与签发端对齐。 */
function readBearerToken(req) {
	return /^Bearer ([A-Za-z0-9_-]+)$/.exec(readHeader(req, "authorization") ?? "")?.[1];
}
/** 在回环上监听一个随机端口，返回实际端口。 */
function listenOnLoopback(server) {
	return new Promise((resolve, reject) => {
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			if (!address || typeof address === "string") {
				reject(/* @__PURE__ */ new Error("[ComputerUseVlm] 拿不到回环端口"));
				return;
			}
			resolve(address.port);
		});
	});
}
/** 写一条 JSON 响应。已经开始写响应体时什么都不做 —— 状态码改不了了。 */
function writeJson(res, status, body) {
	if (res.destroyed || res.writableEnded || res.headersSent) return;
	res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
	res.end(JSON.stringify(body));
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/vlm/vlm-sessions.ts
/**
* VLM 代理的会话台账：签发回环凭据、按凭据认回会话、按会话回收。
*
* 三样东西按会话存：
*
* - **token** —— 256 bit 随机，进程本地、不落盘。它回答的是「这个请求是不是我发出去的那
*   条 mcp-config 里的进程打来的」；
* - **信封** —— 见 `context-envelope.ts`。它回答的是「你是哪个会话」。两样缺一个都是
*   401：token 说不出会话身份，信封本身可以被复制到另一个端点上。
* - **网关请求元数据** —— `acp-connection-id` / `X-Conversation-Request-ID` 这类**一次会话
*   内必须稳定**的标识。每次请求现生成的话，网关侧会把同一次桌面操作的几十次 VLM 调用
*   拆成几十个会话。
*
* **没有独立的时钟寿命。** 凭据只在会话释放或代理停止时作废 —— 本仓明确禁用基于时间窗
* 的兜底：TTL 与 mcp-config 的重新下发之间没有任何同步关系，会话跑到一半突然 401，而唯一
* 的「修复」是让用户重开会话。真正的吊销点是会话生命周期本身，那是事件。
*/
var ComputerUseVlmSessionLedger = class {
	constructor(envelope, random = crypto.randomBytes, uuid = crypto.randomUUID) {
		this.envelope = envelope;
		this.random = random;
		this.uuid = uuid;
		this.bySession = /* @__PURE__ */ new Map();
		this.sessionByToken = /* @__PURE__ */ new Map();
	}
	/**
	* 取这个会话的凭据；没有就签一套。
	*
	* **幂等**：同一会话反复取拿到的是同一个 token。每次换新的话，前一次投影发出去的
	* mcp-config 会立刻失效，而同一个会话可能同时握着两份投影（overlay 会重投一次）。
	*
	* 幂等也意味着**这里不需要引用计数**。旧实现按「每次 compose 各持一份、各自 dispose」
	* 计数，因为释放点是每一份快照；新模型里释放点只有一个 —— 会话结束。取 N 次、还 1 次，
	* 留着计数只会让计数永远归不了零，凭据活到进程退出。
	*/
	acquire(sessionId, url) {
		const normalized = requireSessionId(sessionId);
		let record = this.bySession.get(normalized);
		if (!record) {
			const token = this.random(32).toString("base64url");
			if (this.sessionByToken.has(token)) throw new Error("[ComputerUseVlm] 会话 token 碰撞");
			record = {
				token,
				metadata: {
					acpConnectionId: this.uuid(),
					conversationRequestId: this.uuid()
				}
			};
			this.bySession.set(normalized, record);
			this.sessionByToken.set(token, normalized);
		}
		return {
			url,
			token: record.token,
			context: this.envelope.sign({ sessionId: normalized })
		};
	}
	/** 作废这个会话的凭据。返回是否真的有一份被作废。 */
	release(sessionId) {
		const normalized = sessionId.trim();
		const record = this.bySession.get(normalized);
		if (!record) return false;
		this.bySession.delete(normalized);
		this.sessionByToken.delete(record.token);
		return true;
	}
	/**
	* 认出这个请求属于哪个会话。**两样都对上才算。**
	*
	* 先验信封（它是签过名的，会话身份可信），再核对 token 是不是这个会话的。反过来做
	* （token → 会话 → 比信封）等价，但这个方向少一张反查表。
	*/
	resolve(token, envelope) {
		const context = this.envelope.verify(envelope);
		if (!context || !token) return;
		const record = this.bySession.get(context.sessionId);
		return record && record.token === token ? context.sessionId : void 0;
	}
	metadataOf(sessionId) {
		return this.bySession.get(sessionId)?.metadata;
	}
	/** 代理停止：全体作废。 */
	clear() {
		this.bySession.clear();
		this.sessionByToken.clear();
	}
};
function requireSessionId(sessionId) {
	const normalized = sessionId.trim();
	if (!normalized) throw new Error("[ComputerUseVlm] 会话凭据必须带 sessionId");
	return normalized;
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/vlm/vlm-upstream.ts
/**
* 一方 VLM 网关这一跳：地址归一、身份头组装、转发与 401 续票重试、响应透传。
*
* **纯透传纪律**：请求体与响应体按字节转发，不解析不改写。请求头保留二进制产生的
* OpenAI SDK 信息，同时补齐一方 `/v2/chat/completions` 需要的 WorkBuddy 会话、账号、产品
* 与 trace headers。鉴权换成本机当前登录态。
*/
var CHAT_COMPLETIONS_PATH = "/v2/chat/completions";
/** 默认公网网关；正常装配会通过 `getGatewayEndpoint` 动态跟随当前环境。 */
var DEFAULT_COMPUTER_USE_VLM_UPSTREAM_URL = "https://copilot.tencent.com/v2/chat/completions";
/**
* 连接级（逐跳）头。RFC 7230 §6.1：这些描述的是**这一跳连接本身**，转发到下一跳就是
* 撒谎。请求与响应两个方向都要剥。
*/
var HOP_BY_HOP_HEADERS = [
	"connection",
	"keep-alive",
	"te",
	"trailer",
	"trailers",
	"transfer-encoding",
	"upgrade"
];
/**
* 转发请求时剥掉的头，三组：
*
* 1. **逐跳头 + 代理自己的那两个**（`proxy-*` 只对本跳有意义）；
* 2. **由 fetch 按新 body 重建的实体头** —— `host` / `content-length` / `expect` 带着旧值
*    转发出去会与实际发出的字节对不上；
* 3. **本地回环凭据与协商** —— 这三个必须在这一跳换掉或丢掉，见各自注释。
*/
var STRIPPED_REQUEST_HEADERS = /* @__PURE__ */ new Set([
	...HOP_BY_HOP_HEADERS,
	"proxy-authorization",
	"proxy-connection",
	"host",
	"content-length",
	"expect",
	"accept-encoding",
	"authorization",
	COMPUTER_USE_VLM_CONTEXT_HEADER_LOWERCASE,
	"origin"
]);
/**
* 透传响应时剥掉的头：逐跳头，加上**描述上游那条连接的实体编码的两个**。
*
* `content-encoding` / `content-length` 必须剥：body 由 `passthrough` 重新写一遍，
* 保留上游的值会让下游按错误的长度或编码去解。
*/
var STRIPPED_RESPONSE_HEADERS = /* @__PURE__ */ new Set([
	...HOP_BY_HOP_HEADERS,
	"content-encoding",
	"content-length"
]);
var ComputerUseVlmUpstream = class {
	constructor(deps) {
		this.deps = deps;
		this.fetchImpl = deps.fetchImpl ?? fetch;
	}
	/**
	* 转发一次；上游 401 时刷新登录态后重试一次。
	*
	* 重试必须在**代理侧**吸收：二进制把 401 当作致命错误、不重试，漏在这里等于用户
	* token 一过期整条桌面操控就死掉，而且报的是「模型不可用」。
	*/
	async forward(input) {
		const accessToken = requireAccessToken(this.deps);
		const first = await this.send(input, accessToken);
		if (first.status !== 401 || !this.deps.refreshSession) return first;
		return this.retryAfterRefresh(input, first);
	}
	/**
	* 上游 401 → 刷新 → 换新 token 重试一次。
	*
	* 刷新失败或仍未登录时把**首个 401 响应原样透传**（body 已缓冲、可重放），保留网关侧
	* 的诊断信息 —— 换成自造的 401 会把「为什么被拒」这条唯一线索丢掉。
	*/
	async retryAfterRefresh(input, first) {
		const firstBody = Buffer.from(await first.arrayBuffer());
		const replayFirst = () => new Response(new Uint8Array(firstBody), {
			status: first.status,
			headers: first.headers
		});
		try {
			await this.deps.refreshSession();
		} catch (error) {
			this.deps.logger?.warn?.(`[ComputerUseVlm] 刷新登录态失败，透传上游 401：${error instanceof Error ? error.message : String(error)}`);
			return replayFirst();
		}
		const refreshed = this.deps.getAccessToken()?.trim();
		return refreshed ? this.send(input, refreshed) : replayFirst();
	}
	send(input, accessToken) {
		const headers = new Headers();
		for (const [name, value] of Object.entries(input.req.headers)) {
			if (value === void 0 || STRIPPED_REQUEST_HEADERS.has(name)) continue;
			headers.set(name, Array.isArray(value) ? value.join(", ") : value);
		}
		for (const [name, value] of Object.entries(this.deps.getRequestHeaders?.() ?? {})) if (value !== void 0 && value.trim()) headers.set(name, value);
		applyGatewayHeaders(headers, input.sessionId, input.metadata);
		headers.set("Accept-Encoding", "identity");
		headers.set("Authorization", `Bearer ${accessToken}`);
		return this.fetchImpl(this.resolveUpstreamUrl(), {
			method: "POST",
			headers,
			body: new Uint8Array(input.body),
			signal: input.signal
		});
	}
	resolveUpstreamUrl() {
		const explicit = this.deps.upstreamUrl?.trim();
		if (explicit) return explicit;
		if (this.deps.getGatewayEndpoint) {
			const endpoint = this.deps.getGatewayEndpoint()?.trim();
			if (!endpoint) throw new Error("[ComputerUseVlm] 网关地址不可用");
			return buildComputerUseVlmUpstreamUrl(endpoint);
		}
		return DEFAULT_COMPUTER_USE_VLM_UPSTREAM_URL;
	}
};
/** 上游响应按字节回给下游。 */
async function passthrough(upstream, res) {
	upstream.headers.forEach((value, name) => {
		if (!STRIPPED_RESPONSE_HEADERS.has(name)) res.setHeader(name, value);
	});
	res.writeHead(upstream.status);
	if (!upstream.body) {
		res.end();
		return;
	}
	const readable = stream.Readable.fromWeb(upstream.body);
	await new Promise((resolve, reject) => {
		readable.once("error", reject);
		res.once("error", reject);
		res.once("finish", resolve);
		readable.pipe(res);
	});
}
/**
* 把网关根地址幂等归一化为一方 OpenAI Chat Completions 地址。
*
* 幂等是硬要求：`getGatewayEndpoint()` 在不同装配下可能已经带上了 `/v2` 或整条
* `/v2/chat/completions`，重复拼接会得到 `/v2/chat/completions/v2/chat/completions`。
*/
function buildComputerUseVlmUpstreamUrl(endpoint) {
	const url = new URL(endpoint);
	const trimmedPath = url.pathname.replace(/\/+$/, "");
	if (trimmedPath.endsWith(CHAT_COMPLETIONS_PATH)) url.pathname = trimmedPath;
	else if (trimmedPath.endsWith("/v2")) url.pathname = `${trimmedPath}/chat/completions`;
	else url.pathname = `${trimmedPath}${CHAT_COMPLETIONS_PATH}`;
	return url.toString();
}
/** 从当前登录态 / 产品配置构造稳定的身份与客户端 headers。 */
function buildComputerUseVlmGatewayHeaders(context) {
	const headers = {};
	const appVersion = context.appVersion?.trim() || "0.0.0";
	const cliVersion = context.cliVersion?.trim();
	if (context.userId?.trim()) headers["X-User-Id"] = context.userId.trim();
	if (context.enterpriseId?.trim()) {
		headers["X-Enterprise-Id"] = context.enterpriseId.trim();
		headers["X-Tenant-Id"] = context.enterpriseId.trim();
	}
	if (context.domain?.trim()) headers["X-Domain"] = context.domain.trim();
	headers["X-Product"] = context.deploymentType?.trim() || "SaaS";
	headers["X-IDE-Type"] = "WorkBuddy";
	headers["X-IDE-Name"] = "WorkBuddy";
	headers["X-IDE-Version"] = appVersion;
	headers["X-Private-Data"] = "true";
	headers["User-Agent"] = [
		`WorkBuddy/${appVersion}`,
		`WorkBuddy/${appVersion}`,
		...cliVersion ? [`CLI/${cliVersion}`] : []
	].join(" ");
	return headers;
}
/**
* 补齐一方网关必需的 headers。四组，分组本身就是判据：
*
* | 组 | 值从哪来 | 为什么 |
* |---|---|---|
* | 协商 | 定值 | 一方 `/v2/chat/completions` 只收 JSON；`x-requested-with` 是网关的准入约定 |
* | 会话 | 会话级元数据 | **一次会话内必须稳定**，现生成会把同一次桌面操作的几十次 VLM 调用在网关侧拆成几十个会话 |
* | 请求 | 逐请求现生成 | 它们本来就该逐请求不同 |
* | 产品身份 | 装配层给的，缺了才兜底 | 兜底值只保证「字段在」，不代表真实环境；已经有值就别覆盖 |
*
* trace 三件套（W3C `traceparent`、B3、以及网关自己的 `X-Trace-ID`）共享同一个 traceId：
* 三套各生成一个的话，网关侧三条链路对不起来，等于没有 trace。
*/
function applyGatewayHeaders(headers, sessionId, metadata) {
	headers.set("Accept", "application/json");
	headers.set("Content-Type", "application/json");
	headers.set("x-requested-with", "XMLHttpRequest");
	headers.set("X-Conversation-ID", sessionId);
	headers.set("X-Conversation-Request-ID", metadata.conversationRequestId);
	headers.set("acp-connection-id", metadata.acpConnectionId);
	headers.set("X-Conversation-Message-ID", (0, crypto.randomUUID)());
	headers.set("X-Request-ID", (0, crypto.randomUUID)());
	headers.set("X-Agent-Intent", "craft");
	headers.set("X-Agent-Purpose", "conversation");
	headers.set("x-codebuddy-request", "1");
	for (const [name, fallback] of PRODUCT_IDENTITY_FALLBACKS) headers.set(name, headers.get(name) || fallback);
	applyTraceHeaders(headers);
}
/** 装配层没接上时的产品身份兜底。只保证字段在，不代表真实环境。 */
var PRODUCT_IDENTITY_FALLBACKS = [
	["X-IDE-Type", "WorkBuddy"],
	["X-IDE-Name", "WorkBuddy"],
	["X-IDE-Version", "0.0.0"],
	["X-Private-Data", "true"],
	["X-Product", "SaaS"]
];
/** 三套 trace 协议共享同一个 traceId —— 各生成各的等于没有 trace。 */
function applyTraceHeaders(headers) {
	const traceId = (0, crypto.randomBytes)(16).toString("hex");
	const spanId = (0, crypto.randomBytes)(8).toString("hex");
	const parentSpanId = (0, crypto.randomBytes)(8).toString("hex");
	headers.set("traceparent", `00-${traceId}-${spanId}-01`);
	headers.set("b3", `${traceId}-${spanId}-1-${parentSpanId}`);
	headers.set("X-B3-TraceId", traceId);
	headers.set("X-B3-ParentSpanId", parentSpanId);
	headers.set("X-B3-SpanId", spanId);
	headers.set("X-B3-Sampled", "1");
	headers.set("X-Trace-ID", traceId);
}
/** 未登录时不发请求。代理据此回 401，二进制不会拿到一个语义不明的上游错误。 */
function requireAccessToken(deps) {
	const token = deps.getAccessToken()?.trim();
	if (!token) throw new Error("[ComputerUseVlm] 未登录");
	return token;
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/computer-use/vlm/vlm-proxy.ts
/**
* Computer Use 一方 VLM 的本地纯透传代理。
*
* ```
* workbuddy-cua ──http──▶ http://127.0.0.1:<port>/computer-use/vlm/chat ──▶ 一方 VLM 网关
*                             │  这里：验回环 / 验双头 / 高积分确认 / 换成用户一方 token
* ```
*
* Agent CLI 只负责 spawn 二进制并透传 env；二进制通过 `WORKBUDDY_VLM_CHAT_URL`、
* `WORKBUDDY_VLM_AUTH_TOKEN`、`WORKBUDDY_VLM_CONTEXT` 连到这里，后两者分别形成 Bearer
* token 与签名 context，**都只在回环链路使用**，二进制拿不到任何用户凭据。
*
* ## 这个模块和 MCP 没有关系
*
* 它说的是 OpenAI chat-completions 协议，上游是腾讯网关，消费者是一个 Rust 视觉二进制，
* 鉴权是用户的产品身份，闸门是高积分确认 —— 没有一样和 Model Context Protocol 有关。
* 它住在 computer-use 底下是因为它服务的是这条能力，不是因为它属于 MCP 层。因此本目录
* **不依赖 `mcp/`**：信封与回环校验各写一份（见 `context-envelope.ts` / `loopback.ts`），
* 头名相同但同名不同物。
*/
/**
* 代理的 chat 路径。**必须包含 `/chat`。**
*
* `workbuddy-cua` 的 LLM 客户端对含 `/chat` 的 URL 原样使用，否则会自行追加
* `/chat/completions`（`rust/src/llm/client.rs` 的 `predict_once`）。改成一个不含 `/chat`
* 的路径，二进制打的就是 `<url>/chat/completions` —— 本代理回 404，而二进制侧看到的是
* 「模型不可用」，两边都查不到真因。
*/
var COMPUTER_USE_VLM_CHAT_PATH = "/computer-use/vlm/chat";
var ComputerUseVlmProxy = class {
	constructor(options) {
		this.options = options;
		this.port = 0;
		this.stopped = false;
		this.logger = options.logger ?? {};
		this.sessions = new ComputerUseVlmSessionLedger(new ComputerUseVlmContextEnvelope());
		this.approvals = new ComputerUseApprovalGate({
			requestApproval: options.requestApproval ?? (async () => "deny"),
			logger: this.logger
		});
		this.upstream = new ComputerUseVlmUpstream(options);
		this.upstreamTimeoutMs = options.upstreamTimeoutMs ?? 57e4;
		this.maxRequestBodyBytes = options.maxRequestBodyBytes ?? 33554432;
	}
	/** 登出 / 切账号时调用。见 {@link ComputerUseApprovalGate.revoke}。 */
	revokeApproval() {
		this.approvals.revoke();
	}
	async acquireSession(sessionId) {
		if (this.stopped) throw new Error("[ComputerUseVlm] 代理已停止");
		const port = await this.ensureStarted();
		return this.sessions.acquire(sessionId, `http://127.0.0.1:${port}${COMPUTER_USE_VLM_CHAT_PATH}`);
	}
	releaseSession(sessionId) {
		if (this.sessions.release(sessionId)) {
			this.approvals.forgetSession(sessionId.trim());
			this.logger.info?.(`[ComputerUseVlm] 会话已释放 sessionId=${sessionId}`);
		}
	}
	async stop() {
		this.stopped = true;
		this.sessions.clear();
		this.approvals.clear();
		const server = this.server;
		this.server = void 0;
		this.startPromise = void 0;
		this.port = 0;
		if (server) await new Promise((resolve) => {
			server.close(() => resolve());
			server.closeAllConnections?.();
		});
	}
	ensureStarted() {
		this.startPromise ??= this.start().catch((error) => {
			this.startPromise = void 0;
			throw error;
		});
		return this.startPromise;
	}
	async start() {
		const server = http.createServer((req, res) => {
			this.dispatch(req, res).catch((error) => {
				this.logger.error?.("[ComputerUseVlm] 请求处理失败", error);
				if (!res.headersSent) writeJson(res, 500, { error: "internal_error" });
				else if (!res.writableEnded) res.end();
			});
		});
		server.unref();
		this.server = server;
		this.port = await listenOnLoopback(server);
		this.logger.info?.(`[ComputerUseVlm] 监听回环端口 ${this.port}`);
		return this.port;
	}
	async dispatch(req, res) {
		const sessionId = this.admit(req, res);
		if (!sessionId) return;
		const body = await this.readBody(req, res);
		if (body === void 0) return;
		if (!this.options.getAccessToken()?.trim()) {
			writeJson(res, 401, { error: "not_logged_in" });
			return;
		}
		if (!await this.approvals.ensureApproved(sessionId)) {
			writeJson(res, 403, { error: "user_denied" });
			return;
		}
		await this.relay(req, res, body, sessionId);
	}
	/**
	* 四道门：回环 Host → 无 Origin → 路径 → 方法，再认会话。
	*
	* 顺序是刻意的：先便宜后贵，且**在认会话之前先把非法来源挡掉** —— 会话认证要查表、
	* 要验签，不该被任意打进来的请求当成计算资源。
	*/
	admit(req, res) {
		if (!isLoopbackAuthority(readHeader(req, "host"), this.port)) {
			writeJson(res, 403, { error: "forbidden" });
			return;
		}
		if (req.headers.origin !== void 0) {
			writeJson(res, 403, { error: "forbidden" });
			return;
		}
		if (new URL(req.url ?? "/", `http://127.0.0.1:${this.port}`).pathname !== "/computer-use/vlm/chat") {
			writeJson(res, 404, { error: "not_found" });
			return;
		}
		if (req.method !== "POST") {
			res.setHeader("Allow", "POST");
			writeJson(res, 405, { error: "method_not_allowed" });
			return;
		}
		const sessionId = this.sessions.resolve(readBearerToken(req), readHeader(req, COMPUTER_USE_VLM_CONTEXT_HEADER_LOWERCASE));
		if (!sessionId) {
			writeJson(res, 401, { error: "unauthorized" });
			return;
		}
		return sessionId;
	}
	/**
	* 转发 + 透传。四种失败各有各的状态码，别归一成 500。
	*
	* 中止的**原因**用一个值记，不是两个布尔：超时与客户端断开可能前后脚发生，两个布尔
	* 就有「都置位」这个歧义态，而 catch 里要靠它选状态码。只认第一个原因 —— 后到的那个
	* 是前一个的后果，不该改写结论。
	*/
	async relay(req, res, body, sessionId) {
		const metadata = this.sessions.metadataOf(sessionId);
		if (!metadata) {
			writeJson(res, 401, { error: "unauthorized" });
			return;
		}
		const startedAt = Date.now();
		const abort = new AbortController();
		let cause;
		const abortWith = (next) => {
			cause ??= next;
			abort.abort();
		};
		const timeout = setTimeout(() => abortWith("upstream-timeout"), this.upstreamTimeoutMs);
		res.once("close", () => {
			if (!res.writableEnded) abortWith("client-gone");
		});
		try {
			const upstream = await this.upstream.forward({
				req,
				body,
				sessionId,
				metadata,
				signal: abort.signal
			});
			await passthrough(upstream, res);
			this.logger.info?.(`[ComputerUseVlm] 已转发 sessionId=${sessionId} status=${upstream.status} requestBytes=${body.length} elapsedMs=${Date.now() - startedAt}`);
		} catch (error) {
			if (cause === "client-gone") {
				res.destroy();
				return;
			}
			if (res.headersSent) {
				this.logger.warn?.("[ComputerUseVlm] 响应透传中断");
				res.destroy();
				return;
			}
			if (cause === "upstream-timeout") {
				writeJson(res, 504, { error: "upstream_timeout" });
				return;
			}
			this.logger.warn?.(`[ComputerUseVlm] 上游不可达：${error instanceof Error ? error.message : String(error)}`);
			writeJson(res, 502, { error: "upstream_unreachable" });
		} finally {
			clearTimeout(timeout);
		}
	}
	/**
	* 全量缓冲请求体。
	*
	* 必须可重放 —— 401 续票重试要把同一份字节再发一次。超限 413 并立即终止读入，
	* 不把 32MB 之后的字节继续收进内存。返回 `undefined` 表示已经响应过了。
	*/
	async readBody(req, res) {
		const declared = Number(req.headers["content-length"]);
		if (Number.isFinite(declared) && declared > this.maxRequestBodyBytes) {
			writeJson(res, 413, { error: "payload_too_large" });
			req.destroy();
			return;
		}
		const chunks = [];
		let total = 0;
		try {
			for await (const chunk of req) {
				const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
				total += buffer.length;
				if (total > this.maxRequestBodyBytes) {
					writeJson(res, 413, { error: "payload_too_large" });
					req.destroy();
					return;
				}
				chunks.push(buffer);
			}
		} catch {
			res.destroy();
			return;
		}
		return Buffer.concat(chunks);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/server/desktop-native-runtime-mcp.ts
/**
* 把 desktop 的 Browser Use / Computer Use 运行时接到 {@link McpManager} 上。
*
* 两条 MCP 的进程级条目由各自插件（`browser-use` / `computer-use`）的 `.mcp.json` 经通用插件
* provider 产出；这里只装两件事：会话 env 贡献者（租约、socket、VLM 凭据）与
* {@link NativeRuntimeService}（各探测自己的 `<plugin>/version.json`、下载市场、经插件系统安装 / 启停 / 更新）。
* 桌面宿主持有真正的运行时，daemon 只经**事件桥**跟它说话：
* `BROWSER_RUNTIME_ACTIVATE/PREPARE/RELEASE/RECONCILE_SESSIONS` 与 `COMPUTER_USE_ACTIVATE/PREPARE/RELEASE_SESSION`。
*/
/**
* 装配 Browser Use 的会话 env 贡献者。
*
* **先对账再注册**：daemon 崩溃重启后后端还留着上一代进程的租约桶，只有一次带精确租约集
* 的对账能清掉（这里是空集合 = 一条不剩）。
*/
async function installBrowserUseMcp(options) {
	const deps = {
		acquire: async (sessionId) => {
			const runtime = await options.resolveRuntime();
			if (!runtime) throw new Error("browser-use plugin is not installed or enabled");
			const raw = await options.host.prepareSession({
				sessionId,
				...runtime
			});
			if (!require_log_acl_guard.isWorkbuddyBrowserRuntimePreparedSession(raw)) throw new Error("Desktop Browser runtime returned an invalid session descriptor");
			return {
				leaseId: raw.leaseId,
				env: raw.server.env ?? {}
			};
		},
		release: async (leaseId) => {
			await options.host.releaseSession(leaseId);
		},
		reconcile: async (sessions) => {
			await options.host.reconcileSessions({ sessions: sessions.map((entry) => ({
				sessionId: entry.sessionId,
				leaseIds: [...entry.leaseIds]
			})) });
		},
		...options.logger ? { logger: options.logger } : {}
	};
	await deps.reconcile([]).catch(() => void 0);
	options.runtime.registerSessionEnv(new BrowserUseSessionEnv(deps));
}
function installComputerUseMcp(options) {
	const deps = {
		acquire: async (sessionId) => {
			const runtime = await options.resolveRuntime();
			if (!runtime) throw new Error("computer-use plugin is not installed or enabled");
			const raw = await options.host.acquireSession({
				sessionId,
				...runtime
			});
			if (!require_log_acl_guard.isWorkbuddyComputerUsePreparedSession(raw)) throw new Error("Desktop computer-use runtime returned an invalid session descriptor");
			return {
				leaseId: raw.leaseId,
				env: raw.server.env ?? {}
			};
		},
		release: async (sessionId, leaseId) => {
			await options.host.releaseSession(sessionId, leaseId);
		},
		vlm: options.vlm,
		...options.modelId ? { modelId: options.modelId } : {},
		...options.logger ? { logger: options.logger } : {}
	};
	options.runtime.registerSessionEnv(new ComputerUseSessionEnv(deps));
}
/** 装配 NativeRuntimeService 与两条会话 env 贡献者。调用方在插件宿主服务就绪后 `start()`。 */
async function installNativeRuntime(options) {
	const service = new NativeRuntimeService({
		...options.service,
		hosts: {
			...options.browserUse ? { "browser-use": { activate: async (params) => {
				await options.browserUse.activate(params);
			} } } : {},
			"computer-use": { activate: async (params) => {
				await options.computerUse.host.activate(params);
			} }
		},
		logger: options.logger
	});
	if (options.browserUse) await installBrowserUseMcp({
		runtime: options.runtime,
		host: options.browserUse,
		resolveRuntime: () => service.getInstalledRuntime("browser-use"),
		logger: options.logger
	});
	installComputerUseMcp({
		runtime: options.runtime,
		host: options.computerUse.host,
		resolveRuntime: () => service.getInstalledRuntime("computer-use"),
		vlm: options.computerUse.vlm,
		...options.computerUse.modelId ? { modelId: options.computerUse.modelId } : {},
		logger: options.logger
	});
	return service;
}
/**
* 生产装配入口的 VLM 代理：确认的发起点接到宿主按 sessionId 反查会话那条链上，
* 并把撤销钩子登记给登出 / 切账号。单测直接 new，不碰这两处模块级状态。
*/
function createComputerUseVlmProxy(options) {
	const { auth, ...rest } = options;
	const proxy = new ComputerUseVlmProxy({
		...rest,
		getAccessToken: () => auth.getAccessToken(),
		...auth.refreshSession ? { refreshSession: () => auth.refreshSession() } : {},
		requestApproval: require_server.requestComputerUseApproval
	});
	require_server.registerComputerUseApprovalRevoke(() => proxy.revokeApproval());
	return proxy;
}
//#endregion
//#region ../../packages/workbuddy-server/src/session/document-lifecycle-port.ts
function createIsSessionStillProcessing(sessionManager) {
	return (sessionId) => {
		const view = sessionManager.getSession(sessionId);
		if (!view) return false;
		const status = view.status;
		if (status && require_task_status.isTerminalTaskStatus(status)) return false;
		return view.isProcessing === true || status === "working" || status === "planning";
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/session/tencent-docs-agent-editor-tracker.ts
/**
* TencentDocsAgentEditorTracker
*
* Tracks local document `open_file` calls made during an agent turn so that,
* once the turn ends, the host can reconcile (save-if-dirty then close) the
* editors that the agent opened.
*/
var TencentDocsAgentEditorTracker = class {
	constructor() {
		this.sessionPaths = /* @__PURE__ */ new Map();
	}
	recordOpenedFile(sessionId, filePath) {
		if (typeof filePath !== "string" || !filePath) return;
		let paths = this.sessionPaths.get(sessionId);
		if (!paths) {
			paths = /* @__PURE__ */ new Set();
			this.sessionPaths.set(sessionId, paths);
		}
		paths.add(filePath);
	}
	takeAndClear(sessionId) {
		const paths = this.sessionPaths.get(sessionId);
		if (!paths || paths.size === 0) return [];
		this.sessionPaths.delete(sessionId);
		return [...paths];
	}
	clear(sessionId) {
		this.sessionPaths.delete(sessionId);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-docs/create-document-lifecycle-deps.ts
var LOCAL_DOCUMENT_KIND_BY_TENCENT_DOCS_KIND = {
	doc: "document",
	sheet: "spreadsheet",
	slide: "presentation"
};
function clearTencentDocsOnlineSessionState(sessionId) {
	require_wb_source.getOnlineDocumentSelectionStore().clearSession(sessionId);
	require_wb_source.getOnlineDocPreviewRegistry().clearSession(sessionId);
}
function createTencentDocsDocumentLifecycleDeps(args) {
	const isSessionStillProcessing = createIsSessionStillProcessing(args.sessionManager);
	return {
		tracker: new TencentDocsAgentEditorTracker(),
		documentService: args.documentService,
		isSessionStillProcessing,
		onSessionDeleted: clearTencentDocsOnlineSessionState,
		dispose: args.dispose
	};
}
function createTencentDocsLocalDocumentMediaTypes() {
	const whitelist = require_tencent_docs_prompt_selection.TENCENT_DOCS_AI_FILE_SUPPORT_WHITELIST.map((item) => ({
		kind: LOCAL_DOCUMENT_KIND_BY_TENCENT_DOCS_KIND[item.kind],
		extensions: item.extensions
	}));
	return require_server.buildLocalDocumentMediaTypeEntries(whitelist);
}
//#endregion
//#region src/main/skills/project-resource-loader.ts
require_code_cache.init_common$2();
require_code_cache.init_src();
/**
* ProjectResourceLoader — 项目本地任务的 skill 下载服务。
*
* 职责：
* - 根据 createSession 传入的 projectResources，下载 skill zips 并解压
* - 解压到隔离目录：$CODEBUDDY_CONFIG_DIR/project-resources/<projectId>/<skillId>/
* - 返回目录路径列表，由 createSession handler 通过 opts.env 传给 CLI
* - CLI 通过 CODEBUDDY_SESSION_SKILL_DIRS env 扫描这些额外目录
*
* 设计原则：
* - 不侵入 ConnectorService / SessionManager
* - 独立模块，由 createSession handler 按需调用
* - best-effort：单个 skill 下载失败不阻塞整体
* - 只在有 projectResources 时触发，普通本地任务不受影响
* - per-project 隔离：不同项目的 skill 互不影响
*/
var import_src = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_code_cache.require_src());
/**
* 项目资源本地存储目录名（位于 $CODEBUDDY_CONFIG_DIR/ 下）。
* 定义在这里而不是 project-resource-manager：manager 在模块顶层就 new 了 loader 单例，
* 反向 import 会构成循环依赖，以 loader 为入口时拿到的 ProjectResourceLoader 是 undefined。
*/
var PROJECT_RESOURCES_DIR_NAME = "project-resources";
/** skill 目录下记录下载来源 ETag / Last-Modified 的文件名（用于条件请求缓存校验）。 */
var SKILL_META_FILE = ".skill-source-meta.json";
var ProjectResourceLoader = class {
	baseDir;
	/**
	* @param configDir CLI 配置根目录（$CODEBUDDY_CONFIG_DIR 或 ~/.codebuddy）
	*/
	constructor(configDir) {
		this.baseDir = (0, node_path.join)(configDir, PROJECT_RESOURCES_DIR_NAME);
	}
	/**
	* 下载项目 skill 到隔离目录，返回路径供 env 注入。
	* best-effort：单项失败记日志但不阻塞。
	* 只在有 projectResources 时调用——普通本地任务不走这里。
	*/
	async installProjectSkills(projectId, resources) {
		const result = {
			skillDir: void 0,
			installedSkills: 0,
			failedSkills: []
		};
		const allSkills = [];
		if (resources.connectorSkills?.length) for (const s of resources.connectorSkills) allSkills.push({
			id: s.skillId,
			url: s.downloadUrl
		});
		if (resources.projectSkills?.length) for (const s of resources.projectSkills) allSkills.push({
			id: s.name,
			url: s.downloadUrl
		});
		const projectDir = (0, node_path.join)(this.baseDir, projectId);
		const relFromBase = (0, node_path.relative)((0, node_path.resolve)(this.baseDir), (0, node_path.resolve)(projectDir));
		if (!relFromBase || relFromBase.startsWith("..") || (0, node_path.isAbsolute)(relFromBase)) {
			import_src.default.error("[ProjectResourceLoader] projectId escapes project-resources base dir, refuse install", {
				projectId,
				baseDir: this.baseDir
			});
			return result;
		}
		const activeSkillIds = new Set(allSkills.map((skill) => skill.id));
		const canPrune = !resources.partial;
		import_src.default.info("[ProjectResourceLoader] installProjectSkills:resolve", {
			projectId,
			baseDir: this.baseDir,
			projectDir,
			allSkillCount: allSkills.length,
			allSkillIds: [...activeSkillIds],
			partial: !!resources.partial
		});
		if (!allSkills.length) {
			if (canPrune && (0, node_fs.existsSync)(projectDir)) await this.pruneInactiveSkillDirs(projectDir, activeSkillIds);
			else import_src.default.warn("[ProjectResourceLoader] empty but partial resource list, skip prune", { projectId });
			return result;
		}
		await (0, node_fs_promises.mkdir)(projectDir, { recursive: true });
		result.skillDir = projectDir;
		const CONCURRENCY = 5;
		for (let i = 0; i < allSkills.length; i += CONCURRENCY) {
			const batch = allSkills.slice(i, i + CONCURRENCY);
			const batchResults = await Promise.allSettled(batch.map((skill) => this.downloadAndInstallSkill(projectDir, skill.id, skill.url)));
			for (let j = 0; j < batchResults.length; j++) if (batchResults[j].status === "fulfilled") result.installedSkills++;
			else result.failedSkills.push(batch[j].id);
		}
		if (canPrune && result.failedSkills.length === 0) await this.pruneInactiveSkillDirs(projectDir, activeSkillIds);
		else import_src.default.warn("[ProjectResourceLoader] skip prune", {
			projectId,
			partial: !!resources.partial,
			failedSkills: result.failedSkills
		});
		import_src.default.info("[ProjectResourceLoader] installProjectSkills done", {
			projectId,
			skillDir: projectDir,
			installed: result.installedSkills,
			failed: result.failedSkills.length
		});
		return result;
	}
	/**
	* 删除不在本轮 active 列表里的技能目录。
	*
	* 这里必须真删，不能沿用「给 SKILL.md 写 `disable: true`」的老做法：
	* - 解压后的真实布局是 `<skillId>/<技能名>/SKILL.md`（zip 自带一层与技能同名的顶层
	*   目录），老实现只在 `<skillId>/SKILL.md` 找 frontmatter，浅一层，`existsSync` 恒
	*   为 false，disable 从来没有写进去过；
	* - 即便写进去了也不够：CLI 侧 `disable` 只映射成 `disableModelInvocation`，
	*   `SkillProductProvider` 仍会加载该技能并让它占住同名去重槽位，反而可能把新版本
	*   挤掉（见 packages/agent-cli/src/node/product/skill-product-provider.ts 的
	*   `addSkills` 按 name 去重 + `scanSkillsDirectory` 递归到 5 层）。
	*
	* 代价是重新启用某个技能时要再下载一次，远小于旧版本技能持续污染模型上下文。
	*/
	async pruneInactiveSkillDirs(projectDir, activeSkillIds) {
		let entries;
		try {
			entries = (0, node_fs.readdirSync)(projectDir, { withFileTypes: true });
		} catch (err) {
			import_src.default.warn("[ProjectResourceLoader] pruneInactiveSkillDirs readdir failed:", err);
			return;
		}
		for (const entry of entries) {
			if (!entry.isDirectory() || activeSkillIds.has(entry.name)) continue;
			const staleDir = (0, node_path.join)(projectDir, entry.name);
			try {
				await (0, node_fs_promises.rm)(staleDir, {
					recursive: true,
					force: true
				});
				import_src.default.info("[ProjectResourceLoader] pruned inactive skill dir", {
					projectDir,
					skillId: entry.name
				});
			} catch (err) {
				import_src.default.warn(`[ProjectResourceLoader] prune inactive skill dir ${staleDir} failed:`, err);
			}
		}
	}
	/**
	* 下载单个 skill zip 并解压到 projectDir/<skillId>/。
	* 如果目录已存在且有文件，跳过（简单缓存）。
	*/
	async downloadAndInstallSkill(projectDir, skillId, downloadUrl) {
		const skillDir = (0, node_path.join)(projectDir, skillId);
		const metaPath = (0, node_path.join)(skillDir, SKILL_META_FILE);
		const cachedMeta = this.readSkillMeta(metaPath);
		const hasCachedFiles = this.hasSkillFiles(skillDir);
		if (hasCachedFiles && !cachedMeta) return;
		await (0, node_fs_promises.mkdir)(skillDir, { recursive: true });
		const tempDir = await (0, node_fs_promises.mkdtemp)((0, node_path.join)((0, node_os.tmpdir)(), "wb-proj-skill-"));
		const zipPath = (0, node_path.join)(tempDir, `${skillId}.zip`);
		try {
			const conditionalHeaders = {};
			if (hasCachedFiles && cachedMeta) {
				if (cachedMeta.etag) conditionalHeaders["If-None-Match"] = cachedMeta.etag;
				if (cachedMeta.lastModified) conditionalHeaders["If-Modified-Since"] = cachedMeta.lastModified;
			}
			const response = await fetch(downloadUrl, { headers: conditionalHeaders });
			if (response.status === 304) return;
			if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);
			if (hasCachedFiles) {
				await (0, node_fs_promises.rm)(skillDir, {
					recursive: true,
					force: true
				}).catch(() => {});
				await (0, node_fs_promises.mkdir)(skillDir, { recursive: true });
			}
			const writeStream = (0, node_fs.createWriteStream)(zipPath);
			await (0, node_stream_promises.pipeline)(node_stream.Readable.fromWeb(response.body), writeStream);
			new import_adm_zip.default(zipPath).extractAllTo(skillDir, true);
			this.writeSkillMeta(metaPath, {
				etag: response.headers.get("etag") ?? void 0,
				lastModified: response.headers.get("last-modified") ?? void 0
			});
			import_src.default.info(`[ProjectResourceLoader] skill installed: ${skillId}`);
		} catch (err) {
			await (0, node_fs_promises.rm)(skillDir, {
				recursive: true,
				force: true
			}).catch(() => {});
			import_src.default.warn(`[ProjectResourceLoader] skill ${skillId} download failed:`, err);
			throw err;
		} finally {
			await (0, node_fs_promises.rm)(tempDir, {
				recursive: true,
				force: true
			}).catch(() => {});
		}
	}
	/** skill 目录是否含真实文件（排除 meta 文件本身）。 */
	hasSkillFiles(skillDir) {
		if (!(0, node_fs.existsSync)(skillDir)) return false;
		try {
			return (0, node_fs.readdirSync)(skillDir).some((name) => name !== SKILL_META_FILE);
		} catch {
			return false;
		}
	}
	readSkillMeta(metaPath) {
		if (!(0, node_fs.existsSync)(metaPath)) return;
		try {
			const parsed = JSON.parse((0, node_fs.readFileSync)(metaPath, "utf-8"));
			if (!parsed.etag && !parsed.lastModified) return;
			return {
				etag: parsed.etag,
				lastModified: parsed.lastModified
			};
		} catch {
			return;
		}
	}
	writeSkillMeta(metaPath, meta) {
		if (!meta.etag && !meta.lastModified) return;
		try {
			(0, node_fs.writeFileSync)(metaPath, JSON.stringify(meta), "utf-8");
		} catch {}
	}
};
//#endregion
//#region src/main/skills/project-resource-manager.ts
/**
* ProjectResourceManager — 项目本地任务资源的统一管理器。
*
* 职责：
* 1. 管理 per-project 的 skill 目录 + sanitized MCP config 状态
* 2. 维护 sessionId → projectId 的映射，让 backend 能按 sessionId 取环境变量和 MCP servers
* 3. 支持项目 connector 动态变化时刷新资源
* 4. 磁盘只持久化不含 token 的 MCP server 状态，运行时再按 session 注入 token
* 5. 对外提供 getEnvForSession / getMcpServersForSession，backend initializeInternal 调用
*
* 设计原则：
* - 替换 ws-rpc-bootstrap 里的简单 Map 缓存
* - 不侵入 ConnectorService / SessionManager / CLI
* - 独立模块，createSession/loadSession handler 调用注册/查询方法
* - 只有项目本地任务的 session 才有数据，普通任务返回 undefined
*/
var BUILTIN_PROJECT_MCPS = [{
	serverName: "wb-issues",
	path: "/console/agent-gateway/wb-issues/_internal/issues/mcp",
	description: "Project todo/issue management MCP. Tools: todo_list (filter by status/scope), todo_show (details + allowed transitions + attachments), todo_create, todo_update, todo_delete, todo_transition (status change), todo_statuses, todo_history, todo_comments, todo_add_comment, todo_update_comment, todo_delete_comment, todo_add_attachment, todo_remove_attachment, project_members.",
	needsUserId: true,
	deferLoading: true
}];
var ProjectResourceManager = class {
	configDir;
	loader;
	getToken;
	getEndpoint;
	getUserId;
	/** projectId → 资源状态 */
	projectStates = /* @__PURE__ */ new Map();
	/** sessionId → projectId 映射 */
	sessionProjectMap = /* @__PURE__ */ new Map();
	constructor(deps) {
		this.configDir = deps.configDir;
		this.loader = deps.loader ?? new ProjectResourceLoader(deps.configDir);
	}
	/** 注入 token 获取函数（app 启动后调用） */
	setTokenProvider(getToken) {
		this.getToken = getToken;
	}
	/** 注入 endpoint 获取函数（用于拼内置 MCP 的 url）。 */
	setEndpointProvider(getEndpoint) {
		this.getEndpoint = getEndpoint;
	}
	/** 注入当前用户 ID 获取函数（内置 MCP 的 x-user-id 头需要）。 */
	setUserIdProvider(getUserId) {
		this.getUserId = getUserId;
	}
	/**
	* 创建新的项目本地任务时调用：下载 skill + 准备 MCP config。
	* 返回值会被 merge 到 opts.env 传给 CLI sidecar。
	*/
	async registerSession(sessionId, projectId, resources) {
		this.sessionProjectMap.set(sessionId, projectId);
		const loadResult = await this.loader.installProjectSkills(projectId, resources);
		const mcpConfigJson = this.buildMcpConfigJson(projectId, resources);
		const state = {
			skillDir: loadResult.skillDir,
			mcpConfigJson
		};
		this.projectStates.set(projectId, state);
		if (mcpConfigJson) this.persistMcpConfig(projectId, mcpConfigJson);
		else this.removeMcpConfig(projectId);
		return this.buildEnv(state, projectId);
	}
	/**
	* 恢复历史对话时调用：根据 projectId 恢复资源 env。
	* 从内存缓存或磁盘恢复。
	*/
	registerSessionFromRecord(sessionId, projectId) {
		this.sessionProjectMap.set(sessionId, projectId);
		if (this.projectStates.has(projectId)) return;
		const state = this.restoreProjectState(projectId);
		if (state) this.projectStates.set(projectId, state);
	}
	/**
	* backend initializeInternal 调用：获取 session 对应的项目资源 env。
	* 普通任务返回 undefined。
	*/
	getEnvForSession(sessionId) {
		const projectId = this.sessionProjectMap.get(sessionId);
		if (!projectId) return;
		const state = this.projectStates.get(projectId);
		if (!state) return;
		return this.buildEnv(state, projectId);
	}
	/** 获取当前 session 对应项目的 MCP servers，避免跨项目合并。 */
	getMcpServersForSession(sessionId) {
		const projectId = this.sessionProjectMap.get(sessionId);
		if (!projectId) return;
		const state = this.projectStates.get(projectId) ?? this.restoreProjectState(projectId) ?? void 0;
		if (!state?.mcpConfigJson) return;
		const token = this.getToken?.();
		const userId = this.getUserId?.();
		const servers = {};
		try {
			const parsed = JSON.parse(state.mcpConfigJson);
			for (const [name, config] of Object.entries(parsed.mcpServers || {})) {
				const cfg = config;
				if (cfg.disabled) continue;
				const sanitized = this.sanitizeMcpServerConfig(cfg);
				const builtin = BUILTIN_PROJECT_MCPS.find((b) => b.serverName === name);
				const needsUserId = builtin?.needsUserId ?? false;
				const headers = { ...sanitized.headers || {} };
				if (token) headers.Authorization = `Bearer ${token}`;
				if (needsUserId && userId) headers["x-user-id"] = userId;
				if (projectId) headers["x-project-id"] = projectId;
				servers[name] = {
					url: sanitized.url,
					type: sanitized.type || "http",
					description: sanitized.description,
					defer_loading: builtin ? builtin.deferLoading : sanitized.defer_loading ?? false,
					...Object.keys(headers).length ? { headers } : {}
				};
			}
		} catch {}
		return Object.keys(servers).length ? servers : void 0;
	}
	/** 账号重登预热：快照当前已注册 session 的项目内置/connector MCP 描述。 */
	getMcpServersSnapshotBySession() {
		const snapshot = {};
		for (const sessionId of this.sessionProjectMap.keys()) {
			const servers = this.getMcpServersForSession(sessionId);
			if (servers) snapshot[sessionId] = servers;
		}
		return snapshot;
	}
	/**
	* 项目 connector 变化时刷新资源（动态添加/删除 connector）。
	* 重新下载 skill + 更新 sanitized MCP config；已运行 CLI 不热更新 MCP，下次 backend restart/create 生效。
	*/
	async refreshProjectResources(projectId, resources) {
		const loadResult = await this.loader.installProjectSkills(projectId, resources);
		const mcpConfigJson = this.buildMcpConfigJson(projectId, resources);
		const state = {
			skillDir: loadResult.skillDir,
			mcpConfigJson
		};
		this.projectStates.set(projectId, state);
		if (mcpConfigJson) this.persistMcpConfig(projectId, mcpConfigJson);
		else this.removeMcpConfig(projectId);
		import_src.default.info("[ProjectResourceManager] refreshProjectResources done", { projectId });
	}
	buildMcpConfigJson(projectId, resources) {
		const mcpServers = {};
		const existing = this.projectStates.get(projectId) ?? this.restoreProjectState(projectId) ?? void 0;
		if (existing?.mcpConfigJson) try {
			const parsed = JSON.parse(existing.mcpConfigJson);
			for (const [name, config] of Object.entries(parsed.mcpServers || {})) mcpServers[name] = {
				...this.sanitizeMcpServerConfig(config),
				disabled: true
			};
		} catch {}
		for (const mcp of resources.mcpServers ?? []) mcpServers[mcp.serverName] = {
			url: mcp.gatewayUrl,
			type: mcp.transport || "http",
			defer_loading: true,
			description: `Project connector MCP server: ${mcp.connectorName}`
		};
		const endpoint = this.getEndpoint?.()?.replace(/\/+$/, "");
		if (endpoint) for (const builtin of BUILTIN_PROJECT_MCPS) mcpServers[builtin.serverName] = {
			url: endpoint + builtin.path,
			type: "http",
			defer_loading: builtin.deferLoading,
			description: builtin.description
		};
		return Object.keys(mcpServers).length ? JSON.stringify({ mcpServers }) : void 0;
	}
	buildEnv(state, _projectId) {
		const env = {};
		if (state.skillDir) env.CODEBUDDY_SESSION_SKILL_DIRS = state.skillDir;
		return env;
	}
	/** 持久化 MCP config 到 project-resources/<projectId>/mcp.json（不写入 token）。 */
	persistMcpConfig(projectId, json) {
		try {
			const dir = (0, node_path.join)(this.configDir, PROJECT_RESOURCES_DIR_NAME, projectId);
			(0, node_fs.mkdirSync)(dir, { recursive: true });
			(0, node_fs.writeFileSync)((0, node_path.join)(dir, "mcp.json"), this.sanitizeMcpConfigJson(json), "utf-8");
		} catch (err) {
			import_src.default.warn("[ProjectResourceManager] persistMcpConfig failed:", err);
		}
	}
	sanitizeMcpConfigJson(json) {
		try {
			const parsed = JSON.parse(json);
			for (const [name, config] of Object.entries(parsed.mcpServers || {})) parsed.mcpServers[name] = this.sanitizeMcpServerConfig(config);
			return JSON.stringify(parsed);
		} catch {
			return json;
		}
	}
	sanitizeMcpServerConfig(config) {
		const next = { ...config || {} };
		if (next.headers) {
			const headers = { ...next.headers };
			delete headers.Authorization;
			delete headers.authorization;
			if (Object.keys(headers).length > 0) next.headers = headers;
			else delete next.headers;
		}
		return next;
	}
	/** 清除旧的 MCP config 文件（connector 断开/删除后避免残留） */
	removeMcpConfig(projectId) {
		try {
			const mcpFile = (0, node_path.join)(this.configDir, PROJECT_RESOURCES_DIR_NAME, projectId, "mcp.json");
			if ((0, node_fs.existsSync)(mcpFile)) (0, node_fs.unlinkSync)(mcpFile);
		} catch {}
	}
	/** 从文件系统恢复项目资源状态 */
	restoreProjectState(projectId) {
		const projectDir = (0, node_path.join)(this.configDir, PROJECT_RESOURCES_DIR_NAME, projectId);
		if (!(0, node_fs.existsSync)(projectDir)) return null;
		const state = {};
		try {
			if ((0, node_fs.readdirSync)(projectDir).filter((e) => e !== "mcp.json").length > 0) state.skillDir = projectDir;
		} catch {}
		const mcpFile = (0, node_path.join)(projectDir, "mcp.json");
		if ((0, node_fs.existsSync)(mcpFile)) try {
			state.mcpConfigJson = this.sanitizeMcpConfigJson((0, node_fs.readFileSync)(mcpFile, "utf-8"));
		} catch {}
		return state.skillDir || state.mcpConfigJson ? state : null;
	}
};
/** 全局单例，所有消费方直接 import 使用 */
var projectResourceManager = new ProjectResourceManager({ configDir: process.env.CODEBUDDY_CONFIG_DIR || (0, node_path.join)((0, node_os.homedir)(), ".codebuddy") });
//#endregion
//#region src/main/system/runtime/native-runtime-build-config.ts
function getBuildTimeNativeRuntimeBaseUrl() {
	"".trim();
}
//#endregion
//#region src/main/features/desktop-host/noop-desktop-host.ts
var NOOP_DESKTOP_HOST_APP = {
	getName: () => "WorkBuddy",
	getVersion: () => "0.0.0",
	getPlatform: () => process.platform,
	getLocale: () => "en",
	getConfigDir: () => "",
	isPackaged: () => false,
	getAutoLaunchEnabled: () => false,
	setAutoLaunchEnabled: () => void 0,
	reconcileAutoLaunchOnStartup: async () => void 0,
	showAboutDialog: async () => void 0,
	quit: () => void 0
};
var NOOP_DESKTOP_HOST_DIALOG = {
	showOpenDialog: async () => ({
		canceled: true,
		filePaths: []
	}),
	showSaveDialog: async () => ({ canceled: true }),
	showMessageBox: async () => ({ response: 0 })
};
var NOOP_DESKTOP_HOST_SHELL = {
	openExternal: async () => {
		throw new Error("DesktopHost.shell.openExternal is not available");
	},
	openPath: async () => {
		throw new Error("DesktopHost.shell.openPath is not available");
	},
	showItemInFolder: () => {
		throw new Error("DesktopHost.shell.showItemInFolder is not available");
	}
};
function desktopHostUnavailable(capability) {
	throw new Error(`DesktopHost.${capability} is not available`);
}
var NOOP_DESKTOP_HOST_CLIPBOARD = {
	readText: () => desktopHostUnavailable("clipboard.readText"),
	readImageAsPng: () => desktopHostUnavailable("clipboard.readImageAsPng"),
	writeText: () => desktopHostUnavailable("clipboard.writeText"),
	write: () => desktopHostUnavailable("clipboard.write"),
	writeImageFromDataUrl: () => desktopHostUnavailable("clipboard.writeImageFromDataUrl")
};
var NOOP_DESKTOP_HOST_SESSION = { cookies: {
	set: async () => desktopHostUnavailable("session.cookies.set"),
	get: async () => desktopHostUnavailable("session.cookies.get"),
	remove: async () => desktopHostUnavailable("session.cookies.remove")
} };
var NOOP_DESKTOP_HOST = {
	app: NOOP_DESKTOP_HOST_APP,
	dialog: NOOP_DESKTOP_HOST_DIALOG,
	shell: NOOP_DESKTOP_HOST_SHELL,
	clipboard: NOOP_DESKTOP_HOST_CLIPBOARD,
	network: {
		isOnline: () => true,
		fetch: async () => ({
			ok: false,
			status: 503,
			statusText: "Service Unavailable",
			url: "",
			headers: new Headers(),
			body: null,
			json: async () => ({}),
			text: async () => "",
			arrayBuffer: async () => /* @__PURE__ */ new ArrayBuffer(0)
		}),
		getDefaultSession: () => NOOP_DESKTOP_HOST_SESSION,
		getSessionPartition: () => NOOP_DESKTOP_HOST_SESSION,
		clearDefaultSessionCookiesForDomains: async () => 0,
		resolveProxy: async () => "DIRECT",
		applyProxySettings: async () => ({
			HTTP_PROXY: "",
			HTTPS_PROXY: "",
			NO_PROXY: ""
		})
	},
	auth: {
		decryptLegacyAuthSession: async () => void 0,
		getTuringDeviceToken: async () => ({})
	},
	window: {
		minimize: () => void 0,
		maximize: () => void 0,
		close: () => void 0,
		isMaximized: () => false,
		cancelPendingClose: () => void 0,
		confirmClose: () => void 0,
		setTrafficLightsVisible: () => void 0,
		reload: () => void 0,
		updateTitleBarOverlay: () => void 0,
		syncNativeThemeColors: () => void 0,
		getColorScheme: async () => void 0,
		isFullscreen: () => false,
		setFullscreen: () => void 0,
		toggleFullscreen: () => false,
		startWindowDrag: () => void 0,
		endWindowDrag: () => void 0,
		isFocused: () => false,
		onFocusChange: () => () => void 0,
		onFullscreenChange: () => () => void 0,
		onMaximizeChange: () => () => void 0,
		isDevToolsOpened: () => false,
		onDevToolsOpenedChange: () => () => void 0,
		send: () => false,
		toggleDevTools: () => void 0,
		performEditCommand: () => void 0
	},
	notification: {
		isSupported: () => false,
		requestRegistration: async () => void 0,
		send: () => false
	},
	permissions: {
		getMicrophonePermissionStatus: () => "unknown",
		getMicrophonePermission: async () => "unknown",
		requestMicrophonePermission: async () => "unknown",
		openMicrophoneSystemSettings: async () => void 0,
		checkAccessibility: () => "unauthorized"
	},
	wechatShare: {
		shareLink: async () => ({
			success: false,
			errcode: 7,
			errmsg: "WeChat share host is unavailable"
		}),
		launchMiniProgram: async () => ({
			success: false,
			errcode: 7,
			errmsg: "WeChat share host is unavailable"
		}),
		shareMiniProgram: async () => ({
			success: false,
			errcode: 7,
			errmsg: "WeChat share host is unavailable"
		}),
		shareFile: async () => ({
			success: false,
			errcode: 7,
			errmsg: "WeChat share host is unavailable"
		}),
		shareImage: async () => ({
			success: false,
			errcode: 7,
			errmsg: "WeChat share host is unavailable"
		})
	},
	globalShortcut: { updateToggleWindow: (accelerator) => ({
		success: false,
		accelerator
	}) },
	showTaskCompletedNotification: () => false,
	showTaskPendingNotification: () => false,
	registerLocalStorageMigrationCompletion: () => () => void 0
};
//#endregion
//#region ../../packages/ardot-infra/src/design-feature-override.ts
/**
* Ardot 设计入口特性开关 + 临时 override 常量的 **跨进程 SSOT**。
*
* renderer(`@genie/agent-ui` utils/ardot-design-feature.ts) 与 desktop 主进程
* (`apps/workbuddy-desktop` main/system/runtime/ardot-design-feature.ts) 都必须
* 从同一份 gate 实现 + 同一个 globalThis override key 出发。两端如果字符串或
* 判定逻辑漂移(哪怕只是拼写差异 / 一端多加一层 log),会造成:
*   UI 显示设计入口(renderer override=true) → 用户新建 design 会话 →
*   daemon 校验失败(desktop 主进程 override=false, isDesignFeatureEnabled 走
*   EnableArdot 严格判定)。
*
* 通过把 `ENABLE_ARDOT_DESIGN_FEATURE` / `isEnableArdotDesignEnabled` /
* `hasArdotDesignUngateOverride` / `ARDOT_DESIGN_UNGATE_GLOBAL_KEY` 全部收敛在
* 本文件,重命名 / typo / 判定分支新增在 tsc / grep 一致失败,不再需要依赖
* 两端注释互相引用来维系约定。renderer 与 desktop 的本地 wrapper 仅保留
* 类型 / enum 校验断言,判定逻辑不重复。
*
* ⚠️ override 属于临时通道,与 issue #72191 的收尾清单绑定;正式全量发布 /
* 早期体验结束后,请同时删除本文件与两端 wrapper 中 override 分支的引用点。
*/
/** ProductFeature key,与 `@genie/product` `ProductFeature.EnableArdot` 保持字面量一致。 */
var ENABLE_ARDOT_DESIGN_FEATURE$1 = "EnableArdot";
var ARDOT_DESIGN_UNGATE_GLOBAL_KEY = "__ARDOT_DESIGN_UNGATE__";
/**
* 读取当前进程 `globalThis` 上的 override 值。跨端复用同一实现,避免任一端
* 出现『读到 truthy 就放行』或『严格 === true』的语义分裂。
*
* 语义:仅在 override === true(严格布尔)时视为放开;其它值(undefined /
* 字符串 'true' / 1 等)一律视为未设置,保持默认的 EnableArdot 判定。
*/
function hasArdotDesignUngateOverride() {
	try {
		if (typeof globalThis === "undefined") return false;
		return globalThis[ARDOT_DESIGN_UNGATE_GLOBAL_KEY] === true;
	} catch {
		return false;
	}
}
/**
* Ardot 设计入口最终判定。renderer(UI) 与 desktop 主进程(daemon 校验) 共同 owner:
*   - override === true → 直接放行(内部灰度通道,SSOT 仍在 EnableArdot)
*   - 否则严格判断 productFeatures?.EnableArdot === true
*
* 后续新增日志 / 多层灰度 / 到期兜底等分支时,只需要改这一份实现,renderer 与
* daemon 侧自动同步。
*/
function isEnableArdotDesignEnabled$1(productFeatures) {
	if (hasArdotDesignUngateOverride()) return true;
	return productFeatures?.[ENABLE_ARDOT_DESIGN_FEATURE$1] === true;
}
//#endregion
//#region src/main/system/runtime/ardot-design-feature.ts
require_code_cache.init_common$3();
/**
* Ardot Design 入口特性开关 desktop 主进程引用点。
*
* 判定逻辑收敛在 `@genie/ardot-infra/design-feature-override`(跨进程 SSOT),
* renderer 与 desktop 主进程都从该共享包 import;本文件仅做类型 / enum 校验:
*
*   1. `ENABLE_ARDOT_DESIGN_FEATURE` 沿用 `ProductFeature.EnableArdot` 的 enum
*      作为 key(desktop 侧倾向 enum 而非 string 字面量),用运行时断言把 enum
*      与共享 SSOT 常量字面量绑死 —— 一旦有人改了 renderer / desktop / product
*  三处任一常量,tsc 会先失败或运行时立刻抛错,不会静默漂移。
*   2. 通过 re-export `sharedIsEnableArdotDesignEnabled` 保持既有 daemon-bootstrap
*      的 import 路径不变(`./ardot-design-feature`),避免大规模 refactor。
*
* Gating 完全由 `EnableArdot` feature flag 决定;海外构建的关闭由 product 配置
* (缺省即 false)实现,不再用构建目录(workbuddy-ai)强制 false,与 renderer 端
* `packages/agent-ui/src/utils/ardot-design-feature.ts` 保持一致。
*/
var ENABLE_ARDOT_DESIGN_FEATURE = require_code_cache.ProductFeature.EnableArdot;
if (ENABLE_ARDOT_DESIGN_FEATURE !== "EnableArdot") throw new Error(`[ardot-design-feature] ENABLE_ARDOT_DESIGN_FEATURE mismatch: ProductFeature.EnableArdot="${ENABLE_ARDOT_DESIGN_FEATURE}" vs shared="${ENABLE_ARDOT_DESIGN_FEATURE$1}"`);
var isEnableArdotDesignEnabled = isEnableArdotDesignEnabled$1;
//#endregion
//#region ../../packages/workbuddy-server/src/appearance/cloud-appearance-repo.ts
/** 默认路由前缀（Web 端） */
var DEFAULT_ROUTE_PREFIX = "/portal";
/** 默认平台标识（与 Desktop RPC handler 保持一致） */
var DEFAULT_PLATFORM = "client";
var SELECTION_RESOURCE_KEY = /^[a-z0-9][a-z0-9_-]{0,63}$/;
/**
* 校验 resource_key 是**真字符串**且符合值域。
*
* 不能直接 `SELECTION_RESOURCE_KEY.test(value)`：RegExp.test 会先 String() 化实参，
* `test(undefined)` 实际测的是 `"undefined"`、`test(null)` 测的是 `"null"`，两者全小写
* 字母、都能通过值域正则 —— 守卫直接被绕过，`resource_key: undefined` 进了请求体，
* 又被 JSON.stringify 静默丢字段，最后发出 `{"kind":"theme"}` 这种**缺参请求**打到
* 网关（表现为 502 / 17441，且端上日志毫无线索）。#102847
*/
function isValidResourceKey(value) {
	return typeof value === "string" && SELECTION_RESOURCE_KEY.test(value);
}
/**
* 后端 vip_level 到领域模型 vipLevel 的映射。
* - `standard` 为后端历史命名（产品「标准版」），收敛到 `pro`。
* - `flagship` / `exclusive` 与 `ultimate` 同档（旗舰/尊享），全部归一到 `ultimate`，
*   下游按 `ultimate` 统一处理，避免 DTO 端出现的账号版本细分穿透到 UI。
*/
var VIP_LEVEL_MAP = {
	free: "free",
	standard: "pro",
	pro: "pro",
	advanced: "advanced",
	ultimate: "ultimate",
	flagship: "ultimate",
	exclusive: "ultimate"
};
var RESOURCE_KINDS = /* @__PURE__ */ new Set(["theme", "color"]);
var APPEARANCE_MODES = /* @__PURE__ */ new Set([
	"light",
	"dark",
	"system"
]);
var THEME_SERIES_DTO = /* @__PURE__ */ new Set([
	"craft",
	"collection",
	"coop"
]);
/** 有效期日期格式：`YYYY-MM-DD`（北京时间），与 updated_at 的毫秒时间戳口径不同 */
var VALIDITY_DATE = /^\d{4}-\d{2}-\d{2}$/;
function withId(id, msg) {
	return `${msg} [resource=${typeof id === "string" && id ? id : "<no-id>"}]`;
}
function assertAppearanceVipLevel(value, id) {
	if (typeof value !== "string" || !Object.prototype.hasOwnProperty.call(VIP_LEVEL_MAP, value)) throw new Error(withId(id, `unsupported vip_level: ${String(value)}`));
}
function assertNonEmptyString(value, field, id) {
	if (typeof value !== "string" || !value.trim() || value.length > 256) throw new Error(withId(id, `invalid ${field}`));
}
function assertOptionalHttpsUrl(value, field, id) {
	if (value === void 0) return;
	if (typeof value !== "string") throw new Error(withId(id, `invalid ${field}`));
	try {
		const url = new URL(value);
		if (url.protocol !== "https:" || url.username || url.password || url.port) throw new Error("unsafe");
	} catch {
		throw new Error(withId(id, `invalid ${field}`));
	}
}
function assertValidityDate(value, field, id) {
	if (value === void 0) return;
	if (typeof value !== "string" || !VALIDITY_DATE.test(value) || !Number.isFinite(Date.parse(value))) throw new Error(withId(id, `invalid ${field}`));
}
function assertResourceDTO(dto) {
	assertNonEmptyString(dto.id, "id");
	assertNonEmptyString(dto.name, "name", dto.id);
	assertNonEmptyString(dto.name_en, "name_en", dto.id);
	if (!RESOURCE_KINDS.has(dto.kind)) throw new Error(withId(dto.id, "invalid kind"));
	assertAppearanceVipLevel(dto.vip_level, dto.id);
	if (!Number.isFinite(dto.updated_at) || dto.updated_at < 0) throw new Error(withId(dto.id, "invalid updated_at"));
	assertOptionalHttpsUrl(dto.cover_url, "cover_url", dto.id);
	assertOptionalHttpsUrl(dto.preview_url, "preview_url", dto.id);
	assertOptionalHttpsUrl(dto.zip_url, "zip_url", dto.id);
	if (dto.validity_type !== void 0 && dto.validity_type !== "limited") throw new Error(withId(dto.id, `unsupported validity_type: ${String(dto.validity_type)}`));
	assertValidityDate(dto.valid_from, "valid_from", dto.id);
	assertValidityDate(dto.valid_to, "valid_to", dto.id);
	if (dto.kind === "theme") {
		if (!THEME_SERIES_DTO.has(dto.series)) throw new Error(withId(dto.id, "invalid series"));
		if (!APPEARANCE_MODES.has(dto.appearance)) throw new Error(withId(dto.id, "invalid appearance"));
	}
}
function summarizeResources(resources) {
	if (!Array.isArray(resources)) return `type=${typeof resources}`;
	const sample = resources.slice(0, 3).map((r) => ({
		id: r?.id,
		kind: r?.kind,
		vip_level: r?.vip_level,
		series: r?.series,
		appearance: r?.appearance,
		has_zip: typeof r?.zip_url === "string"
	}));
	return `count=${resources.length} sample=${JSON.stringify(sample)}`;
}
/**
* 已失效资源列表（后端 invalid_resources）。
*
* 逐条宽容解析：这份数据只用来判"当前皮肤是不是已过期下架"，一条脏数据不能让
* 整个目录拉取失败——那会导致 catalog 永久 not-ready，皮肤再也切不过去。
*/
function mapInvalidResources(value, kind) {
	if (!Array.isArray(value)) return [];
	const mapped = [];
	for (const dto of value) {
		if (dto?.kind !== kind) continue;
		try {
			mapped.push(mapResourceDTO(dto));
		} catch {}
	}
	return mapped;
}
function mapSelectionDTO(value) {
	const dto = value;
	if (!dto || !RESOURCE_KINDS.has(dto.kind) || !isValidResourceKey(dto.resource_key) || typeof dto.updated_at !== "string" || !Number.isFinite(Date.parse(dto.updated_at))) throw new Error("invalid appearance selection");
	return {
		kind: dto.kind,
		resourceKey: dto.resource_key,
		updatedAt: dto.updated_at
	};
}
var CloudAppearanceRepo = class {
	constructor({ context, runtime, routePrefix, platform }) {
		this.ctx = context;
		this.runtime = runtime;
		this.routePrefix = routePrefix ?? DEFAULT_ROUTE_PREFIX;
		this.platform = platform ?? DEFAULT_PLATFORM;
	}
	async getSelections() {
		const resp = await this.ctx.http.get(`${this.routePrefix}/user-asset/appearance/get`);
		const body = this.unwrapResponse(resp);
		this.assertSuccess(body);
		if (!Array.isArray(body?.data?.items)) throw new Error("bad response: missing data.items");
		return body.data.items.map(mapSelectionDTO);
	}
	async setSelection(kind, resourceKey) {
		if (!RESOURCE_KINDS.has(kind) || !isValidResourceKey(resourceKey)) throw new Error(`invalid appearance selection: kind=${String(kind)} resource_key=${String(resourceKey)}`);
		const payload = {
			kind,
			resource_key: resourceKey
		};
		const resp = await this.ctx.http.post(`${this.routePrefix}/user-asset/appearance/set`, payload);
		const body = this.unwrapResponse(resp);
		this.assertSuccess(body);
		return mapSelectionDTO(body?.data);
	}
	async listResources(options) {
		return (await this.listCatalog(options)).resources;
	}
	async listCatalog(options) {
		const { version, lang, kind } = this.resolveRuntimeParams(options);
		const resp = await this.ctx.http.post(`${this.routePrefix}/operation-platform/appearance/resources`, {
			platform: this.platform,
			kind,
			version,
			lang
		});
		const body = this.unwrapResponse(resp);
		if (body?.code !== 0) throw new Error(`bad response: code=${body?.code}, msg=${body?.msg}`);
		if (!Array.isArray(body?.data?.resources)) throw new Error("bad response: missing data.resources");
		const filtered = body.data.resources.filter((dto) => dto?.kind === kind);
		let resources;
		try {
			resources = filtered.map(mapResourceDTO);
		} catch (error) {
			throw new Error(`${String(error?.message ?? error)} | summary: ${summarizeResources(filtered)}`);
		}
		return {
			resources,
			invalidResources: mapInvalidResources(body.data.invalid_resources, kind)
		};
	}
	assertSuccess(body) {
		if (body?.code !== 0) throw new Error(`bad response: code=${body?.code}, msg=${body?.msg}, requestId=${body?.requestId ?? "<none>"}`);
	}
	/**
	* 兼容两种 http 返回格式：
	* - Web httpService (Axios)：返回 { data: { code, msg, data, ... } }
	* - Desktop createMainProcessHttp：直接返回 JSON body { code, msg, data, ... }
	* 区分方式：如果 resp 本身含 code 字段，说明是直返 envelope；否则取 resp.data
	*/
	unwrapResponse(resp) {
		return "code" in (resp ?? {}) ? resp : resp?.data;
	}
	/**
	* 统一解析 runtime 参数：
	* - version 来自 runtime getter
	* - lang 优先 options.lang（renderer 端 i18n 实时值），否则回退 runtime.getLang
	* - kind 默认 'theme'（本期 UI 只消费主题）
	* - edition 不传，由后端根据用户身份自动推断
	*/
	resolveRuntimeParams(options) {
		return {
			version: this.runtime.getVersion(),
			lang: options?.lang ?? this.runtime.getLang(),
			kind: options?.kind ?? "theme"
		};
	}
};
/**
* 后端资源 DTO → 领域模型映射。
*
* 字段重命名：id→resourceKey，name→nameZh，vip_level→vipLevel（含 standard→pro 归一化）。
* 主题 appearance 直接透传，语义与 spec §3.2 对齐（light/dark/system）。
* 有效期只在 validity_type==='limited' 时映射；permanent 皮肤后端不下发这三个字段。
*/
function mapResourceDTO(dto) {
	assertResourceDTO(dto);
	if (dto.kind === "theme") return mapThemeDTO(dto);
	return mapColorDTO(dto);
}
/** 限时皮肤的有效期区间；permanent 时返回空对象，领域模型上不出现这两个 key。 */
function mapValidity(dto) {
	if (dto.validity_type !== "limited") return {};
	return {
		...dto.valid_from ? { validFrom: dto.valid_from } : {},
		...dto.valid_to ? { validTo: dto.valid_to } : {}
	};
}
function mapThemeDTO(dto) {
	return {
		kind: "theme",
		resourceKey: dto.id,
		nameZh: dto.name,
		nameEn: dto.name_en,
		vipLevel: VIP_LEVEL_MAP[dto.vip_level],
		updatedAt: dto.updated_at,
		coverUrl: dto.cover_url,
		previewUrl: dto.preview_url,
		zipUrl: dto.zip_url,
		series: dto.series,
		appearance: dto.appearance,
		...mapValidity(dto)
	};
}
function mapColorDTO(dto) {
	return {
		kind: "color",
		resourceKey: dto.id,
		nameZh: dto.name,
		nameEn: dto.name_en,
		vipLevel: VIP_LEVEL_MAP[dto.vip_level],
		updatedAt: dto.updated_at,
		coverUrl: dto.cover_url,
		previewUrl: dto.preview_url,
		zipUrl: dto.zip_url,
		...mapValidity(dto)
	};
}
/**
* rewrite 后 CSS 的落盘文件名，**带 URL 格式版本号**。
*
* v1 产物（`skin.css`）里写的是 `local-file:///C%3A/...`，该形态在 Windows 上已被
* Chromium 判为非法 host 而整包资源加载失败（#99682）。目录名只按 `updatedAt` 变化，
* 皮肤没更新就会一直命中旧产物，所以格式变更必须靠文件名版本号让老缓存 miss、
* 重新走一遍 rewrite。旧的 `skin.css` 不再被读取，随目录被 LRU 淘汰即可。
*/
var REWRITTEN_CSS_FILENAME = "skin.v2.css";
/** 单个 zip 下载 + 解压总时长兜底（避免慢网导致 UI 长期挂起） */
var DEFAULT_DOWNLOAD_TIMEOUT_MS = 6e4;
/** 单个 zip 未压缩大小上限（20MB），防止 zip bomb */
var DEFAULT_MAX_UNZIPPED_BYTES = 20971520;
/** 单个 zip 条目数上限，防止 zip bomb */
var DEFAULT_MAX_ENTRIES = 500;
/** 允许直接内嵌到 CSS `url()` 里的资源扩展名白名单 */
var ALLOWED_ASSET_EXTS = /* @__PURE__ */ new Set([
	".css",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".svg",
	".woff",
	".woff2",
	".ttf",
	".otf",
	".mp4",
	".webm",
	".mov",
	".m4v",
	".ogv",
	".mp3",
	".m4a",
	".wav",
	".ogg"
]);
/**
* macOS 在 Finder 压缩时会塞入 `__MACOSX/._xxx`（AppleDouble）与 `.DS_Store`。
* 它们没有可用扩展名，会被白名单判为非法条目而让整个主题包解压失败，
* 只能回落慢路径重下 zip。这类条目不落盘也不影响渲染，直接跳过。#93057
*/
function isMacOsNoiseEntry(name) {
	const base = name.slice(name.lastIndexOf("/") + 1);
	return name.startsWith("__MACOSX/") || base === ".DS_Store" || base.startsWith("._");
}
/**
* 校验 resourceKey 只包含 URL-safe 字符 —— 避免路径穿越，同时避免 zip 名怪字符污染目录名。
* spec §3.2 允许 id 为字符串；我们再收敛一层。
*/
function assertSafeResourceKey(key) {
	if (!/^[A-Za-z0-9._-]+$/.test(key) || key === "." || key === "..") throw new Error(`unsafe resourceKey: ${key}`);
}
/**
* 计算标准目录名 `<resourceKey>-<updatedAt>`。updatedAt 已是数值 epoch ms，
* 与 resource cache key 语义一致：只要 updatedAt 不变就复用现有解压结果。
*/
function computeDirName(theme) {
	assertSafeResourceKey(theme.resourceKey);
	return `${theme.resourceKey}-${theme.updatedAt}`;
}
/**
* 把绝对文件路径转为 `local-file://` URL。
*
* **必须走固定 host `local://` 形态**：`local-file` scheme 注册了 `standard` 特权
* （`<video>` 播放的前置条件），Chromium 会按 `scheme://host/path` 规范化，把
* `local-file://` 之后的第一段当作 host。旧形态 `local-file:///<abs>` 在 Windows 上
* 得到 host=`C%3A`——`%3A` 是非法 host 字符，Chromium 在发起请求前就拒（`<video>` 报
* `Media load rejected by URL safety check`，`<img>` 直接 error），protocol handler
* 根本收不到请求，整套皮肤资源（图片 + 视频）全挂。#99682
*
* 固定 host 形态把绝对路径整段放进 path，盘符与大小写都原样保全，Windows / macOS /
* Linux 三端一致；解析侧见 `apps/workbuddy-desktop/src/main/window/local-file-protocol.ts`。
*
* Windows 路径分隔符换成 `/`，每段 encodeURIComponent 以处理空格/中文/`#` 等特殊字符
* （`net.fetch(file://...)` 会 decode）。
*/
function toLocalFileUrl(absPath) {
	return `local-file://local/${absPath.replace(/\\/g, "/").split("/").map((part) => part === "" ? "" : encodeURIComponent(part)).join("/").replace(/^\/+/, "")}`;
}
/**
* 重写 CSS 内所有 `url(...)`：
* - 绝对 URL（http(s):/data:/local-file:/blob:/#）原样保留
* - 相对路径解析到 `resourceDir` 内，越界抛错，命中扩展名白名单后转 `local-file://` 绝对 URL
*/
function rewriteCssUrls(css, resourceDir, joinPath) {
	return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, quote, rawUrl) => {
		const trimmed = rawUrl.trim();
		if (!trimmed) return match;
		if (/^(https?:|data:|blob:|local-file:|#)/i.test(trimmed)) return match;
		const withoutQuery = trimmed.split(/[?#]/, 1)[0];
		const ext = withoutQuery.slice(withoutQuery.lastIndexOf(".")).toLowerCase();
		if (!ALLOWED_ASSET_EXTS.has(ext)) throw new Error(`css url() references disallowed extension: ${trimmed}`);
		const abs = joinPath(resourceDir, withoutQuery.split("/").join("/"));
		if (!isInside(abs, resourceDir)) throw new Error(`css url() escapes resource dir: ${trimmed}`);
		return `url("${toLocalFileUrl(abs)}")`;
	});
}
/**
* 判断 abs 是否位于 parent 目录内。
* 出于防御目的额外做一次 posix normalize —— 即使传入的 `path.join` 实现漏 normalize
* `..`，`../etc/passwd` 这类相对片段仍会被拒绝。
*/
function isInside(abs, parent) {
	const norm = (s) => {
		const parts = s.replace(/\\/g, "/").split("/");
		const out = [];
		for (const seg of parts) {
			if (seg === "" || seg === ".") {
				out.push(seg);
				continue;
			}
			if (seg === "..") {
				if (out.length && out[out.length - 1] !== ".." && out[out.length - 1] !== "") out.pop();
				else return null;
				continue;
			}
			out.push(seg);
		}
		return out.join("/");
	};
	const a = norm(abs);
	const p = norm(parent);
	if (a === null || p === null) return false;
	return a === p || a.startsWith(p.endsWith("/") ? p : `${p}/`);
}
var DesktopAppearanceRepo = class extends CloudAppearanceRepo {
	constructor(deps) {
		super({
			context: deps.context,
			runtime: deps.runtime,
			routePrefix: "/v2",
			platform: "client"
		});
		this.inflight = /* @__PURE__ */ new Map();
		this.deps = deps;
		this.rootPath = deps.localResourceRoot;
	}
	/** issue #74055：主题 zip 下载 + 解压 + URL 重写，返回可直接注入的 CSS */
	async getLocalResource(theme) {
		if (!theme.zipUrl) throw new Error(`theme ${theme.resourceKey} has no zipUrl`);
		const dirName = computeDirName(theme);
		const cacheKey = dirName;
		const existing = this.inflight.get(cacheKey);
		if (existing) return existing;
		const task = this.doGetLocalResource(theme, dirName).finally(() => {
			this.inflight.delete(cacheKey);
		});
		this.inflight.set(cacheKey, task);
		return task;
	}
	async doGetLocalResource(theme, dirName) {
		const resolved = await this.resolveDir(dirName);
		const cssPath = this.deps.path.join(resolved.absPath, REWRITTEN_CSS_FILENAME);
		const cached = await this.tryReadCachedCss(cssPath, resolved.absPath);
		if (cached !== void 0) {
			await this.enforceLru(resolved.dirName).catch((err) => {
				this.deps.logger?.warn("[appearance] enforceLru failed (post-hit)", { err: String(err) });
			});
			return { css: cached };
		}
		const buffer = await this.downloadZip(theme.zipUrl);
		const { rawCss, cssDir } = await this.extractZip(buffer, resolved.absPath);
		const rewritten = rewriteCssUrls(rawCss, cssDir, (a, b) => this.deps.path.join(a, b));
		const tmpPath = `${cssPath}.tmp`;
		await this.deps.fs.writeFile(tmpPath, rewritten);
		await this.deps.fs.rename(tmpPath, cssPath);
		await this.enforceLru(resolved.dirName).catch((err) => {
			this.deps.logger?.warn("[appearance] enforceLru failed", { err: String(err) });
		});
		return { css: rewritten };
	}
	async resolveDir(dirName) {
		const absPath = this.deps.path.join(this.rootPath, dirName);
		if (!isInside(absPath, this.rootPath)) throw new Error(`resource dir escapes root: ${dirName}`);
		await this.deps.fs.mkdir(absPath, { recursive: true });
		return {
			absPath,
			dirName
		};
	}
	/** 读盘缓存：产物由 tmp+rename 原子写产生，存在即视为当前版本的完整 rewrite 结果 */
	async tryReadCachedCss(cssPath, dir) {
		try {
			const buf = await this.deps.fs.readFile(cssPath);
			await this.deps.fs.stat(dir).catch(() => {});
			return new TextDecoder("utf-8").decode(buf);
		} catch {
			return;
		}
	}
	async downloadZip(url) {
		const ctrl = new AbortController();
		const to = setTimeout(() => ctrl.abort(), this.deps.downloadTimeoutMs ?? DEFAULT_DOWNLOAD_TIMEOUT_MS);
		try {
			const resp = await this.deps.fetch(url, { signal: ctrl.signal });
			if (!resp.ok) throw new Error(`zip download failed: HTTP ${resp.status}`);
			return new Uint8Array(await resp.arrayBuffer());
		} finally {
			clearTimeout(to);
		}
	}
	/**
	* 解压 zip 到 dir，返回 CSS 原始内容（首个 `.css` 文件；spec 约定单主题单 CSS）
	* 与它所在的绝对目录 `cssDir`——CSS 里的相对 url() 以该目录为基准解析。
	*/
	async extractZip(buffer, dir) {
		const maxEntries = this.deps.maxEntries ?? DEFAULT_MAX_ENTRIES;
		const maxBytes = this.deps.maxUnzippedBytes ?? DEFAULT_MAX_UNZIPPED_BYTES;
		const entries = this.deps.createUnzipper(buffer).listEntries();
		if (entries.length > maxEntries) throw new Error(`zip too many entries: ${entries.length} > ${maxEntries}`);
		let total = 0;
		let rawCss;
		let cssRelDir = "";
		const skippedNoise = [];
		const skippedDisallowed = [];
		for (const entry of entries) {
			if (entry.name.includes("..") || entry.name.startsWith("/") || /^[A-Za-z]:/.test(entry.name) || entry.name.includes("\\")) throw new Error(`zip entry unsafe: ${entry.name}`);
			total += entry.size;
			if (total > maxBytes) throw new Error(`zip too large: ${total} > ${maxBytes}`);
			if (isMacOsNoiseEntry(entry.name)) {
				skippedNoise.push(entry.name);
				continue;
			}
			const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
			if (!ALLOWED_ASSET_EXTS.has(ext)) {
				skippedDisallowed.push(entry.name);
				continue;
			}
			const data = entry.getData();
			if (ext === ".css" && rawCss === void 0) {
				rawCss = new TextDecoder("utf-8").decode(data);
				const slash = entry.name.replace(/\\/g, "/").lastIndexOf("/");
				cssRelDir = slash >= 0 ? entry.name.replace(/\\/g, "/").slice(0, slash) : "";
			}
			if (entry.name === "skin.v2.css") continue;
			const target = this.deps.path.join(dir, entry.name);
			if (!isInside(target, dir)) throw new Error(`zip entry escapes dir: ${entry.name}`);
			await this.deps.fs.mkdir(this.deps.path.join(target, ".."), { recursive: true });
			await this.deps.fs.writeFile(target, data);
		}
		if (rawCss === void 0) throw new Error("zip has no .css entry");
		if (skippedNoise.length > 0) this.deps.logger?.info("appearance: zip macOS noise entries skipped", {
			count: skippedNoise.length,
			sample: skippedNoise.slice(0, 3)
		});
		if (skippedDisallowed.length > 0) this.deps.logger?.info("appearance: zip disallowed-extension entries skipped", {
			count: skippedDisallowed.length,
			sample: skippedDisallowed.slice(0, 3)
		});
		return {
			rawCss,
			cssDir: cssRelDir ? this.deps.path.join(dir, cssRelDir) : dir
		};
	}
	/**
	* LRU 清理：把最新一次用到的目录标记为最新（依赖 fs.stat mtime），
	* 保留最新的 N 个目录，其余按 mtime 从旧到新删除。
	*/
	async enforceLru(justUsedDir) {
		const limit = this.deps.lruLimit ?? 8;
		let entries;
		try {
			entries = await this.deps.fs.readdir(this.rootPath);
		} catch {
			return;
		}
		if (entries.length <= limit) return;
		const stats = [];
		for (const name of entries) {
			const abs = this.deps.path.join(this.rootPath, name);
			try {
				const st = await this.deps.fs.stat(abs);
				stats.push({
					name,
					mtimeMs: name === justUsedDir ? Number.MAX_SAFE_INTEGER : st.mtimeMs
				});
			} catch {}
		}
		stats.sort((a, b) => a.mtimeMs - b.mtimeMs);
		const drop = stats.length - limit;
		for (let i = 0; i < drop; i++) {
			const abs = this.deps.path.join(this.rootPath, stats[i].name);
			try {
				await this.deps.fs.rm(abs, {
					recursive: true,
					force: true
				});
			} catch (err) {
				this.deps.logger?.warn("[appearance] LRU rm failed", {
					dir: stats[i].name,
					err: String(err)
				});
			}
		}
	}
	async listResources(options) {
		return super.listResources(options);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/genie-inspiration/types.ts
/** Genie 后端 API 路径。 */
var GENIE_INSPIRATION_API = { PROJECT_FORK: (id) => `/genie/api/project/${encodeURIComponent(id)}/fork_v2` };
//#endregion
//#region ../../packages/workbuddy-server/src/genie-inspiration/cloud-repo.ts
/**
* 灵感复刻请求超时（ms）。
* Genie 后端 fork_v2 涉及项目创建 + 文件复制，耗时远超普通接口；
* Genie Web 前端默认 30s，这里对齐并留一定余量。
*/
var FORK_TIMEOUT_MS = 6e4;
/**
* Genie 灵感复刻 HTTP 实现。
*
* 只承载 #65327 已确认的"复刻项目"接口，不引入 Genie webview / 路由 / 首页逻辑。
*/
var CloudGenieInspirationRepo = class {
	constructor(deps) {
		this.http = deps.context.http;
		this.routePrefix = deps.routePrefix ?? "";
	}
	async forkProject(request) {
		const projectId = request.projectId.trim();
		if (!projectId) throw new Error("Missing Genie project id");
		const body = unwrapResponse$1(await this.http.post(`${this.routePrefix}${GENIE_INSPIRATION_API.PROJECT_FORK(projectId)}`, void 0, { timeoutMs: FORK_TIMEOUT_MS }));
		const code = typeof body?.code === "number" ? body.code : void 0;
		if (code !== void 0 && code !== 0 && code !== 200) throw new Error(resolveErrorMessage(body));
		const data = body?.data ?? body;
		if (!data || typeof data !== "object") throw new Error("Genie fork response missing project data");
		return data;
	}
};
function unwrapResponse$1(response) {
	if (response && typeof response === "object" && "data" in response) {
		const data = response.data;
		if (data && typeof data === "object" && ("code" in data || "data" in data)) return data;
	}
	return response;
}
function resolveErrorMessage(body) {
	if (!body || typeof body !== "object") return "Failed to fork Genie project";
	const { msg, message } = body;
	if (typeof msg === "string" && msg.trim()) return msg;
	if (typeof message === "string" && message.trim()) return message;
	return "Failed to fork Genie project";
}
//#endregion
//#region ../../packages/workbuddy-server/src/genie-project/types.ts
/** Genie 后端 API 路径 */
var GENIE_API = {
	PROJECT: "/genie/api/project",
	PROJECT_RECOMMENDATIONS: "/genie/api/public/project-recommendations",
	PROJECT_DETAIL: (id) => `/genie/api/project/${id}`,
	PROJECT_FORK: (id) => `/genie/api/project/${id}/fork`,
	PROJECT_DEPLOY: (id) => `/genie/api/project/${id}/deploy`,
	/** 官方插件列表（公共接口，无需登录） */
	PLUGINS_OFFICIAL: "/genie/api/public/plugins",
	/** 用户自建插件列表（需登录） */
	PLUGINS_USER: "/genie/api/plugins",
	/** 上传自建插件（需登录，multipart form-data，字段名 `file`） */
	PLUGINS_UPLOAD: "/genie/api/plugins/upload",
	/** 删除自建插件（需登录） */
	PLUGIN_DETAIL: (id) => `/genie/api/plugins/${id}`,
	/** TCB 云资源用量查询（issue #3156，用户维度：已启用云服务应用数/上限） */
	TCB_USAGE: "/genie/api/user/tcb/usage"
};
/** Figma API 路径常量 */
var FIGMA_API = {
	AUTH_URL: "/api/figma/auth-url",
	STATUS: "/api/figma/status",
	DISCONNECT: "/api/figma/disconnect",
	FETCH_PROGRESS: "/api/figma/fetch/progress"
};
//#endregion
//#region ../../packages/workbuddy-server/src/genie-project/cloud-genie-project-repo.ts
var CloudGenieProjectRepo = class {
	constructor(deps) {
		this.context = deps.context;
		this.deleteProjectHttp = deps.deleteProjectHttp;
		this.routePrefix = deps.routePrefix ?? "";
	}
	async createProject(request) {
		const response = await this.context.http.post(`${this.routePrefix}${GENIE_API.PROJECT}`, request);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to create project");
		return response.data;
	}
	async getProject(projectId) {
		const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.PROJECT_DETAIL(projectId)}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to get project");
		return response.data;
	}
	async listProjects() {
		const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.PROJECT}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to list projects");
		return response.data;
	}
	async getProjectRecommendations() {
		const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.PROJECT_RECOMMENDATIONS}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to get project recommendations");
		return response.data;
	}
	async forkProject(projectId) {
		const response = await this.context.http.post(`${this.routePrefix}${GENIE_API.PROJECT_FORK(projectId)}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to fork project");
		return response.data;
	}
	async deleteProject(projectId) {
		const response = await (this.deleteProjectHttp ?? this.context.http).delete(`${this.routePrefix}${GENIE_API.PROJECT_DETAIL(projectId)}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to delete project");
	}
	async cancelDeploy(projectId) {
		const response = await this.context.http.delete(`${this.routePrefix}${GENIE_API.PROJECT_DEPLOY(projectId)}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to cancel deploy");
	}
	async getFigmaAuthURL() {
		return this.context.http.get(`${this.routePrefix}${FIGMA_API.AUTH_URL}`);
	}
	async getFigmaStatus() {
		return this.context.http.get(`${this.routePrefix}${FIGMA_API.STATUS}`);
	}
	async disconnectFigma() {
		return this.context.http.delete(`${this.routePrefix}${FIGMA_API.DISCONNECT}`);
	}
	/**
	* 返回 Figma 文件抓取进度的 SSE URL（相对路径）。
	* renderer 侧用此 URL 建立 EventSource。
	*/
	getFigmaFetchProgressURL(fileUrl) {
		return `${this.routePrefix}${FIGMA_API.FETCH_PROGRESS}?file_url=${encodeURIComponent(fileUrl)}`;
	}
	/**
	* 官方插件列表（公共接口，走 `/genie/api/public/plugins`）。
	*
	* 与 genie 侧 `PluginService.getOfficialPlugins` 字面同源；无需登录，拉取失败
	* 均返回空数组（面板展示空态），不抛错。
	*/
	async getOfficialGeniePlugins() {
		try {
			const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.PLUGINS_OFFICIAL}`);
			if (response.code !== 0 && response.code !== 200) return [];
			return normalizePlugins(response.data?.plugins, "official");
		} catch {
			return [];
		}
	}
	/**
	* 用户自建插件列表（需登录，走 `/genie/api/plugins?page=1&page_size=100`）。
	*
	* 与 genie 侧 `PluginService.getUserPlugins` 字面同源；未登录 / 拉取失败
	* 均返回空数组（面板展示为空态），不抛错。
	*/
	async getUserGeniePlugins() {
		try {
			const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.PLUGINS_USER}?page=1&page_size=100`);
			if (response.code !== 0 && response.code !== 200) return [];
			return normalizePlugins(response.data?.plugins, "custom");
		} catch {
			return [];
		}
	}
	/**
	* 上传自建插件 —— 走 `POST /genie/api/plugins/upload`，multipart form-data，
	* 与 genie 侧 `PluginService.uploadPlugin` 字面同源。
	*
	* **关键 1（走原生 fetch）**：不走 `context.http`（axios），而走 `context.fetch`
	* （Web: window.fetch / Desktop: undici）。axios 有默认
	* `Content-Type: application/json`，实测 staging 后端会拿到空 body 回
	* `{"code":-1,"message":"File is required"}`。
	*
	* **关键 2（base64 而非 Uint8Array/File）**：daemon IPC 传输是 `JSON.parse(String(frame))`
	* 纯 JSON —— Uint8Array 会退化成 `{"0":x,"1":y,...}` 普通 object，`new Blob([obj])` 内容
	* 就是 `[object Object]` 或 `undefined`（抓包实测）。所以入参约定为 base64 字符串
	* （见 `GeniePluginUploadPayload` 注释），CloudRepo 里 `Buffer.from(base64, 'base64')`
	* 还原字节流，再包 Blob 塞进 FormData（后端只关心 `Content-Disposition: filename=`
	* 和 body 字节流）。
	*
	* Web 端 same-origin cookie 由浏览器自动携带；Desktop 端 Bearer / X-User-Id 由
	* `context.getAuthHeaders()` 注入。业务错误码（HTTP 200 带 `code=1000` 等）
	* 优先透传给 UI 做 i18n。
	*/
	async uploadGeniePlugin(payload) {
		const bytes = decodeBase64ToBytes(payload.dataBase64);
		const arrayBuffer = new ArrayBuffer(bytes.byteLength);
		new Uint8Array(arrayBuffer).set(bytes);
		const blob = new Blob([arrayBuffer], { type: payload.contentType });
		const formData = new FormData();
		formData.append("file", blob, payload.name);
		try {
			const url = `${this.context.getBaseURL().replace(/\/$/, "")}${this.routePrefix}${GENIE_API.PLUGINS_UPLOAD}`;
			const authHeaders = this.context.getAuthHeaders?.() ?? {};
			const response = await this.context.fetch(url, {
				method: "POST",
				body: formData,
				credentials: "include",
				headers: authHeaders
			});
			let result;
			try {
				result = await response.json();
			} catch {
				return {
					success: false,
					message: `Upload failed: HTTP ${response.status} ${response.statusText}`
				};
			}
			if (!result || result.code !== 0 && result.code !== 200) return {
				success: false,
				message: result?.msg || "Upload failed",
				errorCode: result?.code
			};
			return {
				success: true,
				message: result.msg || "Upload successful",
				plugin: result.data
			};
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Upload failed"
			};
		}
	}
	/**
	* 删除自建插件 —— `DELETE /genie/api/plugins/{id}`，与 genie 侧字面同源。
	*/
	async deleteGeniePlugin(id) {
		try {
			const response = await this.context.http.delete(`${this.routePrefix}${GENIE_API.PLUGIN_DETAIL(id)}`);
			if (response.code !== 0 && response.code !== 200) return {
				success: false,
				message: response.msg || "Delete failed"
			};
			return {
				success: true,
				message: response.msg || "Delete successful"
			};
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Delete failed"
			};
		}
	}
	/**
	* 查询用户维度的 TCB 云资源用量（issue #3156）。
	*
	* `GET /genie/api/user/tcb/usage`，经 `/genie` 前缀转发到
	* genie-agent backend/cmd/api-server 的 `GET /api/user/tcb/usage`。
	*/
	async getTcbUsage() {
		const response = await this.context.http.get(`${this.routePrefix}${GENIE_API.TCB_USAGE}`);
		if (response.code !== 0 && response.code !== 200) throw new Error(response.msg || "Failed to get TCB usage");
		return response.data;
	}
};
/**
* 后端字段规整：确保 `type` 字段有值（fallback 到 tab 名），并把可能为空的
* 字符串字段收敛到可选 —— 与 genie 侧 `PluginService` 对齐。
*/
function normalizePlugins(raw, fallbackType) {
	if (!raw || !Array.isArray(raw)) return [];
	return raw.map((plugin) => ({
		id: plugin.id,
		skillname: plugin.skillname || plugin.name,
		name: plugin.name,
		name_cn: plugin.name_cn || plugin.name,
		description: plugin.description || "",
		description_cn: plugin.description_cn || plugin.description || "",
		iconName: plugin.iconName,
		enabled: plugin.enabled ?? false,
		tags: plugin.tags ?? [],
		type: plugin.type ?? fallbackType,
		version: plugin.version,
		source: plugin.source
	}));
}
/**
* base64 → Uint8Array —— daemon 侧优先用 Buffer（Node），浏览器同进程兜底用 atob。
*
* 为什么必须走 base64：daemon IPC 是 `JSON.parse(String(frame))` 纯 JSON，
* Uint8Array 序列化后会变成 `{0:x,1:y}` 普通 object，还原不出字节流。
* base64 是字符串，JSON 天然安全。
*/
function decodeBase64ToBytes(base64) {
	if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
		const buf = Buffer.from(base64, "base64");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region ../../packages/workbuddy-server/src/space-node/types.ts
var SPACE_NODE_API = { 
/** POST；入参 `{ nodeId?, url? }`，出参 `{ node: Node }` */
NODE_INFO: "/space/api/agent/v1/node-info" };
//#endregion
//#region ../../packages/workbuddy-server/src/space-node/cloud-repo.ts
/**
* 「资源不存在」类错误码。
*
* 除了字面意义的 not found，还收编了受保护资源码（内容安全 / 跨企业 / 仅 owner 等）：
* 它们对本场景的表现完全一致（保持 URL、不重试），单开一类没有收益。
* 权威表见 `apps/workbuddy-desktop/resources/plugins/workbuddy-builtin/skills/library/error_handling.md`。
*/
var NOT_FOUND_CODES = /* @__PURE__ */ new Set([
	11510,
	404,
	410,
	619610,
	11511,
	56031,
	56032,
	56033,
	56034,
	56035,
	56036,
	56037,
	56041
]);
/** 「权限不足」类错误码。注意：不要把它提示成「链接失效」，是权限问题不是坏链接。 */
var FORBIDDEN_CODES = /* @__PURE__ */ new Set([
	12100,
	12607,
	56030,
	401,
	403
]);
/**
* SpaceNodeFacade 的 HTTP 实现，Web 直接注入、Desktop 由 daemon handler 持有。
*
* `/space/api/agent/v1/*` 走 `AgentV1AuthMiddleware`（JWT > X-Userinfo > X-Skill-Token），
* 因此 baseURL 必须是**去掉 `/v2` 网关前缀的域名根**，不能沿用 product endpoint。
*/
var CloudSpaceNodeRepo = class {
	constructor(deps) {
		this.http = deps.context.http;
		this.routePrefix = deps.routePrefix ?? "";
	}
	async getNodeBrief({ url }) {
		const target = typeof url === "string" ? url.trim() : "";
		if (!target) return {
			ok: false,
			reason: "notFound"
		};
		let response;
		try {
			response = await this.http.post(`${this.routePrefix}${SPACE_NODE_API.NODE_INFO}`, { url: target });
		} catch (error) {
			return {
				ok: false,
				reason: resolveFailureFromError(error)
			};
		}
		const body = unwrapResponse(response);
		const code = typeof body?.code === "number" ? body.code : void 0;
		if (code !== void 0 && code !== 0) return {
			ok: false,
			reason: mapCodeToFailure(code)
		};
		const node = normalizeNode(body?.data ?? body);
		if (!node) return {
			ok: false,
			reason: "temporary"
		};
		return {
			ok: true,
			node
		};
	}
};
/**
* 剥掉可能多出来的一层信封。
*
* 生产 httpService 已拆掉 axios 的 data 层直接给业务体，但部分注入形态会多包一层，
* 与 `CloudGenieInspirationRepo` 保持同样的兼容写法。
*/
function unwrapResponse(response) {
	if (!response || typeof response !== "object") return;
	const outer = response;
	const inner = outer.data;
	if (inner && typeof inner === "object" && ("code" in inner || "data" in inner)) return inner;
	return outer;
}
function normalizeNode(payload) {
	const node = payload?.node;
	if (!node || typeof node !== "object") return;
	const id = typeof node.id === "string" ? node.id : "";
	if (!id) return;
	return {
		id,
		title: typeof node.title === "string" ? node.title : "",
		kind: typeof node.kind === "string" ? node.kind : "",
		url: typeof node.url === "string" ? node.url : ""
	};
}
/**
* 从抛出的错误里判定失败原因。
*
* `createRuntimeHttp` 对非 2xx 会把后端 envelope 的业务码平铺到 `error.code`，
* HTTP 状态放在 `error.status`/`error.httpStatus`。业务码更精确，优先取它；
* 都拿不到（网络异常 / AbortError / 非法响应）按临时故障处理。
*/
function resolveFailureFromError(error) {
	if (!error || typeof error !== "object") return "temporary";
	const err = error;
	const bizCode = toFiniteNumber(err.code);
	if (bizCode !== void 0) {
		const mapped = matchKnownCode(bizCode);
		if (mapped) return mapped;
	}
	const status = toFiniteNumber(err.status) ?? toFiniteNumber(err.httpStatus);
	if (status !== void 0) {
		const mapped = matchKnownCode(status);
		if (mapped) return mapped;
	}
	return "temporary";
}
/**
* 业务码 → 失败原因。未列出的码一律按临时故障，与 skill 侧权威表的兜底规则一致。
*
* 参数错误（400 / 422 / INVALID_PARAMS）在本场景只可能来自识别层放过了非
* `/space/d/` 的 URL，属于我方 bug，应该在识别层拦住，这里不给它单独语义。
*/
function mapCodeToFailure(code) {
	return matchKnownCode(code) ?? "temporary";
}
function matchKnownCode(code) {
	if (NOT_FOUND_CODES.has(code)) return "notFound";
	if (FORBIDDEN_CODES.has(code)) return "forbidden";
}
function toFiniteNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && /^-?\d+$/.test(value)) return Number(value);
}
//#endregion
//#region src/main/daemon/app-server/rpc-handler-deps.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_dev_env_override();
require_code_cache.init_workbuddy_product_config();
function createDefaultEnhancePromptLogger() {
	try {
		const electronLog = require_code_cache.require_src();
		const scope = electronLog.default?.scope ?? electronLog.scope;
		if (typeof scope !== "function") return;
		const scoped = scope("enhancePrompt");
		return { error: (message, payload) => {
			if (payload) scoped.error(message, payload);
			else scoped.error(message);
		} };
	} catch {
		return;
	}
}
function createProfileRpcHandlerDeps(deps, options) {
	return require_server.createWorkbuddyAppServerRpcProfileDepsFromRuntime({
		...createAppServerRpcRuntimeDeps(deps, options.configDir ?? deps.platform.configDir, options),
		adapters: createDesktopRpcProfileAdapterDeps(options.getMonitorService),
		profile: options.profile,
		builtinMarketTag: "desktop.createProfileRpcHandlerDeps"
	});
}
function createAppServerRpcRuntimeDeps(deps, configDir = deps.platform.configDir, options) {
	const createLogger = options?.createLogger ?? require_code_cache.createWorkbuddyScopedLogger;
	return {
		core: deps,
		celljs: deps.celljs,
		services: deps.services,
		hostServices: deps.hostServices,
		host: {
			app: deps.desktopHost.app,
			dialog: deps.desktopHost.dialog,
			shell: deps.desktopHost.shell,
			network: deps.desktopHost.network,
			applyWindowsExperimentalFeatures: deps.desktopHost.applyWindowsExperimentalFeatures
		},
		serverFetch: deps.serverFetch,
		configDir,
		runtimeManager: deps.runtimeManager,
		sessionManager: deps.sessionManager,
		docsService: deps.docsService,
		identityServiceRef: deps.identityServiceRef,
		moderationService: deps.moderationService,
		auditStore: deps.auditStore,
		fallbackProxyTestEndpoint: require_code_cache.tryGetWorkbuddyBaseProductConfiguration()?.endpoint,
		localDocsRelease: options?.localDocsRelease,
		localDocs: options?.localDocs,
		tencentDocsRuntime: options?.tencentDocsRuntime,
		broadcastSandboxRulesDelta: createSandboxRulesDeltaBroadcaster(deps),
		slot: createDesktopSlotDeps(deps),
		genieInspiration: createDesktopGenieInspirationDeps(deps),
		spaceNode: createDesktopSpaceNodeDeps(deps),
		genieProject: createDesktopGenieProjectDeps(deps),
		appearance: createDesktopAppearanceDeps(deps),
		getNetworkGate: options?.getNetworkGate,
		nativeRuntime: options?.nativeRuntime ? { service: options.nativeRuntime } : void 0,
		logger: {
			main: createLogger("main"),
			handler: createLogger("handler"),
			runtime: createLogger("runtime"),
			builtinMarket: createLogger("builtin-market")
		}
	};
}
function createDesktopRpcProfileAdapterDeps(getMonitorService) {
	return {
		resolveBundledAsset: require_code_cache.resolveBundledAsset,
		requireBundledAsset: require_code_cache.requireBundledAsset,
		enhancePromptLogger: createDefaultEnhancePromptLogger(),
		logLifecycleEvent: require_log_acl_guard.logLifecycleEvent,
		setNetDriveEnvRoute: require_log_acl_guard.setNetDriveEnvRoute,
		resolveEndpointOverride: require_code_cache.resolveEndpointOverride,
		getMonitorService: getMonitorService ?? (async () => {
			const { DesktopMonitorService } = await Promise.resolve().then(() => require("./desktop-monitor-service2.js"));
			return DesktopMonitorService.getSharedInstance();
		})
	};
}
/**
* 构造安全中心规则增量广播器：取所有活跃 sidecar 的 HTTP 端点，对每个
* `POST /internal/sandbox-rules/sync` 发送 delta。单端点失败不影响其余；
* getAllActiveEndpoints 失败（sidecar 未启动等）静默返回空，整体不抛错，
* 让安全中心保存 RPC 始终成功——实时同步是 best-effort，落盘才是 source of truth。
*/
function createSandboxRulesDeltaBroadcaster(deps) {
	const logger = require_code_cache.createWorkbuddyScopedLogger("security-center");
	const runtimeManager = deps.runtimeManager;
	const fetchFn = deps.serverFetch;
	return async (delta) => {
		const endpoints = await runtimeManager.getAllActiveEndpoints?.().catch(() => []) ?? [];
		if (endpoints.length === 0) return;
		const body = JSON.stringify(delta);
		await Promise.allSettled(endpoints.map(async (endpoint) => {
			try {
				const resp = await fetchFn(`${endpoint}/internal/sandbox-rules/sync`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body
				});
				if (!resp.ok) logger.warn(`[SecurityCenter] broadcast delta to ${endpoint} failed: HTTP ${resp.status}`);
			} catch (error) {
				logger.warn(`[SecurityCenter] broadcast delta to ${endpoint} error: ${error instanceof Error ? error.message : String(error)}`);
			}
		}));
	};
}
/**
* 装配 Desktop 端 SlotRepo，作为 daemon RPC `slot:getActiveConfigs` 的 service。
*
* - context: 通过 cellDeps 构造带认证 + endpoint 拼接的 RuntimeContext（与其他 domain 一致）
* - runtime.getEdition: 通过 WORKBUDDY_CONFIG_DIR 推断（与 ardot-design-feature.ts 逻辑对齐）
* - runtime.getVersion: 取 platform.appVersion
* - runtime.getLang: 取 platform.appLocale() 的系统语言 fallback；renderer 端通过
*   getActiveConfigs(options) 显式传入的 lang 优先级更高（i18n 实时值）
*/
function createDesktopSlotDeps(deps) {
	const contextPromise = Promise.resolve(deps.celljs).then((cellDeps) => require_tar.createRuntimeContextFromCellDeps(cellDeps, {
		homeDir: deps.platform.configDir,
		fetch: deps.serverFetch ?? deps.desktopHost.network.fetch
	}));
	return { service: new require_server.DesktopSlotRepo({
		context: { http: { async post(url, data) {
			return (await contextPromise).http.post(url, data);
		} } },
		runtime: {
			getEdition() {
				return (process.env.WORKBUDDY_CONFIG_DIR?.trim() ?? "").includes("workbuddy-ai") ? "overseas" : "cn";
			},
			getVersion() {
				return deps.platform.appVersion ?? "";
			},
			getLang() {
				return (deps.platform.appLocale?.() ?? "").toLowerCase().startsWith("zh") ? "zh" : "en";
			}
		}
	}) };
}
/**
* 装配 Desktop 端 GenieProjectRepo，作为 daemon RPC `genieProject:*` 的 service。
*
* - context: 通过 cellDeps 构造带认证 + endpoint 拼接的 RuntimeContext（与其他 domain 一致）
* - Genie Project API 默认走产品 `/v2` 网关；仅删除项目使用根级 HTTP transport
* - 上传插件（multipart）走 `context.fetch`（daemon 的 undici / net.fetch）直接发，
*   避免 axios 默认 JSON Content-Type 把 FormData 序列化。auth header 由
*   `getAuthHeaders()` 从 authenticationManager 派生。
*
* Issue #3165
*/
function createDesktopGenieProjectDeps(deps) {
	let cachedCellDeps;
	const contextPromise = Promise.resolve(deps.celljs).then((cellDeps) => {
		cachedCellDeps = cellDeps;
		return require_tar.createRuntimeContextFromCellDeps(cellDeps, {
			homeDir: deps.platform.configDir,
			fetch: deps.serverFetch ?? deps.desktopHost.network.fetch
		});
	});
	const deleteProjectContextPromise = Promise.resolve(deps.celljs).then((cellDeps) => {
		const rootEndpointProductManager = {
			...cellDeps.productManager,
			getEndpoint: () => cellDeps.productManager.getEndpoint()?.replace(/\/v2\/?$/, "")
		};
		return require_tar.createRuntimeContextFromCellDeps({
			...cellDeps,
			productManager: rootEndpointProductManager
		}, {
			homeDir: deps.platform.configDir,
			fetch: deps.serverFetch ?? deps.desktopHost.network.fetch
		});
	});
	return { service: new CloudGenieProjectRepo({
		context: {
			http: {
				async get(url) {
					return (await contextPromise).http.get(url);
				},
				async post(url, data) {
					return (await contextPromise).http.post(url, data);
				},
				async delete(url) {
					return (await contextPromise).http.delete(url);
				}
			},
			fetch: (async (input, init) => {
				return (await contextPromise).fetch(input, init);
			}),
			getBaseURL() {
				return cachedCellDeps?.productManager.getEndpoint()?.replace(/\/$/, "") ?? "";
			},
			getAuthHeaders() {
				const session = cachedCellDeps?.authenticationManager?.currentSessionSubject?.getValue?.();
				const headers = {};
				if (session?.auth?.accessToken) headers.Authorization = `Bearer ${session.auth.accessToken}`;
				if (session?.account?.uid) headers["X-User-Id"] = session.account.uid;
				if (session?.account?.enterpriseId) {
					headers["X-Enterprise-Id"] = session.account.enterpriseId;
					headers["X-Tenant-Id"] = session.account.enterpriseId;
				}
				if (session?.auth?.domain) headers["X-Domain"] = session.auth.domain;
				return headers;
			}
		},
		deleteProjectHttp: { async delete(url) {
			return (await deleteProjectContextPromise).http.delete(url);
		} }
	}) };
}
/**
* 装配 Desktop 端 AppearanceRepo，作为 daemon RPC `appearance:*` 的 service。
*
* 与 createDesktopSlotDeps 同构：lazy RuntimeContext（含认证/endpoint 注入）+ 端侧 runtime
* 参数（edition/version/lang），edition/lang 推断逻辑与 slot 保持一致。
*
* 额外注入本地资源目录 + fs/fetch/adm-zip，让 DesktopAppearanceRepo 完成 zip 下载
* →解压→URL 重写→LRU 清理的闭环（issue #74055）。
*/
function createDesktopAppearanceDeps(deps) {
	const contextPromise = Promise.resolve(deps.celljs).then((cellDeps) => require_tar.createRuntimeContextFromCellDeps(cellDeps, {
		homeDir: deps.platform.configDir,
		fetch: deps.serverFetch ?? deps.desktopHost.network.fetch
	}));
	const lazyContext = { http: {
		async get(url, config) {
			return (await contextPromise).http.get(url, config);
		},
		async post(url, data, config) {
			return (await contextPromise).http.post(url, data, config);
		}
	} };
	const runtime = {
		getVersion() {
			return deps.platform.appVersion ?? "";
		},
		getLang() {
			return (deps.platform.appLocale?.() ?? "").toLowerCase().startsWith("zh") ? "zh" : "en";
		}
	};
	const localResourceRoot = node_path.join(deps.platform.configDir, "appearance-resources");
	const AdmZip = require_adm_zip$1.require_adm_zip();
	const logger = require_code_cache.createWorkbuddyScopedLogger("appearance");
	return { service: new DesktopAppearanceRepo({
		context: lazyContext,
		runtime,
		localResourceRoot,
		fetch: (deps.serverFetch ?? deps.desktopHost.network.fetch ?? globalThis.fetch).bind(globalThis),
		fs: {
			mkdir: (p, opts) => node_fs_promises.mkdir(p, opts),
			readFile: (p) => node_fs_promises.readFile(p),
			writeFile: (p, data) => node_fs_promises.writeFile(p, data),
			rename: (oldPath, newPath) => node_fs_promises.rename(oldPath, newPath),
			stat: async (p) => ({ mtimeMs: (await node_fs_promises.stat(p)).mtimeMs }),
			readdir: (p) => node_fs_promises.readdir(p),
			rm: (p, opts) => node_fs_promises.rm(p, opts)
		},
		path: {
			join: node_path.join,
			resolve: node_path.resolve,
			sep: node_path.sep
		},
		createUnzipper: (buffer) => {
			const raw = new AdmZip(Buffer.from(buffer)).getEntries();
			return { listEntries: () => raw.filter((e) => !e.isDirectory).map((e) => ({
				name: e.entryName,
				size: e.header.size,
				getData: () => new Uint8Array(e.getData())
			})) };
		},
		logger: {
			info: (msg, meta) => logger.info(meta ? `${msg} ${JSON.stringify(meta)}` : msg),
			warn: (msg, meta) => logger.warn(meta ? `${msg} ${JSON.stringify(meta)}` : msg),
			error: (msg, meta) => logger.error(meta ? `${msg} ${JSON.stringify(meta)}` : msg)
		}
	}) };
}
/**
* 构造指向**域名根级**的惰性 RuntimeContext http（去掉 product endpoint 的 `/v2` 网关前缀）。
*
* Genie 灵感与资料库节点查询这类接口都不在 `/v2` 网关下，但仍要复用 RuntimeContext
* 的认证注入、代理、日志和错误语义。`deps.celljs` 是 Promise 而装配阶段不能 await，
* 因此包一层惰性代理：首次真正发请求时才取 context，不阻塞模块装配。
*/
function createRootEndpointLazyHttp(deps) {
	const contextPromise = Promise.resolve(deps.celljs).then((cellDeps) => {
		const rootEndpointProductManager = {
			...cellDeps.productManager,
			getEndpoint: () => cellDeps.productManager.getEndpoint()?.replace(/\/v2\/?$/, "")
		};
		return require_tar.createRuntimeContextFromCellDeps({
			...cellDeps,
			productManager: rootEndpointProductManager
		}, {
			homeDir: deps.platform.configDir,
			fetch: deps.serverFetch ?? deps.desktopHost.network.fetch
		});
	});
	return { http: {
		async get(url, config) {
			return (await contextPromise).http.get(url, config);
		},
		async post(url, data, config) {
			return (await contextPromise).http.post(url, data, config);
		},
		async put(url, data, config) {
			return (await contextPromise).http.put(url, data, config);
		},
		async patch(url, data, config) {
			return (await contextPromise).http.patch(url, data, config);
		},
		async delete(url, config) {
			return (await contextPromise).http.delete(url, config);
		}
	} };
}
function createDesktopGenieInspirationDeps(deps) {
	return { service: new CloudGenieInspirationRepo({ context: createRootEndpointLazyHttp(deps) }) };
}
/**
* 装配 Desktop 端 SpaceNodeRepo（daemon RPC `spaceNode:getNodeBrief` 的 service）。
* spaceengine 的 `/space/api/agent/v1/*` 同样在域名根级；鉴权走 AgentV1AuthMiddleware
* 的 JWT 分支，由 RuntimeContext 注入的 Authorization 承接。
*/
function createDesktopSpaceNodeDeps(deps) {
	return { service: new CloudSpaceNodeRepo({ context: createRootEndpointLazyHttp(deps) }) };
}
//#endregion
//#region src/main/daemon/qimei-ready-signal.ts
/**
* daemon 子进程内的「qimei36 就绪」信号。
*
* 背景：cbc（codebuddy-code CLI）子进程由 daemon spawn，其 qimei36 来自 spawn 时的
* env 快照（cbc 的 EnvQimeiDetector 只读 `CODEBUDDY_QIMEI36`）。首次安装冷启动时
* daemon fork env 里可能还没 qimei36（helper 探测 ~2s 不阻塞 fork），main 会在探测
* 完成后通过 `telemetry:updateQimei36` RPC 事后补写 daemon 的 `process.env`。
*
* 问题：daemon 无法反向同步向 main 索取 qimei36，唯一来源是 main 单向、异步的补发。
* 若某条 cbc 抢在补发落地之前就被 spawn，它整个生命周期 qimei36 都为空——因为 env
* 是 spawn 快照，事后补写只更新 daemon 自身 process.env，不回灌已 spawn 的 cbc。
*
* 本模块把「daemon env 被补写填充」这一已有事件（{@link markQimei36Ready}，由
* telemetry:updateQimei36 handler 触发）暴露成一个可 await 的 promise
* （{@link waitQimei36Ready}），供组装 cbc env 的 getQimei36 在读到空值时短暂等待
* 补发落地，从而在 spawn 前尽量拿到 qimei36。不新增任何跨进程通道。
*/
var resolveReady;
var readyPromise = new Promise((resolve) => {
	resolveReady = resolve;
});
var isReady = false;
/**
* 标记 qimei36 已就绪（daemon 的 `process.env.CODEBUDDY_QIMEI36` 已被填充）。
* 由 telemetry:updateQimei36 handler 在写入 env 后调用。幂等，多次调用只 resolve 一次。
*/
function markQimei36Ready() {
	if (isReady) return;
	isReady = true;
	resolveReady?.();
}
/**
* 等待 qimei36 就绪，封顶 `timeoutMs`。命中返回 true，超时返回 false（尽力而为，
* 调用方超时后应放行、不阻断，避免遥测字段拖慢会话创建）。
*
* 若已就绪则立即 resolve（true）。
*/
function waitQimei36Ready(timeoutMs) {
	if (isReady) return Promise.resolve(true);
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(() => resolve(false), timeoutMs);
	});
	return Promise.race([readyPromise.then(() => true), timeout]).finally(() => {
		if (timer) clearTimeout(timer);
	});
}
//#endregion
//#region src/main/daemon/daemon-bootstrap.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_dev_env_override();
require_code_cache.init_workbuddy_product_config();
/**
* 组装 cbc env 时，getQimei36 读到空值后等待 main 侧 qimei36 补发落地的封顶时长（ms）。
* 仅首次安装冷启动、且 cbc 抢在补发前创建会话时命中；主进程 helper 探测本身 ~2s，
* 与 fork 前的 QIMEI_FORK_WAIT_MS 互补，两段总窗口覆盖多数探测完成场景。超时放行，
* 不阻断会话创建（qimei36 仅遥测公参）。
*/
var QIMEI36_WAIT_MS = 2e3;
var STARTUP_PERF_BRIDGE_EVENT = "startup.perf.bridge";
var NOOP_POWER_MANAGER = {
	getMode: () => "off",
	setMode: () => void 0,
	isEnabled: () => false,
	isActive: () => false,
	getState: () => ({
		mode: "off",
		isEnabled: false,
		isActive: false
	}),
	cleanup: () => void 0
};
/**
* In-process 兜底实现：直接 import desktop main 进程内的 reporter。
* 仅在 evalMode（main + daemon 同进程）下生效；fork 子进程下 monitor 单例
* 不可达，必须走 `DaemonBootstrapOptions.monitorEvent` / `promptTraceReporters`
* 由宿主注入 RPC 回调。
*/
function inProcessReportMonitorEvent(name, ext) {
	if (name === "automation.run.failure_detail") {
		Promise.resolve().then(() => require("./automation-failure-galileo.js")).then(({ reportAutomationFailureGalileoEvent }) => {
			reportAutomationFailureGalileoEvent(name, ext);
		}).catch(() => void 0);
		return;
	}
	if (name === "sandbox.threat_database.update_check" || name === "sandbox.threat_database.startup_availability") {
		Promise.resolve().then(() => require("./threat-database-galileo.js")).then(({ reportThreatDatabaseGalileoEvent }) => {
			reportThreatDatabaseGalileoEvent(name, ext);
		}).catch(() => void 0);
		return;
	}
	Promise.resolve().then(() => require("./desktop-monitor-service2.js")).then(({ DesktopMonitorService }) => {
		DesktopMonitorService.getSharedInstance()?.reportAegisEvent(name, ext);
	}).catch(() => void 0);
}
function inProcessReportPromptForwardingEvent(payload) {
	Promise.resolve().then(() => require("./prompt-trace-reporter.js")).then(({ reportPromptForwardingEvent }) => reportPromptForwardingEvent(payload)).catch(() => void 0);
}
function inProcessReportPromptDoneEvent(payload) {
	Promise.resolve().then(() => require("./prompt-trace-reporter.js")).then(({ reportPromptDoneEvent }) => reportPromptDoneEvent(payload)).catch(() => void 0);
}
async function inProcessReportPromptTrace(payload) {
	try {
		const { reportPromptTrace } = await Promise.resolve().then(() => require("./prompt-trace-reporter.js"));
		await reportPromptTrace(payload);
	} catch {}
}
async function bootstrapDaemon({ celljs, credentialProtectionBootstrap, platform, runtimeManager, desktopHost = NOOP_DESKTOP_HOST, powerManager = NOOP_POWER_MANAGER, resolveProxyEnv, rpcHandlerProfile = "daemon-app-server", createRpcServer, createHostServiceDeps = require_server.createWorkbuddyAppServerDefaultHostServiceDeps, getLogFilePath = () => void 0, recordMainLoadTime, localDocumentMediaTypes, createDocumentLifecycle, tencentDocsMcp, rpcHandlerOptions, cliPrewarmPoolStartTrigger, localDocsReleaseBridge, localDocs, tencentDocsRuntime, onRpcReady, monitorEvent, promptTraceReporters, getMonitorService, storeSessionCreateTiming: storeSessionCreateTiming$1, docsService, getSandboxPreviewMountService, getSandboxPreviewHttpPort, getStaticHtmlServer, resolveBundledAssetForHandlers }) {
	const mainLog = require_code_cache.createWorkbuddyScopedLogger("daemon-bootstrap");
	projectResourceManager.setTokenProvider(() => {
		try {
			return celljs.authenticationManager.currentSessionSubject.getValue()?.auth?.accessToken ?? null;
		} catch {
			return null;
		}
	});
	projectResourceManager.setEndpointProvider(() => {
		try {
			return celljs.productManager?.getEndpoint?.() ?? null;
		} catch {
			return null;
		}
	});
	projectResourceManager.setUserIdProvider(() => {
		try {
			return celljs.authService.getAccount()?.uid ?? null;
		} catch {
			return null;
		}
	});
	const serverFetch = createWorkbuddyServerHttpFetch();
	const reportMonitorEvent = monitorEvent ?? inProcessReportMonitorEvent;
	const reportPromptForwarding = promptTraceReporters?.reportForwarding ?? inProcessReportPromptForwardingEvent;
	const reportPromptDone = promptTraceReporters?.reportDone ?? inProcessReportPromptDoneEvent;
	const reportPromptTrace = promptTraceReporters?.reportTrace ?? inProcessReportPromptTrace;
	return require_server.bootstrapWorkbuddyAppServer({
		celljs,
		credentialProtectionBootstrap,
		platform,
		runtimeManager,
		host: desktopHost,
		serverFetch,
		powerManager,
		resolveProxyEnv,
		rpcHandlerProfile,
		createRpcServer: createRpcServer ?? (() => new require_server.DaemonServer({ logger: {
			info: (message, meta) => mainLog.info(message, meta),
			warn: (message, meta) => mainLog.warn(message, meta)
		} })),
		createHostServiceDeps,
		createCoreServices: ({ celljs: celljsReady, platform: appServerPlatform, runtimeManager: appServerRuntimeManager, host }) => require_server.createWorkbuddyAppServerCoreServices({
			celljs: celljsReady,
			platform: { configDir: appServerPlatform.configDir },
			runtimeManager: appServerRuntimeManager,
			serverFetch,
			host: {
				fetch: host.network.fetch,
				getMainSession: () => host.network.getDefaultSession(),
				getTdocImportPartition: () => host.network.getSessionPartition("persist:tdoc-import"),
				getPreviewPartition: () => host.network.getSessionPartition("persist:tdoc-preview"),
				clearDefaultSessionCookiesForDomains: host.network.clearDefaultSessionCookiesForDomains ? (domains) => host.network.clearDefaultSessionCookiesForDomains(domains) : void 0,
				clearLexiangPartitionCookiesForDomains: host.network.clearLexiangPartitionCookiesForDomains ? (domains) => host.network.clearLexiangPartitionCookiesForDomains(domains) : void 0
			},
			adapters: {
				resolveBundledAsset: require_code_cache.resolveBundledAsset,
				resolveChannelBranding: require_log_acl_guard.resolveChannelBranding,
				designFeatureKey: ENABLE_ARDOT_DESIGN_FEATURE,
				isDesignFeatureEnabled: isEnableArdotDesignEnabled,
				resolveEndpointOverride: require_code_cache.resolveEndpointOverride,
				readDevEnv: require_code_cache.readDevEnv,
				getDevEnvName: () => process.env["TDOCS_DEV_ENV_NAME"],
				getDevEnvId: () => process.env["TDOCS_DEV_ENV_ID"],
				getLogFilePath,
				packageLogs: require_log_acl_guard.packageLogs,
				getPerfLogger: (flowType, traceId) => {
					const logger = require_marks.getWorkbuddyPerfLogger(flowType, traceId);
					if (flowType === require_marks.PerfFlow.STARTUP) return {
						appendRendererLine: (line) => logger.appendRendererLine(line),
						flush: () => {
							logger.flush();
							reportMonitorEvent(STARTUP_PERF_BRIDGE_EVENT, { logFilePath: logger.getLogFilePath() });
						},
						getLogFilePath: () => logger.getLogFilePath()
					};
					return logger;
				}
			},
			logger: mainLog
		}),
		createHandlerDeps: ({ server, sessionManager, listBackends, runtimeManager: appServerRuntimeManager, platform: appServerPlatform, host, powerManager: appServerPowerManager, permissionRequests, celljs: celljsReady, services, hostServices, appServerServices, auditStore, clawCwd, resolveDefaultWorkspaceRoot }) => ({
			server,
			desktopHost: host,
			serverFetch,
			sessionManager,
			listBackends,
			runtimeManager: appServerRuntimeManager,
			platform: appServerPlatform,
			powerManager: appServerPowerManager,
			permissionRequests,
			celljs: celljsReady,
			services,
			hostServices,
			docsService: appServerServices.docsService,
			identityServiceRef: appServerServices.identityServiceRef,
			moderationService: appServerServices.moderationService,
			auditStore,
			clawCwd,
			resolveDefaultWorkspaceRoot,
			monitorEvent: reportMonitorEvent,
			getSandboxPreviewMountService,
			getSandboxPreviewHttpPort,
			getStaticHtmlServer,
			resolveBundledAsset: resolveBundledAssetForHandlers,
			getAuthUid: (() => {
				let resolvedCelljs;
				Promise.resolve(celljsReady).then((celljs) => {
					resolvedCelljs = celljs;
				}).catch(() => {});
				return () => {
					try {
						return resolvedCelljs?.authService?.getAccount()?.uid;
					} catch {
						return;
					}
				};
			})()
		}),
		createRpcProfileDeps: (deps, options) => createProfileRpcHandlerDeps(deps, {
			configDir: options.configDir,
			profile: options.profile,
			localDocsRelease: localDocsReleaseBridge,
			localDocs,
			tencentDocsRuntime,
			getMonitorService,
			getNetworkGate: rpcHandlerOptions?.getNetworkGate,
			nativeRuntime: rpcHandlerOptions?.nativeRuntime
		}),
		codeBackendAdapters: {
			resolveBundledAsset: require_code_cache.resolveBundledAsset,
			requireBundledAsset: require_code_cache.requireBundledAsset,
			getBootstrapProductConfigEnv: require_code_cache.getWorkbuddyBootstrapProductConfigurationEnv,
			getRegisteredBinaryTypes: require_code_cache.getRegisteredBinaryTypes,
			getProcessProxyEnv: require_log_acl_guard.getProxyEnvFromProcess,
			storeSessionCreateTiming: storeSessionCreateTiming$1 ?? require_log_acl_guard.storeSessionCreateTiming,
			resolveCliEnvRouteMode: require_code_cache.resolveCliEnvRouteModeOverride,
			reportPromptForwardingEvent: reportPromptForwarding,
			reportPromptDoneEvent: reportPromptDone,
			reportPromptTrace,
			getQimei36: async () => {
				const fromEnv = process.env.CODEBUDDY_QIMEI36?.trim() || void 0;
				if (fromEnv) return fromEnv;
				const waitStartedAt = Date.now();
				mainLog.info("[QimeiUpdate] getQimei36 env empty, waiting for main backfill before cbc spawn");
				if (!await waitQimei36Ready(QIMEI36_WAIT_MS)) {
					mainLog.warn(`[QimeiUpdate] getQimei36 timed out after ${Date.now() - waitStartedAt}ms waiting for env backfill; spawning cbc without qimei36`);
					return;
				}
				mainLog.info(`[QimeiUpdate] getQimei36 backfill landed after ${Date.now() - waitStartedAt}ms; cbc will spawn with qimei36`);
				return process.env.CODEBUDDY_QIMEI36?.trim() || void 0;
			},
			getProjectSessionEnv: (sessionId) => projectResourceManager.getEnvForSession(sessionId),
			getProjectMcpServersForSession: (sessionId) => projectResourceManager.getMcpServersForSession(sessionId),
			registerProjectSession: (sessionId, projectId, resources) => projectResourceManager.registerSession(sessionId, projectId, resources),
			registerProjectSessionFromRecord: (sessionId, projectId) => projectResourceManager.registerSessionFromRecord(sessionId, projectId)
		},
		resolveEndpointOverride: require_code_cache.resolveEndpointOverride,
		recordMainLoadTime,
		resolveDataSocketPath: require_process_cpu_sampler.dataSocketPath,
		onRpcReady,
		docsService,
		logger: mainLog,
		monitorEvent: reportMonitorEvent,
		localDocumentMediaTypes,
		createDocumentLifecycle,
		tencentDocsMcp,
		rpcHandlerOptions,
		cliPrewarmPoolStartTrigger
	});
}
//#endregion
Object.defineProperty(exports, "NOOP_DESKTOP_HOST", {
	enumerable: true,
	get: function() {
		return NOOP_DESKTOP_HOST;
	}
});
Object.defineProperty(exports, "bootstrapDaemon", {
	enumerable: true,
	get: function() {
		return bootstrapDaemon;
	}
});
Object.defineProperty(exports, "buildComputerUseVlmGatewayHeaders", {
	enumerable: true,
	get: function() {
		return buildComputerUseVlmGatewayHeaders;
	}
});
Object.defineProperty(exports, "createComputerUseVlmProxy", {
	enumerable: true,
	get: function() {
		return createComputerUseVlmProxy;
	}
});
Object.defineProperty(exports, "createIsSessionStillProcessing", {
	enumerable: true,
	get: function() {
		return createIsSessionStillProcessing;
	}
});
Object.defineProperty(exports, "createLocalDocsReleaseBridgeFromFacade", {
	enumerable: true,
	get: function() {
		return createLocalDocsReleaseBridgeFromFacade;
	}
});
Object.defineProperty(exports, "createNativeRuntimeFeatureGate", {
	enumerable: true,
	get: function() {
		return createNativeRuntimeFeatureGate;
	}
});
Object.defineProperty(exports, "createTencentDocsDocumentLifecycleDeps", {
	enumerable: true,
	get: function() {
		return createTencentDocsDocumentLifecycleDeps;
	}
});
Object.defineProperty(exports, "createTencentDocsLocalDocumentMediaTypes", {
	enumerable: true,
	get: function() {
		return createTencentDocsLocalDocumentMediaTypes;
	}
});
Object.defineProperty(exports, "createWorkbuddyEditorSdkSandbox", {
	enumerable: true,
	get: function() {
		return createWorkbuddyEditorSdkSandbox;
	}
});
Object.defineProperty(exports, "getBuildTimeNativeRuntimeBaseUrl", {
	enumerable: true,
	get: function() {
		return getBuildTimeNativeRuntimeBaseUrl;
	}
});
Object.defineProperty(exports, "installNativeRuntime", {
	enumerable: true,
	get: function() {
		return installNativeRuntime;
	}
});
Object.defineProperty(exports, "markQimei36Ready", {
	enumerable: true,
	get: function() {
		return markQimei36Ready;
	}
});
Object.defineProperty(exports, "projectResourceManager", {
	enumerable: true,
	get: function() {
		return projectResourceManager;
	}
});
Object.defineProperty(exports, "waitQimei36Ready", {
	enumerable: true,
	get: function() {
		return waitQimei36Ready;
	}
});
