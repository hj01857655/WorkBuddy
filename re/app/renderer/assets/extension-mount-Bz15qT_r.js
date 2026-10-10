import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { D2 as initExtensionHost, G0 as createExtensionIframeHost, R0 as init_renderer, T2 as createExtensionFederationHost, U0 as createExtensionMount, h5 as src_exports, m5 as init_src, v3 as dist_exports, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom, Ul as require_client } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/router/extension-mount.tsx
var import_react, import_react_dom, import_client, federationBundle, iframeBundle, ExtensionIframeHost, mountBundle, ExtensionMount;
var init_extension_mount = __esmMin((() => {
	init_src();
	init_renderer();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_dist();
	initExtensionHost({
		react: import_react,
		reactDOM: import_react_dom,
		reactRouterDOM: dist_exports,
		reactRouterDOMVersion: "6.28.0",
		wbComponents: src_exports
	}).catch((err) => {
		console.error("[extension-mount] initExtensionHost failed:", err);
	});
	federationBundle = createExtensionFederationHost(import_react);
	federationBundle.Component;
	federationBundle.resetExtensionModuleCache;
	iframeBundle = createExtensionIframeHost(import_react, { invoke: async (channel, context, ...args) => {
		const wbInvoke = window.__wbInvoke;
		if (!wbInvoke) throw new Error("[ExtensionIframeHost] window.__wbInvoke not available; iframe extension requires Desktop preload bridge (see apps/workbuddy-desktop/src/preload/bootstrap.ts)");
		return wbInvoke(channel, context, ...args);
	} });
	ExtensionIframeHost = iframeBundle.Component;
	mountBundle = createExtensionMount(import_react, {
		federationHost: federationBundle,
		iframeHost: iframeBundle,
		getExtension: async (id) => {
			try {
				return await wb.extensions.get(id);
			} catch (err) {
				console.warn(`[ExtensionMount] wb.extensions.get("${id}") failed:`, err);
				return;
			}
		},
		subscribeLifecycle: (extensionId, onChange) => wb.on("extension.lifecycle", (payload) => {
			const p = payload;
			if (!p?.id || p.id === extensionId) onChange();
		}),
		supportedContainers: /* @__PURE__ */ new Set(["module-federation", "iframe"])
	});
	ExtensionMount = mountBundle.Component;
	if (typeof window !== "undefined") {
		window.__wbExtensionMount = ExtensionMount;
		window.__wbExtensionResetModuleCache = mountBundle.resetExtensionModuleCache;
	}
	if (typeof window !== "undefined" && typeof customElements !== "undefined" && !customElements.get("wb-extension")) {
		const ATTR_EXTENSION_ID = "extension-id";
		const ATTR_CONTRIBUTION_KIND = "contribution-kind";
		const ATTR_CONTRIBUTION_ID = "contribution-id";
		const ATTR_CONTRIBUTION_ROUTE = "contribution-route";
		const ATTR_CONTRIBUTION_BIZ_TYPE = "contribution-biz-type";
		/**
		* `<wb-extension>` 自定义元素。
		*
		* 生命周期：
		*   connectedCallback   → 首次挂 DOM 时创建 root + render
		*   attributeChangedCallback → 已挂载时属性变更即 re-render；未挂载忽略
		*   disconnectedCallback → unmount 释放 React root
		*/
		class WbExtensionElement extends HTMLElement {
			constructor(..._args) {
				super(..._args);
				this._root = null;
			}
			static get observedAttributes() {
				return [
					ATTR_EXTENSION_ID,
					ATTR_CONTRIBUTION_KIND,
					ATTR_CONTRIBUTION_ID,
					ATTR_CONTRIBUTION_ROUTE,
					ATTR_CONTRIBUTION_BIZ_TYPE
				];
			}
			get extensionId() {
				return this.getAttribute(ATTR_EXTENSION_ID);
			}
			set extensionId(value) {
				if (value === null || value === void 0) this.removeAttribute(ATTR_EXTENSION_ID);
				else this.setAttribute(ATTR_EXTENSION_ID, value);
			}
			get contribution() {
				return this._contributionProperty;
			}
			set contribution(value) {
				this._contributionProperty = value;
				if (this._root) this._render();
			}
			connectedCallback() {
				if (!this._root) this._root = (0, import_client.createRoot)(this);
				this._render();
			}
			attributeChangedCallback() {
				if (this._root) this._render();
			}
			disconnectedCallback() {
				if (this._root) {
					const root = this._root;
					this._root = null;
					queueMicrotask(() => root.unmount());
				}
			}
			/**
			* 从 attributes 派生 contribution 对象。
			* `contribution-kind` 是必填触发条件 —— 没有 kind 就返回 undefined，
			* 交给 ExtensionMount 默认行为（当前等价 route 分派）。
			*/
			_readContributionFromAttrs() {
				const kind = this.getAttribute(ATTR_CONTRIBUTION_KIND);
				if (!kind) return;
				const c = { kind };
				const id = this.getAttribute(ATTR_CONTRIBUTION_ID);
				const route = this.getAttribute(ATTR_CONTRIBUTION_ROUTE);
				const bizType = this.getAttribute(ATTR_CONTRIBUTION_BIZ_TYPE);
				if (id) c.id = id;
				if (route) c.route = route;
				if (bizType) c.bizType = bizType;
				return c;
			}
			_render() {
				if (!this._root) return;
				const extensionId = this.getAttribute(ATTR_EXTENSION_ID) ?? "";
				const contribution = this._contributionProperty ?? this._readContributionFromAttrs();
				this._root.render(import_react.createElement(ExtensionMount, {
					extensionId,
					contribution
				}));
			}
		}
		customElements.define("wb-extension", WbExtensionElement);
	}
}));
//#endregion
export { ExtensionMount as n, init_extension_mount as r, ExtensionIframeHost as t };
