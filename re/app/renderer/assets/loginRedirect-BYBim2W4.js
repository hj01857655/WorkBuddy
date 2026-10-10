import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/components/share-preview/components/loginRedirect.ts
var PREVIEW_LOGIN_REDIRECT_KEY, savePathForLoginRedirect;
var init_loginRedirect = __esmMin((() => {
	PREVIEW_LOGIN_REDIRECT_KEY = "cb_preview_login_redirect";
	savePathForLoginRedirect = () => {
		try {
			const currentPath = window.location.pathname + window.location.search;
			sessionStorage.setItem(PREVIEW_LOGIN_REDIRECT_KEY, currentPath);
			console.log("[Preview] Saved path for login redirect:", currentPath);
		} catch (e) {
			console.warn("[Preview] Failed to save redirect path:", e);
		}
	};
}));
//#endregion
export { savePathForLoginRedirect as n, init_loginRedirect as t };
