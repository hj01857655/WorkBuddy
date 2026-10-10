const require_process_cpu_sampler = require("./process-cpu-sampler.js");
//#region ../../packages/workbuddy-server/src/server/credential-protection-bootstrap.ts
require_process_cpu_sampler.init_dist();
var WORKBUDDY_CREDENTIAL_PROTECTION_ENV = "WORKBUDDY_AT_REST_ENCRYPTION";
var DAEMON_CREDENTIAL_PROTECTION_BOOTSTRAP_CHANNEL = "daemon:credential-protection-bootstrap";
function readWorkbuddyCredentialProtectionPolicy(env) {
	const policy = env[WORKBUDDY_CREDENTIAL_PROTECTION_ENV];
	return require_process_cpu_sampler.isAtRestEncryptionPolicy(policy) ? policy : "off";
}
var DaemonCredentialProtectionBootstrapGate = class {
	constructor(expectedPolicy, onBootstrap, onEvent) {
		this.expectedPolicy = expectedPolicy;
		this.onBootstrap = onBootstrap;
		this.onEvent = onEvent;
		this.timeoutFallback = false;
		this.promise = new Promise((resolve) => {
			this.resolve = resolve;
		});
	}
	register(server) {
		server.handle(DAEMON_CREDENTIAL_PROTECTION_BOOTSTRAP_CHANNEL, (payload) => this.accept(payload));
	}
	async wait(timeoutMs = 5e3) {
		if (this.bootstrap) {
			this.emit({
				event: "wait-reused",
				atMs: Date.now(),
				policy: this.expectedPolicy
			});
			return this.bootstrap;
		}
		this.emit({
			event: "wait-started",
			atMs: Date.now(),
			policy: this.expectedPolicy,
			timeoutMs
		});
		let timeout;
		const fallback = new Promise((resolve) => {
			timeout = setTimeout(() => {
				const unavailable = require_process_cpu_sampler.createUnavailableAtRestEncryptionBootstrap(this.expectedPolicy, "timeout");
				this.bootstrap = unavailable;
				this.timeoutFallback = true;
				this.emit({
					event: "fallback-selected",
					atMs: Date.now(),
					policy: this.expectedPolicy,
					reason: "timeout"
				});
				this.resolve(unavailable);
				this.onBootstrap?.(unavailable);
				resolve(unavailable);
			}, timeoutMs);
			timeout.unref?.();
		});
		try {
			return await Promise.race([this.promise, fallback]);
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}
	dispose() {
		if (this.bootstrap) {
			require_process_cpu_sampler.disposeAtRestEncryptionBootstrap(this.bootstrap);
			this.bootstrap = void 0;
		}
		this.fingerprint = void 0;
	}
	accept(payload) {
		this.emit({
			event: "payload-received",
			atMs: Date.now(),
			policy: this.expectedPolicy
		});
		let incoming;
		try {
			incoming = require_process_cpu_sampler.decodeAtRestEncryptionBootstrap(payload);
		} catch {
			this.emit({
				event: "payload-rejected",
				atMs: Date.now(),
				policy: this.expectedPolicy,
				reason: "decode"
			});
			return {
				ok: false,
				policy: this.expectedPolicy,
				errorCategory: "transport"
			};
		}
		if (incoming.policy !== this.expectedPolicy) {
			require_process_cpu_sampler.disposeAtRestEncryptionBootstrap(incoming);
			this.emit({
				event: "payload-rejected",
				atMs: Date.now(),
				policy: this.expectedPolicy,
				reason: "policy-mismatch"
			});
			return {
				ok: false,
				policy: this.expectedPolicy,
				errorCategory: "mode-mismatch"
			};
		}
		const incomingFingerprint = fingerprint(incoming);
		if (this.bootstrap && !this.timeoutFallback) {
			const matches = this.fingerprint === incomingFingerprint;
			require_process_cpu_sampler.disposeAtRestEncryptionBootstrap(incoming);
			this.emit(matches ? {
				event: "payload-duplicate",
				atMs: Date.now(),
				policy: this.expectedPolicy
			} : {
				event: "payload-rejected",
				atMs: Date.now(),
				policy: this.expectedPolicy,
				reason: "conflict"
			});
			return matches ? {
				ok: true,
				policy: this.expectedPolicy
			} : {
				ok: false,
				policy: this.expectedPolicy,
				errorCategory: "conflict"
			};
		}
		const late = this.timeoutFallback;
		if (this.bootstrap) require_process_cpu_sampler.disposeAtRestEncryptionBootstrap(this.bootstrap);
		this.bootstrap = incoming;
		this.fingerprint = incomingFingerprint;
		this.timeoutFallback = false;
		this.resolve(incoming);
		this.onBootstrap?.(incoming);
		this.emit({
			event: "payload-accepted",
			atMs: Date.now(),
			policy: this.expectedPolicy,
			late
		});
		return {
			ok: true,
			policy: this.expectedPolicy
		};
	}
	emit(event) {
		try {
			this.onEvent?.(event);
		} catch {}
	}
};
function fingerprint(bootstrap) {
	return JSON.stringify(require_process_cpu_sampler.encodeAtRestEncryptionBootstrap(bootstrap));
}
//#endregion
Object.defineProperty(exports, "DAEMON_CREDENTIAL_PROTECTION_BOOTSTRAP_CHANNEL", {
	enumerable: true,
	get: function() {
		return DAEMON_CREDENTIAL_PROTECTION_BOOTSTRAP_CHANNEL;
	}
});
Object.defineProperty(exports, "DaemonCredentialProtectionBootstrapGate", {
	enumerable: true,
	get: function() {
		return DaemonCredentialProtectionBootstrapGate;
	}
});
Object.defineProperty(exports, "WORKBUDDY_CREDENTIAL_PROTECTION_ENV", {
	enumerable: true,
	get: function() {
		return WORKBUDDY_CREDENTIAL_PROTECTION_ENV;
	}
});
Object.defineProperty(exports, "readWorkbuddyCredentialProtectionPolicy", {
	enumerable: true,
	get: function() {
		return readWorkbuddyCredentialProtectionPolicy;
	}
});
