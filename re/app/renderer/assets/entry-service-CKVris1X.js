import { n as __esmMin, o as __toCommonJS } from "./rolldown-runtime-V4kyJ4NV.js";
import { BB as init_constants, DB as lexiang_auth_store_exports, PA as init_contract, TB as init_lexiang_auth_store, VR as init_services, XB as init_lexiang_auth_constants, Z as getFacades } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/auth-refresh.ts
var LexiangTokenRefreshError, inflightRefresh, refreshLexiangConnectorTokenOnce, doRefresh;
var init_auth_refresh = __esmMin((() => {
	init_lexiang_auth_constants();
	LexiangTokenRefreshError = class extends Error {
		constructor(message, options) {
			super(message);
			this.name = "LexiangTokenRefreshError";
			this.isAuthExpired = options?.isAuthExpired ?? true;
		}
	};
	inflightRefresh = null;
	refreshLexiangConnectorTokenOnce = (adapter) => {
		if (inflightRefresh) return inflightRefresh;
		inflightRefresh = doRefresh(adapter).finally(() => {
			inflightRefresh = null;
		});
		return inflightRefresh;
	};
	doRefresh = async (adapter) => {
		if (!adapter?.connectorOauthAccessToken) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] adapter.connectorOauthAccessToken 不可用", { isAuthExpired: true });
		let token;
		try {
			token = (await adapter.connectorOauthAccessToken("lexiang-ol"))?.data?.access_token ?? "";
			if (!token) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] connectorOauthAccessToken 返回空 token", { isAuthExpired: true });
		} catch (e) {
			if (e instanceof LexiangTokenRefreshError) throw e;
			throw new LexiangTokenRefreshError(`[lexiang-auth-refresh] 获取 access_token 失败: ${e instanceof Error ? e.message : String(e)}`, { isAuthExpired: true });
		}
		if (!adapter?.updateConnectorHeaders) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] adapter.updateConnectorHeaders 不可用", { isAuthExpired: false });
		try {
			if (!(await adapter.updateConnectorHeaders("lexiang", { Authorization: token }))?.success) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] updateConnectorHeaders 返回失败", { isAuthExpired: false });
		} catch (e) {
			if (e instanceof LexiangTokenRefreshError) throw e;
			throw new LexiangTokenRefreshError(`[lexiang-auth-refresh] 同步 connector headers 失败: ${e instanceof Error ? e.message : String(e)}`, { isAuthExpired: false });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/mcp-client.ts
/** 类型守卫：判断一个未知错误是否是 `LexiangApiError` 实例。 */
function isLexiangApiError(err) {
	return err instanceof LexiangApiError || typeof err === "object" && err !== null && err.name === "LexiangApiError";
}
function generateRequestId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function getTencentLexiangFacade$1() {
	const facade = getFacades()?.tencentLexiang;
	if (!facade?.gatewayPost) throw new Error("[lexiang-api] tencentLexiang.gatewayPost facade 不可用");
	return facade;
}
/**
* 获取 adapter 实例（用于 retry 时的 token refresh）。
* 从 auth store 获取当前 adapter 引用。
*/
function getAdapterForRefresh() {
	try {
		const { lexiangAuthStore } = (init_lexiang_auth_store(), __toCommonJS(lexiang_auth_store_exports));
		return lexiangAuthStore.getState().adapter;
	} catch {
		return null;
	}
}
/**
* 内部：发送 MCP 请求并解析响应。
*
* 将请求发送和响应解析逻辑拆成独立函数，供 retry 逻辑复用。
*/
async function executeMcpRequest(toolName, body) {
	const tencentLexiang = getTencentLexiangFacade$1();
	let json;
	try {
		json = await tencentLexiang.gatewayPost(GATEWAY_MCP_PATH, body);
	} catch (e) {
		console.error(`[lexiang-api] ✗ ${toolName} gatewayPost 抛错`, e);
		throw e;
	}
	if (json?.error) {
		const errMsg = typeof json.error === "string" ? json.error : json.error.message ?? JSON.stringify(json.error);
		throw new LexiangApiError({
			toolName,
			message: `[lexiang-api] ${toolName} MCP error: ${errMsg} (code=${json.error?.code})`,
			mcpCode: typeof json.error === "object" ? json.error?.code : void 0,
			bizMessage: typeof json.error === "object" ? json.error?.message : errMsg
		});
	}
	const result = json?.result;
	if (result?.isError) {
		let bizCode;
		let bizMessage;
		let requestId;
		const errTextPart = Array.isArray(result.content) ? result.content.find((c) => c?.type === "text" && typeof c.text === "string") : void 0;
		if (errTextPart?.text) try {
			const parsed = JSON.parse(errTextPart.text);
			if (parsed && typeof parsed === "object") {
				if (typeof parsed.code === "number") bizCode = parsed.code;
				if (typeof parsed.message === "string") bizMessage = parsed.message;
				if (typeof parsed.request_id === "string") requestId = parsed.request_id;
			}
		} catch {
			bizMessage = errTextPart.text;
		}
		throw new LexiangApiError({
			toolName,
			message: `[lexiang-api] ${toolName} tool isError: ${bizMessage ?? JSON.stringify(result.content)}${bizCode !== void 0 ? ` (code=${bizCode})` : ""}`,
			bizCode,
			bizMessage,
			requestId
		});
	}
	const textPart = Array.isArray(result?.content) ? result.content.find((c) => c?.type === "text" && typeof c.text === "string") : void 0;
	if (textPart?.text) {
		let parsed;
		try {
			parsed = JSON.parse(textPart.text);
		} catch {
			return textPart.text;
		}
		if (parsed && typeof parsed === "object" && typeof parsed.code === "number" && "data" in parsed) {
			if (parsed.code !== 0) throw new LexiangApiError({
				toolName,
				message: `[lexiang-api] ${toolName} 业务失败: ${parsed.message ?? "no message"} (code=${parsed.code})`,
				bizCode: parsed.code,
				bizMessage: typeof parsed.message === "string" ? parsed.message : void 0,
				requestId: typeof parsed.request_id === "string" ? parsed.request_id : void 0
			});
			return parsed.data;
		}
		return parsed;
	}
	const structured = result?.structuredContent;
	if (structured && typeof structured === "object") {
		if (typeof structured.code === "number" && "data" in structured) {
			const s = structured;
			if (s.code !== 0) throw new LexiangApiError({
				toolName,
				message: `[lexiang-api] ${toolName} 业务失败: ${s.message ?? "no message"} (code=${s.code})`,
				bizCode: s.code,
				bizMessage: typeof s.message === "string" ? s.message : void 0,
				requestId: typeof s.request_id === "string" ? s.request_id : void 0
			});
			return s.data;
		}
		return structured;
	}
	throw new LexiangApiError({
		toolName,
		message: `[lexiang-api] ${toolName} 响应结构未知: ${JSON.stringify(json)?.slice(0, 500)}`
	});
}
/**
* 调用一个 MCP 工具并返回解析后的业务数据。
*
* 通过 AppProviders.facades.tencentLexiang.gatewayPost 发起请求，避免 renderer
* 直连外部 MCP 服务引发 CORS 问题。
*
* 401/41 自动恢复：第一次请求失败且命中 auth-like 错误时，通过 single-flight
* token refresh 刷新乐享 token 并重试原请求一次；仍失败才抛结构化 auth error。
*/
async function callMcpTool(toolName, args) {
	getTencentLexiangFacade$1();
	const body = {
		id: generateRequestId(),
		method: "tools/call",
		params: {
			name: "call_rpc",
			arguments: {
				tool_name: toolName,
				arguments: args
			}
		}
	};
	try {
		return await executeMcpRequest(toolName, body);
	} catch (firstError) {
		if (!isLexiangAuthExpiredError(firstError)) throw firstError;
		const adapter = getAdapterForRefresh();
		if (!adapter) throw firstError;
		try {
			await refreshLexiangConnectorTokenOnce(adapter);
		} catch {
			throw firstError;
		}
		return executeMcpRequest(toolName, {
			...body,
			id: generateRequestId()
		});
	}
}
var GATEWAY_MCP_PATH, LexiangApiError;
var init_mcp_client = __esmMin((() => {
	init_services();
	init_auth_error();
	init_auth_refresh();
	GATEWAY_MCP_PATH = "/mcp";
	LexiangApiError = class extends Error {
		constructor(opts) {
			super(opts.message);
			this.name = "LexiangApiError";
			this.toolName = opts.toolName;
			this.bizCode = opts.bizCode;
			this.bizMessage = opts.bizMessage;
			this.mcpCode = opts.mcpCode;
			this.requestId = opts.requestId;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/auth-error.ts
var LEXIANG_AUTH_EXPIRED_CODES, isLexiangAuthExpiredCode, AUTH_EXPIRED_MESSAGE_PATTERNS, isLexiangAuthExpiredError;
var init_auth_error = __esmMin((() => {
	init_mcp_client();
	LEXIANG_AUTH_EXPIRED_CODES = /* @__PURE__ */ new Set([41, 401]);
	isLexiangAuthExpiredCode = (code) => {
		if (typeof code === "number") return LEXIANG_AUTH_EXPIRED_CODES.has(code);
		if (typeof code === "string") {
			const num = Number(code);
			return !Number.isNaN(num) && LEXIANG_AUTH_EXPIRED_CODES.has(num);
		}
		return false;
	};
	AUTH_EXPIRED_MESSAGE_PATTERNS = [
		/\b401\b/,
		/\bunauthorized\b/i,
		/\binvalid[_\s]?token\b/i
	];
	isLexiangAuthExpiredError = (error) => {
		if (!error) return false;
		if (isLexiangApiError(error)) {
			const apiError = error;
			if (isLexiangAuthExpiredCode(apiError.bizCode)) return true;
			if (isLexiangAuthExpiredCode(apiError.mcpCode)) return true;
		}
		const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
		if (!message) return false;
		return AUTH_EXPIRED_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/spapi-client.ts
function getTencentLexiangFacade() {
	const facade = getFacades()?.tencentLexiang;
	if (!facade?.spApiRequest) throw new Error("[lexiang-spapi] tencentLexiang.spApiRequest facade 不可用");
	return facade;
}
/**
* 乐享 SPAPI 通用请求方法。
*
* 通过 Node 层 Facade 代理发送，避免 CORS。
* 支持 GET/POST/PUT/DELETE/PATCH。
*/
async function callSpApi(params) {
	return await getTencentLexiangFacade().spApiRequest({
		method: params.method ?? "GET",
		path: params.path,
		query: params.query,
		body: params.body
	});
}
/**
* 从 SPAPI 响应中提取 data 字段。
*
* 兼容两种形态：
* - 标准包装：{ code, message, data: T } → 返回 .data
* - 裸数据：直接返回原值
*/
function unwrapData(raw) {
	if (raw && typeof raw === "object" && "data" in raw) return raw.data;
	return raw;
}
var init_spapi_client = __esmMin((() => {
	init_contract();
	init_services();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/catalog-service.ts
async function fetchExampleSpace() {
	return callMcpTool("entry_list_example_space_entries", {});
}
async function fetchLatestEntries(spaceId, limit = 20, pageToken) {
	const args = {
		space_id: spaceId,
		limit
	};
	if (pageToken) args.page_token = pageToken;
	return callMcpTool("entry_list_latest_entries", args);
}
async function fetchEntryChildren(parentId, limit = 50, pageToken, sortBy, include) {
	const key = buildEntryChildrenKey(parentId, limit, pageToken, sortBy, include);
	const existing = inflightEntryChildren.get(key);
	if (existing) return existing;
	const query = { limit };
	if (sortBy) query.sort_by = sortBy;
	if (pageToken) query.page_token = pageToken;
	if (include) query.include = include;
	query.disable_virtual = 1;
	const promise = callSpApi({
		path: `/spapi/kb/entry/v1/entries/${encodeURIComponent(parentId)}/children`,
		query
	}).then(unwrapData).finally(() => {
		inflightEntryChildren.delete(key);
	});
	inflightEntryChildren.set(key, promise);
	return promise;
}
/**
* 拉取指定父节点下的一层子条目（对齐 `entry_list_children`）。
*
* @param parentId  父节点 id；从知识库根目录开始时传 `space.root_entry_id`
* @param pageToken 分页 token，首页不传；翻页时传上一次响应的 `next_page_token`
* @param limit     本次返回的子条目数量，默认 {@link LEXIANG_CATALOG_PAGE_SIZE}
* @returns 已映射为面板通用 `LexiangFile` 的一页子节点 + `nextPageToken`
*
* @example
* // 首次加载某知识库根目录
* const { items, nextPageToken } = await fetchCatalogChildren(kb.rootEntryId!);
*
* // 加载下一页
* const next = await fetchCatalogChildren(kb.rootEntryId!, nextPageToken);
*/
async function fetchCatalogChildren(parentId, pageToken, limit = 20, sortBy) {
	const data = await fetchEntryChildren(parentId, limit, pageToken, sortBy, "staff");
	return {
		items: (data.entries ?? []).map((entry) => mapRawEntry(entry, data.staffs)),
		nextPageToken: data.next_page_token || void 0
	};
}
/**
* 创建一个知识条目（本期仅开放文档类：page / smartsheet）。
*
* @param params.parentEntryId 父节点 id（一级条目可传知识库 `root_entry_id`）
* @param params.type          本地枚举（doc / sheet）
* @param params.name          条目名称（用户未指定时调用方提供默认值）
* @returns 后端创建后的 entry 对象；`entry.id` 可用于拼 `pages/{id}` 预览 URL。
*/
async function createEntry(params) {
	const entryType = CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE[params.type];
	return callMcpTool("entry_create_entry", {
		entry_type: entryType,
		parent_entry_id: params.parentEntryId,
		name: params.name
	});
}
/**
* 将 createEntry 抛出的任意错误归一为 {@link CreateEntryErrorDetail}。
*
* 此函数只做分类，不做 i18n。各端根据 `kind` 自行取对应文案。
*/
function classifyCreateEntryError(err) {
	if (!isLexiangApiError(err)) return { kind: "network" };
	const { bizCode, bizMessage, requestId } = err;
	if (bizCode === 401 || bizCode === 403) return {
		kind: "forbidden",
		bizCode,
		bizMessage,
		requestId
	};
	if (bizCode === 429) return {
		kind: "rateLimit",
		bizCode,
		bizMessage,
		requestId
	};
	if (typeof bizCode === "number" && bizCode >= 500) return {
		kind: "server",
		bizCode,
		bizMessage,
		requestId
	};
	return {
		kind: "generic",
		bizCode,
		bizMessage,
		requestId
	};
}
var LEXIANG_CATALOG_SORT_BY, inflightEntryChildren, buildEntryChildrenKey, mapEntryType, mapFileType, mapRawEntry, CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE;
var init_catalog_service = __esmMin((() => {
	init_constants();
	init_mcp_client();
	init_spapi_client();
	LEXIANG_CATALOG_SORT_BY = "-edited_at";
	inflightEntryChildren = /* @__PURE__ */ new Map();
	buildEntryChildrenKey = (parentId, limit, pageToken, sortBy, include) => JSON.stringify([
		parentId,
		limit,
		pageToken ?? "",
		sortBy ?? "",
		include ?? ""
	]);
	mapEntryType = (entryType) => entryType;
	mapFileType = (entryType, extension) => {
		if (entryType === "folder") return "folder";
		if (entryType === "flink") return "other";
		const ext = extension?.toLowerCase();
		if (ext === "sheet" || ext === "smartsheet" || ext === "xlsx" || ext === "xls") return "sheet";
		if (ext === "mind" || ext === "mm") return "mind";
		if (ext === "slide" || ext === "ppt" || ext === "pptx") return "slide";
		if (ext === "pdf") return "pdf";
		return "doc";
	};
	mapRawEntry = (raw, staffs) => {
		const editedAtSec = raw.edited_at ? Number(raw.edited_at) : 0;
		const updatedAtMs = Number.isFinite(editedAtSec) ? editedAtSec * 1e3 : 0;
		const staff = raw.owned_by && staffs ? staffs[raw.owned_by] : void 0;
		return {
			id: raw.id,
			title: raw.name,
			type: mapFileType(raw.entry_type, raw.extension),
			ext: raw.extension,
			is_folder: raw.entry_type === "folder",
			owner: { name: staff?.display_name ?? "" },
			updated_at: updatedAtMs,
			entry_type: mapEntryType(raw.entry_type),
			parent_id: raw.parent_id,
			target_id: raw.target_id,
			extension: raw.extension,
			display_icon: raw.display_icon,
			has_children: raw.has_children
		};
	};
	CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE = {
		doc: "page",
		sheet: "smartsheet",
		folder: "folder"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/entry-service.ts
/**
* 获取当前用户最近访问过的知识条目列表（跨知识库），按访问时间倒序排列。
*
* 对应 SPAPI `GET /spapi/staff/kb/v1/recent-entries`。
*
* 传 include='staff' 时返回条目关联的人员信息（owned_by 对应的用户详情）。
* 传 include='space' 时返回条目关联的知识库信息（space_id 对应的知识库详情）。
* 可组合使用：include='staff,space'
*
* 注意：该接口不支持分页（不返回 next_page_token），调用方一次性拿到 limit 条结果即视为全部。
*/
async function fetchRecentEntries(limit = 10, include) {
	const query = { limit };
	if (include) query.include = include;
	return unwrapData(await callSpApi({
		path: "/spapi/staff/kb/v1/recent-entries",
		query
	}));
}
/**
* 反查乐享条目的最新标题，用于纠正前端快照里的过期标题。
*
* 背景（issue #87858 同类问题）：乐享预览抽屉是 `<iframe>` 直开
* `lexiangla.com/pages/{id}`，用户在里面改标题走的是乐享站点自己的链路，
* 跨域 + 无回调，renderer 完全感知不到。`store.previewFile` 仍是打开抽屉那一刻的
* 快照，于是「添加到任务」注入输入框的 chip 是旧标题。
*
* 实现选型：复用已在生产使用的 `entry_list_children`
* （`GET /spapi/kb/entry/v1/entries/{parentId}/children`）+ `-edited_at` 排序，
* 而不是新增一个未验证的「按 id 查详情」接口。刚改过名的条目 edited_at 最新，
* 稳定落在第一页。
*
* 兜底策略（命中任一条都返回 `file.title`，不抛错、不阻塞后续跳转）：
* - 缺 `parent_id`（如搜索结果 / 最近访问等未带父节点的来源）；
* - 请求失败，或耗时超过 `timeoutMs`；
* - 第一页里找不到该 id，或返回的 name 为空白。
*/
async function resolveFreshLexiangEntryTitle(file, timeoutMs = LEXIANG_FRESH_TITLE_TIMEOUT_MS) {
	const parentId = file.parent_id;
	if (!parentId || !file.id) return file.title;
	let timer;
	try {
		const matched = (await Promise.race([fetchEntryChildren(parentId, FRESH_TITLE_PAGE_SIZE, void 0, LEXIANG_CATALOG_SORT_BY), new Promise((resolve) => {
			timer = setTimeout(() => resolve(null), timeoutMs);
		})]))?.entries?.find((entry) => entry.id === file.id);
		return (typeof matched?.name === "string" ? matched.name.trim() : "") || file.title;
	} catch (err) {
		console.warn("[lexiang-api] resolveFreshLexiangEntryTitle failed:", err);
		return file.title;
	} finally {
		if (timer !== void 0) clearTimeout(timer);
	}
}
var LEXIANG_FRESH_TITLE_TIMEOUT_MS, FRESH_TITLE_PAGE_SIZE;
var init_entry_service = __esmMin((() => {
	init_catalog_service();
	init_spapi_client();
	LEXIANG_FRESH_TITLE_TIMEOUT_MS = 1500;
	FRESH_TITLE_PAGE_SIZE = 20;
}));
//#endregion
export { isLexiangAuthExpiredError as _, classifyCreateEntryError as a, refreshLexiangConnectorTokenOnce as b, fetchEntryChildren as c, init_catalog_service as d, callSpApi as f, isLexiangAuthExpiredCode as g, init_auth_error as h, LEXIANG_CATALOG_SORT_BY as i, fetchExampleSpace as l, unwrapData as m, init_entry_service as n, createEntry as o, init_spapi_client as p, resolveFreshLexiangEntryTitle as r, fetchCatalogChildren as s, fetchRecentEntries as t, fetchLatestEntries as u, init_mcp_client as v, init_auth_refresh as y };
