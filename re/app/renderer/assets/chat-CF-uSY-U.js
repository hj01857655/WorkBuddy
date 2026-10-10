import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { C3 as useLocation, E as init_contexts, E3 as useParams, J3 as useConversations, KX as useConversationEngineFeature, Q as init_app_providers, T0 as init_app_core, T3 as useOutletContext, c3 as getWb, et as useAgentServices, jY as init_product_features, u3 as isAppCoreReady, x3 as Navigate, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { b as useProjectInputResources, n as init_collab, u as useProjectLocalChatConfig } from "./collab-B9Yf-HuF.js";
import { n as MainContentCore, t as init_main_content_core } from "./main-content-core-C2FdJiZx.js";
import { r as resolveTaskConversationEngineRedirect, t as init_conversation_route_redirect } from "./conversation-route-redirect-CTTrsQ3n.js";
//#region ../../packages/agent-ui/src/pages/chat.tsx
/**
* `/task/:taskId` 落到新引擎应承载的会话时，replace 到 `/conversation/:conversationId`。
*
* 与 `/conversation/:id` 上的 `useProjectConversationRedirect` 对称，覆盖刷新、深链、
* 分享链接、书签与 `NavigationAPI.navigateToSession` 这些直接落到旧 `/task` 路由的入口
* （侧栏点击已在 `conversation-navigation-mode` 里分流到新路由）。
*
* 直接查 wb SDK 而不读 currentConversation：本路由不经过新的 route hydrate 链路，
* `currentConversation` 的 space / project 字段到达时机不可靠，SDK 的 ConversationInfo
* 才是权威来源。解析期间不阻塞渲染（沿用 ChatPage 兜底），拿到结果后再 replace；
* 查询失败 / 会话不存在时同样留在 ChatPage 兜底，不把用户推进同样加载不出来的新引擎。
*/
function useTaskConversationEngineRedirect(taskId, hasProjectQuery) {
	const featureEnabled = useConversationEngineFeature();
	const [redirectPath, setRedirectPath] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setRedirectPath(null);
		if (!taskId || hasProjectQuery || featureEnabled === false || !isAppCoreReady()) return;
		let cancelled = false;
		const resolve = async () => {
			const conversation = await getWb().conversations.get(taskId).catch(() => void 0);
			if (cancelled) return;
			const target = resolveTaskConversationEngineRedirect({
				featureEnabled,
				conversationId: taskId,
				info: conversation?.info ?? null,
				hasProjectQuery
			});
			if (target) setRedirectPath(target);
		};
		resolve().catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [
		taskId,
		hasProjectQuery,
		featureEnabled
	]);
	return redirectPath;
}
/**
* 主聊天页：迁移期承载 `/home` 与 `/task/:taskId` 的主内容区。
*
* = MainContentCore + 项目连接器资源接线。其余 shell 页面由 pages/* 各自的 route 页承载，
* 不再经这里分发（历史上叫 MainRouteOutlet / LegacyMainRoute，已正名并入本页）。
*
* `/home` 当前仍委托 MainContentCore 渲染旧 welcome，后续由 modules/home 的独立页面替换；
* 这里保留该桥接，确保路由迁移与输入编排迁移可以分批落地。
*
* `/task/:taskId` 上还兜底旧 → 新路由纠偏（见 `useTaskConversationEngineRedirect`）。
*/
function ChatPage() {
	const props = useOutletContext();
	const { taskId } = useParams();
	const location = useLocation();
	const hasProjectQuery = new URLSearchParams(location.search).has("projectId");
	const engineRedirectPath = useTaskConversationEngineRedirect(taskId ?? "", hasProjectQuery);
	const agentServices = useAgentServices();
	const conversationsContext = useConversations();
	const activeConversation = props?.currentConversation ?? conversationsContext.currentConversation;
	const currentProjectId = activeConversation?.projectId || activeConversation?.session?.projectId;
	const connectorFacade = agentServices?.connector;
	const listProjectConnectors = (0, import_react.useCallback)((projectId) => connectorFacade.listProjectConnectors(projectId), [connectorFacade]);
	const { projectPublicConnectorConfigs } = useProjectInputResources({
		projectId: currentProjectId,
		listProjectConnectors: connectorFacade ? listProjectConnectors : void 0
	});
	if (engineRedirectPath) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: `${engineRedirectPath}${location.search}`,
		replace: true,
		state: location.state
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainContentCore, {
		...props,
		projectPublicConnectorConfigs,
		useProjectLocalChatConfig
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_app_core();
	init_main_content_core();
	init_contexts();
	init_product_features();
	init_collab();
	init_app_providers();
	init_conversation_route_redirect();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ChatPage };
