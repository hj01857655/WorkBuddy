import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, uo as init_poi_dialog_cards } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/poi/dialog/McpPoiConsentCard.tsx
function McpPoiConsentCard({ mcpServerName, onAllow, onDeny }) {
	const t = useTranslation();
	const displayName = mcpServerName.startsWith("custom-mcp:") ? mcpServerName.slice(11) : mcpServerName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "poi-dialog-card poi-auth-card",
		role: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poi-dialog-card__title",
				children: t("poi.mcp.consent.title", { mcpServerName: displayName })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poi-dialog-card__desc",
				children: t("poi.mcp.consent.description")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "poi-dialog-card__options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onAllow,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.mcp.consent.allow")
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onDeny,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.mcp.consent.deny")
						})
					})]
				})]
			})
		]
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_poi_dialog_cards();
	require_react();
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { McpPoiConsentCard };
