import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { d8 as init_MediaPreviewContext, f8 as useMediaPreview } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { PDFPreviewComponent, t as init_pdf_preview_component } from "./pdf-preview-component-D9HimaSA.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/pdf-preview/index.tsx
var import_jsx_runtime, PDFPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_pdf_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	PDFPreview = ({ className }) => {
		const { artifact, file, theme, environmentType } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PDFPreviewComponent, {
			className,
			filename: name,
			file,
			environmentType,
			theme
		});
	};
}))();
export { PDFPreview };
