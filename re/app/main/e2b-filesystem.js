require("./rolldown-runtime.js");
const require_dist = require("./dist.js");
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/e2b-filesystem.ts
/**
* E2B Filesystem Implementation
*
* Provides FilesResource implementation using E2B Sandbox SDK.
* Supports optional auto-reconnect on auth failure (401/403).
*
* @see https://e2b.dev/docs/filesystem/read-write
* @see https://e2b.dev/docs/filesystem/watch
*/
/**
* E2B Filesystem
*
* Wraps E2B Sandbox SDK's filesystem operations to implement FilesResource.
* When `reconnectFn` is provided, automatically reconnects on auth errors.
*
* @example
* ```typescript
* // Basic usage (no auto-reconnect)
* const fs = await E2BFilesystem.connect({ sandboxId: '...' });
*
* // With auto-reconnect on token expiry
* const fs = await E2BFilesystem.connect({ sandboxId: '...' });
* fs.setReconnectFn(async () => fetchFreshConnectionInfo());
* ```
*/
var E2BFilesystem = class E2BFilesystem {
	static {
		this.MIN_RECONNECT_INTERVAL_MS = 1e4;
	}
	constructor(sandbox) {
		this.isReconnecting = false;
		this.reconnectSubscribers = [];
		this.lastReconnectAt = 0;
		this.sandbox = sandbox;
	}
	/**
	* Connect to an E2B Sandbox and create filesystem instance
	*/
	static async connect(info) {
		const sandbox = await require_dist.Sandbox.connect(info.sandboxId, {
			domain: info.domain,
			apiUrl: info.apiUrl,
			requestTimeoutMs: info.requestTimeoutMs,
			debug: info.debug,
			headers: info.headers
		});
		return new E2BFilesystem(sandbox);
	}
	/**
	* Set reconnect callback. When set, auth errors trigger automatic reconnect + retry.
	*/
	setReconnectFn(fn) {
		this.reconnectFn = fn;
	}
	/**
	* Get the underlying E2B Sandbox instance
	*/
	getSandbox() {
		return this.sandbox;
	}
	isAuthError(error) {
		if (!error || typeof error !== "object") return false;
		const err = error;
		if (err.status === 401 || err.status === 403) return true;
		if (err.statusCode === 401 || err.statusCode === 403) return true;
		if (err.response && typeof err.response === "object") {
			const resp = err.response;
			if (resp.status === 401 || resp.status === 403) return true;
		}
		if (typeof err.message === "string") {
			const msg = err.message.toLowerCase();
			if (msg.includes("unauthorized") || msg.includes("token expired") || msg.includes("authentication")) return true;
		}
		return false;
	}
	canAttemptReconnect() {
		return Date.now() - this.lastReconnectAt >= E2BFilesystem.MIN_RECONNECT_INTERVAL_MS;
	}
	/**
	* Reconnect with fresh credentials.
	* Only one reconnect in-flight at a time; concurrent callers share the result.
	*/
	async reconnect() {
		if (this.isReconnecting) return new Promise((resolve, reject) => {
			this.reconnectSubscribers.push((success) => {
				if (success) resolve();
				else reject(/* @__PURE__ */ new Error("E2B sandbox reconnect failed"));
			});
		});
		this.isReconnecting = true;
		this.lastReconnectAt = Date.now();
		try {
			const info = await this.reconnectFn();
			const newSandbox = await require_dist.Sandbox.connect(info.sandboxId, {
				domain: info.domain,
				apiUrl: info.apiUrl,
				requestTimeoutMs: info.requestTimeoutMs,
				debug: info.debug,
				headers: info.headers
			});
			this.sandbox = newSandbox;
			this.reconnectSubscribers.forEach((cb) => cb(true));
			this.reconnectSubscribers = [];
		} catch (error) {
			this.reconnectSubscribers.forEach((cb) => cb(false));
			this.reconnectSubscribers = [];
			throw error;
		} finally {
			this.isReconnecting = false;
		}
	}
	/**
	* Execute an operation. If reconnectFn is set and an auth error occurs,
	* reconnect and retry once.
	*/
	async exec(operation) {
		try {
			return await operation(this.sandbox.files);
		} catch (error) {
			if (this.reconnectFn && this.isAuthError(error) && this.canAttemptReconnect()) {
				await this.reconnect();
				return operation(this.sandbox.files);
			}
			throw error;
		}
	}
	read(path, opts) {
		return this.exec((f) => f.read(path, opts));
	}
	write(pathOrFiles, dataOrOpts, opts) {
		return this.exec((f) => {
			if (Array.isArray(pathOrFiles)) return f.write(pathOrFiles, dataOrOpts);
			return f.write(pathOrFiles, dataOrOpts, opts);
		});
	}
	async list(path, opts) {
		return this.exec((f) => f.list(path, opts));
	}
	async exists(path, opts) {
		return this.exec((f) => f.exists(path, opts));
	}
	async makeDir(path, opts) {
		return this.exec((f) => f.makeDir(path, opts));
	}
	async remove(path, opts) {
		return this.exec((f) => f.remove(path, opts));
	}
	async rename(oldPath, newPath, opts) {
		return this.exec((f) => f.rename(oldPath, newPath, opts));
	}
	async getInfo(path, opts) {
		return this.exec((f) => f.getInfo(path, opts));
	}
	async watchDir(path, onEvent, opts) {
		return this.exec((f) => f.watchDir(path, onEvent, opts));
	}
};
//#endregion
exports.E2BFilesystem = E2BFilesystem;
