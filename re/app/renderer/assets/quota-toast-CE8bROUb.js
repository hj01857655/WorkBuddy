import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-toast.less
var init_quota_toast$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-toast.tsx
function emitQuotaToastSingleton(key, instanceId) {
	window.dispatchEvent(new CustomEvent(QUOTA_TOAST_SINGLETON_EVENT, { detail: {
		key,
		instanceId
	} }));
}
var import_react$1, import_jsx_runtime$1, QUOTA_TOAST_SINGLETON_EVENT, WarningIcon, CloseIcon, QuotaToast;
var init_quota_toast$1 = __esmMin((() => {
	init_quota_toast$2();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$1 = require_jsx_runtime();
	QUOTA_TOAST_SINGLETON_EVENT = "workbuddy:quota-toast-singleton";
	WarningIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		className: "quota-toast__icon",
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
				x1: "12",
				y1: "9",
				x2: "12",
				y2: "13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12.01",
				y2: "17"
			})
		]
	});
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	QuotaToast = ({ title, message, action, onClose, className, style, singletonKey }) => {
		const instanceId = (0, import_react$1.useRef)(Date.now() + Math.random()).current;
		const onCloseRef = (0, import_react$1.useRef)(onClose);
		const [visible, setVisible] = import_react$1.useState(true);
		(0, import_react$1.useEffect)(() => {
			onCloseRef.current = onClose;
		}, [onClose]);
		(0, import_react$1.useEffect)(() => {
			if (!singletonKey) return;
			const handleSingleton = (event) => {
				const detail = event.detail;
				if (detail?.key === singletonKey && detail.instanceId !== instanceId) {
					setVisible(false);
					onCloseRef.current();
				}
			};
			window.addEventListener(QUOTA_TOAST_SINGLETON_EVENT, handleSingleton);
			emitQuotaToastSingleton(singletonKey, instanceId);
			return () => window.removeEventListener(QUOTA_TOAST_SINGLETON_EVENT, handleSingleton);
		}, [instanceId, singletonKey]);
		const handleClose = () => {
			setVisible(false);
			onClose();
		};
		const renderAction = () => {
			if (!action) return null;
			const buttonClass = `quota-toast__action-btn quota-toast__action-btn--${action.variant}`;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				className: buttonClass,
				onClick: action.onClick,
				children: action.label
			});
		};
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `quota-toast${className ? ` ${className}` : ""}`,
			style,
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "quota-toast__head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WarningIcon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "quota-toast__title",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "quota-toast__close",
							onClick: handleClose,
							"aria-label": "close",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CloseIcon, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "quota-toast__body",
					children: message
				}),
				action && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "quota-toast__actions",
					children: renderAction()
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-banner-inline.less
var init_quota_banner_inline$1 = __esmMin((() => {}));
var init_quota_banner_inline = __esmMin((() => {
	init_quota_banner_inline$1();
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/index.ts
var init_quota_toast = __esmMin((() => {
	init_quota_toast$1();
	init_quota_banner_inline();
}));
//#endregion
export { QuotaToast as n, init_quota_toast$1 as r, init_quota_toast as t };
