import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, S7 as Loading, c7 as Modal, krt as Button, m5 as init_src } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as upgrade_banner_character_default, t as init_upgrade_banner_character } from "./upgrade-banner-character-BdQTtxCg.js";
//#region ../../packages/agent-ui/src/components/cloud-assistant-upgrade/cloud-assistant-upgrade.less
var init_cloud_assistant_upgrade$1 = __esmMin((() => {})), import_jsx_runtime, CloudAssistantUpgradeBanner, ignoreModalOpenChange, CloudAssistantOpenTeamLoadingModal;
//#endregion
__esmMin((() => {
	init_cloud_assistant_upgrade$1();
	init_src();
	require_react();
	init_useI18n();
	init_upgrade_banner_character();
	import_jsx_runtime = require_jsx_runtime();
	CloudAssistantUpgradeBanner = ({ onUpgrade, upgraded = false, loading = false }) => {
		const t = useTranslation();
		const actionText = t(upgraded ? "cloudAssistantUpgrade.banner.enter" : "cloudAssistantUpgrade.banner.action");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "cloud-assistant-upgrade-banner-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cloud-assistant-upgrade-banner",
				"aria-labelledby": "cloud-assistant-upgrade-banner-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cloud-assistant-upgrade-banner__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "cloud-assistant-upgrade-banner__icon-image",
							src: upgrade_banner_character_default,
							alt: "",
							draggable: false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cloud-assistant-upgrade-banner__copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "cloud-assistant-upgrade-banner-title",
							children: t("cloudAssistantUpgrade.banner.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("cloudAssistantUpgrade.banner.subtitle") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "primary",
						size: "small",
						className: "cloud-assistant-upgrade-banner__button",
						disabled: loading,
						"aria-busy": loading || void 0,
						onClick: onUpgrade,
						children: actionText
					})
				]
			})
		});
	};
	ignoreModalOpenChange = () => void 0;
	CloudAssistantOpenTeamLoadingModal = ({ open }) => {
		const loadingText = useTranslation()("cloudAssistantUpgrade.openTeamLoading");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open,
			onOpenChange: ignoreModalOpenChange,
			centered: true,
			unstyled: true,
			closable: false,
			closeOnEscape: false,
			closeOnOverlayClick: false,
			width: 429,
			height: 525,
			wrapClassName: "cloud-assistant-open-team-loading-overlay",
			className: "cloud-assistant-open-team-loading-modal",
			ariaLabel: loadingText,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cloud-assistant-open-team-loading-content",
				"aria-live": "polite",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
					size: "large",
					tip: loadingText,
					className: "cloud-assistant-open-team-loading"
				})
			})
		});
	};
}))();
export { CloudAssistantOpenTeamLoadingModal, CloudAssistantUpgradeBanner, CloudAssistantUpgradeBanner as default };
