import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, Fi as FeedbackModal, Li as init_FeedbackModal, O1 as useTranslation, V3 as useAdapter, krt as Button, m5 as init_src } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as init_HelpFeedbackPanel } from "./HelpFeedbackPanel-DSuuk64D.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/GetHelpPanel.tsx
function GetHelpPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [feedbackVisible, setFeedbackVisible] = (0, import_react.useState)(false);
	const [feedbackUrl, setFeedbackUrl] = (0, import_react.useState)();
	const [helpDocument, setHelpDocument] = (0, import_react.useState)();
	const isLocalMode = adapter?.environmentType === "local";
	const isCloudMode = adapter?.environmentType === "cloud";
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.resolve(adapter?.getProductLinks?.()).then((links) => {
			if (!cancelled) {
				setFeedbackUrl(links?.craftFeedback);
				setHelpDocument(links?.helpDocument);
			}
		}).catch((error) => {
			console.warn("[GetHelpPanel] load product links failed:", error);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter]);
	const openExternal = (0, import_react.useCallback)((url) => {
		if (isLocalMode) {
			adapter?.emit("open-external", url);
			return;
		}
		window.open(url, "_blank");
	}, [adapter, isLocalMode]);
	const handleFeedback = (0, import_react.useCallback)(() => {
		if (!isCloudMode) {
			setFeedbackVisible(true);
			return;
		}
		if (feedbackUrl) openExternal(feedbackUrl);
	}, [
		feedbackUrl,
		isCloudMode,
		openExternal
	]);
	const actionRows = (0, import_react.useMemo)(() => [(!isCloudMode || feedbackUrl) && {
		key: "feedback",
		label: t("settings.helpFeedback.feedback"),
		actionText: t("settings.about.submitFeedback"),
		onClick: handleFeedback
	}, helpDocument && {
		key: "helpDocument",
		label: t("settings.helpFeedback.helpDocs"),
		actionText: t("settings.about.viewDocs"),
		onClick: () => openExternal(helpDocument)
	}].filter(Boolean), [
		feedbackUrl,
		handleFeedback,
		helpDocument,
		isCloudMode,
		openExternal,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "help-feedback-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "help-feedback-panel__card",
			children: actionRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "help-feedback-panel__card-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "help-feedback-panel__card-label",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					className: "help-feedback-panel__action-button",
					onClick: row.onClick,
					children: row.actionText
				})]
			}, row.key))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackModal, {
			visible: feedbackVisible,
			onClose: () => setFeedbackVisible(false)
		})]
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_HelpFeedbackPanel();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_FeedbackModal();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { GetHelpPanel };
