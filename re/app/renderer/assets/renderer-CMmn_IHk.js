import { Jn as init_url_guards, N1 as onLocaleChange, Xn as isTencentDocsUrl, c4 as addThemeListener, d4 as init_theme, j1 as init_i18n, k1 as getLocale, l4 as getCurrentTheme } from "./ui-docs-viewer-Bo02yf1Q.js";
import { n as import_preview_runtime } from "./local-docs-facade-Cr4Rvoow.js";
//#region ../../packages/workbuddy-app/src/desktop/wechat-share-action-config.ts
var DEFAULT_SHARE_LINK_TEXT = "和WorkBuddy的对话";
/**
* 微信 OpenSDK shareLink 超时（毫秒）。
*
* 统一 10s，不再按 isGenie 分档（原先非 Genie 是 5s）。原因：微信「已安装但未启动」时
* renderer 侧门禁会用 `weixin://` 把它唤起并继续本次分享，此时用户还要走冷启动 + 登录，
* 5s 必然超时并落二维码兜底，白费一次唤起。10s 与原 Genie 分享的上限一致，不引入新数量级。
*/
var SHARE_LINK_TIMEOUT_MS = 1e4;
function resolveWechatShareActionConfig(params) {
	return {
		shareLinkTxt: !!params.isGenie ? params.txt || DEFAULT_SHARE_LINK_TEXT : params.h5Title || DEFAULT_SHARE_LINK_TEXT,
		timeout: SHARE_LINK_TIMEOUT_MS
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/wechat-share-route.ts
/**
* Returns the Mini Program path when this share can use a Mini Program card.
* Undefined preserves the existing H5 link fallback.
*/
function resolveWechatShareMiniProgramPath(params, config) {
	const scene = params.scene ?? params.source;
	const shareCode = params.shareCode?.trim();
	if (scene !== "chat" || !config.mpUserName) return;
	if (shareCode) return config.mpPathTemplate.replace("{bizType}", encodeURIComponent(params.bizType ?? "artifact")).replace("{shareCode}", encodeURIComponent(shareCode));
	if (params.isGenie && params.url) return config.geniePathTemplate.replace("{shareUrl}", encodeURIComponent(params.url));
	if (params.bizType && params.shareUrl && params.shareTitle) return `pages/share/webview/index?shareUrl=${encodeURIComponent(params.shareUrl)}&shareTitle=${encodeURIComponent(params.shareTitle)}`;
}
//#endregion
//#region ../../packages/workbuddy-app/src/tencent-docs/renderer/install-webview-preload-url.ts
async function installTencentDocsWebviewPreloadUrl(logger) {
	if (typeof window === "undefined") return;
	const globals = window;
	const getUrl = globals.__getHostWebviewPreloadUrl;
	if (typeof getUrl !== "function") return;
	try {
		const url = await getUrl();
		if (typeof url === "string" && url.startsWith("file://")) {
			globals.__hostWebviewPreloadUrl = url;
			logger.info("[TencentDocs] webview preload url ready", { url });
		} else logger.warn("[TencentDocs] webview preload url unavailable, mqq bridge will not be injected");
	} catch (error) {
		logger.warn("[TencentDocs] failed to install webview preload url", error);
	}
	const getPreviewUrl = globals.__getHostTencentDocsPreviewPreloadUrl;
	if (typeof getPreviewUrl !== "function") return;
	try {
		const previewUrl = await getPreviewUrl();
		if (typeof previewUrl === "string" && previewUrl.startsWith("file://")) {
			globals.__hostTencentDocsPreviewPreloadUrl = previewUrl;
			logger.info("[TencentDocs] preview preload url ready", { url: previewUrl });
		} else logger.warn("[TencentDocs] preview preload url unavailable, enterprise free-login navigation may fail");
	} catch (error) {
		logger.warn("[TencentDocs] failed to install preview preload url", error);
	}
}
//#endregion
//#region ../../packages/workbuddy-app/src/tencent-docs/renderer/install-theme-bridge.ts
init_theme();
function normalizeTheme(theme) {
	return theme === "dark" ? "dark" : "light";
}
function installTencentDocsThemeBridge(logger) {
	if (typeof window === "undefined") return () => void 0;
	const setter = window.__setTencentDocsTheme;
	if (typeof setter !== "function") {
		logger.info("[TencentDocsThemeBridge] preload setter unavailable, skip");
		return () => void 0;
	}
	const push = (theme) => {
		setter(normalizeTheme(theme)).catch((error) => {
			logger.warn("[TencentDocsThemeBridge] setTencentDocsTheme failed", error);
		});
	};
	push(getCurrentTheme().theme);
	const dispose = addThemeListener((config) => push(config.theme));
	logger.info("[TencentDocsThemeBridge] installed");
	return dispose;
}
//#endregion
//#region ../../packages/workbuddy-app/src/tencent-docs/renderer/install-language-bridge.ts
init_i18n();
init_url_guards();
function createDisposer(dispose, ready) {
	return Object.assign(dispose, { ready });
}
function normalizeLanguage(internalLocale) {
	const normalized = internalLocale.toLowerCase();
	if (normalized.startsWith("pt") || normalized === "id" || normalized.startsWith("id-") || normalized.startsWith("id_") || normalized === "in" || normalized.startsWith("in-") || normalized.startsWith("in_")) return "en-US";
	return (0, import_preview_runtime.resolveTencentDocsPreviewLocale)(internalLocale) === "en-US" ? "en-US" : "zh-CN";
}
function reloadLocalPreviewIframes() {
	for (const iframe of Array.from(document.querySelectorAll("iframe"))) if ((0, import_preview_runtime.isTencentDocsLocalSdkPreviewUrl)(iframe.src)) {
		const src = iframe.src;
		iframe.src = "";
		iframe.src = src;
	}
}
function reloadTencentDocsWebviews() {
	for (const webview of Array.from(document.querySelectorAll("webview"))) if (isTencentDocsUrl(webview.src)) webview.reload();
}
function installTencentDocsLanguageBridge(logger) {
	if (typeof window === "undefined") return createDisposer(() => void 0, Promise.resolve({ ok: false }));
	const setter = window.__setTencentDocsLanguage;
	if (typeof setter !== "function") {
		logger.info("[TencentDocsLanguageBridge] preload setter unavailable, skip");
		return createDisposer(() => void 0, Promise.resolve({ ok: false }));
	}
	const push = (internalLocale) => setter(normalizeLanguage(internalLocale)).catch((error) => {
		logger.warn("[TencentDocsLanguageBridge] setTencentDocsLanguage failed", error);
		return { ok: false };
	});
	const ready = push(getLocale());
	const dispose = onLocaleChange((locale) => {
		push(locale).then(() => {
			reloadLocalPreviewIframes();
			reloadTencentDocsWebviews();
		});
	});
	logger.info("[TencentDocsLanguageBridge] installed");
	return createDisposer(dispose, ready);
}
//#endregion
export { resolveWechatShareActionConfig as a, resolveWechatShareMiniProgramPath as i, installTencentDocsThemeBridge as n, installTencentDocsWebviewPreloadUrl as r, installTencentDocsLanguageBridge as t };
