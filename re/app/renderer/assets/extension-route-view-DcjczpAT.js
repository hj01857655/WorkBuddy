import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { C3 as useLocation, E as init_contexts, E3 as useParams, FC as init_use_inspiration_community_flag, Fk as extensionStore, Ik as init_extension_menu_hook, J3 as useConversations, LC as useInspirationCommunityFlagState, ZM as init_client_menu, cO as isInspirationSurfaceAvailable, dz as init_use_product_feature, eZ as useInspirationEntryFeature, fC as WorkBuddyTopBar, fz as useProductFeature, j1 as init_i18n, jY as init_product_features, k1 as getLocale, lN as resolveMenuOverride, pC as init_workbuddy_topbar, pN as useMenuVisibility, sO as init_inspiration_entry_visibility, x3 as Navigate, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as ExtensionMount, r as init_extension_mount } from "./extension-mount-Bz15qT_r.js";
//#region ../../packages/agent-ui/src/router/extension-route-view.tsx
function selectKeepAliveIds(list) {
	const set = /* @__PURE__ */ new Set();
	for (const ext of list) {
		if (ext.enabled === false) continue;
		if (ext.ui?.entry?.keepAlive === true) set.add(ext.id);
	}
	return set;
}
function useKeepAliveIds() {
	const list = (0, import_react.useSyncExternalStore)(extensionStore.subscribe, extensionStore.getSnapshot);
	return (0, import_react.useMemo)(() => selectKeepAliveIds(list), [list]);
}
function ExtensionRouteView() {
	const { extensionId, "*": splat } = useParams();
	const location = useLocation();
	const route = `${splat ? `/${splat}` : "/"}${location.search}${location.hash}`;
	const activeId = location.pathname.startsWith("/extension/") ? extensionId ?? "" : "";
	const discoverFeatureEnabled = useProductFeature("Discover", {
		mode: "enable",
		defaultEnabled: true
	});
	const isInspirationEntryEnabled = useInspirationEntryFeature();
	const { enabled: inspirationCommunityEnabled, loading: inspirationCommunityLoading } = useInspirationCommunityFlagState();
	const menuVisibility = useMenuVisibility();
	const inspirationHidden = resolveMenuOverride(menuVisibility, "inspiration", getLocale() === "en").hidden;
	const inspirationSurfaceAvailable = isInspirationSurfaceAvailable(discoverFeatureEnabled, isInspirationEntryEnabled, inspirationHidden);
	const conversationsContext = useConversations();
	const { setShowDetailPanel } = conversationsContext;
	const sidebarCollapsed = conversationsContext?.sidebarCollapsed ?? false;
	(0, import_react.useEffect)(() => {
		if (activeId === "community") setShowDetailPanel?.(false);
	}, [activeId, setShowDetailPanel]);
	const keepAliveIds = useKeepAliveIds();
	const cacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [, forceRerender] = import_react.useReducer((n) => n + 1, 0);
	if (activeId && keepAliveIds.has(activeId)) {
		const cached = cacheRef.current.get(activeId);
		if (!cached || cached.route !== route) cacheRef.current.set(activeId, {
			extensionId: activeId,
			route
		});
	}
	(0, import_react.useEffect)(() => {
		let changed = false;
		for (const cachedId of cacheRef.current.keys()) if (!keepAliveIds.has(cachedId)) {
			cacheRef.current.delete(cachedId);
			changed = true;
		}
		if (changed) forceRerender();
	}, [keepAliveIds]);
	const cached = Array.from(cacheRef.current.values());
	const inlineMount = !(activeId && keepAliveIds.has(activeId)) && activeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "wb-ext-route-slot wb-ext-route-slot--active wb-ext-route-slot--inline",
		"data-extension-id": activeId,
		style: SLOT_ACTIVE_STYLE,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtensionMount, {
			extensionId: activeId,
			contribution: {
				kind: "entry",
				route
			}
		})
	}) : null;
	if (activeId === "community" && !inspirationCommunityLoading && (!inspirationSurfaceAvailable || !inspirationCommunityEnabled)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: inspirationSurfaceAvailable ? "/discover" : "/",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wb-ext-route-view",
		style: ROOT_STYLE,
		children: [activeId === "community" && sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyTopBar, {
			showUserPromptList: false,
			hideChatSearch: true
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-ext-route-slots",
			style: SLOTS_STYLE,
			children: [cached.map((entry) => {
				const isActive = entry.extensionId === activeId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `wb-ext-route-slot${isActive ? " wb-ext-route-slot--active" : " wb-ext-route-slot--hidden"}`,
					"data-extension-id": entry.extensionId,
					"aria-hidden": !isActive,
					style: isActive ? SLOT_ACTIVE_STYLE : SLOT_HIDDEN_STYLE,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtensionMount, {
						extensionId: entry.extensionId,
						contribution: {
							kind: "entry",
							route: entry.route
						}
					})
				}, entry.extensionId);
			}), inlineMount]
		})]
	});
}
var import_react, import_jsx_runtime, ROOT_STYLE, SLOTS_STYLE, SLOT_ACTIVE_STYLE, SLOT_HIDDEN_STYLE;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_inspiration_entry_visibility();
	init_workbuddy_topbar();
	init_contexts();
	init_product_features();
	init_use_inspiration_community_flag();
	init_use_product_feature();
	init_i18n();
	init_client_menu();
	init_extension_menu_hook();
	init_extension_mount();
	import_jsx_runtime = require_jsx_runtime();
	ROOT_STYLE = {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%"
	};
	SLOTS_STYLE = {
		position: "relative",
		flex: 1,
		minHeight: 0
	};
	SLOT_ACTIVE_STYLE = {
		position: "absolute",
		inset: 0,
		display: "block",
		isolation: "isolate"
	};
	SLOT_HIDDEN_STYLE = {
		position: "absolute",
		inset: 0,
		display: "none"
	};
}))();
export { ExtensionRouteView };
