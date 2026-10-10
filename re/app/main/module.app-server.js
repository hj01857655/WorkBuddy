const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_credential_protection = require("./credential-protection.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_conversations = require("./conversations.js");
const require_tar$1 = require("./tar.js");
const require_adm_zip$1 = require("./adm-zip.js");
const require_handler_registry = require("./handler-registry.js");
const require_server_side_access_token = require("./server-side-access-token.js");
const require_file_authentication_storage = require("./file-authentication-storage.js");
const require_module_base = require("./module-base.js");
let fs = require("fs");
fs = require_rolldown_runtime.__toESM(fs);
let os = require("os");
os = require_rolldown_runtime.__toESM(os);
let path = require("path");
path = require_rolldown_runtime.__toESM(path);
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
node_fs_promises = require_rolldown_runtime.__toESM(node_fs_promises);
let node_os = require("node:os");
let util = require("util");
let child_process = require("child_process");
let crypto = require("crypto");
let fs_promises = require("fs/promises");
fs_promises = require_rolldown_runtime.__toESM(fs_promises);
//#region ../../packages/agent-provider/src/backend/local-custom-model-validation.ts
function isRecord$3(value) {
	return typeof value === "object" && value !== null;
}
/**
* 把可选的数字字段强转为 number。
* - number 且有限 → 原样返回
* - string去空格后能解析为有限数字 → 返回该数字（兼容 models.json 手改成 "10" 这类值）
* - 其它（undefined / 空串 / 非数字字符串 / NaN / Infinity）→ undefined
*/
function coerceOptionalNumber(value) {
	if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed === "") return;
		const parsed = Number(trimmed);
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
/**
* 校验 models.json 中的单条本地自定义模型配置是否合法。
*
* 设计要点（Issue #63318 一致性回归修复）：
* - id 必填且为非空字符串（作为 key / 请求参数）。
* - 数字字段（maxInputTokens/maxOutputTokens/temperature）放宽：
*   允许缺省、number，或“可解析为数字的字符串”（如手改 JSON 写成 "10"）。
*   真正无法解析的值（"abc" 等）才判非法。规范化强转由 {@link coerceOptionalNumber} 承担。
* - 字符串 / 布尔 / reasoning object 字段保持严格类型校验。
*
* Settings 面板与聊天/任务模型选择器（provider 侧）必须共用此函数，避免两侧过滤不对称。
*/
function isValidLocalCustomModel(model) {
	if (!isRecord$3(model)) return false;
	if (typeof model.id !== "string" || model.id.trim() === "") return false;
	const isTypeOrAbsent = (value, type) => {
		if (value === void 0) return true;
		if (type === "object") return isRecord$3(value);
		return typeof value === type;
	};
	const isNumericOrAbsent = (value) => value === void 0 || coerceOptionalNumber(value) !== void 0;
	return [
		"name",
		"vendor",
		"url",
		"apiKey"
	].every((field) => isTypeOrAbsent(model[field], "string")) && [
		"maxInputTokens",
		"maxOutputTokens",
		"temperature"
	].every((field) => isNumericOrAbsent(model[field])) && [
		"supportsToolCall",
		"supportsImages",
		"supportsReasoning",
		"onlyReasoning",
		"useCustomProtocol"
	].every((field) => isTypeOrAbsent(model[field], "boolean")) && isTypeOrAbsent(model.reasoning, "object");
}
//#endregion
//#region ../../packages/workbuddy-server/src/auth/external-link-authentication-provider.ts
var import_common$1 = require_code_cache.require_common$1();
require_code_cache.init_common();
require_code_cache.init_common$3();
require_code_cache.init_decorate();
var workbuddyAuthDevEnvProvider = {
	isOverrideEnabled: () => false,
	readDevEnv: () => void 0
};
function setWorkbuddyAuthDevEnvProvider(provider) {
	workbuddyAuthDevEnvProvider = provider;
}
var STAGING_SSO_DOMAIN_REWRITES = {
	"staging-sso.codebuddy.cn": "tencent.staging-sso.codebuddy.cn",
	"sso.copilot-staging.tencent.com": "tencent.sso.copilot-staging.tencent.com"
};
/** Prod → staging domain mapping for login URL fallback rewrite. */
var PROD_TO_STAGING_DOMAIN_REWRITES = {
	"www.codebuddy.cn": "staging.codebuddy.cn",
	"codebuddy.cn": "staging.codebuddy.cn",
	"copilot.tencent.com": "staging-copilot.tencent.com"
};
var WorkbuddyAccountScopedExternalLinkAuthenticationProvider = class WorkbuddyAccountScopedExternalLinkAuthenticationProvider extends require_code_cache.AccountScopedExternalLinkAuthenticationProvider {
	async createSession(ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.state.create", () => super.createSession(ctx));
	}
	async refreshSession(session, ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.session.refresh", () => super.refreshSession(session, ctx));
	}
	async switchAccount(account, authSession, ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.enterprise.switch", () => super.switchAccount(account, authSession, ctx));
	}
	async support(ctx) {
		return ctx?.type === require_code_cache.AuthenticationType.ACCOUNT_SCOPED_EXTERNAL_LINK || super.support(ctx);
	}
};
WorkbuddyAccountScopedExternalLinkAuthenticationProvider = require_code_cache.__decorate([(0, import_common$1.Component)(require_code_cache.AuthenticationProvider)], WorkbuddyAccountScopedExternalLinkAuthenticationProvider);
var WorkbuddyExternalLinkAuthenticationProvider = class WorkbuddyExternalLinkAuthenticationProvider extends require_code_cache.ExternalLinkAuthenticationProvider {
	async createSession(ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.state.create", () => super.createSession(ctx));
	}
	async refreshSession(session, ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.session.refresh", () => super.refreshSession(session, ctx));
	}
	async switchAccount(account, authSession, ctx) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("login.enterprise.switch", () => super.switchAccount(account, authSession, ctx));
	}
	async support(ctx) {
		if (ctx?.type) return ctx.type === require_code_cache.AuthenticationType.CLI_EXTERNAL_LINK;
		return (this.productManager.configuration.getValue()?.authentication?.type ?? require_file_authentication_storage.getWorkbuddyAuthenticationConfiguration()?.type) === require_code_cache.AuthenticationType.CLI_EXTERNAL_LINK;
	}
	async openAuthUrl(authState) {
		if (workbuddyAuthDevEnvProvider.isOverrideEnabled() && workbuddyAuthDevEnvProvider.readDevEnv() === "staging") try {
			const url = new URL(authState.authUrl);
			const stagingDomain = PROD_TO_STAGING_DOMAIN_REWRITES[url.hostname];
			if (stagingDomain) {
				url.hostname = stagingDomain;
				authState = {
					...authState,
					authUrl: url.toString()
				};
			}
			const rewrittenSso = STAGING_SSO_DOMAIN_REWRITES[url.hostname];
			if (rewrittenSso) {
				url.hostname = rewrittenSso;
				authState = {
					...authState,
					authUrl: url.toString()
				};
			}
		} catch {}
		return super.openAuthUrl(authState);
	}
};
WorkbuddyExternalLinkAuthenticationProvider = require_code_cache.__decorate([(0, import_common$1.Component)(require_code_cache.AuthenticationProvider)], WorkbuddyExternalLinkAuthenticationProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/auth/workbuddy-bootstrap-authentication-storage.ts
var import_common = require_code_cache.require_common();
require_code_cache.init_common$5();
require_code_cache.init_common$4();
require_code_cache.init_common();
require_code_cache.init_common$3();
require_code_cache.init_cli_product_env();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var ACC_PRODUCT_CONFIG_ENV_KEYS = ["ACC_PRODUCT_CONFIG_V3", "ACC_PRODUCT_CONFIG_V2"];
var BOOTSTRAP_FILE_STORAGE_PRIORITY = require_code_cache.AuthenticationStoragePriority.Heigh + 2;
var WorkbuddyBootstrapAuthenticationStorage = class WorkbuddyBootstrapAuthenticationStorage {
	get storeSessionSubject() {
		return this.fileAuthenticationStorage.storeSessionSubject;
	}
	async priority() {
		const authenticationType = this.getBootstrapAuthenticationType();
		if (!authenticationType || authenticationType === require_code_cache.AuthenticationType.CUSTOM_TOKEN) return require_code_cache.AuthenticationStoragePriority.Disabled;
		return BOOTSTRAP_FILE_STORAGE_PRIORITY;
	}
	async store(session, options) {
		await this.fileAuthenticationStorage.store(session, options);
	}
	async restore() {
		return this.fileAuthenticationStorage.restore();
	}
	async beginLogout() {
		return this.fileAuthenticationStorage.beginLogout();
	}
	async clean(options) {
		return this.fileAuthenticationStorage.clean(options);
	}
	getBootstrapAuthenticationType() {
		for (const key of ACC_PRODUCT_CONFIG_ENV_KEYS) {
			const value = require_code_cache.readAgentCliProductConfigJsonByKey(key);
			if (!value) continue;
			try {
				const config = JSON.parse(value);
				if (config.authentication?.type) return config.authentication.type;
			} catch {}
		}
	}
};
require_code_cache.__decorate([(0, import_common$1.Autowired)(require_file_authentication_storage.FileAuthenticationStorage), require_code_cache.__decorateMetadata("design:type", typeof require_file_authentication_storage.FileAuthenticationStorage === "undefined" ? Object : require_file_authentication_storage.FileAuthenticationStorage)], WorkbuddyBootstrapAuthenticationStorage.prototype, "fileAuthenticationStorage", void 0);
WorkbuddyBootstrapAuthenticationStorage = require_code_cache.__decorate([(0, import_common$1.Component)(require_code_cache.AuthenticationStorage)], WorkbuddyBootstrapAuthenticationStorage);
//#endregion
//#region ../../packages/workbuddy-server/src/auth/workbuddy-authentication-manager.ts
require_code_cache.init_common();
require_code_cache.init_decorate();
var workbuddyAuthSessionSyncer = () => void 0;
function setWorkbuddyAuthSessionSyncer(syncer) {
	workbuddyAuthSessionSyncer = syncer;
}
var WorkbuddyAuthenticationManager = class WorkbuddyAuthenticationManager extends require_code_cache.AuthenticationManagerImpl {
	/**
	* 同身份重复触发（token 刷新风暴）的去重不在这一层做——desktop coordinator 的
	* syncResolvedProduct 会用它自己的 getRemoteRefreshKey + TTL 吸收重复触发，
	* 去重与它保护的 /v3/config 拉取保持在同一层，身份维度只维护一份。
	*/
	async syncProductAfterSessionChange(session) {
		if (!session) return;
		await workbuddyAuthSessionSyncer(session);
	}
};
WorkbuddyAuthenticationManager = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.AuthenticationManager,
	rebind: true
})], WorkbuddyAuthenticationManager);
//#endregion
//#region ../../packages/workbuddy-server/src/runtime/userinfo-provider.ts
/**
* WorkBuddy app-server UserinfoProvider implementation.
*
* Lets @genie/telemetry's UserinfoEventProcessor read the current account from
* AuthenticationManager so EventService.report() events carry user identity
* fields consistently with the bundled agent-cli process.
*/
require_code_cache.init_common();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var WorkbuddyUserinfoProvider = class WorkbuddyUserinfoProvider {
	async provide() {
		const session = this.authenticationManager.currentSessionSubject.getValue();
		return {
			userId: session?.account.uid ?? "",
			userName: session?.account.nickname ?? "",
			userNickname: session?.account.nickname ?? "",
			enterpriseId: session?.account.enterpriseId,
			token: session?.auth.accessToken ?? "",
			enterprise: session?.account?.departmentFullName
		};
	}
};
require_code_cache.__decorate([(0, import_common$1.Autowired)(require_code_cache.AuthenticationManager), require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.AuthenticationManager === "undefined" ? Object : require_code_cache.AuthenticationManager)], WorkbuddyUserinfoProvider.prototype, "authenticationManager", void 0);
WorkbuddyUserinfoProvider = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.UserinfoProvider,
	rebind: true
})], WorkbuddyUserinfoProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/runtime/cloud-product-manager.ts
require_code_cache.init_common$3();
require_code_cache.init_decorate();
var WorkbuddyCloudProductManager = class WorkbuddyCloudProductManager extends require_code_cache.CloudProductManagerImpl {
	async fetch(url, endpoint) {
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("config.fetch", () => super.fetch(url, endpoint));
	}
	async fetchWithRetry(url, userId) {
		const route = require_log_acl_guard.getTrustedNetworkRoute();
		if (route?.mode === "active" && route.capabilities.configFailover) return;
		const parentOperationId = require_log_acl_guard.networkFailoverShadowObserver.currentOperation()?.operationId;
		return require_log_acl_guard.networkFailoverShadowObserver.runOperation("config.fetch", () => super.fetchWithRetry(url, userId), { parentOperationId });
	}
	async fetchFromRemote(url, userId, endpoint, timeoutMs = 5e3) {
		const operation = require_log_acl_guard.networkFailoverShadowObserver.currentOperation();
		const originalOrigin = endpoint ?? import_common$1.ContainerUtil.get(require_code_cache.ProductManager).getEndpoint();
		if (!operation || !originalOrigin) return super.fetchFromRemote(url, userId, endpoint, timeoutMs);
		return require_log_acl_guard.executeConfigOperation({
			operationId: operation.operationId,
			originalOrigin,
			deadlineMs: timeoutMs,
			send: (origin, remainingMs, options) => this.fetchFromRemoteOnce(url, userId, origin, remainingMs, options),
			validate: (value) => this.isPersistableProductConfiguration(value) ? "success" : "retryable_invalid"
		});
	}
	isPersistableProductConfiguration(data) {
		return Array.isArray(data.models) && data.models.length > 0;
	}
};
WorkbuddyCloudProductManager = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.CloudProductManager,
	rebind: true
})], WorkbuddyCloudProductManager);
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/cli/node-cli-entry.ts
require_code_cache.init_src();
async function packageDirectories(directory) {
	return (await (0, fs_promises.readdir)(directory, { withFileTypes: true })).filter((entry) => !entry.name.startsWith(".") && (entry.isDirectory() || entry.isSymbolicLink())).map((entry) => (0, path.join)(directory, entry.name));
}
/**
* Node 需要真实的 JS 入口。Unix 的 prefix/bin/<name> 是 npm symlink；Windows
* prefix 根目录的 <name> / .cmd / .ps1 是 shell shim，必须从已安装包的 bin 声明解析。
*/
async function resolveNodeCliEntry(prefix, binName) {
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(binName)) throw new Error(`Invalid Node CLI bin name: ${binName}`);
	if ((0, os.platform)() !== "win32") return (0, path.join)(prefix, "bin", binName);
	const modulesDir = (0, path.join)(prefix, "node_modules");
	const directories = await packageDirectories(modulesDir);
	const packages = (await Promise.all(directories.map((directory) => (0, path.relative)(modulesDir, directory).startsWith("@") ? packageDirectories(directory) : [directory]))).flat();
	const entries = (await Promise.all(packages.map(async (directory) => {
		let manifest;
		try {
			manifest = JSON.parse(await (0, fs_promises.readFile)((0, path.join)(directory, "package.json"), "utf8"));
		} catch (error) {
			if (error.code === "ENOENT") return;
			throw error;
		}
		const bin = typeof manifest.bin === "string" ? manifest.name?.split("/").pop() === binName ? manifest.bin : void 0 : manifest.bin?.[binName];
		if (typeof bin !== "string" || !bin) return;
		const entry = (0, path.resolve)(directory, bin);
		const localPath = (0, path.relative)(directory, entry);
		if (!localPath || (0, path.isAbsolute)(localPath) || localPath === ".." || localPath.startsWith(`..${path.sep}`)) throw new Error(`Node CLI ${binName} entry is outside its npm package: ${bin}`);
		return entry;
	}))).filter((entry) => entry !== void 0);
	if (entries.length !== 1) throw new Error(`Expected one installed npm entry for Node CLI ${binName}, found ${entries.length}`);
	return entries[0];
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/cli/python-runtime-env.ts
var import_semver = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_code_cache.require_semver());
var execFileAsync = (0, util.promisify)(child_process.execFile);
var VENV_VERSION_MISMATCH_CODE = "PYTHON_CONNECTOR_VENV_VERSION_MISMATCH";
var PYTHON_CLI_ENV_DIR = (0, path.join)((0, os.homedir)(), ".workbuddy", "binaries", "python", "envs", "default");
var PYTHON_CLI_PIP_CACHE_DIR = (0, path.join)((0, os.homedir)(), ".workbuddy", "binaries", "python", "cli-connector-cache");
var PythonCliVenvVersionMismatchError = class extends Error {
	constructor(venvDir, venvVersion, versionRange) {
		super(`Python CLI venv ${venvDir} uses Python ${venvVersion}, which does not satisfy runtime requirement ${versionRange}.`);
		this.venvDir = venvDir;
		this.venvVersion = venvVersion;
		this.versionRange = versionRange;
		this.code = VENV_VERSION_MISMATCH_CODE;
		this.name = "PythonCliVenvVersionMismatchError";
	}
};
function prependRuntimePath(env, paths) {
	const isWindows = (0, os.platform)() === "win32";
	const pathKeys = Object.keys(env).filter((key) => key.toLowerCase() === "path");
	const pathKey = isWindows ? [...pathKeys].sort()[0] ?? "Path" : "PATH";
	const existingSegments = (isWindows ? pathKeys : [pathKey]).flatMap((key) => (env[key] ?? "").split(path.delimiter));
	if (isWindows) {
		for (const key of pathKeys) if (key !== pathKey) delete env[key];
	}
	env[pathKey] = dedupePathSegments([...paths, ...existingSegments], isWindows).join(path.delimiter);
}
function dedupePathSegments(paths, isWindows) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const pathSegment of paths) {
		if (!pathSegment) continue;
		const key = normalizePathSegment(pathSegment, isWindows);
		if (seen.has(key)) continue;
		seen.add(key);
		result.push(pathSegment);
	}
	return result;
}
function normalizePathSegment(pathSegment, isWindows) {
	const normalized = pathSegment.replace(/[\\/]+$/, "");
	return isWindows ? normalized.toLowerCase() : normalized;
}
function getVenvBinDir(venvDir) {
	return (0, os.platform)() === "win32" ? (0, path.join)(venvDir, "Scripts") : (0, path.join)(venvDir, "bin");
}
function getVenvPython(venvDir) {
	return (0, os.platform)() === "win32" ? (0, path.join)(getVenvBinDir(venvDir), "python.exe") : (0, path.join)(getVenvBinDir(venvDir), "python");
}
function satisfiesVersionRange(version, versionRange) {
	if (versionRange === "*") return true;
	return import_semver.satisfies(import_semver.coerce(version) ?? version, versionRange, { includePrerelease: true });
}
async function readVenvVersion(venvDir) {
	const pyvenvCfg = (0, path.join)(venvDir, "pyvenv.cfg");
	try {
		return (await fs.promises.readFile(pyvenvCfg, "utf8")).match(/^version\s*=\s*(\S+)/m)?.[1];
	} catch {
		return;
	}
}
async function ensureVenv(pythonExecutable, venvDir, versionRange) {
	const existingVersion = await readVenvVersion(venvDir);
	if (existingVersion) {
		if (!satisfiesVersionRange(existingVersion, versionRange)) throw new PythonCliVenvVersionMismatchError(venvDir, existingVersion, versionRange);
		return;
	}
	await execFileAsync(pythonExecutable, [
		"-m",
		"venv",
		venvDir
	], {
		env: {
			...process.env,
			NODE_OPTIONS: ""
		},
		timeout: 3e5,
		windowsHide: true
	});
}
async function ensurePip(venvPython) {
	const execOptions = {
		env: {
			...process.env,
			NODE_OPTIONS: ""
		},
		timeout: 12e4,
		windowsHide: true
	};
	try {
		await execFileAsync(venvPython, [
			"-m",
			"pip",
			"--version"
		], execOptions);
		return;
	} catch {
		await execFileAsync(venvPython, [
			"-m",
			"ensurepip",
			"--upgrade"
		], execOptions);
	}
}
/**
* 在传入 env 上原地注入 Python runtime 相关变量：
*
* - `PATH` 前置 `<python/envs/default/bin>:<python-bin>:<原 PATH>`
* - `VIRTUAL_ENV` 指向 WorkBuddy 默认 Python venv
* - pip / Python 隔离变量，避免污染用户系统环境
*/
function applyPythonRuntimeEnv(env, runtime) {
	prependRuntimePath(env, [runtime.venvBinDir, runtime.pythonBinDir]);
	env.VIRTUAL_ENV = runtime.venvDir;
	env.PIP_CACHE_DIR = runtime.pipCacheDir;
	env.PIP_NO_INPUT = "1";
	env.PIP_DISABLE_PIP_VERSION_CHECK = "1";
	env.PYTHONUNBUFFERED = "1";
	env.PYTHONDONTWRITEBYTECODE = "1";
}
/**
* 调 binary-manager.ensure 准备 Python，并确保默认 venv 可用。
*
* 失败时直接抛错，由上层业务流程展示 runtime 准备失败；binary-manager 缺失
* 场景由调用方处理，以保持 CLI / stdio 的降级语义可独立演进。
*/
async function preparePythonRuntimeEnv(binaryManager, requirement, logger, options = {}) {
	const versionRange = requirement.versionRange ?? "*";
	const operationId = options.operationId ?? (0, crypto.randomUUID)();
	const notifier = require_tar$1.createRuntimeProgressNotifier(operationId, "python", versionRange, {
		silent: options.silent === true,
		send: options.send
	});
	if (binaryManager.isInstallingType("python")) notifier.preparing();
	let pythonInfo;
	try {
		pythonInfo = await binaryManager.ensure({
			type: "python",
			versionRange
		}, { onProgress: notifier.onProgress });
	} catch (err) {
		notifier.error(require_tar$1.classifyBinaryError(err));
		throw err;
	}
	const venvDir = options.venvDir ?? PYTHON_CLI_ENV_DIR;
	const pipCacheDir = options.pipCacheDir ?? PYTHON_CLI_PIP_CACHE_DIR;
	const venvBinDir = getVenvBinDir(venvDir);
	const venvPython = getVenvPython(venvDir);
	try {
		await ensureVenv(pythonInfo.executablePath, venvDir, versionRange);
		await ensurePip(venvPython);
		notifier.complete();
	} catch (err) {
		notifier.error(require_tar$1.classifyBinaryError(err));
		throw err;
	}
	const managedTag = pythonInfo.source === "managed" ? "[MANAGED-HIT] " : "";
	logger.info(`${managedTag}[PythonRuntimeEnv] Python runtime: source=${pythonInfo.source} version=${pythonInfo.version} python=${pythonInfo.executablePath} venv=${venvDir}`);
	return {
		pythonInfo: {
			type: pythonInfo.type,
			version: pythonInfo.version,
			source: pythonInfo.source,
			executablePath: pythonInfo.executablePath
		},
		pythonBinDir: (0, path.dirname)(pythonInfo.executablePath),
		venvDir,
		venvBinDir,
		venvPython,
		pipCacheDir
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-harness/cli/cli-runtime.ts
/**
* CLI 命令执行器
*
* 负责执行声明式 CLI 生命周期命令（init/auth/unAuth/status），准备托管
* Node/Python 运行时，以及从 auth 输出中提取授权信息。
*
* 安全说明：
* 此模块使用 exec/spawn + shell: true 执行命令。调用方必须保证配置来自受信任的
* 声明源，且不得把用户输入拼接进命令字符串。
* 需要 shell 特性是因为 CLI 配置中的命令可能包含管道、重定向等 shell 语法。
*/
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var execAsync = (0, util.promisify)(child_process.exec);
/**
* Node 22.18+ 会把未传 `filter` 的 `fs.cpSync` 目录复制切到原生快路径；该路径在
* Windows 中文用户目录的 verbatim path 上可能抛 EIO。给 `cpSync` 补一个恒真的
* filter 会让 Node 使用原有 JS 递归实现。通过 data URL preload 注入，避免在用户
* 目录落一个可被篡改的临时 shim 文件。
*
* 只在已经命中特征错误后的单次重试中启用，不影响正常 CLI 安装。
*/
var CP_SYNC_JS_FALLBACK_PRELOAD_SOURCE = [
	"import fs from'node:fs';",
	"const originalCpSync=fs.cpSync;",
	"fs.cpSync=(source,destination,options={})=>",
	"originalCpSync(source,destination,{...options,filter:options.filter??(()=>true)});"
].join("");
var CP_SYNC_JS_FALLBACK_NODE_OPTION = `--import=data:text/javascript;base64,${Buffer.from(CP_SYNC_JS_FALLBACK_PRELOAD_SOURCE).toString("base64")}`;
var DEFAULT_CLI_RUNTIME_HOST_CAPABILITIES = {
	openExternal: async () => {
		throw new Error("CliRuntime host capability openExternal is not available");
	},
	sendRuntimeProgress: () => {
		throw new Error("CliRuntime host capability sendRuntimeProgress is not available");
	}
};
/** 简单数字段版本比较：a >= b。默认提取仍是三段式；自定义 pattern 可支持 3.1.56.1 等多段版本。 */
function semverGte(a, b) {
	const pa = a.split(".").map(Number);
	const pb = b.split(".").map(Number);
	const maxLength = Math.max(pa.length, pb.length);
	for (let i = 0; i < maxLength; i++) {
		const va = pa[i] || 0;
		const vb = pb[i] || 0;
		if (va > vb) return true;
		if (va < vb) return false;
	}
	return true;
}
/**
* 把 cli.json `env` 字段合并进 env 对象，并展开占位符：
* - `$HOME` / `${HOME}` → `os.homedir()`（跨平台，含 Windows）
*
* 该函数在 buildCommandEnv 的所有返回路径最后一步调用，优先级低于
* PATH / npm_config_* 等由端侧计算的值，高于继承的 process.env。
*/
function applyCliConfigEnv(env, configEnv) {
	if (!configEnv) return;
	const home = (0, os.homedir)();
	for (const [key, raw] of Object.entries(configEnv)) env[key] = raw.replace(/\$\{HOME\}|\$HOME/g, home);
}
var CliRuntime = class CliRuntime {
	constructor() {
		this.hostCapabilities = DEFAULT_CLI_RUNTIME_HOST_CAPABILITIES;
		this.VERBATIM_PATH_EIO_USER_MESSAGE = "Windows 中文用户名兼容问题：CLI 安装脚本无法在包含非 ASCII 字符的用户目录下复制资源。已尝试兼容模式重装但仍失败，请升级到最新版本后重试或联系客服；临时可在纯英文用户名的 Windows 账户中连接。";
	}
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
	}
	/**
	* 获取当前平台对应的命令
	*/
	getPlatformCommand(commands) {
		return commands[(0, os.platform)()];
	}
	/**
	* 构造 CLI 命令的执行环境。
	*
	* 基础行为（所有 CLI 声明共享）：
	* - 继承 `process.env`
	* - 删除 `NODE_OPTIONS` / `NODE_DEBUG`（防止子进程继承调试配置，尤其是 --inspect
	*   会让 auth 命令把 inspector URL 错误地当成授权 URL）
	*
	* 如果声明了 `cliConfig.runtime.type === 'node'`，额外注入：
	* - 通过 binary-manager 的 `BinaryManager.ensure` 确保 Node.js 可用。
	*   binary-manager 内部优先复用满足版本要求的系统 Node，不满足时使用
	*   已下载的 managed Node（`~/.workbuddy/binaries/node/versions/<version>/`），
	*   都没有时从 COS 预加载源下载并安装。版本匹配由 binary-manager 处理，
	*   支持 `>=14` / `^18.0.0` / `20` / `20.x` / `*` 等写法。
	* - `PATH` 前置 `<cli-connector-packages-bin>:<node-bin>:<原 PATH>`，让 npm 刚装的
	*   全局 shim 和 Node/npm 可执行文件能被后续命令（如 `tmeet auth login`）找到。
	* - `npm_config_registry`：调用方自定义 > 默认腾讯云镜像。
	* - `npm_config_prefix`：指向 `~/.workbuddy/binaries/node/cli-connector-packages/`，
	*   让 `npm install -g` 的全局包落在 WorkBuddy 私有目录，不污染用户系统 npm global。
	*   目录与 Node 版本无关，升级 Node 版本时已装的 CLI 工具仍可用。
	* - `npm_config_cache`：指向 `~/.workbuddy/binaries/node/cli-connector-cache/`，
	*   与用户 `~/.npm` 隔离。
	*
	* 如果声明了 `cliConfig.runtime.type === 'python'`，则准备 managed Python
	* 和 WorkBuddy 默认 venv，并把 venv bin 注入 PATH，供 `pip install` 后的 CLI shim 使用。
	*
	* 未声明 runtime 字段时保持继承宿主环境的行为。
	*/
	async buildCommandEnv(cliConfig, options = {}, registry) {
		const env = { ...process.env };
		require_tar$1.stripDebugNodeOptions(env);
		if (!cliConfig.runtime) {
			applyCliConfigEnv(env, cliConfig.env);
			return env;
		}
		if (!this.binaryManager) {
			this.logger.warn(`[CliRuntime] CLI requires ${cliConfig.runtime.type} runtime but BinaryManager is not available; falling back to inherited PATH`);
			applyCliConfigEnv(env, cliConfig.env);
			return env;
		}
		switch (cliConfig.runtime.type) {
			case "node": {
				const runtime = await require_tar$1.prepareNodeRuntimeEnv(this.binaryManager, {
					versionRange: cliConfig.runtime.version ?? "*",
					registry: registry ?? cliConfig.npmRegistry
				}, this.logger, {
					silent: options.silent === true,
					send: this.hostCapabilities.sendRuntimeProgress,
					operationId: options.runtimeOperationId
				});
				require_tar$1.applyNodeRuntimeEnv(env, runtime);
				break;
			}
			case "python": applyPythonRuntimeEnv(env, await preparePythonRuntimeEnv(this.binaryManager, { versionRange: cliConfig.runtime.version ?? "*" }, this.logger, {
				silent: options.silent === true,
				send: this.hostCapabilities.sendRuntimeProgress,
				operationId: options.runtimeOperationId
			}));
		}
		applyCliConfigEnv(env, cliConfig.env);
		return env;
	}
	/**
	* 从 cli.json 的命令字符串中解析出"第一个 token"（可执行文件名），并忽略
	* 后续的参数。需要正确处理引号与反斜杠转义，避免把含空格 / 引号的路径拆坏，
	* 也防止 cli.json 被篡改时把管道、分号、命令替换等 shell 元字符混进 `which`
	* 检查命令里（shell 注入保护）。
	*
	* 支持的语法（POSIX 兼容子集，足够覆盖 cli.json 配置场景）：
	*   - 单引号：`'foo bar'` → `foo bar`（内部字面，反斜杠不转义）
	*   - 双引号：`"foo bar"` → `foo bar`（支持 `\"`、`\\` 转义）
	*   - 反斜杠：在未加引号处转义下一个字符
	*   - 空白或 shell 元字符（`|`、`;`、`&`、`>` 等）视为 token 结束
	*
	* 返回 null 表示命令非法或无法解析出可执行文件。
	*/
	extractExecutable(cmd) {
		const chars = cmd.trim();
		if (!chars) return null;
		let token = "";
		let i = 0;
		let quote = null;
		while (i < chars.length) {
			const ch = chars[i];
			if (quote === "'") {
				if (ch === "'") quote = null;
				else token += ch;
				i++;
				continue;
			}
			if (quote === "\"") {
				if (ch === "\\" && i + 1 < chars.length) {
					const next = chars[i + 1];
					if (next === "\\" || next === "\"") {
						token += next;
						i += 2;
						continue;
					}
					token += ch;
					i++;
					continue;
				}
				if (ch === "\"") {
					quote = null;
					i++;
					continue;
				}
				token += ch;
				i++;
				continue;
			}
			if (/\s/.test(ch) || "|;&<>()`$".includes(ch)) break;
			if (ch === "\\" && i + 1 < chars.length) {
				token += chars[i + 1];
				i += 2;
				continue;
			}
			if (ch === "'" || ch === "\"") {
				quote = ch;
				i++;
				continue;
			}
			token += ch;
			i++;
		}
		if (quote !== null) return null;
		return token || null;
	}
	/**
	* 对单个参数做 shell 转义，让它可以安全地拼到 `/bin/sh -c <cmd>` 字符串里。
	* 用单引号包裹，内部的单引号替换为 `'\''` 闭合+转义+再开的经典模式。
	* Windows 下 `where` 走 cmd.exe，简单用双引号包裹 + 转义双引号。
	*/
	quoteForShell(value, isWindows) {
		if (isWindows) return `"${value.replace(/"/g, "\\\"")}"`;
		return `'${value.replace(/'/g, "'\\''")}'`;
	}
	/**
	* 检查 CLI 工具是否已安装
	* 通过 which（Unix）/ where（Windows）检测
	*/
	async isCliInstalled(cliConfig, options = {}) {
		const firstAuthCmd = this.normalizeAuthSteps(cliConfig)[0]?.command;
		const statusCmd = this.getPlatformCommand(firstAuthCmd ?? {}) || this.getPlatformCommand(cliConfig.status ?? {});
		if (!statusCmd) return false;
		const executable = this.extractExecutable(statusCmd);
		if (!executable) {
			this.logger.warn(`[CliRuntime] Unable to parse executable name from command: ${statusCmd}`);
			return false;
		}
		const isWindows = (0, os.platform)() === "win32";
		const quoted = this.quoteForShell(executable, isWindows);
		const checkCmd = isWindows ? `where ${quoted}` : `which ${quoted}`;
		try {
			const env = await this.buildCommandEnv(cliConfig, options);
			this.logger.info(`[CliRuntime] isCliInstalled: platform=${(0, os.platform)()} checkCmd=${checkCmd} windowsHide=true`);
			await execAsync(checkCmd, {
				timeout: 5e3,
				env,
				windowsHide: true
			});
			return true;
		} catch (error) {
			this.logCommandFailure(checkCmd, {
				success: false,
				stdout: error.stdout ?? "",
				stderr: error.stderr ?? error.message,
				exitCode: error.code ?? -1
			}, {
				ownerId: options.ownerId ?? options.connectorId,
				phase: "installation-check"
			});
			return false;
		}
	}
	/**
	* 执行安装命令（支持多源 fallback）
	*
	* 按 registry 优先级依次尝试安装；仅网络类错误（FETCH_ERROR / ETIMEDOUT / TLS 校验失败等）
	* 触发 fallback，其他错误（如包不存在）直接返回。
	*/
	async runInstall(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.init);
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No init command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const registries = this.resolveRegistries(cliConfig);
		const installNotifier = require_tar$1.createCliInstallProgressNotifier((0, crypto.randomUUID)(), cliConfig.runtime?.type ?? "unknown", {
			silent: options.silent === true,
			send: this.sendRuntimeProgressSafely.bind(this)
		});
		let installStarted = false;
		let lastResult;
		try {
			for (let i = 0; i < registries.length; i++) {
				const registry = registries[i];
				this.logger.info(`[CliRuntime] Running install: ${cmd} (registry=${registry}, attempt ${i + 1}/${registries.length})`);
				const env = await this.buildCommandEnv(cliConfig, options, registry);
				if (!installStarted) {
					installStarted = true;
					installNotifier.start();
				}
				lastResult = await this.executeCommand(cmd, {
					timeout: 3e5,
					env,
					ownerId: options.ownerId ?? options.connectorId,
					phase: "install"
				});
				if (lastResult.success) {
					installNotifier.complete();
					return lastResult;
				}
				const output = `${lastResult.stderr}\n${lastResult.stdout}`;
				if (!this.isNetworkError(output) || i === registries.length - 1) break;
				this.logger.info(`[CliRuntime] Install failed with registry ${registry}, trying next...`);
			}
		} catch (err) {
			if (installStarted) installNotifier.error(require_tar$1.classifyBinaryError(err));
			throw err;
		}
		if (lastResult && !lastResult.success) {
			const recovered = await this.tryRecoverVerbatimPathEio(lastResult, cliConfig, options);
			if (recovered) {
				if (installStarted) {
					if (recovered.success) installNotifier.complete();
					else installNotifier.error(this.classifyInstallFailure(recovered));
				}
				return recovered;
			}
		}
		if (installStarted) installNotifier.error(this.classifyInstallFailure(lastResult));
		return lastResult;
	}
	classifyInstallFailure(result) {
		const output = `${result?.stderr ?? ""}\n${result?.stdout ?? ""}`.trim();
		return {
			code: output && this.isNetworkError(output) ? "network" : "generic",
			message: output || "CLI install command failed"
		};
	}
	sendRuntimeProgressSafely(channel, payload) {
		try {
			this.hostCapabilities.sendRuntimeProgress(channel, payload);
		} catch (error) {
			this.logger.warn(`[CliRuntime] sendRuntimeProgress failed: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
	/**
	* 从 npm postinstall 的 EIO 错误串里解析出触发崩溃的目标目录路径。
	*
	* 匹配 `EIO ... '\\?\C:\Users\程\.agents\skills\dws\references'` 这种
	* Windows verbatim（`\\?\`）长路径前缀 + `.agents\skills` 目录家族的签名。
	* 命中返回去掉 `\\?\` 前缀后的真实路径（仅用于诊断日志）；不命中返回 null。
	*/
	extractVerbatimPathEioTarget(output) {
		if ((0, os.platform)() !== "win32") return null;
		const match = output.match(/EIO[^']*'(\\\\\?\\[^']*[\\/]\.agents[\\/]skills[\\/][^']*)'/i);
		if (!match) return null;
		return match[1].replace(/^\\\\\?\\/, "");
	}
	/**
	* EIO verbatim path 兜底恢复：强制 cpSync 使用 JS 递归实现后重试一次 install。
	*
	* Node 22.18+ 的 fs.cpSync 在未提供 filter 时会走原生目录复制快路径；提供恒真 filter
	* 不改变复制语义，但会回到兼容性更好的 JS 路径。preload 由 NODE_OPTIONS 传给 npm
	* 及其 postinstall Node 子进程。
	*
	* @returns 恢复成功（兼容模式重试成功）返回新结果；识别到签名但重试仍失败，返回带友好错误串的
	*   失败结果；未识别到该签名返回 null（交回原始失败结果）。
	*/
	async tryRecoverVerbatimPathEio(failed, cliConfig, options) {
		const output = `${failed.stderr}\n${failed.stdout}`;
		const target = this.extractVerbatimPathEioTarget(output);
		if (!target) return null;
		const cmd = this.getPlatformCommand(cliConfig.init);
		if (!cmd) return null;
		this.logger.warn(`[CliRuntime] Detected Windows verbatim-path EIO during install (issue #68810), retrying once with fs.cpSync JS fallback: ${target}`);
		const registry = this.resolveRegistries(cliConfig)[0];
		const env = await this.buildCommandEnv(cliConfig, options, registry);
		env.NODE_OPTIONS = [env.NODE_OPTIONS, CP_SYNC_JS_FALLBACK_NODE_OPTION].filter(Boolean).join(" ");
		const retry = await this.executeCommand(cmd, {
			timeout: 3e5,
			env,
			ownerId: options.ownerId ?? options.connectorId,
			phase: "install-retry-verbatim-path-eio"
		});
		if (retry.success) {
			this.logger.info("[CliRuntime] Install succeeded with fs.cpSync JS fallback (issue #68810)");
			return retry;
		}
		this.logger.warn("[CliRuntime] Install still failed with fs.cpSync JS fallback (issue #68810)");
		return {
			...retry,
			stderr: this.VERBATIM_PATH_EIO_USER_MESSAGE
		};
	}
	/**
	* 确定 npm registry 尝试顺序。
	* 优先级：npmRegistries（多源）> npmRegistry（单源）> 内置默认列表。
	*/
	resolveRegistries(cliConfig) {
		if (cliConfig.npmRegistries?.length) return cliConfig.npmRegistries;
		if (cliConfig.npmRegistry) return [cliConfig.npmRegistry];
		return [...require_tar$1.DEFAULT_NPM_REGISTRIES];
	}
	/**
	* 判断 npm 错误输出是否属于网络类错误（值得换源重试）。
	*/
	isNetworkError(output) {
		return [
			"FETCH_ERROR",
			"ETIMEDOUT",
			"ECONNREFUSED",
			"ENOTFOUND",
			"EAI_AGAIN",
			"ECONNRESET",
			"UNABLE_TO_VERIFY_LEAF_SIGNATURE",
			"SELF_SIGNED_CERT_IN_CHAIN",
			"DEPTH_ZERO_SELF_SIGNED_CERT",
			"UNABLE_TO_GET_ISSUER_CERT",
			"CERT_HAS_EXPIRED",
			"ERR_TLS_CERT_ALTNAME_INVALID",
			"socket hang up",
			"invalid json response body"
		].some((p) => output.includes(p));
	}
	/**
	* 把 `cliConfig.auth` 归一化为 `CliAuthStep[]`。
	*
	* - 老写法（单对象）→ 包成单步数组，继承顶层所有字段（由 resolveStepConfig 负责）
	* - 新写法（数组）→ 直接返回
	* - undefined → 返回空数组
	*
	* 该归一化让下游逻辑（runAuth 循环、isCliInstalled 取第一步 command）统一按数组处理，
	* 且对外仍然保持兼容老 cli.json 配置。
	*/
	normalizeAuthSteps(cliConfig) {
		const auth = cliConfig.auth;
		if (!auth) return [];
		if (Array.isArray(auth)) return auth;
		return [{ command: auth }];
	}
	/**
	* 把单步 auth 配置与顶层 `CliConfig` 合并，解析出本步实际生效的行为配置。
	*
	* step 显式填写的字段优先，未填则继承顶层。这样多步模式既能共用顶层默认（配置少写），
	* 又能 per-step 精细覆盖（如两步用不同的 `authUrlDomain`）。
	*/
	resolveStepConfig(step, cliConfig) {
		return {
			command: step.command,
			authWaitForExit: step.authWaitForExit ?? cliConfig.authWaitForExit,
			authUrlDomain: step.authUrlDomain ?? cliConfig.authUrlDomain,
			authSuppressBrowser: step.authSuppressBrowser ?? cliConfig.authSuppressBrowser,
			authDeviceFlow: step.authDeviceFlow ?? cliConfig.authDeviceFlow
		};
	}
	/**
	* 执行认证命令
	*
	* 支持两种写法：
	* - 单步（`cliConfig.auth` 为对象）：行为等同历史版本。
	* - 多步（`cliConfig.auth` 为 `CliAuthStep[]`）：按数组顺序依次执行每一步，
	*   每步独立 spawn + 抓 URL + 等退出，任一步失败立即返回（后续步骤不再执行）。
	*   用于需要多次浏览器授权的 CLI（如飞书 lark-cli 的 `config init --new` + `auth login`）。
	*
	* 内核逻辑（URL 监听 / `authWaitForExit` / `authUrlDomain` / `authQrModal` /
	* `authSuppressBrowser`）见 `runAuthStep`。
	*
	* 失败自愈（issue #89703）：失败输出命中 `cliConfig.authFailureCleanup.errorPattern`
	* 时说明本地缓存的授权配置已在平台侧失效（如飞书自建应用被删除、`skipIf` 又跳过了
	* 重建），此时执行 `unAuth` 清理本地配置，并默认自动重试一次完整 auth 流程。
	*/
	async runAuth(cliConfig, options = {}, signal) {
		const firstResult = await this.runAuthSteps(cliConfig, options, signal);
		if (firstResult.success || firstResult.cancelled || signal?.aborted) return firstResult;
		if (!this.shouldRunAuthFailureCleanup(cliConfig, firstResult)) return firstResult;
		this.logger.info("[CliRuntime] authFailureCleanup: auth failure matched errorPattern, running unAuth to clear stale local config");
		const unAuthResult = await this.runUnAuth(cliConfig, options);
		this.logger.info(`[CliRuntime] authFailureCleanup: unAuth finished success=${unAuthResult.success} exitCode=${unAuthResult.exitCode}`);
		if (cliConfig.authFailureCleanup?.retry === false) return firstResult;
		if (signal?.aborted) return {
			success: false,
			stdout: "",
			stderr: "Cancelled by user",
			exitCode: -1,
			cancelled: true
		};
		this.logger.info("[CliRuntime] authFailureCleanup: retrying auth once after cleanup");
		return this.runAuthSteps(cliConfig, options, signal);
	}
	/**
	* 判断本次 auth 失败是否应触发 `authFailureCleanup` 清理。
	*
	* 三个门槛缺一不可：配置了 errorPattern、配置了 unAuth（否则无从清理）、
	* 失败输出命中 errorPattern。正则非法按未配置处理（marketplace 脏数据不致命）。
	*/
	shouldRunAuthFailureCleanup(cliConfig, result) {
		const cleanup = cliConfig.authFailureCleanup;
		if (!cleanup?.errorPattern || !cliConfig.unAuth) return false;
		let pattern;
		try {
			pattern = new RegExp(cleanup.errorPattern);
		} catch {
			this.logger.warn(`[CliRuntime] authFailureCleanup: invalid errorPattern, skipping cleanup: ${cleanup.errorPattern}`);
			return false;
		}
		return pattern.test(`${result.stdout}\n${result.stderr}`);
	}
	/**
	* 依序执行全部 auth 步骤（`runAuth` 的单轮执行体，不含失败自愈）。
	*/
	async runAuthSteps(cliConfig, options = {}, signal) {
		const steps = this.normalizeAuthSteps(cliConfig);
		if (steps.length === 0) return {
			success: false,
			stdout: "",
			stderr: `No auth command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const env = await this.buildCommandEnv(cliConfig, options);
		let lastResult;
		for (let i = 0; i < steps.length; i++) {
			if (signal?.aborted) return {
				success: false,
				stdout: "",
				stderr: "Cancelled by user",
				exitCode: -1,
				cancelled: true
			};
			const step = steps[i];
			const effective = this.resolveStepConfig(step, cliConfig);
			const cmd = this.getPlatformCommand(effective.command);
			if (!cmd) return {
				success: false,
				stdout: "",
				stderr: `No auth command for platform ${(0, os.platform)()} at step ${i + 1}/${steps.length}`,
				exitCode: -1
			};
			if (step.skipIf) {
				const skipCmd = this.getPlatformCommand(step.skipIf);
				if (skipCmd) try {
					await execAsync(skipCmd, {
						timeout: 1e4,
						env,
						windowsHide: true
					});
					this.logger.info(`[CliRuntime] skipIf passed (exit 0), skipping auth step ${i + 1}/${steps.length}: ${cmd}`);
					continue;
				} catch {}
			}
			if (steps.length > 1) this.logger.info(`[CliRuntime] Running auth step ${i + 1}/${steps.length}: ${cmd}`);
			else this.logger.info(`[CliRuntime] Running auth: ${cmd}`);
			lastResult = await this.runAuthStep(cmd, env, effective, cliConfig, options, signal);
			if (!lastResult.success) return lastResult;
		}
		return lastResult;
	}
	/**
	* 执行单步认证命令（runAuth 的实际内核）。
	*
	* 使用 spawn 启动子进程，实时监听 stdout/stderr，检测到 URL 后根据模式处理：
	*
	* **默认模式**（`effective.authWaitForExit` 未设置或为 false）：
	* 检测到 URL 后立即 kill 子进程并返回，适合"URL 即入口、回调由浏览器处理"场景。
	*
	* **等待退出模式**（`effective.authWaitForExit: true`）：
	* 检测到 URL 后打开浏览器，但保持子进程运行，等待其自然退出。
	* 适合 CLI 工具在 URL 输出后继续阻塞等待扫码、扫码完成后自行写入凭证并退出的场景
	* （如 wecom-cli init --noninteractive、lark-cli 两步授权）。超时扩大为 5 分钟。
	*
	* **Device Flow 模式**（`effective.authDeviceFlow` 配置 + `options.onDeviceCode` 回调）：
	* 用 `uriPattern` / `codePattern` 解析 stdout/stderr 中的 verification URL 和 user code，
	* 通过 `options.onDeviceCode` 推送给调用方。强制走"等待退出"行为：CLI 子进程保持存活
	* 直到自身完成 token 轮询并退出（exit 0 = 成功，非 0 = 失败/取消）。
	* 用户主动取消通过 `signal` AbortSignal 传入（与普通 connect 取消复用同一通道）。
	*
	* QR 弹窗（`cliConfig.authQrModal`）仅在单步模式下生效；调用方通过 `options.onQrUrl`
	* 传入才会走该分支。
	*/
	async runAuthStep(cmd, env, effective, cliConfig, options, signal) {
		const deviceFlowEnabled = !!(effective.authDeviceFlow && options.onDeviceCode);
		const tmeetAuthWaitForExit = effective.authWaitForExit === void 0 && /(?:^|[\\/"'])tmeet(?:\.cmd)?(?:["']?\s+)auth\s+login(?:\s|$)/i.test(cmd);
		const waitForExit = effective.authWaitForExit === true || deviceFlowEnabled || tmeetAuthWaitForExit;
		const timeoutMs = waitForExit ? 3e5 : 1e4;
		return new Promise((resolve) => {
			let resolved = false;
			let urlOpened = false;
			let deviceCodeReported = false;
			if (signal?.aborted) {
				resolve({
					success: false,
					stdout: "",
					stderr: "Cancelled by user",
					exitCode: -1,
					cancelled: true
				});
				return;
			}
			this.logger.info(`[CliRuntime] runAuth spawn: platform=${(0, os.platform)()} cmd=${cmd} shell=true windowsHide=true deviceFlow=${deviceFlowEnabled}`);
			const child = (0, child_process.spawn)(cmd, {
				shell: true,
				timeout: timeoutMs,
				env,
				windowsHide: true
			});
			let stdout = "";
			let stderr = "";
			const onAbort = () => {
				if (resolved) return;
				resolved = true;
				this.logger.info(`[CliRuntime] runAuth aborted by user, terminating child process tree pid=${child.pid}`);
				this.terminateAuthProcess(child);
				resolve({
					success: false,
					stdout,
					stderr,
					exitCode: -1,
					cancelled: true
				});
			};
			signal?.addEventListener("abort", onAbort, { once: true });
			const cleanupAbortListener = () => signal?.removeEventListener("abort", onAbort);
			const authUrlDomain = effective.authUrlDomain;
			const deviceFlowConfig = effective.authDeviceFlow;
			const tryHandleDeviceFlow = (text, source) => {
				if (deviceCodeReported || !deviceFlowConfig || !options.onDeviceCode) return;
				const info = this.extractDeviceFlowInfo(text, deviceFlowConfig);
				if (!info) return;
				deviceCodeReported = true;
				this.logger.info(`[CliRuntime] Device flow info found in ${source}: uri=${info.verificationUri} hasCode=${!!info.userCode}`);
				options.onDeviceCode(info);
				if (!(effective.authSuppressBrowser === true || options.suppressBrowser)) Promise.resolve(this.hostCapabilities.openExternal(info.verificationUri)).catch((error) => {
					this.logger.warn(`[CliRuntime] Failed to open device flow URL: ${error instanceof Error ? error.message : String(error)}`);
				});
			};
			const tryHandleUrl = (text, source) => {
				if (urlOpened) return;
				if (deviceFlowEnabled) return;
				const url = this.extractAuthUrl(text, authUrlDomain);
				if (!url) return;
				urlOpened = true;
				this.logger.info(`[CliRuntime] Auth URL found in ${source}: ${url}`);
				if (options.onQrUrl) options.onQrUrl(url);
				else if (effective.authSuppressBrowser === true || options.suppressBrowser) {} else Promise.resolve(this.hostCapabilities.openExternal(url)).catch((error) => {
					this.logger.warn(`[CliRuntime] Failed to open auth URL: ${error instanceof Error ? error.message : String(error)}`);
				});
				if (!waitForExit) {
					resolved = true;
					cleanupAbortListener();
					this.terminateAuthProcess(child);
					resolve({
						success: true,
						stdout,
						stderr,
						exitCode: 0,
						authUrl: url
					});
				}
			};
			child.stdout?.on("data", (data) => {
				stdout += data.toString();
				tryHandleDeviceFlow(stdout, "stdout");
				tryHandleUrl(stdout, "stdout");
			});
			child.stderr?.on("data", (data) => {
				stderr += data.toString();
				tryHandleDeviceFlow(stderr, "stderr");
				tryHandleUrl(stderr, "stderr");
			});
			child.on("close", (code) => {
				if (!resolved) {
					resolved = true;
					cleanupAbortListener();
					const result = {
						success: code === 0,
						stdout,
						stderr,
						exitCode: code ?? -1,
						authUrl: urlOpened ? this.extractAuthUrl(stdout + stderr, authUrlDomain) : void 0
					};
					if (!result.success) this.logCommandFailure(cmd, result, {
						ownerId: options.ownerId ?? options.connectorId,
						phase: "auth"
					});
					resolve(result);
				}
			});
			child.on("error", (error) => {
				if (!resolved) {
					resolved = true;
					cleanupAbortListener();
					const result = {
						success: false,
						stdout,
						stderr: error.message,
						exitCode: -1
					};
					this.logCommandFailure(cmd, result, {
						ownerId: options.ownerId ?? options.connectorId,
						phase: "auth"
					});
					resolve(result);
				}
			});
		});
	}
	terminateAuthProcess(child) {
		if (process.platform === "win32" && child.pid) {
			(0, child_process.spawn)("taskkill", [
				"/pid",
				String(child.pid),
				"/T",
				"/F"
			], {
				env: {
					...process.env,
					NODE_OPTIONS: ""
				},
				windowsHide: true,
				stdio: "ignore"
			}).on("error", (error) => {
				this.logger.warn(`[CliRuntime] taskkill failed for pid=${child.pid}: ${error instanceof Error ? error.message : String(error)}`);
				try {
					child.kill();
				} catch {}
			});
			return;
		}
		try {
			child.kill();
		} catch {}
	}
	/**
	* 用该 CLI 的托管运行时执行一条**只读查询**，参数按 argv 传入。
	*
	* 与 runInstall / runAuth / runStatus 的区别：那几条命令逐字来自 cli.json 声明，
	* 走 `exec` + shell；这里的参数含调用方拼进去的业务值（仓库名、编号），所以必须
	* `execFile` + argv，不经 shell —— 一个 `;` 就是命令注入面。
	*
	* 执行方式是 `process.execPath + 脚本路径`，不是 `execFile('<bin>')`：
	* - 生产包主进程 PATH 只有 /usr/bin:/bin，解析不到 CLI 脚本 shebang 里的 node；
	*   而 daemon 自己就是 `process.execPath` + `ELECTRON_RUN_AS_NODE=1` 起来的，
	*   那就是一个完整 Node 运行时。
	* - Windows 的 npm shim 位于 prefix 根目录，且不是 JS。按已安装包的 bin 声明
	*   解析真实脚本；Unix 继续使用 prefix/bin 下的 npm symlink。
	*
	* 只支持 `runtime.type === 'node'` 的 CLI：非 Node CLI 装出来的不是可直接喂给
	* Node 的脚本，与其猜一个执行方式，不如明确不支持。
	*/
	async runNodeQuery(cliConfig, binName, args, options = {}) {
		if (cliConfig.runtime?.type !== "node") return {
			success: false,
			stdout: "",
			stderr: `runNodeQuery only supports node CLIs, got ${cliConfig.runtime?.type ?? "none"}`,
			exitCode: -1
		};
		let scriptPath = binName;
		const execFileAsync = (0, util.promisify)(child_process.execFile);
		try {
			scriptPath = await resolveNodeCliEntry(require_tar$1.CLI_PACKAGES_DIR, binName);
			const env = await this.buildCommandEnv(cliConfig, options);
			const { stdout, stderr } = await execFileAsync(process.execPath, [scriptPath, ...args], {
				timeout: options.timeoutMs ?? 15e3,
				env: {
					...env,
					...options.env,
					ELECTRON_RUN_AS_NODE: "1"
				},
				windowsHide: true
			});
			return {
				success: true,
				stdout,
				stderr,
				exitCode: 0
			};
		} catch (error) {
			const result = {
				success: false,
				stdout: error?.stdout ?? "",
				stderr: error?.stderr ?? error?.message ?? "",
				exitCode: typeof error?.code === "number" ? error.code : -1
			};
			this.logCommandFailure(`${scriptPath} ${args.join(" ")}`, result, {
				ownerId: options.ownerId ?? options.connectorId,
				phase: "query"
			});
			return result;
		}
	}
	/**
	* 执行状态检查命令
	*
	* 以 exit code === 0 判断是否已连接。
	* 若 cliConfig.statusMatch 存在，还需匹配 stdout 内容。
	*/
	async runStatus(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.status ?? {});
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No status command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const env = await this.buildCommandEnv(cliConfig, options);
		const result = await this.executeCommand(cmd, {
			timeout: 1e4,
			env,
			ownerId: options.ownerId ?? options.connectorId,
			phase: "status",
			suppressFailureLog: options.suppressFailureLog
		});
		if (result.exitCode === 0 && cliConfig.statusMatchJson) try {
			const parsed = JSON.parse(result.stdout);
			result.success = Object.entries(cliConfig.statusMatchJson).every(([key, expected]) => String(parsed[key]) === expected);
			this.logger.info(`[CliRuntime] runStatus: statusMatchJson=${JSON.stringify(cliConfig.statusMatchJson)}, matched=${result.success}`);
		} catch {
			result.success = false;
			this.logger.info("[CliRuntime] runStatus: statusMatchJson parse failed, matched=false");
		}
		else if (result.exitCode === 0 && cliConfig.statusMatch) {
			const regex = new RegExp(cliConfig.statusMatch);
			const combinedOutput = result.stdout + result.stderr;
			result.success = regex.test(combinedOutput);
			this.logger.info(`[CliRuntime] runStatus: statusMatch="${cliConfig.statusMatch}", matched=${result.success}`);
		}
		return result;
	}
	/**
	* 检查 CLI 版本是否满足最低要求。
	*
	* 跑 `versionCheck.command`，用正则提取版本号，semver 比较 >= minVersion。
	* 无 versionCheck 配置时直接返回 `{ needsUpgrade: false }`。
	*
	* 退出码非 0 时通过 `classifyCliExit` 区分（issue #67596）：
	* - CLI 进程真跑起来了但 exit≠0 → `executionFailed: true`，上层展示执行异常，不再误触发升级。
	* - Windows 系统级启动失败（如 0xC0000135 DLL 缺失）/ 被 EDR 杀 / 命令没找到 →
	*   `startupFailed: true`，上层不再 auto-upgrade（对启动失败 100% 无效），转诊断向错误。
	*/
	async checkVersion(cliConfig, options = {}) {
		const check = cliConfig.versionCheck;
		if (!check) return { needsUpgrade: false };
		const cmd = this.getPlatformCommand(check.command);
		if (!cmd) return { needsUpgrade: false };
		const env = await this.buildCommandEnv(cliConfig, options);
		try {
			const result = await this.executeCommand(cmd, {
				timeout: 1e4,
				env,
				ownerId: options.ownerId ?? options.connectorId,
				phase: "version-check"
			});
			if (result.exitCode !== 0) {
				if (require_tar$1.classifyCliExit(result.exitCode) === "startup-failed") {
					this.logger.warn(`[CliRuntime] checkVersion: CLI startup failed cmd=${cmd} exitCode=${require_tar$1.formatExitCodeHex(result.exitCode)} (${result.exitCode}) stderr=${result.stderr.slice(0, 200)}`);
					return {
						needsUpgrade: false,
						executionFailed: true,
						startupFailed: true,
						exitCode: result.exitCode
					};
				}
				this.logger.info(`[CliRuntime] checkVersion: command exited ${result.exitCode}, treating as execution failure`);
				return {
					needsUpgrade: false,
					executionFailed: true,
					exitCode: result.exitCode
				};
			}
			const pattern = new RegExp(check.versionPattern || "(\\d+\\.\\d+\\.\\d+)");
			const match = result.stdout.match(pattern) || result.stderr.match(pattern);
			if (!match?.[1]) {
				this.logger.info("[CliRuntime] checkVersion: could not extract version from output");
				return { needsUpgrade: true };
			}
			const currentVersion = match[1];
			const needsUpgrade = !semverGte(currentVersion, check.minVersion);
			this.logger.info(`[CliRuntime] checkVersion: current=${currentVersion}, min=${check.minVersion}, needsUpgrade=${needsUpgrade}`);
			return {
				needsUpgrade,
				currentVersion
			};
		} catch (err) {
			this.logger.warn("[CliRuntime] checkVersion failed:", err);
			return {
				needsUpgrade: false,
				executionFailed: true,
				exitCode: -1
			};
		}
	}
	/**
	* 执行取消认证命令
	*/
	async runUnAuth(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.unAuth ?? {});
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No unAuth command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		this.logger.info(`[CliRuntime] Running unAuth: ${cmd}`);
		const env = await this.buildCommandEnv(cliConfig, options);
		return this.executeCommand(cmd, {
			timeout: 3e4,
			env,
			ownerId: options.ownerId ?? options.connectorId,
			phase: "unauth"
		});
	}
	/**
	* 轮询 status 命令等待认证完成
	*
	* @param cliConfig CLI 配置
	* @param timeoutMs 最大等待时间（默认 5 分钟）
	* @param pollIntervalMs 轮询间隔（默认 3 秒）
	* @param signal 用户主动取消信号；abort 后立即中断 sleep 并退出循环（不等下个 poll 周期）
	* @returns true 如果认证成功；false 如果超时或被取消
	*/
	async pollAuthCompletion(cliConfig, timeoutMs = 3e5, pollIntervalMs = 3e3, signal, options = {}) {
		const startTime = Date.now();
		while (Date.now() - startTime < timeoutMs && !signal?.aborted) {
			await new Promise((resolve) => {
				const onAbort = () => {
					clearTimeout(t);
					resolve();
				};
				const t = setTimeout(() => {
					signal?.removeEventListener("abort", onAbort);
					resolve();
				}, pollIntervalMs);
				signal?.addEventListener("abort", onAbort, { once: true });
			});
			if (signal?.aborted) {
				this.logger.info("[CliRuntime] Auth polling cancelled by user");
				return false;
			}
			if ((await this.runStatus(cliConfig, {
				...options,
				suppressFailureLog: true
			})).success) {
				this.logger.info(`[CliRuntime] Auth completed (took ${Date.now() - startTime}ms)`);
				return true;
			}
		}
		if (signal?.aborted) {
			this.logger.info("[CliRuntime] Auth polling cancelled by user");
			return false;
		}
		this.logger.warn(`[CliRuntime] Auth polling timed out after ${timeoutMs}ms`);
		return false;
	}
	/**
	* 从文本中提取认证 URL
	*
	* @param text 命令输出文本（stdout 或 stderr）
	* @param authUrlDomain 认证 URL 的匹配域名（来自 cli.json 的 authUrlDomain 字段）
	*   若提供，只有包含该域名的 URL 才会被提取
	*   若不提供，提取第一个 https URL
	*/
	extractAuthUrl(text, authUrlDomain) {
		const urlRegex = /https?:\/\/[^\s\n\r"'<>]+/g;
		let match;
		while ((match = urlRegex.exec(text)) !== null) {
			const url = match[0];
			if (authUrlDomain) {
				if (url.includes(authUrlDomain)) return url;
			} else if (url.startsWith("https://")) return url;
		}
	}
	/**
	* 从文本中按 Device Flow 配置提取 verification URL 与可选 user_code。
	*
	* 优先取正则的第一个捕获组（`match[1]`），无捕获组时退回整个匹配（`match[0]`）。
	* URL 必须命中才返回，code 命中失败时仅 URL 部分有效。
	*/
	extractDeviceFlowInfo(text, config) {
		let uri;
		try {
			const uriRe = new RegExp(config.uriPattern);
			const m = text.match(uriRe);
			if (m) uri = (m[1] ?? m[0])?.trim();
		} catch (err) {
			this.logger.warn(`[CliRuntime] device flow uriPattern invalid: ${String(err)}`);
		}
		if (!uri) return;
		let code;
		if (config.codePattern) try {
			const codeRe = new RegExp(config.codePattern);
			const m = text.match(codeRe);
			if (m) code = (m[1] ?? m[0])?.trim();
		} catch (err) {
			this.logger.warn(`[CliRuntime] device flow codePattern invalid: ${String(err)}`);
		}
		return {
			verificationUri: uri,
			userCode: code,
			expiresIn: config.defaultExpiresInSeconds,
			codeEmbeddedInUri: config.codeEmbeddedInUri
		};
	}
	/**
	* 执行命令并返回结果
	*
	* `options.env` 优先使用调用方传入的（通常来自 `buildCommandEnv`）；
	* 未传时回退到"继承 process.env 并清 NODE_OPTIONS/NODE_DEBUG"的老行为，
	* 保证本方法独立调用（如测试）时也不会泄漏调试配置。
	*/
	async executeCommand(cmd, options = {}) {
		const env = options.env ?? (() => {
			const fallback = { ...process.env };
			delete fallback.NODE_OPTIONS;
			delete fallback.NODE_DEBUG;
			return fallback;
		})();
		try {
			this.logger.info(`[CliRuntime] executeCommand: platform=${(0, os.platform)()} cmd=${cmd} windowsHide=true`);
			const { stdout, stderr } = await execAsync(cmd, {
				timeout: options.timeout ?? 3e4,
				env,
				windowsHide: true
			});
			return {
				success: true,
				stdout,
				stderr,
				exitCode: 0
			};
		} catch (error) {
			const result = {
				success: false,
				stdout: error.stdout ?? "",
				stderr: error.stderr ?? error.message,
				exitCode: typeof error.code === "number" ? error.code : -1
			};
			if (!options.suppressFailureLog) this.logCommandFailure(cmd, result, options);
			return result;
		}
	}
	/**
	* CLI 子进程失败时，必须把命令原始 stdout/stderr 完整写入主线程日志。
	*
	* 业务层可继续根据 exit code 做“升级/未登录/启动失败”等分类，但不得替代这份
	* 原始执行证据；否则问题现场只会留下分类后的猜测，无法还原 CLI 真正报错。
	*/
	logCommandFailure(cmd, result, context) {
		this.logger.error(`[CliCommandFailed]
owner=${context.ownerId ?? "unknown"}\nphase=${context.phase ?? "unknown"}\ncommand=${cmd}\nexitCode=${result.exitCode}\n--- stdout begin ---
${result.stdout}\n--- stdout end ---
--- stderr begin ---
${result.stderr}\n--- stderr end ---`);
	}
};
require_code_cache.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_code_cache.__decorateMetadata("design:type", typeof import_common$1.Logger === "undefined" ? Object : import_common$1.Logger)], CliRuntime.prototype, "logger", void 0);
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_code_cache.BinaryManager),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.BinaryManager === "undefined" ? Object : require_code_cache.BinaryManager)
], CliRuntime.prototype, "binaryManager", void 0);
CliRuntime = require_code_cache.__decorate([(0, import_common$1.Component)(require_tar$1.CliRuntimeToken)], CliRuntime);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/cache-manager.ts
/**
* Expert manifest 磁盘缓存管理器
*
* 纯 Node FS 操作，无 CellJS 依赖。
* 构造时传入 cacheDir，Desktop 宿主负责拼接路径。
*/
var MANIFEST_FILE = "manifest.json";
var VERSION_FILE = "version.txt";
var METADATA_FILE = "metadata.json";
var CACHE_FORMAT_VERSION = 2;
var ExpertCacheManager = class {
	constructor(cacheDir) {
		this.cacheDir = cacheDir;
	}
	async getManifest() {
		const p = this.filePath(MANIFEST_FILE);
		if (!await this.exists(p)) return null;
		try {
			return JSON.parse(await fs.promises.readFile(p, "utf-8"));
		} catch {
			return null;
		}
	}
	async saveManifest(manifest, sourceSignature) {
		await this.ensureDir();
		await fs.promises.writeFile(this.filePath(MANIFEST_FILE), JSON.stringify(manifest, null, 2), "utf-8");
		await fs.promises.writeFile(this.filePath(VERSION_FILE), manifest.version, "utf-8");
		await this.saveMetadata({
			version: manifest.version,
			cachedAt: (/* @__PURE__ */ new Date()).toISOString(),
			sourceSignature,
			manifestHash: this.computeHash(manifest),
			cacheFormatVersion: CACHE_FORMAT_VERSION
		});
	}
	async getMetadata() {
		const p = this.filePath(METADATA_FILE);
		if (!await this.exists(p)) return null;
		try {
			return JSON.parse(await fs.promises.readFile(p, "utf-8"));
		} catch {
			return null;
		}
	}
	async isCompatible(sourceSignature) {
		return (await this.getMetadata())?.sourceSignature === sourceSignature;
	}
	async getCachedVersion() {
		const p = this.filePath(VERSION_FILE);
		if (!await this.exists(p)) return null;
		try {
			return (await fs.promises.readFile(p, "utf-8")).trim();
		} catch {
			return null;
		}
	}
	async getCachedHash() {
		const meta = await this.getMetadata();
		if (meta?.manifestHash) return meta.manifestHash;
		const manifest = await this.getManifest();
		return manifest ? this.computeHash(manifest) : null;
	}
	async clear() {
		try {
			if (await this.exists(this.cacheDir)) await fs.promises.rm(this.cacheDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
	computeHash(manifest) {
		return (0, crypto.createHash)("sha256").update(JSON.stringify(manifest)).digest("hex");
	}
	filePath(name) {
		return path.join(this.cacheDir, name);
	}
	async ensureDir() {
		await fs.promises.mkdir(this.cacheDir, { recursive: true });
	}
	async saveMetadata(meta) {
		await fs.promises.writeFile(this.filePath(METADATA_FILE), JSON.stringify(meta, null, 2), "utf-8");
	}
	async exists(p) {
		try {
			await fs.promises.access(p, fs.constants.F_OK);
			return true;
		} catch {
			return false;
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/manifest-provider.ts
/**
* Expert manifest provider.
*
* 职责：manifest 加载、磁盘缓存、后台更新。
* 作为策略注入到 ExpertService。
*/
require_code_cache.init_decorate();
var CURRENT_SOURCE_SIGNATURE = JSON.stringify({
	baseUrl: require_handler_registry.EXPERT_CENTER_COS_CONFIG.baseUrl,
	manifestPath: require_handler_registry.EXPERT_CENTER_COS_CONFIG.manifestPath
});
var ExpertManifestProvider = class ExpertManifestProvider {
	constructor() {
		this.cacheManager = new ExpertCacheManager(path.join(require_code_cache.getWorkbuddyRuntimeUserDataDir(), "cache", "experts"));
		this.manifest = null;
		this.initPromise = null;
	}
	async init() {
		if (this.initPromise) return this.initPromise;
		this.initPromise = this.doInit();
		return this.initPromise;
	}
	async getManifest() {
		await this.ensureManifestLoaded();
		return this.manifest;
	}
	async refresh(force = false) {
		if (force) await this.clearCache();
		else this.initPromise = null;
		await this.init();
	}
	async clearCache() {
		await this.cacheManager.clear();
		this.manifest = null;
		this.initPromise = null;
	}
	async doInit() {
		try {
			await this.loadManifestFromCache();
			if (this.manifest) await this.syncManifestBeforeReady();
			else await this.fetchAndCacheManifest();
			this.backgroundManifestUpdate();
		} catch (error) {
			console.error("[ExpertCenter] Init failed:", error);
		}
	}
	async loadManifestFromCache() {
		try {
			if (!await this.cacheManager.isCompatible(CURRENT_SOURCE_SIGNATURE)) {
				if (await this.cacheManager.getMetadata()) console.log("[ExpertCenter] Clearing incompatible cache");
				await this.cacheManager.clear();
				this.manifest = null;
				return;
			}
			const cachedManifest = await this.cacheManager.getManifest();
			if (cachedManifest) {
				this.manifest = cachedManifest;
				console.log("[ExpertCenter] Manifest loaded from cache:", {
					version: cachedManifest.version,
					expertCount: cachedManifest.experts?.length ?? 0
				});
			}
		} catch (error) {
			console.warn("[ExpertCenter] Failed to load manifest from cache:", error);
		}
	}
	async fetchAndCacheManifest() {
		const remoteManifest = await require_tar$1.ExpertCloudService.fetchManifest();
		this.manifest = remoteManifest;
		await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
		console.log("[ExpertCenter] Manifest fetched from remote:", {
			version: remoteManifest.version,
			expertCount: remoteManifest.experts?.length ?? 0
		});
	}
	async syncManifestBeforeReady() {
		if (!this.manifest) return;
		try {
			const remoteManifest = await require_tar$1.ExpertCloudService.fetchManifest();
			const currentHash = this.cacheManager.computeHash(this.manifest);
			const remoteHash = this.cacheManager.computeHash(remoteManifest);
			if (this.manifest.version === remoteManifest.version && currentHash === remoteHash) return;
			this.manifest = remoteManifest;
			await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
		} catch (error) {
			console.warn("[ExpertCenter] Foreground manifest sync failed, using cached:", error);
		}
	}
	backgroundManifestUpdate() {
		setImmediate(() => {
			this.doBackgroundManifestUpdate().catch(() => {});
		});
	}
	async doBackgroundManifestUpdate() {
		try {
			const remoteManifest = await require_tar$1.ExpertCloudService.fetchManifest();
			const currentHash = this.manifest ? this.cacheManager.computeHash(this.manifest) : null;
			const cachedHash = await this.cacheManager.getCachedHash();
			const activeHash = currentHash ?? cachedHash;
			const remoteHash = this.cacheManager.computeHash(remoteManifest);
			if (!this.manifest || this.manifest.version !== remoteManifest.version || activeHash !== remoteHash) {
				this.manifest = remoteManifest;
				await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
			}
		} catch (error) {
			console.warn("[ExpertCenter] Background update failed:", error);
		}
	}
	async ensureManifestLoaded() {
		if (this.manifest) return;
		await this.init();
		if (this.manifest) return;
		try {
			await this.fetchAndCacheManifest();
		} catch (error) {
			console.error("[ExpertCenter] Manifest fallback fetch failed:", error);
		}
		if (!this.manifest) throw new Error("Expert center manifest not loaded");
	}
};
ExpertManifestProvider = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.DesktopManifestProviderToken)], ExpertManifestProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/resource-loader.ts
/**
* 专家中心资源加载器
*
* 迁移自 packages/plugin-chat/src/common/expert-center/expert-center-resource-loader.ts
*/
require_code_cache.init_decorate();
/**
* 仅司内 / 仅司外的额外清单相对路径。
* 与 packages/plugin-chat/.../expert-center-resource-loader.ts 保持一致。
*
* 设计目的（issue #38308 后续）：
* - 公共 expert_center.json 不再包含「司内专属」「司外专属」专家
* - 司内专家放 internalExpert.json；司外专家放 externalExpert.json
* - 客户端三份并行拉取后合并，再交由前端按 enterpriseId 过滤可见性
*
* 老客户端不感知这两个文件，从公共清单也拉不到这些专家，自然不会泄漏。
*/
var SCOPED_MANIFEST_PATHS = ["/internalExpert.json", "/externalExpert.json"];
var ExpertCenterResourceLoader = class ExpertCenterResourceLoader {
	async fetchManifest() {
		const baseManifestUrl = require_handler_registry.buildExpertUrl(require_handler_registry.EXPERT_CENTER_COS_CONFIG.manifestPath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetch manifest:", {
			baseUrl: require_handler_registry.EXPERT_CENTER_COS_CONFIG.baseUrl,
			manifestUrl: baseManifestUrl,
			scopedPaths: SCOPED_MANIFEST_PATHS
		});
		const [baseManifest, ...scopedResults] = await Promise.all([this.fetchBaseManifest(baseManifestUrl), ...SCOPED_MANIFEST_PATHS.map((p) => this.fetchScopedManifestSafe(p))]);
		const scopedManifests = scopedResults.filter((m) => m !== null);
		const merged = scopedManifests.length === 0 ? baseManifest : mergeExpertManifests(baseManifest, scopedManifests);
		console.log("[ExpertCenterDebug][DesktopLoader] fetchManifest:done", {
			manifestUrl: baseManifestUrl,
			version: merged.version,
			baseExperts: baseManifest.experts?.length ?? 0,
			scopedExperts: scopedManifests.map((m) => m.experts?.length ?? 0),
			mergedExperts: merged.experts?.length ?? 0,
			baseExpertIds: (baseManifest.experts ?? []).slice(0, 10).map((e) => e.id),
			scopedExpertIdsAll: scopedManifests.map((m) => (m.experts ?? []).map((e) => e.id)),
			mergedHasInternalSample: (merged.experts ?? []).some((e) => e.id === "TencentCloudPriceExpert"),
			mergedHasExternalSample: (merged.experts ?? []).some((e) => e.id === "ReportDistributionAgent")
		});
		return merged;
	}
	async fetchBaseManifest(url) {
		const response = await this.fetchWithTimeout(url);
		if (!response.ok) throw new Error(`Failed to fetch manifest: ${response.status}`);
		const manifest = await response.json();
		console.log("[ExpertCenterDebug][DesktopLoader] fetchBaseManifest:done", {
			url,
			status: response.status,
			version: manifest.version,
			experts: manifest.experts?.length ?? 0,
			categories: manifest.categories?.length ?? 0
		});
		return manifest;
	}
	async fetchScopedManifestSafe(relativePath) {
		const url = require_handler_registry.buildExpertUrl(relativePath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest:start", {
			relativePath,
			url
		});
		try {
			const response = await this.fetchWithTimeout(url);
			if (!response.ok) {
				console.warn("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest non-ok:", {
					relativePath,
					url,
					status: response.status
				});
				return null;
			}
			const manifest = await response.json();
			console.log("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest:done", {
				relativePath,
				url,
				status: response.status,
				version: manifest.version,
				experts: manifest.experts?.length ?? 0,
				categories: manifest.categories?.length ?? 0,
				expertIds: (manifest.experts ?? []).map((e) => e.id),
				categoryIds: (manifest.categories ?? []).map((c) => c.id)
			});
			return manifest;
		} catch (error) {
			console.warn("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest failed (silent fallback):", {
				relativePath,
				url,
				error: error instanceof Error ? error.message : String(error)
			});
			return null;
		}
	}
	async fetchPrompt(promptPath) {
		const url = require_handler_registry.buildExpertUrl(promptPath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetch prompt:", {
			promptPath,
			url
		});
		const response = await this.fetchWithTimeout(url);
		if (!response.ok) throw new Error(`Failed to fetch prompt: ${response.status} - ${url}`);
		return await response.text();
	}
	async fetchPromptWithRetry(promptPath) {
		const { maxRetries, retryDelay } = require_handler_registry.EXPERT_CENTER_COS_CONFIG.download;
		let lastError;
		for (let attempt = 0; attempt <= maxRetries; attempt++) try {
			return await this.fetchPrompt(promptPath);
		} catch (error) {
			lastError = error;
			console.warn(`[ExpertCenter] Prompt download failed (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
			if (attempt < maxRetries) await this.sleep(retryDelay);
		}
		throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error(`Failed to fetch prompt: ${promptPath}`);
	}
	async fetchPromptsBatch(tasks, onProgress) {
		const results = /* @__PURE__ */ new Map();
		const total = tasks.length;
		if (!total) {
			onProgress?.(0, 0, 0);
			return results;
		}
		const { batchConcurrency } = require_handler_registry.EXPERT_CENTER_COS_CONFIG.download;
		let completed = 0;
		let failed = 0;
		for (let i = 0; i < tasks.length; i += batchConcurrency) {
			const batch = tasks.slice(i, i + batchConcurrency);
			const settled = await Promise.allSettled(batch.map(async (task) => {
				const content = await this.fetchPromptWithRetry(task.path);
				return {
					...task,
					content
				};
			}));
			for (const item of settled) if (item.status === "fulfilled") {
				const value = item.value;
				results.set(`${value.expertId}_${value.locale}`, value);
				completed += 1;
			} else {
				failed += 1;
				console.warn("[ExpertCenter] Batch download failed:", item.reason);
			}
			onProgress?.(completed, total, failed);
		}
		return results;
	}
	async fetchWithTimeout(url, timeout = require_handler_registry.EXPERT_CENTER_COS_CONFIG.download.timeout) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		try {
			return await fetch(url, {
				signal: controller.signal,
				headers: { Accept: "application/json, text/plain, text/markdown" }
			});
		} catch (error) {
			if (error.name === "AbortError") throw new Error(`Request timeout after ${timeout}ms: ${url}`);
			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
};
ExpertCenterResourceLoader = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.ExpertCenterResourceLoaderToken)], ExpertCenterResourceLoader);
/**
* 按 id 去重合并多份额外清单到公共清单上。
* 合并规则：base 先入 Map，overlay 依次覆盖同 id 项，因此实际效果是 **overlay 覆盖 base**。
* 与 plugin-chat 镜像保持语义一致。
*/
function mergeExpertManifests(base, overlays) {
	const categoryMap = /* @__PURE__ */ new Map();
	for (const c of base.categories ?? []) categoryMap.set(c.id, c);
	for (const overlay of overlays) for (const c of overlay.categories ?? []) categoryMap.set(c.id, c);
	const expertMap = /* @__PURE__ */ new Map();
	for (const e of base.experts ?? []) expertMap.set(e.id, e);
	for (const overlay of overlays) for (const e of overlay.experts ?? []) expertMap.set(e.id, e);
	const mergedExperts = Array.from(expertMap.values());
	const mergedCategories = Array.from(categoryMap.values());
	const allManifests = [base, ...overlays];
	const newestVersion = allManifests.map((m) => m.version ?? "").reduce((a, b) => a >= b ? a : b, "");
	const newestLastUpdated = allManifests.map((m) => typeof m.lastUpdated === "string" ? m.lastUpdated : "").reduce((a, b) => a >= b ? a : b, "");
	return {
		...base,
		categories: mergedCategories,
		experts: mergedExperts,
		statistics: {
			totalExperts: mergedExperts.length,
			totalCategories: mergedCategories.length
		},
		version: newestVersion || base.version,
		lastUpdated: newestLastUpdated || base.lastUpdated
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-service.ts
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var ExpertHistoryService = class ExpertHistoryService {
	constructor() {
		this._maxExpertsPerSession = 5;
		this.initPromise = null;
	}
	async getRecentExperts(sessionId) {
		await this.ensureInitialized();
		return this.cache.getRecentExperts(sessionId);
	}
	async addExpert(sessionId, expert) {
		await this.ensureInitialized();
		this.cache.addExpert(sessionId, expert, this._maxExpertsPerSession);
		this.persistToStorage();
		console.log(`[ExpertHistory] Added expert '${expert.name}' (${expert.id}) to scoped history`);
	}
	async removeExpert(sessionId, expertId) {
		await this.ensureInitialized();
		if (this.cache.removeExpert(sessionId, expertId)) {
			this.persistToStorage();
			console.log(`[ExpertHistory] Removed expert ${expertId} from scoped history`);
		}
	}
	async clearHistory(sessionId) {
		await this.ensureInitialized();
		if (this.cache.clearHistory(sessionId)) {
			this.persistToStorage();
			console.log("[ExpertHistory] Cleared scoped history");
		}
	}
	async flush() {
		await this.storage.flush();
	}
	async ensureInitialized() {
		if (this.cache.isInitialized()) return;
		if (!this.initPromise) this.initPromise = this.doInitialize();
		await this.initPromise;
	}
	async doInitialize() {
		try {
			console.log("[ExpertHistory] Initializing service...");
			const loadedData = await this.storage.load();
			const { data, migrated } = this.migrateToSharedHistory(loadedData);
			this.cache.initFromData(data);
			if (migrated && data) {
				this.storage.saveAsync(data);
				console.log("[ExpertHistory] Migrated legacy session-based history to shared history");
			}
			console.log("[ExpertHistory] Service initialized successfully");
		} catch (error) {
			console.error("[ExpertHistory] Failed to initialize:", error);
			this.cache.initFromData(null);
		}
	}
	migrateToSharedHistory(data) {
		if (!data) return {
			data: null,
			migrated: false
		};
		const sessionEntries = Object.entries(data.sessions ?? {});
		if (sessionEntries.length === 0) return {
			data,
			migrated: false
		};
		if (sessionEntries.length === 1 && sessionEntries[0][0] === "__global__") return {
			data,
			migrated: false
		};
		const deduped = /* @__PURE__ */ new Map();
		for (const experts of sessionEntries.map(([, experts]) => experts)) for (const expert of experts ?? []) {
			if (!expert?.id) continue;
			const existing = deduped.get(expert.id);
			if (!existing || (expert.summonedAt ?? 0) >= (existing.summonedAt ?? 0)) deduped.set(expert.id, expert);
		}
		const mergedExperts = Array.from(deduped.values()).sort((a, b) => (b.summonedAt ?? 0) - (a.summonedAt ?? 0)).slice(0, this._maxExpertsPerSession);
		return {
			data: {
				version: data.version,
				sessions: mergedExperts.length > 0 ? { [require_handler_registry.SHARED_HISTORY_KEY]: mergedExperts } : {},
				lastUpdated: Date.now()
			},
			migrated: true
		};
	}
	persistToStorage() {
		const data = this.cache.getAllData();
		this.storage.saveAsync(data);
	}
};
require_code_cache.__decorate([(0, import_common$1.Autowired)(require_handler_registry.ExpertHistoryCacheToken), require_code_cache.__decorateMetadata("design:type", Object)], ExpertHistoryService.prototype, "cache", void 0);
require_code_cache.__decorate([(0, import_common$1.Autowired)(require_handler_registry.ExpertHistoryStorageToken), require_code_cache.__decorateMetadata("design:type", Object)], ExpertHistoryService.prototype, "storage", void 0);
ExpertHistoryService = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.ExpertHistoryServiceToken)], ExpertHistoryService);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-storage.ts
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var _ExpertHistoryStorage;
var ExpertHistoryStorage = _ExpertHistoryStorage = class ExpertHistoryStorage {
	constructor() {
		this.writeTimer = null;
		this.pendingData = null;
		this.writeDebounceMs = 500;
		this.isWriting = false;
		const storageDir = node_path.join(require_code_cache.getWorkbuddyRuntimeUserDataDir(), "data");
		this.storagePath = node_path.join(storageDir, require_handler_registry.DEFAULT_STORAGE_FILE);
		this.initSync(storageDir);
	}
	initSync(storageDir) {
		try {
			if (!node_fs.existsSync(storageDir)) node_fs.mkdirSync(storageDir, { recursive: true });
			if (!node_fs.existsSync(this.storagePath)) {
				const emptyData = _ExpertHistoryStorage.createEmptyData();
				node_fs.writeFileSync(this.storagePath, JSON.stringify(emptyData, null, 2));
			}
		} catch (e) {
			console.warn("[ExpertHistory] Failed to init storage sync:", e);
		}
	}
	configure(options) {
		if (options.writeDebounceMs !== void 0 && options.writeDebounceMs >= 0) this.writeDebounceMs = options.writeDebounceMs;
	}
	async load() {
		try {
			if (!await this.exists(this.storagePath)) {
				console.log("[ExpertHistory] Storage file does not exist, starting fresh");
				return null;
			}
			const content = await node_fs.promises.readFile(this.storagePath, "utf-8");
			const data = JSON.parse(content);
			if (!this.isValidData(data)) {
				console.warn("[ExpertHistory] Invalid data format, starting fresh");
				return null;
			}
			return this.loadLegacyStorageWhenCurrentEmpty(data);
		} catch (error) {
			if (error instanceof SyntaxError) console.warn("[ExpertHistory] Failed to parse storage file, starting fresh:", error.message);
			else console.warn("[ExpertHistory] Failed to load from storage:", error);
			return null;
		}
	}
	saveAsync(data) {
		this.pendingData = data;
		if (this.writeTimer) clearTimeout(this.writeTimer);
		this.writeTimer = setTimeout(() => {
			this.flushPendingWrite();
		}, this.writeDebounceMs);
	}
	async flush() {
		if (this.writeTimer) {
			clearTimeout(this.writeTimer);
			this.writeTimer = null;
		}
		if (this.pendingData) {
			const dataToWrite = this.pendingData;
			this.pendingData = null;
			await this.doWrite(dataToWrite);
		}
	}
	async clear() {
		try {
			if (await this.exists(this.storagePath)) {
				await node_fs.promises.unlink(this.storagePath);
				console.log("[ExpertHistory] Storage file cleared");
			}
		} catch (error) {
			console.error("[ExpertHistory] Failed to clear storage:", error);
		}
	}
	getStoragePath() {
		return this.storagePath;
	}
	async flushPendingWrite() {
		this.writeTimer = null;
		if (!this.pendingData) return;
		const dataToWrite = this.pendingData;
		this.pendingData = null;
		await this.doWrite(dataToWrite);
	}
	async doWrite(data) {
		if (this.isWriting) {
			this.pendingData = data;
			return;
		}
		this.isWriting = true;
		try {
			const dir = node_path.dirname(this.storagePath);
			await node_fs.promises.mkdir(dir, { recursive: true });
			const tempPath = `${this.storagePath}.tmp`;
			const content = JSON.stringify(data, null, 2);
			await node_fs.promises.writeFile(tempPath, content, "utf-8");
			await node_fs.promises.rename(tempPath, this.storagePath);
			console.log(`[ExpertHistory] Saved ${Object.keys(data.sessions).length} sessions to storage`);
		} catch (error) {
			console.error("[ExpertHistory] Failed to save to storage:", error);
		} finally {
			this.isWriting = false;
			if (this.pendingData) {
				const nextData = this.pendingData;
				this.pendingData = null;
				setImmediate(() => {
					this.doWrite(nextData);
				});
			}
		}
	}
	async exists(filePath) {
		try {
			await node_fs.promises.access(filePath, node_fs.constants.F_OK);
			return true;
		} catch {
			return false;
		}
	}
	hasHistory(data) {
		return Object.values(data.sessions ?? {}).some((experts) => Array.isArray(experts) && experts.length > 0);
	}
	getLegacyStorageCandidates() {
		const userDataDir = require_code_cache.getWorkbuddyRuntimeUserDataDir();
		if (node_path.basename(userDataDir) !== "app") return [];
		const configDir = node_path.dirname(userDataDir);
		return Array.from(/* @__PURE__ */ new Set([node_path.join(configDir, ".workbuddy", require_handler_registry.DEFAULT_STORAGE_FILE), node_path.join(configDir, require_handler_registry.DEFAULT_STORAGE_FILE)])).filter((candidate) => candidate !== this.storagePath);
	}
	async readLegacyStorage(candidate) {
		try {
			if (!await this.exists(candidate)) return null;
			const content = await node_fs.promises.readFile(candidate, "utf-8");
			const data = JSON.parse(content);
			return this.isValidData(data) && this.hasHistory(data) ? data : null;
		} catch {
			return null;
		}
	}
	async loadLegacyStorageWhenCurrentEmpty(data) {
		if (this.hasHistory(data)) return data;
		for (const candidate of this.getLegacyStorageCandidates()) {
			const legacyData = await this.readLegacyStorage(candidate);
			if (legacyData) {
				await this.doWrite(legacyData);
				return legacyData;
			}
		}
		return data;
	}
	isValidData(data) {
		if (!data || typeof data !== "object") return false;
		const d = data;
		if (typeof d.version !== "number") return false;
		if (!d.sessions || typeof d.sessions !== "object") return false;
		if (typeof d.lastUpdated !== "number") return false;
		return true;
	}
	static createEmptyData() {
		return {
			version: 1,
			sessions: {},
			lastUpdated: Date.now()
		};
	}
	async dispose() {
		console.log("[ExpertHistory] Disposing storage...");
		if (this.writeTimer) {
			clearTimeout(this.writeTimer);
			this.writeTimer = null;
		}
		if (this.pendingData) {
			try {
				await this.doWrite(this.pendingData);
			} catch (e) {
				console.warn("[ExpertHistory] Failed to flush pending data on dispose:", e);
			}
			this.pendingData = null;
		}
		console.log("[ExpertHistory] Storage disposed successfully");
	}
};
ExpertHistoryStorage = _ExpertHistoryStorage = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.ExpertHistoryStorageToken), require_code_cache.__decorateMetadata("design:paramtypes", [])], ExpertHistoryStorage);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-cache.ts
require_code_cache.init_decorate();
var ExpertHistoryCache = class ExpertHistoryCache {
	constructor() {
		this.data = {
			version: 1,
			sessions: {},
			lastUpdated: Date.now()
		};
		this.initialized = false;
	}
	getRecentExperts(sessionId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		return this.resolveExpertsForRead(sessionKey).slice();
	}
	addExpert(sessionId, expert, maxCount) {
		const sessionKey = this.resolveSessionKey(sessionId);
		const experts = this.resolveExpertsForWrite(sessionKey);
		const existingExpert = experts.find((e) => e.id === expert.id);
		const filteredExperts = experts.filter((e) => e.id !== expert.id);
		const newExperts = [{
			...existingExpert,
			...expert,
			isCustomExpert: expert.isCustomExpert ?? existingExpert?.isCustomExpert,
			summonedAt: Date.now()
		}, ...filteredExperts].slice(0, maxCount);
		this.data.sessions = {
			...this.data.sessions,
			[sessionKey]: newExperts
		};
		this.data.lastUpdated = Date.now();
		return newExperts.slice();
	}
	removeExpert(sessionId, expertId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		if (sessionKey === "__global__") return this.removeExpertFromAllScopes(expertId);
		return this.removeExpertFromScope(sessionKey, expertId);
	}
	clearHistory(sessionId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		if (this.resolveExpertsForRead(sessionKey).length === 0) return false;
		const nextSessions = { ...this.data.sessions };
		if (sessionKey === "__global__") delete nextSessions[sessionKey];
		else nextSessions[sessionKey] = [];
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	resolveSessionKey(sessionId) {
		return (typeof sessionId === "string" ? sessionId.trim() : "") || "__global__";
	}
	hasScope(sessionKey) {
		return Object.prototype.hasOwnProperty.call(this.data.sessions, sessionKey);
	}
	resolveExpertsForRead(sessionKey) {
		if (this.hasScope(sessionKey)) return this.data.sessions[sessionKey] ?? [];
		if (sessionKey !== "__global__") return this.data.sessions["__global__"] ?? [];
		return [];
	}
	resolveExpertsForWrite(sessionKey) {
		if (this.hasScope(sessionKey)) return this.data.sessions[sessionKey] ?? [];
		if (sessionKey !== "__global__") return this.data.sessions["__global__"] ?? [];
		return [];
	}
	removeExpertFromScope(sessionKey, expertId) {
		const experts = this.data.sessions[sessionKey];
		if (!experts || experts.length === 0) {
			if (this.hasScope(sessionKey) || sessionKey === "__global__") return false;
			const legacyExperts = this.data.sessions["__global__"] ?? [];
			const filteredLegacyExperts = legacyExperts.filter((e) => e.id !== expertId);
			if (filteredLegacyExperts.length === legacyExperts.length) return false;
			this.data.sessions = {
				...this.data.sessions,
				[sessionKey]: filteredLegacyExperts
			};
			this.data.lastUpdated = Date.now();
			return true;
		}
		const filteredExperts = experts.filter((e) => e.id !== expertId);
		if (filteredExperts.length === experts.length) return false;
		const nextSessions = { ...this.data.sessions };
		if (filteredExperts.length > 0) nextSessions[sessionKey] = filteredExperts;
		else if (sessionKey === "__global__") delete nextSessions[sessionKey];
		else nextSessions[sessionKey] = [];
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	removeExpertFromAllScopes(expertId) {
		let changed = false;
		const nextSessions = {};
		for (const [sessionKey, experts] of Object.entries(this.data.sessions)) {
			const filteredExperts = experts.filter((e) => e.id !== expertId);
			if (filteredExperts.length !== experts.length) changed = true;
			if (filteredExperts.length > 0) nextSessions[sessionKey] = filteredExperts;
		}
		if (!changed) return false;
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	getAllData() {
		const sessions = Object.fromEntries(Object.entries(this.data.sessions).map(([key, experts]) => [key, experts.slice()]));
		return {
			...this.data,
			sessions
		};
	}
	initFromData(data) {
		if (this.initialized) return;
		if (data) this.data = {
			version: data.version ?? 1,
			sessions: data.sessions ?? {},
			lastUpdated: data.lastUpdated ?? Date.now()
		};
		this.initialized = true;
	}
	isInitialized() {
		return this.initialized;
	}
	static createEmptyData() {
		return {
			version: 1,
			sessions: {},
			lastUpdated: Date.now()
		};
	}
};
ExpertHistoryCache = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.ExpertHistoryCacheToken)], ExpertHistoryCache);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-agent-file-resolver.ts
async function resolveLocalExpertPluginDir(configDir, bundleName, marketplace, hasPluginManifest) {
	if (marketplace && marketplace !== "experts" && marketplace !== "my-experts") return;
	const marketplaces = marketplace ? [marketplace] : ["experts", "my-experts"];
	for (const candidateMarketplace of marketplaces) {
		const pluginsRoot = node_path.resolve(configDir, "plugins", "marketplaces", candidateMarketplace, "plugins");
		const pluginDir = node_path.resolve(pluginsRoot, bundleName);
		if (pluginDir !== pluginsRoot && !pluginDir.startsWith(`${pluginsRoot}${node_path.sep}`)) continue;
		if (await hasPluginManifest(pluginDir)) try {
			const [realPluginsRoot, realPluginDir] = await Promise.all([node_fs_promises.realpath(pluginsRoot), node_fs_promises.realpath(pluginDir)]);
			if (realPluginDir !== realPluginsRoot && !realPluginDir.startsWith(`${realPluginsRoot}${node_path.sep}`)) continue;
			return realPluginDir;
		} catch {
			continue;
		}
	}
}
async function listMarkdownFiles(dir) {
	try {
		return (await node_fs_promises.readdir(dir, { withFileTypes: true })).filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => node_path.join(dir, entry.name));
	} catch {
		return [];
	}
}
async function readFrontmatterName(filePath) {
	try {
		return (((await node_fs_promises.readFile(filePath, "utf8")).match(/^---\s*\n([\s\S]*?)\n---/)?.[1])?.match(/^name:\s*(.+)$/m)?.[1]?.trim())?.replace(/^['"]|['"]$/g, "");
	} catch {
		return;
	}
}
/**
* Resolve an expert's local agent markdown without leaving the plugin's agents directory.
* Team experts pass their lead agent name, so the same lookup covers both single experts
* and expert teams.
*/
async function resolveExpertAgentMarkdownPath(pluginDir, agentName) {
	const candidates = await listMarkdownFiles(node_path.resolve(pluginDir, "agents"));
	if (candidates.length === 0) return;
	const normalizedAgentName = agentName.replace(/\.md$/i, "");
	const basenameMatch = candidates.find((candidate) => node_path.basename(candidate, ".md") === normalizedAgentName);
	if (basenameMatch) return node_path.resolve(basenameMatch);
	for (const candidate of candidates) if (await readFrontmatterName(candidate) === agentName) return node_path.resolve(candidate);
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-bundle-runtime.ts
var import_adm_zip = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_adm_zip$1.require_adm_zip());
var import_tar = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_tar$1.require_tar());
var EXPERTS_MARKETPLACE$2 = "experts";
var expertMarketLogger = require_code_cache.createWorkbuddyScopedLogger("expert-market");
var ExpertBundleRuntime = class {
	constructor(deps) {
		this.deps = deps;
		this.downloadingExperts = /* @__PURE__ */ new Map();
	}
	getConfigDir() {
		return this.deps.getConfigDir();
	}
	/** 获取专家 marketplace 根目录 */
	getMarketplaceDir() {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", EXPERTS_MARKETPLACE$2);
	}
	/** 获取专家 Plugin 的本地目录路径，以 bundleName（plugin 字段值）为目录名 */
	getPluginDir(bundleName) {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", EXPERTS_MARKETPLACE$2, "plugins", bundleName);
	}
	/**
	* 增量更新 experts marketplace 的 marketplace.json。
	* 只新增/更新指定 bundleName 对应的条目，不全量扫描所有子目录。
	*/
	async updateMarketplaceManifest(bundleName, marketplace) {
		const marketplaceName = marketplace || EXPERTS_MARKETPLACE$2;
		const marketplaceDir = marketplace ? path.join(this.getConfigDir(), "plugins", "marketplaces", marketplace) : this.getMarketplaceDir();
		const metaDir = path.join(marketplaceDir, ".codebuddy-plugin");
		const manifestPath = path.join(metaDir, "marketplace.json");
		await fs_promises.mkdir(metaDir, { recursive: true });
		let existing = {
			name: marketplaceName,
			description: `${marketplaceName} marketplace (auto-generated)`,
			plugins: []
		};
		try {
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			existing = JSON.parse(content);
		} catch {}
		const pluginDir = path.join(marketplaceDir, "plugins", bundleName);
		const manifest = await this.deps.readPluginManifestAsync(pluginDir);
		if (!manifest) {
			console.warn(`[ExpertPluginService] updateMarketplaceManifest: no manifest for ${bundleName}`);
			return;
		}
		const entry = {
			name: manifest.name || bundleName,
			source: `./plugins/${bundleName}`,
			description: manifest.description
		};
		existing.plugins = existing.plugins.filter((plugin) => plugin.name !== entry.name && plugin.source !== entry.source);
		existing.plugins.push(entry);
		await fs_promises.writeFile(manifestPath, JSON.stringify(existing, null, 2), "utf-8");
		console.log(`[ExpertPluginService] Updated marketplace.json (incremental): ${existing.plugins.length} plugins`, { updatedBundle: bundleName });
	}
	/**
	* 确保专家 Plugin 已下载到本地且是最新版本。
	* - 本地没有 → 下载
	* - 本地有但远程 updatedAt 比本地下载时间新 → 重新下载
	* - 本地有且是最新 → 跳过下载
	*/
	async ensureDownloaded(bundleName, updatedAt, downloadUrl) {
		const localPath = this.getPluginDir(bundleName);
		if (await this.deps.hasPluginManifestAsync(localPath)) {
			if (updatedAt && await this.isLocalStale(localPath, updatedAt)) console.log(`[ExpertPluginService] Local cache stale, re-downloading: ${bundleName}`);
			else {
				await this.logBundleSnapshot("cache", bundleName, localPath);
				return localPath;
			}
		}
		const existing = this.downloadingExperts.get(bundleName);
		if (existing) return existing;
		const downloadPromise = this.downloadAndExtract(bundleName, localPath, downloadUrl);
		this.downloadingExperts.set(bundleName, downloadPromise);
		try {
			return await downloadPromise;
		} finally {
			this.downloadingExperts.delete(bundleName);
		}
	}
	/**
	* 优先从接口返回地址下载专家包；缺失时回退 COS tar.gz，并解压到本地目录。
	*/
	async downloadAndExtract(bundleName, targetDir, downloadUrl) {
		const explicitDownloadUrl = downloadUrl?.trim();
		const isTrusted = this.deps.isTrustedDownloadUrl ?? ((url) => this.isTrustedDownloadUrl(url));
		let explicitBundleUrl = explicitDownloadUrl && isTrusted(explicitDownloadUrl) ? explicitDownloadUrl : void 0;
		if (explicitDownloadUrl && !explicitBundleUrl) expertMarketLogger.warn("untrusted expert bundle URL ignored", {
			bundleName,
			bundleUrl: this.redactUrlForLog(explicitDownloadUrl)
		});
		if (explicitBundleUrl && this.deps.shouldStripEnterpriseGatewayParams?.(explicitBundleUrl)) explicitBundleUrl = this.deps.stripEnterpriseGatewayDownloadParams?.(explicitBundleUrl) ?? explicitBundleUrl;
		const source = explicitBundleUrl ? "operation-platform" : "cos";
		const bundleUrl = explicitBundleUrl || require_handler_registry.buildExpertUrl(`/bundles/${bundleName}.tar.gz`);
		const safeBundleUrl = this.redactUrlForLog(bundleUrl);
		expertMarketLogger.info("expert bundle download start", {
			bundleName,
			source,
			bundleUrl: safeBundleUrl
		});
		const { timeout } = require_handler_registry.EXPERT_CENTER_COS_CONFIG.download;
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		let response;
		try {
			response = await fetch(bundleUrl, { signal: controller.signal });
		} catch (error) {
			expertMarketLogger.warn("expert bundle download request failed", {
				bundleName,
				bundleUrl: safeBundleUrl,
				error: String(error)
			});
			if (explicitBundleUrl) return this.downloadAndExtract(bundleName, targetDir);
			throw error;
		} finally {
			clearTimeout(timer);
		}
		if (!response.ok) {
			expertMarketLogger.warn("expert bundle download returned non-OK", {
				bundleName,
				bundleUrl: safeBundleUrl,
				status: response.status,
				statusText: response.statusText
			});
			if (explicitBundleUrl) return this.downloadAndExtract(bundleName, targetDir);
			throw new Error(`Failed to download expert bundle: ${response.status} ${response.statusText} - ${safeBundleUrl}`);
		}
		try {
			await fs_promises.rm(targetDir, {
				recursive: true,
				force: true
			});
			await fs_promises.mkdir(targetDir, { recursive: true });
			const archiveKind = this.inferArchiveKind(bundleUrl);
			const tmpFile = path.join(targetDir, archiveKind === "zip" ? "__bundle.zip" : "__bundle.tar.gz");
			await fs_promises.writeFile(tmpFile, Buffer.from(await response.arrayBuffer()));
			try {
				if (archiveKind === "zip") await this.extractZipArchive(tmpFile, targetDir);
				else await import_tar.extract({
					file: tmpFile,
					cwd: targetDir
				});
				await this.normalizeExtractedPluginRoot(targetDir);
			} finally {
				await fs_promises.unlink(tmpFile).catch(() => {});
			}
			if (!await this.deps.hasPluginManifestAsync(targetDir)) throw new Error(`Extracted bundle does not contain plugin.json: ${bundleName}`);
			await this.logBundleSnapshot(source, bundleName, targetDir);
			await fs_promises.writeFile(path.join(targetDir, ".downloaded_at"), (/* @__PURE__ */ new Date()).toISOString(), "utf-8");
			return targetDir;
		} catch (err) {
			if (explicitBundleUrl) {
				expertMarketLogger.warn("explicit expert bundle invalid, fallback to COS", {
					bundleName,
					bundleUrl: safeBundleUrl,
					error: err instanceof Error ? `${err.name}: ${err.message}` : String(err)
				});
				await fs_promises.rm(targetDir, {
					recursive: true,
					force: true
				}).catch(() => {});
				return this.downloadAndExtract(bundleName, targetDir);
			}
			throw new Error(`Failed to extract expert bundle "${bundleName}": ${err instanceof Error ? err.message : err}`);
		}
	}
	async logBundleSnapshot(source, bundleName, localPath) {
		const manifest = await this.deps.readPluginManifestAsync(localPath).catch(() => null);
		expertMarketLogger.info("expert bundle ready", {
			bundleName,
			source,
			localPath,
			pluginName: manifest?.name,
			version: manifest?.version,
			expertType: manifest?.expertType,
			agentName: manifest?.agentName
		});
	}
	isTrustedDownloadUrl(url) {
		const cosHost = new URL(require_handler_registry.EXPERT_CENTER_COS_CONFIG.baseUrl).hostname.toLowerCase();
		return require_tar$1.isTrustedCosDownloadUrl(url, cosHost);
	}
	redactUrlForLog(url) {
		try {
			const parsed = new URL(url);
			const redacted = `${parsed.origin}${parsed.pathname}`;
			return parsed.search || parsed.hash ? `${redacted}?<redacted>` : redacted;
		} catch {
			return "<invalid-url>";
		}
	}
	inferArchiveKind(url) {
		try {
			return new URL(url).pathname.toLowerCase().endsWith(".zip") ? "zip" : "tar";
		} catch {
			return url.split("?")[0].toLowerCase().endsWith(".zip") ? "zip" : "tar";
		}
	}
	/**
	* 解压专家包 zip，并做 zip-slip 防护。
	*
	* 条目名统一走 `decodeZipEntryName` 做多编码兼容解码：Windows 中文系统直接
	* 右键「压缩(zipped)文件夹」打出的包，文件名是 GBK 字节且不置 EFS(UTF-8)
	* 标志位；若无条件按 UTF-8 解码，含中文名的条目会解出未配对代理项，
	* `writeFile` 抛 `EILSEQ: illegal byte sequence` 导致整包解压失败 —— 上层
	* 随后静默回退公共市场 COS 并 404，表现为「企业自建专家召唤后不生效」。
	*/
	async extractZipArchive(zipPath, targetDir) {
		const entries = new import_adm_zip.default(zipPath).getEntries();
		const directoryLikeEntries = /* @__PURE__ */ new Set();
		for (const entry of entries) {
			const entryName = require_log_acl_guard.decodeZipEntryName(entry.rawEntryName, entry.header.flags ?? 0).replace(/\\/g, "/").replace(/\/+$/, "");
			const parts = entryName.split("/").filter(Boolean);
			for (let i = 1; i < parts.length; i++) directoryLikeEntries.add(parts.slice(0, i).join("/"));
			if (entry.isDirectory && entryName) directoryLikeEntries.add(entryName);
		}
		const resolvedRoot = path.resolve(targetDir);
		for (const entry of entries) {
			const entryName = require_log_acl_guard.decodeZipEntryName(entry.rawEntryName, entry.header.flags ?? 0).replace(/\\/g, "/");
			const normalizedEntryName = entryName.replace(/\/+$/, "");
			const targetPath = path.resolve(resolvedRoot, normalizedEntryName || entryName);
			const rel = path.relative(resolvedRoot, targetPath);
			if (rel.startsWith("..") || path.isAbsolute(rel)) throw new Error(`[zip-slip] entry escapes targetDir: ${entryName}`);
			if (entry.isDirectory || entryName.endsWith("/") || entry.header.size === 0 && directoryLikeEntries.has(normalizedEntryName)) {
				await fs_promises.mkdir(targetPath, { recursive: true });
				continue;
			}
			await fs_promises.mkdir(path.dirname(targetPath), { recursive: true });
			await fs_promises.writeFile(targetPath, entry.getData());
		}
	}
	async normalizeExtractedPluginRoot(targetDir) {
		if (await this.deps.hasPluginManifestAsync(targetDir)) return;
		const dirs = (await fs_promises.readdir(targetDir, { withFileTypes: true })).filter((entry) => entry.isDirectory());
		for (const dir of dirs) {
			const childDir = path.join(targetDir, dir.name);
			if (!await this.deps.hasPluginManifestAsync(childDir)) continue;
			for (const childEntry of await fs_promises.readdir(childDir)) await fs_promises.rename(path.join(childDir, childEntry), path.join(targetDir, childEntry));
			await fs_promises.rm(childDir, {
				recursive: true,
				force: true
			});
			return;
		}
	}
	/**
	* 检查本地缓存是否过期（远程 updatedAt 比本地下载时间新）
	*/
	async isLocalStale(localPath, remoteUpdatedAt) {
		try {
			const tsFile = path.join(localPath, ".downloaded_at");
			const content = await fs_promises.readFile(tsFile, "utf-8");
			const localTime = new Date(content.trim()).getTime();
			return new Date(remoteUpdatedAt).getTime() > localTime;
		} catch {
			return true;
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-custom-runtime-utils.ts
async function pathExists$2(p) {
	try {
		await fs_promises.access(p);
		return true;
	} catch {
		return false;
	}
}
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** { zh:[...], en:[...] } 旧格式 → [{ zh, en }] 列表。 */
function normalizeLocalizedManifestItems(value) {
	if (value === void 0) return;
	if (Array.isArray(value)) return value;
	if (!isRecord$2(value)) return [];
	const zhItems = Array.isArray(value.zh) ? value.zh : [];
	const enItems = Array.isArray(value.en) ? value.en : [];
	const length = Math.max(zhItems.length, enItems.length);
	if (length === 0) return [];
	return Array.from({ length }, (_, index) => {
		const item = {};
		if (zhItems[index] !== void 0) item.zh = zhItems[index];
		if (enItems[index] !== void 0) item.en = enItems[index];
		return item;
	});
}
/** 专家包 manifest 的数组字段归一化；缺失保持缺失，非数组脏数据降级为空数组。 */
function normalizeManifestItems(value) {
	if (value === void 0) return;
	return Array.isArray(value) ? value : [];
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-custom-runtime.ts
var PLUGIN_METADATA_DIRS$1 = [".codebuddy-plugin", ".workbuddy-plugin"];
var PLUGIN_MANIFEST_FILE$1 = "plugin.json";
var expertPluginLog$1 = {
	log: (...args) => console.log(...args),
	warn: (...args) => console.warn(...args),
	error: (...args) => console.error(...args)
};
var MAX_CUSTOM_EXPERT_AVATAR_BYTES = 5242880;
var ExpertCustomRuntime = class {
	constructor(deps) {
		this.deps = deps;
		this.customExpertDtoCache = /* @__PURE__ */ new Map();
		this.scanCustomExpertsInflight = /* @__PURE__ */ new Map();
	}
	getConfigDir() {
		return this.deps.getConfigDir();
	}
	/** 读取 plugin.json（异步版本，用于不阻塞主线程的场景） */
	async readPluginManifestAsync(dir) {
		for (const metaDir of PLUGIN_METADATA_DIRS$1) {
			const manifestPath = path.join(dir, metaDir, PLUGIN_MANIFEST_FILE$1);
			try {
				const content = await fs_promises.readFile(manifestPath, "utf-8");
				return JSON.parse(content);
			} catch {}
		}
		return null;
	}
	/**
	* 扫描本地自定义专家列表。
	* 基于 marketplace.json 注册清单扫描，只返回已注册且有效的专家。
	* 若 marketplace.json 仅因尾逗号等格式问题损坏，则修复格式后继续扫描。
	* 传入 userId 时，进一步过滤只返回属于该用户的专家。
	*/
	async scanCustomExperts(userId) {
		const userKey = userId ?? "";
		const inflight = this.scanCustomExpertsInflight.get(userKey);
		if (inflight) return inflight;
		const promise = this.doScanCustomExperts(userId);
		this.scanCustomExpertsInflight.set(userKey, promise);
		try {
			return await promise;
		} finally {
			this.scanCustomExpertsInflight.delete(userKey);
		}
	}
	async doScanCustomExperts(userId) {
		try {
			const configDir = this.getConfigDir();
			const marketplaceDir = path.join(configDir, "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
			const pluginsDir = path.join(marketplaceDir, "plugins");
			const manifestPath = path.join(marketplaceDir, ".codebuddy-plugin", "marketplace.json");
			if (!await pathExists$2(manifestPath)) return [];
			let manifest;
			let shouldRewriteManifest = false;
			try {
				const content = await fs_promises.readFile(manifestPath, "utf-8");
				try {
					manifest = JSON.parse(content);
				} catch (parseError) {
					const normalized = this.repairJsonTrailingCommas(content);
					if (normalized === content) throw parseError;
					manifest = JSON.parse(normalized);
					shouldRewriteManifest = true;
					expertPluginLog$1.warn("[ExpertPluginService] scanCustomExperts: repaired malformed marketplace.json");
				}
			} catch {
				expertPluginLog$1.warn("[ExpertPluginService] scanCustomExperts: failed to parse marketplace.json");
				return [];
			}
			const registeredPlugins = manifest?.plugins;
			if (!Array.isArray(registeredPlugins) || registeredPlugins.length === 0) {
				if (shouldRewriteManifest) await this.reconcileCustomMarketplaceManifest(manifestPath, manifest, [], true, true);
				return [];
			}
			let userExpertIds;
			if (userId) {
				const ids = await this.readUserExpertIds(userId);
				if (ids !== null) userExpertIds = new Set(ids);
			}
			const experts = [];
			const validManifestEntries = [];
			const validDirNames = /* @__PURE__ */ new Set();
			for (const plugin of registeredPlugins) {
				if (!plugin.source) continue;
				const dirName = plugin.source.replace(/^\.\/plugins\//, "");
				if (!dirName || this.isUnsafePath(dirName)) continue;
				const expertDir = path.join(pluginsDir, dirName);
				try {
					if (!await pathExists$2(expertDir)) {
						this.customExpertDtoCache.delete(dirName);
						continue;
					}
					const pluginManifest = await this.readPluginManifestAsync(expertDir);
					if (!pluginManifest) {
						this.customExpertDtoCache.delete(dirName);
						continue;
					}
					validDirNames.add(dirName);
					validManifestEntries.push({
						name: pluginManifest.name || plugin.name || dirName,
						source: `./plugins/${dirName}`,
						description: pluginManifest.description ?? plugin.description
					});
					if (userExpertIds && !userExpertIds.has(dirName)) continue;
					const expert = await this.readCustomExpertFromDirCached(expertDir, dirName);
					if (expert) experts.push(expert);
				} catch (err) {
					expertPluginLog$1.warn("[ExpertPluginService] scanCustomExperts: skipping", dirName, err);
				}
			}
			await this.reconcileCustomMarketplaceManifest(manifestPath, manifest, validManifestEntries, true, shouldRewriteManifest);
			for (const cachedDir of this.customExpertDtoCache.keys()) if (!validDirNames.has(cachedDir)) this.customExpertDtoCache.delete(cachedDir);
			return experts;
		} catch (error) {
			expertPluginLog$1.error("[ExpertPluginService] scanCustomExperts failed:", error);
			return [];
		}
	}
	/**
	* 修复 JSON 中字符串外的尾逗号。
	* 逐字符识别字符串与转义状态，避免误改 description 等字符串里的 ",]" / ",}" 文本。
	*/
	repairJsonTrailingCommas(content) {
		let repaired = "";
		let inString = false;
		let escaping = false;
		let changed = false;
		for (let i = 0; i < content.length; i += 1) {
			const ch = content[i];
			if (inString) {
				repaired += ch;
				if (escaping) escaping = false;
				else if (ch === "\\") escaping = true;
				else if (ch === "\"") inString = false;
				continue;
			}
			if (ch === "\"") {
				inString = true;
				repaired += ch;
				continue;
			}
			if (ch === ",") {
				let next = i + 1;
				while (next < content.length && /\s/.test(content[next])) next += 1;
				if (next < content.length && (content[next] === "}" || content[next] === "]")) {
					changed = true;
					continue;
				}
			}
			repaired += ch;
		}
		return changed ? repaired : content;
	}
	/**
	* 将扫描得到的有效注册项写回 marketplace.json。
	* 仅用于格式修复和清理 stale entry，不主动注册磁盘裸目录。
	*/
	async reconcileCustomMarketplaceManifest(manifestPath, manifest, validEntries, manifestExists, forceRewrite = false) {
		const currentPlugins = Array.isArray(manifest.plugins) ? manifest.plugins : [];
		if (!forceRewrite && manifestExists && JSON.stringify(currentPlugins) === JSON.stringify(validEntries)) return;
		if (!manifestExists && validEntries.length === 0) return;
		await fs_promises.mkdir(path.dirname(manifestPath), { recursive: true });
		const nextManifest = {
			name: manifest.name || "my-experts",
			description: manifest.description || `my-experts marketplace (auto-generated)`,
			plugins: validEntries
		};
		await fs_promises.writeFile(manifestPath, JSON.stringify(nextManifest, null, 2), "utf-8");
	}
	/**
	* 带 mtime 缓存的自定义专家读取：plugin.json 未变则复用缓存 DTO，
	* 跳过 readFile + 头像 base64 编码（切 tab 卡顿的主要 CPU 来源）。
	*/
	async readCustomExpertFromDirCached(expertDir, entryName) {
		const mtimeMs = await this.statManifestMtimeMs(expertDir);
		if (mtimeMs !== void 0) {
			const cached = this.customExpertDtoCache.get(entryName);
			if (cached && cached.mtimeMs === mtimeMs) return cached.dto;
		}
		const dto = await this.readCustomExpertFromDir(expertDir, entryName);
		if (dto && mtimeMs !== void 0) this.customExpertDtoCache.set(entryName, {
			mtimeMs,
			dto
		});
		return dto;
	}
	/** 返回专家 plugin.json 的 mtimeMs（用于缓存失效判定）；找不到返回 undefined */
	async statManifestMtimeMs(expertDir) {
		for (const metaDir of PLUGIN_METADATA_DIRS$1) try {
			return (await fs_promises.stat(path.join(expertDir, metaDir, PLUGIN_MANIFEST_FILE$1))).mtimeMs;
		} catch {}
	}
	/** 根据 ID 获取单个本地自定义专家 */
	async getCustomExpert(expertId) {
		if (!expertId || this.isUnsafePath(expertId)) return null;
		try {
			const configDir = this.getConfigDir();
			const pluginsDir = path.join(configDir, "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins");
			const expertDir = path.join(pluginsDir, expertId);
			if (!expertDir.startsWith(pluginsDir)) return null;
			if (!await pathExists$2(expertDir)) return null;
			return await this.readCustomExpertFromDir(expertDir, expertId);
		} catch (error) {
			expertPluginLog$1.error("[ExpertPluginService] getCustomExpert failed:", error);
			return null;
		}
	}
	/** 删除本地自定义专家（目录 + marketplace.json + 用户列表） */
	async deleteCustomExpert(expertId, userId) {
		if (!expertId || this.isUnsafePath(expertId)) return {
			success: false,
			error: "invalid expertId"
		};
		try {
			const configDir = this.getConfigDir();
			const pluginsDir = path.join(configDir, "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins");
			const expertDir = path.join(pluginsDir, expertId);
			if (!expertDir.startsWith(pluginsDir)) return {
				success: false,
				error: "invalid expert path"
			};
			if (!await pathExists$2(expertDir)) return {
				success: false,
				error: "expert directory not found"
			};
			let pluginName;
			const manifest = await this.readPluginManifestAsync(expertDir);
			if (manifest?.name) pluginName = manifest.name;
			await fs_promises.rm(expertDir, {
				recursive: true,
				force: true
			});
			this.customExpertDtoCache.delete(expertId);
			await this.removeFromMarketplaceManifest(expertId);
			if (userId) await this.removeFromUserExperts(userId, expertId);
			if (pluginName) try {
				await this.deps.deactivateExpert(expertId);
			} catch (err) {
				expertPluginLog$1.warn("[ExpertPluginService] deleteCustomExpert: deactivate failed:", err);
			}
			expertPluginLog$1.log(`[ExpertPluginService] Custom expert deleted: ${expertId}`);
			return { success: true };
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			expertPluginLog$1.error("[ExpertPluginService] deleteCustomExpert failed:", msg);
			return {
				success: false,
				error: msg
			};
		}
	}
	/** 将专家 ID 添加到用户的自定义专家列表（去重） */
	async addUserExperts(userId, expertIds) {
		if (!userId || !expertIds.length || this.isUnsafePath(userId)) return;
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			const current = await this.readUserExpertIds(userId);
			const idSet = new Set(current);
			let changed = false;
			for (const id of expertIds) if (!idSet.has(id)) {
				idSet.add(id);
				changed = true;
			}
			if (!changed) return;
			await fs_promises.mkdir(path.dirname(jsonPath), { recursive: true });
			await fs_promises.writeFile(jsonPath, JSON.stringify(Array.from(idSet), null, 2), "utf-8");
		} catch (err) {
			expertPluginLog$1.warn("[ExpertPluginService] addUserExperts failed:", err);
		}
	}
	/** 获取本地自定义专家注册清单监听路径 */
	getCustomExpertWatchPath() {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, ".codebuddy-plugin", "marketplace.json");
	}
	/** 获取单个自定义专家的 plugin.json 监听路径 */
	getCustomExpertPluginJsonPath(expertId) {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins", expertId, ".codebuddy-plugin", "plugin.json");
	}
	/** 清除专家的 .created-by-session 标记文件 */
	async clearCustomExpertSessionMarker(expertId) {
		if (!expertId || this.isUnsafePath(expertId)) return;
		try {
			const configDir = this.getConfigDir();
			const markerPath = path.join(configDir, "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins", expertId, ".created-by-session");
			if (await pathExists$2(markerPath)) await fs_promises.unlink(markerPath);
			this.customExpertDtoCache.delete(expertId);
		} catch (err) {
			expertPluginLog$1.warn("[ExpertPluginService] clearCustomExpertSessionMarker failed:", err);
		}
	}
	/** 安全路径检查：拒绝包含路径穿越的 ID */
	isUnsafePath(id) {
		return /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(id) || /[\\/]/.test(id);
	}
	/** 用户自定义专家列表路径 */
	getUserExpertsJsonPath(userId) {
		return path.join(this.getConfigDir(), "experts", "custom", userId, "experts.json");
	}
	/** 读取用户的自定义专家 ID 列表 */
	/** 返回 null 表示 experts.json 不存在（不限制）；返回数组表示文件存在（按白名单过滤）。 */
	async readUserExpertIds(userId) {
		if (this.isUnsafePath(userId)) return [];
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			if (!await pathExists$2(jsonPath)) return null;
			const raw = await fs_promises.readFile(jsonPath, "utf-8");
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return null;
		}
	}
	/** 从用户列表中移除专家 ID */
	async removeFromUserExperts(userId, expertId) {
		if (this.isUnsafePath(userId)) return;
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			const current = await this.readUserExpertIds(userId) ?? [];
			const filtered = current.filter((id) => id !== expertId);
			if (filtered.length === current.length) return;
			await fs_promises.mkdir(path.dirname(jsonPath), { recursive: true });
			await fs_promises.writeFile(jsonPath, JSON.stringify(filtered, null, 2), "utf-8");
		} catch (err) {
			expertPluginLog$1.warn("[ExpertPluginService] removeFromUserExperts failed:", err);
		}
	}
	/** 从 marketplace.json 中移除指定 expertId 的条目 */
	async removeFromMarketplaceManifest(expertId) {
		try {
			const configDir = this.getConfigDir();
			const manifestPath = path.join(configDir, "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, ".codebuddy-plugin", "marketplace.json");
			if (!await pathExists$2(manifestPath)) return;
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			const manifest = JSON.parse(content);
			if (manifest?.plugins && Array.isArray(manifest.plugins)) {
				manifest.plugins = manifest.plugins.filter((p) => p.source !== `./plugins/${expertId}`);
				await fs_promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
			}
		} catch (err) {
			expertPluginLog$1.warn("[ExpertPluginService] removeFromMarketplaceManifest failed:", err);
		}
	}
	/**
	* 从指定目录读取单个本地自定义专家的 plugin.json 并构造 CustomExpertInfoDTO。
	* 头像相对路径会被转换为 base64 data URL。
	*/
	async readCustomExpertFromDir(expertDir, entryName) {
		const manifest = await this.readPluginManifestAsync(expertDir);
		if (!manifest) return null;
		const json = { ...manifest };
		for (const field of [
			"tags",
			"quickPrompts",
			"triggerPrompts"
		]) {
			const normalized = normalizeLocalizedManifestItems(json[field]);
			if (normalized !== void 0) json[field] = normalized;
		}
		for (const field of [
			"members",
			"connectorIds",
			"bin",
			"references"
		]) {
			const normalized = normalizeManifestItems(json[field]);
			if (normalized !== void 0) json[field] = normalized;
		}
		if (!json.version) json.version = "1.0.0";
		if (json.avatar) json.avatar = await this.resolveAvatarToDataUrl(json.avatar, expertDir);
		if (Array.isArray(json.members)) {
			for (const member of json.members) if (typeof member === "object" && member) {
				if ((!member.id || typeof member.id !== "string") && typeof member.agent === "string" && member.agent.trim()) member.id = member.agent.trim();
				if (member.avatar) member.avatar = await this.resolveAvatarToDataUrl(member.avatar, expertDir);
			}
		}
		json.expertRootDir = expertDir;
		json.id = json.id || json.name || entryName;
		json.isCustomExpert = true;
		json.marketplace = require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
		try {
			const sessionMarkerPath = path.join(expertDir, ".created-by-session");
			if (await pathExists$2(sessionMarkerPath)) {
				const sessionId = await fs_promises.readFile(sessionMarkerPath, "utf-8");
				if (sessionId.trim()) json.createdBySession = sessionId.trim();
			}
		} catch {}
		return json;
	}
	/** 头像相对路径 → base64 data URL 的通用转换 */
	async resolveAvatarToDataUrl(avatarPath, baseDir) {
		if (!avatarPath) return "";
		if (/^(https?|data):/.test(avatarPath)) return avatarPath;
		const rel = avatarPath.replace(/^\.\//, "");
		const abs = path.resolve(baseDir, rel);
		const resolvedBase = path.resolve(baseDir);
		if (!abs.startsWith(resolvedBase + path.sep) && abs !== resolvedBase) return "";
		try {
			if (await pathExists$2(abs)) {
				const stat = await fs_promises.stat(abs);
				if (stat.size > MAX_CUSTOM_EXPERT_AVATAR_BYTES) {
					expertPluginLog$1.warn("[ExpertPluginService] resolveAvatarToDataUrl: avatar file is too large:", avatarPath, stat.size);
					return "";
				}
				const base64Data = (await fs_promises.readFile(abs)).toString("base64");
				return `data:${{
					png: "image/png",
					jpg: "image/jpeg",
					jpeg: "image/jpeg",
					svg: "image/svg+xml",
					webp: "image/webp",
					gif: "image/gif"
				}[path.extname(rel).replace(".", "").toLowerCase() || "png"] || "image/png"};base64,${base64Data}`;
			}
		} catch {}
		return "";
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-locale-utils.ts
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function resolveLocalized(value, locale) {
	if (typeof value === "string") return value;
	if (isRecord$1(value)) {
		const localized = value[locale] ?? value.zh ?? value.en;
		return typeof localized === "string" ? localized : void 0;
	}
}
function localizeWorkbuddyMeta(meta, locale) {
	const tokenSchema = meta.auth?.tokenSchema;
	const localizedTokenSchema = tokenSchema ? {
		...tokenSchema,
		title: resolveLocalized(tokenSchema.title, locale),
		description: resolveLocalized(tokenSchema.description, locale),
		docLabel: resolveLocalized(tokenSchema.docLabel, locale),
		fields: (tokenSchema.fields ?? []).map((field) => ({
			...field,
			label: resolveLocalized(field.label, locale) ?? field.key,
			placeholder: resolveLocalized(field.placeholder, locale),
			description: resolveLocalized(field.description, locale)
		}))
	} : tokenSchema;
	return {
		...meta,
		displayName: resolveLocalized(meta.displayName, locale),
		description: resolveLocalized(meta.description, locale),
		...meta.auth ? { auth: {
			...meta.auth,
			tokenSchema: localizedTokenSchema
		} } : {}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-dependency-runtime.ts
var expertPluginLog = { warn: (...args) => console.warn(...args) };
async function pathExists$1(p) {
	try {
		await fs_promises.access(p);
		return true;
	} catch {
		return false;
	}
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readWorkbuddyMeta(config) {
	const raw = config["x-workbuddy"];
	return isRecord(raw) ? raw : void 0;
}
var ExpertDependencyRuntime = class {
	constructor(deps) {
		this.deps = deps;
	}
	async resolveExpertDependencies(expertId, pluginName, marketplace, locale = "zh", downloadUrl) {
		const bundleName = pluginName || expertId;
		const pluginDir = await this.deps.resolvePluginDir(bundleName, marketplace, downloadUrl);
		const manifest = await this.deps.readPluginManifestAsync(pluginDir);
		if (!manifest) return [];
		const mcpServers = await this.readExpertMcpServers(pluginDir, manifest);
		const mcpDependencies = Object.entries(mcpServers).map(([name, config]) => {
			const rawMeta = readWorkbuddyMeta(config);
			const meta = rawMeta ? localizeWorkbuddyMeta(rawMeta, locale) : void 0;
			return {
				type: "mcp",
				name,
				displayName: meta?.displayName,
				description: meta?.description,
				icon: meta?.icon,
				config,
				workbuddy: meta
			};
		});
		const connectorDependencies = (manifest.dependencies?.connectors ?? []).filter((id) => typeof id === "string" && id.trim().length > 0).map((id) => ({
			type: "connector",
			id
		}));
		return [...mcpDependencies, ...connectorDependencies];
	}
	async readExpertMcpServers(pluginDir, manifest) {
		const declared = manifest.dependencies?.mcpServers ?? manifest.mcpServers;
		if (declared !== void 0) return this.readMcpServersDeclaration(pluginDir, declared);
		const fallbackPath = path.join(pluginDir, ".mcp.json");
		if (await pathExists$1(fallbackPath)) return this.readMcpServersFile(fallbackPath);
		return {};
	}
	async readMcpServersDeclaration(pluginDir, declared) {
		if (typeof declared === "string") return this.readMcpServersFile(path.resolve(pluginDir, declared));
		if (Array.isArray(declared)) {
			const result = {};
			for (const item of declared) {
				if (typeof item !== "string") continue;
				Object.assign(result, await this.readMcpServersFile(path.resolve(pluginDir, item)));
			}
			return result;
		}
		return this.normalizeMcpServers(declared, pluginDir);
	}
	async readMcpServersFile(filePath) {
		try {
			const content = await fs_promises.readFile(filePath, "utf-8");
			const parsed = JSON.parse(content);
			return this.normalizeMcpServers(parsed, path.dirname(filePath));
		} catch (error) {
			expertPluginLog.warn(`[ExpertPluginService] Failed to read MCP dependency file ${filePath}:`, error);
			return {};
		}
	}
	async normalizeMcpServers(raw, baseDir) {
		if (!isRecord(raw)) return {};
		const source = isRecord(raw.mcpServers) ? raw.mcpServers : raw;
		const result = {};
		for (const [name, config] of Object.entries(source)) if (isRecord(config)) result[name] = await this.resolveMcpIconConfig(config, baseDir);
		return result;
	}
	async resolveMcpIconConfig(config, baseDir) {
		const meta = readWorkbuddyMeta(config);
		if (!meta || typeof meta.icon !== "string" || /^(https?:|data:|file:)/.test(meta.icon)) return config;
		const icon = await this.resolveAvatarToDataUrl(meta.icon, baseDir);
		if (!icon) return config;
		return {
			...config,
			"x-workbuddy": {
				...meta,
				icon
			}
		};
	}
	/** 头像相对路径 → base64 data URL 的通用转换 */
	async resolveAvatarToDataUrl(avatarPath, baseDir) {
		if (!avatarPath) return "";
		if (/^(https?|data):/.test(avatarPath)) return avatarPath;
		const rel = avatarPath.replace(/^\.\//, "");
		const abs = path.resolve(baseDir, rel);
		const resolvedBase = path.resolve(baseDir);
		if (!abs.startsWith(resolvedBase + path.sep) && abs !== resolvedBase) return "";
		try {
			if (await pathExists$1(abs)) {
				const base64Data = (await fs_promises.readFile(abs)).toString("base64");
				return `data:${{
					png: "image/png",
					jpg: "image/jpeg",
					jpeg: "image/jpeg",
					svg: "image/svg+xml",
					webp: "image/webp",
					gif: "image/gif"
				}[path.extname(rel).replace(".", "").toLowerCase() || "png"] || "image/png"};base64,${base64Data}`;
			}
		} catch {}
		return "";
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-session-switcher.ts
/**
* SessionPluginSwitcher —— daemon 端专家插件的「会话内切换」薄适配（Phase 5.5）。
*
* 这是 expert 域**唯一合理留在 server 的能力**：它不属于业务 SSOT（那些已迁 core），
* 而是纯 daemon runtime 编排——通过 sidecar 查 session 的 agent-cli `acpEndpoint`，
* 再调 CLI 端 `/api/v1/plugins/*` 做 marketplace 注册 / 插件 enable·disable / agent override。
*
* 从 `plugin-service.ts` 拆出以隔离职责、独立可测。依赖（sidecar httpBase 解析 / configDir /
* plugin→marketplace 判定）由 `ExpertPluginService` 注入。
*/
var EXPERTS_MARKETPLACE$1 = "experts";
var INLINE_MARKETPLACE = "inline";
var MARKETPLACE_METADATA_DIR = ".codebuddy-plugin";
var MARKETPLACE_MANIFEST_FILE = "marketplace.json";
/** CLI 对「无版本号」插件统一记成 unknown，这类包没有可靠的版本比对基准。 */
var UNKNOWN_PLUGIN_VERSION = "unknown";
async function pathExists(p) {
	try {
		await node_fs.promises.access(p);
		return true;
	} catch {
		return false;
	}
}
var SessionPluginSwitcher = class {
	constructor(deps) {
		this.deps = deps;
		this.marketplaceRegistered = /* @__PURE__ */ new Set();
	}
	/**
	* 在指定 session 的 agent-cli runtime 内切换专家插件（enable/disable + agent override）。
	*
	* enable 时会先关掉当前 runtime 里其他已启用的 experts / my-experts 残留包
	* （含同名 @inline 镜像），避免开放平台改名后同名 skill 仍命中旧目录。
	*
	* @param enablePluginName   要 enable 的 plugin 名称（可为 undefined 表示无需 enable）
	* @param agentName  当前 session 应绑定的专家 agent 名称（可为 undefined 表示清除 override）
	* @param sourcePluginId 供 AgentManager 定位 plugin 的 "name@marketplace"；未传则用 enable 字段
	* @param internalModelRequestHeaders 要下发给 CLI 的内部模型请求临时 headers
	*/
	async switchExpertPluginForSession(sessionId, disablePluginName, enablePluginName, agentName, sourcePluginId, internalModelRequestHeaders, runtimeHttpBase) {
		if (!sessionId) {
			console.warn("[SessionPluginSwitcher] switchExpertPluginForSession: sessionId required");
			return false;
		}
		if (!disablePluginName && !enablePluginName && !agentName && !sourcePluginId && internalModelRequestHeaders === void 0) return false;
		const httpBase = runtimeHttpBase ?? await this.resolveSessionHttpBase(sessionId);
		if (!httpBase) {
			console.warn(`[SessionPluginSwitcher] plugin switch skipped: no acpEndpoint sessionId=${sessionId}, disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"}, agent=${agentName || "none"}`);
			return false;
		}
		if (disablePluginName || enablePluginName || agentName || sourcePluginId) await this.ensureExpertsMarketplaceRegistered(httpBase);
		const enableMarketplace = enablePluginName ? await this.deps.resolvePluginMarketplace(enablePluginName) : void 0;
		const sessionPlugins = enablePluginName ? await this.fetchSessionPlugins(httpBase) : [];
		if (enablePluginName && enableMarketplace) await this.ensureSummonedExpertVersionMaterialized(httpBase, enablePluginName, enableMarketplace, sessionPlugins);
		const leftoverDisableIds = enablePluginName ? this.collectLeftoverExpertDisableIds(sessionPlugins, enablePluginName, disablePluginName) : [];
		const url = `${httpBase}/api/v1/plugins/switch`;
		const payload = { persist: false };
		if (disablePluginName) payload.disable = `${disablePluginName}@${await this.deps.resolvePluginMarketplace(disablePluginName)}`;
		if (enablePluginName) payload.enable = `${enablePluginName}@${enableMarketplace}`;
		if (agentName) payload.agentName = agentName;
		const resolvedSourcePluginId = sourcePluginId ?? (enablePluginName ? `${enablePluginName}@${enableMarketplace}` : void 0);
		if (resolvedSourcePluginId) payload.sourcePluginId = resolvedSourcePluginId;
		if (internalModelRequestHeaders !== void 0) payload.internalModelRequestHeaders = internalModelRequestHeaders;
		const shouldRefreshCustomExpertAgentOverride = !!agentName && !!enablePluginName && resolvedSourcePluginId?.endsWith(`@my-experts`);
		if (shouldRefreshCustomExpertAgentOverride) {
			delete payload.agentName;
			delete payload.sourcePluginId;
			delete payload.internalModelRequestHeaders;
		}
		try {
			const primaryDisableId = typeof payload.disable === "string" ? payload.disable : void 0;
			const extraDisableIds = leftoverDisableIds.filter((id) => id !== primaryDisableId);
			for (const leftoverId of extraDisableIds) if (!await this.postPluginSwitch(url, {
				persist: false,
				disable: leftoverId
			})) console.warn(`[SessionPluginSwitcher] leftover expert plugin disable failed: sessionId=${sessionId}, disable=${leftoverId}, enable=${enablePluginName || "none"}`);
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_code_cache.gatewaySecretHeaders()
				},
				body: JSON.stringify(payload)
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				console.warn(`[SessionPluginSwitcher] plugin switch failed: status=${response.status} ${response.statusText}, sessionId=${sessionId}, disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"}, agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"}, internalModelRequestHeaders=${Object.keys(internalModelRequestHeaders ?? {}).length}, body=${text}`);
				return false;
			}
			if (shouldRefreshCustomExpertAgentOverride) {
				const overrideResponse = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...require_code_cache.gatewaySecretHeaders()
					},
					body: JSON.stringify({
						persist: false,
						...agentName ? { agentName } : {},
						...resolvedSourcePluginId ? { sourcePluginId: resolvedSourcePluginId } : {},
						...internalModelRequestHeaders !== void 0 ? { internalModelRequestHeaders } : {}
					})
				});
				if (!overrideResponse.ok) {
					const text = await overrideResponse.text().catch(() => "");
					console.warn(`[SessionPluginSwitcher] plugin agent override refresh failed: status=${overrideResponse.status} ${overrideResponse.statusText}, sessionId=${sessionId}, agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"}, body=${text}`);
					return false;
				}
			}
			console.log(`[SessionPluginSwitcher] plugin switch succeeded: disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"} agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"} internalModelRequestHeaders=${Object.keys(internalModelRequestHeaders ?? {}).length} on session ${sessionId}`);
			return true;
		} catch (error) {
			console.warn("[SessionPluginSwitcher] plugin switch request failed:", {
				sessionId,
				disablePluginName,
				enablePluginName,
				agentName,
				sourcePluginId: resolvedSourcePluginId,
				internalModelRequestHeaders: Object.keys(internalModelRequestHeaders ?? {}).length,
				error
			});
			return false;
		}
	}
	/**
	* 以当前 agent-cli runtime 的插件列表为准判断专家插件是否仍启用。
	*
	* 专家插件通过 `persist:false` 只在当前 CLI 进程内生效；WorkBuddy server 侧的
	* "已应用"缓存可能因为插件被 disable、runtime 重建等原因变旧，所以跳过
	* apply 前必须回到当前 CLI 进程查询真实状态。
	*/
	async isExpertPluginEnabledForSession(sessionId, pluginName, marketplace) {
		if (!sessionId || !pluginName || !marketplace) return false;
		const httpBase = await this.resolveSessionHttpBase(sessionId);
		if (!httpBase) return false;
		try {
			return (await this.fetchSessionPlugins(httpBase)).some((plugin) => plugin.name === pluginName && plugin.marketplace === marketplace && plugin.status === "enabled");
		} catch (error) {
			console.warn("[SessionPluginSwitcher] isExpertPluginEnabledForSession failed:", {
				sessionId,
				pluginName,
				marketplace,
				error
			});
			return false;
		}
	}
	/**
	* 召唤前确保 CLI 版本缓存里跑的就是 marketplace 当前落盘的专家包版本（issue #116369）。
	*
	* 双层脑裂的成因：daemon 侧 `ExpertBundleRuntime.ensureDownloaded` 把新版覆盖写进
	* `plugins/marketplaces/<mp>/plugins/<bundle>/` 并刷新 `marketplace.json`，但 Agent CLI
	* 运行的是 `installed_plugins.json` 选中的不可变版本缓存
	* `plugins/cache/<mp>/<name>/<version>/`：
	*   - `/api/v1/plugins/switch` 只切启用态、不物化；
	*   - CLI 启动期的 `migrateLegacyEnabledPluginCaches` 只判断旧 `installPath` 是否还在，
	*     在则直接短路，不比对 marketplace 当前版本。
	* 于是「后台传了新版 → daemon 下载激活 1.5.0 → 会话仍加载 1.3.3 的 SKILL.md」，
	* 且重新召唤也无法自愈。受影响的不止 Skill，同一 installPath 下的 agents / commands /
	* hooks / MCP 声明同样是旧版。
	*
	* 这里在注册 marketplace 之后、下发 switch 之前补一次物化，并保持三条约束：
	*   - 只有版本不一致才调用，同版本幂等跳过，不给召唤加固定开销；
	*   - `persistEnabledState:false` + `autoEnable:false`，只更新版本缓存与 registry，
	*     绝不改写用户持久化的 `enabledPlugins`；
	*   - 物化失败只告警不抛错，退化回原有行为，不阻断召唤。
	* 旧版本缓存由 CLI 保留，存量活跃会话继续可用。
	*/
	async ensureSummonedExpertVersionMaterialized(httpBase, pluginName, marketplaceName, sessionPlugins) {
		const pluginId = `${pluginName}@${marketplaceName}`;
		try {
			const marketplaceVersion = await this.readMarketplacePluginVersion(marketplaceName, pluginName);
			if (!marketplaceVersion || marketplaceVersion === UNKNOWN_PLUGIN_VERSION) return;
			const installedVersion = sessionPlugins.find((plugin) => plugin.name === pluginName && plugin.marketplace === marketplaceName)?.version;
			if (installedVersion === marketplaceVersion) return;
			const response = await fetch(`${httpBase}/api/v1/plugins`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_code_cache.gatewaySecretHeaders()
				},
				body: JSON.stringify({
					plugin: pluginId,
					options: {
						persistEnabledState: false,
						autoEnable: false
					}
				})
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				console.warn(`[SessionPluginSwitcher] expert version materialize failed: plugin=${pluginId}, installed=${installedVersion || "none"}, marketplace=${marketplaceVersion}, status=${response.status} ${response.statusText}, body=${text}`);
				return;
			}
			console.log(`[SessionPluginSwitcher] expert version materialized: plugin=${pluginId}, installed=${installedVersion || "none"} -> marketplace=${marketplaceVersion}`);
		} catch (error) {
			console.warn("[SessionPluginSwitcher] ensureSummonedExpertVersionMaterialized failed:", {
				pluginId,
				error
			});
		}
	}
	/**
	* 从 marketplace.json 找到 plugin 对应的包目录，读出其 plugin.json 版本。
	*
	* 目录名是 bundleName，plugin 名是 manifest.name，两者可能不同，所以必须经
	* `marketplace.json` 的 `source` 做 name → 目录映射，不能直接按 plugin 名拼路径。
	*/
	async readMarketplacePluginVersion(marketplaceName, pluginName) {
		const marketplaceDir = node_path.join(this.deps.getConfigDir(), "plugins", "marketplaces", marketplaceName);
		const manifestPath = node_path.join(marketplaceDir, MARKETPLACE_METADATA_DIR, MARKETPLACE_MANIFEST_FILE);
		let parsed;
		try {
			parsed = JSON.parse(await node_fs.promises.readFile(manifestPath, "utf-8"));
		} catch {
			return;
		}
		const entry = Array.isArray(parsed?.plugins) ? parsed.plugins.find((plugin) => plugin?.name === pluginName) : void 0;
		const source = typeof entry?.source === "string" ? entry.source : void 0;
		if (!source) return;
		const pluginDir = node_path.resolve(marketplaceDir, source);
		const relative = node_path.relative(marketplaceDir, pluginDir);
		if (!relative || relative.startsWith("..") || node_path.isAbsolute(relative)) {
			console.warn(`[SessionPluginSwitcher] marketplace entry escapes marketplace dir: marketplace=${marketplaceName}, plugin=${pluginName}`);
			return;
		}
		const version = (await this.deps.readPluginManifestAsync(pluginDir).catch(() => null))?.version;
		return typeof version === "string" && version.trim() !== "" ? version.trim() : void 0;
	}
	/**
	* 开放平台改名后，本机 marketplace 仍可能残留旧专家包（含 @inline 镜像）。
	* 召唤只 enable 新包时必须先关掉这些残留，否则同名 skill 会被先注册的旧包抢走。
	*/
	collectLeftoverExpertDisableIds(plugins, enablePluginName, explicitDisablePluginName) {
		const leftoverExpertNames = new Set(plugins.filter((plugin) => plugin.status === "enabled" && plugin.name !== enablePluginName && this.isExpertMarketplace(plugin.marketplace)).map((plugin) => plugin.name));
		if (explicitDisablePluginName && explicitDisablePluginName !== enablePluginName) leftoverExpertNames.add(explicitDisablePluginName);
		return [...new Set(plugins.filter((plugin) => plugin.status === "enabled" && leftoverExpertNames.has(plugin.name) && (this.isExpertMarketplace(plugin.marketplace) || plugin.marketplace === INLINE_MARKETPLACE)).map((plugin) => `${plugin.name}@${plugin.marketplace}`))];
	}
	isExpertMarketplace(marketplace) {
		return marketplace === EXPERTS_MARKETPLACE$1 || marketplace === "my-experts";
	}
	async fetchSessionPlugins(httpBase) {
		try {
			const response = await fetch(`${httpBase}/api/v1/plugins`, { headers: require_code_cache.gatewaySecretHeaders() });
			if (!response.ok) {
				console.warn("[SessionPluginSwitcher] fetchSessionPlugins non-ok:", {
					httpBase,
					status: response.status,
					statusText: response.statusText
				});
				return [];
			}
			const payload = await response.json().catch(() => void 0);
			return (Array.isArray(payload) ? payload : payload && typeof payload === "object" && Array.isArray(payload.data) ? payload.data : []).flatMap((plugin) => {
				if (!plugin || typeof plugin !== "object") return [];
				const item = plugin;
				const name = typeof item.name === "string" ? item.name : "";
				const marketplace = typeof item.marketplace === "string" ? item.marketplace : "";
				const status = typeof item.status === "string" ? item.status : "";
				const version = typeof item.version === "string" ? item.version : void 0;
				if (!name || !marketplace) return [];
				return [{
					name,
					marketplace,
					status,
					version
				}];
			});
		} catch (error) {
			console.warn("[SessionPluginSwitcher] fetchSessionPlugins failed:", {
				httpBase,
				error
			});
			return [];
		}
	}
	async postPluginSwitch(url, payload) {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_code_cache.gatewaySecretHeaders()
				},
				body: JSON.stringify(payload)
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				console.warn(`[SessionPluginSwitcher] plugin switch failed: status=${response.status} ${response.statusText}, disable=${String(payload.disable || "none")}, enable=${String(payload.enable || "none")}, body=${text}`);
				return false;
			}
			return true;
		} catch (error) {
			console.warn("[SessionPluginSwitcher] plugin switch request failed:", {
				disable: payload.disable,
				enable: payload.enable,
				error
			});
			return false;
		}
	}
	/** 从 sidecar 查询指定 session 的 agent-cli HTTP base URL。 */
	async resolveSessionHttpBase(sessionId) {
		try {
			return await this.deps.resolveSessionHttpBase(sessionId);
		} catch (error) {
			console.warn("[SessionPluginSwitcher] resolveSessionHttpBase failed:", error);
			return;
		}
	}
	/**
	* 确保 experts marketplace（及 my-experts 自定义专家 marketplace）已在 CLI 端 PluginManager 中注册。
	*/
	async ensureExpertsMarketplaceRegistered(httpBase) {
		await this.registerMarketplaceIfNeeded(httpBase, EXPERTS_MARKETPLACE$1, this.getMarketplaceDir());
		const myExpertsDir = node_path.join(this.deps.getConfigDir(), "plugins", "marketplaces", require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (await pathExists(myExpertsDir)) await this.registerMarketplaceIfNeeded(httpBase, require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, myExpertsDir);
	}
	async registerMarketplaceIfNeeded(httpBase, marketplaceName, marketplaceDir) {
		const key = `${httpBase}:${marketplaceName}`;
		if (this.marketplaceRegistered.has(key)) return;
		try {
			const url = `${httpBase}/api/v1/plugins/marketplaces`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_code_cache.gatewaySecretHeaders()
				},
				body: JSON.stringify({
					source: marketplaceDir,
					name: marketplaceName
				})
			});
			if (response.ok) {
				this.marketplaceRegistered.add(key);
				console.log(`[SessionPluginSwitcher] Marketplace "${marketplaceName}" registered on ${httpBase}`);
			} else {
				const text = await response.text().catch(() => "");
				console.warn(`[SessionPluginSwitcher] Failed to register "${marketplaceName}" marketplace: ${response.status} ${text}`);
			}
		} catch (error) {
			console.warn(`[SessionPluginSwitcher] registerMarketplaceIfNeeded("${marketplaceName}") failed:`, error);
		}
	}
	getMarketplaceDir() {
		return node_path.join(this.deps.getConfigDir(), "plugins", "marketplaces", EXPERTS_MARKETPLACE$1);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/runtime/expert-plugin-runtime.ts
/**
* 专家 Plugin 服务
*
* 核心职责：
* 1. 下载 tar.gz/zip → 解压到 ~/.workbuddy/plugins/marketplaces/experts/plugins/{id}/
* 2. 更新 experts marketplace.json（让 DirectoryMarketplace 能扫描到专家）
* 3. 清理历史遗留的 plugin 目录 settings.json 中的 agent 覆盖，避免全局污染 default agent
* 4. 提供 switchExpertPluginForSession：通过 sidecar 查询 session acpEndpoint，
*    调用 CLI 的 /api/v1/plugins/switch 控制专家 plugin 在该 session 上原子切换
*
* 本地目录结构：
*   ~/.workbuddy/plugins/marketplaces/experts/
*   ├── .codebuddy-plugin/
*   │   └── marketplace.json         ← 自动生成/更新
*   └── plugins/
*       ├── TradingAgentTeam/
*       │   ├── .workbuddy-plugin/
*       │   │   └── plugin.json
*       │   ├── settings.json        ← 历史遗留的 agent 覆盖文件，启动时会清理
*       │   ├── agents/
*       │   └── skills/
*       └── InternalCommsExpert/
*           └── ...
*/
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
/** Plugin 清单文件查找目录（按优先级） */
var PLUGIN_METADATA_DIRS = [".codebuddy-plugin", ".workbuddy-plugin"];
var PLUGIN_MANIFEST_FILE = "plugin.json";
var PLUGIN_SETTINGS_FILE = "settings.json";
/** 专家 marketplace 名称 */
var EXPERTS_MARKETPLACE = "experts";
var DEFAULT_EXPERT_PLUGIN_HOST_CAPABILITIES = {
	getConfigDir: () => require_code_cache.getWorkbuddyRuntimeConfigDir(),
	resolveSessionHttpBase: async () => void 0
};
function isEnterpriseGatewayDownloadUrl(url) {
	try {
		const { hostname, pathname } = new URL(url);
		const host = hostname.toLowerCase();
		return (host === "copilot.qq.com" || host.endsWith(".copilot.qq.com")) && pathname.includes("/v2/download/");
	} catch {
		return false;
	}
}
function stripEnterpriseGatewayDownloadParams(url) {
	const qIndex = url.indexOf("?");
	if (qIndex < 0) return url;
	const base = url.slice(0, qIndex);
	const kept = url.slice(qIndex + 1).split("&").filter((seg) => {
		const key = seg.split("=")[0];
		return key !== "q-url-param-list" && key !== "source";
	});
	return kept.length > 0 ? `${base}?${kept.join("&")}` : base;
}
var ExpertPluginService = class ExpertPluginService {
	constructor() {
		this.activeExperts = /* @__PURE__ */ new Set();
		this.expertBundleMap = /* @__PURE__ */ new Map();
		this.hostCapabilities = DEFAULT_EXPERT_PLUGIN_HOST_CAPABILITIES;
		this.customRuntime = new ExpertCustomRuntime({
			getConfigDir: () => this.getConfigDir(),
			deactivateExpert: (expertId) => this.deactivateExpert(expertId)
		});
		this.bundleRuntime = new ExpertBundleRuntime({
			getConfigDir: () => this.getConfigDir(),
			readPluginManifestAsync: (dir) => this.readPluginManifestAsync(dir),
			hasPluginManifestAsync: (dir) => this.hasPluginManifestAsync(dir),
			isTrustedDownloadUrl: (url) => this.isTrustedDownloadUrl(url),
			shouldStripEnterpriseGatewayParams: (url) => this.isEnterpriseExpertDownloadEnabled() && this.isEnterpriseGatewayBundleUrl(url),
			stripEnterpriseGatewayDownloadParams
		});
		this.dependencyRuntime = new ExpertDependencyRuntime({
			resolvePluginDir: (bundleName, marketplace, downloadUrl) => this.resolveDependencyPluginDir(bundleName, marketplace, downloadUrl),
			readPluginManifestAsync: (pluginDir) => this.readPluginManifestAsync(pluginDir)
		});
		this.removePersistedGeneratedAgentOverrides().catch(() => {});
	}
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
	}
	getConfigDir() {
		return this.hostCapabilities.getConfigDir();
	}
	async activateExpert(expertId, pluginName, updatedAt, marketplace, downloadUrl) {
		let bundleName = pluginName;
		try {
			bundleName = await this.resolvePreferredBundleName(expertId, pluginName);
			if (!bundleName.trim()) return {
				success: false,
				expertType: "skill",
				error: `Cannot resolve plugin bundle for expert: ${expertId}`
			};
			let localPath;
			if (marketplace === "my-experts") localPath = this.getPluginDirForMarketplace(bundleName, marketplace);
			else {
				const hadPreferred = await this.hasPluginManifestAsync(this.getPluginDir(bundleName));
				try {
					localPath = await this.ensureDownloaded(bundleName, updatedAt, downloadUrl);
				} catch (error) {
					if (hadPreferred || bundleName === expertId) throw error;
					const leftoverName = await this.findInstalledBundleName([expertId]);
					if (!leftoverName) throw error;
					localPath = this.getPluginDir(leftoverName);
				}
			}
			const manifest = await this.readPluginManifestAsync(localPath);
			if (!manifest) return {
				success: false,
				expertType: "skill",
				error: `Failed to read plugin.json for expert: ${expertId}`
			};
			const expertType = manifest.expertType || "skill";
			const agentName = await this.resolveExpertAgentName(localPath, manifest, expertId);
			await this.updateMarketplaceManifest(bundleName, marketplace);
			await this.removeGeneratedAgentOverrideFile(localPath);
			const pluginRegisteredName = manifest.name;
			this.activeExperts.add(expertId);
			this.hostCapabilities.onRuntimeConfigChanged?.();
			console.log(`[ExpertPluginService] Expert activated: ${expertId}`, {
				expertType,
				agentName,
				pluginRegisteredName,
				localPath
			});
			return {
				success: true,
				expertType,
				agentName,
				localPath,
				pluginRegisteredName
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.error("[ExpertPluginService] Failed to activate expert:", {
				expertId,
				bundleName,
				pluginName,
				updatedAt,
				error
			});
			return {
				success: false,
				expertType: "skill",
				error: message
			};
		}
	}
	/**
	* Cache-only：从官方目录 manifest.json 的 plugin 字段取 COS bundle 名。
	* 匹配 id | marketExpertId | sourceId。无 kebab fallback、不读 persisted bundle map。
	*/
	async lookupCatalogPluginName(expertId) {
		return this.lookupBundleNameFromManifestCache(expertId);
	}
	/**
	* 已落地目录 hint。kebab(expertId) 丢弃。禁止当作 omit-marketplace COS 名。
	*/
	async lookupLandedBundleHint(expertId) {
		const kebab = this.toKebabCase(expertId);
		const fromMemory = this.expertBundleMap.get(expertId);
		const fromPersist = await this.lookupBundleNameFromPersistedMap(expertId);
		for (const raw of [fromMemory, fromPersist]) if (typeof raw === "string" && raw.trim() !== "" && raw !== kebab) return raw;
	}
	/**
	* 删除历史生成的 settings.json（仅清理纯 `{ agent: string }` 覆盖文件）。
	*
	* 这些文件会让 plugin-loader-manager 在 rebuildAgents 时把旧专家 agent
	* 全局 patch 到 default agent，导致会话外串脏。
	*/
	async removeGeneratedAgentOverrideFile(pluginDir) {
		try {
			const settingsPath = path.join(pluginDir, PLUGIN_SETTINGS_FILE);
			const payload = await this.readGeneratedAgentOverride(settingsPath);
			if (!payload) return;
			await fs_promises.unlink(settingsPath);
			console.log(`[ExpertPluginService] Removed stale expert settings.json: ${settingsPath}`, payload);
		} catch (error) {
			console.warn(`[ExpertPluginService] Failed to remove settings.json at ${pluginDir}:`, error);
		}
	}
	async deactivateExpert(expertId) {
		this.activeExperts.delete(expertId);
		const pluginDir = await this.getExpertLocalPath(expertId);
		if (pluginDir) await this.removeGeneratedAgentOverrideFile(pluginDir);
		this.hostCapabilities.onRuntimeConfigChanged?.();
		console.log(`[ExpertPluginService] Expert deactivated: ${expertId}`);
	}
	/**
	* 原子切换专家 plugin：在一次 HTTP 调用中 disable 旧 + enable 新，只触发一次 rebuildAgents。
	* 如果 plugin 未变化但专家对应的 agent 变化，也会下发 session 级 agent override。
	*
	* @param sessionId  目标 session 的 id
	* @param disablePluginName  要 disable 的 plugin 名称（可为 undefined 表示无需 disable）
	* @param enablePluginName   要 enable 的 plugin 名称（可为 undefined 表示无需 enable）
	* @param agentName  当前 session 应绑定的专家 agent 名称（可为 undefined 表示清除 override）
	* @param sourcePluginId 供 AgentManager 定位 plugin 的 "name@marketplace"；未传则用 enable 字段
	* @param internalModelRequestHeaders 要下发给 CLI 的内部模型请求临时 headers
	*/
	async switchExpertPluginForSession(sessionId, disablePluginName, enablePluginName, agentName, sourcePluginId, internalModelRequestHeaders, runtimeHttpBase) {
		return this.getSessionSwitcher().switchExpertPluginForSession(sessionId, disablePluginName, enablePluginName, agentName, sourcePluginId, internalModelRequestHeaders, runtimeHttpBase);
	}
	/**
	* 以当前 agent-cli runtime 的插件列表为准判断专家插件是否仍启用。
	*
	* 专家插件通过 `persist:false` 只在当前 CLI 进程内生效；WorkBuddy server 侧的
	* "已应用"缓存可能因为插件被 disable、runtime 重建等原因变旧，所以跳过
	* apply 前必须回到当前 CLI 进程查询真实状态。
	*/
	async isExpertPluginEnabledForSession(sessionId, pluginName, marketplace) {
		return this.getSessionSwitcher().isExpertPluginEnabledForSession(sessionId, pluginName, marketplace);
	}
	getSessionSwitcher() {
		if (!this._sessionSwitcher) this._sessionSwitcher = new SessionPluginSwitcher({
			resolveSessionHttpBase: (sessionId) => this.hostCapabilities.resolveSessionHttpBase(sessionId),
			getConfigDir: () => this.hostCapabilities.getConfigDir(),
			resolvePluginMarketplace: (pluginName) => this.resolvePluginMarketplace(pluginName),
			readPluginManifestAsync: (pluginDir) => this.readPluginManifestAsync(pluginDir)
		});
		return this._sessionSwitcher;
	}
	getActiveExperts() {
		return [...this.activeExperts];
	}
	async isExpertDownloaded(expertId) {
		const bundleName = await this.resolveBundleName(expertId);
		return this.hasPluginManifestAsync(this.getPluginDir(bundleName));
	}
	async getExpertLocalPath(expertId, marketplace) {
		const bundleName = await this.resolveBundleName(expertId, void 0, marketplace);
		return resolveLocalExpertPluginDir(this.getConfigDir(), bundleName, marketplace, (dir) => this.hasPluginManifestAsync(dir));
	}
	async resolveExpertAgentPromptSource(expertId, marketplace, pluginNameHint) {
		const bundleName = await this.resolveBundleName(expertId, pluginNameHint, marketplace);
		const pluginDir = await resolveLocalExpertPluginDir(this.getConfigDir(), bundleName, marketplace, (dir) => this.hasPluginManifestAsync(dir));
		if (!pluginDir) return;
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return;
		const agentName = manifest.expertType === "team" ? manifest.teamInfo?.leadAgent : await this.resolveExpertAgentName(pluginDir, manifest, expertId);
		if (!agentName) return;
		const filePath = await resolveExpertAgentMarkdownPath(pluginDir, agentName);
		return filePath ? {
			agentName,
			filePath
		} : void 0;
	}
	async getExpertManifest(expertId) {
		const bundleName = await this.resolveBundleName(expertId);
		return await this.readPluginManifestAsync(this.getPluginDir(bundleName)) ?? void 0;
	}
	async getExpertManifestFromMarketplace(expertId, marketplace) {
		const bundleName = await this.resolveBundleName(expertId, void 0, marketplace);
		return await this.readPluginManifestAsync(this.getPluginDirForMarketplace(bundleName, marketplace)) ?? void 0;
	}
	async resolveExpertDependencies(expertId, pluginName, marketplace, locale = "zh", downloadUrl) {
		const bundleName = await this.resolveBundleName(expertId, pluginName, marketplace);
		return this.dependencyRuntime.resolveExpertDependencies(expertId, bundleName, marketplace, locale, downloadUrl);
	}
	async getExpertAgentName(expertId) {
		const pluginDir = await this.getExpertLocalPath(expertId);
		if (!pluginDir) return;
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return;
		return this.resolveExpertAgentName(pluginDir, manifest, expertId);
	}
	async getExpertAgentNameFromMarketplace(expertId, marketplace) {
		const bundleName = await this.resolveBundleName(expertId, void 0, marketplace);
		const pluginDir = this.getPluginDirForMarketplace(bundleName, marketplace);
		if (!await this.hasPluginManifestAsync(pluginDir)) return;
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return;
		return this.resolveExpertAgentName(pluginDir, manifest, expertId);
	}
	/**
	* 解析专家的完整位置信息（manifest + marketplace + agentName）。
	*
	* 查找优先级：hintMarketplace → 官方 experts → 自定义 my-experts。
	* 若本地无 manifest，会自动 activateExpert（下载/解压），激活后再查。
	*/
	async resolveExpertLocation(expertId, hintMarketplace, pluginName, downloadUrl) {
		if (pluginName) await this.resolvePreferredBundleName(expertId, pluginName);
		let resolved = await this.findManifestAcrossMarketplaces(expertId, hintMarketplace);
		if (!resolved) {
			if (!(await this.activateExpert(expertId, pluginName, void 0, hintMarketplace ?? void 0, downloadUrl)).success) return null;
			resolved = await this.findManifestAcrossMarketplaces(expertId, hintMarketplace);
		}
		if (!resolved) return null;
		const agentName = await this.findAgentNameAcrossMarketplaces(expertId, resolved.marketplace);
		if (!agentName) return null;
		return {
			manifest: resolved.manifest,
			marketplace: resolved.marketplace,
			agentName
		};
	}
	/**
	* 按优先级在多个 marketplace 中查找 manifest。
	* 优先级：hintMarketplace → 官方 experts → 自定义 my-experts。
	*/
	async findManifestAcrossMarketplaces(expertId, hintMarketplace) {
		if (hintMarketplace) {
			const manifest = hintMarketplace === "experts" ? await this.getExpertManifest(expertId) : await this.getExpertManifestFromMarketplace(expertId, hintMarketplace);
			return manifest?.name ? {
				manifest,
				marketplace: hintMarketplace
			} : null;
		}
		const officialManifest = await this.getExpertManifest(expertId);
		if (officialManifest?.name) return {
			manifest: officialManifest,
			marketplace: "experts"
		};
		const myExpertsManifest = await this.getExpertManifestFromMarketplace(expertId, require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (myExpertsManifest?.name) return {
			manifest: myExpertsManifest,
			marketplace: require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME
		};
		return null;
	}
	/**
	* 按优先级在多个 marketplace 中查找 agentName。
	* 优先级：已确定的 marketplace → 官方 experts → 自定义 my-experts。
	*/
	async findAgentNameAcrossMarketplaces(expertId, resolvedMarketplace) {
		return resolvedMarketplace === "experts" ? this.getExpertAgentName(expertId) : this.getExpertAgentNameFromMarketplace(expertId, resolvedMarketplace);
	}
	async updateMarketplaceManifest(bundleName, marketplace) {
		return this.bundleRuntime.updateMarketplaceManifest(bundleName, marketplace);
	}
	async ensureDownloaded(bundleName, updatedAt, downloadUrl) {
		return this.bundleRuntime.ensureDownloaded(bundleName, updatedAt, downloadUrl);
	}
	async lookupCatalogExpertEntry(expertId) {
		try {
			const manifestPath = path.join(this.getConfigDir(), "app", "cache", "experts", "manifest.json");
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			return JSON.parse(content).experts?.find((e) => e.id === expertId || e.marketExpertId === expertId || e.sourceId === expertId || e.source_id === expertId);
		} catch {
			return;
		}
	}
	async lookupBundleNameFromManifestCache(expertId) {
		const expert = await this.lookupCatalogExpertEntry(expertId);
		return typeof expert?.plugin === "string" && expert.plugin.trim() !== "" ? expert.plugin : void 0;
	}
	uniquePersistIdentityKeys(values) {
		const seen = /* @__PURE__ */ new Set();
		const result = [];
		for (const raw of values) {
			const value = raw?.trim();
			if (!value || seen.has(value)) continue;
			seen.add(value);
			result.push(value);
		}
		return result;
	}
	getExpertBundleMapPath() {
		return path.join(this.getConfigDir(), "app", "cache", "experts", "expert-bundle-map.json");
	}
	async lookupBundleNameFromPersistedMap(expertId) {
		try {
			const content = await fs_promises.readFile(this.getExpertBundleMapPath(), "utf-8");
			const bundleName = JSON.parse(content)?.[expertId];
			return typeof bundleName === "string" && bundleName.trim() !== "" ? bundleName : void 0;
		} catch {
			return;
		}
	}
	async persistExpertBundleMapping(expertId, bundleName) {
		if (!expertId || !bundleName || expertId === bundleName || require_conversations.looksLikeOfficialMarketExpertId(bundleName)) return;
		const catalog = await this.lookupCatalogExpertEntry(expertId);
		const keys = this.uniquePersistIdentityKeys([
			expertId,
			catalog?.id,
			catalog?.marketExpertId,
			catalog?.sourceId,
			catalog?.source_id
		]).filter((key) => key !== bundleName);
		if (keys.length === 0) return;
		for (const key of keys) this.expertBundleMap.set(key, bundleName);
		try {
			const mapPath = this.getExpertBundleMapPath();
			let existing = {};
			try {
				const content = await fs_promises.readFile(mapPath, "utf-8");
				const parsed = JSON.parse(content);
				if (parsed && typeof parsed === "object") existing = parsed;
			} catch {}
			let changed = false;
			for (const key of keys) {
				if (existing[key] === bundleName) continue;
				existing[key] = bundleName;
				changed = true;
			}
			if (!changed) return;
			await fs_promises.mkdir(path.dirname(mapPath), { recursive: true });
			await fs_promises.writeFile(mapPath, JSON.stringify(existing, null, 2), "utf-8");
		} catch {}
	}
	/**
	* Canonical folder to write: plugin name first, then expert_id.
	*/
	async resolvePreferredBundleName(expertId, pluginName) {
		const bundleName = require_tar$1.firstUsableExpertBundleName(pluginName, this.expertBundleMap.get(expertId), await this.lookupBundleNameFromManifestCache(expertId), await this.lookupBundleNameFromPersistedMap(expertId), expertId) ?? expertId;
		this.expertBundleMap.set(expertId, bundleName);
		await this.persistExpertBundleMapping(expertId, bundleName);
		return bundleName;
	}
	/**
	* Folder to read: plugin-name dir if present, else leftover expert_id dir.
	*/
	async resolveBundleName(expertId, pluginName, marketplace) {
		const safePluginName = require_tar$1.normalizeSafeExpertBundleName(pluginName);
		const preferred = require_tar$1.firstUsableExpertBundleName(safePluginName, this.expertBundleMap.get(expertId), await this.lookupBundleNameFromManifestCache(expertId), await this.lookupBundleNameFromPersistedMap(expertId));
		const bundleName = await this.findInstalledBundleName(preferred === expertId ? [preferred] : [preferred, expertId], marketplace) ?? preferred ?? expertId;
		const remember = preferred ?? bundleName;
		this.expertBundleMap.set(expertId, remember);
		await this.persistExpertBundleMapping(expertId, remember);
		return bundleName;
	}
	async findInstalledBundleName(names, marketplace) {
		for (const name of names) {
			if (!name) continue;
			if (await resolveLocalExpertPluginDir(this.getConfigDir(), name, marketplace, (dir) => this.hasPluginManifestAsync(dir))) return name;
		}
	}
	/**
	* 解析当前专家真正应写入 settings.agent 的 agent 名。
	*
	* 优先级：
	* 1. plugin.json 显式声明的 agentName
	* 2. team 型专家的 teamInfo.leadAgent
	* 3. agents/ 中与 expertId slug 对应文件的 frontmatter name
	* 4. agents/ 中唯一 agent 文件的 frontmatter name
	* 5. expertId 的 kebab-case fallback
	*/
	async resolveExpertAgentName(pluginDir, manifest, expertId) {
		if (manifest.agentName) return manifest.agentName;
		if (manifest.expertType === "team" && manifest.teamInfo?.leadAgent) return manifest.teamInfo.leadAgent;
		const expertSlug = this.toKebabCase(expertId);
		return await this.resolveAgentNameFromPluginFiles(pluginDir, manifest, expertSlug) || expertSlug;
	}
	async resolveAgentNameFromPluginFiles(pluginDir, manifest, expertSlug) {
		const candidatePaths = await this.resolveAgentMarkdownFiles(pluginDir, manifest.agents);
		const matchedPath = candidatePaths.find((filePath) => path.basename(filePath, ".md") === expertSlug);
		if (matchedPath) return this.readAgentNameFromMarkdown(matchedPath);
		if (candidatePaths.length === 1) return this.readAgentNameFromMarkdown(candidatePaths[0]);
	}
	async resolveAgentMarkdownFiles(pluginDir, agents) {
		const configuredAgentPaths = this.normalizeManifestAgentPaths(agents);
		if (configuredAgentPaths.length === 0) return this.listMarkdownFiles(path.join(pluginDir, "agents"));
		return (await Promise.all(configuredAgentPaths.map(async (relativePath) => {
			const absolutePath = path.join(pluginDir, relativePath);
			try {
				const stat = await fs_promises.stat(absolutePath);
				if (stat.isDirectory()) return this.listMarkdownFiles(absolutePath);
				if (stat.isFile() && absolutePath.endsWith(".md")) return [absolutePath];
			} catch {
				return [];
			}
			return [];
		}))).flat();
	}
	normalizeManifestAgentPaths(agents) {
		if (!agents) return [];
		return (Array.isArray(agents) ? agents : [agents]).map((agentPath) => agentPath.trim()).filter((agentPath) => agentPath !== "").map((agentPath) => agentPath.replace(/^\.\//, ""));
	}
	async listMarkdownFiles(dir) {
		try {
			const entries = await fs_promises.readdir(dir, { withFileTypes: true });
			return (await Promise.all(entries.map(async (entry) => {
				const absolutePath = path.join(dir, entry.name);
				if (entry.isDirectory()) return this.listMarkdownFiles(absolutePath);
				if (entry.isFile() && entry.name.endsWith(".md")) return [absolutePath];
				return [];
			}))).flat();
		} catch {
			return [];
		}
	}
	async readAgentNameFromMarkdown(filePath) {
		try {
			const frontmatter = (await fs_promises.readFile(filePath, "utf-8")).match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
			if (!frontmatter) return path.basename(filePath, ".md");
			const rawName = frontmatter.match(/^name:\s*(.+)$/m)?.[1]?.trim();
			if (!rawName) return path.basename(filePath, ".md");
			return rawName.replace(/^['"]|['"]$/g, "");
		} catch {
			return;
		}
	}
	async readGeneratedAgentOverride(settingsPath) {
		try {
			if (!await require_tar$1.pathExists(settingsPath)) return null;
			const raw = await fs_promises.readFile(settingsPath, "utf-8");
			const parsed = JSON.parse(raw);
			if (Object.keys(parsed).length !== 1 || typeof parsed.agent !== "string" || parsed.agent.trim() === "") return null;
			return { agent: parsed.agent };
		} catch {
			return null;
		}
	}
	async removePersistedGeneratedAgentOverrides() {
		try {
			const pluginsDir = path.join(this.getMarketplaceDir(), "plugins");
			if (!await require_tar$1.pathExists(pluginsDir)) return;
			const entries = await fs_promises.readdir(pluginsDir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory()) continue;
				const settingsPath = path.join(pluginsDir, entry.name, PLUGIN_SETTINGS_FILE);
				const payload = await this.readGeneratedAgentOverride(settingsPath);
				if (!payload) continue;
				await fs_promises.unlink(settingsPath);
				console.log(`[ExpertPluginService] Removed persisted expert agent override on startup: ${settingsPath}`, payload);
			}
		} catch (error) {
			console.warn("[ExpertPluginService] Failed to remove persisted expert agent overrides on startup:", error);
		}
	}
	/** 获取指定专家 marketplace 根目录，供 session-local CLI settings 注册。 */
	getExpertMarketplacePath(marketplace) {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", marketplace);
	}
	/** 获取 experts marketplace 根目录 */
	getMarketplaceDir() {
		return this.getExpertMarketplacePath(EXPERTS_MARKETPLACE);
	}
	/** 获取专家 Plugin 的本地目录路径，以 bundleName（plugin 字段值）为目录名 */
	getPluginDir(bundleName) {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", EXPERTS_MARKETPLACE, "plugins", bundleName);
	}
	/** 获取指定 marketplace 下的 Plugin 目录路径 */
	getPluginDirForMarketplace(bundleName, marketplace) {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", marketplace, "plugins", bundleName);
	}
	/**
	* 根据 pluginName 判断所属 marketplace：
	* 优先检查 my-experts，fallback 到 experts
	*/
	async resolvePluginMarketplace(pluginName) {
		const myExpertsPath = this.getPluginDirForMarketplace(pluginName, require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (await this.hasPluginManifestAsync(myExpertsPath)) return require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
		return EXPERTS_MARKETPLACE;
	}
	isEnterpriseExpertDownloadEnabled() {
		return (this.productManager?.getCurrentConfiguration?.()?.productFeatures)?.EnableEnterpriseExpertDownload === true;
	}
	getEnterpriseGatewayHost() {
		try {
			const endpoint = this.productManager?.getEndpoint?.();
			if (!endpoint) return;
			return new URL(endpoint).hostname.toLowerCase();
		} catch {
			return;
		}
	}
	isTrustedDownloadUrl(url) {
		try {
			const parsed = new URL(url);
			const host = parsed.hostname.toLowerCase();
			const cosHost = new URL(require_handler_registry.EXPERT_CENTER_COS_CONFIG.baseUrl).hostname.toLowerCase();
			if (this.isEnterpriseExpertDownloadEnabled()) {
				const gatewayHost = this.getEnterpriseGatewayHost();
				if (gatewayHost && host === gatewayHost) return true;
			}
			return parsed.protocol === "https:" && (require_tar$1.isTrustedCosDownloadUrl(url, cosHost) || this.isEnterpriseExpertDownloadEnabled() && (host === "copilot.qq.com" || host.endsWith(".copilot.qq.com")));
		} catch {
			return false;
		}
	}
	isEnterpriseGatewayBundleUrl(url) {
		if (isEnterpriseGatewayDownloadUrl(url)) return true;
		try {
			const { hostname, pathname } = new URL(url);
			const gatewayHost = this.getEnterpriseGatewayHost();
			return !!gatewayHost && hostname.toLowerCase() === gatewayHost && pathname.includes("/v2/download/");
		} catch {
			return false;
		}
	}
	async resolveDependencyPluginDir(bundleName, marketplace, downloadUrl) {
		if (marketplace && marketplace !== EXPERTS_MARKETPLACE) return this.getPluginDirForMarketplace(bundleName, marketplace);
		if (!marketplace) {
			const myExpertsDir = this.getPluginDirForMarketplace(bundleName, require_handler_registry.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
			if (await this.hasPluginManifestAsync(myExpertsDir)) return myExpertsDir;
		}
		return this.ensureDownloaded(bundleName, void 0, downloadUrl);
	}
	/**
	* PascalCase/camelCase → kebab-case
	* 例: LivestreamEcommerceCoach → livestream-ecommerce-coach
	*      TradingAgentTeam → trading-agent-team
	*/
	toKebabCase(str) {
		return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
	}
	/** 检查目录下是否存在 plugin.json（支持多种元数据目录名） */
	async hasPluginManifestAsync(dir) {
		if (!await require_tar$1.pathExists(dir)) return false;
		for (const metaDir of PLUGIN_METADATA_DIRS) {
			const manifestPath = path.join(dir, metaDir, PLUGIN_MANIFEST_FILE);
			if (await require_tar$1.pathExists(manifestPath)) return true;
		}
		return false;
	}
	/** 读取 plugin.json（异步版本，用于不阻塞主线程的场景） */
	async readPluginManifestAsync(dir) {
		for (const metaDir of PLUGIN_METADATA_DIRS) {
			const manifestPath = path.join(dir, metaDir, PLUGIN_MANIFEST_FILE);
			try {
				const content = await fs_promises.readFile(manifestPath, "utf-8");
				return JSON.parse(content);
			} catch (error) {
				if (error.code === "ENOENT") continue;
				throw new Error(`Failed to read expert manifest: ${manifestPath}`, { cause: error });
			}
		}
		return null;
	}
	async scanCustomExperts(userId) {
		return this.customRuntime.scanCustomExperts(userId);
	}
	async getCustomExpert(expertId) {
		return this.customRuntime.getCustomExpert(expertId);
	}
	async deleteCustomExpert(expertId, userId) {
		return this.customRuntime.deleteCustomExpert(expertId, userId);
	}
	async addUserExperts(userId, expertIds) {
		return this.customRuntime.addUserExperts(userId, expertIds);
	}
	getCustomExpertWatchPath() {
		return this.customRuntime.getCustomExpertWatchPath();
	}
	getCustomExpertPluginJsonPath(expertId) {
		return this.customRuntime.getCustomExpertPluginJsonPath(expertId);
	}
	async clearCustomExpertSessionMarker(expertId) {
		return this.customRuntime.clearCustomExpertSessionMarker(expertId);
	}
};
ExpertPluginService = require_code_cache.__decorate([(0, import_common$1.Component)(require_handler_registry.ExpertPluginServiceToken), require_code_cache.__decorateMetadata("design:paramtypes", [])], ExpertPluginService);
//#endregion
//#region ../../packages/workbuddy-server/src/runtime/custom-models-product-provider.ts
require_credential_protection.init_credential_protection();
require_code_cache.init_common$3();
require_code_cache.init_common$4();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var _WorkbuddyCustomModelsProductProvider;
var baseProductConfigurationProvider;
function setWorkbuddyCustomModelsBaseProductConfigurationProvider(provider) {
	baseProductConfigurationProvider = provider;
}
var WorkbuddyCustomModelsProductProvider = class WorkbuddyCustomModelsProductProvider {
	static {
		_WorkbuddyCustomModelsProductProvider = this;
	}
	constructor() {
		this.priority = require_code_cache.ProductProviderPriority.ENV - 1e3;
		this.listenerRegistered = false;
	}
	static {
		this.FILE_WATCH_DEBOUNCE_MS = 1e3;
	}
	async provide(ctx) {
		if (!this.fs) return {};
		if (!ctx.current.productFeatures?.[require_code_cache.ProductFeature.CustomModelsJSON]) {
			this.logger.info("disable use custom model");
			return {};
		}
		this.ensurePolicyListener();
		if (this.policyService) {
			const policy = this.policyService.getCachedSnapshot();
			if (!policy) {
				this.policyService.scheduleRefresh();
				this.lastAllowed = true;
			} else {
				this.lastAllowed = policy.allowed;
				if (!policy.allowed) {
					this.logger.info(`[CustomModelsProvider] policy disallow: reason=${policy.reason} mode=${policy.policy_mode} source=${policy.source}; skipping local custom models`);
					return {};
				}
			}
		}
		const userConfigPath = this.getUserConfigPath();
		this.ensureFileWatcher(userConfigPath);
		try {
			if (!this.fs.existsSync(userConfigPath)) return {};
			const content = this.fs.readFileSync(userConfigPath, { encoding: "utf-8" });
			require_credential_protection.reconcileUserModelsJsonToPolicy(userConfigPath, { warn: (msg) => this.logger.warn(msg) }).catch(() => {});
			const codec = require_credential_protection.createModelsJsonCredentialCodec((msg) => this.logger.warn(msg));
			let parsed;
			try {
				parsed = codec.decode(JSON.parse(content.toString())).value;
			} finally {
				codec.dispose();
			}
			const { models: rawModels, availableModels: rawAvailableModels } = this.extractUserConfig(parsed);
			const validRawModels = rawModels.filter(isValidLocalCustomModel);
			const droppedCount = rawModels.length - validRawModels.length;
			if (droppedCount > 0) this.logger.warn(`[CustomModelsProvider] dropped ${droppedCount} invalid custom model entr${droppedCount === 1 ? "y" : "ies"} from ${userConfigPath}`);
			const models = validRawModels.map((model) => this.normalizeCustomModel(model));
			if (ctx.current.productFeatures?.[require_code_cache.ProductFeature.CustomModelIdPrefix]) {
				for (const model of models) if (typeof model.id === "string" && !model.id.startsWith("custom-local:")) model.id = `${require_code_cache.CUSTOM_LOCAL_MODEL_PREFIX}${model.id}`;
			}
			this.logger.info(`Loaded custom models config from user: ${userConfigPath} (entries=${models.length})`);
			if (Array.isArray(rawAvailableModels)) {
				const shouldPrefixId = !!ctx.current.productFeatures?.[require_code_cache.ProductFeature.CustomModelIdPrefix];
				let mergedAvailableModels = rawAvailableModels;
				if (shouldPrefixId) {
					const prefixedIds = rawAvailableModels.filter((id) => !id.startsWith(require_code_cache.CUSTOM_LOCAL_MODEL_PREFIX)).map((id) => `${require_code_cache.CUSTOM_LOCAL_MODEL_PREFIX}${id}`);
					mergedAvailableModels = Array.from(/* @__PURE__ */ new Set([...rawAvailableModels, ...prefixedIds]));
				}
				return {
					models,
					availableModels: mergedAvailableModels,
					mergeStrategy: require_code_cache.MergeStrategy.SmartMerge
				};
			}
			const currentAvailable = ctx.current.availableModels;
			if (Array.isArray(currentAvailable) && currentAvailable.length > 0) {
				const customIds = this.collectCustomModelIds(models);
				return {
					models,
					availableModels: Array.from(/* @__PURE__ */ new Set([...currentAvailable, ...customIds])),
					mergeStrategy: require_code_cache.MergeStrategy.SmartMerge
				};
			}
			return {
				models,
				mergeStrategy: require_code_cache.MergeStrategy.SmartMerge
			};
		} catch (error) {
			this.logger.error(`Failed to load user-level custom models configuration from ${userConfigPath}`, error);
			return {};
		}
	}
	extractUserConfig(parsed) {
		if (Array.isArray(parsed)) return {
			models: parsed,
			availableModels: void 0
		};
		if (parsed !== null && typeof parsed === "object") {
			const obj = parsed;
			return {
				models: Array.isArray(obj.models) ? obj.models : [],
				availableModels: Array.isArray(obj.availableModels) ? obj.availableModels.filter((item) => typeof item === "string") : void 0
			};
		}
		return {
			models: [],
			availableModels: void 0
		};
	}
	collectCustomModelIds(models) {
		const ids = [];
		for (const model of models) {
			const rawId = model.id;
			if (typeof rawId !== "string") continue;
			const trimmed = rawId.trim();
			if (trimmed.length > 0) ids.push(trimmed);
		}
		return ids;
	}
	getUserConfigPath() {
		const configuredDir = process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim();
		if (configuredDir) return node_path.join(configuredDir, "models.json");
		const dataFolderName = baseProductConfigurationProvider?.()?.dataFolderName;
		if (typeof dataFolderName === "string" && dataFolderName.trim()) return node_path.join((0, node_os.homedir)(), dataFolderName.trim(), "models.json");
		return node_path.join(require_code_cache.getWorkbuddyRuntimeConfigDir(), "models.json");
	}
	normalizeCustomModel(model) {
		const normalizedModel = {
			disabled: false,
			...model
		};
		const tags = Array.isArray(normalizedModel.tags) ? [...normalizedModel.tags] : [];
		if (!tags.includes("custom")) tags.push(require_code_cache.MODEL_TAG_CUSTOM);
		normalizedModel.tags = tags;
		if (normalizedModel.apiKey) normalizedModel.apiKey = require_code_cache.EnvUtils.resolveEnvVariables(normalizedModel.apiKey);
		if (normalizedModel.url) normalizedModel.url = require_code_cache.EnvUtils.resolveEnvVariables(normalizedModel.url);
		for (const field of [
			"maxInputTokens",
			"maxOutputTokens",
			"temperature"
		]) {
			if (normalizedModel[field] === void 0) continue;
			const coerced = coerceOptionalNumber(normalizedModel[field]);
			if (coerced === void 0) delete normalizedModel[field];
			else normalizedModel[field] = coerced;
		}
		return normalizedModel;
	}
	ensureFileWatcher(filePath) {
		if (this.fileWatcher && this.fileWatcherPath === filePath) return;
		if (this.fileWatcher) {
			this.fileWatcher.close();
			this.fileWatcher = void 0;
		}
		try {
			const dir = node_path.dirname(filePath);
			const basename = node_path.basename(filePath);
			this.fileWatcher = (0, node_fs.watch)(dir, (_, filename) => {
				if (filename === basename) this.debounceSyncForFileChange();
			});
			this.fileWatcher.on("error", () => {
				this.fileWatcher?.close();
				this.fileWatcher = void 0;
			});
			this.fileWatcherPath = filePath;
			this.logger.info(`[CustomModelsProvider] watching ${filePath} for changes`);
		} catch {}
	}
	debounceSyncForFileChange() {
		if (this.debounceSyncTimer) clearTimeout(this.debounceSyncTimer);
		this.debounceSyncTimer = setTimeout(() => {
			const productManager = this.productManager ?? (() => {
				try {
					return import_common$1.ContainerUtil.get(require_code_cache.ProductManager);
				} catch {
					return;
				}
			})();
			if (!productManager) return;
			this.logger.info("[CustomModelsProvider] models.json changed, triggering sync");
			productManager.sync(true).catch((error) => {
				this.logger.warn(`[CustomModelsProvider] sync after file change failed: ${String(error)}`);
			});
		}, _WorkbuddyCustomModelsProductProvider.FILE_WATCH_DEBOUNCE_MS);
	}
	ensurePolicyListener() {
		if (this.listenerRegistered || !this.policyService) return;
		this.listenerRegistered = true;
		this.policyService.onChanged((snapshot) => {
			if (this.lastAllowed === void 0 || this.lastAllowed === snapshot.allowed) return;
			this.lastAllowed = snapshot.allowed;
			(this.productManager ?? (() => {
				try {
					return import_common$1.ContainerUtil.get(require_code_cache.ProductManager);
				} catch {
					return;
				}
			})())?.sync(true).catch((error) => {
				this.logger.warn(`[CustomModelsProvider] productManager.sync failed: ${String(error)}`);
			});
		});
	}
};
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_code_cache.FileSystem),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.FileSystem === "undefined" ? Object : require_code_cache.FileSystem)
], WorkbuddyCustomModelsProductProvider.prototype, "fs", void 0);
require_code_cache.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_code_cache.__decorateMetadata("design:type", typeof import_common$1.Logger === "undefined" ? Object : import_common$1.Logger)], WorkbuddyCustomModelsProductProvider.prototype, "logger", void 0);
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_tar$1.MemberCustomModelPolicyServiceToken),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_tar$1.MemberCustomModelPolicyService === "undefined" ? Object : require_tar$1.MemberCustomModelPolicyService)
], WorkbuddyCustomModelsProductProvider.prototype, "policyService", void 0);
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_code_cache.ProductManager),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.ProductManager === "undefined" ? Object : require_code_cache.ProductManager)
], WorkbuddyCustomModelsProductProvider.prototype, "productManager", void 0);
WorkbuddyCustomModelsProductProvider = _WorkbuddyCustomModelsProductProvider = require_code_cache.__decorate([(0, import_common$1.Component)(require_code_cache.ProductProvider)], WorkbuddyCustomModelsProductProvider);
//#endregion
//#region src/main/system/runtime/workspace.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_dev_env_override();
require_code_cache.init_workbuddy_product_config();
require_code_cache.init_common$4();
require_code_cache.init_decorate();
var WorkbuddyDesktopWorkspace = class WorkbuddyDesktopWorkspace {
	folders = [{
		uri: require_code_cache.URI.file(path.join(os.homedir(), "workbuddyMainThread")),
		name: "WorkbuddyDesktop",
		index: 0
	}];
	get workspaceFolders() {
		return this.folders;
	}
};
WorkbuddyDesktopWorkspace = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.Workspace,
	rebind: true
})], WorkbuddyDesktopWorkspace);
//#endregion
//#region src/main/system/runtime/workbuddy-enterprise-models-product-provider.ts
require_code_cache.init_common();
require_code_cache.init_common$5();
require_code_cache.init_common$3();
require_code_cache.init_common$4();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var _WorkbuddyEnterpriseModelsProductProvider;
var DEFAULT_MODELS_PATH = "/console/enterprises/{enterpriseId}/config/models";
var ADMIN_MODEL_TYPE_CHAT = "chat";
/** 企业模型 last-good 持久化 key（localStorage entry），按 uid+enterpriseId+endpoint 分片存数组 */
var ENTERPRISE_MODELS_LAST_GOOD_KEY = "workbuddy_enterprise_models_last_good";
/** last-good 分片 LRU 上限，与 CloudProductManager disk cache 对齐 */
var ENTERPRISE_MODELS_LAST_GOOD_MAX = 20;
var WorkbuddyEnterpriseModelsProductProvider = class WorkbuddyEnterpriseModelsProductProvider {
	static {
		_WorkbuddyEnterpriseModelsProductProvider = this;
	}
	priority = require_code_cache.ProductProviderPriority.MODELS;
	restOperations;
	authenticationManager;
	logger;
	/**
	* 跨进程 last-good 存储（issue #59223 Batch 2）。@Optional 注入：headless / 单测
	* 不注入时退回纯进程内行为（warm/persist 均 no-op），不影响主链路。
	*/
	localStorage;
	init() {
		this.authenticationManager?.currentSessionSubject.subscribe((session) => {
			const enterpriseId = session?.account?.enterpriseId;
			if (enterpriseId && !this.hasTriggeredSyncForEnterprise) {
				this.hasTriggeredSyncForEnterprise = true;
				this.logger.info(`[WorkbuddyEnterpriseModels] enterpriseId became available: ${enterpriseId}, triggering sync`);
				setImmediate(() => {
					import_common$1.ContainerUtil.get(require_code_cache.ProductManager)?.sync(true);
				});
			}
		});
	}
	hasTriggeredSyncForEnterprise = false;
	/**
	* 已尝试从磁盘 warm 的 last-good key。
	* - 同一 key 只读一次盘，避免每次 provide 命中 IO。
	* - key 变化（切租户 / 切 endpoint）时清空内存 cachedResult，防止旧租户结果串用。
	*/
	lastWarmedKey;
	/**
	* 上一次成功获取的配置。API 失败/空响应时复用此结果作为兜底，
	* 避免 merge 后配置抖动让 ProductManager 反复判定变更，
	* 也避免企业模型从客户端模型列表里短暂"消失"（issue #52373）。
	*/
	cachedResult;
	/**
	* 失败/空响应后的退避截止时间。在此时间之前直接复用上一份结果，
	* 不再重打接口。force 同步（如 enterpriseId 就绪后的显式重试）可绕过退避。
	*/
	retryBackoffUntil = 0;
	/** 连续失败次数，用于指数退避 */
	consecutiveFailures = 0;
	/** 失败退避最小间隔 30s */
	static MIN_FAILURE_BACKOFF_MS = 3e4;
	/** 失败退避最大间隔 5min */
	static MAX_FAILURE_BACKOFF_MS = 3e5;
	async provide(ctx) {
		if (!this.restOperations || !this.authenticationManager) return {};
		const session = this.authenticationManager.currentSessionSubject.value;
		const enterpriseId = session?.account?.enterpriseId;
		this.logger.info(`[WorkbuddyEnterpriseModels] enterpriseId: ${enterpriseId || "undefined"}, endpoint: ${ctx.current?.endpoint}`);
		if (!enterpriseId) return {};
		const endpoint = require_code_cache.resolveEndpointOverride() ?? ctx.current?.endpoint;
		if (!endpoint) {
			this.logger.warn("[WorkbuddyEnterpriseModels] endpoint is missing, skipping API call");
			return {};
		}
		const lastGoodKey = this.buildLastGoodKey(session?.account?.uid, enterpriseId, endpoint);
		await this.warmLastGoodFromDisk(lastGoodKey);
		if (!ctx.force && Date.now() < this.retryBackoffUntil) {
			this.logger.debug("[WorkbuddyEnterpriseModels] in failure backoff window, reusing last result");
			return this.getFallbackResult();
		}
		const modelsUrl = DEFAULT_MODELS_PATH.replace("{enterpriseId}", enterpriseId);
		try {
			const url = new URL(modelsUrl, endpoint);
			const res = await this.restOperations.get(url.href, {
				baseURL: endpoint,
				timeout: 5e3
			});
			if (res?.data?.data?.length) {
				const models = res.data.data.map((model) => ({
					...model,
					modelType: model.id?.startsWith("custom:") ? "enterprise" : "built-in"
				}));
				this.logger.info(`[WorkbuddyEnterpriseModels] Got ${models.length} models from API`);
				const result = this.processModelAgentRelations(ctx.current, models);
				this.cachedResult = result;
				this.consecutiveFailures = 0;
				this.retryBackoffUntil = 0;
				this.persistLastGood(lastGoodKey, result);
				return result;
			}
			this.logger.info("[WorkbuddyEnterpriseModels] API returned empty list, clearing enterprise models");
			this.cachedResult = void 0;
			this.consecutiveFailures = 0;
			this.retryBackoffUntil = 0;
			this.removeLastGood(lastGoodKey);
			return {};
		} catch (error) {
			this.logger.error(`[WorkbuddyEnterpriseModels] API call failed: ${error}`);
			this.applyFailureBackoff();
			return this.getFallbackResult();
		}
	}
	/**
	* 兜底结果：优先复用上一份成功获取的配置，避免空响应/异常导致 merge 后
	* 配置抖动、企业模型短暂消失。没有缓存时（首次启动等）返回空对象，
	* 维持 4.22.16 上原有的 `return {}` 语义。
	*/
	getFallbackResult() {
		return this.cachedResult ?? {};
	}
	/**
	* 构建企业模型 last-good 的稳定 hash key：uid + enterpriseId + endpoint。
	* - 含 enterpriseId → 天然防串租户；含 endpoint → 防串环境。
	* - md5 后存储，不在明文 key 中暴露身份/域名，且不含 token。
	* - uid 缺失（未登录早期）返回 undefined → warm/persist 均 no-op，退回纯进程内行为。
	*/
	buildLastGoodKey(uid, enterpriseId, endpoint) {
		if (!uid) return;
		return require_code_cache.HashUtils.md5([
			uid,
			enterpriseId,
			endpoint
		].join("|"));
	}
	/**
	* 进程内 cachedResult 为空时，从磁盘按 key 读回一次企业模型 last-good 暖到内存。
	* - lastWarmedKey 去重：同一 key 只读一次盘，避免每次 provide 命中 IO。
	* - 切 key（切租户 / 切 endpoint）时先清空内存 cachedResult，防止旧租户结果串用，
	*   再尝试读新 key 的 last-good。
	* - 读失败仅 warn，不阻断主链路。
	*/
	async warmLastGoodFromDisk(key) {
		if (!key || !this.localStorage) return;
		if (this.lastWarmedKey === key) return;
		this.lastWarmedKey = key;
		this.cachedResult = void 0;
		try {
			const item = (await this.localStorage.get(ENTERPRISE_MODELS_LAST_GOOD_KEY, []) ?? []).find((i) => i.key === key);
			if (item?.data) {
				this.cachedResult = item.data;
				this.logger.info(`[WorkbuddyEnterpriseModels] warmed last-good from disk (models=${item.data.models?.length ?? 0})`);
			}
		} catch (error) {
			this.logger.warn(`[WorkbuddyEnterpriseModels] read last-good from disk failed: ${String(error)}`);
		}
	}
	/**
	* API 权威成功后把企业模型配置写盘做 last-good。
	* - 内容 hash 去重：与同 key 已存内容一致则跳过写，避免重复 IO。
	* - LRU 截断到 {@link ENTERPRISE_MODELS_LAST_GOOD_MAX}。
	* - 异步写、写失败仅 warn，不阻断主链路。
	* - 企业模型配置不含 token，写盘安全（不持久化任何身份凭证）。
	*/
	persistLastGood(key, data) {
		if (!key || !this.localStorage) return;
		this.writeLastGoodToDisk(this.localStorage, key, data).catch((error) => {
			this.logger.warn(`[WorkbuddyEnterpriseModels] persist last-good failed: ${String(error)}`);
		});
	}
	/**
	* 接口权威返回空列表后，移除该 key 的落盘 last-good。
	* - 与 {@link persistLastGood} 对称：一个写、一个删，都是 fire-and-forget，失败仅 warn。
	* - 条目不存在时跳过写盘，避免无意义 IO。
	* - 只删当前 key，其它租户 / 环境的 last-good 不受影响。
	*/
	removeLastGood(key) {
		if (!key || !this.localStorage) return;
		this.removeLastGoodFromDisk(this.localStorage, key).catch((error) => {
			this.logger.warn(`[WorkbuddyEnterpriseModels] remove last-good failed: ${String(error)}`);
		});
	}
	async removeLastGoodFromDisk(storage, key) {
		const arr = await storage.get(ENTERPRISE_MODELS_LAST_GOOD_KEY, []) ?? [];
		const idx = arr.findIndex((i) => i.key === key);
		if (idx === -1) return;
		arr.splice(idx, 1);
		await storage.set(ENTERPRISE_MODELS_LAST_GOOD_KEY, arr);
	}
	async writeLastGoodToDisk(storage, key, data) {
		const hash = require_code_cache.HashUtils.md5(JSON.stringify(data));
		const arr = await storage.get(ENTERPRISE_MODELS_LAST_GOOD_KEY, []) ?? [];
		const idx = arr.findIndex((i) => i.key === key);
		if (idx !== -1 && arr[idx].hash === hash) return;
		if (idx !== -1) arr.splice(idx, 1);
		arr.push({
			key,
			hash,
			data,
			ts: Date.now()
		});
		while (arr.length > ENTERPRISE_MODELS_LAST_GOOD_MAX) arr.shift();
		await storage.set(ENTERPRISE_MODELS_LAST_GOOD_KEY, arr);
	}
	/**
	* 记录一次失败/空响应并设置指数退避截止时间（30s ~ 5min）。
	*/
	applyFailureBackoff() {
		this.consecutiveFailures += 1;
		const backoff = Math.min(_WorkbuddyEnterpriseModelsProductProvider.MIN_FAILURE_BACKOFF_MS * 2 ** (this.consecutiveFailures - 1), _WorkbuddyEnterpriseModelsProductProvider.MAX_FAILURE_BACKOFF_MS);
		this.retryBackoffUntil = Date.now() + backoff;
		this.logger.warn(`[WorkbuddyEnterpriseModels] backing off model API for ${backoff}ms after ${this.consecutiveFailures} consecutive failure(s)`);
	}
	processModelAgentRelations(config, models) {
		const agents = config.agents ? config.agents.map((a) => ({
			...a,
			models: []
		})) : [];
		const taggedModels = models.map((model) => ({
			...model,
			modelType: model.id?.startsWith("custom:") ? "enterprise" : "built-in"
		}));
		for (const model of taggedModels) if ((model.tags ?? []).includes(ADMIN_MODEL_TYPE_CHAT)) {
			for (const agent of agents) if (!agent.models.includes(model.id)) agent.models.unshift(model.id);
		}
		return {
			mergeStrategy: require_code_cache.MergeStrategy.DeepSmartMerge,
			models: taggedModels,
			agents
		};
	}
};
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(import_common.RestOperations),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof import_common.RestOperations === "undefined" ? Object : import_common.RestOperations)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "restOperations", void 0);
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_code_cache.AuthenticationManager),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.AuthenticationManager === "undefined" ? Object : require_code_cache.AuthenticationManager)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "authenticationManager", void 0);
require_code_cache.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_code_cache.__decorateMetadata("design:type", typeof import_common$1.Logger === "undefined" ? Object : import_common$1.Logger)], WorkbuddyEnterpriseModelsProductProvider.prototype, "logger", void 0);
require_code_cache.__decorate([
	(0, import_common$1.Autowired)(require_code_cache.LocalStorage),
	(0, import_common$1.Optional)(),
	require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.LocalStorage === "undefined" ? Object : require_code_cache.LocalStorage)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "localStorage", void 0);
require_code_cache.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_code_cache.__decorateMetadata("design:type", Function),
	require_code_cache.__decorateMetadata("design:paramtypes", []),
	require_code_cache.__decorateMetadata("design:returntype", void 0)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "init", null);
WorkbuddyEnterpriseModelsProductProvider = _WorkbuddyEnterpriseModelsProductProvider = require_code_cache.__decorate([(0, import_common$1.Component)(require_code_cache.ProductProvider)], WorkbuddyEnterpriseModelsProductProvider);
//#endregion
//#region src/main/system/runtime/workbuddy-file-local-storage.ts
require_code_cache.init_common$5();
require_code_cache.init_common$4();
require_code_cache.init_workbuddy_paths();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var LOCAL_STORAGE_FOLDER = "local_storage";
var ENTRY_PREFIX = "wb_entry_";
var ENTRY_EXT = ".info";
var logger = require_code_cache.createWorkbuddyScopedLogger("WorkbuddyFileLocalStorage");
var WorkbuddyFileLocalStorage = class WorkbuddyFileLocalStorage {
	emitter = new import_common$1.Emitter();
	changeEvent = this.emitter.event;
	init() {
		logger.info(`initialized, storageRoot=${this.resolveStorageRoot()}`);
	}
	async set(key, value) {
		const entryPath = this.resolveEntryPath(key);
		const entryDir = path.default.dirname(entryPath);
		try {
			if (!fs.existsSync(entryDir)) fs.mkdirSync(entryDir, { recursive: true });
			fs.writeFileSync(entryPath, JSON.stringify(value));
			logger.info(`set succeeded, keyHash=${this.resolveKeyHash(key)}`);
			this.emitter.fire({ domain: key });
		} catch (error) {
			logger.error(`set failed, keyHash=${this.resolveKeyHash(key)}, error=${this.formatError(error)}`);
			throw error;
		}
	}
	getSync(key, defaultValue) {
		const entryPath = this.resolveEntryPath(key);
		const keyHash = this.resolveKeyHash(key);
		try {
			if (!fs.existsSync(entryPath)) {
				logger.info(`get missed, keyHash=${keyHash}`);
				return defaultValue;
			}
			const content = fs.readFileSync(entryPath, { encoding: "utf-8" });
			try {
				logger.info(`get hit, keyHash=${keyHash}`);
				return JSON.parse(content.toString());
			} catch (error) {
				logger.warn(`get failed to parse cache, keyHash=${keyHash}, error=${this.formatError(error)}`);
				return defaultValue;
			}
		} catch (error) {
			logger.warn(`get failed, keyHash=${keyHash}, error=${this.formatError(error)}`);
			return defaultValue;
		}
	}
	async get(key, defaultValue) {
		return this.getSync(key, defaultValue);
	}
	async remove(key) {
		const entryPath = this.resolveEntryPath(key);
		const keyHash = this.resolveKeyHash(key);
		try {
			if (fs.existsSync(entryPath)) fs.rmSync(entryPath);
			logger.info(`remove succeeded, keyHash=${keyHash}`);
			this.emitter.fire({ domain: key });
		} catch (error) {
			logger.error(`remove failed, keyHash=${keyHash}, error=${this.formatError(error)}`);
			throw error;
		}
	}
	resolveEntryPath(key) {
		return path.default.join(this.resolveStorageRoot(), `${ENTRY_PREFIX}${this.resolveKeyHash(key)}${ENTRY_EXT}`);
	}
	resolveStorageRoot() {
		return path.default.join(this.resolveHomeDir(), LOCAL_STORAGE_FOLDER);
	}
	resolveHomeDir() {
		return require_code_cache.getWorkbuddyConfigDir();
	}
	resolveKeyHash(key) {
		return require_code_cache.HashUtils.md5(key);
	}
	formatError(error) {
		return error instanceof Error ? error.message : String(error);
	}
};
require_code_cache.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_code_cache.__decorateMetadata("design:type", Function),
	require_code_cache.__decorateMetadata("design:paramtypes", []),
	require_code_cache.__decorateMetadata("design:returntype", void 0)
], WorkbuddyFileLocalStorage.prototype, "init", null);
WorkbuddyFileLocalStorage = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.LocalStorage,
	rebind: true
})], WorkbuddyFileLocalStorage);
//#endregion
//#region src/main/system/runtime/workbuddy-product-env-service.ts
require_code_cache.init_common();
require_code_cache.init_common$3();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
var WorkbuddyProductEnvService = class WorkbuddyProductEnvService {
	logger;
	productManager;
	lastSwitchedEnv;
	init() {
		this.logger.setContext("WorkbuddyProductEnvService");
		const currentEnv = process.env[require_code_cache.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
		if (currentEnv) {
			this.lastSwitchedEnv = currentEnv;
			return;
		}
		const resolvedEnv = require_code_cache.resolveWorkbuddyProductEnvironmentFromSessionFile();
		if (resolvedEnv) {
			process.env[require_code_cache.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT] = resolvedEnv;
			this.lastSwitchedEnv = resolvedEnv;
		}
	}
	async switch(env) {
		if (env) {
			if (env === this.lastSwitchedEnv && process.env["CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT"] === env) return;
			this.lastSwitchedEnv = env;
			process.env[require_code_cache.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT] = env;
			return;
		}
		this.lastSwitchedEnv = void 0;
		delete process.env[require_code_cache.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
	}
	async switchBySession(session) {
		const coordinator = this.getCoordinator();
		const resolvedEnv = session ? coordinator.resolveEnvironment(session, this.productManager.configuration.getValue()) : void 0;
		await this.switch(resolvedEnv);
		coordinator.publishResolvedSnapshot(session, this.productManager.configuration.getValue(), "product-env-switch");
	}
	async getCurrent() {
		const currentEnv = process.env[require_code_cache.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
		if (currentEnv) return currentEnv;
		const session = import_common$1.ContainerUtil.get(require_code_cache.AuthenticationManager).currentSessionSubject.getValue();
		return this.getCoordinator().getResolvedSnapshot(this.productManager.configuration.getValue(), session).networkEnvironment;
	}
	getCoordinator() {
		return import_common$1.ContainerUtil.get(require_log_acl_guard.WorkbuddyAuthProductCoordinator);
	}
};
require_code_cache.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_code_cache.__decorateMetadata("design:type", typeof import_common$1.Logger === "undefined" ? Object : import_common$1.Logger)], WorkbuddyProductEnvService.prototype, "logger", void 0);
require_code_cache.__decorate([(0, import_common$1.Autowired)(require_code_cache.ProductManager), require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.ProductManager === "undefined" ? Object : require_code_cache.ProductManager)], WorkbuddyProductEnvService.prototype, "productManager", void 0);
require_code_cache.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_code_cache.__decorateMetadata("design:type", Function),
	require_code_cache.__decorateMetadata("design:paramtypes", []),
	require_code_cache.__decorateMetadata("design:returntype", void 0)
], WorkbuddyProductEnvService.prototype, "init", null);
WorkbuddyProductEnvService = require_code_cache.__decorate([(0, import_common$1.Component)({
	id: require_code_cache.ProductEnvService,
	rebind: true
})], WorkbuddyProductEnvService);
//#endregion
//#region src/main/system/runtime/index.ts
require_code_cache.init_dev_env_override();
require_code_cache.init_workbuddy_product_config();
if (process.env.NODE_ENV === "development" || require_code_cache.isDevEnvSwitchBuildEnabled()) require_code_cache.forceEnableDevEnvOverride();
require_file_authentication_storage.setWorkbuddyAuthenticationConfigurationProvider(require_code_cache.getWorkbuddyAuthenticationConfiguration);
setWorkbuddyAuthDevEnvProvider({
	isOverrideEnabled: require_code_cache.isDevEnvOverrideEnabled,
	readDevEnv: require_code_cache.readDevEnv
});
require_tar$1.setConnectorDevEnvProvider({ readDevEnv: require_code_cache.readConnectorDevEnv });
setWorkbuddyAuthSessionSyncer((session) => import_common$1.ContainerUtil.get(require_log_acl_guard.WorkbuddyAuthProductCoordinator).syncResolvedProduct(session));
require_module_base.setWorkbuddyClientInfoAssetResolver(require_code_cache.resolveBundledAsset);
require_tar$1.setMcpBundledAssetResolver(require_code_cache.resolveBundledAsset);
require_server_side_access_token.setArdotEmbedUrlProvider({ resolveEmbedUrl: require_code_cache.resolveArdotEndpoint });
setWorkbuddyCustomModelsBaseProductConfigurationProvider(require_code_cache.tryGetWorkbuddyBaseProductConfiguration);
require_module_base.setDevEnvEndpointResolver({ resolve: require_code_cache.resolveEndpointOverride });
//#endregion
//#region src/main/module.app-server.ts
if (typeof require_module_base.WorkbuddyInternetEnviromentProductProvider !== "function") throw new Error("WorkbuddyInternetEnviromentProductProvider registration is unavailable; check @genie/workbuddy-server subpath export shape");
var workbuddyAppServerModule = require_module_base.createWorkbuddyAutoBindModule();
//#endregion
Object.defineProperty(exports, "workbuddyAppServerModule", {
	enumerable: true,
	get: function() {
		return workbuddyAppServerModule;
	}
});
