import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { BF as SettingsSurface, Hlt as DEFAULT_SETTINGS_TAB, Iv as init_purchase, J7 as XCloseIcon, Qrt as init_common, Rv as PurchaseModalHost, TR as init_SettingsHostProviders, Ult as init_settings_route, VF as init_settings_surface, Wlt as normalizeSettingsRouteTarget, m5 as init_src, pR as init_SettingsModal, wR as SettingsHostProviders, yit as AgentClient, zit as accountService } from "./ui-docs-viewer-Bo02yf1Q.js";
import { n as isSettingsWindowParams } from "./builtin-window-apps-BR1bS1dM.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { o as registerUpdateCheckTrigger, t as init_update_toast } from "./update-toast-CQ2GsaP4.js";
import { o as getDaemonClient } from "./local-docs-facade-Cr4Rvoow.js";
import { n as WorkbuddyBackendProvider, o as createDesktopAgentProviders, r as WorkbuddyAgentAdapterNext, t as WorkbuddyProvider } from "./workbuddy-provider-BD7no46c.js";
import { i as installSecurityCenterEventBridge, r as readSettingsConversationSync } from "./settings-conversation-sync-B0GCcYl_.js";
import { t as navigateMainWindow } from "./main-window-navigator-Bs0zgdJ1.js";
import { r as openMainWindowCheckForUpdates } from "./main-window-navigation-D-JJH4kM.js";
import { a as MacCloseButton, i as toggleSettingsWindowMaximized, n as markSettingsWindowStage, r as reportSettingsWindowPanelReady } from "./bootstrap-H7RCGz-4.js";
//#region ../../packages/workbuddy-app/src/adapter/settings-window-host-runtime.ts
init_settings_route();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
init_src();
init_SettingsHostProviders();
init_SettingsModal();
init_settings_surface();
init_purchase();
init_update_toast();
init_common();
var sharedRuntime;
var sharedWb;
function createRuntime(wb, daemonClient) {
	const internalDaemonClient = daemonClient;
	const provider = new WorkbuddyProvider(internalDaemonClient);
	const backendProvider = new WorkbuddyBackendProvider(internalDaemonClient);
	const client = new AgentClient({
		provider,
		environmentType: "local"
	});
	const compatibilityAdapter = new WorkbuddyAgentAdapterNext(client, void 0, backendProvider, void 0, internalDaemonClient, provider);
	const providers = createDesktopAgentProviders(daemonClient, {
		independentWindow: true,
		sdkAlreadyInitialized: true
	});
	const disposeSecurityCenter = installSecurityCenterEventBridge(compatibilityAdapter, providers.facades?.securityCenter);
	if (typeof wb.invoke !== "function") throw new Error("SETTINGS_WINDOW_WB_RUNTIME_INVALID");
	return {
		compatibilityAdapter,
		backendProvider,
		providers,
		dispose: disposeSecurityCenter
	};
}
function getSettingsWindowHostRuntime(wb, daemonClient) {
	if (sharedRuntime && sharedWb === wb) return sharedRuntime;
	sharedRuntime?.dispose();
	sharedWb = wb;
	sharedRuntime = createRuntime(wb, daemonClient);
	return sharedRuntime;
}
function disposeSettingsWindowHostRuntime() {
	sharedRuntime?.dispose();
	sharedRuntime = void 0;
	sharedWb = void 0;
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/settings-window-providers.tsx
function SettingsWindowProviders({ children, wb }) {
	const runtime = getSettingsWindowHostRuntime(wb, getDaemonClient());
	(0, import_react.useEffect)(() => {
		window.addEventListener("beforeunload", disposeSettingsWindowHostRuntime, { once: true });
		const unregisterUpdateCheckTrigger = registerUpdateCheckTrigger(() => {
			openMainWindowCheckForUpdates(wb.windows).catch((error) => {
				console.error("[SettingsWindow] Failed to check for updates in main window:", error);
			});
		});
		return () => {
			unregisterUpdateCheckTrigger();
			window.removeEventListener("beforeunload", disposeSettingsWindowHostRuntime);
		};
	}, [wb.windows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsHostProviders, {
		adapter: runtime.compatibilityAdapter,
		backendProvider: runtime.backendProvider,
		providers: runtime.providers,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseModalHost, {})]
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/settings-window-app.tsx
init_common();
function toSettingsRouteTarget(route) {
	return normalizeSettingsRouteTarget(route) ?? void 0;
}
function defaultSettingsRoute() {
	return { tab: DEFAULT_SETTINGS_TAB };
}
/** preload 同步注入的平台信息，与 agent-ui 的宿主平台数据源一致。 */
function getHostPlatform() {
	return globalThis.__hostPlatform?.platform;
}
function isWindowsHost() {
	return getHostPlatform() === "win32";
}
function isMacHost() {
	return getHostPlatform() === "darwin";
}
function SettingsWindowSurface({ route, switchTab, closeWindow, runtime, wb, onPanelReady }) {
	const [wechatKfBound, setWechatKfBound] = (0, import_react.useState)(false);
	const [wechatKfLoaded, setWechatKfLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		const refresh = () => {
			wb.invoke("claw:wechatkfGetBindStatus").then((result) => {
				if (disposed) return;
				setWechatKfBound(result.bound === true);
				setWechatKfLoaded(true);
			}).catch(() => {
				if (disposed) return;
				setWechatKfBound(false);
				setWechatKfLoaded(true);
			});
		};
		const offBind = wb.on("claw:wechatkfBindSuccess", refresh);
		const offStatus = wb.on("claw:channelStatusChange", refresh);
		refresh();
		return () => {
			disposed = true;
			offBind();
			offStatus();
		};
	}, [wb]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSurface, {
		presentation: "window",
		route,
		onTabChange: switchTab,
		onRequestClose: closeWindow,
		onNavigateMain: navigateMainWindow,
		runtime,
		wechatKfInitialBound: wechatKfBound,
		wechatKfInitialLoaded: wechatKfLoaded,
		onPanelReady
	});
}
function SettingsWindowApp({ initialRoute, initialConversationId, wb, windows }) {
	markSettingsWindowStage("react-rendered");
	const [route, setRoute] = (0, import_react.useState)(() => toSettingsRouteTarget(initialRoute) ?? defaultSettingsRoute());
	const [currentConversationId, setCurrentConversationId] = (0, import_react.useState)(initialConversationId);
	const closeWindow = (0, import_react.useCallback)(() => {
		windows.close();
	}, [windows]);
	const handleChromeDoubleClick = (0, import_react.useCallback)((event) => {
		if (event.target.closest("button")) return;
		toggleSettingsWindowMaximized(windows).catch((error) => {
			console.warn("[SettingsWindow] failed to toggle maximize state", error);
		});
	}, [windows]);
	const initialLogoutRevisionRef = (0, import_react.useRef)(accountService.getAuthoritativeLogoutRevision());
	(0, import_react.useEffect)(() => {
		const handleAccountChange = () => {
			if (!accountService.isLoggedIn() && accountService.getAuthoritativeLogoutRevision() > initialLogoutRevisionRef.current) closeWindow();
		};
		handleAccountChange();
		return accountService.subscribe(handleAccountChange);
	}, [closeWindow]);
	const switchTab = (0, import_react.useCallback)((tab, subRoute) => {
		setRoute(subRoute ? {
			tab,
			subRoute
		} : { tab });
	}, []);
	const runtime = (0, import_react.useMemo)(() => ({
		environmentType: "local",
		currentConversationId
	}), [currentConversationId]);
	(0, import_react.useEffect)(() => windows.onMessage((message) => {
		if (message.kind === "open") {
			const params = message.payload;
			if (isSettingsWindowParams(params)) {
				const nextRoute = toSettingsRouteTarget(params?.route);
				setCurrentConversationId(params?.currentConversationId);
				if (nextRoute) setRoute(nextRoute);
			}
			return true;
		}
		if (message.kind === "message" && message.channel === "settings:current-conversation") {
			const next = readSettingsConversationSync(message.payload);
			if (next) setCurrentConversationId(next.currentConversationId);
			return true;
		}
		if (message.kind === "navigate" && message.payload && typeof message.payload === "object") {
			const request = message.payload;
			const nextRoute = toSettingsRouteTarget(request.route) ?? (typeof request.route === "string" ? toSettingsRouteTarget({
				tab: request.route,
				payload: request.payload
			}) : void 0);
			if (nextRoute) setRoute(nextRoute);
			return true;
		}
		return false;
	}), [windows]);
	const isWindows = isWindowsHost();
	const isMac = isMacHost();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsWindowProviders, {
		wb,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "settings-window-root",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `settings-window-chrome${isWindows ? " settings-window-chrome--windows" : ""}`,
				onDoubleClick: handleChromeDoubleClick,
				children: [isWindows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "settings-window-close",
					"aria-label": "Close settings",
					onClick: closeWindow,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XCloseIcon, { size: 16 })
				}), isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacCloseButton, {
					"aria-label": "Close settings",
					onClick: closeWindow
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsWindowSurface, {
				route,
				switchTab,
				closeWindow,
				runtime,
				wb,
				onPanelReady: reportSettingsWindowPanelReady
			})]
		})
	});
}
function routeFromSettingsParams(params) {
	return toSettingsRouteTarget(params?.route);
}
//#endregion
export { SettingsWindowApp, routeFromSettingsParams };
