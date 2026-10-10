import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cot as e, Got as init_use_t, Kot as n, fot as init_lucide_react, pot as X, wot as init_types, xot as ChevronLeft, yot as ChevronRight } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as n$1, r, t as init_body_scroll_lock } from "./body-scroll-lock-CIexovr5.js";
import { n as TransformWrapper, r as init_index_esm, t as TransformComponent } from "./index.esm-CAKF9oMk.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/lightbox-shell.less
var init_lightbox_shell = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/lightbox-shell-impl.mjs
var import_react, import_react_dom, m;
//#endregion
__esmMin((() => {
	init_use_t();
	init_types();
	init_body_scroll_lock();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_lucide_react();
	init_index_esm();
	init_lightbox_shell();
	m = ({ onClose: m, ariaLabel: h, children: g, navigation: _, toolbarExtra: v, initialZoom: y = 1, zoomBounds: b = e, className: x, contentClassName: S, resetKey: C }) => {
		let w = n(), T = (0, import_react.useRef)(null), E = (0, import_react.useRef)(null), D = (0, import_react.useRef)(null), O = (0, import_react.useRef)(0);
		(0, import_react.useEffect)(() => {
			O.current = Date.now();
		}, []);
		let k = _ && _.hasPrev !== !1, A = _ && _.hasNext !== !1;
		(0, import_react.useEffect)(() => {
			let e = () => {
				m();
			}, t = (e) => {
				_ && (e === `ArrowLeft` && k ? _.onPrev() : e === `ArrowRight` && A && _.onNext());
			}, n = (n) => {
				n.key === `Escape` ? (n.stopPropagation(), e()) : (n.key === `ArrowLeft` || n.key === `ArrowRight`) && (n.stopPropagation(), t(n.key));
			};
			return window.addEventListener(`keydown`, n, { capture: !0 }), () => window.removeEventListener(`keydown`, n, { capture: !0 });
		}, [
			m,
			_,
			k,
			A
		]), (0, import_react.useEffect)(() => (n$1(), r), []);
		let j = (0, import_react.useRef)(C);
		(0, import_react.useEffect)(() => {
			if (C !== void 0 && j.current !== C) {
				var e;
				j.current = C, (e = E.current) == null || e.resetTransform();
			}
		}, [C]);
		let M = (0, import_react.useCallback)((e) => {
			D.current = {
				x: e.clientX,
				y: e.clientY
			};
		}, []), N = (0, import_react.useCallback)((e) => {
			if (O.current && Date.now() - O.current < 350) return;
			let t = D.current;
			if (D.current = null, t && Math.abs(e.clientX - t.x) + Math.abs(e.clientY - t.y) > 4) return;
			let n = e.target;
			n.closest(`[data-lightbox-content]`) || n.closest(`button`) || m();
		}, [m]), P = (0, import_react.useCallback)((e) => {
			e.preventDefault();
		}, []);
		return typeof document > `u` ? null : (0, import_react_dom.createPortal)(import_react.createElement(`div`, {
			className: `sc-lightbox-shell${x ? ` ${x}` : ``}`,
			role: `dialog`,
			"aria-modal": `true`,
			"aria-label": h,
			onClick: N,
			onMouseDownCapture: M,
			onMouseDown: P
		}, import_react.createElement(`button`, {
			ref: T,
			type: `button`,
			className: `sc-lightbox-shell__close`,
			"aria-label": w(`lightbox.close`, `关闭`),
			onClick: (e) => {
				e.stopPropagation(), m();
			}
		}, import_react.createElement(X, { size: 18 })), _ && k && import_react.createElement(`button`, {
			type: `button`,
			className: `sc-lightbox-shell__nav sc-lightbox-shell__nav--prev`,
			"aria-label": w(`lightbox.prev`, `上一张`),
			onClick: (e) => {
				e.stopPropagation(), _.onPrev();
			}
		}, import_react.createElement(ChevronLeft, { size: 28 })), _ && A && import_react.createElement(`button`, {
			type: `button`,
			className: `sc-lightbox-shell__nav sc-lightbox-shell__nav--next`,
			"aria-label": w(`lightbox.next`, `下一张`),
			onClick: (e) => {
				e.stopPropagation(), _.onNext();
			}
		}, import_react.createElement(ChevronRight, { size: 28 })), import_react.createElement(TransformWrapper, {
			ref: E,
			initialScale: y,
			minScale: b.min,
			maxScale: b.max,
			wheel: {
				step: .02,
				wheelDisabled: !0
			},
			trackPadPanning: { disabled: !1 },
			doubleClick: {
				mode: `zoomIn`,
				step: .5
			},
			limitToBounds: !1,
			centerOnInit: !0
		}, import_react.createElement(TransformComponent, {
			wrapperClass: `sc-lightbox-shell__viewport${S ? ` ${S}` : ``}`,
			contentClass: `sc-lightbox-shell__content`
		}, import_react.createElement(`span`, {
			"data-lightbox-content": !0,
			className: `sc-lightbox-shell__content-inner`
		}, g)), v && import_react.createElement(`div`, {
			className: `sc-lightbox-shell__toolbar`,
			onClick: (e) => e.stopPropagation(),
			onMouseDown: (e) => e.stopPropagation()
		}, v))), document.body);
	};
}))();
export { m as LightboxShellImpl };
