import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $et as SaveIcon, A5 as Breadcrumb, A7 as Input, B9 as WbPersonalIcon, Co as init_paths, Crt as AddIcon, Fnt as ChevronDownIcon, I5 as Tabs, I7 as WarningOutlineIcon, J5 as Select, J7 as XCloseIcon, K7 as CloudToolIcon, M5 as Table, M7 as TextArea, N1 as onLocaleChange, Nnt as ChevronLeftIcon, O7 as Tag, P5 as Segmented, Q5 as Pagination, R5 as Switch, Ret as SidebarCollapseIcon, S7 as Loading, So as STORAGE_API_PREFIX, V5 as message, Vet as ShieldCheckIcon, W7 as DatabaseToolIcon, W9 as WbRefreshIcon, Yet as SettingsIcon, _o as init_cloud_service_api, art as ColumnsIcon, bo as CloudServiceApiError, c7 as Modal, d7 as Popconfirm, dnt as DownloadTrayIcon, e9 as WbFileTxtIcon, eet as WbAnalyticsIcon, go as createCloudServiceApiClient, hnt as CopyIcon, i7 as Tooltip, j1 as init_i18n$1, jnt as ChevronUpIcon, k1 as getLocale, knt as ChevronRightIcon, krt as Button, m5 as init_src, m9 as WbFileFolderIcon, net as UploadIcon, pnt as DeleteIcon, rnt as FileTextIcon, rrt as getArtifactFileIconKind, snt as ErrorCircleIcon, tnt as TaskFilterIcon, trt as ArtifactFileTypeIcon, vo as init_request, xo as init_types$2, yo as requestData, zet as SidebarExpandIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/hooks/use-sites-page-show.ts
/**
* 从 globalThis 取 SDK 的 metrics 入口。
*
* 不 `import { wb } from '../app-core'`：那个 barrel 会顺带拖进 modules/conversation、
* utils/theme 等一大片依赖，凡是 mock 了 `@genie/wb-components` 的存量 spec
* （如 cloud-service-manager.spec）都会因缺 icon 导出而整个 suite 起不来。
* `initAppCore` 已把单例挂到 globalThis.wb（见 app-core/wb-singleton.ts），
* 这里直接读，未初始化时返回 undefined 而非抛错。
*/
function resolveMetrics() {
	return globalThis.wb?.metrics;
}
function useSitesPageShow({ active, pageURL, pageName, source, ext1, ext2 }) {
	/** 上次已上报的 (pageURL, pageName, ext1) 组合；空串表示当前不可见。 */
	const lastKeyRef = (0, import_react$34.useRef)("");
	const sourceRef = (0, import_react$34.useRef)(source);
	sourceRef.current = source;
	const ext2Ref = (0, import_react$34.useRef)(ext2);
	ext2Ref.current = ext2;
	(0, import_react$34.useEffect)(() => {
		if (!active) {
			lastKeyRef.current = "";
			return;
		}
		const key = `${pageURL}|${pageName ?? ""}|${ext1 ?? ""}`;
		if (key === lastKeyRef.current) return;
		lastKeyRef.current = key;
		reportSitesPageShow({
			pageURL,
			pageName,
			source: sourceRef.current,
			ext1,
			ext2: ext2Ref.current
		});
	}, [
		active,
		pageURL,
		pageName,
		ext1
	]);
}
/**
* 命令式上报。SDK 未初始化时静默跳过，埋点绝不能把业务页面打挂。
*/
function reportSitesPageShow({ pageURL, pageName, source, ext1, ext2 }) {
	const metrics = resolveMetrics();
	if (!metrics) return;
	try {
		Promise.resolve(metrics.report(WB_EVENT_PAGE_SHOW, {
			pageURL,
			...pageName ? { pageName } : {},
			...source ? { source } : {},
			...ext1 ? { ext1 } : {},
			...ext2 ? { ext2 } : {}
		})).catch(() => void 0);
	} catch {}
}
var import_react$34, WB_EVENT_PAGE_SHOW;
var init_use_sites_page_show = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	WB_EVENT_PAGE_SHOW = "web_page_show";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/utils/app-api-probe.ts
/**
* 由「来源标注」推断真假，供 `probeAppView` 的 `kind` 使用。
*
* 约定（两种真接口写法，与 `AppApiProbeEntry.api` 的约定一致）：
*
* - HTTP：`METHOD /path`，如 `POST /control/cloud-services/deactivate`
* - RPC：`namespace:method`，如 `sites:unpublishApplication`
*
* 只要带 `(MOCK)` 后缀就一律判为假，**该判定优先于上面两条**。
* 这条优先级不能反：mock 的来源标注刻意沿用真接口的名字（`sites:deploy(MOCK)`），
* 好让 Console 里真假两条并排时能对上号；若先匹配 RPC 形状，mock 会被当成真的。
*
* 为什么需要它：调用点手写 `kind: 'mock'` 在混源场景会说谎 —— 云服务这份数据
* 平时是 mock，但销毁成功后的乐观态来自**真接口**，硬写 mock 就把唯一一条真调用
* 也标成了假的。这里从 source 统一推导，两者不会再打架。
*
* 兜底成 `'mock'`（而不是 real）是刻意的：**宁可把真的误标成假，也不能把假的当真** ——
* 后者会让人以为联调通过了。所以 `present_app_files` / `default(none)` 这类
* 既非 HTTP 也非 RPC 形状的写法全部落到 mock。
*/
function resolveAppApiKind(source) {
	if (/\(MOCK\)$/.test(source)) return "mock";
	if (/^(GET|POST|PUT|PATCH|DELETE)\s/.test(source)) return "real";
	return /^[a-z][\w-]*:[A-Za-z]\w*$/.test(source) ? "real" : "mock";
}
/**
* 探针是否开启。**默认关闭，需显式 opt-in。**
*
* 开启（执行后即刻生效，无需刷新）：
*   localStorage.setItem('wb.appApiProbe', '1')
* 关闭：
*   localStorage.removeItem('wb.appApiProbe')
*
* 为什么默认关：日志规范（`.codebuddy/rules/workbuddy-log-spec.md`）禁止响应体
* dump 入库，而本探针打的就是完整响应体。默认关闭后，普通用户的 Console 一行不多，
* 只有主动开启的开发者才会看到；这样它既不违规，也不必在联调结束前反复加删。
*
* 每次调用都读一次 localStorage，**故意不缓存**：调试时希望在 Console 改完开关
* 立刻生效。这里的读取频率是「用户点一次按钮一次」，不是热路径，
* 同步读 localStorage 的开销可以忽略。
*
* try/catch 是必需的：隐私模式或某些 WebView 下访问 localStorage 会直接抛，
* 探针自己把页面搞崩就本末倒置了。读不到开关时按关闭处理（与默认一致）。
*/
function enabled() {
	if (typeof window === "undefined") return false;
	try {
		return window.localStorage?.getItem(STORAGE_KEY) === "1";
	} catch {
		return false;
	}
}
/**
* 打一条数据出入口日志。
*
* 失败走 `console.error`（能在 Console 里按级别过滤，也能拿到堆栈），
* 成功走 `console.info` —— 不用 `console.log`，避免和业务里零散的 log 混在一起。
*/
function probeAppApi(entry) {
	if (!enabled()) return;
	const tag = entry.kind === "mock" ? "[genie][MOCK]" : "[genie]";
	const meta = {};
	if (entry.request !== void 0) meta.request = entry.request;
	if (entry.ms !== void 0) meta.ms = entry.ms;
	const hasMeta = Object.keys(meta).length > 0;
	if (entry.error !== void 0) {
		if (hasMeta) console.error(`${tag} ${entry.api} x`, entry.error, meta);
		else console.error(`${tag} ${entry.api} x`, entry.error);
		return;
	}
	if (hasMeta) console.info(`${tag} ${entry.api} →`, entry.response, meta);
	else console.info(`${tag} ${entry.api} →`, entry.response);
}
/**
* 计时版打点：包住一次异步调用，自动补 `ms` 与成功/失败分支。
*
* 给真接口用（mock 的耗时是 setTimeout 写死的，包了也没意义）。
* **原样重抛**错误：探针只观测，不能改变调用方的错误处理路径。
*/
async function probeAppApiCall(api, request, call) {
	const startedAt = Date.now();
	try {
		const response = await call();
		probeAppApi({
			api,
			kind: "real",
			request,
			response,
			ms: Date.now() - startedAt
		});
		return response;
	} catch (error) {
		probeAppApi({
			api,
			kind: "real",
			request,
			error,
			ms: Date.now() - startedAt
		});
		throw error;
	}
}
/**
* 视图数据快照 —— 打开某个面板时，说明它**正在渲染的数据是哪来的**。
*
* ```
* [genie][MOCK] publish-panel ← present_app_files → { status: 'published', ... }
* ```
*
* ## 为什么需要它（`probeAppApi` 不够用）
*
* `probeAppApi` 只在**发生调用**时打点，而打开发布面板压根不发起任何调用 ——
* 面板纯渲染早已在内存里的 `release`。于是出现一个很容易误判的现象：
* 面板上明明有 `https://demo.workbuddy.link` 这种像真的链接，Console 却一片空白，
* 让人以为"日志坏了"，实际是"这里本来就没有请求"。
*
* 这条日志把那个空白填上：告诉你面板数据的**上游是谁**、是不是 mock。
*
* ⚠️ 只在**用户动作**（点开面板）时调，**不要放进 render**。放 render 里每次
* 重渲染都会打，就成了日志规范明令禁止的热路径日志。
*/
function probeAppView(entry) {
	if (!enabled()) return;
	const tag = entry.kind === "mock" ? "[genie][MOCK]" : "[genie]";
	console.info(`${tag} ${entry.view} <- ${entry.source} →`, entry.data);
}
var STORAGE_KEY;
var init_app_api_probe = __esmMin((() => {
	STORAGE_KEY = "wb.appApiProbe";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/cloud-service-manager.scss
var init_cloud_service_manager$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/api/storage-api.ts
function idempotencyConfig(idempotencyKey) {
	return { headers: { "Idempotency-Key": idempotencyKey } };
}
function normalizePrepareDeleteResult(result) {
	const samplePaths = result.summary.samplePaths;
	return {
		...result,
		summary: {
			...result.summary,
			samplePaths: Array.isArray(samplePaths) ? samplePaths.filter((path) => typeof path === "string") : []
		}
	};
}
/** S1-S5 and S7-S13 client. S6 uploads bytes directly to the opaque signed URL. */
function createStorageApiClient(http = wb.http) {
	return {
		async listStorageOwners(applicationId, query = {}) {
			return requestData(() => http.get(`${STORAGE_API_PREFIX}/owners`, { params: {
				applicationId,
				...query
			} }));
		},
		async listStorageObjects(applicationId, query = {}) {
			return requestData(() => http.get(`${STORAGE_API_PREFIX}/objects`, { params: {
				applicationId,
				...query
			} }));
		},
		async getStorageObjectInfo(request) {
			return requestData(() => http.get(`${STORAGE_API_PREFIX}/objects/info`, { params: { ...request } }));
		},
		async createStorageDownloadUrl(request) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/download-url`, request));
		},
		async prepareStorageUpload(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/upload/prepare`, request, idempotencyConfig(idempotencyKey)));
		},
		async commitStorageUpload(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/upload/commit`, request, idempotencyConfig(idempotencyKey)));
		},
		async createStorageFolder(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/folders/create`, request, idempotencyConfig(idempotencyKey)));
		},
		async prepareStorageDelete(request) {
			return normalizePrepareDeleteResult(await requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/delete/prepare`, request)));
		},
		async executeStorageDelete(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/delete/execute`, request, idempotencyConfig(idempotencyKey)));
		},
		async getStorageOperation(applicationId, operationId) {
			return requestData(() => http.get(`${STORAGE_API_PREFIX}/operations/${encodeURIComponent(operationId)}`, { params: { applicationId } }));
		},
		async copyStorageObject(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/copy`, request, idempotencyConfig(idempotencyKey)));
		},
		async moveStorageObject(request, idempotencyKey) {
			return requestData(() => http.post(`${STORAGE_API_PREFIX}/objects/move`, request, idempotencyConfig(idempotencyKey)));
		}
	};
}
var init_storage_api = __esmMin((() => {
	init_paths();
	init_request();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/api/index.ts
var init_api = __esmMin((() => {
	init_cloud_service_api();
	init_storage_api();
	init_types$2();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-manager-view.scss
var init_cloud_service_manager_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/i18n/en.ts
var en;
var init_en = __esmMin((() => {
	en = {
		"common.retry": "Retry",
		"common.refresh": "Refresh",
		"common.upgrade": "Upgrade plan",
		"common.loading": "Loading cloud services…",
		"common.loadFailed": "Cloud services could not be loaded. Please try again.",
		"common.actionFailed": "The action failed. Please try again.",
		"common.syncFailed": "The action completed, but status sync failed. Refresh manually.",
		"common.poolExhausted": "Cloud-service capacity is unavailable. Please try again later.",
		"module.database": "Database",
		"module.storage": "Storage",
		"module.auth": "Authentication",
		"module.analytics": "Statistics",
		"onboarding.title": "Get a complete backend without building one",
		"onboarding.action.enable": "Enable cloud services",
		"onboarding.action.provisioning": "Enabling…",
		"onboarding.action.provisionFailed": "Re-enable",
		"onboarding.quotaExhausted.note": "Your account has no cloud-service app quota left. Upgrade your plan or remove an idle cloud-service app",
		"onboarding.card.database.title": "Database",
		"onboarding.card.database.description": "Manage tables with query, editing, and export",
		"onboarding.card.storage.title": "Storage",
		"onboarding.card.storage.description": "Upload and keep images, audio, and video",
		"onboarding.card.auth.title": "Authentication",
		"onboarding.card.auth.description": "Sign in with email, Google, or Apple",
		"onboarding.card.analytics.title": "Statistics",
		"onboarding.card.analytics.description": "Track users, sign-ups, and growth trends",
		"state.notEnabled.title": "Enable cloud services for your app",
		"state.notEnabled.description": "Add database, storage, authentication, and statistics capabilities.",
		"state.notEnabled.action": "Enable cloud services",
		"state.noQuota.title": "No cloud-service quota is available",
		"state.noQuota.description": "Upgrade your plan to enable cloud services for this app.",
		"state.expiring.title": "Cloud resources are running low",
		"state.expiring.description": "Upgrade your plan before the service is paused.",
		"state.expiring.badge": "Quota running low",
		"state.exhausted.title": "This app's cloud service is paused",
		"state.exhausted.daysDescription": "Cloud service is paused. Data is kept for up to 15 days; {days} day(s) remain.",
		"state.exhausted.todayDescription": "Cloud service is paused. Data will be permanently deleted at {deadline}.",
		"state.exhausted.recoveryDescription": "Upgrade to {planName} to restore the service and data. Expired data will be permanently deleted.",
		"state.exhausted.recoveryFallbackDescription": "Upgrade your plan to restore the service and data. Expired data will be permanently deleted.",
		"state.exhausted.todayRecoveryDescription": "Upgrade to {planName} now. Expired data will be permanently deleted.",
		"state.exhausted.todayRecoveryFallbackDescription": "Upgrade your plan now. Expired data will be permanently deleted.",
		"state.exhaustedUrgent.title": "Cloud resources will be destroyed soon",
		"state.exhaustedUrgent.description": "Less than 24 hours remain. Upgrade now; destroyed data cannot be recovered.",
		"state.destroyed.title": "This app's cloud service resources have been deleted",
		"state.destroyed.description": "The original data cannot be recovered. You can create a new cloud service.",
		"state.destroyed.dataGoneDescription": "The original data has been permanently deleted and cannot be recovered.",
		"state.destroyed.recreateDescription": "Create a new cloud service to use database, authentication, and other capabilities again.",
		"state.destroyed.upgradeDescription": "The app itself is retained. Upgrade your plan to recreate cloud service for this app.",
		"state.destroyed.action": "Create new cloud services",
		"state.provisioning.title": "Creating cloud services",
		"state.provisioning.description": "Resources are being prepared and configured.",
		"state.provisionFailed.title": "Cloud-service creation failed",
		"state.provisionFailed.description": "The resources could not be created. Please retry.",
		"state.destroying.title": "Destroying cloud services",
		"state.destroying.description": "Resources are being destroyed. Do not repeat this action.",
		"state.unavailable.title": "Cloud-service status is unavailable",
		"state.unavailable.description": "Refresh and try again later.",
		"state.unknownDeadline.description": "Cloud service is paused and the data-retention deadline is not available yet. Upgrade to restore the service and data.",
		"workspace.capabilityUnavailable.title": "Feature unavailable",
		"workspace.capabilityUnavailable.description": "The management API for this module is not ready yet.",
		"workspace.navigation.title": "Cloud services",
		"workspace.navigation.collapse": "Collapse cloud-service navigation",
		"workspace.navigation.expand": "Expand cloud-service navigation",
		"database.section.data": "Data",
		"database.section.functions": "Functions",
		"database.section.permissions": "Permissions",
		"database.data.title": "Database data",
		"database.table.placeholder": "Select a table",
		"database.table.description": "Description: {description}",
		"database.table.empty": "No rows",
		"database.table.none": "No tables",
		"database.row.add": "Add row",
		"database.row.insert": "Insert row",
		"database.row.edit": "Edit",
		"database.row.delete": "Delete row",
		"database.row.deleteConfirm": "Delete this row?",
		"database.row.deleteConfirmDesc": "This action cannot be undone.",
		"database.row.noPrimaryKey": "This table has no primary key. Rows cannot be edited or deleted.",
		"database.row.unavailable": "The row-create API is not available yet",
		"database.columns": "Columns",
		"database.columns.unavailable": "Column settings are not available yet",
		"database.exportCsv": "Export CSV",
		"database.pagination.total": "{total} rows",
		"database.filter": "Filter",
		"database.filter.add": "Add condition",
		"database.filter.column": "Column",
		"database.filter.operator": "Operator",
		"database.filter.value": "Value",
		"database.filter.apply": "Apply",
		"database.filter.clear": "Clear",
		"database.filter.remove": "Remove filter condition",
		"database.filter.active": "{count} filter(s)",
		"database.filter.op.eq": "equals",
		"database.filter.op.neq": "not equals",
		"database.filter.op.gt": "greater than",
		"database.filter.op.gte": "greater or equal",
		"database.filter.op.lt": "less than",
		"database.filter.op.lte": "less or equal",
		"database.filter.op.like": "contains",
		"database.filter.op.is_null": "is null",
		"database.filter.op.is_not_null": "is not null",
		"database.sort.clear": "Clear sort",
		"common.save": "Save",
		"common.cancel": "Cancel",
		"common.delete": "Delete",
		"database.functions.readOnly": "Function metadata is queried through read-only SQL. Execution and editing are not available in this release.",
		"database.functions.schema": "Schema",
		"database.functions.name": "Function",
		"database.functions.kind": "Type",
		"database.functions.arguments": "Arguments",
		"database.functions.returnType": "Return type",
		"database.functions.empty": "No database functions",
		"database.permissions.summary": "RLS summary",
		"database.permissions.summaryCounts": "{enabled}/{total} tables enabled · {policies} policies",
		"database.permissions.policy": "Policy",
		"database.permissions.command": "Command",
		"database.permissions.roles": "Roles",
		"database.permissions.enabled": "RLS enabled",
		"database.permissions.statusUnknown": "RLS off or status unavailable",
		"database.permissions.readOnly": "RLS policies are read-only in this release. Create, edit, and delete are unavailable.",
		"database.permissions.emptyEnabled": "RLS is enabled but no policies exist. Verify that the default-deny behavior is intended.",
		"database.permissions.emptyDisabled": "RLS is off or its status is unavailable. There are no policies to show.",
		"database.loadFailed.title": "Database could not be loaded",
		"auth.provider.email.title": "Email",
		"auth.provider.email.description": "Register and sign in with an email address and password",
		"auth.provider.phone.title": "Phone verification",
		"auth.provider.phone.description": "Register and sign in with an SMS verification code",
		"auth.provider.google.title": "Google",
		"auth.provider.google.description": "Sign in with a Google account",
		"auth.provider.wechatMiniProgram.title": "WeChat authorization",
		"auth.provider.wechatMiniProgram.description": "Sign in through a WeChat Mini Program",
		"auth.provider.status.enabled": "Enabled",
		"auth.provider.status.disabled": "Disabled",
		"auth.provider.status.degraded": "Needs attention",
		"auth.provider.status.unknown": "Status unavailable",
		"auth.error.configChanged": "The configuration changed and was refreshed. Review it before saving again.",
		"auth.error.secretRequired": "The configuration changed. Enter the Secret or password again before saving.",
		"auth.error.clientIdRequired": "Client ID is required for custom credentials.",
		"auth.detail.back": "Back",
		"auth.detail.cancel": "Cancel",
		"auth.detail.save": "Save",
		"auth.detail.saveSuccess": "Saved successfully",
		"auth.detail.copyUri": "Copy URI",
		"auth.google.detail.title": "Google Settings",
		"auth.google.detail.subtitle": "Configure Google OAuth sign-in",
		"auth.google.detail.enableLabel": "Enable Google sign-in",
		"auth.google.detail.enableDescription": "Allow users to sign in with their Google account",
		"auth.google.detail.credentialMode": "Credential source",
		"auth.google.detail.platformManaged": "Platform-managed",
		"auth.google.detail.platformManagedDescription": "Use platform-provided OAuth credentials with no extra setup",
		"auth.google.detail.customCredential": "Custom credentials",
		"auth.google.detail.customCredentialDescription": "Use your own Google Cloud OAuth credentials",
		"auth.google.detail.customInfo": "Create an OAuth 2.0 Client ID in Google Cloud Console and add the redirect URI below to the authorized redirect URIs.",
		"auth.google.detail.redirectUriLabel": "Add this redirect URI to your Google Cloud Console",
		"auth.google.detail.clientId": "Client ID",
		"auth.google.detail.clientIdDescription": "Your Google OAuth client ID",
		"auth.google.detail.clientIdPlaceholder": "Enter Client ID",
		"auth.google.detail.clientSecret": "Client Secret",
		"auth.google.detail.clientSecretDescription": "Your Google OAuth client secret",
		"auth.google.detail.clientSecretPlaceholder": "Enter Client Secret",
		"auth.google.detail.clientSecretConfiguredPlaceholder": "Configured; leave blank to keep it",
		"auth.phone.detail.title": "Phone Verification Settings",
		"auth.phone.detail.subtitle": "Configure SMS verification code sign-in",
		"auth.phone.detail.enableLabel": "Enable phone verification",
		"auth.phone.detail.enableDescription": "Allow users to register and sign in with an SMS verification code",
		"auth.phone.detail.signatureMode": "SMS signature",
		"auth.phone.detail.platformManaged": "Platform-managed",
		"auth.phone.detail.platformManagedDescription": "Use the platform-provided “workbuddy” SMS signature with no extra setup",
		"auth.phone.detail.customSignature": "Custom signature",
		"auth.phone.detail.customSignatureDescription": "Use your own SMS signature (not yet available)",
		"auth.wechatMiniProgram.detail.title": "WeChat Authorization Settings",
		"auth.wechatMiniProgram.detail.subtitle": "Configure WeChat Mini Program sign-in",
		"auth.wechatMiniProgram.detail.enableLabel": "Enable WeChat authorization",
		"auth.wechatMiniProgram.detail.enableDescription": "Allow users to sign in through the WeChat Mini Program",
		"auth.email.detail.title": "Email Settings",
		"auth.email.detail.subtitle": "Configure email sign-in and mail delivery",
		"auth.email.detail.enableLabel": "Enable email sign-in",
		"auth.email.detail.enableDescription": "Allow users to register and sign in with email and password",
		"auth.email.detail.smtpSection": "SMTP Configuration",
		"auth.email.detail.smtpPlatform": "Platform-managed",
		"auth.email.detail.smtpPlatformDescription": "Use the platform default mail delivery service",
		"auth.email.detail.smtpCustom": "Custom SMTP",
		"auth.email.detail.smtpCustomDescription": "Use your own SMTP server to send emails",
		"auth.email.detail.smtpHost": "SMTP Host",
		"auth.email.detail.smtpHostDescription": "SMTP server address",
		"auth.email.detail.smtpPort": "Port",
		"auth.email.detail.smtpSecurity": "Security",
		"auth.email.detail.smtpUsername": "Username",
		"auth.email.detail.smtpPassword": "Password",
		"auth.email.detail.smtpPasswordPlaceholder": "Enter SMTP password",
		"auth.email.detail.smtpPasswordConfiguredPlaceholder": "Configured; leave blank to keep it",
		"auth.email.detail.smtpSender": "Sender email",
		"auth.email.detail.templateSection": "Email Templates",
		"auth.email.detail.templatePlatform": "Platform default",
		"auth.email.detail.templatePlatformDescription": "Use the standard email templates provided by the platform",
		"auth.email.detail.templateCustom": "Custom templates",
		"auth.email.detail.templateCustomDescription": "Use your own HTML email templates",
		"auth.email.detail.templateLoginZh": "Login code template (Chinese)",
		"auth.email.detail.templateLoginEn": "Login code template (English)",
		"auth.email.detail.templateDefaultZh": "Default notification template (Chinese)",
		"auth.email.detail.templateDefaultEn": "Default notification template (English)",
		"auth.email.detail.templateNote": "Templates must contain the verification-code variable: {{.VerificationCode}}.",
		"storage.breadcrumb.ariaLabel": "Storage path",
		"storage.breadcrumb.root": "Storage",
		"storage.action.createFolder": "New folder",
		"storage.action.upload": "Upload file",
		"storage.action.download": "Download",
		"storage.action.delete": "Delete",
		"storage.action.refresh": "Refresh",
		"storage.action.sharedOnly": "Open Application Shared before making changes.",
		"storage.action.opensApplicationShared": "This action opens Application Shared first.",
		"storage.upload.uploading": "Uploading",
		"storage.upload.invalidName": "The file name “{name}” is invalid. Rename it and try again.",
		"storage.upload.sizeExceeded": "“{name}” exceeds the 20 MB upload limit.",
		"storage.upload.failed": "Failed to upload “{name}”. Please try again.",
		"storage.upload.prepareFailed": "Could not prepare “{name}” for upload. Try again.",
		"storage.upload.alreadyExists": "“{name}” already exists. Do not upload it again.",
		"storage.upload.authorizationExpired": "The upload authorization for “{name}” expired. Select the file again.",
		"storage.upload.directFailed": "Could not upload “{name}” to storage. Check the network or storage CORS configuration and try again.",
		"storage.upload.commitFailed": "Could not commit “{name}”. The list was refreshed; review it and try again.",
		"storage.delete.title": "Delete the selected items?",
		"storage.delete.summary": "This deletes {fileCount} file(s) and {folderCount} folder(s), totaling {size}. This cannot be undone.",
		"storage.delete.morePaths": "More paths are not shown.",
		"storage.delete.partial": "Some items could not be deleted. The list was refreshed; review it and try again.",
		"storage.delete.failed": "The items could not be deleted. The list was refreshed; try again.",
		"storage.column.name": "Name",
		"storage.column.size": "Size",
		"storage.column.createdAt": "Created",
		"storage.column.updatedAt": "Last modified",
		"storage.empty": "No files",
		"storage.emptyFolder": "This folder is empty. Upload a file or create a subfolder.",
		"storage.selected": "{count} selected",
		"storage.createFolder.title": "New Folder",
		"storage.createFolder.placeholder": "Enter folder name",
		"storage.createFolder.create": "Create",
		"storage.createFolder.cancel": "Cancel",
		"storage.createFolder.success": "Folder “{name}” created",
		"storage.createFolder.failed": "The folder could not be created. Try again later.",
		"storage.createFolder.errorEmpty": "Folder name cannot be empty",
		"storage.createFolder.errorInvalidChars": "Folder name cannot contain / \\ : * ? \" < > |",
		"storage.createFolder.errorConflict": "A file or folder with this name already exists. Choose another name.",
		"storage.createFolder.errorRejected": "The folder name or nesting level is invalid. Update it and try again.",
		"storage.detail.download": "Download",
		"storage.detail.delete": "Delete",
		"storage.detail.type": "Type",
		"storage.detail.owner": "Owner",
		"storage.detail.lastAccessedAt": "Last accessed",
		"storage.loadFailed.title": "Storage could not be loaded",
		"storage.capabilityUnavailable.description": "The object-storage management API is not available yet. No mock data is shown here.",
		"analytics.overview.title": "Overview",
		"analytics.metric.total": "Total users",
		"analytics.metric.today": "New today",
		"analytics.metric.week": "New this week",
		"analytics.trend.title": "Registration trend",
		"analytics.trend.ariaLabel": "User registration trend chart",
		"analytics.range.7d": "Last 7 days",
		"analytics.range.30d": "Last 30 days",
		"analytics.range.90d": "Last 90 days",
		"analytics.users.title": "Users ({count})",
		"analytics.users.name": "Name",
		"analytics.users.email": "Email",
		"analytics.empty": "No data",
		"analytics.loadFailed.title": "Statistics could not be loaded"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/i18n/zh.ts
var zh;
var init_zh = __esmMin((() => {
	zh = {
		"common.retry": "重试",
		"common.refresh": "刷新",
		"common.upgrade": "升级套餐",
		"common.loading": "正在加载云服务…",
		"common.loadFailed": "云服务加载失败，请稍后重试。",
		"common.actionFailed": "操作失败，请重试。",
		"common.syncFailed": "云服务动作已完成，但状态同步失败，请手动刷新。",
		"common.poolExhausted": "当前云服务资源池不足，请稍后再试。",
		"module.database": "数据库",
		"module.storage": "文件存储",
		"module.auth": "身份认证",
		"module.analytics": "数据统计",
		"onboarding.title": "无需自建后端，快速获得完整能力",
		"onboarding.action.enable": "启用云服务",
		"onboarding.action.provisioning": "启用中",
		"onboarding.action.provisionFailed": "重新启用",
		"onboarding.quotaExhausted.note": "您账户下可启用云服务的应用额度不足，可升级套餐或删除闲置的云服务应用",
		"onboarding.card.database.title": "数据库",
		"onboarding.card.database.description": "数据表管理，支持查询、编辑、导出",
		"onboarding.card.storage.title": "文件存储",
		"onboarding.card.storage.description": "上传并保存图片、音视频等文件",
		"onboarding.card.auth.title": "身份认证",
		"onboarding.card.auth.description": "支持邮箱、Google 或 Apple 登录/注册",
		"onboarding.card.analytics.title": "数据统计",
		"onboarding.card.analytics.description": "查看用户数量、注册情况与增长趋势",
		"state.notEnabled.title": "启用云服务，为应用接入后端能力",
		"state.notEnabled.description": "云服务提供数据库、文件存储、身份认证和数据统计能力。",
		"state.notEnabled.action": "启用云服务",
		"state.noQuota.title": "当前套餐暂无可用云服务额度",
		"state.noQuota.description": "升级套餐后，即可为该应用启用云服务。",
		"state.expiring.title": "云服务资源即将耗尽",
		"state.expiring.description": "请及时升级套餐，以免云服务暂停影响应用使用。",
		"state.expiring.badge": "额度即将耗尽",
		"state.exhausted.title": "当前应用的云服务已暂停",
		"state.exhausted.daysDescription": "云服务已暂停，数据最长保留 15 天，目前还剩 {days} 天。",
		"state.exhausted.todayDescription": "云服务已暂停，数据将于 {deadline} 永久删除。",
		"state.exhausted.recoveryDescription": "升级至 {planName} 可恢复云服务和数据；逾期数据将永久删除，无法找回。",
		"state.exhausted.recoveryFallbackDescription": "升级套餐可恢复云服务和数据；逾期数据将永久删除，无法找回。",
		"state.exhausted.todayRecoveryDescription": "请及时升级至 {planName}；逾期数据将永久删除，无法找回。",
		"state.exhausted.todayRecoveryFallbackDescription": "请及时升级套餐；逾期数据将永久删除，无法找回。",
		"state.exhaustedUrgent.title": "云服务即将被销毁",
		"state.exhaustedUrgent.description": "距离销毁不足 24 小时，请立即升级套餐。销毁后的数据无法恢复。",
		"state.destroyed.title": "当前应用的云服务资源已删除",
		"state.destroyed.description": "原云服务数据已无法恢复，你可以为应用创建新的云服务。",
		"state.destroyed.dataGoneDescription": "原数据已永久删除，无法恢复。",
		"state.destroyed.recreateDescription": "你可以创建新的云服务，重新使用数据库、身份认证等功能。",
		"state.destroyed.upgradeDescription": "应用本身仍会保留。升级套餐后，可为当前应用重新创建云服务。",
		"state.destroyed.action": "创建新的云服务",
		"state.provisioning.title": "云服务创建中",
		"state.provisioning.description": "资源正在准备和配置，请稍候。",
		"state.provisionFailed.title": "云服务创建失败",
		"state.provisionFailed.description": "暂时无法完成资源创建，请重试。",
		"state.destroying.title": "云服务销毁中",
		"state.destroying.description": "资源正在销毁，完成前请勿重复操作。",
		"state.unavailable.title": "暂时无法获取云服务状态",
		"state.unavailable.description": "请稍后刷新重试。",
		"state.unknownDeadline.description": "云服务已暂停，数据保留期限暂未同步。升级套餐可恢复云服务和数据。",
		"workspace.capabilityUnavailable.title": "功能暂未开放",
		"workspace.capabilityUnavailable.description": "该模块的管理接口尚未就绪。",
		"workspace.navigation.title": "云服务",
		"workspace.navigation.collapse": "收起云服务导航",
		"workspace.navigation.expand": "展开云服务导航",
		"database.section.data": "数据",
		"database.section.functions": "函数",
		"database.section.permissions": "权限",
		"database.data.title": "数据库数据",
		"database.table.placeholder": "选择数据表",
		"database.table.description": "描述：{description}",
		"database.table.empty": "暂无数据",
		"database.table.none": "暂无数据表",
		"database.row.add": "添加行",
		"database.row.insert": "插入行",
		"database.row.edit": "编辑",
		"database.row.delete": "删除行",
		"database.row.deleteConfirm": "确定删除这行数据？",
		"database.row.deleteConfirmDesc": "此操作不可撤销。",
		"database.row.noPrimaryKey": "该表没有主键，无法编辑或删除行",
		"database.row.unavailable": "行级新增接口尚未提供",
		"database.columns": "列设置",
		"database.columns.unavailable": "列设置能力尚未提供",
		"database.exportCsv": "导出 CSV",
		"database.pagination.total": "共 {total} 条",
		"database.filter": "筛选",
		"database.filter.add": "添加条件",
		"database.filter.column": "列",
		"database.filter.operator": "运算符",
		"database.filter.value": "值",
		"database.filter.apply": "应用",
		"database.filter.clear": "清除",
		"database.filter.remove": "移除筛选条件",
		"database.filter.active": "{count} 个筛选",
		"database.filter.op.eq": "等于",
		"database.filter.op.neq": "不等于",
		"database.filter.op.gt": "大于",
		"database.filter.op.gte": "大于等于",
		"database.filter.op.lt": "小于",
		"database.filter.op.lte": "小于等于",
		"database.filter.op.like": "包含",
		"database.filter.op.is_null": "为空",
		"database.filter.op.is_not_null": "不为空",
		"database.sort.clear": "取消排序",
		"common.save": "保存",
		"common.cancel": "取消",
		"common.delete": "删除",
		"database.functions.readOnly": "通过只读 SQL 查询数据库函数元数据；本期不提供执行或编辑入口。",
		"database.functions.schema": "Schema",
		"database.functions.name": "函数名称",
		"database.functions.kind": "类型",
		"database.functions.arguments": "参数",
		"database.functions.returnType": "返回类型",
		"database.functions.empty": "暂无数据库函数",
		"database.permissions.summary": "RLS 状态汇总",
		"database.permissions.summaryCounts": "{enabled}/{total} 张表已开启 · {policies} 条策略",
		"database.permissions.policy": "策略名称",
		"database.permissions.command": "操作",
		"database.permissions.roles": "角色",
		"database.permissions.enabled": "RLS 已开启",
		"database.permissions.statusUnknown": "RLS 未开启或状态未同步",
		"database.permissions.readOnly": "本期支持查看 RLS 策略；新增、编辑与删除能力暂未开放。",
		"database.permissions.emptyEnabled": "已开启 RLS，但暂无策略；请确认默认拒绝行为符合预期。",
		"database.permissions.emptyDisabled": "RLS 未开启或状态未同步，暂无可展示策略。",
		"database.loadFailed.title": "数据库加载失败",
		"auth.provider.email.title": "邮箱",
		"auth.provider.email.description": "使用邮箱和密码进行用户注册和登录",
		"auth.provider.phone.title": "手机验证码",
		"auth.provider.phone.description": "使用手机短信验证码进行用户注册和登录",
		"auth.provider.google.title": "Google",
		"auth.provider.google.description": "使用 Google 账号一键登录",
		"auth.provider.wechatMiniProgram.title": "微信授权登录",
		"auth.provider.wechatMiniProgram.description": "使用微信小程序授权登录",
		"auth.provider.status.enabled": "已开启",
		"auth.provider.status.disabled": "未开启",
		"auth.provider.status.degraded": "配置异常",
		"auth.provider.status.unknown": "状态未同步",
		"auth.error.configChanged": "配置已变化，已刷新到最新版本，请重新确认后保存。",
		"auth.error.secretRequired": "配置已修改，请重新输入密钥或密码后保存。",
		"auth.error.clientIdRequired": "使用自定义凭据时必须填写 Client ID。",
		"auth.detail.back": "返回",
		"auth.detail.cancel": "取消",
		"auth.detail.save": "保存",
		"auth.detail.saveSuccess": "保存成功",
		"auth.detail.copyUri": "复制地址",
		"auth.google.detail.title": "Google 设置",
		"auth.google.detail.subtitle": "配置 Google OAuth 登录方式",
		"auth.google.detail.enableLabel": "启用 Google 登录",
		"auth.google.detail.enableDescription": "允许用户使用 Google 账号登录应用",
		"auth.google.detail.credentialMode": "凭据来源",
		"auth.google.detail.platformManaged": "平台托管",
		"auth.google.detail.platformManagedDescription": "使用平台提供的 OAuth 凭据，无需额外配置",
		"auth.google.detail.customCredential": "自定义凭据",
		"auth.google.detail.customCredentialDescription": "使用你自己的 Google Cloud OAuth 凭据",
		"auth.google.detail.customInfo": "你需要在 Google Cloud Console 中创建 OAuth 2.0 客户端 ID，并将下方的重定向 URI 添加到授权回调地址中。",
		"auth.google.detail.redirectUriLabel": "请将此重定向 URI 添加到你的 Google Cloud 控制台",
		"auth.google.detail.clientId": "Client ID",
		"auth.google.detail.clientIdDescription": "你的 Google OAuth 客户端 ID",
		"auth.google.detail.clientIdPlaceholder": "输入 Client ID",
		"auth.google.detail.clientSecret": "Client Secret",
		"auth.google.detail.clientSecretDescription": "你的 Google OAuth 客户端密钥",
		"auth.google.detail.clientSecretPlaceholder": "输入 Client Secret",
		"auth.google.detail.clientSecretConfiguredPlaceholder": "已配置；留空则保持不变",
		"auth.phone.detail.title": "手机验证码设置",
		"auth.phone.detail.subtitle": "配置手机短信验证码登录方式",
		"auth.phone.detail.enableLabel": "启用手机验证码登录",
		"auth.phone.detail.enableDescription": "允许用户通过手机短信验证码注册和登录",
		"auth.phone.detail.signatureMode": "短信签名",
		"auth.phone.detail.platformManaged": "平台托管",
		"auth.phone.detail.platformManagedDescription": "使用平台提供的短信签名「workbuddy」，无需额外配置",
		"auth.phone.detail.customSignature": "自定义签名",
		"auth.phone.detail.customSignatureDescription": "使用你自己的短信签名（暂未开放）",
		"auth.wechatMiniProgram.detail.title": "微信授权登录设置",
		"auth.wechatMiniProgram.detail.subtitle": "配置微信小程序授权登录方式",
		"auth.wechatMiniProgram.detail.enableLabel": "启用微信授权登录",
		"auth.wechatMiniProgram.detail.enableDescription": "允许用户通过微信小程序授权登录应用",
		"auth.email.detail.title": "邮箱设置",
		"auth.email.detail.subtitle": "配置邮箱登录方式及邮件发送",
		"auth.email.detail.enableLabel": "启用邮箱登录",
		"auth.email.detail.enableDescription": "允许用户使用邮箱和密码进行注册和登录",
		"auth.email.detail.smtpSection": "SMTP 配置",
		"auth.email.detail.smtpPlatform": "平台托管",
		"auth.email.detail.smtpPlatformDescription": "使用平台默认的邮件发送服务",
		"auth.email.detail.smtpCustom": "自定义 SMTP",
		"auth.email.detail.smtpCustomDescription": "使用你自己的 SMTP 服务器发送邮件",
		"auth.email.detail.smtpHost": "SMTP 主机",
		"auth.email.detail.smtpHostDescription": "SMTP 服务器地址",
		"auth.email.detail.smtpPort": "端口",
		"auth.email.detail.smtpSecurity": "安全模式",
		"auth.email.detail.smtpUsername": "用户名",
		"auth.email.detail.smtpPassword": "密码",
		"auth.email.detail.smtpPasswordPlaceholder": "输入 SMTP 密码",
		"auth.email.detail.smtpPasswordConfiguredPlaceholder": "已配置；留空则保持不变",
		"auth.email.detail.smtpSender": "发件人邮箱",
		"auth.email.detail.templateSection": "邮件模板",
		"auth.email.detail.templatePlatform": "平台默认",
		"auth.email.detail.templatePlatformDescription": "使用平台提供的标准邮件模板",
		"auth.email.detail.templateCustom": "自定义模板",
		"auth.email.detail.templateCustomDescription": "使用你自己的 HTML 邮件模板",
		"auth.email.detail.templateLoginZh": "登录验证码模板（中文）",
		"auth.email.detail.templateLoginEn": "登录验证码模板（英文）",
		"auth.email.detail.templateDefaultZh": "默认通知模板（中文）",
		"auth.email.detail.templateDefaultEn": "默认通知模板（英文）",
		"auth.email.detail.templateNote": "模板必须包含验证码变量：{{.VerificationCode}}。",
		"storage.breadcrumb.ariaLabel": "文件存储路径",
		"storage.breadcrumb.root": "存储",
		"storage.action.createFolder": "新建文件夹",
		"storage.action.upload": "上传文件",
		"storage.action.download": "下载",
		"storage.action.delete": "删除",
		"storage.action.refresh": "刷新",
		"storage.action.sharedOnly": "请进入应用共享空间后操作。",
		"storage.action.opensApplicationShared": "将在应用共享空间中操作。",
		"storage.upload.uploading": "上传中",
		"storage.upload.invalidName": "文件名“{name}”无效，请修改后重试。",
		"storage.upload.sizeExceeded": "文件“{name}”超过 20 MB，无法上传。",
		"storage.upload.failed": "文件“{name}”上传失败，请重试。",
		"storage.upload.prepareFailed": "文件“{name}”准备上传失败，请重试。",
		"storage.upload.alreadyExists": "文件“{name}”已存在，请勿重复上传。",
		"storage.upload.authorizationExpired": "文件“{name}”的上传凭证已过期，请重新选择文件。",
		"storage.upload.directFailed": "文件“{name}”直传存储失败，请检查网络或存储跨域配置后重试。",
		"storage.upload.commitFailed": "文件“{name}”提交失败，列表已刷新，请检查后重试。",
		"storage.delete.title": "确认删除所选文件？",
		"storage.delete.summary": "将删除 {fileCount} 个文件、{folderCount} 个文件夹，共 {size}。此操作不可撤销。",
		"storage.delete.morePaths": "还有更多路径未显示。",
		"storage.delete.partial": "部分文件删除失败，列表已刷新，请检查后重试。",
		"storage.delete.failed": "文件删除失败，列表已刷新，请重试。",
		"storage.column.name": "名称",
		"storage.column.size": "文件大小",
		"storage.column.createdAt": "创建时间",
		"storage.column.updatedAt": "最后修改",
		"storage.empty": "暂无文件",
		"storage.emptyFolder": "当前文件夹为空，可上传文件或新建子文件夹。",
		"storage.selected": "已选择 {count} 项",
		"storage.createFolder.title": "新建文件夹",
		"storage.createFolder.placeholder": "输入文件夹名称",
		"storage.createFolder.create": "创建",
		"storage.createFolder.cancel": "取消",
		"storage.createFolder.success": "文件夹“{name}”创建成功",
		"storage.createFolder.failed": "新建文件夹失败，请稍后重试。",
		"storage.createFolder.errorEmpty": "文件夹名称不能为空",
		"storage.createFolder.errorInvalidChars": "文件夹名称不能包含 / \\ : * ? \" < > |",
		"storage.createFolder.errorConflict": "同名文件或文件夹已存在，请更换名称。",
		"storage.createFolder.errorRejected": "文件夹名称或层级不符合要求，请修改后重试。",
		"storage.detail.download": "下载",
		"storage.detail.delete": "删除",
		"storage.detail.type": "类型",
		"storage.detail.owner": "所有者",
		"storage.detail.lastAccessedAt": "最后访问",
		"storage.loadFailed.title": "文件存储加载失败",
		"storage.capabilityUnavailable.description": "对象存储管理接口尚未提供，本期不会展示伪数据。",
		"analytics.overview.title": "数据概览",
		"analytics.metric.total": "总用户数",
		"analytics.metric.today": "今日新增",
		"analytics.metric.week": "本周新增",
		"analytics.trend.title": "注册趋势",
		"analytics.trend.ariaLabel": "用户注册趋势图",
		"analytics.range.7d": "近7天",
		"analytics.range.30d": "近30天",
		"analytics.range.90d": "近90天",
		"analytics.users.title": "用户列表 ({count})",
		"analytics.users.name": "名称",
		"analytics.users.email": "邮箱",
		"analytics.empty": "暂无数据",
		"analytics.loadFailed.title": "数据统计加载失败"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/i18n/index.ts
function subscribe(listener) {
	return onLocaleChange(() => listener());
}
function getSnapshot() {
	return getLocale();
}
function getCloudServiceI18nText(key, params, locale = getLocale()) {
	const text = (locale.toLowerCase().startsWith("en") ? en : zh)[key] ?? zh[key] ?? key;
	if (!params) return text;
	return Object.entries(params).reduce((result, [name, value]) => result.replaceAll(`{${name}}`, String(value)), text);
}
function useCloudServiceI18n() {
	const locale = (0, import_react$33.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
	return (0, import_react$33.useCallback)((key, params) => getCloudServiceI18nText(key, params, locale), [locale]);
}
var import_react$33;
var init_i18n = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_i18n$1();
	init_en();
	init_zh();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/utils/normalize-cloud-service-state.ts
function resolveQuotaState(canActivate, availableState, exhaustedState) {
	return canActivate ? availableState : exhaustedState;
}
function resolveCreditsExhaustedState(isolateEndTime, nowMs) {
	if (!isolateEndTime) return "credits_exhausted_unknown_deadline";
	const isoParts = ISO_8601_TIMESTAMP.exec(isolateEndTime);
	if (!isoParts) return "credits_exhausted_unknown_deadline";
	const year = Number(isoParts[1]);
	const month = Number(isoParts[2]);
	if (Number(isoParts[3]) > new Date(Date.UTC(year, month, 0)).getUTCDate()) return "credits_exhausted_unknown_deadline";
	const isolateEndTimeMs = Date.parse(isolateEndTime);
	if (!Number.isFinite(isolateEndTimeMs)) return "credits_exhausted_unknown_deadline";
	return isolateEndTimeMs - nowMs > ONE_DAY_IN_MS ? "credits_exhausted_more_than_24h" : "credits_exhausted_less_than_24h";
}
/**
* 将接口快照归一为产品展示状态。无法可靠判断时返回技术态，不能降级成“未启用”。
*/
function normalizeCloudServiceViewState(overview, canActivate = true, nowMs = Date.now()) {
	const { provisionStatus, billingStatus } = overview;
	if (provisionStatus === "failed") return "provision_failed";
	if (provisionStatus === "destroying") return "destroying";
	if (provisionStatus && PROVISIONING_STATUSES.has(provisionStatus)) return "provisioning";
	const hasNoResource = !overview.resourceId;
	const isDestroyedSnapshot = hasNoResource && (provisionStatus === void 0 || provisionStatus === "destroyed") && (billingStatus === void 0 || billingStatus === "destroyed");
	if (!overview.activated && overview.lifecycleState === "destroyed" && isDestroyedSnapshot) return resolveQuotaState(canActivate, "destroyed_available", "destroyed_quota_exhausted");
	const isNeverEnabledSnapshot = hasNoResource && provisionStatus === void 0 && billingStatus === void 0;
	if (!overview.activated && overview.lifecycleState === "never_enabled" && isNeverEnabledSnapshot) return resolveQuotaState(canActivate, "not_enabled_available", "not_enabled_quota_exhausted");
	if (!overview.activated) return "unavailable";
	if (provisionStatus !== "assigned") return "unavailable";
	if (billingStatus === "normal" || billingStatus === "expiring") return billingStatus;
	if (billingStatus === "credits_exhausted") return resolveCreditsExhaustedState(overview.isolateEndTime, nowMs);
	return "unavailable";
}
function deriveCloudServiceAvailability(overview, canActivate = true, nowMs = Date.now()) {
	const viewState = normalizeCloudServiceViewState(overview, canActivate, nowMs);
	return {
		hasActiveCloudBinding: overview.activated && overview.provisionStatus !== "destroying" && overview.provisionStatus !== "destroyed" && overview.billingStatus !== "destroyed",
		canAccessModules: overview.activated && (viewState === "normal" || viewState === "expiring"),
		canPublish: PUBLISHABLE_STATES.has(viewState),
		viewState
	};
}
var ONE_DAY_IN_MS, ISO_8601_TIMESTAMP, PROVISIONING_STATUSES, PUBLISHABLE_STATES;
var init_normalize_cloud_service_state = __esmMin((() => {
	ONE_DAY_IN_MS = 864e5;
	ISO_8601_TIMESTAMP = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/u;
	PROVISIONING_STATUSES = /* @__PURE__ */ new Set([
		"ordering",
		"creating",
		"configuring",
		"ready"
	]);
	PUBLISHABLE_STATES = /* @__PURE__ */ new Set([
		"not_enabled_available",
		"not_enabled_quota_exhausted",
		"normal",
		"expiring"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/utils/format-cloud-service-date-time.ts
function pad(value) {
	return String(value).padStart(2, "0");
}
/** Formats an ISO date-time in the user's local timezone for cloud-service UI display. */
function formatCloudServiceDateTime(value) {
	if (!ISO_DATE_TIME_PREFIX.test(value)) return value;
	const date = new Date(value);
	if (!Number.isFinite(date.getTime())) return value;
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
var ISO_DATE_TIME_PREFIX;
var init_format_cloud_service_date_time = __esmMin((() => {
	ISO_DATE_TIME_PREFIX = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/u;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/utils/index.ts
var init_utils = __esmMin((() => {
	init_normalize_cloud_service_state();
	init_format_cloud_service_date_time();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-onboarding-view.scss
var init_cloud_service_onboarding_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-onboarding-view.tsx
function CloudServiceOnboardingView({ canActivate, actionBusy = false, operationPending = false, provisionState = "idle", actionError, onEnable, onUpgrade, onRecovery }) {
	const t = useCloudServiceI18n();
	const intent = canActivate ? "enable" : "upgrade";
	const showRecovery = Boolean(operationPending && actionError && onRecovery);
	const handleAction = showRecovery ? onRecovery : canActivate ? onEnable : onUpgrade;
	const showLoading = !showRecovery && (actionBusy || provisionState === "provisioning" || operationPending && !actionError);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("section", {
		className: "cloud-service-onboarding",
		"data-intent": intent,
		"aria-busy": showLoading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("h2", {
				className: "cloud-service-onboarding__title",
				children: t("onboarding.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("ul", {
				className: "cloud-service-onboarding__cards",
				children: CAPABILITY_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("li", {
					className: "cloud-service-onboarding__card",
					"data-module": card.key,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("span", {
						className: "cloud-service-onboarding__card-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
							className: "cloud-service-onboarding__card-icon",
							"aria-hidden": "true",
							children: card.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
							className: "cloud-service-onboarding__card-title",
							children: t(`onboarding.card.${card.key}.title`)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
						className: "cloud-service-onboarding__card-description",
						children: t(`onboarding.card.${card.key}.description`)
					})]
				}, card.key))
			}),
			canActivate ? null : /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", {
				className: "cloud-service-onboarding__quota-note",
				children: t("onboarding.quotaExhausted.note")
			}),
			actionError ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", {
				className: "cloud-service-onboarding__error",
				role: "alert",
				children: actionError
			}) : null,
			handleAction ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
				className: "cloud-service-onboarding__action",
				variant: "primary",
				size: "large",
				loading: showLoading,
				onClick: handleAction,
				children: showRecovery ? t("common.refresh") : canActivate ? provisionState === "provisioning" ? t("onboarding.action.provisioning") : provisionState === "failed" ? t("onboarding.action.provisionFailed") : t("onboarding.action.enable") : t("common.upgrade")
			}) : null
		]
	});
}
var import_jsx_runtime$24, CAPABILITY_CARDS;
var init_cloud_service_onboarding_view = __esmMin((() => {
	init_cloud_service_onboarding_view$1();
	init_src();
	require_react();
	init_i18n();
	import_jsx_runtime$24 = require_jsx_runtime();
	CAPABILITY_CARDS = [
		{
			key: "database",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DatabaseToolIcon, { size: "md" })
		},
		{
			key: "storage",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SaveIcon, { size: "md" })
		},
		{
			key: "auth",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(WbPersonalIcon, { size: "md" })
		},
		{
			key: "analytics",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(WbAnalyticsIcon, { size: "md" })
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-state-view.scss
var init_cloud_service_state_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/assets/tcb-quota-empty.svg
var tcb_quota_empty_default;
var init_tcb_quota_empty = __esmMin((() => {
	tcb_quota_empty_default = "" + new URL("tcb-quota-empty-BAiR-HW_.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-state-view.tsx
function formatDeadline(isolateEndTime) {
	if (!isolateEndTime) return "";
	const date = new Date(isolateEndTime);
	if (!Number.isFinite(date.getTime())) return "";
	const now = /* @__PURE__ */ new Date();
	const isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
	const hh = String(date.getHours()).padStart(2, "0");
	const mm = String(date.getMinutes()).padStart(2, "0");
	if (isToday) return `${hh}:${mm}`;
	return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${hh}:${mm}`;
}
function getRemainingDays(isolateEndTime) {
	if (!isolateEndTime) return 1;
	const deadline = new Date(isolateEndTime).getTime();
	if (!Number.isFinite(deadline)) return 1;
	return Math.max(1, Math.ceil((deadline - Date.now()) / MS_PER_DAY$1));
}
function getPresentation(viewState, t, isolateEndTime, recommendedPlanDisplayName) {
	const cloudIcon = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(CloudToolIcon, { size: "xl" });
	const warningIcon = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(WarningOutlineIcon, { size: "xl" });
	const errorIcon = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ErrorCircleIcon, { size: "xl" });
	switch (viewState) {
		case "not_enabled_available": return {
			title: t("state.notEnabled.title"),
			description: [t("state.notEnabled.description")],
			icon: cloudIcon,
			action: "enable",
			actionLabel: t("state.notEnabled.action")
		};
		case "not_enabled_quota_exhausted": return {
			title: t("state.noQuota.title"),
			description: [t("state.noQuota.description")],
			icon: warningIcon,
			action: "upgrade",
			actionLabel: t("common.upgrade")
		};
		case "credits_exhausted_more_than_24h": return {
			title: t("state.exhausted.title"),
			description: [t("state.exhausted.daysDescription", { days: getRemainingDays(isolateEndTime) }), recommendedPlanDisplayName ? t("state.exhausted.recoveryDescription", { planName: recommendedPlanDisplayName }) : t("state.exhausted.recoveryFallbackDescription")],
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
				src: tcb_quota_empty_default,
				alt: ""
			}),
			action: "upgrade",
			actionLabel: t("common.upgrade"),
			productStatus: true
		};
		case "credits_exhausted_less_than_24h":
			if (isolateEndTime && new Date(isolateEndTime).getTime() <= Date.now()) return {
				title: t("state.destroyed.title"),
				description: [t("state.destroyed.description")],
				icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
					src: tcb_quota_empty_default,
					alt: ""
				}),
				action: "upgrade",
				actionLabel: t("common.upgrade"),
				productStatus: true
			};
			return {
				title: t("state.exhausted.title"),
				description: [t("state.exhausted.todayDescription", { deadline: formatDeadline(isolateEndTime) }), recommendedPlanDisplayName ? t("state.exhausted.todayRecoveryDescription", { planName: recommendedPlanDisplayName }) : t("state.exhausted.todayRecoveryFallbackDescription")],
				icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
					src: tcb_quota_empty_default,
					alt: ""
				}),
				action: "upgrade",
				actionLabel: t("common.upgrade"),
				productStatus: true
			};
		case "credits_exhausted_unknown_deadline": return {
			title: t("state.exhausted.title"),
			description: [t("state.unknownDeadline.description")],
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
				src: tcb_quota_empty_default,
				alt: ""
			}),
			action: "upgrade",
			actionLabel: t("common.upgrade"),
			productStatus: true
		};
		case "destroyed_available": return {
			title: t("state.destroyed.title"),
			description: [t("state.destroyed.dataGoneDescription"), t("state.destroyed.recreateDescription")],
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
				src: tcb_quota_empty_default,
				alt: ""
			}),
			action: "recreate",
			actionLabel: t("state.destroyed.action"),
			productStatus: true
		};
		case "destroyed_quota_exhausted": return {
			title: t("state.destroyed.title"),
			description: [t("state.destroyed.dataGoneDescription"), t("state.destroyed.upgradeDescription")],
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
				src: tcb_quota_empty_default,
				alt: ""
			}),
			action: "upgrade",
			actionLabel: t("common.upgrade"),
			productStatus: true
		};
		case "provisioning": return {
			title: t("state.provisioning.title"),
			description: [t("state.provisioning.description")],
			icon: cloudIcon,
			pending: true
		};
		case "provision_failed": return {
			title: t("state.provisionFailed.title"),
			description: [t("state.provisionFailed.description")],
			icon: errorIcon,
			action: "provision_retry",
			actionLabel: t("common.retry")
		};
		case "destroying": return {
			title: t("state.destroying.title"),
			description: [t("state.destroying.description")],
			icon: cloudIcon,
			action: "retry",
			actionLabel: t("common.refresh"),
			pending: true
		};
		case "unavailable": return {
			title: t("state.unavailable.title"),
			description: [t("state.unavailable.description")],
			icon: errorIcon,
			action: "retry",
			actionLabel: t("common.retry")
		};
	}
}
function CloudServiceStateView({ viewState, actionBusy = false, operationPending = false, actionError, isolateEndTime, recommendedPlanDisplayName, onProvision, onProvisionRetry, onUpgrade, onRetry }) {
	const t = useCloudServiceI18n();
	const presentation = getPresentation(viewState, t, isolateEndTime, recommendedPlanDisplayName?.trim() || void 0);
	const handleAction = () => {
		switch (presentation.action) {
			case "enable":
			case "recreate":
				onProvision?.(presentation.action);
				break;
			case "upgrade":
				onUpgrade?.();
				break;
			case "provision_retry":
				onProvisionRetry?.();
				break;
			case "retry": onRetry?.();
		}
	};
	let actionAvailable = false;
	switch (presentation.action) {
		case "enable":
		case "recreate":
			actionAvailable = Boolean(onProvision);
			break;
		case "upgrade":
			actionAvailable = Boolean(onUpgrade);
			break;
		case "provision_retry":
			actionAvailable = Boolean(onProvisionRetry);
			break;
		case "retry": actionAvailable = Boolean(onRetry);
	}
	const showRefreshRecovery = Boolean(operationPending && actionError && onRetry);
	const showLoading = actionBusy || operationPending && !actionError;
	const statePending = presentation.pending && !actionError;
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("section", {
		className: ["cloud-service-state-view", presentation.productStatus && "cloud-service-state-view--product-status"].filter(Boolean).join(" "),
		"data-view-state": viewState,
		"aria-busy": statePending || showLoading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "cloud-service-state-view__icon",
				"aria-hidden": "true",
				children: presentation.pending ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Loading, { size: "large" }) : presentation.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("h2", {
				className: "cloud-service-state-view__title",
				children: presentation.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("p", {
				className: "cloud-service-state-view__description",
				children: presentation.description.map((line) => /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", { children: line }, line))
			}),
			actionError ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("p", {
				className: "cloud-service-state-view__error",
				role: "alert",
				children: actionError
			}) : null,
			presentation.action && actionAvailable && !showRefreshRecovery ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
				className: "cloud-service-state-view__action",
				variant: "primary",
				loading: showLoading,
				onClick: handleAction,
				children: presentation.actionLabel
			}) : null,
			showRefreshRecovery ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
				className: "cloud-service-state-view__action",
				variant: "secondary",
				loading: actionBusy,
				onClick: onRetry,
				children: t("common.refresh")
			}) : null
		]
	});
}
var import_jsx_runtime$23, MS_PER_DAY$1;
var init_cloud_service_state_view = __esmMin((() => {
	init_cloud_service_state_view$1();
	init_src();
	require_react();
	init_tcb_quota_empty();
	init_i18n();
	import_jsx_runtime$23 = require_jsx_runtime();
	MS_PER_DAY$1 = 864e5;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-workspace.scss
var init_cloud_service_workspace$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-workspace.tsx
function CloudServiceWorkspace({ activeModule, defaultModule = "database", onModuleChange, moduleRenderers }) {
	const t = useCloudServiceI18n();
	const [internalModule, setInternalModule] = (0, import_react$30.useState)(defaultModule);
	const [collapsed, setCollapsed] = (0, import_react$30.useState)(false);
	const selectedModule = activeModule ?? internalModule;
	const selectedContent = moduleRenderers?.[selectedModule] ?? /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("section", {
		className: "cloud-service-workspace__unavailable",
		"data-module": selectedModule,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h2", { children: t("workspace.capabilityUnavailable.title") }), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("p", { children: t("workspace.capabilityUnavailable.description") })]
	});
	const selectModule = (module) => {
		if (activeModule === void 0) setInternalModule(module);
		onModuleChange?.(module);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("section", {
		className: `cloud-service-workspace${collapsed ? " cloud-service-workspace--collapsed" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("nav", {
			className: "cloud-service-workspace__navigation",
			"aria-label": t("workspace.navigation.title"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "cloud-service-workspace__navigation-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", { children: t("workspace.navigation.title") }), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("button", {
					type: "button",
					className: "cloud-service-workspace__collapse",
					"aria-label": collapsed ? t("workspace.navigation.expand") : t("workspace.navigation.collapse"),
					"aria-pressed": collapsed,
					onClick: () => setCollapsed((value) => !value),
					children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(SidebarExpandIcon, { size: "md" }) : /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(SidebarCollapseIcon, { size: "md" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
				className: "cloud-service-workspace__navigation-list",
				children: MODULE_KEYS.map((module) => {
					const label = t(`module.${module}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("button", {
						type: "button",
						className: "cloud-service-workspace__navigation-item",
						"aria-current": module === selectedModule ? "page" : void 0,
						"aria-label": label,
						title: label,
						onClick: () => selectModule(module),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
							className: "cloud-service-workspace__navigation-icon",
							"aria-hidden": "true",
							children: MODULE_ICONS[module]
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
							className: "cloud-service-workspace__navigation-label",
							children: label
						})]
					}, module);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
			className: "cloud-service-workspace__panel",
			role: "region",
			"aria-label": t(`module.${selectedModule}`),
			children: selectedContent
		})]
	});
}
var import_react$30, import_jsx_runtime$22, MODULE_KEYS, MODULE_ICONS;
var init_cloud_service_workspace = __esmMin((() => {
	init_cloud_service_workspace$1();
	init_src();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$22 = require_jsx_runtime();
	MODULE_KEYS = [
		"database",
		"storage",
		"auth",
		"analytics"
	];
	MODULE_ICONS = {
		database: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DatabaseToolIcon, { size: "md" }),
		storage: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(SaveIcon, { size: "md" }),
		auth: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(WbPersonalIcon, { size: "md" }),
		analytics: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(WbAnalyticsIcon, { size: "md" })
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/cloud-service-manager-view.tsx
/** 只驱动耗尽页的本地天数/24h 边界展示，不发起网络请求。 */
function useIsolationPresentationClock(overview) {
	const [clockRevision, setClockRevision] = (0, import_react$29.useState)(0);
	const nowMs = Date.now();
	(0, import_react$29.useEffect)(() => {
		if (overview?.billingStatus !== "credits_exhausted" || !overview.isolateEndTime) return;
		const isolateEndTimeMs = Date.parse(overview.isolateEndTime);
		const remainingMs = isolateEndTimeMs - Date.now();
		if (!Number.isFinite(isolateEndTimeMs) || remainingMs <= MS_PER_DAY) return;
		const nextDayBoundaryMs = remainingMs - (Math.ceil(remainingMs / MS_PER_DAY) - 1) * MS_PER_DAY + 1;
		const timer = window.setTimeout(() => setClockRevision((previous) => previous + 1), nextDayBoundaryMs);
		return () => window.clearTimeout(timer);
	}, [
		clockRevision,
		overview?.billingStatus,
		overview?.isolateEndTime
	]);
	return nowMs;
}
function isWorkspaceState(viewState) {
	return viewState === "normal" || viewState === "expiring";
}
function CloudServiceManagerView({ overview, canActivate = true, initialLoading = false, refreshing = false, loadError, actionBusy = false, actionError, actionErrorCode, provisionPendingConfirmation = false, pendingProvisionAction = null, provisionRefreshFailed = false, activeModule, defaultModule, workspaceScopeKey, moduleRenderers, showExpiringBadge = true, onModuleChange, onProvision, onProvisionRetry, onProvisionRefreshRetry, onUpgrade, resolvePlanDisplayName, onRefresh, onAvailabilityChange }) {
	const t = useCloudServiceI18n();
	const nowMs = useIsolationPresentationClock(overview);
	const availability = (0, import_react$29.useMemo)(() => overview ? deriveCloudServiceAvailability(overview, canActivate, nowMs) : null, [
		canActivate,
		nowMs,
		overview
	]);
	const recommendedPlanDisplayName = (0, import_react$29.useMemo)(() => {
		const planId = overview?.recommendedPlanId?.trim();
		if (!planId || !resolvePlanDisplayName) return;
		try {
			return resolvePlanDisplayName(planId)?.trim() || void 0;
		} catch {
			return;
		}
	}, [overview?.recommendedPlanId, resolvePlanDisplayName]);
	(0, import_react$29.useEffect)(() => {
		if (availability) onAvailabilityChange?.(availability);
	}, [availability, onAvailabilityChange]);
	(0, import_react$29.useEffect)(() => {
		if (loadError && overview && availability?.canAccessModules) message.error({
			content: t("common.loadFailed"),
			key: `cloud-service-overview-error:${overview.applicationId}`
		});
	}, [
		availability?.canAccessModules,
		loadError,
		overview,
		t
	]);
	if (initialLoading && !overview) return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("section", {
		className: "cloud-service-manager-view cloud-service-manager-view--loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Loading, {
			size: "large",
			tip: t("common.loading")
		})
	});
	if (!overview || !availability) return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("section", {
		className: "cloud-service-manager-view",
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CloudServiceStateView, {
			viewState: "unavailable",
			actionError: loadError ? t("common.loadFailed") : null,
			onRetry: onRefresh
		})
	});
	if (!availability.canAccessModules) {
		const blockingViewState = isWorkspaceState(availability.viewState) ? "unavailable" : availability.viewState;
		const inferredPendingAction = blockingViewState === "not_enabled_available" || blockingViewState === "not_enabled_quota_exhausted" ? "enable" : blockingViewState === "destroyed_available" || blockingViewState === "destroyed_quota_exhausted" ? "recreate" : null;
		const acceptedProvisionAction = provisionPendingConfirmation ? pendingProvisionAction ?? inferredPendingAction : null;
		const persistedProvisionAction = acceptedProvisionAction ?? overview.provisionAction ?? (overview.lifecycleState === "never_enabled" ? "enable" : overview.lifecycleState === "destroyed" ? "recreate" : null);
		const showAcceptedProvision = Boolean(acceptedProvisionAction);
		const displayViewState = showAcceptedProvision && (blockingViewState === "provisioning" || inferredPendingAction !== null) && acceptedProvisionAction ? acceptedProvisionAction === "enable" ? "not_enabled_available" : "destroyed_available" : blockingViewState;
		let blockingError = null;
		if (showAcceptedProvision && provisionRefreshFailed) blockingError = t("common.syncFailed");
		else if (loadError) blockingError = t("common.loadFailed");
		else if (actionError) blockingError = actionErrorCode === 18371 ? t("common.poolExhausted") : t("common.actionFailed");
		const isNotEnabledState = displayViewState === "not_enabled_available" || displayViewState === "not_enabled_quota_exhausted";
		const onboardingProvisionState = acceptedProvisionAction === "enable" ? "provisioning" : blockingViewState === "provisioning" && persistedProvisionAction === "enable" ? "provisioning" : blockingViewState === "provision_failed" && persistedProvisionAction === "enable" ? "failed" : "idle";
		if (isNotEnabledState || onboardingProvisionState !== "idle") {
			const effectiveCanActivate = onboardingProvisionState !== "idle" ? true : canActivate;
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("section", {
				className: "cloud-service-manager-view",
				"data-view-state": displayViewState,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CloudServiceOnboardingView, {
					canActivate: effectiveCanActivate,
					provisionState: onboardingProvisionState,
					actionBusy,
					operationPending: showAcceptedProvision,
					actionError: blockingError,
					onEnable: onboardingProvisionState === "failed" ? onProvisionRetry : effectiveCanActivate && onProvision ? () => onProvision("enable") : void 0,
					onUpgrade: effectiveCanActivate ? void 0 : onUpgrade,
					onRecovery: showAcceptedProvision && blockingError ? onProvisionRefreshRetry : void 0
				})
			});
		}
		if (displayViewState === "provisioning") return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("section", {
			className: "cloud-service-manager-view cloud-service-manager-view--loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Loading, {
				size: "large",
				tip: t("common.loading")
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("section", {
			className: "cloud-service-manager-view",
			children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CloudServiceStateView, {
				viewState: displayViewState,
				actionBusy,
				operationPending: showAcceptedProvision,
				actionError: blockingError,
				isolateEndTime: overview.isolateEndTime,
				recommendedPlanDisplayName,
				onProvision,
				onProvisionRetry,
				onUpgrade,
				onRetry: showAcceptedProvision && blockingError ? onProvisionRefreshRetry : onRefresh
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("section", {
		className: "cloud-service-manager-view",
		"aria-busy": refreshing || actionBusy,
		"data-view-state": availability.viewState,
		children: [showExpiringBadge && availability.viewState === "expiring" ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
			className: "cloud-service-manager-view__status-bar",
			role: "status",
			children: onUpgrade ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Button, {
				className: "cloud-service-manager-view__status-badge",
				variant: "ghost",
				size: "small",
				loading: actionBusy,
				onClick: onUpgrade,
				children: t("state.expiring.badge")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
				className: "cloud-service-manager-view__status-badge",
				children: t("state.expiring.badge")
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CloudServiceWorkspace, {
			activeModule,
			defaultModule,
			moduleRenderers,
			onModuleChange
		}, workspaceScopeKey)]
	});
}
var import_react$29, import_jsx_runtime$21, MS_PER_DAY;
var init_cloud_service_manager_view = __esmMin((() => {
	init_cloud_service_manager_view$1();
	init_src();
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_utils();
	init_cloud_service_onboarding_view();
	init_cloud_service_state_view();
	init_cloud_service_workspace();
	import_jsx_runtime$21 = require_jsx_runtime();
	MS_PER_DAY = 864e5;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/components/index.ts
var init_components = __esmMin((() => {
	init_cloud_service_manager_view();
	init_cloud_service_onboarding_view();
	init_cloud_service_state_view();
	init_cloud_service_workspace();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/hooks/use-cloud-service-actions.ts
function toMessage(error) {
	return error instanceof Error ? error.message : "Cloud-service action failed";
}
function toErrorCode(error) {
	if (error && typeof error === "object" && "code" in error) {
		const { code } = error;
		return typeof code === "number" ? code : null;
	}
	return null;
}
function isUnsynchronizedProvisionSnapshot(overview) {
	return Boolean(overview && (!overview.activated || overview.provisionStatus !== "assigned"));
}
/**
* 管理组件的外层动作编排。具体副作用由宿主回调完成，本 Hook 只处理并发和刷新。
*/
function useCloudServiceActions({ applicationId, onProvisionRequest, onDeactivateRequest, onUpgradeRequest, onRefresh, onCloudServiceChanged, viewState }) {
	const [actionBusy, setActionBusy] = (0, import_react$28.useState)(false);
	const [actionError, setActionError] = (0, import_react$28.useState)(null);
	const [actionErrorCode, setActionErrorCode] = (0, import_react$28.useState)(null);
	const [provisionPendingConfirmation, setProvisionPendingConfirmation] = (0, import_react$28.useState)(false);
	const [pendingProvisionAction, setPendingProvisionAction] = (0, import_react$28.useState)(null);
	const [provisionRefreshFailed, setProvisionRefreshFailed] = (0, import_react$28.useState)(false);
	const actionEpochRef = (0, import_react$28.useRef)(0);
	const actionBusyRef = (0, import_react$28.useRef)(false);
	useBrowserLayoutEffect(() => {
		++actionEpochRef.current;
		actionBusyRef.current = false;
		setActionBusy(false);
		setActionError(null);
		setActionErrorCode(null);
		setProvisionPendingConfirmation(false);
		setPendingProvisionAction(null);
		setProvisionRefreshFailed(false);
		return () => {
			++actionEpochRef.current;
		};
	}, [applicationId]);
	useBrowserLayoutEffect(() => {
		if (provisionPendingConfirmation && viewState && !PRE_PROVISION_STATES.has(viewState) && viewState !== "provisioning") {
			setProvisionPendingConfirmation(false);
			setPendingProvisionAction(null);
			setProvisionRefreshFailed(false);
		}
	}, [provisionPendingConfirmation, viewState]);
	const runAction = (0, import_react$28.useCallback)(async (operation, successEvent, preserveAcceptedProvision, refreshAfterAction = onRefresh) => {
		if (actionBusyRef.current) return;
		const actionEpoch = ++actionEpochRef.current;
		actionBusyRef.current = true;
		setActionBusy(true);
		setActionError(null);
		setActionErrorCode(null);
		try {
			const result = await operation();
			if (actionEpoch !== actionEpochRef.current) return;
			if (result === "conversation") {
				setPendingProvisionAction(null);
				setProvisionPendingConfirmation(false);
				setProvisionRefreshFailed(false);
				return;
			}
			if (preserveAcceptedProvision) setProvisionPendingConfirmation(true);
			if (successEvent) onCloudServiceChanged?.(successEvent);
			try {
				const refreshedOverview = await refreshAfterAction();
				if (actionEpoch !== actionEpochRef.current) return;
				if (preserveAcceptedProvision) setProvisionRefreshFailed(isUnsynchronizedProvisionSnapshot(refreshedOverview));
			} catch (error) {
				if (actionEpoch !== actionEpochRef.current) return;
				if (preserveAcceptedProvision) {
					setProvisionRefreshFailed(true);
					return;
				}
				throw error;
			}
		} catch (error) {
			if (actionEpoch === actionEpochRef.current) {
				if (preserveAcceptedProvision) {
					setProvisionPendingConfirmation(false);
					setPendingProvisionAction(null);
				}
				setActionError(toMessage(error));
				setActionErrorCode(toErrorCode(error));
			}
		} finally {
			if (actionEpoch === actionEpochRef.current) {
				actionBusyRef.current = false;
				setActionBusy(false);
			}
		}
	}, [onCloudServiceChanged, onRefresh]);
	return {
		actionBusy,
		actionError,
		actionErrorCode,
		provisionPendingConfirmation,
		pendingProvisionAction,
		provisionRefreshFailed,
		requestProvision: (0, import_react$28.useCallback)((action) => {
			if (actionBusyRef.current) return Promise.resolve();
			setPendingProvisionAction(action);
			setProvisionPendingConfirmation(false);
			setProvisionRefreshFailed(false);
			return runAction(() => onProvisionRequest({
				action,
				applicationId
			}), {
				applicationId,
				type: "provision_requested"
			}, true, onRefresh);
		}, [
			applicationId,
			onProvisionRequest,
			onRefresh,
			runAction
		]),
		requestDeactivate: (0, import_react$28.useCallback)(() => {
			if (!onDeactivateRequest) return Promise.resolve();
			return runAction(() => onDeactivateRequest(applicationId), {
				applicationId,
				type: "deactivated"
			});
		}, [
			applicationId,
			onDeactivateRequest,
			runAction
		]),
		requestUpgrade: (0, import_react$28.useCallback)(async () => {
			if (!onUpgradeRequest) return;
			await onUpgradeRequest(applicationId);
		}, [applicationId, onUpgradeRequest]),
		retryProvisionRefresh: (0, import_react$28.useCallback)(() => {
			if (!provisionPendingConfirmation) return Promise.resolve();
			return runAction(async () => void 0, void 0, true, onRefresh);
		}, [
			onRefresh,
			provisionPendingConfirmation,
			runAction
		])
	};
}
var import_react$28, PRE_PROVISION_STATES, useBrowserLayoutEffect;
var init_use_cloud_service_actions = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	PRE_PROVISION_STATES = /* @__PURE__ */ new Set([
		"not_enabled_available",
		"not_enabled_quota_exhausted",
		"destroyed_available",
		"destroyed_quota_exhausted"
	]);
	useBrowserLayoutEffect = typeof window === "undefined" ? import_react$28.useEffect : import_react$28.useLayoutEffect;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/hooks/cloud-service-overview-state.ts
function toCloudServiceOverviewError(value) {
	return value instanceof Error ? value : /* @__PURE__ */ new Error("Failed to load cloud-service overview");
}
var EMPTY_OVERVIEW_STATE;
var init_cloud_service_overview_state = __esmMin((() => {
	EMPTY_OVERVIEW_STATE = {
		applicationId: null,
		overview: null,
		initialLoading: false,
		refreshing: false,
		error: null
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/hooks/use-cloud-service-overview.ts
/**
* Overview 的并发与事件刷新边界。Desktop `wb.http` 不跨 IPC 传 AbortSignal，
* 因此通过 request epoch 丢弃 applicationId 切换后的过期响应。生命周期动作按同步
* 协议只刷新一次；除此之外只在页面聚焦（带 TTL 节流）、手动刷新和 isolateEndTime 到达时刷新。
*
* ## 两类刷新语义（改这个 Hook 前必读）
*
* - **强制刷新** `refresh()`：手动重试、生命周期动作后的同步刷新。忽略 TTL，只共享
*   in-flight，保证调用方一定拿到新快照。
* - **过期才刷** `refreshIfStale(maxAgeMs)`：只给 `focus` 这类环境事件用。距上次
*   **成功**加载不足 `maxAgeMs` 时直接返回已有快照，不发请求。
*
* 把两者混成一个会二选一地出问题：全部节流会让「销毁后重新创建」看不到新状态；
* 全部强制会让聚焦事件把状态接口打成热路径。
*/
function useCloudServiceOverview({ applicationId, source, enabled = true, refreshToken }) {
	const { loadOverview } = source;
	const [state, setState] = (0, import_react$27.useState)(EMPTY_OVERVIEW_STATE);
	const requestEpochRef = (0, import_react$27.useRef)(0);
	const overviewRef = (0, import_react$27.useRef)(null);
	const refreshedIsolationBoundaryRef = (0, import_react$27.useRef)(null);
	const inFlightRef = (0, import_react$27.useRef)(null);
	/**
	* 上次**成功**加载的时刻（毫秒）；`null` 表示当前 scope 还没有成功快照。
	*
	* 只在成功分支写：失败不能算「刚刷过」，否则接口挂了以后聚焦刷新会被节流窗口
	* 一直挡住，用户切回页面永远看不到恢复。
	*/
	const lastSuccessAtMsRef = (0, import_react$27.useRef)(null);
	/**
	* `refreshToken` 的最新值与「已经处理过的值」。
	*
	* 两个 ref 都是为了让 token 刷新与下面 scope 重置那个 effect **不互相触发多余请求**：
	* - `refreshTokenRef`：给 scope 重置 effect 在不把 `refreshToken` 写进依赖的前提下读到最新值
	*   （写进去会让宿主每次 bump 都清空快照、退回 loading，闪一下白）。
	* - `handledRefreshTokenRef`：记录已消费的值。切应用与 bump 恰好同一帧发生时，scope 重置
	*   已经拉了一次新数据，token effect 就不该再补一次。
	*/
	const refreshTokenRef = (0, import_react$27.useRef)(refreshToken);
	refreshTokenRef.current = refreshToken;
	const handledRefreshTokenRef = (0, import_react$27.useRef)(refreshToken);
	const executeRefresh = (0, import_react$27.useCallback)(() => {
		if (!enabled || !applicationId) return Promise.resolve(null);
		if (inFlightRef.current?.applicationId === applicationId) return inFlightRef.current.promise;
		const requestEpoch = ++requestEpochRef.current;
		const hasOverview = overviewRef.current?.applicationId === applicationId;
		setState({
			applicationId,
			overview: hasOverview ? overviewRef.current : null,
			initialLoading: !hasOverview,
			refreshing: hasOverview,
			error: null
		});
		const inFlightRequest = {
			applicationId,
			promise: Promise.resolve(null)
		};
		const request = (async () => {
			try {
				const response = await loadOverview(applicationId);
				if (requestEpoch !== requestEpochRef.current) return null;
				if (response.applicationId !== applicationId) throw new Error("Cloud-service overview application mismatch");
				const overview = { ...response };
				overviewRef.current = overview;
				lastSuccessAtMsRef.current = Date.now();
				setState({
					applicationId,
					overview,
					initialLoading: false,
					refreshing: false,
					error: null
				});
				return overview;
			} catch (error) {
				if (requestEpoch !== requestEpochRef.current) return null;
				const normalizedError = toCloudServiceOverviewError(error);
				setState((previous) => ({
					...previous,
					initialLoading: false,
					refreshing: false,
					error: normalizedError
				}));
				throw normalizedError;
			} finally {
				if (inFlightRef.current === inFlightRequest) inFlightRef.current = null;
			}
		})();
		inFlightRequest.promise = request;
		inFlightRef.current = inFlightRequest;
		return request;
	}, [
		applicationId,
		enabled,
		loadOverview
	]);
	const refresh = (0, import_react$27.useCallback)(() => executeRefresh(), [executeRefresh]);
	/**
	* 距上次成功加载超过 `maxAgeMs` 才真的请求，否则原样返回当前快照。
	*
	* 只服务环境事件（当前是 `focus`）。**不要**把它接到 `refresh()` 或生命周期动作上，
	* 那两条路径的语义是「必须拿到新状态」。
	*/
	const refreshIfStale = (0, import_react$27.useCallback)((maxAgeMs) => {
		const lastSuccessAtMs = lastSuccessAtMsRef.current;
		if (lastSuccessAtMs !== null && Date.now() - lastSuccessAtMs < maxAgeMs) return Promise.resolve(overviewRef.current);
		return executeRefresh();
	}, [executeRefresh]);
	/**
	* ⚠️ 依赖 `executeRefresh` 是**故意的**，别为了「少发一次请求」把它摘掉。
	*
	* `executeRefresh` 的引用等价于 `[applicationId, enabled, loadOverview]`，
	* 其中 `loadOverview` 是**数据源身份**：它换了就意味着宿主真的换了一套后端
	* （注入 mock、换 apiClient），此时必须重置快照并用新数据源重拉，且旧 in-flight
	* 的响应不能再落地（`use-cloud-service-overview-lifecycle.spec.tsx` 保护这条）。
	*
	* 宿主每帧新建 `source` **对象**但 `loadOverview` 函数不变时不会命中这里 ——
	* 解构出来的函数引用没变，`executeRefresh` 也就没变。两个宿主的 `source` 都走
	* `useMemo`，正常不会抖。
	*/
	(0, import_react$27.useEffect)(() => {
		++requestEpochRef.current;
		inFlightRef.current = null;
		overviewRef.current = null;
		refreshedIsolationBoundaryRef.current = null;
		lastSuccessAtMsRef.current = null;
		handledRefreshTokenRef.current = refreshTokenRef.current;
		setState({
			...EMPTY_OVERVIEW_STATE,
			applicationId: applicationId || null
		});
		if (enabled && applicationId) executeRefresh().catch(() => void 0);
		return () => {
			++requestEpochRef.current;
			inFlightRef.current = null;
		};
	}, [
		applicationId,
		enabled,
		executeRefresh
	]);
	/**
	* 宿主 bump `refreshToken` → 强制重查一次。
	*
	* ⚠️ 必须放在 scope 重置 effect **之后**：同一帧内 React 按定义顺序执行 effect，
	* 上面那个已经把 `handledRefreshTokenRef` 对齐到当前值，所以「切应用 + bump 同时发生」
	* 只会产生一次请求。
	*
	* ⚠️ 走 `executeRefresh` 而不是 `refreshIfStale`：宿主是在动作**成功之后**才 bump 的，
	* 语义是「状态确定变了，必须拿到新快照」，被 TTL 挡住就等于没修。
	*/
	(0, import_react$27.useEffect)(() => {
		if (handledRefreshTokenRef.current === refreshToken) return;
		handledRefreshTokenRef.current = refreshToken;
		if (!enabled || !applicationId) return;
		executeRefresh().catch(() => void 0);
	}, [
		applicationId,
		enabled,
		executeRefresh,
		refreshToken
	]);
	(0, import_react$27.useEffect)(() => {
		if (!enabled || !applicationId) return;
		/**
		* ⚠️ 走 `refreshIfStale` 而不是 `executeRefresh`。
		*
		* Electron 下开 DevTools、切窗口、点回应用都会各发一次 `focus`，裸调会把
		* `GET /control/cloud-services/status` 打成热路径（线上就是这么冒出一屏重复请求的）。
		* 聚焦刷新只是「回到页面顺手对一下状态」，节流掉不影响任何强一致路径。
		*/
		const handleFocus = () => {
			refreshIfStale(FOCUS_REFRESH_MIN_INTERVAL_MS).catch(() => void 0);
		};
		window.addEventListener("focus", handleFocus);
		return () => window.removeEventListener("focus", handleFocus);
	}, [
		applicationId,
		enabled,
		refreshIfStale
	]);
	(0, import_react$27.useEffect)(() => {
		const overview = state.overview;
		if (!enabled || !overview || overview.billingStatus !== "credits_exhausted" || !overview.isolateEndTime || normalizeCloudServiceViewState(overview) === "credits_exhausted_unknown_deadline") return;
		const boundaryKey = `${overview.applicationId}:${overview.isolateEndTime}`;
		if (refreshedIsolationBoundaryRef.current === boundaryKey) return;
		const isolateEndTimeMs = Date.parse(overview.isolateEndTime);
		const refreshAtBoundary = () => {
			refreshedIsolationBoundaryRef.current = boundaryKey;
			executeRefresh().catch(() => void 0);
		};
		const remainingMs = isolateEndTimeMs - Date.now();
		if (remainingMs <= 0) {
			refreshAtBoundary();
			return;
		}
		const timer = window.setTimeout(refreshAtBoundary, remainingMs);
		return () => window.clearTimeout(timer);
	}, [
		enabled,
		executeRefresh,
		state.overview
	]);
	if (!enabled || !applicationId || state.applicationId !== applicationId) return {
		overview: null,
		initialLoading: enabled && Boolean(applicationId),
		refreshing: false,
		error: null,
		refresh
	};
	return {
		overview: state.overview,
		initialLoading: state.initialLoading,
		refreshing: state.refreshing,
		error: state.error,
		refresh
	};
}
var import_react$27, FOCUS_REFRESH_MIN_INTERVAL_MS;
var init_use_cloud_service_overview = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	init_cloud_service_overview_state();
	FOCUS_REFRESH_MIN_INTERVAL_MS = 3e4;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/hooks/use-cloud-service-manager-state.ts
/** 将 Overview 与宿主动作串成一个不会重复提交供给动作的内部控制器。 */
function useCloudServiceManagerState({ applicationId, source, enabled, refreshToken, onProvisionRequest, onDeactivateRequest, onUpgradeRequest, onCloudServiceChanged }) {
	const overviewState = useCloudServiceOverview({
		applicationId,
		source,
		enabled,
		refreshToken
	});
	const viewState = (0, import_react$26.useMemo)(() => overviewState.overview ? normalizeCloudServiceViewState(overviewState.overview) : "unavailable", [overviewState.overview]);
	const actionState = useCloudServiceActions({
		applicationId,
		onProvisionRequest,
		onDeactivateRequest,
		onUpgradeRequest,
		onRefresh: overviewState.refresh,
		onCloudServiceChanged,
		viewState
	});
	return {
		...overviewState,
		...actionState,
		viewState
	};
}
var import_react$26;
var init_use_cloud_service_manager_state = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	init_use_cloud_service_actions();
	init_use_cloud_service_overview();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_cloud_service_actions();
	init_use_cloud_service_manager_state();
	init_use_cloud_service_overview();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/analytics/analytics-data.ts
function buildAnalyticsTrendSql(range) {
	return `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS date,
count(*)::int AS users
FROM auth.users
WHERE name IS DISTINCT FROM 'administrator'
AND created_at >= CURRENT_DATE - interval '${ANALYTICS_RANGE_DAYS[range] - 1} days'
GROUP BY 1
ORDER BY 1 ASC`;
}
function toCount(value) {
	const parsed = typeof value === "number" ? value : Number.parseInt(String(value), 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
function parseAnalyticsSummary(result) {
	const row = Array.isArray(result) ? result[0] : void 0;
	if (!row || typeof row !== "object") return {
		asOfDate: "",
		totalUsers: 0,
		todayUsers: 0,
		weekUsers: 0
	};
	const asOfDate = "as_of_date" in row ? String(row.as_of_date).slice(0, 10) : "";
	return {
		asOfDate: /^\d{4}-\d{2}-\d{2}$/u.test(asOfDate) ? asOfDate : "",
		totalUsers: "total" in row ? toCount(row.total) : 0,
		todayUsers: "today_users" in row ? toCount(row.today_users) : 0,
		weekUsers: "week_users" in row ? toCount(row.week_users) : 0
	};
}
function parseAnalyticsTrend(result) {
	if (!Array.isArray(result)) return [];
	return result.flatMap((row) => {
		if (!row || typeof row !== "object" || !("date" in row) || !("users" in row)) return [];
		const date = String(row.date).slice(0, 10);
		return /^\d{4}-\d{2}-\d{2}$/u.test(date) ? [{
			date,
			users: toCount(row.users)
		}] : [];
	});
}
function formatCalendarDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function fillAnalyticsDays(rows, range, asOfDate) {
	const counts = new Map(rows.map((row) => [row.date, row.users]));
	const days = ANALYTICS_RANGE_DAYS[range];
	const latestServerDate = rows.reduce((latest, row) => row.date > latest ? row.date : latest, "");
	const anchor = /^\d{4}-\d{2}-\d{2}$/u.test(asOfDate) ? asOfDate : latestServerDate;
	if (!anchor) return [];
	const referenceDate = /* @__PURE__ */ new Date(`${anchor}T00:00:00`);
	return Array.from({ length: days }, (_, index) => {
		const offset = days - index - 1;
		const pointDate = new Date(referenceDate);
		pointDate.setDate(pointDate.getDate() - offset);
		const date = formatCalendarDate(pointDate);
		return {
			date,
			users: counts.get(date) ?? 0
		};
	});
}
function buildAnalyticsSnapshot(summary, trend) {
	return {
		totalUsers: summary.totalUsers,
		todayUsers: summary.todayUsers,
		weekUsers: summary.weekUsers,
		trend: [...trend]
	};
}
var ANALYTICS_RANGE_DAYS, ANALYTICS_TOTAL_SQL;
var init_analytics_data = __esmMin((() => {
	ANALYTICS_RANGE_DAYS = {
		"7d": 7,
		"30d": 30,
		"90d": 90
	};
	ANALYTICS_TOTAL_SQL = `SELECT CURRENT_DATE::text AS as_of_date,
count(*)::int AS total,
count(*) FILTER (
    WHERE created_at >= CURRENT_DATE
    AND created_at < CURRENT_DATE + interval '1 day'
)::int AS today_users,
count(*) FILTER (
    WHERE created_at >= date_trunc('week', CURRENT_DATE)
    AND created_at < date_trunc('week', CURRENT_DATE) + interval '7 days'
)::int AS week_users
FROM auth.users
WHERE name IS DISTINCT FROM 'administrator'`;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/analytics/analytics-module.scss
var init_analytics_module$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/analytics/use-analytics-module.ts
function normalizeError$1(error) {
	return error instanceof Error ? error : new Error(String(error));
}
function useAnalyticsModule(applicationId, client, range) {
	const [state, setState] = (0, import_react$25.useState)(INITIAL_STATE$1);
	const statsSequenceRef = (0, import_react$25.useRef)(0);
	const usersSequenceRef = (0, import_react$25.useRef)(0);
	const statsScope = `${applicationId}:${range}`;
	const usersScope = applicationId;
	const refreshStats = (0, import_react$25.useCallback)(async () => {
		const sequence = ++statsSequenceRef.current;
		setState((previous) => ({
			...previous,
			statsScope,
			snapshot: previous.statsScope === statsScope ? previous.snapshot : void 0,
			loadingStats: true,
			statsError: void 0
		}));
		try {
			const [totalResult, trendResult] = await Promise.all([client.executeSql({
				applicationId,
				sql: ANALYTICS_TOTAL_SQL,
				mode: "read"
			}), client.executeSql({
				applicationId,
				sql: buildAnalyticsTrendSql(range),
				mode: "read"
			})]);
			if (sequence !== statsSequenceRef.current) return;
			const summary = parseAnalyticsSummary(totalResult.result);
			const trend = fillAnalyticsDays(parseAnalyticsTrend(trendResult.result), range, summary.asOfDate);
			setState((previous) => ({
				...previous,
				statsScope,
				snapshot: buildAnalyticsSnapshot(summary, trend),
				loadingStats: false
			}));
		} catch (error) {
			if (sequence !== statsSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingStats: false,
				statsError: normalizeError$1(error)
			}));
		}
	}, [
		applicationId,
		client,
		range,
		statsScope
	]);
	const refreshUsers = (0, import_react$25.useCallback)(async () => {
		const sequence = ++usersSequenceRef.current;
		setState((previous) => ({
			...previous,
			usersScope,
			users: previous.usersScope === usersScope ? previous.users : [],
			loadingUsers: true,
			usersError: void 0
		}));
		try {
			const users = await client.listEndUsers(applicationId, {
				offset: 0,
				limit: 20
			});
			if (sequence !== usersSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				usersScope,
				users,
				loadingUsers: false
			}));
		} catch (error) {
			if (sequence !== usersSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingUsers: false,
				usersError: normalizeError$1(error)
			}));
		}
	}, [
		applicationId,
		client,
		usersScope
	]);
	(0, import_react$25.useEffect)(() => {
		setState((previous) => ({
			...previous,
			snapshot: void 0,
			loadingStats: true
		}));
		refreshStats().catch(() => void 0);
		return () => {
			++statsSequenceRef.current;
		};
	}, [refreshStats]);
	(0, import_react$25.useEffect)(() => {
		setState((previous) => ({
			...previous,
			users: [],
			loadingUsers: true
		}));
		refreshUsers().catch(() => void 0);
		return () => {
			++usersSequenceRef.current;
		};
	}, [refreshUsers]);
	const statsMatch = state.statsScope === statsScope;
	const usersMatch = state.usersScope === usersScope;
	return {
		...state,
		snapshot: statsMatch ? state.snapshot : void 0,
		users: usersMatch ? state.users : [],
		loadingStats: statsMatch ? state.loadingStats : true,
		loadingUsers: usersMatch ? state.loadingUsers : true,
		statsError: statsMatch ? state.statsError : void 0,
		usersError: usersMatch ? state.usersError : void 0,
		refreshStats,
		refreshUsers
	};
}
var import_react$25, INITIAL_STATE$1;
var init_use_analytics_module = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_analytics_data();
	INITIAL_STATE$1 = {
		users: [],
		loadingStats: true,
		loadingUsers: true
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/analytics/analytics-module.tsx
function TrendChart({ points, ariaLabel }) {
	const max = Math.max(1, ...points.map((point) => point.users));
	const coordinates = points.map((point, index) => {
		return `${points.length <= 1 ? 0 : index * (600 / (points.length - 1))},${120 - point.users / max * 100}`;
	}).join(" ");
	const labelStep = Math.max(1, Math.ceil(points.length / 7));
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		className: "cloud-service-analytics__chart",
		role: "img",
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("svg", {
			viewBox: "0 0 600 140",
			preserveAspectRatio: "none",
			"aria-hidden": "true",
			children: [[
				20,
				70,
				120
			].map((y) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("line", {
				x1: "0",
				y1: y,
				x2: "600",
				y2: y
			}, y)), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("polyline", { points: coordinates })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
			className: "cloud-service-analytics__chart-labels",
			"aria-hidden": "true",
			children: points.map((point, index) => index % labelStep === 0 || index === points.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", { children: point.date.slice(5) }, point.date) : null)
		})]
	});
}
function AnalyticsModule({ applicationId, client }) {
	const t = useCloudServiceI18n();
	const [range, setRange] = (0, import_react$24.useState)("7d");
	const analytics = useAnalyticsModule(applicationId, client, range);
	const userColumns = (0, import_react$24.useMemo)(() => [{
		key: "name",
		title: t("analytics.users.name"),
		render: (user) => user.name || user.uid,
		width: "50%"
	}, {
		key: "email",
		title: t("analytics.users.email"),
		render: (user) => user.email || "—",
		width: "50%"
	}], [t]);
	const snapshot = analytics.snapshot;
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("section", {
		className: "cloud-service-analytics",
		"aria-label": t("module.analytics"),
		"aria-busy": analytics.loadingStats || analytics.loadingUsers,
		children: [analytics.statsError && !snapshot ? /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			className: "cloud-service-analytics__error",
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", { children: t("analytics.loadFailed.title") }),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("p", { children: t("common.loadFailed") }),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
					loading: analytics.loadingStats,
					onClick: () => {
						analytics.refreshStats().catch(() => void 0);
					},
					children: t("common.retry")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
			analytics.statsError && /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				className: "cloud-service-analytics__inline-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", { children: t("common.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
					variant: "link",
					loading: analytics.loadingStats,
					onClick: () => {
						analytics.refreshStats().catch(() => void 0);
					},
					children: t("common.retry")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", {
				className: "cloud-service-analytics__section-title",
				children: t("analytics.overview.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
				className: "cloud-service-analytics__metrics",
				children: [
					["total", snapshot?.totalUsers],
					["today", snapshot?.todayUsers],
					["week", snapshot?.weekUsers]
				].map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "cloud-service-analytics__metric",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", { children: t(`analytics.metric.${key}`) }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("strong", { children: analytics.loadingStats && !snapshot ? "—" : value ?? 0 })]
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				className: "cloud-service-analytics__trend-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", { children: t("analytics.trend.title") }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Segmented, {
					size: "small",
					value: range,
					disabled: analytics.loadingStats,
					"aria-label": t("analytics.trend.title"),
					options: [
						"7d",
						"30d",
						"90d"
					].map((value) => ({
						value,
						label: t(`analytics.range.${value}`)
					})),
					onChange: setRange
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(TrendChart, {
				points: snapshot?.trend ?? [],
				ariaLabel: t("analytics.trend.ariaLabel")
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("section", {
			className: "cloud-service-analytics__users",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				className: "cloud-service-analytics__users-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", { children: t("analytics.users.title", { count: snapshot?.totalUsers ?? analytics.users.length }) }), analytics.usersError && /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					role: "alert",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", { children: t("common.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
						variant: "link",
						loading: analytics.loadingUsers,
						onClick: () => {
							analytics.refreshUsers().catch(() => void 0);
						},
						children: t("common.retry")
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Table, {
				columns: userColumns,
				dataSource: analytics.users,
				rowKey: "uid",
				size: "compact",
				hover: false,
				bordered: true,
				loading: analytics.loadingUsers,
				empty: t("analytics.empty"),
				scroll: { x: 440 }
			})]
		})]
	});
}
var import_react$24, import_jsx_runtime$20;
var init_analytics_module = __esmMin((() => {
	init_analytics_module$1();
	init_src();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_use_analytics_module();
	import_jsx_runtime$20 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/analytics/index.ts
var init_analytics = __esmMin((() => {
	init_analytics_data();
	init_analytics_module();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-module.scss
var init_auth_module$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-detail-common.scss
var init_auth_detail_common = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-detail-error.tsx
function AuthDetailError({ message, loading = false, onRetry }) {
	const t = useCloudServiceI18n();
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "cloud-service-auth-detail__error",
		role: "alert",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", { children: message }), onRetry && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
			variant: "link",
			loading,
			onClick: onRetry,
			children: t("common.retry")
		})]
	});
}
var import_jsx_runtime$19;
var init_auth_detail_error = __esmMin((() => {
	init_src();
	require_react();
	init_i18n();
	import_jsx_runtime$19 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-email-detail.tsx
function AuthEmailDetail({ config, loading = false, errorMessage, onRetry, onSave, onCancel }) {
	const t = useCloudServiceI18n();
	const configSmtp = config.smtp;
	const configTemplates = config.templates;
	const smtpHost = configSmtp?.host;
	const smtpPort = configSmtp?.port;
	const smtpSecurity = configSmtp?.security;
	const smtpUsername = configSmtp?.username;
	const smtpSenderEmail = configSmtp?.senderEmail;
	const smtpPasswordConfigured = configSmtp?.passwordConfigured;
	const templateLoginZh = configTemplates?.loginZh;
	const templateLoginEn = configTemplates?.loginEn;
	const templateDefaultZh = configTemplates?.defaultZh;
	const templateDefaultEn = configTemplates?.defaultEn;
	const [enabled, setEnabled] = (0, import_react$22.useState)(config.enabled);
	const [smtpMode, setSmtpMode] = (0, import_react$22.useState)(config.smtpMode);
	const [smtp, setSmtp] = (0, import_react$22.useState)({
		...EMPTY_SMTP,
		...config.smtp,
		password: ""
	});
	const [templateMode, setTemplateMode] = (0, import_react$22.useState)(config.templateMode);
	const [templates, setTemplates] = (0, import_react$22.useState)(config.templates ?? EMPTY_TEMPLATES);
	(0, import_react$22.useEffect)(() => {
		setEnabled(config.enabled);
		setSmtpMode(config.smtpMode);
		setSmtp({
			...EMPTY_SMTP,
			...smtpHost !== void 0 ? { host: smtpHost } : {},
			...smtpPort !== void 0 ? { port: smtpPort } : {},
			...smtpSecurity !== void 0 ? { security: smtpSecurity } : {},
			...smtpUsername !== void 0 ? { username: smtpUsername } : {},
			...smtpSenderEmail !== void 0 ? { senderEmail: smtpSenderEmail } : {},
			password: ""
		});
		setTemplateMode(config.templateMode);
		setTemplates({
			loginZh: templateLoginZh ?? "",
			loginEn: templateLoginEn ?? "",
			defaultZh: templateDefaultZh ?? "",
			defaultEn: templateDefaultEn ?? ""
		});
	}, [
		config.enabled,
		config.smtpMode,
		config.templateMode,
		smtpHost,
		smtpPasswordConfigured,
		smtpPort,
		smtpSecurity,
		smtpSenderEmail,
		smtpUsername,
		templateDefaultEn,
		templateDefaultZh,
		templateLoginEn,
		templateLoginZh
	]);
	const updateSmtp = (0, import_react$22.useCallback)((field, value) => {
		setSmtp((previous) => ({
			...previous,
			[field]: value
		}));
	}, []);
	const updateTemplate = (0, import_react$22.useCallback)((field, value) => {
		setTemplates((previous) => ({
			...previous,
			[field]: value
		}));
	}, []);
	const handleSave = (0, import_react$22.useCallback)(() => {
		onSave?.({
			enabled,
			smtpMode,
			smtp: smtpMode === "custom" ? {
				...smtp,
				password: smtp.password || void 0
			} : void 0,
			templateMode,
			templates: templateMode === "custom" ? templates : void 0
		});
		setSmtp((previous) => ({
			...previous,
			password: ""
		}));
	}, [
		onSave,
		enabled,
		smtpMode,
		smtp,
		templateMode,
		templates
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("section", {
		className: "cloud-service-auth-detail",
		"aria-label": t("auth.email.detail.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
				type: "button",
				className: "cloud-service-auth-detail__back",
				onClick: onCancel,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ChevronLeftIcon, {
					size: "sm",
					"aria-hidden": "true"
				}), t("auth.detail.back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cloud-service-auth-detail__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h2", { children: t("auth.email.detail.title") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", { children: t("auth.email.detail.subtitle") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cloud-service-auth-detail__toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "cloud-service-auth-detail__toggle-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: t("auth.email.detail.enableLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.enableDescription") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Switch, {
					checked: enabled,
					disabled: loading,
					"aria-label": t("auth.email.detail.enableLabel"),
					onChange: (event) => setEnabled(event.target.checked)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cloud-service-auth-detail__section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h3", { children: t("auth.email.detail.smtpSection") }),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cloud-service-auth-detail__mode-cards",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${smtpMode === "platform" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": smtpMode === "platform",
							disabled: loading,
							onClick: () => setSmtpMode("platform"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
								className: "cloud-service-auth-detail__mode-icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ShieldCheckIcon, { size: "sm" })
							}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: t("auth.email.detail.smtpPlatform") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.smtpPlatformDescription") })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${smtpMode === "custom" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": smtpMode === "custom",
							disabled: loading,
							onClick: () => setSmtpMode("custom"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
								className: "cloud-service-auth-detail__mode-icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(SettingsIcon, { size: "sm" })
							}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: t("auth.email.detail.smtpCustom") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.smtpCustomDescription") })]
							})]
						})]
					}),
					smtpMode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cloud-service-auth-detail__custom-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpHost") }),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.smtpHostDescription") }),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
										value: smtp.host,
										placeholder: "smtp.example.com",
										disabled: loading,
										onChange: (event) => updateSmtp("host", event.target.value)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
									className: "cloud-service-auth-detail__field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpPort") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
										value: smtp.port,
										placeholder: "465",
										disabled: loading,
										onChange: (event) => updateSmtp("port", event.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
									className: "cloud-service-auth-detail__field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpSecurity") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Select, {
										fullWidth: true,
										value: smtp.security,
										options: SECURITY_OPTIONS,
										disabled: loading,
										onChange: (value) => updateSmtp("security", value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpUsername") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
									value: smtp.username,
									placeholder: "user@example.com",
									disabled: loading,
									onChange: (event) => updateSmtp("username", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpPassword") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
									type: "password",
									value: smtp.password,
									placeholder: config.smtp?.passwordConfigured ? t("auth.email.detail.smtpPasswordConfiguredPlaceholder") : t("auth.email.detail.smtpPasswordPlaceholder"),
									disabled: loading,
									onChange: (event) => updateSmtp("password", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.smtpSender") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
									value: smtp.senderEmail,
									placeholder: "noreply@example.com",
									disabled: loading,
									onChange: (event) => updateSmtp("senderEmail", event.target.value)
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cloud-service-auth-detail__section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h3", { children: t("auth.email.detail.templateSection") }),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cloud-service-auth-detail__mode-cards",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${templateMode === "platform" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": templateMode === "platform",
							disabled: loading,
							onClick: () => setTemplateMode("platform"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
								className: "cloud-service-auth-detail__mode-icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ShieldCheckIcon, { size: "sm" })
							}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: t("auth.email.detail.templatePlatform") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.templatePlatformDescription") })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${templateMode === "custom" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": templateMode === "custom",
							disabled: loading,
							onClick: () => setTemplateMode("custom"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
								className: "cloud-service-auth-detail__mode-icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(FileTextIcon, { size: "sm" })
							}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: t("auth.email.detail.templateCustom") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("auth.email.detail.templateCustomDescription") })]
							})]
						})]
					}),
					templateMode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cloud-service-auth-detail__custom-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.templateLoginZh") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(TextArea, {
									value: templates.loginZh,
									rows: 6,
									disabled: loading,
									onChange: (event) => updateTemplate("loginZh", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.templateLoginEn") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(TextArea, {
									value: templates.loginEn,
									rows: 6,
									disabled: loading,
									onChange: (event) => updateTemplate("loginEn", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.templateDefaultZh") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(TextArea, {
									value: templates.defaultZh,
									rows: 6,
									disabled: loading,
									onChange: (event) => updateTemplate("defaultZh", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("label", { children: t("auth.email.detail.templateDefaultEn") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(TextArea, {
									value: templates.defaultEn,
									rows: 6,
									disabled: loading,
									onChange: (event) => updateTemplate("defaultEn", event.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
								className: "cloud-service-auth-detail__template-note",
								children: t("auth.email.detail.templateNote")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cloud-service-auth-detail__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					disabled: loading,
					onClick: onCancel,
					children: t("auth.detail.cancel")
				}), onSave && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
					size: "medium",
					loading,
					onClick: handleSave,
					children: t("auth.detail.save")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(AuthDetailError, {
				message: errorMessage,
				loading,
				onRetry
			})
		]
	});
}
var import_react$22, import_jsx_runtime$18, EMPTY_SMTP, EMPTY_TEMPLATES, SECURITY_OPTIONS;
var init_auth_email_detail = __esmMin((() => {
	init_auth_detail_common();
	init_src();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_detail_error();
	import_jsx_runtime$18 = require_jsx_runtime();
	EMPTY_SMTP = {
		host: "",
		port: "465",
		security: "SSL",
		username: "",
		password: "",
		senderEmail: ""
	};
	EMPTY_TEMPLATES = {
		loginZh: "",
		loginEn: "",
		defaultZh: "",
		defaultEn: ""
	};
	SECURITY_OPTIONS = [
		{
			value: "AUTO",
			label: "Auto"
		},
		{
			value: "SSL",
			label: "SSL"
		},
		{
			value: "TLS",
			label: "TLS"
		},
		{
			value: "NONE",
			label: "None"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-google-detail.tsx
function AuthGoogleDetail({ config, loading = false, errorMessage, onRetry, onSave, onCancel }) {
	const t = useCloudServiceI18n();
	const [enabled, setEnabled] = (0, import_react$21.useState)(config.enabled);
	const [credentialMode, setCredentialMode] = (0, import_react$21.useState)(config.credentialMode);
	const [clientId, setClientId] = (0, import_react$21.useState)(config.clientId ?? "");
	const [clientSecret, setClientSecret] = (0, import_react$21.useState)("");
	(0, import_react$21.useEffect)(() => {
		setEnabled(config.enabled);
		setCredentialMode(config.credentialMode);
		setClientId(config.clientId ?? "");
		setClientSecret("");
	}, [
		config.clientId,
		config.credentialMode,
		config.enabled
	]);
	const handleSave = (0, import_react$21.useCallback)(() => {
		onSave?.({
			enabled,
			credentialMode,
			clientId: credentialMode === "custom" ? clientId : void 0,
			clientSecret: credentialMode === "custom" && clientSecret ? clientSecret : void 0
		});
		setClientSecret("");
	}, [
		onSave,
		enabled,
		credentialMode,
		clientId,
		clientSecret
	]);
	const handleCopyUri = (0, import_react$21.useCallback)(() => {
		if (config.redirectUri) navigator.clipboard.writeText(config.redirectUri).catch(() => void 0);
	}, [config.redirectUri]);
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("section", {
		className: "cloud-service-auth-detail",
		"aria-label": t("auth.google.detail.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("button", {
				type: "button",
				className: "cloud-service-auth-detail__back",
				onClick: onCancel,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ChevronLeftIcon, {
					size: "sm",
					"aria-hidden": "true"
				}), t("auth.detail.back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "cloud-service-auth-detail__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("h2", { children: t("auth.google.detail.title") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("p", { children: t("auth.google.detail.subtitle") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "cloud-service-auth-detail__toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "cloud-service-auth-detail__toggle-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("strong", { children: t("auth.google.detail.enableLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("auth.google.detail.enableDescription") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Switch, {
					checked: enabled,
					disabled: loading,
					"aria-label": t("auth.google.detail.enableLabel"),
					onChange: (event) => setEnabled(event.target.checked)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "cloud-service-auth-detail__section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("h3", { children: t("auth.google.detail.credentialMode") }),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "cloud-service-auth-detail__mode-cards",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${credentialMode === "platform" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": credentialMode === "platform",
							disabled: loading,
							onClick: () => setCredentialMode("platform"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
								className: "cloud-service-auth-detail__mode-radio",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("strong", { children: t("auth.google.detail.platformManaged") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("auth.google.detail.platformManagedDescription") })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("button", {
							type: "button",
							className: `cloud-service-auth-detail__mode-card${credentialMode === "custom" ? " cloud-service-auth-detail__mode-card--active" : ""}`,
							"aria-pressed": credentialMode === "custom",
							disabled: loading,
							onClick: () => setCredentialMode("custom"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
								className: "cloud-service-auth-detail__mode-radio",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
								className: "cloud-service-auth-detail__mode-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("strong", { children: t("auth.google.detail.customCredential") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("auth.google.detail.customCredentialDescription") })]
							})]
						})]
					}),
					credentialMode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "cloud-service-auth-detail__custom-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
								className: "cloud-service-auth-detail__info-box",
								children: t("auth.google.detail.customInfo")
							}),
							config.redirectUri && /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "cloud-service-auth-detail__redirect-box",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("p", { children: t("auth.google.detail.redirectUriLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
									className: "cloud-service-auth-detail__redirect-box-uri",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("code", { children: config.redirectUri }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Button, {
										iconOnly: true,
										size: "small",
										variant: "ghost",
										"aria-label": t("auth.detail.copyUri"),
										onClick: handleCopyUri,
										children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(CopyIcon, {})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("label", { children: t("auth.google.detail.clientId") }),
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("auth.google.detail.clientIdDescription") }),
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Input, {
										value: clientId,
										placeholder: t("auth.google.detail.clientIdPlaceholder"),
										disabled: loading,
										onChange: (event) => setClientId(event.target.value)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "cloud-service-auth-detail__field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("label", { children: t("auth.google.detail.clientSecret") }),
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("auth.google.detail.clientSecretDescription") }),
									/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Input, {
										type: "password",
										value: clientSecret,
										placeholder: config.clientSecretConfigured ? t("auth.google.detail.clientSecretConfiguredPlaceholder") : t("auth.google.detail.clientSecretPlaceholder"),
										disabled: loading,
										onChange: (event) => setClientSecret(event.target.value)
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "cloud-service-auth-detail__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					disabled: loading,
					onClick: onCancel,
					children: t("auth.detail.cancel")
				}), onSave && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Button, {
					size: "medium",
					loading,
					onClick: handleSave,
					children: t("auth.detail.save")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(AuthDetailError, {
				message: errorMessage,
				loading,
				onRetry
			})
		]
	});
}
var import_react$21, import_jsx_runtime$17;
var init_auth_google_detail = __esmMin((() => {
	init_auth_detail_common();
	init_src();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_detail_error();
	import_jsx_runtime$17 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-module.tsx
function AuthModule({ applicationType, providerStatuses, loading = false, error, onRetry, onProviderSelect, googleConfig, emailConfig, onGoogleConfigSave, onEmailConfigSave }) {
	const t = useCloudServiceI18n();
	const [activeProvider, setActiveProvider] = (0, import_react$20.useState)(null);
	const providers = applicationType === "wechat-mini-program" ? [...BASE_PROVIDERS, "wechatMiniProgram"] : BASE_PROVIDERS;
	const handleProviderSelect = (0, import_react$20.useCallback)((provider) => {
		onProviderSelect?.(provider);
		if (provider === "google" ? googleConfig !== void 0 || onGoogleConfigSave !== void 0 : provider === "email" && (emailConfig !== void 0 || onEmailConfigSave !== void 0)) setActiveProvider(provider);
	}, [
		emailConfig,
		googleConfig,
		onEmailConfigSave,
		onGoogleConfigSave,
		onProviderSelect
	]);
	const handleBack = (0, import_react$20.useCallback)(() => {
		setActiveProvider(null);
	}, []);
	if (activeProvider === "google") return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(AuthGoogleDetail, {
		config: googleConfig ?? DEFAULT_GOOGLE_CONFIG,
		loading,
		onSave: onGoogleConfigSave,
		onCancel: handleBack
	});
	if (activeProvider === "email") return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(AuthEmailDetail, {
		config: emailConfig ?? DEFAULT_EMAIL_CONFIG,
		loading,
		onSave: onEmailConfigSave,
		onCancel: handleBack
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("section", {
		className: "cloud-service-auth",
		"aria-label": t("module.auth"),
		"aria-busy": loading,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "cloud-service-auth__providers",
			children: providers.map((provider) => {
				const status = providerStatuses[provider] ?? "unknown";
				return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("button", {
					type: "button",
					className: "cloud-service-auth__provider",
					disabled: loading || !onProviderSelect && !(provider === "google" ? googleConfig !== void 0 || onGoogleConfigSave !== void 0 : provider === "email" && (emailConfig !== void 0 || onEmailConfigSave !== void 0)),
					onClick: () => handleProviderSelect(provider),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("span", {
						className: "cloud-service-auth__provider-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("strong", { children: t(`auth.provider.${provider}.title`) }), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children: t(`auth.provider.${provider}.description`) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("span", {
						className: "cloud-service-auth__provider-action",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Tag, {
							tone: status === "enabled" ? "success" : status === "degraded" ? "warning" : "default",
							size: "small",
							children: t(`auth.provider.status.${status}`)
						}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ChevronRightIcon, {
							size: "sm",
							"aria-hidden": "true"
						})]
					})]
				}, provider);
			})
		}), error && /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "cloud-service-auth__error",
			role: "alert",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children: t("common.loadFailed") }), onRetry && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Button, {
				variant: "link",
				loading,
				onClick: onRetry,
				children: t("common.retry")
			})]
		})]
	});
}
var import_react$20, import_jsx_runtime$16, BASE_PROVIDERS, DEFAULT_GOOGLE_CONFIG, DEFAULT_EMAIL_CONFIG;
var init_auth_module = __esmMin((() => {
	init_auth_module$1();
	init_src();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_email_detail();
	init_auth_google_detail();
	import_jsx_runtime$16 = require_jsx_runtime();
	BASE_PROVIDERS = ["email", "phone"];
	DEFAULT_GOOGLE_CONFIG = {
		enabled: false,
		credentialMode: "platform"
	};
	DEFAULT_EMAIL_CONFIG = {
		enabled: false,
		smtpMode: "platform",
		templateMode: "platform"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-admin-adapter.ts
function mapProviderStatus(state) {
	return state ?? "unknown";
}
function mapSmtpSecurity(security) {
	if (security === "STARTSSL") return "TLS";
	if (security === "NO_SSL") return "NONE";
	return security;
}
function mapWireSmtpSecurity(security) {
	if (security === "TLS") return "STARTSSL";
	if (security === "NONE") return "NO_SSL";
	return security;
}
function mapEmailConfig(detail) {
	return {
		enabled: detail.enabled,
		smtpMode: detail.deliveryMode,
		...detail.smtp ? { smtp: {
			host: detail.smtp.serverHost,
			port: String(detail.smtp.serverPort),
			security: mapSmtpSecurity(detail.smtp.securityMode),
			username: detail.smtp.accountUsername,
			senderEmail: detail.smtp.senderAddress,
			passwordConfigured: detail.smtp.passwordConfigured
		} } : {},
		templateMode: detail.templateMode,
		templates: {
			loginZh: detail.templates.registerSignInZhCN,
			loginEn: detail.templates.registerSignInEnUS,
			defaultZh: detail.templates.defaultTplZhCN,
			defaultEn: detail.templates.defaultTplEnUS
		}
	};
}
function mapGoogleConfig(detail) {
	return {
		enabled: detail.enabled,
		credentialMode: detail.credentialMode,
		redirectUri: detail.callbackUri,
		clientId: detail.clientId,
		clientSecretConfigured: detail.clientSecretConfigured
	};
}
function mapPhoneConfig(detail) {
	return { enabled: detail.enabled };
}
function mapWechatMiniProgramConfig(detail) {
	return { enabled: detail.enabled };
}
function emailNeedsFreshPassword(detail, update) {
	if (update.smtpMode !== "custom" || !update.smtp) return false;
	const current = detail.smtp;
	return detail.deliveryMode !== "custom" || !current?.passwordConfigured || !current || current.serverHost !== update.smtp.host || current.serverPort !== Number(update.smtp.port) || current.securityMode !== mapWireSmtpSecurity(update.smtp.security) || current.accountUsername !== update.smtp.username || current.senderAddress !== update.smtp.senderEmail;
}
function googleNeedsFreshSecret(detail, update) {
	return update.credentialMode === "custom" && (detail.credentialMode !== "custom" || !detail.clientSecretConfigured || detail.clientId !== update.clientId);
}
var init_auth_admin_adapter = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-phone-detail.tsx
function AuthPhoneDetail({ config, loading = false, errorMessage, onRetry, showSave = false, onSave, onCancel }) {
	const t = useCloudServiceI18n();
	const [enabled, setEnabled] = (0, import_react$19.useState)(config.enabled);
	(0, import_react$19.useEffect)(() => {
		setEnabled(config.enabled);
	}, [config.enabled]);
	const handleSave = (0, import_react$19.useCallback)(() => {
		onSave?.({ enabled });
	}, [enabled, onSave]);
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("section", {
		className: "cloud-service-auth-detail",
		"aria-label": t("auth.phone.detail.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("button", {
				type: "button",
				className: "cloud-service-auth-detail__back",
				onClick: onCancel,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ChevronLeftIcon, {
					size: "sm",
					"aria-hidden": "true"
				}), t("auth.detail.back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "cloud-service-auth-detail__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("h2", { children: t("auth.phone.detail.title") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", { children: t("auth.phone.detail.subtitle") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "cloud-service-auth-detail__toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					className: "cloud-service-auth-detail__toggle-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("strong", { children: t("auth.phone.detail.enableLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { children: t("auth.phone.detail.enableDescription") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Switch, {
					checked: enabled,
					disabled: loading || !onSave,
					"aria-label": t("auth.phone.detail.enableLabel"),
					onChange: (event) => setEnabled(event.target.checked)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "cloud-service-auth-detail__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("h3", { children: t("auth.phone.detail.signatureMode") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					className: "cloud-service-auth-detail__mode-cards",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("button", {
						type: "button",
						className: "cloud-service-auth-detail__mode-card cloud-service-auth-detail__mode-card--active",
						"aria-pressed": "true",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
							className: "cloud-service-auth-detail__mode-radio",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
							className: "cloud-service-auth-detail__mode-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("strong", { children: t("auth.phone.detail.platformManaged") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { children: t("auth.phone.detail.platformManagedDescription") })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("button", {
						type: "button",
						className: "cloud-service-auth-detail__mode-card",
						"aria-pressed": "false",
						disabled: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
							className: "cloud-service-auth-detail__mode-radio",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
							className: "cloud-service-auth-detail__mode-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("strong", { children: t("auth.phone.detail.customSignature") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { children: t("auth.phone.detail.customSignatureDescription") })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "cloud-service-auth-detail__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					disabled: loading,
					onClick: onCancel,
					children: t("auth.detail.cancel")
				}), (showSave || onSave) && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
					size: "medium",
					loading,
					disabled: !onSave,
					onClick: handleSave,
					children: t("auth.detail.save")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(AuthDetailError, {
				message: errorMessage,
				loading,
				onRetry
			})
		]
	});
}
var import_react$19, import_jsx_runtime$15;
var init_auth_phone_detail = __esmMin((() => {
	init_auth_detail_common();
	init_src();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_detail_error();
	import_jsx_runtime$15 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-wechat-detail.tsx
function AuthWechatMiniProgramDetail({ config, loading = false, errorMessage, onRetry, showSave = false, onSave, onCancel }) {
	const t = useCloudServiceI18n();
	const [enabled, setEnabled] = (0, import_react$18.useState)(config.enabled);
	(0, import_react$18.useEffect)(() => {
		setEnabled(config.enabled);
	}, [config.enabled]);
	const handleSave = (0, import_react$18.useCallback)(() => {
		onSave?.({ enabled });
	}, [enabled, onSave]);
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("section", {
		className: "cloud-service-auth-detail",
		"aria-label": t("auth.wechatMiniProgram.detail.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("button", {
				type: "button",
				className: "cloud-service-auth-detail__back",
				onClick: onCancel,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ChevronLeftIcon, {
					size: "sm",
					"aria-hidden": "true"
				}), t("auth.detail.back")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "cloud-service-auth-detail__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("h2", { children: t("auth.wechatMiniProgram.detail.title") }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("p", { children: t("auth.wechatMiniProgram.detail.subtitle") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "cloud-service-auth-detail__toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "cloud-service-auth-detail__toggle-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("strong", { children: t("auth.wechatMiniProgram.detail.enableLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: t("auth.wechatMiniProgram.detail.enableDescription") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Switch, {
					checked: enabled,
					disabled: loading || !onSave,
					"aria-label": t("auth.wechatMiniProgram.detail.enableLabel"),
					onChange: (event) => setEnabled(event.target.checked)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "cloud-service-auth-detail__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					disabled: loading,
					onClick: onCancel,
					children: t("auth.detail.cancel")
				}), (showSave || onSave) && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
					size: "medium",
					loading,
					disabled: !onSave,
					onClick: handleSave,
					children: t("auth.detail.save")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(AuthDetailError, {
				message: errorMessage,
				loading,
				onRetry
			})
		]
	});
}
var import_react$18, import_jsx_runtime$14;
var init_auth_wechat_detail = __esmMin((() => {
	init_auth_detail_common();
	init_src();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_detail_error();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-admin-detail.tsx
function AuthAdminDetail({ detail, emailConfig, googleConfig, phoneConfig, wechatMiniProgramConfig, errorMessage, loading, onEmailSave, onGoogleSave, onPhoneSave, onWechatMiniProgramSave, onBack, onRetry }) {
	return detail.provider === "email" && emailConfig ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AuthEmailDetail, {
		config: emailConfig,
		loading,
		errorMessage,
		onRetry,
		onSave: onEmailSave,
		onCancel: onBack
	}, `email:${detail.value.revision}`) : detail.provider === "phone" && phoneConfig ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AuthPhoneDetail, {
		config: phoneConfig,
		loading,
		errorMessage,
		onRetry,
		onSave: onPhoneSave,
		onCancel: onBack
	}, `phone:${detail.value.revision}`) : detail.provider === "google" && googleConfig ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AuthGoogleDetail, {
		config: googleConfig,
		loading,
		errorMessage,
		onRetry,
		onSave: onGoogleSave,
		onCancel: onBack
	}, `google:${detail.value.revision}`) : detail.provider === "wechatMiniProgram" && wechatMiniProgramConfig ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AuthWechatMiniProgramDetail, {
		config: wechatMiniProgramConfig,
		loading,
		errorMessage,
		onRetry,
		onSave: onWechatMiniProgramSave,
		onCancel: onBack
	}) : null;
}
var import_jsx_runtime$13;
var init_auth_admin_detail = __esmMin((() => {
	require_react();
	init_auth_email_detail();
	init_auth_google_detail();
	init_auth_phone_detail();
	init_auth_wechat_detail();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/auth-admin-module.tsx
function toError(fallback) {
	return new Error(fallback);
}
function ignore(promise) {
	promise.catch(() => void 0);
}
function isRevisionConflict(error) {
	return typeof error === "object" && error !== null && "code" in error && error.code === 18355;
}
function isSecretRequired(error) {
	return typeof error === "object" && error !== null && "code" in error && error.code === 18356;
}
function requiresPostWriteRefresh(error) {
	return isRevisionConflict(error) || typeof error === "object" && error !== null && "code" in error && error.code === 18357;
}
function AuthAdminModule({ applicationId, applicationType, writeEnabled = true, client }) {
	const t = useCloudServiceI18n();
	const api = client;
	const [statuses, setStatuses] = (0, import_react$16.useState)(UNKNOWN_STATUSES);
	const [selectedProvider, setSelectedProvider] = (0, import_react$16.useState)(null);
	const [detail, setDetail] = (0, import_react$16.useState)();
	const [listLoading, setListLoading] = (0, import_react$16.useState)(true);
	const [detailLoading, setDetailLoading] = (0, import_react$16.useState)(false);
	const [saving, setSaving] = (0, import_react$16.useState)(false);
	const [listError, setListError] = (0, import_react$16.useState)();
	const [detailError, setDetailError] = (0, import_react$16.useState)();
	const [operationError, setOperationError] = (0, import_react$16.useState)();
	const listRequest = (0, import_react$16.useRef)(0);
	const detailRequest = (0, import_react$16.useRef)(0);
	const operationRequest = (0, import_react$16.useRef)(0);
	const loadList = (0, import_react$16.useCallback)(async () => {
		const request = ++listRequest.current;
		setListLoading(true);
		setListError(void 0);
		try {
			const providers = await api.listAuthProviders(applicationId);
			if (request !== listRequest.current) return false;
			const byProvider = new Map(providers.map((provider) => [provider.provider, provider]));
			setStatuses({
				email: mapProviderStatus(byProvider.get("email")?.state),
				phone: mapProviderStatus(byProvider.get("phone")?.state),
				google: mapProviderStatus(byProvider.get("google")?.state),
				...applicationType === "wechat-mini-program" ? { wechatMiniProgram: mapProviderStatus(byProvider.get("wechatMiniProgram")?.state) } : {}
			});
			return true;
		} catch {
			if (request === listRequest.current) setListError(toError(t("common.loadFailed")));
			return false;
		} finally {
			if (request === listRequest.current) setListLoading(false);
		}
	}, [
		api,
		applicationId,
		applicationType,
		t
	]);
	const loadDetail = (0, import_react$16.useCallback)(async (provider) => {
		const request = ++detailRequest.current;
		setDetailLoading(true);
		setDetailError(void 0);
		try {
			const value = provider === "email" ? await api.getEmailProvider(applicationId) : provider === "phone" ? await api.getPhoneProvider(applicationId) : provider === "google" ? await api.getGoogleProvider(applicationId) : await api.getWechatMiniProgramProvider(applicationId);
			if (request === detailRequest.current) {
				setDetail({
					provider,
					value
				});
				return true;
			}
			return false;
		} catch {
			if (request === detailRequest.current) setDetailError(toError(t("common.loadFailed")));
			return false;
		} finally {
			if (request === detailRequest.current) setDetailLoading(false);
		}
	}, [
		api,
		applicationId,
		t
	]);
	(0, import_react$16.useEffect)(() => {
		setStatuses(UNKNOWN_STATUSES);
		setSelectedProvider(null);
		setDetail(void 0);
		setDetailError(void 0);
		setOperationError(void 0);
		setDetailLoading(false);
		setSaving(false);
		ignore(loadList());
		return () => {
			listRequest.current += 1;
			detailRequest.current += 1;
			operationRequest.current += 1;
		};
	}, [loadList]);
	const handleProviderSelect = (0, import_react$16.useCallback)((provider) => {
		setSelectedProvider(provider);
		setDetail(void 0);
		setOperationError(void 0);
		ignore(loadDetail(provider));
	}, [loadDetail]);
	const handleBack = (0, import_react$16.useCallback)(() => {
		detailRequest.current += 1;
		operationRequest.current += 1;
		setSelectedProvider(null);
		setDetail(void 0);
		setDetailError(void 0);
		setOperationError(void 0);
		setDetailLoading(false);
		setSaving(false);
	}, []);
	const refreshAfterWriteFailure = (0, import_react$16.useCallback)(async (provider) => {
		setDetail(void 0);
		const [listRefreshed, detailRefreshed] = await Promise.all([loadList(), loadDetail(provider)]);
		if (!listRefreshed || !detailRefreshed) {
			setDetail(void 0);
			return false;
		}
		return true;
	}, [loadDetail, loadList]);
	const saveEmail = (0, import_react$16.useCallback)(async (update) => {
		if (detail?.provider !== "email" || !detail.value.revision?.trim()) {
			const msg = t("common.actionFailed");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		if (emailNeedsFreshPassword(detail.value, update) && !update.smtp?.password) {
			const msg = t("auth.error.secretRequired");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		const request = ++operationRequest.current;
		setSaving(true);
		setOperationError(void 0);
		try {
			const smtp = update.smtpMode === "custom" && update.smtp ? {
				serverHost: update.smtp.host,
				serverPort: Number(update.smtp.port),
				accountUsername: update.smtp.username,
				...update.smtp.password ? { accountPassword: update.smtp.password } : {},
				senderAddress: update.smtp.senderEmail,
				securityMode: mapWireSmtpSecurity(update.smtp.security)
			} : void 0;
			const value = await api.updateEmailProvider({
				applicationId,
				expectedRevision: detail.value.revision,
				enabled: update.enabled,
				delivery: {
					mode: update.smtpMode,
					...smtp ? { smtp } : {}
				},
				templates: {
					mode: update.templateMode,
					...update.templateMode === "custom" && update.templates ? {
						registerSignInZhCN: update.templates.loginZh,
						registerSignInEnUS: update.templates.loginEn,
						defaultTplZhCN: update.templates.defaultZh,
						defaultTplEnUS: update.templates.defaultEn
					} : {}
				}
			});
			if (request === operationRequest.current) {
				setDetail({
					provider: "email",
					value
				});
				await loadList();
				message.success(t("auth.detail.saveSuccess"));
			}
		} catch (error) {
			if (request === operationRequest.current) {
				const conflict = isRevisionConflict(error);
				const refreshed = requiresPostWriteRefresh(error) ? await refreshAfterWriteFailure("email") : true;
				if (request === operationRequest.current && refreshed) {
					let msg = t("common.actionFailed");
					if (conflict) msg = t("auth.error.configChanged");
					else if (isSecretRequired(error)) msg = t("auth.error.secretRequired");
					setOperationError(new Error(msg));
					message.error(msg);
				}
			}
		} finally {
			if (request === operationRequest.current) setSaving(false);
		}
	}, [
		api,
		applicationId,
		detail,
		loadList,
		refreshAfterWriteFailure,
		t
	]);
	const saveGoogle = (0, import_react$16.useCallback)(async (update) => {
		if (detail?.provider !== "google" || !detail.value.revision?.trim()) {
			const msg = t("common.actionFailed");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		if (update.credentialMode === "custom" && !update.clientId?.trim()) {
			const msg = t("auth.error.clientIdRequired");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		if (googleNeedsFreshSecret(detail.value, update) && !update.clientSecret) {
			const msg = t("auth.error.secretRequired");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		const request = ++operationRequest.current;
		setSaving(true);
		setOperationError(void 0);
		try {
			const value = await api.updateGoogleProvider({
				applicationId,
				expectedRevision: detail.value.revision,
				enabled: update.enabled,
				credentialMode: update.credentialMode,
				...update.credentialMode === "custom" && update.clientId ? { clientId: update.clientId } : {},
				...update.clientSecret ? { clientSecret: update.clientSecret } : {}
			});
			if (request === operationRequest.current) {
				setDetail({
					provider: "google",
					value
				});
				await loadList();
				message.success(t("auth.detail.saveSuccess"));
			}
		} catch (error) {
			if (request === operationRequest.current) {
				const conflict = isRevisionConflict(error);
				const refreshed = requiresPostWriteRefresh(error) ? await refreshAfterWriteFailure("google") : true;
				if (request === operationRequest.current && refreshed) {
					let msg = t("common.actionFailed");
					if (conflict) msg = t("auth.error.configChanged");
					else if (isSecretRequired(error)) msg = t("auth.error.secretRequired");
					setOperationError(new Error(msg));
					message.error(msg);
				}
			}
		} finally {
			if (request === operationRequest.current) setSaving(false);
		}
	}, [
		api,
		applicationId,
		detail,
		loadList,
		refreshAfterWriteFailure,
		t
	]);
	const saveEnabledProvider = (0, import_react$16.useCallback)(async (provider, enabled) => {
		const current = detail?.provider === provider ? detail : void 0;
		if (!current || current.provider === "phone" && !current.value.revision?.trim()) {
			const msg = t("common.actionFailed");
			setOperationError(new Error(msg));
			message.error(msg);
			return;
		}
		const request = ++operationRequest.current;
		setSaving(true);
		setOperationError(void 0);
		try {
			const value = current.provider === "phone" ? await api.updatePhoneProvider({
				applicationId,
				expectedRevision: current.value.revision,
				enabled
			}) : await api.updateWechatMiniProgramProvider({
				applicationId,
				enabled
			});
			if (request === operationRequest.current) {
				setDetail({
					provider,
					value
				});
				await loadList();
				message.success(t("auth.detail.saveSuccess"));
			}
		} catch (error) {
			if (request === operationRequest.current) {
				const conflict = isRevisionConflict(error);
				const refreshed = requiresPostWriteRefresh(error) ? await refreshAfterWriteFailure(provider) : true;
				if (request === operationRequest.current && refreshed) {
					const msg = conflict ? t("auth.error.configChanged") : t("common.actionFailed");
					setOperationError(new Error(msg));
					message.error(msg);
				}
			}
		} finally {
			if (request === operationRequest.current) setSaving(false);
		}
	}, [
		api,
		applicationId,
		detail,
		loadList,
		refreshAfterWriteFailure,
		t
	]);
	const savePhone = (0, import_react$16.useCallback)((update) => saveEnabledProvider("phone", update.enabled), [saveEnabledProvider]);
	const saveWechatMiniProgram = (0, import_react$16.useCallback)((update) => saveEnabledProvider("wechatMiniProgram", update.enabled), [saveEnabledProvider]);
	const emailConfig = (0, import_react$16.useMemo)(() => detail?.provider === "email" ? mapEmailConfig(detail.value) : void 0, [detail]);
	const googleConfig = (0, import_react$16.useMemo)(() => detail?.provider === "google" ? mapGoogleConfig(detail.value) : void 0, [detail]);
	const phoneConfig = (0, import_react$16.useMemo)(() => detail?.provider === "phone" ? mapPhoneConfig(detail.value) : void 0, [detail]);
	const wechatMiniProgramConfig = (0, import_react$16.useMemo)(() => detail?.provider === "wechatMiniProgram" ? mapWechatMiniProgramConfig(detail.value) : void 0, [detail]);
	const detailUnavailable = !detail || detail.provider !== selectedProvider;
	if (!selectedProvider || detailUnavailable && selectedProvider !== "phone" && selectedProvider !== "wechatMiniProgram") return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AuthModule, {
		applicationType,
		providerStatuses: statuses,
		loading: listLoading || detailLoading,
		error: detailError ?? listError,
		onRetry: selectedProvider ? () => ignore(loadDetail(selectedProvider)) : () => ignore(loadList()),
		onProviderSelect: handleProviderSelect
	});
	if (detailUnavailable) return selectedProvider === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AuthPhoneDetail, {
		config: { enabled: statuses.phone === "enabled" },
		loading: detailLoading,
		errorMessage: detailError?.message,
		onRetry: () => ignore(loadDetail(selectedProvider)),
		showSave: true,
		onCancel: handleBack
	}) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AuthWechatMiniProgramDetail, {
		config: { enabled: statuses.wechatMiniProgram === "enabled" },
		loading: detailLoading,
		errorMessage: detailError?.message,
		onRetry: () => ignore(loadDetail(selectedProvider)),
		showSave: true,
		onCancel: handleBack
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AuthAdminDetail, {
		detail,
		emailConfig,
		googleConfig,
		phoneConfig,
		wechatMiniProgramConfig,
		errorMessage: operationError?.message ?? (detailError || listError ? t("common.loadFailed") : void 0),
		loading: saving || detailLoading,
		onEmailSave: writeEnabled ? saveEmail : void 0,
		onGoogleSave: writeEnabled ? saveGoogle : void 0,
		onPhoneSave: writeEnabled ? savePhone : void 0,
		onWechatMiniProgramSave: writeEnabled ? saveWechatMiniProgram : void 0,
		onBack: handleBack,
		onRetry: () => ignore(refreshAfterWriteFailure(selectedProvider))
	});
}
var import_react$16, import_jsx_runtime$12, UNKNOWN_STATUSES;
var init_auth_admin_module = __esmMin((() => {
	init_src();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_auth_admin_adapter();
	init_auth_admin_detail();
	init_auth_module();
	init_auth_phone_detail();
	init_auth_wechat_detail();
	import_jsx_runtime$12 = require_jsx_runtime();
	UNKNOWN_STATUSES = {
		email: "unknown",
		phone: "unknown",
		google: "unknown"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/types.ts
var init_types$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/auth/index.ts
var init_auth = __esmMin((() => {
	init_auth_module();
	init_auth_admin_module();
	init_auth_google_detail();
	init_auth_email_detail();
	init_types$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-module.scss
var init_database_module$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-csv.ts
function stringifyDatabaseCell(value) {
	if (value === null || value === void 0) return "—";
	if (typeof value === "object") try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
	return String(value);
}
function escapeCsvCell(value) {
	const displayText = stringifyDatabaseCell(value);
	const text = typeof value === "string" && /^[=+\-@\t\r]/u.test(value) ? `'${displayText}` : displayText;
	return /[",\n]/u.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}
function createCsv(columns, rows) {
	return [columns.map(escapeCsvCell).join(","), ...rows.map((row) => columns.map((column) => escapeCsvCell(row[column])).join(","))].join("\n");
}
var init_database_csv = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-filter.tsx
function DatabaseFilter({ columns, filters, onApply }) {
	const t = useCloudServiceI18n();
	const [draft, setDraft] = (0, import_react$15.useState)(filters);
	(0, import_react$15.useEffect)(() => {
		setDraft(filters);
	}, [filters]);
	const addFilter = (0, import_react$15.useCallback)(() => {
		if (columns.length === 0) return;
		setDraft((prev) => [...prev, {
			column: columns[0],
			operator: "eq",
			value: ""
		}]);
	}, [columns]);
	const removeFilter = (0, import_react$15.useCallback)((index) => {
		setDraft((prev) => prev.filter((_, i) => i !== index));
	}, []);
	const updateFilter = (0, import_react$15.useCallback)((index, patch) => {
		setDraft((prev) => prev.map((f, i) => i === index ? {
			...f,
			...patch
		} : f));
	}, []);
	const handleApply = (0, import_react$15.useCallback)(() => {
		onApply(draft.filter((f) => UNARY_OPERATORS$1.has(f.operator) || f.value !== ""));
	}, [draft, onApply]);
	const handleClear = (0, import_react$15.useCallback)(() => {
		setDraft([]);
		onApply([]);
	}, [onApply]);
	const operatorOptions = OPERATORS.map((op) => ({
		value: op,
		label: t(`database.filter.op.${op}`)
	}));
	const columnOptions = columns.map((col) => ({
		value: col,
		label: col
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
		className: "cloud-service-database__filter-panel",
		children: [draft.map((filter, index) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "cloud-service-database__filter-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Select, {
					className: "cloud-service-database__filter-col",
					size: "small",
					value: filter.column,
					options: columnOptions,
					onChange: (val) => updateFilter(index, { column: val })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Select, {
					className: "cloud-service-database__filter-op",
					size: "small",
					value: filter.operator,
					options: operatorOptions,
					onChange: (val) => updateFilter(index, { operator: val })
				}),
				!UNARY_OPERATORS$1.has(filter.operator) && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Input, {
					className: "cloud-service-database__filter-value",
					size: "small",
					value: filter.value,
					placeholder: t("database.filter.value"),
					onChange: (e) => updateFilter(index, { value: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Button, {
					iconOnly: true,
					size: "small",
					variant: "ghost",
					"aria-label": t("database.filter.remove"),
					onClick: () => removeFilter(index),
					children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(XCloseIcon, {})
				})
			]
		}, index)), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "cloud-service-database__filter-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Button, {
				size: "small",
				variant: "ghost",
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AddIcon, {}),
				onClick: addFilter,
				disabled: columns.length === 0,
				children: t("database.filter.add")
			}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "cloud-service-database__filter-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Button, {
					size: "small",
					variant: "ghost",
					onClick: handleClear,
					children: t("database.filter.clear")
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Button, {
					size: "small",
					onClick: handleApply,
					children: t("database.filter.apply")
				})]
			})]
		})]
	});
}
var import_react$15, import_jsx_runtime$11, OPERATORS, UNARY_OPERATORS$1;
var init_database_filter = __esmMin((() => {
	init_src();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$11 = require_jsx_runtime();
	OPERATORS = [
		"eq",
		"neq",
		"gt",
		"gte",
		"lt",
		"lte",
		"like",
		"is_null",
		"is_not_null"
	];
	UNARY_OPERATORS$1 = /* @__PURE__ */ new Set(["is_null", "is_not_null"]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-data-view.tsx
function downloadCsv(table, columns, rows) {
	const csv = createCsv(columns, rows);
	const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = `${table}.csv`;
	anchor.click();
	URL.revokeObjectURL(url);
}
function SortIndicator({ column, sort }) {
	if (!sort || sort.column !== column) return null;
	return sort.direction === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ChevronUpIcon, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ChevronDownIcon, { size: "sm" });
}
function InlineEditCell({ value, displayValue, onSave, disabled }) {
	const [editing, setEditing] = (0, import_react$14.useState)(false);
	const [draft, setDraft] = (0, import_react$14.useState)("");
	const inputRef = (0, import_react$14.useRef)(null);
	const committingRef = (0, import_react$14.useRef)(false);
	const startEditing = (0, import_react$14.useCallback)(() => {
		if (disabled) return;
		setDraft(value === null || value === void 0 ? "" : String(value));
		setEditing(true);
		setTimeout(() => inputRef.current?.focus(), 0);
	}, [disabled, value]);
	const commit = (0, import_react$14.useCallback)(async () => {
		if (disabled || committingRef.current) return;
		if (draft === (value === null || value === void 0 ? "" : String(value))) {
			setEditing(false);
			return;
		}
		committingRef.current = true;
		try {
			await onSave(draft);
			setEditing(false);
		} catch {
			inputRef.current?.focus();
		} finally {
			committingRef.current = false;
		}
	}, [
		disabled,
		draft,
		onSave,
		value
	]);
	const handleKeyDown = (0, import_react$14.useCallback)((e) => {
		if (e.key === "Enter") commit().catch(() => void 0);
		else if (e.key === "Escape") setEditing(false);
	}, [commit]);
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("input", {
		ref: inputRef,
		className: "cloud-service-database__inline-input",
		value: draft,
		disabled,
		onChange: (e) => setDraft(e.target.value),
		onBlur: commit,
		onKeyDown: handleKeyDown
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
		type: "button",
		className: `cloud-service-database__cell ${disabled ? "" : "cloud-service-database__cell--editable"}`,
		title: displayValue,
		disabled,
		onClick: startEditing,
		children: displayValue
	});
}
function isDateTimeColumn(type) {
	return type !== void 0 && /(?:timestamp|timestamptz|datetime)/iu.test(type);
}
function DatabaseDataView({ tables, selectedTable, schema, rows, loading, page, pageSize, total, filters, sort, hasPrimaryKey, writeEnabled, mutating, onSelectTable, onRefresh, onPageChange, onFiltersChange, onSortChange, onInsertRow, onUpdateCell, onDeleteRow }) {
	const t = useCloudServiceI18n();
	const [showFilters, setShowFilters] = (0, import_react$14.useState)(false);
	const columnNames = (0, import_react$14.useMemo)(() => {
		const schemaColumns = schema?.columns.map((column) => column.name) ?? [];
		if (schemaColumns.length > 0) return schemaColumns;
		return Object.keys(rows[0] ?? {});
	}, [rows, schema]);
	const toggleSort = (0, import_react$14.useCallback)((column) => {
		if (sort?.column === column) {
			if (sort.direction === "asc") onSortChange({
				column,
				direction: "desc"
			});
			else onSortChange(void 0);
		} else onSortChange({
			column,
			direction: "asc"
		});
	}, [sort, onSortChange]);
	const pkColumns = (0, import_react$14.useMemo)(() => new Set(schema?.columns.filter((c) => c.primaryKey).map((c) => c.name) ?? []), [schema]);
	const columns = (0, import_react$14.useMemo)(() => {
		const dataCols = columnNames.map((name) => {
			const column = schema?.columns.find((item) => item.name === name);
			return {
				key: name,
				title: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: "cloud-service-database__sortable-header",
					onClick: () => toggleSort(name),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SortIndicator, {
						column: name,
						sort
					})]
				}),
				width: 180,
				render: (row, index) => {
					const value = row[name];
					const rawValue = stringifyDatabaseCell(value);
					const displayValue = isDateTimeColumn(column?.type) && typeof value === "string" ? formatCloudServiceDateTime(value) : rawValue;
					return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(InlineEditCell, {
						value,
						displayValue,
						disabled: !writeEnabled || !hasPrimaryKey || pkColumns.has(name) || mutating,
						onSave: (newValue) => onUpdateCell(index, name, newValue)
					});
				}
			};
		});
		if (writeEnabled && hasPrimaryKey) dataCols.push({
			key: "__actions",
			title: "",
			width: 50,
			render: (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Popconfirm, {
				title: t("database.row.deleteConfirm"),
				description: t("database.row.deleteConfirmDesc"),
				okType: "danger",
				okText: t("common.delete"),
				cancelText: t("common.cancel"),
				onConfirm: () => onDeleteRow(index),
				children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
					iconOnly: true,
					size: "small",
					variant: "ghost",
					disabled: mutating,
					"aria-label": t("database.row.delete"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DeleteIcon, {})
				})
			})
		});
		return dataCols;
	}, [
		columnNames,
		schema,
		sort,
		toggleSort,
		writeEnabled,
		hasPrimaryKey,
		pkColumns,
		mutating,
		onUpdateCell,
		onDeleteRow,
		t
	]);
	const selectedMetadata = tables.find((table) => table.name === selectedTable);
	const tableOptions = tables.length > 0 ? tables.map((table) => ({
		value: table.name,
		label: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("span", {
			className: "cloud-service-database__table-option",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DatabaseToolIcon, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: table.name })]
		})
	})) : [{
		value: EMPTY_TABLE_OPTION_VALUE,
		label: t("database.table.none"),
		disabled: true
	}];
	const activeFilterCount = filters.length;
	const filterDisabled = !selectedTable || loading || !schema;
	const filterTitle = activeFilterCount > 0 ? t("database.filter.active", { count: String(activeFilterCount) }) : t("database.filter");
	const tableScrollX = columnNames.length > 0 ? columnNames.length * 180 + (writeEnabled && hasPrimaryKey ? 50 : 0) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("section", {
		className: "cloud-service-database__data",
		"aria-label": t("database.data.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "cloud-service-database__toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Select, {
					className: "cloud-service-database__table-select",
					size: "small",
					value: selectedTable,
					loading: loading && tables.length === 0,
					displayLabel: selectedTable && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("span", {
						className: "cloud-service-database__table-option",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DatabaseToolIcon, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: selectedTable })]
					}),
					options: tableOptions,
					placeholder: t("database.table.placeholder"),
					onChange: (table) => {
						if (table !== EMPTY_TABLE_OPTION_VALUE) onSelectTable(table);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "cloud-service-database__actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
							iconOnly: true,
							size: "small",
							"aria-label": t("common.refresh"),
							title: t("common.refresh"),
							loading,
							onClick: onRefresh,
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(WbRefreshIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Tooltip, {
							content: filterTitle,
							placement: "top",
							interactive: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "cloud-service-database__action-tooltip-trigger",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
									iconOnly: true,
									size: "small",
									"aria-label": t("database.filter"),
									disabled: filterDisabled,
									onClick: () => setShowFilters((prev) => !prev),
									variant: activeFilterCount > 0 ? "primary" : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TaskFilterIcon, {})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
							iconOnly: true,
							size: "small",
							disabled: true,
							"aria-label": t("database.columns"),
							title: t("database.columns.unavailable"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ColumnsIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
							size: "small",
							className: "cloud-service-database__responsive-action",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AddIcon, {}),
							"aria-label": t("database.row.add"),
							title: t("database.row.add"),
							disabled: !writeEnabled || !selectedTable || loading || !schema,
							onClick: onInsertRow,
							children: t("database.row.add")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
							size: "small",
							className: "cloud-service-database__responsive-action",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(UploadIcon, {}),
							"aria-label": t("database.exportCsv"),
							title: t("database.exportCsv"),
							disabled: loading || !selectedTable || rows.length === 0,
							onClick: () => selectedTable && downloadCsv(selectedTable, columnNames, rows),
							children: t("database.exportCsv")
						})
					]
				})]
			}),
			showFilters && selectedTable && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DatabaseFilter, {
				columns: columnNames,
				filters,
				onApply: onFiltersChange
			}),
			selectedMetadata?.comment && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
				className: "cloud-service-database__description",
				children: t("database.table.description", { description: selectedMetadata.comment })
			}),
			!hasPrimaryKey && schema && schema.columns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
				className: "cloud-service-database__no-pk-hint",
				children: t("database.row.noPrimaryKey")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Table, {
				className: "cloud-service-database__table",
				columns,
				dataSource: rows,
				rowKey: (row, index) => {
					const primaryKey = schema?.columns.filter((column) => column.primaryKey) ?? [];
					if (primaryKey.length === 0) return index;
					return primaryKey.map((column) => String(row[column.name])).join("\0");
				},
				loading: mutating,
				size: "compact",
				hover: true,
				bordered: true,
				scroll: {
					x: tableScrollX,
					y: 480
				},
				empty: selectedTable ? t("database.table.empty") : t("database.table.none")
			}),
			total > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Pagination, {
				className: "cloud-service-database__pagination",
				current: page,
				pageSize,
				total,
				disabled: loading || mutating,
				onChange: (p) => onPageChange(p),
				totalText: (n) => t("database.pagination.total", { total: String(n) })
			})
		]
	});
}
var import_react$14, import_jsx_runtime$10, EMPTY_TABLE_OPTION_VALUE;
var init_database_data_view = __esmMin((() => {
	init_src();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_utils();
	init_database_csv();
	init_database_filter();
	import_jsx_runtime$10 = require_jsx_runtime();
	EMPTY_TABLE_OPTION_VALUE = "__cloud-service-empty-table__";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-sql-builder.ts
function quoteIdentifier(identifier) {
	return `"${identifier.replaceAll("\"", "\"\"")}"`;
}
function buildWhereClause(filters, paramOffset) {
	const activeFilters = filters.filter((f) => UNARY_OPERATORS.has(f.operator) || f.value !== "");
	if (activeFilters.length === 0) return {
		clause: "",
		parameters: []
	};
	const conditions = [];
	const parameters = [];
	let paramIndex = paramOffset;
	for (const filter of activeFilters) {
		const col = quoteIdentifier(filter.column);
		if (UNARY_OPERATORS.has(filter.operator)) conditions.push(`${col} ${OPERATOR_SQL[filter.operator]}`);
		else if (filter.operator === "like") {
			paramIndex++;
			conditions.push(`${col}::text ${OPERATOR_SQL[filter.operator]} $${paramIndex}`);
			parameters.push(`%${filter.value}%`);
		} else {
			paramIndex++;
			conditions.push(`${col} ${OPERATOR_SQL[filter.operator]} $${paramIndex}`);
			parameters.push(filter.value);
		}
	}
	return {
		clause: ` WHERE ${conditions.join(" AND ")}`,
		parameters
	};
}
function buildOrderByClause(sort) {
	if (!sort) return "";
	return ` ORDER BY ${quoteIdentifier(sort.column)} ${sort.direction === "desc" ? "DESC" : "ASC"}`;
}
function buildCountQuery(table, filters) {
	const { clause, parameters } = buildWhereClause(filters, 0);
	return {
		sql: `SELECT count(*)::int AS total FROM ${quoteIdentifier(table)}${clause}`,
		parameters
	};
}
function buildSelectQuery(table, filters, sort, limit, offset) {
	const { clause, parameters } = buildWhereClause(filters, 0);
	const orderBy = buildOrderByClause(sort);
	return {
		sql: `SELECT * FROM ${quoteIdentifier(table)}${clause}${orderBy} LIMIT ${limit} OFFSET ${offset}`,
		parameters
	};
}
/** Lists user-visible routines without requiring the unavailable dedicated functions API. */
function buildListFunctionsQuery() {
	return `SELECT
    r.routine_schema,
    r.routine_name,
    r.specific_name,
    r.routine_type,
    r.data_type AS return_type,
    COALESCE(
        string_agg(
            concat_ws(' ', NULLIF(p.parameter_mode, 'IN'), p.parameter_name, p.data_type),
            ', ' ORDER BY p.ordinal_position
        ) FILTER (WHERE p.ordinal_position IS NOT NULL),
        ''
    ) AS arguments
FROM information_schema.routines r
LEFT JOIN information_schema.parameters p
    ON p.specific_schema = r.specific_schema
    AND p.specific_name = r.specific_name
WHERE r.routine_schema = 'public'
    AND r.routine_type = 'FUNCTION'
    AND r.data_type NOT IN ('trigger', 'event_trigger')
GROUP BY r.routine_schema, r.routine_name, r.specific_name, r.routine_type, r.data_type
ORDER BY r.routine_schema, r.routine_name, r.specific_name`;
}
function buildInsertQuery(table, columns, values) {
	if (columns.length !== values.length) throw new Error("INSERT columns and values must have the same length");
	if (columns.length === 0) return {
		sql: `INSERT INTO ${quoteIdentifier(table)} DEFAULT VALUES`,
		parameters: []
	};
	const cols = columns.map(quoteIdentifier).join(", ");
	const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
	return {
		sql: `INSERT INTO ${quoteIdentifier(table)} (${cols}) VALUES (${placeholders})`,
		parameters: values
	};
}
function buildUpdateQuery(table, column, value, primaryKeys) {
	if (primaryKeys.length === 0) throw new Error("UPDATE requires at least one primary key for WHERE clause");
	const setCols = `${quoteIdentifier(column)} = $1`;
	const whereParts = primaryKeys.map((pk, i) => `${quoteIdentifier(pk.column)} = $${i + 2}`);
	return {
		sql: `UPDATE ${quoteIdentifier(table)} SET ${setCols} WHERE ${whereParts.join(" AND ")}`,
		parameters: [value, ...primaryKeys.map((pk) => pk.value)]
	};
}
function buildDeleteQuery(table, primaryKeys) {
	if (primaryKeys.length === 0) throw new Error("DELETE without WHERE clause is forbidden");
	const whereParts = primaryKeys.map((pk, i) => `${quoteIdentifier(pk.column)} = $${i + 1}`);
	return {
		sql: `DELETE FROM ${quoteIdentifier(table)} WHERE ${whereParts.join(" AND ")}`,
		parameters: primaryKeys.map((pk) => pk.value)
	};
}
function formatParamValue(value, type) {
	if (value === null || value === void 0) return null;
	if (value === "") {
		const normalizedType = type.toLowerCase();
		return /(^|\s)(text|varchar|char|character varying|citext)(\s|$)/u.test(normalizedType) ? "" : null;
	}
	if (Array.isArray(value)) return `{${value.map((v) => String(v)).join(",")}}`;
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}
function isAutoGeneratedColumn(defaultExpr) {
	if (!defaultExpr) return false;
	const lower = defaultExpr.toLowerCase().replace(/'(?:''|[^'])*'/gu, "");
	return lower.includes("generated always") || lower.includes("nextval(") || lower.includes("gen_random_uuid()") || /\b(?:now|clock_timestamp|statement_timestamp|transaction_timestamp)\s*\(\s*\)/u.test(lower) || /\b(?:current_timestamp|localtimestamp)(?:\s*\(\s*\d+\s*\))?\b/u.test(lower);
}
var UNARY_OPERATORS, OPERATOR_SQL;
var init_database_sql_builder = __esmMin((() => {
	UNARY_OPERATORS = /* @__PURE__ */ new Set(["is_null", "is_not_null"]);
	OPERATOR_SQL = {
		eq: "=",
		neq: "!=",
		gt: ">",
		gte: ">=",
		lt: "<",
		lte: "<=",
		like: "ILIKE",
		is_null: "IS NULL",
		is_not_null: "IS NOT NULL"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-functions-view.tsx
function readString(row, key) {
	const value = row[key];
	return typeof value === "string" ? value : "";
}
function normalizeFunctions(result) {
	if (!Array.isArray(result)) return [];
	return result.flatMap((value) => {
		if (!value || typeof value !== "object" || Array.isArray(value)) return [];
		const row = value;
		const schema = readString(row, "routine_schema");
		const name = readString(row, "routine_name");
		const specificName = readString(row, "specific_name");
		if (!name || !specificName) return [];
		return [{
			id: `${schema}.${specificName}`,
			schema,
			name,
			kind: readString(row, "routine_type"),
			returnType: readString(row, "return_type"),
			arguments: readString(row, "arguments")
		}];
	});
}
function DatabaseFunctionsView({ applicationId, client }) {
	const t = useCloudServiceI18n();
	const requestSequence = (0, import_react$13.useRef)(0);
	const [functions, setFunctions] = (0, import_react$13.useState)([]);
	const [loading, setLoading] = (0, import_react$13.useState)(true);
	const [error, setError] = (0, import_react$13.useState)();
	const columns = (0, import_react$13.useMemo)(() => [
		{
			key: "schema",
			title: t("database.functions.schema"),
			dataIndex: "schema",
			width: 120
		},
		{
			key: "name",
			title: t("database.functions.name"),
			dataIndex: "name",
			width: 180
		},
		{
			key: "kind",
			title: t("database.functions.kind"),
			width: 100,
			render: (fn) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Tag, { children: fn.kind || "FUNCTION" })
		},
		{
			key: "arguments",
			title: t("database.functions.arguments"),
			width: 260,
			render: (fn) => fn.arguments || "—"
		},
		{
			key: "returnType",
			title: t("database.functions.returnType"),
			width: 160,
			render: (fn) => fn.returnType || "—"
		}
	], [t]);
	const load = (0, import_react$13.useCallback)(async () => {
		const request = ++requestSequence.current;
		setLoading(true);
		setError(void 0);
		try {
			const result = await client.executeSql({
				applicationId,
				sql: buildListFunctionsQuery(),
				mode: "read"
			});
			if (request === requestSequence.current) setFunctions(normalizeFunctions(result.result));
		} catch (nextError) {
			if (request === requestSequence.current) setError(nextError instanceof Error ? nextError : new Error(String(nextError)));
		} finally {
			if (request === requestSequence.current) setLoading(false);
		}
	}, [applicationId, client]);
	(0, import_react$13.useEffect)(() => {
		load().catch(() => void 0);
		return () => {
			++requestSequence.current;
		};
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("section", {
		className: "cloud-service-database__functions",
		"aria-busy": loading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", { children: t("database.functions.readOnly") }),
			error && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "cloud-service-database__functions-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { children: t("common.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Button, {
					variant: "link",
					onClick: () => {
						load().catch(() => void 0);
					},
					children: t("common.retry")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Table, {
				columns,
				dataSource: functions,
				rowKey: "id",
				loading,
				size: "compact",
				hover: true,
				bordered: true,
				scroll: {
					x: 820,
					y: 480
				},
				empty: t("database.functions.empty")
			})
		]
	});
}
var import_react$13, import_jsx_runtime$9;
var init_database_functions_view = __esmMin((() => {
	init_src();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_database_sql_builder();
	import_jsx_runtime$9 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-permissions-view.tsx
function DatabasePermissionsView({ tables, selectedTable, policies, loading, error, onRetry }) {
	const t = useCloudServiceI18n();
	const columns = (0, import_react$12.useMemo)(() => [
		{
			key: "name",
			title: t("database.permissions.policy"),
			dataIndex: "name",
			width: 180
		},
		{
			key: "command",
			title: t("database.permissions.command"),
			width: 100,
			render: (policy) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tag, { children: policy.command })
		},
		{
			key: "roles",
			title: t("database.permissions.roles"),
			dataIndex: "roles",
			width: 180
		},
		{
			key: "using",
			title: "USING",
			width: 220,
			render: (policy) => policy.using || "—"
		},
		{
			key: "withCheck",
			title: "WITH CHECK",
			width: 220,
			render: (policy) => policy.withCheck || "—"
		}
	], [t]);
	const orderedTables = (0, import_react$12.useMemo)(() => [...tables].sort((left, right) => {
		if (left.name === selectedTable) return -1;
		if (right.name === selectedTable) return 1;
		return left.name.localeCompare(right.name);
	}), [selectedTable, tables]);
	const enabledCount = tables.filter((table) => table.rlsOn).length;
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("section", {
		className: "cloud-service-database__permissions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "cloud-service-database__permissions-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("h2", { children: t("database.permissions.summary") }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tag, { children: t("database.permissions.summaryCounts", {
					enabled: enabledCount,
					total: tables.length,
					policies: policies.length
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", { children: t("database.permissions.readOnly") }),
			error && /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "cloud-service-database__permissions-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("common.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
					variant: "link",
					onClick: onRetry,
					children: t("common.retry")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "cloud-service-database__permissions-groups",
				children: orderedTables.length ? orderedTables.map((table) => {
					const tablePolicies = policies.filter((policy) => policy.table === table.name);
					return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("section", {
						className: "cloud-service-database__permissions-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
							className: "cloud-service-database__permissions-group-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("h3", { children: table.name }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tag, { children: table.rlsOn ? t("database.permissions.enabled") : t("database.permissions.statusUnknown") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Table, {
							className: "cloud-service-database__permissions-table",
							columns,
							dataSource: tablePolicies,
							rowKey: (policy) => `${policy.schema}.${policy.table}.${policy.name}`,
							loading,
							size: "compact",
							hover: true,
							scroll: {
								x: 900,
								y: 320
							},
							empty: table.rlsOn ? t("database.permissions.emptyEnabled") : t("database.permissions.emptyDisabled")
						})]
					}, table.name);
				}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Table, {
					columns: [],
					dataSource: [],
					rowKey: "name",
					loading,
					size: "compact",
					bordered: true,
					empty: t("database.table.none")
				})
			})
		]
	});
}
var import_react$12, import_jsx_runtime$8;
var init_database_permissions_view = __esmMin((() => {
	init_src();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-row-form.tsx
function DatabaseRowForm({ open, columns, onClose, onSubmit }) {
	const t = useCloudServiceI18n();
	const [values, setValues] = (0, import_react$11.useState)({});
	const [submitError, setSubmitError] = (0, import_react$11.useState)();
	const editableColumns = (0, import_react$11.useMemo)(() => columns.filter((col) => !col.primaryKey && !isAutoGeneratedColumn(col.default)), [columns]);
	const handleChange = (0, import_react$11.useCallback)((column, value) => {
		setValues((prev) => ({
			...prev,
			[column]: value
		}));
		setSubmitError(void 0);
	}, []);
	const handleOk = (0, import_react$11.useCallback)(async () => {
		const nonEmpty = {};
		for (const col of editableColumns) {
			const val = values[col.name];
			if (val !== void 0 && val !== "") nonEmpty[col.name] = val;
		}
		try {
			await onSubmit(nonEmpty);
			setValues({});
			setSubmitError(void 0);
			return true;
		} catch {
			setSubmitError(t("common.actionFailed"));
			return false;
		}
	}, [
		editableColumns,
		values,
		onSubmit,
		t
	]);
	const handleOpenChange = (0, import_react$11.useCallback)((isOpen) => {
		if (!isOpen) {
			setValues({});
			setSubmitError(void 0);
			onClose();
		}
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Modal, {
		open,
		onOpenChange: handleOpenChange,
		title: t("database.row.insert"),
		size: "medium",
		okText: t("common.save"),
		cancelText: t("common.cancel"),
		onOk: handleOk,
		onCancel: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "cloud-service-database__row-form",
			children: [submitError && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "cloud-service-database__row-form-error",
				role: "alert",
				children: submitError
			}), editableColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "cloud-service-database__row-form-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("label", {
					className: "cloud-service-database__row-form-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: col.name }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "cloud-service-database__row-form-type",
						children: col.type
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Input, {
					size: "small",
					placeholder: col.nullable ? "NULL" : "",
					value: values[col.name] ?? "",
					onChange: (e) => handleChange(col.name, e.target.value)
				})]
			}, col.name))]
		})
	});
}
var import_react$11, import_jsx_runtime$7;
var init_database_row_form = __esmMin((() => {
	init_src();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_database_sql_builder();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/use-database-mutations.ts
function normalizeError(error) {
	return error instanceof Error ? error : new Error(String(error));
}
function useDatabaseMutations({ applicationId, client, selectedTable, schema, rows, reloadCurrentData, onStart, onError }) {
	const [mutating, setMutating] = (0, import_react$10.useState)(false);
	const executeWrite = (0, import_react$10.useCallback)(async (sql, parameters, reportError) => {
		onStart();
		setMutating(true);
		try {
			await client.executeSql({
				applicationId,
				sql,
				parameters: parameters.length > 0 ? parameters : void 0,
				mode: "write"
			});
			await reloadCurrentData();
		} catch (error) {
			if (reportError) onError(normalizeError(error));
			throw error;
		} finally {
			setMutating(false);
		}
	}, [
		applicationId,
		client,
		onError,
		onStart,
		reloadCurrentData
	]);
	return {
		mutating,
		insertRow: (0, import_react$10.useCallback)(async (values) => {
			if (!selectedTable || !schema) return;
			const columns = Object.keys(values).filter((column) => values[column] !== void 0);
			const typeLookup = new Map(schema.columns.map((column) => [column.name, column.type]));
			const query = buildInsertQuery(selectedTable, columns, columns.map((column) => formatParamValue(values[column], typeLookup.get(column) ?? "text")));
			await executeWrite(query.sql, query.parameters, false);
		}, [
			executeWrite,
			schema,
			selectedTable
		]),
		updateCell: (0, import_react$10.useCallback)(async (rowIndex, column, value) => {
			if (!selectedTable || !schema) return;
			const primaryKeyColumns = schema.columns.filter((candidate) => candidate.primaryKey);
			if (primaryKeyColumns.length === 0) throw new Error("No primary key");
			const row = rows[rowIndex];
			if (!row) return;
			const query = buildUpdateQuery(selectedTable, column, formatParamValue(value, new Map(schema.columns.map((candidate) => [candidate.name, candidate.type])).get(column) ?? "text"), primaryKeyColumns.map((primaryKey) => ({
				column: primaryKey.name,
				value: row[primaryKey.name]
			})));
			await executeWrite(query.sql, query.parameters, true);
		}, [
			executeWrite,
			rows,
			schema,
			selectedTable
		]),
		deleteRow: (0, import_react$10.useCallback)(async (rowIndex) => {
			if (!selectedTable || !schema) return;
			const primaryKeyColumns = schema.columns.filter((column) => column.primaryKey);
			if (primaryKeyColumns.length === 0) throw new Error("No primary key");
			const row = rows[rowIndex];
			if (!row) return;
			const query = buildDeleteQuery(selectedTable, primaryKeyColumns.map((primaryKey) => ({
				column: primaryKey.name,
				value: row[primaryKey.name]
			})));
			await executeWrite(query.sql, query.parameters, true);
		}, [
			executeWrite,
			rows,
			schema,
			selectedTable
		])
	};
}
var import_react$10;
var init_use_database_mutations = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_database_sql_builder();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/use-database-module.ts
function normalizeRows(result) {
	if (!Array.isArray(result)) return [];
	return result.filter((row) => typeof row === "object" && row !== null && !Array.isArray(row));
}
function extractTotal(result) {
	const rows = normalizeRows(result);
	if (rows.length === 0) return 0;
	const val = rows[0].total;
	return typeof val === "number" ? val : 0;
}
function useDatabaseModule(applicationId, client) {
	const [state, setState] = (0, import_react$9.useState)(INITIAL_STATE);
	const selectedTableRef = (0, import_react$9.useRef)();
	const requestSequenceRef = (0, import_react$9.useRef)(0);
	const policyRequestSequenceRef = (0, import_react$9.useRef)(0);
	const filtersRef = (0, import_react$9.useRef)([]);
	const sortRef = (0, import_react$9.useRef)();
	const pageRef = (0, import_react$9.useRef)(1);
	const pageSizeRef = (0, import_react$9.useRef)(DEFAULT_PAGE_SIZE);
	const loadTableData = (0, import_react$9.useCallback)(async (table, schema, page, pageSize, filters, sort, requestSequence) => {
		const selectQ = buildSelectQuery(table, filters, sort, pageSize, (page - 1) * pageSize);
		const countQ = buildCountQuery(table, filters);
		const [sqlResult, countResult] = await Promise.all([client.executeSql({
			applicationId,
			sql: selectQ.sql,
			parameters: selectQ.parameters.length > 0 ? selectQ.parameters : void 0,
			mode: "read"
		}), client.executeSql({
			applicationId,
			sql: countQ.sql,
			parameters: countQ.parameters.length > 0 ? countQ.parameters : void 0,
			mode: "read"
		})]);
		if (requestSequence !== requestSequenceRef.current) return;
		setState((previous) => ({
			...previous,
			rows: normalizeRows(sqlResult.result),
			total: extractTotal(countResult.result),
			loadingTable: false
		}));
	}, [applicationId, client]);
	const loadSelectedTable = (0, import_react$9.useCallback)(async (table) => {
		const requestSequence = ++requestSequenceRef.current;
		let changingTable = false;
		setState((previous) => {
			changingTable = previous.selectedTable !== table;
			if (changingTable) {
				pageRef.current = 1;
				filtersRef.current = [];
				sortRef.current = void 0;
			}
			return {
				...previous,
				selectedTable: table,
				schema: changingTable ? void 0 : previous.schema,
				rows: changingTable ? [] : previous.rows,
				policies: changingTable ? [] : previous.policies,
				loadingPolicies: changingTable ? false : previous.loadingPolicies,
				policiesError: changingTable ? void 0 : previous.policiesError,
				mutationError: void 0,
				loadingTable: true,
				error: void 0,
				page: changingTable ? 1 : previous.page,
				filters: changingTable ? [] : previous.filters,
				sort: changingTable ? void 0 : previous.sort,
				total: changingTable ? 0 : previous.total
			};
		});
		try {
			const schema = await client.describeTable(applicationId, table);
			if (requestSequence !== requestSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				schema
			}));
			await loadTableData(table, schema, pageRef.current, pageSizeRef.current, filtersRef.current, sortRef.current, requestSequence);
		} catch (error) {
			if (requestSequence !== requestSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingTable: false,
				error: error instanceof Error ? error : new Error(String(error))
			}));
		}
	}, [
		applicationId,
		client,
		loadTableData
	]);
	const reloadCurrentData = (0, import_react$9.useCallback)(async () => {
		const table = selectedTableRef.current;
		if (!table || !state.schema) return;
		const requestSequence = ++requestSequenceRef.current;
		setState((previous) => ({
			...previous,
			loadingTable: true,
			error: void 0
		}));
		try {
			await loadTableData(table, state.schema, pageRef.current, pageSizeRef.current, filtersRef.current, sortRef.current, requestSequence);
		} catch (error) {
			if (requestSequence !== requestSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingTable: false,
				error: error instanceof Error ? error : new Error(String(error))
			}));
		}
	}, [loadTableData, state.schema]);
	const loadPolicies = (0, import_react$9.useCallback)(async () => {
		const table = selectedTableRef.current;
		if (!table) return;
		const requestSequence = ++policyRequestSequenceRef.current;
		setState((previous) => ({
			...previous,
			loadingPolicies: true,
			policiesError: void 0
		}));
		try {
			const policies = await client.listRlsPolicies(applicationId);
			if (requestSequence !== policyRequestSequenceRef.current || table !== selectedTableRef.current) return;
			setState((previous) => ({
				...previous,
				policies,
				loadingPolicies: false
			}));
		} catch (error) {
			if (requestSequence !== policyRequestSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingPolicies: false,
				policiesError: error instanceof Error ? error : new Error(String(error))
			}));
		}
	}, [applicationId, client]);
	const refreshTables = (0, import_react$9.useCallback)(async () => {
		const requestSequence = ++requestSequenceRef.current;
		setState((previous) => ({
			...previous,
			loadingTables: true,
			error: void 0
		}));
		try {
			const tables = await client.listTables(applicationId);
			if (requestSequence !== requestSequenceRef.current) return;
			const currentTable = selectedTableRef.current;
			const selectedTable = tables.some((table) => table.name === currentTable) ? currentTable : tables[0]?.name;
			++policyRequestSequenceRef.current;
			selectedTableRef.current = selectedTable;
			setState((previous) => ({
				...previous,
				tables,
				selectedTable,
				schema: void 0,
				rows: [],
				policies: [],
				loadingTables: false,
				loadingTable: Boolean(selectedTable),
				loadingPolicies: false,
				policiesError: void 0,
				mutationError: void 0,
				page: 1,
				total: 0,
				filters: [],
				sort: void 0
			}));
			pageRef.current = 1;
			filtersRef.current = [];
			sortRef.current = void 0;
			if (selectedTable) await loadSelectedTable(selectedTable);
		} catch (error) {
			if (requestSequence !== requestSequenceRef.current) return;
			setState((previous) => ({
				...previous,
				loadingTables: false,
				loadingTable: false,
				error: error instanceof Error ? error : new Error(String(error))
			}));
		}
	}, [
		applicationId,
		client,
		loadSelectedTable
	]);
	const selectTable = (0, import_react$9.useCallback)((table) => {
		if (!table || table === selectedTableRef.current) return;
		selectedTableRef.current = table;
		++policyRequestSequenceRef.current;
		loadSelectedTable(table).catch(() => void 0);
	}, [loadSelectedTable]);
	const refreshSelectedTable = (0, import_react$9.useCallback)(async () => {
		const table = selectedTableRef.current;
		if (table) await loadSelectedTable(table);
		else await refreshTables();
	}, [loadSelectedTable, refreshTables]);
	const setPage = (0, import_react$9.useCallback)((page) => {
		pageRef.current = page;
		setState((previous) => ({
			...previous,
			page
		}));
		reloadCurrentData().catch(() => void 0);
	}, [reloadCurrentData]);
	const setPageSize = (0, import_react$9.useCallback)((pageSize) => {
		pageSizeRef.current = pageSize;
		pageRef.current = 1;
		setState((previous) => ({
			...previous,
			pageSize,
			page: 1
		}));
		reloadCurrentData().catch(() => void 0);
	}, [reloadCurrentData]);
	const setFilters = (0, import_react$9.useCallback)((filters) => {
		filtersRef.current = filters;
		pageRef.current = 1;
		setState((previous) => ({
			...previous,
			filters,
			page: 1
		}));
		reloadCurrentData().catch(() => void 0);
	}, [reloadCurrentData]);
	const setSort = (0, import_react$9.useCallback)((sort) => {
		sortRef.current = sort;
		pageRef.current = 1;
		setState((previous) => ({
			...previous,
			sort,
			page: 1
		}));
		reloadCurrentData().catch(() => void 0);
	}, [reloadCurrentData]);
	const handleMutationError = (0, import_react$9.useCallback)((error) => {
		setState((previous) => ({
			...previous,
			mutationError: error
		}));
	}, []);
	const clearMutationError = (0, import_react$9.useCallback)(() => {
		setState((previous) => previous.mutationError ? {
			...previous,
			mutationError: void 0
		} : previous);
	}, []);
	const mutations = useDatabaseMutations({
		applicationId,
		client,
		selectedTable: state.selectedTable,
		schema: state.schema,
		rows: state.rows,
		reloadCurrentData,
		onStart: clearMutationError,
		onError: handleMutationError
	});
	(0, import_react$9.useEffect)(() => {
		selectedTableRef.current = void 0;
		pageRef.current = 1;
		filtersRef.current = [];
		sortRef.current = void 0;
		setState(INITIAL_STATE);
		refreshTables().catch(() => void 0);
		return () => {
			++requestSequenceRef.current;
			++policyRequestSequenceRef.current;
		};
	}, [refreshTables]);
	const hasPrimaryKey = state.schema?.columns.some((column) => column.primaryKey) ?? false;
	return {
		...state,
		selectTable,
		refreshTables,
		refreshSelectedTable,
		loadPolicies,
		setPage,
		setPageSize,
		setFilters,
		setSort,
		clearMutationError,
		...mutations,
		hasPrimaryKey
	};
}
var import_react$9, DEFAULT_PAGE_SIZE, INITIAL_STATE;
var init_use_database_module = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_database_sql_builder();
	init_use_database_mutations();
	DEFAULT_PAGE_SIZE = 50;
	INITIAL_STATE = {
		tables: [],
		rows: [],
		policies: [],
		loadingTables: true,
		loadingTable: false,
		loadingPolicies: false,
		page: 1,
		pageSize: DEFAULT_PAGE_SIZE,
		total: 0,
		filters: [],
		sort: void 0
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/database-module.tsx
function DatabaseModule({ applicationId, client, writeEnabled = false }) {
	const t = useCloudServiceI18n();
	const [activeSection, setActiveSection] = (0, import_react$8.useState)("data");
	const [insertModalOpen, setInsertModalOpen] = (0, import_react$8.useState)(false);
	const database = useDatabaseModule(applicationId, client);
	(0, import_react$8.useEffect)(() => {
		if (activeSection === "permissions" && database.selectedTable) database.loadPolicies().catch(() => void 0);
	}, [
		activeSection,
		database.loadPolicies,
		database.selectedTable
	]);
	const handleInsertRow = (0, import_react$8.useCallback)(async (values) => {
		await database.insertRow(values);
	}, [database.insertRow]);
	const handleSectionChange = (0, import_react$8.useCallback)((section) => {
		database.clearMutationError();
		setActiveSection(section);
	}, [database.clearMutationError]);
	if (database.error && database.tables.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
		className: "cloud-service-database__error",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h2", { children: t("database.loadFailed.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: t("common.loadFailed") }),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
				onClick: () => {
					database.refreshTables().catch(() => void 0);
				},
				children: t("common.retry")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
		className: "cloud-service-database",
		"aria-busy": database.loadingTables || database.loadingTable || database.loadingPolicies,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tabs, {
				className: "cloud-service-database__sections",
				activeKey: activeSection,
				size: "s",
				onChange: handleSectionChange,
				items: [
					{
						key: "data",
						label: t("database.section.data"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DatabaseDataView, {
							tables: database.tables,
							selectedTable: database.selectedTable,
							schema: database.schema,
							rows: database.rows,
							loading: database.loadingTables || database.loadingTable,
							page: database.page,
							pageSize: database.pageSize,
							total: database.total,
							filters: database.filters,
							sort: database.sort,
							hasPrimaryKey: database.hasPrimaryKey,
							writeEnabled,
							mutating: database.mutating,
							onSelectTable: database.selectTable,
							onRefresh: () => {
								database.refreshSelectedTable().catch(() => void 0);
							},
							onPageChange: database.setPage,
							onFiltersChange: database.setFilters,
							onSortChange: database.setSort,
							onInsertRow: () => setInsertModalOpen(true),
							onUpdateCell: database.updateCell,
							onDeleteRow: database.deleteRow
						})
					},
					{
						key: "functions",
						label: t("database.section.functions"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DatabaseFunctionsView, {
							applicationId,
							client
						})
					},
					{
						key: "permissions",
						label: t("database.section.permissions"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DatabasePermissionsView, {
							tables: database.tables,
							selectedTable: database.selectedTable,
							policies: database.policies,
							loading: database.loadingPolicies,
							error: database.policiesError,
							onRetry: () => {
								database.loadPolicies().catch(() => void 0);
							}
						})
					}
				]
			}),
			activeSection === "data" && database.error && database.tables.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "cloud-service-database__inline-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("common.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
					variant: "link",
					onClick: () => {
						database.refreshSelectedTable().catch(() => void 0);
					},
					children: t("common.retry")
				})]
			}),
			activeSection === "data" && database.mutationError && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "cloud-service-database__inline-error",
				role: "alert",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("common.actionFailed") })
			}),
			writeEnabled && database.schema && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DatabaseRowForm, {
				open: insertModalOpen,
				columns: database.schema.columns,
				onClose: () => setInsertModalOpen(false),
				onSubmit: handleInsertRow
			})
		]
	});
}
var import_react$8, import_jsx_runtime$6;
var init_database_module = __esmMin((() => {
	init_database_module$1();
	init_src();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_database_data_view();
	init_database_functions_view();
	init_database_permissions_view();
	init_database_row_form();
	init_use_database_module();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/database/index.ts
var init_database = __esmMin((() => {
	init_database_module();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-module.scss
var init_storage_module$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-adapter-helpers.ts
async function listAllStorageEntries(client, applicationId, path, isCurrent) {
	const entries = [];
	const visitedCursors = /* @__PURE__ */ new Set();
	let cursor;
	do {
		const result = await client.listStorageObjects(applicationId, {
			path,
			limit: 100,
			...cursor ? { cursor } : {}
		});
		if (!isCurrent()) return;
		entries.push(...result.entries);
		cursor = result.hasNext ? result.nextCursor : void 0;
		if (result.hasNext && !cursor) throw new Error("Storage cursor missing from paginated response");
		if (cursor && visitedCursors.has(cursor)) throw new Error("Storage cursor repeated in paginated response");
		if (cursor) visitedCursors.add(cursor);
	} while (cursor);
	return entries;
}
function formatStorageSize(bytes) {
	if (bytes === void 0 || !Number.isFinite(bytes) || bytes < 0) return "—";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let value = bytes;
	let unit = 0;
	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024;
		unit += 1;
	}
	return `${Math.round(value * 10) / 10} ${units[unit]}`;
}
function ownerLabel(entry) {
	const displayName = entry.owner.name ?? entry.owner.maskedEmail;
	return displayName ? `${displayName} (${entry.owner.id})` : entry.owner.id;
}
function mapStorageEntry(entry) {
	return {
		key: entry.path,
		name: entry.name,
		kind: entry.type,
		...entry.type === "file" ? { size: formatStorageSize(entry.sizeBytes) } : {},
		...entry.createdAt ? { createdAt: formatCloudServiceDateTime(entry.createdAt) } : {},
		...entry.updatedAt ? { updatedAt: formatCloudServiceDateTime(entry.updatedAt) } : {}
	};
}
function mapStorageObjectDetail(info, labels, preview = null) {
	const sizeBytes = info.type === "folder" ? info.totalSizeBytes : info.sizeBytes;
	return {
		key: info.path,
		name: info.name,
		title: info.name,
		metadata: [
			{
				label: labels.size,
				value: formatStorageSize(sizeBytes)
			},
			{
				label: labels.type,
				value: info.mimeType ?? info.type
			},
			{
				label: labels.owner,
				value: ownerLabel(info)
			},
			{
				label: labels.createdAt,
				value: info.createdAt ? formatCloudServiceDateTime(info.createdAt) : "—"
			},
			{
				label: labels.updatedAt,
				value: info.updatedAt ? formatCloudServiceDateTime(info.updatedAt) : "—"
			},
			...info.lastAccessedAt ? [{
				label: labels.lastAccessedAt,
				value: formatCloudServiceDateTime(info.lastAccessedAt)
			}] : []
		],
		preview
	};
}
function defaultIdempotencyKey() {
	if (typeof globalThis.crypto?.randomUUID === "function") return globalThis.crypto.randomUUID();
	const random = globalThis.crypto?.getRandomValues(/* @__PURE__ */ new Uint32Array(2));
	return random ? `storage-${random[0]?.toString(16)}-${random[1]?.toString(16)}` : `storage-${Date.now()}`;
}
function defaultOpenUrl(url) {
	if (typeof globalThis.window !== "undefined") globalThis.window.open(url, "_blank", "noopener,noreferrer");
}
/** S6: sends only the prepared headers and file bytes to the opaque signed URL. */
async function defaultUploadBytes(upload, file, signal) {
	const response = await globalThis.fetch(upload.url, {
		method: upload.method,
		headers: upload.headers,
		body: file,
		signal
	});
	if (!response.ok) throw new Error(`Storage byte upload failed with HTTP ${response.status}`);
}
function validateStorageDownloadUrl(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		throw new Error("Storage download URL is invalid");
	}
	if (parsed.protocol !== "https:") throw new Error("Storage download URL must use HTTPS");
	return url;
}
function toStorageError(error) {
	return error instanceof Error ? error : /* @__PURE__ */ new Error("Storage operation failed");
}
function resolveStorageWriteDestination(path) {
	if (!path) return APPLICATION_SHARED_STORAGE_ROOT;
	return path === "shared/_application" || path.startsWith(`shared/_application/`) ? path : void 0;
}
function hasUsableStorageUploadAuthorization(expiresAt, now = Date.now()) {
	const expiry = Date.parse(expiresAt);
	return Number.isFinite(expiry) && expiry - now > 5e3;
}
function parentRelativePath(path) {
	if (!path || path === "shared/_application") return;
	if (!path.startsWith(`shared/_application/`)) throw new Error("Storage folder is outside the application shared root");
	const relative = path.slice(20);
	if (path.endsWith("/") || path.includes("\\") || relative.split("/").some((segment) => !segment || segment === "." || segment === "..")) throw new Error("Storage folder path is not canonical");
	return relative;
}
function isTerminalStorageOperation(operation) {
	return operation.status === "succeeded" || operation.status === "partial" || operation.status === "failed";
}
var DEFAULT_POLL_DELAYS_MS, MAX_STORAGE_UPLOAD_BYTES, APPLICATION_SHARED_STORAGE_ROOT;
var init_storage_adapter_helpers = __esmMin((() => {
	init_utils();
	DEFAULT_POLL_DELAYS_MS = [
		1e3,
		2e3,
		3e3,
		5e3
	];
	MAX_STORAGE_UPLOAD_BYTES = 20971520;
	APPLICATION_SHARED_STORAGE_ROOT = "shared/_application";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-create-folder-dialog.tsx
function storageErrorCode(error) {
	if (!error || typeof error !== "object" || !("code" in error)) return;
	return typeof error.code === "number" ? error.code : void 0;
}
function StorageCreateFolderDialog({ open, loading = false, onConfirm, onCancel }) {
	const t = useCloudServiceI18n();
	const [name, setName] = (0, import_react$7.useState)("");
	const [error, setError] = (0, import_react$7.useState)("");
	const [submitting, setSubmitting] = (0, import_react$7.useState)(false);
	const inputRef = (0, import_react$7.useRef)(null);
	const busy = loading || submitting;
	(0, import_react$7.useEffect)(() => {
		if (!open) {
			setName("");
			setError("");
			setSubmitting(false);
		}
	}, [open]);
	const handleOpenChange = (0, import_react$7.useCallback)((nextOpen) => {
		if (!nextOpen && !busy) onCancel();
	}, [busy, onCancel]);
	const handleChange = (0, import_react$7.useCallback)((event) => {
		setName(event.target.value);
		setError("");
	}, []);
	const handleConfirm = (0, import_react$7.useCallback)(async () => {
		const trimmed = name.trim();
		if (!trimmed) {
			setError(t("storage.createFolder.errorEmpty"));
			inputRef.current?.focus();
			return;
		}
		if (INVALID_CHARS.test(trimmed)) {
			setError(t("storage.createFolder.errorInvalidChars"));
			inputRef.current?.focus();
			return;
		}
		setSubmitting(true);
		try {
			await onConfirm(trimmed);
			message.success(t("storage.createFolder.success", { name: trimmed }));
			setName("");
			setError("");
			onCancel();
		} catch (nextError) {
			const code = storageErrorCode(nextError);
			if (code === STORAGE_CONFLICT_CODE || code === STORAGE_INVALID_FOLDER_CODE) {
				setError(code === STORAGE_CONFLICT_CODE ? t("storage.createFolder.errorConflict") : t("storage.createFolder.errorRejected"));
				inputRef.current?.focus();
			} else message.error(t("storage.createFolder.failed"));
		} finally {
			setSubmitting(false);
		}
	}, [
		name,
		onCancel,
		onConfirm,
		t
	]);
	const handleKeyDown = (0, import_react$7.useCallback)((event) => {
		if (event.key === "Enter" && !busy) handleConfirm().catch(() => void 0);
	}, [busy, handleConfirm]);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Modal, {
		open,
		onOpenChange: handleOpenChange,
		title: t("storage.createFolder.title"),
		size: "small",
		closable: !busy,
		closeOnEscape: !busy,
		closeOnOverlayClick: !busy,
		footer: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
			variant: "secondary",
			disabled: busy,
			onClick: onCancel,
			children: t("storage.createFolder.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
			loading: busy,
			onClick: () => {
				handleConfirm().catch(() => void 0);
			},
			children: t("storage.createFolder.create")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Input, {
			ref: inputRef,
			value: name,
			placeholder: t("storage.createFolder.placeholder"),
			status: error ? "error" : void 0,
			tips: error || void 0,
			autoFocus: true,
			disabled: busy,
			onChange: handleChange,
			onKeyDown: handleKeyDown
		})
	});
}
var import_react$7, import_jsx_runtime$5, INVALID_CHARS, STORAGE_CONFLICT_CODE, STORAGE_INVALID_FOLDER_CODE;
var init_storage_create_folder_dialog = __esmMin((() => {
	init_src();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$5 = require_jsx_runtime();
	INVALID_CHARS = /[/\\:*?"<>|]/u;
	STORAGE_CONFLICT_CODE = 18362;
	STORAGE_INVALID_FOLDER_CODE = 18369;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-directory-header.tsx
function buildStorageBreadcrumbSegments(currentPath) {
	const parts = currentPath.split("/").filter(Boolean);
	return parts.map((part, index) => ({
		key: parts.slice(0, index + 1).join("/"),
		label: part,
		path: parts.slice(0, index + 1).join("/")
	}));
}
function StorageDirectoryHeader({ currentPath, onNavigate }) {
	const t = useCloudServiceI18n();
	const segments = (0, import_react$6.useMemo)(() => buildStorageBreadcrumbSegments(currentPath), [currentPath]);
	const items = [{
		key: "root",
		label: t("storage.breadcrumb.root"),
		onClick: segments.length > 0 && onNavigate ? (event) => {
			event.preventDefault();
			onNavigate("");
		} : void 0
	}, ...segments.map((segment, index) => ({
		key: segment.key,
		label: segment.label,
		onClick: index < segments.length - 1 && onNavigate ? (event) => {
			event.preventDefault();
			onNavigate(segment.path);
		} : void 0
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("header", {
		className: "cloud-service-storage__module-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", {
			className: "cloud-service-storage__module-title",
			children: t("module.storage")
		}), segments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Breadcrumb, {
			className: "cloud-service-storage__path",
			ariaLabel: t("storage.breadcrumb.ariaLabel"),
			items
		})]
	});
}
var import_react$6, import_jsx_runtime$4;
var init_storage_directory_header = __esmMin((() => {
	init_src();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-entry-icon.tsx
/** Storage 视觉稿专用文件类型映射，保留设计资产自身的固定品牌色。 */
function StorageEntryIcon({ entry }) {
	if (entry.kind === "folder") return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WbFileFolderIcon, {
		width: 16,
		height: 16
	});
	const kind = getArtifactFileIconKind(entry.name);
	if (kind === "default" && entry.name.toLowerCase().endsWith(".txt")) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WbFileTxtIcon, {
		width: 16,
		height: 16
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ArtifactFileTypeIcon, {
		className: kind === "video" || kind === "audio" ? "cloud-service-storage__file-icon--purple" : void 0,
		kind,
		type: "solid",
		width: 16,
		height: 16
	});
}
var import_jsx_runtime$3;
var init_storage_entry_icon = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-object-detail.tsx
function StorageObjectDetailView({ detail, currentPath = "", loading, error, onRetry, onBackToList, onNavigate, onDownload, onDelete }) {
	const t = useCloudServiceI18n();
	const segments = (0, import_react$4.useMemo)(() => buildStorageBreadcrumbSegments(currentPath), [currentPath]);
	const entry = {
		key: detail.key,
		name: detail.name,
		kind: "file"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
		className: "cloud-service-storage",
		"aria-label": t("module.storage"),
		"aria-busy": loading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", {
				className: "cloud-service-storage__module-title",
				children: t("module.storage")
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "cloud-service-storage__inline-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("common.loadFailed") }), onRetry && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
					variant: "link",
					loading,
					onClick: onRetry,
					children: t("common.retry")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Breadcrumb, {
				className: "cloud-service-storage__breadcrumb",
				ariaLabel: t("storage.breadcrumb.ariaLabel"),
				items: [
					{
						key: "root",
						label: t("storage.breadcrumb.root"),
						onClick: currentPath && onNavigate ? (event) => {
							event.preventDefault();
							onNavigate("");
						} : onBackToList ? (event) => {
							event.preventDefault();
							onBackToList();
						} : void 0
					},
					...segments.map((segment) => ({
						key: segment.key,
						label: segment.label,
						onClick: segment.path === currentPath && onBackToList ? (event) => {
							event.preventDefault();
							onBackToList();
						} : onNavigate ? (event) => {
							event.preventDefault();
							onNavigate(segment.path);
						} : void 0
					})),
					{
						key: detail.key,
						label: detail.name
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("article", {
				className: "cloud-service-storage__detail",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "cloud-service-storage__detail-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", { children: detail.title }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "cloud-service-storage__detail-actions",
							children: [onDownload && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
								size: "small",
								variant: "secondary",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DownloadTrayIcon, { size: "sm" }),
								disabled: loading,
								onClick: () => onDownload(entry),
								children: t("storage.detail.download")
							}), onDelete && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
								size: "small",
								variant: "secondary",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DeleteIcon, { size: "sm" }),
								disabled: loading,
								onClick: () => onDelete([entry]),
								children: t("storage.detail.delete")
							})]
						})]
					}),
					detail.metadata && detail.metadata.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dl", {
						className: "cloud-service-storage__metadata",
						children: detail.metadata.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dt", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dd", { children: item.value })] }, `${item.label}-${index}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "cloud-service-storage__preview",
						children: detail.preview
					})
				]
			})
		]
	});
}
var import_react$4, import_jsx_runtime$2;
var init_storage_object_detail = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_storage_directory_header();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/types.ts
function isStorageUserFacingError(error) {
	return error instanceof StorageUserFacingError;
}
var StorageUserFacingError;
var init_types = __esmMin((() => {
	StorageUserFacingError = class extends Error {
		constructor(message) {
			super(message);
			this.name = "StorageUserFacingError";
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/storage-module.tsx
function StorageModule({ entries, detail, currentPath = "", loading = false, uploading = false, error, onRetry, onRefresh, onCreateFolder, onUpload, onOpenEntry, onNavigate, onBackToList, onDownload, onDelete }) {
	const t = useCloudServiceI18n();
	const [selectedKeys, setSelectedKeys] = (0, import_react$3.useState)([]);
	const [createFolderOpen, setCreateFolderOpen] = (0, import_react$3.useState)(false);
	const [pendingWriteAction, setPendingWriteAction] = (0, import_react$3.useState)();
	const uploadInput = (0, import_react$3.useRef)(null);
	const uploadDestination = (0, import_react$3.useRef)();
	(0, import_react$3.useEffect)(() => {
		setSelectedKeys([]);
	}, [currentPath, entries]);
	const writeDestination = resolveStorageWriteDestination(currentPath);
	const canReachWriteDestination = writeDestination === currentPath || Boolean(onNavigate);
	const openUploadPicker = (0, import_react$3.useCallback)((destination) => {
		uploadDestination.current = destination;
		if (uploadInput.current) {
			uploadInput.current.value = "";
			uploadInput.current.click();
		}
	}, []);
	const runWriteAction = (0, import_react$3.useCallback)((action, destination) => {
		if (action === "create-folder") setCreateFolderOpen(true);
		else openUploadPicker(destination);
	}, [openUploadPicker]);
	const startWriteAction = (0, import_react$3.useCallback)((action) => {
		if (!writeDestination) return;
		if (writeDestination !== currentPath) {
			if (!onNavigate) return;
			if (action === "upload") {
				runWriteAction(action, writeDestination);
				return;
			}
			setPendingWriteAction(action);
			onNavigate(writeDestination);
			return;
		}
		runWriteAction(action, currentPath);
	}, [
		currentPath,
		onNavigate,
		runWriteAction,
		writeDestination
	]);
	(0, import_react$3.useEffect)(() => {
		if (!pendingWriteAction || currentPath !== "shared/_application") return;
		setPendingWriteAction(void 0);
		runWriteAction(pendingWriteAction, currentPath);
	}, [
		currentPath,
		pendingWriteAction,
		runWriteAction
	]);
	const selectedEntries = (0, import_react$3.useMemo)(() => {
		if (!entries) return [];
		const keySet = new Set(selectedKeys);
		return entries.filter((entry) => keySet.has(entry.key));
	}, [entries, selectedKeys]);
	const hasFileSelected = selectedEntries.some((entry) => entry.kind === "file");
	const handleSelectionChange = (0, import_react$3.useCallback)((keys) => {
		setSelectedKeys(keys);
	}, []);
	const handleCreateFolderConfirm = (0, import_react$3.useCallback)(async (name) => {
		await onCreateFolder?.({
			parentPath: currentPath,
			name
		});
	}, [currentPath, onCreateFolder]);
	const handleDeleteSelected = (0, import_react$3.useCallback)(() => {
		if (selectedEntries.length > 0) {
			onDelete?.(selectedEntries);
			setSelectedKeys([]);
		}
	}, [onDelete, selectedEntries]);
	const handleUploadInputChange = (0, import_react$3.useCallback)((event) => {
		const files = Array.from(event.currentTarget.files ?? []);
		const destination = uploadDestination.current ?? currentPath;
		uploadDestination.current = void 0;
		event.currentTarget.value = "";
		if (files.length > 0) {
			onUpload?.(files, destination);
			if (destination !== currentPath) onNavigate?.(destination);
		}
	}, [
		currentPath,
		onNavigate,
		onUpload
	]);
	const columns = (0, import_react$3.useMemo)(() => {
		const cols = [
			{
				key: "name",
				title: t("storage.column.name"),
				dataIndex: "name",
				width: "36%",
				render: (entry) => onOpenEntry ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					className: "cloud-service-storage__entry-name",
					variant: "link",
					leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageEntryIcon, { entry }),
					onClick: () => onOpenEntry(entry),
					children: entry.name
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
					className: "cloud-service-storage__entry-name",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageEntryIcon, { entry }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: entry.name })]
				})
			},
			{
				key: "size",
				title: t("storage.column.size"),
				dataIndex: "size",
				width: "14%"
			},
			{
				key: "createdAt",
				title: t("storage.column.createdAt"),
				dataIndex: "createdAt",
				width: "25%",
				cellStyle: () => ({ color: "var(--wb-color-text-tertiary)" })
			},
			{
				key: "updatedAt",
				title: t("storage.column.updatedAt"),
				dataIndex: "updatedAt",
				width: "25%",
				cellStyle: () => ({ color: "var(--wb-color-text-tertiary)" })
			}
		];
		if (onDownload || onDelete) cols.push({
			key: "actions",
			title: "",
			width: "12%",
			render: (entry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "cloud-service-storage__row-actions",
				children: [onDownload && entry.kind === "file" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					iconOnly: true,
					size: "small",
					variant: "ghost",
					"aria-label": t("storage.action.download"),
					title: t("storage.action.download"),
					onClick: (event) => {
						event.stopPropagation();
						onDownload(entry);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, {})
				}), onDelete && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					iconOnly: true,
					size: "small",
					variant: "ghost",
					"aria-label": t("storage.action.delete"),
					title: t("storage.action.delete"),
					onClick: (event) => {
						event.stopPropagation();
						onDelete([entry]);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {})
				})]
			})
		});
		return cols;
	}, [
		t,
		onOpenEntry,
		onDownload,
		onDelete
	]);
	if (loading && !detail && entries === void 0) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "cloud-service-storage",
		"aria-label": t("module.storage"),
		"aria-busy": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageDirectoryHeader, {
			currentPath,
			onNavigate
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "cloud-service-storage__state",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, {
				size: "medium",
				tip: t("common.loading")
			})
		})]
	});
	if (error && !detail && entries === void 0) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "cloud-service-storage",
		"aria-label": t("module.storage"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageDirectoryHeader, {
			currentPath,
			onNavigate
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "cloud-service-storage__state",
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", { children: t("storage.loadFailed.title") }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: t("common.loadFailed") }),
				onRetry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					loading,
					onClick: onRetry,
					children: t("common.retry")
				})
			]
		})]
	});
	if (!detail && entries === void 0) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "cloud-service-storage",
		"aria-label": t("module.storage"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageDirectoryHeader, {
			currentPath,
			onNavigate
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "cloud-service-storage__state",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", { children: t("workspace.capabilityUnavailable.title") }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: t("storage.capabilityUnavailable.description") })]
		})]
	});
	if (detail) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageObjectDetailView, {
		detail,
		currentPath,
		loading,
		error,
		onRetry,
		onBackToList,
		onNavigate,
		onDownload,
		onDelete
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "cloud-service-storage",
		"aria-label": t("module.storage"),
		"aria-busy": loading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageDirectoryHeader, {
				currentPath,
				onNavigate
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "cloud-service-storage__inline-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: isStorageUserFacingError(error) ? error.message : t("common.loadFailed") }), onRetry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "link",
					loading,
					onClick: onRetry,
					children: t("common.retry")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "cloud-service-storage__toolbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "cloud-service-storage__actions",
					children: selectedKeys.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "cloud-service-storage__selection-count",
							children: t("storage.selected", { count: selectedKeys.length })
						}),
						onDownload && hasFileSelected && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							size: "small",
							variant: "secondary",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, { size: "sm" }),
							onClick: () => {
								const files = selectedEntries.filter((entry) => entry.kind === "file");
								for (const file of files) onDownload(file);
							},
							children: t("storage.action.download")
						}),
						onDelete && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							size: "small",
							variant: "secondary",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, { size: "sm" }),
							onClick: handleDeleteSelected,
							children: t("storage.action.delete")
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
						onRefresh && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							iconOnly: true,
							size: "small",
							variant: "secondary",
							"aria-label": t("storage.action.refresh"),
							title: t("storage.action.refresh"),
							loading,
							onClick: onRefresh,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbRefreshIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							size: "small",
							variant: "secondary",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddIcon, { size: "sm" }),
							disabled: !onCreateFolder || !writeDestination || !canReachWriteDestination || loading,
							title: !writeDestination ? t("storage.action.sharedOnly") : currentPath === "" ? t("storage.action.opensApplicationShared") : void 0,
							onClick: () => startWriteAction("create-folder"),
							children: t("storage.action.createFolder")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							size: "small",
							variant: "secondary",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(UploadIcon, { size: "sm" }),
							disabled: !onUpload || !writeDestination || !canReachWriteDestination || loading,
							loading: uploading,
							title: !writeDestination ? t("storage.action.sharedOnly") : currentPath === "" ? t("storage.action.opensApplicationShared") : void 0,
							onClick: () => startWriteAction("upload"),
							children: uploading ? t("storage.upload.uploading") : t("storage.action.upload")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
							ref: uploadInput,
							hidden: true,
							type: "file",
							multiple: true,
							accept: "*/*",
							"aria-label": t("storage.action.upload"),
							onChange: handleUploadInputChange
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Table, {
				className: "cloud-service-storage__table",
				columns,
				dataSource: [...entries ?? []],
				rowKey: "key",
				size: "compact",
				hover: true,
				empty: currentPath ? t("storage.emptyFolder") : t("storage.empty"),
				scroll: { x: 660 },
				showFixedColumnShadow: false,
				rowSelection: onDelete ? {
					selectedRowKeys: selectedKeys,
					onChange: handleSelectionChange
				} : void 0
			}),
			onCreateFolder && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StorageCreateFolderDialog, {
				open: createFolderOpen,
				loading,
				onConfirm: handleCreateFolderConfirm,
				onCancel: () => setCreateFolderOpen(false)
			})
		]
	});
}
var import_react$3, import_jsx_runtime$1;
var init_storage_module = __esmMin((() => {
	init_storage_module$1();
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_storage_adapter_helpers();
	init_storage_create_folder_dialog();
	init_storage_directory_header();
	init_storage_entry_icon();
	init_storage_object_detail();
	init_types();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/index.ts
var init_storage = __esmMin((() => {
	init_storage_module();
	init_storage_create_folder_dialog();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/index.ts
var init_modules = __esmMin((() => {
	init_analytics();
	init_auth();
	init_database();
	init_storage();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/use-storage-upload.ts
/** Owns the browser-side S5 Prepare → S6 PUT → S7 Commit upload workflow. */
function useStorageUpload({ applicationId, client, epoch, actionBusy, createIdempotencyKey, uploadBytes, onCommitted, setActionLoading, setError }) {
	const t = useCloudServiceI18n();
	const [uploading, setUploading] = (0, import_react$2.useState)(false);
	const uploadAbort = (0, import_react$2.useRef)();
	(0, import_react$2.useLayoutEffect)(() => {
		uploadAbort.current?.abort();
		uploadAbort.current = void 0;
		setUploading(false);
		return () => {
			uploadAbort.current?.abort();
			uploadAbort.current = void 0;
		};
	}, [applicationId, client]);
	return {
		uploading,
		uploadFiles: (0, import_react$2.useCallback)((files, parentPath) => {
			if (actionBusy.current || files.length === 0) return;
			let relativeParent;
			try {
				relativeParent = parentRelativePath(parentPath);
			} catch (nextError) {
				setError(toStorageError(nextError));
				return;
			}
			const invalidName = files.find((file) => !file.name.trim() || file.name.includes("/") || file.name.includes("\\"));
			if (invalidName) {
				setError(new StorageUserFacingError(t("storage.upload.invalidName", { name: invalidName.name })));
				return;
			}
			const oversized = files.find((file) => file.size > MAX_STORAGE_UPLOAD_BYTES);
			if (oversized) {
				setError(new StorageUserFacingError(t("storage.upload.sizeExceeded", { name: oversized.name })));
				return;
			}
			actionBusy.current = true;
			const requestEpoch = epoch.current;
			const controller = new AbortController();
			uploadAbort.current = controller;
			setActionLoading(true);
			setUploading(true);
			setError(void 0);
			(async () => {
				let activeFileName = files[0]?.name ?? "";
				let activeStage = "prepare";
				try {
					for (const file of files) {
						if (requestEpoch !== epoch.current) return;
						activeFileName = file.name;
						activeStage = "prepare";
						const key = createIdempotencyKey();
						const createRequest = {
							applicationId,
							mode: "create",
							scope: "app_shared",
							ownerRef: { type: "application_admin" },
							relativePath: relativeParent ? `${relativeParent}/${file.name}` : file.name,
							fileName: file.name,
							sizeBytes: file.size,
							...file.type ? { mimeType: file.type } : {}
						};
						let prepared;
						try {
							prepared = await client.prepareStorageUpload(createRequest, key);
						} catch (prepareError) {
							if (prepareError instanceof CloudServiceApiError && prepareError.code === STORAGE_OBJECT_ALREADY_EXISTS) throw new StorageUserFacingError(t("storage.upload.alreadyExists", { name: file.name }));
							throw prepareError;
						}
						if (requestEpoch !== epoch.current) return;
						activeStage = "authorization";
						if (!hasUsableStorageUploadAuthorization(prepared.upload.expiresAt)) throw new Error("Storage upload authorization is expired or invalid");
						activeStage = "upload";
						await uploadBytes(prepared.upload, file, controller.signal);
						if (requestEpoch !== epoch.current) return;
						activeStage = "commit";
						const committed = await client.commitStorageUpload({ operationId: prepared.operationId }, key);
						if (requestEpoch !== epoch.current) return;
						await onCommitted(committed.object, file);
					}
				} catch (uploadError) {
					if (requestEpoch === epoch.current && !controller.signal.aborted) {
						if (uploadError instanceof StorageUserFacingError) setError(uploadError);
						else setError(new StorageUserFacingError(t(activeStage === "prepare" ? "storage.upload.prepareFailed" : activeStage === "authorization" ? "storage.upload.authorizationExpired" : activeStage === "upload" ? "storage.upload.directFailed" : "storage.upload.commitFailed", { name: activeFileName })));
					}
				} finally {
					if (uploadAbort.current === controller) uploadAbort.current = void 0;
					if (requestEpoch === epoch.current) {
						actionBusy.current = false;
						setActionLoading(false);
						setUploading(false);
					}
				}
			})().catch(console.error);
		}, [
			actionBusy,
			applicationId,
			client,
			createIdempotencyKey,
			epoch,
			onCommitted,
			setActionLoading,
			setError,
			t,
			uploadBytes
		])
	};
}
var import_react$2, STORAGE_OBJECT_ALREADY_EXISTS;
var init_use_storage_upload = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_api();
	init_i18n();
	init_storage_adapter_helpers();
	init_types();
	STORAGE_OBJECT_ALREADY_EXISTS = 18362;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/modules/storage/use-storage-adapter.ts
function isStorageImage(object, file) {
	if ((object.mimeType || file?.type)?.toLowerCase().startsWith("image/")) return true;
	const extension = object.extension ?? object.name.slice(object.name.lastIndexOf(".") + 1);
	return STORAGE_IMAGE_EXTENSIONS.has(extension.toLowerCase());
}
function storageParentPath(path) {
	const separator = path.lastIndexOf("/");
	return separator < 0 ? "" : path.slice(0, separator);
}
function storageImagePreview(src, name) {
	return (0, import_react$1.createElement)("img", {
		className: "cloud-service-storage__preview-image",
		src,
		alt: name
	});
}
function createLocalStoragePreview(file) {
	if (typeof globalThis.URL?.createObjectURL !== "function") return;
	try {
		return globalThis.URL.createObjectURL(file);
	} catch {
		return;
	}
}
/** Connects the frozen S1-S13 client to the presentation-only StorageModule contract. */
function useStorageAdapter({ applicationId, client, createIdempotencyKey = defaultIdempotencyKey, openUrl = defaultOpenUrl, pollDelaysMs = DEFAULT_POLL_DELAYS_MS, uploadBytes = defaultUploadBytes }) {
	const t = useCloudServiceI18n();
	const [scopeIdentity, setScopeIdentity] = (0, import_react$1.useState)(() => ({
		applicationId,
		client
	}));
	const [currentPath, setCurrentPath] = (0, import_react$1.useState)("");
	const [entries, setEntries] = (0, import_react$1.useState)();
	const [detail, setDetail] = (0, import_react$1.useState)();
	const [error, setError] = (0, import_react$1.useState)();
	const [listLoading, setListLoading] = (0, import_react$1.useState)(true);
	const [detailLoading, setDetailLoading] = (0, import_react$1.useState)(false);
	const [actionLoading, setActionLoading] = (0, import_react$1.useState)(false);
	const [deletePreview, setDeletePreview] = (0, import_react$1.useState)();
	const epoch = (0, import_react$1.useRef)(0);
	const listRequest = (0, import_react$1.useRef)(0);
	const detailRequest = (0, import_react$1.useRef)(0);
	const selectedEntry = (0, import_react$1.useRef)();
	const currentPathRef = (0, import_react$1.useRef)("");
	const actionBusy = (0, import_react$1.useRef)(false);
	const executeKey = (0, import_react$1.useRef)();
	const localPreviewUrl = (0, import_react$1.useRef)();
	const pollWait = (0, import_react$1.useRef)();
	const releaseLocalPreview = (0, import_react$1.useCallback)(() => {
		if (localPreviewUrl.current && typeof globalThis.URL?.revokeObjectURL === "function") globalThis.URL.revokeObjectURL(localPreviewUrl.current);
		localPreviewUrl.current = void 0;
	}, []);
	(0, import_react$1.useLayoutEffect)(() => {
		epoch.current += 1;
		return () => {
			epoch.current += 1;
			releaseLocalPreview();
		};
	}, [
		applicationId,
		client,
		releaseLocalPreview
	]);
	const cancelPollWait = (0, import_react$1.useCallback)(() => {
		const pending = pollWait.current;
		if (pending) {
			globalThis.clearTimeout(pending.timer);
			pollWait.current = void 0;
			pending.resolve(false);
		}
	}, []);
	const waitForPoll = (0, import_react$1.useCallback)((delayMs) => new Promise((resolve) => {
		cancelPollWait();
		const timer = globalThis.setTimeout(() => {
			if (pollWait.current?.timer === timer) pollWait.current = void 0;
			resolve(true);
		}, delayMs);
		pollWait.current = {
			timer,
			resolve
		};
	}), [cancelPollWait]);
	const labels = (0, import_react$1.useMemo)(() => ({
		size: t("storage.column.size"),
		type: t("storage.detail.type"),
		owner: t("storage.detail.owner"),
		createdAt: t("storage.column.createdAt"),
		updatedAt: t("storage.column.updatedAt"),
		lastAccessedAt: t("storage.detail.lastAccessedAt")
	}), [t]);
	const loadDirectory = (0, import_react$1.useCallback)(async (path, clear = true) => {
		const requestEpoch = epoch.current;
		const request = ++listRequest.current;
		if (clear) setEntries(void 0);
		setListLoading(true);
		setError(void 0);
		try {
			const isCurrent = () => requestEpoch === epoch.current && request === listRequest.current;
			const values = await listAllStorageEntries(client, applicationId, path, isCurrent);
			if (!values) return;
			setEntries(values.map(mapStorageEntry));
		} catch (nextError) {
			if (requestEpoch === epoch.current && request === listRequest.current) setError(toStorageError(nextError));
		} finally {
			if (requestEpoch === epoch.current && request === listRequest.current) setListLoading(false);
		}
	}, [applicationId, client]);
	const loadDetail = (0, import_react$1.useCallback)(async (entry) => {
		const requestEpoch = epoch.current;
		const request = ++detailRequest.current;
		releaseLocalPreview();
		selectedEntry.current = entry;
		setDetail(void 0);
		setDetailLoading(true);
		setError(void 0);
		try {
			const info = await client.getStorageObjectInfo({
				applicationId,
				path: entry.key,
				type: entry.kind
			});
			if (requestEpoch !== epoch.current || request !== detailRequest.current) return;
			setDetail(mapStorageObjectDetail(info, labels));
			if (info.type === "file" && isStorageImage(info)) {
				const signed = await client.createStorageDownloadUrl({
					applicationId,
					path: info.path,
					disposition: "inline",
					expiresInSeconds: STORAGE_INLINE_PREVIEW_EXPIRY_SECONDS
				});
				if (requestEpoch === epoch.current && request === detailRequest.current) {
					const previewUrl = validateStorageDownloadUrl(signed.url);
					setDetail(mapStorageObjectDetail(info, labels, storageImagePreview(previewUrl, info.name)));
				}
			}
		} catch (nextError) {
			if (requestEpoch === epoch.current && request === detailRequest.current) setError(toStorageError(nextError));
		} finally {
			if (requestEpoch === epoch.current && request === detailRequest.current) setDetailLoading(false);
		}
	}, [
		applicationId,
		client,
		labels,
		releaseLocalPreview
	]);
	(0, import_react$1.useEffect)(() => {
		setScopeIdentity({
			applicationId,
			client
		});
		currentPathRef.current = "";
		selectedEntry.current = void 0;
		executeKey.current = void 0;
		actionBusy.current = false;
		setCurrentPath("");
		setEntries(void 0);
		setDetail(void 0);
		setError(void 0);
		setDeletePreview(void 0);
		setListLoading(true);
		setDetailLoading(false);
		setActionLoading(false);
		releaseLocalPreview();
		cancelPollWait();
		loadDirectory("").catch(() => void 0);
		return () => {
			listRequest.current += 1;
			detailRequest.current += 1;
			cancelPollWait();
		};
	}, [
		applicationId,
		cancelPollWait,
		client,
		loadDirectory,
		releaseLocalPreview
	]);
	const navigate = (0, import_react$1.useCallback)((path) => {
		currentPathRef.current = path;
		selectedEntry.current = void 0;
		detailRequest.current += 1;
		releaseLocalPreview();
		setCurrentPath(path);
		setDetail(void 0);
		setDetailLoading(false);
		loadDirectory(path).catch(() => void 0);
	}, [loadDirectory, releaseLocalPreview]);
	const openEntry = (0, import_react$1.useCallback)((entry) => {
		if (entry.kind === "folder") navigate(entry.key);
		else loadDetail(entry).catch(() => void 0);
	}, [loadDetail, navigate]);
	const download = (0, import_react$1.useCallback)((entry) => {
		if (entry.kind !== "file") return;
		const requestEpoch = epoch.current;
		setError(void 0);
		client.createStorageDownloadUrl({
			applicationId,
			path: entry.key,
			disposition: "attachment",
			downloadName: entry.name
		}).then((result) => {
			if (requestEpoch === epoch.current) openUrl(validateStorageDownloadUrl(result.url));
		}).catch((nextError) => {
			if (requestEpoch === epoch.current) setError(toStorageError(nextError));
		});
	}, [
		applicationId,
		client,
		openUrl
	]);
	const createFolder = (0, import_react$1.useCallback)(async (request) => {
		if (actionBusy.current) throw new Error("Storage action is already in progress");
		const relativePath = parentRelativePath(request.parentPath);
		actionBusy.current = true;
		const requestEpoch = epoch.current;
		setActionLoading(true);
		setError(void 0);
		try {
			await client.createStorageFolder({
				applicationId,
				scope: "app_shared",
				ownerRef: { type: "application_admin" },
				...relativePath ? { parentRelativePath: relativePath } : {},
				name: request.name
			}, createIdempotencyKey());
			if (requestEpoch === epoch.current) await loadDirectory(currentPathRef.current, false);
		} catch (nextError) {
			if (requestEpoch === epoch.current) throw toStorageError(nextError);
		} finally {
			if (requestEpoch === epoch.current) {
				actionBusy.current = false;
				setActionLoading(false);
			}
		}
	}, [
		applicationId,
		client,
		createIdempotencyKey,
		loadDirectory
	]);
	const { uploading, uploadFiles } = useStorageUpload({
		applicationId,
		client,
		epoch,
		actionBusy,
		createIdempotencyKey,
		uploadBytes,
		onCommitted: (0, import_react$1.useCallback)(async (object, file) => {
			const requestEpoch = epoch.current;
			const entry = mapStorageEntry(object);
			if (storageParentPath(object.path) !== currentPathRef.current) return;
			listRequest.current += 1;
			setListLoading(false);
			setEntries((current) => {
				const values = current ?? [];
				const index = values.findIndex((value) => value.key === entry.key);
				if (index < 0) return [...values, entry];
				const next = [...values];
				next[index] = entry;
				return next;
			});
			if (!isStorageImage(object, file)) return;
			const request = ++detailRequest.current;
			selectedEntry.current = entry;
			releaseLocalPreview();
			localPreviewUrl.current = createLocalStoragePreview(file);
			setDetail(mapStorageObjectDetail(object, labels, localPreviewUrl.current ? storageImagePreview(localPreviewUrl.current, object.name) : null));
			setDetailLoading(true);
			setError(void 0);
			try {
				const signed = await client.createStorageDownloadUrl({
					applicationId,
					path: object.path,
					disposition: "inline",
					expiresInSeconds: STORAGE_INLINE_PREVIEW_EXPIRY_SECONDS
				});
				if (requestEpoch === epoch.current && request === detailRequest.current) {
					const previewUrl = validateStorageDownloadUrl(signed.url);
					releaseLocalPreview();
					setDetail(mapStorageObjectDetail(object, labels, storageImagePreview(previewUrl, object.name)));
				}
			} catch (nextError) {
				if (requestEpoch === epoch.current && request === detailRequest.current) setError(toStorageError(nextError));
			} finally {
				if (requestEpoch === epoch.current && request === detailRequest.current) setDetailLoading(false);
			}
		}, [
			applicationId,
			client,
			labels,
			releaseLocalPreview
		]),
		setActionLoading,
		setError
	});
	const prepareDelete = (0, import_react$1.useCallback)((targets) => {
		if (actionBusy.current || targets.length === 0) return;
		actionBusy.current = true;
		const requestEpoch = epoch.current;
		setActionLoading(true);
		setError(void 0);
		client.prepareStorageDelete({
			applicationId,
			targets: targets.map((target) => ({
				path: target.key,
				type: target.kind
			}))
		}).then((prepared) => {
			if (requestEpoch === epoch.current) {
				executeKey.current = void 0;
				setDeletePreview({
					...prepared,
					phase: "prepared"
				});
			}
		}).catch((nextError) => {
			if (requestEpoch === epoch.current) setError(toStorageError(nextError));
		}).finally(() => {
			if (requestEpoch === epoch.current) {
				actionBusy.current = false;
				setActionLoading(false);
			}
		});
	}, [applicationId, client]);
	const confirmDelete = (0, import_react$1.useCallback)(() => {
		if (!deletePreview || deletePreview.phase !== "prepared" || actionBusy.current) return;
		actionBusy.current = true;
		const requestEpoch = epoch.current;
		const operationId = deletePreview.operationId;
		const key = executeKey.current ?? createIdempotencyKey();
		executeKey.current = key;
		setActionLoading(true);
		setError(void 0);
		setDeletePreview((value) => value ? {
			...value,
			phase: "executing"
		} : value);
		(async () => {
			try {
				await client.executeStorageDelete({ operationId }, key);
				let pollIndex = 0;
				while (requestEpoch === epoch.current) {
					const delay = pollDelaysMs[Math.min(pollIndex, pollDelaysMs.length - 1)] ?? 5e3;
					if (!await waitForPoll(delay) || requestEpoch !== epoch.current) return;
					const operation = await client.getStorageOperation(applicationId, operationId);
					if (requestEpoch !== epoch.current) return;
					if (isTerminalStorageOperation(operation)) {
						detailRequest.current += 1;
						selectedEntry.current = void 0;
						releaseLocalPreview();
						setDetail(void 0);
						setDetailLoading(false);
						setDeletePreview((value) => value ? {
							...value,
							phase: operation.status,
							operation
						} : value);
						await loadDirectory(currentPathRef.current, false);
						if (requestEpoch === epoch.current && operation.status !== "succeeded") setError(new Error(t(operation.status === "partial" ? "storage.delete.partial" : "storage.delete.failed")));
						return;
					}
					pollIndex += 1;
				}
			} catch (nextError) {
				if (requestEpoch === epoch.current) {
					setDeletePreview((value) => value ? {
						...value,
						phase: "prepared"
					} : value);
					setError(toStorageError(nextError));
				}
			} finally {
				if (requestEpoch === epoch.current) {
					actionBusy.current = false;
					setActionLoading(false);
				}
			}
		})().catch(() => void 0);
	}, [
		applicationId,
		client,
		createIdempotencyKey,
		deletePreview,
		loadDirectory,
		pollDelaysMs,
		releaseLocalPreview,
		t,
		waitForPoll
	]);
	const cancelDelete = (0, import_react$1.useCallback)(() => {
		if (deletePreview?.phase === "prepared" && !actionBusy.current) {
			executeKey.current = void 0;
			setDeletePreview(void 0);
		}
	}, [deletePreview?.phase]);
	const retry = (0, import_react$1.useCallback)(() => {
		const entry = selectedEntry.current;
		if (entry) loadDetail(entry).catch(() => void 0);
		else loadDirectory(currentPathRef.current, false).catch(() => void 0);
	}, [loadDetail, loadDirectory]);
	const backToList = (0, import_react$1.useCallback)(() => {
		detailRequest.current += 1;
		selectedEntry.current = void 0;
		releaseLocalPreview();
		setDetail(void 0);
		setDetailLoading(false);
		setError(void 0);
	}, [releaseLocalPreview]);
	const isCurrentScope = scopeIdentity.applicationId === applicationId && scopeIdentity.client === client;
	return (0, import_react$1.useMemo)(() => ({
		entries: isCurrentScope ? entries : void 0,
		detail: isCurrentScope ? detail : void 0,
		currentPath: isCurrentScope ? currentPath : "",
		loading: !isCurrentScope || listLoading || detailLoading || actionLoading,
		uploading: isCurrentScope && uploading,
		error: isCurrentScope ? error : void 0,
		onRetry: isCurrentScope ? retry : void 0,
		onRefresh: isCurrentScope ? () => {
			loadDirectory(currentPathRef.current, false).catch(() => void 0);
		} : void 0,
		onCreateFolder: isCurrentScope ? createFolder : void 0,
		onUpload: isCurrentScope ? uploadFiles : void 0,
		onOpenEntry: isCurrentScope ? openEntry : void 0,
		onNavigate: isCurrentScope ? navigate : void 0,
		onBackToList: isCurrentScope ? backToList : void 0,
		onDownload: isCurrentScope ? download : void 0,
		onDelete: isCurrentScope ? prepareDelete : void 0,
		deletePreview: isCurrentScope ? deletePreview : void 0,
		onConfirmDelete: isCurrentScope ? confirmDelete : () => void 0,
		onCancelDelete: isCurrentScope ? cancelDelete : () => void 0
	}), [
		actionLoading,
		applicationId,
		backToList,
		cancelDelete,
		confirmDelete,
		createFolder,
		currentPath,
		deletePreview,
		detail,
		detailLoading,
		download,
		entries,
		error,
		isCurrentScope,
		listLoading,
		loadDirectory,
		navigate,
		openEntry,
		prepareDelete,
		retry,
		uploadFiles,
		uploading
	]);
}
var import_react$1, STORAGE_INLINE_PREVIEW_EXPIRY_SECONDS, STORAGE_IMAGE_EXTENSIONS;
var init_use_storage_adapter = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_storage_adapter_helpers();
	init_use_storage_upload();
	STORAGE_INLINE_PREVIEW_EXPIRY_SECONDS = 300;
	STORAGE_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
		"avif",
		"bmp",
		"gif",
		"ico",
		"jpeg",
		"jpg",
		"png",
		"svg",
		"webp"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/cloud-service-manager.tsx
function StorageClientModule({ applicationId, client, writeEnabled }) {
	const props = useStorageAdapter({
		applicationId,
		client
	});
	const t = useCloudServiceI18n();
	const preview = writeEnabled ? props.deletePreview : void 0;
	const deleteOpen = preview?.phase === "prepared" || preview?.phase === "executing";
	const deleteExecuting = preview?.phase === "executing";
	const samplePaths = preview && Array.isArray(preview.summary.samplePaths) ? preview.summary.samplePaths : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorageModule, {
		...props,
		onCreateFolder: writeEnabled ? props.onCreateFolder : void 0,
		onUpload: writeEnabled ? props.onUpload : void 0,
		onDelete: writeEnabled ? props.onDelete : void 0
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: deleteOpen,
		onOpenChange: (open) => {
			if (!open) props.onCancelDelete();
		},
		title: t("storage.delete.title"),
		description: preview ? t("storage.delete.summary", {
			fileCount: preview.summary.fileCount,
			folderCount: preview.summary.folderCount,
			size: formatStorageSize(preview.summary.totalSizeBytes)
		}) : void 0,
		variant: "confirm",
		size: "small",
		okText: t("common.delete"),
		cancelText: t("common.cancel"),
		okType: "danger",
		confirmLoading: deleteExecuting,
		closable: !deleteExecuting,
		closeOnEscape: !deleteExecuting,
		closeOnOverlayClick: !deleteExecuting,
		okButtonProps: { disabled: preview?.phase !== "prepared" },
		cancelButtonProps: { disabled: deleteExecuting },
		onOk: () => {
			props.onConfirmDelete();
			return false;
		},
		onCancel: () => props.onCancelDelete(),
		children: preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: samplePaths.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: path }, path)) }), preview.summary.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("storage.delete.morePaths") })] })
	})] });
}
/** Chat 应用空间和设置应用管理共同消费的唯一云服务管理入口。 */
function CloudServiceManager({ applicationId, applicationName, applicationType, surface, activeModule, defaultModule, onModuleChange, onProvisionRequest, onUpgradeRequest, resolvePlanDisplayName, onAvailabilityChange, onCloudServiceChanged, refreshToken, showExpiringBadge = true, overviewSource, apiClient, databaseWriteEnabled = true, managementWriteEnabled = true, auth, storage, storageClient }) {
	const client = (0, import_react.useMemo)(() => apiClient ?? createCloudServiceApiClient(), [apiClient]);
	const [uncontrolledModule, setUncontrolledModule] = (0, import_react.useState)(defaultModule ?? "database");
	(0, import_react.useEffect)(() => {
		setUncontrolledModule(defaultModule ?? "database");
	}, [applicationId, defaultModule]);
	const currentModule = activeModule ?? uncontrolledModule;
	const handleModuleChange = (0, import_react.useCallback)((next) => {
		setUncontrolledModule(next);
		onModuleChange?.(next);
	}, [onModuleChange]);
	useSitesPageShow({
		active: true,
		pageURL: "sites_cloud_service",
		pageName: currentModule,
		source: surface,
		ext1: applicationId,
		ext2: applicationType === "wechat-mini-program" ? "miniprogram" : "web"
	});
	const effectiveStorageClient = (0, import_react.useMemo)(() => storageClient ?? createStorageApiClient(), [storageClient]);
	const manager = useCloudServiceManagerState({
		applicationId,
		source: (0, import_react.useMemo)(() => overviewSource ?? { loadOverview: (appId) => client.loadOverview(appId) }, [client, overviewSource]),
		refreshToken,
		onProvisionRequest,
		onDeactivateRequest: client.deactivate,
		onUpgradeRequest,
		onCloudServiceChanged
	});
	/**
	* 用户额度：还能不能再开一个云环境。失败降级成 `true` —— 宁可让用户点一下被后端拒，
	* 也不要因为一次网络抖动把开通入口锁死。
	*
	* ## 为什么这个 effect 可以「随便重跑」
	*
	* `client.checkUserQuota()` 走模块级缓存（`api/user-quota-cache`）。这个接口是
	* **用户维度**的（无 `applicationId` 参数），但本组件是按应用挂载、且有两个宿主
	* （Chat 应用空间、设置 → 发布的应用），切页签 / 切应用都会 remount。裸调的话
	* 一次会话里会重复打十几次，缓存把它们收敛成一次。
	*
	* ## 依赖里为什么有 `cloudBindingActivated`
	*
	* 额度会被「开通 / 销毁」改掉，那两个动作成功后 Client 会主动失效缓存。但光失效
	* 没人重读的话，销毁后回到「已销毁」页时 `canActivate` 还是销毁**之前**的旧值 ——
	* 额度曾耗尽的用户销毁完想重建，会看到一个禁用的按钮。所以绑定态一翻转就重查；
	* 没被失效的场景命中缓存，不产生额外请求。
	*/
	const [canActivate, setCanActivate] = (0, import_react.useState)(true);
	const cloudBindingActivated = manager.overview?.activated;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		client.checkUserQuota().then((quota) => {
			if (!cancelled) setCanActivate(quota.allowed);
		}, () => {
			if (!cancelled) setCanActivate(true);
		});
		return () => {
			cancelled = true;
		};
	}, [client, cloudBindingActivated]);
	const scopedAuth = (0, import_react.useMemo)(() => {
		if (!auth) return;
		const { scopeApplicationId, ...moduleProps } = auth;
		if (scopeApplicationId !== applicationId) return {
			...UNKNOWN_AUTH,
			loading: true
		};
		return managementWriteEnabled ? moduleProps : {
			...moduleProps,
			onGoogleConfigSave: void 0,
			onEmailConfigSave: void 0
		};
	}, [
		applicationId,
		auth,
		managementWriteEnabled
	]);
	const scopedStorage = (0, import_react.useMemo)(() => {
		if (!storage) return;
		const { scopeApplicationId, ...moduleProps } = storage;
		if (scopeApplicationId !== applicationId) return { loading: true };
		return managementWriteEnabled ? moduleProps : {
			...moduleProps,
			onCreateFolder: void 0,
			onUpload: void 0,
			onDelete: void 0
		};
	}, [
		applicationId,
		managementWriteEnabled,
		storage
	]);
	const moduleRenderers = (0, import_react.useMemo)(() => ({
		database: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseModule, {
			applicationId,
			client,
			writeEnabled: managementWriteEnabled && databaseWriteEnabled
		}),
		storage: scopedStorage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorageModule, { ...scopedStorage }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorageClientModule, {
			applicationId,
			client: effectiveStorageClient,
			writeEnabled: managementWriteEnabled
		}, applicationId),
		auth: scopedAuth ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModule, {
			...scopedAuth,
			applicationType
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthAdminModule, {
			applicationId,
			applicationType,
			client,
			writeEnabled: managementWriteEnabled
		}),
		analytics: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsModule, {
			applicationId,
			client
		})
	}), [
		applicationId,
		applicationType,
		client,
		databaseWriteEnabled,
		managementWriteEnabled,
		effectiveStorageClient,
		scopedAuth,
		scopedStorage
	]);
	const retryProvisionAction = manager.pendingProvisionAction ?? manager.overview?.provisionAction ?? (manager.overview?.lifecycleState === "destroyed" ? "recreate" : "enable");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "cloud-service-manager",
		"aria-label": applicationName,
		"data-surface": surface,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudServiceManagerView, {
			overview: manager.overview,
			canActivate,
			initialLoading: manager.initialLoading,
			refreshing: manager.refreshing,
			loadError: manager.error,
			actionBusy: manager.actionBusy,
			actionError: manager.actionError,
			actionErrorCode: manager.actionErrorCode,
			provisionPendingConfirmation: manager.provisionPendingConfirmation,
			pendingProvisionAction: manager.pendingProvisionAction,
			provisionRefreshFailed: manager.provisionRefreshFailed,
			activeModule,
			defaultModule,
			workspaceScopeKey: applicationId,
			moduleRenderers,
			showExpiringBadge,
			onModuleChange: handleModuleChange,
			onProvision: (action) => {
				manager.requestProvision(action).catch(() => void 0);
			},
			onProvisionRetry: () => {
				manager.requestProvision(retryProvisionAction).catch(() => void 0);
			},
			onProvisionRefreshRetry: () => {
				manager.retryProvisionRefresh().catch(() => void 0);
			},
			onUpgrade: onUpgradeRequest ? () => {
				manager.requestUpgrade().catch(() => void 0);
			} : void 0,
			resolvePlanDisplayName,
			onRefresh: () => {
				manager.refresh().catch(() => void 0);
			},
			onAvailabilityChange
		})
	});
}
var import_react, import_jsx_runtime, UNKNOWN_AUTH;
var init_cloud_service_manager = __esmMin((() => {
	init_cloud_service_manager$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_sites_page_show();
	init_api();
	init_components();
	init_hooks();
	init_i18n();
	init_modules();
	init_storage_adapter_helpers();
	init_use_storage_adapter();
	import_jsx_runtime = require_jsx_runtime();
	UNKNOWN_AUTH = { providerStatuses: {
		email: "unknown",
		phone: "unknown",
		google: "unknown"
	} };
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/cloud-service/index.ts
var init_cloud_service = __esmMin((() => {
	init_cloud_service_manager();
	init_api();
}));
//#endregion
export { init_storage_api as a, probeAppApiCall as c, init_use_sites_page_show as d, useSitesPageShow as f, createStorageApiClient as i, probeAppView as l, CloudServiceManager as n, init_app_api_probe as o, init_cloud_service_manager as r, probeAppApi as s, init_cloud_service as t, resolveAppApiKind as u };
