const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_credential_protection = require("./credential-protection.js");
const require_tencent_docs_prompt_selection = require("./tencent-docs-prompt-selection.js");
const require_wb_source = require("./wb-source.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_proxy_agents = require("./proxy-agents.js");
const require_marks = require("./marks.js");
const require_conversations = require("./conversations.js");
const require_server = require("./server.js");
const require_tar = require("./tar.js");
const require_handler_registry = require("./handler-registry.js");
const require_runtime_handlers = require("./runtime-handlers.js");
const require_contract = require("./contract2.js");
const require_app_server_mcp_apps_host = require("./app-server-mcp-apps-host.js");
const require_credential_protection_bootstrap = require("./credential-protection-bootstrap.js");
const require_module_app_server = require("./module.app-server.js");
const require_celljs_deps = require("./celljs-deps.js");
const require_daemon_bootstrap = require("./daemon-bootstrap.js");
const require_app_server_database = require("./app-server-database2.js");
const require_app_server_migration_runtime = require("./app-server-migration-runtime2.js");
const require_file_authentication_storage = require("./file-authentication-storage.js");
const require_tencent_docs_document_lifecycle_port = require("./tencent-docs-document-lifecycle-port.js");
const require_legacy_auth_session_migrator = require("./legacy-auth-session-migrator.js");
const require_module_base = require("./module-base.js");
const require_selection_broadcast = require("./selection-broadcast2.js");
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
let node_net = require("node:net");
//#region ../../packages/workbuddy-core/src/wb/boundary/error-envelope.ts
var AXIOS_BODY_MAX_BYTES = 4096;
/**
* 把任意抛出的错误包成 `SerializedBridgeError`。
*
* 保留常见的 WBError 元数据字段（code / source / httpStatus / data）。
* 未来加字段直接扩展这里 + `deserializeResult`。
*/
function serializeBridgeError(error) {
	const err = error;
	let axiosEnvelope;
	if (err?.response || err?.config || err?.isAxiosError) {
		axiosEnvelope = {};
		if (err.response) axiosEnvelope.response = {
			...err.response.status !== void 0 ? { status: err.response.status } : {},
			...err.response.statusText ? { statusText: err.response.statusText } : {},
			...err.response.data !== void 0 ? { data: clampAxiosBody(err.response.data) } : {}
		};
		if (err.config) axiosEnvelope.config = {
			...err.config.url ? { url: err.config.url } : {},
			...err.config.method ? { method: err.config.method } : {}
		};
		if (err.code) axiosEnvelope.code = err.code;
	}
	return {
		__wbError: true,
		message: err?.message ?? String(error),
		...err?.code ? { code: err.code } : {},
		...err?.source ? { source: err.source } : {},
		...err?.httpStatus !== void 0 ? { httpStatus: err.httpStatus } : {},
		...err?.httpStatus === void 0 && err?.response?.status !== void 0 ? { httpStatus: err.response.status } : {},
		...err?.data !== void 0 ? { data: err.data } : {},
		...axiosEnvelope ? { axios: axiosEnvelope } : {}
	};
}
/**
* 把 axios response.data 序列化后 clamp 到 `AXIOS_BODY_MAX_BYTES` 以内。
*
* - string / object 都按 JSON 长度截断
* - 二进制 / 无法 JSON 序列化的 → 返回 `'(unserializable body)'` 兜底
* - 截断后附 `...(truncated N bytes)` 提示
*
* 目的：避免大响应体（HTML 错误页 / 大 JSON）塞满 IPC pipe，同时保留错误定位信息。
*/
function clampAxiosBody(body) {
	try {
		const s = typeof body === "string" ? body : JSON.stringify(body);
		if (typeof s !== "string") return "(unserializable body)";
		if (Buffer.byteLength(s, "utf-8") <= AXIOS_BODY_MAX_BYTES) return typeof body === "string" ? s : body;
		return `${s.slice(0, AXIOS_BODY_MAX_BYTES)}...(truncated ${s.length - AXIOS_BODY_MAX_BYTES} chars)`;
	} catch {
		return "(unserializable body)";
	}
}
/**
* 检测是否为跨边界错误信封。
*/
function isSerializedBridgeError(value) {
	return value !== null && typeof value === "object" && value.__wbError === true;
}
/**
* 反序列化 Server 返回值 —— 如果是错误信封就还原为 Error 并抛出，否则原样返回。
*
* Transport 的 `invoke` 与 Bridge Client 的返回值处理都应该 pipe 到这里：
* ```ts
* transport.invoke(...).then(deserializeResult)
* ```
*
* 还原后的 Error 会带 `name = 'WBError'`，业务层可用 `err.name === 'WBError'` 或
* `err.code` 判断是否为跨边界业务错误。
*/
function deserializeResult(result) {
	if (!isSerializedBridgeError(result)) return result;
	const { message, code, source, httpStatus, data, axios } = result;
	const err = new Error(message);
	err.name = "WBError";
	if (code) err.code = code;
	if (source) err.source = source;
	if (httpStatus !== void 0) err.httpStatus = httpStatus;
	if (data !== void 0) err.data = data;
	if (axios) {
		if (axios.response) err.response = { ...axios.response };
		if (axios.config) err.config = { ...axios.config };
		if (axios.code && !err.code) err.code = axios.code;
		err.isAxiosError = true;
	}
	throw err;
}
//#endregion
//#region ../../packages/workbuddy-core/src/wb/host/bridge/flatten.ts
/**
* 把一个 service 对象（可嵌套）展平为 channel → handler 映射。
*
* @param namespace 顶层命名空间名（如 'skills'）
* @param service 服务对象（可嵌套，如 { installed(), marketplace: { builtin: { list() } } }）
* @returns Map<channel, handler>
*
* @example
* flattenService('skills', skillsService)
* // → Map {
* //   'wb:skills:installed' => fn,
* //   'wb:skills:toggle' => fn,
* //   'wb:skills.marketplace.builtin:list' => fn,
* //   'wb:skills.enterprise:list' => fn,
* // }
*/
function flattenService(namespace, service, options = {}) {
	const handlers = /* @__PURE__ */ new Map();
	const resolveService = options.resolveService ?? (() => service);
	flatten(namespace, service, handlers, /* @__PURE__ */ new Set(), [], resolveService);
	return handlers;
}
var SKIP_KEYS = /* @__PURE__ */ new Set([
	"constructor",
	"prototype",
	"__proto__",
	"then"
]);
function flatten(path, obj, handlers, visited, ownerPath, resolveService) {
	if (visited.has(obj)) return;
	if (typeof obj === "function") return;
	visited.add(obj);
	const keys = /* @__PURE__ */ new Set();
	for (const key of Object.keys(obj)) keys.add(key);
	let proto = Object.getPrototypeOf(obj);
	while (proto && proto !== Object.prototype) {
		for (const key of Object.getOwnPropertyNames(proto)) keys.add(key);
		proto = Object.getPrototypeOf(proto);
	}
	for (const key of keys) {
		if (SKIP_KEYS.has(key)) continue;
		if (key.startsWith("_")) continue;
		const value = obj[key];
		if (typeof value === "function") {
			const channel = `wb:${path}:${key}`;
			handlers.set(channel, (_context, ...args) => {
				let owner = resolveService();
				for (const segment of ownerPath) {
					if (typeof owner !== "object" || owner === null) throw new Error(`[WBBridge] service path unavailable for channel: ${channel}`);
					owner = owner[segment];
				}
				if (typeof owner !== "object" || owner === null) throw new Error(`[WBBridge] service path unavailable for channel: ${channel}`);
				const method = owner[key];
				if (typeof method !== "function") throw new Error(`[WBBridge] method unavailable for channel: ${channel}`);
				return Promise.resolve(method.apply(owner, args));
			});
		} else if (typeof value === "object" && value !== null && !Array.isArray(value)) flatten(`${path}.${key}`, value, handlers, visited, [...ownerPath, key], resolveService);
	}
}
//#endregion
//#region ../../packages/workbuddy-core/src/wb/host/bridge/method-channel.ts
/**
* 把多个 namespace service（Record<string, object>）展平成 MethodChannel。
*
* 每个 service 的每个 method 注册为 `wb:{namespace}:{method}` channel；
* 嵌套对象注册为 `wb:{namespace}.{path}:{method}`。
*
* @param services flatten 走的普通 service 集合（method 签名 `(...args) => ...`）
* @param options 可选：`contextualHandlers` 覆盖 context 感知 channel；`authorizer` 装配权威授权拦截
*/
function createMethodChannel(services, options = {}) {
	const handlers = /* @__PURE__ */ new Map();
	for (const [namespace, service] of Object.entries(services)) {
		if (namespace.startsWith("_")) continue;
		if (typeof service !== "object" || service === null) continue;
		const map = flattenService(namespace, service, { resolveService: () => {
			const current = services[namespace];
			return typeof current === "object" && current !== null ? current : void 0;
		} });
		for (const [channel, handler] of map) handlers.set(channel, handler);
	}
	if (options.contextualHandlers) for (const [channel, handler] of options.contextualHandlers) handlers.set(channel, handler);
	const { authorizer } = options;
	const invoke = async (channel, context, ...args) => {
		if (authorizer && context?.subject && context.subject.type !== "host") await authorizer.assertAuthorized({
			subject: context.subject,
			action: {
				type: "invoke",
				channel
			}
		});
		const handler = handlers.get(channel);
		if (!handler) throw new Error(`[MethodChannel] no handler for channel: ${channel}`);
		return handler(context, ...args);
	};
	return {
		invoke,
		methods: () => Array.from(handlers.keys())
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/local-model/daemon-llama-server-manager.ts
/**
* Daemon 侧 llama-server 生命周期管理器。
*
* 职责：在 Daemon 进程中持有 llama-server 的唯一所有权，负责 spawn、health check、shutdown。
* CLI Worker 进程不再直接管理 llama-server，只通过 health check 消费端点。
*
* 设计：
* - 同一时刻只运行一个 llama-server 实例（单模型）
* - 模型切换时先 shutdown 旧实例再启动新实例
* - Daemon 进程退出时通过 shutdown hook 清理
* - 添加 --sleep-idle-seconds 让 llama-server 空闲时自动卸载模型释放 VRAM
*/
var LOG_PREFIX = "[DaemonLlamaServer]";
var STARTUP_TIMEOUT_MS = 18e4;
var HEALTH_POLL_INTERVAL_MS = 500;
var SHUTDOWN_TIMEOUT_MS = 5e3;
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function createLineBuffer(onLine) {
	let pending = "";
	return {
		write(chunk) {
			pending += typeof chunk === "string" ? chunk : chunk.toString("utf8");
			let newlineIndex = pending.indexOf("\n");
			while (newlineIndex >= 0) {
				const line = pending.slice(0, newlineIndex).replace(/\r$/, "");
				pending = pending.slice(newlineIndex + 1);
				if (line.length > 0) onLine(line);
				newlineIndex = pending.indexOf("\n");
			}
		},
		flush() {
			const line = pending.replace(/\r$/, "");
			pending = "";
			if (line.length > 0) onLine(line);
		}
	};
}
function parseEndpoint(url) {
	const parsed = new URL(url);
	const host = parsed.hostname || "127.0.0.1";
	const port = parsed.port ? Number.parseInt(parsed.port, 10) : 8080;
	return {
		host,
		port,
		baseURL: `${parsed.protocol}//${host}:${port}/v1`
	};
}
/**
* 解析 llama-server 可执行文件路径。
* 复用 agent-cli 侧的解析优先级：env > workbuddy state.json > cache latest。
*/
function resolveLlamaServerPath() {
	const envPath = process.env.LLAMA_SERVER_PATH;
	if (envPath) return envPath;
	const dataDir = process.env.WORKBUDDY_DATA_DIR || node_path.join(node_os.homedir(), ".workbuddy");
	const stateFile = node_path.join(dataDir, "local-models", "state.json");
	try {
		if (node_fs.existsSync(stateFile)) {
			const raw = node_fs.readFileSync(stateFile, "utf-8");
			const binPath = JSON.parse(raw)?.llamaServer?.binPath;
			if (typeof binPath === "string" && binPath && node_fs.existsSync(binPath)) return binPath;
		}
	} catch {}
}
/**
* 从 state.json 读取用户的"推理引擎常驻"偏好。
* true = 不卸载模型（--sleep-idle-seconds -1）
* false/undefined = 10 分钟空闲后卸载（--sleep-idle-seconds 600）
*/
function resolveEngineKeepAlive() {
	try {
		const dataDir = process.env.WORKBUDDY_DATA_DIR || node_path.join(node_os.homedir(), ".workbuddy");
		const stateFile = node_path.join(dataDir, "local-models", "state.json");
		if (node_fs.existsSync(stateFile)) {
			const raw = node_fs.readFileSync(stateFile, "utf-8");
			return JSON.parse(raw)?.engineKeepAlive === true;
		}
	} catch {}
	return false;
}
function resolveModelPath(modelConfig) {
	const modelPath = modelConfig.modelPath;
	if (!modelPath) return;
	if (node_path.isAbsolute(modelPath) && node_fs.existsSync(modelPath)) return modelPath;
}
function resolveMmProjPath(modelConfig) {
	const mmProjPath = modelConfig.mmProjPath;
	if (!mmProjPath) return;
	if (node_path.isAbsolute(mmProjPath) && node_fs.existsSync(mmProjPath)) return mmProjPath;
}
function createDaemonLlamaServerManager(options) {
	const { logger } = options;
	let child;
	let currentModel;
	let endpoint;
	let status = { state: "idle" };
	let startingPromise;
	let exitHandler;
	function registerExitHandler(proc) {
		unregisterExitHandler();
		exitHandler = () => {
			try {
				if (!proc.killed && proc.exitCode === null) proc.kill("SIGKILL");
			} catch {}
		};
		process.on("exit", exitHandler);
	}
	function unregisterExitHandler() {
		if (exitHandler) {
			process.off("exit", exitHandler);
			exitHandler = void 0;
		}
	}
	function attachStreamLogs(stream, level) {
		if (!stream) return;
		const buffer = createLineBuffer((line) => {
			const message = `${LOG_PREFIX} ${line}`;
			if (level === "warn") logger.warn(message);
			else logger.info(message);
		});
		stream.on("data", (chunk) => buffer.write(chunk));
		stream.on("end", () => buffer.flush());
		stream.on("error", (error) => {
			logger.warn(`${LOG_PREFIX} stream error: ${error.message}`);
		});
	}
	async function healthCheck(baseURL) {
		try {
			const origin = baseURL.replace(/\/v1\/?$/, "");
			return (await fetch(`${origin}/health`, { signal: AbortSignal.timeout(2e3) })).ok;
		} catch {
			return false;
		}
	}
	function buildLaunchArgs(params) {
		if (params.rawLaunchArgs?.length) {
			logger.info(`${LOG_PREFIX} buildLaunchArgs using rawLaunchArgs (${params.rawLaunchArgs.length} args), skipping defaults`);
			return [
				"-m",
				params.modelPath,
				"--host",
				params.host,
				"--port",
				String(params.port),
				...params.mmProjPath ? ["--mmproj", params.mmProjPath] : [],
				...params.rawLaunchArgs
			];
		}
		const configurableArgs = require_log_acl_guard.buildConfigurableArgs({
			maxInputTokens: params.maxInputTokens,
			maxOutputTokens: params.maxOutputTokens,
			launchOverrides: params.launchOverrides
		});
		if (params.launchOverrides?.args?.length || params.launchOverrides?.removedArgs?.length) logger.info(`${LOG_PREFIX} buildLaunchArgs applying overrides: removedArgs=${JSON.stringify(params.launchOverrides.removedArgs ?? [])} overrideArgs=${JSON.stringify(params.launchOverrides.args ?? [])}`);
		const keepAlive = resolveEngineKeepAlive();
		const sleepIdleValue = keepAlive ? "-1" : "600";
		const argsMap = require_log_acl_guard.parseArgsToMap(configurableArgs);
		argsMap.set("--sleep-idle-seconds", [sleepIdleValue]);
		logger.info(`${LOG_PREFIX} engineKeepAlive=${keepAlive} → --sleep-idle-seconds ${sleepIdleValue}`);
		const finalConfigArgs = [];
		for (const [key, values] of argsMap) finalConfigArgs.push(key, ...values);
		return [
			"-m",
			params.modelPath,
			"--host",
			params.host,
			"--port",
			String(params.port),
			...params.mmProjPath ? ["--mmproj", params.mmProjPath] : [],
			...finalConfigArgs
		];
	}
	async function waitForHealthy(host, port, timeoutMs, proc) {
		const deadline = Date.now() + timeoutMs;
		const healthUrl = `http://${host}:${port}/health`;
		while (Date.now() < deadline) {
			if (proc.exitCode !== null) throw new Error(`llama-server 启动失败，进程已退出 (code=${proc.exitCode})`);
			try {
				if ((await fetch(healthUrl, { signal: AbortSignal.timeout(2e3) })).ok) return;
			} catch {}
			await sleep(HEALTH_POLL_INTERVAL_MS);
		}
		throw new Error(`本地模型启动超时（${timeoutMs}ms），健康检查未通过: ${healthUrl}`);
	}
	async function startServer(modelName, modelConfig) {
		if (!modelConfig.url) throw new Error("本地模型缺少 API 地址（modelConfig.url）");
		const { host, port, baseURL } = parseEndpoint(modelConfig.url);
		const modelPath = resolveModelPath(modelConfig);
		if (!modelPath) throw new Error(`模型文件路径尚未配置或不存在: ${modelConfig.modelPath}`);
		if (await healthCheck(baseURL)) {
			logger.info(`${LOG_PREFIX} detected existing llama-server at ${host}:${port}, reusing`);
			currentModel = modelName;
			endpoint = baseURL;
			status = {
				state: "ready",
				modelName,
				endpoint: baseURL
			};
			return baseURL;
		}
		status = {
			state: "loading",
			modelName
		};
		const exePath = resolveLlamaServerPath();
		if (!exePath) throw new Error(`未找到 llama-server 可执行文件 (${process.platform}-${process.arch})。请先下载 llama-server，或设置 LLAMA_SERVER_PATH 环境变量。`);
		const llamaDir = node_path.dirname(exePath);
		const mmProjPath = resolveMmProjPath(modelConfig);
		if (mmProjPath) logger.info(`${LOG_PREFIX} mmproj resolved for model=${modelName}: ${mmProjPath}`);
		const args = buildLaunchArgs({
			host,
			port,
			modelPath,
			mmProjPath,
			rawLaunchArgs: modelConfig.rawLaunchArgs,
			maxInputTokens: modelConfig.maxInputTokens,
			maxOutputTokens: modelConfig.maxOutputTokens,
			launchOverrides: modelConfig.launchOverrides
		});
		logger.info(`${LOG_PREFIX} starting llama-server model=${modelName} host=${host} port=${port} modelPath=${modelPath} exe=${exePath} args=${JSON.stringify(args)}`);
		const env = process.platform === "win32" ? {
			SystemRoot: process.env.SystemRoot,
			SystemDrive: process.env.SystemDrive,
			TEMP: process.env.TEMP,
			TMP: process.env.TMP,
			PATH: [
				llamaDir,
				"C:\\Windows\\System32",
				"C:\\Windows"
			].join(";"),
			CUDA_PATH: process.env.CUDA_PATH
		} : {
			...process.env,
			DYLD_LIBRARY_PATH: llamaDir + (process.env.DYLD_LIBRARY_PATH ? `:${process.env.DYLD_LIBRARY_PATH}` : ""),
			LD_LIBRARY_PATH: llamaDir + (process.env.LD_LIBRARY_PATH ? `:${process.env.LD_LIBRARY_PATH}` : "")
		};
		const proc = (0, node_child_process.spawn)(exePath, args, {
			cwd: llamaDir,
			env,
			stdio: [
				"ignore",
				"pipe",
				"pipe"
			]
		});
		child = proc;
		attachStreamLogs(proc.stdout, "info");
		attachStreamLogs(proc.stderr, "warn");
		registerExitHandler(proc);
		proc.once("exit", (code, signal) => {
			logger.warn(`${LOG_PREFIX} llama-server exited code=${code} signal=${signal}`);
			if (child === proc) {
				child = void 0;
				currentModel = void 0;
				endpoint = void 0;
				if (status.state === "ready" || status.state === "loading") status = {
					state: "error",
					modelName,
					error: `llama-server 异常退出 (code=${code}, signal=${signal})`
				};
			}
		});
		try {
			await waitForHealthy(host, port, STARTUP_TIMEOUT_MS, proc);
			currentModel = modelName;
			endpoint = baseURL;
			status = {
				state: "ready",
				modelName,
				endpoint: baseURL
			};
			logger.info(`${LOG_PREFIX} ready model=${modelName} endpoint=${baseURL} pid=${proc.pid}`);
			return baseURL;
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			status = {
				state: "error",
				modelName,
				error: err.message
			};
			logger.error(`${LOG_PREFIX} start failed model=${modelName}: ${err.message}`);
			await doShutdown();
			throw err;
		}
	}
	async function doShutdown() {
		const proc = child;
		unregisterExitHandler();
		child = void 0;
		currentModel = void 0;
		endpoint = void 0;
		status = { state: "idle" };
		if (!proc || proc.killed || proc.exitCode !== null) return;
		logger.info(`${LOG_PREFIX} shutting down llama-server (pid=${proc.pid})`);
		await new Promise((resolve) => {
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				resolve();
			};
			proc.once("exit", finish);
			try {
				proc.kill("SIGTERM");
			} catch {
				finish();
				return;
			}
			setTimeout(() => {
				if (!settled) {
					logger.warn(`${LOG_PREFIX} SIGTERM timeout, sending SIGKILL (pid=${proc.pid})`);
					try {
						proc.kill("SIGKILL");
					} catch {}
				}
				setTimeout(finish, 100);
			}, SHUTDOWN_TIMEOUT_MS);
		});
		logger.info(`${LOG_PREFIX} shutdown complete`);
	}
	let startingModelName;
	return {
		async ensureReady(modelName, modelConfig) {
			logger.info(`${LOG_PREFIX} ensureReady model=${modelName} currentModel=${currentModel ?? "none"} state=${status.state}`);
			if (startingPromise && startingModelName === modelName) {
				logger.info(`${LOG_PREFIX} reusing in-flight start promise model=${modelName}`);
				return startingPromise;
			}
			if (currentModel === modelName && endpoint && await healthCheck(endpoint)) {
				logger.info(`${LOG_PREFIX} already ready model=${modelName} endpoint=${endpoint}`);
				return endpoint;
			}
			if (child && currentModel && currentModel !== modelName) {
				logger.info(`${LOG_PREFIX} model switch ${currentModel} → ${modelName}, shutting down old`);
				await doShutdown();
			}
			startingModelName = modelName;
			startingPromise = startServer(modelName, modelConfig);
			try {
				return await startingPromise;
			} finally {
				startingPromise = void 0;
				startingModelName = void 0;
			}
		},
		async shutdown() {
			startingPromise = void 0;
			await doShutdown();
		},
		getStatus() {
			return status;
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/stdio-server.ts
function serveDaemonRpcOverStdio(options) {
	const disposePush = options.server.onPush((channel, data) => {
		require_log_acl_guard.writeDaemonStdioFrame(options.output, {
			type: "rpc-event",
			id: (0, node_crypto.randomUUID)(),
			channel,
			result: data
		});
	});
	const reader = require_log_acl_guard.createDaemonStdioFrameReader(options.input, {
		onFrame: (frame) => {
			if (frame.type !== "rpc-request") {
				if (options.onUnhandledFrame?.(frame)) return;
				options.logger?.warn("Ignoring non-request frame on daemon stdio server", { type: frame.type });
				return;
			}
			handleRequestFrame(options, frame);
		},
		onInvalidLine: (line, error) => {
			options.logger?.warn("Ignoring invalid daemon stdio input line", {
				line,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	});
	if (options.emitReady !== false) require_log_acl_guard.writeDaemonStdioFrame(options.output, {
		type: "ready",
		pid: process.pid
	});
	return () => {
		reader.dispose();
		disposePush();
	};
}
async function handleRequestFrame(options, frame) {
	try {
		const result = await options.server.invokeLocal(frame.channel, ...Array.isArray(frame.args) ? frame.args : []);
		require_log_acl_guard.writeDaemonStdioFrame(options.output, {
			type: "rpc-response",
			id: frame.id,
			channel: frame.channel,
			result
		});
	} catch (error) {
		const bizDetail = extractBizDetail(error);
		require_log_acl_guard.writeDaemonStdioFrame(options.output, {
			type: "rpc-error",
			id: frame.id,
			channel: frame.channel,
			error: {
				code: isNoHandlerError(error) ? require_log_acl_guard.RPC_ERROR_CODES.NO_HANDLER : require_log_acl_guard.RPC_ERROR_CODES.HANDLER_ERROR,
				message: formatError$1(error),
				...bizDetail ?? {}
			}
		});
	}
}
function isNoHandlerError(error) {
	return error instanceof Error && /^No handler for /.test(error.message);
}
function formatError$1(error) {
	if (error instanceof Error) return error.message;
	return String(error);
}
function extractBizDetail(error) {
	if (!error || typeof error !== "object") return;
	const source = error;
	const detail = {};
	if (typeof source.code === "number" || typeof source.code === "string") detail.bizCode = source.code;
	const httpStatus = source.httpStatus ?? source.status ?? source.response?.status;
	if (typeof httpStatus === "number") detail.httpStatus = httpStatus;
	if (source.data !== void 0) detail.data = source.data;
	return Object.keys(detail).length > 0 ? detail : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/stdio-parent-rpc-client.ts
var PARENT_PENDING_THRESHOLDS = [
	8,
	32,
	128
];
var PARENT_SLOW_RPC_MS = 500;
var PARENT_VERY_SLOW_RPC_MS = 5e3;
function createStdioParentRpcClient(options) {
	const pending = /* @__PURE__ */ new Map();
	let crossedThresholds = /* @__PURE__ */ new Set();
	const rejectAll = (error) => {
		if (pending.size > 0) options.logger?.warn("[ParentRPC] rejectAll pending", {
			size: pending.size,
			errorMessage: error.message
		});
		for (const [, request] of pending) request.reject(error);
		pending.clear();
		crossedThresholds = /* @__PURE__ */ new Set();
	};
	return {
		invoke(channel, ...args) {
			const id = (0, node_crypto.randomUUID)();
			const frame = {
				type: "rpc-request",
				id,
				channel,
				args
			};
			return new Promise((resolve, reject) => {
				pending.set(id, {
					channel,
					resolve,
					reject,
					createdAt: Date.now()
				});
				const size = pending.size;
				for (const t of PARENT_PENDING_THRESHOLDS) if (size >= t && !crossedThresholds.has(t)) {
					crossedThresholds.add(t);
					options.logger?.warn("[ParentRPC] pending size crossed threshold", {
						threshold: t,
						size,
						channel
					});
					break;
				}
				try {
					require_log_acl_guard.writeDaemonStdioFrame(options.output, frame);
				} catch (error) {
					pending.delete(id);
					reject(error);
				}
			});
		},
		handleFrame(frame) {
			if (frame.type === "rpc-response") {
				const request = pending.get(frame.id);
				if (!request) return false;
				pending.delete(frame.id);
				const ageMs = Date.now() - request.createdAt;
				if (ageMs >= PARENT_VERY_SLOW_RPC_MS) options.logger?.warn("[ParentRPC] rpc VERY SLOW", {
					channel: request.channel,
					ageMs,
					remaining: pending.size
				});
				else if (ageMs >= PARENT_SLOW_RPC_MS) options.logger?.info?.("[ParentRPC] rpc slow", {
					channel: request.channel,
					ageMs,
					remaining: pending.size
				});
				request.resolve(frame.result);
				return true;
			}
			if (frame.type === "rpc-error") {
				const request = pending.get(frame.id);
				if (!request) return false;
				pending.delete(frame.id);
				const ageMs = Date.now() - request.createdAt;
				if (ageMs >= PARENT_VERY_SLOW_RPC_MS) options.logger?.warn("[ParentRPC] rpc VERY SLOW (rejected)", {
					channel: request.channel,
					ageMs,
					remaining: pending.size
				});
				request.reject(createDaemonRpcError(frame.error, frame.channel ?? request.channel));
				return true;
			}
			return false;
		},
		rejectPending: rejectAll
	};
}
function createDaemonRpcError(error, channel) {
	const message = error.message || `Parent RPC failed for "${channel}"`;
	const result = new Error(message);
	result.code = error.bizCode ?? error.code ?? require_log_acl_guard.RPC_ERROR_CODES.HANDLER_ERROR;
	if (error.bizCode !== void 0) result.bizCode = error.bizCode;
	if (error.httpStatus !== void 0) result.httpStatus = error.httpStatus;
	if (error.data !== void 0) result.data = error.data;
	return result;
}
//#endregion
//#region ../../packages/workbuddy-server/src/hub/conversation-runtime-warm-cache.ts
var DEFAULT_TTL_MS = 3e4;
/**
* 账号级轻量 runtime facts 缓存。只预热设备/token/project MCP/plugin 描述，不创建 ACP Worker。
* Tencent Docs 等动态 env 始终实时解析并在后台 warm，不进入此快照的关键路径。
* generation 防止 A 的慢 warm 在 B 登录后覆盖新身份；读取时再校验 ownerKey + 短 TTL。
*/
var ConversationRuntimeWarmCache = class {
	constructor(deps) {
		this.deps = deps;
		this.generation = 0;
	}
	warm(ownerKey) {
		if (this.get()?.ownerKey === ownerKey) return Promise.resolve();
		if (this.warming?.ownerKey === ownerKey) return this.warming.promise;
		const generation = ++this.generation;
		const promise = this.doWarm(ownerKey, generation).finally(() => {
			if (this.warming?.promise === promise) this.warming = void 0;
		});
		this.warming = {
			ownerKey,
			promise
		};
		return promise;
	}
	async doWarm(ownerKey, generation) {
		const startedAt = performance.now();
		try {
			const connectorTokenEnv = { ...this.deps.loadConnectorTokenEnv() };
			const projectMcpServersBySession = { ...this.deps.loadProjectMcpServersBySession() };
			const [accountFacts, pluginFacts] = await Promise.all([this.deps.resolveAccountFacts(), loadConversationRuntimePluginWarmFacts(this.deps.configDir)]);
			const warmMs = performance.now() - startedAt;
			if (generation !== this.generation || this.deps.getCurrentOwnerKey() !== ownerKey) return;
			this.snapshot = {
				ownerKey,
				expiresAt: Date.now() + (this.deps.ttlMs ?? DEFAULT_TTL_MS),
				warmMs,
				qimei36: accountFacts.qimei36,
				connectorTokenEnv,
				projectMcpServersBySession,
				pluginFacts
			};
			this.deps.logger?.info("[ConversationRuntimeWarmCache] warm complete", { warm_ms: Math.round(warmMs) });
			this.report(warmMs, false, "warm");
		} catch (error) {
			const warmMs = performance.now() - startedAt;
			this.deps.logger?.warn("[ConversationRuntimeWarmCache] warm failed", error);
			this.report(warmMs, false, "warm_error");
		}
	}
	clear() {
		this.generation++;
		this.snapshot = void 0;
		this.warming = void 0;
	}
	get() {
		const ownerKey = this.deps.getCurrentOwnerKey();
		const snapshot = this.snapshot;
		const hit = !!ownerKey && snapshot?.ownerKey === ownerKey && snapshot.expiresAt > Date.now();
		this.report(snapshot?.warmMs ?? 0, hit, "resolve");
		return hit ? snapshot : void 0;
	}
	/**
	* 插件启用表：**不受快照 TTL 支配**，每次实时读 settings.json。
	*
	* `enabledPlugins` 是 OS 用户级配置，不是账号 facts，但它会经 sessionSettings
	* 进入 launchSpec 的 restartFingerprint。跟着 30s 账号快照 TTL 走时，同一份没改过
	* 的配置会随「这一轮恰好命中 / 恰好过期」在「全量」与「缺省」之间翻转，指纹随之在
	* 两个值之间来回跳 —— 每轮对话结束都被判定为配置变更 → killWorker 重启 CLI 宿主，
	* 新宿主重新注册 plugin MCP，落在注册窗口里的那一轮就少掉最慢那个 server 的工具
	* （#111521：sheetagent 恒定最后连上，available_deferred_tools 34→24）。
	*
	* 读失败回落到上一次快照（忽略过期）而不是返回空表：空表本身也是一次伪变化，
	* 会把一次瞬时 fs 错误放大成一次重启。
	*/
	async resolvePluginFacts() {
		return await readPluginWarmFacts(this.deps.configDir) ?? this.snapshot?.pluginFacts ?? { enabledPlugins: {} };
	}
	report(warmMs, hit, phase) {
		try {
			require_server.getAegisReporter()?.("conversation_runtime_warm", {
				warm_ms: Math.round(warmMs),
				hit: String(hit),
				phase
			});
		} catch {}
	}
};
/**
* 读不到 / 解析失败一律返回 `undefined`，由调用方决定回落策略。
* 不在这里代偿成空表：空表与真实的「一个都没启用」不可区分，会被下游当成配置变更。
*/
async function readPluginWarmFacts(configDir) {
	try {
		return { enabledPlugins: { ...JSON.parse(await node_fs_promises.readFile(node_path.join(configDir, "settings.json"), "utf8")).enabledPlugins ?? {} } };
	} catch {
		return;
	}
}
/** 读取 enabledPlugins；marketplace 来源始终由 Agent CLI 的标准 registry 解析。 */
async function loadConversationRuntimePluginWarmFacts(configDir) {
	return await readPluginWarmFacts(configDir) ?? { enabledPlugins: {} };
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/app-server-entry-runtime.ts
function assertWorkbuddyAppServerStdioMode(argv) {
	if (!argv.includes("--stdio")) throw new Error("Missing --stdio");
}
function configureWorkbuddyAppServerRuntimeContextFromEnv(platform) {
	require_code_cache.configureWorkbuddyRuntimeContext({
		appPath: platform.appRootPath,
		configDir: platform.configDir,
		locale: process.env.WORKBUDDY_LOCALE?.trim() || void 0,
		promptTemplatesDir: process.env.WORKBUDDY_PROMPT_TEMPLATES_DIR?.trim() || void 0,
		userDataDir: platform.dataDir
	});
}
function createWorkbuddyAppServerPlatformFromEnv(options = {}) {
	const execPath = options.execPath ?? process.execPath;
	const resourcesPath = process.env.WORKBUDDY_RESOURCES_PATH?.trim() || options.processResourcesPath || node_path.dirname(execPath);
	return {
		appRootPath: require_code_cache.getWorkbuddyRuntimeAppPath(),
		resourcesPath,
		dataDir: require_code_cache.getWorkbuddyRuntimeUserDataDir(),
		configDir: require_code_cache.getWorkbuddyRuntimeConfigDir(),
		isPackaged: readBooleanEnv("WORKBUDDY_IS_PACKAGED"),
		appVersion: require_code_cache.getWorkbuddyRuntimeAppVersion() || "0.0.0",
		osPlatform: options.osPlatform ?? process.platform,
		appLocale: () => require_code_cache.getWorkbuddyRuntimeLocale(),
		openExternal: async () => {
			throw new Error("WorkBuddy app-server platform openExternal is not available; use DesktopHost IPC bridge");
		},
		openPath: async () => {
			throw new Error("WorkBuddy app-server platform openPath is not available; use DesktopHost IPC bridge");
		},
		showItemInFolder: () => {
			throw new Error("WorkBuddy app-server platform showItemInFolder is not available; use DesktopHost IPC bridge");
		},
		showOpenDialog: async () => ({
			canceled: true,
			filePaths: []
		}),
		showSaveDialog: async () => ({ canceled: true }),
		showMessageBox: async () => ({ response: 0 }),
		readClipboard: () => ""
	};
}
function readBooleanEnv(key) {
	const value = process.env[key]?.trim().toLowerCase();
	return value === "1" || value === "true" || value === "yes";
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/app-server-stdio-lifecycle.ts
function startWorkbuddyAppServerStdioLifecycle({ server, getPingStatus, shutdown: stopServices, flushCliPrewarmPool, input = process.stdin, output = process.stdout, onUnhandledFrame, emitReady = true, logger = console, exit }) {
	let disposeStdio;
	let stopped = false;
	let readySignaled = false;
	const signalReady = () => {
		if (readySignaled) return;
		readySignaled = true;
		require_log_acl_guard.writeDaemonStdioFrame(output, {
			type: "ready",
			pid: process.pid
		});
	};
	const shutdown = async () => {
		if (stopped) return;
		stopped = true;
		disposeCatalogStdio?.();
		disposeStdio?.();
		await stopServices();
		exit?.(0);
	};
	require_log_acl_guard.registerDaemonLifecycleHandlers(server, {
		getPingStatus,
		shutdown,
		flushCliPrewarmPool
	});
	disposeStdio = serveDaemonRpcOverStdio({
		server,
		input,
		output,
		onUnhandledFrame,
		emitReady,
		logger: { warn: (message, meta) => {
			logger.warn(message, meta);
		} }
	});
	const disposeCatalogStdio = attachCatalogStdio(server, logger);
	if (emitReady) readySignaled = true;
	return {
		signalReady,
		shutdown,
		dispose() {
			stopped = true;
			disposeCatalogStdio?.();
			disposeStdio?.();
			disposeStdio = void 0;
		}
	};
}
/** 环境打开时再挂一对 fd3/fd4，同一套 invokeLocal，不发 ready、不推事件。 */
function attachCatalogStdio(server, logger) {
	if (!require_log_acl_guard.isCatalogListStdioEnabled()) return;
	try {
		const input = new node_net.Socket({
			fd: 3,
			readable: true,
			writable: false
		});
		const output = new node_net.Socket({
			fd: 4,
			readable: false,
			writable: true
		});
		const dispose = serveDaemonRpcOverStdio({
			server: {
				invokeLocal: (channel, ...args) => server.invokeLocal(channel, ...args),
				onPush: () => () => void 0
			},
			input,
			output,
			emitReady: false,
			logger
		});
		return () => {
			try {
				dispose();
			} catch {}
			input.destroy();
			output.destroy();
		};
	} catch (error) {
		logger.warn("[CatalogStdio] fd3/4 unavailable, catalog RPC stays on session stdio", { error: error instanceof Error ? error.message : String(error) });
		return;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/disk-cleanup/builtin-resources.ts
require_credential_protection.init_credential_protection();
require_code_cache.init_common$3();
/**
* 内置磁盘资源注册（#103878 附录 A 的 7 类膨胀中 daemon 可兜底回收的 6 类）。
*
* 各类别的主责进程不变（desktop 归档流程、binary-manager、CLI 等）；
* 这里是 daemon 常驻兜底：即使主责进程被杀/未触发，膨胀产物也能在
* 声明的保留期内被回收，结束「打标/下载/备份后零删除」的状态。
*
* 未接入的类别：
* - 单会话 SDK 日志（requests:result）：条目生命周期跟随 session，
*   由 data-retention 的会话保留策略统一管辖（删 session 时连带清产物），
*   在此按目录单独扫会有误删活跃会话日志的风险。
*/
function createBuiltinDiskResources(configDir) {
	const logsDir = node_path.join(configDir, "logs");
	const binariesDir = node_path.join(configDir, "binaries");
	return [
		{
			id: "expired-log-dirs",
			description: "cleanup-old-logs 打标的 *.expired* 日志目录：desktop 侧限量物理删除，daemon 兜底回收 7 天前的残留",
			listScanDirs: () => [logsDir],
			matchesEntryName: (name) => name.includes(".expired"),
			policy: { maxAgeMs: 6048e5 }
		},
		{
			id: "archive-artifact-tmp",
			description: "日志归档中间产物（*.zip.tmp / *.staging）：对齐 desktop STALE_ARTIFACT_AGE_MS，归档 worker 被强杀/OOM 后的残留",
			listScanDirs: () => [logsDir],
			matchesEntryName: (name) => name.endsWith(".zip.tmp") || name.endsWith(".staging"),
			policy: { maxAgeMs: 6e5 }
		},
		{
			id: "agent-traces",
			description: "agent-cli 遥测 traces/<pid> 目录：CLI 侧清理被 WorkBuddy 禁用（CODEBUDDY_DISABLE_SESSION_HISTORY_CLEANUP），daemon 接管 30 天保留",
			listScanDirs: () => [node_path.join(configDir, "traces")],
			matchesEntryName: () => true,
			policy: { maxAgeMs: 2592e6 }
		},
		{
			id: "session-repair-backups",
			description: "SessionFragmentRepairService 的 projects_repair_backup_* 整目录备份：只 create 无 cleanup，修复有 3 次尝试上限，7 天足够排障",
			listScanDirs: () => [configDir],
			matchesEntryName: (name) => name.startsWith("projects_repair_backup_"),
			policy: { maxAgeMs: 6048e5 }
		},
		{
			id: "binary-download-cache",
			description: "binary-manager 下载缓存 binaries/.cache/downloads：无 TTL 清理，安装产物已在 versions/ 下，缓存 7 天后兜底回收",
			listScanDirs: () => [node_path.join(binariesDir, ".cache", "downloads")],
			matchesEntryName: () => true,
			policy: { maxAgeMs: 6048e5 }
		},
		{
			id: "binary-installing-residue",
			description: "binary-manager 安装中断残留（*.installing.* / *.deleting.* / *.tmp / *.downloading / *__extract_temp__）：24h 兜底回收，远大于任何安装时长，不误删进行中的安装",
			listScanDirs: () => [node_path.join(binariesDir, "node", "versions"), node_path.join(binariesDir, "python", "versions")],
			matchesEntryName: (name) => name.includes(".installing") || name.includes(".deleting.") || name.includes("__extract_temp__") || name.endsWith(".tmp") || name.endsWith(".downloading"),
			policy: { maxAgeMs: 864e5 }
		}
	];
}
//#endregion
//#region ../../packages/workbuddy-server/src/disk-cleanup/disk-resource-registry.ts
/**
* 统一磁盘资源注册表（#103878）。
*
* 与内存侧 MemoryCleanupService 的 cacheManagers / subscriptionManagers 集合对称：
* 新增落盘能力必须在此登记保留策略，从根上杜绝「只 create 无 cleanup」的
* SessionFragmentRepairService 式缺陷（见 issue #103878 负向证据）。
*/
var DiskResourceRegistry = class {
	constructor() {
		this.descriptors = /* @__PURE__ */ new Map();
	}
	register(descriptor) {
		if (this.descriptors.has(descriptor.id)) {
			const error = /* @__PURE__ */ new Error(`[DiskCleanup] duplicate disk resource id: ${descriptor.id}`);
			error.code = "WORKBUDDY_DISK_CLEANUP_DUPLICATE_RESOURCE";
			throw error;
		}
		this.descriptors.set(descriptor.id, descriptor);
		return () => {
			if (this.descriptors.get(descriptor.id) === descriptor) this.descriptors.delete(descriptor.id);
		};
	}
	unregister(id) {
		this.descriptors.delete(id);
	}
	list() {
		return [...this.descriptors.values()];
	}
};
function createDiskResourceRegistry(initial = []) {
	const registry = new DiskResourceRegistry();
	for (const descriptor of initial) registry.register(descriptor);
	return registry;
}
//#endregion
//#region ../../packages/workbuddy-server/src/disk-cleanup/service.ts
var TAG = "[DiskCleanup]";
var STARTUP_DELAY_MS = 5e3;
var CLEANUP_INTERVAL_MS = 864e5;
/**
* 统一磁盘 TTL 回收器（#103878）：按 DiskResourceRegistry 声明的保留策略
* 定期巡检回收，替代 7 类膨胀各自的 ad-hoc 清理。与 data-retention 的
* startSchedule（5s 延迟 + 24h interval）同节奏；定时器全部 unref，daemon
* 退出不被拖住，也无需显式 stop。
*/
function createDiskCleanupService(deps) {
	let running = false;
	let lastSummary = null;
	const report = (metric, count, dims) => {
		try {
			deps.reporter?.addCounter(metric, count, dims);
		} catch {}
	};
	const cleanupEntryInScanDir = async (entrySummary, scanDir, maxAgeMs, matchesEntryName) => {
		let entries;
		try {
			entries = await node_fs.promises.readdir(scanDir, { withFileTypes: true });
		} catch {
			return;
		}
		const now = Date.now();
		for (const entry of entries) {
			if (!matchesEntryName(entry.name)) continue;
			entrySummary.scanned += 1;
			const target = node_path.join(scanDir, entry.name);
			try {
				const stat = await node_fs.promises.lstat(target);
				if (stat.isSymbolicLink()) continue;
				if (now - stat.mtimeMs < maxAgeMs) continue;
				const bytes = entry.isDirectory() ? await require_server.walkDirectorySize(target) : stat.size;
				await node_fs.promises.rm(target, {
					recursive: true,
					force: true
				});
				entrySummary.deleted += 1;
				entrySummary.reclaimedBytes += bytes;
			} catch (err) {
				entrySummary.errors += 1;
				if (err?.code !== "ENOENT") deps.logger?.warn(`${TAG} cleanup ${entrySummary.resourceId} entry failed: ${target} - ${String(err?.message ?? err)}`);
			}
		}
	};
	const runCleanupInner = async () => {
		const startedAt = Date.now();
		const summary = {
			executed: true,
			startedAt,
			finishedAt: 0,
			entries: [],
			totalDeleted: 0,
			totalReclaimedBytes: 0
		};
		for (const descriptor of deps.registry.list()) {
			const entrySummary = {
				resourceId: descriptor.id,
				scanned: 0,
				deleted: 0,
				reclaimedBytes: 0,
				errors: 0
			};
			try {
				const scanDirs = await descriptor.listScanDirs();
				for (const scanDir of scanDirs) await cleanupEntryInScanDir(entrySummary, scanDir, descriptor.policy.maxAgeMs, descriptor.matchesEntryName);
			} catch (err) {
				entrySummary.errors += 1;
				deps.logger?.warn(`${TAG} resource ${descriptor.id} sweep failed: ${String(err?.message ?? err)}`);
			}
			summary.entries.push(entrySummary);
			summary.totalDeleted += entrySummary.deleted;
			summary.totalReclaimedBytes += entrySummary.reclaimedBytes;
			if (entrySummary.deleted > 0) {
				report("wb.disk.cleanup.deleted_entries", entrySummary.deleted, { resource: descriptor.id });
				report("wb.disk.cleanup.reclaimed_bytes", entrySummary.reclaimedBytes, { resource: descriptor.id });
			}
		}
		summary.finishedAt = Date.now();
		if (summary.totalDeleted > 0) deps.logger?.info(`${TAG} sweep done in ${summary.finishedAt - startedAt}ms: deleted=${summary.totalDeleted} reclaimedMB=${Math.round(summary.totalReclaimedBytes / 1048576)}`);
		return summary;
	};
	const runCleanup = async () => {
		if (running) return lastSummary ?? {
			executed: false,
			startedAt: Date.now(),
			finishedAt: Date.now(),
			entries: [],
			totalDeleted: 0,
			totalReclaimedBytes: 0
		};
		running = true;
		try {
			lastSummary = await runCleanupInner();
			return lastSummary;
		} finally {
			running = false;
		}
	};
	/**
	* 定时巡检（轮询论证，评审要求）：
	* - 原因/必要性：7 类磁盘膨胀的主责进程（desktop 归档流程 / binary-manager / CLI）
	*   均可能被强杀或未触发（#103878 实测 ~10.7GB 零回收），daemon 是唯一常驻进程，
	*   兜底回收只能由它轮询驱动；无事件源可订阅（残留产生于崩溃/断电等异常路径）。
	* - 替代方案：各膨胀点逐一接入事件回调需要跨进程（desktop→daemon）通知协议，
	*   且覆盖不了"进程已死"场景；轮询是最小可靠兜底。
	* - 运行参数：interval=24h 固定 + 启动延迟 5s（对齐 data-retention 的
	*   STARTUP_DELAY_MS 惯例，避开冷启动 IO 高峰）。巡检为纯本地 fs 扫描
	*   （readdir + lstat，量级=各扫描目录直接子条目数），**无任何网络请求**，
	*   不存在服务端 QPS/容量影响，故无需 backoff/jitter/timeout。
	* - single-flight：runCleanup 内 running 标志互斥，巡检重叠时直接返回上次
	*   summary，不会并发扫描。
	* - 停止与清理：两个定时器均 unref（不阻塞进程退出），并返回 stop() 句柄
	*   供宿主显式停止；daemon 消亡即停，无句柄泄漏。
	*/
	const startSchedule = () => {
		const intervalMs = deps.intervalMs ?? CLEANUP_INTERVAL_MS;
		const startupTimer = setTimeout(() => {
			runCleanup().catch((err) => {
				deps.logger?.warn(`${TAG} startup sweep failed: ${String(err?.message ?? err)}`);
			});
		}, deps.startupDelayMs ?? STARTUP_DELAY_MS);
		startupTimer.unref?.();
		const intervalTimer = setInterval(() => {
			runCleanup().catch((err) => {
				deps.logger?.warn(`${TAG} interval sweep failed: ${String(err?.message ?? err)}`);
			});
		}, intervalMs);
		intervalTimer.unref?.();
		return { stop() {
			clearTimeout(startupTimer);
			clearInterval(intervalTimer);
		} };
	};
	return {
		runCleanup,
		startSchedule
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/lookup-official-plugin-name.ts
/**
* 在 COS manifest 里按 id / sourceId / marketExpertId 三路匹配，返回命中的 pluginName。
* 任一命中即返回，找不到返回 undefined。
*/
async function lookupPluginNameFromCosManifest(id, fallback) {
	const hit = ((await fallback.getManifest())?.experts ?? []).find((e) => e.id === id || e.sourceId === id || e.marketExpertId === id);
	return (typeof hit?.plugin === "string" ? hit.plugin.trim() : "") || void 0;
}
function createLookupOfficialPluginName(http, deps) {
	return async (expertId) => {
		const id = expertId.trim();
		if (!id) {
			deps?.logger?.warn?.("[lookup-official-plugin-name] empty id");
			return;
		}
		let opPluginName;
		try {
			const items = await require_conversations.fetchOperationPlatformExpertsByIds(http, {
				routePrefix: "/portal",
				ids: [id],
				includeInvisible: true
			});
			const item = items.find((it) => it.expert_id === id);
			opPluginName = typeof item?.plugin_name === "string" && item.plugin_name.trim() ? item.plugin_name.trim() : void 0;
			deps?.logger?.info?.("[lookup-official-plugin-name] result " + JSON.stringify({
				id,
				itemsCount: items.length,
				items: items.map((it) => ({
					expert_id: it.expert_id,
					plugin_name: it.plugin_name
				})),
				matched: Boolean(item),
				pluginName: opPluginName ?? null
			}));
		} catch (error) {
			deps?.logger?.warn?.("[lookup-official-plugin-name] fetch failed " + JSON.stringify({
				id,
				errorMessage: error instanceof Error ? error.message : String(error),
				errorStack: error instanceof Error ? error.stack?.split("\n").slice(0, 5) : void 0
			}));
		}
		if (opPluginName) return opPluginName;
		if (!deps?.manifestFallback) return;
		try {
			const pluginName = await lookupPluginNameFromCosManifest(id, deps.manifestFallback);
			deps?.logger?.info?.("[lookup-official-plugin-name] cos-fallback " + JSON.stringify({
				id,
				pluginName: pluginName ?? null
			}));
			return pluginName;
		} catch (error) {
			deps?.logger?.warn?.("[lookup-official-plugin-name] cos-fallback failed " + JSON.stringify({
				id,
				errorMessage: error instanceof Error ? error.message : String(error)
			}));
			return;
		}
	};
}
function createLookupOfficialDownloadUrl(http, deps) {
	return async (expertId) => {
		const id = expertId.trim();
		if (!id) {
			deps?.logger?.warn?.("[lookup-official-download-url] empty id");
			return;
		}
		if (!id.startsWith("ex_")) {
			deps?.logger?.info?.("[lookup-official-download-url] skip non-ex_ id " + JSON.stringify({ id }));
			return;
		}
		try {
			const resp = await http.post("/portal/operation-platform/market/expert/download-url", { expert_id: id });
			const url = typeof resp.data?.download_url === "string" ? resp.data.download_url : "";
			deps?.logger?.info?.("[lookup-official-download-url] result " + JSON.stringify({
				id,
				code: resp.code,
				hasUrl: Boolean(url),
				version: resp.data?.version,
				expiresAt: resp.data?.expires_at
			}));
			if (resp.code !== 0 || !url) return;
			return url;
		} catch (error) {
			deps?.logger?.warn?.("[lookup-official-download-url] fetch failed " + JSON.stringify({
				id,
				errorMessage: error instanceof Error ? error.message : String(error)
			}));
			return;
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/app-server-addons/conversation-expert-runtime-preparer.ts
/**
* Conversations launch 边界的 server-private expert runtime preparer。
*
* 只读 sessions 投影的 ExpertSelection，做 authoritative lookup / materialize /
* exact validate，产出内存 PreparedExpertRuntimeFacts。不写 sessions。
* 官方市场、以及无 marketplace 列的历史裸 id（本地 0 命中后），按 OP
* get-by-ids 的 plugin_name 匹配已落地目录或下载。不读 COS catalog。
* 企业下发专家（runtimeIdentity.source=enterprise）不走官方 OP，按
* pluginRegisteredName 命中 `experts/plugins/<name>`（#108261）。
* kebab 不得当下载名。禁止省略 pluginName。
*
* 名字匹配只用于收敛候选，不能单独定案：官方市场里 dirName / manifest.name / agentName
* 三套名字互相交叉（目录 `ppt-creation-expert` 属于 LexiangPptExpert，而 `PptCreationExpert`
* 的包叫 `ppt-implement`），撞车是常态。撞车时按 OP plugin_name → 本机落地记录定夺（#99334）；
* 两个来源都答不上来才按 marketplace → 非 leftover dirName → leftover `ex_*`
* 取一个并 warn（#99876 / #63855：撞车不该让会话判死）。
*/
var EXPERTS_MARKETPLACE$1 = "experts";
var EXPERT_UNAVAILABLE = "EXPERT_UNAVAILABLE";
var EXPERT_ID_AMBIGUOUS = "EXPERT_ID_AMBIGUOUS";
var KNOWN_MARKETPLACE_ALIASES = /* @__PURE__ */ new Set([
	"builtin",
	"official",
	EXPERTS_MARKETPLACE$1,
	"custom",
	require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME
]);
var PLUGIN_METADATA_DIRS = [".codebuddy-plugin", ".workbuddy-plugin"];
var PLUGIN_MANIFEST_FILE = "plugin.json";
var ExpertRuntimePrepareError = class extends Error {
	constructor(prepareErrorCode, message) {
		super(message);
		this.name = "ExpertRuntimePrepareError";
		this.prepareErrorCode = prepareErrorCode;
	}
};
function rawExpertFingerprintKey(fingerprint) {
	return JSON.stringify({
		expertId: fingerprint.expertId ?? null,
		expertMarketplace: fingerprint.expertMarketplace ?? null,
		expertRuntimeIdentity: fingerprint.expertRuntimeIdentity ?? null
	});
}
function fingerprintsEqual(left, right) {
	return rawExpertFingerprintKey(left) === rawExpertFingerprintKey(right);
}
function normalizeMarketplaceAlias(marketplace) {
	if (!marketplace) return;
	if (marketplace === "builtin" || marketplace === "official") return EXPERTS_MARKETPLACE$1;
	if (marketplace === "custom") return require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
	return marketplace;
}
/**
* 从 expert-v2 JSON identity 提取 pluginRegisteredName，作为精确插件目录匹配 hint。
* v2 格式：`expert-v2:{"v":2,"kind":"expert","expertId":"...","pluginRegisteredName":"data-ai-experts",...}`
*/
function parseExpertV2PluginHint(runtimeIdentity) {
	if (!runtimeIdentity || !runtimeIdentity.startsWith("expert-v2:")) return;
	try {
		const payload = JSON.parse(runtimeIdentity.slice(10));
		if (payload?.v !== 2 || payload?.kind !== "expert") return;
		const pluginName = typeof payload.pluginRegisteredName === "string" ? payload.pluginRegisteredName.trim() : void 0;
		return pluginName ? { pluginRegisteredName: pluginName } : void 0;
	} catch {
		return;
	}
}
/**
* 政策①：仅 `expert:${id}:${marketplace}[:v]` 且 id+marketplace 非空，
* 第二段必须是已知市场别名。不把 expert-v2 / 裸 id / 缺市场段当结构化身份。
*/
function parseStructuredRuntimeIdentity(runtimeIdentity) {
	if (!runtimeIdentity || runtimeIdentity.startsWith("expert-v2:")) return;
	if (!runtimeIdentity.startsWith("expert:")) return;
	const body = runtimeIdentity.slice(7);
	const firstColon = body.indexOf(":");
	if (firstColon <= 0) return;
	const id = body.slice(0, firstColon);
	const rest = body.slice(firstColon + 1);
	if (!id || !rest) return;
	const versionSep = rest.lastIndexOf(":v");
	const marketplacePart = versionSep > 0 ? rest.slice(0, versionSep) : rest;
	if (!marketplacePart || marketplacePart.includes(":") || !KNOWN_MARKETPLACE_ALIASES.has(marketplacePart)) return;
	if (versionSep > 0) {
		const version = rest.slice(versionSep + 1);
		if (!/^v\d+$/.test(version)) return;
	}
	return {
		id,
		marketplace: marketplacePart
	};
}
function isUnsafeDirName(dirName) {
	return !dirName || dirName === "." || dirName === ".." || /[\\/]/.test(dirName);
}
function optionalManifestString(value) {
	return typeof value === "string" && value.trim() !== "" ? value : void 0;
}
function optionalExpertType(value) {
	return value === "skill" || value === "agent" || value === "plugin" || value === "team" ? value : void 0;
}
function localizedNameMatches(name, query) {
	if (!name) return false;
	if (typeof name === "string") return name === query;
	return name.zh === query || name.en === query;
}
/** 与 ExpertPluginService.toKebabCase 同规则。只用于已落地候选的匹配，不拿来猜 activate 路径。 */
function toExpertDirKebabCase(value) {
	return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
}
function identityMatches(value, query, kebabQuery) {
	return !!value && (value === query || value === kebabQuery);
}
function candidateMatchesQuery(candidate, query) {
	const kebabQuery = toExpertDirKebabCase(query);
	return identityMatches(candidate.dirName, query, kebabQuery) || identityMatches(candidate.id, query, kebabQuery) || identityMatches(candidate.pluginIdentity, query, kebabQuery) || identityMatches(candidate.agentName, query, kebabQuery) || localizedNameMatches(candidate.name, query) || localizedNameMatches(candidate.name, kebabQuery);
}
function candidateDedupeKey(candidate) {
	const pluginIdentity = candidate.pluginIdentity || candidate.dirName;
	return `${candidate.marketplace}::${candidate.dirName}::${pluginIdentity}`;
}
function displayNameOf(candidate, locale, fallback) {
	const name = candidate.name;
	if (!name) return fallback;
	if (typeof name === "string") return name;
	return (locale?.toLowerCase().startsWith("en") ? name.en : name.zh) || name.zh || name.en || fallback;
}
async function readPluginManifestFromDir(dir) {
	for (const metaDir of PLUGIN_METADATA_DIRS) {
		const manifestPath = node_path.join(dir, metaDir, PLUGIN_MANIFEST_FILE);
		try {
			const content = await node_fs_promises.readFile(manifestPath, "utf8");
			const json = JSON.parse(content);
			return {
				name: typeof json.name === "string" ? json.name : void 0,
				id: typeof json.id === "string" ? json.id : void 0,
				agentName: typeof json.agentName === "string" ? json.agentName : void 0,
				expertType: optionalExpertType(json.expertType),
				marketExpertId: optionalManifestString(json.marketExpertId),
				sourceId: optionalManifestString(json.sourceId) ?? optionalManifestString(json.source_id),
				displayName: json.displayName
			};
		} catch (error) {
			if (error.code === "ENOENT") continue;
			return;
		}
	}
}
async function hasMarketplaceBundleEntry(marketplacePath, dirName) {
	const manifestPath = node_path.join(marketplacePath, ".codebuddy-plugin", "marketplace.json");
	try {
		const content = await node_fs_promises.readFile(manifestPath, "utf8");
		const json = JSON.parse(content);
		const source = `./plugins/${dirName}`;
		return Array.isArray(json.plugins) && json.plugins.some((plugin) => plugin.source === source);
	} catch {
		return false;
	}
}
async function inspectLandedBundle(marketplacePath, marketplace, dirName) {
	if (isUnsafeDirName(dirName)) return { status: "none" };
	const dir = node_path.join(marketplacePath, "plugins", dirName);
	try {
		if (!(await node_fs_promises.stat(dir)).isDirectory()) return { status: "none" };
	} catch {
		return { status: "none" };
	}
	const manifest = await readPluginManifestFromDir(dir);
	const pluginName = manifest?.name;
	const agentName = manifest?.agentName;
	if (!pluginName || !agentName) return { status: "incomplete-names" };
	const candidate = {
		marketplace,
		dirName,
		id: manifest.id,
		name: manifest.displayName ?? manifest.name,
		pluginIdentity: pluginName,
		agentName,
		expertType: manifest.expertType,
		marketExpertId: manifest.marketExpertId,
		sourceId: manifest.sourceId
	};
	if (await hasMarketplaceBundleEntry(marketplacePath, dirName)) return {
		status: "complete",
		candidate
	};
	return {
		status: "needs-register",
		candidate
	};
}
async function listLandedOfficialExpertsFromMarketplace(marketplacePath) {
	const pluginsDir = node_path.join(marketplacePath, "plugins");
	let entries;
	try {
		entries = await node_fs_promises.readdir(pluginsDir, { withFileTypes: true });
	} catch {
		return [];
	}
	const candidates = [];
	for (const entry of entries) {
		if (!entry.isDirectory() || isUnsafeDirName(entry.name)) continue;
		const manifest = await readPluginManifestFromDir(node_path.join(pluginsDir, entry.name));
		if (!manifest) continue;
		candidates.push({
			marketplace: EXPERTS_MARKETPLACE$1,
			dirName: entry.name,
			id: manifest.id,
			name: manifest.displayName ?? manifest.name,
			pluginIdentity: manifest.name,
			agentName: manifest.agentName,
			expertType: manifest.expertType,
			marketExpertId: manifest.marketExpertId,
			sourceId: manifest.sourceId
		});
	}
	return candidates;
}
async function readOfficialExpertCandidateByDirName(marketplacePath, dirName) {
	if (isUnsafeDirName(dirName)) return;
	const dir = node_path.join(marketplacePath, "plugins", dirName);
	try {
		if (!(await node_fs_promises.stat(dir)).isDirectory()) return;
	} catch {
		return;
	}
	const manifest = await readPluginManifestFromDir(dir);
	if (!manifest) return;
	return {
		marketplace: EXPERTS_MARKETPLACE$1,
		dirName,
		id: manifest.id,
		name: manifest.displayName ?? manifest.name,
		pluginIdentity: manifest.name,
		agentName: manifest.agentName,
		expertType: manifest.expertType,
		marketExpertId: manifest.marketExpertId,
		sourceId: manifest.sourceId
	};
}
function uniqueSafeDirNames(values) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const value of values) {
		const dirName = value?.trim();
		if (!dirName || isUnsafeDirName(dirName) || seen.has(dirName)) continue;
		seen.add(dirName);
		result.push(dirName);
	}
	return result;
}
function pickOfficialByPluginDirs(pool, dirNames) {
	for (const dirName of dirNames) {
		const matched = pool.filter((candidate) => candidate.dirName === dirName);
		if (matched.length > 0) return dedupeCandidates(matched);
	}
	return [];
}
/**
* Official lookup dirs: plugin-name first, then leftover expert_id / kebab.
* When both folders exist, the first hit is the slug. When disk only has
* leftover `ex_*`, that folder is still used.
*/
function officialLookupDirNames(catalogPluginName, landedHint, queryId) {
	return uniqueSafeDirNames([
		catalogPluginName,
		landedHint,
		queryId,
		toExpertDirKebabCase(queryId)
	]);
}
function customDirNameOf(expert) {
	if (typeof expert.expertRootDir === "string" && expert.expertRootDir.trim()) {
		const base = node_path.basename(expert.expertRootDir);
		return isUnsafeDirName(base) ? void 0 : base;
	}
}
/** 已落地自定义包的 displayName：string 或 {zh,en}；trim 空串忽略。 */
function customExpertDisplayName(expert) {
	const displayName = expert.displayName;
	if (typeof displayName === "string") {
		const trimmed = displayName.trim();
		return trimmed !== "" ? trimmed : void 0;
	}
	if (!displayName || typeof displayName !== "object" || Array.isArray(displayName)) return;
	const raw = displayName;
	const zh = typeof raw.zh === "string" && raw.zh.trim() !== "" ? raw.zh.trim() : void 0;
	const en = typeof raw.en === "string" && raw.en.trim() !== "" ? raw.en.trim() : void 0;
	if (!zh && !en) return;
	return {
		...zh ? { zh } : {},
		...en ? { en } : {}
	};
}
async function enumerateCustomCandidates(pluginService, queryId) {
	const scanned = await pluginService.scanCustomExperts();
	const byKey = /* @__PURE__ */ new Map();
	for (const expert of scanned) {
		const dirName = customDirNameOf(expert);
		if (!dirName) continue;
		const candidate = {
			marketplace: require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME,
			dirName,
			id: expert.id,
			name: customExpertDisplayName(expert) ?? expert.name,
			pluginIdentity: typeof expert.agentName === "string" ? expert.agentName : void 0
		};
		byKey.set(candidateDedupeKey(candidate), candidate);
	}
	const direct = await pluginService.getCustomExpert(queryId);
	if (direct) {
		const dirName = customDirNameOf(direct) ?? (isUnsafeDirName(queryId) ? void 0 : queryId);
		if (dirName) {
			const candidate = {
				marketplace: require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME,
				dirName,
				id: direct.id,
				name: direct.name,
				pluginIdentity: typeof direct.agentName === "string" ? direct.agentName : void 0
			};
			byKey.set(candidateDedupeKey(candidate), candidate);
		}
	}
	return [...byKey.values()];
}
function dedupeCandidates(candidates) {
	const byKey = /* @__PURE__ */ new Map();
	for (const candidate of candidates) byKey.set(candidateDedupeKey(candidate), candidate);
	return [...byKey.values()];
}
function formatCandidateBrief(candidate) {
	return `${candidate.marketplace}/${candidate.dirName} id=${candidate.id ?? "-"} plugin=${candidate.pluginIdentity ?? "-"} agent=${candidate.agentName ?? "-"}`;
}
/**
* 多候选不再 fail-closed。顺序：官方 marketplace → 非 leftover dirName → leftover `ex_*`。
*/
function pickOneAmbiguousCandidate(candidates, queryId, where, logger) {
	const official = candidates.filter((candidate) => candidate.marketplace === EXPERTS_MARKETPLACE$1);
	const byDirName = official.filter((candidate) => !candidate.dirName.startsWith("ex_"));
	const leftover = official.filter((candidate) => candidate.dirName.startsWith("ex_"));
	const chosen = byDirName[0] ?? leftover[0] ?? candidates[0];
	if (!chosen) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
	const message = `[expert-runtime-preparer] ${EXPERT_ID_AMBIGUOUS}: ${candidates.length} candidates for ${queryId} (${where}); using ${chosen.marketplace}/${chosen.dirName}. candidates=[${candidates.map(formatCandidateBrief).join("; ")}]`;
	logger?.warn(message);
	return chosen;
}
async function assemblePreparedFacts(pluginService, expertId, candidate, options, resolved) {
	const { readPromptFile, locale, fingerprint, runtimeIdentity, logger } = options;
	let promptText;
	let promptTruncated = false;
	let promptFilePath;
	try {
		const source = await pluginService.resolveExpertAgentPromptSource(expertId, candidate.marketplace, candidate.dirName);
		promptFilePath = source?.filePath;
		if (source?.filePath) {
			const rawPrompt = await readPromptFile(source.filePath);
			const fullPrompt = require_tar.materializeExpertPromptLoadTimeVariables(rawPrompt, source.filePath);
			if (fullPrompt.trim()) {
				promptTruncated = fullPrompt.length > require_tar.MAX_EXPERT_PROMPT_CHARS;
				promptText = fullPrompt.slice(0, require_tar.MAX_EXPERT_PROMPT_CHARS);
			}
		}
	} catch (error) {
		if (error?.code !== "ENOENT") {
			const detail = error instanceof Error ? error.message : String(error);
			logger?.warn(`[expert-runtime-preparer] prompt read failed expertId=${expertId} filePath=${promptFilePath ?? "unknown"} error=${detail}`);
		}
		promptText = void 0;
	}
	return {
		fingerprint,
		canonical: {
			id: expertId,
			marketplace: candidate.marketplace,
			...runtimeIdentity ? { runtimeIdentity } : {}
		},
		pluginName: resolved.pluginName,
		agentName: resolved.agentName,
		expertType: resolved.expertType,
		displayName: displayNameOf(candidate, locale, resolved.agentName),
		...promptText ? {
			promptText,
			...promptFilePath ? { promptFilePath } : {},
			promptTruncated
		} : {}
	};
}
async function materializeAndValidate(pluginService, expertId, candidate, options) {
	const inspection = await inspectLandedBundle(pluginService.getExpertMarketplacePath(candidate.marketplace), candidate.marketplace, candidate.dirName);
	if (inspection.status === "incomplete-names") throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: exact validate failed for ${expertId}@${candidate.marketplace}`);
	if (inspection.status === "complete") return assemblePreparedFacts(pluginService, expertId, inspection.candidate, options, {
		pluginName: inspection.candidate.pluginIdentity,
		agentName: inspection.candidate.agentName,
		expertType: inspection.candidate.expertType || "skill"
	});
	const activation = await pluginService.activateExpert(expertId, candidate.dirName, void 0, candidate.marketplace);
	if (!activation.success) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: failed to materialize ${expertId}@${candidate.marketplace}`);
	const manifest = await pluginService.getExpertManifestFromMarketplace(candidate.dirName, candidate.marketplace);
	const agentName = activation.agentName ?? await pluginService.getExpertAgentNameFromMarketplace(candidate.dirName, candidate.marketplace);
	const pluginName = activation.pluginRegisteredName ?? manifest?.name;
	if (!manifest?.name || !pluginName || !agentName) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: exact validate failed for ${expertId}@${candidate.marketplace}`);
	return assemblePreparedFacts(pluginService, expertId, candidate, options, {
		pluginName,
		agentName,
		expertType: activation.expertType || manifest.expertType || "skill"
	});
}
function createConversationExpertRuntimePreparer(deps) {
	const { pluginService } = deps;
	const readPromptFile = deps.readPromptFile ?? ((filePath) => node_fs_promises.readFile(filePath, "utf8"));
	const listOfficial = deps.listLandedOfficialExperts ?? (async () => listLandedOfficialExpertsFromMarketplace(pluginService.getExpertMarketplacePath("experts")));
	const marketplacePath = pluginService.getExpertMarketplacePath(EXPERTS_MARKETPLACE$1);
	const downloadOfficialByPluginName = async (queryId, pluginName) => {
		if (isUnsafeDirName(pluginName)) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
		const downloadUrl = deps.lookupOfficialDownloadUrl ? await deps.lookupOfficialDownloadUrl(queryId).catch(() => void 0) : void 0;
		if (!(await pluginService.activateExpert(queryId, pluginName, void 0, void 0, downloadUrl)).success) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: download failed for ${queryId}`);
		const afterDownload = await readOfficialExpertCandidateByDirName(marketplacePath, pluginName) ?? pickOfficialByPluginDirs(await listOfficial(), [pluginName])[0];
		if (!afterDownload) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
		return afterDownload;
	};
	return async ({ fingerprint, locale }) => {
		const expertId = fingerprint.expertId?.trim();
		if (!expertId) throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: missing expert id`);
		const structured = parseStructuredRuntimeIdentity(fingerprint.expertRuntimeIdentity);
		const v2Hint = parseExpertV2PluginHint(fingerprint.expertRuntimeIdentity);
		const pluginHint = require_conversations.readPluginRegisteredNameFromRuntimeIdentity(fingerprint.expertRuntimeIdentity) ?? v2Hint?.pluginRegisteredName;
		const persistedSource = require_conversations.readExpertSourceFromRuntimeIdentity(fingerprint.expertRuntimeIdentity);
		const columnMarketplace = fingerprint.expertMarketplace?.trim() || void 0;
		let queryId = expertId;
		let scopedMarketplace;
		if (structured) {
			queryId = structured.id;
			scopedMarketplace = normalizeMarketplaceAlias(structured.marketplace);
		} else if (columnMarketplace) scopedMarketplace = normalizeMarketplaceAlias(columnMarketplace);
		else if (v2Hint) scopedMarketplace = EXPERTS_MARKETPLACE$1;
		const opQueryId = require_conversations.readMarketExpertIdFromRuntimeIdentity(fingerprint.expertRuntimeIdentity) ?? queryId;
		const materialize = (candidate) => materializeAndValidate(pluginService, queryId, candidate, {
			readPromptFile,
			locale,
			fingerprint,
			runtimeIdentity: fingerprint.expertRuntimeIdentity,
			logger: deps.logger
		});
		/**
		* 名字撞车时的定夺：先信 OP 的权威 plugin_name，OP 不可用（离线 / miss）再退到
		* expert-bundle-map.json 记的本机落地目录。后者记的是「上次实际启了哪个包」，
		* 曾经启错就会固化，所以只当兜底，不能排在 OP 前面。
		*/
		const disambiguate = async (matched) => {
			const pluginNames = [(await deps.lookupOfficialPluginName?.(opQueryId))?.trim(), (await pluginService.lookupLandedBundleHint?.(queryId))?.trim()];
			for (const pluginName of pluginNames) {
				if (!pluginName || isUnsafeDirName(pluginName)) continue;
				const picked = pickOfficialByPluginDirs(matched, [pluginName]);
				if (picked.length === 1) return picked[0];
			}
		};
		const resolveOfficialByOp = async (alreadyListedOfficial) => {
			const pluginName = (await deps.lookupOfficialPluginName?.(opQueryId))?.trim() || void 0;
			const safePluginName = pluginName && !isUnsafeDirName(pluginName) ? pluginName : void 0;
			const landedHint = (await pluginService.lookupLandedBundleHint?.(queryId))?.trim();
			const officialPool = alreadyListedOfficial ?? await listOfficial();
			const leftoverQueryId = queryId.startsWith("ex_") ? queryId : "";
			const pointDirNames = officialLookupDirNames(safePluginName ?? pluginHint, landedHint, leftoverQueryId);
			for (const dirName of pointDirNames) {
				const pointHit = await readOfficialExpertCandidateByDirName(marketplacePath, dirName);
				if (pointHit) return pointHit;
			}
			const byPluginDir = pickOfficialByPluginDirs(officialPool, pointDirNames);
			if (byPluginDir.length === 1) return byPluginDir[0];
			if (byPluginDir.length > 1) return pickOneAmbiguousCandidate(byPluginDir, queryId, "resolveOfficialByOp", deps.logger);
			if (safePluginName) return downloadOfficialByPluginName(queryId, safePluginName);
			const queryMatched = dedupeCandidates(officialPool.filter((candidate) => candidateMatchesQuery(candidate, queryId)));
			if (queryMatched.length === 1) return queryMatched[0];
			if (queryMatched.length > 1) {
				const decided = await disambiguate(queryMatched);
				if (decided) return decided;
				return pickOneAmbiguousCandidate(queryMatched, queryId, "official scope", deps.logger);
			}
		};
		const resolveByPluginHint = async () => {
			const landedHint = (await pluginService.lookupLandedBundleHint?.(queryId))?.trim();
			const dirNames = officialLookupDirNames(pluginHint, landedHint, "");
			for (const dirName of dirNames) {
				const pointHit = await readOfficialExpertCandidateByDirName(marketplacePath, dirName);
				if (pointHit) return pointHit;
			}
			const byPluginDir = pickOfficialByPluginDirs(await listOfficial(), dirNames);
			if (byPluginDir.length === 1) return byPluginDir[0];
			if (byPluginDir.length > 1) return pickOneAmbiguousCandidate(byPluginDir, queryId, "enterprise plugin hint", deps.logger);
			if (pluginHint && !isUnsafeDirName(pluginHint)) return {
				marketplace: EXPERTS_MARKETPLACE$1,
				dirName: pluginHint
			};
		};
		if (scopedMarketplace === "experts") {
			if (persistedSource === "enterprise") {
				const enterprise = await resolveByPluginHint();
				if (enterprise) return materialize(enterprise);
				throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
			}
			const official = await resolveOfficialByOp(await listOfficial());
			if (official) return materialize(official);
			if (pluginHint) {
				const fallback = await resolveByPluginHint();
				if (fallback) return materialize(fallback);
			}
			throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
		}
		let pool = [];
		let listedOfficial;
		if (scopedMarketplace === "my-experts") pool = await enumerateCustomCandidates(pluginService, queryId);
		else if (scopedMarketplace) pool = [];
		else {
			const [official, custom] = await Promise.all([listOfficial(), enumerateCustomCandidates(pluginService, queryId)]);
			listedOfficial = official;
			pool = [...official, ...custom];
		}
		const pluginName = !scopedMarketplace ? (await deps.lookupOfficialPluginName?.(opQueryId))?.trim() || void 0 : void 0;
		const preferredOfficial = pluginName ? pool.filter((candidate) => candidate.marketplace === "experts" && candidate.dirName === pluginName) : [];
		const matched = dedupeCandidates(preferredOfficial.length > 0 ? preferredOfficial : pool.filter((candidate) => candidateMatchesQuery(candidate, queryId)));
		if (matched.length === 1) return materialize(matched[0]);
		if (matched.length > 1) {
			const decided = scopedMarketplace ? void 0 : await disambiguate(matched);
			if (decided) return materialize(decided);
			return materialize(pickOneAmbiguousCandidate(matched, queryId, "no-scope fallback", deps.logger));
		}
		if (!scopedMarketplace) {
			const official = await resolveOfficialByOp(listedOfficial);
			if (official) return materialize(official);
		}
		throw new ExpertRuntimePrepareError(EXPERT_UNAVAILABLE, `${EXPERT_UNAVAILABLE}: no landed candidate for ${queryId}`);
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/app-server-addons/conversation-runtime-config-provider.ts
function isExpertUnavailableError(error) {
	if (error instanceof ExpertRuntimePrepareError) return error.prepareErrorCode === EXPERT_UNAVAILABLE;
	return error instanceof Error && error.message.includes("EXPERT_UNAVAILABLE");
}
function stripExpertFromWorkerConfig(config) {
	const desired = { ...config.desired ?? {} };
	delete desired.expertId;
	delete desired.expertMarketplace;
	delete desired.runtimeIdentity;
	return {
		...config,
		desired,
		runtime: { value: config.runtime?.value ?? {} }
	};
}
var EXPERTS_MARKETPLACE = "experts";
/** 历史 Home reserve 可能写入的脏 key；落 CLI 前剥掉。 */
var RESERVE_FINGERPRINT_SETTINGS_KEY = "__wbReserveFingerprint";
/** Claw IM 禁用计划进出工具；Desktop 本地助理切 plan 时必须保留，否则模型无法退出计划。 */
var CLAW_PLAN_MODE_TOOLS = /* @__PURE__ */ new Set(["EnterPlanMode", "ExitPlanMode"]);
var ARDOT_DESIGN_PROMPT_MARKER = "ardot-design-core";
var ARDOT_DESIGN_PROMPT_REQUIREMENT = [
	"<ardot-design-skill-requirement>",
	"For design tasks, follow the Ardot design Skills injected into this conversation ",
	"(`ardot-design-core` plus the matching domain skill) and execute their workflow strictly.",
	"</ardot-design-skill-requirement>"
].join("\n");
function ensureArdotDesignPromptContract(systemPrompt, welcomeMode) {
	if (welcomeMode !== "design" || systemPrompt === void 0) return systemPrompt;
	if (systemPrompt.includes(ARDOT_DESIGN_PROMPT_MARKER)) return systemPrompt;
	return `${systemPrompt.trimEnd()}\n\n${ARDOT_DESIGN_PROMPT_REQUIREMENT}`;
}
var EXPERT_RUNTIME_REGISTRY_LIMIT = 256;
var EXPERT_RUNTIME_REGISTRY_TTL_MS = 18e5;
/**
* 从持久化行 + `ctx.selection` 重建 `SessionDesiredConfig`。
* mode / welcomeMode / permissionMode 以 selection 事实优先、回退持久化列，并各经归一化。
*/
function buildDesiredConfig(stored, ctx) {
	const mode = require_tar.normalizeSceneMode(stored.mode ?? ctx.selection?.interactionMode);
	const welcomeMode = require_tar.normalizeWelcomeMode(ctx.selection?.welcomeMode ?? stored.sourceMode);
	const explicitPermissionMode = require_tar.normalizePermissionMode(ctx.selection?.permissionMode ?? stored.permissionMode);
	const effectiveExplicitPermissionMode = require_tar.isPermissionModeWeakerThanSceneDefault(mode, explicitPermissionMode) ? void 0 : explicitPermissionMode;
	const permissionMode = mode === "plan" ? require_tar.resolveDefaultPermissionMode(mode) : effectiveExplicitPermissionMode ?? require_tar.resolveDefaultPermissionMode(mode);
	const permissionModeBeforePlan = mode === "plan" && (explicitPermissionMode === "acceptEdits" || explicitPermissionMode === "bypassPermissions" || explicitPermissionMode === "default" || explicitPermissionMode === "fullAccess") ? explicitPermissionMode : void 0;
	const expertMarketplace = normalizeExpertMarketplace(stored.expertMarketplace);
	const clawRuntime = require_server.readClawConversationRuntimeSettings(stored.sessionSettings);
	const cliSessionSettings = copyCliSessionSettings(stored.sessionSettings, mode);
	if (typeof stored.useSandboxCLI === "boolean") cliSessionSettings.sandbox = {
		...asRecord(cliSessionSettings.sandbox),
		enabled: stored.useSandboxCLI
	};
	const disabledTools = new Set(clawRuntime?.disabledTools ?? []);
	const tools = disabledTools.size > 0 ? require_tar.resolveModeTools(mode).split(",").map((tool) => tool.trim()).filter((tool) => tool && !disabledTools.has(tool)).join(",") : void 0;
	const industryMode = require_tar.toSessionIndustryModeConfig(stored.buddySessionBinding?.runtime.industryMode);
	const addonSelection = toSessionAddonSelection(ctx.selection, mode);
	return {
		...mode ? { mode } : {},
		...stored.expertId ? { expertId: stored.expertId } : {},
		...expertMarketplace ? { expertMarketplace } : {},
		...stored.expertLocale ? { locale: stored.expertLocale } : {},
		...stored.expertRuntimeIdentity ? { runtimeIdentity: stored.expertRuntimeIdentity } : {},
		...stored.model ? { model: stored.model } : {},
		...clawRuntime?.systemPrompt ? { systemPrompt: clawRuntime.systemPrompt } : {},
		...tools !== void 0 ? { tools } : {},
		...permissionMode ? { permissionMode } : {},
		...permissionModeBeforePlan ? { permissionModeBeforePlan } : {},
		...welcomeMode ? { welcomeMode } : {},
		...industryMode ? { industryMode } : {},
		...addonSelection ? { addonSelection } : {},
		...Object.keys(cliSessionSettings).length > 0 ? { sessionSettings: cliSessionSettings } : {}
	};
}
/**
* 浅拷贝 sessionSettings 供 --settings 转发。plan 模式下再深拷贝 claw.runtime /
* disabledTools，从副本去掉 EnterPlanMode/ExitPlanMode，不 mutate 持久化嵌套对象。
*/
function copyCliSessionSettings(sessionSettings, mode) {
	const cliSessionSettings = { ...sessionSettings ?? {} };
	delete cliSessionSettings.automation;
	delete cliSessionSettings[RESERVE_FINGERPRINT_SETTINGS_KEY];
	if (mode !== "plan") return cliSessionSettings;
	const clawRuntimeRaw = cliSessionSettings[require_server.CLAW_CONVERSATION_RUNTIME_SETTINGS_KEY];
	if (!clawRuntimeRaw || typeof clawRuntimeRaw !== "object" || Array.isArray(clawRuntimeRaw)) return cliSessionSettings;
	const clawRuntime = clawRuntimeRaw;
	if (!Array.isArray(clawRuntime.disabledTools)) return cliSessionSettings;
	cliSessionSettings[require_server.CLAW_CONVERSATION_RUNTIME_SETTINGS_KEY] = {
		...clawRuntime,
		disabledTools: clawRuntime.disabledTools.filter((tool) => !(typeof tool === "string" && CLAW_PLAN_MODE_TOOLS.has(tool)))
	};
	return cliSessionSettings;
}
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function nonEmptyStrings(values) {
	return (values ?? []).filter((value) => typeof value === "string" && value.trim().length > 0);
}
function toSessionAddonSelection(selection, fallbackInteractionMode) {
	if (!selection) return;
	const interactionMode = selection.interactionMode?.trim() || fallbackInteractionMode?.trim();
	if (!interactionMode) return;
	const connectorIds = nonEmptyStrings(selection.connectorIds);
	return {
		version: 1,
		...selection.welcomeMode ? { welcomeMode: require_tar.normalizeWelcomeMode(selection.welcomeMode) } : {},
		interactionMode,
		microSceneIds: nonEmptyStrings(selection.microSceneIds),
		enabledPluginIds: nonEmptyStrings(selection.enabledPluginIds),
		promptContentBlockCount: 0,
		resourceLinkCount: 0,
		...connectorIds.length > 0 ? { connectorIds } : {},
		projectResources: {
			connectorSkillIds: nonEmptyStrings(selection.projectResources?.connectorSkillIds),
			mcpServerNames: nonEmptyStrings(selection.projectResources?.mcpServerNames),
			projectSkillNames: nonEmptyStrings(selection.projectResources?.projectSkillNames)
		}
	};
}
function stripReserveFingerprint(sessionSettings) {
	if (!sessionSettings) return;
	const rest = { ...sessionSettings };
	delete rest[RESERVE_FINGERPRINT_SETTINGS_KEY];
	return Object.keys(rest).length > 0 ? rest : void 0;
}
/**
* 无 sqlite 行时按 selection 合成 StoredSession（不含 expert：selection 没有 expert 字段）。
* 无 stored 且无 selection：仍 undefined。
*/
function synthesizeStoredFromContext(ctx) {
	const selection = ctx.selection;
	if (!selection) return;
	return {
		id: ctx.conversationId,
		cwd: ctx.cwd,
		userId: "",
		status: "active",
		createdAt: 0,
		updatedAt: 0,
		mode: selection.interactionMode,
		sourceMode: selection.welcomeMode,
		permissionMode: selection.permissionMode,
		sessionSettings: stripReserveFingerprint(ctx.sessionSettings)
	};
}
function resolveStoredSession(resolveSessionRow, ctx) {
	return resolveSessionRow(ctx.conversationId) ?? synthesizeStoredFromContext(ctx);
}
async function resolveProtectedFlags(resolveProtectedAssetFlags, expertId) {
	if (!resolveProtectedAssetFlags) return {};
	try {
		return await resolveProtectedAssetFlags({ expertId });
	} catch {
		return {};
	}
}
function applyProtectedModerationToSettings(baseSettings, flags) {
	if (!require_server.shouldProtectSession(flags)) return baseSettings;
	const settings = baseSettings ?? {};
	const env = asRecord(settings.env);
	const existingHeaders = typeof env.CODEBUDDY_CUSTOM_HEADERS === "string" ? env.CODEBUDDY_CUSTOM_HEADERS.trim() : "";
	return {
		...settings,
		env: {
			...env,
			CODEBUDDY_CUSTOM_HEADERS: require_server.appendProtectedModerationHeaderLine(existingHeaders, true)
		}
	};
}
function normalizeExpertMarketplace(marketplace) {
	if (marketplace === "builtin") return EXPERTS_MARKETPLACE;
	if (marketplace === "custom") return require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
	return marketplace || void 0;
}
/** 只认找不到专家；两个包撞名不走这条。 */
function isExpertUnavailablePrepareError(error) {
	if (!error || typeof error !== "object") return false;
	const record = error;
	if (record.prepareErrorCode === "EXPERT_UNAVAILABLE") return true;
	return typeof record.message === "string" && record.message.startsWith("EXPERT_UNAVAILABLE");
}
function rawFingerprintOf(stored) {
	return {
		...stored.expertId ? { expertId: stored.expertId } : {},
		...stored.expertMarketplace ? { expertMarketplace: stored.expertMarketplace } : {},
		...stored.expertRuntimeIdentity ? { expertRuntimeIdentity: stored.expertRuntimeIdentity } : {}
	};
}
function applyPreparedExpertSettings(baseSettings, facts, expertRuntime) {
	const settings = baseSettings ?? {};
	const enabledPlugins = asRecord(settings.enabledPlugins);
	const extraKnownMarketplaces = asRecord(settings.extraKnownMarketplaces);
	const env = asRecord(settings.env);
	const existingHeaders = typeof env.CODEBUDDY_CUSTOM_HEADERS === "string" ? env.CODEBUDDY_CUSTOM_HEADERS.trim() : "";
	const expertHeaders = [`X-Expert-Id: ${facts.canonical.id}`, ...facts.expertType === "team" ? ["X-Expert-Team-Task: true"] : []];
	const marketplace = facts.canonical.marketplace;
	return {
		...settings,
		enabledPlugins: require_server.withSummonedExpertPlugin(enabledPlugins, `${facts.pluginName}@${marketplace}`),
		extraKnownMarketplaces: {
			...extraKnownMarketplaces,
			[marketplace]: { source: {
				source: "directory",
				url: expertRuntime.pluginService.getExpertMarketplacePath(marketplace)
			} }
		},
		env: {
			...env,
			CODEBUDDY_CUSTOM_HEADERS: [existingHeaders, ...expertHeaders].filter(Boolean).join("\n")
		}
	};
}
function createConversationRuntimeConfigProvider(deps) {
	const { resolveSessionRow, resolver, logger } = deps;
	const registry = /* @__PURE__ */ new Map();
	const inflight = /* @__PURE__ */ new Map();
	let generationClock = 0;
	const prepareExpertRuntime = deps.expertRuntime ? deps.expertRuntime.prepareExpertRuntime ?? createConversationExpertRuntimePreparer({
		pluginService: deps.expertRuntime.pluginService,
		logger: deps.logger
	}) : void 0;
	const touchRecord = (conversationId) => {
		const existing = registry.get(conversationId);
		if (existing) {
			existing.updatedAt = Date.now();
			return existing;
		}
		const created = {
			fingerprint: {},
			generation: 0,
			revision: 0,
			updatedAt: Date.now()
		};
		registry.set(conversationId, created);
		evictRegistry();
		return created;
	};
	const evictRegistry = () => {
		const now = Date.now();
		for (const [id, record] of registry) if (now - record.updatedAt > EXPERT_RUNTIME_REGISTRY_TTL_MS) registry.delete(id);
		while (registry.size > EXPERT_RUNTIME_REGISTRY_LIMIT) {
			const oldest = registry.keys().next().value;
			if (oldest === void 0) break;
			registry.delete(oldest);
		}
	};
	const forget = (conversationId) => {
		registry.delete(conversationId);
		for (const key of inflight.keys()) if (key.startsWith(`${conversationId}::`)) inflight.delete(key);
	};
	const getPreparedExpertRuntimeFacts = (conversationId) => {
		evictRegistry();
		const record = registry.get(conversationId);
		const published = record?.published;
		if (!published) return;
		const stored = resolveSessionRow(conversationId);
		const fingerprint = stored ? rawFingerprintOf(stored) : {};
		if (!fingerprintsEqual(published.fingerprint, fingerprint)) return;
		record.updatedAt = Date.now();
		return published;
	};
	const publishTombstone = (conversationId, fingerprint, generation, revision) => {
		const record = touchRecord(conversationId);
		if (generation < record.generation) return;
		record.fingerprint = fingerprint;
		record.generation = generation;
		record.revision = revision;
		record.pending = void 0;
		record.published = {
			status: "tombstone",
			fingerprint
		};
	};
	const publishExpertClearedTombstone = (conversationId) => {
		const stored = resolveSessionRow(conversationId);
		const fingerprint = stored ? rawFingerprintOf(stored) : {};
		publishTombstone(conversationId, fingerprint, ++generationClock, deps.expertRuntime?.getRuntimeRevision?.() ?? 0);
	};
	const stagePrepared = (conversationId, facts, generation, revision) => {
		const record = touchRecord(conversationId);
		if (generation < record.generation) return false;
		record.fingerprint = facts.fingerprint;
		record.generation = generation;
		record.revision = revision;
		record.pending = facts;
		return true;
	};
	const prepareForLaunch = async (stored) => {
		const runtime = deps.expertRuntime;
		if (!runtime || !prepareExpertRuntime) return "tombstone";
		const fingerprint = rawFingerprintOf(stored);
		if (!stored.expertId) {
			runtime.agentTeamsEnvResolver.recordSessionExpertType(stored.id, void 0);
			const generation = ++generationClock;
			const revision = runtime.getRuntimeRevision?.() ?? 0;
			publishTombstone(stored.id, fingerprint, generation, revision);
			return "tombstone";
		}
		const reused = registry.get(stored.id);
		if (reused?.pending && fingerprintsEqual(reused.pending.fingerprint, fingerprint)) return reused.pending;
		if (reused?.published?.status === "launchReady" && fingerprintsEqual(reused.published.fingerprint, fingerprint)) return reused.published.facts;
		const revision = runtime.getRuntimeRevision?.() ?? 0;
		const inflightKey = `${stored.id}::${rawExpertFingerprintKey(fingerprint)}::${revision}`;
		const existing = inflight.get(inflightKey);
		if (existing) return existing;
		const generation = ++generationClock;
		const record = touchRecord(stored.id);
		record.generation = generation;
		const pending = prepareExpertRuntime({
			fingerprint,
			locale: stored.expertLocale
		}).then((facts) => {
			if (stagePrepared(stored.id, facts, generation, revision)) runtime.agentTeamsEnvResolver.recordSessionExpertType(stored.id, facts.expertType);
			return facts;
		}).catch(async (error) => {
			if (!isExpertUnavailablePrepareError(error)) throw error;
			runtime.agentTeamsEnvResolver.recordSessionExpertType(stored.id, void 0);
			publishTombstone(stored.id, fingerprint, generation, revision);
			return "tombstone";
		});
		inflight.set(inflightKey, pending);
		try {
			return await pending;
		} finally {
			if (inflight.get(inflightKey) === pending) inflight.delete(inflightKey);
		}
	};
	const peekPreparedForLaunch = (stored) => {
		if (!stored.expertId) return "tombstone";
		const fingerprint = rawFingerprintOf(stored);
		const reused = registry.get(stored.id);
		if (reused?.pending && fingerprintsEqual(reused.pending.fingerprint, fingerprint)) return reused.pending;
		if (reused?.published?.status === "launchReady" && fingerprintsEqual(reused.published.fingerprint, fingerprint)) return reused.published.facts;
		if (reused?.published?.status === "tombstone" && fingerprintsEqual(reused.published.fingerprint, fingerprint)) return "tombstone";
	};
	const provider = {
		resolvePromptDesiredConfig(ctx) {
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			return stored ? buildDesiredConfig(stored, ctx) : void 0;
		},
		async resolveDesiredConfig(ctx) {
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			if (!stored) return;
			const desiredConfig = buildDesiredConfig(stored, ctx);
			return {
				...desiredConfig.mode ? { mode: desiredConfig.mode } : {},
				...desiredConfig.expertId ? { expertId: desiredConfig.expertId } : {},
				...desiredConfig.expertMarketplace ? { expertMarketplace: desiredConfig.expertMarketplace } : {},
				...desiredConfig.locale ? { locale: desiredConfig.locale } : {},
				...desiredConfig.runtimeIdentity ? { runtimeIdentity: desiredConfig.runtimeIdentity } : {},
				...desiredConfig.welcomeMode ? { welcomeMode: desiredConfig.welcomeMode } : {},
				...desiredConfig.permissionMode ? { permissionMode: desiredConfig.permissionMode } : {},
				...desiredConfig.permissionModeBeforePlan ? { permissionModeBeforePlan: desiredConfig.permissionModeBeforePlan } : {}
			};
		},
		async resolveRuntimeConfig(ctx, options) {
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			if (!stored) return;
			const desiredConfig = buildDesiredConfig(stored, ctx);
			const resolved = await resolver.resolveConfig({
				sessionId: ctx.conversationId,
				cwd: ctx.cwd,
				desiredConfig,
				buddyAppSnapshot: stored.buddyAppSnapshot
			});
			const localModelReadyPromise = deps.ensureLocalModelReady && resolved.model?.startsWith("custom-local:") ? deps.ensureLocalModelReady(resolved.model).catch((error) => {
				logger?.warn(`[conversation-runtime-config] ensureLocalModelReady failed model=${resolved.model} error=${error instanceof Error ? error.message : String(error)}`);
			}) : void 0;
			let resolvedSessionSettings = resolved.sessionSettings;
			if (deps.expertRuntime) {
				const prepared = options?.materializeExpert === false ? peekPreparedForLaunch(stored) : await prepareForLaunch(stored);
				if (prepared && prepared !== "tombstone") resolvedSessionSettings = applyPreparedExpertSettings(resolved.sessionSettings, prepared, deps.expertRuntime);
			}
			resolvedSessionSettings = applyProtectedModerationToSettings(resolvedSessionSettings, await resolveProtectedFlags(deps.resolveProtectedAssetFlags, stored.expertId));
			const systemPrompt = ensureArdotDesignPromptContract(resolved.systemPrompt, desiredConfig.welcomeMode);
			const language = deps.resolveLanguage?.();
			const sessionSettings = language && (!resolvedSessionSettings || resolvedSessionSettings.language === void 0) ? {
				...resolvedSessionSettings ?? {},
				language
			} : resolvedSessionSettings;
			let promptVarsFile;
			try {
				promptVarsFile = require_code_cache.writeAgentCliPromptVarsFile(ctx.conversationId, resolved.promptVariables) ?? void 0;
			} catch (error) {
				logger?.warn(`[conversation-runtime-config] prompt-vars write failed sessionId=${ctx.conversationId} message=${error instanceof Error ? error.message : String(error)}`);
				promptVarsFile = void 0;
			}
			await localModelReadyPromise;
			return {
				...systemPrompt !== void 0 ? { systemPrompt } : {},
				...resolved.tools !== void 0 ? { tools: resolved.tools } : {},
				...resolved.model !== void 0 ? { model: resolved.model } : {},
				...sessionSettings !== void 0 ? { sessionSettings } : {},
				...resolved.welcomeMode !== void 0 ? { welcomeMode: resolved.welcomeMode } : {},
				...promptVarsFile ? { promptVarsFile } : {}
			};
		},
		async resolveBeforePromptRequests(ctx) {
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			if (!stored?.expertId) return;
			if (deps.expertRuntime && prepareExpertRuntime) try {
				if (await prepareForLaunch(stored) === "tombstone") return;
			} catch (error) {
				const fingerprint = rawFingerprintOf(stored);
				const record = registry.get(stored.id);
				publishTombstone(stored.id, fingerprint, record?.generation ?? ++generationClock, deps.expertRuntime.getRuntimeRevision?.() ?? 0);
				deps.expertRuntime.agentTeamsEnvResolver.recordSessionExpertType(stored.id, void 0);
				const raw = error;
				logger?.warn(`[conversation-runtime-config] beforePrompt prepareForLaunch failed, continue without expert sessionId=${ctx.conversationId} expertId=${stored.expertId} reason=${isExpertUnavailableError(error) ? "unavailable" : "prepare-failed"} errorName=${raw?.name} errorMessage=${raw?.message} prepareErrorCode=${raw?.prepareErrorCode} code=${raw?.code} stackHead=${typeof raw?.stack === "string" ? raw.stack.split("\n").slice(1, 3).join(" | ") : void 0}`);
				return;
			}
			return [{
				method: "_codebuddy.ai/refreshPlugins",
				params: { reason: "conversation-expert-runtime" }
			}];
		},
		async refineConversationConfig(ctx, config) {
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			const summarizeCause = (cause) => {
				if (cause === void 0) return;
				if (cause instanceof Error) {
					const raw = cause;
					return {
						name: raw.name,
						message: raw.message,
						stackHead: typeof raw.stack === "string" ? raw.stack.split("\n").slice(1, 3).join(" | ") : void 0,
						...raw.prepareErrorCode !== void 0 ? { prepareErrorCode: raw.prepareErrorCode } : {},
						...raw.code !== void 0 ? { code: raw.code } : {},
						...raw.status !== void 0 ? { status: raw.status } : {}
					};
				}
				return {
					valueType: typeof cause,
					value: String(cause).slice(0, 200)
				};
			};
			const continueWithoutExpert = (reason, cause) => {
				const causeInfo = summarizeCause(cause);
				logger?.warn(`[conversation-runtime-config] refine continue without expert sessionId=${ctx.conversationId} expertId=${stored?.expertId} reason=${reason} causeMessage=${cause instanceof Error ? cause.message : cause === void 0 ? void 0 : String(cause)} causeInfo=${causeInfo ? JSON.stringify(causeInfo) : void 0}`);
				return stripExpertFromWorkerConfig(config);
			};
			if (!stored?.expertId) return stripExpertFromWorkerConfig(config);
			if (!deps.expertRuntime) return continueWithoutExpert("no-expertRuntime", config.runtime?.error);
			const prepared = peekPreparedForLaunch(stored);
			if (prepared === "tombstone") return stripExpertFromWorkerConfig(config);
			if (!prepared) return continueWithoutExpert("peek-undefined", config.runtime?.error);
			try {
				const value = await provider.resolveRuntimeConfig(ctx, { materializeExpert: false });
				if (value === void 0) return continueWithoutExpert("resolve-undefined", config.runtime?.error);
				return {
					...config,
					runtime: { value }
				};
			} catch (error) {
				return continueWithoutExpert("resolve-throw", error);
			}
		},
		async activateExpertRuntimeForSession(ctx, runtimeHttpBase) {
			const runtime = deps.expertRuntime;
			if (!runtime) return;
			const stored = resolveStoredSession(resolveSessionRow, ctx);
			const expertId = stored?.expertId;
			if (!stored || !expertId) return;
			const fingerprint = rawFingerprintOf(stored);
			const record = registry.get(ctx.conversationId);
			const pendingFacts = record?.pending && fingerprintsEqual(record.pending.fingerprint, fingerprint) ? record.pending : void 0;
			const published = record?.published;
			const facts = pendingFacts ?? (published?.status === "launchReady" && fingerprintsEqual(published.fingerprint, fingerprint) ? published.facts : void 0);
			if (!facts) {
				logger?.info(`[conversation-runtime-config] skip activate because expert runtime facts missing sessionId=${ctx.conversationId} expertId=${expertId}`);
				return;
			}
			const continueWithoutExpert = (cause) => {
				const current = registry.get(ctx.conversationId);
				publishTombstone(ctx.conversationId, fingerprint, current?.generation ?? ++generationClock, runtime.getRuntimeRevision?.() ?? 0);
				runtime.agentTeamsEnvResolver.recordSessionExpertType(ctx.conversationId, void 0);
				logger?.warn(`[conversation-runtime-config] expert runtime bind failed, continue prompt without expert sessionId=${ctx.conversationId} expertId=${expertId} errorMessage=${cause instanceof Error ? cause.message : String(cause)}`);
			};
			let switched;
			try {
				switched = runtimeHttpBase ? await runtime.pluginService.switchExpertPluginForSession(ctx.conversationId, void 0, facts.pluginName, facts.agentName, `${facts.pluginName}@${facts.canonical.marketplace}`, void 0, runtimeHttpBase) : await runtime.pluginService.switchExpertPluginForSession(ctx.conversationId, void 0, facts.pluginName, facts.agentName, `${facts.pluginName}@${facts.canonical.marketplace}`);
			} catch (error) {
				continueWithoutExpert(error);
				return;
			}
			if (!switched) {
				continueWithoutExpert(/* @__PURE__ */ new Error(`expert runtime bind returned false: ${expertId}`));
				return;
			}
			const current = touchRecord(ctx.conversationId);
			if (current.pending === facts) {
				current.published = {
					status: "launchReady",
					fingerprint: facts.fingerprint,
					facts
				};
				current.pending = void 0;
			}
			logger?.info(`[conversation-runtime-config] expert runtime bound sessionId=${ctx.conversationId} agent=${facts.agentName} plugin=${facts.pluginName}@${facts.canonical.marketplace}`);
		},
		getPreparedExpertRuntimeFacts,
		publishExpertClearedTombstone,
		forget,
		resolveAllowedTools() {
			return [...require_server.WORKBUDDY_AGENT_ALLOWED_TOOLS];
		},
		async resolveAgentTeams(sessionId) {
			const runtime = deps.expertRuntime;
			if (!runtime) return;
			if (!resolveSessionRow(sessionId)?.expertId) runtime.agentTeamsEnvResolver.recordSessionExpertType(sessionId, void 0);
			return runtime.agentTeamsEnvResolver.resolveForSession(sessionId);
		}
	};
	return provider;
}
//#endregion
//#region ../../packages/workbuddy-extensions/src/bridge/bridge-host.ts
/**
* Extension Bridge Host —— extension 子进程的宿主侧装配器。
*
* ── 设计（终极形态） ─────────────────────────────────────────
*
* Extension 子进程发出 wb.* 调用后：
*
* ```
* transport 收到 invoke(channel, ctx?, ...args)
*   → authorizer 前置校验（subject={extension 身份}, action.channel）
*   → forward 到 daemon methodChannel.invoke(channel, {subject}, ...args)
*   → daemon 侧走跟宿主一致的分派（contextualHandlers 覆盖优先，flatten 结果 fallback）
* ```
*
* ── 为什么不自己 flatten services ─────────────────────────────
*
* 早期设计让 bridge-host 自己 `flattenService(services)` 挂 handler，但 daemon 侧
* `createMethodChannel(hub, { contextualHandlers })` 有一份**契约不同的视图**：
* - `hub.storage.user` / `hub.storage.device` 是 Proxy，flatten 抓不到方法
* - daemon 靠 contextualHandlers 硬编码补齐 storage 12 个 channel
*
* 如果 bridge-host 自己重建视图，就必须**同步维护**这份 contextualHandlers。装配层
* 每加一个类似 transform（trace 注入、authn context、metric）都要在两处同步 ——
* 少同步一处→ extension 报 no handler for channel 或行为跟宿主不一致。
*
* **终极形态**：bridge-host 只做"边界拦截 + forward"，把"channel 视图"完全委托给
* daemon methodChannel。一致性天然保证，装配层只需要给 bridge-host 一份 methodChannel
* 引用，其余细节不需要感知。
*
* ── 反向 RPC / 事件 ──────────────────────────────────────────
*
* 除了正向 wb.* 之外，bridge-host 还负责：
* - `invokeExtension(method, ...args)`：反向调extension 子进程注册的 methods
*   （extension bootstrap 返回的methods 字典）
* - `pushEvent(event, payload)`：走 transport.broadcast 推送宿主事件到 extension
*/
function createExtensionBridgeHost(options) {
	const { subject, authorizer, methodChannel, transport, daemonRpcInvoke } = options;
	const methods = methodChannel.methods();
	const forwardOne = async (channel, ...args) => {
		await authorizer.assertAuthorized({
			subject,
			action: {
				type: "invoke",
				channel
			}
		});
		return methodChannel.invoke(channel, {
			callerId: subject.moduleId,
			subject
		}, ...args);
	};
	const forwardDaemonRpc = async (channel, ...args) => {
		if (!daemonRpcInvoke) throw new Error(`[ExtensionBridgeHost] wb.invoke('${channel}') requires daemonRpcInvoke (装配层未通过 ExtensionBridgeHostOptions.daemonRpcInvoke 注入 daemon RPC 通用调用)`);
		return daemonRpcInvoke(channel, ...args);
	};
	const CONTROL_PLANE_PREFIX = "wb:internal:extension-";
	const dispatchControlPlaneOrFallback = async (channel, ...args) => {
		if (channel.startsWith(CONTROL_PLANE_PREFIX)) {
			const rawPayload = args[0];
			const signedPayload = {
				...rawPayload && typeof rawPayload === "object" ? rawPayload : {},
				extensionId: subject.moduleId
			};
			return forwardDaemonRpc(channel, signedPayload, ...args.slice(1));
		}
		if (channel.startsWith("wb:")) return forwardOne(channel, ...args);
		return forwardDaemonRpc(channel, ...args);
	};
	if (methods.length === 0) {
		if (!transport.handleAny) throw new Error("[ExtensionBridgeHost] methodChannel.methods() is empty (forward mode) but transport does not implement handleAny —— 请检查装配层是否用了支持 handleAny 的 transport");
		transport.handleAny(async (channel, _untrustedContext, ...args) => dispatchControlPlaneOrFallback(channel, ...args));
	} else {
		for (const channel of methods) transport.handle(channel, async (_untrustedContext, ...args) => forwardOne(channel, ...args));
		if (transport.handleAny) transport.handleAny(async (channel, _untrustedContext, ...args) => dispatchControlPlaneOrFallback(channel, ...args));
	}
	return {
		pushEvent(event, payload) {
			transport.broadcast?.(event, payload);
		},
		invokeExtension(method, ...args) {
			if (!transport.invoke) throw new Error("[ExtensionBridgeHost] transport.invoke not supported");
			return transport.invoke(method, { callerId: require_log_acl_guard.HOST_MODULE_ID }, ...args);
		},
		dispose() {
			transport.dispose?.();
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-extensions/src/bridge/transport-process.ts
/**
* 构建一个满足 core `Transport` 接口的对象。两侧共用此实现，
* 差异仅在 send / onMessage 的物理承载（child.send vs process.send）。
*/
function createRpcSide(opts) {
	const { send, onMessage, label } = opts;
	const requestHandlers = /* @__PURE__ */ new Map();
	/**
	* 通配 handler（catch-all）—— per-channel handler map 里查不到时的兜底。
	*
	* 用于 wb.invoke(channel, ...) 逃生舱：extension 侧要能调**任意 daemon RPC channel**
	* （比如 `claw:getWechatmpEnabled`），不能事先 per-channel 挂 handler（channel 集合
	* 是运行时开放的）。装配层挂一个 catch-all 做前缀路由（wb:* 走 methodChannel；
	* 其他走 daemon RPC）。
	*
	* ⚠️ 签名走 core `RequestHandler`（`(channel, ctx, ...args)`）——per-channel handler
	* 用 `ChannelHandler`（channel 已经在 map key 里，不需要 handler 参数带一遍），
	* catch-all 需要 handler 感知 channel 才能路由，所以走 RequestHandler 全签名。
	*/
	let anyHandler;
	let eventHandler;
	let requestCounter = 0;
	const pending = /* @__PURE__ */ new Map();
	const listener = async (raw) => {
		if (!isWireMessage(raw)) return;
		const msg = raw;
		if (msg.type === "invoke:request" && msg.channel && msg.requestId) {
			const perChannelHandler = requestHandlers.get(msg.channel);
			if (!perChannelHandler && !anyHandler) {
				send({
					type: "invoke:response",
					requestId: msg.requestId,
					error: serializeBridgeError(/* @__PURE__ */ new Error(`[${label}] no handler for channel: ${msg.channel}`))
				});
				return;
			}
			try {
				const [context, ...userArgs] = msg.args ?? [];
				const result = perChannelHandler ? await perChannelHandler(context, ...userArgs) : await anyHandler(msg.channel, context, ...userArgs);
				send({
					type: "invoke:response",
					requestId: msg.requestId,
					result
				});
			} catch (err) {
				send({
					type: "invoke:response",
					requestId: msg.requestId,
					error: serializeBridgeError(err)
				});
			}
			return;
		}
		if (msg.type === "invoke:response" && msg.requestId) {
			const p = pending.get(msg.requestId);
			if (!p) return;
			pending.delete(msg.requestId);
			if (msg.error !== void 0) try {
				if (isSerializedBridgeError(msg.error)) deserializeResult(msg.error);
				else throw new Error(String(msg.error));
			} catch (err) {
				p.reject(err);
			}
			else p.resolve(msg.result);
			return;
		}
		if (msg.type === "event" && msg.event) eventHandler?.(msg.event, msg.payload);
	};
	const detach = onMessage(listener);
	function invoke(channel, context, ...args) {
		return new Promise((resolve, reject) => {
			const requestId = `${label}_req_${++requestCounter}`;
			pending.set(requestId, {
				resolve,
				reject
			});
			try {
				send({
					type: "invoke:request",
					requestId,
					channel,
					args: [context, ...args]
				});
			} catch (err) {
				pending.delete(requestId);
				reject(err instanceof Error ? err : new Error(String(err)));
			}
		});
	}
	return {
		handle(channel, handler) {
			requestHandlers.set(channel, handler);
		},
		/**
		* 挂通配 handler —— 供 bridge-host 做 catch-all 前缀路由（wb.invoke 逃生舱）。
		* per-channel 精确匹配优先，miss 才走通配。多次调用后一次覆盖前一次。
		*/
		handleAny(handler) {
			anyHandler = handler;
		},
		broadcast(event, payload) {
			send({
				type: "event",
				event,
				payload
			});
		},
		invoke,
		on(handler) {
			eventHandler = handler;
		},
		dispose() {
			detach();
			for (const [, p] of pending) p.reject(/* @__PURE__ */ new Error(`[${label}] disposed`));
			pending.clear();
			requestHandlers.clear();
			anyHandler = void 0;
			eventHandler = void 0;
		}
	};
}
/**
* 父进程侧 Transport —— 实现完整的四件套 `handle / broadcast / invoke / on / dispose`。
*
* 使用方式：
* ```ts
* const transport = createProcessHostTransport({ child });
* // Host 收 extension 发来的请求
* transport.handle(methodChannel.invoke);
* // Host 推送事件给 extension
* bus.onAny((event, payload) => transport.broadcast(event, payload));
* // Host 反向调 extension 注册的 method
* await transport.invoke('greet', undefined, { name: 'World' });
* ```
*/
function createProcessHostTransport(options) {
	const { child } = options;
	return createRpcSide({
		label: "ProcessHostTransport",
		send: (msg) => {
			if (child.connected) child.send(msg);
		},
		onMessage: (listener) => {
			child.on("message", listener);
			return () => child.off("message", listener);
		}
	});
}
function isWireMessage(msg) {
	return msg !== null && typeof msg === "object" && "type" in msg && typeof msg.type === "string";
}
//#endregion
//#region ../../packages/workbuddy-extensions/src/runtime/extension-host-manager.ts
/**
* Extension Host Manager —— 管理 extension 子进程的生命周期。
*
* 职责：
* 1. fork extension host 子进程
* 2. 建立 `ProcessHostTransport` → `ExtensionBridgeHost`（基于 core 新 Bridge 协议）
* 3. 装配 hub domain services + 可选的 BridgeAuthorizer 做权限拦截
* 4. 转发 bus 事件到 extension
* 5. 进程退出/崩溃处理
*/
var LOG_BASE_DIR = (0, node_path.join)((0, node_os.homedir)(), ".workbuddy", "logs");
var lastLogDateStr = "";
var cachedLogDir = "";
function todayLogDir() {
	const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if (dateStr === lastLogDateStr) return cachedLogDir;
	const dir = (0, node_path.join)(LOG_BASE_DIR, dateStr);
	try {
		(0, node_fs.mkdirSync)(dir, { recursive: true });
	} catch {}
	lastLogDateStr = dateStr;
	cachedLogDir = dir;
	return dir;
}
function memDiagLogPath() {
	return (0, node_path.join)(todayLogDir(), "daemon-memory-diag.log");
}
function extSchedulerLogPath() {
	return (0, node_path.join)(todayLogDir(), "extension-scheduler-diag.log");
}
var trackedChildren = /* @__PURE__ */ new Map();
var memoryTimer;
/** Extension → daemon 请求开始接收某 conversation 的流式事件。走 wb.invoke。 */
var WB_EXTENSION_REQUEST_RECEIVE_STREAMING_CHANNEL = "wb:internal:extension-request-receive-streaming";
/** Extension → daemon 取消接收流式事件。走 wb.invoke。 */
var WB_EXTENSION_CANCEL_RECEIVE_STREAMING_CHANNEL = "wb:internal:extension-cancel-receive-streaming";
var extensionConversationSubscriptions = /* @__PURE__ */ new Map();
/**
* 每个 extension host 的 scheduler 引用注册表。
*
* spawnExtensionHost 在装配 scheduler 之后 register，dispose 时 unregister。
*
* 【为什么需要这份注册表】
* 订阅 request/cancel 通过 daemon RPC 到达（`register-wb-bridge-channels.ts` 里
* `server.handle`），拿到 payload 后需要**直接操作对应 host 的 scheduler**：
* - `scheduler.setCurrentConversationIds([cid])` 把 gate 打开
* - `scheduler.setCurrentConversationIds([SENTINEL])` 关回 gate
*
* scheduler 的 `shouldPublishHighFrequency` 内部会先看 currentConversationIds：
* 只要 has(cid) → 放行；否则走 shouldPublishRequestUpdate 回调（我们也接了做双重校验）。
* 用 currentConversationIds 走 gate 才能绕过 `size === 0 → return true` 那条兜底短路。
*/
var extensionSchedulers = /* @__PURE__ */ new Map();
/**
* scheduler.setCurrentConversationIds 的哨兵 cid。
*
* 【为什么需要】
* scheduler.shouldPublishHighFrequency 有条兜底短路：`currentConversationIds`
* 为空集或 undefined 时**直接放行**（原本是给 renderer 首页空窗兜底的语义）。
* extension 场景要严格 gate —— 未订阅时**必须**让 currentConversationIds 非空且
* 不包含任何真实 cid，走 shouldPublishRequestUpdate 回调返回 false 才能真正 gate。
* 哨兵值就是这条 wire 上"永远不会出现的 cid"，让 currentConversationIds 恒非空。
*/
var EXTENSION_GATE_SENTINEL = "__ext_gate_sentinel__";
/**
* 覆盖式请求接收某 conversation 的流式事件。
* 每次调用作废前一次的关注 cid（单值 set current 语义）。
*
* 【双写】
* 1. subscriptions map：记录订阅关系，供 shouldPublishRequestUpdate 回调做二次校验；
* 2. scheduler.currentConversationIds：真正让 gate 逻辑生效的入口。
*
* ⚠️ 只应由 daemon 侧 `WB_EXTENSION_REQUEST_RECEIVE_STREAMING_CHANNEL` 的 server.handle
* 调用（payload.extensionId 已由 extension bridge-host host-sign）。不要在其他地方
* 直接调用本函数 —— 否则绕过 host-sign 环节等于给外部可控数据开了后门。
*/
function requestExtensionReceiveStreaming(payload) {
	extensionConversationSubscriptions.set(payload.extensionId, payload.conversationId);
	extensionSchedulers.get(payload.extensionId)?.setCurrentConversationIds([payload.conversationId]);
}
/**
* 取消接收流式事件。清空该 extension 的关注。
*
* ⚠️ 只应由 daemon 侧 `WB_EXTENSION_CANCEL_RECEIVE_STREAMING_CHANNEL` 的 server.handle
* 或 spawnExtensionHost 的 child.on('exit') / dispose 路径调用。
*/
function cancelExtensionReceiveStreaming(payload) {
	extensionConversationSubscriptions.delete(payload.extensionId);
	extensionSchedulers.get(payload.extensionId)?.setCurrentConversationIds([EXTENSION_GATE_SENTINEL]);
}
/** 用于 scheduler 门控闭包读取；封装成函数是为了避免闭包捕获 Map 引用带来的心智负担。 */
function isConversationSubscribedByExtension(extensionId, conversationId) {
	return extensionConversationSubscriptions.get(extensionId) === conversationId;
}
function readChildWriteQueue(c) {
	const anyChild = c;
	const channel = anyChild.channel;
	const stdout = anyChild.stdout;
	const stderr = anyChild.stderr;
	const readNum = (v) => typeof v === "number" ? v : void 0;
	const cHandle = anyChild._handle;
	const chHandle = channel?._handle;
	const _channelHandle = anyChild._channel?._handle;
	const ipcWq = readNum(cHandle?.writeQueueSize) ?? readNum(chHandle?.writeQueueSize) ?? readNum(_channelHandle?.writeQueueSize) ?? readNum(channel?.writeQueueSize);
	const soHandle = stdout?._handle;
	const stdoutWq = readNum(soHandle?.writeQueueSize) ?? readNum(stdout?.writableLength);
	const seHandle = stderr?._handle;
	return {
		ipcWq,
		stdoutWq,
		stderrWq: readNum(seHandle?.writeQueueSize) ?? readNum(stderr?.writableLength)
	};
}
function ensureMemorySamplerStarted() {
	if (memoryTimer) return;
	const runOnce = () => {
		try {
			const mem = process.memoryUsage();
			const rssMB = (mem.rss / 1024 / 1024).toFixed(1);
			const heapUsedMB = (mem.heapUsed / 1024 / 1024).toFixed(1);
			const heapTotalMB = (mem.heapTotal / 1024 / 1024).toFixed(1);
			const externalMB = (mem.external / 1024 / 1024).toFixed(1);
			const arrayBufMB = (mem.arrayBuffers / 1024 / 1024).toFixed(1);
			const sysFreeMB = ((0, node_os.freemem)() / 1024 / 1024).toFixed(0);
			const sysTotalMB = ((0, node_os.totalmem)() / 1024 / 1024).toFixed(0);
			const childInfos = [];
			for (const [pid, entry] of trackedChildren) {
				const { ipcWq, stdoutWq, stderrWq } = readChildWriteQueue(entry.child);
				childInfos.push(`${entry.manifestId}(pid=${pid} conn=${entry.child.connected} ipcWq=${ipcWq !== void 0 ? (ipcWq / 1024 / 1024).toFixed(2) + "MB" : "N/A"}${stdoutWq ? ` stdoutWq=${stdoutWq}B` : ""}${stderrWq ? ` stderrWq=${stderrWq}B` : ""})`);
			}
			(0, node_fs.appendFileSync)(memDiagLogPath(), `[${(/* @__PURE__ */ new Date()).toISOString()}] rss=${rssMB}MB heap=${heapUsedMB}/${heapTotalMB}MB external=${externalMB}MB arrayBuf=${arrayBufMB}MB sysFree=${sysFreeMB}/${sysTotalMB}MB children=[${childInfos.join(", ")}]\n`);
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			for (const [extensionId, scheduler] of extensionSchedulers) try {
				const snap = scheduler.snapshotObservability();
				const curIds = scheduler.getCurrentConversationIds();
				let curLabel;
				if (curIds === void 0) curLabel = "undef";
				else if (curIds.length === 0) curLabel = "empty";
				else if (curIds.length === 1 && curIds[0] === EXTENSION_GATE_SENTINEL) curLabel = "SENTINEL(gate-all)";
				else curLabel = curIds.map((c) => c.slice(0, 8)).join(",");
				(0, node_fs.appendFileSync)(extSchedulerLogPath(), `[${ts}] [ext=${extensionId}] current=${curLabel} received=${snap.sched.received} gated=${snap.sched.gatedFrames} immSent=${snap.sched.immediateSent} batch=${snap.sched.batchedFrames} toolThr=${snap.sched.toolThrottledFrames} toolSnt=${snap.sched.toolThrottleSent} chThr=${snap.sched.childThrottledFrames} chSnt=${snap.sched.childThrottleSent} artThr=${snap.sched.artifactThrottledFrames} artSnt=${snap.sched.artifactThrottleSent} pending=text${snap.pending.text}+child${snap.pending.child}+tool${snap.pending.tool}+art${snap.pending.artifact}\n`);
			} catch {}
		} catch {}
		memoryTimer = setTimeout(runOnce, 5e3);
		memoryTimer.unref?.();
	};
	memoryTimer = setTimeout(runOnce, 5e3);
	memoryTimer.unref?.();
}
/**
* 启动一个 extension host 子进程，建立 bridge 通信，返回 handle。
*/
function spawnExtensionHost(manifest, deps) {
	const { methodChannel, bus, authorizer, daemonRpcInvoke, extraNodePaths } = deps;
	const nodePathSep = process.platform === "win32" ? ";" : ":";
	const mergedNodePath = extraNodePaths && extraNodePaths.length > 0 ? [...extraNodePaths, process.env.NODE_PATH ?? ""].filter(Boolean).join(nodePathSep) : process.env.NODE_PATH;
	const child = (0, node_child_process.fork)(manifest.main, [], {
		stdio: [
			"pipe",
			"pipe",
			"pipe",
			"ipc"
		],
		env: {
			...process.env,
			...mergedNodePath ? { NODE_PATH: mergedNodePath } : {},
			WB_EXTENSION_ID: manifest.id
		}
	});
	if (child.pid) {
		trackedChildren.set(child.pid, {
			manifestId: manifest.id,
			child
		});
		const pidToRemove = child.pid;
		child.once("exit", () => {
			trackedChildren.delete(pidToRemove);
		});
	}
	ensureMemorySamplerStarted();
	const forwardStream = (stream) => (chunk) => {
		const lines = chunk.toString("utf-8").split("\n");
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (i === lines.length - 1 && line === "") continue;
			bus.emit("extension.log", {
				extensionId: manifest.id,
				pid: child.pid,
				stream,
				text: line,
				timestamp: Date.now()
			});
		}
	};
	child.stdout?.on("data", forwardStream("stdout"));
	child.stderr?.on("data", forwardStream("stderr"));
	child.stdout?.on("data", (chunk) => {
		console.log(`[ext-stdout:${manifest.id}:${child.pid}]`, chunk.toString("utf-8").trimEnd());
	});
	child.stderr?.on("data", (chunk) => {
		console.error(`[ext-stderr:${manifest.id}:${child.pid}]`, chunk.toString("utf-8").trimEnd());
	});
	const transport = createProcessHostTransport({ child });
	const host = createExtensionBridgeHost({
		subject: {
			moduleId: manifest.id,
			type: "extension",
			kind: manifest.builtin ? "builtin" : "platform",
			scopes: []
		},
		authorizer,
		methodChannel,
		transport,
		daemonRpcInvoke
	});
	const extensionEventScheduler = new require_conversations.ConversationEventPushScheduler({
		push: (event, payload) => host.pushEvent(event, payload),
		shouldPublishRequestUpdate: (conversationId) => isConversationSubscribedByExtension(manifest.id, conversationId)
	});
	extensionEventScheduler.setCurrentConversationIds([EXTENSION_GATE_SENTINEL]);
	extensionSchedulers.set(manifest.id, extensionEventScheduler);
	const unsubBus = bus.onAny((event, payload) => {
		extensionEventScheduler.publish(event, payload);
	});
	let readyResolve;
	let readyReject;
	let readyDone = false;
	const ready = new Promise((resolve, reject) => {
		readyResolve = () => {
			readyDone = true;
			resolve();
		};
		readyReject = (err) => {
			readyDone = true;
			reject(err);
		};
	});
	const readyTimeout = setTimeout(() => {
		if (!readyDone) {
			console.warn(`[ExtensionHost] "${manifest.id}" did not send ready signal within 10s; proceeding anyway (may hit "no request handler attached" race on first invoke). Update the extension bootstrap to use latest @genie/workbuddy-extensions/runtime.`);
			readyResolve();
		}
	}, 1e4);
	const onChildMessage = (msg) => {
		if (msg && typeof msg === "object" && msg.type === "wb-extension-ready") {
			clearTimeout(readyTimeout);
			readyResolve();
			child.off("message", onChildMessage);
		}
	};
	child.on("message", onChildMessage);
	let exitResolve;
	const exitPromise = new Promise((resolve) => {
		exitResolve = resolve;
	});
	let exited = false;
	child.on("exit", (code, signal) => {
		exited = true;
		console.log(`[ExtensionHost] "${manifest.id}" exited (code=${code}, signal=${signal})`);
		clearTimeout(readyTimeout);
		if (!readyDone) readyReject(/* @__PURE__ */ new Error(`[ExtensionHost] "${manifest.id}" exited before ready (code=${code}, signal=${signal})`));
		unsubBus();
		extensionEventScheduler.dispose();
		extensionConversationSubscriptions.delete(manifest.id);
		extensionSchedulers.delete(manifest.id);
		exitResolve();
	});
	let disposePromise = null;
	return {
		id: manifest.id,
		host,
		process: child,
		ready,
		dispose() {
			if (disposePromise) return disposePromise;
			disposePromise = (async () => {
				clearTimeout(readyTimeout);
				unsubBus();
				extensionEventScheduler.dispose();
				extensionConversationSubscriptions.delete(manifest.id);
				extensionSchedulers.delete(manifest.id);
				host.dispose();
				if (exited) return;
				try {
					child.kill("SIGTERM");
				} catch (err) {
					console.warn(`[ExtensionHost] "${manifest.id}" SIGTERM failed:`, err);
				}
				const KILL_TIMEOUT_MS = 3e3;
				const killTimer = setTimeout(() => {
					if (!exited) {
						console.warn(`[ExtensionHost] "${manifest.id}" did not exit within ${KILL_TIMEOUT_MS}ms after SIGTERM, sending SIGKILL`);
						try {
							child.kill("SIGKILL");
						} catch (err) {
							console.error(`[ExtensionHost] "${manifest.id}" SIGKILL failed:`, err);
						}
					}
				}, KILL_TIMEOUT_MS);
				await exitPromise;
				clearTimeout(killTimer);
			})();
			return disposePromise;
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-extensions/src/runtime/extension-registry.ts
/**
* Extension Registry —— extensions 包的核心管理器。
*
* 职责：
* 1. 扫描指定目录下的 extension（读 extension.json + distribution.json）
* 2. 注册到内部 registry
* 3. 按 activationEvents 决定激活时机
* 4. 调 spawnExtensionHost fork 子进程
* 5. 管理生命周期（activate / deactivate / dispose）
* 6. 对外暴露查询接口（listExtensions / getExtension / status）
*
* 设计要点：
* - desktop 侧只需要 createExtensionRegistry + addScanPath + activate + dispose
* - extensions 包自己写测试时，mock services + bus 就能完整跑通
* - 后续云端拉取分发信息也在这里做（复用 core 的 http 能力）
*/
function createExtensionRegistry(deps) {
	const { methodChannel: methodChannelInput, bus, logger = console, guardian, guardianBudgets } = deps;
	const guardianId = (extId) => `ext:${extId}`;
	const resolveMethodChannel = typeof methodChannelInput === "function" ? methodChannelInput : () => methodChannelInput;
	const scanPaths = [];
	const extensions = /* @__PURE__ */ new Map();
	function addScanPath(dir) {
		scanPaths.push(dir);
	}
	/**
	* 扫描所有 scan paths，发现 extension 并注册到 registry。
	* 每个子目录如果包含 extension.json，就视为一个 extension。
	*/
	function scan() {
		for (const scanDir of scanPaths) {
			if (!(0, node_fs.existsSync)(scanDir)) continue;
			const entries = (0, node_fs.readdirSync)(scanDir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory()) continue;
				const extDir = node_path.join(scanDir, entry.name);
				const manifestPath = node_path.join(extDir, "extension.json");
				if (!(0, node_fs.existsSync)(manifestPath)) continue;
				try {
					const manifest = JSON.parse((0, node_fs.readFileSync)(manifestPath, "utf-8"));
					const distPath = node_path.join(extDir, "distribution.json");
					const distribution = (0, node_fs.existsSync)(distPath) ? JSON.parse((0, node_fs.readFileSync)(distPath, "utf-8")) : createDefaultDistribution(manifest.id, manifest.version);
					const serverEntry = resolveServerEntry(extDir, manifest);
					extensions.set(manifest.id, {
						manifest,
						distribution,
						basePath: extDir,
						serverEntry,
						enabled: true,
						state: "registered",
						handle: null
					});
				} catch (err) {
					logger.error(`[ExtensionRegistry] failed to parse extension at ${extDir}:`, err);
				}
			}
		}
	}
	/**
	* 激活单个 extension（幂等 —— 已 active 直接返回）。
	*
	* `emitLifecycleEvent` 会把 state 变化通过 bus 推给 UI，UI 无需轮询即可实时更新。
	*/
	async function activateOne(id, options = {}) {
		const ext = extensions.get(id);
		if (!ext) throw new Error(`[ExtensionRegistry] extension not registered: ${id}`);
		if (!ext.enabled) throw new Error(`[ExtensionRegistry] extension "${id}" is disabled by user; call setEnabled(id, true) first`);
		if (ext.state === "active" || ext.state === "activating") return ext;
		if (!options.force && ext.distribution.status !== "active") throw new Error(`[ExtensionRegistry] extension "${id}" distribution status is "${ext.distribution.status}"`);
		if (!ext.serverEntry) {
			ext.state = "active";
			ext.error = void 0;
			logger.info(`[ExtensionRegistry] ${id} activated (renderer-only, no server fork; skip guardian)`);
			emitLifecycleEvent(ext);
			return ext;
		}
		ext.state = "activating";
		ext.error = void 0;
		emitLifecycleEvent(ext);
		try {
			const handle = spawnExtensionHost({
				id: ext.manifest.id,
				name: ext.manifest.name,
				main: ext.serverEntry,
				builtin: ext.distribution.kind === "builtin",
				permissions: ext.distribution.grantedPermissions
			}, {
				methodChannel: resolveMethodChannel(),
				bus,
				authorizer: deps.authorizer,
				daemonRpcInvoke: deps.daemonRpcInvoke,
				extraNodePaths: deps.extraNodePaths
			});
			ext.handle = handle;
			logger.info(`[ExtensionRegistry] ${id} forked, pid=${handle.process.pid} — waiting ready`);
			handle.process.once("exit", (code, signal) => {
				if (ext.handle !== handle) return;
				ext.handle = null;
				ext.state = code === 0 || signal === "SIGTERM" ? "deactivated" : "failed";
				if (ext.state === "failed") ext.error = `unexpected exit code=${code} signal=${signal}`;
				unregisterFromGuardian(ext.manifest.id, "manual");
				emitLifecycleEvent(ext);
			});
			await handle.ready;
			ext.state = "active";
			logger.info(`[ExtensionRegistry] ${id} ready, pid=${handle.process.pid}`);
			registerToGuardian(ext);
			emitLifecycleEvent(ext);
			return ext;
		} catch (err) {
			ext.state = "failed";
			ext.error = err instanceof Error ? err.message : String(err);
			const errMsg = err instanceof Error ? err.message : String(err);
			const errStack = err instanceof Error ? err.stack : void 0;
			logger.error(`[ExtensionRegistry] ${id} activation failed: ${errMsg}\n${errStack ?? "(no stack)"}`);
			emitLifecycleEvent(ext);
			throw err;
		}
	}
	/**
	* @deprecated 兼容旧调用：遍历所有 status=active 的 extension 全部激活。
	* 不查 activationEvents，不区分 lazy —— 上层应改用 `activateByEvent('onStartup')`
	* 或让 `wb.extensions.invoke` 触发 lazy 激活。
	*/
	async function activate() {
		for (const [id, ext] of extensions) {
			if (ext.distribution.status !== "active") continue;
			if (ext.state === "active" || ext.state === "activating") continue;
			try {
				await activateOne(id);
			} catch {}
		}
	}
	/**
	* 事件驱动激活 —— 见接口注释。framework 无业务感知，只做"查表 + 逐个 activateOne"。
	*
	* 匹配规则：`manifest.service?.activationEvents` 数组里精确 includes(event)。
	* 纯 UI extension（无 service 段）永远不匹配任何事件。
	* 未来若引入通配（如 `onCommand:tdocs.*`），在此函数扩展匹配逻辑即可，
	* `activateOne` 那侧不用动。
	*/
	async function activateByEvent(event) {
		const hits = [];
		for (const [id, ext] of extensions) {
			const events = ext.manifest.service?.activationEvents ?? [];
			const distStatus = ext.distribution.status;
			const state = ext.state;
			const matched = events.includes(event);
			if (distStatus !== "active") continue;
			if (!ext.enabled) continue;
			if (state === "active" || state === "activating") continue;
			if (!matched) continue;
			hits.push(id);
		}
		if (hits.length === 0) {
			logger.info(`[ExtensionRegistry] activateByEvent('${event}') matched 0 extension`);
			return;
		}
		logger.info(`[ExtensionRegistry] activateByEvent('${event}') matched ${hits.length} extension(s): ${hits.join(", ")}`);
		for (const id of hits) try {
			await activateOne(id);
		} catch {}
	}
	/**
	* 停用单个 extension —— 杀子进程 + 释放 handle。
	* `resident=true` 的 extension 需要 `force` 才能停。
	*/
	async function deactivateOne(id, options = {}) {
		const ext = extensions.get(id);
		if (!ext) throw new Error(`[ExtensionRegistry] extension not registered: ${id}`);
		if (ext.distribution.resident && !options.force) throw new Error(`[ExtensionRegistry] extension "${id}" is resident, cannot deactivate (pass force=true to override)`);
		if (!ext.handle) {
			if (ext.state !== "deactivated") {
				ext.state = "deactivated";
				emitLifecycleEvent(ext);
			}
			return ext;
		}
		ext.state = "deactivating";
		emitLifecycleEvent(ext);
		unregisterFromGuardian(id, "manual");
		await ext.handle.dispose();
		ext.handle = null;
		ext.state = "deactivated";
		logger.info(`[ExtensionRegistry] ${id} deactivated`);
		emitLifecycleEvent(ext);
		return ext;
	}
	/**
	* 注册当前 extension 到 Guardian —— 只在 state 变为 `active` 后调用。
	*
	* Guardian.handle.dispose 通过 `deactivateOne(id, {force: true})` 路由回 registry：
	* - Idle 驱逐时 Guardian 会调 handle.dispose → registry 走完整停用流程
	* - `distribution.resident=true` 映射为 `pin='resident'`，Guardian 不会 idle 驱逐它
	*
	* 未挂 Guardian 时是 no-op。
	*/
	function registerToGuardian(ext) {
		if (!guardian) return;
		try {
			let budgets = [];
			if (guardianBudgets) try {
				budgets = guardianBudgets(ext);
			} catch (err) {
				logger.warn(`[ExtensionRegistry] guardianBudgets(${ext.manifest.id}) threw:`, err);
				budgets = [];
			}
			guardian.register({
				id: guardianId(ext.manifest.id),
				runtimeKind: "extension",
				pin: ext.distribution.resident ? "resident" : "idle-evictable",
				handle: { dispose: async () => {
					await deactivateOne(ext.manifest.id, { force: true });
				} },
				budgets
			});
		} catch (err) {
			const detail = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err);
			logger.warn(`[ExtensionRegistry] guardian.register failed for ${ext.manifest.id}: ${detail}`);
		}
	}
	/** 从 Guardian 中注销（幂等）。未挂 Guardian 或未注册均是 no-op。 */
	function unregisterFromGuardian(extId, reason = "manual") {
		if (!guardian) return;
		try {
			guardian.unregister(guardianId(extId), reason);
		} catch (err) {
			logger.warn(`[ExtensionRegistry] guardian.unregister failed for ${extId}:`, err);
		}
	}
	/**
	* 通知 Guardian 该 extension 刚发生活动。见 interface 注释。
	* 未挂 Guardian 时是 no-op；未注册 id 时 Guardian 内部也静默处理。
	*/
	function markActive(id) {
		if (!guardian) return;
		guardian.markActive(guardianId(id));
	}
	/**
	* 生命周期事件 —— 每次 state 变化广播一次，UI 订阅 `extension.lifecycle` 实时更新。
	*/
	function emitLifecycleEvent(ext) {
		bus.emit("extension.lifecycle", {
			extensionId: ext.manifest.id,
			state: ext.state,
			enabled: ext.enabled,
			pid: ext.handle?.process.pid,
			error: ext.error,
			timestamp: Date.now()
		});
	}
	/**
	* 设置 extension 启用/禁用状态。
	*
	* 切到 `false` 且 service 在跑：先 force-deactivate 释放子进程，再置 enabled。
	* 切到 `true`：不主动 activate，等 activationEvents / invoke 触发；只发一次 lifecycle 事件通知 UI 刷新。
	*/
	async function setEnabled(id, enabled) {
		const ext = extensions.get(id);
		if (!ext) throw new Error(`[ExtensionRegistry] extension not registered: ${id}`);
		if (ext.enabled === enabled) return ext;
		if (!enabled && ext.handle) try {
			await deactivateOne(id, { force: true });
		} catch (err) {
			logger.error(`[ExtensionRegistry] setEnabled(${id}, false): failed to deactivate service:`, err);
		}
		ext.enabled = enabled;
		logger.info(`[ExtensionRegistry] ${id} ${enabled ? "enabled" : "disabled"}`);
		emitLifecycleEvent(ext);
		return ext;
	}
	/**
	* 重载单个 extension —— 开发期热更新入口。
	*
	* 流程：
	* 1. 若在跑 → force deactivate（复用 deactivateOne）
	* 2. 从 basePath 重新读磁盘（manifest.json + distribution.json）
	* 3. 替换 registry 里的记录，**保留** `enabled` 用户偏好
	* 4. 广播 lifecycle 事件让 UI 刷新
	* 5. 不主动 activate —— lazy activate 按 invoke / activationEvents 触发
	*/
	async function reload(id) {
		const prev = extensions.get(id);
		if (!prev) throw new Error(`[ExtensionRegistry] reload: extension not registered: ${id}`);
		const extDir = prev.basePath;
		const manifestPath = node_path.join(extDir, "extension.json");
		if (!(0, node_fs.existsSync)(manifestPath)) throw new Error(`[ExtensionRegistry] reload: manifest missing at ${manifestPath}`);
		logger.info(`[ExtensionRegistry] reload ${id} — deactivate → rescan → replace`);
		if (prev.handle) try {
			await deactivateOne(id, { force: true });
		} catch (err) {
			logger.error(`[ExtensionRegistry] reload ${id}: deactivate failed (continue anyway):`, err);
		}
		let manifest;
		let distribution;
		try {
			manifest = JSON.parse((0, node_fs.readFileSync)(manifestPath, "utf-8"));
			const distPath = node_path.join(extDir, "distribution.json");
			distribution = (0, node_fs.existsSync)(distPath) ? JSON.parse((0, node_fs.readFileSync)(distPath, "utf-8")) : createDefaultDistribution(manifest.id, manifest.version);
		} catch (err) {
			throw new Error(`[ExtensionRegistry] reload ${id}: failed to parse extension.json / distribution.json: ${err instanceof Error ? err.message : String(err)}`);
		}
		const serverEntry = resolveServerEntry(extDir, manifest);
		const next = {
			manifest,
			distribution,
			basePath: extDir,
			serverEntry,
			enabled: prev.enabled,
			state: "registered",
			handle: null
		};
		extensions.set(id, next);
		emitLifecycleEvent(next);
		logger.info(`[ExtensionRegistry] ${id} reloaded, serverEntry=${serverEntry ?? "<null>"}`);
		return next;
	}
	function list() {
		return Array.from(extensions.values());
	}
	function get(id) {
		return extensions.get(id);
	}
	function dispose() {
		for (const [id, ext] of extensions) {
			unregisterFromGuardian(id, "manual");
			if (ext.handle) {
				ext.handle.dispose();
				ext.handle = null;
				ext.state = "deactivated";
				logger.info(`[ExtensionRegistry] ${id} disposed`);
			}
		}
	}
	return {
		addScanPath,
		scan,
		activate,
		activateByEvent,
		activateOne,
		deactivateOne,
		markActive,
		list,
		get,
		setEnabled,
		reload,
		dispose
	};
}
/**
* 解析 extension server 入口的绝对路径。
* 优先找 pkg/server/index.cjs（构建产物），fallback 到 manifest 声明的 runtime.server.entry。
*/
/**
* 解析 extension 的 server 入口。
*
* 目标形态 flat 布局：`<extDir>/server/index.cjs`（extDir 已经是 dist/<id>/）。
* 若 manifest 显式声明 `service.entry`，尊重之。
*
* @returns 绝对路径；无 server 或产物缺失返回 null（scan 仍成功，activate 会 skip）。
*/
function resolveServerEntry(extDir, manifest) {
	const declared = manifest.service?.entry;
	if (declared) {
		const resolved = node_path.resolve(extDir, declared);
		if ((0, node_fs.existsSync)(resolved)) return resolved;
	}
	const conventional = node_path.join(extDir, "server", "index.cjs");
	if ((0, node_fs.existsSync)(conventional)) return conventional;
	return null;
}
/**
* 缺 `distribution.json` 时的默认值 —— **最保守**（缺声明 = 什么都不给）。
*
* 反直觉但正确：如果 default 是 builtin/全通，那么"忘记补 distribution.json"就等于
* 静默把 extension 提升到最高权限。永远不能让"漏配置"变成"漏授权"。
*
* builtin 必须通过 distribution.json 显式声明 `kind: 'builtin'` 才拿全权限。
*/
function createDefaultDistribution(extensionId, version) {
	return {
		extensionId,
		version,
		kind: "platform",
		grantedPermissions: [],
		processPolicy: {
			server: "fork",
			renderer: null
		},
		rollout: {
			strategy: "full",
			percentage: 100
		},
		status: "active"
	};
}
//#endregion
//#region ../../packages/workbuddy-core/src/infra/guardian/decision-log.ts
var DecisionLog = class {
	constructor(maxSize) {
		this.buffer = [];
		this.cursor = 0;
		this.maxSize = Math.max(1, maxSize);
	}
	/**
	* 追加一条记录。超出容量则覆盖最旧的条目。
	*/
	append(entry) {
		if (this.buffer.length < this.maxSize) this.buffer.push(entry);
		else {
			this.buffer[this.cursor] = entry;
			this.cursor = (this.cursor + 1) % this.maxSize;
		}
	}
	/**
	* 导出全部记录（按时间顺序，最旧的在前）。
	*
	* 每次调用都返回新数组，调用方可自行 filter / slice 不必担心影响内部状态。
	*/
	export() {
		if (this.buffer.length < this.maxSize) return [...this.buffer];
		return [...this.buffer.slice(this.cursor), ...this.buffer.slice(0, this.cursor)];
	}
	/** 清空（测试 / 手动重置用）。 */
	clear() {
		this.buffer.length = 0;
		this.cursor = 0;
	}
	/** 当前条目数（用于测试与调试）。 */
	get size() {
		return this.buffer.length;
	}
};
//#endregion
//#region ../../packages/workbuddy-core/src/infra/guardian/guardian.ts
/**
* ResourceGuardian —— 中心化实例资源调度器（Policy 层主实现）。
*
* ═══════════════════════════════════════════════════════════════════
* Phase 1 范围（对齐 DESIGN.md § 分期落地 · 第一期）
* ═══════════════════════════════════════════════════════════════════
*
* ✅ ManagedInstance 数据结构 + register / unregister
* ✅ markActive（活动信号更新 lastActiveAt）
* ✅ 路径 A：Idle 驱逐（TTL 巡检 + pin 保护 + 幂等竞态处理）
* ✅ 事件契约：registered / evicted（violation / pressure 待 Phase 2/3）
* ✅ Sampler / Action 注册表（接口就位，Phase 1 内部尚未激活违约判定）
* ✅ 决策日志 ring buffer
*
* ⏳ Phase 2：路径 B 违约驱逐（pidusage / memory.rss / graceMs 判定）
* ⏳ Phase 3：路径 C 系统压力驱逐（os.freemem / 候选打分 / 消抖冷却）
*
* ═══════════════════════════════════════════════════════════════════
* 关键约束
* ═══════════════════════════════════════════════════════════════════
*
* - **Policy 层不感知运行时**：只处理数字 / 时间戳 / 抽象句柄，不 import
*   `node:child_process` / `pidusage` / DOM 等。Adapter 各自实现 dispose / sample。
* - **dispose 必须幂等**：驱逐进行中被 markActive 抢占会触发状态修复，Adapter
*   侧要能容忍重复调用。
* - **单进程单实例**：不做跨进程 Guardian 集群协调。
*/
var DEFAULT_IDLE_TIMEOUT_MS = 6e5;
var DEFAULT_IDLE_CHECK_INTERVAL_MS = 6e4;
/**
* 违约巡检周期（默认 1s）——比 idle 巡检快，因为内存/CPU 飙升需要快速响应。
* Sampler 各自的 `intervalMs` 目前是"建议"值，简化版还没做每 sampler 独立调度。
*/
var DEFAULT_VIOLATION_CHECK_INTERVAL_MS = 1e3;
var DEFAULT_DECISION_LOG_SIZE = 200;
/** 0 = 不限；装配层需要显式声明池上限（比如 desktop 场景传 `poolSize: 2`）。 */
var DEFAULT_POOL_SIZE = 0;
var ResourceGuardian = class {
	constructor(deps = {}) {
		this.slots = /* @__PURE__ */ new Map();
		this.samplers = /* @__PURE__ */ new Map();
		this.actions = /* @__PURE__ */ new Map();
		this.disposed = false;
		this.bus = deps.bus ?? require_conversations.getBus();
		this.namespace = deps.namespace;
		this.logger = deps.logger ?? console;
		this.poolSize = Math.max(0, deps.config?.poolSize ?? DEFAULT_POOL_SIZE);
		this.onCapacityExceeded = deps.config?.onCapacityExceeded;
		this.config = {
			idleTimeoutMs: deps.config?.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS,
			idleCheckIntervalMs: deps.config?.idleCheckIntervalMs ?? DEFAULT_IDLE_CHECK_INTERVAL_MS,
			violationCheckIntervalMs: deps.config?.violationCheckIntervalMs ?? DEFAULT_VIOLATION_CHECK_INTERVAL_MS,
			decisionLogSize: deps.config?.decisionLogSize ?? DEFAULT_DECISION_LOG_SIZE
		};
		this.decisionLog = new DecisionLog(this.config.decisionLogSize);
		this.registerBuiltinActions();
		this.startIdleCheck();
		this.startViolationCheck();
	}
	/**
	* 注册一个被托管实例。
	*
	* 校验 & 副作用：
	* 1. `budgets[*].resource` 必须有对应 Sampler 注册（Phase 1 内部尚未激活违约
	*    判定，但校验先立起来避免"声明了但没采样"的隐蔽 bug）。
	* 2. **池容量判定**（若 `poolSize > 0`）：
	*    - 未满 → 直接注册
	*    - 已满 且 池内存在可淘汰的非 resident 实例 → 挑 lastActiveAt 最早的一个淘汰
	*      （reason = 'capacity'），腾出空间后继续注册当前实例
	*    - 已满 且 全 resident：
	*      - 若 `onCapacityExceeded` 返回 `> current` 的新上限 → 扩容后放行
	*      - 否则拒绝 register，emit `guardian.capacityExceeded` 并抛错
	*
	* ⚠️ 相同 id 重复 register 会抛错，避免静默替换 handle 导致老实例泄漏。
	* ⚠️ 淘汰旧实例走 fire-and-forget dispose —— register 保持同步语义；如果调用方
	*    需要"确认旧实例真死了再拉新的"，应显式调 `evict(id)` 后再 `register()`。
	*/
	register(params) {
		this.ensureAlive();
		if (this.slots.has(params.id)) throw new Error(`[Guardian] instance already registered: ${params.id}`);
		const requestedBudgets = params.budgets ?? [];
		const budgets = [];
		for (const b of requestedBudgets) if (this.samplers.has(b.resource)) budgets.push(b);
		else this.logger?.warn?.(`[Guardian] budget "${b.resource}" for instance=${params.id} skipped: sampler not registered. Budget will auto-activate when sampler is registered.`);
		this.enforceCapacity(params.id);
		const now = Date.now();
		const instance = {
			id: params.id,
			runtimeKind: params.runtimeKind,
			pin: params.pin ?? "idle-evictable",
			isolation: params.isolation ?? "strict",
			budgets,
			lastActiveAt: now,
			registeredAt: now
		};
		this.slots.set(params.id, {
			instance,
			handle: params.handle,
			evicting: false,
			violationSince: /* @__PURE__ */ new Map()
		});
		const payload = {
			id: instance.id,
			runtimeKind: instance.runtimeKind
		};
		this.emitEvent("registered", payload);
	}
	/**
	* 容量兜底 —— 在 register 阶段判定并执行淘汰 / 扩容。
	*
	* 语义（`register()` 调用一次）：
	* - `poolSize <= 0` → no-op（不限）
	* - 未满 → no-op
	* - 已满 + 存在可淘汰非 resident → LRU 淘汰 1 个（reason='capacity'）
	* - 已满 + 全 resident + 有 `onCapacityExceeded` 且返回 > 当前 → 扩容后放行
	* - 已满 + 全 resident + 无扩容路径 → emit `guardian.capacityExceeded` + 抛错
	*
	* @throws 当池已满且全 resident 且未通过扩容回调放行时抛错。
	*/
	enforceCapacity(incomingId) {
		if (this.poolSize <= 0) return;
		if (this.slots.size < this.poolSize) return;
		const candidates = [];
		for (const slot of this.slots.values()) {
			if (slot.instance.pin === "resident") continue;
			if (slot.evicting) continue;
			candidates.push(slot);
		}
		candidates.sort((a, b) => a.instance.lastActiveAt - b.instance.lastActiveAt);
		if (candidates.length > 0) {
			this.evictForCapacity(candidates[0], incomingId);
			return;
		}
		const currentIds = Array.from(this.slots.keys());
		const residentIds = Array.from(this.slots.values()).filter((s) => s.instance.pin === "resident").map((s) => s.instance.id);
		const current = this.poolSize;
		let expanded;
		if (this.onCapacityExceeded) try {
			expanded = this.onCapacityExceeded({
				current,
				rejectedId: incomingId,
				residentIds
			});
		} catch (err) {
			this.logger.error(`[Guardian] onCapacityExceeded threw: ${err instanceof Error ? err.message : String(err)}`);
			expanded = void 0;
		}
		if (typeof expanded === "number" && expanded > current) {
			this.poolSize = expanded;
			this.logger.warn(`[Guardian] pool expanded ${current} → ${expanded} (all residents, incoming=${incomingId})`);
			return;
		}
		const payload = {
			rejectedId: incomingId,
			currentIds,
			limit: current
		};
		this.emitEvent("capacityExceeded", payload);
		throw new Error(`[Guardian] pool full: size=${current}, all ${currentIds.length} slot(s) are resident. rejectedId=${incomingId}. Free up a slot (unregister a resident) or expand poolSize.`);
	}
	/**
	* 因容量原因淘汰一个 slot —— 同步剔除记账，异步 dispose 不阻塞 register。
	*/
	evictForCapacity(victim, incomingId) {
		this.slots.delete(victim.instance.id);
		victim.evicting = true;
		const snapshotAt = Date.now();
		const lastActiveAt = victim.instance.lastActiveAt;
		this.logger.warn(`[Guardian] pool full (size=${this.poolSize}), evicting LRU non-resident: ${victim.instance.id} (lastActiveAt=${lastActiveAt}, incoming=${incomingId})`);
		this.decisionLog.append({
			at: Date.now(),
			path: "capacity",
			instanceId: victim.instance.id,
			reason: `pool full size=${this.poolSize}, incoming=${incomingId}`,
			snapshotAt,
			lastActiveAt,
			executed: true
		});
		Promise.resolve().then(() => victim.handle.dispose()).catch((err) => {
			this.logger.error(`[Guardian] capacity-driven dispose failed for ${victim.instance.id}: ${err instanceof Error ? err.message : String(err)}`);
		});
		this.emitEvicted(victim.instance.id, "capacity");
	}
	/**
	* 动态调整池上限。
	*
	* - 扩容（`size > current`）：立即生效；后续 register 更容易通过。
	* - 缩容（`size < current`）：**不主动驱逐已在池内的实例**，只是让下次 register
	*   更容易触发容量判定 —— 语义"容纳上限降了，但不清理已存在的"。
	* - `size <= 0` → 关闭容量限制。
	*
	* 装配层典型用法：`onCapacityExceeded` 回调里同步返回新上限，或者收到
	* `guardian.capacityExceeded` 事件后由 UI 让用户确认再手动调此 API。
	*/
	setPoolSize(size) {
		this.ensureAlive();
		const next = Math.max(0, size);
		if (next === this.poolSize) return;
		this.logger.warn(`[Guardian] setPoolSize ${this.poolSize} → ${next}`);
		this.poolSize = next;
	}
	/** 返回当前池上限（0 = 不限）。 */
	getPoolSize() {
		return this.poolSize;
	}
	/**
	* 注销实例（Adapter 主动通知：进程已退出 / DOM 已卸载）。
	*
	* 与 `evict` 不同 —— 这里 Guardian 不再调 `handle.dispose()`，因为调用方已经
	* 完成了释放。仅清理内部记账并广播 `guardian.evicted { reason: 'manual' }`。
	*/
	unregister(id, reason = "manual") {
		this.ensureAlive();
		if (!this.slots.get(id)) return;
		this.slots.delete(id);
		this.emitEvicted(id, reason);
	}
	/**
	* 更新活动信号 —— 每次 invoke / UI 交互调一次。
	*
	* 若目标实例正在驱逐中，会**取消驱逐** —— 场景：`activateOne` 完成后 idle
	* 巡检刚好触发驱逐，同时用户调 invoke，需要保证正在使用的实例不被误杀。
	*/
	markActive(id) {
		this.ensureAlive();
		const slot = this.slots.get(id);
		if (!slot) return;
		slot.instance.lastActiveAt = Date.now();
		if (slot.evicting) slot.evicting = false;
		slot.handle.onActivity?.();
	}
	/**
	* 手动驱逐 —— `wb.guardian.evict(id)` 走这里。
	*
	* 语义：**Guardian 主动调 handle.dispose()**（跟 unregister 不同），dispose 成功
	* 后清账 + 广播事件。若 dispose 抛错，仍然清账（避免 Adapter 挂了导致 Guardian
	* 侧永久残留），但日志记录失败原因。
	*/
	async evict(id, reason = "manual") {
		this.ensureAlive();
		const slot = this.slots.get(id);
		if (!slot) return;
		await this.evictSlot(slot, reason, "manual evict via wb.guardian.evict");
	}
	/** 列出所有当前托管的实例（快照，调用方可安全 filter/sort）。 */
	list() {
		const summaries = [];
		for (const slot of this.slots.values()) {
			const nextCheck = slot.instance.pin === "resident" ? void 0 : slot.instance.lastActiveAt + this.config.idleTimeoutMs;
			summaries.push({
				id: slot.instance.id,
				runtimeKind: slot.instance.runtimeKind,
				pin: slot.instance.pin,
				isolation: slot.instance.isolation,
				lastActiveAt: slot.instance.lastActiveAt,
				registeredAt: slot.instance.registeredAt,
				nextIdleCheckAt: nextCheck,
				evicting: slot.evicting
			});
		}
		summaries.sort((a, b) => {
			if (a.runtimeKind !== b.runtimeKind) return a.runtimeKind.localeCompare(b.runtimeKind);
			return a.registeredAt - b.registeredAt;
		});
		return summaries;
	}
	/** 导出决策日志（排障用）。 */
	exportDecisionLog() {
		return this.decisionLog.export();
	}
	/**
	* 拿到 Guardian 内部使用的事件总线。
	*
	* - 构造时传入了共享 bus：返回该共享 bus（跟 `sdk.$bus` 是同一个）
	* - 未传入：返回进程级单例 bus（`getBus()`），消费方通过 `wb.on(...)` 或它订阅 `guardian.*` 事件
	*
	* 主要用途：装配层未把共享 bus 递进来时，仍能拿到 Guardian 事件源（比如把它桥
	* 接到别处、或做单元测试）。
	*/
	getBus() {
		return this.bus;
	}
	/**
	* 注册 Sampler —— Adapter 侧在初始化时调用。
	*
	* 已注册的 sampler 会被违约巡检循环（`runViolationCheck`）按 `intervalMs` 调用；
	* 采样值跟 `budget.hardLimit` 比较，超限持续 `graceMs` 后按 `onViolation` 触发动作
	* （当前简化实现只支持 `evict`）。
	*/
	registerSampler(sampler) {
		this.ensureAlive();
		if (this.samplers.has(sampler.resource)) throw new Error(`[Guardian] sampler already registered: ${sampler.resource}`);
		this.samplers.set(sampler.resource, sampler);
	}
	/**
	* 注册 Action —— 默认已内建 warn / evict / downgrade，Adapter 或业务可扩展
	* `custom:xxx`。
	*/
	registerAction(action) {
		this.ensureAlive();
		this.actions.set(action.name, action);
	}
	startIdleCheck() {
		this.idleTimer = setInterval(() => {
			this.runIdleCheck();
		}, this.config.idleCheckIntervalMs);
		this.idleTimer.unref?.();
	}
	async runIdleCheck() {
		if (this.disposed) return;
		const now = Date.now();
		const idleTimeout = this.config.idleTimeoutMs;
		const candidates = [];
		for (const slot of this.slots.values()) {
			if (slot.evicting) continue;
			if (slot.instance.pin === "resident") continue;
			if (now - slot.instance.lastActiveAt < idleTimeout) continue;
			candidates.push(slot);
		}
		for (const slot of candidates) await this.evictSlot(slot, "idle", `idle > ${idleTimeout}ms`);
	}
	startViolationCheck() {
		this.violationTimer = setInterval(() => {
			this.runViolationCheck();
		}, this.config.violationCheckIntervalMs);
		this.violationTimer.unref?.();
	}
	async runViolationCheck() {
		if (this.disposed) return;
		const snapshot = [];
		for (const slot of this.slots.values()) {
			if (slot.evicting) continue;
			if (slot.instance.budgets.length === 0) continue;
			snapshot.push(slot);
		}
		if (snapshot.length > 0) this.logger.warn(`[Guardian] runViolationCheck tick: ${snapshot.length} slot(s) to check: ${snapshot.map((s) => s.instance.id).join(",")}`);
		for (const slot of snapshot) for (const budget of slot.instance.budgets) {
			const sampler = this.samplers.get(budget.resource);
			if (!sampler) continue;
			let value;
			try {
				value = await sampler.sample(slot.instance);
			} catch (err) {
				this.logger.warn(`[Guardian] sample(${budget.resource}) failed for ${slot.instance.id}: ${err instanceof Error ? err.message : String(err)}`);
				continue;
			}
			if (value <= budget.hardLimit) {
				slot.violationSince.delete(budget.resource);
				continue;
			}
			const now = Date.now();
			let since = slot.violationSince.get(budget.resource);
			if (since === void 0) {
				since = now;
				slot.violationSince.set(budget.resource, since);
				this.logger.warn(`[Guardian] ${slot.instance.id} exceeded ${budget.resource}: value=${value} > hardLimit=${budget.hardLimit}, grace=${budget.graceMs}ms window opened`);
			}
			if (!(now - since >= budget.graceMs)) continue;
			if (budget.onViolation === "evict") {
				this.logger.warn(`[Guardian] ${slot.instance.id} violation evict: ${budget.resource}=${value} > ${budget.hardLimit} for ${now - since}ms (grace=${budget.graceMs}ms)`);
				await this.evictSlot(slot, "violation", `${budget.resource}=${value} exceeded ${budget.hardLimit} for ${now - since}ms`);
				break;
			}
			this.logger.warn(`[Guardian] ${slot.instance.id} onViolation="${budget.onViolation}" not implemented, no action taken`);
		}
	}
	/**
	* 驱逐单个 slot —— 统一入口（idle / manual / 未来的 violation / pressure 都走）。
	*
	* 流程：
	* 1. 置 `evicting = true`（幂等标志）
	* 2. 调 `handle.dispose()`（Adapter 侧幂等要求）
	* 3. 中途若 `evicting` 被抢占清零（markActive 触发），**取消驱逐**并记录日志
	* 4. 成功：清账 + 广播 `guardian.evicted`
	* 5. 失败：清账 + 记 error log（Adapter 挂了不应导致 Guardian 侧永久残留）
	*/
	async evictSlot(slot, reason, description) {
		if (!this.slots.has(slot.instance.id)) return;
		if (slot.evicting) return;
		slot.evicting = true;
		const snapshotAt = Date.now();
		const lastActiveAt = slot.instance.lastActiveAt;
		try {
			await slot.handle.dispose();
		} catch (err) {
			this.logger.error(`[Guardian] dispose failed for ${slot.instance.id}: ${err instanceof Error ? err.message : String(err)}`);
		}
		if (!slot.evicting) {
			this.decisionLog.append({
				at: Date.now(),
				path: reason,
				instanceId: slot.instance.id,
				reason: `${description} (preempted by markActive)`,
				snapshotAt,
				lastActiveAt,
				executed: false
			});
			return;
		}
		this.slots.delete(slot.instance.id);
		this.decisionLog.append({
			at: Date.now(),
			path: reason,
			instanceId: slot.instance.id,
			reason: description,
			snapshotAt,
			lastActiveAt,
			executed: true
		});
		this.emitEvicted(slot.instance.id, reason);
	}
	registerBuiltinActions() {}
	emitEvicted(id, reason) {
		const payload = {
			id,
			reason
		};
		this.emitEvent("evicted", payload);
	}
	/**
	* 统一事件 emit —— 按 namespace 拼事件名。
	*
	* 拼名规则：
	* - 无 namespace → `guardian.<name>`
	* - 有 namespace → `guardian.<namespace>.<name>`
	*
	* 集中在这里，未来若要支持多 namespace 广播（比如同时 emit 带 ns 的和不带 ns 的做兼容）
	* 只需要改这一处。
	*/
	emitEvent(name, payload) {
		const eventName = this.namespace ? `guardian.${this.namespace}.${name}` : `guardian.${name}`;
		this.bus.emit(eventName, payload);
	}
	/**
	* 停止 Guardian —— 清理定时器 + 清空注册表。
	*
	* ⚠️ 不 dispose 名下实例（那是 Adapter 的职责，避免双重清理）。宿主进程退出前
	* 应先让 Adapter 完成自己的清理，再 dispose Guardian。
	*/
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		if (this.idleTimer) {
			clearInterval(this.idleTimer);
			this.idleTimer = void 0;
		}
		if (this.violationTimer) {
			clearInterval(this.violationTimer);
			this.violationTimer = void 0;
		}
		this.slots.clear();
		this.samplers.clear();
		this.actions.clear();
	}
	ensureAlive() {
		if (this.disposed) throw new Error("[Guardian] instance is disposed");
	}
};
function createResourceGuardian(deps = {}) {
	return new ResourceGuardian(deps);
}
//#endregion
//#region src/main/features/extensions/registry-setup.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_dev_env_override();
require_code_cache.init_workbuddy_product_config();
require_code_cache.init_workbuddy_paths();
/**
* Extension Registry 装配层（desktop 侧）。
*
* 把 extension 的"路径解析 → registry 创建 → 扫描根挂载 → scan → activate → dispose"
* 全流程收进这里。`features/wb/` 只管 wb SDK IPC bridge 本身，不掺 extension 生命周期。
*
* ── 循环依赖打破 ──
*
* `hub` 构建时需要 `extensionRegistry`（供 `wb.extensions` namespace 消费），
* 而 `registry.activate()` 时又需要 hub services（extension 子进程要能调 wb.*）。
* 顺序必须是：
*
*   1) `setupExtensionRegistry(...)` —— 创建空 registry + addScanPath + scan
*      （scan 只读磁盘 manifest，不启子进程，此时 hub services 可以还没就绪）
*   2) `initHub({ extensionRegistry })` —— 拿 registry 构建 hub
*   3) `bindServicesAndActivate(services)` —— 回填 services，触发 activate
*      （fork extension 子进程，子进程 wb.* 调用能拿到完整 hub services）
*   4) shutdown 时调 `dispose()` 释放子进程
*
* `services` 用 factory 传给 `createExtensionRegistry`，`activate` 时才解引用，
* 保证拿到"当下最新的" services（含 extensions 自身 namespace）。
*/
var import_pidusage = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_log_acl_guard.require_pidusage());
/**
* 装配 extension registry —— 创建 + 挂扫描根 + scan（不 activate）。
*
* activate 时机由调用方通过 `bindServicesAndActivate` 显式触发，
* 因为 activate 依赖 hub services 已就绪（见文件头"循环依赖打破"注释）。
*/
function setupExtensionRegistry(deps) {
	const { bus, logger, daemonRpcInvoke } = deps;
	const guardian = createResourceGuardian({
		bus,
		namespace: "extension",
		config: {
			idleTimeoutMs: 6e5,
			poolSize: 2,
			onCapacityExceeded: ({ current, rejectedId, residentIds }) => {
				logger.warn(`[guardian] pool full (size=${current}, all resident=${residentIds.join(",")}), reject register=${rejectedId}`);
			}
		},
		logger: {
			warn: (...args) => logger.warn("[guardian]", ...args),
			error: (...args) => logger.error("[guardian]", ...args)
		}
	});
	bus.on("guardian.extension.registered", (payload) => {
		logger.info("[guardian:extension] registered", payload);
	});
	bus.on("guardian.extension.evicted", (payload) => {
		logger.warn("[guardian:extension] evicted", payload);
	});
	bus.on("guardian.extension.crashed", (payload) => {
		logger.error("[guardian:extension] crashed", payload);
	});
	bus.on("guardian.extension.capacityExceeded", (payload) => {
		logger.error("[guardian:extension] capacityExceeded", payload);
	});
	const registryHolder = { ref: void 0 };
	/** 从 Guardian instanceId（`ext:<id>`）反查当前子进程 pid。 */
	const resolveExtensionPid = (instanceId) => {
		const extId = instanceId.startsWith("ext:") ? instanceId.slice(4) : instanceId;
		return registryHolder.ref?.get(extId)?.handle?.process.pid;
	};
	guardian.registerSampler({
		resource: "memory.rss.mb",
		intervalMs: 1e3,
		sample: async (instance) => {
			const pid = resolveExtensionPid(instance.id);
			if (!pid) {
				logger.info(`[guardian:sample] mem ${instance.id}: no live pid (handle missing), skip`);
				return -1;
			}
			try {
				const mb = (await (0, import_pidusage.default)(pid)).memory / 1048576;
				logger.info(`[guardian:sample] mem ${instance.id} pid=${pid} rss=${mb.toFixed(1)}MB`);
				return mb;
			} catch (err) {
				logger.warn(`[guardian:sample] mem ${instance.id} pid=${pid} failed: ${err instanceof Error ? err.message : String(err)}`);
				return -1;
			}
		}
	});
	let latestMethodChannel;
	const permissions = new require_log_acl_guard.PermissionRegistry();
	const authorizer = require_log_acl_guard.createBridgeAuthorizer(permissions.toProvider());
	const registry = createExtensionRegistry({
		methodChannel: () => {
			if (!latestMethodChannel) throw new Error("[ExtensionRegistry] methodChannel 未 bind —— 必须先 `bindMethodChannel(mc)` 才能激活 extension");
			return latestMethodChannel;
		},
		bus,
		authorizer,
		guardian,
		guardianBudgets: (ext) => {
			if (ext.distribution.resident === true) return [];
			return [{
				resource: "memory.rss.mb",
				expected: 50,
				hardLimit: 200,
				graceMs: 3e3,
				onViolation: "evict"
			}, {
				resource: "cpu.percent",
				expected: 5,
				hardLimit: 50,
				graceMs: 3e3,
				onViolation: "evict"
			}];
		},
		logger,
		daemonRpcInvoke,
		extraNodePaths: [node_path.resolve(__dirname, "..", "..", "node_modules")]
	});
	registryHolder.ref = registry;
	const scanRoots = require_log_acl_guard.resolveExtensionsScanRoots();
	logger.info("[ext-scan] candidate scan roots (priority high→low):");
	for (const root of scanRoots) {
		const exists = (0, node_fs.existsSync)(root);
		logger.info(`[ext-scan]   ${exists ? "✓" : "✗"} ${root}`);
		if (exists) registry.addScanPath(root);
	}
	registry.scan();
	logger.info(`[ext-scan] after scan(), extensions count=${registry.list().length}`);
	for (const ext of registry.list()) logger.info(`[ext-scan]   - ${ext.manifest.id} @ ${ext.basePath}`);
	const PLATFORM_BASELINE_PERMISSIONS = ["bus.emit", "bus.on"];
	const registerExtensionPermissions = (ext) => {
		const kind = ext.distribution.kind === "builtin" ? "builtin" : "platform";
		const perms = kind === "builtin" ? [...ext.distribution.grantedPermissions ?? []] : [...PLATFORM_BASELINE_PERMISSIONS, ...ext.distribution.grantedPermissions ?? []];
		try {
			permissions.registerSubject({
				moduleId: ext.manifest.id,
				type: "extension",
				kind,
				permissions: perms
			});
			logger.info(`[ext-perm] registered ${ext.manifest.id} kind=${kind} perms=[${perms.join(",")}]`);
		} catch (err) {
			logger.error(`[ext-perm] register ${ext.manifest.id} failed:`, err instanceof Error ? err.message : String(err));
		}
	};
	for (const ext of registry.list()) if (ext.enabled) registerExtensionPermissions(ext);
	const releasePermissionSync = bus.on("extension.lifecycle", (payload) => {
		if (typeof payload?.extensionId !== "string") return;
		permissions.unregisterSubject("extension", payload.extensionId);
		const ext = registry.get(payload.extensionId);
		if (ext?.enabled) registerExtensionPermissions(ext);
	});
	return {
		registry,
		guardian,
		authorizer,
		permissionRegistry: permissions,
		bindMethodChannel(methodChannel) {
			latestMethodChannel = methodChannel;
		},
		async activateByEvent(event) {
			try {
				await registry.activateByEvent(event);
			} catch (err) {
				logger.error(`[ExtensionRegistry] activateByEvent('${event}') failed:`, err);
			}
		},
		dispose() {
			releasePermissionSync();
			registry.dispose();
			guardian.dispose();
		}
	};
}
//#endregion
//#region src/main/features/wb/sidebar-list-snapshot.ts
/**
* 侧栏 Local 列表磁盘快照（秒开 · DR-4 / DR-8）。
*
* 背景：现有「秒开」= daemon prefetch 进 CompositeConversations **内存**快照，renderer 来拿 0ms。
* 但 daemon 冷启动第一帧（app 重启 / renderer reload 后 daemon 尚未 prefetch 完）仍靠骨架兜底。
* 本模块把 Local 列表轻量快照落盘，供下次冷启动首帧打底，随后被真实 prefetch / poller 覆盖。
*
* 关键约束（DR-8，落地在调用方 register-wb-bridge-channels）：
* - seed 仅供 renderer 首帧 setResult 打底并标 stale，**不 emit ListChange、不占 traceId、不 resolve
*   firstLocalListReady 门**——否则 stale 数据会假开门 / 覆盖新鲜快照。
* - 只做 Local（cloud 有网络权威源，落盘与「Local 稳定优先」冲突）。
* - **按 uid 分片**：prefetch 依赖 currentUid，不分片切账号会串号。
* - 读写全程 try-catch 不阻断主流程；partial 快照不落盘。
*
* 本模块只做纯 fs + JSON 序列化，不感知 CompositeConversations / IPC；调用方负责触发时机与仲裁。
*/
/** 快照文件当前版本；结构不兼容时递增，读到旧版本直接忽略（当作 miss）。 */
var SNAPSHOT_VERSION = 1;
var SNAPSHOT_FILE_NAME = "sidebar-list-snapshot.json";
/**
* 冷启动 seed 事件名（daemon → renderer 一次性 push，DR-8）。
* 走 WB_BRIDGE_EVENT_CHANNEL('wb:event') 通用 bus，renderer 侧 `wb.on(WB_SIDEBAR_SEED_EVENT, ...)` 消费。
* 与 ListChange 分离：不占 traceId、不 resolve firstLocalListReady 门、不进 settle。
* renderer 侧用同名字符串常量（agent-ui 不能 import desktop 模块，事件名是纯字符串契约）。
*/
var WB_SIDEBAR_SEED_EVENT = "wb:sidebar:seed";
/** 未知来源的列表项 → 轻量快照项。只挑白名单字段，避免把重字段/循环引用写进 JSON。 */
function toSnapshotItem(raw) {
	const id = typeof raw.id === "string" ? raw.id : void 0;
	if (!id) return;
	const space = raw.space && typeof raw.space === "object" ? raw.space : void 0;
	return {
		id,
		title: typeof raw.title === "string" ? raw.title : "",
		state: typeof raw.state === "string" ? raw.state : "idle",
		transport: typeof raw.transport === "string" ? raw.transport : "local",
		kind: typeof raw.kind === "string" ? raw.kind : "task",
		lastActivityAt: typeof raw.lastActivityAt === "number" ? raw.lastActivityAt : 0,
		isPinned: raw.isPinned === true,
		cwd: typeof raw.cwd === "string" ? raw.cwd : void 0,
		projectId: typeof raw.projectId === "string" ? raw.projectId : void 0,
		isPlayground: typeof raw.isPlayground === "boolean" ? raw.isPlayground : void 0,
		conversationOrigin: typeof raw.conversationOrigin === "string" ? raw.conversationOrigin : void 0,
		updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : void 0,
		isUserDefinedTitle: typeof raw.isUserDefinedTitle === "number" ? raw.isUserDefinedTitle : void 0,
		space: space && typeof space.type === "string" && typeof space.name === "string" ? {
			type: space.type,
			name: space.name
		} : void 0
	};
}
/** 快照文件路径：`<configDir>/<uid>/sidebar-list-snapshot.json`。uid 分片防切账号串号。 */
function snapshotPathFor(configDir, uid) {
	return (0, node_path.join)(configDir, uid, SNAPSHOT_FILE_NAME);
}
/**
* 落盘 Local 列表快照。仅在有有效 uid + 非空 configDir 时写；写失败静默（try-catch），不阻断主流程。
*
* @returns 是否成功写盘（供调用方打点，可忽略）。
*/
function writeSidebarListSnapshot(configDir, uid, rawItems) {
	if (!configDir || !uid) return false;
	try {
		const items = rawItems.map(toSnapshotItem).filter((item) => item !== void 0);
		const snapshot = {
			version: SNAPSHOT_VERSION,
			savedAt: Date.now(),
			items
		};
		const dir = (0, node_path.join)(configDir, uid);
		(0, node_fs.mkdirSync)(dir, { recursive: true });
		(0, node_fs.writeFileSync)(snapshotPathFor(configDir, uid), JSON.stringify(snapshot), "utf-8");
		return true;
	} catch {
		return false;
	}
}
/**
* 读取 Local 列表快照（当前 uid 分片）。文件不存在 / 解析失败 / 版本不符 → 返回 undefined（当作 miss）。
* 读失败静默，绝不抛出（冷启动路径不能被 seed 读盘拖垮）。
*/
function readSidebarListSnapshot(configDir, uid) {
	if (!configDir || !uid) return;
	try {
		const content = (0, node_fs.readFileSync)(snapshotPathFor(configDir, uid), "utf-8");
		const parsed = JSON.parse(content);
		if (parsed.version !== SNAPSHOT_VERSION || !Array.isArray(parsed.items)) return;
		return {
			version: SNAPSHOT_VERSION,
			savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : 0,
			items: parsed.items
		};
	} catch {
		return;
	}
}
//#endregion
//#region src/main/features/wb/register-wb-bridge-channels.ts
/**
* WB SDK Bridge channel 注册（daemon 子进程侧）。
*
* domain 构建逻辑直接调 `initHub`（hub 在 workbuddy-server），
* 差异仅在 transport：daemon 用 DaemonServer.handle + DaemonServer.push。
*
* 好处：bridge 跑在 daemon 子进程 → 不占 main 进程 event loop；
* domain repo 的 HTTP 请求、磁盘 IO 全在子进程完成。
*
* 时序：在 onRpcReady 回调中调用——此时 CellJS 已就绪，celljs deps 可直接用。
*
* Extension 装配顺序（避免循环依赖，详见 `features/extensions/registry-setup.ts`）：
* 1. `setupExtensionRegistry(...)` —— 创建 registry + scan（只登记，不激活）
* 2. `initHub({ extensionRegistry })` —— hub 里 `wb.extensions` namespace 读 registry
* 3. `extSetup.bindServices(services)` —— 回填 services（供后续激活时 fork 子进程消费）
* 4. 注册 `extensions:activateByEvent` channel —— main 进程在合适时机（主窗口 ready 等）
*    通过此 RPC 喊事件字符串，daemon 转 `registry.activateByEvent(event)` 做激活
*/
var _wbBridgeLogger;
function wbBridgeLogger() {
	if (!_wbBridgeLogger) _wbBridgeLogger = require_code_cache.createWorkbuddyScopedLogger("WBBridge");
	return _wbBridgeLogger;
}
/**
* 把 `wb.conversations.delete()` 接到 daemon 既有的 `session:delete` RPC 上。
*
* 该 RPC 才是本地会话删除的完整链路——删除前 dirty 文档确认、运行态拆除、
* `session:deleted` 广播都挂在上面；SDK 自带的 sqlite 软删除只覆盖其中一步。
* 走 `invokeLocal` 是为了与 renderer 老路径（daemonClient.deleteSession）共用同一
* handler，避免两条删除语义漂移。
*/
async function deleteSessionViaDaemonRpc(server, sessionId) {
	return (await server.invokeLocal(require_contract.SESSION_RPC_CHANNELS.DELETE, sessionId))?.status === "cancelled" ? "cancelled" : "deleted";
}
/**
* 在 daemon 子进程中构建 WB SDK bridge，把所有 wb:* channel 注册到 DaemonServer。
*
* @param server daemon 的 DaemonServer 实例
* @param deps 依赖项（CellJS deps + desktopHost bridge + intentRecognition + optional runtime facts）
* @returns 句柄，供 daemon shutdown 钩子释放 poller/scheduler 与 hub 资源
*/
function registerWBBridgeChannels(server, deps) {
	const { celljs, desktopHost, intentRecognition, conversationRuntimeFacts, idleCapabilityFacadeProvider, runtimeConfigDir, measurementSink } = deps;
	try {
		require_server.attachSkillsVersionEmitter(server, { configDir: require_code_cache.getWorkbuddyConfigDir() });
	} catch (err) {
		wbBridgeLogger().warn("[skills-version-emitter] attach failed; renderer 会退回 TTL 兜底路径:", err instanceof Error ? err.message : String(err));
	}
	const extSetup = setupExtensionRegistry({
		bus: require_conversations.getBus(),
		logger: wbBridgeLogger(),
		daemonRpcInvoke: (channel, ...args) => server.invokeLocal(channel, ...args)
	});
	for (const [appId, windowApp] of Object.entries(require_log_acl_guard.builtinWindowApps)) try {
		extSetup.permissionRegistry.registerSubject({
			moduleId: appId,
			type: "window",
			kind: "builtin",
			permissions: [...windowApp.permissions]
		});
	} catch (err) {
		wbBridgeLogger().error(`[wb-perm] failed to register window subject "${appId}":`, err instanceof Error ? err.message : String(err));
	}
	const initialSession = celljs.authenticationManager?.currentSessionSubject?.getValue?.();
	const hubStorage = require_server.createHubStorage({
		homeDir: require_code_cache.getWorkbuddyConfigDir(),
		initialUid: initialSession?.account?.uid,
		initialEnterpriseId: initialSession?.account?.enterpriseId
	});
	celljs.authenticationManager?.currentSessionSubject?.subscribe?.(async (session) => {
		const account = session?.account;
		const uid = account?.uid;
		if (!uid) return;
		try {
			await hubStorage.bindUser(uid, account?.enterpriseId);
		} catch (error) {
			wbBridgeLogger().error("[Storage] bindUser failed:", error instanceof Error ? error.message : String(error));
		}
	});
	const { hub, disposeAll: disposeHub } = require_server.initHub({
		celljs,
		homeDir: require_code_cache.getWorkbuddyConfigDir(),
		hubStorage,
		resolveBundledAsset: require_code_cache.requireBundledAsset,
		legacyRpcInvoke: (channel, ...args) => server.invokeLocal(channel, ...args),
		appRoot: require_code_cache.getAssetsRoot(),
		resolveSystemHome: () => (0, node_os.homedir)(),
		intentRecognition,
		resolveSavePath: async (defaultPath) => {
			const result = await desktopHost.dialog.showSaveDialog({
				defaultPath,
				title: "保存文件"
			});
			return result.canceled ? null : result.filePath ?? null;
		},
		clientToolDispatcher: desktopHost.clientTools ? { execute: (request) => desktopHost.clientTools.execute(request) } : void 0,
		conversationRuntimeFacts,
		idleCapabilityFacadeProvider,
		runtimeConfigDir,
		deleteSessionHost: (sessionId) => deleteSessionViaDaemonRpc(server, sessionId),
		extensionRegistry: extSetup.registry,
		measurementSink
	});
	const requestUpdateSubscriptions = /* @__PURE__ */ new Set();
	const conversationEventScheduler = new require_conversations.ConversationEventPushScheduler({
		push: (event, payload) => server.push(require_log_acl_guard.WB_BRIDGE_EVENT_CHANNEL, {
			event,
			payload
		}),
		shouldPublishRequestUpdate: (conversationId) => requestUpdateSubscriptions.has(conversationId) || requestUpdateSubscriptions.has("*"),
		report: (metrics) => {
			wbBridgeLogger().info("Conversation event push summary", metrics);
		}
	});
	require_conversations.getBus().onAny((event, payload) => {
		conversationEventScheduler.publish(event, payload);
	});
	const storageContextualHandlers = require_server.createStorageContextualHandlers(hubStorage);
	const pathsContextualHandlers = require_server.createPathsContextualHandlers({
		userDataDir: require_code_cache.getWorkbuddyConfigDir(),
		appRoot: require_code_cache.getAssetsRoot(),
		resolveBundledAsset: require_code_cache.requireBundledAsset,
		resolveSystemHome: () => (0, node_os.homedir)()
	});
	const methodChannel = createMethodChannel(hub, {
		contextualHandlers: new Map([...storageContextualHandlers, ...pathsContextualHandlers]),
		authorizer: extSetup.authorizer
	});
	const MC_LOG_SILENT_SUFFIXES = [
		":ping",
		":heartbeat",
		":health",
		":status"
	];
	const MC_LOG_SILENT_EXACT = /* @__PURE__ */ new Set([
		"ping",
		"heartbeat",
		"health",
		"conversations:snapshot"
	]);
	function isSilentMcChannel(name) {
		if (MC_LOG_SILENT_EXACT.has(name)) return true;
		for (const s of MC_LOG_SILENT_SUFFIXES) if (name.endsWith(s)) return true;
		return false;
	}
	const MC_SLOW_MS = 500;
	const MC_VERY_SLOW_MS = 5e3;
	let mcSeq = 0;
	async function invokeMethodChannel(channel, invokeContext, args) {
		const chName = typeof channel === "string" ? channel : String(channel);
		const silent = isSilentMcChannel(chName);
		const seq = ++mcSeq;
		const start = Date.now();
		const firstArg = args[0];
		const argHint = summarizeMcArg(firstArg);
		if (!silent) wbBridgeLogger().info(`[MethodCh] begin #${seq} ${chName} arg=${argHint}`);
		try {
			const result = await methodChannel.invoke(chName, invokeContext, ...args);
			const elapsedMs = Date.now() - start;
			if (elapsedMs >= MC_VERY_SLOW_MS) wbBridgeLogger().warn(`[MethodCh] end #${seq} ${chName} elapsedMs=${elapsedMs} VERY_SLOW arg=${argHint}`);
			else if (elapsedMs >= MC_SLOW_MS) wbBridgeLogger().warn(`[MethodCh] end #${seq} ${chName} elapsedMs=${elapsedMs} SLOW arg=${argHint}`);
			else if (!silent) wbBridgeLogger().info(`[MethodCh] end #${seq} ${chName} elapsedMs=${elapsedMs}`);
			return result;
		} catch (error) {
			const elapsedMs = Date.now() - start;
			const msg = error instanceof Error ? error.message : String(error);
			wbBridgeLogger().error(`[MethodCh] error #${seq} ${chName} elapsedMs=${elapsedMs} error=${msg} arg=${argHint}`);
			throw error;
		}
	}
	function summarizeMcArg(arg) {
		if (arg === void 0) return "undefined";
		if (arg === null) return "null";
		if (typeof arg === "string") return arg.length <= 64 ? JSON.stringify(arg) : `<str:${arg.length}>`;
		if (typeof arg === "number" || typeof arg === "boolean") return String(arg);
		if (typeof arg !== "object") return `<${typeof arg}>`;
		const src = arg;
		const picked = {};
		for (const k of [
			"sessionId",
			"conversationId",
			"requestId",
			"projectId",
			"expertTeamId",
			"cwd",
			"limit",
			"offset"
		]) if (src[k] !== void 0) picked[k] = src[k];
		if (Array.isArray(arg)) return `<arr:${arg.length}>`;
		try {
			return JSON.stringify(picked);
		} catch {
			return "<obj>";
		}
	}
	const methods = methodChannel.methods();
	for (const channel of methods) server.handle(channel, (invokeContext, ...args) => invokeMethodChannel(channel, invokeContext, args));
	server.handle("wb:invoke", (channel, invokeContext, ...args) => invokeMethodChannel(channel, invokeContext, args));
	console.log(`[WB-SDK:Daemon] method channel registered, ${methods.length} methods`);
	extSetup.bindMethodChannel(methodChannel);
	server.handle(require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL, async (event) => {
		try {
			(0, node_fs.appendFileSync)("/tmp/wb-ext-debug.log", `${(/* @__PURE__ */ new Date()).toISOString()} [wb-bridge] ${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL} received: event=${JSON.stringify(event)} typeof=${typeof event}\n`);
		} catch {}
		if (typeof event !== "string" || event.length === 0) {
			wbBridgeLogger().warn(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] invalid event payload: ${JSON.stringify(event)}`);
			throw new Error(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] event must be a non-empty string`);
		}
		const activateStartedAt = Date.now();
		wbBridgeLogger().info(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] dispatch: ${event}`);
		try {
			await extSetup.activateByEvent(event);
			const elapsedMs = Date.now() - activateStartedAt;
			if (elapsedMs >= 3e3) wbBridgeLogger().warn(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] dispatch SLOW event=${event} elapsedMs=${elapsedMs}`);
			else wbBridgeLogger().info(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] dispatch done: ${event} elapsedMs=${elapsedMs}`);
		} catch (error) {
			const elapsedMs = Date.now() - activateStartedAt;
			wbBridgeLogger().error(`[${require_log_acl_guard.EXTENSION_ACTIVATE_BY_EVENT_CHANNEL}] dispatch FAILED event=${event} elapsedMs=${elapsedMs} error=${error instanceof Error ? error.message : String(error)}`);
			throw error;
		}
	});
	const conversationsSvc = hub.conversations;
	const getCurrentConversationsSvc = () => hub.conversations;
	server.handle(require_conversations.WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, async (value) => {
		if (!value || typeof value !== "object") throw new Error("invalid conversation event subscription");
		const subscription = value;
		if (subscription.event === "current") {
			if (!Array.isArray(subscription.currentConversationIds) || !subscription.currentConversationIds.every((id) => typeof id === "string")) throw new Error("invalid conversation event subscription");
			conversationEventScheduler.setCurrentConversationIds(subscription.currentConversationIds);
			await hub.conversations._setCurrentConversationIds(subscription.currentConversationIds);
			return;
		}
		if (subscription.event === "listChanged") {
			if (typeof subscription.active !== "boolean") throw new Error("invalid conversation event subscription");
			return;
		}
		if (subscription.event !== "requestUpdate" || !Array.isArray(subscription.activeConversationIds) || !subscription.activeConversationIds.every((id) => typeof id === "string")) throw new Error("invalid conversation event subscription");
		const next = new Set(subscription.activeConversationIds);
		conversationEventScheduler.discardInactive((conversationId) => next.has("*") || next.has(conversationId));
		requestUpdateSubscriptions.clear();
		for (const conversationId of next) requestUpdateSubscriptions.add(conversationId);
	});
	server.handle(WB_EXTENSION_REQUEST_RECEIVE_STREAMING_CHANNEL, (value) => {
		if (!value || typeof value !== "object") throw new Error("invalid extension-request-receive-streaming payload");
		const { extensionId, conversationId } = value;
		if (typeof extensionId !== "string" || !extensionId || typeof conversationId !== "string" || !conversationId) throw new Error("invalid extension-request-receive-streaming payload: extensionId and conversationId must be non-empty strings (extensionId is expected to be host-signed by extension bridge-host)");
		requestExtensionReceiveStreaming({
			extensionId,
			conversationId
		});
	});
	server.handle(WB_EXTENSION_CANCEL_RECEIVE_STREAMING_CHANNEL, (value) => {
		if (!value || typeof value !== "object") throw new Error("invalid extension-cancel-receive-streaming payload");
		const { extensionId } = value;
		if (typeof extensionId !== "string" || !extensionId) throw new Error("invalid extension-cancel-receive-streaming payload: extensionId must be non-empty string (extensionId is expected to be host-signed by extension bridge-host)");
		cancelExtensionReceiveStreaming({ extensionId });
	});
	let resolveFirstLocalList;
	let firstLocalListResolved = false;
	let unsubscribeFirstLocalList;
	const firstLocalListReady = new Promise((resolve) => {
		resolveFirstLocalList = () => {
			if (firstLocalListResolved) return;
			firstLocalListResolved = true;
			unsubscribeFirstLocalList?.();
			unsubscribeFirstLocalList = void 0;
			resolve();
		};
	});
	let resolveFirstLocalListRendered;
	let firstLocalListRenderedResolved = false;
	const firstLocalListRendered = new Promise((resolve) => {
		resolveFirstLocalListRendered = () => {
			if (firstLocalListRenderedResolved) return;
			firstLocalListRenderedResolved = true;
			resolve();
		};
	});
	unsubscribeFirstLocalList = conversationsSvc.on(require_conversations.ConversationsEvent.ListChange, (space) => {
		if (space !== "local") return;
		resolveFirstLocalList?.();
	});
	const readCurrentUid = () => (celljs.authenticationManager.currentSessionSubject?.getValue?.())?.account?.uid;
	const unsubscribeSnapshotWriter = conversationsSvc.on(require_conversations.ConversationsEvent.ListChange, (space, list) => {
		if (space !== "local" || list?.partial === true) return;
		const uid = readCurrentUid();
		if (!uid) return;
		writeSidebarListSnapshot(require_code_cache.getWorkbuddyConfigDir(), uid, list?.items ?? []);
	});
	server.handle(require_log_acl_guard.DAEMON_FIRST_LOCAL_LIST_RENDERED_CHANNEL, async () => {
		resolveFirstLocalListRendered?.();
		resolveFirstLocalList?.();
		return { ok: true };
	});
	const runFirstLocalListShortCircuit = async () => {
		const pickSessionRestored = async () => {
			const direct = celljs.authenticationManager?.sessionRestored;
			if (direct) return { promise: direct };
			await new Promise((resolveMacro) => setImmediate(resolveMacro));
			const retry = celljs.authenticationManager?.sessionRestored;
			return retry ? { promise: retry } : {};
		};
		try {
			const { promise: sessionRestoredPromise } = await pickSessionRestored();
			if (sessionRestoredPromise) await sessionRestoredPromise;
			else wbBridgeLogger().warn("[FirstScreen] authenticationManager.sessionRestored missing after setImmediate retry; proceed with best-effort uid probe");
		} catch (err) {
			wbBridgeLogger().warn("[FirstScreen] authenticationManager.sessionRestored rejected; proceed with best-effort uid probe", err);
		}
		if (firstLocalListResolved) return;
		const authenticationManager = celljs.authenticationManager;
		const initializationError = authenticationManager?.initializationError;
		const currentUid = authenticationManager?.currentSessionSubject?.getValue?.()?.account?.uid;
		if (initializationError) {
			wbBridgeLogger().warn(`[FirstScreen] [WB-SDK:Daemon] firstLocalListReady short-circuit resolved (reason=auth-error; initialized() rejected/threw: ${String(initializationError.message ?? initializationError)}; skip prefetch + skip 3s wait)`);
			resolveFirstLocalList?.();
			return;
		}
		if (!currentUid) {
			wbBridgeLogger().info("[FirstScreen] [WB-SDK:Daemon] firstLocalListReady short-circuit resolved (reason=unauth; auth initialized but no uid; skip 3s wait)");
			resolveFirstLocalList?.();
			return;
		}
		let hasLocalSession = true;
		const probeStartedAt = Date.now();
		try {
			const database = celljs.database;
			if (typeof database?.hasAnySession === "function") hasLocalSession = database.hasAnySession(currentUid, { includeDeleted: false });
		} catch (err) {
			wbBridgeLogger().warn("[FirstScreen] hasLocalSession probe failed (assume has local, keep original prefetch path)", err);
		}
		const probeElapsedMs = Date.now() - probeStartedAt;
		if (!hasLocalSession) {
			wbBridgeLogger().info(`[FirstScreen] [WB-SDK:Daemon] firstLocalListReady short-circuit resolved (reason=empty-local uid=${currentUid} probeMs=${probeElapsedMs}; skip prefetch + skip 3s wait)`);
			resolveFirstLocalList?.();
		} else {
			wbBridgeLogger().info(`[FirstScreen] [WB-SDK:Daemon] hasLocalSession=true (uid=${currentUid} probeMs=${probeElapsedMs}) → run prefetch, expect ListChange to open gate`);
			conversationsSvc.ensureList("local", {
				page: 1,
				size: 1e5,
				view: "active"
			}).catch((err) => {
				wbBridgeLogger().warn("[WB-SDK:Daemon] prefetch local conversation list failed (non-blocking)", err);
			});
		}
	};
	runFirstLocalListShortCircuit().catch((err) => {
		wbBridgeLogger().warn("[FirstScreen] firstLocalListReady short-circuit task threw", err);
	});
	const seedUid = readCurrentUid();
	if (seedUid) try {
		const seed = readSidebarListSnapshot(require_code_cache.getWorkbuddyConfigDir(), seedUid);
		if (seed && seed.items.length > 0) server.push(require_log_acl_guard.WB_BRIDGE_EVENT_CHANNEL, {
			event: WB_SIDEBAR_SEED_EVENT,
			payload: {
				space: "local",
				items: seed.items,
				savedAt: seed.savedAt
			}
		});
	} catch (err) {
		wbBridgeLogger().warn("[WB-SDK:Daemon] push sidebar seed failed (non-blocking)", err);
	}
	return {
		firstLocalListReady,
		firstLocalListRendered,
		_resetAll: (reason) => getCurrentConversationsSvc()._resetAll(reason),
		dispose: async () => {
			unsubscribeSnapshotWriter();
			resolveFirstLocalList?.();
			resolveFirstLocalListRendered?.();
			conversationEventScheduler.dispose();
			extSetup.dispose();
			try {
				await disposeHub();
			} finally {
				await hubStorage.flush();
			}
		}
	};
}
//#endregion
//#region src/main/features/workflows/migration/file-localstorage-migration-service.ts
var FileBackedLegacyLocalStorageMigrationService = class {
	resultPath;
	constructor(resultPath) {
		this.resultPath = resultPath;
	}
	async migrate() {
		if (!this.resultPath) return createSkippedLocalStorageResult("legacy_localstorage_result_path_missing");
		let raw;
		try {
			raw = node_fs.readFileSync(this.resultPath, "utf8");
		} catch (error) {
			return createSkippedLocalStorageResult(`legacy_localstorage_result_read_failed: ${formatError(error)}`);
		}
		try {
			return normalizeLocalStorageResult(JSON.parse(raw));
		} catch (error) {
			return createSkippedLocalStorageResult(`legacy_localstorage_result_parse_failed: ${formatError(error)}`);
		}
	}
};
function normalizeLocalStorageResult(value) {
	if (!value || typeof value !== "object") return createSkippedLocalStorageResult("legacy_localstorage_result_invalid");
	const record = value;
	const entries = isStringRecord(record.entries) ? record.entries : {};
	const sourceSessionPath = typeof record.sourceSessionPath === "string" ? record.sourceSessionPath : "";
	const currentSessionPath = typeof record.currentSessionPath === "string" ? record.currentSessionPath : "";
	const skipped = record.skipped === true;
	const reason = typeof record.reason === "string" ? record.reason : void 0;
	if (skipped) return {
		sourceSessionPath,
		currentSessionPath,
		skipped: true,
		reason,
		entries
	};
	return {
		sourceSessionPath,
		currentSessionPath,
		skipped: false,
		entries
	};
}
function createSkippedLocalStorageResult(reason) {
	return {
		sourceSessionPath: "",
		currentSessionPath: "",
		skipped: true,
		reason,
		entries: {}
	};
}
function isStringRecord(value) {
	if (!value || typeof value !== "object") return false;
	return Object.values(value).every((entry) => typeof entry === "string");
}
function formatError(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../../packages/workbuddy-server/src/hub/conversation-runtime-admission.ts
function createConversationRuntimeAdmissionFactory(deps) {
	return (ctx) => ({
		get launchArgs() {
			const base = ["--session-id", ctx.conversationId];
			const disallowed = deps.getDisallowedTools?.(ctx.conversationId) ?? [];
			return disallowed.length > 0 ? [
				...base,
				"--disallowedTools",
				...disallowed
			] : base;
		},
		onInitialize() {},
		async prepareSessionRequest({ params }) {
			return { params };
		},
		dispose: () => void 0
	});
}
//#endregion
//#region src/main/daemon/app-server/conversation-runtime-admission.ts
function createDaemonConversationRuntimeAdmission(deps) {
	return createConversationRuntimeAdmissionFactory({
		getAuthSession: () => deps.celljs.authenticationManager.currentSessionSubject.getValue(),
		getProductConfig: () => {
			const configuration = require_code_cache.tryGetWorkbuddyBaseProductConfiguration() ?? deps.celljs.productManager.getCurrentConfiguration?.();
			const endpoint = configuration?.endpoint || deps.celljs.productManager.getEndpoint();
			return endpoint ? {
				...configuration,
				endpoint
			} : void 0;
		},
		getConfigDir: () => deps.configDir
	});
}
//#endregion
//#region src/main/daemon/app-server/conversation-runtime-warm-cache.ts
require_code_cache.init_workbuddy_paths();
function createDaemonConversationRuntimeWarmCache(deps) {
	const { celljs } = deps;
	const resolveLocalHistoryConfigDir = () => require_code_cache.getWorkbuddyConfigDir();
	const cache = new ConversationRuntimeWarmCache({
		configDir: require_code_cache.getWorkbuddyConfigDir(),
		getCurrentOwnerKey: () => require_server.getHostedCliSessionOwnerKey(celljs.authenticationManager.currentSessionSubject.getValue()),
		resolveAccountFacts: async () => ({ qimei36: await deps.resolveQimei36() }),
		loadConnectorTokenEnv: () => celljs.connectorService?.getSkillOnlyTokenEnv() ?? {},
		loadProjectMcpServersBySession: () => require_daemon_bootstrap.projectResourceManager.getMcpServersSnapshotBySession(),
		logger: deps.logger
	});
	const refreshCurrentOwner = async () => {
		cache.clear();
		const ownerKey = require_server.getHostedCliSessionOwnerKey(celljs.authenticationManager.currentSessionSubject.getValue());
		if (ownerKey) await cache.warm(ownerKey);
	};
	return {
		cache,
		refreshCurrentOwner,
		resolveLocalHistoryConfigDir
	};
}
//#endregion
//#region src/main/daemon/app-server/desktop-host-bridge.ts
function createAppServerDesktopHostBridge({ parent, events, appName, appVersion, appLocale, appConfigDir, isPackaged }) {
	return {
		...require_daemon_bootstrap.NOOP_DESKTOP_HOST,
		app: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.app,
			getName: () => appName || require_daemon_bootstrap.NOOP_DESKTOP_HOST.app.getName(),
			getVersion: () => appVersion || require_daemon_bootstrap.NOOP_DESKTOP_HOST.app.getVersion(),
			getLocale: () => appLocale || require_daemon_bootstrap.NOOP_DESKTOP_HOST.app.getLocale(),
			getConfigDir: () => appConfigDir || require_daemon_bootstrap.NOOP_DESKTOP_HOST.app.getConfigDir(),
			isPackaged: () => isPackaged === true,
			getAutoLaunchEnabled: async () => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.GET_AUTO_LAUNCH_ENABLED);
				if (typeof result !== "boolean") throw new Error("desktopHost:getAutoLaunchEnabled must return a boolean");
				return result;
			},
			setAutoLaunchEnabled: async (enabled) => {
				await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SET_AUTO_LAUNCH_ENABLED, { enabled });
			}
		},
		dialog: createBridgeDialog(parent),
		shell: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.shell,
			openExternal: async (url) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_EXTERNAL, url);
				const opened = result === false ? false : true;
				console.log(`[DesktopHostBridge] openExternal RPC result=${String(result)} -> opened=${opened} for: ${url}`);
				return opened;
			},
			openPath: async (filePath) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_PATH, filePath);
				return typeof result === "string" ? result : "";
			},
			showItemInFolder: async (filePath) => {
				await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_ITEM_IN_FOLDER, filePath);
			}
		},
		network: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.network,
			fetch: async (url, init) => fetch(url, init),
			getDefaultSession: () => createBridgeSession(parent, "default"),
			getSessionPartition: (partition) => createBridgeSession(parent, partitionToScope(partition)),
			clearDefaultSessionCookiesForDomains: async (domains) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.CLEAR_DEFAULT_SESSION_COOKIES_FOR_DOMAINS, { domains });
				return typeof result === "number" ? result : 0;
			},
			clearLexiangPartitionCookiesForDomains: async (domains) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.CLEAR_LEXIANG_PARTITION_COOKIES_FOR_DOMAINS, { domains });
				return typeof result === "number" ? result : 0;
			},
			resolveProxy: async (targetUrl) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.RESOLVE_PROXY, { targetUrl });
				return typeof result === "string" ? result : "DIRECT";
			},
			applyProxySettings: async (settings) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.APPLY_PROXY_SETTINGS, { settings });
				if (result && typeof result === "object" && "HTTP_PROXY" in result && "HTTPS_PROXY" in result && "NO_PROXY" in result) return result;
				return {
					HTTP_PROXY: "",
					HTTPS_PROXY: "",
					NO_PROXY: ""
				};
			}
		},
		auth: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.auth,
			decryptLegacyAuthSession: async (encryptedBase64) => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.DECRYPT_LEGACY_AUTH_SESSION, { encryptedBase64 });
				return typeof result === "string" ? result : void 0;
			},
			getTuringDeviceToken: async () => {
				const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.GET_TURING_DEVICE_TOKEN);
				if (typeof result === "string") return result.trim() ? { token: result.trim() } : {};
				if (!result || typeof result !== "object") return {};
				const risk = result;
				if (typeof risk.token === "string" && risk.token.trim()) return { token: risk.token.trim() };
				if (typeof risk.error === "string" && risk.error.trim()) return { error: risk.error.trim() };
				return {};
			}
		},
		permissions: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.permissions,
			getMicrophonePermissionStatus: () => "unknown",
			getMicrophonePermission: async () => readMicrophonePermission(await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MICROPHONE_PERMISSION)),
			requestMicrophonePermission: async () => readMicrophonePermission(await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.REQUEST_MICROPHONE_PERMISSION)),
			openMicrophoneSystemSettings: async () => {
				await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_MICROPHONE_PERMISSION_SETTINGS);
			}
		},
		clientTools: { execute: (request) => parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.CLIENT_TOOL_EXECUTE, request) },
		window: {
			...require_daemon_bootstrap.NOOP_DESKTOP_HOST.window,
			send(channel, data) {
				events.push(channel, data);
				return true;
			},
			getColorScheme: async () => {
				try {
					const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.GET_COLOR_SCHEME);
					return result === "dark" || result === "light" ? result : void 0;
				} catch {
					return;
				}
			}
		},
		showTaskCompletedNotification(payload) {
			events.push(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_EVENT_CHANNELS.TASK_COMPLETED_NOTIFICATION, payload);
			return true;
		},
		showTaskPendingNotification(payload) {
			events.push(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_EVENT_CHANNELS.TASK_PENDING_NOTIFICATION, payload);
			return true;
		}
	};
}
function createBridgeSession(parent, scope) {
	return { cookies: {
		async set(details) {
			await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_SET, {
				scope,
				details
			});
		},
		async get(filter) {
			const result = await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_GET, {
				scope,
				filter
			});
			return Array.isArray(result) ? result : [];
		},
		async remove(url, name) {
			await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_REMOVE, {
				scope,
				url,
				name
			});
		}
	} };
}
function readMicrophonePermission(value) {
	switch (value) {
		case "not-determined":
		case "granted":
		case "denied":
		case "restricted":
		case "unknown": return value;
		default: return "unknown";
	}
}
function partitionToScope(partition) {
	if (partition === "persist:tdoc-import") return "tdoc-import";
	if (partition === "persist:tdoc-preview") return "tdoc-preview";
	throw new Error(`Unsupported app-server desktop host partition: ${partition}`);
}
function createBridgeDialog(parent) {
	return {
		async showOpenDialog(options, owner) {
			const params = {
				title: options.title,
				defaultPath: options.defaultPath,
				filters: options.filters,
				properties: options.properties,
				owner
			};
			return readOpenDialogResult(await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_OPEN_DIALOG, params));
		},
		async showSaveDialog(options, owner) {
			const params = {
				title: options.title,
				defaultPath: options.defaultPath,
				filters: options.filters,
				owner
			};
			return readSaveDialogResult(await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_SAVE_DIALOG, params));
		},
		async showMessageBox(options, owner) {
			const params = {
				type: options.type,
				title: options.title,
				message: options.message,
				detail: options.detail,
				buttons: options.buttons,
				defaultId: options.defaultId,
				cancelId: options.cancelId,
				noLink: options.noLink,
				owner
			};
			return readMessageBoxResult(await parent.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_MESSAGE_BOX, params));
		}
	};
}
function readOpenDialogResult(value) {
	if (!value || typeof value !== "object") return {
		canceled: true,
		filePaths: []
	};
	const record = value;
	const filePaths = Array.isArray(record.filePaths) ? record.filePaths.filter((item) => typeof item === "string") : [];
	return {
		canceled: record.canceled !== false && filePaths.length === 0,
		filePaths
	};
}
function readSaveDialogResult(value) {
	if (!value || typeof value !== "object") throw new Error("desktopHost.showSaveDialog returned an invalid result");
	const record = value;
	if (record.canceled === true) return { canceled: true };
	const filePath = typeof record.filePath === "string" && record.filePath.trim() ? record.filePath : void 0;
	if (!filePath) throw new Error("desktopHost.showSaveDialog returned an invalid result");
	return {
		canceled: false,
		filePath
	};
}
function readMessageBoxResult(value) {
	if (!value || typeof value !== "object") return { response: 0 };
	const record = value;
	return { response: typeof record.response === "number" ? record.response : 0 };
}
//#endregion
//#region src/main/daemon/daemon-app-server-main.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_workbuddy_product_config();
/**
* daemon 各业务服务优雅关停的预算。
*
* 父进程 `DaemonProcessManager.stop()` 在 SHUTDOWN RPC 之后只等
* `DEFAULT_STOP_TIMEOUT_MS`(5s) 就 SIGTERM。被 SIGTERM 打断意味着 `finalizeDaemonShutdown()`
* 里的 WAL checkpoint 一定跑不到（线上就是这样丢的）。所以这里留 1s 余量自行收尾，
* 保证退出前的收口动作一定执行完。
*/
var DAEMON_SERVICES_STOP_BUDGET_MS = 4e3;
/**
* 会话运行时读取 qimei36 时，若 daemon `process.env.CODEBUDDY_QIMEI36` 还没被
* main 侧 `telemetry:updateQimei36` 补写，允许短暂等待其落地的封顶时间。超时后放行
* （qimei36 只是遥测公参，缺失不阻断会话）。与 daemon-bootstrap.ts 中 cbc spawn
* 前的 getQimei36 采用相同预算，保证两处 env-first 策略行为一致。
*/
var QIMEI36_WAIT_MS = 2e3;
/**
* daemon 子进程侧启动打点（F 段）。daemon 已在入口 initStartupContextFromEnv('daemon')，
* 故 mark 会带 source=daemon、pid=main pid，落进同一个 `<pid>-<time>.jsonl`，供瀑布分泳道
* 展示 daemon 与 main(C)/renderer(E) 的并行。直接用 perf logger，不引 electron（守卫约束）。
* 全程吞异常，绝不阻塞 daemon 启动。
*/
function markDaemon(id) {
	try {
		const def = require_marks.STARTUP_MARKS[id];
		if (!def) return;
		require_marks.getWorkbuddyPerfLogger(require_marks.PerfFlow.STARTUP).mark(def.key, {
			id: def.id,
			phase: def.phase
		});
	} catch {}
}
function requireStdioMode() {
	assertWorkbuddyAppServerStdioMode(process.argv);
}
var daemonAppServerLogger = {
	info: (message, ...args) => {
		require_code_cache.createWorkbuddyScopedLogger("daemon-app-server").info(message, ...args);
	},
	warn: (message, ...args) => {
		require_code_cache.createWorkbuddyScopedLogger("daemon-app-server").warn(message, ...args);
	},
	error: (message, ...args) => {
		require_code_cache.createWorkbuddyScopedLogger("daemon-app-server").error(message, ...args);
	}
};
/**
* #107526 P3：F9→F13 段可疑重活的 enter/leave 打点。
*
* 冷启动 08:57 case 里 daemon 主线程被某段同步/密集重活占死 ~17s：
* daemon.log 时间戳只显示"卡了"，看不到"谁卡的"。所有 F9 后的 kickoff 都过一遍
* `hotspot()`，配合 `[EventLoopStall]` warn 里的 stall 时间窗就能定位到具体阻塞源。
*
* 打点项：
* - `elapsedMs`：wall-clock 耗时；
* - `cpuMs`：本 daemon 进程在这段的 user+system CPU 时间，用于区分
*   "CPU-blocking"（elapsedMs ≈ cpuMs）与"IO-waiting"（cpuMs << elapsedMs）；
* - 抛错时也 log 一条 `error` 后重抛，不吞异常。
*/
async function hotspot(step, run) {
	const enteredAt = Date.now();
	const cpuStart = process.cpuUsage();
	daemonAppServerLogger.info(`[HotSpot] enter step=${step}`);
	try {
		const result = await run();
		const elapsedMs = Date.now() - enteredAt;
		const cpuDiff = process.cpuUsage(cpuStart);
		const cpuMs = Math.round((cpuDiff.user + cpuDiff.system) / 1e3);
		daemonAppServerLogger.info(`[HotSpot] leave step=${step} elapsedMs=${elapsedMs} cpuMs=${cpuMs}`);
		return result;
	} catch (error) {
		const elapsedMs = Date.now() - enteredAt;
		const cpuDiff = process.cpuUsage(cpuStart);
		const cpuMs = Math.round((cpuDiff.user + cpuDiff.system) / 1e3);
		daemonAppServerLogger.warn(`[HotSpot] error step=${step} elapsedMs=${elapsedMs} cpuMs=${cpuMs} error=${String(error?.message ?? error)}`);
		throw error;
	}
}
/**
* `hotspot` 的同步 kick 变体：**不 await** kick 函数返回的 Promise。
* 用于"同步 kickoff + fire-and-forget async 收尾"的语义（例如
* `startWorkbuddyAppServerDefaultBackgroundServices`），不能用 `hotspot` 因为那会等 fulfil，
* 破坏 markDaemon('F12') 立刻打的时序契约。
*
* kick 返回 Promise 时额外附一条 `[HotSpot] fulfilled/rejected step=... asyncMs=...`，
* 覆盖异步 fulfilment 时刻。
*/
function hotspotSync(step, kick) {
	const enteredAt = Date.now();
	const cpuStart = process.cpuUsage();
	daemonAppServerLogger.info(`[HotSpot] enter step=${step}`);
	let result;
	try {
		result = kick();
	} catch (error) {
		const elapsedMs = Date.now() - enteredAt;
		const cpuDiff = process.cpuUsage(cpuStart);
		const cpuMs = Math.round((cpuDiff.user + cpuDiff.system) / 1e3);
		daemonAppServerLogger.warn(`[HotSpot] error step=${step} elapsedMs=${elapsedMs} cpuMs=${cpuMs} error=${String(error?.message ?? error)}`);
		throw error;
	}
	const elapsedMs = Date.now() - enteredAt;
	const cpuDiff = process.cpuUsage(cpuStart);
	const cpuMs = Math.round((cpuDiff.user + cpuDiff.system) / 1e3);
	daemonAppServerLogger.info(`[HotSpot] leave step=${step} sync=true elapsedMs=${elapsedMs} cpuMs=${cpuMs}`);
	if (result instanceof Promise) {
		const asyncStart = Date.now();
		result.then(() => daemonAppServerLogger.info(`[HotSpot] fulfilled step=${step} asyncMs=${Date.now() - asyncStart}`), (error) => daemonAppServerLogger.warn(`[HotSpot] rejected step=${step} asyncMs=${Date.now() - asyncStart} error=${String(error?.message ?? error)}`));
	}
	return result;
}
async function runDaemonAppServerEntry() {
	requireStdioMode();
	const expectedCredentialProtectionPolicy = require_credential_protection_bootstrap.readWorkbuddyCredentialProtectionPolicy(process.env);
	delete process.env[require_credential_protection_bootstrap.WORKBUDDY_CREDENTIAL_PROTECTION_ENV];
	if (expectedCredentialProtectionPolicy === "fields") require_credential_protection.setCredentialProtectionPending();
	require_code_cache.setBundledAssetsRoot(__dirname);
	markDaemon("F1");
	const platform = createWorkbuddyAppServerPlatformFromEnv({ processResourcesPath: process.resourcesPath });
	configureWorkbuddyAppServerRuntimeContextFromEnv(platform);
	const daemonServer = new require_server.DaemonServer({ logger: {
		info: (message, meta) => daemonAppServerLogger.info(message, meta ?? {}),
		warn: (message, meta) => daemonAppServerLogger.warn(message, meta ?? {})
	} });
	const credentialProtectionGate = new require_credential_protection_bootstrap.DaemonCredentialProtectionBootstrapGate(expectedCredentialProtectionPolicy, (bootstrap) => {
		const configured = require_credential_protection.configureCredentialProtection(bootstrap);
		const runtime = require_credential_protection.getCredentialProtectionState();
		daemonAppServerLogger.info("[CredentialBootstrap] daemon runtime configured", {
			eventAtMs: Date.now(),
			policy: bootstrap.policy,
			configured,
			runtimeStatus: runtime.status,
			runtimeUnavailableCategory: runtime.status === "unavailable" ? runtime.category : void 0,
			wholeFileProtectionReady: require_credential_protection.isWholeFileProtectionReady()
		});
		if (!configured) daemonAppServerLogger.warn("[CredentialProtection] conflicting late bootstrap ignored");
	}, (event) => daemonAppServerLogger.info("[CredentialBootstrap] daemon gate", event));
	credentialProtectionGate.register(daemonServer);
	const parentHost = createStdioParentRpcClient({
		output: process.stdout,
		logger: {
			warn: (message, meta) => daemonAppServerLogger.warn(message, meta ?? {}),
			info: (message, meta) => daemonAppServerLogger.info(message, meta ?? {})
		}
	});
	const desktopHost = createAppServerDesktopHostBridge({
		parent: parentHost,
		events: daemonServer,
		appName: process.env.WORKBUDDY_APP_NAME,
		appVersion: platform.appVersion,
		appLocale: platform.appLocale(),
		appConfigDir: platform.configDir,
		isPackaged: platform.isPackaged
	});
	const syncTencentDocsEngineOriginToMain = (origin) => {
		parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.TENCENT_DOCS_ENGINE_ORIGIN_CHANGED, { ...origin ? { origin } : {} }).catch((error) => {
			daemonAppServerLogger.warn("Failed to sync Tencent Docs engine origin to main:", error);
		});
	};
	const disposeTencentDocsEngineOriginSync = require_tencent_docs_prompt_selection.onActiveTencentDocsEngineOriginChange(syncTencentDocsEngineOriginToMain);
	syncTencentDocsEngineOriginToMain(require_tencent_docs_prompt_selection.getActiveTencentDocsEngineOrigin());
	require_file_authentication_storage.setWorkbuddyLegacyAuthSessionMigrator(require_legacy_auth_session_migrator.createLegacyAuthSessionMigrator({ decryptString: (encrypted) => desktopHost.auth.decryptLegacyAuthSession(encrypted.toString("base64")) }, daemonAppServerLogger));
	const resolveDaemonProxyEnv = () => require_log_acl_guard.resolveProxyEnv(void 0, { resolveProxy: (targetUrl) => desktopHost.network.resolveProxy(targetUrl) });
	let celljsContainerReady = false;
	let daemonReady = false;
	const resources = {};
	const stopCliPrewarmPool = async () => {
		await resources.daemon?.cliPrewarmPool?.stop().catch((error) => {
			daemonAppServerLogger.error("Failed to stop CLI prewarm pool:", error);
		});
	};
	/** 可能挂起的异步服务收尾。每一步都自带 catch，单点失败不阻断后续。 */
	const stopDaemonServices = async () => {
		parentHost.rejectPending(/* @__PURE__ */ new Error("Daemon app-server shutting down"));
		resources.nativeRuntime?.dispose();
		await (await resources.backgroundPromise?.catch(() => void 0))?.stop().catch((error) => {
			daemonAppServerLogger.error("Failed to stop background services:", error);
		});
		await resources.wbBridge?.dispose().catch((error) => {
			daemonAppServerLogger.error("Failed to dispose conversation bridge:", error);
		});
		try {
			resources.mcpAppsHost?.stop();
		} catch (error) {
			daemonAppServerLogger.error("Failed to stop MCP Apps host:", error);
		}
		resources.disposeMigrationRuntimeHandlers?.();
		resources.hostPowerEvents?.dispose();
		resources.productRouteSubscription?.dispose();
		await resources.pacRpc?.close().catch((error) => {
			daemonAppServerLogger.warn("Failed to stop PAC RPC service:", error);
		});
		try {
			disposeTencentDocsSelectionBroadcast();
		} catch {}
		const LLAMA_SHUTDOWN_BUDGET_MS = 1e3;
		await Promise.race([resources.llamaServerManager?.shutdown(), new Promise((resolve) => setTimeout(resolve, LLAMA_SHUTDOWN_BUDGET_MS))]).catch((error) => {
			daemonAppServerLogger.error("Failed to stop llama-server:", error);
		});
		await resources.daemon?.stop().catch((error) => {
			daemonAppServerLogger.error("Failed to stop daemon:", error);
		});
	};
	const servicesStopBudget = () => new Promise((resolve) => {
		setTimeout(() => {
			daemonAppServerLogger.warn(`[DaemonAppServer] service teardown exceeded ${DAEMON_SERVICES_STOP_BUDGET_MS}ms; finalizing shutdown anyway`);
			resolve();
		}, DAEMON_SERVICES_STOP_BUDGET_MS).unref?.();
	});
	/**
	* 退出前必须执行完的收口动作，全同步、幂等。
	* `resources.database?.dispose()` 是 SQLite WAL checkpoint，漏掉会留下 WAL 残留。
	*/
	let finalized = false;
	const finalizeDaemonShutdown = () => {
		if (finalized) return;
		finalized = true;
		try {
			disposeTencentDocsEngineOriginSync();
		} catch (error) {
			daemonAppServerLogger.warn("Failed to dispose tencent docs engine origin sync:", error);
		}
		try {
			resources.database?.dispose();
		} catch (error) {
			daemonAppServerLogger.error("Failed to dispose database:", error);
		}
		try {
			credentialProtectionGate.dispose();
			require_credential_protection.disposeCredentialProtection();
		} catch (error) {
			daemonAppServerLogger.warn("Failed to dispose credential protection:", error);
		}
	};
	const lifecycle = startWorkbuddyAppServerStdioLifecycle({
		server: daemonServer,
		emitReady: false,
		getPingStatus: () => ({
			ok: true,
			pid: process.pid,
			appVersion: platform.appVersion,
			celljsReady: celljsContainerReady,
			daemonReady
		}),
		shutdown: async () => {
			try {
				await stopCliPrewarmPool();
				await Promise.race([stopDaemonServices(), servicesStopBudget()]);
			} finally {
				finalizeDaemonShutdown();
			}
		},
		flushCliPrewarmPool: async () => {
			await resources.daemon?.cliPrewarmPool?.flush();
			daemonAppServerLogger.info(`[DaemonAppServer] ${require_log_acl_guard.DAEMON_LIFECYCLE_RPC_CHANNELS.FLUSH_CLI_PREWARM_POOL} completed`);
		},
		logger: {
			error: (message, ...args) => {
				daemonAppServerLogger.error(message, ...args);
			},
			warn: (message, meta) => {
				daemonAppServerLogger.warn(message, meta ?? {});
			}
		},
		onUnhandledFrame: (frame) => parentHost.handleFrame(frame),
		exit: (code) => process.exit(code)
	});
	const credentialProtectionBootstrap = await credentialProtectionGate.wait(1e3);
	if (!require_credential_protection.configureCredentialProtection(credentialProtectionBootstrap)) daemonAppServerLogger.warn("[CredentialProtection] conflicting bootstrap ignored");
	if (credentialProtectionBootstrap.policy === "fields" && !credentialProtectionBootstrap.symmetricKey) daemonAppServerLogger.warn("[CredentialProtection] key unavailable; continuing");
	daemonServer.handle("runtime:patchEnv", (env) => {
		for (const [key, value] of Object.entries(env)) if (typeof value === "string" && value) process.env[key] = value;
		daemonAppServerLogger.info("[Daemon] runtime:patchEnv applied", { keys: Object.keys(env) });
		return { ok: true };
	});
	daemonServer.handle("telemetry:updateQimei36", (params) => {
		const { qimei36 } = params ?? {};
		if (typeof qimei36 === "string" && qimei36.length > 0) {
			process.env.CODEBUDDY_QIMEI36 = qimei36;
			require_daemon_bootstrap.markQimei36Ready();
			daemonAppServerLogger.info("[QimeiUpdate] qimei36 updated via IPC");
		}
	});
	const pacStartedAt = Date.now();
	resources.pacRpc = await configureDaemonNetworkProxy(resolveDaemonProxyEnv, process.env.WORKBUDDY_PAC_RESOLVER === "off" ? void 0 : (targetUrl) => desktopHost.network.resolveProxy(targetUrl));
	daemonAppServerLogger.info(`[DaemonStartup] network proxy configured (${Date.now() - pacStartedAt}ms)`);
	const celljsStartedAt = Date.now();
	daemonAppServerLogger.info("[DaemonStartup] initializing CellJS container...");
	const celljsContainer = await require_log_acl_guard.initializeCellJSContainer({
		baseModules: require_module_base.baseModules,
		workbuddyModule: require_module_app_server.workbuddyAppServerModule,
		logger: {
			info: (message) => daemonAppServerLogger.info(message),
			error: (message) => daemonAppServerLogger.error(message)
		}
	});
	celljsContainerReady = true;
	daemonAppServerLogger.info(`[DaemonStartup] CellJS container ready (${Date.now() - celljsStartedAt}ms)`);
	const dbStartedAt = Date.now();
	const database = require_app_server_database.createInitializedWorkbuddyAppServerDatabase({
		configDir: platform.configDir,
		logger: { info: (message) => daemonAppServerLogger.info(message) }
	});
	resources.database = database;
	daemonAppServerLogger.info(`[DaemonStartup] database ready (${Date.now() - dbStartedAt}ms)`);
	markDaemon("F2");
	const celljs = require_celljs_deps.resolveCellJSDeps(celljsContainer, {
		database,
		getColorScheme: () => desktopHost.window.getColorScheme()
	});
	const syncNetworkFailoverRoutes = () => {
		const bundledProduct = require_code_cache.tryGetWorkbuddyBaseProductConfiguration();
		if (!bundledProduct) return;
		require_log_acl_guard.configureNetworkFailoverRoutes(bundledProduct, celljs.productManager.getCurrentConfiguration?.());
	};
	syncNetworkFailoverRoutes();
	resources.productRouteSubscription = celljs.productManager.onDidChange?.(syncNetworkFailoverRoutes);
	const browserUseHost = require_log_acl_guard.isBrowserUseSupportedPlatform(platform.osPlatform ?? process.platform) ? {
		activate: (params) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.BROWSER_RUNTIME_ACTIVATE, params),
		prepareSession: (params) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.BROWSER_RUNTIME_PREPARE_SESSION, params),
		releaseSession: (leaseId) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.BROWSER_RUNTIME_RELEASE_SESSION, { leaseId }),
		reconcileSessions: (input) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.BROWSER_RUNTIME_RECONCILE_SESSIONS, input)
	} : void 0;
	let resolveNativeRuntimePlugins = () => void 0;
	const nativeRuntimePlugins = new Promise((resolve) => {
		resolveNativeRuntimePlugins = resolve;
	});
	const nativeRuntimeFeatureGate = require_daemon_bootstrap.createNativeRuntimeFeatureGate({
		isSupported: (plugin) => plugin === "browser-use" ? Boolean(browserUseHost) : (platform.osPlatform ?? process.platform) === "darwin",
		getProductFeatures: () => (celljs.productManager?.getCurrentConfiguration?.())?.productFeatures,
		onProductChanged: (listener) => celljs.productManager?.onDidChange?.(listener)
	});
	const resolveNativeRuntimeAccess = () => ({
		"browser-use": nativeRuntimeFeatureGate.isAllowed("browser-use"),
		"computer-use": nativeRuntimeFeatureGate.isAllowed("computer-use")
	});
	celljs.systemPromptService.setNativeRuntimeAccessResolver(resolveNativeRuntimeAccess);
	const nativeRuntime = await require_daemon_bootstrap.installNativeRuntime({
		runtime: celljs.mcpManager,
		service: {
			configDir: platform.configDir,
			platform: platform.osPlatform ?? process.platform,
			arch: process.arch,
			appVersion: platform.appVersion,
			plugins: nativeRuntimePlugins,
			getProductConfiguration: () => celljs.productManager.getCurrentConfiguration(),
			buildBaseUrl: require_daemon_bootstrap.getBuildTimeNativeRuntimeBaseUrl(),
			legacyToggle: (plugin) => plugin === "computer-use" ? require_tar.getComputerUseEnabledFromAppConfig(celljs.configService) : require_tar.getBrowserControlEnabledFromAppConfig(celljs.configService),
			featureGate: nativeRuntimeFeatureGate,
			reportMetric: (name, dims) => sendMetric({
				kind: "counter",
				metric: name,
				value: 1,
				dims
			})
		},
		browserUse: browserUseHost,
		computerUse: {
			host: {
				activate: (params) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COMPUTER_USE_ACTIVATE, params),
				acquireSession: (params) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COMPUTER_USE_PREPARE_SESSION, params),
				releaseSession: (sessionId, leaseId) => parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COMPUTER_USE_RELEASE_SESSION, {
					sessionId,
					leaseId
				}).then(() => void 0)
			},
			vlm: require_daemon_bootstrap.createComputerUseVlmProxy({
				auth: {
					getAccessToken: () => celljs.authenticationManager?.currentSessionSubject.getValue()?.auth?.accessToken,
					refreshSession: async () => {
						await celljs.authenticationManager?.refreshSession();
					}
				},
				getGatewayEndpoint: () => celljs.productManager.getEndpoint(),
				getRequestHeaders: () => {
					const session = celljs.authenticationManager?.currentSessionSubject.getValue();
					const product = celljs.productManager.getCurrentConfiguration();
					return require_daemon_bootstrap.buildComputerUseVlmGatewayHeaders({
						userId: session?.account?.uid,
						enterpriseId: session?.account?.enterpriseId,
						domain: session?.auth?.domain,
						deploymentType: product?.deploymentType,
						appVersion: process.env.WORKBUDDY_APP_VERSION || product?.productVersion,
						cliVersion: product?.platformVersion
					});
				},
				logger: daemonAppServerLogger
			})
		},
		logger: daemonAppServerLogger
	});
	markDaemon("F3");
	const tencentDocsNativeHostPlatform = {
		osPlatform: platform.osPlatform ?? process.platform,
		showMessageBox: (options) => desktopHost.dialog.showMessageBox(options, require_tencent_docs_prompt_selection.getNativeDialogOwner()),
		showOpenDialog: (options) => desktopHost.dialog.showOpenDialog(options, require_tencent_docs_prompt_selection.getNativeDialogOwner()),
		showSaveDialog: (options) => desktopHost.dialog.showSaveDialog(options, require_tencent_docs_prompt_selection.getNativeDialogOwner())
	};
	const reportTencentDocsPreviewTelemetry = (eventCode, payload) => {
		try {
			Promise.resolve(celljs.eventService.report(eventCode, payload)).catch((error) => {
				daemonAppServerLogger.warn("[TencentDocsPreviewTelemetry] report rejected:", eventCode, error);
			});
		} catch (error) {
			daemonAppServerLogger.warn("[TencentDocsPreviewTelemetry] report threw:", eventCode, error);
		}
	};
	const editorSdkSandboxEnabled = require_tar.getSandboxSafetyEnabledFromAppConfig(celljs.configService);
	const editorSdkPath = require_code_cache.resolveBundledAsset("node_modules", "@tencent", "tencent-docs-ai-engine", "bin", `${process.platform}-${process.arch}`, process.platform === "win32" ? "editor_sdk.exe" : "editor_sdk");
	const editorSdkSandbox = require_daemon_bootstrap.createWorkbuddyEditorSdkSandbox({
		getUid: () => celljs.authenticationManager?.currentSessionSubject.getValue()?.account?.uid,
		editorSdkPath,
		sandboxEnabled: editorSdkSandboxEnabled,
		logger: daemonAppServerLogger
	});
	daemonAppServerLogger.info(`[TencentDocsEngine] editor_sdk sandbox policy ${editorSdkSandboxEnabled ? "enabled" : "global-allow"}`);
	const tencentDocsDocumentService = require_tencent_docs_prompt_selection.initializeTencentDocsDocumentService({
		docsService: editorSdkSandbox,
		killStaleEditorSdkProcesses: require_tencent_docs_prompt_selection.killStaleEditorSdkProcesses,
		requestDirtyEditorCloseDecision: require_tencent_docs_prompt_selection.createNativeHostDirtyEditorCloseDecision(tencentDocsNativeHostPlatform),
		requestOriginalFileConflictDecision: require_tencent_docs_prompt_selection.createNativeHostOriginalFileConflictDecision(tencentDocsNativeHostPlatform),
		notifyOriginalFileChanged: require_tencent_docs_prompt_selection.createNativeHostOriginalFileChangedNotifier(tencentDocsNativeHostPlatform),
		reportTelemetry: reportTencentDocsPreviewTelemetry
	});
	tencentDocsDocumentService.setEngineReadyHandler(() => {
		daemonServer.push(require_wb_source.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.ENGINE_READY, {});
	});
	tencentDocsDocumentService.setPreviewReloadHandler((payload) => {
		daemonServer.push(require_wb_source.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.RELOAD_EMBEDDED_PREVIEW, payload);
	});
	const tencentDocsMcp = require_tencent_docs_document_lifecycle_port.createTencentDocsEngineProvider({
		documentService: tencentDocsDocumentService,
		logger: daemonAppServerLogger
	});
	const localDocsFacade = require_log_acl_guard.createLocalDocsHostFacade({
		documentService: tencentDocsDocumentService,
		platform: tencentDocsNativeHostPlatform,
		logger: daemonAppServerLogger
	});
	const disposeTencentDocsSelectionBroadcast = require_selection_broadcast.registerTencentDocsSelectionBroadcast({
		emit: (channel, data) => {
			require_conversations.getBus().emit(channel, data);
		},
		push: (channel, data) => {
			daemonServer.push(channel, data);
		}
	});
	markDaemon("F4");
	const migrationService = new require_log_acl_guard.MigrationService(database, celljs.logger, void 0, void 0, {
		userIdProvider: () => celljs.authService.getAccount()?.uid,
		localStorageServiceFactory: () => new FileBackedLegacyLocalStorageMigrationService(process.env.WORKBUDDY_LEGACY_LOCALSTORAGE_MIGRATION_RESULT_PATH)
	});
	let baseMigrationRuntimeHandlersRegistered = false;
	const ensureBaseMigrationRuntimeHandlers = (server) => {
		if (baseMigrationRuntimeHandlersRegistered) return;
		resources.disposeMigrationRuntimeHandlers = require_runtime_handlers.registerWorkbuddyMainRuntimeHandlers(server, { migration: {
			getHistoryStatus: () => migrationService.getHistoryStatus(),
			replayArchived: (ids) => migrationService.replayArchivedManual(ids),
			getPendingLocalStorageMigration: () => migrationService.getPendingLocalStorageMigration(),
			completeLocalStorageMigration: (result) => migrationService.completeLocalStorageMigration(result),
			getArchivedSyncService: () => migrationService.getArchivedSyncService(),
			logger: {
				info: (message) => daemonAppServerLogger.info(message),
				warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args),
				error: (message, ...args) => daemonAppServerLogger.error(message, ...args)
			}
		} });
		baseMigrationRuntimeHandlersRegistered = true;
	};
	markDaemon("F5");
	const runtimeManager = require_code_cache.createWorkbuddySidecarManager({
		credentialProtectionBootstrap,
		getConnectorTokenEnv: () => celljs.connectorService.getSkillOnlyTokenEnv(),
		getQimei36: () => process.env.CODEBUDDY_QIMEI36?.trim() || void 0,
		resolveProxyEnv: resolveDaemonProxyEnv,
		resolveCliEnvRouteMode: require_code_cache.resolveCliEnvRouteModeOverride
	});
	const bridgeToMain = (channel, payload) => {
		parentHost.invoke(channel, payload).catch(() => void 0);
	};
	const sendMetric = (payload) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_METRIC, payload);
	const chatPerfCollectorStub = {
		recordMessageDisplay: (data) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_RECORD_MESSAGE_DISPLAY, data),
		recordFirstResponse: (data) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_RECORD_FIRST_RESPONSE, data)
	};
	const remoteMonitorService = {
		applyRendererSessionId: (sessionId) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_APPLY_RENDERER_SESSION_ID, { sessionId }),
		recordDuration: (metric, durationMs, dims) => sendMetric({
			kind: "duration",
			metric,
			value: durationMs,
			dims
		}),
		addCounter: (metric, count, dims) => sendMetric({
			kind: "counter",
			metric,
			value: count,
			dims
		}),
		reportEvent: (name, ext) => sendMetric({
			kind: "event",
			name,
			ext
		}),
		reportLog: (name, level, attributes) => sendMetric({
			kind: "log",
			name,
			level,
			attributes
		}),
		getChatPerfCollector: () => chatPerfCollectorStub,
		getMarketPageLoadCollector: () => ({ recordMarketPageLoad: (data) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_RECORD_MARKET_PAGE_LOAD, data) })
	};
	const shareMonitorReporter = require_server.createMonitorReporter(() => remoteMonitorService);
	require_server.setShareUploadMetricReporter({ reportLog: (name, level, attrs) => shareMonitorReporter.reportLog?.(name, level, attrs) });
	const DAEMON_MEMORY_FOOTPRINT_INTERVAL_MS = 18e5;
	const reportDaemonMemoryFootprint = () => {
		try {
			const mu = process.memoryUsage();
			const toMB = (bytes) => Math.round(bytes / 1048576);
			remoteMonitorService.reportEvent?.("daemon_memory_footprint", {
				pid: process.pid,
				rssMB: toMB(mu.rss),
				heapUsedMB: toMB(mu.heapUsed),
				heapTotalMB: toMB(mu.heapTotal),
				externalMB: toMB(mu.external),
				arrayBuffersMB: toMB(mu.arrayBuffers ?? 0),
				v8OldSpaceQuotaMB: 4096
			});
		} catch {}
	};
	setInterval(reportDaemonMemoryFootprint, DAEMON_MEMORY_FOOTPRINT_INTERVAL_MS).unref?.();
	const daemonLlamaServerManager = createDaemonLlamaServerManager({ logger: daemonAppServerLogger });
	resources.llamaServerManager = daemonLlamaServerManager;
	markDaemon("F6");
	markDaemon("F7");
	const f7StartedAt = Date.now();
	let f7LastAt = f7StartedAt;
	const f7Probe = (stage, extra) => {
		const now = Date.now();
		const totalMs = now - f7StartedAt;
		const sinceLastMs = now - f7LastAt;
		f7LastAt = now;
		daemonAppServerLogger.info(`[FirstScreen] [F7ToF8Probe] stage=${stage} totalMs=${totalMs} sinceLastMs=${sinceLastMs}` + (extra ? ` ${extra}` : ""));
	};
	f7Probe("enter");
	const { NetworkGate } = await Promise.resolve().then(() => require("./network.js"));
	const networkGate = new NetworkGate({ logger: daemonAppServerLogger });
	f7Probe("afterNetworkGateImport");
	let resolveFirstLocalListLatch;
	const firstLocalListLatch = new Promise((resolve) => {
		resolveFirstLocalListLatch = resolve;
	});
	const marketplaceInitReady = (() => {
		let resolve;
		const promise = new Promise((r) => {
			resolve = r;
		});
		let done = false;
		let safetyTimer;
		const settle = (reason) => {
			if (done) return;
			done = true;
			daemonAppServerLogger.info(`[FirstScreen] [MarketplaceInitGate] released by "${reason}" → marketplace init will run now`);
			if (safetyTimer) {
				clearTimeout(safetyTimer);
				safetyTimer = void 0;
			}
			resolve();
		};
		const initializedPromise = celljs.authenticationManager?.initialized;
		const readySignals = [firstLocalListLatch];
		if (initializedPromise) readySignals.push(initializedPromise);
		else daemonAppServerLogger.warn("[FirstScreen] [MarketplaceInitGate] authenticationManager missing, gate now only awaits firstLocalListReady + safety timeout");
		Promise.all(readySignals).then(() => settle(initializedPromise ? "auth-and-first-local-list-ready" : "first-local-list-ready-only"), (err) => settle(`ready-rejected (${String(err)})`));
		const safetyMs = 15e3;
		safetyTimer = setTimeout(() => {
			daemonAppServerLogger.warn(`[FirstScreen] [MarketplaceInitGate] safety timeout ${safetyMs}ms hit; releasing to avoid stall`);
			settle("safety-timeout");
		}, safetyMs);
		safetyTimer.unref?.();
		return promise;
	})();
	const conversationIntentReady = (() => {
		let resolve;
		const promise = new Promise((r) => {
			resolve = r;
		});
		let done = false;
		const settle = (reason) => {
			if (done) return;
			done = true;
			daemonAppServerLogger.info(`[ConversationIntentGate] released by "${reason}" → CLI prewarm pool will start now`);
			resolve({ source: "input_focus" });
		};
		daemonServer.handle(require_log_acl_guard.DAEMON_CONVERSATION_INTENT_CHANNEL, async () => {
			settle("renderer-intent");
			return { ok: true };
		});
		return promise;
	})();
	const daemon = await require_daemon_bootstrap.bootstrapDaemon({
		celljs,
		credentialProtectionBootstrap,
		platform,
		runtimeManager,
		desktopHost,
		createRpcServer: () => daemonServer,
		rpcHandlerProfile: "daemon-app-server",
		rpcHandlerOptions: {
			getNetworkGate: () => networkGate,
			marketplaceInitTrigger: marketplaceInitReady,
			nativeRuntime: Promise.resolve(nativeRuntime)
		},
		cliPrewarmPoolStartTrigger: conversationIntentReady,
		resolveProxyEnv: resolveDaemonProxyEnv,
		tencentDocsMcp,
		localDocsReleaseBridge: require_daemon_bootstrap.createLocalDocsReleaseBridgeFromFacade(localDocsFacade),
		localDocs: localDocsFacade,
		tencentDocsRuntime: {
			documentService: tencentDocsDocumentService,
			push: (channel, data) => daemonServer.push(channel, data),
			documentPreviewPoolCapacity: 5
		},
		localDocumentMediaTypes: require_daemon_bootstrap.createTencentDocsLocalDocumentMediaTypes(),
		createDocumentLifecycle: ({ sessionManager }) => {
			const documentLifecycle = require_daemon_bootstrap.createTencentDocsDocumentLifecycleDeps({
				sessionManager,
				documentService: tencentDocsDocumentService
			});
			tencentDocsDocumentService.setSessionConflictLookups({
				isSessionStillProcessing: documentLifecycle.isSessionStillProcessing,
				getSessionTitle: (sessionId) => require_tencent_docs_document_lifecycle_port.resolveStoredSessionTitle(database, sessionId)
			});
			return documentLifecycle;
		},
		monitorEvent: (name, ext) => {
			sendMetric({
				kind: "event",
				name,
				ext
			});
		},
		promptTraceReporters: {
			reportForwarding: (payload) => {
				parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_FORWARDING, payload).catch(() => void 0);
			},
			reportDone: (payload) => {
				parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_DONE, payload).catch(() => void 0);
			},
			reportTrace: async (payload) => {
				try {
					await parentHost.invoke(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_TRACE, payload);
				} catch {}
			}
		},
		getMonitorService: () => remoteMonitorService,
		storeSessionCreateTiming: (sessionId, timing) => bridgeToMain(require_log_acl_guard.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_STORE_SESSION_CREATE_TIMING, {
			sessionId,
			timing
		}),
		onRpcReady: (server) => {
			ensureBaseMigrationRuntimeHandlers(server);
		},
		docsService: {
			getPreviewUrl: (filePath, options) => tencentDocsDocumentService.createPreviewUrl(filePath, options),
			dispose: () => tencentDocsDocumentService.dispose()
		},
		getSandboxPreviewMountService: () => resources.mcpAppsHost?.sandboxPreviewMountService,
		getSandboxPreviewHttpPort: () => resources.mcpAppsHost?.getSandboxPreviewHttpPort?.() ?? 0,
		getStaticHtmlServer: () => resources.mcpAppsHost?.staticHtmlServer,
		resolveBundledAssetForHandlers: require_code_cache.resolveBundledAsset
	});
	resources.daemon = daemon;
	f7Probe("afterBootstrapDaemon");
	markDaemon("F8");
	daemonReady = true;
	ensureBaseMigrationRuntimeHandlers(daemon.server);
	require_log_acl_guard.registerPerfProfilerHandlers(daemon.server);
	const hostPowerEvents = require_log_acl_guard.createWorkbuddyAppServerHostPowerEvents();
	resources.hostPowerEvents = hostPowerEvents;
	hostPowerEvents.registerHandlers(daemon.server);
	celljs.automationSessionManager = daemon.sessionManager;
	celljs.connectorPowerEvents = hostPowerEvents;
	const conversationRuntimeConfigResolver = require_server.createSessionRuntimeConfigResolver(Promise.resolve({
		logger: celljs.logger,
		systemPromptService: celljs.systemPromptService,
		enableMcpConnectionGuidance: true,
		resolveExpertMcpServerNames: (expertId, marketplace) => require_server.expertPackageMcpServerNames((id, pluginName, market) => celljs.expertPluginService.resolveExpertDependencies(id, pluginName, market), expertId, marketplace),
		recordDeclaredMcpServers: (sessionId, serverNames) => {
			celljs.mcpManager.setSessionDeclaredMcpServers(sessionId, serverNames);
		},
		resolveEnabledConnectorSources: () => new Set(celljs.connectorService.snapshotMcpDeclarations().filter((declaration) => declaration.enabled).map((declaration) => declaration.source))
	}));
	const preparerHttp = require_tar.createRuntimeContextFromCellDeps(celljs, {
		homeDir: platform.dataDir,
		logger: daemonAppServerLogger,
		fetch: (url, init) => fetch(url, init)
	}).http;
	const prepareConversationExpertRuntime = createConversationExpertRuntimePreparer({
		pluginService: celljs.expertPluginService,
		lookupOfficialPluginName: createLookupOfficialPluginName(preparerHttp, {
			logger: daemonAppServerLogger,
			manifestFallback: celljs.expertCenterService
		}),
		lookupOfficialDownloadUrl: createLookupOfficialDownloadUrl(preparerHttp, { logger: daemonAppServerLogger }),
		logger: celljs.logger
	});
	const conversationRuntimeConfigProvider = createConversationRuntimeConfigProvider({
		resolveSessionRow: (sessionId) => database.getSession(sessionId),
		resolver: conversationRuntimeConfigResolver,
		logger: celljs.logger,
		resolveLanguage: () => require_server.resolveCliSettingsLanguageFromDirs({
			getSystemLocale: () => platform.appLocale(),
			getConfigDir: () => platform.configDir,
			getUserDataDir: () => platform.dataDir
		}),
		expertRuntime: {
			pluginService: celljs.expertPluginService,
			agentTeamsEnvResolver: daemon.agentTeamsEnvResolver,
			prepareExpertRuntime: prepareConversationExpertRuntime
		},
		resolveProtectedAssetFlags: require_server.createDefaultProtectedAssetFlagsResolver({ skillsService: require_server.createSkillsService({ configDir: platform.configDir }) }),
		ensureLocalModelReady: async (modelId) => {
			const strippedId = modelId.startsWith("custom-local:") ? modelId.slice(13) : modelId;
			const modelConfig = (celljs.productManager?.getCurrentConfiguration?.()?.models)?.find((m) => m.id === strippedId || m.id === modelId);
			if (!modelConfig?.url || !modelConfig.local) return;
			let resolvedLaunchOverrides = modelConfig.launchOverrides;
			const registryEntry = require_log_acl_guard.getRegistryEntry(strippedId);
			if (registryEntry) {
				const variantName = require_log_acl_guard.getDetectedVariant();
				const baseLaunchOverrides = require_log_acl_guard.resolveLaunchOverrides(strippedId, variantName);
				const vc = await require_log_acl_guard.resolveVariantModelConfig(registryEntry, variantName);
				resolvedLaunchOverrides = require_log_acl_guard.mergeLaunchOverrides(baseLaunchOverrides, vc?.launchOverrides);
			}
			daemonAppServerLogger.info(`[DaemonLlamaServer] ensureLocalModelReady called model=${modelId} launchOverrides=${JSON.stringify(resolvedLaunchOverrides ?? null)}`);
			await daemonLlamaServerManager.ensureReady(modelId, {
				id: modelId,
				url: modelConfig.url,
				modelPath: modelConfig.modelPath,
				mmProjPath: modelConfig.mmProjPath,
				maxInputTokens: modelConfig.maxInputTokens,
				maxOutputTokens: modelConfig.maxOutputTokens,
				launchOverrides: resolvedLaunchOverrides,
				rawLaunchArgs: modelConfig.rawLaunchArgs,
				local: true
			});
		}
	});
	const resolveConversationAgentExtraEnv = () => tencentDocsMcp.resolveAgentEnv();
	const resolveConversationQimei36 = async () => {
		const fromEnv = process.env.CODEBUDDY_QIMEI36?.trim();
		if (fromEnv) return fromEnv;
		if (!await require_daemon_bootstrap.waitQimei36Ready(QIMEI36_WAIT_MS)) {
			daemonAppServerLogger.warn("[QimeiUpdate] resolveConversationQimei36 timed out waiting for env backfill; conversation runtime will proceed without qimei36");
			return;
		}
		return process.env.CODEBUDDY_QIMEI36?.trim() || void 0;
	};
	const resolveStoredBuddyRuntime = (sessionId) => {
		const stored = database.getSession(sessionId);
		const snapshotIndustryMode = stored?.buddySessionBinding?.runtime.industryMode;
		return {
			applicationId: snapshotIndustryMode?.applicationId ?? stored?.buddyAppSnapshot?.identity.applicationId,
			sceneId: snapshotIndustryMode?.sceneId,
			modeId: snapshotIndustryMode?.id,
			resourceSnapshotKey: stored?.buddySessionBinding?.resources.resourceSnapshotKey ?? snapshotIndustryMode?.resourceSnapshotKey
		};
	};
	const createConversationRuntimeAdmission = createDaemonConversationRuntimeAdmission({
		celljs,
		configDir: platform.configDir
	});
	const conversationRuntimeWarm = createDaemonConversationRuntimeWarmCache({
		celljs,
		resolveQimei36: resolveConversationQimei36,
		logger: daemonAppServerLogger
	});
	let conversationRuntimeRevision = 0;
	const refreshConversationRuntimeWarmCache = (context) => {
		conversationRuntimeWarm.refreshCurrentOwner().catch((error) => {
			daemonAppServerLogger.warn(`[ConversationRuntimeWarmCache] ${context} failed`, error);
		});
	};
	const preUpdateConversationRuntime = () => {
		conversationRuntimeRevision += 1;
		refreshConversationRuntimeWarmCache("runtime config pre-update");
	};
	celljs.expertPluginService.setHostCapabilities?.({ onRuntimeConfigChanged: preUpdateConversationRuntime });
	daemon.hostServices?.then((hostServices) => {
		resolveNativeRuntimePlugins(hostServices.plugins);
		nativeRuntime.start().catch((error) => {
			daemonAppServerLogger.warn("[NativeRuntime] start failed", error);
		});
	}).catch(() => void 0);
	resources.nativeRuntime = nativeRuntime;
	daemon.hostServices?.then((hostServices) => hostServices.plugins.start(() => {
		refreshConversationRuntimeWarmCache("future plugin projection refresh");
	})).catch((error) => {
		daemonAppServerLogger.warn("[ConversationRuntimeWarmCache] plugin projection invalidation listener failed", error);
	});
	resources.wbBridge = registerWBBridgeChannels(daemon.server, {
		celljs,
		desktopHost,
		measurementSink: { record: (metric) => sendMetric({
			kind: "measurement",
			metric
		}) },
		intentRecognition: celljsContainer.get(require_server.IntentRecognitionServiceToken),
		idleCapabilityFacadeProvider: () => daemon.getIdleCapabilityFacade(),
		conversationRuntimeFacts: {
			resolveCliEnvRouteMode: require_code_cache.resolveCliEnvRouteModeOverride,
			resolveAccountEnabledPlugins: () => celljs.connectorService.resolvePluginAccountOverlay?.() ?? Promise.resolve({}),
			createConversationAdmission: createConversationRuntimeAdmission,
			resolveAgentTeams: (sessionId) => conversationRuntimeConfigProvider.resolveAgentTeams(sessionId),
			getProjectConversationEnv: (sessionId) => require_daemon_bootstrap.projectResourceManager.getEnvForSession(sessionId),
			resolveBuddySessionSkillDir: (sessionId) => {
				const runtime = resolveStoredBuddyRuntime(sessionId);
				if (!runtime.applicationId) return;
				return require_server.resolveBuddySessionSkillDir(platform.configDir, runtime.applicationId, runtime.sceneId, runtime.resourceSnapshotKey, runtime.modeId);
			},
			getProjectMcpServersForConversation: (sessionId) => require_daemon_bootstrap.projectResourceManager.getMcpServersForSession(sessionId),
			resolveAgentExtraEnv: resolveConversationAgentExtraEnv,
			resolveConnectorTokenEnv: () => celljs.connectorService?.getSkillOnlyTokenEnv() ?? {},
			getConnectorRuntimeRevision: () => (celljs.connectorService?.getRuntimeRevision() ?? 0) + celljs.mcpManager.getRuntimeRevision(),
			resolveQimei36: resolveConversationQimei36,
			resolveDesiredConfig: (ctx) => conversationRuntimeConfigProvider.resolveDesiredConfig(ctx),
			resolveRuntimeConfig: (ctx, options) => conversationRuntimeConfigProvider.resolveRuntimeConfig(ctx, options),
			resolveBeforePromptRequests: (ctx) => conversationRuntimeConfigProvider.resolveBeforePromptRequests(ctx),
			refineConversationConfig: (ctx, config) => conversationRuntimeConfigProvider.refineConversationConfig(ctx, config),
			activateExpertConversationRuntime: (ctx, runtimeHttpBase) => conversationRuntimeConfigProvider.activateExpertRuntimeForSession(ctx, runtimeHttpBase),
			forgetPreparedExpertRuntime: (conversationId) => conversationRuntimeConfigProvider.forget(conversationId),
			onExpertCleared: (conversationId) => conversationRuntimeConfigProvider.publishExpertClearedTombstone(conversationId),
			resolveAllowedTools: () => conversationRuntimeConfigProvider.resolveAllowedTools(),
			resolveMcpConfig: (ctx, toolSpecs, enabledPlugins) => {
				const buddyRuntime = resolveStoredBuddyRuntime(ctx.conversationId);
				return celljs.sessionMcpConfigCoordinator.resolveConversationConfig({
					sessionId: ctx.conversationId,
					cwd: ctx.cwd,
					welcomeMode: ctx.selection?.welcomeMode,
					projectId: ctx.projectId,
					workspace: ctx.cwd,
					toolSpecs,
					interactionMode: ctx.selection?.interactionMode,
					buddyApplicationId: buddyRuntime.applicationId,
					buddyResourceSnapshotKey: buddyRuntime.resourceSnapshotKey,
					enabledPlugins
				});
			},
			releaseMcpConfig: (conversationId) => celljs.sessionMcpConfigCoordinator.releaseConfig(conversationId),
			getConversationRuntimeRevision: () => conversationRuntimeRevision,
			resolveNativeRuntimeAccess,
			onNativeRuntimeAccessChanged: (listener) => nativeRuntime.onChanged(() => {
				preUpdateConversationRuntime();
				listener();
			}),
			prepareConversationPrompt: require_server.withConversationDeviceRisk(require_server.createConversationPromptPreparer(celljs.userPromptService, daemonAppServerLogger, conversationRuntimeConfigProvider.resolvePromptDesiredConfig, (conversationId) => conversationRuntimeConfigProvider.getPreparedExpertRuntimeFacts(conversationId)), {
				getDeviceRisk: () => celljs.authService.getTuringDeviceTokenResult(),
				pluginService: celljs.expertPluginService,
				runtimeConfig: conversationRuntimeConfigProvider
			}, daemonAppServerLogger),
			runtimeWarmCache: conversationRuntimeWarm.cache
		},
		runtimeConfigDir: conversationRuntimeWarm.resolveLocalHistoryConfigDir
	});
	resources.wbBridge.firstLocalListReady.then(() => resolveFirstLocalListLatch(), () => resolveFirstLocalListLatch());
	lifecycle.signalReady();
	markDaemon("F9");
	const FIRST_RPC_YIELD_TICKS = 3;
	for (let tick = 0; tick < FIRST_RPC_YIELD_TICKS; tick += 1) await new Promise((resolve) => {
		setImmediate(resolve);
	});
	const FIRST_LOCAL_LIST_TIMEOUT_MS = 3e3;
	const gateStartedAt = Date.now();
	const firstLocalListGateReason = await Promise.race([resources.wbBridge.firstLocalListReady.then(() => "ready"), new Promise((resolve) => {
		setTimeout(() => resolve("timeout"), FIRST_LOCAL_LIST_TIMEOUT_MS).unref?.();
	})]);
	const gateWaitedMs = Date.now() - gateStartedAt;
	daemonAppServerLogger.info(`[FirstScreen] [FirstLocalListGate] released by "${firstLocalListGateReason}" waitedMs=${gateWaitedMs} timeoutMs=${FIRST_LOCAL_LIST_TIMEOUT_MS}`);
	const productName = await hotspot("resolveProductName", () => resolveProductName(celljs));
	const startupMigration = await hotspot("startupMigration", () => require_app_server_migration_runtime.startWorkbuddyAppServerStartupMigration({
		migrationService,
		productName,
		onHistoryProgress: (current, total, name) => {
			daemon.server.push(require_handler_registry.MIGRATION_RPC_CHANNELS.HISTORY_PROGRESS, {
				current,
				total,
				name
			});
		},
		logger: {
			info: (message) => daemonAppServerLogger.info(message),
			warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args)
		}
	}));
	markDaemon("F10");
	await hotspot("registerMainRuntimeHandlers", () => {
		resources.disposeMigrationRuntimeHandlers?.();
		resources.disposeMigrationRuntimeHandlers = require_runtime_handlers.registerWorkbuddyMainRuntimeHandlers(daemon.server, { migration: startupMigration.createRuntimeHandlersDeps({ logger: {
			info: (message) => daemonAppServerLogger.info(message),
			warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args),
			error: (message, ...args) => daemonAppServerLogger.error(message, ...args)
		} }) });
	});
	await hotspot("scheduleSessionFragmentRepair", () => {
		require_log_acl_guard.scheduleSessionFragmentRepairRun({
			database,
			deferredHistory: startupMigration.deferredHistory,
			logger: {
				warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args),
				error: (message, ...args) => daemonAppServerLogger.error(message, ...args)
			}
		});
	});
	resources.mcpAppsHost = await hotspot("startMcpAppsHost", () => require_app_server_mcp_apps_host.startWorkbuddyAppServerDefaultMcpAppsHost({
		celljs,
		daemon,
		connectorOauthFetch: (url, init) => fetch(url, init),
		serverFetch: (url, init) => fetch(url, init),
		resolveBundledAsset: require_code_cache.resolveBundledAsset,
		logger: daemonAppServerLogger
	}));
	markDaemon("F11");
	const backgroundPromise = hotspotSync("backgroundServicesKick", () => require_server.startWorkbuddyAppServerDefaultBackgroundServices({
		celljs,
		runtimeManager,
		daemon,
		builtinSkillsDir: require_code_cache.requireBundledAsset("plugins", "workbuddy-builtin", "skills"),
		connectorOauthFetch: (url, init) => fetch(url, init),
		resolveBundledAsset: require_code_cache.resolveBundledAsset,
		resolveBuiltinMarketEndpointOverride: require_code_cache.resolveEndpointOverride,
		conversationsBridge: resources.wbBridge,
		runtimeWarmCache: conversationRuntimeWarm.cache,
		logger: daemonAppServerLogger,
		connectorPowerEvents: hostPowerEvents,
		networkGate,
		prewarmPool: daemon.cliPrewarmPool,
		mcpWarmupTrigger: resources.wbBridge?.firstLocalListRendered,
		...resources.mcpAppsHost?.staticHtmlServer ? { staticHtmlServer: resources.mcpAppsHost.staticHtmlServer } : {}
	}));
	resources.backgroundPromise = backgroundPromise;
	markDaemon("F12");
	createDiskCleanupService({
		configDir: platform.configDir,
		registry: createDiskResourceRegistry(createBuiltinDiskResources(platform.configDir)),
		reporter: { addCounter: (metric, count, dims) => {
			sendMetric({
				kind: "counter",
				metric,
				value: count,
				dims
			});
		} }
	}).startSchedule();
	backgroundPromise.then(() => {
		markDaemon("F13");
	}, (error) => {
		daemonAppServerLogger.error("Background services start error:", error);
	});
	marketplaceInitReady.then(() => {
		daemonAppServerLogger.info(`[HotSpot] marketplaceInitReady observed by daemon-main at=${(/* @__PURE__ */ new Date()).toISOString()}`);
	});
	const shutdown = () => {
		lifecycle.shutdown().catch((error) => {
			daemonAppServerLogger.error("[DaemonAppServer] Shutdown failed:", error);
		});
	};
	process.on("SIGTERM", shutdown);
	process.on("SIGINT", shutdown);
}
async function configureDaemonNetworkProxy(resolveDaemonProxyEnv, pacResolver) {
	let pacRpcHandle;
	if (pacResolver) {
		try {
			require_proxy_agents.setPacResolver(pacResolver);
			daemonAppServerLogger.info("PAC resolver installed (per-request resolveProxy via host bridge)");
		} catch (error) {
			daemonAppServerLogger.warn("install PAC resolver failed (non-fatal, falling back to env)", error);
		}
		try {
			pacRpcHandle = await require_log_acl_guard.startPacRpcService(pacResolver, { logger: {
				info: (msg) => daemonAppServerLogger.info(msg),
				warn: (msg) => daemonAppServerLogger.warn(msg)
			} });
			if (pacRpcHandle) {
				process.env[require_log_acl_guard.PAC_RPC_SOCKET_ENV] = pacRpcHandle.socketPath;
				process.env[require_log_acl_guard.PAC_RPC_TOKEN_ENV] = pacRpcHandle.token;
				daemonAppServerLogger.info(`PAC RPC service started: socket=${pacRpcHandle.socketPath} (token written to env)`);
			}
		} catch (error) {
			daemonAppServerLogger.warn("start PAC RPC service failed (non-fatal, CLI will skip L0)", error);
		}
	}
	try {
		const proxyEnv = await resolveDaemonProxyEnv();
		for (const [key, value] of Object.entries(proxyEnv)) {
			if (key === "NODE_OPTIONS") continue;
			if (typeof value === "string" && value.length > 0) process.env[key] = value;
		}
	} catch (error) {
		daemonAppServerLogger.warn("resolve daemon proxy env failed (non-fatal)", error);
	}
	require_proxy_agents.installUndiciProxyDispatcher();
	require_proxy_agents.installAxiosGlobalProxy();
	require_log_acl_guard.suppressTlsRejectWarning();
	try {
		if (require_code_cache.tryGetWorkbuddyBaseProductConfiguration()?.productFeatures?.[require_code_cache.ProductFeature.DisableTlsVerification]) require_log_acl_guard.disableTlsVerificationForProcess("bootstrap:daemon:product.json");
	} catch (error) {
		daemonAppServerLogger.warn("[TlsVerification] early bootstrap injection skipped (non-fatal)", error);
	}
	return pacRpcHandle;
}
async function resolveProductName(celljs) {
	const fromEnv = process.env.WORKBUDDY_PRODUCT_NAME?.trim();
	if (fromEnv) return fromEnv;
	try {
		const productName = (await celljs.productManager?.waitConfiguration?.())?.productName ?? celljs.productManager?.configuration?.productName;
		if (typeof productName === "string" && productName.trim()) return productName;
	} catch {}
	return "WorkBuddy";
}
//#endregion
exports.runDaemonAppServerEntry = runDaemonAppServerEntry;
