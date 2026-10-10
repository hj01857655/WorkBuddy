//#region ../../packages/workbuddy-server/src/shared/traceparent.ts
var TRACEPARENT_VERSION = "00";
var TRACE_ID_RE = /^[0-9a-f]{32}$/;
var SPAN_ID_RE = /^[0-9a-f]{16}$/;
var INVALID_TRACE_ID = "00000000000000000000000000000000";
var INVALID_SPAN_ID = "0000000000000000";
/**
* 校验 W3C trace-id：32 位小写 hex，且非全零。
*/
function isValidW3CTraceId(value) {
	return typeof value === "string" && TRACE_ID_RE.test(value) && value !== INVALID_TRACE_ID;
}
/**
* 把 traceId + spanId 序列化成 W3C traceparent 字符串。
* 传入不合法值时返回 undefined（调用方按"无 trace context"处理，不注入 header）。
*/
function formatTraceparent(fields) {
	const { traceId, spanId, flags = 1 } = fields;
	if (!TRACE_ID_RE.test(traceId) || traceId === INVALID_TRACE_ID) return;
	if (!SPAN_ID_RE.test(spanId) || spanId === INVALID_SPAN_ID) return;
	return `${TRACEPARENT_VERSION}-${traceId}-${spanId}-${(flags & 255).toString(16).padStart(2, "0")}`;
}
/**
* 解析 traceparent 字符串。格式非法时返回 undefined。
* 仅接受 version 00（当前唯一稳定版本）；其他 version 前缀视为未知格式。
*/
function parseTraceparent(traceparent) {
	if (typeof traceparent !== "string" || traceparent.length === 0) return;
	const parts = traceparent.split("-");
	if (parts.length !== 4) return;
	const [version, traceId, spanId, flagsHex] = parts;
	if (version !== TRACEPARENT_VERSION) return;
	if (!TRACE_ID_RE.test(traceId) || traceId === INVALID_TRACE_ID) return;
	if (!SPAN_ID_RE.test(spanId) || spanId === INVALID_SPAN_ID) return;
	if (!/^[0-9a-f]{2}$/.test(flagsHex)) return;
	return {
		traceId,
		spanId,
		flags: parseInt(flagsHex, 16)
	};
}
//#endregion
Object.defineProperty(exports, "formatTraceparent", {
	enumerable: true,
	get: function() {
		return formatTraceparent;
	}
});
Object.defineProperty(exports, "isValidW3CTraceId", {
	enumerable: true,
	get: function() {
		return isValidW3CTraceId;
	}
});
Object.defineProperty(exports, "parseTraceparent", {
	enumerable: true,
	get: function() {
		return parseTraceparent;
	}
});
