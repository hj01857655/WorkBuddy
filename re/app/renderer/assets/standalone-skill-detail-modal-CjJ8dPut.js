import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A7 as Input, AM as canManageSkillFromDetail, Bb as textMatchesKeyword, Bp as init_knot_identity, CL as skillListRefresh$, CM as init_skills_utils, CY as init_industry_store, D1 as useI18n, DL as notifySkillsUpdateBadgeRefresh, E as init_contexts, E1 as init_useI18n, Em as SkillAvatar, FS as useFavorites, Fnt as ChevronDownIcon$1, Gp as init_use_plugins, Hp as PLUGINS_INSTALL_TIME_CACHE_KEY, I1 as t, J3 as useConversations, J7 as XCloseIcon, Jp as isBuiltinPlugin, K2 as init_environment, L3 as init_account_context, LQ as init_account, LS as useDiscover, NM as isInstalledListVisibleSkill, O1 as useTranslation, OS as getLocalizedField, Om as init_SkillAvatar, Qrt as init_common, R1 as toZhEnLocale, R3 as useAccount, R5 as Switch, RI as SUITES_AUTO_UPDATE_KEY, RQ as isIOAUser, S1 as useTheme, SM as SKILLS_BATCH_UPDATE_MODAL_DATE_KEY, T0 as init_app_core, T7 as useFloatingLayer, TY as useIndustryStore, Up as getPluginInstalledAt, Vp as knotSkillKey, Vtt as LoadingIcon, WU as createSkillMode$, Wp as getPluginKey, Zet as SearchIcon, _3 as writeCache, _L as init_skill_perf_log, _O as init_task_starter_store, _it as getBuiltinMarketSkillId, _m as init_use_skill_upload_policy, ad as init_common$1, bL as init_high_risk_notification_store, d0 as useModuleHost, e4 as isWorkBuddyDesktop, f3 as wb, g3 as readCache, gA as init_async_security_scan_service, gL as loadInstalledSkillList, h3 as init_local_cache, hA as asyncSecurityScanService, hL as invalidateInstalledSkillList, i7 as Tooltip, j1 as init_i18n, jM as init_types$3, jS as resolvePlaybookAssetUrl, jnt as ChevronUpIcon, k1 as getLocale, kM as SKILLS_WARNING_DISMISSED_KEY, krt as Button, lb as CasePreviewPanel, m5 as init_src, mL as init_installed_skill_list_source, n7 as Dropdown, nb as init_discover_panel, qp as init_builtin_plugin, ub as init_case_preview_panel, vL as skillPerfLog, vm as useSkillUploadPolicy, wL as init_extension_refresh_events, wq as useAgentTelemetry, x1 as init_useTheme, xL as notifySkillListRefresh, xq as init_telemetry, yL as skillPerfTime, zI as init_use_suite_auto_update_preference, zb as init_keyword_match } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, ji as ConfirmDialog, t as init_src$1, zi as MarkdownRenderer } from "./lib-chat-ui-D8Ji0f8n.js";
import { Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
import { n as useTrySkill, t as init_use_try_skill } from "./use-try-skill-DGODl3WX.js";
//#region ../../packages/workbuddy-server/src/skill/common/types.ts
var BuiltinMarketRoutes;
var init_types$1 = __esmMin((() => {
	BuiltinMarketRoutes = { 
	/**
	* 开放平台
	*/
OpenPlatform: "open_platform" };
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/constants/install-status.ts
var InstallStatus;
var init_install_status = __esmMin((() => {
	InstallStatus = {
		/** 未安装 → 可点「安装」 */
		Install: "install",
		/** 已安装且无可用更新 → 禁用「已安装」 */
		Installed: "installed",
		/** 已安装且有可用更新 → 可点「更新」 */
		Update: "update",
		/** 正在安装或更新 → 禁用「安装中」 */
		Installing: "installing"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/constants/collections-status.ts
var CollectionsStatus;
var init_collections_status = __esmMin((() => {
	CollectionsStatus = {
		/** 尚未 bootstrap */
		Idle: "idle",
		/** 请求进行中 */
		Loading: "loading",
		/** 成功拿到并组装完 collections */
		Ready: "ready",
		/** 请求失败或数据为空 */
		Error: "error",
		/** tags/collections 返回 100004，降级通用版 */
		Downgrade: "downgrade"
	};
})), SKILLHUB_SORT_OPTIONS, SKILLHUB_MARKET_URL, SKILLHUB_MARKET_LABEL, KNOT_MARKET_URL, KNOT_MARKET_LABEL;
var init_constants = __esmMin((() => {
	init_install_status();
	init_collections_status();
	init_industry_store();
	SKILLHUB_SORT_OPTIONS = [
		{
			value: "score",
			labelKey: "skills.skillhub.sort.score"
		},
		{
			value: "downloads",
			labelKey: "skills.skillhub.sort.downloads"
		},
		{
			value: "updated_at",
			labelKey: "skills.skillhub.sort.updated_at"
		},
		{
			value: "installs",
			labelKey: "skills.skillhub.sort.installs"
		}
	];
	SKILLHUB_MARKET_URL = "https://skillhub.cn";
	SKILLHUB_MARKET_LABEL = "skillhub.cn";
	KNOT_MARKET_URL = "https://knotService.woa.com/skills/market";
	KNOT_MARKET_LABEL = "knotService.woa.com";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/types.ts
var CollectionSubType, CategorySubType, ClientTabId, MarketView;
var init_types = __esmMin((() => {
	CollectionSubType = {
		Featured: "skill-featured",
		Recommend: "skill-recommend",
		Default: "default",
		SkillHub: "skillhub",
		Plugins: "plugins"
	};
	CategorySubType = {
		All: "all",
		Default: "default"
	};
	ClientTabId = {
		Knot: "knot",
		Enterprise: "enterprise"
	};
	MarketView = {
		Market: "market",
		Installed: "installed",
		SkillDetail: "skill-detail",
		PluginDetail: "plugin-detail"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/collection.ts
/** 按模板 Collection subType / 客户端 Tab id 解析取数入口 */
function resolveCollectionSource(collection) {
	const source = typeof collection === "string" ? collection : collection?.subType;
	if (!source) return "none";
	switch (source) {
		case CollectionSubType.Recommend:
		case CollectionSubType.Featured:
		case CollectionSubType.Default: return "builtin-collection";
		case CollectionSubType.SkillHub: return "skillhub";
		case CollectionSubType.Plugins: return "plugins";
		case ClientTabId.Knot: return "knot";
		case ClientTabId.Enterprise: return "enterprise";
		default: return "none";
	}
}
/** 是否走 Builtin Collection 列表（BuiltinMarketSkill 形态） */
function isBuiltinCollectionSource(source) {
	return source === "builtin-collection";
}
function findAllCategory(categories) {
	return categories.find((cat) => cat.subType === CategorySubType.All);
}
/** 运营骨架里 subType=all 的节点 */
function isAllCategory(cat) {
	return cat.subType === CategorySubType.All;
}
/**
* OpenPlatform skills 列表的 tag_id：
* - 无子分类 → collection.id
* - 有子分类且选中叶子 → 当前分类 id
* - 有子分类且「全部」→ collection.id（与服务端 categoryId || collectionId 一致）
*/
function resolveCollectionTagId(options) {
	const collectionId = options.collectionId.trim();
	if (!collectionId) return;
	if (options.categories.length > 0) {
		const categoryId = options.categoryId?.trim();
		if (categoryId) return categoryId;
		return collectionId;
	}
	return collectionId;
}
/** 有子分类且未选中时，默认取 subType=all 的分类节点 */
function pickDefaultCollectionCategoryId(categories) {
	const allCategory = findAllCategory(categories);
	if (allCategory?.id?.trim()) return allCategory.id.trim();
	return categories[0]?.id?.trim() ?? "";
}
/**
* 搜索场景下的 tag_id：
* - 无子分类 → collectionId
* - 有子分类 → subType=all 的分类节点 id（无 all 时取默认分类）
*/
function resolveCollectionSearchTagId(options) {
	const collectionId = options.collectionId.trim();
	if (!collectionId) return;
	if (options.categories.length === 0) return collectionId;
	const allCategoryId = findAllCategory(options.categories)?.id?.trim();
	if (allCategoryId) return allCategoryId;
	return pickDefaultCollectionCategoryId(options.categories) || void 0;
}
var init_collection = __esmMin((() => {
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/installed-identity.ts
function pushKey(map, key, skill) {
	if (key === void 0 || key === "") return;
	const lower = String(key).toLowerCase();
	const bucket = map.get(lower);
	if (bucket) {
		if (!bucket.includes(skill)) bucket.push(skill);
	} else map.set(lower, [skill]);
}
/** 从 filePath 取安装目录名（SKILL.md 的父目录）。 */
function installedDirName(filePath) {
	if (!filePath) return;
	const segs = filePath.split(/[\\/]/);
	return segs.length >= 2 ? segs[segs.length - 2] : void 0;
}
/**
* 建立强/弱键双索引。
* 自带 slug 或 skillId 的已装记录**不进 name 索引**：它已能被强键精确命中，
* 再开放 name 兜底只会把同名异 slug 的市场卡一并吸过来。
*/
function buildInstalledIdentityIndex(installedSkills) {
	const strong = /* @__PURE__ */ new Map();
	const name = /* @__PURE__ */ new Map();
	for (const skill of installedSkills) {
		pushKey(strong, skill.slug, skill);
		pushKey(strong, skill.skillId, skill);
		pushKey(strong, skill.filePath, skill);
		pushKey(strong, installedDirName(skill.filePath), skill);
		if (!skill.slug && !skill.skillId) pushKey(name, skill.name, skill);
	}
	return {
		strong,
		name
	};
}
/**
* 反查命中的已装 skill。强键优先；强键全 miss 才退 name，
* 且同名候选 >1 时视为未命中（宁可显示成未安装，也不串图）。
*
* @param expectedSources 市场来源白名单。已装侧 `marketplaceSource` **为空时放行**：
*   老安装（deeplink fallback 落 `source:'import'`）该字段恒 undefined，严格拦会把
*   它们判成未装、诱导用户重复安装。只拦「来源已知且不在白名单内」的跨源串扰。
*/
function findInstalledByIdentity(index, query, expectedSources) {
	const sourceOk = (s) => !expectedSources || !s.marketplaceSource || expectedSources.includes(s.marketplaceSource);
	for (const key of query.strong ?? []) {
		if (key === void 0 || key === "") continue;
		const hit = index.strong.get(String(key).toLowerCase())?.find(sourceOk);
		if (hit) return hit;
	}
	const nameKey = query.name?.toLowerCase();
	if (nameKey) {
		const candidates = index.name.get(nameKey)?.filter(sourceOk) ?? [];
		if (candidates.length === 1) return candidates[0];
	}
}
/** `findInstalledByIdentity` 的布尔版，供各源 computeIsInstalled 使用。 */
function hasInstalledIdentity(index, query, expectedSources) {
	return !!findInstalledByIdentity(index, query, expectedSources);
}
var init_installed_identity = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/version.ts
/**
* 比较版本号，判断 remote 是否比 local 更新。
*/
function isNewerVersion(remote, local) {
	if (remote === local) return false;
	const toNum = (v) => {
		const n = Number(v);
		return Number.isFinite(n) ? n : 0;
	};
	const rParts = remote.split(".").map(toNum);
	const lParts = local.split(".").map(toNum);
	for (let i = 0; i < Math.max(rParts.length, lParts.length); i++) {
		const r = rParts[i] ?? 0;
		const l = lParts[i] ?? 0;
		if (r > l) return true;
		if (r < l) return false;
	}
	return false;
}
/**
* Batch-check latest version + display name for slugs via SkillHub detail API.
*
* 自动更新链路必须拿到远端 name：只回 version 会让调用方拿本地旧名当入参，
* 运营侧改名后本地 meta 永久钉在旧名。
*/
async function fetchLatestVersionsDetailed(facade, slugs, concurrency = 5) {
	if (!facade) return {};
	const result = {};
	for (let i = 0; i < slugs.length; i += concurrency) {
		const batch = slugs.slice(i, i + concurrency);
		const settled = await Promise.all(batch.map((slug) => facade.skillhub.getDetail(slug).then((detail) => ({
			slug,
			version: detail?.latestVersion?.version,
			displayName: detail?.skill?.displayName
		}), () => ({
			slug,
			version: void 0,
			displayName: void 0
		}))));
		for (const { slug, version, displayName } of settled) if (version) result[slug] = {
			version,
			displayName: displayName || void 0
		};
	}
	return result;
}
var init_version = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/builtin.ts
var import_zustand$9, DEFAULT_COLLECTION_PAGE_SIZE, MarketBuiltinService;
var init_builtin = __esmMin((() => {
	init_common();
	init_types$1();
	import_zustand$9 = require_zustand();
	init_i18n();
	init_constants();
	init_types();
	init_collection();
	init_installed_identity();
	init_version();
	DEFAULT_COLLECTION_PAGE_SIZE = 100;
	MarketBuiltinService = class {
		/**
		* 构造 MarketBuiltinService
		*/
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$9.create)(() => ({
				installingSkillId: null,
				recentlyInstalledIds: /* @__PURE__ */ new Set(),
				localVersionMap: {},
				remoteVersionMap: {},
				updateCheckCompleted: false,
				collections: {}
			}));
			this.collectionReqIds = /* @__PURE__ */ new Map();
			this.listCache = /* @__PURE__ */ new Map();
		}
		/**
		* 暴露 Zustand store
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 读取 skillsMarketplace facade
		*/
		get facade() {
			try {
				return this.deps.host.facades.skillsMarketplace;
			} catch {
				return;
			}
		}
		/**
		* 读取 builtin facade
		*/
		get builtinFacade() {
			return this.facade?.builtin;
		}
		/**
		* 生成 collection 列表内存缓存 key（按 template / collection / category 分片）
		*/
		buildListCacheKey(collectionId, slice) {
			const templateId = slice.templateId?.trim() || "";
			if (!templateId || !collectionId) return null;
			return [
				templateId,
				collectionId,
				slice.categoryId?.trim() || ""
			].join("|");
		}
		/**
		* 读取第一页内存缓存（skills 为空视为未命中）
		*/
		readListCache(cacheKey) {
			if (!cacheKey) return null;
			const cached = this.listCache.get(cacheKey);
			if (!cached || cached.skills.length === 0) return null;
			return cached;
		}
		/**
		* 写入第一页内存缓存（skills 为空不写；超出上限时删 Map 中最旧条目）
		*/
		writeListCache(cacheKey, entry) {
			if (!cacheKey || entry.skills.length === 0) return;
			if (this.listCache.size >= 12 && !this.listCache.has(cacheKey)) {
				const oldest = this.listCache.keys().next().value;
				if (oldest) this.listCache.delete(oldest);
			}
			this.listCache.delete(cacheKey);
			this.listCache.set(cacheKey, entry);
		}
		/**
		* 读取 collection 浏览分片
		*/
		getCollection(collectionId) {
			return this.store.getState().collections[collectionId] ?? this.emptyCollectionBrowse();
		}
		/**
		* 运营 Collection：默认选中 subType=all 或首个子类（OpenPlatform 叶子 tag_id）
		*/
		ensureDefaultCollectionCategory(collectionId) {
			const slice = this.getCollection(collectionId);
			if (slice.categories.length === 0 || slice.categoryId.trim()) return;
			const defaultCategoryId = pickDefaultCollectionCategoryId(slice.categories);
			if (defaultCategoryId) this.patchCollection(collectionId, { categoryId: defaultCategoryId });
		}
		/**
		* 进入 Collection 后：先灌分类，再按默认子类拉列表
		*/
		async bootstrapCollectionBrowse(collectionId) {
			await this.loadCollectionCategories(collectionId);
			this.ensureDefaultCollectionCategory(collectionId);
			await this.fetchCollectionSkills(collectionId, 1);
		}
		/**
		* 进入 Builtin Collection 浏览
		*/
		enterCollection(options) {
			const { collectionId, subType, templateId, force = false } = options;
			const pageSize = options.pageSize ?? DEFAULT_COLLECTION_PAGE_SIZE;
			if (!isBuiltinCollectionSource(resolveCollectionSource(subType))) return;
			const prev = this.getCollection(collectionId);
			const sameContext = prev.templateId === templateId && prev.subType === subType && prev.pageSize === pageSize;
			if (!force && sameContext && (prev.skills.length > 0 || prev.loading || prev.error)) {
				if (!prev.categoriesReady) this.bootstrapCollectionBrowse(collectionId);
				return;
			}
			const cacheKey = this.buildListCacheKey(collectionId, {
				templateId,
				subType,
				categoryId: prev.categoryId
			});
			const cached = this.readListCache(cacheKey);
			const skills = cached?.skills ?? [];
			this.patchCollection(collectionId, this.emptyCollectionBrowse({
				...prev,
				templateId,
				subType,
				pageSize,
				page: 1,
				total: cached?.total ?? 0,
				loading: skills.length === 0,
				skills,
				categories: [],
				categoriesReady: false
			}));
			this.bootstrapCollectionBrowse(collectionId);
		}
		/**
		* 切换 Collection 分类。
		* 命中新分类内存缓存则先铺缓存做静默刷新；未命中时清空列表进 loading，走骨骼态而非留旧分类数据。
		*/
		setCollectionCategory(collectionId, categoryId) {
			const prev = this.getCollection(collectionId);
			if (prev.categoryId === categoryId) return;
			const cacheKey = this.buildListCacheKey(collectionId, {
				...prev,
				categoryId
			});
			const cached = this.readListCache(cacheKey);
			const skills = cached?.skills ?? [];
			this.patchCollection(collectionId, {
				categoryId,
				page: 1,
				total: cached?.total ?? 0,
				skills,
				loading: skills.length === 0,
				error: false
			});
			this.fetchCollectionSkills(collectionId, 1);
		}
		/**
		* 刷新当前 Collection
		*/
		reloadCollection(collectionId) {
			this.patchCollection(collectionId, { page: 1 });
			this.loadCollectionCategories(collectionId);
			this.fetchCollectionSkills(collectionId, 1);
		}
		/**
		* 加载下一页技能
		*/
		loadMoreCollection(collectionId) {
			const slice = this.getCollection(collectionId);
			if (slice.loading || slice.skills.length >= slice.total) return;
			this.fetchCollectionSkills(collectionId, slice.page + 1);
		}
		/**
		* 是否还有下一页
		*/
		hasMoreCollection(collectionId) {
			const slice = this.getCollection(collectionId);
			return slice.skills.length < slice.total;
		}
		/**
		* 构造空浏览分片
		*/
		emptyCollectionBrowse(overrides) {
			const state = {
				skills: [],
				categories: [],
				categoriesReady: false,
				categoryId: "",
				total: 0,
				page: 1,
				loading: false,
				error: false,
				pageSize: DEFAULT_COLLECTION_PAGE_SIZE,
				templateId: "",
				subType: void 0,
				...overrides
			};
			return {
				...state,
				skills: state.skills ?? [],
				categories: state.categories ?? []
			};
		}
		/**
		* 合并分页技能列表
		*/
		mergeCollectionSkills(current, incoming, page) {
			if (page <= 1) return incoming;
			const seen = new Set(current.map((skill) => skill.id || skill.skill_id).filter(Boolean));
			return [...current, ...incoming.filter((skill) => {
				const id = skill.id || skill.skill_id;
				if (!id || seen.has(id)) return false;
				seen.add(id);
				return true;
			})];
		}
		/**
		* 更新 collection 分片
		*/
		patchCollection(collectionId, patch) {
			this.store.setState((s) => {
				const current = s.collections[collectionId] ?? this.emptyCollectionBrowse();
				return { collections: {
					...s.collections,
					[collectionId]: {
						...current,
						...patch
					}
				} };
			});
		}
		/**
		* 灌入 Collection 分类：只读 marketLayoutService 已合并好的 categories。
		* 企业分类的二次请求（getCategories）在 Layout 加载时完成，这里不再打分类接口。
		*/
		async loadCollectionCategories(collectionId) {
			const slice = this.getCollection(collectionId);
			if (!slice.subType) {
				this.patchCollection(collectionId, {
					categories: [],
					categoriesReady: true
				});
				return;
			}
			const { subType } = slice;
			if (subType === CollectionSubType.Featured || subType === CollectionSubType.SkillHub || subType === CollectionSubType.Plugins) {
				this.patchCollection(collectionId, {
					categories: [],
					categoriesReady: true
				});
				return;
			}
			const remote = this.services.marketLayoutService.getRemoteCollection(collectionId);
			if (!remote) {
				this.patchCollection(collectionId, { categoriesReady: false });
				return;
			}
			const categories = (remote.categories ?? []).filter((cat) => cat.visible);
			this.patchCollection(collectionId, {
				categories,
				categoriesReady: true
			});
			this.ensureDefaultCollectionCategory(collectionId);
		}
		/**
		* 拉取 Collection 技能列表
		*/
		async fetchCollectionSkills(collectionId, page) {
			const builtin = this.builtinFacade;
			const slice = this.getCollection(collectionId);
			if (!builtin || !slice.subType || !slice.templateId) return;
			if (!resolveCollectionTagId({
				collectionId,
				categoryId: slice.categoryId,
				categories: slice.categories
			})) {
				if (slice.categoriesReady) this.patchCollection(collectionId, { loading: false });
				return;
			}
			const cacheKey = this.buildListCacheKey(collectionId, slice);
			const isFirstPage = page <= 1;
			const currentSkills = this.getCollection(collectionId).skills;
			const showLoading = page > 1 || currentSkills.length === 0;
			const reqId = (this.collectionReqIds.get(collectionId) ?? 0) + 1;
			this.collectionReqIds.set(collectionId, reqId);
			this.patchCollection(collectionId, {
				...showLoading ? { loading: true } : {},
				error: false,
				page
			});
			try {
				const res = await this.requestCollectionSkills(builtin, collectionId, slice, page);
				if (this.collectionReqIds.get(collectionId) !== reqId) return;
				if (res.code !== 0) {
					this.patchCollection(collectionId, {
						error: true,
						loading: false,
						total: page <= 1 ? 0 : slice.total
					});
					return;
				}
				const merged = this.mergeCollectionSkills(this.getCollection(collectionId).skills, res.items, page);
				this.patchCollection(collectionId, {
					skills: merged,
					total: res.total,
					loading: false,
					error: false,
					page
				});
				if (isFirstPage) this.writeListCache(cacheKey, {
					skills: res.items,
					total: res.total
				});
			} catch {
				if (this.collectionReqIds.get(collectionId) !== reqId) return;
				this.patchCollection(collectionId, {
					error: true,
					loading: false,
					total: page <= 1 ? 0 : slice.total
				});
			}
		}
		/**
		* 请求一页 Collection 技能
		*/
		async requestCollectionSkills(builtin, collectionId, slice, page) {
			if (!resolveCollectionTagId({
				collectionId,
				categoryId: slice.categoryId,
				categories: slice.categories
			})) return {
				code: -1,
				items: [],
				total: 0
			};
			const categoryIdForApi = slice.categoryId?.trim() || void 0;
			const params = {
				page,
				pageSize: slice.pageSize,
				categoryId: categoryIdForApi,
				feature: slice.subType === CollectionSubType.Featured ? [1] : void 0
			};
			try {
				const response = await builtin.list({
					page: params.page,
					pageSize: params.pageSize,
					collectionId,
					templateId: slice.templateId,
					categoryId: params.categoryId,
					feature: params.feature,
					route: BuiltinMarketRoutes.OpenPlatform
				});
				if (response.code !== 0) return {
					code: response.code ?? -1,
					items: [],
					total: 0
				};
				return {
					code: 0,
					items: response.data?.skills ?? [],
					total: response.data?.total_count ?? 0
				};
			} catch {
				return {
					code: -1,
					items: [],
					total: 0
				};
			}
		}
		/**
		* 检测已装技能版本更新
		*/
		async checkUpdates(enabled) {
			if (!enabled) {
				this.store.setState({ updateCheckCompleted: false });
				return;
			}
			this.store.setState({ updateCheckCompleted: false });
			const facade = this.facade;
			try {
				const metas = facade ? await facade.builtin.getInstalledMetas() : [];
				const localMap = {};
				for (const m of metas) {
					const key = m.skillId || (m.name || m.skillName || "").toLowerCase();
					if (!key) continue;
					localMap[key] = m.version || "";
				}
				this.store.setState({ localVersionMap: localMap });
				if (metas.length === 0 || !facade) {
					this.store.setState({ updateCheckCompleted: true });
					return;
				}
				const ids = metas.map((m) => m.skillId).filter((v) => !!v);
				if (ids.length === 0) {
					this.store.setState({ updateCheckCompleted: true });
					return;
				}
				const byIdsRes = await facade.builtin.getByIds(ids);
				if (byIdsRes?.code === 0 && Array.isArray(byIdsRes.data?.skills)) {
					const remoteMap = {};
					for (const s of byIdsRes.data.skills) {
						const sid = getBuiltinMarketSkillId(s);
						if (sid && s.version) remoteMap[sid] = s.version;
					}
					if (Object.keys(remoteMap).length > 0) this.store.setState((s) => ({ remoteVersionMap: {
						...s.remoteVersionMap,
						...remoteMap
					} }));
				}
			} catch (err) {
				console.error("[MarketBuiltinService] update detect failed:", err);
			} finally {
				this.store.setState({ updateCheckCompleted: true });
			}
		}
		/**
		* 重置并重跑更新检测
		*/
		resetUpdateCheck() {
			this.store.setState({ updateCheckCompleted: false });
			this.checkUpdates(true);
		}
		/**
		* UI：是否已装（浏览 filter；含 Web fallback，与 Update 无关）。
		*/
		computeIsInstalled(skill, sources) {
			const { localVersionMap, installedSkills } = sources;
			const skillId = getBuiltinMarketSkillId(skill);
			if (skillId && skillId in localVersionMap) return true;
			return hasInstalledIdentity(buildInstalledIdentityIndex(installedSkills), {
				strong: [skillId],
				name: skill.name
			});
		}
		/**
		* UI：是否本会话刚装（浏览 filter 白名单；按 id / name）。
		*/
		computeIsRecentlyInstalled(skill, sources) {
			const { recentlyInstalledIds } = sources;
			const skillId = getBuiltinMarketSkillId(skill);
			const name = (skill.name || "").toLowerCase();
			return !!skillId && recentlyInstalledIds.has(skillId) || !!name && recentlyInstalledIds.has(name);
		}
		/**
		* UI：由调用方传入 sources，计算浏览卡安装按钮态。
		*/
		computeInstallState(skill, sources) {
			const { installingSkillId, remoteVersionMap, localVersionMap, installedSkills, recentlyInstalledIds } = sources;
			const skillId = getBuiltinMarketSkillId(skill);
			const nameLower = (skill.name || "").toLowerCase();
			if (installingSkillId === skillId || installingSkillId === nameLower) return {
				status: InstallStatus.Installing,
				disabled: true
			};
			const recently = this.computeIsRecentlyInstalled(skill, { recentlyInstalledIds });
			const installed = this.computeIsInstalled(skill, {
				localVersionMap,
				installedSkills
			});
			if (!recently && !installed) return {
				status: InstallStatus.Install,
				disabled: false
			};
			if (installed) {
				const matchedKey = skillId && skillId in localVersionMap ? skillId : nameLower && nameLower in localVersionMap ? nameLower : null;
				if (matchedKey) {
					const remoteVersion = remoteVersionMap[matchedKey] || remoteVersionMap[skillId] || skill.version;
					const localVersion = localVersionMap[matchedKey];
					if (remoteVersion && (!localVersion || isNewerVersion(remoteVersion, localVersion))) return {
						status: InstallStatus.Update,
						disabled: false
					};
				}
			}
			return {
				status: InstallStatus.Installed,
				disabled: true
			};
		}
		/**
		* 命令式：从当前 store 解析安装按钮态。
		*/
		resolveInstallState(skill) {
			const { installingSkillId, remoteVersionMap, localVersionMap, recentlyInstalledIds } = this.store.getState();
			return this.computeInstallState(skill, {
				installingSkillId,
				remoteVersionMap,
				localVersionMap,
				recentlyInstalledIds,
				installedSkills: this.services.installedSkillsService.useStore.getState().skills
			});
		}
		/**
		* 是否为本会话刚安装（命令式，读当前 store）。
		*/
		isRecentlyInstalled(skill) {
			return this.computeIsRecentlyInstalled(skill, { recentlyInstalledIds: this.store.getState().recentlyInstalledIds });
		}
		/**
		* 记入刚安装白名单
		*/
		markRecentlyInstalled(skill) {
			const skillId = getBuiltinMarketSkillId(skill);
			const name = (skill.name || "").toLowerCase();
			if (!skillId && !name) return;
			this.store.setState((s) => {
				const next = new Set(s.recentlyInstalledIds);
				if (skillId) next.add(skillId);
				if (name) next.add(name);
				return { recentlyInstalledIds: next };
			});
		}
		/**
		* 清空刚安装白名单
		*/
		clearRecentlyInstalled() {
			if (this.store.getState().recentlyInstalledIds.size === 0) return;
			this.store.setState({ recentlyInstalledIds: /* @__PURE__ */ new Set() });
		}
		/**
		* 卸载后收口：去掉刚装白名单与 localVersionMap，避免浏览卡「幽灵已装」。
		*/
		forgetUninstalled(skill) {
			const keys = [
				skill.skillId,
				skill.slug,
				skill.name,
				skill.name?.toLowerCase()
			].filter((key) => !!key && key.trim().length > 0);
			if (keys.length === 0) return;
			this.store.setState((s) => {
				let recently = s.recentlyInstalledIds;
				let recentChanged = false;
				for (const key of keys) if (recently.has(key)) {
					if (!recentChanged) {
						recently = new Set(recently);
						recentChanged = true;
					}
					recently.delete(key);
				}
				const nextLocal = { ...s.localVersionMap };
				let localChanged = false;
				for (const key of keys) if (key in nextLocal) {
					delete nextLocal[key];
					localChanged = true;
				}
				if (!recentChanged && !localChanged) return s;
				return {
					...recentChanged ? { recentlyInstalledIds: recently } : {},
					...localChanged ? { localVersionMap: nextLocal } : {}
				};
			});
		}
		/**
		* 安装技能
		*/
		install(skill) {
			return this.installOrUpdate(skill, false);
		}
		/**
		* 更新技能
		*/
		update(skill) {
			return this.installOrUpdate(skill, true);
		}
		/**
		* 安装/更新共用实现
		*/
		async installOrUpdate(skill, isUpdate) {
			const facade = this.facade;
			const skillId = getBuiltinMarketSkillId(skill);
			this.store.setState({ installingSkillId: skillId });
			try {
				const result = facade ? await facade.builtin.install({
					skillId,
					version: skill.version,
					name: skill.description,
					skillName: skill.name,
					icon: skill.icon || skill.icon_url,
					examples_zh: skill.examples_zh,
					examples_en: skill.examples_en,
					description_zh: skill.description_zh,
					description_en: skill.description_en,
					route: BuiltinMarketRoutes.OpenPlatform
				}) : {
					success: false,
					errorMessage: "SkillsMarketplace facade not available"
				};
				if (result.success) {
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillInstalled, {
						name: skill.name,
						skillId,
						skillVersion: skill.version
					});
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						name: skill.name,
						skillId,
						skillVersion: skill.version,
						action: isUpdate ? "update" : "install",
						channelType: "builtin"
					});
					this.markRecentlyInstalled(skill);
					const nameLower = (skill.name || "").toLowerCase();
					const installedVersion = result.version || this.store.getState().remoteVersionMap[skillId] || skill.version;
					this.store.setState((s) => {
						const remoteVersionMap = { ...s.remoteVersionMap };
						if (skillId && skill.version) remoteVersionMap[skillId] = skill.version;
						const localVersionMap = { ...s.localVersionMap };
						const version = installedVersion || "";
						if (skillId) localVersionMap[skillId] = version;
						if (nameLower && nameLower !== skillId) localVersionMap[nameLower] = version;
						return {
							localVersionMap,
							remoteVersionMap
						};
					});
					const installedPath = result.installedPath;
					this.services.installedSkillsService.notifySkillInstalled(installedPath ? {
						...skill,
						name: skill.description,
						filePath: installedPath,
						slug: skill.name,
						skillId,
						version: installedVersion,
						installedAt: Date.now(),
						source: "userSettings",
						disable: false,
						disableModelInvocation: false
					} : void 0);
					return { success: true };
				}
				return {
					success: false,
					errorMessage: result.errorMessage || t("skills.toast.installFailed")
				};
			} catch {
				return {
					success: false,
					errorMessage: t("skills.toast.installFailed")
				};
			} finally {
				this.store.setState({ installingSkillId: null });
			}
		}
		/**
		* 解析更新用的完整技能：浏览 collection 命中则复用，否则 getByIds 现拉。
		*/
		async resolveSkillForUpdate(skill) {
			const update = this.resolveUpdateInfo(skill);
			const lowerName = skill.name.toLowerCase();
			const skillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : update.skillId || void 0;
			const fromBrowse = this.findInCollections(skillId, lowerName);
			if (fromBrowse) return fromBrowse;
			const facade = this.facade;
			if (!skillId || !facade) return;
			try {
				const matched = (await facade.builtin.getByIds([skillId]))?.data?.skills?.find((s) => getBuiltinMarketSkillId(s) === skillId);
				if (!matched) return;
				return matched;
			} catch (err) {
				console.warn("[MarketBuiltinService] getByIds for update failed:", err);
				return;
			}
		}
		/**
		* 在已加载的 collection 浏览列表里按 id / name 查找完整技能
		*/
		findInCollections(skillId, nameLower) {
			const { collections } = this.store.getState();
			for (const slice of Object.values(collections)) for (const s of slice.skills) {
				const id = getBuiltinMarketSkillId(s);
				if (skillId && id === skillId || (s.name || "").toLowerCase() === nameLower) return s;
			}
		}
		/**
		* UI：由调用方传入 sources，计算已装更新信息。
		*/
		computeUpdateInfo(skill, sources) {
			const { installingSkillId, remoteVersionMap, localVersionMap } = sources;
			const backendSkillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : void 0;
			const lowerName = skill.name.toLowerCase();
			const skillId = backendSkillId ?? lowerName;
			if (!(skillId in localVersionMap || lowerName in localVersionMap)) return {
				hasUpdate: false,
				isUpdating: false,
				skill: void 0,
				skillId,
				remoteVersion: void 0
			};
			const remoteVersion = remoteVersionMap[skillId] || remoteVersionMap[lowerName];
			if (installingSkillId === skillId || installingSkillId === lowerName) return {
				hasUpdate: false,
				isUpdating: true,
				skill: void 0,
				skillId,
				remoteVersion
			};
			const localVersion = localVersionMap[skillId] || localVersionMap[lowerName];
			if (remoteVersion) {
				if (!localVersion || isNewerVersion(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					skill: void 0,
					skillId,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				skill: void 0,
				skillId,
				remoteVersion
			};
		}
		/**
		* 命令式：从当前 store 解析更新信息。
		*/
		resolveUpdateInfo(skill) {
			const { installingSkillId, remoteVersionMap, localVersionMap } = this.store.getState();
			return this.computeUpdateInfo(skill, {
				installingSkillId,
				remoteVersionMap,
				localVersionMap
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/text.ts
/**
* 将任意值强制转换为可安全渲染的字符串。
* 处理 YAML frontmatter 解析异常场景。
*/
function coerceSkillText(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	try {
		return JSON.stringify(value);
	} catch {
		return "";
	}
}
/** 数字格式化：10000+ 显示为 nk */
function formatNumber(n) {
	if (n >= 1e4) return `${(n / 1e3).toFixed(0)}k`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
	return String(n);
}
/**
* 取 I18nText 当前语言的文案，缺失时回退到另一语种。
* 只在渲染时调用，保证切语言后能拿到新值。
*/
function pickI18nText(text) {
	if (!text) return "";
	return toZhEnLocale(getLocale()) === "en" ? text.en || text.zh : text.zh || text.en;
}
/** 根据当前 locale 取 description；优先级对齐 skills #56932 */
function getLocalizedDescription(skill) {
	const locale = toZhEnLocale(getLocale());
	if (locale === "en" && skill.description_en) return coerceSkillText(skill.description_en);
	if (locale !== "en" && skill.description_zh) return coerceSkillText(skill.description_zh);
	if (skill.description) return coerceSkillText(skill.description);
	if (locale === "en" && skill.description_zh) return coerceSkillText(skill.description_zh);
	if (locale !== "en" && skill.description_en) return coerceSkillText(skill.description_en);
	return "";
}
/** 已安装卡片 / 详情描述：与 getLocalizedDescription 同优先级，避免双实现漂移 */
function getInstalledSkillDescription(skill) {
	return getLocalizedDescription(skill);
}
/** BuiltinMarket skill 的本地化展示名。 */
function getBuiltinMarketDisplayName(skill) {
	return toZhEnLocale(getLocale()) === "en" ? skill.display_name_en || skill.description || skill.name || "" : skill.description || skill.name || "";
}
/** 已安装 UISkill 的本地化展示名。 */
function getInstalledSkillDisplayName(skill) {
	const displaySkill = skill;
	return toZhEnLocale(getLocale()) === "en" ? displaySkill.display_name_en || displaySkill.display_name || displaySkill.slug || skill.name || "" : displaySkill.display_name_zh || skill.name || displaySkill.display_name || displaySkill.slug || "";
}
/** labels.requires_api_key 使用严格字符串判定，避免 "false" 被视为开启。 */
function needsApiKeyFromLabels(labels) {
	return labels?.requires_api_key === "true";
}
/** 按当前 locale 选 examples：英文优先 en，中文优先 zh */
function pickLocalizedExamples(skill) {
	if (!skill) return;
	const isEn = toZhEnLocale(getLocale()) === "en";
	const primary = isEn ? skill.examples_en : skill.examples_zh;
	const fallback = isEn ? skill.examples_zh : skill.examples_en;
	const sanitize = (arr) => {
		if (!Array.isArray(arr)) return;
		const filtered = arr.filter((s) => typeof s === "string" && s.trim().length > 0);
		return filtered.length > 0 ? filtered : void 0;
	};
	return sanitize(primary) ?? sanitize(fallback);
}
/**
* 将 policy reason 映射为对应 i18n key。
*/
function buildPolicyDeniedMessage(fn, reason) {
	switch (reason) {
		case "DISABLED": return fn("skills.upload.policy.disabled");
		case "NOT_IN_WHITELIST": return fn("skills.upload.policy.notInWhitelist");
		case "IN_BLACKLIST": return fn("skills.upload.policy.inBlacklist");
		default: return fn("skills.upload.policy.invalidMode");
	}
}
function formatBytes(bytes) {
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let value = bytes;
	let i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i += 1;
	}
	return `${i === 0 || Number.isInteger(value) ? String(value) : value.toFixed(1)} ${units[i]}`;
}
function parseMaxBytesFromError(error) {
	const m = error.match(/>\s*(\d+)\s*bytes/);
	if (!m) return null;
	const n = Number(m[1]);
	return Number.isFinite(n) && n > 0 ? n : null;
}
function getLocalizedImportSkillError(error) {
	if (!error) return t("skill.importError.default");
	const duplicateNameMatch = error.match(/(?:A skill with name|Skill|skill name) "(.+?)" already exists\b/i);
	if (duplicateNameMatch) return t("skill.importError.duplicateName", { name: duplicateNameMatch[1] });
	if (/ENOENT[\s\S]*SKILL\.md/.test(error)) return t("skill.importError.skillFileMissing");
	if (/^Skill package too large(:|\b)/.test(error)) {
		const max = parseMaxBytesFromError(error);
		return t("skill.importError.sizeLimitExceeded", { max: max != null ? formatBytes(max) : t("skill.importError.sizeLimitFallback") });
	}
	if (/^Skill upload denied by enterprise policy(:|\b)/.test(error)) return t("skill.importError.operationDisallowed");
	switch (error) {
		case "No file or folder selected": return t("skill.importError.noFileSelected");
		case "No folder selected": return t("skill.importError.noFolderSelected");
		case "Source must be a directory": return t("skill.importError.sourceMustBeDirectory");
		case "Selected path is not a folder": return t("skill.importError.notFolder");
		case "SKILL.md file not found in selected folder":
		case "SKILL.md file not found in the selected folder. The folder does not conform to the skill specification.":
		case "SKILL.md not found in zip archive": return t("skill.importError.skillFileMissing");
		case "SKILL.md format is incorrect. Required fields: name, description": return t("skill.importError.invalidFrontMatter");
		case "SKILL.md format is incorrect. Required field \"name\" is missing.": return t("skill.importError.nameMissing");
		case "SKILL.md format is incorrect. Required field \"description\" is missing.": return t("skill.importError.descriptionMissing");
		case "Selected skill folder is already in target location": return t("skill.importError.alreadyInTarget");
		case "Invalid source, must be localSettings or userSettings": return t("skill.importError.invalidSource");
		case "cwd is required when source is localSettings": return t("skill.importError.cwdRequired");
		case "security_check_blocked": return t("skill.importError.securityCheckBlocked");
		case "Size limit exceeded": return t("skill.importError.sizeLimitExceeded", { max: t("skill.importError.sizeLimitFallback") });
		case "Skill operation disallowed": return t("skill.importError.operationDisallowed");
		default: return t("skill.importError.withReason", { error });
	}
}
/** 安装状态 → i18n 文案（界面侧；service 只返回 status） */
function installStatusLabel(status, translate, source = "recommend") {
	return translate(`skills.${source}.${status}`);
}
var init_text = __esmMin((() => {
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/markdown.ts
/**
* 从 SKILL.md 全文的 YAML frontmatter 中提取 examples_zh / examples_en。
*/
function extractExamplesFromMarkdown(markdown) {
	const fmMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fmMatch) return {};
	const yaml = fmMatch[1];
	const result = {};
	for (const key of ["examples_zh", "examples_en"]) {
		const pattern = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.*\\n?)*)`, "m");
		const match = yaml.match(pattern);
		if (match) {
			const items = match[1].split("\n").map((line) => line.replace(/^\s+-\s+/, "").trim()).filter(Boolean);
			if (items.length > 0) result[key] = items;
		}
	}
	return result;
}
/** 用 skill 基础信息构造兜底 markdown（无正文时使用） */
function buildFallbackSkillMarkdown(skill) {
	const desc = getLocalizedDescription(skill);
	return `---\nname: ${skill.name}\ndescription: ${desc}\nsource: ${skill.source}\n---\n\n# ${skill.name}\n\n${desc}`;
}
/** 用 skill 元信息构造 YAML frontmatter，与后端返回的正文拼接。若内容已含 frontmatter 则直接返回 */
function buildSkillMarkdownWithMeta(skill, bodyContent) {
	if (/^---\r?\n/.test(bodyContent)) return bodyContent;
	const entries = [];
	if (skill.name) entries.push(`name: ${skill.name}`);
	const desc = getLocalizedDescription(skill);
	if (desc) entries.push(`description: ${desc}`);
	if (skill.source) entries.push(`source: ${skill.source}`);
	if (skill.version) entries.push(`version: ${skill.version}`);
	if (skill.license) entries.push(`license: ${skill.license}`);
	if (entries.length === 0) return bodyContent;
	return `---\n${entries.join("\n")}\n---\n\n${bodyContent}`;
}
var init_markdown = __esmMin((() => {
	init_text();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/detail.ts
var import_zustand$8, DetailService;
var init_detail = __esmMin((() => {
	init_src$1();
	import_zustand$8 = require_zustand();
	init_i18n();
	init_markdown();
	init_text();
	DetailService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$8.create)(() => ({
				selectedSkill: null,
				selectedRemoteSkill: null,
				selectedPluginKey: null,
				selectedPluginSnapshot: null,
				markdown: "",
				loading: false,
				menuOpen: false
			}));
			this.markdownLoadCancelled = false;
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 选中已安装 Skill 并加载 markdown
		*/
		selectInstalledSkill(skill) {
			this.store.setState({
				selectedSkill: skill,
				selectedRemoteSkill: null,
				selectedPluginKey: null,
				selectedPluginSnapshot: null
			});
			this.loadMarkdown();
		}
		/**
		* 只更新当前已装选中项字段，不重拉 markdown、不清远端选中
		*/
		patchSelectedSkill(skill) {
			const current = this.store.getState().selectedSkill;
			if (!current || current.filePath !== skill.filePath) return;
			this.store.setState({ selectedSkill: skill });
		}
		/**
		* 选中远端 Skill 并加载 markdown。
		*/
		selectRemoteSkill(remote) {
			this.store.setState({
				selectedRemoteSkill: remote,
				selectedSkill: null,
				selectedPluginKey: null,
				selectedPluginSnapshot: null
			});
			this.loadMarkdown();
		}
		/**
		* 选中 Plugin（与 Skill 互斥）。只落身份 + 兜底快照，详情页用 resolveSelectedPlugin 取最新对象。
		*/
		selectPlugin(plugin) {
			this.store.setState({
				selectedPluginKey: {
					name: plugin.name,
					marketplaceName: plugin.marketplaceName
				},
				selectedPluginSnapshot: plugin,
				selectedSkill: null,
				selectedRemoteSkill: null
			});
		}
		/**
		* 从 PluginsService 的列表里派生当前选中套件的最新对象。
		*
		* installed 优先（已安装条目的 installedScopes / installedScopesStatus / installedPath 最全），
		* 其次当前 marketplace 列表，最后回落到点击时的快照。
		* 调用方需自行订阅 selectedPluginKey / installedPlugins / marketplacePlugins 以获得响应式更新。
		*/
		resolveSelectedPlugin() {
			const { selectedPluginKey, selectedPluginSnapshot } = this.store.getState();
			if (!selectedPluginKey) return null;
			const match = (plugin) => plugin.name === selectedPluginKey.name && plugin.marketplaceName === selectedPluginKey.marketplaceName;
			const { installedPlugins, marketplacePlugins } = this.services.pluginsService.useStore.getState();
			return installedPlugins.find(match) ?? marketplacePlugins.find(match) ?? selectedPluginSnapshot;
		}
		/**
		* 清空详情选中态并取消进行中的 markdown 加载。
		*/
		clearSelection() {
			this.markdownLoadCancelled = true;
			this.store.setState({
				selectedSkill: null,
				selectedRemoteSkill: null,
				selectedPluginKey: null,
				selectedPluginSnapshot: null,
				markdown: "",
				loading: false,
				menuOpen: false
			});
		}
		/**
		* 按当前选中项异步加载详情 markdown。
		*/
		async loadMarkdown() {
			const { selectedSkill, selectedRemoteSkill } = this.store.getState();
			this.markdownLoadCancelled = false;
			if (!selectedSkill && !selectedRemoteSkill) {
				this.store.setState({ markdown: "" });
				return;
			}
			if (selectedRemoteSkill) {
				if (typeof selectedRemoteSkill.slug !== "string") {
					const bm = selectedRemoteSkill;
					const isEn = toZhEnLocale(getLocale()) === "en";
					const displayName = getBuiltinMarketDisplayName(bm) || "";
					const bodyDesc = isEn ? bm.description_en || bm.description_zh || "" : bm.description_zh || bm.description_en || "";
					const frontmatterLines = [
						`name: ${displayName}`,
						bm.name ? `slug: ${bm.name}` : "",
						bm.version ? `version: ${bm.version}` : ""
					].filter(Boolean);
					this.store.setState({ markdown: `---\n${frontmatterLines.join("\n")}\n---\n\n# ${displayName}\n\n${bodyDesc}` });
					return;
				}
				let marketplace;
				try {
					marketplace = this.deps.host.facades.skillsMarketplace;
				} catch {
					marketplace = void 0;
				}
				this.store.setState({ loading: true });
				try {
					const response = marketplace ? await marketplace.skillhub.getDetail(selectedRemoteSkill.slug) : await Promise.reject(/* @__PURE__ */ new Error("marketplace facade not available"));
					if (this.markdownLoadCancelled) return;
					const skill = response.skill;
					const desc = toZhEnLocale(getLocale()) === "zh" && skill.summary_zh ? skill.summary_zh : skill.summary;
					const authorName = response.publisher?.name || response.owner.displayName;
					this.store.setState({
						markdown: `---\nname: ${skill.displayName}\ncategory: ${skill.category}\nversion: ${response.latestVersion.version}\nauthor: ${authorName}\n---\n\n# ${skill.displayName}\n\n${desc}`,
						loading: false
					});
				} catch {
					if (this.markdownLoadCancelled) return;
					const desc = toZhEnLocale(getLocale()) === "zh" ? selectedRemoteSkill.description_zh : selectedRemoteSkill.description;
					this.store.setState({
						markdown: `# ${selectedRemoteSkill.name}\n\n${desc}`,
						loading: false
					});
				}
				return;
			}
			if (!selectedSkill) return;
			const isMarketplaceSkill = selectedSkill.source === "builtin";
			let marketplace;
			try {
				marketplace = this.deps.host.facades.skillsMarketplace;
			} catch {
				marketplace = void 0;
			}
			const personalSkills = this.deps.host.facades.personalSkills;
			if (isMarketplaceSkill && marketplace) {
				this.store.setState({ loading: true });
				try {
					const response = await marketplace.local.getContent({ skillName: selectedSkill.name });
					if (this.markdownLoadCancelled) return;
					this.store.setState({
						markdown: response.content ? buildSkillMarkdownWithMeta(selectedSkill, response.content) : buildFallbackSkillMarkdown(selectedSkill),
						loading: false
					});
				} catch {
					if (this.markdownLoadCancelled) return;
					this.store.setState({
						markdown: buildFallbackSkillMarkdown(selectedSkill),
						loading: false
					});
				}
				return;
			}
			this.store.setState({ loading: true });
			try {
				const response = await personalSkills?.getContent({ filePath: selectedSkill.filePath });
				if (this.markdownLoadCancelled) return;
				this.store.setState({
					markdown: response?.content ? buildSkillMarkdownWithMeta(selectedSkill, response.content) : buildFallbackSkillMarkdown(selectedSkill),
					loading: false
				});
			} catch {
				if (this.markdownLoadCancelled) return;
				this.store.setState({
					markdown: buildFallbackSkillMarkdown(selectedSkill),
					loading: false
				});
			}
		}
		/**
		* 控制详情菜单开合。
		*/
		setMenuOpen(open) {
			this.store.setState({ menuOpen: open });
		}
		/**
		* 在系统文件管理器中打开 Skill 目录；无适配器时提示，失败由 adapter 自己提示
		*/
		async openFolder(skill) {
			const adapter = this.deps.host.adapter;
			const folderPath = skill.filePath;
			if (!folderPath || !adapter?.openFolder) {
				toast({
					message: t("skills.openInFolderNotSupported"),
					type: "warning"
				});
				return;
			}
			try {
				await adapter.openFolder(folderPath);
			} catch {}
		}
		/**
		* 卸载指定的已安装 Skill。
		* 目标由调用方传入（远端详情页传匹配出的 installed 项，已安装详情页传 selectedSkill），
		* 成功后离开详情页（行业版用独立 view，不能只靠清空 selection）。
		* @param afterUninstall 卸载成功后的收尾（如清空详情选中态）
		*/
		async deleteInstalled(skill, afterUninstall) {
			const result = await this.services.installedSkillsService.uninstall(skill, afterUninstall);
			this.store.setState({ menuOpen: false });
			if (result.success) this.services.uiService.backFromDetail();
			return result;
		}
		/**
		* 取消进行中的 markdown 加载。
		*/
		dispose() {
			this.markdownLoadCancelled = true;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/enterprise.ts
/**
* 解析企业 Skill 的展示名：中文名 → 英文名 → name → id。
*/
function resolveEnterpriseDisplayName(skill) {
	return skill.display_name_zh || skill.display_name_en || skill.name || skill.id;
}
function buildEnterpriseUpdateState(metas, remoteSkills) {
	const skillsById = new Map(remoteSkills.map((skill) => [skill.id, skill]));
	const localVersionMap = {};
	const remoteVersionMap = {};
	const icons = /* @__PURE__ */ new Map();
	for (const skill of remoteSkills) {
		const icon = (skill.icon_url || "").trim();
		if (/^https?:\/\//i.test(icon)) icons.set(skill.id, icon);
	}
	for (const meta of metas) {
		if (meta.version) localVersionMap[meta.skillId] = meta.version;
		if (meta.userModified) continue;
		const remoteVersion = meta.latestVersion || skillsById.get(meta.skillId)?.version;
		if (remoteVersion) remoteVersionMap[meta.skillId] = remoteVersion;
	}
	return {
		localVersionMap,
		remoteVersionMap,
		icons
	};
}
function enrichInstalledSkillsWithEnterpriseIcons(skills, icons) {
	if (icons.size === 0) return skills;
	let mutated = false;
	const result = skills.map((skill) => {
		if (!!skill.iconUrl || !!skill.iconSource && /^https?:\/\//i.test(skill.iconSource.trim())) return skill;
		const iconUrl = (skill.filePath ? icons.get(skill.filePath) : void 0) || (skill.skillId ? icons.get(skill.skillId) : void 0) || (skill.slug ? icons.get(skill.slug) : void 0);
		if (!iconUrl) return skill;
		mutated = true;
		return {
			...skill,
			iconUrl,
			iconSource: iconUrl
		};
	});
	return mutated ? result : skills;
}
var init_enterprise$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/enterprise.ts
var import_zustand$7, PAGE_SIZE, EnterpriseService;
var init_enterprise = __esmMin((() => {
	import_zustand$7 = require_zustand();
	init_i18n();
	init_extension_refresh_events();
	init_constants();
	init_enterprise$1();
	init_installed_identity();
	init_version();
	PAGE_SIZE = 20;
	EnterpriseService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$7.create)(() => ({
				skills: [],
				categories: [],
				selectedCategory: "",
				total: 0,
				page: 1,
				loading: false,
				error: void 0,
				installingId: null,
				recentlyInstalledIds: /* @__PURE__ */ new Set(),
				updateCheckCompleted: false,
				localVersionMap: {},
				remoteVersionMap: {},
				iconMap: /* @__PURE__ */ new Map(),
				categoriesLoaded: false
			}));
			this.updateGeneration = 0;
			this.fetchGeneration = 0;
			this.listCache = /* @__PURE__ */ new Map();
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 获取企业 Skill facade（不可用时返回 undefined）。
		*/
		get facade() {
			try {
				return this.deps.host.facades.enterpriseSkills;
			} catch {
				return;
			}
		}
		/**
		* 当前账号的企业 ID。
		*/
		get enterpriseId() {
			return this.deps.host.accountInfo?.enterpriseId?.trim() || "";
		}
		/**
		* 分页拉取企业技能列表。
		*/
		async fetchSkills(nextPage = 1) {
			const facade = this.facade;
			const enterpriseId = this.enterpriseId;
			if (!facade || !enterpriseId) return;
			const { selectedCategory } = this.store.getState();
			const cacheKey = this.buildListCacheKey(enterpriseId, selectedCategory);
			const isFirstPage = nextPage === 1;
			const cachedEntry = isFirstPage ? this.listCache.get(cacheKey) ?? null : null;
			const cached = cachedEntry && cachedEntry.skills.length > 0 ? cachedEntry : null;
			if (cached) this.store.setState({
				skills: cached.skills,
				total: cached.total,
				page: 1,
				loading: false,
				error: void 0
			});
			else if (isFirstPage) this.store.setState({
				skills: [],
				total: 0,
				page: 1,
				loading: true,
				error: void 0
			});
			else this.store.setState({
				loading: true,
				error: void 0
			});
			this.fetchGeneration += 1;
			const generation = this.fetchGeneration;
			try {
				const categoryFilter = selectedCategory ? [selectedCategory] : void 0;
				const res = await facade.list({
					enterpriseId,
					categories: categoryFilter,
					page: nextPage,
					pageSize: PAGE_SIZE
				});
				if (generation !== this.fetchGeneration) return;
				const current = this.store.getState();
				if (this.buildListCacheKey(this.enterpriseId, current.selectedCategory) !== cacheKey) return;
				const items = res?.skills ?? [];
				const total = res?.total_count ?? items.length;
				this.store.setState({
					skills: isFirstPage ? items : [...current.skills, ...items],
					total,
					page: nextPage,
					loading: false
				});
				if (isFirstPage && items.length > 0) this.writeListCache(cacheKey, {
					skills: items,
					total
				});
			} catch (err) {
				if (generation !== this.fetchGeneration) return;
				const current = this.store.getState();
				if (this.buildListCacheKey(this.enterpriseId, current.selectedCategory) === cacheKey) this.store.setState({
					error: err?.message ?? "load failed",
					loading: false
				});
			}
		}
		/**
		* 生成列表内存缓存 key（按 enterpriseId / category 分片）
		*/
		buildListCacheKey(enterpriseId, category) {
			return `${enterpriseId}|${category}`;
		}
		/**
		* 写入第一页内存缓存（超出上限时删 Map 中最旧条目）
		*/
		writeListCache(cacheKey, entry) {
			if (entry.skills.length === 0) return;
			if (this.listCache.size >= 12 && !this.listCache.has(cacheKey)) {
				const oldest = this.listCache.keys().next().value;
				if (oldest) this.listCache.delete(oldest);
			}
			this.listCache.delete(cacheKey);
			this.listCache.set(cacheKey, entry);
		}
		/**
		* 加载企业技能分类（仅首次）。
		*/
		async loadCategories(canLoad) {
			const facade = this.facade;
			const enterpriseId = this.enterpriseId;
			if (!canLoad || !facade || !enterpriseId || this.store.getState().categoriesLoaded) {
				if (!canLoad || !facade || !enterpriseId) this.store.setState({ categoriesLoaded: true });
				return;
			}
			try {
				const res = await facade.getCategories({ enterpriseId });
				this.store.setState({
					categories: res?.items ?? [],
					categoriesLoaded: true
				});
			} catch {
				this.store.setState({
					categories: [],
					categoriesLoaded: true
				});
			}
		}
		/**
		* 设置分类并重新拉取第一页；命中内存缓存时静默刷新
		*/
		setCategory(category) {
			if (this.store.getState().selectedCategory === category) return;
			this.store.setState({
				selectedCategory: category,
				page: 1
			});
			this.fetchSkills(1);
		}
		/**
		* 加载指定页。
		*/
		loadPage(page) {
			this.fetchSkills(page);
		}
		/**
		* 判断企业技能是否已安装（可传入已装列表，避免 UI 路径偷读 store）。
		*/
		isInstalled(skill, installedSkills) {
			const list = installedSkills ?? this.services.installedSkillsService.useStore.getState().skills;
			return this.computeIsInstalled(skill, { installedSkills: list });
		}
		/**
		* 纯函数：根据 sources 判断是否已装（浏览 filter / computeInstallState 共用）。
		* 强键（id → 已装 skillId/slug/filePath）优先，name 仅对无强键的裸装 skill 兜底。
		*/
		computeIsInstalled(skill, sources) {
			return hasInstalledIdentity(buildInstalledIdentityIndex(sources.installedSkills), {
				strong: [skill.id],
				name: skill.name
			});
		}
		/**
		* UI：是否本会话刚装（浏览 filter 白名单；按 id / name）。
		*/
		computeIsRecentlyInstalled(skill, sources) {
			const { recentlyInstalledIds } = sources;
			const id = (skill.id || "").trim();
			const name = (skill.name || "").toLowerCase();
			return !!id && recentlyInstalledIds.has(id) || !!name && recentlyInstalledIds.has(name);
		}
		/**
		* 判断企业技能是否正在安装。
		*/
		isInstalling(skill) {
			return this.store.getState().installingId === skill.id;
		}
		/**
		* UI：由调用方传入 sources，计算浏览卡安装按钮态。
		*/
		computeInstallState(skill, sources) {
			if (sources.installingId === skill.id) return {
				status: InstallStatus.Installing,
				disabled: true
			};
			if (this.computeIsRecentlyInstalled(skill, { recentlyInstalledIds: sources.recentlyInstalledIds }) || this.computeIsInstalled(skill, { installedSkills: sources.installedSkills })) return {
				status: InstallStatus.Installed,
				disabled: true
			};
			return {
				status: InstallStatus.Install,
				disabled: false
			};
		}
		/**
		* 命令式：从当前 store 解析安装按钮态。
		*/
		resolveInstallState(skill) {
			const { installingId, recentlyInstalledIds } = this.store.getState();
			return this.computeInstallState(skill, {
				installingId,
				recentlyInstalledIds,
				installedSkills: this.services.installedSkillsService.useStore.getState().skills
			});
		}
		/**
		* 清空本会话刚安装白名单（切 Tab / 一级视图时调用）。
		*/
		clearRecentlyInstalled() {
			if (this.store.getState().recentlyInstalledIds.size === 0) return;
			this.store.setState({ recentlyInstalledIds: /* @__PURE__ */ new Set() });
		}
		/**
		* 卸载后收口：去掉刚装白名单与版本 map，避免浏览卡「幽灵已装」。
		*/
		forgetUninstalled(skill) {
			const keys = [
				skill.skillId,
				skill.slug,
				skill.name,
				skill.name?.toLowerCase(),
				skill.filePath
			].filter((key) => !!key && key.trim().length > 0);
			if (keys.length === 0) return;
			this.store.setState((s) => {
				let recently = s.recentlyInstalledIds;
				let recentChanged = false;
				for (const key of keys) if (recently.has(key)) {
					if (!recentChanged) {
						recently = new Set(recently);
						recentChanged = true;
					}
					recently.delete(key);
				}
				const nextLocal = { ...s.localVersionMap };
				const nextRemote = { ...s.remoteVersionMap };
				let mapChanged = false;
				for (const key of keys) {
					if (key in nextLocal) {
						delete nextLocal[key];
						mapChanged = true;
					}
					if (key in nextRemote) {
						delete nextRemote[key];
						mapChanged = true;
					}
				}
				if (!recentChanged && !mapChanged) return s;
				return {
					...recentChanged ? { recentlyInstalledIds: recently } : {},
					...mapChanged ? {
						localVersionMap: nextLocal,
						remoteVersionMap: nextRemote
					} : {}
				};
			});
		}
		/**
		* 安装指定企业技能
		*/
		async install(skill) {
			const facade = this.facade;
			const display = resolveEnterpriseDisplayName(skill);
			if (!facade) return {
				success: false,
				errorMessage: t("skills.recommend.installFailed", { name: display })
			};
			this.store.setState({ installingId: skill.id });
			try {
				const res = await facade.install({
					skillId: skill.id,
					version: skill.version ?? "",
					name: display,
					icon: skill.icon_url,
					downloadUrl: skill.download_url
				});
				if (res?.success) {
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillInstalled, {
						name: skill.name,
						skillId: skill.id,
						skillVersion: skill.version
					});
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						name: skill.name,
						skillId: skill.id,
						skillVersion: skill.version,
						action: "install",
						source: "enterprise"
					});
					const recent = new Set(this.store.getState().recentlyInstalledIds);
					if (skill.id) recent.add(skill.id);
					const nameLower = (skill.name || "").toLowerCase();
					if (nameLower) recent.add(nameLower);
					this.store.setState({ recentlyInstalledIds: recent });
					const installedPath = res.installedPath;
					this.services.installedSkillsService.notifySkillInstalled(installedPath ? {
						...skill,
						name: display,
						filePath: installedPath,
						skillId: skill.id,
						version: skill.version,
						installedAt: Date.now(),
						source: "userSettings",
						disable: false,
						disableModelInvocation: false
					} : void 0);
					return { success: true };
				}
				const detail = res?.errorMessage ? `（${res.errorMessage}）` : "";
				return {
					success: false,
					errorMessage: `${t("skills.recommend.installFailed", { name: display })}${detail}`
				};
			} catch {
				return {
					success: false,
					errorMessage: t("skills.recommend.installFailed", { name: display })
				};
			} finally {
				this.store.setState({ installingId: null });
			}
		}
		/**
		* 检测已安装企业技能是否有更新。
		*/
		async checkUpdates(updateCheckEnabled) {
			if (!updateCheckEnabled) {
				this.store.setState({
					updateCheckCompleted: false,
					localVersionMap: {},
					remoteVersionMap: {},
					iconMap: /* @__PURE__ */ new Map()
				});
				return;
			}
			const facade = this.facade;
			const enterpriseId = this.enterpriseId;
			if (!facade || !enterpriseId) {
				this.store.setState({
					updateCheckCompleted: true,
					iconMap: /* @__PURE__ */ new Map()
				});
				return;
			}
			this.store.setState({ updateCheckCompleted: false });
			try {
				const metas = await facade.getInstalledMetas({ enterpriseId });
				if (metas.length === 0) {
					this.store.setState({
						localVersionMap: {},
						remoteVersionMap: {},
						iconMap: /* @__PURE__ */ new Map(),
						updateCheckCompleted: true
					});
					return;
				}
				const ids = metas.map((meta) => meta.skillId).filter(Boolean);
				const state = buildEnterpriseUpdateState(metas, (ids.length > 0 ? await facade.getByIds({
					enterpriseId,
					ids
				}) : {
					skills: [],
					total_count: 0
				}).skills ?? []);
				this.store.setState({
					localVersionMap: state.localVersionMap,
					remoteVersionMap: state.remoteVersionMap,
					iconMap: state.icons,
					updateCheckCompleted: true
				});
			} catch {
				this.store.setState({
					localVersionMap: {},
					remoteVersionMap: {},
					iconMap: /* @__PURE__ */ new Map(),
					updateCheckCompleted: true
				});
			}
		}
		/**
		* 重置更新检测代数（使进行中的检测失效）。
		*/
		reset() {
			this.updateGeneration++;
		}
		/**
		* UI：由调用方传入 sources，计算已装更新信息。
		*/
		computeUpdateInfo(skill, sources) {
			const { localVersionMap, remoteVersionMap, installingId } = sources;
			const skillId = typeof skill.skillId === "string" && skill.skillId.trim() ? skill.skillId : void 0;
			const localVersion = skillId ? localVersionMap[skillId] : void 0;
			const remoteVersion = skillId ? remoteVersionMap[skillId] : void 0;
			const hasUpdate = !!(skillId && localVersion && remoteVersion && isNewerVersion(remoteVersion, localVersion));
			return {
				hasUpdate,
				isUpdating: !!skillId && installingId === skillId,
				skillId,
				remoteVersion: hasUpdate ? remoteVersion : void 0
			};
		}
		/**
		* 命令式：从当前 store 解析更新信息。
		*/
		resolveUpdateInfo(skill) {
			const { localVersionMap, remoteVersionMap, installingId } = this.store.getState();
			return this.computeUpdateInfo(skill, {
				localVersionMap,
				remoteVersionMap,
				installingId
			});
		}
		/**
		* 更新指定已安装企业技能；安装参数在更新时现拉远端详情，避免长期缓存过期。
		*/
		async update(skill) {
			const facade = this.facade;
			const enterpriseId = this.enterpriseId;
			const current = this.resolveUpdateInfo(skill);
			if (!facade || !enterpriseId || !current.skillId || !current.remoteVersion) return {
				success: false,
				errorMessage: t("skills.recommend.installFailed", { name: skill.name })
			};
			const skillId = current.skillId;
			const remoteVersion = current.remoteVersion;
			try {
				const remoteSkill = (await facade.getByIds({
					enterpriseId,
					ids: [skillId]
				})).skills?.find((item) => item.id === skillId);
				if (!(await facade.install({
					skillId,
					version: remoteVersion,
					name: remoteSkill ? resolveEnterpriseDisplayName(remoteSkill) : skill.name,
					icon: remoteSkill?.icon_url,
					downloadUrl: remoteSkill?.download_url
				})).success) return {
					success: false,
					errorMessage: t("skills.recommend.installFailed", { name: skill.name })
				};
				this.store.setState((s) => {
					const nextRemote = { ...s.remoteVersionMap };
					delete nextRemote[skillId];
					return {
						localVersionMap: {
							...s.localVersionMap,
							[skillId]: remoteVersion
						},
						remoteVersionMap: nextRemote
					};
				});
				this.services.installedSkillsService.scheduleReconcile();
				notifySkillsUpdateBadgeRefresh();
				return { success: true };
			} catch {
				return {
					success: false,
					errorMessage: t("skills.recommend.installFailed", { name: skill.name })
				};
			}
		}
		/**
		* 释放资源（当前无定时器/监听）。
		*/
		dispose() {}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/cache.ts
/** 读取完整插件安装时间 map（裸 JSON，勿走 loadCache） */
function readPluginInstallTimeMap() {
	return readCache(CacheKey.pluginsInstallTime) || {};
}
/** 写回完整插件安装时间 map */
function writePluginInstallTimeMap(map) {
	writeCache(CacheKey.pluginsInstallTime, map);
}
/** 记录单个插件安装时间（默认 Date.now()） */
function setPluginInstalledAt(name, marketplaceName, installedAt = Date.now()) {
	const map = readPluginInstallTimeMap();
	map[getPluginKey(name, marketplaceName)] = installedAt;
	writePluginInstallTimeMap(map);
}
/** 清除单个插件安装时间 */
function removePluginInstalledAt(name, marketplaceName) {
	const map = readPluginInstallTimeMap();
	const key = getPluginKey(name, marketplaceName);
	if (!(key in map)) return;
	delete map[key];
	writePluginInstallTimeMap(map);
}
/** 批量清除插件安装时间 */
function removePluginInstalledAts(plugins) {
	if (plugins.length === 0) return;
	const map = readPluginInstallTimeMap();
	let changed = false;
	for (const plugin of plugins) {
		const key = getPluginKey(plugin.name, plugin.marketplaceName);
		if (key in map) {
			delete map[key];
			changed = true;
		}
	}
	if (changed) writePluginInstallTimeMap(map);
}
/**
* 以下不经 CacheKey 表（re-export / skills 常量直用）：
* - 企业已装 id（旧 use-enterprise-skills）：`readEnterpriseInstalledIds` / `writeEnterpriseInstalledIds`
* - 置顶：`hooks/use-pinned-installed`
* - 技能自动更新：`hooks/use-auto-update-preference`
* - 安全自动安装：`hooks/use-security-preference` / `SECURITY_AUTO_INSTALL_KEY`
*/
/**
* 读缓存：自动解封装 `{ ttl, data }`。
* ttl=0 永不过期；ttl>0 且已过期时返回 null；key 不存在返回 null。
*/
function loadCache(key) {
	const entry = readCache(key);
	if (!entry || entry.ttl > 0 && Date.now() >= entry.ttl) return null;
	return entry.data;
}
/**
* 写缓存：统一封装为 `{ ttl, data }`。
* ttl 未传或为 0 时写入 `{ ttl: 0, data }`（永不过期）。
* 底层 writeCache 使用 requestIdleCallback 延迟写入，不阻塞 UI。
*/
function storeCache(key, data, ttl) {
	const entry = {
		ttl: ttl ? Date.now() + ttl : 0,
		data
	};
	writeCache(key, entry);
}
/**
* 启用数超限警告是否已关闭（与通用版同一 key / 裸 '1'）。
*/
function isWarningDismissed() {
	try {
		return localStorage.getItem(CacheKey.warningDismissed) === "1";
	} catch {
		return false;
	}
}
/**
* 设置 / 清除启用数超限警告关闭标记（与通用版同一格式）。
*/
function setWarningDismissed(dismissed) {
	try {
		if (dismissed) localStorage.setItem(CacheKey.warningDismissed, "1");
		else localStorage.removeItem(CacheKey.warningDismissed);
	} catch {}
}
var CacheKey;
var init_cache = __esmMin((() => {
	init_local_cache();
	init_skills_utils();
	init_use_plugins();
	init_use_suite_auto_update_preference();
	init_types$3();
	CacheKey = {
		/**
		* [共享 · 派生数据] 插件安装时间戳 Record<`${name}@${marketplace}`, ms>。
		* 用途：后端无 installedAt 时前端记安装时间，供已装列表排序。
		* 读写：下方 re-export 的 getPluginInstalledAt，以及本模块 set/remove helpers。
		* 同源：PLUGINS_INSTALL_TIME_CACHE_KEY。
		*/
		pluginsInstallTime: PLUGINS_INSTALL_TIME_CACHE_KEY,
		/**
		* [共享 · 用户偏好] 套件自动更新开关 boolean。
		* 用途：添加 marketplace 时带上 autoUpdate；与通用版同一偏好。
		* 过期：无（持久偏好）。
		* 读写：readCache（裸 JSON boolean，勿走 loadCache）。
		* 同源：SUITES_AUTO_UPDATE_KEY。
		*/
		suitesAutoUpdate: SUITES_AUTO_UPDATE_KEY,
		/**
		* [共享 · 一次性 UI 标记] 启用数超限警告已关闭。
		* 用途：已装区启用数 > 阈值时的警告条；用户 dismiss 后不再展示，直到计数回落阈值以下再清标记。
		* 过期：无固定 TTL；计数 ≤ 阈值时主动 clear。
		* 读写：裸 localStorage 存 `'1'`（勿走 loadCache）；用 isWarningDismissed / setWarningDismissed。
		* 同源：SKILLS_WARNING_DISMISSED_KEY。
		*/
		warningDismissed: SKILLS_WARNING_DISMISSED_KEY,
		/**
		* [共享 · 日频 UI 标记] 批量更新弹窗「今日已展示」日期 YYYY-MM-DD。
		* 用途：面板打开且有可更新技能时每日最多自动弹一次；与通用版共用自然日。
		* 过期：按自然日语义（隔日字符串不等即视为未展示）；无 TTL 封装。
		* 读写：裸 localStorage 字符串；用 wasBatchUpdateModalShownToday / markBatchUpdateModalShownToday。
		* 同源：SKILLS_BATCH_UPDATE_MODAL_DATE_KEY。
		*/
		batchUpdateModalDate: SKILLS_BATCH_UPDATE_MODAL_DATE_KEY
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/skill-utils.ts
/** 判断技能是否已禁用模型调用 */
function isSkillModelInvocationDisabled(skill) {
	return skill.disableModelInvocation ?? false;
}
/** SkillInfo → UISkill：规整 frontmatter 字段、补齐 disable/installedAt */
function normalizeSkill(raw) {
	const content = raw.content;
	const rawWithExtras = raw;
	return {
		...raw,
		name: coerceSkillText(raw.name),
		description: coerceSkillText(raw.description),
		description_zh: rawWithExtras.description_zh !== void 0 ? coerceSkillText(rawWithExtras.description_zh) : void 0,
		description_en: rawWithExtras.description_en !== void 0 ? coerceSkillText(rawWithExtras.description_en) : void 0,
		content,
		disable: !!raw.disable,
		disableModelInvocation: raw.disableModelInvocation ?? false,
		installedAt: raw.installedAt
	};
}
/** Spotlight / Collection 推荐语：按语言取 recommendation_* */
function resolveRecommendationReason(skill, isEn) {
	return isEn ? skill.recommendation_en || skill.recommendation_zh : skill.recommendation_zh || skill.recommendation_en;
}
/** Collection 标题：按语言取 name，缺失时用 fallback */
function resolveCollectionTitle(collection, isEn, fallback) {
	return isEn ? collection.name.en || collection.name.zh || fallback : collection.name.zh || collection.name.en || fallback;
}
/** Builtin 市场卡片描述：按当前 locale 回退 description_en / description / description_zh */
function getBuiltinCardDescription(skill) {
	return toZhEnLocale(getLocale()) === "en" ? skill.description_en || skill.description || skill.description_zh || "" : skill.description_zh || skill.description || skill.description_en || "";
}
/** SkillHub / Knot 卡片描述：按当前 locale 回退 description / description_zh */
function getHubLikeCardDescription(skill) {
	return toZhEnLocale(getLocale()) === "en" ? skill.description || skill.description_zh || "" : skill.description_zh || skill.description || "";
}
/** 企业 Skill 卡片描述：按当前 locale 回退 description_en / description_zh */
function getEnterpriseCardDescription(skill) {
	return toZhEnLocale(getLocale()) === "en" ? skill.description_en || skill.description_zh || "" : skill.description_zh || skill.description_en || "";
}
var init_skill_utils = __esmMin((() => {
	init_i18n();
	init_text();
	init_types$3();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/installed.ts
/** 批量把命中 paths 的项写成目标调用态（乐观更新 / 失败回滚共用）。 */
function setInvocationStateFor(list, paths, value) {
	if (paths.size === 0) return list;
	return list.map((item) => paths.has(item.filePath) ? {
		...item,
		disable: false,
		disableModelInvocation: value
	} : item);
}
/** 落缓存前剔除 skill.md 正文，避免 localStorage 体积失控（正文由 DetailService 单独加载） */
function toCacheableSkills(skills) {
	return skills.map((skill) => ({
		...skill,
		content: void 0
	}));
}
var import_zustand$6, INSTALLED_SKILLS_CACHE_KEY, sharedInstalledSnapshot, InstalledSkillsService;
var init_installed = __esmMin((() => {
	import_zustand$6 = require_zustand();
	init_i18n();
	init_async_security_scan_service();
	init_extension_refresh_events();
	init_high_risk_notification_store();
	init_installed_skill_list_source();
	init_skill_perf_log();
	init_cache();
	init_skill_utils();
	INSTALLED_SKILLS_CACHE_KEY = "market-skills-cache:installed-skills";
	sharedInstalledSnapshot = null;
	InstalledSkillsService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$6.create)(() => {
				const cached = (sharedInstalledSnapshot ?? loadCache(INSTALLED_SKILLS_CACHE_KEY))?.filter(isInstalledListVisibleSkill);
				return {
					skills: cached ?? [],
					loading: false,
					loaded: !!cached,
					skillRiskMap: /* @__PURE__ */ new Map(),
					batchUpdating: false,
					installedCount: cached?.length ?? null,
					installedListReady: !!cached
				};
			});
			this.loadSkillsRequestId = 0;
			this.reconcileTimer = null;
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 写入风险扫描结果映射（由 lifecycle hook 注入）。
		*/
		setSkillRiskMap(skillRiskMap) {
			this.store.setState({ skillRiskMap });
		}
		/**
		* 清除指定技能的风险标记（持久化 + 本地 store）。
		*/
		clearRisk(filePath) {
			asyncSecurityScanService.clearRisk(filePath);
			const next = new Map(this.store.getState().skillRiskMap);
			if (next.delete(filePath)) this.store.setState({ skillRiskMap: next });
		}
		/**
		* 加载已安装技能列表，支持静默刷新。
		*/
		async loadSkills(silent = false) {
			const t0 = Date.now();
			skillPerfLog("svc.loadSkills.start", { silent });
			const requestId = ++this.loadSkillsRequestId;
			const personalSkills = this.deps.host.facades.personalSkills;
			if (!personalSkills) {
				this.store.setState({
					skills: [],
					loaded: true,
					installedCount: 0,
					installedListReady: true
				});
				return [];
			}
			if (!silent) this.store.setState({ loading: true });
			try {
				const rpcStartedAt = Date.now();
				const response = await loadInstalledSkillList(personalSkills, {
					excludePluginSkills: true,
					bypassBaseCache: true
				});
				const rpcMs = Date.now() - rpcStartedAt;
				if (requestId !== this.loadSkillsRequestId) {
					skillPerfLog("svc.loadSkills.stale", { requestId });
					return [];
				}
				const allSkills = (response.results || []).map((s) => normalizeSkill(s));
				const mapMs = Date.now() - rpcStartedAt - rpcMs;
				let installed = allSkills.filter((skill) => isInstalledListVisibleSkill(skill));
				const filterDoneAt = Date.now();
				installed = installed.sort((a, b) => (b.installedAt ?? 0) - (a.installedAt ?? 0));
				const sortMs = Date.now() - filterDoneAt;
				const prevCount = this.store.getState().installedCount;
				this.store.setState({
					skills: installed,
					loading: false,
					loaded: true,
					installedCount: installed.length,
					installedListReady: true
				});
				sharedInstalledSnapshot = installed;
				storeCache(INSTALLED_SKILLS_CACHE_KEY, toCacheableSkills(installed));
				skillPerfLog("svc.loadSkills.done", {
					silent,
					rpcMs,
					mapMs,
					sortMs,
					totalMs: Date.now() - t0,
					rawN: allSkills.length,
					installedN: installed.length,
					countDelta: prevCount === null ? null : installed.length - prevCount
				});
				return installed;
			} finally {
				if (requestId === this.loadSkillsRequestId) this.store.setState({
					loading: false,
					loaded: true
				});
			}
		}
		/**
		* 安装/更新后延迟对账：全量扫描耗时随已装总数线性增长，不能挡在交互路径上。
		* 连续操作只保留最后一次，避免批量场景触发 N 轮全盘扫描。
		*/
		scheduleReconcile(delayMs = 800) {
			if (this.reconcileTimer) clearTimeout(this.reconcileTimer);
			this.reconcileTimer = setTimeout(() => {
				this.reconcileTimer = null;
				this.loadSkills(true).catch(() => void 0);
			}, delayMs);
		}
		/**
		* 安装成功后的乐观插入：代替等一轮全量重扫。
		* 按 installedAt 降序插位（列表已有序），避开 10 万元素全排；同 path 视为重装则覆盖。
		*/
		upsertInstalledSkill(seed) {
			invalidateInstalledSkillList();
			const base = this.store.getState().skills;
			const isNew = !base.some((item) => item.filePath === seed.filePath);
			const next = base.filter((item) => item.filePath !== seed.filePath);
			const at = seed.installedAt ?? 0;
			const index = next.findIndex((item) => (item.installedAt ?? 0) <= at);
			next.splice(index < 0 ? next.length : index, 0, seed);
			const prevCount = this.store.getState().installedCount;
			this.store.setState({
				skills: next,
				installedCount: isNew ? (prevCount ?? next.length - 1) + 1 : prevCount
			});
			skillPerfLog("svc.upsertInstalled", {
				name: seed.name,
				isNew,
				n: next.length
			});
			notifySkillListRefresh();
		}
		/**
		* 各市场安装成功后的统一收尾。
		* 带 seed（daemon 回传 installedPath）时乐观插入，秒级可见；缺失才退回纯后台对账。
		*/
		notifySkillInstalled(seed) {
			if (seed) this.upsertInstalledSkill(seed);
			else invalidateInstalledSkillList();
			this.scheduleReconcile();
		}
		/**
		* 启用或禁用指定已安装技能。
		* @param selectedSkill 当前详情页选中的 skill（列表场景传 null）
		* @param afterToggle 开关结束后同步详情选中态（成功写新状态，失败回滚）
		*/
		async toggleSkill(skillPath, enabled, selectedSkill = null, afterToggle) {
			const personalSkills = this.deps.host.facades.personalSkills;
			const disableModelInvocation = !enabled;
			const updateInvocationState = (list, value) => list.map((item) => {
				if (item.filePath !== skillPath) return item;
				return {
					...item,
					disable: false,
					disableModelInvocation: value
				};
			});
			this.store.setState((s) => ({ skills: updateInvocationState(s.skills, disableModelInvocation) }));
			if (personalSkills) {
				const startedAt = Date.now();
				const result = await personalSkills.toggle({
					filePath: skillPath,
					disable: disableModelInvocation
				});
				const durationMs = Date.now() - startedAt;
				const { skills } = this.store.getState();
				const skill = selectedSkill?.filePath === skillPath ? selectedSkill : skills.find((s) => s.filePath === skillPath);
				const baseDims = {
					name: skill?.name ?? skillPath,
					skillId: skill?.skillId || skill?.slug,
					skillVersion: skill?.version,
					action: enabled ? "enable" : "disable",
					source: "installed",
					durationMs
				};
				if (!result.success) {
					this.store.setState((s) => ({ skills: updateInvocationState(s.skills, enabled) }));
					if (selectedSkill?.filePath === skillPath) afterToggle?.(selectedSkill ? {
						...selectedSkill,
						disableModelInvocation: isSkillModelInvocationDisabled(selectedSkill)
					} : null);
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						...baseDims,
						outcome: "failed",
						errorReason: result.error ?? ""
					});
					return {
						success: false,
						errorMessage: result.error || t("skills.toast.toggleFailed")
					};
				}
				this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
					...baseDims,
					outcome: "success"
				});
			}
			if (selectedSkill?.filePath === skillPath) afterToggle?.(selectedSkill ? {
				...selectedSkill,
				disable: false,
				disableModelInvocation
			} : null);
			await this.loadSkills(true);
			notifySkillListRefresh();
			return { success: true };
		}
		/**
		* 卸载单个已安装技能。toast 由界面根据返回结果处理。
		* @param afterUninstall 卸载成功后的收尾（如清空详情选中态）
		*/
		async uninstall(skill, afterUninstall) {
			const t0 = Date.now();
			const personalSkills = this.deps.host.facades.personalSkills;
			if (!skill) return {
				success: false,
				errorMessage: t("skills.toast.deleteFailed")
			};
			if (personalSkills) {
				const result = await skillPerfTime("svc.uninstall.rpc", { name: skill.name }, () => personalSkills.delete({
					filePath: skill.filePath,
					name: skill.name,
					assetType: skill.assetType
				}));
				if (!result.success) return {
					success: false,
					errorMessage: result.error || t("skills.toast.deleteFailed")
				};
			}
			afterUninstall?.();
			this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
				name: skill.name,
				skillId: skill.skillId || skill.slug,
				skillVersion: skill.version,
				action: "uninstall",
				source: "installed"
			});
			this.removeSkillsFromStore([skill]);
			this.forgetSourcePresence([skill]);
			this.clearRisk(skill.filePath);
			invalidateInstalledSkillList();
			notifySkillListRefresh();
			skillPerfLog("svc.uninstall.done", {
				name: skill.name,
				totalMs: Date.now() - t0
			});
			return { success: true };
		}
		/**
		* 批量卸载已安装技能。toast 由界面根据返回结果处理。
		*/
		async batchUninstall(skills) {
			const t0 = Date.now();
			skillPerfLog("svc.batchUninstall.start", { n: skills.length });
			const personalSkills = this.deps.host.facades.personalSkills;
			if (!personalSkills || skills.length === 0) return {
				successCount: 0,
				failedNames: []
			};
			let successCount = 0;
			let rpcTotalMs = 0;
			const logEachItem = skills.length <= 20;
			const failedNames = [];
			const succeeded = [];
			for (const skill of skills) {
				const itemStartedAt = Date.now();
				const result = await personalSkills.delete({
					filePath: skill.filePath,
					name: skill.name,
					assetType: skill.assetType
				});
				const itemMs = Date.now() - itemStartedAt;
				rpcTotalMs += itemMs;
				if (logEachItem) skillPerfLog("svc.batchUninstall.item", {
					name: skill.name,
					ms: itemMs
				});
				if (result.success) {
					successCount++;
					succeeded.push(skill);
					this.clearRisk(skill.filePath);
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						name: skill.name,
						skillId: skill.skillId || skill.slug,
						skillVersion: skill.version,
						action: "uninstall",
						source: "installed"
					});
				} else failedNames.push(skill.name);
			}
			if (successCount > 0) {
				this.removeSkillsFromStore(succeeded);
				this.forgetSourcePresence(succeeded);
				invalidateInstalledSkillList();
				notifySkillListRefresh();
			}
			skillPerfLog("svc.batchUninstall.done", {
				n: skills.length,
				successCount,
				rpcTotalMs,
				totalMs: Date.now() - t0
			});
			return {
				successCount,
				failedNames
			};
		}
		/**
		* 批量启用或禁用已安装技能。toast 由界面根据返回结果处理。
		*/
		async batchToggle(skills, enable) {
			const personalSkills = this.deps.host.facades.personalSkills;
			if (!personalSkills || skills.length === 0) return {
				successCount: 0,
				failedNames: []
			};
			const disableModelInvocation = !enable;
			const toToggle = skills.filter((skill) => isSkillModelInvocationDisabled(skill) !== disableModelInvocation);
			if (toToggle.length === 0) return {
				successCount: 0,
				failedNames: []
			};
			const startedAt = Date.now();
			const targetPaths = toToggle.map((skill) => skill.filePath);
			this.store.setState((s) => ({ skills: setInvocationStateFor(s.skills, new Set(targetPaths), disableModelInvocation) }));
			skillPerfLog("svc.batchToggle.start", {
				n: skills.length,
				enable,
				toToggleN: toToggle.length
			});
			const result = await personalSkills.batchToggle({
				filePaths: targetPaths,
				overrideKeys: toToggle.map((skill) => skill.overrideKey),
				disable: disableModelInvocation
			});
			const durationMs = Date.now() - startedAt;
			const failedPaths = new Set((result.failed ?? []).map((item) => item.filePath));
			const succeededPaths = new Set(result.succeeded?.length ? result.succeeded : targetPaths.filter((p) => !failedPaths.has(p)));
			const successCount = toToggle.filter((skill) => succeededPaths.has(skill.filePath)).length;
			const failedNames = toToggle.filter((skill) => !succeededPaths.has(skill.filePath)).map((skill) => skill.name);
			if (failedNames.length > 0) {
				const rollbackPaths = new Set(toToggle.filter((skill) => !succeededPaths.has(skill.filePath)).map((skill) => skill.filePath));
				this.store.setState((s) => ({ skills: setInvocationStateFor(s.skills, rollbackPaths, !disableModelInvocation) }));
			}
			for (const skill of toToggle) {
				const ok = succeededPaths.has(skill.filePath);
				this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
					name: skill.name,
					skillId: skill.skillId || skill.slug,
					skillVersion: skill.version,
					action: enable ? "enable" : "disable",
					source: "installed",
					durationMs,
					outcome: ok ? "success" : "failed",
					...ok ? {} : { errorReason: result.error ?? "" }
				});
			}
			if (successCount > 0) {
				invalidateInstalledSkillList();
				notifySkillListRefresh();
			}
			skillPerfLog("svc.batchToggle.done", {
				n: skills.length,
				toToggleN: toToggle.length,
				enable,
				rpcMs: durationMs,
				totalMs: Date.now() - startedAt
			});
			return {
				successCount,
				failedNames
			};
		}
		/**
		* 按远端标识反查已装条目（Issue #41287：更新前查 userModified）。
		* 匹配优先级：skillId → slug → name（大小写不敏感）。
		* @param skills 可选；UI 写法二应传入已订阅的 skills 快照；命令式/事件回调省略则读当前 store。
		*/
		findInstalledMatch(query, skills) {
			const skillId = query.skillId?.trim() || "";
			const slug = (query.slug || "").toLowerCase();
			const name = (query.name || "").toLowerCase();
			return (skills ?? this.store.getState().skills).find((skill) => {
				if (skillId && skill.skillId === skillId) return true;
				const localSlug = (skill.slug || "").toLowerCase();
				const localName = (skill.name || "").toLowerCase();
				if (slug && (localSlug === slug || localName === slug)) return true;
				if (name && localName === name) return true;
				return false;
			});
		}
		/**
		* 按来源优先级更新单个技能：Enterprise → OP（含 getByIds 兜底）→ Hub → Knot。
		* 已编辑覆盖确认由界面经 UIService.guard* 处理，本方法不再拦截。
		*/
		async updateSkill(skill) {
			try {
				return await this.runUpdateSkill(skill);
			} catch {
				return {
					success: false,
					errorMessage: t("skills.recommend.installFailed", { name: skill.name })
				};
			}
		}
		/**
		* 实际执行单技能更新：按 Enterprise → Builtin → Hub → Knot 优先级分发到对应 Service。
		* 成功时按需静默刷新已装列表，并通知更新红点。
		*/
		async runUpdateSkill(skill) {
			const fail = () => ({
				success: false,
				errorMessage: t("skills.recommend.installFailed", { name: skill.name })
			});
			if (this.services.enterpriseService.resolveUpdateInfo(skill).hasUpdate) return {
				...await this.services.enterpriseService.update(skill),
				source: "enterprise"
			};
			const builtin = this.services.marketBuiltinService.resolveUpdateInfo(skill);
			const backendSkillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : void 0;
			if (builtin.hasUpdate || backendSkillId) {
				const bm = await this.services.marketBuiltinService.resolveSkillForUpdate(skill);
				if (bm) {
					const result = await this.services.marketBuiltinService.update(bm);
					if (result.success) {
						this.scheduleReconcile();
						notifySkillsUpdateBadgeRefresh();
					}
					return {
						...result,
						source: "builtin"
					};
				}
				if (builtin.hasUpdate || backendSkillId) return fail();
			}
			const hub = this.services.skillhubService.resolveUpdateInfo(skill);
			if (hub.hasUpdate) {
				const target = hub.hubSkill ?? {
					slug: hub.slug,
					name: skill.name,
					version: hub.remoteVersion
				};
				const result = await this.services.skillhubService.update(target);
				if (result.success) notifySkillsUpdateBadgeRefresh();
				return {
					...result,
					source: "hub"
				};
			}
			if (this.services.knotService.resolveUpdateInfo(skill).hasUpdate) {
				const target = await this.services.knotService.resolveSkillForUpdate(skill);
				if (!target) return fail();
				const result = await this.services.knotService.update(target);
				if (result.success) notifySkillsUpdateBadgeRefresh();
				return {
					...result,
					source: "knot"
				};
			}
			return fail();
		}
		/**
		* 批量更新多个可更新技能。
		* 来源顺序：Hub → Knot → Enterprise → Builtin。toast 由界面处理。
		*/
		async batchUpdate(skills) {
			if (skills.length === 0) return {
				successCount: 0,
				failedNames: []
			};
			this.store.setState({ batchUpdating: true });
			let successCount = 0;
			const failedNames = [];
			try {
				for (const item of skills) try {
					let ok = false;
					const hubUpdate = this.services.skillhubService.resolveUpdateInfo(item.skill);
					if (hubUpdate.hasUpdate) {
						const remoteName = hubUpdate.remoteName;
						const target = hubUpdate.hubSkill ? remoteName ? {
							...hubUpdate.hubSkill,
							name: remoteName
						} : hubUpdate.hubSkill : {
							slug: hubUpdate.slug,
							name: remoteName || item.skill.name,
							version: hubUpdate.remoteVersion ?? item.latestVersion
						};
						ok = (await this.services.skillhubService.update(target)).success;
					} else if (this.services.knotService.resolveUpdateInfo(item.skill).hasUpdate) {
						const target = await this.services.knotService.resolveSkillForUpdate(item.skill);
						ok = !!target && (await this.services.knotService.update(target)).success;
					} else if (this.services.enterpriseService.resolveUpdateInfo(item.skill).hasUpdate) ok = (await this.services.enterpriseService.update(item.skill)).success;
					else {
						const bm = await this.services.marketBuiltinService.resolveSkillForUpdate(item.skill);
						if (bm && this.services.marketBuiltinService.resolveUpdateInfo(item.skill).hasUpdate) ok = (await this.services.marketBuiltinService.update(bm)).success;
					}
					if (ok) successCount++;
					else failedNames.push(item.skill.name);
				} catch {
					failedNames.push(item.skill.name);
				}
				if (successCount > 0) {
					this.scheduleReconcile();
					this.services.marketBuiltinService.resetUpdateCheck();
					this.services.enterpriseService.reset();
					this.services.skillhubService.reset();
					this.services.knotService.reset();
					notifySkillsUpdateBadgeRefresh();
				}
				return {
					successCount,
					failedNames
				};
			} finally {
				this.store.setState({ batchUpdating: false });
			}
		}
		/**
		* 聚合各来源，返回技能的更新状态。
		*/
		resolveUpdateInfo(skill) {
			const enterprise = this.services.enterpriseService.resolveUpdateInfo(skill);
			const builtin = this.services.marketBuiltinService.resolveUpdateInfo(skill);
			const hub = this.services.skillhubService.resolveUpdateInfo(skill);
			const knot = this.services.knotService.resolveUpdateInfo(skill);
			return this.resolveMarketSkillUpdate(skill, {
				enterprise: {
					hasUpdate: enterprise.hasUpdate,
					isUpdating: !!enterprise.isUpdating,
					remoteVersion: enterprise.remoteVersion
				},
				builtin: {
					hasUpdate: builtin.hasUpdate,
					isUpdating: !!builtin.isUpdating,
					remoteVersion: builtin.remoteVersion,
					builtinMarketSkill: builtin.skill
				},
				hub: {
					hasUpdate: hub.hasUpdate,
					isUpdating: !!hub.isUpdating,
					remoteVersion: hub.remoteVersion,
					hubSkill: hub.hubSkill
				},
				knot: {
					hasUpdate: knot.hasUpdate,
					isUpdating: !!knot.isUpdating,
					remoteVersion: knot.remoteVersion,
					knotSkill: knot.hubSkill
				}
			});
		}
		/**
		* 收集所有有可用更新的已安装技能。
		*/
		getUpdatableSkills(installedSkills = this.store.getState().skills) {
			const hubResolveUpdateInfo = (s) => this.services.skillhubService.resolveUpdateInfo(s);
			const knotResolveUpdateInfo = (s) => this.services.knotService.resolveUpdateInfo(s);
			const builtinResolveUpdateInfo = (s) => this.services.marketBuiltinService.resolveUpdateInfo(s);
			const enterpriseResolveUpdateInfo = (s) => this.services.enterpriseService.resolveUpdateInfo(s);
			return this.collectUpdatableSkills(installedSkills, [
				hubResolveUpdateInfo,
				knotResolveUpdateInfo,
				builtinResolveUpdateInfo,
				enterpriseResolveUpdateInfo
			]);
		}
		/**
		* 按 Enterprise → Builtin → Hub → Knot 优先级，从各源状态中选出当前生效的更新态。
		*/
		resolveMarketSkillUpdate(skill, sources) {
			const { enterprise, builtin, hub, knot } = sources;
			if (enterprise.hasUpdate || enterprise.isUpdating) return {
				hasUpdate: enterprise.hasUpdate,
				isUpdating: enterprise.isUpdating,
				latestVersion: enterprise.remoteVersion
			};
			if (builtin.hasUpdate || builtin.isUpdating) return {
				hasUpdate: builtin.hasUpdate,
				isUpdating: builtin.isUpdating,
				latestVersion: builtin.remoteVersion
			};
			if (hub.hasUpdate || hub.isUpdating) return {
				hasUpdate: hub.hasUpdate,
				isUpdating: hub.isUpdating,
				latestVersion: hub.remoteVersion
			};
			return {
				hasUpdate: knot.hasUpdate,
				isUpdating: knot.isUpdating,
				latestVersion: knot.remoteVersion
			};
		}
		/**
		* 遍历已装列表，取各源 resolveUpdateInfo 中第一个有 remoteVersion 的更新，按 name 去重。
		*/
		collectUpdatableSkills(installedSkills, getSourceUpdates) {
			const result = [];
			const included = /* @__PURE__ */ new Set();
			for (const skill of installedSkills) {
				if (included.has(skill.name)) continue;
				let update;
				for (const resolveUpdateInfo of getSourceUpdates) {
					const candidate = resolveUpdateInfo(skill);
					if (candidate.hasUpdate && candidate.remoteVersion) {
						update = candidate;
						break;
					}
				}
				if (!update?.remoteVersion) continue;
				result.push({
					skill,
					currentVersion: skill.version || "",
					latestVersion: update.remoteVersion
				});
				included.add(skill.name);
			}
			return result;
		}
		/**
		* 乐观移出已装列表（卸载成功、loadSkills 对齐前）。
		*/
		removeSkillsFromStore(skills) {
			if (skills.length === 0) return;
			const paths = new Set(skills.map((skill) => skill.filePath).filter(Boolean));
			if (paths.size === 0) return;
			this.store.setState((s) => ({
				skills: s.skills.filter((item) => !paths.has(item.filePath)),
				installedCount: s.installedCount === null ? null : Math.max(0, s.installedCount - paths.size)
			}));
		}
		/**
		* 卸载成功后清各源刚装白名单 / localVersionMap，避免浏览列表幽灵「已安装」。
		*/
		forgetSourcePresence(skills) {
			for (const skill of skills) {
				this.services.skillhubService.forgetUninstalled(skill);
				this.services.knotService.forgetUninstalled(skill);
				this.services.marketBuiltinService.forgetUninstalled(skill);
				this.services.enterpriseService.forgetUninstalled(skill);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/knot.ts
var import_zustand$5, KnotService;
var init_knot = __esmMin((() => {
	import_zustand$5 = require_zustand();
	init_i18n();
	init_account();
	init_constants();
	init_installed_identity();
	init_version();
	KnotService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$5.create)(() => ({
				skills: [],
				categories: [],
				tags: [],
				categoriesReady: false,
				selectedCategory: "",
				selectedTag: "",
				total: 0,
				page: 1,
				loading: false,
				error: false,
				remoteVersionMap: {},
				localVersionMap: {},
				installingSlug: null,
				recentlyInstalledSlugs: /* @__PURE__ */ new Set(),
				updateCheckCompleted: false,
				loaded: false,
				enteredOnce: false
			}));
			this.listCache = /* @__PURE__ */ new Map();
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 获取 SkillsMarketplace facade（不可用时返回 undefined）。
		*/
		get facade() {
			try {
				return this.deps.host.facades.skillsMarketplace;
			} catch {
				return;
			}
		}
		/**
		* 当前账号是否为 IOA 企业用户。
		*/
		get isIOA() {
			return isIOAUser(this.deps.host.accountInfo?.enterpriseId ?? "");
		}
		/**
		* Knot 源是否允许加载（仅 IOA）。
		*/
		get canLoad() {
			return this.isIOA;
		}
		/**
		* 加载 Knot 分类列表。
		*/
		async loadCategories() {
			const facade = this.facade;
			if (!facade) {
				this.store.setState({ categories: [] });
				return;
			}
			try {
				const res = await facade.knot.getCategories();
				this.store.setState({ categories: (res.items || []).filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder) });
			} catch {
				this.store.setState({ categories: [] });
			}
		}
		/**
		* 加载 Knot 标签列表。
		*/
		async loadTags() {
			const facade = this.facade;
			if (!facade) {
				this.store.setState({ tags: [] });
				return;
			}
			try {
				const res = await facade.knot.getTags();
				this.store.setState({ tags: res.code === 0 && Array.isArray(res.data) ? res.data : [] });
			} catch {
				this.store.setState({ tags: [] });
			}
		}
		/**
		* 并行拉取分类与标签，完成后标记 categoriesReady。
		*/
		async loadFilters() {
			this.store.setState({ categoriesReady: false });
			try {
				await Promise.all([this.loadTags(), this.loadCategories()]);
			} finally {
				this.store.setState({ categoriesReady: true });
			}
		}
		/**
		* 分页拉取 Knot 技能列表。
		*/
		async fetchSkills(nextPage = 1, append = false) {
			const facade = this.facade;
			if (!facade) {
				this.store.setState({ error: true });
				return;
			}
			const { selectedCategory, selectedTag } = this.store.getState();
			const cacheKey = this.buildListCacheKey(selectedCategory, selectedTag);
			const isFirstPage = nextPage === 1 && !append;
			const cachedEntry = isFirstPage ? this.listCache.get(cacheKey) ?? null : null;
			const cached = cachedEntry && cachedEntry.skills.length > 0 ? cachedEntry : null;
			if (cached) this.store.setState({
				skills: cached.skills,
				total: cached.total,
				page: 1,
				loading: false,
				error: false
			});
			else if (isFirstPage) this.store.setState({
				skills: [],
				total: 0,
				page: 1,
				loading: true,
				error: false
			});
			else this.store.setState({
				loading: true,
				error: false
			});
			try {
				const category = selectedCategory || selectedTag || void 0;
				const res = await facade.knot.list({
					page: nextPage,
					pageSize: 100,
					sortBy: "score",
					order: "desc",
					category
				});
				const current = this.store.getState();
				if (this.buildListCacheKey(current.selectedCategory, current.selectedTag) !== cacheKey) return;
				const nextSkills = res.data?.skills || [];
				const total = res.data?.total ?? 0;
				const nextVersions = {};
				for (const skill of nextSkills) nextVersions[skill.slug] = skill.version;
				this.store.setState({
					skills: append ? [...current.skills, ...nextSkills] : nextSkills,
					total,
					page: nextPage,
					loading: false,
					remoteVersionMap: {
						...current.remoteVersionMap,
						...nextVersions
					}
				});
				if (isFirstPage && nextSkills.length > 0) this.writeListCache(cacheKey, {
					skills: nextSkills,
					total
				});
			} catch {
				const current = this.store.getState();
				if (this.buildListCacheKey(current.selectedCategory, current.selectedTag) === cacheKey) this.store.setState({
					error: true,
					loading: false
				});
			}
		}
		/**
		* 生成列表内存缓存 key（按 category / tag / score 分片）
		*/
		buildListCacheKey(category, tag) {
			return `${category}|${tag}|score`;
		}
		/**
		* 写入第一页内存缓存（超出上限时删 Map 中最旧条目）
		*/
		writeListCache(cacheKey, entry) {
			if (entry.skills.length === 0) return;
			if (this.listCache.size >= 12 && !this.listCache.has(cacheKey)) {
				const oldest = this.listCache.keys().next().value;
				if (oldest) this.listCache.delete(oldest);
			}
			this.listCache.delete(cacheKey);
			this.listCache.set(cacheKey, entry);
		}
		/**
		* 加载首屏浏览数据（已加载或非 IOA 则跳过）。
		*/
		loadFirstPageSkills() {
			const { loaded } = this.store.getState();
			if (!this.canLoad) {
				this.store.setState({ categoriesReady: true });
				return;
			}
			if (loaded) return;
			this.store.setState({ loaded: true });
			this.fetchSkills(1);
			this.loadFilters();
		}
		/**
		* 再次进入该源时刷新第一页；首次进入跳过（避免与 loadFirstPageSkills 叠请求）。
		*/
		reloadOnReenter() {
			const { loaded, enteredOnce } = this.store.getState();
			this.store.setState({ enteredOnce: true });
			if (!this.canLoad || !loaded || !enteredOnce) return;
			this.fetchSkills(1);
		}
		/**
		* 设置分类并重新拉取第一页；命中内存缓存时静默刷新
		*/
		setCategory(category) {
			if (this.store.getState().selectedCategory === category) return;
			this.store.setState({
				selectedCategory: category,
				page: 1
			});
			this.fetchSkills(1);
		}
		/**
		* 设置标签并重新拉取第一页；命中内存缓存时静默刷新
		*/
		setSelectedTag(tag) {
			if (this.store.getState().selectedTag === tag) return;
			this.store.setState({
				selectedTag: tag,
				page: 1
			});
			this.fetchSkills(1);
		}
		/**
		* 加载指定页（可追加）。
		*/
		loadPage(page, append = false) {
			this.fetchSkills(page, append);
		}
		/**
		* 判断技能是否正在安装。
		*/
		isInstalling(skill) {
			const slug = typeof skill === "string" ? skill : skill.slug;
			return this.store.getState().installingSlug === slug;
		}
		/**
		* 判断技能是否已安装（命令式，读已装列表）。
		*/
		isInstalled(skill) {
			const item = typeof skill === "string" ? {
				slug: skill,
				name: skill
			} : skill;
			return this.computeIsInstalled(item, {
				installedSkills: this.services.installedSkillsService.useStore.getState().skills,
				localVersionMap: this.store.getState().localVersionMap
			});
		}
		/**
		* 清空本会话刚安装白名单。
		*/
		clearRecentlyInstalled() {
			if (this.store.getState().recentlyInstalledSlugs.size === 0) return;
			this.store.setState({ recentlyInstalledSlugs: /* @__PURE__ */ new Set() });
		}
		/**
		* 卸载后收口：去掉刚装白名单与 localVersionMap，避免浏览卡「幽灵已装」。
		*/
		forgetUninstalled(skill) {
			const keys = [
				skill.slug,
				skill.name,
				skill.name?.toLowerCase()
			].filter((key) => !!key && key.trim().length > 0);
			if (keys.length === 0) return;
			this.store.setState((s) => {
				let recently = s.recentlyInstalledSlugs;
				let recentChanged = false;
				for (const key of keys) if (recently.has(key)) {
					if (!recentChanged) {
						recently = new Set(recently);
						recentChanged = true;
					}
					recently.delete(key);
				}
				const nextLocal = { ...s.localVersionMap };
				let localChanged = false;
				for (const key of keys) if (key in nextLocal) {
					delete nextLocal[key];
					localChanged = true;
				}
				if (!recentChanged && !localChanged) return s;
				return {
					...recentChanged ? { recentlyInstalledSlugs: recently } : {},
					...localChanged ? { localVersionMap: nextLocal } : {}
				};
			});
		}
		/**
		* UI：是否已装（浏览 filter；与 InstallStatus.Update 无关）。
		* localVersionMap key 存在即本源 meta（含空串未知版本）；否则回落强/弱键双索引。
		*/
		computeIsInstalled(skill, sources) {
			if (skill.slug in sources.localVersionMap) return true;
			return hasInstalledIdentity(buildInstalledIdentityIndex(sources.installedSkills), {
				strong: [skill.slug],
				name: skill.name
			}, ["knot"]);
		}
		/**
		* UI：是否本会话刚装（浏览 filter 白名单）。
		*/
		computeIsRecentlyInstalled(skill, sources) {
			return sources.recentlyInstalledSlugs.has(skill.slug);
		}
		/**
		* UI：由调用方传入 sources，计算浏览卡安装按钮态。
		*/
		computeInstallState(skill, sources) {
			const { installingSlug, installedSkills, remoteVersionMap: versionMap, localVersionMap, recentlyInstalledSlugs } = sources;
			if (installingSlug === skill.slug) return {
				status: InstallStatus.Installing,
				disabled: true
			};
			const recently = this.computeIsRecentlyInstalled(skill, { recentlyInstalledSlugs });
			const installed = this.computeIsInstalled(skill, {
				installedSkills,
				localVersionMap
			});
			if (!recently && !installed) return {
				status: InstallStatus.Install,
				disabled: false
			};
			if (installed && skill.slug in localVersionMap) {
				const remoteVersion = versionMap[skill.slug] || skill.version;
				const localVersion = localVersionMap[skill.slug];
				if (remoteVersion && (!localVersion || isNewerVersion(remoteVersion, localVersion))) return {
					status: InstallStatus.Update,
					disabled: false
				};
			}
			return {
				status: InstallStatus.Installed,
				disabled: true
			};
		}
		/**
		* 命令式：从当前 store 解析安装按钮态。
		*/
		resolveInstallState(skill) {
			const { installingSlug, remoteVersionMap, localVersionMap, recentlyInstalledSlugs } = this.store.getState();
			return this.computeInstallState(skill, {
				installingSlug,
				installedSkills: this.services.installedSkillsService.useStore.getState().skills,
				remoteVersionMap,
				localVersionMap,
				recentlyInstalledSlugs
			});
		}
		/**
		* 安装指定 Knot 技能。
		*/
		install(skill) {
			return this.installOrUpdate(skill, false);
		}
		/**
		* 更新指定 Knot 技能（底层仍走 install 接口）。
		*/
		update(skill) {
			return this.installOrUpdate(skill, true);
		}
		/**
		* 安装/更新共用实现；isUpdate 仅影响埋点 action。
		*/
		async installOrUpdate(skill, isUpdate) {
			this.store.setState({ installingSlug: skill.slug });
			const facade = this.facade;
			try {
				const result = facade ? await facade.knot.install(skill.id, skill.version, skill.name, skill.skill_name, skill.slug, skill.iconUrl) : {
					success: false,
					skillName: skill.slug,
					errorMessage: "SkillsMarketplace facade not available"
				};
				if (result.success) {
					facade?.knot.reportStats(skill.slug, {
						installs: 1,
						downloads: 1
					});
					const skillId = skill.slug || String(skill.id);
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillInstalled, {
						name: skill.name,
						skillId,
						skillVersion: skill.version
					});
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						name: skill.name,
						skillId,
						skillVersion: skill.version,
						action: isUpdate ? "update" : "install",
						source: "knot"
					});
					const recent = new Set(this.store.getState().recentlyInstalledSlugs);
					recent.add(skill.slug);
					this.store.setState({ recentlyInstalledSlugs: recent });
					const installedVersion = this.store.getState().remoteVersionMap[skill.slug] || skill.version;
					if (installedVersion) this.markInstalledVersion(skill.slug, installedVersion);
					const installedPath = result.installedPath;
					this.services.installedSkillsService.notifySkillInstalled(installedPath ? {
						...skill,
						name: skill.name,
						description: skill.description,
						filePath: installedPath,
						slug: skill.slug,
						version: installedVersion,
						installedAt: Date.now(),
						source: "userSettings",
						disable: false,
						disableModelInvocation: false
					} : void 0);
					return { success: true };
				}
				const errMsg = result.errorMessage || "";
				return {
					success: false,
					errorMessage: t(errMsg.startsWith("[DOWNLOAD_ERROR]") ? "skills.knot.installFailed.download" : "skills.knot.installFailed.package")
				};
			} catch {
				return {
					success: false,
					errorMessage: t("skills.knot.installFailed.download")
				};
			} finally {
				this.store.setState({ installingSlug: null });
			}
		}
		/**
		* 检测已安装 Knot 技能是否有更新。
		*/
		async checkUpdates(updateCheckEnabled, installedSkills) {
			if (!updateCheckEnabled || !this.isIOA) {
				this.store.setState({ updateCheckCompleted: true });
				return;
			}
			const facade = this.facade;
			try {
				const metas = facade ? await facade.knot.getInstalledMetas() : [];
				const localMap = {};
				for (const meta of metas) localMap[meta.slug] = meta.version || "";
				this.store.setState({ localVersionMap: localMap });
				if (metas.length === 0) {
					this.store.setState({ updateCheckCompleted: true });
					return;
				}
				const ids = metas.map((m) => m.id).filter((v) => typeof v === "number");
				if (ids.length === 0 || !facade) {
					this.store.setState({ updateCheckCompleted: true });
					return;
				}
				const byIdsRes = await facade.knot.getByIds(ids);
				if (byIdsRes?.code === 0 && Array.isArray(byIdsRes.data)) {
					const remoteMap = {};
					for (const skill of byIdsRes.data) if (skill?.slug && skill?.version) remoteMap[skill.slug] = skill.version;
					if (Object.keys(remoteMap).length > 0) this.store.setState({ remoteVersionMap: {
						...this.store.getState().remoteVersionMap,
						...remoteMap
					} });
				}
			} catch (err) {
				console.error("[KnotService] update check failed:", err);
				this.store.setState({ localVersionMap: {} });
			} finally {
				this.store.setState({ updateCheckCompleted: true });
			}
		}
		/**
		* 重置更新检测相关状态。
		*/
		reset() {
			this.store.setState({
				updateCheckCompleted: false,
				localVersionMap: {}
			});
		}
		/**
		* 记录技能安装后的本地版本与远程缓存。
		*/
		markInstalledVersion(slug, version) {
			this.store.setState({
				localVersionMap: {
					...this.store.getState().localVersionMap,
					[slug]: version
				},
				remoteVersionMap: {
					...this.store.getState().remoteVersionMap,
					[slug]: version
				}
			});
		}
		/**
		* 解析更新用的完整 Knot 技能：浏览列表命中则复用，否则按 meta id getByIds 现拉。
		*/
		async resolveSkillForUpdate(skill) {
			const info = this.resolveUpdateInfo(skill);
			if (info.hubSkill) return info.hubSkill;
			if (!info.hasUpdate && !info.isUpdating) return;
			const facade = this.facade;
			if (!facade) return;
			const slug = info.slug ?? skill.slug ?? skill.name.toLowerCase();
			const nameLower = skill.name.toLowerCase();
			let id;
			try {
				const meta = (await facade.knot.getInstalledMetas()).find((m) => m.slug === slug || (m.name || "").toLowerCase() === nameLower);
				if (typeof meta?.id !== "number") return;
				id = meta.id;
			} catch (err) {
				console.warn("[KnotService] getInstalledMetas for update failed:", err);
				return;
			}
			try {
				const byIdsRes = await facade.knot.getByIds([id]);
				if (byIdsRes?.code !== 0 || !Array.isArray(byIdsRes.data)) return;
				return byIdsRes.data.find((item) => item.id === id || item.slug === slug);
			} catch (err) {
				console.warn("[KnotService] getByIds for update failed:", err);
				return;
			}
		}
		/**
		* UI：由调用方传入 sources，计算已装更新信息。
		*/
		computeUpdateInfo(skill, sources) {
			const { skills, remoteVersionMap: versionMap, localVersionMap, installingSlug } = sources;
			const skillByName = /* @__PURE__ */ new Map();
			for (const s of skills) {
				skillByName.set(s.name.toLowerCase(), s);
				skillByName.set(s.slug.toLowerCase(), s);
			}
			const lowerName = skill.name.toLowerCase();
			const knotSkill = skillByName.get(lowerName);
			const slug = skill.slug ?? knotSkill?.slug ?? lowerName;
			const remoteVersion = versionMap[slug] || knotSkill?.version;
			if (installingSlug === slug) return {
				hasUpdate: false,
				isUpdating: true,
				hubSkill: knotSkill,
				slug,
				remoteVersion
			};
			if (!(slug in localVersionMap)) return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill: void 0,
				slug,
				remoteVersion: void 0
			};
			const localVersion = localVersionMap[slug];
			if (remoteVersion) {
				if (!localVersion || isNewerVersion(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					hubSkill: knotSkill,
					slug,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill: knotSkill,
				slug,
				remoteVersion
			};
		}
		/**
		* 命令式：从当前 store 解析更新信息。
		*/
		resolveUpdateInfo(skill) {
			const { skills, remoteVersionMap, localVersionMap, installingSlug } = this.store.getState();
			return this.computeUpdateInfo(skill, {
				skills,
				remoteVersionMap,
				localVersionMap,
				installingSlug
			});
		}
		/**
		* 释放资源（当前无定时器/监听）。
		*/
		dispose() {}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/layout.ts
var import_zustand$4, EMPTY_COLLECTIONS, MarketLayoutService;
var init_layout = __esmMin((() => {
	import_zustand$4 = require_zustand();
	init_account();
	init_environment();
	init_constants();
	init_types();
	init_collection();
	EMPTY_COLLECTIONS = {
		featured: [],
		tabs: []
	};
	MarketLayoutService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$4.create)(() => ({
				featured: [],
				tabs: [],
				activeTabId: "",
				collectionsStatus: CollectionsStatus.Idle,
				collectionsError: null
			}));
			this.probedRef = false;
			this.remoteCollections = EMPTY_COLLECTIONS;
			this.enterpriseVisible = false;
			this.probing = false;
			this.activeType = null;
			this.collectionsInflight = null;
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 按 id 取远端 MarketCollection（含内嵌 categories），供 Builtin 运营路径灌分类。
		*/
		getRemoteCollection(collectionId) {
			const { featured, tabs } = this.remoteCollections;
			return [...featured, ...tabs].find((collection) => collection.id === collectionId);
		}
		/**
		* 启动加载界面布局数据。
		* 已 ready 且非 force 时跳过 collections，避免前台反复激活重复请求。
		*/
		setup(options) {
			this.probeEnterpriseVisibility();
			const force = options?.force ?? false;
			const { collectionsStatus } = this.store.getState();
			if (!force && collectionsStatus === CollectionsStatus.Ready) return;
			this.loadCollections({ force });
		}
		/**
		* 重试拉取 collections 骨架。
		*/
		reloadCollections() {
			this.loadCollections({ force: true });
		}
		/**
		* 探测企业 Skill 可见性
		*/
		async probeEnterpriseVisibility() {
			const enterpriseId = this.deps.host.accountInfo?.enterpriseId?.trim() || "";
			if (!enterpriseId || this.probedRef) return;
			this.probedRef = true;
			let enterpriseFacade;
			try {
				enterpriseFacade = this.deps.host.facades.enterpriseSkills;
			} catch {
				enterpriseFacade = void 0;
			}
			if (!enterpriseFacade) return;
			this.probing = true;
			try {
				const entVisible = !!(await enterpriseFacade.probeVisibility({ enterpriseId }))?.visible;
				this.enterpriseVisible = entVisible;
			} catch {
				this.enterpriseVisible = false;
			} finally {
				this.probing = false;
			}
			this.reassembleFromRemote();
		}
		/**
		* 拉取远端市场 collections；失败时清空并标记 error（不做本地兜底）。
		* 非 force 时复用进行中的请求，保证并发 setup 只打一次网络。
		*/
		loadCollections(options) {
			if (!(options?.force ?? false) && this.collectionsInflight) return this.collectionsInflight;
			const run = this.runLoadCollections();
			this.collectionsInflight = run.finally(() => {
				if (this.collectionsInflight === run) this.collectionsInflight = null;
			});
			return this.collectionsInflight;
		}
		/**
		* 实际执行 getLayout：写入 Loading，按响应码分流 Ready / Error / Downgrade。
		* 100004 走 markDowngrade；成功后可再合并企业推荐分类，最后组装 featured / tabs。
		*/
		async runLoadCollections() {
			const { templateId } = this.deps;
			let marketplace;
			try {
				marketplace = this.deps.host.facades.skillsMarketplace;
			} catch {
				marketplace = void 0;
			}
			const builtin = marketplace?.builtin;
			this.store.setState({
				collectionsStatus: CollectionsStatus.Loading,
				collectionsError: null
			});
			if (!builtin || !templateId) {
				this.failCollections("missing marketplace or templateId");
				return;
			}
			try {
				const response = await builtin.getLayout({ templateId });
				if (response?.code === 100004) {
					this.markDowngrade();
					return;
				}
				const data = response?.code === 0 ? response.data : null;
				if (!data) {
					this.failCollections(response?.msg || "empty market collections");
					return;
				}
				const collections = data.collections;
				if (!Array.isArray(collections) || collections.length === 0) {
					this.failCollections("empty market collections");
					return;
				}
				this.setRemoteCollections(this.splitMarketCollections(collections));
				this.store.setState({
					collectionsStatus: CollectionsStatus.Ready,
					collectionsError: null
				});
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				this.failCollections(msg || "failed to load market collections");
			}
		}
		/**
		* 拆分远端 collections 为 featured + tabs
		*/
		splitMarketCollections(collections) {
			const featured = [];
			const tabs = [];
			for (const collection of collections) {
				if (!collection.visible) continue;
				if (collection.subType === CollectionSubType.Featured) featured.push(collection);
				else tabs.push(collection);
			}
			return {
				featured,
				tabs
			};
		}
		/**
		* 标记 collections 加载失败
		*/
		failCollections(message) {
			this.remoteCollections = EMPTY_COLLECTIONS;
			this.activeType = null;
			this.store.setState({
				featured: [],
				tabs: [],
				activeTabId: "",
				collectionsStatus: CollectionsStatus.Error,
				collectionsError: message
			});
		}
		/**
		* tags/collections 返回 100004：清空骨架并标记降级，由外层 SkillsPanel 切通用版
		*/
		markDowngrade() {
			this.remoteCollections = EMPTY_COLLECTIONS;
			this.activeType = null;
			this.store.setState({
				featured: [],
				tabs: [],
				activeTabId: "",
				collectionsStatus: CollectionsStatus.Downgrade,
				collectionsError: null
			});
		}
		/**
		* 缓存远端 collections 并重新组装 Tab。
		*/
		setRemoteCollections(remote) {
			this.remoteCollections = remote;
			this.reassembleFromRemote();
		}
		/**
		* 默认激活 Tab：推荐 > 默认 > 首个运营 Collection（排除客户端注入的 Knot / Enterprise）。
		*/
		resolveDefaultActiveTabId(tabs) {
			if (tabs.length === 0) return "";
			const recommend = tabs.find((tab) => tab.source === CollectionSubType.Recommend);
			if (recommend) return recommend.id;
			const defaultTab = tabs.find((tab) => tab.source === CollectionSubType.Default);
			if (defaultTab) return defaultTab.id;
			return tabs.find((tab) => tab.source !== ClientTabId.Knot && tab.source !== ClientTabId.Enterprise)?.id ?? tabs[0].id;
		}
		/**
		* 供 UI 在 activeTabId 无效时回退到默认Tab
		*/
		resolveDefaultActiveTab() {
			const { tabs } = this.store.getState();
			if (tabs.length === 0) return;
			const id = this.resolveDefaultActiveTabId(tabs);
			return tabs.find((tab) => tab.id === id);
		}
		/**
		* 按远端数据与企业可见性重新组装 featured / tabs。
		*/
		reassembleFromRemote() {
			const enterpriseId = this.deps.host.accountInfo?.enterpriseId?.trim() || "";
			const isIOA = isIOAUser(enterpriseId);
			const effectiveEnterpriseVisible = this.enterpriseVisible && !this.probing;
			const remote = this.remoteCollections;
			if (remote.tabs.length === 0) return;
			const collections = this.assembleIndustryMarket({
				featured: remote.featured,
				tabs: remote.tabs,
				isDesktop: isWorkBuddyDesktop(),
				isIOAUser: isIOA,
				enterpriseVisible: effectiveEnterpriseVisible
			});
			const tabs = collections.tabs.map((tab) => ({
				id: tab.id,
				source: tab.source,
				name: tab.name,
				hasNewBadge: false
			}));
			const prevActiveType = this.activeType;
			let { activeTabId } = this.store.getState();
			let activeType = this.activeType;
			const activeTab = collections.tabs.find((tab) => tab.id === activeTabId);
			if (!activeTab && collections.tabs.length > 0) {
				activeTabId = this.resolveDefaultActiveTabId(collections.tabs);
				activeType = collections.tabs.find((tab) => tab.id === activeTabId)?.source ?? null;
			} else if (activeTab) activeType = activeTab.source;
			else {
				activeTabId = "";
				activeType = null;
			}
			this.activeType = activeType;
			this.store.setState({
				featured: collections.featured,
				tabs,
				activeTabId
			});
			if (activeType && activeType !== prevActiveType) this.loadSourceData(activeType);
		}
		/**
		* 组装 featured + tabs（含桌面 Knot / 企业 Tab 注入）。
		*/
		assembleIndustryMarket(options) {
			const featured = options.featured;
			const tabs = [...options.tabs.filter((tab) => tab.visible).filter((tab) => tab.subType !== CollectionSubType.SkillHub || options.isDesktop).map((collection) => ({
				id: collection.id,
				source: collection.subType,
				name: collection.name
			}))];
			if (options.isDesktop && options.isIOAUser) tabs.push({
				id: ClientTabId.Knot,
				source: ClientTabId.Knot,
				name: {
					zh: "Knot",
					en: "Knot"
				}
			});
			if (options.enterpriseVisible) tabs.push({
				id: ClientTabId.Enterprise,
				source: ClientTabId.Enterprise,
				name: {
					zh: "企业 Skill",
					en: "Enterprise Skills"
				}
			});
			return {
				featured,
				tabs
			};
		}
		/**
		* 清空各源「刚安装」浏览白名单（切 Tab / 一级视图时调用）。
		*/
		clearBrowsingRecentlyInstalled() {
			this.services.marketBuiltinService.clearRecentlyInstalled();
			this.services.skillhubService.clearRecentlyInstalled();
			this.services.knotService.clearRecentlyInstalled();
			this.services.enterpriseService.clearRecentlyInstalled();
			this.services.pluginsService.clearRecentlyInstalled();
		}
		/**
		* 切换激活 Tab
		*/
		setActiveTab(tab) {
			const prevTabId = this.store.getState().activeTabId;
			this.activeType = tab.source;
			this.store.setState({ activeTabId: tab.id });
			if (prevTabId !== tab.id) this.clearBrowsingRecentlyInstalled();
			this.loadSourceData(tab.source);
		}
		/**
		* Tab 切换时确保源已加载并按需刷新列表。
		*/
		loadSourceData(source) {
			this.ensureSourceLoaded(source);
			switch (source) {
				case CollectionSubType.SkillHub:
					this.services.skillhubService.reloadOnReenter();
					break;
				case ClientTabId.Knot:
					this.services.knotService.reloadOnReenter();
					break;
				case ClientTabId.Enterprise:
					this.services.enterpriseService.fetchSkills(1);
					break;
				default: if (isBuiltinCollectionSource(resolveCollectionSource(source))) {
					const { activeTabId } = this.store.getState();
					if (activeTabId) this.services.marketBuiltinService.reloadCollection(activeTabId);
				}
			}
		}
		/**
		* 仅在首次启用时加载对应数据源（不做强制 refresh）。
		*/
		ensureSourceLoaded(source) {
			switch (source) {
				case CollectionSubType.SkillHub:
					this.services.skillhubService.loadFirstPageSkills();
					break;
				case ClientTabId.Knot:
					this.services.knotService.loadFirstPageSkills();
					break;
				case ClientTabId.Enterprise:
					this.services.enterpriseService.loadCategories(true);
					if (this.services.enterpriseService.useStore.getState().skills.length === 0) this.services.enterpriseService.fetchSkills(1);
					break;
				case CollectionSubType.Plugins:
					if (!this.services.pluginsService.useStore.getState().marketplacesLoaded) this.services.pluginsService.loadMarketplaces();
					break;
				default: if (isBuiltinCollectionSource(resolveCollectionSource(source))) {
					const { activeTabId } = this.store.getState();
					if (activeTabId) this.services.marketBuiltinService.enterCollection({
						collectionId: activeTabId,
						subType: source,
						templateId: this.deps.templateId,
						force: false
					});
				}
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/plugins.ts
var import_zustand$3, HIDDEN_EXPERT_MARKETPLACES, PluginsService;
var init_plugins = __esmMin((() => {
	init_src$1();
	import_zustand$3 = require_zustand();
	init_i18n();
	init_local_cache();
	init_builtin_plugin();
	init_constants();
	init_cache();
	HIDDEN_EXPERT_MARKETPLACES = /* @__PURE__ */ new Set(["experts", "my-experts"]);
	PluginsService = class {
		constructor(_services, deps) {
			this.deps = deps;
			this.store = (0, import_zustand$3.create)(() => ({
				installedPlugins: [],
				installedLoading: false,
				marketplacePlugins: [],
				marketplacePluginsLoading: false,
				marketplaces: [],
				currentMarketplace: null,
				showAddMarketplaceModal: false,
				addMarketplaceLoading: false,
				addMarketplaceError: "",
				refreshing: /* @__PURE__ */ new Set(),
				deleteConfirmVisible: false,
				pendingDeleteMarketplace: null,
				pendingDeletePluginNames: [],
				deleteConfirmLoading: false,
				installingPluginKeys: /* @__PURE__ */ new Set(),
				recentlyInstalledKeys: /* @__PURE__ */ new Set(),
				marketplacesLoaded: false
			}));
			this.marketplaceNameToId = /* @__PURE__ */ new Map();
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 安全获取插件 Facade，不可用时返回 undefined。
		*/
		get pluginFacade() {
			try {
				return this.deps.host.facades.plugin;
			} catch {
				return;
			}
		}
		/**
		* 获取宿主 adapter 能力入口。
		*/
		get adapter() {
			return this.deps.host.adapter;
		}
		/**
		* 将 marketplace 名称解析为对应 id。
		*/
		resolveMarketplaceId(marketplaceName) {
			return this.marketplaceNameToId.get(marketplaceName) || marketplaceName;
		}
		/**
		* 生成插件唯一键 name@marketplace。
		*/
		getPluginKey(name, marketplaceName) {
			return `${name}@${marketplaceName}`;
		}
		/**
		* 读取插件安装时间（CacheKey.pluginsInstallTime）。
		*/
		getPluginInstalledAt(name, marketplaceName) {
			return getPluginInstalledAt(name, marketplaceName);
		}
		/**
		* 加载已安装插件列表并写入缓存。
		*/
		async loadInstalled(silent = false) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				this.store.setState({ installedPlugins: [] });
				return;
			}
			if (!silent) this.store.setState({ installedLoading: true });
			try {
				let pluginsList = (await pluginFacade.getInstalledPlugins(false)).filter((p) => !isBuiltinPlugin(p)).map((p) => {
					const mapScope = (scope) => {
						if (scope === "local") return "project-local";
						return scope || "user";
					};
					return {
						name: p.name,
						marketplaceName: p.marketplaceName || "local",
						description: p.description,
						version: p.version,
						status: p.status,
						installedScopes: p.installedScopes?.map(mapScope) || (p.installScope ? [mapScope(p.installScope)] : ["user"]),
						installedScopesStatus: p.installedScopesStatus,
						installedPath: p.installedPath,
						source: "",
						agents: p.agents,
						commands: p.commands,
						skills: p.skills,
						mcpServers: p.mcpServers,
						hooks: p.hooks,
						rules: p.rules,
						lsp: p.lsp,
						canRemove: p.canRemove,
						canSwitchoff: p.canSwitchoff,
						canEdit: p.canEdit
					};
				});
				pluginsList = pluginsList.sort((a, b) => {
					const aTime = this.getPluginInstalledAt(a.name, a.marketplaceName);
					return this.getPluginInstalledAt(b.name, b.marketplaceName) - aTime;
				});
				this.store.setState({
					installedPlugins: pluginsList,
					installedLoading: false
				});
			} catch (error) {
				console.error("[PluginsService] Failed to load installed plugins:", error);
				this.store.setState({ installedLoading: false });
			}
		}
		/**
		* 加载 marketplace 列表并在选中后拉取插件。
		*/
		async loadMarketplaces() {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				this.store.setState({
					marketplaces: [],
					marketplacesLoaded: true
				});
				return;
			}
			try {
				const result = await pluginFacade.getPluginMarketplaces(false);
				if (result && result.length > 0) {
					const marketplaceList = result.filter((m) => !HIDDEN_EXPERT_MARKETPLACES.has(m.name)).map((m) => ({
						id: m.id || m.name,
						name: m.name,
						type: m.type,
						source: typeof m.source === "string" ? m.source : void 0
					}));
					const nextMap = /* @__PURE__ */ new Map();
					for (const m of marketplaceList) nextMap.set(m.name, m.id);
					this.marketplaceNameToId = nextMap;
					const { currentMarketplace } = this.store.getState();
					const nextMarketplace = currentMarketplace ?? marketplaceList[0]?.name ?? null;
					this.store.setState({
						marketplaces: marketplaceList,
						marketplacesLoaded: true,
						currentMarketplace: nextMarketplace
					});
					if (nextMarketplace) await this.loadMarketplacePlugins(nextMarketplace, false);
				} else {
					this.store.setState({
						marketplaces: [],
						marketplacesLoaded: true,
						currentMarketplace: null,
						marketplacePlugins: []
					});
					this.marketplaceNameToId = /* @__PURE__ */ new Map();
				}
			} catch {
				this.store.setState({
					marketplaces: [],
					marketplacesLoaded: true
				});
			}
		}
		/**
		* 加载指定 marketplace 下的插件列表。
		*/
		async loadMarketplacePlugins(marketplaceName, silent = false, forceRefresh = false) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade || !marketplaceName) {
				this.store.setState({ marketplacePlugins: [] });
				return;
			}
			if (!silent) this.store.setState({ marketplacePluginsLoading: true });
			try {
				const marketplaceId = this.resolveMarketplaceId(marketplaceName);
				const pluginsList = (await pluginFacade.getMarketplacePlugins(marketplaceId, forceRefresh)).map((p) => ({
					name: p.name,
					marketplaceName: p.marketplaceName,
					description: p.description,
					version: p.version,
					author: p.author,
					homepage: p.homepage,
					status: p.status,
					installedScopes: p.installedScopes,
					installedScopesStatus: p.installedScopesStatus,
					installedPath: p.installedPath,
					hasUpdate: p.hasUpdate,
					source: "",
					agents: p.agents,
					commands: p.commands,
					skills: p.skills,
					mcpServers: p.mcpServers,
					hooks: p.hooks,
					rules: p.rules,
					lsp: p.lsp
				}));
				this.store.setState({
					marketplacePlugins: pluginsList,
					marketplacePluginsLoading: false
				});
			} catch {
				this.store.setState({
					marketplacePlugins: [],
					marketplacePluginsLoading: false
				});
			}
		}
		/**
		* 切换当前 marketplace 并静默加载其插件。
		*/
		changeMarketplace(marketplaceName) {
			this.store.setState({ currentMarketplace: marketplaceName });
			this.loadMarketplacePlugins(marketplaceName, true);
		}
		/**
		* 判断插件是否正在安装。
		*/
		isInstalling(pluginName, marketplaceName) {
			return this.store.getState().installingPluginKeys.has(this.getPluginKey(pluginName, marketplaceName));
		}
		/**
		* 判断插件是否已安装（按 name + marketplace）。
		*/
		isInstalled(plugin, installedPlugins) {
			return (installedPlugins ?? this.store.getState().installedPlugins).some((item) => item.name === plugin.name && item.marketplaceName === plugin.marketplaceName);
		}
		/**
		* UI：是否已装（浏览 filter）。
		*/
		computeIsInstalled(plugin, sources) {
			return sources.installedPlugins.some((item) => item.name === plugin.name && item.marketplaceName === plugin.marketplaceName);
		}
		/**
		* UI：是否本会话刚装（浏览 filter 白名单；按 name@marketplace）。
		*/
		computeIsRecentlyInstalled(plugin, sources) {
			return sources.recentlyInstalledKeys.has(this.getPluginKey(plugin.name, plugin.marketplaceName));
		}
		/**
		* UI：浏览卡安装按钮态。
		*/
		computeInstallState(plugin, sources) {
			const key = this.getPluginKey(plugin.name, plugin.marketplaceName);
			if (sources.installingPluginKeys.has(key)) return {
				status: InstallStatus.Installing,
				disabled: true
			};
			if (this.computeIsRecentlyInstalled(plugin, { recentlyInstalledKeys: sources.recentlyInstalledKeys }) || this.computeIsInstalled(plugin, { installedPlugins: sources.installedPlugins })) return {
				status: InstallStatus.Installed,
				disabled: true
			};
			return {
				status: InstallStatus.Install,
				disabled: false
			};
		}
		/**
		* 命令式：从当前 store 解析安装按钮态。
		*/
		resolveInstallState(plugin) {
			const { installingPluginKeys, installedPlugins, recentlyInstalledKeys } = this.store.getState();
			return this.computeInstallState(plugin, {
				installingPluginKeys,
				installedPlugins,
				recentlyInstalledKeys
			});
		}
		/**
		* UI：更新信息（浏览/已装均可用 hasUpdate 字段）。
		*/
		computeUpdateInfo(plugin, sources) {
			const key = this.getPluginKey(plugin.name, plugin.marketplaceName);
			if (sources.installingPluginKeys.has(key)) return {
				hasUpdate: false,
				isUpdating: true,
				remoteVersion: plugin.version
			};
			const hasUpdate = !!(sources.installedPlugins.find((item) => item.name === plugin.name && item.marketplaceName === plugin.marketplaceName)?.hasUpdate || plugin.hasUpdate);
			return {
				hasUpdate,
				isUpdating: false,
				remoteVersion: hasUpdate ? plugin.version : void 0
			};
		}
		/**
		* 命令式：从当前 store 解析更新信息。
		*/
		resolveUpdateInfo(plugin) {
			const { installingPluginKeys, installedPlugins, recentlyInstalledKeys } = this.store.getState();
			return this.computeUpdateInfo(plugin, {
				installingPluginKeys,
				installedPlugins,
				recentlyInstalledKeys
			});
		}
		/**
		* 判断插件是否已禁用（scopes 全关或 status === disabled）。
		*/
		isDisabled(plugin) {
			if (plugin.installedScopesStatus) return Object.values(plugin.installedScopesStatus).every((status) => status === false);
			return plugin.status === "disabled";
		}
		/**
		* 清空本会话刚安装白名单（切 Tab / 一级视图时调用）。
		*/
		clearRecentlyInstalled() {
			if (this.store.getState().recentlyInstalledKeys.size === 0) return;
			this.store.setState({ recentlyInstalledKeys: /* @__PURE__ */ new Set() });
		}
		/**
		* 卸载后收口：去掉刚装白名单，避免浏览卡「幽灵已装」。
		*/
		forgetUninstalled(plugin) {
			const key = this.getPluginKey(plugin.name, plugin.marketplaceName);
			const recent = this.store.getState().recentlyInstalledKeys;
			if (!recent.has(key)) return;
			const next = new Set(recent);
			next.delete(key);
			this.store.setState({ recentlyInstalledKeys: next });
		}
		/**
		* 乐观移出已装插件列表（卸载成功、loadInstalled 对齐前）。
		*/
		removePluginsFromStore(plugins) {
			if (plugins.length === 0) return;
			const keys = new Set(plugins.map((plugin) => this.getPluginKey(plugin.name, plugin.marketplaceName)));
			this.store.setState((s) => ({ installedPlugins: s.installedPlugins.filter((item) => !keys.has(this.getPluginKey(item.name, item.marketplaceName))) }));
		}
		/**
		* 安装插件到指定 scope。
		*/
		async install(plugin, scope) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				toast({
					message: t("plugins.installNotSupported"),
					type: "warning"
				});
				return;
			}
			const pluginKey = this.getPluginKey(plugin.name, plugin.marketplaceName);
			if (this.store.getState().installingPluginKeys.has(pluginKey)) return;
			const next = new Set(this.store.getState().installingPluginKeys).add(pluginKey);
			this.store.setState({ installingPluginKeys: next });
			try {
				const marketplaceId = this.resolveMarketplaceId(plugin.marketplaceName);
				const result = await pluginFacade.installPlugins([plugin.name], marketplaceId, scope);
				if (result.success) {
					toast({
						message: t("plugins.installSuccess", { name: plugin.name }),
						type: "success"
					});
					setPluginInstalledAt(plugin.name, plugin.marketplaceName);
					const recent = new Set(this.store.getState().recentlyInstalledKeys);
					recent.add(pluginKey);
					this.store.setState({ recentlyInstalledKeys: recent });
					await this.loadInstalled(true);
				} else toast({
					message: result.error || t("plugins.installFailed", { name: plugin.name }),
					type: "error"
				});
			} catch (error) {
				toast({
					message: error?.message || t("plugins.installFailed", { name: plugin.name }),
					type: "error"
				});
			} finally {
				const updated = new Set(this.store.getState().installingPluginKeys);
				updated.delete(pluginKey);
				this.store.setState({ installingPluginKeys: updated });
			}
		}
		/**
		* 从指定 scope 卸载插件。toast 在此处理，返回是否成功供调用方决定后续导航。
		*/
		async uninstall(plugin, scope) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				toast({
					message: t("plugins.uninstallNotSupported"),
					type: "warning"
				});
				return false;
			}
			try {
				const marketplaceId = this.resolveMarketplaceId(plugin.marketplaceName);
				const result = await pluginFacade.uninstallPlugin(plugin.name, marketplaceId, scope);
				if (result.success) {
					toast({
						message: t("plugins.uninstallSuccess", { name: plugin.name }),
						type: "success"
					});
					removePluginInstalledAt(plugin.name, plugin.marketplaceName);
					this.removePluginsFromStore([plugin]);
					this.forgetUninstalled(plugin);
					await this.loadInstalled(true);
					return true;
				}
				toast({
					message: result.error || t("plugins.uninstallFailed", { name: plugin.name }),
					type: "error"
				});
				return false;
			} catch (error) {
				toast({
					message: error?.message || t("plugins.uninstallFailed", { name: plugin.name }),
					type: "error"
				});
				return false;
			}
		}
		/**
		* 启用或禁用已安装插件。
		*/
		async toggle(plugin, enabled, scope) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				toast({
					message: t("plugins.toggleNotSupported"),
					type: "warning"
				});
				return;
			}
			try {
				const result = await pluginFacade.batchTogglePlugins({ items: [{
					pluginName: plugin.name,
					marketplaceName: this.resolveMarketplaceId(plugin.marketplaceName),
					scope,
					operation: enabled ? "enable" : "disable"
				}] });
				if (result.success) await this.loadInstalled(true);
				else {
					const failedItem = result.failedPlugins?.[0];
					toast({
						message: failedItem?.error || t("plugins.toggleFailed", { name: plugin.name }),
						type: "error"
					});
				}
			} catch (error) {
				toast({
					message: error?.message || t("plugins.toggleFailed", { name: plugin.name }),
					type: "error"
				});
			}
		}
		/**
		* 更新已安装插件到最新版本。
		*/
		async update(plugin) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) {
				toast({
					message: t("plugins.updateNotSupported"),
					type: "warning"
				});
				return;
			}
			try {
				const marketplaceId = this.resolveMarketplaceId(plugin.marketplaceName);
				const result = await pluginFacade.updatePlugin(plugin.name, marketplaceId);
				if (result.success) {
					toast({
						message: t("plugins.updateSuccess", { name: plugin.name }),
						type: "success"
					});
					await this.loadInstalled(true);
				} else toast({
					message: result.error || t("plugins.updateFailed", { name: plugin.name }),
					type: "error"
				});
			} catch (error) {
				toast({
					message: error?.message || t("plugins.updateFailed", { name: plugin.name }),
					type: "error"
				});
			}
		}
		/**
		* 在系统文件管理器中打开插件安装目录。
		*/
		async openFolder(plugin) {
			if (plugin.installedPath && this.adapter?.openFolder) await this.adapter.openFolder(plugin.installedPath);
			else toast({
				message: t("plugins.openInFolderNotSupported"),
				type: "warning"
			});
		}
		/**
		* 在新窗口打开插件主页。
		*/
		openHomepage(homepage) {
			window.open(homepage, "_blank");
		}
		/**
		* 是否存在项目路径（当前恒为 false）。
		*/
		async hasProjectPath() {
			return false;
		}
		/**
		* 批量卸载多个已安装插件。
		*/
		async batchUninstall(plugins) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade || plugins.length === 0) return;
			let successCount = 0;
			let failCount = 0;
			const successfullyUninstalled = [];
			for (const plugin of plugins) try {
				const scope = plugin.installedScopes?.[0] || "user";
				const marketplaceId = this.resolveMarketplaceId(plugin.marketplaceName);
				if ((await pluginFacade.uninstallPlugin(plugin.name, marketplaceId, scope)).success) {
					successCount++;
					successfullyUninstalled.push(plugin);
				} else failCount++;
			} catch {
				failCount++;
			}
			if (successfullyUninstalled.length > 0) {
				removePluginInstalledAts(successfullyUninstalled);
				this.removePluginsFromStore(successfullyUninstalled);
				for (const plugin of successfullyUninstalled) this.forgetUninstalled(plugin);
			}
			await this.loadInstalled(true);
			if (successCount > 0 && failCount === 0) toast({
				message: t("plugins.batchUninstallSuccess", { count: String(successCount) }),
				type: "success"
			});
			else if (failCount > 0) toast({
				message: t("plugins.batchUninstallPartial", {
					success: String(successCount),
					fail: String(failCount)
				}),
				type: "warning"
			});
		}
		/**
		* 批量启用或禁用多个插件。
		*/
		async batchToggle(plugins, enabled) {
			if (!this.adapter?.batchTogglePlugins || plugins.length === 0) return;
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) return;
			const toToggle = plugins.filter((plugin) => this.isDisabled(plugin) === enabled);
			if (toToggle.length === 0) return;
			try {
				const items = toToggle.map((plugin) => ({
					pluginName: plugin.name,
					marketplaceName: this.resolveMarketplaceId(plugin.marketplaceName),
					scope: plugin.installedScopes?.[0] || "user",
					operation: enabled ? "enable" : "disable"
				}));
				const result = await pluginFacade.batchTogglePlugins({ items });
				if (result.success) {
					toast({
						message: t(enabled ? "plugins.batchToggleEnableSuccess" : "plugins.batchToggleDisableSuccess", { count: String(toToggle.length) }),
						type: "success"
					});
					await this.loadInstalled(true);
				} else {
					const failedCount = result.failedPlugins?.length || 0;
					const successCount = toToggle.length - failedCount;
					if (failedCount > 0) {
						console.warn("[plugins] batchToggle partial failure", result.failedPlugins);
						toast({
							message: t("plugins.batchTogglePartial", {
								success: String(successCount),
								fail: String(failedCount)
							}),
							type: "warning"
						});
					}
				}
			} catch (error) {
				toast({
					message: error?.message || t("plugins.batchToggleFailed"),
					type: "error"
				});
			}
		}
		/**
		* 控制添加 marketplace 弹窗显隐。
		*/
		setShowAddMarketplaceModal(visible) {
			this.store.setState({ showAddMarketplaceModal: visible });
		}
		/**
		* 设置添加 marketplace 的错误文案。
		*/
		setAddMarketplaceError(error) {
			this.store.setState({ addMarketplaceError: error });
		}
		/**
		* 按 source 添加 marketplace，成功后刷新列表。
		*/
		async addMarketplace(source) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) throw new Error(t("plugins.addMarketplace.notSupported"));
			this.store.setState({
				addMarketplaceLoading: true,
				addMarketplaceError: ""
			});
			try {
				const suiteAutoUpdateEnabled = readCache(CacheKey.suitesAutoUpdate) ?? true;
				const result = await pluginFacade.addPluginMarketplace(source, void 0, suiteAutoUpdateEnabled);
				if (result.success) {
					const returnedName = result.marketplace?.name;
					if (result.alreadyExists && returnedName) {
						this.store.setState({ showAddMarketplaceModal: false });
						this.changeMarketplace(returnedName);
						toast({
							message: t("plugins.addMarketplace.alreadyExists", { name: returnedName }),
							type: "info"
						});
						return;
					}
					await this.loadMarketplaces();
					if (returnedName) {
						this.store.setState({ currentMarketplace: returnedName });
						await this.loadMarketplacePlugins(returnedName, false);
					}
					this.store.setState({ showAddMarketplaceModal: false });
					toast({
						message: t("plugins.addMarketplace.success"),
						type: "success"
					});
				} else {
					this.store.setState({ addMarketplaceError: result.error || t("plugins.addMarketplace.failed") });
					throw new Error(result.error || t("plugins.addMarketplace.failed"));
				}
			} catch (error) {
				const errorMsg = error?.message || t("plugins.addMarketplace.failed");
				this.store.setState({ addMarketplaceError: errorMsg });
				throw error;
			} finally {
				this.store.setState({ addMarketplaceLoading: false });
			}
		}
		/**
		* 删除 marketplace；若有关联已装插件则先弹确认。
		*/
		async deleteMarketplace(marketplaceId) {
			if (!this.pluginFacade) {
				toast({
					message: t("plugins.deleteMarketplace.notSupported"),
					type: "warning"
				});
				return;
			}
			const { marketplaces, installedPlugins } = this.store.getState();
			const displayName = marketplaces.find((m) => m.id === marketplaceId)?.name ?? marketplaceId;
			const relatedPlugins = installedPlugins.filter((p) => p.marketplaceName === displayName);
			if (relatedPlugins.length > 0) this.store.setState({
				deleteConfirmVisible: true,
				pendingDeleteMarketplace: {
					id: marketplaceId,
					name: displayName
				},
				pendingDeletePluginNames: relatedPlugins.map((p) => p.name)
			});
			else {
				this.store.setState({
					pendingDeleteMarketplace: {
						id: marketplaceId,
						name: displayName
					},
					pendingDeletePluginNames: []
				});
				await this.executeDeleteMarketplace(marketplaceId, displayName);
			}
		}
		/**
		* 执行删除 marketplace 并刷新相关列表。
		*/
		async executeDeleteMarketplace(marketplaceId, displayName) {
			const pluginFacade = this.pluginFacade;
			if (!pluginFacade) return;
			this.store.setState({ deleteConfirmLoading: true });
			try {
				const result = await pluginFacade.removePluginMarketplace(marketplaceId);
				if (result.success) {
					const uninstalledCount = result.uninstalledCount ?? 0;
					if (uninstalledCount > 0) toast({
						message: t("plugins.deleteMarketplace.successWithCount", {
							name: displayName,
							count: String(uninstalledCount)
						}),
						type: "success"
					});
					else toast({
						message: t("plugins.deleteMarketplace.success", { name: displayName }),
						type: "success"
					});
					await this.loadMarketplaces();
					const { currentMarketplace } = this.store.getState();
					if (currentMarketplace === displayName) {
						const { marketplaces } = this.store.getState();
						this.store.setState({
							currentMarketplace: marketplaces[0]?.name ?? null,
							marketplacePlugins: []
						});
					}
					await this.loadInstalled(true);
				} else toast({
					message: result.error || t("plugins.deleteMarketplace.failed"),
					type: "error"
				});
			} catch (error) {
				toast({
					message: error?.message || t("plugins.deleteMarketplace.failed"),
					type: "error"
				});
			} finally {
				this.store.setState({
					deleteConfirmLoading: false,
					deleteConfirmVisible: false,
					pendingDeleteMarketplace: null,
					pendingDeletePluginNames: []
				});
			}
		}
		/**
		* 确认删除当前待删的 marketplace。
		*/
		async confirmDeleteMarketplace() {
			const { pendingDeleteMarketplace } = this.store.getState();
			if (pendingDeleteMarketplace) await this.executeDeleteMarketplace(pendingDeleteMarketplace.id, pendingDeleteMarketplace.name);
		}
		/**
		* 取消删除 marketplace 确认弹窗。
		*/
		cancelDeleteMarketplace() {
			this.store.setState({
				deleteConfirmVisible: false,
				pendingDeleteMarketplace: null,
				pendingDeletePluginNames: []
			});
		}
		/**
		* 刷新指定 marketplace 的插件数据。
		*/
		async refreshMarketplace(marketplaceName) {
			const pluginFacade = this.pluginFacade;
			this.store.setState((s) => ({ refreshing: new Set(s.refreshing).add(marketplaceName) }));
			try {
				if (this.adapter?.refreshPluginMarketplace && pluginFacade) {
					const marketplaceId = this.resolveMarketplaceId(marketplaceName);
					const result = await pluginFacade.refreshPluginMarketplace(marketplaceId);
					if (result.success) {
						const { currentMarketplace } = this.store.getState();
						if (currentMarketplace === marketplaceName) await this.loadMarketplacePlugins(marketplaceName, false, true);
						await this.loadInstalled(true);
						toast({
							message: t("plugins.refreshMarketplace.success", { name: marketplaceName }),
							type: "success"
						});
					} else toast({
						message: result.error || t("plugins.refreshMarketplace.failed"),
						type: "error"
					});
				} else {
					const { currentMarketplace } = this.store.getState();
					if (currentMarketplace) {
						await this.loadMarketplacePlugins(currentMarketplace, true, true);
						await this.loadInstalled(true);
						toast({
							message: t("plugins.refreshMarketplace.success", { name: marketplaceName }),
							type: "success"
						});
					}
				}
			} catch (error) {
				toast({
					message: error?.message || t("plugins.refreshMarketplace.failed"),
					type: "error"
				});
			} finally {
				this.store.setState((s) => {
					const newSet = new Set(s.refreshing);
					newSet.delete(marketplaceName);
					return { refreshing: newSet };
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/search.ts
var import_zustand$2, COLLECTION_SCOPE_MAX_PAGES, SearchService;
var init_search$1 = __esmMin((() => {
	init_common();
	init_types$1();
	import_zustand$2 = require_zustand();
	init_account();
	init_environment();
	init_keyword_match();
	init_constants();
	init_types();
	init_collection();
	init_installed_identity();
	init_knot_identity();
	COLLECTION_SCOPE_MAX_PAGES = 5;
	SearchService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$2.create)(() => ({
				keyword: "",
				inputValue: "",
				buckets: [],
				loading: false,
				error: false,
				partialFail: false,
				hideInstalled: false,
				searchCollectionId: "",
				outcomes: [],
				autoSelectPending: true,
				userPickedTab: false
			}));
			this.debounceTimer = null;
			this.searchTimer = null;
			this.cancelled = false;
			this.enteredSearchPending = false;
			this.generation = 0;
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 更新搜索输入并 debounce 后触发全源检索。
		*/
		search(value) {
			const prevHasKeyword = this.store.getState().inputValue.trim().length > 0;
			this.store.setState({ inputValue: value });
			if (value.trim().length > 0 && !prevHasKeyword) {
				this.enteredSearchPending = true;
				this.seedPendingBuckets();
			}
			this.generation += 1;
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			this.debounceTimer = setTimeout(() => {
				const keyword = value.trim();
				const enteredSearch = this.enteredSearchPending;
				this.enteredSearchPending = false;
				this.store.setState({
					keyword,
					autoSelectPending: true,
					...enteredSearch ? {
						userPickedTab: false,
						searchCollectionId: this.resolveDefaultSearchCollectionId()
					} : {}
				});
				if (keyword) this.fetchAll(keyword);
				else {
					if (this.searchTimer) clearTimeout(this.searchTimer);
					this.store.setState({
						buckets: [],
						outcomes: [],
						loading: false,
						error: false,
						partialFail: false
					});
				}
			}, 200);
		}
		/**
		* 用当前布局 Tab 生成 pending buckets（Tab 立刻可渲，列表区走 skeleton）。
		*/
		seedPendingBuckets() {
			const outcomes = this.services.marketLayoutService.useStore.getState().tabs.filter((tab) => tab.source !== CollectionSubType.SkillHub || isWorkBuddyDesktop()).map((collection) => ({
				collectionId: collection.id,
				status: "pending"
			}));
			this.rebuildBuckets(outcomes);
			const { searchCollectionId } = this.store.getState();
			if (!searchCollectionId || !outcomes.some((o) => o.collectionId === searchCollectionId)) this.store.setState({ searchCollectionId: this.resolveDefaultSearchCollectionId() });
		}
		/**
		* 获取默认搜索 collection ID：优先沿用浏览态当前 Tab，保留用户上下文。
		*/
		resolveDefaultSearchCollectionId() {
			const { tabs, activeTabId } = this.services.marketLayoutService.useStore.getState();
			const searchable = tabs.filter((tab) => tab.source !== CollectionSubType.SkillHub || isWorkBuddyDesktop());
			if (activeTabId && searchable.some((tab) => tab.id === activeTabId)) return activeTabId;
			return searchable.find((tab) => tab.source === CollectionSubType.Recommend)?.id || searchable[0]?.id || "";
		}
		/**
		* 对各 collection Tab 并行发起搜索并汇总 outcomes。
		*/
		async fetchAll(keyword) {
			this.cancelled = false;
			this.generation += 1;
			const generation = this.generation;
			const tabs = this.services.marketLayoutService.useStore.getState().tabs.filter((tab) => tab.source !== CollectionSubType.SkillHub || isWorkBuddyDesktop());
			const outcomes = tabs.map((collection) => ({
				collectionId: collection.id,
				status: "pending"
			}));
			this.rebuildBuckets(outcomes);
			this.store.setState({ error: false });
			if (this.searchTimer) clearTimeout(this.searchTimer);
			this.searchTimer = setTimeout(() => {
				if (this.cancelled || generation !== this.generation) return;
				for (const collection of tabs) this.runCollectionSearch(collection, keyword).then((result) => this.updateOutcome(generation, collection.id, "fulfilled", result), (reason) => this.updateOutcome(generation, collection.id, "rejected", void 0, reason instanceof Error ? reason.message : "search failed"));
			}, 300);
		}
		/**
		* 按 collection 来源执行单路搜索并返回分页结果。
		*/
		async runCollectionSearch(collection, keyword) {
			const source = resolveCollectionSource(collection.source);
			const { templateId } = this.deps;
			const host = this.deps.host;
			let marketplace;
			let pluginFacade;
			let enterpriseFacade;
			try {
				marketplace = host.facades.skillsMarketplace;
			} catch {
				marketplace = void 0;
			}
			try {
				pluginFacade = host.facades.plugin;
			} catch {
				pluginFacade = void 0;
			}
			try {
				enterpriseFacade = host.facades.enterpriseSkills;
			} catch {
				enterpriseFacade = void 0;
			}
			const enterpriseId = host.accountInfo?.enterpriseId?.trim() || void 0;
			if (source === "builtin-collection") return this.searchBuiltinCollection(collection, keyword, templateId, marketplace);
			if (source === CollectionSubType.SkillHub) return this.searchSkillHub(keyword, marketplace);
			if (source === ClientTabId.Knot) return this.searchKnot(keyword, enterpriseId, marketplace);
			if (source === CollectionSubType.Plugins) return this.searchPlugins(keyword, pluginFacade);
			if (source === ClientTabId.Enterprise) return this.searchEnterpriseSkills(keyword, enterpriseId, enterpriseFacade);
			return {
				items: [],
				page: 1,
				total: 0,
				primaryCount: 0,
				paginable: false
			};
		}
		/**
		* 搜索 Builtin Collection。
		*
		* 企业态（有 enterpriseId，即旗舰版 / 专享版）走「聚合主检索 + Tab 白名单交集」（issue #99143）：
		*
		* - **主检索** = console 聚合 `builtin.list({ enterpriseId, keyword, matchItemRef: false })`。
		*   聚合接口在出口处叠加了企业可见性范围、下发策略引擎与 admin 启用开关，且 keyword 在
		*   服务端按 display_name / name / description_zh / description_en 五字段匹配，口径与
		*   SaaS 个人版 /market/skill/list 一致 —— 因此既能搜到「关键词只在描述里」的技能，
		*   也不会再把管理员已禁用 / 超出可见范围的技能摆到搜索结果里（点安装才被拦）。
		*   `matchItemRef: false` 让服务端跳过 skill_id 匹配：机器标识不该参与人工模糊搜索。
		* - **Tab 归属** = openplatform `/skills`（不带 keyword 的 collection 全量），按 skill_id
		*   与主检索结果取交集。聚合接口没有 Buddy 应用模板维度（template_id / tag_id），若直接
		*   落 UI 会出现「在 A Tab 搜到属于 B Tab 的技能」，故归属由客户端保证。
		* - **降级**：无 enterpriseId（非企业态）或聚合链路不可用 / 无命中时，回落到原有的
		*   openplatform `/skills/search` 远程搜索（保留分页），行为与改造前一致。
		*
		* 交集路径 `paginable: false`：交集在客户端完成，聚合的 total 是「企业可见 ∩ keyword」
		* 而非「∩ 当前 Tab」，直接透出会让「加载更多」不断拉却几乎不出新内容。Tab 内技能量级
		* 为百级，两侧各一次取足即可。
		*/
		async searchBuiltinCollection(collection, keyword, templateId, marketplace) {
			if (!marketplace?.builtin || !templateId) throw new Error("collection search unavailable");
			const enterpriseId = this.deps.host.accountInfo?.enterpriseId?.trim() || void 0;
			if (enterpriseId) {
				const scoped = await this.searchBuiltinCollectionScopedByEnterprise(collection, keyword, templateId, enterpriseId, marketplace);
				if (scoped) return scoped;
			}
			return this.searchBuiltinCollectionRemote(collection, keyword, templateId, marketplace);
		}
		/**
		* 企业态搜索：console 聚合主检索 ∩ 当前 Tab 技能白名单。
		*
		* 返回 `undefined` 表示「本路不可用，请调用方降级」，覆盖三种情况：
		*   1. facade 未实现 `builtin.list`（workbuddy-core 下存在并行老 facade，做运行时探测防 TypeError）
		*   2. 聚合请求抛错 / `code !== 0`（聚合接口未部署、鉴权失败、后端抖动）
		*   3. 聚合 `code === 0` 但零命中 —— 同时兜住「客户端先于后端发布」：老后端不认识
		*      `match_item_ref` 会忽略该 query 并按三字段返回（能用，仅少匹配描述），
		*      真返回空时回落远程搜索，能力只会变好不会变差
		*/
		async searchBuiltinCollectionScopedByEnterprise(collection, keyword, templateId, enterpriseId, marketplace) {
			if (typeof marketplace.builtin?.list !== "function") return;
			const [visibleSettled, scopeSettled] = await Promise.allSettled([this.fetchEnterpriseVisibleSkills(keyword, enterpriseId, marketplace), this.fetchCollectionSkillIdScope(collection, templateId, marketplace)]);
			if (visibleSettled.status !== "fulfilled" || !visibleSettled.value) return;
			const visible = visibleSettled.value;
			if (visible.length === 0) return;
			if (scopeSettled.status !== "fulfilled" || !scopeSettled.value) return;
			const scope = scopeSettled.value;
			const matched = visible.filter((skill) => {
				const key = this.builtinSkillKey(skill);
				return !!key && scope.has(key);
			});
			return {
				items: matched.map((value) => ({
					kind: "builtin",
					value
				})),
				page: 1,
				total: matched.length,
				primaryCount: matched.length,
				paginable: false
			};
		}
		/**
		* 拉「企业可见 ∩ keyword 命中」技能（console 聚合）。失败 / 非 0 返回 undefined。
		*
		* 注意：**绝对不能传 `route`** —— 两端实现（Desktop builtin-market.ts / Web
		* cloud-skills-marketplace-repo.ts）都以 `route === open_platform` 作为「直连
		* openplatform、跳过聚合」的短路条件，带上它会让可见性与下发策略过滤全部失效。
		*
		* 也**不要传 `source`**：`BuiltinMarketListParams.source` 是命名空间来源枚举
		* （official / skillhub / clawhub / ...），与聚合接口 query 里的 `source=builtin`
		* （自建 vs 市场）不是同一语义；后者由两端实现内部写死，无需调用方给。
		*/
		async fetchEnterpriseVisibleSkills(keyword, enterpriseId, marketplace) {
			try {
				const response = await marketplace.builtin.list({
					enterpriseId,
					keyword,
					matchItemRef: false,
					page: 1,
					pageSize: 100
				});
				if (response.code !== 0) return;
				return response.data?.skills ?? [];
			} catch {
				return;
			}
		}
		/**
		* 拉当前 Tab 的技能 ID 白名单（openplatform `/skills`，不带 keyword）。
		*
		* tag_id 取 `subType=all` 节点（`resolveCollectionSearchTagId`）：该接口按
		* `TempleteAssetListByTag` 精确匹配 tag，**不递归子树**，取「全部」节点才能覆盖
		* 当前 Tab 下所有子分类，不受用户当前选中的子分类影响。
		*/
		async fetchCollectionSkillIdScope(collection, templateId, marketplace) {
			const { categories } = this.services.marketBuiltinService.getCollection(collection.id);
			const tagId = resolveCollectionSearchTagId({
				collectionId: collection.id,
				categories
			});
			if (!tagId) return;
			const scope = /* @__PURE__ */ new Set();
			try {
				for (let page = 1; page <= COLLECTION_SCOPE_MAX_PAGES; page += 1) {
					const response = await marketplace.builtin.list({
						templateId,
						collectionId: collection.id,
						categoryId: tagId,
						page,
						pageSize: 100,
						route: BuiltinMarketRoutes.OpenPlatform
					});
					if (response.code !== 0) return page === 1 ? void 0 : scope;
					const skills = response.data?.skills ?? [];
					for (const skill of skills) {
						const key = this.builtinSkillKey(skill);
						if (key) scope.add(key);
					}
					const total = response.data?.total_count ?? 0;
					if (skills.length === 0 || page * 100 >= total) break;
				}
			} catch {
				return scope.size > 0 ? scope : void 0;
			}
			return scope;
		}
		/**
		* Builtin 技能去重 / 交集 key：skill_id 优先，缺失时回落 name（与 install gate 取值同构）
		*/
		builtinSkillKey(skill) {
			return (getBuiltinMarketSkillId(skill) || skill.name || "").toLowerCase();
		}
		/**
		* openplatform 远程搜索（子树递归；含去空格双路检索 + name/skillId 去重）。
		* 非企业态主路径，同时作为企业态聚合链路不可用时的降级。
		*/
		async searchBuiltinCollectionRemote(collection, keyword, templateId, marketplace) {
			const searchPage = async (kw, page) => {
				const response = await marketplace.builtin.search({
					templateId,
					collectionId: collection.id,
					keyword: kw,
					page,
					pageSize: 100,
					route: BuiltinMarketRoutes.OpenPlatform
				});
				if (response.code !== 0) throw new Error(response.msg || "collection search failed");
				return {
					skills: response.data?.skills ?? [],
					total: response.data?.total_count ?? 0
				};
			};
			const noSpaceKeyword = keyword.includes(" ") ? keyword.replace(/\s+/g, "") : "";
			const settled = await Promise.allSettled([searchPage(keyword, 1), ...noSpaceKeyword ? [searchPage(noSpaceKeyword, 1)] : []]);
			const primary = settled[0].status === "fulfilled" ? settled[0].value : null;
			const secondary = settled.length > 1 && settled[1].status === "fulfilled" ? settled[1].value : null;
			if (!primary && !secondary) throw new Error("collection search failed");
			return {
				items: this.mergeByName(primary?.skills ?? [], secondary?.skills ?? []).map((value) => ({
					kind: "builtin",
					value
				})),
				page: 1,
				total: primary?.total ?? 0,
				primaryCount: primary?.skills.length ?? 0,
				paginable: true
			};
		}
		/**
		* 搜索 SkillHub（含去空格双路检索 + slug 去重）。
		*/
		async searchSkillHub(keyword, marketplace) {
			if (!marketplace?.skillhub) throw new Error("skillhub search unavailable");
			const listOnce = (kw) => this.fetchSkillHubListPage(marketplace, kw, 1);
			const noSpaceKeyword = keyword.includes(" ") ? keyword.replace(/\s+/g, "") : "";
			const settled = await Promise.allSettled([listOnce(keyword), ...noSpaceKeyword ? [listOnce(noSpaceKeyword)] : []]);
			const primary = settled[0].status === "fulfilled" ? settled[0].value : null;
			const secondary = settled.length > 1 && settled[1].status === "fulfilled" ? settled[1].value : null;
			if (!primary && !secondary) throw new Error("skillhub search failed");
			let results = primary?.items ?? [];
			if (secondary) results = this.mergeBySlug(results, secondary.items);
			return {
				items: results.map((value) => ({
					kind: CollectionSubType.SkillHub,
					value
				})),
				page: 1,
				total: primary?.total ?? 0,
				primaryCount: primary?.items.length ?? 0,
				paginable: true
			};
		}
		/**
		* 搜索 Knot（仅 IOA 用户；含去空格双路检索 + 按 Knot id 去重）。
		*/
		async searchKnot(keyword, enterpriseId, marketplace) {
			if (!isIOAUser(enterpriseId || "")) return {
				items: [],
				page: 1,
				total: 0,
				primaryCount: 0,
				paginable: false
			};
			if (!marketplace?.knot) throw new Error("knot search unavailable");
			const listOnce = async (kw) => {
				const response = await marketplace.knot.list({
					keyword: kw,
					page: 1,
					pageSize: 100
				});
				if (response.code !== 0) throw new Error("knot search failed");
				return {
					skills: response.data?.skills ?? [],
					total: response.data?.total ?? 0
				};
			};
			const noSpaceKeyword = keyword.includes(" ") ? keyword.replace(/\s+/g, "") : "";
			const settled = await Promise.allSettled([listOnce(keyword), ...noSpaceKeyword ? [listOnce(noSpaceKeyword)] : []]);
			const primary = settled[0].status === "fulfilled" ? settled[0].value : null;
			const secondary = settled.length > 1 && settled[1].status === "fulfilled" ? settled[1].value : null;
			if (!primary && !secondary) throw new Error("knot search failed");
			const byKey = /* @__PURE__ */ new Map();
			for (const skill of primary?.skills ?? []) byKey.set(knotSkillKey(skill), skill);
			for (const skill of secondary?.skills ?? []) {
				const key = knotSkillKey(skill);
				if (!byKey.has(key)) byKey.set(key, skill);
			}
			const merged = [...byKey.values()];
			const primaryKeys = new Set((primary?.skills ?? []).map(knotSkillKey));
			return {
				items: merged.map((value) => ({
					kind: ClientTabId.Knot,
					value
				})),
				page: 1,
				total: primary?.total ?? 0,
				primaryCount: primaryKeys.size,
				paginable: true
			};
		}
		/**
		* 搜索所有插件市场，按关键词本地过滤。
		*/
		async searchPlugins(keyword, pluginFacade) {
			if (!pluginFacade) throw new Error("plugin search unavailable");
			const marketplaces = await pluginFacade.getPluginMarketplaces(false);
			const fulfilled = (await Promise.allSettled(marketplaces.map(async (entry) => ({
				entry,
				plugins: await pluginFacade.getMarketplacePlugins(entry.id || entry.name, false)
			})))).flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
			if (marketplaces.length > 0 && fulfilled.length === 0) throw new Error("plugin search failed");
			const normalizedKeyword = keyword.toLowerCase();
			const items = fulfilled.flatMap((result) => result.plugins.map((plugin) => this.mapPlugin(plugin, result.entry.name)).filter((plugin) => textMatchesKeyword(plugin.name.toLowerCase(), normalizedKeyword) || textMatchesKeyword(plugin.description?.toLowerCase() ?? "", normalizedKeyword)).map((value) => ({
				kind: "plugin",
				value
			})));
			return {
				items,
				page: 1,
				total: items.length,
				primaryCount: items.length,
				paginable: false
			};
		}
		/**
		* 搜索企业自建技能。
		*/
		async searchEnterpriseSkills(keyword, enterpriseId, enterpriseFacade) {
			if (!enterpriseFacade || !enterpriseId) throw new Error("enterprise search unavailable");
			const response = await enterpriseFacade.list({
				enterpriseId,
				keyword,
				page: 1,
				pageSize: 100
			});
			const items = (response.skills ?? []).map((value) => ({
				kind: ClientTabId.Enterprise,
				value
			}));
			return {
				items,
				page: 1,
				total: response.total_count ?? 0,
				primaryCount: items.length,
				paginable: true
			};
		}
		/**
		* 加载更多搜索结果（仅主 keyword 分页）。
		*/
		loadMore(collectionId) {
			const { keyword, outcomes } = this.store.getState();
			const outcome = outcomes.find((entry) => entry.collectionId === collectionId);
			if (!outcome || outcome.status !== "fulfilled") return;
			if (!outcome.paginable || outcome.primaryCount >= outcome.total || outcome.loadingMore) return;
			const generation = this.generation;
			const nextPage = outcome.page + 1;
			const collection = this.services.marketLayoutService.useStore.getState().tabs.find((tab) => tab.id === collectionId);
			if (!collection) return;
			const loadingOutcomes = outcomes.map((entry) => entry.collectionId === collectionId && entry.status === "fulfilled" ? {
				...entry,
				loadingMore: true
			} : entry);
			this.rebuildBuckets(loadingOutcomes);
			this.fetchSearchPageForLoadMore(collection, keyword, nextPage).then((pageResult) => {
				if (this.cancelled || generation !== this.generation) return;
				const visibleCountBefore = this.store.getState().buckets.find((bucket) => bucket.id === collectionId)?.items.length ?? 0;
				const currentOutcomes = this.store.getState().outcomes;
				const current = currentOutcomes.find((entry) => entry.collectionId === collectionId);
				if (!current || current.status !== "fulfilled") return;
				const updatedOutcomes = currentOutcomes.map((entry) => entry.collectionId === collectionId && entry.status === "fulfilled" ? {
					...entry,
					items: this.appendSearchItems(entry.items, pageResult.items),
					page: pageResult.page,
					primaryCount: entry.primaryCount + pageResult.primaryCount,
					loadingMore: false
				} : entry);
				this.rebuildBuckets(updatedOutcomes);
				const updated = updatedOutcomes.find((entry) => entry.collectionId === collectionId);
				const visibleCountAfter = this.store.getState().buckets.find((bucket) => bucket.id === collectionId)?.items.length ?? 0;
				if (this.store.getState().hideInstalled && updated?.status === "fulfilled" && pageResult.primaryCount > 0 && visibleCountAfter === visibleCountBefore && updated.primaryCount < updated.total) this.loadMore(collectionId);
			}).catch(() => {
				if (this.cancelled || generation !== this.generation) return;
				const updatedOutcomes = this.store.getState().outcomes.map((entry) => entry.collectionId === collectionId && entry.status === "fulfilled" ? {
					...entry,
					loadingMore: false
				} : entry);
				this.rebuildBuckets(updatedOutcomes);
			});
		}
		/**
		* 按 collection 来源拉取搜索下一页（仅主 keyword）。
		*/
		async fetchSearchPageForLoadMore(collection, keyword, page) {
			const source = resolveCollectionSource(collection.source);
			const { templateId } = this.deps;
			const host = this.deps.host;
			let marketplace;
			let enterpriseFacade;
			try {
				marketplace = host.facades.skillsMarketplace;
			} catch {
				marketplace = void 0;
			}
			try {
				enterpriseFacade = host.facades.enterpriseSkills;
			} catch {
				enterpriseFacade = void 0;
			}
			const enterpriseId = host.accountInfo?.enterpriseId?.trim() || void 0;
			if (source === "builtin-collection") return this.fetchBuiltinSearchPage(collection, keyword, page, templateId, marketplace);
			if (source === CollectionSubType.SkillHub) return this.fetchSkillHubSearchPage(keyword, page, marketplace);
			if (source === ClientTabId.Knot) return this.fetchKnotSearchPage(keyword, page, enterpriseId, marketplace);
			if (source === ClientTabId.Enterprise) return this.fetchEnterpriseSearchPage(keyword, page, enterpriseId, enterpriseFacade);
			return {
				items: [],
				page,
				primaryCount: 0
			};
		}
		/**
		* Builtin Collection 搜索翻页（openplatform `/skills/search`）。
		*
		* 只服务于「非企业态 / 聚合降级」路径：企业态的聚合 ∩ Tab 交集结果一律
		* `paginable: false`（见 searchBuiltinCollection 注释），`loadMore` 的
		* `!outcome.paginable` 守卫会提前短路，不会走到这里 —— 因此本方法**不需要**
		* 也**不应该**感知 enterpriseId / 聚合链路。
		*/
		async fetchBuiltinSearchPage(collection, keyword, page, templateId, marketplace) {
			if (!marketplace?.builtin || !templateId) throw new Error("collection search unavailable");
			const response = await marketplace.builtin.search({
				templateId,
				collectionId: collection.id,
				keyword,
				page,
				pageSize: 100,
				route: BuiltinMarketRoutes.OpenPlatform
			});
			if (response.code !== 0) throw new Error(response.msg || "collection search failed");
			const skills = response.data?.skills ?? [];
			return {
				items: skills.map((value) => ({
					kind: "builtin",
					value
				})),
				page,
				primaryCount: skills.length
			};
		}
		async fetchSkillHubSearchPage(keyword, page, marketplace) {
			if (!marketplace?.skillhub) throw new Error("skillhub search unavailable");
			const { items } = await this.fetchSkillHubListPage(marketplace, keyword, page);
			return {
				items: items.map((value) => ({
					kind: CollectionSubType.SkillHub,
					value
				})),
				page,
				primaryCount: items.length
			};
		}
		async fetchSkillHubListPage(marketplace, keyword, page) {
			const envelope = await marketplace.skillhub.list({
				keyword,
				page,
				pageSize: 100
			});
			return {
				items: envelope.items ?? envelope.data?.skills ?? [],
				total: envelope.total ?? envelope.data?.total ?? 0
			};
		}
		async fetchKnotSearchPage(keyword, page, enterpriseId, marketplace) {
			if (!isIOAUser(enterpriseId || "") || !marketplace?.knot) throw new Error("knot search unavailable");
			const response = await marketplace.knot.list({
				keyword,
				page,
				pageSize: 100
			});
			if (response.code !== 0) throw new Error("knot search failed");
			const skills = response.data?.skills ?? [];
			return {
				items: skills.map((value) => ({
					kind: ClientTabId.Knot,
					value
				})),
				page,
				primaryCount: skills.length
			};
		}
		async fetchEnterpriseSearchPage(keyword, page, enterpriseId, enterpriseFacade) {
			if (!enterpriseFacade || !enterpriseId) throw new Error("enterprise search unavailable");
			const skills = (await enterpriseFacade.list({
				enterpriseId,
				keyword,
				page,
				pageSize: 100
			})).skills ?? [];
			return {
				items: skills.map((value) => ({
					kind: ClientTabId.Enterprise,
					value
				})),
				page,
				primaryCount: skills.length
			};
		}
		/**
		* 追加搜索结果并去重。
		*/
		appendSearchItems(existing, incoming) {
			const result = [...existing];
			const seenBuiltin = new Set(existing.filter((item) => item.kind === "builtin").map((item) => (getBuiltinMarketSkillId(item.value) || item.value.name || "").toLowerCase()));
			const seenHubSlug = new Set(existing.filter((item) => item.kind === "skillhub").map((item) => item.value.slug));
			const seenKnotKey = new Set(existing.filter((item) => item.kind === ClientTabId.Knot).map((item) => knotSkillKey(item.value)));
			const seenEnterprise = new Set(existing.filter((item) => item.kind === "enterprise").map((item) => item.value.id));
			for (const item of incoming) {
				if (item.kind === "builtin") {
					const key = (getBuiltinMarketSkillId(item.value) || item.value.name || "").toLowerCase();
					if (!key || seenBuiltin.has(key)) continue;
					seenBuiltin.add(key);
					result.push(item);
					continue;
				}
				if (item.kind === "skillhub") {
					if (seenHubSlug.has(item.value.slug)) continue;
					seenHubSlug.add(item.value.slug);
					result.push(item);
					continue;
				}
				if (item.kind === ClientTabId.Knot) {
					const key = knotSkillKey(item.value);
					if (seenKnotKey.has(key)) continue;
					seenKnotKey.add(key);
					result.push(item);
					continue;
				}
				if (item.kind === "enterprise") {
					if (seenEnterprise.has(item.value.id)) continue;
					seenEnterprise.add(item.value.id);
					result.push(item);
					continue;
				}
				result.push(item);
			}
			return result;
		}
		/**
		* 更新单个 collection 的搜索 outcome 并重建 buckets。
		*/
		updateOutcome(generation, collectionId, status, result, error) {
			if (this.cancelled || generation !== this.generation) return;
			const outcomes = this.store.getState().outcomes.map((outcome) => outcome.collectionId === collectionId ? status === "fulfilled" ? {
				collectionId,
				status,
				items: result?.items ?? [],
				page: result?.page ?? 1,
				total: result?.total ?? 0,
				primaryCount: result?.primaryCount ?? 0,
				paginable: result?.paginable ?? false,
				loadingMore: false
			} : {
				collectionId,
				status,
				error: error ?? "unknown"
			} : outcome);
			this.rebuildBuckets(outcomes);
		}
		/**
		* 根据 outcomes 与已安装列表重建搜索结果 buckets。
		*/
		rebuildBuckets(outcomes) {
			const tabs = this.services.marketLayoutService.useStore.getState().tabs;
			const installedSkills = this.services.installedSkillsService.useStore.getState().skills;
			const installedPlugins = this.services.pluginsService.useStore.getState().installedPlugins;
			const { hideInstalled } = this.store.getState();
			const isEnterpriseInstalled = (skill) => this.services.enterpriseService.isInstalled(skill);
			const outcomeById = new Map(outcomes.map((o) => [o.collectionId, o]));
			const skillsByKey = this.indexInstalledSkillsByKey(installedSkills);
			const buckets = tabs.map((collection) => {
				const id = collection.id;
				const outcome = outcomeById.get(id);
				const items = outcome?.status === "fulfilled" ? hideInstalled ? outcome.items.filter((item) => !this.isInstalledSearchItem(item, skillsByKey, installedPlugins, isEnterpriseInstalled)) : outcome.items : [];
				const hasMore = outcome?.status === "fulfilled" && outcome.paginable && outcome.primaryCount < outcome.total;
				return {
					id,
					collection,
					items,
					loading: outcome?.status === "pending",
					hasMore,
					loadingMore: outcome?.status === "fulfilled" ? outcome.loadingMore : void 0,
					error: outcome?.status === "rejected" ? outcome.error : void 0
				};
			});
			const failedCount = buckets.filter((b) => !!b.error).length;
			const successfulCount = buckets.filter((b) => !b.loading && !b.error).length;
			const result = {
				buckets,
				partialFailure: failedCount > 0 && successfulCount > 0,
				error: failedCount > 0 && failedCount === buckets.length
			};
			this.store.setState({
				outcomes,
				buckets: result.buckets,
				loading: result.buckets.some((bucket) => bucket.loading),
				error: result.error,
				partialFail: result.partialFailure
			});
		}
		/**
		* 已安装技能的身份索引（强键 / name 分属不同命名空间）。
		*/
		indexInstalledSkillsByKey(skills) {
			return buildInstalledIdentityIndex(skills);
		}
		/**
		* 判断搜索结果项是否已安装。
		*/
		isInstalledSearchItem(item, skillsByKey, installedPlugins, isEnterpriseSkillInstalled) {
			if (item.kind === "plugin") return installedPlugins.some((plugin) => plugin.name === item.value.name && plugin.marketplaceName === item.value.marketplaceName);
			if (item.kind === "builtin") return hasInstalledIdentity(skillsByKey, {
				strong: [
					getBuiltinMarketSkillId(item.value),
					item.value.id,
					item.value.skill_id
				],
				name: item.value.name
			}, ["builtin-market", "marketplace"]);
			if (item.kind === "enterprise") {
				if (isEnterpriseSkillInstalled?.(item.value)) return true;
				return hasInstalledIdentity(skillsByKey, {
					strong: [item.value.id],
					name: item.value.name
				});
			}
			return hasInstalledIdentity(skillsByKey, {
				strong: [item.value.slug],
				name: item.value.name
			}, [item.kind]);
		}
		/**
		* 设置搜索结果区当前选中的 collection Tab。
		*/
		setSearchCollectionId(id) {
			this.store.setState({
				searchCollectionId: id,
				userPickedTab: true,
				autoSelectPending: false
			});
		}
		/**
		* 自动跳转到首个有结果的 Tab；不记为用户手动选择，后续仍可继续自动跳转。
		*/
		autoSelectSearchCollectionId(id) {
			this.store.setState({ searchCollectionId: id });
		}
		/**
		* 自动选中首个有结果 Tab 完成后清除 pending 标记。
		*/
		markAutoSelectDone() {
			this.store.setState({ autoSelectPending: false });
		}
		/**
		* 切换是否隐藏已安装项并重建 buckets。
		*/
		setHideInstalled(hidden) {
			this.store.setState({ hideInstalled: hidden });
			this.rebuildBuckets(this.store.getState().outcomes);
		}
		/**
		* 已装列表变化后重跑 hideInstalled 过滤（不重新请求搜索）。
		*/
		refreshBuckets() {
			this.rebuildBuckets(this.store.getState().outcomes);
		}
		/**
		* 按当前关键字过滤已安装 Skill 列表。
		*/
		getFilteredInstalledSkills() {
			const { keyword } = this.store.getState();
			const installedSkills = this.services.installedSkillsService.useStore.getState().skills;
			const kw = keyword.trim().toLowerCase();
			if (!kw) return installedSkills;
			return installedSkills.filter((skill) => [
				skill.name,
				skill.description,
				skill.description_zh,
				skill.description_en
			].some((value) => !!value && textMatchesKeyword(value.toLowerCase(), kw)));
		}
		/**
		* 清空搜索状态并取消进行中的检索。
		*/
		clear() {
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			if (this.searchTimer) clearTimeout(this.searchTimer);
			this.cancelled = true;
			this.generation += 1;
			this.store.setState({
				keyword: "",
				inputValue: "",
				buckets: [],
				outcomes: [],
				loading: false,
				error: false,
				partialFail: false,
				searchCollectionId: this.resolveDefaultSearchCollectionId(),
				autoSelectPending: true,
				userPickedTab: false
			});
		}
		/**
		* 释放定时器并取消进行中的检索。
		*/
		dispose() {
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			if (this.searchTimer) clearTimeout(this.searchTimer);
			this.cancelled = true;
			this.generation += 1;
		}
		/**
		* 映射 Plugin 搜索结果
		*/
		mapPlugin(plugin, marketplaceName) {
			return {
				name: plugin.name,
				marketplaceName: plugin.marketplaceName || marketplaceName,
				description: plugin.description,
				version: plugin.version,
				homepage: plugin.homepage,
				status: plugin.status,
				installedScopes: plugin.installedScopes,
				installedScopesStatus: plugin.installedScopesStatus,
				installedPath: plugin.installedPath,
				source: "",
				agents: plugin.agents,
				commands: plugin.commands,
				skills: plugin.skills,
				mcpServers: plugin.mcpServers,
				hooks: plugin.hooks,
				rules: plugin.rules,
				lsp: plugin.lsp
			};
		}
		/**
		* 按 name/skillId 去重合并两路 Builtin 搜索结果
		*/
		mergeByName(primary, secondary) {
			if (secondary.length === 0) return primary;
			const seen = new Set(primary.map((skill) => (getBuiltinMarketSkillId(skill) || skill.name || "").toLowerCase()));
			const merged = [...primary];
			for (const skill of secondary) {
				const key = (getBuiltinMarketSkillId(skill) || skill.name || "").toLowerCase();
				if (!key || seen.has(key)) continue;
				seen.add(key);
				merged.push(skill);
			}
			return merged;
		}
		/**
		* 按 slug 去重合并两路 SkillHub 搜索结果
		*/
		mergeBySlug(primary, secondary) {
			if (secondary.length === 0) return primary;
			const seen = new Set(primary.map((skill) => skill.slug));
			return [...primary, ...secondary.filter((skill) => !seen.has(skill.slug))];
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/skillhub.ts
var import_zustand$1, SkillhubService;
var init_skillhub = __esmMin((() => {
	import_zustand$1 = require_zustand();
	init_app_core();
	init_i18n();
	init_constants();
	init_installed_identity();
	init_version();
	SkillhubService = class {
		constructor(services, deps) {
			this.services = services;
			this.deps = deps;
			this.store = (0, import_zustand$1.create)(() => ({
				skills: [],
				categories: [],
				categoriesReady: false,
				selectedCategory: "",
				sortBy: "score",
				total: 0,
				page: 1,
				loading: false,
				error: false,
				remoteVersionMap: {},
				remoteNameMap: {},
				localVersionMap: {},
				installingSlug: null,
				recentlyInstalledSlugs: /* @__PURE__ */ new Set(),
				updateCheckCompleted: false,
				loaded: false,
				enteredOnce: false
			}));
			this.updateChecking = false;
			this.listCache = /* @__PURE__ */ new Map();
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 加载首屏浏览数据（已加载则跳过）。
		*/
		loadFirstPageSkills() {
			const { loaded } = this.store.getState();
			if (loaded) return;
			this.store.setState({ loaded: true });
			this.loadCategories();
			this.fetchSkills(1);
		}
		/**
		* 加载 SkillHub 分类列表。
		*/
		async loadCategories() {
			const skillhub = wb.skills.marketplace?.skillhub;
			if (!skillhub) {
				this.store.setState({
					categories: [],
					categoriesReady: true
				});
				return;
			}
			this.store.setState({ categoriesReady: false });
			wb.utils.swr("skillhub:categories", async () => {
				return ((await skillhub.categories()).items || []).filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);
			}, (sorted) => this.store.setState({
				categories: sorted,
				categoriesReady: true
			}));
		}
		/**
		* 分页拉取 SkillHub 技能列表。
		*/
		async fetchSkills(nextPage = 1, append = false) {
			const skillhub = wb.skills.marketplace?.skillhub;
			if (!skillhub) {
				this.store.setState({ error: true });
				return;
			}
			const { selectedCategory, sortBy } = this.store.getState();
			const cacheKey = this.buildListCacheKey(selectedCategory, sortBy);
			const isFirstPage = nextPage === 1 && !append;
			const cachedEntry = isFirstPage ? this.listCache.get(cacheKey) ?? null : null;
			const cached = cachedEntry && cachedEntry.skills.length > 0 ? cachedEntry : null;
			if (cached) this.store.setState({
				skills: cached.skills,
				total: cached.total,
				page: 1,
				loading: false,
				error: false
			});
			else if (isFirstPage) this.store.setState({
				skills: [],
				total: 0,
				page: 1,
				loading: true,
				error: false
			});
			else this.store.setState({
				loading: true,
				error: false
			});
			try {
				const { items, total: nextTotal } = await skillhub.list({
					page: nextPage,
					pageSize: 100,
					sortBy,
					order: "desc",
					category: selectedCategory || void 0
				});
				const current = this.store.getState();
				if (this.buildListCacheKey(current.selectedCategory, current.sortBy) !== cacheKey) return;
				const total = nextTotal ?? 0;
				const nextRemoteVersions = {};
				for (const skill of items) nextRemoteVersions[skill.slug] = skill.version;
				this.store.setState({
					skills: append ? [...current.skills, ...items] : items,
					total,
					page: nextPage,
					loading: false,
					remoteVersionMap: {
						...current.remoteVersionMap,
						...nextRemoteVersions
					}
				});
				if (isFirstPage && items.length > 0) this.writeListCache(cacheKey, {
					skills: items,
					total
				});
			} catch {
				const current = this.store.getState();
				if (this.buildListCacheKey(current.selectedCategory, current.sortBy) === cacheKey) this.store.setState({
					error: true,
					loading: false
				});
			}
		}
		/**
		* 生成列表内存缓存 key（按 category / sortBy 分片）
		*/
		buildListCacheKey(category, sortBy) {
			return `${category}|${sortBy}`;
		}
		/**
		* 写入第一页内存缓存（超出上限时删 Map 中最旧条目）
		*/
		writeListCache(cacheKey, entry) {
			if (entry.skills.length === 0) return;
			if (this.listCache.size >= 12 && !this.listCache.has(cacheKey)) {
				const oldest = this.listCache.keys().next().value;
				if (oldest) this.listCache.delete(oldest);
			}
			this.listCache.delete(cacheKey);
			this.listCache.set(cacheKey, entry);
		}
		/**
		* 再次进入该源时刷新第一页；首次进入跳过（避免与 loadFirstPageSkills 叠请求）。
		*/
		reloadOnReenter() {
			const { loaded, enteredOnce } = this.store.getState();
			this.store.setState({ enteredOnce: true });
			if (!loaded || !enteredOnce) return;
			this.fetchSkills(1);
		}
		/**
		* 设置分类并重新拉取第一页；命中内存缓存时静默刷新
		*/
		setCategory(category) {
			if (this.store.getState().selectedCategory === category) return;
			this.store.setState({
				selectedCategory: category,
				page: 1
			});
			this.fetchSkills(1);
		}
		/**
		* 设置排序并重新拉取第一页；命中内存缓存时静默刷新
		*/
		setSortBy(sort) {
			if (this.store.getState().sortBy === sort) return;
			this.store.setState({
				sortBy: sort,
				page: 1
			});
			this.fetchSkills(1);
		}
		/**
		* 加载指定页（可追加）。
		*/
		loadPage(page, append = false) {
			this.fetchSkills(page, append);
		}
		/**
		* 判断技能是否正在安装。
		*/
		isInstalling(skill) {
			const slug = typeof skill === "string" ? skill : skill.slug;
			return this.store.getState().installingSlug === slug;
		}
		/**
		* 判断技能是否已安装（命令式，读已装列表）。
		*/
		isInstalled(skill) {
			const item = typeof skill === "string" ? {
				slug: skill,
				name: skill
			} : skill;
			return this.computeIsInstalled(item, {
				installedSkills: this.services.installedSkillsService.useStore.getState().skills,
				localVersionMap: this.store.getState().localVersionMap
			});
		}
		/**
		* 清空本会话刚安装白名单。
		*/
		clearRecentlyInstalled() {
			if (this.store.getState().recentlyInstalledSlugs.size === 0) return;
			this.store.setState({ recentlyInstalledSlugs: /* @__PURE__ */ new Set() });
		}
		/**
		* 卸载后收口：去掉刚装白名单与 localVersionMap，避免浏览卡「幽灵已装」。
		*/
		forgetUninstalled(skill) {
			const keys = [
				skill.slug,
				skill.name,
				skill.name?.toLowerCase()
			].filter((key) => !!key && key.trim().length > 0);
			if (keys.length === 0) return;
			this.store.setState((s) => {
				let recently = s.recentlyInstalledSlugs;
				let recentChanged = false;
				for (const key of keys) if (recently.has(key)) {
					if (!recentChanged) {
						recently = new Set(recently);
						recentChanged = true;
					}
					recently.delete(key);
				}
				const nextLocal = { ...s.localVersionMap };
				let localChanged = false;
				for (const key of keys) if (key in nextLocal) {
					delete nextLocal[key];
					localChanged = true;
				}
				if (!recentChanged && !localChanged) return s;
				return {
					...recentChanged ? { recentlyInstalledSlugs: recently } : {},
					...localChanged ? { localVersionMap: nextLocal } : {}
				};
			});
		}
		/**
		* UI：是否已装（浏览 filter；与 InstallStatus.Update 无关）。
		* localVersionMap key 存在即本源 meta（含空串未知版本）；否则回落强/弱键双索引。
		*/
		computeIsInstalled(skill, sources) {
			if (skill.slug in sources.localVersionMap) return true;
			return hasInstalledIdentity(buildInstalledIdentityIndex(sources.installedSkills), {
				strong: [skill.slug],
				name: skill.name
			}, ["skillhub", "marketplace"]);
		}
		/**
		* UI：是否本会话刚装（浏览 filter 白名单）。
		*/
		computeIsRecentlyInstalled(skill, sources) {
			return sources.recentlyInstalledSlugs.has(skill.slug);
		}
		/**
		* UI：由调用方传入 sources，计算浏览卡安装按钮态。
		*/
		computeInstallState(skill, sources) {
			const { installingSlug, installedSkills, localVersionMap, remoteVersionMap, recentlyInstalledSlugs } = sources;
			if (installingSlug === skill.slug) return {
				status: InstallStatus.Installing,
				disabled: true
			};
			const recently = this.computeIsRecentlyInstalled(skill, { recentlyInstalledSlugs });
			const installed = this.computeIsInstalled(skill, {
				installedSkills,
				localVersionMap
			});
			if (!recently && !installed) return {
				status: InstallStatus.Install,
				disabled: false
			};
			if (installed && skill.slug in localVersionMap) {
				const remoteVersion = remoteVersionMap[skill.slug] || skill.version;
				const localVersion = localVersionMap[skill.slug];
				if (remoteVersion && (!localVersion || isNewerVersion(remoteVersion, localVersion))) return {
					status: InstallStatus.Update,
					disabled: false
				};
			}
			return {
				status: InstallStatus.Installed,
				disabled: true
			};
		}
		/**
		* 命令式：从当前 store 解析安装按钮态。
		*/
		resolveInstallState(skill) {
			const { installingSlug, localVersionMap, remoteVersionMap, recentlyInstalledSlugs } = this.store.getState();
			return this.computeInstallState(skill, {
				installingSlug,
				installedSkills: this.services.installedSkillsService.useStore.getState().skills,
				localVersionMap,
				remoteVersionMap,
				recentlyInstalledSlugs
			});
		}
		/**
		* 安装指定 SkillHub 技能。
		*/
		install(skill) {
			return this.installOrUpdate(skill, false);
		}
		/**
		* 更新指定 SkillHub 技能（底层仍走 install 接口）。
		*/
		update(skill) {
			return this.installOrUpdate(skill, true);
		}
		/**
		* 安装/更新共用实现；isUpdate 仅影响埋点 action。
		*/
		async installOrUpdate(skill, isUpdate) {
			this.store.setState({ installingSlug: skill.slug });
			let facade;
			try {
				facade = this.deps.host.facades.skillsMarketplace;
			} catch {
				facade = void 0;
			}
			try {
				const result = facade ? await facade.skillhub.install(skill.slug, skill.version, skill.name, skill.iconUrl, skill.labels) : {
					success: false,
					skillName: skill.slug,
					errorMessage: "SkillsMarketplace facade not available"
				};
				if (result.success) {
					facade?.skillhub.reportStats(skill.slug, {
						installs: 1,
						downloads: 1
					});
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillInstalled, {
						name: skill.name,
						skillId: skill.slug,
						skillVersion: skill.version
					});
					this.deps.telemetry.reportEvent(this.deps.telemetry.Events.SkillAction, {
						name: skill.name,
						skillId: skill.slug,
						skillVersion: skill.version,
						action: isUpdate ? "update" : "install",
						source: "marketplace"
					});
					const recent = new Set(this.store.getState().recentlyInstalledSlugs);
					recent.add(skill.slug);
					this.store.setState({ recentlyInstalledSlugs: recent });
					const installedVersion = this.store.getState().remoteVersionMap[skill.slug] || skill.version;
					if (installedVersion) this.markInstalledVersion(skill.slug, installedVersion);
					const installedPath = result.installedPath;
					this.services.installedSkillsService.notifySkillInstalled(installedPath ? {
						...skill,
						name: skill.name,
						description: skill.description,
						filePath: installedPath,
						slug: skill.slug,
						version: installedVersion,
						installedAt: Date.now(),
						source: "userSettings",
						disable: false,
						disableModelInvocation: false
					} : void 0);
					return { success: true };
				}
				const toastKey = (result.errorMessage || "").startsWith("[DOWNLOAD_ERROR]") ? "skills.skillhub.installFailed.download" : "skills.skillhub.installFailed.package";
				return {
					success: false,
					errorMessage: t(toastKey)
				};
			} catch {
				return {
					success: false,
					errorMessage: t("skills.skillhub.installFailed.download")
				};
			} finally {
				this.store.setState({ installingSlug: null });
			}
		}
		/**
		* 检测已安装 SkillHub 技能是否有更新。
		*/
		async checkUpdates(updateCheckEnabled, installedLoading, installedSkills) {
			if (!updateCheckEnabled) {
				this.updateChecking = false;
				this.store.setState({ updateCheckCompleted: false });
				return;
			}
			if (installedLoading || this.updateChecking) return;
			this.updateChecking = true;
			let facade;
			try {
				facade = this.deps.host.facades.skillsMarketplace;
			} catch {
				facade = void 0;
			}
			try {
				const { items: metas = [] } = await (wb.skills.marketplace?.skillhub)?.getInstalledMetas() ?? { items: [] };
				if (metas.length === 0) {
					this.store.setState({ updateCheckCompleted: true });
					return;
				}
				const localMap = {};
				const slugsToFetch = [];
				for (const meta of metas) {
					slugsToFetch.push(meta.slug);
					localMap[meta.slug] = meta.version || "";
				}
				this.store.setState({ localVersionMap: localMap });
				if (slugsToFetch.length > 0) {
					const remoteInfos = await fetchLatestVersionsDetailed(facade, slugsToFetch);
					if (Object.keys(remoteInfos).length > 0) {
						const remoteVersions = {};
						const remoteNames = {};
						for (const [remoteSlug, info] of Object.entries(remoteInfos)) {
							remoteVersions[remoteSlug] = info.version;
							if (info.displayName) remoteNames[remoteSlug] = info.displayName;
						}
						this.store.setState({
							remoteVersionMap: {
								...this.store.getState().remoteVersionMap,
								...remoteVersions
							},
							remoteNameMap: {
								...this.store.getState().remoteNameMap,
								...remoteNames
							}
						});
					}
				}
			} catch (err) {
				console.error("[SkillhubService] update check failed:", err);
			} finally {
				this.updateChecking = false;
				this.store.setState({ updateCheckCompleted: true });
			}
		}
		/**
		* 重置更新检测相关状态。
		*/
		reset() {
			this.updateChecking = false;
			this.store.setState({
				updateCheckCompleted: false,
				localVersionMap: {}
			});
		}
		/**
		* UI：由调用方传入 sources，计算已装更新信息。
		*/
		computeUpdateInfo(skill, sources) {
			const { skills, localVersionMap, installingSlug, remoteVersionMap } = sources;
			const hubSkillByName = /* @__PURE__ */ new Map();
			for (const s of skills) {
				hubSkillByName.set(s.name.toLowerCase(), s);
				hubSkillByName.set(s.slug.toLowerCase(), s);
			}
			const hubSkill = hubSkillByName.get(skill.name.toLowerCase());
			const slug = skill.slug ?? hubSkill?.slug ?? skill.name.toLowerCase();
			const remoteVersion = remoteVersionMap[slug] || hubSkill?.version;
			if (installingSlug === slug) return {
				hasUpdate: false,
				isUpdating: true,
				hubSkill,
				slug,
				remoteVersion
			};
			if (!(slug in localVersionMap)) return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill: void 0,
				slug,
				remoteVersion: void 0
			};
			const localVersion = localVersionMap[slug];
			if (remoteVersion) {
				if (!localVersion || isNewerVersion(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					hubSkill,
					slug,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill,
				slug,
				remoteVersion
			};
		}
		/**
		* 命令式：从当前 store 解析更新信息。
		*/
		resolveUpdateInfo(skill) {
			const { skills, localVersionMap, installingSlug, remoteVersionMap, remoteNameMap } = this.store.getState();
			const info = this.computeUpdateInfo(skill, {
				skills,
				localVersionMap,
				installingSlug,
				remoteVersionMap
			});
			return {
				...info,
				remoteName: info.slug ? remoteNameMap[info.slug] : void 0
			};
		}
		/**
		* 释放资源（当前无定时器/监听）。
		*/
		dispose() {}
		/**
		* 记录技能安装后的本地版本。
		*/
		markInstalledVersion(slug, version) {
			this.store.setState({ localVersionMap: {
				...this.store.getState().localVersionMap,
				[slug]: version
			} });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/ui.ts
var import_zustand, MarketUIService;
var init_ui = __esmMin((() => {
	import_zustand = require_zustand();
	init_types();
	MarketUIService = class {
		constructor(services, _deps) {
			this.services = services;
			this.store = (0, import_zustand.create)(() => ({
				panelVisible: false,
				panelActive: false,
				view: MarketView.Market,
				returnView: MarketView.Market,
				showUploadModal: false,
				pendingModifiedUpdate: null
			}));
		}
		/**
		* 暴露 Zustand store，供 UI 用 selector 订阅。
		*/
		get useStore() {
			return this.store;
		}
		/**
		* 切换一级视图；非详情页同时更新 returnView。
		*/
		setView(view) {
			const prev = this.store.getState().view;
			const isListView = (v) => v === MarketView.Market || v === MarketView.Installed;
			if (isListView(prev) && isListView(view) && prev !== view) this.services.marketLayoutService.clearBrowsingRecentlyInstalled();
			if (view !== MarketView.SkillDetail && view !== MarketView.PluginDetail) this.store.setState({
				view,
				returnView: view
			});
			else this.store.setState({ view });
		}
		/**
		* 打开已安装 Skill 详情（弹窗；列表按 returnView 保持挂载）
		*/
		openSkillDetail(skill) {
			this.store.setState({ view: MarketView.SkillDetail });
			this.services.detailService.selectInstalledSkill(skill);
		}
		/**
		* 打开远端 Skill 详情（弹窗；SkillHub / Knot / Enterprise 等）
		*/
		openRemoteSkillDetail(skill) {
			this.store.setState({ view: MarketView.SkillDetail });
			this.services.detailService.selectRemoteSkill(skill);
		}
		/**
		* 打开 Plugin 详情。
		*/
		openPluginDetail(plugin) {
			this.store.setState({ view: MarketView.PluginDetail });
			this.services.detailService.selectPlugin(plugin);
		}
		/**
		* 退出详情，回到进入前的列表页（returnView）。
		*/
		backFromDetail() {
			const { returnView } = this.store.getState();
			this.store.setState({ view: returnView });
			this.services.detailService.clearSelection();
		}
		/**
		* 清空搜索并回到市场主页。
		*/
		backToMarket() {
			this.store.setState({ view: MarketView.Market });
			this.services.searchService.clear();
		}
		/**
		* 请求打开导入弹窗（Panel 桥接到 importFlow）。
		*/
		requestOpenImportModal() {
			this.store.setState({ showUploadModal: true });
		}
		/**
		* Panel 已消费打开请求后复位。
		*/
		clearImportModalRequest() {
			this.store.setState({ showUploadModal: false });
		}
		/**
		* 挂起已编辑 skill 的更新回调并打开确认弹窗。
		*/
		setPendingModifiedUpdate(runUpdate) {
			this.store.setState({ pendingModifiedUpdate: runUpdate });
		}
		/** 确认覆盖更新：执行挂起回调并清空。 */
		confirmModifiedUpdate() {
			const { pendingModifiedUpdate } = this.store.getState();
			pendingModifiedUpdate?.();
			this.store.setState({ pendingModifiedUpdate: null });
		}
		/** 取消覆盖更新确认。 */
		cancelModifiedUpdate() {
			this.store.setState({ pendingModifiedUpdate: null });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/services/bundle.ts
function createMarketServices(deps) {
	const bundle = {};
	bundle.installedSkillsService = new InstalledSkillsService(bundle, deps);
	bundle.detailService = new DetailService(bundle, deps);
	bundle.marketBuiltinService = new MarketBuiltinService(bundle, deps);
	bundle.marketLayoutService = new MarketLayoutService(bundle, deps);
	bundle.skillhubService = new SkillhubService(bundle, deps);
	bundle.knotService = new KnotService(bundle, deps);
	bundle.enterpriseService = new EnterpriseService(bundle, deps);
	bundle.pluginsService = new PluginsService(bundle, deps);
	bundle.searchService = new SearchService(bundle, deps);
	bundle.uiService = new MarketUIService(bundle, deps);
	return bundle;
}
var ServiceKey;
var init_bundle = __esmMin((() => {
	init_builtin();
	init_detail();
	init_enterprise();
	init_installed();
	init_knot();
	init_layout();
	init_plugins();
	init_search$1();
	init_skillhub();
	init_ui();
	ServiceKey = {
		UIService: "uiService",
		InstalledSkillsService: "installedSkillsService",
		MarketBuiltinService: "marketBuiltinService",
		MarketLayoutService: "marketLayoutService",
		SkillhubService: "skillhubService",
		KnotService: "knotService",
		EnterpriseService: "enterpriseService",
		PluginsService: "pluginsService",
		SearchService: "searchService",
		DetailService: "detailService"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/context/market-service-context.tsx
function MarketServiceProvider(props) {
	const { templateId, children } = props;
	const host = useModuleHost();
	const conversations = useConversations();
	const telemetry = useAgentTelemetry();
	const depsRef = (0, import_react$20.useRef)(null);
	if (!depsRef.current || depsRef.current.templateId !== templateId) depsRef.current = {
		host,
		templateId,
		conversations,
		telemetry
	};
	else {
		const deps = depsRef.current;
		deps.host = host;
		deps.conversations = conversations;
		deps.telemetry = telemetry;
	}
	const services = (0, import_react$20.useMemo)(() => createMarketServices(depsRef.current), [templateId]);
	(0, import_react$20.useEffect)(() => () => {
		Object.values(services).forEach((s) => s.dispose?.());
	}, [services]);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(MarketServiceContext.Provider, {
		value: services,
		children: typeof children === "function" ? children(services) : children
	});
}
/**
* 通用 Service 获取 hook。
*
* @example
* const knotService = useService(ServiceKey.KnotService); // → KnotService
* const skills = knotService.useStore((s) => s.skills);
*/
function useService(key) {
	const bundle = (0, import_react$20.useContext)(MarketServiceContext);
	if (!bundle) throw new Error("useService must be used within MarketServiceProvider");
	return bundle[key];
}
function useMarketServices() {
	const bundle = (0, import_react$20.useContext)(MarketServiceContext);
	if (!bundle) throw new Error("useMarketServices must be used within MarketServiceProvider");
	return bundle;
}
var import_react$20, import_jsx_runtime$18, MarketServiceContext;
var init_market_service_context = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_telemetry();
	init_common$1();
	init_bundle();
	import_jsx_runtime$18 = require_jsx_runtime();
	MarketServiceContext = (0, import_react$20.createContext)(null);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/style.less
var init_style = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/icon.ts
/**
* 把任意 icon 字段规范为可直接渲染的图片 URL。
* 放行 http(s) 与 `local-file://` / `file://`；slug / 相对路径 / 空返回 undefined。
*/
function resolveIconUrl(...candidates) {
	for (const raw of candidates) {
		const trimmed = (raw || "").trim();
		if (/^(https?|local-file|file):\/\//i.test(trimmed)) return trimmed;
	}
}
var init_icon = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/skill-detail.ts
/**
* 判别 selectedRemoteSkill 属于哪类数据源
*/
function classifyRemoteSkill(selectedRemoteSkill) {
	const hubSlug = selectedRemoteSkill?.slug;
	const isEnterpriseSkill = !!selectedRemoteSkill && selectedRemoteSkill.source === "custom";
	const isBuiltinMarketSkill = !!selectedRemoteSkill && !isEnterpriseSkill && typeof hubSlug !== "string";
	return {
		hubSlug,
		isEnterpriseSkill,
		isBuiltinMarketSkill,
		isKnotSkill: !!selectedRemoteSkill && !isEnterpriseSkill && !isBuiltinMarketSkill && typeof selectedRemoteSkill.id === "number"
	};
}
/**
* 当前详情的稳定身份，用于重置滚动 / 描述展开
*/
function resolveSkillDetailKey(args) {
	const { selectedSkill, selectedRemoteSkill } = args;
	return selectedSkill?.filePath || selectedSkill?.name || selectedRemoteSkill?.slug || selectedRemoteSkill?.name || null;
}
/**
* 详情页标题与描述
*/
function resolveDetailCopy(args) {
	const { selectedSkill, selectedRemoteSkill, classified } = args;
	const { isEnterpriseSkill, isBuiltinMarketSkill } = classified;
	const isEn = toZhEnLocale(getLocale()) === "en";
	if (selectedSkill) return {
		name: getInstalledSkillDisplayName(selectedSkill),
		desc: getLocalizedDescription(selectedSkill)
	};
	if (!selectedRemoteSkill) return {
		name: "",
		desc: ""
	};
	if (isEnterpriseSkill) {
		const es = selectedRemoteSkill;
		return {
			name: isEn ? es.display_name_en || es.display_name_zh || es.name || "" : es.display_name_zh || es.display_name_en || es.name || "",
			desc: isEn ? es.description_en || es.description_zh || "" : es.description_zh || es.description_en || ""
		};
	}
	if (isBuiltinMarketSkill) {
		const bm = selectedRemoteSkill;
		return {
			name: getBuiltinMarketDisplayName(bm) || "",
			desc: isEn ? bm.description_en || bm.description || bm.description_zh || "" : bm.description_zh || bm.description || bm.description_en || ""
		};
	}
	const remoteDescription = selectedRemoteSkill;
	return {
		name: selectedRemoteSkill.name || "",
		desc: (isEn ? remoteDescription.description : remoteDescription.description_zh) || ""
	};
}
/**
* 远端 skill 对应的本地已装条目
*
* 不能用 `s.slug === selectedRemoteSkill.slug`：BuiltinMarketSkill 无 slug，
* installed UISkill 的 slug 也大多为 undefined，会误命中所有项。
* 必须按来源隔离：knot 与 skillhub 共用裸 slug 命名空间，同一条双边上架的 skill
* 在 knot 装完后会让 skillhub tab 的市场项误报已安装（企业自建无 marketplaceSource，不过滤）。
*/
function findHubInstalledSkill(args) {
	const { selectedRemoteSkill, classified, installedSkills } = args;
	const { hubSlug, isEnterpriseSkill, isBuiltinMarketSkill, isKnotSkill } = classified;
	if (!selectedRemoteSkill) return null;
	if (isEnterpriseSkill || isBuiltinMarketSkill) {
		const idKey = selectedRemoteSkill.id;
		return findInstalledByIdentity(buildInstalledIdentityIndex(installedSkills), {
			strong: [idKey, selectedRemoteSkill.skill_id],
			name: selectedRemoteSkill.name
		}, isEnterpriseSkill ? void 0 : ["builtin-market", "marketplace"]) || null;
	}
	const hubSlugStr = typeof hubSlug === "string" ? hubSlug : void 0;
	return findInstalledByIdentity(buildInstalledIdentityIndex(installedSkills), {
		strong: [hubSlugStr],
		name: selectedRemoteSkill.name
	}, isKnotSkill ? ["knot"] : ["skillhub", "marketplace"]) || null;
}
/**
* 使用人数：已装取 installs（meta 快照）；未装取远端 downloads / download_count / installs
*/
function resolveInstallCount(selectedSkill, selectedRemoteSkill) {
	return selectedSkill?.installs ?? selectedRemoteSkill?.downloads ?? selectedRemoteSkill?.download_count ?? selectedRemoteSkill?.installs;
}
/**
* 是否需要 API Key（boolean 字段或 labels.requires_api_key === 'true'）
*/
function resolveRequiresApiKey(selectedSkill, selectedRemoteSkill) {
	return !!(selectedSkill?.requires_api_key || selectedRemoteSkill?.requires_api_key || selectedSkill?.labels?.requires_api_key === "true" || selectedRemoteSkill?.labels?.requires_api_key === "true");
}
/**
* 来源文案
*/
function resolveSkillSource(selectedSkill, selectedRemoteSkill) {
	return selectedSkill?.source ?? selectedRemoteSkill?.source ?? "official";
}
/**
* 版本号
*/
function resolveSkillVersion(selectedSkill, selectedRemoteSkill) {
	return selectedSkill?.version ?? selectedRemoteSkill?.version ?? selectedRemoteSkill?.latestVersion?.version;
}
/**
* 头像 URL
*/
function resolveDetailIconUrl(selectedSkill, selectedRemoteSkill) {
	return resolveIconUrl(selectedSkill?.iconUrl, selectedSkill?.iconSource, selectedRemoteSkill?.iconUrl, selectedRemoteSkill?.iconSource, selectedRemoteSkill?.icon_url, selectedRemoteSkill?.icon);
}
/**
* SkillAvatar 市场来源
*/
function resolveMarketplaceSource(args) {
	const { classified, isRecommendedSkill, selectedRemoteSkill } = args;
	const { isKnotSkill, isBuiltinMarketSkill, isEnterpriseSkill } = classified;
	if (isKnotSkill) return "knot";
	if (isBuiltinMarketSkill || isRecommendedSkill) return "marketplace";
	if (selectedRemoteSkill && !isEnterpriseSkill) return "skillhub";
}
/**
* 展示用标签
*/
function resolveTagsForDisplay(selectedSkill, selectedRemoteSkill) {
	const isEn = toZhEnLocale(getLocale()) === "en";
	const pluralKey = isEn ? "tags_en" : "tags_zh";
	const singularKey = isEn ? "tag_en" : "tag_zh";
	const fromSelected = selectedSkill?.[pluralKey];
	const fromRemoteTags = selectedRemoteSkill?.tags;
	const fromRemoteI18n = selectedRemoteSkill?.[singularKey];
	const fromRemote = Array.isArray(fromRemoteTags) && fromRemoteTags.length > 0 ? fromRemoteTags : fromRemoteI18n;
	return (Array.isArray(fromSelected) && fromSelected.length > 0 ? fromSelected : Array.isArray(fromRemote) ? fromRemote : []).filter((v) => typeof v === "string" && v.trim().length > 0);
}
/**
* 非空概述 markdown
*/
function pickOverviewMarkdown(value) {
	if (typeof value !== "string" || value.length === 0) return;
	return value;
}
/**
* 从已装 / 远端 skill 上取概述双语正文
*/
function resolveOverviewI18n(selectedSkill, selectedRemoteSkill) {
	const fromSelected = selectedSkill?.overview?.i18n;
	const fromRemote = selectedRemoteSkill?.overview?.i18n;
	const raw = fromSelected ?? fromRemote;
	if (!raw) return null;
	const zh = pickOverviewMarkdown(raw.zh);
	const en = pickOverviewMarkdown(raw.en);
	if (!zh && !en) return null;
	return {
		zh,
		en
	};
}
/**
* 示例文案源
*/
function resolveExamplesSkill(selectedSkill, selectedRemoteSkill) {
	return selectedSkill ?? selectedRemoteSkill ?? null;
}
/**
* 当前详情是否已装
*/
function resolveIsInstalled(args) {
	const { selectedSkill, selectedRemoteSkill, isRecommendedSkill, isRecommendedSkillInstalled, recommendedSkillInstalledSkill, isHubSkillInstalled, hubSkillInstalledSkill } = args;
	return !!(selectedSkill && isRecommendedSkill && isRecommendedSkillInstalled && recommendedSkillInstalledSkill || selectedSkill && !isRecommendedSkill || selectedRemoteSkill && isHubSkillInstalled && hubSkillInstalledSkill);
}
/**
* 已装锚点：推荐已装条目 / 本地选中 / 远端已装匹配
*/
function resolveInstalledSkill(args) {
	const { selectedSkill, isRecommendedSkill, isRecommendedSkillInstalled, recommendedSkillInstalledSkill, isHubSkillInstalled, hubSkillInstalledSkill } = args;
	if (selectedSkill && (!isRecommendedSkill || isRecommendedSkillInstalled)) {
		if (isRecommendedSkill) return recommendedSkillInstalledSkill ?? null;
		return selectedSkill;
	}
	if (isHubSkillInstalled) return hubSkillInstalledSkill ?? null;
	return null;
}
/**
* 模型调用开关是否开启
*/
function resolveModelInvocationEnabled(skill) {
	if (!skill) return false;
	return !isSkillModelInvocationDisabled(skill);
}
function safeString(value) {
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
function normalizeMatchKey$1(value) {
	return safeString(value)?.toLowerCase();
}
/**
* 组反查使用案例的 skill_id / slug
*
* 双通道：推荐 / builtin → skillIds；SkillHub → slugs
*/
function buildSkillMatchKeys(args) {
	const { selectedSkill, selectedRemoteSkill } = args;
	const skillIds = /* @__PURE__ */ new Set();
	const slugs = /* @__PURE__ */ new Set();
	if (selectedSkill) {
		const skillId = normalizeMatchKey$1(selectedSkill.skillId);
		if (skillId) skillIds.add(skillId);
		const slug = normalizeMatchKey$1(selectedSkill.slug);
		if (slug) slugs.add(slug);
	}
	if (selectedRemoteSkill) {
		const hub = selectedRemoteSkill;
		const hubId = normalizeMatchKey$1(hub.id);
		if (hubId) skillIds.add(hubId);
		const hubSkillId = normalizeMatchKey$1(hub.skill_id);
		if (hubSkillId) skillIds.add(hubSkillId);
		const hubSlug = normalizeMatchKey$1(hub.slug);
		if (hubSlug) slugs.add(hubSlug);
	}
	return {
		skillIds: Array.from(skillIds),
		slugs: Array.from(slugs)
	};
}
var init_skill_detail = __esmMin((() => {
	init_i18n();
	init_icon();
	init_installed_identity();
	init_skill_utils();
	init_text();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-skill-detail.ts
/**
* 按数据源取主按钮安装态
*/
function resolveHubBtnState(selectedRemoteSkill, classified, enterpriseBtnState, computeHub, computeKnot, computeBuiltin) {
	if (!selectedRemoteSkill) return null;
	if (classified.isEnterpriseSkill) return enterpriseBtnState;
	if (classified.isBuiltinMarketSkill) return computeBuiltin();
	if (classified.isKnotSkill) return computeKnot();
	return computeHub();
}
/**
* 详情弹窗：整合各数据源
*/
function useSkillDetail() {
	const detailService = useService(ServiceKey.DetailService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const skillhubService = useService(ServiceKey.SkillhubService);
	const knotService = useService(ServiceKey.KnotService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const selectedSkill = detailService.useStore((s) => s.selectedSkill);
	const selectedRemoteSkill = detailService.useStore((s) => s.selectedRemoteSkill);
	const markdown = detailService.useStore((s) => s.markdown);
	const contentLoading = detailService.useStore((s) => s.loading);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const installedLoaded = installedSkillsService.useStore((s) => s.loaded);
	const skillhubInstallingSlug = skillhubService.useStore((s) => s.installingSlug);
	const skillhubLocalVersionMap = skillhubService.useStore((s) => s.localVersionMap);
	const skillhubRemoteVersionMap = skillhubService.useStore((s) => s.remoteVersionMap);
	const skillhubRecentlyInstalledSlugs = skillhubService.useStore((s) => s.recentlyInstalledSlugs);
	const knotInstallingSlug = knotService.useStore((s) => s.installingSlug);
	const knotLocalVersionMap = knotService.useStore((s) => s.localVersionMap);
	const knotRemoteVersionMap = knotService.useStore((s) => s.remoteVersionMap);
	const knotRecentlyInstalledSlugs = knotService.useStore((s) => s.recentlyInstalledSlugs);
	const builtinInstallingSkillId = marketBuiltinService.useStore((s) => s.installingSkillId);
	const builtinLocalVersionMap = marketBuiltinService.useStore((s) => s.localVersionMap);
	const builtinRemoteVersionMap = marketBuiltinService.useStore((s) => s.remoteVersionMap);
	const builtinRecentlyInstalledIds = marketBuiltinService.useStore((s) => s.recentlyInstalledIds);
	const enterpriseInstallingId = enterpriseService.useStore((s) => s.installingId);
	const enterpriseRecentlyInstalledIds = enterpriseService.useStore((s) => s.recentlyInstalledIds);
	const classified = classifyRemoteSkill(selectedRemoteSkill);
	const { isEnterpriseSkill } = classified;
	const skillKey = resolveSkillDetailKey({
		selectedSkill,
		selectedRemoteSkill
	});
	const isRecommendedSkill = selectedSkill?.filePath?.startsWith("marketplace://");
	const recommendedSkillInstalledSkill = isRecommendedSkill && selectedSkill ? findInstalledByIdentity(buildInstalledIdentityIndex(installedSkills), {
		strong: [selectedSkill.slug, selectedSkill.skillId],
		name: selectedSkill.name
	}) ?? null : null;
	const isRecommendedSkillInstalled = !!recommendedSkillInstalledSkill;
	const hubSkillInstalledSkill = findHubInstalledSkill({
		selectedRemoteSkill,
		classified,
		installedSkills
	});
	const isEnterpriseInstalled = !!selectedRemoteSkill && isEnterpriseSkill && enterpriseService.isInstalled(selectedRemoteSkill, installedSkills);
	const isHubSkillInstalled = !!hubSkillInstalledSkill || isEnterpriseInstalled;
	const isInstalled = resolveIsInstalled({
		selectedSkill,
		selectedRemoteSkill,
		isRecommendedSkill,
		isRecommendedSkillInstalled,
		recommendedSkillInstalledSkill,
		isHubSkillInstalled,
		hubSkillInstalledSkill
	});
	const installedSkill = resolveInstalledSkill({
		selectedSkill,
		isRecommendedSkill,
		isRecommendedSkillInstalled,
		recommendedSkillInstalledSkill,
		isHubSkillInstalled,
		hubSkillInstalledSkill
	});
	const isInstalling = !!(skillhubInstallingSlug || knotInstallingSlug || builtinInstallingSkillId || enterpriseInstallingId);
	const copy = resolveDetailCopy({
		selectedSkill,
		selectedRemoteSkill,
		classified
	});
	const marketplaceSourceArgs = {
		classified,
		isRecommendedSkill,
		selectedRemoteSkill
	};
	const name = copy.name;
	const description = copy.desc;
	const iconUrl = resolveDetailIconUrl(selectedSkill, selectedRemoteSkill);
	const marketplaceSource = resolveMarketplaceSource(marketplaceSourceArgs);
	const source = resolveSkillSource(selectedSkill, selectedRemoteSkill);
	const tags = resolveTagsForDisplay(selectedSkill, selectedRemoteSkill);
	const requiresApiKey = resolveRequiresApiKey(selectedSkill, selectedRemoteSkill);
	const version = resolveSkillVersion(selectedSkill, selectedRemoteSkill);
	const installCount = resolveInstallCount(selectedSkill, selectedRemoteSkill);
	const examples = resolveExamplesSkill(selectedSkill, selectedRemoteSkill);
	const overviewI18n = resolveOverviewI18n(selectedSkill, selectedRemoteSkill);
	const invocationEnabled = resolveModelInvocationEnabled(installedSkill);
	const enterpriseInstallSources = {
		installingId: enterpriseInstallingId,
		recentlyInstalledIds: enterpriseRecentlyInstalledIds,
		installedSkills
	};
	let enterpriseBtnState = null;
	if (isEnterpriseSkill && selectedRemoteSkill) enterpriseBtnState = enterpriseService.computeInstallState(selectedRemoteSkill, enterpriseInstallSources);
	const hubInstallSources = {
		installingSlug: skillhubInstallingSlug,
		installedSkills,
		localVersionMap: skillhubLocalVersionMap,
		remoteVersionMap: skillhubRemoteVersionMap,
		recentlyInstalledSlugs: skillhubRecentlyInstalledSlugs
	};
	const knotInstallSources = {
		installingSlug: knotInstallingSlug,
		installedSkills,
		localVersionMap: knotLocalVersionMap,
		remoteVersionMap: knotRemoteVersionMap,
		recentlyInstalledSlugs: knotRecentlyInstalledSlugs
	};
	const builtinInstallSources = {
		installingSkillId: builtinInstallingSkillId,
		localVersionMap: builtinLocalVersionMap,
		remoteVersionMap: builtinRemoteVersionMap,
		installedSkills,
		recentlyInstalledIds: builtinRecentlyInstalledIds
	};
	const computeHub = () => skillhubService.computeInstallState(selectedRemoteSkill, hubInstallSources);
	const computeKnot = () => knotService.computeInstallState(selectedRemoteSkill, knotInstallSources);
	const computeBuiltin = () => marketBuiltinService.computeInstallState(selectedRemoteSkill, builtinInstallSources);
	const installState = resolveHubBtnState(selectedRemoteSkill, classified, enterpriseBtnState, computeHub, computeKnot, computeBuiltin);
	const matchKeys = buildSkillMatchKeys({
		selectedSkill,
		selectedRemoteSkill
	});
	return {
		skillKey,
		name,
		description,
		iconUrl,
		source,
		marketplaceSource,
		tags,
		requiresApiKey,
		version,
		installCount,
		isInstalled,
		installedLoaded,
		isInstalling,
		invocationEnabled,
		examples,
		markdown,
		overviewI18n,
		contentLoading,
		installState,
		installedSkill,
		caseSkillIds: matchKeys.skillIds,
		caseSlugs: matchKeys.slugs
	};
}
var init_use_skill_detail = __esmMin((() => {
	init_market_service_context();
	init_installed_identity();
	init_skill_detail();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/icons/index.tsx
/**
* 标题栏更多（实心三点）。
*/
function MoreIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "3",
				cy: "8",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "13",
				cy: "8",
				r: "1",
				fill: "currentColor"
			})
		]
	});
}
/**
* 卡片 ⋯ 菜单按钮（描边三点）。
*/
function CardMoreIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			})
		]
	});
}
/**
* 列表安装按钮「+」。
*/
function PlusIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
			x1: "12",
			y1: "5",
			x2: "12",
			y2: "19"
		}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
			x1: "5",
			y1: "12",
			x2: "19",
			y2: "12"
		})]
	});
}
/**
* 菜单「启用/禁用」图标。
*/
function DisableIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "13",
		height: "13",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			})
		]
	});
}
/**
* 设置齿轮图标。
*/
function SettingsIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.620726 1.17059)",
			d: "M11.9486 3.8169Q12.3929 4.5866 12.5269 4.8822Q12.7585 5.3937 12.7585 5.8294Q12.7585 6.2651 12.5269 6.7766Q12.3929 7.0722 11.9486 7.8419L10.9068 9.6463Q10.4624 10.416 10.2734 10.6798Q9.9463 11.1361 9.5689 11.354Q9.1915 11.5719 8.6328 11.627Q8.3098 11.6588 7.421 11.6588L5.3375 11.6588Q4.4488 11.6588 4.1258 11.627Q3.567 11.5719 3.1896 11.354Q2.8123 11.1361 2.4852 10.6798Q2.2961 10.416 1.8517 9.6463L0.81 7.8419Q0.3656 7.0723 0.2317 6.7766Q0 6.2651 0 5.8294Q0 5.3937 0.2317 4.8822Q0.3656 4.5866 0.81 3.8169L1.8517 2.0125Q2.2961 1.2428 2.4852 0.979Q2.8123 0.5227 3.1896 0.3048Q3.567 0.0869 4.1258 0.0318Q4.4488 0 5.3375 0L7.4211 0Q8.3098 0 8.6328 0.0318Q9.1915 0.0869 9.5689 0.3048Q9.9463 0.5227 10.2734 0.979Q10.2968 1.0117 10.324 1.052L7.7058 1.052Q7.5699 1.05 7.4211 1.05L5.3375 1.05Q3.9989 1.05 3.7146 1.2141Q3.4304 1.3782 2.7611 2.5375L1.7193 4.3419Q1.05 5.5012 1.05 5.8294Q1.05 6.1576 1.7193 7.3169L2.7611 9.1213Q3.4304 10.2806 3.7146 10.4447Q3.9989 10.6088 5.3375 10.6088L7.421 10.6088Q8.7596 10.6088 9.0439 10.4447Q9.3282 10.2806 9.9975 9.1213L11.0392 7.3169Q11.7085 6.1576 11.7085 5.8294Q11.7085 5.5012 11.0392 4.3419L9.9975 2.5375Q9.8596 2.2986 9.738 2.102L10.9585 2.102L11.9486 3.8169ZM6.3798 3.2044Q7.4671 3.2044 8.2359 3.9733Q9.0048 4.7421 9.0048 5.8294Q9.0048 6.9167 8.2359 7.6856Q7.4671 8.4544 6.3798 8.4544Q5.2925 8.4544 4.5236 7.6856Q3.7548 6.9167 3.7548 5.8294Q3.7548 4.7421 4.5236 3.9733Q5.2925 3.2044 6.3798 3.2044ZM6.3798 4.2544Q5.7274 4.2544 5.2661 4.7157Q4.8048 5.177 4.8048 5.8294Q4.8048 6.4818 5.2661 6.9431Q5.7274 7.4044 6.3798 7.4044Q7.0321 7.4044 7.4935 6.9431Q7.9548 6.4818 7.9548 5.8294Q7.9548 5.177 7.4935 4.7157Q7.0321 4.2544 6.3798 4.2544Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 下载箭头图标。
*/
function DownloadIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			d: "M8 2v8m0 0l-3-3m3 3l3-3M3 12h10",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
/**
* 星标评分图标。
*/
function StarIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			d: "M8 1.5l1.854 3.756 4.146.603-3 2.924.708 4.13L8 10.904l-3.708 1.951.708-4.072-3-2.924 4.146-.603L8 1.5z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
/**
* 风险警告图标（盾牌 + 感叹号）。
*/
function RiskWarningIcon(props) {
	const { className } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		className,
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				d: "M8 1.5L2.5 3.8v3.8c0 3 1.8 5.4 4.4 6.3l1.1.4 1.1-.4c2.6-.9 4.4-3.3 4.4-6.3V3.8L8 1.5Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				d: "M8 5v3.5",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "8",
				cy: "11",
				r: "0.75",
				fill: "currentColor"
			})
		]
	});
}
/**
* 编辑铅笔图标。
*/
function EditIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.999868 1.49989)",
			d: "M0.3011 12.4122Q0.6022 12.7102 1.0178 12.6286L1.9012 12.4553Q4.4733 11.9508 6.3267 10.0973L11.9021 4.5219Q12.678 3.7461 12.678 2.6489Q12.678 1.5517 11.9021 0.7758Q11.1263 0 10.0291 0Q8.9319 0 8.1561 0.7758L2.6125 6.3194Q0.7248 8.2071 0.2379 10.8318L0.0773 11.6977Q0 12.1142 0.3011 12.4122ZM11.0536 3.6734L10.7156 4.0114L8.6671 1.9618L9.0046 1.6244Q9.429 1.2 10.0291 1.2Q10.6292 1.2 11.0536 1.6244Q11.478 2.0487 11.478 2.6489Q11.478 3.249 11.0536 3.6734ZM1.3645 11.3378L1.6702 11.2778Q3.8834 10.8436 5.4782 9.2488L9.8671 4.86L7.8186 2.8103L3.461 7.1679Q1.8368 8.7922 1.4178 11.0507L1.3645 11.3378ZM6.0001 11.3L13.0001 11.3L13.0001 12.5L6.0001 12.5L6.0001 11.3Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 卸载/删除垃圾桶图标。
*/
function TrashIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M9.5375 2.1L12.25 2.1L12.25 3.15L8.75 3.15L8.75 3.15L2.275 3.15L2.275 7Q2.275 8.7468 2.417 9.152Q2.8208 10.3042 3.973 10.708Q4.3782 10.85 6.125 10.85Q7.8718 10.85 8.277 10.708Q9.4292 10.3042 9.833 9.152Q9.975 8.7468 9.975 7L9.975 4.2L11.025 4.2L11.025 7Q11.025 8.9254 10.8239 9.4993Q10.2531 11.1281 8.6243 11.6989Q8.0504 11.9 6.125 11.9Q4.1996 11.9 3.6257 11.6989Q1.9969 11.1281 1.4261 9.4993Q1.225 8.9254 1.225 7L1.225 3.15L0 3.15L0 2.1L2.7125 2.1L2.7798 1.9384Q3.0762 1.227 3.2128 0.9788Q3.4591 0.5314 3.7932 0.3086Q4.1274 0.0858 4.6351 0.0306Q4.9168 -0 5.6875 0L6.5625 0Q7.3332 -0 7.6149 0.0306Q8.1226 0.0858 8.4568 0.3086Q8.7909 0.5314 9.0371 0.9788Q9.1738 1.2271 9.4702 1.9384L9.5375 2.1ZM3.8522 2.1Q4.202 1.298 4.3757 1.1823Q4.5741 1.05 5.6875 1.05L6.5625 1.05Q7.6759 1.05 7.8743 1.1823Q8.048 1.298 8.3978 2.1L3.8522 2.1ZM6.65 4.375L5.6 4.375L5.6 9.625L6.65 9.625L6.65 4.375Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 关闭（圆 + X）图标。
*/
function CloseCircleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M12.25 6.125Q12.25 3.5879 10.456 1.794Q8.6621 0 6.125 0Q3.5879 0 1.794 1.794Q0 3.5879 0 6.125Q0 8.6621 1.794 10.456Q3.5879 12.25 6.125 12.25Q7.1814 12.25 8.1768 11.8961Q9.1722 11.5422 9.9915 10.8753L9.2474 10.1312Q7.9076 11.2 6.125 11.2Q4.0229 11.2 2.5364 9.7136Q1.05 8.2271 1.05 6.125Q1.05 4.0229 2.5364 2.5364Q4.0229 1.05 6.125 1.05Q8.2271 1.05 9.7136 2.5364Q11.2 4.0229 11.2 6.125Q11.2 7.9205 10.1155 9.2669L10.8595 10.0109Q11.5338 9.1893 11.8919 8.1886Q12.25 7.1879 12.25 6.125ZM8.6837 7.9413L6.8675 6.125L8.6837 4.3087L7.9413 3.5663L6.125 5.3825L4.3087 3.5663L3.5663 4.3087L5.3825 6.125L3.5663 7.9413L4.3087 8.6837L6.125 6.8675L7.9413 8.6837L8.6837 7.9413Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 开启（圆 + 对勾）图标。
*/
function CheckCircleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M0 6.125Q0 8.6621 1.794 10.456Q3.5879 12.25 6.125 12.25Q8.6621 12.25 10.456 10.456Q12.25 8.6621 12.25 6.125Q12.25 3.5879 10.456 1.794Q8.6621 0 6.125 0Q4.5809 0 3.2214 0.732Q1.8618 1.464 1.0118 2.753L1.7646 3.5059Q2.0807 2.9922 2.5364 2.5364Q4.0229 1.05 6.125 1.05Q8.2271 1.05 9.7136 2.5364Q11.2 4.0229 11.2 6.125Q11.2 8.2271 9.7136 9.7136Q8.2271 11.2 6.125 11.2Q4.0229 11.2 2.5364 9.7136Q1.05 8.2271 1.05 6.125Q1.05 5.3791 1.2371 4.7108L0.4207 3.8943Q0.2122 4.4274 0.1061 4.99Q0 5.5525 0 6.125ZM3.8712 5.7538L5.25 7.1325L8.3788 4.0038L9.1212 4.7462L5.6212 8.2462Q5.4701 8.4063 5.25 8.4Q5.0299 8.4063 4.8788 8.2462L3.1288 6.4962L3.8712 5.7538Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 置顶图钉图标。
*/
function PinIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 9.66 -1.44)",
			d: "M8.9091 1.7259C9.0313 2.1014 9.0313 2.5676 9.0313 3.5L9.0313 3.9998C9.0313 4.6592 9.0313 4.9889 9.0829 5.3072C9.1518 5.7316 9.2887 6.1423 9.4883 6.5232C9.638 6.8088 9.8359 7.0725 10.2316 7.6C10.7349 8.271 11.0022 8.6051 11.0295 8.9079C11.0634 9.2833 10.8774 9.6554 10.5568 9.8535C10.3173 10.0015 9.9329 10.001 9.2114 10.0002L9.2087 10.0002L9.208 10.0002C9.1513 10.0001 9.0926 10 9.0317 10L7.3316 10L7.3316 8.8L9.0317 8.8Q9.0949 8.8 9.2128 8.8002Q9.457 8.8005 9.628 8.7982Q9.5272 8.66 9.3804 8.4649Q9.3093 8.3703 9.2717 8.3201Q8.62 7.4515 8.4255 7.0803Q8.0336 6.3326 7.8984 5.4994Q7.8313 5.0857 7.8313 3.9998L7.8313 3.5Q7.8313 2.2917 7.768 2.0971Q7.5633 1.468 6.9341 1.2633Q6.7396 1.2 5.5313 1.2Q4.323 1.2 4.1284 1.2633Q3.4992 1.468 3.2946 2.0971Q3.2313 2.2917 3.2313 3.5L3.2313 4.0002Q3.2313 5.0862 3.1641 5.4999Q3.029 6.3325 2.6376 7.0797Q2.4431 7.451 1.7916 8.3199Q1.754 8.37 1.6829 8.4647Q1.5361 8.6599 1.4352 8.7982Q1.6064 8.8005 1.8507 8.8002Q1.9695 8.8 2.0318 8.8L6.1316 8.8L6.1316 10L6.1313 10L6.1317 17L4.9317 17.0001L4.9313 10L2.0318 10C1.9696 10 1.9098 10.0001 1.8521 10.0002C1.1304 10.001 0.7459 10.0015 0.5064 9.8534C0.1859 9.6553 0 9.2835 0.0338 8.9083C0.061 8.6054 0.3283 8.2712 0.8316 7.6C1.2272 7.0723 1.425 6.8085 1.5746 6.5229C1.774 6.1422 1.9108 5.7319 1.9796 5.3077C2.0313 4.9894 2.0313 4.6597 2.0313 4.0002L2.0313 3.5C2.0313 2.5676 2.0313 2.1014 2.1534 1.7259C2.4 0.9678 2.9991 0.3688 3.7572 0.1222C4.1327 0 4.5989 0 5.5313 0C6.4637 0 6.9299 0 7.3054 0.1222C8.0634 0.3688 8.6625 0.9678 8.9091 1.7259Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 取消置顶图钉图标（带斜杠）。
*/
function UnpinIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.12634 1.03179)",
			d: "M13.7979 12.044L12.9494 12.8925L0.9494 0.8925L1.7979 0.044L5.0142 3.2603C5.021 3.2582 5.0279 3.2561 5.0347 3.2539C5.4448 3.1258 5.8317 2.9323 6.1803 2.681C6.4419 2.4925 6.675 2.2593 7.1414 1.793L7.4951 1.4393C8.1544 0.78 8.484 0.4504 8.8359 0.2712C9.5463 -0.0904 10.3935 -0.0904 11.1039 0.2712C11.4558 0.4504 11.7855 0.78 12.4448 1.4393C13.1041 2.0986 13.4338 2.4283 13.6129 2.7802C13.9745 3.4906 13.9745 4.3378 13.6129 5.0483C13.4338 5.4001 13.1041 5.7298 12.4448 6.3891L12.0914 6.7425C11.6251 7.2088 11.392 7.4419 11.2035 7.7035C10.952 8.0523 10.7585 8.4395 10.6302 8.85C10.6282 8.8567 10.6261 8.8634 10.6241 8.8701L13.7979 12.044ZM6.8819 3.6545C6.5867 3.8673 6.2746 4.0464 5.9456 4.1917L9.6926 7.9386C9.8379 7.6095 10.0171 7.2972 10.2299 7.0019C10.3933 6.7752 10.7309 6.4059 11.2428 5.8941L11.5963 5.5405Q12.4506 4.6862 12.5435 4.5039L12.5435 4.5039C12.7436 4.1108 12.7436 3.7177 12.5435 3.3246C12.4816 3.203 12.1659 2.8575 11.5963 2.2879C11.0267 1.7183 10.6811 1.4025 10.5595 1.3406C10.1665 1.1405 9.7734 1.1405 9.3803 1.3407C9.2588 1.4025 8.9132 1.7182 8.3437 2.2878L7.9899 2.6415C7.478 3.1535 7.1087 3.4911 6.8819 3.6545ZM2.3466 3.7896L6.6451 8.0881L5.7982 8.9349L5.798 8.9347L0.8486 13.8847L0 13.0363L4.9495 8.0862L2.8992 6.0359C2.8553 5.992 2.8129 5.9497 2.772 5.9089C2.2611 5.3993 1.9889 5.1278 1.9243 4.8536C1.8377 4.4869 1.9691 4.0926 2.2584 3.8511C2.2852 3.8288 2.3144 3.8084 2.3466 3.7896ZM7.2125 9.2178L7.4936 8.9366L10.0952 11.5382C10.0764 11.5702 10.0561 11.5993 10.0338 11.626C9.7923 11.9155 9.3977 12.047 9.0309 11.9604C8.7569 11.8957 8.4854 11.6236 7.9759 11.1128L7.974 11.1109L7.9734 11.1104C7.9334 11.0703 7.892 11.0287 7.8489 10.9856L6.6468 9.7835L7.2125 9.2178Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 打开文件夹图标。
*/
function FolderIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			d: "M1.5 4a1 1 0 0 1 1-1h3.086a1 1 0 0 1 .707.293l1.414 1.414A1 1 0 0 0 8.414 5H13.5a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4Z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
/**
* 弹窗关闭图标
*/
function CloseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 10.8698 10.8698",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			d: "M6.3046 5.4349L10.8698 10L10 10.8698L5.4349 6.3046L0.8698 10.8698L0 10L4.5651 5.4349L0 0.8698L0.8698 0L5.4349 4.5651L10 0L10.8698 0.8698L6.3046 5.4349Z"
		})
	});
}
/**
* 「使用技能」对话气泡图标。
*/
function UseSkillIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14.4531 14.6507",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0 0.00116893)",
			d: "M7.2266 0.0001C7.2614 0.0001 7.297 0.0001 7.3333 0.0001C8.0268 -0.0004 8.9863 -0.0011 9.9521 0.17C10.9684 0.3502 12.061 0.7315 12.8926 1.5636C14.2855 2.9577 14.4531 4.8385 14.4531 6.2804C14.4531 7.7222 14.2853 9.6021 12.8926 10.9962C12.094 11.7954 11.0936 12.1824 10.1406 12.3721C9.1916 12.5611 8.2453 12.5626 7.5312 12.5606C7.2983 12.56 6.9785 12.7013 6.5684 13.0948C6.17 13.4771 5.7651 14.0227 5.3662 14.6495L4.3535 14.005C4.7714 13.3484 5.2367 12.709 5.7373 12.2286C6.2261 11.7597 6.8348 11.3587 7.5342 11.3604C8.2533 11.3624 9.0891 11.3581 9.9062 11.1954C10.7192 11.0335 11.4695 10.7233 12.0439 10.1485C13.073 9.1185 13.2539 7.6783 13.2539 6.2804C13.2539 4.8825 13.0729 3.4423 12.0439 2.4122C11.4564 1.8243 10.6378 1.5103 9.7432 1.3517C8.8809 1.1988 8.0118 1.1991 7.3052 1.1993L7.2266 1.1993L7.1478 1.1993C6.4412 1.1991 5.5722 1.1988 4.71 1.3517C3.8153 1.5103 2.9967 1.8242 2.4092 2.4122C1.3801 3.4423 1.1992 4.8825 1.1992 6.2804C1.1993 7.6782 1.3802 9.1185 2.4092 10.1485C3.0494 10.7892 3.9083 11.1001 4.8252 11.2442L4.7324 11.837L4.6387 12.4298C3.5897 12.2648 2.45 11.8863 1.5605 10.9962C0.1678 9.6021 0 7.7222 0 6.2804C0 4.8385 0.1676 2.9577 1.5605 1.5636C2.392 0.7316 3.4838 0.3502 4.5 0.17C5.4656 -0.0012 6.4253 -0.0005 7.1189 0.0001C7.1555 0.0001 7.1914 0.0001 7.2266 0.0001ZM10.5038 7.978L8.4321 7.1484Q8.3898 7.1315 8.3087 7.0998Q8.0047 6.981 7.8793 6.9046Q7.4651 6.6523 7.4653 6.2195Q7.4655 5.7867 7.8799 5.5347Q8.0053 5.4584 8.3094 5.3399Q8.3906 5.3083 8.4328 5.2914L10.5042 4.4638L10.9494 5.5782L9.3423 6.2203L10.9499 6.864L10.5038 7.978ZM5.2028 7.7196L5.2028 4.7196L4.0028 4.7196L4.0028 7.7196L5.2028 7.7196Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 排序双箭头图标（SkillHub 排序下拉）。
*/
function SortIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "m3 16 4 4 4-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M7 20V4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "m21 8-4-4-4 4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M17 4v16" })
		]
	});
}
/**
* 下拉箭头图标。
*/
function ChevronDownIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "m6 9 6 6 6-6" })
	});
}
/**
* 外链图标（SkillHub / Knot 市场链接）。
*/
function ExternalLinkIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "11",
		height: "11",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("polyline", { points: "15 3 21 3 21 9" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
				x1: "10",
				y1: "14",
				x2: "21",
				y2: "3"
			})
		]
	});
}
/**
* 分类 chip 更多菜单（水平三点）。与标题栏 MoreIcon 尺寸/间距不同，单独保留。
*/
function CategoryMoreIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "4",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "12",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			})
		]
	});
}
/**
* 添加市场源加号图标。
*/
function AddIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			d: "M8 3V13M3 8H13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
}
/**
* 示例区块灯泡图标
*/
function LightbulbIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0 0.0756561)",
			d: "M2.4242 0L3.8384 1.4142L2.9899 2.2628L1.5757 0.8485L2.4242 0ZM12.1616 1.4142L13.5758 0L14.4243 0.8485L13.0101 2.2628L12.1616 1.4142ZM5.6999 9.908Q4.6319 9.2912 4.0164 8.2241Q3.4 7.157 3.4 5.9243Q3.4 4.0193 4.7471 2.6718Q6.0947 1.3243 8 1.3243Q9.9053 1.3243 11.2528 2.6717Q12.6 4.0193 12.6 5.9243Q12.6 7.157 11.9834 8.2245Q11.4572 9.1367 10.6 9.7199L10.6 10.6436Q10.6 10.6799 10.6001 10.7503Q10.601 11.2423 10.5694 11.4401Q10.4956 11.9022 10.1769 12.151Q9.8583 12.3998 9.3921 12.3593Q9.1926 12.342 8.7154 12.2218Q8.6477 12.2047 8.6119 12.1958L5.8545 11.5064L6.1455 10.3423L8.903 11.0316Q8.9394 11.0407 9.0085 11.0581Q9.2623 11.1221 9.3936 11.1476Q9.4006 11.0141 9.4001 10.7524Q9.4 10.6809 9.4 10.6436L9.4 9.3885Q9.3986 9.2273 9.4804 9.0885Q9.5597 8.9482 9.6999 8.8689Q10.4894 8.413 10.9443 7.6242Q11.4 6.8353 11.4 5.9243Q11.4 4.5162 10.4044 3.5203Q9.4083 2.5243 8 2.5244Q6.5917 2.5243 5.5957 3.5202Q4.6 4.5162 4.6 5.9243Q4.6 6.8353 5.0559 7.6245Q5.5107 8.413 6.3001 8.8689L5.6999 9.908ZM0 6.3243L2 6.3243L2 7.5244L0 7.5244L0 6.3243ZM14 6.3243L16 6.3243L16 7.5244L14 7.5244L14 6.3243ZM6.1455 12.042L10.1455 13.042L9.8545 14.2061L5.8545 13.2061L6.1455 12.042ZM9.1455 14.5923L6.1455 13.8423L5.8545 15.0064L8.8545 15.7564L9.1455 14.5923Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 使用案例九宫格图标
*/
function GuidelineIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 1.60071 1.60052)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z",
				fillRule: "evenodd"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 8.60071 1.60052)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z",
				fillRule: "evenodd"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 1.60058 8.60058)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z",
				fillRule: "evenodd"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 8.60058 8.60058)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z",
				fillRule: "evenodd"
			})
		]
	});
}
/**
* 概述文档图标
*/
function DocIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.90039 0.900304)",
			d: "M6.0762 0C7.1535 0 7.8413 -0.0088 8.4726 0.2227C8.6425 0.285 8.8081 0.3596 8.9668 0.4463C9.557 0.769 10.0034 1.2927 10.7129 2.1035L11.2959 2.7705C11.5114 3.0168 11.7073 3.2385 11.8398 3.4278C11.9634 3.6043 12.13 3.8839 12.0898 4.2276C12.0632 4.4548 11.967 4.6683 11.8135 4.838C11.5814 5.0944 11.2611 5.1526 11.0469 5.1758C10.8173 5.2007 10.5214 5.1993 10.1943 5.1992C9.6946 5.1993 9.2753 5.2006 8.9365 5.1671C8.5881 5.1325 8.2597 5.057 7.9609 4.8643C7.7102 4.7025 7.4968 4.4891 7.335 4.2383C7.1423 3.9396 7.0667 3.6112 7.0322 3.2627C6.9987 2.9239 7 2.5047 7 2.0049L7 1.209C6.7531 1.2031 6.4529 1.1993 6.0762 1.1992C4.901 1.1993 4.0688 1.201 3.4287 1.2725C2.8006 1.3427 2.4308 1.4742 2.1504 1.6866C1.9753 1.8192 1.8192 1.9753 1.6865 2.1505C1.4741 2.4309 1.3426 2.8007 1.2725 3.4288C1.201 4.0688 1.1992 4.901 1.1992 6.0762L1.1992 8.1153C1.1992 9.2941 1.2006 10.1285 1.2725 10.7706C1.3431 11.4006 1.4757 11.7718 1.6895 12.0528C1.8204 12.2249 1.9743 12.3788 2.1465 12.5098C2.4275 12.7236 2.7987 12.8562 3.4287 12.9268C4.0708 12.9987 4.9051 13 6.084 13C7.2629 13 8.0972 12.9987 8.7392 12.9268C9.3694 12.8562 9.7405 12.7236 10.0215 12.5098C10.1936 12.3788 10.3475 12.2249 10.4785 12.0528C10.6922 11.7718 10.8249 11.4006 10.8955 10.7706C10.9674 10.1285 10.9678 9.2941 10.9678 8.1153L10.9678 6.0996L12.168 6.0996L12.168 8.1153C12.168 9.2665 12.169 10.18 12.0879 10.9043C12.0054 11.6406 11.8321 12.2554 11.4336 12.7793C11.2371 13.0376 11.0063 13.2684 10.748 13.4649C10.2241 13.8635 9.6094 14.0367 8.873 14.1192C8.1486 14.2003 7.2353 14.1993 6.084 14.1993C4.9327 14.1993 4.0193 14.2003 3.2949 14.1192C2.5586 14.0367 1.9439 13.8635 1.4199 13.4649C1.1617 13.2684 0.9309 13.0376 0.7344 12.7793C0.3358 12.2554 0.1626 11.6406 0.0801 10.9043C-0.0011 10.18 0 9.2665 0 8.1153L0 6.0762C0 4.9288 -0.0015 4.0181 0.0791 3.2959C0.1611 2.562 0.3334 1.9488 0.7295 1.4258C0.9285 1.1631 1.1631 0.9286 1.4258 0.7296C1.9488 0.3335 2.5619 0.1611 3.2959 0.0791C4.018 -0.0015 4.9287 0 6.0762 0ZM8.5996 10.6993L3.5996 10.6993L3.5996 9.5L8.5996 9.5L8.5996 10.6993ZM8.5996 7.6992L3.5996 7.6992L3.5996 6.5L8.5996 6.5L8.5996 7.6992ZM8.1992 2.0049C8.1992 2.5289 8.2002 2.8786 8.2266 3.1446C8.2519 3.401 8.2969 3.5154 8.3437 3.588C8.413 3.6951 8.5042 3.7863 8.6113 3.8555C8.6839 3.9023 8.7982 3.9473 9.0547 3.9727C9.3207 3.999 9.6703 4 10.1943 4C10.4404 4 10.62 3.9959 10.7568 3.9903C10.6709 3.8836 10.5556 3.7458 10.3935 3.5606L9.8096 2.8936C9.0424 2.0168 8.7501 1.6966 8.3906 1.5C8.3281 1.4659 8.2644 1.4339 8.1992 1.4053L8.1992 2.0049Z"
		})
	});
}
/**
* 安装动作按钮图标
*/
function InstallActionIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(0 -1 1 0 1.54648 14.2855)",
			d: "M3.292 13.1187Q4.013 13.2 6.1 13.2L6.1 12Q4.0804 12 3.4264 11.9263Q2.5612 11.8288 2.1391 11.5043Q1.8884 11.3116 1.6957 11.0609Q1.3713 10.6388 1.2737 9.7736Q1.2 9.1196 1.2 7.1L1.2 6.1Q1.2 4.0804 1.2737 3.4264Q1.3713 2.5612 1.6957 2.1391Q1.8884 1.8884 2.1391 1.6957Q2.5612 1.3713 3.4264 1.2737Q4.0804 1.2 6.1 1.2L6.1 0Q4.013 0 3.292 0.0813Q2.0948 0.2162 1.4078 0.7442Q1.0326 1.0326 0.7442 1.4078Q0.2162 2.0948 0.0813 3.292Q0 4.013 0 6.1L0 7.1Q0 9.187 0.0813 9.908Q0.2162 11.1052 0.7442 11.7922Q1.0326 12.1674 1.4078 12.4558Q2.0948 12.9838 3.292 13.1187ZM6.5715 7.2L9.0472 9.6758L8.1987 10.5243L5.4058 7.7314L5.3961 7.7217Q5.0819 7.4076 4.9754 7.2673Q4.73 6.9444 4.73 6.6Q4.73 6.2556 4.9754 5.9327Q5.0819 5.7925 5.3961 5.4783L5.4058 5.4686L8.1987 2.6758L9.0472 3.5243L6.5715 6L13.1357 6L13.1357 7.2L6.5715 7.2Z",
			fillRule: "evenodd"
		})
	});
}
/**
* 基本信息小节图标
*/
function BasicInfoIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.15001 1.14999)",
			d: "M3.1581 0.5419Q2.6163 0 1.85 0Q1.0837 0 0.5419 0.5419Q0 1.0837 0 1.85Q0 2.6163 0.5419 3.1581Q1.0837 3.7 1.85 3.7Q2.6163 3.7 3.1581 3.1581Q3.7 2.6163 3.7 1.85Q3.7 1.0837 3.1581 0.5419ZM1.3904 1.3904Q1.5808 1.2 1.85 1.2Q2.1192 1.2 2.3096 1.3904Q2.5 1.5808 2.5 1.85Q2.5 2.1192 2.3096 2.3096Q2.1192 2.5 1.85 2.5Q1.5808 2.5 1.3904 2.3096Q1.2 2.1192 1.2 1.85Q1.2 1.5808 1.3904 1.3904ZM5.35 1.2485L13.85 1.2485L13.85 2.4485L5.35 2.4485L5.35 1.2485ZM1.85 5Q2.6163 5 3.1581 5.5419Q3.7 6.0837 3.7 6.85Q3.7 7.6163 3.1581 8.1581Q2.6163 8.7 1.85 8.7Q1.0837 8.7 0.5419 8.1581Q0 7.6163 0 6.85Q0 6.0837 0.5419 5.5419Q1.0837 5 1.85 5ZM1.85 6.2Q1.5808 6.2 1.3904 6.3904Q1.2 6.5808 1.2 6.85Q1.2 7.1192 1.3904 7.3096Q1.5808 7.5 1.85 7.5Q2.1192 7.5 2.3096 7.3096Q2.5 7.1192 2.5 6.85Q2.5 6.5808 2.3096 6.3904Q2.1192 6.2 1.85 6.2ZM13.85 6.2485L5.35 6.2485L5.35 7.4485L13.85 7.4485L13.85 6.2485ZM3.1581 10.5419Q2.6163 10 1.85 10Q1.0837 10 0.5419 10.5419Q0 11.0837 0 11.85Q0 12.6163 0.5419 13.1581Q1.0837 13.7 1.85 13.7Q2.6163 13.7 3.1581 13.1581Q3.7 12.6163 3.7 11.85Q3.7 11.0837 3.1581 10.5419ZM1.3904 11.3904Q1.5808 11.2 1.85 11.2Q2.1192 11.2 2.3096 11.3904Q2.5 11.5808 2.5 11.85Q2.5 12.1192 2.3096 12.3096Q2.1192 12.5 1.85 12.5Q1.5808 12.5 1.3904 12.3096Q1.2 12.1192 1.2 11.85Q1.2 11.5808 1.3904 11.3904ZM5.35 11.2485L8.85 11.2485L8.85 12.4485L5.35 12.4485L5.35 11.2485Z",
			fillRule: "evenodd"
		})
	});
}
var import_jsx_runtime$17;
var init_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$17 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/basic-info.tsx
/**
* 基本信息：版本 / 使用人数（仅展示有值字段）
*/
function BasicInfo(props) {
	const { skillInfo } = props;
	const { version, installCount } = skillInfo;
	const t = useTranslation();
	const hasCount = typeof installCount === "number" && installCount > 0;
	if (!(!!version || hasCount)) return null;
	const countText = hasCount ? formatNumber(installCount) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("section", {
		className: "sm-skill-detail-basic",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "sm-skill-detail-section-header sm-skill-detail-section-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
				className: "sm-skill-detail-section-title-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(BasicInfoIcon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children: t("skills.detail.basicInfo") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "sm-skill-detail-basic-bar",
			children: [version && /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
				className: "sm-skill-detail-basic-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
					className: "sm-skill-detail-basic-label",
					children: t("skills.detail.metricVersion")
				}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("span", {
					className: "sm-skill-detail-basic-value",
					children: ["v", version]
				})]
			}), hasCount && /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
				className: "sm-skill-detail-basic-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
					className: "sm-skill-detail-basic-label",
					children: t("skills.detail.metricInstallCount")
				}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
					className: "sm-skill-detail-basic-value",
					children: countText
				})]
			})]
		})]
	});
}
var import_jsx_runtime$16;
var init_basic_info = __esmMin((() => {
	require_react();
	init_useI18n();
	init_icons();
	init_text();
	import_jsx_runtime$16 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/description.tsx
/**
* 详情描述：默认约两行，超长才出展开 / 收起
*/
function Description(props) {
	const { skillInfo } = props;
	const { skillKey, description: text } = skillInfo;
	const t = useTranslation();
	const [expanded, setExpanded] = (0, import_react$17.useState)(false);
	const [showToggle, setShowToggle] = (0, import_react$17.useState)(false);
	const textRef = (0, import_react$17.useRef)(null);
	(0, import_react$17.useEffect)(() => {
		setExpanded(false);
	}, [skillKey]);
	(0, import_react$17.useEffect)(() => {
		const el = textRef.current;
		if (!el || expanded) return;
		const overflowed = el.scrollHeight > el.clientHeight + 1;
		setShowToggle(overflowed);
	}, [
		text,
		expanded,
		skillKey
	]);
	if (!text) return null;
	const handleToggle = () => {
		setExpanded(!expanded);
	};
	const descClassName = expanded ? "sm-skill-detail-desc" : "sm-skill-detail-desc sm-skill-detail-desc--clamp";
	const toggleClassName = expanded ? "sm-skill-detail-desc-toggle is-expanded" : "sm-skill-detail-desc-toggle";
	const toggleLabel = expanded ? t("skills.detail.desc.collapse") : t("skills.detail.desc.expand");
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
		className: "sm-skill-detail-desc-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", {
			ref: textRef,
			className: descClassName,
			children: text
		}), showToggle && /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("button", {
			type: "button",
			className: toggleClassName,
			onClick: handleToggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { children: toggleLabel }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ChevronDownIcon, {})]
		})]
	});
}
var import_react$17, import_jsx_runtime$15;
var init_description = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_icons();
	import_jsx_runtime$15 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-pending-try-after-install.ts
/**
* Examples「试试这样用」：未装先装，装完自动 try
*/
function usePendingTryAfterInstall(args) {
	const { skillInfo, onInstall, onTry } = args;
	const { isInstalling, installedSkill, name, skillKey } = skillInfo;
	const isInstalled = !!installedSkill;
	const [pendingTryPrompt, setPendingTryPrompt] = (0, import_react$16.useState)(null);
	const wasInstallingRef = (0, import_react$16.useRef)(false);
	const pendingSkillKeyRef = (0, import_react$16.useRef)(null);
	const handlePromptClick = (0, import_react$16.useCallback)((prompt) => {
		if (isInstalled && installedSkill) {
			const displayText = name || installedSkill.name;
			const stableId = installedSkill.skillId ?? installedSkill.name;
			onTry(installedSkill.name, [prompt], displayText, stableId);
			return;
		}
		pendingSkillKeyRef.current = skillKey;
		setPendingTryPrompt(prompt);
		onInstall();
	}, [
		installedSkill,
		isInstalled,
		name,
		onInstall,
		onTry,
		skillKey
	]);
	(0, import_react$16.useEffect)(() => {
		if (!pendingTryPrompt) {
			wasInstallingRef.current = false;
			pendingSkillKeyRef.current = null;
			return;
		}
		if (pendingSkillKeyRef.current && pendingSkillKeyRef.current !== skillKey) {
			setPendingTryPrompt(null);
			wasInstallingRef.current = false;
			pendingSkillKeyRef.current = null;
			return;
		}
		if (installedSkill) {
			const displayText = name || installedSkill.name;
			const stableId = installedSkill.skillId ?? installedSkill.name;
			onTry(installedSkill.name, [pendingTryPrompt], displayText, stableId);
			setPendingTryPrompt(null);
			wasInstallingRef.current = false;
			pendingSkillKeyRef.current = null;
			return;
		}
		if (wasInstallingRef.current && !isInstalling) {
			setPendingTryPrompt(null);
			wasInstallingRef.current = false;
			pendingSkillKeyRef.current = null;
			return;
		}
		wasInstallingRef.current = isInstalling;
	}, [
		installedSkill,
		isInstalling,
		name,
		onTry,
		pendingTryPrompt,
		skillKey
	]);
	return {
		pendingTryPrompt,
		isInstallingForTry: !!pendingTryPrompt && isInstalling,
		handlePromptClick
	};
}
var import_react$16;
var init_use_pending_try_after_install = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/toast.ts
/**
* 安装成功 toast（含「去试试」）。由界面在 Service.install 成功后调用。
* message 须为已翻译文案（调用方用 t('skills.*.installSuccess') 等既有 key）。
*/
function toastSkillInstallSuccess(options) {
	const { message, trySkill, skillName, examples, displayText, skillId } = options;
	toast({
		message,
		type: "success",
		action: {
			label: t("skills.toast.trySkill"),
			onClick: () => trySkill(skillName, examples, displayText, skillId),
			track: {
				elementId: "skill_post_install_try",
				elementName: "安装后去试试",
				props: { source: skillName }
			}
		}
	});
}
/**
* 技能操作失败 toast。传递什么文案就弹什么。
*/
function toastSkillActionError(message) {
	toast({
		message,
		type: "error"
	});
}
var init_toast = __esmMin((() => {
	init_src$1();
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-skill-creator-actions.ts
/**
* 创建 / 查找 / 编辑 / 导入 Skill — 壳层 UI 动作。
* 导航回家并拉起 createSkillMode$ / 打开导入弹窗，不属于已安装列表领域。
*/
function useSkillCreatorActions() {
	const { navigation } = useModuleHost();
	const t = useTranslation();
	const { refresh: refreshUploadPolicy } = useSkillUploadPolicy();
	const uiService = useService(ServiceKey.UIService);
	const createSkill = async () => {
		const policy = await refreshUploadPolicy();
		if (policy && !policy.allowed) {
			toast.error(buildPolicyDeniedMessage(t, policy.reason));
			return;
		}
		navigation.goHome();
		createSkillMode$.next({
			prompt: t("skills.create.examplePrompt"),
			skillName: "skill-creator"
		});
	};
	const findSkill = () => {
		navigation.goHome();
		createSkillMode$.next({ prompt: t("skills.find.examplePrompt") });
	};
	const editSkill = (skill) => {
		if (!skill?.name) return;
		navigation.goHome();
		createSkillMode$.next({
			prompt: t("skills.edit.examplePrompt"),
			skillName: "skill-creator",
			targetSkillName: skill.name
		});
	};
	const importSkill = async () => {
		const policy = await refreshUploadPolicy();
		if (policy && !policy.allowed) {
			toast.error(buildPolicyDeniedMessage(t, policy.reason));
			return;
		}
		uiService.requestOpenImportModal();
	};
	return {
		createSkill,
		findSkill,
		editSkill,
		importSkill
	};
}
var init_use_skill_creator_actions = __esmMin((() => {
	init_src$1();
	init_task_starter_store();
	init_useI18n();
	init_use_skill_upload_policy();
	init_market_service_context();
	init_text();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-skill-detail-actions.ts
/**
* 从 markdown / 各数据源取试用示例
*/
function resolveTryExamples(primary, fallback, markdown) {
	return pickLocalizedExamples(primary) ?? pickLocalizedExamples(fallback) ?? pickLocalizedExamples(extractExamplesFromMarkdown(markdown)) ?? [];
}
/**
* 安装结果 toast；失败返回 false
*/
function notifyInstallResult(args) {
	const { result, failMessage, successMessage, trySkill, skillName, examples, displayText, skillId } = args;
	if (!result.success) {
		toastSkillActionError(result.errorMessage || failMessage);
		return false;
	}
	toastSkillInstallSuccess({
		message: successMessage,
		trySkill,
		skillName,
		examples,
		displayText,
		skillId
	});
	return true;
}
/**
* 用户改过本地 skill 时先确认再更新
*/
function runUpdateIfAllowed(args) {
	const { userModified, setPendingModifiedUpdate, run } = args;
	if (userModified) {
		const confirmRun = () => {
			run();
		};
		setPendingModifiedUpdate(confirmRun);
		return;
	}
	run();
}
/**
* 详情弹窗：安装、更新、试用、开关、编辑、打开文件夹、卸载
*/
function useSkillDetailActions() {
	const t = useTranslation();
	const trySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const detailService = useService(ServiceKey.DetailService);
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const skillhubService = useService(ServiceKey.SkillhubService);
	const knotService = useService(ServiceKey.KnotService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const selectedSkill = detailService.useStore((s) => s.selectedSkill);
	const selectedRemoteSkill = detailService.useStore((s) => s.selectedRemoteSkill);
	const markdown = detailService.useStore((s) => s.markdown);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const classified = classifyRemoteSkill(selectedRemoteSkill);
	const { isEnterpriseSkill, isBuiltinMarketSkill, isKnotSkill } = classified;
	const isRecommendedSkill = selectedSkill?.filePath?.startsWith("marketplace://");
	const recommendedSkillInstalledSkill = isRecommendedSkill && selectedSkill ? installedSkills.find((s) => s.name === selectedSkill.name) : null;
	const isRecommendedSkillInstalled = !!recommendedSkillInstalledSkill;
	const hubSkillInstalledSkill = findHubInstalledSkill({
		selectedRemoteSkill,
		classified,
		installedSkills
	});
	const installedSkill = resolveInstalledSkill({
		selectedSkill,
		isRecommendedSkill,
		isRecommendedSkillInstalled,
		recommendedSkillInstalledSkill,
		isHubSkillInstalled: !!hubSkillInstalledSkill,
		hubSkillInstalledSkill
	});
	const name = resolveDetailCopy({
		selectedSkill,
		selectedRemoteSkill,
		classified
	}).name;
	const handleToggleSkill = async (path, enabled) => {
		const result = await installedSkillsService.toggleSkill(path, enabled, selectedSkill, (skill) => {
			if (skill) detailService.patchSelectedSkill(skill);
		});
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleInstallHubSkill = async (skill) => {
		notifyInstallResult({
			result: await skillhubService.install(skill),
			failMessage: t("skills.skillhub.installFailed.package"),
			successMessage: t("skills.skillhub.installSuccess", { name: skill.name }),
			trySkill,
			skillName: skill.name,
			examples: pickLocalizedExamples(skill)
		});
	};
	const handleUpdateHubSkill = (skill) => {
		const run = async () => {
			try {
				notifyInstallResult({
					result: await skillhubService.update(skill),
					failMessage: t("skills.skillhub.installFailed.package"),
					successMessage: t("skills.skillhub.updateSuccess", { name: skill.name }),
					trySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill)
				});
			} catch {
				toastSkillActionError(t("skills.skillhub.installFailed.package"));
			}
		};
		runUpdateIfAllowed({
			userModified: installedSkillsService.findInstalledMatch({
				slug: skill.slug,
				name: skill.name
			})?.userModified,
			setPendingModifiedUpdate: uiService.setPendingModifiedUpdate.bind(uiService),
			run
		});
	};
	const handleInstallKnotSkill = async (skill) => {
		notifyInstallResult({
			result: await knotService.install(skill),
			failMessage: t("skills.knot.installFailed.package"),
			successMessage: t("skills.knot.installSuccess", { name: skill.name }),
			trySkill,
			skillName: skill.name,
			examples: pickLocalizedExamples(skill)
		});
	};
	const handleUpdateKnotSkill = (skill) => {
		const run = async () => {
			try {
				notifyInstallResult({
					result: await knotService.update(skill),
					failMessage: t("skills.knot.installFailed.package"),
					successMessage: t("skills.knot.updateSuccess", { name: skill.name }),
					trySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill)
				});
			} catch {
				toastSkillActionError(t("skills.knot.installFailed.package"));
			}
		};
		runUpdateIfAllowed({
			userModified: installedSkillsService.findInstalledMatch({
				slug: skill.slug,
				name: skill.name
			})?.userModified,
			setPendingModifiedUpdate: uiService.setPendingModifiedUpdate.bind(uiService),
			run
		});
	};
	const handleInstallBuiltinMarketSkill = async (skill) => {
		const result = await marketBuiltinService.install(skill);
		const displayName = getBuiltinMarketDisplayName(skill);
		notifyInstallResult({
			result,
			failMessage: t("skills.toast.installFailed"),
			successMessage: t("skills.recommend.installSuccess", { name: displayName }),
			trySkill,
			skillName: skill.name,
			examples: pickLocalizedExamples(skill),
			displayText: displayName,
			skillId: getBuiltinMarketSkillId(skill)
		});
	};
	const handleUpdateBuiltinMarketSkill = (skill) => {
		const run = async () => {
			try {
				const result = await marketBuiltinService.update(skill);
				const displayName = getBuiltinMarketDisplayName(skill);
				notifyInstallResult({
					result,
					failMessage: t("skills.toast.installFailed"),
					successMessage: t("skills.recommend.updateSuccess", { name: displayName }),
					trySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill),
					displayText: displayName,
					skillId: getBuiltinMarketSkillId(skill)
				});
			} catch {
				toastSkillActionError(t("skills.toast.installFailed"));
			}
		};
		runUpdateIfAllowed({
			userModified: installedSkillsService.findInstalledMatch({
				skillId: getBuiltinMarketSkillId(skill),
				name: skill.name
			})?.userModified,
			setPendingModifiedUpdate: uiService.setPendingModifiedUpdate.bind(uiService),
			run
		});
	};
	const handleInstallEnterpriseSkill = async (skill) => {
		const displayName = resolveEnterpriseDisplayName(skill);
		notifyInstallResult({
			result: await enterpriseService.install(skill),
			failMessage: t("skills.recommend.installFailed", { name: displayName }),
			successMessage: t("skills.recommend.installSuccess", { name: displayName }),
			trySkill,
			skillName: skill.name,
			displayText: displayName
		});
	};
	const handleUpdateEnterpriseSkill = (skill) => {
		const displayName = getInstalledSkillDisplayName(skill);
		const run = async () => {
			notifyInstallResult({
				result: await enterpriseService.update(skill),
				failMessage: t("skills.recommend.installFailed", { name: displayName }),
				successMessage: t("skills.recommend.updateSuccess", { name: displayName }),
				trySkill,
				skillName: skill.name,
				displayText: displayName,
				skillId: skill.skillId
			});
		};
		runUpdateIfAllowed({
			userModified: skill.userModified,
			setPendingModifiedUpdate: uiService.setPendingModifiedUpdate.bind(uiService),
			run
		});
	};
	const installRemote = () => {
		if (!selectedRemoteSkill) return;
		if (isEnterpriseSkill) {
			handleInstallEnterpriseSkill(selectedRemoteSkill);
			return;
		}
		if (isBuiltinMarketSkill) {
			handleInstallBuiltinMarketSkill(selectedRemoteSkill);
			return;
		}
		if (isKnotSkill) {
			handleInstallKnotSkill(selectedRemoteSkill);
			return;
		}
		handleInstallHubSkill(selectedRemoteSkill);
	};
	const install = () => {
		if (selectedRemoteSkill) {
			installRemote();
			return;
		}
		if (selectedSkill) handleInstallBuiltinMarketSkill(selectedSkill);
	};
	const update = () => {
		if (!selectedRemoteSkill) return;
		if (isEnterpriseSkill) {
			if (hubSkillInstalledSkill) handleUpdateEnterpriseSkill(hubSkillInstalledSkill);
			return;
		}
		if (isBuiltinMarketSkill) {
			handleUpdateBuiltinMarketSkill(selectedRemoteSkill);
			return;
		}
		if (isKnotSkill) {
			handleUpdateKnotSkill(selectedRemoteSkill);
			return;
		}
		handleUpdateHubSkill(selectedRemoteSkill);
	};
	const installForPendingTry = () => {
		if (selectedRemoteSkill) {
			installRemote();
			return;
		}
		if (selectedSkill && isRecommendedSkill) handleInstallBuiltinMarketSkill(selectedSkill);
	};
	const toggle = (checked) => {
		if (!installedSkill) return;
		handleToggleSkill(installedSkill.filePath, checked);
	};
	const tryCurrent = () => {
		if (selectedSkill && isRecommendedSkill) {
			if (!installedSkill) return;
			const tryExamples = resolveTryExamples(selectedSkill, installedSkill, markdown);
			const stableId = installedSkill.skillId ?? installedSkill.name;
			trySkill(installedSkill.name, tryExamples, installedSkill.name, stableId);
			return;
		}
		if (selectedSkill && !isRecommendedSkill) {
			const tryExamples = resolveTryExamples(selectedSkill, null, markdown);
			const stableId = selectedSkill.skillId ?? selectedSkill.name;
			trySkill(selectedSkill.name, tryExamples, selectedSkill.name, stableId);
			return;
		}
		if (!hubSkillInstalledSkill) {
			if (!selectedRemoteSkill) return;
			const remoteSkill = selectedRemoteSkill;
			const remoteName = remoteSkill.name;
			if (!remoteName) return;
			const remoteExamples = resolveTryExamples(selectedRemoteSkill, null, markdown);
			const remoteStableId = isBuiltinMarketSkill ? getBuiltinMarketSkillId(selectedRemoteSkill) : remoteSkill.skillId ?? remoteName;
			trySkill(remoteName, remoteExamples, name || remoteName, remoteStableId || remoteName);
			return;
		}
		const tryExamples = resolveTryExamples(selectedRemoteSkill, hubSkillInstalledSkill, markdown);
		let displayText = hubSkillInstalledSkill.name;
		if (isBuiltinMarketSkill || isEnterpriseSkill) displayText = name || hubSkillInstalledSkill.name;
		const stableId = hubSkillInstalledSkill.skillId ?? hubSkillInstalledSkill.name;
		trySkill(hubSkillInstalledSkill.name, tryExamples, displayText, stableId);
	};
	const edit = () => {
		if (!installedSkill) return;
		uiService.backFromDetail();
		editSkill(installedSkill);
	};
	const openFolder = () => {
		if (!installedSkill) return;
		detailService.openFolder(installedSkill);
	};
	const uninstall = () => {
		if (!installedSkill) return;
		const skill = installedSkill;
		const deletedMessage = t("skills.toast.deleted", { name: skill.name });
		const failedMessage = t("skills.toast.deleteFailed");
		const run = async () => {
			try {
				const result = await detailService.deleteInstalled(skill);
				if (!result.success) {
					toastSkillActionError(result.errorMessage || failedMessage);
					return;
				}
				toast({
					message: deletedMessage,
					type: "success"
				});
			} catch {
				toastSkillActionError(failedMessage);
			}
		};
		run();
	};
	return {
		toggle,
		install,
		update,
		tryCurrent,
		installForPendingTry,
		trySkill,
		edit,
		openFolder,
		uninstall
	};
}
var init_use_skill_detail_actions = __esmMin((() => {
	init_common();
	init_src$1();
	init_useI18n();
	init_market_service_context();
	init_enterprise$1();
	init_markdown();
	init_skill_detail();
	init_text();
	init_toast();
	init_use_skill_creator_actions();
	init_use_try_skill();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/examples-section.tsx
/**
* 单条示例卡片
*/
function ExampleCard(props) {
	const { prompt, disabled, onPromptClick } = props;
	const handleClick = () => {
		onPromptClick(prompt);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("button", {
		type: "button",
		className: "sm-skill-detail-examples-card",
		onClick: handleClick,
		disabled,
		title: prompt,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
			className: "sm-skill-detail-examples-text",
			children: prompt
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
			className: "sm-skill-detail-examples-icon",
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(UseSkillIcon, {})
		})]
	});
}
/**
* 试试这样用：预置 prompt 列表；未装先装，装完自动 try
*/
function ExamplesSection(props) {
	const { skillInfo } = props;
	const { examples: examplesSource } = skillInfo;
	const t = useTranslation();
	const { installForPendingTry, trySkill } = useSkillDetailActions();
	const pendingTry = usePendingTryAfterInstall({
		skillInfo,
		onInstall: installForPendingTry,
		onTry: trySkill
	});
	const examples = pickLocalizedExamples(examplesSource);
	const disabled = pendingTry.isInstallingForTry;
	const maxCount = 3;
	if (!examples || examples.length === 0) return null;
	const shown = examples.slice(0, maxCount);
	const sectionClassName = disabled ? "sm-skill-detail-examples sm-skill-detail-examples--disabled" : "sm-skill-detail-examples";
	const titleSuffix = disabled ? ` · ${t("skills.skillhub.installing")}` : "";
	const titleText = `${t("skills.detail.examples.title")}${titleSuffix}`;
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		className: sectionClassName,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "sm-skill-detail-section-header sm-skill-detail-section-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
				className: "sm-skill-detail-section-title-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(LightbulbIcon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: titleText })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "sm-skill-detail-examples-list",
			children: shown.map((prompt, idx) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ExampleCard, {
				prompt,
				disabled,
				onPromptClick: pendingTry.handlePromptClick
			}, idx))
		})]
	});
}
var import_jsx_runtime$14;
var init_examples_section = __esmMin((() => {
	require_react();
	init_useI18n();
	init_use_pending_try_after_install();
	init_use_skill_detail_actions();
	init_icons();
	init_text();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-skill-detail-overview.ts
/**
* 仅调整概述容器 scrollTop，避免 scrollIntoView 带动弹窗
*/
function scrollHitIntoOverview(args) {
	const { container, target } = args;
	const containerRect = container.getBoundingClientRect();
	const targetRect = target.getBoundingClientRect();
	const offsetTop = targetRect.top - containerRect.top + container.scrollTop;
	const viewTop = container.scrollTop;
	const viewBottom = viewTop + container.clientHeight;
	const targetBottom = offsetTop + targetRect.height;
	if (offsetTop < viewTop) {
		container.scrollTo({
			top: offsetTop,
			behavior: "smooth"
		});
		return;
	}
	if (targetBottom > viewBottom) {
		const nextTop = targetBottom - container.clientHeight;
		container.scrollTo({
			top: nextTop,
			behavior: "smooth"
		});
	}
}
/**
* 概述区搜索高亮与正文选择
*/
function useSkillDetailOverview(args) {
	const { overviewI18n, skillDetailMarkdown, skillKey } = args;
	const { locale } = useI18n();
	const contentLocale = toZhEnLocale(locale || getLocale());
	const [overviewLang, setOverviewLang] = (0, import_react$14.useState)(contentLocale);
	const [overviewQuery, setOverviewQuery] = (0, import_react$14.useState)("");
	const [overviewMatches, setOverviewMatches] = (0, import_react$14.useState)(null);
	const overviewRef = (0, import_react$14.useRef)(null);
	(0, import_react$14.useEffect)(() => {
		setOverviewQuery("");
		setOverviewMatches(null);
		setOverviewLang(contentLocale);
	}, [contentLocale, skillKey]);
	const hasOverviewI18n = !!(overviewI18n?.zh || overviewI18n?.en);
	const hasBilingualOverview = !!(overviewI18n?.zh && overviewI18n?.en);
	const preferredOverview = overviewLang === "en" ? overviewI18n?.en : overviewI18n?.zh;
	const localizedMarkdown = hasOverviewI18n ? preferredOverview || overviewI18n?.en || overviewI18n?.zh || skillDetailMarkdown : skillDetailMarkdown;
	const hasOnlyZh = !!(overviewI18n?.zh && !overviewI18n?.en);
	const hasOnlyEn = !!(overviewI18n?.en && !overviewI18n?.zh);
	let originalLang = contentLocale;
	if (hasOnlyZh) originalLang = "zh";
	else if (hasOnlyEn) originalLang = "en";
	(0, import_react$14.useEffect)(() => {
		const container = overviewRef.current;
		if (!container) return;
		container.querySelectorAll("mark[data-overview-hit]").forEach((mark) => {
			const parent = mark.parentNode;
			if (!parent) return;
			parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
			parent.normalize();
		});
		const q = overviewQuery.trim();
		if (!q) {
			setOverviewMatches(null);
			return;
		}
		const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, { acceptNode: (node) => {
			const p = node.parentElement;
			if (!p) return NodeFilter.FILTER_REJECT;
			const tag = p.tagName;
			if (tag === "CODE" || tag === "PRE" || tag === "SCRIPT" || tag === "STYLE" || tag === "MARK") return NodeFilter.FILTER_REJECT;
			return NodeFilter.FILTER_ACCEPT;
		} });
		const textNodes = [];
		let node = walker.nextNode();
		while (node) {
			textNodes.push(node);
			node = walker.nextNode();
		}
		let total = 0;
		const qLower = q.toLowerCase();
		for (const textNode of textNodes) {
			const text = textNode.nodeValue;
			const lower = text.toLowerCase();
			let from = 0;
			const frag = document.createDocumentFragment();
			let matched = false;
			while (from < text.length) {
				const at = lower.indexOf(qLower, from);
				if (at < 0) {
					frag.appendChild(document.createTextNode(text.slice(from)));
					break;
				}
				matched = true;
				if (at > from) frag.appendChild(document.createTextNode(text.slice(from, at)));
				const mark = document.createElement("mark");
				mark.setAttribute("data-overview-hit", String(total));
				mark.textContent = text.slice(at, at + q.length);
				frag.appendChild(mark);
				total += 1;
				from = at + q.length;
			}
			if (matched && textNode.parentNode) textNode.parentNode.replaceChild(frag, textNode);
		}
		setOverviewMatches((prev) => ({
			total,
			current: prev && prev.total === total ? prev.current : 0
		}));
	}, [overviewQuery, localizedMarkdown]);
	(0, import_react$14.useEffect)(() => {
		const container = overviewRef.current;
		if (!container || !overviewMatches || overviewMatches.total === 0) return;
		container.querySelectorAll("mark[data-overview-hit]").forEach((el) => {
			el.classList.remove("is-current");
		});
		const target = container.querySelector(`mark[data-overview-hit="${overviewMatches.current}"]`);
		if (!target) return;
		target.classList.add("is-current");
		scrollHitIntoOverview({
			container,
			target
		});
	}, [overviewMatches]);
	const handleOverviewNext = () => {
		setOverviewMatches((m) => m ? {
			...m,
			current: (m.current + 1) % Math.max(m.total, 1)
		} : m);
	};
	const handleOverviewPrev = () => {
		setOverviewMatches((m) => m ? {
			...m,
			current: (m.current - 1 + Math.max(m.total, 1)) % Math.max(m.total, 1)
		} : m);
	};
	const handleOverviewCloseSearch = () => {
		setOverviewQuery("");
		setOverviewMatches(null);
	};
	return {
		overviewLang,
		setOverviewLang,
		overviewQuery,
		setOverviewQuery,
		overviewMatches,
		localizedMarkdown,
		hasBilingualOverview,
		originalLang,
		overviewRef,
		handleOverviewNext,
		handleOverviewPrev,
		handleOverviewCloseSearch
	};
}
var import_react$14;
var init_use_skill_detail_overview = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/lang-switch.tsx
/**
* 分段控件：中 | EN
*/
function LangSwitch(props) {
	const { current, onChange } = props;
	const t = useTranslation();
	const zhClassName = current === "zh" ? "sm-skill-detail-lang-btn is-active" : "sm-skill-detail-lang-btn";
	const enClassName = current === "en" ? "sm-skill-detail-lang-btn is-active" : "sm-skill-detail-lang-btn";
	const handleSelectZh = () => {
		onChange("zh");
	};
	const handleSelectEn = () => {
		onChange("en");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		className: "sm-skill-detail-lang-switch",
		role: "group",
		"aria-label": "language",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("button", {
			type: "button",
			className: zhClassName,
			onClick: handleSelectZh,
			"aria-pressed": current === "zh",
			children: t("common.lang.zh")
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("button", {
			type: "button",
			className: enClassName,
			onClick: handleSelectEn,
			"aria-pressed": current === "en",
			children: t("common.lang.en")
		})]
	});
}
/**
* 现语言 ≠ 原文语言时的翻译提示
*/
function TranslationNotice(props) {
	const { current, originalLang } = props;
	const t = useTranslation();
	if (current === originalLang) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		className: "sm-skill-detail-translation-notice",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("line", {
					x1: "12",
					y1: "8",
					x2: "12",
					y2: "12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("line", {
					x1: "12",
					y1: "16",
					x2: "12.01",
					y2: "16"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: t(current === "zh" ? "skills.detail.overview.translation.zhFromEn" : "skills.detail.overview.translation.enFromZh") })]
	});
}
var import_jsx_runtime$13;
var init_lang_switch = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/search.tsx
/**
* 概述正文搜索（⌘F / Ctrl+F）
*/
function Search(props) {
	const { matches, onQueryChange, onNext, onPrev, onClose } = props;
	const t = useTranslation();
	const [expanded, setExpanded] = (0, import_react$12.useState)(false);
	const [query, setQuery] = (0, import_react$12.useState)("");
	const inputRef = (0, import_react$12.useRef)(null);
	const handleClose = () => {
		setExpanded(false);
		setQuery("");
		onQueryChange("");
		onClose();
	};
	const handleExpand = () => {
		setExpanded(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};
	const handleQueryChange = (e) => {
		const nextQuery = e.target.value;
		setQuery(nextQuery);
		onQueryChange(nextQuery);
	};
	(0, import_react$12.useEffect)(() => {
		const onKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
				e.preventDefault();
				setExpanded(true);
				setTimeout(() => {
					inputRef.current?.focus();
				}, 0);
			} else if (e.key === "Escape" && expanded) handleClose();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [expanded, handleClose]);
	if (!expanded) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Tooltip, {
		content: t("skills.detail.overview.search.tooltip"),
		placement: "top",
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Button, {
			variant: "ghost",
			size: "medium",
			iconOnly: true,
			className: "sm-skill-detail-overview-search-icon-btn",
			onClick: handleExpand,
			"aria-label": t("skills.detail.overview.search.tooltip"),
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SearchIcon, {
				width: 16,
				height: 16
			})
		})
	});
	const matchTotal = matches?.total ?? 0;
	const matchCurrent = matches?.current ?? 0;
	const showCounter = query.length > 0 && matches !== null;
	const hasMatch = showCounter && matchTotal > 0;
	const counterClassName = hasMatch ? "sm-skill-detail-overview-search-counter" : "sm-skill-detail-overview-search-counter sm-skill-detail-overview-search-counter--empty";
	const counterText = matchTotal === 0 ? "0/0" : `${matchCurrent + 1}/${matchTotal}`;
	const handleInputKeyDown = (e) => {
		if (e.key !== "Enter") return;
		e.preventDefault();
		if (!hasMatch) return;
		if (e.shiftKey) onPrev();
		else onNext();
	};
	const searchSuffix = /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
		showCounter ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
			className: counterClassName,
			children: counterText
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Input.IconButton, {
			"aria-label": t("common.previous"),
			disabled: !hasMatch,
			preventMouseDownDefault: true,
			onClick: onPrev,
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ChevronUpIcon, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Input.IconButton, {
			"aria-label": t("common.next"),
			disabled: !hasMatch,
			preventMouseDownDefault: true,
			onClick: onNext,
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ChevronDownIcon$1, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Input.IconButton, {
			"aria-label": t("common.close"),
			preventMouseDownDefault: true,
			onClick: handleClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(XCloseIcon, {})
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
		className: "sm-skill-detail-overview-search-box",
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Input, {
			ref: inputRef,
			size: "medium",
			className: "sm-skill-detail-overview-search-input",
			value: query,
			prefix: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SearchIcon, {
				width: 16,
				height: 16
			}),
			suffix: searchSuffix,
			placeholder: t("skills.detail.overview.search.placeholder"),
			onChange: handleQueryChange,
			onKeyDown: handleInputKeyDown
		})
	});
}
var import_react$12, import_jsx_runtime$12;
var init_search = __esmMin((() => {
	init_src();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$12 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/overview-section.tsx
/**
* 已装态概述：语言切换 + 搜索 + Markdown
*/
function OverviewSection(props) {
	const { skillInfo } = props;
	const { markdown, overviewI18n, skillKey, contentLoading, isInstalled } = skillInfo;
	const t = useTranslation();
	const { overviewLang, overviewMatches, localizedMarkdown, hasBilingualOverview, originalLang, overviewRef, setOverviewLang, setOverviewQuery, handleOverviewNext, handleOverviewPrev, handleOverviewCloseSearch } = useSkillDetailOverview({
		overviewI18n,
		skillDetailMarkdown: markdown,
		skillKey
	});
	const [previewThumb, setPreviewThumb] = (0, import_react$11.useState)(null);
	const [showBottomFade, setShowBottomFade] = (0, import_react$11.useState)(false);
	const hasOverviewI18n = !!(overviewI18n?.zh || overviewI18n?.en);
	const showOverview = isInstalled && (!!markdown || hasOverviewI18n || contentLoading);
	(0, import_react$11.useEffect)(() => {
		const container = overviewRef.current;
		if (!showOverview || !container) return;
		const updatePreviewScroll = () => {
			const { scrollHeight, clientHeight, scrollTop } = container;
			const overflow = scrollHeight > clientHeight + 1;
			const maxScroll = scrollHeight - clientHeight;
			const atBottom = !overflow || scrollTop >= maxScroll - 1;
			setShowBottomFade(overflow && !atBottom);
			if (!overflow) {
				setPreviewThumb(null);
				return;
			}
			const rawThumb = clientHeight / scrollHeight * clientHeight;
			const height = Math.max(rawThumb, PREVIEW_THUMB_MIN);
			const maxTravel = Math.max(0, clientHeight - height);
			const top = maxScroll > 0 ? scrollTop / maxScroll * maxTravel : 0;
			setPreviewThumb({
				height,
				top
			});
		};
		updatePreviewScroll();
		container.addEventListener("scroll", updatePreviewScroll, { passive: true });
		const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updatePreviewScroll);
		resizeObserver?.observe(container);
		if (container.firstElementChild) resizeObserver?.observe(container.firstElementChild);
		return () => {
			container.removeEventListener("scroll", updatePreviewScroll);
			resizeObserver?.disconnect();
		};
	}, [
		contentLoading,
		localizedMarkdown,
		overviewRef,
		showOverview,
		skillKey
	]);
	const overviewBodyRef = overviewRef;
	const overviewBody = contentLoading ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
		className: "sm-skill-detail-loading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", { className: "sm-skill-detail-skeleton-line sm-skill-detail-skeleton-line--title" }),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", { className: "sm-skill-detail-skeleton-line sm-skill-detail-skeleton-line--full" }),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", { className: "sm-skill-detail-skeleton-line sm-skill-detail-skeleton-line--full" }),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", { className: "sm-skill-detail-skeleton-line" })
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(MarkdownRenderer, { children: localizedMarkdown });
	const previewThumbStyle = previewThumb ? {
		height: previewThumb.height,
		transform: `translateY(${previewThumb.top}px)`
	} : void 0;
	const previewFadeClassName = showBottomFade ? "sm-skill-detail-preview-fade is-visible" : "sm-skill-detail-preview-fade";
	const previewThumbEl = previewThumb ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
		className: "sm-skill-detail-preview-thumb",
		style: previewThumbStyle,
		"aria-hidden": "true"
	}) : null;
	const handleQueryChange = (query) => {
		setOverviewQuery(query);
	};
	const handleLangChange = (lang) => {
		setOverviewLang(lang);
	};
	const langSwitchEl = hasBilingualOverview ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(LangSwitch, {
		current: overviewLang,
		onChange: handleLangChange
	}) : null;
	const translationNoticeEl = hasBilingualOverview ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(TranslationNotice, {
		current: overviewLang,
		originalLang
	}) : null;
	if (!showOverview) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
		className: "sm-skill-detail-overview",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "sm-skill-detail-section-header sm-skill-detail-overview-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "sm-skill-detail-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: "sm-skill-detail-section-title-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DocIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: t("skills.detail.overview.title") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "sm-skill-detail-overview-controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Search, {
						matches: overviewMatches,
						onQueryChange: handleQueryChange,
						onNext: handleOverviewNext,
						onPrev: handleOverviewPrev,
						onClose: handleOverviewCloseSearch
					}), langSwitchEl]
				})]
			}),
			translationNoticeEl,
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "sm-skill-detail-preview-shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "sm-skill-detail-overview-body sm-skill-detail-preview",
						ref: overviewBodyRef,
						children: overviewBody
					}),
					previewThumbEl,
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: previewFadeClassName,
						"aria-hidden": "true"
					})
				]
			})
		]
	});
}
var import_react$11, import_jsx_runtime$11, PREVIEW_THUMB_MIN;
var init_overview_section = __esmMin((() => {
	init_src$1();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_use_skill_detail_overview();
	init_icons();
	init_lang_switch();
	init_search();
	import_jsx_runtime$11 = require_jsx_runtime();
	PREVIEW_THUMB_MIN = 24;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/scroll-body.tsx
/**
* 详情弹窗滚动区：可滚但不画原生滚动条，顶/底 fade 提示
*/
function ScrollBody(props) {
	const { skillKey, children } = props;
	const scrollBodyRef = (0, import_react$10.useRef)(null);
	const [scrollFadeState, setScrollFadeState] = (0, import_react$10.useState)({
		top: false,
		bottom: false
	});
	(0, import_react$10.useEffect)(() => {
		const scrollBody = scrollBodyRef.current;
		if (!scrollBody) return;
		const updateScrollFadeState = () => {
			const maxScrollTop = scrollBody.scrollHeight - scrollBody.clientHeight;
			const nextState = {
				top: scrollBody.scrollTop > 1,
				bottom: maxScrollTop > 1 && scrollBody.scrollTop < maxScrollTop - 1
			};
			setScrollFadeState((prev) => prev.top === nextState.top && prev.bottom === nextState.bottom ? prev : nextState);
		};
		updateScrollFadeState();
		scrollBody.addEventListener("scroll", updateScrollFadeState, { passive: true });
		window.addEventListener("resize", updateScrollFadeState);
		const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateScrollFadeState);
		resizeObserver?.observe(scrollBody);
		Array.from(scrollBody.children).forEach((child) => {
			resizeObserver?.observe(child);
		});
		return () => {
			scrollBody.removeEventListener("scroll", updateScrollFadeState);
			window.removeEventListener("resize", updateScrollFadeState);
			resizeObserver?.disconnect();
		};
	}, [skillKey]);
	const scrollShellClassName = [
		"sm-skill-detail-scroll-shell",
		scrollFadeState.top ? "has-top-fade" : "",
		scrollFadeState.bottom ? "has-bottom-fade" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: scrollShellClassName,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "sm-skill-detail-scroll-fade sm-skill-detail-scroll-fade-top",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "sm-skill-detail-scroll-body",
				ref: scrollBodyRef,
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "sm-skill-detail-scroll-fade sm-skill-detail-scroll-fade-bottom",
				"aria-hidden": "true"
			})
		]
	});
}
var import_react$10, import_jsx_runtime$10;
var init_scroll_body = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$10 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/overflow-menu.tsx
/**
* 已装主按钮右侧 ⋯：编辑、打开文件夹、卸载
*/
function OverflowMenu(props) {
	const { skillInfo } = props;
	const { installedSkill, name, isInstalled } = skillInfo;
	const t = useTranslation();
	const { theme: appTheme } = useTheme();
	const { edit, openFolder, uninstall } = useSkillDetailActions();
	const isDesktop = isWorkBuddyDesktop();
	const [menuOpen, setMenuOpen] = (0, import_react$9.useState)(false);
	const [confirmVisible, setConfirmVisible] = (0, import_react$9.useState)(false);
	const dialogTheme = appTheme === "dark" ? "dark" : "light";
	if (!isInstalled || !installedSkill) return null;
	const trackSource = installedSkill.name || name;
	const canManage = canManageSkillFromDetail(installedSkill, false);
	const items = [];
	if (isDesktop) {
		if (canManage) items.push({
			key: OverflowActions.Edit,
			label: t("skills.card.edit"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(EditIcon, {})
		});
		items.push({
			key: OverflowActions.OpenFolder,
			label: t("skills.openInFolder"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FolderIcon, {}),
			trackId: "skill_action",
			trackName: "打开文件夹",
			trackProps: {
				source: trackSource,
				type: "open_folder"
			}
		});
	}
	if (canManage) items.push({
		key: OverflowActions.Uninstall,
		label: t("skills.card.uninstall"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(TrashIcon, {}),
		trackId: "skill_action",
		trackName: "卸载技能",
		trackProps: {
			source: trackSource,
			type: "uninstall"
		}
	});
	if (items.length === 0) return null;
	const moreBtnClassName = menuOpen ? "sm-skill-detail-more-btn is-open" : "sm-skill-detail-more-btn";
	const handleOpenChange = (open) => {
		setMenuOpen(open);
	};
	const handleSelect = (key) => {
		if (key === OverflowActions.Edit) {
			edit();
			return;
		}
		if (key === OverflowActions.OpenFolder) {
			openFolder();
			return;
		}
		if (key === OverflowActions.Uninstall) setConfirmVisible(true);
	};
	const handleConfirmClose = () => {
		setConfirmVisible(false);
	};
	const handleConfirmUninstall = () => {
		setConfirmVisible(false);
		uninstall();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		className: "sm-skill-detail-more",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Dropdown, {
			placement: "bottom-end",
			offsetDistance: 4,
			items,
			open: menuOpen,
			onOpenChange: handleOpenChange,
			onSelect: handleSelect,
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
				type: "button",
				className: moreBtnClassName,
				"aria-label": "more",
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MoreIcon, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ConfirmDialog, {
			visible: confirmVisible,
			theme: dialogTheme,
			appearance: "workbuddy",
			title: t("skills.delete.title"),
			content: t("skills.delete.content"),
			confirmText: t("skills.uninstall"),
			cancelText: t("common.cancel"),
			onConfirm: handleConfirmUninstall,
			onClose: handleConfirmClose
		})]
	});
}
var import_react$9, import_jsx_runtime$9, OverflowActions;
var init_overflow_menu = __esmMin((() => {
	init_src$1();
	init_src();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_useTheme();
	init_use_skill_detail_actions();
	init_icons();
	init_skill_utils();
	import_jsx_runtime$9 = require_jsx_runtime();
	OverflowActions = {
		Edit: "edit",
		OpenFolder: "open-folder",
		Uninstall: "uninstall"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/action-row.tsx
/**
* 主按钮文案数据源
*/
function resolveHubBtnLabelSource(marketplaceSource) {
	if (marketplaceSource === "knot") return "knot";
	if (marketplaceSource === "marketplace") return "recommend";
	return "skillhub";
}
/**
* 是否展示更新按钮
*/
function resolveShowUpdate(args) {
	const { isInstalled, installState } = args;
	return !!(isInstalled && installState && (installState.status === InstallStatus.Update || installState.status === InstallStatus.Installing));
}
/**
* 主按钮行：安装 / 更新 + 去试试；已装时右侧 ⋯
*/
function ActionRow(props) {
	const { skillInfo } = props;
	const { isInstalled, installedLoaded, installState, marketplaceSource, name, installedSkill } = skillInfo;
	const t = useTranslation();
	const { install, update, tryCurrent } = useSkillDetailActions();
	if (!installedLoaded && installState?.status !== InstallStatus.Installing) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
		className: "sm-skill-detail-action-row",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
			className: "sm-skill-detail-btn-skeleton",
			"aria-hidden": "true"
		})
	});
	const isInstalling = installState?.status === InstallStatus.Installing;
	const treatAsInstalled = isInstalled || installState?.status === InstallStatus.Installed;
	const showUpdate = resolveShowUpdate({
		isInstalled: treatAsInstalled,
		installState
	});
	const showInstall = !treatAsInstalled;
	const showTry = treatAsInstalled;
	const showMore = isInstalled && !!installedSkill;
	if (!showInstall && !showUpdate && !showTry && !showMore) return null;
	const hubBtnLabelSource = resolveHubBtnLabelSource(marketplaceSource);
	const updateLabel = installState ? installStatusLabel(installState.status, t, hubBtnLabelSource) : t("skills.skillhub.update");
	const installLabel = installState ? installStatusLabel(installState.status, t, hubBtnLabelSource) : t("skills.skillhub.install");
	const tryLabel = t("skills.toast.trySkill");
	const tryTrackSource = installedSkill?.name || name;
	const tryTrackProps = JSON.stringify({ source: tryTrackSource });
	const installTrackProps = JSON.stringify({
		source: name,
		type: "install",
		mode: "detail"
	});
	const updateDisabled = !!(installState?.disabled && showUpdate);
	const installDisabled = !!(installState?.disabled && showInstall);
	const updateClassName = isInstalling ? "sm-skill-detail-btn sm-skill-detail-btn--installing" : "sm-skill-detail-btn sm-skill-detail-btn--update";
	const installClassName = isInstalling ? "sm-skill-detail-btn sm-skill-detail-btn--installing" : "sm-skill-detail-btn sm-skill-detail-btn--primary";
	const handleUpdateClick = () => {
		update();
	};
	const handleInstallClick = () => {
		install();
	};
	const handleTryClick = () => {
		tryCurrent();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "sm-skill-detail-action-row",
		children: [
			showUpdate && /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
				type: "button",
				className: updateClassName,
				disabled: updateDisabled,
				onClick: handleUpdateClick,
				"data-track-id": "skill_action",
				"data-track-name": "详情页更新技能",
				"data-track-props": installTrackProps,
				children: [isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(LoadingIcon, {
					size: "md",
					spin: true
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: updateLabel })]
			}),
			showInstall && /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
				type: "button",
				className: installClassName,
				disabled: installDisabled,
				onClick: handleInstallClick,
				"data-track-id": "skill_action",
				"data-track-name": "详情页安装技能",
				"data-track-props": installTrackProps,
				children: [isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(LoadingIcon, {
					size: "md",
					spin: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(InstallActionIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: installLabel })]
			}),
			showTry && /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
				type: "button",
				className: "sm-skill-detail-btn sm-skill-detail-btn--primary",
				onClick: handleTryClick,
				"data-track-id": "skill_post_install_try",
				"data-track-name": "安装后去试试",
				"data-track-props": tryTrackProps,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(UseSkillIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: tryLabel })]
			}),
			showMore && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(OverflowMenu, { skillInfo })
		]
	});
}
var import_jsx_runtime$8;
var init_action_row = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_constants();
	init_use_skill_detail_actions();
	init_icons();
	init_text();
	init_overflow_menu();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/close-button.tsx
/**
* 详情弹窗关闭按钮
*/
function CloseButton(props) {
	const { onClose } = props;
	const handleClose = () => {
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
		type: "button",
		className: "sm-skill-detail-close",
		onClick: handleClose,
		"aria-label": "Close",
		children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(CloseIcon, {})
	});
}
var import_jsx_runtime$7;
var init_close_button = __esmMin((() => {
	require_react();
	init_icons();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/invocation-toggle.tsx
/**
* 已装 skill 的模型调用开关
*/
function InvocationToggle(props) {
	const { checked, skillName, onToggleChange } = props;
	const t = useTranslation();
	const handleToggleChange = (e) => {
		onToggleChange(e.target.checked);
	};
	const tipContent = checked ? t("skills.toggle.tip.disable") : t("skills.toggle.tip.enable");
	const dismissTrackProps = JSON.stringify({ source: skillName });
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
		content: tipContent,
		placement: "bottom-end",
		maxWidth: 240,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Switch, {
			className: "sm-skill-detail-toggle",
			size: "large",
			checked,
			onChange: handleToggleChange,
			...checked && skillName ? {
				"data-track-id": "skill_post_install_dismiss",
				"data-track-name": "安装后关闭",
				"data-track-props": dismissTrackProps
			} : {}
		})
	});
}
var import_jsx_runtime$6;
var init_invocation_toggle = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/skill-detail-header.tsx
/**
* Skill 详情固定 Header：头像 + 标题行（名称 / 开关 / 关闭）+ 主操作行
*/
function SkillDetailHeader(props) {
	const { skillInfo, onClose } = props;
	const { toggle } = useSkillDetailActions();
	const handleToggleChange = (checked) => {
		toggle(checked);
	};
	const toggleSkillName = skillInfo.installedSkill?.name || skillInfo.name;
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "sm-skill-detail-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "sm-skill-detail-icon-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillAvatar, {
				name: skillInfo.name,
				source: skillInfo.source,
				iconUrl: skillInfo.iconUrl,
				marketplaceSource: skillInfo.marketplaceSource,
				size: 68
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "sm-skill-detail-header-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "sm-skill-detail-title-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", { children: skillInfo.name }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "sm-skill-detail-secondary",
					children: [skillInfo.isInstalled && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(InvocationToggle, {
						checked: skillInfo.invocationEnabled,
						skillName: toggleSkillName,
						onToggleChange: handleToggleChange
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CloseButton, { onClose })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ActionRow, { skillInfo })]
		})]
	});
}
var import_jsx_runtime$5;
var init_skill_detail_header = __esmMin((() => {
	require_react();
	init_SkillAvatar();
	init_use_skill_detail_actions();
	init_action_row();
	init_close_button();
	init_invocation_toggle();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/tags.tsx
/**
* API Key chip + 标签行
*/
function Tags(props) {
	const { skillInfo } = props;
	const { requiresApiKey, tags } = skillInfo;
	const t = useTranslation();
	if (!requiresApiKey && tags.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "sm-skill-detail-tags",
		children: [requiresApiKey && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
			className: "sm-skill-detail-chip sm-skill-detail-chip--api-key",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", { d: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" })
			}), t("skills.detail.requiresApiKey")]
		}), tags.map((tag, idx) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "sm-skill-detail-chip",
			children: tag
		}, `${tag}-${idx}`))]
	});
}
var import_jsx_runtime$4;
var init_tags = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-skill-related-cases.ts
function normalizeMatchKey(value) {
	if (typeof value !== "string" || value.trim().length === 0) return;
	return value.trim().toLowerCase();
}
/**
* 判断 case 是否关联当前 skill
*/
function caseMatchesSkill(caseData, skillIds, slugs) {
	if (skillIds.size === 0 && slugs.size === 0 || !Array.isArray(caseData.skills)) return false;
	return caseData.skills.some((item) => {
		const ref = item;
		const skillId = normalizeMatchKey(ref.skill_id);
		const legacyId = normalizeMatchKey(ref.id);
		const slug = normalizeMatchKey(ref.slug);
		const hitSkillId = !!skillId && skillIds.has(skillId);
		const hitLegacyId = !!legacyId && skillIds.has(legacyId);
		const hitSlug = !!slug && slugs.has(slug);
		return hitSkillId || hitLegacyId || hitSlug;
	});
}
/**
* 排序键：精选优先 → featured_order → sort_order → quality_score 降序 → usage_count 降序
*/
function sortRelatedCases(a, b) {
	if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
	const featuredOrderDiff = (a.featured_order ?? Number.MAX_SAFE_INTEGER) - (b.featured_order ?? Number.MAX_SAFE_INTEGER);
	if (featuredOrderDiff !== 0) return featuredOrderDiff;
	const sortOrderDiff = (a.sort_order ?? Number.MAX_SAFE_INTEGER) - (b.sort_order ?? Number.MAX_SAFE_INTEGER);
	if (sortOrderDiff !== 0) return sortOrderDiff;
	const qualityDiff = (b.quality_score ?? 0) - (a.quality_score ?? 0);
	if (qualityDiff !== 0) return qualityDiff;
	return (b.usage_count ?? 0) - (a.usage_count ?? 0);
}
/**
* 按 skillInfo 上的匹配 key 反查关联 Playbook Case（最多 3 张）
*
* Loading 态：registry 到位前 cases=[]，UsedCasesSection 空数组自动整块不渲染
*/
function useSkillRelatedCases(args) {
	const { caseSkillIds, caseSlugs } = args;
	const { account } = useAccount();
	const enterpriseId = account?.enterpriseId ?? "";
	const { allCases, isLoading } = useDiscover(null, void 0, false, void 0, enterpriseId);
	const skillIds = new Set(caseSkillIds);
	const slugs = new Set(caseSlugs);
	return {
		cases: (skillIds.size > 0 || slugs.size > 0 ? allCases.filter((caseData) => caseMatchesSkill(caseData, skillIds, slugs)) : []).sort(sortRelatedCases).slice(0, MAX_RELATED_CASES),
		isLoading
	};
}
var MAX_RELATED_CASES;
var init_use_skill_related_cases = __esmMin((() => {
	init_discover_panel();
	init_account_context();
	MAX_RELATED_CASES = 3;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/used-cases-section.tsx
/**
* 使用案例卡片
*/
function CaseCard(props) {
	const { caseData, position, onClick } = props;
	const [imageBroken, setImageBroken] = (0, import_react$3.useState)(false);
	const locale = toZhEnLocale(getLocale());
	const title = getLocalizedField(caseData.title, caseData.title_en, locale, caseData.id);
	const subtitle = getLocalizedField(caseData.subtitle, caseData.subtitle_en, locale);
	const coverUrl = resolvePlaybookAssetUrl(caseData.cover_image, caseData.id);
	const showCover = !!(coverUrl && !imageBroken);
	const trackProps = JSON.stringify({
		source: caseData.id,
		type: "playbook_case",
		position
	});
	const handleClick = () => {
		onClick(caseData.id, position);
	};
	const handleImageError = () => {
		setImageBroken(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
		type: "button",
		className: "sm-skill-detail-case-card",
		onClick: handleClick,
		"data-track-id": "skill_detail_case_click",
		"data-track-name": "点击使用案例",
		"data-track-props": trackProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: "sm-skill-detail-case-cover",
			children: showCover ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
				src: coverUrl,
				alt: title,
				loading: "lazy",
				onError: handleImageError,
				draggable: false
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "sm-skill-detail-case-cover-placeholder" })
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", {
			className: "sm-skill-detail-case-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "sm-skill-detail-case-title",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "sm-skill-detail-case-subtitle",
				children: subtitle
			})]
		})]
	});
}
/**
* 使用案例：反查 Playbook 后展示 0–3 张卡片
*/
function UsedCasesSection(props) {
	const { skillInfo, onCaseClick } = props;
	const { caseSkillIds, caseSlugs } = skillInfo;
	const t = useTranslation();
	const { cases } = useSkillRelatedCases({
		caseSkillIds,
		caseSlugs
	});
	if (!cases || cases.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "sm-skill-detail-cases",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "sm-skill-detail-section-header sm-skill-detail-section-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "sm-skill-detail-section-title-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(GuidelineIcon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t("skills.detail.usedCases.title") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "sm-skill-detail-case-list",
			children: cases.map((caseData, index) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CaseCard, {
				caseData,
				position: index + 1,
				onClick: onCaseClick
			}, caseData.id))
		})]
	});
}
var import_react$3, import_jsx_runtime$3;
var init_used_cases_section = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_discover_panel();
	init_i18n();
	init_useI18n();
	init_use_skill_related_cases();
	init_icons();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/skill-detail-content.tsx
/**
* Skill 详情弹窗内容：header + 可滚正文
*/
function SkillDetailContent(props) {
	const { onOpenCase, onClose } = props;
	const skillInfo = useSkillDetail();
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "sm-skill-detail-view",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SkillDetailHeader, {
			skillInfo,
			onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(ScrollBody, {
			skillKey: skillInfo.skillKey,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "sm-skill-detail-intro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Description, { skillInfo }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tags, { skillInfo })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ExamplesSection, { skillInfo }),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(UsedCasesSection, {
					skillInfo,
					onCaseClick: onOpenCase
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(BasicInfo, { skillInfo }),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(OverviewSection, { skillInfo })
			]
		})]
	});
}
var import_jsx_runtime$2;
var init_skill_detail_content = __esmMin((() => {
	require_react();
	init_use_skill_detail();
	init_basic_info();
	init_description();
	init_examples_section();
	init_overview_section();
	init_scroll_body();
	init_skill_detail_header();
	init_tags();
	init_used_cases_section();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/skill-detail-modal.tsx
/**
* Skill 详情弹窗外壳：portal、遮罩关闭、skill | case 二级切换
*/
function SkillDetailModal() {
	const uiService = useService(ServiceKey.UIService);
	const { isFavorite, toggleFavorite } = useFavorites();
	const overlayZIndex = useFloatingLayer(true);
	const [view, setView] = (0, import_react$1.useState)(DetailViews.Skill);
	const [activeCaseId, setActiveCaseId] = (0, import_react$1.useState)(null);
	const [activeCasePosition, setActiveCasePosition] = (0, import_react$1.useState)(1);
	const cardRef = (0, import_react$1.useRef)(null);
	const [lockedHeight, setLockedHeight] = (0, import_react$1.useState)(null);
	const handleOpenCase = (caseId, position) => {
		setLockedHeight(cardRef.current?.offsetHeight ?? null);
		setActiveCaseId(caseId);
		setActiveCasePosition(position);
		setView(DetailViews.Case);
	};
	const handleBackToSkill = () => {
		setView(DetailViews.Skill);
		setActiveCaseId(null);
		setActiveCasePosition(1);
		setLockedHeight(null);
	};
	const handleClose = () => {
		setView(DetailViews.Skill);
		setActiveCaseId(null);
		setActiveCasePosition(1);
		setLockedHeight(null);
		uiService.backFromDetail();
	};
	const handleOverlayClick = (e) => {
		e.stopPropagation();
		if (e.target === e.currentTarget) handleClose();
	};
	const handleToggleFavorite = (caseId) => {
		toggleFavorite(caseId);
	};
	const isCaseView = view === DetailViews.Case && !!activeCaseId;
	const cardClassName = isCaseView ? "sm-skill-detail-card is-skill-view is-case-view" : "sm-skill-detail-card is-skill-view";
	const activeCaseFavorite = isCaseView ? isFavorite(activeCaseId) : false;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "sm-skill-detail-overlay",
		style: { zIndex: overlayZIndex },
		onClick: handleOverlayClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			ref: cardRef,
			className: cardClassName,
			style: isCaseView && lockedHeight ? { height: lockedHeight } : void 0,
			role: "dialog",
			"aria-modal": "true",
			children: isCaseView ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CasePreviewPanel, {
				caseId: activeCaseId,
				isFavorite: activeCaseFavorite,
				onBack: handleBackToSkill,
				onClose: handleClose,
				onToggleFavorite: handleToggleFavorite,
				onLaunchSuccess: handleClose,
				position: activeCasePosition
			}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillDetailContent, {
				onOpenCase: handleOpenCase,
				onClose: handleClose
			})
		})
	}), document.body);
}
var import_react$1, import_react_dom, import_jsx_runtime$1, DetailViews;
var init_skill_detail_modal = __esmMin((() => {
	init_style();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_discover_panel();
	init_case_preview_panel();
	init_market_service_context();
	init_skill_detail_content();
	import_jsx_runtime$1 = require_jsx_runtime();
	DetailViews = {
		/**
		* Skill 详情
		*/
		Skill: "skill",
		/**
		* 使用案例二级页
		*/
		Case: "case"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/standalone-skill-detail-modal.tsx
var standalone_skill_detail_modal_exports = /* @__PURE__ */ __exportAll({ StandaloneSkillDetailModal: () => StandaloneSkillDetailModal });
function StandaloneSkillDetailModal({ skill, onClose }) {
	const templateId = useIndustryStore((s) => s.selectedTemplateId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketServiceProvider, {
		templateId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandaloneSkillDetailModalInner, {
			skill,
			onClose
		})
	});
}
function StandaloneSkillDetailModalInner({ skill, onClose }) {
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const { adapter } = useModuleHost();
	const adapterReady = !!adapter;
	const view = uiService.useStore((s) => s.view);
	const openedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!adapterReady) return;
		installedSkillsService.loadSkills(installedSkillsService.useStore.getState().skills.length > 0);
	}, [adapterReady, installedSkillsService]);
	(0, import_react.useEffect)(() => {
		const sub = skillListRefresh$.subscribe(() => {
			installedSkillsService.loadSkills(true);
		});
		return () => {
			sub.unsubscribe();
		};
	}, [installedSkillsService]);
	(0, import_react.useEffect)(() => {
		uiService.openRemoteSkillDetail(skill);
	}, [uiService, skill]);
	(0, import_react.useEffect)(() => {
		if (view === MarketView.SkillDetail) openedRef.current = true;
		else if (openedRef.current) onClose();
	}, [view, onClose]);
	return view === MarketView.SkillDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailModal, {}) : null;
}
var import_react, import_jsx_runtime;
var init_standalone_skill_detail_modal = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_industry_store();
	init_high_risk_notification_store();
	init_market_service_context();
	init_types();
	init_skill_detail_modal();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
export { isWarningDismissed as $, SortIcon as A, init_market_service_context as B, EditIcon as C, SKILLHUB_MARKET_URL as Ct, PlusIcon as D, init_collections_status as Dt, PinIcon as E, CollectionsStatus as Et, init_icons as F, getBuiltinCardDescription as G, useService as H, init_use_skill_detail as I, init_skill_utils as J, getEnterpriseCardDescription as K, init_icon as L, TrashIcon as M, UnpinIcon as N, RiskWarningIcon as O, InstallStatus as Ot, UseSkillIcon as P, init_cache as Q, resolveIconUrl as R, DownloadIcon as S, SKILLHUB_MARKET_LABEL as St, FolderIcon as T, init_constants as Tt, ServiceKey as U, useMarketServices as V, init_bundle as W, resolveCollectionTitle as X, isSkillModelInvocationDisabled as Y, resolveRecommendationReason as Z, CategoryMoreIcon as _, CollectionSubType as _t, init_skill_detail_content as a, formatNumber as at, CloseCircleIcon as b, KNOT_MARKET_LABEL as bt, init_use_skill_detail_actions as c, getInstalledSkillDisplayName as ct, init_toast as d, needsApiKeyFromLabels as dt, setWarningDismissed as et, toastSkillActionError as f, pickI18nText as ft, CardMoreIcon as g, ClientTabId as gt, AddIcon as h, isAllCategory as ht, init_skill_detail_modal as i, coerceSkillText as it, StarIcon as j, SettingsIcon as k, init_install_status as kt, init_use_skill_creator_actions as l, getLocalizedImportSkillError as lt, init_use_pending_try_after_install as m, init_collection as mt, standalone_skill_detail_modal_exports as n, init_enterprise$1 as nt, init_use_skill_related_cases as o, getBuiltinMarketDisplayName as ot, toastSkillInstallSuccess as p, pickLocalizedExamples as pt, getHubLikeCardDescription as q, SkillDetailModal as r, resolveEnterpriseDisplayName as rt, init_use_skill_detail_overview as s, getInstalledSkillDescription as st, init_standalone_skill_detail_modal as t, enrichInstalledSkillsWithEnterpriseIcons as tt, useSkillCreatorActions as u, init_text as ut, CheckCircleIcon as v, MarketView as vt, ExternalLinkIcon as w, SKILLHUB_SORT_OPTIONS as wt, DisableIcon as x, KNOT_MARKET_URL as xt, ChevronDownIcon as y, init_types as yt, MarketServiceProvider as z };
