//#region ../../packages/workbuddy-core/src/shared/buddy-telemetry-context.ts
/** 通用版（未切换到任何 Buddy 应用）：两个字段都是空串，而不是缺省 */
var GENERAL_BUDDY_TELEMETRY_CONTEXT = Object.freeze({
	buddyId: "",
	buddyName: ""
});
var current = GENERAL_BUDDY_TELEMETRY_CONTEXT;
function normalizeField(value) {
	return typeof value === "string" ? value.trim() : "";
}
/**
* 写入当前 Buddy 应用归属。传入非法值时回落通用版。
*
* 没有 `buddyId` 就不算切到了某个 Buddy，`buddyName` 一并丢弃 —— 避免落出
* 「无 id 有 name」这种 BI 侧无法归因的行。
*/
function setBuddyTelemetryContext(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) {
		current = GENERAL_BUDDY_TELEMETRY_CONTEXT;
		return;
	}
	const raw = input;
	const buddyId = normalizeField(raw.buddyId);
	current = buddyId ? {
		buddyId,
		buddyName: normalizeField(raw.buddyName)
	} : GENERAL_BUDDY_TELEMETRY_CONTEXT;
}
/** 同步读取当前 Buddy 应用归属。零 I/O，可在 hot path 调用。 */
function getBuddyTelemetryContext() {
	return current;
}
//#endregion
Object.defineProperty(exports, "getBuddyTelemetryContext", {
	enumerable: true,
	get: function() {
		return getBuddyTelemetryContext;
	}
});
Object.defineProperty(exports, "setBuddyTelemetryContext", {
	enumerable: true,
	get: function() {
		return setBuddyTelemetryContext;
	}
});
