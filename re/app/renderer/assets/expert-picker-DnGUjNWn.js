import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $J as init_i18n$1, $w as WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, $y as ExpertGrid, GJ as init_use_locale, Gy as ExpertCategoryTabs, HJ as init_locale_text, Hb as useLocalExperts, Jb as useExpertApi, Jy as setSkipExpertCloudUploadConfirm, K2 as init_environment, KJ as useLocale, Ky as init_expert_category_tabs, PC as init_hooks, Qy as openExpertCloudUploadFlow, R1 as toZhEnLocale, T0 as init_app_core, UJ as init_use_expert_theme, UX as useCloudExpertSyncFeature, Uy as ExpertSearchBar, VJ as getLocalizedText, Vb as init_use_local_experts, WJ as useThemeClassName, Wy as init_expert_search_bar, Yy as shouldSkipExpertCloudUploadConfirm, ZG as useFloatingLayer, Zy as init_open_expert_cloud_upload_flow, d0 as useModuleHost, db as init_asset_cloud_expert_telemetry, e4 as isWorkBuddyDesktop, eY as useExpertI18n, eb as init_expert_grid, f3 as wb, fb as useExpertAssetCloudTelemetry, j1 as init_i18n, jY as init_product_features, k1 as getLocale, krt as Button, m5 as init_src, qb as init_use_expert_api, qy as init_expert_cloud_upload_preference, tT as useBodyClassRefCount, wx as init_context } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { r as useMarketExperts, t as init_use_market_experts } from "./use-market-experts-D8ARbNBj.js";
//#region ../../packages/agent-ui/src/modules/expert/components/expert-picker.less
var init_expert_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/expert-picker-helpers.ts
function getSearchableText(value, locale) {
	if (typeof value === "string") return value.toLowerCase();
	if (!value || typeof value !== "object" || Array.isArray(value)) return "";
	return getLocalizedText(value, locale).toLowerCase();
}
function matchesKeyword(expert, keyword, locale) {
	const normalizedKeyword = keyword.trim().toLowerCase();
	if (!normalizedKeyword) return true;
	return [
		expert.name,
		expert.displayName,
		expert.profession,
		expert.description,
		expert.displayDescription
	].some((value) => getSearchableText(value, locale).includes(normalizedKeyword));
}
function filterLocalExpertsForPicker(params) {
	const { localExperts, activeTab, searchKeyword, locale } = params;
	if (activeTab !== "myExperts" && activeTab !== "myTeams") return [];
	const expectsTeam = activeTab === "myTeams";
	return localExperts.filter((expert) => {
		if (expert.expertType === "team" !== expectsTeam) return false;
		return matchesKeyword(expert, searchKeyword, locale);
	});
}
function shouldLoadLocalExperts(params) {
	const { localExpertsAvailable, activeTab, hideTeamTab, visible, hasExternalSelectedIds } = params;
	return localExpertsAvailable && visible && (activeTab === "myExperts" || activeTab === "myTeams" && !hideTeamTab || hasExternalSelectedIds);
}
var init_expert_picker_helpers = __esmMin((() => {
	init_locale_text();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/use-expert-picker-market-experts.ts
function withOpcCategory(categories) {
	if (categories.some((category) => category.id === OPC_CATEGORY_ID)) return categories;
	return [OPC_CATEGORY, ...categories];
}
function getExpertStableKey(expert) {
	return expert.id || expert.marketExpertId || expert.sourceId || "";
}
function dedupeExperts(experts) {
	const seen = /* @__PURE__ */ new Set();
	return experts.filter((expert) => {
		const key = getExpertStableKey(expert);
		if (!key || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function hasNextPage(loadedCount, pageSize, pageItemCount, total) {
	if (pageItemCount === 0) return false;
	if (typeof total === "number") return loadedCount < total;
	return pageItemCount >= pageSize;
}
function useExpertPickerMarketExperts(params) {
	const { visible, activeTab, selectedCategory, searchKeyword, hideTeamTab, source } = params;
	const isMarketTab = activeTab === "experts" || !hideTeamTab && activeTab === "teams";
	const marketExpertType = activeTab === "teams" ? "team" : "agent";
	const keyword = searchKeyword.trim() || void 0;
	const marketCategoryId = keyword ? null : selectedCategory;
	const isBuiltinSource = source === BUILTIN_SOURCE;
	const isEnterpriseSource = source === ENTERPRISE_SOURCE;
	const isOpcCategory = isBuiltinSource && marketCategoryId === OPC_CATEGORY_ID && marketExpertType === "agent";
	const { accountInfo } = useModuleHost();
	const enterpriseId = accountInfo?.enterpriseId ?? "";
	const shouldLoadEnterprise = visible && isMarketTab && isEnterpriseSource && marketExpertType === "agent" && !!enterpriseId;
	const { listExperts, listCategories } = useExpertApi({ scope: MARKET_SCOPE });
	const builtinResult = useMarketExperts(isOpcCategory ? null : marketCategoryId, searchKeyword, MARKET_SCOPE, {
		enabled: visible && isMarketTab && isBuiltinSource,
		staleWhileRevalidate: true,
		paginated: true,
		expertType: marketExpertType,
		pageSize: EXPERT_PICKER_MARKET_PAGE_SIZE,
		loadExperts: !isOpcCategory
	});
	const [enterpriseCategories, setEnterpriseCategories] = (0, import_react$1.useState)([]);
	const [enterpriseExperts, setEnterpriseExperts] = (0, import_react$1.useState)([]);
	const [isEnterpriseLoading, setIsEnterpriseLoading] = (0, import_react$1.useState)(false);
	const [isEnterpriseLoadingMore, setIsEnterpriseLoadingMore] = (0, import_react$1.useState)(false);
	const [hasMoreEnterpriseExperts, setHasMoreEnterpriseExperts] = (0, import_react$1.useState)(false);
	const [enterpriseError, setEnterpriseError] = (0, import_react$1.useState)(null);
	const enterpriseExpertsRef = (0, import_react$1.useRef)([]);
	const enterprisePageRef = (0, import_react$1.useRef)(1);
	const enterpriseHasMoreRef = (0, import_react$1.useRef)(false);
	const enterpriseLoadingRef = (0, import_react$1.useRef)(false);
	const enterpriseLoadingMoreRef = (0, import_react$1.useRef)(false);
	const enterpriseSeqRef = (0, import_react$1.useRef)(0);
	const [opcExperts, setOpcExperts] = (0, import_react$1.useState)([]);
	const [isOpcLoading, setIsOpcLoading] = (0, import_react$1.useState)(false);
	const [opcError, setOpcError] = (0, import_react$1.useState)(null);
	const [showSourceTabs, setShowSourceTabs] = (0, import_react$1.useState)(false);
	const scanSeqRef = (0, import_react$1.useRef)(0);
	const fetchEnterprisePage = (0, import_react$1.useCallback)(async (page) => {
		const result = await listExperts({
			categoryId: marketCategoryId ?? null,
			source: ENTERPRISE_SOURCE,
			keyword,
			expertType: "agent",
			sortBy: "use_count",
			sortOrder: "desc",
			page,
			pageSize: EXPERT_PICKER_MARKET_PAGE_SIZE
		});
		return {
			items: result && "items" in result ? result.items : [],
			total: result && "total" in result ? result.total : void 0
		};
	}, [
		keyword,
		listExperts,
		marketCategoryId
	]);
	(0, import_react$1.useEffect)(() => {
		if (!visible || activeTab !== "experts" || !enterpriseId) {
			setShowSourceTabs(false);
			return;
		}
		let cancelled = false;
		listExperts({
			categoryId: null,
			source: ENTERPRISE_SOURCE
		}).then((result) => {
			if (cancelled) return;
			const count = result && "items" in result ? result.items.length : 0;
			setShowSourceTabs(count > 0);
		}).catch(() => {
			if (!cancelled) setShowSourceTabs(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		activeTab,
		enterpriseId,
		listExperts,
		visible
	]);
	(0, import_react$1.useEffect)(() => {
		if (!shouldLoadEnterprise) {
			enterpriseExpertsRef.current = [];
			enterpriseHasMoreRef.current = false;
			enterpriseLoadingRef.current = false;
			enterpriseLoadingMoreRef.current = false;
			setEnterpriseExperts([]);
			setEnterpriseCategories([]);
			setHasMoreEnterpriseExperts(false);
			setIsEnterpriseLoading(false);
			setIsEnterpriseLoadingMore(false);
			setEnterpriseError(null);
			return;
		}
		let cancelled = false;
		const seq = ++enterpriseSeqRef.current;
		enterprisePageRef.current = 1;
		enterpriseExpertsRef.current = [];
		enterpriseHasMoreRef.current = false;
		enterpriseLoadingRef.current = true;
		enterpriseLoadingMoreRef.current = false;
		setEnterpriseExperts([]);
		setHasMoreEnterpriseExperts(false);
		setIsEnterpriseLoading(true);
		setIsEnterpriseLoadingMore(false);
		setEnterpriseError(null);
		listCategories({ source: ENTERPRISE_SOURCE }).then((result) => {
			if (!cancelled && seq === enterpriseSeqRef.current) setEnterpriseCategories(result.items ?? []);
		}).catch(() => {
			if (!cancelled && seq === enterpriseSeqRef.current) setEnterpriseCategories([]);
		});
		fetchEnterprisePage(1).then((result) => {
			if (cancelled || seq !== enterpriseSeqRef.current) return;
			const items = dedupeExperts(result.items);
			const nextHasMore = hasNextPage(items.length, EXPERT_PICKER_MARKET_PAGE_SIZE, result.items.length, result.total);
			enterpriseExpertsRef.current = items;
			enterpriseHasMoreRef.current = nextHasMore;
			enterpriseLoadingRef.current = false;
			setEnterpriseExperts(items);
			setHasMoreEnterpriseExperts(nextHasMore);
			setIsEnterpriseLoading(false);
		}).catch((error) => {
			if (cancelled || seq !== enterpriseSeqRef.current) return;
			enterpriseExpertsRef.current = [];
			enterpriseHasMoreRef.current = false;
			enterpriseLoadingRef.current = false;
			setEnterpriseExperts([]);
			setHasMoreEnterpriseExperts(false);
			setIsEnterpriseLoading(false);
			setEnterpriseError(error instanceof Error ? error.message : String(error));
		});
		return () => {
			cancelled = true;
		};
	}, [
		fetchEnterprisePage,
		listCategories,
		shouldLoadEnterprise
	]);
	const loadMoreEnterpriseExperts = (0, import_react$1.useCallback)(async () => {
		if (!shouldLoadEnterprise || !enterpriseHasMoreRef.current || enterpriseLoadingRef.current || enterpriseLoadingMoreRef.current) return;
		const seq = enterpriseSeqRef.current;
		const nextPage = enterprisePageRef.current + 1;
		enterpriseLoadingMoreRef.current = true;
		setIsEnterpriseLoadingMore(true);
		try {
			const result = await fetchEnterprisePage(nextPage);
			if (seq !== enterpriseSeqRef.current) return;
			const nextExperts = dedupeExperts([...enterpriseExpertsRef.current, ...result.items]);
			const nextHasMore = hasNextPage(nextExperts.length, EXPERT_PICKER_MARKET_PAGE_SIZE, result.items.length, result.total);
			enterprisePageRef.current = nextPage;
			enterpriseExpertsRef.current = nextExperts;
			enterpriseHasMoreRef.current = nextHasMore;
			setEnterpriseExperts(nextExperts);
			setHasMoreEnterpriseExperts(nextHasMore);
		} catch (error) {
			if (seq === enterpriseSeqRef.current) setEnterpriseError(error instanceof Error ? error.message : String(error));
		} finally {
			if (seq === enterpriseSeqRef.current) {
				enterpriseLoadingMoreRef.current = false;
				setIsEnterpriseLoadingMore(false);
			}
		}
	}, [fetchEnterprisePage, shouldLoadEnterprise]);
	(0, import_react$1.useEffect)(() => {
		if (!visible || !isMarketTab || !isOpcCategory) {
			scanSeqRef.current += 1;
			setOpcExperts([]);
			setIsOpcLoading(false);
			setOpcError(null);
			return;
		}
		let cancelled = false;
		const seq = ++scanSeqRef.current;
		setOpcExperts([]);
		setIsOpcLoading(true);
		setOpcError(null);
		const scanOpcExperts = async () => {
			const collected = [];
			let scannedCount = 0;
			let page = 1;
			while (!cancelled) {
				const result = await listExperts({
					categoryId: null,
					source: BUILTIN_SOURCE,
					expertType: "agent",
					sortBy: "reco_rank",
					sortOrder: "desc",
					page,
					pageSize: EXPERT_PICKER_MARKET_PAGE_SIZE
				});
				if (cancelled || seq !== scanSeqRef.current) return;
				const pageItems = result && "items" in result ? result.items : [];
				scannedCount += pageItems.length;
				const opcPageItems = pageItems.filter((expert) => expert.isOPC === true);
				if (opcPageItems.length > 0) {
					collected.push(...opcPageItems);
					setOpcExperts(dedupeExperts(collected));
				}
				const total = result && "total" in result ? result.total : void 0;
				if (!hasNextPage(scannedCount, EXPERT_PICKER_MARKET_PAGE_SIZE, pageItems.length, total)) break;
				page += 1;
			}
		};
		scanOpcExperts().catch((error) => {
			if (cancelled || seq !== scanSeqRef.current) return;
			setOpcError(error instanceof Error ? error.message : String(error));
		}).finally(() => {
			if (cancelled || seq !== scanSeqRef.current) return;
			setIsOpcLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		isMarketTab,
		isOpcCategory,
		listExperts,
		visible
	]);
	const builtinCategories = (0, import_react$1.useMemo)(() => isBuiltinSource && marketExpertType === "agent" && !keyword ? withOpcCategory(builtinResult.categories) : builtinResult.categories, [
		builtinResult.categories,
		isBuiltinSource,
		keyword,
		marketExpertType
	]);
	if (isEnterpriseSource) return {
		categories: enterpriseCategories,
		experts: enterpriseExperts,
		allExperts: enterpriseExperts,
		isLoading: isEnterpriseLoading,
		isLoadingMore: isEnterpriseLoadingMore,
		hasMore: hasMoreEnterpriseExperts,
		error: enterpriseError,
		refresh: NOOP_LOAD_MORE,
		loadMore: loadMoreEnterpriseExperts,
		showSourceTabs
	};
	if (isOpcCategory) return {
		...builtinResult,
		categories: builtinCategories,
		experts: opcExperts,
		allExperts: opcExperts,
		isLoading: isOpcLoading && opcExperts.length === 0,
		hasMore: false,
		error: opcError,
		loadMore: NOOP_LOAD_MORE,
		showSourceTabs
	};
	return {
		...builtinResult,
		categories: builtinCategories,
		showSourceTabs
	};
}
var import_react$1, MARKET_SCOPE, BUILTIN_SOURCE, ENTERPRISE_SOURCE, OPC_CATEGORY_ID, EXPERT_PICKER_MARKET_PAGE_SIZE, NOOP_LOAD_MORE, OPC_CATEGORY;
var init_use_expert_picker_market_experts = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_use_expert_api();
	init_use_market_experts();
	MARKET_SCOPE = "default";
	BUILTIN_SOURCE = "builtin";
	ENTERPRISE_SOURCE = "enterprise";
	OPC_CATEGORY_ID = "00-OPC";
	EXPERT_PICKER_MARKET_PAGE_SIZE = 100;
	NOOP_LOAD_MORE = () => Promise.resolve();
	OPC_CATEGORY = {
		id: OPC_CATEGORY_ID,
		name: {
			zh: "OPC·一人公司",
			en: "OPC"
		},
		description: {
			zh: "OPC 专家",
			en: "OPC Experts"
		},
		order: 0
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/expert-picker.tsx
function waitForNextPaint() {
	return new Promise((resolve) => {
		if (typeof requestAnimationFrame === "function") {
			requestAnimationFrame(() => resolve());
			return;
		}
		setTimeout(resolve, 0);
	});
}
function shouldFetchMarketDetail(expert) {
	if (!expert.marketExpertId && expert.name === expert.id) return false;
	const runtimeExpert = expert;
	return !runtimeExpert.isCustomExpert && !runtimeExpert.expertRootDir;
}
var import_react, import_react_dom, import_jsx_runtime, NOOP_SUMMON, ALWAYS_LOADED, CloseIcon, ExpertPicker;
//#endregion
__esmMin((() => {
	init_expert_picker$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_app_core();
	init_hooks();
	init_product_features();
	init_i18n();
	init_environment();
	init_use_expert_api();
	init_use_local_experts();
	init_i18n$1();
	init_use_locale();
	init_expert_search_bar();
	init_expert_category_tabs();
	init_expert_grid();
	init_use_expert_theme();
	init_asset_cloud_expert_telemetry();
	init_expert_cloud_upload_preference();
	init_expert_picker_helpers();
	init_open_expert_cloud_upload_flow();
	init_use_expert_picker_market_experts();
	import_jsx_runtime = require_jsx_runtime();
	NOOP_SUMMON = () => false;
	ALWAYS_LOADED = () => true;
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	ExpertPicker = ({ visible, onSelect, onClose, selectedIds: externalSelectedIds, mode = "multi", hideTeamTab = false, hideMyExpertsTab = false, scope = "default" }) => {
		const t = useExpertI18n();
		const themeClassName = useThemeClassName();
		const locale = useLocale();
		useBodyClassRefCount(WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, visible);
		const overlayZIndex = useFloatingLayer(visible);
		const [activeTab, setActiveTab] = (0, import_react.useState)("experts");
		const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
		const [marketSource, setMarketSource] = (0, import_react.useState)("builtin");
		const [searchKeyword, setSearchKeyword] = (0, import_react.useState)("");
		const [pickedIds, setPickedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
		const [confirming, setConfirming] = (0, import_react.useState)(false);
		const panelRef = (0, import_react.useRef)(null);
		const [syncingExpertIds, setSyncingExpertIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
		const showMyExpertsTab = isWorkBuddyDesktop() && !hideMyExpertsTab;
		const showMyTeamsTab = showMyExpertsTab && !hideTeamTab;
		const isMarketTab = activeTab === "experts" || !hideTeamTab && activeTab === "teams";
		const { categories, experts: marketFilteredExperts, allExperts: marketAllExperts, isLoading: isMarketLoading, hasMore: hasMoreMarketExperts, loadMore: loadMoreMarketExperts, showSourceTabs } = useExpertPickerMarketExperts({
			visible,
			activeTab,
			selectedCategory,
			searchKeyword,
			hideTeamTab,
			source: activeTab === "experts" ? marketSource : "builtin"
		});
		const { uploadCloudSyncExpert, downloadCloudSyncExpert } = useExpertApi({ scope });
		const assetCloudTelemetry = useExpertAssetCloudTelemetry();
		const cloudExpertSyncEnabled = useCloudExpertSyncFeature();
		const hasExternalSelectedIds = (externalSelectedIds?.length ?? 0) > 0;
		const { localExperts, isLoading: isLocalLoading, refresh: refreshLocalExperts } = useLocalExperts(void 0, { enabled: shouldLoadLocalExperts({
			localExpertsAvailable: showMyExpertsTab,
			activeTab,
			hideTeamTab,
			visible,
			hasExternalSelectedIds
		}) });
		const visibleLocalExperts = (0, import_react.useMemo)(() => showMyExpertsTab ? localExperts : [], [localExperts, showMyExpertsTab]);
		const isLoading = activeTab === "myExperts" || activeTab === "myTeams" ? isLocalLoading : isMarketLoading;
		const allExpertsCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const detailCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		(0, import_react.useEffect)(() => {
			for (const e of marketAllExperts) allExpertsCacheRef.current.set(e.id, e);
		}, [marketAllExperts]);
		(0, import_react.useEffect)(() => {
			for (const e of visibleLocalExperts) allExpertsCacheRef.current.set(e.id, e);
		}, [visibleLocalExperts]);
		const filteredExperts = (0, import_react.useMemo)(() => {
			const isTeamTab = !hideTeamTab && activeTab === "teams";
			if (activeTab === "experts" || isTeamTab) return marketFilteredExperts.filter((e) => isTeamTab ? e.expertType === "team" : e.expertType !== "team");
			return filterLocalExpertsForPicker({
				localExperts: visibleLocalExperts,
				activeTab,
				searchKeyword,
				locale
			});
		}, [
			marketFilteredExperts,
			visibleLocalExperts,
			activeTab,
			hideTeamTab,
			searchKeyword,
			locale
		]);
		const filteredAllExperts = (0, import_react.useMemo)(() => {
			if (activeTab === "myExperts" || activeTab === "myTeams") {
				const expectsTeam = activeTab === "myTeams";
				return visibleLocalExperts.filter((e) => e.expertType === "team" === expectsTeam);
			}
			const isTeamTab = !hideTeamTab && activeTab === "teams";
			return marketAllExperts.filter((e) => isTeamTab ? e.expertType === "team" : e.expertType !== "team");
		}, [
			marketAllExperts,
			visibleLocalExperts,
			activeTab,
			hideTeamTab
		]);
		const mergedSelectedIds = pickedIds;
		const prevVisibleRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			if (visible && !prevVisibleRef.current) {
				setActiveTab("experts");
				setSelectedCategory(null);
				setMarketSource("builtin");
				setSearchKeyword("");
				setPickedIds(new Set(externalSelectedIds ?? []));
				setConfirming(false);
				allExpertsCacheRef.current = new Map(localExperts.map((expert) => [expert.id, expert]));
			}
			prevVisibleRef.current = visible;
		}, [
			visible,
			externalSelectedIds,
			localExperts
		]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const externalIds = externalSelectedIds ?? [];
			if (externalIds.length === 0) return;
			if (marketAllExperts.length === 0 && visibleLocalExperts.length === 0) return;
			const allPool = [...marketAllExperts, ...visibleLocalExperts];
			const directIdSet = new Set(allPool.map((e) => e.id));
			const marketIdLookup = /* @__PURE__ */ new Map();
			const professionLookup = /* @__PURE__ */ new Map();
			for (const e of allPool) {
				if (e.marketExpertId) marketIdLookup.set(e.marketExpertId, e.id);
				if (e.profession?.zh) professionLookup.set(e.profession.zh, e.id);
				if (e.profession?.en) professionLookup.set(e.profession.en, e.id);
			}
			const resolvedIds = /* @__PURE__ */ new Set();
			let hasResolution = false;
			const unresolvedIds = [];
			for (const extId of externalIds) if (directIdSet.has(extId)) {
				resolvedIds.add(extId);
				hasResolution = true;
			} else if (marketIdLookup.has(extId)) {
				resolvedIds.add(marketIdLookup.get(extId));
				hasResolution = true;
			} else unresolvedIds.push(extId);
			for (const extId of unresolvedIds) {
				const resolved = professionLookup.get(extId);
				if (resolved) {
					resolvedIds.add(resolved);
					hasResolution = true;
				} else resolvedIds.add(extId);
			}
			if (hasResolution) setPickedIds(resolvedIds);
		}, [
			visible,
			marketAllExperts,
			visibleLocalExperts,
			externalSelectedIds
		]);
		const loadExpertDetail = (0, import_react.useCallback)(async (raw) => {
			if (!shouldFetchMarketDetail(raw)) return raw;
			const detailLocale = toZhEnLocale(getLocale());
			const cacheKey = `${detailLocale}:${raw.id}`;
			let detailPromise = detailCacheRef.current.get(cacheKey);
			if (!detailPromise) {
				detailPromise = wb.experts.get({
					expertId: raw.id,
					locale: detailLocale
				});
				detailCacheRef.current.set(cacheKey, detailPromise);
			}
			try {
				const detail = await detailPromise;
				return detail ? {
					...raw,
					...detail
				} : raw;
			} catch (err) {
				detailCacheRef.current.delete(cacheKey);
				console.warn("[ExpertPicker] wb.experts.get failed, fallback to list version:", raw.id, err);
				return raw;
			}
		}, []);
		const prefetchExpertDetail = (0, import_react.useCallback)((expertId) => {
			const expert = allExpertsCacheRef.current.get(expertId);
			if (expert) loadExpertDetail(expert).catch(() => void 0);
		}, [loadExpertDetail]);
		const handleTabChange = (0, import_react.useCallback)((tab) => {
			setActiveTab(tab);
			setSelectedCategory(null);
		}, []);
		const handleMarketSourceChange = (0, import_react.useCallback)((next) => {
			if (next === marketSource) return;
			setMarketSource(next);
			setSelectedCategory(null);
			setSearchKeyword("");
		}, [marketSource]);
		(0, import_react.useEffect)(() => {
			if (!showSourceTabs && marketSource === "enterprise") {
				setMarketSource("builtin");
				setSelectedCategory(null);
				setSearchKeyword("");
			}
		}, [marketSource, showSourceTabs]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape" && !confirming) onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			visible,
			onClose,
			confirming
		]);
		const applyToggle = (0, import_react.useCallback)((expertId) => {
			if (mode === "single") {
				if (allExpertsCacheRef.current.get(expertId)) {
					prefetchExpertDetail(expertId);
					setPickedIds(/* @__PURE__ */ new Set([expertId]));
				}
				return;
			}
			setPickedIds((prev) => {
				const next = new Set(prev);
				if (next.has(expertId)) next.delete(expertId);
				else {
					prefetchExpertDetail(expertId);
					next.add(expertId);
				}
				return next;
			});
		}, [mode, prefetchExpertDetail]);
		const handleDownloadThenPick = (0, import_react.useCallback)(async (expert) => {
			const cloudUid = expert.cloudSync?.cloudUid;
			if (!cloudUid) {
				toast.error(t("myExperts.cloud.downloadFailed"));
				return;
			}
			setSyncingExpertIds((prev) => new Set(prev).add(expert.id));
			const startedAt = Date.now();
			const installExpert = {
				id: expert.id,
				name: expert.name,
				displayName: expert.displayName,
				cloudUid,
				cloudName: expert.cloudSync?.name
			};
			try {
				const result = await downloadCloudSyncExpert(cloudUid, expert.cloudSync?.cloud).catch((error) => ({
					success: false,
					error: error instanceof Error ? error.message : String(error)
				}));
				if (!result.success) {
					assetCloudTelemetry.install({
						expert: installExpert,
						status: "failed",
						installTrigger: "silent_on_use",
						startedAt,
						errorCode: "error" in result ? result.error : void 0
					});
					toast.error("error" in result && result.error || t("myExperts.cloud.downloadFailed"));
					return;
				}
				assetCloudTelemetry.install({
					expert: installExpert,
					status: "success",
					installTrigger: "silent_on_use",
					startedAt
				});
				await refreshLocalExperts({ silent: true });
				applyToggle(result.expertId ?? expert.id);
			} finally {
				setSyncingExpertIds((prev) => {
					const next = new Set(prev);
					next.delete(expert.id);
					return next;
				});
			}
		}, [
			applyToggle,
			assetCloudTelemetry,
			downloadCloudSyncExpert,
			refreshLocalExperts,
			t
		]);
		const runUploadExpert = (0, import_react.useCallback)(async (expert, options) => {
			const syncReason = expert.cloudSync?.syncReason;
			const forceOverwrite = syncReason === "conflict_local_wins";
			if (forceOverwrite) {
				if (!window.confirm(t("myExperts.cloud.conflictConfirm"))) return;
			}
			const presence = expert.cloudSync?.presence;
			const isFirstUpload = presence === "local_only";
			const isVersionSync = presence === "local_ahead";
			const telemetryExpert = {
				id: expert.id,
				name: expert.displayName?.zh ?? expert.displayName?.en ?? expert.name,
				cloudUid: expert.cloudSync?.cloudUid
			};
			const startedAt = Date.now();
			setSyncingExpertIds((prev) => new Set(prev).add(expert.id));
			try {
				const result = await openExpertCloudUploadFlow({
					expert,
					t,
					skipOrdinaryConfirm: shouldSkipExpertCloudUploadConfirm(),
					onOrdinaryConfirm: (dontRemind) => setSkipExpertCloudUploadConfirm(void 0, dontRemind),
					upload: (confirmedConfirmationTypes) => uploadCloudSyncExpert(expert.id, forceOverwrite, confirmedConfirmationTypes).catch((error) => ({
						success: false,
						error: error instanceof Error ? error.message : String(error)
					}))
				}) ?? {
					success: false,
					error: t("myExperts.cloud.uploadFailed")
				};
				if (result.success) {
					if (isFirstUpload) assetCloudTelemetry.upload({
						expert: telemetryExpert,
						status: "success",
						uploadMode: "manual_single",
						startedAt
					});
					else if (isVersionSync) assetCloudTelemetry.sync({
						expert: telemetryExpert,
						direction: "to_cloud",
						syncReason,
						status: "success",
						startedAt
					});
					await refreshLocalExperts({ silent: true });
					if (options?.pickAfter) applyToggle(expert.id);
					return;
				}
				if (result.status === "confirmation_required" || result.status === "preflight_blocked") return;
				if ("skipped" in result && result.skipped && result.skipReason === "conflict_local_wins") {
					toast.error(t("myExperts.cloud.conflictNeedConfirm"));
					return;
				}
				if (isFirstUpload) assetCloudTelemetry.upload({
					expert: telemetryExpert,
					status: "failed",
					uploadMode: "manual_single",
					startedAt,
					errorMessage: result.error
				});
				else if (isVersionSync) assetCloudTelemetry.sync({
					expert: telemetryExpert,
					direction: "to_cloud",
					syncReason,
					status: "failed",
					startedAt
				});
				toast.error(result.error || t("myExperts.cloud.uploadFailed"));
			} finally {
				setSyncingExpertIds((prev) => {
					const next = new Set(prev);
					next.delete(expert.id);
					return next;
				});
			}
		}, [
			applyToggle,
			assetCloudTelemetry,
			refreshLocalExperts,
			t,
			uploadCloudSyncExpert
		]);
		const handleBadgeClick = (0, import_react.useCallback)((expertId) => {
			if (cloudExpertSyncEnabled !== true || activeTab !== "myExperts" || scope !== "cloud-in-local") return;
			const expert = allExpertsCacheRef.current.get(expertId);
			const presence = expert?.cloudSync?.presence;
			if (expert && (presence === "local_only" || presence === "local_ahead")) runUploadExpert(expert, { pickAfter: false }).catch(() => {});
		}, [
			cloudExpertSyncEnabled,
			activeTab,
			runUploadExpert,
			scope
		]);
		const handleToggle = (0, import_react.useCallback)((expertId) => {
			if (activeTab === "myExperts") {
				const expert = allExpertsCacheRef.current.get(expertId);
				const presence = expert?.cloudSync?.presence;
				const cloudChecking = expert?.cloudSync?.cloudStatus === "checking";
				if (cloudExpertSyncEnabled === true && expert && presence && !cloudChecking) {
					if (scope === "cloud-in-local") {
						if (presence === "local_only") {
							runUploadExpert(expert, { pickAfter: true }).catch(() => {});
							return;
						}
					} else if (presence === "cloud_only") {
						handleDownloadThenPick(expert).catch(() => {});
						return;
					}
				}
			}
			applyToggle(expertId);
		}, [
			cloudExpertSyncEnabled,
			activeTab,
			applyToggle,
			handleDownloadThenPick,
			runUploadExpert,
			scope
		]);
		const guardDisabledIds = (0, import_react.useMemo)(() => {
			if (activeTab !== "myExperts") return syncingExpertIds;
			const next = new Set(syncingExpertIds);
			for (const e of visibleLocalExperts) if (e.cloudSync?.cloudStatus === "checking") next.add(e.id);
			return next;
		}, [
			activeTab,
			syncingExpertIds,
			visibleLocalExperts
		]);
		const cloudSyncBadgeVariant = cloudExpertSyncEnabled === true && activeTab === "myExperts" ? scope === "cloud-in-local" ? "picker" : void 0 : void 0;
		const handleConfirm = (0, import_react.useCallback)(async () => {
			if (confirming) return;
			if (pickedIds.size === 0) {
				onSelect([]);
				onClose();
				return;
			}
			setConfirming(true);
			try {
				await waitForNextPaint();
				const cache = allExpertsCacheRef.current;
				const selectedExperts = [];
				const externalIdSet = new Set(externalSelectedIds ?? []);
				for (const id of pickedIds) {
					const expert = cache.get(id);
					if (expert) {
						selectedExperts.push(expert);
						continue;
					}
					if (externalIdSet.has(id)) selectedExperts.push({
						id,
						marketExpertId: id,
						categoryId: "",
						name: id,
						profession: {},
						description: {},
						avatar: ""
					});
				}
				onSelect(await Promise.all(selectedExperts.map(loadExpertDetail)));
			} catch (error) {
				setConfirming(false);
				throw error;
			}
		}, [
			confirming,
			pickedIds,
			onSelect,
			onClose,
			externalSelectedIds,
			loadExpertDetail
		]);
		const handleOverlayClick = (0, import_react.useCallback)((e) => {
			if (confirming) return;
			if (e.target === e.currentTarget) onClose();
		}, [confirming, onClose]);
		if (!visible) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `ec-picker-overlay ${themeClassName}`,
			style: { zIndex: overlayZIndex },
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ec-picker-panel",
				ref: panelRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ec-picker-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "ec-picker-title",
							children: t("picker.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-picker-header-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertSearchBar, {
								value: searchKeyword,
								onChange: setSearchKeyword,
								variant: "filled"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ec-picker-close",
								onClick: onClose,
								"aria-label": "Close",
								disabled: confirming,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ec-picker-filters",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-picker-tabs-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ec-picker-tabs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `ec-picker-tab${activeTab === "experts" ? " ec-picker-tab--active" : ""}`,
										onClick: () => handleTabChange("experts"),
										children: t("expertSection")
									}),
									!hideTeamTab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `ec-picker-tab${activeTab === "teams" ? " ec-picker-tab--active" : ""}`,
										onClick: () => handleTabChange("teams"),
										children: t("teamSection")
									}),
									showMyExpertsTab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `ec-picker-tab${activeTab === "myExperts" ? " ec-picker-tab--active" : ""}`,
										onClick: () => handleTabChange("myExperts"),
										children: t("myExperts")
									}),
									showMyTeamsTab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `ec-picker-tab${activeTab === "myTeams" ? " ec-picker-tab--active" : ""}`,
										onClick: () => handleTabChange("myTeams"),
										children: t("picker.myTeams")
									})
								]
							}), activeTab === "experts" && showSourceTabs && !searchKeyword.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ec-picker-source-tabs",
								role: "tablist",
								"aria-label": t("expertSection"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									role: "tab",
									"aria-selected": marketSource === "builtin",
									className: `ec-picker-source-tab${marketSource === "builtin" ? " is-active" : ""}`,
									onClick: () => handleMarketSourceChange("builtin"),
									children: t("source.builtin")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									role: "tab",
									"aria-selected": marketSource === "enterprise",
									className: `ec-picker-source-tab${marketSource === "enterprise" ? " is-active" : ""}`,
									onClick: () => handleMarketSourceChange("enterprise"),
									children: t("source.enterprise")
								})]
							}) : null]
						}), activeTab !== "myExperts" && activeTab !== "myTeams" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertCategoryTabs, {
							categories,
							allExperts: filteredAllExperts,
							selectedCategory,
							onChange: setSelectedCategory,
							hidden: !!searchKeyword
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ec-picker-body",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ec-picker-loading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ec-grid-spinner" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertGrid, {
							experts: filteredExperts,
							onSummon: NOOP_SUMMON,
							isExpertLoaded: ALWAYS_LOADED,
							searchKeyword,
							searchResultType: activeTab === "teams" || activeTab === "myTeams" ? "team" : "expert",
							disableCollapse: true,
							mode: "pick",
							selectedIds: mergedSelectedIds,
							disabledIds: guardDisabledIds,
							onToggle: handleToggle,
							onEndReached: isMarketTab && hasMoreMarketExperts ? loadMoreMarketExperts : void 0,
							cloudSyncBadgeVariant,
							cloudSyncBadgeLoadingIds: syncingExpertIds,
							onCloudSyncBadgeClick: handleBadgeClick
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ec-picker-footer",
						children: [pickedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ec-picker-count",
							children: t("picker.selectedCount", { count: String(pickedIds.size) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-picker-footer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "grey",
								size: "medium",
								className: "ec-picker-btn",
								onClick: onClose,
								disabled: confirming,
								children: t("picker.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "primary",
								size: "medium",
								className: "ec-picker-btn",
								onClick: handleConfirm,
								disabled: pickedIds.size === 0 && (externalSelectedIds?.length ?? 0) === 0,
								loading: confirming,
								children: t("picker.confirm")
							})]
						})]
					})
				]
			})
		}), document.body);
	};
}))();
export { ExpertPicker as default };
