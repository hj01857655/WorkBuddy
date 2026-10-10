import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { d8 as init_MediaPreviewContext, f8 as useMediaPreview } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { SheetPreviewComponent, t as init_sheet_preview_component } from "./sheet-preview-component-DcHaPe3F.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/sheet-preview/index.tsx
var import_jsx_runtime, SheetPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_sheet_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	SheetPreview = ({ className }) => {
		const { artifact, file, isLoading, theme, environmentType } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetPreviewComponent, {
			className,
			filename: name,
			file,
			environmentType,
			isLoading,
			theme
		});
	};
}))();
export { SheetPreview };
