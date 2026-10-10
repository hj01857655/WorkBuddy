const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jszip.min-DbflLdr6.js","./rolldown-runtime-V4kyJ4NV.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Bv as openPurchaseModal, C4 as init_appearance_storage_namespace, Cq as init_telemetry_context, E as init_contexts, G2 as getWebsiteUrl, Iv as init_purchase, K2 as init_environment, L3 as init_account_context, LQ as init_account, R3 as useAccount, S4 as APPEARANCE_ZIP_CACHE_ORIGIN, V3 as useAdapter, X2 as isInternationalVersion, b0 as writeRendererLog, b4 as APPEARANCE_STATE_KEY, d4 as init_theme, g4 as APPEARANCE_LAST_APPLIED_KEY, m4 as APPEARANCE_EXPIRED_PROMPT_KEY, p4 as APPEARANCE_CSS_CACHE_KEY, u4 as getThemeManager, wq as useAgentTelemetry, x4 as APPEARANCE_ZIP_CACHE_NAME, zZ as init_http_logger } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Ov as __vitePreload, kv as init_preload_helper } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/utils/skin/resource-policy.ts
function isBlockedIpv4(hostname) {
	const parts = hostname.split(".").map(Number);
	if (parts.length !== 4 || parts.some((part, index) => !/^\d{1,3}$/.test(hostname.split(".")[index]) || part > 255)) return false;
	const [a, b] = parts;
	return a === 0 || a === 10 || a === 11 || a === 21 || a === 30 || a === 127 || a >= 224 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 0 || b === 168) || a === 198 && (b === 18 || b === 19 || b === 51) || a === 203 && b === 0;
}
function isTrustedResourceHostname(hostname) {
	const host = hostname.toLowerCase();
	return host === (typeof window === "undefined" ? void 0 : window.location.hostname.toLowerCase()) || TRUSTED_THEME_RESOURCE_HOSTS.some((suffix) => suffix.startsWith(".") ? host.endsWith(suffix) : host === suffix);
}
function isBlockedHostname(hostname) {
	const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
	if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || !host.includes(".")) return true;
	if (host.includes(":")) return host === "::1" || host === "::" || host.startsWith("fc") || host.startsWith("fd") || /^fe[89ab]/.test(host) || host.startsWith("::ffff:");
	return isBlockedIpv4(host);
}
function assertSafeThemeResourceUrl(rawUrl) {
	let hostname = "<parse-fail>";
	let reason = "parse-fail";
	try {
		const url = new URL(rawUrl);
		hostname = url.hostname;
		if (url.protocol !== "https:") reason = `bad-protocol=${url.protocol}`;
		else if (url.username || url.password) reason = "has-credential";
		else if (url.port) reason = `has-port=${url.port}`;
		else if (isBlockedHostname(url.hostname)) reason = "blocked-host";
		else if (!isTrustedResourceHostname(url.hostname)) reason = "untrusted-host";
		else return url.toString();
	} catch {}
	throw new Error(`[skin] Unsafe theme resource URL (host=${hostname}, reason=${reason})`);
}
function getSafeThemeResourceUrl(rawUrl) {
	if (!rawUrl) return;
	try {
		return assertSafeThemeResourceUrl(rawUrl);
	} catch {
		return;
	}
}
function sanitizeThemeCss(css) {
	if (css.length > MAX_THEME_CSS_BYTES) throw new Error(`[skin] theme CSS too large (${css.length} bytes)`);
	return css.trim();
}
var TRUSTED_THEME_RESOURCE_HOSTS, MAX_THEME_CSS_BYTES;
var init_resource_policy = __esmMin((() => {
	TRUSTED_THEME_RESOURCE_HOSTS = [
		".codebuddy.cn",
		".myqcloud.com",
		".tencentcos.cn"
	];
	MAX_THEME_CSS_BYTES = 1048576;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/use-upgrade.ts
function useUpgradeAction() {
	const adapter = useAdapter();
	const { account } = useAccount();
	const { reportEvent, Events } = useAgentTelemetry();
	const isLocalMode = adapter?.environmentType === "local";
	/** 当前订阅版本 → 埋点字段（与 PlanActionButton 保持一致的映射） */
	const getPlanType = (0, import_react.useCallback)(() => {
		switch (account?.editionType) {
			case "flagship": return "flagship";
			case "advanced": return "advanced";
			case "pro": return "standard";
			default: return "free";
		}
	}, [account?.editionType]);
	return { openUpgrade: (0, import_react.useCallback)(() => {
		let isSuccessful = true;
		try {
			if (isInternationalVersion()) adapter?.emit("open-external", getWebsiteUrl(PLAN_URL_OVERSEA));
			else if (isLocalMode) openPurchaseModal({
				url: "/pricing?embed=1",
				source: "upgrade"
			});
			else window.open(PLAN_URL, "_blank");
		} catch (error) {
			isSuccessful = false;
			console.warn("[AppearanceDomain] open upgrade failed:", String(error));
		}
		reportEvent(Events.SubscribeEntryClick, {
			action: "upgrade",
			type: getPlanType(),
			isSuccessful
		});
	}, [
		adapter,
		isLocalMode,
		reportEvent,
		Events,
		getPlanType
	]) };
}
var import_react, PLAN_URL, PLAN_URL_OVERSEA;
var init_use_upgrade = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_purchase();
	init_contexts();
	init_account_context();
	init_telemetry_context();
	init_environment();
	PLAN_URL = "/pricing";
	PLAN_URL_OVERSEA = "/profile/plan";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/appearance/types.ts
/** 类型守卫：resource 是主题。 */
function isThemeResource(resource) {
	return resource.kind === "theme";
}
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/appearance/browser.ts
var init_browser = __esmMin((() => {
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skin/resource-loader.ts
function extOf(path) {
	const idx = path.lastIndexOf(".");
	return idx >= 0 ? path.slice(idx + 1).toLowerCase() : "";
}
function baseName(path) {
	const normalized = path.replace(/\\/g, "/");
	const idx = normalized.lastIndexOf("/");
	return idx >= 0 ? normalized.slice(idx + 1) : normalized;
}
function cacheKey(id, updatedAt) {
	return `${id}@${updatedAt}`;
}
function validateArchive(zip) {
	const entries = Object.entries(zip.files).filter(([, entry]) => !entry.dir);
	if (entries.length > MAX_ARCHIVE_ENTRIES) throw new Error("[skin] archive has too many entries");
	let expandedBytes = 0;
	for (const [path, entry] of entries) {
		if (path.startsWith("/") || path.split(/[\\/]/).includes("..")) throw new Error("[skin] archive contains an unsafe path");
		const size = entry._data?.uncompressedSize ?? 0;
		if (size > MAX_ENTRY_BYTES) throw new Error("[skin] archive entry is too large");
		expandedBytes += size;
		if (expandedBytes > MAX_EXPANDED_BYTES) throw new Error("[skin] archive expanded content is too large");
	}
}
function safeZipUrl(zipUrl) {
	try {
		const url = new URL(zipUrl);
		return `${url.origin}${url.pathname}`;
	} catch {
		return "<invalid-url>";
	}
}
var ZIP_CACHE_NAME, ZIP_CACHE_ORIGIN, MAX_ARCHIVE_BYTES, MAX_EXPANDED_BYTES, MAX_ENTRY_BYTES, MAX_ARCHIVE_ENTRIES, MAX_MEMORY_SKINS, CacheStorageSkinZipCache, IMAGE_EXT_MIME, sharedZipLoads, sharedZipRecoveries, ResourceLoader, resourceLoader;
var init_resource_loader = __esmMin((() => {
	init_appearance_storage_namespace();
	init_resource_policy();
	init_preload_helper();
	ZIP_CACHE_NAME = APPEARANCE_ZIP_CACHE_NAME;
	ZIP_CACHE_ORIGIN = APPEARANCE_ZIP_CACHE_ORIGIN;
	MAX_ARCHIVE_BYTES = 20971520;
	MAX_EXPANDED_BYTES = 52428800;
	MAX_ENTRY_BYTES = 10485760;
	MAX_ARCHIVE_ENTRIES = 500;
	MAX_MEMORY_SKINS = 8;
	CacheStorageSkinZipCache = class {
		async get(id, updatedAt) {
			try {
				const response = await (await this.open())?.match(this.request(id, updatedAt));
				return response ? await response.arrayBuffer() : void 0;
			} catch {
				return;
			}
		}
		async put(id, updatedAt, buffer) {
			try {
				await (await this.open())?.put(this.request(id, updatedAt), new Response(buffer.slice(0)));
			} catch {}
		}
		async delete(id, updatedAt) {
			try {
				await (await this.open())?.delete(this.request(id, updatedAt));
			} catch {}
		}
		open() {
			return typeof globalThis.caches === "undefined" ? void 0 : globalThis.caches.open(ZIP_CACHE_NAME);
		}
		request(id, updatedAt) {
			return new Request(`${ZIP_CACHE_ORIGIN}/skin/${encodeURIComponent(id)}/${updatedAt}`);
		}
	};
	IMAGE_EXT_MIME = {
		png: "image/png",
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		webp: "image/webp",
		gif: "image/gif",
		avif: "image/avif",
		mp4: "video/mp4",
		webm: "video/webm",
		mov: "video/quicktime",
		m4v: "video/x-m4v",
		ogv: "video/ogg",
		mp3: "audio/mpeg",
		m4a: "audio/mp4",
		wav: "audio/wav",
		ogg: "audio/ogg"
	};
	sharedZipLoads = /* @__PURE__ */ new Map();
	sharedZipRecoveries = /* @__PURE__ */ new Map();
	ResourceLoader = class {
		constructor(zipCache = new CacheStorageSkinZipCache()) {
			this.zipCache = zipCache;
			this.cache = /* @__PURE__ */ new Map();
			this.idToKey = /* @__PURE__ */ new Map();
			this.settledKeys = /* @__PURE__ */ new Set();
		}
		/**
		* 加载一个带 zipUrl 的外观资源。命中缓存直接复用。
		* @param resource 资源标识（resourceKey/updatedAt）与下载地址（zipUrl）
		*/
		load(resource) {
			if (!resource.zipUrl) return Promise.reject(/* @__PURE__ */ new Error(`[skin] resource ${resource.resourceKey} has no zipUrl`));
			let zipUrl;
			try {
				zipUrl = assertSafeThemeResourceUrl(resource.zipUrl);
			} catch (error) {
				return Promise.reject(error);
			}
			const key = cacheKey(resource.resourceKey, resource.updatedAt);
			const cached = this.cache.get(key);
			if (cached) {
				this.touchKey(key);
				this.idToKey.set(resource.resourceKey, key);
				return cached.then((skin) => {
					if (this.idToKey.get(resource.resourceKey) === key) this.releaseOtherVersions(resource.resourceKey, key);
					return skin;
				});
			}
			const prevKey = this.idToKey.get(resource.resourceKey);
			const promise = this.doLoad(resource.resourceKey, resource.updatedAt, zipUrl).then((skin) => {
				this.settledKeys.add(key);
				if (this.idToKey.get(resource.resourceKey) === key) this.releaseOtherVersions(resource.resourceKey, key);
				this.trimMemoryCache();
				return skin;
			}).catch((error) => {
				this.cache.delete(key);
				this.settledKeys.delete(key);
				if (this.idToKey.get(resource.resourceKey) === key) {
					if (prevKey && this.cache.has(prevKey)) this.idToKey.set(resource.resourceKey, prevKey);
					else this.idToKey.delete(resource.resourceKey);
				}
				throw error;
			});
			this.cache.set(key, promise);
			this.touchKey(key);
			this.idToKey.set(resource.resourceKey, key);
			return promise;
		}
		touchKey(key) {
			const value = this.cache.get(key);
			if (!value) return;
			this.cache.delete(key);
			this.cache.set(key, value);
		}
		trimMemoryCache() {
			for (const key of this.cache.keys()) {
				if (this.cache.size <= MAX_MEMORY_SKINS) break;
				if (this.settledKeys.has(key)) this.releaseByKey(key);
			}
		}
		/** 释放某资源 id 的全部内存缓存与 Blob URL */
		release(resourceId) {
			const prefix = `${resourceId}@`;
			for (const key of Array.from(this.cache.keys())) if (key.startsWith(prefix)) this.releaseByKey(key);
		}
		/** 释放全部缓存 */
		clear() {
			for (const key of Array.from(this.cache.keys())) this.releaseByKey(key);
		}
		releaseOtherVersions(resourceId, currentKey) {
			const prefix = `${resourceId}@`;
			for (const key of Array.from(this.cache.keys())) if (key !== currentKey && key.startsWith(prefix)) this.releaseByKey(key);
		}
		releaseByKey(key) {
			const promise = this.cache.get(key);
			this.cache.delete(key);
			this.settledKeys.delete(key);
			for (const [id, k] of this.idToKey.entries()) if (k === key) this.idToKey.delete(id);
			promise?.then((skin) => skin.objectUrls.forEach((url) => URL.revokeObjectURL(url)), () => {});
		}
		async doLoad(id, updatedAt, zipUrl) {
			const key = cacheKey(id, updatedAt);
			const loaded = await this.loadZip(id, updatedAt, zipUrl);
			try {
				return await this.buildSkin(id, updatedAt, loaded.zip);
			} catch (error) {
				if (!loaded.fromPersistentCache) throw error;
				const fresh = await this.recoverCachedZip(key, id, updatedAt, zipUrl);
				return this.buildSkin(id, updatedAt, fresh.zip);
			}
		}
		async buildSkin(id, updatedAt, zip) {
			const manifest = await this.readManifest(zip);
			const objectUrls = [];
			let completed = false;
			try {
				const assetUrlByPath = /* @__PURE__ */ new Map();
				const assetUrlByBase = /* @__PURE__ */ new Map();
				const failed = (await Promise.allSettled(Object.keys(zip.files).map(async (path) => {
					const entry = zip.files[path];
					if (entry.dir) return;
					const mime = IMAGE_EXT_MIME[extOf(path)];
					if (!mime) return;
					const blob = await entry.async("blob");
					const typedBlob = blob.type ? blob : new Blob([blob], { type: mime });
					const url = URL.createObjectURL(typedBlob);
					objectUrls.push(url);
					assetUrlByPath.set(path, url);
					assetUrlByBase.set(baseName(path), url);
				}))).find((result) => result.status === "rejected");
				if (failed) throw failed.reason;
				const cssPath = manifest.css ?? Object.keys(zip.files).find((p) => !zip.files[p].dir && extOf(p) === "css");
				let css = "";
				if (cssPath && zip.files[cssPath]) {
					css = await zip.files[cssPath].async("string");
					css = sanitizeThemeCss(this.rewriteCssUrls(css, assetUrlByPath, assetUrlByBase));
				}
				if (!css.trim()) throw new Error(`[skin] resource ${id} has no theme CSS`);
				completed = true;
				return {
					resourceKey: id,
					updatedAt,
					css,
					objectUrls
				};
			} finally {
				if (!completed) objectUrls.forEach((url) => URL.revokeObjectURL(url));
			}
		}
		loadZip(id, updatedAt, zipUrl) {
			const key = cacheKey(id, updatedAt);
			const recovery = sharedZipRecoveries.get(key);
			if (recovery) return recovery;
			const existing = sharedZipLoads.get(key);
			if (existing) return existing;
			const promise = this.loadZipUncached(id, updatedAt, zipUrl, false);
			sharedZipLoads.set(key, promise);
			promise.finally(() => {
				if (sharedZipLoads.get(key) === promise) sharedZipLoads.delete(key);
			}).catch(() => void 0);
			return promise;
		}
		recoverCachedZip(key, id, updatedAt, zipUrl) {
			const existing = sharedZipRecoveries.get(key);
			if (existing) return existing;
			const promise = this.zipCache.delete(id, updatedAt).then(() => this.loadZipUncached(id, updatedAt, zipUrl, true));
			sharedZipRecoveries.set(key, promise);
			promise.finally(() => {
				if (sharedZipRecoveries.get(key) === promise) sharedZipRecoveries.delete(key);
			}).catch(() => void 0);
			return promise;
		}
		async loadZipUncached(id, updatedAt, zipUrl, skipPersistent) {
			const { default: JSZipRuntime } = await __vitePreload(async () => {
				const { default: JSZipRuntime } = await import("./jszip.min-DbflLdr6.js").then((n) => /* @__PURE__ */ __toESM(n.t()));
				return { default: JSZipRuntime };
			}, __vite__mapDeps([0,1,2,3]), import.meta.url);
			if (!skipPersistent) {
				const cached = await this.zipCache.get(id, updatedAt);
				if (cached) try {
					if (cached.byteLength > MAX_ARCHIVE_BYTES) throw new Error("oversized cache");
					const zip = await JSZipRuntime.loadAsync(cached);
					validateArchive(zip);
					return {
						zip,
						fromPersistentCache: true
					};
				} catch {
					await this.zipCache.delete(id, updatedAt);
				}
			}
			const resp = await fetch(zipUrl, { redirect: "error" });
			if (!resp.ok) throw new Error(`[skin] download failed: ${resp.status} ${safeZipUrl(zipUrl)}`);
			const declaredSize = Number(resp.headers.get("content-length"));
			if (Number.isFinite(declaredSize) && declaredSize > MAX_ARCHIVE_BYTES) throw new Error("[skin] archive is too large");
			const buffer = await resp.arrayBuffer();
			if (buffer.byteLength > MAX_ARCHIVE_BYTES) throw new Error("[skin] archive is too large");
			const zip = await JSZipRuntime.loadAsync(buffer, { checkCRC32: true });
			validateArchive(zip);
			await this.zipCache.put(id, updatedAt, buffer);
			return {
				zip,
				fromPersistentCache: false
			};
		}
		async readManifest(zip) {
			const file = zip.file("manifest.json");
			if (!file) return {};
			try {
				const parsed = JSON.parse(await file.async("string"));
				if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
				const manifest = parsed;
				return { css: typeof manifest.css === "string" ? manifest.css : void 0 };
			} catch {
				return {};
			}
		}
		/**
		* 把 CSS 中的 url(...) 相对引用重写为对应资源的 Blob URL。
		* 优先按完整 zip 路径匹配，回退按文件名匹配；http(s)/data/blob URL 保持不变。
		*/
		rewriteCssUrls(css, byPath, byBase) {
			return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, _quote, ref) => {
				const raw = ref.trim();
				if (/^(https?:|data:|blob:|#)/.test(raw)) return match;
				const normalized = raw.replace(/^\.?\//, "");
				const resolved = byPath.get(normalized) ?? byBase.get(baseName(normalized));
				return resolved ? `url("${resolved}")` : match;
			});
		}
	};
	resourceLoader = new ResourceLoader();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skin/skin-manager.ts
function writeAppearanceCssCache(resourceKey, css, identity) {
	try {
		if (!css) return;
		if (css.length > APPEARANCE_CSS_MAX_LEN) return;
		if (!identity) return;
		const payload = {
			resourceKey,
			css,
			identity
		};
		window.localStorage?.setItem(APPEARANCE_CSS_CACHE_KEY, JSON.stringify(payload));
	} catch {}
}
function clearAppearanceCssCache() {
	try {
		window.localStorage?.removeItem(APPEARANCE_CSS_CACHE_KEY);
	} catch {}
}
/**
* 读取上次成功 apply 的 CSS 快照，供 mount 前**同步**注入使用。
* 只用于启动即挂 <style>，与 applier 异步路径互不冲突（applier resolve 后会 replace 同一 sheet）。
*
* 刻意**不做**账号归属校验：首帧不知道目标账号该用哪个皮肤，无条件复原"上次用过的皮肤"
* 是能做的最好选择。按 identity 拦下会让首帧完全没皮肤 → 退化成闪浅色/深色，
* 比闪上一账号皮肤更糟。跨账号残留由账号就绪后的 reconcile 负责清理。#95568
*/
function readCachedAppearanceCss() {
	try {
		const raw = window.localStorage?.getItem(APPEARANCE_CSS_CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed?.resourceKey !== "string" || typeof parsed?.css !== "string") return null;
		return parsed;
	} catch {
		return null;
	}
}
/** 是否支持可构造样式表（Constructable Stylesheets） */
function supportsAdopted() {
	return typeof document !== "undefined" && "adoptedStyleSheets" in Document.prototype && typeof CSSStyleSheet !== "undefined" && (() => {
		try {
			new CSSStyleSheet();
			return true;
		} catch {
			return false;
		}
	})();
}
function createSheet() {
	if (supportsAdopted()) {
		const sheet = new CSSStyleSheet();
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
		return {
			replace: (css) => sheet.replaceSync(css),
			dispose: () => {
				document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
			}
		};
	}
	const el = document.createElement("style");
	el.setAttribute("data-skin-sheet", "skin");
	document.head.appendChild(el);
	return {
		replace: (css) => {
			el.textContent = css;
		},
		dispose: () => {
			el.remove();
		}
	};
}
function getSkinManager() {
	if (!skinManager) skinManager = new SkinManager();
	return skinManager;
}
var APPEARANCE_CSS_MAX_LEN, SkinManager, skinManager;
var init_skin_manager = __esmMin((() => {
	init_http_logger();
	init_theme();
	init_appearance_storage_namespace();
	APPEARANCE_CSS_MAX_LEN = 524288;
	SkinManager = class {
		constructor() {
			this.skinSheet = null;
			this.currentThemeId = null;
			this.currentIdentity = "";
		}
		ensureSkinSheet() {
			if (!this.skinSheet) this.skinSheet = createSheet();
			return this.skinSheet;
		}
		/** 账号就绪后由 host 注入当前账号指纹，后续 applyTheme 写缓存时带上。 */
		setIdentity(identity) {
			this.currentIdentity = identity;
		}
		/**
		* 账号就绪后校验冷启动裸缓存的归属。
		*
		* **刻意既不动 DOM 也不删缓存**：
		* - 不动 DOM：此刻 catalog / 门禁尚未返回，清 CSS 会让界面立刻裸成浅色再切远端主题。
		* - 不删缓存：这份 CSS 的唯一用途就是"下次冷启动首帧有皮肤可用"。首帧不知道目标账号
		*   该用哪个皮肤，复原上次用过的那个是最好选择。一删，退登重登首帧就无皮肤 → 闪浅色，
		*   比先显示上一账号皮肤再切正确皮肤更糟。#95568
		*
		* 跨账号隔离由 final-effect 定论时保证（按新账号 apply 或按无权限回落，必然覆盖）；
		* 缓存本身也会在那次 apply 成功后被新账号的 CSS 覆写。
		*
		* @returns identity 是否不匹配（仅用于诊断日志，调用方不应据此改动视觉或清缓存）
		*/
		invalidateCacheOnIdentityMismatch(currentIdentity) {
			this.currentIdentity = currentIdentity;
			const cached = readCachedAppearanceCss();
			if (!cached) return false;
			if (cached.identity !== currentIdentity) return true;
			return false;
		}
		/** 应用一个完整主题；series 仅用于分组，不影响资源应用。 */
		applyTheme(theme, loaded) {
			if (typeof document === "undefined") return false;
			if (loaded?.css) {
				writeRendererLog("appearance", "info", `[skin-manager] applyTheme-with-css resource=${theme.resourceKey} cssLen=${loaded.css.length} prev=${this.currentThemeId ?? "<none>"}`);
				this.ensureSkinSheet().replace(loaded.css);
				document.documentElement.setAttribute("data-skin", theme.resourceKey);
				getThemeManager().overrideThemeForSkin("light");
				this.clearThemeClasses();
				this.currentThemeId = theme.resourceKey;
				writeAppearanceCssCache(theme.resourceKey, loaded.css, this.currentIdentity);
				return true;
			}
			if (theme.appearance === "light" || theme.appearance === "dark") {
				writeRendererLog("appearance", "info", `[skin-manager] applyTheme-builtin resource=${theme.resourceKey} appearance=${theme.appearance} prev=${this.currentThemeId ?? "<none>"} → clearTheme + setTheme`);
				this.clearTheme();
				getThemeManager().setTheme(theme.appearance);
				this.currentThemeId = theme.resourceKey;
				clearAppearanceCssCache();
				return true;
			}
			writeRendererLog("appearance", "warn", `[skin-manager] applyTheme-noop resource=${theme.resourceKey} appearance=${String(theme.appearance)} hasLoaded=${Boolean(loaded)}`);
			return false;
		}
		/**
		* 切到个性皮肤时，确保 DOM 处于浅色基线态。
		* 只清 dark 类名（避免 foundation .dark 选择器叠加深色 token）；
		* 保留 light 系类名（cb-bridge.scss `.light .cbChat` 需要）；
		* attribute 设为 light 值而非移除——移除会触发 ThemeManager 的
		* MutationObserver 把 dark 类名重新加回来。
		*/
		clearThemeClasses() {
			const root = document.documentElement;
			const body = document.body;
			const darkClasses = [
				"dark",
				"cb-dark",
				"vscode-dark"
			];
			root.classList.remove(...darkClasses);
			body.classList.remove(...darkClasses);
			root.classList.add("light", "cb-light", "vscode-light");
			body.classList.add("light", "cb-light", "vscode-light");
			root.setAttribute("data-theme", "light");
			body.setAttribute("data-vscode-theme-kind", "vscode-light");
			body.setAttribute("data-vscode-theme-name", "IDE Light");
			root.style.colorScheme = "light";
		}
		/**
		* 清除个性皮肤的动态资源与 DOM 标记。
		* 也要清理 clearThemeClasses() 强制设的 light 属性，
		* 让后续 setTheme() 能从干净状态应用。
		*/
		clearTheme() {
			if (typeof document === "undefined") return;
			const root = document.documentElement;
			const body = document.body;
			writeRendererLog("appearance", "info", `[skin-manager] clearTheme prev=${this.currentThemeId ?? "<none>"}`);
			this.skinSheet?.replace("");
			root.removeAttribute("data-skin");
			root.classList.remove("light", "cb-light", "vscode-light");
			body.classList.remove("light", "cb-light", "vscode-light");
			this.currentThemeId = null;
			clearAppearanceCssCache();
		}
		/**
		* 冷启动同步注入上次缓存的 CSS，无需异步加载 zip。
		* 只在模块顶层的 IIFE 中调用一次，后续 applyTheme 会 replace 同一 sheet。
		*/
		applyCachedCssSync(resourceKey, css) {
			if (typeof document === "undefined" || !css) return;
			writeRendererLog("appearance", "info", `[skin-manager] applyCachedCssSync resource=${resourceKey} cssLen=${css.length}`);
			this.ensureSkinSheet().replace(css);
			document.documentElement.setAttribute("data-skin", resourceKey);
			getThemeManager().overrideThemeForSkin("light");
			this.clearThemeClasses();
			this.currentThemeId = resourceKey;
		}
		getCurrentThemeId() {
			return this.currentThemeId;
		}
	};
	skinManager = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skin/vip-level-resolver.ts
/** 获取当前 VIP 等级门禁解析器 */
function getVipLevelResolver() {
	return resolver;
}
/**
* 依据账号版本比对当前外观状态，得出是否需要降级回退。
*
* 订阅过期/降级时回退到列表中第一个可用免费主题；
* 无可用免费主题时保持原样，避免误清空。
*
* 纯函数，不产生副作用；调用方拿到结果后再决定是否 apply + 弹「皮肤失效」提示 + 落库。
*/
function resolveAppearanceFallback(state, resources, editionType, vipLevelResolver = getVipLevelResolver()) {
	const themes = resources;
	const currentTheme = themes.find((t) => t.resourceKey === state.currentTheme);
	if (currentTheme ? vipLevelResolver.canUse(currentTheme, editionType) : false) return {
		themeNeedFallback: false,
		targetThemeId: state.currentTheme
	};
	const canUseFree = (theme) => theme.vipLevel === "free" && vipLevelResolver.canUse(theme, editionType);
	return {
		themeNeedFallback: true,
		targetThemeId: themes.find(canUseFree)?.resourceKey ?? state.currentTheme
	};
}
var VIP_LEVEL_INDEX, EDITION_LEVEL, DefaultVipLevelResolver, resolver;
var init_vip_level_resolver = __esmMin((() => {
	init_account();
	VIP_LEVEL_INDEX = {
		free: 0,
		pro: 1,
		advanced: 2,
		ultimate: 3
	};
	EDITION_LEVEL = {
		free: 0,
		pro: 1,
		advanced: 2,
		flagship: 3,
		ultimate: 3,
		exclusive: 3
	};
	DefaultVipLevelResolver = class {
		vipLevelIndex(vipLevel) {
			return VIP_LEVEL_INDEX[vipLevel] ?? Number.POSITIVE_INFINITY;
		}
		editionLevel(editionType) {
			if (!editionType) return 0;
			return EDITION_LEVEL[editionType] ?? 0;
		}
		canUse(resource, editionType) {
			return this.editionLevel(editionType) >= this.vipLevelIndex(resource.vipLevel);
		}
	};
	resolver = new DefaultVipLevelResolver();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skin/index.ts
var init_skin = __esmMin((() => {
	init_resource_loader();
	init_skin_manager();
	init_vip_level_resolver();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/skin/appearance-theme-applier.ts
/**
* 让 Desktop 装配层把 `facades.appearance.getLocalResource` 挂进来，
* 后续所有 applier.apply 都会优先走本地路径（zip 已落盘 → 内存里只保留 CSS）。
* 参数为 `undefined` 时清除注入（用于测试重置）。
*/
function setLocalResourceLoader(loader) {
	localResourceLoader = loader;
}
function createAppearanceThemeApplier(dependencies) {
	let generation = 0;
	/**
	* 在途请求的去重槽位。
	*
	* 为什么必需：调用方（host 的 final-effect）依赖多，切号期会重跑数轮，而它判断
	* "是否已应用"用的是 apply **成功后**才赋值的 appliedRef —— 加载期间每轮都会认为
	* 尚未应用并重新发起 apply。付费皮肤要下载解压 zip（实测 44KB CSS），窗口足够长，
	* 后一次的 `++generation` 会把前一次判成过期请求而静默丢弃，形成互相作废的循环，
	* 皮肤始终挂不上（`final-effect-apply-done applied=false`），直到 effect 稳定为止。
	*
	* 语义：**同一主题的在途请求复用同一个 Promise**（不重复下载、不递增 generation）；
	* 切换到**不同**主题时照常递增 generation，保留"后发请求作废先发请求"的防覆盖语义。
	*/
	let inflight;
	const runApply = async (theme) => {
		const requestGeneration = ++generation;
		let loaded;
		if (theme.zipUrl) try {
			loaded = await dependencies.load(theme);
		} catch (error) {
			const zipHost = (() => {
				try {
					return new URL(theme.zipUrl).hostname;
				} catch {
					return "<parse-fail>";
				}
			})();
			writeRendererLog("appearance", "error", `[applier] load-failed theme=${theme.resourceKey} zipHost=${zipHost} error=${String(error?.message ?? error)}`);
			return false;
		}
		else if (theme.appearance !== "light" && theme.appearance !== "dark") {
			writeRendererLog("appearance", "warn", `[applier] skip-no-zip theme=${theme.resourceKey} appearance=${String(theme.appearance)}`);
			return false;
		}
		if (requestGeneration !== generation) return false;
		return dependencies.apply(theme, loaded);
	};
	const apply = (theme) => {
		if (inflight?.resourceKey === theme.resourceKey) return inflight.promise;
		const promise = runApply(theme).finally(() => {
			if (inflight?.promise === promise) inflight = void 0;
		});
		inflight = {
			resourceKey: theme.resourceKey,
			promise
		};
		return promise;
	};
	return {
		apply,
		invalidate: () => {
			generation += 1;
			inflight = void 0;
		}
	};
}
/**
* 默认 load：Desktop 优先走 facade.getLocalResource（zip 落盘方案，内存零 Blob URL）；
* 失败或未注入时回落到 renderer 内 zip 解压（Web 与 Desktop fallback 共用路径）。
*/
async function runtimeLoad(theme) {
	if (localResourceLoader && theme.zipUrl) try {
		const { css } = await localResourceLoader(theme);
		return {
			resourceKey: theme.resourceKey,
			updatedAt: theme.updatedAt,
			css,
			objectUrls: []
		};
	} catch (error) {
		writeRendererLog("appearance", "warn", `[applier] local-load-failed theme=${theme.resourceKey} error=${String(error?.message ?? error)}, fallback to zip`);
	}
	return resourceLoader.load(theme);
}
var localResourceLoader, runtimeApplier, appearanceThemeApplier;
var init_appearance_theme_applier = __esmMin((() => {
	init_http_logger();
	init_resource_loader();
	init_skin_manager();
	runtimeApplier = createAppearanceThemeApplier({
		load: runtimeLoad,
		apply: (theme, loaded) => getSkinManager().applyTheme(theme, loaded)
	});
	appearanceThemeApplier = {
		apply: runtimeApplier.apply,
		invalidate: (clearApplied) => {
			runtimeApplier.invalidate();
			if (clearApplied) getSkinManager().clearTheme();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/appearance-storage.ts
function buildStateKey(eid, uid) {
	if (!uid) return LEGACY_STATE_KEY;
	return `${LEGACY_STATE_KEY}::${eid || "personal"}::${uid}`;
}
function buildLastAppliedKey(eid, uid) {
	if (!uid) return LAST_APPLIED_KEY;
	return `${LAST_APPLIED_KEY}::${eid || "personal"}::${uid}`;
}
function parseState(raw) {
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		if (typeof parsed?.currentTheme !== "string") return null;
		const pendingTheme = parsed.pendingSync?.theme;
		return {
			currentTheme: parsed.currentTheme,
			...typeof pendingTheme === "string" ? { pendingSync: { theme: pendingTheme } } : {}
		};
	} catch {
		return null;
	}
}
function readLocalState(eid, uid) {
	const storage = window.localStorage;
	if (!storage) return null;
	const key = buildStateKey(eid, uid);
	const scoped = parseState(storage.getItem(key));
	if (scoped) return scoped;
	if (uid) {
		const legacy = parseState(storage.getItem(LEGACY_STATE_KEY));
		if (legacy) {
			try {
				storage.setItem(key, JSON.stringify(legacy));
				storage.removeItem(LEGACY_STATE_KEY);
			} catch {}
			return legacy;
		}
	}
	return null;
}
function writeLocalState(state, eid, uid) {
	try {
		window.localStorage?.setItem(buildStateKey(eid, uid), JSON.stringify(state));
	} catch {}
}
function writePendingThemeSelection(resourceKey, eid, uid) {
	writeLocalState({
		currentTheme: resourceKey,
		pendingSync: { theme: resourceKey }
	}, eid, uid);
}
function clearPendingThemeSync(resourceKey, eid, uid) {
	const state = readLocalState(eid, uid);
	if (state?.pendingSync?.theme !== resourceKey) return;
	writeLocalState({ currentTheme: state.currentTheme }, eid, uid);
}
/**
* 上次成功应用的完整主题快照。
*
* 存 currentTheme 之外的 zipUrl / updatedAt / appearance 等字段，
* 是为了让下次启动**在 facade.listResources 返回前**就能立刻走 applier 复原皮肤，
* 避免"启动先无皮肤 → 拉到列表再套皮肤"的闪黑 #74055。
*/
function parseThemeSnapshot(raw) {
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		if (typeof parsed?.resourceKey !== "string") return null;
		return parsed;
	} catch {
		return null;
	}
}
function readScopedLastAppliedTheme(eid, uid) {
	const storage = window.localStorage;
	if (!storage || !uid) return null;
	return parseThemeSnapshot(storage.getItem(buildLastAppliedKey(eid, uid)));
}
/**
* 账号无关的启动兜底快照。
*
* 刷新页面时账号异步加载，uid/eid 都未就绪 —— 走 scoped key 读不到已保存主题，
* 会出现"启动 → 短暂无皮肤 → 账号到位后再套皮肤"的闪现。
* 这里读裸 key（每次 apply 时同步写），首帧就能立刻乐观复原 #74055
*
* 刻意**不做**账号归属校验：首帧根本不知道目标账号该用哪个皮肤，能做的最好选择就是
* 无条件复原"上次用过的皮肤"。同设备切账号时先显示上一账号皮肤、待 catalog + 门禁
* 全部 settle 后由 final-effect 切到目标皮肤，是本设计接受的代价。若在这里按 identity
* 拦下，首帧就没有任何皮肤可用 → 退化成闪浅色/深色，比闪上一账号皮肤更糟 #95568
*/
function readLastAppliedThemeAnyAccount() {
	const storage = window.localStorage;
	if (!storage) return null;
	return parseThemeSnapshot(storage.getItem(LAST_APPLIED_KEY));
}
function writeLastAppliedTheme(theme, eid, uid, identity) {
	try {
		const payload = JSON.stringify(theme);
		window.localStorage?.setItem(buildLastAppliedKey(eid, uid), payload);
		window.localStorage?.setItem(LAST_APPLIED_KEY, payload);
		window.localStorage?.setItem(LAST_APPLIED_IDENTITY_KEY, identity);
	} catch {}
}
function clearLastAppliedTheme(eid, uid) {
	try {
		window.localStorage?.removeItem(buildLastAppliedKey(eid, uid));
		window.localStorage?.removeItem(LAST_APPLIED_KEY);
		window.localStorage?.removeItem(LAST_APPLIED_IDENTITY_KEY);
	} catch {}
}
/**
* 账号就绪后校验裸快照归属。
*
* **刻意不删快照**：裸快照的唯一用途就是"下次冷启动首帧有皮肤可用"。首帧根本不知道
* 目标账号该用哪个皮肤，能做的最好选择就是复原上次用过的那个。这里一删，退登重登
* （renderer 重新加载）首帧就无皮肤可用 → 落到明暗兜底 → 闪浅色/深色，比先显示上一
* 账号皮肤再切正确皮肤更糟。
*
* 跨账号隔离由 final-effect 保证：catalog + 门禁全部 settle 后必然按新账号 apply 或按
* 无权限回落，覆盖掉上一账号的皮肤。#95568
*
* @returns identity 是否不匹配（仅用于诊断日志，调用方不应据此改动视觉或清缓存）
*/
function reconcileAnyAccountSnapshot(currentIdentity) {
	const storage = window.localStorage;
	if (!storage) return false;
	if (!storage.getItem(LAST_APPLIED_KEY)) return false;
	return storage.getItem(LAST_APPLIED_IDENTITY_KEY) !== currentIdentity;
}
function buildExpiredPromptKey(eid, uid) {
	if (!uid) return APPEARANCE_EXPIRED_PROMPT_KEY;
	return `${APPEARANCE_EXPIRED_PROMPT_KEY}::${eid || "personal"}::${uid}`;
}
/** 读取该账号上次已发出提示的签名；无记录返回 null。 */
function readExpiredPromptSignature(eid, uid) {
	try {
		return window.localStorage?.getItem(buildExpiredPromptKey(eid, uid)) ?? null;
	} catch {
		return null;
	}
}
/** 记录本次已发出的提示签名，供后续启动去重。 */
function writeExpiredPromptSignature(signature, eid, uid) {
	try {
		window.localStorage?.setItem(buildExpiredPromptKey(eid, uid), signature);
	} catch {}
}
/**
* 清除提示签名。
* 档位重新够用（续费/升级）时调用，使将来再次降级仍能提示一次。
*/
function clearExpiredPromptSignature(eid, uid) {
	try {
		window.localStorage?.removeItem(buildExpiredPromptKey(eid, uid));
	} catch {}
}
var LEGACY_STATE_KEY, LAST_APPLIED_KEY, LAST_APPLIED_IDENTITY_KEY;
var init_appearance_storage = __esmMin((() => {
	init_appearance_storage_namespace();
	LEGACY_STATE_KEY = APPEARANCE_STATE_KEY;
	LAST_APPLIED_KEY = APPEARANCE_LAST_APPLIED_KEY;
	LAST_APPLIED_IDENTITY_KEY = `${LAST_APPLIED_KEY}::__identity`;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/appearance/appearance-cloud-sync.ts
function getRuntimeWb() {
	return globalThis.wb;
}
function getAppearanceThemeSelectionPayload(payload) {
	const value = payload?.value ?? payload;
	if (!value || typeof value !== "object") return null;
	const data = value;
	if (!isUploadableThemeKey(data.resourceKey)) return null;
	return {
		resourceKey: data.resourceKey,
		...typeof data.eid === "string" ? { eid: data.eid } : {},
		...typeof data.uid === "string" ? { uid: data.uid } : {},
		source: typeof data.source === "string" ? data.source : "unknown",
		revision: typeof data.revision === "number" ? data.revision : 0
	};
}
function publishAppearanceThemeSelection(params) {
	if (!isUploadableThemeKey(params.resourceKey)) return;
	const setPreference = getRuntimeWb()?.config?.setPreference;
	if (typeof setPreference !== "function") return;
	setPreference(APPEARANCE_THEME_SELECTION_SYNC_KEY, {
		resourceKey: params.resourceKey,
		...params.eid ? { eid: params.eid } : {},
		...params.uid ? { uid: params.uid } : {},
		source: params.source,
		revision: Date.now()
	}).catch(() => void 0);
}
/**
* 上传前的 resource_key 兜底校验。
*
* 只用 `typeof === 'string'` 之外还要走值域：写云端是「回落到哪个就传哪个 key」，
* 传空串 / undefined 会让请求体丢掉 `resource_key` 字段，网关只回 502，端上查不出成因。
*/
function isUploadableThemeKey(value) {
	return typeof value === "string" && THEME_RESOURCE_KEY.test(value);
}
function isAvailableTheme(resourceKey, themes) {
	return BUILTIN_THEME_KEYS.has(resourceKey) || themes.some((theme) => theme.resourceKey === resourceKey);
}
function enqueueThemeUpload(params) {
	const { facade, resourceKey, eid, uid, source } = params;
	const accountKey = `${eid ?? "personal"}::${uid}`;
	const upload = async () => {
		try {
			writeRendererLog("appearance", "info", `[sync] upload-start source=${source} kind=theme resource_key=${resourceKey}`);
			await facade.setSelection("theme", resourceKey);
			clearPendingThemeSync(resourceKey, eid, uid);
		} catch (error) {
			writeRendererLog("appearance", "warn", `[sync] upload-failed source=${source} theme=${resourceKey} error=${String(error)}`);
		}
	};
	const previous = uploadQueues.get(accountKey);
	const task = previous ? previous.then(upload, upload) : upload();
	uploadQueues.set(accountKey, task);
	task.finally(() => {
		if (uploadQueues.get(accountKey) === task) uploadQueues.delete(accountKey);
	}).catch(() => void 0);
	return task;
}
function saveCloudThemeSelection(params) {
	if (!isUploadableThemeKey(params.resourceKey)) {
		writeRendererLog("appearance", "warn", `[sync] upload-skipped reason=invalid-resource-key source=${params.source} theme=${String(params.resourceKey)}`);
		return Promise.resolve();
	}
	writePendingThemeSelection(params.resourceKey, params.eid, params.uid);
	publishAppearanceThemeSelection(params);
	return enqueueThemeUpload(params);
}
function syncCloudTheme(params) {
	const { facade, selections, themes, eid, uid, source } = params;
	const local = readLocalState(eid, uid);
	const pendingTheme = local?.pendingSync?.theme;
	if (pendingTheme) {
		if (isUploadableThemeKey(pendingTheme) && isAvailableTheme(pendingTheme, themes)) {
			enqueueThemeUpload({
				facade,
				resourceKey: pendingTheme,
				eid,
				uid,
				source
			}).catch(() => void 0);
			return;
		}
		clearPendingThemeSync(pendingTheme, eid, uid);
	}
	if (!selections) return;
	const cloudTheme = selections.find((item) => item.kind === "theme")?.resourceKey;
	if (cloudTheme) {
		if (!isAvailableTheme(cloudTheme, themes)) return;
		writeLocalState({ currentTheme: cloudTheme }, eid, uid);
		return cloudTheme;
	}
	if (local?.currentTheme && isAvailableTheme(local.currentTheme, themes)) saveCloudThemeSelection({
		facade,
		resourceKey: local.currentTheme,
		eid,
		uid,
		source
	}).catch(() => void 0);
}
var BUILTIN_THEME_KEYS, APPEARANCE_THEME_SELECTION_SYNC_KEY, APPEARANCE_THEME_SELECTION_SYNC_EVENT, THEME_RESOURCE_KEY, uploadQueues;
var init_appearance_cloud_sync = __esmMin((() => {
	init_http_logger();
	init_appearance_storage();
	BUILTIN_THEME_KEYS = /* @__PURE__ */ new Set(["light", "dark"]);
	APPEARANCE_THEME_SELECTION_SYNC_KEY = "appearance.themeSelection";
	APPEARANCE_THEME_SELECTION_SYNC_EVENT = `config.preference.${APPEARANCE_THEME_SELECTION_SYNC_KEY}.changed`;
	THEME_RESOURCE_KEY = /^[a-z0-9][a-z0-9_-]{0,63}$/;
	uploadQueues = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/appearance/appearance-skin-apply-telemetry.ts
function buildSkinApplyPayload(params) {
	const { action, source, theme, editionType, requestedTheme } = params;
	return {
		action,
		source,
		id: theme.resourceKey,
		vipLevel: theme.vipLevel,
		series: theme.series,
		type: editionType ?? "unknown",
		...requestedTheme ? {
			ext1: requestedTheme.resourceKey,
			ext2: requestedTheme.vipLevel
		} : {}
	};
}
var init_appearance_skin_apply_telemetry = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/assets/preview-dark.png
var preview_dark_default;
var init_preview_dark = __esmMin((() => {
	preview_dark_default = "" + new URL("preview-dark-CXQX3TZX.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/assets/preview-light.png
var preview_light_default;
var init_preview_light = __esmMin((() => {
	preview_light_default = "" + new URL("preview-light-BbpPCukh.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/appearance-runtime.ts
/** 后端只下发可运营资源，系统主题由前端固定提供。 */
function mergeBuiltinThemes(themes) {
	const builtinKeys = new Set(BUILTIN_THEMES.map((theme) => theme.resourceKey));
	return [...BUILTIN_THEMES, ...themes.filter((theme) => !builtinKeys.has(theme.resourceKey))];
}
function resolveLegacyBaseTheme(themes, mode, prefersDark) {
	const themeId = mode === "auto" ? prefersDark ? "dark" : "light" : mode;
	return themes.find((theme) => theme.resourceKey === themeId) ?? themes.find((theme) => theme.vipLevel === "free");
}
function normalizeExpireAt(value) {
	if (value == null || value === "") return;
	const numeric = typeof value === "number" ? value : Number(value);
	if (Number.isFinite(numeric) && numeric > 0) return numeric < 0xe8d4a51000 ? numeric * 1e3 : numeric;
	if (typeof value !== "string") return;
	const parsed = Date.parse(value);
	return Number.isFinite(parsed) ? parsed : void 0;
}
/**
* 限时皮肤的失效时刻（毫秒）。
*
* `validTo` 是北京时间日期串，区间闭合到当天 23:59:59，故显式带 `+08:00` 偏移解析，
* 不能用本地时区，否则非东八区用户会提前或延后失效。
*/
function resolveThemeValidityEnd(theme) {
	if (!theme?.validTo) return;
	const parsed = Date.parse(`${theme.validTo}T23:59:59.999+08:00`);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function resolveFallbackReason(themeExpired, validityExpired, currentTheme) {
	if (!themeExpired) return "none";
	if (validityExpired) return "validity-expired";
	return currentTheme ? "edition-insufficient" : "unavailable";
}
function resolveAppearanceRuntime(state, themes, editionType, expireAt, now = Date.now()) {
	if (editionType == null || themes.length === 0) return null;
	const expiresAt = normalizeExpireAt(expireAt);
	const effectiveEditionType = expiresAt != null && expiresAt <= now ? "free" : editionType;
	const fallback = resolveAppearanceFallback(state, themes, effectiveEditionType);
	const currentTheme = themes.find((theme) => theme.resourceKey === state.currentTheme);
	const validityEnd = resolveThemeValidityEnd(currentTheme);
	const validityExpired = validityEnd != null && validityEnd <= now;
	const needFallback = fallback.themeNeedFallback || validityExpired;
	const defaultLightTheme = themes.find((theme) => theme.resourceKey === "light");
	const targetThemeId = needFallback ? defaultLightTheme?.resourceKey ?? fallback.targetThemeId : state.currentTheme;
	const themeExpired = needFallback && targetThemeId !== state.currentTheme;
	return {
		effectiveEditionType,
		requestedThemeId: state.currentTheme,
		targetThemeId,
		themeExpired,
		fallbackReason: resolveFallbackReason(themeExpired, validityExpired, currentTheme)
	};
}
/**
* 下次外观校验的等待时长。
*
* 取「订阅到期」「当前限时皮肤到期」「每日兜底」三者最近的一个；到点后 host 重跑判定，
* 长期不退出的客户端也能在有效期结束当刻自动回退。
*/
function getNextAppearanceCheckDelay(expireAt, now = Date.now(), currentTheme) {
	const deadlines = [normalizeExpireAt(expireAt), resolveThemeValidityEnd(currentTheme)].filter((value) => value != null && value > now).map((value) => value - now + 1);
	return Math.min(APPEARANCE_CHECK_INTERVAL_MS, ...deadlines);
}
var APPEARANCE_CHECK_INTERVAL_MS, BUILTIN_THEMES;
var init_appearance_runtime = __esmMin((() => {
	init_skin();
	init_preview_dark();
	init_preview_light();
	init_appearance_storage_namespace();
	APPEARANCE_CHECK_INTERVAL_MS = 864e5;
	BUILTIN_THEMES = [{
		kind: "theme",
		resourceKey: "light",
		nameZh: "浅色",
		nameEn: "Light",
		vipLevel: "free",
		updatedAt: 0,
		series: "base",
		appearance: "light",
		previewUrl: preview_light_default
	}, {
		kind: "theme",
		resourceKey: "dark",
		nameZh: "深色",
		nameEn: "Dark",
		vipLevel: "free",
		updatedAt: 0,
		series: "base",
		appearance: "dark",
		previewUrl: preview_dark_default
	}];
}));
//#endregion
export { init_skin as A, useUpgradeAction as B, reconcileAnyAccountSnapshot as C, appearanceThemeApplier as D, writeLocalState as E, readCachedAppearanceCss as F, init_resource_policy as H, init_browser as I, init_types as L, init_vip_level_resolver as M, getSkinManager as N, init_appearance_theme_applier as O, init_skin_manager as P, isThemeResource as R, readScopedLastAppliedTheme as S, writeLastAppliedTheme as T, getSafeThemeResourceUrl as V, clearLastAppliedTheme as _, resolveAppearanceRuntime as a, readLastAppliedThemeAnyAccount as b, buildSkinApplyPayload as c, getAppearanceThemeSelectionPayload as d, init_appearance_cloud_sync as f, clearExpiredPromptSignature as g, buildStateKey as h, normalizeExpireAt as i, getVipLevelResolver as j, setLocalResourceLoader as k, init_appearance_skin_apply_telemetry as l, syncCloudTheme as m, init_appearance_runtime as n, resolveLegacyBaseTheme as o, saveCloudThemeSelection as p, mergeBuiltinThemes as r, resolveThemeValidityEnd as s, getNextAppearanceCheckDelay as t, APPEARANCE_THEME_SELECTION_SYNC_EVENT as u, init_appearance_storage as v, writeExpiredPromptSignature as w, readLocalState as x, readExpiredPromptSignature as y, init_use_upgrade as z };
