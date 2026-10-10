import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/utils/acp-reconnect-retry.ts
/**
* 本机网络是否明确离线（Chromium 下 fetch 失败伴随 net::ERR_INTERNET_DISCONNECTED）。
* 断网期间重连不可能成功：每次 attempt 都要烧满 transport/initialize 超时
* （云助理断链场景实测单轮 bootstrap 30s + fallback 30s = 60s × 3 轮），
* 不如直接把错误抛给上层终态化，等网络恢复后由用户/上层重试。
*
* 注意：只信 navigator.onLine === false 这一个强信号；不做 "Failed to fetch"
* 文本匹配 —— 该文本无法区分断网与服务端拒连/CORS，误杀面大（见上方白名单原则）。
*/
function isHostOffline() {
	return typeof navigator !== "undefined" && navigator.onLine === false;
}
function getAcpErrorMessage(error) {
	if (error instanceof Error) return error.message;
	if (error && typeof error === "object") {
		const record = error;
		const message = record.message ?? record.msg ?? record.error;
		if (typeof message === "string") return message;
	}
	return String(error);
}
function isAcpConnectionClosedError(error) {
	const message = getAcpErrorMessage(error).toLowerCase();
	if (!message) return false;
	return ACP_CLOSED_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}
function waitForAcpReconnectRetry(attempt) {
	return new Promise((resolve) => setTimeout(resolve, ACP_CONNECTION_RETRY_DELAY_MS * attempt));
}
async function runAcpConnectionRetry(operation, options) {
	const maxAttempts = options.maxAttempts ?? 3;
	const shouldRetry = options.shouldRetry ?? isAcpConnectionClosedError;
	const waitForRetry = options.waitForRetry ?? waitForAcpReconnectRetry;
	let lastError;
	for (let attempt = 1; attempt <= maxAttempts; attempt += 1) try {
		return await operation(attempt);
	} catch (error) {
		lastError = error;
		const offlineShortCircuit = isHostOffline();
		const willRetry = !offlineShortCircuit && shouldRetry(error) && attempt < maxAttempts;
		console.warn("[acp-retry][failed]", {
			source: options.source,
			attempt,
			willRetry,
			offline: offlineShortCircuit,
			error: getAcpErrorMessage(error)
		});
		try {
			options.onAttemptFailed?.({
				attempt,
				maxAttempts,
				willRetry,
				error
			});
		} catch (callbackErr) {
			console.warn("[acp-retry][onAttemptFailed][threw]", callbackErr);
		}
		if (!willRetry) throw error;
		await waitForRetry(attempt);
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error(`[acp-retry] failed after ${maxAttempts} attempts`);
}
var ACP_CONNECTION_RETRY_DELAY_MS, ACP_CLOSED_ERROR_PATTERNS;
var init_acp_reconnect_retry = __esmMin((() => {
	ACP_CONNECTION_RETRY_DELAY_MS = 500;
	ACP_CLOSED_ERROR_PATTERNS = [
		"acp connection closed",
		"acp connection cancelled",
		"connection closed",
		"sse connection closed",
		"sse stream closed",
		"sse stream disconnected",
		"eventsource closed",
		"eventsource connection closed",
		"stream disconnected",
		"stream closed",
		"signal is aborted",
		"this operation was aborted",
		"aborterror",
		"initialize timed out",
		"cannot perform '"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/stale-conversation-status-writeback.ts
/**
* 打开历史会话时，若列表仍显示运行中、ACP 历史已权威终态，返回应回写的 C4 status。
* 不满足条件返回 null（不要打接口）。
*/
function resolveStaleConversationWriteback(input) {
	if (!input.listThinksRunning || !input.acpHistoryAuthoritativelyTerminated) return null;
	return input.acpHistoryFailed ? "failed" : "completed";
}
/**
* 云助理 /v2/as/conversations 的 status 枚举与项目任务 C4 不同。
* completed → FINISHED，failed → ERROR。
*/
function toCloudAgentConversationStatus(status) {
	return status === "failed" ? "ERROR" : "FINISHED";
}
var init_stale_conversation_status_writeback = __esmMin((() => {}));
//#endregion
export { init_acp_reconnect_retry as a, getAcpErrorMessage as i, resolveStaleConversationWriteback as n, isAcpConnectionClosedError as o, toCloudAgentConversationStatus as r, runAcpConnectionRetry as s, init_stale_conversation_status_writeback as t };
