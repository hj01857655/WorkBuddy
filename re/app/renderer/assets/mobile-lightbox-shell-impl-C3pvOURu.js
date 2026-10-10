import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Got as init_use_t, Kot as n$1 } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as n$2, r as r$2, t as init_body_scroll_lock } from "./body-scroll-lock-CIexovr5.js";
import { n as TransformWrapper, r as init_index_esm, t as TransformComponent } from "./index.esm-CAKF9oMk.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/sheet-action/sheet-action.less
var init_sheet_action$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/sheet-action/sheet-action.mjs
var import_react$1, import_react_dom$1, a$1;
var init_sheet_action = __esmMin((() => {
	init_use_t();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_sheet_action$1();
	a$1 = ({ visible: a, onClose: o, items: s, cancelText: c }) => {
		let l = n$1();
		(0, import_react$1.useEffect)(() => {
			if (!a) return;
			let e = (e) => {
				e.key === `Escape` && (e.stopPropagation(), o());
			};
			return window.addEventListener(`keydown`, e, { capture: !0 }), () => window.removeEventListener(`keydown`, e, { capture: !0 });
		}, [a, o]), (0, import_react$1.useEffect)(() => {
			if (a) {
				let e = document.body.style.overflow;
				return document.body.style.overflow = `hidden`, () => {
					document.body.style.overflow = e;
				};
			}
		}, [a]);
		let u = (0, import_react$1.useCallback)(() => {
			o();
		}, [o]), d = (0, import_react$1.useCallback)((e) => {
			e.onClick(), o();
		}, [o]);
		return typeof document > `u` ? null : (0, import_react_dom$1.createPortal)(import_react$1.createElement(`div`, {
			className: `sc-sheet-action${a ? ` is-visible` : ``}`,
			onClick: u,
			"aria-hidden": !a
		}, import_react$1.createElement(`div`, {
			className: `sc-sheet-action__panel`,
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation()
		}, import_react$1.createElement(`div`, { className: `sc-sheet-action__list` }, s.map((e, n) => import_react$1.createElement(`button`, {
			key: n,
			type: `button`,
			className: `sc-sheet-action__item${e.danger ? ` is-danger` : ``}`,
			onClick: () => d(e)
		}, e.label)), import_react$1.createElement(`button`, {
			type: `button`,
			className: `sc-sheet-action__item`,
			onClick: o
		}, c == null ? l(`sheetAction.cancel`, `取消`) : c)))), document.body);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/mobile-lightbox-shell.less
var init_mobile_lightbox_shell = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/mobile-lightbox-shell-impl.mjs
function te(e, t, n) {
	if (Date.now() - t.current < 500) return !0;
	let r = n.current;
	if (n.current = null, r && Math.abs(e.clientX - r.x) + Math.abs(e.clientY - r.y) > 4) return !0;
	let i = e.target;
	return !!(i.closest(`button`) || i.closest(`.sc-sheet-action`));
}
function ne(e, t, n) {
	t.current = 0, e.current && (clearTimeout(e.current), e.current = null), n();
}
var import_react, import_react_dom, u;
//#endregion
__esmMin((() => {
	init_body_scroll_lock();
	init_sheet_action();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_index_esm();
	init_mobile_lightbox_shell();
	u = ({ items: u, initialIndex: d = 0, onClose: f, longPressItems: p, ariaLabel: re, onIndexChange: m, ItemComponent: h }) => {
		let g = (0, import_react.useRef)(d), [, ie] = (0, import_react.useState)(0), _ = (0, import_react.useCallback)((e) => {
			g.current = e, ie((e) => e + 1), m?.(e);
		}, [m]), v = u.length, y = v > 1, ae = u[g.current], b = (0, import_react.useRef)(/* @__PURE__ */ new Map()), x = (0, import_react.useRef)({
			width: 0,
			height: 0
		}), S = (0, import_react.useRef)(1), [C, w] = (0, import_react.useState)(1);
		(0, import_react.useEffect)(() => (n$2(), r$2), []);
		let T = (0, import_react.useRef)(null), E = (0, import_react.useRef)(null), D = (0, import_react.useRef)(0), O = (0, import_react.useRef)(0);
		(0, import_react.useEffect)(() => {
			O.current = Date.now();
		}, []);
		let k = (0, import_react.useCallback)((e) => {
			T.current = {
				x: e.clientX,
				y: e.clientY,
				time: Date.now()
			};
		}, []), A = (0, import_react.useCallback)(() => {
			let e = b.current.get(g.current);
			e && (S.current === 1 ? e.centerView(2) : e.resetTransform(300), requestAnimationFrame(() => w(S.current)));
		}, []), j = (0, import_react.useCallback)((e) => {
			if (O.current && Date.now() - O.current < 350 || te(e, N, T)) return;
			let t = Date.now();
			if (t - D.current < 300) {
				ne(E, D, A);
				return;
			}
			D.current = t, E.current = setTimeout(() => {
				E.current = null, D.current = 0, f();
			}, 300);
		}, [f, A]);
		(0, import_react.useEffect)(() => () => {
			E.current && clearTimeout(E.current);
		}, []);
		let M = (0, import_react.useRef)(null), N = (0, import_react.useRef)(0), [oe, P] = (0, import_react.useState)(!1), F = (0, import_react.useRef)(!1);
		(0, import_react.useEffect)(() => {
			let e = setTimeout(() => {
				F.current = !0;
			}, 300);
			return () => clearTimeout(e);
		}, []);
		let I = (0, import_react.useCallback)((e) => {
			if (!p || !F.current || e.touches.length !== 1) return;
			let t = e.touches[0], n = t.clientX, r = t.clientY, i = e.currentTarget;
			M.current = setTimeout(() => {
				N.current = Date.now(), P(!0), navigator.vibrate && navigator.vibrate(50);
			}, 500);
			let a = (e) => {
				let t = e;
				t.touches[0] && Math.abs(t.touches[0].clientX - n) + Math.abs(t.touches[0].clientY - r) > 10 && (M.current && (clearTimeout(M.current), M.current = null), i.removeEventListener(`touchmove`, a), i.removeEventListener(`touchend`, o));
			}, o = () => {
				M.current && (clearTimeout(M.current), M.current = null), i.removeEventListener(`touchmove`, a), i.removeEventListener(`touchend`, o);
			};
			i.addEventListener(`touchmove`, a, { passive: !0 }), i.addEventListener(`touchend`, o, { passive: !0 });
		}, [p]), se = (0, import_react.useCallback)((e, t) => {
			S.current = t.scale;
		}, []), ce = (0, import_react.useCallback)((e) => {
			let t = e.currentTarget;
			x.current = {
				width: t.offsetWidth,
				height: t.offsetHeight
			};
		}, []), L = (0, import_react.useCallback)((e) => {
			x.current = e;
		}, []), R = (0, import_react.useCallback)(() => {
			let e = window.innerWidth, t = x.current.width * S.current;
			if (t <= e) {
				let n = (e - t) / 2;
				return {
					minX: n,
					maxX: n
				};
			}
			return {
				minX: e - t,
				maxX: 0
			};
		}, []), z = (0, import_react.useCallback)(() => {
			let e = window.innerHeight, t = x.current.height * S.current;
			if (t <= e) {
				let n = (e - t) / 2;
				return {
					minY: n,
					maxY: n
				};
			}
			return {
				minY: e - t,
				maxY: 0
			};
		}, []), [B, V] = (0, import_react.useState)(0), [H, U] = (0, import_react.useState)(!1), W = (0, import_react.useRef)(null), G = (0, import_react.useRef)(null), K = (0, import_react.useCallback)(() => {
			var e;
			return (e = b.current.get(g.current)) == null ? null : e;
		}, []), le = (0, import_react.useCallback)((e) => {
			var t, n;
			if (e.touches.length !== 1 || H) return;
			let r = e.touches[0], i = K(), a = i == null ? void 0 : i.state;
			G.current = {
				startX: r.clientX,
				startY: r.clientY,
				startTime: Date.now(),
				direction: null,
				mode: null,
				startPositionX: (t = a == null ? void 0 : a.positionX) == null ? 0 : t,
				startPositionY: (n = a == null ? void 0 : a.positionY) == null ? 0 : n,
				stripOffset: 0
			}, U(!1), W.current && (clearTimeout(W.current), W.current = null);
		}, [H, K]), q = (0, import_react.useCallback)((e, t) => {
			let n = window.innerWidth, r = n * .25, i = Math.abs(e / t) > .3, a = g.current;
			return (e < -r || e < -30 && i) && a < v - 1 ? {
				targetDelta: -n,
				newIndex: a + 1
			} : (e > r || e > 30 && i) && a > 0 ? {
				targetDelta: n,
				newIndex: a - 1
			} : {
				targetDelta: 0,
				newIndex: a
			};
		}, [v]), J = (0, import_react.useCallback)((e) => {
			let t = g.current;
			V(t === 0 && e > 0 || t === v - 1 && e < 0 ? e * .3 : e);
		}, [v]), Y = (0, import_react.useCallback)((e) => {
			let t = G.current;
			if (!t) return;
			t.mode = `pan-image`;
			let { minY: n, maxY: r } = z(), i = Math.max(n, Math.min(r, t.startPositionY + e));
			K()?.setTransform(t.startPositionX, i, S.current, 0);
		}, [z, K]), X = (0, import_react.useCallback)((e, t, n) => {
			let r = G.current;
			if (!r) return;
			r.mode = `swipe-strip`;
			K()?.setTransform(e, r.startPositionY, S.current, 0);
			let a = g.current;
			V((n ? a >= v - 1 : a <= 0) ? t * .3 : t), r.stripOffset = t;
		}, [v, K]), Z = (0, import_react.useCallback)((e) => {
			let t = G.current;
			if (!t) return;
			let { minX: n, maxX: r } = R(), i = t.startPositionX + e;
			if (i < n - 2) X(n, i - n, !0);
			else if (i > r + 2) X(r, i - r, !1);
			else {
				t.mode = `pan-image`;
				K()?.setTransform(i, t.startPositionY, S.current, 0), V(0), t.stripOffset = 0;
			}
		}, [
			R,
			K,
			X
		]), Q = (0, import_react.useCallback)((e, t) => Math.abs(e) <= 5 && Math.abs(t) <= 5 ? null : Math.abs(e) > Math.abs(t) ? `horizontal` : `vertical`, []), $ = (0, import_react.useCallback)((e, t) => {
			if (e === `horizontal`) {
				let e = G.current;
				e && (e.mode = `carousel`), J(t);
			}
		}, [J]), ue = (0, import_react.useCallback)((e) => {
			let t = G.current;
			if (!t || e.touches.length !== 1) return;
			let n = e.touches[0].clientX - t.startX, r = e.touches[0].clientY - t.startY;
			if (t.direction === null) {
				let e = Q(n, r);
				if (!e) return;
				t.direction = e;
			}
			if (S.current === 1) {
				$(t.direction, n);
				return;
			}
			if (t.direction === `vertical`) {
				Y(r);
				return;
			}
			Z(n);
		}, [
			Q,
			$,
			Y,
			Z
		]), de = (0, import_react.useCallback)((e) => {
			let t = G.current;
			if (t && (G.current = null, w(S.current), t.mode === `carousel` || t.mode === `swipe-strip`)) {
				let { targetDelta: n, newIndex: r } = q(t.mode === `swipe-strip` ? t.stripOffset : e.changedTouches[0].clientX - t.startX, Date.now() - t.startTime);
				U(!0), V(n), W.current = setTimeout(() => {
					if (r !== g.current) b.current.get(g.current)?.resetTransform(0), S.current = 1, w(1);
					_(r), V(0), U(!1), W.current = null;
				}, 300);
			}
		}, [q, _]);
		if (!ae || typeof document > `u`) return null;
		let fe = -g.current * window.innerWidth + B;
		return (0, import_react_dom.createPortal)(import_react.createElement(`div`, {
			className: `sc-mobile-lightbox`,
			role: `dialog`,
			"aria-modal": `true`,
			"aria-label": re,
			onPointerDown: (e) => e.stopPropagation(),
			onClick: j,
			onMouseDownCapture: k,
			onKeyDown: (e) => e.stopPropagation()
		}, y && import_react.createElement(`div`, { className: `sc-mobile-lightbox__counter${C > 1 ? ` is-hidden` : ``}` }, g.current + 1, `/`, v), import_react.createElement(`div`, {
			className: `sc-mobile-lightbox__carousel`,
			onTouchStart: le,
			onTouchMove: ue,
			onTouchEnd: de
		}, import_react.createElement(`div`, {
			className: `sc-mobile-lightbox__strip`,
			style: {
				transform: `translateX(${fe}px)`,
				transition: H ? `transform 300ms ease-out` : `none`
			}
		}, u.map((e, t) => {
			let n = Math.abs(t - g.current) <= 1, i = t === g.current;
			return import_react.createElement(`div`, {
				key: t,
				className: `sc-mobile-lightbox__slide`
			}, n && import_react.createElement(TransformWrapper, {
				key: t,
				ref: (e) => {
					e ? b.current.set(t, e) : b.current.delete(t);
				},
				initialScale: 1,
				minScale: 1,
				maxScale: 8,
				wheel: { disabled: !0 },
				doubleClick: { disabled: !0 },
				panning: { disabled: !0 },
				limitToBounds: !0,
				centerOnInit: !0,
				onTransform: i ? se : void 0
			}, import_react.createElement(TransformComponent, {
				wrapperClass: `sc-mobile-lightbox__viewport`,
				contentClass: `sc-mobile-lightbox__content`
			}, import_react.createElement(`div`, {
				className: `sc-mobile-lightbox__item-wrap`,
				onTouchStart: I,
				"data-lightbox-content": !0
			}, h ? import_react.createElement(h, {
				item: e,
				onLoad: i ? L : void 0
			}) : import_react.createElement(`img`, {
				src: e.src,
				alt: e.alt,
				className: `sc-mobile-lightbox-item`,
				draggable: !1,
				onLoad: i ? ce : void 0
			})))));
		}))), p && import_react.createElement(a$1, {
			visible: oe,
			onClose: () => {
				Date.now() - N.current < 500 || P(!1);
			},
			items: p
		})), document.body);
	};
}))();
export { u as MobileLightboxShellImpl };
