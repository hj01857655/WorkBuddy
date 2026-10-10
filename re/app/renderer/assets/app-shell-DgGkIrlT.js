import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $R as init_pending_session_select, AD as openLibraryTarget, AG as isShellViewAllowed, BM as useTencentLexiangEnabled, Bd as parseLibraryResourceUrl, Bv as openPurchaseModal, C3 as useLocation, E as init_contexts, FD as setPendingBuddyDeeplink, FO as markMarketPageLoadStart, GU as deepLinkConversationOpen$, Gk as init_agent_mail, H as init_auth_context, IO as pathToMarketTab, Iv as init_purchase, J3 as useConversations, JM as useKnowledgeBaseFeature, KM as useTencentDocsKnowledgeFeature, KX as useConversationEngineFeature, MO as init_market_perf, NO as getMarketPageLoadStore, OD as buildLibraryStoragePanelShellPath, OG as BRAND_GATE_REDIRECT_EVENT, Ox as init_route_path_tracker, PD as init_buddy_deeplink_store, RM as useAgentMailFeature, RU as init_input_intents, SD as resolveDeepLinkFromUrl, T0 as init_app_core, TG as matchShellRoute, V3 as useAdapter, W as useAuth, WM as init_use_tencent_docs_knowledge_feature, XU as taskStarterCwd$, Xq as genTraceId, YM as init_main_route_outlet, Zq as init_trace_id, _O as init_task_starter_store, ab as InspirationShareCodeDetailHost, bQ as init_use_ima_enabled, c3 as getWb, dz as init_use_product_feature, ez as pendingSessionSelectStore, fz as useProductFeature, hD as subscribePendingDeepLinkUrl, ib as useInspirationShareCodeReceiver, jG as publishShellRouteGates, jY as init_product_features, kD as init_library_target, kG as init_brand_route_gates, kx as setCurrentRoutePath, lz as useSettings, ob as init_use_inspiration_share_code_detail_host, pD as init_deeplink_pending_url, qM as init_use_knowledge_base_feature, qU as getConversationOpenDeepLinkId, rb as init_use_inspiration_share_code_receiver, sz as init_SettingsContext, vD as init_deep_link_routes, w3 as useNavigate, wG as init_route_matchers, xQ as useImaEnabled, y3 as init_dist, yD as isDeepLinkRouteChange, zM as init_use_tencent_lexiang_enabled, zd as init_library_resource_url } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { i as init_store, s as myFilesStore } from "./store-B9VMId-K.js";
//#region ../../packages/agent-ui/src/app-shell/effects/use-route-side-effects.ts
function isCurrentClawConversation(conversation) {
	return Boolean(conversation?.id) && /[/\\]Claw$/i.test(conversation?.cwd || "");
}
function shouldClearCurrentConversation(route, conversation) {
	if (!route.handle.clearCurrentConversation) return false;
	return route.handle.view === "claw" ? !isCurrentClawConversation(conversation) : true;
}
/** 执行 route 元数据声明的一次性副作用：清会话 / 收起详情面板 / 复位 task starter cwd。 */
function applyRouteSideEffects(route, context) {
	if (route.handle.resetTaskStarterCwd) taskStarterCwd$.next("");
	if (shouldClearCurrentConversation(route, context.currentConversation)) {
		context.setCurrentConversation(null);
		context.setShowDetailPanel?.(false);
	}
}
/** route → 一次性状态复位；仅保留合法的 URL → state 单向复位。 */
function useRouteSideEffects(pathname, conversations) {
	const conversationsRef = (0, import_react$5.useRef)(conversations);
	(0, import_react$5.useEffect)(() => {
		conversationsRef.current = conversations;
	});
	(0, import_react$5.useLayoutEffect)(() => {
		const route = matchShellRoute(pathname);
		if (route) applyRouteSideEffects(route, conversationsRef.current);
	}, [pathname]);
}
var import_react$5;
var init_use_route_side_effects = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_task_starter_store();
	init_route_matchers();
}));
//#endregion
//#region ../../packages/agent-ui/src/navigation/deeplink/use-deep-link-navigation.ts
/**
* 订阅并消费 workbuddy:// deep-link。
*
* URL 解析是纯函数；本 hook 只处理 telemetry、brand gate、store 写入与 navigate 副作用。
*/
function useDeepLinkNavigation({ conversations, gates, pathname, adapter, navigate }) {
	const conversationsRef = (0, import_react$4.useRef)(conversations);
	const gatesRef = (0, import_react$4.useRef)(gates);
	const pathnameRef = (0, import_react$4.useRef)(pathname);
	const conversationRouteEnabled = useConversationEngineFeature() !== false;
	const { openSettings } = useSettings();
	const openSettingsRef = (0, import_react$4.useRef)(openSettings);
	(0, import_react$4.useEffect)(() => {
		conversationsRef.current = conversations;
		gatesRef.current = gates;
		pathnameRef.current = pathname;
		openSettingsRef.current = openSettings;
	});
	(0, import_react$4.useEffect)(() => {
		const handleDeepLink = (url) => {
			if (!url) return;
			const resolution = resolveDeepLinkFromUrl(url);
			if (resolution.kind === "invalid") {
				console.warn("[DeepLinkNavigation] deep link url parse failed:", url);
				return;
			}
			if (resolution.kind === "purchase") {
				openPurchaseModal({
					url: resolution.href,
					source: "deeplink"
				});
				return;
			}
			if (resolution.kind === "settings") {
				adapter.reportTelemetry(DEEP_LINK_ENTRY_EVENT, {
					source: "deeplink",
					page: resolution.host,
					pageURL: pathnameRef.current
				});
				openSettingsRef.current(resolution.tab, resolution.subRoute);
				return;
			}
			if (resolution.kind === "unknown") {
				console.warn("[DeepLinkNavigation] unknown deep link host, ignored:", resolution.host);
				return;
			}
			const { host, resolvedPath, replace, pendingTaskId, expertCenter, officeReturn, myFiles, buddy } = resolution;
			const targetPath = conversationRouteEnabled && pendingTaskId ? `/conversation/${encodeURIComponent(pendingTaskId)}` : resolvedPath;
			const targetRoute = matchShellRoute(targetPath);
			const routeChanged = isDeepLinkRouteChange(pathnameRef.current, targetPath);
			if (targetRoute && !isShellViewAllowed(targetRoute.handle.view, gatesRef.current)) {
				adapter.reportTelemetry(BRAND_GATE_REDIRECT_EVENT, {
					source: "deeplink",
					page: host.toLowerCase(),
					pageURL: targetPath,
					pageName: targetRoute.handle.view
				});
				if (pathnameRef.current !== "/") navigate("/", { replace: true });
				return;
			}
			adapter.reportTelemetry(DEEP_LINK_ENTRY_EVENT, {
				source: "deeplink",
				page: host.toLowerCase(),
				pageURL: targetPath
			});
			if (targetRoute && routeChanged) applyRouteSideEffects(targetRoute, conversationsRef.current);
			if (myFiles) {
				myFilesStore.getState().triggerCapacityRefresh();
				if (myFiles.activeTab === "cloudFiles") myFilesStore.getState().setActiveTab("cloudFiles");
			}
			if (buddy) setPendingBuddyDeeplink(buddy);
			if (routeChanged || expertCenter || officeReturn || pendingTaskId || buddy) {
				const tab = pathToMarketTab(targetPath);
				if (tab && routeChanged) markMarketPageLoadStart(getMarketPageLoadStore(), {
					tab,
					from: pathnameRef.current,
					trigger: "deeplink",
					t0: Date.now()
				});
				navigate(targetPath, {
					replace,
					...expertCenter || officeReturn ? { state: expertCenter ?? officeReturn } : {}
				});
			}
			if (pendingTaskId && !conversationRouteEnabled) pendingSessionSelectStore.getState().setPendingSession({ sessionId: pendingTaskId });
		};
		return subscribePendingDeepLinkUrl(handleDeepLink);
	}, [
		adapter,
		conversationRouteEnabled,
		navigate
	]);
}
var import_react$4, DEEP_LINK_ENTRY_EVENT;
var init_use_deep_link_navigation = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_use_route_side_effects();
	init_store();
	init_purchase();
	init_SettingsContext();
	init_product_features();
	init_brand_route_gates();
	init_route_matchers();
	init_market_perf();
	init_pending_session_select();
	init_buddy_deeplink_store();
	init_deep_link_routes();
	init_deeplink_pending_url();
	DEEP_LINK_ENTRY_EVENT = "workbuddy_deeplink_entry";
}));
//#endregion
//#region ../../packages/agent-ui/src/navigation/inspiration-share-code/index.ts
var init_inspiration_share_code = __esmMin((() => {
	init_use_inspiration_share_code_receiver();
	init_use_inspiration_share_code_detail_host();
}));
//#endregion
//#region ../../packages/agent-ui/src/navigation/use-library-open-storage-panel-event.ts
function createStoragePanelRequestId() {
	fallbackRequestSequence += 1;
	return `${genTraceId()}-${fallbackRequestSequence}`;
}
/** Adapt the existing host intent to the Federation route and wb bus. */
function useLibraryOpenStoragePanelEvent(navigate, createRequestId = createStoragePanelRequestId) {
	const { isAuthenticated } = useAuth();
	const spaceEnabled = useProductFeature("Space", { mode: "enable" });
	(0, import_react$3.useEffect)(() => {
		if (!spaceEnabled || !isAuthenticated) return;
		const handler = (event) => {
			const payload = { requestId: createRequestId() };
			event.preventDefault();
			navigate(buildLibraryStoragePanelShellPath(payload.requestId));
			getWb().$bus.emit(LIBRARY_STORAGE_OPEN_PANEL_BUS_EVENT, payload);
		};
		window.addEventListener(LIBRARY_OPEN_STORAGE_PANEL_EVENT, handler);
		return () => window.removeEventListener(LIBRARY_OPEN_STORAGE_PANEL_EVENT, handler);
	}, [
		createRequestId,
		isAuthenticated,
		navigate,
		spaceEnabled
	]);
}
var import_react$3, LIBRARY_OPEN_STORAGE_PANEL_EVENT, LIBRARY_STORAGE_OPEN_PANEL_BUS_EVENT, fallbackRequestSequence;
var init_use_library_open_storage_panel_event = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_auth_context();
	init_use_product_feature();
	init_trace_id();
	init_library_target();
	LIBRARY_OPEN_STORAGE_PANEL_EVENT = "workbuddy:open-space-storage-panel";
	LIBRARY_STORAGE_OPEN_PANEL_BUS_EVENT = "library.storage.openPanel";
	fallbackRequestSequence = 0;
}));
//#endregion
//#region ../../packages/agent-ui/src/router/use-shell-route-gates.ts
/**
* 组装 brand gate 判定所需的各功能开关（与 sidebar「更多」菜单入口隐藏逻辑同源）。
*
* 只应由常驻 RouterEffects 调用，并通过 `publishShellRouteGates()` 发布快照。
* BrandGate / MainRouteOutlet 等路由渲染路径必须读取 `useShellRouteGatesSnapshot()`，
* 避免路由激活时新建异步 feature hook 实例。
*/
function useShellRouteGates() {
	const { libraryEnabled: imaEnabled } = useImaEnabled();
	const knowledgeBaseEnabled = useKnowledgeBaseFeature();
	const tencentDocsEnabled = useTencentDocsKnowledgeFeature();
	const { enabled: lexiangEnabled } = useTencentLexiangEnabled();
	const agentMailEnabled = useAgentMailFeature();
	const inspirationEnabled = useProductFeature("Discover", {
		mode: "enable",
		defaultEnabled: true
	});
	return (0, import_react$2.useMemo)(() => ({
		"my-files": knowledgeBaseEnabled,
		"tencent-docs": tencentDocsEnabled,
		ima: imaEnabled,
		lexiang: lexiangEnabled,
		inspiration: inspirationEnabled,
		"agent-mail": agentMailEnabled
	}), [
		knowledgeBaseEnabled,
		tencentDocsEnabled,
		imaEnabled,
		lexiangEnabled,
		inspirationEnabled,
		agentMailEnabled
	]);
}
var import_react$2;
var init_use_shell_route_gates = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_use_ima_enabled();
	init_use_knowledge_base_feature();
	init_use_product_feature();
	init_use_tencent_docs_knowledge_feature();
	init_use_tencent_lexiang_enabled();
	init_agent_mail();
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/conversation-open-deep-link-navigation.ts
/**
* 本次 payload 是否应该执行导航副作用。
*
* 返回 true 表示这是一个尚未处理过的新意图（并就地登记）；重复投递 / 回放返回 false。
*/
function shouldNavigateForConversationOpenDeepLink(payload) {
	const deeplinkId = getConversationOpenDeepLinkId(payload);
	if (navigatedDeepLinkIds.has(deeplinkId)) return false;
	if (navigatedDeepLinkIds.size >= NAVIGATED_DEEP_LINK_ID_LIMIT) navigatedDeepLinkIds.clear();
	navigatedDeepLinkIds.add(deeplinkId);
	return true;
}
var navigatedDeepLinkIds, NAVIGATED_DEEP_LINK_ID_LIMIT;
var init_conversation_open_deep_link_navigation = __esmMin((() => {
	init_input_intents();
	navigatedDeepLinkIds = /* @__PURE__ */ new Set();
	NAVIGATED_DEEP_LINK_ID_LIMIT = 200;
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/use-library-open-request-event.ts
function resolveLibraryOpenRequest(detail) {
	if (typeof detail.nodeId === "string" && detail.nodeId.trim()) return {
		kind: "node",
		nodeId: detail.nodeId.trim(),
		...typeof detail.spaceId === "string" && detail.spaceId.trim() ? { spaceId: detail.spaceId.trim() } : {}
	};
	if (typeof detail.spaceId === "string" && detail.spaceId.trim()) return {
		kind: "space",
		spaceId: detail.spaceId.trim()
	};
	return typeof detail.url === "string" ? parseLibraryResourceUrl(detail.url) : null;
}
/** Adapt cross-package UI requests to structured Library Extension navigation. */
function useLibraryOpenRequestEvent() {
	const { isAuthenticated } = useAuth();
	const spaceEnabled = useProductFeature("Space", { mode: "enable" });
	(0, import_react$1.useEffect)(() => {
		if (!spaceEnabled || !isAuthenticated) return;
		const handler = (event) => {
			const detail = event.detail;
			const target = detail ? resolveLibraryOpenRequest(detail) : null;
			if (!target) return;
			event.preventDefault();
			openLibraryTarget(target).catch(() => void 0);
		};
		window.addEventListener(LIBRARY_OPEN_REQUEST_EVENT, handler);
		return () => window.removeEventListener(LIBRARY_OPEN_REQUEST_EVENT, handler);
	}, [isAuthenticated, spaceEnabled]);
}
var import_react$1, LIBRARY_OPEN_REQUEST_EVENT;
var init_use_library_open_request_event = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_product_feature();
	init_library_resource_url();
	init_library_target();
	LIBRARY_OPEN_REQUEST_EVENT = "workbuddy:open-in-space-library";
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/router-effects.tsx
/** 挂载 router 相关全局副作用：route path tracker、route side effects 与 deep-link 桥。 */
function RouterEffects() {
	const location = useLocation();
	const navigate = useNavigate();
	const adapter = useAdapter();
	const conversations = useConversations();
	const gates = useShellRouteGates();
	const conversationsRef = (0, import_react.useRef)(conversations);
	(0, import_react.useEffect)(() => {
		conversationsRef.current = conversations;
	});
	(0, import_react.useEffect)(() => {
		publishShellRouteGates(gates);
	}, [gates]);
	(0, import_react.useEffect)(() => {
		setCurrentRoutePath(location.pathname);
	}, [location.pathname]);
	useRouteSideEffects(location.pathname, conversations);
	useDeepLinkNavigation({
		conversations,
		gates,
		pathname: location.pathname,
		adapter,
		navigate
	});
	useLibraryOpenRequestEvent();
	useLibraryOpenStoragePanelEvent(navigate);
	useInspirationShareCodeReceiver({ onError: (message) => toast.error(message) });
	const navigateRef = (0, import_react.useRef)(navigate);
	navigateRef.current = navigate;
	(0, import_react.useEffect)(() => {
		const subscription = deepLinkConversationOpen$.subscribe((payload) => {
			if (!payload || !shouldNavigateForConversationOpenDeepLink(payload)) return;
			if (payload._skipShellNavigation) return;
			navigateRef.current("/");
			conversationsRef.current.setCurrentConversation?.(null);
			taskStarterCwd$.next("");
		});
		return () => subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspirationShareCodeDetailHost, {});
}
var import_react, import_jsx_runtime;
var init_router_effects = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_task_starter_store();
	init_contexts();
	init_use_deep_link_navigation();
	init_inspiration_share_code();
	init_use_library_open_storage_panel_event();
	init_brand_route_gates();
	init_use_shell_route_gates();
	init_route_path_tracker();
	init_conversation_open_deep_link_navigation();
	init_use_library_open_request_event();
	init_use_route_side_effects();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/index.ts
var init_app_shell = __esmMin((() => {
	init_router_effects();
	init_main_route_outlet();
}));
//#endregion
export { RouterEffects as n, init_router_effects as r, init_app_shell as t };
