import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-V4kyJ4NV.js";
import { Grt as normalizeFileUrl, Wrt as init_file_path, d8 as init_MediaPreviewContext, f8 as useMediaPreview } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_miora_preview_component, t as MioraPreviewComponent } from "./miora-preview-component-BufXUi-3.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/miora-preview/index.tsx
var miora_preview_exports = /* @__PURE__ */ __exportAll({ MioraPreview: () => MioraPreview }), import_jsx_runtime, MioraPreview;
var init_miora_preview = __esmMin((() => {
	require_react();
	init_file_path();
	init_MediaPreviewContext();
	init_miora_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	MioraPreview = ({ className, resolveViewerLocation }) => {
		const { artifact, file, environmentType, theme } = useMediaPreview();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MioraPreviewComponent, {
			className,
			file,
			filePath: normalizeFileUrl(artifact?.url),
			filename: artifact?.title,
			environmentType,
			theme,
			resolveViewerLocation
		});
	};
}));
//#endregion
export { miora_preview_exports as n, init_miora_preview as t };
