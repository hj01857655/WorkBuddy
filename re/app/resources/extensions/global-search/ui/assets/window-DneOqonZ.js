import GlobalSearchWindow, { W as WB_CONVERSATION_CLIENT_TOOL_INVOKE, a as WB_CONVERSATION_CHILD_AGENT_EVENT, b as WB_CONVERSATION_CHILD_AGENT_EVENT_BATCH, I as INSTANCE_EVENT_BINDS, c as WB_CONVERSATION_MODEL_CHANGE, d as WB_CONVERSATION_MODE_CHANGE, e as WB_CONVERSATION_CONFIG_UPDATE, M as METHOD_BINDS, R as REHYDRATE_MANUAL_KEYS, f as attachConversationPromptOperations, g as WB_CONVERSATION_PERMISSION, h as WB_CONVERSATION_POI_PICK, i as WB_CONVERSATION_STATE_CHANGE, j as WB_CONVERSATION_INFO_CHANGE, k as WB_CONVERSATION_REQUESTS_CHANGED, C as ConversationEvent, l as ConversationExtensionMethod, m as WB_CONVERSATION_EXTENSION_METHOD, n as WB_CONVERSATION_QUEUE_UPDATE, r as requireConversationRequestPatches, o as WB_CONVERSATION_REQUEST_UPDATE, p as WB_CONVERSATION_REQUEST_UPDATE_BATCH, q as WB_CONVERSATION_UNARCHIVED, s as WB_CONVERSATION_ARCHIVED, t as WB_CONVERSATION_DELETED, u as WB_CONVERSATION_CREATED, v as WB_CONVERSATION_LIST_PROGRESS, w as COLLECTION_EVENT_BINDS, x as ConversationsEvent, y as WB_CONVERSATION_LIST_CHANGED, z as WB_CONVERSATION_PINS_REORDERED, A as WB_CONVERSATION_UNPINNED, B as WB_CONVERSATION_PINNED, D as WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, E as createRoot, F as jsxRuntimeExports } from './__federation_expose_Main-CF6W7ItU.js';

class WBBus {
  handlers = /* @__PURE__ */ new Map();
  wildcardHandlers = /* @__PURE__ */ new Set();
  /** 订阅事件，返回取消函数 */
  on(event, handler) {
    let set = this.handlers.get(event);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.handlers.set(event, set);
    }
    set.add(handler);
    return () => {
      set.delete(handler);
      if (set.size === 0) {
        this.handlers.delete(event);
      }
    };
  }
  /** 取消订阅（需传入与 on 相同的 handler 引用） */
  off(event, handler) {
    const set = this.handlers.get(event);
    if (!set) {
      return;
    }
    set.delete(handler);
    if (set.size === 0) {
      this.handlers.delete(event);
    }
  }
  /** 派发事件。单个 handler 抛错不影响其他订阅者。 */
  emit(event, payload) {
    const set = this.handlers.get(event);
    if (set && set.size > 0) {
      for (const handler of [...set]) {
        try {
          handler(payload);
        } catch {
        }
      }
    }
    if (this.wildcardHandlers.size > 0) {
      for (const wh of [...this.wildcardHandlers]) {
        try {
          wh(event, payload);
        } catch {
        }
      }
    }
  }
  /**
   * 全量监听所有事件（通配符订阅）。
   * 典型用途：IPC 转发器 —— 主进程 bus 上挂一个 onAny，把所有事件推到 renderer。
   */
  onAny(handler) {
    this.wildcardHandlers.add(handler);
    return () => {
      this.wildcardHandlers.delete(handler);
    };
  }
  /** 清空某事件的全部订阅，不传 event 则清空所有（含 wildcard） */
  clear(event) {
    if (event === void 0) {
      this.handlers.clear();
      this.wildcardHandlers.clear();
    } else {
      this.handlers.delete(event);
    }
  }
}
let instance = null;
function getBus() {
  if (!instance) {
    instance = new WBBus();
  }
  return instance;
}

function isSerializedBridgeError(value) {
  return value !== null && typeof value === "object" && value.__wbError === true;
}
function deserializeResult(result) {
  if (!isSerializedBridgeError(result)) {
    return result;
  }
  const { message, code, source, httpStatus, data, axios } = result;
  const err = new Error(message);
  err.name = "WBError";
  if (code) {
    err.code = code;
  }
  if (source) {
    err.source = source;
  }
  if (httpStatus !== void 0) {
    err.httpStatus = httpStatus;
  }
  if (data !== void 0) {
    err.data = data;
  }
  if (axios) {
    if (axios.response) {
      err.response = { ...axios.response };
    }
    if (axios.config) {
      err.config = { ...axios.config };
    }
    if (axios.code && !err.code) {
      err.code = axios.code;
    }
    err.isAxiosError = true;
  }
  throw err;
}

var define_process_env_default = {};
const DEFAULT_LIST_THROTTLE_MS = 300;
function readListThrottleMs() {
  if (typeof process === "undefined") {
    return DEFAULT_LIST_THROTTLE_MS;
  }
  const raw = define_process_env_default?.WB_GUEST_LIST_THROTTLE_MS;
  if (raw === void 0) {
    return DEFAULT_LIST_THROTTLE_MS;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return DEFAULT_LIST_THROTTLE_MS;
  }
  return Math.floor(parsed);
}
const LIST_THROTTLE_MS = readListThrottleMs();
function serializeListArgs(args) {
  try {
    return JSON.stringify(args);
  } catch {
    return void 0;
  }
}
function resolveInvokeContext(options) {
  const subject = options?.subject ?? (options?.callerId ? { moduleId: options.callerId, type: "module", scopes: [] } : void 0);
  if (!subject) {
    return void 0;
  }
  return { callerId: subject.moduleId, subject };
}
function createGuestProxy(namespace, invoke, options) {
  return _proxy(namespace, invoke, resolveInvokeContext(options));
}
function _proxy(path, invoke, context) {
  const children = /* @__PURE__ */ new Map();
  const listCache = /* @__PURE__ */ new Map();
  const proxy = new Proxy(() => {
  }, {
    get(_target, prop) {
      if (prop === "then") {
        return void 0;
      }
      if (prop === "toJSON") {
        return void 0;
      }
      if (typeof prop !== "string") {
        return void 0;
      }
      if (prop === "bind") {
        return (_thisArg, ...boundArgs) => (...callArgs) => Reflect.apply(proxy, void 0, [...boundArgs, ...callArgs]);
      }
      if (prop === "call") {
        return (_thisArg, ...args) => Reflect.apply(proxy, void 0, args);
      }
      if (prop === "apply") {
        return (_thisArg, args) => Reflect.apply(proxy, void 0, args ?? []);
      }
      const cached = children.get(prop);
      if (cached !== void 0) {
        return cached;
      }
      const child = _proxy(`${path}.${prop}`, invoke, context);
      children.set(prop, child);
      return child;
    },
    apply(_target, _thisArg, args) {
      const lastDot = path.lastIndexOf(".");
      const channel = `wb:${path.slice(0, lastDot)}:${path.slice(lastDot + 1)}`;
      const isListCall = LIST_THROTTLE_MS > 0 && (path === "list" || path.endsWith(".list"));
      if (isListCall) {
        const key = serializeListArgs(args);
        if (key !== void 0) {
          const cached = listCache.get(key);
          if (cached) {
            const now = Date.now();
            if (cached.fulfilledAt === void 0) {
              console.log(`[wb-list-cache] HIT-INFLIGHT channel=${channel} keyLen=${key.length}`);
              return cached.promise;
            }
            if (now - cached.fulfilledAt < LIST_THROTTLE_MS) {
              console.log(`[wb-list-cache] HIT-FRESH channel=${channel} ageMs=${now - cached.fulfilledAt} keyLen=${key.length}`);
              return cached.promise;
            }
            listCache.delete(key);
          }
          console.log(`[wb-list-cache] MISS channel=${channel} keyLen=${key.length}`);
          const promise = invoke(channel, context, ...args).then(deserializeResult);
          const entry = { promise };
          listCache.set(key, entry);
          promise.then(
            () => {
              if (listCache.get(key) === entry) {
                entry.fulfilledAt = Date.now();
                const timer = setTimeout(() => {
                  if (listCache.get(key) === entry) {
                    listCache.delete(key);
                  }
                }, LIST_THROTTLE_MS);
                timer?.unref?.();
              }
            },
            () => {
              if (listCache.get(key) === entry) {
                listCache.delete(key);
              }
              console.log(`[wb-list-cache] REJECT channel=${channel} keyLen=${key.length}`);
            }
          );
          return promise;
        }
        console.log(`[wb-list-cache] SKIP-UNCACHEABLE channel=${channel} (args not JSON-serializable)`);
      }
      return invoke(channel, context, ...args).then(deserializeResult);
    }
  });
  return proxy;
}

const CONNECTOR_ROUTE_PREFIX = "/console/as/connector";

class WBError extends Error {
  code;
  source;
  constructor(message, options = {}) {
    super(message);
    this.name = "WBError";
    this.code = options.code ?? "UNKNOWN";
    this.source = options.source;
    this.cause = options.cause;
    Object.setPrototypeOf(this, WBError.prototype);
  }
  /**
   * 跨 IPC / JSON 日志只暴露稳定错误字段。`cause` 可能含 Axios、Connection 等循环引用，
   * 不得进入序列化结果；完整 cause 仍保留在当前进程内供调试。
   */
  toJSON() {
    return {
      name: "WBError",
      message: this.message,
      code: this.code,
      ...this.source ? { source: this.source } : {}
    };
  }
  /**
   * 把任意 throw 出来的东西归一化成 WBError。
   * 已经是 WBError 的原样返回；否则包装并保留 cause。
   *
   * HTTP 错误自动映射 status → WBErrorCode：
   * - 401 → NOT_AUTHENTICATED
   * - 403 → PERMISSION_DENIED
   * - 404 → NOT_FOUND
   * - 409 → CONFLICT
   * - 429 → RATE_LIMITED
   * - 其他 → UNKNOWN
   */
  static from(err, source) {
    if (err instanceof WBError) {
      return err;
    }
    const message = err instanceof Error ? err.message : String(err);
    const code = inferCodeFromError(err);
    return new WBError(message, { code, source, cause: err });
  }
}
async function wrapCall(source, fn) {
  try {
    return await fn();
  } catch (err) {
    throw WBError.from(err, source);
  }
}
const HTTP_STATUS_MAP = {
  401: "NOT_AUTHENTICATED",
  403: "PERMISSION_DENIED",
  404: "NOT_FOUND",
  409: "CONFLICT",
  429: "RATE_LIMITED"
};
function inferCodeFromError(err) {
  if (!err || typeof err !== "object") {
    return "UNKNOWN";
  }
  const e = err;
  const status = (typeof e.status === "number" ? e.status : void 0) ?? (typeof e.statusCode === "number" ? e.statusCode : void 0) ?? (typeof e.httpStatus === "number" ? e.httpStatus : void 0) ?? (e.response && typeof e.response === "object" ? e.response.status : void 0);
  if (status && HTTP_STATUS_MAP[status]) {
    return HTTP_STATUS_MAP[status];
  }
  if (e.code === "VOICE_REQUEST_STALE" || e.code === "VOICE_ALREADY_LISTENING" || e.code === "VOICE_DEVICE_BUSY") {
    return "CONFLICT";
  }
  if (e.code === "VOICE_PERMISSION_DENIED") {
    return "PERMISSION_DENIED";
  }
  if (e.code === "VOICE_TIMEOUT") {
    return "TIMEOUT";
  }
  if (e.code === "VOICE_DEVICE_NOT_FOUND") {
    return "NOT_FOUND";
  }
  if (e.code === "NOT_SUPPORTED") {
    return "NOT_SUPPORTED";
  }
  if (e.code === "VOICE_CAPTURE_FAILED") {
    return "INVALID_ARGUMENT";
  }
  const message = (e.message ?? "").toLowerCase();
  if (e.code === "ECONNABORTED" || message.includes("timeout")) {
    return "TIMEOUT";
  }
  if (e.code === "ERR_CANCELED" || message.includes("abort") || message.includes("cancel")) {
    return "CANCELLED";
  }
  if (message.includes("network") || message.includes("econnrefused") || message.includes("enotfound")) {
    return "NETWORK";
  }
  if (message.includes("not supported")) {
    return "NOT_SUPPORTED";
  }
  return "UNKNOWN";
}

function requiredNonEmpty(value, field, source) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    throw new WBError(`${source} requires a non-empty ${field}`, {
      code: "INVALID_ARGUMENT",
      source
    });
  }
  return trimmed;
}
function parseAbsoluteUrl(value, field, source) {
  try {
    return new URL(value);
  } catch {
    throw new WBError(`${field} must be an absolute URL`, {
      code: "INVALID_ARGUMENT",
      source
    });
  }
}
function readAuthorizeUrl(data) {
  if (typeof data?.authorize_url === "string") {
    return data.authorize_url;
  }
  if (typeof data?.authorizeUrl === "string") {
    return data.authorizeUrl;
  }
  return "";
}
function mergeAuthorizeParams(target, authorizeUrl) {
  let authorize;
  try {
    authorize = new URL(authorizeUrl);
  } catch {
    return;
  }
  authorize.searchParams.forEach((value, key) => {
    if (key === "code" || key === "redirect_uri") {
      return;
    }
    target.searchParams.set(key, value);
  });
  const connectorAuthorizeUrl = authorize.searchParams.get("redirect_uri")?.trim();
  if (!connectorAuthorizeUrl) {
    return;
  }
  target.searchParams.set("connector_authorize_url", connectorAuthorizeUrl);
}
function buildBuddyRedirectUrl(params) {
  const base = requiredNonEmpty(params.buddyRedirectUri, "buddyRedirectUri", "buildBuddyRedirectUrl");
  const code = requiredNonEmpty(params.code, "code", "buildBuddyRedirectUrl");
  const url = parseAbsoluteUrl(base, "buddyRedirectUri", "buildBuddyRedirectUrl");
  url.searchParams.set("code", code);
  const authorizeUrl = typeof params.authorizeUrl === "string" ? params.authorizeUrl.trim() : "";
  if (!authorizeUrl) {
    return url.toString();
  }
  mergeAuthorizeParams(url, authorizeUrl);
  return url.toString();
}
function unwrapStartData(raw) {
  if (raw && typeof raw === "object" && "data" in raw) {
    const nested = raw.data;
    if (nested) {
      return nested;
    }
  }
  return raw;
}
function isTerminalConnectorState(data) {
  const nextAction = data?.next_action ?? data?.nextAction;
  if (nextAction === "connected" || nextAction === "error") {
    return true;
  }
  const status = typeof data?.status === "string" ? data.status : "";
  if (status === "connected" || status === "error") {
    return true;
  }
  return Boolean(data?.error);
}
function jointResult(buddyRedirectUrl, authorizeUrl = "") {
  return { buddyRedirectUrl, authorizeUrl };
}
async function startCloudOauthAndBuildResult(http, source, connectorName, codeOnlyBuddyRedirectUrl, buddyRedirectUri, code) {
  const seg = encodeURIComponent(connectorName);
  const raw = await wrapCall(source, () => http.post(
    `${CONNECTOR_ROUTE_PREFIX}/oauth/${seg}/start`,
    {}
  ));
  const data = unwrapStartData(raw);
  if (isTerminalConnectorState(data)) {
    return jointResult(codeOnlyBuddyRedirectUrl);
  }
  const authorizeUrl = readAuthorizeUrl(data);
  if (!authorizeUrl) {
    return jointResult(codeOnlyBuddyRedirectUrl);
  }
  if (!buddyRedirectUri) {
    return jointResult("", authorizeUrl);
  }
  return jointResult(
    buildBuddyRedirectUrl({ buddyRedirectUri, code, authorizeUrl }),
    authorizeUrl
  );
}
async function authorizeBuddyWithConnector(http, options, connectors, mcp) {
  const source = "wb.authorizeBuddyWithConnector";
  requiredNonEmpty(options?.applicationId, "applicationId", source);
  const connectorName = requiredNonEmpty(options?.connectorName, "connectorName", source);
  const code = requiredNonEmpty(options?.code, "code", source);
  const buddyRedirectUri = typeof options?.buddyRedirectUri === "string" ? options.buddyRedirectUri.trim() : "";
  const codeOnlyBuddyRedirectUrl = buddyRedirectUri ? buildBuddyRedirectUrl({ buddyRedirectUri, code }) : "";
  return startCloudOauthAndBuildResult(
    http,
    source,
    connectorName,
    codeOnlyBuddyRedirectUrl,
    buddyRedirectUri,
    code
  );
}

const AUTH_STATUS_PATH = "/workbuddyopen/v1/authorize/status";
const AUTH_CODE_PATH = "/workbuddyopen/v1/authorize/code";
const AUTH_CONSENT_PATH = "/workbuddyopen/v1/authorize/consent";
function requiredApplicationId(options, source) {
  const applicationId = typeof options?.applicationId === "string" ? options.applicationId.trim() : "";
  if (!applicationId) {
    throw new WBError(`${source} requires a non-empty applicationId`, {
      code: "INVALID_ARGUMENT",
      source
    });
  }
  return applicationId;
}
function stringArray(value) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim() === "")) {
    return void 0;
  }
  return value;
}
function parseScopeInfo(value) {
  if (value === void 0 || value === null) {
    return void 0;
  }
  if (!Array.isArray(value)) {
    return void 0;
  }
  const scopes = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      return void 0;
    }
    const raw = item;
    const scopeId = typeof raw.scope_id === "string" ? raw.scope_id.trim() : "";
    if (!scopeId) {
      return void 0;
    }
    const displayName = typeof raw.display_name === "string" ? raw.display_name.trim() : "";
    const description = typeof raw.description === "string" ? raw.description.trim() : "";
    scopes.push({
      scopeId,
      displayName,
      description,
      ...typeof raw.risk_level === "string" && raw.risk_level ? { riskLevel: raw.risk_level } : {}
    });
  }
  return scopes;
}
function parseApplication(value, applicationId) {
  if (!value || typeof value !== "object") {
    throw new WBError("Invalid authorization status application", { code: "UNKNOWN", source: "wb.login" });
  }
  const raw = value;
  const redirectUris = raw.redirect_uris === void 0 || raw.redirect_uris === null ? [] : stringArray(raw.redirect_uris);
  const allowedScopes = stringArray(raw.allowed_scopes);
  if (raw.id !== applicationId || typeof raw.name !== "string" || !raw.name || redirectUris === void 0 || !allowedScopes) {
    throw new WBError("Invalid authorization status application", { code: "UNKNOWN", source: "wb.login" });
  }
  if (raw.icon_url !== void 0 && typeof raw.icon_url !== "string") {
    throw new WBError("Invalid authorization application icon", { code: "UNKNOWN", source: "wb.login" });
  }
  const scopes = parseScopeInfo(raw.scope_info);
  return {
    id: applicationId,
    name: raw.name,
    ...raw.icon_url ? { iconUrl: raw.icon_url } : {},
    redirectUris,
    allowedScopes,
    ...scopes && scopes.length > 0 ? { scopes } : {}
  };
}
function shouldNotifyThirdParty(delivery, redirectUrl) {
  return delivery === "silent" && Boolean(redirectUrl);
}
function notifyThirdParty(redirectUrl) {
  const fetchFn = globalThis.fetch;
  if (typeof fetchFn !== "function") {
    return;
  }
  try {
    fetchFn(redirectUrl, {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      redirect: "follow",
      keepalive: true
    }).catch(() => void 0);
  } catch {
  }
}
async function loginThirdPartyApplication(http, options) {
  const applicationId = requiredApplicationId(options, "wb.login");
  const status = await wrapCall("wb.login", () => http.get(AUTH_STATUS_PATH, {
    params: { application_id: applicationId }
  }));
  if (typeof status?.authorized !== "boolean") {
    throw new WBError("Invalid authorization status response", { code: "UNKNOWN", source: "wb.login" });
  }
  const application = parseApplication(status.application, applicationId);
  if (!status.authorized) {
    if (status.granted_scopes !== null && status.granted_scopes !== void 0) {
      throw new WBError("Invalid unauthorized scopes response", { code: "UNKNOWN", source: "wb.login" });
    }
    return { authorized: false, applicationId, grantedScopes: [], application };
  }
  const grantedScopes = stringArray(status.granted_scopes);
  if (!grantedScopes) {
    throw new WBError("Invalid granted scopes response", { code: "UNKNOWN", source: "wb.login" });
  }
  const redirectUri = application.redirectUris[0] ?? "";
  const response = await wrapCall("wb.login", () => http.post(AUTH_CODE_PATH, {
    application_id: applicationId,
    scene: "client",
    ...redirectUri ? { redirect_uri: redirectUri } : {}
  }));
  if (typeof response?.code !== "string" || !response.code || response.application_id !== applicationId) {
    throw new WBError("Invalid authorization code response", { code: "UNKNOWN", source: "wb.login" });
  }
  const responseRedirectUri = typeof response.redirect_uri === "string" ? response.redirect_uri : "";
  if (redirectUri && !responseRedirectUri) {
    throw new WBError("Invalid authorization code response", { code: "UNKNOWN", source: "wb.login" });
  }
  if (shouldNotifyThirdParty(options.delivery, responseRedirectUri)) {
    notifyThirdParty(responseRedirectUri);
  }
  return {
    authorized: true,
    code: response.code,
    applicationId,
    redirectUri: responseRedirectUri,
    grantedScopes,
    application
  };
}
async function consentThirdPartyApplication(http, options) {
  const applicationId = requiredApplicationId(options, "wb.consent");
  const redirectUri = typeof options?.redirectUri === "string" ? options.redirectUri.trim() : "";
  const grantedScopes = stringArray(options?.grantedScopes);
  if (!grantedScopes?.length) {
    throw new WBError("wb.consent requires at least one granted scope", {
      code: "INVALID_ARGUMENT",
      source: "wb.consent"
    });
  }
  const response = await wrapCall("wb.consent", () => http.post(AUTH_CONSENT_PATH, {
    application_id: applicationId,
    ...redirectUri ? { redirect_uri: redirectUri } : {},
    approve: true,
    granted_scopes: grantedScopes
  }));
  if (response?.success !== true || response.approved !== true || typeof response.code !== "string" || !response.code) {
    throw new WBError("Invalid authorization consent response", { code: "UNKNOWN", source: "wb.consent" });
  }
  const redirectTo = typeof response.redirect_to === "string" ? response.redirect_to : "";
  if (redirectUri && !redirectTo) {
    throw new WBError("Invalid authorization consent response", { code: "UNKNOWN", source: "wb.consent" });
  }
  if (shouldNotifyThirdParty(options.delivery, redirectTo)) {
    notifyThirdParty(redirectTo);
  }
  return {
    approved: true,
    code: response.code,
    applicationId,
    redirectTo,
    grantedScopes
  };
}

const WB_SDK_VERSION = "1.0.0";

const FEEDBACK_RPC_CHANNEL = "feedback:submit";
const FEEDBACK_SUBMIT_TIMEOUT_MS = 12e4;
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function withTimeout(promise, ms, message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}
function normalizeFeedbackResult(response) {
  if (!isRecord(response)) {
    return { success: false, error: "Invalid feedback response" };
  }
  if (typeof response.success === "boolean") {
    const feedbackId2 = typeof response.feedbackId === "string" || typeof response.feedbackId === "number" ? String(response.feedbackId) : void 0;
    const errorCode = typeof response.errorCode === "number" ? response.errorCode : void 0;
    const error = typeof response.error === "string" ? response.error : void 0;
    return response.success ? { success: true, ...feedbackId2 ? { feedbackId: feedbackId2 } : {} } : { success: false, ...error ? { error } : {}, ...errorCode !== void 0 ? { errorCode } : {} };
  }
  const errorText = typeof response.msg === "string" && response.msg || typeof response.message === "string" && response.message || typeof response.error === "string" && response.error || void 0;
  if (typeof response.code !== "number") {
    return {
      success: false,
      error: errorText || "Invalid feedback response"
    };
  }
  if (response.code !== 0) {
    return {
      success: false,
      error: errorText || "Unknown error",
      errorCode: response.code
    };
  }
  const data = isRecord(response.data) ? response.data : void 0;
  const rawFeedbackId = data?.feedback_id ?? data?.feedbackId ?? data?.id;
  const feedbackId = typeof rawFeedbackId === "string" || typeof rawFeedbackId === "number" ? String(rawFeedbackId) : void 0;
  return { success: true, ...feedbackId ? { feedbackId } : {} };
}
function resolvePlatform(sdk) {
  const os = String(sdk.platform.os ?? "").toLowerCase();
  if (os.includes("mac") || os.includes("darwin")) {
    return "macos";
  }
  if (os.includes("win")) {
    return "windows";
  }
  if (os.includes("linux")) {
    return "linux";
  }
  if (sdk.platform.type === "web") {
    return "web";
  }
  return "unknown";
}
function resolveClientType(sdk, type) {
  if (type && type !== "feedback") {
    return type;
  }
  return sdk.platform.type === "desktop" ? "workbuddy" : "web";
}
function attachmentToBlob(attachment) {
  const buffer = Uint8Array.from(atob(attachment.base64), (char) => char.charCodeAt(0));
  return new Blob([buffer], { type: attachment.type });
}
function isAsyncThunk(value) {
  return typeof value === "function";
}
async function resolveUserId(sdk) {
  try {
    const account = sdk.account;
    if (!isRecord(account)) {
      return void 0;
    }
    if (isAsyncThunk(account.profile)) {
      const profileUnknown = await account.profile();
      if (isRecord(profileUnknown) && typeof profileUnknown.uid === "string") {
        return profileUnknown.uid;
      }
      return void 0;
    }
    return typeof account._cachedUid === "string" ? account._cachedUid : void 0;
  } catch {
    return void 0;
  }
}
function resolveMachineId(sdk) {
  const telemetry = sdk.telemetry;
  if (isRecord(telemetry) && typeof telemetry.machineId === "string" && telemetry.machineId) {
    return telemetry.machineId;
  }
  return sdk.telemetry.trace.traceId || `wb-${Date.now()}`;
}
function createFeedback(sdk) {
  return async (options) => {
    const { content, type, attachments, includeRecentLogs } = options;
    const images = (attachments ?? []).filter((a) => (a.type ?? "").startsWith("image/"));
    const logFile = (attachments ?? []).find((a) => !(a.type ?? "").startsWith("image/"));
    const clientType = resolveClientType(sdk, type);
    const platform = resolvePlatform(sdk);
    const machineId = resolveMachineId(sdk);
    const userId = await resolveUserId(sdk);
    if (sdk.platform.type === "desktop") {
      const response = deserializeResult(await withTimeout(
        sdk.invoke(FEEDBACK_RPC_CHANNEL, {
          content: String(content ?? ""),
          clientType,
          platform,
          clientVersion: sdk.platform.appVersion,
          machineId,
          userId,
          images,
          logFile,
          includeLog: !!includeRecentLogs,
          ...type ? { type } : {}
        }),
        FEEDBACK_SUBMIT_TIMEOUT_MS,
        "Feedback submit timeout"
      ));
      return normalizeFeedbackResult(response);
    }
    const http = sdk.http;
    const formData = new FormData();
    formData.append("content", String(content ?? ""));
    formData.append("client_type", clientType);
    formData.append("platform", platform);
    if (sdk.platform.appVersion) {
      formData.append("client_version", sdk.platform.appVersion);
    }
    if (machineId) {
      formData.append("machine_id", machineId);
    }
    if (userId) {
      formData.append("user_id", userId);
    }
    for (const image of images) {
      try {
        formData.append("images", attachmentToBlob(image), image.name);
      } catch {
        continue;
      }
    }
    if (logFile) {
      try {
        formData.append("log", attachmentToBlob(logFile), logFile.name);
      } catch {
      }
    }
    const headers = {};
    if (machineId) {
      headers["X-Machine-Id"] = machineId;
    }
    if (userId) {
      headers["X-User-Id"] = userId;
    }
    const feedbackPath = sdk.platform.type === "web" ? "/portal/feedback" : "/v2/feedback";
    const raw = await http.post(feedbackPath, formData, Object.keys(headers).length > 0 ? { headers } : void 0);
    return normalizeFeedbackResult(raw);
  };
}

const HAS_FORM_DATA = typeof FormData !== "undefined";
const HAS_BLOB = typeof Blob !== "undefined";
function isFormData(value) {
  return HAS_FORM_DATA && value instanceof FormData;
}
async function serializeFormData(formData) {
  const entries = [];
  for (const [name, value] of formData.entries()) {
    if (typeof value === "string") {
      entries.push({ kind: "text", name, value });
      continue;
    }
    if (HAS_BLOB && value instanceof Blob) {
      const buffer = await value.arrayBuffer();
      const filename = value.name ?? "blob";
      entries.push({
        kind: "blob",
        name,
        bufferBase64: arrayBufferToBase64(buffer),
        mime: value.type || "application/octet-stream",
        filename
      });
      continue;
    }
  }
  return { __wbFormData: true, entries };
}
function arrayBufferToBase64(buffer) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }
  const bytes = new Uint8Array(buffer);
  const CHUNK = 32768;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, Math.min(i + CHUNK, bytes.length));
    binary += String.fromCharCode.apply(null, slice);
  }
  return btoa(binary);
}

const MAX_FILENAME_BYTES = 200;
const AMBIGUOUS_CHARS_RE = /[\u0000-\u001f\u007f\\/?#%&+=<>|*:"'`\s]+/g;
function sanitizeObjectKeyFilename(filename) {
  const cleaned = (filename || "").replace(AMBIGUOUS_CHARS_RE, "_").replace(/_{2,}/g, "_").replace(/^[._]+/, "").replace(/[._]+$/, "");
  if (!cleaned) {
    return "file";
  }
  return truncateToBytes(cleaned, MAX_FILENAME_BYTES);
}
function generateUploadObjectKey(filename) {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  return `uploads/${timestamp}-${randomId}-${sanitizeObjectKeyFilename(filename)}`;
}
function truncateToBytes(value, maxBytes) {
  if (utf8Length(value) <= maxBytes) {
    return value;
  }
  const dotIndex = value.lastIndexOf(".");
  const ext = dotIndex > 0 && utf8Length(value.slice(dotIndex)) <= 16 ? value.slice(dotIndex) : "";
  const budget = maxBytes - utf8Length(ext);
  let result = "";
  let used = 0;
  for (const char of value.slice(0, dotIndex > 0 ? dotIndex : value.length)) {
    const size = utf8Length(char);
    if (used + size > budget) {
      break;
    }
    result += char;
    used += size;
  }
  return `${result || "file"}${ext}`;
}
function utf8Length(value) {
  let bytes = 0;
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (code < 128) {
      bytes += 1;
    } else if (code < 2048) {
      bytes += 2;
    } else if (code < 65536) {
      bytes += 3;
    } else {
      bytes += 4;
    }
  }
  return bytes;
}

let idCounter = 0;
function nextRequestId() {
  return `upload-${Date.now()}-${++idCounter}`;
}
function createHttpNamespace(deps = {}) {
  const ensureHttp = () => {
    const h = deps.http;
    if (!h) {
      throw new WBError(
        "wb.http requires RuntimeContext.http. Ensure SDK is constructed with http service or call wb.$provide('http', impl).",
        { code: "NOT_READY", source: "http" }
      );
    }
    return h;
  };
  return {
    async get(url, config) {
      return ensureHttp().get(url, config);
    },
    async post(url, data, config) {
      return ensureHttp().post(url, data, config);
    },
    async put(url, data, config) {
      return ensureHttp().put(url, data, config);
    },
    async patch(url, data, config) {
      return ensureHttp().patch(url, data, config);
    },
    async delete(url, config) {
      return ensureHttp().delete(url, config);
    },
    /**
     * 上传文件。内聚 requestId + 进度订阅（走进程级单例 bus）+ cleanup。
     *
     * 流程：
     * 1. 生成 requestId（确保并发上传进度事件精确路由）
     * 2. 若 onProgress → 在进程级 bus 上订阅 `http.upload.progress.${requestId}` channel
     * 3. 执行 upload：
     *    a. 有 deps.upload（bridge 模式）→ 带 requestId invoke 到对面执行
     *    b. 否则直连（Web 无 bridge）→ uploadCore 本地走 axios
     * 4. finally: 取消订阅
     *
     * 进度在执行端通过 bus.emit 推送，bridge 的 IPC/同进程 bus 自动传递回来。
     * bus 是进程级单例（getBus()），装配层必须把 renderer / main 的 bus 打通（IPC 桥接）
     * 才能收到，否则事件发了但收不到。
     */
    async upload(options) {
      const requestId = nextRequestId();
      let unsubscribe;
      if (options.onProgress) {
        unsubscribe = getBus().on(`http.upload.progress.${requestId}`, (data) => {
          options.onProgress({ loaded: data.loaded, total: data.total, percent: data.percent });
        });
      }
      try {
        if (deps.upload) {
          const { onProgress: _drop, ...serializableOpts } = options;
          return await deps.upload({ ...serializableOpts, requestId });
        }
        const content = options.content ?? decodeContentBase64(options.contentBase64);
        if (!content) {
          throw new WBError(
            "wb.http.upload: content is required on this platform. Use filePath only on Desktop/Node.",
            { code: "INVALID_ARGUMENT", source: "http.upload" }
          );
        }
        return await uploadCore(ensureHttp(), { ...options, content });
      } finally {
        unsubscribe?.();
      }
    },
    async download(options) {
      if (deps.download) {
        return deps.download(options);
      }
      const doc = globalThis.document;
      if (!doc || typeof doc.createElement !== "function") {
        throw new WBError(
          "wb.http.download not available on this platform. Inject via $provide('http', { download }).",
          { code: "NOT_READY", source: "http.download" }
        );
      }
      const a = doc.createElement("a");
      a.href = options.url;
      if (options.filename) {
        a.download = options.filename;
      }
      a.rel = "noopener";
      a.style.display = "none";
      doc.body?.appendChild(a);
      a.click();
      doc.body?.removeChild(a);
    }
  };
}
function createHttpBridgeDeps(invoke) {
  const prepareBody = async (data) => {
    if (isFormData(data)) {
      return serializeFormData(data);
    }
    return data;
  };
  const invokeHttp = async (channel, ...args) => deserializeResult(await invoke(channel, void 0, ...args));
  const httpProxy = {
    get: (url, config) => invokeHttp("wb:http:get", url, config),
    post: async (url, data, config) => invokeHttp("wb:http:post", url, await prepareBody(data), config),
    put: async (url, data, config) => invokeHttp("wb:http:put", url, await prepareBody(data), config),
    patch: async (url, data, config) => invokeHttp("wb:http:patch", url, await prepareBody(data), config),
    delete: (url, config) => invokeHttp("wb:http:delete", url, config)
  };
  const upload = async (options) => {
    const { content, ...rest } = options;
    if (!content) {
      return await invokeHttp("wb:http:upload", options);
    }
    const buffer = await toArrayBuffer(content);
    return await invokeHttp("wb:http:upload", {
      ...rest,
      contentBase64: arrayBufferToBase64(buffer)
    });
  };
  const download = (options) => invokeHttp("wb:http:download", options);
  return { http: httpProxy, upload, download };
}
async function toArrayBuffer(content) {
  if (content instanceof ArrayBuffer) {
    return content;
  }
  if (content instanceof Blob) {
    return content.arrayBuffer();
  }
  if (typeof content === "string") {
    return new TextEncoder().encode(content).buffer;
  }
  throw new Error("[http.upload] unsupported content type");
}
async function uploadCore(http, options) {
  const blob = options.content instanceof Blob ? options.content : new Blob([options.content], { type: options.mimeType });
  const filename = options.filename ?? "upload";
  const mimeType = options.mimeType ?? blob.type ?? "application/octet-stream";
  const objectKey = generateUploadObjectKey(filename);
  const presignedResp = await http.post("/console/as/support/presigned_url", {
    object_keys: [objectKey]
  });
  const items = presignedResp?.data?.items ?? presignedResp?.items;
  if (!items || items.length === 0) {
    throw new WBError(
      "wb.http.upload: failed to get presigned URL from server.",
      { code: "NETWORK", source: "http.upload" }
    );
  }
  const presignedItem = items[0];
  const uploadResponse = await fetch(presignedItem.upload_url, {
    method: "PUT",
    body: blob,
    headers: { "Content-Type": mimeType }
  });
  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text().catch(() => uploadResponse.statusText);
    throw new WBError(
      `wb.http.upload: COS PUT failed: ${uploadResponse.status} ${errorText}`,
      { code: "NETWORK", source: "http.upload" }
    );
  }
  return { url: presignedItem.download_url, size: blob.size, mimeType };
}
function decodeContentBase64(contentBase64) {
  if (!contentBase64) {
    return void 0;
  }
  const binary = atob(contentBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

let cachedTraceId = null;
function genHex(len) {
  const c = typeof globalThis !== "undefined" && globalThis.crypto ? globalThis.crypto : void 0;
  if (c?.getRandomValues) {
    const bytes = new Uint8Array(Math.ceil(len / 2));
    c.getRandomValues(bytes);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, "0");
    }
    return hex.slice(0, len);
  }
  let out = "";
  for (let i = 0; i < len; i++) {
    out += Math.floor(Math.random() * 16).toString(16);
  }
  return out;
}
function getCurrentTraceId() {
  if (!cachedTraceId) {
    cachedTraceId = genHex(32);
  }
  return cachedTraceId;
}
function now() {
  return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
}
function createTrace(getSink) {
  const noopSink = () => {
  };
  const startSpan = (name, attributes) => {
    const spanId = genHex(16);
    const traceId = getCurrentTraceId();
    const startedAt = now();
    const attrs = { ...attributes ?? {} };
    let status = "ok";
    let statusMessage;
    let exception;
    let ended = false;
    return {
      spanId,
      traceId,
      setAttribute(key, value) {
        attrs[key] = value;
      },
      setStatus(s, m) {
        status = s;
        statusMessage = m;
      },
      recordException(e) {
        exception = { name: e.name, message: e.message, stack: e.stack };
      },
      end() {
        if (ended) {
          return;
        }
        ended = true;
        const endedAt = now();
        const event = {
          name,
          traceId,
          spanId,
          startedAt,
          endedAt,
          durationMs: endedAt - startedAt,
          attributes: attrs,
          status,
          statusMessage,
          exception
        };
        try {
          (getSink() ?? noopSink)(event);
        } catch (e) {
          console.warn("[wb.telemetry.trace] sink threw", e);
        }
      }
    };
  };
  return {
    get traceId() {
      return getCurrentTraceId();
    },
    startSpan,
    async withSpan(name, fn) {
      const span = startSpan(name);
      try {
        const r = await fn(span);
        span.setStatus("ok");
        return r;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        span.recordException(err);
        span.setStatus("error", err.message);
        throw e;
      } finally {
        span.end();
      }
    }
  };
}
const LEVEL_ORDER = ["debug", "info", "warn", "error"];
function createLogger(getSink) {
  let level = "info";
  const noopSink = () => {
  };
  const ge = (l) => LEVEL_ORDER.indexOf(l) >= LEVEL_ORDER.indexOf(level);
  const localOut = (l, msg, data) => {
    const tag = `[wb][${l}]`;
    const fn = l === "debug" ? console.debug : console[l] ?? console.log;
    if (data === void 0) {
      fn(tag, msg);
    } else {
      fn(tag, msg, data);
    }
  };
  const log = (l, message, data) => {
    if (!ge(l)) {
      return;
    }
    localOut(l, message, data);
    const event = {
      level: l,
      message,
      data,
      traceId: getCurrentTraceId(),
      timestamp: Date.now()
    };
    try {
      (getSink() ?? noopSink)(event);
    } catch (e) {
      console.warn("[wb.telemetry.logger] sink threw", e);
    }
  };
  return {
    get level() {
      return level;
    },
    setLevel(l) {
      level = l;
    },
    debug: (m, d) => log("debug", m, d),
    info: (m, d) => log("info", m, d),
    warn: (m, d) => log("warn", m, d),
    error: (m, d) => log("error", m, d)
  };
}
function createTelemetryNamespace() {
  let current = {};
  const trace = createTrace(() => current.traceSink);
  const logger = createLogger(() => current.logSink);
  return {
    trace,
    logger,
    $inject(impl) {
      current = { ...impl };
    }
  };
}

var ChildAgentEvent = /* @__PURE__ */ ((ChildAgentEvent2) => {
  ChildAgentEvent2["RequestUpdate"] = "requestUpdate";
  ChildAgentEvent2["RequestsChanged"] = "requestsChanged";
  ChildAgentEvent2["StateChanged"] = "stateChanged";
  return ChildAgentEvent2;
})(ChildAgentEvent || {});

const REQUEST_HISTORY_PAGE_BYTE_LENGTH = 5 * 1024 * 1024;
const CONVERSATION_DELETE_CANCELLED = "CONVERSATION_DELETE_CANCELLED";
function isConversationDeleteCancelled(result) {
  return Boolean(result) && result.errorCode === CONVERSATION_DELETE_CANCELLED;
}
function isPoiPickPending(pending) {
  return !!pending && (pending.category === "poi_pick" || pending.inputType === "poi_pick");
}

function emptyConversationList(filter) {
  return {
    items: [],
    total: 0,
    page: { current: filter?.page ?? 1, size: filter?.size ?? 0 }
  };
}

function createRehydratedClientToolRuntime(conversationId, conversation, eventBus, bridge) {
  const providers = /* @__PURE__ */ new Map();
  const toWireProviderId = (providerId) => `${bridge.bindingId}:${providerId}`;
  const unsubscribe = eventBus.on(
    WB_CONVERSATION_CLIENT_TOOL_INVOKE,
    (payload) => {
      if (payload.conversationId !== conversationId) {
        return;
      }
      const tool = providers.get(payload.providerId)?.get(payload.toolId);
      const execution = tool ? Promise.resolve().then(() => tool.execute(payload.input, {
        conversationId,
        toolCallId: payload.toolCallId,
        timeout: payload.timeout
      })) : Promise.resolve(notFoundResult(payload.providerId, payload.toolId));
      execution.catch((error) => executionErrorResult(error)).then((result) => bridge.completeClientTool({ requestId: payload.requestId, result })).catch(() => {
      });
    }
  );
  return {
    async register(providerId, tools) {
      if (!providerId.trim() || tools.length === 0) {
        throw new Error("[wb.conversations] providerId and at least one client tool are required");
      }
      const wireProviderId = toWireProviderId(providerId);
      if (providers.has(wireProviderId)) {
        throw new Error(`[wb.conversations] client tools already registered: ${providerId}`);
      }
      const definitions = tools.map(toDefinition);
      await conversation.registerClientTools(conversationId, wireProviderId, definitions);
      providers.set(wireProviderId, new Map(tools.map((tool) => [tool.id, tool])));
    },
    async unregister(providerId, toolIds) {
      const wireProviderId = toWireProviderId(providerId);
      await conversation.unregisterClientTools(conversationId, wireProviderId, toolIds);
      const registered = providers.get(wireProviderId);
      if (!registered || !toolIds?.length) {
        providers.delete(wireProviderId);
        return;
      }
      for (const toolId of toolIds) {
        registered.delete(toolId);
      }
      if (registered.size === 0) {
        providers.delete(wireProviderId);
      }
    },
    dispose() {
      unsubscribe();
      providers.clear();
    }
  };
}
function toDefinition({ execute: _execute, ...definition }) {
  return definition;
}
function notFoundResult(providerId, toolId) {
  return {
    status: "error",
    error: { message: `Client tool is unavailable: ${providerId}/${toolId}`, code: "CLIENT_TOOL_NOT_FOUND" }
  };
}
function executionErrorResult(error) {
  return {
    status: "error",
    error: {
      message: error instanceof Error ? error.message : String(error),
      code: "CLIENT_TOOL_EXECUTION_FAILED"
    }
  };
}

function rehydrateChildAgents(parentConversationId, bridge, eventBus) {
  const subAgents = /* @__PURE__ */ new Map();
  const teams = /* @__PURE__ */ new Map();
  const liveIdentities = /* @__PURE__ */ new Set();
  const projectionHandlers = /* @__PURE__ */ new Set();
  const identity = (snapshot) => snapshot.projectionId ?? (snapshot.kind === "team" ? `${snapshot.teamName ?? ""}\0${snapshot.memberid ?? ""}\0${snapshot.taskId ?? ""}` : snapshot.conversationid);
  const scopedIdentity = (snapshot) => `${snapshot.kind}:${identity(snapshot)}`;
  const upsert = (snapshot) => {
    const cache = snapshot.kind === "team" ? teams : subAgents;
    const key = identity(snapshot);
    const existing = cache.get(key);
    if (existing) {
      existing.snapshot = snapshot;
      return existing;
    }
    const view = { snapshot, handlers: /* @__PURE__ */ new Map() };
    const object = {
      get projectionId() {
        return view.snapshot.projectionId;
      },
      get conversationid() {
        return view.snapshot.conversationid;
      },
      get parentRequestId() {
        return view.snapshot.parentRequestId;
      },
      get memberid() {
        return view.snapshot.memberid;
      },
      get teamName() {
        return view.snapshot.teamName;
      },
      get taskId() {
        return view.snapshot.taskId;
      },
      get teamTrulyIdle() {
        return view.snapshot.teamTrulyIdle;
      },
      get requests() {
        return view.snapshot.requests;
      },
      history: {
        get hasOlder() {
          return Boolean(view.snapshot.hasOlder);
        },
        requests: async (query) => {
          if (!view.snapshot.projectionId || typeof bridge.childAgentRequests !== "function") {
            return {
              total: view.snapshot.requests.length,
              page: 1,
              items: view.snapshot.requests,
              hasOlder: false
            };
          }
          const page = await bridge.childAgentRequests(
            parentConversationId,
            view.snapshot.projectionId,
            query
          );
          view.snapshot = {
            ...view.snapshot,
            requests: page.items,
            hasOlder: page.hasOlder
          };
          return page;
        },
        loadToolDetail: (toolCallId) => view.snapshot.projectionId && typeof bridge.childAgentLoadToolDetail === "function" ? bridge.childAgentLoadToolDetail(
          parentConversationId,
          view.snapshot.projectionId,
          toolCallId
        ) : Promise.resolve(void 0)
      },
      get state() {
        return view.snapshot.state;
      },
      on(event, callback) {
        const handlers = view.handlers.get(event) ?? /* @__PURE__ */ new Set();
        handlers.add(callback);
        view.handlers.set(event, handlers);
        if (event === ChildAgentEvent.RequestsChanged) {
          callback(view.snapshot.requests);
        }
        return () => handlers.delete(callback);
      }
    };
    view.object = object;
    cache.set(key, view);
    return view;
  };
  const emit = (view, event, ...args) => {
    for (const handler of view.handlers.get(event) ?? []) {
      try {
        handler(...args);
      } catch {
      }
    }
  };
  const emitProjectionEvent = (event) => {
    for (const handler of projectionHandlers) {
      try {
        handler(event);
      } catch {
      }
    }
  };
  const applyEvent = (event) => {
    if (event.type === "removed") {
      const target = event.snapshot.kind === "team" ? teams : subAgents;
      target.delete(identity(event.snapshot));
      for (const handler of projectionHandlers) {
        try {
          handler(event);
        } catch {
        }
      }
      return;
    }
    const view = upsert(event.snapshot);
    switch (event.type) {
      case "requestUpdate":
        emit(view, ChildAgentEvent.RequestUpdate, event.requestId, event.messageId, event.chunk);
        emit(view, ChildAgentEvent.RequestsChanged, event.snapshot.requests);
        break;
      case "requestsChanged":
        emit(view, ChildAgentEvent.RequestsChanged, event.snapshot.requests);
        break;
      case "stateChanged":
        emit(view, ChildAgentEvent.StateChanged, event.snapshot.state);
        break;
    }
    emitProjectionEvent(event);
  };
  const applyBatch = (payload) => {
    for (const projection of payload.projections) {
      liveIdentities.add(scopedIdentity(projection.snapshot));
      const view = upsert(projection.snapshot);
      projection.requestUpdates.forEach((update, index) => {
        emit(view, ChildAgentEvent.RequestUpdate, update.requestId, update.messageId, update.chunk);
        emitProjectionEvent({
          type: "requestUpdate",
          snapshot: projection.snapshot,
          ...update,
          transportBatchFinal: !projection.requestsChanged && index === projection.requestUpdates.length - 1
        });
      });
      if (projection.requestsChanged) {
        emit(view, ChildAgentEvent.RequestsChanged, projection.snapshot.requests);
        emitProjectionEvent({
          type: "requestsChanged",
          snapshot: projection.snapshot,
          transportBatchFinal: true
        });
      }
    }
  };
  const unsubscribe = eventBus.on(
    WB_CONVERSATION_CHILD_AGENT_EVENT,
    (payload) => {
      if (payload.conversationId === parentConversationId) {
        liveIdentities.add(scopedIdentity(payload.event.snapshot));
        applyEvent(payload.event);
      }
    }
  );
  const unsubscribeBatch = eventBus.on(
    WB_CONVERSATION_CHILD_AGENT_EVENT_BATCH,
    (payload) => {
      if (payload.conversationId === parentConversationId) {
        applyBatch(payload);
      }
    }
  );
  if (typeof bridge.childAgentSnapshots === "function") {
    bridge.childAgentSnapshots(parentConversationId).then((snapshots) => {
      for (const snapshot of snapshots) {
        if (!liveIdentities.has(scopedIdentity(snapshot))) {
          applyEvent({ type: "listChanged", snapshot });
        }
      }
    }).catch(() => {
    });
  }
  return {
    getSubAgents: () => [...subAgents.values()].map((view) => view.object),
    getAgentTeams: () => [...teams.values()].map((view) => view.object),
    // 归属由 daemon 侧投影写入快照，renderer 只按 parentRequestId 过滤，不重复推断。
    getAgentTeamsByRequest: (parentRequestId) => parentRequestId ? [...teams.values()].filter((view) => view.snapshot.parentRequestId === parentRequestId).map((view) => view.object) : [],
    onEvent: (callback) => {
      projectionHandlers.add(callback);
      return () => projectionHandlers.delete(callback);
    },
    dispose: () => {
      projectionHandlers.clear();
      unsubscribe();
      unsubscribeBatch();
    }
  };
}

function onConvEvent(eventBus, eventName, conversationId, handler) {
  return eventBus.on(eventName, (payload) => {
    if (payload.conversationId === conversationId) {
      handler(payload);
    }
  });
}
function isInstanceTableEvent(event) {
  return event in INSTANCE_EVENT_BINDS;
}
function subscribeInstanceTableEvent(eventBus, conversationId, event, callback) {
  const entry = INSTANCE_EVENT_BINDS[event];
  const cb = callback;
  return onConvEvent(
    eventBus,
    entry.bind.busEvent,
    conversationId,
    (payload) => {
      const map = entry.map;
      cb(...map(payload));
    }
  );
}

function rehydrateConfigManager(conversation, conversationId, eventBus, src) {
  let modeValue = src?.mode ?? "";
  let modelValue = src?.model ?? "";
  let connectorsValue = src?.connectors ?? [];
  let expertValue = src?.expert ? { ...src.expert } : src?.expertId ? { id: src.expertId } : void 0;
  let permissionModeValue = src?.permissionMode ?? "";
  let useSandboxCLIValue = src?.useSandboxCLI;
  let thoughtLevelValue = src?.thoughtLevel;
  let contextWindowValue = src?.contextWindow;
  const unsubs = [];
  const syncConnectors = (connectors) => {
    if (connectors) {
      connectorsValue = [...connectors];
    }
  };
  unsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_MODEL_CHANGE,
    conversationId,
    (p) => {
      if (p.currentModel !== void 0) {
        modelValue = p.currentModel;
      }
    }
  ));
  unsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_MODE_CHANGE,
    conversationId,
    // Issue #120116: 只在 slug 非空时覆盖 permissionMode。
    // daemon 侧 event-machine 对缺失 slug 归一化为空串（不是 undefined），
    // 原 `!== undefined` 守卫挡不住空串覆盖，会把 rehydrate 层缓存的 fullAccess
    // 抹成空串 → UI 映射为「默认权限」。参考 agent-ui 侧 conversation-event-binding
    // 已有的 `if (payload.slug)` 空串守卫，两侧对齐。
    (p) => {
      if (p.slug) {
        permissionModeValue = p.slug;
      }
    }
  ));
  unsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_CONFIG_UPDATE,
    conversationId,
    (payload) => {
      const connectors = payload.options?.find((option) => option.key === "connectors")?.value;
      if (Array.isArray(connectors)) {
        connectorsValue = connectors;
      }
    }
  ));
  const manager = {
    get mode() {
      return modeValue;
    },
    get model() {
      return modelValue;
    },
    get connectors() {
      return connectorsValue;
    },
    get expertId() {
      return expertValue?.id ?? "";
    },
    get expert() {
      return expertValue ? { ...expertValue } : void 0;
    },
    get permissionMode() {
      return permissionModeValue;
    },
    get useSandboxCLI() {
      return useSandboxCLIValue;
    },
    get thoughtLevel() {
      return thoughtLevelValue;
    },
    get contextWindow() {
      return contextWindowValue;
    },
    async setMode(mode) {
      const result = await conversation.configSetMode(conversationId, mode);
      if (!result || !("errorCode" in result)) {
        modeValue = mode;
      }
      return result;
    },
    async setModel(model) {
      const result = await conversation.configSetModel(conversationId, model);
      if (!result || !("errorCode" in result)) {
        modelValue = model;
      }
      return result;
    },
    async setConnectors(connectors) {
      const result = await conversation.configSetConnectors(conversationId, connectors);
      if (!result || !("errorCode" in result)) {
        connectorsValue = connectors;
      }
      return result;
    },
    async setExpert(expert) {
      const result = await conversation.configSetExpert(conversationId, expert);
      if (!result || !("errorCode" in result)) {
        expertValue = expert ? { ...expert } : void 0;
        if (expert) {
          modeValue = "craft";
        }
      }
      return result;
    },
    setExpertId: (id, options) => manager.setExpert(id ? { id, ...options } : null),
    setPermissionMode: async (permissionMode) => {
      const result = await conversation.configSetPermissionMode(conversationId, permissionMode);
      if (!result || !("errorCode" in result)) {
        permissionModeValue = permissionMode;
      }
      return result;
    },
    setSandboxMode: async (enabled) => {
      const result = await conversation.configSetSandboxMode(conversationId, enabled);
      if (!result || !("errorCode" in result)) {
        useSandboxCLIValue = enabled;
      }
      return result;
    },
    async setThoughtLevel(value) {
      const result = await conversation.configSetThoughtLevel(conversationId, value);
      if (!result || !("errorCode" in result)) {
        thoughtLevelValue = value || void 0;
      }
      return result;
    },
    // Max Mode · Issue #90955：纯运行时 override，ACP value 为字符串 `'0'` / `''`，直接透传 IPC。
    setPreMessageCompactPct: (value) => conversation.configSetPreMessageCompactPct(conversationId, value),
    async setContextWindow(value) {
      const result = await conversation.configSetContextWindow(conversationId, value);
      if (!result || !("errorCode" in result)) {
        contextWindowValue = value || void 0;
      }
      return result;
    }
  };
  return { manager, syncConnectors, unsubs };
}
function sameQueueItems(left, right) {
  return left.length === right.length && left.every((item, index) => item.id === right[index]?.id);
}
function rehydrateQueueManager(conversation, conversationId, initialItems) {
  let cache = [...initialItems];
  let mutationVersion = 0;
  let refreshSequence = 0;
  const refresh = async () => {
    const version = mutationVersion;
    const sequence = ++refreshSequence;
    const items = await conversation.queueItems(conversationId);
    if (version === mutationVersion && sequence === refreshSequence) {
      const changed = !sameQueueItems(cache, items);
      cache = items;
      return changed;
    }
    return false;
  };
  const ready = refresh().then(() => void 0);
  ready.catch(() => void 0);
  const mutate = async (operation, commit) => {
    mutationVersion += 1;
    try {
      const result = await operation();
      commit(result);
      return result;
    } finally {
      mutationVersion += 1;
    }
  };
  return {
    ready,
    refresh,
    accept(item) {
      mutationVersion += 1;
      const index = cache.findIndex((candidate) => candidate.id === item.id);
      if (index >= 0) {
        const changed = cache[index] !== item;
        cache = [
          ...cache.slice(0, index),
          item,
          ...cache.slice(index + 1)
        ];
        return changed;
      }
      cache = [...cache, item];
      return true;
    },
    manager: {
      items: () => [...cache],
      pause: (reason) => mutate(
        () => conversation.queuePause(conversationId, reason),
        () => void 0
      ),
      resume: () => mutate(
        () => conversation.queueResume(conversationId),
        () => void 0
      ),
      delete: (itemId) => mutate(
        () => conversation.queueDelete(conversationId, itemId),
        () => {
          cache = cache.filter((item) => item.id !== itemId);
        }
      ),
      move: (itemId, index) => mutate(
        () => conversation.queueMove(conversationId, itemId, index),
        () => {
          const from = cache.findIndex((item2) => item2.id === itemId);
          if (from < 0) {
            return;
          }
          const target = Math.max(0, Math.min(index, cache.length - 1));
          const [item] = cache.splice(from, 1);
          cache.splice(target, 0, item);
        }
      ),
      sendNow: async (itemId) => {
        const fallbackIndex = cache.findIndex((item) => item.id === itemId);
        const fallbackItem = fallbackIndex >= 0 ? cache[fallbackIndex] : void 0;
        const disposition = await mutate(
          () => conversation.queueSendNow(conversationId, itemId),
          (result) => {
            if (result !== "queued") {
              cache = cache.filter((item) => item.id !== itemId);
              return;
            }
            if (fallbackItem && !cache.some((item) => item.id === itemId)) {
              const target = Math.max(0, Math.min(fallbackIndex, cache.length));
              cache = [
                ...cache.slice(0, target),
                fallbackItem,
                ...cache.slice(target)
              ];
            }
          }
        );
        if (disposition === "queued") {
          await refresh().catch(() => void 0);
        }
        return disposition;
      }
    }
  };
}
function rehydrateFileManager(conversation, conversationId, readArtifact) {
  return {
    artifacts: (page) => conversation.fileArtifacts(conversationId, page),
    readArtifact,
    files: () => conversation.fileFiles(conversationId),
    changes: () => conversation.fileChanges(conversationId)
  };
}

function bindRemoteMethods(id, conversation, binds) {
  const remote = conversation;
  const out = {};
  for (const bind of binds) {
    const call = (...args) => remote[bind.key](id, ...args);
    if (bind.mode === "async") {
      out[bind.key] = call;
    } else {
      out[bind.key] = (...args) => {
        call(...args).catch((err) => {
          if (bind.onReject === "warn") {
            console.warn(`[wb.conversations] ${bind.key} failed`, err);
          }
        });
      };
    }
  }
  return out;
}

function isUserMessageChunk(chunk) {
  if (!chunk || typeof chunk !== "object") {
    return false;
  }
  const root = chunk;
  const update = root.update && typeof root.update === "object" ? root.update : root;
  return update.sessionUpdate === "user_message_chunk";
}
function rehydrateConversation(source, deps) {
  const {
    conversation,
    eventBus,
    initialPendingInfo,
    pendingInfoInitialized = false,
    readArtifact,
    clientToolBridge
  } = deps;
  const id = source.info.id;
  const clientToolRuntime = clientToolBridge ? createRehydratedClientToolRuntime(id, conversation, eventBus, clientToolBridge) : void 0;
  const childAgents = rehydrateChildAgents(id, conversation, eventBus);
  let stateValue = source.info.state;
  let titleValue = source.info.title;
  let spaceValue = { ...source.info.space };
  const infoView = { ...source.info };
  Object.defineProperty(infoView, "state", { get: () => stateValue, enumerable: true, configurable: true });
  Object.defineProperty(infoView, "title", { get: () => titleValue || id, enumerable: true, configurable: true });
  Object.defineProperty(infoView, "space", { get: () => spaceValue, enumerable: true, configurable: true });
  const syncInfo = (next) => {
    const { state, title, space, ...stableFields } = next;
    Object.assign(infoView, stableFields);
    stateValue = state;
    titleValue = title;
    spaceValue = { ...space };
  };
  let pendingInfoCache = initialPendingInfo;
  let pendingInfoVersion = 0;
  const refreshPendingInfo = () => {
    const version = pendingInfoVersion;
    conversation.getPendingInfo(id).then((pending) => {
      if (version !== pendingInfoVersion) {
        return;
      }
      if (!pending && isPoiPickPending(pendingInfoCache)) {
        return;
      }
      pendingInfoCache = pending;
    }).catch(() => {
    });
  };
  const internalUnsubs = [];
  const cachePermission = (permission) => {
    pendingInfoVersion += 1;
    pendingInfoCache = permission;
  };
  internalUnsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_PERMISSION,
    id,
    (p) => {
      cachePermission(p.permission);
    }
  ));
  internalUnsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_POI_PICK,
    id,
    (p) => {
      cachePermission(p.permission);
    }
  ));
  internalUnsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_STATE_CHANGE,
    id,
    (p) => {
      stateValue = p.to;
      pendingInfoVersion += 1;
      if (p.to === "pending") {
        refreshPendingInfo();
      } else if (!isPoiPickPending(pendingInfoCache)) {
        pendingInfoCache = void 0;
      }
    }
  ));
  internalUnsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_INFO_CHANGE,
    id,
    (p) => syncInfo(p.info)
  ));
  let requestsSnapshot;
  let requestsSnapshotVersion = 0;
  const requestsById = /* @__PURE__ */ new Map();
  const truncatedRequestIds = /* @__PURE__ */ new Set();
  const attachLocalRequestMethods = (request) => ({
    ...request,
    getArtifacts: () => [],
    like: () => void 0,
    dislike: () => void 0,
    share: () => void 0
  });
  const cacheRequests = (requests, replace = false) => {
    const hydrated = [];
    if (replace) {
      requestsById.clear();
    }
    for (const request of requests) {
      if (truncatedRequestIds.has(request.id)) {
        continue;
      }
      const local = attachLocalRequestMethods(request);
      requestsById.set(local.id, local);
      hydrated.push(local);
    }
    return hydrated;
  };
  const truncateCachedRequests = (requestIds) => {
    for (const requestId of requestIds) {
      truncatedRequestIds.add(requestId);
      requestsById.delete(requestId);
    }
    if (requestsSnapshot) {
      requestsSnapshot = requestsSnapshot.filter((request) => !truncatedRequestIds.has(request.id));
    }
  };
  const requestsChangedHandlers = /* @__PURE__ */ new Set();
  let requestsRefreshInFlight;
  let requestsRefreshDirty = false;
  const refreshRequestsAndNotify = () => {
    requestsRefreshDirty = true;
    requestsSnapshotVersion += 1;
    if (requestsRefreshInFlight) {
      return;
    }
    requestsRefreshInFlight = (async () => {
      do {
        requestsRefreshDirty = false;
        const version = requestsSnapshotVersion;
        const snapshot = await conversation.requests(id, {
          byteLength: REQUEST_HISTORY_PAGE_BYTE_LENGTH
        });
        if (requestsSnapshotVersion !== version) {
          continue;
        }
        const activeRequests = cacheRequests(
          snapshot.items.filter((request) => !truncatedRequestIds.has(request.id)),
          true
        );
        requestsSnapshot = activeRequests;
        for (const handler of requestsChangedHandlers) {
          try {
            handler(activeRequests);
          } catch {
          }
        }
      } while (requestsRefreshDirty);
    })().catch((error) => {
      console.warn("[wb.conversations] requests snapshot load failed", error);
    }).finally(() => {
      requestsRefreshInFlight = void 0;
      if (requestsRefreshDirty) {
        refreshRequestsAndNotify();
      }
    });
  };
  internalUnsubs.push(onConvEvent(
    eventBus,
    WB_CONVERSATION_REQUESTS_CHANGED,
    id,
    () => {
      refreshRequestsAndNotify();
    }
  ));
  if (!pendingInfoInitialized) {
    refreshPendingInfo();
  }
  let initialQueueItems = [];
  try {
    if ("queueManager" in source && typeof source.queueManager?.items === "function") {
      initialQueueItems = source.queueManager.items();
    }
  } catch {
  }
  const queueProjection = rehydrateQueueManager(conversation, id, initialQueueItems);
  const configProjection = rehydrateConfigManager(conversation, id, eventBus, source.configManager);
  internalUnsubs.push(...configProjection.unsubs);
  const getRequest = (requestId) => {
    if (!requestId) {
      return void 0;
    }
    const request = requestsById.get(requestId);
    if (!request) {
      return void 0;
    }
    return {
      ...request,
      // 每次调用从 child projection 读取，成员状态/乱序回填无需重建 Request 视图。
      getAgentTeams: () => childAgents.getAgentTeamsByRequest(requestId),
      getArtifacts: () => []
    };
  };
  const tableMethods = bindRemoteMethods(
    id,
    conversation,
    METHOD_BINDS.filter((bind) => !REHYDRATE_MANUAL_KEYS.includes(bind.key))
  );
  const invalidateQueueProjection = (projectionUpdated = false) => {
    eventBus.emit(WB_CONVERSATION_QUEUE_UPDATE, { conversationId: id, projectionUpdated });
  };
  const isQueuedReceipt = (value) => typeof value === "object" && value !== null && value.disposition === "queued" && typeof value.item?.id === "string";
  const conv = {
    ...tableMethods,
    sendPrompt: async (...args) => {
      const result = await tableMethods.sendPrompt(...args);
      if (isQueuedReceipt(result)) {
        queueProjection.accept(result.item);
        invalidateQueueProjection(true);
        return;
      }
      invalidateQueueProjection();
      return result;
    },
    info: infoView,
    configManager: configProjection.manager,
    queueManager: queueProjection.manager,
    fileManager: rehydrateFileManager(
      conversation,
      id,
      readArtifact ? (uri, format) => readArtifact(id, uri, format) : void 0
    ),
    // 手写覆盖：requests 附带 cacheRequests 副作用（供 getRequest 读缓存）。
    requests: async (...args) => {
      const page = await conversation.requests(id, ...args);
      return { ...page, items: cacheRequests(page.items) };
    },
    // entries 只引用 requestId + role；同步缓存本页 Request，保证 getRequest() 仍可读取富对象。
    requestEntries: async (query) => {
      const page = await conversation.requestEntries(id, query);
      return { ...page, requests: cacheRequests(page.requests) };
    },
    resend: async (requestId, prompt, options) => {
      const result = await conversation.resend(id, requestId, prompt, options);
      if (result && "branchChanged" in result && result.branchChanged === true) {
        truncateCachedRequests([
          result.truncatedFromRequestId,
          ...result.removedRequestIds
        ]);
      }
      return result;
    },
    getRequest,
    // 跨 IPC 触发 daemon pool.acquire + preload（启动 session/load + 事件转发），
    // 使 UI 只 get(id) 订阅 RequestsChanged 即可收到有界拉取的快照，无需再跨 IPC 推全量 Request[]。
    // fire-and-forget，catch 避免 IPC reject 形成 unhandled rejection。
    preload: () => {
      conversation.preload(id).catch(() => {
      });
    },
    registerClientTools: (providerId, tools) => {
      if (!clientToolRuntime) {
        return Promise.reject(new Error("[wb.conversations] client tools are unavailable in this runtime"));
      }
      return clientToolRuntime.register(providerId, tools);
    },
    unregisterClientTools: (providerId, toolIds) => {
      if (!clientToolRuntime) {
        return Promise.reject(new Error("[wb.conversations] client tools are unavailable in this runtime"));
      }
      return clientToolRuntime.unregister(providerId, toolIds);
    },
    // 手写覆盖：同步读取最近一次 daemon pull / permission 事件收敛后的快照（不委托 conversation）。
    getPendingInfo: () => pendingInfoCache,
    // 不进 METHOD_BINDS：Desktop 注入 session:answerPoiQuestion，直接解 registry。
    ...deps.answerPoiQuestion ? {
      answerPoiQuestion: async (requestId, result) => {
        const ok = await deps.answerPoiQuestion(id, requestId, result);
        if (ok && isPoiPickPending(pendingInfoCache) && pendingInfoCache.id === requestId) {
          pendingInfoVersion += 1;
          pendingInfoCache = void 0;
        }
        return ok;
      }
    } : {},
    // 专用 RPC 精确解 registry；投影清理由 daemon settle 事件驱动，重入时亦可 pull 对账。
    ...deps.answerCloudServiceConfirmation ? {
      answerCloudServiceConfirmation: async (requestId, result) => deps.answerCloudServiceConfirmation(id, requestId, result)
    } : {},
    getSubAgents: childAgents.getSubAgents,
    getAgentTeams: childAgents.getAgentTeams,
    onChildAgentEvent: childAgents.onEvent,
    syncSourceInfo: syncInfo,
    syncSourceConnectors: configProjection.syncConnectors,
    disposeInternal: () => {
      for (const unsubscribe of internalUnsubs) {
        unsubscribe();
      }
      clientToolRuntime?.dispose();
      childAgents.dispose();
      deps.onDelete?.(id);
    },
    // 诊断日志：委托 conversation.log（跨 IPC 到 daemon 落盘）。fire-and-forget，catch 避免
    // IPC reject 形成 unhandled rejection（同 resolve 的处理）。
    log: (tag, data) => {
      conversation.log(id, tag, data).catch(() => {
      });
    },
    // 统一事件订阅入口：普通事件走 INSTANCE_EVENT_BINDS 表（按 conversationId 过滤 + 字段映射），
    // 4 个特例（RequestUpdate / QueueUpdate / RequestsChanged / ExtensionMethod）依赖局部状态，保留手写。
    // pendingInfoCache 的清空由上方内部 state 订阅独立管理，与外部订阅互不干扰。
    on(event, cb) {
      if (isInstanceTableEvent(event)) {
        return subscribeInstanceTableEvent(eventBus, id, event, cb);
      }
      switch (event) {
        case ConversationEvent.RequestUpdate: {
          const h = cb;
          const forward = (requestId, messageId, chunk, patches) => {
            if (isUserMessageChunk(chunk)) {
              invalidateQueueProjection();
            }
            h(requestId, messageId, chunk, patches);
          };
          const unsubs = [
            // Web / 同进程 source 保持原始单条事件。
            onConvEvent(
              eventBus,
              WB_CONVERSATION_REQUEST_UPDATE,
              id,
              (p) => forward(
                p.requestId,
                p.messageId,
                p.chunk,
                requireConversationRequestPatches(p)
              )
            ),
            // Desktop transport 以最多 24 FPS 的批次跨 IPC；这里逐项还原公开回调。
            onConvEvent(
              eventBus,
              WB_CONVERSATION_REQUEST_UPDATE_BATCH,
              id,
              (batch) => batch.updates.forEach((p) => forward(
                p.requestId,
                p.messageId,
                p.chunk,
                requireConversationRequestPatches(p)
              ))
            )
          ];
          const unsubscribeHost = deps.subscribeEvent?.(id, ConversationEvent.RequestUpdate);
          return () => {
            unsubs.forEach((unsubscribe) => unsubscribe());
            unsubscribeHost?.();
          };
        }
        case ConversationEvent.QueueUpdate: {
          const h = cb;
          let active = true;
          const unsubscribe = onConvEvent(
            eventBus,
            WB_CONVERSATION_QUEUE_UPDATE,
            id,
            (payload) => {
              if (payload.projectionUpdated && active) {
                h();
              }
              queueProjection.refresh().then((changed) => {
                if (active && (!payload.projectionUpdated || changed)) {
                  h();
                }
              }).catch((error) => {
                console.warn("[wb.conversations] queue refresh failed", error);
              });
            }
          );
          queueProjection.ready.then(
            () => {
              if (active) {
                h();
              }
            },
            (error) => {
              console.warn("[wb.conversations] queue initial load failed", error);
            }
          );
          return () => {
            active = false;
            unsubscribe();
          };
        }
        case ConversationEvent.ExtensionMethod: {
          const h = cb;
          return onConvEvent(
            eventBus,
            WB_CONVERSATION_EXTENSION_METHOD,
            id,
            (payload) => {
              switch (payload.method) {
                case ConversationExtensionMethod.Checkpoint:
                  h(payload.method, payload.params);
                  return;
                case ConversationExtensionMethod.Command:
                  h(payload.method, payload.params);
                  return;
                case ConversationExtensionMethod.AuthUrl:
                  h(payload.method, payload.params);
                  return;
                case ConversationExtensionMethod.Teams:
                  h(payload.method, payload.params);
              }
            }
          );
        }
        case ConversationEvent.RequestsChanged: {
          const h = cb;
          requestsChangedHandlers.add(h);
          const latest = requestsSnapshot;
          if (latest) {
            try {
              h(latest);
            } catch {
            }
          } else if (!requestsRefreshInFlight) {
            refreshRequestsAndNotify();
          }
          return () => {
            requestsChangedHandlers.delete(h);
          };
        }
        default:
          return () => {
          };
      }
    }
  };
  return attachConversationPromptOperations(conv);
}

function isApiError(value) {
  return typeof value === "object" && value !== null && "errorCode" in value && "message" in value;
}
function withLocalListOrigin(filter, enabled) {
  if (!enabled || !filter?.conversationOrigin || filter.transport === "cloud") {
    return filter;
  }
  const originFilter = filter.conversationOrigin;
  const origins = typeof originFilter === "string" ? originFilter.split(",").map((item) => item.trim()).filter(Boolean) : [...originFilter];
  return origins.includes("local") ? filter : { ...filter, conversationOrigin: [...origins, "local"] };
}
function stripTraceId(filter) {
  if (!filter?.traceId) {
    return filter;
  }
  const { traceId: _traceId, ...rest } = filter;
  return rest;
}
function conversationViews(conversations) {
  const fixedView = (fixed) => ({
    list: (filter, options) => conversations.list({ ...filter, ...fixed }, options)
  });
  return {
    local: conversations.local ?? fixedView({ transport: "local" }),
    cloud: conversations.cloud ?? fixedView({ transport: "cloud" }),
    claw: conversations.claw ?? { list: (filter) => Promise.resolve(emptyConversationList(filter)) },
    genie: conversations.genie ?? fixedView({ conversationOrigin: "genie" }),
    miniapp: conversations.miniapp ?? fixedView({ transport: "cloud", conversationOrigin: "workbuddy-mp" }),
    app: conversations.app ?? fixedView({ transport: "cloud", conversationOrigin: "workbuddy-app" })
  };
}
async function fetchListForSpace(conversations, views, space, filter) {
  const spaceFilter = stripTraceId({ ...filter, space });
  switch (space) {
    case "local":
      return views.local.list(spaceFilter);
    case "project":
      return conversations.list(spaceFilter);
    case "assistant":
      return views.claw.list(spaceFilter);
    case "genie":
      return views.genie.list(spaceFilter);
    case "cloud":
      return views.cloud.list(spaceFilter);
    default:
      return emptyConversationList(spaceFilter);
  }
}
function subscribeCollectionEvent(eventBus, event, callback, subscribeEvent) {
  if (event in COLLECTION_EVENT_BINDS) {
    const entry = COLLECTION_EVENT_BINDS[event];
    const cb = callback;
    const map = entry.map;
    return eventBus.on(entry.bind.busEvent, (payload) => cb(...map(payload)));
  }
  switch (event) {
    case ConversationsEvent.ListChange:
      return eventBus.on(WB_CONVERSATION_LIST_PROGRESS, (payload) => callback(payload.space, payload.list, payload.traceId));
    case ConversationsEvent.RequestUpdated: {
      const handler = callback;
      const unsubs = [
        eventBus.on(WB_CONVERSATION_REQUEST_UPDATE, (payload) => handler(
          payload.conversationId,
          payload.requestId,
          payload.messageId,
          payload.chunk,
          requireConversationRequestPatches(payload)
        )),
        eventBus.on(WB_CONVERSATION_REQUEST_UPDATE_BATCH, (batch) => batch.updates.forEach((payload) => handler(
          payload.conversationId,
          payload.requestId,
          payload.messageId,
          payload.chunk,
          requireConversationRequestPatches(payload)
        )))
      ];
      const unsubscribeHost = subscribeEvent?.("*", ConversationEvent.RequestUpdate);
      return () => {
        unsubs.forEach((unsubscribe) => unsubscribe());
        unsubscribeHost?.();
      };
    }
    default:
      throw new Error(`Unsupported conversations event: ${String(event)}`);
  }
}
function resolveSinglePinnedMove(oldIds, newIds) {
  if (oldIds.length !== newIds.length) {
    return void 0;
  }
  if (oldIds.every((id, index) => id === newIds[index])) {
    return void 0;
  }
  const oldSet = new Set(oldIds);
  const newSet = new Set(newIds);
  if (oldSet.size !== oldIds.length || newSet.size !== newIds.length || oldSet.size !== newSet.size || oldIds.some((id) => !newSet.has(id))) {
    return void 0;
  }
  for (const movedId of oldIds) {
    const targetIndex = newIds.indexOf(movedId);
    const beforeWhichId = newIds[targetIndex + 1];
    const projected = oldIds.filter((id) => id !== movedId);
    const insertAt = beforeWhichId ? projected.indexOf(beforeWhichId) : projected.length;
    if (insertAt < 0) {
      continue;
    }
    projected.splice(insertAt, 0, movedId);
    if (projected.every((id, index) => id === newIds[index])) {
      return { conversationId: movedId, beforeWhichId };
    }
  }
  return void 0;
}
function createPinnedMutationMethods(source, emit) {
  let mutationQueue = Promise.resolve();
  const enqueue = (operation) => {
    const result = mutationQueue.then(operation);
    mutationQueue = result.catch(() => void 0);
    return result;
  };
  return {
    pin: (id) => enqueue(async () => {
      await source.pin(id);
      emit(WB_CONVERSATION_PINNED, { conversationId: id });
    }),
    unpin: (id) => enqueue(async () => {
      await source.unpin(id);
      emit(WB_CONVERSATION_UNPINNED, { conversationId: id });
    }),
    reorderPinned: (orderedIds) => enqueue(async () => {
      const previousIds = (await source.listPinned()).map((item) => item.id);
      await source.reorderPinned(orderedIds);
      const move = resolveSinglePinnedMove(previousIds, orderedIds);
      if (move) {
        emit(WB_CONVERSATION_PINS_REORDERED, move);
      }
    })
  };
}
function createMarkReadMethod(source, onUpdated) {
  return {
    markRead: async (conversationId) => {
      await source.markRead(conversationId);
      await onUpdated(conversationId);
    }
  };
}
function createConversationsApi(deps) {
  const { conversations, conversation } = deps.providers;
  const { eventBus, clientToolBridge } = deps;
  const views = conversationViews(conversations);
  if (!conversation || !eventBus) {
    const sourceList = conversations.list.bind(conversations);
    const sourceEnsureList = conversations.ensureList?.bind(conversations);
    const sourceListScope = conversations.listScope?.bind(conversations);
    const bus = eventBus ?? getBus();
    const sourceCreate = conversations.create.bind(conversations);
    const sourceFork = conversations.fork.bind(conversations);
    const sourceDelete = conversations.delete.bind(conversations);
    const sourceArchive = conversations.archive.bind(conversations);
    const sourceUnarchive = conversations.unarchive.bind(conversations);
    const sourceRename = conversations.rename.bind(conversations);
    const sourceMove = conversations.move.bind(conversations);
    const sourceGet = conversations.get.bind(conversations);
    const pinnedMutations2 = createPinnedMutationMethods({
      pin: conversations.pin.bind(conversations),
      unpin: conversations.unpin.bind(conversations),
      reorderPinned: conversations.reorderPinned.bind(conversations),
      listPinned: conversations.listPinned.bind(conversations)
    }, bus.emit.bind(bus));
    const emitInfoChangeSafe = async (id, source) => {
      try {
        const conv = await sourceGet(id);
        if (!conv?.info) {
          return;
        }
        bus.emit(WB_CONVERSATION_INFO_CHANGE, {
          conversationId: id,
          info: conv.info
        });
      } catch (err) {
        deps.context?.logger.warn(`[wb.conversations] emit WB_CONVERSATION_INFO_CHANGE (${source}) failed`, {
          conversationId: id,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    };
    const markReadMethod2 = createMarkReadMethod({
      markRead: conversations.markRead.bind(conversations)
    }, (conversationId) => emitInfoChangeSafe(conversationId, "markRead"));
    return Object.assign(conversations, views, {
      list: (filter, options) => sourceList(withLocalListOrigin(filter, deps.includeLocalListOrigin === true), options),
      ensureList: (space, filter) => sourceEnsureList ? sourceEnsureList(space, withLocalListOrigin(filter, deps.includeLocalListOrigin === true)) : sourceList(withLocalListOrigin({ ...filter, space }, deps.includeLocalListOrigin === true)).then(() => void 0),
      listScope: (space, filter) => sourceListScope ? sourceListScope(space, withLocalListOrigin(filter, deps.includeLocalListOrigin === true)) : sourceList(withLocalListOrigin({ ...filter, space }, deps.includeLocalListOrigin === true)),
      create: async (params) => {
        const conv = await sourceCreate(params);
        if (isApiError(conv)) {
          return conv;
        }
        try {
          bus.emit(WB_CONVERSATION_CREATED, {
            conversationId: conv.info.id,
            info: conv.info
          });
        } catch (err) {
          deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_CREATED failed", {
            conversationId: conv.info.id,
            error: err instanceof Error ? err.message : String(err)
          });
        }
        return conv;
      },
      fork: async (conversationId) => {
        const conv = await sourceFork(conversationId);
        if (isApiError(conv)) {
          return conv;
        }
        try {
          bus.emit(WB_CONVERSATION_CREATED, {
            conversationId: conv.info.id,
            info: conv.info
          });
        } catch (err) {
          deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_CREATED (fork) failed", {
            conversationId: conv.info.id,
            error: err instanceof Error ? err.message : String(err)
          });
        }
        return conv;
      },
      // ── delete / archive / unarchive：即时语义事件 ─────────────
      // 消费侧分支（line 749/758/763）已经这么做了，daemon 分支之前**没做**——
      // 跨进程消费者（edge-sync）只能等 30s poller 兜底才能同步归档/删除到云端。
      delete: async (id, transport) => {
        let deletedTransport = transport;
        if (!deletedTransport) {
          try {
            deletedTransport = (await sourceGet(id))?.info.transport;
          } catch {
          }
        }
        const result = await sourceDelete(id, transport);
        if (isConversationDeleteCancelled(result)) {
          return result;
        }
        try {
          bus.emit(WB_CONVERSATION_DELETED, { conversationId: id, transport: deletedTransport });
        } catch (err) {
          deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_DELETED failed", {
            conversationId: id,
            error: err instanceof Error ? err.message : String(err)
          });
        }
        return result;
      },
      archive: async (id, transport) => {
        let archivedTransport = transport;
        if (!archivedTransport) {
          try {
            archivedTransport = (await sourceGet(id))?.info.transport;
          } catch {
          }
        }
        await sourceArchive(id, transport);
        try {
          bus.emit(WB_CONVERSATION_ARCHIVED, { conversationId: id, transport: archivedTransport });
        } catch (err) {
          deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_ARCHIVED failed", {
            conversationId: id,
            error: err instanceof Error ? err.message : String(err)
          });
        }
      },
      unarchive: async (id, transport) => {
        let unarchivedTransport = transport;
        if (!unarchivedTransport) {
          try {
            unarchivedTransport = (await sourceGet(id))?.info.transport;
          } catch {
          }
        }
        await sourceUnarchive(id, transport);
        try {
          bus.emit(WB_CONVERSATION_UNARCHIVED, { conversationId: id, transport: unarchivedTransport });
        } catch (err) {
          deps.context?.logger.warn("[wb.conversations] emit WB_CONVERSATION_UNARCHIVED failed", {
            conversationId: id,
            error: err instanceof Error ? err.message : String(err)
          });
        }
      },
      // ── rename / move：走 WB_CONVERSATION_INFO_CHANGE 独立事件 ──
      //
      // 没有专门的 renamed / moved 事件常量，两者都是"info 字段变了"语义：
      //   - rename：title / customTitle 变（用户手改 or AI 自动改名）
      //   - move（"保存到空间"）：cwd 从空变为具体路径 + isPlayground: true→false
      // 都走 INFO_CHANGE，消费方按 payload.info 里的字段自己 diff 出变化点。
      //
      // 需要额外一次 `conversations.get(id)` 拿新 info（源 API 返 void），
      // best-effort：get 失败不阻断（列表 poller 30s 兜底能纠正）。
      rename: async (id, title, transport) => {
        await sourceRename(id, title, transport);
        void emitInfoChangeSafe(id, "rename");
      },
      move: async (id, cwd, transport) => {
        await sourceMove(id, cwd, transport);
        void emitInfoChangeSafe(id, "move");
      },
      ...pinnedMutations2,
      ...markReadMethod2
    });
  }
  const rehydratedById = /* @__PURE__ */ new Map();
  const inflightGetById = /* @__PURE__ */ new Map();
  const changeHandlers = /* @__PURE__ */ new Map();
  const emitChange = (type, change) => {
    for (const handler of changeHandlers.get(type) ?? []) {
      try {
        handler(change);
      } catch (error) {
        deps.context?.logger.error("[wb.conversations] change handler failed", {
          type,
          conversationId: change.id,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  };
  const pinnedMutations = createPinnedMutationMethods({
    pin: conversations.pin.bind(conversations),
    unpin: conversations.unpin.bind(conversations),
    reorderPinned: conversations.reorderPinned.bind(conversations),
    listPinned: conversations.listPinned.bind(conversations)
  }, (event, payload) => eventBus.emit(event, payload));
  const markReadMethod = createMarkReadMethod({
    markRead: conversations.markRead.bind(conversations)
  }, (conversationId) => emitChange("updated", { id: conversationId }));
  let listFeedRefs = 0;
  let releaseListFeedHost;
  const acquireListFeed = () => {
    listFeedRefs += 1;
    if (listFeedRefs === 1) {
      const unsubscribeBus = eventBus.on(
        WB_CONVERSATION_LIST_CHANGED,
        (payload) => {
          payload.added.forEach((info) => emitChange("added", info));
          payload.updated.forEach((info) => emitChange("updated", info));
          payload.deleted.forEach((id) => emitChange("deleted", { id }));
        }
      );
      const unsubscribeHost = deps.subscribeListChanges?.();
      releaseListFeedHost = () => {
        unsubscribeBus();
        unsubscribeHost?.();
      };
    }
    let released = false;
    return () => {
      if (released) {
        return;
      }
      released = true;
      listFeedRefs = Math.max(0, listFeedRefs - 1);
      if (listFeedRefs === 0) {
        releaseListFeedHost?.();
        releaseListFeedHost = void 0;
      }
    };
  };
  const rehydrateAndCache = (conv) => {
    const existing = rehydratedById.get(conv.info.id);
    if (existing) {
      existing.syncInfo?.(conv.info);
      existing.syncConnectors?.(conv.configManager?.connectors);
      return existing.conversation;
    }
    const rehydrateDeps = {
      conversation,
      eventBus,
      clientToolBridge,
      answerPoiQuestion: deps.answerPoiQuestion,
      answerCloudServiceConfirmation: deps.answerCloudServiceConfirmation,
      readArtifact: deps.providers.artifacts ? (conversationId, uri, format) => deps.providers.artifacts.read({ conversationId, uri, format }) : void 0,
      subscribeEvent: deps.subscribeEvent,
      onDelete: (conversationId) => rehydratedById.delete(conversationId)
    };
    const rehydrated = rehydrateConversation(conv, rehydrateDeps);
    rehydratedById.set(conv.info.id, {
      conversation: rehydrated,
      syncInfo: rehydrated.syncSourceInfo,
      syncConnectors: rehydrated.syncSourceConnectors,
      disposeInternal: rehydrated.disposeInternal
    });
    return rehydrated;
  };
  return {
    ...views,
    list: (filter, options) => conversations.list(withLocalListOrigin(filter, deps.includeLocalListOrigin === true), options),
    ensureList: async (space, filter) => {
      const normalizedFilter = withLocalListOrigin(filter, deps.includeLocalListOrigin === true);
      if (conversations.ensureList) {
        await conversations.ensureList(space, normalizedFilter);
        return;
      }
      const list = await fetchListForSpace(conversations, views, space, normalizedFilter);
      eventBus.emit(WB_CONVERSATION_LIST_PROGRESS, { space, list, traceId: normalizedFilter?.traceId });
    },
    listScope: (space, filter) => {
      const normalizedFilter = withLocalListOrigin(filter, deps.includeLocalListOrigin === true);
      return conversations.listScope ? conversations.listScope(space, normalizedFilter) : fetchListForSpace(conversations, views, space, normalizedFilter);
    },
    listByIds: (ids, options) => conversations.listByIds?.(ids, options) ?? Promise.resolve([]),
    ...markReadMethod,
    getArchivedIds: (ids) => conversations.getArchivedIds?.(ids) ?? /* @__PURE__ */ new Set(),
    get: (conversationId) => {
      const inflight = inflightGetById.get(conversationId);
      if (inflight) {
        return inflight;
      }
      const pending = conversations.get(conversationId).then((conv) => conv ? rehydrateAndCache(conv) : void 0).finally(() => {
        inflightGetById.delete(conversationId);
      });
      inflightGetById.set(conversationId, pending);
      return pending;
    },
    create: async (params) => {
      const conv = await conversations.create(params);
      if (isApiError(conv)) {
        return conv;
      }
      const rehydrated = rehydrateAndCache(conv);
      emitChange("added", rehydrated.info);
      eventBus.emit(WB_CONVERSATION_CREATED, {
        conversationId: rehydrated.info.id,
        info: rehydrated.info
      });
      return rehydrated;
    },
    fork: async (conversationId) => {
      const conv = await conversations.fork(conversationId);
      if (isApiError(conv)) {
        return conv;
      }
      const rehydrated = rehydrateAndCache(conv);
      emitChange("added", rehydrated.info);
      eventBus.emit(WB_CONVERSATION_CREATED, {
        conversationId: rehydrated.info.id,
        info: rehydrated.info
      });
      return rehydrated;
    },
    rename: async (id, title, transport) => {
      const active = rehydratedById.get(id)?.conversation;
      if (active && (!transport || active.info.transport === transport)) {
        await active.rename(title);
      } else {
        await conversations.rename(id, title, transport);
      }
      emitChange("updated", { id });
    },
    move: async (id, cwd, transport) => {
      await conversations.move(id, cwd, transport);
      emitChange("updated", { id });
    },
    delete: async (id, transport) => {
      let deletedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
      if (!deletedTransport) {
        try {
          deletedTransport = (await conversations.get(id))?.info.transport;
        } catch {
        }
      }
      const result = await conversations.delete(id, transport);
      if (isConversationDeleteCancelled(result)) {
        return result;
      }
      rehydratedById.get(id)?.disposeInternal?.();
      rehydratedById.delete(id);
      emitChange("deleted", { id });
      eventBus.emit(WB_CONVERSATION_DELETED, { conversationId: id, transport: deletedTransport });
    },
    archive: async (id, transport) => {
      let archivedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
      if (!archivedTransport) {
        try {
          archivedTransport = (await conversations.get(id))?.info.transport;
        } catch {
        }
      }
      await conversations.archive(id, transport);
      emitChange("updated", { id });
      eventBus.emit(WB_CONVERSATION_ARCHIVED, { conversationId: id, transport: archivedTransport });
    },
    unarchive: async (id, transport) => {
      let unarchivedTransport = transport ?? rehydratedById.get(id)?.conversation.info.transport;
      if (!unarchivedTransport) {
        try {
          unarchivedTransport = (await conversations.get(id))?.info.transport;
        } catch {
        }
      }
      await conversations.unarchive(id, transport);
      emitChange("updated", { id });
      eventBus.emit(WB_CONVERSATION_UNARCHIVED, { conversationId: id, transport: unarchivedTransport });
    },
    pin: async (id) => {
      await pinnedMutations.pin(id);
      emitChange("updated", { id });
    },
    unpin: async (id) => {
      await pinnedMutations.unpin(id);
      emitChange("updated", { id });
    },
    onConversationChanged: (type, handler) => {
      const handlers = changeHandlers.get(type) ?? /* @__PURE__ */ new Set();
      handlers.add(handler);
      changeHandlers.set(type, handlers);
      const releaseListFeed = acquireListFeed();
      let released = false;
      return () => {
        if (released) {
          return;
        }
        released = true;
        handlers.delete(handler);
        releaseListFeed();
      };
    },
    on: (event, callback) => subscribeCollectionEvent(eventBus, event, callback, deps.subscribeEvent),
    reorderPinned: pinnedMutations.reorderPinned,
    listPinned: () => conversations.listPinned()
  };
}

function createDesktopSDK(params) {
  return assembleSDK({ ...params});
}
function assembleSDK(params) {
  const { platform, http, upload, download, invoke, namespaces } = params;
  const sdk = createWorkbuddySDK({
    platform,
    http,
    upload,
    download,
    invoke
  });
  for (const key of Object.keys(namespaces)) {
    const impl = namespaces[key];
    if (impl !== void 0) {
      sdk.$provide(key, impl);
    }
  }
  return sdk;
}

function attachCurrentConversationReporter(api, invoke) {
  api.setCurrentConversation = (conversationId) => {
    invoke(WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, void 0, {
      event: "current",
      conversationId: conversationId ?? "",
      active: Boolean(conversationId)
    }).catch(() => void 0);
  };
  api.setCurrentConversations = (conversationIds) => {
    const ids = [...new Set(conversationIds.filter((id) => id.length > 0))];
    invoke(WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, void 0, {
      event: "current",
      conversationIds: ids,
      active: ids.length > 0
    }).catch(() => void 0);
  };
  return api;
}

function isBridgeInvocationError(value) {
  return typeof value === "object" && value !== null && value.__wbError === true;
}
function createSDKFromBridge(params) {
  const { invoke, platform, answerPoiQuestion, answerCloudServiceConfirmation } = params;
  const eventBus = getBus();
  const httpDeps = createHttpBridgeDeps(invoke);
  const bridgeGuestProxy = (name) => createGuestProxy(name, invoke);
  const conversationsClient = bridgeGuestProxy("conversations");
  const eventSubscriptionRefs = /* @__PURE__ */ new Map();
  const eventSubscriptionSyncing = /* @__PURE__ */ new Set();
  const eventSubscriptionRetryTimers = /* @__PURE__ */ new Map();
  const syncSubscription = (key, payloadOf) => {
    if (eventSubscriptionSyncing.has(key)) {
      return;
    }
    const retryTimer = eventSubscriptionRetryTimers.get(key);
    if (retryTimer) {
      clearTimeout(retryTimer);
      eventSubscriptionRetryTimers.delete(key);
    }
    eventSubscriptionSyncing.add(key);
    const active = (eventSubscriptionRefs.get(key) ?? 0) > 0;
    let synced = false;
    invoke(WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, void 0, payloadOf(active)).then((result) => {
      if (isBridgeInvocationError(result)) {
        throw new Error(result.message ?? "failed to sync conversation event subscription");
      }
      synced = true;
    }).catch(() => void 0).finally(() => {
      eventSubscriptionSyncing.delete(key);
      const stillActive = (eventSubscriptionRefs.get(key) ?? 0) > 0;
      if (stillActive !== active) {
        syncSubscription(key, payloadOf);
        return;
      }
      if (synced) {
        if (!stillActive) {
          eventSubscriptionRefs.delete(key);
        }
        return;
      }
      const retryTimer2 = setTimeout(() => {
        eventSubscriptionRetryTimers.delete(key);
        syncSubscription(key, payloadOf);
      }, 500);
      eventSubscriptionRetryTimers.set(key, retryTimer2);
    });
  };
  const refCountedSubscribe = (key, payloadOf) => {
    eventSubscriptionRefs.set(key, (eventSubscriptionRefs.get(key) ?? 0) + 1);
    syncSubscription(key, payloadOf);
    return () => {
      const remaining = (eventSubscriptionRefs.get(key) ?? 1) - 1;
      eventSubscriptionRefs.set(key, Math.max(0, remaining));
      if (remaining <= 0) {
        syncSubscription(key, payloadOf);
      }
    };
  };
  const subscribeConversationEvent = (conversationId, event) => {
    if (event !== ConversationEvent.RequestUpdate) {
      return () => void 0;
    }
    return refCountedSubscribe(
      `${conversationId}\0${event}`,
      (active) => ({ conversationId, event, active })
    );
  };
  const subscribeConversationListChanges = () => refCountedSubscribe("\0listChanged", (active) => ({ event: "listChanged", active }));
  const clientToolBindingId = createClientToolBindingId();
  const artifacts = bridgeGuestProxy("artifacts");
  const conversations = attachCurrentConversationReporter(createConversationsApi({
    eventBus,
    includeLocalListOrigin: platform.type === "desktop",
    subscribeEvent: subscribeConversationEvent,
    subscribeListChanges: subscribeConversationListChanges,
    answerPoiQuestion,
    answerCloudServiceConfirmation,
    clientToolBridge: {
      bindingId: clientToolBindingId,
      completeClientTool: (completion) => invoke("wb:clientTools:complete", void 0, completion)
    },
    providers: {
      conversations: conversationsClient,
      conversation: conversationsClient,
      artifacts
    }
  }), invoke);
  const namespaces = {
    // storage：device / user 各一个 bridge proxy，直接就是 ScopedStorage 形状
    storage: {
      device: createGuestProxy("storage.device", invoke),
      user: createGuestProxy("storage.user", invoke)
    },
    config: bridgeGuestProxy("config"),
    account: bridgeGuestProxy("account"),
    openAuth: bridgeGuestProxy("openAuth"),
    skills: bridgeGuestProxy("skills"),
    experts: bridgeGuestProxy("experts"),
    automations: bridgeGuestProxy("automations"),
    workspaces: bridgeGuestProxy("workspaces"),
    search: bridgeGuestProxy("search"),
    models: bridgeGuestProxy("models"),
    notifications: bridgeGuestProxy("notifications"),
    ops: bridgeGuestProxy("ops"),
    conversations,
    artifacts: bridgeGuestProxy("artifacts"),
    changes: bridgeGuestProxy("changes"),
    intentRecognition: bridgeGuestProxy("intentRecognition"),
    metrics: bridgeGuestProxy("metrics"),
    netdrive: bridgeGuestProxy("netdrive"),
    // [pick #88093 冲突解决] inspiration-code 域是 main 上多出的（#85050），v3 CP 时未引入；
    // 反向 pick 到 main 时按 bridgeClient→bridgeGuestProxy 的 rename 规则一起挪过来。
    inspirationCode: bridgeGuestProxy("inspirationCode"),
    connectors: bridgeGuestProxy("connectors"),
    buddyApps: bridgeGuestProxy("buddyApps"),
    mcp: bridgeGuestProxy("mcp"),
    // cloud：走 bridge 透传到主进程的 buildCloudDomains 实例
    cloud: bridgeGuestProxy("cloud"),
    // paths：Desktop 独有（Web 无磁盘路径概念）；`home()` 走 subject.kind 检查，
    // renderer 主 realm subject.kind='builtin' 可用，3P extension 会被 handler 层拒。
    paths: bridgeGuestProxy("paths"),
    // shell：Desktop 独有（Web 沙箱内 shell 出不去）；默认应用能力也在 main 进程
    // 按可信窗口身份授权，不经过 daemon。
    shell: bridgeGuestProxy("shell")
  };
  return createDesktopSDK({
    platform,
    http: httpDeps.http,
    upload: httpDeps.upload,
    download: httpDeps.download,
    // createDesktopSDK 的 invoke 形参 context 为 unknown；BridgeInvokeFn 收窄为
    // InvokeContext | undefined。包一层以兼容参数逆变，运行时语义不变。
    invoke: (channel, context, ...args) => invoke(channel, context, ...args),
    namespaces
  });
}
function createClientToolBindingId() {
  const randomUUID = globalThis.crypto?.randomUUID;
  if (typeof randomUUID === "function") {
    return `renderer-${randomUUID.call(globalThis.crypto)}`;
  }
  return `renderer-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createWorkbuddySDK(params) {
  const {
    platform,
    http: httpService,
    upload,
    download,
    // externalInvoke 是可选的 bridge invoke 注入（供 wb.invoke 逃生舱使用）。
    // Desktop renderer / extension 场景通过装配层传入 bridge.invoke；
    // 无 daemon 场景（headless / 纯 web 无 bridge）不传，wb.invoke 抛 NOT_SUPPORTED。
    invoke: externalInvoke
  } = params;
  const bus = getBus();
  const mounted = /* @__PURE__ */ new Map();
  const telemetry = createTelemetryNamespace();
  const http = createHttpNamespace({ http: httpService, upload, download });
  const sdk = {
    // ── SDK 版本号 ──────────────────────────────────────────────────
    version: WB_SDK_VERSION,
    // ── 根级 login（第三方应用授权 Code；行业开放平台 / OpenBuddy） ──
    async login(options) {
      const openAuth = mounted.get("openAuth");
      if (openAuth) {
        return openAuth.login(options);
      }
      return loginThirdPartyApplication(http, options);
    },
    // ── 根级 consent（第三方应用授权确认；行业开放平台 / OpenBuddy） ──
    async consent(options) {
      const openAuth = mounted.get("openAuth");
      if (openAuth) {
        return openAuth.consent(options);
      }
      return consentThirdPartyApplication(http, options);
    },
    async authorizeBuddyWithConnector(options) {
      const openAuth = mounted.get("openAuth");
      if (openAuth) {
        return openAuth.authorizeBuddyWithConnector(options);
      }
      return authorizeBuddyWithConnector(http, options);
    },
    // ── SDK 内部构造的 namespace（不走 $provide 挂载语义） ─────────
    telemetry,
    http,
    // feedback: 需要引用 sdk 自身，在下面 Object.defineProperty 挂载
    // ── Platform / Bus / 逃生舱 ─────────────────────────────────────
    platform,
    on: bus.on.bind(bus),
    off: bus.off.bind(bus),
    // 通配符订阅（收所有事件）—— extensions 用于订阅 guardian.* / extension.lifecycle.*
    // 事件族。委派 bus.onAny，跟 on / off 一致的语义，返回 unsubscribe 函数。
    onAny: bus.onAny.bind(bus),
    // 从 `$eventBus` 更名为 `$bus`：EventBus 语义已由类型体现，无需前缀冗余；
    // extensions 装配层已切换到 wb.$bus 消费。main 上此字段无外部消费者，rename 安全。
    $bus: bus,
    // ── wb.invoke / wb.channels —— Bridge 通用调用（"逃生舱"）─────
    //
    // 用途：跳过 `wb.<domain>` 强类型 SDK 层，直调 daemon 任意 channel。适合调
    // core 尚未收纳的历史 channel、临时调试、迁移过渡、extension 拿一次性初始快照。
    //
    // 参数 context 固定传 `undefined` —— SDK 内部没有 subject / caller 上下文，
    // 装配层适配器（bridge / IPC transport）自己决定要不要注入。
    //
    // 未接 externalInvoke（非 bridge 场景，如 headless / 单进程 web 无 daemon）时
    // 抛 NOT_SUPPORTED，消费方自己判空或用 try/catch。
    invoke(channel, ...args) {
      if (!externalInvoke) {
        return Promise.reject(new WBError(
          "wb.invoke requires bridge invoke (装配层需通过 CreateWorkbuddySDKParams.invoke 注入)",
          { code: "NOT_SUPPORTED", source: "wb.invoke" }
        ));
      }
      return externalInvoke(channel, void 0, ...args);
    },
    // TODO(channel-discovery)：待 daemon 侧接入 channel 发现机制（如 bridge
    // 层暴露 `wb:__discover__` 元 channel）后从 daemon 拉取全量 channel 列表。
    // 当前返 [] 让消费方兼容"未接入"的降级路径。
    async channels() {
      return [];
    },
    // ── $provide —— 装配层挂载 provider namespace 的唯一入口 ──────
    //
    // 语义纯粹：`mounted.set(name, impl)` + `defineProperty(sdk, name, {get})` auto-mount。
    // 特殊场景由装配层自己搞定，不在 $provide 里搞分支：
    //   · telemetry 已内建，注入 sinks 走 `wb.telemetry.$inject(sinks)`
    //   · config 从 facade 包装，装配层自己 `$provide('config', createWBConfigFromFacade(facade))`
    //
    // 独立生态包（如 `@genie/workbuddy-extensions`）通过 `declare module` augment
    // `ProvidableNamespaces` 并在装配层调 `$provide`，`wb.<namespace>` 自动可用。
    $provide(name, impl) {
      mounted.set(name, impl);
      autoDefineGetter(name);
    },
    $destroy() {
      bus.clear();
      mounted.clear();
    }
  };
  sdk.feedback = createFeedback(sdk);
  autoDefineGetter("sharing");
  function autoDefineGetter(name) {
    if (name in sdk) {
      return;
    }
    Object.defineProperty(sdk, name, {
      configurable: true,
      enumerable: true,
      get() {
        const value = mounted.get(name);
        if (!value) {
          throw new WBError(
            `wb.${name} is not provided — call wb.$provide('${name}', impl) first`,
            { code: "NOT_READY", source: `wb.${name}` }
          );
        }
        return value;
      }
    });
  }
  return sdk;
}

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

function resolveWindowTheme(raw) {
  if (raw === "dark" || raw === "light") {
    return raw;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyWindowTheme(theme) {
  const isDark = theme === "dark";
  const add = isDark ? ["dark", "cb-dark", "vscode-dark"] : ["light", "cb-light", "vscode-light"];
  const remove = isDark ? ["light", "cb-light", "vscode-light"] : ["dark", "cb-dark", "vscode-dark"];
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  root.classList.remove(...remove);
  root.classList.add(...add);
  const { body } = document;
  if (body) {
    body.classList.remove(...remove);
    body.classList.add(...add);
  }
}
applyWindowTheme(resolveWindowTheme(new URLSearchParams(window.location.search).get("theme")));
function bootstrapWbSdk() {
  const bridge = window;
  if (!bridge.__wbInvoke) {
    return void 0;
  }
  const eventBus = getBus();
  bridge.__wbEventBridge?.((event, payload) => {
    eventBus.emit(event, payload);
  });
  return createSDKFromBridge({
    invoke: bridge.__wbInvoke,
    platform: {
      type: "desktop",
      os: navigator.platform,
      appVersion: navigator.userAgent.match(/WorkBuddy\/([\d.]+)/)?.[1] ?? "dev"
    }
  });
}
const sdk = bootstrapWbSdk();
if (sdk) {
  globalThis.wb = sdk;
  sdk.on("config.preference.theme.changed", (payload) => {
    const value = payload?.value;
    applyWindowTheme(resolveWindowTheme(value));
  });
}
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("[global-search/window] #root element missing in window.html");
}
createRoot(rootEl).render(/* @__PURE__ */ jsxRuntimeExports.jsx(GlobalSearchWindow, {}));
