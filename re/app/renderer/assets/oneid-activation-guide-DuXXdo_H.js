import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, MJ as init_header_workbuddy, O1 as useTranslation, QB as init_oneid_env, ZB as ONEID_ENV, hB as init_lazy_oneid_app_activation, jJ as header_workbuddy_default, mB as LazyOneidAppActivation } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { g as tencent_docs_default, h as init_tencent_docs } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/oneid-activation-guide.tsx
var import_react, import_jsx_runtime, OneidAppActivation, BrandConnectArrows, OneidActivationGuide;
var init_oneid_activation_guide = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_tencent_docs();
	init_useI18n();
	init_lazy_oneid_app_activation();
	init_oneid_env();
	import_jsx_runtime = require_jsx_runtime();
	OneidAppActivation = LazyOneidAppActivation;
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tencent-docs-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	OneidActivationGuide = ({ appType, activationCode, appName, onActivated }) => {
		const t = useTranslation();
		const [active, setActive] = (0, import_react.useState)(false);
		const closeDialog = (0, import_react.useCallback)(() => {
			setActive(false);
			document.documentElement.classList.remove("dark");
		}, []);
		const handleOpen = (0, import_react.useCallback)(() => {
			if (!activationCode) return;
			setActive(true);
		}, [activationCode]);
		const handleSuccess = (0, import_react.useCallback)(() => {
			closeDialog();
			onActivated();
		}, [closeDialog, onActivated]);
		const handleFail = (0, import_react.useCallback)((event) => {
			const { phase, errCode, errMessage, id } = event.detail ?? {};
			console.error("[OneidActivationGuide] activation failed", {
				appType,
				phase,
				errCode,
				errMessage,
				traceId: id
			});
		}, [appType]);
		const title = t("oneid.activation.title", { appName: appName || (appType === "doc" ? "腾讯文档" : "腾讯乐享") });
		const description = t("oneid.activation.description");
		const buttonText = t("oneid.activation.activate");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tencent-docs-auth-guide",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tencent-docs-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tencent-docs-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--tdoc",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: tencent_docs_default,
									alt: appName || "Tencent Docs",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "tencent-docs-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tencent-docs-auth-guide__desc",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "tencent-docs-auth-guide__btn",
						onClick: handleOpen,
						disabled: !activationCode,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-label",
							children: buttonText
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-arrow",
							"aria-hidden": "true",
							children: "→"
						})]
					})
				]
			})
		}, "oneid-activation-guide"), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneidAppActivation, {
			code: activationCode,
			env: ONEID_ENV,
			language: "zh-CN",
			theme: "light",
			onSuccess: handleSuccess,
			onFail: handleFail,
			onClose: closeDialog
		})] });
	};
}));
//#endregion
export { init_oneid_activation_guide as n, OneidActivationGuide as t };
