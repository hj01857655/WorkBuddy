import { mI as init_contract } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/workbuddy-app/src/adapter/security-center-event-bridge.ts
init_contract();
var LISTENER_EVENTS = [
	"audit-log-changed",
	"audit-log-query-result",
	"audit-log-export-result",
	"experimental-features-config-result",
	"experimental-features-config-save-error",
	"open-modify-backup-dir-result",
	"security-center-state-result",
	"tool-control-state-result",
	"tool-control-save-error",
	"sensitive-protection-config-save-error"
];
function formatUnknownError(error) {
	return error instanceof Error ? error.message : String(error);
}
async function dispatchState(securityCenter, context, metadata = {}) {
	try {
		context.dispatch("security-center-state-result", {
			...await securityCenter.getState(),
			...metadata
		});
	} catch (error) {
		console.error("[SecurityCenterBridge] getState failed:", error);
		context.dispatch("security-center-state-result", metadata);
	}
}
async function dispatchExperimentalFeaturesConfig(securityCenter, context) {
	try {
		context.dispatch("experimental-features-config-result", await securityCenter.getExperimentalFeaturesConfig());
	} catch (error) {
		console.error("[SecurityCenterBridge] getExperimentalFeaturesConfig failed:", error);
		context.dispatch("experimental-features-config-result", {
			deleteProtection: false,
			safeDeleteBulkThreshold: 50,
			safeDeleteRuntimeEnabled: true,
			versionControl: false
		});
	}
}
async function dispatchToolControlState(securityCenter, context) {
	try {
		const state = await securityCenter.getToolControlState();
		context.dispatch("tool-control-state-result", state);
	} catch (error) {
		console.error("[SecurityCenterBridge] getToolControlState failed:", error);
		context.dispatch("tool-control-state-result", { error: formatUnknownError(error) });
	}
}
async function updateToolControl(securityCenter, context, payload) {
	try {
		context.dispatch("tool-control-state-result", await securityCenter.updateToolControl(payload));
	} catch (error) {
		console.error("[SecurityCenterBridge] updateToolControl failed:", error);
		context.dispatch("tool-control-save-error", { message: formatUnknownError(error) });
		await dispatchToolControlState(securityCenter, context);
	}
}
async function queryAuditLog(securityCenter, context, payload = {}) {
	const requestId = typeof payload.requestId === "string" ? payload.requestId : void 0;
	const queryPayload = { ...payload };
	delete queryPayload.requestId;
	try {
		const page = await securityCenter.queryAuditLog(queryPayload);
		context.dispatch("audit-log-query-result", {
			...page,
			requestId
		});
	} catch (error) {
		console.error("[SecurityCenterBridge] queryAuditLog failed:", error);
		context.dispatch("audit-log-query-result", {
			entries: [],
			error: formatUnknownError(error),
			requestId
		});
	}
}
async function exportAuditLog(securityCenter, context) {
	try {
		const result = await securityCenter.exportAuditLog();
		context.dispatch("audit-log-export-result", result);
	} catch (error) {
		console.error("[SecurityCenterBridge] exportAuditLog failed:", error);
		context.dispatch("audit-log-export-result", {
			status: "failed",
			message: formatUnknownError(error)
		});
	}
}
async function runAndRefreshState(securityCenter, context, action, operation, metadata) {
	try {
		await operation();
		context.dispatch("audit-log-changed", {});
		await dispatchState(securityCenter, context, metadata);
	} catch (error) {
		console.error(`[SecurityCenterBridge] ${action} failed:`, error);
		await dispatchState(securityCenter, context, metadata);
	}
}
async function saveSensitiveProtectionEnabled(securityCenter, context, payload) {
	try {
		await securityCenter.saveSensitiveProtectionEnabled(payload);
		context.dispatch("audit-log-changed", {});
	} catch (error) {
		console.error("[SecurityCenterBridge] saveSensitiveProtectionEnabled failed:", error);
		context.dispatch("sensitive-protection-config-save-error", { message: formatUnknownError(error) });
	}
	await dispatchState(securityCenter, context);
}
function installSecurityCenterEventBridge(adapter, securityCenter) {
	if (!securityCenter) return () => {};
	let stateOperationQueue = Promise.resolve();
	const enqueueStateOperation = (operation) => {
		const queued = stateOperationQueue.then(operation);
		stateOperationQueue = queued.catch(() => void 0);
		return queued;
	};
	return adapter.registerAdapterEventBridge({
		listenerEvents: LISTENER_EVENTS,
		handlers: {
			"get-tool-control-state": (_data, context) => {
				enqueueStateOperation(() => dispatchToolControlState(securityCenter, context)).catch((error) => {
					console.error("[SecurityCenterBridge] get-tool-control-state failed:", error);
				});
			},
			"update-tool-control": (data, context) => {
				enqueueStateOperation(() => updateToolControl(securityCenter, context, data)).catch((error) => {
					console.error("[SecurityCenterBridge] update-tool-control failed:", error);
				});
			},
			"get-security-center-state": (_data, context) => {
				enqueueStateOperation(() => dispatchState(securityCenter, context)).catch((error) => {
					console.error("[SecurityCenterBridge] get-security-center-state failed:", error);
				});
			},
			"query-audit-log": (data, context) => {
				queryAuditLog(securityCenter, context, data ?? {}).catch((error) => {
					console.error("[SecurityCenterBridge] query-audit-log failed:", error);
				});
			},
			"save-sandbox-rules-config": (data, context) => {
				const raw = data ?? {};
				const revision = typeof raw.orderedRulesRevision === "number" && Number.isInteger(raw.orderedRulesRevision) && raw.orderedRulesRevision >= 0 ? raw.orderedRulesRevision : void 0;
				const { orderedRulesRevision: _stripped, ...savePayload } = raw;
				enqueueStateOperation(() => runAndRefreshState(securityCenter, context, "saveSandboxRulesConfig", () => securityCenter.saveSandboxRulesConfig(savePayload), revision === void 0 ? void 0 : { orderedRulesRevision: revision })).catch((error) => {
					console.error("[SecurityCenterBridge] save-sandbox-rules-config failed:", error);
				});
			},
			"clear-audit-log": (_data, context) => {
				enqueueStateOperation(() => runAndRefreshState(securityCenter, context, "clearAuditLog", () => securityCenter.clearAuditLog())).catch((error) => {
					console.error("[SecurityCenterBridge] clear-audit-log failed:", error);
				});
			},
			"export-audit-log": (_data, context) => {
				exportAuditLog(securityCenter, context).catch((error) => {
					console.error("[SecurityCenterBridge] export-audit-log failed:", error);
				});
			},
			"save-experimental-features-config": (data, context) => {
				securityCenter.saveExperimentalFeaturesConfig(data).then(() => dispatchExperimentalFeaturesConfig(securityCenter, context)).catch((error) => {
					console.error("[SecurityCenterBridge] saveExperimentalFeaturesConfig failed:", error);
					context.dispatch("experimental-features-config-save-error", { message: error instanceof Error ? error.message : String(error) });
					return dispatchExperimentalFeaturesConfig(securityCenter, context);
				});
			},
			"get-experimental-features-config": (_data, context) => {
				dispatchExperimentalFeaturesConfig(securityCenter, context).catch((error) => {
					console.error("[SecurityCenterBridge] get-experimental-features-config failed:", error);
				});
			},
			"save-sandbox-safety": (data, context) => {
				enqueueStateOperation(() => runAndRefreshState(securityCenter, context, "saveSandboxSafetyEnabled", () => securityCenter.saveSandboxSafetyEnabled(data))).catch((error) => {
					console.error("[SecurityCenterBridge] save-sandbox-safety failed:", error);
				});
			},
			"save-sensitive-protection-enabled": (data, context) => {
				enqueueStateOperation(() => saveSensitiveProtectionEnabled(securityCenter, context, data)).catch((error) => {
					console.error("[SecurityCenterBridge] save-sensitive-protection-enabled failed:", error);
				});
			},
			"open-modify-backup-dir": (data, context) => {
				const payload = data;
				securityCenter.openModifyBackupDir(payload?.sessionId).then((result) => {
					context.dispatch("open-modify-backup-dir-result", result);
				}).catch((error) => {
					console.error("[SecurityCenterBridge] open-modify-backup-dir failed:", error);
					context.dispatch("open-modify-backup-dir-result", {
						success: false,
						error: formatUnknownError(error)
					});
				});
			}
		}
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/settings-conversation-sync.ts
var SETTINGS_WINDOW_CONVERSATION_CHANNEL = "settings:current-conversation";
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isSafeConversationId(value) {
	return typeof value === "string" && value.length > 0 && value !== "." && value !== ".." && !value.includes("/") && !value.includes("\\") && !value.includes("\0");
}
/**
* 主窗口切会话后推给已打开设置窗的 payload。
* 缺省 / null 表示主窗口已经离开会话，设置页应清掉上次的 ID。
* 非法 ID 返回 undefined，调用方应忽略，避免把当前值写成脏数据。
*/
function readSettingsConversationSync(payload) {
	if (!isRecord(payload) || !Object.keys(payload).every((key) => key === "currentConversationId")) return;
	const value = payload.currentConversationId;
	if (value === void 0 || value === null) return {};
	if (!isSafeConversationId(value)) return;
	return { currentConversationId: value };
}
function isMissingSettingsWindowError(error) {
	if (typeof error !== "object" || error === null) return false;
	if (error.code === "NOT_FOUND") return true;
	const message = error.message;
	return typeof message === "string" && (message.includes("target not found") || message.includes("目标窗口不存在"));
}
//#endregion
export { installSecurityCenterEventBridge as i, isMissingSettingsWindowError as n, readSettingsConversationSync as r, SETTINGS_WINDOW_CONVERSATION_CHANNEL as t };
