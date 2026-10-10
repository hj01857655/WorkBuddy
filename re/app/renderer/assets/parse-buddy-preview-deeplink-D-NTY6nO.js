import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/modules/industry/industry-preview-deeplink-store.ts
function getState() {
	const g = globalThis;
	let state = g[GLOBAL_KEY];
	if (!state) {
		state = {
			url: null,
			token: 0,
			listeners: /* @__PURE__ */ new Set()
		};
		g[GLOBAL_KEY] = state;
	}
	return state;
}
function setPendingBuddyAppDeeplinkUrl(url) {
	if (typeof url !== "string" || url.length === 0) return;
	const state = getState();
	state.url = url;
	state.token += 1;
	const snapshot = Array.from(state.listeners);
	for (const listener of snapshot) try {
		listener(url);
	} catch {}
}
function subscribePendingBuddyAppDeeplinkUrl(listener) {
	const state = getState();
	state.listeners.add(listener);
	if (state.url !== null) {
		const url = state.url;
		state.url = null;
		try {
			listener(url);
		} catch {}
	}
	return () => {
		state.listeners.delete(listener);
	};
}
var GLOBAL_KEY;
var init_industry_preview_deeplink_store = __esmMin((() => {
	GLOBAL_KEY = "__workbuddyBuddyAppDeeplinkBuffer";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/parse-buddy-preview-deeplink.ts
function parseBuddyAppDeeplink(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}
	if (parsed.protocol !== "workbuddy:" && parsed.protocol !== "workbuddy-ai:") return null;
	if (parsed.host.toLowerCase() !== "buddy") return null;
	const queryId = (parsed.searchParams.get("applicationId") ?? parsed.searchParams.get("application_id") ?? "").trim();
	const pathId = parsed.pathname.split("/").filter(Boolean)[0]?.trim() ?? "";
	const applicationId = queryId || pathId;
	if (!applicationId) return null;
	return { applicationId };
}
var init_parse_buddy_preview_deeplink = __esmMin((() => {}));
//#endregion
export { subscribePendingBuddyAppDeeplinkUrl as a, setPendingBuddyAppDeeplinkUrl as i, parseBuddyAppDeeplink as n, init_industry_preview_deeplink_store as r, init_parse_buddy_preview_deeplink as t };
