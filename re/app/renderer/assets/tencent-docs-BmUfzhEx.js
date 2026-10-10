import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { C3 as useLocation, E as init_contexts, J3 as useConversations, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { r as TencentDocsPanel, t as init_knowledge_base_panel } from "./knowledge-base-panel-FcaY2fds.js";
//#region ../../packages/agent-ui/src/pages/tencent-docs.tsx
function TencentDocsPage() {
	const { tencentDocsPanelConnectorId } = useConversations();
	const location = useLocation();
	const connectorIdFromQuery = new URLSearchParams(location.search).get("connectorId") ?? void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsPanel, { connectorId: connectorIdFromQuery ?? tencentDocsPanelConnectorId });
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_dist();
	init_knowledge_base_panel();
	init_contexts();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { TencentDocsPage };
