import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $M as useClientMenusFetch, E as init_contexts, H as init_auth_context, J3 as useConversations, U as useAccountService, ZM as init_client_menu, fC as WorkBuddyTopBar, iN as ClientMenuHost, nN as MenuDisabledOverlay, pC as init_workbuddy_topbar, sN as useMenuMerge, tN as useActiveMenuDisabled, uN as setActiveMenuId, w3 as useNavigate, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/pages/iframe-menu.tsx
function IframeMenuPage() {
	const { account } = useAccountService();
	useClientMenusFetch(account ? account.enterpriseId ?? "" : void 0);
	useMenuMerge();
	const sidebarCollapsed = useConversations()?.sidebarCollapsed ?? false;
	const navigate = useNavigate();
	const activeMenuDisabled = useActiveMenuDisabled();
	const handleLeave = (0, import_react.useCallback)(() => {
		setActiveMenuId(null);
		navigate("/home");
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			background: "#fff"
		},
		children: [sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyTopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				flex: 1,
				minHeight: 0,
				position: "relative"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientMenuHost, {}), activeMenuDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDisabledOverlay, { onLeave: handleLeave })]
		})]
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_workbuddy_topbar();
	init_contexts();
	init_auth_context();
	init_client_menu();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { IframeMenuPage };
