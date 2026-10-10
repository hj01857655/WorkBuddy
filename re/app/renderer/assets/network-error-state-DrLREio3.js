import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime, Yl as init_lucide_react, iu as WifiOff } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/shared/network-error-state.less
var init_network_error_state$1 = __esmMin((() => {})), import_jsx_runtime, NetworkErrorState;
var init_network_error_state = __esmMin((() => {
	init_network_error_state$1();
	init_lucide_react();
	require_react();
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	NetworkErrorState = ({ onRetry, titleKey, descKey }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "network-error-state",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "network-error-state__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, {
						size: 48,
						strokeWidth: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "network-error-state__title",
					children: t(titleKey ?? "error.networkTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "network-error-state__desc",
					children: t(descKey ?? "error.networkDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "network-error-state__retry",
					onClick: onRetry,
					children: t("error.retry")
				})
			]
		});
	};
}));
//#endregion
export { init_network_error_state as n, NetworkErrorState as t };
