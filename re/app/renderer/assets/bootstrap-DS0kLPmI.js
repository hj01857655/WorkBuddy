import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { t as bootstrapIndependentWindow } from "./bootstrap-independent-window-C8q-1vR7.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { c as GlobalSearchProvider, o as createBuiltinDescriptors, s as GlobalSearchPanel } from "./desktop-sdk-setup-Bf87qV1W.js";
import "./independent-window-qbsk1YYc.js";
//#region ../../packages/workbuddy-app/src/window-apps/global-search/bootstrap.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_LOCALE = "zh-CN";
var MAIN_WINDOW_ID = "main";
function GlobalSearchWindow({ wb, windows }) {
	const [locale, setLocale] = (0, import_react.useState)(DEFAULT_LOCALE);
	const [reopenEpoch, setReopenEpoch] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		wb.config.language().then((language) => {
			if (!cancelled && language) setLocale(language);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [wb]);
	(0, import_react.useEffect)(() => {
		const off = windows.onMessage((event) => {
			if (event.kind === "open") {
				setReopenEpoch((previous) => previous + 1);
				return true;
			}
			return false;
		});
		return () => {
			off();
		};
	}, [windows]);
	const searchWb = (0, import_react.useMemo)(() => wb, [wb]);
	const dispatchOpen = (0, import_react.useCallback)(async (anchor) => {
		if (anchor) await wb.search.emitOpenAnchor(anchor).catch(() => void 0);
		await windows.focus(MAIN_WINDOW_ID).catch(() => void 0);
		await windows.close().catch(() => void 0);
	}, [wb, windows]);
	const onOpenResult = (0, import_react.useCallback)((result) => {
		dispatchOpen(result.anchor).catch(() => void 0);
	}, [dispatchOpen]);
	const onOpenRecent = (0, import_react.useCallback)((visit) => {
		dispatchOpen(visit.anchor).catch(() => void 0);
	}, [dispatchOpen]);
	const descriptors = (0, import_react.useMemo)(() => createBuiltinDescriptors({
		openAnchor: (anchor) => {
			dispatchOpen(anchor).catch(() => void 0);
		},
		locale
	}), [dispatchOpen, locale]);
	(0, import_react.useEffect)(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape" && !event.isComposing) windows.close().catch(() => void 0);
		};
		window.addEventListener("keydown", onKeyDown, true);
		return () => window.removeEventListener("keydown", onKeyDown, true);
	}, [windows]);
	const titlebarHeight = document.body.dataset.platform === "mac" ? 20 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		style: {
			display: "flex",
			flexDirection: "column",
			width: "100vw",
			height: "100vh"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
			flex: `0 0 ${titlebarHeight}px`,
			height: titlebarHeight,
			background: "var(--wb-bg-content)",
			WebkitAppRegion: "drag"
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				flex: "1 1 auto",
				minHeight: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearchProvider, {
				wb: searchWb,
				locale,
				descriptors,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearchPanel, {
					onOpenResult,
					onOpenRecent
				}, reopenEpoch)
			})
		})]
	});
}
bootstrapIndependentWindow({
	appId: "global-search",
	render: (context) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearchWindow, {
		wb: context.wb,
		windows: context.windows
	})
});
//#endregion
