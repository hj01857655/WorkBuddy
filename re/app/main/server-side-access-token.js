const require_handler_registry = require("./handler-registry.js");
require("node:fs");
require("node:path");
require("node:os");
//#region ../../packages/workbuddy-server/src/connector-oauth/handlers.ts
var LEGACY_CONNECTOR_NAMES = /* @__PURE__ */ new Set([
	"github",
	"gongfeng",
	"cnb",
	"figma",
	"enterprise_gongfeng"
]);
async function callConnectorOauthApi(method, path, deps, query, body, endpointOverride, options) {
	const endpoint = (endpointOverride ?? deps.productManager.getEndpoint()).replace(/\/+$/, "");
	const url = `${endpoint}${path}${buildQueryString(query)}`;
	const init = {
		method,
		headers: {
			"Content-Type": "application/json",
			...deps.authenticationManager.buildAuthHeaders?.(true, true, false) ?? {}
		},
		redirect: options?.redirect ?? "manual"
	};
	if (method === "POST") init.body = body ? JSON.stringify(body) : "{}";
	const response = await deps.fetch(url, init);
	const text = await response.text();
	const responseRequestId = getConnectorOauthResponseRequestId(response.headers);
	const debugInfo = {
		method,
		endpoint,
		path,
		url,
		httpStatus: response.status,
		responseTextPreview: text.slice(0, 500)
	};
	if (responseRequestId) debugInfo.requestId = responseRequestId;
	const responseLocation = response.headers.get("location");
	if (responseLocation) debugInfo.responseLocation = responseLocation;
	if (response.status === 0 || response.status >= 300 && response.status < 400) {
		const redirectTo = sanitizeRedirectLocation(response.headers.get("location") ?? response.headers.get("Location") ?? "");
		return {
			code: -302,
			msg: `Unexpected redirect (HTTP ${response.status || 302})${redirectTo ? ` → ${redirectTo}` : ""}`,
			requestId: debugInfo.requestId,
			_debug: debugInfo
		};
	}
	if (!response.ok) {
		let parsed;
		try {
			parsed = JSON.parse(text);
		} catch {
			parsed = void 0;
		}
		if (!debugInfo.requestId && typeof parsed?.requestId === "string") debugInfo.requestId = parsed.requestId;
		return {
			code: response.status,
			msg: `HTTP ${response.status}: ${text.slice(0, 500)}`,
			requestId: debugInfo.requestId,
			_debug: debugInfo
		};
	}
	try {
		const parsed = JSON.parse(text);
		if (parsed && typeof parsed === "object") {
			if (!debugInfo.requestId && typeof parsed.requestId === "string") debugInfo.requestId = parsed.requestId;
			return {
				...parsed,
				_debug: debugInfo
			};
		}
		return parsed;
	} catch {
		return {
			code: -1,
			msg: `Non-JSON response: ${text.slice(0, 500)}`,
			_debug: debugInfo
		};
	}
}
function registerConnectorOauthHandlers(registry, deps) {
	require_handler_registry.handleRpc(registry, "connectorOauthStart", async (name) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		return callConnectorOauthApi("POST", `/v2/as/connector/oauth/${oauthName}/start`, apiDeps, void 0, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
	});
	require_handler_registry.handleRpc(registry, "connectorOauthStatus", async (name) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		return callConnectorOauthApi("GET", `/v2/as/connector/oauth/${oauthName}/status`, apiDeps, void 0, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
	});
	require_handler_registry.handleRpc(registry, "connectorGetUserConnector", async () => {
		const apiDeps = await deps.getApiDeps();
		const result = await callConnectorOauthApi("GET", "/v2/as/connector/user/", apiDeps, void 0, void 0, resolveLegacyConnectorEndpoint(apiDeps));
		if (result?.code === 0) return { connectors: (Array.isArray(result.data?.connectors) ? result.data.connectors : []).map(mapUserConnector) };
		throw result;
	});
	require_handler_registry.handleRpc(registry, "connectorOauthConnect", async (name, payload) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		const useBodyCode = oauthName === "cnb";
		const query = payload?.code && !useBodyCode ? { code: payload.code } : void 0;
		const body = payload?.code && useBodyCode ? { authorization_code: payload.code } : void 0;
		return callConnectorOauthApi("POST", `/v2/as/connector/oauth/${oauthName}/connect`, apiDeps, query, body, maybeLegacyEndpoint(apiDeps, oauthName));
	});
	const getConnectorRepos = async (name) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		return callConnectorOauthApi("GET", `/v2/as/connector/oauth/${oauthName}/repos`, apiDeps, void 0, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
	};
	require_handler_registry.handleRpc(registry, "connectorOauthRepos", async (name) => getConnectorRepos(name));
	require_handler_registry.handleRpc(registry, "authGetRepoList", async (request) => {
		const result = await getConnectorRepos(request.name);
		if (result?.code === 0) return result.data;
		throw result;
	});
	require_handler_registry.handleRpc(registry, "authGetBranches", async (connector, params, page, perPage) => {
		const oauthName = await deps.resolveOauthName(connector);
		const apiDeps = await deps.getApiDeps();
		const query = {
			page: String(page ?? 0),
			per_page: String(perPage ?? 100)
		};
		for (const [key, value] of Object.entries(params ?? {})) if (typeof value === "string" && value) query[key] = value;
		else if (typeof value === "number") query[key] = String(value);
		const result = await callConnectorOauthApi("GET", `/v2/as/connector/oauth/${oauthName}/branches`, apiDeps, query, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
		if (result?.code === 0) return result.data?.branches ?? [];
		throw result;
	});
	require_handler_registry.handleRpc(registry, "connectorOauthTempLoginUrl", async (name, body) => callConnectorOauthApi("POST", `/v2/as/connector/oauth/${name}/temp-login-url`, await deps.getApiDeps(), void 0, body));
	require_handler_registry.handleRpc(registry, "connectorEnterpriseTempLoginUrl", async (_name, body) => {
		const enterpriseId = await deps.getEnterpriseId();
		if (!enterpriseId) return {
			code: -1,
			msg: "enterpriseId required"
		};
		const result = await callConnectorOauthApi("POST", `/console/enterprises/${encodeURIComponent(enterpriseId)}/lexiang/temp-login-url`, await deps.getApiDeps(), void 0, body);
		if (result?.code !== void 0) return result;
		if (typeof result?.login_url === "string" && result.login_url) return {
			code: 0,
			data: { login_url: result.login_url }
		};
		return {
			code: -1,
			msg: "login_url missing"
		};
	});
	require_handler_registry.handleRpc(registry, "connectorRegistry2cList", async (scope) => {
		const apiDeps = await deps.getApiDeps();
		return callConnectorOauthApi("GET", "/v2/as/connector/registry2c/list", apiDeps, { scope: scope || "all" }, void 0, resolveLegacyConnectorEndpoint(apiDeps));
	});
	require_handler_registry.handleRpc(registry, "connectorOauthAccessToken", async (name) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		return callConnectorOauthApi("GET", `/v2/as/connector/oauth/${oauthName}/accesstoken`, apiDeps, void 0, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
	});
	require_handler_registry.handleRpc(registry, "connectorOauthRevoke", async (name) => {
		const oauthName = await deps.resolveOauthName(name);
		const apiDeps = await deps.getApiDeps();
		const result = await callConnectorOauthApi("POST", `/v2/as/connector/oauth/${oauthName}/revoke`, apiDeps, void 0, void 0, maybeLegacyEndpoint(apiDeps, oauthName));
		if (oauthName.includes("lexiang")) try {
			const totalCleared = await deps.clearDefaultSessionCookiesForDomains([...require_handler_registry.LEXIANG_COOKIE_DOMAINS]);
			deps.logger?.info(`[connector-oauth] Cleared ${totalCleared} lexiang-related cookies from defaultSession`);
		} catch (e) {
			deps.logger?.warn("[connector-oauth] Failed to clear lexiang-related cookies:", e);
		}
		return result;
	});
}
function mapUserConnector(connector) {
	return {
		...connector,
		connectStatus: connector.connect_status,
		activeStatus: connector.active_status,
		displayName: connector.display_name,
		oauthClientId: connector.oauth_client_id,
		oauthRedirectUrl: connector.oauth_redirect_url,
		oauthAppName: connector.oauth_app_name
	};
}
function maybeLegacyEndpoint(deps, oauthName) {
	if (!LEGACY_CONNECTOR_NAMES.has(oauthName)) return;
	return resolveLegacyConnectorEndpoint(deps);
}
function resolveLegacyConnectorEndpoint(deps) {
	const session = deps.authenticationManager.currentSessionSubject?.getValue?.();
	const enterpriseId = session?.account?.enterpriseId;
	const domain = session?.auth?.domain;
	if (isIOAEnterprise(enterpriseId) && typeof domain === "string" && domain.length > 0) return `https://${domain}`;
	return deps.productManager.getEndpoint();
}
function isIOAEnterprise(enterpriseId) {
	return enterpriseId === "etahzsqej0n4" || enterpriseId === "esoikz80kd8g";
}
function buildQueryString(query) {
	if (!query) return "";
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(query)) if (value !== void 0) params.append(key, value);
	const qs = params.toString();
	return qs ? `?${qs}` : "";
}
function getConnectorOauthResponseRequestId(headers) {
	return headers.get("x-request-id") ?? headers.get("X-Request-ID") ?? headers.get("request-id") ?? headers.get("x-requestid") ?? headers.get("requestid") ?? void 0;
}
/**
* 脱敏 3xx 响应的 Location header：只保留 origin+pathname，去掉 query/hash。
*
* 原始 Location 里可能带 OAuth code / state / access_token 等敏感 query 参数，
* 直接透出到错误消息会顺着 telemetry / 日志上报出去。我们只保留最能帮助定位的
* 目标域名 + 路径（例如 `https://sso.example.com/agents`）。
*
* 相对路径（如 `/agents`）保留原样返回；无法解析时返回空字符串。
*/
function sanitizeRedirectLocation(location) {
	if (!location) return "";
	try {
		const parsed = new URL(location);
		return `${parsed.origin}${parsed.pathname}`;
	} catch {
		return location.startsWith("/") ? location.split("?")[0] : "";
	}
}
var ARDOT_ROOT_DOMAIN = "ardot.tencent.com";
/**
* dev 覆盖的 host 白名单：只认 `ardot.tencent.com` 及其子域。
*
* 这里刻意比 `isArdotHostUrl` 的子串匹配严格——`hostname.includes('ardot')`
* 会放行 `ardot.attacker.com` 这类攻击者可注册的域名，而覆盖条目会带着用户的
* Bearer 一起发过去。
*/
function isArdotOverrideHostAllowed(endpoint) {
	try {
		const { hostname } = new URL(endpoint);
		return hostname === ARDOT_ROOT_DOMAIN || hostname.endsWith(`.${ARDOT_ROOT_DOMAIN}`);
	} catch {
		return false;
	}
}
function isValidHttpUrl(endpoint) {
	try {
		const url = new URL(endpoint);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function setArdotEmbedUrlProvider(provider) {}
function buildBuiltinArdotMcpConfig() {
	return {
		type: "http",
		url: "https://ardot.tencent.com/mcp",
		disabled: false,
		managedBy: "workbuddy-builtin",
		_workbuddyManagedAuth: "server-side"
	};
}
/**
* 用户在 `~/.workbuddy/mcp.json` 里对内置 Ardot MCP 的 dev 覆盖，用于把设计创意
* 会话整体切到测试 / staging Ardot 后端做验证走查（可配合 `x-frontend-branch` /
* `x-backend-branch` 头指定分支构建）。
*
* server key **必须**沿用 `ardot`：MCP App 的 appId 由 server 短名拼出
* （`McpManager.listApps()`: `${serverId}/${originalName}`），换成 `ardot-test` 之类会让
* `ardot/create_design` / `ardot/open_design` 这两个被渲染层画布网关、Host
* bootstrap、制品生成链路硬编码的 appId 全部落空（画布直接打不开），同时丢掉
* `ConnectorMcpProxy.listAllTools` 里按短名 `ardot` 做的「仅 design 会话暴露」
* 隔离，测试工具会泄漏进代码 / 办公会话。
*
* 覆盖需要显式 `dev: true`，避免用户误写一条同名条目就把线上 Ardot 顶掉。
*
* URL host 必须落在 `ardot.tencent.com` 域内，这是这里唯一的安全边界：Ardot 走内置
* 白名单绕过了 MCP approval 流程，若不限制 host，一条 mcp.json 就能把设计会话的
* 全部 MCP 流量连同 Bearer token 导向任意第三方域名。Ardot 后端不提供本地部署，
* 因此不放行回环地址。
*/
function isValidArdotDevMcpServer(entry) {
	if (!entry || typeof entry !== "object") return false;
	const server = entry;
	if (server.dev !== true) return false;
	const url = typeof server.url === "string" ? server.url.trim() : "";
	if (url.length === 0 || !isValidHttpUrl(url)) return false;
	return isArdotOverrideHostAllowed(url);
}
/**
* 「静态鉴权模式」生效的裸 token：`dev: true` 覆盖合法且带可用 Authorization 时，
* 返回剥掉 `Bearer ` 前缀的 token。
*
* 命中时影子账号链路必须整体让位——MCP 请求、发送门禁、MCP Apps 画布换票都用这里
* 的 token。画布若改拿影子账号的正式 Ardot token，会被测试环境的协同网关判成
* `authentication err`（表现为画布「暂无权限」而 MCP 工具一切正常）。
*/
function resolveArdotStaticAuthToken(entry) {
	if (!isValidArdotDevMcpServer(entry)) return;
	const { headers } = entry;
	if (!headers || typeof headers !== "object") return;
	const raw = Object.entries(headers).find(([key, value]) => key.toLowerCase() === "authorization" && typeof value === "string")?.[1];
	const token = typeof raw === "string" ? raw.replace(/^\s*Bearer\b\s*/i, "").trim() : "";
	return token.length > 0 ? token : void 0;
}
/**
* 把用户 dev 覆盖条目规整成内置 Ardot MCP 配置。
*
* 只挑取需要的字段（不整体 spread 用户条目），避免 `command` / `args` 等 stdio
* 字段混进来把 transport 带偏；`managedBy` 保持 `workbuddy-builtin` 让 UI 与
* desired-config 的白名单分支继续认得它。
*/
function buildArdotDevOverrideMcpConfig(entry) {
	const staticAuth = resolveArdotStaticAuthToken(entry) !== void 0;
	return {
		type: "http",
		url: entry.url.trim(),
		...entry.headers && Object.keys(entry.headers).length > 0 ? { headers: entry.headers } : {},
		...typeof entry.timeout === "number" ? { timeout: entry.timeout } : {},
		...Array.isArray(entry.disabledTools) ? { disabledTools: entry.disabledTools } : {},
		disabled: entry.disabled === true,
		managedBy: "workbuddy-builtin",
		...staticAuth ? {} : { _workbuddyManagedAuth: "server-side" }
	};
}
/**
* 决议生效的 Ardot MCP 配置：用户 dev 覆盖优先，否则回落内置正式环境配置。
*/
function resolveArdotMcpConfig(userEntry) {
	if (isValidArdotDevMcpServer(userEntry)) return buildArdotDevOverrideMcpConfig(userEntry);
	return buildBuiltinArdotMcpConfig();
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector-oauth/server-side-access-token.ts
/** 共用云端托管取票入口；资源端拒票后必须显式跳过服务端的有效期缓存。 */
function requestServerSideAccessToken(connectorName, apiDeps, options) {
	return callConnectorOauthApi("GET", `/${options?.route ?? "v2"}/as/connector/oauth/${connectorName}/accesstoken${options?.forceRefresh ? "?force_refresh=1" : ""}`, apiDeps);
}
//#endregion
Object.defineProperty(exports, "callConnectorOauthApi", {
	enumerable: true,
	get: function() {
		return callConnectorOauthApi;
	}
});
Object.defineProperty(exports, "registerConnectorOauthHandlers", {
	enumerable: true,
	get: function() {
		return registerConnectorOauthHandlers;
	}
});
Object.defineProperty(exports, "requestServerSideAccessToken", {
	enumerable: true,
	get: function() {
		return requestServerSideAccessToken;
	}
});
Object.defineProperty(exports, "resolveArdotMcpConfig", {
	enumerable: true,
	get: function() {
		return resolveArdotMcpConfig;
	}
});
Object.defineProperty(exports, "resolveArdotStaticAuthToken", {
	enumerable: true,
	get: function() {
		return resolveArdotStaticAuthToken;
	}
});
Object.defineProperty(exports, "setArdotEmbedUrlProvider", {
	enumerable: true,
	get: function() {
		return setArdotEmbedUrlProvider;
	}
});
