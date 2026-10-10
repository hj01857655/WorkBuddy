import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { AY as isExpertVisibleForEnterpriseId, BS as DISCOVER_COS_CONFIG, Ci as useLicenseUsable, E as init_contexts, E1 as init_useI18n, H1 as init_cloud_attachment_validation, HS as init_types, J5 as Select, O1 as useTranslation, O7 as Tag, QS as init_scene_icon_map, Qrt as init_common, R3 as useAccount, Si as init_use_license_usable, U1 as isCloudAttachmentBlockAllowed, VS as getDiscoverBaseUrl, WS as waitForDiscoverBaseUrl, ZS as getSceneIcon, aP as init_use_after_first_screen_ready, cP as readFromWbUserStorage, kY as init_visibility, lP as writeToWbUserStorage, m5 as init_src, oP as useAfterFirstScreenReady, sP as init_wb_user_storage, x0 as writeRendererLogFileOnly, zZ as init_http_logger, zit as accountService, znt as CheckIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime, ao as createPhraseBlock, hr as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { dt as ENABLE_ARDOT_DESIGN_FEATURE, n as init_ardot_design_feature, pt as isEnableArdotDesignEnabled } from "./ui-ardot-OEUzH9ni.js";
//#region ../../packages/agent-ui/src/assets/workbuddy-logo-dark.png
var workbuddy_logo_dark_default;
var init_workbuddy_logo_dark = __esmMin((() => {
	workbuddy_logo_dark_default = "" + new URL("workbuddy-logo-dark-A2u-xgBI.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-ardot-design-feature.ts
function readEnabledFromAccount() {
	return accountService.getAccount()?.enableArdotDesign === true;
}
/**
* 无 SSR 场景下的 server snapshot 兜底。恒返回 false,保持"未确认即隐藏"的既有语义。
* 引用固定以避免 useSyncExternalStore 每次读都触发 tearing 检测。
*/
function readEnabledServerSnapshot() {
	return false;
}
/**
* 计算当前 account 的身份键,与 AccountService.hasAccountIdentityChanged 对齐:
* uid + enterpriseId + type 联合判定,任一变化即视为账号切换。
*/
function readIdentityKey() {
	const account = accountService.getAccount();
	if (!account) return "";
	return `${account.uid}|${account.enterpriseId ?? ""}|${account.type ?? ""}`;
}
function useArdotDesignFeature({ accountUid, adapter }) {
	const enabled = (0, import_react$2.useSyncExternalStore)((onStoreChange) => accountService.subscribe(onStoreChange), readEnabledFromAccount, readEnabledServerSnapshot);
	const hasAdapterCapability = !!adapter?.getProductFeatures || !!adapter?.onProductConfigChanged;
	(0, import_react$2.useEffect)(() => {
		if (!hasAdapterCapability) return;
		let cancelled = false;
		let acceptPushUpdates = !adapter?.getProductFeatures;
		let hasSeenEnabled = false;
		let fetched = false;
		let currentIdentityKey = readIdentityKey();
		const persistToAccount = (next) => {
			const prev = accountService.getAccount();
			if (!prev) return;
			if (readIdentityKey() !== currentIdentityKey) return;
			if (prev.enableArdotDesign === next) return;
			accountService.setAccount({
				...prev,
				enableArdotDesign: next
			});
		};
		const handleFeature = (features) => {
			if (cancelled) return;
			if (readIdentityKey() !== currentIdentityKey) return;
			if (!(!!features && Object.prototype.hasOwnProperty.call(features, "EnableArdot"))) return;
			const nextEnabled = isEnableArdotDesignEnabled(features);
			if (nextEnabled) hasSeenEnabled = true;
			persistToAccount(nextEnabled);
		};
		const shouldRetryFetch = (features, retryCount) => {
			if (hasSeenEnabled || retryCount >= REMOTE_SETTLE_MAX_RETRIES) return false;
			if (!(!!features && Object.prototype.hasOwnProperty.call(features, "EnableArdot"))) return true;
			return features?.[ENABLE_ARDOT_DESIGN_FEATURE] !== true;
		};
		const unsubscribePush = adapter?.onProductConfigChanged?.((params) => {
			if (!acceptPushUpdates) return;
			handleFeature(params?.productFeatures);
		});
		const fetchWithRetry = (retryCount) => {
			if (!adapter?.getProductFeatures || cancelled) return;
			const startKey = currentIdentityKey;
			adapter.getProductFeatures(true).then((features) => {
				if (cancelled) return;
				if (readIdentityKey() !== startKey) return;
				acceptPushUpdates = true;
				handleFeature(features);
				const fetchedFeatureValue = features?.[ENABLE_ARDOT_DESIGN_FEATURE];
				if (fetchedFeatureValue !== true) adapter.logLifecycleEvent?.("ArdotDesignFeatureNotEnabled", {
					retryCount,
					accountUid: accountUid ?? "unknown",
					value: String(fetchedFeatureValue),
					hasFeatureKey: String(!!features && Object.prototype.hasOwnProperty.call(features, "EnableArdot"))
				});
				if (shouldRetryFetch(features, retryCount)) setTimeout(() => {
					if (!cancelled && !hasSeenEnabled && readIdentityKey() === startKey) fetchWithRetry(retryCount + 1);
				}, REMOTE_SETTLE_RETRY_INTERVAL_MS);
				else if (!hasSeenEnabled) persistToAccount(false);
			}).catch(() => {
				if (cancelled) return;
				if (readIdentityKey() !== startKey) return;
				acceptPushUpdates = true;
			});
		};
		const startFetch = () => {
			if (fetched || cancelled) return;
			fetched = true;
			fetchWithRetry(0);
		};
		const unsubscribeAccount = accountService.subscribe(() => {
			const newKey = readIdentityKey();
			if (newKey !== currentIdentityKey) {
				currentIdentityKey = newKey;
				fetched = false;
				hasSeenEnabled = false;
				acceptPushUpdates = !adapter?.getProductFeatures;
			}
			if (accountService.getAccount()) startFetch();
		});
		if (accountService.getAccount()) startFetch();
		const idleTimer = setTimeout(startFetch, IDLE_FETCH_FALLBACK_MS);
		return () => {
			cancelled = true;
			unsubscribePush?.();
			unsubscribeAccount?.();
			clearTimeout(idleTimer);
		};
	}, [
		adapter,
		accountUid,
		hasAdapterCapability
	]);
	if (!hasAdapterCapability) return false;
	return enabled;
}
var import_react$2, REMOTE_SETTLE_RETRY_INTERVAL_MS, REMOTE_SETTLE_MAX_RETRIES, IDLE_FETCH_FALLBACK_MS;
var init_use_ardot_design_feature = __esmMin((() => {
	init_common();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_ardot_design_feature();
	REMOTE_SETTLE_RETRY_INTERVAL_MS = 1e4;
	REMOTE_SETTLE_MAX_RETRIES = 3;
	IDLE_FETCH_FALLBACK_MS = 5e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-license-disabled-send.ts
/**
* 把 license 状态翻译成 ChatInput 的 send 按钮 disabled + tooltip。
* usable=true → disabled:false（无 tooltip）
* usable=false → disabled:true + i18n tooltip
*/
function useLicenseDisabledSend() {
	const t = useTranslation();
	const { usable } = useLicenseUsable();
	if (usable) return { disabled: false };
	return {
		disabled: true,
		tooltip: t("chat.send.licenseUnavailableTooltip")
	};
}
var init_use_license_disabled_send = __esmMin((() => {
	init_useI18n();
	init_use_license_usable();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/home/utils/scene-session-settings.ts
function normalizeMarketplaceSource(url) {
	if (!url) return;
	return url.endsWith(".git") || url.endsWith(".json") ? url : `${url}.git`;
}
/** 将首页模板绑定的插件转换为新会话初始化配置。 */
function buildHomeSceneSessionSettings(template) {
	if (!template.plugins?.length) return;
	const enabledPlugins = {};
	const extraKnownMarketplaces = {};
	for (const plugin of template.plugins) {
		if (!plugin.name || !plugin.marketplaceName) continue;
		enabledPlugins[`${plugin.name}@${plugin.marketplaceName}`] = true;
		const source = normalizeMarketplaceSource(plugin.marketplaceUrl);
		if (source) extraKnownMarketplaces[plugin.marketplaceName] = {
			source: source.endsWith(".json") ? "url" : "git",
			url: source
		};
	}
	return Object.keys(enabledPlugins).length ? {
		enabledPlugins,
		...Object.keys(extraKnownMarketplaces).length ? { extraKnownMarketplaces } : {}
	} : void 0;
}
var init_scene_session_settings = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/home/utils/home-page-helpers.ts
function isLocalWorkspaceReference(block) {
	if (block.type !== "resource_link") return false;
	const meta = block._meta;
	const referenceType = meta?.mentionType ?? meta?.type;
	return (referenceType === "file" || referenceType === "folder") && !meta?.attachmentTransport;
}
function isLocalTaskAttachment(block) {
	if (block.type !== "resource_link" && block.type !== "image") return false;
	return block._meta?.attachmentTransport === "local";
}
function isCloudUploadedAttachment(block, currentTarget) {
	if (block.type !== "resource_link" && block.type !== "image") return false;
	const meta = block._meta;
	if (!meta?.blockId || !meta.filename && !meta.fileName) return false;
	const uri = "uri" in block && typeof block.uri === "string" ? block.uri : "";
	if (/^https:\/\//i.test(uri)) return true;
	const attachmentTransport = meta.attachmentTransport;
	return (meta.blockStatus === "processing" || meta.blockStatus === "failed") && (attachmentTransport === "cloud" || attachmentTransport !== "local" && currentTarget === "cloud");
}
function filterBlocksForTaskTarget(blocks, currentTarget, nextTarget) {
	return blocks.filter((block) => {
		if (nextTarget === "cloud" && !isCloudAttachmentBlockAllowed(block)) return false;
		if (nextTarget === "cloud" && (isLocalWorkspaceReference(block) || isLocalTaskAttachment(block))) return false;
		if (nextTarget === "local" && isCloudUploadedAttachment(block, currentTarget)) return false;
		if (block.type !== "resource_link") return true;
		const uri = block.uri ?? "";
		return !TASK_SCOPED_BLOCK_PREFIXES.some((prefix) => uri.startsWith(prefix));
	});
}
/** 云端任务不带本机 cwd；返回本地时仅恢复切走前用户最后选择的工作空间。 */
function resolveTaskTargetWorkspace(cwd, nextTarget, lastLocalWorkspace) {
	const nextLastLocalWorkspace = nextTarget === "cloud" && cwd.trim() ? cwd : lastLocalWorkspace;
	return {
		cwd: nextTarget === "local" ? nextLastLocalWorkspace : "",
		lastLocalWorkspace: nextLastLocalWorkspace
	};
}
function getHomeQuickActions(config, mode) {
	if (!config) return [];
	if (mode === "work") return config.workingActions;
	if (mode === "design") return config.designActions;
	return config.codingActions;
}
function isTemplateScene(item) {
	return !!item && typeof item === "object" && "id" in item && typeof item.id === "number" && Array.isArray(item.plugins) && Array.isArray(item.prompts);
}
/** Home chip list is already i18n'd; match Guest `scene` by schema id, never by name. */
function findLiveEmbedScene(actions, sceneSchemaId) {
	return actions.filter(isTemplateScene).find((item) => item.schemaSceneId === sceneSchemaId);
}
/** Invoke no longer validates ids; Home only applies a mode that is actually on the chip row. */
function isLiveEmbedMode(usesTemplateModes, modeIds, modeId) {
	if (!usesTemplateModes) return modeId === "work" || modeId === "code" || modeId === "design";
	for (const id of modeIds) if (id === modeId) return true;
	return false;
}
function pickHomeSceneTagIconUrl(template, promptIndex) {
	const icons = template.promptIcons ?? [];
	const indexed = typeof promptIndex === "number" ? icons[promptIndex]?.trim() : "";
	if (indexed) return indexed;
	const first = icons.find((icon) => icon.trim());
	if (first) return first.trim();
	return template.iconUrl?.trim() || void 0;
}
function composeEmbedHomeBlocks(content, scene) {
	if (!scene || scene.insertSceneTag === false) return content;
	return [createHomeSceneBlock(scene), ...content];
}
function createHomeSceneBlock(template, promptIndex) {
	const iconUrl = pickHomeSceneTagIconUrl(template, promptIndex);
	return createPhraseBlock(template.name, `scene://${template.id}`, {
		icon: iconUrl ? {
			url: iconUrl,
			alt: template.name
		} : {
			kind: "inline-svg",
			source: getSceneIcon(template.name)
		},
		meta: {
			type: "scene",
			mentionType: "scene",
			displayText: template.name,
			sceneId: String(template.id)
		}
	});
}
function buildHomeTemplateSelection(template, promptIndex) {
	const rawExpert = template.expert;
	const sceneExpert = rawExpert && typeof rawExpert.id === "string" ? {
		id: rawExpert.id,
		name: typeof rawExpert.name === "string" ? rawExpert.name : rawExpert.id,
		profession: typeof rawExpert.profession === "string" ? rawExpert.profession : void 0,
		avatarUrl: typeof rawExpert.avatarUrl === "string" ? rawExpert.avatarUrl : void 0,
		pluginName: typeof rawExpert.pluginName === "string" ? rawExpert.pluginName : void 0,
		marketExpertId: typeof rawExpert.marketExpertId === "string" ? rawExpert.marketExpertId : void 0,
		marketplace: typeof rawExpert.marketplace === "string" ? rawExpert.marketplace : void 0,
		runtimeIdentity: typeof rawExpert.runtimeIdentity === "string" ? rawExpert.runtimeIdentity : void 0,
		expertType: typeof rawExpert.expertType === "string" ? rawExpert.expertType : void 0,
		updatedAt: typeof rawExpert.updatedAt === "string" ? rawExpert.updatedAt : void 0,
		version: typeof rawExpert.version === "string" ? rawExpert.version : void 0,
		agentName: typeof rawExpert.agentName === "string" ? rawExpert.agentName : void 0,
		suppressDefaultInitPrompt: true
	} : void 0;
	return {
		id: template.id,
		name: template.name,
		promptIndex,
		sessionSettings: buildHomeSceneSessionSettings(template),
		...sceneExpert ? { expert: sceneExpert } : {}
	};
}
function readHomeInputBlocks(store) {
	if (!store) return [];
	return store.getSnapshot().draft.content.blocks;
}
/** 见 `HomeInputPrefill.onlyWhenEmpty`：初始化类预填不覆盖已经在输入框里的内容。 */
function shouldApplyHomePrefill(prefill, store) {
	if (!prefill) return false;
	return !prefill.onlyWhenEmpty || readHomeInputBlocks(store).length === 0;
}
var TASK_SCOPED_BLOCK_PREFIXES;
var init_home_page_helpers = __esmMin((() => {
	init_src$1();
	init_scene_icon_map();
	init_cloud_attachment_validation();
	init_scene_session_settings();
	TASK_SCOPED_BLOCK_PREFIXES = [
		"skill://",
		"plugin://",
		"command://",
		"connector://",
		"tdoc://",
		"tdoc-selection://",
		"lexiang://",
		"ima://"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/telemetry/international-web-events.ts
var getWebWindow, isInternationalWorkBuddyWebRuntime, isWebAgentLoggedIn, buildWebAgentPagePayload, reportInternationalWebEvent;
var init_international_web_events = __esmMin((() => {
	getWebWindow = () => {
		if (typeof window === "undefined") return null;
		return window;
	};
	isInternationalWorkBuddyWebRuntime = () => {
		const webWindow = getWebWindow();
		const hostname = webWindow?.location.hostname || "";
		const isInternationalHost = [
			"staging.workbuddy.ai",
			"www.workbuddy.ai",
			"workbuddy.ai",
			"staging.workbuddy.cc",
			"www.workbuddy.cc",
			"workbuddy.cc"
		].includes(hostname);
		const isInternational = webWindow?.IS_INTERNATIONAL_EDITION === true || webWindow?.IS_INTERNATIONAL_EDITION === "true";
		const pathname = webWindow?.location.pathname || "";
		return (isInternational || isInternationalHost) && (pathname === "/app" || pathname.startsWith("/app/"));
	};
	isWebAgentLoggedIn = () => getWebWindow()?.__isLoggedIn === true;
	buildWebAgentPagePayload = () => {
		const webWindow = getWebWindow();
		if (!webWindow) return {};
		return {
			pageURL: webWindow.location.href,
			pageName: "web_agent",
			referURL: webWindow.document.referrer || ""
		};
	};
	reportInternationalWebEvent = (eventCode, payload) => {
		const webWindow = getWebWindow();
		if (!webWindow || !isInternationalWorkBuddyWebRuntime()) return;
		const fullPayload = {
			product: "SaaS",
			...payload
		};
		try {
			if (webWindow.__reportWebBeaconEvent) {
				Promise.resolve(webWindow.__reportWebBeaconEvent(eventCode, fullPayload)).catch(() => {});
				return;
			}
			webWindow.__autotracker?.dtReport?.(eventCode, {
				eventCode,
				...fullPayload
			});
		} catch {}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skill-recommend-home-scene.ts
/** 首页只有稳定场景 ID `work`（日常办公）允许技能/专家推荐。 */
function isSkillRecommendHomeScene(sceneMode, availableSceneModes) {
	if (availableSceneModes && !availableSceneModes.includes(sceneMode ?? "")) return false;
	return sceneMode === "work";
}
var init_skill_recommend_home_scene = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-homepage-registry.ts
function getRegistryBucket(baseUrl) {
	let bucket = registryBuckets.get(baseUrl);
	if (!bucket) {
		bucket = { emptyStreak: 0 };
		registryBuckets.set(baseUrl, bucket);
	}
	return bucket;
}
function broadcastRegistryCases(cases) {
	for (const setter of activeRegistrySetters) setter(cases);
}
async function readHomepageRegistryFromStorage() {
	const cached = await readFromWbUserStorage(HOMEPAGE_REGISTRY_STORAGE_NAMESPACE, HOMEPAGE_REGISTRY_STORAGE_KEY, FS_CACHE_REGION);
	return Array.isArray(cached) && cached.length > 0 ? cached : void 0;
}
function writeHomepageRegistryToStorage(cases) {
	if (cases.length === 0) return;
	writeToWbUserStorage(HOMEPAGE_REGISTRY_STORAGE_NAMESPACE, HOMEPAGE_REGISTRY_STORAGE_KEY, cases, FS_CACHE_REGION);
}
async function fetchHomepageRegistry() {
	const waitStarted = Date.now();
	await waitForDiscoverBaseUrl();
	const waitElapsed = Date.now() - waitStarted;
	const baseUrl = getDiscoverBaseUrl();
	const existing = inFlightFetchByBaseUrl.get(baseUrl);
	if (existing) return existing;
	const fetchId = ++fetchIdSequence;
	const promise = (async () => {
		const url = `${baseUrl}${DISCOVER_COS_CONFIG.homepageRegistryPath}`;
		const fetchStarted = Date.now();
		writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} fetch-start waitBaseUrlMs=${waitElapsed} url=${url} fetchId=${fetchId}`);
		const response = await fetch(url, { cache: "no-cache" });
		if (!response.ok) {
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "warn", `region=${FS_CACHE_REGION} fetch-fail elapsedMs=${Date.now() - fetchStarted} status=${response.status}`);
			throw new Error(`Failed to fetch homepage registry: ${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		const cases = Array.isArray(data?.cases) ? data.cases : [];
		writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} fetch-done elapsedMs=${Date.now() - fetchStarted} count=${cases.length} fetchId=${fetchId}`);
		return {
			cases,
			baseUrl,
			fetchId
		};
	})();
	inFlightFetchByBaseUrl.set(baseUrl, promise);
	const clear = () => {
		if (inFlightFetchByBaseUrl.get(baseUrl) === promise) inFlightFetchByBaseUrl.delete(baseUrl);
	};
	promise.then(clear, clear);
	return promise;
}
function useHomepageRegistry(options = {}) {
	const { waitForFirstScreen = true } = options;
	const { account } = useAccount();
	const enterpriseId = account?.enterpriseId ?? "";
	const [cases, setCases] = (0, import_react$1.useState)(() => homepageRegistryCache.cases ?? []);
	/**
	* fetch 回包统一提交入口（issue #105577 Reviewer P2）。
	*
	* 抽出共享函数是为了让 `waitForFirstScreen=true`（首屏门路径）与
	* `waitForFirstScreen=false`（旧路径 / 单测）走同一套"回包提交策略"：
	*   1. 非空 → 重置空响应连续计数（按 baseUrl bucket），正常落地内存 / state / 持久层。
	*   2. 空 + 历史即空（含新用户 `previousCases === null`）→ 直接接受空数据，
	*      不触发权威判定（本次并没有"从有到无"的语义）。
	*   3. 空 + 历史非空 →（若 fetchId 未被计数过）bucket.emptyStreak++；达到阈值前保留旧数据；
	*      达到阈值视作合法下线，清除内存 / state / 持久层，并广播所有活跃实例。
	*
	* `setCases` 是 React 稳定 setter，可放心闭包捕获。
	*/
	const commitFreshResponse = (result, commitOptions) => {
		const { cases: fresh, baseUrl, fetchId } = result;
		const { silent, getCancelled } = commitOptions;
		if (baseUrl !== getDiscoverBaseUrl()) {
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} stale-baseurl-skip resultBaseUrl=${baseUrl} currentBaseUrl=${getDiscoverBaseUrl()} silent=${silent} fetchId=${fetchId} freshCount=${fresh.length}`);
			return;
		}
		const bucket = getRegistryBucket(baseUrl);
		const previousCases = homepageRegistryCache.cases;
		if (fresh.length > 0) {
			bucket.emptyStreak = 0;
			countedFetchIds.clear();
			homepageRegistryCache.cases = fresh;
			if (!getCancelled()) setCases(fresh);
			writeHomepageRegistryToStorage(fresh);
			return;
		}
		if (previousCases === null || previousCases.length === 0) {
			bucket.emptyStreak = 0;
			countedFetchIds.clear();
			homepageRegistryCache.cases = fresh;
			if (!getCancelled()) setCases(fresh);
			return;
		}
		if (!countedFetchIds.has(fetchId)) {
			countedFetchIds.add(fetchId);
			bucket.emptyStreak += 1;
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "warn", `region=${FS_CACHE_REGION} suspicious-empty baseUrl=${baseUrl} previousCount=${previousCases.length} silent=${silent} fetchId=${fetchId} streak=${bucket.emptyStreak}/${AUTHORITATIVE_EMPTY_STREAK_THRESHOLD}`);
		}
		if (bucket.emptyStreak >= AUTHORITATIVE_EMPTY_STREAK_THRESHOLD) {
			bucket.emptyStreak = 0;
			countedFetchIds.clear();
			homepageRegistryCache.cases = fresh;
			broadcastRegistryCases(fresh);
			writeToWbUserStorage(HOMEPAGE_REGISTRY_STORAGE_NAMESPACE, HOMEPAGE_REGISTRY_STORAGE_KEY, [], FS_CACHE_REGION);
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} authoritative-empty-committed baseUrl=${baseUrl} previousCount=${previousCases.length} fetchId=${fetchId}`);
		}
	};
	const mountLogRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (mountLogRef.current) return;
		mountLogRef.current = true;
		writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} hook-mount memoryCached=${homepageRegistryCache.cases !== null} waitForFirstScreen=${waitForFirstScreen}`);
	}, [waitForFirstScreen]);
	(0, import_react$1.useEffect)(() => {
		activeRegistrySetters.add(setCases);
		return () => {
			activeRegistrySetters.delete(setCases);
		};
	}, []);
	(0, import_react$1.useEffect)(() => {
		if (waitForFirstScreen) return;
		if (homepageRegistryCache.cases) return;
		let disposed = false;
		fetchHomepageRegistry().then((result) => {
			commitFreshResponse(result, {
				silent: false,
				getCancelled: () => disposed
			});
		}).catch((err) => {
			console.warn("[useHomepageRegistry] homepage registry unavailable:", err);
		});
		return () => {
			disposed = true;
		};
	}, [waitForFirstScreen]);
	useAfterFirstScreenReady(async (getCancelled) => {
		if (!waitForFirstScreen) return;
		const t0 = Date.now();
		const runFetch = async (silent) => {
			try {
				const result = await fetchHomepageRegistry();
				commitFreshResponse(result, {
					silent,
					getCancelled
				});
			} catch (err) {
				if (!silent) console.warn("[useHomepageRegistry] homepage registry unavailable:", err);
			}
		};
		if (homepageRegistryCache.cases) {
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} memory-hit count=${homepageRegistryCache.cases.length}`);
			runFetch(true).catch(() => void 0);
			return;
		}
		writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} memory-miss start-storage-read`);
		const persisted = await readHomepageRegistryFromStorage();
		if (getCancelled()) {
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} cancelled after storage-read`);
			return;
		}
		if (persisted !== void 0) {
			if (homepageRegistryCache.cases !== null) {
				const memoryFresh = homepageRegistryCache.cases;
				if (!getCancelled()) setCases(memoryFresh);
				writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} storage-hit skipped-in-flight-success elapsedInGateMs=${Date.now() - t0} persistedCount=${persisted.length} memoryCount=${memoryFresh.length} self-state-synced=${!getCancelled()}`);
				runFetch(true).catch(() => void 0);
				return;
			}
			homepageRegistryCache.cases = persisted;
			setCases(persisted);
			writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} storage-hit hydrated setState-done elapsedInGateMs=${Date.now() - t0} count=${persisted.length}`);
			runFetch(true).catch(() => void 0);
			return;
		}
		writeRendererLogFileOnly(FS_CACHE_LOG_SCOPE, "info", `region=${FS_CACHE_REGION} storage-miss fallback-to-fetch elapsedInGateMs=${Date.now() - t0}`);
		await runFetch(false);
	}, [waitForFirstScreen], { diagRegion: FS_CACHE_REGION });
	return (0, import_react$1.useMemo)(() => cases.filter((item) => {
		if (!item.experts || item.experts.length === 0) return true;
		return item.experts.every((expert) => isExpertVisibleForEnterpriseId(expert, enterpriseId));
	}), [cases, enterpriseId]);
}
var import_react$1, FS_CACHE_LOG_SCOPE, FS_CACHE_REGION, homepageRegistryCache, AUTHORITATIVE_EMPTY_STREAK_THRESHOLD, registryBuckets, countedFetchIds, activeRegistrySetters, HOMEPAGE_REGISTRY_STORAGE_NAMESPACE, HOMEPAGE_REGISTRY_STORAGE_KEY, inFlightFetchByBaseUrl, fetchIdSequence;
var init_use_homepage_registry = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_after_first_screen_ready();
	init_visibility();
	init_http_logger();
	init_wb_user_storage();
	init_types();
	FS_CACHE_LOG_SCOPE = "home-fs-cache";
	FS_CACHE_REGION = "homepage-registry";
	homepageRegistryCache = { cases: null };
	AUTHORITATIVE_EMPTY_STREAK_THRESHOLD = 2;
	registryBuckets = /* @__PURE__ */ new Map();
	countedFetchIds = /* @__PURE__ */ new Set();
	activeRegistrySetters = /* @__PURE__ */ new Set();
	HOMEPAGE_REGISTRY_STORAGE_NAMESPACE = "home-first-screen-cache";
	HOMEPAGE_REGISTRY_STORAGE_KEY = "homepage-registry";
	inFlightFetchByBaseUrl = /* @__PURE__ */ new Map();
	fetchIdSequence = 0;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-footer/worktree/branch-switch-dirty-picker.scss
var init_branch_switch_dirty_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-footer/worktree/branch-switch-dirty-picker.tsx
var import_react, import_jsx_runtime, BRANCH_SWITCH_DEFAULT_POLICY, BranchSwitchDirtyPicker;
var init_branch_switch_dirty_picker = __esmMin((() => {
	init_branch_switch_dirty_picker$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	BRANCH_SWITCH_DEFAULT_POLICY = "commit";
	BranchSwitchDirtyPicker = ({ folderName, currentBranch, selectedBranch, onChange }) => {
		const t = useTranslation();
		const [policy, setPolicy] = (0, import_react.useState)(BRANCH_SWITCH_DEFAULT_POLICY);
		const containerRef = (0, import_react.useRef)(null);
		const resolveModalRoot = () => containerRef.current?.closest(".wb-modal");
		const renderOptionLabel = (value, content) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "wb-branch-switch-dirty__option",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wb-branch-switch-dirty__option-content",
				children: content
			}), policy === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
				size: 16,
				className: "wb-branch-switch-dirty__check",
				"aria-hidden": true
			})]
		});
		const options = [
			{
				value: "commit",
				label: renderOptionLabel("commit", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					t("worktree.branchSwitch.dirty.commitPrefix"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentBranch }),
					t("worktree.branchSwitch.dirty.commitSuffix")
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					tone: "success",
					size: "small",
					className: "wb-branch-switch-dirty__recommend",
					children: t("worktree.branchSwitch.dirty.recommend")
				})] }))
			},
			{
				value: "stash",
				label: renderOptionLabel("stash", t("worktree.branchSwitch.dirty.stash"))
			},
			{
				value: "discard",
				label: renderOptionLabel("discard", t("worktree.branchSwitch.dirty.discard"))
			}
		];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-branch-switch-dirty",
			ref: containerRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "wb-branch-switch-dirty__desc",
				children: [
					t("worktree.branchSwitch.dirty.prefix"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: folderName }),
					t("worktree.branchSwitch.dirty.currentMiddle"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentBranch }),
					t("worktree.branchSwitch.dirty.selectedMiddle"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBranch }),
					t("worktree.branchSwitch.dirty.suffix")
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				fullWidth: true,
				className: "wb-branch-switch-dirty__trigger",
				value: policy,
				options,
				placement: "bottom-start",
				portalRoot: resolveModalRoot,
				popoverClassName: "wb-branch-switch-dirty-popover",
				onChange: (value) => {
					const next = value;
					setPolicy(next);
					onChange(next);
				}
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-footer/worktree/branch-switch-error.ts
/** 兼容 string bizCode 被 transport code 覆盖的链路，同时识别保留下来的 data.reason。 */
function isGitIdentityMissingError(error) {
	if (!error || typeof error !== "object") return false;
	const rpcError = error;
	const data = rpcError.data && typeof rpcError.data === "object" ? rpcError.data : void 0;
	return rpcError.code === "GIT_IDENTITY_MISSING" || data?.reason === "GIT_IDENTITY_MISSING";
}
var init_branch_switch_error = __esmMin((() => {}));
//#endregion
export { useArdotDesignFeature as A, isTemplateScene as C, init_use_license_disabled_send as D, shouldApplyHomePrefill as E, workbuddy_logo_dark_default as M, useLicenseDisabledSend as O, isLiveEmbedMode as S, resolveTaskTargetWorkspace as T, createHomeSceneBlock as _, init_branch_switch_dirty_picker as a, getHomeQuickActions as b, init_skill_recommend_home_scene as c, init_international_web_events as d, isInternationalWorkBuddyWebRuntime as f, composeEmbedHomeBlocks as g, buildHomeTemplateSelection as h, BranchSwitchDirtyPicker as i, init_workbuddy_logo_dark as j, init_use_ardot_design_feature as k, isSkillRecommendHomeScene as l, reportInternationalWebEvent as m, isGitIdentityMissingError as n, init_use_homepage_registry as o, isWebAgentLoggedIn as p, BRANCH_SWITCH_DEFAULT_POLICY as r, useHomepageRegistry as s, init_branch_switch_error as t, buildWebAgentPagePayload as u, filterBlocksForTaskTarget as v, readHomeInputBlocks as w, init_home_page_helpers as x, findLiveEmbedScene as y };
