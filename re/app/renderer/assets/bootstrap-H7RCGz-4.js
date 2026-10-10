const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./settings-window-app-CKKq0lxG.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./builtin-window-apps-BR1bS1dM.js","./update-toast-CQ2GsaP4.js","./update-toast-ClznF5Ep.css","./local-docs-facade-Cr4Rvoow.js","./locale-utils-TanlkH9x.js","./locale-utils-DQSZKef0.css","./workbuddy-provider-BD7no46c.js","./vendor-state-BjISUbfz.js","./adapters-OyJgXMG7.js","./acp-message-accumulator-CupTn1Ga.js","./browser-CX1Llsmu.js","./network-check-BoLxsxGF.js","./network-check-BY5uyEhW.css","./appearance-cross-window-sync-6GAxuwjy.js","./appearance-runtime-eV3bJxTA.js","./deeplink-Bcsi-wi0.js","./desktop-sdk-setup-Bf87qV1W.js","./UserMenu-Bs05nlMA.js","./split-action-button-DcQLraVx.js","./UserMenu-E5et-o_d.css","./read-allowed-dirs-DYVsN0s1.js","./link-handler-DFiXCRGF.js","./use-tdoc-check-auth-gate-CPJZSL92.js","./utils-C65Aew35.js","./use-tdoc-check-auth-gate-CQmTBgUF.css","./cloud-file-constants-C-3tulP1.js","./store-B9VMId-K.js","./folder-picker-modal-C_2cTFqD.js","./api-BdQlPhCp.js","./entry-service-CKVris1X.js","./use-upload-queue-DwfNivwj.js","./space-utils-DG6Tz1-K.js","./oneid-activation-guide-DuXXdo_H.js","./folder-picker-modal-BGu7mpm9.css","./lexiang-content-picker-Bo09zMCt.js","./lexiang-content-picker-WcRUMZ2k.css","./account-Cr0cOcaM.js","./prompt-failure-banner-events-D8rg39W1.js","./codebuddy-icon-provider-BgrOq92k.js","./context-BN2Z33cf.js","./use-connector-actions-cuKdFVYS.js","./prompt-failure-banner-events-BrIFsSfq.css","./connector-device-code-modal-Cjn-lIby.js","./connector-device-code-modal-D_6cG_6z.css","./app-shell-DgGkIrlT.js","./main-content-core-C2FdJiZx.js","./upload-utils-BaSYFvjN.js","./workspace-preparing-DMQHWfrK.js","./workspace-preparing-OwGXqoc6.css","./use-poi-map-feature-z4YCXlLm.js","./wechat-chat-history-input-intent-bridge-Dr4s6Mz4.js","./branch-switch-error-zqNku5uL.js","./branch-switch-error-BCkKN1-e.css","./use-lexiang-add-to-task-Bzd_j_bw.js","./main-content-core-Biedly4T.css","./use-home-input-external-effects-DM-agAcm.js","./desktop-sdk-setup-BZcgWjpj.css","./settings-conversation-sync-B0GCcYl_.js","./main-window-navigator-Bs0zgdJ1.js","./main-window-navigation-D-JJH4kM.js","./switch-away-from-disconnected-app-nibTA6gc.js"])))=>i.map(i=>d[i]);
import { r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { BP as init_perf_tracker, UP as perfSample } from "./ui-docs-viewer-Bo02yf1Q.js";
import { t as bootstrapIndependentWindow } from "./bootstrap-independent-window-C8q-1vR7.js";
import { Ev as require_react, Ov as __vitePreload, Tv as require_jsx_runtime, kv as init_preload_helper } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/workbuddy-app/src/components/mac-close-button.scss
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region ../../packages/workbuddy-app/src/components/mac-close-button.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* macOS 原生交通灯风格的单关闭按钮。
*
* 适用于隐藏了原生交通灯、只允许关闭的独立窗口。
*/
function MacCloseButton({ className, onPointerCancel, onPointerDown, onPointerEnter, onPointerLeave, onPointerUp, ...buttonProps }) {
	const [windowFocused, setWindowFocused] = (0, import_react.useState)(() => typeof document === "undefined" || document.hasFocus());
	const [pressed, setPressed] = (0, import_react.useState)(false);
	const buttonClassName = [
		"mac-close-btn",
		pressed ? "mac-close-btn--pressed" : "",
		className ?? ""
	].filter(Boolean).join(" ");
	const handlePointerDown = (event) => {
		if (event.button === 0 && !buttonProps.disabled) setPressed(true);
		onPointerDown?.(event);
	};
	const handlePointerEnter = (event) => {
		if ((event.buttons & 1) === 1 && !buttonProps.disabled) setPressed(true);
		onPointerEnter?.(event);
	};
	const handlePointerLeave = (event) => {
		setPressed(false);
		onPointerLeave?.(event);
	};
	const handlePointerUp = (event) => {
		setPressed(false);
		onPointerUp?.(event);
	};
	const handlePointerCancel = (event) => {
		setPressed(false);
		onPointerCancel?.(event);
	};
	(0, import_react.useEffect)(() => {
		const handleFocus = () => setWindowFocused(true);
		const handleBlur = () => {
			setWindowFocused(false);
			setPressed(false);
		};
		window.addEventListener("focus", handleFocus);
		window.addEventListener("blur", handleBlur);
		return () => {
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("blur", handleBlur);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mac-window-controls${windowFocused ? "" : " mac-window-controls--inactive"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			...buttonProps,
			type: "button",
			className: buttonClassName,
			onPointerCancel: handlePointerCancel,
			onPointerDown: handlePointerDown,
			onPointerEnter: handlePointerEnter,
			onPointerLeave: handlePointerLeave,
			onPointerUp: handlePointerUp,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": "true",
				className: "mac-close-btn__icon",
				focusable: "false",
				viewBox: "0 0 12 12",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mac-close-btn__background",
					cx: "6",
					cy: "6",
					r: "6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mac-close-btn__cross",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.5 3.5 8.5 8.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.5 3.5 3.5 8.5" })]
				})]
			})
		})
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/settings-window-controls.ts
async function toggleSettingsWindowMaximized(windows) {
	if (await windows.isMaximized()) {
		await windows.unmaximize();
		return;
	}
	await windows.maximize();
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/settings-window-perf.ts
init_perf_tracker();
function getTimeline() {
	const target = window;
	target.__settingsWindowPerf ??= { createdAt: Date.now() };
	return target.__settingsWindowPerf;
}
function markSettingsWindowStage(stage) {
	const timeline = getTimeline();
	const now = Date.now();
	let recorded = false;
	switch (stage) {
		case "module-loaded":
			if (timeline.moduleLoadedAt === void 0) {
				timeline.moduleLoadedAt = now;
				recorded = true;
			}
			break;
		case "sdk-ready":
			if (timeline.sdkReadyAt === void 0) {
				timeline.sdkReadyAt = now;
				recorded = true;
			}
			break;
		case "react-rendered": if (timeline.reactRenderedAt === void 0) {
			timeline.reactRenderedAt = now;
			recorded = true;
		}
	}
	if (recorded) performance.mark?.(`settings-window:${stage}`);
}
function reportSettingsWindowPanelReady(tab) {
	const timeline = getTimeline();
	if (timeline.reported) return;
	timeline.reported = true;
	const panelReadyAt = Date.now();
	performance.mark?.("settings-window:panel-ready");
	perfSample("settings-window.startup", {
		tab,
		totalMs: panelReadyAt - timeline.createdAt,
		createToHtmlMs: timeline.htmlShellAt === void 0 ? void 0 : timeline.htmlShellAt - timeline.createdAt,
		htmlToModuleMs: timeline.htmlShellAt === void 0 || timeline.moduleLoadedAt === void 0 ? void 0 : timeline.moduleLoadedAt - timeline.htmlShellAt,
		moduleToSdkMs: timeline.moduleLoadedAt === void 0 || timeline.sdkReadyAt === void 0 ? void 0 : timeline.sdkReadyAt - timeline.moduleLoadedAt,
		sdkToReactMs: timeline.sdkReadyAt === void 0 || timeline.reactRenderedAt === void 0 ? void 0 : timeline.reactRenderedAt - timeline.sdkReadyAt,
		reactToPanelMs: timeline.reactRenderedAt === void 0 ? void 0 : panelReadyAt - timeline.reactRenderedAt
	}, 1);
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/settings/bootstrap.tsx
var bootstrap_exports = /* @__PURE__ */ __exportAll({});
init_preload_helper();
markSettingsWindowStage("module-loaded");
var settingsWindowAppModule = __vitePreload(() => import("./settings-window-app-CKKq0lxG.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67]), import.meta.url);
var SettingsWindowApp = (0, import_react.lazy)(() => settingsWindowAppModule.then((module) => ({ default: module.SettingsWindowApp })));
function SettingsWindowLoading({ onClose, onToggleMaximize }) {
	const isWindows = document.body.dataset.platform === "windows";
	const isMac = document.body.dataset.platform === "mac";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "settings-window-root",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `settings-window-chrome${isWindows ? " settings-window-chrome--windows" : ""}`,
			onDoubleClick: (event) => {
				if (!event.target.closest("button")) onToggleMaximize();
			},
			children: [isWindows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "settings-window-close",
				"aria-label": "Close settings",
				onClick: onClose,
				children: "×"
			}), isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacCloseButton, {
				"aria-label": "Close settings",
				onClick: onClose
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "settings-window-loading",
			role: "status",
			"aria-label": "Loading settings",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "settings-window-loading__nav",
				children: Array.from({ length: 7 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "settings-window-loading__line" }, index))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-window-loading__content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "settings-window-loading__line" }), Array.from({ length: 3 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "settings-window-loading__card" }, index))]
			})]
		})]
	});
}
bootstrapIndependentWindow({
	appId: "settings",
	bodyClassName: "settings-window",
	deferAuthoritativeLocale: true,
	deferProductEnvironment: true,
	onSdkReady: () => markSettingsWindowStage("sdk-ready"),
	render: (context) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsWindowLoading, {
			onClose: () => {
				context.windows.close().catch(() => void 0);
			},
			onToggleMaximize: () => {
				toggleSettingsWindowMaximized(context.windows).catch((error) => {
					console.warn("[SettingsWindow] failed to toggle maximize state", error);
				});
			}
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsWindowApp, {
			initialRoute: context.initialPayload?.route,
			initialConversationId: context.initialPayload?.currentConversationId,
			wb: context.wb,
			windows: context.windows
		})
	})
});
//#endregion
export { MacCloseButton as a, toggleSettingsWindowMaximized as i, markSettingsWindowStage as n, reportSettingsWindowPanelReady as r, bootstrap_exports as t };
