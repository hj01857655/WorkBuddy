import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Eot as a$4, Gat as o$4, Iot as o$2, Jat as F, Lot as a$3, Tat as a$6, Tot as init_dist, Yot as useTranslation, _at as p, aot as e$4, dot as t$1, eot as a$5, gat as init_i18n, hat as f$1, jot as l$1, lot as init_events, mat as init_katex_lazy, pat as a$2, rot as o$3, rst as v$1, sot as e$5, uot as n$2, vat as init_dist$1 } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Qu as Pencil, Yl as init_lucide_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/data/examples-chemistry.mjs
var e$3;
var init_examples_chemistry = __esmMin((() => {
	e$3 = [
		{
			latex: `\\text{CaO} + \\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2`,
			descKey: `equation.example.chem.cao`,
			descDefault: `氧化钙与水反应`
		},
		{
			latex: `2\\text{H}_2 + \\text{O}_2 \\xrightarrow{\\text{点燃}} 2\\text{H}_2\\text{O}`,
			descKey: `equation.example.chem.h2burn`,
			descDefault: `氢气燃烧`
		},
		{
			latex: `\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}`,
			descKey: `equation.example.chem.ch4burn`,
			descDefault: `甲烷燃烧`
		},
		{
			latex: `\\text{NaOH} + \\text{HCl} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}`,
			descKey: `equation.example.chem.neutralization`,
			descDefault: `酸碱中和反应`
		},
		{
			latex: `\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu}`,
			descKey: `equation.example.chem.feDisplace`,
			descDefault: `铁置换铜`
		},
		{
			latex: `\\text{CaCO}_3 \\xrightarrow{\\Delta} \\text{CaO} + \\text{CO}_2 \\uparrow`,
			descKey: `equation.example.chem.caco3`,
			descDefault: `碳酸钙热分解`
		},
		{
			latex: `\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-`,
			descKey: `equation.example.chem.nh3hydro`,
			descDefault: `氨的水解平衡`
		},
		{
			latex: `K_{\\text{eq}} = \\frac{[\\text{C}]^c [\\text{D}]^d}{[\\text{A}]^a [\\text{B}]^b}`,
			descKey: `equation.example.chem.keq`,
			descDefault: `化学平衡常数表达式`
		}
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/data/examples-math.mjs
var e$2;
var init_examples_math = __esmMin((() => {
	e$2 = [
		{
			latex: `f(x) = a_0 + \\sum_{n=1}^{\\infty} \\left( a_n \\cos \\frac{n\\pi x}{L} + b_n \\sin \\frac{n\\pi x}{L} \\right)`,
			descKey: `equation.example.math.fourier`,
			descDefault: `傅里叶级数`
		},
		{
			latex: `f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n`,
			descKey: `equation.example.math.taylor`,
			descDefault: `泰勒展开式`
		},
		{
			latex: `\\oiint_{\\partial V} \\vec{F} \\cdot d\\vec{S} = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV`,
			descKey: `equation.example.math.gauss`,
			descDefault: `高斯公式`
		},
		{
			latex: `\\int_a^b f(x) \\, dx = F(b) - F(a)`,
			descKey: `equation.example.math.ftc`,
			descDefault: `定积分（牛顿-莱布尼茨公式）`
		},
		{
			latex: `e^{i\\pi} + 1 = 0`,
			descKey: `equation.example.math.euler`,
			descDefault: `欧拉公式`
		},
		{
			latex: `\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dx\\,dy`,
			descKey: `equation.example.math.green`,
			descDefault: `格林公式`
		},
		{
			latex: `\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f'(c)}{g'(c)}`,
			descKey: `equation.example.math.cauchy`,
			descDefault: `柯西中值定理`
		},
		{
			latex: `\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e`,
			descKey: `equation.example.math.eDef`,
			descDefault: `自然对数底 e 的定义`
		},
		{
			latex: `\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u`,
			descKey: `equation.example.math.wave`,
			descDefault: `波动方程`
		},
		{
			latex: `\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^{n} a_{i,\\sigma(i)}`,
			descKey: `equation.example.math.det`,
			descDefault: `行列式展开`
		},
		{
			latex: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,
			descKey: `equation.example.math.quadratic`,
			descDefault: `一元二次方程求根公式`
		},
		{
			latex: `\\binom{n}{k} = \\frac{n!}{k!(n-k)!}`,
			descKey: `equation.example.math.combination`,
			descDefault: `组合数公式`
		}
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/data/examples-physics.mjs
var e$1;
var init_examples_physics = __esmMin((() => {
	e$1 = [
		{
			latex: `F = ma`,
			descKey: `equation.example.physics.newton2`,
			descDefault: `牛顿第二定律`
		},
		{
			latex: `F = G \\frac{m_1 m_2}{r^2}`,
			descKey: `equation.example.physics.gravity`,
			descDefault: `万有引力定律`
		},
		{
			latex: `F = k \\frac{q_1 q_2}{r^2}`,
			descKey: `equation.example.physics.coulomb`,
			descDefault: `库仑定律`
		},
		{
			latex: `\\varepsilon = -\\frac{d\\Phi_B}{dt}`,
			descKey: `equation.example.physics.faraday`,
			descDefault: `法拉第电磁感应定律`
		},
		{
			latex: `E = mc^2`,
			descKey: `equation.example.physics.massEnergy`,
			descDefault: `质能方程`
		},
		{
			latex: `E = h\\nu`,
			descKey: `equation.example.physics.planck`,
			descDefault: `普朗克-爱因斯坦关系`
		},
		{
			latex: `\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}`,
			descKey: `equation.example.physics.heisenberg`,
			descDefault: `海森堡不确定性原理`
		},
		{
			latex: `i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H} \\Psi`,
			descKey: `equation.example.physics.schrodinger`,
			descDefault: `薛定谔方程`
		},
		{
			latex: `PV = nRT`,
			descKey: `equation.example.physics.idealGas`,
			descDefault: `理想气体状态方程`
		},
		{
			latex: `S = k_B \\ln \\Omega`,
			descKey: `equation.example.physics.boltzmann`,
			descDefault: `玻尔兹曼熵公式`
		}
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/data/symbols.mjs
var e;
var init_symbols = __esmMin((() => {
	e = [
		{
			titleKey: `equation.symbols.basicOps`,
			titleDefault: `基本运算`,
			symbols: [
				`\\times`,
				`\\div`,
				`\\pm`,
				`\\mp`,
				`\\cdot`,
				`\\star`,
				`\\circ`,
				`\\bullet`,
				`\\oplus`,
				`\\otimes`,
				`\\odot`,
				`\\dagger`
			]
		},
		{
			titleKey: `equation.symbols.relations`,
			titleDefault: `关系符号`,
			symbols: [
				`\\neq`,
				`\\leq`,
				`\\geq`,
				`\\sim`,
				`\\approx`,
				`\\cong`,
				`\\equiv`,
				`\\propto`,
				`\\ll`,
				`\\gg`,
				`\\prec`,
				`\\succ`
			]
		},
		{
			titleKey: `equation.symbols.setTheory`,
			titleDefault: `集合论`,
			symbols: [
				`\\in`,
				`\\notin`,
				`\\subset`,
				`\\supset`,
				`\\subseteq`,
				`\\supseteq`,
				`\\cup`,
				`\\cap`,
				`\\emptyset`,
				`\\forall`,
				`\\exists`,
				`\\nexists`
			]
		},
		{
			titleKey: `equation.symbols.decorations`,
			titleDefault: `装饰与结构`,
			symbols: [
				`\\sqrt{ab}`,
				`\\sqrt[n]{ab}`,
				`\\tilde{a}`,
				`\\hat{a}`,
				`\\bar{a}`,
				`\\vec{a}`,
				`\\dot{a}`,
				`\\ddot{a}`,
				`a^{b}`,
				`a_{b}`,
				`\\overline{ab}`,
				`\\underline{ab}`
			]
		},
		{
			titleKey: `equation.symbols.trig`,
			titleDefault: `三角函数`,
			symbols: [
				`\\sin`,
				`\\cos`,
				`\\tan`,
				`\\cot`,
				`\\sec`,
				`\\csc`,
				`\\arcsin`,
				`\\arccos`,
				`\\arctan`,
				`\\sinh`,
				`\\cosh`,
				`\\tanh`
			]
		},
		{
			titleKey: `equation.symbols.operators`,
			titleDefault: `运算符与极限`,
			symbols: [
				`\\log`,
				`\\ln`,
				`\\lg`,
				`\\lim`,
				`\\det`,
				`\\max`,
				`\\min`,
				`\\sup`,
				`\\inf`,
				`\\dim`,
				`\\ker`,
				`\\arg`
			]
		},
		{
			titleKey: `equation.symbols.calculus`,
			titleDefault: `分数与积分`,
			symbols: [
				`\\frac{a}{b}`,
				`\\partial`,
				`\\int`,
				`\\iint`,
				`\\iiint`,
				`\\oint`,
				`\\sum`,
				`\\prod`,
				`\\nabla`,
				`\\infty`,
				`\\aleph`,
				`\\hbar`
			]
		},
		{
			titleKey: `equation.symbols.arrows`,
			titleDefault: `箭头`,
			symbols: [
				`\\leftarrow`,
				`\\rightarrow`,
				`\\leftrightarrow`,
				`\\Leftarrow`,
				`\\Rightarrow`,
				`\\Leftrightarrow`,
				`\\uparrow`,
				`\\downarrow`,
				`\\mapsto`,
				`\\longrightarrow`,
				`\\hookrightarrow`,
				`\\nearrow`
			]
		},
		{
			titleKey: `equation.symbols.greek`,
			titleDefault: `希腊字母`,
			symbols: [
				`\\alpha`,
				`\\beta`,
				`\\gamma`,
				`\\delta`,
				`\\epsilon`,
				`\\zeta`,
				`\\eta`,
				`\\theta`,
				`\\lambda`,
				`\\mu`,
				`\\pi`,
				`\\omega`
			]
		},
		{
			titleKey: `equation.symbols.brackets`,
			titleDefault: `括号`,
			symbols: [
				`\\langle`,
				`\\rangle`,
				`\\lfloor`,
				`\\rfloor`,
				`\\lceil`,
				`\\rceil`,
				`\\lbrace`,
				`\\rbrace`,
				`\\lvert`,
				`\\rvert`,
				`\\lVert`,
				`\\rVert`
			]
		}
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/example-card.mjs
function r$1({ example: r, onInsert: i }) {
	let a = f$1(), o = a$2(r.latex, !0);
	return import_react$4.createElement(`button`, {
		type: `button`,
		className: `sc-equation-modal-example-card`,
		onClick: () => i(r.latex)
	}, o === null ? import_react$4.createElement(`div`, {
		className: `sc-equation-modal-example-card__formula`,
		style: {
			fontFamily: `monospace`,
			opacity: .6
		}
	}, r.latex) : import_react$4.createElement(`div`, {
		className: `sc-equation-modal-example-card__formula`,
		dangerouslySetInnerHTML: { __html: o }
	}), import_react$4.createElement(`div`, { className: `sc-equation-modal-example-card__desc` }, a(r.descKey, r.descDefault)));
}
var import_react$4;
var init_example_card = __esmMin((() => {
	init_i18n();
	init_katex_lazy();
	import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/symbol-grid.mjs
function i$1({ symbols: e, onInsert: n }) {
	return import_react$3.createElement(a$3.Provider, { delayDuration: 300 }, import_react$3.createElement(`div`, { className: `sc-equation-modal-symbol-grid` }, e.map((e) => import_react$3.createElement(o$1, {
		key: e,
		latex: e,
		onClick: () => n(e)
	}))));
}
function o$1({ latex: n, onClick: i }) {
	let o = a$2(n, !1);
	return o === null ? import_react$3.createElement(`button`, {
		type: `button`,
		className: `sc-equation-modal-symbol-btn`,
		style: {
			fontFamily: `monospace`,
			opacity: .6
		},
		onClick: i
	}, n) : import_react$3.createElement(a$3.Root, null, import_react$3.createElement(a$3.Trigger, { asChild: !0 }, import_react$3.createElement(a$1, {
		html: o,
		onClick: i
	})), import_react$3.createElement(a$3.Content, { side: `top` }, n));
}
var import_react$3, a$1;
var init_symbol_grid = __esmMin((() => {
	init_katex_lazy();
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist();
	a$1 = (0, import_react$3.forwardRef)(({ html: e, onClick: n, ...r }, i) => import_react$3.createElement(`button`, {
		ref: i,
		type: `button`,
		className: `sc-equation-modal-symbol-btn`,
		onClick: n,
		dangerouslySetInnerHTML: { __html: e },
		...r
	}));
	a$1.displayName = `SymbolBtn`;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/quick-input-panel.mjs
function l({ onInsert: i }) {
	let a = f$1();
	return import_react$2.createElement(`div`, { className: `sc-equation-modal-quick-input` }, import_react$2.createElement(`div`, { className: `sc-equation-modal-quick-input__header` }, a(`equation.modal.quickInput`, `快速输入`)), import_react$2.createElement(a$4.Root, {
		defaultValue: `symbols`,
		className: `sc-equation-modal-quick-input__tabs-root`
	}, import_react$2.createElement(a$4.List, { className: `sc-equation-modal-quick-input__tabs` }, import_react$2.createElement(a$4.Trigger, {
		value: `symbols`,
		className: `sc-equation-modal-quick-input__tab`
	}, a(`equation.modal.tabSymbols`, `常用符号`)), import_react$2.createElement(a$4.Trigger, {
		value: `math`,
		className: `sc-equation-modal-quick-input__tab`
	}, a(`equation.modal.tabMath`, `数学`)), import_react$2.createElement(a$4.Trigger, {
		value: `physics`,
		className: `sc-equation-modal-quick-input__tab`
	}, a(`equation.modal.tabPhysics`, `物理`)), import_react$2.createElement(a$4.Trigger, {
		value: `chemistry`,
		className: `sc-equation-modal-quick-input__tab`
	}, a(`equation.modal.tabChemistry`, `化学`))), import_react$2.createElement(a$4.Content, {
		value: `symbols`,
		className: `sc-equation-modal-quick-input__content`
	}, import_react$2.createElement(u$1, { onInsert: i })), import_react$2.createElement(a$4.Content, {
		value: `math`,
		className: `sc-equation-modal-quick-input__content`
	}, import_react$2.createElement(d$1, {
		examples: e$2,
		onInsert: i
	})), import_react$2.createElement(a$4.Content, {
		value: `physics`,
		className: `sc-equation-modal-quick-input__content`
	}, import_react$2.createElement(d$1, {
		examples: e$1,
		onInsert: i
	})), import_react$2.createElement(a$4.Content, {
		value: `chemistry`,
		className: `sc-equation-modal-quick-input__content`
	}, import_react$2.createElement(d$1, {
		examples: e$3,
		onInsert: i
	}))));
}
function u$1({ onInsert: t }) {
	let n = f$1();
	return import_react$2.createElement(`div`, { className: `sc-equation-modal-symbols-list` }, e.map((e) => import_react$2.createElement(`div`, {
		key: e.titleKey,
		className: `sc-equation-modal-symbol-section`
	}, import_react$2.createElement(`div`, { className: `sc-equation-modal-symbol-section__title` }, n(e.titleKey, e.titleDefault)), import_react$2.createElement(i$1, {
		symbols: e.symbols,
		onInsert: t
	}))));
}
function d$1({ examples: e, onInsert: t }) {
	return import_react$2.createElement(`div`, { className: `sc-equation-modal-examples-list` }, e.map((e) => import_react$2.createElement(r$1, {
		key: e.descKey,
		example: e,
		onInsert: t
	})));
}
var import_react$2;
var init_quick_input_panel = __esmMin((() => {
	init_i18n();
	init_examples_chemistry();
	init_examples_math();
	init_examples_physics();
	init_symbols();
	init_example_card();
	init_symbol_grid();
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/equation-modal.less
var init_equation_modal$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/modal/equation-modal.mjs
function u({ open: u, initialLatex: p, onConfirm: m, onCancel: h, simpleMode: g }) {
	let [_, v] = (0, import_react$1.useState)(p), y = (0, import_react$1.useRef)(null), b = f$1();
	(0, import_react$1.useEffect)(() => {
		u && (v(p), requestAnimationFrame(() => {
			var e;
			(e = y.current) == null || e.focus();
		}));
	}, [u, p]);
	let x = a$2(_, !0), S = (0, import_react$1.useCallback)((e) => {
		let t = y.current;
		if (!t) {
			v((t) => t + e);
			return;
		}
		let n = t.selectionStart, r = t.selectionEnd;
		v((t) => {
			let i = t.slice(0, n), a = t.slice(r);
			return i + e + a;
		}), requestAnimationFrame(() => {
			let r = n + e.length;
			t.selectionStart = r, t.selectionEnd = r, t.focus();
		});
	}, []), C = (0, import_react$1.useCallback)((e) => {
		e.key === `Enter` && (e.ctrlKey || e.metaKey) && (e.preventDefault(), e.stopPropagation(), m(_));
	}, [m, _]);
	return import_react$1.createElement(l$1.Root, {
		open: u,
		onOpenChange: (e) => {
			e || h();
		}
	}, import_react$1.createElement(l$1.Content, {
		className: `sc-equation-modal${g ? ` sc-equation-modal--simple` : ``}`,
		"aria-labelledby": `sc-equation-modal-title`,
		onEscapeKeyDown: () => h(),
		onOpenAutoFocus: (e) => {
			e.preventDefault(), requestAnimationFrame(() => {
				var e;
				(e = y.current) == null || e.focus();
			});
		}
	}, import_react$1.createElement(`div`, { className: `sc-equation-modal-header` }, import_react$1.createElement(l$1.Title, {
		id: `sc-equation-modal-title`,
		className: `sc-equation-modal-header__title`
	}, b(`equation.modal.title`, `编辑LaTeX公式`)), import_react$1.createElement(l$1.Close, { asChild: !0 }, import_react$1.createElement(`button`, {
		type: `button`,
		className: `sc-equation-modal-header__close`,
		"aria-label": b(`equation.modal.close`, `关闭`)
	}, import_react$1.createElement(d, null)))), import_react$1.createElement(`div`, {
		className: `sc-equation-modal-body`,
		onKeyDown: C
	}, import_react$1.createElement(`div`, { className: `sc-equation-modal-editor` }, !g && import_react$1.createElement(`div`, { className: `sc-equation-modal-editor__label` }, b(`equation.modal.editorLabel`, `公式编辑`)), import_react$1.createElement(`textarea`, {
		ref: y,
		className: `sc-equation-modal-textarea`,
		value: _,
		onChange: (e) => v(e.target.value),
		onPaste: (e) => e.stopPropagation(),
		placeholder: b(`equation.modal.placeholder`, g ? `输入LaTeX公式` : `直接输入，或点击右侧进行快速输入。`),
		spellCheck: !1
	}), !g && import_react$1.createElement(`div`, { className: `sc-equation-modal-preview` }, x ? import_react$1.createElement(`div`, {
		className: `sc-equation-modal-preview__content`,
		dangerouslySetInnerHTML: { __html: x }
	}) : import_react$1.createElement(`div`, { className: `sc-equation-modal-preview__placeholder` }, b(`equation.modal.previewPlaceholder`, `预览区域`)))), !g && import_react$1.createElement(l, { onInsert: S })), import_react$1.createElement(`div`, { className: `sc-equation-modal-footer` }, !g && import_react$1.createElement(`span`, { className: `sc-equation-modal-footer__help` }, b(`equation.modal.help`, `如何使用LaTeX生成公式？`), import_react$1.createElement(f, null)), import_react$1.createElement(`div`, { className: `sc-equation-modal-footer__actions` }, import_react$1.createElement(o$2, {
		variant: `outline`,
		size: `md`,
		onClick: h
	}, b(`equation.modal.cancel`, `取消`)), import_react$1.createElement(o$2, {
		variant: `solid`,
		size: `md`,
		onClick: () => m(_)
	}, b(`equation.modal.confirm`, `确定`))))));
}
function d() {
	return import_react$1.createElement(`svg`, {
		width: `16`,
		height: `16`,
		viewBox: `0 0 16 16`,
		fill: `none`,
		xmlns: `http://www.w3.org/2000/svg`,
		"aria-hidden": `true`
	}, import_react$1.createElement(`path`, {
		d: `M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`
	}));
}
function f() {
	return import_react$1.createElement(`svg`, {
		width: `14`,
		height: `14`,
		viewBox: `0 0 16 16`,
		fill: `none`,
		xmlns: `http://www.w3.org/2000/svg`,
		"aria-hidden": `true`,
		style: {
			marginLeft: 4,
			verticalAlign: `middle`
		}
	}, import_react$1.createElement(`circle`, {
		cx: `8`,
		cy: `8`,
		r: `6.5`,
		stroke: `currentColor`,
		strokeWidth: `1.2`
	}), import_react$1.createElement(`path`, {
		d: `M6.5 6.5C6.5 5.67 7.17 5 8 5C8.83 5 9.5 5.67 9.5 6.5C9.5 7.33 8.83 8 8 8V9`,
		stroke: `currentColor`,
		strokeWidth: `1.2`,
		strokeLinecap: `round`
	}), import_react$1.createElement(`circle`, {
		cx: `8`,
		cy: `10.5`,
		r: `0.5`,
		fill: `currentColor`
	}));
}
var import_react$1;
var init_equation_modal = __esmMin((() => {
	init_i18n();
	init_katex_lazy();
	init_quick_input_panel();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist();
	init_equation_modal$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-e_b9c7a9d0b95084cae70f80f49a4973ee/node_modules/@tencent/smart-doc-plugin-equation/dist/equation-plugin-component.mjs
function b(e, t, n) {
	let { blockId: r, mode: i, insertOffset: a, editTokenIndex: d } = t;
	switch (i) {
		case `inline-insert`:
			if (a !== void 0) {
				let t = o$3(e$4.EquationInline, [n, v$1(10)]);
				e.dispatch((n) => {
					F.insertInlineAtom(e, n, r, t, a);
				});
			}
			return;
		case `inline-edit`:
			if (d !== void 0) {
				let t = e.getBlock(r);
				if (t) {
					var f;
					let i = [...(f = t.props.title) == null ? [] : f];
					i[d] = o$3(e$4.EquationInline, [n, v$1(10)]), a$5(e, r, i);
				}
			}
			return;
		case `block`:
			e.dispatch((t) => {
				F.updateBlockProps(e, t, r, { title: [[n]] });
			});
			return;
	}
}
function x(e, t) {
	var n;
	let r = e.getRecord(t);
	return r ? ((n = r.props.title) == null ? [] : n).map(([e]) => e).join(``) : ``;
}
function S(e, t) {
	x(e, t).trim() || e.dispatch((n) => {
		F.deleteBlock(e, n, t);
	});
}
function C({ simpleMode: o }) {
	let s = o$4(), { i18n: c } = useTranslation(), l = f$1(), [u$2, C] = (0, import_react.useState)(y);
	p(c), (0, import_react.useEffect)(() => t$1(s, (e) => {
		if (e.mode === `inline`) {
			var t;
			C({
				open: !0,
				blockId: e.blockId,
				isNew: e.isNew,
				initialLatex: (t = e.initialLatex) == null ? `` : t,
				mode: e.editTokenIndex === void 0 ? `inline-insert` : `inline-edit`,
				insertOffset: e.insertOffset,
				editTokenIndex: e.editTokenIndex
			});
		} else {
			let t = x(s, e.blockId);
			C({
				open: !0,
				blockId: e.blockId,
				isNew: e.isNew,
				initialLatex: t,
				mode: `block`
			});
		}
	}), [s]), a$6((e) => {
		var n;
		if (!e.isMobile || e.editor.readOnly || ((n = e.selection) == null ? void 0 : n.type) !== `block-range` || e.blockType !== e$5.Equation || !e.blockId) return null;
		let r = e.blockId;
		return { items: [{
			type: `icon-button`,
			key: `eq-edit`,
			icon: import_react.createElement(Pencil, { size: 14 }),
			label: l(`equation.toolbar.edit`, `编辑公式`),
			onClick: () => n$2(s, {
				blockId: r,
				isNew: !1
			})
		}] };
	}, [s, l]);
	let w = (0, import_react.useCallback)((e) => {
		if (!u$2.blockId) {
			C(y);
			return;
		}
		b(s, u$2, e), C(y);
	}, [
		s,
		u$2.blockId,
		u$2.mode,
		u$2.insertOffset,
		u$2.editTokenIndex,
		u$2
	]), T = (0, import_react.useCallback)(() => {
		u$2.mode === `block` && u$2.isNew && u$2.blockId && S(s, u$2.blockId), C(y);
	}, [
		s,
		u$2.isNew,
		u$2.blockId,
		u$2.mode
	]);
	return import_react.createElement(u, {
		open: u$2.open,
		initialLatex: u$2.initialLatex,
		onConfirm: w,
		onCancel: T,
		simpleMode: o
	});
}
var import_react, y;
//#endregion
__esmMin((() => {
	init_events();
	init_i18n();
	init_equation_modal();
	init_dist$1();
	init_lucide_react();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	y = {
		open: !1,
		blockId: ``,
		isNew: !1,
		initialLatex: ``,
		mode: `block`
	};
}))();
export { C as default };
