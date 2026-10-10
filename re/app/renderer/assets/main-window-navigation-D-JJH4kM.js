import { ED as stageTrustedOfficeReturnIntent, GU as deepLinkConversationOpen$, NG as resetRouterToHome, RU as init_input_intents, dD as init_internal_deeplink_dispatch, mG as init_router, uD as dispatchInternalDeeplink, wD as init_office_return_intent } from "./ui-docs-viewer-Bo02yf1Q.js";
import { s as triggerCheckForUpdates, t as init_update_toast } from "./update-toast-CQ2GsaP4.js";
import { n as switchAwayFromDisconnectedApp, t as init_switch_away_from_disconnected_app } from "./switch-away-from-disconnected-app-nibTA6gc.js";
import { t as navigateMainWindow } from "./main-window-navigator-Bs0zgdJ1.js";
//#region ../../packages/workbuddy-app/src/desktop/main-window-navigation.ts
init_update_toast();
init_switch_away_from_disconnected_app();
init_input_intents();
init_internal_deeplink_dispatch();
init_office_return_intent();
init_router();
var MAIN_WINDOW_NAVIGATION_EVENT = "workbuddy:main-window-navigation";
/**
* 独立窗口请求主窗口执行退出登录。
*
* 退出的全屏 loading 必须显示在主窗口：独立窗口有各自的 AuthProvider 与 overlay 单例，
* 由它自己执行登出会把 loading 挂到自己的 body 上，而该窗口在账号清空时又会立刻自关，
* 导致遮罩随窗口一起消失、主窗口全程无反馈。
*/
var MAIN_WINDOW_LOGOUT_REQUEST_EVENT = "workbuddy:request-logout";
function readStringField(payload, key) {
	const value = payload?.[key];
	return typeof value === "string" && value ? value : void 0;
}
function resolveTrustedOfficeReturn(payload, delivery) {
	const returnConversationId = readStringField(payload, "returnConversationId");
	const returnConversationOrigin = readStringField(payload, "returnConversationOrigin");
	const returnConversationCreated = payload?.returnConversationCreated;
	const returnWindowId = delivery?.sourceWindowId;
	if (returnConversationId && returnConversationOrigin === "office" && typeof returnConversationCreated === "boolean" && returnWindowId?.startsWith("window:office:")) return {
		returnConversationId,
		returnConversationOrigin: "office",
		returnWindowId,
		returnConversationCreated
	};
	return null;
}
function appendTrustedOfficeReturnToken(params, payload, delivery) {
	const officeReturn = resolveTrustedOfficeReturn(payload, delivery);
	if (officeReturn) params.set("officeReturnToken", stageTrustedOfficeReturnIntent(officeReturn));
}
function isSettingsHash(hash) {
	return /^#settings(?:\/[a-zA-Z][\w-]*(?:\/[\w-]+)?)?$/.test(hash);
}
function applyMainWindowHash(hash) {
	if (!isSettingsHash(hash)) return;
	if (window.location.hash !== hash) window.location.hash = hash;
	else window.dispatchEvent(new HashChangeEvent("hashchange"));
}
/**
* 主窗 route 处理表。
*
* 独立窗只投递业务 route，具体落到主窗哪个 hash / deeplink / DOM 事件由这里决定。
* 新增窗口不必改本文件的分发逻辑：宿主侧调 `registerMainWindowRoute` 追加一条即可，
* 未注册的 route 仍会以 `MAIN_WINDOW_NAVIGATION_EVENT` 交给主窗 adapter 兜底。
*/
var routeHandlers = /* @__PURE__ */ new Map([
	["check-for-updates", () => {
		triggerCheckForUpdates();
	}],
	["help-feedback", () => {
		window.dispatchEvent(new CustomEvent("workbuddy:open-help-feedback"));
	}],
	["logout", () => {
		window.dispatchEvent(new CustomEvent(MAIN_WINDOW_LOGOUT_REQUEST_EVENT));
	}],
	["settings", (payload) => {
		applyMainWindowHash(`#settings/${readStringField(payload, "tab") ?? "settings"}`);
	}],
	["home", () => {
		resetRouterToHome();
	}],
	["conversation", (payload) => {
		const conversationId = readStringField(payload, "conversationId");
		if (!conversationId) return;
		const sidebarUrl = readStringField(payload, "sidebarUrl");
		if (sidebarUrl) {
			const sidebarFilePath = readStringField(payload, "sidebarFilePath");
			const directHit = dispatchInternalDeeplink(`workbuddy://chat/${conversationId}`);
			deepLinkConversationOpen$.next({
				taskId: conversationId,
				sidebarUrl,
				...sidebarFilePath ? { sidebarFilePath } : {},
				...directHit ? { _skipShellNavigation: true } : {}
			});
			return;
		}
		dispatchInternalDeeplink(`workbuddy://chat/${conversationId}`);
	}],
	["genie", () => {
		dispatchInternalDeeplink("workbuddy://genie");
	}],
	["experts", (payload, delivery) => {
		const params = new URLSearchParams();
		const categoryId = readStringField(payload, "categoryId");
		const expertId = readStringField(payload, "expertId");
		if (categoryId) params.set("categoryId", categoryId);
		if (expertId) params.set("expertId", expertId);
		appendTrustedOfficeReturnToken(params, payload, delivery);
		const query = params.toString();
		dispatchInternalDeeplink(`workbuddy://experts${query ? `?${query}` : ""}`);
	}],
	["skills", (payload, delivery) => {
		const params = new URLSearchParams();
		const tab = readStringField(payload, "tab") ?? "installed";
		params.set("tab", tab);
		appendTrustedOfficeReturnToken(params, payload, delivery);
		dispatchInternalDeeplink(`workbuddy://skills?${params.toString()}`);
	}],
	["connectors", (payload, delivery) => {
		const params = new URLSearchParams();
		appendTrustedOfficeReturnToken(params, payload, delivery);
		const query = params.toString();
		dispatchInternalDeeplink(`workbuddy://connectors${query ? `?${query}` : ""}`);
	}],
	["space-library", (payload) => {
		const nodeId = readStringField(payload, "nodeId");
		window.dispatchEvent(new CustomEvent("workbuddy:open-in-space-library", { detail: nodeId ? { nodeId } : {} }));
	}],
	["exit-buddy-app", (payload) => {
		const applicationId = readStringField(payload, "applicationId");
		if (!applicationId) return;
		if (switchAwayFromDisconnectedApp(applicationId)) dispatchInternalDeeplink("workbuddy://home");
	}]
]);
function applyMainWindowNavigation(request, delivery) {
	const handler = routeHandlers.get(request.route);
	if (handler) {
		if (request.route === "experts" || request.route === "skills" || request.route === "connectors") handler(request.payload, delivery);
		else handler(request.payload);
		return;
	}
	window.dispatchEvent(new CustomEvent(MAIN_WINDOW_NAVIGATION_EVENT, { detail: request }));
}
function isNavigationDelivery(event) {
	if (event.kind !== "navigate" || !event.payload || typeof event.payload !== "object") return false;
	return typeof event.payload.route === "string";
}
/**
* 主窗口通过可靠 delivery inbox 消费跨窗口导航。
* 未 ready 和刷新期间的消息由 Desktop 主进程暂存，不再使用 localStorage。
*/
function installMainWindowNavigationListener(windows) {
	return windows.onMessage((event) => {
		if (isNavigationDelivery(event)) {
			applyMainWindowNavigation(event.payload, event);
			return true;
		}
		return false;
	});
}
async function openMainWindowCheckForUpdates(windows) {
	await navigateMainWindow({ route: "check-for-updates" }, windows);
}
//#endregion
export { installMainWindowNavigationListener as n, openMainWindowCheckForUpdates as r, MAIN_WINDOW_LOGOUT_REQUEST_EVENT as t };
