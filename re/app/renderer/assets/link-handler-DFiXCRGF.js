import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cr as init_detail_panel_tab_bridge, E as init_contexts, Mn as init_tencent_docs, UR as useTencentDocsFacade, VR as init_services, br as decorateTencentDocsLoginUrl, c as tencentDocsStore, ci as init_url_utils, gw as reportEvent, hw as reportError, ii as resolveDocumentPreviewSessionId, li as isTencentDocsUrl, s as init_store, ui as parseTencentDocsUrl, uw as init_browser, z3 as AdapterContext } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { b as init_file_service, y as getPreviewUrl } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
import { a as init_utils, o as isTencentDocsAuthError } from "./utils-C65Aew35.js";
//#region ../../packages/agent-ui/src/hooks/use-private-host.ts
/**
* 获取专享版私有化域名配置。
*
* @returns 下发了 privateHost 时返回其内容，否则 undefined（非专享版私有化 / 拉取失败）。
*/
function usePrivateHost() {
	const adapter = (0, import_react$3.useContext)(AdapterContext);
	const [privateHost, setPrivateHost] = (0, import_react$3.useState)(cachedPrivateHost);
	(0, import_react$3.useEffect)(() => {
		if (!adapter?.getProductConfiguration) return;
		let cancelled = false;
		const pull = (forceUpdate) => {
			adapter.getProductConfiguration?.(forceUpdate).then((config) => {
				if (cancelled) return;
				const next = config?.privateHost;
				cachedPrivateHost = next;
				setPrivateHost(next);
			}).catch(() => {});
		};
		pull(false);
		const unsubscribe = adapter.onProductConfigChanged?.(() => pull(true));
		return () => {
			cancelled = true;
			unsubscribe?.();
		};
	}, [adapter]);
	return privateHost;
}
var import_react$3, cachedPrivateHost;
var init_use_private_host = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/error-boundary.tsx
var import_react$2, import_jsx_runtime, ErrorBoundary;
var init_error_boundary = __esmMin((() => {
	init_browser();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	ErrorBoundary = class extends import_react$2.Component {
		constructor(props) {
			super(props);
			this.state = {
				hasError: false,
				error: null,
				errorInfo: null
			};
		}
		static getDerivedStateFromError(error) {
			return {
				hasError: true,
				error,
				errorInfo: null
			};
		}
		componentDidCatch(error, errorInfo) {
			try {
				reportError(error);
				reportEvent("react_error_boundary", {
					ext1: error.name,
					ext2: error.message,
					componentStack: errorInfo.componentStack ?? ""
				});
			} catch (reportErr) {
				console.error("[ErrorBoundary] aegis report failed:", reportErr);
			}
			console.error("ErrorBoundary caught an error:", error, errorInfo);
			this.setState({
				error,
				errorInfo
			});
		}
		render() {
			if (this.state.hasError) {
				if (this.props.fallback) return this.props.fallback;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "20px",
						backgroundColor: "#2d2d2d",
						color: "#cccccc",
						borderRadius: "8px",
						margin: "20px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: { color: "#f48771" },
							children: "⚠️ 出错了"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							style: {
								whiteSpace: "pre-wrap",
								marginTop: "10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								style: {
									cursor: "pointer",
									marginBottom: "10px"
								},
								children: "点击查看错误详情"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									backgroundColor: "#1e1e1e",
									padding: "15px",
									borderRadius: "4px",
									overflow: "auto"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "错误信息:" }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										style: { color: "#f48771" },
										children: this.state.error?.toString()
									}),
									this.state.errorInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: { marginTop: "15px" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "组件堆栈:" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										style: {
											fontSize: "12px",
											color: "#858585"
										},
										children: this.state.errorInfo.componentStack
									})] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.location.reload(),
							style: {
								marginTop: "15px",
								padding: "8px 16px",
								backgroundColor: "#007acc",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer"
							},
							children: "刷新页面"
						})
					]
				});
			}
			return this.props.children;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tencent-docs-resolver.ts
function useTencentDocsResolver(options) {
	const { adapter, onAuthExpired, previewSource, sessionIdProvider } = options;
	const tencentDocs = useTencentDocsFacade();
	const handleAuthExpired = (0, import_react$1.useCallback)(() => {
		tencentDocsStore.getState().markExpired();
		onAuthExpired?.();
	}, [onAuthExpired]);
	return {
		resolveByFile: (0, import_react$1.useCallback)(async (file, type = "openOriginalFile") => {
			const rawUrl = file.url ?? "";
			const fileId = file.file_id ?? "";
			const fallback = {
				url: rawUrl,
				rawUrl,
				isLoginUrl: false,
				fileId
			};
			if (!adapter?.getTencentDocsPreviewUrl) return fallback;
			try {
				const sessionId = resolveDocumentPreviewSessionId({
					source: previewSource,
					currentSessionId: sessionIdProvider?.()
				});
				const loginUrl = await getPreviewUrl(tencentDocs, file, type, sessionId);
				if (!loginUrl) {
					if (fileId) handleAuthExpired();
					return fallback;
				}
				return {
					url: decorateTencentDocsLoginUrl(loginUrl, fileId),
					rawUrl,
					isLoginUrl: true,
					fileId
				};
			} catch (err) {
				console.warn("[TencentDocsResolver] resolveByFile failed:", err);
				if (isTencentDocsAuthError(err)) handleAuthExpired();
				return fallback;
			}
		}, [
			adapter,
			tencentDocs,
			handleAuthExpired,
			previewSource,
			sessionIdProvider
		]),
		resolveByUrl: (0, import_react$1.useCallback)(async (url) => {
			if (!isTencentDocsUrl(url)) return {
				url,
				rawUrl: url,
				isLoginUrl: false,
				fileId: ""
			};
			const info = parseTencentDocsUrl(url);
			const cleanUrl = info?.url ?? url;
			const rawUrl = info?.rawUrl ?? url;
			const fileId = info?.fileId ?? "";
			if (!adapter?.getTencentDocsPreviewUrl || !fileId) return {
				url: rawUrl,
				rawUrl,
				isLoginUrl: false,
				fileId
			};
			try {
				const sessionId = resolveDocumentPreviewSessionId({
					source: previewSource,
					currentSessionId: sessionIdProvider?.()
				});
				const loginUrl = await getPreviewUrl(tencentDocs, {
					url: cleanUrl,
					file_id: fileId
				}, "openOriginalFile", sessionId);
				if (!loginUrl) {
					handleAuthExpired();
					return {
						url: rawUrl,
						rawUrl,
						isLoginUrl: false,
						fileId
					};
				}
				return {
					url: decorateTencentDocsLoginUrl(loginUrl, fileId),
					rawUrl,
					isLoginUrl: true,
					fileId
				};
			} catch (err) {
				console.warn("[TencentDocsResolver] resolveByUrl failed:", err);
				if (isTencentDocsAuthError(err)) handleAuthExpired();
				return {
					url: rawUrl,
					rawUrl,
					isLoginUrl: false,
					fileId
				};
			}
		}, [
			adapter,
			tencentDocs,
			handleAuthExpired,
			previewSource,
			sessionIdProvider
		]),
		isTencentDocsUrl
	};
}
var import_react$1;
var init_use_tencent_docs_resolver = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_tencent_docs();
	init_detail_panel_tab_bridge();
	init_services();
	init_file_service();
	init_store();
	init_url_utils();
	init_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tencent-docs-link.ts
function useTencentDocsLinkHandler(options) {
	const { adapter, openPreview, onAuthExpired, previewSource, sessionIdProvider } = options;
	const { resolveByUrl } = useTencentDocsResolver({
		adapter,
		onAuthExpired,
		previewSource,
		sessionIdProvider
	});
	return {
		handleTencentDocsLink: (0, import_react.useCallback)((url) => {
			if (!isTencentDocsUrl(url)) return false;
			resolveByUrl(url).then((result) => {
				openPreview(result.url);
			}).catch((err) => {
				console.warn("[TencentDocsLink] resolveByUrl threw unexpectedly; skip opening raw URL:", err);
			});
			return true;
		}, [openPreview, resolveByUrl]),
		isTencentDocsUrl
	};
}
var import_react;
var init_use_tencent_docs_link = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_url_utils();
	init_use_tencent_docs_resolver();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/link-handler.ts
var init_link_handler = __esmMin((() => {
	init_use_tencent_docs_link();
}));
//#endregion
export { init_error_boundary as a, ErrorBoundary as i, init_use_tencent_docs_link as n, init_use_private_host as o, useTencentDocsLinkHandler as r, usePrivateHost as s, init_link_handler as t };
