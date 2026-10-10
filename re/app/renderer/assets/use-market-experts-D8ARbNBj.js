import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Jb as useExpertApi, Xb as init_expert_api, Yb as createExpertApi, d0 as useModuleHost, qb as init_use_expert_api, wx as init_context } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/expert/hooks/use-market-experts.ts
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
function stableStringify(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value);
	if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).filter((key) => record[key] !== void 0).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}
function buildFirstPageCacheParams(params) {
	return {
		scope: params.scope,
		enterpriseId: params.enterpriseId,
		source: MARKET_SOURCE,
		categoryId: params.categoryId ?? null,
		keyword: params.keyword,
		expertType: params.expertType,
		sortBy: params.sortBy ?? "reco_rank",
		sortOrder: params.sortOrder ?? "desc",
		page: 1,
		pageSize: params.pageSize ?? PICKER_PAGE_SIZE
	};
}
function buildFirstPageCacheKey(params) {
	return stableStringify(params);
}
function buildCategoryCacheScope(scope, enterpriseId) {
	return `${scope}:${enterpriseId}`;
}
function canUsePreloadedFirstPage(params) {
	return params.categoryId === null && !params.keyword && params.expertType === "agent" && params.sortBy === "reco_rank" && params.sortOrder === "desc" && params.pageSize === PICKER_PAGE_SIZE;
}
function preloadMarketExpertsFirstPage(scope = "default", enterpriseId = "") {
	const params = buildFirstPageCacheParams({
		scope,
		enterpriseId,
		expertType: "agent"
	});
	const cacheKey = buildFirstPageCacheKey(params);
	const cached = firstPageCache.get(cacheKey);
	if (cached) return Promise.resolve(cached);
	const existing = firstPageRequestCache.get(cacheKey);
	if (existing) return existing;
	const request = (async () => {
		const result = await createExpertApi({ scope }).listExperts({
			categoryId: params.categoryId,
			source: params.source,
			expertType: params.expertType,
			sortBy: params.sortBy,
			sortOrder: params.sortOrder,
			page: params.page,
			pageSize: params.pageSize
		});
		const experts = dedupeExperts(result && "items" in result ? result.items : []);
		firstPageCache.set(cacheKey, experts);
		return experts;
	})().finally(() => {
		firstPageRequestCache.delete(cacheKey);
	});
	firstPageRequestCache.set(cacheKey, request);
	return request;
}
function useMarketExperts(categoryId, searchKeyword, scope = "default", options = {}) {
	const enabled = options.enabled ?? true;
	const staleWhileRevalidate = options.staleWhileRevalidate ?? false;
	const expertType = options.expertType;
	const shouldLoadExperts = options.loadExperts ?? true;
	const pageSize = options.pageSize ?? PICKER_PAGE_SIZE;
	const sortBy = options.sortBy ?? "reco_rank";
	const sortOrder = options.sortOrder ?? "desc";
	const keyword = (0, import_react.useMemo)(() => searchKeyword?.trim() || void 0, [searchKeyword]);
	const { accountInfo } = useModuleHost();
	const enterpriseId = accountInfo?.enterpriseId ?? "";
	const categoryCacheScope = buildCategoryCacheScope(scope, enterpriseId);
	const firstPageCacheParams = (0, import_react.useMemo)(() => buildFirstPageCacheParams({
		scope,
		enterpriseId,
		categoryId,
		keyword,
		expertType,
		sortBy,
		sortOrder,
		pageSize
	}), [
		categoryId,
		enterpriseId,
		expertType,
		keyword,
		pageSize,
		scope,
		sortBy,
		sortOrder
	]);
	const firstPageCacheKey = (0, import_react.useMemo)(() => buildFirstPageCacheKey(firstPageCacheParams), [firstPageCacheParams]);
	const canUseFirstPageCache = canUsePreloadedFirstPage(firstPageCacheParams);
	const initialCachedFirstPage = canUseFirstPageCache && shouldLoadExperts ? firstPageCache.get(firstPageCacheKey) : void 0;
	const { listExperts, listMarketCategories } = useExpertApi({ scope });
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [allExperts, setAllExperts] = (0, import_react.useState)(() => initialCachedFirstPage ?? []);
	const [isLoading, setIsLoading] = (0, import_react.useState)(enabled && shouldLoadExperts && !initialCachedFirstPage?.length);
	const [isLoadingMore, setIsLoadingMore] = (0, import_react.useState)(false);
	const [hasMore, setHasMore] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const allExpertsRef = (0, import_react.useRef)(initialCachedFirstPage ?? []);
	const hasMoreRef = (0, import_react.useRef)(false);
	const isLoadingRef = (0, import_react.useRef)(enabled && shouldLoadExperts && !initialCachedFirstPage?.length);
	const isLoadingMoreRef = (0, import_react.useRef)(false);
	const currentPageRef = (0, import_react.useRef)(1);
	const requestSeqRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		let cancelled = false;
		const fetchCategories = async () => {
			try {
				return (await listMarketCategories({ source: MARKET_SOURCE })).items ?? [];
			} catch (err) {
				console.warn("[ExpertMarket] market.categories failed:", String(err));
				throw err;
			}
		};
		const applyCategories = (items) => {
			if (!cancelled) setCategories(items);
		};
		const loadDirectly = () => {
			Promise.resolve().then(fetchCategories).then(applyCategories).catch(() => void 0);
		};
		if (staleWhileRevalidate) try {
			wb.utils.swr(["expert-market:categories", { cacheScope: categoryCacheScope }], fetchCategories, applyCategories);
		} catch {
			loadDirectly();
		}
		else loadDirectly();
		return () => {
			cancelled = true;
		};
	}, [
		categoryCacheScope,
		enabled,
		listMarketCategories,
		staleWhileRevalidate
	]);
	const fetchPage = (0, import_react.useCallback)(async (page) => {
		const result = await listExperts({
			categoryId: categoryId ?? null,
			source: MARKET_SOURCE,
			keyword,
			expertType,
			sortBy,
			sortOrder,
			page,
			pageSize
		});
		return {
			items: result && "items" in result ? result.items : [],
			total: result && "total" in result ? result.total : void 0
		};
	}, [
		categoryId,
		expertType,
		keyword,
		listExperts,
		pageSize,
		sortBy,
		sortOrder
	]);
	(0, import_react.useEffect)(() => {
		if (!enabled || !shouldLoadExperts) {
			allExpertsRef.current = [];
			hasMoreRef.current = false;
			isLoadingRef.current = false;
			isLoadingMoreRef.current = false;
			setAllExperts([]);
			setIsLoading(false);
			setIsLoadingMore(false);
			setHasMore(false);
			return;
		}
		let cancelled = false;
		const cachedFirstPage = canUseFirstPageCache ? firstPageCache.get(firstPageCacheKey) : void 0;
		const seq = ++requestSeqRef.current;
		const loadingFirstPage = !cachedFirstPage?.length;
		currentPageRef.current = 1;
		allExpertsRef.current = cachedFirstPage ?? [];
		hasMoreRef.current = false;
		isLoadingRef.current = loadingFirstPage;
		isLoadingMoreRef.current = false;
		setAllExperts(cachedFirstPage ?? []);
		setIsLoading(loadingFirstPage);
		setIsLoadingMore(false);
		setHasMore(false);
		setError(null);
		fetchPage(1).then((result) => {
			if (cancelled || seq !== requestSeqRef.current) return;
			const items = dedupeExperts(result.items);
			if (canUseFirstPageCache) firstPageCache.set(firstPageCacheKey, items);
			const nextHasMore = hasNextPage(items.length, pageSize, result.items.length, result.total);
			allExpertsRef.current = items;
			hasMoreRef.current = nextHasMore;
			isLoadingRef.current = false;
			setAllExperts(items);
			setHasMore(nextHasMore);
			setIsLoading(false);
			setError(null);
		}).catch((err) => {
			if (cancelled || seq !== requestSeqRef.current) return;
			allExpertsRef.current = [];
			hasMoreRef.current = false;
			isLoadingRef.current = false;
			setAllExperts([]);
			setHasMore(false);
			setIsLoading(false);
			setError(err instanceof Error ? err.message : String(err));
		});
		return () => {
			cancelled = true;
		};
	}, [
		canUseFirstPageCache,
		enabled,
		fetchPage,
		firstPageCacheKey,
		pageSize,
		shouldLoadExperts
	]);
	const loadMore = (0, import_react.useCallback)(async () => {
		if (!enabled || !shouldLoadExperts || !hasMoreRef.current || isLoadingRef.current || isLoadingMoreRef.current) return;
		const seq = requestSeqRef.current;
		const nextPage = currentPageRef.current + 1;
		isLoadingMoreRef.current = true;
		setIsLoadingMore(true);
		try {
			const result = await fetchPage(nextPage);
			if (seq !== requestSeqRef.current) return;
			const nextExperts = dedupeExperts([...allExpertsRef.current, ...result.items]);
			const nextHasMore = hasNextPage(nextExperts.length, pageSize, result.items.length, result.total);
			allExpertsRef.current = nextExperts;
			hasMoreRef.current = nextHasMore;
			setAllExperts(nextExperts);
			currentPageRef.current = nextPage;
			setHasMore(nextHasMore);
		} catch (err) {
			if (seq === requestSeqRef.current) setError(err instanceof Error ? err.message : String(err));
		} finally {
			if (seq === requestSeqRef.current) {
				isLoadingMoreRef.current = false;
				setIsLoadingMore(false);
			}
		}
	}, [
		enabled,
		fetchPage,
		pageSize,
		shouldLoadExperts
	]);
	return {
		categories,
		experts: allExperts,
		allExperts,
		isLoading,
		isLoadingMore,
		hasMore,
		error,
		refresh: (0, import_react.useCallback)(async () => {
			const seq = ++requestSeqRef.current;
			currentPageRef.current = 1;
			isLoadingRef.current = true;
			isLoadingMoreRef.current = false;
			hasMoreRef.current = false;
			setIsLoading(true);
			setIsLoadingMore(false);
			setError(null);
			try {
				const result = await fetchPage(1);
				if (seq !== requestSeqRef.current) return;
				const items = dedupeExperts(result.items);
				if (canUseFirstPageCache) firstPageCache.set(firstPageCacheKey, items);
				const nextHasMore = hasNextPage(items.length, pageSize, result.items.length, result.total);
				allExpertsRef.current = items;
				hasMoreRef.current = nextHasMore;
				setAllExperts(items);
				setHasMore(nextHasMore);
			} catch (err) {
				if (seq === requestSeqRef.current) setError(err instanceof Error ? err.message : String(err));
			} finally {
				if (seq === requestSeqRef.current) {
					isLoadingRef.current = false;
					setIsLoading(false);
				}
			}
		}, [
			canUseFirstPageCache,
			fetchPage,
			firstPageCacheKey,
			pageSize
		]),
		loadMore
	};
}
var import_react, MARKET_SOURCE, PICKER_PAGE_SIZE, firstPageCache, firstPageRequestCache;
var init_use_market_experts = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_expert_api();
	init_use_expert_api();
	MARKET_SOURCE = "builtin";
	PICKER_PAGE_SIZE = 20;
	firstPageCache = /* @__PURE__ */ new Map();
	firstPageRequestCache = /* @__PURE__ */ new Map();
}));
//#endregion
export { preloadMarketExpertsFirstPage as n, useMarketExperts as r, init_use_market_experts as t };
