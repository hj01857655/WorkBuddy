import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $O as resolveBuddyAppForceHiddenNavKeys, $v as setModelAvailabilityPolicy, AK as resolveIndustryText, CK as readCachedContext, CY as init_industry_store, D1 as useI18n, DK as readSectionSnapshots, DY as matchingContext, E1 as init_useI18n, EK as readSavedTemplateId, EY as init_buddy_app_catalog, Fx as init_ensure_buddy_application, GK as init_buddy_telemetry_context, ID as subscribePendingBuddyDeeplink, Ix as startEnsureBuddyApplication, JZ as TENCENT_DOCS_B_END_CONNECTOR_ID, Jv as init_model_availability_policy, Jx as init_collect_buddy_scene_skills, K2 as init_environment, KK as setBuddyTelemetryContext, LQ as init_account, MD as init_buddy_deeplink_support, N1 as onLocaleChange, ND as isBuddyDeeplinkVersionSupported, NJ as init_app_switch_key, NK as init_buddy_resource_snapshot_key, OK as saveSelectedTemplateId, OY as mergeTemplatesById, PD as init_buddy_deeplink_store, PJ as useAppSwitchKeyBridge, PK as resourceSnapshotKeyForTemplate, Px as ensureBuddyTemplateById, Q as init_app_providers, QO as init_industry_nav, Qv as resolveIndustryCustomModelsDisabled, RQ as isIOAUser, SK as init_industry_persistence, SY as industryStore, T0 as init_app_core, TK as readRecentSnapshots, TY as useIndustryStore, V5 as message, WK as GENERAL_BUDDY_TELEMETRY_CONTEXT, XZ as init_tencent_docs_id, Xv as resolveBuddyAppAllowedModelIds, YZ as TENCENT_DOCS_C_END_CONNECTOR_ID, Yv as resetModelAvailabilityPolicy, ZM as init_client_menu, ZO as buildIndustryRawMenus, _$ as init_library_connector_id, _0 as init_log_sink, _K as init_switch_buddy_app, _q as requestBuddySwitcherOpen, _z as init_use_buddy_app_feature, ad as init_common, b0 as writeRendererLog, bK as isAdoptedDebugTemplateId, bL as init_high_risk_notification_store, bY as getBuddyAppFirstPageForUser, bq as resolveBuddyAppIdentity, d0 as useModuleHost, dK as IndustryJsonDebugger, dN as setBaselineMenus, dq as exitIndustryPreviewMode, e4 as isWorkBuddyDesktop, et as useAgentServices, f1 as init_selected_template_persisted, f3 as wb, fK as init_industry_json_debugger, fN as setForceHiddenNavKeys, fq as industryPreviewStore, g$ as LEXIANG_MCP_CONNECTOR_ID, gq as init_buddy_switcher_open_store, h$ as IMA_MCP_CONNECTOR_ID, hq as useIndustryPreviewMode, j1 as init_i18n, k1 as getLocale, kK as init_hooks, l1 as init_input_connector_snapshot, m$ as IMA_B_END_CONNECTOR_ID, m5 as init_src, mK as waitForBoundUserStorage, mq as isIndustryPreviewMode, oq as goHomeAfterBuddySwitch, p1 as notifySelectedTemplatePersisted, pK as init_wait_for_bound_user_storage, pq as init_industry_preview_mode, qx as collectBuddySceneSkillBuckets, sq as init_go_home_after_buddy_switch, u1 as invalidateInputConnectorSnapshot, uq as enterIndustryPreviewMode, vK as switchBuddyApp, vY as GENERAL_TEMPLATE_ID, vq as init_buddy_app_telemetry, vz as useBuddyAppFeature, wK as readCachedTemplate, wY as refreshIndustryRuntimeTemplates, wq as useAgentTelemetry, xK as isDebugTemplateId, xL as notifySkillListRefresh, xY as getSelectedIndustryConfig, xq as init_telemetry, yK as init_industry_debug_template, yY as clearIndustrySelection, yq as reportBuddyAppEnterClick } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as subscribePendingBuddyAppDeeplinkUrl, n as parseBuddyAppDeeplink, r as init_industry_preview_deeplink_store, t as init_parse_buddy_preview_deeplink } from "./parse-buddy-preview-deeplink-D-NTY6nO.js";
//#region ../../packages/agent-ui/src/modules/industry/buddy-deeplink-coordinator.tsx
async function waitUntilIndustryHydrated(isCancelled) {
	if (industryStore.getState().selectionHydrated) return true;
	if (await waitForBoundUserStorage({ isStale: isCancelled }) === "stale" || isCancelled()) return false;
	if (industryStore.getState().selectionHydrated) return true;
	return new Promise((resolve) => {
		const unsubscribe = industryStore.subscribe((state) => {
			if (isCancelled()) {
				unsubscribe();
				resolve(false);
				return;
			}
			if (state.selectionHydrated) {
				unsubscribe();
				resolve(true);
			}
		});
		if (isCancelled()) {
			unsubscribe();
			resolve(false);
			return;
		}
		if (industryStore.getState().selectionHydrated) {
			unsubscribe();
			resolve(true);
		}
	});
}
function BuddyDeeplinkCoordinator() {
	const host = useModuleHost();
	const { t, locale } = useI18n();
	const { reportEvent } = useAgentTelemetry();
	const hostRef = (0, import_react$2.useRef)(host);
	hostRef.current = host;
	const tRef = (0, import_react$2.useRef)(t);
	tRef.current = t;
	const localeRef = (0, import_react$2.useRef)(locale);
	localeRef.current = locale;
	const reportEventRef = (0, import_react$2.useRef)(reportEvent);
	reportEventRef.current = reportEvent;
	(0, import_react$2.useEffect)(() => {
		let cancelled = false;
		const openPending = async (intent) => {
			if (!isBuddyDeeplinkVersionSupported()) {
				message.warning(tRef.current("buddyApp.deeplink.versionRequired"));
				return;
			}
			if (!await waitUntilIndustryHydrated(() => cancelled) || cancelled) return;
			if (intent.templateId) try {
				const template = await ensureBuddyTemplateById(intent.templateId);
				if (cancelled) return;
				if (!template) message.error(tRef.current("buddyApp.marketSwitch.failed"));
				else if (industryStore.getState().selectedTemplateId !== template.templateId) {
					const english = localeRef.current.toLowerCase().startsWith("en");
					await switchBuddyApp({
						template,
						english,
						translate: tRef.current,
						onCommitted: () => {
							goHomeAfterBuddySwitch(hostRef.current.navigation);
							reportBuddyAppEnterClick(reportEventRef.current, {
								...resolveBuddyAppIdentity(template),
								position: 0,
								isFirstPage: true
							});
						}
					});
				}
			} catch {
				if (!cancelled) message.error(tRef.current("buddyApp.marketSwitch.failed"));
			}
			if (cancelled) return;
			if (intent.openBuddySwitcher) requestBuddySwitcherOpen();
		};
		const unsubscribe = subscribePendingBuddyDeeplink((intent) => {
			openPending(intent).catch(() => void 0);
		});
		return () => {
			cancelled = true;
			unsubscribe();
		};
	}, []);
	return null;
}
var import_react$2;
var init_buddy_deeplink_coordinator = __esmMin((() => {
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_buddy_deeplink_store();
	init_buddy_deeplink_support();
	init_telemetry();
	init_common();
	init_buddy_app_telemetry();
	init_buddy_switcher_open_store();
	init_ensure_buddy_application();
	init_go_home_after_buddy_switch();
	init_industry_store();
	init_switch_buddy_app();
	init_wait_for_bound_user_storage();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/buddy-telemetry-context-sync.ts
/**
* 从当前选中态推导埋点归属。
*
* 取值口径复用 `resolveBuddyAppIdentity`，与存量 `buddyapp_*` 事件的
* `elementId` / `elementName` 保持一致，BI 侧可以直接和历史数据对齐。
*/
function buildBuddyTelemetryContext(selectedTemplateId, selectedTemplate) {
	if (selectedTemplateId === "__general__" || !selectedTemplate) return GENERAL_BUDDY_TELEMETRY_CONTEXT;
	const identity = resolveBuddyAppIdentity({
		applicationId: selectedTemplate.applicationId,
		templateId: selectedTemplate.templateId ?? selectedTemplateId,
		templateName: selectedTemplate.templateName ?? ""
	});
	return {
		buddyId: identity.elementId,
		buddyName: identity.elementName
	};
}
/**
* 同步归属到两处：
* - 本进程单例 —— 覆盖 renderer 内直接构造 prompt 的场景（如 cloud transport 的
*   `ConversationImpl`，它不经过 daemon 转发）；
* - daemon —— 覆盖 `/v2/report` 公参注入与本地 prompt 转发的 baggage，经 `wb.invoke`
*   直调既有 daemon RPC，**不经 adapter**（新 Conversation 业务代码禁用 adapter）。
*
* Web 直连既没有 bridge invoke（`wb.invoke` 抛 NOT_SUPPORTED）也没有 daemon 侧公参
* 注入链路，按 platform 提前短路。任何失败都只影响 daemon 侧公参，本地单例已写入。
*/
function syncBuddyTelemetryContext(context) {
	setBuddyTelemetryContext(context);
	try {
		if (wb.platform.type !== "desktop") return;
		Promise.resolve(wb.invoke(SET_BUDDY_CONTEXT_CHANNEL, context)).catch((error) => {
			console.warn("[Industry] sync buddy telemetry context failed:", String(error));
		});
	} catch (error) {
		console.warn("[Industry] sync buddy telemetry context failed:", String(error));
	}
}
var SET_BUDDY_CONTEXT_CHANNEL;
var init_buddy_telemetry_context_sync = __esmMin((() => {
	init_buddy_telemetry_context();
	init_app_core();
	init_buddy_app_telemetry();
	init_industry_store();
	SET_BUDDY_CONTEXT_CHANNEL = "telemetry:setBuddyContext";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/ensure-buddy-scene-skills.ts
async function ensureBuddySceneSkills(options) {
	const applicationId = options.applicationId?.trim();
	if (!applicationId || !options.personalSkills?.ensureBuddySkills) return;
	const declaredBuckets = collectBuddySceneSkillBuckets(options.config);
	if (declaredBuckets.length === 0) return;
	const buckets = declaredBuckets.filter((bucket) => bucket.skills.length > 0);
	for (const bucket of buckets) try {
		const result = await options.personalSkills.ensureBuddySkills({
			applicationId,
			...options.resourceSnapshotKey ? { resourceSnapshotKey: options.resourceSnapshotKey } : {},
			sceneId: bucket.sceneId,
			skills: bucket.skills
		});
		const failed = result.results.filter((item) => item.status === "failed" || item.status === "unsupported");
		if (failed.length > 0) console.warn("[ensureBuddySceneSkills] some skills failed", {
			applicationId,
			sceneId: bucket.sceneId,
			failed
		});
		const updated = result.results.filter((item) => item.status === "updated");
		if (updated.length > 0) console.info("[ensureBuddySceneSkills] updated skills", {
			applicationId,
			sceneId: bucket.sceneId,
			updated: updated.map((item) => ({
				id: item.id,
				source: item.source,
				sourceId: item.sourceId
			}))
		});
	} catch (error) {
		console.warn("[ensureBuddySceneSkills] ensure failed", {
			applicationId,
			sceneId: bucket.sceneId,
			error
		});
	}
	try {
		await options.personalSkills.pruneBuddySkillBuckets?.({
			applicationId,
			keep: buckets.map((bucket) => bucket.sceneId),
			allowEmptyKeep: true
		});
	} catch (error) {
		console.warn("[ensureBuddySceneSkills] prune failed", {
			applicationId,
			error
		});
	}
}
var init_ensure_buddy_scene_skills = __esmMin((() => {
	init_collect_buddy_scene_skills();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/nav-required-connectors.ts
/**
* Buddy 连接器中心必须并回白名单的 marketplace id。
*
* 与 More 菜单的 IMA / 腾讯文档 / 乐享对齐（C/B 两端都加）。不读模板 `ui.nav.items`：
* 那份 JSON 目前藏不住这些 builtin 入口。
*/
function collectNavRequiredConnectorIds() {
	return Object.values(LIBRARY_NAV_CONNECTOR_IDS).flatMap((ids) => [...ids]);
}
var LIBRARY_NAV_CONNECTOR_IDS;
var init_nav_required_connectors = __esmMin((() => {
	init_library_connector_id();
	init_tencent_docs_id();
	LIBRARY_NAV_CONNECTOR_IDS = {
		tencent_docs: [TENCENT_DOCS_C_END_CONNECTOR_ID, TENCENT_DOCS_B_END_CONNECTOR_ID],
		ima: [IMA_MCP_CONNECTOR_ID, IMA_B_END_CONNECTOR_ID],
		lexiang: [LEXIANG_MCP_CONNECTOR_ID]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/industry-buddy-scope-sync.ts
function scopeFingerprint(scope) {
	return `${typeof scope.applicationId === "string" ? scope.applicationId.trim() : ""}:${scope.mode === "dev" ? "dev" : ""}:${(scope.requiredConnectorIds ?? []).map((id) => id.trim()).filter(Boolean).join(",")}`;
}
/**
* 预览态优先用 `industryPreviewStore.applicationId`（进预览时 `selectedTemplateId` 可能还停在
* 通用哨兵/上一个 Buddy，直接用它会推空/推错 scope，把 daemon 的 open-platform mode holder 清掉）；
* 非预览态维持原逻辑：只认当前选中的 templateId（desired），通用版清空，Buddy 用目录里的
* `applicationId`，目录没有这条时用 desired id 本身（续聊/仅 id 落盘的 cb_*）。
* 预览调试时带 `mode:dev`，daemon 拉 open-platform（专家/技能/连接器/tags）数据走预览草稿。
* `requiredConnectorIds` 对齐 More 菜单仍在展示的 IMA / 腾讯文档 / 乐享（JSON 藏不住这些 builtin）。
* `GENERAL_TEMPLATE_ID` 不再是特殊早退，而是“算不出 applicationId → 返回空 scope”的兜底。
*/
function buildIndustryBuddyScope(selectedTemplateId) {
	const inPreview = isIndustryPreviewMode();
	const desiredId = (inPreview ? industryPreviewStore.getState().applicationId?.trim() : "") || (selectedTemplateId === "__general__" ? "" : selectedTemplateId.trim());
	if (!desiredId) return {};
	const applicationId = industryStore.getState().templates.find((item) => item.templateId === desiredId)?.applicationId?.trim() || desiredId;
	const requiredConnectorIds = collectNavRequiredConnectorIds();
	const scope = requiredConnectorIds.length > 0 ? {
		applicationId,
		requiredConnectorIds
	} : { applicationId };
	return inPreview ? {
		...scope,
		mode: "dev"
	} : scope;
}
/**
* Buddy id / 预览 mode / requiredConnectorIds 是否发生变化（含冷启动首次推非空）。
*
* 变化后 daemon 的 connectors list/states 行业白名单过滤结果随之改变，
* 前端连接器快照需要失效重读；未变（含冷启动推空 scope）则无事可做。
*/
function shouldInvalidateConnectorSnapshotAfterBuddyScopePush(previous, next) {
	if (previous === UNSET) return next !== EMPTY_SCOPE_FINGERPRINT;
	return previous !== next;
}
/**
* 只推 scope（daemon 内存态），不触发 daemon 对账：MCP 连接全局常驻、不随
* scope 隔离，切换 Buddy 不是连接器状态变更；对账由 daemon 侧状态变更动作
* （connect / disconnect / installMcpDependency / 账号切换 / 冷启动 /
* mcp.json watcher）自带触发。
*
* Buddy id 或预览 mode 变化时仅失效前端连接器快照：listener（connectorStore 的
* onInputConnectorSnapshotInvalidated）会补一次 list+states 读路径，
* 拿到新 scope 过滤后的白名单结果，UI 正确性与 daemon 对账解耦。
*/
async function syncIndustryBuddyScopeToDaemon(scope, isStale) {
	const connectors = wb.connectors;
	if (typeof connectors.setIndustryBuddyScope !== "function") throw new Error("[Industry] wb.connectors.setIndustryBuddyScope is unavailable");
	await Promise.resolve(connectors.setIndustryBuddyScope(scope));
	if (isStale?.()) return;
	const next = scopeFingerprint(scope);
	const shouldInvalidate = shouldInvalidateConnectorSnapshotAfterBuddyScopePush(lastPushedFingerprint, next);
	lastPushedFingerprint = next;
	if (!shouldInvalidate) return;
	invalidateInputConnectorSnapshot(`buddy-scope:${next || "general"}`);
}
var UNSET, lastPushedFingerprint, EMPTY_SCOPE_FINGERPRINT;
var init_industry_buddy_scope_sync = __esmMin((() => {
	init_app_core();
	init_input_connector_snapshot();
	init_industry_preview_mode();
	init_industry_store();
	init_nav_required_connectors();
	UNSET = Symbol("unset");
	lastPushedFingerprint = UNSET;
	EMPTY_SCOPE_FINGERPRINT = "::";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/probe-selected-buddy-authorization.ts
/** Probe grant without opening consent. Mirrors switcher `wb.login` authorized check. */
async function probeSelectedBuddyAuthorization(applicationId) {
	const id = applicationId.trim();
	if (!id) return "unauthorized";
	const startedAt = Date.now();
	try {
		const result = await wb.login({ applicationId: id });
		writeRendererLog("industry-auth-probe", "info", `probe done result=${result.authorized ? "authorized" : "unauthorized"} app=${id} elapsedMs=${Date.now() - startedAt}`);
		return result.authorized ? "authorized" : "unauthorized";
	} catch (error) {
		writeRendererLog("industry-auth-probe", "warn", `probe failed -> unknown app=${id} elapsedMs=${Date.now() - startedAt} error=${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`);
		return "unknown";
	}
}
function buddyUnauthorizedExitTip(name, english) {
	return english ? `${name} is no longer authorized, so it was exited` : `「${name}」已不再授权，已退出该应用`;
}
var init_probe_selected_buddy_authorization = __esmMin((() => {
	init_app_core();
	init_log_sink();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/industry-hydrate.ts
async function readOrLog(action, fallback, read) {
	try {
		return await read();
	} catch (error) {
		console.warn(`[Industry] ${action} failed:`, error instanceof Error ? error.message : String(error));
		return fallback;
	}
}
async function readIndustryDiskState() {
	const [savedId, recentSnapshots, sectionSnapshots] = await Promise.all([
		readOrLog("read selected template id", null, readSavedTemplateId),
		readOrLog("read recent buddy app snapshots", [], readRecentSnapshots),
		readOrLog("read buddy app section snapshots", [], readSectionSnapshots)
	]);
	const cachedTemplate = await readOrLog("read cached buddy app template", void 0, () => readCachedTemplate(savedId));
	return {
		savedId,
		cachedTemplate,
		cachedContext: await readOrLog("read cached buddy app context", void 0, () => readCachedContext(cachedTemplate)),
		recentSnapshots,
		sectionSnapshots
	};
}
function seedIndustryStoreFromDisk(state, ownerUserId) {
	const selectedIsBuddy = Boolean(state.savedId && state.savedId !== "__general__");
	const nextSelectedId = state.cachedTemplate?.templateId ?? (selectedIsBuddy ? state.savedId : "__general__");
	let switchStatus = "idle";
	if (state.cachedTemplate) switchStatus = state.cachedContext ? "ready" : "unauthorized";
	else if (selectedIsBuddy) switchStatus = "unauthorized";
	industryStore.setState({
		templates: mergeTemplatesById([state.cachedTemplate], state.recentSnapshots.map((item) => item.template), state.sectionSnapshots.map((item) => item.template)),
		selectedTemplateId: nextSelectedId,
		currentContext: state.cachedContext,
		switchStatus,
		available: true,
		loading: false,
		refreshing: false,
		error: void 0
	});
	const freshFirstPage = getBuddyAppFirstPageForUser(ownerUserId);
	if (freshFirstPage) refreshIndustryRuntimeTemplates(freshFirstPage.templates);
}
async function restoreBuddyAuthorizationOrExit(state, isStale) {
	if (!Boolean(state.savedId && state.savedId !== "__general__")) return;
	const selectedId = state.cachedTemplate?.templateId ?? state.savedId;
	const applicationId = (state.cachedTemplate?.applicationId ?? industryStore.getState().templates.find((item) => item.templateId === selectedId)?.applicationId ?? "").trim();
	if (!applicationId) return;
	const probe = await probeSelectedBuddyAuthorization(applicationId);
	if (isStale?.()) return;
	if (probe === "unauthorized") {
		const name = state.cachedTemplate?.templateName || state.cachedTemplate?.name || applicationId;
		clearIndustrySelection();
		message.warning(buddyUnauthorizedExitTip(name, getLocale().toLowerCase().startsWith("en")));
		return;
	}
	if (probe === "unknown") {
		writeRendererLog("industry-auth-probe", "warn", `probe unknown -> pin switchStatus=unauthorized (no recovery path) app=${applicationId}`);
		industryStore.setState({ switchStatus: "unauthorized" });
		return;
	}
	const store = industryStore.getState();
	if (store.switchStatus === "ready") return;
	if (store.selectedTemplateId !== selectedId) return;
	const snapshot = [...state.recentSnapshots, ...state.sectionSnapshots].find((item) => item.template.templateId === selectedId);
	const template = store.templates.find((item) => item.templateId === selectedId);
	const context = matchingContext(template, snapshot?.context);
	if (!template || !context) {
		writeRendererLog("industry-auth-probe", "warn", `probe authorized but no matching context snapshot, keep switchStatus=${store.switchStatus} app=${applicationId}`);
		return;
	}
	writeRendererLog("industry-auth-probe", "info", `probe authorized -> restore switchStatus=ready + currentContext app=${applicationId}`);
	industryStore.setState({
		currentContext: context,
		switchStatus: "ready"
	});
}
var init_industry_hydrate = __esmMin((() => {
	init_src();
	init_i18n();
	init_log_sink();
	init_buddy_app_catalog();
	init_industry_persistence();
	init_industry_store();
	init_probe_selected_buddy_authorization();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/industry-preview-coordinator.tsx
function waitForIndustryReady(isCancelled) {
	const startedAt = Date.now();
	return new Promise((resolve) => {
		const tick = () => {
			if (isCancelled()) {
				resolve(false);
				return;
			}
			if (industryStore.getState().selectionHydrated) {
				resolve(true);
				return;
			}
			if (Date.now() - startedAt >= READY_TIMEOUT_MS) {
				resolve(false);
				return;
			}
			window.setTimeout(tick, READY_POLL_MS);
		};
		tick();
	});
}
function IndustryPreviewCoordinator() {
	const host = useModuleHost();
	const { t, locale } = useI18n();
	const hostRef = (0, import_react$1.useRef)(host);
	hostRef.current = host;
	const tRef = (0, import_react$1.useRef)(t);
	tRef.current = t;
	const localeRef = (0, import_react$1.useRef)(locale);
	localeRef.current = locale;
	(0, import_react$1.useEffect)(() => {
		if (!isWorkBuddyDesktop()) return;
		let cancelled = false;
		const openPendingDeeplink = async (url) => {
			const parsed = parseBuddyAppDeeplink(url);
			if (!parsed) return;
			if (!await waitForIndustryReady(() => cancelled) || cancelled) return;
			enterIndustryPreviewMode(parsed.applicationId);
			const template = await startEnsureBuddyApplication(parsed.applicationId);
			if (cancelled) return;
			if (!template) {
				console.warn("[Industry] preview open mapped empty template", { applicationId: parsed.applicationId });
				exitIndustryPreviewMode();
				message.error(tRef.current("buddyApp.preview.openFailed"));
				return;
			}
			const english = localeRef.current.toLowerCase().startsWith("en");
			if (!await switchBuddyApp({
				template,
				english,
				translate: tRef.current,
				onCommitted: () => goHomeAfterBuddySwitch(hostRef.current.navigation)
			})) exitIndustryPreviewMode();
		};
		const unsubscribe = subscribePendingBuddyAppDeeplinkUrl((url) => {
			openPendingDeeplink(url).catch(() => {
				exitIndustryPreviewMode();
			});
		});
		return () => {
			cancelled = true;
			unsubscribe();
		};
	}, []);
	return null;
}
var import_react$1, READY_POLL_MS, READY_TIMEOUT_MS;
var init_industry_preview_coordinator = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_common();
	init_ensure_buddy_application();
	init_go_home_after_buddy_switch();
	init_industry_preview_deeplink_store();
	init_industry_preview_mode();
	init_industry_store();
	init_parse_buddy_preview_deeplink();
	init_switch_buddy_app();
	READY_POLL_MS = 50;
	READY_TIMEOUT_MS = 3e4;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/load-i18n-messages.ts
function normalizeMessages(source) {
	if (!source || typeof source !== "object") return {};
	const result = {};
	for (const [key, value] of Object.entries(source)) if (typeof value === "string") result[key] = value;
	return result;
}
function pickLocaleMessages(payload, config) {
	if (!payload || typeof payload !== "object") return {};
	const currentLocale = getLocale();
	const candidates = [
		currentLocale,
		currentLocale.toLowerCase(),
		config.i18n.defaultLocale,
		config.i18n.defaultLocale?.toLowerCase(),
		config.i18n.fallbackLocale,
		config.i18n.fallbackLocale?.toLowerCase(),
		"zh-CN",
		"zh-cn",
		"en"
	].filter(Boolean);
	const source = payload;
	for (const key of candidates) {
		const messages = normalizeMessages(source[key]);
		if (Object.keys(messages).length > 0) return messages;
	}
	return normalizeMessages(source);
}
/**
* 加载行业模板 i18n messages。
*
* 远端 `i18n.source` 可能是第三方 CDN / 静态站，不依赖登录态；
* 因此必须使用 `credentials: 'omit'`，避免跨域带 cookie 触发 CORS 失败。
*/
async function loadI18nMessages(config) {
	if (!config) return {};
	const source = config.i18n?.source;
	if (!source) return {};
	if (typeof source !== "string") return pickLocaleMessages(source, config);
	const url = source.trim();
	if (!url) return {};
	const response = await fetch(url, { credentials: "omit" });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return pickLocaleMessages(await response.json(), config);
}
var init_load_i18n_messages = __esmMin((() => {
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/resolve-preferred-selected-id.ts
function prepareIndustryMemoryForIncomingAccount(storageReadyRef) {
	storageReadyRef.current = false;
	industryStore.setState({ selectionHydrated: false });
	clearIndustrySelection();
}
var init_resolve_preferred_selected_id = __esmMin((() => {
	init_industry_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/industry/industry-config-provider.tsx
function buildBinding(selectedTemplate, currentContext) {
	if (!selectedTemplate) return;
	return {
		templateId: selectedTemplate.templateId,
		applicationId: selectedTemplate.applicationId,
		schemaVersion: selectedTemplate.schemaVersion,
		templateVersion: selectedTemplate.templateVersion,
		requiredScopes: selectedTemplate.requiredScopes,
		allowedOrigins: selectedTemplate.allowedOrigins,
		context: currentContext
	};
}
/** IndustryConfigProvider — 拉取行业模板并同步当前选择。 */
function IndustryConfigProvider() {
	const host = useModuleHost();
	useAppSwitchKeyBridge();
	const userId = host.accountInfo?.userId;
	const personalSkills = useAgentServices()?.personalSkills;
	const selectedTemplateId = useIndustryStore((state) => state.selectedTemplateId);
	const selectedTemplate = useIndustryStore((state) => state.templates.find((item) => item.templateId === state.selectedTemplateId));
	const currentContext = useIndustryStore((state) => state.currentContext);
	const selectionHydrated = useIndustryStore((state) => state.selectionHydrated);
	const selectedConfig = useIndustryStore(getSelectedIndustryConfig);
	const previewActive = useIndustryPreviewMode((state) => state.active);
	const { enabled: buddyAppFeatureEnabled, loading: buddyAppFeatureLoading } = useBuddyAppFeature();
	const mountedRef = (0, import_react.useRef)(true);
	const storageReadyRef = (0, import_react.useRef)(false);
	const persistGenerationRef = (0, import_react.useRef)(0);
	const hydratedRef = (0, import_react.useRef)(false);
	const lifecycleGenerationRef = (0, import_react.useRef)(0);
	const baselineGenerationRef = (0, import_react.useRef)(0);
	const previousUserIdRef = (0, import_react.useRef)(userId);
	const persistedTemplateIdRef = (0, import_react.useRef)(null);
	const persistedIndustryModeRef = (0, import_react.useRef)(void 0);
	const hydrateAndLoadTemplates = (0, import_react.useCallback)(async (generation, uid) => {
		if (!uid) {
			storageReadyRef.current = false;
			seedIndustryStoreFromDisk({
				savedId: null,
				recentSnapshots: [],
				sectionSnapshots: []
			}, uid);
			hydratedRef.current = true;
			industryStore.setState({ selectionHydrated: true });
			return;
		}
		let disk = {
			savedId: null,
			recentSnapshots: [],
			sectionSnapshots: []
		};
		let readFailed = false;
		try {
			if (await waitForBoundUserStorage({ isStale: () => !mountedRef.current || generation !== lifecycleGenerationRef.current }) === "stale") return;
			disk = await readIndustryDiskState();
		} catch (error) {
			readFailed = true;
			console.warn("[Industry] read cached template failed:", error instanceof Error ? error.message : String(error));
		}
		if (!mountedRef.current || generation !== lifecycleGenerationRef.current) return;
		storageReadyRef.current = !readFailed;
		seedIndustryStoreFromDisk(disk, uid);
		hydratedRef.current = true;
		await restoreBuddyAuthorizationOrExit(disk, () => !mountedRef.current || generation !== lifecycleGenerationRef.current);
		if (!mountedRef.current || generation !== lifecycleGenerationRef.current) return;
		industryStore.setState({ selectionHydrated: true });
	}, []);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		const generation = ++lifecycleGenerationRef.current;
		if (userId) industryStore.setState({ selectionHydrated: false });
		hydrateAndLoadTemplates(generation, userId);
		return () => {
			mountedRef.current = false;
			lifecycleGenerationRef.current += 1;
		};
	}, [hydrateAndLoadTemplates]);
	(0, import_react.useEffect)(() => {
		if (previousUserIdRef.current === userId) return;
		previousUserIdRef.current = userId;
		persistGenerationRef.current += 1;
		persistedTemplateIdRef.current = null;
		persistedIndustryModeRef.current = void 0;
		prepareIndustryMemoryForIncomingAccount(storageReadyRef);
		syncIndustryBuddyScopeToDaemon({}).catch((error) => {
			console.warn("[Industry] clear Buddy scope on account switch failed:", String(error));
		});
		syncBuddyTelemetryContext(buildBuddyTelemetryContext(GENERAL_TEMPLATE_ID));
		host.navigation.goHome();
		const generation = ++lifecycleGenerationRef.current;
		if (!userId) {
			seedIndustryStoreFromDisk({
				savedId: null,
				recentSnapshots: [],
				sectionSnapshots: []
			}, userId);
			industryStore.setState({ selectionHydrated: true });
			return;
		}
		hydrateAndLoadTemplates(generation, userId);
	}, [
		host.navigation,
		hydrateAndLoadTemplates,
		userId
	]);
	(0, import_react.useEffect)(() => {
		if (!userId || !storageReadyRef.current || !selectionHydrated) return;
		if (selectedTemplateId !== industryStore.getState().selectedTemplateId) return;
		persistGenerationRef.current += 1;
		const generation = persistGenerationRef.current;
		const isStale = () => persistGenerationRef.current !== generation;
		const desiredTemplate = industryStore.getState().templates.find((item) => item.templateId === selectedTemplateId);
		syncBuddyTelemetryContext(buildBuddyTelemetryContext(selectedTemplateId, desiredTemplate));
		const scope = buildIndustryBuddyScope(selectedTemplateId);
		const persistMode = scope.mode === "dev" ? "dev" : void 0;
		const notifyPersisted = () => {
			if (isStale()) return;
			if (persistedTemplateIdRef.current === selectedTemplateId && persistedIndustryModeRef.current === persistMode) return;
			persistedTemplateIdRef.current = selectedTemplateId;
			persistedIndustryModeRef.current = persistMode;
			notifySelectedTemplatePersisted(selectedTemplateId, persistMode);
		};
		const syncConnectors = () => syncIndustryBuddyScopeToDaemon(scope, isStale).then(notifyPersisted);
		if (isDebugTemplateId(selectedTemplateId) || previewActive) {
			const persistDebugId = isAdoptedDebugTemplateId(selectedTemplateId) && !previewActive ? () => saveSelectedTemplateId(selectedTemplateId, isStale) : () => Promise.resolve();
			syncConnectors().then(() => {
				if (isStale()) return;
				return persistDebugId();
			}).catch((error) => {
				console.warn("[Industry] save debug template id failed:", String(error));
			});
			return;
		}
		syncConnectors().then(() => {
			if (isStale()) return;
			return saveSelectedTemplateId(selectedTemplateId, isStale);
		}).catch((error) => {
			console.warn("[Industry] save selected template failed:", String(error));
		});
	}, [
		previewActive,
		selectedTemplateId,
		selectionHydrated,
		userId
	]);
	(0, import_react.useEffect)(() => {
		if (buddyAppFeatureLoading) return;
		if (buddyAppFeatureEnabled) return;
		if (!hydratedRef.current) return;
		if (selectedTemplateId === "__general__") return;
		clearIndustrySelection();
	}, [
		buddyAppFeatureEnabled,
		buddyAppFeatureLoading,
		selectedTemplateId
	]);
	(0, import_react.useEffect)(() => {
		setForceHiddenNavKeys(resolveBuddyAppForceHiddenNavKeys(selectedTemplateId));
	}, [selectedTemplateId]);
	(0, import_react.useEffect)(() => () => setForceHiddenNavKeys([]), []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const generation = ++baselineGenerationRef.current;
		const config = selectedConfig;
		const template = selectedTemplate;
		const context = currentContext;
		(async () => {
			let messages = {};
			try {
				messages = await loadI18nMessages(config);
			} catch (error) {
				console.warn("[Industry] load i18n failed:", String(error));
				messages = {};
			}
			if (cancelled || generation !== baselineGenerationRef.current) return;
			industryStore.setState({ i18nMessages: messages });
			const translate = (key) => resolveIndustryText(key, messages);
			setBaselineMenus(buildIndustryRawMenus(config?.ui?.nav?.items, translate, buildBinding(template, context)));
		})();
		return () => {
			cancelled = true;
		};
	}, [
		currentContext,
		selectedConfig,
		selectedTemplate
	]);
	(0, import_react.useEffect)(() => onLocaleChange(() => {
		const generation = ++baselineGenerationRef.current;
		const state = industryStore.getState();
		const config = getSelectedIndustryConfig(state);
		const template = state.templates.find((item) => item.templateId === state.selectedTemplateId);
		loadI18nMessages(config).then((messages) => {
			if (generation !== baselineGenerationRef.current) return;
			industryStore.setState({ i18nMessages: messages });
			setBaselineMenus(buildIndustryRawMenus(config.ui?.nav?.items, (key) => resolveIndustryText(key, messages), buildBinding(template, state.currentContext)));
		}).catch(() => {
			if (generation !== baselineGenerationRef.current) return;
			industryStore.setState({ i18nMessages: {} });
			setBaselineMenus(buildIndustryRawMenus(config.ui?.nav?.items, (key) => resolveIndustryText(key, {}), buildBinding(template, state.currentContext)));
		});
	}), []);
	const enterpriseId = host.accountInfo?.enterpriseId ?? "";
	(0, import_react.useEffect)(() => {
		setModelAvailabilityPolicy({
			allowedModelIds: resolveBuddyAppAllowedModelIds(selectedConfig?.models?.allowedModelIds, isIOAUser(enterpriseId)),
			customModelsDisabled: resolveIndustryCustomModelsDisabled(selectedConfig?.models),
			inBuddyApp: selectedTemplateId !== GENERAL_TEMPLATE_ID
		});
	}, [
		enterpriseId,
		selectedConfig?.models?.allowedModelIds,
		selectedConfig?.models?.custom?.disabled,
		selectedTemplateId
	]);
	(0, import_react.useEffect)(() => () => resetModelAvailabilityPolicy(), []);
	(0, import_react.useEffect)(() => {
		const applicationId = currentContext?.applicationId || selectedTemplate?.applicationId;
		if (!applicationId || selectedTemplateId === "__general__") return;
		ensureBuddySceneSkills({
			applicationId,
			resourceSnapshotKey: selectedTemplate ? resourceSnapshotKeyForTemplate(selectedTemplate, selectedConfig) : void 0,
			config: selectedConfig,
			personalSkills
		}).then(() => notifySkillListRefresh()).catch(() => void 0);
	}, [
		currentContext?.applicationId,
		personalSkills,
		selectedConfig,
		selectedTemplate?.applicationId,
		selectedTemplateId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryJsonDebugger, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryPreviewCoordinator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuddyDeeplinkCoordinator, {})
	] });
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_model_availability_policy();
	init_use_buddy_app_feature();
	init_i18n();
	init_app_providers();
	init_account();
	init_client_menu();
	init_common();
	init_high_risk_notification_store();
	init_app_switch_key();
	init_buddy_deeplink_coordinator();
	init_buddy_resource_snapshot_key();
	init_buddy_telemetry_context_sync();
	init_ensure_buddy_scene_skills();
	init_hooks();
	init_industry_buddy_scope_sync();
	init_industry_debug_template();
	init_industry_hydrate();
	init_industry_json_debugger();
	init_industry_nav();
	init_industry_persistence();
	init_industry_preview_coordinator();
	init_industry_preview_mode();
	init_industry_store();
	init_load_i18n_messages();
	init_resolve_preferred_selected_id();
	init_selected_template_persisted();
	init_wait_for_bound_user_storage();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { IndustryConfigProvider };
