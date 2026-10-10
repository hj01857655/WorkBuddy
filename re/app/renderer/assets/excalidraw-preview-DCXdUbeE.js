import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { d8 as init_MediaPreviewContext, f8 as useMediaPreview } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_excalidraw_preview_component, t as ExcalidrawPreviewComponent } from "./excalidraw-preview-component-DXgf6_pG.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/excalidraw-preview/index.tsx
var import_jsx_runtime, ExcalidrawPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_excalidraw_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	ExcalidrawPreview = ({ className }) => {
		const { artifact, content, environmentType, theme } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExcalidrawPreviewComponent, {
			className,
			content,
			filename: name,
			environmentType,
			theme
		});
	};
}))();
export { ExcalidrawPreview };
