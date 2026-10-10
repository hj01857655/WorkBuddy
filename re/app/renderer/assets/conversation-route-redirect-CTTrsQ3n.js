import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Fit as WORKBUDDY_DEPLOY_ORIGIN, Mit as ENTERPRISE_CLOUDAGENTS_ORIGIN, Nit as GENIE_ORIGIN, Qrt as init_common, lO as init_claw_session_filter, mT as shouldNavigateConversationViaEngine, pT as init_conversation_navigation_mode, uO as isClawWorkspaceCwd } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/agent-ui/src/pages/conversation-route-redirect.ts
/** 项目会话 → 回落路由；非项目会话返回 null（留在新引擎）。 */
function resolveProjectConversationRoute({ conversationId, projectId, transport }) {
	if (!conversationId || !projectId) return null;
	const encodedId = encodeURIComponent(conversationId);
	if (transport === "cloud") return {
		path: `/projects?projectId=${encodeURIComponent(projectId)}&collabTaskId=${encodedId}`,
		needsSessionRestore: false
	};
	return {
		path: `/task/${encodedId}`,
		needsSessionRestore: true
	};
}
/**
* `/task/:taskId` 上的旧 → 新纠偏：新引擎应承载的会话返回 `/conversation/:id`。
*
* 覆盖刷新、深链、分享链接、书签与 `NavigationAPI.navigateToSession` 这些直接落到旧
* `/task` 路由的入口（侧栏点击已在 `conversation-navigation-mode` 里分流到新路由）。
*
* 以下情况不纠偏，继续留在 ChatPage / 旧外壳：
*   - 会话信息拿不到（查询失败 / 会话不存在）；
*   - ConversationEngine 显式关闭（避免与 `/conversation` 的回落互相来回）；
*   - Teams 项目会话（本地任务走 `/task` 老壳的项目连接器接线，云端协同走项目详情页）；
*   - Claw 本地/云助理（`space.type === 'assistant'` 或 cwd 以 `/claw` 结尾，由 `/claw` 工作区承载）；
*   - GENIE 应用会话（由 `/genie/project/:projectId` 承载）；
*   - 应用发布的部署沙箱会话（`workbuddy-deploy`，非普通任务）。
*
* 返回目标路径（不含 query / state，由调用方补齐）；不应纠偏时返回 null。
*/
function resolveTaskConversationEngineRedirect({ featureEnabled, conversationId, info, hasProjectQuery = false }) {
	if (!conversationId || !info) return null;
	if (hasProjectQuery) return null;
	const { projectId, kind, conversationOrigin, space } = info;
	const spaceType = space.type;
	if (!shouldNavigateConversationViaEngine({
		featureEnabled,
		preserveListView: false,
		routeTarget: "task",
		isProjectConversation: Boolean(projectId) || spaceType === "project"
	})) return null;
	if (kind === "assistant") return null;
	if (NON_GENERAL_TASK_SPACE_TYPES.has(spaceType)) return null;
	if (conversationOrigin && NON_GENERAL_TASK_ORIGINS.has(conversationOrigin)) return null;
	if (isClawWorkspaceCwd(space.cwd ?? void 0)) return null;
	return `/conversation/${encodeURIComponent(conversationId)}`;
}
var NON_GENERAL_TASK_SPACE_TYPES, NON_GENERAL_TASK_ORIGINS;
var init_conversation_route_redirect = __esmMin((() => {
	init_common();
	init_claw_session_filter();
	init_conversation_navigation_mode();
	NON_GENERAL_TASK_SPACE_TYPES = /* @__PURE__ */ new Set([
		"genie",
		"assistant",
		"project",
		"workbuddy-deploy"
	]);
	NON_GENERAL_TASK_ORIGINS = /* @__PURE__ */ new Set([
		GENIE_ORIGIN,
		WORKBUDDY_DEPLOY_ORIGIN,
		ENTERPRISE_CLOUDAGENTS_ORIGIN,
		"personal-cloudagents",
		"teams",
		"teams_scheduler"
	]);
}));
//#endregion
export { resolveProjectConversationRoute as n, resolveTaskConversationEngineRedirect as r, init_conversation_route_redirect as t };
