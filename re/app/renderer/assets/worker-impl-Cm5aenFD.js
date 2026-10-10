(function() {
	//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor-l_04c84a1a05e6726708d6dad9626b384e/node_modules/@tencent/smart-doc-editor-local-adapter/dist/worker-impl.mjs
	var e = Object.create;
	var t = Object.defineProperty;
	var n = Object.getOwnPropertyDescriptor;
	var r = Object.getOwnPropertyNames;
	var i = Object.getPrototypeOf;
	var a = Object.prototype.hasOwnProperty;
	var o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
	var s = (e, n) => {
		let r = {};
		for (var i in e) t(r, i, {
			get: e[i],
			enumerable: !0
		});
		return n || t(r, Symbol.toStringTag, { value: `Module` }), r;
	};
	var c = (e, i, o, s) => {
		if (i && typeof i == `object` || typeof i == `function`) for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
			get: ((e) => i[e]).bind(null, d),
			enumerable: !(s = n(i, d)) || s.enumerable
		});
		return e;
	};
	var l = (n, r, a) => (a = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule ? t(a, `default`, {
		value: n,
		enumerable: !0
	}) : a, n));
	function u(e) {
		if (typeof crypto < `u` && typeof crypto.getRandomValues == `function`) crypto.getRandomValues(e);
		else for (let t = 0; t < e.length; t++) e[t] = Math.random() * 256 | 0;
	}
	function d(e = 22) {
		if (e <= 0) throw Error(`nanoid: size must be a positive integer, got ${e}`);
		let t = Math.ceil(1.6 * 63 * e / 62), n = new Uint8Array(t), r = ``;
		for (;;) {
			u(n);
			for (let i = 0; i < t; i++) {
				let t = n[i] & 63;
				if (t < 62 && (r += `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`[t], r.length === e)) return r;
			}
		}
	}
	function f(e) {
		return `--sc-text-${e}`;
	}
	function p(e) {
		return `--sc-bg-${e}`;
	}
	function m(e) {
		return `--sc-border-${e}`;
	}
	function h(e) {
		return `--sc-divider-${e}`;
	}
	const g = [
		{
			key: `default`,
			label: `colors.default`,
			light: `rgb(31, 31, 31)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `grey`,
			label: `colors.grey`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `blue`,
			label: `colors.blue`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blue`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `green`,
			label: `colors.green`,
			light: `rgb(69, 176, 118)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `yellow`,
			label: `colors.yellow`,
			light: `rgb(245, 196, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `orange`,
			label: `colors.orange`,
			light: `rgb(248, 136, 37)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `red`,
			label: `colors.red`,
			light: `rgb(222, 60, 54)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_red`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `purple`,
			label: `colors.purple`,
			light: `rgb(154, 56, 215)`,
			dark: `rgb(177, 92, 223)`
		}
	];
	const _ = {
		code: {
			light: `rgb(211, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		reminder: {
			light: `rgb(224, 120, 0)`,
			dark: `rgb(230, 146, 35)`
		}
	};
	const v = [
		{
			key: `default`,
			label: `colors.defaultBg`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `light_grey_background`,
			label: `colors.light_greyBg`,
			light: `rgb(243, 245, 247)`,
			dark: `rgb(45, 45, 45)`
		},
		{
			key: `light_blue_background`,
			label: `colors.light_blueBg`,
			light: `rgb(229, 239, 255)`,
			dark: `rgb(61, 92, 135)`
		},
		{
			key: `light_sky_blue_background`,
			label: `colors.light_sky_blueBg`,
			light: `rgb(229, 246, 255)`,
			dark: `rgb(40, 87, 129)`
		},
		{
			key: `light_green_background`,
			label: `colors.light_greenBg`,
			light: `rgb(234, 250, 241)`,
			dark: `rgb(23, 57, 43)`
		},
		{
			key: `light_yellow_background`,
			label: `colors.light_yellowBg`,
			light: `rgb(255, 249, 227)`,
			dark: `rgb(62, 52, 15)`
		},
		{
			key: `light_orange_background`,
			label: `colors.light_orangeBg`,
			light: `rgb(255, 243, 235)`,
			dark: `rgb(66, 39, 24)`
		},
		{
			key: `light_red_background`,
			label: `colors.light_redBg`,
			light: `rgb(255, 233, 232)`,
			dark: `rgb(74, 32, 34)`
		},
		{
			key: `light_rose_red_background`,
			label: `colors.light_rose_redBg`,
			light: `rgb(255, 236, 244)`,
			dark: `rgb(74, 31, 56)`
		},
		{
			key: `light_purple_background`,
			label: `colors.light_purpleBg`,
			light: `rgb(253, 235, 255)`,
			dark: `rgb(62, 32, 76)`
		},
		{
			key: `grey_background`,
			label: `colors.greyBg`,
			light: `rgb(235, 235, 235)`,
			dark: `rgb(58, 58, 58)`
		},
		{
			key: `dark_background`,
			label: `colors.darkBg`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(74, 74, 74)`
		},
		{
			key: `blue_background`,
			label: `colors.blueBg`,
			light: `rgb(199, 220, 255)`,
			dark: `rgb(34, 59, 108)`
		},
		{
			key: `sky_blue_background`,
			label: `colors.sky_blueBg`,
			light: `rgb(199, 236, 255)`,
			dark: `rgb(20, 72, 110)`
		},
		{
			key: `green_background`,
			label: `colors.greenBg`,
			light: `rgb(172, 226, 197)`,
			dark: `rgb(27, 82, 58)`
		},
		{
			key: `yellow_background`,
			label: `colors.yellowBg`,
			light: `rgb(255, 238, 173)`,
			dark: `rgb(91, 74, 12)`
		},
		{
			key: `orange_background`,
			label: `colors.orangeBg`,
			light: `rgb(255, 220, 196)`,
			dark: `rgb(98, 53, 28)`
		},
		{
			key: `red_background`,
			label: `colors.redBg`,
			light: `rgb(255, 201, 199)`,
			dark: `rgb(111, 40, 43)`
		},
		{
			key: `rose_red_background`,
			label: `colors.rose_redBg`,
			light: `rgb(255, 199, 226)`,
			dark: `rgb(111, 39, 80)`
		},
		{
			key: `purple_background`,
			label: `colors.purpleBg`,
			light: `rgb(242, 199, 255)`,
			dark: `rgb(91, 40, 113)`
		}
	];
	const y = [
		{
			key: `default`,
			label: `colors.defaultBorder`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `grey`,
			label: `colors.greyBorder`,
			light: `rgb(128, 134, 143)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue`,
			label: `colors.blueBorder`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blueBorder`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green`,
			label: `colors.greenBorder`,
			light: `rgb(168, 224, 194)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow`,
			label: `colors.yellowBorder`,
			light: `rgb(249, 227, 139)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange`,
			label: `colors.orangeBorder`,
			light: `rgb(255, 186, 133)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red`,
			label: `colors.redBorder`,
			light: `rgb(255, 166, 163)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_redBorder`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple`,
			label: `colors.purpleBorder`,
			light: `rgb(231, 180, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	];
	const b = [
		{
			key: `default`,
			label: `colors.defaultDivider`,
			light: `rgba(0, 0, 0, 0.12)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `black_divider`,
			label: `colors.blackDivider`,
			light: `rgb(0, 0, 0)`,
			dark: `rgb(65, 68, 74)`
		},
		{
			key: `grey_divider`,
			label: `colors.greyDivider`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `light_grey_divider`,
			label: `colors.light_greyDivider`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue_divider`,
			label: `colors.blueDivider`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `light_blue_divider`,
			label: `colors.light_blueDivider`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `table_blue_divider`,
			label: `colors.table_blueDivider`,
			light: `rgb(102, 183, 252)`,
			dark: `rgb(32, 93, 164)`
		},
		{
			key: `sky_blue_divider`,
			label: `colors.sky_blueDivider`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `light_sky_blue_divider`,
			label: `colors.light_sky_blueDivider`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green_divider`,
			label: `colors.greenDivider`,
			light: `rgb(0, 179, 113)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `light_green_divider`,
			label: `colors.light_greenDivider`,
			light: `rgb(156, 228, 195)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow_divider`,
			label: `colors.yellowDivider`,
			light: `rgb(254, 193, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `light_yellow_divider`,
			label: `colors.light_yellowDivider`,
			light: `rgb(255, 237, 165)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange_divider`,
			label: `colors.orangeDivider`,
			light: `rgb(255, 128, 0)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `light_orange_divider`,
			label: `colors.light_orangeDivider`,
			light: `rgb(255, 218, 193)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red_divider`,
			label: `colors.redDivider`,
			light: `rgb(242, 35, 41)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `light_red_divider`,
			label: `colors.light_redDivider`,
			light: `rgb(255, 198, 197)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red_divider`,
			label: `colors.rose_redDivider`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `light_rose_red_divider`,
			label: `colors.light_rose_redDivider`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple_divider`,
			label: `colors.purpleDivider`,
			light: `rgb(167, 46, 223)`,
			dark: `rgb(177, 92, 223)`
		},
		{
			key: `light_purple_divider`,
			label: `colors.light_purpleDivider`,
			light: `rgb(250, 197, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	];
	const x = {
		text: 10,
		background: 10,
		border: 9,
		divider: 7
	};
	function S(e) {
		let t = {};
		for (let n of e) t[n.key] = {
			light: n.light,
			dark: n.dark
		};
		return t;
	}
	const C = {
		text: {
			...S(g),
			..._
		},
		background: S(v),
		border: S(y),
		divider: S(b)
	};
	const ee = {
		text: g,
		background: v,
		border: y,
		divider: b
	};
	const w = x;
	const T = {
		text: f,
		background: p,
		border: m,
		divider: h
	};
	function te(e, t) {
		let n = new Map(t.map((e) => [e.key, e])), r = [], i = /* @__PURE__ */ new Set();
		for (let t of e) {
			let e = n.get(t.key);
			r.push(e == null ? t : e), i.add(t.key);
		}
		for (let e of t) i.has(e.key) || r.push(e);
		return r;
	}
	function E(e) {
		return {
			text: {
				...S(e.text.entries),
				..._
			},
			background: S(e.background.entries),
			border: S(e.border.entries),
			divider: S(e.divider.entries)
		};
	}
	function ne(e) {
		if (!e || typeof e != `object`) return !1;
		let t = e;
		for (let e of [
			`text`,
			`background`,
			`border`,
			`divider`
		]) {
			let n = t[e];
			if (n && typeof n == `object` && `entries` in n) return !0;
		}
		return !1;
	}
	const re = new class {
		constructor(e) {
			if (!e) this.categories = {
				text: {
					entries: g,
					columns: w.text
				},
				background: {
					entries: v,
					columns: w.background
				},
				border: {
					entries: y,
					columns: w.border
				},
				divider: {
					entries: b,
					columns: w.divider
				}
			}, this.palette = C;
			else if (ne(e)) {
				this.categories = {};
				for (let n of [
					`text`,
					`background`,
					`border`,
					`divider`
				]) {
					let r = e[n];
					if (r) {
						var t;
						this.categories[n] = {
							entries: te(ee[n], r.entries),
							columns: (t = r.columns) == null ? w[n] : t
						};
					} else this.categories[n] = {
						entries: ee[n],
						columns: w[n]
					};
				}
				this.palette = E(this.categories);
			} else {
				let t = {
					text: {
						...C.text,
						...e.text
					},
					background: {
						...C.background,
						...e.background
					},
					border: {
						...C.border,
						...e.border
					},
					divider: {
						...C.divider,
						...e.divider
					}
				};
				this.palette = t, this.categories = {
					text: {
						entries: g,
						columns: w.text
					},
					background: {
						entries: v,
						columns: w.background
					},
					border: {
						entries: y,
						columns: w.border
					},
					divider: {
						entries: b,
						columns: w.divider
					}
				};
			}
		}
		getPalette() {
			return this.palette;
		}
		keys(e) {
			return Object.keys(this.palette[e]);
		}
		get(e, t) {
			return this.palette[e][t];
		}
		rgb(e, t, n) {
			var r;
			return (r = this.palette[e][t]) == null ? void 0 : r[n];
		}
		cssVar(e, t) {
			return `var(${T[e](t)})`;
		}
		cssVarName(e, t) {
			return T[e](t);
		}
		entries(e) {
			return this.categories[e].entries;
		}
		visibleEntries(e) {
			return this.categories[e].entries.filter((e) => !e.hidden);
		}
		columns(e) {
			return this.categories[e].columns;
		}
	}();
	const ie = Object.keys(C.text);
	const ae = Object.keys(C.background);
	const D = Object.keys(C.border);
	const O = Object.keys(C.divider);
	function k(e, t = []) {
		return {
			ok: !0,
			value: e,
			warnings: t
		};
	}
	function oe(e) {
		return {
			ok: !1,
			warnings: Array.isArray(e) ? e : [e]
		};
	}
	function A(e, t) {
		let n = e[t];
		if (n !== null) return typeof n == `string` ? n : void 0;
	}
	function se(e, t) {
		if (e[t] === null) return !0;
	}
	function ce(e, t) {
		if (!e || e === `undefined`) return {};
		let n = [];
		switch (t) {
			case `background`:
				n = ae;
				break;
			case `border`:
				n = D;
				break;
			case `text`:
				n = ie;
				break;
			case `divider`: n = O;
		}
		return n.includes(e) ? { value: e } : {
			value: e,
			warning: `unknown color token '${e}' for ${t}`
		};
	}
	function le(e, t) {
		for (let n of t) {
			let t = typeof e[n] == `string` ? e[n] : void 0;
			if (t !== void 0 && t !== `undefined`) return t;
		}
	}
	function ue(e, t, n = `default`) {
		return !e || e === n || e.endsWith(t) ? e == null ? void 0 : e : e + t;
	}
	function de(e, t, n, r) {
		let i = ce(e, t);
		return i.warning && r.push(`${n}: ${i.warning}`), i.value;
	}
	function fe(e) {
		let t = [], n = ue(le(e, [
			`blockColor`,
			`bgColor`,
			`backgroundColor`
		]), `_background`), r = le(e, [
			`borderColor`,
			`border`,
			`border_color`
		]), i = ue(typeof e.dividerColor == `string` ? e.dividerColor : void 0, `_divider`), a = de(n, `background`, `blockColor`, t), o = de(r, `border`, `borderColor`, t), s = de(i, `divider`, `dividerColor`, t);
		return k({
			...a ? { blockColor: a } : {},
			...o ? { borderColor: o } : {},
			...s ? { dividerColor: s } : {}
		}, t);
	}
	function pe(e, t) {
		typeof e.blockColor == `string` && (t.blockColor = e.blockColor), typeof e.borderColor == `string` && (t.borderColor = e.borderColor);
	}
	function me(e, t) {
		return typeof e.blockColor == `string` && (t.blockColor = e.blockColor.replace(`_background`, ``)), typeof e.borderColor == `string` && (t.borderColor = e.borderColor), e.id && (t.id = e.id), t;
	}
	function he(e, t) {
		for (let n of [
			`underline`,
			`italic`,
			`bold`,
			`strike`,
			`subscript`,
			`superscript`
		]) se(e, n) && (t[n] = !0);
	}
	function ge(e) {
		let t = [], n = {}, r = A(e, `color`);
		r && (n.color = de(r, `text`, `color`, t));
		let i = A(e, `backgroundColor`) || A(e, `bgColor`);
		return i && (n.backgroundColor = de(ue(i, `_background`), `background`, `backgroundColor`, t)), he(e, n), k(n, t);
	}
	const _e = typeof process < `u` && (process == null ? void 0 : {}) != null && false;
	function ve(e) {
		_e && console.warn(e);
	}
	function ye(e, t, n, r) {
		let i = e.get(t);
		i && ve(`[smart-doc-spec] BlockDescriptor "${n}" overwrites existing descriptor "${i.name}" on ${r} = "${t}". Use createDefaultRegistries({ blockOverrides }) if this is intentional.`);
	}
	var be = class {
		constructor() {
			this.namedMap = /* @__PURE__ */ new Map(), this.typedMap = /* @__PURE__ */ new Map(), this.alias = /* @__PURE__ */ new Map(), this.irTypeMap = /* @__PURE__ */ new Map(), this.mdastTypeMap = /* @__PURE__ */ new Map(), this.matchers = [];
		}
		register(e, t) {
			return ye(this.namedMap, e.name, e.name, `BlockDescriptor.name`), this.namedMap.set(e.name, e), this.indexByRecordType(e), this.indexByIrType(e), this.indexByHtmlMatches(e, t), this.indexByMdastTypes(e), this.indexByAliases(e), this;
		}
		indexByRecordType(e) {
			if (typeof e.recordType == `string` && this.typedMap.set(e.recordType, e), typeof e.recordType == `function` && Array.isArray(e.recordTypes)) for (let t of e.recordTypes) this.typedMap.set(t, e);
		}
		indexByIrType(e) {
			e.irType !== void 0 && (ye(this.irTypeMap, e.irType, e.name, `BlockDescriptor.irType`), this.irTypeMap.set(e.irType, e));
		}
		indexByHtmlMatches(e, t) {
			e.htmlMatch && e.htmlMatch.length > 0 && (t != null && t.prepend ? this.matchers.unshift(e) : this.matchers.push(e));
		}
		indexByMdastTypes(e) {
			if (e.fromMdast && Array.isArray(e.mdastTypes)) for (let t of e.mdastTypes) ye(this.mdastTypeMap, t, e.name, `BlockDescriptor.mdastTypes[]`), this.mdastTypeMap.set(t, e);
		}
		indexByAliases(e) {
			if (!(!e.aliases || e.aliases.length === 0)) for (let t of e.aliases) {
				let n = this.alias.get(t);
				n && ve(`[smart-doc-spec] BlockDescriptor "${e.name}" overwrites existing alias "${t}" -> "${n}". Use createDefaultRegistries({ blockOverrides }) if this is intentional.`), this.alias.set(t, e.name);
			}
		}
		registerAlias(e, t) {
			return this.alias.set(e, t), this;
		}
		getByName(e) {
			var t;
			let n = (t = this.alias.get(e)) == null ? e : t;
			return this.namedMap.get(n);
		}
		getByRecordType(e) {
			return this.typedMap.get(e);
		}
		getByIrType(e) {
			return this.irTypeMap.get(e);
		}
		getByMdastType(e) {
			return this.mdastTypeMap.get(e);
		}
		htmlMatchers() {
			return this.matchers;
		}
		hasName(e) {
			return !!this.getByName(e);
		}
		allowedComponentNames() {
			let e = /* @__PURE__ */ new Set();
			for (let t of this.namedMap.keys()) e.add(t);
			for (let t of this.alias.keys()) e.add(t);
			return e;
		}
	};
	const xe = {
		strong: `b`,
		emphasis: `i`,
		delete: `s`
	};
	function Se(e, t) {
		let [n, r] = t;
		return r === void 0 && e.some(([e, t]) => e === n && t === void 0) ? e : [...e, t];
	}
	function Ce(e) {
		let t = [];
		if (!e || typeof e != `object`) return t;
		let n = e;
		n.bold === !0 && t.push([`b`]), n.italic === !0 && t.push([`i`]), n.underline === !0 && t.push([`u`]), n.strike === !0 && t.push([`s`]), n.subscript === !0 && t.push([`sub`]), n.superscript === !0 && t.push([`sup`]);
		let r = n.color;
		typeof r == `string` && r && t.push([`h`, r]);
		let { backgroundColor: i } = n;
		return typeof i == `string` && i && t.push([`g`, i]), t;
	}
	function we(e, t, n, r) {
		if (!e) return;
		let i = r ? Se(t, r) : t;
		n.push([e, i.length ? i : void 0]);
	}
	function Te(e, t, n) {
		let r = Se(e, n);
		t.push([`△`, r.length ? r : void 0]);
	}
	function Ee(e, t, n) {
		if (e) switch (e.type) {
			case `text`:
				var r;
				we((r = e.value) == null ? `` : r, t, n);
				return;
			case `inlineCode`:
				De(e, t, n);
				return;
			case `inlineMath`:
				Oe(e, t, n);
				return;
			case `footnoteRef`:
				j(e, t, n);
				return;
			case `strong`:
			case `emphasis`:
			case `delete`:
				ke(e, t, n);
				return;
			case `link`:
				M(e, t, n);
				return;
			case `span`:
				N(e, t, n);
				return;
			default: return;
		}
	}
	function De(e, t, n) {
		e.value && we(e.value, t, n, [`c`]);
	}
	function Oe(e, t, n) {
		e.value && Te(t, n, [`ei`, [e.value, d(10)]]);
	}
	function j(e, t, n) {
		e.id && Te(t, n, [`fn`, e.id]);
	}
	function ke(e, t, n) {
		let r = xe[e.type], i = r ? Se(t, [r]) : t;
		Ae(e.children, i, n);
	}
	function M(e, t, n) {
		let r = Se(t, [`t`, e.url]);
		Ae(e.children, r, n);
	}
	function N(e, t, n) {
		let r = t;
		for (let t of Ce(e.marks)) r = Se(r, t);
		Ae(e.children, r, n);
	}
	function Ae(e, t, n) {
		for (let r of e == null ? [] : e) Ee(r, t, n);
	}
	function je(e, t) {
		if (e === t) return !0;
		if (Array.isArray(e) || Array.isArray(t)) {
			if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
			for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
			return !0;
		}
		return !1;
	}
	function Me(e, t) {
		if (!(e != null && e.length) && !(t != null && t.length)) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let n = 0; n < e.length; n++) {
			let [r, i] = e[n], [a, o] = t[n];
			if (r !== a || !je(i, o)) return !1;
		}
		return !0;
	}
	function P(e) {
		let t = [];
		for (let n of e) {
			let [e, r] = n;
			if (!e) continue;
			let i = t[t.length - 1];
			i && Me(i[1], r) ? i[0] += e : t.push([e, r]);
		}
		return t;
	}
	function Ne(e) {
		let t = [];
		for (let n of e) Ee(n, [], t);
		return P(t);
	}
	function Pe(e, t) {
		var n, r;
		let { onMissing: i = `empty`, keepParagraph: a = !1 } = t == null ? {} : t;
		if (e.type !== `custom`) return i === `skip` ? { restChildren: [] } : {
			title: [],
			restChildren: [],
			inline: []
		};
		let o = (n = e.children) == null ? [] : n, s = o.findIndex((e) => e.type === `paragraph`);
		if (s !== 0 && t != null && t.mustBeFirst && (s = -1), s === -1) return i === `skip` ? { restChildren: o } : {
			title: [],
			restChildren: o,
			inline: []
		};
		let c = (r = o[s].content) == null ? [] : r;
		return {
			title: Ne(c),
			restChildren: a ? o : o.filter((e, t) => t !== s),
			inline: c
		};
	}
	function F(e) {
		return {
			...e,
			parseMdxProps(t) {
				let n = [], r = e.parseMdxProps(t);
				if (n.push(...r.warnings), !r.ok) return oe(n);
				let i = fe(t);
				return n.push(...i.warnings), k({
					...r.value,
					...i.ok ? i.value : {}
				}, n);
			},
			toRecordProps(t) {
				let n = {};
				return pe(t, n), {
					...n,
					...e.toRecordProps(t)
				};
			},
			toIRProps(t) {
				let n = {};
				me(t, n);
				let r = e.toIRProps(t);
				return r.dividerColor && delete n.blockColor, {
					...n,
					...r
				};
			}
		};
	}
	function Fe(e) {
		return {
			...e,
			deriveIR: ({ record: e, props: t, children: n, cap: r }) => {
				if (e.props.title && e.props.title.length > 0) {
					let t = {
						type: `paragraph`,
						content: r.tokensToInlineIR(e.props.title)
					};
					n.unshift(t);
				}
				return {
					props: { ...t },
					children: n
				};
			}
		};
	}
	function Ie(e, t) {
		return {
			...e,
			deriveRecord: ({ node: e, props: n }) => {
				let { title: r = [], restChildren: i } = Pe(e, {
					onMissing: `empty`,
					keepParagraph: !1,
					mustBeFirst: t == null ? void 0 : t.mustBeFirst
				});
				return {
					props: {
						...n,
						title: r
					},
					consumeChildren: !1,
					restChildren: i
				};
			}
		};
	}
	function Le(e) {
		return {
			...e,
			parseMdxProps(t) {
				let n = [], r = e.parseMdxProps(t);
				if (!r.ok) return oe(r.warnings);
				n.push(...r.warnings);
				let i = ge(t);
				return n.push(...i.warnings), k({
					...r.value,
					...i.ok ? { __marks: i.value } : {}
				}, n);
			},
			buildInlineIR({ props: t, children: n }) {
				let r = e.buildInlineIR({
					props: t,
					children: n
				}), i = t.__marks;
				return !i || Object.keys(i).length === 0 ? r : {
					type: `span`,
					marks: i,
					children: [r]
				};
			}
		};
	}
	function Re(e, t) {
		let n = e.children[0];
		return (n == null ? void 0 : n.type) === `paragraph` ? t.serializeChildren(n.content) : ``;
	}
	function ze(e, t) {
		let [, ...n] = e.children;
		return t.serializeChildren(n);
	}
	function Be(e, t) {
		return `${Re(e, t)}${ze(e, t)}`;
	}
	const Ve = Fe(Ie(F({
		type: `bulleted_list`,
		category: `textContainer`,
		name: `BulletedList`,
		recordType: `bulleted_list`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul><li>${Be(e, t)}</li></ul>` : ``;
		},
		toPlainText(e, t) {
			let n = t.serializeText(e);
			return n ? `- ${n}` : ``;
		}
	})));
	const I = Fe(F({
		type: `callout`,
		category: `container`,
		name: `Callout`,
		recordType: `callout`,
		parseMdxProps(e) {
			let t = {}, n = A(e, `icon`);
			return n && (t.icon = n), k(t, []);
		},
		toRecordProps(e) {
			var t, n;
			let r = {};
			return e.icon && (r.pageIcon = e.icon), r.blockColor = (t = e.blockColor) == null ? `blue_background` : t, r.borderColor = (n = e.borderColor) == null ? `blue` : n, r;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Callout">${t.serializeChildren(e.children)}</div>` : ``;
		}
	}));
	const He = {
		type: `code`,
		category: `text`,
		name: `Code`,
		recordType: `code`,
		irType: `code`,
		htmlMatch: [{ validTagName: `pre` }],
		mdastTypes: [`code`],
		parseMdxProps(e) {
			let t = {}, n = A(e, `language`);
			n && (t.language = n);
			let r = A(e, `content`);
			return r !== void 0 && (t.content = r), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.language && (t.codeLanguage = e.language), e.content !== void 0 && (t.title = [[String(e.content)]]), t;
		},
		toIRProps(e) {
			let t = {};
			e.codeLanguage && (t.language = e.codeLanguage);
			let n = e.title;
			return n && n.length > 0 && (t.content = n.map(([e]) => e).join(`
`)), t;
		},
		toHtml(e, t) {
			if (e.type === `code`) return `<pre><code${e.lang ? ` class="language-${t.escapeHtml(e.lang)}"` : ``}>${t.escapeHtml(e.value)}</code></pre>`;
			if (e.type === `custom`) {
				let n = e.children.find((e) => e.type === `code`);
				return (n == null ? void 0 : n.type) === `code` ? `<pre><code${n.lang ? ` class="language-${t.escapeHtml(n.lang)}"` : ``}>${t.escapeHtml(n.value)}</code></pre>` : `<pre><code>${t.serializeChildren(e.children)}</code></pre>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			var n, r;
			let i = e;
			return {
				node: {
					type: `code`,
					lang: (n = i.lang) == null ? void 0 : n,
					value: (r = i.value) == null ? `` : r
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return e.type === `code` ? {
				type: `code`,
				lang: e.lang,
				value: e.value
			} : {
				type: `paragraph`,
				children: []
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `code`) return;
			let r = e.newId();
			if (t.lang === `mermaid`) {
				let i = e.resolveType(`mermaid`, `mermaid`);
				e.putBlock({
					id: r,
					parentId: n,
					type: i,
					props: { title: [[t.value]] },
					children: []
				}), e.appendChild(n, r);
				return;
			}
			let i = e.resolveType(`code`, `code`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {
					codeLanguage: t.lang,
					title: [[t.value]]
				},
				children: []
			}), e.appendChild(n, r);
		}
	};
	const L = F({
		type: `column_list`,
		category: `container`,
		name: `ColumnList`,
		recordType: `column_list`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = e, r = n.children.map((e) => {
				var t;
				return (t = e.props.width) == null ? `` : t;
			}), i = (e) => {
				let t = -1;
				return e && (e.trim().endsWith(`%`) ? t = Number(e.trim().split(`%`)[0]) / 100 : e.indexOf(`.`) > -1 && (t = Number(e))), t;
			}, a = (e) => !(Number.isNaN(e) || e < 0 || e > 1), o = r.map(i).filter(a), s = (1 - o.reduce((e, t) => e + t, 0)) / (n.children.length - o.length);
			for (let e of n.children) {
				var c;
				let t = e;
				a(i((c = t.props.width) == null ? `` : c)) || (t.props.width = `${s * 100}%`);
			}
			return {
				props: t,
				consumeChildren: !1
			};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="ColumnList">${t.serializeChildren(e.children)}</div>` : ``;
		}
	});
	const Ue = F({
		type: `column`,
		category: `container`,
		name: `Column`,
		recordType: `column`,
		parseMdxProps(e) {
			let t = {}, n = A(e, `width`);
			return n && (t.width = n), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (String(e.width).trim().endsWith(`%`) ? t.columnRatio = Number(String(e.width).trim().split(`%`)[0]) / 100 : t.columnRatio = Number(e.width)), t;
		},
		toIRProps(e) {
			let t = {};
			if (e.columnRatio) {
				let n = Number(e.columnRatio);
				Number.isNaN(n) || (t.width = `${(n * 100).toFixed(2)}%`);
			}
			return t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Column"${typeof e.props.width == `string` ? ` data-width="${t.escapeHtml(e.props.width)}"` : ``}>${t.serializeChildren(e.children)}</div>` : ``;
		}
	});
	const We = F({
		type: `divider`,
		category: `embed`,
		name: `Divider`,
		recordType: `divider`,
		irType: `divider`,
		htmlMatch: [{ validTagName: `hr` }],
		mdastTypes: [`thematicBreak`],
		parseMdxProps(e) {
			var t;
			let n = {}, r = (t = A(e, `dividerColor`)) == null ? A(e, `color`) : t;
			return r && (n.dividerColor = r, delete e.color, delete e.dividerColor), k(n, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.dividerColor && (t.blockColor = e.dividerColor.endsWith(`_divider`) ? e.dividerColor : `${e.dividerColor}_divider`), t;
		},
		toIRProps(e) {
			let t = {};
			return e.blockColor && (t.dividerColor = e.blockColor.replace(`_divider`, ``)), t;
		},
		fromHtml(e, t) {
			return { type: `divider` };
		},
		toHtml(e, t) {
			return `<hr>`;
		},
		fromMdast(e, t) {
			return {
				node: { type: `divider` },
				warnings: []
			};
		},
		toMdast(e, t) {
			return { type: `thematicBreak` };
		},
		emitRecord(e, t, n) {
			let r = e.newId(), i = e.resolveType(`divider`, `divider`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {},
				children: []
			}), e.appendChild(n, r);
		}
	});
	const Ge = F({
		type: `equation`,
		category: `embed`,
		name: `MathBlock`,
		recordType: `equation`,
		irType: `math`,
		mdastTypes: [`math`],
		parseMdxProps(e) {
			let t = {}, n = A(e, `width`);
			return n && (t.width = n), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveRecord({ node: e, props: t }) {
			var n, r;
			let { children: i } = e, a = [[(n = (r = (i == null ? [] : i).filter((e) => e.type === `math`)[0]) == null ? void 0 : r.value) == null ? `` : n]];
			return {
				props: {
					...t,
					title: a
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			var n;
			let r = {
				type: `math`,
				value: ((n = e.props.title) == null ? [] : n).map(([e]) => e).join(``)
			};
			return {
				props: { ...t },
				children: [r]
			};
		},
		toHtml(e, t) {
			if (e.type === `math`) return `<div data-type="math">${t.escapeHtml(e.value)}</div>`;
			if (e.type === `custom`) {
				let n = e.children.find((e) => e.type === `math`);
				return (n == null ? void 0 : n.type) === `math` ? `<div data-type="MathBlock">${t.escapeHtml(n.value)}</div>` : `<div data-type="MathBlock"></div>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			var n;
			return {
				node: {
					type: `math`,
					value: (n = e.value) == null ? `` : n
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return {
				type: `math`,
				value: e.type === `math` ? e.value : ``
			};
		},
		emitRecord(e, t, n) {
			let r = t.type === `math` ? t.value : ``, i = e.newId(), a = e.resolveType(`math`, `equation`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [[r]] },
				children: []
			}), e.appendChild(n, i);
		}
	});
	const Ke = F({
		type: `header1`,
		category: `text`,
		name: `Heading`,
		recordTypes: [
			`header1`,
			`header2`,
			`header3`,
			`header4`,
			`header5`,
			`header6`
		],
		irType: `heading`,
		htmlMatch: [{ validTagName: [
			`h1`,
			`h2`,
			`h3`,
			`h4`,
			`h5`,
			`h6`
		] }],
		mdastTypes: [`heading`],
		recordType(e) {
			return `header${e.level}`;
		},
		parseMdxProps(e) {
			let t = {}, n = A(e, `level`), r = A(e, `textAlign`);
			return n && (t.level = n), r && (t.textAlign = r), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = Pe(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => {
			var r;
			let i = e.type.replace(`header`, ``), a = {
				type: `paragraph`,
				content: n.tokensToInlineIR((r = e.props.title) == null ? [] : r)
			};
			return {
				props: {
					...t,
					level: i
				},
				children: [a]
			};
		},
		fromHtml(e, t) {
			let n = Number(e.tagName.slice(1)), r = t.blockTextAlign();
			return {
				type: `heading`,
				level: n,
				content: t.parseChildrenInline(),
				...r ? { textAlign: r } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = Number(e.props.level) || 1, r = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, i = e.children[0];
				return `<h${n}${r}>${(i == null ? void 0 : i.type) === `paragraph` ? t.serializeChildren(i.content) : t.serializeChildren(e.children)}</h${n}>`;
			}
			if (e.type === `heading`) {
				let n = e.textAlign ? ` style="text-align:${e.textAlign}"` : ``;
				return `<h${e.level}${n}>${t.serializeChildren(e.content)}</h${e.level}>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			let n = e;
			return {
				node: {
					type: `heading`,
					level: n.depth,
					content: t.parseInline(n.children, t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return e.type === `heading` ? {
				type: `heading`,
				depth: e.level,
				children: t.inlineIRsToMdast(e.content)
			} : {
				type: `paragraph`,
				children: []
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `heading`) return;
			let r = e.newId(), i = e.resolveType(`heading`, `header`);
			e.putBlock({
				id: r,
				parentId: n,
				type: `${i}${t.level}`,
				props: {
					title: Ne(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	});
	const qe = F({
		type: `image`,
		category: `embed`,
		name: `Image`,
		recordType: `image`,
		htmlMatch: [{ validTagName: `img` }],
		aliases: [`img`],
		parseMdxProps(e) {
			let t = {}, n = A(e, `src`), r = A(e, `alt`), i = A(e, `width`), a = A(e, `height`), o = A(e, `align`), s = A(e, `linkUrl`);
			return n && (t.src = n), r && (t.alt = r), i && (t.width = Number(i)), a && (t.height = Number(a)), o && (t.align = o), s && (t.linkUrl = s), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.src && (t.displaySource = e.src), e.alt && (t.title = [[e.alt]]), e.width && (t.width = e.width), e.height && (t.height = e.height), e.align && (t.align = e.align), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		toIRProps(e) {
			let t = {};
			return e.align && (t.align = e.align), e.displaySource && (t.src = e.displaySource), e.width && (t.width = e.width), e.height && (t.height = e.height), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = { ...t };
			return e.props.title && e.props.title.length > 0 && (n.alt = e.props.title.map(([e]) => e).join(``)), { props: n };
		},
		fromHtml(e, t) {
			let n = (t) => {
				let n = e.attributes[t];
				return typeof n == `string` ? n : void 0;
			}, r = n(`src`), i = n(`alt`), a = n(`width`), o = n(`height`), s = a === void 0 ? void 0 : Number(a), c = o === void 0 ? void 0 : Number(o);
			return {
				type: `custom`,
				name: `Image`,
				props: {
					...r ? { src: r } : {},
					...i ? { alt: i } : {},
					...s ? { width: s } : {},
					...c ? { height: c } : {}
				},
				children: []
			};
		},
		toHtml(e, t) {
			if (e.type !== `custom`) return ``;
			let n = typeof e.props.src == `string` ? e.props.src : ``, r = typeof e.props.alt == `string` ? e.props.alt : ``, i = e.props.width === void 0 ? `` : ` width="${t.escapeHtml(String(e.props.width))}"`, a = e.props.height === void 0 ? `` : ` height="${t.escapeHtml(String(e.props.height))}"`;
			return `<img src="${t.escapeHtml(n)}" alt="${t.escapeHtml(r)}"${i}${a} data-type="Image">`;
		}
	});
	const Je = F({
		type: `mermaid`,
		category: `embed`,
		name: `MermaidBlock`,
		recordType: `mermaid`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps() {
			return {};
		},
		toIRProps() {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			var n, r;
			let { children: i } = e, a = [[(n = (r = (i == null ? [] : i).filter((e) => e.type === `code`)[0]) == null ? void 0 : r.value) == null ? `` : n]];
			return {
				props: {
					...t,
					title: a
				},
				consumeChildren: !0
			};
		},
		deriveIR: ({ record: e, props: t }) => {
			var n;
			let r = {
				type: `code`,
				lang: `mermaid`,
				value: ((n = e.props.title) == null ? [] : n).map(([e]) => e).join(`
`)
			};
			return {
				props: { ...t },
				children: [r]
			};
		}
	});
	const Ye = [
		`number`,
		`letter`,
		`roman`
	];
	const Xe = /* @__PURE__ */ new WeakMap();
	function Ze(e, t, n) {
		return e === `restart` ? 1 : e === `continue` ? n > 0 ? n + 1 : 1 : t + 1;
	}
	function Qe(e, t) {
		let n = /* @__PURE__ */ new Map(), r = 0, i = 0;
		for (let o of e) {
			var a;
			let e = t.getRecordById(o);
			if (e) {
				if (e.type !== `numbered_list`) {
					r = 0;
					continue;
				}
				r = Ze((a = e.props) == null ? void 0 : a.numberType, r, i), n.set(o, r), i = r;
			}
		}
		return n;
	}
	function $e(e, t) {
		var n;
		let r = t.getSiblingIds(e.id);
		if (r.length === 0) return 1;
		let i = Xe.get(t);
		i || (i = /* @__PURE__ */ new WeakMap(), Xe.set(t, i));
		let a = i.get(r);
		return a || (a = Qe(r, t), i.set(r, a)), (n = a.get(e.id)) == null ? 1 : n;
	}
	function et(e, t) {
		let n = 1, r = t.getParentId(e.id);
		for (; r;) {
			let e = t.getRecordById(r);
			if (!e) break;
			(e.type === `numbered_list` || e.type === `bulleted_list`) && (n += 1), r = t.getParentId(r);
		}
		return n;
	}
	function tt(e) {
		let t = e, n = ``;
		for (; t > 0;) --t, n = String.fromCharCode(97 + t % 26) + n, t = Math.floor(t / 26);
		return n;
	}
	function nt(e) {
		let t = [
			[1e3, `m`],
			[900, `cm`],
			[500, `d`],
			[400, `cd`],
			[100, `c`],
			[90, `xc`],
			[50, `l`],
			[40, `xl`],
			[10, `x`],
			[9, `ix`],
			[5, `v`],
			[4, `iv`],
			[1, `i`]
		], n = Math.max(0, Math.min(3999, e)), r = ``;
		for (let [e, i] of t) for (; n >= e;) r += i, n -= e;
		return r;
	}
	function rt(e, t) {
		let n = $e(e, t);
		switch (Ye[(et(e, t) - 1) % Ye.length]) {
			case `letter`: return `${tt(n)}.`;
			case `roman`: return `${nt(n)}.`;
			default: return `${n}.`;
		}
	}
	const it = Fe(Ie(F({
		type: `numbered_list`,
		category: `textContainer`,
		name: `NumberedList`,
		recordType: `numbered_list`,
		parseMdxProps(e) {
			let t = {}, n = A(e, `numberType`);
			return (n === `restart` || n === `continue`) && (t.numberType = n), k(t, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ol><li>${Be(e, t)}</li></ol>` : ``;
		},
		toPlainText(e, t) {
			let n = t.serializeText(e);
			return n ? `${rt(e, t)} ${n}` : ``;
		}
	})));
	const at = Fe(Ie(F({
		type: `page`,
		category: `embed`,
		name: `Page`,
		recordType: `page`,
		parseMdxProps(e) {
			let t = {}, n = A(e, `icon`);
			return n && (t.icon = n), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.icon && (t.pageIcon = e.icon), t;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		}
	})));
	const ot = F({
		type: `text`,
		category: `textContainer`,
		name: `Paragraph`,
		recordType: `text`,
		irType: `paragraph`,
		htmlMatch: [{ validTagName: `p` }],
		mdastTypes: [`paragraph`],
		parseMdxProps(e) {
			let t = {}, n = A(e, `textAlign`);
			return n && (t.textAlign = n), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = Pe(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => {
			var r;
			return {
				props: t,
				children: [{
					type: `paragraph`,
					content: n.tokensToInlineIR((r = e.props.title) == null ? [] : r)
				}]
			};
		},
		fromHtml(e, t) {
			let n = t.blockTextAlign();
			return {
				type: `paragraph`,
				content: t.parseChildrenInline(),
				...n ? { textAlign: n } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, r = e.children[0];
				return `<p${n}>${(r == null ? void 0 : r.type) === `paragraph` ? t.serializeChildren(r.content) : t.serializeChildren(e.children)}</p>`;
			}
			return e.type === `paragraph` ? `<p${e.textAlign ? ` style="text-align:${e.textAlign}"` : ``}>${t.serializeChildren(e.content)}</p>` : ``;
		},
		fromMdast(e, t) {
			let n = e;
			if (n.children.length === 1 && n.children[0].type === `image`) return {
				node: ct(n.children[0]),
				warnings: []
			};
			if (n.children.length === 1 && n.children[0].type === `link`) {
				let e = n.children[0];
				if (e.children.length === 1 && e.children[0].type === `image`) return {
					node: ct(e.children[0], e.url),
					warnings: []
				};
			}
			return {
				node: {
					type: `paragraph`,
					content: t.parseInline(lt(n.children), t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			let n = e.type === `paragraph` ? e.content : [];
			return {
				type: `paragraph`,
				children: t.inlineIRsToMdast(n)
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `paragraph`) return;
			let r = e.newId(), i = e.resolveType(`paragraph`, `text`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {
					title: Ne(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	});
	const st = /(\s)\/([^/\s][^/]*[^/\s]|[^/\s])\/(?=\s)/g;
	function ct(e, t) {
		let n = {};
		return e.url && (n.src = e.url), e.alt && (n.alt = e.alt || e.title), t && (n.link = t), {
			type: `custom`,
			name: `Image`,
			props: n,
			children: []
		};
	}
	function lt(e) {
		let t = [];
		for (let n of e) {
			if (n.type !== `text`) {
				t.push(n);
				continue;
			}
			let e = dt(n.value);
			e.length === 1 && e[0].type === `raw` ? t.push(n) : t.push(...ut(e));
		}
		return t;
	}
	function ut(e) {
		let t = [];
		for (let n of e) n.type === `raw` && n.value ? t.push({
			type: `text`,
			value: n.value
		}) : n.type === `underline` && t.push(ft(n.value));
		return t;
	}
	function dt(e) {
		let t = [], n = 0;
		st.lastIndex = 0;
		for (let a of e.matchAll(st)) {
			var r, i;
			let o = a[1].length, s = ((r = a.index) == null ? 0 : r) + o, c = ((i = a.index) == null ? 0 : i) + a[0].length;
			s > n && t.push({
				type: `raw`,
				value: e.slice(n, s)
			}), t.push({
				type: `underline`,
				value: a[2]
			}), n = c;
		}
		return n < e.length && t.push({
			type: `raw`,
			value: e.slice(n)
		}), t.length === 0 && t.push({
			type: `raw`,
			value: e
		}), t;
	}
	function ft(e) {
		return {
			type: `mdxJsxTextElement`,
			name: `Mark`,
			attributes: [{
				type: `mdxJsxAttribute`,
				name: `underline`,
				value: null
			}],
			children: [{
				type: `text`,
				value: e
			}]
		};
	}
	const pt = {
		type: `paragraph`,
		content: []
	};
	const mt = Fe(F({
		type: `quote`,
		category: `container`,
		name: `BlockQuote`,
		recordType: `quote`,
		irType: `quote`,
		htmlMatch: [{ validTagName: `blockquote` }],
		mdastTypes: [`blockquote`],
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = `children` in e ? e.children : void 0;
			return {
				props: {
					...t,
					title: []
				},
				consumeChildren: !1,
				restChildren: n == null ? [] : n
			};
		},
		fromHtml(e, t) {
			return {
				type: `quote`,
				children: t.parseChildrenBlock()
			};
		},
		toHtml(e, t) {
			return e.type === `custom` || e.type === `quote` ? `<blockquote>${t.serializeChildren(e.children)}</blockquote>` : ``;
		},
		fromMdast(e, t) {
			var n;
			let r = e, { nodes: i, warnings: a } = t.blocksToIR((n = r.children) == null ? [] : n, { registries: t.registries });
			return {
				node: {
					type: `quote`,
					children: i
				},
				warnings: a
			};
		},
		toMdast(e, t) {
			return {
				type: `blockquote`,
				children: (e.type === `quote` ? e.children : []).map((e) => t.irNodeToMdastContent(e))
			};
		},
		emitRecord(e, t, n, r) {
			let i = e.newId(), a = e.resolveType(`quote`, `quote`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [] },
				children: []
			}), e.appendChild(n, i);
			let o = t.type === `quote` ? t.children : [], s = o.length ? o : [pt];
			for (let t of s) r(e, t, i);
		}
	}));
	function ht(e, t) {
		var n;
		let r = t;
		for (; ((n = e[r]) == null ? 0 : n) > 0;) --e[r], r += 1;
		return r;
	}
	function gt(e) {
		return e;
	}
	function _t(e) {
		return {
			colspan: typeof e.props.colspan == `number` ? e.props.colspan : 1,
			rowspan: typeof e.props.rowspan == `number` ? e.props.rowspan : 1
		};
	}
	function R(e, t) {
		for (let r = t; r < e.length; r++) {
			var n;
			((n = e[r]) == null ? 0 : n) > 0 && --e[r];
		}
	}
	function vt(e) {
		let t = [], n = 0;
		for (let i of e.children) {
			let e = gt(i), a = 0;
			for (let i of e.children) {
				a = ht(t, a);
				let { colspan: e, rowspan: o } = _t(gt(i));
				if (o > 1) for (let n = a; n < a + e; n++) {
					var r;
					t[n] = ((r = t[n]) == null ? 0 : r) + (o - 1);
				}
				a += e, a > n && (n = a);
			}
			R(t, a);
		}
		return n;
	}
	function yt(e, t) {
		let n = [], r = [];
		for (let o = 0; o < e.children.length; o++) {
			let s = gt(e.children[o]), c = 0;
			for (let e = 0; e < s.children.length; e++) {
				var i;
				c = ht(n, c);
				let l = gt(s.children[e]), { colspan: u, rowspan: d } = _t(l);
				if (l.props.columnKey = (i = t[c]) == null ? t[t.length - 1] : i, (u > 1 || d > 1) && r.push({
					startCell: [o, c],
					endCell: [o + d - 1, c + u - 1]
				}), d > 1) for (let e = c; e < c + u; e++) {
					var a;
					n[e] = ((a = n[e]) == null ? 0 : a) + (d - 1);
				}
				c += u;
			}
			R(n, c);
		}
		return r;
	}
	function bt(e, t, n) {
		if (t.length === 0) return;
		let r = /* @__PURE__ */ new Map();
		for (let e of t) {
			let [t, a] = e.startCell, [o, s] = e.endCell;
			for (let e = t; e <= o; e++) for (let o = a; o <= s; o++) {
				var i;
				if (e === t && o === a) continue;
				let s = (i = n[o]) == null ? n[n.length - 1] : i, c = r.get(e);
				c || (c = [], r.set(e, c)), c.push({
					colIndex: o,
					columnKey: s
				});
			}
		}
		if (r.size === 0) return;
		let a = [];
		for (let t = 0; t < e.children.length; t++) {
			let n = gt(e.children[t]), i = r.get(t), s = [], c = 0;
			for (let e of n.children) {
				c = ht(a, c);
				let { colspan: t, rowspan: n } = _t(gt(e));
				if (s.push({
					gridCol: c,
					node: e
				}), n > 1) for (let e = c; e < c + t; e++) {
					var o;
					a[e] = ((o = a[e]) == null ? 0 : o) + (n - 1);
				}
				c += t;
			}
			if (R(a, c), !(i != null && i.length)) continue;
			let l = [...s];
			for (let e of i) {
				let t = {
					type: `custom`,
					name: `TableCell`,
					props: { columnKey: e.columnKey },
					children: [{
						type: `paragraph`,
						content: []
					}]
				};
				l.push({
					gridCol: e.colIndex,
					node: t
				});
			}
			l.sort((e, t) => e.gridCol - t.gridCol), gt(e.children[t]).children = l.map((e) => e.node);
		}
	}
	function xt(e, t, n) {
		let r = /* @__PURE__ */ new Map();
		if (n) for (let e = 0; e < n.length; e++) r.set(n[e], e);
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
		for (let e of t) {
			let [t, n] = e.startCell, [r, o] = e.endCell;
			i.set(`${t},${n}`, {
				colspan: o - n + 1,
				rowspan: r - t + 1
			});
			for (let e = t; e <= r; e++) for (let r = n; r <= o; r++) e === t && r === n || a.add(`${e},${r}`);
		}
		let o = [];
		e.forEach((e, t) => {
			let n = gt(e), s = [];
			for (let e of n.children) {
				var c;
				let n = gt(e), u = n.props.columnKey, d = u === void 0 || (c = r.get(u)) == null ? -1 : c;
				if (d < 0) {
					s.push(e);
					continue;
				}
				if (a.has(`${t},${d}`)) continue;
				let f = i.get(`${t},${d}`);
				if (f && (n.props.colspan = f.colspan, n.props.rowspan = f.rowspan, f.rowspan > 1)) for (let e = d; e < d + f.colspan; e++) {
					var l;
					o[e] = ((l = o[e]) == null ? 0 : l) + (f.rowspan - 1);
				}
				s.push(e);
			}
			n.children = s, R(o, 0);
		});
	}
	const St = [
		`top`,
		`middle`,
		`bottom`
	];
	const Ct = F({
		type: `simple_table`,
		category: `container`,
		name: `Table`,
		recordType: `simple_table`,
		parseMdxProps(e) {
			let t = {};
			return se(e, `columnHeader`) === !0 && (t.columnHeader = !0), se(e, `rowHeader`) === !0 && (t.rowHeader = !0), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnHeader === !0 && (t.tableColumnHeader = !0), e.rowHeader === !0 && (t.tableRowHeader = !0), t;
		},
		deriveRecord({ node: e, props: t, ctx: n }) {
			let r = e, i = vt(r), a = Array.from({ length: i }, () => n.newId(8)), o = yt(r, a);
			bt(r, o, a);
			let s = {
				...t,
				tableColumnOrder: a,
				tableColumnWidthMap: a.reduce((e, t) => (e[t] = 120, e), {})
			};
			return o.length > 0 && (s.cellRanges = o), {
				consumeChildren: !1,
				props: s
			};
		},
		toIRProps(e) {
			let t = { readonly: !0 };
			return e.tableColumnHeader === !0 && (t.columnHeader = !0), e.tableRowHeader === !0 && (t.rowHeader = !0), t;
		},
		deriveIR({ record: e, props: t, children: n }) {
			let r = e.props.cellRanges;
			if (!(r != null && r.length)) return {
				props: t,
				children: n
			};
			let i = e.props.tableColumnOrder;
			return xt(n, r, i), {
				props: t,
				children: n
			};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<table>${t.serializeChildren(e.children)}</table>` : ``;
		}
	});
	const wt = F({
		type: `simple_table_row`,
		category: `container`,
		name: `TableRow`,
		recordType: `simple_table_row`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<tr>${t.serializeChildren(e.children)}</tr>` : ``;
		}
	});
	const Tt = F({
		type: `simple_table_cell`,
		category: `container`,
		name: `TableCell`,
		recordType: `simple_table_cell`,
		parseMdxProps(e) {
			let t = {}, n = A(e, `columnKey`);
			n && (t.columnKey = n);
			let r = A(e, `colspan`), i = r === void 0 ? NaN : Number(r);
			Number.isInteger(i) && i > 1 && (t.colspan = i);
			let a = A(e, `rowspan`), o = a === void 0 ? NaN : Number(a);
			Number.isInteger(o) && o > 1 && (t.rowspan = o);
			let s = A(e, `verticalAlign`);
			return s && St.includes(s) && (t.verticalAlign = s), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnKey && (t.columnKey = e.columnKey), e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toIRProps(e) {
			let t = {};
			return e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<td>${t.serializeChildren(e.children)}</td>` : ``;
		}
	});
	const Et = Fe(Ie(F({
		type: `to_do`,
		category: `textContainer`,
		name: `Todo`,
		recordType: `to_do`,
		parseMdxProps(e) {
			let t = {}, n = se(e, `checked`);
			return n && (t.checked = n), k(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.checked && (t.checked = e.checked), t;
		},
		toIRProps(e) {
			let t = {};
			return typeof e.checked == `boolean` && (t.checked = e.checked), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul data-type="todo"><li${e.props.checked === !0 || e.props.checked === `true` ? ` data-checked` : ``}>${Be(e, t)}</li></ul>` : ``;
		},
		toPlainText(e, t) {
			let n = t.serializeText(e), r = e.props.checked === !0 ? `[x]` : `[ ]`;
			return n ? `${r} ${n}` : ``;
		}
	})));
	const Dt = Fe(Ie(F({
		type: `toggle`,
		category: `textContainer`,
		name: `Toggle`,
		recordType: `toggle`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		}
	})));
	const Ot = F({
		type: ``,
		category: `container`,
		name: `Unsupported`,
		recordType: ``,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {
				type: e.type,
				id: e.id,
				readonly: !0
			};
		}
	});
	const kt = Le({
		name: `Link`,
		inlineType: `link`,
		parseMdxProps(e) {
			let t = A(e, `href`);
			return t ? k({ href: t }, []) : oe([`Link.href is required`]);
		},
		buildInlineIR({ props: e, children: t }) {
			return {
				type: `link`,
				url: String(e.href),
				children: t
			};
		},
		htmlMatch: [{ validTagName: `a` }],
		fromHtml(e, t) {
			let n = typeof e.attributes.href == `string` ? e.attributes.href : ``, r = typeof e.attributes.title == `string` ? e.attributes.title : void 0;
			return {
				type: `link`,
				url: n,
				...r ? { title: r } : {},
				children: t.parseChildrenInline()
			};
		},
		toHtml(e, t) {
			if (e.type !== `link`) return ``;
			let n = e.title ? ` title="${t.escapeHtml(e.title)}"` : ``;
			return `<a href="${t.escapeHtml(e.url)}"${n}>${t.serializeChildren(e.children)}</a>`;
		}
	});
	const At = Le({
		name: `Mark`,
		inlineType: `span`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: {},
				children: e
			};
		},
		toHtml(e, t) {
			if (e.type !== `span`) return ``;
			let n = t.marksToStyle(e.marks);
			return n ? `<span style="${n}">${t.serializeChildren(e.children)}</span>` : t.serializeChildren(e.children);
		}
	});
	function jt(e, t, n, r) {
		let i = e.get(t);
		i && ve(`[smart-doc-spec] InlineDescriptor "${n}" overwrites existing descriptor "${i.name}" on ${r} = "${t}". Use createDefaultRegistries({ inlineOverrides }) if this is intentional.`);
	}
	var Mt = class {
		constructor() {
			this.map = /* @__PURE__ */ new Map(), this.inlineTypeMap = /* @__PURE__ */ new Map(), this.matchers = [];
		}
		register(e, t) {
			return jt(this.map, e.name, e.name, `InlineDescriptor.name`), this.map.set(e.name, e), e.inlineType !== void 0 && (jt(this.inlineTypeMap, e.inlineType, e.name, `InlineDescriptor.inlineType`), this.inlineTypeMap.set(e.inlineType, e)), e.htmlMatch && e.htmlMatch.length > 0 && (t != null && t.prepend ? this.matchers.unshift(e) : this.matchers.push(e)), this;
		}
		get(e) {
			return this.map.get(e);
		}
		getByInlineType(e) {
			return this.inlineTypeMap.get(e);
		}
		htmlMatchers() {
			return this.matchers;
		}
		allowedNames() {
			return new Set(this.map.keys());
		}
	};
	const Nt = [
		Ot,
		ot,
		I,
		L,
		Ue,
		Et,
		Dt,
		at,
		Ke,
		Ct,
		wt,
		Tt,
		We,
		qe,
		Ve,
		it,
		mt,
		Ge,
		He,
		Je
	];
	const Pt = [At, kt];
	function Ft(e, t) {
		let n = t == null ? void 0 : t[e.name];
		return n ? {
			...e,
			...n
		} : e;
	}
	function It(e, t) {
		let n = t == null ? void 0 : t[e.name];
		return n ? {
			...e,
			...n
		} : e;
	}
	function Lt(e, t) {
		let n = new be();
		for (let t of Nt) n.register(Ft(t, e));
		for (let e of t == null ? [] : t) n.register(e);
		return n;
	}
	function Rt(e, t) {
		let n = new Mt();
		for (let t of Pt) n.register(It(t, e));
		for (let e of t == null ? [] : t) n.register(e);
		return n;
	}
	function zt(e) {
		return {
			block: Lt(e == null ? void 0 : e.blockOverrides, e == null ? void 0 : e.extraBlocks),
			inline: Rt(e == null ? void 0 : e.inlineOverrides, e == null ? void 0 : e.extraInlines)
		};
	}
	const Bt = {
		black: [
			0,
			0,
			0
		],
		white: [
			255,
			255,
			255
		],
		red: [
			255,
			0,
			0
		],
		green: [
			0,
			128,
			0
		],
		blue: [
			0,
			0,
			255
		],
		yellow: [
			255,
			255,
			0
		],
		cyan: [
			0,
			255,
			255
		],
		magenta: [
			255,
			0,
			255
		],
		gray: [
			128,
			128,
			128
		],
		grey: [
			128,
			128,
			128
		],
		orange: [
			255,
			165,
			0
		],
		purple: [
			128,
			0,
			128
		],
		pink: [
			255,
			192,
			203
		],
		brown: [
			165,
			42,
			42
		],
		navy: [
			0,
			0,
			128
		],
		teal: [
			0,
			128,
			128
		],
		olive: [
			128,
			128,
			0
		],
		maroon: [
			128,
			0,
			0
		],
		lime: [
			0,
			255,
			0
		],
		aqua: [
			0,
			255,
			255
		],
		fuchsia: [
			255,
			0,
			255
		],
		silver: [
			192,
			192,
			192
		]
	};
	function z(e) {
		let t = e.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
		if (t) return [
			Number(t[1]),
			Number(t[2]),
			Number(t[3])
		];
		let n = e.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
		if (n) return [
			parseInt(n[1], 16),
			parseInt(n[2], 16),
			parseInt(n[3], 16)
		];
		let r = e.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
		return r ? [
			parseInt(r[1] + r[1], 16),
			parseInt(r[2] + r[2], 16),
			parseInt(r[3] + r[3], 16)
		] : Bt[e.trim().toLowerCase()] || null;
	}
	function Vt(e, t, n = []) {
		let r = [];
		for (let i of e.entries(t)) {
			if (n.includes(i.key)) continue;
			let e = z(i.light);
			e && r.push({
				token: i.key,
				r: e[0],
				g: e[1],
				b: e[2]
			});
		}
		return r;
	}
	const Ht = Vt(re, `text`, [
		`default`,
		`code`,
		`reminder`
	]);
	const Ut = Vt(re, `background`, [`default`]);
	Object.fromEntries(Ht.map(({ token: e, r: t, g: n, b: r }) => [e, `rgb(${t}, ${n}, ${r})`])), Object.fromEntries(Ut.map(({ token: e, r: t, g: n, b: r }) => [e, `rgb(${t}, ${n}, ${r})`]));
	function Wt(e, t, n, r, i, a) {
		let o = e - r, s = t - i, c = n - a;
		return 2 * o * o + 4 * s * s + 3 * c * c;
	}
	function Gt(e, t, n, r, i = 28800) {
		let a = ``, o = 1 / 0;
		for (let i of e) {
			let e = Wt(t, n, r, i.r, i.g, i.b);
			e < o && (o = e, a = i.token);
		}
		if (!(o > i)) return a;
	}
	function Kt(e, t) {
		let n = t.trim().toLowerCase();
		for (let t of e) if (t.token === n) return t.token;
	}
	function qt(e) {
		let t = Kt(Ht, e);
		if (t) return t;
		let n = z(e);
		if (n) return Gt(Ht, n[0], n[1], n[2]);
	}
	function Jt(e) {
		if (e === `transparent`) return;
		let t = Kt(Ut, e);
		if (t) return t;
		let n = z(e);
		if (!n) return;
		let [r, i, a] = n;
		if (!(r > 252 && i > 252 && a > 252)) return Gt(Ut, r, i, a);
	}
	function Yt(e) {
		return !e || typeof e != `object` ? `` : `position` in e || `type` in e ? Zt(e.position) : `start` in e || `end` in e ? Zt(e) : `line` in e || `column` in e ? Xt(e) : ``;
	}
	function Xt(e) {
		return Qt(e && e.line) + `:` + Qt(e && e.column);
	}
	function Zt(e) {
		return Xt(e && e.start) + `-` + Xt(e && e.end);
	}
	function Qt(e) {
		return e && typeof e == `number` ? e : 1;
	}
	var B = class extends Error {
		constructor(e, t, n) {
			super(), typeof t == `string` && (n = t, t = void 0);
			let r = ``, i = {}, a = !1;
			if (t && (i = `line` in t && `column` in t || `start` in t && `end` in t ? { place: t } : `type` in t ? {
				ancestors: [t],
				place: t.position
			} : { ...t }), typeof e == `string` ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == `string`) {
				let e = n.indexOf(`:`);
				e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
			}
			if (!i.place && i.ancestors && i.ancestors) {
				let e = i.ancestors[i.ancestors.length - 1];
				e && (i.place = e.position);
			}
			let o = i.place && `start` in i.place ? i.place.start : i.place;
			this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = ``, this.message = r, this.line = o ? o.line : void 0, this.name = Yt(i.place) || `1:1`, this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == `string` ? i.cause.stack : ``, this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
		}
	};
	B.prototype.file = ``, B.prototype.name = ``, B.prototype.reason = ``, B.prototype.message = ``, B.prototype.stack = ``, B.prototype.column = void 0, B.prototype.line = void 0, B.prototype.ancestors = void 0, B.prototype.cause = void 0, B.prototype.fatal = void 0, B.prototype.place = void 0, B.prototype.ruleId = void 0, B.prototype.source = void 0;
	const $t = {
		basename: en,
		dirname: tn,
		extname: nn,
		join: rn,
		sep: `/`
	};
	function en(e, t) {
		if (t !== void 0 && typeof t != `string`) throw TypeError(`"ext" argument must be a string`);
		sn(e);
		let n = 0, r = -1, i = e.length, a;
		if (t === void 0 || t.length === 0 || t.length > e.length) {
			for (; i--;) if (e.codePointAt(i) === 47) {
				if (a) {
					n = i + 1;
					break;
				}
			} else r < 0 && (a = !0, r = i + 1);
			return r < 0 ? `` : e.slice(n, r);
		}
		if (t === e) return ``;
		let o = -1, s = t.length - 1;
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
		return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
	}
	function tn(e) {
		if (sn(e), e.length === 0) return `.`;
		let t = -1, n = e.length, r;
		for (; --n;) if (e.codePointAt(n) === 47) {
			if (r) {
				t = n;
				break;
			}
		} else r || (r = !0);
		return t < 0 ? e.codePointAt(0) === 47 ? `/` : `.` : t === 1 && e.codePointAt(0) === 47 ? `//` : e.slice(0, t);
	}
	function nn(e) {
		sn(e);
		let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
		for (; t--;) {
			let s = e.codePointAt(t);
			if (s === 47) {
				if (o) {
					r = t + 1;
					break;
				}
				continue;
			}
			n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
		}
		return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? `` : e.slice(i, n);
	}
	function rn(...e) {
		let t = -1, n;
		for (; ++t < e.length;) sn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + `/` + e[t]);
		return n === void 0 ? `.` : an(n);
	}
	function an(e) {
		sn(e);
		let t = e.codePointAt(0) === 47, n = on(e, !t);
		return n.length === 0 && !t && (n = `.`), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += `/`), t ? `/` + n : n;
	}
	function on(e, t) {
		let n = ``, r = 0, i = -1, a = 0, o = -1, s, c;
		for (; ++o <= e.length;) {
			if (o < e.length) s = e.codePointAt(o);
			else if (s === 47) break;
			else s = 47;
			if (s === 47) {
				if (!(i === o - 1 || a === 1)) if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf(`/`), c !== n.length - 1) {
								c < 0 ? (n = ``, r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf(`/`)), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = ``, r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + `/..` : `..`, r = 2);
				} else n.length > 0 ? n += `/` + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
				i = o, a = 0;
			} else s === 46 && a > -1 ? a++ : a = -1;
		}
		return n;
	}
	function sn(e) {
		if (typeof e != `string`) throw TypeError(`Path must be a string. Received ` + JSON.stringify(e));
	}
	const cn = { cwd: ln };
	function ln() {
		return `/`;
	}
	function un(e) {
		return !!(typeof e == `object` && e && `href` in e && e.href && `protocol` in e && e.protocol && e.auth === void 0);
	}
	function dn(e) {
		if (typeof e == `string`) e = new URL(e);
		else if (!un(e)) {
			let t = TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
			throw t.code = `ERR_INVALID_ARG_TYPE`, t;
		}
		if (e.protocol !== `file:`) {
			let e = TypeError(`The URL must be of scheme file`);
			throw e.code = `ERR_INVALID_URL_SCHEME`, e;
		}
		return fn(e);
	}
	function fn(e) {
		if (e.hostname !== ``) {
			let e = TypeError(`File URL host must be "localhost" or empty on darwin`);
			throw e.code = `ERR_INVALID_FILE_URL_HOST`, e;
		}
		let t = e.pathname, n = -1;
		for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
			let e = t.codePointAt(n + 2);
			if (e === 70 || e === 102) {
				let e = TypeError(`File URL path must not include encoded / characters`);
				throw e.code = `ERR_INVALID_FILE_URL_PATH`, e;
			}
		}
		return decodeURIComponent(t);
	}
	const pn = [
		`history`,
		`path`,
		`basename`,
		`stem`,
		`extname`,
		`dirname`
	];
	var mn = class {
		constructor(e) {
			let t;
			t = e ? un(e) ? { path: e } : typeof e == `string` || vn(e) ? { value: e } : e : {}, this.cwd = `cwd` in t ? `` : cn.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
			let n = -1;
			for (; ++n < pn.length;) {
				let e = pn[n];
				e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === `history` ? [...t[e]] : t[e]);
			}
			let r;
			for (r in t) pn.includes(r) || (this[r] = t[r]);
		}
		get basename() {
			return typeof this.path == `string` ? $t.basename(this.path) : void 0;
		}
		set basename(e) {
			gn(e, `basename`), hn(e, `basename`), this.path = $t.join(this.dirname || ``, e);
		}
		get dirname() {
			return typeof this.path == `string` ? $t.dirname(this.path) : void 0;
		}
		set dirname(e) {
			_n(this.basename, `dirname`), this.path = $t.join(e || ``, this.basename);
		}
		get extname() {
			return typeof this.path == `string` ? $t.extname(this.path) : void 0;
		}
		set extname(e) {
			if (hn(e, `extname`), _n(this.dirname, `extname`), e) {
				if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
				if (e.includes(`.`, 1)) throw Error("`extname` cannot contain multiple dots");
			}
			this.path = $t.join(this.dirname, this.stem + (e || ``));
		}
		get path() {
			return this.history[this.history.length - 1];
		}
		set path(e) {
			un(e) && (e = dn(e)), gn(e, `path`), this.path !== e && this.history.push(e);
		}
		get stem() {
			return typeof this.path == `string` ? $t.basename(this.path, this.extname) : void 0;
		}
		set stem(e) {
			gn(e, `stem`), hn(e, `stem`), this.path = $t.join(this.dirname || ``, e + (this.extname || ``));
		}
		fail(e, t, n) {
			let r = this.message(e, t, n);
			throw r.fatal = !0, r;
		}
		info(e, t, n) {
			let r = this.message(e, t, n);
			return r.fatal = void 0, r;
		}
		message(e, t, n) {
			let r = new B(e, t, n);
			return this.path && (r.name = this.path + `:` + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
		}
		toString(e) {
			return this.value === void 0 ? `` : typeof this.value == `string` ? this.value : new TextDecoder(e || void 0).decode(this.value);
		}
	};
	function hn(e, t) {
		if (e && e.includes($t.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + $t.sep + "`");
	}
	function gn(e, t) {
		if (!e) throw Error("`" + t + "` cannot be empty");
	}
	function _n(e, t) {
		if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
	}
	function vn(e) {
		return !!(e && typeof e == `object` && `byteLength` in e && `byteOffset` in e);
	}
	function yn(e) {
		if (e) throw e;
	}
	var bn = o(((e, t) => {
		var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
			return typeof Array.isArray == `function` ? Array.isArray(e) : r.call(e) === `[object Array]`;
		}, s = function(e) {
			if (!e || r.call(e) !== `[object Object]`) return !1;
			var t = n.call(e, `constructor`), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, `isPrototypeOf`);
			if (e.constructor && !t && !i) return !1;
			for (var a in e);
			return a === void 0 || n.call(e, a);
		}, c = function(e, t) {
			i && t.name === `__proto__` ? i(e, t.name, {
				enumerable: !0,
				configurable: !0,
				value: t.newValue,
				writable: !0
			}) : e[t.name] = t.newValue;
		}, l = function(e, t) {
			if (t === `__proto__`) {
				if (!n.call(e, t)) return;
				if (a) return a(e, t).value;
			}
			return e[t];
		};
		t.exports = function e() {
			var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
			for (typeof d == `boolean` && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != `object` && typeof d != `function`) && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
				name: n,
				newValue: e(m, u, i)
			})) : i !== void 0 && c(d, {
				name: n,
				newValue: i
			}));
			return d;
		};
	}));
	function xn(e) {
		if (typeof e != `object` || !e) return !1;
		let t = Object.getPrototypeOf(e);
		return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
	}
	function Sn() {
		let e = [], t = {
			run: n,
			use: r
		};
		return t;
		function n(...t) {
			let n = -1, r = t.pop();
			if (typeof r != `function`) throw TypeError(`Expected function as last argument, not ` + r);
			i(null, ...t);
			function i(a, ...o) {
				let s = e[++n], c = -1;
				if (a) {
					r(a);
					return;
				}
				for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
				t = o, s ? Cn(s, i)(...o) : r(null, ...o);
			}
		}
		function r(n) {
			if (typeof n != `function`) throw TypeError("Expected `middelware` to be a function, not " + n);
			return e.push(n), t;
		}
	}
	function Cn(e, t) {
		let n;
		return r;
		function r(...t) {
			let r = e.length > t.length, o;
			r && t.push(i);
			try {
				o = e.apply(this, t);
			} catch (e) {
				let t = e;
				if (r && n) throw t;
				return i(t);
			}
			r || (o && o.then && typeof o.then == `function` ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
		}
		function i(e, ...r) {
			n || (n = !0, t(e, ...r));
		}
		function a(e) {
			i(null, e);
		}
	}
	const wn = (function(e) {
		let t = this.constructor.prototype, n = t[e], r = function() {
			return n.apply(r, arguments);
		};
		return Object.setPrototypeOf(r, t), r;
	});
	var Tn = l(bn(), 1);
	const En = {}.hasOwnProperty;
	const Dn = new class e extends wn {
		constructor() {
			super(`copy`), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Sn();
		}
		copy() {
			let t = new e(), n = -1;
			for (; ++n < this.attachers.length;) {
				let e = this.attachers[n];
				t.use(...e);
			}
			return t.data((0, Tn.default)(!0, {}, this.namespace)), t;
		}
		data(e, t) {
			return typeof e == `string` ? arguments.length === 2 ? (An(`data`, this.frozen), this.namespace[e] = t, this) : En.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (An(`data`, this.frozen), this.namespace = e, this) : this.namespace;
		}
		freeze() {
			if (this.frozen) return this;
			let e = this;
			for (; ++this.freezeIndex < this.attachers.length;) {
				let [t, ...n] = this.attachers[this.freezeIndex];
				if (n[0] === !1) continue;
				n[0] === !0 && (n[0] = void 0);
				let r = t.call(e, ...n);
				typeof r == `function` && this.transformers.use(r);
			}
			return this.frozen = !0, this.freezeIndex = 1 / 0, this;
		}
		parse(e) {
			this.freeze();
			let t = Nn(e), n = this.parser || this.Parser;
			return On(`parse`, n), n(String(t), t);
		}
		process(e, t) {
			let n = this;
			return this.freeze(), On(`process`, this.parser || this.Parser), kn(`process`, this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
			function r(r, i) {
				let a = Nn(e), o = n.parse(a);
				n.run(o, a, function(e, t, r) {
					if (e || !t || !r) return s(e);
					let i = t, a = n.stringify(i, r);
					Fn(a) ? r.value = a : r.result = a, s(e, r);
				});
				function s(e, n) {
					e || !n ? i(e) : r ? r(n) : t(void 0, n);
				}
			}
		}
		processSync(e) {
			let t = !1, n;
			return this.freeze(), On(`processSync`, this.parser || this.Parser), kn(`processSync`, this.compiler || this.Compiler), this.process(e, r), Mn(`processSync`, `process`, t), n;
			function r(e, r) {
				t = !0, yn(e), n = r;
			}
		}
		run(e, t, n) {
			jn(e), this.freeze();
			let r = this.transformers;
			return !n && typeof t == `function` && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
			function i(i, a) {
				let o = Nn(t);
				r.run(e, o, s);
				function s(t, r, o) {
					let s = r || e;
					t ? a(t) : i ? i(s) : n(void 0, s, o);
				}
			}
		}
		runSync(e, t) {
			let n = !1, r;
			return this.run(e, t, i), Mn(`runSync`, `run`, n), r;
			function i(e, t) {
				yn(e), r = t, n = !0;
			}
		}
		stringify(e, t) {
			this.freeze();
			let n = Nn(t), r = this.compiler || this.Compiler;
			return kn(`stringify`, r), jn(e), r(e, n);
		}
		use(e, ...t) {
			let n = this.attachers, r = this.namespace;
			if (An(`use`, this.frozen), e != null) if (typeof e == `function`) s(e, t);
			else if (typeof e == `object`) Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
			return this;
			function i(e) {
				if (typeof e == `function`) s(e, []);
				else if (typeof e == `object`) if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
				else throw TypeError("Expected usable value, not `" + e + "`");
			}
			function a(e) {
				if (!(`plugins` in e) && !(`settings` in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
				o(e.plugins), e.settings && (r.settings = (0, Tn.default)(!0, r.settings, e.settings));
			}
			function o(e) {
				let t = -1;
				if (e != null) if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
			function s(e, t) {
				let r = -1, i = -1;
				for (; ++r < n.length;) if (n[r][0] === e) {
					i = r;
					break;
				}
				if (i === -1) n.push([e, ...t]);
				else if (t.length > 0) {
					let [r, ...a] = t, o = n[i][1];
					xn(o) && xn(r) && (r = (0, Tn.default)(!0, o, r)), n[i] = [
						e,
						r,
						...a
					];
				}
			}
		}
	}().freeze();
	function On(e, t) {
		if (typeof t != `function`) throw TypeError("Cannot `" + e + "` without `parser`");
	}
	function kn(e, t) {
		if (typeof t != `function`) throw TypeError("Cannot `" + e + "` without `compiler`");
	}
	function An(e, t) {
		if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
	}
	function jn(e) {
		if (!xn(e) || typeof e.type != `string`) throw TypeError("Expected node, got `" + e + "`");
	}
	function Mn(e, t, n) {
		if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
	}
	function Nn(e) {
		return Pn(e) ? e : new mn(e);
	}
	function Pn(e) {
		return !!(e && typeof e == `object` && `message` in e && `messages` in e);
	}
	function Fn(e) {
		return typeof e == `string` || In(e);
	}
	function In(e) {
		return !!(e && typeof e == `object` && `byteLength` in e && `byteOffset` in e);
	}
	const Ln = /* @__PURE__ */ new Set([
		`simple_table`,
		`simple_table_row`,
		`column_list`,
		`footnote_list`
	]);
	function Rn(e, t) {
		if (Ln.has(e)) return !1;
		let n = t.block.getByRecordType(e);
		return n ? n.category === `container` : !1;
	}
	function zn(e, t, n) {
		for (let r of Object.values(e)) if (r.children.length === 0 && Rn(r.type, n)) {
			let n = t();
			e[n] = {
				id: n,
				parentId: r.id,
				type: `text`,
				table: `block`,
				props: { title: [] },
				children: []
			}, r.children.push(n);
		}
	}
	var Bn = class {
		constructor(e, t, n, r) {
			this.idFactory = e, this.typeMap = t, this.registries = n, this.preserveId = r, this._blocks = {}, this._containerCache = /* @__PURE__ */ new Map();
		}
		newId(e) {
			return this.idFactory(e);
		}
		resolveType(e, t) {
			var n;
			return (n = this.typeMap[e]) == null ? t : n;
		}
		putBlock(e) {
			this._blocks[e.id] = {
				...e,
				table: `block`
			};
		}
		appendChild(e, t) {
			let n = this._blocks[e];
			if (!n) throw Error(`父 block 不存在: ${e}`);
			n.children.push(t);
		}
		ensureChildContainer(e, t) {
			let n = this._containerCache.get(t);
			if (n) return n;
			let r = this.newId();
			return this.putBlock({
				id: r,
				parentId: e,
				parentTable: `block`,
				type: t,
				props: {},
				children: []
			}), this.appendChild(e, r), this._containerCache.set(t, r), r;
		}
		getBlocks() {
			return zn(this._blocks, this.idFactory, this.registries), this._blocks;
		}
	};
	const Vn = {
		irType: `custom`,
		emit(e, t, n, r) {
			let i = e.registries.block.getByName(t.name);
			if (!i) return;
			let a = typeof i.recordType == `function` ? i.recordType(t.props) : i.recordType;
			if (!a) {
				for (let i of t.children) r(e, i, n);
				return;
			}
			Hn(e, t, n, a, i, r);
		}
	};
	function Hn(e, t, n, r, i, a) {
		var o, s, c;
		let l = e.preserveId && typeof t.props.__id == `string` ? t.props.__id : void 0, u = l == null ? e.newId() : l, { __id: d, ...f } = t.props, p = i.toRecordProps(f), m = (o = i.deriveRecord) == null ? void 0 : o.call(i, {
			node: t,
			props: p,
			ctx: e
		}), h = (s = m == null ? void 0 : m.consumeChildren) == null ? !1 : s;
		if (e.putBlock({
			id: u,
			parentId: n,
			type: r,
			props: (c = m == null ? void 0 : m.props) == null ? p : c,
			children: []
		}), e.appendChild(n, u), !h) {
			var g;
			for (let n of (g = m == null ? void 0 : m.restChildren) == null ? t.children : g) a(e, n, u);
		}
	}
	const Un = {
		irType: `footnoteDef`,
		emit(e, t, n, r) {
			let i = e.ensureChildContainer(n, `footnote_list`), a = e.newId(), o = e.resolveType(`footnoteDef`, `footnote_def`);
			e.putBlock({
				id: a,
				parentId: i,
				parentTable: `block`,
				type: o,
				props: {
					fnId: t.id,
					title: []
				},
				children: []
			}), e.appendChild(i, a);
			for (let n of t.children) r(e, n, a);
		}
	};
	function Wn(e) {
		switch (e) {
			case `ordered`: return `numbered_list`;
			case `unordered`: return `bulleted_list`;
			case `todo`: return `to_do`;
		}
	}
	function Gn(e, t, n, r) {
		let i = Wn(t.kind);
		for (let c of t.items) {
			var a, o, s;
			let l = e.newId(), u = (a = c.children) == null ? void 0 : a[0], d = (u == null ? void 0 : u.type) === `paragraph` ? (o = u.content) == null ? [] : o : [], [, ...f] = (s = c.children) == null ? [] : s, p = { title: Ne(d) };
			t.kind === `todo` && (p.checked = c.checked), e.putBlock({
				id: l,
				parentId: n,
				type: i,
				props: p,
				children: []
			}), e.appendChild(n, l);
			for (let t of f) r(e, t, l);
		}
	}
	const Kn = {
		irType: `list`,
		emit(e, t, n, r) {
			Gn(e, t, n, r);
		}
	};
	const qn = {
		type: `paragraph`,
		content: []
	};
	function Jn(e, t) {
		var n;
		let r = t;
		for (; ((n = e[r]) == null ? 0 : n) > 0;) --e[r], r += 1;
		return r;
	}
	function Yn(e, t) {
		t.rowHeader && (e.tableRowHeader = !0), t.columnHeader && (e.tableColumnHeader = !0);
	}
	function Xn(e) {
		return e.some((e) => e.cells.some((e) => {
			var t, n;
			return ((t = e.colspan) == null ? 1 : t) > 1 || ((n = e.rowspan) == null ? 1 : n) > 1;
		}));
	}
	function Zn(e, t, n, r, i) {
		let a = e.newId(), o = { columnKey: n };
		t.verticalAlign && (o.verticalAlign = t.verticalAlign), e.putBlock({
			id: a,
			parentId: r,
			type: e.resolveType(`tableCell`, `simple_table_cell`),
			props: o,
			children: []
		}), e.appendChild(r, a);
		let s = t.children.length > 0 ? t.children : [qn];
		for (let t of s) i(e, t, a);
	}
	const Qn = { children: [] };
	function $n(e, t, n, r) {
		let i = e.newId(), a = e.resolveType(`table`, `simple_table`), o = Math.max(0, ...t.rows.map((e) => e.cells.length)), s = Array.from({ length: o }, () => e.newId(8)), c = {
			tableColumnOrder: s,
			tableColumnWidthMap: Object.fromEntries(s.map((e) => [e, 120]))
		};
		Yn(c, t), e.putBlock({
			id: i,
			parentId: n,
			type: a,
			props: c,
			children: []
		}), e.appendChild(n, i);
		for (let n = 0; n < t.rows.length; n++) {
			let a = t.rows[n], c = e.newId();
			e.putBlock({
				id: c,
				parentId: i,
				type: e.resolveType(`tableRow`, `simple_table_row`),
				props: {},
				children: []
			}), e.appendChild(i, c);
			for (let t = 0; t < o; t++) {
				var l;
				Zn(e, (l = a.cells[t]) == null ? Qn : l, s[t], c, r);
			}
		}
	}
	function er(e, t) {
		for (let r = t; r < e.length; r++) {
			var n;
			((n = e[r]) == null ? 0 : n) > 0 && --e[r];
		}
	}
	function tr(e, t, n, r) {
		if (r > 1) for (let a = t; a < t + n; a++) {
			var i;
			e[a] = ((i = e[a]) == null ? 0 : i) + (r - 1);
		}
	}
	function nr(e) {
		let t = [], n = 0;
		for (let a of e) {
			let e = 0;
			for (let o of a.cells) {
				var r, i;
				e = Jn(t, e);
				let a = (r = o.colspan) == null ? 1 : r;
				tr(t, e, a, (i = o.rowspan) == null ? 1 : i), e += a, e > n && (n = e);
			}
			er(t, e);
		}
		return n;
	}
	function rr(e, t, n) {
		let r = [], i = [];
		for (let c = 0; c < e.length; c++) {
			let l = e[c], u = 0, d = [];
			for (let e of l.cells) {
				var a, o, s;
				u = Jn(r, u);
				let i = (a = e.colspan) == null ? 1 : a, l = (o = e.rowspan) == null ? 1 : o;
				d.push({
					gridCol: u,
					cell: e,
					columnKey: (s = t[u]) == null ? t[t.length - 1] : s
				}), (i > 1 || l > 1) && n.push({
					startCell: [c, u],
					endCell: [c + l - 1, u + i - 1]
				}), tr(r, u, i, l), u += i;
			}
			er(r, u), i.push(d);
		}
		return i;
	}
	function ir(e, t, n, r) {
		let i = e.get(t);
		i || (i = [], e.set(t, i)), i.push({
			colIndex: n,
			columnKey: r
		});
	}
	function ar(e, t) {
		let n = /* @__PURE__ */ new Map();
		for (let i of e) {
			let [e, a] = i.startCell, [o, s] = i.endCell;
			for (let i = e; i <= o; i++) for (let o = a; o <= s; o++) {
				var r;
				i === e && o === a || ir(n, i, o, (r = t[o]) == null ? t[t.length - 1] : r);
			}
		}
		return n;
	}
	function or(e, t) {
		for (let n = 0; n < e.length; n++) {
			let r = t.get(n);
			if (r != null && r.length) {
				for (let t of r) e[n].push({
					gridCol: t.colIndex,
					cell: null,
					columnKey: t.columnKey
				});
				e[n].sort((e, t) => e.gridCol - t.gridCol);
			}
		}
	}
	function sr(e, t, n) {
		or(e, ar(t, n));
	}
	function cr(e, t, n, r) {
		var i, a, o;
		let s = e.newId(), c = { columnKey: t.columnKey };
		(i = t.cell) != null && i.verticalAlign && (c.verticalAlign = t.cell.verticalAlign), e.putBlock({
			id: s,
			parentId: n,
			type: e.resolveType(`tableCell`, `simple_table_cell`),
			props: c,
			children: []
		}), e.appendChild(n, s);
		let l = (a = (o = t.cell) == null ? void 0 : o.children) == null ? [] : a, u = l.length > 0 ? l : [qn];
		for (let t of u) r(e, t, s);
	}
	function lr(e, t, n, r) {
		let i = e.newId(), a = e.resolveType(`table`, `simple_table`), o = nr(t.rows), s = Array.from({ length: o }, () => e.newId(8)), c = [], l = rr(t.rows, s, c);
		sr(l, c, s);
		let u = {
			tableColumnOrder: s,
			tableColumnWidthMap: Object.fromEntries(s.map((e) => [e, 120]))
		};
		c.length > 0 && (u.cellRanges = c), Yn(u, t), e.putBlock({
			id: i,
			parentId: n,
			type: a,
			props: u,
			children: []
		}), e.appendChild(n, i);
		for (let t = 0; t < l.length; t++) {
			let n = e.newId();
			e.putBlock({
				id: n,
				parentId: i,
				type: e.resolveType(`tableRow`, `simple_table_row`),
				props: {},
				children: []
			}), e.appendChild(i, n);
			for (let i of l[t]) cr(e, i, n, r);
		}
	}
	const ur = [
		Kn,
		{
			irType: `table`,
			emit(e, t, n, r) {
				Xn(t.rows) ? lr(e, t, n, r) : $n(e, t, n, r);
			}
		},
		Un,
		Vn
	];
	const dr = {
		heading: `header`,
		paragraph: `text`,
		code: `code`,
		divider: `divider`,
		quote: `quote`,
		table: `simple_table`,
		tableRow: `simple_table_row`,
		tableCell: `simple_table_cell`,
		math: `equation`,
		footnoteDef: `footnote_def`,
		Paragraph: `text`
	};
	function fr(e) {
		return {
			...dr,
			...e == null ? {} : e
		};
	}
	const pr = new Map(ur.map((e) => [e.irType, e]));
	function mr(e, t, n) {
		var r;
		if (!t) return;
		let i = t.type === `custom` ? void 0 : e.registries.block.getByIrType(t.type);
		if (i != null && i.emitRecord) {
			i.emitRecord(e, t, n, (e, t, n) => mr(e, t, n));
			return;
		}
		(r = pr.get(t.type)) == null || r.emit(e, t, n, mr);
	}
	function hr(e, t) {
		let { idFactory: n = (e) => d(e), schemaVersion: r = 1, pageProps: i = {}, registries: a, preserveId: o, pageId: s, pageType: c = `page` } = t, l = new Bn(n, fr(t.typeMap), a, o), u = s || n();
		l.putBlock({
			id: u,
			parentId: void 0,
			type: c,
			props: i,
			children: []
		});
		for (let t of e) mr(l, t, u);
		return {
			schemaVersion: r,
			rootId: u,
			records: { block: l.getBlocks() }
		};
	}
	const gr = Fe(Ie(F({
		type: `details`,
		category: `textContainer`,
		name: `details`,
		recordType: `toggle`,
		parseMdxProps(e) {
			return k({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		}
	})));
	const _r = {
		name: `u`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: { underline: !0 },
				children: e
			};
		}
	};
	const vr = {
		name: `ins`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: { underline: !0 },
				children: e
			};
		}
	};
	const yr = {
		name: `sub`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: { subscript: !0 },
				children: e
			};
		}
	};
	const br = {
		name: `sup`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: { superscript: !0 },
				children: e
			};
		}
	};
	const xr = {
		name: `kbd`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `inlineCode`,
				value: e.map((e) => e.type === `text` ? e.value : ``).join(``)
			};
		}
	};
	const Sr = {
		name: `mark`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: { backgroundColor: `yellow_background` },
				children: e
			};
		}
	};
	const Cr = {
		name: `br`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR() {
			return {
				type: `text`,
				value: `
`
			};
		}
	};
	const wr = {
		name: `summary`,
		parseMdxProps() {
			return k({}, []);
		},
		buildInlineIR({ children: e }) {
			return e.length === 1 ? e[0] : {
				type: `span`,
				marks: {},
				children: e
			};
		}
	};
	const Tr = `__spanMarks`;
	function Er(e) {
		let t = {};
		for (let n of e.split(`;`)) {
			let e = n.indexOf(`:`);
			if (e < 0) continue;
			let r = n.slice(0, e).trim().toLowerCase(), i = n.slice(e + 1).trim();
			i && Dr(t, r, i);
		}
		return t;
	}
	function Dr(e, t, n) {
		let r = Nr[t];
		r && r(e, n);
	}
	function Or(e, t) {
		(t === `bold` || t === `700` || Number(t) >= 700) && (e.bold = !0);
	}
	function kr(e, t) {
		t === `italic` && (e.italic = !0);
	}
	function Ar(e, t) {
		let n = t.split(/\s+/);
		n.includes(`underline`) && (e.underline = !0), n.includes(`line-through`) && (e.strike = !0);
	}
	function jr(e, t) {
		let n = qt(t);
		n && (e.color = n);
	}
	function Mr(e, t) {
		let n = Jt(t);
		n && (e.backgroundColor = n);
	}
	const Nr = {
		color: jr,
		"background-color": Mr,
		"font-weight": Or,
		"font-style": kr,
		"text-decoration": Ar,
		"text-decoration-line": Ar
	};
	const Pr = {
		name: `span`,
		parseMdxProps(e) {
			let t = Er(typeof e.style == `string` ? e.style : ``), n = {};
			return Object.keys(t).length > 0 && (n[Tr] = t), k(n, []);
		},
		buildInlineIR({ props: e, children: t }) {
			let n = e[Tr];
			return n && Object.keys(n).length > 0 ? {
				type: `span`,
				marks: n,
				children: t
			} : t.length === 1 ? t[0] : {
				type: `span`,
				marks: {},
				children: t
			};
		}
	};
	const Fr = {
		name: `font`,
		parseMdxProps(e) {
			let t = typeof e.color == `string` ? e.color : ``, n = {};
			if (t) {
				let e = qt(t);
				e && (n.color = e);
			}
			let r = {};
			return Object.keys(n).length > 0 && (r[Tr] = n), k(r, []);
		},
		buildInlineIR({ props: e, children: t }) {
			let n = e[Tr];
			return n && Object.keys(n).length > 0 ? {
				type: `span`,
				marks: n,
				children: t
			} : t.length === 1 ? t[0] : {
				type: `span`,
				marks: {},
				children: t
			};
		}
	};
	function Ir(e) {
		e.block.register(gr), e.inline.register(_r).register(vr).register(yr).register(br).register(xr).register(Sr).register(Cr).register(wr).register(Pr).register(Fr);
	}
	const Lr = {
		irType: `footnoteDef`,
		mdastTypes: [`footnoteDefinition`],
		fromMdast(e, { blocksToIR: t, registries: n }) {
			var r, i;
			let a = e, { nodes: o, warnings: s } = t((r = a.children) == null ? [] : r, { registries: n });
			return {
				node: {
					type: `footnoteDef`,
					id: (i = a.identifier) == null ? `` : i,
					children: o
				},
				warnings: s
			};
		},
		toMdast(e, { irNodeToMdastContent: t }) {
			return {
				type: `footnoteDefinition`,
				identifier: e.id,
				label: e.id,
				children: e.children.map((e) => t(e))
			};
		}
	};
	const Rr = {
		irType: `list`,
		mdastTypes: [`list`],
		fromMdast(e, { blocksToIR: t, registries: n }) {
			var r;
			let i = e, a = i.children.some((e) => typeof e.checked == `boolean`), o = [];
			if (a) {
				var s;
				return {
					node: {
						type: `list`,
						kind: `todo`,
						items: ((s = i.children) == null ? [] : s).map((e) => {
							let { nodes: r, warnings: i } = t(e.children, { registries: n });
							return o.push(...i), {
								checked: !!e.checked,
								children: r
							};
						})
					},
					warnings: o
				};
			}
			if (i.ordered) {
				var c;
				let e = ((c = i.children) == null ? [] : c).map((e) => {
					var r;
					let { nodes: i, warnings: a } = t((r = e.children) == null ? [] : r, { registries: n });
					return o.push(...a), { children: i };
				});
				return {
					node: {
						type: `list`,
						kind: `ordered`,
						start: typeof i.start == `number` ? i.start : void 0,
						items: e
					},
					warnings: o
				};
			}
			return {
				node: {
					type: `list`,
					kind: `unordered`,
					items: ((r = i.children) == null ? [] : r).map((e) => {
						var r;
						let { nodes: i, warnings: a } = t((r = e.children) == null ? [] : r, { registries: n });
						return o.push(...a), { children: i };
					})
				},
				warnings: o
			};
		},
		toMdast(e, { irNodeToMdastContent: t }) {
			let n = e;
			return {
				type: `list`,
				ordered: n.kind === `ordered`,
				start: n.kind === `ordered` ? n.start : void 0,
				spread: !1,
				children: n.items.map((e) => ({
					type: `listItem`,
					spread: !1,
					checked: n.kind === `todo` ? e.checked : void 0,
					children: e.children.map((e) => t(e))
				}))
			};
		}
	};
	const zr = {
		irType: `table`,
		mdastTypes: [`table`],
		fromMdast(e, { parseInline: t, registries: n }) {
			var r, i;
			let a = e, o = (r = a.align) == null ? [] : r;
			return {
				node: {
					type: `table`,
					rowHeader: !0,
					rows: ((i = a.children) == null ? [] : i).map((e) => {
						var r;
						return { cells: ((r = e.children) == null ? [] : r).map((e, r) => {
							let i = o[r];
							return { children: Hr(e, {
								parseInline: t,
								registries: n,
								textAlign: i
							}) };
						}) };
					})
				},
				warnings: []
			};
		},
		toMdast(e, { irNodeToMdastContent: t }) {
			var n, r;
			return {
				type: `table`,
				align: (n = (r = e.rows[0]) == null ? void 0 : r.cells.map((e) => {
					let t = e.children[0];
					if (t && t.type === `paragraph`) {
						var n;
						return (n = t.textAlign) == null ? null : n;
					}
					return null;
				})) == null ? [] : n,
				children: e.rows.map((e) => ({
					type: `tableRow`,
					children: e.cells.map((e) => ({
						type: `tableCell`,
						children: Vr(Br(e.children.map((e) => t(e))))
					}))
				}))
			};
		}
	};
	function Br(e) {
		let t = [];
		for (let n of e) t.length > 0 && t.push({ type: `break` }), n.type === `paragraph` && Array.isArray(n.children) ? t.push(...n.children) : t.push(n);
		return t;
	}
	function Vr(e) {
		return e.map((e) => {
			if (e.type === `break`) return {
				type: `html`,
				value: `<br />`
			};
			let t = e;
			return (t.type === `inlineCode` || t.type === `inlineMath`) && typeof t.value == `string` && t.value.includes(`
`) ? {
				...e,
				value: t.value.replace(/\n/g, ` `)
			} : `children` in e && Array.isArray(e.children) ? {
				...e,
				children: Vr(e.children)
			} : e;
		});
	}
	function Hr(e, t) {
		var n, r;
		let i = (n = e.children) == null ? [] : n, a = (r = t.textAlign) == null ? void 0 : r;
		if (i.length === 1 && i[0].type === `image`) return [ct(i[0])];
		if (i.length === 1 && i[0].type === `link`) {
			let e = i[0];
			if (e.children.length === 1 && e.children[0].type === `image`) return [ct(e.children[0], e.url)];
		}
		return [{
			type: `paragraph`,
			content: t.parseInline(i, t.registries),
			...a ? { textAlign: a } : {}
		}];
	}
	const Ur = [
		Rr,
		zr,
		Lr
	];
	const Wr = /* @__PURE__ */ new Map();
	for (let e of Ur) for (let t of e.mdastTypes) Wr.set(t, e);
	function Gr(e) {
		let t = e;
		if (!t) return ``;
		if (t.type === `text`) {
			var n;
			return String((n = t.value) == null ? `` : n);
		}
		return Array.isArray(t.children) ? t.children.map(Gr).join(``) : ``;
	}
	function Kr(e) {
		let t = [];
		for (let n of e) {
			let e = t.slice(-1)[0];
			n.type === `text` && (e == null ? void 0 : e.type) === `text` ? e.value += n.value : t.push(n);
		}
		return t;
	}
	function qr(e) {
		var t;
		return {
			type: `text`,
			value: String((t = e.value) == null ? `` : t)
		};
	}
	function Jr(e) {
		var t;
		return {
			type: `inlineCode`,
			value: String((t = e.value) == null ? `` : t)
		};
	}
	function Yr(e) {
		var t;
		let n = String((t = e.value) == null ? `` : t);
		return n.length === 0 || /^\s/.test(n) || /\s$/.test(n) ? {
			type: `text`,
			value: `$${n}$`
		} : {
			type: `inlineMath`,
			value: n
		};
	}
	function Xr(e, t) {
		var n;
		let r = e;
		return {
			type: (n = r.type) == null ? `emphasis` : n,
			children: ti(r.children, t)
		};
	}
	function Zr(e, t) {
		var n, r;
		return {
			type: `link`,
			url: (n = e.url) == null ? `` : n,
			title: (r = e.title) == null ? void 0 : r,
			children: ti(e.children, t)
		};
	}
	function Qr(e) {
		var t;
		let n = e.alt || e.title || `image`;
		return {
			type: `link`,
			url: e.url || ``,
			title: (t = e.title) == null ? void 0 : t,
			children: [{
				type: `text`,
				value: n
			}]
		};
	}
	function $r(e) {
		var t, n;
		let r = e, i = String((t = (n = r.identifier) == null ? r.label : n) == null ? `` : t);
		return i ? {
			type: `footnoteRef`,
			id: i
		} : null;
	}
	function ei(e, t) {
		var n, r;
		let i = e, a = t.inline.get((n = i.name) == null ? `` : n);
		if (!a) return null;
		let o = ni(i.attributes), s = a.parseMdxProps(o);
		if (!s.ok) return null;
		let c = ti((r = i.children) == null ? [] : r, t);
		return a.buildInlineIR({
			props: s.value,
			children: c
		});
	}
	function ti(e, t) {
		let n = [];
		for (let r of e == null ? [] : e) {
			let e = r;
			switch (e.type) {
				case `text`:
					n.push(qr(e));
					break;
				case `inlineCode`:
					n.push(Jr(e));
					break;
				case `inlineMath`:
					n.push(Yr(e));
					break;
				case `strong`:
				case `emphasis`:
				case `delete`:
					n.push(Xr(e, t));
					break;
				case `link`:
					n.push(Zr(e, t));
					break;
				case `break`:
					n.push({
						type: `text`,
						value: `
`
					});
					break;
				case `image`:
					n.push(Qr(e));
					break;
				case `footnoteReference`: {
					let t = $r(e);
					t && n.push(t);
					break;
				}
				case `mdxJsxTextElement`: {
					let r = ei(e, t);
					r && n.push(r);
					break;
				}
				default: n.push({
					type: `text`,
					value: Gr(e)
				});
			}
		}
		return Kr(n);
	}
	function ni(e) {
		let t = {};
		for (let n of e == null ? [] : e) n.type === `mdxJsxAttribute` && (n.value === null || typeof n.value == `string`) && (t[n.name] = n.value);
		return t;
	}
	function ri(e, t) {
		let n = [], r = [];
		for (let i of e) {
			let { node: e, warnings: a } = ai(i, t);
			r.push(...a), e !== null && n.push(e);
		}
		return {
			nodes: n,
			warnings: r
		};
	}
	function ii(e) {
		let t = Gr(e);
		return t ? {
			type: `paragraph`,
			content: [{
				type: `text`,
				value: t
			}]
		} : null;
	}
	function ai(e, t) {
		let n = t.registries.block.getByMdastType(e.type);
		if (n != null && n.fromMdast) return n.fromMdast(e, {
			parseInline: ti,
			blocksToIR: ri,
			registries: t.registries
		});
		let r = Wr.get(e.type);
		return r ? r.fromMdast(e, {
			parseInline: ti,
			blocksToIR: ri,
			registries: t.registries
		}) : e.type === `mdxJsxFlowElement` ? oi(e, t) : {
			node: ii(e),
			warnings: []
		};
	}
	function oi(e, t) {
		var n, r, i;
		let { name: a } = e;
		if (!a) return {
			node: ii(e),
			warnings: []
		};
		let o = t.registries.block.getByName(a);
		if (!o) return {
			node: ii(e),
			warnings: [`<${a}> is not a registered component — degraded to plain text.`]
		};
		let s = ni(e.attributes), c = o.parseMdxProps(s);
		if (!c.ok) {
			var l;
			let t = (l = c.warnings) == null ? [] : l;
			return {
				node: ii(e),
				warnings: [`<${a}> props parse failed — degraded to plain text. Reasons: ${t.join(`; `)}`]
			};
		}
		let u = (n = o.validateChildren) == null ? void 0 : n.call(o, e.children);
		if (u && !u.ok) {
			var d;
			let t = (d = u.warnings) == null ? [] : d;
			return {
				node: ii(e),
				warnings: [`<${a}> children validation failed — degraded to plain text. Reasons: ${t.join(`; `)}`]
			};
		}
		let { nodes: f, warnings: p } = ri((r = e.children) == null ? [] : r, t), m = { ...c.value };
		return t.preserveId && typeof s.id == `string` && s.id && (m.__id = s.id), {
			node: {
				type: `custom`,
				name: (i = e.name) == null ? `` : i,
				props: m,
				children: f
			},
			warnings: p
		};
	}
	function si(e, t) {
		var n;
		let r = [], i = [];
		for (let a of (n = e.children) == null ? [] : n) {
			let { node: e, warnings: n } = ai(a, t);
			i.push(...n), e !== null && r.push(e);
		}
		return {
			nodes: r,
			warnings: i
		};
	}
	const ci = {
		carriageReturn: -5,
		lineFeed: -4,
		carriageReturnLineFeed: -3,
		horizontalTab: -2,
		virtualSpace: -1,
		eof: null,
		nul: 0,
		soh: 1,
		stx: 2,
		etx: 3,
		eot: 4,
		enq: 5,
		ack: 6,
		bel: 7,
		bs: 8,
		ht: 9,
		lf: 10,
		vt: 11,
		ff: 12,
		cr: 13,
		so: 14,
		si: 15,
		dle: 16,
		dc1: 17,
		dc2: 18,
		dc3: 19,
		dc4: 20,
		nak: 21,
		syn: 22,
		etb: 23,
		can: 24,
		em: 25,
		sub: 26,
		esc: 27,
		fs: 28,
		gs: 29,
		rs: 30,
		us: 31,
		space: 32,
		exclamationMark: 33,
		quotationMark: 34,
		numberSign: 35,
		dollarSign: 36,
		percentSign: 37,
		ampersand: 38,
		apostrophe: 39,
		leftParenthesis: 40,
		rightParenthesis: 41,
		asterisk: 42,
		plusSign: 43,
		comma: 44,
		dash: 45,
		dot: 46,
		slash: 47,
		digit0: 48,
		digit1: 49,
		digit2: 50,
		digit3: 51,
		digit4: 52,
		digit5: 53,
		digit6: 54,
		digit7: 55,
		digit8: 56,
		digit9: 57,
		colon: 58,
		semicolon: 59,
		lessThan: 60,
		equalsTo: 61,
		greaterThan: 62,
		questionMark: 63,
		atSign: 64,
		uppercaseA: 65,
		uppercaseB: 66,
		uppercaseC: 67,
		uppercaseD: 68,
		uppercaseE: 69,
		uppercaseF: 70,
		uppercaseG: 71,
		uppercaseH: 72,
		uppercaseI: 73,
		uppercaseJ: 74,
		uppercaseK: 75,
		uppercaseL: 76,
		uppercaseM: 77,
		uppercaseN: 78,
		uppercaseO: 79,
		uppercaseP: 80,
		uppercaseQ: 81,
		uppercaseR: 82,
		uppercaseS: 83,
		uppercaseT: 84,
		uppercaseU: 85,
		uppercaseV: 86,
		uppercaseW: 87,
		uppercaseX: 88,
		uppercaseY: 89,
		uppercaseZ: 90,
		leftSquareBracket: 91,
		backslash: 92,
		rightSquareBracket: 93,
		caret: 94,
		underscore: 95,
		graveAccent: 96,
		lowercaseA: 97,
		lowercaseB: 98,
		lowercaseC: 99,
		lowercaseD: 100,
		lowercaseE: 101,
		lowercaseF: 102,
		lowercaseG: 103,
		lowercaseH: 104,
		lowercaseI: 105,
		lowercaseJ: 106,
		lowercaseK: 107,
		lowercaseL: 108,
		lowercaseM: 109,
		lowercaseN: 110,
		lowercaseO: 111,
		lowercaseP: 112,
		lowercaseQ: 113,
		lowercaseR: 114,
		lowercaseS: 115,
		lowercaseT: 116,
		lowercaseU: 117,
		lowercaseV: 118,
		lowercaseW: 119,
		lowercaseX: 120,
		lowercaseY: 121,
		lowercaseZ: 122,
		leftCurlyBrace: 123,
		verticalBar: 124,
		rightCurlyBrace: 125,
		tilde: 126,
		del: 127,
		byteOrderMarker: 65279,
		replacementCharacter: 65533
	}, li = {
		attentionSideAfter: 2,
		attentionSideBefore: 1,
		atxHeadingOpeningFenceSizeMax: 6,
		autolinkDomainSizeMax: 63,
		autolinkSchemeSizeMax: 32,
		cdataOpeningString: `CDATA[`,
		characterGroupPunctuation: 2,
		characterGroupWhitespace: 1,
		characterReferenceDecimalSizeMax: 7,
		characterReferenceHexadecimalSizeMax: 6,
		characterReferenceNamedSizeMax: 31,
		codeFencedSequenceSizeMin: 3,
		contentTypeContent: `content`,
		contentTypeDocument: `document`,
		contentTypeFlow: `flow`,
		contentTypeString: `string`,
		contentTypeText: `text`,
		hardBreakPrefixSizeMin: 2,
		htmlBasic: 6,
		htmlCdata: 5,
		htmlComment: 2,
		htmlComplete: 7,
		htmlDeclaration: 4,
		htmlInstruction: 3,
		htmlRawSizeMax: 8,
		htmlRaw: 1,
		linkResourceDestinationBalanceMax: 32,
		linkReferenceSizeMax: 999,
		listItemValueSizeMax: 10,
		numericBaseDecimal: 10,
		numericBaseHexadecimal: 16,
		tabSize: 4,
		thematicBreakMarkerCountMin: 3,
		v8MaxSafeChunkSize: 1e4
	}, ui = {
		data: `data`,
		whitespace: `whitespace`,
		lineEnding: `lineEnding`,
		lineEndingBlank: `lineEndingBlank`,
		linePrefix: `linePrefix`,
		lineSuffix: `lineSuffix`,
		atxHeading: `atxHeading`,
		atxHeadingSequence: `atxHeadingSequence`,
		atxHeadingText: `atxHeadingText`,
		autolink: `autolink`,
		autolinkEmail: `autolinkEmail`,
		autolinkMarker: `autolinkMarker`,
		autolinkProtocol: `autolinkProtocol`,
		characterEscape: `characterEscape`,
		characterEscapeValue: `characterEscapeValue`,
		characterReference: `characterReference`,
		characterReferenceMarker: `characterReferenceMarker`,
		characterReferenceMarkerNumeric: `characterReferenceMarkerNumeric`,
		characterReferenceMarkerHexadecimal: `characterReferenceMarkerHexadecimal`,
		characterReferenceValue: `characterReferenceValue`,
		codeFenced: `codeFenced`,
		codeFencedFence: `codeFencedFence`,
		codeFencedFenceSequence: `codeFencedFenceSequence`,
		codeFencedFenceInfo: `codeFencedFenceInfo`,
		codeFencedFenceMeta: `codeFencedFenceMeta`,
		codeFlowValue: `codeFlowValue`,
		codeIndented: `codeIndented`,
		codeText: `codeText`,
		codeTextData: `codeTextData`,
		codeTextPadding: `codeTextPadding`,
		codeTextSequence: `codeTextSequence`,
		content: `content`,
		definition: `definition`,
		definitionDestination: `definitionDestination`,
		definitionDestinationLiteral: `definitionDestinationLiteral`,
		definitionDestinationLiteralMarker: `definitionDestinationLiteralMarker`,
		definitionDestinationRaw: `definitionDestinationRaw`,
		definitionDestinationString: `definitionDestinationString`,
		definitionLabel: `definitionLabel`,
		definitionLabelMarker: `definitionLabelMarker`,
		definitionLabelString: `definitionLabelString`,
		definitionMarker: `definitionMarker`,
		definitionTitle: `definitionTitle`,
		definitionTitleMarker: `definitionTitleMarker`,
		definitionTitleString: `definitionTitleString`,
		emphasis: `emphasis`,
		emphasisSequence: `emphasisSequence`,
		emphasisText: `emphasisText`,
		escapeMarker: `escapeMarker`,
		hardBreakEscape: `hardBreakEscape`,
		hardBreakTrailing: `hardBreakTrailing`,
		htmlFlow: `htmlFlow`,
		htmlFlowData: `htmlFlowData`,
		htmlText: `htmlText`,
		htmlTextData: `htmlTextData`,
		image: `image`,
		label: `label`,
		labelText: `labelText`,
		labelLink: `labelLink`,
		labelImage: `labelImage`,
		labelMarker: `labelMarker`,
		labelImageMarker: `labelImageMarker`,
		labelEnd: `labelEnd`,
		link: `link`,
		paragraph: `paragraph`,
		reference: `reference`,
		referenceMarker: `referenceMarker`,
		referenceString: `referenceString`,
		resource: `resource`,
		resourceDestination: `resourceDestination`,
		resourceDestinationLiteral: `resourceDestinationLiteral`,
		resourceDestinationLiteralMarker: `resourceDestinationLiteralMarker`,
		resourceDestinationRaw: `resourceDestinationRaw`,
		resourceDestinationString: `resourceDestinationString`,
		resourceMarker: `resourceMarker`,
		resourceTitle: `resourceTitle`,
		resourceTitleMarker: `resourceTitleMarker`,
		resourceTitleString: `resourceTitleString`,
		setextHeading: `setextHeading`,
		setextHeadingText: `setextHeadingText`,
		setextHeadingLine: `setextHeadingLine`,
		setextHeadingLineSequence: `setextHeadingLineSequence`,
		strong: `strong`,
		strongSequence: `strongSequence`,
		strongText: `strongText`,
		thematicBreak: `thematicBreak`,
		thematicBreakSequence: `thematicBreakSequence`,
		blockQuote: `blockQuote`,
		blockQuotePrefix: `blockQuotePrefix`,
		blockQuoteMarker: `blockQuoteMarker`,
		blockQuotePrefixWhitespace: `blockQuotePrefixWhitespace`,
		listOrdered: `listOrdered`,
		listUnordered: `listUnordered`,
		listItemIndent: `listItemIndent`,
		listItemMarker: `listItemMarker`,
		listItemPrefix: `listItemPrefix`,
		listItemPrefixWhitespace: `listItemPrefixWhitespace`,
		listItemValue: `listItemValue`,
		chunkDocument: `chunkDocument`,
		chunkContent: `chunkContent`,
		chunkFlow: `chunkFlow`,
		chunkText: `chunkText`,
		chunkString: `chunkString`
	}, di = [
		161,
		161,
		164,
		164,
		167,
		168,
		170,
		170,
		173,
		174,
		176,
		180,
		182,
		186,
		188,
		191,
		198,
		198,
		208,
		208,
		215,
		216,
		222,
		225,
		230,
		230,
		232,
		234,
		236,
		237,
		240,
		240,
		242,
		243,
		247,
		250,
		252,
		252,
		254,
		254,
		257,
		257,
		273,
		273,
		275,
		275,
		283,
		283,
		294,
		295,
		299,
		299,
		305,
		307,
		312,
		312,
		319,
		322,
		324,
		324,
		328,
		331,
		333,
		333,
		338,
		339,
		358,
		359,
		363,
		363,
		462,
		462,
		464,
		464,
		466,
		466,
		468,
		468,
		470,
		470,
		472,
		472,
		474,
		474,
		476,
		476,
		593,
		593,
		609,
		609,
		708,
		708,
		711,
		711,
		713,
		715,
		717,
		717,
		720,
		720,
		728,
		731,
		733,
		733,
		735,
		735,
		768,
		879,
		913,
		929,
		931,
		937,
		945,
		961,
		963,
		969,
		1025,
		1025,
		1040,
		1103,
		1105,
		1105,
		8208,
		8208,
		8211,
		8214,
		8216,
		8217,
		8220,
		8221,
		8224,
		8226,
		8228,
		8231,
		8240,
		8240,
		8242,
		8243,
		8245,
		8245,
		8251,
		8251,
		8254,
		8254,
		8308,
		8308,
		8319,
		8319,
		8321,
		8324,
		8364,
		8364,
		8451,
		8451,
		8453,
		8453,
		8457,
		8457,
		8467,
		8467,
		8470,
		8470,
		8481,
		8482,
		8486,
		8486,
		8491,
		8491,
		8531,
		8532,
		8539,
		8542,
		8544,
		8555,
		8560,
		8569,
		8585,
		8585,
		8592,
		8601,
		8632,
		8633,
		8658,
		8658,
		8660,
		8660,
		8679,
		8679,
		8704,
		8704,
		8706,
		8707,
		8711,
		8712,
		8715,
		8715,
		8719,
		8719,
		8721,
		8721,
		8725,
		8725,
		8730,
		8730,
		8733,
		8736,
		8739,
		8739,
		8741,
		8741,
		8743,
		8748,
		8750,
		8750,
		8756,
		8759,
		8764,
		8765,
		8776,
		8776,
		8780,
		8780,
		8786,
		8786,
		8800,
		8801,
		8804,
		8807,
		8810,
		8811,
		8814,
		8815,
		8834,
		8835,
		8838,
		8839,
		8853,
		8853,
		8857,
		8857,
		8869,
		8869,
		8895,
		8895,
		8978,
		8978,
		9312,
		9449,
		9451,
		9547,
		9552,
		9587,
		9600,
		9615,
		9618,
		9621,
		9632,
		9633,
		9635,
		9641,
		9650,
		9651,
		9654,
		9655,
		9660,
		9661,
		9664,
		9665,
		9670,
		9672,
		9675,
		9675,
		9678,
		9681,
		9698,
		9701,
		9711,
		9711,
		9733,
		9734,
		9737,
		9737,
		9742,
		9743,
		9756,
		9756,
		9758,
		9758,
		9792,
		9792,
		9794,
		9794,
		9824,
		9825,
		9827,
		9829,
		9831,
		9834,
		9836,
		9837,
		9839,
		9839,
		9886,
		9887,
		9919,
		9919,
		9926,
		9933,
		9935,
		9939,
		9941,
		9953,
		9955,
		9955,
		9960,
		9961,
		9963,
		9969,
		9972,
		9972,
		9974,
		9977,
		9979,
		9980,
		9982,
		9983,
		10045,
		10045,
		10102,
		10111,
		11094,
		11097,
		12872,
		12879,
		57344,
		63743,
		65024,
		65039,
		65533,
		65533,
		127232,
		127242,
		127248,
		127277,
		127280,
		127337,
		127344,
		127373,
		127375,
		127376,
		127387,
		127404,
		917760,
		917999,
		983040,
		1048573,
		1048576,
		1114109
	], fi = [
		12288,
		12288,
		65281,
		65376,
		65504,
		65510
	], pi = [
		8361,
		8361,
		65377,
		65470,
		65474,
		65479,
		65482,
		65487,
		65490,
		65495,
		65498,
		65500,
		65512,
		65518
	], mi = [
		32,
		126,
		162,
		163,
		165,
		166,
		172,
		172,
		175,
		175,
		10214,
		10221,
		10629,
		10630
	], hi = [
		4352,
		4447,
		8986,
		8987,
		9001,
		9002,
		9193,
		9196,
		9200,
		9200,
		9203,
		9203,
		9725,
		9726,
		9748,
		9749,
		9776,
		9783,
		9800,
		9811,
		9855,
		9855,
		9866,
		9871,
		9875,
		9875,
		9889,
		9889,
		9898,
		9899,
		9917,
		9918,
		9924,
		9925,
		9934,
		9934,
		9940,
		9940,
		9962,
		9962,
		9970,
		9971,
		9973,
		9973,
		9978,
		9978,
		9981,
		9981,
		9989,
		9989,
		9994,
		9995,
		10024,
		10024,
		10060,
		10060,
		10062,
		10062,
		10067,
		10069,
		10071,
		10071,
		10133,
		10135,
		10160,
		10160,
		10175,
		10175,
		11035,
		11036,
		11088,
		11088,
		11093,
		11093,
		11904,
		11929,
		11931,
		12019,
		12032,
		12245,
		12272,
		12287,
		12289,
		12350,
		12353,
		12438,
		12441,
		12543,
		12549,
		12591,
		12593,
		12686,
		12688,
		12773,
		12783,
		12830,
		12832,
		12871,
		12880,
		42124,
		42128,
		42182,
		43360,
		43388,
		44032,
		55203,
		63744,
		64255,
		65040,
		65049,
		65072,
		65106,
		65108,
		65126,
		65128,
		65131,
		94176,
		94180,
		94192,
		94198,
		94208,
		101589,
		101631,
		101662,
		101760,
		101874,
		110576,
		110579,
		110581,
		110587,
		110589,
		110590,
		110592,
		110882,
		110898,
		110898,
		110928,
		110930,
		110933,
		110933,
		110948,
		110951,
		110960,
		111355,
		119552,
		119638,
		119648,
		119670,
		126980,
		126980,
		127183,
		127183,
		127374,
		127374,
		127377,
		127386,
		127488,
		127490,
		127504,
		127547,
		127552,
		127560,
		127568,
		127569,
		127584,
		127589,
		127744,
		127776,
		127789,
		127797,
		127799,
		127868,
		127870,
		127891,
		127904,
		127946,
		127951,
		127955,
		127968,
		127984,
		127988,
		127988,
		127992,
		128062,
		128064,
		128064,
		128066,
		128252,
		128255,
		128317,
		128331,
		128334,
		128336,
		128359,
		128378,
		128378,
		128405,
		128406,
		128420,
		128420,
		128507,
		128591,
		128640,
		128709,
		128716,
		128716,
		128720,
		128722,
		128725,
		128728,
		128732,
		128735,
		128747,
		128748,
		128756,
		128764,
		128992,
		129003,
		129008,
		129008,
		129292,
		129338,
		129340,
		129349,
		129351,
		129535,
		129648,
		129660,
		129664,
		129674,
		129678,
		129734,
		129736,
		129736,
		129741,
		129756,
		129759,
		129770,
		129775,
		129784,
		131072,
		196605,
		196608,
		262141
	], gi = (e, t) => {
		let n = 0, r = Math.floor(e.length / 2) - 1;
		for (; n <= r;) {
			let i = Math.floor((n + r) / 2), a = i * 2;
			if (t < e[a]) r = i - 1;
			else if (t > e[a + 1]) n = i + 1;
			else return !0;
		}
		return !1;
	}, _i = 19968, [vi, yi] = bi(hi);
	function bi(e) {
		let t = e[0], n = e[1];
		for (let r = 0; r < e.length; r += 2) {
			let i = e[r], a = e[r + 1];
			if (_i >= i && _i <= a) return [i, a];
			a - i > n - t && (t = i, n = a);
		}
		return [t, n];
	}
	const xi = (e) => e < 161 || e > 1114109 ? !1 : gi(di, e);
	const Si = (e) => e < 12288 || e > 65510 ? !1 : gi(fi, e);
	const Ci = (e) => e < 8361 || e > 65518 ? !1 : gi(pi, e);
	const wi = (e) => e < 32 || e > 10630 ? !1 : gi(mi, e);
	const Ti = (e) => e >= vi && e <= yi ? !0 : e < 4352 || e > 262141 ? !1 : gi(hi, e);
	function Ei(e) {
		return xi(e) ? `ambiguous` : Si(e) ? `fullwidth` : Ci(e) ? `halfwidth` : wi(e) ? `narrow` : Ti(e) ? `wide` : `neutral`;
	}
	function Di(e) {
		if (!Number.isSafeInteger(e)) throw TypeError(`Expected a code point, got \`${typeof e}\`.`);
	}
	function Oi(e) {
		return Di(e), Ei(e);
	}
	function ki(e) {
		return /^\p{Emoji_Presentation}/u.test(String.fromCodePoint(e));
	}
	function Ai(e) {
		if (!e || e < 4352) return !1;
		switch (Oi(e)) {
			case `fullwidth`:
			case `halfwidth`: return !0;
			case `wide`: return !ki(e);
			case `narrow`: return !1;
			case `ambiguous`: return 917760 <= e && e <= 917999 ? null : !1;
			case `neutral`: return /^\p{sc=Hangul}/u.test(String.fromCodePoint(e));
		}
	}
	function ji(e, t) {
		return t !== 65025 || !e || e < 8216 ? !1 : e === 8216 || e === 8217 || e === 8220 || e === 8221;
	}
	function Mi(e) {
		return e !== null && e >= 65024 && e <= 65038;
	}
	const Ni = Fi(/\p{P}|\p{S}/u);
	const Pi = Fi(/\s/);
	function Fi(e) {
		return t;
		function t(t) {
			return t !== null && t > -1 && e.test(String.fromCodePoint(t));
		}
	}
	function Ii(e) {
		return !!(e & li.characterGroupWhitespace);
	}
	function Li(e) {
		return (e & Qi.cjkPunctuation) === li.characterGroupPunctuation;
	}
	function Ri(e) {
		return !!(e & Qi.cjk);
	}
	function zi(e) {
		return !!(e & Qi.cjkOrIvs);
	}
	function Bi(e) {
		return e === Qi.nonEmojiGeneralUseVS;
	}
	function Vi(e) {
		return !!(e & Qi.spaceOrPunctuation);
	}
	const Hi = Zi(/[A-Za-z]/);
	const Ui = Zi(/[\dA-Za-z]/);
	const Wi = Zi(/[#-'*+\--9=?A-Z^-~]/);
	function Gi(e) {
		return e !== null && (e < 32 || e === 127);
	}
	const Ki = Zi(/\d/);
	const qi = Zi(/[\dA-Fa-f]/);
	const Ji = Zi(/[!-/:-@[-`{-~]/);
	function V(e) {
		return e !== null && e < -2;
	}
	function H(e) {
		return e !== null && (e < 0 || e === 32);
	}
	function U(e) {
		return e === -2 || e === -1 || e === 32;
	}
	const Yi = Zi(/\p{P}|\p{S}/u);
	const Xi = Zi(/\s/);
	function Zi(e) {
		return t;
		function t(t) {
			return t !== null && t > -1 && e.test(String.fromCharCode(t));
		}
	}
	let Qi;
	(function(e) {
		e.spaceOrPunctuation = 3, e.cjk = 4096, e.cjkPunctuation = 4098, e.ivs = 8192, e.cjkOrIvs = 12288, e.nonEmojiGeneralUseVS = 16384, e.variationSelector = 24576, e.ivsToCjkRightShift = 1;
	})(Qi || (Qi = {}));
	function $i(e) {
		if (e === ci.eof || H(e) || Pi(e)) return li.characterGroupWhitespace;
		let t = 0;
		if (e >= 4352) {
			if (Mi(e)) return Qi.nonEmojiGeneralUseVS;
			switch (Ai(e)) {
				case null: return Qi.ivs;
				case !0: t |= Qi.cjk;
			}
		}
		return Ni(e) && (t |= li.characterGroupPunctuation), t;
	}
	function ea(e, t, n) {
		if (!Bi(e)) return e;
		let r = t(), i = $i(r);
		return !r || Ii(i) ? e : ji(r, n) ? Qi.cjkPunctuation : ta(i);
	}
	function ta(e) {
		return e & ~Qi.ivs;
	}
	function na(e) {
		"@babel/helpers - typeof";
		return na = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == `function` && e.constructor === Symbol && e !== Symbol.prototype ? `symbol` : typeof e;
		}, na(e);
	}
	function ra(e, t) {
		if (na(e) != `object` || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (n !== void 0) {
			var r = n.call(e, t || `default`);
			if (na(r) != `object`) return r;
			throw TypeError(`@@toPrimitive must return a primitive value.`);
		}
		return (t === `string` ? String : Number)(e);
	}
	function ia(e) {
		var t = ra(e, `string`);
		return na(t) == `symbol` ? t : t + ``;
	}
	function aa(e, t, n) {
		return (t = ia(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function oa(e) {
		return !!(e && e >= 55296 && e <= 56319);
	}
	function sa(e) {
		return !!(e && e >= 56320 && e <= 57343);
	}
	function ca(e, t, n) {
		if (t._bufferIndex < 2) return e;
		let r = n({
			start: {
				...t,
				_bufferIndex: t._bufferIndex - 2
			},
			end: t
		}).codePointAt(0);
		return r && r >= 65536 ? r : e;
	}
	function la(e, t, n) {
		let r = e >= 65536 ? 2 : 1;
		if (t._bufferIndex < 1 + r) return null;
		let i = t._bufferIndex - r - 2, a = n({
			start: {
				...t,
				_bufferIndex: i >= 0 ? i : 0
			},
			end: {
				...t,
				_bufferIndex: t._bufferIndex - r
			}
		}), o = a.charCodeAt(a.length - 1);
		if (Number.isNaN(o)) return null;
		if (a.length < 2 || o < 56320 || 57343 < o) return o;
		let s = a.codePointAt(0);
		return s && s >= 65536 ? s : o;
	}
	var ua = class {
		constructor(e, t, n) {
			aa(this, `cachedValue`, void 0), this.previousCode = e, this.nowPoint = t, this.sliceSerialize = n;
		}
		value() {
			return this.cachedValue === void 0 && (this.cachedValue = la(this.previousCode, this.nowPoint, this.sliceSerialize)), this.cachedValue;
		}
	};
	function da(e, t, n) {
		let r = n({
			start: t,
			end: {
				...t,
				_bufferIndex: t._bufferIndex + 2
			}
		}).codePointAt(0);
		return r && r >= 65536 ? r : e;
	}
	function fa(e, t, n, r) {
		let i = e.length, a = 0, o;
		if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
		else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
	}
	function pa(e, t) {
		return e.length > 0 ? (fa(e, e.length, 0, t), e) : t;
	}
	function ma(e, t, n) {
		let r = [], i = -1;
		for (; ++i < e.length;) {
			let a = e[i].resolveAll;
			a && !r.includes(a) && (t = a(t, n), r.push(a));
		}
		return t;
	}
	const ha = {
		name: `attention`,
		resolveAll: ga,
		tokenize: _a
	};
	function ga(e, t) {
		let n = -1, r, i, a, o, s, c, l, u;
		for (; ++n < e.length;) if (e[n][0] === `enter` && e[n][1].type === `attentionSequence` && e[n][1]._close) {
			for (r = n; r--;) if (e[r][0] === `exit` && e[r][1].type === `attentionSequence` && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
				if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
				c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
				let d = { ...e[r][1].end }, f = { ...e[n][1].start };
				va(d, -c), va(f, c), o = {
					type: c > 1 ? ui.strongSequence : ui.emphasisSequence,
					start: d,
					end: { ...e[r][1].end }
				}, s = {
					type: c > 1 ? ui.strongSequence : ui.emphasisSequence,
					start: { ...e[n][1].start },
					end: f
				}, a = {
					type: c > 1 ? ui.strongText : ui.emphasisText,
					start: { ...e[r][1].end },
					end: { ...e[n][1].start }
				}, i = {
					type: c > 1 ? ui.strong : ui.emphasis,
					start: { ...o.start },
					end: { ...s.end }
				}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = pa(l, [[
					`enter`,
					e[r][1],
					t
				], [
					`exit`,
					e[r][1],
					t
				]])), l = pa(l, [
					[
						`enter`,
						i,
						t
					],
					[
						`enter`,
						o,
						t
					],
					[
						`exit`,
						o,
						t
					],
					[
						`enter`,
						a,
						t
					]
				]), t.parser.constructs.insideSpan.null, l = pa(l, ma(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = pa(l, [
					[
						`exit`,
						a,
						t
					],
					[
						`enter`,
						s,
						t
					],
					[
						`exit`,
						s,
						t
					],
					[
						`exit`,
						i,
						t
					]
				]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = pa(l, [[
					`enter`,
					e[n][1],
					t
				], [
					`exit`,
					e[n][1],
					t
				]])) : u = 0, fa(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === `attentionSequence` && (e[n][1].type = `data`);
		return e;
	}
	function _a(e, t) {
		let n = this.parser.constructs.attentionMarkers.null, { now: r, sliceSerialize: i, previous: a } = this, o = sa(a) ? ca(a, r(), i) : a, s = $i(o), c = new ua(o, r(), i), l = ea(s, c.value.bind(c), o), u;
		return d;
		function d(t) {
			return t === ci.asterisk || ci.underscore, u = t, e.enter(`attentionSequence`), f(t);
		}
		function f(a) {
			if (a === u) return e.consume(a), f;
			let s = e.exit(`attentionSequence`), c = $i(oa(a) ? da(a, r(), i) : a), d = Li(l), p = d || Ii(l), m = Li(c), h = m || Ii(c), g = zi(l), _ = !h || m && (p || g) || n.includes(a), v = !p || d && (h || Ri(c)) || n.includes(o);
			return s._open = !!(u === ci.asterisk ? _ : _ && (Vi(l) || !v)), s._close = !!(u === ci.asterisk ? v : v && (Vi(c) || !_)), t(a);
		}
	}
	function va(e, t) {
		e.column += t, e.offset += t, e._bufferIndex += t;
	}
	function ya() {
		return {
			text: {
				[ci.asterisk]: ha,
				[ci.underscore]: ha
			},
			insideSpan: { null: [ha] }
		};
	}
	function ba() {
		let e = this.data();
		(e.micromarkExtensions || (e.micromarkExtensions = [])).push(ya());
	}
	var xa;
	var Sa;
	const Ca = (xa = `;`.codePointAt(0)) == null ? ci.eof : xa;
	const wa = (Sa = `&`.codePointAt(0)) == null ? ci.eof : Sa;
	function Ta() {
		return { handlers: {
			emphasis: Ea,
			strong: Da,
			text: ja
		} };
	}
	Ea.peek = Oa, Da.peek = ka;
	function Ea(e, t, n, r) {
		return Aa(e, t, n, r, Oa(e, t, n), 1);
	}
	function Da(e, t, n, r) {
		return Aa(e, t, n, r, ka(e, t, n), 2);
	}
	function Oa(e, t, n) {
		return n.options.emphasis || `*`;
	}
	function ka(e, t, n) {
		return n.options.strong || `*`;
	}
	function Aa(e, t, n, r, i, a) {
		let o = i.repeat(a), s = n.enter(a === 1 ? `emphasis` : `strong`), c = n.createTracker(r), l = c.move(o), u = c.move(n.containerPhrasing(e, {
			after: i,
			before: l,
			...c.current()
		})), d = za(e, t, n, r.before), f = Ba(e, t, n, r.after), p = Ma(d, Qa(u), i, `open`);
		p.inside && u && (u = Ya(u));
		let m = Ma({
			current: $a(u),
			previous: Za(u)
		}, f, i, `close`);
		m.inside && u && (u = Xa(u));
		let h = c.move(o);
		s();
		let g = m.outside && Ga(t, n);
		return n.attentionEncodeSurroundingInfo = {
			after: m.outside && !g,
			before: p.outside
		}, Ka(n).cjkFriendlyEncodeAfterSupplementaryText = g, l + u + h;
	}
	function ja(e, t, n, r) {
		var i;
		let a = Ka(n);
		if (!a.cjkFriendlyEncodeAfterSupplementaryText) return n.safe(e.value, r);
		a.cjkFriendlyEncodeAfterSupplementaryText = !1;
		let [o = ``] = [...e.value], s = e.value.slice(o.length);
		return `${Ja((i = o.codePointAt(0)) == null ? ci.eof : i)}${n.safe(s, {
			...r,
			before: `;`
		})}`;
	}
	function Ma(e, t, n, r) {
		let i = Ra(e), a = $i(t);
		if (!zi(i) && !zi(a)) return r === `open` ? Na(i, a, n) : Na(a, i, n);
		let o = {
			inside: !1,
			outside: !1
		}, s = {
			inside: !0,
			outside: !1
		}, c = {
			inside: !1,
			outside: !0
		}, l = {
			inside: !0,
			outside: !0
		};
		for (let i of [
			o,
			s,
			c,
			l
		]) {
			let a = r === `open` ? i.outside ? eo : e : i.inside ? eo : e, o = r === `open` ? i.inside ? to : t : i.outside ? to : t;
			if (r === `open` ? Pa(n, a, o) : Fa(n, a, o)) return i;
		}
		return l;
	}
	function Na(e, t, n) {
		return La(e) ? La(t) ? n === `_` ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !1
		} : Ii(t) ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !0
		} : Ii(e) ? La(t) ? {
			inside: !1,
			outside: !1
		} : Ii(t) ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !1
		} : Ii(t) ? {
			inside: !0,
			outside: !1
		} : {
			inside: !1,
			outside: !1
		};
	}
	function Pa(e, t, n) {
		let r = Ra(t), { close: i, open: a } = Ia(r, $i(n));
		return e === `_` ? a && (Vi(r) || !i) : a;
	}
	function Fa(e, t, n) {
		let r = $i(n), { close: i, open: a } = Ia(Ra(t), r);
		return e === `_` ? i && (Vi(r) || !a) : i;
	}
	function Ia(e, t) {
		let n = Li(e), r = n || Ii(e), i = Li(t), a = i || Ii(t);
		return {
			open: !a || i && (r || zi(e)),
			close: !r || n && (a || Ri(t))
		};
	}
	function La(e) {
		return !Ii(e) && !Li(e);
	}
	function Ra(e) {
		let t = $i(e.current);
		return e.current === null || !Bi(t) ? t : ea(t, () => e.previous, e.current);
	}
	function za(e, t, n, r) {
		let i = $a(r), a = Za(r);
		if (Va(i) || Ua(i, a)) {
			let r = Wa(e, t, n, -1);
			r && (i = $a(r), a = Za(r));
		}
		return {
			current: i,
			previous: a
		};
	}
	function Ba(e, t, n, r) {
		let i = Qa(r);
		if (!Ha(i)) return i;
		let a = Wa(e, t, n, 1);
		return a ? Qa(a) : i;
	}
	function Va(e) {
		return e !== null && 56320 <= e && e <= 57343;
	}
	function Ha(e) {
		return e !== null && 55296 <= e && e <= 56319;
	}
	function Ua(e, t) {
		return Bi($i(e)) && (t === null || t === ci.eof);
	}
	function Wa(e, t, n, r) {
		if (!t) return;
		let i = n.indexStack.at(-1), a = t.children, o = typeof i == `number` ? i : a.indexOf(e);
		if (o < 0) return;
		let s = a[o + r];
		return qa(s) || void 0;
	}
	function Ga(e, t) {
		var n;
		if (!e) return !1;
		let r = t.indexStack.at(-1);
		if (typeof r != `number`) return !1;
		let i = e.children[r + 1];
		return (i == null ? void 0 : i.type) === `text` && ((n = Qa(i.value)) == null ? 0 : n) > 65535;
	}
	function Ka(e) {
		return e;
	}
	function qa(e) {
		return !e || typeof e != `object` ? `` : `value` in e && typeof e.value == `string` ? e.value : `alt` in e && typeof e.alt == `string` ? e.alt : `children` in e && Array.isArray(e.children) ? e.children.map(qa).join(``) : ``;
	}
	function Ja(e) {
		return `&#x${(e == null ? 0 : e).toString(16).toUpperCase()};`;
	}
	function Ya(e) {
		var t;
		let [n = ``] = [...e];
		return Ja((t = n.codePointAt(0)) == null ? ci.eof : t) + e.slice(n.length);
	}
	function Xa(e) {
		var t;
		let n = [...e], r = n.pop();
		return `${n.join(``)}${Ja((t = r == null ? void 0 : r.codePointAt(0)) == null ? ci.eof : t)}`;
	}
	function Za(e) {
		var t, n;
		let r = [...e];
		return r.pop(), (t = (n = r.at(-1)) == null ? void 0 : n.codePointAt(0)) == null ? ci.eof : t;
	}
	function Qa(e) {
		var t;
		return (t = e.codePointAt(0)) == null ? ci.eof : t;
	}
	function $a(e) {
		var t, n;
		return (t = (n = [...e].at(-1)) == null ? void 0 : n.codePointAt(0)) == null ? ci.eof : t;
	}
	const eo = {
		current: Ca,
		previous: ci.eof
	};
	const to = wa;
	function no() {
		let e = this.data();
		(e.toMarkdownExtensions || (e.toMarkdownExtensions = [])).push(Ta());
	}
	function ro() {
		ba.call(this), no.call(this);
	}
	var io = ro;
	var ao = l(o(((e, t) => {
		(function() {
			var e = t === void 0 ? function() {
				return this || (0, eval)(`this`);
			}() : t.exports = i;
			e.format = i, e.vsprintf = r, typeof console < `u` && typeof console.log == `function` && (e.printf = n);
			function n() {
				console.log(i.apply(null, arguments));
			}
			function r(e, t) {
				return i.apply(null, [e].concat(t));
			}
			function i(e) {
				for (var t = 1, n = [].slice.call(arguments), r = 0, i = e.length, a = ``, o, s = !1, c, l, u = !1, d, f = function() {
					return n[t++];
				}, p = function() {
					for (var t = ``; /\d/.test(e[r]);) t += e[r++], o = e[r];
					return t.length > 0 ? parseInt(t) : null;
				}; r < i; ++r) if (o = e[r], s) switch (s = !1, o == `.` ? (u = !1, o = e[++r]) : o == `0` && e[r + 1] == `.` ? (u = !0, r += 2, o = e[r]) : u = !0, d = p(), o) {
					case `b`:
						a += parseInt(f(), 10).toString(2);
						break;
					case `c`:
						c = f(), typeof c == `string` || c instanceof String ? a += c : a += String.fromCharCode(parseInt(c, 10));
						break;
					case `d`:
						a += parseInt(f(), 10);
						break;
					case `f`:
						l = String(parseFloat(f()).toFixed(d || 6)), a += u ? l : l.replace(/^0/, ``);
						break;
					case `j`:
						a += JSON.stringify(f());
						break;
					case `o`:
						a += `0` + parseInt(f(), 10).toString(8);
						break;
					case `s`:
						a += f();
						break;
					case `x`:
						a += `0x` + parseInt(f(), 10).toString(16);
						break;
					case `X`:
						a += `0x` + parseInt(f(), 10).toString(16).toUpperCase();
						break;
					default: a += o;
				}
				else o === `%` ? s = !0 : a += o;
				return a;
			}
		})();
	}))(), 1);
	const oo = Object.assign(so(Error), {
		eval: so(EvalError),
		range: so(RangeError),
		reference: so(ReferenceError),
		syntax: so(SyntaxError),
		type: so(TypeError),
		uri: so(URIError)
	});
	function so(e) {
		return t.displayName = e.displayName || e.name, t;
		function t(t, ...n) {
			return new e(t && (0, ao.default)(t, ...n));
		}
	}
	const co = {}.hasOwnProperty;
	const lo = {
		yaml: `-`,
		toml: `+`
	};
	function uo(e) {
		let t = [], n = -1, r = Array.isArray(e) ? e : e ? [e] : [`yaml`];
		for (; ++n < r.length;) t[n] = fo(r[n]);
		return t;
	}
	function fo(e) {
		let t = e;
		if (typeof t == `string`) {
			if (!co.call(lo, t)) throw oo("Missing matter definition for `%s`", t);
			t = {
				type: t,
				marker: lo[t]
			};
		} else if (typeof t != `object`) throw oo("Expected matter to be an object, not `%j`", t);
		if (!co.call(t, `type`)) throw oo("Missing `type` in matter `%j`", t);
		if (!co.call(t, `fence`) && !co.call(t, `marker`)) throw oo("Missing `marker` or `fence` in matter `%j`", t);
		return t;
	}
	function po(e) {
		let t = uo(e), n = {}, r = -1;
		for (; ++r < t.length;) {
			let e = t[r], i = ho(e, `open`).charCodeAt(0), a = mo(e), o = n[i];
			Array.isArray(o) ? o.push(a) : n[i] = [a];
		}
		return { flow: n };
	}
	function mo(e) {
		let t = e.anywhere, n = e.type, r = n + `Fence`, i = r + `Sequence`, a = n + `Value`, o = {
			tokenize: u,
			partial: !0
		}, s, c = 0;
		return {
			tokenize: l,
			concrete: !0
		};
		function l(l, u, d) {
			let f = this;
			return p;
			function p(a) {
				let o = f.now();
				return o.column === 1 && (o.line === 1 || t) && (s = ho(e, `open`), c = 0, a === s.charCodeAt(c)) ? (l.enter(n), l.enter(r), l.enter(i), m(a)) : d(a);
			}
			function m(e) {
				return c === s.length ? (l.exit(i), U(e) ? (l.enter(`whitespace`), h(e)) : g(e)) : e === s.charCodeAt(c++) ? (l.consume(e), m) : d(e);
			}
			function h(e) {
				return U(e) ? (l.consume(e), h) : (l.exit(`whitespace`), g(e));
			}
			function g(t) {
				return V(t) ? (l.exit(r), l.enter(`lineEnding`), l.consume(t), l.exit(`lineEnding`), s = ho(e, `close`), c = 0, l.attempt(o, b, _)) : d(t);
			}
			function _(e) {
				return e === null || V(e) ? y(e) : (l.enter(a), v(e));
			}
			function v(e) {
				return e === null || V(e) ? (l.exit(a), y(e)) : (l.consume(e), v);
			}
			function y(e) {
				return e === null ? d(e) : (l.enter(`lineEnding`), l.consume(e), l.exit(`lineEnding`), l.attempt(o, b, _));
			}
			function b(e) {
				return l.exit(n), u(e);
			}
		}
		function u(e, t, n) {
			let a = 0;
			return o;
			function o(t) {
				return t === s.charCodeAt(a) ? (e.enter(r), e.enter(i), c(t)) : n(t);
			}
			function c(t) {
				return a === s.length ? (e.exit(i), U(t) ? (e.enter(`whitespace`), l(t)) : u(t)) : t === s.charCodeAt(a++) ? (e.consume(t), c) : n(t);
			}
			function l(t) {
				return U(t) ? (e.consume(t), l) : (e.exit(`whitespace`), u(t));
			}
			function u(i) {
				return i === null || V(i) ? (e.exit(r), t(i)) : n(i);
			}
		}
	}
	function ho(e, t) {
		return e.marker ? go(e.marker, t).repeat(3) : go(e.fence, t);
	}
	function go(e, t) {
		return typeof e == `string` ? e : e[t];
	}
	function _o(e) {
		if (typeof e != `string`) throw TypeError(`Expected a string`);
		return e.replace(/[|\\{}()[\]^$+*?.]/g, `\\$&`).replace(/-/g, `\\x2d`);
	}
	function vo(e) {
		let t = uo(e), n = {}, r = {}, i = -1;
		for (; ++i < t.length;) {
			let e = t[i];
			n[e.type] = yo(e), r[e.type] = bo, r[e.type + `Value`] = xo;
		}
		return {
			enter: n,
			exit: r
		};
	}
	function yo(e) {
		return t;
		function t(t) {
			this.enter({
				type: e.type,
				value: ``
			}, t), this.buffer();
		}
	}
	function bo(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		`value` in n, this.exit(e), n.value = t.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ``);
	}
	function xo(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
	function So(e) {
		let t = [], n = {}, r = uo(e), i = -1;
		for (; ++i < r.length;) {
			let e = r[i];
			n[e.type] = Co(e);
			let a = wo(e, `open`);
			t.push({
				atBreak: !0,
				character: a.charAt(0),
				after: _o(a.charAt(1))
			});
		}
		return {
			unsafe: t,
			handlers: n
		};
	}
	function Co(e) {
		let t = wo(e, `open`), n = wo(e, `close`);
		return r;
		function r(e) {
			return t + (e.value ? `
` + e.value : ``) + `
` + n;
		}
	}
	function wo(e, t) {
		return e.marker ? To(e.marker, t).repeat(3) : To(e.fence, t);
	}
	function To(e, t) {
		return typeof e == `string` ? e : e[t];
	}
	function Eo(e) {
		let t = this, n = e || `yaml`, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
		i.push(po(n)), a.push(vo(n)), o.push(So(n));
	}
	function Do(e, t) {
		let n = String(e);
		if (typeof t != `string`) throw TypeError(`Expected character`);
		let r = 0, i = n.indexOf(t);
		for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
		return r;
	}
	const Oo = (function(e) {
		if (e == null) return No;
		if (typeof e == `function`) return Mo(e);
		if (typeof e == `object`) return Array.isArray(e) ? ko(e) : Ao(e);
		if (typeof e == `string`) return jo(e);
		throw Error(`Expected function, string, or object as test`);
	});
	function ko(e) {
		let t = [], n = -1;
		for (; ++n < e.length;) t[n] = Oo(e[n]);
		return Mo(r);
		function r(...e) {
			let n = -1;
			for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
			return !1;
		}
	}
	function Ao(e) {
		let t = e;
		return Mo(n);
		function n(n) {
			let r = n, i;
			for (i in e) if (r[i] !== t[i]) return !1;
			return !0;
		}
	}
	function jo(e) {
		return Mo(t);
		function t(t) {
			return t && t.type === e;
		}
	}
	function Mo(e) {
		return t;
		function t(t, n, r) {
			return !!(Po(t) && e.call(this, t, typeof n == `number` ? n : void 0, r || void 0));
		}
	}
	function No() {
		return !0;
	}
	function Po(e) {
		return typeof e == `object` && !!e && `type` in e;
	}
	function Fo(e) {
		return e;
	}
	const Io = [];
	function Lo(e, t, n, r) {
		let i;
		typeof t == `function` && typeof n != `function` ? (r = n, n = t) : i = t;
		let a = Oo(i), o = r ? -1 : 1;
		s(e, void 0, [])();
		function s(e, i, c) {
			let l = e && typeof e == `object` ? e : {};
			if (typeof l.type == `string`) {
				let t = typeof l.tagName == `string` ? l.tagName : typeof l.name == `string` ? l.name : void 0;
				Object.defineProperty(u, `name`, { value: `node (` + Fo(e.type + (t ? `<` + t + `>` : ``)) + `)` });
			}
			return u;
			function u() {
				let l = Io, u, d, f;
				if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = Ro(n(e, c)), l[0] === !1)) return l;
				if (`children` in e && e.children) {
					let t = e;
					if (t.children && l[0] !== `skip`) for (d = (r ? t.children.length : -1) + o, f = c.concat(t); d > -1 && d < t.children.length;) {
						let e = t.children[d];
						if (u = s(e, d, f)(), u[0] === !1) return u;
						d = typeof u[1] == `number` ? u[1] : d + o;
					}
				}
				return l;
			}
		}
	}
	function Ro(e) {
		return Array.isArray(e) ? e : typeof e == `number` ? [!0, e] : e == null ? Io : [e];
	}
	function zo(e, t, n) {
		let r = Oo((n || {}).ignore || []), i = Bo(t), a = -1;
		for (; ++a < i.length;) Lo(e, `text`, o);
		function o(e, t) {
			let n = -1, i;
			for (; ++n < t.length;) {
				let e = t[n], a = i ? i.children : void 0;
				if (r(e, a ? a.indexOf(e) : void 0, i)) return;
				i = e;
			}
			if (i) return s(e, t);
		}
		function s(e, t) {
			let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
			r.lastIndex = 0;
			let d = r.exec(e.value);
			for (; d;) {
				let n = d.index, i = {
					index: d.index,
					input: d.input,
					stack: [...t, e]
				}, a = o(...d, i);
				if (typeof a == `string` && (a = a.length > 0 ? {
					type: `text`,
					value: a
				} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
					type: `text`,
					value: e.value.slice(s, n)
				}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
				d = r.exec(e.value);
			}
			return l ? (s < e.value.length && u.push({
				type: `text`,
				value: e.value.slice(s)
			}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
		}
	}
	function Bo(e) {
		let t = [];
		if (!Array.isArray(e)) throw TypeError(`Expected find and replace tuple or list of tuples`);
		let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
		for (; ++r < n.length;) {
			let e = n[r];
			t.push([Vo(e[0]), Ho(e[1])]);
		}
		return t;
	}
	function Vo(e) {
		return typeof e == `string` ? new RegExp(_o(e), `g`) : e;
	}
	function Ho(e) {
		return typeof e == `function` ? e : function() {
			return e;
		};
	}
	const Uo = `phrasing`;
	const Wo = [
		`autolink`,
		`link`,
		`image`,
		`label`
	];
	function Go() {
		return {
			transforms: [$o],
			enter: {
				literalAutolink: qo,
				literalAutolinkEmail: Jo,
				literalAutolinkHttp: Jo,
				literalAutolinkWww: Jo
			},
			exit: {
				literalAutolink: Qo,
				literalAutolinkEmail: Zo,
				literalAutolinkHttp: Yo,
				literalAutolinkWww: Xo
			}
		};
	}
	function Ko() {
		return { unsafe: [
			{
				character: `@`,
				before: `[+\\-.\\w]`,
				after: `[\\-.\\w]`,
				inConstruct: Uo,
				notInConstruct: Wo
			},
			{
				character: `.`,
				before: `[Ww]`,
				after: `[\\-.\\w]`,
				inConstruct: Uo,
				notInConstruct: Wo
			},
			{
				character: `:`,
				before: `[ps]`,
				after: `\\/`,
				inConstruct: Uo,
				notInConstruct: Wo
			}
		] };
	}
	function qo(e) {
		this.enter({
			type: `link`,
			title: null,
			url: ``,
			children: []
		}, e);
	}
	function Jo(e) {
		this.config.enter.autolinkProtocol.call(this, e);
	}
	function Yo(e) {
		this.config.exit.autolinkProtocol.call(this, e);
	}
	function Xo(e) {
		this.config.exit.data.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.type, t.url = `http://` + this.sliceSerialize(e);
	}
	function Zo(e) {
		this.config.exit.autolinkEmail.call(this, e);
	}
	function Qo(e) {
		this.exit(e);
	}
	function $o(e) {
		zo(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, es], [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, ts]], { ignore: [`link`, `linkReference`] });
	}
	function es(e, t, n, r, i) {
		let a = ``;
		if (!is(i) || (/^w/i.test(t) && (n = t + n, t = ``, a = `http://`), !ns(n))) return !1;
		let o = rs(n + r);
		if (!o[0]) return !1;
		let s = {
			type: `link`,
			title: null,
			url: a + t + o[0],
			children: [{
				type: `text`,
				value: t + o[0]
			}]
		};
		return o[1] ? [s, {
			type: `text`,
			value: o[1]
		}] : s;
	}
	function ts(e, t, n, r) {
		return !is(r, !0) || /[-\d_]$/.test(n) ? !1 : {
			type: `link`,
			title: null,
			url: `mailto:` + t + `@` + n,
			children: [{
				type: `text`,
				value: t + `@` + n
			}]
		};
	}
	function ns(e) {
		let t = e.split(`.`);
		return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
	}
	function rs(e) {
		let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
		if (!t) return [e, void 0];
		e = e.slice(0, t.index);
		let n = t[0], r = n.indexOf(`)`), i = Do(e, `(`), a = Do(e, `)`);
		for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(`)`), a++;
		return [e, n];
	}
	function is(e, t) {
		let n = e.input.charCodeAt(e.index - 1);
		return (e.index === 0 || Xi(n) || Yi(n)) && (!t || n !== 47);
	}
	function as(e) {
		return e.replace(/[\t\n\r ]+/g, ` `).replace(/^ | $/g, ``).toLowerCase().toUpperCase();
	}
	hs.peek = ms;
	function os() {
		this.buffer();
	}
	function ss(e) {
		this.enter({
			type: `footnoteReference`,
			identifier: ``,
			label: ``
		}, e);
	}
	function cs() {
		this.buffer();
	}
	function ls(e) {
		this.enter({
			type: `footnoteDefinition`,
			identifier: ``,
			label: ``,
			children: []
		}, e);
	}
	function us(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, n.identifier = as(this.sliceSerialize(e)).toLowerCase(), n.label = t;
	}
	function ds(e) {
		this.exit(e);
	}
	function fs(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, n.identifier = as(this.sliceSerialize(e)).toLowerCase(), n.label = t;
	}
	function ps(e) {
		this.exit(e);
	}
	function ms() {
		return `[`;
	}
	function hs(e, t, n, r) {
		let i = n.createTracker(r), a = i.move(`[^`), o = n.enter(`footnoteReference`), s = n.enter(`reference`);
		return a += i.move(n.safe(n.associationId(e), {
			after: `]`,
			before: a
		})), s(), o(), a += i.move(`]`), a;
	}
	function gs() {
		return {
			enter: {
				gfmFootnoteCallString: os,
				gfmFootnoteCall: ss,
				gfmFootnoteDefinitionLabelString: cs,
				gfmFootnoteDefinition: ls
			},
			exit: {
				gfmFootnoteCallString: us,
				gfmFootnoteCall: ds,
				gfmFootnoteDefinitionLabelString: fs,
				gfmFootnoteDefinition: ps
			}
		};
	}
	function _s(e) {
		let t = !1;
		return e && e.firstLineBlank && (t = !0), {
			handlers: {
				footnoteDefinition: n,
				footnoteReference: hs
			},
			unsafe: [{
				character: `[`,
				inConstruct: [
					`label`,
					`phrasing`,
					`reference`
				]
			}]
		};
		function n(e, n, r, i) {
			let a = r.createTracker(i), o = a.move(`[^`), s = r.enter(`footnoteDefinition`), c = r.enter(`label`);
			return o += a.move(r.safe(r.associationId(e), {
				before: o,
				after: `]`
			})), c(), o += a.move(`]:`), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? `
` : ` `) + r.indentLines(r.containerFlow(e, a.current()), t ? ys : vs))), s(), o;
		}
	}
	function vs(e, t, n) {
		return t === 0 ? e : ys(e, t, n);
	}
	function ys(e, t, n) {
		return (n ? `` : `    `) + e;
	}
	const bs = [
		`autolink`,
		`destinationLiteral`,
		`destinationRaw`,
		`reference`,
		`titleQuote`,
		`titleApostrophe`
	];
	Ts.peek = Es;
	function xs() {
		return {
			canContainEols: [`delete`],
			enter: { strikethrough: Cs },
			exit: { strikethrough: ws }
		};
	}
	function Ss() {
		return {
			unsafe: [{
				character: `~`,
				inConstruct: `phrasing`,
				notInConstruct: bs
			}],
			handlers: { delete: Ts }
		};
	}
	function Cs(e) {
		this.enter({
			type: `delete`,
			children: []
		}, e);
	}
	function ws(e) {
		this.exit(e);
	}
	function Ts(e, t, n, r) {
		let i = n.createTracker(r), a = n.enter(`strikethrough`), o = i.move(`~~`);
		return o += n.containerPhrasing(e, {
			...i.current(),
			before: o,
			after: `~`
		}), o += i.move(`~~`), a(), o;
	}
	function Es() {
		return `~`;
	}
	function Ds(e) {
		return e.length;
	}
	function Os(e, t) {
		let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Ds, a = [], o = [], s = [], c = [], l = 0, u = -1;
		for (; ++u < e.length;) {
			let t = [], r = [], a = -1;
			for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
				let o = ks(e[u][a]);
				if (n.alignDelimiters !== !1) {
					let e = i(o);
					r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
				}
				t.push(o);
			}
			o[u] = t, s[u] = r;
		}
		let d = -1;
		if (typeof r == `object` && `length` in r) for (; ++d < l;) a[d] = As(r[d]);
		else {
			let e = As(r);
			for (; ++d < l;) a[d] = e;
		}
		d = -1;
		let f = [], p = [];
		for (; ++d < l;) {
			let e = a[d], t = ``, r = ``;
			e === 99 ? (t = `:`, r = `:`) : e === 108 ? t = `:` : e === 114 && (r = `:`);
			let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + `-`.repeat(i) + r;
			n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
		}
		o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
		let m = [];
		for (; ++u < o.length;) {
			let e = o[u], t = s[u];
			d = -1;
			let r = [];
			for (; ++d < l;) {
				let i = e[d] || ``, o = ``, s = ``;
				if (n.alignDelimiters !== !1) {
					let e = c[d] - (t[d] || 0), n = a[d];
					n === 114 ? o = ` `.repeat(e) : n === 99 ? e % 2 ? (o = ` `.repeat(e / 2 + .5), s = ` `.repeat(e / 2 - .5)) : (o = ` `.repeat(e / 2), s = o) : s = ` `.repeat(e);
				}
				n.delimiterStart !== !1 && !d && r.push(`|`), n.padding !== !1 && (n.alignDelimiters !== !1 || i !== ``) && (n.delimiterStart !== !1 || d) && r.push(` `), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(` `), (n.delimiterEnd !== !1 || d !== l - 1) && r.push(`|`);
			}
			m.push(n.delimiterEnd === !1 ? r.join(``).replace(/ +$/, ``) : r.join(``));
		}
		return m.join(`
`);
	}
	function ks(e) {
		return e == null ? `` : String(e);
	}
	function As(e) {
		let t = typeof e == `string` ? e.codePointAt(0) : 0;
		return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
	}
	function js(e, t, n, r) {
		let i = n.enter(`blockquote`), a = n.createTracker(r);
		a.move(`> `), a.shift(2);
		let o = n.indentLines(n.containerFlow(e, a.current()), Ms);
		return i(), o;
	}
	function Ms(e, t, n) {
		return `>` + (n ? `` : ` `) + e;
	}
	function Ns(e, t) {
		return Ps(e, t.inConstruct, !0) && !Ps(e, t.notInConstruct, !1);
	}
	function Ps(e, t, n) {
		if (typeof t == `string` && (t = [t]), !t || t.length === 0) return n;
		let r = -1;
		for (; ++r < t.length;) if (e.includes(t[r])) return !0;
		return !1;
	}
	function Fs(e, t, n, r) {
		let i = -1;
		for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === `
` && Ns(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? `` : ` `;
		return `\\
`;
	}
	function Is(e, t) {
		let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
		if (typeof t != `string`) throw TypeError(`Expected substring`);
		for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
		return o;
	}
	function Ls(e, t) {
		return !!(t.options.fences === !1 && e.value && !e.lang && /[^ \r\n]/.test(e.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
	}
	function Rs(e) {
		let t = e.options.fence || "`";
		if (t !== "`" && t !== `~`) throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
		return t;
	}
	function zs(e, t, n, r) {
		let i = Rs(n), a = e.value || ``, o = i === "`" ? `GraveAccent` : `Tilde`;
		if (Ls(e, n)) {
			let e = n.enter(`codeIndented`), t = n.indentLines(a, Bs);
			return e(), t;
		}
		let s = n.createTracker(r), c = i.repeat(Math.max(Is(a, i) + 1, 3)), l = n.enter(`codeFenced`), u = s.move(c);
		if (e.lang) {
			let t = n.enter(`codeFencedLang${o}`);
			u += s.move(n.safe(e.lang, {
				before: u,
				after: ` `,
				encode: ["`"],
				...s.current()
			})), t();
		}
		if (e.lang && e.meta) {
			let t = n.enter(`codeFencedMeta${o}`);
			u += s.move(` `), u += s.move(n.safe(e.meta, {
				before: u,
				after: `
`,
				encode: ["`"],
				...s.current()
			})), t();
		}
		return u += s.move(`
`), a && (u += s.move(a + `
`)), u += s.move(c), l(), u;
	}
	function Bs(e, t, n) {
		return (n ? `` : `    `) + e;
	}
	function Vs(e) {
		let t = e.options.quote || `"`;
		if (t !== `"` && t !== `'`) throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
		return t;
	}
	function Hs(e, t, n, r) {
		let i = Vs(n), a = i === `"` ? `Quote` : `Apostrophe`, o = n.enter(`definition`), s = n.enter(`label`), c = n.createTracker(r), l = c.move(`[`);
		return l += c.move(n.safe(n.associationId(e), {
			before: l,
			after: `]`,
			...c.current()
		})), l += c.move(`]: `), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter(`destinationLiteral`), l += c.move(`<`), l += c.move(n.safe(e.url, {
			before: l,
			after: `>`,
			...c.current()
		})), l += c.move(`>`)) : (s = n.enter(`destinationRaw`), l += c.move(n.safe(e.url, {
			before: l,
			after: e.title ? ` ` : `
`,
			...c.current()
		}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(` ` + i), l += c.move(n.safe(e.title, {
			before: l,
			after: i,
			...c.current()
		})), l += c.move(i), s()), o(), l;
	}
	function Us(e) {
		let t = e.options.emphasis || `*`;
		if (t !== `*` && t !== `_`) throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
		return t;
	}
	function Ws(e) {
		return `&#x` + e.toString(16).toUpperCase() + `;`;
	}
	function Gs(e) {
		if (e === null || H(e) || Xi(e)) return 1;
		if (Yi(e)) return 2;
	}
	function Ks(e, t, n) {
		let r = Gs(e), i = Gs(t);
		return r === void 0 ? i === void 0 ? n === `_` ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !1
		} : i === 1 ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !0
		} : r === 1 ? i === void 0 ? {
			inside: !1,
			outside: !1
		} : i === 1 ? {
			inside: !0,
			outside: !0
		} : {
			inside: !1,
			outside: !1
		} : i === void 0 ? {
			inside: !1,
			outside: !1
		} : i === 1 ? {
			inside: !0,
			outside: !1
		} : {
			inside: !1,
			outside: !1
		};
	}
	qs.peek = Js;
	function qs(e, t, n, r) {
		let i = Us(n), a = n.enter(`emphasis`), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
			after: i,
			before: s,
			...o.current()
		})), l = c.charCodeAt(0), u = Ks(r.before.charCodeAt(r.before.length - 1), l, i);
		u.inside && (c = Ws(l) + c.slice(1));
		let d = c.charCodeAt(c.length - 1), f = Ks(r.after.charCodeAt(0), d, i);
		f.inside && (c = c.slice(0, -1) + Ws(d));
		let p = o.move(i);
		return a(), n.attentionEncodeSurroundingInfo = {
			after: f.outside,
			before: u.outside
		}, s + c + p;
	}
	function Js(e, t, n) {
		return n.options.emphasis || `*`;
	}
	function Ys(e, t, n, r) {
		let i, a, o;
		typeof t == `function` && typeof n != `function` ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), Lo(e, a, s, i);
		function s(e, t) {
			let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
			return o(e, r, n);
		}
	}
	const Xs = {};
	function Zs(e, t) {
		let n = t || Xs;
		return Qs(e, typeof n.includeImageAlt == `boolean` ? n.includeImageAlt : !0, typeof n.includeHtml == `boolean` ? n.includeHtml : !0);
	}
	function Qs(e, t, n) {
		if (ec(e)) {
			if (`value` in e) return e.type === `html` && !n ? `` : e.value;
			if (t && `alt` in e && e.alt) return e.alt;
			if (`children` in e) return $s(e.children, t, n);
		}
		return Array.isArray(e) ? $s(e, t, n) : ``;
	}
	function $s(e, t, n) {
		let r = [], i = -1;
		for (; ++i < e.length;) r[i] = Qs(e[i], t, n);
		return r.join(``);
	}
	function ec(e) {
		return !!(e && typeof e == `object`);
	}
	function tc(e, t) {
		let n = !1;
		return Ys(e, function(e) {
			if (`value` in e && /\r?\n|\r/.test(e.value) || e.type === `break`) return n = !0, !1;
		}), !!((!e.depth || e.depth < 3) && Zs(e) && (t.options.setext || n));
	}
	function nc(e, t, n, r) {
		let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
		if (tc(e, n)) {
			let t = n.enter(`headingSetext`), r = n.enter(`phrasing`), o = n.containerPhrasing(e, {
				...a.current(),
				before: `
`,
				after: `
`
			});
			return r(), t(), o + `
` + (i === 1 ? `=` : `-`).repeat(o.length - (Math.max(o.lastIndexOf(`\r`), o.lastIndexOf(`
`)) + 1));
		}
		let o = `#`.repeat(i), s = n.enter(`headingAtx`), c = n.enter(`phrasing`);
		a.move(o + ` `);
		let l = n.containerPhrasing(e, {
			before: `# `,
			after: `
`,
			...a.current()
		});
		return /^[\t ]/.test(l) && (l = Ws(l.charCodeAt(0)) + l.slice(1)), l = l ? o + ` ` + l : o, n.options.closeAtx && (l += ` ` + o), c(), s(), l;
	}
	rc.peek = ic;
	function rc(e) {
		return e.value || ``;
	}
	function ic() {
		return `<`;
	}
	ac.peek = oc;
	function ac(e, t, n, r) {
		let i = Vs(n), a = i === `"` ? `Quote` : `Apostrophe`, o = n.enter(`image`), s = n.enter(`label`), c = n.createTracker(r), l = c.move(`![`);
		return l += c.move(n.safe(e.alt, {
			before: l,
			after: `]`,
			...c.current()
		})), l += c.move(`](`), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter(`destinationLiteral`), l += c.move(`<`), l += c.move(n.safe(e.url, {
			before: l,
			after: `>`,
			...c.current()
		})), l += c.move(`>`)) : (s = n.enter(`destinationRaw`), l += c.move(n.safe(e.url, {
			before: l,
			after: e.title ? ` ` : `)`,
			...c.current()
		}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(` ` + i), l += c.move(n.safe(e.title, {
			before: l,
			after: i,
			...c.current()
		})), l += c.move(i), s()), l += c.move(`)`), o(), l;
	}
	function oc() {
		return `!`;
	}
	sc.peek = cc;
	function sc(e, t, n, r) {
		let i = e.referenceType, a = n.enter(`imageReference`), o = n.enter(`label`), s = n.createTracker(r), c = s.move(`![`), l = n.safe(e.alt, {
			before: c,
			after: `]`,
			...s.current()
		});
		c += s.move(l + `][`), o();
		let u = n.stack;
		n.stack = [], o = n.enter(`reference`);
		let d = n.safe(n.associationId(e), {
			before: c,
			after: `]`,
			...s.current()
		});
		return o(), n.stack = u, a(), i === `full` || !l || l !== d ? c += s.move(d + `]`) : i === `shortcut` ? c = c.slice(0, -1) : c += s.move(`]`), c;
	}
	function cc() {
		return `!`;
	}
	lc.peek = uc;
	function lc(e, t, n) {
		let r = e.value || ``, i = "`", a = -1;
		for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
		for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = ` ` + r + ` `); ++a < n.unsafe.length;) {
			let e = n.unsafe[a], t = n.compilePattern(e), i;
			if (e.atBreak) for (; i = t.exec(r);) {
				let e = i.index;
				r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + ` ` + r.slice(i.index + 1);
			}
		}
		return i + r + i;
	}
	function uc() {
		return "`";
	}
	function dc(e, t) {
		let n = Zs(e);
		return !!(!t.options.resourceLink && e.url && !e.title && e.children && e.children.length === 1 && e.children[0].type === `text` && (n === e.url || `mailto:` + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
	}
	fc.peek = pc;
	function fc(e, t, n, r) {
		let i = Vs(n), a = i === `"` ? `Quote` : `Apostrophe`, o = n.createTracker(r), s, c;
		if (dc(e, n)) {
			let t = n.stack;
			n.stack = [], s = n.enter(`autolink`);
			let r = o.move(`<`);
			return r += o.move(n.containerPhrasing(e, {
				before: r,
				after: `>`,
				...o.current()
			})), r += o.move(`>`), s(), n.stack = t, r;
		}
		s = n.enter(`link`), c = n.enter(`label`);
		let l = o.move(`[`);
		return l += o.move(n.containerPhrasing(e, {
			before: l,
			after: `](`,
			...o.current()
		})), l += o.move(`](`), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter(`destinationLiteral`), l += o.move(`<`), l += o.move(n.safe(e.url, {
			before: l,
			after: `>`,
			...o.current()
		})), l += o.move(`>`)) : (c = n.enter(`destinationRaw`), l += o.move(n.safe(e.url, {
			before: l,
			after: e.title ? ` ` : `)`,
			...o.current()
		}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(` ` + i), l += o.move(n.safe(e.title, {
			before: l,
			after: i,
			...o.current()
		})), l += o.move(i), c()), l += o.move(`)`), s(), l;
	}
	function pc(e, t, n) {
		return dc(e, n) ? `<` : `[`;
	}
	mc.peek = hc;
	function mc(e, t, n, r) {
		let i = e.referenceType, a = n.enter(`linkReference`), o = n.enter(`label`), s = n.createTracker(r), c = s.move(`[`), l = n.containerPhrasing(e, {
			before: c,
			after: `]`,
			...s.current()
		});
		c += s.move(l + `][`), o();
		let u = n.stack;
		n.stack = [], o = n.enter(`reference`);
		let d = n.safe(n.associationId(e), {
			before: c,
			after: `]`,
			...s.current()
		});
		return o(), n.stack = u, a(), i === `full` || !l || l !== d ? c += s.move(d + `]`) : i === `shortcut` ? c = c.slice(0, -1) : c += s.move(`]`), c;
	}
	function hc() {
		return `[`;
	}
	function gc(e) {
		let t = e.options.bullet || `*`;
		if (t !== `*` && t !== `+` && t !== `-`) throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
		return t;
	}
	function _c(e) {
		let t = gc(e), n = e.options.bulletOther;
		if (!n) return t === `*` ? `-` : `*`;
		if (n !== `*` && n !== `+` && n !== `-`) throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
		if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
		return n;
	}
	function vc(e) {
		let t = e.options.bulletOrdered || `.`;
		if (t !== `.` && t !== `)`) throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
		return t;
	}
	function yc(e) {
		let t = e.options.rule || `*`;
		if (t !== `*` && t !== `-` && t !== `_`) throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
		return t;
	}
	function bc(e, t, n, r) {
		let i = n.enter(`list`), a = n.bulletCurrent, o = e.ordered ? vc(n) : gc(n), s = e.ordered ? o === `.` ? `)` : `.` : _c(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
		if (!e.ordered) {
			let t = e.children ? e.children[0] : void 0;
			if ((o === `*` || o === `-`) && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === `list` && n.stack[n.stack.length - 2] === `listItem` && n.stack[n.stack.length - 3] === `list` && n.stack[n.stack.length - 4] === `listItem` && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), yc(n) === o && t) {
				let t = -1;
				for (; ++t < e.children.length;) {
					let n = e.children[t];
					if (n && n.type === `listItem` && n.children && n.children[0] && n.children[0].type === `thematicBreak`) {
						c = !0;
						break;
					}
				}
			}
		}
		c && (o = s), n.bulletCurrent = o;
		let l = n.containerFlow(e, r);
		return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
	}
	function xc(e) {
		let t = e.options.listItemIndent || `one`;
		if (t !== `tab` && t !== `one` && t !== `mixed`) throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
		return t;
	}
	function Sc(e, t, n, r) {
		let i = xc(n), a = n.bulletCurrent || gc(n);
		t && t.type === `list` && t.ordered && (a = (typeof t.start == `number` && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
		let o = a.length + 1;
		(i === `tab` || i === `mixed` && (t && t.type === `list` && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
		let s = n.createTracker(r);
		s.move(a + ` `.repeat(o - a.length)), s.shift(o);
		let c = n.enter(`listItem`), l = n.indentLines(n.containerFlow(e, s.current()), u);
		return c(), l;
		function u(e, t, n) {
			return t ? (n ? `` : ` `.repeat(o)) + e : (n ? a : a + ` `.repeat(o - a.length)) + e;
		}
	}
	function Cc(e, t, n, r) {
		let i = n.enter(`paragraph`), a = n.enter(`phrasing`), o = n.containerPhrasing(e, r);
		return a(), i(), o;
	}
	const wc = Oo([
		`break`,
		`delete`,
		`emphasis`,
		`footnote`,
		`footnoteReference`,
		`image`,
		`imageReference`,
		`inlineCode`,
		`inlineMath`,
		`link`,
		`linkReference`,
		`mdxJsxTextElement`,
		`mdxTextExpression`,
		`strong`,
		`text`,
		`textDirective`
	]);
	function Tc(e, t, n, r) {
		return (e.children.some(function(e) {
			return wc(e);
		}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
	}
	function Ec(e) {
		let t = e.options.strong || `*`;
		if (t !== `*` && t !== `_`) throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
		return t;
	}
	Dc.peek = Oc;
	function Dc(e, t, n, r) {
		let i = Ec(n), a = n.enter(`strong`), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
			after: i,
			before: s,
			...o.current()
		})), l = c.charCodeAt(0), u = Ks(r.before.charCodeAt(r.before.length - 1), l, i);
		u.inside && (c = Ws(l) + c.slice(1));
		let d = c.charCodeAt(c.length - 1), f = Ks(r.after.charCodeAt(0), d, i);
		f.inside && (c = c.slice(0, -1) + Ws(d));
		let p = o.move(i + i);
		return a(), n.attentionEncodeSurroundingInfo = {
			after: f.outside,
			before: u.outside
		}, s + c + p;
	}
	function Oc(e, t, n) {
		return n.options.strong || `*`;
	}
	function kc(e, t, n, r) {
		return n.safe(e.value, r);
	}
	function Ac(e) {
		let t = e.options.ruleRepetition || 3;
		if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
		return t;
	}
	function jc(e, t, n) {
		let r = (yc(n) + (n.options.ruleSpaces ? ` ` : ``)).repeat(Ac(n));
		return n.options.ruleSpaces ? r.slice(0, -1) : r;
	}
	const Mc = {
		blockquote: js,
		break: Fs,
		code: zs,
		definition: Hs,
		emphasis: qs,
		hardBreak: Fs,
		heading: nc,
		html: rc,
		image: ac,
		imageReference: sc,
		inlineCode: lc,
		link: fc,
		linkReference: mc,
		list: bc,
		listItem: Sc,
		paragraph: Cc,
		root: Tc,
		strong: Dc,
		text: kc,
		thematicBreak: jc
	};
	const Nc = {
		AElig: `Æ`,
		AMP: `&`,
		Aacute: `Á`,
		Abreve: `Ă`,
		Acirc: `Â`,
		Acy: `А`,
		Afr: `𝔄`,
		Agrave: `À`,
		Alpha: `Α`,
		Amacr: `Ā`,
		And: `⩓`,
		Aogon: `Ą`,
		Aopf: `𝔸`,
		ApplyFunction: `⁡`,
		Aring: `Å`,
		Ascr: `𝒜`,
		Assign: `≔`,
		Atilde: `Ã`,
		Auml: `Ä`,
		Backslash: `∖`,
		Barv: `⫧`,
		Barwed: `⌆`,
		Bcy: `Б`,
		Because: `∵`,
		Bernoullis: `ℬ`,
		Beta: `Β`,
		Bfr: `𝔅`,
		Bopf: `𝔹`,
		Breve: `˘`,
		Bscr: `ℬ`,
		Bumpeq: `≎`,
		CHcy: `Ч`,
		COPY: `©`,
		Cacute: `Ć`,
		Cap: `⋒`,
		CapitalDifferentialD: `ⅅ`,
		Cayleys: `ℭ`,
		Ccaron: `Č`,
		Ccedil: `Ç`,
		Ccirc: `Ĉ`,
		Cconint: `∰`,
		Cdot: `Ċ`,
		Cedilla: `¸`,
		CenterDot: `·`,
		Cfr: `ℭ`,
		Chi: `Χ`,
		CircleDot: `⊙`,
		CircleMinus: `⊖`,
		CirclePlus: `⊕`,
		CircleTimes: `⊗`,
		ClockwiseContourIntegral: `∲`,
		CloseCurlyDoubleQuote: `”`,
		CloseCurlyQuote: `’`,
		Colon: `∷`,
		Colone: `⩴`,
		Congruent: `≡`,
		Conint: `∯`,
		ContourIntegral: `∮`,
		Copf: `ℂ`,
		Coproduct: `∐`,
		CounterClockwiseContourIntegral: `∳`,
		Cross: `⨯`,
		Cscr: `𝒞`,
		Cup: `⋓`,
		CupCap: `≍`,
		DD: `ⅅ`,
		DDotrahd: `⤑`,
		DJcy: `Ђ`,
		DScy: `Ѕ`,
		DZcy: `Џ`,
		Dagger: `‡`,
		Darr: `↡`,
		Dashv: `⫤`,
		Dcaron: `Ď`,
		Dcy: `Д`,
		Del: `∇`,
		Delta: `Δ`,
		Dfr: `𝔇`,
		DiacriticalAcute: `´`,
		DiacriticalDot: `˙`,
		DiacriticalDoubleAcute: `˝`,
		DiacriticalGrave: "`",
		DiacriticalTilde: `˜`,
		Diamond: `⋄`,
		DifferentialD: `ⅆ`,
		Dopf: `𝔻`,
		Dot: `¨`,
		DotDot: `⃜`,
		DotEqual: `≐`,
		DoubleContourIntegral: `∯`,
		DoubleDot: `¨`,
		DoubleDownArrow: `⇓`,
		DoubleLeftArrow: `⇐`,
		DoubleLeftRightArrow: `⇔`,
		DoubleLeftTee: `⫤`,
		DoubleLongLeftArrow: `⟸`,
		DoubleLongLeftRightArrow: `⟺`,
		DoubleLongRightArrow: `⟹`,
		DoubleRightArrow: `⇒`,
		DoubleRightTee: `⊨`,
		DoubleUpArrow: `⇑`,
		DoubleUpDownArrow: `⇕`,
		DoubleVerticalBar: `∥`,
		DownArrow: `↓`,
		DownArrowBar: `⤓`,
		DownArrowUpArrow: `⇵`,
		DownBreve: `̑`,
		DownLeftRightVector: `⥐`,
		DownLeftTeeVector: `⥞`,
		DownLeftVector: `↽`,
		DownLeftVectorBar: `⥖`,
		DownRightTeeVector: `⥟`,
		DownRightVector: `⇁`,
		DownRightVectorBar: `⥗`,
		DownTee: `⊤`,
		DownTeeArrow: `↧`,
		Downarrow: `⇓`,
		Dscr: `𝒟`,
		Dstrok: `Đ`,
		ENG: `Ŋ`,
		ETH: `Ð`,
		Eacute: `É`,
		Ecaron: `Ě`,
		Ecirc: `Ê`,
		Ecy: `Э`,
		Edot: `Ė`,
		Efr: `𝔈`,
		Egrave: `È`,
		Element: `∈`,
		Emacr: `Ē`,
		EmptySmallSquare: `◻`,
		EmptyVerySmallSquare: `▫`,
		Eogon: `Ę`,
		Eopf: `𝔼`,
		Epsilon: `Ε`,
		Equal: `⩵`,
		EqualTilde: `≂`,
		Equilibrium: `⇌`,
		Escr: `ℰ`,
		Esim: `⩳`,
		Eta: `Η`,
		Euml: `Ë`,
		Exists: `∃`,
		ExponentialE: `ⅇ`,
		Fcy: `Ф`,
		Ffr: `𝔉`,
		FilledSmallSquare: `◼`,
		FilledVerySmallSquare: `▪`,
		Fopf: `𝔽`,
		ForAll: `∀`,
		Fouriertrf: `ℱ`,
		Fscr: `ℱ`,
		GJcy: `Ѓ`,
		GT: `>`,
		Gamma: `Γ`,
		Gammad: `Ϝ`,
		Gbreve: `Ğ`,
		Gcedil: `Ģ`,
		Gcirc: `Ĝ`,
		Gcy: `Г`,
		Gdot: `Ġ`,
		Gfr: `𝔊`,
		Gg: `⋙`,
		Gopf: `𝔾`,
		GreaterEqual: `≥`,
		GreaterEqualLess: `⋛`,
		GreaterFullEqual: `≧`,
		GreaterGreater: `⪢`,
		GreaterLess: `≷`,
		GreaterSlantEqual: `⩾`,
		GreaterTilde: `≳`,
		Gscr: `𝒢`,
		Gt: `≫`,
		HARDcy: `Ъ`,
		Hacek: `ˇ`,
		Hat: `^`,
		Hcirc: `Ĥ`,
		Hfr: `ℌ`,
		HilbertSpace: `ℋ`,
		Hopf: `ℍ`,
		HorizontalLine: `─`,
		Hscr: `ℋ`,
		Hstrok: `Ħ`,
		HumpDownHump: `≎`,
		HumpEqual: `≏`,
		IEcy: `Е`,
		IJlig: `Ĳ`,
		IOcy: `Ё`,
		Iacute: `Í`,
		Icirc: `Î`,
		Icy: `И`,
		Idot: `İ`,
		Ifr: `ℑ`,
		Igrave: `Ì`,
		Im: `ℑ`,
		Imacr: `Ī`,
		ImaginaryI: `ⅈ`,
		Implies: `⇒`,
		Int: `∬`,
		Integral: `∫`,
		Intersection: `⋂`,
		InvisibleComma: `⁣`,
		InvisibleTimes: `⁢`,
		Iogon: `Į`,
		Iopf: `𝕀`,
		Iota: `Ι`,
		Iscr: `ℐ`,
		Itilde: `Ĩ`,
		Iukcy: `І`,
		Iuml: `Ï`,
		Jcirc: `Ĵ`,
		Jcy: `Й`,
		Jfr: `𝔍`,
		Jopf: `𝕁`,
		Jscr: `𝒥`,
		Jsercy: `Ј`,
		Jukcy: `Є`,
		KHcy: `Х`,
		KJcy: `Ќ`,
		Kappa: `Κ`,
		Kcedil: `Ķ`,
		Kcy: `К`,
		Kfr: `𝔎`,
		Kopf: `𝕂`,
		Kscr: `𝒦`,
		LJcy: `Љ`,
		LT: `<`,
		Lacute: `Ĺ`,
		Lambda: `Λ`,
		Lang: `⟪`,
		Laplacetrf: `ℒ`,
		Larr: `↞`,
		Lcaron: `Ľ`,
		Lcedil: `Ļ`,
		Lcy: `Л`,
		LeftAngleBracket: `⟨`,
		LeftArrow: `←`,
		LeftArrowBar: `⇤`,
		LeftArrowRightArrow: `⇆`,
		LeftCeiling: `⌈`,
		LeftDoubleBracket: `⟦`,
		LeftDownTeeVector: `⥡`,
		LeftDownVector: `⇃`,
		LeftDownVectorBar: `⥙`,
		LeftFloor: `⌊`,
		LeftRightArrow: `↔`,
		LeftRightVector: `⥎`,
		LeftTee: `⊣`,
		LeftTeeArrow: `↤`,
		LeftTeeVector: `⥚`,
		LeftTriangle: `⊲`,
		LeftTriangleBar: `⧏`,
		LeftTriangleEqual: `⊴`,
		LeftUpDownVector: `⥑`,
		LeftUpTeeVector: `⥠`,
		LeftUpVector: `↿`,
		LeftUpVectorBar: `⥘`,
		LeftVector: `↼`,
		LeftVectorBar: `⥒`,
		Leftarrow: `⇐`,
		Leftrightarrow: `⇔`,
		LessEqualGreater: `⋚`,
		LessFullEqual: `≦`,
		LessGreater: `≶`,
		LessLess: `⪡`,
		LessSlantEqual: `⩽`,
		LessTilde: `≲`,
		Lfr: `𝔏`,
		Ll: `⋘`,
		Lleftarrow: `⇚`,
		Lmidot: `Ŀ`,
		LongLeftArrow: `⟵`,
		LongLeftRightArrow: `⟷`,
		LongRightArrow: `⟶`,
		Longleftarrow: `⟸`,
		Longleftrightarrow: `⟺`,
		Longrightarrow: `⟹`,
		Lopf: `𝕃`,
		LowerLeftArrow: `↙`,
		LowerRightArrow: `↘`,
		Lscr: `ℒ`,
		Lsh: `↰`,
		Lstrok: `Ł`,
		Lt: `≪`,
		Map: `⤅`,
		Mcy: `М`,
		MediumSpace: ` `,
		Mellintrf: `ℳ`,
		Mfr: `𝔐`,
		MinusPlus: `∓`,
		Mopf: `𝕄`,
		Mscr: `ℳ`,
		Mu: `Μ`,
		NJcy: `Њ`,
		Nacute: `Ń`,
		Ncaron: `Ň`,
		Ncedil: `Ņ`,
		Ncy: `Н`,
		NegativeMediumSpace: `​`,
		NegativeThickSpace: `​`,
		NegativeThinSpace: `​`,
		NegativeVeryThinSpace: `​`,
		NestedGreaterGreater: `≫`,
		NestedLessLess: `≪`,
		NewLine: `
`,
		Nfr: `𝔑`,
		NoBreak: `⁠`,
		NonBreakingSpace: `\xA0`,
		Nopf: `ℕ`,
		Not: `⫬`,
		NotCongruent: `≢`,
		NotCupCap: `≭`,
		NotDoubleVerticalBar: `∦`,
		NotElement: `∉`,
		NotEqual: `≠`,
		NotEqualTilde: `≂̸`,
		NotExists: `∄`,
		NotGreater: `≯`,
		NotGreaterEqual: `≱`,
		NotGreaterFullEqual: `≧̸`,
		NotGreaterGreater: `≫̸`,
		NotGreaterLess: `≹`,
		NotGreaterSlantEqual: `⩾̸`,
		NotGreaterTilde: `≵`,
		NotHumpDownHump: `≎̸`,
		NotHumpEqual: `≏̸`,
		NotLeftTriangle: `⋪`,
		NotLeftTriangleBar: `⧏̸`,
		NotLeftTriangleEqual: `⋬`,
		NotLess: `≮`,
		NotLessEqual: `≰`,
		NotLessGreater: `≸`,
		NotLessLess: `≪̸`,
		NotLessSlantEqual: `⩽̸`,
		NotLessTilde: `≴`,
		NotNestedGreaterGreater: `⪢̸`,
		NotNestedLessLess: `⪡̸`,
		NotPrecedes: `⊀`,
		NotPrecedesEqual: `⪯̸`,
		NotPrecedesSlantEqual: `⋠`,
		NotReverseElement: `∌`,
		NotRightTriangle: `⋫`,
		NotRightTriangleBar: `⧐̸`,
		NotRightTriangleEqual: `⋭`,
		NotSquareSubset: `⊏̸`,
		NotSquareSubsetEqual: `⋢`,
		NotSquareSuperset: `⊐̸`,
		NotSquareSupersetEqual: `⋣`,
		NotSubset: `⊂⃒`,
		NotSubsetEqual: `⊈`,
		NotSucceeds: `⊁`,
		NotSucceedsEqual: `⪰̸`,
		NotSucceedsSlantEqual: `⋡`,
		NotSucceedsTilde: `≿̸`,
		NotSuperset: `⊃⃒`,
		NotSupersetEqual: `⊉`,
		NotTilde: `≁`,
		NotTildeEqual: `≄`,
		NotTildeFullEqual: `≇`,
		NotTildeTilde: `≉`,
		NotVerticalBar: `∤`,
		Nscr: `𝒩`,
		Ntilde: `Ñ`,
		Nu: `Ν`,
		OElig: `Œ`,
		Oacute: `Ó`,
		Ocirc: `Ô`,
		Ocy: `О`,
		Odblac: `Ő`,
		Ofr: `𝔒`,
		Ograve: `Ò`,
		Omacr: `Ō`,
		Omega: `Ω`,
		Omicron: `Ο`,
		Oopf: `𝕆`,
		OpenCurlyDoubleQuote: `“`,
		OpenCurlyQuote: `‘`,
		Or: `⩔`,
		Oscr: `𝒪`,
		Oslash: `Ø`,
		Otilde: `Õ`,
		Otimes: `⨷`,
		Ouml: `Ö`,
		OverBar: `‾`,
		OverBrace: `⏞`,
		OverBracket: `⎴`,
		OverParenthesis: `⏜`,
		PartialD: `∂`,
		Pcy: `П`,
		Pfr: `𝔓`,
		Phi: `Φ`,
		Pi: `Π`,
		PlusMinus: `±`,
		Poincareplane: `ℌ`,
		Popf: `ℙ`,
		Pr: `⪻`,
		Precedes: `≺`,
		PrecedesEqual: `⪯`,
		PrecedesSlantEqual: `≼`,
		PrecedesTilde: `≾`,
		Prime: `″`,
		Product: `∏`,
		Proportion: `∷`,
		Proportional: `∝`,
		Pscr: `𝒫`,
		Psi: `Ψ`,
		QUOT: `"`,
		Qfr: `𝔔`,
		Qopf: `ℚ`,
		Qscr: `𝒬`,
		RBarr: `⤐`,
		REG: `®`,
		Racute: `Ŕ`,
		Rang: `⟫`,
		Rarr: `↠`,
		Rarrtl: `⤖`,
		Rcaron: `Ř`,
		Rcedil: `Ŗ`,
		Rcy: `Р`,
		Re: `ℜ`,
		ReverseElement: `∋`,
		ReverseEquilibrium: `⇋`,
		ReverseUpEquilibrium: `⥯`,
		Rfr: `ℜ`,
		Rho: `Ρ`,
		RightAngleBracket: `⟩`,
		RightArrow: `→`,
		RightArrowBar: `⇥`,
		RightArrowLeftArrow: `⇄`,
		RightCeiling: `⌉`,
		RightDoubleBracket: `⟧`,
		RightDownTeeVector: `⥝`,
		RightDownVector: `⇂`,
		RightDownVectorBar: `⥕`,
		RightFloor: `⌋`,
		RightTee: `⊢`,
		RightTeeArrow: `↦`,
		RightTeeVector: `⥛`,
		RightTriangle: `⊳`,
		RightTriangleBar: `⧐`,
		RightTriangleEqual: `⊵`,
		RightUpDownVector: `⥏`,
		RightUpTeeVector: `⥜`,
		RightUpVector: `↾`,
		RightUpVectorBar: `⥔`,
		RightVector: `⇀`,
		RightVectorBar: `⥓`,
		Rightarrow: `⇒`,
		Ropf: `ℝ`,
		RoundImplies: `⥰`,
		Rrightarrow: `⇛`,
		Rscr: `ℛ`,
		Rsh: `↱`,
		RuleDelayed: `⧴`,
		SHCHcy: `Щ`,
		SHcy: `Ш`,
		SOFTcy: `Ь`,
		Sacute: `Ś`,
		Sc: `⪼`,
		Scaron: `Š`,
		Scedil: `Ş`,
		Scirc: `Ŝ`,
		Scy: `С`,
		Sfr: `𝔖`,
		ShortDownArrow: `↓`,
		ShortLeftArrow: `←`,
		ShortRightArrow: `→`,
		ShortUpArrow: `↑`,
		Sigma: `Σ`,
		SmallCircle: `∘`,
		Sopf: `𝕊`,
		Sqrt: `√`,
		Square: `□`,
		SquareIntersection: `⊓`,
		SquareSubset: `⊏`,
		SquareSubsetEqual: `⊑`,
		SquareSuperset: `⊐`,
		SquareSupersetEqual: `⊒`,
		SquareUnion: `⊔`,
		Sscr: `𝒮`,
		Star: `⋆`,
		Sub: `⋐`,
		Subset: `⋐`,
		SubsetEqual: `⊆`,
		Succeeds: `≻`,
		SucceedsEqual: `⪰`,
		SucceedsSlantEqual: `≽`,
		SucceedsTilde: `≿`,
		SuchThat: `∋`,
		Sum: `∑`,
		Sup: `⋑`,
		Superset: `⊃`,
		SupersetEqual: `⊇`,
		Supset: `⋑`,
		THORN: `Þ`,
		TRADE: `™`,
		TSHcy: `Ћ`,
		TScy: `Ц`,
		Tab: `	`,
		Tau: `Τ`,
		Tcaron: `Ť`,
		Tcedil: `Ţ`,
		Tcy: `Т`,
		Tfr: `𝔗`,
		Therefore: `∴`,
		Theta: `Θ`,
		ThickSpace: `  `,
		ThinSpace: ` `,
		Tilde: `∼`,
		TildeEqual: `≃`,
		TildeFullEqual: `≅`,
		TildeTilde: `≈`,
		Topf: `𝕋`,
		TripleDot: `⃛`,
		Tscr: `𝒯`,
		Tstrok: `Ŧ`,
		Uacute: `Ú`,
		Uarr: `↟`,
		Uarrocir: `⥉`,
		Ubrcy: `Ў`,
		Ubreve: `Ŭ`,
		Ucirc: `Û`,
		Ucy: `У`,
		Udblac: `Ű`,
		Ufr: `𝔘`,
		Ugrave: `Ù`,
		Umacr: `Ū`,
		UnderBar: `_`,
		UnderBrace: `⏟`,
		UnderBracket: `⎵`,
		UnderParenthesis: `⏝`,
		Union: `⋃`,
		UnionPlus: `⊎`,
		Uogon: `Ų`,
		Uopf: `𝕌`,
		UpArrow: `↑`,
		UpArrowBar: `⤒`,
		UpArrowDownArrow: `⇅`,
		UpDownArrow: `↕`,
		UpEquilibrium: `⥮`,
		UpTee: `⊥`,
		UpTeeArrow: `↥`,
		Uparrow: `⇑`,
		Updownarrow: `⇕`,
		UpperLeftArrow: `↖`,
		UpperRightArrow: `↗`,
		Upsi: `ϒ`,
		Upsilon: `Υ`,
		Uring: `Ů`,
		Uscr: `𝒰`,
		Utilde: `Ũ`,
		Uuml: `Ü`,
		VDash: `⊫`,
		Vbar: `⫫`,
		Vcy: `В`,
		Vdash: `⊩`,
		Vdashl: `⫦`,
		Vee: `⋁`,
		Verbar: `‖`,
		Vert: `‖`,
		VerticalBar: `∣`,
		VerticalLine: `|`,
		VerticalSeparator: `❘`,
		VerticalTilde: `≀`,
		VeryThinSpace: ` `,
		Vfr: `𝔙`,
		Vopf: `𝕍`,
		Vscr: `𝒱`,
		Vvdash: `⊪`,
		Wcirc: `Ŵ`,
		Wedge: `⋀`,
		Wfr: `𝔚`,
		Wopf: `𝕎`,
		Wscr: `𝒲`,
		Xfr: `𝔛`,
		Xi: `Ξ`,
		Xopf: `𝕏`,
		Xscr: `𝒳`,
		YAcy: `Я`,
		YIcy: `Ї`,
		YUcy: `Ю`,
		Yacute: `Ý`,
		Ycirc: `Ŷ`,
		Ycy: `Ы`,
		Yfr: `𝔜`,
		Yopf: `𝕐`,
		Yscr: `𝒴`,
		Yuml: `Ÿ`,
		ZHcy: `Ж`,
		Zacute: `Ź`,
		Zcaron: `Ž`,
		Zcy: `З`,
		Zdot: `Ż`,
		ZeroWidthSpace: `​`,
		Zeta: `Ζ`,
		Zfr: `ℨ`,
		Zopf: `ℤ`,
		Zscr: `𝒵`,
		aacute: `á`,
		abreve: `ă`,
		ac: `∾`,
		acE: `∾̳`,
		acd: `∿`,
		acirc: `â`,
		acute: `´`,
		acy: `а`,
		aelig: `æ`,
		af: `⁡`,
		afr: `𝔞`,
		agrave: `à`,
		alefsym: `ℵ`,
		aleph: `ℵ`,
		alpha: `α`,
		amacr: `ā`,
		amalg: `⨿`,
		amp: `&`,
		and: `∧`,
		andand: `⩕`,
		andd: `⩜`,
		andslope: `⩘`,
		andv: `⩚`,
		ang: `∠`,
		ange: `⦤`,
		angle: `∠`,
		angmsd: `∡`,
		angmsdaa: `⦨`,
		angmsdab: `⦩`,
		angmsdac: `⦪`,
		angmsdad: `⦫`,
		angmsdae: `⦬`,
		angmsdaf: `⦭`,
		angmsdag: `⦮`,
		angmsdah: `⦯`,
		angrt: `∟`,
		angrtvb: `⊾`,
		angrtvbd: `⦝`,
		angsph: `∢`,
		angst: `Å`,
		angzarr: `⍼`,
		aogon: `ą`,
		aopf: `𝕒`,
		ap: `≈`,
		apE: `⩰`,
		apacir: `⩯`,
		ape: `≊`,
		apid: `≋`,
		apos: `'`,
		approx: `≈`,
		approxeq: `≊`,
		aring: `å`,
		ascr: `𝒶`,
		ast: `*`,
		asymp: `≈`,
		asympeq: `≍`,
		atilde: `ã`,
		auml: `ä`,
		awconint: `∳`,
		awint: `⨑`,
		bNot: `⫭`,
		backcong: `≌`,
		backepsilon: `϶`,
		backprime: `‵`,
		backsim: `∽`,
		backsimeq: `⋍`,
		barvee: `⊽`,
		barwed: `⌅`,
		barwedge: `⌅`,
		bbrk: `⎵`,
		bbrktbrk: `⎶`,
		bcong: `≌`,
		bcy: `б`,
		bdquo: `„`,
		becaus: `∵`,
		because: `∵`,
		bemptyv: `⦰`,
		bepsi: `϶`,
		bernou: `ℬ`,
		beta: `β`,
		beth: `ℶ`,
		between: `≬`,
		bfr: `𝔟`,
		bigcap: `⋂`,
		bigcirc: `◯`,
		bigcup: `⋃`,
		bigodot: `⨀`,
		bigoplus: `⨁`,
		bigotimes: `⨂`,
		bigsqcup: `⨆`,
		bigstar: `★`,
		bigtriangledown: `▽`,
		bigtriangleup: `△`,
		biguplus: `⨄`,
		bigvee: `⋁`,
		bigwedge: `⋀`,
		bkarow: `⤍`,
		blacklozenge: `⧫`,
		blacksquare: `▪`,
		blacktriangle: `▴`,
		blacktriangledown: `▾`,
		blacktriangleleft: `◂`,
		blacktriangleright: `▸`,
		blank: `␣`,
		blk12: `▒`,
		blk14: `░`,
		blk34: `▓`,
		block: `█`,
		bne: `=⃥`,
		bnequiv: `≡⃥`,
		bnot: `⌐`,
		bopf: `𝕓`,
		bot: `⊥`,
		bottom: `⊥`,
		bowtie: `⋈`,
		boxDL: `╗`,
		boxDR: `╔`,
		boxDl: `╖`,
		boxDr: `╓`,
		boxH: `═`,
		boxHD: `╦`,
		boxHU: `╩`,
		boxHd: `╤`,
		boxHu: `╧`,
		boxUL: `╝`,
		boxUR: `╚`,
		boxUl: `╜`,
		boxUr: `╙`,
		boxV: `║`,
		boxVH: `╬`,
		boxVL: `╣`,
		boxVR: `╠`,
		boxVh: `╫`,
		boxVl: `╢`,
		boxVr: `╟`,
		boxbox: `⧉`,
		boxdL: `╕`,
		boxdR: `╒`,
		boxdl: `┐`,
		boxdr: `┌`,
		boxh: `─`,
		boxhD: `╥`,
		boxhU: `╨`,
		boxhd: `┬`,
		boxhu: `┴`,
		boxminus: `⊟`,
		boxplus: `⊞`,
		boxtimes: `⊠`,
		boxuL: `╛`,
		boxuR: `╘`,
		boxul: `┘`,
		boxur: `└`,
		boxv: `│`,
		boxvH: `╪`,
		boxvL: `╡`,
		boxvR: `╞`,
		boxvh: `┼`,
		boxvl: `┤`,
		boxvr: `├`,
		bprime: `‵`,
		breve: `˘`,
		brvbar: `¦`,
		bscr: `𝒷`,
		bsemi: `⁏`,
		bsim: `∽`,
		bsime: `⋍`,
		bsol: `\\`,
		bsolb: `⧅`,
		bsolhsub: `⟈`,
		bull: `•`,
		bullet: `•`,
		bump: `≎`,
		bumpE: `⪮`,
		bumpe: `≏`,
		bumpeq: `≏`,
		cacute: `ć`,
		cap: `∩`,
		capand: `⩄`,
		capbrcup: `⩉`,
		capcap: `⩋`,
		capcup: `⩇`,
		capdot: `⩀`,
		caps: `∩︀`,
		caret: `⁁`,
		caron: `ˇ`,
		ccaps: `⩍`,
		ccaron: `č`,
		ccedil: `ç`,
		ccirc: `ĉ`,
		ccups: `⩌`,
		ccupssm: `⩐`,
		cdot: `ċ`,
		cedil: `¸`,
		cemptyv: `⦲`,
		cent: `¢`,
		centerdot: `·`,
		cfr: `𝔠`,
		chcy: `ч`,
		check: `✓`,
		checkmark: `✓`,
		chi: `χ`,
		cir: `○`,
		cirE: `⧃`,
		circ: `ˆ`,
		circeq: `≗`,
		circlearrowleft: `↺`,
		circlearrowright: `↻`,
		circledR: `®`,
		circledS: `Ⓢ`,
		circledast: `⊛`,
		circledcirc: `⊚`,
		circleddash: `⊝`,
		cire: `≗`,
		cirfnint: `⨐`,
		cirmid: `⫯`,
		cirscir: `⧂`,
		clubs: `♣`,
		clubsuit: `♣`,
		colon: `:`,
		colone: `≔`,
		coloneq: `≔`,
		comma: `,`,
		commat: `@`,
		comp: `∁`,
		compfn: `∘`,
		complement: `∁`,
		complexes: `ℂ`,
		cong: `≅`,
		congdot: `⩭`,
		conint: `∮`,
		copf: `𝕔`,
		coprod: `∐`,
		copy: `©`,
		copysr: `℗`,
		crarr: `↵`,
		cross: `✗`,
		cscr: `𝒸`,
		csub: `⫏`,
		csube: `⫑`,
		csup: `⫐`,
		csupe: `⫒`,
		ctdot: `⋯`,
		cudarrl: `⤸`,
		cudarrr: `⤵`,
		cuepr: `⋞`,
		cuesc: `⋟`,
		cularr: `↶`,
		cularrp: `⤽`,
		cup: `∪`,
		cupbrcap: `⩈`,
		cupcap: `⩆`,
		cupcup: `⩊`,
		cupdot: `⊍`,
		cupor: `⩅`,
		cups: `∪︀`,
		curarr: `↷`,
		curarrm: `⤼`,
		curlyeqprec: `⋞`,
		curlyeqsucc: `⋟`,
		curlyvee: `⋎`,
		curlywedge: `⋏`,
		curren: `¤`,
		curvearrowleft: `↶`,
		curvearrowright: `↷`,
		cuvee: `⋎`,
		cuwed: `⋏`,
		cwconint: `∲`,
		cwint: `∱`,
		cylcty: `⌭`,
		dArr: `⇓`,
		dHar: `⥥`,
		dagger: `†`,
		daleth: `ℸ`,
		darr: `↓`,
		dash: `‐`,
		dashv: `⊣`,
		dbkarow: `⤏`,
		dblac: `˝`,
		dcaron: `ď`,
		dcy: `д`,
		dd: `ⅆ`,
		ddagger: `‡`,
		ddarr: `⇊`,
		ddotseq: `⩷`,
		deg: `°`,
		delta: `δ`,
		demptyv: `⦱`,
		dfisht: `⥿`,
		dfr: `𝔡`,
		dharl: `⇃`,
		dharr: `⇂`,
		diam: `⋄`,
		diamond: `⋄`,
		diamondsuit: `♦`,
		diams: `♦`,
		die: `¨`,
		digamma: `ϝ`,
		disin: `⋲`,
		div: `÷`,
		divide: `÷`,
		divideontimes: `⋇`,
		divonx: `⋇`,
		djcy: `ђ`,
		dlcorn: `⌞`,
		dlcrop: `⌍`,
		dollar: `$`,
		dopf: `𝕕`,
		dot: `˙`,
		doteq: `≐`,
		doteqdot: `≑`,
		dotminus: `∸`,
		dotplus: `∔`,
		dotsquare: `⊡`,
		doublebarwedge: `⌆`,
		downarrow: `↓`,
		downdownarrows: `⇊`,
		downharpoonleft: `⇃`,
		downharpoonright: `⇂`,
		drbkarow: `⤐`,
		drcorn: `⌟`,
		drcrop: `⌌`,
		dscr: `𝒹`,
		dscy: `ѕ`,
		dsol: `⧶`,
		dstrok: `đ`,
		dtdot: `⋱`,
		dtri: `▿`,
		dtrif: `▾`,
		duarr: `⇵`,
		duhar: `⥯`,
		dwangle: `⦦`,
		dzcy: `џ`,
		dzigrarr: `⟿`,
		eDDot: `⩷`,
		eDot: `≑`,
		eacute: `é`,
		easter: `⩮`,
		ecaron: `ě`,
		ecir: `≖`,
		ecirc: `ê`,
		ecolon: `≕`,
		ecy: `э`,
		edot: `ė`,
		ee: `ⅇ`,
		efDot: `≒`,
		efr: `𝔢`,
		eg: `⪚`,
		egrave: `è`,
		egs: `⪖`,
		egsdot: `⪘`,
		el: `⪙`,
		elinters: `⏧`,
		ell: `ℓ`,
		els: `⪕`,
		elsdot: `⪗`,
		emacr: `ē`,
		empty: `∅`,
		emptyset: `∅`,
		emptyv: `∅`,
		emsp13: ` `,
		emsp14: ` `,
		emsp: ` `,
		eng: `ŋ`,
		ensp: ` `,
		eogon: `ę`,
		eopf: `𝕖`,
		epar: `⋕`,
		eparsl: `⧣`,
		eplus: `⩱`,
		epsi: `ε`,
		epsilon: `ε`,
		epsiv: `ϵ`,
		eqcirc: `≖`,
		eqcolon: `≕`,
		eqsim: `≂`,
		eqslantgtr: `⪖`,
		eqslantless: `⪕`,
		equals: `=`,
		equest: `≟`,
		equiv: `≡`,
		equivDD: `⩸`,
		eqvparsl: `⧥`,
		erDot: `≓`,
		erarr: `⥱`,
		escr: `ℯ`,
		esdot: `≐`,
		esim: `≂`,
		eta: `η`,
		eth: `ð`,
		euml: `ë`,
		euro: `€`,
		excl: `!`,
		exist: `∃`,
		expectation: `ℰ`,
		exponentiale: `ⅇ`,
		fallingdotseq: `≒`,
		fcy: `ф`,
		female: `♀`,
		ffilig: `ﬃ`,
		fflig: `ﬀ`,
		ffllig: `ﬄ`,
		ffr: `𝔣`,
		filig: `ﬁ`,
		fjlig: `fj`,
		flat: `♭`,
		fllig: `ﬂ`,
		fltns: `▱`,
		fnof: `ƒ`,
		fopf: `𝕗`,
		forall: `∀`,
		fork: `⋔`,
		forkv: `⫙`,
		fpartint: `⨍`,
		frac12: `½`,
		frac13: `⅓`,
		frac14: `¼`,
		frac15: `⅕`,
		frac16: `⅙`,
		frac18: `⅛`,
		frac23: `⅔`,
		frac25: `⅖`,
		frac34: `¾`,
		frac35: `⅗`,
		frac38: `⅜`,
		frac45: `⅘`,
		frac56: `⅚`,
		frac58: `⅝`,
		frac78: `⅞`,
		frasl: `⁄`,
		frown: `⌢`,
		fscr: `𝒻`,
		gE: `≧`,
		gEl: `⪌`,
		gacute: `ǵ`,
		gamma: `γ`,
		gammad: `ϝ`,
		gap: `⪆`,
		gbreve: `ğ`,
		gcirc: `ĝ`,
		gcy: `г`,
		gdot: `ġ`,
		ge: `≥`,
		gel: `⋛`,
		geq: `≥`,
		geqq: `≧`,
		geqslant: `⩾`,
		ges: `⩾`,
		gescc: `⪩`,
		gesdot: `⪀`,
		gesdoto: `⪂`,
		gesdotol: `⪄`,
		gesl: `⋛︀`,
		gesles: `⪔`,
		gfr: `𝔤`,
		gg: `≫`,
		ggg: `⋙`,
		gimel: `ℷ`,
		gjcy: `ѓ`,
		gl: `≷`,
		glE: `⪒`,
		gla: `⪥`,
		glj: `⪤`,
		gnE: `≩`,
		gnap: `⪊`,
		gnapprox: `⪊`,
		gne: `⪈`,
		gneq: `⪈`,
		gneqq: `≩`,
		gnsim: `⋧`,
		gopf: `𝕘`,
		grave: "`",
		gscr: `ℊ`,
		gsim: `≳`,
		gsime: `⪎`,
		gsiml: `⪐`,
		gt: `>`,
		gtcc: `⪧`,
		gtcir: `⩺`,
		gtdot: `⋗`,
		gtlPar: `⦕`,
		gtquest: `⩼`,
		gtrapprox: `⪆`,
		gtrarr: `⥸`,
		gtrdot: `⋗`,
		gtreqless: `⋛`,
		gtreqqless: `⪌`,
		gtrless: `≷`,
		gtrsim: `≳`,
		gvertneqq: `≩︀`,
		gvnE: `≩︀`,
		hArr: `⇔`,
		hairsp: ` `,
		half: `½`,
		hamilt: `ℋ`,
		hardcy: `ъ`,
		harr: `↔`,
		harrcir: `⥈`,
		harrw: `↭`,
		hbar: `ℏ`,
		hcirc: `ĥ`,
		hearts: `♥`,
		heartsuit: `♥`,
		hellip: `…`,
		hercon: `⊹`,
		hfr: `𝔥`,
		hksearow: `⤥`,
		hkswarow: `⤦`,
		hoarr: `⇿`,
		homtht: `∻`,
		hookleftarrow: `↩`,
		hookrightarrow: `↪`,
		hopf: `𝕙`,
		horbar: `―`,
		hscr: `𝒽`,
		hslash: `ℏ`,
		hstrok: `ħ`,
		hybull: `⁃`,
		hyphen: `‐`,
		iacute: `í`,
		ic: `⁣`,
		icirc: `î`,
		icy: `и`,
		iecy: `е`,
		iexcl: `¡`,
		iff: `⇔`,
		ifr: `𝔦`,
		igrave: `ì`,
		ii: `ⅈ`,
		iiiint: `⨌`,
		iiint: `∭`,
		iinfin: `⧜`,
		iiota: `℩`,
		ijlig: `ĳ`,
		imacr: `ī`,
		image: `ℑ`,
		imagline: `ℐ`,
		imagpart: `ℑ`,
		imath: `ı`,
		imof: `⊷`,
		imped: `Ƶ`,
		in: `∈`,
		incare: `℅`,
		infin: `∞`,
		infintie: `⧝`,
		inodot: `ı`,
		int: `∫`,
		intcal: `⊺`,
		integers: `ℤ`,
		intercal: `⊺`,
		intlarhk: `⨗`,
		intprod: `⨼`,
		iocy: `ё`,
		iogon: `į`,
		iopf: `𝕚`,
		iota: `ι`,
		iprod: `⨼`,
		iquest: `¿`,
		iscr: `𝒾`,
		isin: `∈`,
		isinE: `⋹`,
		isindot: `⋵`,
		isins: `⋴`,
		isinsv: `⋳`,
		isinv: `∈`,
		it: `⁢`,
		itilde: `ĩ`,
		iukcy: `і`,
		iuml: `ï`,
		jcirc: `ĵ`,
		jcy: `й`,
		jfr: `𝔧`,
		jmath: `ȷ`,
		jopf: `𝕛`,
		jscr: `𝒿`,
		jsercy: `ј`,
		jukcy: `є`,
		kappa: `κ`,
		kappav: `ϰ`,
		kcedil: `ķ`,
		kcy: `к`,
		kfr: `𝔨`,
		kgreen: `ĸ`,
		khcy: `х`,
		kjcy: `ќ`,
		kopf: `𝕜`,
		kscr: `𝓀`,
		lAarr: `⇚`,
		lArr: `⇐`,
		lAtail: `⤛`,
		lBarr: `⤎`,
		lE: `≦`,
		lEg: `⪋`,
		lHar: `⥢`,
		lacute: `ĺ`,
		laemptyv: `⦴`,
		lagran: `ℒ`,
		lambda: `λ`,
		lang: `⟨`,
		langd: `⦑`,
		langle: `⟨`,
		lap: `⪅`,
		laquo: `«`,
		larr: `←`,
		larrb: `⇤`,
		larrbfs: `⤟`,
		larrfs: `⤝`,
		larrhk: `↩`,
		larrlp: `↫`,
		larrpl: `⤹`,
		larrsim: `⥳`,
		larrtl: `↢`,
		lat: `⪫`,
		latail: `⤙`,
		late: `⪭`,
		lates: `⪭︀`,
		lbarr: `⤌`,
		lbbrk: `❲`,
		lbrace: `{`,
		lbrack: `[`,
		lbrke: `⦋`,
		lbrksld: `⦏`,
		lbrkslu: `⦍`,
		lcaron: `ľ`,
		lcedil: `ļ`,
		lceil: `⌈`,
		lcub: `{`,
		lcy: `л`,
		ldca: `⤶`,
		ldquo: `“`,
		ldquor: `„`,
		ldrdhar: `⥧`,
		ldrushar: `⥋`,
		ldsh: `↲`,
		le: `≤`,
		leftarrow: `←`,
		leftarrowtail: `↢`,
		leftharpoondown: `↽`,
		leftharpoonup: `↼`,
		leftleftarrows: `⇇`,
		leftrightarrow: `↔`,
		leftrightarrows: `⇆`,
		leftrightharpoons: `⇋`,
		leftrightsquigarrow: `↭`,
		leftthreetimes: `⋋`,
		leg: `⋚`,
		leq: `≤`,
		leqq: `≦`,
		leqslant: `⩽`,
		les: `⩽`,
		lescc: `⪨`,
		lesdot: `⩿`,
		lesdoto: `⪁`,
		lesdotor: `⪃`,
		lesg: `⋚︀`,
		lesges: `⪓`,
		lessapprox: `⪅`,
		lessdot: `⋖`,
		lesseqgtr: `⋚`,
		lesseqqgtr: `⪋`,
		lessgtr: `≶`,
		lesssim: `≲`,
		lfisht: `⥼`,
		lfloor: `⌊`,
		lfr: `𝔩`,
		lg: `≶`,
		lgE: `⪑`,
		lhard: `↽`,
		lharu: `↼`,
		lharul: `⥪`,
		lhblk: `▄`,
		ljcy: `љ`,
		ll: `≪`,
		llarr: `⇇`,
		llcorner: `⌞`,
		llhard: `⥫`,
		lltri: `◺`,
		lmidot: `ŀ`,
		lmoust: `⎰`,
		lmoustache: `⎰`,
		lnE: `≨`,
		lnap: `⪉`,
		lnapprox: `⪉`,
		lne: `⪇`,
		lneq: `⪇`,
		lneqq: `≨`,
		lnsim: `⋦`,
		loang: `⟬`,
		loarr: `⇽`,
		lobrk: `⟦`,
		longleftarrow: `⟵`,
		longleftrightarrow: `⟷`,
		longmapsto: `⟼`,
		longrightarrow: `⟶`,
		looparrowleft: `↫`,
		looparrowright: `↬`,
		lopar: `⦅`,
		lopf: `𝕝`,
		loplus: `⨭`,
		lotimes: `⨴`,
		lowast: `∗`,
		lowbar: `_`,
		loz: `◊`,
		lozenge: `◊`,
		lozf: `⧫`,
		lpar: `(`,
		lparlt: `⦓`,
		lrarr: `⇆`,
		lrcorner: `⌟`,
		lrhar: `⇋`,
		lrhard: `⥭`,
		lrm: `‎`,
		lrtri: `⊿`,
		lsaquo: `‹`,
		lscr: `𝓁`,
		lsh: `↰`,
		lsim: `≲`,
		lsime: `⪍`,
		lsimg: `⪏`,
		lsqb: `[`,
		lsquo: `‘`,
		lsquor: `‚`,
		lstrok: `ł`,
		lt: `<`,
		ltcc: `⪦`,
		ltcir: `⩹`,
		ltdot: `⋖`,
		lthree: `⋋`,
		ltimes: `⋉`,
		ltlarr: `⥶`,
		ltquest: `⩻`,
		ltrPar: `⦖`,
		ltri: `◃`,
		ltrie: `⊴`,
		ltrif: `◂`,
		lurdshar: `⥊`,
		luruhar: `⥦`,
		lvertneqq: `≨︀`,
		lvnE: `≨︀`,
		mDDot: `∺`,
		macr: `¯`,
		male: `♂`,
		malt: `✠`,
		maltese: `✠`,
		map: `↦`,
		mapsto: `↦`,
		mapstodown: `↧`,
		mapstoleft: `↤`,
		mapstoup: `↥`,
		marker: `▮`,
		mcomma: `⨩`,
		mcy: `м`,
		mdash: `—`,
		measuredangle: `∡`,
		mfr: `𝔪`,
		mho: `℧`,
		micro: `µ`,
		mid: `∣`,
		midast: `*`,
		midcir: `⫰`,
		middot: `·`,
		minus: `−`,
		minusb: `⊟`,
		minusd: `∸`,
		minusdu: `⨪`,
		mlcp: `⫛`,
		mldr: `…`,
		mnplus: `∓`,
		models: `⊧`,
		mopf: `𝕞`,
		mp: `∓`,
		mscr: `𝓂`,
		mstpos: `∾`,
		mu: `μ`,
		multimap: `⊸`,
		mumap: `⊸`,
		nGg: `⋙̸`,
		nGt: `≫⃒`,
		nGtv: `≫̸`,
		nLeftarrow: `⇍`,
		nLeftrightarrow: `⇎`,
		nLl: `⋘̸`,
		nLt: `≪⃒`,
		nLtv: `≪̸`,
		nRightarrow: `⇏`,
		nVDash: `⊯`,
		nVdash: `⊮`,
		nabla: `∇`,
		nacute: `ń`,
		nang: `∠⃒`,
		nap: `≉`,
		napE: `⩰̸`,
		napid: `≋̸`,
		napos: `ŉ`,
		napprox: `≉`,
		natur: `♮`,
		natural: `♮`,
		naturals: `ℕ`,
		nbsp: `\xA0`,
		nbump: `≎̸`,
		nbumpe: `≏̸`,
		ncap: `⩃`,
		ncaron: `ň`,
		ncedil: `ņ`,
		ncong: `≇`,
		ncongdot: `⩭̸`,
		ncup: `⩂`,
		ncy: `н`,
		ndash: `–`,
		ne: `≠`,
		neArr: `⇗`,
		nearhk: `⤤`,
		nearr: `↗`,
		nearrow: `↗`,
		nedot: `≐̸`,
		nequiv: `≢`,
		nesear: `⤨`,
		nesim: `≂̸`,
		nexist: `∄`,
		nexists: `∄`,
		nfr: `𝔫`,
		ngE: `≧̸`,
		nge: `≱`,
		ngeq: `≱`,
		ngeqq: `≧̸`,
		ngeqslant: `⩾̸`,
		nges: `⩾̸`,
		ngsim: `≵`,
		ngt: `≯`,
		ngtr: `≯`,
		nhArr: `⇎`,
		nharr: `↮`,
		nhpar: `⫲`,
		ni: `∋`,
		nis: `⋼`,
		nisd: `⋺`,
		niv: `∋`,
		njcy: `њ`,
		nlArr: `⇍`,
		nlE: `≦̸`,
		nlarr: `↚`,
		nldr: `‥`,
		nle: `≰`,
		nleftarrow: `↚`,
		nleftrightarrow: `↮`,
		nleq: `≰`,
		nleqq: `≦̸`,
		nleqslant: `⩽̸`,
		nles: `⩽̸`,
		nless: `≮`,
		nlsim: `≴`,
		nlt: `≮`,
		nltri: `⋪`,
		nltrie: `⋬`,
		nmid: `∤`,
		nopf: `𝕟`,
		not: `¬`,
		notin: `∉`,
		notinE: `⋹̸`,
		notindot: `⋵̸`,
		notinva: `∉`,
		notinvb: `⋷`,
		notinvc: `⋶`,
		notni: `∌`,
		notniva: `∌`,
		notnivb: `⋾`,
		notnivc: `⋽`,
		npar: `∦`,
		nparallel: `∦`,
		nparsl: `⫽⃥`,
		npart: `∂̸`,
		npolint: `⨔`,
		npr: `⊀`,
		nprcue: `⋠`,
		npre: `⪯̸`,
		nprec: `⊀`,
		npreceq: `⪯̸`,
		nrArr: `⇏`,
		nrarr: `↛`,
		nrarrc: `⤳̸`,
		nrarrw: `↝̸`,
		nrightarrow: `↛`,
		nrtri: `⋫`,
		nrtrie: `⋭`,
		nsc: `⊁`,
		nsccue: `⋡`,
		nsce: `⪰̸`,
		nscr: `𝓃`,
		nshortmid: `∤`,
		nshortparallel: `∦`,
		nsim: `≁`,
		nsime: `≄`,
		nsimeq: `≄`,
		nsmid: `∤`,
		nspar: `∦`,
		nsqsube: `⋢`,
		nsqsupe: `⋣`,
		nsub: `⊄`,
		nsubE: `⫅̸`,
		nsube: `⊈`,
		nsubset: `⊂⃒`,
		nsubseteq: `⊈`,
		nsubseteqq: `⫅̸`,
		nsucc: `⊁`,
		nsucceq: `⪰̸`,
		nsup: `⊅`,
		nsupE: `⫆̸`,
		nsupe: `⊉`,
		nsupset: `⊃⃒`,
		nsupseteq: `⊉`,
		nsupseteqq: `⫆̸`,
		ntgl: `≹`,
		ntilde: `ñ`,
		ntlg: `≸`,
		ntriangleleft: `⋪`,
		ntrianglelefteq: `⋬`,
		ntriangleright: `⋫`,
		ntrianglerighteq: `⋭`,
		nu: `ν`,
		num: `#`,
		numero: `№`,
		numsp: ` `,
		nvDash: `⊭`,
		nvHarr: `⤄`,
		nvap: `≍⃒`,
		nvdash: `⊬`,
		nvge: `≥⃒`,
		nvgt: `>⃒`,
		nvinfin: `⧞`,
		nvlArr: `⤂`,
		nvle: `≤⃒`,
		nvlt: `<⃒`,
		nvltrie: `⊴⃒`,
		nvrArr: `⤃`,
		nvrtrie: `⊵⃒`,
		nvsim: `∼⃒`,
		nwArr: `⇖`,
		nwarhk: `⤣`,
		nwarr: `↖`,
		nwarrow: `↖`,
		nwnear: `⤧`,
		oS: `Ⓢ`,
		oacute: `ó`,
		oast: `⊛`,
		ocir: `⊚`,
		ocirc: `ô`,
		ocy: `о`,
		odash: `⊝`,
		odblac: `ő`,
		odiv: `⨸`,
		odot: `⊙`,
		odsold: `⦼`,
		oelig: `œ`,
		ofcir: `⦿`,
		ofr: `𝔬`,
		ogon: `˛`,
		ograve: `ò`,
		ogt: `⧁`,
		ohbar: `⦵`,
		ohm: `Ω`,
		oint: `∮`,
		olarr: `↺`,
		olcir: `⦾`,
		olcross: `⦻`,
		oline: `‾`,
		olt: `⧀`,
		omacr: `ō`,
		omega: `ω`,
		omicron: `ο`,
		omid: `⦶`,
		ominus: `⊖`,
		oopf: `𝕠`,
		opar: `⦷`,
		operp: `⦹`,
		oplus: `⊕`,
		or: `∨`,
		orarr: `↻`,
		ord: `⩝`,
		order: `ℴ`,
		orderof: `ℴ`,
		ordf: `ª`,
		ordm: `º`,
		origof: `⊶`,
		oror: `⩖`,
		orslope: `⩗`,
		orv: `⩛`,
		oscr: `ℴ`,
		oslash: `ø`,
		osol: `⊘`,
		otilde: `õ`,
		otimes: `⊗`,
		otimesas: `⨶`,
		ouml: `ö`,
		ovbar: `⌽`,
		par: `∥`,
		para: `¶`,
		parallel: `∥`,
		parsim: `⫳`,
		parsl: `⫽`,
		part: `∂`,
		pcy: `п`,
		percnt: `%`,
		period: `.`,
		permil: `‰`,
		perp: `⊥`,
		pertenk: `‱`,
		pfr: `𝔭`,
		phi: `φ`,
		phiv: `ϕ`,
		phmmat: `ℳ`,
		phone: `☎`,
		pi: `π`,
		pitchfork: `⋔`,
		piv: `ϖ`,
		planck: `ℏ`,
		planckh: `ℎ`,
		plankv: `ℏ`,
		plus: `+`,
		plusacir: `⨣`,
		plusb: `⊞`,
		pluscir: `⨢`,
		plusdo: `∔`,
		plusdu: `⨥`,
		pluse: `⩲`,
		plusmn: `±`,
		plussim: `⨦`,
		plustwo: `⨧`,
		pm: `±`,
		pointint: `⨕`,
		popf: `𝕡`,
		pound: `£`,
		pr: `≺`,
		prE: `⪳`,
		prap: `⪷`,
		prcue: `≼`,
		pre: `⪯`,
		prec: `≺`,
		precapprox: `⪷`,
		preccurlyeq: `≼`,
		preceq: `⪯`,
		precnapprox: `⪹`,
		precneqq: `⪵`,
		precnsim: `⋨`,
		precsim: `≾`,
		prime: `′`,
		primes: `ℙ`,
		prnE: `⪵`,
		prnap: `⪹`,
		prnsim: `⋨`,
		prod: `∏`,
		profalar: `⌮`,
		profline: `⌒`,
		profsurf: `⌓`,
		prop: `∝`,
		propto: `∝`,
		prsim: `≾`,
		prurel: `⊰`,
		pscr: `𝓅`,
		psi: `ψ`,
		puncsp: ` `,
		qfr: `𝔮`,
		qint: `⨌`,
		qopf: `𝕢`,
		qprime: `⁗`,
		qscr: `𝓆`,
		quaternions: `ℍ`,
		quatint: `⨖`,
		quest: `?`,
		questeq: `≟`,
		quot: `"`,
		rAarr: `⇛`,
		rArr: `⇒`,
		rAtail: `⤜`,
		rBarr: `⤏`,
		rHar: `⥤`,
		race: `∽̱`,
		racute: `ŕ`,
		radic: `√`,
		raemptyv: `⦳`,
		rang: `⟩`,
		rangd: `⦒`,
		range: `⦥`,
		rangle: `⟩`,
		raquo: `»`,
		rarr: `→`,
		rarrap: `⥵`,
		rarrb: `⇥`,
		rarrbfs: `⤠`,
		rarrc: `⤳`,
		rarrfs: `⤞`,
		rarrhk: `↪`,
		rarrlp: `↬`,
		rarrpl: `⥅`,
		rarrsim: `⥴`,
		rarrtl: `↣`,
		rarrw: `↝`,
		ratail: `⤚`,
		ratio: `∶`,
		rationals: `ℚ`,
		rbarr: `⤍`,
		rbbrk: `❳`,
		rbrace: `}`,
		rbrack: `]`,
		rbrke: `⦌`,
		rbrksld: `⦎`,
		rbrkslu: `⦐`,
		rcaron: `ř`,
		rcedil: `ŗ`,
		rceil: `⌉`,
		rcub: `}`,
		rcy: `р`,
		rdca: `⤷`,
		rdldhar: `⥩`,
		rdquo: `”`,
		rdquor: `”`,
		rdsh: `↳`,
		real: `ℜ`,
		realine: `ℛ`,
		realpart: `ℜ`,
		reals: `ℝ`,
		rect: `▭`,
		reg: `®`,
		rfisht: `⥽`,
		rfloor: `⌋`,
		rfr: `𝔯`,
		rhard: `⇁`,
		rharu: `⇀`,
		rharul: `⥬`,
		rho: `ρ`,
		rhov: `ϱ`,
		rightarrow: `→`,
		rightarrowtail: `↣`,
		rightharpoondown: `⇁`,
		rightharpoonup: `⇀`,
		rightleftarrows: `⇄`,
		rightleftharpoons: `⇌`,
		rightrightarrows: `⇉`,
		rightsquigarrow: `↝`,
		rightthreetimes: `⋌`,
		ring: `˚`,
		risingdotseq: `≓`,
		rlarr: `⇄`,
		rlhar: `⇌`,
		rlm: `‏`,
		rmoust: `⎱`,
		rmoustache: `⎱`,
		rnmid: `⫮`,
		roang: `⟭`,
		roarr: `⇾`,
		robrk: `⟧`,
		ropar: `⦆`,
		ropf: `𝕣`,
		roplus: `⨮`,
		rotimes: `⨵`,
		rpar: `)`,
		rpargt: `⦔`,
		rppolint: `⨒`,
		rrarr: `⇉`,
		rsaquo: `›`,
		rscr: `𝓇`,
		rsh: `↱`,
		rsqb: `]`,
		rsquo: `’`,
		rsquor: `’`,
		rthree: `⋌`,
		rtimes: `⋊`,
		rtri: `▹`,
		rtrie: `⊵`,
		rtrif: `▸`,
		rtriltri: `⧎`,
		ruluhar: `⥨`,
		rx: `℞`,
		sacute: `ś`,
		sbquo: `‚`,
		sc: `≻`,
		scE: `⪴`,
		scap: `⪸`,
		scaron: `š`,
		sccue: `≽`,
		sce: `⪰`,
		scedil: `ş`,
		scirc: `ŝ`,
		scnE: `⪶`,
		scnap: `⪺`,
		scnsim: `⋩`,
		scpolint: `⨓`,
		scsim: `≿`,
		scy: `с`,
		sdot: `⋅`,
		sdotb: `⊡`,
		sdote: `⩦`,
		seArr: `⇘`,
		searhk: `⤥`,
		searr: `↘`,
		searrow: `↘`,
		sect: `§`,
		semi: `;`,
		seswar: `⤩`,
		setminus: `∖`,
		setmn: `∖`,
		sext: `✶`,
		sfr: `𝔰`,
		sfrown: `⌢`,
		sharp: `♯`,
		shchcy: `щ`,
		shcy: `ш`,
		shortmid: `∣`,
		shortparallel: `∥`,
		shy: `­`,
		sigma: `σ`,
		sigmaf: `ς`,
		sigmav: `ς`,
		sim: `∼`,
		simdot: `⩪`,
		sime: `≃`,
		simeq: `≃`,
		simg: `⪞`,
		simgE: `⪠`,
		siml: `⪝`,
		simlE: `⪟`,
		simne: `≆`,
		simplus: `⨤`,
		simrarr: `⥲`,
		slarr: `←`,
		smallsetminus: `∖`,
		smashp: `⨳`,
		smeparsl: `⧤`,
		smid: `∣`,
		smile: `⌣`,
		smt: `⪪`,
		smte: `⪬`,
		smtes: `⪬︀`,
		softcy: `ь`,
		sol: `/`,
		solb: `⧄`,
		solbar: `⌿`,
		sopf: `𝕤`,
		spades: `♠`,
		spadesuit: `♠`,
		spar: `∥`,
		sqcap: `⊓`,
		sqcaps: `⊓︀`,
		sqcup: `⊔`,
		sqcups: `⊔︀`,
		sqsub: `⊏`,
		sqsube: `⊑`,
		sqsubset: `⊏`,
		sqsubseteq: `⊑`,
		sqsup: `⊐`,
		sqsupe: `⊒`,
		sqsupset: `⊐`,
		sqsupseteq: `⊒`,
		squ: `□`,
		square: `□`,
		squarf: `▪`,
		squf: `▪`,
		srarr: `→`,
		sscr: `𝓈`,
		ssetmn: `∖`,
		ssmile: `⌣`,
		sstarf: `⋆`,
		star: `☆`,
		starf: `★`,
		straightepsilon: `ϵ`,
		straightphi: `ϕ`,
		strns: `¯`,
		sub: `⊂`,
		subE: `⫅`,
		subdot: `⪽`,
		sube: `⊆`,
		subedot: `⫃`,
		submult: `⫁`,
		subnE: `⫋`,
		subne: `⊊`,
		subplus: `⪿`,
		subrarr: `⥹`,
		subset: `⊂`,
		subseteq: `⊆`,
		subseteqq: `⫅`,
		subsetneq: `⊊`,
		subsetneqq: `⫋`,
		subsim: `⫇`,
		subsub: `⫕`,
		subsup: `⫓`,
		succ: `≻`,
		succapprox: `⪸`,
		succcurlyeq: `≽`,
		succeq: `⪰`,
		succnapprox: `⪺`,
		succneqq: `⪶`,
		succnsim: `⋩`,
		succsim: `≿`,
		sum: `∑`,
		sung: `♪`,
		sup1: `¹`,
		sup2: `²`,
		sup3: `³`,
		sup: `⊃`,
		supE: `⫆`,
		supdot: `⪾`,
		supdsub: `⫘`,
		supe: `⊇`,
		supedot: `⫄`,
		suphsol: `⟉`,
		suphsub: `⫗`,
		suplarr: `⥻`,
		supmult: `⫂`,
		supnE: `⫌`,
		supne: `⊋`,
		supplus: `⫀`,
		supset: `⊃`,
		supseteq: `⊇`,
		supseteqq: `⫆`,
		supsetneq: `⊋`,
		supsetneqq: `⫌`,
		supsim: `⫈`,
		supsub: `⫔`,
		supsup: `⫖`,
		swArr: `⇙`,
		swarhk: `⤦`,
		swarr: `↙`,
		swarrow: `↙`,
		swnwar: `⤪`,
		szlig: `ß`,
		target: `⌖`,
		tau: `τ`,
		tbrk: `⎴`,
		tcaron: `ť`,
		tcedil: `ţ`,
		tcy: `т`,
		tdot: `⃛`,
		telrec: `⌕`,
		tfr: `𝔱`,
		there4: `∴`,
		therefore: `∴`,
		theta: `θ`,
		thetasym: `ϑ`,
		thetav: `ϑ`,
		thickapprox: `≈`,
		thicksim: `∼`,
		thinsp: ` `,
		thkap: `≈`,
		thksim: `∼`,
		thorn: `þ`,
		tilde: `˜`,
		times: `×`,
		timesb: `⊠`,
		timesbar: `⨱`,
		timesd: `⨰`,
		tint: `∭`,
		toea: `⤨`,
		top: `⊤`,
		topbot: `⌶`,
		topcir: `⫱`,
		topf: `𝕥`,
		topfork: `⫚`,
		tosa: `⤩`,
		tprime: `‴`,
		trade: `™`,
		triangle: `▵`,
		triangledown: `▿`,
		triangleleft: `◃`,
		trianglelefteq: `⊴`,
		triangleq: `≜`,
		triangleright: `▹`,
		trianglerighteq: `⊵`,
		tridot: `◬`,
		trie: `≜`,
		triminus: `⨺`,
		triplus: `⨹`,
		trisb: `⧍`,
		tritime: `⨻`,
		trpezium: `⏢`,
		tscr: `𝓉`,
		tscy: `ц`,
		tshcy: `ћ`,
		tstrok: `ŧ`,
		twixt: `≬`,
		twoheadleftarrow: `↞`,
		twoheadrightarrow: `↠`,
		uArr: `⇑`,
		uHar: `⥣`,
		uacute: `ú`,
		uarr: `↑`,
		ubrcy: `ў`,
		ubreve: `ŭ`,
		ucirc: `û`,
		ucy: `у`,
		udarr: `⇅`,
		udblac: `ű`,
		udhar: `⥮`,
		ufisht: `⥾`,
		ufr: `𝔲`,
		ugrave: `ù`,
		uharl: `↿`,
		uharr: `↾`,
		uhblk: `▀`,
		ulcorn: `⌜`,
		ulcorner: `⌜`,
		ulcrop: `⌏`,
		ultri: `◸`,
		umacr: `ū`,
		uml: `¨`,
		uogon: `ų`,
		uopf: `𝕦`,
		uparrow: `↑`,
		updownarrow: `↕`,
		upharpoonleft: `↿`,
		upharpoonright: `↾`,
		uplus: `⊎`,
		upsi: `υ`,
		upsih: `ϒ`,
		upsilon: `υ`,
		upuparrows: `⇈`,
		urcorn: `⌝`,
		urcorner: `⌝`,
		urcrop: `⌎`,
		uring: `ů`,
		urtri: `◹`,
		uscr: `𝓊`,
		utdot: `⋰`,
		utilde: `ũ`,
		utri: `▵`,
		utrif: `▴`,
		uuarr: `⇈`,
		uuml: `ü`,
		uwangle: `⦧`,
		vArr: `⇕`,
		vBar: `⫨`,
		vBarv: `⫩`,
		vDash: `⊨`,
		vangrt: `⦜`,
		varepsilon: `ϵ`,
		varkappa: `ϰ`,
		varnothing: `∅`,
		varphi: `ϕ`,
		varpi: `ϖ`,
		varpropto: `∝`,
		varr: `↕`,
		varrho: `ϱ`,
		varsigma: `ς`,
		varsubsetneq: `⊊︀`,
		varsubsetneqq: `⫋︀`,
		varsupsetneq: `⊋︀`,
		varsupsetneqq: `⫌︀`,
		vartheta: `ϑ`,
		vartriangleleft: `⊲`,
		vartriangleright: `⊳`,
		vcy: `в`,
		vdash: `⊢`,
		vee: `∨`,
		veebar: `⊻`,
		veeeq: `≚`,
		vellip: `⋮`,
		verbar: `|`,
		vert: `|`,
		vfr: `𝔳`,
		vltri: `⊲`,
		vnsub: `⊂⃒`,
		vnsup: `⊃⃒`,
		vopf: `𝕧`,
		vprop: `∝`,
		vrtri: `⊳`,
		vscr: `𝓋`,
		vsubnE: `⫋︀`,
		vsubne: `⊊︀`,
		vsupnE: `⫌︀`,
		vsupne: `⊋︀`,
		vzigzag: `⦚`,
		wcirc: `ŵ`,
		wedbar: `⩟`,
		wedge: `∧`,
		wedgeq: `≙`,
		weierp: `℘`,
		wfr: `𝔴`,
		wopf: `𝕨`,
		wp: `℘`,
		wr: `≀`,
		wreath: `≀`,
		wscr: `𝓌`,
		xcap: `⋂`,
		xcirc: `◯`,
		xcup: `⋃`,
		xdtri: `▽`,
		xfr: `𝔵`,
		xhArr: `⟺`,
		xharr: `⟷`,
		xi: `ξ`,
		xlArr: `⟸`,
		xlarr: `⟵`,
		xmap: `⟼`,
		xnis: `⋻`,
		xodot: `⨀`,
		xopf: `𝕩`,
		xoplus: `⨁`,
		xotime: `⨂`,
		xrArr: `⟹`,
		xrarr: `⟶`,
		xscr: `𝓍`,
		xsqcup: `⨆`,
		xuplus: `⨄`,
		xutri: `△`,
		xvee: `⋁`,
		xwedge: `⋀`,
		yacute: `ý`,
		yacy: `я`,
		ycirc: `ŷ`,
		ycy: `ы`,
		yen: `¥`,
		yfr: `𝔶`,
		yicy: `ї`,
		yopf: `𝕪`,
		yscr: `𝓎`,
		yucy: `ю`,
		yuml: `ÿ`,
		zacute: `ź`,
		zcaron: `ž`,
		zcy: `з`,
		zdot: `ż`,
		zeetrf: `ℨ`,
		zeta: `ζ`,
		zfr: `𝔷`,
		zhcy: `ж`,
		zigrarr: `⇝`,
		zopf: `𝕫`,
		zscr: `𝓏`,
		zwj: `‍`,
		zwnj: `‌`
	};
	const Pc = {}.hasOwnProperty;
	function Fc(e) {
		return Pc.call(Nc, e) ? Nc[e] : !1;
	}
	function Ic(e, t) {
		let n = Number.parseInt(e, t);
		return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? `�` : String.fromCodePoint(n);
	}
	const Lc = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	function Rc(e) {
		return e.replace(Lc, zc);
	}
	function zc(e, t, n) {
		if (t) return t;
		if (n.charCodeAt(0) === 35) {
			let e = n.charCodeAt(1), t = e === 120 || e === 88;
			return Ic(n.slice(t ? 2 : 1), t ? 16 : 10);
		}
		return Fc(n) || e;
	}
	function Bc() {
		return {
			enter: {
				table: Vc,
				tableData: Gc,
				tableHeader: Gc,
				tableRow: Uc
			},
			exit: {
				codeText: Kc,
				table: Hc,
				tableData: Wc,
				tableHeader: Wc,
				tableRow: Wc
			}
		};
	}
	function Vc(e) {
		let t = e._align;
		this.enter({
			type: `table`,
			align: t.map(function(e) {
				return e === `none` ? null : e;
			}),
			children: []
		}, e), this.data.inTable = !0;
	}
	function Hc(e) {
		this.exit(e), this.data.inTable = void 0;
	}
	function Uc(e) {
		this.enter({
			type: `tableRow`,
			children: []
		}, e);
	}
	function Wc(e) {
		this.exit(e);
	}
	function Gc(e) {
		this.enter({
			type: `tableCell`,
			children: []
		}, e);
	}
	function Kc(e) {
		let t = this.resume();
		this.data.inTable && (t = t.replace(/\\([\\|])/g, qc));
		let n = this.stack[this.stack.length - 1];
		n.type, n.value = t, this.exit(e);
	}
	function qc(e, t) {
		return t === `|` ? t : e;
	}
	function Jc(e) {
		let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? ` ` : `|`;
		return {
			unsafe: [
				{
					character: `\r`,
					inConstruct: `tableCell`
				},
				{
					character: `
`,
					inConstruct: `tableCell`
				},
				{
					atBreak: !0,
					character: `|`,
					after: `[	 :-]`
				},
				{
					character: `|`,
					inConstruct: `tableCell`
				},
				{
					atBreak: !0,
					character: `:`,
					after: `-`
				},
				{
					atBreak: !0,
					character: `-`,
					after: `[:|-]`
				}
			],
			handlers: {
				inlineCode: f,
				table: o,
				tableCell: c,
				tableRow: s
			}
		};
		function o(e, t, n, r) {
			return l(u(e, n, r), e.align);
		}
		function s(e, t, n, r) {
			let i = l([d(e, n, r)]);
			return i.slice(0, i.indexOf(`
`));
		}
		function c(e, t, n, r) {
			let i = n.enter(`tableCell`), o = n.enter(`phrasing`), s = n.containerPhrasing(e, {
				...r,
				before: a,
				after: a
			});
			return o(), i(), s;
		}
		function l(e, t) {
			return Os(e, {
				align: t,
				alignDelimiters: r,
				padding: n,
				stringLength: i
			});
		}
		function u(e, t, n) {
			let r = e.children, i = -1, a = [], o = t.enter(`table`);
			for (; ++i < r.length;) a[i] = d(r[i], t, n);
			return o(), a;
		}
		function d(e, t, n) {
			let r = e.children, i = -1, a = [], o = t.enter(`tableRow`);
			for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
			return o(), a;
		}
		function f(e, t, n) {
			let r = Mc.inlineCode(e, t, n);
			return n.stack.includes(`tableCell`) && (r = r.replace(/\|/g, `\\$&`)), r;
		}
	}
	function Yc() {
		return { exit: {
			taskListCheckValueChecked: Zc,
			taskListCheckValueUnchecked: Zc,
			paragraph: Qc
		} };
	}
	function Xc() {
		return {
			unsafe: [{
				atBreak: !0,
				character: `-`,
				after: `[:|-]`
			}],
			handlers: { listItem: $c }
		};
	}
	function Zc(e) {
		let t = this.stack[this.stack.length - 2];
		t.type, t.checked = e.type === `taskListCheckValueChecked`;
	}
	function Qc(e) {
		let t = this.stack[this.stack.length - 2];
		if (t && t.type === `listItem` && typeof t.checked == `boolean`) {
			let e = this.stack[this.stack.length - 1];
			e.type;
			let n = e.children[0];
			if (n && n.type === `text`) {
				let r = t.children, i = -1, a;
				for (; ++i < r.length;) {
					let e = r[i];
					if (e.type === `paragraph`) {
						a = e;
						break;
					}
				}
				a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == `number` && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
			}
		}
		this.exit(e);
	}
	function $c(e, t, n, r) {
		let i = e.children[0], a = typeof e.checked == `boolean` && i && i.type === `paragraph`, o = `[` + (e.checked ? `x` : ` `) + `] `, s = n.createTracker(r);
		a && s.move(o);
		let c = Mc.listItem(e, t, n, {
			...r,
			...s.current()
		});
		return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
		function l(e) {
			return e + o;
		}
	}
	function el() {
		return [
			Go(),
			gs(),
			xs(),
			Bc(),
			Yc()
		];
	}
	function tl(e) {
		return { extensions: [
			Ko(),
			_s(e),
			Ss(),
			Jc(e),
			Xc()
		] };
	}
	const nl = {}.hasOwnProperty;
	function rl(e) {
		let t = {}, n = -1;
		for (; ++n < e.length;) il(t, e[n]);
		return t;
	}
	function il(e, t) {
		let n;
		for (n in t) {
			let r = (nl.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
			if (i) for (a in i) {
				nl.call(r, a) || (r[a] = []);
				let e = i[a];
				al(r[a], Array.isArray(e) ? e : e ? [e] : []);
			}
		}
	}
	function al(e, t) {
		let n = -1, r = [];
		for (; ++n < t.length;) (t[n].add === `after` ? e : r).push(t[n]);
		fa(e, 0, 0, r);
	}
	const ol = {
		tokenize: bl,
		partial: !0
	};
	const sl = {
		tokenize: xl,
		partial: !0
	};
	const cl = {
		tokenize: Sl,
		partial: !0
	};
	const ll = {
		tokenize: Cl,
		partial: !0
	};
	const ul = {
		tokenize: wl,
		partial: !0
	};
	const dl = {
		name: `wwwAutolink`,
		tokenize: vl,
		previous: Tl
	};
	const fl = {
		name: `protocolAutolink`,
		tokenize: yl,
		previous: El
	};
	const pl = {
		name: `emailAutolink`,
		tokenize: _l,
		previous: Dl
	};
	const ml = {};
	function hl() {
		return { text: ml };
	}
	let gl = 48;
	for (; gl < 123;) ml[gl] = pl, gl++, gl === 58 ? gl = 65 : gl === 91 && (gl = 97);
	ml[43] = pl, ml[45] = pl, ml[46] = pl, ml[95] = pl, ml[72] = [pl, fl], ml[104] = [pl, fl], ml[87] = [pl, dl], ml[119] = [pl, dl];
	function _l(e, t, n) {
		let r = this, i, a;
		return o;
		function o(t) {
			return !Ol(t) || !Dl.call(r, r.previous) || kl(r.events) ? n(t) : (e.enter(`literalAutolink`), e.enter(`literalAutolinkEmail`), s(t));
		}
		function s(t) {
			return Ol(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
		}
		function c(t) {
			return t === 46 ? e.check(ul, u, l)(t) : t === 45 || t === 95 || Ui(t) ? (a = !0, e.consume(t), c) : u(t);
		}
		function l(t) {
			return e.consume(t), i = !0, c;
		}
		function u(o) {
			return a && i && Hi(r.previous) ? (e.exit(`literalAutolinkEmail`), e.exit(`literalAutolink`), t(o)) : n(o);
		}
	}
	function vl(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return t !== 87 && t !== 119 || !Tl.call(r, r.previous) || kl(r.events) ? n(t) : (e.enter(`literalAutolink`), e.enter(`literalAutolinkWww`), e.check(ol, e.attempt(sl, e.attempt(cl, a), n), n)(t));
		}
		function a(n) {
			return e.exit(`literalAutolinkWww`), e.exit(`literalAutolink`), t(n);
		}
	}
	function yl(e, t, n) {
		let r = this, i = ``, a = !1;
		return o;
		function o(t) {
			return (t === 72 || t === 104) && El.call(r, r.previous) && !kl(r.events) ? (e.enter(`literalAutolink`), e.enter(`literalAutolinkHttp`), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
		}
		function s(t) {
			if (Hi(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
			if (t === 58) {
				let n = i.toLowerCase();
				if (n === `http` || n === `https`) return e.consume(t), c;
			}
			return n(t);
		}
		function c(t) {
			return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
		}
		function l(t) {
			return t === null || Gi(t) || H(t) || Xi(t) || Yi(t) ? n(t) : e.attempt(sl, e.attempt(cl, u), n)(t);
		}
		function u(n) {
			return e.exit(`literalAutolinkHttp`), e.exit(`literalAutolink`), t(n);
		}
	}
	function bl(e, t, n) {
		let r = 0;
		return i;
		function i(t) {
			return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
		}
		function a(e) {
			return e === null ? n(e) : t(e);
		}
	}
	function xl(e, t, n) {
		let r, i, a;
		return o;
		function o(t) {
			return t === 46 || t === 95 ? e.check(ll, c, s)(t) : t === null || H(t) || Xi(t) || t !== 45 && Yi(t) ? c(t) : (a = !0, e.consume(t), o);
		}
		function s(t) {
			return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
		}
		function c(e) {
			return i || r || !a ? n(e) : t(e);
		}
	}
	function Sl(e, t) {
		let n = 0, r = 0;
		return i;
		function i(o) {
			return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(ll, t, a)(o) : o === null || H(o) || Xi(o) ? t(o) : (e.consume(o), i);
		}
		function a(t) {
			return t === 41 && r++, e.consume(t), i;
		}
	}
	function Cl(e, t, n) {
		return r;
		function r(o) {
			return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || H(o) || Xi(o) ? t(o) : n(o);
		}
		function i(e) {
			return e === null || e === 40 || e === 91 || H(e) || Xi(e) ? t(e) : r(e);
		}
		function a(e) {
			return Hi(e) ? o(e) : n(e);
		}
		function o(t) {
			return t === 59 ? (e.consume(t), r) : Hi(t) ? (e.consume(t), o) : n(t);
		}
	}
	function wl(e, t, n) {
		return r;
		function r(t) {
			return e.consume(t), i;
		}
		function i(e) {
			return Ui(e) ? n(e) : t(e);
		}
	}
	function Tl(e) {
		return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || H(e);
	}
	function El(e) {
		return !Hi(e);
	}
	function Dl(e) {
		return !(e === 47 || Ol(e));
	}
	function Ol(e) {
		return e === 43 || e === 45 || e === 46 || e === 95 || Ui(e);
	}
	function kl(e) {
		let t = e.length, n = !1;
		for (; t--;) {
			let r = e[t][1];
			if ((r.type === `labelLink` || r.type === `labelImage`) && !r._balanced) {
				n = !0;
				break;
			}
			if (r._gfmAutolinkLiteralWalkedInto) {
				n = !1;
				break;
			}
		}
		return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
	}
	const Al = {
		name: `attention`,
		resolveAll: jl,
		tokenize: Ml
	};
	function jl(e, t) {
		let n = -1, r, i, a, o, s, c, l, u;
		for (; ++n < e.length;) if (e[n][0] === `enter` && e[n][1].type === `attentionSequence` && e[n][1]._close) {
			for (r = n; r--;) if (e[r][0] === `exit` && e[r][1].type === `attentionSequence` && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
				if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
				c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
				let d = { ...e[r][1].end }, f = { ...e[n][1].start };
				Nl(d, -c), Nl(f, c), o = {
					type: c > 1 ? `strongSequence` : `emphasisSequence`,
					start: d,
					end: { ...e[r][1].end }
				}, s = {
					type: c > 1 ? `strongSequence` : `emphasisSequence`,
					start: { ...e[n][1].start },
					end: f
				}, a = {
					type: c > 1 ? `strongText` : `emphasisText`,
					start: { ...e[r][1].end },
					end: { ...e[n][1].start }
				}, i = {
					type: c > 1 ? `strong` : `emphasis`,
					start: { ...o.start },
					end: { ...s.end }
				}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = pa(l, [[
					`enter`,
					e[r][1],
					t
				], [
					`exit`,
					e[r][1],
					t
				]])), l = pa(l, [
					[
						`enter`,
						i,
						t
					],
					[
						`enter`,
						o,
						t
					],
					[
						`exit`,
						o,
						t
					],
					[
						`enter`,
						a,
						t
					]
				]), l = pa(l, ma(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = pa(l, [
					[
						`exit`,
						a,
						t
					],
					[
						`enter`,
						s,
						t
					],
					[
						`exit`,
						s,
						t
					],
					[
						`exit`,
						i,
						t
					]
				]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = pa(l, [[
					`enter`,
					e[n][1],
					t
				], [
					`exit`,
					e[n][1],
					t
				]])) : u = 0, fa(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === `attentionSequence` && (e[n][1].type = `data`);
		return e;
	}
	function Ml(e, t) {
		let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Gs(r), a;
		return o;
		function o(t) {
			return a = t, e.enter(`attentionSequence`), s(t);
		}
		function s(o) {
			if (o === a) return e.consume(o), s;
			let c = e.exit(`attentionSequence`), l = Gs(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
			return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
		}
	}
	function Nl(e, t) {
		e.column += t, e.offset += t, e._bufferIndex += t;
	}
	const Pl = {
		name: `autolink`,
		tokenize: Fl
	};
	function Fl(e, t, n) {
		let r = 0;
		return i;
		function i(t) {
			return e.enter(`autolink`), e.enter(`autolinkMarker`), e.consume(t), e.exit(`autolinkMarker`), e.enter(`autolinkProtocol`), a;
		}
		function a(t) {
			return Hi(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
		}
		function o(e) {
			return e === 43 || e === 45 || e === 46 || Ui(e) ? (r = 1, s(e)) : l(e);
		}
		function s(t) {
			return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || Ui(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
		}
		function c(r) {
			return r === 62 ? (e.exit(`autolinkProtocol`), e.enter(`autolinkMarker`), e.consume(r), e.exit(`autolinkMarker`), e.exit(`autolink`), t) : r === null || r === 32 || r === 60 || Gi(r) ? n(r) : (e.consume(r), c);
		}
		function l(t) {
			return t === 64 ? (e.consume(t), u) : Wi(t) ? (e.consume(t), l) : n(t);
		}
		function u(e) {
			return Ui(e) ? d(e) : n(e);
		}
		function d(n) {
			return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit(`autolinkProtocol`).type = `autolinkEmail`, e.enter(`autolinkMarker`), e.consume(n), e.exit(`autolinkMarker`), e.exit(`autolink`), t) : f(n);
		}
		function f(t) {
			if ((t === 45 || Ui(t)) && r++ < 63) {
				let n = t === 45 ? f : d;
				return e.consume(t), n;
			}
			return n(t);
		}
	}
	function W(e, t, n, r) {
		let i = r ? r - 1 : 1 / 0, a = 0;
		return o;
		function o(r) {
			return U(r) ? (e.enter(n), s(r)) : t(r);
		}
		function s(r) {
			return U(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
		}
	}
	const Il = {
		partial: !0,
		tokenize: Ll
	};
	function Ll(e, t, n) {
		return r;
		function r(t) {
			return U(t) ? W(e, i, `linePrefix`)(t) : i(t);
		}
		function i(e) {
			return e === null || V(e) ? t(e) : n(e);
		}
	}
	const Rl = {
		continuation: { tokenize: Bl },
		exit: Vl,
		name: `blockQuote`,
		tokenize: zl
	};
	function zl(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			if (t === 62) {
				let n = r.containerState;
				return n.open || (e.enter(`blockQuote`, { _container: !0 }), n.open = !0), e.enter(`blockQuotePrefix`), e.enter(`blockQuoteMarker`), e.consume(t), e.exit(`blockQuoteMarker`), a;
			}
			return n(t);
		}
		function a(n) {
			return U(n) ? (e.enter(`blockQuotePrefixWhitespace`), e.consume(n), e.exit(`blockQuotePrefixWhitespace`), e.exit(`blockQuotePrefix`), t) : (e.exit(`blockQuotePrefix`), t(n));
		}
	}
	function Bl(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return U(t) ? W(e, a, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4)(t) : a(t);
		}
		function a(r) {
			return e.attempt(Rl, t, n)(r);
		}
	}
	function Vl(e) {
		e.exit(`blockQuote`);
	}
	const Hl = {
		name: `characterEscape`,
		tokenize: Ul
	};
	function Ul(e, t, n) {
		return r;
		function r(t) {
			return e.enter(`characterEscape`), e.enter(`escapeMarker`), e.consume(t), e.exit(`escapeMarker`), i;
		}
		function i(r) {
			return Ji(r) ? (e.enter(`characterEscapeValue`), e.consume(r), e.exit(`characterEscapeValue`), e.exit(`characterEscape`), t) : n(r);
		}
	}
	const Wl = {
		name: `characterReference`,
		tokenize: Gl
	};
	function Gl(e, t, n) {
		let r = this, i = 0, a, o;
		return s;
		function s(t) {
			return e.enter(`characterReference`), e.enter(`characterReferenceMarker`), e.consume(t), e.exit(`characterReferenceMarker`), c;
		}
		function c(t) {
			return t === 35 ? (e.enter(`characterReferenceMarkerNumeric`), e.consume(t), e.exit(`characterReferenceMarkerNumeric`), l) : (e.enter(`characterReferenceValue`), a = 31, o = Ui, u(t));
		}
		function l(t) {
			return t === 88 || t === 120 ? (e.enter(`characterReferenceMarkerHexadecimal`), e.consume(t), e.exit(`characterReferenceMarkerHexadecimal`), e.enter(`characterReferenceValue`), a = 6, o = qi, u) : (e.enter(`characterReferenceValue`), a = 7, o = Ki, u(t));
		}
		function u(s) {
			if (s === 59 && i) {
				let i = e.exit(`characterReferenceValue`);
				return o === Ui && !Fc(r.sliceSerialize(i)) ? n(s) : (e.enter(`characterReferenceMarker`), e.consume(s), e.exit(`characterReferenceMarker`), e.exit(`characterReference`), t);
			}
			return o(s) && i++ < a ? (e.consume(s), u) : n(s);
		}
	}
	const Kl = {
		partial: !0,
		tokenize: Yl
	};
	const ql = {
		concrete: !0,
		name: `codeFenced`,
		tokenize: Jl
	};
	function Jl(e, t, n) {
		let r = this, i = {
			partial: !0,
			tokenize: x
		}, a = 0, o = 0, s;
		return c;
		function c(e) {
			return l(e);
		}
		function l(t) {
			let n = r.events[r.events.length - 1];
			return a = n && n[1].type === `linePrefix` ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter(`codeFenced`), e.enter(`codeFencedFence`), e.enter(`codeFencedFenceSequence`), u(t);
		}
		function u(t) {
			return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit(`codeFencedFenceSequence`), U(t) ? W(e, d, `whitespace`)(t) : d(t));
		}
		function d(n) {
			return n === null || V(n) ? (e.exit(`codeFencedFence`), r.interrupt ? t(n) : e.check(Kl, h, b)(n)) : (e.enter(`codeFencedFenceInfo`), e.enter(`chunkString`, { contentType: `string` }), f(n));
		}
		function f(t) {
			return t === null || V(t) ? (e.exit(`chunkString`), e.exit(`codeFencedFenceInfo`), d(t)) : U(t) ? (e.exit(`chunkString`), e.exit(`codeFencedFenceInfo`), W(e, p, `whitespace`)(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
		}
		function p(t) {
			return t === null || V(t) ? d(t) : (e.enter(`codeFencedFenceMeta`), e.enter(`chunkString`, { contentType: `string` }), m(t));
		}
		function m(t) {
			return t === null || V(t) ? (e.exit(`chunkString`), e.exit(`codeFencedFenceMeta`), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
		}
		function h(t) {
			return e.attempt(i, b, g)(t);
		}
		function g(t) {
			return e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), _;
		}
		function _(t) {
			return a > 0 && U(t) ? W(e, v, `linePrefix`, a + 1)(t) : v(t);
		}
		function v(t) {
			return t === null || V(t) ? e.check(Kl, h, b)(t) : (e.enter(`codeFlowValue`), y(t));
		}
		function y(t) {
			return t === null || V(t) ? (e.exit(`codeFlowValue`), v(t)) : (e.consume(t), y);
		}
		function b(n) {
			return e.exit(`codeFenced`), t(n);
		}
		function x(e, t, n) {
			let i = 0;
			return a;
			function a(t) {
				return e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), c;
			}
			function c(t) {
				return e.enter(`codeFencedFence`), U(t) ? W(e, l, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4)(t) : l(t);
			}
			function l(t) {
				return t === s ? (e.enter(`codeFencedFenceSequence`), u(t)) : n(t);
			}
			function u(t) {
				return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit(`codeFencedFenceSequence`), U(t) ? W(e, d, `whitespace`)(t) : d(t)) : n(t);
			}
			function d(r) {
				return r === null || V(r) ? (e.exit(`codeFencedFence`), t(r)) : n(r);
			}
		}
	}
	function Yl(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return t === null ? n(t) : (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), a);
		}
		function a(e) {
			return r.parser.lazy[r.now().line] ? n(e) : t(e);
		}
	}
	const Xl = {
		name: `codeIndented`,
		tokenize: Ql
	};
	const Zl = {
		partial: !0,
		tokenize: $l
	};
	function Ql(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return e.enter(`codeIndented`), W(e, a, `linePrefix`, 5)(t);
		}
		function a(e) {
			let t = r.events[r.events.length - 1];
			return t && t[1].type === `linePrefix` && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
		}
		function o(t) {
			return t === null ? c(t) : V(t) ? e.attempt(Zl, o, c)(t) : (e.enter(`codeFlowValue`), s(t));
		}
		function s(t) {
			return t === null || V(t) ? (e.exit(`codeFlowValue`), o(t)) : (e.consume(t), s);
		}
		function c(n) {
			return e.exit(`codeIndented`), t(n);
		}
	}
	function $l(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return r.parser.lazy[r.now().line] ? n(t) : V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), i) : W(e, a, `linePrefix`, 5)(t);
		}
		function a(e) {
			let a = r.events[r.events.length - 1];
			return a && a[1].type === `linePrefix` && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : V(e) ? i(e) : n(e);
		}
	}
	const eu = {
		name: `codeText`,
		previous: nu,
		resolve: tu,
		tokenize: ru
	};
	function tu(e) {
		let t = e.length - 4, n = 3, r, i;
		if ((e[n][1].type === `lineEnding` || e[n][1].type === `space`) && (e[t][1].type === `lineEnding` || e[t][1].type === `space`)) {
			for (r = n; ++r < t;) if (e[r][1].type === `codeTextData`) {
				e[n][1].type = `codeTextPadding`, e[t][1].type = `codeTextPadding`, n += 2, t -= 2;
				break;
			}
		}
		for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== `lineEnding` && (i = r) : (r === t || e[r][1].type === `lineEnding`) && (e[i][1].type = `codeTextData`, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
		return e;
	}
	function nu(e) {
		return e !== 96 || this.events[this.events.length - 1][1].type === `characterEscape`;
	}
	function ru(e, t, n) {
		let r = 0, i, a;
		return o;
		function o(t) {
			return e.enter(`codeText`), e.enter(`codeTextSequence`), s(t);
		}
		function s(t) {
			return t === 96 ? (e.consume(t), r++, s) : (e.exit(`codeTextSequence`), c(t));
		}
		function c(t) {
			return t === null ? n(t) : t === 32 ? (e.enter(`space`), e.consume(t), e.exit(`space`), c) : t === 96 ? (a = e.enter(`codeTextSequence`), i = 0, u(t)) : V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), c) : (e.enter(`codeTextData`), l(t));
		}
		function l(t) {
			return t === null || t === 32 || t === 96 || V(t) ? (e.exit(`codeTextData`), c(t)) : (e.consume(t), l);
		}
		function u(n) {
			return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit(`codeTextSequence`), e.exit(`codeText`), t(n)) : (a.type = `codeTextData`, l(n));
		}
	}
	var iu = class {
		constructor(e) {
			this.left = e ? [...e] : [], this.right = [];
		}
		get(e) {
			if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
			return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
		}
		get length() {
			return this.left.length + this.right.length;
		}
		shift() {
			return this.setCursor(0), this.right.pop();
		}
		slice(e, t) {
			let n = t == null ? 1 / 0 : t;
			return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
		}
		splice(e, t, n) {
			let r = t || 0;
			this.setCursor(Math.trunc(e));
			let i = this.right.splice(this.right.length - r, 1 / 0);
			return n && au(this.left, n), i.reverse();
		}
		pop() {
			return this.setCursor(1 / 0), this.left.pop();
		}
		push(e) {
			this.setCursor(1 / 0), this.left.push(e);
		}
		pushMany(e) {
			this.setCursor(1 / 0), au(this.left, e);
		}
		unshift(e) {
			this.setCursor(0), this.right.push(e);
		}
		unshiftMany(e) {
			this.setCursor(0), au(this.right, e.reverse());
		}
		setCursor(e) {
			if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) if (e < this.left.length) {
				let t = this.left.splice(e, 1 / 0);
				au(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, 1 / 0);
				au(this.left, t.reverse());
			}
		}
	};
	function au(e, t) {
		let n = 0;
		if (t.length < 1e4) e.push(...t);
		else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
	}
	function ou(e) {
		let t = {}, n = -1, r, i, a, o, s, c, l, u = new iu(e);
		for (; ++n < u.length;) {
			for (; n in t;) n = t[n];
			if (r = u.get(n), n && r[1].type === `chunkFlow` && u.get(n - 1)[1].type === `listItemPrefix` && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === `lineEndingBlank` && (a += 2), a < c.length && c[a][1].type === `content`)) for (; ++a < c.length && c[a][1].type !== `content`;) c[a][1].type === `chunkText` && (c[a][1]._isInFirstContentOfListItem = !0, a++);
			if (r[0] === `enter`) r[1].contentType && (Object.assign(t, su(u, n)), n = t[n], l = !0);
			else if (r[1]._container) {
				for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === `lineEnding` || o[1].type === `lineEndingBlank`) o[0] === `enter` && (i && (u.get(i)[1].type = `lineEndingBlank`), o[1].type = `lineEnding`, i = a);
				else if (!(o[1].type === `linePrefix` || o[1].type === `listItemIndent`)) break;
				i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
			}
		}
		return fa(e, 0, 1 / 0, u.slice(0)), !l;
	}
	function su(e, t) {
		let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
		o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
		let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
		for (; p;) {
			for (; e.get(++i)[1] !== p;);
			a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
		}
		for (p = n; ++f < s.length;) s[f][0] === `exit` && s[f - 1][0] === `enter` && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
		for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
			let t = s.slice(g[f], g[f + 1]), n = a.pop();
			c.push([n, n + t.length - 1]), e.splice(n, 2, t);
		}
		for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
		return l;
	}
	const cu = {
		resolve: uu,
		tokenize: du
	};
	const lu = {
		partial: !0,
		tokenize: fu
	};
	function uu(e) {
		return ou(e), e;
	}
	function du(e, t) {
		let n;
		return r;
		function r(t) {
			return e.enter(`content`), n = e.enter(`chunkContent`, { contentType: `content` }), i(t);
		}
		function i(t) {
			return t === null ? a(t) : V(t) ? e.check(lu, o, a)(t) : (e.consume(t), i);
		}
		function a(n) {
			return e.exit(`chunkContent`), e.exit(`content`), t(n);
		}
		function o(t) {
			return e.consume(t), e.exit(`chunkContent`), n.next = e.enter(`chunkContent`, {
				contentType: `content`,
				previous: n
			}), n = n.next, i;
		}
	}
	function fu(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return e.exit(`chunkContent`), e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), W(e, a, `linePrefix`);
		}
		function a(i) {
			if (i === null || V(i)) return n(i);
			let a = r.events[r.events.length - 1];
			return !r.parser.constructs.disable.null.includes(`codeIndented`) && a && a[1].type === `linePrefix` && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
		}
	}
	function pu(e, t, n, r, i, a, o, s, c) {
		let l = c || 1 / 0, u = 0;
		return d;
		function d(t) {
			return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || Gi(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter(`chunkString`, { contentType: `string` }), h(t));
		}
		function f(n) {
			return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter(`chunkString`, { contentType: `string` }), p(n));
		}
		function p(t) {
			return t === 62 ? (e.exit(`chunkString`), e.exit(s), f(t)) : t === null || t === 60 || V(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
		}
		function m(t) {
			return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
		}
		function h(i) {
			return !u && (i === null || i === 41 || H(i)) ? (e.exit(`chunkString`), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || Gi(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
		}
		function g(t) {
			return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
		}
	}
	function mu(e, t, n, r, i, a) {
		let o = this, s = 0, c;
		return l;
		function l(t) {
			return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
		}
		function u(l) {
			return s > 999 || l === null || l === 91 || l === 93 && !c || l === 94 && !s && `_hiddenFootnoteSupport` in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : V(l) ? (e.enter(`lineEnding`), e.consume(l), e.exit(`lineEnding`), u) : (e.enter(`chunkString`, { contentType: `string` }), d(l));
		}
		function d(t) {
			return t === null || t === 91 || t === 93 || V(t) || s++ > 999 ? (e.exit(`chunkString`), u(t)) : (e.consume(t), c || (c = !U(t)), t === 92 ? f : d);
		}
		function f(t) {
			return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
		}
	}
	function hu(e, t, n, r, i, a) {
		let o;
		return s;
		function s(t) {
			return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
		}
		function c(n) {
			return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
		}
		function l(t) {
			return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), W(e, l, `linePrefix`)) : (e.enter(`chunkString`, { contentType: `string` }), u(t));
		}
		function u(t) {
			return t === o || t === null || V(t) ? (e.exit(`chunkString`), l(t)) : (e.consume(t), t === 92 ? d : u);
		}
		function d(t) {
			return t === o || t === 92 ? (e.consume(t), u) : u(t);
		}
	}
	function gu(e, t) {
		let n;
		return r;
		function r(i) {
			return V(i) ? (e.enter(`lineEnding`), e.consume(i), e.exit(`lineEnding`), n = !0, r) : U(i) ? W(e, r, n ? `linePrefix` : `lineSuffix`)(i) : t(i);
		}
	}
	const _u = {
		name: `definition`,
		tokenize: yu
	};
	const vu = {
		partial: !0,
		tokenize: bu
	};
	function yu(e, t, n) {
		let r = this, i;
		return a;
		function a(t) {
			return e.enter(`definition`), o(t);
		}
		function o(t) {
			return mu.call(r, e, s, n, `definitionLabel`, `definitionLabelMarker`, `definitionLabelString`)(t);
		}
		function s(t) {
			return i = as(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter(`definitionMarker`), e.consume(t), e.exit(`definitionMarker`), c) : n(t);
		}
		function c(t) {
			return H(t) ? gu(e, l)(t) : l(t);
		}
		function l(t) {
			return pu(e, u, n, `definitionDestination`, `definitionDestinationLiteral`, `definitionDestinationLiteralMarker`, `definitionDestinationRaw`, `definitionDestinationString`)(t);
		}
		function u(t) {
			return e.attempt(vu, d, d)(t);
		}
		function d(t) {
			return U(t) ? W(e, f, `whitespace`)(t) : f(t);
		}
		function f(a) {
			return a === null || V(a) ? (e.exit(`definition`), r.parser.defined.push(i), t(a)) : n(a);
		}
	}
	function bu(e, t, n) {
		return r;
		function r(t) {
			return H(t) ? gu(e, i)(t) : n(t);
		}
		function i(t) {
			return hu(e, a, n, `definitionTitle`, `definitionTitleMarker`, `definitionTitleString`)(t);
		}
		function a(t) {
			return U(t) ? W(e, o, `whitespace`)(t) : o(t);
		}
		function o(e) {
			return e === null || V(e) ? t(e) : n(e);
		}
	}
	const xu = {
		name: `hardBreakEscape`,
		tokenize: Su
	};
	function Su(e, t, n) {
		return r;
		function r(t) {
			return e.enter(`hardBreakEscape`), e.consume(t), i;
		}
		function i(r) {
			return V(r) ? (e.exit(`hardBreakEscape`), t(r)) : n(r);
		}
	}
	const Cu = {
		name: `headingAtx`,
		resolve: wu,
		tokenize: Tu
	};
	function wu(e, t) {
		let n = e.length - 2, r = 3, i, a;
		return e[r][1].type === `whitespace` && (r += 2), n - 2 > r && e[n][1].type === `whitespace` && (n -= 2), e[n][1].type === `atxHeadingSequence` && (r === n - 1 || n - 4 > r && e[n - 2][1].type === `whitespace`) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
			type: `atxHeadingText`,
			start: e[r][1].start,
			end: e[n][1].end
		}, a = {
			type: `chunkText`,
			start: e[r][1].start,
			end: e[n][1].end,
			contentType: `text`
		}, fa(e, r, n - r + 1, [
			[
				`enter`,
				i,
				t
			],
			[
				`enter`,
				a,
				t
			],
			[
				`exit`,
				a,
				t
			],
			[
				`exit`,
				i,
				t
			]
		])), e;
	}
	function Tu(e, t, n) {
		let r = 0;
		return i;
		function i(t) {
			return e.enter(`atxHeading`), a(t);
		}
		function a(t) {
			return e.enter(`atxHeadingSequence`), o(t);
		}
		function o(t) {
			return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || H(t) ? (e.exit(`atxHeadingSequence`), s(t)) : n(t);
		}
		function s(n) {
			return n === 35 ? (e.enter(`atxHeadingSequence`), c(n)) : n === null || V(n) ? (e.exit(`atxHeading`), t(n)) : U(n) ? W(e, s, `whitespace`)(n) : (e.enter(`atxHeadingText`), l(n));
		}
		function c(t) {
			return t === 35 ? (e.consume(t), c) : (e.exit(`atxHeadingSequence`), s(t));
		}
		function l(t) {
			return t === null || t === 35 || H(t) ? (e.exit(`atxHeadingText`), s(t)) : (e.consume(t), l);
		}
	}
	const Eu = `address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`);
	const Du = [
		`pre`,
		`script`,
		`style`,
		`textarea`
	];
	const Ou = {
		concrete: !0,
		name: `htmlFlow`,
		resolveTo: ju,
		tokenize: Mu
	};
	const ku = {
		partial: !0,
		tokenize: Pu
	};
	const Au = {
		partial: !0,
		tokenize: Nu
	};
	function ju(e) {
		let t = e.length;
		for (; t-- && !(e[t][0] === `enter` && e[t][1].type === `htmlFlow`););
		return t > 1 && e[t - 2][1].type === `linePrefix` && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
	}
	function Mu(e, t, n) {
		let r = this, i, a, o, s, c;
		return l;
		function l(e) {
			return u(e);
		}
		function u(t) {
			return e.enter(`htmlFlow`), e.enter(`htmlFlowData`), e.consume(t), d;
		}
		function d(s) {
			return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : oe) : Hi(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
		}
		function f(a) {
			return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : Hi(a) ? (e.consume(a), i = 4, r.interrupt ? t : oe) : n(a);
		}
		function p(i) {
			return i === 45 ? (e.consume(i), r.interrupt ? t : oe) : n(i);
		}
		function m(i) {
			return i === `CDATA[`.charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : E : m) : n(i);
		}
		function h(t) {
			return Hi(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
		}
		function g(s) {
			if (s === null || s === 47 || s === 62 || H(s)) {
				let c = s === 47, l = o.toLowerCase();
				return !c && !a && Du.includes(l) ? (i = 1, r.interrupt ? t(s) : E(s)) : Eu.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : E(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
			}
			return s === 45 || Ui(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
		}
		function _(i) {
			return i === 62 ? (e.consume(i), r.interrupt ? t : E) : n(i);
		}
		function v(t) {
			return U(t) ? (e.consume(t), v) : T(t);
		}
		function y(t) {
			return t === 47 ? (e.consume(t), T) : t === 58 || t === 95 || Hi(t) ? (e.consume(t), b) : U(t) ? (e.consume(t), y) : T(t);
		}
		function b(t) {
			return t === 45 || t === 46 || t === 58 || t === 95 || Ui(t) ? (e.consume(t), b) : x(t);
		}
		function x(t) {
			return t === 61 ? (e.consume(t), S) : U(t) ? (e.consume(t), x) : y(t);
		}
		function S(t) {
			return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : U(t) ? (e.consume(t), S) : ee(t);
		}
		function C(t) {
			return t === c ? (e.consume(t), c = null, w) : t === null || V(t) ? n(t) : (e.consume(t), C);
		}
		function ee(t) {
			return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || H(t) ? x(t) : (e.consume(t), ee);
		}
		function w(e) {
			return e === 47 || e === 62 || U(e) ? y(e) : n(e);
		}
		function T(t) {
			return t === 62 ? (e.consume(t), te) : n(t);
		}
		function te(t) {
			return t === null || V(t) ? E(t) : U(t) ? (e.consume(t), te) : n(t);
		}
		function E(t) {
			return t === 45 && i === 2 ? (e.consume(t), ae) : t === 60 && i === 1 ? (e.consume(t), D) : t === 62 && i === 4 ? (e.consume(t), A) : t === 63 && i === 3 ? (e.consume(t), oe) : t === 93 && i === 5 ? (e.consume(t), k) : V(t) && (i === 6 || i === 7) ? (e.exit(`htmlFlowData`), e.check(ku, se, ne)(t)) : t === null || V(t) ? (e.exit(`htmlFlowData`), ne(t)) : (e.consume(t), E);
		}
		function ne(t) {
			return e.check(Au, re, se)(t);
		}
		function re(t) {
			return e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), ie;
		}
		function ie(t) {
			return t === null || V(t) ? ne(t) : (e.enter(`htmlFlowData`), E(t));
		}
		function ae(t) {
			return t === 45 ? (e.consume(t), oe) : E(t);
		}
		function D(t) {
			return t === 47 ? (e.consume(t), o = ``, O) : E(t);
		}
		function O(t) {
			if (t === 62) {
				let n = o.toLowerCase();
				return Du.includes(n) ? (e.consume(t), A) : E(t);
			}
			return Hi(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), O) : E(t);
		}
		function k(t) {
			return t === 93 ? (e.consume(t), oe) : E(t);
		}
		function oe(t) {
			return t === 62 ? (e.consume(t), A) : t === 45 && i === 2 ? (e.consume(t), oe) : E(t);
		}
		function A(t) {
			return t === null || V(t) ? (e.exit(`htmlFlowData`), se(t)) : (e.consume(t), A);
		}
		function se(n) {
			return e.exit(`htmlFlow`), t(n);
		}
	}
	function Nu(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), a) : n(t);
		}
		function a(e) {
			return r.parser.lazy[r.now().line] ? n(e) : t(e);
		}
	}
	function Pu(e, t, n) {
		return r;
		function r(r) {
			return e.enter(`lineEnding`), e.consume(r), e.exit(`lineEnding`), e.attempt(Il, t, n);
		}
	}
	const Fu = {
		name: `htmlText`,
		tokenize: Iu
	};
	function Iu(e, t, n) {
		let r = this, i, a, o;
		return s;
		function s(t) {
			return e.enter(`htmlText`), e.enter(`htmlTextData`), e.consume(t), c;
		}
		function c(t) {
			return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : Hi(t) ? (e.consume(t), ee) : n(t);
		}
		function l(t) {
			return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : Hi(t) ? (e.consume(t), v) : n(t);
		}
		function u(t) {
			return t === 45 ? (e.consume(t), p) : n(t);
		}
		function d(t) {
			return t === null ? n(t) : t === 45 ? (e.consume(t), f) : V(t) ? (o = d, D(t)) : (e.consume(t), d);
		}
		function f(t) {
			return t === 45 ? (e.consume(t), p) : d(t);
		}
		function p(e) {
			return e === 62 ? ae(e) : e === 45 ? f(e) : d(e);
		}
		function m(t) {
			return t === `CDATA[`.charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
		}
		function h(t) {
			return t === null ? n(t) : t === 93 ? (e.consume(t), g) : V(t) ? (o = h, D(t)) : (e.consume(t), h);
		}
		function g(t) {
			return t === 93 ? (e.consume(t), _) : h(t);
		}
		function _(t) {
			return t === 62 ? ae(t) : t === 93 ? (e.consume(t), _) : h(t);
		}
		function v(t) {
			return t === null || t === 62 ? ae(t) : V(t) ? (o = v, D(t)) : (e.consume(t), v);
		}
		function y(t) {
			return t === null ? n(t) : t === 63 ? (e.consume(t), b) : V(t) ? (o = y, D(t)) : (e.consume(t), y);
		}
		function b(e) {
			return e === 62 ? ae(e) : y(e);
		}
		function x(t) {
			return Hi(t) ? (e.consume(t), S) : n(t);
		}
		function S(t) {
			return t === 45 || Ui(t) ? (e.consume(t), S) : C(t);
		}
		function C(t) {
			return V(t) ? (o = C, D(t)) : U(t) ? (e.consume(t), C) : ae(t);
		}
		function ee(t) {
			return t === 45 || Ui(t) ? (e.consume(t), ee) : t === 47 || t === 62 || H(t) ? w(t) : n(t);
		}
		function w(t) {
			return t === 47 ? (e.consume(t), ae) : t === 58 || t === 95 || Hi(t) ? (e.consume(t), T) : V(t) ? (o = w, D(t)) : U(t) ? (e.consume(t), w) : ae(t);
		}
		function T(t) {
			return t === 45 || t === 46 || t === 58 || t === 95 || Ui(t) ? (e.consume(t), T) : te(t);
		}
		function te(t) {
			return t === 61 ? (e.consume(t), E) : V(t) ? (o = te, D(t)) : U(t) ? (e.consume(t), te) : w(t);
		}
		function E(t) {
			return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, ne) : V(t) ? (o = E, D(t)) : U(t) ? (e.consume(t), E) : (e.consume(t), re);
		}
		function ne(t) {
			return t === i ? (e.consume(t), i = void 0, ie) : t === null ? n(t) : V(t) ? (o = ne, D(t)) : (e.consume(t), ne);
		}
		function re(t) {
			return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || H(t) ? w(t) : (e.consume(t), re);
		}
		function ie(e) {
			return e === 47 || e === 62 || H(e) ? w(e) : n(e);
		}
		function ae(r) {
			return r === 62 ? (e.consume(r), e.exit(`htmlTextData`), e.exit(`htmlText`), t) : n(r);
		}
		function D(t) {
			return e.exit(`htmlTextData`), e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), O;
		}
		function O(t) {
			return U(t) ? W(e, k, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4)(t) : k(t);
		}
		function k(t) {
			return e.enter(`htmlTextData`), o(t);
		}
	}
	const Lu = {
		name: `labelEnd`,
		resolveAll: Vu,
		resolveTo: Hu,
		tokenize: Uu
	};
	const Ru = { tokenize: Wu };
	const zu = { tokenize: Gu };
	const Bu = { tokenize: Ku };
	function Vu(e) {
		let t = -1, n = [];
		for (; ++t < e.length;) {
			let r = e[t][1];
			if (n.push(e[t]), r.type === `labelImage` || r.type === `labelLink` || r.type === `labelEnd`) {
				let e = r.type === `labelImage` ? 4 : 2;
				r.type = `data`, t += e;
			}
		}
		return e.length !== n.length && fa(e, 0, e.length, n), e;
	}
	function Hu(e, t) {
		let n = e.length, r = 0, i, a, o, s;
		for (; n--;) if (i = e[n][1], a) {
			if (i.type === `link` || i.type === `labelLink` && i._inactive) break;
			e[n][0] === `enter` && i.type === `labelLink` && (i._inactive = !0);
		} else if (o) {
			if (e[n][0] === `enter` && (i.type === `labelImage` || i.type === `labelLink`) && !i._balanced && (a = n, i.type !== `labelLink`)) {
				r = 2;
				break;
			}
		} else i.type === `labelEnd` && (o = n);
		let c = {
			type: e[a][1].type === `labelLink` ? `link` : `image`,
			start: { ...e[a][1].start },
			end: { ...e[e.length - 1][1].end }
		}, l = {
			type: `label`,
			start: { ...e[a][1].start },
			end: { ...e[o][1].end }
		}, u = {
			type: `labelText`,
			start: { ...e[a + r + 2][1].end },
			end: { ...e[o - 2][1].start }
		};
		return s = [[
			`enter`,
			c,
			t
		], [
			`enter`,
			l,
			t
		]], s = pa(s, e.slice(a + 1, a + r + 3)), s = pa(s, [[
			`enter`,
			u,
			t
		]]), s = pa(s, ma(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = pa(s, [
			[
				`exit`,
				u,
				t
			],
			e[o - 2],
			e[o - 1],
			[
				`exit`,
				l,
				t
			]
		]), s = pa(s, e.slice(o + 1)), s = pa(s, [[
			`exit`,
			c,
			t
		]]), fa(e, a, e.length, s), e;
	}
	function Uu(e, t, n) {
		let r = this, i = r.events.length, a, o;
		for (; i--;) if ((r.events[i][1].type === `labelImage` || r.events[i][1].type === `labelLink`) && !r.events[i][1]._balanced) {
			a = r.events[i][1];
			break;
		}
		return s;
		function s(t) {
			return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(as(r.sliceSerialize({
				start: a.end,
				end: r.now()
			}))), e.enter(`labelEnd`), e.enter(`labelMarker`), e.consume(t), e.exit(`labelMarker`), e.exit(`labelEnd`), c) : n(t);
		}
		function c(t) {
			return t === 40 ? e.attempt(Ru, u, o ? u : d)(t) : t === 91 ? e.attempt(zu, u, o ? l : d)(t) : o ? u(t) : d(t);
		}
		function l(t) {
			return e.attempt(Bu, u, d)(t);
		}
		function u(e) {
			return t(e);
		}
		function d(e) {
			return a._balanced = !0, n(e);
		}
	}
	function Wu(e, t, n) {
		return r;
		function r(t) {
			return e.enter(`resource`), e.enter(`resourceMarker`), e.consume(t), e.exit(`resourceMarker`), i;
		}
		function i(t) {
			return H(t) ? gu(e, a)(t) : a(t);
		}
		function a(t) {
			return t === 41 ? u(t) : pu(e, o, s, `resourceDestination`, `resourceDestinationLiteral`, `resourceDestinationLiteralMarker`, `resourceDestinationRaw`, `resourceDestinationString`, 32)(t);
		}
		function o(t) {
			return H(t) ? gu(e, c)(t) : u(t);
		}
		function s(e) {
			return n(e);
		}
		function c(t) {
			return t === 34 || t === 39 || t === 40 ? hu(e, l, n, `resourceTitle`, `resourceTitleMarker`, `resourceTitleString`)(t) : u(t);
		}
		function l(t) {
			return H(t) ? gu(e, u)(t) : u(t);
		}
		function u(r) {
			return r === 41 ? (e.enter(`resourceMarker`), e.consume(r), e.exit(`resourceMarker`), e.exit(`resource`), t) : n(r);
		}
	}
	function Gu(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return mu.call(r, e, a, o, `reference`, `referenceMarker`, `referenceString`)(t);
		}
		function a(e) {
			return r.parser.defined.includes(as(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
		}
		function o(e) {
			return n(e);
		}
	}
	function Ku(e, t, n) {
		return r;
		function r(t) {
			return e.enter(`reference`), e.enter(`referenceMarker`), e.consume(t), e.exit(`referenceMarker`), i;
		}
		function i(r) {
			return r === 93 ? (e.enter(`referenceMarker`), e.consume(r), e.exit(`referenceMarker`), e.exit(`reference`), t) : n(r);
		}
	}
	const qu = {
		name: `labelStartImage`,
		resolveAll: Lu.resolveAll,
		tokenize: Ju
	};
	function Ju(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return e.enter(`labelImage`), e.enter(`labelImageMarker`), e.consume(t), e.exit(`labelImageMarker`), a;
		}
		function a(t) {
			return t === 91 ? (e.enter(`labelMarker`), e.consume(t), e.exit(`labelMarker`), e.exit(`labelImage`), o) : n(t);
		}
		function o(e) {
			return e === 94 && `_hiddenFootnoteSupport` in r.parser.constructs ? n(e) : t(e);
		}
	}
	const Yu = {
		name: `labelStartLink`,
		resolveAll: Lu.resolveAll,
		tokenize: Xu
	};
	function Xu(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return e.enter(`labelLink`), e.enter(`labelMarker`), e.consume(t), e.exit(`labelMarker`), e.exit(`labelLink`), a;
		}
		function a(e) {
			return e === 94 && `_hiddenFootnoteSupport` in r.parser.constructs ? n(e) : t(e);
		}
	}
	const Zu = {
		name: `lineEnding`,
		tokenize: Qu
	};
	function Qu(e, t) {
		return n;
		function n(n) {
			return e.enter(`lineEnding`), e.consume(n), e.exit(`lineEnding`), W(e, t, `linePrefix`);
		}
	}
	const $u = {
		name: `thematicBreak`,
		tokenize: ed
	};
	function ed(e, t, n) {
		let r = 0, i;
		return a;
		function a(t) {
			return e.enter(`thematicBreak`), o(t);
		}
		function o(e) {
			return i = e, s(e);
		}
		function s(a) {
			return a === i ? (e.enter(`thematicBreakSequence`), c(a)) : r >= 3 && (a === null || V(a)) ? (e.exit(`thematicBreak`), t(a)) : n(a);
		}
		function c(t) {
			return t === i ? (e.consume(t), r++, c) : (e.exit(`thematicBreakSequence`), U(t) ? W(e, s, `whitespace`)(t) : s(t));
		}
	}
	const td = {
		continuation: { tokenize: ad },
		exit: sd,
		name: `list`,
		tokenize: id
	};
	const nd = {
		partial: !0,
		tokenize: cd
	};
	const rd = {
		partial: !0,
		tokenize: od
	};
	function id(e, t, n) {
		let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === `linePrefix` ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
		return s;
		function s(t) {
			let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? `listUnordered` : `listOrdered`);
			if (i === `listUnordered` ? !r.containerState.marker || t === r.containerState.marker : Ki(t)) {
				if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === `listUnordered`) return e.enter(`listItemPrefix`), t === 42 || t === 45 ? e.check($u, n, l)(t) : l(t);
				if (!r.interrupt || t === 49) return e.enter(`listItemPrefix`), e.enter(`listItemValue`), c(t);
			}
			return n(t);
		}
		function c(t) {
			return Ki(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit(`listItemValue`), l(t)) : n(t);
		}
		function l(t) {
			return e.enter(`listItemMarker`), e.consume(t), e.exit(`listItemMarker`), r.containerState.marker = r.containerState.marker || t, e.check(Il, r.interrupt ? n : u, e.attempt(nd, f, d));
		}
		function u(e) {
			return r.containerState.initialBlankLine = !0, a++, f(e);
		}
		function d(t) {
			return U(t) ? (e.enter(`listItemPrefixWhitespace`), e.consume(t), e.exit(`listItemPrefixWhitespace`), f) : n(t);
		}
		function f(n) {
			return r.containerState.size = a + r.sliceSerialize(e.exit(`listItemPrefix`), !0).length, t(n);
		}
	}
	function ad(e, t, n) {
		let r = this;
		return r.containerState._closeFlow = void 0, e.check(Il, i, a);
		function i(n) {
			return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, W(e, t, `listItemIndent`, r.containerState.size + 1)(n);
		}
		function a(n) {
			return r.containerState.furtherBlankLines || !U(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(rd, t, o)(n));
		}
		function o(i) {
			return r.containerState._closeFlow = !0, r.interrupt = void 0, W(e, e.attempt(td, t, n), `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4)(i);
		}
	}
	function od(e, t, n) {
		let r = this;
		return W(e, i, `listItemIndent`, r.containerState.size + 1);
		function i(e) {
			let i = r.events[r.events.length - 1];
			return i && i[1].type === `listItemIndent` && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
		}
	}
	function sd(e) {
		e.exit(this.containerState.type);
	}
	function cd(e, t, n) {
		let r = this;
		return W(e, i, `listItemPrefixWhitespace`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 5);
		function i(e) {
			let i = r.events[r.events.length - 1];
			return !U(e) && i && i[1].type === `listItemPrefixWhitespace` ? t(e) : n(e);
		}
	}
	const ld = {
		name: `setextUnderline`,
		resolveTo: ud,
		tokenize: dd
	};
	function ud(e, t) {
		let n = e.length, r, i, a;
		for (; n--;) if (e[n][0] === `enter`) {
			if (e[n][1].type === `content`) {
				r = n;
				break;
			}
			e[n][1].type === `paragraph` && (i = n);
		} else e[n][1].type === `content` && e.splice(n, 1), !a && e[n][1].type === `definition` && (a = n);
		let o = {
			type: `setextHeading`,
			start: { ...e[r][1].start },
			end: { ...e[e.length - 1][1].end }
		};
		return e[i][1].type = `setextHeadingText`, a ? (e.splice(i, 0, [
			`enter`,
			o,
			t
		]), e.splice(a + 1, 0, [
			`exit`,
			e[r][1],
			t
		]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
			`exit`,
			o,
			t
		]), e;
	}
	function dd(e, t, n) {
		let r = this, i;
		return a;
		function a(t) {
			let a = r.events.length, s;
			for (; a--;) if (r.events[a][1].type !== `lineEnding` && r.events[a][1].type !== `linePrefix` && r.events[a][1].type !== `content`) {
				s = r.events[a][1].type === `paragraph`;
				break;
			}
			return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter(`setextHeadingLine`), i = t, o(t)) : n(t);
		}
		function o(t) {
			return e.enter(`setextHeadingLineSequence`), s(t);
		}
		function s(t) {
			return t === i ? (e.consume(t), s) : (e.exit(`setextHeadingLineSequence`), U(t) ? W(e, c, `lineSuffix`)(t) : c(t));
		}
		function c(r) {
			return r === null || V(r) ? (e.exit(`setextHeadingLine`), t(r)) : n(r);
		}
	}
	const fd = {
		tokenize: bd,
		partial: !0
	};
	function pd() {
		return {
			document: { 91: {
				name: `gfmFootnoteDefinition`,
				tokenize: _d,
				continuation: { tokenize: vd },
				exit: yd
			} },
			text: {
				91: {
					name: `gfmFootnoteCall`,
					tokenize: gd
				},
				93: {
					name: `gfmPotentialFootnoteCall`,
					add: `after`,
					tokenize: md,
					resolveTo: hd
				}
			}
		};
	}
	function md(e, t, n) {
		let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
		for (; i--;) {
			let e = r.events[i][1];
			if (e.type === `labelImage`) {
				o = e;
				break;
			}
			if (e.type === `gfmFootnoteCall` || e.type === `labelLink` || e.type === `label` || e.type === `image` || e.type === `link`) break;
		}
		return s;
		function s(i) {
			if (!o || !o._balanced) return n(i);
			let s = as(r.sliceSerialize({
				start: o.end,
				end: r.now()
			}));
			return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter(`gfmFootnoteCallLabelMarker`), e.consume(i), e.exit(`gfmFootnoteCallLabelMarker`), t(i));
		}
	}
	function hd(e, t) {
		let n = e.length;
		for (; n--;) if (e[n][1].type === `labelImage` && e[n][0] === `enter`) {
			e[n][1];
			break;
		}
		e[n + 1][1].type = `data`, e[n + 3][1].type = `gfmFootnoteCallLabelMarker`;
		let r = {
			type: `gfmFootnoteCall`,
			start: Object.assign({}, e[n + 3][1].start),
			end: Object.assign({}, e[e.length - 1][1].end)
		}, i = {
			type: `gfmFootnoteCallMarker`,
			start: Object.assign({}, e[n + 3][1].end),
			end: Object.assign({}, e[n + 3][1].end)
		};
		i.end.column++, i.end.offset++, i.end._bufferIndex++;
		let a = {
			type: `gfmFootnoteCallString`,
			start: Object.assign({}, i.end),
			end: Object.assign({}, e[e.length - 1][1].start)
		}, o = {
			type: `chunkString`,
			contentType: `string`,
			start: Object.assign({}, a.start),
			end: Object.assign({}, a.end)
		}, s = [
			e[n + 1],
			e[n + 2],
			[
				`enter`,
				r,
				t
			],
			e[n + 3],
			e[n + 4],
			[
				`enter`,
				i,
				t
			],
			[
				`exit`,
				i,
				t
			],
			[
				`enter`,
				a,
				t
			],
			[
				`enter`,
				o,
				t
			],
			[
				`exit`,
				o,
				t
			],
			[
				`exit`,
				a,
				t
			],
			e[e.length - 2],
			e[e.length - 1],
			[
				`exit`,
				r,
				t
			]
		];
		return e.splice(n, e.length - n + 1, ...s), e;
	}
	function gd(e, t, n) {
		let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
		return s;
		function s(t) {
			return e.enter(`gfmFootnoteCall`), e.enter(`gfmFootnoteCallLabelMarker`), e.consume(t), e.exit(`gfmFootnoteCallLabelMarker`), c;
		}
		function c(t) {
			return t === 94 ? (e.enter(`gfmFootnoteCallMarker`), e.consume(t), e.exit(`gfmFootnoteCallMarker`), e.enter(`gfmFootnoteCallString`), e.enter(`chunkString`).contentType = `string`, l) : n(t);
		}
		function l(s) {
			if (a > 999 || s === 93 && !o || s === null || s === 91 || H(s)) return n(s);
			if (s === 93) {
				e.exit(`chunkString`);
				let a = e.exit(`gfmFootnoteCallString`);
				return i.includes(as(r.sliceSerialize(a))) ? (e.enter(`gfmFootnoteCallLabelMarker`), e.consume(s), e.exit(`gfmFootnoteCallLabelMarker`), e.exit(`gfmFootnoteCall`), t) : n(s);
			}
			return H(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
		}
		function u(t) {
			return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
		}
	}
	function _d(e, t, n) {
		let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
		return c;
		function c(t) {
			return e.enter(`gfmFootnoteDefinition`)._container = !0, e.enter(`gfmFootnoteDefinitionLabel`), e.enter(`gfmFootnoteDefinitionLabelMarker`), e.consume(t), e.exit(`gfmFootnoteDefinitionLabelMarker`), l;
		}
		function l(t) {
			return t === 94 ? (e.enter(`gfmFootnoteDefinitionMarker`), e.consume(t), e.exit(`gfmFootnoteDefinitionMarker`), e.enter(`gfmFootnoteDefinitionLabelString`), e.enter(`chunkString`).contentType = `string`, u) : n(t);
		}
		function u(t) {
			if (o > 999 || t === 93 && !s || t === null || t === 91 || H(t)) return n(t);
			if (t === 93) {
				e.exit(`chunkString`);
				let n = e.exit(`gfmFootnoteDefinitionLabelString`);
				return a = as(r.sliceSerialize(n)), e.enter(`gfmFootnoteDefinitionLabelMarker`), e.consume(t), e.exit(`gfmFootnoteDefinitionLabelMarker`), e.exit(`gfmFootnoteDefinitionLabel`), f;
			}
			return H(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
		}
		function d(t) {
			return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
		}
		function f(t) {
			return t === 58 ? (e.enter(`definitionMarker`), e.consume(t), e.exit(`definitionMarker`), i.includes(a) || i.push(a), W(e, p, `gfmFootnoteDefinitionWhitespace`)) : n(t);
		}
		function p(e) {
			return t(e);
		}
	}
	function vd(e, t, n) {
		return e.check(Il, t, e.attempt(fd, t, n));
	}
	function yd(e) {
		e.exit(`gfmFootnoteDefinition`);
	}
	function bd(e, t, n) {
		let r = this;
		return W(e, i, `gfmFootnoteDefinitionIndent`, 5);
		function i(e) {
			let i = r.events[r.events.length - 1];
			return i && i[1].type === `gfmFootnoteDefinitionIndent` && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
		}
	}
	function xd(e) {
		let t = (e || {}).singleTilde, n = {
			name: `strikethrough`,
			tokenize: i,
			resolveAll: r
		};
		return t ??= !0, {
			text: { 126: n },
			insideSpan: { null: [n] },
			attentionMarkers: { null: [126] }
		};
		function r(e, t) {
			let n = -1;
			for (; ++n < e.length;) if (e[n][0] === `enter` && e[n][1].type === `strikethroughSequenceTemporary` && e[n][1]._close) {
				let r = n;
				for (; r--;) if (e[r][0] === `exit` && e[r][1].type === `strikethroughSequenceTemporary` && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
					e[n][1].type = `strikethroughSequence`, e[r][1].type = `strikethroughSequence`;
					let i = {
						type: `strikethrough`,
						start: Object.assign({}, e[r][1].start),
						end: Object.assign({}, e[n][1].end)
					}, a = {
						type: `strikethroughText`,
						start: Object.assign({}, e[r][1].end),
						end: Object.assign({}, e[n][1].start)
					}, o = [
						[
							`enter`,
							i,
							t
						],
						[
							`enter`,
							e[r][1],
							t
						],
						[
							`exit`,
							e[r][1],
							t
						],
						[
							`enter`,
							a,
							t
						]
					], s = t.parser.constructs.insideSpan.null;
					s && fa(o, o.length, 0, ma(s, e.slice(r + 1, n), t)), fa(o, o.length, 0, [
						[
							`exit`,
							a,
							t
						],
						[
							`enter`,
							e[n][1],
							t
						],
						[
							`exit`,
							e[n][1],
							t
						],
						[
							`exit`,
							i,
							t
						]
					]), fa(e, r - 1, n - r + 3, o), n = r + o.length - 2;
					break;
				}
			}
			for (n = -1; ++n < e.length;) e[n][1].type === `strikethroughSequenceTemporary` && (e[n][1].type = `data`);
			return e;
		}
		function i(e, n, r) {
			let i = this.previous, a = this.events, o = 0;
			return s;
			function s(t) {
				return i === 126 && a[a.length - 1][1].type !== `characterEscape` ? r(t) : (e.enter(`strikethroughSequenceTemporary`), c(t));
			}
			function c(a) {
				let s = Gs(i);
				if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
				if (o < 2 && !t) return r(a);
				let l = e.exit(`strikethroughSequenceTemporary`), u = Gs(a);
				return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
			}
		}
	}
	var Sd = class {
		constructor() {
			this.map = [];
		}
		add(e, t, n) {
			Cd(this, e, t, n);
		}
		consume(e) {
			if (this.map.sort(function(e, t) {
				return e[0] - t[0];
			}), this.map.length === 0) return;
			let t = this.map.length, n = [];
			for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
			n.push(e.slice()), e.length = 0;
			let r = n.pop();
			for (; r;) {
				for (let t of r) e.push(t);
				r = n.pop();
			}
			this.map.length = 0;
		}
	};
	function Cd(e, t, n, r) {
		let i = 0;
		if (!(n === 0 && r.length === 0)) {
			for (; i < e.map.length;) {
				if (e.map[i][0] === t) {
					e.map[i][1] += n, e.map[i][2].push(...r);
					return;
				}
				i += 1;
			}
			e.map.push([
				t,
				n,
				r
			]);
		}
	}
	function wd(e, t) {
		let n = !1, r = [];
		for (; t < e.length;) {
			let i = e[t];
			if (n) {
				if (i[0] === `enter`) i[1].type === `tableContent` && r.push(e[t + 1][1].type === `tableDelimiterMarker` ? `left` : `none`);
				else if (i[1].type === `tableContent`) {
					if (e[t - 1][1].type === `tableDelimiterMarker`) {
						let e = r.length - 1;
						r[e] = r[e] === `left` ? `center` : `right`;
					}
				} else if (i[1].type === `tableDelimiterRow`) break;
			} else i[0] === `enter` && i[1].type === `tableDelimiterRow` && (n = !0);
			t += 1;
		}
		return r;
	}
	function Td() {
		return { flow: { null: {
			name: `table`,
			tokenize: Ed,
			resolveAll: Dd
		} } };
	}
	function Ed(e, t, n) {
		let r = this, i = 0, a = 0, o;
		return s;
		function s(e) {
			let t = r.events.length - 1;
			for (; t > -1;) {
				let e = r.events[t][1].type;
				if (e === `lineEnding` || e === `linePrefix`) t--;
				else break;
			}
			let i = t > -1 ? r.events[t][1].type : null, a = i === `tableHead` || i === `tableRow` ? S : c;
			return a === S && r.parser.lazy[r.now().line] ? n(e) : a(e);
		}
		function c(t) {
			return e.enter(`tableHead`), e.enter(`tableRow`), l(t);
		}
		function l(e) {
			return e === 124 ? u(e) : (o = !0, a += 1, u(e));
		}
		function u(t) {
			return t === null ? n(t) : V(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit(`tableRow`), e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), p) : n(t) : U(t) ? W(e, u, `whitespace`)(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter(`tableCellDivider`), e.consume(t), e.exit(`tableCellDivider`), o = !0, u) : (e.enter(`data`), d(t)));
		}
		function d(t) {
			return t === null || t === 124 || H(t) ? (e.exit(`data`), u(t)) : (e.consume(t), t === 92 ? f : d);
		}
		function f(t) {
			return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
		}
		function p(t) {
			return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter(`tableDelimiterRow`), o = !1, U(t) ? W(e, m, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4)(t) : m(t));
		}
		function m(t) {
			return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter(`tableCellDivider`), e.consume(t), e.exit(`tableCellDivider`), h) : x(t);
		}
		function h(t) {
			return U(t) ? W(e, g, `whitespace`)(t) : g(t);
		}
		function g(t) {
			return t === 58 ? (a += 1, o = !0, e.enter(`tableDelimiterMarker`), e.consume(t), e.exit(`tableDelimiterMarker`), _) : t === 45 ? (a += 1, _(t)) : t === null || V(t) ? b(t) : x(t);
		}
		function _(t) {
			return t === 45 ? (e.enter(`tableDelimiterFiller`), v(t)) : x(t);
		}
		function v(t) {
			return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit(`tableDelimiterFiller`), e.enter(`tableDelimiterMarker`), e.consume(t), e.exit(`tableDelimiterMarker`), y) : (e.exit(`tableDelimiterFiller`), y(t));
		}
		function y(t) {
			return U(t) ? W(e, b, `whitespace`)(t) : b(t);
		}
		function b(n) {
			return n === 124 ? m(n) : n === null || V(n) ? !o || i !== a ? x(n) : (e.exit(`tableDelimiterRow`), e.exit(`tableHead`), t(n)) : x(n);
		}
		function x(e) {
			return n(e);
		}
		function S(t) {
			return e.enter(`tableRow`), C(t);
		}
		function C(n) {
			return n === 124 ? (e.enter(`tableCellDivider`), e.consume(n), e.exit(`tableCellDivider`), C) : n === null || V(n) ? (e.exit(`tableRow`), t(n)) : U(n) ? W(e, C, `whitespace`)(n) : (e.enter(`data`), ee(n));
		}
		function ee(t) {
			return t === null || t === 124 || H(t) ? (e.exit(`data`), C(t)) : (e.consume(t), t === 92 ? w : ee);
		}
		function w(t) {
			return t === 92 || t === 124 ? (e.consume(t), ee) : ee(t);
		}
	}
	function Dd(e, t) {
		let n = -1, r = !0, i = 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			0,
			0,
			0
		], s = !1, c = 0, l, u, d, f = new Sd();
		for (; ++n < e.length;) {
			let p = e[n], m = p[1];
			p[0] === `enter` ? m.type === `tableHead` ? (s = !1, c !== 0 && (kd(f, t, c, l, u), u = void 0, c = 0), l = {
				type: `table`,
				start: Object.assign({}, m.start),
				end: Object.assign({}, m.end)
			}, f.add(n, 0, [[
				`enter`,
				l,
				t
			]])) : m.type === `tableRow` || m.type === `tableDelimiterRow` ? (r = !0, d = void 0, a = [
				0,
				0,
				0,
				0
			], o = [
				0,
				n + 1,
				0,
				0
			], s && (s = !1, u = {
				type: `tableBody`,
				start: Object.assign({}, m.start),
				end: Object.assign({}, m.end)
			}, f.add(n, 0, [[
				`enter`,
				u,
				t
			]])), i = m.type === `tableDelimiterRow` ? 2 : u ? 3 : 1) : i && (m.type === `data` || m.type === `tableDelimiterMarker` || m.type === `tableDelimiterFiller`) ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = Od(f, t, a, i, void 0, d), a = [
				0,
				0,
				0,
				0
			]), o[2] = n)) : m.type === `tableCellDivider` && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = Od(f, t, a, i, void 0, d)), a = o, o = [
				a[1],
				n,
				0,
				0
			])) : m.type === `tableHead` ? (s = !0, c = n) : m.type === `tableRow` || m.type === `tableDelimiterRow` ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = Od(f, t, o, i, n, d)) : (o[0] = o[1], d = Od(f, t, a, i, n, d)), i = 0) : i && (m.type === `data` || m.type === `tableDelimiterMarker` || m.type === `tableDelimiterFiller`) && (o[3] = n);
		}
		for (c !== 0 && kd(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
			let e = t.events[n];
			e[0] === `enter` && e[1].type === `table` && (e[1]._align = wd(t.events, n));
		}
		return e;
	}
	function Od(e, t, n, r, i, a) {
		let o = r === 1 ? `tableHeader` : r === 2 ? `tableDelimiter` : `tableData`;
		n[0] !== 0 && (a.end = Object.assign({}, Ad(t.events, n[0])), e.add(n[0], 0, [[
			`exit`,
			a,
			t
		]]));
		let s = Ad(t.events, n[1]);
		if (a = {
			type: o,
			start: Object.assign({}, s),
			end: Object.assign({}, s)
		}, e.add(n[1], 0, [[
			`enter`,
			a,
			t
		]]), n[2] !== 0) {
			let i = Ad(t.events, n[2]), a = Ad(t.events, n[3]), o = {
				type: `tableContent`,
				start: Object.assign({}, i),
				end: Object.assign({}, a)
			};
			if (e.add(n[2], 0, [[
				`enter`,
				o,
				t
			]]), r !== 2) {
				let r = t.events[n[2]], i = t.events[n[3]];
				if (r[1].end = Object.assign({}, i[1].end), r[1].type = `chunkText`, r[1].contentType = `text`, n[3] > n[2] + 1) {
					let t = n[2] + 1, r = n[3] - n[2] - 1;
					e.add(t, r, []);
				}
			}
			e.add(n[3] + 1, 0, [[
				`exit`,
				o,
				t
			]]);
		}
		return i !== void 0 && (a.end = Object.assign({}, Ad(t.events, i)), e.add(i, 0, [[
			`exit`,
			a,
			t
		]]), a = void 0), a;
	}
	function kd(e, t, n, r, i) {
		let a = [], o = Ad(t.events, n);
		i && (i.end = Object.assign({}, o), a.push([
			`exit`,
			i,
			t
		])), r.end = Object.assign({}, o), a.push([
			`exit`,
			r,
			t
		]), e.add(n + 1, 0, a);
	}
	function Ad(e, t) {
		let n = e[t], r = n[0] === `enter` ? `start` : `end`;
		return n[1][r];
	}
	const jd = {
		name: `tasklistCheck`,
		tokenize: Nd
	};
	function Md() {
		return { text: { 91: jd } };
	}
	function Nd(e, t, n) {
		let r = this;
		return i;
		function i(t) {
			return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter(`taskListCheck`), e.enter(`taskListCheckMarker`), e.consume(t), e.exit(`taskListCheckMarker`), a);
		}
		function a(t) {
			return H(t) ? (e.enter(`taskListCheckValueUnchecked`), e.consume(t), e.exit(`taskListCheckValueUnchecked`), o) : t === 88 || t === 120 ? (e.enter(`taskListCheckValueChecked`), e.consume(t), e.exit(`taskListCheckValueChecked`), o) : n(t);
		}
		function o(t) {
			return t === 93 ? (e.enter(`taskListCheckMarker`), e.consume(t), e.exit(`taskListCheckMarker`), e.exit(`taskListCheck`), s) : n(t);
		}
		function s(r) {
			return V(r) ? t(r) : U(r) ? e.check({ tokenize: Pd }, t, n)(r) : n(r);
		}
	}
	function Pd(e, t, n) {
		return W(e, r, `whitespace`);
		function r(e) {
			return e === null ? n(e) : t(e);
		}
	}
	function Fd(e) {
		return rl([
			hl(),
			pd(),
			xd(e),
			Td(),
			Md()
		]);
	}
	const Id = {};
	function Ld(e) {
		let t = this, n = e || Id, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
		i.push(Fd(n)), a.push(el()), o.push(tl(n));
	}
	function Rd() {
		return {
			enter: {
				mathFlow: e,
				mathFlowFenceMeta: t,
				mathText: a
			},
			exit: {
				mathFlow: i,
				mathFlowFence: r,
				mathFlowFenceMeta: n,
				mathFlowValue: s,
				mathText: o,
				mathTextData: s
			}
		};
		function e(e) {
			this.enter({
				type: `math`,
				meta: null,
				value: ``,
				data: {
					hName: `pre`,
					hChildren: [{
						type: `element`,
						tagName: `code`,
						properties: { className: [`language-math`, `math-display`] },
						children: []
					}]
				}
			}, e);
		}
		function t() {
			this.buffer();
		}
		function n() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.type, t.meta = e;
		}
		function r() {
			this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
		}
		function i(e) {
			let t = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ``), n = this.stack[this.stack.length - 1];
			n.type, this.exit(e), n.value = t;
			let r = n.data.hChildren[0];
			r.type, r.tagName, r.children.push({
				type: `text`,
				value: t
			}), this.data.mathFlowInside = void 0;
		}
		function a(e) {
			this.enter({
				type: `inlineMath`,
				value: ``,
				data: {
					hName: `code`,
					hProperties: { className: [`language-math`, `math-inline`] },
					hChildren: []
				}
			}, e), this.buffer();
		}
		function o(e) {
			let t = this.resume(), n = this.stack[this.stack.length - 1];
			n.type, this.exit(e), n.value = t, n.data.hChildren.push({
				type: `text`,
				value: t
			});
		}
		function s(e) {
			this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
		}
	}
	function zd(e) {
		let t = (e || {}).singleDollarTextMath;
		return t ??= !0, r.peek = i, {
			unsafe: [
				{
					character: `\r`,
					inConstruct: `mathFlowMeta`
				},
				{
					character: `
`,
					inConstruct: `mathFlowMeta`
				},
				{
					character: `$`,
					after: t ? void 0 : `\\$`,
					inConstruct: `phrasing`
				},
				{
					character: `$`,
					inConstruct: `mathFlowMeta`
				},
				{
					atBreak: !0,
					character: `$`,
					after: `\\$`
				}
			],
			handlers: {
				math: n,
				inlineMath: r
			}
		};
		function n(e, t, n, r) {
			let i = e.value || ``, a = n.createTracker(r), o = `$`.repeat(Math.max(Is(i, `$`) + 1, 2)), s = n.enter(`mathFlow`), c = a.move(o);
			if (e.meta) {
				let t = n.enter(`mathFlowMeta`);
				c += a.move(n.safe(e.meta, {
					after: `
`,
					before: c,
					encode: [`$`],
					...a.current()
				})), t();
			}
			return c += a.move(`
`), i && (c += a.move(i + `
`)), c += a.move(o), s(), c;
		}
		function r(e, n, r) {
			let i = e.value || ``, a = 1;
			for (t || a++; RegExp(`(^|[^$])` + `\\$`.repeat(a) + `([^$]|$)`).test(i);) a++;
			let o = `$`.repeat(a);
			/[^ \r\n]/.test(i) && (/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i) || /^\$|\$$/.test(i)) && (i = ` ` + i + ` `);
			let s = -1;
			for (; ++s < r.unsafe.length;) {
				let e = r.unsafe[s];
				if (!e.atBreak) continue;
				let t = r.compilePattern(e), n;
				for (; n = t.exec(i);) {
					let e = n.index;
					i.codePointAt(e) === 10 && i.codePointAt(e - 1) === 13 && e--, i = i.slice(0, e) + ` ` + i.slice(n.index + 1);
				}
			}
			return o + i + o;
		}
		function i() {
			return `$`;
		}
	}
	const Bd = {
		tokenize: Hd,
		concrete: !0,
		name: `mathFlow`
	};
	const Vd = {
		tokenize: Ud,
		partial: !0
	};
	function Hd(e, t, n) {
		let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === `linePrefix` ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
		return s;
		function s(t) {
			return e.enter(`mathFlow`), e.enter(`mathFlowFence`), e.enter(`mathFlowFenceSequence`), c(t);
		}
		function c(t) {
			return t === 36 ? (e.consume(t), o++, c) : o < 2 ? n(t) : (e.exit(`mathFlowFenceSequence`), W(e, l, `whitespace`)(t));
		}
		function l(t) {
			return t === null || V(t) ? d(t) : (e.enter(`mathFlowFenceMeta`), e.enter(`chunkString`, { contentType: `string` }), u(t));
		}
		function u(t) {
			return t === null || V(t) ? (e.exit(`chunkString`), e.exit(`mathFlowFenceMeta`), d(t)) : t === 36 ? n(t) : (e.consume(t), u);
		}
		function d(n) {
			return e.exit(`mathFlowFence`), r.interrupt ? t(n) : e.attempt(Vd, f, g)(n);
		}
		function f(t) {
			return e.attempt({
				tokenize: _,
				partial: !0
			}, g, p)(t);
		}
		function p(t) {
			return (a ? W(e, m, `linePrefix`, a + 1) : m)(t);
		}
		function m(t) {
			return t === null ? g(t) : V(t) ? e.attempt(Vd, f, g)(t) : (e.enter(`mathFlowValue`), h(t));
		}
		function h(t) {
			return t === null || V(t) ? (e.exit(`mathFlowValue`), m(t)) : (e.consume(t), h);
		}
		function g(n) {
			return e.exit(`mathFlow`), t(n);
		}
		function _(e, t, n) {
			let i = 0;
			return W(e, a, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4);
			function a(t) {
				return e.enter(`mathFlowFence`), e.enter(`mathFlowFenceSequence`), s(t);
			}
			function s(t) {
				return t === 36 ? (i++, e.consume(t), s) : i < o ? n(t) : (e.exit(`mathFlowFenceSequence`), W(e, c, `whitespace`)(t));
			}
			function c(r) {
				return r === null || V(r) ? (e.exit(`mathFlowFence`), t(r)) : n(r);
			}
		}
	}
	function Ud(e, t, n) {
		let r = this;
		return i;
		function i(n) {
			return n === null ? t(n) : (e.enter(`lineEnding`), e.consume(n), e.exit(`lineEnding`), a);
		}
		function a(e) {
			return r.parser.lazy[r.now().line] ? n(e) : t(e);
		}
	}
	function Wd(e) {
		let t = (e || {}).singleDollarTextMath;
		return t ??= !0, {
			tokenize: n,
			resolve: Gd,
			previous: Kd,
			name: `mathText`
		};
		function n(e, n, r) {
			let i = 0, a, o;
			return s;
			function s(t) {
				return e.enter(`mathText`), e.enter(`mathTextSequence`), c(t);
			}
			function c(n) {
				return n === 36 ? (e.consume(n), i++, c) : i < 2 && !t ? r(n) : (e.exit(`mathTextSequence`), l(n));
			}
			function l(t) {
				return t === null ? r(t) : t === 36 ? (o = e.enter(`mathTextSequence`), a = 0, d(t)) : t === 32 ? (e.enter(`space`), e.consume(t), e.exit(`space`), l) : V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), l) : (e.enter(`mathTextData`), u(t));
			}
			function u(t) {
				return t === null || t === 32 || t === 36 || V(t) ? (e.exit(`mathTextData`), l(t)) : (e.consume(t), u);
			}
			function d(t) {
				return t === 36 ? (e.consume(t), a++, d) : a === i ? (e.exit(`mathTextSequence`), e.exit(`mathText`), n(t)) : (o.type = `mathTextData`, u(t));
			}
		}
	}
	function Gd(e) {
		let t = e.length - 4, n = 3, r, i;
		if ((e[n][1].type === `lineEnding` || e[n][1].type === `space`) && (e[t][1].type === `lineEnding` || e[t][1].type === `space`)) {
			for (r = n; ++r < t;) if (e[r][1].type === `mathTextData`) {
				e[t][1].type = `mathTextPadding`, e[n][1].type = `mathTextPadding`, n += 2, t -= 2;
				break;
			}
		}
		for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== `lineEnding` && (i = r) : (r === t || e[r][1].type === `lineEnding`) && (e[i][1].type = `mathTextData`, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
		return e;
	}
	function Kd(e) {
		return e !== 36 || this.events[this.events.length - 1][1].type === `characterEscape`;
	}
	function qd(e) {
		return {
			flow: { 36: Bd },
			text: { 36: Wd(e) }
		};
	}
	const Jd = {};
	function Yd(e) {
		let t = this, n = e || Jd, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
		i.push(qd(n)), a.push(Rd()), o.push(zd(n));
	}
	function Xd() {
		return {
			enter: {
				mdxFlowExpression: Qd,
				mdxTextExpression: $d
			},
			exit: {
				mdxFlowExpression: ef,
				mdxFlowExpressionChunk: tf,
				mdxTextExpression: ef,
				mdxTextExpressionChunk: tf
			}
		};
	}
	function Zd() {
		return {
			handlers: {
				mdxFlowExpression: nf,
				mdxTextExpression: nf
			},
			unsafe: [{
				character: `{`,
				inConstruct: [`phrasing`]
			}, {
				atBreak: !0,
				character: `{`
			}]
		};
	}
	function Qd(e) {
		this.enter({
			type: `mdxFlowExpression`,
			value: ``
		}, e), this.buffer();
	}
	function $d(e) {
		this.enter({
			type: `mdxTextExpression`,
			value: ``
		}, e), this.buffer();
	}
	function ef(e) {
		let t = this.resume(), n = e.estree, r = this.stack[this.stack.length - 1];
		r.type === `mdxFlowExpression` || r.type, this.exit(e), r.value = t, n && (r.data = { estree: n });
	}
	function tf(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
	function nf(e, t, n) {
		let r = e.value || ``;
		return `{` + n.indentLines(r, function(e, t, n) {
			return (t === 0 || n ? `` : `  `) + e;
		}) + `}`;
	}
	const rf = `AElig.AMP.Aacute.Acirc.Agrave.Aring.Atilde.Auml.COPY.Ccedil.ETH.Eacute.Ecirc.Egrave.Euml.GT.Iacute.Icirc.Igrave.Iuml.LT.Ntilde.Oacute.Ocirc.Ograve.Oslash.Otilde.Ouml.QUOT.REG.THORN.Uacute.Ucirc.Ugrave.Uuml.Yacute.aacute.acirc.acute.aelig.agrave.amp.aring.atilde.auml.brvbar.ccedil.cedil.cent.copy.curren.deg.divide.eacute.ecirc.egrave.eth.euml.frac12.frac14.frac34.gt.iacute.icirc.iexcl.igrave.iquest.iuml.laquo.lt.macr.micro.middot.nbsp.not.ntilde.oacute.ocirc.ograve.ordf.ordm.oslash.otilde.ouml.para.plusmn.pound.quot.raquo.reg.sect.shy.sup1.sup2.sup3.szlig.thorn.times.uacute.ucirc.ugrave.uml.uuml.yacute.yen.yuml`.split(`.`);
	const af = {
		0: `�`,
		128: `€`,
		130: `‚`,
		131: `ƒ`,
		132: `„`,
		133: `…`,
		134: `†`,
		135: `‡`,
		136: `ˆ`,
		137: `‰`,
		138: `Š`,
		139: `‹`,
		140: `Œ`,
		142: `Ž`,
		145: `‘`,
		146: `’`,
		147: `“`,
		148: `”`,
		149: `•`,
		150: `–`,
		151: `—`,
		152: `˜`,
		153: `™`,
		154: `š`,
		155: `›`,
		156: `œ`,
		158: `ž`,
		159: `Ÿ`
	};
	function of(e) {
		let t = typeof e == `string` ? e.charCodeAt(0) : e;
		return t >= 48 && t <= 57;
	}
	function sf(e) {
		let t = typeof e == `string` ? e.charCodeAt(0) : e;
		return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
	}
	function cf(e) {
		let t = typeof e == `string` ? e.charCodeAt(0) : e;
		return t >= 97 && t <= 122 || t >= 65 && t <= 90;
	}
	function lf(e) {
		return cf(e) || of(e);
	}
	const uf = [
		``,
		`Named character references must be terminated by a semicolon`,
		`Numeric character references must be terminated by a semicolon`,
		`Named character references cannot be empty`,
		`Numeric character references cannot be empty`,
		`Named character references must be known`,
		`Numeric character references cannot be disallowed`,
		`Numeric character references cannot be outside the permissible Unicode range`
	];
	function df(e, t) {
		let n = t || {}, r = typeof n.additional == `string` ? n.additional.charCodeAt(0) : n.additional, i = [], a = 0, o = -1, s = ``, c, l;
		n.position && (`start` in n.position || `indent` in n.position ? (l = n.position.indent, c = n.position.start) : c = n.position);
		let u = (c ? c.line : 0) || 1, d = (c ? c.column : 0) || 1, f = m(), p;
		for (a--; ++a <= e.length;) if (p === 10 && (d = (l ? l[o] : 0) || 1), p = e.charCodeAt(a), p === 38) {
			let t = e.charCodeAt(a + 1);
			if (t === 9 || t === 10 || t === 12 || t === 32 || t === 38 || t === 60 || Number.isNaN(t) || r && t === r) {
				s += String.fromCharCode(p), d++;
				continue;
			}
			let o = a + 1, c = o, l = o, u;
			if (t === 35) {
				l = ++c;
				let t = e.charCodeAt(l);
				t === 88 || t === 120 ? (u = `hexadecimal`, l = ++c) : u = `decimal`;
			} else u = `named`;
			let _ = ``, v = ``, y = ``, b = u === `named` ? lf : u === `decimal` ? of : sf;
			for (l--; ++l <= e.length;) {
				let t = e.charCodeAt(l);
				if (!b(t)) break;
				y += String.fromCharCode(t), u === `named` && rf.includes(y) && (_ = y, v = Fc(y));
			}
			let x = e.charCodeAt(l) === 59;
			if (x) {
				l++;
				let e = u === `named` ? Fc(y) : !1;
				e && (_ = y, v = e);
			}
			let S = 1 + l - o, C = ``;
			if (!(!x && n.nonTerminated === !1)) if (!y) u !== `named` && h(4, S);
			else if (u === `named`) {
				if (x && !v) h(5, 1);
				else if (_ !== y && (l = c + _.length, S = 1 + l - c, x = !1), !x) {
					let t = _ ? 1 : 3;
					if (n.attribute) {
						let n = e.charCodeAt(l);
						n === 61 ? (h(t, S), v = ``) : lf(n) ? v = `` : h(t, S);
					} else h(t, S);
				}
				C = v;
			} else {
				x || h(2, S);
				let e = Number.parseInt(y, u === `hexadecimal` ? 16 : 10);
				if (ff(e)) h(7, S), C = `�`;
				else if (e in af) h(6, S), C = af[e];
				else {
					let t = ``;
					pf(e) && h(6, S), e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 | 55296), e = 56320 | e & 1023), C = t + String.fromCharCode(e);
				}
			}
			if (C) {
				g(), f = m(), a = l - 1, d += l - o + 1, i.push(C);
				let t = m();
				t.offset++, n.reference && n.reference.call(n.referenceContext || void 0, C, {
					start: f,
					end: t
				}, e.slice(o - 1, l)), f = t;
			} else y = e.slice(o - 1, l), s += y, d += y.length, a = l - 1;
		} else p === 10 && (u++, o++, d = 0), Number.isNaN(p) ? g() : (s += String.fromCharCode(p), d++);
		return i.join(``);
		function m() {
			return {
				line: u,
				column: d,
				offset: a + ((c ? c.offset : 0) || 0)
			};
		}
		function h(e, t) {
			let r;
			n.warning && (r = m(), r.column += t, r.offset += t, n.warning.call(n.warningContext || void 0, uf[e], r, e));
		}
		function g() {
			s && (i.push(s), n.text && n.text.call(n.textContext || void 0, s, {
				start: f,
				end: m()
			}), s = ``);
		}
	}
	function ff(e) {
		return e >= 55296 && e <= 57343 || e > 1114111;
	}
	function pf(e) {
		return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) == 65535 || (e & 65535) == 65534;
	}
	const mf = /["&'<>`]/g;
	const hf = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	const gf = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
	const _f = /[|\\{}()[\]^$+*?.]/g;
	const vf = /* @__PURE__ */ new WeakMap();
	function yf(e, t) {
		if (e = e.replace(t.subset ? bf(t.subset) : mf, r), t.subset || t.escapeOnly) return e;
		return e.replace(hf, n).replace(gf, r);
		function n(e, n, r) {
			return t.format((e.charCodeAt(0) - 55296) * 1024 + e.charCodeAt(1) - 56320 + 65536, r.charCodeAt(n + 2), t);
		}
		function r(e, n, r) {
			return t.format(e.charCodeAt(0), r.charCodeAt(n + 1), t);
		}
	}
	function bf(e) {
		let t = vf.get(e);
		return t || (t = xf(e), vf.set(e, t)), t;
	}
	function xf(e) {
		let t = [], n = -1;
		for (; ++n < e.length;) t.push(e[n].replace(_f, `\\$&`));
		return RegExp(`(?:` + t.join(`|`) + `)`, `g`);
	}
	function Sf(e) {
		return `&#x` + e.toString(16).toUpperCase() + `;`;
	}
	function Cf(e, t) {
		return yf(e, Object.assign({ format: Sf }, t));
	}
	function wf() {
		return {
			canContainEols: [`mdxJsxTextElement`],
			enter: {
				mdxJsxFlowTag: r,
				mdxJsxFlowTagClosingMarker: i,
				mdxJsxFlowTagAttribute: d,
				mdxJsxFlowTagExpressionAttribute: f,
				mdxJsxFlowTagAttributeValueLiteral: e,
				mdxJsxFlowTagAttributeValueExpression: e,
				mdxJsxFlowTagSelfClosingMarker: o,
				mdxJsxTextTag: r,
				mdxJsxTextTagClosingMarker: i,
				mdxJsxTextTagAttribute: d,
				mdxJsxTextTagExpressionAttribute: f,
				mdxJsxTextTagAttributeValueLiteral: e,
				mdxJsxTextTagAttributeValueExpression: e,
				mdxJsxTextTagSelfClosingMarker: o
			},
			exit: {
				mdxJsxFlowTagClosingMarker: s,
				mdxJsxFlowTagNamePrimary: c,
				mdxJsxFlowTagNameMember: l,
				mdxJsxFlowTagNameLocal: u,
				mdxJsxFlowTagExpressionAttribute: p,
				mdxJsxFlowTagExpressionAttributeValue: n,
				mdxJsxFlowTagAttributeNamePrimary: m,
				mdxJsxFlowTagAttributeNameLocal: h,
				mdxJsxFlowTagAttributeValueLiteral: g,
				mdxJsxFlowTagAttributeValueLiteralValue: n,
				mdxJsxFlowTagAttributeValueExpression: _,
				mdxJsxFlowTagAttributeValueExpressionValue: n,
				mdxJsxFlowTagSelfClosingMarker: v,
				mdxJsxFlowTag: y,
				mdxJsxTextTagClosingMarker: s,
				mdxJsxTextTagNamePrimary: c,
				mdxJsxTextTagNameMember: l,
				mdxJsxTextTagNameLocal: u,
				mdxJsxTextTagExpressionAttribute: p,
				mdxJsxTextTagExpressionAttributeValue: n,
				mdxJsxTextTagAttributeNamePrimary: m,
				mdxJsxTextTagAttributeNameLocal: h,
				mdxJsxTextTagAttributeValueLiteral: g,
				mdxJsxTextTagAttributeValueLiteralValue: n,
				mdxJsxTextTagAttributeValueExpression: _,
				mdxJsxTextTagAttributeValueExpressionValue: n,
				mdxJsxTextTagSelfClosingMarker: v,
				mdxJsxTextTag: y
			}
		};
		function e() {
			this.buffer();
		}
		function t(e) {
			return {
				line: e.line,
				column: e.column,
				offset: e.offset
			};
		}
		function n(e) {
			this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
		}
		function r(e) {
			let t = {
				name: void 0,
				attributes: [],
				close: !1,
				selfClosing: !1,
				start: e.start,
				end: e.end
			};
			this.data.mdxJsxTagStack || (this.data.mdxJsxTagStack = []), this.data.mdxJsxTag = t, this.buffer();
		}
		function i(e) {
			if (this.data.mdxJsxTagStack.length === 0) throw new B("Unexpected closing slash `/` in tag, expected an open tag first", {
				start: e.start,
				end: e.end
			}, `mdast-util-mdx-jsx:unexpected-closing-slash`);
		}
		function a(e) {
			if (this.data.mdxJsxTag.close) throw new B(`Unexpected attribute in closing tag, expected the end of the tag`, {
				start: e.start,
				end: e.end
			}, `mdast-util-mdx-jsx:unexpected-attribute`);
		}
		function o(e) {
			if (this.data.mdxJsxTag.close) throw new B("Unexpected self-closing slash `/` in closing tag, expected the end of the tag", {
				start: e.start,
				end: e.end
			}, `mdast-util-mdx-jsx:unexpected-self-closing-slash`);
		}
		function s() {
			let e = this.data.mdxJsxTag;
			e.close = !0;
		}
		function c(e) {
			let t = this.data.mdxJsxTag;
			t.name = this.sliceSerialize(e);
		}
		function l(e) {
			let t = this.data.mdxJsxTag;
			t.name += `.` + this.sliceSerialize(e);
		}
		function u(e) {
			let t = this.data.mdxJsxTag;
			t.name += `:` + this.sliceSerialize(e);
		}
		function d(e) {
			let n = this.data.mdxJsxTag;
			a.call(this, e), n.attributes.push({
				type: `mdxJsxAttribute`,
				name: ``,
				value: null,
				position: {
					start: t(e.start),
					end: void 0
				}
			});
		}
		function f(e) {
			let n = this.data.mdxJsxTag;
			a.call(this, e), n.attributes.push({
				type: `mdxJsxExpressionAttribute`,
				value: ``,
				position: {
					start: t(e.start),
					end: void 0
				}
			}), this.buffer();
		}
		function p(e) {
			let n = this.data.mdxJsxTag, r = n.attributes[n.attributes.length - 1];
			r.type;
			let i = e.estree;
			r.value = this.resume(), r.position, r.position.end = t(e.end), i && (r.data = { estree: i });
		}
		function m(e) {
			let n = this.data.mdxJsxTag, r = n.attributes[n.attributes.length - 1];
			r.type, r.name = this.sliceSerialize(e), r.position, r.position.end = t(e.end);
		}
		function h(e) {
			let n = this.data.mdxJsxTag, r = n.attributes[n.attributes.length - 1];
			r.type, r.name += `:` + this.sliceSerialize(e), r.position, r.position.end = t(e.end);
		}
		function g(e) {
			let n = this.data.mdxJsxTag, r = n.attributes[n.attributes.length - 1];
			r.value = df(this.resume(), { nonTerminated: !1 }), r.position, r.position.end = t(e.end);
		}
		function _(e) {
			let n = this.data.mdxJsxTag, r = n.attributes[n.attributes.length - 1];
			r.type;
			let i = {
				type: `mdxJsxAttributeValueExpression`,
				value: this.resume()
			}, a = e.estree;
			a && (i.data = { estree: a }), r.value = i, r.position, r.position.end = t(e.end);
		}
		function v() {
			let e = this.data.mdxJsxTag;
			e.selfClosing = !0;
		}
		function y(e) {
			let t = this.data.mdxJsxTag, n = this.data.mdxJsxTagStack, r = n[n.length - 1];
			if (t.close && r.name !== t.name) throw new B("Unexpected closing tag `" + S(t) + "`, expected corresponding closing tag for `" + S(r) + "` (" + Yt(r) + `)`, {
				start: e.start,
				end: e.end
			}, `mdast-util-mdx-jsx:end-tag-mismatch`);
			this.resume(), t.close ? n.pop() : this.enter({
				type: e.type === `mdxJsxTextTag` ? `mdxJsxTextElement` : `mdxJsxFlowElement`,
				name: t.name || null,
				attributes: t.attributes,
				children: []
			}, e, b), t.selfClosing || t.close ? this.exit(e, x) : n.push(t);
		}
		function b(e, t) {
			let n = this.data.mdxJsxTagStack, r = n[n.length - 1], i = e ? " before the end of `" + e.type + "`" : ``, a = e ? {
				start: e.start,
				end: e.end
			} : void 0;
			throw new B("Expected a closing tag for `" + S(r) + "` (" + Yt({
				start: t.start,
				end: t.end
			}) + `)` + i, a, `mdast-util-mdx-jsx:end-tag-mismatch`);
		}
		function x(e, t) {
			let n = this.data.mdxJsxTag;
			throw new B("Expected the closing tag `" + S(n) + "` either after the end of `" + t.type + "` (" + Yt(t.end) + ") or another opening tag after the start of `" + t.type + "` (" + Yt(t.start) + `)`, {
				start: e.start,
				end: e.end
			}, `mdast-util-mdx-jsx:end-tag-mismatch`);
		}
		function S(e) {
			return `<` + (e.close ? `/` : ``) + (e.name || ``) + `>`;
		}
	}
	function Tf(e) {
		let t = e || {}, n = t.quote || `"`, r = t.quoteSmart || !1, i = t.tightSelfClosing || !1, a = t.printWidth || 1 / 0, o = n === `"` ? `'` : `"`;
		if (n !== `"` && n !== `'`) throw Error("Cannot serialize attribute values with `" + n + "` for `options.quote`, expected `\"`, or `'`");
		return s.peek = kf, {
			handlers: {
				mdxJsxFlowElement: s,
				mdxJsxTextElement: s
			},
			unsafe: [{
				character: `<`,
				inConstruct: [`phrasing`]
			}, {
				atBreak: !0,
				character: `<`
			}],
			fences: !0,
			resourceLink: !0
		};
		function s(e, t, s, c) {
			let l = e.type === `mdxJsxFlowElement`, u = e.name ? !e.children || e.children.length === 0 : !1, d = Of(Df(s)), f = s.createTracker(c), p = s.createTracker(c), m = [], h = (l ? d : ``) + `<` + (e.name || ``), g = s.enter(e.type);
			if (f.move(h), p.move(h), e.attributes && e.attributes.length > 0) {
				if (!e.name) throw Error(`Cannot serialize fragment w/ attributes`);
				let t = -1;
				for (; ++t < e.attributes.length;) {
					let i = e.attributes[t], a;
					if (i.type === `mdxJsxExpressionAttribute`) a = `{` + (i.value || ``) + `}`;
					else {
						if (!i.name) throw Error(`Cannot serialize attribute w/o name`);
						let e = i.value, t = i.name, s = ``;
						if (e != null) if (typeof e == `object`) s = `{` + (e.value || ``) + `}`;
						else {
							let t = r && Do(e, n) > Do(e, o) ? o : n;
							s = t + Cf(e, { subset: [t] }) + t;
						}
						a = t + (s ? `=` : ``) + s;
					}
					m.push(a);
				}
			}
			let _ = !1, v = m.join(` `);
			l && (/\r?\n|\r/.test(v) || f.current().now.column + v.length + (u ? i ? 2 : 3 : 1) > a) && (_ = !0);
			let y = f, b = h;
			if (_) {
				y = p;
				let e = -1;
				for (; ++e < m.length;) m[e] = d + `  ` + m[e];
				b += y.move(`
` + m.join(`
`) + `
` + d);
			} else v && (b += y.move(` ` + v));
			return u && (b += y.move((i || _ ? `` : ` `) + `/`)), b += y.move(`>`), e.children && e.children.length > 0 && (e.type === `mdxJsxTextElement` ? b += y.move(s.containerPhrasing(e, {
				...y.current(),
				before: `>`,
				after: `<`
			})) : (y.shift(2), b += y.move(`
`), b += y.move(Ef(e, s, y.current())), b += y.move(`
`))), u || (b += y.move((l ? d : ``) + `</` + (e.name || ``) + `>`)), g(), b;
		}
	}
	function Ef(e, t, n) {
		let r = t.indexStack, i = e.children, a = t.createTracker(n), o = Of(Df(t)), s = [], c = -1;
		for (r.push(-1); ++c < i.length;) {
			let n = i[c];
			r[r.length - 1] = c;
			let l = {
				before: `
`,
				after: `
`,
				...a.current()
			}, u = t.handle(n, e, t, l), d = n.type === `mdxJsxFlowElement` ? u : t.indentLines(u, function(e, t, n) {
				return (n ? `` : o) + e;
			});
			s.push(a.move(d)), n.type !== `list` && (t.bulletLastUsed = void 0), c < i.length - 1 && s.push(a.move(`

`));
		}
		return r.pop(), s.join(``);
	}
	function Df(e) {
		let t = 0, n = e.stack.length;
		for (; --n > -1;) {
			let r = e.stack[n];
			if (r === `blockquote` || r === `listItem`) break;
			r === `mdxJsxFlowElement` && t++;
		}
		return t;
	}
	function Of(e) {
		return `  `.repeat(e);
	}
	function kf() {
		return `<`;
	}
	function Af() {
		return {
			enter: { mdxjsEsm: Mf },
			exit: {
				mdxjsEsm: Nf,
				mdxjsEsmData: Pf
			}
		};
	}
	function jf() {
		return { handlers: { mdxjsEsm: Ff } };
	}
	function Mf(e) {
		this.enter({
			type: `mdxjsEsm`,
			value: ``
		}, e), this.buffer();
	}
	function Nf(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e);
		let r = e.estree;
		n.value = t, r && (n.data = { estree: r });
	}
	function Pf(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
	function Ff(e) {
		return e.value || ``;
	}
	function If() {
		return [
			Xd(),
			wf(),
			Af()
		];
	}
	function Lf(e) {
		return { extensions: [
			Zd(),
			Tf(e),
			jf()
		] };
	}
	var Rf = [
		509,
		0,
		227,
		0,
		150,
		4,
		294,
		9,
		1368,
		2,
		2,
		1,
		6,
		3,
		41,
		2,
		5,
		0,
		166,
		1,
		574,
		3,
		9,
		9,
		7,
		9,
		32,
		4,
		318,
		1,
		78,
		5,
		71,
		10,
		50,
		3,
		123,
		2,
		54,
		14,
		32,
		10,
		3,
		1,
		11,
		3,
		46,
		10,
		8,
		0,
		46,
		9,
		7,
		2,
		37,
		13,
		2,
		9,
		6,
		1,
		45,
		0,
		13,
		2,
		49,
		13,
		9,
		3,
		2,
		11,
		83,
		11,
		7,
		0,
		3,
		0,
		158,
		11,
		6,
		9,
		7,
		3,
		56,
		1,
		2,
		6,
		3,
		1,
		3,
		2,
		10,
		0,
		11,
		1,
		3,
		6,
		4,
		4,
		68,
		8,
		2,
		0,
		3,
		0,
		2,
		3,
		2,
		4,
		2,
		0,
		15,
		1,
		83,
		17,
		10,
		9,
		5,
		0,
		82,
		19,
		13,
		9,
		214,
		6,
		3,
		8,
		28,
		1,
		83,
		16,
		16,
		9,
		82,
		12,
		9,
		9,
		7,
		19,
		58,
		14,
		5,
		9,
		243,
		14,
		166,
		9,
		71,
		5,
		2,
		1,
		3,
		3,
		2,
		0,
		2,
		1,
		13,
		9,
		120,
		6,
		3,
		6,
		4,
		0,
		29,
		9,
		41,
		6,
		2,
		3,
		9,
		0,
		10,
		10,
		47,
		15,
		199,
		7,
		137,
		9,
		54,
		7,
		2,
		7,
		17,
		9,
		57,
		21,
		2,
		13,
		123,
		5,
		4,
		0,
		2,
		1,
		2,
		6,
		2,
		0,
		9,
		9,
		49,
		4,
		2,
		1,
		2,
		4,
		9,
		9,
		55,
		9,
		266,
		3,
		10,
		1,
		2,
		0,
		49,
		6,
		4,
		4,
		14,
		10,
		5350,
		0,
		7,
		14,
		11465,
		27,
		2343,
		9,
		87,
		9,
		39,
		4,
		60,
		6,
		26,
		9,
		535,
		9,
		470,
		0,
		2,
		54,
		8,
		3,
		82,
		0,
		12,
		1,
		19628,
		1,
		4178,
		9,
		519,
		45,
		3,
		22,
		543,
		4,
		4,
		5,
		9,
		7,
		3,
		6,
		31,
		3,
		149,
		2,
		1418,
		49,
		513,
		54,
		5,
		49,
		9,
		0,
		15,
		0,
		23,
		4,
		2,
		14,
		1361,
		6,
		2,
		16,
		3,
		6,
		2,
		1,
		2,
		4,
		101,
		0,
		161,
		6,
		10,
		9,
		357,
		0,
		62,
		13,
		499,
		13,
		245,
		1,
		2,
		9,
		233,
		0,
		3,
		0,
		8,
		1,
		6,
		0,
		475,
		6,
		110,
		6,
		6,
		9,
		4759,
		9,
		787719,
		239
	];
	var zf = [
		0,
		11,
		2,
		25,
		2,
		18,
		2,
		1,
		2,
		14,
		3,
		13,
		35,
		122,
		70,
		52,
		268,
		28,
		4,
		48,
		48,
		31,
		14,
		29,
		6,
		37,
		11,
		29,
		3,
		35,
		5,
		7,
		2,
		4,
		43,
		157,
		19,
		35,
		5,
		35,
		5,
		39,
		9,
		51,
		13,
		10,
		2,
		14,
		2,
		6,
		2,
		1,
		2,
		10,
		2,
		14,
		2,
		6,
		2,
		1,
		4,
		51,
		13,
		310,
		10,
		21,
		11,
		7,
		25,
		5,
		2,
		41,
		2,
		8,
		70,
		5,
		3,
		0,
		2,
		43,
		2,
		1,
		4,
		0,
		3,
		22,
		11,
		22,
		10,
		30,
		66,
		18,
		2,
		1,
		11,
		21,
		11,
		25,
		7,
		25,
		39,
		55,
		7,
		1,
		65,
		0,
		16,
		3,
		2,
		2,
		2,
		28,
		43,
		28,
		4,
		28,
		36,
		7,
		2,
		27,
		28,
		53,
		11,
		21,
		11,
		18,
		14,
		17,
		111,
		72,
		56,
		50,
		14,
		50,
		14,
		35,
		39,
		27,
		10,
		22,
		251,
		41,
		7,
		1,
		17,
		5,
		57,
		28,
		11,
		0,
		9,
		21,
		43,
		17,
		47,
		20,
		28,
		22,
		13,
		52,
		58,
		1,
		3,
		0,
		14,
		44,
		33,
		24,
		27,
		35,
		30,
		0,
		3,
		0,
		9,
		34,
		4,
		0,
		13,
		47,
		15,
		3,
		22,
		0,
		2,
		0,
		36,
		17,
		2,
		24,
		20,
		1,
		64,
		6,
		2,
		0,
		2,
		3,
		2,
		14,
		2,
		9,
		8,
		46,
		39,
		7,
		3,
		1,
		3,
		21,
		2,
		6,
		2,
		1,
		2,
		4,
		4,
		0,
		19,
		0,
		13,
		4,
		31,
		9,
		2,
		0,
		3,
		0,
		2,
		37,
		2,
		0,
		26,
		0,
		2,
		0,
		45,
		52,
		19,
		3,
		21,
		2,
		31,
		47,
		21,
		1,
		2,
		0,
		185,
		46,
		42,
		3,
		37,
		47,
		21,
		0,
		60,
		42,
		14,
		0,
		72,
		26,
		38,
		6,
		186,
		43,
		117,
		63,
		32,
		7,
		3,
		0,
		3,
		7,
		2,
		1,
		2,
		23,
		16,
		0,
		2,
		0,
		95,
		7,
		3,
		38,
		17,
		0,
		2,
		0,
		29,
		0,
		11,
		39,
		8,
		0,
		22,
		0,
		12,
		45,
		20,
		0,
		19,
		72,
		200,
		32,
		32,
		8,
		2,
		36,
		18,
		0,
		50,
		29,
		113,
		6,
		2,
		1,
		2,
		37,
		22,
		0,
		26,
		5,
		2,
		1,
		2,
		31,
		15,
		0,
		24,
		43,
		261,
		18,
		16,
		0,
		2,
		12,
		2,
		33,
		125,
		0,
		80,
		921,
		103,
		110,
		18,
		195,
		2637,
		96,
		16,
		1071,
		18,
		5,
		26,
		3994,
		6,
		582,
		6842,
		29,
		1763,
		568,
		8,
		30,
		18,
		78,
		18,
		29,
		19,
		47,
		17,
		3,
		32,
		20,
		6,
		18,
		433,
		44,
		212,
		63,
		33,
		24,
		3,
		24,
		45,
		74,
		6,
		0,
		67,
		12,
		65,
		1,
		2,
		0,
		15,
		4,
		10,
		7381,
		42,
		31,
		98,
		114,
		8702,
		3,
		2,
		6,
		2,
		1,
		2,
		290,
		16,
		0,
		30,
		2,
		3,
		0,
		15,
		3,
		9,
		395,
		2309,
		106,
		6,
		12,
		4,
		8,
		8,
		9,
		5991,
		84,
		2,
		70,
		2,
		1,
		3,
		0,
		3,
		1,
		3,
		3,
		2,
		11,
		2,
		0,
		2,
		6,
		2,
		64,
		2,
		3,
		3,
		7,
		2,
		6,
		2,
		27,
		2,
		3,
		2,
		4,
		2,
		0,
		4,
		6,
		2,
		339,
		3,
		24,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		7,
		1845,
		30,
		7,
		5,
		262,
		61,
		147,
		44,
		11,
		6,
		17,
		0,
		322,
		29,
		19,
		43,
		485,
		27,
		229,
		29,
		3,
		0,
		208,
		30,
		2,
		2,
		2,
		1,
		2,
		6,
		3,
		4,
		10,
		1,
		225,
		6,
		2,
		3,
		2,
		1,
		2,
		14,
		2,
		196,
		60,
		67,
		8,
		0,
		1205,
		3,
		2,
		26,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		9,
		2,
		3,
		2,
		0,
		2,
		0,
		7,
		0,
		5,
		0,
		2,
		0,
		2,
		0,
		2,
		2,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		1,
		2,
		0,
		3,
		3,
		2,
		6,
		2,
		3,
		2,
		3,
		2,
		0,
		2,
		9,
		2,
		16,
		6,
		2,
		2,
		4,
		2,
		16,
		4421,
		42719,
		33,
		4381,
		3,
		5773,
		3,
		7472,
		16,
		621,
		2467,
		541,
		1507,
		4938,
		6,
		8489
	];
	var Bf = `‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･`;
	var Vf = `ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ`;
	var Hf = {
		3: `abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile`,
		5: `class enum extends super const export import`,
		6: `enum`,
		strict: `implements interface let package private protected public static yield`,
		strictBind: `eval arguments`
	};
	var Uf = `break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this`;
	var Wf = {
		5: Uf,
		"5module": Uf + ` export import`,
		6: Uf + ` const class extends export import super`
	};
	var Gf = /^in(stanceof)?$/;
	var Kf = RegExp(`[` + Vf + `]`);
	var qf = RegExp(`[` + Vf + Bf + `]`);
	function Jf(e, t) {
		for (var n = 65536, r = 0; r < t.length; r += 2) {
			if (n += t[r], n > e) return !1;
			if (n += t[r + 1], n >= e) return !0;
		}
		return !1;
	}
	function Yf(e, t) {
		return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Kf.test(String.fromCharCode(e)) : t === !1 ? !1 : Jf(e, zf);
	}
	function Xf(e, t) {
		return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && qf.test(String.fromCharCode(e)) : t === !1 ? !1 : Jf(e, zf) || Jf(e, Rf);
	}
	var G = function(e, t) {
		t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
	};
	function Zf(e, t) {
		return new G(e, {
			beforeExpr: !0,
			binop: t
		});
	}
	var Qf = { beforeExpr: !0 };
	var $f = { startsExpr: !0 };
	var ep = {};
	function K(e, t) {
		return t === void 0 && (t = {}), t.keyword = e, ep[e] = new G(e, t);
	}
	var q = {
		num: new G(`num`, $f),
		regexp: new G(`regexp`, $f),
		string: new G(`string`, $f),
		name: new G(`name`, $f),
		privateId: new G(`privateId`, $f),
		eof: new G(`eof`),
		bracketL: new G(`[`, {
			beforeExpr: !0,
			startsExpr: !0
		}),
		bracketR: new G(`]`),
		braceL: new G(`{`, {
			beforeExpr: !0,
			startsExpr: !0
		}),
		braceR: new G(`}`),
		parenL: new G(`(`, {
			beforeExpr: !0,
			startsExpr: !0
		}),
		parenR: new G(`)`),
		comma: new G(`,`, Qf),
		semi: new G(`;`, Qf),
		colon: new G(`:`, Qf),
		dot: new G(`.`),
		question: new G(`?`, Qf),
		questionDot: new G(`?.`),
		arrow: new G(`=>`, Qf),
		template: new G(`template`),
		invalidTemplate: new G(`invalidTemplate`),
		ellipsis: new G(`...`, Qf),
		backQuote: new G("`", $f),
		dollarBraceL: new G("${", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		eq: new G(`=`, {
			beforeExpr: !0,
			isAssign: !0
		}),
		assign: new G(`_=`, {
			beforeExpr: !0,
			isAssign: !0
		}),
		incDec: new G(`++/--`, {
			prefix: !0,
			postfix: !0,
			startsExpr: !0
		}),
		prefix: new G(`!/~`, {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		logicalOR: Zf(`||`, 1),
		logicalAND: Zf(`&&`, 2),
		bitwiseOR: Zf(`|`, 3),
		bitwiseXOR: Zf(`^`, 4),
		bitwiseAND: Zf(`&`, 5),
		equality: Zf(`==/!=/===/!==`, 6),
		relational: Zf(`</>/<=/>=`, 7),
		bitShift: Zf(`<</>>/>>>`, 8),
		plusMin: new G(`+/-`, {
			beforeExpr: !0,
			binop: 9,
			prefix: !0,
			startsExpr: !0
		}),
		modulo: Zf(`%`, 10),
		star: Zf(`*`, 10),
		slash: Zf(`/`, 10),
		starstar: new G(`**`, { beforeExpr: !0 }),
		coalesce: Zf(`??`, 1),
		_break: K(`break`),
		_case: K(`case`, Qf),
		_catch: K(`catch`),
		_continue: K(`continue`),
		_debugger: K(`debugger`),
		_default: K(`default`, Qf),
		_do: K(`do`, {
			isLoop: !0,
			beforeExpr: !0
		}),
		_else: K(`else`, Qf),
		_finally: K(`finally`),
		_for: K(`for`, { isLoop: !0 }),
		_function: K(`function`, $f),
		_if: K(`if`),
		_return: K(`return`, Qf),
		_switch: K(`switch`),
		_throw: K(`throw`, Qf),
		_try: K(`try`),
		_var: K(`var`),
		_const: K(`const`),
		_while: K(`while`, { isLoop: !0 }),
		_with: K(`with`),
		_new: K(`new`, {
			beforeExpr: !0,
			startsExpr: !0
		}),
		_this: K(`this`, $f),
		_super: K(`super`, $f),
		_class: K(`class`, $f),
		_extends: K(`extends`, Qf),
		_export: K(`export`),
		_import: K(`import`, $f),
		_null: K(`null`, $f),
		_true: K(`true`, $f),
		_false: K(`false`, $f),
		_in: K(`in`, {
			beforeExpr: !0,
			binop: 7
		}),
		_instanceof: K(`instanceof`, {
			beforeExpr: !0,
			binop: 7
		}),
		_typeof: K(`typeof`, {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		_void: K(`void`, {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		_delete: K(`delete`, {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		})
	};
	var tp = /\r\n?|\n|\u2028|\u2029/;
	var np = new RegExp(tp.source, `g`);
	function rp(e) {
		return e === 10 || e === 13 || e === 8232 || e === 8233;
	}
	function ip(e, t, n) {
		n === void 0 && (n = e.length);
		for (var r = t; r < n; r++) {
			var i = e.charCodeAt(r);
			if (rp(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
		}
		return -1;
	}
	var ap = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	var op = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
	var sp = Object.prototype;
	var cp = sp.hasOwnProperty;
	var lp = sp.toString;
	var up = Object.hasOwn || (function(e, t) {
		return cp.call(e, t);
	});
	var dp = Array.isArray || (function(e) {
		return lp.call(e) === `[object Array]`;
	});
	var fp = Object.create(null);
	function pp(e) {
		return fp[e] || (fp[e] = RegExp(`^(?:` + e.replace(/ /g, `|`) + `)$`));
	}
	function mp(e) {
		return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
	}
	var hp = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
	var gp = function(e, t) {
		this.line = e, this.column = t;
	};
	gp.prototype.offset = function(e) {
		return new gp(this.line, this.column + e);
	};
	var _p = function(e, t, n) {
		this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
	};
	function vp(e, t) {
		for (var n = 1, r = 0;;) {
			var i = ip(e, r, t);
			if (i < 0) return new gp(n, t - r);
			++n, r = i;
		}
	}
	var yp = {
		ecmaVersion: null,
		sourceType: `script`,
		onInsertedSemicolon: null,
		onTrailingComma: null,
		allowReserved: null,
		allowReturnOutsideFunction: !1,
		allowImportExportEverywhere: !1,
		allowAwaitOutsideFunction: null,
		allowSuperOutsideMethod: null,
		allowHashBang: !1,
		checkPrivateFields: !0,
		locations: !1,
		onToken: null,
		onComment: null,
		ranges: !1,
		program: null,
		sourceFile: null,
		directSourceFile: null,
		preserveParens: !1
	};
	var bp = !1;
	function xp(e) {
		var t = {};
		for (var n in yp) t[n] = e && up(e, n) ? e[n] : yp[n];
		if (t.ecmaVersion === `latest` ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!bp && typeof console == `object` && console.warn && (bp = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), dp(t.onToken)) {
			var r = t.onToken;
			t.onToken = function(e) {
				return r.push(e);
			};
		}
		if (dp(t.onComment) && (t.onComment = Sp(t, t.onComment)), t.sourceType === `commonjs` && t.allowAwaitOutsideFunction) throw Error(`Cannot use allowAwaitOutsideFunction with sourceType: commonjs`);
		return t;
	}
	function Sp(e, t) {
		return function(n, r, i, a, o, s) {
			var c = {
				type: n ? `Block` : `Line`,
				value: r,
				start: i,
				end: a
			};
			e.locations && (c.loc = new _p(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
		};
	}
	var Cp = 1;
	var wp = 2;
	var Tp = 4;
	var Ep = 8;
	var Dp = 16;
	var Op = 32;
	var kp = 64;
	var Ap = 128;
	var jp = 256;
	var Mp = 512;
	var Np = 1024;
	var Pp = Cp | wp | jp;
	function Fp(e, t) {
		return wp | (e ? Tp : 0) | (t ? Ep : 0);
	}
	var Ip = 0;
	var Lp = 1;
	var Rp = 2;
	var zp = 3;
	var Bp = 4;
	var Vp = 5;
	var J = function(e, t, n) {
		this.options = e = xp(e), this.sourceFile = e.sourceFile, this.keywords = pp(Wf[e.ecmaVersion >= 6 ? 6 : e.sourceType === `module` ? `5module` : 5]);
		var r = ``;
		e.allowReserved !== !0 && (r = Hf[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === `module` && (r += ` await`)), this.reservedWords = pp(r);
		var i = (r ? r + ` ` : ``) + Hf.strict;
		this.reservedWordsStrict = pp(i), this.reservedWordsStrictBind = pp(i + ` ` + Hf.strictBind), this.input = String(t), this.containsEsc = !1, n ? (this.pos = n, this.lineStart = this.input.lastIndexOf(`
`, n - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(tp).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = q.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === `module`, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === `#!` && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === `commonjs` ? wp : Cp), this.regexpState = null, this.privateNameStack = [];
	};
	var Hp = {
		inFunction: { configurable: !0 },
		inGenerator: { configurable: !0 },
		inAsync: { configurable: !0 },
		canAwait: { configurable: !0 },
		allowReturn: { configurable: !0 },
		allowSuper: { configurable: !0 },
		allowDirectSuper: { configurable: !0 },
		treatFunctionsAsVar: { configurable: !0 },
		allowNewDotTarget: { configurable: !0 },
		allowUsing: { configurable: !0 },
		inClassStaticBlock: { configurable: !0 }
	};
	J.prototype.parse = function() {
		var e = this.options.program || this.startNode();
		return this.nextToken(), this.parseTopLevel(e);
	}, Hp.inFunction.get = function() {
		return (this.currentVarScope().flags & wp) > 0;
	}, Hp.inGenerator.get = function() {
		return (this.currentVarScope().flags & Ep) > 0;
	}, Hp.inAsync.get = function() {
		return (this.currentVarScope().flags & Tp) > 0;
	}, Hp.canAwait.get = function() {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var t = this.scopeStack[e].flags;
			if (t & (jp | Mp)) return !1;
			if (t & wp) return (t & Tp) > 0;
		}
		return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
	}, Hp.allowReturn.get = function() {
		return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & Cp);
	}, Hp.allowSuper.get = function() {
		return (this.currentThisScope().flags & kp) > 0 || this.options.allowSuperOutsideMethod;
	}, Hp.allowDirectSuper.get = function() {
		return (this.currentThisScope().flags & Ap) > 0;
	}, Hp.treatFunctionsAsVar.get = function() {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	}, Hp.allowNewDotTarget.get = function() {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var t = this.scopeStack[e].flags;
			if (t & (jp | Mp) || t & wp && !(t & Dp)) return !0;
		}
		return !1;
	}, Hp.allowUsing.get = function() {
		var e = this.currentScope().flags;
		return !(e & Np || !this.inModule && e & Cp);
	}, Hp.inClassStaticBlock.get = function() {
		return (this.currentVarScope().flags & jp) > 0;
	}, J.extend = function() {
		for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
		for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
		return n;
	}, J.parse = function(e, t) {
		return new this(t, e).parse();
	}, J.parseExpressionAt = function(e, t, n) {
		var r = new this(n, e, t);
		return r.nextToken(), r.parseExpression();
	}, J.tokenizer = function(e, t) {
		return new this(t, e);
	}, Object.defineProperties(J.prototype, Hp);
	var Up = J.prototype;
	var Wp = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
	Up.strictDirective = function(e) {
		if (this.options.ecmaVersion < 5) return !1;
		for (;;) {
			op.lastIndex = e, e += op.exec(this.input)[0].length;
			var t = Wp.exec(this.input.slice(e));
			if (!t) return !1;
			if ((t[1] || t[2]) === `use strict`) {
				op.lastIndex = e + t[0].length;
				var n = op.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
				return i === `;` || i === `}` || tp.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === `!` && this.input.charAt(r + 1) === `=`);
			}
			e += t[0].length, op.lastIndex = e, e += op.exec(this.input)[0].length, this.input[e] === `;` && e++;
		}
	}, Up.eat = function(e) {
		return this.type === e ? (this.next(), !0) : !1;
	}, Up.isContextual = function(e) {
		return this.type === q.name && this.value === e && !this.containsEsc;
	}, Up.eatContextual = function(e) {
		return this.isContextual(e) ? (this.next(), !0) : !1;
	}, Up.expectContextual = function(e) {
		this.eatContextual(e) || this.unexpected();
	}, Up.canInsertSemicolon = function() {
		return this.type === q.eof || this.type === q.braceR || tp.test(this.input.slice(this.lastTokEnd, this.start));
	}, Up.insertSemicolon = function() {
		if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
	}, Up.semicolon = function() {
		!this.eat(q.semi) && !this.insertSemicolon() && this.unexpected();
	}, Up.afterTrailingComma = function(e, t) {
		if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
	}, Up.expect = function(e) {
		this.eat(e) || this.unexpected();
	}, Up.unexpected = function(e) {
		this.raise(e == null ? this.start : e, `Unexpected token`);
	};
	var Gp = function() {
		this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
	};
	Up.checkPatternErrors = function(e, t) {
		if (e) {
			e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, `Comma is not permitted after the rest element`);
			var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
			n > -1 && this.raiseRecoverable(n, t ? `Assigning to rvalue` : `Parenthesized pattern`);
		}
	}, Up.checkExpressionErrors = function(e, t) {
		if (!e) return !1;
		var n = e.shorthandAssign, r = e.doubleProto;
		if (!t) return n >= 0 || r >= 0;
		n >= 0 && this.raise(n, `Shorthand property assignments are valid only in destructuring patterns`), r >= 0 && this.raiseRecoverable(r, `Redefinition of __proto__ property`);
	}, Up.checkYieldAwaitInDefaultParams = function() {
		this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, `Yield expression cannot be a default value`), this.awaitPos && this.raise(this.awaitPos, `Await expression cannot be a default value`);
	}, Up.isSimpleAssignTarget = function(e) {
		return e.type === `ParenthesizedExpression` ? this.isSimpleAssignTarget(e.expression) : e.type === `Identifier` || e.type === `MemberExpression`;
	};
	var Y = J.prototype;
	Y.parseTopLevel = function(e) {
		var t = Object.create(null);
		for (e.body || (e.body = []); this.type !== q.eof;) {
			var n = this.parseStatement(null, !0, t);
			e.body.push(n);
		}
		if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
			var a = i[r];
			this.raiseRecoverable(this.undefinedExports[a].start, `Export '` + a + `' is not defined`);
		}
		return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === `commonjs` ? `script` : this.options.sourceType, this.finishNode(e, `Program`);
	};
	var Kp = { kind: `loop` };
	var qp = { kind: `switch` };
	Y.isLet = function(e) {
		if (this.options.ecmaVersion < 6 || !this.isContextual(`let`)) return !1;
		op.lastIndex = this.pos;
		var t = op.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
		if (r === 91 || r === 92) return !0;
		if (e) return !1;
		if (r === 123) return !0;
		if (Yf(r)) {
			var i = n;
			do
				n += r <= 65535 ? 1 : 2;
			while (Xf(r = this.fullCharCodeAt(n)));
			if (r === 92) return !0;
			var a = this.input.slice(i, n);
			if (!Gf.test(a)) return !0;
		}
		return !1;
	}, Y.isAsyncFunction = function() {
		if (this.options.ecmaVersion < 8 || !this.isContextual(`async`)) return !1;
		op.lastIndex = this.pos;
		var e = op.exec(this.input), t = this.pos + e[0].length, n;
		return !tp.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === `function` && (t + 8 === this.input.length || !(Xf(n = this.fullCharCodeAt(t + 8)) || n === 92));
	}, Y.isUsingKeyword = function(e, t) {
		if (this.options.ecmaVersion < 17 || !this.isContextual(e ? `await` : `using`)) return !1;
		op.lastIndex = this.pos;
		var n = op.exec(this.input), r = this.pos + n[0].length;
		if (tp.test(this.input.slice(this.pos, r))) return !1;
		if (e) {
			var i = r + 5, a;
			if (this.input.slice(r, i) !== `using` || i === this.input.length || Xf(a = this.fullCharCodeAt(i)) || a === 92) return !1;
			op.lastIndex = i;
			var o = op.exec(this.input);
			if (r = i + o[0].length, o && tp.test(this.input.slice(i, r))) return !1;
		}
		var s = this.fullCharCodeAt(r);
		if (!Yf(s) && s !== 92) return !1;
		var c = r;
		do
			r += s <= 65535 ? 1 : 2;
		while (Xf(s = this.fullCharCodeAt(r)));
		if (s === 92) return !0;
		var l = this.input.slice(c, r);
		return !(Gf.test(l) || t && l === `of`);
	}, Y.isAwaitUsing = function(e) {
		return this.isUsingKeyword(!0, e);
	}, Y.isUsing = function(e) {
		return this.isUsingKeyword(!1, e);
	}, Y.parseStatement = function(e, t, n) {
		var r = this.type, i = this.startNode(), a;
		switch (this.isLet(e) && (r = q._var, a = `let`), r) {
			case q._break:
			case q._continue: return this.parseBreakContinueStatement(i, r.keyword);
			case q._debugger: return this.parseDebuggerStatement(i);
			case q._do: return this.parseDoStatement(i);
			case q._for: return this.parseForStatement(i);
			case q._function: return e && (this.strict || e !== `if` && e !== `label`) && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
			case q._class: return e && this.unexpected(), this.parseClass(i, !0);
			case q._if: return this.parseIfStatement(i);
			case q._return: return this.parseReturnStatement(i);
			case q._switch: return this.parseSwitchStatement(i);
			case q._throw: return this.parseThrowStatement(i);
			case q._try: return this.parseTryStatement(i);
			case q._const:
			case q._var: return a = a || this.value, e && a !== `var` && this.unexpected(), this.parseVarStatement(i, a);
			case q._while: return this.parseWhileStatement(i);
			case q._with: return this.parseWithStatement(i);
			case q.braceL: return this.parseBlock(!0, i);
			case q.semi: return this.parseEmptyStatement(i);
			case q._export:
			case q._import:
				if (this.options.ecmaVersion > 10 && r === q._import) {
					op.lastIndex = this.pos;
					var o = op.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
					if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
				}
				return this.options.allowImportExportEverywhere || (t || this.raise(this.start, `'import' and 'export' may only appear at the top level`), this.inModule || this.raise(this.start, `'import' and 'export' may appear only with 'sourceType: module'`)), r === q._import ? this.parseImport(i) : this.parseExport(i, n);
			default:
				if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
				var l = this.isAwaitUsing(!1) ? `await using` : this.isUsing(!1) ? `using` : null;
				if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), l === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, `VariableDeclaration`);
				var u = this.value, d = this.parseExpression();
				return r === q.name && d.type === `Identifier` && this.eat(q.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
		}
	}, Y.parseBreakContinueStatement = function(e, t) {
		var n = t === `break`;
		this.next(), this.eat(q.semi) || this.insertSemicolon() ? e.label = null : this.type === q.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
		for (var r = 0; r < this.labels.length; ++r) {
			var i = this.labels[r];
			if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === `loop`) || e.label && n)) break;
		}
		return r === this.labels.length && this.raise(e.start, `Unsyntactic ` + t), this.finishNode(e, n ? `BreakStatement` : `ContinueStatement`);
	}, Y.parseDebuggerStatement = function(e) {
		return this.next(), this.semicolon(), this.finishNode(e, `DebuggerStatement`);
	}, Y.parseDoStatement = function(e) {
		return this.next(), this.labels.push(Kp), e.body = this.parseStatement(`do`), this.labels.pop(), this.expect(q._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(q.semi) : this.semicolon(), this.finishNode(e, `DoWhileStatement`);
	}, Y.parseForStatement = function(e) {
		this.next();
		var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual(`await`) ? this.lastTokStart : -1;
		if (this.labels.push(Kp), this.enterScope(0), this.expect(q.parenL), this.type === q.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
		var n = this.isLet();
		if (this.type === q._var || this.type === q._const || n) {
			var r = this.startNode(), i = n ? `let` : this.value;
			return this.next(), this.parseVar(r, !0, i), this.finishNode(r, `VariableDeclaration`), this.parseForAfterInit(e, r, t);
		}
		var a = this.isContextual(`let`), o = !1, s = this.isUsing(!0) ? `using` : this.isAwaitUsing(!0) ? `await using` : null;
		if (s) {
			var c = this.startNode();
			return this.next(), s === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.parseVar(c, !0, s), this.finishNode(c, `VariableDeclaration`), this.parseForAfterInit(e, c, t);
		}
		var l = this.containsEsc, u = new Gp(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, `await`) : this.parseExpression(!0, u);
		return this.type === q._in || (o = this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? (t > -1 ? (this.type === q._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === `Identifier` && f.name === `async` ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, `The left-hand side of a for-of loop may not start with 'let'.`), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
	}, Y.parseForAfterInit = function(e, t, n) {
		return (this.type === q._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) && t.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === q._in ? n > -1 && this.unexpected(n) : e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
	}, Y.parseFunctionStatement = function(e, t, n) {
		return this.next(), this.parseFunction(e, Yp | (n ? 0 : Xp), !1, t);
	}, Y.parseIfStatement = function(e) {
		return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement(`if`), e.alternate = this.eat(q._else) ? this.parseStatement(`if`) : null, this.finishNode(e, `IfStatement`);
	}, Y.parseReturnStatement = function(e) {
		return this.allowReturn || this.raise(this.start, `'return' outside of function`), this.next(), this.eat(q.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, `ReturnStatement`);
	}, Y.parseSwitchStatement = function(e) {
		this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(q.braceL), this.labels.push(qp), this.enterScope(Np);
		for (var t, n = !1; this.type !== q.braceR;) if (this.type === q._case || this.type === q._default) {
			var r = this.type === q._case;
			t && this.finishNode(t, `SwitchCase`), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, `Multiple default clauses`), n = !0, t.test = null), this.expect(q.colon);
		} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
		return this.exitScope(), t && this.finishNode(t, `SwitchCase`), this.next(), this.labels.pop(), this.finishNode(e, `SwitchStatement`);
	}, Y.parseThrowStatement = function(e) {
		return this.next(), tp.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, `Illegal newline after throw`), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, `ThrowStatement`);
	};
	var Jp = [];
	Y.parseCatchClauseParam = function() {
		var e = this.parseBindingAtom(), t = e.type === `Identifier`;
		return this.enterScope(t ? Op : 0), this.checkLValPattern(e, t ? Bp : Rp), this.expect(q.parenR), e;
	}, Y.parseTryStatement = function(e) {
		if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === q._catch) {
			var t = this.startNode();
			this.next(), this.eat(q.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, `CatchClause`);
		}
		return e.finalizer = this.eat(q._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, `Missing catch or finally clause`), this.finishNode(e, `TryStatement`);
	}, Y.parseVarStatement = function(e, t, n) {
		return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, `VariableDeclaration`);
	}, Y.parseWhileStatement = function(e) {
		return this.next(), e.test = this.parseParenExpression(), this.labels.push(Kp), e.body = this.parseStatement(`while`), this.labels.pop(), this.finishNode(e, `WhileStatement`);
	}, Y.parseWithStatement = function(e) {
		return this.strict && this.raise(this.start, `'with' in strict mode`), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement(`with`), this.finishNode(e, `WithStatement`);
	}, Y.parseEmptyStatement = function(e) {
		return this.next(), this.finishNode(e, `EmptyStatement`);
	}, Y.parseLabeledStatement = function(e, t, n, r) {
		for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, `Label '` + t + `' is already declared`);
		for (var o = this.type.isLoop ? `loop` : this.type === q._switch ? `switch` : null, s = this.labels.length - 1; s >= 0; s--) {
			var c = this.labels[s];
			if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
			else break;
		}
		return this.labels.push({
			name: t,
			kind: o,
			statementStart: this.start
		}), e.body = this.parseStatement(r ? r.indexOf(`label`) === -1 ? r + `label` : r : `label`), this.labels.pop(), e.label = n, this.finishNode(e, `LabeledStatement`);
	}, Y.parseExpressionStatement = function(e, t) {
		return e.expression = t, this.semicolon(), this.finishNode(e, `ExpressionStatement`);
	}, Y.parseBlock = function(e, t, n) {
		for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(q.braceL), e && this.enterScope(0); this.type !== q.braceR;) {
			var r = this.parseStatement(null);
			t.body.push(r);
		}
		return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, `BlockStatement`);
	}, Y.parseFor = function(e, t) {
		return e.init = t, this.expect(q.semi), e.test = this.type === q.semi ? null : this.parseExpression(), this.expect(q.semi), e.update = this.type === q.parenR ? null : this.parseExpression(), this.expect(q.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, `ForStatement`);
	}, Y.parseForIn = function(e, t) {
		var n = this.type === q._in;
		return this.next(), t.type === `VariableDeclaration` && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== `var` || t.declarations[0].id.type !== `Identifier`) && this.raise(t.start, (n ? `for-in` : `for-of`) + ` loop variable declaration may not have an initializer`), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(q.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? `ForInStatement` : `ForOfStatement`);
	}, Y.parseVar = function(e, t, n, r) {
		for (e.declarations = [], e.kind = n;;) {
			var i = this.startNode();
			if (this.parseVarId(i, n), this.eat(q.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === `const` && !(this.type === q._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? this.unexpected() : !r && (n === `using` || n === `await using`) && this.options.ecmaVersion >= 17 && this.type !== q._in && !this.isContextual(`of`) ? this.raise(this.lastTokEnd, `Missing initializer in ` + n + ` declaration`) : !r && i.id.type !== `Identifier` && !(t && (this.type === q._in || this.isContextual(`of`))) ? this.raise(this.lastTokEnd, `Complex binding patterns require an initialization value`) : i.init = null, e.declarations.push(this.finishNode(i, `VariableDeclarator`)), !this.eat(q.comma)) break;
		}
		return e;
	}, Y.parseVarId = function(e, t) {
		e.id = t === `using` || t === `await using` ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === `var` ? Lp : Rp, !1);
	};
	var Yp = 1;
	var Xp = 2;
	var Zp = 4;
	Y.parseFunction = function(e, t, n, r, i) {
		this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === q.star && t & Xp && this.unexpected(), e.generator = this.eat(q.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Yp && (e.id = t & Zp && this.type !== q.name ? null : this.parseIdent(), e.id && !(t & Xp) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Lp : Rp : zp));
		var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
		return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Fp(e.async, e.generator)), t & Yp || (e.id = this.type === q.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Yp ? `FunctionDeclaration` : `FunctionExpression`);
	}, Y.parseFunctionParams = function(e) {
		this.expect(q.parenL), e.params = this.parseBindingList(q.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
	}, Y.parseClass = function(e, t) {
		this.next();
		var n = this.strict;
		this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
		var r = this.enterClassBody(), i = this.startNode(), a = !1;
		for (i.body = [], this.expect(q.braceL); this.type !== q.braceR;) {
			var o = this.parseClassElement(e.superClass !== null);
			o && (i.body.push(o), o.type === `MethodDefinition` && o.kind === `constructor` ? (a && this.raiseRecoverable(o.start, `Duplicate constructor in the same class`), a = !0) : o.key && o.key.type === `PrivateIdentifier` && Qp(r, o) && this.raiseRecoverable(o.key.start, `Identifier '#` + o.key.name + `' has already been declared`));
		}
		return this.strict = n, this.next(), e.body = this.finishNode(i, `ClassBody`), this.exitClassBody(), this.finishNode(e, t ? `ClassDeclaration` : `ClassExpression`);
	}, Y.parseClassElement = function(e) {
		if (this.eat(q.semi)) return null;
		var t = this.options.ecmaVersion, n = this.startNode(), r = ``, i = !1, a = !1, o = `method`, s = !1;
		if (this.eatContextual(`static`)) {
			if (t >= 13 && this.eat(q.braceL)) return this.parseClassStaticBlock(n), n;
			this.isClassElementNameStart() || this.type === q.star ? s = !0 : r = `static`;
		}
		if (n.static = s, !r && t >= 8 && this.eatContextual(`async`) && ((this.isClassElementNameStart() || this.type === q.star) && !this.canInsertSemicolon() ? a = !0 : r = `async`), !r && (t >= 9 || !a) && this.eat(q.star) && (i = !0), !r && !a && !i) {
			var c = this.value;
			(this.eatContextual(`get`) || this.eatContextual(`set`)) && (this.isClassElementNameStart() ? o = c : r = c);
		}
		if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, `Identifier`)) : this.parseClassElementName(n), t < 13 || this.type === q.parenL || o !== `method` || i || a) {
			var l = !n.static && $p(n, `constructor`), u = l && e;
			l && o !== `method` && this.raise(n.key.start, `Constructor can't have get/set modifier`), n.kind = l ? `constructor` : o, this.parseClassMethod(n, i, a, u);
		} else this.parseClassField(n);
		return n;
	}, Y.isClassElementNameStart = function() {
		return this.type === q.name || this.type === q.privateId || this.type === q.num || this.type === q.string || this.type === q.bracketL || this.type.keyword;
	}, Y.parseClassElementName = function(e) {
		this.type === q.privateId ? (this.value === `constructor` && this.raise(this.start, `Classes can't have an element named '#constructor'`), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
	}, Y.parseClassMethod = function(e, t, n, r) {
		var i = e.key;
		e.kind === `constructor` ? (t && this.raise(i.start, `Constructor can't be a generator`), n && this.raise(i.start, `Constructor can't be an async method`)) : e.static && $p(e, `prototype`) && this.raise(i.start, `Classes may not have a static property named prototype`);
		var a = e.value = this.parseMethod(t, n, r);
		return e.kind === `get` && a.params.length !== 0 && this.raiseRecoverable(a.start, `getter should have no params`), e.kind === `set` && a.params.length !== 1 && this.raiseRecoverable(a.start, `setter should have exactly one param`), e.kind === `set` && a.params[0].type === `RestElement` && this.raiseRecoverable(a.params[0].start, `Setter cannot use rest params`), this.finishNode(e, `MethodDefinition`);
	}, Y.parseClassField = function(e) {
		return $p(e, `constructor`) ? this.raise(e.key.start, `Classes can't have a field named 'constructor'`) : e.static && $p(e, `prototype`) && this.raise(e.key.start, `Classes can't have a static field named 'prototype'`), this.eat(q.eq) ? (this.enterScope(Mp | kp), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, `PropertyDefinition`);
	}, Y.parseClassStaticBlock = function(e) {
		e.body = [];
		var t = this.labels;
		for (this.labels = [], this.enterScope(jp | kp); this.type !== q.braceR;) {
			var n = this.parseStatement(null);
			e.body.push(n);
		}
		return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, `StaticBlock`);
	}, Y.parseClassId = function(e, t) {
		this.type === q.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, Rp, !1)) : (t === !0 && this.unexpected(), e.id = null);
	}, Y.parseClassSuper = function(e) {
		e.superClass = this.eat(q._extends) ? this.parseExprSubscripts(null, !1) : null;
	}, Y.enterClassBody = function() {
		var e = {
			declared: Object.create(null),
			used: []
		};
		return this.privateNameStack.push(e), e.declared;
	}, Y.exitClassBody = function() {
		var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
		if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
			var o = n[a];
			up(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, `Private field '#` + o.name + `' must be declared in an enclosing class`));
		}
	};
	function Qp(e, t) {
		var n = t.key.name, r = e[n], i = `true`;
		return t.type === `MethodDefinition` && (t.kind === `get` || t.kind === `set`) && (i = (t.static ? `s` : `i`) + t.kind), r === `iget` && i === `iset` || r === `iset` && i === `iget` || r === `sget` && i === `sset` || r === `sset` && i === `sget` ? (e[n] = `true`, !1) : r ? !0 : (e[n] = i, !1);
	}
	function $p(e, t) {
		var n = e.computed, r = e.key;
		return !n && (r.type === `Identifier` && r.name === t || r.type === `Literal` && r.value === t);
	}
	Y.parseExportAllDeclaration = function(e, t) {
		return this.options.ecmaVersion >= 11 && (this.eatContextual(`as`) ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual(`from`), this.type !== q.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ExportAllDeclaration`);
	}, Y.parseExport = function(e, t) {
		if (this.next(), this.eat(q.star)) return this.parseExportAllDeclaration(e, t);
		if (this.eat(q._default)) return this.checkExport(t, `default`, this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, `ExportDefaultDeclaration`);
		if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === `VariableDeclaration` ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
		else {
			if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual(`from`)) this.type !== q.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
			else {
				for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
					var i = r[n];
					this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === `Literal` && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
				}
				e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
			}
			this.semicolon();
		}
		return this.finishNode(e, `ExportNamedDeclaration`);
	}, Y.parseExportDeclaration = function(e) {
		return this.parseStatement(null);
	}, Y.parseExportDefaultDeclaration = function() {
		var e;
		if (this.type === q._function || (e = this.isAsyncFunction())) {
			var t = this.startNode();
			return this.next(), e && this.next(), this.parseFunction(t, Yp | Zp, !1, e);
		} else if (this.type === q._class) {
			var n = this.startNode();
			return this.parseClass(n, `nullableID`);
		} else {
			var r = this.parseMaybeAssign();
			return this.semicolon(), r;
		}
	}, Y.checkExport = function(e, t, n) {
		e && (typeof t != `string` && (t = t.type === `Identifier` ? t.name : t.value), up(e, t) && this.raiseRecoverable(n, `Duplicate export '` + t + `'`), e[t] = !0);
	}, Y.checkPatternExport = function(e, t) {
		var n = t.type;
		if (n === `Identifier`) this.checkExport(e, t, t.start);
		else if (n === `ObjectPattern`) for (var r = 0, i = t.properties; r < i.length; r += 1) {
			var a = i[r];
			this.checkPatternExport(e, a);
		}
		else if (n === `ArrayPattern`) for (var o = 0, s = t.elements; o < s.length; o += 1) {
			var c = s[o];
			c && this.checkPatternExport(e, c);
		}
		else n === `Property` ? this.checkPatternExport(e, t.value) : n === `AssignmentPattern` ? this.checkPatternExport(e, t.left) : n === `RestElement` && this.checkPatternExport(e, t.argument);
	}, Y.checkVariableExport = function(e, t) {
		if (e) for (var n = 0, r = t; n < r.length; n += 1) {
			var i = r[n];
			this.checkPatternExport(e, i.id);
		}
	}, Y.shouldParseExportStatement = function() {
		return this.type.keyword === `var` || this.type.keyword === `const` || this.type.keyword === `class` || this.type.keyword === `function` || this.isLet() || this.isAsyncFunction();
	}, Y.parseExportSpecifier = function(e) {
		var t = this.startNode();
		return t.local = this.parseModuleExportName(), t.exported = this.eatContextual(`as`) ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, `ExportSpecifier`);
	}, Y.parseExportSpecifiers = function(e) {
		var t = [], n = !0;
		for (this.expect(q.braceL); !this.eat(q.braceR);) {
			if (n) n = !1;
			else if (this.expect(q.comma), this.afterTrailingComma(q.braceR)) break;
			t.push(this.parseExportSpecifier(e));
		}
		return t;
	}, Y.parseImport = function(e) {
		return this.next(), this.type === q.string ? (e.specifiers = Jp, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual(`from`), e.source = this.type === q.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ImportDeclaration`);
	}, Y.parseImportSpecifier = function() {
		var e = this.startNode();
		return e.imported = this.parseModuleExportName(), this.eatContextual(`as`) ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, Rp), this.finishNode(e, `ImportSpecifier`);
	}, Y.parseImportDefaultSpecifier = function() {
		var e = this.startNode();
		return e.local = this.parseIdent(), this.checkLValSimple(e.local, Rp), this.finishNode(e, `ImportDefaultSpecifier`);
	}, Y.parseImportNamespaceSpecifier = function() {
		var e = this.startNode();
		return this.next(), this.expectContextual(`as`), e.local = this.parseIdent(), this.checkLValSimple(e.local, Rp), this.finishNode(e, `ImportNamespaceSpecifier`);
	}, Y.parseImportSpecifiers = function() {
		var e = [], t = !0;
		if (this.type === q.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(q.comma))) return e;
		if (this.type === q.star) return e.push(this.parseImportNamespaceSpecifier()), e;
		for (this.expect(q.braceL); !this.eat(q.braceR);) {
			if (t) t = !1;
			else if (this.expect(q.comma), this.afterTrailingComma(q.braceR)) break;
			e.push(this.parseImportSpecifier());
		}
		return e;
	}, Y.parseWithClause = function() {
		var e = [];
		if (!this.eat(q._with)) return e;
		this.expect(q.braceL);
		for (var t = {}, n = !0; !this.eat(q.braceR);) {
			if (n) n = !1;
			else if (this.expect(q.comma), this.afterTrailingComma(q.braceR)) break;
			var r = this.parseImportAttribute(), i = r.key.type === `Identifier` ? r.key.name : r.key.value;
			up(t, i) && this.raiseRecoverable(r.key.start, `Duplicate attribute key '` + i + `'`), t[i] = !0, e.push(r);
		}
		return e;
	}, Y.parseImportAttribute = function() {
		var e = this.startNode();
		return e.key = this.type === q.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`), this.expect(q.colon), this.type !== q.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, `ImportAttribute`);
	}, Y.parseModuleExportName = function() {
		if (this.options.ecmaVersion >= 13 && this.type === q.string) {
			var e = this.parseLiteral(this.value);
			return hp.test(e.value) && this.raise(e.start, `An export name cannot include a lone surrogate.`), e;
		}
		return this.parseIdent(!0);
	}, Y.adaptDirectivePrologue = function(e) {
		for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
	}, Y.isDirectiveCandidate = function(e) {
		return this.options.ecmaVersion >= 5 && e.type === `ExpressionStatement` && e.expression.type === `Literal` && typeof e.expression.value == `string` && (this.input[e.start] === `"` || this.input[e.start] === `'`);
	};
	var em = J.prototype;
	em.toAssignable = function(e, t, n) {
		if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
			case `Identifier`:
				this.inAsync && e.name === `await` && this.raise(e.start, `Cannot use 'await' as identifier inside an async function`);
				break;
			case `ObjectPattern`:
			case `ArrayPattern`:
			case `AssignmentPattern`:
			case `RestElement`: break;
			case `ObjectExpression`:
				e.type = `ObjectPattern`, n && this.checkPatternErrors(n, !0);
				for (var r = 0, i = e.properties; r < i.length; r += 1) {
					var a = i[r];
					this.toAssignable(a, t), a.type === `RestElement` && (a.argument.type === `ArrayPattern` || a.argument.type === `ObjectPattern`) && this.raise(a.argument.start, `Unexpected token`);
				}
				break;
			case `Property`:
				e.kind !== `init` && this.raise(e.key.start, `Object pattern can't contain getter or setter`), this.toAssignable(e.value, t);
				break;
			case `ArrayExpression`:
				e.type = `ArrayPattern`, n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
				break;
			case `SpreadElement`:
				e.type = `RestElement`, this.toAssignable(e.argument, t), e.argument.type === `AssignmentPattern` && this.raise(e.argument.start, `Rest elements cannot have a default value`);
				break;
			case `AssignmentExpression`:
				e.operator !== `=` && this.raise(e.left.end, `Only '=' operator can be used for specifying default value.`), e.type = `AssignmentPattern`, delete e.operator, this.toAssignable(e.left, t);
				break;
			case `ParenthesizedExpression`:
				this.toAssignable(e.expression, t, n);
				break;
			case `ChainExpression`:
				this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
				break;
			case `MemberExpression`: if (!t) break;
			default: this.raise(e.start, `Assigning to rvalue`);
		}
		else n && this.checkPatternErrors(n, !0);
		return e;
	}, em.toAssignableList = function(e, t) {
		for (var n = e.length, r = 0; r < n; r++) {
			var i = e[r];
			i && this.toAssignable(i, t);
		}
		if (n) {
			var a = e[n - 1];
			this.options.ecmaVersion === 6 && t && a && a.type === `RestElement` && a.argument.type !== `Identifier` && this.unexpected(a.argument.start);
		}
		return e;
	}, em.parseSpread = function(e) {
		var t = this.startNode();
		return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, `SpreadElement`);
	}, em.parseRestBinding = function() {
		var e = this.startNode();
		return this.next(), this.options.ecmaVersion === 6 && this.type !== q.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, `RestElement`);
	}, em.parseBindingAtom = function() {
		if (this.options.ecmaVersion >= 6) switch (this.type) {
			case q.bracketL:
				var e = this.startNode();
				return this.next(), e.elements = this.parseBindingList(q.bracketR, !0, !0), this.finishNode(e, `ArrayPattern`);
			case q.braceL: return this.parseObj(!0);
		}
		return this.parseIdent();
	}, em.parseBindingList = function(e, t, n, r) {
		for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(q.comma), t && this.type === q.comma) i.push(null);
		else if (n && this.afterTrailingComma(e)) break;
		else if (this.type === q.ellipsis) {
			var o = this.parseRestBinding();
			this.parseBindingListItem(o), i.push(o), this.type === q.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.expect(e);
			break;
		} else i.push(this.parseAssignableListItem(r));
		return i;
	}, em.parseAssignableListItem = function(e) {
		var t = this.parseMaybeDefault(this.start, this.startLoc);
		return this.parseBindingListItem(t), t;
	}, em.parseBindingListItem = function(e) {
		return e;
	}, em.parseMaybeDefault = function(e, t, n) {
		if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(q.eq)) return n;
		var r = this.startNodeAt(e, t);
		return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, `AssignmentPattern`);
	}, em.checkLValSimple = function(e, t, n) {
		t === void 0 && (t = Ip);
		var r = t !== Ip;
		switch (e.type) {
			case `Identifier`:
				this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? `Binding ` : `Assigning to `) + e.name + ` in strict mode`), r && (t === Rp && e.name === `let` && this.raiseRecoverable(e.start, `let is disallowed as a lexically bound name`), n && (up(n, e.name) && this.raiseRecoverable(e.start, `Argument name clash`), n[e.name] = !0), t !== Vp && this.declareName(e.name, t, e.start));
				break;
			case `ChainExpression`:
				this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
				break;
			case `MemberExpression`:
				r && this.raiseRecoverable(e.start, `Binding member expression`);
				break;
			case `ParenthesizedExpression`: return r && this.raiseRecoverable(e.start, `Binding parenthesized expression`), this.checkLValSimple(e.expression, t, n);
			default: this.raise(e.start, (r ? `Binding` : `Assigning to`) + ` rvalue`);
		}
	}, em.checkLValPattern = function(e, t, n) {
		switch (t === void 0 && (t = Ip), e.type) {
			case `ObjectPattern`:
				for (var r = 0, i = e.properties; r < i.length; r += 1) {
					var a = i[r];
					this.checkLValInnerPattern(a, t, n);
				}
				break;
			case `ArrayPattern`:
				for (var o = 0, s = e.elements; o < s.length; o += 1) {
					var c = s[o];
					c && this.checkLValInnerPattern(c, t, n);
				}
				break;
			default: this.checkLValSimple(e, t, n);
		}
	}, em.checkLValInnerPattern = function(e, t, n) {
		switch (t === void 0 && (t = Ip), e.type) {
			case `Property`:
				this.checkLValInnerPattern(e.value, t, n);
				break;
			case `AssignmentPattern`:
				this.checkLValPattern(e.left, t, n);
				break;
			case `RestElement`:
				this.checkLValPattern(e.argument, t, n);
				break;
			default: this.checkLValPattern(e, t, n);
		}
	};
	var tm = function(e, t, n, r, i) {
		this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
	};
	var X = {
		b_stat: new tm(`{`, !1),
		b_expr: new tm(`{`, !0),
		b_tmpl: new tm("${", !1),
		p_stat: new tm(`(`, !1),
		p_expr: new tm(`(`, !0),
		q_tmpl: new tm("`", !0, !0, function(e) {
			return e.tryReadTemplateToken();
		}),
		f_stat: new tm(`function`, !1),
		f_expr: new tm(`function`, !0),
		f_expr_gen: new tm(`function`, !0, !1, null, !0),
		f_gen: new tm(`function`, !1, !1, null, !0)
	};
	var nm = J.prototype;
	nm.initialContext = function() {
		return [X.b_stat];
	}, nm.curContext = function() {
		return this.context[this.context.length - 1];
	}, nm.braceIsBlock = function(e) {
		var t = this.curContext();
		return t === X.f_expr || t === X.f_stat ? !0 : e === q.colon && (t === X.b_stat || t === X.b_expr) ? !t.isExpr : e === q._return || e === q.name && this.exprAllowed ? tp.test(this.input.slice(this.lastTokEnd, this.start)) : e === q._else || e === q.semi || e === q.eof || e === q.parenR || e === q.arrow ? !0 : e === q.braceL ? t === X.b_stat : e === q._var || e === q._const || e === q.name ? !1 : !this.exprAllowed;
	}, nm.inGeneratorContext = function() {
		for (var e = this.context.length - 1; e >= 1; e--) {
			var t = this.context[e];
			if (t.token === `function`) return t.generator;
		}
		return !1;
	}, nm.updateContext = function(e) {
		var t, n = this.type;
		n.keyword && e === q.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
	}, nm.overrideContext = function(e) {
		this.curContext() !== e && (this.context[this.context.length - 1] = e);
	}, q.parenR.updateContext = q.braceR.updateContext = function() {
		if (this.context.length === 1) {
			this.exprAllowed = !0;
			return;
		}
		var e = this.context.pop();
		e === X.b_stat && this.curContext().token === `function` && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
	}, q.braceL.updateContext = function(e) {
		this.context.push(this.braceIsBlock(e) ? X.b_stat : X.b_expr), this.exprAllowed = !0;
	}, q.dollarBraceL.updateContext = function() {
		this.context.push(X.b_tmpl), this.exprAllowed = !0;
	}, q.parenL.updateContext = function(e) {
		var t = e === q._if || e === q._for || e === q._with || e === q._while;
		this.context.push(t ? X.p_stat : X.p_expr), this.exprAllowed = !0;
	}, q.incDec.updateContext = function() {}, q._function.updateContext = q._class.updateContext = function(e) {
		e.beforeExpr && e !== q._else && !(e === q.semi && this.curContext() !== X.p_stat) && !(e === q._return && tp.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === q.colon || e === q.braceL) && this.curContext() === X.b_stat) ? this.context.push(X.f_expr) : this.context.push(X.f_stat), this.exprAllowed = !1;
	}, q.colon.updateContext = function() {
		this.curContext().token === `function` && this.context.pop(), this.exprAllowed = !0;
	}, q.backQuote.updateContext = function() {
		this.curContext() === X.q_tmpl ? this.context.pop() : this.context.push(X.q_tmpl), this.exprAllowed = !1;
	}, q.star.updateContext = function(e) {
		if (e === q._function) {
			var t = this.context.length - 1;
			this.context[t] === X.f_expr ? this.context[t] = X.f_expr_gen : this.context[t] = X.f_gen;
		}
		this.exprAllowed = !0;
	}, q.name.updateContext = function(e) {
		var t = !1;
		this.options.ecmaVersion >= 6 && e !== q.dot && (this.value === `of` && !this.exprAllowed || this.value === `yield` && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
	};
	var Z = J.prototype;
	Z.checkPropClash = function(e, t, n) {
		if (!(this.options.ecmaVersion >= 9 && e.type === `SpreadElement`) && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
			var r = e.key, i;
			switch (r.type) {
				case `Identifier`:
					i = r.name;
					break;
				case `Literal`:
					i = String(r.value);
					break;
				default: return;
			}
			var a = e.kind;
			if (this.options.ecmaVersion >= 6) {
				i === `__proto__` && a === `init` && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, `Redefinition of __proto__ property`)), t.proto = !0);
				return;
			}
			i = `$` + i;
			var o = t[i];
			o ? (a === `init` ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, `Redefinition of property`) : o = t[i] = {
				init: !1,
				get: !1,
				set: !1
			}, o[a] = !0;
		}
	}, Z.parseExpression = function(e, t) {
		var n = this.start, r = this.startLoc, i = this.parseMaybeAssign(e, t);
		if (this.type === q.comma) {
			var a = this.startNodeAt(n, r);
			for (a.expressions = [i]; this.eat(q.comma);) a.expressions.push(this.parseMaybeAssign(e, t));
			return this.finishNode(a, `SequenceExpression`);
		}
		return i;
	}, Z.parseMaybeAssign = function(e, t, n) {
		if (this.isContextual(`yield`)) {
			if (this.inGenerator) return this.parseYield(e);
			this.exprAllowed = !1;
		}
		var r = !1, i = -1, a = -1, o = -1;
		t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new Gp(), r = !0);
		var s = this.start, c = this.startLoc;
		(this.type === q.parenL || this.type === q.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === `await`);
		var l = this.parseMaybeConditional(e, t);
		if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
			var u = this.startNodeAt(s, c);
			return u.operator = this.value, this.type === q.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === q.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, `AssignmentExpression`);
		} else r && this.checkExpressionErrors(t, !0);
		return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
	}, Z.parseMaybeConditional = function(e, t) {
		var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
		if (this.checkExpressionErrors(t)) return i;
		if (this.eat(q.question)) {
			var a = this.startNodeAt(n, r);
			return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(q.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, `ConditionalExpression`);
		}
		return i;
	}, Z.parseExprOps = function(e, t) {
		var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
		return this.checkExpressionErrors(t) || i.start === n && i.type === `ArrowFunctionExpression` ? i : this.parseExprOp(i, n, r, -1, e);
	}, Z.parseExprOp = function(e, t, n, r, i) {
		var a = this.type.binop;
		if (a != null && (!i || this.type !== q._in) && a > r) {
			var o = this.type === q.logicalOR || this.type === q.logicalAND, s = this.type === q.coalesce;
			s && (a = q.logicalAND.binop);
			var c = this.value;
			this.next();
			var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
			return (o && this.type === q.coalesce || s && (this.type === q.logicalOR || this.type === q.logicalAND)) && this.raiseRecoverable(this.start, `Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses`), this.parseExprOp(f, t, n, r, i);
		}
		return e;
	}, Z.buildBinary = function(e, t, n, r, i, a) {
		r.type === `PrivateIdentifier` && this.raise(r.start, `Private identifier can only be left side of binary expression`);
		var o = this.startNodeAt(e, t);
		return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? `LogicalExpression` : `BinaryExpression`);
	}, Z.parseMaybeUnary = function(e, t, n, r) {
		var i = this.start, a = this.startLoc, o;
		if (this.isContextual(`await`) && this.canAwait) o = this.parseAwait(r), t = !0;
		else if (this.type.prefix) {
			var s = this.startNode(), c = this.type === q.incDec;
			s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === `delete` && rm(s.argument) ? this.raiseRecoverable(s.start, `Deleting local variable in strict mode`) : s.operator === `delete` && im(s.argument) ? this.raiseRecoverable(s.start, `Private fields can not be deleted`) : t = !0, o = this.finishNode(s, c ? `UpdateExpression` : `UnaryExpression`);
		} else if (!t && this.type === q.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== q._in && this.unexpected();
		else {
			if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
			for (; this.type.postfix && !this.canInsertSemicolon();) {
				var l = this.startNodeAt(i, a);
				l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, `UpdateExpression`);
			}
		}
		if (!n && this.eat(q.starstar)) if (t) this.unexpected(this.lastTokStart);
		else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), `**`, !1);
		else return o;
	};
	function rm(e) {
		return e.type === `Identifier` || e.type === `ParenthesizedExpression` && rm(e.expression);
	}
	function im(e) {
		return e.type === `MemberExpression` && e.property.type === `PrivateIdentifier` || e.type === `ChainExpression` && im(e.expression) || e.type === `ParenthesizedExpression` && im(e.expression);
	}
	Z.parseExprSubscripts = function(e, t) {
		var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
		if (i.type === `ArrowFunctionExpression` && this.input.slice(this.lastTokStart, this.lastTokEnd) !== `)`) return i;
		var a = this.parseSubscripts(i, n, r, !1, t);
		return e && a.type === `MemberExpression` && (e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1), e.trailingComma >= a.start && (e.trailingComma = -1)), a;
	}, Z.parseSubscripts = function(e, t, n, r, i) {
		for (var a = this.options.ecmaVersion >= 8 && e.type === `Identifier` && e.name === `async` && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
			var s = this.parseSubscript(e, t, n, r, a, o, i);
			if (s.optional && (o = !0), s === e || s.type === `ArrowFunctionExpression`) {
				if (o) {
					var c = this.startNodeAt(t, n);
					c.expression = s, s = this.finishNode(c, `ChainExpression`);
				}
				return s;
			}
			e = s;
		}
	}, Z.shouldParseAsyncArrow = function() {
		return !this.canInsertSemicolon() && this.eat(q.arrow);
	}, Z.parseSubscriptAsyncArrow = function(e, t, n, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
	}, Z.parseSubscript = function(e, t, n, r, i, a, o) {
		var s = this.options.ecmaVersion >= 11, c = s && this.eat(q.questionDot);
		r && c && this.raise(this.lastTokStart, `Optional chaining cannot appear in the callee of new expressions`);
		var l = this.eat(q.bracketL);
		if (l || c && this.type !== q.parenL && this.type !== q.backQuote || this.eat(q.dot)) {
			var u = this.startNodeAt(t, n);
			u.object = e, l ? (u.property = this.parseExpression(), this.expect(q.bracketR)) : this.type === q.privateId && e.type !== `Super` ? u.property = this.parsePrivateIdent() : u.property = this.parseIdent(this.options.allowReserved !== `never`), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, `MemberExpression`);
		} else if (!r && this.eat(q.parenL)) {
			var d = new Gp(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
			this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
			var h = this.parseExprList(q.parenR, this.options.ecmaVersion >= 8, !1, d);
			if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, `Cannot use 'await' as identifier inside an async function`), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
			this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
			var g = this.startNodeAt(t, n);
			g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, `CallExpression`);
		} else if (this.type === q.backQuote) {
			(c || a) && this.raise(this.start, `Optional chaining cannot appear in the tag of tagged template expressions`);
			var _ = this.startNodeAt(t, n);
			_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, `TaggedTemplateExpression`);
		}
		return e;
	}, Z.parseExprAtom = function(e, t, n) {
		this.type === q.slash && this.readRegexp();
		var r, i = this.potentialArrowAt === this.start;
		switch (this.type) {
			case q._super: return this.allowSuper || this.raise(this.start, `'super' keyword outside a method`), r = this.startNode(), this.next(), this.type === q.parenL && !this.allowDirectSuper && this.raise(r.start, `super() call outside constructor of a subclass`), this.type !== q.dot && this.type !== q.bracketL && this.type !== q.parenL && this.unexpected(), this.finishNode(r, `Super`);
			case q._this: return r = this.startNode(), this.next(), this.finishNode(r, `ThisExpression`);
			case q.name:
				var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
				if (this.options.ecmaVersion >= 8 && !s && c.name === `async` && !this.canInsertSemicolon() && this.eat(q._function)) return this.overrideContext(X.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
				if (i && !this.canInsertSemicolon()) {
					if (this.eat(q.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
					if (this.options.ecmaVersion >= 8 && c.name === `async` && this.type === q.name && !s && (!this.potentialArrowInForAwait || this.value !== `of` || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(q.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
				}
				return c;
			case q.regexp:
				var l = this.value;
				return r = this.parseLiteral(l.value), r.regex = {
					pattern: l.pattern,
					flags: l.flags
				}, r;
			case q.num:
			case q.string: return this.parseLiteral(this.value);
			case q._null:
			case q._true:
			case q._false: return r = this.startNode(), r.value = this.type === q._null ? null : this.type === q._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, `Literal`);
			case q.parenL:
				var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
				return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
			case q.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(q.bracketR, !0, !0, e), this.finishNode(r, `ArrayExpression`);
			case q.braceL: return this.overrideContext(X.b_expr), this.parseObj(!1, e);
			case q._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
			case q._class: return this.parseClass(this.startNode(), !1);
			case q._new: return this.parseNew();
			case q.backQuote: return this.parseTemplate();
			case q._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
			default: return this.parseExprAtomDefault();
		}
	}, Z.parseExprAtomDefault = function() {
		this.unexpected();
	}, Z.parseExprImport = function(e) {
		var t = this.startNode();
		if (this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword import`), this.next(), this.type === q.parenL && !e) return this.parseDynamicImport(t);
		if (this.type === q.dot) {
			var n = this.startNodeAt(t.start, t.loc && t.loc.start);
			return n.name = `import`, t.meta = this.finishNode(n, `Identifier`), this.parseImportMeta(t);
		} else this.unexpected();
	}, Z.parseDynamicImport = function(e) {
		if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(q.parenR) ? e.options = null : (this.expect(q.comma), this.afterTrailingComma(q.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(q.parenR) || (this.expect(q.comma), this.afterTrailingComma(q.parenR) || this.unexpected())));
		else if (!this.eat(q.parenR)) {
			var t = this.start;
			this.eat(q.comma) && this.eat(q.parenR) ? this.raiseRecoverable(t, `Trailing comma is not allowed in import()`) : this.unexpected(t);
		}
		return this.finishNode(e, `ImportExpression`);
	}, Z.parseImportMeta = function(e) {
		this.next();
		var t = this.containsEsc;
		return e.property = this.parseIdent(!0), e.property.name !== `meta` && this.raiseRecoverable(e.property.start, `The only valid meta property for import is 'import.meta'`), t && this.raiseRecoverable(e.start, `'import.meta' must not contain escaped characters`), this.options.sourceType !== `module` && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, `Cannot use 'import.meta' outside a module`), this.finishNode(e, `MetaProperty`);
	}, Z.parseLiteral = function(e) {
		var t = this.startNode();
		return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, ``) : t.value.toString()), this.next(), this.finishNode(t, `Literal`);
	}, Z.parseParenExpression = function() {
		this.expect(q.parenL);
		var e = this.parseExpression();
		return this.expect(q.parenR), e;
	}, Z.shouldParseArrow = function(e) {
		return !this.canInsertSemicolon();
	}, Z.parseParenAndDistinguishExpression = function(e, t) {
		var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
		if (this.options.ecmaVersion >= 6) {
			this.next();
			var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new Gp(), f = this.yieldPos, p = this.awaitPos, m;
			for (this.yieldPos = 0, this.awaitPos = 0; this.type !== q.parenR;) if (l ? l = !1 : this.expect(q.comma), a && this.afterTrailingComma(q.parenR, !0)) {
				u = !0;
				break;
			} else if (this.type === q.ellipsis) {
				m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === q.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`);
				break;
			} else c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
			var h = this.lastTokEnd, g = this.lastTokEndLoc;
			if (this.expect(q.parenR), e && this.shouldParseArrow(c) && this.eat(q.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
			(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, `SequenceExpression`, h, g)) : i = c[0];
		} else i = this.parseParenExpression();
		if (this.options.preserveParens) {
			var _ = this.startNodeAt(n, r);
			return _.expression = i, this.finishNode(_, `ParenthesizedExpression`);
		} else return i;
	}, Z.parseParenItem = function(e) {
		return e;
	}, Z.parseParenArrowList = function(e, t, n, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
	};
	var am = [];
	Z.parseNew = function() {
		this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword new`);
		var e = this.startNode();
		if (this.next(), this.options.ecmaVersion >= 6 && this.type === q.dot) {
			var t = this.startNodeAt(e.start, e.loc && e.loc.start);
			t.name = `new`, e.meta = this.finishNode(t, `Identifier`), this.next();
			var n = this.containsEsc;
			return e.property = this.parseIdent(!0), e.property.name !== `target` && this.raiseRecoverable(e.property.start, `The only valid meta property for new is 'new.target'`), n && this.raiseRecoverable(e.start, `'new.target' must not contain escaped characters`), this.allowNewDotTarget || this.raiseRecoverable(e.start, `'new.target' can only be used in functions and class static block`), this.finishNode(e, `MetaProperty`);
		}
		var r = this.start, i = this.startLoc;
		return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), this.eat(q.parenL) ? e.arguments = this.parseExprList(q.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = am, this.finishNode(e, `NewExpression`);
	}, Z.parseTemplateElement = function(e) {
		var t = e.isTagged, n = this.startNode();
		return this.type === q.invalidTemplate ? (t || this.raiseRecoverable(this.start, `Bad escape sequence in untagged template literal`), n.value = {
			raw: this.value.replace(/\r\n?/g, `
`),
			cooked: null
		}) : n.value = {
			raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
			cooked: this.value
		}, this.next(), n.tail = this.type === q.backQuote, this.finishNode(n, `TemplateElement`);
	}, Z.parseTemplate = function(e) {
		e === void 0 && (e = {});
		var t = e.isTagged;
		t === void 0 && (t = !1);
		var n = this.startNode();
		this.next(), n.expressions = [];
		var r = this.parseTemplateElement({ isTagged: t });
		for (n.quasis = [r]; !r.tail;) this.type === q.eof && this.raise(this.pos, `Unterminated template literal`), this.expect(q.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(q.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
		return this.next(), this.finishNode(n, `TemplateLiteral`);
	}, Z.isAsyncProp = function(e) {
		return !e.computed && e.key.type === `Identifier` && e.key.name === `async` && (this.type === q.name || this.type === q.num || this.type === q.string || this.type === q.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === q.star) && !tp.test(this.input.slice(this.lastTokEnd, this.start));
	}, Z.parseObj = function(e, t) {
		var n = this.startNode(), r = !0, i = {};
		for (n.properties = [], this.next(); !this.eat(q.braceR);) {
			if (r) r = !1;
			else if (this.expect(q.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(q.braceR)) break;
			var a = this.parseProperty(e, t);
			e || this.checkPropClash(a, i, t), n.properties.push(a);
		}
		return this.finishNode(n, e ? `ObjectPattern` : `ObjectExpression`);
	}, Z.parseProperty = function(e, t) {
		var n = this.startNode(), r, i, a, o;
		if (this.options.ecmaVersion >= 9 && this.eat(q.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === q.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.finishNode(n, `RestElement`)) : (n.argument = this.parseMaybeAssign(!1, t), this.type === q.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, `SpreadElement`));
		this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(q.star)));
		var s = this.containsEsc;
		return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(q.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, `Property`);
	}, Z.parseGetterSetter = function(e) {
		var t = e.key.name;
		this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
		var n = e.kind === `get` ? 0 : 1;
		if (e.value.params.length !== n) {
			var r = e.value.start;
			e.kind === `get` ? this.raiseRecoverable(r, `getter should have no params`) : this.raiseRecoverable(r, `setter should have exactly one param`);
		} else e.kind === `set` && e.value.params[0].type === `RestElement` && this.raiseRecoverable(e.value.params[0].start, `Setter cannot use rest params`);
	}, Z.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
		(n || r) && this.type === q.colon && this.unexpected(), this.eat(q.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = `init`) : this.options.ecmaVersion >= 6 && this.type === q.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = `init`) : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === `Identifier` && (e.key.name === `get` || e.key.name === `set`) && this.type !== q.comma && this.type !== q.braceR && this.type !== q.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === `Identifier` ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === q.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = `init`, e.shorthand = !0) : this.unexpected();
	}, Z.parsePropertyName = function(e) {
		if (this.options.ecmaVersion >= 6) {
			if (this.eat(q.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(q.bracketR), e.key;
			e.computed = !1;
		}
		return e.key = this.type === q.num || this.type === q.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`);
	}, Z.initFunction = function(e) {
		e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
	}, Z.parseMethod = function(e, t, n) {
		var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
		return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Fp(t, r.generator) | kp | (n ? Ap : 0)), this.expect(q.parenL), r.params = this.parseBindingList(q.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, `FunctionExpression`);
	}, Z.parseArrowExpression = function(e, t, n, r) {
		var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
		return this.enterScope(Fp(n, !1) | Dp), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, `ArrowFunctionExpression`);
	}, Z.parseFunctionBody = function(e, t, n, r) {
		var i = t && this.type !== q.braceL, a = this.strict, o = !1;
		if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
		else {
			var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
			(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, `Illegal 'use strict' directive in function with non-simple parameter list`));
			var c = this.labels;
			this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, Vp), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
		}
		this.exitScope();
	}, Z.isSimpleParamList = function(e) {
		for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== `Identifier`) return !1;
		return !0;
	}, Z.checkParams = function(e, t) {
		for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
			var a = i[r];
			this.checkLValInnerPattern(a, Lp, t ? null : n);
		}
	}, Z.parseExprList = function(e, t, n, r) {
		for (var i = [], a = !0; !this.eat(e);) {
			if (a) a = !1;
			else if (this.expect(q.comma), t && this.afterTrailingComma(e)) break;
			var o = void 0;
			n && this.type === q.comma ? o = null : this.type === q.ellipsis ? (o = this.parseSpread(r), r && this.type === q.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
		}
		return i;
	}, Z.checkUnreserved = function(e) {
		var t = e.start, n = e.end, r = e.name;
		this.inGenerator && r === `yield` && this.raiseRecoverable(t, `Cannot use 'yield' as identifier inside a generator`), this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use 'await' as identifier inside an async function`), !(this.currentThisScope().flags & Pp) && r === `arguments` && this.raiseRecoverable(t, `Cannot use 'arguments' in class field initializer`), this.inClassStaticBlock && (r === `arguments` || r === `await`) && this.raise(t, `Cannot use ` + r + ` in class static initialization block`), this.keywords.test(r) && this.raise(t, `Unexpected keyword '` + r + `'`), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf(`\\`) !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use keyword 'await' outside an async function`), this.raiseRecoverable(t, `The keyword '` + r + `' is reserved`));
	}, Z.parseIdent = function(e) {
		var t = this.parseIdentNode();
		return this.next(!!e), this.finishNode(t, `Identifier`), e || (this.checkUnreserved(t), t.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
	}, Z.parseIdentNode = function() {
		var e = this.startNode();
		return this.type === q.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === `class` || e.name === `function`) && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = q.name) : this.unexpected(), e;
	}, Z.parsePrivateIdent = function() {
		var e = this.startNode();
		return this.type === q.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, `PrivateIdentifier`), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, `Private field '#` + e.name + `' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
	}, Z.parseYield = function(e) {
		this.yieldPos || (this.yieldPos = this.start);
		var t = this.startNode();
		return this.next(), this.type === q.semi || this.canInsertSemicolon() || this.type !== q.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(q.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, `YieldExpression`);
	}, Z.parseAwait = function(e) {
		this.awaitPos || (this.awaitPos = this.start);
		var t = this.startNode();
		return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, `AwaitExpression`);
	};
	var om = J.prototype;
	om.raise = function(e, t) {
		var n = vp(this.input, e);
		t += ` (` + n.line + `:` + n.column + `)`, this.sourceFile && (t += ` in ` + this.sourceFile);
		var r = SyntaxError(t);
		throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
	}, om.raiseRecoverable = om.raise, om.curPosition = function() {
		if (this.options.locations) return new gp(this.curLine, this.pos - this.lineStart);
	};
	var sm = J.prototype;
	var cm = function(e) {
		this.flags = e, this.var = [], this.lexical = [], this.functions = [];
	};
	sm.enterScope = function(e) {
		this.scopeStack.push(new cm(e));
	}, sm.exitScope = function() {
		this.scopeStack.pop();
	}, sm.treatFunctionsAsVarInScope = function(e) {
		return e.flags & wp || !this.inModule && e.flags & Cp;
	}, sm.declareName = function(e, t, n) {
		var r = !1;
		if (t === Rp) {
			var i = this.currentScope();
			r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & Cp && delete this.undefinedExports[e];
		} else if (t === Bp) this.currentScope().lexical.push(e);
		else if (t === zp) {
			var a = this.currentScope();
			r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
		} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
			var s = this.scopeStack[o];
			if (s.lexical.indexOf(e) > -1 && !(s.flags & Op && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
				r = !0;
				break;
			}
			if (s.var.push(e), this.inModule && s.flags & Cp && delete this.undefinedExports[e], s.flags & Pp) break;
		}
		r && this.raiseRecoverable(n, `Identifier '` + e + `' has already been declared`);
	}, sm.checkLocalExport = function(e) {
		this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
	}, sm.currentScope = function() {
		return this.scopeStack[this.scopeStack.length - 1];
	}, sm.currentVarScope = function() {
		for (var e = this.scopeStack.length - 1;; e--) {
			var t = this.scopeStack[e];
			if (t.flags & (Pp | Mp | jp)) return t;
		}
	}, sm.currentThisScope = function() {
		for (var e = this.scopeStack.length - 1;; e--) {
			var t = this.scopeStack[e];
			if (t.flags & (Pp | Mp | jp) && !(t.flags & Dp)) return t;
		}
	};
	var lm = function(e, t, n) {
		this.type = ``, this.start = t, this.end = 0, e.options.locations && (this.loc = new _p(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
	};
	var um = J.prototype;
	um.startNode = function() {
		return new lm(this, this.start, this.startLoc);
	}, um.startNodeAt = function(e, t) {
		return new lm(this, e, t);
	};
	function dm(e, t, n, r) {
		return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
	}
	um.finishNode = function(e, t) {
		return dm.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
	}, um.finishNodeAt = function(e, t, n, r) {
		return dm.call(this, e, t, n, r);
	}, um.copyNode = function(e) {
		var t = new lm(this, e.start, this.startLoc);
		for (var n in e) t[n] = e[n];
		return t;
	};
	var fm = `Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz`;
	var pm = `ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS`;
	var mm = pm + ` Extended_Pictographic`;
	var hm = mm;
	var gm = hm + ` EBase EComp EMod EPres ExtPict`;
	var _m = gm;
	var vm = {
		9: pm,
		10: mm,
		11: hm,
		12: gm,
		13: _m,
		14: _m
	};
	var ym = {
		9: ``,
		10: ``,
		11: ``,
		12: ``,
		13: ``,
		14: `Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji`
	};
	var bm = `Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu`;
	var xm = `Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb`;
	var Sm = xm + ` Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd`;
	var Cm = Sm + ` Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho`;
	var wm = Cm + ` Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi`;
	var Tm = wm + ` Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith`;
	var Em = {
		9: xm,
		10: Sm,
		11: Cm,
		12: wm,
		13: Tm,
		14: Tm + ` ` + fm
	};
	var Dm = {};
	function Om(e) {
		var t = Dm[e] = {
			binary: pp(vm[e] + ` ` + bm),
			binaryOfStrings: pp(ym[e]),
			nonBinary: {
				General_Category: pp(bm),
				Script: pp(Em[e])
			}
		};
		t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
	}
	for (var km = 0, Am = [
		9,
		10,
		11,
		12,
		13,
		14
	]; km < Am.length; km += 1) {
		var jm = Am[km];
		Om(jm);
	}
	var Q = J.prototype;
	var Mm = function(e, t) {
		this.parent = e, this.base = t || this;
	};
	Mm.prototype.separatedFrom = function(e) {
		for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
		return !1;
	}, Mm.prototype.sibling = function() {
		return new Mm(this.parent, this.base);
	};
	var Nm = function(e) {
		this.parser = e, this.validFlags = `gim` + (e.options.ecmaVersion >= 6 ? `uy` : ``) + (e.options.ecmaVersion >= 9 ? `s` : ``) + (e.options.ecmaVersion >= 13 ? `d` : ``) + (e.options.ecmaVersion >= 15 ? `v` : ``), this.unicodeProperties = Dm[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = ``, this.flags = ``, this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = ``, this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
	};
	Nm.prototype.reset = function(e, t, n) {
		var r = n.indexOf(`v`) !== -1, i = n.indexOf(`u`) !== -1;
		this.start = e | 0, this.source = t + ``, this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
	}, Nm.prototype.raise = function(e) {
		this.parser.raiseRecoverable(this.start, `Invalid regular expression: /` + this.source + `/: ` + e);
	}, Nm.prototype.at = function(e, t) {
		t === void 0 && (t = !1);
		var n = this.source, r = n.length;
		if (e >= r) return -1;
		var i = n.charCodeAt(e);
		if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
		var a = n.charCodeAt(e + 1);
		return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
	}, Nm.prototype.nextIndex = function(e, t) {
		t === void 0 && (t = !1);
		var n = this.source, r = n.length;
		if (e >= r) return r;
		var i = n.charCodeAt(e), a;
		return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
	}, Nm.prototype.current = function(e) {
		return e === void 0 && (e = !1), this.at(this.pos, e);
	}, Nm.prototype.lookahead = function(e) {
		return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
	}, Nm.prototype.advance = function(e) {
		e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
	}, Nm.prototype.eat = function(e, t) {
		return t === void 0 && (t = !1), this.current(t) === e ? (this.advance(t), !0) : !1;
	}, Nm.prototype.eatChars = function(e, t) {
		t === void 0 && (t = !1);
		for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
			var a = i[r], o = this.at(n, t);
			if (o === -1 || o !== a) return !1;
			n = this.nextIndex(n, t);
		}
		return this.pos = n, !0;
	}, Q.validateRegExpFlags = function(e) {
		for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
			var o = n.charAt(a);
			t.indexOf(o) === -1 && this.raise(e.start, `Invalid regular expression flag`), n.indexOf(o, a + 1) > -1 && this.raise(e.start, `Duplicate regular expression flag`), o === `u` && (r = !0), o === `v` && (i = !0);
		}
		this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, `Invalid regular expression flag`);
	};
	function Pm(e) {
		for (var t in e) return !0;
		return !1;
	}
	Q.validateRegExpPattern = function(e) {
		this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && Pm(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
	}, Q.regexp_pattern = function(e) {
		e.pos = 0, e.lastIntValue = 0, e.lastStringValue = ``, e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise(`Unmatched ')'`), (e.eat(93) || e.eat(125)) && e.raise(`Lone quantifier brackets`)), e.maxBackReference > e.numCapturingParens && e.raise(`Invalid escape`);
		for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
			var r = n[t];
			e.groupNames[r] || e.raise(`Invalid named capture referenced`);
		}
	}, Q.regexp_disjunction = function(e) {
		var t = this.options.ecmaVersion >= 16;
		for (t && (e.branchID = new Mm(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
		t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise(`Nothing to repeat`), e.eat(123) && e.raise(`Lone quantifier brackets`);
	}, Q.regexp_alternative = function(e) {
		for (; e.pos < e.source.length && this.regexp_eatTerm(e););
	}, Q.regexp_eatTerm = function(e) {
		return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise(`Invalid quantifier`), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
	}, Q.regexp_eatAssertion = function(e) {
		var t = e.pos;
		if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
		if (e.eat(92)) {
			if (e.eat(66) || e.eat(98)) return !0;
			e.pos = t;
		}
		if (e.eat(40) && e.eat(63)) {
			var n = !1;
			if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise(`Unterminated group`), e.lastAssertionIsQuantifiable = !n, !0;
		}
		return e.pos = t, !1;
	}, Q.regexp_eatQuantifier = function(e, t) {
		return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
	}, Q.regexp_eatQuantifierPrefix = function(e, t) {
		return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
	}, Q.regexp_eatBracedQuantifier = function(e, t) {
		var n = e.pos;
		if (e.eat(123)) {
			var r = 0, i = -1;
			if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise(`numbers out of order in {} quantifier`), !0;
			e.switchU && !t && e.raise(`Incomplete quantifier`), e.pos = n;
		}
		return !1;
	}, Q.regexp_eatAtom = function(e) {
		return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
	}, Q.regexp_eatReverseSolidusAtomEscape = function(e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatAtomEscape(e)) return !0;
			e.pos = t;
		}
		return !1;
	}, Q.regexp_eatUncapturingGroup = function(e) {
		var t = e.pos;
		if (e.eat(40)) {
			if (e.eat(63)) {
				if (this.options.ecmaVersion >= 16) {
					var n = this.regexp_eatModifiers(e), r = e.eat(45);
					if (n || r) {
						for (var i = 0; i < n.length; i++) {
							var a = n.charAt(i);
							n.indexOf(a, i + 1) > -1 && e.raise(`Duplicate regular expression modifiers`);
						}
						if (r) {
							var o = this.regexp_eatModifiers(e);
							!n && !o && e.current() === 58 && e.raise(`Invalid regular expression modifiers`);
							for (var s = 0; s < o.length; s++) {
								var c = o.charAt(s);
								(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise(`Duplicate regular expression modifiers`);
							}
						}
					}
				}
				if (e.eat(58)) {
					if (this.regexp_disjunction(e), e.eat(41)) return !0;
					e.raise(`Unterminated group`);
				}
			}
			e.pos = t;
		}
		return !1;
	}, Q.regexp_eatCapturingGroup = function(e) {
		if (e.eat(40)) {
			if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise(`Invalid group`), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
			e.raise(`Unterminated group`);
		}
		return !1;
	}, Q.regexp_eatModifiers = function(e) {
		for (var t = ``, n = 0; (n = e.current()) !== -1 && Fm(n);) t += mp(n), e.advance();
		return t;
	};
	function Fm(e) {
		return e === 105 || e === 109 || e === 115;
	}
	Q.regexp_eatExtendedAtom = function(e) {
		return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
	}, Q.regexp_eatInvalidBracedQuantifier = function(e) {
		return this.regexp_eatBracedQuantifier(e, !0) && e.raise(`Nothing to repeat`), !1;
	}, Q.regexp_eatSyntaxCharacter = function(e) {
		var t = e.current();
		return Im(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	};
	function Im(e) {
		return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
	}
	Q.regexp_eatPatternCharacters = function(e) {
		for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !Im(n);) e.advance();
		return e.pos !== t;
	}, Q.regexp_eatExtendedPatternCharacter = function(e) {
		var t = e.current();
		return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
	}, Q.regexp_groupSpecifier = function(e) {
		if (e.eat(63)) {
			this.regexp_eatGroupName(e) || e.raise(`Invalid group`);
			var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
			if (n) if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise(`Duplicate capture group name`);
			else e.raise(`Duplicate capture group name`);
			t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
		}
	}, Q.regexp_eatGroupName = function(e) {
		if (e.lastStringValue = ``, e.eat(60)) {
			if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
			e.raise(`Invalid capture group name`);
		}
		return !1;
	}, Q.regexp_eatRegExpIdentifierName = function(e) {
		if (e.lastStringValue = ``, this.regexp_eatRegExpIdentifierStart(e)) {
			for (e.lastStringValue += mp(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += mp(e.lastIntValue);
			return !0;
		}
		return !1;
	}, Q.regexp_eatRegExpIdentifierStart = function(e) {
		var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
		return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), Lm(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
	};
	function Lm(e) {
		return Yf(e, !0) || e === 36 || e === 95;
	}
	Q.regexp_eatRegExpIdentifierPart = function(e) {
		var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
		return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), Rm(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
	};
	function Rm(e) {
		return Xf(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
	}
	Q.regexp_eatAtomEscape = function(e) {
		return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise(`Invalid unicode escape`), e.raise(`Invalid escape`)), !1);
	}, Q.regexp_eatBackReference = function(e) {
		var t = e.pos;
		if (this.regexp_eatDecimalEscape(e)) {
			var n = e.lastIntValue;
			if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
			if (n <= e.numCapturingParens) return !0;
			e.pos = t;
		}
		return !1;
	}, Q.regexp_eatKGroupName = function(e) {
		if (e.eat(107)) {
			if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
			e.raise(`Invalid named reference`);
		}
		return !1;
	}, Q.regexp_eatCharacterEscape = function(e) {
		return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
	}, Q.regexp_eatCControlLetter = function(e) {
		var t = e.pos;
		if (e.eat(99)) {
			if (this.regexp_eatControlLetter(e)) return !0;
			e.pos = t;
		}
		return !1;
	}, Q.regexp_eatZero = function(e) {
		return e.current() === 48 && !Xm(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
	}, Q.regexp_eatControlEscape = function(e) {
		var t = e.current();
		return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
	}, Q.regexp_eatControlLetter = function(e) {
		var t = e.current();
		return zm(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
	};
	function zm(e) {
		return e >= 65 && e <= 90 || e >= 97 && e <= 122;
	}
	Q.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
		t === void 0 && (t = !1);
		var n = e.pos, r = t || e.switchU;
		if (e.eat(117)) {
			if (this.regexp_eatFixedHexDigits(e, 4)) {
				var i = e.lastIntValue;
				if (r && i >= 55296 && i <= 56319) {
					var a = e.pos;
					if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
						var o = e.lastIntValue;
						if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
					}
					e.pos = a, e.lastIntValue = i;
				}
				return !0;
			}
			if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Bm(e.lastIntValue)) return !0;
			r && e.raise(`Invalid unicode escape`), e.pos = n;
		}
		return !1;
	};
	function Bm(e) {
		return e >= 0 && e <= 1114111;
	}
	Q.regexp_eatIdentityEscape = function(e) {
		if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
		var t = e.current();
		return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	}, Q.regexp_eatDecimalEscape = function(e) {
		e.lastIntValue = 0;
		var t = e.current();
		if (t >= 49 && t <= 57) {
			do
				e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
			while ((t = e.current()) >= 48 && t <= 57);
			return !0;
		}
		return !1;
	};
	var Vm = 0;
	var Hm = 1;
	var Um = 2;
	Q.regexp_eatCharacterClassEscape = function(e) {
		var t = e.current();
		if (Wm(t)) return e.lastIntValue = -1, e.advance(), Hm;
		var n = !1;
		if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
			e.lastIntValue = -1, e.advance();
			var r;
			if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === Um && e.raise(`Invalid property name`), r;
			e.raise(`Invalid property name`);
		}
		return Vm;
	};
	function Wm(e) {
		return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
	}
	Q.regexp_eatUnicodePropertyValueExpression = function(e) {
		var t = e.pos;
		if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
			var n = e.lastStringValue;
			if (this.regexp_eatUnicodePropertyValue(e)) {
				var r = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), Hm;
			}
		}
		if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
			var i = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameOrValue(e, i);
		}
		return Vm;
	}, Q.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
		up(e.unicodeProperties.nonBinary, t) || e.raise(`Invalid property name`), e.unicodeProperties.nonBinary[t].test(n) || e.raise(`Invalid property value`);
	}, Q.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
		if (e.unicodeProperties.binary.test(t)) return Hm;
		if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return Um;
		e.raise(`Invalid property name`);
	}, Q.regexp_eatUnicodePropertyName = function(e) {
		var t = 0;
		for (e.lastStringValue = ``; Gm(t = e.current());) e.lastStringValue += mp(t), e.advance();
		return e.lastStringValue !== ``;
	};
	function Gm(e) {
		return zm(e) || e === 95;
	}
	Q.regexp_eatUnicodePropertyValue = function(e) {
		var t = 0;
		for (e.lastStringValue = ``; Km(t = e.current());) e.lastStringValue += mp(t), e.advance();
		return e.lastStringValue !== ``;
	};
	function Km(e) {
		return Gm(e) || Xm(e);
	}
	Q.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
		return this.regexp_eatUnicodePropertyValue(e);
	}, Q.regexp_eatCharacterClass = function(e) {
		if (e.eat(91)) {
			var t = e.eat(94), n = this.regexp_classContents(e);
			return e.eat(93) || e.raise(`Unterminated character class`), t && n === Um && e.raise(`Negated character class may contain strings`), !0;
		}
		return !1;
	}, Q.regexp_classContents = function(e) {
		return e.current() === 93 ? Hm : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), Hm);
	}, Q.regexp_nonEmptyClassRanges = function(e) {
		for (; this.regexp_eatClassAtom(e);) {
			var t = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassAtom(e)) {
				var n = e.lastIntValue;
				e.switchU && (t === -1 || n === -1) && e.raise(`Invalid character class`), t !== -1 && n !== -1 && t > n && e.raise(`Range out of order in character class`);
			}
		}
	}, Q.regexp_eatClassAtom = function(e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatClassEscape(e)) return !0;
			if (e.switchU) {
				var n = e.current();
				(n === 99 || $m(n)) && e.raise(`Invalid class escape`), e.raise(`Invalid escape`);
			}
			e.pos = t;
		}
		var r = e.current();
		return r === 93 ? !1 : (e.lastIntValue = r, e.advance(), !0);
	}, Q.regexp_eatClassEscape = function(e) {
		var t = e.pos;
		if (e.eat(98)) return e.lastIntValue = 8, !0;
		if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
		if (!e.switchU && e.eat(99)) {
			if (this.regexp_eatClassControlLetter(e)) return !0;
			e.pos = t;
		}
		return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
	}, Q.regexp_classSetExpression = function(e) {
		var t = Hm, n;
		if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
			n === Um && (t = Um);
			for (var r = e.pos; e.eatChars([38, 38]);) {
				if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
					n !== Um && (t = Hm);
					continue;
				}
				e.raise(`Invalid character in character class`);
			}
			if (r !== e.pos) return t;
			for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise(`Invalid character in character class`);
			if (r !== e.pos) return t;
		} else e.raise(`Invalid character in character class`);
		for (;;) if (!this.regexp_eatClassSetRange(e)) {
			if (n = this.regexp_eatClassSetOperand(e), !n) return t;
			n === Um && (t = Um);
		}
	}, Q.regexp_eatClassSetRange = function(e) {
		var t = e.pos;
		if (this.regexp_eatClassSetCharacter(e)) {
			var n = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
				var r = e.lastIntValue;
				return n !== -1 && r !== -1 && n > r && e.raise(`Range out of order in character class`), !0;
			}
			e.pos = t;
		}
		return !1;
	}, Q.regexp_eatClassSetOperand = function(e) {
		return this.regexp_eatClassSetCharacter(e) ? Hm : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
	}, Q.regexp_eatNestedClass = function(e) {
		var t = e.pos;
		if (e.eat(91)) {
			var n = e.eat(94), r = this.regexp_classContents(e);
			if (e.eat(93)) return n && r === Um && e.raise(`Negated character class may contain strings`), r;
			e.pos = t;
		}
		if (e.eat(92)) {
			var i = this.regexp_eatCharacterClassEscape(e);
			if (i) return i;
			e.pos = t;
		}
		return null;
	}, Q.regexp_eatClassStringDisjunction = function(e) {
		var t = e.pos;
		if (e.eatChars([92, 113])) {
			if (e.eat(123)) {
				var n = this.regexp_classStringDisjunctionContents(e);
				if (e.eat(125)) return n;
			} else e.raise(`Invalid escape`);
			e.pos = t;
		}
		return null;
	}, Q.regexp_classStringDisjunctionContents = function(e) {
		for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === Um && (t = Um);
		return t;
	}, Q.regexp_classString = function(e) {
		for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
		return t === 1 ? Hm : Um;
	}, Q.regexp_eatClassSetCharacter = function(e) {
		var t = e.pos;
		if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
		var n = e.current();
		return n < 0 || n === e.lookahead() && qm(n) || Jm(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
	};
	function qm(e) {
		return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
	}
	function Jm(e) {
		return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
	}
	Q.regexp_eatClassSetReservedPunctuator = function(e) {
		var t = e.current();
		return Ym(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	};
	function Ym(e) {
		return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
	}
	Q.regexp_eatClassControlLetter = function(e) {
		var t = e.current();
		return Xm(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
	}, Q.regexp_eatHexEscapeSequence = function(e) {
		var t = e.pos;
		if (e.eat(120)) {
			if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
			e.switchU && e.raise(`Invalid escape`), e.pos = t;
		}
		return !1;
	}, Q.regexp_eatDecimalDigits = function(e) {
		var t = e.pos, n = 0;
		for (e.lastIntValue = 0; Xm(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
		return e.pos !== t;
	};
	function Xm(e) {
		return e >= 48 && e <= 57;
	}
	Q.regexp_eatHexDigits = function(e) {
		var t = e.pos, n = 0;
		for (e.lastIntValue = 0; Zm(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + Qm(n), e.advance();
		return e.pos !== t;
	};
	function Zm(e) {
		return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
	}
	function Qm(e) {
		return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
	}
	Q.regexp_eatLegacyOctalEscapeSequence = function(e) {
		if (this.regexp_eatOctalDigit(e)) {
			var t = e.lastIntValue;
			if (this.regexp_eatOctalDigit(e)) {
				var n = e.lastIntValue;
				t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
			} else e.lastIntValue = t;
			return !0;
		}
		return !1;
	}, Q.regexp_eatOctalDigit = function(e) {
		var t = e.current();
		return $m(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
	};
	function $m(e) {
		return e >= 48 && e <= 55;
	}
	Q.regexp_eatFixedHexDigits = function(e, t) {
		var n = e.pos;
		e.lastIntValue = 0;
		for (var r = 0; r < t; ++r) {
			var i = e.current();
			if (!Zm(i)) return e.pos = n, !1;
			e.lastIntValue = 16 * e.lastIntValue + Qm(i), e.advance();
		}
		return !0;
	};
	var eh = function(e) {
		this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new _p(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
	};
	var $ = J.prototype;
	$.next = function(e) {
		!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword ` + this.type.keyword), this.options.onToken && this.options.onToken(new eh(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
	}, $.getToken = function() {
		return this.next(), new eh(this);
	}, typeof Symbol < `u` && ($[Symbol.iterator] = function() {
		var e = this;
		return { next: function() {
			var t = e.getToken();
			return {
				done: t.type === q.eof,
				value: t
			};
		} };
	}), $.nextToken = function() {
		var e = this.curContext();
		if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(q.eof);
		if (e.override) return e.override(this);
		this.readToken(this.fullCharCodeAtPos());
	}, $.readToken = function(e) {
		return Yf(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
	}, $.fullCharCodeAt = function(e) {
		var t = this.input.charCodeAt(e);
		if (t <= 55295 || t >= 56320) return t;
		var n = this.input.charCodeAt(e + 1);
		return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
	}, $.fullCharCodeAtPos = function() {
		return this.fullCharCodeAt(this.pos);
	}, $.skipBlockComment = function() {
		var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf(`*/`, this.pos += 2);
		if (n === -1 && this.raise(this.pos - 2, `Unterminated comment`), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = ip(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
		this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
	}, $.skipLineComment = function(e) {
		for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !rp(r);) r = this.input.charCodeAt(++this.pos);
		this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
	}, $.skipSpace = function() {
		loop: for (; this.pos < this.input.length;) {
			var e = this.input.charCodeAt(this.pos);
			switch (e) {
				case 32:
				case 160:
					++this.pos;
					break;
				case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
				case 10:
				case 8232:
				case 8233:
					++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
					break;
				case 47:
					switch (this.input.charCodeAt(this.pos + 1)) {
						case 42:
							this.skipBlockComment();
							break;
						case 47:
							this.skipLineComment(2);
							break;
						default: break loop;
					}
					break;
				default: if (e > 8 && e < 14 || e >= 5760 && ap.test(String.fromCharCode(e))) ++this.pos;
				else break loop;
			}
		}
	}, $.finishToken = function(e, t) {
		this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
		var n = this.type;
		this.type = e, this.value = t, this.updateContext(n);
	}, $.readToken_dot = function() {
		var e = this.input.charCodeAt(this.pos + 1);
		if (e >= 48 && e <= 57) return this.readNumber(!0);
		var t = this.input.charCodeAt(this.pos + 2);
		return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(q.ellipsis)) : (++this.pos, this.finishToken(q.dot));
	}, $.readToken_slash = function() {
		var e = this.input.charCodeAt(this.pos + 1);
		return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(q.assign, 2) : this.finishOp(q.slash, 1);
	}, $.readToken_mult_modulo_exp = function(e) {
		var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? q.star : q.modulo;
		return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = q.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(q.assign, n + 1) : this.finishOp(r, n);
	}, $.readToken_pipe_amp = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(q.assign, 3) : this.finishOp(e === 124 ? q.logicalOR : q.logicalAND, 2) : t === 61 ? this.finishOp(q.assign, 2) : this.finishOp(e === 124 ? q.bitwiseOR : q.bitwiseAND, 1);
	}, $.readToken_caret = function() {
		return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(q.assign, 2) : this.finishOp(q.bitwiseXOR, 1);
	}, $.readToken_plus_min = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || tp.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(q.incDec, 2) : t === 61 ? this.finishOp(q.assign, 2) : this.finishOp(q.plusMin, 1);
	}, $.readToken_lt_gt = function(e) {
		var t = this.input.charCodeAt(this.pos + 1), n = 1;
		return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(q.assign, n + 1) : this.finishOp(q.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(q.relational, n));
	}, $.readToken_eq_excl = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === 61 ? this.finishOp(q.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(q.arrow)) : this.finishOp(e === 61 ? q.eq : q.prefix, 1);
	}, $.readToken_question = function() {
		var e = this.options.ecmaVersion;
		if (e >= 11) {
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 46) {
				var n = this.input.charCodeAt(this.pos + 2);
				if (n < 48 || n > 57) return this.finishOp(q.questionDot, 2);
			}
			if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(q.assign, 3) : this.finishOp(q.coalesce, 2);
		}
		return this.finishOp(q.question, 1);
	}, $.readToken_numberSign = function() {
		var e = this.options.ecmaVersion, t = 35;
		if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), Yf(t, !0) || t === 92)) return this.finishToken(q.privateId, this.readWord1());
		this.raise(this.pos, `Unexpected character '` + mp(t) + `'`);
	}, $.getTokenFromCode = function(e) {
		switch (e) {
			case 46: return this.readToken_dot();
			case 40: return ++this.pos, this.finishToken(q.parenL);
			case 41: return ++this.pos, this.finishToken(q.parenR);
			case 59: return ++this.pos, this.finishToken(q.semi);
			case 44: return ++this.pos, this.finishToken(q.comma);
			case 91: return ++this.pos, this.finishToken(q.bracketL);
			case 93: return ++this.pos, this.finishToken(q.bracketR);
			case 123: return ++this.pos, this.finishToken(q.braceL);
			case 125: return ++this.pos, this.finishToken(q.braceR);
			case 58: return ++this.pos, this.finishToken(q.colon);
			case 96:
				if (this.options.ecmaVersion < 6) break;
				return ++this.pos, this.finishToken(q.backQuote);
			case 48:
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 120 || t === 88) return this.readRadixNumber(16);
				if (this.options.ecmaVersion >= 6) {
					if (t === 111 || t === 79) return this.readRadixNumber(8);
					if (t === 98 || t === 66) return this.readRadixNumber(2);
				}
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: return this.readNumber(!1);
			case 34:
			case 39: return this.readString(e);
			case 47: return this.readToken_slash();
			case 37:
			case 42: return this.readToken_mult_modulo_exp(e);
			case 124:
			case 38: return this.readToken_pipe_amp(e);
			case 94: return this.readToken_caret();
			case 43:
			case 45: return this.readToken_plus_min(e);
			case 60:
			case 62: return this.readToken_lt_gt(e);
			case 61:
			case 33: return this.readToken_eq_excl(e);
			case 63: return this.readToken_question();
			case 126: return this.finishOp(q.prefix, 1);
			case 35: return this.readToken_numberSign();
		}
		this.raise(this.pos, `Unexpected character '` + mp(e) + `'`);
	}, $.finishOp = function(e, t) {
		var n = this.input.slice(this.pos, this.pos + t);
		return this.pos += t, this.finishToken(e, n);
	}, $.readRegexp = function() {
		for (var e, t, n = this.pos;;) {
			this.pos >= this.input.length && this.raise(n, `Unterminated regular expression`);
			var r = this.input.charAt(this.pos);
			if (tp.test(r) && this.raise(n, `Unterminated regular expression`), e) e = !1;
			else {
				if (r === `[`) t = !0;
				else if (r === `]` && t) t = !1;
				else if (r === `/` && !t) break;
				e = r === `\\`;
			}
			++this.pos;
		}
		var i = this.input.slice(n, this.pos);
		++this.pos;
		var a = this.pos, o = this.readWord1();
		this.containsEsc && this.unexpected(a);
		var s = this.regexpState || (this.regexpState = new Nm(this));
		s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
		var c = null;
		try {
			c = new RegExp(i, o);
		} catch {}
		return this.finishToken(q.regexp, {
			pattern: i,
			flags: o,
			value: c
		});
	}, $.readInt = function(e, t, n) {
		for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t == null ? 1 / 0 : t; c < l; ++c, ++this.pos) {
			var u = this.input.charCodeAt(this.pos), d = void 0;
			if (r && u === 95) {
				i && this.raiseRecoverable(this.pos, `Numeric separator is not allowed in legacy octal numeric literals`), s === 95 && this.raiseRecoverable(this.pos, `Numeric separator must be exactly one underscore`), c === 0 && this.raiseRecoverable(this.pos, `Numeric separator is not allowed at the first of digits`), s = u;
				continue;
			}
			if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : 1 / 0, d >= e) break;
			s = u, o = o * e + d;
		}
		return r && s === 95 && this.raiseRecoverable(this.pos - 1, `Numeric separator is not allowed at the last of digits`), this.pos === a || t != null && this.pos - a !== t ? null : o;
	};
	function th(e, t) {
		return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ``));
	}
	function nh(e) {
		return typeof BigInt == `function` ? BigInt(e.replace(/_/g, ``)) : null;
	}
	$.readRadixNumber = function(e) {
		var t = this.pos;
		this.pos += 2;
		var n = this.readInt(e);
		return n ?? this.raise(this.start + 2, `Expected number in radix ` + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = nh(this.input.slice(t, this.pos)), ++this.pos) : Yf(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(q.num, n);
	}, $.readNumber = function(e) {
		var t = this.pos;
		!e && this.readInt(10, void 0, !0) === null && this.raise(t, `Invalid number`);
		var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
		n && this.strict && this.raise(t, `Invalid number`);
		var r = this.input.charCodeAt(this.pos);
		if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
			var i = nh(this.input.slice(t, this.pos));
			return ++this.pos, Yf(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(q.num, i);
		}
		n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, `Invalid number`)), Yf(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`);
		var a = th(this.input.slice(t, this.pos), n);
		return this.finishToken(q.num, a);
	}, $.readCodePoint = function() {
		var e = this.input.charCodeAt(this.pos), t;
		if (e === 123) {
			this.options.ecmaVersion < 6 && this.unexpected();
			var n = ++this.pos;
			t = this.readHexChar(this.input.indexOf(`}`, this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, `Code point out of bounds`);
		} else t = this.readHexChar(4);
		return t;
	}, $.readString = function(e) {
		for (var t = ``, n = ++this.pos;;) {
			this.pos >= this.input.length && this.raise(this.start, `Unterminated string constant`);
			var r = this.input.charCodeAt(this.pos);
			if (r === e) break;
			r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, `Unterminated string constant`), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (rp(r) && this.raise(this.start, `Unterminated string constant`), ++this.pos);
		}
		return t += this.input.slice(n, this.pos++), this.finishToken(q.string, t);
	};
	var rh = {};
	$.tryReadTemplateToken = function() {
		this.inTemplateElement = !0;
		try {
			this.readTmplToken();
		} catch (e) {
			if (e === rh) this.readInvalidTemplateToken();
			else throw e;
		}
		this.inTemplateElement = !1;
	}, $.invalidStringToken = function(e, t) {
		if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw rh;
		this.raise(e, t);
	}, $.readTmplToken = function() {
		for (var e = ``, t = this.pos;;) {
			this.pos >= this.input.length && this.raise(this.start, `Unterminated template`);
			var n = this.input.charCodeAt(this.pos);
			if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === q.template || this.type === q.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(q.dollarBraceL)) : (++this.pos, this.finishToken(q.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(q.template, e));
			if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
			else if (rp(n)) {
				switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
					case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
					case 10:
						e += `
`;
						break;
					default: e += String.fromCharCode(n);
				}
				this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
			} else ++this.pos;
		}
	}, $.readInvalidTemplateToken = function() {
		for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
			case `\\`:
				++this.pos;
				break;
			case `$`: if (this.input[this.pos + 1] !== `{`) break;
			case "`": return this.finishToken(q.invalidTemplate, this.input.slice(this.start, this.pos));
			case `\r`: this.input[this.pos + 1] === `
` && ++this.pos;
			case `
`:
			case `\u2028`:
			case `\u2029`: ++this.curLine, this.lineStart = this.pos + 1;
		}
		this.raise(this.start, `Unterminated template`);
	}, $.readEscapedChar = function(e) {
		var t = this.input.charCodeAt(++this.pos);
		switch (++this.pos, t) {
			case 110: return `
`;
			case 114: return `\r`;
			case 120: return String.fromCharCode(this.readHexChar(2));
			case 117: return mp(this.readCodePoint());
			case 116: return `	`;
			case 98: return `\b`;
			case 118: return `\v`;
			case 102: return `\f`;
			case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
			case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``;
			case 56:
			case 57: if (this.strict && this.invalidStringToken(this.pos - 1, `Invalid escape sequence`), e) {
				var n = this.pos - 1;
				this.invalidStringToken(n, `Invalid escape sequence in template string`);
			}
			default:
				if (t >= 48 && t <= 55) {
					var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
					return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== `0` || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? `Octal literal in template string` : `Octal literal in strict mode`), String.fromCharCode(i);
				}
				return rp(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``) : String.fromCharCode(t);
		}
	}, $.readHexChar = function(e) {
		var t = this.pos, n = this.readInt(16, e);
		return n === null && this.invalidStringToken(t, `Bad character escape sequence`), n;
	}, $.readWord1 = function() {
		this.containsEsc = !1;
		for (var e = ``, t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
			var i = this.fullCharCodeAtPos();
			if (Xf(i, r)) this.pos += i <= 65535 ? 1 : 2;
			else if (i === 92) {
				this.containsEsc = !0, e += this.input.slice(n, this.pos);
				var a = this.pos;
				this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, `Expecting Unicode escape sequence \\uXXXX`), ++this.pos;
				var o = this.readCodePoint();
				(t ? Yf : Xf)(o, r) || this.invalidStringToken(a, `Invalid Unicode escape`), e += mp(o), n = this.pos;
			} else break;
			t = !1;
		}
		return e + this.input.slice(n, this.pos);
	}, $.readWord = function() {
		var e = this.readWord1(), t = q.name;
		return this.keywords.test(e) && (t = ep[e]), this.finishToken(t, e);
	}, J.acorn = {
		Parser: J,
		version: `8.16.0`,
		defaultOptions: yp,
		Position: gp,
		SourceLocation: _p,
		getLineInfo: vp,
		Node: lm,
		TokenType: G,
		tokTypes: q,
		keywordTypes: ep,
		TokContext: tm,
		tokContexts: X,
		isIdentifierChar: Xf,
		isIdentifierStart: Yf,
		Token: eh,
		isNewLine: rp,
		lineBreak: tp,
		lineBreakG: np,
		nonASCIIwhitespace: ap
	};
	var ih = o(((e, t) => {
		t.exports = {
			quot: `"`,
			amp: `&`,
			apos: `'`,
			lt: `<`,
			gt: `>`,
			nbsp: `\xA0`,
			iexcl: `¡`,
			cent: `¢`,
			pound: `£`,
			curren: `¤`,
			yen: `¥`,
			brvbar: `¦`,
			sect: `§`,
			uml: `¨`,
			copy: `©`,
			ordf: `ª`,
			laquo: `«`,
			not: `¬`,
			shy: `­`,
			reg: `®`,
			macr: `¯`,
			deg: `°`,
			plusmn: `±`,
			sup2: `²`,
			sup3: `³`,
			acute: `´`,
			micro: `µ`,
			para: `¶`,
			middot: `·`,
			cedil: `¸`,
			sup1: `¹`,
			ordm: `º`,
			raquo: `»`,
			frac14: `¼`,
			frac12: `½`,
			frac34: `¾`,
			iquest: `¿`,
			Agrave: `À`,
			Aacute: `Á`,
			Acirc: `Â`,
			Atilde: `Ã`,
			Auml: `Ä`,
			Aring: `Å`,
			AElig: `Æ`,
			Ccedil: `Ç`,
			Egrave: `È`,
			Eacute: `É`,
			Ecirc: `Ê`,
			Euml: `Ë`,
			Igrave: `Ì`,
			Iacute: `Í`,
			Icirc: `Î`,
			Iuml: `Ï`,
			ETH: `Ð`,
			Ntilde: `Ñ`,
			Ograve: `Ò`,
			Oacute: `Ó`,
			Ocirc: `Ô`,
			Otilde: `Õ`,
			Ouml: `Ö`,
			times: `×`,
			Oslash: `Ø`,
			Ugrave: `Ù`,
			Uacute: `Ú`,
			Ucirc: `Û`,
			Uuml: `Ü`,
			Yacute: `Ý`,
			THORN: `Þ`,
			szlig: `ß`,
			agrave: `à`,
			aacute: `á`,
			acirc: `â`,
			atilde: `ã`,
			auml: `ä`,
			aring: `å`,
			aelig: `æ`,
			ccedil: `ç`,
			egrave: `è`,
			eacute: `é`,
			ecirc: `ê`,
			euml: `ë`,
			igrave: `ì`,
			iacute: `í`,
			icirc: `î`,
			iuml: `ï`,
			eth: `ð`,
			ntilde: `ñ`,
			ograve: `ò`,
			oacute: `ó`,
			ocirc: `ô`,
			otilde: `õ`,
			ouml: `ö`,
			divide: `÷`,
			oslash: `ø`,
			ugrave: `ù`,
			uacute: `ú`,
			ucirc: `û`,
			uuml: `ü`,
			yacute: `ý`,
			thorn: `þ`,
			yuml: `ÿ`,
			OElig: `Œ`,
			oelig: `œ`,
			Scaron: `Š`,
			scaron: `š`,
			Yuml: `Ÿ`,
			fnof: `ƒ`,
			circ: `ˆ`,
			tilde: `˜`,
			Alpha: `Α`,
			Beta: `Β`,
			Gamma: `Γ`,
			Delta: `Δ`,
			Epsilon: `Ε`,
			Zeta: `Ζ`,
			Eta: `Η`,
			Theta: `Θ`,
			Iota: `Ι`,
			Kappa: `Κ`,
			Lambda: `Λ`,
			Mu: `Μ`,
			Nu: `Ν`,
			Xi: `Ξ`,
			Omicron: `Ο`,
			Pi: `Π`,
			Rho: `Ρ`,
			Sigma: `Σ`,
			Tau: `Τ`,
			Upsilon: `Υ`,
			Phi: `Φ`,
			Chi: `Χ`,
			Psi: `Ψ`,
			Omega: `Ω`,
			alpha: `α`,
			beta: `β`,
			gamma: `γ`,
			delta: `δ`,
			epsilon: `ε`,
			zeta: `ζ`,
			eta: `η`,
			theta: `θ`,
			iota: `ι`,
			kappa: `κ`,
			lambda: `λ`,
			mu: `μ`,
			nu: `ν`,
			xi: `ξ`,
			omicron: `ο`,
			pi: `π`,
			rho: `ρ`,
			sigmaf: `ς`,
			sigma: `σ`,
			tau: `τ`,
			upsilon: `υ`,
			phi: `φ`,
			chi: `χ`,
			psi: `ψ`,
			omega: `ω`,
			thetasym: `ϑ`,
			upsih: `ϒ`,
			piv: `ϖ`,
			ensp: ` `,
			emsp: ` `,
			thinsp: ` `,
			zwnj: `‌`,
			zwj: `‍`,
			lrm: `‎`,
			rlm: `‏`,
			ndash: `–`,
			mdash: `—`,
			lsquo: `‘`,
			rsquo: `’`,
			sbquo: `‚`,
			ldquo: `“`,
			rdquo: `”`,
			bdquo: `„`,
			dagger: `†`,
			Dagger: `‡`,
			bull: `•`,
			hellip: `…`,
			permil: `‰`,
			prime: `′`,
			Prime: `″`,
			lsaquo: `‹`,
			rsaquo: `›`,
			oline: `‾`,
			frasl: `⁄`,
			euro: `€`,
			image: `ℑ`,
			weierp: `℘`,
			real: `ℜ`,
			trade: `™`,
			alefsym: `ℵ`,
			larr: `←`,
			uarr: `↑`,
			rarr: `→`,
			darr: `↓`,
			harr: `↔`,
			crarr: `↵`,
			lArr: `⇐`,
			uArr: `⇑`,
			rArr: `⇒`,
			dArr: `⇓`,
			hArr: `⇔`,
			forall: `∀`,
			part: `∂`,
			exist: `∃`,
			empty: `∅`,
			nabla: `∇`,
			isin: `∈`,
			notin: `∉`,
			ni: `∋`,
			prod: `∏`,
			sum: `∑`,
			minus: `−`,
			lowast: `∗`,
			radic: `√`,
			prop: `∝`,
			infin: `∞`,
			ang: `∠`,
			and: `∧`,
			or: `∨`,
			cap: `∩`,
			cup: `∪`,
			int: `∫`,
			there4: `∴`,
			sim: `∼`,
			cong: `≅`,
			asymp: `≈`,
			ne: `≠`,
			equiv: `≡`,
			le: `≤`,
			ge: `≥`,
			sub: `⊂`,
			sup: `⊃`,
			nsub: `⊄`,
			sube: `⊆`,
			supe: `⊇`,
			oplus: `⊕`,
			otimes: `⊗`,
			perp: `⊥`,
			sdot: `⋅`,
			lceil: `⌈`,
			rceil: `⌉`,
			lfloor: `⌊`,
			rfloor: `⌋`,
			lang: `〈`,
			rang: `〉`,
			loz: `◊`,
			spades: `♠`,
			clubs: `♣`,
			hearts: `♥`,
			diams: `♦`
		};
	}));
	var ah = o(((e, t) => {
		(function(n, r) {
			typeof e == `object` && t !== void 0 ? r(e) : typeof define == `function` && define.amd ? define([`exports`], r) : (n = typeof globalThis < `u` ? globalThis : n || self, r(n.acorn = {}));
		})(e, (function(e) {
			var t = [
				509,
				0,
				227,
				0,
				150,
				4,
				294,
				9,
				1368,
				2,
				2,
				1,
				6,
				3,
				41,
				2,
				5,
				0,
				166,
				1,
				574,
				3,
				9,
				9,
				7,
				9,
				32,
				4,
				318,
				1,
				78,
				5,
				71,
				10,
				50,
				3,
				123,
				2,
				54,
				14,
				32,
				10,
				3,
				1,
				11,
				3,
				46,
				10,
				8,
				0,
				46,
				9,
				7,
				2,
				37,
				13,
				2,
				9,
				6,
				1,
				45,
				0,
				13,
				2,
				49,
				13,
				9,
				3,
				2,
				11,
				83,
				11,
				7,
				0,
				3,
				0,
				158,
				11,
				6,
				9,
				7,
				3,
				56,
				1,
				2,
				6,
				3,
				1,
				3,
				2,
				10,
				0,
				11,
				1,
				3,
				6,
				4,
				4,
				68,
				8,
				2,
				0,
				3,
				0,
				2,
				3,
				2,
				4,
				2,
				0,
				15,
				1,
				83,
				17,
				10,
				9,
				5,
				0,
				82,
				19,
				13,
				9,
				214,
				6,
				3,
				8,
				28,
				1,
				83,
				16,
				16,
				9,
				82,
				12,
				9,
				9,
				7,
				19,
				58,
				14,
				5,
				9,
				243,
				14,
				166,
				9,
				71,
				5,
				2,
				1,
				3,
				3,
				2,
				0,
				2,
				1,
				13,
				9,
				120,
				6,
				3,
				6,
				4,
				0,
				29,
				9,
				41,
				6,
				2,
				3,
				9,
				0,
				10,
				10,
				47,
				15,
				199,
				7,
				137,
				9,
				54,
				7,
				2,
				7,
				17,
				9,
				57,
				21,
				2,
				13,
				123,
				5,
				4,
				0,
				2,
				1,
				2,
				6,
				2,
				0,
				9,
				9,
				49,
				4,
				2,
				1,
				2,
				4,
				9,
				9,
				55,
				9,
				266,
				3,
				10,
				1,
				2,
				0,
				49,
				6,
				4,
				4,
				14,
				10,
				5350,
				0,
				7,
				14,
				11465,
				27,
				2343,
				9,
				87,
				9,
				39,
				4,
				60,
				6,
				26,
				9,
				535,
				9,
				470,
				0,
				2,
				54,
				8,
				3,
				82,
				0,
				12,
				1,
				19628,
				1,
				4178,
				9,
				519,
				45,
				3,
				22,
				543,
				4,
				4,
				5,
				9,
				7,
				3,
				6,
				31,
				3,
				149,
				2,
				1418,
				49,
				513,
				54,
				5,
				49,
				9,
				0,
				15,
				0,
				23,
				4,
				2,
				14,
				1361,
				6,
				2,
				16,
				3,
				6,
				2,
				1,
				2,
				4,
				101,
				0,
				161,
				6,
				10,
				9,
				357,
				0,
				62,
				13,
				499,
				13,
				245,
				1,
				2,
				9,
				233,
				0,
				3,
				0,
				8,
				1,
				6,
				0,
				475,
				6,
				110,
				6,
				6,
				9,
				4759,
				9,
				787719,
				239
			], n = [
				0,
				11,
				2,
				25,
				2,
				18,
				2,
				1,
				2,
				14,
				3,
				13,
				35,
				122,
				70,
				52,
				268,
				28,
				4,
				48,
				48,
				31,
				14,
				29,
				6,
				37,
				11,
				29,
				3,
				35,
				5,
				7,
				2,
				4,
				43,
				157,
				19,
				35,
				5,
				35,
				5,
				39,
				9,
				51,
				13,
				10,
				2,
				14,
				2,
				6,
				2,
				1,
				2,
				10,
				2,
				14,
				2,
				6,
				2,
				1,
				4,
				51,
				13,
				310,
				10,
				21,
				11,
				7,
				25,
				5,
				2,
				41,
				2,
				8,
				70,
				5,
				3,
				0,
				2,
				43,
				2,
				1,
				4,
				0,
				3,
				22,
				11,
				22,
				10,
				30,
				66,
				18,
				2,
				1,
				11,
				21,
				11,
				25,
				7,
				25,
				39,
				55,
				7,
				1,
				65,
				0,
				16,
				3,
				2,
				2,
				2,
				28,
				43,
				28,
				4,
				28,
				36,
				7,
				2,
				27,
				28,
				53,
				11,
				21,
				11,
				18,
				14,
				17,
				111,
				72,
				56,
				50,
				14,
				50,
				14,
				35,
				39,
				27,
				10,
				22,
				251,
				41,
				7,
				1,
				17,
				5,
				57,
				28,
				11,
				0,
				9,
				21,
				43,
				17,
				47,
				20,
				28,
				22,
				13,
				52,
				58,
				1,
				3,
				0,
				14,
				44,
				33,
				24,
				27,
				35,
				30,
				0,
				3,
				0,
				9,
				34,
				4,
				0,
				13,
				47,
				15,
				3,
				22,
				0,
				2,
				0,
				36,
				17,
				2,
				24,
				20,
				1,
				64,
				6,
				2,
				0,
				2,
				3,
				2,
				14,
				2,
				9,
				8,
				46,
				39,
				7,
				3,
				1,
				3,
				21,
				2,
				6,
				2,
				1,
				2,
				4,
				4,
				0,
				19,
				0,
				13,
				4,
				31,
				9,
				2,
				0,
				3,
				0,
				2,
				37,
				2,
				0,
				26,
				0,
				2,
				0,
				45,
				52,
				19,
				3,
				21,
				2,
				31,
				47,
				21,
				1,
				2,
				0,
				185,
				46,
				42,
				3,
				37,
				47,
				21,
				0,
				60,
				42,
				14,
				0,
				72,
				26,
				38,
				6,
				186,
				43,
				117,
				63,
				32,
				7,
				3,
				0,
				3,
				7,
				2,
				1,
				2,
				23,
				16,
				0,
				2,
				0,
				95,
				7,
				3,
				38,
				17,
				0,
				2,
				0,
				29,
				0,
				11,
				39,
				8,
				0,
				22,
				0,
				12,
				45,
				20,
				0,
				19,
				72,
				200,
				32,
				32,
				8,
				2,
				36,
				18,
				0,
				50,
				29,
				113,
				6,
				2,
				1,
				2,
				37,
				22,
				0,
				26,
				5,
				2,
				1,
				2,
				31,
				15,
				0,
				24,
				43,
				261,
				18,
				16,
				0,
				2,
				12,
				2,
				33,
				125,
				0,
				80,
				921,
				103,
				110,
				18,
				195,
				2637,
				96,
				16,
				1071,
				18,
				5,
				26,
				3994,
				6,
				582,
				6842,
				29,
				1763,
				568,
				8,
				30,
				18,
				78,
				18,
				29,
				19,
				47,
				17,
				3,
				32,
				20,
				6,
				18,
				433,
				44,
				212,
				63,
				33,
				24,
				3,
				24,
				45,
				74,
				6,
				0,
				67,
				12,
				65,
				1,
				2,
				0,
				15,
				4,
				10,
				7381,
				42,
				31,
				98,
				114,
				8702,
				3,
				2,
				6,
				2,
				1,
				2,
				290,
				16,
				0,
				30,
				2,
				3,
				0,
				15,
				3,
				9,
				395,
				2309,
				106,
				6,
				12,
				4,
				8,
				8,
				9,
				5991,
				84,
				2,
				70,
				2,
				1,
				3,
				0,
				3,
				1,
				3,
				3,
				2,
				11,
				2,
				0,
				2,
				6,
				2,
				64,
				2,
				3,
				3,
				7,
				2,
				6,
				2,
				27,
				2,
				3,
				2,
				4,
				2,
				0,
				4,
				6,
				2,
				339,
				3,
				24,
				2,
				24,
				2,
				30,
				2,
				24,
				2,
				30,
				2,
				24,
				2,
				30,
				2,
				24,
				2,
				30,
				2,
				24,
				2,
				7,
				1845,
				30,
				7,
				5,
				262,
				61,
				147,
				44,
				11,
				6,
				17,
				0,
				322,
				29,
				19,
				43,
				485,
				27,
				229,
				29,
				3,
				0,
				208,
				30,
				2,
				2,
				2,
				1,
				2,
				6,
				3,
				4,
				10,
				1,
				225,
				6,
				2,
				3,
				2,
				1,
				2,
				14,
				2,
				196,
				60,
				67,
				8,
				0,
				1205,
				3,
				2,
				26,
				2,
				1,
				2,
				0,
				3,
				0,
				2,
				9,
				2,
				3,
				2,
				0,
				2,
				0,
				7,
				0,
				5,
				0,
				2,
				0,
				2,
				0,
				2,
				2,
				2,
				1,
				2,
				0,
				3,
				0,
				2,
				0,
				2,
				0,
				2,
				0,
				2,
				0,
				2,
				1,
				2,
				0,
				3,
				3,
				2,
				6,
				2,
				3,
				2,
				3,
				2,
				0,
				2,
				9,
				2,
				16,
				6,
				2,
				2,
				4,
				2,
				16,
				4421,
				42719,
				33,
				4381,
				3,
				5773,
				3,
				7472,
				16,
				621,
				2467,
				541,
				1507,
				4938,
				6,
				8489
			], r = `‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･`, i = `ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ`, a = {
				3: `abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile`,
				5: `class enum extends super const export import`,
				6: `enum`,
				strict: `implements interface let package private protected public static yield`,
				strictBind: `eval arguments`
			}, o = `break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this`, s = {
				5: o,
				"5module": o + ` export import`,
				6: o + ` const class extends export import super`
			}, c = /^in(stanceof)?$/, l = RegExp(`[` + i + `]`), u = RegExp(`[` + i + r + `]`);
			function d(e, t) {
				for (var n = 65536, r = 0; r < t.length; r += 2) {
					if (n += t[r], n > e) return !1;
					if (n += t[r + 1], n >= e) return !0;
				}
				return !1;
			}
			function f(e, t) {
				return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && l.test(String.fromCharCode(e)) : t === !1 ? !1 : d(e, n);
			}
			function p(e, r) {
				return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && u.test(String.fromCharCode(e)) : r === !1 ? !1 : d(e, n) || d(e, t);
			}
			var m = function(e, t) {
				t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
			};
			function h(e, t) {
				return new m(e, {
					beforeExpr: !0,
					binop: t
				});
			}
			var g = { beforeExpr: !0 }, _ = { startsExpr: !0 }, v = {};
			function y(e, t) {
				return t === void 0 && (t = {}), t.keyword = e, v[e] = new m(e, t);
			}
			var b = {
				num: new m(`num`, _),
				regexp: new m(`regexp`, _),
				string: new m(`string`, _),
				name: new m(`name`, _),
				privateId: new m(`privateId`, _),
				eof: new m(`eof`),
				bracketL: new m(`[`, {
					beforeExpr: !0,
					startsExpr: !0
				}),
				bracketR: new m(`]`),
				braceL: new m(`{`, {
					beforeExpr: !0,
					startsExpr: !0
				}),
				braceR: new m(`}`),
				parenL: new m(`(`, {
					beforeExpr: !0,
					startsExpr: !0
				}),
				parenR: new m(`)`),
				comma: new m(`,`, g),
				semi: new m(`;`, g),
				colon: new m(`:`, g),
				dot: new m(`.`),
				question: new m(`?`, g),
				questionDot: new m(`?.`),
				arrow: new m(`=>`, g),
				template: new m(`template`),
				invalidTemplate: new m(`invalidTemplate`),
				ellipsis: new m(`...`, g),
				backQuote: new m("`", _),
				dollarBraceL: new m("${", {
					beforeExpr: !0,
					startsExpr: !0
				}),
				eq: new m(`=`, {
					beforeExpr: !0,
					isAssign: !0
				}),
				assign: new m(`_=`, {
					beforeExpr: !0,
					isAssign: !0
				}),
				incDec: new m(`++/--`, {
					prefix: !0,
					postfix: !0,
					startsExpr: !0
				}),
				prefix: new m(`!/~`, {
					beforeExpr: !0,
					prefix: !0,
					startsExpr: !0
				}),
				logicalOR: h(`||`, 1),
				logicalAND: h(`&&`, 2),
				bitwiseOR: h(`|`, 3),
				bitwiseXOR: h(`^`, 4),
				bitwiseAND: h(`&`, 5),
				equality: h(`==/!=/===/!==`, 6),
				relational: h(`</>/<=/>=`, 7),
				bitShift: h(`<</>>/>>>`, 8),
				plusMin: new m(`+/-`, {
					beforeExpr: !0,
					binop: 9,
					prefix: !0,
					startsExpr: !0
				}),
				modulo: h(`%`, 10),
				star: h(`*`, 10),
				slash: h(`/`, 10),
				starstar: new m(`**`, { beforeExpr: !0 }),
				coalesce: h(`??`, 1),
				_break: y(`break`),
				_case: y(`case`, g),
				_catch: y(`catch`),
				_continue: y(`continue`),
				_debugger: y(`debugger`),
				_default: y(`default`, g),
				_do: y(`do`, {
					isLoop: !0,
					beforeExpr: !0
				}),
				_else: y(`else`, g),
				_finally: y(`finally`),
				_for: y(`for`, { isLoop: !0 }),
				_function: y(`function`, _),
				_if: y(`if`),
				_return: y(`return`, g),
				_switch: y(`switch`),
				_throw: y(`throw`, g),
				_try: y(`try`),
				_var: y(`var`),
				_const: y(`const`),
				_while: y(`while`, { isLoop: !0 }),
				_with: y(`with`),
				_new: y(`new`, {
					beforeExpr: !0,
					startsExpr: !0
				}),
				_this: y(`this`, _),
				_super: y(`super`, _),
				_class: y(`class`, _),
				_extends: y(`extends`, g),
				_export: y(`export`),
				_import: y(`import`, _),
				_null: y(`null`, _),
				_true: y(`true`, _),
				_false: y(`false`, _),
				_in: y(`in`, {
					beforeExpr: !0,
					binop: 7
				}),
				_instanceof: y(`instanceof`, {
					beforeExpr: !0,
					binop: 7
				}),
				_typeof: y(`typeof`, {
					beforeExpr: !0,
					prefix: !0,
					startsExpr: !0
				}),
				_void: y(`void`, {
					beforeExpr: !0,
					prefix: !0,
					startsExpr: !0
				}),
				_delete: y(`delete`, {
					beforeExpr: !0,
					prefix: !0,
					startsExpr: !0
				})
			}, x = /\r\n?|\n|\u2028|\u2029/, S = new RegExp(x.source, `g`);
			function C(e) {
				return e === 10 || e === 13 || e === 8232 || e === 8233;
			}
			function ee(e, t, n) {
				n === void 0 && (n = e.length);
				for (var r = t; r < n; r++) {
					var i = e.charCodeAt(r);
					if (C(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
				}
				return -1;
			}
			var w = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, T = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, te = Object.prototype, E = te.hasOwnProperty, ne = te.toString, re = Object.hasOwn || (function(e, t) {
				return E.call(e, t);
			}), ie = Array.isArray || (function(e) {
				return ne.call(e) === `[object Array]`;
			}), ae = Object.create(null);
			function D(e) {
				return ae[e] || (ae[e] = RegExp(`^(?:` + e.replace(/ /g, `|`) + `)$`));
			}
			function O(e) {
				return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
			}
			var k = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, oe = function(e, t) {
				this.line = e, this.column = t;
			};
			oe.prototype.offset = function(e) {
				return new oe(this.line, this.column + e);
			};
			var A = function(e, t, n) {
				this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
			};
			function se(e, t) {
				for (var n = 1, r = 0;;) {
					var i = ee(e, r, t);
					if (i < 0) return new oe(n, t - r);
					++n, r = i;
				}
			}
			var ce = {
				ecmaVersion: null,
				sourceType: `script`,
				onInsertedSemicolon: null,
				onTrailingComma: null,
				allowReserved: null,
				allowReturnOutsideFunction: !1,
				allowImportExportEverywhere: !1,
				allowAwaitOutsideFunction: null,
				allowSuperOutsideMethod: null,
				allowHashBang: !1,
				checkPrivateFields: !0,
				locations: !1,
				onToken: null,
				onComment: null,
				ranges: !1,
				program: null,
				sourceFile: null,
				directSourceFile: null,
				preserveParens: !1
			}, le = !1;
			function ue(e) {
				var t = {};
				for (var n in ce) t[n] = e && re(e, n) ? e[n] : ce[n];
				if (t.ecmaVersion === `latest` ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!le && typeof console == `object` && console.warn && (le = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), ie(t.onToken)) {
					var r = t.onToken;
					t.onToken = function(e) {
						return r.push(e);
					};
				}
				if (ie(t.onComment) && (t.onComment = de(t, t.onComment)), t.sourceType === `commonjs` && t.allowAwaitOutsideFunction) throw Error(`Cannot use allowAwaitOutsideFunction with sourceType: commonjs`);
				return t;
			}
			function de(e, t) {
				return function(n, r, i, a, o, s) {
					var c = {
						type: n ? `Block` : `Line`,
						value: r,
						start: i,
						end: a
					};
					e.locations && (c.loc = new A(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
				};
			}
			var fe = 1, pe = 2, me = 4, he = 8, ge = 16, _e = 32, ve = 64, ye = 128, be = 256, xe = 512, Se = 1024, Ce = fe | pe | be;
			function we(e, t) {
				return pe | (e ? me : 0) | (t ? he : 0);
			}
			var Te = 0, Ee = 1, De = 2, Oe = 3, j = 4, ke = 5, M = function(e, t, n) {
				this.options = e = ue(e), this.sourceFile = e.sourceFile, this.keywords = D(s[e.ecmaVersion >= 6 ? 6 : e.sourceType === `module` ? `5module` : 5]);
				var r = ``;
				e.allowReserved !== !0 && (r = a[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === `module` && (r += ` await`)), this.reservedWords = D(r);
				var i = (r ? r + ` ` : ``) + a.strict;
				this.reservedWordsStrict = D(i), this.reservedWordsStrictBind = D(i + ` ` + a.strictBind), this.input = String(t), this.containsEsc = !1, n ? (this.pos = n, this.lineStart = this.input.lastIndexOf(`
`, n - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(x).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = b.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === `module`, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === `#!` && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === `commonjs` ? pe : fe), this.regexpState = null, this.privateNameStack = [];
			}, N = {
				inFunction: { configurable: !0 },
				inGenerator: { configurable: !0 },
				inAsync: { configurable: !0 },
				canAwait: { configurable: !0 },
				allowReturn: { configurable: !0 },
				allowSuper: { configurable: !0 },
				allowDirectSuper: { configurable: !0 },
				treatFunctionsAsVar: { configurable: !0 },
				allowNewDotTarget: { configurable: !0 },
				allowUsing: { configurable: !0 },
				inClassStaticBlock: { configurable: !0 }
			};
			M.prototype.parse = function() {
				var e = this.options.program || this.startNode();
				return this.nextToken(), this.parseTopLevel(e);
			}, N.inFunction.get = function() {
				return (this.currentVarScope().flags & pe) > 0;
			}, N.inGenerator.get = function() {
				return (this.currentVarScope().flags & he) > 0;
			}, N.inAsync.get = function() {
				return (this.currentVarScope().flags & me) > 0;
			}, N.canAwait.get = function() {
				for (var e = this.scopeStack.length - 1; e >= 0; e--) {
					var t = this.scopeStack[e].flags;
					if (t & (be | xe)) return !1;
					if (t & pe) return (t & me) > 0;
				}
				return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
			}, N.allowReturn.get = function() {
				return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & fe);
			}, N.allowSuper.get = function() {
				return (this.currentThisScope().flags & ve) > 0 || this.options.allowSuperOutsideMethod;
			}, N.allowDirectSuper.get = function() {
				return (this.currentThisScope().flags & ye) > 0;
			}, N.treatFunctionsAsVar.get = function() {
				return this.treatFunctionsAsVarInScope(this.currentScope());
			}, N.allowNewDotTarget.get = function() {
				for (var e = this.scopeStack.length - 1; e >= 0; e--) {
					var t = this.scopeStack[e].flags;
					if (t & (be | xe) || t & pe && !(t & ge)) return !0;
				}
				return !1;
			}, N.allowUsing.get = function() {
				var e = this.currentScope().flags;
				return !(e & Se || !this.inModule && e & fe);
			}, N.inClassStaticBlock.get = function() {
				return (this.currentVarScope().flags & be) > 0;
			}, M.extend = function() {
				for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
				for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
				return n;
			}, M.parse = function(e, t) {
				return new this(t, e).parse();
			}, M.parseExpressionAt = function(e, t, n) {
				var r = new this(n, e, t);
				return r.nextToken(), r.parseExpression();
			}, M.tokenizer = function(e, t) {
				return new this(t, e);
			}, Object.defineProperties(M.prototype, N);
			var Ae = M.prototype, je = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
			Ae.strictDirective = function(e) {
				if (this.options.ecmaVersion < 5) return !1;
				for (;;) {
					T.lastIndex = e, e += T.exec(this.input)[0].length;
					var t = je.exec(this.input.slice(e));
					if (!t) return !1;
					if ((t[1] || t[2]) === `use strict`) {
						T.lastIndex = e + t[0].length;
						var n = T.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
						return i === `;` || i === `}` || x.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === `!` && this.input.charAt(r + 1) === `=`);
					}
					e += t[0].length, T.lastIndex = e, e += T.exec(this.input)[0].length, this.input[e] === `;` && e++;
				}
			}, Ae.eat = function(e) {
				return this.type === e ? (this.next(), !0) : !1;
			}, Ae.isContextual = function(e) {
				return this.type === b.name && this.value === e && !this.containsEsc;
			}, Ae.eatContextual = function(e) {
				return this.isContextual(e) ? (this.next(), !0) : !1;
			}, Ae.expectContextual = function(e) {
				this.eatContextual(e) || this.unexpected();
			}, Ae.canInsertSemicolon = function() {
				return this.type === b.eof || this.type === b.braceR || x.test(this.input.slice(this.lastTokEnd, this.start));
			}, Ae.insertSemicolon = function() {
				if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
			}, Ae.semicolon = function() {
				!this.eat(b.semi) && !this.insertSemicolon() && this.unexpected();
			}, Ae.afterTrailingComma = function(e, t) {
				if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
			}, Ae.expect = function(e) {
				this.eat(e) || this.unexpected();
			}, Ae.unexpected = function(e) {
				this.raise(e == null ? this.start : e, `Unexpected token`);
			};
			var Me = function() {
				this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
			};
			Ae.checkPatternErrors = function(e, t) {
				if (e) {
					e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, `Comma is not permitted after the rest element`);
					var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
					n > -1 && this.raiseRecoverable(n, t ? `Assigning to rvalue` : `Parenthesized pattern`);
				}
			}, Ae.checkExpressionErrors = function(e, t) {
				if (!e) return !1;
				var n = e.shorthandAssign, r = e.doubleProto;
				if (!t) return n >= 0 || r >= 0;
				n >= 0 && this.raise(n, `Shorthand property assignments are valid only in destructuring patterns`), r >= 0 && this.raiseRecoverable(r, `Redefinition of __proto__ property`);
			}, Ae.checkYieldAwaitInDefaultParams = function() {
				this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, `Yield expression cannot be a default value`), this.awaitPos && this.raise(this.awaitPos, `Await expression cannot be a default value`);
			}, Ae.isSimpleAssignTarget = function(e) {
				return e.type === `ParenthesizedExpression` ? this.isSimpleAssignTarget(e.expression) : e.type === `Identifier` || e.type === `MemberExpression`;
			};
			var P = M.prototype;
			P.parseTopLevel = function(e) {
				var t = Object.create(null);
				for (e.body || (e.body = []); this.type !== b.eof;) {
					var n = this.parseStatement(null, !0, t);
					e.body.push(n);
				}
				if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
					var a = i[r];
					this.raiseRecoverable(this.undefinedExports[a].start, `Export '` + a + `' is not defined`);
				}
				return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === `commonjs` ? `script` : this.options.sourceType, this.finishNode(e, `Program`);
			};
			var Ne = { kind: `loop` }, Pe = { kind: `switch` };
			P.isLet = function(e) {
				if (this.options.ecmaVersion < 6 || !this.isContextual(`let`)) return !1;
				T.lastIndex = this.pos;
				var t = T.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
				if (r === 91 || r === 92) return !0;
				if (e) return !1;
				if (r === 123) return !0;
				if (f(r)) {
					var i = n;
					do
						n += r <= 65535 ? 1 : 2;
					while (p(r = this.fullCharCodeAt(n)));
					if (r === 92) return !0;
					var a = this.input.slice(i, n);
					if (!c.test(a)) return !0;
				}
				return !1;
			}, P.isAsyncFunction = function() {
				if (this.options.ecmaVersion < 8 || !this.isContextual(`async`)) return !1;
				T.lastIndex = this.pos;
				var e = T.exec(this.input), t = this.pos + e[0].length, n;
				return !x.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === `function` && (t + 8 === this.input.length || !(p(n = this.fullCharCodeAt(t + 8)) || n === 92));
			}, P.isUsingKeyword = function(e, t) {
				if (this.options.ecmaVersion < 17 || !this.isContextual(e ? `await` : `using`)) return !1;
				T.lastIndex = this.pos;
				var n = T.exec(this.input), r = this.pos + n[0].length;
				if (x.test(this.input.slice(this.pos, r))) return !1;
				if (e) {
					var i = r + 5, a;
					if (this.input.slice(r, i) !== `using` || i === this.input.length || p(a = this.fullCharCodeAt(i)) || a === 92) return !1;
					T.lastIndex = i;
					var o = T.exec(this.input);
					if (r = i + o[0].length, o && x.test(this.input.slice(i, r))) return !1;
				}
				var s = this.fullCharCodeAt(r);
				if (!f(s) && s !== 92) return !1;
				var l = r;
				do
					r += s <= 65535 ? 1 : 2;
				while (p(s = this.fullCharCodeAt(r)));
				if (s === 92) return !0;
				var u = this.input.slice(l, r);
				return !(c.test(u) || t && u === `of`);
			}, P.isAwaitUsing = function(e) {
				return this.isUsingKeyword(!0, e);
			}, P.isUsing = function(e) {
				return this.isUsingKeyword(!1, e);
			}, P.parseStatement = function(e, t, n) {
				var r = this.type, i = this.startNode(), a;
				switch (this.isLet(e) && (r = b._var, a = `let`), r) {
					case b._break:
					case b._continue: return this.parseBreakContinueStatement(i, r.keyword);
					case b._debugger: return this.parseDebuggerStatement(i);
					case b._do: return this.parseDoStatement(i);
					case b._for: return this.parseForStatement(i);
					case b._function: return e && (this.strict || e !== `if` && e !== `label`) && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
					case b._class: return e && this.unexpected(), this.parseClass(i, !0);
					case b._if: return this.parseIfStatement(i);
					case b._return: return this.parseReturnStatement(i);
					case b._switch: return this.parseSwitchStatement(i);
					case b._throw: return this.parseThrowStatement(i);
					case b._try: return this.parseTryStatement(i);
					case b._const:
					case b._var: return a = a || this.value, e && a !== `var` && this.unexpected(), this.parseVarStatement(i, a);
					case b._while: return this.parseWhileStatement(i);
					case b._with: return this.parseWithStatement(i);
					case b.braceL: return this.parseBlock(!0, i);
					case b.semi: return this.parseEmptyStatement(i);
					case b._export:
					case b._import:
						if (this.options.ecmaVersion > 10 && r === b._import) {
							T.lastIndex = this.pos;
							var o = T.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
							if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
						}
						return this.options.allowImportExportEverywhere || (t || this.raise(this.start, `'import' and 'export' may only appear at the top level`), this.inModule || this.raise(this.start, `'import' and 'export' may appear only with 'sourceType: module'`)), r === b._import ? this.parseImport(i) : this.parseExport(i, n);
					default:
						if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
						var l = this.isAwaitUsing(!1) ? `await using` : this.isUsing(!1) ? `using` : null;
						if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), l === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, `VariableDeclaration`);
						var u = this.value, d = this.parseExpression();
						return r === b.name && d.type === `Identifier` && this.eat(b.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
				}
			}, P.parseBreakContinueStatement = function(e, t) {
				var n = t === `break`;
				this.next(), this.eat(b.semi) || this.insertSemicolon() ? e.label = null : this.type === b.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
				for (var r = 0; r < this.labels.length; ++r) {
					var i = this.labels[r];
					if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === `loop`) || e.label && n)) break;
				}
				return r === this.labels.length && this.raise(e.start, `Unsyntactic ` + t), this.finishNode(e, n ? `BreakStatement` : `ContinueStatement`);
			}, P.parseDebuggerStatement = function(e) {
				return this.next(), this.semicolon(), this.finishNode(e, `DebuggerStatement`);
			}, P.parseDoStatement = function(e) {
				return this.next(), this.labels.push(Ne), e.body = this.parseStatement(`do`), this.labels.pop(), this.expect(b._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(b.semi) : this.semicolon(), this.finishNode(e, `DoWhileStatement`);
			}, P.parseForStatement = function(e) {
				this.next();
				var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual(`await`) ? this.lastTokStart : -1;
				if (this.labels.push(Ne), this.enterScope(0), this.expect(b.parenL), this.type === b.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
				var n = this.isLet();
				if (this.type === b._var || this.type === b._const || n) {
					var r = this.startNode(), i = n ? `let` : this.value;
					return this.next(), this.parseVar(r, !0, i), this.finishNode(r, `VariableDeclaration`), this.parseForAfterInit(e, r, t);
				}
				var a = this.isContextual(`let`), o = !1, s = this.isUsing(!0) ? `using` : this.isAwaitUsing(!0) ? `await using` : null;
				if (s) {
					var c = this.startNode();
					return this.next(), s === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.parseVar(c, !0, s), this.finishNode(c, `VariableDeclaration`), this.parseForAfterInit(e, c, t);
				}
				var l = this.containsEsc, u = new Me(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, `await`) : this.parseExpression(!0, u);
				return this.type === b._in || (o = this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? (t > -1 ? (this.type === b._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === `Identifier` && f.name === `async` ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, `The left-hand side of a for-of loop may not start with 'let'.`), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
			}, P.parseForAfterInit = function(e, t, n) {
				return (this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) && t.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === b._in ? n > -1 && this.unexpected(n) : e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
			}, P.parseFunctionStatement = function(e, t, n) {
				return this.next(), this.parseFunction(e, Fe | (n ? 0 : Ie), !1, t);
			}, P.parseIfStatement = function(e) {
				return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement(`if`), e.alternate = this.eat(b._else) ? this.parseStatement(`if`) : null, this.finishNode(e, `IfStatement`);
			}, P.parseReturnStatement = function(e) {
				return this.allowReturn || this.raise(this.start, `'return' outside of function`), this.next(), this.eat(b.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, `ReturnStatement`);
			}, P.parseSwitchStatement = function(e) {
				this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(b.braceL), this.labels.push(Pe), this.enterScope(Se);
				for (var t, n = !1; this.type !== b.braceR;) if (this.type === b._case || this.type === b._default) {
					var r = this.type === b._case;
					t && this.finishNode(t, `SwitchCase`), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, `Multiple default clauses`), n = !0, t.test = null), this.expect(b.colon);
				} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
				return this.exitScope(), t && this.finishNode(t, `SwitchCase`), this.next(), this.labels.pop(), this.finishNode(e, `SwitchStatement`);
			}, P.parseThrowStatement = function(e) {
				return this.next(), x.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, `Illegal newline after throw`), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, `ThrowStatement`);
			};
			var F = [];
			P.parseCatchClauseParam = function() {
				var e = this.parseBindingAtom(), t = e.type === `Identifier`;
				return this.enterScope(t ? _e : 0), this.checkLValPattern(e, t ? j : De), this.expect(b.parenR), e;
			}, P.parseTryStatement = function(e) {
				if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === b._catch) {
					var t = this.startNode();
					this.next(), this.eat(b.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, `CatchClause`);
				}
				return e.finalizer = this.eat(b._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, `Missing catch or finally clause`), this.finishNode(e, `TryStatement`);
			}, P.parseVarStatement = function(e, t, n) {
				return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, `VariableDeclaration`);
			}, P.parseWhileStatement = function(e) {
				return this.next(), e.test = this.parseParenExpression(), this.labels.push(Ne), e.body = this.parseStatement(`while`), this.labels.pop(), this.finishNode(e, `WhileStatement`);
			}, P.parseWithStatement = function(e) {
				return this.strict && this.raise(this.start, `'with' in strict mode`), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement(`with`), this.finishNode(e, `WithStatement`);
			}, P.parseEmptyStatement = function(e) {
				return this.next(), this.finishNode(e, `EmptyStatement`);
			}, P.parseLabeledStatement = function(e, t, n, r) {
				for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, `Label '` + t + `' is already declared`);
				for (var o = this.type.isLoop ? `loop` : this.type === b._switch ? `switch` : null, s = this.labels.length - 1; s >= 0; s--) {
					var c = this.labels[s];
					if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
					else break;
				}
				return this.labels.push({
					name: t,
					kind: o,
					statementStart: this.start
				}), e.body = this.parseStatement(r ? r.indexOf(`label`) === -1 ? r + `label` : r : `label`), this.labels.pop(), e.label = n, this.finishNode(e, `LabeledStatement`);
			}, P.parseExpressionStatement = function(e, t) {
				return e.expression = t, this.semicolon(), this.finishNode(e, `ExpressionStatement`);
			}, P.parseBlock = function(e, t, n) {
				for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(b.braceL), e && this.enterScope(0); this.type !== b.braceR;) {
					var r = this.parseStatement(null);
					t.body.push(r);
				}
				return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, `BlockStatement`);
			}, P.parseFor = function(e, t) {
				return e.init = t, this.expect(b.semi), e.test = this.type === b.semi ? null : this.parseExpression(), this.expect(b.semi), e.update = this.type === b.parenR ? null : this.parseExpression(), this.expect(b.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, `ForStatement`);
			}, P.parseForIn = function(e, t) {
				var n = this.type === b._in;
				return this.next(), t.type === `VariableDeclaration` && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== `var` || t.declarations[0].id.type !== `Identifier`) && this.raise(t.start, (n ? `for-in` : `for-of`) + ` loop variable declaration may not have an initializer`), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(b.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? `ForInStatement` : `ForOfStatement`);
			}, P.parseVar = function(e, t, n, r) {
				for (e.declarations = [], e.kind = n;;) {
					var i = this.startNode();
					if (this.parseVarId(i, n), this.eat(b.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === `const` && !(this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? this.unexpected() : !r && (n === `using` || n === `await using`) && this.options.ecmaVersion >= 17 && this.type !== b._in && !this.isContextual(`of`) ? this.raise(this.lastTokEnd, `Missing initializer in ` + n + ` declaration`) : !r && i.id.type !== `Identifier` && !(t && (this.type === b._in || this.isContextual(`of`))) ? this.raise(this.lastTokEnd, `Complex binding patterns require an initialization value`) : i.init = null, e.declarations.push(this.finishNode(i, `VariableDeclarator`)), !this.eat(b.comma)) break;
				}
				return e;
			}, P.parseVarId = function(e, t) {
				e.id = t === `using` || t === `await using` ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === `var` ? Ee : De, !1);
			};
			var Fe = 1, Ie = 2, Le = 4;
			P.parseFunction = function(e, t, n, r, i) {
				this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === b.star && t & Ie && this.unexpected(), e.generator = this.eat(b.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Fe && (e.id = t & Le && this.type !== b.name ? null : this.parseIdent(), e.id && !(t & Ie) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Ee : De : Oe));
				var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
				return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(we(e.async, e.generator)), t & Fe || (e.id = this.type === b.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Fe ? `FunctionDeclaration` : `FunctionExpression`);
			}, P.parseFunctionParams = function(e) {
				this.expect(b.parenL), e.params = this.parseBindingList(b.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
			}, P.parseClass = function(e, t) {
				this.next();
				var n = this.strict;
				this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
				var r = this.enterClassBody(), i = this.startNode(), a = !1;
				for (i.body = [], this.expect(b.braceL); this.type !== b.braceR;) {
					var o = this.parseClassElement(e.superClass !== null);
					o && (i.body.push(o), o.type === `MethodDefinition` && o.kind === `constructor` ? (a && this.raiseRecoverable(o.start, `Duplicate constructor in the same class`), a = !0) : o.key && o.key.type === `PrivateIdentifier` && Re(r, o) && this.raiseRecoverable(o.key.start, `Identifier '#` + o.key.name + `' has already been declared`));
				}
				return this.strict = n, this.next(), e.body = this.finishNode(i, `ClassBody`), this.exitClassBody(), this.finishNode(e, t ? `ClassDeclaration` : `ClassExpression`);
			}, P.parseClassElement = function(e) {
				if (this.eat(b.semi)) return null;
				var t = this.options.ecmaVersion, n = this.startNode(), r = ``, i = !1, a = !1, o = `method`, s = !1;
				if (this.eatContextual(`static`)) {
					if (t >= 13 && this.eat(b.braceL)) return this.parseClassStaticBlock(n), n;
					this.isClassElementNameStart() || this.type === b.star ? s = !0 : r = `static`;
				}
				if (n.static = s, !r && t >= 8 && this.eatContextual(`async`) && ((this.isClassElementNameStart() || this.type === b.star) && !this.canInsertSemicolon() ? a = !0 : r = `async`), !r && (t >= 9 || !a) && this.eat(b.star) && (i = !0), !r && !a && !i) {
					var c = this.value;
					(this.eatContextual(`get`) || this.eatContextual(`set`)) && (this.isClassElementNameStart() ? o = c : r = c);
				}
				if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, `Identifier`)) : this.parseClassElementName(n), t < 13 || this.type === b.parenL || o !== `method` || i || a) {
					var l = !n.static && ze(n, `constructor`), u = l && e;
					l && o !== `method` && this.raise(n.key.start, `Constructor can't have get/set modifier`), n.kind = l ? `constructor` : o, this.parseClassMethod(n, i, a, u);
				} else this.parseClassField(n);
				return n;
			}, P.isClassElementNameStart = function() {
				return this.type === b.name || this.type === b.privateId || this.type === b.num || this.type === b.string || this.type === b.bracketL || this.type.keyword;
			}, P.parseClassElementName = function(e) {
				this.type === b.privateId ? (this.value === `constructor` && this.raise(this.start, `Classes can't have an element named '#constructor'`), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
			}, P.parseClassMethod = function(e, t, n, r) {
				var i = e.key;
				e.kind === `constructor` ? (t && this.raise(i.start, `Constructor can't be a generator`), n && this.raise(i.start, `Constructor can't be an async method`)) : e.static && ze(e, `prototype`) && this.raise(i.start, `Classes may not have a static property named prototype`);
				var a = e.value = this.parseMethod(t, n, r);
				return e.kind === `get` && a.params.length !== 0 && this.raiseRecoverable(a.start, `getter should have no params`), e.kind === `set` && a.params.length !== 1 && this.raiseRecoverable(a.start, `setter should have exactly one param`), e.kind === `set` && a.params[0].type === `RestElement` && this.raiseRecoverable(a.params[0].start, `Setter cannot use rest params`), this.finishNode(e, `MethodDefinition`);
			}, P.parseClassField = function(e) {
				return ze(e, `constructor`) ? this.raise(e.key.start, `Classes can't have a field named 'constructor'`) : e.static && ze(e, `prototype`) && this.raise(e.key.start, `Classes can't have a static field named 'prototype'`), this.eat(b.eq) ? (this.enterScope(xe | ve), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, `PropertyDefinition`);
			}, P.parseClassStaticBlock = function(e) {
				e.body = [];
				var t = this.labels;
				for (this.labels = [], this.enterScope(be | ve); this.type !== b.braceR;) {
					var n = this.parseStatement(null);
					e.body.push(n);
				}
				return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, `StaticBlock`);
			}, P.parseClassId = function(e, t) {
				this.type === b.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, De, !1)) : (t === !0 && this.unexpected(), e.id = null);
			}, P.parseClassSuper = function(e) {
				e.superClass = this.eat(b._extends) ? this.parseExprSubscripts(null, !1) : null;
			}, P.enterClassBody = function() {
				var e = {
					declared: Object.create(null),
					used: []
				};
				return this.privateNameStack.push(e), e.declared;
			}, P.exitClassBody = function() {
				var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
				if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
					var o = n[a];
					re(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, `Private field '#` + o.name + `' must be declared in an enclosing class`));
				}
			};
			function Re(e, t) {
				var n = t.key.name, r = e[n], i = `true`;
				return t.type === `MethodDefinition` && (t.kind === `get` || t.kind === `set`) && (i = (t.static ? `s` : `i`) + t.kind), r === `iget` && i === `iset` || r === `iset` && i === `iget` || r === `sget` && i === `sset` || r === `sset` && i === `sget` ? (e[n] = `true`, !1) : r ? !0 : (e[n] = i, !1);
			}
			function ze(e, t) {
				var n = e.computed, r = e.key;
				return !n && (r.type === `Identifier` && r.name === t || r.type === `Literal` && r.value === t);
			}
			P.parseExportAllDeclaration = function(e, t) {
				return this.options.ecmaVersion >= 11 && (this.eatContextual(`as`) ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual(`from`), this.type !== b.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ExportAllDeclaration`);
			}, P.parseExport = function(e, t) {
				if (this.next(), this.eat(b.star)) return this.parseExportAllDeclaration(e, t);
				if (this.eat(b._default)) return this.checkExport(t, `default`, this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, `ExportDefaultDeclaration`);
				if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === `VariableDeclaration` ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
				else {
					if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual(`from`)) this.type !== b.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
					else {
						for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
							var i = r[n];
							this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === `Literal` && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
						}
						e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
					}
					this.semicolon();
				}
				return this.finishNode(e, `ExportNamedDeclaration`);
			}, P.parseExportDeclaration = function(e) {
				return this.parseStatement(null);
			}, P.parseExportDefaultDeclaration = function() {
				var e;
				if (this.type === b._function || (e = this.isAsyncFunction())) {
					var t = this.startNode();
					return this.next(), e && this.next(), this.parseFunction(t, Fe | Le, !1, e);
				} else if (this.type === b._class) {
					var n = this.startNode();
					return this.parseClass(n, `nullableID`);
				} else {
					var r = this.parseMaybeAssign();
					return this.semicolon(), r;
				}
			}, P.checkExport = function(e, t, n) {
				e && (typeof t != `string` && (t = t.type === `Identifier` ? t.name : t.value), re(e, t) && this.raiseRecoverable(n, `Duplicate export '` + t + `'`), e[t] = !0);
			}, P.checkPatternExport = function(e, t) {
				var n = t.type;
				if (n === `Identifier`) this.checkExport(e, t, t.start);
				else if (n === `ObjectPattern`) for (var r = 0, i = t.properties; r < i.length; r += 1) {
					var a = i[r];
					this.checkPatternExport(e, a);
				}
				else if (n === `ArrayPattern`) for (var o = 0, s = t.elements; o < s.length; o += 1) {
					var c = s[o];
					c && this.checkPatternExport(e, c);
				}
				else n === `Property` ? this.checkPatternExport(e, t.value) : n === `AssignmentPattern` ? this.checkPatternExport(e, t.left) : n === `RestElement` && this.checkPatternExport(e, t.argument);
			}, P.checkVariableExport = function(e, t) {
				if (e) for (var n = 0, r = t; n < r.length; n += 1) {
					var i = r[n];
					this.checkPatternExport(e, i.id);
				}
			}, P.shouldParseExportStatement = function() {
				return this.type.keyword === `var` || this.type.keyword === `const` || this.type.keyword === `class` || this.type.keyword === `function` || this.isLet() || this.isAsyncFunction();
			}, P.parseExportSpecifier = function(e) {
				var t = this.startNode();
				return t.local = this.parseModuleExportName(), t.exported = this.eatContextual(`as`) ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, `ExportSpecifier`);
			}, P.parseExportSpecifiers = function(e) {
				var t = [], n = !0;
				for (this.expect(b.braceL); !this.eat(b.braceR);) {
					if (n) n = !1;
					else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
					t.push(this.parseExportSpecifier(e));
				}
				return t;
			}, P.parseImport = function(e) {
				return this.next(), this.type === b.string ? (e.specifiers = F, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual(`from`), e.source = this.type === b.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ImportDeclaration`);
			}, P.parseImportSpecifier = function() {
				var e = this.startNode();
				return e.imported = this.parseModuleExportName(), this.eatContextual(`as`) ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, De), this.finishNode(e, `ImportSpecifier`);
			}, P.parseImportDefaultSpecifier = function() {
				var e = this.startNode();
				return e.local = this.parseIdent(), this.checkLValSimple(e.local, De), this.finishNode(e, `ImportDefaultSpecifier`);
			}, P.parseImportNamespaceSpecifier = function() {
				var e = this.startNode();
				return this.next(), this.expectContextual(`as`), e.local = this.parseIdent(), this.checkLValSimple(e.local, De), this.finishNode(e, `ImportNamespaceSpecifier`);
			}, P.parseImportSpecifiers = function() {
				var e = [], t = !0;
				if (this.type === b.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(b.comma))) return e;
				if (this.type === b.star) return e.push(this.parseImportNamespaceSpecifier()), e;
				for (this.expect(b.braceL); !this.eat(b.braceR);) {
					if (t) t = !1;
					else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
					e.push(this.parseImportSpecifier());
				}
				return e;
			}, P.parseWithClause = function() {
				var e = [];
				if (!this.eat(b._with)) return e;
				this.expect(b.braceL);
				for (var t = {}, n = !0; !this.eat(b.braceR);) {
					if (n) n = !1;
					else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
					var r = this.parseImportAttribute(), i = r.key.type === `Identifier` ? r.key.name : r.key.value;
					re(t, i) && this.raiseRecoverable(r.key.start, `Duplicate attribute key '` + i + `'`), t[i] = !0, e.push(r);
				}
				return e;
			}, P.parseImportAttribute = function() {
				var e = this.startNode();
				return e.key = this.type === b.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`), this.expect(b.colon), this.type !== b.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, `ImportAttribute`);
			}, P.parseModuleExportName = function() {
				if (this.options.ecmaVersion >= 13 && this.type === b.string) {
					var e = this.parseLiteral(this.value);
					return k.test(e.value) && this.raise(e.start, `An export name cannot include a lone surrogate.`), e;
				}
				return this.parseIdent(!0);
			}, P.adaptDirectivePrologue = function(e) {
				for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
			}, P.isDirectiveCandidate = function(e) {
				return this.options.ecmaVersion >= 5 && e.type === `ExpressionStatement` && e.expression.type === `Literal` && typeof e.expression.value == `string` && (this.input[e.start] === `"` || this.input[e.start] === `'`);
			};
			var Be = M.prototype;
			Be.toAssignable = function(e, t, n) {
				if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
					case `Identifier`:
						this.inAsync && e.name === `await` && this.raise(e.start, `Cannot use 'await' as identifier inside an async function`);
						break;
					case `ObjectPattern`:
					case `ArrayPattern`:
					case `AssignmentPattern`:
					case `RestElement`: break;
					case `ObjectExpression`:
						e.type = `ObjectPattern`, n && this.checkPatternErrors(n, !0);
						for (var r = 0, i = e.properties; r < i.length; r += 1) {
							var a = i[r];
							this.toAssignable(a, t), a.type === `RestElement` && (a.argument.type === `ArrayPattern` || a.argument.type === `ObjectPattern`) && this.raise(a.argument.start, `Unexpected token`);
						}
						break;
					case `Property`:
						e.kind !== `init` && this.raise(e.key.start, `Object pattern can't contain getter or setter`), this.toAssignable(e.value, t);
						break;
					case `ArrayExpression`:
						e.type = `ArrayPattern`, n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
						break;
					case `SpreadElement`:
						e.type = `RestElement`, this.toAssignable(e.argument, t), e.argument.type === `AssignmentPattern` && this.raise(e.argument.start, `Rest elements cannot have a default value`);
						break;
					case `AssignmentExpression`:
						e.operator !== `=` && this.raise(e.left.end, `Only '=' operator can be used for specifying default value.`), e.type = `AssignmentPattern`, delete e.operator, this.toAssignable(e.left, t);
						break;
					case `ParenthesizedExpression`:
						this.toAssignable(e.expression, t, n);
						break;
					case `ChainExpression`:
						this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
						break;
					case `MemberExpression`: if (!t) break;
					default: this.raise(e.start, `Assigning to rvalue`);
				}
				else n && this.checkPatternErrors(n, !0);
				return e;
			}, Be.toAssignableList = function(e, t) {
				for (var n = e.length, r = 0; r < n; r++) {
					var i = e[r];
					i && this.toAssignable(i, t);
				}
				if (n) {
					var a = e[n - 1];
					this.options.ecmaVersion === 6 && t && a && a.type === `RestElement` && a.argument.type !== `Identifier` && this.unexpected(a.argument.start);
				}
				return e;
			}, Be.parseSpread = function(e) {
				var t = this.startNode();
				return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, `SpreadElement`);
			}, Be.parseRestBinding = function() {
				var e = this.startNode();
				return this.next(), this.options.ecmaVersion === 6 && this.type !== b.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, `RestElement`);
			}, Be.parseBindingAtom = function() {
				if (this.options.ecmaVersion >= 6) switch (this.type) {
					case b.bracketL:
						var e = this.startNode();
						return this.next(), e.elements = this.parseBindingList(b.bracketR, !0, !0), this.finishNode(e, `ArrayPattern`);
					case b.braceL: return this.parseObj(!0);
				}
				return this.parseIdent();
			}, Be.parseBindingList = function(e, t, n, r) {
				for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(b.comma), t && this.type === b.comma) i.push(null);
				else if (n && this.afterTrailingComma(e)) break;
				else if (this.type === b.ellipsis) {
					var o = this.parseRestBinding();
					this.parseBindingListItem(o), i.push(o), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.expect(e);
					break;
				} else i.push(this.parseAssignableListItem(r));
				return i;
			}, Be.parseAssignableListItem = function(e) {
				var t = this.parseMaybeDefault(this.start, this.startLoc);
				return this.parseBindingListItem(t), t;
			}, Be.parseBindingListItem = function(e) {
				return e;
			}, Be.parseMaybeDefault = function(e, t, n) {
				if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(b.eq)) return n;
				var r = this.startNodeAt(e, t);
				return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, `AssignmentPattern`);
			}, Be.checkLValSimple = function(e, t, n) {
				t === void 0 && (t = Te);
				var r = t !== Te;
				switch (e.type) {
					case `Identifier`:
						this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? `Binding ` : `Assigning to `) + e.name + ` in strict mode`), r && (t === De && e.name === `let` && this.raiseRecoverable(e.start, `let is disallowed as a lexically bound name`), n && (re(n, e.name) && this.raiseRecoverable(e.start, `Argument name clash`), n[e.name] = !0), t !== ke && this.declareName(e.name, t, e.start));
						break;
					case `ChainExpression`:
						this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
						break;
					case `MemberExpression`:
						r && this.raiseRecoverable(e.start, `Binding member expression`);
						break;
					case `ParenthesizedExpression`: return r && this.raiseRecoverable(e.start, `Binding parenthesized expression`), this.checkLValSimple(e.expression, t, n);
					default: this.raise(e.start, (r ? `Binding` : `Assigning to`) + ` rvalue`);
				}
			}, Be.checkLValPattern = function(e, t, n) {
				switch (t === void 0 && (t = Te), e.type) {
					case `ObjectPattern`:
						for (var r = 0, i = e.properties; r < i.length; r += 1) {
							var a = i[r];
							this.checkLValInnerPattern(a, t, n);
						}
						break;
					case `ArrayPattern`:
						for (var o = 0, s = e.elements; o < s.length; o += 1) {
							var c = s[o];
							c && this.checkLValInnerPattern(c, t, n);
						}
						break;
					default: this.checkLValSimple(e, t, n);
				}
			}, Be.checkLValInnerPattern = function(e, t, n) {
				switch (t === void 0 && (t = Te), e.type) {
					case `Property`:
						this.checkLValInnerPattern(e.value, t, n);
						break;
					case `AssignmentPattern`:
						this.checkLValPattern(e.left, t, n);
						break;
					case `RestElement`:
						this.checkLValPattern(e.argument, t, n);
						break;
					default: this.checkLValPattern(e, t, n);
				}
			};
			var Ve = function(e, t, n, r, i) {
				this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
			}, I = {
				b_stat: new Ve(`{`, !1),
				b_expr: new Ve(`{`, !0),
				b_tmpl: new Ve("${", !1),
				p_stat: new Ve(`(`, !1),
				p_expr: new Ve(`(`, !0),
				q_tmpl: new Ve("`", !0, !0, function(e) {
					return e.tryReadTemplateToken();
				}),
				f_stat: new Ve(`function`, !1),
				f_expr: new Ve(`function`, !0),
				f_expr_gen: new Ve(`function`, !0, !1, null, !0),
				f_gen: new Ve(`function`, !1, !1, null, !0)
			}, He = M.prototype;
			He.initialContext = function() {
				return [I.b_stat];
			}, He.curContext = function() {
				return this.context[this.context.length - 1];
			}, He.braceIsBlock = function(e) {
				var t = this.curContext();
				return t === I.f_expr || t === I.f_stat ? !0 : e === b.colon && (t === I.b_stat || t === I.b_expr) ? !t.isExpr : e === b._return || e === b.name && this.exprAllowed ? x.test(this.input.slice(this.lastTokEnd, this.start)) : e === b._else || e === b.semi || e === b.eof || e === b.parenR || e === b.arrow ? !0 : e === b.braceL ? t === I.b_stat : e === b._var || e === b._const || e === b.name ? !1 : !this.exprAllowed;
			}, He.inGeneratorContext = function() {
				for (var e = this.context.length - 1; e >= 1; e--) {
					var t = this.context[e];
					if (t.token === `function`) return t.generator;
				}
				return !1;
			}, He.updateContext = function(e) {
				var t, n = this.type;
				n.keyword && e === b.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
			}, He.overrideContext = function(e) {
				this.curContext() !== e && (this.context[this.context.length - 1] = e);
			}, b.parenR.updateContext = b.braceR.updateContext = function() {
				if (this.context.length === 1) {
					this.exprAllowed = !0;
					return;
				}
				var e = this.context.pop();
				e === I.b_stat && this.curContext().token === `function` && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
			}, b.braceL.updateContext = function(e) {
				this.context.push(this.braceIsBlock(e) ? I.b_stat : I.b_expr), this.exprAllowed = !0;
			}, b.dollarBraceL.updateContext = function() {
				this.context.push(I.b_tmpl), this.exprAllowed = !0;
			}, b.parenL.updateContext = function(e) {
				var t = e === b._if || e === b._for || e === b._with || e === b._while;
				this.context.push(t ? I.p_stat : I.p_expr), this.exprAllowed = !0;
			}, b.incDec.updateContext = function() {}, b._function.updateContext = b._class.updateContext = function(e) {
				e.beforeExpr && e !== b._else && !(e === b.semi && this.curContext() !== I.p_stat) && !(e === b._return && x.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === b.colon || e === b.braceL) && this.curContext() === I.b_stat) ? this.context.push(I.f_expr) : this.context.push(I.f_stat), this.exprAllowed = !1;
			}, b.colon.updateContext = function() {
				this.curContext().token === `function` && this.context.pop(), this.exprAllowed = !0;
			}, b.backQuote.updateContext = function() {
				this.curContext() === I.q_tmpl ? this.context.pop() : this.context.push(I.q_tmpl), this.exprAllowed = !1;
			}, b.star.updateContext = function(e) {
				if (e === b._function) {
					var t = this.context.length - 1;
					this.context[t] === I.f_expr ? this.context[t] = I.f_expr_gen : this.context[t] = I.f_gen;
				}
				this.exprAllowed = !0;
			}, b.name.updateContext = function(e) {
				var t = !1;
				this.options.ecmaVersion >= 6 && e !== b.dot && (this.value === `of` && !this.exprAllowed || this.value === `yield` && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
			};
			var L = M.prototype;
			L.checkPropClash = function(e, t, n) {
				if (!(this.options.ecmaVersion >= 9 && e.type === `SpreadElement`) && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
					var r = e.key, i;
					switch (r.type) {
						case `Identifier`:
							i = r.name;
							break;
						case `Literal`:
							i = String(r.value);
							break;
						default: return;
					}
					var a = e.kind;
					if (this.options.ecmaVersion >= 6) {
						i === `__proto__` && a === `init` && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, `Redefinition of __proto__ property`)), t.proto = !0);
						return;
					}
					i = `$` + i;
					var o = t[i];
					o ? (a === `init` ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, `Redefinition of property`) : o = t[i] = {
						init: !1,
						get: !1,
						set: !1
					}, o[a] = !0;
				}
			}, L.parseExpression = function(e, t) {
				var n = this.start, r = this.startLoc, i = this.parseMaybeAssign(e, t);
				if (this.type === b.comma) {
					var a = this.startNodeAt(n, r);
					for (a.expressions = [i]; this.eat(b.comma);) a.expressions.push(this.parseMaybeAssign(e, t));
					return this.finishNode(a, `SequenceExpression`);
				}
				return i;
			}, L.parseMaybeAssign = function(e, t, n) {
				if (this.isContextual(`yield`)) {
					if (this.inGenerator) return this.parseYield(e);
					this.exprAllowed = !1;
				}
				var r = !1, i = -1, a = -1, o = -1;
				t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new Me(), r = !0);
				var s = this.start, c = this.startLoc;
				(this.type === b.parenL || this.type === b.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === `await`);
				var l = this.parseMaybeConditional(e, t);
				if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
					var u = this.startNodeAt(s, c);
					return u.operator = this.value, this.type === b.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === b.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, `AssignmentExpression`);
				} else r && this.checkExpressionErrors(t, !0);
				return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
			}, L.parseMaybeConditional = function(e, t) {
				var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
				if (this.checkExpressionErrors(t)) return i;
				if (this.eat(b.question)) {
					var a = this.startNodeAt(n, r);
					return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(b.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, `ConditionalExpression`);
				}
				return i;
			}, L.parseExprOps = function(e, t) {
				var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
				return this.checkExpressionErrors(t) || i.start === n && i.type === `ArrowFunctionExpression` ? i : this.parseExprOp(i, n, r, -1, e);
			}, L.parseExprOp = function(e, t, n, r, i) {
				var a = this.type.binop;
				if (a != null && (!i || this.type !== b._in) && a > r) {
					var o = this.type === b.logicalOR || this.type === b.logicalAND, s = this.type === b.coalesce;
					s && (a = b.logicalAND.binop);
					var c = this.value;
					this.next();
					var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
					return (o && this.type === b.coalesce || s && (this.type === b.logicalOR || this.type === b.logicalAND)) && this.raiseRecoverable(this.start, `Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses`), this.parseExprOp(f, t, n, r, i);
				}
				return e;
			}, L.buildBinary = function(e, t, n, r, i, a) {
				r.type === `PrivateIdentifier` && this.raise(r.start, `Private identifier can only be left side of binary expression`);
				var o = this.startNodeAt(e, t);
				return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? `LogicalExpression` : `BinaryExpression`);
			}, L.parseMaybeUnary = function(e, t, n, r) {
				var i = this.start, a = this.startLoc, o;
				if (this.isContextual(`await`) && this.canAwait) o = this.parseAwait(r), t = !0;
				else if (this.type.prefix) {
					var s = this.startNode(), c = this.type === b.incDec;
					s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === `delete` && Ue(s.argument) ? this.raiseRecoverable(s.start, `Deleting local variable in strict mode`) : s.operator === `delete` && We(s.argument) ? this.raiseRecoverable(s.start, `Private fields can not be deleted`) : t = !0, o = this.finishNode(s, c ? `UpdateExpression` : `UnaryExpression`);
				} else if (!t && this.type === b.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== b._in && this.unexpected();
				else {
					if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
					for (; this.type.postfix && !this.canInsertSemicolon();) {
						var l = this.startNodeAt(i, a);
						l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, `UpdateExpression`);
					}
				}
				if (!n && this.eat(b.starstar)) if (t) this.unexpected(this.lastTokStart);
				else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), `**`, !1);
				else return o;
			};
			function Ue(e) {
				return e.type === `Identifier` || e.type === `ParenthesizedExpression` && Ue(e.expression);
			}
			function We(e) {
				return e.type === `MemberExpression` && e.property.type === `PrivateIdentifier` || e.type === `ChainExpression` && We(e.expression) || e.type === `ParenthesizedExpression` && We(e.expression);
			}
			L.parseExprSubscripts = function(e, t) {
				var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
				if (i.type === `ArrowFunctionExpression` && this.input.slice(this.lastTokStart, this.lastTokEnd) !== `)`) return i;
				var a = this.parseSubscripts(i, n, r, !1, t);
				return e && a.type === `MemberExpression` && (e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1), e.trailingComma >= a.start && (e.trailingComma = -1)), a;
			}, L.parseSubscripts = function(e, t, n, r, i) {
				for (var a = this.options.ecmaVersion >= 8 && e.type === `Identifier` && e.name === `async` && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
					var s = this.parseSubscript(e, t, n, r, a, o, i);
					if (s.optional && (o = !0), s === e || s.type === `ArrowFunctionExpression`) {
						if (o) {
							var c = this.startNodeAt(t, n);
							c.expression = s, s = this.finishNode(c, `ChainExpression`);
						}
						return s;
					}
					e = s;
				}
			}, L.shouldParseAsyncArrow = function() {
				return !this.canInsertSemicolon() && this.eat(b.arrow);
			}, L.parseSubscriptAsyncArrow = function(e, t, n, r) {
				return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
			}, L.parseSubscript = function(e, t, n, r, i, a, o) {
				var s = this.options.ecmaVersion >= 11, c = s && this.eat(b.questionDot);
				r && c && this.raise(this.lastTokStart, `Optional chaining cannot appear in the callee of new expressions`);
				var l = this.eat(b.bracketL);
				if (l || c && this.type !== b.parenL && this.type !== b.backQuote || this.eat(b.dot)) {
					var u = this.startNodeAt(t, n);
					u.object = e, l ? (u.property = this.parseExpression(), this.expect(b.bracketR)) : this.type === b.privateId && e.type !== `Super` ? u.property = this.parsePrivateIdent() : u.property = this.parseIdent(this.options.allowReserved !== `never`), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, `MemberExpression`);
				} else if (!r && this.eat(b.parenL)) {
					var d = new Me(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
					this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
					var h = this.parseExprList(b.parenR, this.options.ecmaVersion >= 8, !1, d);
					if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, `Cannot use 'await' as identifier inside an async function`), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
					this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
					var g = this.startNodeAt(t, n);
					g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, `CallExpression`);
				} else if (this.type === b.backQuote) {
					(c || a) && this.raise(this.start, `Optional chaining cannot appear in the tag of tagged template expressions`);
					var _ = this.startNodeAt(t, n);
					_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, `TaggedTemplateExpression`);
				}
				return e;
			}, L.parseExprAtom = function(e, t, n) {
				this.type === b.slash && this.readRegexp();
				var r, i = this.potentialArrowAt === this.start;
				switch (this.type) {
					case b._super: return this.allowSuper || this.raise(this.start, `'super' keyword outside a method`), r = this.startNode(), this.next(), this.type === b.parenL && !this.allowDirectSuper && this.raise(r.start, `super() call outside constructor of a subclass`), this.type !== b.dot && this.type !== b.bracketL && this.type !== b.parenL && this.unexpected(), this.finishNode(r, `Super`);
					case b._this: return r = this.startNode(), this.next(), this.finishNode(r, `ThisExpression`);
					case b.name:
						var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
						if (this.options.ecmaVersion >= 8 && !s && c.name === `async` && !this.canInsertSemicolon() && this.eat(b._function)) return this.overrideContext(I.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
						if (i && !this.canInsertSemicolon()) {
							if (this.eat(b.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
							if (this.options.ecmaVersion >= 8 && c.name === `async` && this.type === b.name && !s && (!this.potentialArrowInForAwait || this.value !== `of` || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(b.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
						}
						return c;
					case b.regexp:
						var l = this.value;
						return r = this.parseLiteral(l.value), r.regex = {
							pattern: l.pattern,
							flags: l.flags
						}, r;
					case b.num:
					case b.string: return this.parseLiteral(this.value);
					case b._null:
					case b._true:
					case b._false: return r = this.startNode(), r.value = this.type === b._null ? null : this.type === b._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, `Literal`);
					case b.parenL:
						var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
						return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
					case b.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(b.bracketR, !0, !0, e), this.finishNode(r, `ArrayExpression`);
					case b.braceL: return this.overrideContext(I.b_expr), this.parseObj(!1, e);
					case b._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
					case b._class: return this.parseClass(this.startNode(), !1);
					case b._new: return this.parseNew();
					case b.backQuote: return this.parseTemplate();
					case b._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
					default: return this.parseExprAtomDefault();
				}
			}, L.parseExprAtomDefault = function() {
				this.unexpected();
			}, L.parseExprImport = function(e) {
				var t = this.startNode();
				if (this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword import`), this.next(), this.type === b.parenL && !e) return this.parseDynamicImport(t);
				if (this.type === b.dot) {
					var n = this.startNodeAt(t.start, t.loc && t.loc.start);
					return n.name = `import`, t.meta = this.finishNode(n, `Identifier`), this.parseImportMeta(t);
				} else this.unexpected();
			}, L.parseDynamicImport = function(e) {
				if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(b.parenR) ? e.options = null : (this.expect(b.comma), this.afterTrailingComma(b.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(b.parenR) || (this.expect(b.comma), this.afterTrailingComma(b.parenR) || this.unexpected())));
				else if (!this.eat(b.parenR)) {
					var t = this.start;
					this.eat(b.comma) && this.eat(b.parenR) ? this.raiseRecoverable(t, `Trailing comma is not allowed in import()`) : this.unexpected(t);
				}
				return this.finishNode(e, `ImportExpression`);
			}, L.parseImportMeta = function(e) {
				this.next();
				var t = this.containsEsc;
				return e.property = this.parseIdent(!0), e.property.name !== `meta` && this.raiseRecoverable(e.property.start, `The only valid meta property for import is 'import.meta'`), t && this.raiseRecoverable(e.start, `'import.meta' must not contain escaped characters`), this.options.sourceType !== `module` && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, `Cannot use 'import.meta' outside a module`), this.finishNode(e, `MetaProperty`);
			}, L.parseLiteral = function(e) {
				var t = this.startNode();
				return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, ``) : t.value.toString()), this.next(), this.finishNode(t, `Literal`);
			}, L.parseParenExpression = function() {
				this.expect(b.parenL);
				var e = this.parseExpression();
				return this.expect(b.parenR), e;
			}, L.shouldParseArrow = function(e) {
				return !this.canInsertSemicolon();
			}, L.parseParenAndDistinguishExpression = function(e, t) {
				var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
				if (this.options.ecmaVersion >= 6) {
					this.next();
					var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new Me(), f = this.yieldPos, p = this.awaitPos, m;
					for (this.yieldPos = 0, this.awaitPos = 0; this.type !== b.parenR;) if (l ? l = !1 : this.expect(b.comma), a && this.afterTrailingComma(b.parenR, !0)) {
						u = !0;
						break;
					} else if (this.type === b.ellipsis) {
						m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`);
						break;
					} else c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
					var h = this.lastTokEnd, g = this.lastTokEndLoc;
					if (this.expect(b.parenR), e && this.shouldParseArrow(c) && this.eat(b.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
					(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, `SequenceExpression`, h, g)) : i = c[0];
				} else i = this.parseParenExpression();
				if (this.options.preserveParens) {
					var _ = this.startNodeAt(n, r);
					return _.expression = i, this.finishNode(_, `ParenthesizedExpression`);
				} else return i;
			}, L.parseParenItem = function(e) {
				return e;
			}, L.parseParenArrowList = function(e, t, n, r) {
				return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
			};
			var Ge = [];
			L.parseNew = function() {
				this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword new`);
				var e = this.startNode();
				if (this.next(), this.options.ecmaVersion >= 6 && this.type === b.dot) {
					var t = this.startNodeAt(e.start, e.loc && e.loc.start);
					t.name = `new`, e.meta = this.finishNode(t, `Identifier`), this.next();
					var n = this.containsEsc;
					return e.property = this.parseIdent(!0), e.property.name !== `target` && this.raiseRecoverable(e.property.start, `The only valid meta property for new is 'new.target'`), n && this.raiseRecoverable(e.start, `'new.target' must not contain escaped characters`), this.allowNewDotTarget || this.raiseRecoverable(e.start, `'new.target' can only be used in functions and class static block`), this.finishNode(e, `MetaProperty`);
				}
				var r = this.start, i = this.startLoc;
				return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), this.eat(b.parenL) ? e.arguments = this.parseExprList(b.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Ge, this.finishNode(e, `NewExpression`);
			}, L.parseTemplateElement = function(e) {
				var t = e.isTagged, n = this.startNode();
				return this.type === b.invalidTemplate ? (t || this.raiseRecoverable(this.start, `Bad escape sequence in untagged template literal`), n.value = {
					raw: this.value.replace(/\r\n?/g, `
`),
					cooked: null
				}) : n.value = {
					raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
					cooked: this.value
				}, this.next(), n.tail = this.type === b.backQuote, this.finishNode(n, `TemplateElement`);
			}, L.parseTemplate = function(e) {
				e === void 0 && (e = {});
				var t = e.isTagged;
				t === void 0 && (t = !1);
				var n = this.startNode();
				this.next(), n.expressions = [];
				var r = this.parseTemplateElement({ isTagged: t });
				for (n.quasis = [r]; !r.tail;) this.type === b.eof && this.raise(this.pos, `Unterminated template literal`), this.expect(b.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(b.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
				return this.next(), this.finishNode(n, `TemplateLiteral`);
			}, L.isAsyncProp = function(e) {
				return !e.computed && e.key.type === `Identifier` && e.key.name === `async` && (this.type === b.name || this.type === b.num || this.type === b.string || this.type === b.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === b.star) && !x.test(this.input.slice(this.lastTokEnd, this.start));
			}, L.parseObj = function(e, t) {
				var n = this.startNode(), r = !0, i = {};
				for (n.properties = [], this.next(); !this.eat(b.braceR);) {
					if (r) r = !1;
					else if (this.expect(b.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(b.braceR)) break;
					var a = this.parseProperty(e, t);
					e || this.checkPropClash(a, i, t), n.properties.push(a);
				}
				return this.finishNode(n, e ? `ObjectPattern` : `ObjectExpression`);
			}, L.parseProperty = function(e, t) {
				var n = this.startNode(), r, i, a, o;
				if (this.options.ecmaVersion >= 9 && this.eat(b.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.finishNode(n, `RestElement`)) : (n.argument = this.parseMaybeAssign(!1, t), this.type === b.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, `SpreadElement`));
				this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(b.star)));
				var s = this.containsEsc;
				return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(b.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, `Property`);
			}, L.parseGetterSetter = function(e) {
				var t = e.key.name;
				this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
				var n = e.kind === `get` ? 0 : 1;
				if (e.value.params.length !== n) {
					var r = e.value.start;
					e.kind === `get` ? this.raiseRecoverable(r, `getter should have no params`) : this.raiseRecoverable(r, `setter should have exactly one param`);
				} else e.kind === `set` && e.value.params[0].type === `RestElement` && this.raiseRecoverable(e.value.params[0].start, `Setter cannot use rest params`);
			}, L.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
				(n || r) && this.type === b.colon && this.unexpected(), this.eat(b.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = `init`) : this.options.ecmaVersion >= 6 && this.type === b.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = `init`) : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === `Identifier` && (e.key.name === `get` || e.key.name === `set`) && this.type !== b.comma && this.type !== b.braceR && this.type !== b.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === `Identifier` ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === b.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = `init`, e.shorthand = !0) : this.unexpected();
			}, L.parsePropertyName = function(e) {
				if (this.options.ecmaVersion >= 6) {
					if (this.eat(b.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(b.bracketR), e.key;
					e.computed = !1;
				}
				return e.key = this.type === b.num || this.type === b.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`);
			}, L.initFunction = function(e) {
				e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
			}, L.parseMethod = function(e, t, n) {
				var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
				return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(we(t, r.generator) | ve | (n ? ye : 0)), this.expect(b.parenL), r.params = this.parseBindingList(b.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, `FunctionExpression`);
			}, L.parseArrowExpression = function(e, t, n, r) {
				var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
				return this.enterScope(we(n, !1) | ge), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, `ArrowFunctionExpression`);
			}, L.parseFunctionBody = function(e, t, n, r) {
				var i = t && this.type !== b.braceL, a = this.strict, o = !1;
				if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
				else {
					var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
					(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, `Illegal 'use strict' directive in function with non-simple parameter list`));
					var c = this.labels;
					this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, ke), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
				}
				this.exitScope();
			}, L.isSimpleParamList = function(e) {
				for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== `Identifier`) return !1;
				return !0;
			}, L.checkParams = function(e, t) {
				for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
					var a = i[r];
					this.checkLValInnerPattern(a, Ee, t ? null : n);
				}
			}, L.parseExprList = function(e, t, n, r) {
				for (var i = [], a = !0; !this.eat(e);) {
					if (a) a = !1;
					else if (this.expect(b.comma), t && this.afterTrailingComma(e)) break;
					var o = void 0;
					n && this.type === b.comma ? o = null : this.type === b.ellipsis ? (o = this.parseSpread(r), r && this.type === b.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
				}
				return i;
			}, L.checkUnreserved = function(e) {
				var t = e.start, n = e.end, r = e.name;
				this.inGenerator && r === `yield` && this.raiseRecoverable(t, `Cannot use 'yield' as identifier inside a generator`), this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use 'await' as identifier inside an async function`), !(this.currentThisScope().flags & Ce) && r === `arguments` && this.raiseRecoverable(t, `Cannot use 'arguments' in class field initializer`), this.inClassStaticBlock && (r === `arguments` || r === `await`) && this.raise(t, `Cannot use ` + r + ` in class static initialization block`), this.keywords.test(r) && this.raise(t, `Unexpected keyword '` + r + `'`), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf(`\\`) !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use keyword 'await' outside an async function`), this.raiseRecoverable(t, `The keyword '` + r + `' is reserved`));
			}, L.parseIdent = function(e) {
				var t = this.parseIdentNode();
				return this.next(!!e), this.finishNode(t, `Identifier`), e || (this.checkUnreserved(t), t.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
			}, L.parseIdentNode = function() {
				var e = this.startNode();
				return this.type === b.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === `class` || e.name === `function`) && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = b.name) : this.unexpected(), e;
			}, L.parsePrivateIdent = function() {
				var e = this.startNode();
				return this.type === b.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, `PrivateIdentifier`), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, `Private field '#` + e.name + `' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
			}, L.parseYield = function(e) {
				this.yieldPos || (this.yieldPos = this.start);
				var t = this.startNode();
				return this.next(), this.type === b.semi || this.canInsertSemicolon() || this.type !== b.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(b.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, `YieldExpression`);
			}, L.parseAwait = function(e) {
				this.awaitPos || (this.awaitPos = this.start);
				var t = this.startNode();
				return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, `AwaitExpression`);
			};
			var Ke = M.prototype;
			Ke.raise = function(e, t) {
				var n = se(this.input, e);
				t += ` (` + n.line + `:` + n.column + `)`, this.sourceFile && (t += ` in ` + this.sourceFile);
				var r = SyntaxError(t);
				throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
			}, Ke.raiseRecoverable = Ke.raise, Ke.curPosition = function() {
				if (this.options.locations) return new oe(this.curLine, this.pos - this.lineStart);
			};
			var qe = M.prototype, Je = function(e) {
				this.flags = e, this.var = [], this.lexical = [], this.functions = [];
			};
			qe.enterScope = function(e) {
				this.scopeStack.push(new Je(e));
			}, qe.exitScope = function() {
				this.scopeStack.pop();
			}, qe.treatFunctionsAsVarInScope = function(e) {
				return e.flags & pe || !this.inModule && e.flags & fe;
			}, qe.declareName = function(e, t, n) {
				var r = !1;
				if (t === De) {
					var i = this.currentScope();
					r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & fe && delete this.undefinedExports[e];
				} else if (t === j) this.currentScope().lexical.push(e);
				else if (t === Oe) {
					var a = this.currentScope();
					r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
				} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
					var s = this.scopeStack[o];
					if (s.lexical.indexOf(e) > -1 && !(s.flags & _e && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
						r = !0;
						break;
					}
					if (s.var.push(e), this.inModule && s.flags & fe && delete this.undefinedExports[e], s.flags & Ce) break;
				}
				r && this.raiseRecoverable(n, `Identifier '` + e + `' has already been declared`);
			}, qe.checkLocalExport = function(e) {
				this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
			}, qe.currentScope = function() {
				return this.scopeStack[this.scopeStack.length - 1];
			}, qe.currentVarScope = function() {
				for (var e = this.scopeStack.length - 1;; e--) {
					var t = this.scopeStack[e];
					if (t.flags & (Ce | xe | be)) return t;
				}
			}, qe.currentThisScope = function() {
				for (var e = this.scopeStack.length - 1;; e--) {
					var t = this.scopeStack[e];
					if (t.flags & (Ce | xe | be) && !(t.flags & ge)) return t;
				}
			};
			var Ye = function(e, t, n) {
				this.type = ``, this.start = t, this.end = 0, e.options.locations && (this.loc = new A(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
			}, Xe = M.prototype;
			Xe.startNode = function() {
				return new Ye(this, this.start, this.startLoc);
			}, Xe.startNodeAt = function(e, t) {
				return new Ye(this, e, t);
			};
			function Ze(e, t, n, r) {
				return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
			}
			Xe.finishNode = function(e, t) {
				return Ze.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
			}, Xe.finishNodeAt = function(e, t, n, r) {
				return Ze.call(this, e, t, n, r);
			}, Xe.copyNode = function(e) {
				var t = new Ye(this, e.start, this.startLoc);
				for (var n in e) t[n] = e[n];
				return t;
			};
			var Qe = `Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz`, $e = `ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS`, et = $e + ` Extended_Pictographic`, tt = et, nt = tt + ` EBase EComp EMod EPres ExtPict`, rt = nt, it = {
				9: $e,
				10: et,
				11: tt,
				12: nt,
				13: rt,
				14: rt
			}, at = {
				9: ``,
				10: ``,
				11: ``,
				12: ``,
				13: ``,
				14: `Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji`
			}, ot = `Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu`, st = `Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb`, ct = st + ` Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd`, lt = ct + ` Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho`, ut = lt + ` Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi`, dt = ut + ` Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith`, ft = {
				9: st,
				10: ct,
				11: lt,
				12: ut,
				13: dt,
				14: dt + ` ` + Qe
			}, pt = {};
			function mt(e) {
				var t = pt[e] = {
					binary: D(it[e] + ` ` + ot),
					binaryOfStrings: D(at[e]),
					nonBinary: {
						General_Category: D(ot),
						Script: D(ft[e])
					}
				};
				t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
			}
			for (var ht = 0, gt = [
				9,
				10,
				11,
				12,
				13,
				14
			]; ht < gt.length; ht += 1) {
				var _t = gt[ht];
				mt(_t);
			}
			var R = M.prototype, vt = function(e, t) {
				this.parent = e, this.base = t || this;
			};
			vt.prototype.separatedFrom = function(e) {
				for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
				return !1;
			}, vt.prototype.sibling = function() {
				return new vt(this.parent, this.base);
			};
			var yt = function(e) {
				this.parser = e, this.validFlags = `gim` + (e.options.ecmaVersion >= 6 ? `uy` : ``) + (e.options.ecmaVersion >= 9 ? `s` : ``) + (e.options.ecmaVersion >= 13 ? `d` : ``) + (e.options.ecmaVersion >= 15 ? `v` : ``), this.unicodeProperties = pt[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = ``, this.flags = ``, this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = ``, this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
			};
			yt.prototype.reset = function(e, t, n) {
				var r = n.indexOf(`v`) !== -1, i = n.indexOf(`u`) !== -1;
				this.start = e | 0, this.source = t + ``, this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
			}, yt.prototype.raise = function(e) {
				this.parser.raiseRecoverable(this.start, `Invalid regular expression: /` + this.source + `/: ` + e);
			}, yt.prototype.at = function(e, t) {
				t === void 0 && (t = !1);
				var n = this.source, r = n.length;
				if (e >= r) return -1;
				var i = n.charCodeAt(e);
				if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
				var a = n.charCodeAt(e + 1);
				return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
			}, yt.prototype.nextIndex = function(e, t) {
				t === void 0 && (t = !1);
				var n = this.source, r = n.length;
				if (e >= r) return r;
				var i = n.charCodeAt(e), a;
				return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
			}, yt.prototype.current = function(e) {
				return e === void 0 && (e = !1), this.at(this.pos, e);
			}, yt.prototype.lookahead = function(e) {
				return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
			}, yt.prototype.advance = function(e) {
				e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
			}, yt.prototype.eat = function(e, t) {
				return t === void 0 && (t = !1), this.current(t) === e ? (this.advance(t), !0) : !1;
			}, yt.prototype.eatChars = function(e, t) {
				t === void 0 && (t = !1);
				for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
					var a = i[r], o = this.at(n, t);
					if (o === -1 || o !== a) return !1;
					n = this.nextIndex(n, t);
				}
				return this.pos = n, !0;
			}, R.validateRegExpFlags = function(e) {
				for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
					var o = n.charAt(a);
					t.indexOf(o) === -1 && this.raise(e.start, `Invalid regular expression flag`), n.indexOf(o, a + 1) > -1 && this.raise(e.start, `Duplicate regular expression flag`), o === `u` && (r = !0), o === `v` && (i = !0);
				}
				this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, `Invalid regular expression flag`);
			};
			function bt(e) {
				for (var t in e) return !0;
				return !1;
			}
			R.validateRegExpPattern = function(e) {
				this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && bt(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
			}, R.regexp_pattern = function(e) {
				e.pos = 0, e.lastIntValue = 0, e.lastStringValue = ``, e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise(`Unmatched ')'`), (e.eat(93) || e.eat(125)) && e.raise(`Lone quantifier brackets`)), e.maxBackReference > e.numCapturingParens && e.raise(`Invalid escape`);
				for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
					var r = n[t];
					e.groupNames[r] || e.raise(`Invalid named capture referenced`);
				}
			}, R.regexp_disjunction = function(e) {
				var t = this.options.ecmaVersion >= 16;
				for (t && (e.branchID = new vt(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
				t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise(`Nothing to repeat`), e.eat(123) && e.raise(`Lone quantifier brackets`);
			}, R.regexp_alternative = function(e) {
				for (; e.pos < e.source.length && this.regexp_eatTerm(e););
			}, R.regexp_eatTerm = function(e) {
				return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise(`Invalid quantifier`), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
			}, R.regexp_eatAssertion = function(e) {
				var t = e.pos;
				if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
				if (e.eat(92)) {
					if (e.eat(66) || e.eat(98)) return !0;
					e.pos = t;
				}
				if (e.eat(40) && e.eat(63)) {
					var n = !1;
					if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise(`Unterminated group`), e.lastAssertionIsQuantifiable = !n, !0;
				}
				return e.pos = t, !1;
			}, R.regexp_eatQuantifier = function(e, t) {
				return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
			}, R.regexp_eatQuantifierPrefix = function(e, t) {
				return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
			}, R.regexp_eatBracedQuantifier = function(e, t) {
				var n = e.pos;
				if (e.eat(123)) {
					var r = 0, i = -1;
					if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise(`numbers out of order in {} quantifier`), !0;
					e.switchU && !t && e.raise(`Incomplete quantifier`), e.pos = n;
				}
				return !1;
			}, R.regexp_eatAtom = function(e) {
				return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
			}, R.regexp_eatReverseSolidusAtomEscape = function(e) {
				var t = e.pos;
				if (e.eat(92)) {
					if (this.regexp_eatAtomEscape(e)) return !0;
					e.pos = t;
				}
				return !1;
			}, R.regexp_eatUncapturingGroup = function(e) {
				var t = e.pos;
				if (e.eat(40)) {
					if (e.eat(63)) {
						if (this.options.ecmaVersion >= 16) {
							var n = this.regexp_eatModifiers(e), r = e.eat(45);
							if (n || r) {
								for (var i = 0; i < n.length; i++) {
									var a = n.charAt(i);
									n.indexOf(a, i + 1) > -1 && e.raise(`Duplicate regular expression modifiers`);
								}
								if (r) {
									var o = this.regexp_eatModifiers(e);
									!n && !o && e.current() === 58 && e.raise(`Invalid regular expression modifiers`);
									for (var s = 0; s < o.length; s++) {
										var c = o.charAt(s);
										(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise(`Duplicate regular expression modifiers`);
									}
								}
							}
						}
						if (e.eat(58)) {
							if (this.regexp_disjunction(e), e.eat(41)) return !0;
							e.raise(`Unterminated group`);
						}
					}
					e.pos = t;
				}
				return !1;
			}, R.regexp_eatCapturingGroup = function(e) {
				if (e.eat(40)) {
					if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise(`Invalid group`), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
					e.raise(`Unterminated group`);
				}
				return !1;
			}, R.regexp_eatModifiers = function(e) {
				for (var t = ``, n = 0; (n = e.current()) !== -1 && xt(n);) t += O(n), e.advance();
				return t;
			};
			function xt(e) {
				return e === 105 || e === 109 || e === 115;
			}
			R.regexp_eatExtendedAtom = function(e) {
				return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
			}, R.regexp_eatInvalidBracedQuantifier = function(e) {
				return this.regexp_eatBracedQuantifier(e, !0) && e.raise(`Nothing to repeat`), !1;
			}, R.regexp_eatSyntaxCharacter = function(e) {
				var t = e.current();
				return St(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
			};
			function St(e) {
				return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
			}
			R.regexp_eatPatternCharacters = function(e) {
				for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !St(n);) e.advance();
				return e.pos !== t;
			}, R.regexp_eatExtendedPatternCharacter = function(e) {
				var t = e.current();
				return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
			}, R.regexp_groupSpecifier = function(e) {
				if (e.eat(63)) {
					this.regexp_eatGroupName(e) || e.raise(`Invalid group`);
					var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
					if (n) if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise(`Duplicate capture group name`);
					else e.raise(`Duplicate capture group name`);
					t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
				}
			}, R.regexp_eatGroupName = function(e) {
				if (e.lastStringValue = ``, e.eat(60)) {
					if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
					e.raise(`Invalid capture group name`);
				}
				return !1;
			}, R.regexp_eatRegExpIdentifierName = function(e) {
				if (e.lastStringValue = ``, this.regexp_eatRegExpIdentifierStart(e)) {
					for (e.lastStringValue += O(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += O(e.lastIntValue);
					return !0;
				}
				return !1;
			}, R.regexp_eatRegExpIdentifierStart = function(e) {
				var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
				return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), Ct(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
			};
			function Ct(e) {
				return f(e, !0) || e === 36 || e === 95;
			}
			R.regexp_eatRegExpIdentifierPart = function(e) {
				var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
				return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), wt(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
			};
			function wt(e) {
				return p(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
			}
			R.regexp_eatAtomEscape = function(e) {
				return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise(`Invalid unicode escape`), e.raise(`Invalid escape`)), !1);
			}, R.regexp_eatBackReference = function(e) {
				var t = e.pos;
				if (this.regexp_eatDecimalEscape(e)) {
					var n = e.lastIntValue;
					if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
					if (n <= e.numCapturingParens) return !0;
					e.pos = t;
				}
				return !1;
			}, R.regexp_eatKGroupName = function(e) {
				if (e.eat(107)) {
					if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
					e.raise(`Invalid named reference`);
				}
				return !1;
			}, R.regexp_eatCharacterEscape = function(e) {
				return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
			}, R.regexp_eatCControlLetter = function(e) {
				var t = e.pos;
				if (e.eat(99)) {
					if (this.regexp_eatControlLetter(e)) return !0;
					e.pos = t;
				}
				return !1;
			}, R.regexp_eatZero = function(e) {
				return e.current() === 48 && !It(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
			}, R.regexp_eatControlEscape = function(e) {
				var t = e.current();
				return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
			}, R.regexp_eatControlLetter = function(e) {
				var t = e.current();
				return Tt(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
			};
			function Tt(e) {
				return e >= 65 && e <= 90 || e >= 97 && e <= 122;
			}
			R.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
				t === void 0 && (t = !1);
				var n = e.pos, r = t || e.switchU;
				if (e.eat(117)) {
					if (this.regexp_eatFixedHexDigits(e, 4)) {
						var i = e.lastIntValue;
						if (r && i >= 55296 && i <= 56319) {
							var a = e.pos;
							if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
								var o = e.lastIntValue;
								if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
							}
							e.pos = a, e.lastIntValue = i;
						}
						return !0;
					}
					if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Et(e.lastIntValue)) return !0;
					r && e.raise(`Invalid unicode escape`), e.pos = n;
				}
				return !1;
			};
			function Et(e) {
				return e >= 0 && e <= 1114111;
			}
			R.regexp_eatIdentityEscape = function(e) {
				if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
				var t = e.current();
				return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
			}, R.regexp_eatDecimalEscape = function(e) {
				e.lastIntValue = 0;
				var t = e.current();
				if (t >= 49 && t <= 57) {
					do
						e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
					while ((t = e.current()) >= 48 && t <= 57);
					return !0;
				}
				return !1;
			};
			var Dt = 0, Ot = 1, kt = 2;
			R.regexp_eatCharacterClassEscape = function(e) {
				var t = e.current();
				if (At(t)) return e.lastIntValue = -1, e.advance(), Ot;
				var n = !1;
				if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
					e.lastIntValue = -1, e.advance();
					var r;
					if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === kt && e.raise(`Invalid property name`), r;
					e.raise(`Invalid property name`);
				}
				return Dt;
			};
			function At(e) {
				return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
			}
			R.regexp_eatUnicodePropertyValueExpression = function(e) {
				var t = e.pos;
				if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
					var n = e.lastStringValue;
					if (this.regexp_eatUnicodePropertyValue(e)) {
						var r = e.lastStringValue;
						return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), Ot;
					}
				}
				if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
					var i = e.lastStringValue;
					return this.regexp_validateUnicodePropertyNameOrValue(e, i);
				}
				return Dt;
			}, R.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
				re(e.unicodeProperties.nonBinary, t) || e.raise(`Invalid property name`), e.unicodeProperties.nonBinary[t].test(n) || e.raise(`Invalid property value`);
			}, R.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
				if (e.unicodeProperties.binary.test(t)) return Ot;
				if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return kt;
				e.raise(`Invalid property name`);
			}, R.regexp_eatUnicodePropertyName = function(e) {
				var t = 0;
				for (e.lastStringValue = ``; jt(t = e.current());) e.lastStringValue += O(t), e.advance();
				return e.lastStringValue !== ``;
			};
			function jt(e) {
				return Tt(e) || e === 95;
			}
			R.regexp_eatUnicodePropertyValue = function(e) {
				var t = 0;
				for (e.lastStringValue = ``; Mt(t = e.current());) e.lastStringValue += O(t), e.advance();
				return e.lastStringValue !== ``;
			};
			function Mt(e) {
				return jt(e) || It(e);
			}
			R.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
				return this.regexp_eatUnicodePropertyValue(e);
			}, R.regexp_eatCharacterClass = function(e) {
				if (e.eat(91)) {
					var t = e.eat(94), n = this.regexp_classContents(e);
					return e.eat(93) || e.raise(`Unterminated character class`), t && n === kt && e.raise(`Negated character class may contain strings`), !0;
				}
				return !1;
			}, R.regexp_classContents = function(e) {
				return e.current() === 93 ? Ot : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), Ot);
			}, R.regexp_nonEmptyClassRanges = function(e) {
				for (; this.regexp_eatClassAtom(e);) {
					var t = e.lastIntValue;
					if (e.eat(45) && this.regexp_eatClassAtom(e)) {
						var n = e.lastIntValue;
						e.switchU && (t === -1 || n === -1) && e.raise(`Invalid character class`), t !== -1 && n !== -1 && t > n && e.raise(`Range out of order in character class`);
					}
				}
			}, R.regexp_eatClassAtom = function(e) {
				var t = e.pos;
				if (e.eat(92)) {
					if (this.regexp_eatClassEscape(e)) return !0;
					if (e.switchU) {
						var n = e.current();
						(n === 99 || zt(n)) && e.raise(`Invalid class escape`), e.raise(`Invalid escape`);
					}
					e.pos = t;
				}
				var r = e.current();
				return r === 93 ? !1 : (e.lastIntValue = r, e.advance(), !0);
			}, R.regexp_eatClassEscape = function(e) {
				var t = e.pos;
				if (e.eat(98)) return e.lastIntValue = 8, !0;
				if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
				if (!e.switchU && e.eat(99)) {
					if (this.regexp_eatClassControlLetter(e)) return !0;
					e.pos = t;
				}
				return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
			}, R.regexp_classSetExpression = function(e) {
				var t = Ot, n;
				if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
					n === kt && (t = kt);
					for (var r = e.pos; e.eatChars([38, 38]);) {
						if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
							n !== kt && (t = Ot);
							continue;
						}
						e.raise(`Invalid character in character class`);
					}
					if (r !== e.pos) return t;
					for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise(`Invalid character in character class`);
					if (r !== e.pos) return t;
				} else e.raise(`Invalid character in character class`);
				for (;;) if (!this.regexp_eatClassSetRange(e)) {
					if (n = this.regexp_eatClassSetOperand(e), !n) return t;
					n === kt && (t = kt);
				}
			}, R.regexp_eatClassSetRange = function(e) {
				var t = e.pos;
				if (this.regexp_eatClassSetCharacter(e)) {
					var n = e.lastIntValue;
					if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
						var r = e.lastIntValue;
						return n !== -1 && r !== -1 && n > r && e.raise(`Range out of order in character class`), !0;
					}
					e.pos = t;
				}
				return !1;
			}, R.regexp_eatClassSetOperand = function(e) {
				return this.regexp_eatClassSetCharacter(e) ? Ot : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
			}, R.regexp_eatNestedClass = function(e) {
				var t = e.pos;
				if (e.eat(91)) {
					var n = e.eat(94), r = this.regexp_classContents(e);
					if (e.eat(93)) return n && r === kt && e.raise(`Negated character class may contain strings`), r;
					e.pos = t;
				}
				if (e.eat(92)) {
					var i = this.regexp_eatCharacterClassEscape(e);
					if (i) return i;
					e.pos = t;
				}
				return null;
			}, R.regexp_eatClassStringDisjunction = function(e) {
				var t = e.pos;
				if (e.eatChars([92, 113])) {
					if (e.eat(123)) {
						var n = this.regexp_classStringDisjunctionContents(e);
						if (e.eat(125)) return n;
					} else e.raise(`Invalid escape`);
					e.pos = t;
				}
				return null;
			}, R.regexp_classStringDisjunctionContents = function(e) {
				for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === kt && (t = kt);
				return t;
			}, R.regexp_classString = function(e) {
				for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
				return t === 1 ? Ot : kt;
			}, R.regexp_eatClassSetCharacter = function(e) {
				var t = e.pos;
				if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
				var n = e.current();
				return n < 0 || n === e.lookahead() && Nt(n) || Pt(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
			};
			function Nt(e) {
				return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
			}
			function Pt(e) {
				return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
			}
			R.regexp_eatClassSetReservedPunctuator = function(e) {
				var t = e.current();
				return Ft(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
			};
			function Ft(e) {
				return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
			}
			R.regexp_eatClassControlLetter = function(e) {
				var t = e.current();
				return It(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
			}, R.regexp_eatHexEscapeSequence = function(e) {
				var t = e.pos;
				if (e.eat(120)) {
					if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
					e.switchU && e.raise(`Invalid escape`), e.pos = t;
				}
				return !1;
			}, R.regexp_eatDecimalDigits = function(e) {
				var t = e.pos, n = 0;
				for (e.lastIntValue = 0; It(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
				return e.pos !== t;
			};
			function It(e) {
				return e >= 48 && e <= 57;
			}
			R.regexp_eatHexDigits = function(e) {
				var t = e.pos, n = 0;
				for (e.lastIntValue = 0; Lt(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + Rt(n), e.advance();
				return e.pos !== t;
			};
			function Lt(e) {
				return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
			}
			function Rt(e) {
				return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
			}
			R.regexp_eatLegacyOctalEscapeSequence = function(e) {
				if (this.regexp_eatOctalDigit(e)) {
					var t = e.lastIntValue;
					if (this.regexp_eatOctalDigit(e)) {
						var n = e.lastIntValue;
						t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
					} else e.lastIntValue = t;
					return !0;
				}
				return !1;
			}, R.regexp_eatOctalDigit = function(e) {
				var t = e.current();
				return zt(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
			};
			function zt(e) {
				return e >= 48 && e <= 55;
			}
			R.regexp_eatFixedHexDigits = function(e, t) {
				var n = e.pos;
				e.lastIntValue = 0;
				for (var r = 0; r < t; ++r) {
					var i = e.current();
					if (!Lt(i)) return e.pos = n, !1;
					e.lastIntValue = 16 * e.lastIntValue + Rt(i), e.advance();
				}
				return !0;
			};
			var Bt = function(e) {
				this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new A(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
			}, z = M.prototype;
			z.next = function(e) {
				!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword ` + this.type.keyword), this.options.onToken && this.options.onToken(new Bt(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
			}, z.getToken = function() {
				return this.next(), new Bt(this);
			}, typeof Symbol < `u` && (z[Symbol.iterator] = function() {
				var e = this;
				return { next: function() {
					var t = e.getToken();
					return {
						done: t.type === b.eof,
						value: t
					};
				} };
			}), z.nextToken = function() {
				var e = this.curContext();
				if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(b.eof);
				if (e.override) return e.override(this);
				this.readToken(this.fullCharCodeAtPos());
			}, z.readToken = function(e) {
				return f(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
			}, z.fullCharCodeAt = function(e) {
				var t = this.input.charCodeAt(e);
				if (t <= 55295 || t >= 56320) return t;
				var n = this.input.charCodeAt(e + 1);
				return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
			}, z.fullCharCodeAtPos = function() {
				return this.fullCharCodeAt(this.pos);
			}, z.skipBlockComment = function() {
				var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf(`*/`, this.pos += 2);
				if (n === -1 && this.raise(this.pos - 2, `Unterminated comment`), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = ee(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
				this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
			}, z.skipLineComment = function(e) {
				for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !C(r);) r = this.input.charCodeAt(++this.pos);
				this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
			}, z.skipSpace = function() {
				loop: for (; this.pos < this.input.length;) {
					var e = this.input.charCodeAt(this.pos);
					switch (e) {
						case 32:
						case 160:
							++this.pos;
							break;
						case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
						case 10:
						case 8232:
						case 8233:
							++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
							break;
						case 47:
							switch (this.input.charCodeAt(this.pos + 1)) {
								case 42:
									this.skipBlockComment();
									break;
								case 47:
									this.skipLineComment(2);
									break;
								default: break loop;
							}
							break;
						default: if (e > 8 && e < 14 || e >= 5760 && w.test(String.fromCharCode(e))) ++this.pos;
						else break loop;
					}
				}
			}, z.finishToken = function(e, t) {
				this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
				var n = this.type;
				this.type = e, this.value = t, this.updateContext(n);
			}, z.readToken_dot = function() {
				var e = this.input.charCodeAt(this.pos + 1);
				if (e >= 48 && e <= 57) return this.readNumber(!0);
				var t = this.input.charCodeAt(this.pos + 2);
				return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(b.ellipsis)) : (++this.pos, this.finishToken(b.dot));
			}, z.readToken_slash = function() {
				var e = this.input.charCodeAt(this.pos + 1);
				return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.slash, 1);
			}, z.readToken_mult_modulo_exp = function(e) {
				var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? b.star : b.modulo;
				return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = b.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(b.assign, n + 1) : this.finishOp(r, n);
			}, z.readToken_pipe_amp = function(e) {
				var t = this.input.charCodeAt(this.pos + 1);
				return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(b.assign, 3) : this.finishOp(e === 124 ? b.logicalOR : b.logicalAND, 2) : t === 61 ? this.finishOp(b.assign, 2) : this.finishOp(e === 124 ? b.bitwiseOR : b.bitwiseAND, 1);
			}, z.readToken_caret = function() {
				return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.bitwiseXOR, 1);
			}, z.readToken_plus_min = function(e) {
				var t = this.input.charCodeAt(this.pos + 1);
				return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || x.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(b.incDec, 2) : t === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.plusMin, 1);
			}, z.readToken_lt_gt = function(e) {
				var t = this.input.charCodeAt(this.pos + 1), n = 1;
				return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(b.assign, n + 1) : this.finishOp(b.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(b.relational, n));
			}, z.readToken_eq_excl = function(e) {
				var t = this.input.charCodeAt(this.pos + 1);
				return t === 61 ? this.finishOp(b.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(b.arrow)) : this.finishOp(e === 61 ? b.eq : b.prefix, 1);
			}, z.readToken_question = function() {
				var e = this.options.ecmaVersion;
				if (e >= 11) {
					var t = this.input.charCodeAt(this.pos + 1);
					if (t === 46) {
						var n = this.input.charCodeAt(this.pos + 2);
						if (n < 48 || n > 57) return this.finishOp(b.questionDot, 2);
					}
					if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(b.assign, 3) : this.finishOp(b.coalesce, 2);
				}
				return this.finishOp(b.question, 1);
			}, z.readToken_numberSign = function() {
				var e = this.options.ecmaVersion, t = 35;
				if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), f(t, !0) || t === 92)) return this.finishToken(b.privateId, this.readWord1());
				this.raise(this.pos, `Unexpected character '` + O(t) + `'`);
			}, z.getTokenFromCode = function(e) {
				switch (e) {
					case 46: return this.readToken_dot();
					case 40: return ++this.pos, this.finishToken(b.parenL);
					case 41: return ++this.pos, this.finishToken(b.parenR);
					case 59: return ++this.pos, this.finishToken(b.semi);
					case 44: return ++this.pos, this.finishToken(b.comma);
					case 91: return ++this.pos, this.finishToken(b.bracketL);
					case 93: return ++this.pos, this.finishToken(b.bracketR);
					case 123: return ++this.pos, this.finishToken(b.braceL);
					case 125: return ++this.pos, this.finishToken(b.braceR);
					case 58: return ++this.pos, this.finishToken(b.colon);
					case 96:
						if (this.options.ecmaVersion < 6) break;
						return ++this.pos, this.finishToken(b.backQuote);
					case 48:
						var t = this.input.charCodeAt(this.pos + 1);
						if (t === 120 || t === 88) return this.readRadixNumber(16);
						if (this.options.ecmaVersion >= 6) {
							if (t === 111 || t === 79) return this.readRadixNumber(8);
							if (t === 98 || t === 66) return this.readRadixNumber(2);
						}
					case 49:
					case 50:
					case 51:
					case 52:
					case 53:
					case 54:
					case 55:
					case 56:
					case 57: return this.readNumber(!1);
					case 34:
					case 39: return this.readString(e);
					case 47: return this.readToken_slash();
					case 37:
					case 42: return this.readToken_mult_modulo_exp(e);
					case 124:
					case 38: return this.readToken_pipe_amp(e);
					case 94: return this.readToken_caret();
					case 43:
					case 45: return this.readToken_plus_min(e);
					case 60:
					case 62: return this.readToken_lt_gt(e);
					case 61:
					case 33: return this.readToken_eq_excl(e);
					case 63: return this.readToken_question();
					case 126: return this.finishOp(b.prefix, 1);
					case 35: return this.readToken_numberSign();
				}
				this.raise(this.pos, `Unexpected character '` + O(e) + `'`);
			}, z.finishOp = function(e, t) {
				var n = this.input.slice(this.pos, this.pos + t);
				return this.pos += t, this.finishToken(e, n);
			}, z.readRegexp = function() {
				for (var e, t, n = this.pos;;) {
					this.pos >= this.input.length && this.raise(n, `Unterminated regular expression`);
					var r = this.input.charAt(this.pos);
					if (x.test(r) && this.raise(n, `Unterminated regular expression`), e) e = !1;
					else {
						if (r === `[`) t = !0;
						else if (r === `]` && t) t = !1;
						else if (r === `/` && !t) break;
						e = r === `\\`;
					}
					++this.pos;
				}
				var i = this.input.slice(n, this.pos);
				++this.pos;
				var a = this.pos, o = this.readWord1();
				this.containsEsc && this.unexpected(a);
				var s = this.regexpState || (this.regexpState = new yt(this));
				s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
				var c = null;
				try {
					c = new RegExp(i, o);
				} catch {}
				return this.finishToken(b.regexp, {
					pattern: i,
					flags: o,
					value: c
				});
			}, z.readInt = function(e, t, n) {
				for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t == null ? 1 / 0 : t; c < l; ++c, ++this.pos) {
					var u = this.input.charCodeAt(this.pos), d = void 0;
					if (r && u === 95) {
						i && this.raiseRecoverable(this.pos, `Numeric separator is not allowed in legacy octal numeric literals`), s === 95 && this.raiseRecoverable(this.pos, `Numeric separator must be exactly one underscore`), c === 0 && this.raiseRecoverable(this.pos, `Numeric separator is not allowed at the first of digits`), s = u;
						continue;
					}
					if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : 1 / 0, d >= e) break;
					s = u, o = o * e + d;
				}
				return r && s === 95 && this.raiseRecoverable(this.pos - 1, `Numeric separator is not allowed at the last of digits`), this.pos === a || t != null && this.pos - a !== t ? null : o;
			};
			function Vt(e, t) {
				return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ``));
			}
			function Ht(e) {
				return typeof BigInt == `function` ? BigInt(e.replace(/_/g, ``)) : null;
			}
			z.readRadixNumber = function(e) {
				var t = this.pos;
				this.pos += 2;
				var n = this.readInt(e);
				return n ?? this.raise(this.start + 2, `Expected number in radix ` + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Ht(this.input.slice(t, this.pos)), ++this.pos) : f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(b.num, n);
			}, z.readNumber = function(e) {
				var t = this.pos;
				!e && this.readInt(10, void 0, !0) === null && this.raise(t, `Invalid number`);
				var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
				n && this.strict && this.raise(t, `Invalid number`);
				var r = this.input.charCodeAt(this.pos);
				if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
					var i = Ht(this.input.slice(t, this.pos));
					return ++this.pos, f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(b.num, i);
				}
				n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, `Invalid number`)), f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`);
				var a = Vt(this.input.slice(t, this.pos), n);
				return this.finishToken(b.num, a);
			}, z.readCodePoint = function() {
				var e = this.input.charCodeAt(this.pos), t;
				if (e === 123) {
					this.options.ecmaVersion < 6 && this.unexpected();
					var n = ++this.pos;
					t = this.readHexChar(this.input.indexOf(`}`, this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, `Code point out of bounds`);
				} else t = this.readHexChar(4);
				return t;
			}, z.readString = function(e) {
				for (var t = ``, n = ++this.pos;;) {
					this.pos >= this.input.length && this.raise(this.start, `Unterminated string constant`);
					var r = this.input.charCodeAt(this.pos);
					if (r === e) break;
					r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, `Unterminated string constant`), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (C(r) && this.raise(this.start, `Unterminated string constant`), ++this.pos);
				}
				return t += this.input.slice(n, this.pos++), this.finishToken(b.string, t);
			};
			var Ut = {};
			z.tryReadTemplateToken = function() {
				this.inTemplateElement = !0;
				try {
					this.readTmplToken();
				} catch (e) {
					if (e === Ut) this.readInvalidTemplateToken();
					else throw e;
				}
				this.inTemplateElement = !1;
			}, z.invalidStringToken = function(e, t) {
				if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Ut;
				this.raise(e, t);
			}, z.readTmplToken = function() {
				for (var e = ``, t = this.pos;;) {
					this.pos >= this.input.length && this.raise(this.start, `Unterminated template`);
					var n = this.input.charCodeAt(this.pos);
					if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === b.template || this.type === b.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(b.dollarBraceL)) : (++this.pos, this.finishToken(b.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(b.template, e));
					if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
					else if (C(n)) {
						switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
							case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
							case 10:
								e += `
`;
								break;
							default: e += String.fromCharCode(n);
						}
						this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
					} else ++this.pos;
				}
			}, z.readInvalidTemplateToken = function() {
				for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
					case `\\`:
						++this.pos;
						break;
					case `$`: if (this.input[this.pos + 1] !== `{`) break;
					case "`": return this.finishToken(b.invalidTemplate, this.input.slice(this.start, this.pos));
					case `\r`: this.input[this.pos + 1] === `
` && ++this.pos;
					case `
`:
					case `\u2028`:
					case `\u2029`: ++this.curLine, this.lineStart = this.pos + 1;
				}
				this.raise(this.start, `Unterminated template`);
			}, z.readEscapedChar = function(e) {
				var t = this.input.charCodeAt(++this.pos);
				switch (++this.pos, t) {
					case 110: return `
`;
					case 114: return `\r`;
					case 120: return String.fromCharCode(this.readHexChar(2));
					case 117: return O(this.readCodePoint());
					case 116: return `	`;
					case 98: return `\b`;
					case 118: return `\v`;
					case 102: return `\f`;
					case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
					case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``;
					case 56:
					case 57: if (this.strict && this.invalidStringToken(this.pos - 1, `Invalid escape sequence`), e) {
						var n = this.pos - 1;
						this.invalidStringToken(n, `Invalid escape sequence in template string`);
					}
					default:
						if (t >= 48 && t <= 55) {
							var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
							return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== `0` || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? `Octal literal in template string` : `Octal literal in strict mode`), String.fromCharCode(i);
						}
						return C(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``) : String.fromCharCode(t);
				}
			}, z.readHexChar = function(e) {
				var t = this.pos, n = this.readInt(16, e);
				return n === null && this.invalidStringToken(t, `Bad character escape sequence`), n;
			}, z.readWord1 = function() {
				this.containsEsc = !1;
				for (var e = ``, t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
					var i = this.fullCharCodeAtPos();
					if (p(i, r)) this.pos += i <= 65535 ? 1 : 2;
					else if (i === 92) {
						this.containsEsc = !0, e += this.input.slice(n, this.pos);
						var a = this.pos;
						this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, `Expecting Unicode escape sequence \\uXXXX`), ++this.pos;
						var o = this.readCodePoint();
						(t ? f : p)(o, r) || this.invalidStringToken(a, `Invalid Unicode escape`), e += O(o), n = this.pos;
					} else break;
					t = !1;
				}
				return e + this.input.slice(n, this.pos);
			}, z.readWord = function() {
				var e = this.readWord1(), t = b.name;
				return this.keywords.test(e) && (t = v[e]), this.finishToken(t, e);
			};
			var Wt = `8.16.0`;
			M.acorn = {
				Parser: M,
				version: Wt,
				defaultOptions: ce,
				Position: oe,
				SourceLocation: A,
				getLineInfo: se,
				Node: Ye,
				TokenType: m,
				tokTypes: b,
				keywordTypes: v,
				TokContext: Ve,
				tokContexts: I,
				isIdentifierChar: p,
				isIdentifierStart: f,
				Token: Bt,
				isNewLine: C,
				lineBreak: x,
				lineBreakG: S,
				nonASCIIwhitespace: w
			};
			function Gt(e, t) {
				return M.parse(e, t);
			}
			function Kt(e, t, n) {
				return M.parseExpressionAt(e, t, n);
			}
			function qt(e, t) {
				return M.tokenizer(e, t);
			}
			e.Node = Ye, e.Parser = M, e.Position = oe, e.SourceLocation = A, e.TokContext = Ve, e.Token = Bt, e.TokenType = m, e.defaultOptions = ce, e.getLineInfo = se, e.isIdentifierChar = p, e.isIdentifierStart = f, e.isNewLine = C, e.keywordTypes = v, e.lineBreak = x, e.lineBreakG = S, e.nonASCIIwhitespace = w, e.parse = Gt, e.parseExpressionAt = Kt, e.tokContexts = I, e.tokTypes = b, e.tokenizer = qt, e.version = Wt;
		}));
	}));
	var oh = o(((e, t) => {
		let n = ih(), r = /^[\da-fA-F]+$/, i = /^\d+$/, a = /* @__PURE__ */ new WeakMap();
		function o(e) {
			e = e.Parser.acorn || e;
			let t = a.get(e);
			if (!t) {
				let n = e.tokTypes, r = e.TokContext, i = e.TokenType, o = new r(`<tag`, !1), s = new r(`</tag`, !1), c = new r(`<tag>...</tag>`, !0, !0), l = {
					tc_oTag: o,
					tc_cTag: s,
					tc_expr: c
				}, u = {
					jsxName: new i(`jsxName`),
					jsxText: new i(`jsxText`, { beforeExpr: !0 }),
					jsxTagStart: new i(`jsxTagStart`, { startsExpr: !0 }),
					jsxTagEnd: new i(`jsxTagEnd`)
				};
				u.jsxTagStart.updateContext = function() {
					this.context.push(c), this.context.push(o), this.exprAllowed = !1;
				}, u.jsxTagEnd.updateContext = function(e) {
					let t = this.context.pop();
					t === o && e === n.slash || t === s ? (this.context.pop(), this.exprAllowed = this.curContext() === c) : this.exprAllowed = !0;
				}, t = {
					tokContexts: l,
					tokTypes: u
				}, a.set(e, t);
			}
			return t;
		}
		function s(e) {
			if (!e) return e;
			if (e.type === `JSXIdentifier`) return e.name;
			if (e.type === `JSXNamespacedName`) return e.namespace.name + `:` + e.name.name;
			if (e.type === `JSXMemberExpression`) return s(e.object) + `.` + s(e.property);
		}
		t.exports = function(e) {
			return e = e || {}, function(t) {
				return c({
					allowNamespaces: e.allowNamespaces !== !1,
					allowNamespacedObjects: !!e.allowNamespacedObjects
				}, t);
			};
		}, Object.defineProperty(t.exports, `tokTypes`, {
			get: function() {
				return o(ah()).tokTypes;
			},
			configurable: !0,
			enumerable: !0
		});
		function c(e, t) {
			let a = t.acorn || ah(), c = o(a), l = a.tokTypes, u = c.tokTypes, d = a.tokContexts, f = c.tokContexts.tc_oTag, p = c.tokContexts.tc_cTag, m = c.tokContexts.tc_expr, h = a.isNewLine, g = a.isIdentifierStart, _ = a.isIdentifierChar;
			return class extends t {
				static get acornJsx() {
					return c;
				}
				jsx_readToken() {
					let e = ``, t = this.pos;
					for (;;) {
						this.pos >= this.input.length && this.raise(this.start, `Unterminated JSX contents`);
						let n = this.input.charCodeAt(this.pos);
						switch (n) {
							case 60:
							case 123: return this.pos === this.start ? n === 60 && this.exprAllowed ? (++this.pos, this.finishToken(u.jsxTagStart)) : this.getTokenFromCode(n) : (e += this.input.slice(t, this.pos), this.finishToken(u.jsxText, e));
							case 38:
								e += this.input.slice(t, this.pos), e += this.jsx_readEntity(), t = this.pos;
								break;
							case 62:
							case 125: this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (n === 62 ? `&gt;` : `&rbrace;`) + "` or `{\"" + this.input[this.pos] + "\"}`?");
							default: h(n) ? (e += this.input.slice(t, this.pos), e += this.jsx_readNewLine(!0), t = this.pos) : ++this.pos;
						}
					}
				}
				jsx_readNewLine(e) {
					let t = this.input.charCodeAt(this.pos), n;
					return ++this.pos, t === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, n = e ? `
` : `\r
`) : n = String.fromCharCode(t), this.options.locations && (++this.curLine, this.lineStart = this.pos), n;
				}
				jsx_readString(e) {
					let t = ``, n = ++this.pos;
					for (;;) {
						this.pos >= this.input.length && this.raise(this.start, `Unterminated string constant`);
						let r = this.input.charCodeAt(this.pos);
						if (r === e) break;
						r === 38 ? (t += this.input.slice(n, this.pos), t += this.jsx_readEntity(), n = this.pos) : h(r) ? (t += this.input.slice(n, this.pos), t += this.jsx_readNewLine(!1), n = this.pos) : ++this.pos;
					}
					return t += this.input.slice(n, this.pos++), this.finishToken(l.string, t);
				}
				jsx_readEntity() {
					let e = ``, t = 0, a, o = this.input[this.pos];
					o !== `&` && this.raise(this.pos, `Entity must start with an ampersand`);
					let s = ++this.pos;
					for (; this.pos < this.input.length && t++ < 10;) {
						if (o = this.input[this.pos++], o === `;`) {
							e[0] === `#` ? e[1] === `x` ? (e = e.substr(2), r.test(e) && (a = String.fromCharCode(parseInt(e, 16)))) : (e = e.substr(1), i.test(e) && (a = String.fromCharCode(parseInt(e, 10)))) : a = n[e];
							break;
						}
						e += o;
					}
					return a || (this.pos = s, `&`);
				}
				jsx_readWord() {
					let e, t = this.pos;
					do
						e = this.input.charCodeAt(++this.pos);
					while (_(e) || e === 45);
					return this.finishToken(u.jsxName, this.input.slice(t, this.pos));
				}
				jsx_parseIdentifier() {
					let e = this.startNode();
					return this.type === u.jsxName ? e.name = this.value : this.type.keyword ? e.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(e, `JSXIdentifier`);
				}
				jsx_parseNamespacedName() {
					let t = this.start, n = this.startLoc, r = this.jsx_parseIdentifier();
					if (!e.allowNamespaces || !this.eat(l.colon)) return r;
					var i = this.startNodeAt(t, n);
					return i.namespace = r, i.name = this.jsx_parseIdentifier(), this.finishNode(i, `JSXNamespacedName`);
				}
				jsx_parseElementName() {
					if (this.type === u.jsxTagEnd) return ``;
					let t = this.start, n = this.startLoc, r = this.jsx_parseNamespacedName();
					for (this.type === l.dot && r.type === `JSXNamespacedName` && !e.allowNamespacedObjects && this.unexpected(); this.eat(l.dot);) {
						let e = this.startNodeAt(t, n);
						e.object = r, e.property = this.jsx_parseIdentifier(), r = this.finishNode(e, `JSXMemberExpression`);
					}
					return r;
				}
				jsx_parseAttributeValue() {
					switch (this.type) {
						case l.braceL:
							let e = this.jsx_parseExpressionContainer();
							return e.expression.type === `JSXEmptyExpression` && this.raise(e.start, `JSX attributes must only be assigned a non-empty expression`), e;
						case u.jsxTagStart:
						case l.string: return this.parseExprAtom();
						default: this.raise(this.start, `JSX value should be either an expression or a quoted JSX text`);
					}
				}
				jsx_parseEmptyExpression() {
					let e = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
					return this.finishNodeAt(e, `JSXEmptyExpression`, this.start, this.startLoc);
				}
				jsx_parseExpressionContainer() {
					let e = this.startNode();
					return this.next(), e.expression = this.type === l.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(l.braceR), this.finishNode(e, `JSXExpressionContainer`);
				}
				jsx_parseAttribute() {
					let e = this.startNode();
					return this.eat(l.braceL) ? (this.expect(l.ellipsis), e.argument = this.parseMaybeAssign(), this.expect(l.braceR), this.finishNode(e, `JSXSpreadAttribute`)) : (e.name = this.jsx_parseNamespacedName(), e.value = this.eat(l.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(e, `JSXAttribute`));
				}
				jsx_parseOpeningElementAt(e, t) {
					let n = this.startNodeAt(e, t);
					n.attributes = [];
					let r = this.jsx_parseElementName();
					for (r && (n.name = r); this.type !== l.slash && this.type !== u.jsxTagEnd;) n.attributes.push(this.jsx_parseAttribute());
					return n.selfClosing = this.eat(l.slash), this.expect(u.jsxTagEnd), this.finishNode(n, r ? `JSXOpeningElement` : `JSXOpeningFragment`);
				}
				jsx_parseClosingElementAt(e, t) {
					let n = this.startNodeAt(e, t), r = this.jsx_parseElementName();
					return r && (n.name = r), this.expect(u.jsxTagEnd), this.finishNode(n, r ? `JSXClosingElement` : `JSXClosingFragment`);
				}
				jsx_parseElementAt(e, t) {
					let n = this.startNodeAt(e, t), r = [], i = this.jsx_parseOpeningElementAt(e, t), a = null;
					if (!i.selfClosing) {
						contents: for (;;) switch (this.type) {
							case u.jsxTagStart:
								if (e = this.start, t = this.startLoc, this.next(), this.eat(l.slash)) {
									a = this.jsx_parseClosingElementAt(e, t);
									break contents;
								}
								r.push(this.jsx_parseElementAt(e, t));
								break;
							case u.jsxText:
								r.push(this.parseExprAtom());
								break;
							case l.braceL:
								r.push(this.jsx_parseExpressionContainer());
								break;
							default: this.unexpected();
						}
						s(a.name) !== s(i.name) && this.raise(a.start, `Expected corresponding JSX closing tag for <` + s(i.name) + `>`);
					}
					let o = i.name ? `Element` : `Fragment`;
					return n[`opening` + o] = i, n[`closing` + o] = a, n.children = r, this.type === l.relational && this.value === `<` && this.raise(this.start, `Adjacent JSX elements must be wrapped in an enclosing tag`), this.finishNode(n, `JSX` + o);
				}
				jsx_parseText() {
					let e = this.parseLiteral(this.value);
					return e.type = `JSXText`, e;
				}
				jsx_parseElement() {
					let e = this.start, t = this.startLoc;
					return this.next(), this.jsx_parseElementAt(e, t);
				}
				parseExprAtom(e) {
					return this.type === u.jsxText ? this.jsx_parseText() : this.type === u.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(e);
				}
				readToken(e) {
					let t = this.curContext();
					if (t === m) return this.jsx_readToken();
					if (t === f || t === p) {
						if (g(e)) return this.jsx_readWord();
						if (e == 62) return ++this.pos, this.finishToken(u.jsxTagEnd);
						if ((e === 34 || e === 39) && t == f) return this.jsx_readString(e);
					}
					return e === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(u.jsxTagStart)) : super.readToken(e);
				}
				updateContext(e) {
					if (this.type == l.braceL) {
						var t = this.curContext();
						t == f ? this.context.push(d.b_expr) : t == m ? this.context.push(d.b_tmpl) : super.updateContext(e), this.exprAllowed = !0;
					} else if (this.type === l.slash && e === u.jsxTagStart) this.context.length -= 2, this.context.push(p), this.exprAllowed = !1;
					else return super.updateContext(e);
				}
			};
		}
	}));
	function sh(e) {
		return e;
	}
	const ch = {}.hasOwnProperty;
	const lh = Symbol(`continue`);
	const uh = Symbol(`exit`);
	const dh = Symbol(`skip`);
	function fh(e, t) {
		let n, r;
		typeof t == `function` ? n = t : t && typeof t == `object` && (t.enter && (n = t.enter), t.leave && (r = t.leave)), i(e, void 0, void 0, [])();
		function i(e, t, a, o) {
			return mh(e) && (s.displayName = `node (` + sh(e.type) + `)`), s;
			function s() {
				let s = n ? ph(n(e, t, a, o)) : [];
				if (s[0] === uh) return s;
				if (s[0] !== dh) {
					let t;
					for (t in e) if (ch.call(e, t) && e[t] && typeof e[t] == `object` && t !== `data` && t !== `position`) {
						let n = o.concat(e), r = e[t];
						if (Array.isArray(r)) {
							let e = r, a = 0;
							for (; a > -1 && a < e.length;) {
								let r = e[a];
								if (mh(r)) {
									let e = i(r, t, a, n)();
									if (e[0] === uh) return e;
									a = typeof e[1] == `number` ? e[1] : a + 1;
								} else a++;
							}
						} else if (mh(r)) {
							let e = i(r, t, void 0, n)();
							if (e[0] === uh) return e;
						}
					}
				}
				return r ? ph(r(e, t, a, o)) : s;
			}
		}
	}
	function ph(e) {
		return Array.isArray(e) ? e : typeof e == `number` ? [lh, e] : [e];
	}
	function mh(e) {
		return !!(e && typeof e == `object` && `type` in e && typeof e.type == `string` && e.type.length > 0);
	}
	function hh(e, t) {
		let n = t.prefix || ``, r = t.suffix || ``, i = Object.assign({}, t.acornOptions), a = [], o = [], s = i.onComment, c = i.onToken, l = !1, u, d, f = Object.assign({}, i, {
			onComment: a,
			preserveParens: !0
		});
		c && (f.onToken = o);
		let p = _h(e, t.tokenTypes), m = p.value, h = n + m + r, g = t.expression && gh(m);
		if (g && !t.allowEmpty) throw new B(`Unexpected empty expression`, {
			place: v(0),
			ruleId: `unexpected-empty-expression`,
			source: `micromark-extension-mdx-expression`
		});
		try {
			u = t.expression && !g ? t.acorn.parseExpressionAt(h, 0, f) : t.acorn.parse(h, f);
		} catch (e) {
			let t = e, r = v(t.pos);
			t.message = String(t.message).replace(/ \(\d+:\d+\)$/, ``), t.pos = r.offset, t.loc = {
				line: r.line,
				column: r.column - 1
			}, d = t, l = t.raisedAt >= n.length + m.length || t.message === `Unterminated comment`;
		}
		if (u && t.expression && !g) if (gh(h.slice(u.end, h.length - r.length))) u = {
			type: `Program`,
			start: 0,
			end: n.length + m.length,
			body: [{
				type: `ExpressionStatement`,
				expression: u,
				start: 0,
				end: n.length + m.length
			}],
			sourceType: `module`,
			comments: []
		};
		else {
			let e = v(u.end), t = Error(`Unexpected content after expression`);
			t.pos = e.offset, t.loc = {
				line: e.line,
				column: e.column - 1
			}, d = t, u = void 0;
		}
		if (u) {
			if (u.comments = a, fh(u, function(e, t, n, r) {
				let i = r[r.length - 1], a = t;
				e.type === `ParenthesizedExpression` && i && a && (typeof n == `number` && (i = i[a], a = n), i[a] = e.expression), _(e);
			}), Array.isArray(s)) s.push(...a);
			else if (typeof s == `function`) for (let e of a) s(e.type === `Block`, e.value, e.start, e.end, e.loc.start, e.loc.end);
			for (let e of o) e.end <= n.length || e.start - n.length >= m.length || (_(e), Array.isArray(c) ? c.push(e) : c(e));
		}
		return {
			estree: u,
			error: d,
			swallow: l
		};
		function _(e) {
			let t = v(e.start), n = v(e.end);
			e.start = t.offset, e.end = n.offset, e.loc = {
				start: {
					line: t.line,
					column: t.column - 1,
					offset: t.offset
				},
				end: {
					line: n.line,
					column: n.column - 1,
					offset: n.offset
				}
			}, e.range = [e.start, e.end];
		}
		function v(e) {
			let r = e - n.length;
			r < 0 ? r = 0 : r > m.length && (r = m.length);
			let i = vh(p.stops, r);
			return i || (i = {
				line: t.start.line,
				column: t.start.column,
				offset: t.start.offset
			}), i;
		}
	}
	function gh(e) {
		return /^\s*$/.test(e.replace(/\/\*[\s\S]*?\*\//g, ``).replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, ``));
	}
	function _h(e, t) {
		let n = {
			value: ``,
			stops: []
		}, r = -1;
		for (; ++r < e.length;) {
			let i = e[r];
			if (i[0] === `enter`) {
				let e = i[1].type;
				if (e === `lineEnding` || t.includes(e)) {
					let e = i[2].sliceStream(i[1]);
					for (; e.length > 0 && e[0] === -1;) e.shift();
					let t = yh(e);
					n.stops.push([n.value.length, i[1].start]), n.value += t, n.stops.push([n.value.length, i[1].end]);
				}
			}
		}
		return n;
	}
	function vh(e, t) {
		let n = 0;
		for (; n < e.length && e[n][0] <= t;) n += 1;
		if (n === 0) return;
		let [r, i] = e[n - 1], a = t - r;
		return {
			line: i.line,
			column: i.column + a,
			offset: i.offset + a
		};
	}
	function yh(e) {
		let t = -1, n = [], r;
		for (; ++t < e.length;) {
			let i = e[t], a;
			if (typeof i == `string`) a = i;
			else switch (i) {
				case -5:
					a = `\r`;
					break;
				case -4:
					a = `
`;
					break;
				case -3:
					a = `\r
`;
					break;
				case -2:
					a = `	`;
					break;
				case -1:
					if (r) continue;
					a = ` `;
					break;
				default: a = String.fromCharCode(i);
			}
			r = i === -2, n.push(a);
		}
		return n.join(``);
	}
	function bh(e) {
		let t = e || {}, n = t.loc || {}, r = t.range || [void 0, void 0], i = xh(n.start, r[0] || t.start), a = xh(n.end, r[1] || t.end);
		if (i && a) return {
			start: i,
			end: a
		};
	}
	function xh(e, t) {
		if (e && typeof e == `object`) {
			let n = `line` in e ? Sh(e.line) : void 0, r = `column` in e ? Sh(e.column) : void 0;
			if (n && r !== void 0) return {
				line: n,
				column: r + 1,
				offset: Sh(t)
			};
		}
	}
	function Sh(e) {
		return typeof e == `number` && e > -1 ? e : void 0;
	}
	const Ch = `https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression`;
	const wh = `#unexpected-type-in-code-expected-an-object-spread-spread`;
	function Th(e, t, n, r, i, a, o, s, c, l, u) {
		let d = this, f = this.events.length + 3, p = 0, m, h;
		return g;
		function g(t) {
			return e.enter(n), e.enter(r), e.consume(t), e.exit(r), m = d.now(), _;
		}
		function _(u) {
			if (u === null) {
				if (h) throw h;
				let e = new B("Unexpected end of file in expression, expected a corresponding closing brace for `{`", {
					place: d.now(),
					ruleId: `unexpected-eof`,
					source: `micromark-extension-mdx-expression`
				});
				throw e.url = Ch + `#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-`, e;
			}
			if (V(u)) return e.enter(`lineEnding`), e.consume(u), e.exit(`lineEnding`), y;
			if (u === 125 && p === 0) {
				let p = a ? Eh.call(d, a, o, i, f, m, l || !1, c || !1) : {
					type: `ok`,
					estree: void 0
				};
				if (p.type === `ok`) {
					e.enter(r), e.consume(u), e.exit(r);
					let i = e.exit(n);
					return s && p.estree && Object.assign(i, { estree: p.estree }), t;
				}
				return h = p.message, e.enter(i), e.consume(u), v;
			}
			return e.enter(i), v(u);
		}
		function v(t) {
			return t === 125 && p === 0 || t === null || V(t) ? (e.exit(i), _(t)) : (t === 123 && !a ? p += 1 : t === 125 && --p, e.consume(t), v);
		}
		function y(t) {
			let n = d.now();
			if (n.line !== m.line && !u && d.parser.lazy[n.line]) {
				let e = new B("Unexpected lazy line in expression in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", {
					place: d.now(),
					ruleId: `unexpected-lazy`,
					source: `micromark-extension-mdx-expression`
				});
				throw e.url = Ch + `#unexpected-lazy-line-in-expression-in-container-expected-line-to-be-prefixed`, e;
			}
			return U(t) ? W(e, _, `linePrefix`, 3)(t) : _(t);
		}
	}
	function Eh(e, t, n, r, i, a, o) {
		let s = hh(this.events.slice(r), {
			acorn: e,
			tokenTypes: [n],
			acornOptions: t,
			start: i,
			expression: !0,
			allowEmpty: a,
			prefix: o ? `({` : ``,
			suffix: o ? `})` : ``
		}), c = s.estree;
		if (o && c) {
			let e = c.body[0];
			if (e.type !== `ExpressionStatement` || e.expression.type !== `ObjectExpression`) {
				let t = bh(e), n = new B("Unexpected `" + e.type + "` in code: expected an object spread (`{...spread}`)", {
					place: t.start,
					ruleId: `non-spread`,
					source: `micromark-extension-mdx-expression`
				});
				throw n.url = Ch + wh, n;
			}
			if (e.expression.properties[1]) {
				let t = new B(`Unexpected extra content in spread: only a single spread is supported`, {
					place: bh(e.expression.properties[1]).start,
					ruleId: `spread-extra`,
					source: `micromark-extension-mdx-expression`
				});
				throw t.url = Ch + `#unexpected-extra-content-in-spread-only-a-single-spread-is-supported`, t;
			}
			if (e.expression.properties[0] && e.expression.properties[0].type !== `SpreadElement`) {
				let t = bh(e.expression.properties[0]), n = new B("Unexpected `" + e.expression.properties[0].type + "` in code: only spread elements are supported", {
					place: t.start,
					ruleId: `non-spread`,
					source: `micromark-extension-mdx-expression`
				});
				throw n.url = Ch + wh, n;
			}
		}
		if (s.error) {
			let e = new B(`Could not parse expression with acorn`, {
				cause: s.error,
				place: {
					line: s.error.loc.line,
					column: s.error.loc.column + 1,
					offset: s.error.pos
				},
				ruleId: `acorn`,
				source: `micromark-extension-mdx-expression`
			});
			return e.url = Ch + `#could-not-parse-expression-with-acorn`, {
				type: `nok`,
				message: e
			};
		}
		return {
			type: `ok`,
			estree: c
		};
	}
	function Dh(e) {
		let t = e || {}, n = t.addResult, r = t.acorn, i = t.spread, a = t.allowEmpty, o;
		if (a ??= !0, r) {
			if (!r.parseExpressionAt) throw Error("Expected a proper `acorn` instance passed in as `options.acorn`");
			o = Object.assign({
				ecmaVersion: 2024,
				sourceType: `module`
			}, t.acornOptions);
		} else if (t.acornOptions || t.addResult) throw Error("Expected an `acorn` instance passed in as `options.acorn`");
		return {
			flow: { 123: {
				name: `mdxFlowExpression`,
				tokenize: s,
				concrete: !0
			} },
			text: { 123: {
				name: `mdxTextExpression`,
				tokenize: c
			} }
		};
		function s(e, t, s) {
			let c = this;
			return l;
			function l(e) {
				return u(e);
			}
			function u(t) {
				return Th.call(c, e, d, `mdxFlowExpression`, `mdxFlowExpressionMarker`, `mdxFlowExpressionChunk`, r, o, n, i, a)(t);
			}
			function d(t) {
				return U(t) ? W(e, f, `whitespace`)(t) : f(t);
			}
			function f(n) {
				let r = c.parser.constructs.flow[60], i = (Array.isArray(r) ? r : r ? [r] : []).find(function(e) {
					return e.name === `mdxJsxFlowTag`;
				});
				return n === 60 && i ? e.attempt(i, f, s)(n) : n === null || V(n) ? t(n) : s(n);
			}
		}
		function c(e, t) {
			let s = this;
			return c;
			function c(c) {
				return Th.call(s, e, t, `mdxTextExpression`, `mdxTextExpressionMarker`, `mdxTextExpressionChunk`, r, o, n, i, a, !0)(c);
			}
		}
	}
	const Oh = /[$_\p{ID_Start}]/u;
	const kh = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u;
	const Ah = /[-$_\u{200C}\u{200D}\p{ID_Continue}]/u;
	const jh = {};
	function Mh(e) {
		return e ? Oh.test(String.fromCodePoint(e)) : !1;
	}
	function Nh(e, t) {
		let n = (t || jh).jsx ? Ah : kh;
		return e ? n.test(String.fromCodePoint(e)) : !1;
	}
	const Ph = `https://github.com/micromark/micromark-extension-mdx-jsx`;
	function Fh(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, ee, w, T, te, E, ne, re, ie) {
		let ae = this, D, O;
		return k;
		function k(t) {
			return e.enter(s), e.enter(c), e.consume(t), e.exit(c), oe;
		}
		function oe(e) {
			return H(e) ? n(e) : (D = A, j(e));
		}
		function A(t) {
			if (t === 47) return e.enter(l), e.consume(t), e.exit(l), D = se, j;
			if (t === 62) return Oe(t);
			if (t !== null && t >= 0 && Mh(t)) return e.enter(d), e.enter(f), e.consume(t), ce;
			N(t, `before name`, "a character that can start a name, such as a letter, `$`, or `_`" + (t === 33 ? " (note: to create a comment in MDX, use `{/* text */}`)" : ``));
		}
		function se(t) {
			if (t === 62) return Oe(t);
			if (t !== null && t >= 0 && Mh(t)) return e.enter(d), e.enter(f), e.consume(t), ce;
			N(t, `before name`, "a character that can start a name, such as a letter, `$`, or `_`" + (t === 42 || t === 47 ? ` (note: JS comments in JSX tags are not supported in MDX)` : ``));
		}
		function ce(t) {
			if (t !== null && t >= 0 && Nh(t, { jsx: !0 })) return e.consume(t), ce;
			if (t === 46 || t === 47 || t === 58 || t === 62 || t === 123 || H(t) || Xi(t)) return e.exit(f), D = le, j(t);
			N(t, `in name`, "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (t === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ``));
		}
		function le(t) {
			if (t === 46) return e.enter(p), e.consume(t), e.exit(p), D = ue, j;
			if (t === 58) return e.enter(h), e.consume(t), e.exit(h), D = pe, j;
			if (t === 47 || t === 62 || t === 123 || t !== null && t >= 0 && Mh(t)) return e.exit(d), ge(t);
			N(t, `after name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function ue(t) {
			if (t !== null && t >= 0 && Mh(t)) return e.enter(m), e.consume(t), de;
			N(t, `before member name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function de(t) {
			if (t !== null && t >= 0 && Nh(t, { jsx: !0 })) return e.consume(t), de;
			if (t === 46 || t === 47 || t === 62 || t === 123 || H(t) || Xi(t)) return e.exit(m), D = fe, j(t);
			N(t, `in member name`, "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (t === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ``));
		}
		function fe(t) {
			if (t === 46) return e.enter(p), e.consume(t), e.exit(p), D = ue, j;
			if (t === 47 || t === 62 || t === 123 || t !== null && t >= 0 && Mh(t)) return e.exit(d), ge(t);
			N(t, `after member name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function pe(t) {
			if (t !== null && t >= 0 && Mh(t)) return e.enter(g), e.consume(t), me;
			N(t, `before local name`, "a character that can start a name, such as a letter, `$`, or `_`" + (t === 43 || t !== null && t > 46 && t < 58 ? " (note: to create a link in MDX, use `[text](url)`)" : ``));
		}
		function me(t) {
			if (t !== null && t >= 0 && Nh(t, { jsx: !0 })) return e.consume(t), me;
			if (t === 47 || t === 62 || t === 123 || H(t) || Xi(t)) return e.exit(g), D = he, j(t);
			N(t, `in local name`, "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function he(t) {
			if (t === 47 || t === 62 || t === 123 || t !== null && t >= 0 && Mh(t)) return e.exit(d), ge(t);
			N(t, `after local name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function ge(t) {
			if (t === 47) return e.enter(u), e.consume(t), e.exit(u), D = De, j;
			if (t === 62) return Oe(t);
			if (t === 123) return Th.call(ae, e, _e, _, v, y, r, i, a, !0, !1, o)(t);
			if (t !== null && t >= 0 && Mh(t)) return e.enter(b), e.enter(x), e.enter(S), e.consume(t), ve;
			N(t, `before attribute name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
		}
		function _e(e) {
			return D = ge, j(e);
		}
		function ve(t) {
			if (t !== null && t >= 0 && Nh(t, { jsx: !0 })) return e.consume(t), ve;
			if (t === 47 || t === 58 || t === 61 || t === 62 || t === 123 || H(t) || Xi(t)) return e.exit(S), D = ye, j(t);
			N(t, `in attribute name`, "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
		}
		function ye(t) {
			if (t === 58) return e.enter(C), e.consume(t), e.exit(C), D = be, j;
			if (t === 61) return e.exit(x), e.enter(w), e.consume(t), e.exit(w), D = Ce, j;
			if (t === 47 || t === 62 || t === 123 || H(t) || Xi(t) || t !== null && t >= 0 && Mh(t)) return e.exit(x), e.exit(b), D = ge, j(t);
			N(t, `after attribute name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
		}
		function be(t) {
			if (t !== null && t >= 0 && Mh(t)) return e.enter(ee), e.consume(t), xe;
			N(t, `before local attribute name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
		}
		function xe(t) {
			if (t !== null && t >= 0 && Nh(t, { jsx: !0 })) return e.consume(t), xe;
			if (t === 47 || t === 61 || t === 62 || t === 123 || H(t) || Xi(t)) return e.exit(ee), e.exit(x), D = Se, j(t);
			N(t, `in local attribute name`, "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
		}
		function Se(t) {
			if (t === 61) return e.enter(w), e.consume(t), e.exit(w), D = Ce, j;
			if (t === 47 || t === 62 || t === 123 || t !== null && t >= 0 && Mh(t)) return e.exit(b), ge(t);
			N(t, `after local attribute name`, "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
		}
		function Ce(t) {
			if (t === 34 || t === 39) return e.enter(T), e.enter(te), e.consume(t), e.exit(te), O = t, Te;
			if (t === 123) return Th.call(ae, e, we, ne, re, ie, r, i, a, !1, !1, o)(t);
			N(t, `before attribute value`, "a character that can start an attribute value, such as `\"`, `'`, or `{`" + (t === 60 ? " (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)" : ``));
		}
		function we(t) {
			return e.exit(b), D = ge, j(t);
		}
		function Te(t) {
			return t === null && N(t, `in attribute value`, "a corresponding closing quote `" + String.fromCodePoint(O) + "`"), t === O ? (e.enter(te), e.consume(t), e.exit(te), e.exit(T), e.exit(b), O = void 0, D = ge, j) : V(t) ? (D = Te, j(t)) : (e.enter(E), Ee(t));
		}
		function Ee(t) {
			return t === null || t === O || V(t) ? (e.exit(E), Te(t)) : (e.consume(t), Ee);
		}
		function De(e) {
			if (e === 62) return Oe(e);
			N(e, `after self-closing slash`, "`>` to end the tag" + (e === 42 || e === 47 ? ` (note: JS comments in JSX tags are not supported in MDX)` : ``));
		}
		function Oe(n) {
			return e.enter(c), e.consume(n), e.exit(c), e.exit(s), t;
		}
		function j(t) {
			return V(t) ? (e.enter(`lineEnding`), e.consume(t), e.exit(`lineEnding`), M) : U(t) || Xi(t) ? (e.enter(`esWhitespace`), ke(t)) : D(t);
		}
		function ke(t) {
			return V(t) ? (e.exit(`esWhitespace`), j(t)) : U(t) || Xi(t) ? (e.consume(t), ke) : (e.exit(`esWhitespace`), D(t));
		}
		function M(e) {
			if (!o && ae.parser.lazy[ae.now().line]) {
				let e = new B("Unexpected lazy line in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", ae.now(), `micromark-extension-mdx-jsx:unexpected-lazy`);
				throw e.url = Ph + `#unexpected-lazy-line-in-container-expected-line-to-be`, e;
			}
			return j(e);
		}
		function N(e, t, n) {
			let r = new B(`Unexpected ` + (e === null ? `end of file` : "character `" + (e === 96 ? "` ` `" : String.fromCodePoint(e)) + "` (" + Ih(e) + `)`) + ` ` + t + `, expected ` + n, ae.now(), `micromark-extension-mdx-jsx:unexpected-` + (e === null ? `eof` : `character`));
			throw r.url = Ph + (e === null ? `#unexpected-end-of-file-at-expected-expect` : `#unexpected-character-at-expected-expect`), r;
		}
	}
	function Ih(e) {
		return `U+` + e.toString(16).toUpperCase().padStart(4, `0`);
	}
	function Lh(e, t) {
		return {
			name: `mdxJsxTextTag`,
			tokenize: n
		};
		function n(n, r, i) {
			return Fh.call(this, n, r, i, e, t.acornOptions, t.addResult, !0, `mdxJsxTextTag`, `mdxJsxTextTagMarker`, `mdxJsxTextTagClosingMarker`, `mdxJsxTextTagSelfClosingMarker`, `mdxJsxTextTagName`, `mdxJsxTextTagNamePrimary`, `mdxJsxTextTagNameMemberMarker`, `mdxJsxTextTagNameMember`, `mdxJsxTextTagNamePrefixMarker`, `mdxJsxTextTagNameLocal`, `mdxJsxTextTagExpressionAttribute`, `mdxJsxTextTagExpressionAttributeMarker`, `mdxJsxTextTagExpressionAttributeValue`, `mdxJsxTextTagAttribute`, `mdxJsxTextTagAttributeName`, `mdxJsxTextTagAttributeNamePrimary`, `mdxJsxTextTagAttributeNamePrefixMarker`, `mdxJsxTextTagAttributeNameLocal`, `mdxJsxTextTagAttributeInitializerMarker`, `mdxJsxTextTagAttributeValueLiteral`, `mdxJsxTextTagAttributeValueLiteralMarker`, `mdxJsxTextTagAttributeValueLiteralValue`, `mdxJsxTextTagAttributeValueExpression`, `mdxJsxTextTagAttributeValueExpressionMarker`, `mdxJsxTextTagAttributeValueExpressionValue`);
		}
	}
	function Rh(e, t) {
		return {
			concrete: !0,
			name: `mdxJsxFlowTag`,
			tokenize: n
		};
		function n(n, r, i) {
			let a = this;
			return o;
			function o(e) {
				return s(e);
			}
			function s(r) {
				return Fh.call(a, n, c, i, e, t.acornOptions, t.addResult, !1, `mdxJsxFlowTag`, `mdxJsxFlowTagMarker`, `mdxJsxFlowTagClosingMarker`, `mdxJsxFlowTagSelfClosingMarker`, `mdxJsxFlowTagName`, `mdxJsxFlowTagNamePrimary`, `mdxJsxFlowTagNameMemberMarker`, `mdxJsxFlowTagNameMember`, `mdxJsxFlowTagNamePrefixMarker`, `mdxJsxFlowTagNameLocal`, `mdxJsxFlowTagExpressionAttribute`, `mdxJsxFlowTagExpressionAttributeMarker`, `mdxJsxFlowTagExpressionAttributeValue`, `mdxJsxFlowTagAttribute`, `mdxJsxFlowTagAttributeName`, `mdxJsxFlowTagAttributeNamePrimary`, `mdxJsxFlowTagAttributeNamePrefixMarker`, `mdxJsxFlowTagAttributeNameLocal`, `mdxJsxFlowTagAttributeInitializerMarker`, `mdxJsxFlowTagAttributeValueLiteral`, `mdxJsxFlowTagAttributeValueLiteralMarker`, `mdxJsxFlowTagAttributeValueLiteralValue`, `mdxJsxFlowTagAttributeValueExpression`, `mdxJsxFlowTagAttributeValueExpressionMarker`, `mdxJsxFlowTagAttributeValueExpressionValue`)(r);
			}
			function c(e) {
				return U(e) ? W(n, l, `whitespace`)(e) : l(e);
			}
			function l(e) {
				let t = a.parser.constructs.flow[123], s = Array.isArray(t) ? t : t ? [t] : [], c;
				for (let e of s) if (e.name === `mdxFlowExpression`) {
					c = e;
					break;
				}
				return e === 60 ? o(e) : e === 123 && c ? n.attempt(c, l, i)(e) : e === null || V(e) ? r(e) : i(e);
			}
		}
	}
	function zh(e) {
		let t = e || {}, n = t.acorn, r;
		if (n) {
			if (!n.parse || !n.parseExpressionAt) throw Error("Expected a proper `acorn` instance passed in as `options.acorn`");
			r = Object.assign({
				ecmaVersion: 2024,
				sourceType: `module`
			}, t.acornOptions, { locations: !0 });
		} else if (t.acornOptions || t.addResult) throw Error("Expected an `acorn` instance passed in as `options.acorn`");
		return {
			flow: { 60: Rh(n || void 0, {
				acornOptions: r,
				addResult: t.addResult || void 0
			}) },
			text: { 60: Lh(n || void 0, {
				acornOptions: r,
				addResult: t.addResult || void 0
			}) }
		};
	}
	function Bh() {
		return { disable: { null: [
			`autolink`,
			`codeIndented`,
			`htmlFlow`,
			`htmlText`
		] } };
	}
	const Vh = {
		tokenize: Gh,
		partial: !0
	};
	const Hh = `https://github.com/micromark/micromark-extension-mdxjs-esm`;
	const Uh = /* @__PURE__ */ new Set([
		`ExportAllDeclaration`,
		`ExportDefaultDeclaration`,
		`ExportNamedDeclaration`,
		`ImportDeclaration`
	]);
	function Wh(e) {
		let t = {
			tokenize: i,
			concrete: !0
		};
		if (!e || !e.acorn || !e.acorn.parse) throw Error("Expected an `acorn` instance passed in as `options.acorn`");
		let n = e.acorn, r = Object.assign({
			ecmaVersion: 2024,
			sourceType: `module`
		}, e.acornOptions, { locations: !0 });
		return { flow: {
			101: t,
			105: t
		} };
		function i(t, i, a) {
			let o = this, s = o.parser.definedModuleSpecifiers || (o.parser.definedModuleSpecifiers = []), c = this.events.length + 1, l = ``;
			return o.interrupt ? a : u;
			function u(e) {
				return o.now().column > 1 ? a(e) : (t.enter(`mdxjsEsm`), t.enter(`mdxjsEsmData`), t.consume(e), l += String.fromCharCode(e), d);
			}
			function d(e) {
				return Hi(e) ? (t.consume(e), l += String.fromCharCode(e), d) : (l === `import` || l === `export`) && e === 32 ? (t.consume(e), f) : a(e);
			}
			function f(e) {
				return e === null || V(e) ? (t.exit(`mdxjsEsmData`), p(e)) : (t.consume(e), f);
			}
			function p(e) {
				return e === null ? h(e) : V(e) ? t.check(Vh, h, m)(e) : (t.enter(`mdxjsEsmData`), f(e));
			}
			function m(e) {
				return t.enter(`lineEnding`), t.consume(e), t.exit(`lineEnding`), p;
			}
			function h(a) {
				let l = hh(o.events.slice(c), {
					acorn: n,
					acornOptions: r,
					tokenTypes: [`mdxjsEsmData`],
					prefix: s.length > 0 ? `var ` + s.join(`,`) + `
` : ``
				});
				if (l.error) {
					if (a !== null && l.swallow) return m(a);
					let e = new B(`Could not parse import/exports with acorn`, {
						cause: l.error,
						place: {
							line: l.error.loc.line,
							column: l.error.loc.column + 1,
							offset: l.error.pos
						},
						ruleId: `acorn`,
						source: `micromark-extension-mdxjs-esm`
					});
					throw e.url = Hh + `#could-not-parse-importexports-with-acorn`, e;
				}
				s.length > 0 && l.estree.body.shift();
				let u = -1;
				for (; ++u < l.estree.body.length;) {
					let e = l.estree.body[u];
					if (!Uh.has(e.type)) {
						let t = new B("Unexpected `" + e.type + "` in code: only import/exports are supported", {
							place: bh(e),
							ruleId: `non-esm`,
							source: `micromark-extension-mdxjs-esm`
						});
						throw t.url = Hh + `#unexpected-type-in-code-only-importexports-are-supported`, t;
					}
					if (e.type === `ImportDeclaration` && !o.interrupt) {
						let t = -1;
						for (; ++t < e.specifiers.length;) {
							let n = e.specifiers[t];
							s.push(n.local.name);
						}
					}
				}
				return Object.assign(t.exit(`mdxjsEsm`), e.addResult ? { estree: l.estree } : void 0), i(a);
			}
		}
	}
	function Gh(e, t, n) {
		return r;
		function r(r) {
			return e.enter(`lineEndingBlank`), e.consume(r), e.exit(`lineEndingBlank`), e.attempt(Il, t, n);
		}
	}
	var Kh = l(oh(), 1);
	function qh(e) {
		let t = Object.assign({
			acorn: J.extend((0, Kh.default)()),
			acornOptions: {
				ecmaVersion: 2024,
				sourceType: `module`
			},
			addResult: !0
		}, e);
		return rl([
			Wh(t),
			Dh(t),
			zh(t),
			Bh()
		]);
	}
	const Jh = {};
	function Yh(e) {
		let t = this, n = e || Jh, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
		i.push(qh(n)), a.push(If()), o.push(Lf(n));
	}
	const Xh = { tokenize: Zh };
	function Zh(e) {
		let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
		return t;
		function r(n) {
			if (n === null) {
				e.consume(n);
				return;
			}
			return e.enter(`lineEnding`), e.consume(n), e.exit(`lineEnding`), W(e, t, `linePrefix`);
		}
		function i(t) {
			return e.enter(`paragraph`), a(t);
		}
		function a(t) {
			let r = e.enter(`chunkText`, {
				contentType: `text`,
				previous: n
			});
			return n && (n.next = r), n = r, o(t);
		}
		function o(t) {
			if (t === null) {
				e.exit(`chunkText`), e.exit(`paragraph`), e.consume(t);
				return;
			}
			return V(t) ? (e.consume(t), e.exit(`chunkText`), a) : (e.consume(t), o);
		}
	}
	const Qh = { tokenize: eg };
	const $h = { tokenize: tg };
	function eg(e) {
		let t = this, n = [], r = 0, i, a, o;
		return s;
		function s(i) {
			if (r < n.length) {
				let a = n[r];
				return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
			}
			return l(i);
		}
		function c(e) {
			if (r++, t.containerState._closeFlow) {
				t.containerState._closeFlow = void 0, i && v();
				let n = t.events.length, a = n, o;
				for (; a--;) if (t.events[a][0] === `exit` && t.events[a][1].type === `chunkFlow`) {
					o = t.events[a][1].end;
					break;
				}
				_(r);
				let s = n;
				for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
				return fa(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
			}
			return s(e);
		}
		function l(a) {
			if (r === n.length) {
				if (!i) return f(a);
				if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
				t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
			}
			return t.containerState = {}, e.check($h, u, d)(a);
		}
		function u(e) {
			return i && v(), _(r), f(e);
		}
		function d(e) {
			return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
		}
		function f(n) {
			return t.containerState = {}, e.attempt($h, p, m)(n);
		}
		function p(e) {
			return r++, n.push([t.currentConstruct, t.containerState]), f(e);
		}
		function m(n) {
			if (n === null) {
				i && v(), _(0), e.consume(n);
				return;
			}
			return i = i || t.parser.flow(t.now()), e.enter(`chunkFlow`, {
				_tokenizer: i,
				contentType: `flow`,
				previous: a
			}), h(n);
		}
		function h(n) {
			if (n === null) {
				g(e.exit(`chunkFlow`), !0), _(0), e.consume(n);
				return;
			}
			return V(n) ? (e.consume(n), g(e.exit(`chunkFlow`)), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
		}
		function g(e, n) {
			let s = t.sliceStream(e);
			if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
				let e = i.events.length;
				for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
				let n = t.events.length, a = n, s, c;
				for (; a--;) if (t.events[a][0] === `exit` && t.events[a][1].type === `chunkFlow`) {
					if (s) {
						c = t.events[a][1].end;
						break;
					}
					s = !0;
				}
				for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
				fa(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
			}
		}
		function _(r) {
			let i = n.length;
			for (; i-- > r;) {
				let r = n[i];
				t.containerState = r[1], r[0].exit.call(t, e);
			}
			n.length = r;
		}
		function v() {
			i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
		}
	}
	function tg(e, t, n) {
		return W(e, e.attempt(this.parser.constructs.document, t, n), `linePrefix`, this.parser.constructs.disable.null.includes(`codeIndented`) ? void 0 : 4);
	}
	const ng = { tokenize: rg };
	function rg(e) {
		let t = this, n = e.attempt(Il, r, e.attempt(this.parser.constructs.flowInitial, i, W(e, e.attempt(this.parser.constructs.flow, i, e.attempt(cu, i)), `linePrefix`)));
		return n;
		function r(r) {
			if (r === null) {
				e.consume(r);
				return;
			}
			return e.enter(`lineEndingBlank`), e.consume(r), e.exit(`lineEndingBlank`), t.currentConstruct = void 0, n;
		}
		function i(r) {
			if (r === null) {
				e.consume(r);
				return;
			}
			return e.enter(`lineEnding`), e.consume(r), e.exit(`lineEnding`), t.currentConstruct = void 0, n;
		}
	}
	const ig = { resolveAll: cg() };
	const ag = sg(`string`);
	const og = sg(`text`);
	function sg(e) {
		return {
			resolveAll: cg(e === `text` ? lg : void 0),
			tokenize: t
		};
		function t(t) {
			let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
			return a;
			function a(e) {
				return c(e) ? i(e) : o(e);
			}
			function o(e) {
				if (e === null) {
					t.consume(e);
					return;
				}
				return t.enter(`data`), t.consume(e), s;
			}
			function s(e) {
				return c(e) ? (t.exit(`data`), i(e)) : (t.consume(e), s);
			}
			function c(e) {
				if (e === null) return !0;
				let t = r[e], i = -1;
				if (t) for (; ++i < t.length;) {
					let e = t[i];
					if (!e.previous || e.previous.call(n, n.previous)) return !0;
				}
				return !1;
			}
		}
	}
	function cg(e) {
		return t;
		function t(t, n) {
			let r = -1, i;
			for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === `data` && (i = r, r++) : (!t[r] || t[r][1].type !== `data`) && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
			return e ? e(t, n) : t;
		}
	}
	function lg(e, t) {
		let n = 0;
		for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === `lineEnding`) && e[n - 1][1].type === `data`) {
			let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
			for (; a--;) {
				let e = i[a];
				if (typeof e == `string`) {
					for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
					if (o) break;
					o = -1;
				} else if (e === -2) c = !0, s++;
				else if (e !== -1) {
					a++;
					break;
				}
			}
			if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
				let i = {
					type: n === e.length || c || s < 2 ? `lineSuffix` : `hardBreakTrailing`,
					start: {
						_bufferIndex: a ? o : r.start._bufferIndex + o,
						_index: r.start._index + a,
						line: r.end.line,
						column: r.end.column - s,
						offset: r.end.offset - s
					},
					end: { ...r.end }
				};
				r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
					`enter`,
					i,
					t
				], [
					`exit`,
					i,
					t
				]), n += 2);
			}
			n++;
		}
		return e;
	}
	var ug = s({
		attentionMarkers: () => vg,
		contentInitial: () => fg,
		disable: () => yg,
		document: () => dg,
		flow: () => mg,
		flowInitial: () => pg,
		insideSpan: () => _g,
		string: () => hg,
		text: () => gg
	});
	const dg = {
		42: td,
		43: td,
		45: td,
		48: td,
		49: td,
		50: td,
		51: td,
		52: td,
		53: td,
		54: td,
		55: td,
		56: td,
		57: td,
		62: Rl
	};
	const fg = { 91: _u };
	const pg = {
		[-2]: Xl,
		[-1]: Xl,
		32: Xl
	};
	const mg = {
		35: Cu,
		42: $u,
		45: [ld, $u],
		60: Ou,
		61: ld,
		95: $u,
		96: ql,
		126: ql
	};
	const hg = {
		38: Wl,
		92: Hl
	};
	const gg = {
		[-5]: Zu,
		[-4]: Zu,
		[-3]: Zu,
		33: qu,
		38: Wl,
		42: Al,
		60: [Pl, Fu],
		91: Yu,
		92: [xu, Hl],
		93: Lu,
		95: Al,
		96: eu
	};
	const _g = { null: [Al, ig] };
	const vg = { null: [42, 95] };
	const yg = { null: [] };
	function bg(e, t, n) {
		let r = {
			_bufferIndex: -1,
			_index: 0,
			line: n && n.line || 1,
			column: n && n.column || 1,
			offset: n && n.offset || 0
		}, i = {}, a = [], o = [], s = [], c = {
			attempt: C(x),
			check: C(S),
			consume: v,
			enter: y,
			exit: b,
			interrupt: C(S, { interrupt: !0 })
		}, l = {
			code: null,
			containerState: {},
			defineSkip: h,
			events: [],
			now: m,
			parser: e,
			previous: null,
			sliceSerialize: f,
			sliceStream: p,
			write: d
		}, u = t.tokenize.call(l, c);
		return t.resolveAll && a.push(t), l;
		function d(e) {
			return o = pa(o, e), g(), o[o.length - 1] === null ? (ee(t, 0), l.events = ma(a, l.events, l), l.events) : [];
		}
		function f(e, t) {
			return Sg(p(e), t);
		}
		function p(e) {
			return xg(o, e);
		}
		function m() {
			let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
			return {
				_bufferIndex: e,
				_index: t,
				line: n,
				column: i,
				offset: a
			};
		}
		function h(e) {
			i[e.line] = e.column, T();
		}
		function g() {
			let e;
			for (; r._index < o.length;) {
				let t = o[r._index];
				if (typeof t == `string`) for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) _(t.charCodeAt(r._bufferIndex));
				else _(t);
			}
		}
		function _(e) {
			u = u(e);
		}
		function v(e) {
			V(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, T()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
		}
		function y(e, t) {
			let n = t || {};
			return n.type = e, n.start = m(), l.events.push([
				`enter`,
				n,
				l
			]), s.push(n), n;
		}
		function b(e) {
			let t = s.pop();
			return t.end = m(), l.events.push([
				`exit`,
				t,
				l
			]), t;
		}
		function x(e, t) {
			ee(e, t.from);
		}
		function S(e, t) {
			t.restore();
		}
		function C(e, t) {
			return n;
			function n(n, r, i) {
				let a, o, s, u;
				return Array.isArray(n) ? f(n) : `tokenize` in n ? f([n]) : d(n);
				function d(e) {
					return t;
					function t(t) {
						let n = t !== null && e[t], r = t !== null && e.null;
						return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
					}
				}
				function f(e) {
					return a = e, o = 0, e.length === 0 ? i : p(e[o]);
				}
				function p(e) {
					return n;
					function n(n) {
						return u = w(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
					}
				}
				function m(t) {
					return e(s, u), r;
				}
				function h(e) {
					return u.restore(), ++o < a.length ? p(a[o]) : i;
				}
			}
		}
		function ee(e, t) {
			e.resolveAll && !a.includes(e) && a.push(e), e.resolve && fa(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
		}
		function w() {
			let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
			return {
				from: i,
				restore: o
			};
			function o() {
				r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, T();
			}
		}
		function T() {
			r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
		}
	}
	function xg(e, t) {
		let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
		if (n === i) o = [e[n].slice(r, a)];
		else {
			if (o = e.slice(n, i), r > -1) {
				let e = o[0];
				typeof e == `string` ? o[0] = e.slice(r) : o.shift();
			}
			a > 0 && o.push(e[i].slice(0, a));
		}
		return o;
	}
	function Sg(e, t) {
		let n = -1, r = [], i;
		for (; ++n < e.length;) {
			let a = e[n], o;
			if (typeof a == `string`) o = a;
			else switch (a) {
				case -5:
					o = `\r`;
					break;
				case -4:
					o = `
`;
					break;
				case -3:
					o = `\r
`;
					break;
				case -2:
					o = t ? ` ` : `	`;
					break;
				case -1:
					if (!t && i) continue;
					o = ` `;
					break;
				default: o = String.fromCharCode(a);
			}
			i = a === -2, r.push(o);
		}
		return r.join(``);
	}
	function Cg(e) {
		let t = {
			constructs: rl([ug, ...(e || {}).extensions || []]),
			content: n(Xh),
			defined: [],
			document: n(Qh),
			flow: n(ng),
			lazy: {},
			string: n(ag),
			text: n(og)
		};
		return t;
		function n(e) {
			return n;
			function n(n) {
				return bg(t, e, n);
			}
		}
	}
	function wg(e) {
		for (; !ou(e););
		return e;
	}
	const Tg = /[\0\t\n\r]/g;
	function Eg() {
		let e = 1, t = ``, n = !0, r;
		return i;
		function i(i, a, o) {
			let s = [], c, l, u, d, f;
			for (i = t + (typeof i == `string` ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = ``, n && (i.charCodeAt(0) === 65279 && u++, n = void 0); u < i.length;) {
				if (Tg.lastIndex = u, c = Tg.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
					t = i.slice(u);
					break;
				}
				if (f === 10 && u === d && r) s.push(-3), r = void 0;
				else switch (r && (s.push(-5), r = void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
					case 0:
						s.push(65533), e++;
						break;
					case 9:
						for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
						break;
					case 10:
						s.push(-4), e = 1;
						break;
					default: r = !0, e = 1;
				}
				u = d + 1;
			}
			return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
		}
	}
	const Dg = {}.hasOwnProperty;
	function Og(e, t, n) {
		return t && typeof t == `object` && (n = t, t = void 0), kg(n)(wg(Cg(n).document().write(Eg()(e, t, !0))));
	}
	function kg(e) {
		let t = {
			transforms: [],
			canContainEols: [
				`emphasis`,
				`fragment`,
				`heading`,
				`paragraph`,
				`strong`
			],
			enter: {
				autolink: a(we),
				autolinkProtocol: w,
				autolinkEmail: w,
				atxHeading: a(be),
				blockQuote: a(he),
				characterEscape: w,
				characterReference: w,
				codeFenced: a(ge),
				codeFencedFenceInfo: o,
				codeFencedFenceMeta: o,
				codeIndented: a(ge, o),
				codeText: a(_e, o),
				codeTextData: w,
				data: w,
				codeFlowValue: w,
				definition: a(ve),
				definitionDestinationString: o,
				definitionLabelString: o,
				definitionTitleString: o,
				emphasis: a(ye),
				hardBreakEscape: a(xe),
				hardBreakTrailing: a(xe),
				htmlFlow: a(Se, o),
				htmlFlowData: w,
				htmlText: a(Se, o),
				htmlTextData: w,
				image: a(Ce),
				label: o,
				link: a(we),
				listItem: a(Ee),
				listItemValue: f,
				listOrdered: a(Te, d),
				listUnordered: a(Te),
				paragraph: a(De),
				reference: ce,
				referenceString: o,
				resourceDestinationString: o,
				resourceTitleString: o,
				setextHeading: a(be),
				strong: a(Oe),
				thematicBreak: a(ke)
			},
			exit: {
				atxHeading: c(),
				atxHeadingSequence: x,
				autolink: c(),
				autolinkEmail: me,
				autolinkProtocol: pe,
				blockQuote: c(),
				characterEscapeValue: T,
				characterReferenceMarkerHexadecimal: ue,
				characterReferenceMarkerNumeric: ue,
				characterReferenceValue: de,
				characterReference: fe,
				codeFenced: c(g),
				codeFencedFence: h,
				codeFencedFenceInfo: p,
				codeFencedFenceMeta: m,
				codeFlowValue: T,
				codeIndented: c(_),
				codeText: c(ie),
				codeTextData: T,
				data: T,
				definition: c(),
				definitionDestinationString: b,
				definitionLabelString: v,
				definitionTitleString: y,
				emphasis: c(),
				hardBreakEscape: c(E),
				hardBreakTrailing: c(E),
				htmlFlow: c(ne),
				htmlFlowData: T,
				htmlText: c(re),
				htmlTextData: T,
				image: c(D),
				label: k,
				labelText: O,
				lineEnding: te,
				link: c(ae),
				listItem: c(),
				listOrdered: c(),
				listUnordered: c(),
				paragraph: c(),
				referenceString: le,
				resourceDestinationString: oe,
				resourceTitleString: A,
				resource: se,
				setextHeading: c(ee),
				setextHeadingLineSequence: C,
				setextHeadingText: S,
				strong: c(),
				thematicBreak: c()
			}
		};
		jg(t, (e || {}).mdastExtensions || []);
		let n = {};
		return r;
		function r(e) {
			let r = {
				type: `root`,
				children: []
			}, a = {
				stack: [r],
				tokenStack: [],
				config: t,
				enter: s,
				exit: l,
				buffer: o,
				resume: u,
				data: n
			}, c = [], d = -1;
			for (; ++d < e.length;) (e[d][1].type === `listOrdered` || e[d][1].type === `listUnordered`) && (e[d][0] === `enter` ? c.push(d) : d = i(e, c.pop(), d));
			for (d = -1; ++d < e.length;) {
				let n = t[e[d][0]];
				Dg.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
			}
			if (a.tokenStack.length > 0) {
				let e = a.tokenStack[a.tokenStack.length - 1];
				(e[1] || Ng).call(a, void 0, e[0]);
			}
			for (r.position = {
				start: Ag(e.length > 0 ? e[0][1].start : {
					line: 1,
					column: 1,
					offset: 0
				}),
				end: Ag(e.length > 0 ? e[e.length - 2][1].end : {
					line: 1,
					column: 1,
					offset: 0
				})
			}, d = -1; ++d < t.transforms.length;) r = t.transforms[d](r) || r;
			return r;
		}
		function i(e, t, n) {
			let r = t - 1, i = -1, a = !1, o, s, c, l;
			for (; ++r <= n;) {
				let t = e[r];
				switch (t[1].type) {
					case `listUnordered`:
					case `listOrdered`:
					case `blockQuote`:
						t[0] === `enter` ? i++ : i--, l = void 0;
						break;
					case `lineEndingBlank`:
						t[0] === `enter` && (o && !l && !i && !c && (c = r), l = void 0);
						break;
					case `linePrefix`:
					case `listItemValue`:
					case `listItemMarker`:
					case `listItemPrefix`:
					case `listItemPrefixWhitespace`: break;
					default: l = void 0;
				}
				if (!i && t[0] === `enter` && t[1].type === `listItemPrefix` || i === -1 && t[0] === `exit` && (t[1].type === `listUnordered` || t[1].type === `listOrdered`)) {
					if (o) {
						let i = r;
						for (s = void 0; i--;) {
							let t = e[i];
							if (t[1].type === `lineEnding` || t[1].type === `lineEndingBlank`) {
								if (t[0] === `exit`) continue;
								s && (e[s][1].type = `lineEndingBlank`, a = !0), t[1].type = `lineEnding`, s = i;
							} else if (!(t[1].type === `linePrefix` || t[1].type === `blockQuotePrefix` || t[1].type === `blockQuotePrefixWhitespace` || t[1].type === `blockQuoteMarker` || t[1].type === `listItemIndent`)) break;
						}
						c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), e.splice(s || r, 0, [
							`exit`,
							o,
							t[2]
						]), r++, n++;
					}
					if (t[1].type === `listItemPrefix`) {
						let i = {
							type: `listItem`,
							_spread: !1,
							start: Object.assign({}, t[1].start),
							end: void 0
						};
						o = i, e.splice(r, 0, [
							`enter`,
							i,
							t[2]
						]), r++, n++, c = void 0, l = !0;
					}
				}
			}
			return e[t][1]._spread = a, n;
		}
		function a(e, t) {
			return n;
			function n(n) {
				s.call(this, e(n), n), t && t.call(this, n);
			}
		}
		function o() {
			this.stack.push({
				type: `fragment`,
				children: []
			});
		}
		function s(e, t, n) {
			this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
				start: Ag(t.start),
				end: void 0
			};
		}
		function c(e) {
			return t;
			function t(t) {
				e && e.call(this, t), l.call(this, t);
			}
		}
		function l(e, t) {
			let n = this.stack.pop(), r = this.tokenStack.pop();
			if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || Ng).call(this, e, r[0]));
			else throw Error("Cannot close `" + e.type + "` (" + Yt({
				start: e.start,
				end: e.end
			}) + `): it’s not open`);
			n.position.end = Ag(e.end);
		}
		function u() {
			return Zs(this.stack.pop());
		}
		function d() {
			this.data.expectingFirstListItemValue = !0;
		}
		function f(e) {
			if (this.data.expectingFirstListItemValue) {
				let t = this.stack[this.stack.length - 2];
				t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
			}
		}
		function p() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.lang = e;
		}
		function m() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.meta = e;
		}
		function h() {
			this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
		}
		function g() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ``), this.data.flowCodeInside = void 0;
		}
		function _() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.value = e.replace(/(\r?\n|\r)$/g, ``);
		}
		function v(e) {
			let t = this.resume(), n = this.stack[this.stack.length - 1];
			n.label = t, n.identifier = as(this.sliceSerialize(e)).toLowerCase();
		}
		function y() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.title = e;
		}
		function b() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.url = e;
		}
		function x(e) {
			let t = this.stack[this.stack.length - 1];
			t.depth || (t.depth = this.sliceSerialize(e).length);
		}
		function S() {
			this.data.setextHeadingSlurpLineEnding = !0;
		}
		function C(e) {
			let t = this.stack[this.stack.length - 1];
			t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
		}
		function ee() {
			this.data.setextHeadingSlurpLineEnding = void 0;
		}
		function w(e) {
			let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
			(!n || n.type !== `text`) && (n = j(), n.position = {
				start: Ag(e.start),
				end: void 0
			}, t.push(n)), this.stack.push(n);
		}
		function T(e) {
			let t = this.stack.pop();
			t.value += this.sliceSerialize(e), t.position.end = Ag(e.end);
		}
		function te(e) {
			let n = this.stack[this.stack.length - 1];
			if (this.data.atHardBreak) {
				let t = n.children[n.children.length - 1];
				t.position.end = Ag(e.end), this.data.atHardBreak = void 0;
				return;
			}
			!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (w.call(this, e), T.call(this, e));
		}
		function E() {
			this.data.atHardBreak = !0;
		}
		function ne() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.value = e;
		}
		function re() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.value = e;
		}
		function ie() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.value = e;
		}
		function ae() {
			let e = this.stack[this.stack.length - 1];
			if (this.data.inReference) {
				let t = this.data.referenceType || `shortcut`;
				e.type += `Reference`, e.referenceType = t, delete e.url, delete e.title;
			} else delete e.identifier, delete e.label;
			this.data.referenceType = void 0;
		}
		function D() {
			let e = this.stack[this.stack.length - 1];
			if (this.data.inReference) {
				let t = this.data.referenceType || `shortcut`;
				e.type += `Reference`, e.referenceType = t, delete e.url, delete e.title;
			} else delete e.identifier, delete e.label;
			this.data.referenceType = void 0;
		}
		function O(e) {
			let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
			n.label = Rc(t), n.identifier = as(t).toLowerCase();
		}
		function k() {
			let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
			this.data.inReference = !0, n.type === `link` ? n.children = e.children : n.alt = t;
		}
		function oe() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.url = e;
		}
		function A() {
			let e = this.resume(), t = this.stack[this.stack.length - 1];
			t.title = e;
		}
		function se() {
			this.data.inReference = void 0;
		}
		function ce() {
			this.data.referenceType = `collapsed`;
		}
		function le(e) {
			let t = this.resume(), n = this.stack[this.stack.length - 1];
			n.label = t, n.identifier = as(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = `full`;
		}
		function ue(e) {
			this.data.characterReferenceType = e.type;
		}
		function de(e) {
			let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
			n ? (r = Ic(t, n === `characterReferenceMarkerNumeric` ? 10 : 16), this.data.characterReferenceType = void 0) : r = Fc(t);
			let i = this.stack[this.stack.length - 1];
			i.value += r;
		}
		function fe(e) {
			let t = this.stack.pop();
			t.position.end = Ag(e.end);
		}
		function pe(e) {
			T.call(this, e);
			let t = this.stack[this.stack.length - 1];
			t.url = this.sliceSerialize(e);
		}
		function me(e) {
			T.call(this, e);
			let t = this.stack[this.stack.length - 1];
			t.url = `mailto:` + this.sliceSerialize(e);
		}
		function he() {
			return {
				type: `blockquote`,
				children: []
			};
		}
		function ge() {
			return {
				type: `code`,
				lang: null,
				meta: null,
				value: ``
			};
		}
		function _e() {
			return {
				type: `inlineCode`,
				value: ``
			};
		}
		function ve() {
			return {
				type: `definition`,
				identifier: ``,
				label: null,
				title: null,
				url: ``
			};
		}
		function ye() {
			return {
				type: `emphasis`,
				children: []
			};
		}
		function be() {
			return {
				type: `heading`,
				depth: 0,
				children: []
			};
		}
		function xe() {
			return { type: `break` };
		}
		function Se() {
			return {
				type: `html`,
				value: ``
			};
		}
		function Ce() {
			return {
				type: `image`,
				title: null,
				url: ``,
				alt: null
			};
		}
		function we() {
			return {
				type: `link`,
				title: null,
				url: ``,
				children: []
			};
		}
		function Te(e) {
			return {
				type: `list`,
				ordered: e.type === `listOrdered`,
				start: null,
				spread: e._spread,
				children: []
			};
		}
		function Ee(e) {
			return {
				type: `listItem`,
				spread: e._spread,
				checked: null,
				children: []
			};
		}
		function De() {
			return {
				type: `paragraph`,
				children: []
			};
		}
		function Oe() {
			return {
				type: `strong`,
				children: []
			};
		}
		function j() {
			return {
				type: `text`,
				value: ``
			};
		}
		function ke() {
			return { type: `thematicBreak` };
		}
	}
	function Ag(e) {
		return {
			line: e.line,
			column: e.column,
			offset: e.offset
		};
	}
	function jg(e, t) {
		let n = -1;
		for (; ++n < t.length;) {
			let r = t[n];
			Array.isArray(r) ? jg(e, r) : Mg(e, r);
		}
	}
	function Mg(e, t) {
		let n;
		for (n in t) if (Dg.call(t, n)) switch (n) {
			case `canContainEols`: {
				let r = t[n];
				r && e[n].push(...r);
				break;
			}
			case `transforms`: {
				let r = t[n];
				r && e[n].push(...r);
				break;
			}
			case `enter`:
			case `exit`: {
				let r = t[n];
				r && Object.assign(e[n], r);
				break;
			}
		}
	}
	function Ng(e, t) {
		throw Error(e ? "Cannot close `" + e.type + "` (" + Yt({
			start: e.start,
			end: e.end
		}) + "): a different token (`" + t.type + "`, " + Yt({
			start: t.start,
			end: t.end
		}) + `) is open` : "Cannot close document, a token (`" + t.type + "`, " + Yt({
			start: t.start,
			end: t.end
		}) + `) is still open`);
	}
	function Pg(e) {
		let t = this;
		t.parser = n;
		function n(n) {
			return Og(n, {
				...t.data(`settings`),
				...e,
				extensions: t.data(`micromarkExtensions`) || [],
				mdastExtensions: t.data(`fromMarkdownExtensions`) || []
			});
		}
	}
	function Fg(e) {
		if (e.type === `image`) return !0;
		if (e.type === `link`) {
			let t = e;
			return t.children.length === 1 && t.children[0].type === `image`;
		}
		return !1;
	}
	function Ig(e) {
		return e.type === `text` && /^\s*$/.test(e.value);
	}
	function Lg(e) {
		let t = e.children;
		if (t.filter(Fg).length === 0 || t.length === 1) return null;
		let n = [], r = [], i = () => {
			let e = r.filter((e) => !Ig(e));
			e.length > 0 && n.push({
				type: `paragraph`,
				children: e
			}), r = [];
		};
		for (let e of t) Fg(e) ? (i(), n.push({
			type: `paragraph`,
			children: [e]
		})) : r.push(e);
		return i(), n;
	}
	function Rg(e) {
		let t = [];
		for (let n of e.children) {
			if (n.type === `paragraph`) {
				let e = Lg(n);
				if (e) {
					t.push(...e);
					continue;
				}
			}
			t.push(n);
		}
		e.children = t;
	}
	function zg(e) {
		return {
			type: `paragraph`,
			children: [{
				type: `text`,
				value: e
			}]
		};
	}
	function Bg(e) {
		return {
			type: `text`,
			value: e
		};
	}
	const Vg = /* @__PURE__ */ new Set([
		`area`,
		`base`,
		`br`,
		`col`,
		`embed`,
		`hr`,
		`img`,
		`input`,
		`link`,
		`meta`,
		`param`,
		`source`,
		`track`,
		`wbr`
	]);
	function Hg(e, t) {
		let n = e.trim();
		if (!n.startsWith(`<`) || !n.endsWith(`>`)) return null;
		let r = n.slice(1, -1).trim(), i = r.startsWith(`/`), a = i ? r.slice(1).trim() : r, o = !i && a.endsWith(`/`), s = o ? a.slice(0, -1).trim() : a, c = s.match(/^([A-Za-z][A-Za-z0-9_-]*)/);
		if (!c) return null;
		let l = c[1];
		if (!t.has(l)) return null;
		let u;
		if (u = i ? `close` : o || Vg.has(l.toLowerCase()) ? `self-closing` : `open`, u === `close`) return {
			name: l,
			kind: u,
			attrs: {},
			raw: n
		};
		let d = Wg(s.slice(c[0].length).trim());
		return {
			name: l,
			kind: u,
			attrs: d,
			raw: n
		};
	}
	function Ug(e, t) {
		let n = [];
		for (let r of e.matchAll(/<\/?[A-Za-z][^>]*>/g)) {
			let e = Hg(r[0], t);
			e && n.push(e);
		}
		return n;
	}
	function Wg(e) {
		let t = {};
		if (!e) return t;
		for (let n of e.matchAll(/([A-Za-z_][A-Za-z0-9_-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}|([^\s>]+)))?/g)) {
			let e = n[1], r = n[2], i = n[3], a = n[4], o = n[5];
			r === void 0 ? i === void 0 ? a === void 0 ? o === void 0 ? t[e] = null : t[e] = o : t[e] = a.trim() : t[e] = i : t[e] = r;
		}
		return t;
	}
	function Gg(e, t) {
		e.children = Kg(e.children, t), Ys(e, [
			`paragraph`,
			`heading`,
			`tableCell`,
			`tableHeader`,
			`strong`,
			`emphasis`,
			`delete`,
			`link`
		], (e) => {
			let n = e;
			n.children = Zg(n.children, t);
		});
	}
	function Kg(e, t) {
		let n = [], r = /* @__PURE__ */ new Set([...t.blockTags, ...t.inlineTags]), i = 0;
		for (; i < e.length;) {
			let a = e[i];
			if (a.type !== `html`) {
				n.push(a), i += 1;
				continue;
			}
			let { consumed: o, nodes: s } = qg(a, e, i, r, t);
			n.push(...s), i += o;
		}
		return n;
	}
	function qg(e, t, n, r, i) {
		let { firstLine: a, restLines: o } = r_(e.value), s = Hg(a, i.blockTags);
		if (!s) return Jg(e, i);
		if (s.kind === `self-closing`) return {
			consumed: 1,
			nodes: [Xg(s, [])]
		};
		if (s.kind === `close`) return {
			consumed: 1,
			nodes: [zg(e.value)]
		};
		let c = Yg(t, n + 1, s.name, r, i.blockTags);
		if (c === -1) return {
			consumed: 1,
			nodes: [zg(e.value)]
		};
		let l = Kg(t.slice(n + 1, c), i), u = i_(o, i), d = u ? [u, ...l] : l;
		return {
			consumed: c - n + 1,
			nodes: [Xg(s, d)]
		};
	}
	function Jg(e, t) {
		let n = i_(e.value, t);
		return n ? {
			consumed: 1,
			nodes: [n]
		} : {
			consumed: 1,
			nodes: [zg(e.value)]
		};
	}
	function Yg(e, t, n, r, i) {
		let a = 0;
		for (let o = t; o < e.length; o += 1) {
			let t = e[o];
			if (t.type !== `html`) continue;
			let s = e_(Hg(t.value, r.size > 0 ? i : /* @__PURE__ */ new Set([n])), n, a);
			if (s.matched) return o;
			a = s.depth;
		}
		return -1;
	}
	function Xg(e, t) {
		return {
			type: `mdxJsxFlowElement`,
			name: e.name,
			attributes: o_(e.attrs),
			children: t
		};
	}
	function Zg(e, t) {
		let n = [], r = t.inlineTags, i = 0;
		for (; i < e.length;) {
			let a = e[i];
			if (a.type !== `html`) {
				n.push(a), i += 1;
				continue;
			}
			let { consumed: o, nodes: s } = Qg(a, e, i, r, t);
			n.push(...s), i += o;
		}
		return n;
	}
	function Qg(e, t, n, r, i) {
		let a = Ug(e.value, r);
		if (a.length === 0) return {
			consumed: 1,
			nodes: [Bg(e.value)]
		};
		let o = a[0];
		if (o.kind === `self-closing`) return {
			consumed: 1,
			nodes: [n_(o, [])]
		};
		if (o.kind === `close`) return {
			consumed: 1,
			nodes: [Bg(e.value)]
		};
		let s = $g(t, n + 1, o.name, r);
		if (s === -1) return {
			consumed: 1,
			nodes: [Bg(e.value)]
		};
		let c = Zg(t.slice(n + 1, s), i);
		return {
			consumed: s - n + 1,
			nodes: [n_(o, c)]
		};
	}
	function $g(e, t, n, r) {
		let i = 0;
		for (let a = t; a < e.length; a += 1) {
			let t = e[a];
			if (t.type !== `html`) continue;
			let o = t_(Ug(t.value, r), n, i);
			if (o.matched) return a;
			i = o.depth;
		}
		return -1;
	}
	function e_(e, t, n) {
		return !e || e.name !== t ? {
			matched: !1,
			depth: n
		} : e.kind === `open` ? {
			matched: !1,
			depth: n + 1
		} : e.kind === `close` ? n === 0 ? {
			matched: !0,
			depth: n
		} : {
			matched: !1,
			depth: n - 1
		} : {
			matched: !1,
			depth: n
		};
	}
	function t_(e, t, n) {
		let r = n;
		for (let n of e) {
			let e = e_(n, t, r);
			if (e.matched) return {
				matched: !0,
				depth: r
			};
			r = e.depth;
		}
		return {
			matched: !1,
			depth: r
		};
	}
	function n_(e, t) {
		return {
			type: `mdxJsxTextElement`,
			name: e.name,
			attributes: o_(e.attrs),
			children: t
		};
	}
	function r_(e) {
		let t = e.indexOf(`
`);
		return t === -1 ? {
			firstLine: e,
			restLines: ``
		} : {
			firstLine: e.slice(0, t),
			restLines: e.slice(t + 1)
		};
	}
	function i_(e, t) {
		if (!e.trim()) return null;
		let n = a_(e, t.inlineTags);
		return n.length === 0 ? null : {
			type: `paragraph`,
			children: Zg(n, t)
		};
	}
	function a_(e, t) {
		let n = [], r = /<\/?[A-Za-z][^>]*>/g, i = 0;
		for (let o of e.matchAll(r)) {
			var a;
			let r = (a = o.index) == null ? 0 : a;
			if (r > i) {
				let t = e.slice(i, r);
				t && n.push({
					type: `text`,
					value: t
				});
			}
			let s = o[0];
			Hg(s, t) ? n.push({
				type: `html`,
				value: s
			}) : n.push({
				type: `text`,
				value: s
			}), i = r + s.length;
		}
		if (i < e.length) {
			let t = e.slice(i);
			t && n.push({
				type: `text`,
				value: t
			});
		}
		return n;
	}
	function o_(e) {
		let t = [];
		for (let [n, r] of Object.entries(e)) t.push({
			type: `mdxJsxAttribute`,
			name: n,
			value: r
		});
		return t;
	}
	function s_(e) {
		let t = c_(e);
		if (t.size > 0) {
			for (let n of e.children) if (n.type === `paragraph`) {
				let e = n;
				e.children = l_(e.children, t);
			}
		}
	}
	function c_(e) {
		let t = /* @__PURE__ */ new Map(), n = [];
		for (let r of e.children) if (r.type === `definition`) {
			let e = r;
			t.set(e.identifier.toLowerCase(), e);
		} else n.push(r);
		return e.children = n, t;
	}
	function l_(e, t) {
		return e.map((e) => {
			if (e.type === `imageReference`) return u_(e, t);
			if (e.type === `linkReference`) return d_(e, t);
			let n = e;
			return Array.isArray(n.children) && (n.children = l_(n.children, t)), e;
		});
	}
	function u_(e, t) {
		var n;
		let r = t.get(e.identifier.toLowerCase());
		return r ? {
			type: `image`,
			url: r.url,
			alt: e.alt || e.label || ``,
			title: (n = r.title) == null ? null : n
		} : {
			type: `text`,
			value: e.alt || e.label || ``
		};
	}
	function d_(e, t) {
		var n, r;
		let i = t.get(e.identifier.toLowerCase());
		if (!i) {
			var a;
			let t = (a = e.children) == null ? [] : a;
			return t.length > 0 ? t[0] : {
				type: `text`,
				value: e.label || ``
			};
		}
		return {
			type: `link`,
			url: i.url,
			title: (n = i.title) == null ? null : n,
			children: (r = e.children) == null ? [] : r
		};
	}
	function f_(e, t) {
		s_(e), Gg(e, t), Rg(e);
	}
	function p_(e) {
		let t = 0;
		for (let n of e) {
			if (n === ` `) {
				t += 1;
				continue;
			}
			break;
		}
		return t;
	}
	function m_(e, t, n) {
		return {
			offset: e,
			line: t,
			column: n
		};
	}
	function h_(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
	}
	function g_(e) {
		let t = e.replace(/\r\n?/g, `
`).split(`
`), n = [], r = 0;
		return t.forEach((e, t) => {
			let i = r, a = i + e.length;
			n.push({
				index: t,
				lineNumber: t + 1,
				raw: e,
				indent: p_(e),
				startOffset: i,
				endOffset: a
			}), r = a + 1;
		}), n;
	}
	function __(e) {
		return e.length - e.trimStart().length;
	}
	function v_(e) {
		return e.trim().length === 0;
	}
	function y_(e, t) {
		let n = e.raw.trim();
		if (!n.startsWith(`<`) || !n.endsWith(`>`)) return null;
		let r = [...t].map(h_).join(`|`);
		if (!r) return null;
		let i = RegExp(`^<\\s*(\\/)?\\s*(${r})(?:\\s+[^<>]*?)?\\s*(\\/)?\\s*>$`), a = n.match(i);
		if (!a) return null;
		let o = !!a[1], s = a[2], c = !!a[3], l;
		return l = o ? `close` : c ? `self-closing` : `open`, {
			kind: l,
			name: s,
			raw: n,
			lineIndex: e.index,
			lineNumber: e.lineNumber,
			indent: e.indent,
			start: m_(e.startOffset + e.indent, e.lineNumber, e.indent + 1),
			end: m_(e.endOffset, e.lineNumber, e.raw.length + 1)
		};
	}
	function b_(e, t) {
		return {
			level: `error`,
			code: `UNEXPECTED_CLOSING_TAG`,
			message: `Unexpected closing tag </${e.name}>.`,
			start: e.start,
			end: e.end,
			tagName: e.name,
			lineText: t
		};
	}
	function x_(e, t) {
		for (let n = e.length - 1; n >= 0; --n) if (e[n].token.name === t) return n;
		return -1;
	}
	function S_(e, t, n, r, i, a) {
		if (t.length === 0) {
			i.push(b_(e, a));
			return;
		}
		let o = x_(t, e.name);
		if (o === -1) {
			i.push(b_(e, a));
			return;
		}
		o !== t.length - 1 && r.push({
			level: `warning`,
			code: `TAG_MISMATCH`,
			message: `Recovered mismatched nesting before </${e.name}>.`,
			start: e.start,
			end: e.end,
			tagName: e.name,
			lineText: a
		});
		let s = t[o];
		t.splice(o, 1), n.push({
			tagName: s.token.name,
			openLineIndex: s.token.lineIndex,
			closeLineIndex: e.lineIndex,
			indent: s.token.indent
		});
	}
	function C_(e, t, n) {
		for (let i of e) {
			var r;
			t.push({
				level: `error`,
				code: `UNCLOSED_TAG`,
				message: `Unclosed tag <${i.token.name}>.`,
				start: i.token.start,
				end: i.token.end,
				tagName: i.token.name,
				lineText: (r = n[i.token.lineIndex]) == null ? void 0 : r.raw
			});
		}
	}
	function w_(e, t) {
		let n = [], r = [], i = [], a = [], o = new Set(t.blockTags);
		for (let t of e) {
			let e = y_(t, o);
			if (!(!e || e.kind === `self-closing`)) {
				if (e.kind === `open`) {
					a.push({ token: e });
					continue;
				}
				S_(e, a, i, n, r, t.raw);
			}
		}
		return C_(a, r, e), i.sort((e, t) => e.openLineIndex === t.openLineIndex ? e.closeLineIndex - t.closeLineIndex : e.openLineIndex - t.openLineIndex), {
			diagnostics: n,
			fatalDiagnostics: r,
			frames: i
		};
	}
	function T_(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
	}
	function E_(e, t) {
		var n;
		let r = [], i = t.blockTags.map(T_).join(`|`);
		if (!i) return {
			lines: e.map((e) => e.raw),
			diagnostics: r
		};
		let a = RegExp(`^(\\s*)(<(${i})(?:\\s+[^<>]*?)?>)\\s*(.+?)\\s*(<\\/\\3>)\\s*$`), o = [], s = (n = t.indentUnit) == null ? 4 : n;
		for (let t of e) {
			var c;
			let e = t.raw.match(a);
			if (!e) {
				o.push(t.raw);
				continue;
			}
			let n = (c = e[1]) == null ? `` : c, i = e[2], l = e[3], u = e[4], d = e[5];
			o.push(n + i), o.push(n + ` `.repeat(s) + u), o.push(n + d), r.push({
				level: `warning`,
				code: `INLINE_BLOCK_EXPANDED`,
				message: `Expanded inline block tag <${l}> into multiline form.`,
				start: {
					offset: t.startOffset,
					line: t.lineNumber,
					column: 1
				},
				end: {
					offset: t.endOffset,
					line: t.lineNumber,
					column: t.raw.length + 1
				},
				tagName: l,
				lineText: t.raw
			});
		}
		return {
			lines: o,
			diagnostics: r
		};
	}
	function D_(e, t) {
		return ` `.repeat(Math.max(0, t)) + e.trimStart();
	}
	function O_(e, t) {
		return {
			start: {
				offset: e.startOffset,
				line: e.lineNumber,
				column: 1
			},
			end: {
				offset: e.endOffset,
				line: e.lineNumber,
				column: t.length + 1
			}
		};
	}
	function k_(e, t, n, r, i, a, o, s, c, l = `increase`) {
		(l === `match` ? r.indent !== i : r.indent < i) && (e[t] = D_(n, i), s.push({
			level: `warning`,
			code: `INVALID_CHILD_INDENT`,
			message: c.replace(`{from}`, String(r.indent)).replace(`{to}`, String(i)).replace(`{parent}`, a),
			...O_(o[t], n),
			tagName: a,
			lineText: n
		}), r.indent = i);
	}
	function A_(e, t, n, r, i, a, o, s) {
		let c = i.indent + a;
		if (r.indent >= c) return;
		let l = n.slice(r.indent);
		e[t] = ` `.repeat(c) + l, s.push({
			level: `warning`,
			code: `INVALID_CHILD_INDENT`,
			message: `Normalized text indent inside <${i.tagName}> from ${r.indent} to ${c}.`,
			...O_(o[t], n),
			tagName: i.tagName,
			lineText: n
		});
	}
	function j_(e, t, n, r, i, a, o) {
		let s = t[e], c = {
			...n[e],
			raw: s,
			indent: __(s)
		}, l = y_(c, i);
		if ((l == null ? void 0 : l.kind) === `close`) {
			r.length > 0 && (k_(t, e, s, c, r[r.length - 1].indent, l.name, n, o, `Normalized closing tag indent for </{parent}> from {from} to {to}.`, `match`), r.pop());
			return;
		}
		if ((l == null ? void 0 : l.kind) === `open`) {
			r.length > 0 && (k_(t, e, s, c, r[r.length - 1].indent + a, r[r.length - 1].tagName, n, o, `Normalized child block indent inside <{parent}> from {from} to {to}.`), c.raw = t[e]), r.push({
				tagName: l.name,
				indent: c.indent
			});
			return;
		}
		if ((l == null ? void 0 : l.kind) === `self-closing`) {
			r.length > 0 && k_(t, e, s, c, r[r.length - 1].indent + a, r[r.length - 1].tagName, n, o, `Normalized self-closing child block indent inside <{parent}> from {from} to {to}.`);
			return;
		}
		r.length > 0 && !v_(s) && A_(t, e, s, c, r[r.length - 1], a, n, o);
	}
	function M_(e, t) {
		var n;
		let r = new Set(t.blockTags), i = (n = t.indentUnit) == null ? 4 : n, a = e.map((e) => e.raw), o = [], s = [];
		for (let t = 0; t < a.length; t += 1) j_(t, a, e, s, r, i, o);
		return {
			lines: a,
			diagnostics: o
		};
	}
	function N_(e, t, n, r) {
		return {
			level: `warning`,
			code: `ESCAPED_BLOCK_TAG_NORMALIZED`,
			message: r,
			start: {
				offset: e.startOffset,
				line: e.lineNumber,
				column: 1
			},
			end: {
				offset: e.endOffset,
				line: e.lineNumber,
				column: t.length + 1
			},
			tagName: n,
			lineText: t
		};
	}
	function P_(e) {
		var t, n;
		return (t = (n = e.match(/^\s*/)) == null ? void 0 : n[0]) == null ? `` : t;
	}
	function F_(e, t, n, r, i, a, o, s) {
		if (!e.startsWith(`<\\/`) || !e.endsWith(`>`)) return !1;
		let c = e.slice(3, -1).trim();
		return o.has(c) ? (i[r] = `${t}</${c}>`, s.push(N_(a[r], n, c, `Normalized escaped closing block tag </${c}>.`)), !0) : !1;
	}
	function I_(e, t, n, r, i, a, o, s) {
		var c;
		if (!e.startsWith(`\\<`) || !e.endsWith(`>`)) return !1;
		let l = (c = e.slice(2, -1).trim().split(/\s+/)[0]) == null ? void 0 : c.replace(/\/$/, ``);
		return !l || !o.has(l) ? !1 : (i[r] = t + e.slice(1), s.push(N_(a[r], n, l, `Normalized escaped opening block tag <${l}>.`)), !0);
	}
	function L_(e, t) {
		let n = [], r = e.map((e) => e.raw), i = new Set(t.blockTags);
		for (let t = 0; t < r.length; t += 1) {
			let a = r[t], o = P_(a), s = a.trim();
			F_(s, o, a, t, r, e, i, n) || I_(s, o, a, t, r, e, i, n);
		}
		return {
			lines: r,
			diagnostics: n
		};
	}
	function R_(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
	}
	function z_(e, t) {
		let n = 1, r = 1;
		for (let i = 0; i < t; i += 1) e[i] === `
` ? (n += 1, r = 1) : r += 1;
		return {
			line: n,
			column: r
		};
	}
	function B_(e, t) {
		var n;
		let r = [], i = [...t.blockTags, ...(n = t.inlineTags) == null ? [] : n];
		if (i.length === 0) return {
			code: e,
			diagnostics: r
		};
		let a = i.map(R_).join(`|`), o = RegExp(`<(?:\\/|\\\\/)\\s*(${a})\\b[^>]*>`, `g`);
		return {
			code: e.replace(o, (t, n, i) => {
				let a = `</${n}>`;
				if (t === a) return t;
				let o = z_(e, i);
				return r.push({
					level: `warning`,
					code: `MALFORMED_CLOSING_TAG_NORMALIZED`,
					message: `Normalized malformed closing tag </${n}>.`,
					start: {
						offset: i,
						line: o.line,
						column: o.column
					},
					end: {
						offset: i + t.length,
						line: o.line,
						column: o.column + t.length
					},
					tagName: n,
					lineText: t
				}), a;
			}),
			diagnostics: r
		};
	}
	function V_(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
	}
	function H_(e, t) {
		let n = 1, r = 1;
		for (let i = 0; i < t; i += 1) e[i] === `
` ? (n += 1, r = 1) : r += 1;
		return {
			line: n,
			column: r
		};
	}
	function U_(e) {
		return !!e && /[A-Za-z_$]/.test(e);
	}
	function W_(e) {
		return !!e && /[A-Za-z0-9_:$-]/.test(e);
	}
	function G_(e) {
		return /^[A-Za-z0-9._:/#%+-]+$/.test(e);
	}
	function K_(e, t, n, r, i) {
		let a = t[n], o = n + 1;
		for (; o < t.length && t[o] !== a;) o += 1;
		if (o < t.length) {
			let a = t.slice(n + 1, o).trim();
			i.push(`${e}="${a}"`);
			let s = t.slice(r, o + 1);
			return {
				nextI: o + 1,
				changed: s !== `${e}="${a}"`
			};
		}
		let s = n + 1;
		for (; s < t.length && !/\s/.test(t[s]);) s += 1;
		let c = t.slice(n + 1, s).trim();
		return i.push(`${e}="${c}"`), {
			nextI: s,
			changed: !0
		};
	}
	function q_(e, t, n, r, i) {
		let a = 1, o = n + 1;
		for (; o < t.length && a > 0;) t[o] === `{` ? a += 1 : t[o] === `}` && --a, o += 1;
		if (a === 0) {
			let a = t.slice(n, o);
			return i.push(`${e}=${a}`), {
				nextI: o,
				changed: t.slice(r, o) !== `${e}=${a}`
			};
		}
		return i.push(e), {
			nextI: n + 1,
			changed: !0
		};
	}
	function J_(e, t, n, r) {
		let i = n;
		for (; i < t.length && !/\s/.test(t[i]) && t[i] !== `>`;) i += 1;
		let a = t.slice(n, i);
		return G_(a) ? (r.push(`${e}="${a}"`), {
			nextI: i,
			changed: !0
		}) : (r.push(e), {
			nextI: i,
			changed: !0
		});
	}
	function Y_(e, t, n, r, i) {
		let a = r;
		for (; a < t.length && /\s/.test(t[a]);) a += 1;
		if (a >= t.length || t[a] !== `=`) {
			let n = !1, r = a;
			return (t[r] === `"` || t[r] === `'`) && (r += 1, n = !0), i.push(e), {
				nextI: r,
				changed: n
			};
		}
		for (a += 1; a < t.length && /\s/.test(t[a]);) a += 1;
		if (a >= t.length) return i.push(e), {
			nextI: a,
			changed: !0
		};
		let o = t[a];
		return o === `"` || o === `'` ? K_(e, t, a, n, i) : o === `{` ? q_(e, t, a, n, i) : J_(e, t, a, i);
	}
	function X_(e) {
		let t = e.replace(/(")([A-Za-z_$])/g, `$1 $2`).replace(/(')([A-Za-z_$])/g, `$1 $2`).replace(/(\})([A-Za-z_$])/g, `$1 $2`);
		return {
			source: t,
			changed: t !== e
		};
	}
	function Z_(e, t) {
		for (; t < e.length && /\s/.test(e[t]);) t += 1;
		return t;
	}
	function Q_(e, t) {
		let n = t + 1;
		for (; n < e.length && W_(e[n]);) n += 1;
		return {
			name: e.slice(t, n),
			nextI: n
		};
	}
	function $_(e) {
		let { source: t, changed: n } = X_(e), r = n, i = 0, a = [];
		for (; i < t.length && (i = Z_(t, i), !(i >= t.length));) {
			let e = i;
			if (!U_(t[i])) {
				let e = t.slice(i).trim();
				e && a.push(e), e !== t.slice(i) && (r = !0);
				break;
			}
			let { name: n, nextI: o } = Q_(t, e), { nextI: s, changed: c } = Y_(n, t, e, o, a);
			r = r || c, i = s;
		}
		return {
			normalized: a.join(` `),
			changed: r
		};
	}
	function ev(e, t, n, r, i, a) {
		if (e.startsWith(`</`) || e.startsWith(`<\\/`)) return e;
		let { normalized: o, changed: s } = $_(n == null ? `` : n), c = o.length > 0 ? `<${t} ${o}${r ? ` /` : ``}>` : `<${t}${r ? ` /` : ``}>`;
		if (!s && e === c) return e;
		if (e !== c) {
			let n = H_(a.source, i);
			a.diagnostics.push({
				level: `warning`,
				code: `OPENING_TAG_ATTRIBUTES_NORMALIZED`,
				message: `Normalized opening tag attributes for <${t}>.`,
				start: {
					offset: i,
					line: n.line,
					column: n.column
				},
				end: {
					offset: i + e.length,
					line: n.line,
					column: n.column + e.length
				},
				tagName: t,
				lineText: e
			});
		}
		return c;
	}
	function tv(e, t) {
		var n;
		let r = [], i = [...t.blockTags, ...(n = t.inlineTags) == null ? [] : n];
		if (i.length === 0) return {
			code: e,
			diagnostics: r
		};
		let a = i.map(V_).join(`|`), o = RegExp(`<\\s*(${a})\\b([^<>]*?)(\\/?)>`, `g`), s = {
			source: e,
			diagnostics: r
		};
		return {
			code: e.replace(o, (e, t, n, r, i) => ev(e, t, n, r, i, s)),
			diagnostics: r
		};
	}
	const nv = /^\s*\|/;
	const rv = /^\s*:?-+:?\s*$/;
	function iv(e) {
		return e.trim().replace(/^\|/, ``).replace(/\|$/, ``).split(`|`).length;
	}
	function av(e) {
		let t = e.trim();
		if (!nv.test(t)) return !1;
		let n = t.replace(/^\|/, ``).replace(/\|$/, ``).split(`|`);
		return n.length > 0 && n.every((e) => rv.test(e));
	}
	function ov(e) {
		let t = e.trim();
		return nv.test(t) && t.includes(`|`);
	}
	function sv(e) {
		let t = e.split(`
`), n = [];
		for (let e = 0; e < t.length; e += 1) {
			let r = t[e];
			if (e + 1 < t.length && ov(r) && av(t[e + 1])) {
				let i = iv(r), a = iv(t[e + 1]);
				if (a < i) {
					let o = i - a, s = t[e + 1].trimEnd(), c = s.endsWith(`|`), l;
					l = c ? `${s.slice(0, -1).trimEnd() + ` | ---`.repeat(o)} |` : s + ` | ---`.repeat(o), n.push(r), n.push(l), e += 1;
					continue;
				}
			}
			n.push(r);
		}
		return n.join(`
`);
	}
	function cv(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
	}
	function lv(e) {
		if (e.length === 0) return null;
		let t = e.map(cv).join(`|`);
		return RegExp(`^<(?:\\/|\\\\/)?\\s*(?:${t})(?=[\\s/>]|$)`);
	}
	function uv(e, t, n) {
		return {
			level: `warning`,
			code: `UNKNOWN_ANGLE_BRACKET_NORMALIZED`,
			message: `Normalized non-block tag angle bracket "<" to "&lt;".`,
			start: {
				offset: e.startOffset + n - 1,
				line: e.lineNumber,
				column: n
			},
			end: {
				offset: e.startOffset + n,
				line: e.lineNumber,
				column: n + 1
			},
			lineText: t
		};
	}
	function dv(e, t) {
		let n = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\s*[^>]*?(\/?)>/g, r = [];
		for (let i of e.matchAll(n)) {
			let [, e, n, a] = i;
			t.has(n) && r.push({
				name: n,
				isClose: e === `/`,
				isSelfClosing: a === `/`,
				position: i.index
			});
		}
		return r;
	}
	function fv(e) {
		let t = [];
		for (let n of e) {
			if (n.isSelfClosing) continue;
			if (!n.isClose) {
				t.push(n);
				continue;
			}
			let e = -1;
			for (let r = t.length - 1; r >= 0; r--) if (t[r].name === n.name) {
				e = r;
				break;
			}
			e !== -1 && t.splice(e, 1);
		}
		let n = /* @__PURE__ */ new Set();
		for (let e of t) n.add(e.position);
		return n;
	}
	function pv(e, t) {
		return t.size === 0 ? /* @__PURE__ */ new Set() : fv(dv(e, t));
	}
	function mv(e, t, n, r) {
		let { raw: i } = e;
		if (!i.includes(`<`)) return null;
		let a = pv(i, n), o = ``, s = !1;
		for (let n = 0; n < i.length; n += 1) {
			let c = i[n];
			if (c !== `<`) {
				o += c;
				continue;
			}
			let l = i.slice(n);
			if (l.startsWith(`&lt;`)) {
				o += `<`;
				continue;
			}
			if (a.has(n)) {
				o += `&lt;`, s = !0, r.push(uv(e, i, n + 1));
				continue;
			}
			if (t != null && t.test(l)) {
				o += `<`;
				continue;
			}
			o += `&lt;`, s = !0, r.push(uv(e, i, n + 1));
		}
		return s ? o : null;
	}
	function hv(e, t) {
		var n;
		let r = [], i = e.map((e) => e.raw), a = (n = t.inlineTags) == null ? [] : n, o = lv([...t.blockTags, ...a]), s = new Set(a);
		for (let t = 0; t < i.length; t += 1) {
			let n = mv(e[t], o, s, r);
			n !== null && (i[t] = n);
		}
		return {
			lines: i,
			diagnostics: r
		};
	}
	function gv(e) {
		let t = e, n = /<!--(?:(?!<!--).)*?-->/gs, r = ``;
		for (; r !== t;) r = t, t = t.replace(n, ``);
		return t;
	}
	const _v = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
	function vv(e) {
		let t = [], n = 0;
		for (; n < e.length;) {
			let r = e.charCodeAt(n);
			if (r < 128) t.push(r), n++;
			else if (r < 2048) t.push(192 | r >> 6, 128 | r & 63), n++;
			else if (r < 55296 || r >= 57344) t.push(224 | r >> 12, 128 | r >> 6 & 63, 128 | r & 63), n++;
			else {
				n++;
				let i = 65536 + ((r & 1023) << 10 | e.charCodeAt(n) & 1023);
				t.push(240 | i >> 18, 128 | i >> 12 & 63, 128 | i >> 6 & 63, 128 | i & 63), n++;
			}
		}
		return t;
	}
	function yv(e) {
		let t = e.length, n = ``, r = 0;
		for (; r < t;) {
			let i = e[r], a = r + 1 < t ? e[r + 1] : 0, o = r + 2 < t ? e[r + 2] : 0, s = i << 16 | a << 8 | o;
			n += _v[s >>> 18 & 63], n += _v[s >>> 12 & 63], n += r + 1 < t ? _v[s >>> 6 & 63] : `=`, n += r + 2 < t ? _v[s & 63] : `=`, r += 3;
		}
		return n;
	}
	function bv(e) {
		return yv(vv(e));
	}
	const xv = /<svg[\s\S]*?<\/svg>/gi;
	const Sv = /\bwidth\s*=\s*(?:"(\d+)"|'(\d+)')/i;
	const Cv = /\bheight\s*=\s*(?:"(\d+)"|'(\d+)')/i;
	const wv = /\bviewBox\s*=\s*["']([^"']+)["']/i;
	const Tv = /^(<svg[^>]*)>/i;
	function Ev(e, t) {
		var n;
		let r = e.match(t);
		if (!r) return;
		let i = Number((n = r[1]) == null ? r[2] : n);
		return i > 0 ? i : void 0;
	}
	function Dv(e) {
		let t = e.trim().split(/[\s,]+/).map(Number);
		return t.length >= 4 ? {
			w: t[2] > 0 ? t[2] : void 0,
			h: t[3] > 0 ? t[3] : void 0
		} : {
			w: void 0,
			h: void 0
		};
	}
	function Ov(e) {
		let t, n, r = e.match(wv);
		if (r) {
			let e = Dv(r[1]);
			t = e.w, n = e.h;
		}
		return t ??= Ev(e, Sv), n ??= Ev(e, Cv), {
			width: t || 100,
			height: n || 100
		};
	}
	function kv(e) {
		let t = e.match(Tv);
		if (!t) return e;
		let n = t[1], { width: r, height: i } = Ov(e);
		return /\bwidth\s*=/.test(n) || (n += ` width="${r}"`), /\bheight\s*=/.test(n) || (n += ` height="${i}"`), e.replace(Tv, `${n}>`);
	}
	function Av(e) {
		return e.replace(xv, (e) => {
			try {
				return `![svg](data:image/svg+xml;base64,${bv(kv(e))})`;
			} catch {
				return e;
			}
		});
	}
	function jv(e) {
		return sv(Av(gv(e)));
	}
	function Mv(e) {
		return `[${e.code}] ${e.message} at line ${e.start.line}, column ${e.start.column}`;
	}
	function Nv(e, t) {
		var n, r;
		let i = {
			...t,
			inlineTags: (n = t.inlineTags) == null ? [] : n,
			indentUnit: (r = t.indentUnit) == null ? 4 : r
		}, a = tv(gv(e), i), o = a.code, s = B_(o, i), c = s.code, l = L_(g_(c), i), u = E_(g_(l.lines.join(`
`)), i), d = M_(g_(u.lines.join(`
`)), i), f = hv(g_(d.lines.join(`
`)), i), p = sv(f.lines.join(`
`)), m = w_(g_(p), i), h = m.fatalDiagnostics[0];
		if (h) throw Error(Mv(h));
		return {
			code: p,
			diagnostics: [
				...a.diagnostics,
				...s.diagnostics,
				...l.diagnostics,
				...u.diagnostics,
				...d.diagnostics,
				...f.diagnostics,
				...m.diagnostics
			]
		};
	}
	const Pv = zt();
	Ir(Pv);
	const Fv = [...Pv.block.allowedComponentNames()];
	const Iv = [...Pv.inline.allowedNames()];
	function Lv(e, t) {
		return !t || t.size === 0 ? e : [.../* @__PURE__ */ new Set([...e, ...t])];
	}
	async function Rv(e, t = {}) {
		let { sourceType: n = `mdx`, enableAutoFallback: r, allowedComponents: i, allowedInlineComponents: a } = t, o = Lv(Fv, i), s = Lv(Iv, a);
		switch (n) {
			case `md`: return Bv(e, {
				blockTags: o,
				inlineTags: s
			});
			case `txt`: return Vv(e);
			default: try {
				return await zv(e, {
					blockTags: o,
					inlineTags: s
				});
			} catch (t) {
				if (!r) throw t;
				if (!Hv(e, i, a)) return await Bv(e, {
					blockTags: o,
					inlineTags: s
				});
				throw t;
			}
		}
	}
	async function zv(e, t) {
		let n = Nv(e, {
			inlineTags: t.inlineTags,
			blockTags: t.blockTags,
			indentUnit: 4
		});
		return Dn().use(Pg).use(io).use(Yd).use(Yh).use(Ld).use(Eo, [`yaml`]).parse(n.code);
	}
	async function Bv(e, t = {
		blockTags: Fv,
		inlineTags: Iv
	}) {
		let n = jv(e), r = Dn().use(Pg).use(io).use(Yd).use(Ld).use(Eo, [`yaml`]).parse(n);
		return f_(r, {
			blockTags: new Set(t.blockTags),
			inlineTags: new Set(t.inlineTags)
		}), r;
	}
	async function Vv(e) {
		let t = e.replace(/\r\n?/g, `
`).split(`
`);
		function n(e) {
			return {
				type: `paragraph`,
				children: [{
					type: `text`,
					value: e
				}]
			};
		}
		let r = [], i = [];
		function a() {
			i.length !== 0 && (r.push(n(i.join(`
`))), i = []);
		}
		for (let e of t) e === `` ? (a(), r.push(n(``))) : i.push(e);
		return a(), {
			type: `root`,
			children: r
		};
	}
	function Hv(e, t, n) {
		let r = /* @__PURE__ */ new Set([...t == null ? [] : t, ...n == null ? [] : n]);
		for (let t of r) if (RegExp(`<${t}[\\s/>]`).test(e)) return !0;
		return !1;
	}
	function Uv(e) {
		return e.type === `mdxJsxAttribute`;
	}
	function Wv(e) {
		return {
			type: `text`,
			value: e
		};
	}
	function Gv(e) {
		return {
			type: `paragraph`,
			children: [Wv(e)]
		};
	}
	function Kv(e) {
		return e ? e.type === `paragraph` || e.type === `heading` || e.type === `emphasis` || e.type === `strong` || e.type === `delete` || e.type === `link` || e.type === `linkReference` || e.type === `tableCell` : !1;
	}
	function qv(e, t, n) {
		if (Kv(e)) {
			e.children[t] = Wv(n);
			return;
		}
		e.children[t] = Gv(n);
	}
	function Jv(e, t) {
		e.children.splice(t, 1);
	}
	function Yv(e, t = ``) {
		var n;
		return `{${(n = e.value) == null ? t : n}}`;
	}
	function Xv(e, t) {
		let { allowedComponents: n, allowedInlineComponents: r = /* @__PURE__ */ new Set(), mode: i = `coerce`, forbidEsm: a = !0, forbidExpressions: o = !0, forbidInlineJsx: s = !0, placeholderText: c = `` } = t, l = (e) => {
			throw Error(e);
		}, u = (e) => {
			let { parent: t, index: n, message: r, literalText: a, canCoerceToText: o = !1 } = e;
			if (i === `strict` && l(r), i === `drop`) {
				Jv(t, n);
				return;
			}
			o ? qv(t, n, a == null ? c : a) : Jv(t, n);
		};
		if (a && Ys(e, `mdxjsEsm`, (e, t, n) => {
			let r = `MDX ESM (import/export) is not allowed`;
			if (typeof t != `number` || !(n != null && n.children)) {
				i === `strict` && l(r);
				return;
			}
			u({
				parent: n,
				index: t,
				message: r,
				canCoerceToText: !1
			});
		}), o) {
			let t = "MDX expressions `{...}` are not allowed";
			Ys(e, `mdxFlowExpression`, (e, n, r) => {
				if (typeof n != `number` || !(r != null && r.children)) {
					i === `strict` && l(t);
					return;
				}
				u({
					parent: r,
					index: n,
					message: t,
					literalText: Yv(e, c),
					canCoerceToText: !0
				});
			}), Ys(e, `mdxTextExpression`, (e, n, r) => {
				if (typeof n != `number` || !(r != null && r.children)) {
					i === `strict` && l(t);
					return;
				}
				u({
					parent: r,
					index: n,
					message: t,
					literalText: Yv(e, c),
					canCoerceToText: !0
				});
			});
		}
		function d(e, t) {
			var n;
			let i = r.has((n = e.name) == null ? `` : n);
			if (s && !i) return u({
				...t,
				message: `Inline JSX is not allowed`,
				canCoerceToText: !0,
				literalText: c
			}), !1;
			if (!s && r.size > 0 && !i) {
				var a;
				return u({
					...t,
					message: `Inline MDX component not allowed: ${(a = e.name) == null ? `` : a}`,
					canCoerceToText: !0,
					literalText: c
				}), !1;
			}
			return !0;
		}
		function f(e) {
			if (!Uv(e)) return i === `strict` && l(`JSX spread/expression attributes are not allowed`), null;
			let t = e, { value: n } = t;
			return n === null || typeof n == `string` ? t : typeof n == `object` && n.type === `mdxJsxAttributeValueExpression` ? {
				...t,
				value: n.value
			} : (i === `strict` && l(`JSX attribute must be a string or boolean`), null);
		}
		function p(e) {
			var t;
			let n = (t = e.attributes) == null ? [] : t, r = [];
			for (let e of n) {
				let t = f(e);
				t && r.push(t);
			}
			e.attributes = r;
		}
		function m(e, t) {
			var r;
			if (e.type === `mdxJsxTextElement` && !d(e, t)) return !1;
			let i = (r = e.name) == null ? null : r;
			return i ? e.type === `mdxJsxFlowElement` && !n.has(i) ? (u({
				...t,
				message: `MDX component not allowed: ${i}`,
				canCoerceToText: !1
			}), !1) : !0 : (u({
				...t,
				message: `JSX fragments are not allowed`,
				canCoerceToText: e.type === `mdxJsxTextElement`,
				literalText: c
			}), !1);
		}
		return Ys(e, [`mdxJsxFlowElement`, `mdxJsxTextElement`], (e, t, n) => {
			let r = e;
			if (typeof t != `number` || !(n != null && n.children)) {
				i === `strict` && l(`Invalid MDX JSX node placement`);
				return;
			}
			m(r, {
				parent: n,
				index: t
			}) && p(r);
		}), e;
	}
	function Zv(e, t) {
		var n;
		if (t.block.getByMdastType(`yaml`)) return e;
		let r = (n = e.children) == null ? [] : n;
		if (r.length === 0) return e;
		let i = 0, a = !1;
		for (; i < r.length;) {
			var o;
			let e = r[i];
			if ((e == null ? void 0 : e.type) !== `yaml`) break;
			r[i] = {
				type: `paragraph`,
				children: [{
					type: `text`,
					value: `---\n${String((o = e.value) == null ? `` : o)}\n---`
				}]
			}, a = !0, i += 1;
		}
		return a ? {
			...e,
			children: [...r]
		} : e;
	}
	async function Qv(e, t) {
		let n = e.records.block;
		if (n) {
			for (let e of Object.values(n)) if (e.type === `image` && typeof e.props.displaySource == `string`) {
				let n = e.props.displaySource;
				try {
					e.props.displaySource = await t(n);
				} catch {
					e.props.displaySource = n;
				}
			}
		}
	}
	async function $v(e, t) {
		var n;
		let r = (n = t.registries) == null ? zt() : n;
		Ir(r);
		let i = r.block.allowedComponentNames(), a = r.inline.allowedNames(), { sourceType: o, enableAutoFallback: s } = t, c = Zv(await Rv(e, {
			sourceType: o,
			enableAutoFallback: s,
			allowedComponents: i,
			allowedInlineComponents: a
		}), r);
		Xv(c, {
			allowedComponents: i,
			allowedInlineComponents: a,
			forbidEsm: !0,
			forbidExpressions: !0,
			forbidInlineJsx: !1
		});
		let { nodes: l, warnings: u } = si(c, {
			registries: r,
			preserveId: t.preserveId
		}), d = hr(l, {
			idFactory: t.idFactory,
			preserveId: t.preserveId,
			pageId: t.pageId,
			schemaVersion: t.schemaVersion,
			pageProps: t.pageProps,
			typeMap: t.typeMap,
			registries: r,
			pageType: t.pageType
		});
		return t.imageUrlResolver && await Qv(d, t.imageUrlResolver), {
			...d,
			warnings: u
		};
	}
	/**
	* @license
	* Copyright 2019 Google LLC
	* SPDX-License-Identifier: Apache-2.0
	*/
	const ey = Symbol(`Comlink.proxy`);
	const ty = Symbol(`Comlink.endpoint`);
	const ny = Symbol(`Comlink.releaseProxy`);
	const ry = Symbol(`Comlink.finalizer`);
	const iy = Symbol(`Comlink.thrown`);
	const ay = (e) => typeof e == `object` && !!e || typeof e == `function`;
	const oy = /* @__PURE__ */ new Map([[`proxy`, {
		canHandle: (e) => ay(e) && e[ey],
		serialize(e) {
			let { port1: t, port2: n } = new MessageChannel();
			return cy(e, t), [n, [n]];
		},
		deserialize(e) {
			return e.start(), dy(e);
		}
	}], [`throw`, {
		canHandle: (e) => ay(e) && iy in e,
		serialize({ value: e }) {
			let t;
			return t = e instanceof Error ? {
				isError: !0,
				value: {
					message: e.message,
					name: e.name,
					stack: e.stack
				}
			} : {
				isError: !1,
				value: e
			}, [t, []];
		},
		deserialize(e) {
			throw e.isError ? Object.assign(Error(e.value.message), e.value) : e.value;
		}
	}]]);
	function sy(e, t) {
		for (let n of e) if (t === n || n === `*` || n instanceof RegExp && n.test(t)) return !0;
		return !1;
	}
	function cy(e, t = globalThis, n = [`*`]) {
		t.addEventListener(`message`, function r(i) {
			if (!i || !i.data) return;
			if (!sy(n, i.origin)) {
				console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
				return;
			}
			let { id: a, type: o, path: s } = Object.assign({ path: [] }, i.data), c = (i.data.argumentList || []).map(Ty), l;
			try {
				let t = s.slice(0, -1).reduce((e, t) => e[t], e), n = s.reduce((e, t) => e[t], e);
				switch (o) {
					case `GET`:
						l = n;
						break;
					case `SET`:
						t[s.slice(-1)[0]] = Ty(i.data.value), l = !0;
						break;
					case `APPLY`:
						l = n.apply(t, c);
						break;
					case `CONSTRUCT`:
						l = Cy(new n(...c));
						break;
					case `ENDPOINT`:
						{
							let { port1: t, port2: n } = new MessageChannel();
							cy(e, n), l = Sy(t, [t]);
						}
						break;
					case `RELEASE`:
						l = void 0;
						break;
					default: return;
				}
			} catch (e) {
				l = {
					value: e,
					[iy]: 0
				};
			}
			Promise.resolve(l).catch((e) => ({
				value: e,
				[iy]: 0
			})).then((n) => {
				let [i, s] = wy(n);
				t.postMessage(Object.assign(Object.assign({}, i), { id: a }), s), o === `RELEASE` && (t.removeEventListener(`message`, r), uy(t), ry in e && typeof e[ry] == `function` && e[ry]());
			}).catch((e) => {
				let [n, r] = wy({
					value: TypeError(`Unserializable return value`),
					[iy]: 0
				});
				t.postMessage(Object.assign(Object.assign({}, n), { id: a }), r);
			});
		}), t.start && t.start();
	}
	function ly(e) {
		return e.constructor.name === `MessagePort`;
	}
	function uy(e) {
		ly(e) && e.close();
	}
	function dy(e, t) {
		let n = /* @__PURE__ */ new Map();
		return e.addEventListener(`message`, function(e) {
			let { data: t } = e;
			if (!t || !t.id) return;
			let r = n.get(t.id);
			if (r) try {
				r(t);
			} finally {
				n.delete(t.id);
			}
		}), vy(e, n, [], t);
	}
	function fy(e) {
		if (e) throw Error(`Proxy has been released and is not useable`);
	}
	function py(e) {
		return Ey(e, /* @__PURE__ */ new Map(), { type: `RELEASE` }).then(() => {
			uy(e);
		});
	}
	const my = /* @__PURE__ */ new WeakMap();
	const hy = `FinalizationRegistry` in globalThis && new FinalizationRegistry((e) => {
		let t = (my.get(e) || 0) - 1;
		my.set(e, t), t === 0 && py(e);
	});
	function gy(e, t) {
		let n = (my.get(t) || 0) + 1;
		my.set(t, n), hy && hy.register(e, t, e);
	}
	function _y(e) {
		hy && hy.unregister(e);
	}
	function vy(e, t, n = [], r = function() {}) {
		let i = !1, a = new Proxy(r, {
			get(r, o) {
				if (fy(i), o === ny) return () => {
					_y(a), py(e), t.clear(), i = !0;
				};
				if (o === `then`) {
					if (n.length === 0) return { then: () => a };
					let r = Ey(e, t, {
						type: `GET`,
						path: n.map((e) => e.toString())
					}).then(Ty);
					return r.then.bind(r);
				}
				return vy(e, t, [...n, o]);
			},
			set(r, a, o) {
				fy(i);
				let [s, c] = wy(o);
				return Ey(e, t, {
					type: `SET`,
					path: [...n, a].map((e) => e.toString()),
					value: s
				}, c).then(Ty);
			},
			apply(r, a, o) {
				fy(i);
				let s = n[n.length - 1];
				if (s === ty) return Ey(e, t, { type: `ENDPOINT` }).then(Ty);
				if (s === `bind`) return vy(e, t, n.slice(0, -1));
				let [c, l] = by(o);
				return Ey(e, t, {
					type: `APPLY`,
					path: n.map((e) => e.toString()),
					argumentList: c
				}, l).then(Ty);
			},
			construct(r, a) {
				fy(i);
				let [o, s] = by(a);
				return Ey(e, t, {
					type: `CONSTRUCT`,
					path: n.map((e) => e.toString()),
					argumentList: o
				}, s).then(Ty);
			}
		});
		return gy(a, e), a;
	}
	function yy(e) {
		return Array.prototype.concat.apply([], e);
	}
	function by(e) {
		let t = e.map(wy);
		return [t.map((e) => e[0]), yy(t.map((e) => e[1]))];
	}
	const xy = /* @__PURE__ */ new WeakMap();
	function Sy(e, t) {
		return xy.set(e, t), e;
	}
	function Cy(e) {
		return Object.assign(e, { [ey]: !0 });
	}
	function wy(e) {
		for (let [t, n] of oy) if (n.canHandle(e)) {
			let [r, i] = n.serialize(e);
			return [{
				type: `HANDLER`,
				name: t,
				value: r
			}, i];
		}
		return [{
			type: `RAW`,
			value: e
		}, xy.get(e) || []];
	}
	function Ty(e) {
		switch (e.type) {
			case `HANDLER`: return oy.get(e.name).deserialize(e.value);
			case `RAW`: return e.value;
		}
	}
	function Ey(e, t, n, r) {
		return new Promise((i) => {
			let a = Dy();
			t.set(a, i), e.start && e.start(), e.postMessage(Object.assign({ id: a }, n), r);
		});
	}
	function Dy() {
		return [
			,
			,
			,
			,
		].fill(0).map(() => Math.floor(Math.random() * (2 ** 53 - 1)).toString(16)).join(`-`);
	}
	cy({
		async ping() {},
		async convert(e, t) {
			let n = { ...t };
			return delete n.idFactory, $v(e, n);
		}
	});
	//#endregion
})();
