import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Bot as u$1, Got as init_use_t, Kot as n$2, Lot as a$2, Qot as init_instance, Tot as init_dist, Uot as h$1, Wot as init_emoji_context, Xot as _, Yot as useTranslation, Zot as g, qot as init_es, zot as init_emoji_renderer } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
import { pickFallbackDisplayName as t$2, t as init_emoji_data } from "./emoji-data-CtT1gGm6.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/delegated-tooltip.mjs
function i$1({ containerRef: i }) {
	let a = (0, import_react$3.useRef)(null), o = (0, import_react$3.useRef)(null), s = (0, import_react$3.useRef)(), [c, l] = (0, import_react$3.useState)(null);
	return (0, import_react$3.useEffect)(() => {
		let e = i.current;
		e && e !== c && l(e);
	}), (0, import_react$3.useEffect)(() => {
		let e = document.createElement(`div`);
		return e.className = `sc-tooltip-content`, e.style.position = `fixed`, e.style.pointerEvents = `none`, e.style.visibility = `hidden`, e.style.transform = `translate(-50%, -100%) translateY(-6px)`, e.style.zIndex = `9999`, document.body.appendChild(e), a.current = e, () => {
			document.body.removeChild(e), a.current = null;
		};
	}, []), (0, import_react$3.useEffect)(() => {
		let e = c, t = a.current;
		if (!e || !t) return;
		let n = (e) => {
			var t;
			let n = e.target;
			return (t = n.closest) == null ? void 0 : t.call(n, `[${r$2}]`);
		}, i = () => {
			var e;
			let n = o.current;
			if (!n || !t) return;
			let r = n.getBoundingClientRect();
			t.textContent = (e = n.getAttribute(`data-tooltip`)) == null ? `` : e, t.style.left = `${r.left + r.width / 2}px`, t.style.top = `${r.top}px`, t.style.visibility = `visible`;
		}, l = () => {
			clearTimeout(s.current), t.style.visibility = `hidden`, o.current = null;
		}, u = (e) => {
			let t = n(e);
			t && (o.current = t, clearTimeout(s.current), s.current = setTimeout(i, 300));
		}, d = (e) => {
			var t, n;
			let i = (t = e.relatedTarget) == null || (n = t.closest) == null ? void 0 : n.call(t, `[${r$2}]`);
			i && i === o.current || l();
		}, f = () => {
			l();
		};
		return e.addEventListener(`mouseover`, u), e.addEventListener(`mouseout`, d), e.addEventListener(`scroll`, f, { passive: !0 }), () => {
			e.removeEventListener(`mouseover`, u), e.removeEventListener(`mouseout`, d), e.removeEventListener(`scroll`, f), clearTimeout(s.current);
		};
	}, [c]), null;
}
var import_react$3, r$2;
var init_delegated_tooltip = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	r$2 = `data-tooltip`;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/lazy-category-grid.mjs
function a$1(e) {
	return 26 + Math.ceil(e / 11) * 33 + 6;
}
function o$1({ isFirstScreen: o, itemCount: s, scrollRoot: c, categoryId: l, children: u }) {
	let [d, f] = (0, import_react$2.useState)(o), p = (0, import_react$2.useRef)(null);
	return (0, import_react$2.useEffect)(() => {
		if (d) return;
		let e = p.current, t = c.current;
		if (!e || !t) return;
		let n = new IntersectionObserver((e) => {
			e.some((e) => e.isIntersecting) && (f(!0), n.disconnect());
		}, {
			root: t,
			rootMargin: `200px 0px`
		});
		return n.observe(e), () => n.disconnect();
	}, [d, c]), d ? import_react$2.createElement(`div`, {
		ref: p,
		[i]: l
	}, u) : import_react$2.createElement(`div`, {
		ref: p,
		[i]: l,
		style: { height: a$1(s) }
	});
}
var import_react$2, i;
var init_lazy_category_grid = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	i = `data-cat-id`;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/parse-emoji-bundle.mjs
function e(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let [n, r] of Object.entries(e)) {
		let e = r.indexOf(`|`);
		e === -1 ? t.set(n, {
			name: r,
			keywords: []
		}) : t.set(n, {
			name: r.slice(0, e),
			keywords: r.slice(e + 1).split(`,`)
		});
	}
	return t;
}
var init_parse_emoji_bundle = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/use-emoji-i18n.mjs
function o() {
	let { i18n: o, ready: s } = useTranslation(g, { useSuspense: !1 }), c = o.language, l = (0, import_react$1.useMemo)(() => !s || !_.has(c) || typeof o.hasResourceBundle == `function` && !o.hasResourceBundle(c, `sc-editor-emoji`) ? a : e(o.getResourceBundle(c, g)), [
		c,
		s,
		o
	]);
	return (0, import_react$1.useMemo)(() => ({
		getName: (e, t) => {
			var n, r;
			return (n = (r = l.get(e)) == null ? void 0 : r.name) == null ? t : n;
		},
		getKeywords: (e, t) => {
			var n, r;
			return (n = (r = l.get(e)) == null ? void 0 : r.keywords) == null ? t : n;
		}
	}), [l]);
}
var import_react$1, a;
var init_use_emoji_i18n = __esmMin((() => {
	init_instance();
	init_parse_emoji_bundle();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_es();
	a = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/emoji-picker.less
var init_emoji_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/emoji-picker.mjs
function h({ onSelect: h, externalSearch: g, onRemove: _, excludeCustom: v }) {
	var y, b;
	let { sortedCategories: x } = h$1(), S = (0, import_react.useMemo)(() => v ? x.filter((e) => !e.isCustom) : x, [x, v]), [C, w] = (0, import_react.useState)((y = (b = S[0]) == null ? void 0 : b.id) == null ? `` : y), [T, E] = (0, import_react.useState)(``), D = (0, import_react.useRef)(null), O = (0, import_react.useRef)(!1), k = n$2(), { getName: A, getKeywords: j } = o(), M = (0, import_react.useMemo)(() => S.map((e) => ({
		...e,
		items: e.items.map((e) => ({
			value: e.value,
			name: e.name,
			keywords: e.keywords,
			displayName: A(e.value, t$2(e.value, e.name)),
			localizedKeywords: j(e.value, e.keywords)
		}))
	})), [
		S,
		A,
		j
	]);
	(0, import_react.useEffect)(() => {
		S.length !== 0 && (S.some((e) => e.id === C) || w(S[0].id));
	}, [S, C]);
	let N = g == null ? T : g, P = g !== void 0, F = N.length > 0, I = (0, import_react.useMemo)(() => {
		if (!F) return null;
		let e = N.toLowerCase(), t = [];
		for (let i of M) for (let a of i.items) {
			var n, r;
			(a.displayName.toLowerCase().includes(e) || a.name.toLowerCase().includes(e) || (n = a.localizedKeywords) != null && n.some((t) => t.includes(e)) || (r = a.keywords) != null && r.some((t) => t.includes(e))) && t.push({
				value: a.value,
				name: a.displayName,
				keywords: a.localizedKeywords
			});
		}
		return t;
	}, [
		N,
		F,
		M
	]), L = (0, import_react.useCallback)((e) => {
		let t = D.current, n = t == null ? void 0 : t.querySelector(`[${i}="${e}"]`);
		if (!n || !t) return;
		O.current = !0, w(e), n.scrollIntoView({
			block: `start`,
			behavior: `smooth`
		});
		let r = () => {
			O.current = !1;
		};
		`onscrollend` in t && t.addEventListener(`scrollend`, r, { once: !0 }), window.setTimeout(r, 400);
	}, []);
	(0, import_react.useEffect)(() => {
		let e = D.current;
		if (!e || F) return;
		let t = e.querySelectorAll(`[${i}]`);
		if (t.length === 0) return;
		let n = new IntersectionObserver((e) => {
			if (O.current) return;
			let t = e.filter((e) => e.isIntersecting).sort((e, t) => e.boundingClientRect.top - t.boundingClientRect.top)[0], n = t == null ? void 0 : t.target.getAttribute(i);
			n && w(n);
		}, {
			root: e,
			rootMargin: `0px 0px -80% 0px`,
			threshold: 0
		});
		return t.forEach((e) => {
			n.observe(e);
		}), () => n.disconnect();
	}, [F]);
	let R = (0, import_react.useCallback)((e) => {
		E(``), L(e);
	}, [L]), z = (0, import_react.useCallback)((e, t) => {
		e.preventDefault(), e.stopPropagation(), h(t);
	}, [h]), B = (0, import_react.useCallback)((e) => {
		E(e.target.value);
	}, []), V = (0, import_react.useCallback)((e) => {
		e.preventDefault(), e.stopPropagation(), _?.();
	}, [_]);
	return import_react.createElement(`div`, {
		className: `sc-emoji-picker`,
		role: `dialog`
	}, _ && import_react.createElement(`div`, { className: `sc-emoji-picker__header` }, import_react.createElement(`span`, { className: `sc-emoji-picker__header-title` }, k(`emojiPicker.title`, `表情符号`)), import_react.createElement(`button`, {
		type: `button`,
		className: `sc-emoji-picker__header-remove`,
		onMouseDown: V
	}, k(`emojiPicker.remove`, `移除`))), !P && import_react.createElement(`div`, { className: `sc-emoji-picker__search` }, import_react.createElement(`span`, { className: `sc-emoji-picker__search-icon` }, `🔍`), import_react.createElement(`input`, {
		type: `text`,
		className: `sc-emoji-picker__search-input`,
		placeholder: k(`emojiPicker.searchPlaceholder`, `筛选...`),
		value: T,
		onPaste: (e) => e.stopPropagation(),
		onChange: B
	})), import_react.createElement(i$1, { containerRef: D }), import_react.createElement(`div`, {
		className: `sc-emoji-picker__scroll scui-scrollable`,
		ref: D
	}, F ? import_react.createElement(import_react.Fragment, null, import_react.createElement(`div`, { className: `sc-emoji-picker__category-label` }, k(`emojiPicker.searchResults`, `搜索结果`)), import_react.createElement(`div`, { className: `sc-emoji-picker__grid` }, I && I.length === 0 && import_react.createElement(`div`, { className: `sc-emoji-picker__empty` }, k(`emojiPicker.noResults`, `无匹配结果`)), I == null ? void 0 : I.map((e) => import_react.createElement(`button`, {
		key: e.value,
		type: `button`,
		className: `sc-emoji-picker__item`,
		"aria-label": e.name,
		"data-tooltip": e.name,
		onMouseDown: (t) => z(t, e.value)
	}, import_react.createElement(u$1, { value: e.value }))))) : M.map((e, t) => import_react.createElement(o$1, {
		key: e.id,
		isFirstScreen: t === 0,
		itemCount: e.items.length,
		scrollRoot: D,
		categoryId: e.id
	}, import_react.createElement(`div`, { className: `sc-emoji-picker__category-label` }, k(`emojiPicker.categories.${e.key}`, e.key)), import_react.createElement(`div`, { className: `sc-emoji-picker__grid` }, e.items.map((e) => import_react.createElement(`button`, {
		key: e.value,
		type: `button`,
		className: `sc-emoji-picker__item`,
		"aria-label": e.displayName,
		"data-tooltip": e.displayName,
		onMouseDown: (t) => z(t, e.value)
	}, import_react.createElement(u$1, { value: e.value }))))))), !F && import_react.createElement(a$2.Provider, { delayDuration: 300 }, import_react.createElement(`div`, { className: `sc-emoji-picker__tabs` }, S.map((e) => import_react.createElement(a$2.Root, { key: e.id }, import_react.createElement(a$2.Trigger, { asChild: !0 }, import_react.createElement(`button`, {
		type: `button`,
		className: `sc-emoji-picker__tab${e.id === C ? ` is-active` : ``}`,
		onMouseDown: (t) => {
			t.preventDefault(), R(e.id);
		}
	}, e.icon.startsWith(`http`) || e.icon.startsWith(`custom:`) ? import_react.createElement(u$1, { value: e.icon }) : import_react.createElement(`span`, { className: `sc-emoji sc-emoji-native` }, e.icon))), import_react.createElement(a$2.Content, { side: `bottom` }, k(`emojiPicker.categories.${e.key}`, e.key)))))));
}
var import_react;
//#endregion
__esmMin((() => {
	init_use_t();
	init_emoji_context();
	init_emoji_renderer();
	init_emoji_data();
	init_delegated_tooltip();
	init_lazy_category_grid();
	init_use_emoji_i18n();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist();
	init_emoji_picker$1();
}))();
export { h as EmojiPicker };
