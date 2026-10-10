import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, MR as wechatmp_icon_default, O1 as useTranslation, h7 as init_floating, jR as init_wechatmp_icon, x7 as useFloating } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Cp as flip, Dp as offset, Ev as require_react, Op as shift, Tv as require_jsx_runtime, gs as useRole, jp as autoUpdate, ls as useClick, ms as useInteractions, os as FloatingPortal, ps as useHover, us as useDismiss } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/miniprogram-qr-button/index.less
var init_miniprogram_qr_button$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/wechatmp-qr-code.png
var wechatmp_qr_code_default;
var init_wechatmp_qr_code = __esmMin((() => {
	wechatmp_qr_code_default = "" + new URL("wechatmp-qr-code-BvkfUo9Q.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/miniprogram-qr-button/index.tsx
var miniprogram_qr_button_exports = /* @__PURE__ */ __exportAll({
	MiniProgramQRButton: () => MiniProgramQRButton,
	default: () => MiniProgramQRButton
});
var import_react, import_jsx_runtime, MiniProgramQRButton;
var init_miniprogram_qr_button = __esmMin((() => {
	init_miniprogram_qr_button$1();
	init_floating();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_wechatmp_icon();
	init_wechatmp_qr_code();
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	MiniProgramQRButton = ({ collapsed = false, triggerMode = "hover", miniProgramPath }) => {
		const t = useTranslation();
		const [isOpen, setIsOpen] = (0, import_react.useState)(false);
		const { refs, floatingStyles, context } = useFloating({
			open: isOpen,
			onOpenChange: setIsOpen,
			placement: collapsed ? "right" : "top",
			middleware: [
				offset(8),
				flip(),
				shift({ padding: 8 })
			],
			whileElementsMounted: autoUpdate
		});
		const hover = useHover(context, {
			delay: {
				open: 150,
				close: 300
			},
			restMs: 150,
			enabled: triggerMode === "hover"
		});
		const click = useClick(context, { enabled: triggerMode === "click" });
		const dismiss = useDismiss(context);
		const role = useRole(context, { role: "tooltip" });
		const { getReferenceProps, getFloatingProps } = useInteractions([
			hover,
			click,
			dismiss,
			role
		]);
		const popupContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [triggerMode === "click" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "miniprogram-qr-backdrop",
			onClick: () => setIsOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: refs.setFloating,
			style: floatingStyles,
			className: "miniprogram-qr-popup",
			...getFloatingProps(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "miniprogram-qr-popup-title",
					children: t("sidebar.miniprogram.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "miniprogram-qr-popup-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wechatmp_qr_code_default,
						alt: "QR Code",
						className: "miniprogram-qr-popup-image",
						"data-mini-program-path": miniProgramPath
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "miniprogram-qr-popup-desc",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("sidebar.miniprogram.desc.one") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("sidebar.miniprogram.desc.two") })]
				})
			]
		})] });
		if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: refs.setReference,
			className: "conversation-list-collapsed-icon-button",
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: wechatmp_icon_default,
				alt: "Mini Program",
				style: {
					width: 18,
					height: 18
				}
			})
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, { children: popupContent })] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: refs.setReference,
			className: "miniprogram-qr-trigger",
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: wechatmp_icon_default,
				alt: "Mini Program",
				style: {
					width: 18,
					height: 18
				}
			})
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, { children: popupContent })] });
	};
}));
//#endregion
export { wechatmp_qr_code_default as a, init_wechatmp_qr_code as i, init_miniprogram_qr_button as n, miniprogram_qr_button_exports as r, MiniProgramQRButton as t };
