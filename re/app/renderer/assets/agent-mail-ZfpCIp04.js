import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, Gk as init_agent_mail$1, J3 as useConversations, Kk as AgentMailPage$1 } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/pages/agent-mail.tsx
function AgentMailPage() {
	const { setShowDetailPanel } = useConversations();
	(0, import_react.useEffect)(() => {
		setShowDetailPanel?.(false);
	}, [setShowDetailPanel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMailPage$1, { visible: true });
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_agent_mail$1();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { AgentMailPage };
