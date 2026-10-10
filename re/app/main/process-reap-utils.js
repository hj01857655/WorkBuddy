const require_process_cpu_sampler = require("./process-cpu-sampler.js");
let node_child_process = require("node:child_process");
let node_util = require("node:util");
//#region ../../packages/workbuddy-server/src/common/cli-process-env.ts
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
	"WORKBUDDY_FAILOVER_FILE",
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
	if (!result.NODE_EXTRA_CA_CERTS) {
		const configDir = require_process_cpu_sampler.resolveWorkbuddyConfigDir(hostEnv);
		const existing = require_process_cpu_sampler.getExistingSystemCaBundlePath(configDir);
		if (existing) result.NODE_EXTRA_CA_CERTS = existing;
		else if (require_process_cpu_sampler.hasProxyConfigured(result) || require_process_cpu_sampler.hasProxyConfigured(hostEnv)) require_process_cpu_sampler.ensureSystemCaBundleAsync({
			configDir,
			hasProxy: true
		}).catch(() => {});
	}
	return result;
}
//#endregion
//#region ../../packages/workbuddy-server/src/shared/process-reap-utils.ts
/**
* 孤儿进程对账用的跨平台工具：存活探测、命令行读取（身份校验）、进程树终止。
*
* 设计约束（都来自本仓已知的坑）：
* - `process.kill(pid <= 0, sig)` 在 Unix 下会向进程组/当前用户所有进程广播，
*   属高危路径——所有入口对非法/非正 pid 一律防御性拒绝（对齐
*   agent-cli `evictExistingPrewarm` 与 `DaemonProcessManagerImpl` 的守卫）。
* - PID 复用竞态：探活成功 ≠ 还是原进程。杀之前必须用 `readProcessCommandLine`
*   校验命令行里带有我们登记的锚点（sessionId / prewarmId），失配只清账不动手。
*/
var execFileAsync = (0, node_util.promisify)(node_child_process.execFile);
function isValidTargetPid(pid) {
	return typeof pid === "number" && Number.isInteger(pid) && pid > 1 && pid !== process.pid;
}
/** kill(pid, 0) 探活；EPERM 视为存活。非法 pid 视为不存活。 */
function isPidAlive(pid) {
	if (!isValidTargetPid(pid)) return false;
	try {
		process.kill(pid, 0);
		return true;
	} catch (error) {
		return error.code === "EPERM";
	}
}
/**
* 读取进程完整命令行，用于杀前身份校验。异步——调用方跑在活着的事件循环上
* （sidecar 正在服务 control socket / daemon 主进程），Windows 下 PowerShell
* 一次可达数百毫秒，不能用 spawnSync 卡住事件循环。
* 返回 null 表示查询失败（未知，调用方应保守跳过）；返回 ''
* 通常表示进程已退出/不可见。
*
* - POSIX：`ps -p <pid> -o args=`（仓库先例：sandbox-proxy debug、netstat-service）
* - Windows：PowerShell CIM Win32_Process.CommandLine（wmic 在新版已废弃）
*/
async function readProcessCommandLine(pid) {
	if (!isValidTargetPid(pid)) return "";
	try {
		if (process.platform === "win32") {
			const { stdout } = await execFileAsync("powershell.exe", [
				"-NoProfile",
				"-NonInteractive",
				"-Command",
				`(Get-CimInstance Win32_Process -Filter "ProcessId=${pid}").CommandLine`
			], {
				encoding: "utf-8",
				timeout: 1e4,
				windowsHide: true
			});
			return (stdout ?? "").trim();
		}
		const { stdout } = await execFileAsync("ps", [
			"-p",
			String(pid),
			"-o",
			"args="
		], {
			encoding: "utf-8",
			timeout: 1e4
		});
		return (stdout ?? "").trim();
	} catch (error) {
		const code = error.code;
		if (process.platform !== "win32" && typeof code === "number") return "";
		return null;
	}
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function waitForDeath(pid, timeoutMs) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		if (!isPidAlive(pid)) return true;
		await sleep(100);
	}
	return !isPidAlive(pid);
}
/**
* 终止进程（尽力连同其进程组/子树）：SIGTERM → 宽限 → SIGKILL。
* 返回最终是否确认死亡。
*
* - POSIX：优先 `kill(-pid)` 杀进程组（sidecar 子进程经 forkpty/setsid 是组长，
*   与 sidecar killSession 的既有语义一致），失败回退单 pid。
* - Windows：`taskkill /pid <pid> /f /t` 杀进程树。
*/
async function killProcessTree(pid, options) {
	if (!isValidTargetPid(pid)) return true;
	const gracefulMs = options?.gracefulMs ?? 2e3;
	const forceMs = options?.forceMs ?? 2e3;
	if (process.platform === "win32") {
		try {
			await execFileAsync("taskkill", [
				"/pid",
				String(pid),
				"/f",
				"/t"
			], {
				encoding: "utf-8",
				timeout: 1e4,
				windowsHide: true
			});
		} catch {}
		return waitForDeath(pid, forceMs);
	}
	const signalBoth = (signal) => {
		try {
			process.kill(-pid, signal);
		} catch {
			try {
				process.kill(pid, signal);
			} catch {}
		}
	};
	signalBoth("SIGTERM");
	if (await waitForDeath(pid, gracefulMs)) return true;
	signalBoth("SIGKILL");
	return waitForDeath(pid, forceMs);
}
//#endregion
Object.defineProperty(exports, "CLI_STATIC_MANAGED_ENV", {
	enumerable: true,
	get: function() {
		return CLI_STATIC_MANAGED_ENV;
	}
});
Object.defineProperty(exports, "buildCliProcessEnv", {
	enumerable: true,
	get: function() {
		return buildCliProcessEnv;
	}
});
Object.defineProperty(exports, "isPidAlive", {
	enumerable: true,
	get: function() {
		return isPidAlive;
	}
});
Object.defineProperty(exports, "isValidTargetPid", {
	enumerable: true,
	get: function() {
		return isValidTargetPid;
	}
});
Object.defineProperty(exports, "killProcessTree", {
	enumerable: true,
	get: function() {
		return killProcessTree;
	}
});
Object.defineProperty(exports, "readProcessCommandLine", {
	enumerable: true,
	get: function() {
		return readProcessCommandLine;
	}
});
