import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { As as syncCachedLocalConversationSandboxMode, Os as init_controller_cache, ac as init_sandbox_safety, ad as init_common, f0 as useOptionalModuleHost, rc as SANDBOX_SAFETY_CHANGE_EVENT } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/conversation/services/permission-preference-service.tsx
/**
* 将安全中心沙箱开关同步到已缓存的本地 Conversation Engine 会话。
*/
function ConversationPermissionPreferenceService() {
	const wb = useOptionalModuleHost()?.wb;
	(0, import_react.useEffect)(() => {
		if (!wb || typeof window === "undefined") return;
		const handleSandboxSafetyChange = (event) => {
			const enabled = event.detail?.enabled;
			if (typeof enabled !== "boolean") return;
			syncCachedLocalConversationSandboxMode(wb, enabled).catch((error) => {
				console.warn("[conversation-sandbox] failed to synchronize cached conversations:", error);
			});
		};
		window.addEventListener(SANDBOX_SAFETY_CHANGE_EVENT, handleSandboxSafetyChange);
		return () => window.removeEventListener(SANDBOX_SAFETY_CHANGE_EVENT, handleSandboxSafetyChange);
	}, [wb]);
	return null;
}
var import_react;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_sandbox_safety();
	init_common();
	init_controller_cache();
}))();
export { ConversationPermissionPreferenceService };
