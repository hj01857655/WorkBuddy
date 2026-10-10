const require_code_cache = require("./code-cache.js");
const require_buddy_telemetry_context = require("./buddy-telemetry-context.js");
//#region ../../packages/workbuddy-server/src/telemetry/buddy-context-store.ts
var import_common = require_code_cache.require_common$1();
require_code_cache.init_common$2();
require_code_cache.init_decorate();
var WorkbuddyBuddyContextProvider = class WorkbuddyBuddyContextProvider {
	getSync() {
		return require_buddy_telemetry_context.getBuddyTelemetryContext();
	}
};
WorkbuddyBuddyContextProvider = require_code_cache.__decorate([(0, import_common.Component)(require_code_cache.BuddyContextProvider)], WorkbuddyBuddyContextProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/telemetry/trace/deterministic-id-generator.ts
require_code_cache.init_esm();
/**
* 包装 RandomIdGenerator，支持为"下一个 span"注入指定 traceId。
*
* 用途：daemon 主进程收到 renderer 透传的 trace_id 后，起 `daemon.prompt.forward`
* span 时强制复用同一个 trace_id，但**不设置 parent**（=> 与 renderer 侧的
* `renderer.prompt.send` 是同一 trace 下的并列/sibling span，不是父子关系）。
*
* 用法：在 `tracer.startSpan(...)` 之前调用一次 `setNextTraceId(id)`；
* 该值只消费一次，自动清空，未设置时退回随机 traceId（默认行为不受影响）。
*
* 必须作为 `BasicTracerProvider` 构造时传入的唯一 idGenerator 实例，且需要
* 在 provider 构造与 `setNextTraceId` 调用之间保持单例（daemonIdGenerator 单例见
* `daemon-trace-service.ts`）。
*/
var DeterministicIdGenerator = class {
	constructor() {
		this.random = new require_code_cache.RandomIdGenerator();
		this.generateTraceId = () => {
			if (this.nextTraceId) {
				const id = this.nextTraceId;
				this.nextTraceId = void 0;
				return id;
			}
			return this.random.generateTraceId();
		};
		this.generateSpanId = () => this.random.generateSpanId();
	}
	/** 设置下一次 generateTraceId() 返回的值（一次性，用后自动清空）。 */
	setNextTraceId(traceId) {
		this.nextTraceId = traceId;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/telemetry/trace/daemon-id-generator.ts
/**
* Daemon 侧唯一的 IdGenerator 单例。
*
* `daemon-trace-service.ts` 构造 `BasicTracerProvider` 时把它设为 idGenerator；
* `session/handlers.ts` 等业务代码在 `startSpan` 前调用 `setNextTraceId(...)`，
* 让新起的 span 强制复用 renderer 传入的 trace_id（sibling 关系，非父子）。
*
* 必须是同一个实例：IdGenerator 只在 provider 构造时绑定一次，若业务侧另建实例
* 调用 `setNextTraceId` 不会对 provider 内部真正使用的 generator 生效。
*/
var daemonIdGenerator = new DeterministicIdGenerator();
//#endregion
Object.defineProperty(exports, "daemonIdGenerator", {
	enumerable: true,
	get: function() {
		return daemonIdGenerator;
	}
});
