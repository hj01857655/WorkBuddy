import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A0 as init_ui_impl, A1 as initLocale, D4 as applyFontSize, F1 as setLocaleAsync, I1 as t, N1 as onLocaleChange, O4 as getSavedFontSizeLevel, T0 as init_app_core, c3 as getWb, j0 as createProductionUiRuntime, j1 as init_i18n, j4 as init_font_size, k0 as createProductionUiImpl, k1 as getLocale, k4 as initFontSizeHotkeys, o3 as init_shortcut_cross_window_sync, s3 as installShortcutCrossWindowSync, y0 as setRendererLogWriter, zZ as init_http_logger } from "./ui-docs-viewer-Bo02yf1Q.js";
import { t as builtinWindowApps } from "./builtin-window-apps-BR1bS1dM.js";
import { Ev as require_react, Tv as require_jsx_runtime, Ul as require_client } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as WINDOW_APP_CONTENT_READY_CHANNEL } from "./index-hssxxRNp.js";
import { _ as getDesktopHost, n as installDesktopNavigatorClipboardPatch, p as WINDOW_THEME_SOURCE_ATTRIBUTE, t as normalizeToWorkbuddyLocale } from "./locale-utils-TanlkH9x.js";
import { F as readCachedAppearanceCss, N as getSkinManager, P as init_skin_manager } from "./appearance-runtime-eV3bJxTA.js";
import { t as setupDesktopSDK } from "./desktop-sdk-setup-Bf87qV1W.js";
//#region ../../packages/workbuddy-app/src/window-apps/wb-windows-api.ts
/**
* 把 `wb.windows` 收窄成带内置 Manifest 类型的门面。
*
* 纯类型断言：这里只让调用方拿到 appId 与 payload 的编译期约束。
*/
function asWindowAppsApi(windows) {
	return windows;
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/independent-window-skeleton.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_client = /* @__PURE__ */ __toESM(require_client());
init_shortcut_cross_window_sync();
init_font_size();
init_ui_impl();
init_app_core();
init_i18n();
init_http_logger();
/** 骨架是否还挂着。窗口据此决定要不要自己再画一份 Loading。 */
function hasIndependentWindowSkeleton() {
	return Boolean(document.getElementById("skeleton-root"));
}
function removeSkeletonElement() {
	document.getElementById("skeleton-root")?.remove();
}
/** 手动拆骨架，供 `deferSkeletonRemoval` 的窗口在自己就绪时调用。 */
function removeIndependentWindowSkeleton(options) {
	const remove = window.__removeSkeleton;
	if (typeof remove === "function") {
		remove({ animate: options?.animate ?? false });
		return;
	}
	removeSkeletonElement();
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/window-theme.ts
init_skin_manager();
var THEME_CHANGED_EVENT = "config.preference.theme.changed";
function isTheme(value) {
	return value === "light" || value === "dark";
}
function prefersDarkScheme() {
	return typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
/**
* SDK 未就绪时的首帧主题：优先使用主进程随窗口 URL 注入的应用主题快照，
* 缺失时回退系统色；不读写浏览器存储。
* 权威偏好在 `bindAuthoritativeWindowTheme` 里走 `wb.config.theme()`。
*/
function resolveCachedWindowTheme() {
	const snapshot = new URLSearchParams(window.location.search).get("colorScheme");
	if (isTheme(snapshot)) return snapshot;
	return prefersDarkScheme() ? "dark" : "light";
}
function isIndependentWindowSkinActive() {
	return typeof document !== "undefined" && document.documentElement.hasAttribute("data-skin");
}
/**
* 皮肤基线固定浅色（与主窗 skin-manager 一致），不随系统变化：把来源同步为 light。
*
* 不写的话属性会残留上一次的明暗来源，main 据此把原生标题栏钉成深色，而窗口内容
* 已是皮肤的浅色基线 —— 独立窗的标题栏就成了唯一的「反色」区域。
*/
function applySkinBaselineThemeSource() {
	if (typeof document === "undefined") return;
	document.body?.setAttribute(WINDOW_THEME_SOURCE_ATTRIBUTE, "light");
}
/**
* 最近一次权威明暗。皮肤激活期间 DOM 写入会被跳过（#117838），偏好本身必须留下，
* 否则皮肤摘掉后无从回落。
*/
var authoritativeTheme = null;
/**
* 应用独立窗明暗，并把「来源」投影到 body（`data-theme-source`）。
*
* desktop preload 读该属性随主题同步上报 main，main 据此设置进程级
* nativeTheme.themeSource —— Windows 标准边框窗（本类窗口）的原生标题栏只认它。
* source 缺省取 theme：首帧还没有权威偏好，先按解析出的明暗钉住，hydrate 后修正。
*/
function applyIndependentWindowTheme(theme, source = theme) {
	authoritativeTheme = theme;
	if (isIndependentWindowSkinActive()) {
		applySkinBaselineThemeSource();
		return;
	}
	const root = document.documentElement;
	const body = document.body;
	const isDark = theme === "dark";
	root.setAttribute("data-theme", theme);
	root.style.colorScheme = theme;
	root.classList.toggle("dark", isDark);
	root.classList.toggle("light", !isDark);
	root.classList.toggle("cb-dark", isDark);
	root.classList.toggle("cb-light", !isDark);
	root.classList.toggle("vscode-dark", isDark);
	root.classList.toggle("vscode-light", !isDark);
	body.setAttribute("data-vscode-theme-kind", isDark ? "vscode-dark" : "vscode-light");
	body.setAttribute("data-vscode-theme-name", isDark ? "IDE Night" : "IDE Light");
	body.setAttribute(WINDOW_THEME_SOURCE_ATTRIBUTE, source);
	body.classList.toggle("dark", isDark);
	body.classList.toggle("light", !isDark);
	body.classList.toggle("cb-dark", isDark);
	body.classList.toggle("cb-light", !isDark);
	body.classList.toggle("vscode-dark", isDark);
	body.classList.toggle("vscode-light", !isDark);
}
function initializeIndependentWindowTheme() {
	const theme = resolveCachedWindowTheme();
	applyIndependentWindowTheme(theme);
	return theme;
}
/**
* 皮肤被摘掉之后把明暗重新投影回 DOM。
* `clearTheme()` 只移除 data-skin 与 light 基线，补回明暗是调用方的责任；
* 独立窗没有 AppearanceRuntimeHost，不补就会停在无明暗半态（#121674）。
*/
function resyncIndependentWindowTheme() {
	applyIndependentWindowTheme(authoritativeTheme ?? resolveCachedWindowTheme());
}
function resolveThemePreference(preference) {
	if (preference === "auto") return prefersDarkScheme() ? "dark" : "light";
	return isTheme(preference) ? preference : resolveCachedWindowTheme();
}
function bindAuthoritativeWindowTheme(wb) {
	let disposed = false;
	let followsSystem = false;
	const hydrate = async () => {
		try {
			const preference = await wb.config.theme();
			if (disposed) return;
			followsSystem = preference === "auto";
			const theme = resolveThemePreference(preference);
			applyIndependentWindowTheme(theme, followsSystem ? "auto" : theme);
		} catch {}
	};
	const offPreference = wb.on(THEME_CHANGED_EVENT, () => {
		hydrate();
	});
	const media = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
	const onSystemThemeChange = () => {
		if (followsSystem) applyIndependentWindowTheme(prefersDarkScheme() ? "dark" : "light", "auto");
	};
	media?.addEventListener("change", onSystemThemeChange);
	hydrate();
	return () => {
		disposed = true;
		offPreference();
		media?.removeEventListener("change", onSystemThemeChange);
	};
}
function setAuthoritativeWindowTheme(wb, theme) {
	applyIndependentWindowTheme(theme);
	if (isIndependentWindowSkinActive()) return Promise.resolve();
	return wb.config.setTheme(theme).then(() => void 0);
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/window-appearance.ts
/**
* 独立窗口的皮肤跟随（个性外观 · appearanceTheme）。
*
* 主窗 `<AppearanceRuntimeHost />` 负责完整编排；独立窗口是独立 renderer，不挂 Host，
* 不做薄层则另一侧切皮肤本窗口不动（#95678）。刻意不下载 zip，只消费发起端写进
* localStorage 的 CSS。
*
* 发起端是「先 push 权威值、后写 CSS 缓存」，收到广播时缓存里往往还是上一个皮肤，
* 必须按 resourceKey 校验并短重试，不能无脑读缓存或直接 `clearTheme()`（#121674）。
*/
/** wb.config 侧的皮肤偏好键名（与 appearance-cross-window-sync 保持一致）。 */
var APPEARANCE_PREF_KEY = "appearanceTheme";
var APPEARANCE_PREF_CHANGED_EVENT = `config.preference.${APPEARANCE_PREF_KEY}.changed`;
/** 命中即可直接定明暗，不必等 `theme.changed`，避免中间闪一帧旧主题。 */
var BUILTIN_THEME_KEYS = /* @__PURE__ */ new Set(["light", "dark"]);
/** 覆盖 zip 下载解压的常见耗时（实测 ~700ms）。 */
var CSS_CACHE_RETRY_DELAYS_MS = [
	100,
	250,
	600,
	1200,
	2500,
	5e3
];
var pendingResourceKey = null;
var retryTimer = null;
function cancelPendingRetry() {
	if (retryTimer !== null) {
		clearTimeout(retryTimer);
		retryTimer = null;
	}
}
function clearSkinAndRestoreTheme() {
	getSkinManager().clearTheme();
	resyncIndependentWindowTheme();
}
function applyAuthoritativeAppearance(resourceKey, attempt = 0) {
	if (typeof document === "undefined") return;
	cancelPendingRetry();
	pendingResourceKey = resourceKey;
	if (BUILTIN_THEME_KEYS.has(resourceKey)) {
		getSkinManager().clearTheme();
		applyIndependentWindowTheme(resourceKey === "dark" ? "dark" : "light");
		return;
	}
	const cached = readCachedAppearanceCss();
	if (cached?.css && cached.resourceKey === resourceKey) {
		getSkinManager().applyCachedCssSync(cached.resourceKey, cached.css);
		return;
	}
	const delay = CSS_CACHE_RETRY_DELAYS_MS[attempt];
	if (delay !== void 0) {
		retryTimer = setTimeout(() => {
			retryTimer = null;
			if (pendingResourceKey === resourceKey) applyAuthoritativeAppearance(resourceKey, attempt + 1);
		}, delay);
		return;
	}
	clearSkinAndRestoreTheme();
}
/**
* 冷启动即刻同步注入一次；应在 React mount 前调用（bootstrap 头部），确保首帧就带皮肤。
* 无缓存时 no-op —— 由 `window-theme.ts` 用系统色兜底。首帧拿不到权威值，不校验
* resourceKey；权威值由 bind 阶段校准。
*/
function initializeIndependentWindowAppearance() {
	if (typeof document === "undefined") return;
	const cached = readCachedAppearanceCss();
	if (cached?.css) getSkinManager().applyCachedCssSync(cached.resourceKey, cached.css);
}
/**
* 订阅 daemon 皮肤偏好变更并在安装时主动对齐一次。返回 dispose。
* 独立窗是后创建的 renderer，冷启动必然错过此前广播，首帧缓存可能过期。
*/
function bindAuthoritativeWindowAppearance(wb) {
	const off = wb.on(APPEARANCE_PREF_CHANGED_EVENT, (payload) => {
		if (typeof payload?.value === "string" && payload.value) applyAuthoritativeAppearance(payload.value);
	});
	Promise.resolve(wb.config.preference(APPEARANCE_PREF_KEY)).then((value) => {
		if (typeof value === "string" && value && pendingResourceKey === null) applyAuthoritativeAppearance(value);
	}).catch(() => {});
	return () => {
		cancelPendingRetry();
		pendingResourceKey = null;
		off();
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/window-font-size.ts
var import_jsx_runtime = require_jsx_runtime();
/**
* 独立窗口首帧按本地缓存档位应用字号，避免冷启动等待 daemon 时字号跳变；
* 并注册字号快捷键 ⌘±/⌘0 —— 否则独立窗口内按快捷键会落到 Electron 原生缩放
* （字体变大但档位不变），走不到我们的档位机制与跨窗口同步。
*
* 权威订阅由 `setupDesktopSDK` → `initAppCore` → `connectWorkBuddyFontSizeHost`
* 建立，这里不再重复 connect，避免同一 renderer 双挂事件监听。
*/
function initializeIndependentWindowFontSize() {
	applyFontSize(getSavedFontSizeLevel());
	initFontSizeHotkeys();
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/window-locale.ts
var LANGUAGE_CHANGED_EVENT = "config.preference.language.changed";
function applyDocumentLanguage(language) {
	if (typeof document === "undefined") return;
	document.documentElement.lang = normalizeToWorkbuddyLocale(language);
}
async function initializeIndependentWindowLocale(wb, options = {}) {
	await initLocale();
	applyDocumentLanguage(getLocale());
	let disposed = false;
	let applyingAuthoritative = false;
	const hydrate = async () => {
		try {
			const language = await wb.config.language();
			if (!disposed && typeof language === "string" && language) {
				applyingAuthoritative = true;
				try {
					await setLocaleAsync(language, false);
				} finally {
					applyingAuthoritative = false;
				}
				applyDocumentLanguage(language);
			}
		} catch {}
	};
	const off = wb.on(LANGUAGE_CHANGED_EVENT, () => {
		hydrate();
	});
	const offSelection = onLocaleChange((internalLocale) => {
		if (disposed || applyingAuthoritative) return;
		const storageLocale = normalizeToWorkbuddyLocale(internalLocale);
		applyDocumentLanguage(storageLocale);
		wb.config.setLanguage(storageLocale).catch(() => {});
	});
	if (options.waitForAuthoritative === false) hydrate().catch(() => void 0);
	else await hydrate();
	return () => {
		disposed = true;
		off();
		offSelection();
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/independent-window/bootstrap-independent-window.tsx
init_i18n();
var lastBootMarkMs = null;
function markBoot(stage) {
	const now = performance.now();
	const tMs = Math.round(now);
	const dMs = lastBootMarkMs === null ? 0 : tMs - lastBootMarkMs;
	lastBootMarkMs = tMs;
	window.__workbuddyRendererLogWrite?.({
		scope: "renderer",
		level: "info",
		message: `[WindowOpenPerf][boot] stage=${stage} tMs=${tMs} dMs=${dMs} epochMs=${Math.round(performance.timeOrigin + now)}`
	});
}
markBoot("module-eval-start");
installDesktopNavigatorClipboardPatch();
var INDEPENDENT_WINDOW_BOOTSTRAP_ERROR_CODES = {
	APP_ID_MISMATCH: "INDEPENDENT_WINDOW_APP_ID_MISMATCH",
	ROOT_NOT_FOUND: "INDEPENDENT_WINDOW_ROOT_NOT_FOUND",
	UNREGISTERED_APP: "INDEPENDENT_WINDOW_UNREGISTERED_APP"
};
function IndependentWindowLoadError({ onClose }) {
	const [, setLocaleRevision] = import_react.useState(0);
	import_react.useEffect(() => onLocaleChange(() => setLocaleRevision((revision) => revision + 1)), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		role: "alert",
		style: {
			alignItems: "center",
			display: "flex",
			flexDirection: "column",
			height: "100vh",
			justifyContent: "center",
			padding: 24
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("independentWindow.loadFailed") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("independentWindow.retryAfterClose") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				children: t("common.close")
			})
		]
	});
}
var IndependentWindowErrorBoundary = class extends import_react.Component {
	constructor(..._args) {
		super(..._args);
		this.state = { error: null };
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error) {
		console.error("[IndependentWindow] render failed", error);
	}
	render() {
		if (this.state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentWindowLoadError, { onClose: this.props.onClose });
		return this.props.children;
	}
};
function removeSkeleton() {
	const remove = window.__removeSkeleton;
	if (typeof remove === "function") {
		remove({ animate: false });
		return;
	}
	document.getElementById("skeleton-root")?.remove();
}
function IndependentWindowContentReady({ deferSkeletonRemoval }) {
	import_react.useEffect(() => {
		if (!deferSkeletonRemoval) removeSkeleton();
		getDesktopHost()?.ipcRenderer?.send(WINDOW_APP_CONTENT_READY_CHANNEL);
		markBoot("render-committed");
	}, [deferSkeletonRemoval]);
	return null;
}
function detectDesktopPlatform() {
	const userAgent = navigator.userAgent;
	const platform = navigator.platform;
	if (/Mac/i.test(platform) || /Mac OS X/i.test(userAgent)) return "mac";
	if (/Win/i.test(platform) || /Windows/i.test(userAgent)) return "windows";
	return "linux";
}
/**
* 从主进程读取本窗口的初始 payload。
*
* 权威值在主进程 registry，不走 URL 也不走一次性投递，所以刷新后仍是同一份。
* 读取失败（bridge 未就绪 / 窗口未登记）时按 undefined 处理，不阻断首屏。
*/
async function readInitialPayload(windows) {
	try {
		markBoot("get-initial-payload-invoke");
		const payload = await windows.getInitialPayload();
		markBoot("get-initial-payload-resolved");
		return payload;
	} catch (error) {
		console.warn("[IndependentWindow] failed to read initial payload", error);
		return;
	}
}
async function initializeIndependentWindowProductEnvironment(wb) {
	try {
		applyIndependentWindowProductEnvironment((await wb.invoke("config:getProductConfiguration"))?.isOversea === true);
	} catch (error) {
		console.warn("[IndependentWindow] failed to initialize product environment", error);
	}
}
function applyIndependentWindowProductEnvironment(isOversea) {
	document.body.setAttribute("data-is-chinese-version", String(!isOversea));
	if (isOversea) document.body.setAttribute("data-is-oversea", "true");
	else document.body.removeAttribute("data-is-oversea");
}
function applyProductEnvironmentSnapshot(query) {
	const snapshot = query.get("productIsOversea");
	if (snapshot !== "true" && snapshot !== "false") return false;
	applyIndependentWindowProductEnvironment(snapshot === "true");
	return true;
}
function installIndependentWindowRendererLogWriter() {
	const bridge = window.__workbuddyRendererLogWrite;
	if (typeof bridge !== "function") return () => void 0;
	setRendererLogWriter((payload) => bridge(payload));
	return () => setRendererLogWriter(null);
}
async function bootstrapIndependentWindow({ appId, render, bodyClassName, deferSkeletonRemoval = false, deferAuthoritativeLocale = false, deferProductEnvironment = false, onSdkReady }) {
	const definition = builtinWindowApps[appId];
	if (!definition) {
		console.error("[IndependentWindow] unregistered app", { appId });
		throw new Error(INDEPENDENT_WINDOW_BOOTSTRAP_ERROR_CODES.UNREGISTERED_APP);
	}
	const query = new URLSearchParams(window.location.search);
	const queryAppId = query.get("windowAppId") ?? query.get("windowKind") ?? appId;
	if (queryAppId !== appId) {
		console.error("[IndependentWindow] app id mismatch", {
			actualAppId: queryAppId,
			expectedAppId: appId
		});
		throw new Error(INDEPENDENT_WINDOW_BOOTSTRAP_ERROR_CODES.APP_ID_MISMATCH);
	}
	const root = document.documentElement;
	root.setAttribute("data-window-app-id", appId);
	root.setAttribute("data-window-preset", query.get("windowPreset") ?? definition.presentation.preset);
	root.setAttribute("data-window-control-position", query.get("windowControlPosition") ?? definition.presentation.controlPosition ?? "platform-default");
	document.body.setAttribute("data-electron-desktop", "true");
	document.body.setAttribute("data-independent-window", "true");
	document.body.setAttribute("data-platform", detectDesktopPlatform());
	const hasProductEnvironmentSnapshot = applyProductEnvironmentSnapshot(query);
	const desktopAppVersion = getDesktopHost()?.appVersion?.trim();
	if (desktopAppVersion) {
		document.body.setAttribute("data-product-version", desktopAppVersion);
		window.__WORKBUDDY_VERSION__ = desktopAppVersion;
	}
	document.body.style.margin = "0";
	document.body.style.overflow = "hidden";
	if (bodyClassName) document.body.classList.add(bodyClassName);
	initializeIndependentWindowTheme();
	initializeIndependentWindowFontSize();
	initializeIndependentWindowAppearance();
	const disposeRendererLogWriter = installIndependentWindowRendererLogWriter();
	markBoot("dom-setup-done");
	markBoot("sdk-setup-start");
	setupDesktopSDK({ independentWindow: true });
	onSdkReady?.();
	const wb = getWb();
	wb.$provide("ui", createProductionUiImpl(createProductionUiRuntime()));
	markBoot("sdk-setup-done");
	const disposeShortcutSync = installShortcutCrossWindowSync();
	const windows = asWindowAppsApi(wb.windows);
	const disposeTheme = bindAuthoritativeWindowTheme(wb);
	const disposeAppearance = bindAuthoritativeWindowAppearance(wb);
	const productEnvironmentPromise = initializeIndependentWindowProductEnvironment(wb);
	const canDeferProductEnvironment = deferProductEnvironment && hasProductEnvironmentSnapshot;
	if (canDeferProductEnvironment) productEnvironmentPromise.catch(() => void 0);
	markBoot("binds-done");
	markBoot("await-start");
	const [disposeLocale, initialPayload] = await Promise.all([initializeIndependentWindowLocale(wb, { waitForAuthoritative: !deferAuthoritativeLocale }), readInitialPayload(windows)]);
	markBoot("locale-payload-done");
	if (!canDeferProductEnvironment) await productEnvironmentPromise;
	markBoot("product-env-done");
	window.addEventListener("beforeunload", () => {
		disposeTheme();
		disposeAppearance();
		disposeLocale();
		disposeShortcutSync();
		disposeRendererLogWriter();
	}, { once: true });
	const rootElement = document.getElementById("root");
	if (!rootElement) {
		removeIndependentWindowSkeleton();
		throw new Error(INDEPENDENT_WINDOW_BOOTSTRAP_ERROR_CODES.ROOT_NOT_FOUND);
	}
	const context = {
		appId,
		initialPayload,
		wb,
		windows,
		query
	};
	markBoot("render-start");
	import_client.createRoot(rootElement).render(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentWindowErrorBoundary, {
		onClose: () => {
			windows.close().catch(() => void 0);
		},
		children: render(context)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentWindowContentReady, { deferSkeletonRemoval })] }));
}
//#endregion
export { removeIndependentWindowSkeleton as a, hasIndependentWindowSkeleton as i, applyIndependentWindowTheme as n, setAuthoritativeWindowTheme as r, bootstrapIndependentWindow as t };
