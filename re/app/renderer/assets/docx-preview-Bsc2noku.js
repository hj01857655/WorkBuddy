import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { d8 as init_MediaPreviewContext, f8 as useMediaPreview } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { DocxPreviewComponent, t as init_docx_preview_component } from "./docx-preview-component-B3vtnI4H.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/docx-preview/index.tsx
var import_jsx_runtime, DocxPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_docx_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	DocxPreview = ({ className }) => {
		const { artifact, file, environmentType, theme } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocxPreviewComponent, {
			className,
			file,
			filename: name,
			environmentType,
			theme
		});
	};
}))();
export { DocxPreview };
