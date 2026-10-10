import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Krt as init_useI18n, qrt as useI18n } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime, qh as require_classnames } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/miora-preview/index.module.scss
var previewContainer, viewerFrame, index_module_default;
var init_index_module = __esmMin((() => {
	previewContainer = "_previewContainer_l5qry_2";
	viewerFrame = "_viewerFrame_l5qry_8";
	index_module_default = {
		previewContainer,
		viewerFrame
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/miora-preview/telemetry.ts
/** 统一上报入口（适配 Desktop buddyAPI / Web autotracker） */
function reportMioraEvent(eventCode, payload) {
	try {
		const buddyAPI = window.buddyAPI;
		if (buddyAPI?.telemetryReport) {
			buddyAPI.telemetryReport(eventCode, payload).catch(() => {});
			return;
		}
		const autotracker = window.__autotracker;
		if (autotracker?.dtReport) autotracker.dtReport(eventCode, payload);
	} catch {}
}
var MIORA_EVENT_PREVIEW_OPEN, MIORA_EVENT_PREVIEW_RENDER;
var init_telemetry = __esmMin((() => {
	MIORA_EVENT_PREVIEW_OPEN = "miora_canvas_preview_open";
	MIORA_EVENT_PREVIEW_RENDER = "miora_canvas_preview_render";
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/miora-preview/types.ts
/** 判定是否为 viewer 发来的合法消息 */
function isMioraViewerMessage(data) {
	if (!data || typeof data !== "object") return false;
	const candidate = data;
	return candidate.source === "miora-local-viewer" && (candidate.type === "ready" || candidate.type === "error");
}
var MIORA_HOST_SOURCE;
var init_types = __esmMin((() => {
	MIORA_HOST_SOURCE = "workbuddy-host";
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/miora-preview/miora-preview-component.tsx
var miora_preview_component_exports = /* @__PURE__ */ __exportAll({ MioraPreviewComponent: () => MioraPreviewComponent });
var import_classnames, import_react, import_jsx_runtime, PlaceholderMessage, MioraPreviewComponent;
var init_miora_preview_component = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_index_module();
	init_telemetry();
	init_types();
	import_jsx_runtime = require_jsx_runtime();
	PlaceholderMessage = ({ message, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: (0, import_classnames.default)(className, "empty-content"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message })
	});
	MioraPreviewComponent = ({ className, file, filePath, resolveViewerLocation }) => {
		const { t } = useI18n();
		const iframeRef = (0, import_react.useRef)(null);
		const [viewerUrl, setViewerUrl] = (0, import_react.useState)("");
		const [assetsBase, setAssetsBase] = (0, import_react.useState)("");
		const [error, setError] = (0, import_react.useState)(null);
		const pushedRef = (0, import_react.useRef)(false);
		const renderReportedRef = (0, import_react.useRef)(false);
		const mountTimeRef = (0, import_react.useRef)(0);
		const reportRender = (0, import_react.useCallback)((payload) => {
			if (renderReportedRef.current) return;
			renderReportedRef.current = true;
			reportMioraEvent(MIORA_EVENT_PREVIEW_RENDER, payload);
		}, []);
		(0, import_react.useEffect)(() => {
			pushedRef.current = false;
			renderReportedRef.current = false;
			mountTimeRef.current = performance.now();
			setViewerUrl("");
			setAssetsBase("");
			setError(null);
			reportMioraEvent(MIORA_EVENT_PREVIEW_OPEN, {});
		}, [filePath]);
		(0, import_react.useEffect)(() => {
			if (!resolveViewerLocation) reportRender({ result: "unsupported_env" });
		}, [resolveViewerLocation, reportRender]);
		(0, import_react.useEffect)(() => {
			if (!filePath || !resolveViewerLocation) return;
			let cancelled = false;
			resolveViewerLocation(filePath).then((location) => {
				if (cancelled) return;
				if (!location) {
					setError(t("mediaPreview.miora.locateFailed"));
					reportRender({
						result: "failed",
						error_code: "locate_failed"
					});
					return;
				}
				setViewerUrl(location.viewerUrl);
				setAssetsBase(location.assetsBase);
			}).catch((err) => {
				if (cancelled) return;
				console.error("[MioraPreview] 解析 viewer 地址失败:", err);
				setError(t("mediaPreview.miora.locateFailed"));
				reportRender({
					result: "failed",
					error_code: "locate_failed",
					error_message: err instanceof Error ? err.message : String(err)
				});
			});
			return () => {
				cancelled = true;
			};
		}, [
			filePath,
			resolveViewerLocation,
			t,
			reportRender
		]);
		/** 把字节推给 viewer。用 transferable 避免大画布的结构化克隆开销。 */
		const pushCanvas = (0, import_react.useCallback)(async () => {
			const frame = iframeRef.current;
			if (!frame?.contentWindow || !file || !assetsBase || pushedRef.current) return;
			pushedRef.current = true;
			try {
				const bytes = await file.arrayBuffer();
				frame.contentWindow.postMessage({
					source: MIORA_HOST_SOURCE,
					type: "init",
					bytes,
					assetsBase
				}, new URL(viewerUrl).origin, [bytes]);
				reportRender({
					result: "success",
					duration_ms: Math.round(performance.now() - mountTimeRef.current)
				});
			} catch (err) {
				console.error("[MioraPreview] 推送画布字节失败:", err);
				setError(t("mediaPreview.miora.loadFailed"));
				reportRender({
					result: "failed",
					error_code: "push_failed",
					error_message: err instanceof Error ? err.message : String(err)
				});
			}
		}, [
			file,
			assetsBase,
			viewerUrl,
			t,
			reportRender
		]);
		(0, import_react.useEffect)(() => {
			if (!viewerUrl) return;
			const onMessage = (event) => {
				if (event.source !== iframeRef.current?.contentWindow) return;
				if (!isMioraViewerMessage(event.data)) return;
				if (event.data.type === "ready") {
					pushCanvas().catch(() => {});
					return;
				}
				console.error("[MioraPreview] viewer 报错:", event.data.message);
				setError(event.data.message || t("mediaPreview.miora.loadFailed"));
				reportRender({
					result: "failed",
					error_code: "viewer_error",
					error_message: event.data.message
				});
			};
			window.addEventListener("message", onMessage);
			return () => window.removeEventListener("message", onMessage);
		}, [
			viewerUrl,
			pushCanvas,
			t,
			reportRender
		]);
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderMessage, {
			className,
			message: error
		});
		if (!resolveViewerLocation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderMessage, {
			className,
			message: t("mediaPreview.miora.unsupportedEnv")
		});
		if (!file || !viewerUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderMessage, {
			className,
			message: t("mediaPreview.miora.loading")
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(className, index_module_default.previewContainer),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				ref: iframeRef,
				src: viewerUrl,
				className: index_module_default.viewerFrame,
				sandbox: "allow-scripts allow-same-origin",
				title: "Miora Canvas Viewer"
			})
		});
	};
}));
//#endregion
export { init_miora_preview_component as n, miora_preview_component_exports as r, MioraPreviewComponent as t };
