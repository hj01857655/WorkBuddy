const require_process_reap_utils = require("./process-reap-utils.js");
let node_child_process = require("node:child_process");
let node_fs = require("node:fs");
let node_path = require("node:path");
let node_os = require("node:os");
let node_crypto = require("node:crypto");
let node_net = require("node:net");
//#region ../../packages/workbuddy-server/src/agent/agent-teams-env.ts
var ENABLED = "1";
var DISABLED = "0";
var TEAM_EXPERT_TYPE = "team";
/**
* 计算 `CODEBUDDY_CODE_EXPERIMENTAL_AGENT_TEAMS` 的值。
*
* 设计要点：
* - 专家团覆盖优先于全局开关；这是 PRD 的硬要求（"用户选专家团进行会话时，要开启这些工具"）。
* - 未提供 disableAgentTeams 时按 true 处理（默认禁用）。
* - 函数纯函数实现，便于单测。
*/
function resolveAgentTeamsEnv(input = {}) {
	if (input.expertType === TEAM_EXPERT_TYPE) return ENABLED;
	return input.disableAgentTeams ?? true ? DISABLED : ENABLED;
}
/** 注入子进程 env 时使用的键名，集中常量避免拼写漂移。 */
var AGENT_TEAMS_ENV_KEY = "CODEBUDDY_CODE_EXPERIMENTAL_AGENT_TEAMS";
//#endregion
//#region ../../packages/workbuddy-server/src/agent/runtime-log-redaction.ts
function formatEnvCountForLog(label, env) {
	return `${label}=${Object.keys(env).length}`;
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent/cli-prewarm-pool.ts
/**
* CliPrewarmPool —— 预热 agent-cli 进程池（消费 agent-cli 的 --prewarm 能力）
*
* 目的：让 WorkBuddy 新建会话 / reconfigure 重启会话时，能直接复用一个已经
* 跑完冷启动、挂在本地 IPC 上待命的 cbc 进程，把启动等待从 ~3.7s 降到 ~1ms。
*
* 边界（与 SidecarManager 解耦）：
* - 池只管 prewarm 进程（spawn / activate / kill / 补池），不碰 sidecar 会话表。
* - prewarm 进程一旦 activate 后即变为普通 `--serve` 进程，自持 ACP 端口；
*   池继续按 pid 跟踪它，直到 backend killSession 时由池负责终止。
* - 命中策略：env 与基线一致才用，否则返回 null 让 backend 走原冷启动。
*
* 设计依据：docs/superpowers/specs/2026-06-16-workbuddy-cbc-prewarm-design.md
*/
var TAG = "[CliPrewarmPool]";
function getCredentialBootstrapPrewarmFailure(error) {
	const code = error?.code;
	if (code === "ETIMEDOUT") return {
		errorCategory: "timeout",
		errorCode: code
	};
	if (code === "ENOENT" || code === "ECONNREFUSED") return {
		errorCategory: "connection-refused",
		errorCode: code
	};
	if (code === "ECONNRESET" || code === "EPIPE") return {
		errorCategory: "connection-closed",
		errorCode: code
	};
	if (code === "EACCES" || typeof code === "number" && Number.isSafeInteger(code)) return {
		errorCategory: "transport",
		errorCode: code
	};
	return { errorCategory: "unknown" };
}
/** IPC ping 等短命令的单次写 / 读超时。 */
var IPC_TIMEOUT_MS = 5e3;
/**
* activate 等到 ACP 业务 ready ACK 的总超时，与冷启动 endpoint readiness 窗口一致。
* 该 ACK 包含子进程真实 pid/sessionId 与内核分配的非零端口。
*/
var ACTIVATE_READY_TIMEOUT_MS = 18e4;
/** SIGTERM 后等进程退出，超时则 SIGKILL。 */
var KILL_GRACEFUL_MS = 3e3;
/**
* waitSocketReady 的探活节拍：每 PING_INTERVAL_MS 发一次 ping，最多等
* SOCKET_READY_TIMEOUT_MS_*（按平台分档）。一次 ping 通了就视为 ready。
*
* 为什么这么设：
* - Windows 上 cbc 子进程冷启动实测 ≥10s（asar 解压 + 杀软扫描 + CellJS 容器
*   初始化 + PluginManager.listPlugins 慢路径），实际生产观测过 ~12s。原来
*   3s（30 × 100ms）会在 child 还没 listen 时就放弃 → daemon 主动 SIGTERM/
*   SIGKILL，但杀进程在 require 阶段的延迟使得 child 还能写出 "Prewarm IPC
*   listening" 日志，造成"看起来 ready 但已是僵尸"的诡异现象。
* - macOS / Linux 通常 <2s，但偶发负载抖动也用 10s 兜一下，绝大多数情况
*   首次 ping 就过，不会真的等满。
* - 为什么是"间隔 3s"而不是更密：第一次 ping 必然失败（child 还在 require），
*   过密 ping 没意义、还会和 child 的 CPU 抢资源；3s 一次足够覆盖 listen
*   完成的常见时间点（Windows 的 listen 一旦 require 完成基本秒级出结果），
*   失败后再等 3s 也就比"理想最快 ready 时刻"晚最多 3s，可接受。
*/
var PING_INTERVAL_MS = 3e3;
/** Windows 默认 socket-ready 总超时：覆盖 cbc 冷启动慢路径（asar + 杀软 + 容器初始化）。 */
var SOCKET_READY_TIMEOUT_MS_WIN = 3e4;
/** 非 Windows 默认 socket-ready 总超时：冷启动通常 <2s，10s 留给负载抖动兜底。 */
var SOCKET_READY_TIMEOUT_MS_POSIX = 1e4;
/** 意外退出后最少等多久再补池。
*
* 防止瞬时崩溃 → 立刻 spawn → 又崩的死循环；同时 10s 作为下限也给可能的
* 资源/端口/二进制问题留一点恢复余地，比 1s 更稳健。
* 正常 activate 用掉一个 entry 后的补池路径同样走这个退避基数（首次 0ms，
* 失败后按 base 起步），不会影响命中正常的运行时延。
*/
var REPLENISH_BACKOFF_BASE_MS = 1e4;
/** 退避封顶。崩到这个程度可能是环境问题（cliPath 失效等），等 60s 再试。 */
var REPLENISH_BACKOFF_MAX_MS = 6e4;
/**
* 后台健康探活的节拍与单次超时。
*
* 目的：识别"进程仍在、socket 仍 listen、但用户态被冻结"的假死进程
* （kill -STOP、系统休眠恢复、GC 死循环、sync C++ addon 死锁等）。
* 这些状态**不会**触发 child 'exit' 或 socket 'error'——`entry.status`
* 会一直停留在 'idle'，靠状态字段永远发现不了。
*
* 为什么改成"后台定时探活"而非"tryAcquire 时实时 ping"（issue #75795）：
* - 旧实现在 tryAcquire 命中前 `await pingIdleEntry`（同步阻塞用户建会话）。
*   Windows 上 cbc 进程刚 ready（socket 通）时，CellJS 容器 / PluginManager.doInit
*   等重活仍在跑、事件循环繁忙，named pipe 的 ping 响应被阻塞。500ms 单次 ping
*   超时 → 把"刚 ready 仍在初始化"的**健康**进程误判为假死淘汰 → 首次会话回退
*   冷启动（用户实测"首次慢、二次快"）。日志实测误杀发生在进程 ready 后 3.3~14.6s。
* - 新实现把"探活"与"acquire"解耦：spawn ready 后挂一个后台定时器周期性 ping，
*   只用来把假死进程降级淘汰；tryAcquire 变回同步、只读状态、不 ping，永不卡等待。
*   idle 进程乐观视为可用（含首次 ping 前的窗口），偶发命中刚就绪仍在忙的进程由
*   doActivate 自身兜底回退，不影响 acquire 的即时响应。
*
* 阈值选取：
* - 首次探活 20s：进程 idle 后 20s 做第一次探活，快速过滤掉"刚 spawn 就假死 /
*   启动即卡死"的坏进程；这 20s 内 idle 乐观算可用（不阻塞 acquire）。
* - 稳态间隔 8min：探活唯一目的是发现假死（SIGSTOP / 死锁 / 休眠恢复），这是低频
*   异常事件，且 acquire 路径已不依赖探活（同步、乐观放行），不必频繁 ping——
*   8min 一次几乎无 CPU 负担，也不与 child 抢资源。
* - 单次超时 2s：本地 ping 正常 <5ms；给 2s 容忍进程偶发繁忙（GC / 短暂 init 尾巴），
*   避免把只是"忙一下"的健康进程误判假死。
*
* 单测可通过 `healthProbeFirstDelayMs` / `healthProbeIntervalMs` /
* `healthProbeTimeoutMs` dep 注入小值加速。
*/
var HEALTH_PROBE_FIRST_DELAY_MS = 2e4;
var HEALTH_PROBE_INTERVAL_MS = 48e4;
var HEALTH_PROBE_TIMEOUT_MS = 2e3;
/**
* idle 待命 TTL：到期仍 idle 则回收，且不补池（issue #92347）。
* 默认 15min；单测可注入 `idleTtlMs` 小值。
*/
var IDLE_TTL_MS = 9e5;
/** 子进程 stderr 留尾巴行数，崩溃诊断用；超过即丢最早的。 */
var STDERR_TAIL_MAX_LINES = 20;
/** 单行 stderr 最长保留字节，避免单条爆栈占用过多内存。 */
var STDERR_TAIL_MAX_LINE_BYTES = 1024;
var cliChildCrashWatcher;
function bindCliChildCrashWatcher(fn) {
	cliChildCrashWatcher = fn;
}
/**
* 已知的 session 维度 env 键白名单——作为"未审计差异兜底拦截器"。
*
* 设计意图：
* - agent-cli 的 prewarm-protocol 已支持 activate 时透传 env，**已知**的
*   session 维度差异（agent-teams / connector token 等）可以在 activate
*   阶段消化，不再需要 env 完全相等才命中。
* - 但**未知**的 env 维度差异（未来加新功能引入了一个新的 session 维度 env）
*   不应被静默"复用"——如果它没注册进白名单、调用方没把它放进 deltaEnv，
*   prewarm 进程就会漏掉这个 env，下游会出错。
* - 因此 tryAcquire 仍然检查 deltaEnv 的键集合：**任意键不在白名单内** →
*   视为未审计差异，回退冷启动，宁可慢不要错。
*
* 维护规则：每当 backend 新增"按 session 变化的 env"，必须把对应键加进
* 这个白名单——这是个显式审计动作。
*
* ⚠️ 登记新键前必须核对 cbc 侧消费方（两层耦合契约）：
*   把一个键加进白名单 = 允许 prewarm 命中而**不回退**冷启动。此时该键的值
*   只会在 activate 阶段被 merge 进待命进程的 `process.env`
*   （见 agent-cli `cli-dispatcher.ts::runPrewarmStandby` 第 2 步）。因此 cbc
*   侧对这个 env 的消费**必须是运行时 live 读**（每次用时 `process.env[K]`），
*   **不能**是冷启动就固化的形态：
*     - 模块级 `const X = process.env.K`（require 时即冻结）
*     - 单例 `@Component` 的字段初始化 / 构造函数里读一次
*     - memoized getter（首调发生在 activate 之前 → 缓存旧值）
*   否则会踩"静默取旧值"陷阱：白名单放行了预热命中，但 cbc 那个缓存值仍是
*   待命进程冷启动时的 baseline 值，session 维度差异丢失且无任何报错。
*   （反面参照：白名单内现有键——CODEBUDDY_HOST_CAPABILITIES 在
*   mcp-server-manager 运行时兜底读、CODEBUDDY_QIMEI36 在 qimei-env-detector
*   运行时读、AGENT_TEAMS 在 team-manager.isEnabled 运行时读——全部是 live 读，
*   所以登记进白名单是安全的。）
*   若某个 per-session 键在 cbc 侧只能冷启动缓存，则**不要**加进白名单——保持
*   回退冷启动，宁可慢不要错。
*/
var PER_SESSION_ENV_KEYS = /* @__PURE__ */ new Set([
	AGENT_TEAMS_ENV_KEY,
	"CODEBUDDY_CLIENT_INFO_DOWNLOAD_CHANNEL",
	"CODEBUDDY_CODE_DISABLE_SESSION_SUMMARY",
	"CODEBUDDY_CODE_DISABLE_TERMINAL_TITLE",
	"TENCENT_DOCS_LOCAL_MCP",
	"TENCENT_DOCS_LOCAL_SERVER",
	"editor_sdk_port",
	"CODEBUDDY_HOST_CAPABILITIES",
	"CODEBUDDY_QIMEI36",
	"CODEBUDDY_INTERNET_ENVIRONMENT",
	"CODEBUDDY_SESSION_SKILL_DIRS"
]);
/**
* 把 connector token env 这种键名动态的字段也纳入白名单——按"约定俗成"的
* 后缀匹配。比真正穷举宽松，但仍能拦住完全意外的 env 名（如配置错的全局
* 变量、调试 flag 等）。
*/
var PER_SESSION_ENV_SUFFIXES = [
	"_TOKEN",
	"_API_KEY",
	"_ACCESS_TOKEN"
];
/**
* 运行期可变、需让当前进程 `process.env` 最新值覆盖固化 baselineEnv 的 env 声明。
*
* baselineEnv 在池创建时固化，但下列 env 可能在池创建之后被产品快照热更改写，
* spawn prewarm 时必须以当前进程的最新值为准。
*
* 互斥组：组内同一时刻只应有一个键生效。按数组顺序取当前进程里第一个「有值」
* 的键作为 active，用它覆盖并删除同组其余键，避免新旧配置并存。
*/
var MUTUALLY_EXCLUSIVE_ENV_GROUPS = [["ACC_PRODUCT_CONFIG_PATH", "ACC_PRODUCT_CONFIG_V3"]];
/**
* 解析当前进程里「受控产品配置 env」应注入的最终键值：互斥组按顺序择一
* （路径优先）。spawn 时用它把当前进程的最新值覆盖固化的 baselineEnv。
*/
function resolveCurrentProductConfigEnv() {
	const resolved = {};
	for (const group of MUTUALLY_EXCLUSIVE_ENV_GROUPS) {
		const activeKey = group.find((key) => Boolean(process.env[key]));
		if (activeKey) resolved[activeKey] = process.env[activeKey];
	}
	return resolved;
}
function applyCurrentProductConfigEnv(env) {
	const resolved = resolveCurrentProductConfigEnv();
	for (const group of MUTUALLY_EXCLUSIVE_ENV_GROUPS) {
		const activeKey = group.find((key) => key in resolved);
		if (!activeKey) continue;
		for (const key of group) if (key === activeKey) env[key] = resolved[key];
		else delete env[key];
	}
}
function isWhitelistedSessionEnvKey(key, trustedSessionEnvKeys) {
	if (PER_SESSION_ENV_KEYS.has(key) || trustedSessionEnvKeys.has(key)) return true;
	for (const suffix of PER_SESSION_ENV_SUFFIXES) if (key.endsWith(suffix)) return true;
	return false;
}
function managedEnvMismatchDetails(expected, actual) {
	return [.../* @__PURE__ */ new Set([...Object.keys(expected), ...Object.keys(actual)])].filter((key) => !Object.prototype.hasOwnProperty.call(expected, key) || !Object.prototype.hasOwnProperty.call(actual, key) || expected[key] !== actual[key]).map((key) => {
		if (!Object.prototype.hasOwnProperty.call(expected, key)) return `${key}:prewarm-missing`;
		if (!Object.prototype.hasOwnProperty.call(actual, key)) return `${key}:runtime-missing`;
		return `${key}:value-changed`;
	}).sort();
}
var CliPrewarmPool = class {
	constructor(deps) {
		this.deps = deps;
		this.entries = [];
		this.bySession = /* @__PURE__ */ new Map();
		this.started = false;
		this.stopped = false;
		this.replenishBackoffMs = 0;
		this.pendingReplenishments = 0;
		this.flushing = null;
		this.replenishRequestedDuringFlush = false;
	}
	/** 启动池，spawn 初始 poolSize 个 prewarm 进程。失败不抛——池空 = 全走冷启动。 */
	start(source = "immediate") {
		if (this.started || this.stopped) return;
		this.started = true;
		if (this.deps.poolSize <= 0) {
			this.log("info", "pool disabled (poolSize=0)");
			return;
		}
		this.startupTelemetry = {
			source,
			triggeredAt: Date.now(),
			readyReported: false
		};
		this.emitStartupEvent({
			stage: "prewarm_triggered",
			source
		});
		this.log("info", `pool starting, size=${this.deps.poolSize}`);
		this.reapStalePoolProcesses().catch((error) => {
			this.log("warn", `stale pool reap failed: ${String(error)}`);
		});
		for (let i = 0; i < this.deps.poolSize; i++) this.spawnEntry(source, true).catch((err) => {
			this.log("warn", `initial spawn failed: ${String(err?.message ?? err)}`);
		});
	}
	/**
	* 启动期对账 `<sessionsDir>/<pid>.json`：只认 kind==='prewarm' 且
	* meta.prewarmId 以 `wb-pool-` 开头的条目（用户手动 cbc-prewarm 不碰）。
	* 防误杀：非法/占位 pid 跳过；死 pid 只清账；杀前校验进程命令行含该
	* prewarmId（PID 已被无关进程复用时只清账不动手）；命令行查询失败保守跳过。
	*/
	async reapStalePoolProcesses() {
		try {
			const dir = this.resolveSessionsDir();
			let files;
			try {
				files = (0, node_fs.readdirSync)(dir).filter((name) => name.endsWith(".json"));
			} catch {
				return;
			}
			for (const name of files) try {
				const raw = JSON.parse((0, node_fs.readFileSync)((0, node_path.join)(dir, name), "utf-8"));
				const prewarmId = raw?.meta?.prewarmId;
				if (raw?.kind !== "prewarm" || raw.manual || !prewarmId || !prewarmId.startsWith("wb-pool-")) continue;
				const pid = raw.pid;
				if (!require_process_reap_utils.isValidTargetPid(pid)) continue;
				if (this.entries.some((entry) => entry.child.pid === pid)) continue;
				if (!require_process_reap_utils.isPidAlive(pid)) {
					this.tryUnlinkPidFile(pid);
					continue;
				}
				const commandLine = await require_process_reap_utils.readProcessCommandLine(pid);
				if (this.entries.some((entry) => entry.child.pid === pid)) continue;
				if (commandLine === null) continue;
				if (!commandLine.includes(prewarmId)) {
					this.tryUnlinkPidFile(pid);
					continue;
				}
				this.log("warn", `reaping stale pool prewarm ${prewarmId} (pid=${pid}) from a previous daemon generation`);
				await require_process_reap_utils.killProcessTree(pid);
				this.tryUnlinkPidFile(pid);
			} catch {}
		} catch (error) {
			this.log("warn", `stale pool reap failed: ${String(error)}`);
		}
	}
	/**
	* 尝试领取一个 idle prewarm 进程。
	*
	* 命中条件：
	* 1. 池非空（有 idle entry）；
	* 2. sessionDeltaEnv 中所有键都在白名单内（PER_SESSION_ENV_KEYS ∪
	*    PER_SESSION_ENV_SUFFIXES）。出现白名单外键即视为"未审计差异"，
	*    回退冷启动——保护 prewarm 复用不被新引入的 env 维度静默破坏。
	* 3. **候选 idle 通过一次 IPC ping 健康探活**——防止把"被 STOP / 冻结 /
	*    死锁的假死进程"当作可用（issue #73926）：假死进程的 `entry.status`
	*    仍是 'idle'、child.exit 永不触发，只有主动 ping 能识别。失败即
	*    reclaim（打 `discarded` 标 + removeEntry + scheduleReplenish +
	*    fire-and-forget terminateChild），继续尝试下一个候选，全部失败返回
	*    null。
	*
	* 4. entry 的 spawn managed env 叠加 sessionDeltaEnv 后，必须与本次冷启动
	*    最终会使用的 runtimeManagedEnv 完全一致；不一致即回退冷启动。
	*/
	tryAcquire(sessionDeltaEnv = {}, runtimeManagedEnv, trustedSessionEnvKeys = /* @__PURE__ */ new Set()) {
		if (this.stopped || this.deps.poolSize <= 0) return null;
		const unknownKeys = Object.keys(sessionDeltaEnv).filter((k) => !isWhitelistedSessionEnvKey(k, trustedSessionEnvKeys));
		if (unknownKeys.length > 0) {
			this.log("warn", `tryAcquire skipped: unknownSessionEnvCount=${unknownKeys.length}; add them to PER_SESSION_ENV_KEYS/SUFFIXES if expected`);
			return null;
		}
		const capturedDeltaEnv = { ...sessionDeltaEnv };
		for (const entry of [...this.entries]) {
			if (entry.status !== "idle") continue;
			if (runtimeManagedEnv) {
				const mismatchDetails = managedEnvMismatchDetails({
					...entry.spawnManagedEnv,
					...capturedDeltaEnv
				}, runtimeManagedEnv);
				if (mismatchDetails.length > 0) {
					this.log("warn", `tryAcquire skipped stale entry: managedEnvMismatchCount=${mismatchDetails.length} prewarmId=${entry.prewarmId} managedEnvMismatches=${JSON.stringify(mismatchDetails)}`);
					this.clearHealthProbe(entry);
					this.clearIdleTtl(entry);
					entry.discarded = true;
					this.removeEntry(entry);
					this.scheduleReplenish("managed_env_mismatch");
					this.terminateChild(entry.child).catch(() => {});
					continue;
				}
			}
			entry.status = "activated";
			this.clearHealthProbe(entry);
			this.clearIdleTtl(entry);
			this.log("info", `tryAcquire hit (id=${entry.prewarmId})`);
			const release = this.createEntryRelease(entry);
			return {
				prewarmId: entry.prewarmId,
				release,
				activate: (opts) => this.doActivate(entry, {
					...opts,
					env: Object.keys(capturedDeltaEnv).length > 0 ? capturedDeltaEnv : void 0
				}, release)
			};
		}
		this.scheduleReplenish("acquire_miss");
		return null;
	}
	/**
	* 启动 entry 的后台健康探活（issue #75795），两段式：
	* - 首次：idle 后 HEALTH_PROBE_FIRST_DELAY_MS（默认 20s）做第一次探活，快速
	*   过滤刚 spawn 就假死的坏进程；
	* - 稳态：首次探活跑完后转 setInterval，每 HEALTH_PROBE_INTERVAL_MS（默认 8min）
	*   一次，低频发现假死。
	* 定时器 unref，避免拖住进程退出。幂等：已有定时器则先清再建。
	*/
	startHealthProbe(entry) {
		this.clearHealthProbe(entry);
		const firstDelayMs = this.deps.healthProbeFirstDelayMs ?? HEALTH_PROBE_FIRST_DELAY_MS;
		const intervalMs = this.deps.healthProbeIntervalMs ?? HEALTH_PROBE_INTERVAL_MS;
		const firstTimer = setTimeout(() => {
			this.runHealthProbe(entry).finally(() => {
				if (this.stopped || entry.status !== "idle" || entry.discarded) return;
				const intervalTimer = setInterval(() => {
					this.runHealthProbe(entry).catch(() => {});
				}, intervalMs);
				intervalTimer.unref?.();
				entry.healthTimer = intervalTimer;
			}).catch(() => {});
		}, firstDelayMs);
		firstTimer.unref?.();
		entry.healthTimer = firstTimer;
	}
	/**
	* 清除 entry 的健康探活定时器（activate / 淘汰 / stop 时调用）。
	* 句柄可能是 setTimeout（首次）或 setInterval（稳态）——Node 的 Timeout 对象
	* 对 clearTimeout / clearInterval 均可清理，这里两者都调以覆盖两种阶段。
	*/
	clearHealthProbe(entry) {
		if (entry.healthTimer) {
			clearTimeout(entry.healthTimer);
			clearInterval(entry.healthTimer);
			entry.healthTimer = void 0;
		}
	}
	/**
	* idle 进入待命时启动 TTL（issue #92347）。到期仍 idle 则计划内回收，不补池。
	* 只杀 idle，不杀 activated / spawning。幂等：已有定时器则先清再建。
	*/
	startIdleTtl(entry) {
		this.clearIdleTtl(entry);
		const ttlMs = this.deps.idleTtlMs ?? IDLE_TTL_MS;
		const timer = setTimeout(() => {
			this.expireIdleEntry(entry);
		}, ttlMs);
		timer.unref?.();
		entry.idleTtlTimer = timer;
	}
	clearIdleTtl(entry) {
		if (entry.idleTtlTimer) {
			clearTimeout(entry.idleTtlTimer);
			entry.idleTtlTimer = void 0;
		}
	}
	/**
	* idle TTL 到期：顺序必须是 discarded=true → 清 TTL + health probe →
	* removeEntry → terminateChild。禁止再 scheduleReplenish；exit handler
	* 因 discarded 跳过 unexpected-exit 补池。
	*/
	expireIdleEntry(entry) {
		if (this.stopped || entry.status !== "idle" || entry.discarded) return;
		this.log("info", `idle TTL expired, discarding idle prewarm (id=${entry.prewarmId}, pid=${entry.child.pid ?? "unknown"})`);
		entry.discarded = true;
		this.clearIdleTtl(entry);
		this.clearHealthProbe(entry);
		this.removeEntry(entry);
		this.terminateChild(entry.child).catch(() => {});
	}
	/**
	* 后台探活一次：对 idle entry 发一次 ping，失败即当假死淘汰。
	*
	* 失败原因不区分（timeout / ECONNREFUSED / ok!=true），一律视作"不健康"——
	* 假死进程只有 timeout 一种表现，其他失败也意味着 entry 不可用。
	*
	* 淘汰路径与旧 tryAcquire 假死分支一致（issue #73926）：打 discarded 标避免
	* SIGKILL 触发 exit handler 双写补池，removeEntry + scheduleReplenish +
	* fire-and-forget terminateChild。只处理仍是 idle 的 entry——探活期间若已被
	* acquire（activated）或已淘汰，直接跳过。
	*/
	async runHealthProbe(entry) {
		if (this.stopped || entry.status !== "idle" || entry.discarded) return;
		const timeoutMs = this.deps.healthProbeTimeoutMs ?? HEALTH_PROBE_TIMEOUT_MS;
		let healthy = false;
		try {
			const res = await sendIpcLine(entry.socketPath, { cmd: "ping" }, timeoutMs);
			healthy = !!(res && res.ok === true);
		} catch {
			healthy = false;
		}
		if (healthy || this.stopped || entry.status !== "idle" || entry.discarded) return;
		this.log("warn", `health probe failed, reclaiming unhealthy idle prewarm (id=${entry.prewarmId}, pid=${entry.child.pid ?? "unknown"})`);
		this.clearHealthProbe(entry);
		entry.discarded = true;
		this.removeEntry(entry);
		this.scheduleReplenish("unhealthy_idle", { minDelayMs: this.deps.unexpectedExitBackoffMs ?? REPLENISH_BACKOFF_BASE_MS });
		this.terminateChild(entry.child).catch(() => {});
	}
	/**
	* killSession：若该 session 由池产生，按 pid 终止并清映射；否则返回 false
	* 让调用方走原 runtimeManager.killSession（sidecar 路径）。
	*/
	async killSession(sessionId) {
		const entry = this.bySession.get(sessionId);
		if (!entry) return false;
		return this.releaseActivatedEntry(entry, sessionId);
	}
	/**
	* 返回所有已 activate 的 prewarm 会话的 HTTP endpoint（去掉 /api/v1/acp 后缀）。
	*
	* prewarm 命中的会话绕过了 sidecar 会话表（见文件头设计边界），不会出现在
	* `SidecarManager.listSessions()` 里；供 `SidecarManager.getAllActiveEndpoints()`
	* 合并汇总，否则安全中心规则实时同步等广播场景会漏掉这些会话。
	*/
	getActiveEndpoints() {
		return this.entries.filter((e) => e.status === "activated" && e.acpEndpoint).map((e) => e.acpEndpoint.replace(/\/api\/v1\/acp$/, ""));
	}
	/**
	* 按 sessionId 精确查询该会话已 activate 的 HTTP endpoint（去掉 /api/v1/acp 后缀）。
	*
	* prewarm 命中的会话绕过 sidecar 会话表（见文件头设计边界），不在
	* `SidecarManager.listSessions()` 里；`SidecarManager.resolveSessionHttpBase()`
	* 查不到普通 sidecar session 时回退到这里，让 `ExpertPluginService`
	* 之类按 sessionId 定位 ACP endpoint 的链路在 prewarm 会话中也能拿到端点
	* （issue #62459：不然专家 plugin switch 会 degrade，专家身份注入失效）。
	*
	* 未 activate / 已 kill / 未知 sessionId 返回 undefined。
	*/
	getActiveEndpointForSession(sessionId) {
		const entry = this.bySession.get(sessionId);
		if (!entry || entry.status !== "activated" || !entry.acpEndpoint) return;
		return entry.acpEndpoint.replace(/\/api\/v1\/acp$/, "");
	}
	/**
	* flush：无条件杀掉所有 idle/spawning 条目并重新 spawn。
	*
	* 典型场景：
	* - auth 状态变化（登录 / 登出 / 切用户）：旧 prewarm 进程持有的 auth 文件
	*   快照已过时，必须换一批在新 auth 环境下重新冷启动。
	* - 产品配置快照变化：新配置已写入当前进程的产品配置 env（可能是内联
	*   ACC_PRODUCT_CONFIG_V3，也可能是 Linux 大配置 spill 后的固定路径文件），
	*   重新 spawn 时经 applyCurrentProductConfigEnv 覆盖固化的 baselineEnv 生效。
	*
	* 变化检测由上游 coordinator 的 rotation key 精确去重（无实质变化的高频发布
	* 不会触发本入口），因此这里不再做二次指纹去重——否则 spill 模式下固定路径的
	* 指纹恒定，会把真实变化误判为无变化而漏重建。
	*
	* 已 activated 的条目不受影响（它们已经绑定了 session，由 killSession 管理）。
	*
	* 多次并发/连续调用会被合并（见 enqueueFlush），不会重复杀正在 spawning 的新进程。
	*/
	async flush(source = "flush") {
		if (this.stopped || this.deps.poolSize <= 0) return;
		return this.enqueueFlush(source);
	}
	/** 进行中请求由当前 replacement 吸收；cycle 完成后的请求创建新 cycle。 */
	enqueueFlush(source) {
		if (this.flushing) return this.flushing;
		this.replenishRequestedDuringFlush = this.pendingReplenishments > 0;
		const shouldMaintainCapacity = this.entries.some((entry) => entry.status === "idle" || entry.status === "spawning") || this.pendingReplenishments > 0;
		const flushPromise = this.runFlushCycle(source, shouldMaintainCapacity);
		this.flushing = flushPromise;
		return flushPromise;
	}
	/** 一轮实际重建：杀 idle/spawning 条目，补池到目标容量。 */
	async runFlushCycle(source, shouldMaintainCapacity) {
		await Promise.resolve();
		try {
			if (this.stopped || this.deps.poolSize <= 0) return;
			const idleOrSpawning = this.entries.filter((e) => e.status === "idle" || e.status === "spawning");
			if (idleOrSpawning.length === 0) {
				this.log("info", "flush: no idle/spawning entries to flush");
				if (!shouldMaintainCapacity && (!this.started || !this.replenishRequestedDuringFlush)) return;
			} else {
				this.log("info", `flush: killing ${idleOrSpawning.length} idle/spawning entries, will re-spawn`);
				for (const entry of idleOrSpawning) {
					entry.discarded = true;
					this.removeEntry(entry);
				}
				await Promise.all(idleOrSpawning.map((entry) => this.terminateChild(entry.child).catch(() => {})));
			}
			this.replenishBackoffMs = 0;
			const currentIdleOrSpawning = this.entries.filter((e) => e.status === "idle" || e.status === "spawning").length;
			const toSpawn = Math.max(0, this.deps.poolSize - currentIdleOrSpawning);
			const spawns = [];
			for (let i = 0; i < toSpawn; i++) spawns.push(this.spawnEntry(source, false).catch((err) => {
				this.log("warn", `flush re-spawn failed: ${String(err?.message ?? err)}`);
			}));
			await Promise.allSettled(spawns);
		} finally {
			this.flushing = null;
			const hadReplenishIntent = this.replenishRequestedDuringFlush;
			this.replenishRequestedDuringFlush = false;
			if (hadReplenishIntent) this.scheduleReplenish("post_acquire");
		}
	}
	/** daemon 退出时调用，杀光所有待命 + 已 activate 但仍由池跟踪的进程。 */
	async stop() {
		if (this.stopped) return;
		this.stopped = true;
		const snapshot = [...this.entries];
		this.entries.length = 0;
		this.bySession.clear();
		for (const entry of snapshot) {
			entry.discarded = true;
			this.clearHealthProbe(entry);
			this.clearIdleTtl(entry);
		}
		await Promise.all(snapshot.map((e) => this.terminateChild(e.child).catch(() => {})));
	}
	async doActivate(entry, opts, release) {
		const pid = entry.child.pid ?? 0;
		const bootstrap = this.deps.credentialProtectionBootstrap;
		this.log("info", `[CredentialBootstrap] prewarm delivery started ${JSON.stringify({
			eventAtMs: Date.now(),
			prewarmId: entry.prewarmId,
			cbcPid: pid,
			sessionId: opts.sessionId,
			bootstrapAttached: bootstrap !== void 0,
			policy: bootstrap?.policy,
			symmetricAvailable: bootstrap?.symmetricKey !== void 0,
			asymmetricMaterialAvailable: bootstrap?.userKey !== void 0 && bootstrap?.developerPublicKey !== void 0
		})}`);
		this.log("info", `doActivate (id=${entry.prewarmId}, pid=${pid}, sessionId=${opts.sessionId}, port=kernel-assigned, ${formatEnvCountForLog("deltaEnvCount", opts.env ?? {})})`);
		this.scheduleReplenish("post_acquire");
		let ready;
		try {
			ready = await this.sendActivate(entry.socketPath, {
				cwd: opts.cwd,
				args: opts.args,
				sessionId: opts.sessionId,
				ackMode: "ready",
				...bootstrap ? { credentialProtectionBootstrap: bootstrap } : {},
				...opts.env && Object.keys(opts.env).length > 0 ? { env: opts.env } : {}
			});
			validateActivateReadyResponse(ready, {
				expectedPid: pid,
				expectedSessionId: opts.sessionId
			});
		} catch (err) {
			this.removeEntry(entry);
			await this.terminateChild(entry.child).catch(() => {});
			this.scheduleReplenish("activate_failure", { minDelayMs: this.deps.unexpectedExitBackoffMs ?? REPLENISH_BACKOFF_BASE_MS });
			this.log("warn", `[CredentialBootstrap] prewarm delivery unavailable ${JSON.stringify({
				eventAtMs: Date.now(),
				prewarmId: entry.prewarmId,
				cbcPid: pid,
				sessionId: opts.sessionId,
				bootstrapAttached: bootstrap !== void 0,
				...getCredentialBootstrapPrewarmFailure(err)
			})}`);
			throw err;
		}
		this.log("info", `[CredentialBootstrap] prewarm delivery acknowledged ${JSON.stringify({
			eventAtMs: Date.now(),
			prewarmId: entry.prewarmId,
			cbcPid: pid,
			sessionId: opts.sessionId,
			bootstrapAttached: bootstrap !== void 0
		})}`);
		const acpEndpoint = String(ready.endpoint);
		entry.sessionId = opts.sessionId;
		entry.acpEndpoint = acpEndpoint;
		this.bySession.set(opts.sessionId, entry);
		return {
			pid,
			acpEndpoint,
			activateTimings: parseActivateTimings(ready.timings),
			release
		};
	}
	createEntryRelease(entry) {
		let releasePromise;
		return () => {
			releasePromise ??= this.releaseActivatedEntry(entry, entry.sessionId).then(() => void 0);
			return releasePromise;
		};
	}
	/**
	* Release one captured activated entry without re-resolving by session id.
	* A timed-out old release may finish after the same session id has already
	* been assigned to a replacement entry; only delete the mapping when it
	* still points at the captured entry.
	*/
	async releaseActivatedEntry(entry, sessionId) {
		const tracked = this.entries.includes(entry);
		const mapped = sessionId !== void 0 && this.bySession.get(sessionId) === entry;
		if (!tracked && !mapped) return false;
		if (mapped && sessionId !== void 0) this.bySession.delete(sessionId);
		this.removeEntry(entry);
		await this.terminateChild(entry.child).catch((err) => {
			this.log("warn", `release activated entry failed: ${String(err?.message ?? err)}`);
		});
		return true;
	}
	async spawnEntry(source, isInitial) {
		if (this.stopped) return;
		const spawnStartedAt = Date.now();
		const prewarmId = `wb-pool-${Date.now()}-${(0, node_crypto.randomBytes)(3).toString("hex")}`;
		this.emitStartupEvent({
			stage: "prewarm_spawn_started",
			source,
			prewarmId,
			isInitial
		});
		const socketPath = resolvePrewarmIpcPath(prewarmId);
		const args = [
			this.deps.cliPath,
			"--prewarm",
			"--prewarm-id",
			prewarmId
		];
		const spawnManagedEnv = {
			...this.deps.baselineEnvProvider?.() ?? this.deps.baselineEnv,
			...require_process_reap_utils.CLI_STATIC_MANAGED_ENV
		};
		applyCurrentProductConfigEnv(spawnManagedEnv);
		const env = require_process_reap_utils.buildCliProcessEnv(spawnManagedEnv);
		if (this.deps.credentialProtectionBootstrap) env.WORKBUDDY_AT_REST_ENCRYPTION = this.deps.credentialProtectionBootstrap.policy;
		const prewarmSocketDir = process.env[PREWARM_SOCKET_DIR_ENV]?.trim();
		if (prewarmSocketDir) env[PREWARM_SOCKET_DIR_ENV] = prewarmSocketDir;
		this.log("info", `spawning prewarm (id=${prewarmId})`);
		const child = (0, node_child_process.spawn)(this.deps.execPath, args, {
			detached: true,
			stdio: [
				"ignore",
				"ignore",
				"pipe"
			],
			windowsHide: true,
			env
		});
		const entry = {
			prewarmId,
			socketPath,
			child,
			status: "spawning",
			spawnManagedEnv: { ...spawnManagedEnv }
		};
		this.entries.push(entry);
		cliChildCrashWatcher?.(child);
		child.on("error", (err) => {
			if (entry.discarded) return;
			entry.discarded = true;
			const errMsg = err instanceof Error ? err.message : String(err);
			this.log("warn", `prewarm child error (id=${prewarmId}, pid=${child.pid ?? "unknown"}, status=${entry.status}): ${errMsg}`);
			this.removeEntry(entry);
			if (entry.sessionId && this.bySession.get(entry.sessionId) === entry) this.bySession.delete(entry.sessionId);
			if (entry.status !== "activated") this.scheduleReplenish("child_error", { minDelayMs: this.deps.unexpectedExitBackoffMs ?? REPLENISH_BACKOFF_BASE_MS });
		});
		const stderrTail = [];
		child.stderr?.on("data", (data) => {
			const text = data.toString();
			for (const rawLine of text.split(/\r?\n/)) {
				if (!rawLine) continue;
				const line = rawLine.length > STDERR_TAIL_MAX_LINE_BYTES ? rawLine.slice(0, STDERR_TAIL_MAX_LINE_BYTES) + "…" : rawLine;
				stderrTail.push(line);
				if (stderrTail.length > STDERR_TAIL_MAX_LINES) stderrTail.shift();
			}
		});
		child.stderr?.on("error", () => {});
		child.on("exit", (code, signal) => {
			this.removeEntry(entry);
			if (entry.sessionId && this.bySession.get(entry.sessionId) === entry) this.bySession.delete(entry.sessionId);
			if (entry.discarded) return;
			if (entry.status !== "activated") {
				const tail = stderrTail.length > 0 ? ` | stderr tail:\n${stderrTail.join("\n")}` : "";
				this.log("warn", `prewarm entry exited before activate (id=${prewarmId}, code=${code}, signal=${signal ?? "none"})${tail}`);
				this.scheduleReplenish("unexpected_exit", { minDelayMs: this.deps.unexpectedExitBackoffMs ?? REPLENISH_BACKOFF_BASE_MS });
			} else if (!this.stopped && !child.killed && ((code ?? 0) !== 0 || signal)) {
				const tail = stderrTail.length > 0 ? stderrTail.join("\n") : "<empty>";
				this.log("warn", `activated prewarm entry exited unexpectedly (id=${prewarmId}, pid=${child.pid ?? "unknown"}, sessionId=${entry.sessionId ?? "unknown"}, code=${code}, signal=${signal ?? "none"}) | stderr tail:\n${tail}`);
			}
		});
		if (!await this.waitSocketReady(socketPath)) {
			this.log("warn", `prewarm IPC not ready in time (id=${prewarmId})`);
			this.removeEntry(entry);
			await this.terminateChild(child).catch(() => {});
			return;
		}
		if (!entry.discarded && this.entries.includes(entry) && entry.status === "spawning") {
			entry.status = "idle";
			this.replenishBackoffMs = 0;
			this.log("info", `prewarm ready (id=${prewarmId})`);
			const spawnDurationMs = Date.now() - spawnStartedAt;
			this.emitStartupEvent({
				stage: "prewarm_spawn_ready",
				source,
				prewarmId,
				isInitial,
				spawnDurationMs
			});
			const startupTelemetry = this.startupTelemetry;
			if (startupTelemetry && !startupTelemetry.readyReported) {
				startupTelemetry.readyReported = true;
				this.emitStartupEvent({
					stage: "prewarm_ready",
					source: startupTelemetry.source,
					prewarmId,
					durationMs: Date.now() - startupTelemetry.triggeredAt,
					spawnDurationMs
				});
			}
			this.startHealthProbe(entry);
			this.startIdleTtl(entry);
		}
	}
	/**
	* 调度一次补池。
	*
	* 时延决策：
	* - 实际延迟 = max(replenishBackoffMs, opts.minDelayMs ?? 0)
	* - replenishBackoffMs：连续 spawn 失败的退避计数；上次成功后归 0
	* - minDelayMs：调用方指定的最小等待，意外退出路径用它强制至少等 10s
	*
	* 退避计数推进规则：只有在 **实际等过** 的调度上推进（delayMs > 0），
	* 普通 post-acquire 命中→立即补的路径不污染计数。一次 spawn 成功
	* （waitSocketReady 通过）即把计数归零。stopped 时直接放弃。
	*
	* 容量不变量：只有 idle/spawning entry 占用可领取池容量，activated entry
	* 已绑定会话、不计入 poolSize。每次调度和 timer 真正触发时都重新检查容量：
	* 前者避免同一失败路径重复排 timer/推进退避，后者合并多个并发 timer，
	* 保证最多只有 poolSize 个 idle/spawning replacement。
	*/
	scheduleReplenish(source, opts) {
		if (this.flushing) {
			this.replenishRequestedDuringFlush = true;
			return;
		}
		if (!this.hasReplenishCapacity()) return;
		this.pendingReplenishments += 1;
		const minDelay = opts?.minDelayMs ?? 0;
		const delayMs = Math.max(this.replenishBackoffMs, minDelay);
		if (delayMs > 0) this.replenishBackoffMs = this.replenishBackoffMs === 0 ? REPLENISH_BACKOFF_BASE_MS : Math.min(this.replenishBackoffMs * 2, REPLENISH_BACKOFF_MAX_MS);
		const fire = () => {
			this.pendingReplenishments = Math.max(0, this.pendingReplenishments - 1);
			if (this.flushing) {
				this.replenishRequestedDuringFlush = true;
				return;
			}
			if (!this.hasReplenishCapacity()) return;
			this.spawnEntry(source, false).catch((err) => {
				this.log("warn", `replenish spawn failed (${source}): ${String(err?.message ?? err)}`);
			});
		};
		if (delayMs <= 0) fire();
		else {
			this.log("warn", `replenish scheduled in ${delayMs}ms (${source})`);
			setTimeout(fire, delayMs).unref?.();
		}
	}
	hasReplenishCapacity() {
		if (this.stopped || this.deps.poolSize <= 0) return false;
		return this.entries.filter((entry) => !entry.discarded && (entry.status === "idle" || entry.status === "spawning")).length + this.pendingReplenishments < this.deps.poolSize;
	}
	async sendActivate(socketPath, body) {
		const ackTimeoutMs = this.deps.activateReadyTimeoutMs ?? ACTIVATE_READY_TIMEOUT_MS;
		const connectTimeoutMs = this.deps.activateConnectTimeoutMs ?? IPC_TIMEOUT_MS;
		const abort = new AbortController();
		return new Promise((resolve, reject) => {
			let settled = false;
			const finishOuter = (fn) => {
				if (settled) return;
				settled = true;
				abort.abort();
				fn();
			};
			sendIpcLine(socketPath, {
				cmd: "activate",
				...body
			}, ackTimeoutMs, {
				connectTimeoutMs,
				signal: abort.signal,
				onWritten: () => {
					if (abort.signal.aborted) return;
					this.watchActivateIdleAfterWrite(socketPath, abort.signal).catch((err) => {
						finishOuter(() => reject(err instanceof Error ? err : new Error(String(err))));
					});
				}
			}).then((res) => finishOuter(() => resolve(res)), (err) => finishOuter(() => reject(err)));
		});
	}
	/**
	* activate 行 write 成功之后串行 ping：连续 ≥2 次读到 idle（间隔 ≥一次短 ping）
	* 视为从未进入 handleActivate，立即失败。activating|active、或 ping 超时/
	* 繁忙读不到 status，则停掉 idle 计数，把等待交给 ready ACK。
	*/
	async watchActivateIdleAfterWrite(socketPath, signal) {
		const pingTimeoutMs = this.deps.activateIdleWatchdogTimeoutMs ?? IPC_TIMEOUT_MS;
		let consecutiveIdle = 0;
		while (!signal.aborted) {
			let status;
			try {
				status = (await sendIpcLine(socketPath, { cmd: "ping" }, pingTimeoutMs, { signal }))?.status;
			} catch {
				if (signal.aborted) return;
				return;
			}
			if (signal.aborted) return;
			if (status === "activating" || status === "active") return;
			if (status === "idle") {
				consecutiveIdle += 1;
				if (consecutiveIdle >= 2) throw new Error(`prewarm activate still idle after write: ${socketPath}`);
				try {
					await delay(pingTimeoutMs, signal);
				} catch {
					return;
				}
				continue;
			}
			return;
		}
	}
	/**
	* 用 ping 探活，每 PING_INTERVAL_MS 一轮，到 SOCKET_READY_TIMEOUT_MS 总超时。
	*
	* 任意一轮 ping 拿到 `ok: true` 即视为 ready，立即返回 true——首次 ping
	* 就过的快路径不会等满 ping 间隔。
	*
	* 失败语义：单次 ping 抛错（ENOENT/ECONNREFUSED/timeout）只算"还没 listen"，
	* 等 PING_INTERVAL_MS 后再试，直到总超时；总超时仍未 ok 才返回 false。
	*
	* 默认值按平台分档（见 SOCKET_READY_TIMEOUT_MS_*）；deps 可注入覆盖（仅
	* 单测用）。
	*/
	async waitSocketReady(socketPath) {
		const totalTimeoutMs = this.deps.socketReadyTimeoutMs ?? (process.platform === "win32" ? SOCKET_READY_TIMEOUT_MS_WIN : SOCKET_READY_TIMEOUT_MS_POSIX);
		const intervalMs = this.deps.socketReadyPingIntervalMs ?? PING_INTERVAL_MS;
		const deadline = Date.now() + totalTimeoutMs;
		do {
			try {
				const res = await sendIpcLine(socketPath, { cmd: "ping" }, IPC_TIMEOUT_MS);
				if (res && res.ok) return true;
			} catch {}
			const remainingMs = deadline - Date.now();
			if (remainingMs <= 0) break;
			await delay(Math.min(intervalMs, remainingMs));
		} while (Date.now() < deadline);
		return false;
	}
	removeEntry(entry) {
		this.clearHealthProbe(entry);
		this.clearIdleTtl(entry);
		const idx = this.entries.indexOf(entry);
		if (idx >= 0) this.entries.splice(idx, 1);
	}
	async terminateChild(child) {
		const pid = child?.pid;
		try {
			if (!child || !pid || child.exitCode !== null) return;
			await require_process_reap_utils.killProcessTree(pid, {
				gracefulMs: KILL_GRACEFUL_MS,
				forceMs: KILL_GRACEFUL_MS
			});
		} finally {
			this.tryUnlinkPidFile(pid);
		}
	}
	/**
	* 按 pid 删除子进程写入的 pid 文件（`<sessionsDir>/<pid>.json`）。
	*
	* 使用 unlinkSync：文件本身极小且极少（poolSize=1 → 只有 1 个），同步删也
	* <1ms；换来的是 `stop()` 返回时磁盘状态已定，测试断言可靠。ENOENT / 权限
	* 错误一律忽略——文件已被子进程自清（POSIX 常见路径）或首次 stop 时压根
	* 没写成功，都不该阻塞退出流程。
	*
	* pid 校验（正整数）防御未来 spawn 失败前调用——ENOENT 就算了，`unlink(NaN)`
	* 会抛不同的错，不吞会污染诊断信号。
	*/
	tryUnlinkPidFile(pid) {
		if (!pid || !Number.isInteger(pid) || pid <= 0) return;
		const pidFile = (0, node_path.join)(this.resolveSessionsDir(), `${pid}.json`);
		try {
			(0, node_fs.unlinkSync)(pidFile);
		} catch {}
	}
	/**
	* 解析子进程 pid 文件所在的 sessions 目录。
	*
	* 优先级见 CliPrewarmPoolDependencies.sessionsDir 注释——与 `bin/wb-prewarm`
	* 完全一致，保证 daemon 侧 unlink 的路径与子进程 register 的路径匹配。
	*/
	resolveSessionsDir() {
		if (this.deps.sessionsDir) return this.deps.sessionsDir;
		const cbc = process.env.CODEBUDDY_CONFIG_DIR;
		const wb = process.env.WORKBUDDY_CONFIG_DIR;
		const root = cbc && cbc.trim() !== "" ? cbc : wb && wb.trim() !== "" ? wb : (0, node_path.join)((0, node_os.homedir)(), ".workbuddy");
		return (0, node_path.join)(root, "sessions");
	}
	/**
	* 日志输出永不抛异常。
	*
	* `deps.logger` 缺省时回退到 `console`，而 daemon 的 stdout 是 IPC 管道：
	* 主进程先退出（例如升级退出）后管道即关闭，此时 `console.log` 会同步抛
	* `Error: write EPIPE`。这个异常从 log() 冒泡出去会被 daemon 的
	* uncaughtException handler 捕获并写进 Crash-Log，把"对端正常关闭"这一外部
	* 事实污染成 daemon 崩溃记录（Issue #109958 现场即如此）。
	*
	* 日志是旁路设施，写不出去就丢弃，绝不反向影响预热池生命周期。
	*/
	log(level, msg) {
		try {
			(this.deps.logger ?? console)[level](`${TAG} ${msg}`);
		} catch {}
	}
	emitStartupEvent(event) {
		try {
			this.deps.onStartupEvent?.(event);
		} catch {}
	}
};
var PREWARM_ADDRESS_PREFIX = "codebuddy-prewarm-";
/**
* unix socket 落盘目录 env（与 agent-cli resolvePrewarmSocketDir 同构）。
* 默认 /tmp；设置后 socket 改落 `<dir>/codebuddy-prewarm-<id>.sock`。
* 池 spawn 子进程时以 `...process.env` 打底，此 env 天然透传给 prewarm 进程，
* 两侧路径一致，无需额外协调。
*/
var PREWARM_SOCKET_DIR_ENV = "CODEBUDDY_CODE_PREWARM_SOCKET_PATH";
function resolvePrewarmIpcPath(prewarmId) {
	const address = `${PREWARM_ADDRESS_PREFIX}${prewarmId}`;
	if (process.platform === "win32") return `\\\\.\\pipe\\${address}`;
	const custom = process.env[PREWARM_SOCKET_DIR_ENV];
	const dir = custom && custom.trim() !== "" ? custom.trim() : "/tmp";
	return (0, node_path.join)(dir, `${address}.sock`);
}
/**
* 从 ready ACK 里安全解析 cbc 回传的 activate 阶段耗时。
*
* 纯诊断字段：非法/缺失一律返回 undefined，绝不抛错影响会话建立。cbc 侧字段可能
* 因版本不匹配（老 cbc 不带 timings）而缺席，需要容错。
*/
function parseActivateTimings(raw) {
	if (!raw || typeof raw !== "object") return;
	const t = raw;
	const num = (v) => typeof v === "number" && Number.isFinite(v) ? v : void 0;
	const totalMs = num(t.totalMs);
	const preDispatchMs = num(t.preDispatchMs);
	const dispatchMs = num(t.dispatchMs);
	if (totalMs === void 0 || preDispatchMs === void 0 || dispatchMs === void 0) return;
	return {
		totalMs,
		preDispatchMs,
		dispatchMs
	};
}
function validateActivateReadyResponse(response, expected) {
	if (response.ok !== true || response.cmd !== "activate" || response.status !== "active") throw new Error(`invalid prewarm activate ready ACK: ok=${String(response.ok)} cmd=${String(response.cmd)} status=${String(response.status)}`);
	if (response.pid !== expected.expectedPid) throw new Error(`prewarm activate ready ACK pid mismatch: expected=${expected.expectedPid} actual=${String(response.pid)}`);
	if (response.sessionId !== expected.expectedSessionId) throw new Error(`prewarm activate ready ACK session mismatch: expected=${expected.expectedSessionId} actual=${String(response.sessionId)}`);
	if (typeof response.endpoint !== "string") throw new Error("prewarm activate ready ACK is missing endpoint");
	let endpoint;
	try {
		endpoint = new URL(response.endpoint);
	} catch {
		throw new Error(`invalid prewarm activate ready ACK endpoint: ${response.endpoint}`);
	}
	const port = Number(endpoint.port);
	if (endpoint.protocol !== "http:" || endpoint.hostname !== "127.0.0.1" || !Number.isInteger(port) || port < 1 || port > 65535 || endpoint.pathname !== "/api/v1/acp" || endpoint.search || endpoint.hash) throw new Error(`invalid prewarm activate ready ACK endpoint: ${response.endpoint}`);
}
/** 写一行 JSON、读一行 JSON 响应、断开。超时按失败处理。 */
function sendIpcLine(socketPath, payload, timeoutMs, options) {
	return new Promise((resolve, reject) => {
		let buf = "";
		let settled = false;
		let connected = false;
		let timer;
		let connectTimer;
		const finish = (fn) => {
			if (settled) return;
			settled = true;
			try {
				sock.destroy();
			} catch {}
			if (timer) clearTimeout(timer);
			if (connectTimer) clearTimeout(connectTimer);
			options?.signal?.removeEventListener("abort", onAbort);
			fn();
		};
		const onAbort = () => {
			const reason = options?.signal?.reason;
			finish(() => reject(reason instanceof Error ? reason : /* @__PURE__ */ new Error(`prewarm IPC aborted: ${socketPath}`)));
		};
		const sock = (0, node_net.connect)(socketPath);
		if (options?.signal?.aborted) {
			onAbort();
			return;
		}
		options?.signal?.addEventListener("abort", onAbort, { once: true });
		if (options?.connectTimeoutMs != null) {
			connectTimer = setTimeout(() => {
				if (connected) return;
				finish(() => reject(/* @__PURE__ */ new Error(`prewarm IPC connect timeout: ${socketPath}`)));
			}, options.connectTimeoutMs);
			connectTimer.unref?.();
		} else {
			timer = setTimeout(() => finish(() => reject(/* @__PURE__ */ new Error(`prewarm IPC timeout: ${socketPath}`))), timeoutMs);
			timer.unref?.();
		}
		sock.once("connect", () => {
			connected = true;
			if (connectTimer) {
				clearTimeout(connectTimer);
				connectTimer = void 0;
			}
			if (options?.connectTimeoutMs != null && timer === void 0) {
				timer = setTimeout(() => finish(() => reject(/* @__PURE__ */ new Error(`prewarm IPC timeout: ${socketPath}`))), timeoutMs);
				timer.unref?.();
			}
			try {
				options?.onConnected?.();
			} catch (err) {
				finish(() => reject(err));
				return;
			}
			try {
				sock.write(JSON.stringify(payload) + "\n", (err) => {
					if (settled) return;
					if (err) {
						finish(() => reject(err));
						return;
					}
					try {
						options?.onWritten?.();
					} catch (cbErr) {
						finish(() => reject(cbErr));
					}
				});
			} catch (err) {
				finish(() => reject(err));
			}
		});
		sock.on("data", (chunk) => {
			buf += String(chunk);
			const nl = buf.indexOf("\n");
			if (nl >= 0) {
				const line = buf.slice(0, nl);
				try {
					const parsed = JSON.parse(line);
					finish(() => resolve(parsed));
				} catch (err) {
					finish(() => reject(err));
				}
			}
		});
		sock.on("error", (err) => finish(() => reject(err)));
		sock.on("close", () => finish(() => reject(/* @__PURE__ */ new Error(`prewarm IPC closed before response: ${socketPath}`))));
	});
}
function delay(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(/* @__PURE__ */ new Error("aborted"));
			return;
		}
		const onAbort = () => {
			clearTimeout(t);
			reject(/* @__PURE__ */ new Error("aborted"));
		};
		const t = setTimeout(() => {
			signal?.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		t.unref?.();
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
//#endregion
Object.defineProperty(exports, "AGENT_TEAMS_ENV_KEY", {
	enumerable: true,
	get: function() {
		return AGENT_TEAMS_ENV_KEY;
	}
});
Object.defineProperty(exports, "CliPrewarmPool", {
	enumerable: true,
	get: function() {
		return CliPrewarmPool;
	}
});
Object.defineProperty(exports, "bindCliChildCrashWatcher", {
	enumerable: true,
	get: function() {
		return bindCliChildCrashWatcher;
	}
});
Object.defineProperty(exports, "formatEnvCountForLog", {
	enumerable: true,
	get: function() {
		return formatEnvCountForLog;
	}
});
Object.defineProperty(exports, "resolveAgentTeamsEnv", {
	enumerable: true,
	get: function() {
		return resolveAgentTeamsEnv;
	}
});
