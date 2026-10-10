const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./bootstrap-DeTmfKB1.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./bootstrap-independent-window-C8q-1vR7.js","./builtin-window-apps-BR1bS1dM.js","./locale-utils-TanlkH9x.js","./locale-utils-DQSZKef0.css","./appearance-runtime-eV3bJxTA.js","./desktop-sdk-setup-Bf87qV1W.js","./UserMenu-Bs05nlMA.js","./split-action-button-DcQLraVx.js","./update-toast-CQ2GsaP4.js","./update-toast-ClznF5Ep.css","./UserMenu-E5et-o_d.css","./adapters-OyJgXMG7.js","./acp-message-accumulator-CupTn1Ga.js","./read-allowed-dirs-DYVsN0s1.js","./link-handler-DFiXCRGF.js","./use-tdoc-check-auth-gate-CPJZSL92.js","./utils-C65Aew35.js","./use-tdoc-check-auth-gate-CQmTBgUF.css","./cloud-file-constants-C-3tulP1.js","./store-B9VMId-K.js","./folder-picker-modal-C_2cTFqD.js","./api-BdQlPhCp.js","./entry-service-CKVris1X.js","./use-upload-queue-DwfNivwj.js","./space-utils-DG6Tz1-K.js","./oneid-activation-guide-DuXXdo_H.js","./folder-picker-modal-BGu7mpm9.css","./lexiang-content-picker-Bo09zMCt.js","./lexiang-content-picker-WcRUMZ2k.css","./network-check-BoLxsxGF.js","./network-check-BY5uyEhW.css","./account-Cr0cOcaM.js","./prompt-failure-banner-events-D8rg39W1.js","./codebuddy-icon-provider-BgrOq92k.js","./context-BN2Z33cf.js","./use-connector-actions-cuKdFVYS.js","./prompt-failure-banner-events-BrIFsSfq.css","./connector-device-code-modal-Cjn-lIby.js","./connector-device-code-modal-D_6cG_6z.css","./app-shell-DgGkIrlT.js","./main-content-core-C2FdJiZx.js","./upload-utils-BaSYFvjN.js","./workspace-preparing-DMQHWfrK.js","./workspace-preparing-OwGXqoc6.css","./use-poi-map-feature-z4YCXlLm.js","./wechat-chat-history-input-intent-bridge-Dr4s6Mz4.js","./branch-switch-error-zqNku5uL.js","./branch-switch-error-BCkKN1-e.css","./use-lexiang-add-to-task-Bzd_j_bw.js","./main-content-core-Biedly4T.css","./use-home-input-external-effects-DM-agAcm.js","./desktop-sdk-setup-BZcgWjpj.css","./main-window-navigator-Bs0zgdJ1.js","./main-window-navigation-D-JJH4kM.js","./switch-away-from-disconnected-app-nibTA6gc.js","./independent-window-qbsk1YYc.js","./bootstrap-D5fUdDvz.css","./bootstrap-z9wuSwjP.js","./bootstrap-DS0kLPmI.js","./bootstrap-DRr0-j9L.js","./bootstrap-D7qmlJvj.js","./html-editor--LQ95SK5.js","./StatusPlaceholder-XN-A3Gzo.js","./StatusPlaceholder-Ds6ACyNM.css","./html-editor-D2OtyYI3.css","./library-upload-cache-controller-eeFl-XMW.js","./local-docs-facade-Cr4Rvoow.js","./renderer-CMmn_IHk.js","./bootstrap-UMaq49n-.css","./bootstrap-H7RCGz-4.js","./bootstrap-CzSiUSH1.css"])))=>i.map(i=>d[i]);
import { Glt as require_buffer } from "./ui-docs-viewer-Bo02yf1Q.js";
import { t as builtinWindowApps } from "./builtin-window-apps-BR1bS1dM.js";
import { Ov as __vitePreload, kv as init_preload_helper } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/workbuddy-app/src/polyfills/node-globals.ts
var import_buffer = require_buffer();
if (typeof globalThis !== "undefined") {
	const g = globalThis;
	if (!g.process) g.process = {
		env: { NODE_ENV: "production" },
		cwd: () => "/",
		platform: typeof navigator !== "undefined" && navigator.userAgent.indexOf("Windows") >= 0 ? "win32" : "linux",
		version: "",
		versions: {},
		nextTick: (fn, ...args) => {
			setTimeout(() => fn(...args), 0);
		}
	};
	if (!g.Buffer) g.Buffer = import_buffer.Buffer;
	if (!g.global) g.global = globalThis;
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/renderer-entry-registry.ts
/**
* renderer 入口 ↔ Manifest 的启动期契约断言。失败时进程不该继续启动，
* 文案只给开发者和 CI 看，不进入用户 UI，因此不走 WBError / i18n。
* 若这些错误将来要展示给用户，再迁到错误码表。
*/
function throwRendererEntryError(message) {
	throw new Error(message);
}
function getWindowAppBootstrapPath(rendererEntry) {
	return `./window-apps/${rendererEntry}/bootstrap.tsx`;
}
/** 该条目在当前运行态是否可用。 */
function isWindowAppAvailable(definition, isDev) {
	return isDev || !definition.devOnly;
}
function assertWindowAppRendererEntries(manifest, loaders, options = {}) {
	const isDev = options.isDev ?? false;
	const expectedPaths = /* @__PURE__ */ new Set();
	const rendererEntries = /* @__PURE__ */ new Set();
	/** devOnly 条目在 prod 下的 bootstrap 路径 —— 允许存在但不强制注册。 */
	const tolerated = /* @__PURE__ */ new Set();
	for (const [appId, definition] of Object.entries(manifest)) {
		if (rendererEntries.has(definition.rendererEntry)) throwRendererEntryError(`WindowApp "${appId}" 重复使用 rendererEntry "${definition.rendererEntry}"`);
		rendererEntries.add(definition.rendererEntry);
		const path = getWindowAppBootstrapPath(definition.rendererEntry);
		if (!isWindowAppAvailable(definition, isDev)) {
			tolerated.add(path);
			continue;
		}
		expectedPaths.add(path);
		if (!loaders[path]) throwRendererEntryError(`WindowApp "${appId}" 缺少约定入口: ${path}`);
	}
	for (const path of Object.keys(loaders)) if (!expectedPaths.has(path) && !tolerated.has(path)) throwRendererEntryError(`发现未在 Manifest 注册的 WindowApp 入口: ${path}`);
}
function getWindowAppBootstrapLoader(appId, manifest, loaders, options = {}) {
	const definition = manifest[appId];
	if (!definition) throwRendererEntryError(`未注册的 WindowApp: ${appId}`);
	if (!isWindowAppAvailable(definition, options.isDev ?? false)) throwRendererEntryError(`WindowApp "${appId}" 仅开发态可用`);
	const path = getWindowAppBootstrapPath(definition.rendererEntry);
	const loader = loaders[path];
	if (!loader) throwRendererEntryError(`WindowApp "${appId}" 缺少约定入口: ${path}`);
	return loader;
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/index.ts
var WINDOW_APP_CONTENT_READY_CHANNEL = "window-app:content-ready";
//#endregion
//#region ../../packages/workbuddy-app/src/renderer-entry.tsx
init_preload_helper();
var windowAppLoaders = /* #__PURE__ */ Object.assign({
	"./window-apps/demo/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-DeTmfKB1.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url),
	"./window-apps/extension-contribution/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-z9wuSwjP.js"), __vite__mapDeps([64,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,62]), import.meta.url),
	"./window-apps/global-search/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-DS0kLPmI.js"), __vite__mapDeps([65,1,7,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,62]), import.meta.url),
	"./window-apps/main/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-DRr0-j9L.js"), __vite__mapDeps([66,3,1,4]), import.meta.url),
	"./window-apps/office/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-D7qmlJvj.js").then((n) => n.t), __vite__mapDeps([67,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,68,69,70,71,72,73,59,74,75]), import.meta.url),
	"./window-apps/settings/bootstrap.tsx": () => __vitePreload(() => import("./bootstrap-H7RCGz-4.js").then((n) => n.t), __vite__mapDeps([76,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,77]), import.meta.url)
});
function resolveWindowAppId() {
	const query = new URLSearchParams(window.location.search);
	return query.get("windowAppId") ?? query.get("windowKind") ?? "main";
}
function showBootstrapError(error) {
	console.error("[WindowApp] bootstrap failed", error);
	document.getElementById("skeleton-root")?.remove();
	const root = document.getElementById("root");
	if (root) {
		root.textContent = "窗口加载失败，请关闭后重试。";
		root.setAttribute("role", "alert");
	}
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			(window.workbuddyDesktop?.ipcRenderer)?.send(WINDOW_APP_CONTENT_READY_CHANNEL);
		});
	});
}
try {
	assertWindowAppRendererEntries(builtinWindowApps, windowAppLoaders);
	getWindowAppBootstrapLoader(resolveWindowAppId(), builtinWindowApps, windowAppLoaders)().catch(showBootstrapError);
} catch (error) {
	showBootstrapError(error);
}
//#endregion
export { WINDOW_APP_CONTENT_READY_CHANNEL as t };
