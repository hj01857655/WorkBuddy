const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_server = require("./server.js");
const require_tar = require("./tar.js");
const require_cos_nodejs_sdk_v5$1 = require("./cos-nodejs-sdk-v5.js");
let path = require("path");
path = require_rolldown_runtime.__toESM(path);
let node_child_process = require("node:child_process");
let url = require("url");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_util = require("node:util");
let crypto = require("crypto");
crypto = require_rolldown_runtime.__toESM(crypto);
let fs_promises = require("fs/promises");
fs_promises = require_rolldown_runtime.__toESM(fs_promises);
//#region ../../packages/workbuddy-server/src/ima/errors.ts
/**
* ima 模块错误类型
*
* 所有与 WorkBuddy 后端 /agent-gateway/ima/* 交互产生的错误都转成 ImaApiError，
* 统一携带 HTTP 状态码、errorCode 语义码、traceId。
*
* 参见：docs/plans/2026-04-19-ima-backend-api-requirements.md §6
*/
/** ima 错误码语义常量。后端返回 errorCode 字符串，对端需要时判断用此表。 */
var ImaErrorCode = {
	/** 未知错误（后端没返回 errorCode 或响应解析失败时兜底） */
	UNKNOWN: "IMA_UNKNOWN",
	/** 网络层异常（连接失败/超时） */
	NETWORK: "IMA_NETWORK",
	/** 请求被客户端取消 */
	ABORTED: "IMA_ABORTED",
	/** WorkBuddy 自身未登录 */
	WORKBUDDY_UNAUTHORIZED: "IMA_WORKBUDDY_UNAUTHORIZED",
	/** 用户尚未完成 ima OAuth 授权 */
	NOT_AUTHED: "IMA_NOT_AUTHED",
	/** ima access_token 过期且刷新失败 */
	TOKEN_EXPIRED: "IMA_TOKEN_EXPIRED",
	/** refresh_token 失效，需要重新登录 */
	REFRESH_FAILED: "IMA_REFRESH_FAILED",
	/** 对指定知识库没有权限 */
	KB_UNAUTHORIZED: "IMA_KB_UNAUTHORIZED",
	/** 文件不存在 */
	FILE_NOT_FOUND: "IMA_FILE_NOT_FOUND",
	/** 同名文件冲突（上传时） */
	FILE_CONFLICT: "IMA_FILE_CONFLICT",
	/** 文件过大 */
	FILE_TOO_LARGE: "IMA_FILE_TOO_LARGE",
	/** 被限流 */
	RATE_LIMITED: "IMA_RATE_LIMITED",
	/** 用户在 ima 授权页拒绝 */
	AUTH_DENIED: "IMA_AUTH_DENIED",
	/** ima 上游异常 */
	UPSTREAM_ERROR: "IMA_UPSTREAM_ERROR",
	/** 后端内部异常 */
	INTERNAL_ERROR: "IMA_INTERNAL_ERROR"
};
/**
* ima REST 层统一错误。
*
* 使用 `ImaApiError.fromResponse(res.status, body, traceId)` 创建；
* 上层根据 `errorCode` 做差异化处理（触发重新授权、toast、重试等）。
*/
var ImaApiError = class ImaApiError extends Error {
	constructor(init) {
		super(init.message);
		this.name = "ImaApiError";
		this.httpStatus = init.httpStatus;
		this.errorCode = init.errorCode;
		this.traceId = init.traceId;
		this.detail = init.detail;
		if (init.cause !== void 0) this.cause = init.cause;
	}
	/** 根据后端响应构造错误。body 预期为 `{ code, errorCode, message, detail, traceId }` 结构。 */
	static fromResponse(httpStatus, body, traceId) {
		const b = body && typeof body === "object" ? body : {};
		const errorCode = typeof b.errorCode === "string" ? b.errorCode : void 0;
		const message = typeof b.message === "string" && b.message ? b.message : typeof b.msg === "string" && b.msg ? b.msg : `ima request failed (HTTP ${httpStatus})`;
		const remoteTraceId = typeof b.traceId === "string" ? b.traceId : typeof b.request_id === "string" ? b.request_id : void 0;
		return new ImaApiError({
			message,
			httpStatus,
			errorCode: errorCode ?? fallbackErrorCodeFromStatus(httpStatus),
			traceId: remoteTraceId ?? traceId,
			detail: b.detail
		});
	}
	/** 网络层异常（fetch reject、超时）。*/
	static network(message, cause, traceId) {
		return new ImaApiError({
			message,
			httpStatus: 0,
			errorCode: ImaErrorCode.NETWORK,
			traceId,
			cause
		});
	}
	/** 客户端主动 abort。*/
	static aborted(traceId) {
		return new ImaApiError({
			message: "ima request aborted",
			httpStatus: 0,
			errorCode: ImaErrorCode.ABORTED,
			traceId
		});
	}
	/** 是否需要重新授权（UI 层据此展示 ImaAuthEntry） */
	requiresReauth() {
		return this.errorCode === ImaErrorCode.NOT_AUTHED || this.errorCode === ImaErrorCode.TOKEN_EXPIRED || this.errorCode === ImaErrorCode.REFRESH_FAILED;
	}
	/** 是否可以重试（网络 / 限流 / 上游 5xx） */
	retriable() {
		return this.errorCode === ImaErrorCode.NETWORK || this.errorCode === ImaErrorCode.RATE_LIMITED || this.errorCode === ImaErrorCode.UPSTREAM_ERROR || this.httpStatus >= 500 && this.httpStatus < 600;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			httpStatus: this.httpStatus,
			errorCode: this.errorCode,
			traceId: this.traceId,
			detail: this.detail
		};
	}
};
function fallbackErrorCodeFromStatus(status) {
	if (status === 401) return ImaErrorCode.WORKBUDDY_UNAUTHORIZED;
	if (status === 403) return ImaErrorCode.NOT_AUTHED;
	if (status === 404) return ImaErrorCode.FILE_NOT_FOUND;
	if (status === 409) return ImaErrorCode.FILE_CONFLICT;
	if (status === 413) return ImaErrorCode.FILE_TOO_LARGE;
	if (status === 429) return ImaErrorCode.RATE_LIMITED;
	if (status >= 500 && status < 600) return ImaErrorCode.UPSTREAM_ERROR;
	return ImaErrorCode.UNKNOWN;
}
//#endregion
//#region ../../packages/workbuddy-server/src/ima/ima-data-cipher.ts
/**
* ImaDataCipher — IMA 数据加解密工具类（与 C++ ImaDataCipher 方案严格对齐）
*
* 加密方案：
*   - AES-128-GCM：密文格式 Base64( nonce(12) + ciphertext + tag(16) )
*   - RSA-OAEP（SHA-256），输出 Base64
*   - 模式自动切换：无 Token / 过期 → RSA；有有效 Token → AES Token
*/
var CryptoMode = /* @__PURE__ */ function(CryptoMode) {
	CryptoMode[CryptoMode["Null"] = 0] = "Null";
	CryptoMode[CryptoMode["RSA"] = 1] = "RSA";
	CryptoMode[CryptoMode["AESToken"] = 2] = "AESToken";
	return CryptoMode;
}({});
var LOG_TAG$1 = "[ImaDataCipher]";
var AES = {
	KEY_LENGTH: 16,
	NONCE_LENGTH: 12,
	TAG_LENGTH: 16,
	TAG_LENGTH_BITS: 128
};
var RSA_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlZ6L/a9+9JBX3rAT+/jh
O6dm8gZc3Tmp4r1AE7ctm41lS7I6CiIF/AfBR4BbmxpdLssDjuKnPlsMMIWFxlDf
XjQyDW+5Ycm4KH1trwYtlg4jBBtr2wHOCnHBie5m3OoGb2MFUN1xtlkL8ohpkj4I
IooAsc+tmQDuKpXUbrKLZFvmzr5YaeCeHnBx/oBs6yMRIAfacGfBSyiVE6ZIqGX9
izULS6vuWSdvR+MGTrL7ZW88hq3KrkPPVuOuJw7xoVyYT0MDqjXUBxxu4ILCF2sF
DIDIuRXGcTx9p5/C1L/Fu9vOKsFI0o8QLZwCDKlYt1aN6mWofvZmfgZyUYwrAY8b
EQIDAQAB
-----END PUBLIC KEY-----`;
var Codec = {
	strToBytes(str) {
		return new TextEncoder().encode(str);
	},
	bytesToStr(bytes) {
		return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
	},
	bytesToBase64(bytes) {
		if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
		let binary = "";
		const chunkSize = 32768;
		for (let i = 0; i < bytes.length; i += chunkSize) binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
		return btoa(binary);
	},
	base64ToBytes(b64) {
		if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
		const binary = atob(b64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		return bytes;
	},
	/** PEM → ArrayBuffer */
	pemToArrayBuffer(pem) {
		const cleaned = pem.replace(/-----BEGIN [^-]+-----/g, "").replace(/-----END [^-]+-----/g, "").replace(/\s+/g, "");
		return Codec.base64ToBytes(cleaned).buffer;
	}
};
var CryptoEnv = {
	getSubtle() {
		const c = CryptoEnv._getCrypto();
		if (!c?.subtle) throw new Error(`${LOG_TAG$1} Web Crypto API not available`);
		return c.subtle;
	},
	getRandomBytes(length) {
		const c = CryptoEnv._getCrypto();
		if (!c) throw new Error(`${LOG_TAG$1} crypto.getRandomValues not available`);
		const arr = new Uint8Array(length);
		c.getRandomValues(arr);
		return arr;
	},
	_getCrypto() {
		if (typeof window !== "undefined" && window.crypto) return window.crypto;
		if (typeof globalThis !== "undefined" && globalThis.crypto) return globalThis.crypto;
	}
};
var AesGcmCipher = {
	generateRawKey() {
		return CryptoEnv.getRandomBytes(AES.KEY_LENGTH);
	},
	importKey(rawKey) {
		return CryptoEnv.getSubtle().importKey("raw", rawKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
	},
	/** 注：SubtleCrypto.encrypt 输出 = ciphertext + tag（自动追加） */
	async encrypt(key, plaintext) {
		try {
			const nonce = CryptoEnv.getRandomBytes(AES.NONCE_LENGTH);
			const ciphertextWithTag = new Uint8Array(await CryptoEnv.getSubtle().encrypt({
				name: "AES-GCM",
				iv: nonce,
				tagLength: AES.TAG_LENGTH_BITS
			}, key, Codec.strToBytes(plaintext)));
			const output = new Uint8Array(nonce.length + ciphertextWithTag.length);
			output.set(nonce, 0);
			output.set(ciphertextWithTag, nonce.length);
			return Codec.bytesToBase64(output);
		} catch (e) {
			console.error(`${LOG_TAG$1} AesGcmCipher.encrypt failed:`, e);
			return "";
		}
	},
	async decrypt(key, ciphertextBase64) {
		try {
			const decoded = Codec.base64ToBytes(ciphertextBase64);
			if (decoded.length < AES.NONCE_LENGTH + AES.TAG_LENGTH) {
				console.error(`${LOG_TAG$1} AesGcmCipher.decrypt: ciphertext too short, size=${decoded.length}`);
				return "";
			}
			const nonce = decoded.subarray(0, AES.NONCE_LENGTH);
			const ciphertextWithTag = decoded.subarray(AES.NONCE_LENGTH);
			const plaintextBuf = await CryptoEnv.getSubtle().decrypt({
				name: "AES-GCM",
				iv: nonce,
				tagLength: AES.TAG_LENGTH_BITS
			}, key, ciphertextWithTag);
			return Codec.bytesToStr(new Uint8Array(plaintextBuf));
		} catch (e) {
			console.error(`${LOG_TAG$1} AesGcmCipher.decrypt failed:`, e);
			return "";
		}
	}
};
var RsaOaepEncryptor = class {
	constructor(_publicKeyPem) {
		this._publicKeyPem = _publicKeyPem;
		this._publicKey = null;
		this._importPromise = null;
	}
	async encrypt(data) {
		try {
			const key = await this._importPublicKey();
			const encryptedBuf = await CryptoEnv.getSubtle().encrypt({ name: "RSA-OAEP" }, key, data);
			return Codec.bytesToBase64(new Uint8Array(encryptedBuf));
		} catch (e) {
			console.error(`${LOG_TAG$1} RsaOaepEncryptor.encrypt failed:`, e);
			return "";
		}
	}
	/** 仅支持 SPKI 格式 PEM；带缓存与并发去重 */
	_importPublicKey() {
		if (this._publicKey) return Promise.resolve(this._publicKey);
		if (this._importPromise) return this._importPromise;
		this._importPromise = (async () => {
			const key = await CryptoEnv.getSubtle().importKey("spki", Codec.pemToArrayBuffer(this._publicKeyPem), {
				name: "RSA-OAEP",
				hash: { name: "SHA-256" }
			}, false, ["encrypt"]);
			this._publicKey = key;
			return key;
		})().catch((e) => {
			this._importPromise = null;
			throw e;
		});
		return this._importPromise;
	}
};
var SessionStore = class {
	constructor() {
		this._aesKey = null;
		this._token = "";
		this._tokenExpireTimestamp = 0;
		this._ensureKeyPromise = null;
	}
	hasAesKey() {
		return this._aesKey !== null;
	}
	getAesKey() {
		return this._aesKey;
	}
	getToken() {
		return this._token;
	}
	isTokenValid() {
		if (!this._token || this._tokenExpireTimestamp <= 0) return false;
		return nowInSeconds() < this._tokenExpireTimestamp;
	}
	setToken(token, expireTimestamp) {
		this._token = String(token || "");
		this._tokenExpireTimestamp = Number(expireTimestamp) || 0;
	}
	/** 全量清空：AES key + Token + pending promise */
	clear() {
		this._aesKey = null;
		this._token = "";
		this._tokenExpireTimestamp = 0;
		this._ensureKeyPromise = null;
	}
	/** 确保已有 AES key；并发首次调用共享同一个生成 promise */
	ensureAesKey() {
		if (this._aesKey) return Promise.resolve(this._aesKey);
		if (this._ensureKeyPromise) return this._ensureKeyPromise;
		this._ensureKeyPromise = (async () => {
			if (this._aesKey) return this._aesKey;
			const rawBytes = AesGcmCipher.generateRawKey();
			const material = {
				rawBytes,
				cryptoKey: await AesGcmCipher.importKey(rawBytes)
			};
			this._aesKey = material;
			return material;
		})().finally(() => {
			this._ensureKeyPromise = null;
		});
		return this._ensureKeyPromise;
	}
};
function nowInSeconds() {
	return Math.floor(Date.now() / 1e3);
}
var ImaDataCipher = class {
	static {
		this._session = new SessionStore();
	}
	static {
		this._rsa = new RsaOaepEncryptor(RSA_PUBLIC_KEY_PEM);
	}
	/** 加密 body，自动选择模式（RSA 或 AES Token） */
	static async encrypt(plaintext) {
		const fail = {
			success: false,
			data: "",
			mode: 0
		};
		if (typeof plaintext !== "string" || plaintext.length === 0) {
			console.error(`${LOG_TAG$1} encrypt: plaintext is empty`);
			return fail;
		}
		const session = this._session;
		const tokenValid = session.isTokenValid();
		if (session.hasAesKey() && !tokenValid && !!session.getToken()) session.clear();
		const { rawBytes, cryptoKey } = await session.ensureAesKey();
		if (tokenValid) {
			const data = await AesGcmCipher.encrypt(cryptoKey, plaintext);
			if (!data) return fail;
			return {
				success: true,
				data,
				mode: 2,
				x_ima_ctk: session.getToken()
			};
		}
		const encryptedKey = await this._rsa.encrypt(rawBytes);
		if (!encryptedKey) return fail;
		const data = await AesGcmCipher.encrypt(cryptoKey, plaintext);
		if (!data) return fail;
		return {
			success: true,
			data,
			mode: 1,
			x_ima_ckey: encryptedKey
		};
	}
	/** 使用当前缓存的 AES 密钥解密响应 body；失败返回 '' */
	static async decrypt(ciphertextBase64) {
		if (typeof ciphertextBase64 !== "string" || ciphertextBase64.length === 0) return "";
		const aesKey = this._session.getAesKey();
		if (!aesKey) {
			console.error(`${LOG_TAG$1} decrypt: no AES key, call encrypt first`);
			return "";
		}
		return AesGcmCipher.decrypt(aesKey.cryptoKey, ciphertextBase64);
	}
	/** 保存后台响应头 x-ima-ctk / x-ima-ctk-expire（Unix 秒） */
	static setToken(token, expireTimestamp) {
		this._session.setToken(token, expireTimestamp);
	}
	/** 清除 Token 与 AES 密钥，下次 encrypt 走 RSA 重新协商 */
	static clearSession() {
		this._session.clear();
	}
	static async encryptData(plaintext) {
		if (typeof plaintext !== "string" || plaintext.length === 0) return {
			code: -1,
			msg: "data is empty"
		};
		try {
			const r = await this.encrypt(plaintext);
			if (!r.success || r.mode !== 1 && r.mode !== 2) return {
				code: -2,
				msg: "encrypt failed"
			};
			const payload = {
				data: r.data,
				x_ima_cm: r.mode
			};
			if (r.mode === 1) payload.x_ima_ckey = r.x_ima_ckey;
			else payload.x_ima_ctk = r.x_ima_ctk;
			return {
				code: 0,
				msg: "ok",
				data: payload
			};
		} catch (e) {
			console.error(`${LOG_TAG$1} encryptData failed:`, e);
			return {
				code: -2,
				msg: e instanceof Error ? e.message : "encrypt failed"
			};
		}
	}
	static async decryptData(ciphertextBase64) {
		if (typeof ciphertextBase64 !== "string" || ciphertextBase64.length === 0) return {
			code: -1,
			msg: "data is empty",
			data: ""
		};
		if (!this._session.hasAesKey()) return {
			code: -2,
			msg: "no aes key, call encryptData first",
			data: ""
		};
		try {
			const plaintext = await this.decrypt(ciphertextBase64);
			if (!plaintext) return {
				code: -1,
				msg: "decrypted plaintext is empty",
				data: ""
			};
			return {
				code: 0,
				msg: "ok",
				data: plaintext
			};
		} catch (e) {
			console.error(`${LOG_TAG$1} decryptData failed:`, e);
			return {
				code: -2,
				msg: e instanceof Error ? e.message : "decrypt failed",
				data: ""
			};
		}
	}
	static setCryptoToken(params) {
		const token = params?.token;
		const expire = Number(params?.expire);
		if (typeof token !== "string" || token.length === 0) return {
			code: -1,
			msg: "token is empty"
		};
		if (!Number.isFinite(expire) || expire <= 0) return {
			code: -1,
			msg: "expire is invalid"
		};
		this.setToken(token, expire);
		return {
			code: 0,
			msg: "ok"
		};
	}
	/**
	* 触发时机：后台返回加密 Token 无效/过期时
	*   - HTTP 403 + 响应头 Trpc-Func-Ret: 20006
	*/
	static clearCryptoSession() {
		this.clearSession();
		return {
			code: 0,
			msg: "ok"
		};
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/ima-backend-client.ts
var DEFAULT_PATH_PREFIX = "/console/agent-gateway/ima";
/**
* OneID 托管（IOA 企业版）的数据面前缀。
*
* 该档账号的 OAuth 记录写在 `ima-mcp-oa` 名下（见 connector-name.ts），C 端
* `/console/agent-gateway/ima` 网关取不到其 token，会直接 401。
*/
var IMA_OA_PATH_PREFIX = "/v2/agent-gateway/ima-mcp-oa";
/**
* 根据 applicationName 计算默认路径前缀：
* - 'workbuddy'（不区分大小写）/ undefined → '/console/agent-gateway/ima'
* - 其他值 → '/console/agent-gateway/ima-{applicationName小写}'
*/
function getDefaultPathPrefix(applicationName) {
	const appName = (applicationName ?? "workbuddy").trim().toLowerCase();
	if (!appName || appName === "workbuddy") return DEFAULT_PATH_PREFIX;
	return `/console/agent-gateway/ima-${appName}`;
}
var DEFAULT_TIMEOUT_MS = 3e4;
/**
* 触发自动加密的路径白名单（精确匹配，去掉 pathPrefix 后的 path）。
*/
var ENCRYPTED_PATHS = /* @__PURE__ */ new Set(["/openapi/media/v1/download_medias", "/openapi/media/v1/preview_medias"]);
/** 后端响应头：Token + 过期时间（Unix 秒）+ 错误码 */
var HEADER_IMA_CTK = "x-ima-ctk";
var HEADER_IMA_CTK_EXPIRE = "x-ima-ctk-expire";
var HEADER_TRPC_FUNC_RET = "trpc-func-ret";
/** Token 失效时的 trpc 错误码（与后端约定） */
var TRPC_TOKEN_INVALID = "20006";
function resolveImaFetch(fetchFn) {
	if (fetchFn) return fetchFn;
	return (url, init) => {
		if (typeof globalThis.fetch !== "function") throw new Error("IMA fetch is unavailable; inject ImaBackendClientOptions.fetchFn");
		return globalThis.fetch(url, init);
	};
}
var ImaBackendClient = class {
	constructor(options) {
		this.logger = options.logger;
		this.productManager = options.productManager;
		this.authManager = options.authenticationManager;
		const applicationName = process.env.WORKBUDDY_APPLICATION_NAME?.trim();
		this.explicitPathPrefix = options.pathPrefix?.replace(/\/+$/, "");
		this.defaultPathPrefix = getDefaultPathPrefix(applicationName);
		this.defaultTimeoutMs = options.defaultTimeoutMs ?? DEFAULT_TIMEOUT_MS;
		this.fetchFn = resolveImaFetch(options.fetchFn);
	}
	/** GET 请求，解析为 JSON envelope 的 data 字段。 */
	async get(path, options = {}) {
		return this.request("GET", path, void 0, options);
	}
	/** POST 请求，body 会被 JSON.stringify。 */
	async post(path, body, options = {}) {
		const headers = {
			"Content-Type": "application/json",
			...options.headers ?? {}
		};
		return this.request("POST", path, JSON.stringify(body ?? {}), {
			...options,
			headers
		});
	}
	/** DELETE 请求。 */
	async delete(path, options = {}) {
		return this.request("DELETE", path, void 0, options);
	}
	/**
	* POST multipart/form-data。
	*
	* 不要手动设置 Content-Type，让 fetch 实现自动生成 boundary。
	* multipart 不参与加解密（强制 skipCrypto=true）。
	*/
	async postMultipart(path, form, options = {}) {
		return this.request("POST", path, form, {
			...options,
			skipCrypto: true
		});
	}
	/**
	* 以原始二进制形式 GET 资源。
	* 不走 JSON envelope 解析，适用于"下载"场景；不参与加解密。
	*/
	async getBinary(path, options = {}) {
		const url = this.buildUrl(path, options.query);
		const traceId = this.newTraceId();
		const ac = new AbortController();
		const timer = setTimeout(() => ac.abort(), options.timeoutMs ?? this.defaultTimeoutMs);
		try {
			const res = await this.doFetch(url, {
				method: "GET",
				headers: this.buildHeaders(options.headers, traceId, options.idempotencyKey),
				signal: options.signal ?? ac.signal
			}, traceId);
			if (!res.ok) {
				const text = await res.text().catch(() => "");
				throw ImaApiError.fromResponse(res.status, safeJsonParse(text), traceId);
			}
			const ab = await res.arrayBuffer();
			return new Uint8Array(ab);
		} finally {
			clearTimeout(timer);
		}
	}
	async request(method, path, body, options) {
		if (this.shouldEncrypt(path, body, options)) return this.requestEncrypted(method, path, body, options);
		return this.requestPlain(method, path, body, options);
	}
	/** 原始（未加密）请求。 */
	async requestPlain(method, path, body, options) {
		const url = this.buildUrl(path, options.query);
		const traceId = this.newTraceId();
		const ac = new AbortController();
		const timer = setTimeout(() => ac.abort(), options.timeoutMs ?? this.defaultTimeoutMs);
		try {
			const headers = this.buildHeaders(options.headers, traceId, options.idempotencyKey);
			const res = await this.doFetch(url, {
				method,
				headers,
				body,
				signal: options.signal ?? ac.signal
			}, traceId);
			const parsed = safeJsonParse(await res.text());
			if (!res.ok) throw ImaApiError.fromResponse(res.status, parsed, traceId);
			const envelope = parsed ?? {};
			if (envelope.code !== 0) throw ImaApiError.fromResponse(res.status, envelope, traceId);
			if (envelope.data !== void 0) return envelope.data;
			const { code: _code, errorCode: _ec, message: _msg, msg: _m, detail: _d, traceId: _tid, request_id: _rid, ...rest } = parsed ?? {};
			return Object.keys(rest).length > 0 ? rest : {};
		} finally {
			clearTimeout(timer);
		}
	}
	/**
	* 加密请求。Token 失效时自动 clearSession + 重试一次。
	*/
	async requestEncrypted(method, path, plaintextBody, options) {
		try {
			return await this.doEncryptedRequest(method, path, plaintextBody, options);
		} catch (err) {
			if (this.isTokenInvalidError(err)) {
				this.logger.warn(`[ImaBackendClient] token invalid, clear session and retry once: ${path}`);
				ImaDataCipher.clearSession();
				return this.doEncryptedRequest(method, path, plaintextBody, options);
			}
			throw err;
		}
	}
	async doEncryptedRequest(method, path, plaintextBody, options) {
		const enc = await ImaDataCipher.encrypt(plaintextBody);
		if (!enc.success) throw ImaApiError.network("ima encrypt failed", void 0, "");
		const cryptoHeaders = { "x-ima-cm": String(enc.mode) };
		if (enc.mode === CryptoMode.RSA && enc.x_ima_ckey) cryptoHeaders["x-ima-ckey"] = enc.x_ima_ckey;
		else if (enc.mode === CryptoMode.AESToken && enc.x_ima_ctk) cryptoHeaders["x-ima-ctk"] = enc.x_ima_ctk;
		const url = this.buildUrl(path, options.query);
		const traceId = this.newTraceId();
		const ac = new AbortController();
		const timer = setTimeout(() => ac.abort(), options.timeoutMs ?? this.defaultTimeoutMs);
		try {
			const headers = this.buildHeaders({
				...options.headers ?? {},
				...cryptoHeaders
			}, traceId, options.idempotencyKey);
			const res = await this.doFetch(url, {
				method,
				headers,
				body: enc.data,
				signal: options.signal ?? ac.signal
			}, traceId);
			this.persistTokenFromHeaders(res);
			const cipherText = await res.text();
			const trpcFuncRet = res.headers.get(HEADER_TRPC_FUNC_RET) ?? void 0;
			if (!res.ok) {
				const parsed = await this.tryDecryptJson(cipherText) ?? safeJsonParse(cipherText);
				const enriched = this.enrichBodyWithTrpcRet(parsed, trpcFuncRet);
				throw ImaApiError.fromResponse(res.status, enriched, traceId);
			}
			let decrypted = "";
			try {
				decrypted = cipherText ? await ImaDataCipher.decrypt(cipherText) : "";
			} catch (decErr) {
				throw ImaApiError.network(`ima decrypt failed: ${decErr instanceof Error ? decErr.message : String(decErr)}`, decErr, traceId);
			}
			const parsed = decrypted ? safeJsonParse(decrypted) : null;
			const envelope = parsed ?? {};
			if (envelope.code !== 0) throw ImaApiError.fromResponse(res.status, envelope, traceId);
			if (envelope.data !== void 0) return envelope.data;
			const { code: _code, errorCode: _ec, message: _msg, msg: _m, detail: _d, traceId: _tid, request_id: _rid, ...rest } = parsed ?? {};
			return Object.keys(rest).length > 0 ? rest : {};
		} finally {
			clearTimeout(timer);
		}
	}
	/** 是否应当对该请求启用自动加解密。 */
	shouldEncrypt(path, body, options) {
		if (options.skipCrypto) return false;
		if (typeof body !== "string") return false;
		const pathOnly = (path.startsWith("/") ? path : `/${path}`).split("?")[0];
		return ENCRYPTED_PATHS.has(pathOnly);
	}
	/** 把响应头 x-ima-ctk / x-ima-ctk-expire 写入 cipher session。 */
	persistTokenFromHeaders(res) {
		const token = res.headers.get(HEADER_IMA_CTK);
		const expireRaw = res.headers.get(HEADER_IMA_CTK_EXPIRE);
		if (!token || !expireRaw) return;
		const expire = Number(expireRaw);
		if (!Number.isFinite(expire) || expire <= 0) return;
		ImaDataCipher.setToken(token, expire);
	}
	/**
	* 判定是否为 Token 失效错误（HTTP 403 + Trpc-Func-Ret: 20006）。
	* trpcFuncRet 由 doEncryptedRequest 在 4xx 路径上注入到 ImaApiError.detail。
	*/
	isTokenInvalidError(err) {
		if (!(err instanceof ImaApiError)) return false;
		if (err.httpStatus !== 403) return false;
		const detail = err.detail;
		if (typeof detail !== "object" || detail === null) return false;
		return String(detail.trpcFuncRet ?? "") === TRPC_TOKEN_INVALID;
	}
	/** 把响应头 Trpc-Func-Ret 拼到错误响应 body 的 detail 字段里。 */
	enrichBodyWithTrpcRet(body, trpcFuncRet) {
		if (!trpcFuncRet) return body;
		const base = body && typeof body === "object" ? body : {};
		const detail = base.detail && typeof base.detail === "object" ? base.detail : {};
		return {
			...base,
			detail: {
				...detail,
				trpcFuncRet
			}
		};
	}
	/** 尝试以加密方式解析失败响应；失败返回 null。 */
	async tryDecryptJson(cipherText) {
		if (!cipherText) return null;
		try {
			const plain = await ImaDataCipher.decrypt(cipherText);
			return plain ? safeJsonParse(plain) : null;
		} catch {
			return null;
		}
	}
	/** 包装底层 fetch，统一 abort/network 错误转为 ImaApiError。 */
	async doFetch(url, init, traceId) {
		try {
			return await this.fetchFn(url, init);
		} catch (err) {
			if (err?.name === "AbortError") throw ImaApiError.aborted(traceId);
			this.logger.warn(`[ImaBackendClient] network error ${url}`, String(err));
			throw ImaApiError.network(`ima request failed: ${err?.message ?? "unknown"}`, err, traceId);
		}
	}
	/**
	* 每次请求实时求值：账号可在运行期切换，构造时定死会让切换后仍打到旧网关。
	*/
	resolvePathPrefix() {
		if (this.explicitPathPrefix) return this.explicitPathPrefix;
		const enterpriseId = this.authManager?.currentSessionSubject?.getValue()?.account?.enterpriseId;
		return require_tar.isIOAEnterprise(enterpriseId) ? IMA_OA_PATH_PREFIX : this.defaultPathPrefix;
	}
	buildUrl(path, query) {
		const endpoint = this.productManager.getEndpoint().replace(/\/+$/, "");
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		const full = `${endpoint}${this.resolvePathPrefix()}${normalizedPath}`;
		if (!query) return full;
		const pairs = [];
		for (const [k, v] of Object.entries(query)) {
			if (v === void 0 || v === null) continue;
			pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
		}
		return pairs.length ? `${full}?${pairs.join("&")}` : full;
	}
	buildHeaders(extra, traceId, idempotencyKey) {
		const base = {
			...this.authManager.buildAuthHeaders(true, true, false),
			"X-Trace-Id": traceId,
			"X-B3-TraceId": traceId,
			"X-B3-SpanId": crypto.randomBytes(8).toString("hex"),
			"X-B3-Sampled": "1"
		};
		if (idempotencyKey) base["X-Request-Id"] = idempotencyKey;
		if (extra) Object.assign(base, extra);
		return base;
	}
	newTraceId() {
		return crypto.randomBytes(16).toString("hex");
	}
};
function safeJsonParse(text) {
	if (!text) return null;
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/ima/api/auth-api.ts
/**
* 授权链路请求超时（ms），覆盖 start / status / revoke / accesstoken。
*
* 取 60s 而非原先的 15s：主进程卡顿时 event loop 阻塞实测可达 11s，叠加网络最坏 5s 已越过 15s，
* 会把本可成功的请求提前 abort，status() 随即降级返回 authed=false 并触发不可逆的 revoke（#87036）。
*/
var AUTH_REQUEST_TIMEOUT_MS = 6e4;
var LOG_TAG = "[ImaAuthApi]";
var ImaAuthApi = class {
	constructor(client, deps) {
		this.client = client;
		this.productManager = deps?.productManager;
		this.authManager = deps?.authenticationManager;
		this.fetchFn = resolveImaFetch(deps?.fetchFn);
	}
	/**
	* 发起 OAuth 授权。
	*
	* - 优先走 agent-server：POST /v2/as/connector/oauth/ima/start
	*   把后端返回的 `authorize_url / request_id / expire_at` 映射为
	*   ima service 定义的 `StartAuthResult { authorizeUrl, sessionId, expiresIn }`。
	* - 若 `productManager / authenticationManager` 未注入（单测），退化到旧 `/api/ima/oauth/start`。
	*/
	async start(params) {
		if (!this.productManager || !this.authManager) return this.client.post("/oauth/start", params);
		const forcePersonal = params.connectorScope === "personal";
		const url = await this.buildConnectorOauthUrl("start", forcePersonal);
		const headers = this.buildAgentServerHeaders(forcePersonal);
		if (!headers) throw new Error(`${LOG_TAG} start: not logged in to WorkBuddy`);
		const body = {};
		if (params.deepLinkScheme) body.redirect_uri = `${params.deepLinkScheme}://ima/auth/complete`;
		const response = await this.fetchWithTimeout(url, {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`${LOG_TAG} start HTTP ${response.status}: ${text}`);
		}
		const envelope = await response.json();
		if (envelope.code !== 0) throw new Error(`${LOG_TAG} start API error ${envelope.code}: ${envelope.msg ?? ""}`);
		const d = envelope.data;
		const expiresIn = d.expire_at ? Math.max(0, d.expire_at - Math.floor(Date.now() / 1e3)) : 600;
		const nextAction = (typeof d.next_action === "string" ? d.next_action : "redirect") === "connected" ? "connected" : "redirect";
		return {
			authorizeUrl: d.authorize_url ?? "",
			sessionId: d.request_id,
			expiresIn,
			nextAction
		};
	}
	/**
	* 查询授权状态。
	*
	* agent-server 响应里 `extra.user_id / display_name / avatar_url`（若后端透传）
	* 会映射到 `AuthStatus.userId / imaAccountInfo`。
	*
	* IOA 企业账号跳过 `/status` 直接取 `/accesstoken`：`/status` 只服务 C 端 OAuth，
	* 对 OneID 托管的企业账号恒返回 not_connected，会把已开通用户误判成未授权
	* （腾讯文档 B 端同理，见 knowledge-base-panel/tencent-docs/index.tsx 的
	* isEnterpriseEdition 分支——它压根不调 status）。企业侧「是否已授权」由
	* OneID 开通态决定，token 能换到即视为已授权。
	*
	* `connectorScope='personal'` 时不做上述分流：个人版连接器的授权态只能由
	* C 端 `/status` 回答。
	*/
	async status(params) {
		if (!this.productManager || !this.authManager) return this.client.get("/auth/status", { query: params?.sessionId ? { sessionId: params.sessionId } : void 0 });
		const forcePersonal = params?.connectorScope === "personal";
		if (!forcePersonal && await this.isEnterpriseManagedConnector()) return this.statusViaEnterpriseAccessToken();
		const url = await this.buildConnectorOauthUrl("status", forcePersonal);
		const headers = this.buildAgentServerHeaders(forcePersonal);
		if (!headers) {
			console.warn(LOG_TAG, "status: no headers (not logged in) → returning authed=false");
			return { authed: false };
		}
		try {
			const response = await this.fetchWithTimeout(url, {
				method: "GET",
				headers
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				console.warn(LOG_TAG, `status HTTP ${response.status}: ${text}`);
				return { authed: false };
			}
			const rawText = await response.text();
			let envelope;
			try {
				envelope = JSON.parse(rawText);
			} catch (parseErr) {
				console.warn(LOG_TAG, "status JSON parse failed:", String(parseErr));
				return { authed: false };
			}
			if (envelope.code !== 0) {
				console.warn(LOG_TAG, `status API error ${envelope.code}: ${envelope.msg ?? ""}`);
				return { authed: false };
			}
			const d = envelope.data;
			const authed = d.status === "connected";
			const result = {
				authed,
				userId: d.extra?.user_id ?? d.extra?.open_id,
				expiresAt: d.expire_at ? d.expire_at * 1e3 : void 0,
				imaAccountInfo: d.extra?.display_name || d.extra?.avatar_url ? {
					displayName: d.extra?.display_name,
					avatarUrl: d.extra?.avatar_url
				} : void 0,
				clientId: d.extra?.client_id
			};
			if (authed) try {
				const tokenData = await this.getAccessToken(forcePersonal);
				result.accessToken = tokenData.accessToken;
				result.accessTokenExpiresIn = tokenData.accessTokenExpiresIn;
				result.mcpToken = tokenData.mcpToken;
				result.mcpTokenExpiresAt = tokenData.mcpTokenExpiresAt;
			} catch (tokenErr) {
				console.warn(LOG_TAG, "status: getAccessToken failed, tokens will be empty:", String(tokenErr));
			}
			return result;
		} catch (err) {
			console.warn(LOG_TAG, "status failed:", String(err));
			return { authed: false };
		}
	}
	/**
	* IOA 企业账号的授权态：直接换 token，换到即视为已授权。
	*
	* 后端 `/accesstoken` 会按 connector 的 `CapOneidAuthSupported` 能力自动分流到
	* OneID 企业换票分支，无需前端额外传参。换不到（未开通 / 无权限）按未授权处理，
	* UI 侧由 OneID 开通引导页兜住。
	*
	* `mcpToken` 兜底为 access_token：OneID 换票只返回 `access_token`，不下发
	* `mcp_token`（企业侧 MCP 请求头由后端注入 X-Oneid-Access-Token）。但下游
	* `ima-auth-store.checkAuthStatus` 要求 `authed && mcpToken` 同时成立才置
	* connected，缺 mcpToken 会让已授权用户被判为未授权。
	*/
	async statusViaEnterpriseAccessToken() {
		try {
			const tokenData = await this.getAccessToken();
			if (!tokenData.accessToken) {
				console.warn(LOG_TAG, "status(enterprise): accesstoken returned empty token → authed=false");
				return { authed: false };
			}
			return {
				authed: true,
				accessToken: tokenData.accessToken,
				accessTokenExpiresIn: tokenData.accessTokenExpiresIn,
				mcpToken: tokenData.mcpToken ?? tokenData.accessToken,
				mcpTokenExpiresAt: tokenData.mcpTokenExpiresAt,
				expiresAt: tokenData.accessTokenExpiresIn ? Date.now() + tokenData.accessTokenExpiresIn * 1e3 : void 0
			};
		} catch (err) {
			console.warn(LOG_TAG, "status(enterprise): getAccessToken failed:", String(err));
			return { authed: false };
		}
	}
	/**
	* Refresh 语义：agent-server 侧的 `/status` 本身在需要时会触发 token 续期，
	* 这里无额外后端接口可调。为保持 service 返回值形状一致，基于当前 status 返回
	* `expiresAt` 即可。
	*/
	async refresh() {
		if (!this.productManager || !this.authManager) return this.client.post("/auth/refresh", {});
		return { expiresAt: (await this.status()).expiresAt ?? 0 };
	}
	/**
	* 撤销授权：POST /v2/as/connector/oauth/{ima|ima-mcp-oa}/revoke
	* （对应旧 logout 语义）
	*
	* `connectorScope='personal'` 时固定 revoke C 端记录：个人版连接器解绑必须撤销
	* 它自己的扫码 OAuth，按账号分流会打到企业版上，个人版授权原封不动留在后端，
	* 用户再点「连接」就会不经授权页直接连上。
	*/
	async logout(params) {
		if (!this.productManager || !this.authManager) return this.client.post("/auth/logout", {});
		const forcePersonal = params?.connectorScope === "personal";
		const url = await this.buildConnectorOauthUrl("revoke", forcePersonal);
		const headers = this.buildAgentServerHeaders(forcePersonal);
		if (!headers) throw new Error(`${LOG_TAG} logout: not logged in to WorkBuddy`);
		const response = await this.fetchWithTimeout(url, {
			method: "POST",
			headers,
			body: JSON.stringify({})
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`${LOG_TAG} logout HTTP ${response.status}: ${text}`);
		}
		const envelope = await response.json();
		if (envelope.code !== 0) throw new Error(`${LOG_TAG} logout API error ${envelope.code}: ${envelope.msg ?? ""}`);
		return { success: true };
	}
	/**
	* 获取 IMA access_token / mcp_token。
	*
	* GET /v2/as/connector/oauth/ima/accesstoken
	* 仅在已确认 authed=true 后调用。
	*/
	async getAccessToken(forcePersonal = false) {
		const url = await this.buildConnectorOauthUrl("accesstoken", forcePersonal);
		const headers = this.buildAgentServerHeaders(forcePersonal);
		if (!headers) throw new Error(`${LOG_TAG} getAccessToken: not logged in to WorkBuddy`);
		const response = await this.fetchWithTimeout(url, {
			method: "GET",
			headers
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`${LOG_TAG} getAccessToken HTTP ${response.status}: ${text}`);
		}
		const envelope = await response.json();
		if (envelope.code !== 0) throw new Error(`${LOG_TAG} getAccessToken API error ${envelope.code}: ${envelope.msg ?? ""}`);
		const d = envelope.data;
		return {
			accessToken: d.access_token,
			accessTokenExpiresIn: d.expire_at ? Math.max(0, d.expire_at - Math.floor(Date.now() / 1e3)) : void 0,
			mcpToken: d.mcp_token,
			mcpTokenExpiresAt: d.mcp_token_expire_at ? d.mcp_token_expire_at * 1e3 : void 0
		};
	}
	/**
	* @param forcePersonal 强制用 C 端 connector name（个人版连接器授权入口）。
	*/
	async buildConnectorOauthUrl(action, forcePersonal = false) {
		return `${this.productManager.getEndpoint().replace(/\/+$/, "")}/v2/as/connector/oauth/${await require_tar.getImaConnectorName(this.productManager, this.buildAccountProvider(forcePersonal))}/${action}`;
	}
	/** 当前账号的 ima 授权是否由企业版 OneID 托管（LearnBuddy 等发行版已在解析层豁免）。 */
	isEnterpriseManagedConnector() {
		return require_tar.isImaEnterpriseConnector(this.productManager, this.buildAccountProvider());
	}
	buildAccountProvider(forcePersonal = false) {
		return { getEnterpriseId: () => forcePersonal ? void 0 : this.authManager?.currentSessionSubject.getValue()?.account?.enterpriseId };
	}
	/**
	* 构造 agent-server 请求的 headers。
	* 与 tdoc 的 `buildTdocGatewayHeaders` 同构：Bearer token + X-User-Id + enterprise/domain。
	*/
	/**
	* @param forcePersonal 个人版（C 端 `ima`）请求。此时必须剥掉企业上下文头：
	*   只把 URL 的 connectorName 换成 C 端、却仍带 `X-Enterprise-Id` / `X-Tenant-Id`，
	*   后端会按企业租户回答，个人版 status 于是继承企业版的 connected —— 表现为
	*   「切到 IOA 账号后个人版连接器仍显示已连接」。#100030
	*/
	buildAgentServerHeaders(forcePersonal = false) {
		const session = this.authManager.currentSessionSubject.getValue();
		if (!session?.auth?.accessToken) return null;
		const { account, auth } = session;
		const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${auth.accessToken}`
		};
		if (account?.uid) headers["X-User-Id"] = account.uid;
		if (account?.enterpriseId && !forcePersonal) {
			headers["X-Enterprise-Id"] = account.enterpriseId;
			headers["X-Tenant-Id"] = account.enterpriseId;
		}
		if (auth.domain) headers["X-Domain"] = auth.domain;
		return headers;
	}
	async fetchWithTimeout(url, init) {
		const ac = new AbortController();
		const timer = setTimeout(() => ac.abort(), AUTH_REQUEST_TIMEOUT_MS);
		try {
			return await this.fetchFn(url, {
				...init,
				signal: ac.signal
			});
		} finally {
			clearTimeout(timer);
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/api/files-api.ts
var import_cos_nodejs_sdk_v5 = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_cos_nodejs_sdk_v5$1.require_cos_nodejs_sdk_v5());
var SORT_BY_TO_SORT_TYPE = {
	createdDesc: 0,
	createdAsc: 1,
	sizeDesc: 2,
	nameAsc: 3,
	nameDesc: 4,
	sizeAsc: 5,
	mediaTypeAsc: 6,
	mediaTypeDesc: 7,
	updatedAsc: 8,
	updatedDesc: 9
};
function buildFilters(params) {
	const filters = [];
	if (params.mediaStates?.length) filters.push({
		filter_type: 1,
		media_state_filter: { media_states: params.mediaStates }
	});
	if (params.tags?.length) filters.push({
		filter_type: 2,
		tags_filter: { tags: params.tags }
	});
	if (params.mediaTypes?.length) filters.push({
		filter_type: 3,
		media_type_filter: { media_type: params.mediaTypes }
	});
	if (params.excludeMediaTypes?.length) filters.push({
		filter_type: 4,
		media_type_filter_out: { media_type: params.excludeMediaTypes }
	});
	return filters.length > 0 ? filters : void 0;
}
function mapRawKnowledgeItem(raw) {
	const mediaTypeInfo = raw.media_type_info ? {
		icon: raw.media_type_info.icon ?? "",
		name: raw.media_type_info.name ?? ""
	} : void 0;
	const creator = raw.creator_info ? {
		nickname: raw.creator_info.nick_name ?? "",
		isCreator: raw.creator_info.is_creator ?? false
	} : void 0;
	const fileSize = typeof raw.file_size === "number" ? raw.file_size : typeof raw.file_size === "string" ? parseInt(raw.file_size, 10) || void 0 : void 0;
	const createTime = typeof raw.create_time === "number" ? raw.create_time : typeof raw.create_time === "string" ? parseInt(raw.create_time, 10) || 0 : 0;
	return {
		mediaId: raw.media_id ?? "",
		mediaType: raw.media_type ?? 1,
		mediaTypeInfo,
		title: raw.title ?? "",
		introduction: raw.introduction,
		coverUrls: raw.cover_urls,
		tags: raw.tags,
		mediaState: raw.media_state ?? 0,
		parseProgress: raw.parse_progress,
		fileSize,
		createTime,
		timeWording: raw.time_wording,
		parentFolderId: raw.parent_folder_id ?? "",
		accessStatus: raw.access_status,
		isTop: raw.is_top,
		isFolder: raw.media_type === 99,
		folderInfo: raw.folder_info ?? null,
		creator,
		forbiddenInfo: raw.forbidden_info ?? null,
		canFetchContent: raw.can_fetch_content
	};
}
var UPLOAD_MIME_BY_EXT = {
	pdf: "application/pdf",
	md: "text/markdown",
	markdown: "text/markdown",
	txt: "text/plain",
	json: "application/json",
	csv: "text/csv",
	html: "text/html",
	htm: "text/html",
	xml: "application/xml",
	doc: "application/msword",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	xls: "application/vnd.ms-excel",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	ppt: "application/vnd.ms-powerpoint",
	pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif",
	webp: "image/webp",
	svg: "image/svg+xml",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	mp4: "video/mp4",
	zip: "application/zip"
};
function inferMimeByExt(ext) {
	return UPLOAD_MIME_BY_EXT[ext.toLowerCase()] ?? "application/octet-stream";
}
/**
* cos-nodejs-sdk-v5 的回调 err 是普通对象（`{ code, message, statusCode, RequestId }`）
* 而非 Error 实例，`String(err)` 会得到 `[object Object]` 把真因吞掉。
*/
function describeCosError(err) {
	if (err instanceof Error && err.message) return err.message;
	if (!err || typeof err !== "object") return String(err);
	const e = err;
	const parts = [];
	const push = (key, value) => {
		if (value !== void 0 && value !== null && value !== "") parts.push(`${key}=${String(value)}`);
	};
	push("code", e.code ?? e.Code);
	push("message", e.message ?? e.Message ?? e.error);
	push("statusCode", e.statusCode);
	push("requestId", e.RequestId ?? e.requestId);
	push("traceId", e.TraceId ?? e.traceId);
	push("resource", e.Resource ?? e.resource);
	if (parts.length > 0) return parts.join(" ");
	try {
		return JSON.stringify(err);
	} catch {
		return Object.prototype.toString.call(err);
	}
}
var ImaFilesApi = class {
	constructor(client, deps = {}) {
		this.client = client;
		this.fetchFn = resolveImaFetch(deps.fetchFn);
	}
	/**
	* 获取知识列表（§4.7）。
	*
	* 底层调用 IMA `POST /openapi/knowledge_base/v1/get_knowledge_list`。
	*
	* 注意：IMA 后端硬约束 `limit ∈ (0, 50]`，超出会返回 `code=51` 业务错误。
	* 这里做一次 clamp 兜底，避免上层漏传 / 误传超限值导致整个列表加载失败。
	*/
	async list(params) {
		const filters = buildFilters({
			mediaStates: params.mediaStates,
			tags: params.tags,
			mediaTypes: params.mediaTypes,
			excludeMediaTypes: params.excludeMediaTypes
		});
		const safeLimit = Math.min(50, Math.max(1, params.limit ?? 20));
		const body = {
			knowledge_base_id: params.kbId,
			cursor: params.cursor ?? "",
			limit: safeLimit
		};
		if (params.sortBy) body.sort_type = SORT_BY_TO_SORT_TYPE[params.sortBy] ?? 0;
		if (filters) body.filters = filters;
		if (params.needDefaultCover !== void 0) body.need_default_cover = params.needDefaultCover;
		if (params.version) body.version = params.version;
		if (params.folderId) body.folder_id = params.folderId;
		const raw = await this.client.post("/openapi/knowledge_base/v1/get_knowledge_list", body);
		return {
			knowledgeBaseInfo: {
				id: raw.knowledge_base_info?.id ?? "",
				name: raw.knowledge_base_info?.basic_info?.name ?? "",
				fileCount: Number(raw.knowledge_base_info?.basic_info?.knowledge_total_size) || 0
			},
			items: (raw.knowledge_list ?? []).map(mapRawKnowledgeItem),
			currentPath: (raw.current_path ?? []).map((p) => ({
				folderId: p.folder_id ?? "",
				name: p.name ?? ""
			})),
			nextCursor: raw.next_cursor || null,
			isEnd: raw.is_end ?? true,
			totalSize: Number(raw.total_size) || 0,
			version: raw.version,
			isUpdate: raw.is_update
		};
	}
	/**
	* 搜索知识（§4.8）。
	*
	* 底层调用 IMA `POST /openapi/knowledge_base/v1/search_knowledge`。
	* 注意：IMA search 接口不支持 limit，每页条数由 ima 后端决定。
	*/
	async search(params) {
		const filters = buildFilters({
			mediaStates: params.mediaStates,
			tags: params.tags,
			mediaTypes: params.mediaTypes,
			excludeMediaTypes: params.excludeMediaTypes
		});
		const body = {
			knowledge_base_id: params.kbId,
			cursor: params.cursor ?? ""
		};
		if (params.q) body.query = params.q;
		if (filters) body.filters = filters;
		if (params.folderId) body.folder_id = params.folderId;
		const raw = await this.client.post("/openapi/knowledge_base/v1/search_knowledge", body);
		return {
			items: (raw.searched_knowledge_list ?? []).map((item) => {
				const base = mapRawKnowledgeItem(item.knowledge ?? {});
				const highlights = item.highlight_content || item.highlight_title || item.highlight_tags?.length || item.highlight_category ? {
					content: item.highlight_content,
					title: item.highlight_title,
					tags: item.highlight_tags,
					category: item.highlight_category
				} : void 0;
				return {
					...base,
					parentFolderName: item.parent_folder_name,
					highlights
				};
			}),
			nextCursor: raw.next_cursor || null,
			isEnd: raw.is_end ?? true
		};
	}
	/**
	* 获取文件预览 URL。
	* 走 IMA 官方预览接口 `POST /openapi/media/v1/preview_medias`。
	*
	* 与 `getDownloadUrl` 的区别：preview 接口返回的 URL 由 IMA 侧针对**浏览器内联预览**
	* 场景做了 `Content-Disposition: inline` / 跨域头等优化；download 接口返回的 URL
	* 更偏向于触发下载。前端预览务必走本方法，下载走 getDownloadUrl。
	*/
	getViewUrl(fileId) {
		return this.fetchSingleMediaItem(fileId, "/openapi/media/v1/preview_medias");
	}
	/**
	* 获取文件下载 URL。
	* 走 IMA 官方下载接口 `POST /openapi/media/v1/download_medias`。
	*/
	getDownloadUrl(fileId) {
		return this.fetchSingleMediaItem(fileId, "/openapi/media/v1/download_medias");
	}
	/**
	* 拉取指定 URL 的文本内容（用于 markdown 等纯文本预览）。
	*
	* 设计：调用方（通常是 ImaFilePreview）已经持有 download_url
	* （由 imaFilesViewUrl/JSAPI openMedia 预拉得到），不再走 preview_medias 二次请求。
	* app-server 通过注入的 fetch 拉取文本，规避渲染端 CORS 限制。
	*
	* 失败转换：HTTP 非 2xx → throw Error；网络异常透传。
	*/
	async getContent(url$1) {
		if (!url$1) throw new Error("[ImaFilesApi] getContent: url is empty");
		let res;
		try {
			res = await this.fetchFn(url$1);
		} catch (e) {
			throw new Error(`[ImaFilesApi] getContent: fetch failed ${e instanceof Error ? e.message : String(e)}`);
		}
		if (!res.ok) throw new Error(`[ImaFilesApi] getContent: http ${res.status} ${res.statusText}`);
		return { content: await res.text() };
	}
	/**
	* 拉取指定 URL 的二进制内容（用于 PDF / Office 等非文本预览）。
	*
	* 和 getContent 对称：fetch → ArrayBuffer → base64（IPC 不能直传 ArrayBuffer）。
	* 调用方在渲染端 `atob → Uint8Array → new File([buf], name, { type })` 消费。
	*/
	async getBlob(url$2) {
		if (!url$2) throw new Error("[ImaFilesApi] getBlob: url is empty");
		let res;
		try {
			res = await this.fetchFn(url$2);
		} catch (e) {
			throw new Error(`[ImaFilesApi] getBlob: fetch failed ${e instanceof Error ? e.message : String(e)}`);
		}
		if (!res.ok) throw new Error(`[ImaFilesApi] getBlob: http ${res.status} ${res.statusText}`);
		const arrayBuffer = await res.arrayBuffer();
		return {
			base64: Buffer.from(arrayBuffer).toString("base64"),
			mimeType: res.headers.get("content-type")?.split(";")[0]?.trim() ?? "application/octet-stream",
			size: arrayBuffer.byteLength
		};
	}
	/**
	* 调用 IMA 媒体接口（preview_medias / download_medias）拿到单条文件结果。
	* 把 ret_code !== 0 的失败转成异常。
	*
	* preview_medias 与 download_medias 请求体（`{ media_ids: string[] }`）和响应体
	* （`{ results: Record<media_id, ImaDownloadMediaItem> }`）结构完全一致，故抽取为
	* 同一个内部方法，仅 path 参数化。
	*/
	async fetchSingleMediaItem(fileId, path$1) {
		const body = { media_ids: [fileId] };
		const resp = await this.client.post(path$1, body);
		const tag = path$1.split("/").pop() ?? path$1;
		const item = resp.results?.[fileId];
		if (!item) throw new Error(`[ImaFilesApi] ${tag}: missing result for media_id=${fileId}`);
		if (item.ret_code !== 0) throw new Error(`[ImaFilesApi] ${tag}: media_id=${fileId} ret_code=${item.ret_code} msg=${item.wrong_msg}`);
		return item;
	}
	async upload(params) {
		const form = new FormData();
		form.append("metadata", JSON.stringify({
			kbId: params.kbId,
			folderId: params.folderId,
			filename: params.filename,
			overwrite: params.overwrite ?? false,
			tags: params.tags
		}));
		const buffer = new Uint8Array(params.content.byteLength);
		buffer.set(params.content);
		const blob = new Blob([buffer.buffer], { type: params.mimeType });
		form.append("file", blob, params.filename);
		return this.client.postMultipart("/files/upload", form, { idempotencyKey: params.idempotencyKey });
	}
	/** Step ①：创建媒体占位 + 拿 COS 临时凭证（IMA `POST /openapi/media/v1/create_media`） */
	createMedia(params) {
		return this.client.post("/openapi/media/v1/create_media", {
			file_name: params.fileName,
			file_size: params.fileSize,
			content_type: params.contentType,
			knowledge_base_id: params.knowledgeBaseId,
			file_ext: params.fileExt
		});
	}
	/** Step ③：COS 上传完成后入库（IMA `POST /openapi/knowledge_base/v1/add_knowledge`） */
	addKnowledge(params) {
		return this.client.post("/openapi/knowledge_base/v1/add_knowledge", {
			media_id: params.mediaId,
			knowledge_base_id: params.knowledgeBaseId,
			folder_id: params.folderId ?? ""
		});
	}
	/**
	* Step ②：用 STS 凭证把 Buffer 直传 COS（cos-nodejs-sdk-v5 putObject）。
	* 凭证仅在 app-server 内构造 client，不出 app-server。单次 PUT 适合 <50MB；大文件可切 sliceUploadFile。
	*/
	uploadToCos(cred, body, contentType, onProgress) {
		const cos = new import_cos_nodejs_sdk_v5.default({
			SecretId: cred.secret_id,
			SecretKey: cred.secret_key,
			SecurityToken: cred.token
		});
		return new Promise((resolve, reject) => {
			cos.putObject({
				Bucket: cred.bucket_name,
				Region: cred.region,
				Key: cred.cos_key,
				Body: body,
				ContentType: contentType,
				onProgress: onProgress ? (info) => {
					try {
						onProgress(info);
					} catch {}
				} : void 0
			}, (err, data) => {
				if (err) {
					reject(/* @__PURE__ */ new Error(`[ImaFilesApi] COS putObject failed: ${describeCosError(err)}`));
					return;
				}
				if (data?.statusCode && data.statusCode >= 300) {
					reject(/* @__PURE__ */ new Error(`[ImaFilesApi] COS putObject http ${data.statusCode}`));
					return;
				}
				resolve();
			});
		});
	}
	/**
	* 「保存到 ima 知识库」一站式 API：编排 ① + ② + ③。
	* 任一步失败直接抛出；上一步残留的 media 占位 / COS 对象由 IMA 后端按过期回收。
	*/
	async uploadByPath(params) {
		const { signal } = params;
		/** 若 signal 已 abort，抛出 AbortError 中断流程 */
		const throwIfAborted = () => {
			if (signal?.aborted) {
				const err = /* @__PURE__ */ new Error("Upload cancelled");
				err.name = "AbortError";
				throw err;
			}
		};
		const emit = (stage, percent, extra) => {
			if (!params.onProgress) return;
			const p = Math.max(0, Math.min(100, Math.floor(percent)));
			try {
				params.onProgress({
					stage,
					percent: p,
					...extra
				});
			} catch {}
		};
		throwIfAborted();
		emit("prepare", 0);
		const localPath = normalizeLocalPath(params.filePath);
		const filename = params.filename ?? path.basename(localPath);
		const ext = path.extname(filename).slice(1).toLowerCase();
		const MB_BYTES = 1048576;
		const FALLBACK_MAX_UPLOAD_SIZE_BYTES = 200 * MB_BYTES;
		const MAX_UPLOAD_SIZE_BYTES = {
			pdf: 200 * MB_BYTES,
			doc: 200 * MB_BYTES,
			docx: 200 * MB_BYTES,
			xls: 10 * MB_BYTES,
			xlsx: 10 * MB_BYTES,
			csv: 10 * MB_BYTES,
			ppt: 200 * MB_BYTES,
			pptx: 200 * MB_BYTES,
			jpg: 30 * MB_BYTES,
			jpeg: 30 * MB_BYTES,
			png: 30 * MB_BYTES,
			webp: 30 * MB_BYTES,
			wav: 200 * MB_BYTES,
			aac: 200 * MB_BYTES,
			mp3: 200 * MB_BYTES,
			m4a: 200 * MB_BYTES,
			txt: 10 * MB_BYTES,
			md: 10 * MB_BYTES,
			xmind: 10 * MB_BYTES
		}[ext] ?? FALLBACK_MAX_UPLOAD_SIZE_BYTES;
		const formatHumanSize = (bytes) => {
			if (!Number.isFinite(bytes) || bytes < 0) return `${bytes} B`;
			const units = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			];
			let value = bytes;
			let unitIdx = 0;
			while (value >= 1024 && unitIdx < units.length - 1) {
				value /= 1024;
				unitIdx += 1;
			}
			const digits = value < 10 ? 2 : 1;
			return `${value.toFixed(digits)} ${units[unitIdx]}`;
		};
		let stat;
		try {
			stat = await fs_promises.stat(localPath);
		} catch (e) {
			console.error("[ImaFilesApi] stat failed:", e);
			throw e;
		}
		if (stat.size > MAX_UPLOAD_SIZE_BYTES) {
			const humanSize = formatHumanSize(stat.size);
			const limitHuman = formatHumanSize(MAX_UPLOAD_SIZE_BYTES);
			console.error(`[ImaFilesApi] file too large: ext=${ext} bytes=${stat.size} (${humanSize}), limit=${limitHuman}`);
			throw new Error(`当前文件 ${humanSize}，超出 ${limitHuman} 大小上限`);
		}
		let buffer;
		try {
			buffer = await fs_promises.readFile(localPath);
		} catch (e) {
			if (e instanceof RangeError && /greater than|too large/i.test(e.message ?? "")) {
				const humanSize = formatHumanSize(stat.size);
				const limitHuman = formatHumanSize(MAX_UPLOAD_SIZE_BYTES);
				throw new Error(`当前文件 ${humanSize}，超出 ${limitHuman} 大小上限`);
			}
			throw e;
		}
		const contentType = params.contentType ?? inferMimeByExt(ext);
		const fileSize = buffer.byteLength;
		emit("prepare", 5);
		throwIfAborted();
		emit("createMedia", 5);
		const created = await this.createMedia({
			fileName: filename,
			fileSize,
			contentType,
			knowledgeBaseId: params.kbId,
			fileExt: ext
		});
		if (!created?.media_id || !created?.cos_credential) throw new Error("[ImaFilesApi] createMedia: empty media_id or cos_credential");
		emit("createMedia", 10);
		throwIfAborted();
		emit("cosPut", 10, {
			loaded: 0,
			total: fileSize
		});
		await this.uploadToCos(created.cos_credential, buffer, contentType, (info) => {
			const mapped = 10 + info.percent * 85;
			emit("cosPut", mapped, {
				loaded: info.loaded,
				total: info.total
			});
		});
		emit("cosPut", 95, {
			loaded: fileSize,
			total: fileSize
		});
		throwIfAborted();
		emit("addKnowledge", 95);
		await this.addKnowledge({
			mediaId: created.media_id,
			knowledgeBaseId: params.kbId,
			folderId: params.folderId
		});
		emit("addKnowledge", 100);
		return {
			fileId: created.media_id,
			kbId: params.kbId,
			folderId: params.folderId ?? null,
			name: filename,
			size: fileSize
		};
	}
};
/**
* 把 `file:///...` URL 形式的路径转成本地文件系统路径。
*/
function normalizeLocalPath(input) {
	if (!input) return input;
	if (input.startsWith("file://")) try {
		return (0, url.fileURLToPath)(input);
	} catch {
		return input.replace(/^file:\/{2,3}/, "/");
	}
	return input;
}
//#endregion
//#region ../../packages/workbuddy-server/src/ima/api/kb-api.ts
var ImaKnowledgeBaseApi = class {
	constructor(client) {
		this.client = client;
	}
	async list(params = {}) {
		const types = params.types && params.types.length > 0 ? params.types : [
			1001,
			1002,
			1004,
			1005
		];
		const limit = params.limit ?? 20;
		const cursors = params.cursors ?? {};
		const imaParams = types.map((type) => ({
			type,
			cursor: cursors[type] ?? "",
			limit
		}));
		return { groups: transformResults((await this.client.post("/openapi/knowledge_base/v1/get_knowledge_base_list", { params: imaParams })).results) };
	}
	/**
	* 按关键词搜索当前用户可见范围内的知识库。
	*
	* 底层调用 IMA `POST /openapi/knowledge_base/v1/search_knowledge_base`。
	* 响应体为 `{ info_list, is_end, next_cursor }`，UI 侧只消费 camelCase
	* 归一后的 `{ items, nextCursor, isEnd }`。
	*/
	async search(params) {
		const body = {
			query: params.query,
			cursor: params.cursor ?? "",
			limit: Math.max(1, Math.min(20, params.limit ?? 20))
		};
		const raw = await this.client.post("/openapi/knowledge_base/v1/search_knowledge_base", body);
		return {
			items: (raw.info_list ?? []).map(transformSearchItem),
			nextCursor: raw.next_cursor || null,
			isEnd: raw.is_end ?? true
		};
	}
	/**
	* 通过分享链接获取知识库信息（名称、封面等）。
	*
	* 底层调用 IMA `POST /openapi/knowledge_base/v1/get_knowledge_base_info_by_share_link`。
	* 用于粘贴链接后 resolve chip 标题。
	*/
	async getInfoByShareLink(shareLink) {
		try {
			const info = (await this.client.post("/openapi/knowledge_base/v1/get_knowledge_base_info_by_share_link", { share_link: shareLink })).knowledge_base_info;
			if (!info?.basic_info?.name) return null;
			return {
				name: info.basic_info.name,
				id: info.id ?? "",
				coverUrl: info.basic_info.cover_url || void 0
			};
		} catch {
			return null;
		}
	}
};
function transformSearchItem(raw) {
	return {
		id: raw.id ?? "",
		name: raw.name ?? "",
		highlightName: raw.highlight_name,
		coverUrl: raw.cover_url,
		type: raw.type
	};
}
/**
* 把 IMA 原始 `results[]` 转换为 `KnowledgeBaseGroup[]`。
*/
function transformResults(results) {
	if (!Array.isArray(results)) return [];
	return results.filter((r) => r && typeof r === "object").map((r) => ({
		type: r.type,
		typeName: r.knowledge_base_list_name ?? "",
		items: (r.knowledge_base_list ?? []).map(transformKbItem),
		nextCursor: r.next_cursor || null,
		isEnd: r.is_end ?? true
	}));
}
/**
* 把 IMA 原始 knowledge_base_list 条目转为内部 `ImaKnowledgeBase`。
*/
function transformKbItem(raw) {
	const info = raw.basic_info ?? {};
	return {
		id: raw.id,
		name: info.name ?? "",
		description: info.description ?? void 0,
		coverUrl: info.cover_url ?? void 0,
		coverBackgroundColor: info.cover_background_color,
		size: info.size ? Number(info.size) : void 0,
		fileCount: info.knowledge_total_size ? Number(info.knowledge_total_size) : 0,
		creator: info.creator ? {
			nickname: info.creator.nickname ?? "",
			avatarUrl: info.creator.avatar_url
		} : void 0,
		memberCount: raw.member_info?.member_count,
		permissions: {
			accessStatus: raw.permission_info?.access_status ?? 0,
			visibleExportStatus: raw.permission_info?.visible_export_status,
			joinType: raw.permission_info?.join_type,
			roleType: raw.user_permission_info?.role_type,
			canAddKnowledge: raw.user_permission_info?.can_add_knowledge
		},
		isTop: raw.is_top,
		statistics: raw.statistics ? { viewAndQa: raw.statistics.view_and_qa } : void 0,
		paymentInfo: raw.payment_info
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/ima/auth-event-emitter.ts
var ImaAuthEventEmitter = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.lastValue = void 0;
	}
	/** 订阅。返回 Disposable。 */
	on(cb) {
		this.listeners.add(cb);
		return { dispose: () => this.listeners.delete(cb) };
	}
	/** 触发事件（去重：连续相同值不重复派发） */
	emit(authed) {
		if (this.lastValue === authed) return;
		this.lastValue = authed;
		for (const cb of this.listeners) try {
			cb(authed);
		} catch {}
	}
	/** 仅当状态真正变化才触发；外部也可直接 emit。 */
	getLast() {
		return this.lastValue;
	}
	dispose() {
		this.listeners.clear();
	}
};
var ImaUploadEventEmitter = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
	}
	on(cb) {
		this.listeners.add(cb);
		return { dispose: () => this.listeners.delete(cb) };
	}
	emit(payload) {
		for (const cb of this.listeners) try {
			cb(payload);
		} catch {}
	}
	dispose() {
		this.listeners.clear();
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/ima-service.ts
var ImaService = class {
	constructor(options) {
		this.authEvents = new ImaAuthEventEmitter();
		this.uploadEvents = new ImaUploadEventEmitter();
		const client = options.client;
		this.auth = new ImaAuthApi(client, {
			productManager: options.productManager,
			authenticationManager: options.authenticationManager,
			fetchFn: options.fetchFn
		});
		this.kb = new ImaKnowledgeBaseApi(client);
		this.files = new ImaFilesApi(client, { fetchFn: options.fetchFn });
	}
	/** 订阅授权状态变化事件。 */
	onAuthChanged(cb) {
		return this.authEvents.on(cb);
	}
	/**
	* 主动触发授权状态广播（供 deep link handler / postMessage 桥调用）。
	* 内部会去重，相同值不会重复通知。
	*/
	notifyAuthChanged(authed) {
		this.authEvents.emit(authed);
	}
	/** 获取最近一次广播的状态，未广播时返回 undefined。 */
	getLastAuthState() {
		return this.authEvents.getLast();
	}
	/** 订阅「保存到 ima 知识库」的上传链路进度事件。 */
	onUploadProgress(cb) {
		return this.uploadEvents.on(cb);
	}
	/** 主动触发上传进度事件（由 ImaFilesApi.uploadByPath 回调驱动）。 */
	notifyUploadProgress(payload) {
		this.uploadEvents.emit(payload);
	}
	dispose() {
		this.authEvents.dispose();
		this.uploadEvents.dispose();
	}
};
//#endregion
//#region src/main/system/platform/ioa-machine-detector.ts
/**
* IOA Machine Detector (main process).
*
* Detects whether the host machine has a valid Tencent IOA client installed
* by checking filesystem paths and verifying code signatures.
*
* - Mac: /Applications/iOA/iOA.app + codesign team ID 88L2Q4487U
* - Windows: iOABiz service + service/registry path + Authenticode signature
* - Linux: always false (no IOA client for Linux)
*
* Result is cached for the process lifetime (detection runs at most once).
* All errors are swallowed — detection failure = not an IOA machine.
*
* This stays in the Electron desktop package as a host capability; channel
* restriction policy lives in workbuddy-server.
*/
var execFile = (0, node_util.promisify)(node_child_process.execFile);
/** Expected codesign team identifier for Tencent IOA on macOS. */
var MACOS_IOA_TEAM_ID = "88L2Q4487U";
/** Expected path for IOA app on macOS. */
var MACOS_IOA_PATH = "/Applications/iOA/iOA.app";
/** Expected signer subject substring for Windows Authenticode. */
var WIN_SIGNER_SUBJECT = "Tencent Technology (Shenzhen) Company Limited";
/** Windows service name for the IOA business client. */
var WIN_IOA_SERVICE_NAME = "iOABiz";
/** Windows IOA business executable name. */
var WIN_IOA_EXE_NAME = "iOABiz.exe";
/** Registry keys for IOA client install directory on Windows. */
var WIN_IOA_REGISTRY_KEYS = ["HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ioaclient", "HKEY_LOCAL_MACHINE\\SOFTWARE\\ioaclient"];
var WIN_SERVICE_PATH_COMMAND = [
	`$service = Get-CimInstance -ClassName Win32_Service -Filter "Name='${WIN_IOA_SERVICE_NAME}'" -ErrorAction SilentlyContinue`,
	"if ($null -eq $service) { exit 1 }",
	"$service.PathName"
].join("; ");
var WIN_SIGNATURE_SUBJECT_COMMAND = [
	"$sig = Get-AuthenticodeSignature -LiteralPath $env:WB_IOA_EXE_PATH",
	"if ($sig.Status -ne \"Valid\" -or $null -eq $sig.SignerCertificate) { exit 1 }",
	"$sig.SignerCertificate.Subject"
].join("; ");
var cached;
/**
* Detect whether the current machine has a valid IOA client installed.
* Result is cached — subsequent calls return immediately.
*/
async function detectIOAMachine() {
	if (cached !== void 0) return cached;
	try {
		if (process.platform === "darwin") cached = await detectIOAMacOS();
		else if (process.platform === "win32") cached = await detectIOAWindows();
		else cached = false;
	} catch {
		cached = false;
	}
	return cached;
}
async function detectIOAMacOS() {
	if (!node_fs.existsSync(MACOS_IOA_PATH)) return false;
	try {
		await execFile("codesign", [
			"--verify",
			"--verbose=0",
			MACOS_IOA_PATH
		], { timeout: 5e3 });
	} catch {
		return false;
	}
	try {
		const { stderr } = await execFile("codesign", [
			"-d",
			"--verbose=2",
			MACOS_IOA_PATH
		], { timeout: 5e3 });
		return stderr.includes(MACOS_IOA_TEAM_ID);
	} catch {
		return false;
	}
}
async function detectIOAWindows() {
	if (!await isWindowsIOABizServiceInstalled()) return false;
	const serviceExePath = await readWindowsIOABizServiceExePath();
	if (serviceExePath && await isValidWindowsIOAExecutable(serviceExePath)) return true;
	for (const registryKey of WIN_IOA_REGISTRY_KEYS) {
		const installDir = await readWindowsIOAInstallDir(registryKey);
		if (!installDir) continue;
		if (await isValidWindowsIOAExecutable(`${installDir}\\${WIN_IOA_EXE_NAME}`)) return true;
	}
	return false;
}
async function isWindowsIOABizServiceInstalled() {
	try {
		await execFile("sc.exe", ["query", WIN_IOA_SERVICE_NAME], {
			timeout: 5e3,
			windowsHide: true
		});
		return true;
	} catch {
		return false;
	}
}
async function readWindowsIOABizServiceExePath() {
	try {
		const { stdout } = await execFile("powershell", [
			"-NoProfile",
			"-NonInteractive",
			"-Command",
			WIN_SERVICE_PATH_COMMAND
		], {
			timeout: 5e3,
			windowsHide: true
		});
		return parseWindowsExecutablePath(stdout);
	} catch {
		return;
	}
}
async function readWindowsIOAInstallDir(registryKey) {
	try {
		const { stdout } = await execFile("reg", [
			"query",
			registryKey,
			"/v",
			"InstallDir"
		], {
			timeout: 5e3,
			windowsHide: true
		});
		return stdout.match(/InstallDir\s+REG_SZ\s+(.+)/i)?.[1]?.trim() || void 0;
	} catch {
		return;
	}
}
async function isValidWindowsIOAExecutable(exePath) {
	if (!node_fs.existsSync(exePath)) return false;
	try {
		const { stdout } = await execFile("powershell", [
			"-NoProfile",
			"-NonInteractive",
			"-Command",
			WIN_SIGNATURE_SUBJECT_COMMAND
		], {
			timeout: 1e4,
			windowsHide: true,
			env: {
				...process.env,
				WB_IOA_EXE_PATH: exePath
			}
		});
		return stdout.includes(WIN_SIGNER_SUBJECT);
	} catch {
		return false;
	}
}
function parseWindowsExecutablePath(value) {
	const pathText = value.trim();
	if (!pathText) return;
	const quoted = pathText.match(/^"([^"]+?\.exe)"/i);
	if (quoted?.[1]) return quoted[1].trim();
	return pathText.match(/^(.+?\.exe)(?:\s|$)/i)?.[1]?.trim() || void 0;
}
//#endregion
//#region src/main/daemon/app-server/celljs-deps.ts
function resolveCellJSDeps(container, options) {
	const { windowManager } = options;
	return require_server.resolveWorkbuddyAppServerCellJSDeps(container, {
		database: options.database,
		getColorScheme: options.getColorScheme,
		...windowManager ? { sessionEvents: {
			onSessionUpsert: (session) => {
				windowManager.broadcast("session:upserted", session);
				windowManager.notifyTraySessionChanged?.();
			},
			onSessionDeleted: (payload) => {
				windowManager.broadcast("session:deleted", payload);
				windowManager.notifyTraySessionChanged?.();
			}
		} } : {},
		runtime: {
			getAppName: require_code_cache.getWorkbuddyRuntimeAppName,
			getAppVersion: require_code_cache.getWorkbuddyRuntimeAppVersion,
			getUserDataDir: require_code_cache.getWorkbuddyRuntimeUserDataDir
		},
		i18n: {
			getMenuLocale: require_log_acl_guard.getMenuLocale,
			translateAutomationTestMessage: require_log_acl_guard.getRendererTranslation
		},
		createImaService: ({ logger, productManager, authenticationManager }) => {
			return new ImaService({
				client: new ImaBackendClient({
					logger: {
						info: (message, ...args) => logger.info(String(message), ...args),
						warn: (message, ...args) => logger.warn(String(message), ...args),
						error: (message, ...args) => logger.error(String(message), ...args),
						debug: (message, ...args) => logger.debug(String(message), ...args)
					},
					productManager,
					authenticationManager
				}),
				productManager,
				authenticationManager
			});
		},
		getCoordinator: (celljs) => celljs.get(require_log_acl_guard.WorkbuddyAuthProductCoordinator),
		waitUntilExecutionReady: (coordinator) => coordinator.waitRemoteReady(),
		detectIOAMachine
	});
}
//#endregion
Object.defineProperty(exports, "resolveCellJSDeps", {
	enumerable: true,
	get: function() {
		return resolveCellJSDeps;
	}
});
