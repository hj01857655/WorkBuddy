import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A5 as Breadcrumb, Ay as init_expert, C3 as useLocation, D1 as useI18n, E1 as init_useI18n, FO as markMarketPageLoadStart, MO as init_market_perf, NO as getMarketPageLoadStore, Nnt as ChevronLeftIcon, Ry as ExpertCenterPage, Zd as init_skills_route, ak as init_unified_market_header, ik as UnifiedMarketHeader, m5 as init_src, ok as marketTabToPath, sk as useVisibleMarketTabs, w3 as useNavigate, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { i as init_connector_panel, n as init_skills_panel, r as ConnectorPanel, t as SkillsPanel } from "./skills-panel-amdjw3i0.js";
//#region ../../packages/agent-ui/src/components/unified-market/skills-route-tab.ts
/** 「管理技能」入口带 `?tab=installed`，直达「我安装的」（#95677）。 */
function resolveSkillsInitialLevel1Tab(search) {
	return new URLSearchParams(search).get("tab") === "installed" ? "installed" : void 0;
}
var init_skills_route_tab = __esmMin((() => {
	init_skills_route();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/unified-market/unified-market-page.tsx
/** 从 pathname 解析当前 tab */
function resolveTab(pathname) {
	if (pathname.startsWith("/skills")) return "skills";
	if (pathname.startsWith("/connectors")) return "connectors";
	return "experts";
}
var import_react$1, import_jsx_runtime$1, UnifiedMarketPage;
var init_unified_market_page = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_useI18n();
	init_connector_panel();
	init_expert();
	init_skills_panel();
	init_market_perf();
	init_skills_route_tab();
	init_unified_market_header();
	import_jsx_runtime$1 = require_jsx_runtime();
	UnifiedMarketPage = ({ visible = true, active = true, initialTab }) => {
		const location = useLocation();
		const navigate = useNavigate();
		const { t } = useI18n();
		const activeTab = (0, import_react$1.useMemo)(() => initialTab ?? resolveTab(location.pathname), [initialTab, location.pathname]);
		const skillsInitialLevel1Tab = (0, import_react$1.useMemo)(() => resolveSkillsInitialLevel1Tab(location.search), [location.search]);
		const visibleTabs = useVisibleMarketTabs();
		(0, import_react$1.useEffect)(() => {
			if (visibleTabs.length === 0) return;
			if (!visibleTabs.some((tab) => tab.key === activeTab)) {
				const nextTab = visibleTabs[0].key;
				if (nextTab !== activeTab) markMarketPageLoadStart(getMarketPageLoadStore(), {
					tab: nextTab,
					from: location.pathname,
					trigger: "menu_click",
					t0: Date.now()
				});
				navigate(marketTabToPath(nextTab), { replace: true });
			}
		}, [
			visibleTabs,
			activeTab,
			navigate,
			location.pathname
		]);
		const handleTabChange = (0, import_react$1.useCallback)((tab) => {
			if (tab === activeTab) return;
			markMarketPageLoadStart(getMarketPageLoadStore(), {
				tab,
				from: location.pathname,
				trigger: "menu_click",
				t0: Date.now()
			});
			navigate(marketTabToPath(tab));
		}, [
			activeTab,
			navigate,
			location.pathname
		]);
		/**
		* 技能详情态 header 左侧渲染策略：
		*   - 从「我安装的」进入 → 两级面包屑「全部技能 / 我安装的」，配 ChevronLeft 作为 leadingIcon，
		*     与「我安装的」子页的返回按钮视觉一致
		*   - 从「全部技能」直接进入 → 返回 null，让 SkillsPanel 用默认的"‹ 技能"返回按钮
		*
		* 这里把 Breadcrumb 装配放在路由层而不是 SkillsPanel 内部，
		* 是为了让 SkillsPanel 不感知具体导航 UI 形态（解耦原则）。
		*/
		const renderSkillsDetailBack = (0, import_react$1.useCallback)((ctx) => {
			if (!ctx.fromInstalled) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Breadcrumb, {
				highlightLast: true,
				leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronLeftIcon, {
					width: 16,
					height: 16
				}),
				onLeadingIconClick: () => ctx.onBackToInstalled(),
				leadingIconAriaLabel: t("unifiedMarket.myInstalled"),
				items: [{
					key: "all-skills",
					label: t("unifiedMarket.backToAllSkills"),
					onClick: (e) => {
						e.preventDefault();
						ctx.onBackToMarket();
					}
				}, {
					key: "installed",
					label: t("unifiedMarket.myInstalled"),
					onClick: (e) => {
						e.preventDefault();
						ctx.onBackToInstalled();
					}
				}]
			});
		}, [t]);
		if (!visible) return null;
		const tabs = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(UnifiedMarketHeader, {
			activeTab,
			onTabChange: handleTabChange
		});
		switch (activeTab) {
			case "connectors": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorPanel, {
				visible: true,
				active,
				hideHeader: true,
				headerLeft: tabs
			});
			case "skills": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillsPanel, {
				visible,
				active,
				headerLeft: tabs,
				renderDetailBack: renderSkillsDetailBack,
				initialLevel1Tab: skillsInitialLevel1Tab
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertCenterPage, {
				visible,
				active,
				headerLeft: tabs
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/market.tsx
function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifiedMarketPage, {
		visible: true,
		active: true
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_unified_market_page();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { MarketPage };
