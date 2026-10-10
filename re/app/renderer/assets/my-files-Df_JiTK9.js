const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./knowledge-base-panel-FcaY2fds.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./locale-utils-TanlkH9x.js","./locale-utils-DQSZKef0.css","./cloud-file-constants-C-3tulP1.js","./store-B9VMId-K.js","./folder-picker-modal-C_2cTFqD.js","./api-BdQlPhCp.js","./entry-service-CKVris1X.js","./use-upload-queue-DwfNivwj.js","./space-utils-DG6Tz1-K.js","./use-tdoc-check-auth-gate-CPJZSL92.js","./utils-C65Aew35.js","./use-tdoc-check-auth-gate-CQmTBgUF.css","./oneid-activation-guide-DuXXdo_H.js","./folder-picker-modal-BGu7mpm9.css","./ime-enter-B7S7_Lmo.js","./upload-queue-store-BVflCZ9S.js","./lexiang-content-picker-Bo09zMCt.js","./lexiang-content-picker-WcRUMZ2k.css","./library-upload-cache-controller-eeFl-XMW.js","./miora-preview-component-BufXUi-3.js","./miora-preview-component-7lPvgHkO.css","./miora-preview-BHIXFrTj.js","./tencent-docs-panel-dIGh_dLK.js","./tencent-docs-panel-CWstWXXf.css","./network-error-state-DrLREio3.js","./network-error-state-HVOgPVUK.css","./use-file-search-BckALiMI.js","./use-file-search-D8aIgQme.css","./doc-selector-modal-BdchXZCg.js","./document-upload-runner-Df4UE8mW.js","./doc-selector-modal-BtYGisTp.css","./document-upload-dock-DVBzjcKJ.js","./document-upload-dock-Dr8IU9eV.css","./knowledge-base-panel-Bu60Z54E.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { dz as init_use_product_feature, fz as useProductFeature } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Ov as __vitePreload, Tv as require_jsx_runtime, kv as init_preload_helper } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/pages/my-files.tsx
function MyFilesPage() {
	const spaceFeatureEnabled = useProductFeature("Space", { mode: "enable" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
		children: spaceFeatureEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyTaskArtifactsPage, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyMyFilesPanel, {})
	});
}
var import_react, import_jsx_runtime, LazyTaskArtifactsPage, LazyMyFilesPanel;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_product_feature();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	LazyTaskArtifactsPage = import_react.lazy(() => __vitePreload(() => import("./knowledge-base-panel-FcaY2fds.js").then((n) => (n.a(), n.o)).then((module) => ({ default: module.TaskArtifactsPage })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]), import.meta.url));
	LazyMyFilesPanel = import_react.lazy(() => __vitePreload(() => import("./knowledge-base-panel-FcaY2fds.js").then((n) => (n.a(), n.o)).then((module) => ({ default: module.MyFilesPanel })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]), import.meta.url));
}))();
export { MyFilesPage };
