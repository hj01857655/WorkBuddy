import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Got as init_use_t, Hot as init_clsx, Kot as n, Vot as clsx, _ot as Minus, fot as init_lucide_react, hot as Plus } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as useTransformComponent, i as useControls, r as init_index_esm } from "./index.esm-CAKF9oMk.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/zoom-controls-impl.mjs
var import_react, s;
//#endregion
__esmMin((() => {
	init_use_t();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_clsx();
	init_lucide_react();
	init_index_esm();
	s = ({ className: s }) => {
		let c = n(), { zoomIn: l, zoomOut: u, resetTransform: d } = useControls(), f = useTransformComponent(({ state: e }) => Math.round(e.scale * 100));
		return import_react.createElement(`span`, { className: clsx(s, `sc-lightbox-shell__btn-group`) }, import_react.createElement(`button`, {
			type: `button`,
			className: `sc-lightbox-shell__btn`,
			"aria-label": c(`lightbox.zoomOut`, `缩小`),
			onClick: () => u(.25)
		}, import_react.createElement(Minus, { size: 16 })), import_react.createElement(`button`, {
			type: `button`,
			className: `sc-lightbox-shell__btn sc-lightbox-shell__zoom-label`,
			"aria-label": c(`lightbox.resetZoom`, `重置缩放`),
			onClick: () => d()
		}, f, `%`), import_react.createElement(`button`, {
			type: `button`,
			className: `sc-lightbox-shell__btn`,
			"aria-label": c(`lightbox.zoomIn`, `放大`),
			onClick: () => l(.25)
		}, import_react.createElement(Plus, { size: 16 })));
	};
}))();
export { s as ZoomControlsImpl };
