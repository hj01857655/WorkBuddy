const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./vendor-mermaid-DU6uV3LW.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { act as init_esm$1, dlt as init_defineProperty, oct as ua, ult as _defineProperty, wlt as require_dayjs_min } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Dh as defaultSchema, Eh as rehypeSanitize, Ev as require_react, Jh as init_lodash, Kg as isNumber, Kh as require_react_dom, Ov as __vitePreload, Wg as isNil, j_ as cloneDeep, kv as init_preload_helper, mg as set, q_ as get, qh as require_classnames, wh as init_rehype_sanitize, xh as remarkBreaks, yh as init_remark_breaks } from "./lib-chat-ui-D8Ji0f8n.js";
import { BS as a$13, CS as o$13, FS as n$13, HS as e$14, JS as t$15, Jw as translate, KS as o$14, Kw as init_esm$2, Mw as p$3, Nw as q$3, Ow as i$11, QC as t$14, Qx as init_esm$3, US as g$1, VS as d$5, WS as i$10, YS as R$2, Yw as initI18n, dw as openUrl, iS as o$15, lw as init_esm$4, nS as r$10, qS as r$11, sS as E$1, xS as e$13, yS as O$1 } from "./smartsheet-context-BgZsCXEw.js";
import { $ as getEmptyImage, B as t$16, J as ReactMarkdown, K as n$14, Q as init_dist$2, X as ErrorBoundary, Z as init_react_error_boundary_esm, at as useDrop, dt as useDragDropManager, ft as DndProvider, i as init_esm$5, lt as useDrag, nt as init_dist$1, q as init_react_markdown, rt as init_dist, st as useDragLayer, tt as TouchBackend } from "./esm-DUoYP7ti.js";
import { D as remarkStringify, N as remarkParse, T as init_remark_stringify, a as init_rehype_katex, i as remarkGfm, j as init_remark_parse, n as remarkMath, o as rehypeKatex, r as init_remark_gfm, t as init_remark_math, x as unified, y as init_unified } from "./vendor-markdown-xvj5Od6x.js";
import { Q as init_common, Z as common_default } from "./vendor-highlight-Btrc-1T5.js";
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/slicedToArray-fb5b6502.js
function r$9(r) {
	if (Array.isArray(r)) return r;
}
function t$13(r, t) {
	(null == t || t > r.length) && (t = r.length);
	for (var n = 0, e = Array(t); n < t; n++) e[n] = r[n];
	return e;
}
function n$12(r, n) {
	if (r) {
		if ("string" == typeof r) return t$13(r, n);
		var e = {}.toString.call(r).slice(8, -1);
		return "Object" === e && r.constructor && (e = r.constructor.name), "Map" === e || "Set" === e ? Array.from(r) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? t$13(r, n) : void 0;
	}
}
function e$12() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function a$12(t, a) {
	return r$9(t) || function(r, t) {
		var n = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != n) {
			var e, a, o, l, i = [], u = !0, c = !1;
			try {
				if (o = (n = n.call(r)).next, 0 === t) {
					if (Object(n) !== n) return;
					u = !1;
				} else for (; !(u = (e = o.call(n)).done) && (i.push(e.value), i.length !== t); u = !0);
			} catch (r) {
				c = !0, a = r;
			} finally {
				try {
					if (!u && null != n.return && (l = n.return(), Object(l) !== l)) return;
				} finally {
					if (c) throw a;
				}
			}
			return i;
		}
	}(t, a) || n$12(t, a) || e$12();
}
var init_slicedToArray_fb5b6502 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/arrow_heavy_up_16.svg
var arrow_heavy_up_16_default;
var init_arrow_heavy_up_16 = __esmMin((() => {
	arrow_heavy_up_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8%205.375C8.16576%205.375%208.32473%205.44085%208.44194%205.55806L12.4419%209.55806L11.5581%2010.4419L8%206.88388L4.44194%2010.4419L3.55806%209.55806L7.55806%205.55806C7.67527%205.44085%207.83424%205.375%208%205.375Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/style-inject.es-3984fa0f.js
function e$11(e, t) {
	void 0 === t && (t = {});
	var d = t.insertAt;
	if (e && "undefined" != typeof document) {
		var n = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
		s.type = "text/css", "top" === d && n.firstChild ? n.insertBefore(s, n.firstChild) : n.appendChild(s), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(document.createTextNode(e));
	}
}
var init_style_inject_es_3984fa0f = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/collapse-card-v2/index.js
var import_react$18, m$5;
var init_collapse_card_v2 = __esmMin((() => {
	init_slicedToArray_fb5b6502();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_arrow_heavy_up_16();
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-common-collapse-card-content .ai-component-common-with-thinking-factory_thinking_content {\n  margin-top: 12px;\n}\n.ai-component-common-collapse-card-v2 {\n  display: flex;\n  flex-direction: column;\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-header {\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  cursor: pointer;\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 400;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  gap: 4px;\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-header-title {\n  flex-shrink: 0;\n  user-select: none;\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-header .ai-component-common-collapse-card-header-widget {\n  user-select: none;\n  transition: transform 0.2s ease;\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-header .ai-component-common-collapse-card-header-widget path {\n  fill: var(--text-medium, rgba(0, 0, 0, 0.48)) !important;\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-header .ai-component-common-collapse-card-header-widget--collapse {\n  transform: rotate(180deg);\n}\n.ai-component-common-collapse-card-v2 .ai-component-common-collapse-card-content {\n  transition: all 0.2s;\n  transition: max-height 0.2s ease-out;\n  overflow: hidden;\n}\n");
	m$5 = function(l) {
		var m = l.title, r = l.children, i = l.resetToAutoHeightCondition, s = l.handleMouseLeave, p = l.fullContent, d = void 0 !== p && p, h = l.expand, u = void 0 === h || h, g = l.tips, f = l.onExpandChange, v = (0, import_react$18.useRef)(null), w = a$12((0, import_react$18.useState)(null == u || u), 2), y = w[0], k = w[1], _ = a$12((0, import_react$18.useState)(u ? null : 0), 2), N = _[0], b = _[1], j = (0, import_react$18.useMemo)((function() {
			return null === N ? { height: "auto" } : { maxHeight: "".concat(N, "px") };
		}), [N, d]);
		return import_react$18.createElement("div", { className: "ai-component-common-collapse-card-v2" }, import_react$18.createElement("div", {
			className: "ai-component-common-collapse-card-header",
			onMouseDown: function() {
				var n = !y;
				v.current && (n ? null != i && i() ? b(null) : b(v.current.scrollHeight) : b(0), k(n), f?.(n));
			}
		}, import_react$18.createElement("span", { className: "ai-component-common-collapse-card-header-title" }, m), import_react$18.createElement("img", {
			src: arrow_heavy_up_16_default,
			width: 16,
			height: 16,
			className: "ai-component-common-collapse-card-header-widget ".concat(y ? "" : "ai-component-common-collapse-card-header-widget--collapse")
		}), g), import_react$18.createElement("div", {
			className: "ai-component-common-collapse-card-content",
			style: j,
			ref: v,
			onMouseLeave: s
		}, r));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/toPropertyKey-4d3c5a97.js
function t$12(r) {
	return t$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, t$12(r);
}
function r$8(r) {
	var o = function(r, o) {
		if ("object" != t$12(r) || !r) return r;
		var n = r[Symbol.toPrimitive];
		if (void 0 !== n) {
			var e = n.call(r, o || "default");
			if ("object" != t$12(e)) return e;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === o ? String : Number)(r);
	}(r, "string");
	return "symbol" == t$12(o) ? o : o + "";
}
var init_toPropertyKey_4d3c5a97 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/defineProperty-740d2c7a.js
function r$7(r, t, o) {
	return (t = r$8(t)) in r ? Object.defineProperty(r, t, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : r[t] = o, r;
}
var init_defineProperty_740d2c7a = __esmMin((() => {
	init_toPropertyKey_4d3c5a97();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/locales/index.js
var t$11, n$11, o$11, i$9;
var init_locales = __esmMin((() => {
	init_defineProperty_740d2c7a();
	t$11 = {
		operation: { "copy-success": "复制成功" },
		info: { "code-reasoning": "代码推理" },
		title: { untitled: "无标题" },
		"dynamic-tips-loading": {
			loading: "小助手正在处理你的请求",
			"loading-1": "正在加载数据中",
			"loading-2": "小助手正在理解你的问题",
			"loading-3": "正在为你量身定制智能体验",
			"loading-4": "小助手思考中",
			"loading-5": "小助手正在搜索资料",
			"loading-6": "小助手正在整理答案",
			"loading-7": "稍安勿躁，马上就好",
			"loading-8": "结果正在路上",
			"loading-9": "正在全力以赴处理问题"
		},
		"gen-table": "生成表格",
		markdown: {
			"generate-charts": "生成图表",
			"not-supported-generate-charts": "暂不支持此类图表生成",
			"generating-charts": "正在生成图表",
			insert: "插入",
			"hidden-code": "隐藏代码",
			"show-code": "显示代码",
			copy: "复制",
			"sheet-calculate-result-tips": "当前公式为数组公式，请插入单元格后查看结果。",
			"check-at-sheet": "请在表格中查看结果。",
			"reference-description": "相关原文",
			"reference-description-finding": "正在定位原文页码...",
			"transform-chart-error": "转换图表类型失败"
		},
		"with-thinking": {
			"bot-deepseek-thinking": "深度思考中...",
			"bot-deepseek-thinking-done": "深度思考已完成",
			duration: "用时"
		},
		unit: {
			hour: "小时",
			minute: "分钟",
			second: "秒"
		},
		feedback: {
			options: {
				like: "赞",
				dislike: "踩"
			},
			tips: {
				feedback: "向AI文档助手反馈",
				done: "感谢反馈",
				"unlike-success": "感谢反馈！小助手会努力进化～",
				"more-content": "请写下更多反馈、举报内容"
			},
			"group-title": {
				"feedback-title": "反馈问题",
				question: "针对问题",
				answer: "针对回答",
				format: "针对格式",
				content: "我要补充"
			},
			"button-text": {
				"context-error": "上下文错误",
				"comprehension-error": "理解错误",
				"unrecognized-error": "未识别问题中的错误",
				illegal: "违法有害",
				unprofessional: "内容不专业",
				"reasoning-error": "推理错误",
				"calculation-error": "计算错误",
				incomplete: "内容不完整",
				"factual-error": "事实错误",
				"format-error": "格式错误",
				"image-cost": "需画图但生成文本",
				"messy-code": "乱码错误",
				duplicate: "内容重复"
			}
		},
		outline: {
			"ppt-type": {
				cover: "封面",
				toc: "目录",
				back: "封底",
				chapter: "章节"
			},
			"text-separator": "下面是一份PPT大纲，供你参考："
		},
		auth: {
			title: "AI文档助手授权",
			scopes: {
				"view-edit-form-content": "查看、编辑收集表内容",
				"view-edit-smartsheet-content": "查看、编辑智能表格内容",
				"view-edit-smartcanvas-content": "查看、编辑智能文档内容",
				"view-edit-sheet-content": "查看、编辑在线表格内容",
				"view-edit-slide-content": "查看、编辑在线幻灯片内容",
				"view-edit-doc-content": "查看、编辑在线文档内容",
				"view-edit-pdf-content": "查看 PDF 内容",
				"view-edit-mind-content": "查看、编辑思维导图内容",
				"view-edit-local-doc-content": "查看、编辑本地Word内容",
				"view-edit-local-pdf-content": "查看、编辑本地PDF内容",
				"view-edit-local-sheet-content": "查看、编辑本地Excel内容",
				"view-edit-local-slide-content": "查看、编辑本地PPT内容",
				"view-edit-voice-notes-content": "查看、编辑速记内容",
				"view-edit-image-content": "查看、编辑图片、照片用于AI处理"
			},
			desc: {
				purpose: "授权「AI文档助手」使用你的腾讯文档权限。",
				"local-file-purpose": "授权「AI文档助手」使用你的本地文档权限。",
				tips: "这么做可能会将你的敏感信息提供给此网站或应用，你可以随时在「隐私-AI文档助手开关」查看或关闭访问权限。",
				"local-file-tips": "这么做可能会将你的敏感信息提供给此网站或应用。",
				"img-tips": "欢迎使用图片高级处理能力，我们为你提供涂抹消除、抠图等多种功能，请授权【AI文档助手】将你上传的图片进行AI处理。这么做可能将你的敏感信息提供给此网站或应用，你可以随时在【隐私-AI图片处理开关】查看或关闭访问权限。"
			},
			policy: {
				desc: "我已阅读并同意腾讯文档的",
				and: "和",
				"service-agreement": "服务协议",
				"privacy-agreement": "隐私政策"
			},
			options: { agree: "同意" },
			panel: {
				title: "授权",
				desc: "这么做可能会将你的敏感信息提供给此网站或应用，我们会采用严格措施确保其安全，不会用于模型训练。",
				"list-title": "授权AI文档助手使用你的腾讯文档权限",
				"list-desc": "你可以随时在隐私>AI文档助手开关查看或关闭访问权限。",
				"scope-desc": "请你知悉，启用该功能后，AI文档助手将检索你的文档（包括但不限于你创建、有编辑或查看权限），并依据你输入的指令生成特定内容，AI文档助手处理的文档中可能包含个人信息（含敏感个人信息）或其他数据，使用该功能意味着你理解并授权该数据处理行为。我们仅依据你的指示处理有关数据，请你注意不要侵犯他人的隐私与个人信息权益。若你希望AI文档助手对上述权限文档进行搜索并生成内容，你应保证你对其所包含的任何内容的任何形式使用均已取得所有必要的合法权利。",
				button: "同意并继续"
			}
		}
	};
	n$11 = {
		operation: { "copy-success": "複製成功" },
		info: { "code-reasoning": "代碼推理" },
		title: { untitled: "無標題" },
		"dynamic-tips-loading": {
			loading: "小助手正在處理你的請求",
			"loading-1": "正在加載數據中",
			"loading-2": "小助手正在理解你的問題",
			"loading-3": "正在為你量身定制智能體驗",
			"loading-4": "小助手思考中",
			"loading-5": "小助手正在搜索資料",
			"loading-6": "小助手正在整理答案",
			"loading-7": "稍安勿躁，馬上就好",
			"loading-8": "結果正在路上",
			"loading-9": "正在全力以赴處理問題"
		},
		reference: {
			"reference-count": "共 {{count}} 篇參考資料",
			"reference-count-full": "共參考 {{count}} 篇參考資料",
			saveAsDoc: "保存為文檔"
		},
		"gen-table": "生成表格",
		markdown: {
			"generate-charts": "生成圖表",
			"not-supported-generate-charts": "暫不支持此類圖表生成",
			"generating-charts": "正在生成圖表",
			insert: "插入",
			"hidden-code": "隱藏代碼",
			"show-code": "顯示代碼",
			copy: "複製",
			"sheet-calculate-result-tips": "當前公式為數組公式，請插入單元格後查看結果。",
			"check-at-sheet": "請在表格中查看結果。",
			"reference-description": "相關原文",
			"reference-description-finding": "正在定位原文頁碼...",
			"transform-chart-error": "轉換圖表類型失敗"
		},
		"with-thinking": {
			"bot-deepseek-thinking": "深度思考中...",
			"bot-deepseek-thinking-done": "深度思考已完成",
			duration: "用時"
		},
		unit: {
			hour: "小時",
			minute: "分鐘",
			second: "秒"
		},
		feedback: {
			options: {
				like: "讚",
				dislike: "踩"
			},
			tips: {
				feedback: "嚮AI文档助手反饋",
				done: "感謝反饋",
				"unlike-success": "感謝反饋！小助手會努力進化～",
				"more-content": "請寫下更多反饋／舉報內容"
			},
			"group-title": {
				"feedback-title": "反饋問題",
				question: "針對問題",
				answer: "針對回答",
				format: "針對格式",
				content: "我要補充"
			},
			"button-text": {
				"context-error": "上下文錯誤",
				"comprehension-error": "理解錯誤",
				"unrecognized-error": "未識別問題中的錯誤",
				illegal: "違法有害",
				unprofessional: "內容不專業",
				"reasoning-error": "推理錯誤",
				"calculation-error": "計算錯誤",
				incomplete: "內容不完整",
				"factual-error": "事實錯誤",
				"format-error": "格式錯誤",
				"image-cost": "需畫圖但生成文本",
				"messy-code": "亂碼錯誤",
				duplicate: "內容重複"
			}
		},
		outline: {
			"ppt-type": {
				cover: "封面",
				toc: "目錄",
				back: "封底",
				chapter: "章節"
			},
			"text-separator": "下面是一份PPT大綱，供你參考："
		},
		auth: {
			title: "AI文档助手授權",
			scopes: {
				"view-edit-form-content": "查看、編輯收集表內容",
				"view-edit-smartsheet-content": "查看、編輯智慧表格內容",
				"view-edit-smartcanvas-content": "查看、編輯智能文檔內容",
				"view-edit-sheet-content": "查看、編輯在線表格內容",
				"view-edit-slide-content": "查看、編輯在線幻燈片內容",
				"view-edit-doc-content": "查看、編輯在線文檔內容",
				"view-edit-pdf-content": "查看 PDF 內容",
				"view-edit-mind-content": "查看、編輯思維導圖內容",
				"view-edit-local-doc-content": "檢視、編輯本機 Word 內容",
				"view-edit-local-pdf-content": "檢視、編輯本機 PDF 內容",
				"view-edit-local-sheet-content": "檢視、編輯本機 Excel 內容",
				"view-edit-local-slide-content": "檢視、編輯本機 PPT 內容",
				"view-edit-voice-notes-content": "查看、編輯速記內容",
				"view-edit-image-content": "檢視、編輯圖片、相片以進行 AI 處理"
			},
			desc: {
				purpose: "授權「騰訊文檔AI文档助手」使用您的騰訊文檔權限。",
				"local-file-purpose": "授權「AI 文件助手」使用你的本機文件權限。",
				tips: "這樣做可能會將您的敏感信息提供給此網站或應用，您可以隨時在「隱私-AI文档助手開關」查看或關閉訪問權限。",
				"local-file-tips": "這麼做可能會將你的敏感資訊提供給此網站或應用程式。",
				"img-tips": "歡迎使用圖片高級處理功能，我們為你提供塗抹消除、去背等多項功能，請授權【AI文件助手】對你上傳的圖片進行 AI 處理。這樣做可能會將你的敏感信息提供給該網站或應用程式，你可隨時在【隱私設置 - AI 圖片處理開關】中查看或關閉訪問權限。"
			},
			policy: {
				desc: "我已閱讀並同意騰訊文檔的",
				and: "和",
				"service-agreement": "服務協議",
				"privacy-agreement": "隱私政策"
			},
			options: { agree: "同意" },
			panel: {
				title: "授權",
				desc: "這樣做可能會將您的敏感信息提供給此網站或應用，我們會採用嚴格措施確保其安全，不會用於模型訓練。",
				"list-title": "授權AI文檔助手使用你的騰訊文檔權限",
				"list-desc": "妳的數據僅用於定制妳的內容，我們採用嚴格措施確保其安全。",
				"scope-desc": "請你知悉，啓用該功能後，AI文檔助手將檢索你的文檔（包括但不限於你創建、有編輯或查看權限），並依據你輸入的指令生成特定內容，AI文檔助手處理的文檔中可能包含個人信息（含敏感個人信息）或其他數據，使用該功能意味着你理解並授權該數據處理行爲。我們僅依據你的指示處理有關數據，請你注意不要侵犯他人的隱私與個人信息權益。若你希望AI文檔助手對上述權限文檔進行搜索並生成內容，你應保證你對其所包含的任何內容的任何形式使用均已取得所有必要的合法權利。",
				button: "同意並繼續"
			}
		}
	};
	o$11 = "ai-component-common";
	i$9 = {
		"en-US": r$7({}, o$11, {
			operation: { "copy-success": "Copied successfully" },
			info: { "code-reasoning": "Code reasoning" },
			title: { untitled: "Untitled" },
			"dynamic-tips-loading": {
				loading: "The assistant is processing your request",
				"loading-1": "Loading data",
				"loading-2": "The assistant is understanding your question",
				"loading-3": "Customizing the intelligent experience for you",
				"loading-4": "The assistant is thinking",
				"loading-5": "The assistant is searching for information",
				"loading-6": "The assistant is organizing the answers.",
				"loading-7": "Please wait a moment, it's coming soon.",
				"loading-8": "The result is on the way",
				"loading-9": "The assistant is working hard to process the problem"
			},
			reference: {
				"reference-count": "Total {{count}} references",
				"reference-count-full": "Total {{count}} references",
				saveAsDoc: "Save as document"
			},
			"gen-table": "Generate table",
			markdown: {
				"generate-charts ": "Generate Charts",
				"not-supported-generate-charts": "This type of chart generation is not supported for the time being",
				"generating-charts": "Charts are being generated",
				insert: "Insert",
				"hidden-code": "Hidden",
				"show-code": "Show",
				copy: "Copy",
				"sheet-calculate-result-tips": "The formula is an array formula, please insert a cell to view the result.",
				"check-at-sheet": "Please check the result at the sheet.",
				"reference-description": "Related original",
				"reference-description-finding": "Finding the original page...",
				"transform-chart-error": "Transform chart type failed"
			},
			"with-thinking": {
				"bot-deepseek-thinking": "Deep thinking...",
				"bot-deepseek-thinking-done": "Deep thinking done",
				duration: "Duration"
			},
			unit: {
				hour: "hours",
				minute: "minutes",
				second: "seconds"
			},
			feedback: {
				options: {
					like: "Like",
					dislike: "Dislike"
				},
				tips: {
					feedback: "Feedback to SA",
					done: "Thank you",
					"unlike-success": "Thanks for the feedback! Smart assistant will work hard to evolve~",
					"more-content": "Please write down more feedback or report content"
				},
				"group-title": {
					"feedback-title": "Feedback",
					question: "Question",
					answer: "Answer",
					format: "Format",
					content: "Feedback content"
				},
				"button-text": {
					"context-error": "Context error",
					"comprehension-error": "Understanding error",
					"unrecognized-error": "Unrecognized error in the problem",
					illegal: "Illegal and harmful",
					unprofessional: "Unprofessional content",
					"reasoning-error": "Reasoning error",
					"calculation-error": "Calculation error",
					incomplete: "Incomplete content",
					"factual-error": "Factual error",
					"format-error": "Format error",
					"image-cost": "Need to draw but generate text",
					"messy-code": "Messy code error",
					duplicate: "Duplicate content"
				}
			},
			outline: {
				"ppt-type": {
					cover: "Cover",
					toc: "Table of Contents",
					back: "Back",
					chapter: "Chapter"
				},
				"text-separator": "Here is a PPT outline for your reference:"
			},
			auth: {
				title: "Smart Assistant Authorization",
				scopes: {
					"view-edit-form-content": "View and edit form content",
					"view-edit-smartsheet-content": "View and edit smart sheet content",
					"view-edit-smartcanvas-content": "View and edit Smart Canvas content",
					"view-edit-sheet-content": "View and edit online sheet content",
					"view-edit-slide-content": "View and edit online slide content",
					"view-edit-doc-content": "View and edit online document content",
					"view-edit-pdf-content": "View PDF content",
					"view-edit-mind-content": "View and edit online mind map content",
					"view-edit-local-doc-content": "View and edit local Word content",
					"view-edit-local-pdf-content": "View and edit local PDF content",
					"view-edit-local-sheet-content": "View and edit local Excel content",
					"view-edit-local-slide-content": "View and edit local PPT content",
					"view-edit-voice-notes-content": "View and edit voice notes content",
					"view-edit-image-content": "View and edit images/photos for AI processing"
				},
				desc: {
					purpose: "Authorize Tencent Docs Smart Assistant to access your Tencent Docs permissions.",
					"local-file-purpose": "Authorize 「AI Document Assistant」 to use your local document permissions.",
					tips: "This may provide sensitive information to this website or application. You can view or revoke access permissions at any time in 'Privacy - Smart Assistant Switch'.",
					"local-file-tips": "Doing so may provide your sensitive information to this website or application.",
					"img-tips": "Welcome to advanced image processing. We offer features like object removal and background removal. Please authorize [AI Document Assistant] to process the images you upload using AI. This may expose your sensitive information to this website or app. You can view or disable the permission anytime in [Privacy - AI Image Processing Settings]."
				},
				policy: {
					desc: "I have read and agree to the ",
					and: "and",
					"service-agreement": "Service Agreement ",
					"privacy-agreement": "Privacy Policy"
				},
				options: { agree: "Agree" },
				panel: {
					title: "Authorize",
					desc: "This may provide sensitive information to this website or application. We use strict measures to ensure its security, and it will not be used for model training.",
					"list-title": "Authorize 'Intelligent Assistant' to view/edit your Tencent documents",
					"list-desc": "Your data is only used to customize your content, and we use strict measures to ensure its security.",
					"scope-desc": "Please be informed that after enabling this function, the AI Document Assistant will retrieve your documents (including but not limited to those created by you, with editing or viewing permissions), and generate specific content based on the instructions you input. The documents processed by the AI Document Assistant may contain personal information (including sensitive personal information) or other data. Using this function means that you understand and authorize the data processing behavior. We only process the relevant data in accordance with your instructions. Please be careful not to infringe upon others' privacy and personal information rights. If you wish the AI Document assistant to search for and generate content for the above-mentioned permission documents, you should ensure that you have obtained all necessary legal rights for any form of use of any content contained therein.",
					button: "Agree and Continue"
				}
			}
		}),
		"zh-CN": r$7({}, o$11, t$11),
		"zh-HK": r$7({}, o$11, n$11)
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/index-07e2ccf4.js
function c$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		r && (n = n.filter((function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		}))), t.push.apply(t, n);
	}
	return t;
}
function i$8(r) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? c$9(Object(n), !0).forEach((function(t) {
			r$7(r, t, n[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(n)) : c$9(Object(n)).forEach((function(e) {
			Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(n, e));
		}));
	}
	return r;
}
var s$5;
var init_index_07e2ccf4 = __esmMin((() => {
	init_defineProperty_740d2c7a();
	init_locales();
	init_esm$2();
	initI18n({
		resources: i$9,
		ns: o$11
	});
	s$5 = function(e, r) {
		return translate(e, i$8(i$8({}, r), {}, { ns: o$11 }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/index-9dc8fb5d.js
function eE(E, e) {
	var _ = Object.keys(E);
	if (Object.getOwnPropertySymbols) {
		var t = Object.getOwnPropertySymbols(E);
		e && (t = t.filter((function(e) {
			return Object.getOwnPropertyDescriptor(E, e).enumerable;
		}))), _.push.apply(_, t);
	}
	return _;
}
function _E(e) {
	for (var _ = 1; _ < arguments.length; _++) {
		var t = null != arguments[_] ? arguments[_] : {};
		_ % 2 ? eE(Object(t), !0).forEach((function(_) {
			_defineProperty(e, _, t[_]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : eE(Object(t)).forEach((function(E) {
			Object.defineProperty(e, E, Object.getOwnPropertyDescriptor(t, E));
		}));
	}
	return e;
}
var e$9, _, t$10, S$1, n$10, T$2, A$1, R$1, D$1, r$6, C$2, a$10, I, O, N, o$10, i$7, M, c$8, P$1, L, d$4, u$5, l$6, s$4, U$1, m$4, F, f$2, H$1, p$2, W$2, B, g, k, h$3, G$2, K$1, b$1, y$2, w$1, V$1, Y$1, v$1, x$2, X$1, j, Q$1, q$2, Z$1, J$1, z, $$1, EE;
var init_index_9dc8fb5d = __esmMin((() => {
	init_defineProperty();
	(function(E) {
		E.SHEET_AI_DATA_QA = "sheet_ai_data_qa", E.SHEET_AI_GENERATE_CHART = "sheet_ai_generate_chart", E.SLIDE_AI_GENERATE_NOTES = "slide_ai_generate_notes";
	})(_ || (_ = {})), function(E) {
		E.COURSE_SCHEDULE = "CourseSchedule", E.SCORE = "Score", E.NAMELIST = "NameList";
	}(t$10 || (t$10 = {})), function(E) {
		E.TENCENT_DOCS = "tencentdocs", E.TENCENT_QQ = "tencentqq", E.TENCENT_WENKU = "tencentwenku", E.TENCENT_SPACE = "tencentspace", E.TENCENT_QQ_MINI = "tencentqqmini";
	}(S$1 || (S$1 = {})), function(E) {
		E[E.CHAT_BUBBLE = 1] = "CHAT_BUBBLE", E[E.CHAT_INPUT = 2] = "CHAT_INPUT";
	}(n$10 || (n$10 = {})), function(E) {
		E[E.SEND = 1] = "SEND", E[E.PASTE = 2] = "PASTE", E[E.FILE = 3] = "FILE", E[E.GET_RECOMMEND_COMMAND = 4] = "GET_RECOMMEND_COMMAND";
	}(T$2 || (T$2 = {})), function(E) {
		E[E.NORMAL = 0] = "NORMAL", E[E.INSERT_BELOW = 1] = "INSERT_BELOW", E[E.REPLACE_SELECTION = 2] = "REPLACE_SELECTION";
	}(A$1 || (A$1 = {})), function(E) {
		E[E.SOURCE_UNSPECIFIED = 0] = "SOURCE_UNSPECIFIED", E[E.SOURCE_SMARTCANVAS = 1] = "SOURCE_SMARTCANVAS", E[E.SOURCE_DOC = 2] = "SOURCE_DOC", E[E.SOURCE_SHEET = 3] = "SOURCE_SHEET", E[E.SOURCE_SLIDE = 4] = "SOURCE_SLIDE", E[E.SOURCE_PDF = 5] = "SOURCE_PDF", E[E.SOURCE_RESUME = 6] = "SOURCE_RESUME", E[E.SOURCE_MIND = 7] = "SOURCE_MIND", E[E.SOURCE_DESKTOP = 8] = "SOURCE_DESKTOP", E[E.SOURCE_FORM = 9] = "SOURCE_FORM", E[E.SOURCE_FLOWCHART = 10] = "SOURCE_FLOWCHART", E[E.SOURCE_SMARTSHEET = 11] = "SOURCE_SMARTSHEET", E[E.SOURCE_BOARD = 12] = "SOURCE_BOARD", E[E.SOURCE_MARKDOWN = 13] = "SOURCE_MARKDOWN", E[E.SOURCE_IMAGE = 14] = "SOURCE_IMAGE", E[E.SOURCE_SPACE = 99] = "SOURCE_SPACE", E[E.SOURCE_SPACE_FOLDER = 100] = "SOURCE_SPACE_FOLDER";
	}(R$1 || (R$1 = {})), function(E) {
		E.FORM = "form", E.DOC = "doc", E.SHEET = "sheet", E.SLIDE = "slide", E.PDF = "pdf", E.MIND = "mind", E.FLOWCHART = "flowchart", E.SMARTCANVAS = "smartcanvas", E.SMARTSHEET = "smartsheet", E.MARKDOWN = "markdown";
	}(D$1 || (D$1 = {})), function(E) {
		E[E.FULLSCREEN = 0] = "FULLSCREEN", E[E.NON_FULLSCREEN = 1] = "NON_FULLSCREEN";
	}(r$6 || (r$6 = {})), function(E) {
		E.DESKTOP = "desktop", E.DOC = "doc", E.SMARTCANVAS = "smartcanvas", E.SHEET = "sheet", E.SMARTSHEET = "smartsheet", E.SLIDE = "slide", E.PDF = "pdf", E.FORM = "form", E.MIND = "mind", E.FLOWCHART = "flowchart", E.RESUME = "resume", E.MARKDOWN = "markdown", E.IMAGE = "image", E.SPACE = "space", E.BOARD = "board";
	}(C$2 || (C$2 = {})), function(E) {
		E[E.INSERT = 0] = "INSERT", E[E.REPLACE = 1] = "REPLACE", E[E.INSERT_BELOW = 2] = "INSERT_BELOW";
	}(a$10 || (a$10 = {})), function(E) {
		E.pageNum = "pageNum", E.templateStyle = "templateStyle", E.templateColor = "templateColor", E.writingStyle = "writingStyle", E.imageGeneration = "imageGeneration", E.generationMode = "genMode";
	}(I || (I = {})), function(E) {
		E.SYSTEM = "system", E.BOT = "assistant", E.USER = "user";
	}(O || (O = {})), function(E) {
		E[E.CREATE_FROM_MATERIALS = 0] = "CREATE_FROM_MATERIALS", E[E.VIEW_RESULTS = 1] = "VIEW_RESULTS", E[E.REGENERATE = 2] = "REGENERATE";
	}(N || (N = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.CREATE_SLIDE = 1] = "CREATE_SLIDE", E[E.CREATE_DOC = 2] = "CREATE_DOC", E[E.CREATE_SHEET = 3] = "CREATE_SHEET", E[E.CREATE_FORM = 4] = "CREATE_FORM", E[E.CREATE_MINDMAP = 5] = "CREATE_MINDMAP", E[E.CREATE_SMART_CANVAS = 6] = "CREATE_SMART_CANVAS", E[E.CREATE_SMART_SHEET = 7] = "CREATE_SMART_SHEET", E[E.CREATE_RESUME = 8] = "CREATE_RESUME", E[E.CREATE_FLOW_CHART = 9] = "CREATE_FLOW_CHART", E[E.CREATE_PDF = 10] = "CREATE_PDF", E[E.SHEET_ROLLBACK = 11] = "SHEET_ROLLBACK", E[E.SHEET_CONFIRM = 12] = "SHEET_CONFIRM", E[E.SHEET_INSERT_FORMULA = 13] = "SHEET_INSERT_FORMULA", E[E.INSERT_CHART = 14] = "INSERT_CHART", E[E.INSERT_CONTENT = 16] = "INSERT_CONTENT", E[E.APPEND_NEW_CONTENT = 17] = "APPEND_NEW_CONTENT", E[E.MIND_ADD_CHILD_NODE = 18] = "MIND_ADD_CHILD_NODE", E[E.MIND_UPDATE_TITLE = 19] = "MIND_UPDATE_TITLE", E[E.MIND_INSERT_AS_DETACHED = 20] = "MIND_INSERT_AS_DETACHED", E[E.MIND_INSERT_TO_FILE = 21] = "MIND_INSERT_TO_FILE", E[E.GENERATE_SLIDE = 22] = "GENERATE_SLIDE", E[E.APPEND_REMARK = 23] = "APPEND_REMARK", E[E.INSERT_SHEET = 24] = "INSERT_SHEET", E[E.READ_IN_DEPTH = 25] = "READ_IN_DEPTH", E[E.PREVIEW = 26] = "PREVIEW", E[E.CREATE_MARKDOWN = 27] = "CREATE_MARKDOWN";
	}(o$10 || (o$10 = {})), function(E) {
		E.LOADING = "loading", E.SUCCESS = "success", E.NOMORE = "nomore", E.ERROR = "error";
	}(i$7 || (i$7 = {})), function(E) {
		E[E.START = -1] = "START", E[E.IN_PROGRESS = 0] = "IN_PROGRESS", E[E.FINISH = 1] = "FINISH", E[E.ERROR = 2] = "ERROR", E[E.STOP = 3] = "STOP", E[E.IN_THINKING = 4] = "IN_THINKING";
	}(M || (M = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.TEXT_MARKDOWN = 1] = "TEXT_MARKDOWN", E[E.DOCUMENT = 2] = "DOCUMENT", E[E.TASK_CARD = 4] = "TASK_CARD", E[E.SLIDE_TEMPLATES = 5] = "SLIDE_TEMPLATES", E[E.RECOMMENDED_QUESTION = 6] = "RECOMMENDED_QUESTION", E[E.RECOMMENDED_COMMAND = 7] = "RECOMMENDED_COMMAND", E[E.RECOMMENDED_SUMARRY = 8] = "RECOMMENDED_SUMARRY", E[E.AUTH_TIP = 9] = "AUTH_TIP", E[E.MINIPROGRAM_IMPORT_DOC = 10] = "MINIPROGRAM_IMPORT_DOC", E[E.TEXT_SELECTION = 11] = "TEXT_SELECTION", E[E.RESUME_WELCOME = 12] = "RESUME_WELCOME";
	}(c$8 || (c$8 = {})), function(E) {
		E[E.HISTORY_MESSAGE = 0] = "HISTORY_MESSAGE", E[E.COMMERCIALIZE_NOTIFICATION = 1] = "COMMERCIALIZE_NOTIFICATION";
	}(P$1 || (P$1 = {})), function(E) {
		E[E.LINK = -1] = "LINK", E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.DOC = 1] = "DOC", E[E.SHEET = 2] = "SHEET", E[E.SLIDE = 3] = "SLIDE", E[E.FORM = 4] = "FORM", E[E.MINDMAP = 5] = "MINDMAP", E[E.SMART_CANVAS = 6] = "SMART_CANVAS", E[E.SMART_SHEET = 7] = "SMART_SHEET", E[E.RESUME = 8] = "RESUME", E[E.FLOW_CHART = 9] = "FLOW_CHART", E[E.PDF = 10] = "PDF", E[E.IMAGE = 11] = "IMAGE", E[E.FOLDER = 12] = "FOLDER", E[E.MARKDOWN = 13] = "MARKDOWN", E[E.WIKI = 20] = "WIKI";
	}(L || (L = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.LIKE = 1] = "LIKE", E[E.DISLIKE = 2] = "DISLIKE";
	}(d$4 || (d$4 = {})), function(E) {
		E.PLAN = "plan", E.RECALL = "recall", E.CITING = "citing";
	}(u$5 || (u$5 = {})), function(E) {
		E.WECHAT = "wechat", E.DOCS = "docs", E.WENKU = "wenku", E.LINK = "link";
	}(l$6 || (l$6 = {})), function(E) {
		E.messageStatus = "messageStatus", E.renderId = "renderId", E.customDescription = "customDescription";
	}(s$4 || (s$4 = {})), function(E) {
		E[E.READ_IN_DEPTH_MODE_NORMAL = 0] = "READ_IN_DEPTH_MODE_NORMAL", E[E.READ_IN_DEPTH_MODE_PAPER = 1] = "READ_IN_DEPTH_MODE_PAPER", E[E.READ_IN_DEPTH_MODE_RESEARCH = 2] = "READ_IN_DEPTH_MODE_RESEARCH", E[E.READ_IN_DEPTH_MODE_FINANCIAL_REPORT = 3] = "READ_IN_DEPTH_MODE_FINANCIAL_REPORT", E[E.READ_IN_DEPTH_MODE_BOOK = 4] = "READ_IN_DEPTH_MODE_BOOK", E[E.READ_IN_DEPTH_MODE_POLICY = 5] = "READ_IN_DEPTH_MODE_POLICY", E[E.READ_IN_DEPTH_MODE_MIND = 6] = "READ_IN_DEPTH_MODE_MIND", E[E.READ_IN_DEPTH_MODE_SUMMARY = 7] = "READ_IN_DEPTH_MODE_SUMMARY", E[E.READ_IN_DEPTH = 8] = "READ_IN_DEPTH";
	}(U$1 || (U$1 = {})), function(E) {
		E.UPLOADING = "uploading", E.UPLOAD_SUCCESS = "upload_success", E.UPLOAD_FAILED = "upload_failed";
	}(m$4 || (m$4 = {})), function(E) {
		E.PREPARE = "prepare", E.EMBEDDING = "embedding", E.EMBEDDING_SUCCESS = "embedding_success", E.EMBEDDING_FAILED = "embedding_failed";
	}(F || (F = {})), function(E) {
		E.UPLOAD = "Upload", E.IMPORT = "Import";
	}(f$2 || (f$2 = {})), F.PREPARE, F.EMBEDDING, m$4.UPLOADING, F.EMBEDDING_SUCCESS, m$4.UPLOAD_SUCCESS, F.EMBEDDING_FAILED, m$4.UPLOAD_FAILED, F.EMBEDDING_SUCCESS, m$4.UPLOAD_SUCCESS, F.EMBEDDING_FAILED, m$4.UPLOAD_FAILED, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$9 = {}, L.DOC, "文档"), L.SHEET, "表格"), L.SLIDE, "幻灯片"), L.FORM, "收集表"), L.MINDMAP, "思维导图"), L.SMART_CANVAS, "智能文档"), L.SMART_SHEET, "智能表格"), L.RESUME, "简历"), L.FLOW_CHART, "流程图"), L.PDF, "PDF"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$9, L.IMAGE, "图片"), L.FOLDER, "文件夹"), L.LINK, "链接"), L.MARKDOWN, "Markdown"), L.WIKI, "空间"), function(E) {
		E.SLEEP = "sleep", E.STAND_BY = "standBy", E.WRITING = "writing", E.INPUT_COMPLETE = "inputComplete", E.EDIT_COMPLETE = "editComplete";
	}(H$1 || (H$1 = {})), function(E) {
		E.IDLE = "idle", E.WRITING = "writing", E.RE_WRITING = "reWriting", E.CONTINUE_WRITING = "continueWriting", E.STOPPED = "stopped";
	}(p$2 || (p$2 = {})), function(E) {
		E.IN_CONTEXT = "inContext", E.ON_BOARD = "onBoard";
	}(W$2 || (W$2 = {})), function(E) {
		E[E.TBD = -1] = "TBD", E[E.LIKE = 0] = "LIKE", E[E.UNLIKE = 1] = "UNLIKE";
	}(B || (B = {})), function(E) {
		E.WRITE = "write", E.WRITE_FROM_EMPTY = "writeFromEmpty", E.SELECTION = "selection", E.COMPLETED = "completed";
	}(g || (g = {})), function(E) {
		E.TO_SLEEP = "toSleep", E.TO_STAND_BY = "toStandBy", E.TO_WRITING = "toWriting", E.TO_EDIT_COMPLETE = "toEditComplete", E.TO_INPUT_COMPLETE = "toInputComplete", E.BACK_TO_STAND_BY = "backToStandBy", E.AI_BE_WAKE = "aiBeWake";
	}(k || (k = {})), (h$3 || (h$3 = {})).POLISHING = "polishing", (G$2 || (G$2 = {})).AIModalWrite = "AIModalWrite", function(E) {
		E.SNAPSHOT_EXTRACT_TEXT = "snapshot_extract_text", E.WORDS_EXPLAIN = "words_explain", E.WORDS_TRANSLATE = "words_translate";
	}(K$1 || (K$1 = {})), function(E) {
		E.CREATE_SLIDE = "createSlide", E.DEFAULT = "default";
	}(b$1 || (b$1 = {})), function(E) {
		E[E.PaymentByPrice = 0] = "PaymentByPrice", E[E.LimitedFree = 1] = "LimitedFree", E[E.FreeForVIP = 2] = "FreeForVIP", E[E.NeedVIPAndPay = 3] = "NeedVIPAndPay", E[E.Free = 4] = "Free", E[E.FreeForSuperVIP = 5] = "FreeForSuperVIP", E[E.ChargedByUsage = 6] = "ChargedByUsage", E[E.InAppPurchased = 7] = "InAppPurchased", E[E.NoRequirementType = 10] = "NoRequirementType";
	}(y$2 || (y$2 = {})), function(E) {
		E.TEXT_INPUT = "text", E.OPTION_INPUT = "option", E.TEXT_LABEL = "label", E.TEXT_INPUT_VALUE = "text-input-value";
	}(w$1 || (w$1 = {})), function(E) {
		E.SUMMARY = "summary", E.DEEPREAD = "deepread", E.MINDMAP = "mindMap", E.FILEQA = "fileQa", E.CHAT = "chat", E.BEAUTIFY = "beautify";
	}(V$1 || (V$1 = {})), function(E) {
		E[E.SidebarRead = 1] = "SidebarRead", E[E.AIWriting = 2] = "AIWriting", E[E.GeneratePPT = 3] = "GeneratePPT", E[E.GenerateMindMap = 4] = "GenerateMindMap", E[E.GeneratePageModal = 5] = "GeneratePageModal", E[E.SidebarNote = 6] = "SidebarNote", E[E.Rating = 7] = "Rating", E[E.FullReview = 8] = "FullReview", E[E.ChangeFont = 9] = "ChangeFont", E[E.ChangeThemeColor = 10] = "ChangeThemeColor", E[E.ChangeTemplate = 11] = "ChangeTemplate", E[E.DataQA = 12] = "DataQA", E[E.GenerateChart = 13] = "GenerateChart", E[E.Beautify = 14] = "Beautify";
	}(Y$1 || (Y$1 = {})), function(E) {
		E.MARKDOWN_SEARCH_REF = "tdocs-ai-search-ref", E.MARKDOWN_SEARCH_REF_TEXT = "tdocs-ai-search-ref-text", E.MARKDOWN_SEARCH_REF_CITATIOIN = "tdocs-ai-search-ref-citation";
	}(v$1 || (v$1 = {})), function(E) {
		E.MARKDOWN_LINK_CARD = "tdocs-link-card", E.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER = "tdocs-excel-chart-image-exchanger";
	}(x$2 || (x$2 = {})), (X$1 || (X$1 = {})).MARKDOWN_TABLE_PREVIEW = "tdocs-table-preview", function(E) {
		E[E.PBDEFAULT = 0] = "PBDEFAULT", E[E.Area = 1] = "Area", E[E.Area3D = 2] = "Area3D", E[E.Line = 3] = "Line", E[E.Line3D = 4] = "Line3D", E[E.HighLowCloseStock = 5] = "HighLowCloseStock", E[E.Radar = 6] = "Radar", E[E.Scatter = 7] = "Scatter", E[E.Pie = 8] = "Pie", E[E.Pie3D = 9] = "Pie3D", E[E.Doughnut = 10] = "Doughnut", E[E.ClusteredBar = 11] = "ClusteredBar", E[E.ClusteredBar3D = 12] = "ClusteredBar3D", E[E.ClusteredColumn = 13] = "ClusteredColumn", E[E.ClusteredColumn3D = 14] = "ClusteredColumn3D", E[E.PieOfPie = 15] = "PieOfPie", E[E.Surface = 16] = "Surface", E[E.Surface3D = 17] = "Surface3D", E[E.Bubble = 18] = "Bubble", E[E.CustomCombo = 19] = "CustomCombo", E[E.BoxWhisker = 20] = "BoxWhisker", E[E.Column3D = 21] = "Column3D", E[E.Funnel = 22] = "Funnel", E[E.ParetoLine = 23] = "ParetoLine", E[E.RegionMap = 24] = "RegionMap", E[E.Sunburst = 25] = "Sunburst", E[E.Treemap = 26] = "Treemap", E[E.Waterfall = 27] = "Waterfall", E[E.WordCloud = 28] = "WordCloud", E[E.StackedBar = 29] = "StackedBar", E[E.PercentStackedBar = 30] = "PercentStackedBar", E[E.StackedBar3D = 31] = "StackedBar3D", E[E.PercentStackedBar3D = 32] = "PercentStackedBar3D", E[E.StackedColumn = 33] = "StackedColumn", E[E.PercentStackedColumn = 34] = "PercentStackedColumn", E[E.StackedColumn3D = 35] = "StackedColumn3D", E[E.PercentStackedColumn3D = 36] = "PercentStackedColumn3D", E[E.StackedLine = 37] = "StackedLine", E[E.PercentStackedLine = 38] = "PercentStackedLine", E[E.MarkerLine = 39] = "MarkerLine", E[E.StackedMarkerLine = 40] = "StackedMarkerLine", E[E.PercentStackedMarkerLine = 41] = "PercentStackedMarkerLine", E[E.StackedArea = 42] = "StackedArea", E[E.PercentStackedArea = 43] = "PercentStackedArea", E[E.StackedArea3D = 44] = "StackedArea3D", E[E.PercentStackedArea3D = 45] = "PercentStackedArea3D", E[E.BarOfPie = 46] = "BarOfPie", E[E.Histogram = 47] = "Histogram", E[E.SmoothLineAndMarkerScatter = 48] = "SmoothLineAndMarkerScatter", E[E.SmoothLineScatter = 49] = "SmoothLineScatter", E[E.StraightLineAndMarkerScatter = 50] = "StraightLineAndMarkerScatter", E[E.StraightLineScatter = 51] = "StraightLineScatter", E[E.Bubble3D = 52] = "Bubble3D", E[E.OpenHighLowCloseStock = 53] = "OpenHighLowCloseStock", E[E.VolumeHighLowCloseStock = 54] = "VolumeHighLowCloseStock", E[E.VolumeOpenHighLowCloseStock = 55] = "VolumeOpenHighLowCloseStock", E[E.WireframeSurface = 56] = "WireframeSurface", E[E.WireframeSurface3D = 57] = "WireframeSurface3D", E[E.MarkerRadar = 58] = "MarkerRadar", E[E.FilledRadar = 59] = "FilledRadar", E[E.ClusteredColumnAndLineCombo = 60] = "ClusteredColumnAndLineCombo", E[E.ClusteredColumnAndLineOnSecondaryAxisCombo = 61] = "ClusteredColumnAndLineOnSecondaryAxisCombo", E[E.StackedAreaAndClusteredColumnCombo = 62] = "StackedAreaAndClusteredColumnCombo";
	}(j || (j = {})), function(E) {
		E.CONTROL = "control", E.THINKING = "thinking", E.CONTENT = "content", E.REFERENCES = "references", E.BUTTON = "button", E.SUGGESTION = "suggestion", E.FUNCTION_CALL = "functionCall", E.ERROR = "error", E.DONE = "done", E.STOP = "stop", E.DESCRIPTION = "description";
	}(Q$1 || (Q$1 = {})), function(E) {
		E[E.BASED_ON_UNSPECIFIED = 0] = "BASED_ON_UNSPECIFIED", E[E.BASED_ON_NETWORK = 1] = "BASED_ON_NETWORK", E[E.BASED_ON_TOPIC = 2] = "BASED_ON_TOPIC";
	}(q$2 || (q$2 = {})), function(E) {
		E[E.FULLSCREEN = 12] = "FULLSCREEN", E[E.SUMMARY = 13] = "SUMMARY", E[E.NEWSLIDE = 14] = "NEWSLIDE";
	}(Z$1 || (Z$1 = {})), function(E) {
		E[E.ITEM_TYPE_UNKNOW = 0] = "ITEM_TYPE_UNKNOW", E[E.ITEM_TYPE_CONV = 1] = "ITEM_TYPE_CONV", E[E.ITEM_TYPE_GROUP = 2] = "ITEM_TYPE_GROUP";
	}(J$1 || (J$1 = {})), function(E) {
		E.OPEN_AI_ASSISTANT = "openAiAssistant", E.CREATE_DOC_TYPE = "createDocType", E.SEND_COMMAND_ID = "sendCommandId", E.DEFAULT_AI_TAB = "defaultAITab", E.GENERATE_AI = "AIGenerate", E.DEEP_READ_TAB = "deepReadType", E.NO_PROMOTION = "no_promotion", E.EXPAND_TYPE = "expand_type", E.ACTIVEFEATURE = "activeFeature", E.FROM_PAGE = "from_page", E.AID_POSITION = "aid_position", E.SHOW_LAYOUT = "show_layout";
	}(z || (z = {})), ($$1 || ($$1 = {})).RESUME = "airesume", function(E) {
		E.ASSISTANT = "aicv_assistant", E.AI_WRITING = "aicv_aiwriting", E.AI_OTHER = "aicv_other";
	}(EE || (EE = {})), window.ai_version = _E(_E({}, window.ai_version || {}), {}, { interface: "1.164.0 - January 22, 2026 14:10:13" });
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/_commonjsHelpers-7d66b65f.js
function o$9(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var init__commonjsHelpers_7d66b65f = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/with-thinking-factory/index.js
var import_react$17, import_dayjs_min, d$3, h$2, u$4, m$3, f$1;
var init_with_thinking_factory = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_collapse_card_v2();
	init_index_07e2ccf4();
	init_index_9dc8fb5d();
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_toPropertyKey_4d3c5a97();
	init__commonjsHelpers_7d66b65f();
	init_style_inject_es_3984fa0f();
	d$3 = { exports: {} };
	d$3.exports = function() {
		var t, n, s = 1e3, i = 6e4, e = 36e5, r = 864e5, a = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, c = 31536e6, d = 2628e6, h = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, u = {
			years: c,
			months: d,
			days: r,
			hours: e,
			minutes: i,
			seconds: s,
			milliseconds: 1,
			weeks: 6048e5
		}, m = function(t) {
			return t instanceof k;
		}, f = function(t, n, s) {
			return new k(t, s, n.$l);
		}, l = function(t) {
			return n.p(t) + "s";
		}, p = function(t) {
			return t < 0;
		}, $ = function(t) {
			return p(t) ? Math.ceil(t) : Math.floor(t);
		}, g = function(t) {
			return Math.abs(t);
		}, y = function(t, n) {
			return t ? p(t) ? {
				negative: !0,
				format: "" + g(t) + n
			} : {
				negative: !1,
				format: "" + t + n
			} : {
				negative: !1,
				format: ""
			};
		}, k = function() {
			function p(t, n, s) {
				var i = this;
				if (this.$d = {}, this.$l = s, void 0 === t && (this.$ms = 0, this.parseFromMilliseconds()), n) return f(t * u[l(n)], this);
				if ("number" == typeof t) return this.$ms = t, this.parseFromMilliseconds(), this;
				if ("object" == t$12(t)) return Object.keys(t).forEach((function(n) {
					i.$d[l(n)] = t[n];
				})), this.calMilliseconds(), this;
				if ("string" == typeof t) {
					var e = t.match(h);
					if (e) {
						var r = e.slice(2).map((function(t) {
							return null != t ? Number(t) : 0;
						}));
						return this.$d.years = r[0], this.$d.months = r[1], this.$d.weeks = r[2], this.$d.days = r[3], this.$d.hours = r[4], this.$d.minutes = r[5], this.$d.seconds = r[6], this.calMilliseconds(), this;
					}
				}
				return this;
			}
			var g = p.prototype;
			return g.calMilliseconds = function() {
				var t = this;
				this.$ms = Object.keys(this.$d).reduce((function(n, s) {
					return n + (t.$d[s] || 0) * u[s];
				}), 0);
			}, g.parseFromMilliseconds = function() {
				var t = this.$ms;
				this.$d.years = $(t / c), t %= c, this.$d.months = $(t / d), t %= d, this.$d.days = $(t / r), t %= r, this.$d.hours = $(t / e), t %= e, this.$d.minutes = $(t / i), t %= i, this.$d.seconds = $(t / s), t %= s, this.$d.milliseconds = t;
			}, g.toISOString = function() {
				var t = y(this.$d.years, "Y"), n = y(this.$d.months, "M"), s = +this.$d.days || 0;
				this.$d.weeks && (s += 7 * this.$d.weeks);
				var i = y(s, "D"), e = y(this.$d.hours, "H"), o = y(this.$d.minutes, "M"), r = this.$d.seconds || 0;
				this.$d.milliseconds && (r += this.$d.milliseconds / 1e3, r = Math.round(1e3 * r) / 1e3);
				var a = y(r, "S"), c = t.negative || n.negative || i.negative || e.negative || o.negative || a.negative, d = e.format || o.format || a.format ? "T" : "", h = (c ? "-" : "") + "P" + t.format + n.format + i.format + d + e.format + o.format + a.format;
				return "P" === h || "-P" === h ? "P0D" : h;
			}, g.toJSON = function() {
				return this.toISOString();
			}, g.format = function(t) {
				var s = t || "YYYY-MM-DDTHH:mm:ss", i = {
					Y: this.$d.years,
					YY: n.s(this.$d.years, 2, "0"),
					YYYY: n.s(this.$d.years, 4, "0"),
					M: this.$d.months,
					MM: n.s(this.$d.months, 2, "0"),
					D: this.$d.days,
					DD: n.s(this.$d.days, 2, "0"),
					H: this.$d.hours,
					HH: n.s(this.$d.hours, 2, "0"),
					m: this.$d.minutes,
					mm: n.s(this.$d.minutes, 2, "0"),
					s: this.$d.seconds,
					ss: n.s(this.$d.seconds, 2, "0"),
					SSS: n.s(this.$d.milliseconds, 3, "0")
				};
				return s.replace(a, (function(t, n) {
					return n || String(i[t]);
				}));
			}, g.as = function(t) {
				return this.$ms / u[l(t)];
			}, g.get = function(t) {
				var n = this.$ms, s = l(t);
				return "milliseconds" === s ? n %= 1e3 : n = "weeks" === s ? $(n / u[s]) : this.$d[s], n || 0;
			}, g.add = function(t, n, s) {
				var i = n ? t * u[l(n)] : m(t) ? t.$ms : f(t, this).$ms;
				return f(this.$ms + i * (s ? -1 : 1), this);
			}, g.subtract = function(t, n) {
				return this.add(t, n, !0);
			}, g.locale = function(t) {
				var n = this.clone();
				return n.$l = t, n;
			}, g.clone = function() {
				return f(this.$ms, this);
			}, g.humanize = function(n) {
				return t().add(this.$ms, "ms").locale(this.$l).fromNow(!n);
			}, g.valueOf = function() {
				return this.asMilliseconds();
			}, g.milliseconds = function() {
				return this.get("milliseconds");
			}, g.asMilliseconds = function() {
				return this.as("milliseconds");
			}, g.seconds = function() {
				return this.get("seconds");
			}, g.asSeconds = function() {
				return this.as("seconds");
			}, g.minutes = function() {
				return this.get("minutes");
			}, g.asMinutes = function() {
				return this.as("minutes");
			}, g.hours = function() {
				return this.get("hours");
			}, g.asHours = function() {
				return this.as("hours");
			}, g.days = function() {
				return this.get("days");
			}, g.asDays = function() {
				return this.as("days");
			}, g.weeks = function() {
				return this.get("weeks");
			}, g.asWeeks = function() {
				return this.as("weeks");
			}, g.months = function() {
				return this.get("months");
			}, g.asMonths = function() {
				return this.as("months");
			}, g.years = function() {
				return this.get("years");
			}, g.asYears = function() {
				return this.as("years");
			}, p;
		}(), v = function(t, n, s) {
			return t.add(n.years() * s, "y").add(n.months() * s, "M").add(n.days() * s, "d").add(n.hours() * s, "h").add(n.minutes() * s, "m").add(n.seconds() * s, "s").add(n.milliseconds() * s, "ms");
		};
		return function(s, i, e) {
			t = e, n = e().$utils(), e.duration = function(t, n) {
				return f(t, { $l: e.locale() }, n);
			}, e.isDuration = m;
			var o = i.prototype.add, r = i.prototype.subtract;
			i.prototype.add = function(t, n) {
				return m(t) ? v(this, t, 1) : o.bind(this)(t, n);
			}, i.prototype.subtract = function(t, n) {
				return m(t) ? v(this, t, -1) : r.bind(this)(t, n);
			};
		};
	}();
	h$2 = o$9(d$3.exports);
	e$11(".ai-component-common-with-thinking-factory {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.ai-component-common-with-thinking-factory_content {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.ai-component-common-with-thinking-factory_thinking_content {\n  padding-left: 12px;\n  border-left: 2px solid var(--border-weak, rgba(0, 0, 0, 0.04));\n}\n.ai-component-common-with-thinking-factory_thinking_content p,\n.ai-component-common-with-thinking-factory_thinking_content li {\n  color: var(--text-5DA2, #5d5d5d) !important;\n  font-size: 14px !important;\n}\n.ai-component-common-with-thinking-factory_thinking_content li::marker {\n  color: var(--text-5DA2, #5d5d5d) !important;\n}\n"), import_dayjs_min.default.extend(h$2);
	u$4 = "ai-component-common-with-thinking-factory";
	m$3 = function(e) {
		return function(o) {
			var r = o.message, a = o.isFinished, c = o.children, d = o.handlers, h = o.thinkingMd, m = o.thinkingDuration, l = o.className, p = o.dot;
			if (!h) return c;
			var $ = e.markdownComponent;
			return import_react$17.createElement("div", { className: "".concat(u$4, " ").concat(l) }, import_react$17.createElement("div", { className: "".concat(u$4, "_thinking") }, import_react$17.createElement(m$5, {
				title: (null == r ? void 0 : r.messageStatus) === M.IN_THINKING ? s$5("with-thinking.bot-deepseek-thinking") : function() {
					if (m) {
						var t = f$1(m);
						return "".concat(s$5("with-thinking.bot-deepseek-thinking-done"), " (").concat(s$5("with-thinking.duration")).concat(t, ")");
					}
					return s$5("with-thinking.bot-deepseek-thinking-done");
				}(),
				resetToAutoHeightCondition: function() {
					return (null == r ? void 0 : r.messageStatus) === M.IN_THINKING;
				}
			}, import_react$17.createElement("div", { className: "".concat(u$4, "_thinking_content") }, import_react$17.createElement($, {
				message: r,
				isFinished: a,
				md: h,
				dot: p,
				handlers: d
			})))), import_react$17.createElement("div", { className: "".concat(u$4, "_content") }, c));
		};
	};
	f$1 = function(t) {
		var n = import_dayjs_min.default.duration(1e3 * t), i = Math.floor(n.asHours()), o = Math.floor(n.asMinutes()) % 60, r = n.seconds(), a = "";
		return i > 0 && (a += "".concat(i).concat(s$5("unit.hour"))), (o > 0 || i > 0) && (a += "".concat(o).concat(s$5("unit.minute"))), (a += "".concat(r).concat(s$5("unit.second"), " ")).trim();
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/with-outside-click/index.js
function o$8(t, r) {
	for (var n = 0; n < r.length; n++) {
		var o = r[n];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, r$8(o.key), o);
	}
}
function i$6(e, r) {
	if (r && ("object" == t$12(r) || "function" == typeof r)) return r;
	if (void 0 !== r) throw new TypeError("Derived constructors may only return object or undefined");
	return function(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}(e);
}
function c$7(e) {
	return c$7 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, c$7(e);
}
function u$3(e, t) {
	return u$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, u$3(e, t);
}
function l$5() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (e) {}
	return (l$5 = function() {
		return !!e;
	})();
}
var import_react$16, a$9;
var init_with_outside_click = __esmMin((() => {
	init_toPropertyKey_4d3c5a97();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	a$9 = function() {
		function e() {
			var t, r, o, u;
			return function(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
			}(this, e), r = this, u = arguments, o = c$7(o = e), (t = i$6(r, l$5() ? Reflect.construct(o, u || [], c$7(r).constructor) : o.apply(r, u))).domRef = (0, import_react$16.createRef)(), t.handleClick = function(e) {
				var r, n = t.props, o = n.excludeSelectors, i = n.onOutsideClick;
				null != o && o.some((function(t) {
					return e.target.closest(t);
				})) || null !== (r = t.domRef) && void 0 !== r && r.current && e.target && t.domRef.current.contains(e.target) || i(e);
			}, t;
		}
		return function(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
			e.prototype = Object.create(t && t.prototype, { constructor: {
				value: e,
				writable: !0,
				configurable: !0
			} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && u$3(e, t);
		}(e, import_react$16.Component), t = e, (a = [
			{
				key: "componentDidMount",
				value: function() {
					var e = this.props.trigger, t = void 0 === e ? "click" : e;
					document.addEventListener(t, this.handleClick, !0);
				}
			},
			{
				key: "componentWillUnmount",
				value: function() {
					var e = this.props.trigger, t = void 0 === e ? "click" : e;
					document.removeEventListener(t, this.handleClick, !0);
				}
			},
			{
				key: "render",
				value: function() {
					return this.props.children && import_react$16.isValidElement(this.props.children) ? import_react$16.createElement(import_react$16.Fragment, null, import_react$16.cloneElement(this.props.children, { ref: this.domRef })) : null;
				}
			}
		]) && o$8(t.prototype, a), f && o$8(t, f), Object.defineProperty(t, "prototype", { writable: !1 }), t;
		var t, a, f;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/index-16c390a4.js
function e$7(t, r, e, n, o, i, a) {
	try {
		var c = t[i](a), u = c.value;
	} catch (t) {
		e(t);
		return;
	}
	c.done ? r(u) : Promise.resolve(u).then(n, o);
}
function n$8(t) {
	return function() {
		var r = this, n = arguments;
		return new Promise((function(o, i) {
			var a = t.apply(r, n);
			function c(t) {
				e$7(a, o, i, c, u, "next", t);
			}
			function u(t) {
				e$7(a, o, i, c, u, "throw", t);
			}
			c(void 0);
		}));
	};
}
var o$7, i$5, a$8, c$6, u$2, s$3;
var init_index_16c390a4 = __esmMin((() => {
	init_toPropertyKey_4d3c5a97();
	init__commonjsHelpers_7d66b65f();
	o$7 = { exports: {} };
	i$5 = { exports: {} };
	(function(t) {
		function r(e) {
			return t.exports = r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t;
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
			}, t.exports.__esModule = !0, t.exports.default = t.exports, r(e);
		}
		t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(i$5);
	a$8 = i$5.exports;
	(function(t) {
		var r = a$8.default;
		function e() {
			/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
			t.exports = e = function() {
				return o;
			}, t.exports.__esModule = !0, t.exports.default = t.exports;
			var n, o = {}, i = Object.prototype, a = i.hasOwnProperty, c = Object.defineProperty || function(t, r, e) {
				t[r] = e.value;
			}, u = "function" == typeof Symbol ? Symbol : {}, s = u.iterator || "@@iterator", f = u.asyncIterator || "@@asyncIterator", l = u.toStringTag || "@@toStringTag";
			function h(t, r, e) {
				return Object.defineProperty(t, r, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}), t[r];
			}
			try {
				h({}, "");
			} catch (n) {
				h = function(t, r, e) {
					return t[r] = e;
				};
			}
			function p(t, r, e, n) {
				var o = r && r.prototype instanceof w ? r : w, i = Object.create(o.prototype);
				return c(i, "_invoke", { value: T(t, e, new F(n || [])) }), i;
			}
			function y(t, r, e) {
				try {
					return {
						type: "normal",
						arg: t.call(r, e)
					};
				} catch (t) {
					return {
						type: "throw",
						arg: t
					};
				}
			}
			o.wrap = p;
			var v = "suspendedStart", d = "suspendedYield", g = "executing", m = "completed", x = {};
			function w() {}
			function b() {}
			function L() {}
			var _ = {};
			h(_, s, (function() {
				return this;
			}));
			var E = Object.getPrototypeOf, j = E && E(E(M([])));
			j && j !== i && a.call(j, s) && (_ = j);
			var O = L.prototype = w.prototype = Object.create(_);
			function S(t) {
				[
					"next",
					"throw",
					"return"
				].forEach((function(r) {
					h(t, r, (function(t) {
						return this._invoke(r, t);
					}));
				}));
			}
			function P(t, e) {
				function n(o, i, c, u) {
					var s = y(t[o], t, i);
					if ("throw" !== s.type) {
						var f = s.arg, l = f.value;
						return l && "object" == r(l) && a.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
							n("next", t, c, u);
						}), (function(t) {
							n("throw", t, c, u);
						})) : e.resolve(l).then((function(t) {
							f.value = t, c(f);
						}), (function(t) {
							return n("throw", t, c, u);
						}));
					}
					u(s.arg);
				}
				var o;
				c(this, "_invoke", { value: function(t, r) {
					function i() {
						return new e((function(e, o) {
							n(t, r, e, o);
						}));
					}
					return o = o ? o.then(i, i) : i();
				} });
			}
			function T(t, r, e) {
				var o = v;
				return function(i, a) {
					if (o === g) throw Error("Generator is already running");
					if (o === m) {
						if ("throw" === i) throw a;
						return {
							value: n,
							done: !0
						};
					}
					for (e.method = i, e.arg = a;;) {
						var c = e.delegate;
						if (c) {
							var u = k(c, e);
							if (u) {
								if (u === x) continue;
								return u;
							}
						}
						if ("next" === e.method) e.sent = e._sent = e.arg;
						else if ("throw" === e.method) {
							if (o === v) throw o = m, e.arg;
							e.dispatchException(e.arg);
						} else "return" === e.method && e.abrupt("return", e.arg);
						o = g;
						var s = y(t, r, e);
						if ("normal" === s.type) {
							if (o = e.done ? m : d, s.arg === x) continue;
							return {
								value: s.arg,
								done: e.done
							};
						}
						"throw" === s.type && (o = m, e.method = "throw", e.arg = s.arg);
					}
				};
			}
			function k(t, r) {
				var e = r.method, o = t.iterator[e];
				if (o === n) return r.delegate = null, "throw" === e && t.iterator.return && (r.method = "return", r.arg = n, k(t, r), "throw" === r.method) || "return" !== e && (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + e + "' method")), x;
				var i = y(o, t.iterator, r.arg);
				if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, x;
				var a = i.arg;
				return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = n), r.delegate = null, x) : a : (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("iterator result is not an object"), r.delegate = null, x);
			}
			function G(t) {
				var r = { tryLoc: t[0] };
				1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r);
			}
			function N(t) {
				var r = t.completion || {};
				r.type = "normal", delete r.arg, t.completion = r;
			}
			function F(t) {
				this.tryEntries = [{ tryLoc: "root" }], t.forEach(G, this), this.reset(!0);
			}
			function M(t) {
				if (t || "" === t) {
					var e = t[s];
					if (e) return e.call(t);
					if ("function" == typeof t.next) return t;
					if (!isNaN(t.length)) {
						var o = -1, i = function r() {
							for (; ++o < t.length;) if (a.call(t, o)) return r.value = t[o], r.done = !1, r;
							return r.value = n, r.done = !0, r;
						};
						return i.next = i;
					}
				}
				throw new TypeError(r(t) + " is not iterable");
			}
			return b.prototype = L, c(O, "constructor", {
				value: L,
				configurable: !0
			}), c(L, "constructor", {
				value: b,
				configurable: !0
			}), b.displayName = h(L, l, "GeneratorFunction"), o.isGeneratorFunction = function(t) {
				var r = "function" == typeof t && t.constructor;
				return !!r && (r === b || "GeneratorFunction" === (r.displayName || r.name));
			}, o.mark = function(t) {
				return Object.setPrototypeOf ? Object.setPrototypeOf(t, L) : (t.__proto__ = L, h(t, l, "GeneratorFunction")), t.prototype = Object.create(O), t;
			}, o.awrap = function(t) {
				return { __await: t };
			}, S(P.prototype), h(P.prototype, f, (function() {
				return this;
			})), o.AsyncIterator = P, o.async = function(t, r, e, n, i) {
				void 0 === i && (i = Promise);
				var a = new P(p(t, r, e, n), i);
				return o.isGeneratorFunction(r) ? a : a.next().then((function(t) {
					return t.done ? t.value : a.next();
				}));
			}, S(O), h(O, l, "Generator"), h(O, s, (function() {
				return this;
			})), h(O, "toString", (function() {
				return "[object Generator]";
			})), o.keys = function(t) {
				var r = Object(t), e = [];
				for (var n in r) e.push(n);
				return e.reverse(), function t() {
					for (; e.length;) {
						var n = e.pop();
						if (n in r) return t.value = n, t.done = !1, t;
					}
					return t.done = !0, t;
				};
			}, o.values = M, F.prototype = {
				constructor: F,
				reset: function(t) {
					if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(N), !t) for (var r in this) "t" === r.charAt(0) && a.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = n);
				},
				stop: function() {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ("throw" === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function(t) {
					if (this.done) throw t;
					var r = this;
					function e(e, o) {
						return c.type = "throw", c.arg = t, r.next = e, o && (r.method = "next", r.arg = n), !!o;
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var i = this.tryEntries[o], c = i.completion;
						if ("root" === i.tryLoc) return e("end");
						if (i.tryLoc <= this.prev) {
							var u = a.call(i, "catchLoc"), s = a.call(i, "finallyLoc");
							if (u && s) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
								if (this.prev < i.finallyLoc) return e(i.finallyLoc);
							} else if (u) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
							} else {
								if (!s) throw Error("try statement without catch or finally");
								if (this.prev < i.finallyLoc) return e(i.finallyLoc);
							}
						}
					}
				},
				abrupt: function(t, r) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var n = this.tryEntries[e];
						if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
							var o = n;
							break;
						}
					}
					o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);
					var i = o ? o.completion : {};
					return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, x) : this.complete(i);
				},
				complete: function(t, r) {
					if ("throw" === t.type) throw t.arg;
					return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), x;
				},
				finish: function(t) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var e = this.tryEntries[r];
						if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), N(e), x;
					}
				},
				catch: function(t) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var e = this.tryEntries[r];
						if (e.tryLoc === t) {
							var n = e.completion;
							if ("throw" === n.type) {
								var o = n.arg;
								N(e);
							}
							return o;
						}
					}
					throw Error("illegal catch attempt");
				},
				delegateYield: function(t, r, e) {
					return this.delegate = {
						iterator: M(t),
						resultName: r,
						nextLoc: e
					}, "next" === this.method && (this.arg = n), x;
				}
			}, o;
		}
		t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(o$7);
	c$6 = (0, o$7.exports)();
	u$2 = c$6;
	try {
		regeneratorRuntime = c$6;
	} catch (r) {
		"object" === ("undefined" == typeof globalThis ? "undefined" : t$12(globalThis)) ? globalThis.regeneratorRuntime = c$6 : Function("r", "regeneratorRuntime = r")(c$6);
	}
	s$3 = o$9(u$2);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/toConsumableArray-19ff1ff1.js
function e$6(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function n$7(n) {
	return function(t) {
		if (Array.isArray(t)) return t$13(t);
	}(n) || e$6(n) || n$12(n) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_toConsumableArray_19ff1ff1 = __esmMin((() => {
	init_slicedToArray_fb5b6502();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/bottombar_new_sheet.svg
var bottombar_new_sheet_default;
var init_bottombar_new_sheet = __esmMin((() => {
	bottombar_new_sheet_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3c!--%20Generator:%20Sketch%2063.1%20(92452)%20-%20https://sketch.com%20--%3e%3ctitle%3ebottombar_new_sheet%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3cpath%20d='M13,5%20L13,11%20L19,11%20L19,13%20L13,13%20L13,19%20L11,19%20L11,13%20L5,13%20L5,11%20L11,11%20L11,5%20L13,5%20Z'%20id='path-1'%3e%3c/path%3e%3c/defs%3e%3cg%20id='bottombar_new_sheet'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%3e%3crect%20id='矩形'%20stroke='%23979797'%20fill='%23D8D8D8'%20opacity='0'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3c/rect%3e%3cmask%20id='mask-2'%20fill='white'%3e%3cuse%20xlink:href='%23path-1'%3e%3c/use%3e%3c/mask%3e%3cuse%20id='Combined-Shape'%20fill='%23464D5A'%20xlink:href='%23path-1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/data_drag.svg
var data_drag_default;
var init_data_drag = __esmMin((() => {
	data_drag_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='12px'%20height='24px'%20viewBox='0%200%2012%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3edata_drag%3c/title%3e%3cg%20id='PC数据验证设置面板'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='资源'%20transform='translate(-689.000000,%20-52.000000)'%20fill='%23CBCDD1'%20fill-rule='nonzero'%3e%3cg%20id='编组'%20transform='translate(39.000000,%2052.000000)'%3e%3cg%20transform='translate(650.000000,%200.000000)'%20id='形状结合'%3e%3cpath%20d='M8.75,16.5%20C9.44035594,16.5%2010,17.0596441%2010,17.75%20C10,18.4403559%209.44035594,19%208.75,19%20C8.05964406,19%207.5,18.4403559%207.5,17.75%20C7.5,17.0596441%208.05964406,16.5%208.75,16.5%20Z%20M4.25,16.5%20C4.94035594,16.5%205.5,17.0596441%205.5,17.75%20C5.5,18.4403559%204.94035594,19%204.25,19%20C3.55964406,19%203,18.4403559%203,17.75%20C3,17.0596441%203.55964406,16.5%204.25,16.5%20Z%20M8.75,11.25%20C9.44035594,11.25%2010,11.8096441%2010,12.5%20C10,13.1903559%209.44035594,13.75%208.75,13.75%20C8.05964406,13.75%207.5,13.1903559%207.5,12.5%20C7.5,11.8096441%208.05964406,11.25%208.75,11.25%20Z%20M4.25,11.25%20C4.94035594,11.25%205.5,11.8096441%205.5,12.5%20C5.5,13.1903559%204.94035594,13.75%204.25,13.75%20C3.55964406,13.75%203,13.1903559%203,12.5%20C3,11.8096441%203.55964406,11.25%204.25,11.25%20Z%20M8.75,6%20C9.44035594,6%2010,6.55964406%2010,7.25%20C10,7.94035594%209.44035594,8.5%208.75,8.5%20C8.05964406,8.5%207.5,7.94035594%207.5,7.25%20C7.5,6.55964406%208.05964406,6%208.75,6%20Z%20M4.25,6%20C4.94035594,6%205.5,6.55964406%205.5,7.25%20C5.5,7.94035594%204.94035594,8.5%204.25,8.5%20C3.55964406,8.5%203,7.94035594%203,7.25%20C3,6.55964406%203.55964406,6%204.25,6%20Z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/toolbar_arrange_bring_to_back.svg
var toolbar_arrange_bring_to_back_default;
var init_toolbar_arrange_bring_to_back = __esmMin((() => {
	toolbar_arrange_bring_to_back_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3c!--%20Generator:%20Sketch%2063.1%20(92452)%20-%20https://sketch.com%20--%3e%3ctitle%3etoolbar_arrange_bring_to_back%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cg%20id='toolbar_arrange_bring_to_back'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='_图标/工具栏/04_幻灯片/下移一层'%3e%3crect%20id='Rectangle复制-29'%20fill='%23000000'%20opacity='0'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3c/rect%3e%3cg%20id='编组-24'%20transform='translate(4.000000,%205.000000)'%20fill='%23464D5A'%3e%3cpath%20d='M15.5,0%20C15.7761424,0%2016,0.223857625%2016,0.5%20L16,0.5%20L16,4%20C16,4.27614237%2015.7761424,4.5%2015.5,4.5%20L15.5,4.5%20L8.63,4.5%20L8.63,10%20L10.5,10%20L8,14%20L5.5,10%20L7.38,10%20L7.38,4.5%20L0.5,4.5%20C0.254540111,4.5%200.0503916296,4.32312484%200.00805566941,4.08987563%20L0,4%20L0,0.5%20C0,0.223857625%200.223857625,0%200.5,0%20L0.5,0%20Z%20M6.13,6.75%20L6.13,8%20L5.46229728e-14,8%20L5.46229728e-14,6.75%20L6.13,6.75%20Z%20M16,6.75%20L16,8%20L9.87,8%20L9.87,6.75%20L16,6.75%20Z%20M14.75,1.25%20L1.25,1.25%20L1.25,3.25%20L14.75,3.25%20L14.75,1.25%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/toolbar_arrange_bring_to_front.svg
var toolbar_arrange_bring_to_front_default;
var init_toolbar_arrange_bring_to_front = __esmMin((() => {
	toolbar_arrange_bring_to_front_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3c!--%20Generator:%20Sketch%2063.1%20(92452)%20-%20https://sketch.com%20--%3e%3ctitle%3etoolbar_arrange_bring_to_front%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cg%20id='toolbar_arrange_bring_to_front'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='_图标/工具栏/04_幻灯片/上移一层'%3e%3crect%20id='Rectangle'%20fill='%23000000'%20opacity='0'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3c/rect%3e%3cpath%20d='M12,5%20L14.5,9%20L12.63,8.999%20L12.63,14.5%20L19.5,14.5%20C19.7761424,14.5%2020,14.7238576%2020,15%20L20,18.5%20C20,18.7761424%2019.7761424,19%2019.5,19%20L4.5,19%20C4.22385763,19%204,18.7761424%204,18.5%20L4,15%20C4,14.7238576%204.22385763,14.5%204.5,14.5%20L11.38,14.5%20L11.38,8.999%20L9.5,9%20L12,5%20Z%20M18.75,15.75%20L5.25,15.75%20L5.25,17.75%20L18.75,17.75%20L18.75,15.75%20Z%20M10.13,11%20L10.13,12.25%20L4,12.25%20L4,11%20L10.13,11%20Z%20M20,11%20L20,12.25%20L13.87,12.25%20L13.87,11%20L20,11%20Z'%20id='形状结合'%20fill='%23464D5A'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/toolbar_dele.svg
var toolbar_dele_default;
var init_toolbar_dele = __esmMin((() => {
	toolbar_dele_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3etoolbar_dele%3c/title%3e%3cg%20id='PC'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='_图标/工具栏/03_收集表/删除'%3e%3crect%20id='Rectangle'%20x='0'%20y='0'%20width='24'%20height='24'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M15.5,4%20C15.7761424,4%2016,4.22385763%2016,4.5%20L16,6.499%20L17.4615931,6.5%20L17.471,6.5%20L20,6.5%20L20,7.75%20L17.907,7.749%20L17.034301,19.5369358%20C17.0149605,19.7980335%2016.7974801,20%2016.5356672,20%20L7.46433283,20%20C7.20251987,20%206.98503952,19.7980335%206.96569895,19.5369358%20L6.092,7.749%20L4,7.75%20L4,6.5%20L6.50147106,6.50136612%20C6.51376196,6.50045569%206.52608233,6.5%206.5384069,6.5%20L8,6.499%20L8,4.5%20C8,4.22385763%208.22385763,4%208.5,4%20L15.5,4%20Z%20M16.6539827,7.75%20L7.34601726,7.75%20L8.16083207,18.75%20L15.8391679,18.75%20L16.6539827,7.75%20Z%20M12.6498753,11%20L12.6498753,16%20L11.3998753,16%20L11.3998753,11%20L12.6498753,11%20Z%20M14.75,5.25%20L9.25,5.25%20L9.25,6.499%20L14.75,6.499%20L14.75,5.25%20Z'%20id='形状结合'%20fill='%23464D5A'%20fill-rule='nonzero'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/index-be14aca1.js
function V(n) {
	var o = (0, import_react$15.useRef)(n);
	return o.current = n, (0, import_react$15.useCallback)((function() {
		for (var n, e = arguments.length, t = new Array(e), c = 0; c < e; c++) t[c] = arguments[c];
		null === (n = o.current) || void 0 === n || n.call.apply(n, [o].concat(n$7(t || [])));
	}), []);
}
function J(n, e) {
	var t = Object.keys(n);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(n);
		e && (o = o.filter((function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function K(n) {
	for (var e = 1; e < arguments.length; e++) {
		var t = null != arguments[e] ? arguments[e] : {};
		e % 2 ? J(Object(t), !0).forEach((function(e) {
			r$7(n, e, t[e]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : J(Object(t)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
		}));
	}
	return n;
}
function $(e) {
	var t = e.type, c = e.level, r = V((function(n) {
		var t;
		n.stopPropagation(), null === (t = e.onAdd) || void 0 === t || t.call(e);
	})), i = V((function(n) {
		var t;
		n.stopPropagation(), null === (t = e.onDelete) || void 0 === t || t.call(e);
	})), l = (0, import_react$15.useMemo)((function() {
		return "ppt" === t;
	}), [t]), a = (0, import_react$15.useMemo)((function() {
		return "ppt" === t || 1 === c;
	}), [c, t]), _ = (0, import_react$15.useMemo)((function() {
		return 1 === c ? "降级" : 2 === c ? "升级为章节" : "";
	}), [c]), p = (0, import_react$15.useMemo)((function() {
		return "ppt" === t ? 1 === c || 2 === c ? "添加页面" : "添加内容" : 1 === c ? "添加章节" : "添加内容";
	}), [c, t]), u = (0, import_react$15.useMemo)((function() {
		return "ppt" !== t ? null : 1 === c ? import_react$15.createElement(W$1, {
			icon: "downLevel",
			size: 20
		}) : 2 === c ? import_react$15.createElement(W$1, {
			icon: "upLevel",
			size: 20
		}) : null;
	}), [t, c]), d = V((function(n) {
		var t;
		n.stopPropagation();
		var o = void 0;
		1 === c && (o = "down"), 2 === c && (o = "up"), o && (null === (t = e.onPptLevelChange) || void 0 === t || t.call(e, o));
	}));
	return import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__control" }, l && import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__control__item",
		onClick: d,
		onMouseDown: X
	}, u, import_react$15.createElement("span", { className: "hyc-component-outline__content__chapter__control__item__text" }, _)), a && import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__control__item",
		onClick: r,
		onMouseDown: X
	}, import_react$15.createElement(W$1, {
		icon: "addGrey",
		size: 20
	}), import_react$15.createElement("span", { className: "hyc-component-outline__content__chapter__control__item__text" }, p)), import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__control__item",
		onClick: i,
		onMouseDown: X
	}, import_react$15.createElement(W$1, {
		icon: "delete",
		size: 20
	}), import_react$15.createElement("span", { className: "hyc-component-outline__content__chapter__control__item__text" }, "删除")));
}
function Y(o) {
	var r = o.value, i = o.index, l = o.readonly, a = o.disabled, _ = o.type, p = o.onDescChange, u = o.onDescBlur, d = o.onDescAdd, h = o.onDescDelete, m = (0, import_react$15.useRef)(null), y = (0, import_react$15.useRef)(null), g = a$12((0, import_react$15.useState)(!1), 2), v = g[0], x = g[1], b = (0, import_react$15.useCallback)((function() {
		l || a || v || (x(!0), window.setTimeout((function() {
			var n;
			null === (n = m.current) || void 0 === n || n.focus(), window.setTimeout((function() {
				y.current && y.current.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}), 300);
		}), 100));
	}), [
		l,
		a,
		v
	]), w = (0, import_react$15.useCallback)((function() {
		x(!1), u();
	}), [u]);
	return import_react$15.createElement("div", {
		ref: y,
		className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__desc", {
			"hyc-component-outline__content__chapter__desc--empty": !r,
			"hyc-component-outline__content__chapter__desc--view": !v,
			"hyc-component-outline__content__chapter__desc--edit": v
		}),
		onClick: b
	}, v ? import_react$15.createElement(Q, {
		value: r,
		placeholder: "请输入内容",
		onBlur: w,
		ref: m,
		onChange: function(n) {
			return p(n, i);
		}
	}) : import_react$15.createElement(import_react$15.Fragment, null, import_react$15.createElement("span", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__desc__text", { "hyc-component-outline__content__chapter__desc__text--empty": !r }) }, r || "请输入内容"), !l && !a && import_react$15.createElement($, {
		onAdd: function() {
			return d(i);
		},
		onDelete: function() {
			return h(i);
		},
		type: _,
		level: -1
	})));
}
function Z(r) {
	var i = r.onChange, l = r.type, a = r.readonly, _ = r.onAdd, p = r.onDelete, u = r.onPptLevelChange, d = r.level, h = r.disabled, f = a$12((0, import_react$15.useState)(r.title), 2), g = f[0], v = f[1], b = a$12((0, import_react$15.useState)(r.desc), 2), w = b[0], E = b[1], P = a$12((0, import_react$15.useState)(!1), 2), D = P[0], N = P[1], k = (0, import_react$15.useRef)(null), j = (0, import_react$15.useRef)(null), S = (0, import_react$15.useMemo)((function() {
		return "ppt" === l ? "标题" : 1 === d ? "章节标题" : "子章节标题";
	}), [d, l]), I = V((function() {})), A = V((function(n) {
		v(n);
	})), L = V((function(n, e) {
		var t = n;
		Array.isArray(w) && ((t = n$7(w))[e] = n), E(t);
	})), T = V((function() {
		N(!1), i?.(g, w);
	})), z = V((function() {
		i?.(g, w);
	})), R = V((function(n) {
		var e = [];
		void 0 === w ? e = [] : "string" == typeof w ? e = [w] : Array.isArray(w) && (e = n$7(w)), e.splice(n + 1, 0, ""), E(e), i?.(g, e);
	})), B = V((function(n) {
		var e = [];
		void 0 === w ? e = [] : "string" == typeof w ? e = [w] : Array.isArray(w) && (e = n$7(w)), e.splice(n, 1), E(e), i?.(g, e);
	})), F = (0, import_react$15.useMemo)((function() {
		return (Array.isArray(w) ? w : [w]).filter((function(n) {
			return "string" == typeof n;
		})).map((function(e, t) {
			return import_react$15.createElement(Y, {
				key: t,
				value: e || "",
				index: t,
				readonly: a,
				disabled: h,
				type: l,
				onDescChange: L,
				onDescBlur: z,
				onDescAdd: R,
				onDescDelete: B
			});
		}));
	}), [
		w,
		l,
		a,
		L,
		z,
		h,
		R,
		B
	]), M = (0, import_react$15.useCallback)((function() {
		a || h || D || (N(!0), window.setTimeout((function() {
			var n;
			null === (n = j.current) || void 0 === n || n.focus(), window.setTimeout((function() {
				k.current && k.current.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}), 300);
		}), 100));
	}), [
		a,
		h,
		D
	]);
	return import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__value",
		ref: k
	}, import_react$15.createElement("div", {
		className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__title", {
			"hyc-component-outline__content__chapter__title--empty": !g,
			"hyc-component-outline__content__chapter__title--view": !D,
			"hyc-component-outline__content__chapter__title--edit": D
		}),
		onClick: M
	}, D ? import_react$15.createElement(Q, {
		value: g,
		placeholder: S,
		onBlur: T,
		onKeydown: I,
		ref: j,
		onChange: A
	}) : import_react$15.createElement(import_react$15.Fragment, null, import_react$15.createElement("span", { className: "hyc-component-outline__content__chapter__title__text" }, g || S), !a && import_react$15.createElement($, {
		onAdd: _,
		onDelete: p,
		type: l,
		level: d,
		onPptLevelChange: u
	}))), F);
}
function nn(e) {
	var t = e.pos, c = e.templateId, r = (0, import_react$15.useMemo)((function() {
		return t.split("-").map((function(n) {
			return Number(n) + 1;
		})).length;
	}), [t]), i = (0, import_react$15.useMemo)((function() {
		var n = t.split("-").map((function(n) {
			return Number(n) + 1;
		}));
		return [U.REPORT, U.PAPER].includes(c) ? 1 === n.length ? "第".concat(n.pop(), "章") : n.join(".") : "";
	}), [t, c]);
	return i ? import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__num", "hyc-component-outline__content__chapter__num--level-".concat(r)) }, i) : null;
}
function en(e) {
	var t = e.level, c = e.index, r = (0, import_react$15.useMemo)((function() {
		return 0 === t ? s$5(0 === c ? "outline.ppt-type.cover" : 1 === c ? "outline.ppt-type.toc" : "outline.ppt-type.back") : 1 === t ? s$5("outline.ppt-type.chapter") : "";
	}), [t, c]);
	return import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__ppt-type" }, import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__ppt-type__icon", { "hyc-component-outline__content__chapter__ppt-type__icon--empty": !Boolean(r) }) }, r), import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__ppt-type__text" }, "P", c + 1));
}
function tn(n, e) {
	var t = Object.keys(n);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(n);
		e && (o = o.filter((function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function on(t) {
	var i = t.value, l = t.onValueChange, _ = t.parentPos, p = void 0 === _ ? "" : _, u = t.index, d = t.onDragging, h = t.onDrop, m = t.readonly, y = void 0 !== m && m, g = t.disabled, b = t.indexMap, w = t.outlineUuid, E = t.loading, O = t.templateId, P = (0, import_react$15.useContext)(On).Modal, D = (0, import_react$15.useMemo)((function() {
		return p ? "".concat(p, "-").concat(u) : "".concat(u);
	}), [u, p]), N = (0, import_react$15.useMemo)((function() {
		return D.split("-").length;
	}), [D]), k = (0, import_react$15.useMemo)((function() {
		return !0;
	}), []), S = V((function(n, e) {
		l?.(i.id, D, function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = null != arguments[e] ? arguments[e] : {};
				e % 2 ? tn(Object(t), !0).forEach((function(e) {
					r$7(n, e, t[e]);
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : tn(Object(t)).forEach((function(e) {
					Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
				}));
			}
			return n;
		}({ title: n }, e ? { desc: e } : {}));
	})), I = V((function() {
		var n, e = "sibling";
		"ppt" === i.type && 1 === N && (e = "child"), null === (n = t.onAdd) || void 0 === n || n.call(t, {
			id: i.id,
			pos: D,
			type: e,
			itemType: i.type
		});
	})), A = V((function(n) {
		return new Promise((function(e, o) {
			var c;
			if (!i.title && !i.desc) return null === (c = t.onDelete) || void 0 === c || c.call(t, i.id, D), void e();
			P.confirm({
				title: "确认删除？",
				content: "删除后该段内容，不可恢复",
				okText: "删除",
				cancelText: "取消",
				destroyOnClose: !0,
				onClose: function() {
					o();
				},
				onCancel: function() {
					o();
				},
				onOk: function() {
					var o;
					null === (o = t.onDelete) || void 0 === o || o.call(t, i.id, D, n), e();
				}
			});
		}));
	})), L = V((function(n) {
		var e;
		null === (e = t.onPptLevelChange) || void 0 === e || e.call(t, i.id, D, n);
	})), T = (0, import_react$15.useMemo)((function() {
		return b[i.id];
	}), [b, i.id]), R = a$12(useDrag({
		type: G$1.Card,
		item: {
			id: i.id,
			pos: D,
			outlineUuid: w,
			node: {
				type: i.type,
				index: T,
				level: N,
				desc: i.desc,
				title: i.title,
				childLen: i.children ? i.children.length : 0,
				childrenStr: i.children ? JSON.stringify(i.children) : "",
				templateId: O,
				pos: D
			}
		},
		end: function() {
			var n = document.querySelector("[data-hyc-ouline-id=\"".concat(i.id, "\"]"));
			n && (n.dataset.hoverItem = "");
		},
		canDrag: function() {
			return Q.current = {
				id: "",
				x: 0,
				pos: 0
			}, k && !g;
		},
		collect: function(n) {
			return { isDragging: n.isDragging() };
		}
	}, [
		i.id,
		D,
		k,
		g,
		T,
		i.type,
		N,
		i.desc,
		i.title,
		i.children,
		O
	]), 3), B = R[0].isDragging, F = R[1], M = R[2], J = a$12((0, import_react$15.useState)(0), 2), K = J[0], H = J[1], Q = (0, import_react$15.useRef)({
		pos: K,
		id: "",
		x: 0
	}), $ = a$12(useDrop({
		accept: G$1.Card,
		hover: function(n, e) {
			var t = n.id, o = n.pos, c = n.node;
			if (t !== i.id && 0 !== D.indexOf(o)) {
				var r = document.querySelector("[data-hyc-ouline-id=\"".concat(t, "\"]"));
				if (r) r.dataset.hoverItem !== i.id && (Q.current = {
					id: "",
					x: 0,
					pos: 0
				}), r.dataset.hoverItem = i.id;
				var l = e.getClientOffset();
				if (l) {
					var a = function(n) {
						var e = n.id, t = n.level, o = n.type, c = n.point, r = n.canDropChild, i = n.prevHoverResult, l = document.querySelector("[data-hyc-ouline-id=\"".concat(e, "\"] > .hyc-component-outline__content__chapter__wrapper")), a = null == l ? void 0 : l.getBoundingClientRect();
						if (!a) return 0;
						var _ = [a.y - 1, a.y + a.height + 1];
						return c.y >= _[0] && c.y < _[0] + a.height / 2 ? -1 : c.y >= _[0] + a.height / 2 && c.y <= _[1] ? i.id === e && i.x && 1 === t && r && "ppt" !== o ? i.x - c.x > 24 ? 1 : i.x - c.x < -24 ? 2 : 0 === i.pos || -1 === i.pos ? 1 : i.pos : 1 : 0;
					}({
						id: i.id,
						level: N,
						point: l,
						prevHoverResult: Q.current,
						canDropChild: 0 === c.childLen,
						type: i.type
					}), _ = Q.current.x;
					(1 === a && 1 !== Q.current.pos || 2 === a && 2 !== Q.current.pos) && (_ = l.x), Q.current = {
						pos: a,
						id: i.id,
						x: _
					}, H(a);
				}
			}
		},
		drop: function(n) {
			var e = null == n ? void 0 : n.id;
			if (e !== i.id) {
				var t = Q.current.pos;
				Q.current = {
					x: 0,
					id: "",
					pos: 0
				}, 0 !== t && h?.(e, i.id, t);
			}
		},
		canDrop: function(n) {
			var e = n.pos, t = n.outlineUuid, o = n.node, c = D.split("-").length, r = e.split("-").length;
			return !(!k || g || w !== t) && (r >= c && 0 !== D.indexOf(e) || r < c && 0 === o.childLen);
		},
		collect: function(n) {
			return {
				isOver: n.isOver(),
				canDrop: n.canDrop()
			};
		}
	}, [
		i.id,
		D,
		N,
		i.type,
		h,
		k,
		g,
		w
	]), 2), Y = $[0], cn = Y.isOver, rn = Y.canDrop, ln = $[1];
	(0, import_react$15.useEffect)((function() {
		d?.(B);
	}), [B, d]), (0, import_react$15.useEffect)((function() {
		cn || H(0);
	}), [cn]), (0, import_react$15.useEffect)((function() {
		M(getEmptyImage(), { captureDraggingState: !0 });
	}), [M]);
	var an = (0, import_react$15.useMemo)((function() {
		return !!O && [U.REPORT, U.PAPER].includes(O);
	}), [O]);
	return import_react$15.createElement("div", {
		className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter", {
			"hyc-component-outline__content__chapter--dragging": B,
			"hyc-component-outline__content__chapter--no-drag": !k,
			"hyc-component-outline__content__chapter--no-drop": !rn || !k,
			"hyc-component-outline__content__chapter--ppt": "ppt" === i.type
		}),
		"data-hyc-outline-pos": D,
		"data-hyc-ouline-id": i.id,
		"data-hyc-outline-level": N
	}, import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__wrapper",
		ref: ln,
		style: { paddingLeft: "ppt" === i.type ? 0 : 24 * (N - 1) }
	}, import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__wrapper__content" }, import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__drag",
		ref: F
	}, import_react$15.createElement(W$1, { icon: "drag" })), import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__content", {
		"hyc-component-outline__content__chapter__content--hover-up": -1 === K,
		"hyc-component-outline__content__chapter__content--hover-down": 1 === K || 2 === K,
		"hyc-component-outline__content__chapter__content--hover-down--child": 2 === K
	}) }, "ppt" === i.type && import_react$15.createElement(en, {
		level: N,
		index: T
	}), an && import_react$15.createElement(nn, {
		pos: D,
		templateId: O
	}), import_react$15.createElement(Z, {
		title: i.title,
		desc: i.desc,
		onChange: S,
		onAdd: I,
		onDelete: A,
		type: i.type,
		level: N,
		onPptLevelChange: L,
		readonly: y,
		disabled: g
	})))), i.children && import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__children" }, i.children.map((function(e, o) {
		return import_react$15.createElement(on, {
			key: e.id,
			value: e,
			onValueChange: l,
			parentPos: D,
			index: o,
			onDelete: t.onDelete,
			onDragging: d,
			onDrop: h,
			readonly: y,
			disabled: g,
			indexMap: b,
			onPptLevelChange: t.onPptLevelChange,
			onAdd: t.onAdd,
			outlineUuid: w,
			loading: E,
			templateId: O
		});
	}))));
}
function cn(t) {
	var i = t.chapters, l = t.disabled, a = t.indexMap, _ = t.readonly, p = t.onValueChange, u = t.onAdd, d = t.onDelete, h = t.onDragging, m = t.onDrop, y = t.onPptLevelChange, f = t.outlineUuid, v = t.scrollSelector, x = t.loading, b = t.templateId;
	return function(n) {
		var t = n.outlineUuid, i = n.scrollSelector, l = (0, import_react$15.useMemo)((function() {
			return n.contentSelector || i;
		}), [n.contentSelector, i]), _ = a$12((0, import_react$15.useState)(!1), 2), p = _[0], u = _[1], d = useDragDropManager().getMonitor(), h = (0, import_react$15.useRef)(), m = (0, import_react$15.useRef)(), y = V((function() {
			window.clearInterval(h.current);
			var n = document.querySelector(".agent-layout__content");
			n && n.classList.remove("agent-layout__content--outline-scrolling");
		})), f = V((function(n, e, t) {
			var o = e.getBoundingClientRect(), c = function() {
				var e = t.getBoundingClientRect();
				return n < 0 && e.top - o.top < 50;
			}, r = function() {
				var e = t.getBoundingClientRect();
				return n > 0 && e.bottom - o.bottom > -50;
			};
			if (c() || r()) {
				h.current = window.setInterval((function() {
					c() || r() ? e.scrollBy(0, n) : y();
				}), 1);
				var i = document.querySelector(".agent-layout__content");
				i && i.classList.add("agent-layout__content--outline-scrolling");
			}
		}));
		(0, import_react$15.useEffect)((function() {
			p ? m.current = d.subscribeToOffsetChange((function() {
				if (l && i) {
					var n = d.getClientOffset(), e = document.querySelector(i), t = document.querySelector(l);
					if (n && e && t) {
						var o = e.getBoundingClientRect();
						n.y < o.top + 50 ? (h.current && y(), f(-1, e, t)) : n.y > o.top + o.height - 50 ? (h.current && y(), f(1, e, t)) : n.y > o.top + 50 && n.y < o.top + o.height - 50 && h.current && y();
					}
				}
			})) : m.current && (h.current && y(), m.current());
		}), [
			p,
			d,
			i,
			l,
			y,
			f
		]), (0, import_react$15.useEffect)((function() {
			if (i && l) {
				var n = d.subscribeToStateChange((function() {
					var n = d.getItem();
					if (d.isDragging() && n.outlineUuid === t) {
						u((function() {
							return !0;
						}));
						var e = document.querySelector(i);
						e && e.classList.add("outline-drag-stop-scroll");
					} else if (!d.isDragging()) {
						u((function() {
							return !1;
						}));
						var o = document.querySelector(i);
						o && o.classList.remove("outline-drag-stop-scroll");
					}
				}));
				return function() {
					n();
				};
			}
		}), [
			l,
			d,
			t,
			i
		]);
	}({
		scrollSelector: v,
		contentSelector: "[data-outline-uuid=\"".concat(f, "\"]"),
		outlineUuid: f
	}), import_react$15.createElement("div", { className: "hyc-component-outline__content__chapters" }, i.map((function(e, t) {
		return import_react$15.createElement(on, {
			key: e.id,
			value: e,
			onValueChange: p,
			index: t,
			onAdd: u,
			onDelete: d,
			onDragging: h,
			onDrop: m,
			readonly: _,
			onPptLevelChange: y,
			disabled: l,
			indexMap: a,
			outlineUuid: f,
			loading: x,
			templateId: b
		});
	})));
}
function rn(e) {
	var t = e.type, c = e.level, r = e.index, i = e.title, l = e.desc, a = e.childrenStr, _ = e.templateId, p = e.pos, u = (0, import_react$15.useMemo)((function() {
		return a ? JSON.parse(a) : [];
	}), [a]), d = (0, import_react$15.useMemo)((function() {
		return [
			U.PPT,
			U.REPORT,
			U.PAPER
		].includes(_);
	}), [_]);
	return import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter", { "hyc-component-outline__content__chapter--ppt": "ppt" === t }) }, import_react$15.createElement("div", {
		className: "hyc-component-outline__content__chapter__wrapper",
		style: { paddingLeft: "ppt" === t ? 0 : 24 * (c - 1) }
	}, import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__wrapper__content" }, import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__drag" }, import_react$15.createElement(W$1, {
		icon: "drag",
		size: 16
	})), import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__chapter__content") }, "ppt" === t && import_react$15.createElement(en, {
		level: c,
		index: r
	}), d && import_react$15.createElement(nn, {
		pos: p,
		templateId: _
	}), import_react$15.createElement(Z, {
		title: i,
		desc: l,
		type: t,
		level: c
	}))), u.length > 0 && import_react$15.createElement("div", { className: "hyc-component-outline__content__chapter__children" }, u.map((function(e, t) {
		return import_react$15.createElement(rn, {
			key: e.id,
			type: e.type,
			index: r + t + 1,
			title: e.title,
			desc: e.desc,
			level: c + 1,
			templateId: _,
			pos: "".concat(p, "-").concat(t)
		});
	})))));
}
function ln() {
	var e = useDragLayer((function(n) {
		return {
			item: n.getItem(),
			itemType: n.getItemType(),
			initialOffset: n.getInitialSourceClientOffset(),
			currentOffset: n.getSourceClientOffset(),
			isDragging: n.isDragging()
		};
	})), t = e.itemType, c = e.isDragging, i = e.item, l = e.initialOffset, a = e.currentOffset;
	var _ = (0, import_react$15.useMemo)((function() {
		if (!l || !a || null == i || !i.id) return { display: "none" };
		var n = document.querySelector("[data-hyc-ouline-id=\"".concat(i.id, "\"] .hyc-component-outline__content__chapter__wrapper__content"));
		if (n) {
			var e = n.getBoundingClientRect(), t = a.x, o = a.y, c = "translate(".concat(t, "px, ").concat(o, "px)");
			return {
				transform: c,
				WebkitTransform: c,
				width: e.width
			};
		}
	}), [
		l,
		a,
		null == i ? void 0 : i.id
	]);
	return (0, import_react$15.useEffect)((function() {
		var n = document.querySelector(".agent-layout"), e = document.querySelector(".agent-layout__content");
		if (e && n) return c ? (e.classList.add("agent-layout__content--outline-dragging"), n.classList.add("agent-layout--outline-dragging")) : (e.classList.remove("agent-layout__content--outline-dragging"), n.classList.remove("agent-layout--outline-dragging")), function() {
			e?.classList.remove("agent-layout__content--outline-dragging"), n?.classList.remove("agent-layout--outline-dragging");
		};
	}), [c]), c ? (0, import_react_dom$2.createPortal)(import_react$15.createElement("div", { className: "hyc-component-outline__content__drag-layer" }, import_react$15.createElement("div", {
		style: _,
		className: "hyc-component-outline__content__drag-layer__box"
	}, t === G$1.Card ? import_react$15.createElement(rn, i.node) : null)), document.body) : null;
}
function an(e) {
	var t = e.type, o = e.index, c = e.readonly;
	return import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__footer", { "hyc-component-outline__content__footer--ppt": "ppt" === t }) }, import_react$15.createElement(en, {
		level: 0,
		index: o
	}), import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__footer__view", { "hyc-component-outline__content__footer__view--active": !c }) }, "结束页"));
}
function _n() {
	return import_react$15.createElement("span", { className: "hyc-component-outline__content__loading" });
}
function pn(t) {
	var o = t.type, i = t.readonly, l = t.showLoading, _ = a$12((0, import_react$15.useState)(t.header), 2), p = _[0], u = _[1], h = a$12((0, import_react$15.useState)("view"), 2), m = h[0], y = h[1], f = (0, import_react$15.useRef)(null);
	(0, import_react$15.useEffect)((function() {
		t.header !== p && u(t.header);
	}), [t.header]);
	var g = V((function() {
		i || (y("edit"), requestAnimationFrame((function() {
			var n;
			null === (n = f.current) || void 0 === n || n.focus();
		})));
	})), v = V((function(n) {
		u(n);
	})), x = V((function() {
		y("view"), t.onChange(p);
	}));
	return import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__header", { "hyc-component-outline__content__header--ppt": "ppt" === o }) }, "ppt" === o && import_react$15.createElement(en, {
		level: 0,
		index: 0
	}), "view" === m && import_react$15.createElement("div", {
		className: (0, import_classnames$7.default)("hyc-component-outline__content__header__view", { "hyc-component-outline__content__header__view--empty": !p }),
		onClick: g
	}, p || "标题", l && import_react$15.createElement(_n, null)), "edit" === m && import_react$15.createElement("div", { className: "hyc-component-outline__content__header__edit" }, import_react$15.createElement(Q, {
		value: p,
		placeholder: "请输入标题",
		onChange: v,
		ref: f,
		onBlur: x
	})));
}
function un(e) {
	var t = e.type;
	return e.showLoading || "ppt" !== t ? null : import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__toc", { "hyc-component-outline__content__toc--ppt": "ppt" === t }) }, import_react$15.createElement(en, {
		level: 0,
		index: 1
	}), import_react$15.createElement("div", { className: (0, import_classnames$7.default)("hyc-component-outline__content__toc__view") }, "目录"));
}
function dn(n, e) {
	var t = Object.keys(n);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(n);
		e && (o = o.filter((function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function hn(n) {
	for (var e = 1; e < arguments.length; e++) {
		var t = null != arguments[e] ? arguments[e] : {};
		e % 2 ? dn(Object(t), !0).forEach((function(e) {
			r$7(n, e, t[e]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : dn(Object(t)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
		}));
	}
	return n;
}
function mn(n) {
	return n.reduce((function(n, e) {
		return n ? "".concat(n, ".children.").concat(e) : e;
	}), "");
}
function yn(n, e) {
	for (var t = [], o = cloneDeep(e.map((function(n, e) {
		return hn(hn({}, n), {}, { index: e });
	}))), c = o.shift(), r = 0; c && (t.push(c.index), r -= 1, c.id !== n);) c.children && c.children.length > 0 ? (r = c.children.length, o.unshift.apply(o, n$7(c.children.map((function(n, e) {
		return hn(hn({}, n), {}, { index: e });
	})))), c = o.shift()) : (t.pop(), 0 === r && t.pop(), c = o.shift());
	return t.join("-");
}
function fn(n, e) {
	var t = mn(n.split("-")), o = null;
	return t && (o = get(e, t)), o;
}
function gn(e) {
	var t = (0, import_react$15.useContext)(On).Snackbar, i = e.header, l = void 0 === i ? sn.header : i, _ = e.chapters, p = void 0 === _ ? sn.chapters : _, f = e.onDragging, g = e.onChange, v = e.type, x = e.readonly, b = e.disabled, j = e.footer, S = e.scrollSelector, I = e.loading, A = e.templateId, L = e.showTextSeparator, z = a$12((0, import_react$15.useState)(l), 2), R = z[0], B = z[1], M = a$12((0, import_react$15.useState)(p), 2), q = M[0], U = M[1], J = V((function(n) {
		B(n), g?.(n, q);
	})), K = V((function(n, e, t) {
		var o = cloneDeep(q), c = mn(e.split("-"));
		set(o, "".concat(c, ".title"), t.title), set(o, "".concat(c, ".desc"), t.desc), U(o), g?.(R, o);
	})), G = V((function(n) {
		var e = n.pos, t = n.type, o = n.itemType, c = n.descIndex, r = cloneDeep(q), i = e.split("-"), l = Number(i[i.length - 1]);
		"sibling" === t && i.pop();
		var a = mn(i);
		if (!a) {
			var _ = {
				id: n$13(),
				title: "",
				isNew: !0,
				type: v,
				desc: "ppt" === o ? [""] : ""
			};
			r.splice(l + 1, 0, _), U(r), g?.(R, r);
			return;
		}
		var p = get(r, a);
		p.children = p.children || [], "desc" === t && "number" == typeof c && Array.isArray(p.desc) ? p.desc.splice(c, 0, "") : "sibling" === t ? p.children.splice(l + 1, 0, {
			id: n$13(),
			title: "",
			isNew: !0,
			type: v,
			desc: [""]
		}) : "ppt" === o ? p.children.unshift({
			id: n$13(),
			title: "",
			isNew: !0,
			type: v,
			desc: [""]
		}) : p.children.push({
			id: n$13(),
			title: "",
			isNew: !0,
			type: v,
			desc: [""]
		}), U(r), g?.(R, r);
	})), H = V((function(n, e, t) {
		var o = cloneDeep(q), c = e.split("-"), r = Number(c.pop()), i = mn(c);
		if (i) {
			var l = get(o, i);
			if ("number" == typeof (null == t ? void 0 : t.descIndex)) {
				var a = null == l ? void 0 : l.children[r].desc;
				if ("string" == typeof a && 0 === t.descIndex) l.children[r].desc = "";
				else if (Array.isArray(a) && t.descIndex < a.length) {
					var _ = n$7(a);
					_.splice(t.descIndex, 1), l.children[r].desc = _;
				}
			} else {
				var p;
				null == l || null === (p = l.children) || void 0 === p || p.splice(r, 1);
			}
		} else o.splice(r, 1);
		0 === o.length && o.push({
			id: n$13(),
			title: "",
			isNew: !0
		}), U(o), g?.(R, o);
	})), W = V((function(n) {
		f?.(n);
	})), Q = V((function(n, e, t) {
		var o = cloneDeep(q), c = yn(n, o).split("-"), r = Number(c.pop()), i = mn(c), l = null;
		i && (l = get(o, i));
		var a = null;
		if (l) {
			if (l.children && l.children.length > 0) a = a$12(l.children.splice(r, 1), 1)[0];
		} else a = a$12(o.splice(r, 1), 1)[0];
		var u = yn(e, o).split("-"), d = 0, h = "";
		2 === t || (d = Number(u.pop())), 1 === t && (d += 1);
		var m = null;
		(h = mn(u)) && (m = get(o, h)), a && (m ? (m.children = m.children || [], m.children.splice(d, 0, a)) : o.splice(d, 0, a), U(o), g?.(R, o));
	})), X = V((function(n, e, o) {
		var c, r = cloneDeep(q), i = e.split("-"), l = Number(i.pop());
		if ("down" === o) {
			var a = r[l - 1 >= 0 ? l - 1 : l + 1];
			if (!a) return void t.show({
				type: "error",
				message: "不存在其他章节，不可降级"
			});
			var p = [function(n, e) {
				var t = n.split("-"), o = Number(t.pop()), c = mn(t), r = null;
				c && (r = get(e, c));
				var i = null;
				if (r) {
					if (r.children && r.children.length > 0) i = a$12(r.children.splice(o, 1), 1)[0];
				} else i = a$12(e.splice(o, 1), 1)[0];
				return i;
			}(e, r)];
			a.children = a.children || [];
			for (var f = l - 1 >= 0 ? a.children.length : 0; p.length > 0;) {
				var x = p.shift();
				x && (a.children.splice(f, 0, x), "ppt" === v && void 0 === x.desc && (x.desc = [""]), f += 1, x.children && x.children.length > 0 && (p.unshift.apply(p, n$7(x.children)), x.children = void 0));
			}
		} else if ("up" === o) {
			var b = fn(e, r);
			if (!b) return;
			if (!b.children || b.children.length <= 0) return;
			var w = b.children.length - l, O = r$9(c = b.children.splice(l, w)) || e$6(c) || n$12(c) || e$12(), P = O[0], C = O.slice(1);
			C.length > 0 && (P.children = P.children || [], C.forEach((function(n) {
				P.children.push(n);
			}))), "ppt" === v && Array.isArray(P.desc) && (P.desc = void 0);
			var N = i.join("-"), j = Number(i[i.length - 1]), S = fn(N, r);
			S ? S.children && S.children.splice(j, 0, P) : r.splice(j + 1, 0, P);
		}
		U(r), g?.(R, r);
	}));
	(0, import_react$15.useEffect)((function() {
		e.header !== R && e.header && B(e.header);
	}), [e.header]), (0, import_react$15.useEffect)((function() {
		e.chapters !== q && e.chapters && U(e.chapters);
	}), [e.chapters]);
	var $ = (0, import_react$15.useMemo)((function() {
		var n = [], e = {}, t = 2;
		for (q.forEach((function(e) {
			n.push(e);
		})); n.length > 0;) {
			var o = n.shift();
			if (e[o.id] = t, t += 1, null != o && o.children && o.children.length > 0) for (var c = o.children.length - 1; c >= 0; c--) n.unshift(o.children[c]);
		}
		return e;
	}), [q]), Y = (0, import_react$15.useMemo)((function() {
		var n = Object.keys($), e = 0;
		return n.forEach((function(n) {
			$[n] > e && (e = $[n]);
		})), e + 1;
	}), [$]), Z = V((function() {
		var n = cloneDeep(q);
		n.unshift({
			id: n$13(),
			title: "",
			isNew: !0,
			type: "ppt"
		}), g?.(R, n);
	})), nn = (0, import_react$15.useMemo)((function() {
		return "outline-".concat(n$13());
	}), []), en = (0, import_react$15.useMemo)((function() {
		return Boolean(I && q.length <= 0);
	}), [I, q]);
	return import_react$15.createElement("div", {
		className: (0, import_classnames$7.default)("hyc-component-outline__content", {
			"hyc-component-outline__content--ppt": "ppt" === v,
			"hyc-component-outline__content--readonly": !!x,
			"hyc-component-outline__content--disabled": !!b,
			"hyc-component-outline__content--loading": !!I
		}),
		"data-outline-uuid": nn
	}, L && import_react$15.createElement("div", { className: "hyc-component-outline__content-text-separator" }, s$5("outline.text-separator")), import_react$15.createElement(pn, {
		header: R,
		onChange: J,
		type: v,
		onAdd: Z,
		readonly: x,
		showLoading: en
	}), import_react$15.createElement(un, {
		showLoading: en,
		type: v
	}), import_react$15.createElement(DndProvider, {
		backend: TouchBackend,
		options: { enableMouseEvents: !0 }
	}, import_react$15.createElement(cn, {
		chapters: q,
		readonly: x,
		disabled: b,
		indexMap: $,
		onValueChange: K,
		onAdd: G,
		onDelete: H,
		onDragging: W,
		onDrop: Q,
		onPptLevelChange: X,
		outlineUuid: nn,
		scrollSelector: S,
		loading: I,
		templateId: A
	}), import_react$15.createElement(ln, null)), j && import_react$15.createElement(an, {
		readonly: x,
		type: v,
		index: Y
	}));
}
function vn(n, e) {
	var t = Object.keys(n);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(n);
		e && (o = o.filter((function(e) {
			return Object.getOwnPropertyDescriptor(n, e).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function xn(n) {
	for (var e = 1; e < arguments.length; e++) {
		var t = null != arguments[e] ? arguments[e] : {};
		e % 2 ? vn(Object(t), !0).forEach((function(e) {
			r$7(n, e, t[e]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : vn(Object(t)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
		}));
	}
	return n;
}
function bn(n, e, t) {
	return [U.PPT].includes(t) ? n = "".concat(e.join(".")).concat(1 === e.length ? "." : "", " ").concat(n) : [U.PAPER, U.REPORT].includes(t) && (n = 1 === e.length ? "第".concat(e, "章 ").concat(n) : "".concat(e.join(".")).concat(1 === e.length ? "." : "", " ").concat(n)), n;
}
function wn(n, e) {
	var t = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).templateId, o = {
		type: "root",
		children: []
	};
	n && o.children.push({
		type: "heading",
		depth: 1,
		children: [{
			type: "text",
			value: n
		}]
	});
	for (var c = 1, r = [], i = cloneDeep(e).map((function(n) {
		var e, t = null === (e = n.children) || void 0 === e ? void 0 : e.map((function(n) {
			return xn({}, n);
		}));
		return xn(xn({}, n), {}, { children: t });
	})), l = i.shift(); l;) {
		var a = r[r.length - 1];
		0 === a ? (r.pop(), c -= 1) : "number" == typeof a && (r[r.length - 1] = r[r.length - 1] - 1);
		var _ = c + 1;
		if (o.children.push({
			type: "heading",
			depth: _,
			children: [{
				type: "text",
				value: l.title
			}]
		}), l.desc) {
			var p = l.desc;
			"ppt" === l.type && Array.isArray(p) ? o.children.push({
				type: "list",
				children: p.map((function(n) {
					return {
						type: "listItem",
						children: [{
							type: "paragraph",
							children: [{
								type: "text",
								value: n
							}]
						}]
					};
				}))
			}) : o.children.push({
				type: "paragraph",
				children: [{
					type: "text",
					value: p
				}]
			});
		}
		if (l.children && l.children.length > 0) {
			c += 1, r.push(l.children.length);
			var u = l.children.map((function(n) {
				return xn(xn({}, n), {}, { children: n.children || [] });
			}));
			i.unshift.apply(i, n$7(u));
		}
		l = i.shift();
	}
	return {
		text: unified().use(remarkStringify, {
			bullet: "-",
			listItemIndent: "one",
			listItemSpacing: !1,
			tightDefinitions: !0,
			breaks: !0
		}).stringify(o),
		outline: function(n, e, t) {
			var o = t.templateId, c = {
				title: n,
				content: ""
			}, r = [];
			for (e.forEach((function(n, e) {
				r.push({
					value: {
						title: n.title,
						content: n.desc || "",
						wordCount: n.wordCount
					},
					node: n,
					parent: c,
					pos: [e + 1]
				});
			})); r.length > 0;) {
				var i = r.shift();
				if (i.parent.children = i.parent.children || [], i.value.title = bn(i.value.title, i.pos, o), i.parent.children.push(i.value), i.node.children && i.node.children.length > 0) for (var l = i.node.children.length - 1; l >= 0; l--) {
					var a = i.node.children[l];
					r.unshift({
						value: {
							title: a.title,
							content: a.desc || "",
							wordCount: a.wordCount
						},
						node: a,
						parent: i.value,
						pos: i.pos.concat(l + 1)
					});
				}
			}
			return [c];
		}(n, e, { templateId: t || U.NONE })
	};
}
var import_react$15, import_classnames$7, import_react_dom$2, q$1, U, G$1, H, W$1, Q, X, sn, En, On, Pn;
var init_index_be14aca1 = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_index_16c390a4();
	init_slicedToArray_fb5b6502();
	init_toConsumableArray_19ff1ff1();
	init_defineProperty_740d2c7a();
	init_dist();
	init_dist$1();
	init_index_07e2ccf4();
	init_esm$3();
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
	init_lodash();
	init_dist$2();
	init_bottombar_new_sheet();
	init_data_drag();
	init_toolbar_arrange_bring_to_back();
	init_toolbar_arrange_bring_to_front();
	init_toolbar_dele();
	init_style_inject_es_3984fa0f();
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_remark_parse();
	init_remark_stringify();
	init_unified();
	(function(n) {
		n.DOC = "doc", n.PPT = "ppt";
	})(q$1 || (q$1 = {})), function(n) {
		n.PPT = "slide_outline", n.REPORT = "report_outline", n.PAPER = "paper_outline", n.NONE = "";
	}(U || (U = {}));
	e$11(".ai-common-outline-icon {\n  display: block;\n}\n.ai-common-outline-icon:not([data-icon='drag']) {\n  filter: var(--invert-on-dark-mode, none);\n}\n");
	H = {
		downLevel: toolbar_arrange_bring_to_back_default,
		upLevel: toolbar_arrange_bring_to_front_default,
		drag: data_drag_default,
		add: bottombar_new_sheet_default,
		addGrey: bottombar_new_sheet_default,
		delete: toolbar_dele_default
	};
	W$1 = function(e) {
		var t = e.icon, o = e.size, c = void 0 === o ? 24 : o, r = e.style;
		return import_react$15.createElement("img", {
			draggable: "false",
			className: "ai-common-outline-icon",
			"data-icon": t,
			src: H[t],
			style: K(K({}, r), {}, {
				width: c,
				height: c
			})
		});
	};
	(function(n) {
		n.Card = "Card";
	})(G$1 || (G$1 = {}));
	e$11(".hyc-component-outline__content__input {\n  position: relative;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n  flex: 1;\n}\n.hyc-component-outline__content__input__value {\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n  z-index: -1;\n  white-space: pre-line;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.hyc-component-outline__content__input textarea {\n  border: none;\n  outline: none;\n  width: 100%;\n  padding: 0;\n  display: block;\n  font: inherit;\n  font-family: var(--hy-font-family);\n  resize: none;\n  min-height: 22px;\n  overflow: hidden;\n  background-color: var(--bg-lv1-default, #fff);\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.hyc-component-outline__content__input textarea::placeholder {\n  /* Modern browsers */\n  color: var(--text-020, rgba(0, 0, 0, 0.2));\n}\n");
	Q = (0, import_react$15.forwardRef)((function(t, o) {
		var r = t.placeholder, i = (0, import_react$15.useRef)(null), _ = a$12((0, import_react$15.useState)(t.value), 2), p = _[0], u = _[1], h = a$12((0, import_react$15.useState)(0), 2), m = h[0], y = h[1];
		(0, import_react$15.useLayoutEffect)((function() {
			var n = i.current;
			if (n) {
				var e = n.getBoundingClientRect().height;
				y(e);
			}
		}), [p]);
		var f = V((function(n) {
			var e;
			13 === n.keyCode && n.preventDefault(), null === (e = t.onKeydown) || void 0 === e || e.call(t, n);
		})), g = V((function(n) {
			var e;
			u(n.target.value), null === (e = t.onChange) || void 0 === e || e.call(t, n.target.value);
		})), v = V((function() {
			var n, e;
			null === (n = t.onFocus) || void 0 === n || n.call(t);
			var c, r = null !== (e = null == p ? void 0 : p.length) && void 0 !== e ? e : 0;
			o && "current" in o && (null === (c = o.current) || void 0 === c || c.setSelectionRange(r, r));
		}));
		return import_react$15.createElement("div", { className: "hyc-component-outline__content__input" }, import_react$15.createElement("div", {
			ref: i,
			className: "hyc-component-outline__content__input__value"
		}, p || r), import_react$15.createElement("textarea", {
			placeholder: r,
			onKeyDown: f,
			onBlur: t.onBlur,
			onFocus: v,
			value: p,
			onChange: g,
			ref: o,
			style: { height: m }
		}));
	}));
	Q.displayName = "OutlineContentInput";
	e$11(".hyc-component-outline__content__chapter__control {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  display: none;\n}\n.hyc-component-outline__content__chapter__control__item {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  line-height: 24px;\n  color: var(--text-060, rgba(0, 0, 0, 0.6));\n  cursor: pointer;\n}\n.hyc-component-outline__content__chapter__control__item .hyc-common-icon {\n  display: block;\n}\n.hyc-component-outline__content__chapter__control__item svg {\n  display: block;\n}\n.hyc-component-outline__content__chapter__control__item__text {\n  color: var(--text-ultrastrong);\n  text-align: center;\n  /* UI文字/附文_大 */\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  /* 133.333% */\n  white-space: nowrap;\n  display: inline-block;\n  min-width: fit-content;\n}\n");
	X = function(n) {
		n.preventDefault(), n.stopPropagation();
	};
	e$11(".hyc-component-outline__content__chapter__value {\n  cursor: default;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2px;\n  margin-left: 4px;\n}\n.hyc-component-outline__content__chapter__title {\n  width: 100%;\n  line-height: 34px;\n  display: flex;\n  padding: 0px 16px 0px 8px;\n  justify-content: space-between;\n  align-items: center;\n  border-radius: 4px;\n}\n.hyc-component-outline__content__chapter__title__text {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n}\n.hyc-component-outline__content__chapter__title--view:hover {\n  background: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n}\n.hyc-component-outline__content__chapter__title--view:hover .hyc-component-outline__content__chapter__control {\n  display: flex;\n}\n.hyc-component-outline__content__chapter__title--edit {\n  border: 1px solid var(--accent-default, #1e6fff);\n  border-radius: 8px;\n}\n.hyc-component-outline__content__chapter__title--edit .hyc-component-outline__content__input {\n  flex: 1;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 34px;\n  min-height: 34px;\n}\n.hyc-component-outline__content__chapter__title--edit .hyc-component-outline__content__input textarea {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.hyc-component-outline__content__chapter__desc {\n  line-height: 22px;\n  width: 100%;\n  display: flex;\n  padding: 0px 16px 0px 8px;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  position: relative;\n}\n.hyc-component-outline__content__chapter__desc__text {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 22px;\n}\n.hyc-component-outline__content__chapter__desc__text--empty {\n  color: var(--text-weak, rgba(0, 0, 0, 0.64));\n}\n.hyc-component-outline__content__chapter__desc--view:hover {\n  background: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n}\n.hyc-component-outline__content__chapter__desc--view:hover .hyc-component-outline__content__chapter__control {\n  display: flex;\n}\n.hyc-component-outline__content__chapter__desc--edit {\n  border: 1px solid var(--accent-default, #1e6fff);\n  border-radius: 8px;\n}\n.hyc-component-outline__content__chapter__desc--edit .hyc-component-outline__content__input {\n  flex: 1;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 22px;\n  min-height: 22px;\n}\n.hyc-component-outline__content__chapter__desc--edit .hyc-component-outline__content__input textarea {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__title {\n  height: 34px;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__title__text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__title .hyc-component-outline__content__input__value,\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__title textarea {\n  resize: none;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__desc {\n  height: 22px;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__desc__text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__desc .hyc-component-outline__content__input__value,\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__desc textarea {\n  resize: none;\n  overflow: hidden;\n  white-space: nowrap;\n}\n");
	e$11(".hyc-component-outline__content__chapter__num {\n  font-size: 16px;\n  line-height: 24px;\n  color: var(--text-090, rgba(0, 0, 0, 0.9));\n  font-weight: 500;\n  padding: 5px 4px 5px 8px;\n}\n.hyc-component-outline__content__chapter__num--level-1 {\n  padding-right: 7px;\n}\n");
	e$11(".hyc-component-outline__content__chapter__ppt-type {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  height: 34px;\n  justify-content: flex-end;\n}\n.hyc-component-outline__content__chapter__ppt-type__text {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 160%;\n  /* 25.6px */\n}\n.hyc-component-outline__content__chapter__ppt-type__icon {\n  display: flex;\n  padding: 4px;\n  margin: 0 8px;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  border-radius: 4px;\n  background: var(--tsp-fill-medium, rgba(29, 79, 106, 0.08));\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  text-align: center;\n  font-family: 'PingFang SC';\n  font-size: 10px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 12px;\n  /* 120% */\n}\n.hyc-component-outline__content__chapter__ppt-type__icon--empty {\n  width: 20px;\n  background: transparent;\n}\n");
	e$11(".hyc-component-outline__content__chapter {\n  position: relative;\n  cursor: default;\n}\n.hyc-component-outline__content__chapter--edit > .hyc-component-outline__content__chapter__wrapper .hyc-component-outline__content__chapter__drag {\n  cursor: not-allowed;\n}\n.hyc-component-outline__content__chapter--dragging .hyc-component-outline__content__chapter__wrapper {\n  opacity: 0.2;\n}\n.hyc-component-outline__content__chapter--dragging .hyc-component-outline__content__chapter__add-indicator {\n  display: none;\n}\n.hyc-component-outline__content__chapter--no-drag .hyc-component-outline__content__chapter__drag {\n  opacity: 0;\n  pointer-events: none;\n}\n.hyc-component-outline__content__chapter--no-drop .hyc-component-outline__content__chapter__content--hover-up::before,\n.hyc-component-outline__content__chapter--no-drop .hyc-component-outline__content__chapter__content--hover-down::before {\n  display: none;\n}\n.hyc-component-outline__content__chapter--ppt[data-hyc-outline-level='1'] .hyc-component-outline__content__chapter__wrapper {\n  position: relative;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__wrapper {\n  padding-top: 4px;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__children .hyc-component-outline__content__chapter__wrapper {\n  padding-top: 4px;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__content {\n  display: flex;\n  align-items: flex-start;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__ppt-type {\n  flex: none;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__value,\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__edit {\n  flex: 1;\n  min-width: 0;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__drag {\n  margin-top: 7px;\n  display: flex;\n  width: 20px;\n  height: 20px;\n  align-items: center;\n  flex-shrink: 0;\n}\n.hyc-component-outline__content__chapter--ppt .hyc-component-outline__content__chapter__num {\n  padding: 8px 4px 8px 8px;\n}\n.hyc-component-outline__content__chapter__wrapper {\n  padding-top: 12px;\n}\n.hyc-component-outline__content__chapter__wrapper__content {\n  display: flex;\n  align-items: flex-start;\n}\n.hyc-component-outline__content__chapter__content {\n  flex: 1;\n  min-width: 0;\n  position: relative;\n  display: flex;\n  align-items: flex-start;\n}\n.hyc-component-outline__content__chapter__content--hover-up::before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background-color: var(--accent-default, #1e6fff);\n}\n.hyc-component-outline__content__chapter__content--hover-up .hyc-component-outline__content__chapter__value {\n  background-color: transparent;\n}\n.hyc-component-outline__content__chapter__content--hover-up .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control {\n  display: none;\n}\n.hyc-component-outline__content__chapter__content--hover-down::before {\n  content: '';\n  display: block;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background-color: var(--accent-default, #1e6fff);\n}\n.hyc-component-outline__content__chapter__content--hover-down--child::before {\n  left: 24px;\n}\n.hyc-component-outline__content__chapter__content--hover-down .hyc-component-outline__content__chapter__value {\n  background-color: transparent;\n}\n.hyc-component-outline__content__chapter__content--hover-down .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control {\n  display: none;\n}\n.hyc-component-outline__content__chapter__content .hyc-component-outline__content__chapter__value,\n.hyc-component-outline__content__chapter__content .hyc-component-outline__content__chapter__edit {\n  flex: 1;\n  min-width: 0;\n}\n.hyc-component-outline__content__chapter__drag {\n  color: rgba(51, 51, 51, 0.4);\n  cursor: move;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  margin-top: 5px;\n}\n.hyc-component-outline__content__chapter__drag .ai-common-outline-icon {\n  width: 7px !important;\n  height: 13px !important;\n}\n.hyc-component-outline__content__chapter__drag svg {\n  display: block;\n}\n.hyc-component-outline__content__chapter__children .hyc-component-outline__content__chapter__drag {\n  left: 6px;\n}\n.hyc-component-outline__content__chapter__children .hyc-component-outline__content__chapter__wrapper {\n  padding-top: 6px;\n}\n");
	e$11(".hyc-component-outline__content__drag-layer {\n  position: fixed;\n  pointer-events: none;\n  z-index: 9999;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.hyc-component-outline__content__drag-layer__box {\n  background-color: var(--bg-lv3-default);\n  border-radius: 8px;\n  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);\n}\n.hyc-component-outline__content__drag-layer__box > .hyc-component-outline__content__chapter > .hyc-component-outline__content__chapter__wrapper {\n  padding-top: 0;\n}\n.agent-layout--outline-dragging * {\n  cursor: grabbing !important;\n  user-select: none !important;\n}\n.agent-layout__content--outline-dragging {\n  z-index: 8;\n}\n.agent-layout__content--outline-dragging .hyc-component-outline__content__chapter__add-indicator {\n  display: none !important;\n}\n.agent-layout__content--outline-scrolling .hyc-component-outline__content__chapter__content--hover-up::before,\n.agent-layout__content--outline-scrolling .hyc-component-outline__content__chapter__content--hover-down::before {\n  display: none !important;\n}\n");
	e$11(".hyc-component-outline__content__footer--ppt {\n  display: flex;\n  align-items: flex-start;\n  padding-left: 20px;\n}\n.hyc-component-outline__content__footer--ppt .hyc-component-outline__content__footer__view {\n  margin-left: 4px;\n  flex: 1;\n  padding: 0px 16px 0px 8px;\n  height: 34px;\n  line-height: 34px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n}\n.hyc-component-outline__content__footer__view {\n  padding: 8px;\n  color: var(--text-040, rgba(0, 0, 0, 0.4));\n  font-size: 20px;\n  line-height: 30px;\n  font-weight: 500;\n  border-radius: 12px;\n  cursor: default;\n}\n.hyc-component-outline__content__footer__view--active {\n  cursor: pointer;\n}\n.hyc-component-outline__content__footer__view--active:hover {\n  background: var(--bg-lv2-gray, #f5f6f8);\n}\n");
	e$11(".hyc-component-outline__content__loading {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin-left: 8px;\n  margin-right: 8px;\n  position: relative;\n}\n.hyc-component-outline__content__loading::before,\n.hyc-component-outline__content__loading::after {\n  content: '';\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n.hyc-component-outline__content__loading::before {\n  background: var(--accent-default, #1e6fff);\n  margin-left: -5px;\n  margin-top: -5px;\n  animation: inner 1.4s linear infinite;\n}\n.hyc-component-outline__content__loading::after {\n  border: 1px solid var(--accent-default, #1e6fff);\n  left: 50%;\n  top: 50%;\n  box-sizing: border-box;\n  animation: outer 1.4s linear infinite;\n  transform: translate(-50%, -50%);\n}\n@keyframes inner {\n  0% {\n    transform: scale(1);\n  }\n  40% {\n    transform: scale(0.8);\n  }\n  70%,\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes outer {\n  0%,\n  69% {\n    opacity: 0;\n  }\n  70% {\n    opacity: 1;\n    width: 10px;\n    height: 10px;\n  }\n  100% {\n    opacity: 0;\n    width: 24px;\n    height: 24px;\n  }\n}\n");
	e$11(".hyc-component-outline__content__header--ppt {\n  display: flex;\n  align-items: flex-start;\n  padding-left: 20px;\n  position: relative;\n}\n.hyc-component-outline__content__header--ppt .hyc-component-outline__content__header__edit {\n  flex: 1;\n  min-width: 0;\n  padding: 4px 16px 4px 8px;\n  margin-left: 4px;\n}\n.hyc-component-outline__content__header--ppt .hyc-component-outline__content__header__edit .hyc-component-outline__content__input {\n  font-size: 16px;\n  line-height: 24px;\n}\n.hyc-component-outline__content__header--ppt .hyc-component-outline__content__header__edit .hyc-component-outline__content__input textarea {\n  min-height: 24px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.hyc-component-outline__content__header--ppt .hyc-component-outline__content__header__view {\n  margin-left: 4px;\n  flex: 1;\n  padding: 0px 16px 0px 8px;\n  line-height: 34px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.hyc-component-outline__content__header__view {\n  padding: 8px;\n  color: var(--text-090, rgba(0, 0, 0, 0.9));\n  font-size: 20px;\n  line-height: 30px;\n  font-weight: 500;\n  border-radius: 4px;\n  cursor: default;\n}\n.hyc-component-outline__content__header__view:hover {\n  background: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n}\n.hyc-component-outline__content__header__view--empty {\n  color: var(--text-020, rgba(0, 0, 0, 0.2));\n}\n.hyc-component-outline__content__header__edit {\n  padding: 7px;\n  border: 1px solid var(--accent-default, #1e6fff);\n  border-radius: 4px;\n}\n.hyc-component-outline__content__header__edit .hyc-component-outline__content__input {\n  font-size: 20px;\n  line-height: 30px;\n}\n.hyc-component-outline__content__header__edit .hyc-component-outline__content__input textarea {\n  color: var(--text-090, rgba(0, 0, 0, 0.9));\n  min-height: 30px;\n}\n");
	e$11(".hyc-component-outline__content__toc--ppt {\n  display: flex;\n  align-items: flex-start;\n  padding-left: 20px;\n}\n.hyc-component-outline__content__toc--ppt .hyc-component-outline__content__toc__view {\n  margin-left: 4px;\n  flex: 1;\n  padding: 0px 16px 0px 8px;\n  height: 34px;\n  line-height: 34px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 600;\n}\n");
	e$11(".hyc-component-outline__content {\n  user-select: none;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__drag {\n  display: none;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__header__view:hover {\n  background-color: transparent;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control {\n  display: none;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__value:hover {\n  background-color: transparent;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__title:hover,\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__desc:hover {\n  background-color: transparent;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__chapter__add-indicator {\n  display: none;\n}\n.hyc-component-outline__content--readonly .hyc-component-outline__content__header--ppt,\n.hyc-component-outline__content--readonly .hyc-component-outline__content__toc--ppt,\n.hyc-component-outline__content--readonly .hyc-component-outline__content__footer--ppt {\n  padding-left: 0;\n}\n.hyc-component-outline__content--disabled .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control {\n  display: none;\n}\n.hyc-component-outline__content--disabled .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control__item {\n  pointer-events: none;\n  opacity: 0;\n}\n.hyc-component-outline__content--disabled .hyc-component-outline__content__chapter__add-indicator {\n  display: none;\n}\n.hyc-component-outline__content--loading:not(.hyc-component-outline__content--readonly) .hyc-component-outline__content__chapter__value .hyc-component-outline__content__chapter__control {\n  display: flex;\n}\n.hyc-component-outline__content .hyc-component-outline__content-text-separator {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 160%;\n  /* 25.6px */\n}\n.hyc-component-outline__content .hyc-component-outline__content-text-separator::after {\n  display: block;\n  content: '';\n  width: 100%;\n  height: 1px;\n  margin: 20px 0;\n  background: var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.outline-drag-stop-scroll.agent-chat__list__content-wrapper {\n  overflow-y: hidden;\n}\n");
	sn = {
		header: "AI:经济变革的双刃剑",
		chapters: [{
			id: "c47d2728b64f6",
			title: "第 1 章：AI 对经济增长的推动作用",
			children: [{
				id: "79ebb06dc70bc",
				title: "1.1 生产效率变革",
				desc: "本段分析 AI 如何通过提高生产效率、催生新产业等途径促进经济增长。"
			}, {
				id: "BagwIJ2LQXnNA",
				title: "1.2 不同国家和地区的具体影响",
				desc: "探讨大模型、AI 原生应用等对经济的具体影响，以及不同国家和地区在 AI 发展中的优势和机遇。"
			}]
		}, {
			id: "5IK1LJAMiENos",
			title: "第 2 章：AI 对经济就业形势的影响",
			desc: "本段分析 AI 如何通过提高生产效率、催生新产业等途径促进经济增长。"
		}]
	};
	En = function(t) {
		var i = t.loading, l = t.value, a = t.onDragging, u = t.type, d = void 0 === u ? q$1.DOC : u, h = t.readonly, m = t.config, y = t.disabled, f = t.scrollSelector, g = t.showTextSeparator, x = a$12((0, import_react$15.useState)(""), 2), b = x[0], w = x[1], O = a$12((0, import_react$15.useState)(""), 2), C = O[0], D = O[1], k = a$12((0, import_react$15.useState)([]), 2), j = k[0], S = k[1], A = a$12((0, import_react$15.useState)(""), 2), L = A[0], T = A[1], R = a$12((0, import_react$15.useState)(!1), 2), F = R[0], J = R[1], K = (0, import_react$15.useMemo)((function() {
			var n;
			return (null == m || null === (n = m.writingInfo) || void 0 === n ? void 0 : n.templateID) || U.NONE;
		}), [m]), G = V(function() {
			var n = n$8(s$3.mark((function n(e, o) {
				var c, r, i, l;
				return s$3.wrap((function(n) {
					for (;;) switch (n.prev = n.next) {
						case 0: D(e), S(o), r = wn(e, o, {
							type: d,
							templateId: K
						}), i = r.text, l = r.outline, w(i), null === (c = t.onChange) || void 0 === c || c.call(t, {
							text: i,
							outline: l,
							fileType: d
						});
						case 5:
						case "end": return n.stop();
					}
				}), n);
			})));
			return function(e, t) {
				return n.apply(this, arguments);
			};
		}()), H = (0, import_react$15.useRef)(!1);
		return (0, import_react$15.useEffect)((function() {
			return function() {
				H.current = !0;
			};
		}), []), (0, import_react$15.useEffect)((function() {
			if (b !== l) {
				w(l), J(!!i);
				var n = function(n) {
					var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = e.config, o = e.type, c = e.loading, r = unified().use(remarkParse).parse(n), i = "", l = [], a = [], _ = {};
					r.children.forEach((function(n) {
						if ("heading" !== n.type || 1 !== n.depth) {
							if ("heading" === n.type) {
								var e, c = n.depth - 1;
								a[c] = a[c] || [], (a = a.slice(0, c + 1))[c].push(1);
								var r = null === (e = n.children) || void 0 === e ? void 0 : e[0];
								if (r && "text" === r.type || !r) {
									var p, u = r && "text" === r.type ? r.value : "";
									[
										U.PPT,
										U.PAPER,
										U.REPORT
									].includes((null == t || null === (p = t.writingInfo) || void 0 === p ? void 0 : p.templateID) || U.NONE) && (u = u.replace(/^(\d+\.\d+|\d+\.|第\d+章)\s?/, ""));
									var d = {
										id: n$13(),
										title: u,
										type: o
									}, h = a.reduce((function(n, e) {
										return "".concat(n).concat(n ? "-" : "").concat(e.length);
									}), "");
									if (_[h] = d, 2 === n.depth) return void l.push(d);
									for (var s = l[l.length - 1], m = n.depth - 1; m > 2;) s.children = s.children || [], s = s.children[s.children.length - 1], m -= 1;
									s.children = s.children || [], s.children.push(d);
								}
							}
							if ("paragraph" === n.type) {
								var y, f = null === (y = n.children) || void 0 === y ? void 0 : y[0];
								if (f && "text" === f.type) {
									for (var g = l[l.length - 1]; null !== (v = g) && void 0 !== v && v.children && g.children.length > 0;) {
										var v;
										g = g.children[g.children.length - 1];
									}
									g && (g.desc = f.value);
								}
							}
							if ("list" === n.type) {
								for (var x, b = null === (x = n.children) || void 0 === x ? void 0 : x.filter((function(n) {
									return "listItem" === n.type;
								})), w = l[l.length - 1]; null !== (E = w) && void 0 !== E && E.children && w.children.length > 0;) {
									var E;
									w = w.children[w.children.length - 1];
								}
								(null == b ? void 0 : b.length) > 0 && (w.desc = b.map((function(n) {
									var e, t = null === (e = n.children) || void 0 === e ? void 0 : e[0];
									if (t && "paragraph" === t.type) {
										var o, c = null === (o = t.children) || void 0 === o ? void 0 : o[0];
										if (c && "text" === c.type) return c.value;
									}
									return "";
								})));
							}
						} else {
							var O, C = null === (O = n.children) || void 0 === O ? void 0 : O[0];
							C && "text" === C.type && (i = C.value);
						}
					})), Object.keys(_).forEach((function(n) {
						var e = _[n];
						null != t && t.chapter && null != t && t.chapter[n] && Object.keys(t.chapter[n]).forEach((function(o) {
							e[o] = t.chapter[n][o];
						}));
					}));
					var p = "";
					return c || "ppt" !== o || (p = "结束页"), {
						header: i,
						chapters: l,
						footer: p
					};
				}(l, {
					type: d,
					config: m,
					loading: i
				});
				if (H.current) return;
				D(n.header), S(n.chapters), T(n.footer);
			}
		}), [l, i]), F && !b ? import_react$15.createElement(_n, null) : import_react$15.createElement(gn, {
			header: C,
			chapters: j,
			onDragging: a,
			onChange: G,
			type: d,
			readonly: h,
			disabled: y,
			footer: L,
			scrollSelector: f,
			loading: F,
			templateId: K,
			showTextSeparator: g
		});
	};
	On = import_react$15.createContext({
		Tooltip: function() {
			return null;
		},
		Modal: { confirm: function() {} },
		Snackbar: { show: function() {} }
	});
	Pn = function(e) {
		return function(t) {
			return import_react$15.createElement(On.Provider, { value: e }, import_react$15.createElement(En, t));
		};
	};
}));
var init_with_outline_factory = __esmMin((() => {
	require_react();
	init_index_be14aca1();
	require_classnames();
	require_react_dom();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/chunks/index-a8948600.js
function a$6() {
	return a$6 = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var o = arguments[n];
			for (var t in o) ({}).hasOwnProperty.call(o, t) && (e[t] = o[t]);
		}
		return e;
	}, a$6.apply(null, arguments);
}
function c$4(e, n) {
	if (null == e) return {};
	var o, t, r = function(e, n) {
		if (null == e) return {};
		var o = {};
		for (var t in e) if ({}.hasOwnProperty.call(e, t)) {
			if (n.includes(t)) continue;
			o[t] = e[t];
		}
		return o;
	}(e, n);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (t = 0; t < a.length; t++) o = a[t], n.includes(o) || {}.propertyIsEnumerable.call(e, o) && (r[o] = e[o]);
	}
	return r;
}
function s$2(e, n) {
	var o = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var t = Object.getOwnPropertySymbols(e);
		n && (t = t.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), o.push.apply(o, t);
	}
	return o;
}
function l$3(n) {
	for (var o = 1; o < arguments.length; o++) {
		var t = null != arguments[o] ? arguments[o] : {};
		o % 2 ? s$2(Object(t), !0).forEach((function(o) {
			r$7(n, o, t[o]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : s$2(Object(t)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
		}));
	}
	return n;
}
var import_react$13, import_classnames$5, i$3, p$1, m$2;
var init_index_a8948600 = __esmMin((() => {
	init_defineProperty_740d2c7a();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-common-atom-icon-container {\n  cursor: pointer;\n  display: block;\n}\n.ai-component-common-atom-icon-container-hoverable {\n  border-radius: 2px;\n}\n.ai-component-common-atom-icon-container-hoverable:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-common-atom-icon-container .ai-component-common-atom-icon {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.ai-component-common-atom-icon {\n  background-color: var(--icon-strong, #464d5a);\n  display: block;\n}\n");
	i$3 = [
		"src",
		"size",
		"style",
		"onClick",
		"hoverable",
		"className",
		"displayType"
	];
	p$1 = "ai-component-common-atom-icon";
	m$2 = function(r) {
		var s = r.src, m = r.size, u = void 0 === m ? 24 : m, b = r.style, f = r.onClick, y = r.hoverable, k = r.className, d = r.displayType, g = void 0 === d ? "mask" : d, h = c$4(r, i$3), v = (0, import_react$13.useMemo)((function() {
			var e = f ? { cursor: "pointer" } : {};
			return l$3(l$3("mask" === g ? {
				maskImage: "url(\"".concat(s, "\")"),
				WebkitMaskImage: "url(\"".concat(s, "\")"),
				maskSize: "".concat(u, "px ").concat(u, "px"),
				WebkitMaskSize: "".concat(u, "px ").concat(u, "px"),
				maskRepeat: "no-repeat",
				WebkitMaskRepeat: "no-repeat",
				maskPosition: "center",
				WebkitMaskPosition: "center",
				width: u,
				height: u
			} : {
				backgroundImage: "url(\"".concat(s, "\")"),
				backgroundColor: "unset",
				backgroundSize: "".concat(u, "px ").concat(u, "px"),
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				width: u,
				height: u
			}, e), b);
		}), [
			s,
			g,
			u,
			b,
			f
		]);
		return y ? import_react$13.createElement("span", {
			className: (0, import_classnames$5.default)("".concat(p$1, "-container"), r$7({}, "".concat(p$1, "-container-hoverable"), y)),
			style: l$3({
				width: u,
				height: u
			}, b),
			onClick: f
		}, import_react$13.createElement("span", a$6({
			className: (0, import_classnames$5.default)(p$1, k),
			style: v
		}, h))) : import_react$13.createElement("span", a$6({
			className: (0, import_classnames$5.default)(p$1, k),
			onClick: f,
			style: v
		}, h));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/with-ai-context-provider/index.js
var import_react$12, t$6;
var init_with_ai_context_provider = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_index_9dc8fb5d();
	t$6 = import_react$12.createContext({ source: R$1.SOURCE_UNSPECIFIED });
}));
var init_codeblock_light_24 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/copylink_outline_24.svg
var copylink_outline_24_default;
var init_copylink_outline_24 = __esmMin((() => {
	copylink_outline_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.5%205.25H18.25V15V15.75V17H19.5V5C19.5%204.44772%2019.0523%204%2018.5%204H6.5V5.25H7.75H9.5ZM5.25%2018.25V7.75H15.75V18.25H5.25ZM4%207.5C4%206.94772%204.44772%206.5%205%206.5H16C16.5523%206.5%2017%206.94772%2017%207.5V18.5C17%2019.0523%2016.5523%2019.5%2016%2019.5H5C4.44772%2019.5%204%2019.0523%204%2018.5V7.5Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e";
}));
var init_tick_outline_light_24 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/liner_arrow_down_24.svg
var liner_arrow_down_24_default;
var init_liner_arrow_down_24 = __esmMin((() => {
	liner_arrow_down_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%209.88608L17.1304%209L12%2014.2278L6.86957%209L6%209.88608L12%2016L18%209.88608Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/icon_primary_arrow_up.svg
var icon_primary_arrow_up_default;
var init_icon_primary_arrow_up = __esmMin((() => {
	icon_primary_arrow_up_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%2014.1139L17.1304%2015L12%209.77215L6.86957%2015L6%2014.1139L12%208L18%2014.1139Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/legacy-button/index.js
var import_react$11, a$5;
var init_legacy_button = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_style_inject_es_3984fa0f();
	e$11(".ai-assistant-sdk-button {\n  display: flex;\n  height: 28px;\n  padding: 0 8px;\n  justify-content: center;\n  align-items: center;\n  width: fit-content;\n  gap: 2px;\n  border-radius: 4px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background: var(--bg-lv4-default, #fff);\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  text-align: center;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  cursor: pointer;\n  box-sizing: border-box;\n  white-space: nowrap;\n}\n.ai-assistant-sdk-button:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-assistant-sdk-button.ai-assistant-sdk-button--primary {\n  background: var(--accent-default, #1e6fff);\n  color: #fff;\n  border: 0px;\n}\n.ai-assistant-sdk-button.ai-assistant-sdk-button--primary:hover {\n  background: var(--accent-hover, #175ceb);\n}\n.ai-assistant-sdk-button.ai-assistant-sdk-button--primary--disable {\n  background: var(--accent-default, #1e6fff);\n  opacity: 0.5;\n  color: var(--text-white, #fff);\n  border: 0px;\n}\n.ai-assistant-sdk-button--disable {\n  background: var(--bg-lv4-default, #fff);\n  color: var(--text-ultraweak, rgba(0, 0, 0, 0.16));\n}\n.ai-assistant-sdk-button.ai-assistant-sdk-button--disable {\n  cursor: not-allowed;\n}\n");
	a$5 = function(t) {
		return import_react$11.createElement("button", {
			className: "ai-assistant-sdk-button ".concat(t.disable ? "".concat(t.type ? "ai-assistant-sdk-button--".concat(t.type, "--disable  ai-assistant-sdk-button--disable") : "") : "".concat(t.type ? "ai-assistant-sdk-button--".concat(t.type) : "")),
			onClick: function() {
				var n;
				t.disable || null === (n = t.onClick) || void 0 === n || n.call(t);
			},
			onMouseDown: function(n) {
				var a;
				t.disable || null === (a = t.onMouseDown) || void 0 === a || a.call(t, n);
			}
		}, t.icon, t.text);
	};
}));
var init_tick_white_outline_light_24 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/list_16_link_blue.svg
var list_16_link_blue_default;
var init_list_16_link_blue = __esmMin((() => {
	list_16_link_blue_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3elist_16_link_blue%3c/title%3e%3cg%20id='PC&amp;Mobile链接多态切换'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='资源_链接多态切换'%20transform='translate(-44.000000,%20-224.000000)'%3e%3cg%20id='编组'%20transform='translate(44.000000,%20128.000000)'%3e%3cg%20transform='translate(0.000000,%2096.000000)'%20id='list_link_blue'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='16'%20height='16'%20rx='1.33333333'%3e%3c/rect%3e%3cpath%20d='M4.61366612,8%20C4.76951783,8.15585171%204.76951783,8.40853727%204.61366612,8.56438898%20L4.04927714,9.12877796%20L4.04927714,9.12877796%20C3.27001857,9.90803653%203.27001857,11.1714643%204.04927714,11.9507229%20C4.79736536,12.6988111%205.99166392,12.7287346%206.77544897,12.0404934%20L6.87122204,11.9507229%20L8.56438898,10.2575559%20C9.34364755,9.47829735%209.34364755,8.21486959%208.56438898,7.43561102%20C8.46786147,7.33908351%208.36390485,7.25451295%208.25435964,7.18189935%20L8.82661112,6.60905606%20C8.93194836,6.68803206%209.03297664,6.77542072%209.12877796,6.87122204%20C10.21974,7.96218403%2010.21974,9.73098291%209.12877796,10.8219449%20L7.43561102,12.5151118%20C6.34464903,13.6060738%204.57585015,13.6060738%203.48488816,12.5151118%20C2.39392617,11.4241498%202.39392617,9.65535097%203.48488816,8.56438898%20L4.04927714,8%20C4.20512885,7.84414829%204.45781441,7.84414829%204.61366612,8%20Z%20M8.56438898,3.48488816%20C9.65535097,2.39392617%2011.4241498,2.39392617%2012.5151118,3.48488816%20C13.6060738,4.57585015%2013.6060738,6.34464903%2012.5151118,7.43561102%20L11.9507229,8%20C11.7948711,8.15585171%2011.5421856,8.15585171%2011.3863339,8%20C11.2304822,7.84414829%2011.2304822,7.59146273%2011.3863339,7.43561102%20L11.9507229,6.87122204%20L11.9507229,6.87122204%20C12.7299814,6.09196347%2012.7299814,4.82853571%2011.9507229,4.04927714%20C11.2026346,3.30118892%2010.0083361,3.27126539%209.22455103,3.95950655%20L9.12877796,4.04927714%20L7.43561102,5.74244408%20C6.65635245,6.52170265%206.65635245,7.78513041%207.43561102,8.56438898%20C7.53233963,8.66111759%207.63652833,8.74583937%207.74632509,8.81855433%20L7.17403386,9.39142736%20C7.06846402,9.3123246%206.96721888,9.22477479%206.87122204,9.12877796%20C5.78026005,8.03781597%205.78026005,6.26901709%206.87122204,5.1780551%20L8.56438898,3.48488816%20Z'%20id='形状'%20fill='%231E6FFF'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/expand_24.svg
var expand_24_default;
var init_expand_24 = __esmMin((() => {
	expand_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.80889%2013.3089L10.6916%2014.1916L7.134%2017.752L9.99163%2017.7512V19H5V14.0049H6.24791L6.247%2016.873L9.80889%2013.3089ZM14.1911%2010.6911L13.3084%209.80841L16.867%206.248L14.0084%206.24878V5H19V9.99512H17.7521L17.753%207.127L14.1911%2010.6911Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/with-markdown-factory/index.js
function pe(e, n) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		n && (a = a.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), r.push.apply(r, a);
	}
	return r;
}
function me(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? pe(Object(r), !0).forEach((function(n) {
			r$7(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pe(Object(r)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
		}));
	}
	return e;
}
function ye(e, n) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		n && (a = a.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), r.push.apply(r, a);
	}
	return r;
}
function je(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? ye(Object(r), !0).forEach((function(n) {
			r$7(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ye(Object(r)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
		}));
	}
	return e;
}
var import_react$10, import_classnames$4, oe, ce, le, se, de, ue, he, fe, ge, we, be, ke, _e, ve, xe, Ee, Ae, De;
var init_with_markdown_factory = __esmMin((() => {
	init_slicedToArray_fb5b6502();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_esm$3();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	init_index_a8948600();
	init_toConsumableArray_19ff1ff1();
	init_defineProperty_740d2c7a();
	init_react_error_boundary_esm();
	init_react_markdown();
	init_rehype_katex();
	init_rehype_sanitize();
	init_remark_breaks();
	init_remark_gfm();
	init_remark_math();
	init_index_07e2ccf4();
	init_with_ai_context_provider();
	init_index_9dc8fb5d();
	init_codeblock_light_24();
	init_copylink_outline_24();
	init_tick_outline_light_24();
	init_common();
	init_style_inject_es_3984fa0f();
	init_liner_arrow_down_24();
	init_icon_primary_arrow_up();
	init_index_16c390a4();
	init_legacy_button();
	init_esm$5();
	init_tick_white_outline_light_24();
	init_esm$1();
	init_lodash();
	init_list_16_link_blue();
	init_esm$4();
	init_expand_24();
	init_preload_helper();
	oe = /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/g;
	ce = /<span classname="ai-sentence-loading-dot"><\/span>/gi;
	e$11("pre code.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 1em\n}\ncode.hljs {\n  padding: 3px 5px\n}\n/*!\n  Theme: GitHub\n  Description: Light theme as seen on github.com\n  Author: github.com\n  Maintainer: @Hirse\n  Updated: 2021-05-15\n\n  Outdated base version: https://github.com/primer/github-syntax-light\n  Current colors taken from GitHub's CSS\n*/\n.hljs {\n  color: #24292e;\n  background: #ffffff\n}\n.hljs-doctag,\n.hljs-keyword,\n.hljs-meta .hljs-keyword,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-type,\n.hljs-variable.language_ {\n  /* prettylights-syntax-keyword */\n  color: #d73a49\n}\n.hljs-title,\n.hljs-title.class_,\n.hljs-title.class_.inherited__,\n.hljs-title.function_ {\n  /* prettylights-syntax-entity */\n  color: #6f42c1\n}\n.hljs-attr,\n.hljs-attribute,\n.hljs-literal,\n.hljs-meta,\n.hljs-number,\n.hljs-operator,\n.hljs-variable,\n.hljs-selector-attr,\n.hljs-selector-class,\n.hljs-selector-id {\n  /* prettylights-syntax-constant */\n  color: #005cc5\n}\n.hljs-regexp,\n.hljs-string,\n.hljs-meta .hljs-string {\n  /* prettylights-syntax-string */\n  color: #032f62\n}\n.hljs-built_in,\n.hljs-symbol {\n  /* prettylights-syntax-variable */\n  color: #e36209\n}\n.hljs-comment,\n.hljs-code,\n.hljs-formula {\n  /* prettylights-syntax-comment */\n  color: #6a737d\n}\n.hljs-name,\n.hljs-quote,\n.hljs-selector-tag,\n.hljs-selector-pseudo {\n  /* prettylights-syntax-entity-tag */\n  color: #22863a\n}\n.hljs-subst {\n  /* prettylights-syntax-storage-modifier-import */\n  color: #24292e\n}\n.hljs-section {\n  /* prettylights-syntax-markup-heading */\n  color: #005cc5;\n  font-weight: bold\n}\n.hljs-bullet {\n  /* prettylights-syntax-markup-list */\n  color: #735c0f\n}\n.hljs-emphasis {\n  /* prettylights-syntax-markup-italic */\n  color: #24292e;\n  font-style: italic\n}\n.hljs-strong {\n  /* prettylights-syntax-markup-bold */\n  color: #24292e;\n  font-weight: bold\n}\n.hljs-addition {\n  /* prettylights-syntax-markup-inserted */\n  color: #22863a;\n  background-color: #f0fff4\n}\n.hljs-deletion {\n  /* prettylights-syntax-markup-deleted */\n  color: #b31d28;\n  background-color: #ffeef0\n}\n.hljs-char.escape_,\n.hljs-link,\n.hljs-params,\n.hljs-property,\n.hljs-punctuation,\n.hljs-tag {\n  /* purposely ignored */\n  \n}");
	e$11(".explain {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  width: 100%;\n}\n.explain .tips {\n  display: flex;\n  align-items: center;\n}\n.explain .tips .icon {\n  width: 16px;\n  height: 16px;\n}\n.explain .fold {\n  display: none;\n}\n.explain .expand {\n  width: 100%;\n  word-break: break-all;\n  white-space: break-spaces;\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n}\n");
	e$11(".page-reference-wrapper {\n  margin-top: 5px;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n}\n.page-reference-wrapper .page-reference-item {\n  cursor: pointer;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  padding: 3px 0;\n  max-width: 200px;\n  margin-left: -10px;\n  padding-left: 10px;\n}\n.page-reference-wrapper .page-reference-item:hover {\n  background-color: rgba(30, 111, 255, 0.1);\n}\n.page-reference-wrapper .page-reference-item .page-reference-icon {\n  width: 20px;\n  height: 20px;\n  background-size: 100%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  flex-shrink: 0;\n}\n.page-reference-wrapper .page-reference-item .page-reference-title {\n  color: var(--accent-default, #1e6fff);\n  line-height: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.page-reference-wrapper .page-reference-item .page-reference-title:hover {\n  color: var(--text-link, #175ceb);\n}\n");
	le = function(e) {
		var r = e.references, a = e.onClick, t = function(e) {
			a?.(e);
		};
		return r ? import_react$10.createElement("div", { className: "page-reference-wrapper" }, r.map((function(e, r) {
			return import_react$10.createElement("div", {
				className: "page-reference-item",
				key: e.pageId,
				onClick: function() {
					return t(e);
				}
			}, import_react$10.createElement("div", {
				className: "page-reference-title",
				style: { flexShrink: 0 }
			}, "[".concat(r + 1, "]")), import_react$10.createElement("div", {
				className: "page-reference-title",
				style: { marginLeft: "5px" }
			}, e.title || s$5("title.untitled")));
		}))) : import_react$10.createElement(import_react$10.Fragment, null);
	};
	e$11(".page-num-reference-wrapper {\n  margin-top: 12px;\n  padding-top: 12px;\n  display: flex;\n  width: 100%;\n  border-top: 1px dashed var(--border-medium, rgba(0, 0, 0, 0.08));\n}\n.page-num-reference-wrapper .page-num-reference-page {\n  display: flex;\n  gap: 4px 8px;\n  flex-wrap: wrap;\n}\n.page-num-reference-wrapper .page-num-reference-page .page-num-reference-des,\n.page-num-reference-wrapper .page-num-reference-page .page-num-reference-item {\n  font-size: 11px;\n  line-height: 20px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.page-num-reference-wrapper .page-num-reference-page .page-num-reference-item {\n  cursor: pointer;\n}\n.page-num-reference-wrapper .page-num-reference-page .page-num-reference-item:hover {\n  color: var(--text-link, #175ceb);\n}\n");
	de = function(e) {
		var r = e.references, a = e.onClick, t = function(e) {
			a?.(e);
		};
		return import_react$10.createElement("div", { className: "page-num-reference-wrapper" }, import_react$10.createElement("div", { className: "page-num-reference-page" }, import_react$10.createElement("div", { className: "page-num-reference-des" }, s$5("chat.messages.reference.des")), r ? r.map((function(e) {
			return import_react$10.createElement("div", {
				className: "page-num-reference-item",
				key: e.pageId,
				onClick: function() {
					return t(e);
				}
			}, "[".concat(e.pageId, "]"));
		})) : import_react$10.createElement("div", { className: "page-num-reference-item" }, s$5("markdown.reference-description-finding"))));
	};
	(function(e) {
		e.SMART_CANVAS = "smartcanvas", e.PDF = "pdf";
	})(se || (se = {}));
	e$11(".ai-markdown-excel-chart {\n  display: flex;\n  border-radius: 2px;\n  flex-direction: column;\n}\n.ai-markdown-excel-chart-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.ai-markdown-excel-chart-title > .ai-markdown-excel-chart-title-text {\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 1.6;\n  text-align: left;\n}\n.ai-markdown-excel-chart-title .ai-assistant-sdk-button {\n  height: 20px;\n  padding: 0 4px;\n  font-size: 10px;\n}\n.ai-markdown-excel-chart-title .ai-assistant-sdk-button img {\n  height: 16px;\n  width: 16px;\n}\n.ai-markdown-excel-chart-img {\n  position: relative;\n  max-width: 100%;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  border-radius: 4px;\n  background: var(--bg-lv1-default, white);\n}\n.ai-markdown-excel-chart-img .ai-markdown-excel-chart-img-chart {\n  max-width: 100%;\n  padding: 10px 20px;\n  box-sizing: border-box;\n}\n.ai-markdown-excel-chart-img-action {\n  position: absolute;\n  height: 22px;\n  width: 22px;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.ai-markdown-excel-chart-img-action img {\n  position: relative;\n  height: 100%;\n  width: 100%;\n}\n.ai-markdown-excel-chart-img-action:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-markdown-excel-chart-img-exchange {\n  top: 4px;\n  right: 4px;\n}\n.ai-markdown-excel-chart-img-expand {\n  bottom: 8px;\n  right: 8px;\n}\n.dui-modal-content div[class^='dc-ai-chart-modal-content-'] {\n  user-select: none;\n}\n");
	ue = /* @__PURE__ */ new Map();
	e$11(".markdown-excel-formula {\n  display: flex;\n  padding: 8px 10px;\n  flex-wrap: wrap;\n  border-radius: 2px;\n  background: var(--Base-base_white_080, rgba(255, 255, 255, 0.8));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: bold;\n  line-height: 22px;\n  margin: 8px 0;\n  word-break: break-all;\n  white-space: break-spaces;\n}\n.markdown-excel-formula .tips {\n  font-weight: 400;\n  font-size: 14px;\n}\n");
	he = /* @__PURE__ */ new Map();
	e$11(".ai-markdown-card div.ai-assistant-link-card {\n  height: 22px;\n  padding: 8px;\n  align-items: center;\n  display: flex;\n  border-radius: 4px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background: var(--bg-lv2-default, #fff);\n  gap: 8px;\n  cursor: pointer;\n}\n.ai-markdown-card div.ai-assistant-link-card .ai-assistant-link-card__icon {\n  width: 16px;\n  height: 16px;\n}\n.ai-markdown-card div.ai-assistant-link-card .ai-assistant-link-card__url {\n  overflow: hidden;\n  color: var(--text-link, #175ceb);\n  font-feature-settings: 'init' on, 'fina' on;\n  text-overflow: ellipsis;\n  font-family: 'PingFang SC';\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  white-space: nowrap;\n}\n");
	e$11(".ai-markdown-normal-code {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 4px;\n}\n.ai-markdown-normal-code-sheet-list {\n  padding: 4px;\n  border-radius: 4px;\n  position: relative;\n  min-height: 36px;\n}\n.ai-markdown-normal-code-sheet-list-button {\n  display: flex;\n  position: absolute;\n  bottom: 10px;\n  right: 4px;\n  line-height: 24px;\n  visibility: hidden;\n  padding: 0 8px;\n  color: var(--text-link, #0060fd);\n  background-color: var(--bg-lv3-default, #fff);\n}\n.ai-markdown-normal-code-sheet-list-button.show {\n  visibility: visible;\n  cursor: pointer;\n}\n.ai-markdown-normal-code-sheet-list:hover {\n  background: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n}\n.ai-markdown-normal-code-sheet-item {\n  display: flex;\n  gap: 10px;\n}\n.ai-markdown-normal-code-sheet-item-icon {\n  flex: none;\n  background-color: var(--text-link, #0060fd);\n}\n.ai-markdown-normal-code-sheet-item-text {\n  line-height: 24px;\n  white-space: normal;\n}\n.ai-markdown-normal-code--close {\n  display: none;\n}\n.ai-markdown-normal-code-content {\n  position: relative;\n  border-radius: 0.3em;\n  overflow: hidden;\n  border-radius: 4px;\n}\n.ai-markdown-normal-code--header {\n  display: flex;\n  align-items: center;\n  background: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n  padding: 8px 12px;\n  margin-top: 12px;\n}\n.ai-markdown-normal-code--language {\n  margin-right: auto;\n}\n.ai-markdown-normal-code--copy {\n  align-items: center;\n  color: var(--text-strong, rgba(0, 0, 0, 0.48));\n  display: flex;\n  flex-direction: row;\n  flex-shrink: 0;\n  font-family: Menlo,\n      Monaco,\n      Consolas,\n      Courier New,\n      monospace;\n  font-size: 12px;\n  height: -moz-fit-content;\n  height: fit-content;\n  justify-content: flex-end;\n  cursor: pointer;\n}\n.ai-markdown-normal-code--copy-icon {\n  background-color: var(--text-strong, rgba(0, 0, 0, 0.48));\n}\n.ai-markdown-normal-code-icon {\n  height: 20px;\n  width: 20px;\n  cursor: pointer;\n}\n.ai-markdown-normal-code-icon--close {\n  transform: rotate(180deg);\n}\n.ai-markdown-normal-code-hljs {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.__DARK__ {\n  /*\n  \n  Atom One Dark by Daniel Gamage\n  Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax\n  \n  base:    #282c34\n  mono-1:  #abb2bf\n  mono-2:  #818896\n  mono-3:  #5c6370\n  hue-1:   #56b6c2\n  hue-2:   #61aeee\n  hue-3:   #c678dd\n  hue-4:   #98c379\n  hue-5:   #e06c75\n  hue-5-2: #be5046\n  hue-6:   #d19a66\n  hue-6-2: #e6c07b\n  \n  */\n}\n.__DARK__ pre code.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 1em;\n}\n.__DARK__ code.hljs {\n  padding: 3px 5px;\n}\n.__DARK__ .hljs {\n  color: #abb2bf;\n  background: #282c34;\n}\n.__DARK__ .hljs-comment,\n.__DARK__ .hljs-quote {\n  color: #5c6370;\n  font-style: italic;\n}\n.__DARK__ .hljs-doctag,\n.__DARK__ .hljs-keyword,\n.__DARK__ .hljs-formula {\n  color: #c678dd;\n}\n.__DARK__ .hljs-section,\n.__DARK__ .hljs-name,\n.__DARK__ .hljs-selector-tag,\n.__DARK__ .hljs-deletion,\n.__DARK__ .hljs-subst {\n  color: #e06c75;\n}\n.__DARK__ .hljs-literal {\n  color: #56b6c2;\n}\n.__DARK__ .hljs-string,\n.__DARK__ .hljs-regexp,\n.__DARK__ .hljs-addition,\n.__DARK__ .hljs-attribute,\n.__DARK__ .hljs-meta .hljs-string {\n  color: #98c379;\n}\n.__DARK__ .hljs-attr,\n.__DARK__ .hljs-variable,\n.__DARK__ .hljs-template-variable,\n.__DARK__ .hljs-type,\n.__DARK__ .hljs-selector-class,\n.__DARK__ .hljs-selector-attr,\n.__DARK__ .hljs-selector-pseudo,\n.__DARK__ .hljs-number {\n  color: #d19a66;\n}\n.__DARK__ .hljs-symbol,\n.__DARK__ .hljs-bullet,\n.__DARK__ .hljs-link,\n.__DARK__ .hljs-meta,\n.__DARK__ .hljs-selector-id,\n.__DARK__ .hljs-title {\n  color: #61aeee;\n}\n.__DARK__ .hljs-built_in,\n.__DARK__ .hljs-title.class_,\n.__DARK__ .hljs-class .hljs-title {\n  color: #e6c07b;\n}\n.__DARK__ .hljs-emphasis {\n  font-style: italic;\n}\n.__DARK__ .hljs-strong {\n  font-weight: bold;\n}\n.__DARK__ .hljs-link {\n  text-decoration: underline;\n}\n/* 只要 id 以 dmermaid-chart- 开头就隐藏 处理mermaid.render 失败会挂载错误提示到body 上， 做隐藏处理 */\nbody div[id^='dmermaid-chart-'] svg[aria-roledescription='error'] {\n  display: none !important;\n}\n");
	fe = {
		"tdocs-sheet-function": function(i) {
			var o = (0, import_react$10.useContext)(t$6).source, s = (0, import_react$10.createRef)(), p = a$12((0, import_react$10.useState)((function() {
				return he.has(i.formula) ? he.get(i.formula) : "";
			})), 2), m = p[0], u = p[1];
			function h() {
				return (h = n$8(s$3.mark((function e() {
					var n, r, a, t, c, l, s;
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (t = null === (n = i.formula) || void 0 === n ? void 0 : n.trim(), o === R$1.SOURCE_SHEET) {
									e.next = 4;
									break;
								}
								return u(s$5("markdown.check-at-sheet")), e.abrupt("return");
							case 4:
								if (c = (null === (r = i.handlers) || void 0 === r || null === (a = r.getResultBySingleFormula) || void 0 === a ? void 0 : a.call(r, t)) || {}, l = c.data, !(s = (void 0 === l ? { cellAndCustomNodeValueResult: void 0 } : l).cellAndCustomNodeValueResult)) {
									e.next = 12;
									break;
								}
								if (1 !== s.length) {
									e.next = 10;
									break;
								}
								return u(s[0].value), he.set(i.formula, s[0].value), e.abrupt("return");
							case 10: u(s$5("markdown.sheet-calculate-result-tips")), he.set(i.formula, s$5("markdown.sheet-calculate-result-tips"));
							case 12:
							case "end": return e.stop();
						}
					}), e);
				})))).apply(this, arguments);
			}
			(0, import_react$10.useEffect)((function() {
				i.isFormula && function() {
					h.apply(this, arguments);
				}();
			}), [i.isFormula]);
			var f = (0, import_react$10.useMemo)((function() {
				return import_react$10.createElement("div", {
					className: "markdown-excel-formula",
					id: "".concat(i.formula)
				}, null != i && i.isFormula && void 0 !== m ? m : "计算中...");
			}), [m, i.formula]);
			return t$16(s), import_react$10.createElement("div", null, import_react$10.createElement("div", { className: "tips" }, "数值结果为:"), f, import_react$10.createElement("div", {
				className: "tips",
				style: { marginTop: "12px" }
			}, "计算公式:"), import_react$10.createElement("div", {
				ref: s,
				className: "markdown-excel-formula"
			}, i.children));
		},
		"tdocs-document-reference": function(i) {
			var o = i.children, c = void 0 === o ? "" : o, l = i.handlers, s = (0, import_react$10.useContext)(t$6).source, p = a$12((0, import_react$10.useState)(), 2), m = p[0], u = p[1];
			(0, import_react$10.useEffect)((function() {
				try {
					u(JSON.parse(c));
				} catch (e) {}
			}), [c]);
			var h = function(e) {
				var n, r = e.pageId;
				s === R$1.SOURCE_SMARTCANVAS && (null == l || null === (n = l.onDocumentReferenceOpenPage) || void 0 === n || n.call(l, r));
			}, f = function() {
				var e = n$8(s$3.mark((function e(n) {
					var r, a, t, i;
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (r = n.pageId, a = n.content, s === R$1.SOURCE_PDF) {
									e.next = 3;
									break;
								}
								return e.abrupt("return");
							case 3: void 0 === a ? null == l || null === (t = l.onDocumentReferenceOpenPage) || void 0 === t || t.call(l, r) : null == l || null === (i = l.onDocumentReferencePageNumClick) || void 0 === i || i.call(l, r, a);
							case 4:
							case "end": return e.stop();
						}
					}), e);
				})));
				return function(n) {
					return e.apply(this, arguments);
				};
			}();
			return function() {
				switch (s) {
					case R$1.SOURCE_SMARTCANVAS: return import_react$10.createElement(le, {
						references: (null == m ? void 0 : m.smartCanvasReferences) || [],
						onClick: h
					});
					case R$1.SOURCE_PDF: return import_react$10.createElement(de, {
						references: (null == m ? void 0 : m.pdfReferences) || [],
						onClick: f
					});
					default: return import_react$10.createElement(import_react$10.Fragment, null);
				}
			}();
		},
		"tdocs-collbasipable-block": function(t) {
			var i = t.children, c = a$12((0, import_react$10.useState)(!0), 2), l = c[0], d = c[1], m = a$12((0, import_react$10.useState)(""), 2), u = m[0], h = m[1], g = a$12((0, import_react$10.useState)(""), 2), w = g[0], b = g[1];
			return (0, import_react$10.useEffect)((function() {
				var e = t$14(i);
				if (null !== e) {
					var n = e.title, r = e.content;
					n && r && (h(n), b(r.replace(/(\\n|\\n-)/g, (function(e) {
						return "\\n" === e ? "\n" : "\\n -" === e ? "\n -" : "";
					}))));
				}
			}), [i]), import_react$10.createElement("div", { className: "explain" }, import_react$10.createElement("div", {
				onClick: function() {
					return d(!l);
				},
				className: "tips"
			}, u, u ? import_react$10.createElement("img", {
				src: l ? liner_arrow_down_24_default : icon_primary_arrow_up_default,
				className: "icon"
			}) : import_react$10.createElement(import_react$10.Fragment, null)), import_react$10.createElement(ReactMarkdown, { className: l ? "fold" : "expand" }, w));
		},
		"tdocs-vega-lite": function(t) {
			var c, l = t.children, s = t.isFinished, m = t.handlers, u = t.config, h = t.message, g = a$12((0, import_react$10.useState)(), 2), w = g[0], b = g[1], _ = a$12((0, import_react$10.useState)(!1), 2), v = _[0], x = _[1], y = (0, import_react$10.useRef)({ vegaConfigJsonString: l }), j = (0, import_react$10.useRef)(), A = a$12((0, import_react$10.useState)(!1), 2), D = A[0], R = A[1], N = n$14(), O = a$12((0, import_react$10.useState)(void 0), 2), S = O[0], K = O[1], F = function() {
				var e = n$8(s$3.mark((function e(n, r) {
					var a, t;
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return e.prev = 0, e.next = 3, O$1.getAIChartExtension();
							case 3: return a = e.sent, e.next = 6, a.onTransformData(me(me({}, n), {}, { useDefaultChart: r }));
							case 6: return t = e.sent, e.abrupt("return", t);
							case 10: return e.prev = 10, e.t0 = e.catch(0), console.error("生成图表失败", e.t0), R$2.chartGenerateFailed((null == h ? void 0 : h.id) || "", n.vegaConfigJsonString), e.abrupt("return", void 0);
							case 15:
							case "end": return e.stop();
						}
					}), e, null, [[0, 10]]);
				})));
				return function(n, r) {
					return e.apply(this, arguments);
				};
			}(), P = (0, import_react$10.useCallback)(n$8(s$3.mark((function e() {
				var n, r, a, t, i, o, c, d = arguments;
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return n = d.length > 0 && void 0 !== d[0] && d[0], r = !(d.length > 1 && void 0 !== d[1]) || d[1], a = ue.get(l), x(!0), a && !n || (a = F(y.current, r), "visible" === document.visibilityState && a && ue.set(l, a)), e.next = 7, a;
						case 7:
							if (t = e.sent, o = (i = t || {}).dataUrl, c = i.chartPublicInfo, x(!1), o) {
								e.next = 13;
								break;
							}
							return n || R(!0), e.abrupt("return");
						case 13: R(!1), s && (b(o), j.current = c);
						case 15:
						case "end": return e.stop();
					}
				}), e);
			}))), [l, s]);
			(0, import_react$10.useEffect)((function() {
				try {
					JSON.parse(l) && P();
				} catch (e) {
					console.error("解析 vega lite 数据失败", e);
				}
			}), [l, P]), (0, import_react$10.useEffect)((function() {
				N && P();
			}), [P, N]);
			var $ = null == u || null === (c = u.blockComponents) || void 0 === c ? void 0 : c[x$2.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER], I = function(e) {
				var n;
				R$2.enlargeImageClick((null == h ? void 0 : h.id) || "", e), null == m || null === (n = m.onExpandExcelChartImage) || void 0 === n || n.call(m, w || "", y.current);
			};
			return (0, import_react$10.useEffect)((function() {
				D || ua.isMobile || !w || R$2.insertImageExposure((null == h ? void 0 : h.id) || "");
			}), [
				D,
				null == h ? void 0 : h.id,
				w
			]), import_react$10.createElement("div", { className: "ai-markdown-excel-chart" }, import_react$10.createElement("div", { className: "ai-markdown-excel-chart-title" }, import_react$10.createElement("span", { className: "ai-markdown-excel-chart-title-text" }, s$5("markdown.generate-charts")), !D && !ua.isMobile && import_react$10.createElement(a$5, {
				disable: v,
				text: s$5("markdown.insert"),
				icon: import_react$10.createElement("img", { src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20.0303%207.53039L10.5%2017.0607L4.96967%2011.5304L6.03033%2010.4697L10.5%2014.9394L18.9697%206.46973L20.0303%207.53039Z'%20fill='white'/%3e%3c/svg%3e" }),
				type: "primary",
				onClick: function() {
					var e;
					R$2.insertImageClick((null == h ? void 0 : h.id) || "", isNumber(S) ? String(S) : ""), null == m || null === (e = m.onInsertExcelChart) || void 0 === e || e.call(m, j.current);
				}
			})), D ? import_react$10.createElement("p", null, s$5("markdown.not-supported-generate-charts")) : w ? import_react$10.createElement(import_react$10.Fragment, null, import_react$10.createElement("div", { className: "ai-markdown-excel-chart-img" }, import_react$10.createElement("img", {
				className: "ai-markdown-excel-chart-img-chart",
				src: w,
				onClick: function() {
					return I("image");
				}
			}), !ua.isMobile && $ && import_react$10.createElement($, {
				onExpandExcelChartImage: function() {
					return I("icon");
				},
				handleChangeType: function(e) {
					K(e), y.current.chartType = e, P(!0, !1);
				}
			}))) : import_react$10.createElement("p", null, s$5("markdown.generating-charts"), "..."));
		},
		"tdocs-link-card": function(e) {
			return import_react$10.createElement("div", {
				className: "ai-assistant-link-card",
				onClick: function(n) {
					n.preventDefault(), openUrl({ url: e.children });
				}
			}, import_react$10.createElement("img", {
				className: "ai-assistant-link-card__icon",
				src: list_16_link_blue_default
			}), import_react$10.createElement("span", { className: "ai-assistant-link-card__url" }, e.children));
		},
		mermaid: function(t) {
			var o = a$12((0, import_react$10.useState)(""), 2), c = o[0], l = o[1];
			return (0, import_react$10.useEffect)((function() {
				var e = !0;
				function n() {
					return (n = n$8(s$3.mark((function n() {
						var r, a, i, o, c;
						return s$3.wrap((function(n) {
							for (;;) switch (n.prev = n.next) {
								case 0: return n.prev = 0, r = "mermaid-chart-".concat(Date.now()), n.next = 4, __vitePreload(() => import("./vendor-mermaid-DU6uV3LW.js").then((n) => (n.M(), n.N)), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url);
								case 4:
									if (a = n.sent, !(i = a.default) || "function" != typeof i.render) {
										n.next = 12;
										break;
									}
									return n.next = 9, i.render(r, t.children);
								case 9: o = n.sent, c = o.svg, e && l(c);
								case 12:
									n.next = 18;
									break;
								case 14: n.prev = 14, n.t0 = n.catch(0), console.error("Error importing or rendering Mermaid chart:", n.t0), e && l("<pre><code>".concat(t.children.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "</code></pre>"));
								case 18:
								case "end": return n.stop();
							}
						}), n, null, [[0, 14]]);
					})))).apply(this, arguments);
				}
				return function() {
					n.apply(this, arguments);
				}(), function() {
					e = !1;
				};
			}), [t.children]), import_react$10.createElement("div", { dangerouslySetInnerHTML: { __html: c } });
		}
	};
	ge = function(r) {
		var c = (0, import_react$10.useContext)(t$6).source, l = (0, import_react$10.useRef)(null), p = a$12(import_react$10.useState(!0), 2), f = p[0], g = p[1], w = r.isFormula, b = r.formula, k = r.children, _ = r.className, v = void 0 === _ ? "" : _, x = r.isFinished, E = r.handlers, A = r.config, D = r.message, R = /^language-(.*)$/.exec(v), N = R ? R[1] : "", C = String(k).replace(/^\\n|\\n$/g, "").replace(ce, ""), O = N in fe ? fe[N] : void 0, S = c === R$1.SOURCE_SHEET, F = a$12(import_react$10.useState([]), 2), P = F[0], $ = F[1], M = function() {
			x && (R$2.blockCodeClick((null == D ? void 0 : D.id) || ""), g(!f));
		};
		(0, import_react$10.useEffect)((function() {
			S && g(!1);
		}), []);
		var H = (0, import_react$10.useCallback)((function() {
			r$10(C), A.snackbar.show({
				message: s$5("operation.copy-success"),
				type: "success",
				duration: 2e3
			});
		}), [C]);
		(0, import_react$10.useEffect)((function() {
			l.current && (void 0 !== l.current.dataset.highlighted && delete l.current.dataset.highlighted, common_default.highlightElement(l.current)), $(e$13(C));
		}), [C]), (0, import_react$10.useEffect)((function() {
			S && x && R$2.blockCodeExposure((null == D ? void 0 : D.id) || "");
		}), [
			S,
			x,
			null == D ? void 0 : D.id
		]);
		return O ? import_react$10.createElement(O, {
			isFormula: w,
			formula: b,
			isFinished: x,
			handlers: E,
			config: A,
			message: D
		}, C) : import_react$10.createElement(import_react$10.Fragment, null, S && import_react$10.createElement("div", { className: "ai-markdown-normal-code-sheet" }, import_react$10.createElement("div", { className: "ai-markdown-normal-code-sheet-list" }, P.map((function(e, r) {
			return import_react$10.createElement("p", {
				className: "ai-markdown-normal-code-sheet-item",
				key: r
			}, import_react$10.createElement(m$2, {
				size: 24,
				src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20.0304%207.53039L10.5001%2017.0607L4.96973%2011.5304L6.03039%2010.4697L10.5001%2014.9394L18.9697%206.46973L20.0304%207.53039Z'%20fill='%23454D5A'/%3e%3c/svg%3e",
				className: "ai-markdown-normal-code-sheet-item-icon"
			}), import_react$10.createElement("span", {
				key: r,
				className: "ai-markdown-normal-code-sheet-item-text"
			}, e));
		})), import_react$10.createElement("div", {
			className: (0, import_classnames$4.default)("ai-markdown-normal-code-sheet-list-button", { show: x }),
			onClick: M
		}, import_react$10.createElement(m$2, {
			size: 24,
			src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.25%206.25098V17.751H18.75V6.25098H5.25ZM5%205.00098C4.44772%205.00098%204%205.44869%204%206.00098V18.001C4%2018.5533%204.44772%2019.001%205%2019.001H19C19.5523%2019.001%2020%2018.5533%2020%2018.001V6.00098C20%205.44869%2019.5523%205.00098%2019%205.00098H5ZM9.73113%208.99127L10.586%209.83336L8.45097%2012.001L10.5861%2014.1686L9.73113%2015.0107L6.7666%2012.001L9.73113%208.99127ZM13.414%209.83336L14.2689%208.99127L17.2334%2012.001L14.2689%2015.0107L13.4139%2014.1686L15.549%2012.001L13.414%209.83336Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e",
			className: "ai-markdown-normal-code-sheet-item-icon"
		}), import_react$10.createElement("span", null, s$5(f ? "markdown.hidden-code" : "markdown.show-code"))))), import_react$10.createElement("div", { className: "ai-markdown-normal-code-content  ".concat(f ? "" : "ai-markdown-normal-code--close") }, import_react$10.createElement("div", { className: "ai-markdown-normal-code--header" }, import_react$10.createElement("div", { className: "ai-markdown-normal-code--language" }, o$13(N)), import_react$10.createElement("div", {
			className: "ai-markdown-normal-code--copy",
			onClick: H
		}, import_react$10.createElement(m$2, {
			size: 24,
			src: copylink_outline_24_default,
			className: "ai-markdown-normal-code--copy-icon"
		}))), import_react$10.createElement("code", {
			ref: l,
			className: (0, import_classnames$4.default)("ai-markdown-normal-code-hljs", N, "language-".concat(N))
		}, C)));
	};
	e$11(".ai-component-markdown-inline-code {\n  white-space: wrap;\n  word-wrap: break-word;\n  margin: 0 4px;\n  padding: 0 4px;\n  background-color: var(--bg-lv3-default, #fff);\n  border-radius: 4px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n");
	we = function(r) {
		var a = r.children, t = r.message, i = r.config, o = r.handlers;
		if (Array.isArray(a) && "string" == typeof a[0] && a[0].startsWith("tdocs-")) {
			var c, s = a$12(/^(tdocs-\S+)\s+(\S+)(?:\s+(.*))?$/.exec(a[0]) || [], 4), d = s[1], p = void 0 === d ? "" : d, m = s[2], u = void 0 === m ? "" : m, h = s[3], f = void 0 === h ? "" : h, g = null === (c = i.inlineComponents) || void 0 === c ? void 0 : c[p];
			if (g) {
				var w = null == t ? void 0 : t.references;
				return import_react$10.createElement(g, {
					references: w,
					text: u,
					handlers: o,
					originalText: f
				});
			}
		}
		return import_react$10.createElement("span", { className: "ai-component-markdown-inline-code" }, a);
	};
	e$11(".ai-component-markdown-link {\n  color: #386ef6;\n  text-decoration: none;\n}\n");
	be = function(e) {
		var r = function() {
			var n = n$8(s$3.mark((function n(r) {
				return s$3.wrap((function(n) {
					for (;;) switch (n.prev = n.next) {
						case 0: r.preventDefault(), openUrl({ url: e.href });
						case 2:
						case "end": return n.stop();
					}
				}), n);
			})));
			return function(e) {
				return n.apply(this, arguments);
			};
		}();
		return import_react$10.createElement("a", {
			className: "ai-component-markdown-link",
			href: e.href,
			onClick: r
		}, e.children);
	};
	e$11(".markdown-card-table-wrapper {\n  overflow: auto;\n}\n.markdown-card-table-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.markdown-card-table-title-text {\n  text-align: left;\n}\n.markdown-card-table-title .ai-assistant-sdk-button {\n  height: 20px;\n  padding: 0 4px;\n  font-size: 10px;\n}\n.markdown-card-table-title .ai-assistant-sdk-button img {\n  height: 16px;\n  width: 16px;\n}\n.markdown-card-table-container {\n  position: relative;\n}\n.markdown-card-table-container-expand {\n  cursor: pointer;\n  position: absolute;\n  height: 22px;\n  width: 22px;\n  bottom: 8px;\n  right: 8px;\n  border-radius: 2px;\n}\n.markdown-card-table-container-expand img {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  filter: var(--icon-invert);\n}\n.markdown-card-table-container-expand:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n");
	ke = function(r) {
		var a = r.tableProps, o = r.title, c = void 0 === o ? "" : o, l = r.md, s = r.isFinished, d = r.config, p = r.handlers, m = (0, import_react$10.useContext)(t$6).source, u = (0, import_react$10.useRef)(m === R$1.SOURCE_SHEET), h = (0, import_react$10.useRef)(u.current ? s$5("markdown.insert") : s$5("gen-table")), g = a$12(import_react$10.useState(!1), 2), w = g[0], b = g[1], k = m === R$1.SOURCE_SHEET, _ = function() {
			b(!0);
		}, v = function() {
			b(!1);
		}, x = function() {
			var e;
			null == p || null === (e = p.onInsertTable) || void 0 === e || e.call(p, c || s$5("gen-table"), l), u.current && v();
		}, y = d.tableComponents[X$1.MARKDOWN_TABLE_PREVIEW];
		return import_react$10.createElement(import_react$10.Fragment, null, k && import_react$10.createElement("h3", { className: "markdown-card-table-title" }, import_react$10.createElement(ReactMarkdown, null, c || s$5("gen-table")), s && !ua.isMobile && import_react$10.createElement(a$5, {
			text: h.current,
			icon: import_react$10.createElement("img", { src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20.0303%207.53039L10.5%2017.0607L4.96967%2011.5304L6.03033%2010.4697L10.5%2014.9394L18.9697%206.46973L20.0303%207.53039Z'%20fill='white'/%3e%3c/svg%3e" }),
			type: "primary",
			onClick: x
		})), import_react$10.createElement("div", { className: "markdown-card-table-container" }, ua.isMobile ? null : import_react$10.createElement("div", {
			className: "markdown-card-table-container-expand",
			onClick: _
		}, import_react$10.createElement("img", {
			src: expand_24_default,
			alt: "tick"
		})), import_react$10.createElement("div", { className: "markdown-card-table-wrapper" }, import_react$10.createElement("table", a))), y ? import_react$10.createElement(y, {
			tableProps: a,
			visible: w,
			onHide: v,
			onConfirm: x,
			btnText: h.current,
			insertAble: k
		}) : null);
	};
	e$11("@keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.self-gap:not(:first-child) {\n  margin-top: 8px;\n}\n.self-gap:not(:last-child) {\n  margin-bottom: 8px;\n}\n.ai_sidebar_wrapper .ai-markdown-card,\n.ai-mobile_wrapper .ai-markdown-card,\n.ai-table-preview-content .ai-markdown-card {\n  word-break: break-word;\n  white-space: wrap;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 23.1px;\n  user-select: text;\n  -webkit-user-select: text;\n}\n.ai_sidebar_wrapper .ai-markdown-card pre,\n.ai-mobile_wrapper .ai-markdown-card pre,\n.ai-table-preview-content .ai-markdown-card pre {\n  margin: 0;\n}\n.ai_sidebar_wrapper .ai-markdown-card strong,\n.ai-mobile_wrapper .ai-markdown-card strong,\n.ai-table-preview-content .ai-markdown-card strong {\n  font-weight: bold;\n}\n.ai_sidebar_wrapper .ai-markdown-card ol,\n.ai-mobile_wrapper .ai-markdown-card ol,\n.ai-table-preview-content .ai-markdown-card ol {\n  padding-left: 1rem;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n.ai_sidebar_wrapper .ai-markdown-card ol > li,\n.ai-mobile_wrapper .ai-markdown-card ol > li,\n.ai-table-preview-content .ai-markdown-card ol > li {\n  margin-top: 2px;\n}\n.ai_sidebar_wrapper .ai-markdown-card ol > li::marker,\n.ai-mobile_wrapper .ai-markdown-card ol > li::marker,\n.ai-table-preview-content .ai-markdown-card ol > li::marker {\n  font-weight: bold;\n}\n.ai_sidebar_wrapper .ai-markdown-card ul,\n.ai-mobile_wrapper .ai-markdown-card ul,\n.ai-table-preview-content .ai-markdown-card ul {\n  list-style-position: disc;\n  padding-left: 0.2rem;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n.ai_sidebar_wrapper .ai-markdown-card ul > li,\n.ai-mobile_wrapper .ai-markdown-card ul > li,\n.ai-table-preview-content .ai-markdown-card ul > li {\n  list-style-type: disc;\n  margin-top: 2px;\n}\n.ai_sidebar_wrapper .ai-markdown-card-table-wrapper,\n.ai-mobile_wrapper .ai-markdown-card-table-wrapper,\n.ai-table-preview-content .ai-markdown-card-table-wrapper {\n  overflow: auto;\n  width: 100%;\n  background-color: #fff;\n}\n.ai_sidebar_wrapper .ai-markdown-card-table-wrapper:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card-table-wrapper:not(:first-child),\n.ai-table-preview-content .ai-markdown-card-table-wrapper:not(:first-child) {\n  margin-top: 8px;\n}\n.ai_sidebar_wrapper .ai-markdown-card-table-wrapper:not(:last-child),\n.ai-mobile_wrapper .ai-markdown-card-table-wrapper:not(:last-child),\n.ai-table-preview-content .ai-markdown-card-table-wrapper:not(:last-child) {\n  margin-bottom: 8px;\n}\n.ai_sidebar_wrapper .ai-markdown-card table,\n.ai-mobile_wrapper .ai-markdown-card table,\n.ai-table-preview-content .ai-markdown-card table {\n  min-width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n.ai_sidebar_wrapper .ai-markdown-card th,\n.ai-mobile_wrapper .ai-markdown-card th,\n.ai-table-preview-content .ai-markdown-card th {\n  background: var(--bg-lv2-weak, #f3f5f7);\n  white-space: nowrap;\n}\n.ai_sidebar_wrapper .ai-markdown-card th,\n.ai-mobile_wrapper .ai-markdown-card th,\n.ai-table-preview-content .ai-markdown-card th,\n.ai_sidebar_wrapper .ai-markdown-card td,\n.ai-mobile_wrapper .ai-markdown-card td,\n.ai-table-preview-content .ai-markdown-card td {\n  border: 1px solid var(--Separators-medium, rgba(0, 0, 0, 0.88));\n  padding: 10px;\n}\n.ai_sidebar_wrapper .ai-markdown-card tr,\n.ai-mobile_wrapper .ai-markdown-card tr,\n.ai-table-preview-content .ai-markdown-card tr {\n  transition: background 0.3s ease;\n}\n.ai_sidebar_wrapper .ai-markdown-card .markdown-excel-chart img,\n.ai-mobile_wrapper .ai-markdown-card .markdown-excel-chart img,\n.ai-table-preview-content .ai-markdown-card .markdown-excel-chart img,\n.ai_sidebar_wrapper .ai-markdown-card > p > img,\n.ai-mobile_wrapper .ai-markdown-card > p > img,\n.ai-table-preview-content .ai-markdown-card > p > img {\n  width: 100%;\n  border-radius: 4px;\n}\n.ai_sidebar_wrapper .ai-markdown-card h1,\n.ai-mobile_wrapper .ai-markdown-card h1,\n.ai-table-preview-content .ai-markdown-card h1 {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 16px;\n  font-style: normal;\n  line-height: 26.4px;\n}\n.ai_sidebar_wrapper .ai-markdown-card h2,\n.ai-mobile_wrapper .ai-markdown-card h2,\n.ai-table-preview-content .ai-markdown-card h2,\n.ai_sidebar_wrapper .ai-markdown-card h3,\n.ai-mobile_wrapper .ai-markdown-card h3,\n.ai-table-preview-content .ai-markdown-card h3 {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 15px;\n  font-style: normal;\n  line-height: 24.8px;\n}\n.ai_sidebar_wrapper .ai-markdown-card h4,\n.ai-mobile_wrapper .ai-markdown-card h4,\n.ai-table-preview-content .ai-markdown-card h4,\n.ai_sidebar_wrapper .ai-markdown-card h5,\n.ai-mobile_wrapper .ai-markdown-card h5,\n.ai-table-preview-content .ai-markdown-card h5,\n.ai_sidebar_wrapper .ai-markdown-card h6,\n.ai-mobile_wrapper .ai-markdown-card h6,\n.ai-table-preview-content .ai-markdown-card h6 {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'init' on, 'fina' on;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: bold;\n  line-height: 23.1px;\n}\n.ai_sidebar_wrapper .ai-markdown-card img,\n.ai-mobile_wrapper .ai-markdown-card img,\n.ai-table-preview-content .ai-markdown-card img {\n  display: block;\n  width: 100%;\n}\n.ai_sidebar_wrapper .ai-markdown-card > h1:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h1:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h1:not(:first-child) {\n  margin-top: 16px;\n}\n.ai_sidebar_wrapper .ai-markdown-card > h2:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h2:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h2:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > h3:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h3:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h3:not(:first-child) {\n  margin-top: 12px;\n}\n.ai_sidebar_wrapper .ai-markdown-card > h4:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h4:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h4:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > h5:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h5:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h5:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > h6:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > h6:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > h6:not(:first-child) {\n  margin-top: 4px;\n}\n.ai_sidebar_wrapper .ai-markdown-card > p:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > p:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > p:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > li:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > li:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > li:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > div:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > div:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > div:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > img:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > img:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > img:not(:first-child),\n.ai_sidebar_wrapper .ai-markdown-card > pre:not(:first-child),\n.ai-mobile_wrapper .ai-markdown-card > pre:not(:first-child),\n.ai-table-preview-content .ai-markdown-card > pre:not(:first-child) {\n  margin-top: 2px;\n}\n.ai-mobile_wrapper .ai-markdown-card {\n  user-select: none;\n  -webkit-user-select: none;\n}\n");
	ve = ["children"];
	xe = ["inline", "children"];
	Ee = je(je({}, defaultSchema), {}, { attributes: je(je({}, defaultSchema.attributes), {}, {
		code: [[
			"className",
			/^language-./,
			"math-inline",
			"math-display"
		]],
		div: [].concat(n$7((null === (_e = defaultSchema.attributes) || void 0 === _e ? void 0 : _e.div) || []), [[
			"className",
			"math",
			"math-display"
		]]),
		span: [[
			"className",
			"math",
			"math-inline"
		]]
	}) });
	Ae = function(e) {
		var r = e.md, a = e.message, t = e.isFinished, i = e.formula, o = e.isFormula, l = e.config, s = e.handlers, d = e.dot, p = (0, import_react$10.useMemo)((function() {
			return import_react$10.createElement("span", {
				className: "loading-dot",
				style: {
					display: "inline-block",
					width: "10px",
					height: "10px",
					backgroundColor: "var(--text-ultrastrong, rgba(0, 0, 0, .88))",
					borderRadius: "50%",
					animation: "blink 1.5s cubic-bezier(.4, 0, .2, 1) infinite",
					marginLeft: "5px"
				}
			});
		}), []), m = (0, import_react$10.useMemo)((function() {
			return {
				span: function(e) {
					var r, a = e.children, t = c$4(e, ve);
					return null !== (r = t.className) && void 0 !== r && r.includes("ai-sentence-loading-dot") ? p : import_react$10.createElement("span", t, a);
				},
				code: function(e) {
					var r = e.inline, c = e.children, d = c$4(e, xe);
					return r ? import_react$10.createElement(we, {
						config: l,
						handlers: s,
						message: a
					}, c) : import_react$10.createElement(ge, a$6({
						handlers: s,
						config: l,
						isFormula: o,
						formula: i,
						isFinished: t,
						message: a
					}, d), c);
				},
				table: function(e) {
					if (!e.node.position) return null;
					var a = e.node.position, i = a.start, o = a.end, c = r.slice(i.offset, o.offset);
					return import_react$10.createElement(ke, {
						handlers: s,
						md: c,
						config: l,
						tableProps: e,
						isFinished: t
					});
				},
				a: function(e) {
					return import_react$10.createElement(be, e);
				}
			};
		}), [
			null == a ? void 0 : a.references,
			t,
			o
		]), u = d ? "".concat(r, "<span classname=\"ai-sentence-loading-dot\"></span>") : r;
		return import_react$10.createElement(ErrorBoundary, { FallbackComponent: function() {
			return import_react$10.createElement("div", null, "数据出错...");
		} }, import_react$10.createElement(ReactMarkdown, {
			rehypePlugins: [[rehypeSanitize, Ee], [rehypeKatex, { output: "mathml" }]],
			remarkPlugins: [
				remarkGfm,
				[remarkMath],
				remarkBreaks
			],
			components: m,
			skipHtml: !1,
			disallowedElements: ["script"]
		}, u));
	};
	De = function(t, i) {
		return function(o) {
			var l = o.md, s = o.message, d = o.feature, p = o.isFinished, m = o.handlers, u = o.dot, j = a$12((0, import_react$10.useState)(!1), 2), E = j[0], A = j[1], D = (d || {}).enableLinkCard, N = a$12((0, import_react$10.useState)(""), 2), C = N[0], O = N[1];
			(0, import_react$10.useEffect)((function() {
				if (!E) {
					var e = function(e) {
						if (!e || e.length < 29) return { isFormula: !1 };
						var n = e.match(/```tdocs-sheet-function\n([^]*?)\n```/g);
						return n ? {
							isFormula: !0,
							formula: n[0].replace(/```tdocs-sheet-function\n([^]*?)\n```/, "$1")
						} : { isFormula: !1 };
					}(l), n = e.isFormula, r = e.formula;
					n && (A(!0), O(r));
				}
			}), [E, l]);
			var S = (0, import_react$10.useMemo)((function() {
				var e = l;
				return D && (e = e.replace(oe, "\n```tdocs-link-card\n$1\n```\n")), e = (e = (e = (e = (e = (e = (e = e.replace(d$5, (function(e, n, r) {
					for (var a = parseInt(n, 10), t = parseInt(r, 10), i = [], o = a; o <= t; o++) i.push(o);
					return "[".concat(i.join(","), "](@ref)");
				}))).replace(i$10, "").replace(g$1, " `tdocs-ai-search-ref-text $1 $4` ")).replace(r$11, " `tdocs-ai-search-ref $1` ")).replace(e$14, " `tdocs-ai-search-ref $1` ")).replace(t$15, " `tdocs-ai-search-ref $1` ").replace(o$14, "")).replace(a$13, (function(e) {
					var n;
					if (!e) return "";
					var r = null === (n = e.match(/\[\[(\d+)\]\]/g)) || void 0 === n ? void 0 : n.map((function(e) {
						var n;
						return null === (n = e.match(/\d+/)) || void 0 === n ? void 0 : n[0];
					}));
					return "`tdocs-ai-search-ref ".concat(null == r ? void 0 : r.join(","), "`");
				}))).replace(/(\$\$?)([^$]+)\1/g, (function(e, n, r) {
					return "".concat(n).concat(function(e) {
						return e.replace(/[\x00-\x1F\x7F-\x9F\uFFFD]/g, "");
					}(r)).concat(n);
				})), e = e.replace(/(!?)\[\[\[([\s\S]*?)\]\]\]/g, "$$$1$$").replace(/([!\[]?)\[\[([\s\S]*?)\]\]/g, "$$1$").replace(/\\\[([\s\S]*?)\\\]/g, "$$$$$1$$$$");
			}), [D, l]);
			return import_react$10.createElement("div", { className: "".concat(i) }, import_react$10.createElement("div", { className: (0, import_classnames$4.default)("ai-component-common-markdown-card", { "ai-component-common-markdown-card-dot": u }) }, import_react$10.createElement(Ae, {
				message: s,
				isFinished: !!p,
				md: S,
				isFormula: E,
				formula: C,
				config: t,
				handlers: m,
				dot: u
			})));
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/tick_blue_16.svg
var tick_blue_16_default;
var init_tick_blue_16 = __esmMin((() => {
	tick_blue_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.9794%203.9656L14.3936%205.37981L7.79479%2011.9782L7.79595%2011.9793L7.51601%2012.2569L6.37944%2013.3934L6.37471%2013.3887L4.96552%2011.9795L1.66661%208.68057L3.08191%207.26527L6.38082%2010.5642L12.9794%203.9656Z'%20fill='%231E6FFF'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/tick_gray_16.svg
var tick_gray_16_default;
var init_tick_gray_16 = __esmMin((() => {
	tick_gray_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.9794%203.9656L14.3936%205.37981L7.79479%2011.9782L7.79595%2011.9793L7.51601%2012.2569L6.37944%2013.3934L6.37471%2013.3887L4.96552%2011.9795L1.66661%208.68057L3.08191%207.26527L6.38082%2010.5642L12.9794%203.9656Z'%20fill='black'%20fill-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/with-ai-auth-modal/index.js
function x$1(p) {
	var l = p.Modal, v = p.Button, k = p.Checkbox, x = p.Divider;
	return function(p) {
		var w = p.onConsent, b = p.isModal, E = void 0 === b || b, C = p.scene, q = void 0 === C ? q$3() : C, P = p.title, R = p.content, N = p.desc, S = c$4(p, y), X = a$12((0, import_react$9.useState)(!1), 2), U = X[0], M = X[1], L = a$12((0, import_react$9.useState)(!1), 2), Z = L[0], F = L[1], G = a$12((0, import_react$9.useState)(Object.entries(A[q].scopes).map((function(e) {
			var n = a$12(e, 2);
			return {
				id: n[0],
				label: n[1],
				checked: !0
			};
		}))), 2), Q = G[0], K = G[1], Y = A[q], I = Y.title, W = Y.descPurpose, T = Y.descTips, z = function() {
			var e = n$8(s$3.mark((function e() {
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (!Z) {
								e.next = 2;
								break;
							}
							return e.abrupt("return");
						case 2: return F(!0), e.next = 5, p$3({
							scene: q,
							active: !0
						});
						case 5: e.sent && w?.(), F(!1);
						case 8:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}(), D = function(e) {
			openUrl({ url: e });
		}, O = function() {
			return import_react$9.createElement("div", { className: "ai-component-common-auth-modal-title" }, I);
		}, J = function() {
			return Q.map((function(e) {
				var n = e.id, t = e.checked, c = e.label;
				return import_react$9.createElement("div", {
					key: n,
					onClick: function() {
						return function(e) {
							var n = Q.find((function(n) {
								return n.id === e;
							}));
							n && (n.checked = !n.checked, !n.checked && Q.every((function(e) {
								return !e.checked;
							})) && Q.forEach((function(e) {
								return e.checked = !0;
							})), K(n$7(Q)));
						}(n);
					},
					className: "ai-component-common-scope-item".concat(t ? " scope-item-checked" : "")
				}, t ? import_react$9.createElement(m$2, {
					size: 16,
					src: tick_blue_16_default
				}) : import_react$9.createElement(m$2, {
					size: 16,
					src: tick_gray_16_default
				}), c);
			}));
		}, j = function() {
			return import_react$9.createElement(import_react$9.Fragment, null, N || import_react$9.createElement("div", { className: "ai-component-common-desc-info" }, import_react$9.createElement("div", { className: "ai-component-common-desc-purpose" }, W), import_react$9.createElement("div", { className: "ai-component-common-desc-tips" }, T)), import_react$9.createElement(x, null), import_react$9.createElement("div", { className: "ai-component-common-scope-list" }, J()), import_react$9.createElement("div", { className: "ai-component-common-policy-agree-wrapper" }, import_react$9.createElement(k, {
				checked: U,
				onChange: function(e) {
					return M(e);
				},
				labelClickable: !1
			}, import_react$9.createElement("span", { className: "ai-component-common-policy-agree-label" }, import_react$9.createElement("span", {
				style: { cursor: "pointer" },
				onClick: function() {
					return M(!U);
				}
			}, s$5("auth.policy.desc")), import_react$9.createElement("p", {
				className: "ai-component-common-agree-link",
				onClick: function() {
					return D("https://docs.qq.com/doc/DZHVMdVRPS0lQeWRD?pub=1&dver=2.1.0");
				}
			}, s$5("auth.policy.service-agreement")), import_react$9.createElement("p", {
				className: "ai-component-common-agree-link",
				onClick: function() {
					return D("https://docs.qq.com/doc/p/30cb57a3280b16bd48fb49001022ada97479339a");
				}
			}, s$5("auth.policy.privacy-agreement"))))));
		}, _ = function() {
			var e = R || U && Q.every((function(e) {
				return e.checked;
			}));
			return import_react$9.createElement("div", { style: {
				display: "flex",
				justifyContent: "center"
			} }, import_react$9.createElement(v, {
				style: {
					width: "200px",
					cursor: "pointer"
				},
				type: "primary",
				disabled: !e,
				onClick: z
			}, s$5("auth.options.agree")));
		};
		return E ? import_react$9.createElement(l, a$6({}, S, {
			titleAlignment: "left",
			closable: !0,
			className: "ai-component-common-auth-modal",
			zIndex: 1e4,
			style: {
				width: 417,
				padding: 20
			},
			title: P || O(),
			content: R || j(),
			footer: _()
		})) : import_react$9.createElement("div", { className: "ai-component-common-auth-modal ai-component-common-auth-component" }, O(), j(), _());
	};
}
var import_react$9, A, y;
var init_with_ai_auth_modal = __esmMin((() => {
	init_index_a8948600();
	init_index_16c390a4();
	init_toConsumableArray_19ff1ff1();
	init_slicedToArray_fb5b6502();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_index_07e2ccf4();
	init_esm$3();
	init_tick_blue_16();
	init_tick_gray_16();
	init_esm$4();
	init_defineProperty_740d2c7a();
	init_style_inject_es_3984fa0f();
	require_classnames();
	A = r$7(r$7(r$7({}, i$11.DEFAULT, {
		title: o$15(s$5("auth.title")),
		descPurpose: o$15(s$5("auth.desc.purpose")),
		descTips: o$15(s$5("auth.desc.tips")),
		scopes: {
			"view-edit-smartsheet-content": s$5("auth.scopes.view-edit-smartsheet-content"),
			"view-edit-smartcanvas-content": s$5("auth.scopes.view-edit-smartcanvas-content"),
			"view-edit-sheet-content": s$5("auth.scopes.view-edit-sheet-content"),
			"view-edit-slide-content": s$5("auth.scopes.view-edit-slide-content"),
			"view-edit-doc-content": s$5("auth.scopes.view-edit-doc-content"),
			"view-edit-form-content": s$5("auth.scopes.view-edit-form-content"),
			"view-edit-mind-content": s$5("auth.scopes.view-edit-mind-content"),
			"view-edit-pdf-content": s$5("auth.scopes.view-edit-pdf-content"),
			"view-edit-voice-notes-content": s$5("auth.scopes.view-edit-voice-notes-content")
		}
	}), i$11.QQ_MINI, {
		title: o$15(s$5("auth.title")),
		descPurpose: o$15(s$5("auth.desc.local-file-purpose")),
		descTips: o$15(s$5("auth.desc.local-file-tips")),
		scopes: {
			"view-edit-sheet-content": s$5("auth.scopes.view-edit-local-sheet-content"),
			"view-edit-slide-content": s$5("auth.scopes.view-edit-local-slide-content"),
			"view-edit-doc-content": s$5("auth.scopes.view-edit-local-doc-content"),
			"view-edit-pdf-content": s$5("auth.scopes.view-edit-local-pdf-content")
		}
	}), i$11.DOC_IMAGE, {
		title: o$15(s$5("auth.title")),
		descPurpose: "",
		descTips: o$15(s$5("auth.desc.img-tips")),
		scopes: { "view-edit-image-content": s$5("auth.scopes.view-edit-image-content") }
	});
	e$11(".ai-component-common-auth-modal.ai-component-common-auth-component {\n  padding: 24px 24px 48px;\n  border-radius: 4px;\n  border: 1px solid var(--border-ef, #efefef);\n  background: var(--bg-lv4-default, #fff);\n}\n.ai-component-common-auth-modal .ai-component-common-auth-modal-title {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-common-auth-modal .ai-component-common-auth-modal-title::before {\n  content: '';\n  display: block;\n  width: 24px;\n  height: 24px;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAABaWlDQ1BEaXNwbGF5IFAzAAB4nHWQvUvDUBTFT6tS0DqIDh0cMolD1NIKdnFoKxRFMFQFq1OafgltfCQpUnETVyn4H1jBWXCwiFRwcXAQRAcR3Zw6KbhoeN6XVNoi3sfl/Ticc7lcwBtQGSv2AijplpFMxKS11Lrke4OHnlOqZrKooiwK/v276/PR9d5PiFlNu3YQ2U9cl84ul3aeAlN//V3Vn8maGv3f1EGNGRbgkYmVbYsJ3iUeMWgp4qrgvMvHgtMunzuelWSc+JZY0gpqhrhJLKc79HwHl4plrbWD2N6f1VeXxRzqUcxhEyYYilBRgQQF4X/8044/ji1yV2BQLo8CLMpESRETssTz0KFhEjJxCEHqkLhz634PrfvJbW3vFZhtcM4v2tpCAzidoZPV29p4BBgaAG7qTDVUR+qh9uZywPsJMJgChu8os2HmwiF3e38M6Hvh/GMM8B0CdpXzryPO7RqFn4Er/QcXKWq8MSlPPgAAENxJREFUeAHtW11sHNd1PvfO8Ee2GJL+UwXZ4S5qN06gVGQdC0geqmVRo6gfaqpAg760ol7alwKSUKBPRUkGRR76Irp96kspoT8BmiKm0KIoGrRaIgkM2AZIOnAUW0l2lSimLVriypLI/Zm5N985984uKe4slxSXRAIeabi7M3fu3Pnm3O/83SE6kAM5kAM5kAP5ZRVFey3zKwMUUI6UHiJLw7xhEAPWqgwPxlo3LGVt0ZIuklEl/FwgY+YojBZoZLBEeyh7AxCD0kvnAEYOv04py/ePv/gUKAAK78Mv3scgYb/GfqvIJMPkY/htdR4/Z6lWuUJfHixSh6WzAF1bhqaoCQFGabl5ZZVDRC6ugQZZAYSB4Z3AgLwWyXdy+pQAJ8eS46TyRPEUvdyXpw5JZwC6DmCIHDC0TlMM7piB4k/yQHgQHgaF6lPNfVruhQHy53nNSzSwSBRcoJd7rtAuy+4CVFjKKBvMWCNTyd+svyGnNDJL3E3JdCmSNQtEmnmmhHYlMtAqY9AkGMJnBmcOYxuQ3qxy2GDaqUQRoZFJf4D+komrU7s59XYPoBu3zkEzJgHEgJsqMp3qpOs1AgCAPyzNUfneLI1kWxMucxcInGw4hM4G8f01bDn0M5Rok3JTr65R+FYEepP0pUOXaRfk0QEqFAZ0cGgCgztX54n100o0BVxh1RTdv7+QCsp8AWD0QluCMejEKXwOQRMHHSdpBoD7LikKF6wysIS2H0cy9mGgnJbxrU3Ty49doEeURwMI4FDYfRU3MdzgE+VttWhNnmI7RS8czaf2Mf+zHAUKmhGcwfl1QNzQNLBQYuAcSEz08ttAE2twFyJScS+4Pkiu72kdfMcPiBZsWD0N16BIO5SdA7S0lKHIXMWoMo0ppJ0pJr2CfRdo6Ei6mn+/kIM2TOBmcw4IVgLtQcZvfOebdGAxLykHEO8HzeN6Veyo4GCVAtPFXgFaPOEfjmiw56gihdXRnYK0M4CWCiDjkDVnSGaS8RojA1NzFNNZyh4tNj0XU0n3BBPG2PMCaGK5oBn+kxgEB5Cqf8o+y74RK4aK8KeCkwUgfK/iu6EuU0Xj31jHeYmlZJBGduJk7gygD382jzNPiMMnsx/diOmmaXr22fR5z1oT0AwGnHGmW3luUX56iLZgeqhF3BisW9cCwL4r51qdwXZCUXACF3wWxyuAqgwtqeKziv4AmCkCpBto/GeesxqcxP0FtdHtgrR9gG799CIgOSfq77vAIPjJTtGxY1Op5/3wx+cwjabhBzEg1pl9P40Sp8+Es2TWLm9p3d5e+xNlzV/hnGfIaRK0SEGbLGvST6k7XgIsfy4PLxmn06hpeunwtoh7ewDdKozjKf8TUX1+O/Mam6/RsaHJ1PN+eP0iBnjeUagDyJlpnmK0CN/nAn3xuTxtV95a/Uv0+RfozPER8xJRDb2+bXprtzG+SWnX8MfYSb1AX+p7vd1LtA/QSgGkTCBlDirxfIz1zpqeoiPPtdCcD2bwdzwhTgFVCa/AOdST9IWhtgfbVN5a/UMg/rfo1BG2BwnbP1Bv7bdx3fPU8ML58y4obKRd0tbUrsR2Eq0zjofFmPBV51qCc/39CbQ/4yIoqxK6wnnwoGn0kcFhOfnYt6AVX0evTNwRsI/4u1b0x0Rrfw1+ygsRafa+ZQzwt8KZdrtvD6CVH43hwn8qHogmF1ZqKgC0s6nnXL82AZ6YFPssNtpa717nqfzpCB3PLtBuyZcP/wsG9H/4VsMIWXtqUPAeKg/kbBxjjLbENtJqp0cYQw5eeq6drtsCSBlz0Wmn/BPLSxqkfDRbbHrC+z8Yw3gmvTtNlMwtspfoxRdgSUY6kNPpnQYEiOcMNAggaUwzZX9LplKgz7PHyfNaOc8CAwom2ul1a4CWr+UsO4Niboy4G7jRRRocau4EFuYxDc1F67w8ZkXvHkFzXnzxLHVKTqqPoKP/DV5MOAgA0fP0zupn6fhneKx5TwtuqmnEdO/eO7VVt1sCBL9lwoVUceJ1WYrjdFMZB6xtGeX9Rq86RXpQPk2dFh1+D8+FAQJZ26o2pkZx1/PuIEIe4SE/LvegJ7fssuXRlXkEgybngSErLi2I+ekX8k3bf/DuOEbwmmS//JQEtjeAbYem1UNysuc90ghzFMAhXTWsRUH063Lsi4N54T9xxkmMBcZ5ymcMUqU1QDU95pDmyM/nPxV4pJnw1ArMBLcVv5HbaiHGSfr854u0RwKKeRcedwXRbFUDKDyjZ+oH42hKErt8LzLtDU+18y372+Jqr8mUgt6y9gChIg1+LiUA1Wc4cE0CKkfO8WV6/vhl2kPBLRcATAWRW8UAKCjMYSrYXjkYIVVCdkUcee9yIA/QkofSAVqZHxBzKBbICOoAKt+0LbQHJn1cMPFWSzRP23QfqVNi42WYEmgQHEc4j4a97FLJAcRxmLJXqGHuE5OfOs3SAYqiYYn2QCCSXWCS1mq2aduYnKXTPqMucaKZouxIkfZagvA+gCnjYVZxdy780APdjQbgUNbwOkjYDqVrUYspxuQsTE88xWQrVxebtVSBnZA5bZ1ZBz53QZaXaD+kbFbhRZcFpDiuSghSWuupH+8NZh044rwKt+I+M2ndpQOk1AlyN5tMmxIdbaIRhbdzILshIl+7UULSs/uiPSxdq8aYuCwgWevisx6fhWXJDpbwEG84S2YSBIbTumulQQNikViLbIzfNiU0sGcSN6BeuiC999yTiO56HANZQ0KuDA+6rA1Aih7c3dhGLUjoI56d8GsqQGHqhZQB8WoHkKgQklHNminhH9VI4iGvk9kn7WGxwSFoTpl0YPnBKlaBD5+qbGxk2CcDDyX1NtWf1l0qQAAY6VTWnCSXghrWw1J4a1hy0i5p5/1Dc8XQPkqsRIOcNmu+g4i+KuFHQ5S5ywVM5zLysONsWnepADmv2Sf7rE2ZjBH4RyetnAfEtfP9FI3gyJqyq+mHnK6+vbkRR/cuEeu0Pz0t1oKkbRKYOtUwZlMvKghOKRff++oUiDx7cvfSGNuVqzYM47gbYy8HOqgEQcSZxttN27oAWjITStnULtOnGMgrOc05DHazM6XYPCapDP6t9g8clvheP6lwLcSji0CgobEBorHlTe1CCRNd2oOLDTodoVQNwhQrbvCBbNy/uQ14ymuPqzLb/QVoIHw86rbliC1XYCuRDSpUPXxnc0OTFe1Jcltkb6R1mQoQ7nfFFU5csIodTdxxrpc7E69c1nBPFzdtkH98p6ubgseIwdHgoCpCDKM/oVEVbWqr1VCScSAXlxXTum2hQfG7VtKlSe7EbPQVCm9m3NySlGriL6U+iY7LSy916dhUeoIQBA1wghBhRvfHzRvbYR+surIeL6pIkXSSDmheiSftww2iIVq5uk6Lyp7oPEGnG4I9kf5u6ikHplyxrDlGEmZ08737mxpyVZgT9yrx/HmLF9P6TQfI8ry0ns1c0EqxGXuoUZJrlu8B7ZPAet1dpbjvXlyjqLdyqK8LHFS7Q189Xt3U1gTDViwX+btnFyYlS0EtNWg1Tw0O8qYwbkS92dGi8lPQFVYBYWCHaD9kDoNco2pPVx9H77W1NaRa776z0rSt1q9x1shKqMHg4E8UpRqXdIAGT2NemjlvxYRn8H+MCm+sJ+sSbahapEfFHZVJRJ3LVPukBqPez8Hp4/dodDRq2lYhS8GU4BL4MCy4x2x2BxxEjEs8lziLXKUgXrh0uLdB1sL+G6bZMO2FcJX3zk+uYluR7XZhhl4pPvdHAInuILT4TVptet7HN85wQUFW6SQ5IU2zrS7VOuXaHU07T7qRF4JCTiSHFZd/1nvSfPHC1ZZJ8EcWBsfaqyRL8cgt0VN2nPd985VSH93kdUMpjp9GO+VK5nVP2kYtF362Bkimmc077XF8ZFlFl/8zx4eNRq1e1acXI9ZPYdRZLTKGk+yZJkcyZO6cR2AaNz1vuZCT9GqSrHe5q3xq8dPL1oXDOJ7y2iOhqFvWoZwWlUnQt42kmlKhaqtiuWORRF7qsfSHE9BFzz1SAldatGjLvNXWAB09nYeG5J0/5Mna4kl88l9nYMmYpPNOo33tjGtNS9/OUafE0vad0U9+NC6OrpSjHPdgVtygp7P5rU5tqzZvYztlE7KW9WCGKxwXaemNjDXm9XpGsb6+xXZOi0x8KfWYUm9s2rdyDY6hq9f5sTnuUXFbC6naW90BLWIuoroWyfsEgxSoGTr2u7MYWFEW+7o1mKy6p/RH/3Oedk8afjpXdW2TqcH7BrOXN+9XM8naAitrC8T/uURPPT9L27rwVrL0DVROu+dxlYGkbisKo9U0RY9fQYLu/4nqb5y4pYHWnKUjr16mRxE700sfPqnp2B9sNN1szdzCci5RLTYth9++NuHq70I+TJQsBXiGv0OD7VV7txdBffQf53DGNJdNXY5VJ1nLKbKHTkCrTntrRn75e4y/f0PPvPp12q7c+TZcvrUnqCusHakFKx//2u892Nb5K+9N8Mp//irLh2XMvLZdjadXhzfL9kPMW9+8iJPOydtLpOorgLTS0ybuGcOvjF/VEUtUrZAfJvrAavV39NTvv9Gy7+t/30N9n+vvCqNsLaawOwxKga2V1ip2ZZMGtZLbi8yBk7LAVB5icq96mp78QgcXcSZy6995qg17f11CeQeWvqSoJ4edn8XGpV9eplvGRRikVcy8HyNB/iYaXkN5pkQBYqYqPN/APInB90HrHkM3ZST87kYBUhAVJNe7whI99RlYy6+stTW22/P8AM8nmCRr7/AgF+mJ4yO0TQlpJ/LgwSgdOsRrpYdEgWRdr6yyG7eqUoALzou7K6xBbnkuvmtZ9P2EUkEOoz2prXlgInsf/sk9gIPN3AtU8ClMZoQgKu6y2tRsVaqQdPPm1mNaQX4qDmdwfq5eUxYmMIzODSTQdrQ+qf1FnOsle7YEUEY5QaasFN7IFw7xByUUW16Dpmgp//Ly3GSJruRqePWXLNutauWX7YJmwRJRjOCPkzMAJa5h6+kKDFUrNXqTqi3Hc+u748BhHv3m1i/XIVmRYgugoNGmVeE25NHSXLBsmGXfwhMbcZoki2/IZaHkhRQA07WEz2XPRatoC7K1qwCEOeW+0eo+qp/4ZE1SokkU4TO0S1SNb7bknuXv5MSrVwGnYZTnRPJFd7YTi8gsjtLgzhdv7U4e8KN/5RX057xVc6tgxF31ls6oD1QQ/tyqkPnnCENnrMGNawYLWT/LFmoJiasibugWDfTeJJWSruCsZsS1dA1g9CmXy/QPhWHRiWWl1+nTbl5h8kh58t1LlC59YxxKw9Yjs856qLoP4l7aLRK/cqDofxEcvU9h30/ILlsaPIyp+GoltW8GhbOZhk7BXI5h3riX9pJFh/wgtHZpBQVyj+lr9MxXpmkXZHczyexManHMzmwCSa6mG++dyoPnZLleIH7nVMAjFxEo1a8pGMDNslM6jFMytHHqPAw8uZf31BycxrN0dLRIuyS7C1AiH//bGAaO6Fll6guTbYMjnBcuXq2v3zlHjpzTKT64d+qSfVR/K6heHZCksk8jqDlZxfr0aJ52WToDUCJL/5yjoGtCov+66XW+k2iXc96sP0AJl6i6ljgjm7R179Kv00B5LZyBeSVPHZLOApSIxHH82iVy2lbl3IJH5d6hT4ah6gCt27R3r5wGkQNqToC5v/o6ZU93vFC5NwCtl8LMAPUir63FAsEbB89YDk/0EG3UjqIr6AWoOKDmz0XJ1Ti/F6AcyIEcyIEcyIH8asgvAEhPi3IW6D1lAAAAAElFTkSuQmCC');\n  background-size: 100% 100%;\n}\n.ai-component-common-auth-modal .ai-component-common-desc-info {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.ai-component-common-auth-modal .ai-component-common-desc-info .ai-component-common-desc-purpose {\n  font-weight: 600;\n  user-select: none;\n}\n.ai-component-common-auth-modal .ai-component-common-desc-info .ai-component-common-desc-tips {\n  margin-top: 16px;\n  user-select: none;\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list {\n  margin-bottom: 16px;\n  margin-top: 16px;\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list .ai-component-common-scope-item {\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  line-height: 22px;\n  cursor: pointer;\n  color: var(--text-weak, rgba(0, 0, 0, 0.24));\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list .ai-component-common-scope-item svg {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list .ai-component-common-scope-item svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list .ai-component-common-scope-item.scope-item-checked {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-common-auth-modal .ai-component-common-scope-list .ai-component-common-scope-item.scope-item-checked svg path {\n  fill: var(--accent-default, #1e6fff);\n}\n.ai-component-common-auth-modal .ai-component-common-policy-agree-wrapper {\n  margin-bottom: 12px;\n}\n.ai-component-common-auth-modal .ai-component-common-policy-agree-wrapper .ai-component-common-policy-agree-label {\n  display: block;\n  font-size: 12px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-common-auth-modal .ai-component-common-policy-agree-wrapper .ai-component-common-policy-agree-label .ai-component-common-agree-link {\n  font-size: 12px;\n  margin: 0 4px 0 0;\n  display: inline-block;\n  text-decoration: none;\n  color: var(--text-link, #175ceb);\n  cursor: pointer;\n}\n.ai-component-common-auth-modal .ai-component-common-policy-agree-wrapper .ai-component-common-policy-agree-label .ai-component-common-agree-link:hover {\n  text-decoration: underline;\n}\n");
	y = [
		"onConsent",
		"isModal",
		"scene",
		"title",
		"content",
		"desc"
	];
}));
var init_ux_atom = __esmMin((() => {
	init_index_a8948600();
	require_react();
	require_classnames();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-pdf.svg
var application_pdf_default;
var init_application_pdf = __esmMin((() => {
	application_pdf_default = "" + new URL("application-pdf-Bex5soWh.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.ms-excel.svg
var application_vnd_ms_excel_default;
var init_application_vnd_ms_excel = __esmMin((() => {
	application_vnd_ms_excel_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.5%204.34375C4.5%203.48081%205.19956%202.78125%206.0625%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H6.0625C5.19956%2021.2188%204.5%2020.5192%204.5%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H6.0625C5.71732%203.71875%205.4375%203.99857%205.4375%204.34375V19.6562C5.4375%2020.0014%205.71732%2020.2812%206.0625%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM6.0625%202.78125C5.19956%202.78125%204.5%203.48081%204.5%204.34375V19.6562C4.5%2020.5192%205.19956%2021.2188%206.0625%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H6.0625Z'%20fill='%2300AA5B'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.4062%208.25H15.9062V9.40385H18.4062V8.25ZM18.4062%2010.5577H15.9062V11.7115H18.4062V10.5577ZM15.9062%2012.8654H18.4062V14.0192H15.9062V12.8654ZM18.4062%2015.1731H15.9062V16.3269H18.4062V15.1731Z'%20fill='%2300AA5B'%20fill-opacity='0.3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.2812%208.25H13.0938V9.40385H15.2812V8.25ZM15.2812%2010.5577H13.0938V11.7115H15.2812V10.5577ZM13.0938%2012.8654H15.2812V14.0192H13.0938V12.8654ZM15.2812%2015.1731H13.0938V16.3269H15.2812V15.1731Z'%20fill='%2300AA5B'%20fill-opacity='0.3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.25%206.53125C3.25%206.18607%203.52982%205.90625%203.875%205.90625H13.875C14.2202%205.90625%2014.5%206.18607%2014.5%206.53125V17.4688C14.5%2017.8139%2014.2202%2018.0938%2013.875%2018.0938H3.875C3.52982%2018.0938%203.25%2017.8139%203.25%2017.4688V6.53125Z'%20fill='url(%23paint0_linear_2520_53023)'/%3e%3cg%20filter='url(%23filter0_d_2520_53023)'%3e%3cpath%20d='M5.4375%2015.4953L8.26322%2011.5707L8.25398%2012.8728L5.53908%209.03125H7.59834L9.33441%2011.5338L8.45714%2011.543L10.1655%209.03125H12.1417L9.42675%2012.7989V11.5061L12.2894%2015.4953H10.184L8.4202%2012.8635H9.26053L7.52447%2015.4953H5.4375Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2520_53023'%20x='5.15853'%20y='8.4733'%20width='8.52577'%20height='8.13796'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.557949'%20dy='0.278974'/%3e%3cfeGaussianBlur%20stdDeviation='0.418462'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2520_53023'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2520_53023'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2520_53023'%20x1='6.71703'%20y1='1.36349'%20x2='-2.52735'%20y2='12.4326'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2301D184'/%3e%3cstop%20offset='1'%20stop-color='%2300AA5B'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.ms-powerpoint.svg
var application_vnd_ms_powerpoint_default;
var init_application_vnd_ms_powerpoint = __esmMin((() => {
	application_vnd_ms_powerpoint_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.5%204.34375C4.5%203.48081%205.19956%202.78125%206.0625%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H6.0625C5.19956%2021.2188%204.5%2020.5192%204.5%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H6.0625C5.71732%203.71875%205.4375%203.99857%205.4375%204.34375V19.6562C5.4375%2020.0014%205.71732%2020.2812%206.0625%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM6.0625%202.78125C5.19956%202.78125%204.5%203.48081%204.5%204.34375V19.6562C4.5%2020.5192%205.19956%2021.2188%206.0625%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H6.0625Z'%20fill='%23FA762D'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.8669%2011.6873C18.8669%209.80619%2017.3479%208.28128%2015.474%208.28128V11.6873H18.8669ZM14.8034%2012.3753V8.96934C12.9295%208.96934%2011.4104%2010.4942%2011.4104%2012.3753C11.4104%2014.2564%2012.9295%2015.7813%2014.8034%2015.7813C16.6773%2015.7813%2018.1964%2014.2564%2018.1964%2012.3753H14.8034Z'%20fill='%23FA762D'%20fill-opacity='0.3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.25%206.53125C3.25%206.18607%203.52982%205.90625%203.875%205.90625H13.875C14.2202%205.90625%2014.5%206.18607%2014.5%206.53125V17.4688C14.5%2017.8139%2014.2202%2018.0938%2013.875%2018.0938H3.875C3.52982%2018.0938%203.25%2017.8139%203.25%2017.4688V6.53125Z'%20fill='url(%23paint0_linear_2520_53024)'/%3e%3cg%20filter='url(%23filter0_d_2520_53024)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.75%208.3125V15.6797H7.52559V13.485H8.82364C9.45001%2013.485%209.99471%2013.3851%2010.4552%2013.182L10.4562%2013.1815C10.9165%2012.9716%2011.2751%2012.672%2011.5283%2012.2821C11.782%2011.8912%2011.9071%2011.4305%2011.9071%2010.9037C11.9071%2010.3706%2011.7821%209.9065%2011.5283%209.51546C11.275%209.12535%2010.9163%208.82895%2010.4557%208.62563C9.99503%208.41575%209.45013%208.3125%208.82364%208.3125H5.75ZM7.43533%2015.295H5.84033V8.40276H5.84026V15.2951H7.43533V15.295ZM8.82364%2013.3948H7.43541V13.3947H8.82372C9.1045%2013.3947%209.36762%2013.3744%209.61306%2013.3336C9.3676%2013.3744%209.10446%2013.3948%208.82364%2013.3948ZM7.43541%2012.0951H8.73503C9.22733%2012.0951%209.59492%2011.99%209.83779%2011.78C10.0807%2011.5699%2010.2021%2011.2778%2010.2021%2010.9037C10.2021%2010.523%2010.0807%2010.2276%209.83779%2010.0175C9.59492%209.80747%209.22733%209.70245%208.73503%209.70245H7.43541V9.70243H8.7351C9.22741%209.70243%209.595%209.80746%209.83787%2010.0175C10.0807%2010.2276%2010.2022%2010.5229%2010.2022%2010.9037C10.2022%2011.2778%2010.0807%2011.5699%209.83787%2011.78C9.595%2011.99%209.22741%2012.095%208.7351%2012.095H7.43541V9.70245M8.73503%2012.0048H7.52559V9.79271H8.73503C9.21674%209.79271%209.55908%209.8958%209.77875%2010.0858C9.99808%2010.2755%2010.1118%2010.5438%2010.1118%2010.9037C10.1118%2011.2564%209.99845%2011.5217%209.77875%2011.7117C9.55908%2011.9017%209.21674%2012.0048%208.73503%2012.0048Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2520_53024'%20x='5.47103'%20y='7.75455'%20width='7.83095'%20height='9.04103'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.557949'%20dy='0.278974'/%3e%3cfeGaussianBlur%20stdDeviation='0.418462'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2520_53024'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2520_53024'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2520_53024'%20x1='4.17156'%20y1='2.61748'%20x2='-2.71888'%20y2='15.4736'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF8246'/%3e%3cstop%20offset='1'%20stop-color='%23FF5E2F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.ms-word.svg
var application_vnd_ms_word_default;
var init_application_vnd_ms_word = __esmMin((() => {
	application_vnd_ms_word_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.5%204.34375C4.5%203.48081%205.19956%202.78125%206.0625%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H6.0625C5.19956%2021.2188%204.5%2020.5192%204.5%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H6.0625C5.71732%203.71875%205.4375%203.99857%205.4375%204.34375V19.6562C5.4375%2020.0014%205.71732%2020.2812%206.0625%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM6.0625%202.78125C5.19956%202.78125%204.5%203.48081%204.5%204.34375V19.6562C4.5%2020.5192%205.19956%2021.2188%206.0625%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H6.0625Z'%20fill='%233A7DFF'%20fill-opacity='0.64'/%3e%3crect%20x='11.0625'%20y='8.09375'%20width='7.1875'%20height='0.9375'%20fill='%233A7DFF'%20fill-opacity='0.3'/%3e%3crect%20x='11.0625'%20y='10.5938'%20width='7.1875'%20height='0.9375'%20fill='%233A7DFF'%20fill-opacity='0.3'/%3e%3crect%20x='11.0625'%20y='13.0938'%20width='7.1875'%20height='0.9375'%20fill='%233A7DFF'%20fill-opacity='0.3'/%3e%3crect%20x='11.0625'%20y='15.5938'%20width='7.1875'%20height='0.9375'%20fill='%233A7DFF'%20fill-opacity='0.3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.25%206.53125C3.25%206.18607%203.52982%205.90625%203.875%205.90625H13.875C14.2202%205.90625%2014.5%206.18607%2014.5%206.53125V17.4688C14.5%2017.8139%2014.2202%2018.0938%2013.875%2018.0938H3.875C3.52982%2018.0938%203.25%2017.8139%203.25%2017.4688V6.53125Z'%20fill='url(%23paint0_linear_2520_53022)'/%3e%3cg%20filter='url(%23filter0_d_2520_53022)'%3e%3cpath%20d='M6.1626%2014.787L4.5%209.6178H5.99414L7.39307%2014.0929H6.63867L8.11084%209.6178H9.44385L10.8354%2014.0929H10.1104L11.5532%209.6178H12.9375L11.2749%2014.787H9.72217L8.53564%2010.984H8.95312L7.71533%2014.787H6.1626Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2520_53022'%20x='4.22103'%20y='9.05985'%20width='10.1113'%20height='6.84304'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.557949'%20dy='0.278974'/%3e%3cfeGaussianBlur%20stdDeviation='0.418462'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2520_53022'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2520_53022'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2520_53022'%20x1='14.9588'%20y1='1.93752'%20x2='2.83106'%20y2='18.4769'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334A4FF'/%3e%3cstop%20offset='0.999235'%20stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.board.svg
var application_vnd_tdocs_apps_board_default;
var init_application_vnd_tdocs_apps_board = __esmMin((() => {
	application_vnd_tdocs_apps_board_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cg%20filter='url(%23a)'%3e%3cpath%20fill='url(%23b)'%20fill-rule='evenodd'%20d='M6.673%208.387c0-.593.476-1.075%201.062-1.075h11.94c.586%200%201.06.482%201.06%201.075v11.288c0%20.594-.474%201.075-1.06%201.075H7.734a1.068%201.068%200%200%201-1.062-1.075V8.387Z'%20clip-rule='evenodd'/%3e%3c/g%3e%3cpath%20fill='url(%23c)'%20fill-rule='evenodd'%20d='M4.798%203.25c-.69%200-1.25.56-1.25%201.25v15c0%20.69.56%201.25%201.25%201.25h15v-.011A1.094%201.094%200%200%201%2018.56%2019.5h-.01v-15c0-.69-.56-1.25-1.25-1.25h-12.5Z'%20clip-rule='evenodd'/%3e%3cg%20filter='url(%23d)'%3e%3cellipse%20cx='10.229'%20cy='14.876'%20fill='%23FFBBD2'%20rx='3.323'%20ry='3.322'/%3e%3c/g%3e%3cg%20filter='url(%23e)'%3e%3crect%20width='6.213'%20height='6.211'%20x='9.444'%20y='9.299'%20fill='%23fff'%20rx='.519'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='a'%20width='14.863'%20height='13.438'%20x='6.673'%20y='7.313'%20color-interpolation-filters='sRGB'%20filterUnits='userSpaceOnUse'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20result='hardAlpha'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'/%3e%3cfeOffset%20dx='.8'/%3e%3cfeGaussianBlur%20stdDeviation='.4'/%3e%3cfeComposite%20in2='hardAlpha'%20k2='-1'%20k3='1'%20operator='arithmetic'/%3e%3cfeColorMatrix%20values='0%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.24%200'/%3e%3cfeBlend%20in2='shape'%20result='effect1_innerShadow_175_92747'/%3e%3c/filter%3e%3cfilter%20id='d'%20width='8.245'%20height='8.243'%20x='6.653'%20y='11.02'%20color-interpolation-filters='sRGB'%20filterUnits='userSpaceOnUse'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20result='hardAlpha'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'/%3e%3cfeOffset%20dx='.547'%20dy='.266'/%3e%3cfeGaussianBlur%20stdDeviation='.4'/%3e%3cfeColorMatrix%20values='0%200%200%200%200.752941%200%200%200%200%200.0941176%200%200%200%200%200.352941%200%200%200%200.68%200'/%3e%3cfeBlend%20in2='BackgroundImageFix'%20result='effect1_dropShadow_175_92747'/%3e%3cfeBlend%20in='SourceGraphic'%20in2='effect1_dropShadow_175_92747'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='e'%20width='7.813'%20height='7.811'%20x='7.844'%20y='9.299'%20color-interpolation-filters='sRGB'%20filterUnits='userSpaceOnUse'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20result='hardAlpha'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'/%3e%3cfeOffset%20dx='-.8'%20dy='.8'/%3e%3cfeGaussianBlur%20stdDeviation='.4'/%3e%3cfeColorMatrix%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.12276%200'/%3e%3cfeBlend%20in2='BackgroundImageFix'%20result='effect1_dropShadow_175_92747'/%3e%3cfeBlend%20in='SourceGraphic'%20in2='effect1_dropShadow_175_92747'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='b'%20x1='20.736'%20x2='17.871'%20y1='12.662'%20y2='12.662'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF2071'/%3e%3cstop%20offset='1'%20stop-color='%23BC0254'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='7.1'%20x2='-.475'%20y1='-.348'%20y2='16.756'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF6F9D'/%3e%3cstop%20offset='1'%20stop-color='%23FF3075'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.default.svg
var application_vnd_tdocs_apps_default_default;
var init_application_vnd_tdocs_apps_default = __esmMin((() => {
	application_vnd_tdocs_apps_default_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%2381868F'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.18799%206.0625H12.7419V9.89719V10.6706V10.7608H17.1877V17.5625C17.1877%2017.7696%2017.0199%2017.9375%2016.8127%2017.9375H7.18799C6.98088%2017.9375%206.81299%2017.7696%206.81299%2017.5625V6.4375C6.81299%206.23039%206.98088%206.0625%207.18799%206.0625ZM17.1805%209.89719C17.1658%209.82353%2017.1292%209.75538%2017.0747%209.70214L13.6311%206.34152V9.89719H17.1805Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.doc.svg
var application_vnd_tdocs_apps_doc_default;
var init_application_vnd_tdocs_apps_doc = __esmMin((() => {
	application_vnd_tdocs_apps_doc_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_2519_51698)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.8125%203.25C4.12214%203.25%203.5625%203.80964%203.5625%204.5V19.5C3.5625%2020.1904%204.12214%2020.75%204.8125%2020.75H18.5625H19.6562H19.8125V20.7389C19.7615%2020.7462%2019.7093%2020.75%2019.6562%2020.75C19.0522%2020.75%2018.5625%2020.2603%2018.5625%2019.6562C18.5625%2019.6032%2018.5663%2019.551%2018.5736%2019.5H18.5625V4.5C18.5625%203.80964%2018.0029%203.25%2017.3125%203.25H4.8125Z'%20fill='url(%23paint1_linear_2519_51698)'/%3e%3cg%20filter='url(%23filter0_d_2519_51698)'%3e%3crect%20x='6.6875'%20y='15.9062'%20width='8.74998'%20height='1.71875'%20fill='%23B3D9FF'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_d_2519_51698)'%3e%3crect%20x='6.68762'%20y='12.9375'%20width='8.74998'%20height='1.71875'%20fill='%23D3F3FF'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2519_51698'%20x='6.42083'%20y='15.3729'%20width='10.35'%20height='3.31875'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.360784%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51698'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='filter1_d_2519_51698'%20x='6.42096'%20y='12.4042'%20width='10.35'%20height='3.31875'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.360784%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51698'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2519_51698'%20x1='20.75'%20y1='10.214'%20x2='18.4467'%20y2='10.214'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231E6FFF'/%3e%3cstop%20offset='1'%20stop-color='%23144DEB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2519_51698'%20x1='19.1464'%20y1='-2.44868'%20x2='1.21081'%20y2='19.2317'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334A4FF'/%3e%3cstop%20offset='0.999235'%20stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.flowchart.svg
var application_vnd_tdocs_apps_flowchart_default;
var init_application_vnd_tdocs_apps_flowchart = __esmMin((() => {
	application_vnd_tdocs_apps_flowchart_default = "" + new URL("application-vnd.tdocs-apps.flowchart-CZwzDxAG.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.form.svg
var application_vnd_tdocs_apps_form_default;
var init_application_vnd_tdocs_apps_form = __esmMin((() => {
	application_vnd_tdocs_apps_form_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_2519_51664)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.8125%203.25C4.12214%203.25%203.5625%203.80964%203.5625%204.5V19.5C3.5625%2020.1904%204.12214%2020.75%204.8125%2020.75H18.5625H19.6562H19.8125V20.7389C19.7615%2020.7462%2019.7093%2020.75%2019.6562%2020.75C19.0522%2020.75%2018.5625%2020.2603%2018.5625%2019.6562C18.5625%2019.6032%2018.5663%2019.551%2018.5736%2019.5H18.5625V4.5C18.5625%203.80964%2018.0029%203.25%2017.3125%203.25H4.8125Z'%20fill='url(%23paint1_linear_2519_51664)'/%3e%3cg%20filter='url(%23filter0_d_2519_51664)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.70882%2015.5979L8.69334%2015.6133L9.92857%2016.8438L15.2812%2011.5117L14.046%2010.2812L9.92058%2014.3908L8.0561%2012.5353L6.84375%2013.7418L8.70882%2015.5979Z'%20fill='%23FFFBE0'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2519_51664'%20x='6.62153'%20y='9.83681'%20width='9.77083'%20height='7.89583'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.444444'%20dy='0.222222'/%3e%3cfeGaussianBlur%20stdDeviation='0.333333'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.510162%200%200%200%200%200.263303%200%200%200%200%200%200%200%200%200.207359%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51664'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51664'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2519_51664'%20x1='20.7311'%20y1='11.5591'%20x2='18.0296'%20y2='11.5591'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23EB9000'/%3e%3cstop%20offset='1'%20stop-color='%23EB7E00'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2519_51664'%20x1='7.15915'%20y1='-3.00326'%20x2='-5.61447'%20y2='13.5029'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFCD00'/%3e%3cstop%20offset='0.999314'%20stop-color='%23FFAB00'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.markdown.svg
var application_vnd_tdocs_apps_markdown_default;
var init_application_vnd_tdocs_apps_markdown = __esmMin((() => {
	application_vnd_tdocs_apps_markdown_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%236F7DE8'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.90625%208.875V15.75H7.5781V12.0622L9.4881%2015.1518H10.3048L12.2259%2011.9779V15.75H13.8859V8.875H12.4379L9.92243%2013.0472L7.36404%208.875H5.90625Z'%20fill='url(%23paint0_linear_142_320)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M17.7812%208.875V12.9375H18.875L16.8438%2015.9062L14.8125%2012.9375H15.9062V8.875H17.7812Z'%20fill='url(%23paint1_linear_142_320)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_142_320'%20x1='13.3608'%20y1='8.875'%20x2='7.78419'%20y2='17.5234'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%238896FF'%20stop-opacity='0.99'/%3e%3cstop%20offset='0.765625'%20stop-color='%236F7DE8'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_142_320'%20x1='18.5398'%20y1='8.875'%20x2='12.6105'%20y2='13.4727'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%238896FF'%20stop-opacity='0.99'/%3e%3cstop%20offset='0.765625'%20stop-color='%236F7DE8'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.mind.svg
var application_vnd_tdocs_apps_mind_default;
var init_application_vnd_tdocs_apps_mind = __esmMin((() => {
	application_vnd_tdocs_apps_mind_default = "" + new URL("application-vnd.tdocs-apps.mind-8stJF5-D.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.ofd.svg
var application_vnd_tdocs_apps_ofd_default;
var init_application_vnd_tdocs_apps_ofd = __esmMin((() => {
	application_vnd_tdocs_apps_ofd_default = "" + new URL("application-vnd.tdocs-apps.ofd-Cc1wh3qo.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.rec.svg
var application_vnd_tdocs_apps_rec_default;
var init_application_vnd_tdocs_apps_rec = __esmMin((() => {
	application_vnd_tdocs_apps_rec_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_2519_51637)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.8125%203.25C4.12214%203.25%203.5625%203.80964%203.5625%204.5V19.5C3.5625%2020.1904%204.12214%2020.75%204.8125%2020.75H18.5625H19.6562H19.8125V20.7389C19.7615%2020.7462%2019.7093%2020.75%2019.6562%2020.75C19.0522%2020.75%2018.5625%2020.2603%2018.5625%2019.6562C18.5625%2019.6032%2018.5663%2019.551%2018.5736%2019.5H18.5625V4.5C18.5625%203.80964%2018.0029%203.25%2017.3125%203.25H4.8125Z'%20fill='url(%23paint1_linear_2519_51637)'/%3e%3cg%20filter='url(%23filter0_d_2519_51637)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.0631%2016.156C9.77407%2016.156%208.61313%2015.3837%208.06275%2014.1875L6.84375%2014.7243L6.86945%2014.7792C7.54609%2016.2026%208.86976%2017.1931%2010.4033%2017.4161V18.25H11.7217V17.4163C13.2744%2017.1909%2014.6122%2016.1789%2015.2812%2014.7271L14.0626%2014.1896L14.0383%2014.2413C13.4781%2015.4069%2012.3328%2016.156%2011.0631%2016.156Z'%20fill='%23B3D9FF'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_d_2519_51637)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.0625%208.5625C9.68179%208.5625%208.5625%209.68717%208.5625%2011.0745V12.9255C8.5625%2014.3128%209.68179%2015.4375%2011.0625%2015.4375C12.4432%2015.4375%2013.5625%2014.3128%2013.5625%2012.9255V11.0745C13.5625%209.68717%2012.4432%208.5625%2011.0625%208.5625ZM11.0626%209.8846C11.7166%209.8846%2012.2468%2010.4173%2012.2468%2011.0745V12.9255C12.2468%2013.5826%2011.7166%2014.1154%2011.0626%2014.1154C10.4085%2014.1154%209.87834%2013.5826%209.87834%2012.9255V11.0745C9.87834%2010.4173%2010.4085%209.8846%2011.0626%209.8846Z'%20fill='%23D3F3FF'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2519_51637'%20x='6.57708'%20y='13.6542'%20width='10.0375'%20height='5.6625'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.360784%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51637'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51637'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='filter1_d_2519_51637'%20x='8.29583'%20y='8.02917'%20width='6.6'%20height='8.475'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.360784%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51637'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51637'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2519_51637'%20x1='20.75'%20y1='10.214'%20x2='18.4467'%20y2='10.214'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231E6FFF'/%3e%3cstop%20offset='1'%20stop-color='%23144DEB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2519_51637'%20x1='19.1464'%20y1='-2.44868'%20x2='1.21081'%20y2='19.2317'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334A4FF'/%3e%3cstop%20offset='0.999235'%20stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.sheet.svg
var application_vnd_tdocs_apps_sheet_default;
var init_application_vnd_tdocs_apps_sheet = __esmMin((() => {
	application_vnd_tdocs_apps_sheet_default = "" + new URL("application-vnd.tdocs-apps.sheet-BjttRUG9.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.slide.svg
var application_vnd_tdocs_apps_slide_default;
var init_application_vnd_tdocs_apps_slide = __esmMin((() => {
	application_vnd_tdocs_apps_slide_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_2519_51673)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.8125%203.25C4.12214%203.25%203.5625%203.80964%203.5625%204.5V19.5C3.5625%2020.1904%204.12214%2020.75%204.8125%2020.75H18.5625H19.6562H19.8125V20.7389C19.7615%2020.7462%2019.7093%2020.75%2019.6562%2020.75C19.0522%2020.75%2018.5625%2020.2603%2018.5625%2019.6562C18.5625%2019.6032%2018.5663%2019.551%2018.5736%2019.5H18.5625V4.5C18.5625%203.80964%2018.0029%203.25%2017.3125%203.25H4.8125Z'%20fill='url(%23paint1_linear_2519_51673)'/%3e%3cg%20filter='url(%23filter0_d_2519_51673)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.4402%2013.8892C15.4402%2013.8845%2015.4402%2013.8797%2015.4402%2013.8749C15.4402%2013.8702%2015.4402%2013.8654%2015.4402%2013.8606V13.8892ZM15.4375%2014.0312C15.3552%2016.3751%2013.4286%2018.2499%2011.0639%2018.2499C8.64687%2018.2499%206.6875%2016.2912%206.6875%2013.8749C6.6875%2011.511%208.56295%209.58497%2010.9075%209.50269V14.0312H15.4375Z'%20fill='%23FFD7BF'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_d_2519_51673)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.3708%2013.0938C15.048%2011.3038%2013.636%209.89225%2011.8455%209.56958V13.0938H15.3708Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2519_51673'%20x='6.42083'%20y='8.96935'%20width='10.3527'%20height='10.3473'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51673'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='filter1_d_2519_51673'%20x='11.5788'%20y='9.03625'%20width='5.12527'%20height='5.12417'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.533333'%20dy='0.266667'/%3e%3cfeGaussianBlur%20stdDeviation='0.4'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.457456%200%200%200%200%200%200%200%200%200%200%200%200%200%200.16%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2519_51673'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2519_51673'%20x1='20.75'%20y1='11.4806'%20x2='18.3746'%20y2='11.4806'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23EB4825'/%3e%3cstop%20offset='1'%20stop-color='%23EB3319'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2519_51673'%20x1='4.89364'%20y1='-1.47234'%20x2='-4.96774'%20y2='17.0364'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF8246'/%3e%3cstop%20offset='1'%20stop-color='%23FF5E2F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.smartcanvas.svg
var application_vnd_tdocs_apps_smartcanvas_default;
var init_application_vnd_tdocs_apps_smartcanvas = __esmMin((() => {
	application_vnd_tdocs_apps_smartcanvas_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_2572_52172)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.8125%203.25C4.12214%203.25%203.5625%203.80964%203.5625%204.5V19.5C3.5625%2020.1904%204.12214%2020.75%204.8125%2020.75H18.5625H19.6562H19.8125V20.7389C19.7615%2020.7462%2019.7093%2020.75%2019.6562%2020.75C19.0522%2020.75%2018.5625%2020.2603%2018.5625%2019.6562C18.5625%2019.6032%2018.5663%2019.551%2018.5736%2019.5H18.5625V4.5C18.5625%203.80964%2018.0029%203.25%2017.3125%203.25H4.8125Z'%20fill='url(%23paint1_linear_2572_52172)'/%3e%3cg%20filter='url(%23filter0_d_2572_52172)'%3e%3cpath%20d='M6.6875%209.8125H8.25V17.9375H6.6875V9.8125Z'%20fill='%23ECFCFF'/%3e%3cpath%20d='M8.25%209.8125H9.8125V11.3691H8.25V9.8125Z'%20fill='%23ECFCFF'/%3e%3cpath%20d='M8.25%2016.3809H9.8125V17.9375L8.25%2017.9375V16.3809Z'%20fill='%23ECFCFF'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_d_2572_52172)'%3e%3cpath%20d='M15.4375%209.8125H13.875V17.9375H15.4375V9.8125Z'%20fill='%23CAEFFB'/%3e%3cpath%20d='M13.875%209.8125H12.3125V11.3691H13.875V9.8125Z'%20fill='%23CAEFFB'/%3e%3cpath%20d='M13.875%2016.3809H12.3125V17.9375L13.875%2017.9375V16.3809Z'%20fill='%23CAEFFB'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_2572_52172'%20x='5.83417'%20y='8.10583'%20width='8.245'%20height='13.245'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='1.70667'%20dy='0.853333'/%3e%3cfeGaussianBlur%20stdDeviation='1.28'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.622274%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2572_52172'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='filter1_d_2572_52172'%20x='11.4592'%20y='8.10583'%20width='8.245'%20height='13.245'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='1.70667'%20dy='0.853333'/%3e%3cfeGaussianBlur%20stdDeviation='1.28'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_2572_52172'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_2572_52172'%20x1='9.5467'%20y1='7.3125'%20x2='9.5467'%20y2='21.1605'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232DA5EB'/%3e%3cstop%20offset='1'%20stop-color='%232198EB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2572_52172'%20x1='11.1878'%20y1='-5.5'%20x2='-6.3416'%20y2='11.7784'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%234DD1FF'/%3e%3cstop%20offset='1'%20stop-color='%233CBFFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/application-vnd.tdocs-apps.smartsheet.svg
var application_vnd_tdocs_apps_smartsheet_default;
var init_application_vnd_tdocs_apps_smartsheet = __esmMin((() => {
	application_vnd_tdocs_apps_smartsheet_default = "" + new URL("application-vnd.tdocs-apps.smartsheet-TWm70lA2.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/image.svg
var image_default;
var init_image = __esmMin((() => {
	image_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%234B8DFF'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.8647%208.95703C9.6845%208.95703%2010.3491%208.30907%2010.3491%207.50977C10.3491%206.71046%209.6845%206.0625%208.8647%206.0625C8.0449%206.0625%207.38033%206.71046%207.38033%207.50977C7.38033%208.30907%208.0449%208.95703%208.8647%208.95703ZM9.11888%2011.6765C9.17808%2011.5864%209.30869%2011.5819%209.37393%2011.6678L11.1337%2013.985C11.1979%2014.0695%2011.3258%2014.0668%2011.3864%2013.9797L13.9329%2010.3191C13.9968%2010.2271%2014.134%2010.2304%2014.1935%2010.3253L18.3871%2017.0107C18.4523%2017.1148%2018.3775%2017.25%2018.2547%2017.25H5.74971C5.62542%2017.25%205.55088%2017.1119%205.61909%2017.008L9.11888%2011.6765Z'%20fill='url(%23paint0_linear_2520_53028)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2520_53028'%20x1='8.99547'%20y1='8.79429'%20x2='8.68441'%20y2='17.2274'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%235F9AFF'/%3e%3cstop%20offset='0.901042'%20stop-color='%234B8DFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/text.svg
var text_default;
var init_text = __esmMin((() => {
	text_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%2381868F'%20fill-opacity='0.64'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7%207H16.9999V8.875H7V7ZM7%2011.0625H16.9999V12.9375H7V11.0625ZM16.9999%2015.125H7V17H16.9999V15.125Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/app_logo_tencentlibrary_fill_36.svg
var app_logo_tencentlibrary_fill_36_default;
var init_app_logo_tencentlibrary_fill_36 = __esmMin((() => {
	app_logo_tencentlibrary_fill_36_default = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.9807%207.31075C28.9807%206.03461%2027.9461%205%2026.6699%205H9.33004C8.0539%205%207.01929%206.03461%207.01929%207.31075V28.6893C7.01929%2029.9654%208.0539%2031%209.33004%2031H26.6688C27.9449%2031%2028.9795%2029.9654%2028.9795%2028.6893V9.9118H24.0677V18.904C24.0677%2019.1745%2023.7879%2019.3545%2023.5417%2019.2419L17.4211%2016.4411V9.9118H11.2611C10.9301%209.9118%2010.6015%209.82006%2010.3298%209.63195C9.20695%208.85396%209.93385%207.31191%2010.9638%207.31191H28.9807V7.31075Z'%20fill='%23006FFF'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/icon/desktop/svg/app_logo_wechat_fill_36.svg
var app_logo_wechat_fill_36_default;
var init_app_logo_wechat_fill_36 = __esmMin((() => {
	app_logo_wechat_fill_36_default = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.4194%2011.759C15.4194%2012.6297%2016.1035%2013.319%2016.9678%2013.319C17.8319%2013.319%2018.5161%2012.5934%2018.5161%2011.759C18.5161%2010.8883%2017.8319%2010.199%2016.9678%2010.199C16.1035%2010.199%2015.4194%2010.8883%2015.4194%2011.759ZM8.19354%2011.759C8.19354%2012.6297%208.87771%2013.319%209.74193%2013.319C10.6061%2013.319%2011.2903%2012.5934%2011.2903%2011.759C11.2903%2010.8883%2010.6061%2010.199%209.74193%2010.199C8.87771%2010.199%208.19354%2010.8883%208.19354%2011.759ZM2%2014.3244C2%209.15902%207.13712%204.99902%2013.4434%204.99902C19.1474%204.99902%2023.8948%208.39635%2024.7097%2012.8683H24.0719C18.3325%2012.8683%2013.656%2016.6817%2013.656%2021.3617C13.656%2022.159%2013.7977%2022.9217%2014.0456%2023.6497H13.408C12.1325%2023.6497%2010.8571%2023.4416%209.68798%2023.1296C9.5817%2023.095%209.47542%2023.095%209.36914%2023.095C9.15656%2023.095%208.94398%2023.1643%208.76683%2023.2683L6.25142%2024.6896C6.18056%2024.7242%206.10969%2024.759%206.03884%2024.759C5.82628%2024.759%205.64913%2024.5857%205.64913%2024.3776C5.64913%2024.2954%205.67131%2024.2347%205.69813%2024.1616C5.70519%2024.1422%205.71259%2024.1221%205.71998%2024.1002C5.75542%2024.0656%206.07427%2022.9217%206.25142%2022.2283C6.25142%2022.1936%206.26027%2022.1503%206.26913%2022.107C6.27799%2022.0637%206.28684%2022.0203%206.28684%2021.9857C6.28684%2021.7083%206.14514%2021.5004%205.96798%2021.3617C3.52343%2019.663%202%2017.1324%202%2014.3244ZM26.5134%2019.6617C26.5134%2020.3729%2027.0747%2020.9417%2027.7761%2020.9417C28.4777%2020.9417%2029.039%2020.3374%2029.039%2019.6617C29.039%2018.9507%2028.4777%2018.3818%2027.7761%2018.3818C27.0747%2018.3818%2026.5134%2018.9507%2026.5134%2019.6617ZM20.2898%2019.6617C20.2898%2020.3729%2020.8511%2020.9417%2021.5527%2020.9417C22.2541%2020.9417%2022.8154%2020.3374%2022.8154%2019.6617C22.8154%2018.9507%2022.2541%2018.3818%2021.5527%2018.3818C20.8511%2018.3818%2020.2898%2018.9507%2020.2898%2019.6617ZM34%2022.2061C34%2024.5531%2032.7566%2026.6902%2030.788%2028.1264C30.6154%2028.2314%2030.5118%2028.4066%2030.5463%2028.6519C30.5463%2028.7219%2030.5463%2028.7919%2030.5809%2028.862C30.6666%2029.2319%2030.8057%2029.7365%2030.8987%2030.0746C30.9556%2030.281%2030.9952%2030.4253%2030.9952%2030.4385C30.9952%2030.4964%2031.0057%2030.5435%2031.0152%2030.5861C31.0228%2030.6207%2031.0297%2030.6522%2031.0297%2030.6837C31.0297%2030.8588%2030.8916%2030.999%2030.719%2030.999C30.6683%2030.999%2030.6363%2030.9801%2030.5957%2030.9564C30.5809%2030.9477%2030.5648%2030.9383%2030.5463%2030.929L28.5086%2029.7378C28.3705%2029.6677%2028.1977%2029.5977%2028.0251%2029.5977C27.9215%2029.5977%2027.8179%2029.5977%2027.7489%2029.6328C26.7817%2029.913%2025.7802%2030.0532%2024.7097%2030.0532C19.5636%2030.0532%2015.4194%2026.5499%2015.4194%2022.2061C15.4194%2017.8621%2019.5636%2014.359%2024.7097%2014.359C29.8556%2014.359%2034%2017.8621%2034%2022.2061Z'%20fill='url(%23paint0_linear_107554_21594)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_107554_21594'%20x1='11.8618'%20y1='-4.69218'%20x2='-6.17087'%20y2='24.0971'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2300D689'%20style='stop-color:%2300D689;stop-color:color(display-p3%200.0000%200.8392%200.5373);stop-opacity:1;'/%3e%3cstop%20offset='1'%20stop-color='%2300AA5B'%20style='stop-color:%2300AA5B;stop-color:color(display-p3%200.0000%200.6667%200.3569);stop-opacity:1;'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/pc/svg/list_24_link_blue.svg
var list_24_link_blue_default;
var init_list_24_link_blue = __esmMin((() => {
	list_24_link_blue_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3elist_24_link_blue%3c/title%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='资源_链接多态切换'%20transform='translate(-17.000000,%20-176.000000)'%3e%3cg%20id='编组'%20transform='translate(17.000000,%20128.000000)'%3e%3cg%20transform='translate(0.000000,%2048.000000)'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='24'%20height='24'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M6.28556158,12%20C6.54856135,12.2629998%206.54856135,12.6894066%206.28556158,12.9524064%20L5.33315518,13.9048128%20L5.33315518,13.9048128%20C4.01815635,15.2198116%204.01815635,17.351846%205.33315518,18.6668448%20C6.59555405,19.9292437%208.61093287,19.9797397%209.93357014,18.8183327%20L10.0951872,18.6668448%20L12.9524064,15.8096256%20C14.2674052,14.4946268%2014.2674052,12.3625924%2012.9524064,11.0475936%20C12.7895162,10.8847034%2012.6140894,10.7419906%2012.4292319,10.6194552%20L13.3949063,9.6527821%20C13.5726629,9.7860541%2013.7431481,9.93352246%2013.9048128,10.0951872%20C15.7458112,11.9361856%2015.7458112,14.9210337%2013.9048128,16.762032%20L11.0475936,19.6192512%20C9.20659523,21.4602496%206.22174714,21.4602496%204.38074877,19.6192512%20C2.53975041,17.7782529%202.53975041,14.7934048%204.38074877,12.9524064%20L5.33315518,12%20C5.59615494,11.7370002%206.02256181,11.7370002%206.28556158,12%20Z%20M12.9524064,4.38074877%20C14.7934048,2.53975041%2017.7782529,2.53975041%2019.6192512,4.38074877%20C21.4602496,6.22174714%2021.4602496,9.20659523%2019.6192512,11.0475936%20L18.6668448,12%20C18.4038451,12.2629998%2017.9774382,12.2629998%2017.7144384,12%20C17.4514387,11.7370002%2017.4514387,11.3105934%2017.7144384,11.0475936%20L18.6668448,10.0951872%20L18.6668448,10.0951872%20C19.9818437,8.78018836%2019.9818437,6.64815401%2018.6668448,5.33315518%20C17.4044459,4.0707563%2015.3890671,4.02026034%2014.0664299,5.18166731%20L13.9048128,5.33315518%20L11.0475936,8.19037439%20C9.73259477,9.50537322%209.73259477,11.6374076%2011.0475936,12.9524064%20C11.2108231,13.1156359%2011.3866416,13.2586039%2011.5719236,13.3813104%20L10.6061821,14.3480337%20C10.428033,14.2145478%2010.2571819,14.0668075%2010.0951872,13.9048128%20C8.25418883,12.0638144%208.25418883,9.07896635%2010.0951872,7.23796798%20L12.9524064,4.38074877%20Z'%20id='形状'%20fill='%231E6FFF'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/utils/index.js
function S(e) {
	return /^https?:\/\//i.test(e) ? e : "https://".concat(e);
}
function x(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		t && (o = o.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, o);
	}
	return n;
}
function P(t) {
	for (var n = 1; n < arguments.length; n++) {
		var o = null != arguments[n] ? arguments[n] : {};
		n % 2 ? x(Object(o), !0).forEach((function(n) {
			r$7(t, n, o[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : x(Object(o)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));
		}));
	}
	return t;
}
function T$1(e, n) {
	var o, c = a$12((null === (o = new URL(S(e)).pathname) || void 0 === o ? void 0 : o.match(/^\/(sheet|slide|form|pdf|mind|flowchart|aio|smartsheet|board|document|rec|markdown|ofd|doc)/)) || [], 2)[1], r = W[c] || W.default;
	return "document" === c && (r = function(e) {
		if (!e) return "";
		return E[q.find((function(t) {
			return t === e;
		})) ? "image" : e];
	}(n) || W.document), {
		docType: c,
		docTypeLabel: C[c] || C.default,
		icon: r
	};
}
function G(e) {
	var t = !1, o = !1, s = !1, c = !1;
	return {
		referencesWithSource: e.filter((function(e) {
			return !(null == e || !e.url);
		})).map((function(e) {
			var r, d, a, i = {
				isSavable: !1,
				isPreviewable: !1,
				icon: list_24_link_blue_default,
				source: l$6.LINK
			};
			if (null !== (r = e.url) && void 0 !== r && r.match(D.WECHAT)) t = !0, i.icon = app_logo_wechat_fill_36_default, i.source = l$6.WECHAT, i.isSavable = !0;
			else if (null !== (d = e.url) && void 0 !== d && d.match(D.DOCS)) {
				o = !0, i.source = l$6.DOCS, i.isPreviewable = !0;
				i.icon = T$1(e.url, e.ext).icon;
			} else null !== (a = e.url) && void 0 !== a && a.match(D.WENKU) ? (s = !0, i.icon = app_logo_tencentlibrary_fill_36_default, i.source = l$6.WENKU) : (c = !0, i.isSavable = !0);
			return P(P({}, e), i);
		})),
		hasWechatSource: t,
		hasDocsSource: o,
		hasWenkuSource: s,
		hasLinkSource: c
	};
}
var D, W, q, E, C;
var init_utils = __esmMin((() => {
	init_defineProperty_740d2c7a();
	init_slicedToArray_fb5b6502();
	init_index_9dc8fb5d();
	init_application_pdf();
	init_application_vnd_ms_excel();
	init_application_vnd_ms_powerpoint();
	init_application_vnd_ms_word();
	init_application_vnd_tdocs_apps_board();
	init_application_vnd_tdocs_apps_default();
	init_application_vnd_tdocs_apps_doc();
	init_application_vnd_tdocs_apps_flowchart();
	init_application_vnd_tdocs_apps_form();
	init_application_vnd_tdocs_apps_markdown();
	init_application_vnd_tdocs_apps_mind();
	init_application_vnd_tdocs_apps_ofd();
	init_application_vnd_tdocs_apps_rec();
	init_application_vnd_tdocs_apps_sheet();
	init_application_vnd_tdocs_apps_slide();
	init_application_vnd_tdocs_apps_smartcanvas();
	init_application_vnd_tdocs_apps_smartsheet();
	init_image();
	init_text();
	init_app_logo_tencentlibrary_fill_36();
	init_app_logo_wechat_fill_36();
	init_list_24_link_blue();
	D = {
		WECHAT: /mp\.weixin\.qq\.com/,
		DOCS: /^(?!.*\bwenku\.docs\.qq\.com\b).*docs\.qq\.com/,
		WENKU: /wenku\.docs\.qq\.com/
	};
	W = {
		doc: application_vnd_tdocs_apps_doc_default,
		sheet: application_vnd_tdocs_apps_sheet_default,
		form: application_vnd_tdocs_apps_form_default,
		slide: application_vnd_tdocs_apps_slide_default,
		pdf: application_pdf_default,
		board: application_vnd_tdocs_apps_board_default,
		aio: application_vnd_tdocs_apps_smartcanvas_default,
		smartsheet: application_vnd_tdocs_apps_smartsheet_default,
		mind: application_vnd_tdocs_apps_mind_default,
		flowchart: application_vnd_tdocs_apps_flowchart_default,
		rec: application_vnd_tdocs_apps_rec_default,
		markdown: application_vnd_tdocs_apps_markdown_default,
		ofd: application_vnd_tdocs_apps_ofd_default,
		default: application_vnd_tdocs_apps_default_default,
		document: text_default
	};
	q = [
		"raw",
		"bmp",
		"pcx",
		"tiff",
		"gif",
		"jpeg",
		"exif",
		"fpx",
		"svg",
		"psd",
		"cdr",
		"pcd",
		"dxf",
		"ufo",
		"eps",
		"png",
		"jpg",
		"wmf",
		"webp",
		"tga",
		"tif",
		"jpe"
	];
	E = {
		tencentdoc: application_vnd_ms_word_default,
		tencentsheet: application_vnd_ms_excel_default,
		tencentslide: application_vnd_ms_powerpoint_default,
		pdf: application_pdf_default,
		markdown: application_vnd_tdocs_apps_markdown_default,
		image: image_default
	};
	C = {
		doc: "文档",
		sheet: "表格",
		slide: "幻灯片",
		form: "收集表",
		pdf: "PDF",
		board: "智能白板",
		aio: "智能文档",
		smartsheet: "智能表格",
		mind: "思维导图",
		flowchart: "流程图",
		rec: "语音速记",
		markdown: "Markdown",
		ofd: "OFD",
		image: "图片",
		default: "文档"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/switch-case/index.js
var import_react$7, n$2, l$1;
var init_switch_case = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	n$2 = function(l) {
		var r = l.condition, t = l.children, u = import_react$7.Children.map(t, (function(e) {
			var l = e;
			return l ? l.type === n$2.Success ? r ? e : null : l.type === n$2.Fail ? r ? null : e : null : null;
		}));
		return import_react$7.createElement(import_react$7.Fragment, null, u);
	};
	n$2.Success = import_react$7.memo((function(n) {
		var l = n.children;
		return import_react$7.createElement(import_react$7.Fragment, null, l);
	})), n$2.Fail = import_react$7.memo((function(n) {
		var l = n.children;
		return import_react$7.createElement(import_react$7.Fragment, null, l);
	}));
	l$1 = function(n) {
		var r = n.case, t = n.children, u = null, a = null;
		return import_react$7.Children.toArray(t).find((function(e) {
			var n, t, c;
			return e.type !== l$1.Default ? ((null == e || null === (n = e.props) || void 0 === n ? void 0 : n.case) === r || !0 === (null == e || null === (t = e.props) || void 0 === t ? void 0 : t.case) && void 0 === r) && (u = null == e || null === (c = e.props) || void 0 === c ? void 0 : c.children, !0) : (a = e.props.children, !1);
		})), u ? import_react$7.createElement(import_react$7.Fragment, null, u) : a || null;
	};
	l$1.Case = import_react$7.memo((function(n) {
		n.case;
		var l = n.children;
		return import_react$7.createElement(import_react$7.Fragment, null, l);
	})), l$1.Default = import_react$7.memo((function(n) {
		var l = n.children;
		return import_react$7.createElement(import_react$7.Fragment, null, l);
	}));
}));
var init_slide_outline = __esmMin((() => {
	require_react();
	init_index_be14aca1();
	require_classnames();
	require_react_dom();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/mind-flowchart-viewer/index.js
function b(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function h$1(n) {
	for (var t = 1; t < arguments.length; t++) {
		var r = null != arguments[t] ? arguments[t] : {};
		t % 2 ? b(Object(r), !0).forEach((function(t) {
			r$7(n, t, r[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r)) : b(Object(r)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(r, e));
		}));
	}
	return n;
}
var import_react$5, u$1, f, l, p, v, w, T;
var init_mind_flowchart_viewer = __esmMin((() => {
	init_defineProperty_740d2c7a();
	init_slicedToArray_fb5b6502();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-common-mind-flowchart-viewer-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  padding-top: 56.25%;\n  box-sizing: border-box;\n}\n.ai-component-common-mind-flowchart-viewer-wrapper .ai-component-common-mind-flowchart-viewer-nest-iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n"), function(e) {
		e.MIND = "https://docs.qq.com/mind/viewer/", e.FLOWCHART = "https://docs.qq.com/flowchart/viewer/";
	}(u$1 || (u$1 = {})), function(e) {
		e.APPEND_DATA = "APPEND_DATA", e.GET_DATA = "GET_DATA";
	}(f || (f = {})), function(e) {
		e.INIT = "init", e.APPEND = "append";
	}(l || (l = {})), function(e) {
		e.DEFAULT = "default", e.RIGHT = "right";
	}(p || (p = {})), function(e) {
		e.DEFAULT = "default", e.DEFAULT5 = "default5";
	}(v || (v = {})), function(e) {
		e.DEFAULT = "default", e.RIGHT = "right";
	}(w || (w = {}));
	T = (0, import_react$5.forwardRef)((function(e, r) {
		var m = e.value, w = e.type, b = e.done, T = void 0 !== b && b, D = e.className, E = void 0 === D ? "" : D, A = e.disableFitWindow, g = void 0 !== A && A, O = e.mindStructureClass, y = void 0 === O ? p.DEFAULT : O, P = e.mindThemeTopic, j = void 0 === P ? v.DEFAULT5 : P, N = e.callback, I = e.origin, F = a$12((0, import_react$5.useState)(!1), 2), _ = F[0], k = F[1], R = (0, import_react$5.useRef)(null), U = (0, import_react$5.useCallback)((function() {
			w === u$1.MIND ? k(!0) : setTimeout((function() {
				k(!0);
			}), 500);
		}), []);
		(0, import_react$5.useEffect)((function() {
			var e = R.current;
			return e?.addEventListener("load", U), function() {
				e?.removeEventListener("load", U);
			};
		}), []), (0, import_react$5.useImperativeHandle)(r, (function() {
			return { getIframe: function() {
				return R.current;
			} };
		}));
		(0, import_react$5.useEffect)((function() {
			_ && function(e) {
				var n, t = {
					data: e,
					type: l.INIT,
					done: T,
					renderOption: {
						mindThemeTopic: j,
						disableFitWindow: g
					}
				};
				"" === t.data && T || (w === u$1.MIND && y === p.RIGHT && (t.renderOption = h$1(h$1({}, t.renderOption), {}, { mindStructureClass: y })), null === (n = R.current) || void 0 === n || null === (n = n.contentWindow) || void 0 === n || n.postMessage({
					command: f.APPEND_DATA,
					params: t
				}, I || location.origin));
			}(m);
		}), [
			m,
			T,
			_
		]), (0, import_react$5.useEffect)((function() {
			var e = function(e) {
				var n = e.data;
				"RENDER_FINISH" === (null == n ? void 0 : n.command) && N?.();
			};
			return window.addEventListener("message", e), function() {
				window.removeEventListener("message", e);
			};
		}), [N]);
		var x = (0, import_react$5.useMemo)((function() {
			return w === u$1.MIND ? "".concat(w, "?embedded=1") : w;
		}), [w]);
		return import_react$5.createElement("div", { className: "".concat(E) }, import_react$5.createElement("div", { className: "ai-component-common-mind-flowchart-viewer-wrapper" }, import_react$5.createElement("iframe", {
			ref: R,
			id: "ai-nest-iframe",
			className: "ai-component-common-mind-flowchart-viewer-nest-iframe",
			src: x
		})));
	}));
}));
var init_arrow_heavy_right_16 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/horizontal-arrow-scroller/index.js
var import_react$4, c$1, a$2;
var init_horizontal_arrow_scroller = __esmMin((() => {
	init_slicedToArray_fb5b6502();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_arrow_heavy_right_16();
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-common-horizontal-arrow-scroller {\n  width: 100%;\n  position: relative;\n}\n.ai-component-common-horizontal-arrow-scroller-arrow-left {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 24px;\n  background: linear-gradient(270deg, var(--bg-lv1-default, #FFF) 58.75%, var(--base_white_000, rgba(255, 255, 255, 0)) 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(180deg);\n  height: 100%;\n  z-index: 888;\n  cursor: pointer;\n}\n.ai-component-common-horizontal-arrow-scroller-arrow-left img {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-common-horizontal-arrow-scroller-arrow-right {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 24px;\n  background: linear-gradient(270deg, var(--bg-lv1-default, #FFF) 58.75%, var(--base_white_000, rgba(255, 255, 255, 0)) 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  z-index: 888;\n  cursor: pointer;\n}\n.ai-component-common-horizontal-arrow-scroller-arrow-right img {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-common-horizontal-arrow-scroller-content {\n  width: 100%;\n  overflow-x: scroll;\n  scrollbar-width: none;\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.ai-component-common-horizontal-arrow-scroller-content::-webkit-scrollbar {\n  display: none;\n}\n");
	c$1 = "ai-component-common-horizontal-arrow-scroller";
	a$2 = function(i) {
		var a = i.children, s = (0, import_react$4.useRef)(null), m = (0, import_react$4.useRef)(null), h = a$12((0, import_react$4.useState)(0), 2), u = h[0], f = h[1], p = a$12((0, import_react$4.useState)(!0), 2), g = p[0], w = p[1], x = a$12((0, import_react$4.useState)(!0), 2), z = x[0], y = x[1];
		(0, import_react$4.useEffect)((function() {
			var n = u, r, o;
			s.current && m.current && (w(0 === n), n >= (null === (r = s.current) || void 0 === r ? void 0 : r.scrollWidth) - (null === (o = s.current) || void 0 === o ? void 0 : o.clientWidth) ? y(!0) : y(!1));
		}), [u, a]);
		return a ? import_react$4.createElement("div", {
			className: "".concat(c$1),
			ref: m
		}, !g && import_react$4.createElement("div", {
			className: "".concat(c$1, "-arrow-left"),
			onClick: function() {
				var n, r = null === (n = m.current) || void 0 === n ? void 0 : n.clientWidth;
				if (r && s.current) {
					var o = s.current.scrollLeft - .7 * r;
					s.current.scrollTo({
						left: o,
						behavior: "smooth"
					});
					f(o < 0 ? 0 : o > s.current.scrollWidth - r ? s.current.scrollWidth - r : o);
				}
			}
		}, import_react$4.createElement("img", { src: "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.6249%208C10.6249%207.83424%2010.5591%207.67527%2010.4418%207.55806L6.44185%203.55806L5.55796%204.44194L9.11602%208L5.55796%2011.5581L6.44185%2012.4419L10.4418%208.44194C10.5591%208.32473%2010.6249%208.16576%2010.6249%208Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e" })), !z && import_react$4.createElement("div", {
			className: "".concat(c$1, "-arrow-right"),
			onClick: function() {
				var n, r = null === (n = m.current) || void 0 === n ? void 0 : n.clientWidth;
				if (r && s.current) {
					var o = s.current.scrollLeft + .7 * r;
					s.current.scrollTo({
						left: o,
						behavior: "smooth"
					});
					f(o < 0 ? 0 : o > s.current.scrollWidth - r ? s.current.scrollWidth - r : o);
				}
			}
		}, import_react$4.createElement("img", { src: "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.6249%208C10.6249%207.83424%2010.5591%207.67527%2010.4418%207.55806L6.44185%203.55806L5.55796%204.44194L9.11602%208L5.55796%2011.5581L6.44185%2012.4419L10.4418%208.44194C10.5591%208.32473%2010.6249%208.16576%2010.6249%208Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e" })), import_react$4.createElement("div", {
			className: "".concat(c$1, "-content"),
			ref: s,
			onScroll: function(n) {
				f(n.currentTarget.scrollLeft);
			}
		}, a)) : null;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/feedback/index.js
var import_react$3, u, d$1;
var init_feedback = __esmMin((() => {
	init_toConsumableArray_19ff1ff1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_index_07e2ccf4();
	init_esm$3();
	init_esm$1();
	init_style_inject_es_3984fa0f();
	init_slicedToArray_fb5b6502();
	e$11(".feedback-form {\n  padding: 16px 16px 0 16px;\n}\n.feedback-form section {\n  margin-bottom: 24px;\n}\n.feedback-form section h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin-bottom: 12px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.feedback-form .options-group {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.feedback-form .options-group button {\n  font-family: \"PingFang SC\";\n  padding: 8px 16px;\n  border-radius: 4px;\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  transition: all 0.2s;\n  border: 1px solid transparent;\n}\n.feedback-form .options-group button.active {\n  background: var(--tsp-fill-accent-strong, rgba(30, 111, 255, 0.08));\n  border: 1px solid var(--feedback-accent, rgba(30, 111, 255));\n}\n.feedback-form textarea {\n  width: 100%;\n  min-height: 100px;\n  padding: 12px;\n  border: 1px solid var(--bd-gray, #e5e7eb);\n  border-radius: 4px;\n  font-size: 14px;\n  resize: none;\n  box-sizing: border-box;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n}\n.feedback-form textarea:focus {\n  outline: none;\n  border-color: #1677ff;\n}\n.feedback-form textarea::placeholder {\n  color: var(--text-gray, #9ca3af);\n}\n.ai-mobile-feedback-pull-panel {\n  padding-bottom: env(safe-area-inset-bottom);\n}\n.ai-mobile-feedback-pull-panel .dui-m-pullpanel-header-ok img {\n  filter: var(--icon-invert);\n}\n.ai-mobile-feedback-pull-panel .ai-mobile-feedback-footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  padding-bottom: 24px;\n  box-sizing: border-box;\n}\n.ai-mobile-feedback-pull-panel .ai-mobile-feedback-footer-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 200px;\n  height: 44px;\n  color: var(--text-white, #FFF);\n  background: var(--text-link, #1E6FFF);\n  border-radius: 4px;\n  font-family: \"PingFang SC\";\n  font-size: 17px;\n  font-weight: 500;\n}\n.ai-mobile-feedback-pull-panel .ai-mobile-feedback-footer-button.dui-m-button-disabled {\n  opacity: 0.5;\n}\n.ai-pc-feedback-modal .dui-modal-title {\n  line-height: 22px;\n  margin-bottom: 26px;\n  font-weight: 600;\n}\n.ai-pc-feedback-modal .dui-modal-footer {\n  display: none;\n}\n.ai-pc-feedback-modal .feedback-form {\n  padding: 0;\n}\n.ai-pc-feedback-modal .feedback-form section h3 {\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-pc-feedback-modal .ai-pc-feedback-footer {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  width: 100%;\n}\n.ai-pc-feedback-modal .ai-pc-feedback-footer .ai-pc-feedback-footer-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 92px;\n  height: 36px;\n  color: var(--text-white, #FFF);\n  background: var(--text-link, #1E6FFF);\n  border-radius: 4px;\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-weight: 600;\n}\n.ai-pc-feedback-modal .ai-pc-feedback-footer .ai-pc-feedback-footer-button.dui-button-type-default-disabled {\n  opacity: 0.5;\n}\n");
	u = function() {
		var n = a$12((0, import_react$3.useState)(""), 2), a = n[0], o = n[1], l = a$12((0, import_react$3.useState)([E$1.USER_EVALUATE_UNAPPROVAL]), 2);
		return {
			feedback: a,
			evaluateList: l[0],
			setFeedback: o,
			setEvaluateList: l[1]
		};
	};
	d$1 = function(t) {
		var l = t.footer, c = t.setFeedback, u = t.setEvaluateList, d = t.feedback, f = t.evaluateList, b = [
			{
				key: "context_error",
				label: s$5("feedback.button-text.context-error"),
				value: E$1.USER_EVALUATE_CONTEXT_ERROR
			},
			{
				key: "comprehension_error",
				label: s$5("feedback.button-text.comprehension-error"),
				value: E$1.USER_EVALUATE_UNDERSTANDING_ERROR
			},
			{
				key: "unrecognized_error",
				label: s$5("feedback.button-text.unrecognized-error"),
				value: E$1.USER_EVALUATE_UNIDENTIFIED_ERROR_IN_PROBLEM
			}
		], s = [
			{
				key: "illegal",
				label: s$5("feedback.button-text.illegal"),
				value: E$1.USER_EVALUATE_ILLEGAL_AND_HARMFUL
			},
			{
				key: "unprofessional",
				label: s$5("feedback.button-text.unprofessional"),
				value: E$1.USER_EVALUATE_UNPROFESSIONAL_CONTENT
			},
			{
				key: "reasoning_error",
				label: s$5("feedback.button-text.reasoning-error"),
				value: E$1.USER_EVALUATE_REASONING_ERROR
			},
			{
				key: "calculation_error",
				label: s$5("feedback.button-text.calculation-error"),
				value: E$1.USER_EVALUATE_CALCULATION_ERROR
			},
			{
				key: "incomplete",
				label: s$5("feedback.button-text.incomplete"),
				value: E$1.USER_EVALUATE_INCOMPLETE_CONTENT
			},
			{
				key: "factual_error",
				label: s$5("feedback.button-text.factual-error"),
				value: E$1.USER_EVALUATE_FACTUAL_ERROR
			}
		], p = [
			{
				key: "format_error",
				label: s$5("feedback.button-text.format-error"),
				value: E$1.USER_EVALUATE_FORMAT_ERROR
			},
			{
				key: "messy_code",
				label: s$5("feedback.button-text.messy-code"),
				value: E$1.USER_EVALUATE_ENCODING_ERROR
			},
			{
				key: "duplicate",
				label: s$5("feedback.button-text.duplicate"),
				value: E$1.USER_EVALUATE_DUPLICATE_ERROR
			}
		], m = function(n) {
			f.includes(n) ? u((function(e) {
				return e.filter((function(e) {
					return e !== n;
				}));
			})) : u((function(t) {
				return [].concat(n$7(t), [n]);
			}));
		}, k = function(e) {
			return f.includes(e);
		};
		return (0, import_react$3.useEffect)((function() {
			var e;
			if (!ua.isPC) {
				var n = (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.height) || window.innerHeight, t = null, a = function() {
					t && clearTimeout(t), t = window.setTimeout((function() {
						var e;
						window.innerHeight < .7 * n && (null === (e = document.querySelector(".feedback-form")) || void 0 === e || null === (e = e.parentElement) || void 0 === e || e.scrollTo({
							top: 500,
							behavior: "smooth"
						}));
					}), 100);
				};
				return window.addEventListener("resize", a), function() {
					return window.removeEventListener("resize", a);
				};
			}
		}), []), import_react$3.createElement("div", { className: "feedback-form" }, import_react$3.createElement("section", null, import_react$3.createElement("h3", null, s$5("feedback.group-title.question")), import_react$3.createElement("div", { className: "options-group" }, b.map((function(e) {
			return import_react$3.createElement("button", {
				key: e.key,
				className: k(e.value) ? "active" : "",
				onClick: function() {
					return m(e.value);
				}
			}, e.label);
		})))), import_react$3.createElement("section", null, import_react$3.createElement("h3", null, s$5("feedback.group-title.answer")), import_react$3.createElement("div", { className: "options-group" }, s.map((function(e) {
			return import_react$3.createElement("button", {
				key: e.key,
				className: k(e.value) ? "active" : "",
				onClick: function() {
					return m(e.value);
				}
			}, e.label);
		})))), import_react$3.createElement("section", null, import_react$3.createElement("h3", null, s$5("feedback.group-title.format")), import_react$3.createElement("div", { className: "options-group" }, p.map((function(e) {
			return import_react$3.createElement("button", {
				key: e.key,
				className: k(e.value) ? "active" : "",
				onClick: function() {
					return m(e.value);
				}
			}, e.label);
		})))), import_react$3.createElement("section", null, import_react$3.createElement("h3", null, s$5("feedback.group-title.content")), import_react$3.createElement("textarea", {
			className: "feedback-textarea",
			placeholder: s$5("feedback.tips.more-content"),
			value: d,
			onChange: function(e) {
				return c(e.target.value);
			}
		})), l);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_097125393871fc341f551c07451ece46/node_modules/@tencent/docs-design-resources/image/mobile/gif/qq_ai_logo.png
var qq_ai_logo_default;
var init_qq_ai_logo = __esmMin((() => {
	qq_ai_logo_default = "" + new URL("qq_ai_logo-BIA6ziab.png", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/dynamic-tips-loading/index.js
var import_react$2, d, m;
var init_dynamic_tips_loading = __esmMin((() => {
	init_slicedToArray_fb5b6502();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_index_07e2ccf4();
	init_index_9dc8fb5d();
	init_qq_ai_logo();
	init_lodash();
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-common-dynamic-tips-loading {\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: left;\n  font-size: 14px;\n  line-height: 24px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.88));\n}\n");
	d = [
		s$5("dynamic-tips-loading.loading"),
		s$5("dynamic-tips-loading.loading-1"),
		s$5("dynamic-tips-loading.loading-2"),
		s$5("dynamic-tips-loading.loading-3"),
		s$5("dynamic-tips-loading.loading-4"),
		s$5("dynamic-tips-loading.loading-5"),
		s$5("dynamic-tips-loading.loading-6"),
		s$5("dynamic-tips-loading.loading-7"),
		s$5("dynamic-tips-loading.loading-8"),
		s$5("dynamic-tips-loading.loading-9")
	];
	m = function(a) {
		var c = a.message, m = a.visible, g = a.tips, p = (0, import_react$2.useRef)(null), f = a$12((0, import_react$2.useState)(0), 2), y = f[0], h = f[1];
		return (0, import_react$2.useEffect)((function() {
			isNil(m) && ((null == c ? void 0 : c.messageStatus) !== M.START && p.current && (window.clearInterval(p.current), p.current = null), (null == c ? void 0 : c.messageStatus) === M.START && null === p.current && (p.current = window.setInterval((function() {
				h((function(n) {
					return (n + 1) % d.length;
				}));
			}), 3e3)));
		}), [null == c ? void 0 : c.messageStatus, m]), isNil(m) ? (null == c ? void 0 : c.messageStatus) === M.START && isNil(m) ? import_react$2.createElement("div", { className: "ai-component-common-dynamic-tips-loading" }, import_react$2.createElement("img", {
			width: 20,
			height: 20,
			src: qq_ai_logo_default,
			style: { marginRight: 6 }
		}), d[y]) : null : m ? import_react$2.createElement("div", { className: "ai-component-common-dynamic-tips-loading" }, import_react$2.createElement("img", {
			width: 20,
			height: 20,
			src: qq_ai_logo_default,
			style: { marginRight: 6 }
		}), g) : null;
	};
}));
var init_collapse_card = __esmMin((() => {
	require_react();
}));
var init_category_slide = __esmMin((() => {
	require_react();
	require_classnames();
	[
		{
			id: "dbnf73qrcf8pfqhoat8t77m9zh",
			authorId: "10004",
			name: "红黄低多边形商务汇报",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://docimg4.docs.qq.com/image/1BOaArYrSHdNejzAP-47RQ.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://docimg4.docs.qq.com/image/1BOaArYrSHdNejzAP-47RQ.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_preview\":{\"url\":\"https://docimg10.docs.qq.com/image/onQU3MSTaAyadqUsVCsV_Q.png?w=1125&h=9000\",\"height\":9000,\"width\":1125}},\"versions\":[2]}\n",
			opRecord: {
				createTime: "1655452264",
				modifyTime: "1711544818",
				creatorName: "包图网",
				lastOperatorName: "upgrade",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		},
		{
			id: "32025",
			authorId: "10010",
			name: "企业文化培训PPT（绿色渐变）",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://pub.idqqimg.com/pc/misc/files/20210408/aa1687d607e5ec0cb3a5c9bbd0032a8f.png\",\"height\":234,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://pub.idqqimg.com/pc/misc/files/20210408/146ab8c37ed52d261cfa2b69dff94a28.png\",\"height\":234,\"width\":416},\"pc_preview\":{\"url\":\"https://pub.idqqimg.com/pc/misc/files/20210408/1c7a8423b96b0e41e2832ce6ea6fdb9c.png\",\"height\":9000,\"width\":1125}},\"versions\":[2]}\n",
			opRecord: {
				createTime: "1617196925",
				modifyTime: "1711544844",
				creatorName: "xinyuhuang",
				lastOperatorName: "upgrade",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		},
		{
			id: "60086",
			authorId: "10015",
			name: "红色简约论文开题报告",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://docimg5.docs.qq.com/image/xg_CFZMNzfDd3SUe4aqsXw?w=416&h=234\",\"height\":234,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://docimg5.docs.qq.com/image/xg_CFZMNzfDd3SUe4aqsXw?w=416&h=234\",\"height\":234,\"width\":416},\"pc_preview\":{\"url\":\"https://docimg3.docs.qq.com/image/RXrWnkNjyby8k8h3qjqOAA?w=1125&h=9000\",\"height\":9000,\"width\":1125}},\"versions\":[2]}\n",
			opRecord: {
				createTime: "1621053006",
				modifyTime: "1711544847",
				creatorName: "xinyuhuang",
				lastOperatorName: "upgrade",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		},
		{
			id: "px8c75ahfjdxtgr9beq6p8941o",
			authorId: "10004",
			name: "蓝色商务风年终述职报告PPT模板",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://docimg3.docs.qq.com/image/AgAACss6WGfcKL8-sxRP4ZJfiHrnfLBA.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://docimg3.docs.qq.com/image/AgAACss6WGfcKL8-sxRP4ZJfiHrnfLBA.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_preview\":{\"url\":\"https://docimg7.docs.qq.com/image/AgAACss6WGcn22aGLe9NNJNdIEn3Heq9.png?w=1125&h=9000\",\"height\":9000,\"width\":1125}}}\n",
			opRecord: {
				createTime: "1733218283",
				modifyTime: "1733281825",
				creatorName: "包图网",
				lastOperatorName: "v_syuliu",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		},
		{
			id: "empozzjncfffups8kdxyn5g5we",
			authorId: "10004",
			name: "黄蓝商务风项目管理培训汇报PPT",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://docimg3.docs.qq.com/image/Wjcjf-TrhoSnQhQpHJx-wA.png?w=416&h=234\",\"height\":234,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://docimg3.docs.qq.com/image/Wjcjf-TrhoSnQhQpHJx-wA.png?w=416&h=234\",\"height\":234,\"width\":416},\"pc_preview\":{\"url\":\"https://docimg4.docs.qq.com/image/wfkUsnAZCnw3HXKdcUyFaQ.png?w=1125&h=9000\",\"height\":9000,\"width\":1125}},\"versions\":[2]}\n",
			opRecord: {
				createTime: "1632368782",
				modifyTime: "1711544695",
				creatorName: "safayaxiao",
				lastOperatorName: "upgrade",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		},
		{
			id: "9sczzh6pbfyszdywnmcuo91oie",
			authorId: "10004",
			name: "蓝色低多边形商务汇报",
			desc: "",
			content: null,
			source: 1,
			language: "zh-CN",
			needShield: !1,
			images: null,
			subType: "",
			type: 1,
			metaOfEachType: "{\"type\":3,\"images\":{\"mobile_thumb_2x\":{\"url\":\"https://docimg2.docs.qq.com/image/ukj4q5Nxsm1EcBqhY18tRw.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_thumb_2x\":{\"url\":\"https://docimg2.docs.qq.com/image/ukj4q5Nxsm1EcBqhY18tRw.png?w=416&h=233\",\"height\":233,\"width\":416},\"pc_preview\":{\"url\":\"https://docimg1.docs.qq.com/image/kphqb2hx3wcMJnUiNs7xzg.png?w=1125&h=9000\",\"height\":9000,\"width\":1125}},\"versions\":[2]}\n",
			opRecord: {
				createTime: "1655452266",
				modifyTime: "1711544811",
				creatorName: "包图网",
				lastOperatorName: "upgrade",
				notes: "",
				status: 0,
				isDeleted: !1
			},
			linkHash: "",
			TenantId: "",
			descUrl: "",
			desctext: "",
			seealso: "",
			fromSharing: !1
		}
	].map((function(e) {
		var t, n, o = JSON.parse(e.metaOfEachType);
		return {
			id: e.id,
			name: e.name,
			isCustom: !1,
			images: {
				cover: null !== (t = null == o ? void 0 : o.images.pc_thumb_2x.url) && void 0 !== t ? t : null == o ? void 0 : o.images.mobile_thumb_2x.url,
				preview: null !== (n = null == o ? void 0 : o.images.pc_preview.url) && void 0 !== n ? n : null == o ? void 0 : o.images.pc_thumb_2x.url
			},
			requirements: 4,
			tags: []
		};
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-commo_cf1522440e65776d9b894778086f0a73/node_modules/@tencent/ai-component-common/dist/esm/index.js
var init_esm = __esmMin((() => {
	init_with_thinking_factory();
	init_with_outside_click();
	init_with_outline_factory();
	init_with_markdown_factory();
	init_with_ai_context_provider();
	init_with_ai_auth_modal();
	init_ux_atom();
	init_utils();
	init_switch_case();
	init_slide_outline();
	init_mind_flowchart_viewer();
	init_locales();
	init_legacy_button();
	init_horizontal_arrow_scroller();
	init_feedback();
	init_dynamic_tips_loading();
	init_collapse_card_v2();
	init_collapse_card();
	init_category_slide();
}));
//#endregion
export { q$1 as A, init_with_markdown_factory as C, m$2 as D, init_index_a8948600 as E, init_collapse_card_v2 as F, m$5 as I, init_with_outside_click as M, init_with_thinking_factory as N, Pn as O, m$3 as P, De as S, init_legacy_button as T, init_utils as _, init_feedback as a, init_with_ai_auth_modal as b, init_horizontal_arrow_scroller as c, init_switch_case as d, l$1 as f, W as g, T$1 as h, d$1 as i, a$9 as j, init_index_be14aca1 as k, T as l, G as m, init_dynamic_tips_loading as n, u as o, n$2 as p, m as r, a$2 as s, init_esm as t, init_mind_flowchart_viewer as u, init_list_24_link_blue as v, a$5 as w, x$1 as x, list_24_link_blue_default as y };
