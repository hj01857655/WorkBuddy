import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { r as init_html, t as html_default } from "./html-B4Mttplz.js";
//#region ../../node_modules/.pnpm/@shikijs+langs@3.23.0/node_modules/@shikijs/langs/dist/html-derivative.mjs
var lang, html_derivative_default;
var init_html_derivative = __esmMin((() => {
	init_html();
	lang = Object.freeze(JSON.parse("{\"displayName\":\"HTML (Derivative)\",\"injections\":{\"R:text.html - (comment.block, text.html meta.embedded, meta.tag.*.*.html, meta.tag.*.*.*.html, meta.tag.*.*.*.*.html)\":{\"patterns\":[{\"match\":\"<\",\"name\":\"invalid.illegal.bad-angle-bracket.html\"}]}},\"name\":\"html-derivative\",\"patterns\":[{\"include\":\"text.html.basic#core-minus-invalid\"},{\"begin\":\"(</?)(\\\\w[^<>\\\\s]*)(?<!/)\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.definition.tag.begin.html\"},\"2\":{\"name\":\"entity.name.tag.html\"}},\"end\":\"((?: ?/)?>)\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.definition.tag.end.html\"}},\"name\":\"meta.tag.other.unrecognized.html.derivative\",\"patterns\":[{\"include\":\"text.html.basic#attribute\"}]}],\"scopeName\":\"text.html.derivative\",\"embeddedLangs\":[\"html\"]}"));
	html_derivative_default = [...html_default, lang];
}));
//#endregion
init_html_derivative();
export { html_derivative_default as default, init_html_derivative as t };
