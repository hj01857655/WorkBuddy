import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { ad as init_common, d0 as useModuleHost } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/collab/context.tsx
var init_context = __esmMin((() => {
	init_common();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/beacon-report.ts
function getLocalDateKey(now) {
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${month}-${day}`;
}
function getGlobalCurrentURL() {
	return typeof window === "undefined" ? void 0 : window.location.href;
}
function getGlobalReferURL() {
	return typeof document === "undefined" ? void 0 : document.referrer;
}
function getGlobalStorage() {
	try {
		return typeof window === "undefined" ? void 0 : window.localStorage;
	} catch {
		return;
	}
}
function getGlobalReferStorage() {
	try {
		return typeof window === "undefined" ? void 0 : window.sessionStorage;
	} catch {
		return;
	}
}
function sanitizeFallbackURL(rawURL) {
	const trimmed = rawURL.trim();
	if (!trimmed) return;
	return trimmed.split("#")[0]?.split("?")[0] || void 0;
}
/**
* 脱敏页面 URL：保留 origin + pathname，移除 query / hash / token 等敏感信息。
*/
function sanitizeTeamsPageURL(rawURL) {
	if (!rawURL) return;
	try {
		const base = typeof window === "undefined" ? "https://workbuddy.local" : window.location.origin;
		const url = new URL(rawURL, base);
		return `${url.origin}${url.pathname}`;
	} catch {
		return sanitizeFallbackURL(rawURL);
	}
}
function stripUndefined(payload) {
	return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== void 0));
}
function stripInternalFields(payload) {
	const { [TEAMS_QUERY_TELEMETRY_READY_FIELD]: _ready, ...rest } = payload;
	return rest;
}
/**
* 拦截未经 build*Payload 汇总就直接上报的 ready-guarded 事件（防御脏 payload）。
*
* 命中条件（任一即视为 guarded）：
*   1) 事件在 TEAMS_EVENT_META 里 `requireReady=true`（新独立事件路径）
*   2) 走 web_element_click 但 elementName 指向 requireReady 的事件值（旧 legacy 通道兜底）
*
* 命中后若缺 `TEAMS_QUERY_TELEMETRY_READY_FIELD=true` → 丢弃。
*/
function shouldDropLegacyQueryTelemetry(eventName, params) {
	const isGuardedEvent = TEAMS_EVENT_META[eventName].requireReady;
	const legacyElementName = eventName === TEAMS_EVENT.ELEMENT_CLICK && typeof params.elementName === "string" ? params.elementName : void 0;
	const isGuardedLegacyClick = !!legacyElementName && legacyElementName in TEAMS_EVENT_META && TEAMS_EVENT_META[legacyElementName].requireReady;
	if (!isGuardedEvent && !isGuardedLegacyClick) return false;
	return params[TEAMS_QUERY_TELEMETRY_READY_FIELD] !== true;
}
function getReferStorage(options) {
	return options.referStorage ?? getGlobalReferStorage();
}
function readRememberedReferURL(options) {
	if (rememberedReferURL) return rememberedReferURL;
	try {
		return getReferStorage(options)?.getItem(REFER_URL_STORAGE_KEY) ?? void 0;
	} catch {
		return;
	}
}
/** 记录 SPA 路由跳转前的 URL，供下一次 web_page_show 补齐 referURL。 */
function rememberTeamsReferURL(rawURL = getGlobalCurrentURL(), options = {}) {
	const sanitized = sanitizeTeamsPageURL(rawURL);
	if (!sanitized) return;
	rememberedReferURL = sanitized;
	try {
		getReferStorage(options)?.setItem(REFER_URL_STORAGE_KEY, sanitized);
	} catch {}
}
function resolvePageURL(params, options) {
	return sanitizeTeamsPageURL((typeof params.pageURL === "string" ? params.pageURL : void 0) ?? options.currentURL ?? getGlobalCurrentURL());
}
function resolveReferURL(params, options) {
	return sanitizeTeamsPageURL((typeof params.referURL === "string" ? params.referURL : void 0) ?? options.referURL ?? getGlobalReferURL()) ?? readRememberedReferURL(options);
}
function resolveIsFirstPage(pageName, params, options) {
	if (typeof params.isFirstPage === "boolean") return params.isFirstPage;
	if (!pageName) return true;
	const storage = options.storage ?? getGlobalStorage();
	if (!storage) return true;
	const key = `${FIRST_PAGE_STORAGE_PREFIX}:${getLocalDateKey(options.now ?? /* @__PURE__ */ new Date())}:${pageName}`;
	try {
		const visited = storage.getItem(key) === "1";
		if (!visited) storage.setItem(key, "1");
		return !visited;
	} catch {
		return true;
	}
}
/**
* 构造 Teams Web 事件 payload，集中补齐通用字段并做 URL 脱敏。
*/
function buildTeamsTelemetryPayload(eventName, businessParams, options = {}) {
	const sanitizedParams = stripInternalFields(businessParams);
	const pageURL = resolvePageURL(sanitizedParams, options);
	const { channel } = TEAMS_EVENT_META[eventName];
	if (channel === "page-show") {
		const pageName = typeof sanitizedParams.pageName === "string" ? sanitizedParams.pageName : void 0;
		return stripUndefined({
			...sanitizedParams,
			pageName,
			pageURL,
			referURL: resolveReferURL(sanitizedParams, options),
			isFirstPage: resolveIsFirstPage(pageName, sanitizedParams, options)
		});
	}
	if (channel === "element-click") {
		const elementName = typeof sanitizedParams.elementName === "string" ? sanitizedParams.elementName : void 0;
		return stripUndefined({
			...sanitizedParams,
			elementName,
			elementId: sanitizedParams.elementId ?? elementName,
			pageURL
		});
	}
	return stripUndefined({
		...sanitizedParams,
		pageURL
	});
}
/**
* 通过 host reporter 上报 Teams 埋点，确保进入 /v2/report 链路。
*/
function reportTeamsTelemetry(reporter, eventName, businessParams) {
	if (shouldDropLegacyQueryTelemetry(eventName, businessParams)) return;
	reporter.reportEvent(eventName, buildTeamsTelemetryPayload(eventName, businessParams));
}
/**
* Teams 埋点上报 Hook。
*
* 用法：
* ```ts
* const teamsReport = useTeamsReport();
* teamsReport(TEAMS_EVENT.ELEMENT_CLICK, { elementName: TEAMS_ELEMENT.PROJECT_CREATE_SUBMIT, ... });
* ```
*
* 不再保留模块级 `teamsReport()` 兼容入口：原实现用 host reporter 引用做 module-level singleton，
* 多个 hook 实例共享同一个全局变量，任一组件卸载都会把全局 reporter 置空，导致后续静默漏报
* （issue #47820 评审反馈）。所有上报必须经过 hook 在组件内闭包持有 reporter。
*/
function useTeamsReport() {
	const { reporter } = useModuleHost();
	return (0, import_react.useCallback)((eventName, businessParams) => {
		reportTeamsTelemetry(reporter, eventName, businessParams);
	}, [reporter]);
}
var import_react, TEAMS_EVENT, TEAMS_EVENT_META, TEAMS_ELEMENT, TEAMS_QUERY_TELEMETRY_READY_FIELD, FIRST_PAGE_STORAGE_PREFIX, REFER_URL_STORAGE_KEY, rememberedReferURL;
var init_beacon_report = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_context();
	TEAMS_EVENT = {
		PAGE_SHOW: "web_page_show",
		ELEMENT_CLICK: "web_element_click",
		/** 项目/协作任务 query 发送独立事件，payload 由 `buildProjectTaskQuerySendPayload` 汇总。 */
		PROJECT_TASK_QUERY_SEND: "project_task_query_send"
	};
	TEAMS_EVENT_META = {
		[TEAMS_EVENT.PAGE_SHOW]: {
			channel: "page-show",
			requireReady: false
		},
		[TEAMS_EVENT.ELEMENT_CLICK]: {
			channel: "element-click",
			requireReady: false
		},
		[TEAMS_EVENT.PROJECT_TASK_QUERY_SEND]: {
			channel: "standalone",
			requireReady: true
		}
	};
	TEAMS_ELEMENT = {
		/** 创建项目点击 */
		PROJECT_CREATE_SUBMIT: "project_create_submit",
		/** 项目列表页展现 */
		PROJECT_LIST_VIEW: "project_list_view",
		/** 项目页展现 */
		PROJECT_DETAIL_VIEW: "project_detail_view",
		/** 项目邀请页面展现 */
		PROJECT_INVITE_LINK_VIEW: "project_invite_link_view",
		/** 项目申请加入点击 */
		PROJECT_INVITE_LINK_APPLY: "project_invite_link_apply",
		/** 项目邀请审批点击 */
		PROJECT_APPLICATION_APPROVAL_CLICK: "project_application_approval_click",
		/** 项目留言 more 菜单里点击「在对话中引用」（issue #63948） */
		COMMENT_QUOTE_TO_CHAT: "comment_quote_to_chat",
		/** @msg chip 通过 quote 动作插入到输入框（issue #63948） */
		MESSAGE_CHIP_INSERT: "message_chip_insert",
		/** 项目邀请入口按钮点击（项目详情页头部「邀请」按钮，打开成员/邀请弹层） */
		PROJECT_INVITE_ENTRY_CLICK: "project_invite_entry_click",
		/** 项目邀请链接复制点击（members-popover 底部「复制邀请链接」） */
		PROJECT_INVITE_COPY_LINK_CLICK: "project_invite_copy_link_click",
		/** 任务邀请链接复制点击（任务顶栏协作 popover 内「复制任务链接」） */
		TASK_INVITE_COPY_LINK_CLICK: "task_invite_copy_link_click",
		/** 任务邀请团队内成员按钮点击（协作 popover 内「邀请」按钮） */
		TASK_INVITE_MEMBER_CLICK: "task_invite_member_click",
		/** 任务转交入口点击（任务顶栏「转交」按钮） */
		TASK_TRANSFER_ENTRY_CLICK: "task_transfer_entry_click",
		/** 任务转交创建点击（转交弹层「创建」按钮） */
		TASK_TRANSFER_SUBMIT_CLICK: "task_transfer_submit_click",
		/** 创建待办点击（计划工具栏「新建」按钮） */
		PLAN_TODO_CREATE_CLICK: "plan_todo_create_click",
		/** 自动化添加点击（自动化列表「添加」按钮） */
		AUTOMATION_ADD_CLICK: "automation_add_click",
		/** 自动化创建点击（自动化表单「创建」按钮） */
		AUTOMATION_CREATE_CLICK: "automation_create_click",
		/** 资产内文件上传成功事件 */
		ASSET_FILE_UPLOAD_SUCCESS: "asset_file_upload_success",
		/** 外部数据源导入点击（计划设置弹层「导入数据源」） */
		DATASOURCE_IMPORT_ENTRY_CLICK: "datasource_import_entry_click",
		/** 外部数据源添加点击（数据源列表页/空态「添加数据源」按钮） */
		DATASOURCE_ADD_CLICK: "datasource_add_click",
		/** 外部数据源创建成功事件 */
		DATASOURCE_CREATE_SUCCESS: "datasource_create_success",
		/** 项目动态发送留言事件 */
		ACTIVITY_MESSAGE_PUBLISH: "activity_message_publish",
		/** 项目详情动态 Tab 展现 */
		PROJECT_DETAIL_ACTIVITY_TAB_VIEW: "project_detail_activity_tab_view",
		/** 项目详情任务 Tab 展现 */
		PROJECT_DETAIL_TASK_TAB_VIEW: "project_detail_task_tab_view",
		/** 项目详情资产 Tab 展现 */
		PROJECT_DETAIL_ASSETS_TAB_VIEW: "project_detail_assets_tab_view",
		/** 项目详情计划 Tab 展现 */
		PROJECT_DETAIL_PLAN_TAB_VIEW: "project_detail_plan_tab_view"
	};
	TEAMS_QUERY_TELEMETRY_READY_FIELD = "__teamsQueryTelemetryReady";
	FIRST_PAGE_STORAGE_PREFIX = "workbuddy:teams:first-page";
	REFER_URL_STORAGE_KEY = "workbuddy:teams:refer-url";
}));
//#endregion
export { rememberTeamsReferURL as a, init_beacon_report as i, TEAMS_EVENT as n, useTeamsReport as o, TEAMS_QUERY_TELEMETRY_READY_FIELD as r, init_context as s, TEAMS_ELEMENT as t };
