const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./miniprogram-DEOo2dkT.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./miniprogram-qrcode-preview-DsOZkxcK.js","./miniprogram-qrcode-preview-BPXDUVFM.css","./miniprogram-Disf24ew.css","./use-upload-queue-DwfNivwj.js","./locale-utils-TanlkH9x.js","./locale-utils-DQSZKef0.css","./space-utils-DG6Tz1-K.js","./store-B9VMId-K.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, $3 as extractRelativePath, $B as init_icons, $X as useHtmlPreviewShareFeature, $i as useQrcodeDialog, $r as WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, $t as clearQuickAskQueries, $u as reportCanvasOpenAttempt, A9 as WbLexiangIcon, AP as resolveSitesPreviewUrl, Aat as init_react_error_boundary_esm, Ay as init_expert, BM as useTencentLexiangEnabled, BP as init_perf_tracker, Brt as BrowserPreviewContextProvider, Bu as isOpenableOnlineTabUrl, C as useFileViewerPageShow, C8 as notifyDocumentPreviewAutoSaved, CP as getHtmlArtifactPreviewUrl, CQ as useEffectiveEdition, Cz as isWorkingStatus, DP as normalizeHtmlBasename, DQ as init_tencent_docs_url, Dc as init_mcp_app_panel_replay, Dr as shouldBypassTencentDocsLinkInterceptForOpenExternal, Du as scheduleArdotForcedOnboardingClear, Dz as useAssistantDisplay, E as init_contexts, E1 as init_useI18n, Er as resolveDetailPanelDocumentTabTarget, Eu as init_forced_onboarding_store, F as useUILayoutStateOptional, F0 as arrayBufferToBase64, F6 as init_src$2, FG as useRouterContextSafe, FK as init_conversations, FP as init_cloud_sandbox_preview_url, Fc as openPersistedMcpAppView, Fd as init_use_lexiang_library_mode, Fk as extensionStore, Get as ShareIcon, Gu as extractConversationTelemetryInfo, H6 as notifyTencentDocsPreviewReload, HP as perfInc, Ho as init_use_ardot_enterprise_onboarding, Hrt as useBrowserPreview, Hu as isSpaceUrl, I0 as fetchRemoteArtifactFile, I6 as init_upload_targets$1, IP as isSandboxFilePath, Id as useLexiangLibraryMode, Iet as SpaceLibraryIcon, Ik as init_extension_menu_hook, In as ensureLocalDocsSavedBeforeExternalAction, J0 as init_wb, J3 as useConversations, JM as useKnowledgeBaseFeature, JP as init_app_artifact, JT as init_user_attachment_preview, Jb as useExpertApi, Jr as notifyLocalFileOpenConflictUi, K2 as init_environment, KJ as useLocale, KM as useTencentDocsKnowledgeFeature, Ku as init_canvas_telemetry, L0 as init_artifact_remote_download, L3 as init_account_context, L6 as resolvePersonalUploadTargets, LP as normalizeSandboxFilePath, Lk as useExtensionArtifactPreviews, M9 as WbImaIcon, MP as shouldSkipBrowserPreview, Mn as init_tencent_docs, Mv as init_plan_upgrade, N1 as onLocaleChange, N4 as FONT_SIZE_OFFSET_MAP, NP as getCloudSandboxDocType, Nn as init_local_file_open, Nnt as ChevronLeftIcon, O1 as useTranslation, O4 as getSavedFontSizeLevel, O7 as Tag, OQ as isInPlaceCreateFileUrl, Oc as resolvePersistedMcpAppPanelReplay, Ok as useAccountScopedWebviewPartition, Or as tryFocusExistingTencentDocsPreview, Ou as useArdotForcedOnboarding, P4 as init_types$2, P9 as WbDocsQqIcon, PP as getFileName, Pn as ensureOrphanPreviewReconcile, Prt as Frame, Pv as openPlanUpgrade, Q as init_app_providers, Q2 as isOverseas, Q9 as WbChevronRightIcon, QG as init_telemetry$1, QW as ImaDirSelector, Qd as init_selection_quote, Qi as init_use_qrcode_dialog, Qr as normalizeMainWindowLocalFilePath, Qu as reportCanvasGenerateApp, R0 as init_renderer, R3 as useAccount, RN as init_context_override, RP as init_artifact_path_identity, Rk as useExtensionStoreStatus, S as init_use_file_viewer_page_show, S1 as useTheme, S7 as Loading, S8 as notifyDocumentClientSaved, SN as markLastDetailPreviewNone, SQ as init_use_is_enterprise_admin, Sr as focusOrOpenTencentDocsPreview, T0 as init_app_core, T1 as init_clipboard, TQ as useIsInternalIOAAccount, Tr as resolveDetailPanelDocumentTabClose, Tu as cancelArdotForcedOnboardingClear, Tz as init_use_assistant_display, U3 as ConversationsContext, UP as perfSample, UR as useTencentDocsFacade, Uo as useArdotEnterpriseOnboarding, Uu as withWorkBuddyChatPreviewScene, V0 as findExtensionTrustedUrlEntry, V3 as useAdapter, V8 as setOfficePreviewSizeLimitOverrides, VR as init_services, Vn as preflightSessionLocalDocumentOpen, Vu as isSameOnlineTabUrl, WM as init_use_tencent_docs_knowledge_feature, XU as taskStarterCwd$, Xu as reportCanvasEdit, Y3 as useFileTreeState, YP as isWbAppArtifact, YT as isSafeUserAttachmentUrl, Yu as reportCanvasCollapse, Z3 as useMcpAppsStatus, Z8 as useDocumentPreviewHostLifecycle, ZT as readUserAttachmentUrl, Zt as QuickAskConversationView, Zu as reportCanvasExpand, _2 as ConversationEvent, _O as init_task_starter_store, _i as extractFileExtension, a1 as useLatestRef, aE as openLoginExpiredDialog, ad as init_common, b0 as writeRendererLog, b5 as Alert, bE as init_errors, bP as checkLocalFileOpenAllowed, bQ as init_use_ima_enabled, c7 as Modal, cU as reportSaveToTdocConfirm, cZ as useShareFeature, ck as init_genie_embed, cl as toolRendererRegistry, cu as getToolIcon, dZ as useSpaceFeature, da as reportKnowledgeUploadFailure, dr as useCloudSandboxPreviewRegistration, ed as reportCanvasRefresh, ei as WORKBUDDY_JUMP_TO_CONVERSATION_REASONS, et as useAgentServices, f0 as useOptionalModuleHost, f3 as wb$1, fB as SingleServiceOnboardingPanel, fG as useOneidApplications, fc as init_persisted_open_pending, fk as GENIE_BUTTON, gO as expertTeamMemberAvatars$, hk as GENIE_LINK_TYPE, i1 as init_use_latest_ref, i5 as PencilIcon, iK as reportSaveToImaSuccess, iU as init_telemetry$2, iZ as useMioraArtifactShareFeature, ia as handleWxShare, ii as resolveDocumentPreviewSessionId, il as init_tools, iw as init_artifact_drag_resolver, j1 as init_i18n, j4 as init_font_size, jQ as shouldOpenTencentDocsPreviewLinkExternally, jY as init_product_features, jt as init_conversation, k1 as getLocale, kP as resolveEditableHtmlTarget$1, kQ as isTencentDocsUrl, kat as ErrorBoundary, kc as init_services$1, kr as getLocalSdkDocumentPath, krt as Button, lG as findOneidApp, m5 as init_src$1, mG as init_router, mO as expertCreated$, n1 as init_use_poll_scheduler, n5 as MoreIcon, n6 as getArtifactFilePath, nK as reportSaveToImaBtn, na as handleCopyQRCode, ni as init_jump_to_conversation_payload, o5 as WbAppFileIcon, o6 as init_file_path, oK as init_use_ima_api, ol as resolveToolExplanation, ou as getMcpAppsCoordinator, pB as init_single_service_panel, pc as openHistoricalMcpAppArtifact, pk as GENIE_EMBED_EVENT, q0 as init_bridge_host, qM as init_use_knowledge_base_feature, qP as getWbAppArtifactData, qet as ShareCopyIcon, qr as init_open_conflict_ui_coordinator, r1 as usePollScheduler, r5 as OpenFolderIcon, r6 as getArtifactRelativePath, rC as useOpenImaUploadResult, rE as init_auth_expired_detector, rK as reportSaveToImaConfirm, ra as handleSaveQRCode, rw as createArtifactDragResolver, sK as useImaApi, sU as reportSaveToTdocBtn, sa as init_share_platform_helpers, tC as init_ima, ta as generateShareQRCode, tf as buildSelectionQuotePhraseBlock, ti as WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES, tt as useAppProviders, uG as init_use_oneid_applications, uU as reportSaveToTdocSuccess, ua as init_knowledge_upload_error, uk as useGenieEmbedTelemetry, vE as extractErrorMessage, vi as init_doc_artifact_source, w1 as copyToClipboard, w3 as useNavigate, wP as init_html_artifact_preview, wQ as useIsEnterpriseEdition, wq as useAgentTelemetry, wr as isSameTencentDocsPreviewTarget, x1 as init_useTheme, xN as init_session_detail_restore, xO as skipAutoSelectWorkspaceForExpertInvoke$, xP as init_workspace_file_guard, xQ as useImaEnabled, xq as init_telemetry, xr as extractTencentDocsPreviewFileId, xz as init_agent_status, y8 as DetailPanel, yO as pendingExpertModeActivation$, yZ as useWechatShareFileFeature, yi as resolveDocArtifactSource, ynt as CloudDatabaseIcon, yr as confirmDetailPanelTabActivation, zM as init_use_tencent_lexiang_enabled, zN as resolveFileTreeState, zP as isLocalFilePreviewId, zZ as init_http_logger, zk as useExtensionTrustedUrls, zu as init_space_url } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, D as ShareChannelButtons, Dv as require_dist, Ei as toast, Ev as require_react, Ia as IconButton, Kh as require_react_dom, Ov as __vitePreload, Ra as Button$1, Tv as require_jsx_runtime, Ul as require_client, Yl as init_lucide_react, eu as X, hn as Dropdown, ip as Check, ji as ConfirmDialog, kv as init_preload_helper, mu as TriangleAlert, t as init_src$3, x as QrcodeFallbackDialog } from "./lib-chat-ui-D8Ji0f8n.js";
import { Et as isArdotArtifactIcon, St as extractArdotCanvasFileId, Tt as init_ardot_canvas, _t as useArdotAuth, ut as init_src$4, wt as extractArdotOpenDesignFileId } from "./ui-ardot-OEUzH9ni.js";
import { J as createNetDriveServiceStore, Q as init_netdrive_service, St as mascot_new_default, at as showStorageQuotaExceededDialog, ct as init_share_client_metric, it as init_storage_quota_exceeded_dialog, ot as createShareClientStageTimer, st as createShareClientTrace, xt as init_mascot_new } from "./locale-utils-TanlkH9x.js";
import { r as useColleagueDocumentPreview, t as init_use_colleague_document_preview } from "./use-colleague-document-preview-DuUZkqLA.js";
import { _ as SessionBrowserViewSlot, a as openPublishedArtifactInInternalBrowser, d as init_quick_ask_session_state, h as selectQuickAskSessionsForHost, i as init_internal_browser_open, m as resolveActiveQuickAskIdForHost, n as init_read_allowed_dirs, t as buildReadAllowedDirsOption, v as init_session_browser_view_host, y as useSessionBrowserView } from "./read-allowed-dirs-DYVsN0s1.js";
import { n as ExtensionMount, r as init_extension_mount, t as ExtensionIframeHost } from "./extension-mount-Bz15qT_r.js";
import { a as init_error_boundary, i as ErrorBoundary$1, o as init_use_private_host, r as useTencentDocsLinkHandler, s as usePrivateHost, t as init_link_handler } from "./link-handler-DFiXCRGF.js";
import { a as init_use_tencent_netdrive_knowledge_feature, n as NetDriveStoreProvider, r as init_netdrive_store_context, s as useTencentNetDriveKnowledgeFeature } from "./cloud-file-constants-C-3tulP1.js";
import { a as reportHtmlDetailPageExpo, c as reportHtmlRefreshClick, d as describeSelectionQuoteConversationMiss, f as init_selection_quote_conversation_input, i as init_html_editor_telemetry, l as ensureReporter, m as trySendSelectionQuoteToCurrentConversation, n as HtmlEditorPanel, o as reportHtmlEditSession, p as tryInsertBlocksIntoCurrentConversation, s as reportHtmlEnterEdit, t as init_html_editor, u as init_reporter } from "./html-editor--LQ95SK5.js";
import { c as probeAppApiCall, d as init_use_sites_page_show, f as useSitesPageShow, i as createStorageApiClient, l as probeAppView, n as CloudServiceManager, o as init_app_api_probe, s as probeAppApi, t as init_cloud_service, u as resolveAppApiKind } from "./cloud-service-BFhTyraS.js";
import { T as useProjectInput, c as useLibraryUpload, s as init_use_library_upload, t as init_knowledge_base_panel, v as init_telemetry$3, w as init_project_input_context, y as reportSaveToMyfileSuccess } from "./knowledge-base-panel-FcaY2fds.js";
import { B as init_markdown_image_uploader, F as init_publish_utils, H as preprocessMarkdownImagesWithBackend, M as computeBlobHash, N as getPublishCache, P as getPublishedLocalHash, R as removePublishCache, V as isMarkdownPath, b as init_mime_utils, h as UploadModal, j as buildHtmlUpload, m as init_upload_modal, n as FolderPickerModal, y as getMimeTypeFromFilename, z as savePublishCache } from "./folder-picker-modal-C_2cTFqD.js";
import { i as init_store, t as createMyFilesStore } from "./store-B9VMId-K.js";
import { n as init_lexiang_content_picker, t as LexiangContentPicker } from "./lexiang-content-picker-Bo09zMCt.js";
import { m as syncTencentDocsThemeCookie, p as init_tencent_docs_theme_cookie } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
import { n as useDescribeUploadError, t as init_use_describe_upload_error } from "./use-describe-upload-error-ByWPb4un.js";
//#region ../../packages/workbuddy-extensions/src/common/types.ts
var init_types$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-extensions/src/common/contribution-match.ts
/**
* 判断一个候选贡献点的 `match` 是否命中当前 artifact 上下文。
*
* @param match - 作者声明的匹配条件；`undefined` / `{}` 视为兜底（永远命中）
* @param context - 宿主提取的 artifact 上下文
* @returns 命中返回 true
*
* @example
* ```ts
* matchesContribution({ fileType: 'pdf' }, { fileType: 'pdf' })                 // true
* matchesContribution({ fileType: ['pdf', 'docx'] }, { fileType: 'docx' })      // true
* matchesContribution({ bizType: 'mcp/app', fileType: 'html' }, { bizType: 'mcp/app' }) // false（fileType 缺失）
* matchesContribution(undefined, { fileType: 'pdf' })                            // true（兜底）
* ```
*/
function matchesContribution(match, context) {
	if (!match || match.bizType === void 0 && match.fileType === void 0) return true;
	if (match.bizType !== void 0) {
		if (!matchesValue(match.bizType, context.bizType)) return false;
	}
	if (match.fileType !== void 0) {
		const normalizedCtx = normalizeFileType(context.fileType);
		if (!matchesValue(match.fileType, normalizedCtx, normalizeFileTypeNonNull)) return false;
	}
	return true;
}
/**
* 从 URL 或文件名提取"文件后缀"，规范化为无点小写字符串。
*
* 宿主消费面通常这样组装 `ContributionMatchContext`：
* ```ts
* const context: ContributionMatchContext = {
*     bizType: artifact.customType ?? artifact.type,
*     fileType: extractFileType(artifact.filename ?? artifact.url),
* };
* ```
*
* @param source - 文件名或 URL；`undefined` 时返回 `undefined`
* @returns 无点小写后缀（如 `'pdf'`），无后缀或非法输入返回 `undefined`
*
* @example
* ```ts
* extractFileType('report.PDF')                        // 'pdf'
* extractFileType('https://cdn.example.com/a.docx?x')  // 'docx'
* extractFileType('folder/README')                     // undefined
* ```
*/
function extractFileType(source) {
	if (!source) return;
	let pathname = source;
	const queryIdx = pathname.search(/[?#]/);
	if (queryIdx >= 0) pathname = pathname.slice(0, queryIdx);
	const lastSlash = pathname.lastIndexOf("/");
	const basename = lastSlash >= 0 ? pathname.slice(lastSlash + 1) : pathname;
	const lastDot = basename.lastIndexOf(".");
	if (lastDot <= 0 || lastDot === basename.length - 1) return;
	return basename.slice(lastDot + 1).toLowerCase();
}
/**
* 单字段匹配 —— 字符串 / 字符串数组 vs 单个上下文值。
* 数组内 OR；上下文缺失时永远不命中（此时该字段被作者声明为必须匹配却拿不到值）。
*/
function matchesValue(declared, actual, normalize = defaultNormalize) {
	if (actual === void 0 || actual === "") return false;
	const normalizedActual = normalize(actual);
	const list = Array.isArray(declared) ? declared : [declared];
	for (const item of list) if (normalize(item) === normalizedActual) return true;
	return false;
}
/** bizType 默认规范化 —— 只小写去空格，保留 `/` 等分隔符（`mcp/app` 保持原样） */
function defaultNormalize(value) {
	return value.trim().toLowerCase();
}
/** fileType 规范化（可空版本）：给上下文值用，空/无值时返回 undefined */
function normalizeFileType(value) {
	if (value === void 0) return;
	return normalizeFileTypeNonNull(value);
}
/** fileType 规范化（非空版本）：去前导点、小写、去空格 —— 允许作者写 `'.pdf'` / `'PDF'` */
function normalizeFileTypeNonNull(value) {
	const trimmed = value.trim().toLowerCase();
	return trimmed.startsWith(".") ? trimmed.slice(1) : trimmed;
}
var init_contribution_match = __esmMin((() => {}));
var init_transport_process = __esmMin((() => {
	require_dist();
	init_wb();
}));
//#endregion
//#region ../../packages/workbuddy-extensions/src/bridge/index.ts
var init_bridge = __esmMin((() => {
	init_bridge_host();
	init_transport_process();
	init_wb();
}));
//#endregion
//#region ../../packages/workbuddy-extensions/src/index.ts
var init_src = __esmMin((() => {
	init_types$1();
	init_contribution_match();
	init_renderer();
	init_bridge();
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/quick-ask-session-archive.ts
/**
* 归档一条划词临时会话，并丢弃它尚未发出的追加提问。
*
* **不阻塞调用方**：归档失败（会话已被删、daemon 未就绪等）时 Tab 也必须照常关掉
* —— 卡住 Tab 对用户毫无帮助，而列表隐藏另有 tags 过滤兜底。因此不返回 Promise，
* 调用方不需要 await，也不该据此决定要不要移除条目。
*
* `conversationId` 为空表示会话还没建出来（create 在飞行中）：此时没有可归档的
* 东西，但 Tab 条目仍应由调用方移除。
*/
function archiveQuickAskConversation(conversationId, conversations) {
	if (!conversationId) return;
	clearQuickAskQueries(conversationId);
	Promise.resolve(conversations?.archive?.(conversationId)).catch(() => void 0);
}
var init_quick_ask_session_archive = __esmMin((() => {
	init_conversation();
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-artifact-preview-slot.tsx
/**
* 返回值签名跟 `ArtifactContentRendererProps.renderExtensionPreview` 完全对齐。
*
* 首次调用 hook 时 `entries` 会异步填充；期间返回 `null` 让内置分派兜住，避免闪烁。
*/
function useArtifactPreviewSlot() {
	const entries = useExtensionArtifactPreviews();
	return (0, import_react$21.useCallback)((context) => {
		const { artifact } = context;
		if (artifact.type !== "media-artifact") return null;
		const url = artifact.url;
		if (!url) return null;
		const anyArtifact = artifact;
		const matchCtx = {
			bizType: anyArtifact.customType ?? anyArtifact.type,
			fileType: extractFileType(anyArtifact.filename ?? anyArtifact.url)
		};
		const hit = pickFirst(entries, matchCtx);
		if (!hit) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ExtensionMount, {
			extensionId: hit.extensionId,
			contribution: {
				kind: "artifactPreview",
				id: hit.previewId,
				data: { artifact: url }
			}
		});
	}, [entries]);
}
/**
* 首次命中即返回 —— O(N) 遍历，N 通常 < 20。
*
* 未命中返回 undefined；命中但 match 是"catch-all"（缺省 / 空对象）的会兜到最后
* —— 由于 matchesContribution 对缺省 match 也返回 true，pickFirst 会把它们当兜底。
* 如果需要"具体规则 > 兜底"的优先级，就要求 extension 作者别声明 catch-all 或
* 未来改 pick 顺序为"先具体后兜底"。当前简化：作者应显式声明 match，避免误接管。
*/
function pickFirst(entries, ctx) {
	for (const entry of entries) if (matchesContribution(entry.match, ctx)) return entry;
}
var import_react$21, import_jsx_runtime$13;
var init_use_artifact_preview_slot = __esmMin((() => {
	init_src();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_extension_menu_hook();
	init_extension_mount();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/app-space.less
var init_app_space = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/types.ts
/** 供给是否仍在进行中（UI 应显示 loading 并轮询，而不是报错）。 */
function isProvisioning(status) {
	return status === "ordering" || status === "creating" || status === "configuring";
}
/** 读写是否会失败。`credits_exhausted` / `destroyed` 下不该再发起业务调用。 */
function isBillingBlocked(status) {
	return status === "credits_exhausted" || status === "destroyed";
}
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/utils/resolve-app-capabilities.ts
/**
* 「销毁云服务」入口是否该出现 —— **展示判定的唯一实现**。
*
* 单独导出而不是只留在 `resolveAppCapabilities` 里，是因为有第二个消费方：
* 设置 → 数据管理 → 发布的应用 → 云服务二级页的「销毁」按钮。那里只有一份
* 云服务状态、拿不到 release / isLocalAvailable，用不上完整 capabilities，
* 但**判定必须和应用空间的垃圾桶完全一致**（同一个按钮的两个入口）。
*
* **只看 `activated`，刻意不看计费 / 供给状态**：只要开通过就给入口，
* 详见 `AppCapabilities.canDeactivateCloudService` 的字段注释。
*/
function canDeactivateCloudService(cloudService) {
	return cloudService.activated;
}
/** 云服务处于该状态时，云端资源不可用，发布应被禁止。 */
function isCloudServiceBlocking(enabled, billingStatus) {
	if (!enabled) return false;
	return isBillingBlocked(billingStatus);
}
/**
* 计算发布类操作的禁用原因。
*
* 优先级：本地不可用 > 内容封禁 > 云服务不可用 > 发布中。
* 本地不可用排最前是因为它让「更新发布」从根上做不到（没有代码可传）。
*/
function resolvePublishDisabledReason(input) {
	const { release, cloudService, isLocalAvailable } = input;
	if (!isLocalAvailable) return "localUnavailable";
	if (release.status === "blocked") return "contentBlocked";
	if (isCloudServiceBlocking(cloudService.activated, cloudService.billingStatus)) return "cloudServiceUnavailable";
	if (release.status === "publishing") return "publishing";
}
function resolveReleaseBadge(status) {
	if (status === "never" || status === "unpublished") return;
	return status;
}
function resolveCloudServiceTag(enabled, billingStatus, provisionStatus) {
	if (!enabled) return;
	if (isProvisioning(provisionStatus)) return "provisioning";
	if (provisionStatus === "failed") return "destroyed";
	switch (billingStatus) {
		case "expiring": return "expiring";
		case "credits_exhausted": return "creditsExhausted";
		case "destroyed": return "destroyed";
		default: return;
	}
}
/**
* 由应用状态派生出全部可用能力。
*
* @example
* ```ts
* const caps = resolveAppCapabilities({
*     release: { status: 'published', shareLink: 'https://x.workbuddy.link' },
*     cloudService: { activated: true, billingStatus: 'credits_exhausted' },
*     isLocalAvailable: true,
* });
* caps.canPublish;              // false
* caps.publishDisabledReason;   // 'cloudServiceUnavailable'
* caps.canUnpublish;            // true —— 取消发布不受云服务状态影响
* ```
*/
function resolveAppCapabilities(input) {
	const { release, cloudService, isLocalAvailable } = input;
	const isPublished = release.status === "published";
	const hasShareLink = isPublished && Boolean(release.shareLink);
	const publishDisabledReason = resolvePublishDisabledReason(input);
	const canPublishAction = publishDisabledReason === void 0;
	return {
		canPreview: isLocalAvailable,
		canRefresh: isLocalAvailable,
		canPublish: canPublishAction && !isPublished,
		canUpdatePublish: canPublishAction && isPublished,
		canUnpublish: isPublished,
		publishDisabledReason,
		canDeactivateCloudService: canDeactivateCloudService(cloudService),
		canOpenInBrowser: hasShareLink,
		canCopyLink: hasShareLink,
		canShare: hasShareLink,
		showLink: hasShareLink,
		linkExpired: false,
		releaseBadge: resolveReleaseBadge(release.status),
		cloudServiceTag: resolveCloudServiceTag(cloudService.activated, cloudService.billingStatus, cloudService.provisionStatus)
	};
}
var init_resolve_app_capabilities = __esmMin((() => {
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/utils/use-app-data-dump.ts
function useAppDataDump({ app, release, releaseSource, cloudService, cloudServiceSource, capabilities }) {
	(0, import_react$20.useEffect)(() => {
		const holder = window;
		const dump = () => {
			const snapshot = {
				app: {
					data: app,
					source: "present_app_files(MOCK)"
				},
				release: {
					data: release,
					source: releaseSource
				},
				cloudService: {
					data: cloudService,
					source: cloudServiceSource
				},
				capabilities
			};
			console.info("[genie][MOCK] __genieAppData →", snapshot);
			return snapshot;
		};
		holder.__genieAppData = dump;
		return () => {
			delete holder.__genieAppData;
		};
	}, [
		app,
		release,
		releaseSource,
		cloudService,
		cloudServiceSource,
		capabilities
	]);
}
var import_react$20;
var init_use_app_data_dump = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/cloud-service-slot/resolve-cloud-service-state.ts
function resolveAppCloudServiceFromAvailability(availability) {
	const activated = availability.hasActiveCloudBinding;
	switch (availability.viewState) {
		case "provisioning": return {
			activated,
			provisionStatus: "creating"
		};
		case "provision_failed": return {
			activated,
			provisionStatus: "failed"
		};
		case "destroying": return {
			activated,
			provisionStatus: "destroying"
		};
		case "normal": return {
			activated,
			billingStatus: "normal"
		};
		case "expiring": return {
			activated,
			billingStatus: "expiring"
		};
		case "credits_exhausted_more_than_24h":
		case "credits_exhausted_less_than_24h":
		case "credits_exhausted_unknown_deadline": return {
			activated,
			billingStatus: "credits_exhausted"
		};
		case "destroyed_available":
		case "destroyed_quota_exhausted": return {
			activated,
			billingStatus: "destroyed"
		};
		default: return { activated };
	}
}
var init_resolve_cloud_service_state = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/cloud-service-slot/cloud-service-slot.tsx
var import_react$19, import_jsx_runtime$12, CloudServiceSlot;
var init_cloud_service_slot = __esmMin((() => {
	init_app_space();
	init_conversations();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_use_is_enterprise_admin();
	init_plan_upgrade();
	init_cloud_service();
	init_common();
	init_app_api_probe();
	init_resolve_cloud_service_state();
	import_jsx_runtime$12 = require_jsx_runtime();
	CloudServiceSlot = ({ appId, appName, appType, localDir, conversationId, initialModule, onCloudServiceStateChange, refreshToken }) => {
		const host = useOptionalModuleHost();
		const adapter = host?.adapter;
		const [conversationRefreshToken, setConversationRefreshToken] = (0, import_react$19.useState)(0);
		(0, import_react$19.useEffect)(() => {
			const sessionId = conversationId ?? host?.session.currentSessionId;
			if (!sessionId) return;
			const refresh = () => setConversationRefreshToken((value) => value + 1);
			const current = host?.wb.conversations.current;
			if (current?.info.id === sessionId) return current.on(ConversationEvent.StateChange, (_from, to) => {
				if (to === "idle" || to === "error" || to === "failed" || to === "terminated") refresh();
			});
			const handleFinalStop = (completedSessionId) => {
				if (completedSessionId === sessionId) refresh();
			};
			if (adapter?.onSessionFinalStop) return adapter.onSessionFinalStop(handleFinalStop);
			return adapter?.onStateChange?.((completedSessionId, notification) => {
				if ("event" in notification.update && notification.update.event === "stop") handleFinalStop(completedSessionId);
			});
		}, [
			adapter,
			conversationId,
			host
		]);
		/**
		* Storage 页面 Adapter 的后端 Client。
		*
		* 这个只能在 render 期给出（是组件的 prop），但风险与 Manager 自身一致 ——
		* `CloudServiceManager` 内部本来就会在 render 期建管理面 Client，
		* 所以这一层不额外引入新的 `wb` 时序约束。
		*/
		const storageClient = (0, import_react$19.useMemo)(() => createStorageApiClient(), []);
		const handleProvisionRequest = (0, import_react$19.useCallback)(async ({ action, applicationId }) => {
			const sessionId = conversationId ?? host?.session.currentSessionId;
			if (!sessionId) throw new Error("No conversation is available for the cloud-service request");
			const prompt = [{
				type: "text",
				text: `请为应用「${appName}」（applicationId: ${applicationId}）${action === "recreate" ? "重新开启" : "开启"}云服务，并完成现有代码的云服务接入。` + (localDir ? `应用源码目录：${localDir}。` : "") + "请使用 cloud-service 技能和 workbuddy_cloud_service 工具，复用此 applicationId 开通环境；开通成功后按技能文档接入 SDK，将应用现有的相关功能连接到真实云服务，并验证可用。"
			}];
			const current = host?.wb.conversations.current;
			if (current?.info.id === sessionId) {
				const result = await current.ui.input.sendPrompt({ blocks: prompt });
				if (!result.ok) throw new Error(result.error?.message ?? "Failed to send the cloud-service request");
			} else {
				if (!adapter?.requestSendPrompt) throw new Error("Conversation input is unavailable for the cloud-service request");
				adapter.requestSendPrompt({
					sessionId,
					prompt
				});
			}
			return "conversation";
		}, [
			adapter,
			appName,
			conversationId,
			host,
			localDir
		]);
		/**
		* 企业版（iOA / 旗舰版 / 专享版）不接个人版购买链路。
		*
		* 端内升级弹窗加载官网 `/pricing?embed=1`，那条链路只做**个人版订阅询价**
		* （`/billing/pay/get-price` 依赖个人计费体系）。企业账号不在该体系内，询价必然失败，
		* 弹窗的计费周期价格与订单金额都会空着（Issue #108353：4 个周期按钮价格全是 '-'）。
		* 与其让用户点进一个填不出价格的弹窗，不如**不给入口** —— 与设置页
		* `SubscriptionUsagePanel`（企业账号整页返回 null）、`PlanActionButton`
		* （非个人账号不渲染升级按钮）的既有口径一致。
		*/
		const isEnterpriseEdition = useIsEnterpriseEdition();
		/** 额度不足 / 耗尽时复用全局套餐升级入口，统一处理 Desktop、Web 与海外版。 */
		const handleUpgradeRequest = (0, import_react$19.useCallback)(() => {
			openPlanUpgrade({
				source: "cloud_service_quota",
				adapter
			});
		}, [adapter]);
		/**
		* ⚠️ 必须 `useCallback`：`CloudServiceManager` 内部把 `onAvailabilityChange` 放进
		* `useEffect` 依赖，写成内联箭头会让那个 effect 每帧重跑。
		*/
		const handleAvailabilityChange = (0, import_react$19.useCallback)((value) => {
			onCloudServiceStateChange?.(resolveAppCloudServiceFromAvailability(value));
		}, [onCloudServiceStateChange]);
		/**
		* 探针：交代这一页的内容**现在是真组件、数据来自控制面**。
		*
		* 这条日志原来说的是「渲染的是占位、真内容还没接」，现已反过来 —— 排查时看到它
		* 就知道页面上的状态是 `GET /control/cloud-services/status` 的结果，
		* 而不是产物上那份 mock 的 `app.cloudService`（后者只驱动工具条的状态标签）。
		*
		* 放 `useEffect`（依赖 `appId`）而不是 render 里：切页签/切应用才打一次，
		* 不会随重渲染反复打 —— 日志规范禁止热路径日志。
		*/
		(0, import_react$19.useEffect)(() => {
			probeAppView({
				view: "cloud-service-page",
				source: "CloudServiceManager(modules/cloud-service)",
				kind: "real",
				data: {
					appId,
					surface: "chat_application_space"
				}
			});
		}, [appId]);
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: "app-cloud-slot",
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CloudServiceManager, {
				applicationId: appId,
				applicationName: appName,
				applicationType: appType === "miniprogram" ? "wechat-mini-program" : "web",
				surface: "chat_application_space",
				defaultModule: initialModule ?? "database",
				storageClient,
				databaseWriteEnabled: true,
				onProvisionRequest: handleProvisionRequest,
				onUpgradeRequest: isEnterpriseEdition ? void 0 : handleUpgradeRequest,
				onAvailabilityChange: handleAvailabilityChange,
				refreshToken: `${refreshToken ?? ""}:${conversationRefreshToken}`,
				showExpiringBadge: false
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/miniprogram-publish-loader.ts
function getMiniprogramPublishLoader() {
	return modules["../../../miniprogram/index.ts"];
}
var modules;
var init_miniprogram_publish_loader = __esmMin((() => {
	init_preload_helper();
	modules = /* #__PURE__ */ Object.assign({ "../../../miniprogram/index.ts": () => __vitePreload(() => import("./miniprogram-DEOo2dkT.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]), import.meta.url) });
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/miniprogram-publish-slot.tsx
/** 快速加载时直接展示正式面板，避免两个 Modal 连续播放入场动画。 */
function DelayedLoading({ children }) {
	const [visible, setVisible] = (0, import_react$18.useState)(false);
	(0, import_react$18.useEffect)(() => {
		const timer = setTimeout(() => setVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);
	return visible ? children : null;
}
/** 可选小程序发布面板：组件缺失、加载中与加载失败均限定在当前弹窗内。 */
function MiniprogramPublishSlot(props) {
	const t = useTranslation();
	const [attempt, setAttempt] = (0, import_react$18.useState)(0);
	const Dialog = (0, import_react$18.useMemo)(() => {
		const load = getMiniprogramPublishLoader();
		return load ? (0, import_react$18.lazy)(async () => {
			const module = await load();
			if (!module.MiniprogramPublishDialog) throw new Error("MiniprogramPublishDialog export is missing");
			return { default: module.MiniprogramPublishDialog };
		}) : null;
	}, [attempt]);
	if (!props.open) return null;
	const fallback = (state) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Modal, {
		open: props.open,
		onOpenChange: props.onOpenChange,
		title: t("application.publish.miniprogramTitle"),
		closeAriaLabel: t("common.close"),
		closeOnOverlayClick: false,
		size: "small",
		children: state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Loading, {
			className: "app-publish__loading",
			tip: t("common.loading")
		}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Alert, {
			variant: state === "error" ? "error" : "info",
			actions: state === "error" ? [{
				key: "retry",
				label: t("common.retry"),
				onClick: () => setAttempt((value) => value + 1)
			}] : void 0,
			children: t(state === "error" ? "application.publish.miniprogramLoadFailed" : "application.publish.miniprogramUnavailable")
		})
	});
	if (!Dialog) return fallback("unavailable");
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ErrorBoundary, {
		fallbackRender: () => fallback("error"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(import_react$18.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DelayedLoading, { children: fallback("loading") }),
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Dialog, { ...props })
		})
	}, attempt);
}
var import_react$18, import_jsx_runtime$11;
var init_miniprogram_publish_slot = __esmMin((() => {
	init_app_space();
	init_src$1();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_react_error_boundary_esm();
	init_useI18n();
	init_miniprogram_publish_loader();
	import_jsx_runtime$11 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/publish-panel.tsx
var import_react$17, import_jsx_runtime$10, PublishPanel;
var init_publish_panel = __esmMin((() => {
	init_app_space();
	init_src$3();
	init_src$2();
	init_src$1();
	init_lucide_react();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$10 = require_jsx_runtime();
	PublishPanel = ({ appName, release, capabilities, busy = false, statusLoading = false, statusError, share, onClose, onPublish, onUnpublish, onRetryStatus }) => {
		const t = useTranslation();
		const [copied, setCopied] = (0, import_react$17.useState)(false);
		const handleCopy = (0, import_react$17.useCallback)(() => {
			share.onCopyLink();
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}, [share]);
		const isPublishing = release.status === "publishing";
		const isFailed = release.status === "failed";
		const isPublished = release.status === "published" && !!release.shareLink;
		const publishDisabledTitle = capabilities.publishDisabledReason === "cloudServiceUnavailable" ? t("application.publish.cloudServiceUnavailable") : capabilities.publishDisabledReason;
		/**
		* 应用信息行右侧的操作区。**只有这一块随状态变化**，其余版式四态统一。
		*
		* ⚠️ 早前实现是「每种状态换一整块内容」（发布中/失败/未发布都渲染成居中的
		* 大图标 + 标题 + 描述），与设计稿不符：稿子始终保留「图标 + 应用名 + 已上传至」
		* 这一行，只把右侧按钮换掉。这样状态切换时版式不跳动。
		*/
		const actions = (() => {
			if (statusLoading) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "outline",
				size: "small",
				className: "app-publish__action",
				"aria-label": t("application.publish.statusLoading"),
				title: t("application.publish.statusLoading"),
				loading: true
			});
			if (statusError) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "outline",
				size: "small",
				className: "app-publish__action",
				title: statusError,
				onClick: onRetryStatus,
				children: t("application.publish.statusRetry")
			});
			if (isPublishing) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "primary",
				size: "small",
				className: "app-publish__action app-publish__action--primary",
				"aria-label": t("application.publish.publishing"),
				loading: true
			});
			if (isPublished) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "ghost",
				size: "small",
				className: "app-publish__action app-publish__action--plain",
				disabled: busy || !capabilities.canUnpublish,
				onClick: onUnpublish,
				children: t("application.publish.unpublish")
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "outline",
				size: "small",
				className: "app-publish__action app-publish__action--update",
				disabled: busy || !capabilities.canUpdatePublish,
				loading: busy,
				title: publishDisabledTitle,
				onClick: onPublish,
				children: t("application.publish.update")
			})] });
			return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button$1, {
				variant: "primary",
				size: "small",
				className: "app-publish__action app-publish__action--primary",
				disabled: busy || !capabilities.canPublish && !isFailed,
				title: publishDisabledTitle,
				onClick: onPublish,
				children: isFailed ? t("application.publish.retry") : t("application.publish.publishNow")
			});
		})();
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "app-publish",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "app-publish__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
						className: "app-publish__title",
						id: "app-publish-title",
						children: t("application.publish.dialogTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(IconButton, {
						size: "small",
						className: "app-publish__close",
						"aria-label": t("common.close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(X, { size: 16 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "app-publish__app-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(WbAppFileIcon, { size: 28 }),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "app-publish__app-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "app-publish__app-name",
								title: appName,
								children: appName
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "app-publish__app-hint",
								children: t(isPublished ? "application.publish.uploadedTo" : "application.publish.notPublishedHint")
							})]
						}),
						actions
					]
				}),
				statusError ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("p", {
					className: "app-publish__error",
					title: statusError,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TriangleAlert, { size: 14 }), t("application.publish.statusFailed")]
				}) : isFailed ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("p", {
					className: "app-publish__error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TriangleAlert, { size: 14 }), release.failure?.message || t("application.publish.failed")]
				}) : null,
				capabilities.showLink && !statusLoading && !statusError ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "app-publish__link-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: "app-publish__link-text",
						title: release.shareLink,
						children: release.shareLink
					}), capabilities.canCopyLink ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(IconButton, {
						size: "small",
						"aria-label": t("application.publish.copyLink"),
						title: t("application.publish.copyLink"),
						onClick: handleCopy,
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ShareCopyIcon, { size: "md" })
					}) : null]
				}), capabilities.canShare ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "app-publish__section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: "app-publish__label",
						children: t("application.publish.shareTo")
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "app-publish__share",
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ShareChannelButtons, {
							compact: true,
							t,
							onWxShare: share.onWxShare,
							onGenerateQRCode: share.onGenerateQRCode,
							onOpenExternal: share.onOpenExternal
						})
					})]
				}) : null] }) : null
			]
		});
	};
})), import_react_dom, import_jsx_runtime$9, AppSpaceOverlays;
var init_app_space_overlays = __esmMin((() => {
	init_src$3();
	require_react();
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_miniprogram_publish_slot();
	init_publish_panel();
	import_jsx_runtime$9 = require_jsx_runtime();
	AppSpaceOverlays = ({ app, onOpenExternal, release, capabilities, share, publishPanelOpen, publishBusy, statusLoading, statusError, unpublishConfirmOpen, onClosePublishPanel, onPublish, onRequestUnpublish, onRetryStatus, onCloseUnpublishConfirm, onConfirmUnpublish }) => {
		const t = useTranslation();
		const { appId, appName, appType, localDir, isLocalAvailable } = app;
		if (appType === "miniprogram") return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MiniprogramPublishSlot, {
			open: publishPanelOpen,
			applicationId: appId,
			appName,
			localDir: isLocalAvailable === false ? void 0 : localDir,
			onOpenChange: (open) => {
				if (!open) onClosePublishPanel();
			},
			onOpenExternal
		}, appId);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
			publishPanelOpen ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "app-space__modal-mask",
				onClick: onClosePublishPanel,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "app-space__modal",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "app-publish-title",
					onClick: (event) => event.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(PublishPanel, {
						appName,
						release,
						busy: publishBusy,
						statusLoading,
						statusError,
						capabilities,
						share,
						onClose: onClosePublishPanel,
						onPublish,
						onUnpublish: onRequestUnpublish,
						onRetryStatus
					})
				})
			}), document.body) : null,
			(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(QrcodeFallbackDialog, {
				visible: share.qrcodeVisible,
				onClose: share.closeQrcode,
				shareUrl: share.qrcodeUrl,
				showMask: true,
				generateQRCode: share.generateQRCode,
				onCopyQRCode: share.onCopyQRCode,
				onSaveQRCode: share.onSaveQRCode,
				t
			}), document.body),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ConfirmDialog, {
				visible: unpublishConfirmOpen,
				title: t("application.publish.unpublishConfirmTitle"),
				content: t("application.publish.unpublishConfirmContent"),
				confirmText: t("application.publish.unpublishConfirmBtn"),
				cancelText: t("application.publish.unpublishCancelBtn"),
				onClose: onCloseUnpublishConfirm,
				onConfirm: onConfirmUnpublish
			})
		] });
	};
})), import_jsx_runtime$8, AppSpacePlaceholder, AppSpaceStatusFallback;
var init_app_space_placeholder = __esmMin((() => {
	init_app_space();
	require_react();
	init_mascot_new();
	init_useI18n();
	import_jsx_runtime$8 = require_jsx_runtime();
	AppSpacePlaceholder = ({ title, descriptions, variant = "default" }) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: `app-space__empty${variant === "deleted" ? " app-space__empty--deleted" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("img", {
			className: "app-space__empty-mascot",
			src: mascot_new_default,
			alt: "",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "app-space__empty-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", {
				className: "app-space__empty-title",
				children: title
			}), descriptions.map((description) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", {
				className: "app-space__empty-desc",
				children: description
			}, description))]
		})]
	});
	AppSpaceStatusFallback = ({ deleted }) => {
		const t = useTranslation();
		if (!deleted) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "app-space" });
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "app-space",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "app-space__body",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(AppSpacePlaceholder, {
					title: t("application.deleted.title"),
					descriptions: [t("application.deleted.description")],
					variant: "deleted"
				})
			})
		});
	};
})), import_jsx_runtime$7, SIZE, OpenExternalIcon, RefreshIcon;
var init_app_space_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$7 = require_jsx_runtime();
	SIZE = 16;
	OpenExternalIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("svg", {
		width: SIZE,
		height: SIZE,
		viewBox: "8.9 8.9 14.2 14.2",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 8.89999 8.89862)",
			fillRule: "evenodd",
			d: "M6.3745 2.6414Q6.7409 1.9818 7.1 1.5135Q7.4591 1.9818 7.8255 2.6414Q8.5407 3.9286 8.8204 5.3014L10.0425 5.3014Q9.7431 3.6221 8.8745 2.0586Q8.661 1.6742 8.4455 1.3427Q10.0405 1.6966 11.2719 2.9281Q12.3255 3.9817 12.7368 5.3014L13.9859 5.3014Q13.5327 3.4918 12.1205 2.0796Q10.0409 0 7.1 0Q4.1591 0 2.0796 2.0796Q0 4.1591 0 7.1Q0 9.6835 1.6578 11.6601Q3.2948 13.6119 5.7855 14.0784Q6.5488 14.2214 6.9184 13.5322Q7.2517 12.9105 6.8487 12.3246Q5.3764 10.1839 5.2189 7.7L8.3 7.7L8.3 6.5L5.2195 6.5Q5.3513 4.4832 6.3745 2.6414ZM4.0171 6.5Q4.1506 4.1734 5.3255 2.0586Q5.5391 1.6742 5.7545 1.3427Q4.1596 1.6966 2.9281 2.9281Q1.4161 4.44 1.227 6.5L4.0171 6.5ZM13 8.5485L13 11.0999L14.2 11.0999L14.2 8.0863Q14.2 7.642 14.1762 7.4675Q14.1214 7.0657 13.8778 6.8221Q13.6343 6.5786 13.2325 6.5237Q13.058 6.4999 12.6136 6.4999L9.6 6.4999L9.6 7.7L12.1515 7.7L7.6758 12.1757L8.5243 13.0242L13 8.5485ZM1.2278 7.7L4.0166 7.7Q4.1705 10.4636 5.753 12.8463Q3.8539 12.4111 2.5772 10.8889Q1.3957 9.4803 1.2278 7.7Z"
		})
	});
	RefreshIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: SIZE,
		height: SIZE,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", { d: "M13.5 6a5.5 5.5 0 1 0 .5 3.5" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", { d: "M13.5 1.5v4.5H9" })]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/app-space-toolbar.tsx
var import_react$13, import_jsx_runtime$6, CLOUD_TAG_TONES, AppSpaceToolbar;
var init_app_space_toolbar = __esmMin((() => {
	init_app_space();
	init_src$3();
	init_src$2();
	init_src$1();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_app_space_icons();
	import_jsx_runtime$6 = require_jsx_runtime();
	CLOUD_TAG_TONES = {
		provisioning: "default",
		expiring: "warning",
		creditsExhausted: "error",
		destroyed: "error"
	};
	AppSpaceToolbar = ({ appName, appType, cloudServiceActive = false, onOpenCloudService, onBackToPreview, displayUrl, capabilities, cloudServiceTag, onRefresh, onOpenInBrowser, onShare, onEdit, editing = false, onOpenFolder }) => {
		const t = useTranslation();
		const moreMenuItems = (0, import_react$13.useMemo)(() => [
			{
				value: "refresh",
				label: t("application.toolbar.refresh"),
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RefreshIcon, {}),
				clickOnly: true,
				disabled: !capabilities.canRefresh,
				onClick: onRefresh
			},
			...appType !== "miniprogram" ? [{
				value: "open-in-local-browser",
				label: t("application.toolbar.openInLocalBrowser"),
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(OpenExternalIcon, {}),
				clickOnly: true,
				disabled: !displayUrl,
				onClick: onOpenInBrowser
			}] : [],
			...onOpenFolder ? [{
				value: "open-folder",
				label: t("application.toolbar.openFolder"),
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(OpenFolderIcon, {}),
				clickOnly: true,
				onClick: onOpenFolder
			}] : []
		], [
			appType,
			capabilities.canRefresh,
			displayUrl,
			onOpenInBrowser,
			onOpenFolder,
			onRefresh,
			t
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "app-space__toolbar",
			children: [
				cloudServiceActive ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
						content: t("common.back"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(IconButton, {
							size: "small",
							className: "app-space__action app-space__action--back",
							"aria-label": t("common.back"),
							onClick: onBackToPreview,
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronLeftIcon, {
								width: 16,
								height: 16
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "app-space__page-title",
						children: t("application.cloudService.viewTitle")
					}),
					cloudServiceTag ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tag, {
						tone: CLOUD_TAG_TONES[cloudServiceTag],
						size: "small",
						children: t(`application.cloudServiceTag.${cloudServiceTag}`)
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "app-space__app-name",
					title: appName,
					children: appName
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(Button, {
					variant: "grey",
					size: "small",
					className: "app-space__cloud-pill",
					leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CloudDatabaseIcon, {}),
					onClick: () => onOpenCloudService(),
					children: [t("application.tabs.cloudService"), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WbChevronRightIcon, {
						className: "app-space__cloud-pill-arrow",
						width: 10,
						height: 12
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: "app-space__spacer" }),
				!cloudServiceActive ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
						content: t(editing ? "application.toolbar.exitEdit" : "application.toolbar.edit"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(IconButton, {
							size: "small",
							className: editing ? "app-space__action app-space__action--active" : "app-space__action",
							"aria-label": t(editing ? "application.toolbar.exitEdit" : "application.toolbar.edit"),
							disabled: !onEdit,
							onClick: onEdit,
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(PencilIcon, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
						content: t("application.toolbar.share"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(IconButton, {
							size: "small",
							className: "app-space__action",
							"aria-label": t("application.toolbar.share"),
							onClick: onShare,
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ShareIcon, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Dropdown, {
						items: moreMenuItems,
						placement: "bottom-end",
						width: 220,
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
							content: t("application.toolbar.moreActions"),
							placement: "top",
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(IconButton, {
								size: "small",
								className: "app-space__action",
								"aria-label": t("application.toolbar.moreActions"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(MoreIcon, {})
							})
						})
					})
				] }) : null
			]
		});
	};
})), import_jsx_runtime$5, AppSpacePreview;
var init_app_space_preview = __esmMin((() => {
	init_app_space();
	init_src$2();
	require_react();
	init_useI18n();
	init_app_space_placeholder();
	import_jsx_runtime$5 = require_jsx_runtime();
	AppSpacePreview = ({ previewUrl, canPreview, blank = false, active = true }) => {
		const t = useTranslation();
		const { loadError } = useBrowserPreview();
		if (!canPreview || !previewUrl || blank || loadError) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AppSpacePlaceholder, {
			title: t("application.preview.unavailable.title"),
			descriptions: [t("application.preview.unavailable.description")]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "app-space__preview app-space__preview--fill",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "app-space__frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Frame, { isActive: active })
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/application-surface-slot.tsx
function useBaasExtension() {
	return (0, import_react$11.useSyncExternalStore)(extensionStore.subscribe, extensionStore.getSnapshot).find((ext) => ext.id === BAAS_EXTENSION_ID);
}
var import_react$11, import_jsx_runtime$4, BAAS_EXTENSION_ID, ApplicationSurfaceSlot;
var init_application_surface_slot = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_extension_menu_hook();
	init_extension_mount();
	init_app_space_preview();
	import_jsx_runtime$4 = require_jsx_runtime();
	BAAS_EXTENSION_ID = "workbuddy-baas";
	ApplicationSurfaceSlot = ({ app, cloudServiceEndpoint, artifactId, conversationId, previewUrl, canPreview, blank, active, onOpenCloudService, onBackToPreview }) => {
		const baasExtension = useBaasExtension();
		const shouldUseExtension = app.appType === "miniprogram" && baasExtension?.enabled === true;
		const componentProps = (0, import_react$11.useMemo)(() => ({
			schemaVersion: 1,
			artifactId,
			conversationId,
			applicationId: app.appId,
			appType: app.appType ?? "web",
			active: active !== false,
			localDir: app.localDir,
			cloudServiceEndpoint: cloudServiceEndpoint ?? app.cloudService?.publicConfig?.endpoint,
			capabilities: {
				localSource: app.isLocalAvailable !== false,
				revealSource: app.isLocalAvailable !== false,
				cloudService: app.cloudService?.activated === true,
				share: false
			},
			onOpenCloudService,
			onBackToPreview
		}), [
			artifactId,
			conversationId,
			app.appId,
			app.appType,
			active,
			app.localDir,
			cloudServiceEndpoint,
			app.cloudService?.publicConfig?.endpoint,
			app.isLocalAvailable,
			app.cloudService?.activated,
			onOpenCloudService,
			onBackToPreview
		]);
		const renderLoadError = (0, import_react$11.useCallback)(() => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AppSpacePreview, {
			previewUrl,
			canPreview,
			blank,
			active
		}), [
			previewUrl,
			canPreview,
			blank,
			active
		]);
		if (!shouldUseExtension) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AppSpacePreview, {
			previewUrl,
			canPreview,
			blank,
			active
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ExtensionMount, {
			extensionId: BAAS_EXTENSION_ID,
			contribution: {
				kind: "applicationSurface",
				id: "miniprogram-preview"
			},
			componentProps,
			renderError: renderLoadError
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/preview/static-html-entry.ts
function isStaleStaticHtmlUrl(url) {
	return STALE_STATIC_HTML_URL_RE.test(url);
}
/**
* 从旧 http entry 反解本地文件路径候选。
*
* 返回按优先级排序的候选（`localDir` 下逐级找，覆盖入口在项目根与常见构建产物目录
* `dist` / `build` 的场景），调用方逐个探测存在性。反解失败返回空数组。
*/
function resolveStaleEntryCandidates(httpUrl, localDir) {
	if (!localDir) return [];
	const match = STALE_STATIC_HTML_URL_RE.exec(httpUrl);
	if (!match) return [];
	let relPath;
	try {
		relPath = decodeURIComponent(match[1]);
	} catch {
		return [];
	}
	const candidates = [
		`${localDir}/${relPath}`,
		`${localDir}/dist/${relPath}`,
		`${localDir}/build/${relPath}`
	];
	return [...new Set(candidates)];
}
/** 本地绝对路径 → `file://` URL（编码口径与 app-entry-deriver 的 `toFileUrlPrefix` 对齐）。 */
function toFileUrl(absPath) {
	const withLeadingSlash = absPath.startsWith("/") ? absPath : `/${absPath}`;
	return `file://${encodeURI(withLeadingSlash).replace(/#/g, "%23").replace(/\?/g, "%3F")}`;
}
var STALE_STATIC_HTML_URL_RE;
var init_static_html_entry = __esmMin((() => {
	STALE_STATIC_HTML_URL_RE = /^http:\/\/127\.0\.0\.1:\d+\/static-html\/[^/]+\/(.+)$/;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/utils/resolve-editable-html-target.ts
/**
* 是否为目录。
*
* `'dir'` 必须在列表里 —— 这是 agent-ui adapter 的实际写法，漏了会把所有目录
* 当成文件。
*/
function isDirectory(entry) {
	if (entry.isDirectory === true) return true;
	const type = entry.type?.toLowerCase();
	return type === "dir" || type === "directory" || type === "folder";
}
function fileNameOf(entry) {
	if (entry.name) return entry.name.toLowerCase();
	return ((entry.path ?? "").split(/[/\\]/).pop() ?? "").toLowerCase();
}
/**
* 从目录清单里挑出可编辑的入口 HTML。
*
* @param localDir 应用工程目录绝对路径（`app.localDir`）。
* @param entries `adapter.listDirectory(sessionId, localDir, 1)` 的结果。
* @returns 可编辑则给出文件路径；构建型项目 / 没有入口 HTML 则 `null`。
*/
function resolveEditableHtmlTarget(localDir, entries) {
	if (!localDir || !entries?.length) return null;
	const files = entries.filter((entry) => !isDirectory(entry));
	if (files.some((entry) => BUILD_PROJECT_MARKERS.has(fileNameOf(entry)))) return null;
	for (const candidate of ENTRY_HTML_NAMES) {
		const hit = files.find((entry) => fileNameOf(entry) === candidate);
		if (hit) return { filePath: hit.path || `${localDir.replace(/[/\\]+$/, "")}/${hit.name ?? candidate}` };
	}
	return null;
}
var BUILD_PROJECT_MARKERS, ENTRY_HTML_NAMES;
var init_resolve_editable_html_target = __esmMin((() => {
	BUILD_PROJECT_MARKERS = /* @__PURE__ */ new Set([
		"package.json",
		"vite.config.js",
		"vite.config.ts",
		"webpack.config.js",
		"next.config.js",
		"next.config.ts",
		"nuxt.config.ts",
		"angular.json",
		"svelte.config.js",
		"astro.config.mjs"
	]);
	ENTRY_HTML_NAMES = ["index.html", "index.htm"];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/preview/use-app-editable-html.ts
function useAppEditableHtml(options) {
	const { localDir, sessionId, isLocalAvailable, listDirectory } = options;
	const [filePath, setFilePath] = (0, import_react$10.useState)(void 0);
	/**
	* 用序号丢弃过期响应：用户可在请求飞行途中切到另一个应用，晚到的旧结果
	* 会把新应用的编辑目标覆盖成上一个应用的（表现为「编辑到了别的应用的文件」）。
	*/
	const requestSequence = (0, import_react$10.useRef)(0);
	(0, import_react$10.useEffect)(() => {
		const sequence = ++requestSequence.current;
		const settle = (next) => {
			if (requestSequence.current === sequence) setFilePath(next);
		};
		if (!localDir || !sessionId || !isLocalAvailable || !listDirectory) {
			probeAppView({
				view: "app-space-edit-probe",
				source: "skipped(precondition)",
				kind: "mock",
				data: {
					localDir: localDir ?? null,
					sessionId: sessionId ?? null,
					isLocalAvailable,
					hasListDirectory: Boolean(listDirectory)
				}
			});
			settle(void 0);
			return;
		}
		listDirectory(sessionId, localDir, 1).then((entries) => {
			const target = resolveEditableHtmlTarget(localDir, entries);
			probeAppView({
				view: "app-space-edit-probe",
				source: "adapter:listDirectory",
				kind: "real",
				data: {
					localDir,
					entries: (entries ?? []).map((e) => ({
						name: e.name,
						type: e.type,
						isDirectory: e.isDirectory
					})),
					resolved: target?.filePath ?? null
				}
			});
			settle(target?.filePath);
		}).catch((error) => {
			probeAppView({
				view: "app-space-edit-probe",
				source: "adapter:listDirectory",
				kind: "real",
				data: {
					localDir,
					error: String(error)
				}
			});
			settle(void 0);
		});
	}, [
		localDir,
		sessionId,
		isLocalAvailable,
		listDirectory
	]);
	return { filePath };
}
var import_react$10;
var init_use_app_editable_html = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_app_api_probe();
	init_resolve_editable_html_target();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/preview/use-app-preview-blank.ts
/**
* 检测应用预览页面是否白屏。
*
* 触发场景：
* - file:// 协议下模块脚本因 CORS 策略被阻止加载 → SPA 不挂载；
* - 转成 http 本地 static-html 代理后入口选错（指向源码而非构建产物）→ 404/空白。
*
* 检测方式：webview dom-ready 后延迟一段时间，通过 executeJavaScript
* 探测页面 body 是否实质为空（脚本未执行 = SPA 没有挂载）。
*
* 注意：Electron webview 的 console-message 事件不会转发浏览器内核产生的
* CORS/网络错误（它们不是通过 console.error() 产生的），所以直接探测 DOM。
*
* ## 只回答「是不是白屏」，不回答「为什么」
*
* 本 hook 唯一的观测手段是「root 里有没有内容」，从这一个信号推不出具体原因
* （没构建？入口指向源码？服务不了资源？）。曾经按原因分成
* `BUILT_NOT_SERVABLE` / `BUILD_MISSING` / `LOAD_FAILED` 三类并各配一句文案，
* 结果是给出「应用已完成构建」这种没有依据、还会把排查带偏的结论（#107738）。
* 现在只输出布尔量，兜底文案由 UI 统一给一句，不再假装知道原因。
*
* ## 结论必须可自愈（#107769 的教训）
*
* `blank` 存在容器层、不随预览区卸载，而它决定「渲染预览还是渲染失败占位页」。
* 所以这里有两条硬约束，改动时不要退回去：
* 1. **探测结果只在 webview 还活着时采信**：guest 被销毁后 `executeJavaScript` 必然
*    抛错，把它当成白屏等于让一个已经不存在的 webview 给下一个 webview
*    判死刑，用户会看到「回到预览页永久失效，只能重新点产物卡片」。
* 2. **dom-ready 要持续监听、探到内容要清空结论**：只绑一次（`{ once: true }`）+
*    只在 previewUrl 变化时复位，一旦误判就没有任何恢复通道。
*/
function useAppPreviewBlank(options) {
	const { previewUrl, probeDelayMs = DEFAULT_PROBE_DELAY_MS } = options;
	const [blank, setBlank] = (0, import_react$9.useState)(false);
	const containerRef = (0, import_react$9.useRef)(null);
	const resetBlank = (0, import_react$9.useCallback)(() => {
		setBlank(false);
	}, []);
	(0, import_react$9.useEffect)(() => {
		if (!previewUrl) {
			setBlank(false);
			return;
		}
		if (!(previewUrl.startsWith("file://") || isStaleStaticHtmlUrl(previewUrl))) {
			setBlank(false);
			return;
		}
		setBlank(false);
		const container = containerRef.current;
		if (!container) return;
		let cancelled = false;
		const timers = /* @__PURE__ */ new Set();
		const bound = [];
		/**
		* webview 是否仍然可信（没被卸载、还挂在当前容器里）。
		*
		* 预览区在编辑态替换 / 应用切换时会被卸载，guest 随之销毁；此后所有
		* 探测回调都必须直接放弃，绝不能落成白屏结论。
		*/
		const isAlive = (webview) => !cancelled && webview.isConnected && container.contains(webview);
		const probe = async (webview) => {
			if (!isAlive(webview)) return;
			let contentSize;
			try {
				contentSize = await webview.executeJavaScript(PROBE_SCRIPT);
			} catch {
				if (!isAlive(webview)) return;
				setBlank(true);
				return;
			}
			if (!isAlive(webview)) return;
			setBlank(contentSize === 0);
		};
		const observed = /* @__PURE__ */ new WeakSet();
		const bind = (webview) => {
			if (observed.has(webview)) return;
			observed.add(webview);
			const onDomReady = () => {
				if (!isAlive(webview)) return;
				const timer = setTimeout(() => {
					timers.delete(timer);
					probe(webview).catch(() => void 0);
				}, probeDelayMs);
				timers.add(timer);
			};
			webview.addEventListener("dom-ready", onDomReady);
			bound.push([webview, onDomReady]);
		};
		const bindCurrentWebview = () => {
			const webview = container.querySelector("webview");
			if (webview) bind(webview);
		};
		bindCurrentWebview();
		const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(bindCurrentWebview);
		observer?.observe(container, {
			childList: true,
			subtree: true
		});
		return () => {
			cancelled = true;
			observer?.disconnect();
			for (const timer of timers) clearTimeout(timer);
			timers.clear();
			for (const [webview, handler] of bound) webview.removeEventListener("dom-ready", handler);
		};
	}, [previewUrl, probeDelayMs]);
	return {
		blank,
		containerRef,
		resetBlank
	};
}
var import_react$9, DEFAULT_PROBE_DELAY_MS, PROBE_SCRIPT;
var init_use_app_preview_blank = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_static_html_entry();
	DEFAULT_PROBE_DELAY_MS = 3e3;
	PROBE_SCRIPT = `(function() {
    var root = document.getElementById('root') || document.getElementById('app');
    if (root) return root.innerHTML.trim().length;
    return document.body.innerText.trim().length + document.body.children.length;
})()`;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/deploy-result.ts
function readResult(raw) {
	return typeof raw === "object" && raw !== null ? raw : void 0;
}
function str(value) {
	return typeof value === "string" && value !== "" ? value : void 0;
}
/**
* 把发布结果合并进本地发布态。
*
* @param previous 合并前的发布态（更新发布时带着旧链接）
* @param raw daemon `sites:deploy` 的原样返回值
* @param noShareLinkMessage 缺链接时展示给用户的文案（由调用方注入，保持本模块不依赖 i18n）
*/
function applyDeployResult(previous, raw, noShareLinkMessage) {
	const result = readResult(raw);
	const shareLink = str(result?.shareLink);
	if (!shareLink) {
		const reason = str(result?.shareLinkError);
		return {
			...previous,
			status: "failed",
			failure: {
				code: DEPLOY_NO_SHARE_LINK_CODE,
				message: reason ? `${noShareLinkMessage}（${reason}）` : noShareLinkMessage
			}
		};
	}
	return {
		...previous,
		status: "published",
		shareLink,
		sandboxId: str(result?.sandboxId) ?? previous.sandboxId,
		publishedAt: Date.now(),
		failure: void 0,
		unpublishedAt: void 0
	};
}
var DEPLOY_NO_SHARE_LINK_CODE;
var init_deploy_result = __esmMin((() => {
	DEPLOY_NO_SHARE_LINK_CODE = "DEPLOY_NO_SHARE_LINK";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/unpublish-result.ts
function readPublish(raw) {
	if (typeof raw !== "object" || raw === null) return;
	const publish = raw.publish;
	if (typeof publish !== "object" || publish === null) return;
	return publish;
}
/**
* 收窄发布态。
*
* 未知取值回退 `'unpublished'` 而不是 `previous.status`：能走到这里说明取消发布
* **已经成功**（失败路径根本不调本函数），保留 `'published'` 会让界面显示成
* 「还在线」，比丢失一个精确态危险得多。
*/
function narrowStatus(value) {
	return typeof value === "string" && PUBLISH_STATUSES.includes(value) ? value : "unpublished";
}
/** 后端给了非空字符串就用它，否则保留本地值（规则 1）。 */
function preferString(value, fallback) {
	return typeof value === "string" && value !== "" ? value : fallback;
}
/** 后端给了有限数值就用它，否则保留本地值。 */
function preferNumber(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
/**
* 把取消发布的结果合并进本地发布态。
*
* @param previous 合并前的发布态（含本地乐观态）
* @param raw daemon 原样返回值。形状意外时整体走本地兜底，**不抛错** ——
*   请求已经成功，因为解析失败就把成功报成失败会让用户以为链接还在线。
*/
function applyUnpublishResult(previous, raw) {
	const publish = readPublish(raw);
	return {
		...previous,
		status: publish ? narrowStatus(publish.status) : "unpublished",
		shareLink: preferString(publish?.shareLink, previous.shareLink),
		sandboxId: preferString(publish?.sandboxId, previous.sandboxId),
		publishedAt: preferNumber(publish?.publishedAt, previous.publishedAt),
		unpublishedAt: preferNumber(publish?.unpublishedAt, Date.now()),
		failure: void 0
	};
}
var PUBLISH_STATUSES;
var init_unpublish_result = __esmMin((() => {
	PUBLISH_STATUSES = [
		"never",
		"published",
		"unpublished"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/data/application-detail-api.ts
/**
* RFC3339 → epoch ms。
*
* ⚠️ **这个转换不能省**，是本次从 RPC 切直连最容易静默出错的地方：
* daemon 侧 `application-list-projector.ts` 做过一次同样的转换，所以
* `map-application-release.ts` 的 `toOptionalEpochMs()` **只接受 number**。
* 直连拿到的是云端原始的 `"2026-08-20T10:56:23+08:00"`，直接透传的话
* `publishedAt` / `unpublishedAt` 会被判成不认识而落成 `undefined` ——
* 不报错，只是发布时间凭空消失。
*
* `null` / 空串 / 不可解析一律返回 `null`，**绝不返回 NaN**：NaN 喂给
* `new Date()` 会渲染成 `Invalid Date`。
*/
function toEpochMs(value) {
	if (!value) return null;
	const ms = Date.parse(value);
	return Number.isNaN(ms) ? null : ms;
}
/** 时间必填字段（createdAt / updatedAt）：不可解析时落 0，与 daemon 投影同口径。 */
function toEpochMsOrZero(value) {
	return toEpochMs(value) ?? 0;
}
function toNullableString(value) {
	return typeof value === "string" && value.length > 0 ? value : null;
}
function projectDetail(detail) {
	const publish = detail.publish ?? {};
	return {
		appId: detail.id ?? "",
		appName: detail.name ?? "",
		domain: toNullableString(detail.domain),
		createdAt: toEpochMsOrZero(detail.createdAt),
		updatedAt: toEpochMsOrZero(detail.updatedAt),
		publish: {
			status: publish.status ?? "never",
			shareLink: toNullableString(publish.shareLink),
			sandboxId: toNullableString(publish.sandboxId),
			publishedAt: toEpochMs(publish.publishedAt),
			unpublishedAt: toEpochMs(publish.unpublishedAt)
		},
		cloudService: detail.cloudService ? {
			resourceId: detail.cloudService.resourceId ?? "",
			endpoint: detail.cloudService.endpoint ?? "",
			status: detail.cloudService.status ?? "",
			billingStatus: detail.cloudService.billingStatus ?? ""
		} : null
	};
}
/**
* 详情查询 client。
*
* ⚠️ `http` 默认参数读全局 `wb`，所以**不要在 render 期调这个工厂**（jsdom 单测里
* 没有 `wb`，会抛 `ReferenceError: wb is not defined` 把整棵树炸掉）。惰性创建 +
* 缓存在 ref 里，与 `use-app-cloud-service-actions` 的处理一致。
*/
function createApplicationDetailApiClient(http = wb.http) {
	return { async getApplicationDetail(appId) {
		if (!appId) return null;
		const envelope = await http.get(`${CONTROL_API_PREFIX}/applications/detail`, { params: { applicationId: appId } });
		const code = envelope?.code;
		if (code !== void 0 && code !== 0) {
			if (code === APPLICATION_NOT_FOUND_CODE) return null;
			throw new ApplicationApiError(code, envelope.msg ?? envelope.message ?? `genie-baas GET /applications/detail failed (code=${code})`, envelope.requestId);
		}
		const detail = envelope?.data ?? envelope;
		if (!detail?.id) throw new Error("genie-baas GET /applications/detail: 出参缺少 id");
		return projectDetail(detail);
	} };
}
var CONTROL_API_PREFIX, APPLICATION_NOT_FOUND_CODE, ApplicationApiError;
var init_application_detail_api = __esmMin((() => {
	CONTROL_API_PREFIX = "/v2/as/genie-baas/control";
	APPLICATION_NOT_FOUND_CODE = 18301;
	ApplicationApiError = class extends Error {
		constructor(code, message, requestId) {
			super(message);
			this.name = "ApplicationApiError";
			this.code = code;
			this.requestId = requestId;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/map-application-release.ts
/**
* 是否是普通对象。
*
* ⚠️ **必须排除数组**：`typeof [] === 'object'`，只判 typeof 的话一个数组出参
* （比如误接到了列表接口 / daemon 返回了 `[]`）会被当成「应用存在但没有 publish 字段」
* → 静默落成 `never` → UI 画出「立即发布」。单测锁了这条。
*/
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** 只接受非空字符串；`null` / 空串一律 undefined（空串会让 UI 渲染出一个空链接框）。 */
function toOptionalString(value) {
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
/**
* 只接受有限数值。
*
* `null`（云端未发布过）与 `NaN`（上游转换失败）都必须落成 undefined ——
* 直接传给 `new Date()` 会渲染成 `Invalid Date` 或 1970（协议铁律 3）。
*/
function toOptionalEpochMs(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
/**
* 从 `sites:getApplication` 的出参里取发布态。
*
* @param raw RPC 原始出参。`null` 表示云端没有这个应用。
* @returns 发布态；`undefined` 表示**无法判定**（形状不认识 / status 不认识），
*          调用方应显示「状态未知」并给重试，**不得**当成「从未发布」。
*/
function mapApplicationRelease(raw) {
	if (raw === null) return { status: "never" };
	if (!isRecord(raw)) return;
	const publish = raw["publish"];
	if (!isRecord(publish)) return { status: "never" };
	const status = publish["status"];
	if (typeof status !== "string" || !CLOUD_PUBLISH_STATUS.has(status)) return;
	return {
		status,
		shareLink: toOptionalString(publish["shareLink"]),
		sandboxId: toOptionalString(publish["sandboxId"]),
		publishedAt: toOptionalEpochMs(publish["publishedAt"]),
		unpublishedAt: toOptionalEpochMs(publish["unpublishedAt"])
	};
}
var CLOUD_PUBLISH_STATUS;
var init_map_application_release = __esmMin((() => {
	CLOUD_PUBLISH_STATUS = /* @__PURE__ */ new Set([
		"never",
		"published",
		"unpublished"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/use-app-release-query.ts
function useAppReleaseQuery(options) {
	const { appId, getApplication } = options;
	const [state, setState] = (0, import_react$8.useState)({
		loading: false,
		notFound: false,
		settled: false
	});
	/**
	* 直连 client **惰性创建**并缓存。
	*
	* ⚠️ 不能写成 `useMemo(() => createApplicationDetailApiClient(), [])`：那个工厂的
	* 默认参数是 `http = wb.http`，在 render 期就会读全局 `wb`。jsdom 单测里没有 `wb`，
	* 组件一挂载就抛 `ReferenceError: wb is not defined` 整棵树炸掉；真实环境也可能
	* 出现在 SDK 装配完成之前就挂载的时序（同 `use-app-cloud-service-actions` 的处理）。
	*/
	const clientRef = (0, import_react$8.useRef)(null);
	/**
	* 本次查询要用的调用。
	*
	* 注入优先；缺省时**在调用发生的那一刻**才建 client（见上）。
	* 用 `useMemo` 而不是每次 render 新建箭头函数：它进了 `run` 的依赖，
	* 每帧换引用会让下方「挂载即查」的 effect 反复重跑。
	*/
	const call = (0, import_react$8.useMemo)(() => {
		if (getApplication) return getApplication;
		return ({ appId: id }) => {
			clientRef.current ??= createApplicationDetailApiClient();
			return clientRef.current.getApplicationDetail(id);
		};
	}, [getApplication]);
	/**
	* 卸载后不再 setState：用户完全可能在请求飞行途中关掉应用空间
	* （云端是分页扫描，慢的时候几百毫秒起）。
	*/
	const aliveRef = (0, import_react$8.useRef)(true);
	(0, import_react$8.useEffect)(() => {
		aliveRef.current = true;
		return () => {
			aliveRef.current = false;
		};
	}, []);
	/**
	* 请求序号，用于丢弃过期响应。
	*
	* 必需：切应用 / 连点重试会并发多个请求，且**先发的不保证先回**。
	* 没有这道闸就会出现「A 应用的响应盖掉 B 应用的状态」——
	* 表现是弹窗上显示着另一个应用的链接。
	*/
	const seqRef = (0, import_react$8.useRef)(0);
	const run = (0, import_react$8.useCallback)((keepPrevious) => {
		if (!appId) {
			setState({
				loading: false,
				notFound: false,
				settled: true
			});
			return;
		}
		const seq = ++seqRef.current;
		setState((prev) => ({
			appId,
			cloudServiceEndpoint: keepPrevious && prev.appId === appId ? prev.cloudServiceEndpoint : void 0,
			release: keepPrevious ? prev.release : void 0,
			loading: true,
			error: void 0,
			notFound: keepPrevious ? prev.notFound : false,
			settled: keepPrevious ? prev.settled : false
		}));
		probeAppApiCall(GET_APPLICATION_API, { applicationId: appId }, () => call({ appId })).then((raw) => {
			if (!aliveRef.current || seq !== seqRef.current) {
				probeAppView({
					view: "publish-panel.release",
					source: GET_APPLICATION_API,
					kind: "real",
					data: {
						appId,
						dropped: aliveRef.current ? "stale-response" : "unmounted",
						raw
					}
				});
				return;
			}
			const release = mapApplicationRelease(raw);
			if (!release) {
				probeAppView({
					view: "publish-panel.release",
					source: GET_APPLICATION_API,
					kind: "real",
					data: {
						appId,
						outcome: "unknown(unexpected shape)",
						raw,
						release: void 0
					}
				});
				setState({
					loading: false,
					error: `unexpected response: ${JSON.stringify(raw)?.slice(0, 200)}`,
					notFound: false,
					settled: true
				});
				return;
			}
			const notFound = raw === null;
			probeAppView({
				view: "publish-panel.release",
				source: GET_APPLICATION_API,
				kind: "real",
				data: {
					appId,
					outcome: `mapped(${release.status})`,
					raw,
					release,
					notFound
				}
			});
			setState({
				appId,
				cloudServiceEndpoint: raw?.cloudService?.endpoint || void 0,
				loading: false,
				release,
				notFound,
				settled: true
			});
		}).catch((error) => {
			if (!aliveRef.current || seq !== seqRef.current) return;
			probeAppView({
				view: "publish-panel.release",
				source: GET_APPLICATION_API,
				kind: "real",
				data: {
					appId,
					outcome: "failed",
					error: error instanceof Error ? error.message : String(error)
				}
			});
			setState({
				loading: false,
				error: error instanceof Error ? error.message : String(error),
				notFound: false,
				settled: true
			});
		});
	}, [appId, call]);
	(0, import_react$8.useEffect)(() => {
		run(false);
	}, [run]);
	const refresh = (0, import_react$8.useCallback)(() => {
		run(true);
	}, [run]);
	return {
		release: state.release,
		cloudServiceEndpoint: state.appId === appId ? state.cloudServiceEndpoint : void 0,
		loading: state.loading,
		error: state.error,
		notFound: state.notFound,
		settled: state.settled,
		refresh
	};
}
var import_react$8, GET_APPLICATION_API;
var init_use_app_release_query = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_application_detail_api();
	init_app_api_probe();
	init_map_application_release();
	GET_APPLICATION_API = "GET /v2/as/genie-baas/control/applications/detail";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/use-app-publish-actions.ts
function useAppPublishActions(options) {
	const { app, unpublishApplication, deploy, remoteRelease, onToast, messages } = options;
	const [override, setOverride] = (0, import_react$7.useState)(void 0);
	const [busy, setBusy] = (0, import_react$7.useState)(false);
	/**
	* `busy` 的 ref 影子，只用于重复提交守卫。
	*
	* 不能只靠 `busy` state：同一帧内连点两次，两次回调读到的都是渲染时那份
	* `busy === false`，于是**并发发出两次取消发布**。发布走 setTimeout 时这个
	* 问题被延时掩盖了，改成真请求后必须堵住。
	*/
	const busyRef = (0, import_react$7.useRef)(false);
	/**
	* 回调与文案走「最新值 ref」，不进 `unpublish` 的依赖。
	*
	* 与 `useAppCloudServiceActions` 同一个理由：调用方几乎一定把 `onToast` 写成内联
	* 箭头函数（每帧新引用），若它进依赖，`unpublish` 每帧换引用，容器再把它塞进
	* 弹窗/header 之类的 memo 对象就会滚成 `Maximum update depth exceeded`。
	*/
	const latestRef = (0, import_react$7.useRef)({
		onToast,
		messages
	});
	latestRef.current = {
		onToast,
		messages
	};
	/**
	* 切换应用时必须清空本地态。
	*
	* 不清的话：在 A 应用发布到一半切到 B，B 会顶着 A 的「发布中」——
	* 而 B 可能根本没发布过。以 `appId` 为准而不是对象引用，
	* 产物数据刷新（同一应用重新登记）时不该把进行中的状态抹掉。
	*/
	(0, import_react$7.useEffect)(() => {
		setOverride(void 0);
		busyRef.current = false;
		setBusy(false);
	}, [app.appId]);
	/**
	* 卸载后不再 setState。
	*
	* 两个动作都是真请求，且发布是长任务（几十秒级）—— 用户很可能在部署过程中
	* 关掉应用空间。没有这道闸就是必现的 "setState on unmounted component"。
	*/
	const aliveRef = (0, import_react$7.useRef)(true);
	(0, import_react$7.useEffect)(() => {
		aliveRef.current = true;
		return () => {
			aliveRef.current = false;
		};
	}, []);
	return {
		release: override ?? remoteRelease ?? app.release ?? { status: "never" },
		releaseSource: override ? override.status === "unpublished" ? UNPUBLISH_API : DEPLOY_API : remoteRelease ? GET_APPLICATION_API : app.release ? "present_app_files(MOCK)" : "default(none)",
		publish: (0, import_react$7.useCallback)(() => {
			if (busyRef.current) return;
			const previous = override ?? remoteRelease ?? app.release ?? { status: "never" };
			const directory = app.localDir;
			if (!deploy || !directory) {
				const { messages: messagesNow } = latestRef.current;
				const message = !deploy ? messagesNow?.publishUnsupported ?? "当前环境不支持发布" : messagesNow?.publishNoLocalDir ?? "找不到本地工程目录，无法发布";
				const failure = {
					code: !deploy ? "DEPLOY_UNSUPPORTED" : "DEPLOY_NO_LOCAL_DIR",
					message
				};
				probeAppApi({
					api: DEPLOY_API,
					kind: "real",
					request: {
						appId: app.appId,
						directory,
						triggerType: "manual"
					},
					error: failure
				});
				setOverride({
					...previous,
					status: "failed",
					failure
				});
				return;
			}
			const request = {
				appId: app.appId,
				directory,
				appName: app.appName,
				taskSessionId: app.taskSessionId,
				triggerType: "manual"
			};
			busyRef.current = true;
			setBusy(true);
			setOverride({
				...previous,
				status: "publishing"
			});
			probeAppApiCall(DEPLOY_API, request, () => deploy(request)).then((result) => {
				busyRef.current = false;
				if (!aliveRef.current) return;
				setBusy(false);
				const { onToast: toastNow, messages: messagesNow } = latestRef.current;
				const next = applyDeployResult(previous, result, messagesNow?.publishNoShareLink ?? "发布未完成：没有拿到访问链接，请重试");
				setOverride(next);
				if (next.status === "published") {
					if (messagesNow?.publishSucceeded) toastNow?.("success", messagesNow.publishSucceeded);
				}
			}).catch(() => {
				busyRef.current = false;
				if (!aliveRef.current) return;
				setBusy(false);
				const { messages: messagesNow } = latestRef.current;
				const message = messagesNow?.publishFailed ?? "发布失败，请稍后重试";
				setOverride({
					...previous,
					status: "failed",
					failure: {
						code: "DEPLOY_FAILED",
						message
					}
				});
			});
		}, [
			app.appId,
			app.appName,
			app.localDir,
			app.release,
			app.taskSessionId,
			deploy,
			override,
			remoteRelease
		]),
		unpublish: (0, import_react$7.useCallback)(() => {
			if (busyRef.current) return;
			const previous = override ?? remoteRelease ?? app.release ?? { status: "never" };
			const request = { appId: app.appId };
			if (!unpublishApplication) {
				const error = /* @__PURE__ */ new Error("当前环境不支持取消发布（宿主未注入 unpublishApplication）");
				probeAppApi({
					api: UNPUBLISH_API,
					kind: "real",
					request,
					error
				});
				const { onToast: toastNow, messages: messagesNow } = latestRef.current;
				toastNow?.("error", messagesNow?.unpublishFailed ? `${messagesNow.unpublishFailed}: ${error.message}` : error.message);
				return;
			}
			busyRef.current = true;
			setBusy(true);
			probeAppApiCall(UNPUBLISH_API, request, () => unpublishApplication(request)).then((result) => {
				busyRef.current = false;
				if (!aliveRef.current) return;
				setBusy(false);
				setOverride(applyUnpublishResult(previous, result));
				const { onToast: toastNow, messages: messagesNow } = latestRef.current;
				if (messagesNow?.unpublishSucceeded) toastNow?.("success", messagesNow.unpublishSucceeded);
			}).catch((error) => {
				busyRef.current = false;
				if (!aliveRef.current) return;
				setBusy(false);
				const detail = error instanceof Error ? error.message : String(error);
				const { onToast: toastNow, messages: messagesNow } = latestRef.current;
				toastNow?.("error", messagesNow?.unpublishFailed ? `${messagesNow.unpublishFailed}: ${detail}` : detail);
			});
		}, [
			app.appId,
			app.release,
			override,
			remoteRelease,
			unpublishApplication
		]),
		busy
	};
}
var import_react$7, UNPUBLISH_API, DEPLOY_API;
var init_use_app_publish_actions = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_app_api_probe();
	init_deploy_result();
	init_unpublish_result();
	init_use_app_release_query();
	UNPUBLISH_API = "sites:unpublishApplication";
	DEPLOY_API = "sites:deploy";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/publish/use-app-share.ts
function useAppShare(options) {
	const { shareLink, appName, onOpenInBrowser, onToast, onShareComplete } = options;
	const t = useTranslation();
	const [loadingChannel, setLoadingChannel] = (0, import_react$6.useState)(null);
	const qrcode = useQrcodeDialog({ onShareComplete });
	const onWxShare = (0, import_react$6.useCallback)(async (scene) => {
		if (!shareLink) return;
		setLoadingChannel(scene === "chat" ? "wechat" : "timeline");
		try {
			const result = await handleWxShare({
				url: shareLink,
				scene,
				txt: appName,
				desc: t("application.share.wxDesc"),
				bizType: "artifact",
				shareUrl: shareLink,
				shareTitle: appName,
				h5Title: appName,
				h5Desc: t("application.share.wxDesc")
			});
			if (!result.success) {
				console.info("[AppShare] wx share failed, fallback to qrcode:", result.errmsg);
				qrcode.showQrcode({ url: shareLink });
			}
		} finally {
			setLoadingChannel(null);
		}
	}, [
		shareLink,
		appName,
		qrcode,
		t
	]);
	const onCopyLink = (0, import_react$6.useCallback)(async () => {
		if (!shareLink) return;
		const ok = await copyToClipboard(shareLink);
		onToast?.(ok ? "success" : "error", ok ? t("application.share.copySuccess") : t("application.share.copyFailed"));
	}, [
		shareLink,
		onToast,
		t
	]);
	const onGenerateQRCode = (0, import_react$6.useCallback)(() => {
		if (!shareLink) return;
		qrcode.showQrcode({ url: shareLink });
	}, [shareLink, qrcode]);
	const onOpenExternal = (0, import_react$6.useCallback)(() => {
		if (!shareLink) return;
		onOpenInBrowser?.(shareLink);
	}, [shareLink, onOpenInBrowser]);
	return {
		qrcodeVisible: qrcode.qrcodeVisible,
		qrcodeUrl: qrcode.qrcodeUrl,
		loadingChannel,
		onWxShare,
		onCopyLink,
		onGenerateQRCode,
		onOpenExternal,
		closeQrcode: qrcode.closeQrcode,
		generateQRCode: generateShareQRCode,
		onCopyQRCode: handleCopyQRCode,
		onSaveQRCode: handleSaveQRCode
	};
}
var import_react$6;
var init_use_app_share = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_use_qrcode_dialog();
	init_useI18n();
	init_clipboard();
	init_share_platform_helpers();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/contributions/app-space-mount/app-space-container.tsx
var import_react$5, import_jsx_runtime$3, CLOUD_SERVICE_NOT_ACTIVATED, AppSpaceBody, AppSpaceContainer;
var init_app_space_container = __esmMin((() => {
	init_app_space();
	init_src$3();
	init_src$2();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_selection_quote_conversation_input();
	init_html_editor();
	init_selection_quote();
	init_contexts();
	init_use_sites_page_show();
	init_useI18n();
	init_app_providers();
	init_useTheme();
	init_app_api_probe();
	init_resolve_app_capabilities();
	init_use_app_data_dump();
	init_cloud_service_slot();
	init_app_space_overlays();
	init_app_space_placeholder();
	init_app_space_toolbar();
	init_application_surface_slot();
	init_static_html_entry();
	init_use_app_editable_html();
	init_use_app_preview_blank();
	init_use_app_publish_actions();
	init_use_app_release_query();
	init_use_app_share();
	import_jsx_runtime$3 = require_jsx_runtime();
	CLOUD_SERVICE_NOT_ACTIVATED = { activated: false };
	AppSpaceBody = ({ app, blank, artifactId, conversationId, previewUrl, initialTab, onResetBlank }) => {
		const adapter = useAdapter();
		/** 预览区最终加载的地址（地址栏 / 探针 / 预览组件统一用它，保证与 webview 同源）。 */
		const effectivePreviewUrl = previewUrl ?? app.previewUrl;
		const t = useTranslation();
		const publishedApps = useAppProviders()?.publishedApps;
		const { refresh, currentUrl } = useBrowserPreview();
		const [activeTab, setActiveTab] = (0, import_react$5.useState)(initialTab ?? "preview");
		/**
		* 工具条「刷新」。
		*
		* ⚠️ 必须先清白屏结论再 `refresh()`：结论为 true 时预览区渲染的是失败占位页、
		* `Frame` 没挂载，`refresh()` 里的 `instance.current` 是 null，光调它等于空点
		* （#107769 里「刷新救不回来、只能重新点产物卡片」正是这个原因）。
		* 清掉结论后 `Frame` 重新挂载，webview 自己会加载 `currentUrl`。
		*/
		const handleRefresh = (0, import_react$5.useCallback)(() => {
			onResetBlank?.();
			refresh();
		}, [onResetBlank, refresh]);
		/**
		* 是否处于可视化编辑态。
		*
		* 编辑器要**整块替换预览区**而不是叠加：SDK 的载体是同源 `iframe srcDoc`，
		* 而预览区是跨 origin 的 webview，两者无法共存于一个渲染树里。
		*/
		const [htmlEditing, setHtmlEditing] = (0, import_react$5.useState)(false);
		const isMiniprogram = app.appType === "miniprogram";
		/** 当前应用形态对应的发布面板是否展开。 */
		const [publishPanelOpen, setPublishPanelOpen] = (0, import_react$5.useState)(false);
		/** 取消发布的二次确认 [P-3.4.1]：链接立即失效，故不能点一下就执行。 */
		const [unpublishConfirmOpen, setUnpublishConfirmOpen] = (0, import_react$5.useState)(false);
		(0, import_react$5.useEffect)(() => {
			setPublishPanelOpen(false);
			setUnpublishConfirmOpen(false);
		}, [app.appId, app.appType]);
		const handleToast = (0, import_react$5.useCallback)((type, message) => {
			if (type === "success") toast.success(message);
			else toast.error(message);
		}, []);
		/**
		* 发布态**真状态**查询（`GET /applications/detail`，渲染层直连控制面）。
		*
		* 挂载即查，点「发布」时再刷新一次。这是弹窗能区分「首次发布 / 已发布 / 已下线」
		* 的唯一依据 —— 产物上的 `app.release` 由 daemon `present_app_files` 写入，
		* 那条链路尚未落地，恒为空，只信它的话每个应用都是「从未发布」。
		*
		* ⚠️ **不传 `getApplication`**：查发布态是纯云端读，已改为 hook 内部直连
		* （见 `data/application-detail-api.ts`）。曾经传的是只在 desktop 注入的
		* `publishedApps.getApplication`，导致 Web 形态查不到状态。
		* 发布 / 下线**仍然**走下面的 `publishedApps` facade，不要一起改。
		*/
		const { release: remoteRelease, cloudServiceEndpoint, loading: releaseQueryLoading, error: releaseQueryError, notFound: appNotFound, settled: statusResolved, refresh: refreshRelease } = useAppReleaseQuery({ appId: app.appId });
		/**
		* 发布动作与发布态。
		*
		* ⚠️ 下面一律用 `release`（含本次操作的乐观态），**不要再读 `app.release`** ——
		* 后者是产物上的静态数据，发布期间不会变，直接读它会导致点了发布界面没反应。
		*/
		const { release, releaseSource, publish, unpublish, busy: publishBusy } = useAppPublishActions({
			app,
			remoteRelease,
			deploy: publishedApps?.deploy,
			unpublishApplication: publishedApps?.unpublishApplication,
			onToast: handleToast,
			messages: {
				publishSucceeded: t("application.publish.publishSucceeded"),
				publishFailed: t("application.publish.publishFailed"),
				publishNoShareLink: t("application.publish.publishNoShareLink"),
				publishNoLocalDir: t("application.publish.publishNoLocalDir"),
				publishUnsupported: t("application.publish.publishUnsupported"),
				unpublishSucceeded: t("application.publish.unpublishSucceeded"),
				unpublishFailed: t("application.publish.unpublishFailed")
			}
		});
		/**
		* 云服务真状态（来自云服务页里 `CloudServiceManager` 的 availability 上报，
		* 已折算成应用侧字段）。
		*
		* `null` = 还没拿到（没进过云服务页，或 status 接口失败）。
		*
		* ⚠️ 卸载云服务页时**不清空**：切回预览页仍要按最近一次真状态渲染工具条，
		* 否则用户每次切页签状态标签都会闪一下。
		*
		* ⚠️ 这里存的是**整份状态**而不是单个 `activated` 布尔：工具条右侧的状态标签
		* （「额度即将耗尽」等）要看 `billingStatus` / `provisionStatus`。曾经只存布尔，
		* 于是真状态一回来 `billingStatus` 就被抹掉，标签永远不出现，临期提示只剩云服务页
		* 内容区上方那条独占一行的徽标 —— 这正是「提示位置不对」的成因。
		*/
		const [cloudServiceState, setCloudServiceState] = (0, import_react$5.useState)(null);
		/** 切应用时必须清空 —— 否则 B 应用会顶着 A 应用的云服务状态。 */
		(0, import_react$5.useEffect)(() => {
			setCloudServiceState(null);
		}, [app.appId]);
		/**
		* 云服务页拿到的真状态优先，尚未进入页面时回落产物快照；两者都没有则视为未开通。
		* 最新产品口径已经移除「销毁云服务」入口，因此这里只保留展示态，不再装配破坏性动作。
		*/
		const cloudService = cloudServiceState ?? app.cloudService ?? CLOUD_SERVICE_NOT_ACTIVATED;
		const cloudServiceSource = cloudServiceState ? "GET /control/cloud-services/status" : app.cloudService ? "present_app_files(MOCK)" : "default(none)";
		const capabilities = (0, import_react$5.useMemo)(() => resolveAppCapabilities({
			release,
			cloudService,
			isLocalAvailable: app.isLocalAvailable ?? true
		}), [
			release,
			cloudService,
			app.isLocalAvailable
		]);
		/**
		* 地址栏展示的地址。
		*
		* **必须与预览区实际加载的地址同源**（`currentUrl` 来自
		* `BrowserPreviewContextProvider`，即 iframe/webview 真正在加载的那个 URL）。
		*
		* 曾写成 `app.release?.shareLink ?? app.previewUrl`，于是「已发布」的应用会
		* 在地址栏显示线上地址、预览区里跑的却是本地 dev server——用户以为在看线上
		* 版本，实际看的是本机 5173，属于会误导人的错位。
		*
		* PRD §3.2.3 也明确：应用空间的预览**始终是本地预览，不加载线上版本**。
		*
		* 线上地址不在地址栏承载，它的入口是：工具栏「在浏览器打开」按钮
		* （`canOpenInBrowser` 明确以 `release.shareLink` 为准）+ 发布面板里的链接行。
		*/
		const displayUrl = currentUrl || effectivePreviewUrl;
		/**
		* 工具栏「在浏览器打开」：打开**当前预览区正在加载的地址**，与地址栏同源。
		*
		* 曾经打开 `app.release?.shareLink`（线上地址），于是地址栏显示 localhost:5173、
		* 点按钮却跳到线上域名——mock 的假域名场景直接报 DNS_PROBE_FINISHED_NXDOMAIN。
		* 这个按钮紧贴预览区，语义上必须是「把我正在看的这个页面拿到浏览器里打开」。
		*
		* 线上地址的入口在发布面板（`PublishPanel` 的链接行 → `handleOpenUrlExternal`）。
		*/
		const handleOpenInBrowser = (0, import_react$5.useCallback)(() => {
			const url = currentUrl || effectivePreviewUrl;
			if (url) adapter?.openExternal?.(url);
		}, [
			adapter,
			currentUrl,
			effectivePreviewUrl
		]);
		/** 供发布面板调用（面板内的链接行、分享渠道都可能要开外部浏览器）。 */
		const handleOpenUrlExternal = (0, import_react$5.useCallback)((url) => {
			adapter?.openExternal?.(url);
		}, [adapter]);
		/**
		* ⚠️ 必须用箭头函数包一层，**不能**直接传 `adapter?.listDirectory`。
		*
		* adapter 是 class 实例，`listDirectory` 内部要 `this.loadSessionInternal(...)`。
		* 裸方法引用会丢掉 `this`，一调用就抛
		* `Cannot read properties of undefined (reading 'loadSessionInternal')`，
		* 被 hook 的 catch 静默吞掉 → 恒判「不可编辑」→ 编辑按钮永远是灰的。
		*
		* 同理不写 `.bind(adapter)`：那样每次 render 产生新引用，会让探测 effect 反复重跑。
		* 这里用 `useCallback` + 依赖 adapter，引用只在 adapter 变化时更新。
		*/
		const listDirectoryForProbe = (0, import_react$5.useMemo)(() => {
			const listDirectory = adapter?.listDirectory;
			if (!listDirectory) return;
			return (sessionId, path, depth) => listDirectory.call(adapter, sessionId, path, depth);
		}, [adapter]);
		const editableHtml = useAppEditableHtml({
			localDir: app.localDir,
			sessionId: app.taskSessionId,
			isLocalAvailable: app.isLocalAvailable !== false,
			listDirectory: listDirectoryForProbe
		});
		/**
		* 编辑器的 readFile / writeFile 包装。
		*
		* ⚠️ 必须把 `localDir` 放进 `allowedDirs`：daemon 的沙盒校验以 session cwd 为界，
		* 而应用工程目录不一定在 cwd 之下（从「我发布的应用」打开时尤其如此），
		* 不放行会直接 `Access denied: path not in allowed directories`。
		*
		* 不做 sandbox-preview / agent:// 的路径转换（`detail-panel-wrapper` 里那套）：
		* 应用空间的编辑目标恒为**本机**工程目录下的文件，云端沙箱路径不会走到这里。
		*/
		const htmlEditorReadFile = (0, import_react$5.useCallback)(async (sessionId, filePath, format) => {
			if (!adapter?.readFile) throw new Error("readFile not available");
			const allowedDirs = app.localDir ? [app.localDir] : void 0;
			const result = await adapter.readFile(sessionId, filePath, format ?? "text", { allowedDirs });
			if (!result.success) throw new Error(result.error || "readFile failed");
			return result.content ?? "";
		}, [adapter, app.localDir]);
		const htmlEditorWriteFile = (0, import_react$5.useCallback)(async (sessionId, filePath, content, opts) => {
			if (!adapter?.writeFile) return {
				success: false,
				error: "writeFile not available"
			};
			const allowedDirs = [...opts?.allowedDirs ?? [], ...app.localDir ? [app.localDir] : []];
			return adapter.writeFile(sessionId, filePath, content, { allowedDirs });
		}, [adapter, app.localDir]);
		/**
		* 外部改动增量同步：AI 或其他工具改了这个 HTML，编辑器自动重新载入。
		*
		* ⚠️ 必须用 ref 读 adapter、`useCallback` 空依赖，**不能**写成
		* `adapter?.subscribeFileChange?.bind(adapter)`：`.bind()` 每次都返回新函数引用，
		* 会让 SDK 内部的订阅 effect 反复 unsubscribe → subscribe，每次都有 ms 级握手窗口，
		* 期间 AI 改文件的推送会落空，表现为「编辑器不刷新」。
		*/
		const adapterRef = (0, import_react$5.useRef)(adapter);
		adapterRef.current = adapter;
		const htmlEditorSubscribeFileChange = (0, import_react$5.useCallback)((filePath, callback) => {
			const subscribe = adapterRef.current?.subscribeFileChange;
			if (!subscribe) return () => {};
			try {
				const unsubscribe = subscribe.call(adapterRef.current, filePath, callback);
				return () => {
					try {
						unsubscribe();
					} catch {}
				};
			} catch {
				return () => {};
			}
		}, []);
		const handleInsertSelectionQuote = (0, import_react$5.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock({
				...event,
				htmlSelection: true
			});
			const blocks = event.message ? [phraseBlock, {
				type: "text",
				text: event.message
			}] : [phraseBlock];
			const conversations = wb$1.conversations;
			if (tryInsertBlocksIntoCurrentConversation(conversations.current, conversations.currentId, blocks)) return;
			adapterRef.current?.requestInsertContentBlocks?.({
				contentBlocks: [phraseBlock],
				promptText: event.message
			});
		}, []);
		const handleSendSelectionQuote = (0, import_react$5.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock({
				...event,
				htmlSelection: true
			});
			const blocks = event.message ? [phraseBlock, {
				type: "text",
				text: event.message
			}] : [phraseBlock];
			const conversations = wb$1.conversations;
			if (trySendSelectionQuoteToCurrentConversation(conversations.current, conversations.currentId, blocks)) return;
			const sessionId = conversations.currentId;
			if (!sessionId) return;
			adapterRef.current?.requestSendPrompt?.({
				sessionId,
				prompt: blocks
			});
		}, []);
		/**
		* 编辑按钮。仅在探测到可编辑 HTML 且拿到会话时给出 —— 否则传 undefined，
		* 工具条会把按钮渲染成禁用态（不是隐藏，让用户知道这里有个能力）。
		*
		* 不再判 `adapter.readFile` / `writeFile`：它们在 `IAgentAdapter` 上是必选方法，
		* adapter 存在即可用（判了会被 tsc 报「条件恒为真」）。
		*/
		const canEditHtml = Boolean(editableHtml.filePath && app.taskSessionId && adapter);
		const openFolderTarget = app.appType === "miniprogram" ? app.localDir : editableHtml.filePath;
		const canOpenFolder = Boolean(adapter?.openFolder && app.isLocalAvailable !== false && (app.appType === "miniprogram" ? openFolderTarget : canEditHtml));
		const handleToggleEdit = (0, import_react$5.useCallback)(() => {
			setHtmlEditing((editing) => !editing);
		}, []);
		/**
		* ⋮ 菜单「打开文件夹」：小程序打开源码目录，单 HTML 应用定位预览文件。
		*
		* 单 HTML 行为对齐 `preview-modal`：先试文件路径，失败退回工程目录。
		*
		* ⚠️ 必须 `openFolder.call(adapter, ...)` 或 bind：adapter 是 class 实例，
		* `openFolder` 内部依赖 `this`，裸引用调用会抛错（与 listDirectory 同款问题）。
		*/
		const handleOpenFolder = (0, import_react$5.useCallback)(async () => {
			const openFolder = adapter?.openFolder;
			if (!openFolder || !openFolderTarget) return;
			try {
				await openFolder.call(adapter, openFolderTarget);
			} catch (error) {
				if (app.localDir && app.localDir !== openFolderTarget) try {
					await openFolder.call(adapter, app.localDir);
				} catch (error) {
					console.warn("[AppSpace] openFolder failed:", error);
				}
				else console.warn("[AppSpace] openFolder failed:", error);
			}
		}, [
			adapter,
			app.localDir,
			openFolderTarget
		]);
		(0, import_react$5.useEffect)(() => {
			setHtmlEditing(false);
		}, [app.appId, activeTab]);
		/**
		* 分享能力。**在这一层持有**，而不是放进 `PublishPanel`。
		*
		* `onShareComplete` 在二维码弹窗展示时关闭发布弹窗，保证一次只展示一个弹窗。
		* 这同时要求二维码弹窗渲染在 `PublishPanel` 之外，否则关闭发布弹窗会把它一起卸载。
		*
		* 链接取 `release.shareLink`（含乐观态）而非 `app.release` —— 首次发布成功后要能
		* **立刻**分享，不必等产物数据回流。
		*/
		const share = useAppShare({
			shareLink: release.shareLink,
			appName: app.appName,
			onOpenInBrowser: handleOpenUrlExternal,
			onToast: handleToast,
			onShareComplete: () => setPublishPanelOpen(false)
		});
		/**
		* 工具栏「发布」按钮 —— **只做两件事：刷新发布态 + 打开弹窗**。
		*
		* ⚠️ 绝不在这里调 `publish()`。曾经的逻辑是「`canUpdatePublish` 为假就顺手发一次」，
		* 意图是「未发布时省一次点击」，实际后果是：
		*
		* 1. `canUpdatePublish` 由 `app.release` 派生，而那份数据的写入方未落地恒为空 →
		*    **所有**应用（包括已在线的）都被判成未发布 → 点「发布」即对线上应用重新部署；
		* 2. 用户完全没有「先看看现在什么状态」的机会 —— 而这正是他点这个按钮的本意，
		*    弹窗标题是「发布应用」而不是「正在发布」。
		*
		* 现在按钮语义纯粹是「打开发布管理」：发布/更新/下线一律由弹窗内的按钮显式触发。
		* 顺带 `refreshRelease()`：应用可能在别处（设置页、另一台设备）被下线或重发过。
		*/
		const handlePublishButtonClick = (0, import_react$5.useCallback)(() => {
			if (isMiniprogram) {
				setPublishPanelOpen(true);
				return;
			}
			refreshRelease();
			probeAppView({
				view: "publish-panel",
				source: releaseSource,
				kind: resolveAppApiKind(releaseSource),
				data: {
					release,
					statusLoading: releaseQueryLoading,
					statusError: releaseQueryError
				}
			});
			setPublishPanelOpen(true);
		}, [
			isMiniprogram,
			refreshRelease,
			release,
			releaseSource,
			releaseQueryLoading,
			releaseQueryError
		]);
		/**
		* 面板**最终渲染数据**探针（与上面那条 `publish-panel` 不是重复）。
		*
		* 上面那条打在**点击瞬间**，此时 `refreshRelease()` 刚发出、还没回来，打出来的是
		* 上一轮的旧发布态；而用户看到的链接、按钮态是查询回来**之后**这一版。排查
		* 「面板上这条链接是哪来的 / 为什么按钮是灰的」必须看这一条。
		*
		* 依赖里带上 `release` 与查询态，所以一次开面板会打 1~2 条（打开时 loading、
		* 查回来后 published），刚好复原用户看到的状态迁移。**不是热路径**：面板关着时
		* 直接 return，开着期间状态迁移次数有限。
		*/
		(0, import_react$5.useEffect)(() => {
			if (!publishPanelOpen || isMiniprogram) return;
			probeAppView({
				view: "publish-panel.render",
				source: releaseSource,
				kind: resolveAppApiKind(releaseSource),
				data: {
					appId: app.appId,
					appName: app.appName,
					release,
					shareLink: release.shareLink ?? null,
					statusLoading: releaseQueryLoading,
					statusError: releaseQueryError,
					canUnpublish: capabilities.canUnpublish,
					canUpdatePublish: capabilities.canUpdatePublish,
					publishDisabledReason: capabilities.publishDisabledReason
				}
			});
		}, [
			publishPanelOpen,
			isMiniprogram,
			app.appId,
			app.appName,
			release,
			releaseSource,
			releaseQueryLoading,
			releaseQueryError,
			capabilities
		]);
		/**
		* 切换页签。
		*
		* 除了改 state，还**必须打一条探针**：切页签本身不发请求，若这里不打点，
		* 排查「工具条上的状态标签为什么是这样」时无从下手。
		*
		* ⚠️ 这条探针交代的是**工具条那份数据**（产物上的 `app.cloudService`），
		* 与云服务页内容无关 —— 页面内容由 `CloudServiceSlot` 里的 `CloudServiceManager`
		* 自己查 `GET /control/cloud-services/status`，并在挂载时打自己的
		* `cloud-service-page` 探针。两份数据可能不一致（一份 mock、一份真接口），
		* 所以两条日志都要留着，不要合并。
		*
		* 云服务页的 `kind` 走 `resolveAppApiKind` 而非硬写 `'mock'`：首次进入前来自产物快照，
		* 页面加载后则由 status 真接口回传，两份来源需要在探针里明确区分。
		*/
		const handleTabChange = (0, import_react$5.useCallback)((tab) => {
			setActiveTab(tab);
			if (tab === "cloudService") {
				probeAppView({
					view: "cloud-service-tab",
					source: cloudServiceSource,
					kind: resolveAppApiKind(cloudServiceSource),
					data: {
						appId: app.appId,
						cloudService,
						cloudServiceTag: capabilities.cloudServiceTag
					}
				});
				return;
			}
			probeAppView({
				view: "preview-tab",
				source: "present_app_files(MOCK)",
				kind: "mock",
				data: {
					appId: app.appId,
					previewUrl: effectivePreviewUrl,
					canPreview: capabilities.canPreview
				}
			});
		}, [
			app.appId,
			effectivePreviewUrl,
			cloudService,
			cloudServiceSource,
			capabilities.canPreview,
			capabilities.cloudServiceTag
		]);
		const [cloudServiceModule, setCloudServiceModule] = (0, import_react$5.useState)();
		/**
		* 云服务 pill（预览页）→ 进入云服务页。
		* Extension 可通过 opts.module 指定初始打开的模块（如 'auth'）。
		*/
		const handleOpenCloudService = (0, import_react$5.useCallback)((opts) => {
			setCloudServiceModule(opts?.module);
			handleTabChange("cloudService");
		}, [handleTabChange]);
		/**
		* 返回按钮（云服务页）→ 回到预览页。
		*
		* ⚠️ 这是云服务页**唯一**的返回出口：pill 在云服务页已不渲染，
		* 去掉这个按钮用户就进得去出不来。
		*/
		const handleBackToPreview = (0, import_react$5.useCallback)(() => {
			handleTabChange("preview");
		}, [handleTabChange]);
		const handleUnpublishConfirmed = (0, import_react$5.useCallback)(() => {
			setUnpublishConfirmOpen(false);
			unpublish();
		}, [unpublish]);
		useAppDataDump({
			app,
			release,
			releaseSource,
			cloudService,
			cloudServiceSource,
			capabilities
		});
		useSitesPageShow({
			active: activeTab === "preview" && statusResolved && !appNotFound,
			pageURL: "sites_app_space",
			ext1: app.appId,
			ext2: app.appType === "miniprogram" ? "miniprogram" : "web"
		});
		(0, import_react$5.useEffect)(() => {
			if (!publishPanelOpen || isMiniprogram) return;
			const onKeyDown = (event) => {
				if (event.key === "Escape") setPublishPanelOpen(false);
			};
			window.addEventListener("keydown", onKeyDown);
			return () => window.removeEventListener("keydown", onKeyDown);
		}, [publishPanelOpen, isMiniprogram]);
		if (!statusResolved || appNotFound) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AppSpaceStatusFallback, { deleted: appNotFound });
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "app-space",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "app-space__toolbar-anchor",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AppSpaceToolbar, {
						appName: app.appName,
						appType: app.appType,
						cloudServiceActive: activeTab === "cloudService",
						onOpenCloudService: handleOpenCloudService,
						onBackToPreview: handleBackToPreview,
						displayUrl,
						capabilities,
						cloudServiceTag: capabilities.cloudServiceTag,
						onRefresh: handleRefresh,
						onOpenInBrowser: handleOpenInBrowser,
						onShare: handlePublishButtonClick,
						onEdit: canEditHtml ? handleToggleEdit : void 0,
						editing: htmlEditing,
						onOpenFolder: canOpenFolder ? handleOpenFolder : void 0
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AppSpaceOverlays, {
					app,
					onOpenExternal: handleOpenUrlExternal,
					release,
					capabilities,
					share,
					publishPanelOpen,
					publishBusy,
					statusLoading: releaseQueryLoading,
					statusError: releaseQueryError,
					unpublishConfirmOpen,
					onClosePublishPanel: () => setPublishPanelOpen(false),
					onPublish: publish,
					onRequestUnpublish: () => setUnpublishConfirmOpen(true),
					onRetryStatus: refreshRelease,
					onCloseUnpublishConfirm: () => setUnpublishConfirmOpen(false),
					onConfirmUnpublish: handleUnpublishConfirmed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "app-space__body",
					children: [activeTab === "preview" && htmlEditing && editableHtml.filePath && app.taskSessionId ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(HtmlEditorPanel, {
						filePath: editableHtml.filePath,
						sessionId: app.taskSessionId,
						readFile: htmlEditorReadFile,
						writeFile: htmlEditorWriteFile,
						initialMode: "edit",
						onInsertSelectionQuote: handleInsertSelectionQuote,
						onSendSelectionQuote: handleSendSelectionQuote,
						subscribeFileChange: htmlEditorSubscribeFileChange
					}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: activeTab === "preview" ? "app-space__pane" : "app-space__pane app-space__pane--hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ApplicationSurfaceSlot, {
							app,
							cloudServiceEndpoint: cloudServiceState?.publicConfig?.endpoint ?? cloudServiceEndpoint,
							artifactId: artifactId ?? app.appId,
							conversationId: conversationId ?? app.taskSessionId ?? "",
							previewUrl: effectivePreviewUrl,
							canPreview: capabilities.canPreview,
							blank,
							active: activeTab === "preview",
							onOpenCloudService: handleOpenCloudService,
							onBackToPreview: handleBackToPreview
						})
					}), activeTab === "cloudService" ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CloudServiceSlot, {
						appId: app.appId,
						appName: app.appName,
						appType: app.appType,
						localDir: app.localDir,
						conversationId: conversationId ?? app.taskSessionId,
						initialModule: cloudServiceModule,
						onCloudServiceStateChange: setCloudServiceState
					}) : null]
				})
			]
		});
	};
	AppSpaceContainer = ({ app, artifactId, conversationId, initialTab }) => {
		const { theme } = useTheme();
		const adapter = useAdapter();
		/**
		* 预览地址实时转换：`file://` → `http://127.0.0.1:<port>/static-html/<token>/index.html`。
		*
		* `file://` 下 Vite 产物的 `type="module"` 脚本被 CORS 拦截 → 白屏（issue #100072）。
		* 复用 adapter 的 `resolvePreviewUrl`（daemon `staticHtml:registerDir`）转成同源 HTTP，
		* 由 `StaticHtmlHttpServer` 提供 CSP 注入、占位符替换与同源 fetch。
		*
		* 处理的入口形态：
		* - `file://...`：新数据，直接转 HTTP；
		* - `http://127.0.0.1:<port>/static-html/<token>/<relPath>`：**旧数据落盘的 http 地址**，
		*   token 是进程级随机、端口动态分配，daemon 重启后必然失效（设计文档 §2.3）。
		*   无法恢复旧 token，只能从 URL 反解出相对路径，结合 `localDir` 反推本地文件，
		*   重新走 `resolvePreviewUrl` 换新 token；
		* - 其余（https 分享链接等）：原样透传。
		*
		* ⚠️ 必须**每次打开实时转换**，不能直接读产物里落盘的 http 地址：token 进程级随机、
		* port 动态分配，daemon 重启即失效（设计文档 §2.3「HTTP 地址不能落盘」）。
		*
		* 转换期间预览地址置空（webview 不加载注定失败的地址），resolve 完成后加载；
		* 失败回落原地址，由下方 `useAppPreviewBlank` 兜底探测白屏。
		*/
		const [previewUrl, setPreviewUrl] = (0, import_react$5.useState)(app.previewUrl);
		const adapterRef = (0, import_react$5.useRef)(adapter);
		adapterRef.current = adapter;
		(0, import_react$5.useEffect)(() => {
			const url = app.previewUrl;
			const resolver = adapterRef.current?.resolvePreviewUrl;
			if (!url || !resolver) {
				setPreviewUrl(url);
				return;
			}
			let cancelled = false;
			setPreviewUrl(void 0);
			const resolveUrl = async () => {
				if (url.startsWith("file://")) return url;
				if (isStaleStaticHtmlUrl(url) && app.localDir) {
					const candidates = resolveStaleEntryCandidates(url, app.localDir);
					for (const candidate of candidates) if (await adapterRef.current?.checkFileExists?.(candidate)) return toFileUrl(candidate);
				}
				return url;
			};
			resolveUrl().then((fileUrl) => resolver.call(adapterRef.current, app.taskSessionId ?? "", fileUrl)).then((resolved) => {
				if (cancelled) return;
				setPreviewUrl(resolved && !resolved.startsWith("file://") ? resolved : url);
			}).catch(() => {
				if (cancelled) return;
				setPreviewUrl(url);
			});
			return () => {
				cancelled = true;
			};
		}, [
			app.previewUrl,
			app.taskSessionId,
			app.localDir
		]);
		const previewBlank = useAppPreviewBlank({ previewUrl });
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			ref: previewBlank.containerRef,
			style: { display: "contents" },
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(BrowserPreviewContextProvider, {
				environmentType: adapter?.environmentType,
				useWebview: adapter?.isWorkbuddyDesktop === true,
				theme,
				browserUrl: previewUrl,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AppSpaceBody, {
					app,
					blank: previewBlank.blank,
					artifactId,
					conversationId,
					previewUrl,
					initialTab,
					onResetBlank: previewBlank.resetBlank
				})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/cloud-sandbox-dirty-close.ts
/** 关闭目标是否就是当前云端脏文档（agent:// 与沙箱绝对路径可互认）。 */
function isCloudSandboxDirtyCloseTarget(closeFilePath, sandboxFilePath) {
	if (!closeFilePath || !sandboxFilePath) return false;
	return normalizeSandboxFilePath(closeFilePath) === normalizeSandboxFilePath(sandboxFilePath);
}
function getCloudSandboxDirtyCloseFileName(sandboxFilePath) {
	return getFileName(normalizeSandboxFilePath(sandboxFilePath)) || sandboxFilePath;
}
/**
* 切换目标用来和当前脏文档比对的路径。
* closeFilePath（产物 url / 文件路径）优先，其次才是选区 / fileTree 预提交路径。
*/
function getCloudSandboxDirtyLeaveDestination(target) {
	return target.closeFilePath ?? target.preselectFilePath ?? target.selectionDocument;
}
/**
* 是否要对当前云端脏文档弹出「保存 / 不保存 / 取消」。
*
* - close：只在关掉的就是那篇脏文档时弹（关别的 tab 不打扰）。
* - leave：切走时弹；目标仍是同一篇（agent:// 与沙箱绝对路径可互认）则不弹。
*   目标路径缺失视为离开当前文档（例如切到 MCP App / 终端以外的空 selection）。
*/
function shouldRunCloudSandboxDirtyPrompt(params) {
	if (params.preserveDocumentSelection) return false;
	if (!params.isDirty || !params.dirtySandboxFilePath) return false;
	const sameFile = isCloudSandboxDirtyCloseTarget(params.destinationOrCloseFilePath, params.dirtySandboxFilePath);
	return params.mode === "close" ? sameFile : !sameFile;
}
var init_cloud_sandbox_dirty_close = __esmMin((() => {
	init_cloud_sandbox_preview_url();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/cloud-sandbox-dirty-close-confirm.tsx
/**
* 弹出三按钮确认：保存 / 不保存 / 取消。
* 返回用户选择；关闭遮罩 / ESC 视为取消。
*/
function confirmCloudSandboxDirtyClose(labels) {
	if (typeof document === "undefined") return Promise.resolve("cancel");
	return new Promise((resolve) => {
		const container = document.createElement("div");
		container.className = "wb-modal-confirm-portal wb-modal-confirm-portal--cloud-sandbox-dirty-close";
		document.body.appendChild(container);
		const root = (0, import_client.createRoot)(container);
		let settled = false;
		const cleanup = () => {
			setTimeout(() => {
				root.unmount();
				if (container.parentNode) container.parentNode.removeChild(container);
			}, 0);
		};
		const finish = (action, setOpen) => {
			if (settled) return;
			settled = true;
			setOpen(false);
			resolve(action);
			cleanup();
		};
		const ConfirmRenderer = () => {
			const [open, setOpen] = (0, import_react$4.useState)(true);
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Modal, {
				open,
				onOpenChange: (next) => {
					if (!next) finish("cancel", setOpen);
				},
				title: labels.title,
				size: "small",
				variant: "confirm",
				closable: false,
				closeOnEscape: true,
				closeOnOverlayClick: false,
				okText: labels.save,
				cancelText: labels.cancel,
				footerExtra: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					onClick: () => finish("discard", setOpen),
					children: labels.discard
				}),
				onOk: () => {
					finish("save", setOpen);
					return false;
				},
				onCancel: () => {
					finish("cancel", setOpen);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: labels.message })
			});
		};
		root.render(/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ConfirmRenderer, {}));
	});
}
var import_react$4, import_client, import_jsx_runtime$2;
var init_cloud_sandbox_dirty_close_confirm = __esmMin((() => {
	init_src$1();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/cloud-sandbox-document-saver.ts
function trimTrailingSlash(value) {
	return value.replace(/\/+$/, "");
}
function readString(value) {
	return typeof value === "string" && value ? value : void 0;
}
function readNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
/**
* 把 `open_editors[]` 里的一项归一化为 `CloudSandboxOpenEditor`。
* `file_id` / `file_path` 缺失视为无效条目（返回 undefined），避免下游拿空 id 去 save。
*/
function normalizeOpenEditor(raw) {
	if (!raw || typeof raw !== "object") return;
	const record = raw;
	const fileId = readString(record.file_id);
	const filePath = readString(record.file_path);
	if (!fileId || !filePath) return;
	const lastSavedMs = readNumber(record.last_saved_ms);
	return {
		fileId,
		filePath,
		isDirty: record.is_dirty === true,
		lastSavedMs: lastSavedMs === void 0 || lastSavedMs === NEVER_SAVED_SENTINEL ? void 0 : lastSavedMs,
		type: readString(record.type)
	};
}
/**
* 带超时的 fetch。用 AbortController 而非 Promise.race，确保超时后底层连接真被掐断，
* 不给沙箱留悬挂请求。
*/
async function fetchWithTimeout(fetchImpl, url, init, timeoutMs) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return await fetchImpl(url, {
			...init,
			signal: controller.signal
		});
	} finally {
		clearTimeout(timer);
	}
}
async function readJsonBody(response) {
	try {
		const body = await response.json();
		return body && typeof body === "object" ? body : void 0;
	} catch {
		return;
	}
}
/**
* 创建云端沙箱文档 saver。
*
* `sandboxOrigin` 为空时返回 undefined —— 与 `resolveCloudSandboxDocumentPreviewUrlGetter`
* 的「输入不齐则回落」语义保持一致，让上层门控可以直接 `cloudSaver ??本地链路`。
*/
function createCloudSandboxDocumentSaver(options) {
	const origin = trimTrailingSlash(options.sandboxOrigin ?? "");
	if (!origin) return;
	const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
	const fetchImpl = options.fetchImpl ?? globalThis.fetch;
	if (typeof fetchImpl !== "function") return;
	const listEditors = async () => {
		for (const statusPath of EDITOR_STATUS_PATHS) try {
			const response = await fetchWithTimeout(fetchImpl, `${origin}${statusPath}`, { method: "GET" }, timeoutMs);
			if (!response.ok) continue;
			const list = (await readJsonBody(response))?.open_editors;
			if (!Array.isArray(list)) continue;
			return list.map(normalizeOpenEditor).filter((item) => item !== void 0);
		} catch {}
		return [];
	};
	const resolveEditor = async (filePath) => {
		if (!filePath) return;
		const normalized = normalizeSandboxFilePath(filePath);
		return (await listEditors()).find((editor) => normalizeSandboxFilePath(editor.filePath) === normalized);
	};
	const save = async (filePath) => {
		const editor = await resolveEditor(filePath);
		if (!editor) return {
			success: false,
			error: `No open editor found in sandbox for ${filePath || "(empty path)"}`
		};
		try {
			const response = await fetchWithTimeout(fetchImpl, `${origin}${SAVE_PATH}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ file_id: editor.fileId })
			}, timeoutMs);
			const body = await readJsonBody(response);
			const message = readString(body?.message);
			if (!response.ok || readNumber(body?.code) === NEVER_SAVED_SENTINEL) return {
				success: false,
				filePath: readString(body?.file_path) ?? editor.filePath,
				message,
				error: message ?? `editor save failed with HTTP ${response.status}`
			};
			return {
				success: true,
				filePath: readString(body?.file_path) ?? editor.filePath,
				message
			};
		} catch (err) {
			const detail = err instanceof Error ? err.message : String(err);
			return {
				success: false,
				filePath: editor.filePath,
				error: detail
			};
		}
	};
	const close = async (filePath, options = {}) => {
		const editor = await resolveEditor(filePath);
		if (!editor) return {
			success: true,
			notFound: true
		};
		try {
			const response = await fetchWithTimeout(fetchImpl, `${origin}${CLOSE_PATH}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					file_id: editor.fileId,
					...options.force ? { force: true } : {}
				})
			}, timeoutMs);
			const body = await readJsonBody(response);
			const message = readString(body?.message);
			if (response.status === 404) return {
				success: true,
				notFound: true,
				message
			};
			if (!response.ok) return {
				success: false,
				isDirty: body?.is_dirty === true,
				message,
				error: message ?? `editor close failed with HTTP ${response.status}`
			};
			return {
				success: true,
				message
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : String(err)
			};
		}
	};
	return {
		resolveEditor,
		listEditors,
		save,
		close
	};
}
var DEFAULT_TIMEOUT_MS, EDITOR_STATUS_PATHS, SAVE_PATH, CLOSE_PATH, NEVER_SAVED_SENTINEL;
var init_cloud_sandbox_document_saver = __esmMin((() => {
	init_cloud_sandbox_preview_url();
	DEFAULT_TIMEOUT_MS = 1e4;
	EDITOR_STATUS_PATHS = ["/localapi/editor/status", "/editor/status"];
	SAVE_PATH = "/localapi/save";
	CLOSE_PATH = "/localapi/editor/close";
	NEVER_SAVED_SENTINEL = -1;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/cloud-sandbox-external-preview-reload.ts
/**
* 是否应在外部写盘后重载预览。
*
* - dirty：保护用户未保存编辑，不 close、不重挂。
* - 刚 host save：mtime 轮询会跟着抖一下，抑制重载。
* - 无 open editor / clean：允许重载（无 editor 时仍重挂 iframe，覆盖「池已空但 UI 仍挂旧页」）。
*/
function decideCloudSandboxExternalReload(input) {
	const nowMs = input.nowMs ?? Date.now();
	const suppressMs = input.selfSaveSuppressMs ?? 3e3;
	if (typeof input.lastHostSaveAtMs === "number" && Number.isFinite(input.lastHostSaveAtMs) && nowMs - input.lastHostSaveAtMs >= 0 && nowMs - input.lastHostSaveAtMs < suppressMs) return {
		action: "skip",
		reason: "self-save"
	};
	if (input.editor?.isDirty) return {
		action: "skip",
		reason: "dirty"
	};
	if (!input.editor) return {
		action: "reload",
		reason: "no-open-editor"
	};
	return {
		action: "reload",
		reason: "external-change"
	};
}
/**
* 编排：查 editor → 决策 →（必要时）close → notifyReload。
* close 失败时不 notify，避免重挂复用仍存活的旧内存态。
*/
async function runCloudSandboxExternalPreviewReload(input) {
	const editor = await input.saver.resolveEditor(input.sandboxFilePath);
	const decision = decideCloudSandboxExternalReload({
		editor,
		lastHostSaveAtMs: input.lastHostSaveAtMs,
		nowMs: input.nowMs
	});
	if (decision.action === "skip") return {
		status: "skipped",
		reason: decision.reason
	};
	let closed = false;
	if (editor) {
		const closeResult = await input.saver.close(input.sandboxFilePath, { force: false });
		if (!closeResult.success) return {
			status: "skipped",
			reason: "close-failed"
		};
		closed = !closeResult.notFound;
	}
	input.notifyReload(input.sandboxFilePath);
	return {
		status: "reloaded",
		closed
	};
}
var init_cloud_sandbox_external_preview_reload = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/enterprise-docs-webview-body.less
var init_enterprise_docs_webview_body$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/enterprise-docs-webview-body.tsx
var import_react$3, import_jsx_runtime$1, EnterpriseDocsWebviewBody;
var init_enterprise_docs_webview_body = __esmMin((() => {
	init_enterprise_docs_webview_body$1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_private_host();
	init_tencent_docs();
	init_services();
	init_tencent_docs_theme_cookie();
	init_tencent_docs_url();
	import_jsx_runtime$1 = require_jsx_runtime();
	EnterpriseDocsWebviewBody = ({ url, fileId, previewSource, onPageTitleChange }) => {
		const adapter = useAdapter();
		const tdocPreviewPartition = useAccountScopedWebviewPartition("tdoc-preview");
		const tencentDocs = useTencentDocsFacade();
		const { currentConversation } = useConversations();
		const edition = useEffectiveEdition();
		const privateDocHost = usePrivateHost()?.docHost;
		/** cookie 注入完成后再渲染 webview，避免首屏 401 / 兜底登录页（issue #39357 截图场景）。 */
		const [cookieReady, setCookieReady] = (0, import_react$3.useState)(false);
		/** preload file:// URL，与 PreviewModal 同步状态机：undefined / null / string。 */
		const [previewPreloadUrl, setPreviewPreloadUrl] = (0, import_react$3.useState)(void 0);
		/**
		* 对话标记是否已写入主进程。先完成 seed 再渲染 webview，保证 guest preload
		* 首帧同步读取到 aiEdit:true；非对话场景或 bridge 不可用时直接完成。
		*/
		const [featureFlagSeeded, setFeatureFlagSeeded] = (0, import_react$3.useState)(false);
		const webviewRef = (0, import_react$3.useRef)(null);
		(0, import_react$3.useEffect)(() => {
			setCookieReady(false);
			setPreviewPreloadUrl(void 0);
			setFeatureFlagSeeded(false);
		}, [url, tdocPreviewPartition]);
		(0, import_react$3.useEffect)(() => {
			let cancelled = false;
			setFeatureFlagSeeded(false);
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSource,
				currentSessionId: currentConversation?.id
			});
			const update = window.__workbuddyUpdateDocsFeatureList;
			if (!sessionId || typeof update !== "function") {
				setFeatureFlagSeeded(true);
				return;
			}
			update({ aiEdit: true }).catch(() => {}).finally(() => {
				if (!cancelled) setFeatureFlagSeeded(true);
			});
			return () => {
				cancelled = true;
			};
		}, [
			previewSource,
			currentConversation?.id,
			url
		]);
		(0, import_react$3.useEffect)(() => {
			let cancelled = false;
			(async () => {
				try {
					const result = await tencentDocs.prepareEnterpriseDocPreview();
					if (cancelled) return;
					if (!result.ok) console.warn("[TencentDocs][LinkPreview] prepareEnterpriseDocPreview not ok", { reason: result.reason });
				} catch (err) {
					if (cancelled) return;
					console.warn("[TencentDocs][LinkPreview] prepareEnterpriseDocPreview failed", err);
				}
				if (!cancelled) await syncTencentDocsThemeCookie(url, tdocPreviewPartition, "LinkPreview");
				if (!cancelled) setCookieReady(true);
			})();
			return () => {
				cancelled = true;
			};
		}, [
			url,
			tencentDocs,
			tdocPreviewPartition
		]);
		(0, import_react$3.useEffect)(() => {
			if (!fileId || typeof window.__workbuddyRegisterOnlineDocPreview !== "function") return;
			let cancelled = false;
			let registrationId;
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSource,
				currentSessionId: currentConversation?.id
			});
			window.__workbuddyRegisterOnlineDocPreview({
				fileId,
				...sessionId ? { selectionScopeId: sessionId } : {}
			}).then((id) => {
				if (cancelled) {
					if (id && typeof window.__workbuddyUnregisterOnlineDocPreview === "function") return window.__workbuddyUnregisterOnlineDocPreview(id);
					return;
				}
				registrationId = id;
			}).catch((err) => {
				console.warn("[TencentDocs][LinkPreview] registerOnlineDocPreview failed", err);
			});
			return () => {
				cancelled = true;
				if (registrationId && typeof window.__workbuddyUnregisterOnlineDocPreview === "function") window.__workbuddyUnregisterOnlineDocPreview(registrationId).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] unregisterOnlineDocPreview failed", err);
				});
			};
		}, [
			fileId,
			currentConversation?.id,
			previewSource,
			url
		]);
		(0, import_react$3.useEffect)(() => {
			let cancelled = false;
			const resolver = window.__getTdocPreviewPreloadUrl;
			if (typeof resolver !== "function") {
				console.warn("[TencentDocs][LinkPreview] __getTdocPreviewPreloadUrl unavailable; in-doc link clicks may be swallowed by docs.qq.com SPA.");
				setPreviewPreloadUrl(null);
				return;
			}
			Promise.resolve().then(() => resolver()).then((u) => {
				if (cancelled) return;
				setPreviewPreloadUrl(typeof u === "string" && u.length > 0 ? u : null);
			}).catch((err) => {
				if (cancelled) return;
				console.warn("[TencentDocs][LinkPreview] resolve preload url failed", err);
				setPreviewPreloadUrl(null);
			});
			return () => {
				cancelled = true;
			};
		}, [url]);
		(0, import_react$3.useEffect)(() => {
			if (!cookieReady || previewPreloadUrl === void 0 || !featureFlagSeeded) return;
			const webview = webviewRef.current;
			if (!webview) return;
			let businessHandlersAttached = false;
			const openInBrowser = (rawUrl) => {
				if (adapter && typeof adapter.openExternal === "function") adapter.openExternal(rawUrl).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] openExternal failed", err);
					window.open(rawUrl, "_blank", "noopener,noreferrer");
				});
				else window.open(rawUrl, "_blank", "noopener,noreferrer");
			};
			/** 在当前 webview 内打开 URL（「新建文档」等需留在 webview 的场景）。 */
			const navigateWebviewInPlace = (rawUrl) => {
				const wv = webview;
				if (typeof wv.loadURL === "function") wv.loadURL(rawUrl).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] webview.loadURL failed, fallback to browser", err);
					openInBrowser(rawUrl);
				});
				else openInBrowser(rawUrl);
			};
			/** 顶级导航分流：新建文档留 webview；其余第三方外链 → 系统浏览器。 */
			const routeCapturedUrl = (rawUrl) => {
				if (isInPlaceCreateFileUrl(rawUrl)) navigateWebviewInPlace(rawUrl);
				else openInBrowser(rawUrl);
			};
			/**
			* 顶级导航 / 重定向的统一外抛闸门。
			*
			* 关键修复：chip 点击先 getPreviewUrl 拿到 temp-login-url，webview 加载后会
			* 重定向回真正的文档 URL；这条 login → doc 重定向（及文档自身多跳导航）属于
			* 腾讯文档域内导航，必须留在 webview。旧逻辑用 firstNavigationDone（只放行
			* 第一跳）会把它误判成外链 → openExternal 呼起系统浏览器。改为按 host 判定：
			* 只有真正的第三方外链才外抛，腾讯文档本体 + QQ 登录链路一律留在 webview。
			*/
			const externalizeIfNeeded = (ev) => {
				if (!ev?.url) return;
				if (!shouldOpenTencentDocsPreviewLinkExternally(ev.url, edition, privateDocHost)) return;
				ev.preventDefault?.();
				routeCapturedUrl(ev.url);
			};
			const onWillNavigate = (event) => {
				externalizeIfNeeded(event);
			};
			const onWillRedirect = (event) => {
				externalizeIfNeeded(event);
			};
			const onWillFrameNavigate = (event) => {
				const ev = event;
				if (ev?.isMainFrame === false) return;
				externalizeIfNeeded(ev);
			};
			const onIpcMessage = (event) => {
				const ev = event;
				if (ev?.channel === "tdoc-preview:navigate-in-place") {
					const payload = ev.args?.[0];
					if (typeof payload?.url === "string" && payload.url) navigateWebviewInPlace(payload.url);
					return;
				}
				if (ev?.channel !== "tdoc-preview:open-external") return;
				const payload = ev.args?.[0];
				if (typeof payload?.url === "string" && payload.url) openInBrowser(payload.url);
			};
			const reportPageTitle = (eventTitle) => {
				try {
					const wv = webviewRef.current;
					const title = (typeof eventTitle === "string" ? eventTitle : wv?.getTitle?.())?.trim();
					const liveUrl = wv?.getURL?.() || url;
					if (title && liveUrl) onPageTitleChange?.({
						url: liveUrl,
						title
					});
				} catch {}
			};
			const onDomReady = () => reportPageTitle();
			const onPageTitleUpdated = (event) => reportPageTitle(event.title);
			const attachHandlers = () => {
				if (businessHandlersAttached) return;
				businessHandlersAttached = true;
				webview.addEventListener("will-navigate", onWillNavigate);
				webview.addEventListener("will-redirect", onWillRedirect);
				webview.addEventListener("will-frame-navigate", onWillFrameNavigate);
				webview.addEventListener("ipc-message", onIpcMessage);
				webview.addEventListener("dom-ready", onDomReady);
				webview.addEventListener("page-title-updated", onPageTitleUpdated);
			};
			const wv = webview;
			let alreadyAttached = false;
			try {
				const id = wv.getWebContentsId?.();
				alreadyAttached = typeof id === "number" && id > 0;
			} catch {
				alreadyAttached = false;
			}
			const onDidAttach = () => attachHandlers();
			if (alreadyAttached) attachHandlers();
			else webview.addEventListener("did-attach", onDidAttach);
			return () => {
				webview.removeEventListener("did-attach", onDidAttach);
				if (businessHandlersAttached) {
					webview.removeEventListener("will-navigate", onWillNavigate);
					webview.removeEventListener("will-redirect", onWillRedirect);
					webview.removeEventListener("will-frame-navigate", onWillFrameNavigate);
					webview.removeEventListener("ipc-message", onIpcMessage);
					webview.removeEventListener("dom-ready", onDomReady);
					webview.removeEventListener("page-title-updated", onPageTitleUpdated);
				}
			};
		}, [
			url,
			adapter,
			cookieReady,
			previewPreloadUrl,
			featureFlagSeeded,
			edition,
			privateDocHost,
			tdocPreviewPartition,
			onPageTitleChange
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "tdoc-embed-webview",
			children: cookieReady && previewPreloadUrl !== void 0 && featureFlagSeeded && Boolean(tdocPreviewPartition) ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("webview", {
				ref: webviewRef,
				className: "tdoc-embed-webview__webview",
				src: url,
				partition: tdocPreviewPartition,
				webpreferences: "contextIsolation=yes",
				allowpopups: true,
				...previewPreloadUrl ? { preload: previewPreloadUrl } : {}
			}, tdocPreviewPartition) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tdoc-embed-webview__loading",
				children: "加载中..."
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/index.ts
var init_tencent_docs_link_preview = __esmMin((() => {
	init_enterprise_docs_webview_body();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/cloud-artifact-upload.ts
function safeDecode(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function getSandboxPreviewPath(value) {
	if (!/^https?:\/\//i.test(value)) return;
	try {
		return safeDecode(new URL(value).pathname).match(/^\/sandbox-preview\/[^/]+(\/.*)$/)?.[1];
	} catch {
		return;
	}
}
function isLoopbackHttpUrl(value) {
	try {
		const hostname = new URL(value).hostname.toLowerCase();
		return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "::1" || /^127(?:\.\d{1,3}){3}$/.test(hostname);
	} catch {
		return false;
	}
}
/**
* 将 Conversation Engine 云端产物地址归一成可交给 fileManager.readArtifact 的来源。
* 普通 HTTP(S) 预签名 URL 保持不变，由 renderer fetch 读取。
*/
function resolveCloudArtifactReadSource(filePath, environmentType) {
	const trimmed = filePath.trim();
	if (!trimmed) return;
	if (trimmed.startsWith("agent://")) return trimmed;
	const sandboxPath = getSandboxPreviewPath(trimmed);
	if (sandboxPath) return `agent://${sandboxPath}`;
	if (/^https?:\/\//i.test(trimmed)) return isLoopbackHttpUrl(trimmed) ? void 0 : trimmed;
	if (environmentType === "cloud" && (trimmed === "/workspace" || trimmed.startsWith("/workspace/"))) return `agent://${trimmed}`;
}
function getArtifactUploadFileName(filePath) {
	return safeDecode((() => {
		if (!/^https?:\/\//i.test(filePath)) return filePath;
		try {
			return new URL(filePath).pathname;
		} catch {
			return filePath;
		}
	})().replace(/\\/g, "/").split("/").pop() || "artifact");
}
async function toArrayBuffer(content) {
	if (content instanceof ArrayBuffer) return content;
	if (content instanceof Uint8Array) return content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength);
	if (content instanceof Blob) return content.arrayBuffer();
}
async function readCloudArtifactBytes(params) {
	const readSource = resolveCloudArtifactReadSource(params.filePath, params.environmentType);
	if (!readSource) return;
	if (/^https?:\/\//i.test(readSource)) return (await fetchRemoteArtifactFile(readSource))?.bytes;
	if (params.readFileWithFormat) return toArrayBuffer(await params.readFileWithFormat(readSource, "bytes"));
}
/**
* 把云端产物物化到 WorkBuddy 临时目录，供只接受本机 filePath 的旧上传器使用。
* 本地文件直接原样返回，不产生额外副本。
*/
async function materializeCloudArtifactForUpload(params) {
	const readSource = resolveCloudArtifactReadSource(params.filePath, params.environmentType);
	if (!readSource) return params.filePath;
	if (!params.downloadFileToLocal) throw new Error("当前环境不支持将云端产物下载到本地");
	const bytes = await readCloudArtifactBytes(params);
	if (!bytes) throw new Error("无法读取云端产物内容");
	const result = await params.downloadFileToLocal({
		url: readSource,
		fileName: getArtifactUploadFileName(params.filePath),
		contentBase64: arrayBufferToBase64(bytes)
	});
	if (!result.success || !result.filePath) throw new Error(result.error || "云端产物临时文件创建失败");
	return result.filePath;
}
/**
* 只在用户已经确认上传目标后物化云端产物，并保证上传成功、失败或取消后都清理临时副本。
* 本地文件不创建副本，也不要求 Desktop cleanup 能力。
*/
async function withMaterializedCloudArtifactForUpload(params) {
	const isCloudArtifact = Boolean(resolveCloudArtifactReadSource(params.filePath, params.environmentType));
	if (isCloudArtifact && !params.cleanupDownloadedTemporaryFile) throw new Error("当前环境不支持清理云端产物临时文件");
	const localFilePath = await materializeCloudArtifactForUpload(params);
	try {
		return await params.upload(localFilePath);
	} finally {
		if (isCloudArtifact) try {
			const result = await params.cleanupDownloadedTemporaryFile(localFilePath);
			if (!result.success) console.warn("[CloudArtifactUpload] temporary file cleanup failed:", result.error);
		} catch (error) {
			console.warn("[CloudArtifactUpload] temporary file cleanup failed:", error);
		}
	}
}
var init_cloud_artifact_upload = __esmMin((() => {
	init_artifact_remote_download();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/doc-font-scale.ts
/** 字号档位 → 文档缩放乘数（scale = (基准 + 档位偏移) / 基准） */
function docFontScaleOfLevel(level) {
	const offset = FONT_SIZE_OFFSET_MAP[level] ?? 0;
	return (MD_BASE_FONT_SIZE + offset) / MD_BASE_FONT_SIZE;
}
/**
* 订阅 WorkBuddy 应用字号档位，返回 markdown 文档缩放乘数。
* 档位变更时实时返回新 scale（React state 驱动 re-render）。
*/
function useDocFontScale() {
	const [scale, setScale] = (0, import_react$2.useState)(() => docFontScaleOfLevel(getSavedFontSizeLevel()));
	(0, import_react$2.useEffect)(() => {
		const syncScale = () => {
			setScale(docFontScaleOfLevel(getSavedFontSizeLevel()));
		};
		window.addEventListener("cb-font-size-level-change", syncScale);
		window.addEventListener("cb-font-size-change", syncScale);
		return () => {
			window.removeEventListener("cb-font-size-level-change", syncScale);
			window.removeEventListener("cb-font-size-change", syncScale);
		};
	}, []);
	return scale;
}
var import_react$2, MD_BASE_FONT_SIZE;
var init_doc_font_scale = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_font_size();
	init_types$2();
	MD_BASE_FONT_SIZE = 14;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/file-capabilities.ts
/**
* 为 DetailPanel 选择当前环境可用的文件能力。
*
* sandbox-aware 能力优先；没有 sandbox 能力时，只有本地环境才能回落到
* adapter 提供的宿主机文件能力，避免把云沙箱路径发送给 Desktop daemon。
*/
function resolveDetailPanelFileCapability(environmentType, localCapability, sandboxCapability) {
	if (sandboxCapability !== void 0) return sandboxCapability;
	return environmentType === "local" ? localCapability : void 0;
}
var init_file_capabilities = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/markdown-preview-telemetry.ts
/**
* 上报 Markdown 详情页曝光事件。
* 仅在 WorkBuddy 桌面端调用（web / cloud 环境不注入该回调）。
* eventcode = view-detail_page-expo
*/
function reportMarkdownDetailPageExpo(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "view",
			module: "detail_page",
			action: "expo",
			file_type: 1,
			source1: 1,
			source2: 2,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {},
			...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
		});
	} catch (err) {
		console.warn("[markdown-preview-telemetry] report failed", err);
	}
}
/**
* 上报 Markdown 文档编辑事件。
* 触发时机：用户在 MarkdownEditor 中首次修改内容（content change）。
* eventcode = edit-detail_main-edit_session
*/
function reportMarkdownEditSession(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "edit",
			module: "detail_main",
			action: "edit_session",
			file_type: 1,
			source1: 1,
			source2: 2,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {}
		});
	} catch (err) {
		console.warn("[markdown-preview-telemetry] report edit_session failed", err);
	}
}
/**
* 上报点击 AI 编辑入口事件。
* 触发时机：用户点击 MarkdownEditor 的「AI 编辑」入口按钮。
* eventcode = md-selection_revise-ai_edit_click
*/
function reportMarkdownAiEditClick(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "md",
			module: "selection_revise",
			action: "ai_edit_click",
			file_type: 1,
			source1: 1,
			source2: 2,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {}
		});
	} catch (err) {
		console.warn("[markdown-preview-telemetry] report ai_edit_click failed", err);
	}
}
/**
* 上报添加 AI 编辑提示词事件。
* 触发时机：用户在 AI 编辑弹窗中提交提示词（发送）。
* eventcode = md-selection_revise-send
*/
function reportMarkdownAiPromptSend(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "md",
			module: "selection_revise",
			action: "send",
			file_type: 1,
			source1: 1,
			source2: 2,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {}
		});
	} catch (err) {
		console.warn("[markdown-preview-telemetry] report send failed", err);
	}
}
/**
* 上报粘贴图片被拦截事件。
* 触发时机：用户在 MarkdownEditor 粘贴剪贴板图片，被捕获层拦截并 toast 引导。
* 每次拦截都上报（每次粘贴都是有效行为），不做幂等去重。
* eventcode = md-edit-picture_paste
*/
function reportMarkdownPicturePaste(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "md",
			module: "edit",
			action: "picture_paste",
			file_type: 1,
			source1: 1,
			source2: 2,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {}
		});
	} catch (err) {
		console.warn("[markdown-preview-telemetry] report picture_paste failed", err);
	}
}
var init_markdown_preview_telemetry = __esmMin((() => {
	init_reporter();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/terminal-availability.ts
function normalizeTaskCreationMode(mode) {
	switch (mode) {
		case "code":
		case "coding": return "code";
		case "work":
		case "working": return "work";
		case "design": return "design";
		default: return;
	}
}
/**
* 本地终端仅对从「代码开发」入口创建的任务开放。
*
* welcomeMode 是 renderer 侧首选字段；sourceMode 是宿主持久化字段，
* 历史值沿用 coding/working，因此需要同时兼容新旧命名。
*/
function isTerminalAvailableForTask(task) {
	return (normalizeTaskCreationMode(task?.welcomeMode) ?? normalizeTaskCreationMode(task?.sourceMode)) === "code";
}
var init_terminal_availability = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/upload-targets.ts
var init_upload_targets = __esmMin((() => {
	init_upload_targets$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/terminal-auto-create.ts
function shouldAutoCreateTerminal(isTerminalView, terminalSessionsLoaded, terminalSessionCount) {
	return isTerminalView && terminalSessionsLoaded && terminalSessionCount === 0;
}
var init_terminal_auto_create = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/use-conversation-terminals.ts
function createEmptySnapshot(provider, scopeId) {
	return {
		provider,
		scopeId,
		sessions: EMPTY_TERMINAL_SESSIONS,
		loaded: false,
		activeTerminalId: void 0
	};
}
/**
* 管理当前对话绑定的 Desktop Terminal。
*
* Terminal 主进程以 scopeId 隔离实例；这里把 conversationId 作为唯一 scope，
* 并在所有异步结果写入 UI 前再次校验 scope，避免切换会话后旧请求串入新会话。
*/
function useConversationTerminals({ terminalProvider, conversationId, cwd, isTerminalView, onError }) {
	const [snapshot, setSnapshot] = (0, import_react$1.useState)(() => createEmptySnapshot(terminalProvider, conversationId));
	const currentProviderRef = useLatestRef(terminalProvider);
	const currentScopeIdRef = useLatestRef(conversationId);
	const onErrorRef = useLatestRef(onError);
	const activeTerminalByScopeRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
	const autoCreateSuppressedScopesRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Set());
	const createPromiseByScopeRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
	const mountedRef = (0, import_react$1.useRef)(true);
	const wasTerminalViewRef = (0, import_react$1.useRef)(isTerminalView);
	const terminalViewRefreshPendingRef = (0, import_react$1.useRef)(false);
	if (isTerminalView && !wasTerminalViewRef.current) terminalViewRefreshPendingRef.current = true;
	wasTerminalViewRef.current = isTerminalView;
	(0, import_react$1.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const isCurrentScope = (0, import_react$1.useCallback)((provider, scopeId) => mountedRef.current && currentProviderRef.current === provider && currentScopeIdRef.current === scopeId, [currentProviderRef, currentScopeIdRef]);
	const applySessions = (0, import_react$1.useCallback)((provider, scopeId, sessions) => {
		if (!isCurrentScope(provider, scopeId)) return;
		setSnapshot((current) => {
			if (!isCurrentScope(provider, scopeId)) return current;
			const activeTerminalId = [activeTerminalByScopeRef.current.get(scopeId), current.provider === provider && current.scopeId === scopeId ? current.activeTerminalId : void 0].find((terminalId) => terminalId && sessions.some((session) => session.id === terminalId)) ?? sessions[0]?.id;
			if (activeTerminalId) activeTerminalByScopeRef.current.set(scopeId, activeTerminalId);
			else activeTerminalByScopeRef.current.delete(scopeId);
			terminalViewRefreshPendingRef.current = false;
			return {
				provider,
				scopeId,
				sessions,
				loaded: true,
				activeTerminalId
			};
		});
	}, [isCurrentScope]);
	const loadSessions = (0, import_react$1.useCallback)(async (provider, scopeId) => provider.list({ scopeId }), []);
	const lastReportedErrorRef = (0, import_react$1.useRef)(void 0);
	const refreshSessions = (0, import_react$1.useCallback)(async (provider, scopeId) => {
		try {
			const sessions = await loadSessions(provider, scopeId);
			if (!isCurrentScope(provider, scopeId)) return true;
			applySessions(provider, scopeId, sessions);
			lastReportedErrorRef.current = void 0;
			return true;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			if (isCurrentScope(provider, scopeId) && errorMessage !== lastReportedErrorRef.current) {
				lastReportedErrorRef.current = errorMessage;
				onErrorRef.current(error);
			}
			return false;
		}
	}, [
		applySessions,
		isCurrentScope,
		loadSessions,
		onErrorRef
	]);
	(0, import_react$1.useEffect)(() => {
		lastReportedErrorRef.current = void 0;
	}, [conversationId, terminalProvider]);
	(0, import_react$1.useEffect)(() => {
		if (!terminalProvider || !conversationId) {
			terminalViewRefreshPendingRef.current = false;
			setSnapshot(createEmptySnapshot(terminalProvider, conversationId));
			return;
		}
		setSnapshot((current) => current.provider === terminalProvider && current.scopeId === conversationId ? current : createEmptySnapshot(terminalProvider, conversationId));
		if (isTerminalView) return;
		refreshSessions(terminalProvider, conversationId).catch(() => void 0);
	}, [
		conversationId,
		isTerminalView,
		refreshSessions,
		terminalProvider
	]);
	usePollScheduler({
		enabled: Boolean(terminalProvider && conversationId && isTerminalView),
		intervalMs: TERMINAL_REFRESH_INTERVAL_MS,
		immediate: true,
		pauseWhenDocumentHidden: true,
		resetKey: `${conversationId ?? ""}:${terminalProvider ? "1" : "0"}`,
		run: async () => {
			if (!terminalProvider || !conversationId) return false;
			return refreshSessions(terminalProvider, conversationId);
		}
	});
	const createTerminal = (0, import_react$1.useCallback)(() => {
		const provider = terminalProvider;
		const scopeId = conversationId;
		if (!provider || !scopeId) return Promise.resolve();
		const pending = createPromiseByScopeRef.current.get(scopeId);
		if (pending?.provider === provider) return pending.promise;
		const promise = provider.create({
			cwd,
			scopeId
		}).then((session) => {
			autoCreateSuppressedScopesRef.current.delete(scopeId);
			if (!isCurrentScope(provider, scopeId)) return;
			activeTerminalByScopeRef.current.set(scopeId, session.id);
			setSnapshot((current) => {
				if (!isCurrentScope(provider, scopeId) || current.provider !== provider || current.scopeId !== scopeId) return current;
				return {
					...current,
					sessions: [...current.sessions.filter((item) => item.id !== session.id), session],
					loaded: true,
					activeTerminalId: session.id
				};
			});
		}).catch((error) => {
			if (isCurrentScope(provider, scopeId)) onErrorRef.current(error);
		}).finally(() => {
			if (createPromiseByScopeRef.current.get(scopeId)?.promise === promise) createPromiseByScopeRef.current.delete(scopeId);
		});
		createPromiseByScopeRef.current.set(scopeId, {
			provider,
			promise
		});
		return promise;
	}, [
		conversationId,
		cwd,
		isCurrentScope,
		onErrorRef,
		terminalProvider
	]);
	const snapshotMatchesCurrentScope = snapshot.provider === terminalProvider && snapshot.scopeId === conversationId && Boolean(conversationId);
	const sessions = snapshotMatchesCurrentScope ? snapshot.sessions : EMPTY_TERMINAL_SESSIONS;
	const activeTerminalId = snapshotMatchesCurrentScope ? snapshot.activeTerminalId : void 0;
	const sessionsLoaded = snapshotMatchesCurrentScope && snapshot.loaded;
	const autoCreateSuppressed = conversationId ? autoCreateSuppressedScopesRef.current.has(conversationId) : false;
	const canAutoCreate = sessionsLoaded && !terminalViewRefreshPendingRef.current && !autoCreateSuppressed;
	(0, import_react$1.useEffect)(() => {
		if (conversationId && shouldAutoCreateTerminal(isTerminalView, canAutoCreate, sessions.length)) createTerminal().catch(() => void 0);
	}, [
		conversationId,
		canAutoCreate,
		createTerminal,
		isTerminalView,
		sessions.length
	]);
	return {
		sessions,
		activeTerminalId,
		selectTerminal: (0, import_react$1.useCallback)((terminalId) => {
			const provider = terminalProvider;
			const scopeId = conversationId;
			if (!provider || !scopeId || !isCurrentScope(provider, scopeId)) return;
			activeTerminalByScopeRef.current.set(scopeId, terminalId);
			setSnapshot((current) => current.provider === provider && current.scopeId === scopeId ? {
				...current,
				activeTerminalId: terminalId
			} : current);
		}, [
			conversationId,
			isCurrentScope,
			terminalProvider
		]),
		createTerminal,
		closeTerminal: (0, import_react$1.useCallback)(async (terminalId) => {
			const provider = terminalProvider;
			const scopeId = conversationId;
			if (!provider || !scopeId) return false;
			const wasAutoCreateSuppressed = autoCreateSuppressedScopesRef.current.has(scopeId);
			autoCreateSuppressedScopesRef.current.add(scopeId);
			let closeSucceeded = false;
			try {
				await provider.close(terminalId);
				closeSucceeded = true;
				const sessions = await loadSessions(provider, scopeId);
				if (sessions.length > 0 && !wasAutoCreateSuppressed) autoCreateSuppressedScopesRef.current.delete(scopeId);
				applySessions(provider, scopeId, sessions);
				return true;
			} catch (error) {
				if (!closeSucceeded && !wasAutoCreateSuppressed) autoCreateSuppressedScopesRef.current.delete(scopeId);
				if (isCurrentScope(provider, scopeId)) onErrorRef.current(error);
				return false;
			}
		}, [
			conversationId,
			applySessions,
			isCurrentScope,
			loadSessions,
			onErrorRef,
			terminalProvider
		]),
		renameTerminal: (0, import_react$1.useCallback)(async (terminalId, title) => {
			const provider = terminalProvider;
			const scopeId = conversationId;
			if (!provider || !scopeId) return false;
			try {
				const renamedSession = await provider.rename(terminalId, title);
				if (isCurrentScope(provider, scopeId)) setSnapshot((current) => current.provider === provider && current.scopeId === scopeId ? {
					...current,
					sessions: current.sessions.map((session) => session.id === terminalId ? renamedSession : session)
				} : current);
				return true;
			} catch (error) {
				if (isCurrentScope(provider, scopeId)) onErrorRef.current(error);
				return false;
			}
		}, [
			conversationId,
			isCurrentScope,
			onErrorRef,
			terminalProvider
		])
	};
}
var import_react$1, TERMINAL_REFRESH_INTERVAL_MS, EMPTY_TERMINAL_SESSIONS;
var init_use_conversation_terminals = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_latest_ref();
	init_use_poll_scheduler();
	init_terminal_auto_create();
	TERMINAL_REFRESH_INTERVAL_MS = 2e3;
	EMPTY_TERMINAL_SESSIONS = [];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/index.tsx
var detail_panel_wrapper_exports = /* @__PURE__ */ __exportAll({ DetailPanelWrapper: () => DetailPanelWrapper });
/** 安全 decode URI 组件：decodeURIComponent 的 try-catch 包装，畸形 % 序列时回退原值 */
function safeDecodeUri(s) {
	try {
		return decodeURIComponent(s);
	} catch {
		return s;
	}
}
function normalizeNetDriveUploadPath(filePath) {
	if (filePath.startsWith("agent://")) try {
		return decodeURIComponent(new URL(filePath).pathname);
	} catch {
		return filePath.replace(/^agent:\/\//, "");
	}
	if (filePath.startsWith("file://")) try {
		return decodeURIComponent(new URL(filePath).pathname);
	} catch {
		return filePath.replace(/^file:\/\//, "");
	}
	if (/^https?:\/\//.test(filePath)) try {
		const match = decodeURIComponent(new URL(filePath).pathname).match(/^\/sandbox-preview\/[^/]+(\/.*)/);
		if (match) return match[1];
	} catch {}
	return filePath;
}
function isPlanTaskToolCall(tool) {
	return tool.name === "todo_write" || tool.name === "TodoWrite";
}
function extractPlanTaskTodos(tool) {
	const args = tool.args;
	const result = tool.result;
	if (Array.isArray(result?.result?.todos)) return result?.result?.todos ?? [];
	const rawTodos = args?.todos;
	if (typeof rawTodos === "string") try {
		const parsed = JSON.parse(rawTodos);
		if (Array.isArray(parsed)) return parsed;
	} catch {
		return [];
	}
	if (Array.isArray(rawTodos)) return rawTodos;
	const newTodos = Array.isArray(args?.newTodos) ? args.newTodos : [];
	return [...Array.isArray(args?.oldTodos) ? args.oldTodos : [], ...newTodos];
}
function shouldHideEmptyPlanTaskTool(tool) {
	return isPlanTaskToolCall(tool) && extractPlanTaskTodos(tool).length === 0;
}
var import_react, import_jsx_runtime, DetailPanelCachedToolRenderer, ARDOT_OPEN_DESIGN_APP_ID, CLOUD_SANDBOX_DIRTY_POLL_MS, DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE, DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX, DPW_SLOW_RENDER_SAMPLE_MS, DetailPanelWrapper;
var init_detail_panel_wrapper = __esmMin((() => {
	init_src$4();
	init_src$3();
	init_src$2();
	init_src$1();
	init_src();
	init_renderer();
	init_doc_artifact_source();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_session_browser_view_host();
	init_contexts();
	init_account_context();
	init_product_features();
	init_quick_ask_session_archive();
	init_quick_ask_session_state();
	init_session_detail_restore();
	init_use_artifact_preview_slot();
	init_use_ima_api();
	init_use_ima_enabled();
	init_use_is_enterprise_admin();
	init_use_knowledge_base_feature();
	init_use_latest_ref();
	init_use_oneid_applications();
	init_use_private_host();
	init_use_tencent_docs_knowledge_feature();
	init_use_tencent_lexiang_enabled();
	init_use_tencent_netdrive_knowledge_feature();
	init_i18n();
	init_useI18n();
	init_app_artifact();
	init_app_space_container();
	init_forced_onboarding_store();
	init_project_input_context();
	init_common();
	init_conversation();
	init_expert();
	init_persisted_open_pending();
	init_services$1();
	init_tencent_docs();
	init_jump_to_conversation_payload();
	init_local_file_open();
	init_open_conflict_ui_coordinator();
	init_use_file_viewer_page_show();
	init_router();
	init_extension_menu_hook();
	init_extension_mount();
	init_app_providers();
	init_telemetry();
	init_ardot_canvas();
	init_artifact_drag_resolver();
	init_artifact_path_identity();
	init_auth_expired_detector();
	init_cloud_sandbox_dirty_close();
	init_cloud_sandbox_dirty_close_confirm();
	init_cloud_sandbox_document_saver();
	init_cloud_sandbox_external_preview_reload();
	init_cloud_sandbox_preview_url();
	init_environment();
	init_errors();
	init_file_path();
	init_html_artifact_preview();
	init_http_logger();
	init_internal_browser_open();
	init_markdown_image_uploader();
	init_mcp_app_panel_replay();
	init_perf_tracker();
	init_publish_utils();
	init_read_allowed_dirs();
	init_knowledge_upload_error();
	init_share_client_metric();
	init_storage_quota_exceeded_dialog();
	init_space_url();
	init_tencent_docs_url();
	init_user_attachment_preview();
	init_useTheme();
	init_workspace_file_guard();
	init_canvas_telemetry();
	init_use_colleague_document_preview();
	init_error_boundary();
	init_genie_embed();
	init_html_editor();
	init_icons();
	init_ima();
	init_telemetry$1();
	init_single_service_panel();
	init_knowledge_base_panel();
	init_netdrive_service();
	init_upload_modal();
	init_use_library_upload();
	init_netdrive_store_context();
	init_store();
	init_telemetry$3();
	init_mime_utils();
	init_link_handler();
	init_telemetry$2();
	init_lexiang_content_picker();
	init_use_describe_upload_error();
	init_use_lexiang_library_mode();
	init_task_starter_store();
	init_use_assistant_display();
	init_agent_status();
	init_selection_quote();
	init_tencent_docs_link_preview();
	init_tools();
	init_cloud_artifact_upload();
	init_context_override();
	init_doc_font_scale();
	init_file_capabilities();
	init_html_editor_telemetry();
	init_markdown_preview_telemetry();
	init_selection_quote_conversation_input();
	init_terminal_availability();
	init_upload_targets();
	init_use_ardot_enterprise_onboarding();
	init_use_conversation_terminals();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	DetailPanelCachedToolRenderer = import_react.memo(({ tool, adapter, sessionId, onFileClick, onPreviewUrlClick, compact }) => {
		if (shouldHideEmptyPlanTaskTool(tool)) return null;
		const renderer = toolRendererRegistry.getRenderer(tool);
		const disableCreditsConsumed = (0, import_react.useMemo)(() => {
			if (typeof window !== "undefined" && window.PRODUCT_FEATURES) try {
				return !!JSON.parse(window.PRODUCT_FEATURES)?.DisableCreditsConsumed;
			} catch {
				return false;
			}
			return false;
		}, []);
		const toolContext = (0, import_react.useMemo)(() => ({
			resultVisible: true,
			setResultVisible: () => {},
			adapter,
			sessionId,
			onFileClick,
			onPreviewUrlClick,
			disableCreditsConsumed,
			compact
		}), [
			adapter,
			sessionId,
			onFileClick,
			onPreviewUrlClick,
			disableCreditsConsumed,
			compact
		]);
		const toolElement = (0, import_react.useMemo)(() => renderer?.render?.(tool, void 0, toolContext) ?? null, [
			renderer,
			tool,
			toolContext
		]);
		const explanation = resolveToolExplanation(tool);
		if (explanation && toolElement) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tool-with-explanation",
			"data-chat-search-skip": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tool-explanation-text",
				children: `${explanation}`
			}), toolElement]
		});
		return toolElement;
	}, (prevProps, nextProps) => prevProps.tool === nextProps.tool && prevProps.sessionId === nextProps.sessionId && prevProps.onFileClick === nextProps.onFileClick && prevProps.onPreviewUrlClick === nextProps.onPreviewUrlClick && prevProps.compact === nextProps.compact);
	DetailPanelCachedToolRenderer.displayName = "DetailPanelCachedToolRenderer";
	ARDOT_OPEN_DESIGN_APP_ID = "ardot/open_design";
	CLOUD_SANDBOX_DIRTY_POLL_MS = 2e3;
	DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE = "ardot-open-design-canvas";
	DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX = "design-new-canvas";
	DPW_SLOW_RENDER_SAMPLE_MS = 16;
	DetailPanelWrapper = import_react.memo(({ width, narrowOverviewLayout, detailInfo, isPreviewFullscreen, onTogglePreviewFullscreen, showMediaPreviewFullscreenButton = false, PanelComponent, canSaveArtifactToLibrary = true, disableArtifactToolbarActions = false, disableArtifactUploadActions = false, hideHeaderDebugTools = false, forceCloudEnvironment = false, disableDocumentSdkPreview = false, documentPreviewSource = "session-open", documentSelectionBinding, getDocumentPreviewUrlOverride, canUseDocumentPreviewForFilePath, registerBeforeSelectFilePath, registerBeforeCloseDetailPanel, onOpenInternalBrowser }) => {
		perfInc("DetailPanelWrapper.render");
		const dpwRenderStartRef = (0, import_react.useRef)(0);
		dpwRenderStartRef.current = performance.now();
		(0, import_react.useLayoutEffect)(() => {
			const elapsedMs = performance.now() - dpwRenderStartRef.current;
			perfInc("dpw.subtree.totalMs", Math.round(elapsedMs));
			if (elapsedMs >= DPW_SLOW_RENDER_SAMPLE_MS) perfSample("dpw.subtree.slow", { elapsedMs: Math.round(elapsedMs) }, 10);
		});
		const renderExtensionArtifactPreview = useArtifactPreviewSlot();
		const extensionTrustedUrls = useExtensionTrustedUrls();
		const extensionArtifactPreviews = useExtensionArtifactPreviews();
		const extensionStoreStatus = useExtensionStoreStatus();
		const currentDpwPropsSnapshot = {
			width,
			detailInfo,
			isPreviewFullscreen,
			onTogglePreviewFullscreen,
			PanelComponent,
			narrowOverviewLayout,
			registerBeforeCloseDetailPanel,
			registerBeforeSelectFilePath,
			getDocumentPreviewUrlOverride,
			canUseDocumentPreviewForFilePath,
			documentSelectionBinding,
			onOpenInternalBrowser
		};
		const prevDpwPropsSnapshotRef = (0, import_react.useRef)(null);
		if (prevDpwPropsSnapshotRef.current) {
			let changed = false;
			for (const key of Object.keys(currentDpwPropsSnapshot)) if (prevDpwPropsSnapshotRef.current[key] !== currentDpwPropsSnapshot[key]) {
				perfInc(`dpw.dep.${key}`);
				changed = true;
			}
			perfInc(changed ? "dpw.rerender.propsChanged" : "dpw.rerender.propsSame");
		} else perfInc("dpw.rerender.firstMount");
		prevDpwPropsSnapshotRef.current = currentDpwPropsSnapshot;
		const ActivePanel = PanelComponent ?? DetailPanel;
		const t = useTranslation();
		const context = import_react.useContext(ConversationsContext);
		const uiLayoutState = useUILayoutStateOptional();
		const isMobileLayout = context?.isMobileLayout ?? false;
		const adapter = useAdapter();
		(0, import_react.useEffect)(() => {
			if (!adapter?.getProductConfiguration) return;
			let active = true;
			adapter.getProductConfiguration().then((config) => {
				if (!active) return;
				setOfficePreviewSizeLimitOverrides(config?.productFeaturesConfig?.OfficePreviewSizeLimits);
			}).catch(() => {});
			const unsub = adapter.onProductConfigChanged?.((params) => {
				setOfficePreviewSizeLimitOverrides(params?.productFeaturesConfig?.OfficePreviewSizeLimits);
			});
			return () => {
				active = false;
				unsub?.();
			};
		}, [adapter]);
		const hostedDocumentPreviewLifecycle = useDocumentPreviewHostLifecycle();
		const agentServices = useAgentServices();
		const appProviders = useAppProviders();
		const publishedAppsProvider = appProviders?.publishedApps;
		const terminalProvider = appProviders?.terminal;
		const openImaUploadResult = useOpenImaUploadResult();
		const { account } = useAccount();
		const wecomDocLogin = agentServices?.wecomDocLogin;
		const prepareWecomDocNavigation = (0, import_react.useMemo)(() => wecomDocLogin ? async (docUrl) => {
			try {
				return await wecomDocLogin.prepareNavigation(docUrl);
			} catch (error) {
				openLoginExpiredDialog();
				throw error;
			}
		} : void 0, [wecomDocLogin]);
		const browserPreviewPartition = useAccountScopedWebviewPartition("browser-preview");
		const tencentDocs = agentServices?.tencentDocs;
		const localDocs = agentServices?.localDocs;
		const activeDocumentPreviewContextRef = (0, import_react.useRef)(null);
		const myFiles = agentServices?.myFiles;
		const projectChat = agentServices?.projectChat;
		const locale = useLocale();
		const { checkAuth, authConnector, authRevoke } = useArdotAuth(adapter);
		const { theme: currentTheme, vsCodeThemeName: themeName } = useTheme();
		const isShareEnabled = useShareFeature();
		const isHtmlShareEnabled = useHtmlPreviewShareFeature();
		const wechatShareFileEnabled = useWechatShareFileFeature();
		const isMioraShareEnabled = useMioraArtifactShareFeature();
		const assistantDisplay = useAssistantDisplay(adapter ?? void 0);
		const router = useRouterContextSafe();
		const navigate = useNavigate();
		const moduleHost = useOptionalModuleHost();
		const isCompactMode = true;
		const [documentPreviewLocale, setDocumentPreviewLocale] = (0, import_react.useState)(getLocale);
		const knowledgeBaseEnabled = useKnowledgeBaseFeature();
		const tencentDocsKnowledgeEnabled = useTencentDocsKnowledgeFeature();
		const tencentNetDriveKnowledgeEnabled = useTencentNetDriveKnowledgeFeature();
		const { enabled: tencentLexiangEnabled } = useTencentLexiangEnabled();
		const { libraryEnabled: imaEnabled, isPersonalUser } = useImaEnabled();
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const isInternalIOAAccount = useIsInternalIOAAccount();
		const wxShareFileBlockedByEdition = isEnterpriseEdition && !isInternalIOAAccount;
		const { applications: oneidApplications, error: oneidError } = useOneidApplications();
		const shouldBypassLexiangConnectorAuth = useLexiangLibraryMode() === "iframe";
		const enableLibraryUpload = useSpaceFeature();
		const enterpriseDocActivated = (0, import_react.useMemo)(() => {
			if (!isEnterpriseEdition) return false;
			return findOneidApp(oneidApplications, "doc")?.enabled === true;
		}, [isEnterpriseEdition, oneidApplications]);
		const enterpriseLexiangActivated = (0, import_react.useMemo)(() => {
			if (!isEnterpriseEdition) return false;
			return findOneidApp(oneidApplications, "lexiang")?.enabled === true;
		}, [isEnterpriseEdition, oneidApplications]);
		const enterpriseOneidUnavailable = (0, import_react.useMemo)(() => isEnterpriseEdition && !!oneidError, [isEnterpriseEdition, oneidError]);
		const currentSessionId = context?.currentConversation?.id || "";
		const conversationProjectId = context?.currentConversation?.projectId;
		const isProjectSession = !!router?.params.projectId && !!currentSessionId && !!projectChat?.getSandboxId?.(currentSessionId) || !!conversationProjectId || forceCloudEnvironment;
		const hasProjectSandbox = !!currentSessionId && !!projectChat?.getSandboxId?.(currentSessionId);
		const conversationCwd = context?.currentConversation?.cwd ?? "";
		const isPersonalCloudSandbox = !!context?.currentConversation?.runtimeId || context?.currentConversation?.transport === "cloud" || conversationCwd === "/workspace" || conversationCwd.startsWith("/workspace/");
		const effectiveEnvironmentType = forceCloudEnvironment || isPersonalCloudSandbox || isProjectSession && hasProjectSandbox ? "cloud" : adapter.environmentType;
		const usesPersistentDocumentPreviewHost = Boolean(hostedDocumentPreviewLifecycle && effectiveEnvironmentType === "local" && !disableDocumentSdkPreview);
		const uploadTargets = (0, import_react.useMemo)(() => resolvePersonalUploadTargets({
			enableLibraryUpload,
			canSaveArtifactToLibrary,
			isProjectSession,
			tencentNetDriveKnowledgeEnabled,
			tencentDocsKnowledgeEnabled,
			tencentLexiangEnabled,
			imaEnabled,
			isPersonalUser,
			isEnterpriseEdition,
			enterpriseDocActivated,
			enterpriseLexiangActivated,
			enterpriseOneidUnavailable
		}), [
			canSaveArtifactToLibrary,
			enableLibraryUpload,
			isProjectSession,
			isPersonalUser,
			isEnterpriseEdition,
			enterpriseDocActivated,
			enterpriseLexiangActivated,
			enterpriseOneidUnavailable,
			tencentDocsKnowledgeEnabled,
			tencentNetDriveKnowledgeEnabled,
			tencentLexiangEnabled,
			imaEnabled
		]);
		const hasPersonalTargets = uploadTargets.tencentNetdrive || uploadTargets.libraryUpload || uploadTargets.tencentDocs || uploadTargets.imaKnowledge || uploadTargets.tencentLexiang;
		const uploadToCloudEnabled = isWorkBuddy() && (knowledgeBaseEnabled && hasPersonalTargets || uploadTargets.projectAsset);
		const uploadTargetIcons = (0, import_react.useMemo)(() => ({
			tencentDocs: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbDocsQqIcon, {
				width: 16,
				height: 16
			}),
			library: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpaceLibraryIcon, {
				width: 16,
				height: 16
			}),
			imaKnowledge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbImaIcon, {
				width: 16,
				height: 16
			}),
			tencentLexiang: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbLexiangIcon, {
				width: 16,
				height: 16
			})
		}), []);
		const adapterRef = (0, import_react.useRef)(adapter);
		adapterRef.current = adapter;
		const projectChatRef = (0, import_react.useRef)(projectChat);
		projectChatRef.current = projectChat;
		const resolvePreviewUrlCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const lastResolveSessionIdRef = (0, import_react.useRef)(void 0);
		const resolvePreviewUrl = (0, import_react.useCallback)((sessionId, url) => {
			if (lastResolveSessionIdRef.current !== sessionId) {
				resolvePreviewUrlCacheRef.current.clear();
				lastResolveSessionIdRef.current = sessionId;
			}
			const cacheKey = `${sessionId}:${url}`;
			const cache = resolvePreviewUrlCacheRef.current;
			const cached = cache.get(cacheKey);
			if (cached) return cached;
			const resolver = adapterRef.current?.resolvePreviewUrl;
			if (!resolver) return Promise.reject(/* @__PURE__ */ new Error("resolvePreviewUrl not available"));
			const promise = resolver.call(adapterRef.current, sessionId, url);
			cache.set(cacheKey, promise);
			promise.catch(() => cache.delete(cacheKey));
			return promise;
		}, []);
		const hasResolvePreviewUrlCapability = !!adapter?.resolvePreviewUrl;
		const resolveMioraViewerLocationImpl = (0, import_react.useCallback)((mioraFilePath) => {
			const resolver = adapterRef.current?.resolveMioraViewerLocation;
			if (!resolver) return Promise.resolve(void 0);
			return resolver.call(adapterRef.current, mioraFilePath);
		}, []);
		const resolveMioraViewerLocation = adapter?.resolveMioraViewerLocation ? resolveMioraViewerLocationImpl : void 0;
		const detailPanelContainerRef = (0, import_react.useRef)(null);
		const contextRef = (0, import_react.useRef)(context);
		contextRef.current = context;
		const projectInput = useProjectInput();
		const projectInputRef = (0, import_react.useRef)(projectInput);
		projectInputRef.current = projectInput;
		const wrappedSubscribeFileChange = (0, import_react.useCallback)((filePath, callback) => {
			const ad = adapterRef.current;
			const sub = ad?.subscribeFileChange;
			if (!sub) return () => {};
			const unsubscribe = sub.call(ad, filePath, callback);
			return () => {
				try {
					unsubscribe();
				} catch {}
			};
		}, []);
		const [publishRefreshCount, setPublishRefreshCount] = (0, import_react.useState)(0);
		const wrappedSaveFile = (0, import_react.useCallback)(async (filePath, content) => {
			const ad = adapterRef.current;
			if (!ad?.writeFile) return;
			const sessionId = contextRef.current?.currentConversation?.id ?? "";
			const result = await ad.writeFile(sessionId, filePath, content, { allowedDirs: [filePath] });
			if (!result.success) throw new Error(result.error ?? "writeFile failed");
			setPublishRefreshCount((c) => c + 1);
		}, []);
		const wrappedCheckFileExists = (0, import_react.useCallback)(async (filePath) => {
			const ad = adapterRef.current;
			if (!ad?.checkFileExists) return true;
			try {
				return await ad.checkFileExists(filePath);
			} catch {
				return true;
			}
		}, []);
		const docFontScale = useDocFontScale();
		const expoDedupMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const EXPO_DEDUP_WINDOW_MS = 2e3;
		const uin = account?.uid ?? void 0;
		const enterpriseId = account?.enterpriseId ?? void 0;
		const wrappedMarkdownExpo = (0, import_react.useCallback)((payload) => {
			const now = Date.now();
			const lastTime = expoDedupMapRef.current.get(payload.url);
			if (lastTime !== void 0 && now - lastTime < EXPO_DEDUP_WINDOW_MS) return;
			expoDedupMapRef.current.set(payload.url, now);
			reportMarkdownDetailPageExpo({
				...payload,
				uin,
				enterpriseId
			});
		}, [uin, enterpriseId]);
		const wrappedMarkdownEdit = (0, import_react.useCallback)((payload) => {
			reportMarkdownEditSession({
				...payload,
				uin
			});
		}, [uin]);
		const wrappedMarkdownAiEditClick = (0, import_react.useCallback)((payload) => {
			reportMarkdownAiEditClick({
				...payload,
				uin
			});
		}, [uin]);
		const wrappedMarkdownAiPromptSend = (0, import_react.useCallback)((payload) => {
			reportMarkdownAiPromptSend({
				...payload,
				uin
			});
		}, [uin]);
		const wrappedMarkdownPicturePaste = (0, import_react.useCallback)((payload) => {
			reportMarkdownPicturePaste({
				...payload,
				uin
			});
		}, [uin]);
		const htmlExpoDedupMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const wrappedHtmlExpo = (0, import_react.useCallback)((payload) => {
			const now = Date.now();
			const lastTime = htmlExpoDedupMapRef.current.get(payload.url);
			if (lastTime !== void 0 && now - lastTime < EXPO_DEDUP_WINDOW_MS) return;
			htmlExpoDedupMapRef.current.set(payload.url, now);
			reportHtmlDetailPageExpo({
				...payload,
				uin,
				enterpriseId
			});
		}, [uin, enterpriseId]);
		const wrappedSelectionQuoteSend = (0, import_react.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock(event);
			const blocks = event.message ? [phraseBlock, {
				type: "text",
				text: event.message
			}] : [phraseBlock];
			const pi = projectInputRef.current;
			if (pi?.submitInput) {
				pi.submitInput(blocks);
				return;
			}
			const conversations = wb$1.conversations;
			const currentConversation = conversations.current;
			if (trySendSelectionQuoteToCurrentConversation(currentConversation, conversations.currentId, blocks)) return;
			const sessionId = contextRef.current?.currentConversation?.id;
			if (!sessionId) return;
			const ad = adapterRef.current;
			if (!ad?.requestSendPrompt) return;
			ad.logQueueDiag?.("info", "[SelectionQuote] send fell back to legacy adapter channel", {
				sessionId,
				...describeSelectionQuoteConversationMiss(currentConversation, conversations.currentId)
			});
			ad.requestSendPrompt({
				sessionId,
				prompt: blocks
			});
		}, []);
		const wrappedSelectionQuoteInsert = (0, import_react.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock(event);
			const blocks = event.message ? [phraseBlock, {
				type: "text",
				text: event.message
			}] : [phraseBlock];
			const pi = projectInputRef.current;
			if (pi) {
				pi.insertContentBlocks(blocks);
				return;
			}
			const sessionId = contextRef.current?.currentConversation?.id;
			const currentConversation = wb$1.conversations.current;
			if (tryInsertBlocksIntoCurrentConversation(currentConversation, sessionId, blocks)) return;
			const ad = adapterRef.current;
			if (!ad?.requestInsertContentBlocks) return;
			ad.requestInsertContentBlocks({
				contentBlocks: [phraseBlock],
				promptText: event.message
			});
		}, []);
		const handleDetailPanelTrack = (0, import_react.useCallback)(({ elementId, eventType }) => {
			try {
				adapterRef.current?.reportTelemetry?.(eventType, { elementId });
			} catch {}
		}, []);
		const wrappedSandboxSubscribeFileChange = (0, import_react.useCallback)((filePath, callback) => {
			const fn = contextRef.current?.subscribeSandboxFileChange;
			if (!fn) return () => {};
			let sandboxPath = filePath;
			if (sandboxPath.startsWith("agent://")) {
				sandboxPath = sandboxPath.replace(/^agent:\/\/(files)?/, "") || sandboxPath;
				if (!sandboxPath.startsWith("/")) sandboxPath = `/${sandboxPath}`;
			} else {
				const m = sandboxPath.match(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/sandbox-preview\/[^/]+(\/.+)$/i);
				if (m) sandboxPath = m[1];
			}
			try {
				return fn(sandboxPath, callback);
			} catch {
				return () => {};
			}
		}, []);
		const wrappedSandboxSaveFile = (0, import_react.useCallback)(async (filePath, content) => {
			const fn = contextRef.current?.writeSandboxFile;
			if (!fn) return;
			await fn(filePath, content);
			setPublishRefreshCount((c) => c + 1);
		}, []);
		const detailPanelSubscribeFileChange = resolveDetailPanelFileCapability(effectiveEnvironmentType, wrappedSubscribeFileChange, context?.subscribeSandboxFileChange ? wrappedSandboxSubscribeFileChange : void 0);
		const detailPanelSaveFile = resolveDetailPanelFileCapability(effectiveEnvironmentType, wrappedSaveFile, context?.writeSandboxFile ? wrappedSandboxSaveFile : void 0);
		const detailPanelCheckFileExists = resolveDetailPanelFileCapability(effectiveEnvironmentType, wrappedCheckFileExists);
		const [tdocFolderPickerVisible, setTdocFolderPickerVisible] = (0, import_react.useState)(false);
		const [pendingUpload, setPendingUpload] = (0, import_react.useState)(null);
		const [imaDirPickerVisible, setImaDirPickerVisible] = (0, import_react.useState)(false);
		const [pendingImaUpload, setPendingImaUpload] = (0, import_react.useState)(null);
		const ima = useImaApi();
		const [lexiangKbPickerVisible, setLexiangKbPickerVisible] = (0, import_react.useState)(false);
		const [lexiangPendingUpload, setLexiangPendingUpload] = (0, import_react.useState)(null);
		const [netDriveUploadModalVisible, setNetDriveUploadModalVisible] = (0, import_react.useState)(false);
		const [netDrivePendingUpload, setNetDrivePendingUpload] = (0, import_react.useState)(null);
		const projectNetDriveUploadContext = (0, import_react.useMemo)(() => ({
			netDriveStore: createNetDriveServiceStore(),
			filesStore: createMyFilesStore()
		}), []);
		(0, import_react.useEffect)(() => {
			if (!lexiangKbPickerVisible) return;
			try {
				adapter?.reportTelemetry?.("web_element_show", {
					elementId: "save_to_lexiang_btn",
					elementName: "上传到乐享的弹窗曝光"
				});
			} catch {}
		}, [lexiangKbPickerVisible, adapter]);
		(0, import_react.useEffect)(() => onLocaleChange(setDocumentPreviewLocale), []);
		const { reportEvent, Events, getFileExtension } = useAgentTelemetry();
		const geniePreviewReport = useGenieEmbedTelemetry();
		/**
		* 只在用户确认目标目录后为 path-only 上传器创建临时文件，并在上传结束后回收。
		* 能力由 typed adapter 显式提供；Web 环境不会隐式探测 Desktop daemon proxy。
		*/
		const withArtifactUploadPath = (0, import_react.useCallback)((filePath, upload) => withMaterializedCloudArtifactForUpload({
			filePath,
			environmentType: effectiveEnvironmentType,
			readFileWithFormat: context?.readFileWithFormat,
			downloadFileToLocal: adapter?.downloadFileToLocal?.bind(adapter),
			cleanupDownloadedTemporaryFile: adapter?.cleanupDownloadedTemporaryFile?.bind(adapter),
			upload
		}), [
			adapter,
			context?.readFileWithFormat,
			effectiveEnvironmentType
		]);
		const openLibraryOnlineTabRef = (0, import_react.useRef)(void 0);
		const handleNewLibraryUploadSuccess = (0, import_react.useCallback)(({ file, url }) => {
			const sessionId = file.sessionId;
			if (!sessionId || !url) return;
			const blocks = [{
				type: "text",
				text: t("conversation.shareFile.dialog.cloudVersionUpdatePrompt", { url })
			}];
			const conversations = wb$1.conversations;
			if (conversations.currentId !== void 0) {
				if (conversations.currentId !== sessionId) return;
				tryInsertBlocksIntoCurrentConversation(conversations.current, sessionId, blocks);
				return;
			}
			if (contextRef.current?.currentConversation?.id !== sessionId) return;
			adapterRef.current?.requestInsertContentBlocks?.({ contentBlocks: blocks });
		}, [t]);
		/**
		* 任意上传成功（含缓存命中、覆盖上传、首次创建）后在产物栏新开在线链接 tab。
		* 与 onNewUploadSuccess（仅首次创建、注入提示词）解耦：开 tab 不区分首次/复用。
		* 切走会话则不开（与 handleNewLibraryUploadSuccess 同源的会话来源校验）。
		*/
		const handleLibraryUploadResolved = (0, import_react.useCallback)(({ file, url }) => {
			const sessionId = file.sessionId;
			if (!sessionId || !url) return;
			const conversations = wb$1.conversations;
			if (conversations.currentId !== void 0) {
				if (conversations.currentId !== sessionId) return;
				openLibraryOnlineTabRef.current?.(url);
				return;
			}
			if (contextRef.current?.currentConversation?.id !== sessionId) return;
			openLibraryOnlineTabRef.current?.(url);
		}, []);
		const { trigger: triggerLibraryUpload } = useLibraryUpload({
			source: "task-artifacts",
			readFileWithFormat: context?.readFileWithFormat,
			onNewUploadSuccess: handleNewLibraryUploadSuccess,
			onUploadResolved: handleLibraryUploadResolved
		});
		/** 上传失败提示的宿主能力，注入给 knowledge-upload-error 决策中心（详见该模块注释）。 */
		const uploadFeedbackHostRef = (0, import_react.useRef)({
			t,
			toastError: toast.error,
			showQuotaDialog: showStorageQuotaExceededDialog
		});
		uploadFeedbackHostRef.current.t = t;
		const uploadFeedbackHost = uploadFeedbackHostRef.current;
		/**
		* 产物详情页“上传到云端”前的本地文档保存门禁。
		*
		* 顶部上传按钮是下拉菜单入口，用户点父按钮时先走这里；选择具体上传目标时也会再走一次兜底。
		* 如果用户选择“另存为”，返回的新 filePath 会继续传给后续上传流程。
		*/
		const ensureArtifactSavedBeforeUploadToCloud = (0, import_react.useCallback)(async (uploadContext) => {
			if (!uploadContext.filePath) return { proceed: true };
			if (resolveCloudArtifactReadSource(uploadContext.filePath, effectiveEnvironmentType)) return {
				proceed: true,
				filePath: uploadContext.filePath
			};
			const activePreview = activeDocumentPreviewContextRef.current;
			const normalizedUploadPath = normalizeMainWindowLocalFilePath(uploadContext.filePath);
			const normalizedActivePath = activePreview?.filePath ? normalizeMainWindowLocalFilePath(activePreview.filePath) : "";
			const matchingActivePreview = normalizedUploadPath && normalizedUploadPath === normalizedActivePath ? activePreview : void 0;
			const result = await ensureLocalDocsSavedBeforeExternalAction({
				localDocs,
				filePathOrUri: uploadContext.filePath,
				documentResourceUri: matchingActivePreview?.documentResourceUri,
				fileId: matchingActivePreview?.fileId,
				consumerId: matchingActivePreview?.consumerId
			});
			if (!result.proceed) {
				if (!result.canceled) toast.error(t("mediaPreview.saveFailed", { error: result.error || t("mediaPreview.unknownError") }));
				return { proceed: false };
			}
			if (result.saved && result.documentResourceUri) notifyDocumentClientSaved(result.documentResourceUri);
			return {
				proceed: true,
				filePath: result.filePath || uploadContext.filePath
			};
		}, [
			effectiveEnvironmentType,
			localDocs,
			t
		]);
		const handleUploadToCloud = (0, import_react.useCallback)(async (target, uploadContext, _fileContext) => {
			const resolvedContext = uploadContext ?? {};
			const saveGate = await ensureArtifactSavedBeforeUploadToCloud(resolvedContext);
			if (!saveGate.proceed) return;
			const resolvedUploadContext = {
				...resolvedContext,
				filePath: saveGate.filePath || resolvedContext.filePath
			};
			if (typeof resolvedUploadContext.filePath === "string" && /^https?:\/\/[^/]+\/sandbox-preview\/[^/]+\//i.test(resolvedUploadContext.filePath)) resolvedUploadContext.filePath = normalizeNetDriveUploadPath(resolvedUploadContext.filePath);
			if (target === "tencent-netdrive" || target === "project-asset") {
				const isProjectAsset = target === "project-asset";
				if (!canSaveArtifactToLibrary) {
					toast({
						message: "当前项目角色无权保存产物到资料库",
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				const filename = resolvedUploadContext.filePath.split(/[/\\]/).pop() || "file";
				const sessionId = resolvedUploadContext.taskId || context?.currentConversation?.id || "";
				const urlProjectId = router?.params.projectId || "";
				const projectSandboxId = sessionId ? projectChat?.getSandboxId?.(sessionId) : void 0;
				const projectId = urlProjectId && projectSandboxId ? urlProjectId : conversationProjectId || "";
				const runtimeId = projectSandboxId || "";
				if (isProjectAsset && !projectId) {
					toast({
						message: "项目资产仅在项目会话中可用",
						type: "warning"
					});
					return;
				}
				if (projectId) try {
					await projectNetDriveUploadContext.netDriveStore.getState().initialize(adapter, projectId);
					projectNetDriveUploadContext.filesStore.getState().reset();
				} catch (err) {
					const message = err instanceof Error ? err.message : String(err);
					console.error("[DetailPanelWrapper] project netdrive initialize failed:", err);
					toast({
						message: `项目网盘初始化失败：${message}`,
						type: "error"
					});
					return;
				}
				if (runtimeId && myFiles?.uploadToDrive) {
					setNetDrivePendingUpload({
						filePath: resolvedUploadContext.filePath,
						filename,
						projectId,
						runtimeId
					});
					setNetDriveUploadModalVisible(true);
					return;
				}
				setNetDrivePendingUpload({
					filePath: resolvedUploadContext.filePath,
					filename,
					projectId: projectId || void 0
				});
				setNetDriveUploadModalVisible(true);
				return;
			}
			if (target === "tencent-docs") {
				if (isEnterpriseEdition && !enterpriseDocActivated && enterpriseOneidUnavailable) {
					toast({
						message: t("upload.oneidUnavailable"),
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				reportSaveToTdocBtn(adapter);
				setPendingUpload({ filePath: resolvedUploadContext.filePath });
				setTdocFolderPickerVisible(true);
				return;
			}
			if (target === "ima-knowledge") {
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("ima.upload.missingFile"),
						type: "error"
					});
					return;
				}
				reportSaveToImaBtn(adapter);
				setPendingImaUpload({ filePath: resolvedUploadContext.filePath });
				setImaDirPickerVisible(true);
				return;
			}
			if (target === "tencent-lexiang") {
				if (isEnterpriseEdition && !enterpriseLexiangActivated && enterpriseOneidUnavailable) {
					toast({
						message: t("upload.oneidUnavailable"),
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						elementId: "save_to_lexiang_btn",
						elementName: "上传到乐享按钮"
					});
				} catch {}
				setLexiangPendingUpload({ filePath: resolvedUploadContext.filePath });
				__vitePreload(async () => {
					const { lexiangAuthStore } = await import("./ui-docs-viewer-Bo02yf1Q.js").then((n) => (n._B(), n.gB));
					return { lexiangAuthStore };
				}, __vite__mapDeps([2,1,3,4,5,6]), import.meta.url).then(({ lexiangAuthStore }) => {
					if (lexiangAuthStore.getState().adapter !== adapter) lexiangAuthStore.getState().setAdapter(adapter);
				});
				setLexiangKbPickerVisible(true);
				return;
			}
			if (target === "my-library") {
				const filePath = resolvedUploadContext.filePath;
				if (!filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				const sessionId = resolvedUploadContext.taskId || context?.currentConversation?.id || "";
				const rawFilename = getArtifactUploadFileName(filePath);
				/** artifact 的 filePath 可能是 URI 编码（如 %E6%97%A5...），提前 decode 后再传入 hook，
				*  确保 toast 提示和 uploadToKnowledge 的 filename 参数都不会出现乱码 */
				const filename = rawFilename.includes("%") ? (() => {
					try {
						return decodeURIComponent(rawFilename);
					} catch {
						return rawFilename;
					}
				})() : rawFilename;
				triggerLibraryUpload({
					id: "",
					name: filename,
					type: "file",
					mimeType: "",
					size: 0,
					uri: resolveCloudArtifactReadSource(filePath, effectiveEnvironmentType) || filePath,
					sessionId,
					updatedAt: Date.now(),
					isFolder: false
				});
				return;
			}
			console.warn("[DetailPanelWrapper] uploadToCloud target not yet supported:", target, uploadContext);
		}, [
			adapter,
			canSaveArtifactToLibrary,
			context?.currentConversation,
			ensureArtifactSavedBeforeUploadToCloud,
			effectiveEnvironmentType,
			myFiles,
			projectChat,
			projectNetDriveUploadContext.filesStore,
			projectNetDriveUploadContext.netDriveStore,
			router?.params.projectId,
			isEnterpriseEdition,
			enterpriseDocActivated,
			enterpriseLexiangActivated,
			enterpriseOneidUnavailable,
			triggerLibraryUpload,
			t
		]);
		const handleTdocFolderPicked = (0, import_react.useCallback)(async (selection) => {
			const filePath = pendingUpload?.filePath;
			setPendingUpload(null);
			if (!filePath) {
				toast({
					message: t("tdoc.folderPicker.uploadMissingFile"),
					type: "error"
				});
				return;
			}
			if (!tencentDocs) {
				toast({
					message: t("tdoc.folderPicker.uploadUnsupported"),
					type: "error"
				});
				return;
			}
			const cancelToken = `tdoc-upload-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			let cancelled = false;
			const uploading = toast({
				message: t("tdoc.folderPicker.uploading", { name: selection.name }),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploading.close();
						(tencentDocs ? tencentDocs.cancelUpload({ cancelToken }) : void 0)?.catch((err) => {
							console.warn("[DetailPanelWrapper] cancelUpload failed:", err);
						});
						console.info("[DetailPanelWrapper] tdoc upload cancelled by user (token=%s)", cancelToken);
					}
				}
			});
			try {
				reportSaveToTdocConfirm(adapter);
				const previewUploadFileName = filePath.split(/[/\\]/).pop() || "";
				const result = await withArtifactUploadPath(filePath, (localFilePath) => tencentDocs.uploadFile({
					filePath: localFilePath,
					folder_id: selection.folder_id,
					space_id: selection.space_id,
					cancelToken,
					...previewUploadFileName.toLowerCase().endsWith(".md") ? { target_ext: "smartcanvas" } : {}
				}));
				if (cancelled) {
					console.info("[DetailPanelWrapper] tdoc upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploading.close();
				reportSaveToTdocSuccess(adapter, { source: "task_result_save" });
				console.log("[DetailPanelWrapper] tdoc upload result:", result);
				const r = result && typeof result === "object" ? result : {};
				const readStr = (key) => typeof r[key] === "string" ? r[key] : "";
				const readBool = (key) => typeof r[key] === "boolean" ? r[key] : void 0;
				const viewUrl = readStr("url");
				const fileId = readStr("file_id");
				const tencentDocUrl = readStr("tencent_doc_url");
				const successAction = Boolean(fileId || viewUrl) ? {
					label: t("tdoc.folderPicker.viewUploaded"),
					onClick: () => {
						console.log("[DetailPanelWrapper] \"查看\" clicked | fileId =", fileId, "| viewUrl =", viewUrl, "| context =", !!context, "| setPendingTdocOpen =", typeof context?.setPendingTdocOpen);
						context?.setPendingTdocOpen?.({
							fileId: fileId || void 0,
							url: viewUrl || void 0,
							tencentDocUrl: tencentDocUrl || void 0,
							title: readStr("title") || readStr("name") || void 0,
							type: readStr("type") || void 0,
							ext: readStr("ext") || void 0,
							isFolder: readBool("is_folder")
						});
						context?.setCurrentConversation?.(null);
						navigate("/library/tencent-docs");
						console.log("[DetailPanelWrapper] \"查看\" handlers called");
					}
				} : void 0;
				const pathDepth = selection.pathDepth ?? 0;
				const uploadedDirName = selection.name;
				toast({
					message: t(pathDepth >= 2 ? "tdoc.folderPicker.uploadSuccessDeep" : "tdoc.folderPicker.uploadSuccess", { name: uploadedDirName }),
					type: "success",
					action: successAction
				});
			} catch (err) {
				if (cancelled) {
					console.info("[DetailPanelWrapper] tdoc upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploading.close();
				const message = extractErrorMessage(err, t("tdoc.folderPicker.uploadFailedDefault"));
				console.error("[DetailPanelWrapper] tdoc upload failed:", err);
				toast({
					message: t("tdoc.folderPicker.uploadFailed", { error: message }),
					type: "error"
				});
			}
		}, [
			adapter,
			pendingUpload,
			t,
			tencentDocs,
			withArtifactUploadPath
		]);
		const handleTdocFolderPickerClose = (0, import_react.useCallback)(() => {
			setTdocFolderPickerVisible(false);
			setPendingUpload(null);
		}, []);
		const handleImaDirSelected = (0, import_react.useCallback)(async (selection) => {
			const filePath = pendingImaUpload?.filePath;
			const filename = pendingImaUpload?.filename;
			setPendingImaUpload(null);
			setImaDirPickerVisible(false);
			if (!filePath) {
				toast({
					message: t("ima.upload.missingFile"),
					type: "error"
				});
				return;
			}
			reportSaveToImaConfirm(adapter);
			const targetLabel = selection.kbName ?? selection.displayPath ?? "";
			const uploadId = `imaup-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			let cancelled = false;
			const uploading = toast({
				message: t("ima.upload.uploading"),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploading.close();
						if (ima.imaFilesCancelUpload) ima.imaFilesCancelUpload({ uploadId }).catch((err) => {
							console.warn("[DetailPanelWrapper] imaFilesCancelUpload failed:", err);
						});
						console.info("[DetailPanelWrapper] ima upload cancelled by user (uploadId=%s)", uploadId);
					}
				}
			});
			try {
				const result = await withArtifactUploadPath(filePath, (localFilePath) => ima.imaFilesUploadByPath({
					filePath: localFilePath,
					kbId: selection.kbId,
					folderId: selection.folderId,
					filename,
					uploadId
				}));
				if (cancelled) {
					console.info("[DetailPanelWrapper] ima upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploading.close();
				reportSaveToImaSuccess(adapter);
				toast({
					message: t("ima.upload.success", { name: targetLabel }),
					type: "success",
					duration: 5e3,
					action: {
						label: t("ima.upload.view"),
						onClick: () => openImaUploadResult({
							result,
							selection,
							filename
						})
					}
				});
			} catch (err) {
				if (cancelled) {
					uploading.close();
					console.info("[DetailPanelWrapper] ima upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploading.close();
				const message = err instanceof Error ? err.message : String(err);
				console.error("[DetailPanelWrapper] ima upload failed:", err);
				toast({
					message: t("ima.upload.failed", { error: message }),
					type: "error"
				});
			}
		}, [
			adapter,
			pendingImaUpload,
			ima,
			openImaUploadResult,
			t,
			withArtifactUploadPath
		]);
		const handleImaDirPickerClose = (0, import_react.useCallback)(() => {
			setImaDirPickerVisible(false);
			setPendingImaUpload(null);
		}, []);
		const describeUploadError = useDescribeUploadError();
		const handleLexiangKbPicked = (0, import_react.useCallback)(async (picked) => {
			const filePath = lexiangPendingUpload?.filePath;
			setLexiangKbPickerVisible(false);
			setLexiangPendingUpload(null);
			if (!filePath) {
				toast({
					message: t("tdoc.folderPicker.uploadMissingFile"),
					type: "error"
				});
				return;
			}
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					elementId: "save_to_lexiang_confirm",
					elementName: "确认上传到乐享"
				});
			} catch {}
			const first = picked[0];
			if (!first) {
				toast({
					message: "无法获取知识库根目录，请重试",
					type: "error"
				});
				return;
			}
			let parentEntryId;
			let targetName;
			let targetKbId;
			let targetTeamId;
			let kbRootEntryId;
			let targetKbName;
			if (first.type === "doc") {
				parentEntryId = first.doc.id;
				targetName = first.doc.name;
				targetKbId = first.doc.kbId;
				targetTeamId = first.doc.teamId;
				kbRootEntryId = first.doc.kbRootEntryId;
				targetKbName = first.doc.kbName ?? first.doc.name;
			} else if (first.type === "kb") {
				parentEntryId = first.kb.meta?.rootEntryId;
				targetName = first.kb.name;
				targetKbId = first.kb.id;
				targetTeamId = first.kb.teamId ?? first.kb.meta?.teamId ?? first.team?.id;
				kbRootEntryId = parentEntryId;
				targetKbName = first.kb.name;
			} else {
				toast({
					message: "无法获取知识库根目录，请重试",
					type: "error"
				});
				return;
			}
			if (!parentEntryId) {
				toast({
					message: "无法获取知识库根目录，请重试",
					type: "error"
				});
				return;
			}
			if (!adapter?.uploadLexiangFile) {
				toast({
					message: t("tdoc.folderPicker.uploadUnsupported"),
					type: "error"
				});
				return;
			}
			let cancelled = false;
			const uploadingToast = toast({
				message: t("tencentLexiang.cloud.uploading"),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploadingToast.close();
						console.info("[DetailPanelWrapper] lexiang upload cancelled by user (soft cancel)");
					}
				}
			});
			try {
				const uploadResult = await withArtifactUploadPath(filePath, (localFilePath) => adapter.uploadLexiangFile({
					filePath: localFilePath,
					parentEntryId
				}));
				if (cancelled) {
					console.info("[DetailPanelWrapper] lexiang upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploadingToast.close();
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						elementId: "save_to_lexiang_success",
						elementName: "上传到乐享成功"
					});
				} catch {}
				const kbName = targetKbName ?? targetName;
				const uploadedEntry = (() => {
					if (uploadResult && typeof uploadResult === "object") return uploadResult.entry;
				})();
				const uploadedEntryId = uploadedEntry?.id;
				const uploadedEntryName = uploadedEntry?.name || (filePath ? decodeURIComponent(filePath.split(/[\\/]/).pop() || "") : void 0);
				toast({
					message: t("tencentLexiang.cloud.uploadSuccess", { name: kbName }),
					type: "success",
					action: {
						label: t("tencentLexiang.cloud.viewUploaded"),
						onClick: () => {
							if (uploadedEntryId) {
								const pendingOpen = {
									entryId: uploadedEntryId,
									kb: targetKbId ? {
										id: targetKbId,
										name: kbName,
										rootEntryId: kbRootEntryId,
										teamId: targetTeamId
									} : void 0,
									name: uploadedEntryName,
									entryType: uploadedEntry.entry_type ?? uploadedEntry.entryType ?? "file",
									spaceId: uploadedEntry.space_id ?? uploadedEntry.spaceId ?? targetKbId
								};
								context?.setPendingLexiangOpen?.(pendingOpen);
							} else console.warn("[DetailPanelWrapper] lexiang upload result missing entry.id, fallback to panel-only open");
							context?.setCurrentConversation?.(null);
							navigate("/library/lexiang");
						}
					}
				});
				console.log("[DetailPanelWrapper] lexiang upload result:", uploadResult);
			} catch (err) {
				if (cancelled) {
					console.info("[DetailPanelWrapper] lexiang upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploadingToast.close();
				console.error("[DetailPanelWrapper] lexiang upload failed:", err);
				toast({
					message: describeUploadError(err),
					type: "error"
				});
			}
		}, [
			adapter,
			context,
			lexiangPendingUpload,
			t,
			describeUploadError,
			withArtifactUploadPath
		]);
		const handleLexiangKbPickerClose = (0, import_react.useCallback)(() => {
			setLexiangKbPickerVisible(false);
			setLexiangPendingUpload(null);
		}, []);
		const handleNetDriveUploadModalClose = (0, import_react.useCallback)(() => {
			setNetDriveUploadModalVisible(false);
			setNetDrivePendingUpload(null);
		}, []);
		const handlePersonalNetDriveUploadSuccess = (0, import_react.useCallback)(async (info) => {
			navigate("/library/my-files");
			const { getLastUploadFolder } = await __vitePreload(async () => {
				const { getLastUploadFolder } = await import("./use-upload-queue-DwfNivwj.js").then((n) => (n.n(), n.a));
				return { getLastUploadFolder };
			}, __vite__mapDeps([10,1,2,3,4,5,6,11,12,13,14]), import.meta.url);
			const { myFilesStore } = await __vitePreload(async () => {
				const { myFilesStore } = await import("./store-B9VMId-K.js").then((n) => (n.i(), n.l));
				return { myFilesStore };
			}, __vite__mapDeps([14,1,2,3,4,5,6]), import.meta.url);
			const lastFolder = getLastUploadFolder();
			const targetFolderId = lastFolder?.id ?? "";
			const targetFolderName = lastFolder?.name ?? "";
			const fileId = info?.fileId;
			const fileName = info?.fileName;
			const state = myFilesStore.getState();
			state.setActiveTab("cloudFiles");
			if (targetFolderId) {
				state.setCurrentFolderId(targetFolderId);
				state.setBreadcrumbs([{
					id: targetFolderId,
					name: targetFolderName
				}]);
			} else {
				state.setCurrentFolderId(null);
				state.setBreadcrumbs([]);
			}
			state.setPendingCloudFileView(fileId || fileName ? {
				folderId: targetFolderId,
				fileId,
				fileName
			} : null);
			state.triggerCloudFilesRefresh();
		}, [navigate]);
		const handleNetDriveSaveFile = (0, import_react.useCallback)(async () => {
			const pending = netDrivePendingUpload;
			const sessionId = context?.currentConversation?.id || "";
			if (!pending?.filePath || !adapter) throw new Error("文件路径或 adapter 不可用");
			const filename = pending.filename || pending.filePath.split(/[/\\]/).pop() || "file";
			if (resolveCloudArtifactReadSource(pending.filePath, effectiveEnvironmentType)) {
				const bytes = await readCloudArtifactBytes({
					filePath: pending.filePath,
					environmentType: effectiveEnvironmentType,
					readFileWithFormat: context?.readFileWithFormat
				});
				if (!bytes) throw new Error("读取云端产物失败");
				return new File([bytes], filename, { type: getMimeTypeFromFilename(filename) });
			}
			if (adapter.readFileChunked && !pending.filePath.startsWith("agent://")) {
				const CHUNK_SIZE = 10485760;
				const MAX_BYTES = 524288e3;
				const chunks = [];
				let offset = 0;
				let done = false;
				let totalBytes = 0;
				while (!done) {
					const chunk = await adapter.readFileChunked({
						filePath: pending.filePath,
						offset,
						chunkSize: CHUNK_SIZE,
						sessionId,
						allowedDirs: [pending.filePath]
					});
					if (chunk.bytesRead > 0) {
						const binaryStr = atob(chunk.data);
						const bytes = new Uint8Array(binaryStr.length);
						for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
						chunks.push(bytes);
						totalBytes += chunk.bytesRead;
						if (totalBytes > MAX_BYTES) throw new Error(`文件过大（${totalBytes} bytes），超过 ${MAX_BYTES} 上限，请缩小文件或使用其他方式上传`);
					}
					offset += chunk.bytesRead;
					done = chunk.done;
				}
				const blob = new Blob(chunks);
				const mimeType = getMimeTypeFromFilename(filename);
				return new File([blob], filename, { type: mimeType });
			}
			const readResult = await adapter.readFile(sessionId, pending.filePath, "blob");
			if (!readResult.success || !readResult.content) throw new Error(readResult.error || "读取文件失败");
			const blob = readResult.content;
			return new File([blob], filename, { type: blob.type || getMimeTypeFromFilename(filename) });
		}, [
			netDrivePendingUpload,
			adapter,
			context?.currentConversation?.id,
			context?.readFileWithFormat,
			effectiveEnvironmentType
		]);
		const handleNetDriveUploadToDrive = (0, import_react.useCallback)(async (params) => {
			const pending = netDrivePendingUpload;
			console.log("[DEBUG:handleNetDriveUploadToDrive] ENTER", {
				hasFilePath: !!pending?.filePath,
				projectId: pending?.projectId,
				runtimeId: pending?.runtimeId,
				hasUploadToDrive: !!myFiles?.uploadToDrive,
				hasReportFileEvents: !!myFiles?.reportFileEvents,
				params
			});
			if (!pending?.filePath || !pending.runtimeId || !myFiles?.uploadToDrive) {
				console.error("[NetDrive:UploadToDrive] missing fields", {
					hasFilePath: !!pending?.filePath,
					runtimeId: pending?.runtimeId,
					hasUploadToDrive: !!myFiles?.uploadToDrive
				});
				return {
					ok: false,
					error: "运行时或文件路径不可用"
				};
			}
			const normalizedPath = normalizeNetDriveUploadPath(pending.filePath);
			try {
				const raw = await myFiles.uploadToDrive({
					projectId: pending.projectId || "",
					runtimeId: pending.runtimeId,
					localPath: normalizedPath,
					dirId: params.dirId,
					uploadType: params.uploadType,
					sizeHint: params.sizeHint
				});
				const result = raw?.data && typeof raw.data === "object" && "ok" in raw.data ? raw.data : raw;
				console.log("[NetDrive:UploadToDrive] result", {
					resultOk: result?.ok,
					fileName: result?.fileName
				});
				if (result?.ok && pending.projectId && myFiles?.reportFileEvents) {
					const eventType = params.uploadType === "overwrite" ? "updated" : "uploaded";
					const files = [{
						id: result.fileID || "",
						name: result.fileName || normalizedPath.split(/[/\\]/).pop() || "",
						size: result.size
					}];
					console.log("[NetDrive:ReportFileEvents] reporting", {
						projectId: pending.projectId,
						eventType,
						files
					});
					myFiles.reportFileEvents({
						projectId: pending.projectId,
						eventType,
						files
					}).then((resp) => {
						console.log("[NetDrive:ReportFileEvents] done", {
							ok: resp?.ok,
							accepted: resp?.accepted
						});
					}).catch((err) => {
						console.warn("[NetDrive:ReportFileEvents] failed (non-blocking)", err?.message);
					});
				}
				return result;
			} catch (err) {
				console.error("[NetDrive:UploadToDrive] error", err?.message);
				const errData = err?.response?.data?.data ?? err?.response?.data;
				if (errData && typeof errData === "object" && "ok" in errData) return errData;
				return {
					ok: false,
					error: errData?.msg || err?.message || "上传失败"
				};
			}
		}, [myFiles, netDrivePendingUpload]);
		const fileTreeState = useFileTreeState();
		const rawArtifacts = context?.artifacts || [];
		const fileTree = context?.fileTree || {};
		const selectedFilePath = context?.selectedFilePath;
		const selectedFilePathRef = useLatestRef(selectedFilePath);
		const onFileSelect = context?.onFileSelect;
		const onFileDoubleClick = context?.onFileDoubleClick;
		const lazyFileTreeMode = context?.lazyFileTreeMode;
		const resolvedFileTreeState = resolveFileTreeState(fileTreeState, context);
		const fileTreeData = resolvedFileTreeState.fileTreeData;
		const loadedPaths = resolvedFileTreeState.loadedPaths;
		const collapsedFolders = resolvedFileTreeState.collapsedFolders;
		const fileTreeLoaded = resolvedFileTreeState.fileTreeLoaded;
		const onLoadFileTreeChildren = context?.onLoadFileTreeChildren;
		const onLoadedPathsChange = context?.onLoadedPathsChange;
		const onCollapsedFoldersChange = context?.onCollapsedFoldersChange;
		const onRequestFileTreeRefresh = context?.onRequestFileTreeRefresh;
		const onTreeDataChange = context?.onTreeDataChange;
		const onReadFile = context?.onReadFile;
		const hasActiveSession = !!context?.currentConversation?.id;
		const sessionId = context?.currentConversation?.id;
		const sidebarView = context?.sidebarView;
		const contextOnSidebarViewChange = context?.onSidebarViewChange;
		const handleTerminalError = (0, import_react.useCallback)((error) => {
			toast.error(extractErrorMessage(error));
		}, []);
		const terminalAllowedForTask = isTerminalAvailableForTask(context?.currentConversation);
		const renderQuickAskView = (0, import_react.useCallback)((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAskConversationView, {
			session,
			containerWidth: width
		}), [width]);
		const quickAskSessionsForHost = (0, import_react.useMemo)(() => selectQuickAskSessionsForHost(context?.quickAskSessions, sessionId), [context?.quickAskSessions, sessionId]);
		const activeQuickAskIdForHost = (0, import_react.useMemo)(() => resolveActiveQuickAskIdForHost(quickAskSessionsForHost, context?.activeQuickAskId), [context?.activeQuickAskId, quickAskSessionsForHost]);
		const handleQuickAskClose = (0, import_react.useCallback)((id) => {
			const conversationId = context?.quickAskSessions?.find((item) => item.id === id)?.conversationId;
			archiveQuickAskConversation(conversationId, moduleHost?.wb?.conversations);
			context?.closeQuickAskSession?.(id);
			return true;
		}, [context, moduleHost]);
		const taskTerminalProvider = terminalAllowedForTask ? terminalProvider : void 0;
		const terminalAvailable = Boolean(taskTerminalProvider && sessionId);
		const { sessions: terminalSessions, activeTerminalId, selectTerminal: handleTerminalSelect, createTerminal: handleTerminalCreate, closeTerminal: handleTerminalClose, renameTerminal: handleTerminalRename } = useConversationTerminals({
			terminalProvider: taskTerminalProvider,
			conversationId: terminalAllowedForTask ? sessionId : void 0,
			cwd: context?.currentConversation?.cwd,
			isTerminalView: terminalAvailable && sidebarView === "terminal",
			onError: handleTerminalError
		});
		const browserUrl = context?.browserUrl;
		const sessionBrowserView = useSessionBrowserView(sessionId);
		(0, import_react.useEffect)(() => {
			if (browserUrl && sessionBrowserView.selected) sessionBrowserView.deselect();
		}, [browserUrl, sessionBrowserView]);
		const sessionBrowserViewSlot = sessionId && sessionBrowserView.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionBrowserViewSlot, { sessionId }) : void 0;
		const handleSessionBrowserSelect = (0, import_react.useCallback)(() => {
			context?.setBrowserUrl?.("");
			if (sessionId) adapter.setBrowserUrlForSession?.(sessionId, "");
			sessionBrowserView.select();
		}, [
			adapter,
			context,
			sessionBrowserView,
			sessionId
		]);
		const browserRefreshToken = context?.browserRefreshToken;
		const handleBrowserPreviewDiagnosticLog = (0, import_react.useCallback)((level, event, details = {}) => {
			try {
				writeRendererLog("browser-preview", level, `${event} ${JSON.stringify({
					...details,
					sessionId,
					sidebarView
				})}`);
			} catch {
				writeRendererLog("browser-preview", level, `${event} [serialization-failed]`);
			}
		}, [sessionId, sidebarView]);
		const handleMediaPreviewDiagnosticLog = (0, import_react.useCallback)((module, level, event, details) => {
			try {
				writeRendererLog(module, level, details ? `${event} ${JSON.stringify(details)}` : event);
			} catch {
				writeRendererLog(module, level, `${event} [serialization-failed]`);
			}
		}, []);
		const publishRefreshToken = (0, import_react.useMemo)(() => publishRefreshCount + (browserRefreshToken ?? 0), [publishRefreshCount, browserRefreshToken]);
		(0, import_react.useEffect)(() => {
			const handler = () => setPublishRefreshCount((c) => c + 1);
			window.addEventListener("workbuddy:publish-cache-refreshed", handler);
			return () => window.removeEventListener("workbuddy:publish-cache-refreshed", handler);
		}, []);
		const setBrowserUrlFromContext = context?.setBrowserUrl;
		const disableHtmlBrowserPreview = context?.disableHtmlBrowserPreview;
		const browserPanel = context?.browserPanel;
		const addBrowserTabFromContext = context?.addBrowserTab;
		const addBrowserTabRef = (0, import_react.useRef)(void 0);
		addBrowserTabRef.current = addBrowserTabFromContext;
		const browserPanelRef = useLatestRef(browserPanel);
		const setActiveBrowserTabRef = (0, import_react.useRef)(void 0);
		const onSidebarViewChangeRef = (0, import_react.useRef)(void 0);
		onSidebarViewChangeRef.current = contextOnSidebarViewChange;
		const sidebarViewRef = (0, import_react.useRef)(sidebarView);
		sidebarViewRef.current = sidebarView;
		openLibraryOnlineTabRef.current = (0, import_react.useCallback)((rawUrl) => {
			if (!isOpenableOnlineTabUrl(rawUrl)) return;
			const target = isSpaceUrl(rawUrl) ? withWorkBuddyChatPreviewScene(rawUrl) : rawUrl;
			const existingTab = browserPanelRef.current?.tabs.find((tab) => isSameOnlineTabUrl(tab.url, target));
			if (existingTab) {
				setActiveBrowserTabRef.current?.(existingTab.id);
				if (sidebarViewRef.current !== "preview") onSidebarViewChangeRef.current?.("preview");
				return;
			}
			const addBrowserTab = addBrowserTabRef.current;
			if (!addBrowserTab) return;
			addBrowserTab(target);
		}, []);
		(0, import_react.useEffect)(() => {
			const handleShareLibraryUploadSuccess = (e) => {
				const detail = e.detail;
				openLibraryOnlineTabRef.current?.(detail?.url);
			};
			window.addEventListener("workbuddy:share-library-upload-success", handleShareLibraryUploadSuccess);
			return () => window.removeEventListener("workbuddy:share-library-upload-success", handleShareLibraryUploadSuccess);
		}, []);
		const closeBrowserTabFromContext = context?.closeBrowserTab;
		const setActiveBrowserTabFromContext = context?.setActiveBrowserTab;
		setActiveBrowserTabRef.current = setActiveBrowserTabFromContext;
		const updateBrowserTabUrlFromContext = context?.updateBrowserTabUrl;
		const updateBrowserTabFaviconFromContext = context?.updateBrowserTabFavicon;
		const updateBrowserTabLabelFromContext = context?.updateBrowserTabLabel;
		const handleBrowserPageTitleChange = (0, import_react.useCallback)((payload) => {
			const activeTabId = browserPanel?.activeTabId;
			if (activeTabId) updateBrowserTabLabelFromContext?.(activeTabId, payload.title, "page");
		}, [browserPanel?.activeTabId, updateBrowserTabLabelFromContext]);
		const handleBrowserTabPageTitleChange = (0, import_react.useCallback)((id, payload) => {
			updateBrowserTabLabelFromContext?.(id, payload.title, "page");
		}, [updateBrowserTabLabelFromContext]);
		/**
		* 记录"当前正在浏览器预览态里展示的 HTML artifact id"（无则 null）。
		* 用于 onArtifactSelect 区分两种调用：
		* - 命中同一个 id（useUnifiedTabs.activateTab 反向激活同一条 artifact
		*   tab）：跳过三件套，否则关 preview tab 时会被立即复活（issue：
		*   浏览器 tab 关不掉）。
		* - 命中不同 id（用户在预览态里又点了另一个 HTML artifact）：正常走
		*   三件套，切到新 HTML 的 preview。
		* 之所以不用 boolean：boolean 只能表达"在不在预览态"，会把"再点另一个
		* HTML"误判成 activateTab 复活而拦掉，导致第二个 HTML 点不开预览。
		* 由下方 useEffect 在 sidebarView !== 'preview' 时清回 null。
		*/
		const inHtmlPreviewRef = (0, import_react.useRef)(null);
		const detailPanelRequestSeqRef = (0, import_react.useRef)(0);
		const beforeSelectFilePathRef = (0, import_react.useRef)(void 0);
		const registerBeforeSelectFilePathWithLocalRef = (0, import_react.useCallback)((handler) => {
			beforeSelectFilePathRef.current = handler;
			registerBeforeSelectFilePath?.(handler);
		}, [registerBeforeSelectFilePath]);
		const selectedArtifactId = context?.selectedArtifactId;
		const contextOnArtifactSelect = context?.setSelectedArtifactId;
		const hideActiveMcpAppPanel = context?.hideActiveMcpAppPanel;
		const handleLastTabClosed = (0, import_react.useCallback)(() => {
			markLastDetailPreviewNone(sessionId);
			hideActiveMcpAppPanel?.();
			setHtmlEditMode(false);
			prevHtmlTargetRef.current = null;
			lastEditableHtmlTargetRef.current = null;
		}, [hideActiveMcpAppPanel, sessionId]);
		const selectedArtifactIdRef = useLatestRef(selectedArtifactId);
		const rawArtifactsRef = useLatestRef(rawArtifacts);
		const currentConversationIdRef = useLatestRef(sessionId);
		const localDocsRef = useLatestRef(localDocs);
		const processingSessionIds = import_react.useMemo(() => (context?.conversations ?? []).filter((conv) => isWorkingStatus(conv.status)).map((conv) => conv.id), [context?.conversations]);
		const preflightLocalDocumentUiOpen = (0, import_react.useCallback)(async (filePath) => {
			const normalizedPath = getLocalSdkDocumentPath(filePath);
			const currentLocalDocs = localDocsRef.current;
			if (!normalizedPath || !currentLocalDocs) return {
				handled: false,
				blocked: false
			};
			const requestSessionId = currentConversationIdRef.current ?? sessionId;
			if (!requestSessionId) return {
				handled: false,
				blocked: false
			};
			return await preflightSessionLocalDocumentOpen({
				filePath: normalizedPath,
				localDocs: currentLocalDocs,
				adapter: adapterRef.current,
				sessionId: requestSessionId
			});
		}, [
			adapterRef,
			currentConversationIdRef,
			localDocsRef,
			sessionId
		]);
		/**
		* 传给 DetailPanel/FileTree 的 before-open gate。
		*
		* 返回 true 表示调用方必须停止后续 open/tab 入栈。顺序必须保持：
		* 1. 先确认是否清空主对话里的文档选区，避免 UI 已切走后再弹窗；
		* 2. 再跑本地文档 preflight：checkOpen 命中同路径其它会话时保留原 owner，
		*    允许后续 getPreviewUrl 降级为 SDK readonly；
		* 3. keep-alive pool 的容量 / dirty LRU gate 继续留在文档预览模块内部。
		*/
		const shouldBlockLocalDocumentUiOpen = (0, import_react.useCallback)(async (filePath) => {
			const localSdkPath = getLocalSdkDocumentPath(filePath);
			if (!await (context?.clearDocumentSelectionBeforeTabSwitch?.(localSdkPath ?? filePath) ?? true)) return true;
			if (!localSdkPath) return false;
			const result = await preflightLocalDocumentUiOpen(localSdkPath);
			if (result.blocked && result.outcome === "abort-owned-by-self") return false;
			return result.blocked;
		}, [context, preflightLocalDocumentUiOpen]);
		/**
		* 文档 tab 关闭请求流（Promise 化）。
		*
		* 场景：用户关闭 KeepAlive Pool 内的某个文档 tab 时，
		* main 侧通过 setDocumentPreviewCloseRequest 向 iframe 侧发起"可否关闭"询问。
		* iframe 侧处理完毕后回调 handleDocumentPreviewCloseResult，main 侧据此 resolve promise。
		*
		* 流程：
		*   1. 递增 documentPreviewCloseRequestSeqRef 生成唯一 requestId
		*   2. 在 pendingDocumentPreviewCloseResolversRef 中注册 resolve + 超时兜底
		*   3. setDocumentPreviewCloseRequest 触发 iframe 侧监听
		*   4. iframe 回调 handleDocumentPreviewCloseResult → resolve / 超时 → resolve(false)
		*/
		const [documentPreviewCloseRequest, setDocumentPreviewCloseRequest] = (0, import_react.useState)(void 0);
		const documentPreviewCloseRequestSeqRef = (0, import_react.useRef)(0);
		const [documentPreviewSessionEvictionQueue, setDocumentPreviewSessionEvictionQueue] = (0, import_react.useState)([]);
		const documentPreviewSessionEvictionIntent = documentPreviewSessionEvictionQueue[0];
		const documentPreviewSessionEvictionSeqRef = (0, import_react.useRef)(0);
		const pendingDocumentPreviewCloseResolversRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		(0, import_react.useEffect)(() => {
			if (usesPersistentDocumentPreviewHost || !adapter?.on) return;
			return adapter.on("local-document-session-evicted", (event) => {
				const sessionId = typeof event?.sessionId === "string" ? event.sessionId.trim() : "";
				if (!sessionId) return;
				documentPreviewSessionEvictionSeqRef.current += 1;
				const requestId = documentPreviewSessionEvictionSeqRef.current;
				setDocumentPreviewSessionEvictionQueue((previous) => [...previous, {
					requestId,
					sessionId
				}]);
			});
		}, [adapter, usesPersistentDocumentPreviewHost]);
		const handleDocumentPreviewSessionEvictionSettled = (0, import_react.useCallback)((requestId) => {
			setDocumentPreviewSessionEvictionQueue((previous) => previous.filter((intent) => intent.requestId !== requestId));
		}, []);
		const reportLocalActiveContextRef = (0, import_react.useRef)(() => {});
		/**
		* KeepAlive Pool 可见 slot 切换时，同步 main 侧 active document context。
		*
		* SDK Pool 中同一时刻只有一个 slot 处于内容区可见状态。slot 切换（用户切换
		* artifact、切换会话）时，通知主进程 activateContext，让主进程记录当前前台
		* 会话，避免将前台会话的预览误判为"后台 turn 结束可关闭"。
		* 关闭 tab 的 release 定位由 KeepAlivePool 的 closeIntent entry 匹配负责。
		*/
		const handleDocumentPreviewActiveSlotChange = (0, import_react.useCallback)((contextInfo) => {
			activeDocumentPreviewContextRef.current = contextInfo;
			reportLocalActiveContextRef.current(contextInfo);
			if (!contextInfo?.documentResourceUri || !localDocs?.activateContext) return;
			const activeSessionId = contextInfo.sessionId || currentConversationIdRef.current || void 0;
			localDocs.activateContext(contextInfo.documentResourceUri, activeSessionId).catch((error) => {
				console.warn("[DetailPanelWrapper] activate local docs context failed", {
					documentResourceUri: contextInfo.documentResourceUri,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}, [localDocs]);
		(0, import_react.useEffect)(() => {
			const setForeground = localDocs?.setForegroundSession;
			if (!setForeground) return;
			setForeground(sessionId ?? null).catch((error) => {
				console.warn("[DetailPanelWrapper] set foreground session failed", {
					sessionId,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}, [localDocs, sessionId]);
		const getCurrentConversationId = (0, import_react.useCallback)(() => context?.currentConversation?.id, [context?.currentConversation?.id]);
		const diffCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const rawReadFileWithFormat = context?.readFileWithFormat;
		const readFileWithFormat = (0, import_react.useMemo)(() => {
			if (!rawReadFileWithFormat) return;
			const wrapped = ((filePath, format) => {
				if (filePath.startsWith("blob:")) {
					if (!format || format === "text") return fetch(filePath).then((r) => r.text());
					if (format === "blob") return fetch(filePath).then((r) => r.blob());
				}
				if (selectedArtifactId && isLocalFilePreviewId(selectedArtifactId) && isSafeUserAttachmentUrl(filePath)) return readUserAttachmentUrl(filePath, format || "text");
				return format ? rawReadFileWithFormat(filePath, format) : rawReadFileWithFormat(filePath);
			});
			return wrapped;
		}, [rawReadFileWithFormat, selectedArtifactId]);
		const remoteAttachmentDocumentPreviewUrl = useColleagueDocumentPreview(readFileWithFormat);
		const artifactDragResolver = (0, import_react.useMemo)(() => createArtifactDragResolver(readFileWithFormat, sessionId), [readFileWithFormat, sessionId]);
		const isGitWorkspace = context?.isGitWorkspace ?? true;
		const isWorkbuddyDesktop = adapter?.isWorkbuddyDesktop === true;
		const registerShowSourceForFile = context?.registerShowSourceForFile;
		const mcpAppsAvailable = context?.mcpAppsAvailable ?? [];
		const selectedMcpAppId = context?.selectedMcpAppId;
		const onSelectMcpApp = context?.onSelectMcpApp;
		const activeMcpAppInstance = context?.activeMcpAppInstance;
		const mcpAppsStatus = useMcpAppsStatus().mcpAppsStatus;
		const onRetryMcpApp = context?.onRetryMcpApp;
		const onMcpAppBridgeMessage = context?.onMcpAppBridgeMessage;
		const registerMcpAppsPostMessage = context?.registerMcpAppsPostMessage;
		const onMcpAppWebviewLoadError = context?.onMcpAppWebviewLoadError;
		const notifyMcpAppDisplayModeChanged = context?.notifyMcpAppDisplayModeChanged;
		const onGenerateAppFromArdotCanvas = context?.onGenerateAppFromArdotCanvas;
		const onArdotMcpAppViewportChange = context?.onArdotMcpAppViewportChange;
		const mcpAppStandardPanelSlot = context?.mcpAppStandardPanelSlot;
		const mcpAppStandardPanelUsesArtifactNavigation = context?.mcpAppStandardPanelUsesArtifactNavigation;
		const ardotCanvasCollapseRequestSeq = context?.ardotCanvasCollapseRequestSeq ?? 0;
		const detailSidebarCollapseRequestSeq = context?.detailSidebarCollapseRequestSeq ?? 0;
		const detailSidebarExpandRequestSeq = context?.detailSidebarExpandRequestSeq ?? uiLayoutState?.detailSidebarExpandRequestSeq ?? 0;
		const lastHandledArdotCollapseSeqRef = (0, import_react.useRef)(ardotCanvasCollapseRequestSeq);
		const lastHandledDetailCollapseSeqRef = (0, import_react.useRef)(detailSidebarCollapseRequestSeq);
		const lastHandledDetailExpandSeqRef = (0, import_react.useRef)(detailSidebarExpandRequestSeq);
		const mcpAppsDebug = context?.mcpAppsDebug;
		const onToggleMcpAppsDebug = context?.onToggleMcpAppsDebug;
		const onLoadExampleMcpApps = context?.onLoadExampleMcpApps;
		/**
		* issue #39357：企业版（旗舰 / 专享）账号在 chat 产物里点击腾讯文档链接时，
		* onLinkClick 会调 `openArtifact('preview', { url })` 把 URL 写入 context.browserUrl
		* 并切到 preview tab。这里把"当前 browserUrl 是不是企业版腾讯文档链接"算出来：
		* - 是 → 通过 detailMainOverlay 注入 EnterpriseDocsWebviewBody，叠加在默认
		*   BrowserPreview 上，用 webview + 免登 cookie 直接预览，绕过 third-party
		*   cookie phaseout；同时把传给 ActivePanel 的 browserUrl 置 undefined，避免
		*   底层 BrowserPreview 也去加载这个会被重定向到登录页的链接。
		* - 否 → browserUrl 与 detailMainOverlay 走原逻辑。
		*
		* 仅在 sidebarView === 'preview' 时生效，用户切到其它 tab 时 webview 自动卸载。
		*/
		const effectiveEdition = useEffectiveEdition();
		const privateHost = usePrivateHost();
		/**
		* 当前 browserUrl 是否是企业版腾讯文档链接（不依赖 sidebarView）。
		* 拦截底层 BrowserPreview 的判定必须与视图状态解耦：sidebarView !== 'preview'
		* 的窗口期（刚打开面板 / 切到其它 tab）若把 browserUrl 放行给 BrowserPreview，
		* 它会用**无登录态的 partition** 加载并 302 到登录页，用户切回预览 tab 前
		* 看到的就是登录页，误以为登录态丢失。企业预览实际由 overlay 的
		* EnterpriseDocsWebviewBody（persist:tdoc-preview，登录态持久）完成。
		*/
		const isEnterpriseDocsUrl = (0, import_react.useMemo)(() => {
			if (effectiveEdition === null) return false;
			if (!browserUrl) return false;
			return isTencentDocsUrl(browserUrl, effectiveEdition, privateHost?.docHost);
		}, [
			effectiveEdition,
			privateHost?.docHost,
			browserUrl
		]);
		const enterpriseDocsPreviewUrl = isEnterpriseDocsUrl && sidebarView === "preview" ? browserUrl : null;
		const enterpriseDocsPreviewFileId = (0, import_react.useMemo)(() => extractTencentDocsPreviewFileId(enterpriseDocsPreviewUrl), [enterpriseDocsPreviewUrl]);
		const isTencentDocsPreview = Boolean(enterpriseDocsPreviewUrl) || Boolean(effectiveEdition !== null && browserUrl && isTencentDocsUrl(browserUrl, effectiveEdition, privateHost?.docHost));
		const { reportLocalActiveContext } = useFileViewerPageShow({
			metrics: wb$1.metrics,
			userId: account?.uid,
			sidebarView,
			browserUrl,
			isTencentDocsPreview
		});
		reportLocalActiveContextRef.current = reportLocalActiveContext;
		/**
		* wb-extension preview iframe 上报的 tab 标题 —— 通过 `exposes` 实例 API
		* `wb.preview.setTitle(...)` 由 iframe 主动上报，宿主再把标题同步给预览 tab。
		*
		* `browserUrl` 变化时清空，避免残留上一个 preview 的标题；新 iframe onload 后
		* 调 setTitle 覆盖。
		*/
		const [wbExtensionPreviewTitle, setWbExtensionPreviewTitle] = (0, import_react.useState)(void 0);
		(0, import_react.useEffect)(() => {
			setWbExtensionPreviewTitle(void 0);
		}, [browserUrl]);
		/**
		* 打开资料库链接 /space/d/<nodeId> 时，主动通过 spaceNode.getNodeBrief 查询文档 title，
		* 和 iframe 加载并行——daemon RPC 比等 iframe 加载完再 postMessage 快得多，
		* 实现"打开即显示文档 title"而非先显示 nodeId 再异步更新。
		*/
		(0, import_react.useEffect)(() => {
			if (!browserUrl) return;
			try {
				const u = new URL(browserUrl);
				if (!/^\/space\/d\/[^/?#]+/.test(u.pathname)) return;
			} catch {
				return;
			}
			const spaceNode = appProviders?.facades?.spaceNode ?? appProviders?.services?.spaceNode;
			if (!spaceNode?.getNodeBrief) return;
			let cancelled = false;
			spaceNode.getNodeBrief({ url: browserUrl }).then((result) => {
				if (cancelled || !result.ok || !result.node.title) return;
				setWbExtensionPreviewTitle(result.node.title);
				const activeTabId = browserPanel?.activeTabId;
				if (activeTabId) updateBrowserTabLabelFromContext?.(activeTabId, result.node.title, "explicit");
			}).catch(() => {});
			return () => {
				cancelled = true;
			};
		}, [
			browserUrl,
			appProviders?.facades?.spaceNode,
			appProviders?.services?.spaceNode
		]);
		/**
		* 挂到本预览实例上的 wb API 白名单（**只本挂载点**可见）。
		*
		* `wb.preview.setTitle(title)` —— iframe 里调用后更新 preview tab 显示的标题。
		*
		* ⚠️ 引用必须稳定：`ExtensionIframeHost` 的 `exposes`
		* 引用变化会重建 methodChannel
		* + 触发 iframe re-attach。`setWbExtensionPreviewTitle`（useState 的 setter）在
		* 组件生命周期内 identity 稳定，`useMemo` 空 deps 数组安全。
		*/
		const wbExtensionPreviewExposes = (0, import_react.useMemo)(() => ({ preview: { setTitle: (title) => {
			if (typeof title === "string" && title.trim()) {
				setWbExtensionPreviewTitle(title);
				const activeTabId = browserPanelRef.current?.activeTabId;
				if (activeTabId) updateBrowserTabLabelFromContext?.(activeTabId, title, "explicit");
			}
		} } }), []);
		/**
		* BrowserPreview 单实例 override —— 检测特定 URL 并返回替代节点，让 BrowserPreview
		* 的 slot 结构 / tab bar 生命周期不变，只是内部渲染的 body 换掉。
		*
		* 两类通用分派（按优先级）：
		*
		* 1. **该 extension `distribution.trustedUrls` 命中** —— 平台盖章"这些 URL 归本 ext"。
		*    若同 extension 声明匹配 `workbuddy/browser-preview` 的 artifactPreview contribution，
		*    优先交给 `<ExtensionMount>`；否则保持原有 `<ExtensionIframeHost>` 逻辑。
		* 2. **`wb-extension://` scheme** —— 原生 extension resource URL，从 host 段反解出
		*    extensionId 挂同套 IframeHost。
		*
		* ── 权限模型 ──
		*
		* 前 2 类都用**该 extension 的 subject**，权限从 daemon `PermissionRegistry` 里
		* 该 ext 的 `grantedPermissions` 走（builtin 全权限 / platform / 3P 按声明）。宿主
		* 装配层不再为特定 URL 注册额外 subject —— 治理面单一事实来源就在 distribution。
		*/
		const renderBrowserPreviewOverride = (0, import_react.useCallback)(({ url }) => {
			if (extensionStoreStatus === "loading") return null;
			let extensionId;
			if (url) {
				const trustedHit = findExtensionTrustedUrlEntry(extensionTrustedUrls, url);
				if (trustedHit) {
					const previewHit = extensionArtifactPreviews.find((entry) => entry.extensionId === trustedHit.extensionId && matchesContribution(entry.match, { bizType: "workbuddy/browser-preview" }));
					if (previewHit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtensionMount, {
						extensionId: trustedHit.extensionId,
						container: "iframe",
						contribution: {
							kind: "artifactPreview",
							id: previewHit.previewId,
							data: { artifact: url }
						},
						exposes: wbExtensionPreviewExposes
					}, url);
					extensionId = trustedHit.extensionId;
				} else if (url.startsWith("wb-extension://")) try {
					extensionId = new URL(url).hostname || void 0;
				} catch {}
			}
			if (url && extensionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtensionIframeHost, {
				extensionId,
				url,
				style: {
					width: "100%",
					height: "100%",
					border: 0
				},
				exposes: wbExtensionPreviewExposes
			}, url);
		}, [
			extensionArtifactPreviews,
			extensionStoreStatus,
			extensionTrustedUrls,
			wbExtensionPreviewExposes
		]);
		/**
		* HTML 可视化编辑模式：用户选中 HTML artifact 后可切换到编辑模式，
		* 通过 detailMainOverlay 叠加 HtmlEditorPanel，不侵入 DetailPanel 内部渲染。
		* 仅 local 环境（非 cloud / 非 project / 非 forceCloud）可用。
		*/
		const [htmlEditMode, setHtmlEditMode] = (0, import_react.useState)(false);
		const prevHtmlTargetRef = (0, import_react.useRef)(null);
		const lastEditableHtmlTargetRef = (0, import_react.useRef)(null);
		const prevHtmlEditorSessionIdRef = (0, import_react.useRef)(void 0);
		(0, import_react.useEffect)(() => {
			if (prevHtmlEditorSessionIdRef.current === void 0) {
				prevHtmlEditorSessionIdRef.current = sessionId;
				return;
			}
			if (prevHtmlEditorSessionIdRef.current !== sessionId) {
				prevHtmlEditorSessionIdRef.current = sessionId;
				setHtmlEditMode(false);
				prevHtmlTargetRef.current = null;
				lastEditableHtmlTargetRef.current = null;
			}
		}, [sessionId]);
		const [collapseDesignCanvasSidebar, setCollapseDesignCanvasSidebar] = (0, import_react.useState)(false);
		const collapseDesignCanvasSidebarRef = (0, import_react.useRef)(collapseDesignCanvasSidebar);
		const collapseDesignCanvasSidebarCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const prevCollapseSidebarSessionIdRef = (0, import_react.useRef)(void 0);
		const [ardotAuthBound, setArdotAuthBound] = (0, import_react.useState)(false);
		const onOpenMcpApp = context?.onOpenMcpApp;
		const currentConversation = context?.currentConversation;
		const selectedArtifactForOnboarding = selectedArtifactId ? rawArtifacts.find((item) => item.id === selectedArtifactId) : void 0;
		const isPreviewingArdotCanvas = !!selectedArtifactForOnboarding && selectedArtifactForOnboarding.type === "custom-artifact" && (selectedArtifactForOnboarding.customType === "ardot/canvas" || selectedArtifactForOnboarding.customType === DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE || isArdotArtifactIcon(selectedArtifactForOnboarding));
		const conversationIdForForcedOnboarding = currentConversation?.id;
		const isForcedArdotOnboarding = useArdotForcedOnboarding(conversationIdForForcedOnboarding);
		(0, import_react.useEffect)(() => {
			if (!conversationIdForForcedOnboarding) return;
			cancelArdotForcedOnboardingClear(conversationIdForForcedOnboarding);
			return () => {
				scheduleArdotForcedOnboardingClear(conversationIdForForcedOnboarding);
			};
		}, [conversationIdForForcedOnboarding]);
		const { shouldShowArdotOnboarding, isArdotEnterpriseEnabled } = useArdotEnterpriseOnboarding(currentConversation, isPreviewingArdotCanvas, isForcedArdotOnboarding);
		const designNewCanvasArtifactId = currentConversation?.id ? `${DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX}:${currentConversation.id}` : void 0;
		const shouldShowDesignNewCanvas = false;
		const hasFormalArdotCanvasArtifact = !!(0, import_react.useMemo)(() => rawArtifacts.find((item) => item.type === "custom-artifact" && item.customType === "ardot/canvas"), [rawArtifacts]);
		const designNewCanvasArtifact = (0, import_react.useMemo)(() => {}, [
			currentConversation,
			designNewCanvasArtifactId,
			hasFormalArdotCanvasArtifact,
			!!designNewCanvasArtifactId && selectedArtifactId === designNewCanvasArtifactId,
			shouldShowDesignNewCanvas,
			t
		]);
		const artifacts = (0, import_react.useMemo)(() => {
			perfInc("DetailPanel.artifactsRecalc");
			return designNewCanvasArtifact ? [designNewCanvasArtifact, ...rawArtifacts.filter((item) => item.id !== designNewCanvasArtifact.id)] : rawArtifacts;
		}, [designNewCanvasArtifact, rawArtifacts]);
		perfInc("DetailPanel.rawArtifactsSeen");
		const selectedArtifactForCurrentSession = (() => {
			if (!selectedArtifactId) return;
			const sessionMatched = artifacts.find((item) => item.id === selectedArtifactId && item.sessionId === currentConversation?.id);
			if (sessionMatched) return sessionMatched;
			return artifacts.find((item) => item.id === selectedArtifactId);
		})();
		const selectedArtifactIdForCurrentSession = selectedArtifactForCurrentSession?.id;
		const isSelectedArtifactBlobPreview = (() => {
			const artifact = selectedArtifactForCurrentSession;
			if (!artifact) return false;
			const url = artifact.url;
			return typeof url === "string" && url.startsWith("blob:");
		})();
		/**
		* 当前选中的「应用」产物（`customType: 'wb/app'`）。
		*
		* ArtifactContentRenderer 对 wb/app 短路 return null（虚拟 uri 不可读文件），
		* 真正的应用空间由下方 detailMainOverlay 注入，与 MCP App / Ardot 同构。
		*/
		const selectedWbApp = getWbAppArtifactData(selectedArtifactForCurrentSession);
		const appSpaceOpenRevision = isWbAppArtifact(selectedArtifactForCurrentSession) ? selectedArtifactForCurrentSession.appSpaceOpenRevision : void 0;
		const appSpaceInitialTab = isWbAppArtifact(selectedArtifactForCurrentSession) ? selectedArtifactForCurrentSession.appSpaceInitialTab : void 0;
		const hasOpenedDetailContent = Boolean(selectedArtifactIdForCurrentSession || selectedFilePath || browserUrl || mcpAppStandardPanelSlot);
		(0, import_react.useEffect)(() => () => {
			for (const pending of pendingDocumentPreviewCloseResolversRef.current.values()) {
				clearTimeout(pending.timeoutId);
				pending.resolve(false);
			}
			pendingDocumentPreviewCloseResolversRef.current.clear();
		}, []);
		const refreshArdotAuthBound = (0, import_react.useCallback)(async () => {
			try {
				const status = await checkAuth();
				setArdotAuthBound(status.status === "connected");
			} catch (error) {
				console.warn("[DetailPanelWrapper] check Ardot auth status failed:", error);
			}
		}, [checkAuth]);
		(0, import_react.useEffect)(() => {
			refreshArdotAuthBound();
		}, [currentConversation?.id, refreshArdotAuthBound]);
		const ardotEnterpriseBoundSessionRef = (0, import_react.useRef)(void 0);
		(0, import_react.useEffect)(() => {
			if (!isArdotEnterpriseEnabled) return;
			const sessionId = currentConversation?.id;
			if (!sessionId || ardotEnterpriseBoundSessionRef.current === sessionId) return;
			ardotEnterpriseBoundSessionRef.current = sessionId;
			let cancelled = false;
			(async () => {
				try {
					const status = await checkAuth();
					if (cancelled) return;
					if (status.status === "expired") {
						try {
							await authRevoke();
						} catch (revokeError) {
							console.warn("[DetailPanelWrapper] ardot enterprise pre-bind revoke failed, will still try connect", revokeError);
						}
						if (cancelled) return;
					}
					const authorizeSession = appProviders?.designAuth?.authorizeSession;
					if (typeof authorizeSession === "function") {
						const result = await authorizeSession();
						if (result?.status !== "authorized") throw new Error(result?.error || "Ardot authorization failed");
					} else if (status.status !== "connected") await authConnector();
					if (!cancelled) setArdotAuthBound(true);
				} catch (error) {
					console.warn("[DetailPanelWrapper] ardot enterprise silent bind failed:", error);
					if (ardotEnterpriseBoundSessionRef.current === sessionId) ardotEnterpriseBoundSessionRef.current = void 0;
				}
			})();
			return () => {
				cancelled = true;
			};
		}, [
			isArdotEnterpriseEnabled,
			currentConversation?.id,
			checkAuth,
			authConnector,
			authRevoke,
			appProviders?.designAuth
		]);
		(0, import_react.useEffect)(() => {
			collapseDesignCanvasSidebarRef.current = collapseDesignCanvasSidebar;
			if (currentConversation?.id) collapseDesignCanvasSidebarCacheRef.current.set(currentConversation.id, collapseDesignCanvasSidebar);
		}, [collapseDesignCanvasSidebar, currentConversation?.id]);
		(0, import_react.useLayoutEffect)(() => {
			const prevSessionId = prevCollapseSidebarSessionIdRef.current;
			const currentSessionId = currentConversation?.id;
			if (prevSessionId === currentSessionId) return;
			if (prevSessionId) collapseDesignCanvasSidebarCacheRef.current.set(prevSessionId, collapseDesignCanvasSidebarRef.current);
			prevCollapseSidebarSessionIdRef.current = currentSessionId;
			const nextCollapsed = currentSessionId ? collapseDesignCanvasSidebarCacheRef.current.get(currentSessionId) ?? false : false;
			setCollapseDesignCanvasSidebar(nextCollapsed);
		}, [currentConversation?.id]);
		/**
		* "选中目标是否是 Ardot 画布(synthetic 或 任何一张正式 ardot/canvas)"。
		* collapseDesignCanvasSidebar 这套侧栏收起逻辑只对 Ardot 画布生效,
		* 切到其它 artifact 时必须重置;但同会话多张 Ardot 画布之间的切换
		* 不应让 sidebar 自动展开,因此这里按 customType 全量识别。
		*/
		const isArdotCanvasSelected = !!selectedArtifactIdForCurrentSession && (selectedArtifactIdForCurrentSession === designNewCanvasArtifactId || rawArtifacts.some((item) => item.id === selectedArtifactIdForCurrentSession && item.type === "custom-artifact" && (item.customType === "ardot/canvas" || item.customType === "mcp/app" && (item.id.startsWith("mcp-app://artifact/ardot/") || item.id.startsWith("ardot://canvas/") || item.mcpApp?.appId === "ardot/open_design" || item.mcpApp?.appId === "ardot/create_design"))));
		(0, import_react.useLayoutEffect)(() => {
			if (ardotCanvasCollapseRequestSeq === lastHandledArdotCollapseSeqRef.current) return;
			lastHandledArdotCollapseSeqRef.current = ardotCanvasCollapseRequestSeq;
			if (ardotCanvasCollapseRequestSeq > 0 && isArdotCanvasSelected) setCollapseDesignCanvasSidebar(true);
		}, [
			ardotCanvasCollapseRequestSeq,
			currentConversation?.id,
			isArdotCanvasSelected,
			selectedArtifactId
		]);
		(0, import_react.useLayoutEffect)(() => {
			if (detailSidebarCollapseRequestSeq === lastHandledDetailCollapseSeqRef.current) return;
			lastHandledDetailCollapseSeqRef.current = detailSidebarCollapseRequestSeq;
			if (detailSidebarCollapseRequestSeq > 0) setCollapseDesignCanvasSidebar(true);
		}, [currentConversation?.id, detailSidebarCollapseRequestSeq]);
		(0, import_react.useLayoutEffect)(() => {
			if (detailSidebarExpandRequestSeq === lastHandledDetailExpandSeqRef.current) return;
			lastHandledDetailExpandSeqRef.current = detailSidebarExpandRequestSeq;
			if (detailSidebarExpandRequestSeq > 0) setCollapseDesignCanvasSidebar(false);
		}, [
			currentConversation?.id,
			detailSidebarExpandRequestSeq,
			selectedArtifactId
		]);
		/**
		* Ardot 画布选中态自动跟随的统一 effect。
		*
		* 解决两类场景,且二者使用同一条规则,避免历史上多个 effect 互相干扰:
		*
		* 1. 首轮 synthetic「新画布」→ formal artifact 迁移:
		*    用户先点 synthetic launcher,selected 指向 synthetic id;
		*    Tool Result 产物事件产生第一张正式 `ardot/canvas` artifact。
		*    若不迁移,synthetic 被隐藏后 DetailPanel 找不到 selected,
		*    Ardot webview 会被 unmount。
		*
		* 2. 后续轮次新画布:
		*    会话内已有一张 ardot canvas artifact 处于 selected,新一轮
		*    `create_design` 后又产生第二张 formal artifact。用户期望
		*    sidebar active item 与 artifact tabs 自动跟随到新创建的画布,
		*    而不是停留在前一轮。
		*
		* 规则:每次 rawArtifacts 变化时计算"新增的 formal ardot_canvas",
		* 仅当当前 selected 已经处在 Ardot 画布(synthetic 或任意一张已知
		* formal)且确实有新增时,把 selected 迁到最新这一张。首次 mount /
		* 历史恢复时不会触发。
		*/
		const knownArdotCanvasIdsRef = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			const currentIds = rawArtifacts.filter((item) => item.type === "custom-artifact" && item.customType === "ardot/canvas").map((item) => item.id);
			if (knownArdotCanvasIdsRef.current === null) {
				knownArdotCanvasIdsRef.current = new Set(currentIds);
				if (selectedArtifactId === designNewCanvasArtifactId && currentIds.length > 0) {
					const targetId = currentIds[currentIds.length - 1];
					if (targetId && targetId !== selectedArtifactId) contextOnArtifactSelect?.(targetId);
				}
				return;
			}
			const known = knownArdotCanvasIdsRef.current;
			const newlyAddedIds = currentIds.filter((id) => !known.has(id));
			const nextKnown = new Set(currentIds);
			knownArdotCanvasIdsRef.current = nextKnown;
			if (newlyAddedIds.length === 0) return;
			if (!(!!selectedArtifactId && (selectedArtifactId === designNewCanvasArtifactId || known.has(selectedArtifactId) || nextKnown.has(selectedArtifactId)))) return;
			const targetId = newlyAddedIds[newlyAddedIds.length - 1];
			if (targetId && targetId !== selectedArtifactId) contextOnArtifactSelect?.(targetId);
		}, [
			contextOnArtifactSelect,
			designNewCanvasArtifactId,
			rawArtifacts,
			selectedArtifactId
		]);
		(0, import_react.useEffect)(() => {
			knownArdotCanvasIdsRef.current = null;
		}, [currentConversation?.id]);
		const openDesignCanvas = (0, import_react.useCallback)((options) => {
			if (options?.collapseSidebar) setCollapseDesignCanvasSidebar(true);
			if (designNewCanvasArtifactId) contextOnArtifactSelect?.(designNewCanvasArtifactId);
			if (onOpenMcpApp) {
				onOpenMcpApp({
					appId: ARDOT_OPEN_DESIGN_APP_ID,
					forceReload: options?.forceReload
				});
				return;
			}
			console.warn("[DetailPanelWrapper] cannot open design canvas; MCP App opener is unavailable");
		}, [
			contextOnArtifactSelect,
			designNewCanvasArtifactId,
			onOpenMcpApp
		]);
		/**
		* 正式 Ardot 画布回放必须走标准 MCP Apps panel（openPersisted +
		* open_design(fileUrl)）。走 onOpenMcpApp → openArdotApp 只会挂旧桥，
		* 不会写入 coordinator，右侧 mcpAppStandardPanelSlot 为空 → artifact-body 空白。
		*
		* forceReload：先 hide 当前可见 panel 再 openPersisted，避免 P7 只 focus 旧实例。
		*/
		const openFormalArdotCanvas = (0, import_react.useCallback)((artifact, openSource, options) => {
			const panelReplay = resolvePersistedMcpAppPanelReplay(artifact);
			if (!panelReplay) return false;
			const convInfo = extractConversationTelemetryInfo(context?.conversations, panelReplay.sessionId);
			reportCanvasOpenAttempt(adapter, {
				conversationId: panelReplay.sessionId,
				appId: panelReplay.appId,
				source: openSource ?? "file_tab",
				id: extractArdotOpenDesignFileId(panelReplay.toolInput.fileUrl),
				requestId: convInfo.requestId || void 0
			});
			if (options?.forceReload) {
				const coordinator = getMcpAppsCoordinator();
				if (coordinator) {
					for (const record of coordinator.views.listSession(panelReplay.sessionId)) if (record.surface === "panel" && record.panelVisible) coordinator.hidePanel(record.appInstanceId);
				}
			}
			openHistoricalMcpAppArtifact({
				...panelReplay,
				toolResult: panelReplay.toolResult,
				requestedSurface: "panel",
				authorizeSession: appProviders?.designAuth?.authorizeSession,
				forceReload: options?.forceReload
			}).catch((error) => {
				console.error("[DetailPanelWrapper] failed to open Ardot canvas panel", error);
			});
			return true;
		}, [
			adapter,
			appProviders?.designAuth?.authorizeSession,
			context?.conversations
		]);
		const isActiveMcpAppShowingArdotCanvas = (0, import_react.useCallback)((fileId) => {
			if (!activeMcpAppInstance || activeMcpAppInstance.appId !== ARDOT_OPEN_DESIGN_APP_ID) return false;
			return extractArdotOpenDesignFileId(activeMcpAppInstance.toolInput?.fileUrl) === fileId;
		}, [activeMcpAppInstance]);
		const handleOpenArdotCanvasArtifact = (0, import_react.useCallback)((artifact, options) => {
			if (artifact.id === designNewCanvasArtifactId || artifact.type === "custom-artifact" && artifact.customType === DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE) {
				openDesignCanvas({ forceReload: options?.forceReload });
				return;
			}
			if (artifact.type !== "custom-artifact") return;
			if (artifact.customType === "ardot/canvas" || artifact.customType === "mcp/app" && isArdotArtifactIcon(artifact)) openFormalArdotCanvas(artifact, "file_tab", { forceReload: options?.forceReload });
		}, [
			designNewCanvasArtifactId,
			openDesignCanvas,
			openFormalArdotCanvas
		]);
		const handleArdotAuthToggle = (0, import_react.useCallback)(async (next) => {
			if (next) {
				const authorizeSession = appProviders?.designAuth?.authorizeSession;
				if (typeof authorizeSession === "function") {
					const result = await authorizeSession();
					if (result?.status !== "authorized") throw new Error(result?.error || "Ardot authorization failed");
				} else await authConnector();
				setArdotAuthBound(true);
				return;
			}
			await authRevoke();
			setArdotAuthBound(false);
		}, [
			appProviders?.designAuth,
			authConnector,
			authRevoke
		]);
		/**
		* 在 WB renderer 主页 window 上暴露 Ardot 授权测试 API,供手工 QA / 自动化脚本
		* 在 DevTools Console 直接调用,验证"绑定 / 解绑 / 重新绑定"完整链路。
		*
		* 命名 `__ardotAuthTestApi` 对齐 mcp-app webview 已有的 `__mcpHostTestApi`
		* 风格,前缀双下划线提示外部代码这是辅助测试 API,不要在生产业务逻辑里依赖。
		*
		* 用法(DevTools Console):
		*   await window.__ardotAuthTestApi.revoke()   // 真实解绑,下次发消息会触发静默重新授权
		*   await window.__ardotAuthTestApi.bind()     // 重新绑定
		*
		* 内部直接复用 handleArdotAuthToggle,与 DetailPanel 上"绑定 Ardot 账号"
		* 测试开关共享同一条 authConnector / authRevoke 路径,行为完全一致。
		*/
		(0, import_react.useEffect)(() => {
			if (typeof window === "undefined") return;
			window.__ardotAuthTestApi = {
				revoke: async () => {
					await handleArdotAuthToggle(false);
					console.info("[__ardotAuthTestApi] revoke ok — 下次发消息将触发静默重新授权");
				},
				bind: async () => {
					await handleArdotAuthToggle(true);
					console.info("[__ardotAuthTestApi] bind ok");
				}
			};
			return () => {
				delete window.__ardotAuthTestApi;
			};
		}, [handleArdotAuthToggle]);
		const handleSidebarCollapseChange = (0, import_react.useCallback)((collapsed) => {
			if (documentPreviewSource === "colleague-assistant") {
				setCollapseDesignCanvasSidebar(collapsed);
				return;
			}
			if (!collapsed) setCollapseDesignCanvasSidebar(false);
		}, [documentPreviewSource]);
		const mapViewToMenuType = (view) => {
			switch (view) {
				case "artifacts": return "artifact";
				case "fileTree": return "files";
				case "preview": return "preview";
				case "changes": return "changes";
				case "mcpApps": return "mcpApps";
				case "expert": return "expert";
				case "overview": return "overview";
				case "sources": return "sources";
				case "terminal": return "terminal";
				case "quickAsk": return "quickAsk";
			}
		};
		const [createdExperts, setCreatedExperts] = (0, import_react.useState)(() => expertCreated$.getValue());
		(0, import_react.useEffect)(() => {
			const subscription = expertCreated$.subscribe((experts) => {
				setCreatedExperts(experts);
			});
			return () => subscription.unsubscribe();
		}, []);
		const [teamMemberAvatars, setTeamMemberAvatars] = (0, import_react.useState)(() => expertTeamMemberAvatars$.getValue());
		(0, import_react.useEffect)(() => {
			const subscription = expertTeamMemberAvatars$.subscribe((map) => {
				setTeamMemberAvatars(map);
			});
			return () => subscription.unsubscribe();
		}, []);
		const [expertCategories, setExpertCategories] = (0, import_react.useState)([]);
		const { listMarketCategories } = useExpertApi();
		(0, import_react.useEffect)(() => {
			listMarketCategories({ source: "builtin" }).then((result) => {
				setExpertCategories(result.items ?? []);
			}).catch(() => {
				setExpertCategories([]);
			});
		}, [listMarketCategories]);
		const handleExpertTest = (0, import_react.useCallback)(async (expertId, _cardPosition, prompt) => {
			const targetExpert = createdExperts.find((e) => e.id === expertId);
			if (!targetExpert || !adapter) return;
			try {
				const i18nToString = (value) => {
					if (typeof value === "string") return value;
					if (value && typeof value === "object") {
						const text = value;
						return (locale === "zh" ? text.zh : text.en) ?? text.zh ?? text.en ?? "";
					}
					return "";
				};
				const expertName = i18nToString(targetExpert.displayName) || targetExpert.name;
				const expertProfession = i18nToString(targetExpert.profession);
				const targetExpertMeta = targetExpert;
				const toNonEmptyString = (value) => typeof value === "string" && value.trim() ? value.trim() : void 0;
				const expertRootDir = toNonEmptyString(targetExpertMeta.expertRootDir);
				const expertRootDirName = expertRootDir?.split(/[\\/]/).filter(Boolean).pop();
				const pluginName = toNonEmptyString(targetExpert.plugin) ?? toNonEmptyString(targetExpertMeta.pluginName);
				const marketplace = toNonEmptyString(targetExpert.marketplace) ?? (targetExpert.isCustomExpert || expertRootDir ? "my-experts" : void 0);
				const launchExpertId = marketplace === "my-experts" ? expertRootDirName ?? pluginName ?? targetExpert.id : targetExpert.id;
				const selectedExpertForLaunch = {
					...targetExpert,
					id: launchExpertId,
					name: expertName,
					profession: expertProfession,
					avatarUrl: targetExpert.avatar,
					prompt: prompt ?? i18nToString(targetExpert.defaultInitPrompt),
					defaultInitPrompt: (prompt ?? i18nToString(targetExpert.defaultInitPrompt)) || void 0,
					pluginName,
					pluginRegisteredName: toNonEmptyString(targetExpertMeta.pluginRegisteredName) ?? pluginName,
					updatedAt: toNonEmptyString(targetExpert.updatedAt),
					version: toNonEmptyString(targetExpertMeta.version),
					expertType: targetExpert.expertType,
					agentName: toNonEmptyString(targetExpertMeta.agentName),
					localPath: expertRootDir,
					expertRootDir,
					isCustomExpert: marketplace === "my-experts" ? true : targetExpert.isCustomExpert,
					...marketplace ? { marketplace } : {},
					...marketplace === "my-experts" ? { source: "custom" } : {},
					summonTimestamp: Date.now()
				};
				if (moduleHost) {
					await moduleHost.session.prepare({
						context: { expert: {
							id: launchExpertId,
							name: expertName,
							profession: expertProfession,
							avatar: targetExpert.avatar,
							plugin: pluginName,
							updatedAt: targetExpert.updatedAt,
							expertType: targetExpert.expertType,
							agentName: toNonEmptyString(targetExpertMeta.agentName),
							localPath: expertRootDir,
							expertRootDir,
							isCustomExpert: marketplace === "my-experts" ? true : targetExpert.isCustomExpert,
							marketplace,
							pluginRegisteredName: toNonEmptyString(targetExpertMeta.pluginRegisteredName) ?? pluginName,
							_selectedExpert: selectedExpertForLaunch
						} },
						prompt,
						source: "detail-panel-expert-test"
					});
					moduleHost.navigation.goHome();
					return;
				}
				context?.handleNewTask?.(true);
				skipAutoSelectWorkspaceForExpertInvoke$.next(true);
				taskStarterCwd$.next("");
				if (typeof adapter.setPendingExpert === "function") adapter.setPendingExpert(selectedExpertForLaunch);
				pendingExpertModeActivation$.next(true);
			} catch (err) {
				console.error("[handleExpertTest] failed:", err);
				toast.error("启动专家试用失败，请稍后重试");
			}
		}, [
			adapter,
			createdExperts,
			context,
			moduleHost,
			locale
		]);
		const onSidebarViewChange = (0, import_react.useCallback)((view) => {
			setCollapseDesignCanvasSidebar(false);
			reportEvent(Events.ArtifactTopMenuClicked, { menu_type: mapViewToMenuType(view) });
			if (view === "preview") geniePreviewReport(GENIE_EMBED_EVENT.PAGE_BUTTON_CLICK, {
				button: GENIE_BUTTON.PREVIEW_LINK_CLICK,
				linkType: GENIE_LINK_TYPE.PREVIEW
			});
			contextOnSidebarViewChange?.(view);
		}, [
			contextOnSidebarViewChange,
			reportEvent,
			Events,
			geniePreviewReport
		]);
		const performArtifactSelectCore = (0, import_react.useCallback)((artifactId) => {
			perfInc("DetailPanel.artifactSelect");
			const __perfT0 = performance.now();
			const requestSeq = ++detailPanelRequestSeqRef.current;
			if (!artifactId) {
				hideActiveMcpAppPanel?.();
				contextOnArtifactSelect?.(void 0);
				return;
			}
			if (artifactId) {
				const artifact = artifacts.find((a) => a.id === artifactId);
				const isFormalArdotCanvas = artifact?.type === "custom-artifact" && (artifact.customType === "ardot/canvas" || artifact.customType === "mcp/app" && isArdotArtifactIcon(artifact));
				if (isFormalArdotCanvas && artifactId === selectedArtifactId) {
					const fileId = extractArdotCanvasFileId({
						uri: "uri" in artifact ? artifact.uri : void 0,
						id: artifact.id
					});
					if (fileId && isActiveMcpAppShowingArdotCanvas(fileId)) return;
				}
				if (isFormalArdotCanvas && openFormalArdotCanvas(artifact, "file_tab")) {
					contextOnArtifactSelect?.(artifactId);
					return;
				}
				if (artifact?.type === "custom-artifact") {
					const mcpAppReplayTarget = resolvePersistedMcpAppPanelReplay(artifact);
					if (mcpAppReplayTarget) {
						contextOnArtifactSelect?.(artifactId);
						openPersistedMcpAppView({
							...mcpAppReplayTarget,
							toolResult: mcpAppReplayTarget.toolResult,
							requestedSurface: "panel"
						}).catch((error) => {
							console.error("[DetailPanelWrapper] failed to replay MCP App artifact", error);
						});
						return;
					}
				}
				hideActiveMcpAppPanel?.();
				setCollapseDesignCanvasSidebar(false);
				const fileUrl = disableHtmlBrowserPreview ? void 0 : getHtmlArtifactPreviewUrl(artifact);
				if (fileUrl && inHtmlPreviewRef.current !== artifactId && !shouldSkipBrowserPreview({
					adapter,
					isProjectSession,
					forceCloudEnvironment
				})) {
					contextOnArtifactSelect?.(void 0);
					if (fileUrl.startsWith("agent://")) {
						setBrowserUrlFromContext?.("");
						const resolver = adapterRef.current?.resolvePreviewUrl?.bind(adapterRef.current);
						const sessionId = contextRef.current?.currentConversation?.id ?? "";
						if (sessionId && resolver) resolver(sessionId, fileUrl).then((resolvedUrl) => {
							if (detailPanelRequestSeqRef.current !== requestSeq) return;
							if (resolvedUrl && !resolvedUrl.startsWith("agent://")) setBrowserUrlFromContext?.(resolvedUrl);
						}).catch(() => void 0);
					} else {
						const sitesSessionId = contextRef.current?.currentConversation?.id ?? "";
						resolveSitesPreviewUrl(fileUrl, sitesSessionId, publishedAppsProvider).then((resolvedUrl) => {
							if (detailPanelRequestSeqRef.current !== requestSeq) return;
							setBrowserUrlFromContext?.(resolvedUrl || fileUrl);
						});
					}
					contextOnSidebarViewChange?.("preview");
					inHtmlPreviewRef.current = artifactId;
					if (!forceCloudEnvironment && !context?.writeSandboxFile) wrappedHtmlExpo({
						url: fileUrl,
						title: artifact?.title
					});
					if (performance.now() - __perfT0 > 50) perfInc("artifactSelect.slowHtmlPreview");
					return;
				}
			}
			contextOnArtifactSelect?.(artifactId);
			if (performance.now() - __perfT0 > 50) perfInc("artifactSelect.slowFallthrough");
		}, [
			contextOnArtifactSelect,
			artifacts,
			selectedArtifactId,
			isActiveMcpAppShowingArdotCanvas,
			openFormalArdotCanvas,
			setBrowserUrlFromContext,
			contextOnSidebarViewChange,
			disableHtmlBrowserPreview,
			publishedAppsProvider,
			hideActiveMcpAppPanel
		]);
		const getArtifactLocalSdkOpenPath = (0, import_react.useCallback)((artifactId) => {
			if (!artifactId) return;
			const artifact = artifacts.find((item) => item.id === artifactId);
			if (!artifact) return;
			if (artifact.type === "file-changes" || artifact.category === "file-changes") return;
			return getLocalSdkDocumentPath(getArtifactRelativePath(artifact));
		}, [artifacts]);
		/**
		* 云端沙箱 dirty 关闭 / 切走 gate。实现在下方 cloudSandboxSaveContext 就绪后写入；
		* 此处用 ref 承接，避免把整段云保存状态上移到 tab 生命周期之前。
		*/
		const cloudSandboxDirtyCloseGateRef = (0, import_react.useRef)(async () => true);
		const cloudSandboxSaveContextRef = (0, import_react.useRef)(null);
		/** 统一 tab 外层 leave 已弹过时，内层 setter 同一次导航不再二次弹窗。 */
		const cloudSandboxDirtyLeaveGrantRef = (0, import_react.useRef)(void 0);
		const consumeCloudSandboxDirtyLeaveGrant = () => {
			const dirtyPath = cloudSandboxSaveContextRef.current?.sandboxFilePath;
			const grant = cloudSandboxDirtyLeaveGrantRef.current;
			if (!grant || !dirtyPath) return false;
			if (normalizeSandboxFilePath(dirtyPath) !== grant) return false;
			cloudSandboxDirtyLeaveGrantRef.current = void 0;
			return true;
		};
		const confirmLeaveDirtyCloudSandbox = async (destinationFilePath) => {
			if (consumeCloudSandboxDirtyLeaveGrant()) return true;
			return cloudSandboxDirtyCloseGateRef.current({
				closeFilePath: destinationFilePath,
				selectionDocument: destinationFilePath
			}, "leave");
		};
		const markCloudSandboxDirtyLeaveGranted = () => {
			const dirtyContext = cloudSandboxSaveContextRef.current;
			if (!dirtyContext?.isDirty || !dirtyContext.sandboxFilePath) return;
			const grant = normalizeSandboxFilePath(dirtyContext.sandboxFilePath);
			cloudSandboxDirtyLeaveGrantRef.current = grant;
			window.setTimeout(() => {
				if (cloudSandboxDirtyLeaveGrantRef.current === grant) cloudSandboxDirtyLeaveGrantRef.current = void 0;
			}, 0);
		};
		const onArtifactSelect = (0, import_react.useCallback)((artifactId) => {
			if (!artifactId) {
				hideActiveMcpAppPanel?.();
				contextOnArtifactSelect?.(void 0);
				return;
			}
			if (artifactId === designNewCanvasArtifactId) {
				openDesignCanvas();
				return;
			}
			const destArtifact = artifactId ? artifacts.find((item) => item.id === artifactId) : void 0;
			const destPath = destArtifact ? getArtifactFilePath(destArtifact) : void 0;
			const localSdkPath = artifactId !== selectedArtifactId ? getArtifactLocalSdkOpenPath(artifactId) : void 0;
			const continueSelect = () => {
				if (artifactId !== selectedArtifactId) {
					const guard = context?.clearDocumentSelectionBeforeTabSwitch;
					if (guard) {
						guard(localSdkPath).then((allowed) => {
							if (allowed) performArtifactSelectCore(artifactId);
						}).catch(() => {
							performArtifactSelectCore(artifactId);
						});
						return;
					}
				}
				performArtifactSelectCore(artifactId);
			};
			confirmLeaveDirtyCloudSandbox(destPath ?? localSdkPath).then((allowed) => {
				if (allowed) continueSelect();
			}).catch(() => void 0);
		}, [
			artifacts,
			context,
			selectedArtifactId,
			designNewCanvasArtifactId,
			openDesignCanvas,
			performArtifactSelectCore,
			getArtifactLocalSdkOpenPath,
			hideActiveMcpAppPanel,
			contextOnArtifactSelect
		]);
		/**
		* 概览面板「应用」条目右侧云图标点击：打开应用空间并直接进入云服务页签。
		*
		* 复用 openArtifact 的统一打开入口（对 wb/app 会递增 appSpaceOpenRevision
		* 触发应用空间重挂载），并通过 initialAppSpaceTab 让重挂载后的应用空间
		* 初始就停在 cloudService 页签，而不是默认的 preview。
		*/
		const handleAppCloudServiceSelect = (0, import_react.useCallback)((artifactId) => {
			context?.openArtifact?.("artifacts", {
				artifactId,
				initialAppSpaceTab: "cloudService"
			});
		}, [context]);
		const handleFileSelect = (0, import_react.useCallback)((filePath) => {
			if (!filePath) {
				onFileSelect?.(void 0);
				return;
			}
			hideActiveMcpAppPanel?.();
			if (filePath === selectedFilePath) {
				onFileSelect?.(filePath);
				return;
			}
			const continueSelect = () => {
				const guard = context?.clearDocumentSelectionBeforeTabSwitch;
				if (guard) {
					guard(filePath).then((allowed) => {
						if (allowed) onFileSelect?.(filePath);
					}).catch(() => {
						onFileSelect?.(filePath);
					});
					return;
				}
				onFileSelect?.(filePath);
			};
			confirmLeaveDirtyCloudSandbox(filePath).then((allowed) => {
				if (allowed) continueSelect();
			}).catch(() => void 0);
		}, [
			context,
			hideActiveMcpAppPanel,
			onFileSelect,
			selectedFilePath
		]);
		(0, import_react.useEffect)(() => {
			if (sidebarView !== "preview") inHtmlPreviewRef.current = null;
		}, [sidebarView]);
		(0, import_react.useEffect)(() => {
			const isHtmlUrl = typeof browserUrl === "string" && (browserUrl.startsWith("file://") || browserUrl.endsWith(".html"));
			if (sidebarView === "preview" && browserUrl && isHtmlUrl && !forceCloudEnvironment && !context?.writeSandboxFile) {
				const matched = artifacts.find((a) => getHtmlArtifactPreviewUrl(a) === browserUrl);
				wrappedHtmlExpo({
					url: browserUrl,
					title: matched?.title
				});
			}
		}, [
			sidebarView,
			browserUrl,
			wrappedHtmlExpo,
			artifacts,
			forceCloudEnvironment,
			context?.writeSandboxFile,
			getHtmlArtifactPreviewUrl
		]);
		/**
		* iframe 侧处理完"关闭请求"后的回调，resolve 对应 requestId 的 pending promise。
		* result.closed 为 true 表示 iframe 已完成关闭，false 表示用户取消或失败。
		*/
		const handleDocumentPreviewCloseResult = (0, import_react.useCallback)((result) => {
			const closeRequest = documentPreviewCloseRequest?.requestId === result.requestId ? documentPreviewCloseRequest : void 0;
			if (result.closed && closeRequest) {
				const latestSelectedFilePath = selectedFilePathRef.current;
				const normalizedClosedPath = normalizeMainWindowLocalFilePath(closeRequest.filePath);
				const normalizedSelectedPath = latestSelectedFilePath ? normalizeMainWindowLocalFilePath(latestSelectedFilePath) : void 0;
				const closeRequestSessionId = closeRequest.sessionId || void 0;
				const currentSessionId = currentConversationIdRef.current ?? sessionId;
				if ((!closeRequestSessionId || !currentSessionId || closeRequestSessionId === currentSessionId) && normalizedSelectedPath && normalizedClosedPath === normalizedSelectedPath) onFileSelect?.(void 0);
			}
			setDocumentPreviewCloseRequest((current) => current?.requestId === result.requestId ? void 0 : current);
			const pending = pendingDocumentPreviewCloseResolversRef.current.get(result.requestId);
			if (!pending) return;
			pendingDocumentPreviewCloseResolversRef.current.delete(result.requestId);
			clearTimeout(pending.timeoutId);
			pending.resolve(result.closed);
		}, [
			currentConversationIdRef,
			documentPreviewCloseRequest,
			onFileSelect,
			selectedFilePathRef,
			sessionId
		]);
		const requestDocumentPreviewClose = (0, import_react.useCallback)(async (sessionId, filePath) => {
			const normalizedFilePath = normalizeMainWindowLocalFilePath(filePath);
			const checkFileExists = adapterRef.current?.checkFileExists;
			if (normalizedFilePath && checkFileExists) {
				if (!await checkFileExists(normalizedFilePath).catch(() => true)) return true;
			}
			documentPreviewCloseRequestSeqRef.current += 1;
			const requestId = documentPreviewCloseRequestSeqRef.current;
			return new Promise((resolve) => {
				const timeoutId = setTimeout(() => {
					pendingDocumentPreviewCloseResolversRef.current.delete(requestId);
					setDocumentPreviewCloseRequest((current) => current?.requestId === requestId ? void 0 : current);
					console.warn("[DetailPanelWrapper] closeRequest:tab-close timeout", {
						filePath,
						requestId
					});
					resolve(false);
				}, 3e4);
				pendingDocumentPreviewCloseResolversRef.current.set(requestId, {
					resolve,
					timeoutId
				});
				setDocumentPreviewCloseRequest({
					requestId,
					sessionId: sessionId ?? "",
					filePath
				});
			});
		}, []);
		const requestDocumentTabCloseForTarget = (0, import_react.useCallback)(async (target) => {
			const closeRequest = resolveDetailPanelDocumentTabClose({
				target,
				sources: artifacts,
				currentSessionId: currentConversationIdRef.current ?? sessionId
			});
			if (!closeRequest.filePath) return true;
			return requestDocumentPreviewClose(closeRequest.sessionId, closeRequest.filePath);
		}, [
			artifacts,
			requestDocumentPreviewClose,
			sessionId
		]);
		const confirmDetailTabActivation = (0, import_react.useCallback)(async (target) => confirmDetailPanelTabActivation({
			target,
			beforeSelectFilePath: beforeSelectFilePathRef.current,
			clearDocumentSelectionBeforeTabSwitch: context?.clearDocumentSelectionBeforeTabSwitch,
			onBeforeSelectFilePathError: (error, filePath) => {
				console.warn("[DetailPanelWrapper] file tab pre-select gate failed", {
					filePath,
					error: error instanceof Error ? error.message : String(error)
				});
			}
		}), [context]);
		/**
		* 统一 tab 生命周期 gate 的「按种类解析目标文档」单一真源。
		*
		* 切换（{@link handleBeforeUnifiedTabActivate}）与关闭
		* （{@link handleBeforeUnifiedTabClose}）两个对称 gate 共用这套解析，避免同一份
		* by-kind 分派逻辑在「切换侧（宿主）」与「关闭侧（SidebarNext）」各写一遍：
		*
		* - `selectionDocument`：选区清理确认用的「目标文档标识」（在线 url / 文件路径 /
		*   产物的 SDK 本地路径）。
		* - `artifactId` / `closeFilePath`：保存后关闭用的产物 id 与源文件路径
		*   （`artifact.url`）。
		*/
		const resolveUnifiedTabTarget = (0, import_react.useCallback)((tab) => resolveDetailPanelDocumentTabTarget({
			tab,
			sources: artifacts,
			getArtifactLocalSdkOpenPath
		}), [artifacts, getArtifactLocalSdkOpenPath]);
		/**
		* 统一 tab 生命周期 gate ——「切换」侧（SidebarNext 顶部统一 tab 条点击切换前）。
		*
		* 经 {@link resolveUnifiedTabTarget} 解析「目标文档标识」，在切换视图 + selection
		* 之前整体确认是否清空 chat 输入框里指向其他文档的选区 chip：用户点「取消」→
		* 返回 false → useUnifiedTabs 不会激活该 tab（视图与 selection 都保持原状）；
		* 点「确认」→ 弹窗侧清空选区并返回 true → 正常切换。
		*
		* 统一流程：
		* 1. 先从 tab 解析目标；
		* 2. 云沙箱脏文档切走先走 {@link cloudSandboxDirtyCloseGateRef}（leave 模式），
		*    与关闭侧同一套「保存 / 不保存 / 取消」；点取消则不切换。
		* 3. 若目标的默认动作是写 fileTree selection，则复用 DetailPanel 注册出的
		*    `beforeSelectFilePath` 组合 gate。该 gate 放行时已经完成内部 TabsContext commit；
		* 4. 否则只做选区清理确认，后续由目标自己的落地入口处理打开前预检。
		*/
		const handleBeforeUnifiedTabActivate = (0, import_react.useCallback)(async (tab) => {
			const target = resolveUnifiedTabTarget(tab);
			if (!await cloudSandboxDirtyCloseGateRef.current(target, "leave")) return false;
			markCloudSandboxDirtyLeaveGranted();
			return confirmDetailTabActivation(target);
		}, [confirmDetailTabActivation, resolveUnifiedTabTarget]);
		/**
		* 统一 tab 生命周期 gate ——「关闭」侧，与 {@link handleBeforeUnifiedTabActivate}
		* 对称。
		*
		* 经 {@link resolveUnifiedTabTarget} 解析出目标产物 / 源文件，SDK 文档走
		* 「保存后关闭」确认（dirty → closeIntent，等待 iframe 释放）。在线预览 / MCP App
		* 等无需保存的 tab 直接放行。返回 false 阻止关闭（tab 保持），true 才真正关闭。
		*
		* 云端沙箱额外走 {@link cloudSandboxDirtyCloseGateRef}：本地 keep-alive 的
		* releaseWithSaveDialog 对云文档无效（无 documentResourceUri），否则脏关闭会静默丢改。
		*/
		const handleBeforeUnifiedTabClose = (0, import_react.useCallback)(async (tab) => {
			if ((tab.kind === "artifact" || tab.kind === "fileChange" || tab.kind === "file") && (tab.kind === "file" || tab.artifactId)) {
				const target = resolveUnifiedTabTarget(tab);
				if (!await cloudSandboxDirtyCloseGateRef.current(target, "close")) return false;
				if (documentPreviewSource === "colleague-assistant") {
					if (tab.kind === "file") context?.onFileSelect?.("");
					else if (tab.artifactId && tab.artifactId === selectedArtifactId) contextOnArtifactSelect?.(void 0);
					return true;
				}
				return await requestDocumentTabCloseForTarget(target) !== false;
			}
			if (documentPreviewSource === "colleague-assistant") {
				if (tab.kind === "file") context?.onFileSelect?.("");
				else if (tab.artifactId && tab.artifactId === selectedArtifactId) contextOnArtifactSelect?.(void 0);
				return true;
			}
			return true;
		}, [
			context?.onFileSelect,
			contextOnArtifactSelect,
			documentPreviewSource,
			requestDocumentTabCloseForTarget,
			resolveUnifiedTabTarget,
			selectedArtifactId
		]);
		const handleBrowserUrlChange = (0, import_react.useCallback)((url) => {
			if (!url) {
				setBrowserUrlFromContext?.(url);
				return;
			}
			if (isSameTencentDocsPreviewTarget(browserUrl, url, effectiveEdition)) {
				setBrowserUrlFromContext?.(url);
				return;
			}
			const continueChange = () => {
				const guard = context?.clearDocumentSelectionBeforeTabSwitch;
				if (guard) {
					guard(url).then((allowed) => {
						if (allowed) setBrowserUrlFromContext?.(url);
					}).catch(() => {
						setBrowserUrlFromContext?.(url);
					});
					return;
				}
				setBrowserUrlFromContext?.(url);
			};
			confirmLeaveDirtyCloudSandbox(url).then((allowed) => {
				if (allowed) continueChange();
			}).catch(() => void 0);
		}, [
			browserUrl,
			context,
			effectiveEdition,
			setBrowserUrlFromContext
		]);
		/**
		* 从产物列表移除指定 artifact（本地文件不存在时的兜底清理）。
		* DetailPanel 内部已通过 checkFileExists 校验并 toast 提示，这里只做数据清理。
		*/
		const handleRemoveArtifact = (0, import_react.useCallback)((artifactId) => {
			context?.removeArtifact?.(artifactId);
		}, [context?.removeArtifact]);
		const handleArtifactTabClose = (0, import_react.useCallback)((artifactId) => {
			const artifact = rawArtifactsRef.current.find((item) => item.id === artifactId);
			const url = artifact && "url" in artifact ? artifact.url : void 0;
			if (isLocalFilePreviewId(artifactId) && typeof url === "string" && url.startsWith("blob:")) context?.removeArtifact?.(artifactId);
		}, [context?.removeArtifact, rawArtifactsRef]);
		/**
		* 定期清理过期的缓存条目
		* 缓存策略说明：
		* - 主要的缓存失效检查在 handleReadFile 中通过 versionId 比对完成
		* - 这里只做时间维度的清理，防止内存泄漏
		* - 超过 5 分钟未访问的缓存条目会被清理
		*/
		(0, import_react.useEffect)(() => {
			const cache = diffCacheRef.current;
			if (cache.size === 0) return;
			const keysToDelete = [];
			const MAX_CACHE_AGE = 3e5;
			const now = Date.now();
			cache.forEach((entry, uri) => {
				if (now - entry.timestamp > MAX_CACHE_AGE) keysToDelete.push(uri);
			});
			if (keysToDelete.length > 0) keysToDelete.forEach((key) => cache.delete(key));
		}, [artifacts]);
		const handleBuild = (0, import_react.useCallback)(async (data) => {
			const conversationId = data.plan?.sessionId;
			if (!adapter || !conversationId) {
				console.warn("[DetailPanelWrapper] Cannot send build message: adapter or conversation not available", !!adapter, conversationId);
				return;
			}
			const planData = data.plan ? {
				id: data.plan.id,
				title: data.plan.title,
				content: "content" in data.plan ? data.plan.content : void 0
			} : null;
			const tasksData = data.tasks.map((t) => ({
				id: t.id,
				status: t.status,
				title: t.title
			}));
			const taskArtifact = artifacts.find((a) => a.type === "task" && "uri" in a);
			const planJsonPath = (taskArtifact && "uri" in taskArtifact ? taskArtifact.uri : void 0) || `.codebuddy/plans/${conversationId}/plan.json`;
			try {
				const readResult = await adapter.readFile(conversationId, planJsonPath);
				if (readResult.success && readResult.content) {
					const planJson = JSON.parse(readResult.content);
					planJson.todolist = data.tasks.map((t) => ({
						id: t.id,
						content: t.title,
						dependencies: [],
						status: t.status === "completed" ? "done" : t.status === "in-progress" ? "in-progress" : "pending"
					}));
					const writeResult = await adapter.writeFile(conversationId, planJsonPath, JSON.stringify(planJson, null, 2));
					if (!writeResult.success) console.error("[DetailPanelWrapper] Failed to save tasks to plan.json:", writeResult.error);
				} else console.warn("[DetailPanelWrapper] Could not read plan.json:", readResult.error);
			} catch (error) {
				console.error("[DetailPanelWrapper] Error updating plan.json:", error);
			}
			adapter.buildPlan({
				sessionId: conversationId,
				plan: planData,
				tasks: tasksData
			});
		}, [
			adapter,
			getCurrentConversationId,
			artifacts
		]);
		/**
		* 将 UI Task 状态映射为 todolist 状态
		*/
		const mapTaskStatusToTodoStatus = (status) => {
			switch (status) {
				case "completed": return "completed";
				case "in-progress": return "in_progress";
				case "waiting": return "pending";
				case "error": return "cancelled";
				default: return "pending";
			}
		};
		const handleArtifactChange = (0, import_react.useCallback)((artifact) => {
			const conversationId = artifact.sessionId;
			if (artifact.type === "file-changes" && artifact.fileChangeInfo?.cachedContent) {
				context?.updateArtifact(artifact);
				return;
			}
			if (!adapter || !conversationId) {
				console.warn(`[DetailPanelWrapper] Cannot save artifact: adapter or conversation not available, adapter: ${!!adapter}, conversationId: ${artifact.sessionId}`);
				return;
			}
			if (artifact.type === "implementation-plan" && artifact.uri) {
				const planContent = artifact.content || "";
				const planPath = artifact.uri;
				adapter.writeFile(conversationId, planPath, planContent).then((result) => {
					if (!result.success) console.error("[DetailPanelWrapper] Failed to save plan:", result.error);
				}).catch((error) => {
					console.error("[DetailPanelWrapper] Error saving plan:", error);
				});
				return;
			}
			if (artifact.type === "task" && artifact.uri) {
				const tasks = artifact.todolist || [];
				const planJsonPath = artifact.uri;
				(async () => {
					try {
						const readResult = await adapter.readFile(conversationId, planJsonPath);
						if (readResult.success && readResult.content) {
							const planJson = JSON.parse(readResult.content);
							planJson.todolist = tasks.map((t) => ({
								id: t.id,
								content: t.title,
								dependencies: [],
								status: mapTaskStatusToTodoStatus(t.status)
							}));
							const writeResult = await adapter.writeFile(conversationId, planJsonPath, JSON.stringify(planJson, null, 2));
							if (!writeResult.success) console.error("[DetailPanelWrapper] Failed to auto-save tasks:", writeResult.error);
						} else console.warn("[DetailPanelWrapper] Could not read plan.json for auto-save:", readResult.error);
					} catch (error) {
						console.error("[DetailPanelWrapper] Error auto-saving tasks:", error);
					}
				})();
				return;
			}
		}, [
			adapter,
			getCurrentConversationId,
			context?.updateArtifact
		]);
		/**
		* 根据 URI 更新对应 artifact 的缓存内容
		* 用于解决竞态条件：当 A 的响应返回时，即使当前显示的是 B，也能正确更新 A 的缓存
		*/
		const handleArtifactCacheUpdate = (0, import_react.useCallback)((uri, cachedContent) => {
			if (!uri || !cachedContent || !context?.updateArtifact) return;
			const artifactToUpdate = artifacts.find((item) => {
				if (item.type === "file-changes" && item.fileChangeInfo?.uri === uri) return !item.fileChangeInfo.cachedContent;
				if (item.type === "custom-artifact" && item.uri === uri) return !item.content;
				return false;
			});
			if (!artifactToUpdate) return;
			if (artifactToUpdate.type === "file-changes" && artifactToUpdate.fileChangeInfo) context.updateArtifact({
				...artifactToUpdate,
				fileChangeInfo: {
					...artifactToUpdate.fileChangeInfo,
					cachedContent
				}
			});
			else if (artifactToUpdate.type === "custom-artifact") context.updateArtifact({
				...artifactToUpdate,
				content: cachedContent
			});
		}, [artifacts, context?.updateArtifact]);
		const handleArtifactDownload = (0, import_react.useCallback)((artifact) => {
			const artifactName = artifact.title || (artifact.type === "media-artifact" ? artifact.url : "") || "unknown";
			const fileType = getFileExtension(artifactName);
			reportEvent(Events.ArtifactDownloadClicked, {
				file_type: fileType,
				artifact_name: artifactName
			});
		}, [
			reportEvent,
			Events,
			getFileExtension
		]);
		/**
		* 从 artifact 中提取文件路径，调用 openFolder 在文件管理器中定位到文件并高亮
		*/
		const handleOpenFolder = (0, import_react.useCallback)((artifact) => {
			const filePath = getArtifactRelativePath(artifact);
			if (!filePath) {
				console.warn("[DetailPanelWrapper] Cannot open folder: artifact has no path");
				return;
			}
			if (!adapter.openFolder) {
				console.warn("[DetailPanelWrapper] openFolder not supported by adapter");
				return;
			}
			adapter.openFolder(filePath).catch((error) => {
				console.error("[DetailPanelWrapper] openFolder failed:", error);
			});
		}, [adapter]);
		/**
		* 按裸文件路径调 openFolder（fileTree / OversizedPlaceholder 占位 UI 用）。
		* cnb#54643：fileTree 这条线没有 ArtifactItem 概念，需要一个直接收 filePath
		* 的版本。底层和 handleOpenFolder 共享同一个 desktop 能力。
		*
		* 失败处理：抛出异常让上层（OversizedPlaceholder）感知并 toast。这一点跟
		* 原有 handleOpenFolder（artifact 版本）的"静默 catch"不同 — 占位卡片的
		* 「在文件夹中显示」是用户能看见的主操作按钮，静默失败会让用户摸不着头脑。
		*/
		const handleOpenFolderByPath = (0, import_react.useCallback)(async (filePath) => {
			if (!filePath) return;
			if (!adapter.openFolder) throw new Error("openFolder not supported by adapter");
			await adapter.openFolder(filePath);
		}, [adapter]);
		const resolveExternalUrl = (0, import_react.useCallback)((url) => {
			if (!url.startsWith("agent://files/")) return url;
			const workspacePath = context?.currentConversation?.cwd;
			if (!workspacePath) return url;
			try {
				const relativePath = extractRelativePath(url);
				const normalizedWorkspacePath = workspacePath.replace(/\\/g, "/");
				const workspaceUrl = normalizedWorkspacePath.startsWith("file://") ? normalizedWorkspacePath : `file://${normalizedWorkspacePath.startsWith("/") ? "" : "/"}${normalizedWorkspacePath}`;
				const baseUrl = workspaceUrl.endsWith("/") ? workspaceUrl : `${workspaceUrl}/`;
				return new URL(relativePath, baseUrl).toString();
			} catch (error) {
				console.warn("[DetailPanelWrapper] Failed to resolve external URL:", error);
				return url;
			}
		}, [context?.currentConversation?.cwd]);
		const resolveToolFilePath = (0, import_react.useCallback)((filePath) => {
			if (filePath.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(filePath) || /^[a-zA-Z]+:\/\//.test(filePath)) return filePath;
			const cwd = context?.currentConversation?.cwd;
			if (cwd) return `${cwd.replace(/\/$/, "")}/${filePath}`;
			return filePath;
		}, [context?.currentConversation?.cwd]);
		const handleToolFileClick = (0, import_react.useCallback)((filePath) => {
			context?.openArtifact?.("artifacts", { filePath: resolveToolFilePath(filePath) });
		}, [context, resolveToolFilePath]);
		const openTencentDocsPreview = (0, import_react.useCallback)((url) => {
			focusOrOpenTencentDocsPreview({
				currentUrl: browserUrl,
				nextUrl: url,
				edition: effectiveEdition,
				sidebarView,
				openArtifact: context?.openArtifact
			});
		}, [
			browserUrl,
			context,
			effectiveEdition,
			sidebarView
		]);
		const { handleTencentDocsLink } = useTencentDocsLinkHandler({
			adapter,
			openPreview: openTencentDocsPreview,
			previewSource: documentPreviewSource,
			sessionIdProvider: (0, import_react.useCallback)(() => currentConversationIdRef.current, [currentConversationIdRef])
		});
		const handleToolPreviewUrlClick = (0, import_react.useCallback)((url) => {
			if (tryFocusExistingTencentDocsPreview({
				currentUrl: browserUrl,
				nextUrl: url,
				edition: effectiveEdition,
				sidebarView,
				openArtifact: context?.openArtifact
			})) return;
			if (handleTencentDocsLink(url)) return;
			context?.openArtifact?.("preview", { url });
		}, [
			browserUrl,
			context,
			effectiveEdition,
			sidebarView,
			handleTencentDocsLink
		]);
		const handleTencentDocsLinkForOpenExternal = (0, import_react.useCallback)((url) => {
			if (shouldBypassTencentDocsLinkInterceptForOpenExternal({
				sidebarView,
				currentPreviewUrl: browserUrl,
				targetUrl: url,
				edition: effectiveEdition
			})) return false;
			return handleTencentDocsLink(url);
		}, [
			sidebarView,
			browserUrl,
			effectiveEdition,
			handleTencentDocsLink
		]);
		const handleOpenExternal = (0, import_react.useCallback)((url) => {
			if (handleTencentDocsLinkForOpenExternal(url)) return;
			const resolvedUrl = resolveExternalUrl(url);
			adapter?.openExternal?.(resolvedUrl).catch((error) => {
				console.error("[DetailPanelWrapper] openExternal failed, falling back to window.open:", error);
				window.open(resolvedUrl, "_blank", "noopener,noreferrer");
			});
		}, [
			adapter,
			handleTencentDocsLinkForOpenExternal,
			resolveExternalUrl
		]);
		const buildKnowledgeUploadInfo = (0, import_react.useCallback)(async (sessionId, filePath, fileBlob) => {
			if (!adapter) return null;
			const readFileAsync = (fp, format = "text") => format === "blob" ? adapter.readFile(sessionId, fp, "blob") : adapter.readFile(sessionId, fp, "text");
			const listHtmlFiles = async (dirPath) => {
				if (adapter?.readDirByPath) try {
					const result = await adapter.readDirByPath(dirPath, 1);
					if (result.success && result.entries) return result.entries.filter((e) => e.isFile && /\.(?:html?)$/i.test(e.name)).map((e) => e.path);
				} catch {}
				if (adapter?.listDirectory) try {
					return (await adapter.listDirectory(sessionId, dirPath, 1)).filter((n) => n.type === "file" && /\.(?:html?)$/i.test(n.name)).map((n) => n.path);
				} catch {}
				return [];
			};
			return buildHtmlUpload(readFileAsync, filePath, fileBlob, listHtmlFiles);
		}, [adapter]);
		const handleQueryPublishStatus = (0, import_react.useCallback)(async (filePath) => {
			const sessionId = context?.currentConversation?.id;
			if (!sessionId) return null;
			const cache = getPublishCache(sessionId, filePath);
			if (!cache) return null;
			const backend = adapter?.getBackendProvider?.();
			if (cache.nodeId && backend?.getNodeInfo) try {
				const nodeInfo = await backend.getNodeInfo({ nodeId: cache.nodeId });
				if (nodeInfo && nodeInfo.exists === false) {
					console.warn("[DetailPanelWrapper] handleQueryPublishStatus: cached node no longer exists, drop cache and hide button:", cache.nodeId);
					removePublishCache(sessionId, filePath, cache.bundleHtmlPaths);
					window.dispatchEvent(new CustomEvent("workbuddy:publish-cache-refreshed"));
					return null;
				}
			} catch (error) {
				console.warn("[DetailPanelWrapper] handleQueryPublishStatus: getNodeInfo probe failed, keep cache:", error);
			}
			const ext = filePath.toLowerCase().split(".").pop() ?? "";
			const openUrl = ext === "html" || ext === "htm" ? cache.publishUrl || cache.url : cache.url || cache.publishUrl;
			const publishEntryPath = cache.entryFilePath ?? filePath;
			try {
				const result = await adapter?.readFile(sessionId, publishEntryPath, "blob");
				if (!result?.success || !result.content) return null;
				const uploadInfo = await buildKnowledgeUploadInfo(sessionId, publishEntryPath, result.content);
				if (!uploadInfo) return null;
				const baseline = isMarkdownPath(publishEntryPath) ? getPublishedLocalHash(cache) : cache.contentHash;
				return {
					synced: uploadInfo.contentHash === baseline,
					publishUrl: openUrl
				};
			} catch {
				return {
					synced: true,
					publishUrl: openUrl
				};
			}
		}, [
			context?.currentConversation?.id,
			adapter,
			buildKnowledgeUploadInfo
		]);
		const handleSyncPublish = (0, import_react.useCallback)(async (filePath) => {
			const sessionId = context?.currentConversation?.id;
			if (!sessionId) return;
			const __e2e = createShareClientTrace("sync_publish", filePath);
			const ext = filePath.toLowerCase().split(".").pop() ?? "";
			const isHtml = ext === "html" || ext === "htm";
			const backend = adapter?.getBackendProvider?.();
			if (!backend?.uploadToKnowledge) {
				console.warn("[DetailPanelWrapper] uploadToKnowledge not available");
				__e2e.end("failed", void 0, "backend uploadToKnowledge not available");
				return;
			}
			if (isHtml && !backend?.publishPage) {
				console.warn("[DetailPanelWrapper] publishPage not available");
				__e2e.end("failed", void 0, "backend publishPage not available");
				return;
			}
			let cache = getPublishCache(sessionId, filePath);
			const publishEntryPath = cache?.entryFilePath ?? filePath;
			if (cache?.nodeId && backend.getNodeInfo) {
				const __nodeTimer = createShareClientStageTimer("check_node", "artifact", filePath);
				try {
					const nodeInfo = await backend.getNodeInfo({ nodeId: cache.nodeId });
					__nodeTimer.end(nodeInfo ? "success" : "failed", nodeInfo ? void 0 : "empty response");
					if (nodeInfo && nodeInfo.exists === false) {
						console.warn("[DetailPanelWrapper] cached knowledge node no longer exists, drop cache and re-create:", cache.nodeId);
						removePublishCache(sessionId, filePath, cache.bundleHtmlPaths);
						cache = null;
					}
				} catch (error) {
					__nodeTimer.end("failed", error instanceof Error ? error.message : String(error));
					console.warn("[DetailPanelWrapper] getNodeInfo probe failed, keep cache:", error);
				}
			}
			const __readTimer = createShareClientStageTimer("read_file", "artifact", publishEntryPath);
			const result = await adapter?.readFile(sessionId, publishEntryPath, "blob");
			__readTimer.end(result?.success && result.content ? "success" : "failed", result?.success ? void 0 : "readFile failed");
			if (!result?.success || !result.content) {
				__e2e.end("failed", "read_file", "readFile failed");
				return;
			}
			const __buildTimer = createShareClientStageTimer("build_html", "artifact", publishEntryPath);
			const uploadInfo = await buildKnowledgeUploadInfo(sessionId, publishEntryPath, result.content);
			__buildTimer.end(uploadInfo ? "success" : "failed", uploadInfo ? void 0 : "buildHtmlUpload returned null");
			if (!uploadInfo) {
				__e2e.end("failed", "build_html", "buildHtmlUpload returned null");
				return;
			}
			let uploadBlob = uploadInfo.blob;
			if (isMarkdownPath(publishEntryPath)) {
				const __mdTimer = createShareClientStageTimer("preprocess_markdown", "artifact", publishEntryPath);
				const processed = await preprocessMarkdownImagesWithBackend({
					markdownFilePath: publishEntryPath,
					markdownBlob: uploadInfo.blob,
					backend,
					readImageBlob: async (p) => {
						const r = await adapter?.readFile(sessionId, p, "blob");
						return r?.success && r.content ? r.content : null;
					},
					onWarn: (m) => console.warn("[DetailPanelWrapper]", m)
				});
				uploadBlob = processed.blob;
				__mdTimer.end(processed.blob ? "success" : "failed", processed.blob ? void 0 : "preprocess returned null");
			}
			const accountId = account?.uid;
			const publishPage = backend.publishPage;
			const options = {
				taskId: sessionId,
				taskName: context?.currentConversation?.title,
				owner: accountId,
				ownerType: sessionId ? 1 : 0,
				nodeBlockId: cache?.nodeId
			};
			const __uploadTimer = createShareClientStageTimer("upload_knowledge", "artifact", filePath);
			const res = await backend.uploadToKnowledge(uploadBlob, uploadInfo.fileName, options);
			__uploadTimer.end(res && "url" in res ? "success" : "failed", res && "url" in res ? void 0 : res?.failedStage, res && "url" in res ? void 0 : {
				failed_stage: res?.failedStage ?? "",
				error_code: String(res?.errorCode ?? ""),
				is_overwrite: Boolean(options.nodeBlockId)
			});
			if (!res || !("nodeId" in res)) {
				if (options.nodeBlockId) {
					console.warn("[DetailPanelWrapper] overwrite upload failed with cached nodeId, drop cache to break loop:", options.nodeBlockId);
					removePublishCache(sessionId, filePath, cache?.bundleHtmlPaths);
				}
				const feedback = reportKnowledgeUploadFailure(res && "failedStage" in res ? res : null, "library", uploadFeedbackHost, uploadInfo.fileName);
				__e2e.end("failed", "upload_knowledge", `${feedback.semanticError}${feedback.errorCode ? `(code=${feedback.errorCode})` : ""}`);
				return;
			}
			let publishUrl;
			if (isHtml && publishPage) publishUrl = (await publishPage({ fileId: res.nodeId }))?.publishUrl || res.publishUrl || res.url;
			else publishUrl = res.url;
			if (publishUrl) {
				const isMd = isMarkdownPath(publishEntryPath);
				const uploadedContentHash = isMd ? await computeBlobHash(uploadBlob) : uploadInfo.contentHash;
				savePublishCache(sessionId, publishEntryPath, {
					nodeId: res.nodeId,
					publishUrl,
					url: res.url,
					contentHash: uploadedContentHash,
					lastUploadedLocalHash: isMd ? uploadInfo.contentHash : void 0,
					entryFilePath: uploadInfo.entryFilePath ?? publishEntryPath,
					bundleHtmlPaths: uploadInfo.bundleHtmlPaths
				}, uploadInfo.bundleHtmlPaths);
				setPublishRefreshCount((c) => c + 1);
				openLibraryOnlineTabRef.current?.(res.url ?? publishUrl);
				__e2e.end("success");
			} else __e2e.end("failed", "upload_knowledge", "publishUrl is empty");
		}, [
			context?.currentConversation?.id,
			context?.currentConversation?.title,
			adapter,
			account,
			buildKnowledgeUploadInfo,
			uploadFeedbackHost,
			t
		]);
		const handleViewPublishUrl = (0, import_react.useCallback)((filePath) => {
			const sessionId = context?.currentConversation?.id;
			const cache = getPublishCache(sessionId, filePath);
			const url = cache?.url || cache?.publishUrl;
			if (url) {
				if (onOpenInternalBrowser) openPublishedArtifactInInternalBrowser(url, onOpenInternalBrowser);
				else handleOpenExternal(url);
			}
		}, [
			context?.currentConversation?.id,
			handleOpenExternal,
			onOpenInternalBrowser
		]);
		const agentMemberDefaultToolRenderer = (0, import_react.useCallback)(({ content, message, isSessionActive }) => {
			if (content.type !== "tool-call" || !("tool" in content)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanelCachedToolRenderer, {
				tool: content.tool,
				adapter: adapter ?? void 0,
				sessionId: context?.currentConversation?.id,
				onFileClick: handleToolFileClick,
				onPreviewUrlClick: handleToolPreviewUrlClick,
				compact: isCompactMode
			});
		}, [
			adapter,
			context?.currentConversation?.id,
			handleToolFileClick,
			handleToolPreviewUrlClick,
			isCompactMode
		]);
		const agentMemberMessageConfig = (0, import_react.useMemo)(() => ({
			assistantDisplay,
			defaultToolRenderer: agentMemberDefaultToolRenderer,
			getToolIconByName: getToolIcon,
			enableMetaFold: isCompactMode
		}), [
			assistantDisplay,
			agentMemberDefaultToolRenderer,
			isCompactMode
		]);
		/**
		* Step B：成员详情面板内联工具授权决策回调。
		*
		* 把 cb-chat-ui ToolApprovalMenu 提供的细粒度 optionId（allow/allowAll/
		* deny/reject_always 等）映射到 adapter.resolveFloatingPermission 的
		* 二值 decision —— 'allow' 系映射到 'allow'，'deny'/'reject' 系映射到
		* 'deny'。更细粒度的"始终允许/始终拒绝"信息会丢失，但这是当前 broadcast
		* 通道的契约（per project_resolve_interruption_full_chain.md）；后续若需
		* 区分需扩展 _codebuddy.ai/resolveInterruption RPC 协议。
		*
		* cloud-agent 等不暴露 resolveFloatingPermission 的产品保持 undefined：
		* AgentMemberViewer 检测 onPermissionResolve 缺失时不渲染按钮。
		*/
		const handleAgentMemberPermissionResolve = (0, import_react.useMemo)(() => {
			if (!adapter?.resolveFloatingPermission) return;
			return ({ sessionId, toolCallId, optionId }) => {
				const decision = optionId === "allow" || optionId === "allow_once" || optionId === "allowAll" || optionId === "allow_always" ? "allow" : "deny";
				adapter.resolveFloatingPermission(sessionId, toolCallId, decision).catch((err) => {
					console.warn("[DetailPanelWrapper] resolveFloatingPermission failed:", err);
				});
			};
		}, [adapter]);
		const handleGetDocumentPreviewUrl = (0, import_react.useCallback)(async (filePath, options) => {
			const currentLocalDocs = localDocsRef.current;
			const currentAdapter = adapterRef.current;
			if (!currentLocalDocs?.getPreviewUrl) return {
				success: false,
				error: "Not supported"
			};
			await ensureOrphanPreviewReconcile(currentLocalDocs, (event, payload) => currentAdapter?.reportTelemetry?.(event, payload));
			try {
				const ext = extractFileExtension(filePath);
				currentAdapter?.reportTelemetry?.("web_element_click", {
					elementId: "preview_tdoc_trigger",
					elementName: "触发腾讯文档预览",
					pageName: "file_preview",
					source: resolveDocArtifactSource(ext),
					type: ext,
					mode: "local"
				});
			} catch (error) {
				console.warn("[DetailPanelWrapper] reportTelemetry preview_tdoc_trigger failed:", error);
			}
			const selectedArtifactId = selectedArtifactIdRef.current;
			const selectedArtifact = selectedArtifactId ? rawArtifactsRef.current.find((item) => item.id === selectedArtifactId) : void 0;
			const selectedArtifactUrl = selectedArtifact && "url" in selectedArtifact ? selectedArtifact.url || "" : "";
			let previewSessionSource = "artifact-selected";
			if (selectedArtifactUrl && selectedArtifactUrl === filePath) previewSessionSource = "artifact-selected";
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSessionSource,
				currentSessionId: options?.sessionId || currentConversationIdRef.current
			});
			return currentLocalDocs.getPreviewUrl(filePath, {
				...sessionId ? { sessionId } : {},
				...options?.consumer ? { consumer: options.consumer } : {}
			});
		}, [
			adapterRef,
			currentConversationIdRef,
			localDocsRef,
			rawArtifactsRef,
			selectedArtifactIdRef
		]);
		const { getPreviewUrl: handleGetCloudSandboxPreviewUrl, resolveSandboxOrigin: resolveCloudSandboxOrigin, disposeRegistrations } = useCloudSandboxPreviewRegistration({
			getAsConversationId: () => {
				const conversation = contextRef.current?.currentConversation;
				return conversation?.runtimeId ?? conversation?.id;
			},
			getSandboxCredential: async (asConversationId) => adapterRef.current?.getCloudAgentSandboxSession?.({ asConversationId }),
			getProjectSandboxId: () => {
				const sessionId = currentConversationIdRef.current;
				return sessionId ? projectChatRef.current?.getSandboxId?.(sessionId) : void 0;
			},
			binding: documentSelectionBinding,
			fallbackSessionId: resolveDocumentPreviewSessionId({
				source: documentPreviewSource,
				currentSessionId: currentConversationIdRef.current
			})
		});
		(0, import_react.useEffect)(() => disposeRegistrations, [disposeRegistrations]);
		const [cloudSandboxSaveContext, setCloudSandboxSaveContext] = (0, import_react.useState)(null);
		const selectedArtifactUrl = selectedArtifactForCurrentSession?.url;
		const pathFromLocalFilePreviewId = (() => {
			const id = selectedArtifactIdForCurrentSession;
			if (!id?.startsWith("local-file-preview:")) return;
			const rest = id.slice(19);
			const marker = rest.indexOf(":/");
			if (marker < 0) return;
			const absolute = rest.slice(marker + 1);
			return absolute.startsWith("/") ? absolute : void 0;
		})();
		const cloudSandboxSaveSource = typeof selectedArtifactUrl === "string" && selectedArtifactUrl || pathFromLocalFilePreviewId || selectedFilePath;
		const cloudSandboxSavePath = (0, import_react.useMemo)(() => {
			if (!cloudSandboxSaveSource || !getCloudSandboxDocType(cloudSandboxSaveSource)) return;
			if (canUseDocumentPreviewForFilePath?.(cloudSandboxSaveSource) === false) return;
			if (effectiveEnvironmentType !== "cloud" && !isSandboxFilePath(cloudSandboxSaveSource)) return;
			return normalizeSandboxFilePath(cloudSandboxSaveSource);
		}, [
			canUseDocumentPreviewForFilePath,
			cloudSandboxSaveSource,
			effectiveEnvironmentType
		]);
		(0, import_react.useEffect)(() => {
			if (!cloudSandboxSavePath || sidebarView !== "overview") return;
			onSidebarViewChange?.("artifacts");
		}, [
			cloudSandboxSavePath,
			onSidebarViewChange,
			sidebarView
		]);
		(0, import_react.useEffect)(() => {
			if (!cloudSandboxSavePath) {
				setCloudSandboxSaveContext(null);
				return;
			}
			setCloudSandboxSaveContext(null);
			let disposed = false;
			let timer;
			const poll = async () => {
				const resolved = await resolveCloudSandboxOrigin();
				if (disposed) return;
				if ("error" in resolved) {
					setCloudSandboxSaveContext(null);
					return;
				}
				const editor = await createCloudSandboxDocumentSaver({ sandboxOrigin: resolved.origin })?.resolveEditor(cloudSandboxSavePath);
				if (disposed) return;
				setCloudSandboxSaveContext(editor ? {
					sandboxFilePath: cloudSandboxSavePath,
					isDirty: editor.isDirty
				} : null);
				if (!disposed) timer = setTimeout(poll, CLOUD_SANDBOX_DIRTY_POLL_MS);
			};
			poll().catch(() => void 0);
			return () => {
				disposed = true;
				if (timer) clearTimeout(timer);
			};
		}, [cloudSandboxSavePath, resolveCloudSandboxOrigin]);
		const cloudSandboxLastHostSaveAtRef = (0, import_react.useRef)(void 0);
		const subscribeSandboxFileChange = context?.subscribeSandboxFileChange;
		(0, import_react.useEffect)(() => {
			if (!cloudSandboxSavePath || !subscribeSandboxFileChange) return;
			let disposed = false;
			let inflight;
			const unsubscribe = subscribeSandboxFileChange(cloudSandboxSavePath, () => {
				if (disposed || inflight) return;
				inflight = (async () => {
					const resolved = await resolveCloudSandboxOrigin();
					if (disposed || "error" in resolved) return;
					const saver = createCloudSandboxDocumentSaver({ sandboxOrigin: resolved.origin });
					if (!saver) return;
					const reloadResult = await runCloudSandboxExternalPreviewReload({
						sandboxFilePath: cloudSandboxSavePath,
						saver,
						lastHostSaveAtMs: cloudSandboxLastHostSaveAtRef.current,
						notifyReload: (filePath) => {
							notifyTencentDocsPreviewReload({ filePath });
						}
					});
					console.info("[cloud-sandbox] external preview reload", {
						path: cloudSandboxSavePath,
						...reloadResult
					});
				})().catch(() => void 0).finally(() => {
					inflight = void 0;
				});
			});
			return () => {
				disposed = true;
				try {
					unsubscribe();
				} catch {}
			};
		}, [
			cloudSandboxSavePath,
			resolveCloudSandboxOrigin,
			subscribeSandboxFileChange
		]);
		const handleSaveCloudSandboxPreviewContext = (0, import_react.useCallback)(async (sandboxFilePath) => {
			const resolved = await resolveCloudSandboxOrigin();
			if ("error" in resolved) return {
				success: false,
				error: resolved.error
			};
			const saver = createCloudSandboxDocumentSaver({ sandboxOrigin: resolved.origin });
			if (!saver) return {
				success: false,
				error: "Failed to create cloud sandbox document saver"
			};
			const result = await saver.save(sandboxFilePath);
			if (result.success) {
				cloudSandboxLastHostSaveAtRef.current = Date.now();
				setCloudSandboxSaveContext((prev) => prev?.sandboxFilePath === sandboxFilePath ? {
					...prev,
					isDirty: false
				} : prev);
			}
			return {
				success: result.success,
				action: "save",
				filePath: result.filePath ?? sandboxFilePath,
				message: result.message,
				error: result.error
			};
		}, [resolveCloudSandboxOrigin]);
		cloudSandboxSaveContextRef.current = cloudSandboxSaveContext;
		cloudSandboxDirtyCloseGateRef.current = async (target, mode = "close") => {
			const dirtyContext = cloudSandboxSaveContextRef.current;
			const destinationOrCloseFilePath = mode === "leave" ? getCloudSandboxDirtyLeaveDestination(target) : resolveDetailPanelDocumentTabClose({
				target,
				sources: artifacts,
				currentSessionId: currentConversationIdRef.current ?? sessionId
			}).filePath ?? target.closeFilePath;
			if (!shouldRunCloudSandboxDirtyPrompt({
				mode,
				isDirty: dirtyContext?.isDirty,
				dirtySandboxFilePath: dirtyContext?.sandboxFilePath,
				destinationOrCloseFilePath,
				preserveDocumentSelection: target.preserveDocumentSelection
			}) || !dirtyContext) return true;
			const fileName = getCloudSandboxDirtyCloseFileName(dirtyContext.sandboxFilePath);
			const action = await confirmCloudSandboxDirtyClose({
				title: t("cloudSandbox.dirtyClose.title"),
				message: t("cloudSandbox.dirtyClose.message", { name: fileName }),
				save: t("common.save"),
				discard: t("cloudSandbox.dirtyClose.discard"),
				cancel: t("common.cancel")
			});
			if (action === "cancel") return false;
			if (action === "discard") return true;
			const saveResult = await handleSaveCloudSandboxPreviewContext(dirtyContext.sandboxFilePath);
			if (!saveResult.success) {
				toast.error(saveResult.error || t("cloudSandbox.dirtyClose.saveFailed"));
				return false;
			}
			return true;
		};
		(0, import_react.useEffect)(() => {
			if (!registerBeforeCloseDetailPanel) return;
			const handler = async () => {
				const dirtyContext = cloudSandboxSaveContextRef.current;
				if (!dirtyContext?.isDirty) return true;
				return cloudSandboxDirtyCloseGateRef.current({
					closeFilePath: dirtyContext.sandboxFilePath,
					selectionDocument: dirtyContext.sandboxFilePath
				});
			};
			registerBeforeCloseDetailPanel(handler);
			return () => {
				registerBeforeCloseDetailPanel(void 0);
			};
		}, [registerBeforeCloseDetailPanel]);
		const resolvedDocumentPreviewUrlGetter = (0, import_react.useCallback)(async (filePath, options) => {
			if (effectiveEnvironmentType === "cloud" || isSandboxFilePath(filePath)) {
				if (canUseDocumentPreviewForFilePath?.(filePath) === false) return {
					success: false,
					error: "Cloud document preview disabled"
				};
				return handleGetCloudSandboxPreviewUrl(filePath);
			}
			if (disableDocumentSdkPreview || !localDocs?.getPreviewUrl) return {
				success: false,
				error: "Document preview unavailable"
			};
			return handleGetDocumentPreviewUrl(filePath, options);
		}, [
			canUseDocumentPreviewForFilePath,
			disableDocumentSdkPreview,
			effectiveEnvironmentType,
			handleGetCloudSandboxPreviewUrl,
			handleGetDocumentPreviewUrl,
			localDocs?.getPreviewUrl
		]);
		const documentPreviewUrlGetter = (0, import_react.useCallback)(async (filePath, options) => {
			const isHttpsUrl = /^https:\/\//i.test(filePath);
			if (isHttpsUrl && canUseDocumentPreviewForFilePath?.(filePath) === false) return {
				success: false,
				error: "Cloud document preview disabled"
			};
			if (isHttpsUrl && getDocumentPreviewUrlOverride) return getDocumentPreviewUrlOverride(filePath);
			if (!disableDocumentSdkPreview && isHttpsUrl && selectedArtifactId && isLocalFilePreviewId(selectedArtifactId) && remoteAttachmentDocumentPreviewUrl) return remoteAttachmentDocumentPreviewUrl(filePath);
			return resolvedDocumentPreviewUrlGetter(filePath, options);
		}, [
			canUseDocumentPreviewForFilePath,
			disableDocumentSdkPreview,
			getDocumentPreviewUrlOverride,
			remoteAttachmentDocumentPreviewUrl,
			resolvedDocumentPreviewUrlGetter,
			selectedArtifactId
		]);
		/**
		* 读取文件内容（用于 diff 内容获取）
		* 带缓存机制，按文件路径缓存
		*
		* 读取来源优先级：
		*   1. context.readFileForDiff —— 嵌入场景显式注入的 sandbox-aware 读取器
		*      （如 ColleagueArtifactProvider 为同事/云助理悬浮窗注入的远端 sandbox 读取器）。
		*      这些 session 不在主 adapter 的文件读取上下文里，必须走注入路径，否则会读空 / 失败。
		*   2. adapter.readFile —— 默认主对话路径，适用于本地或当前 session 直连的场景。
		*
		* ⚠️ 维护提示：如确需调整读取模型，必须同步修改 ColleagueArtifactProvider 与
		* ConversationsContext 的契约，不能只删消费端（否则同事浮窗 diff / Markdown 图片回归）。
		*/
		const readFileForDiff = context?.readFileForDiff;
		const handleReadFile = (0, import_react.useCallback)(async (filePath) => {
			const conversationId = getCurrentConversationId();
			if (!adapter || !conversationId) throw new Error("Adapter or conversation not available");
			const readableFilePath = /%[0-9A-Fa-f]{2}/.test(filePath) ? safeDecodeUri(filePath) : filePath;
			const cache = diffCacheRef.current;
			const cacheKey = `${conversationId}:${readableFilePath}`;
			const cached = cache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < 5e3) return cached.content;
			if (readFileForDiff) {
				const content = await readFileForDiff(readableFilePath);
				cache.set(cacheKey, {
					content,
					versionId: "",
					timestamp: Date.now()
				});
				return content;
			}
			const result = await adapter.readFile(conversationId, readableFilePath, void 0, buildReadAllowedDirsOption(readableFilePath));
			if (result.success && result.content !== void 0) {
				cache.set(cacheKey, {
					content: result.content,
					versionId: "",
					timestamp: Date.now()
				});
				return result.content;
			}
			throw new Error(result.error || "Failed to read file");
		}, [
			adapter,
			getCurrentConversationId,
			readFileForDiff
		]);
		const wrappedOpenArdotCanvasArtifact = (0, import_react.useCallback)((artifact) => {
			reportCanvasRefresh(adapter);
			handleOpenArdotCanvasArtifact(artifact, { forceReload: true });
		}, [adapter, handleOpenArdotCanvasArtifact]);
		const wrappedGenerateAppFromArdotCanvas = (0, import_react.useMemo)(() => {
			if (!onGenerateAppFromArdotCanvas) return;
			return () => {
				reportCanvasGenerateApp(adapter);
				onGenerateAppFromArdotCanvas();
			};
		}, [adapter, onGenerateAppFromArdotCanvas]);
		const wrappedOpenExternal = (0, import_react.useCallback)((url) => {
			if (isArdotCanvasSelected && url.includes("ardot.tencent.com")) reportCanvasEdit(adapter);
			handleOpenExternal(url);
		}, [
			adapter,
			handleOpenExternal,
			isArdotCanvasSelected
		]);
		const handleOpenFileLink = (0, import_react.useCallback)((filePath) => {
			if (!checkLocalFileOpenAllowed(filePath).allowed) return;
			context?.openArtifact?.("local-file-preview", {
				filePath,
				sessionId
			});
		}, [context?.openArtifact, sessionId]);
		const supportsClearBrowsingData = typeof adapter?.clearBrowsingData === "function";
		const handleClearBrowsingData = (0, import_react.useCallback)(async (type) => {
			await adapter?.clearBrowsingData?.(type);
		}, [adapter]);
		const supportsDeviceEmulation = typeof adapter?.setBrowserDeviceEmulation === "function";
		const handleSetDeviceEmulation = (0, import_react.useCallback)(async (webContentsId, config) => {
			await adapter?.setBrowserDeviceEmulation?.(webContentsId, config);
		}, [adapter]);
		const wrappedTogglePreviewFullscreen = (0, import_react.useCallback)((next) => {
			if (isArdotCanvasSelected) {
				if (next) reportCanvasExpand(adapter);
				else reportCanvasCollapse(adapter);
				const displayMode = next ? "fullscreen" : "inline";
				console.info("[DetailPanelWrapper] Ardot preview fullscreen toggled", { displayMode });
				notifyMcpAppDisplayModeChanged?.(displayMode);
			}
			onTogglePreviewFullscreen(next);
		}, [
			adapter,
			isArdotCanvasSelected,
			notifyMcpAppDisplayModeChanged,
			onTogglePreviewFullscreen
		]);
		const hidePublishActions = disableArtifactToolbarActions || isProjectSession || forceCloudEnvironment || adapter.environmentType !== "local";
		const documentPreviewFrameOptions = (0, import_react.useMemo)(() => localDocs?.getFrameOptions?.({
			locale: context?.documentPreviewRuntime?.locale ?? documentPreviewLocale,
			theme: context?.documentPreviewRuntime?.theme ?? currentTheme
		}), [
			localDocs,
			context?.documentPreviewRuntime?.locale,
			context?.documentPreviewRuntime?.theme,
			currentTheme,
			documentPreviewLocale
		]);
		const handleReleaseDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri, options) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.releaseContext) return {
				success: false,
				error: "Not supported"
			};
			const result = await currentLocalDocs.releaseContext(documentResourceUri, { consumerId: options?.consumerId });
			if (result.released === true) notifyDocumentClientSaved(documentResourceUri);
			return result;
		}, [localDocsRef]);
		/**
		* keep-alive 池淘汰 dirty 文档前先跳转到该文档的 owner 会话。
		*/
		const handleDocumentPreviewRequestSwitchToSession = (0, import_react.useCallback)((targetSessionId, filePath) => {
			const payload = {
				sessionId: targetSessionId,
				filePath,
				source: WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs,
				reason: WORKBUDDY_JUMP_TO_CONVERSATION_REASONS.poolEviction
			};
			adapter.emit(WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, payload);
		}, [adapter]);
		/** keep-alive 池满且无可淘汰候选时，提示用户主动保存/关闭其他文档后再试。 */
		const handleDocumentPreviewPoolFull = (0, import_react.useCallback)(() => {
			toast({
				message: t("tencentDocs.localFileOpen.previewPoolFull"),
				type: "warning"
			});
		}, [t]);
		const handleSaveDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri, options) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.saveContext) return {
				success: false,
				error: "Not supported"
			};
			const result = await currentLocalDocs.saveContext(documentResourceUri, {
				fileId: options?.fileId,
				mode: options?.action === "saveAs" ? "saveAs" : "overwrite",
				consumerId: options?.consumerId
			});
			if (result.success) notifyDocumentClientSaved(documentResourceUri);
			return result;
		}, [localDocsRef]);
		const handleAutoSaveDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.autoSaveContext) return {
				saved: false,
				reason: "unsupported"
			};
			const result = await currentLocalDocs.autoSaveContext(documentResourceUri);
			if (result.saved) {
				notifyDocumentClientSaved(documentResourceUri);
				notifyDocumentPreviewAutoSaved(documentResourceUri);
			}
			return result;
		}, [localDocsRef]);
		const handleReleaseDocumentPreviewContextIfClean = (0, import_react.useCallback)((documentResourceUri, options) => {
			if (!localDocs?.releaseContextIfClean) return Promise.resolve({
				released: false,
				reason: "failed",
				error: "Not supported"
			});
			return localDocs.releaseContextIfClean(documentResourceUri, { consumerId: options?.consumerId });
		}, [localDocs]);
		const handleGetDocumentPreviewContextDirty = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.getDirty) return true;
			return (await currentLocalDocs.getDirty(documentResourceUri)).isDirty === true;
		}, [localDocsRef]);
		/** 只聚焦已有编辑位置，不释放 context，也不转移编辑权。 */
		const handleNavigateToOpenConflict = (0, import_react.useCallback)(async (info) => {
			if (info.existingConsumer?.surface !== "main") {
				const focusOfficeFile = window.wb?.windows?.focusOfficeFile;
				if (focusOfficeFile) {
					if (await focusOfficeFile(info.filePath, { onlyEditor: true }).catch(() => false)) return;
				}
			}
			if (!info.ownerSessionId) return;
			const payload = {
				sessionId: info.ownerSessionId,
				source: WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs,
				reason: WORKBUDDY_JUMP_TO_CONVERSATION_REASONS.alreadyActive
			};
			adapter.emit(WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, payload);
		}, [adapter]);
		/**
		* 冲突位置继续保留 JS 只读预览；Toast 和顶部提示都只提供“前往编辑”导航。
		*/
		const handleOpenConflict = (0, import_react.useCallback)((info) => {
			if (info.conflictOwnership !== "owned-by-other") return;
			notifyLocalFileOpenConflictUi({
				source: "session-open",
				result: {
					success: true,
					status: "owned-by-other",
					sessionId: info.ownerSessionId,
					sessionTitle: info.sessionTitle,
					filePath: info.filePath,
					message: info.message
				},
				filePath: info.filePath,
				requestSessionId: sessionId,
				currentSessionId: sessionId,
				onJumpToSession: () => handleNavigateToOpenConflict(info)
			});
		}, [handleNavigateToOpenConflict, sessionId]);
		/**
		* 按文件名在当前 artifacts 里反查原始 HTML 地址（file:// / agent://），供本地预览代理地址回溯。
		* 两侧都用 normalizeHtmlBasename 归一化，否则代理地址与 artifact.uri 的 percent-encoding
		* 口径不同会导致含 `+ , ; = @ $ &` 的文件名恒 miss。
		*/
		const lookupLocalHtmlArtifactUrl = (0, import_react.useCallback)((filename) => {
			const matched = artifacts.find((a) => {
				const origUrl = getHtmlArtifactPreviewUrl(a);
				return !!origUrl && normalizeHtmlBasename(origUrl) === filename;
			});
			return matched ? getHtmlArtifactPreviewUrl(matched) : void 0;
		}, [artifacts]);
		/**
		* 当前可编辑的 HTML 目标：artifact 来源 / 文件树来源 / browserUrl 来源三选一，
		* 值为 HTML 文件的**原始路径**（file:// 或 agent://），用于 readFile/writeFile；
		* null 表示「当前展示的内容进不了编辑器」。
		*
		* 三个来源都过 resolveEditableHtmlTarget：远程 http(s)（sites 线上 shareLink、用户
		* dev server）一律返回 null，只留在 BrowserPreview 里看；本地 static-html 代理地址先
		* 反查原始 artifact，查不到同样返回 null。否则 daemon 白名单校验会拒绝（cnb#85988）。
		*
		* 编辑按钮、overlay、切文件退出编辑态三处共用同一个值：BrowserPreview toolbar 只按
		* `isLocalPreview` 决定是否点亮编辑按钮，若这里为 null 而按钮仍可点，用户会看到
		* 「已进入编辑模式」toast 但没有编辑器。
		*/
		const htmlEditTarget = (0, import_react.useMemo)(() => {
			const browserTarget = resolveEditableHtmlTarget$1(browserUrl, lookupLocalHtmlArtifactUrl);
			if (browserTarget) return browserTarget;
			const artifactUrl = getHtmlArtifactPreviewUrl(selectedArtifactForCurrentSession);
			if (artifactUrl) return resolveEditableHtmlTarget$1(artifactUrl, lookupLocalHtmlArtifactUrl);
			return resolveEditableHtmlTarget$1(selectedFilePath, lookupLocalHtmlArtifactUrl);
		}, [
			selectedArtifactForCurrentSession,
			selectedFilePath,
			browserUrl,
			lookupLocalHtmlArtifactUrl
		]);
		const normalizeHtmlTargetKey = (0, import_react.useCallback)((u) => {
			if (!u) return null;
			let s = u;
			const qIdx = s.search(/[?#]/);
			if (qIdx >= 0) s = s.slice(0, qIdx);
			s = s.replace(/^(https?:\/\/[^/]+\/sandbox-preview\/)[^/]+\//i, "$1");
			return s;
		}, []);
		const htmlEditModeRef = useLatestRef(htmlEditMode);
		const htmlEditTargetRef = useLatestRef(htmlEditTarget);
		const handleCloseBrowserTab = (0, import_react.useCallback)((tabId) => {
			if (htmlEditModeRef.current) {
				const closingUrl = browserPanelRef.current?.tabs.find((t) => t.id === tabId)?.url;
				const editingUrl = htmlEditTargetRef.current;
				if (closingUrl && editingUrl && normalizeHtmlTargetKey(closingUrl) === normalizeHtmlTargetKey(editingUrl)) {
					setHtmlEditMode(false);
					prevHtmlTargetRef.current = null;
					lastEditableHtmlTargetRef.current = null;
				}
			}
			closeBrowserTabFromContext?.(tabId);
		}, [
			closeBrowserTabFromContext,
			normalizeHtmlTargetKey,
			htmlEditModeRef,
			htmlEditTargetRef,
			browserPanelRef
		]);
		/**
		* HTML 可视化编辑 overlay：仅当以下条件全部满足时渲染 HtmlEditorPanel。
		*   - 用户开启了 htmlEditMode
		*   - 当前显示的是 HTML 文件（artifact 或 filePath）
		*   - 本地环境（非 cloud / 非 project / 非 forceCloud）
		*   - adapter 可用
		* 叠加在 detailMainOverlay 链的最前面，优先级高于 EnterpriseDocs / Library preview overlay。
		*/
		(0, import_react.useEffect)(() => {
			const current = htmlEditTarget;
			const currentKey = normalizeHtmlTargetKey(current);
			const prevKey = normalizeHtmlTargetKey(prevHtmlTargetRef.current);
			if (prevKey !== null && currentKey !== null && prevKey !== currentKey) {
				setHtmlEditMode(false);
				lastEditableHtmlTargetRef.current = null;
			}
			if (current !== null) prevHtmlTargetRef.current = current;
		}, [htmlEditTarget, normalizeHtmlTargetKey]);
		const htmlEditorReadFile = (0, import_react.useCallback)(async (s, fp, fmt) => {
			const sandboxMatch = fp.match(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/sandbox-preview\/[^/]+(\/.+)$/i);
			if (sandboxMatch) {
				const agentUri = `agent://${safeDecodeUri(sandboxMatch[1])}`;
				if (readFileWithFormat) {
					const result = await readFileWithFormat(agentUri, "text");
					if (typeof result === "string") return result;
				}
				throw new Error("Cannot read sandbox-preview file: readFileWithFormat unavailable or returned non-string");
			}
			if (fp.startsWith("agent://")) {
				if (readFileWithFormat) {
					const result = await readFileWithFormat(fp, "text");
					if (typeof result === "string") return result;
				}
				throw new Error("Cannot read agent:// file: readFileWithFormat unavailable or returned non-string");
			}
			const ad = adapterRef.current;
			if (!ad?.readFile) throw new Error("readFile not available");
			const result = await ad.readFile(s, fp, fmt, buildReadAllowedDirsOption(fp));
			if (!result.success) throw new Error(result.error || "readFile failed");
			return result.content ?? "";
		}, [readFileWithFormat]);
		const writeSandboxFileRef = (0, import_react.useRef)(context?.writeSandboxFile);
		writeSandboxFileRef.current = context?.writeSandboxFile;
		const htmlEditorWriteFile = (0, import_react.useCallback)(async (s, fp, content, opts) => {
			const sandboxMatch = fp.match(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/sandbox-preview\/[^/]+(\/.+)$/i);
			if (sandboxMatch) {
				const sandboxPath = safeDecodeUri(sandboxMatch[1]);
				const writeFn = writeSandboxFileRef.current;
				if (!writeFn) return {
					success: false,
					error: "writeSandboxFile not available for sandbox-preview URL"
				};
				try {
					await writeFn(sandboxPath, content);
					reportHtmlEditSession({
						filePath: fp,
						uin,
						enterpriseId
					});
					return { success: true };
				} catch (err) {
					return {
						success: false,
						error: err?.message || String(err)
					};
				}
			}
			if (fp.startsWith("agent://")) {
				let sandboxPath = fp.replace(/^agent:\/\/(files)?/, "");
				if (!sandboxPath.startsWith("/")) sandboxPath = `/${sandboxPath}`;
				const writeFn = writeSandboxFileRef.current;
				if (!writeFn) return {
					success: false,
					error: "writeSandboxFile not available for agent:// path"
				};
				try {
					await writeFn(sandboxPath, content);
					reportHtmlEditSession({
						filePath: fp,
						uin,
						enterpriseId
					});
					return { success: true };
				} catch (err) {
					return {
						success: false,
						error: err?.message || String(err)
					};
				}
			}
			const ad = adapterRef.current;
			if (!ad?.writeFile) return {
				success: false,
				error: "writeFile not available"
			};
			const result = await ad.writeFile(s, fp, content, opts);
			if (result.success) {
				reportHtmlEditSession({
					filePath: fp,
					uin,
					enterpriseId
				});
				if (!opts?.skipPublishRefresh) setPublishRefreshCount((c) => c + 1);
			}
			return result;
		}, [uin, enterpriseId]);
		const htmlEditorOverlay = (0, import_react.useMemo)(() => {
			const detected = htmlEditTarget;
			let filePath = detected;
			if (detected) lastEditableHtmlTargetRef.current = detected;
			else if (htmlEditMode && lastEditableHtmlTargetRef.current) filePath = lastEditableHtmlTargetRef.current;
			if (!filePath) return null;
			if (shouldSkipBrowserPreview({
				adapter: adapterRef.current,
				isProjectSession,
				forceCloudEnvironment
			})) return null;
			if (!adapterRef.current?.readFile || !adapterRef.current?.writeFile) return null;
			const sid = sessionId ?? "";
			if (!sid) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlEditorPanel, {
				filePath,
				sessionId: sid,
				readFile: htmlEditorReadFile,
				writeFile: htmlEditorWriteFile,
				initialMode: htmlEditMode ? "edit" : "preview",
				resolvePreviewUrl: hasResolvePreviewUrlCapability ? resolvePreviewUrl : void 0,
				onInsertSelectionQuote: (event) => wrappedSelectionQuoteInsert({
					...event,
					htmlSelection: true
				}),
				onSendSelectionQuote: (event) => wrappedSelectionQuoteSend({
					...event,
					htmlSelection: true
				}),
				subscribeFileChange: detailPanelSubscribeFileChange,
				enterpriseId,
				uin
			});
		}, [
			htmlEditMode,
			htmlEditTarget,
			isProjectSession,
			forceCloudEnvironment,
			sessionId,
			htmlEditorReadFile,
			htmlEditorWriteFile,
			hasResolvePreviewUrlCapability,
			resolvePreviewUrl,
			wrappedSelectionQuoteInsert,
			wrappedSelectionQuoteSend,
			detailPanelSubscribeFileChange,
			enterpriseId,
			uin
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: detailPanelContainerRef,
			className: "detail-panel-container",
			style: {
				width: "100%",
				height: "100%"
			},
			"data-disable-open-folder-context-menu": effectiveEnvironmentType === "cloud" ? "true" : void 0,
			"data-disable-local-file-actions": effectiveEnvironmentType === "cloud" ? "true" : void 0,
			"data-remote-file-session-id": effectiveEnvironmentType === "cloud" ? context?.currentConversation?.id : void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivePanel, {
					environmentType: effectiveEnvironmentType,
					terminalSessions: terminalAvailable ? terminalSessions : void 0,
					activeTerminalId: terminalAvailable ? activeTerminalId : void 0,
					onTerminalSelect: terminalAvailable ? handleTerminalSelect : void 0,
					onTerminalCreate: terminalAvailable ? handleTerminalCreate : void 0,
					onTerminalClose: terminalAvailable ? handleTerminalClose : void 0,
					onTerminalRename: terminalAvailable ? handleTerminalRename : void 0,
					renderTerminalView: terminalAvailable ? terminalProvider?.renderTerminalView : void 0,
					quickAskSessions: quickAskSessionsForHost,
					activeQuickAskId: activeQuickAskIdForHost,
					onQuickAskSelect: context?.setActiveQuickAskSession,
					onQuickAskClose: handleQuickAskClose,
					renderQuickAskView,
					isProjectSession,
					width,
					narrowOverviewLayout,
					showDetailPanel: uiLayoutState?.showDetailPanel,
					suspendHeavyContent: uiLayoutState?.detailPanelContentSuspended,
					detailInfo,
					artifacts,
					selectedArtifactId: selectedArtifactIdForCurrentSession,
					onArtifactSelect,
					onAppCloudServiceSelect: handleAppCloudServiceSelect,
					artifactDragResolver,
					themeName,
					currentTheme,
					fileTree,
					selectedFilePath,
					onFileSelect: handleFileSelect,
					onBeforeLocalDocumentOpen: shouldBlockLocalDocumentUiOpen,
					onFileDoubleClick,
					onBuild: handleBuild,
					onArtifactChange: handleArtifactChange,
					onArtifactCacheUpdate: handleArtifactCacheUpdate,
					onArtifactDownload: handleArtifactDownload,
					onOpenFolder: disableArtifactToolbarActions || effectiveEnvironmentType !== "local" || isSelectedArtifactBlobPreview ? void 0 : handleOpenFolder,
					onOpenFolderByPath: disableArtifactToolbarActions || effectiveEnvironmentType !== "local" || isSelectedArtifactBlobPreview ? void 0 : handleOpenFolderByPath,
					onOpenExternal: disableArtifactToolbarActions ? void 0 : wrappedOpenExternal,
					onOpenFileLink: effectiveEnvironmentType === "local" ? handleOpenFileLink : void 0,
					onClearBrowsingData: disableArtifactToolbarActions || !supportsClearBrowsingData ? void 0 : handleClearBrowsingData,
					onSetDeviceEmulation: supportsDeviceEmulation ? handleSetDeviceEmulation : void 0,
					isPreviewFullscreen,
					onTogglePreviewFullscreen: wrappedTogglePreviewFullscreen,
					onEditHtml: !htmlEditMode && adapter && htmlEditTarget ? () => {
						reportHtmlEnterEdit({
							filePath: htmlEditTarget,
							uin,
							enterpriseId
						});
						setHtmlEditMode(true);
					} : void 0,
					onRefreshClick: adapter && htmlEditTarget ? () => {
						reportHtmlRefreshClick({
							filePath: htmlEditTarget,
							uin,
							enterpriseId
						});
					} : void 0,
					isHtmlEditing: htmlEditMode,
					onExitEditHtml: htmlEditMode ? () => setHtmlEditMode(false) : void 0,
					showMediaPreviewFullscreenButton,
					readFile: handleReadFile,
					markdownImageUrlResolver: context?.markdownImageUrlResolver,
					lazyFileTreeMode,
					fileTreeData,
					onLoadFileTreeChildren,
					loadedPaths,
					onLoadedPathsChange,
					collapsedFolders,
					onCollapsedFoldersChange,
					onTreeDataChange,
					onReadFile,
					hasActiveSession,
					fileTreeLoaded,
					onRequestFileTreeRefresh,
					sidebarView: sidebarView ?? (!hasOpenedDetailContent ? "overview" : width < 500 ? "overview" : void 0),
					onSidebarViewChange,
					browserUrl: isEnterpriseDocsUrl ? void 0 : browserUrl,
					browserUrlForTab: browserUrl,
					sessionBrowserViewSlot,
					sessionBrowserUrl: sessionBrowserView.url,
					sessionBrowserSelected: sessionBrowserView.selected,
					onSessionBrowserSelect: handleSessionBrowserSelect,
					onSessionBrowserDeselect: sessionBrowserView.deselect,
					onSessionBrowserClose: sessionBrowserView.close,
					browserLabel: wbExtensionPreviewTitle,
					enterpriseDocsHandledUrl: isEnterpriseDocsUrl ? browserUrl : void 0,
					browserRefreshToken,
					onBrowserUrlChange: handleBrowserUrlChange,
					onBrowserPageTitleChange: handleBrowserPageTitleChange,
					browserTabs: browserPanel?.tabs,
					activeBrowserTabId: browserPanel?.activeTabId,
					onSelectBrowserTab: setActiveBrowserTabFromContext,
					onCloseBrowserTab: handleCloseBrowserTab,
					onAddBrowserTab: addBrowserTabFromContext,
					onBrowserTabUrlChange: updateBrowserTabUrlFromContext,
					onBrowserTabFaviconChange: updateBrowserTabFaviconFromContext,
					onBrowserTabPageTitleChange: handleBrowserTabPageTitleChange,
					onBrowserPreviewDiagnosticLog: handleBrowserPreviewDiagnosticLog,
					browserFrameOverride: htmlEditorOverlay,
					renderBrowserPreviewOverride,
					readFileWithFormat,
					sessionId,
					compact: isMobileLayout || width < 500,
					mobileLayout: isMobileLayout,
					isGitWorkspace,
					isWorkbuddyDesktop,
					webviewPartition: browserPreviewPartition,
					prepareWecomDocNavigation,
					resolvePreviewUrl: hasResolvePreviewUrlCapability ? resolvePreviewUrl : void 0,
					onShare: disableArtifactToolbarActions || isProjectSession && hasProjectSandbox || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleShareFile?.(visible, filePath, taskId, taskName, "default", void 0);
					},
					onShareToWeChat: isOverseas() || disableArtifactToolbarActions || isProjectSession && hasProjectSandbox || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleShareFile?.(visible, filePath, taskId, taskName, "wechat", document.querySelector(".detail-panel-container") ?? void 0);
					},
					onWxShareFile: wechatShareFileEnabled !== true || isOverseas() || wxShareFileBlockedByEdition || disableArtifactToolbarActions || isProjectSession && hasProjectSandbox || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleWxShareFileDirect?.(visible, filePath, taskId, taskName);
					},
					onQueryPublishStatus: hidePublishActions ? void 0 : handleQueryPublishStatus,
					onSyncPublish: hidePublishActions ? void 0 : handleSyncPublish,
					onViewPublishUrl: hidePublishActions ? void 0 : handleViewPublishUrl,
					publishRefreshToken,
					htmlShareEnabled: disableArtifactToolbarActions ? false : isHtmlShareEnabled,
					filePathOverride: htmlEditTarget ?? void 0,
					disableShareForOfficeFiles: isOverseas(),
					mioraShareEnabled: isMioraShareEnabled === true,
					uploadToCloudEnabled: disableArtifactUploadActions || isSelectedArtifactBlobPreview ? false : uploadToCloudEnabled,
					uploadTargets,
					uploadTargetIcons,
					onUploadToCloud: !disableArtifactUploadActions && uploadToCloudEnabled ? handleUploadToCloud : void 0,
					onBeforeUploadToCloudOpen: !disableArtifactUploadActions && uploadToCloudEnabled ? ensureArtifactSavedBeforeUploadToCloud : void 0,
					cwd: context?.currentConversation?.cwd,
					taskId: context?.currentConversation?.id,
					taskName: context?.currentConversation?.title,
					createdExperts: createdExperts.length > 0 ? createdExperts : void 0,
					expertCategories,
					onExpertTest: handleExpertTest,
					teamMemberAvatars,
					registerShowSourceForFile,
					agentMemberMessageConfig,
					mcpAppsAvailable,
					selectedMcpAppId,
					onSelectMcpApp,
					activeMcpAppInstance,
					mcpAppsStatus,
					onRetryMcpApp,
					onOpenArdotCanvasArtifact: wrappedOpenArdotCanvasArtifact,
					onMcpAppBridgeMessage,
					registerMcpAppsPostMessage,
					onMcpAppWebviewLoadError,
					onGenerateAppFromArdotCanvas: wrappedGenerateAppFromArdotCanvas,
					onArdotMcpAppViewportChange,
					mcpAppStandardPanelSlot,
					mcpAppStandardPanelUsesArtifactNavigation,
					renderExtensionPreview: renderExtensionArtifactPreview,
					detailMainOverlay: shouldShowArdotOnboarding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleServiceOnboardingPanel, {
						target: "ardot",
						variant: "overlay"
					}) : selectedWbApp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: sidebarView === "artifacts" ? "detail-main__space-overlay" : "detail-main__space-overlay detail-main__space-overlay--hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSpaceContainer, {
							app: selectedWbApp,
							artifactId: selectedArtifactIdForCurrentSession,
							conversationId: currentSessionId,
							initialTab: appSpaceInitialTab
						}, appSpaceOpenRevision) })
					}) : enterpriseDocsPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterpriseDocsWebviewBody, {
						url: enterpriseDocsPreviewUrl,
						fileId: enterpriseDocsPreviewFileId,
						previewSource: documentPreviewSource,
						onPageTitleChange: handleBrowserPageTitleChange
					}) : void 0,
					mcpAppsDebug: hideHeaderDebugTools ? void 0 : mcpAppsDebug,
					onToggleMcpAppsDebug: hideHeaderDebugTools ? void 0 : onToggleMcpAppsDebug,
					onLoadExampleMcpApps: hideHeaderDebugTools ? void 0 : onLoadExampleMcpApps,
					ardotAuthBound,
					onArdotAuthToggle: handleArdotAuthToggle,
					onSidebarCollapseChange: handleSidebarCollapseChange,
					onToggleDetailPanel: context?.onToggleDetailPanel,
					onLastTabClosed: handleLastTabClosed,
					pinSidebarRequestSeq: context?.pinSidebarRequestSeq,
					detailSidebarCollapseRequestSeq,
					detailSidebarExpandRequestSeq,
					onExpandDetailPanelForSidebarPin: context?.expandDetailPanelForSidebarPin,
					hasDetailPreviewContent: hasOpenedDetailContent,
					hideSidebar: shouldShowArdotOnboarding,
					collapseSidebar: shouldShowArdotOnboarding || collapseDesignCanvasSidebar,
					onAgentMemberPermissionResolve: handleAgentMemberPermissionResolve,
					getDocumentPreviewUrl: documentPreviewUrlGetter,
					resolveMioraViewerLocation,
					enablePersistentDocumentPreviewHost: usesPersistentDocumentPreviewHost,
					canUseDocumentPreviewForFilePath,
					onOpenConflict: handleOpenConflict,
					onNavigateToOpenConflict: handleNavigateToOpenConflict,
					releaseDocumentPreviewContext: localDocs?.releaseContext ? handleReleaseDocumentPreviewContext : void 0,
					releaseDocumentPreviewContextIfClean: localDocs?.releaseContextIfClean ? handleReleaseDocumentPreviewContextIfClean : void 0,
					getDocumentPreviewContextDirty: localDocs?.getDirty ? handleGetDocumentPreviewContextDirty : void 0,
					saveDocumentPreviewContext: localDocs?.saveContext ? handleSaveDocumentPreviewContext : void 0,
					cloudSandboxSaveContext,
					onSaveCloudSandboxContext: cloudSandboxSaveContext ? handleSaveCloudSandboxPreviewContext : void 0,
					autoSaveDocumentPreviewContext: localDocs?.autoSaveContext ? handleAutoSaveDocumentPreviewContext : void 0,
					documentPreviewCloseRequest,
					documentPreviewSessionEvictionIntent,
					onDocumentPreviewSessionEvictionSettled: handleDocumentPreviewSessionEvictionSettled,
					onBeforeFilePathSelectChange: registerBeforeSelectFilePathWithLocalRef,
					onBeforeUnifiedTabActivate: handleBeforeUnifiedTabActivate,
					onBeforeUnifiedTabClose: handleBeforeUnifiedTabClose,
					onDocumentPreviewCloseResult: handleDocumentPreviewCloseResult,
					processingSessionIds,
					onDocumentPreviewRequestSwitchToSession: handleDocumentPreviewRequestSwitchToSession,
					onDocumentPreviewPoolFull: handleDocumentPreviewPoolFull,
					onDocumentPreviewActiveSlotChange: handleDocumentPreviewActiveSlotChange,
					documentPreviewFrameOptions,
					subscribeFileChange: detailPanelSubscribeFileChange,
					onSaveFile: detailPanelSaveFile,
					onMediaPreviewDiagnosticLog: handleMediaPreviewDiagnosticLog,
					onMarkdownExpo: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedMarkdownExpo,
					onMarkdownEdit: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedMarkdownEdit,
					onMarkdownAiEditClick: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedMarkdownAiEditClick,
					onMarkdownAiPromptSend: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedMarkdownAiPromptSend,
					onMarkdownPicturePaste: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedMarkdownPicturePaste,
					docFontScale: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : docFontScale,
					onHtmlExpo: forceCloudEnvironment || context?.writeSandboxFile ? void 0 : wrappedHtmlExpo,
					checkFileExists: detailPanelCheckFileExists,
					onRemoveArtifact: handleRemoveArtifact,
					onArtifactTabClose: handleArtifactTabClose,
					onSendSelectionQuoteToChat: wrappedSelectionQuoteSend,
					onInsertSelectionQuoteToInput: wrappedSelectionQuoteInsert,
					onTrack: handleDetailPanelTrack
				}),
				tdocFolderPickerVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPickerModal, {
					visible: tdocFolderPickerVisible,
					onClose: handleTdocFolderPickerClose,
					onSelect: handleTdocFolderPicked
				}),
				imaDirPickerVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaDirSelector, {
					open: imaDirPickerVisible,
					onClose: handleImaDirPickerClose,
					onSelected: handleImaDirSelected
				}),
				lexiangKbPickerVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangContentPicker, {
					visible: lexiangKbPickerVisible,
					multiple: false,
					bypassConnectorAuth: shouldBypassLexiangConnectorAuth,
					excludeTargetTypes: ["team"],
					onClose: handleLexiangKbPickerClose,
					onConfirm: handleLexiangKbPicked
				}),
				netDrivePendingUpload?.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveStoreProvider, {
					value: projectNetDriveUploadContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
						visible: netDriveUploadModalVisible,
						onClose: handleNetDriveUploadModalClose,
						onUploadComplete: () => {
							projectNetDriveUploadContext.filesStore.getState().reset();
							reportSaveToMyfileSuccess(adapter, "artifact_side_project");
						},
						defaultFolderId: projectNetDriveUploadContext.netDriveStore.getState().rootFolderId || void 0,
						projectId: netDrivePendingUpload.projectId,
						fileInfo: { name: netDrivePendingUpload.filename || "file" },
						onUploadToDrive: netDrivePendingUpload.runtimeId ? handleNetDriveUploadToDrive : void 0,
						onSaveFile: netDrivePendingUpload.runtimeId ? void 0 : handleNetDriveSaveFile,
						title: t("myFiles.save.titleProject"),
						rootFolderLabel: t("myFiles.selector.rootFolderProject")
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
					visible: netDriveUploadModalVisible,
					onClose: handleNetDriveUploadModalClose,
					onUploadComplete: () => {
						reportSaveToMyfileSuccess(adapter, "artifact_side_personal");
					},
					fileInfo: netDrivePendingUpload ? {
						name: netDrivePendingUpload.filename || "file",
						localFilePath: netDrivePendingUpload.filePath,
						sessionId: context?.currentConversation?.id || ""
					} : void 0,
					onSaveFile: handleNetDriveSaveFile,
					onViewSuccess: handlePersonalNetDriveUploadSuccess
				})
			]
		});
	});
	DetailPanelWrapper.displayName = "DetailPanelWrapper";
}));
//#endregion
export { detail_panel_wrapper_exports as n, init_detail_panel_wrapper as r, DetailPanelWrapper as t };
