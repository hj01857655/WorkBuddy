import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { act as init_esm$1, dlt as init_defineProperty, oct as ua, ult as _defineProperty, wlt as require_dayjs_min } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Cv as init_purify_es, Ev as require_react, F_ as chunk, Jh as init_lodash, Kh as require_react_dom, Qg as isEmpty, __ as escape, ng as uniqBy, qh as require_classnames, wv as purify } from "./lib-chat-ui-D8Ji0f8n.js";
import { A as q$4, D as m$6, I as m$7, O as Pn$1, P as m$5, S as De$1, f as l$8, g as W$4, h as T$3, i as d$4, j as a$12, l as T$4, m as G$4, o as u$7, p as n$14, r as m$8, t as init_esm$2, w as a$11, x as x$3 } from "./esm-Dg9mI5QO.js";
import { BC as p$5, CC as A$4, IS as E$7, Iw as o$11, Jw as translate, Kw as init_esm$3, LS as O$3, OS as ae$1, Qx as init_esm$4, RC as P$5, RS as _$7, SC as s$9, VC as u$8, Yw as initI18n, bC as _$5, dw as openUrl, eC as v$4, fC as l$9, iC as C$3, lw as init_esm$5, nS as r$14, oC as E$6, tw as v$5, uS as _$6, vC as E$5, ww as S$4, yS as O$4 } from "./smartsheet-context-BgZsCXEw.js";
import { M as init_esm$7, P as useWindowSize, S as u$9, V as e$15, W as p$6, a as C$4, d as o$12, i as init_esm$6, m as s$10, n as getAidForReport, p as l$10, t as init_esm$8, w as Me$1 } from "./esm-DUoYP7ti.js";
import { C as Loading_default, D as Button_default, T as Modal_default, _ as ActionSheet_default, a as motion, d as PullPanel_default, h as Checkbox_default, l as Tooltip_default, n as AnimatePresence, o as init_esm$9, p as Snackbar_default, s as BottomModal_default, t as init_es, x as Input_default, y as Divider_default } from "./es-DbQPCzY-.js";
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/defineProperty-28d1b327.js
function t$12(r) {
	return t$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, t$12(r);
}
function r$13(r) {
	var e = function(r, e) {
		if ("object" != t$12(r) || !r) return r;
		var o = r[Symbol.toPrimitive];
		if (void 0 !== o) {
			var n = o.call(r, e || "default");
			if ("object" != t$12(n)) return n;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === e ? String : Number)(r);
	}(r, "string");
	return "symbol" == t$12(e) ? e : e + "";
}
function e$14(t, e, o) {
	return (e = r$13(e)) in t ? Object.defineProperty(t, e, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = o, t;
}
var init_defineProperty_28d1b327 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-54f3d2bb.js
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
var e$13, _$4, t$11, S$3, n$13, T$2, A$3, R$3, D$3, r$12, C$2, a$10, I$5, O$2, N$3, o$10, i$11, M$2, c$5, P$4, L$4, d$3, u$6, l$7, s$8, U$3, m$4, F$4, f$6, H$3, p$4, W$3, B$4, g$3, k$1, h$5, G$3, K$2, b$6, y$1, w$4, V$2, Y$1, v$3, x$2, X$2, j$3, Q$2, q$3, Z$3, J$2, z$3, $$2, EE;
var init_index_54f3d2bb = __esmMin((() => {
	init_defineProperty();
	(function(E) {
		E.SHEET_AI_DATA_QA = "sheet_ai_data_qa", E.SHEET_AI_GENERATE_CHART = "sheet_ai_generate_chart", E.SLIDE_AI_GENERATE_NOTES = "slide_ai_generate_notes";
	})(_$4 || (_$4 = {})), function(E) {
		E.COURSE_SCHEDULE = "CourseSchedule", E.SCORE = "Score", E.NAMELIST = "NameList";
	}(t$11 || (t$11 = {})), function(E) {
		E.TENCENT_DOCS = "tencentdocs", E.TENCENT_QQ = "tencentqq", E.TENCENT_WENKU = "tencentwenku", E.TENCENT_SPACE = "tencentspace", E.TENCENT_QQ_MINI = "tencentqqmini";
	}(S$3 || (S$3 = {})), function(E) {
		E[E.CHAT_BUBBLE = 1] = "CHAT_BUBBLE", E[E.CHAT_INPUT = 2] = "CHAT_INPUT";
	}(n$13 || (n$13 = {})), function(E) {
		E[E.SEND = 1] = "SEND", E[E.PASTE = 2] = "PASTE", E[E.FILE = 3] = "FILE", E[E.GET_RECOMMEND_COMMAND = 4] = "GET_RECOMMEND_COMMAND";
	}(T$2 || (T$2 = {})), function(E) {
		E[E.NORMAL = 0] = "NORMAL", E[E.INSERT_BELOW = 1] = "INSERT_BELOW", E[E.REPLACE_SELECTION = 2] = "REPLACE_SELECTION";
	}(A$3 || (A$3 = {})), function(E) {
		E[E.SOURCE_UNSPECIFIED = 0] = "SOURCE_UNSPECIFIED", E[E.SOURCE_SMARTCANVAS = 1] = "SOURCE_SMARTCANVAS", E[E.SOURCE_DOC = 2] = "SOURCE_DOC", E[E.SOURCE_SHEET = 3] = "SOURCE_SHEET", E[E.SOURCE_SLIDE = 4] = "SOURCE_SLIDE", E[E.SOURCE_PDF = 5] = "SOURCE_PDF", E[E.SOURCE_RESUME = 6] = "SOURCE_RESUME", E[E.SOURCE_MIND = 7] = "SOURCE_MIND", E[E.SOURCE_DESKTOP = 8] = "SOURCE_DESKTOP", E[E.SOURCE_FORM = 9] = "SOURCE_FORM", E[E.SOURCE_FLOWCHART = 10] = "SOURCE_FLOWCHART", E[E.SOURCE_SMARTSHEET = 11] = "SOURCE_SMARTSHEET", E[E.SOURCE_BOARD = 12] = "SOURCE_BOARD", E[E.SOURCE_MARKDOWN = 13] = "SOURCE_MARKDOWN", E[E.SOURCE_IMAGE = 14] = "SOURCE_IMAGE", E[E.SOURCE_SPACE = 99] = "SOURCE_SPACE", E[E.SOURCE_SPACE_FOLDER = 100] = "SOURCE_SPACE_FOLDER";
	}(R$3 || (R$3 = {})), function(E) {
		E.FORM = "form", E.DOC = "doc", E.SHEET = "sheet", E.SLIDE = "slide", E.PDF = "pdf", E.MIND = "mind", E.FLOWCHART = "flowchart", E.SMARTCANVAS = "smartcanvas", E.SMARTSHEET = "smartsheet", E.MARKDOWN = "markdown";
	}(D$3 || (D$3 = {})), function(E) {
		E[E.FULLSCREEN = 0] = "FULLSCREEN", E[E.NON_FULLSCREEN = 1] = "NON_FULLSCREEN";
	}(r$12 || (r$12 = {})), function(E) {
		E.DESKTOP = "desktop", E.DOC = "doc", E.SMARTCANVAS = "smartcanvas", E.SHEET = "sheet", E.SMARTSHEET = "smartsheet", E.SLIDE = "slide", E.PDF = "pdf", E.FORM = "form", E.MIND = "mind", E.FLOWCHART = "flowchart", E.RESUME = "resume", E.MARKDOWN = "markdown", E.IMAGE = "image", E.SPACE = "space", E.BOARD = "board";
	}(C$2 || (C$2 = {})), function(E) {
		E[E.INSERT = 0] = "INSERT", E[E.REPLACE = 1] = "REPLACE", E[E.INSERT_BELOW = 2] = "INSERT_BELOW";
	}(a$10 || (a$10 = {})), function(E) {
		E.pageNum = "pageNum", E.templateStyle = "templateStyle", E.templateColor = "templateColor", E.writingStyle = "writingStyle", E.imageGeneration = "imageGeneration", E.generationMode = "genMode";
	}(I$5 || (I$5 = {})), function(E) {
		E.SYSTEM = "system", E.BOT = "assistant", E.USER = "user";
	}(O$2 || (O$2 = {})), function(E) {
		E[E.CREATE_FROM_MATERIALS = 0] = "CREATE_FROM_MATERIALS", E[E.VIEW_RESULTS = 1] = "VIEW_RESULTS", E[E.REGENERATE = 2] = "REGENERATE";
	}(N$3 || (N$3 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.CREATE_SLIDE = 1] = "CREATE_SLIDE", E[E.CREATE_DOC = 2] = "CREATE_DOC", E[E.CREATE_SHEET = 3] = "CREATE_SHEET", E[E.CREATE_FORM = 4] = "CREATE_FORM", E[E.CREATE_MINDMAP = 5] = "CREATE_MINDMAP", E[E.CREATE_SMART_CANVAS = 6] = "CREATE_SMART_CANVAS", E[E.CREATE_SMART_SHEET = 7] = "CREATE_SMART_SHEET", E[E.CREATE_RESUME = 8] = "CREATE_RESUME", E[E.CREATE_FLOW_CHART = 9] = "CREATE_FLOW_CHART", E[E.CREATE_PDF = 10] = "CREATE_PDF", E[E.SHEET_ROLLBACK = 11] = "SHEET_ROLLBACK", E[E.SHEET_CONFIRM = 12] = "SHEET_CONFIRM", E[E.SHEET_INSERT_FORMULA = 13] = "SHEET_INSERT_FORMULA", E[E.INSERT_CHART = 14] = "INSERT_CHART", E[E.INSERT_CONTENT = 16] = "INSERT_CONTENT", E[E.APPEND_NEW_CONTENT = 17] = "APPEND_NEW_CONTENT", E[E.MIND_ADD_CHILD_NODE = 18] = "MIND_ADD_CHILD_NODE", E[E.MIND_UPDATE_TITLE = 19] = "MIND_UPDATE_TITLE", E[E.MIND_INSERT_AS_DETACHED = 20] = "MIND_INSERT_AS_DETACHED", E[E.MIND_INSERT_TO_FILE = 21] = "MIND_INSERT_TO_FILE", E[E.GENERATE_SLIDE = 22] = "GENERATE_SLIDE", E[E.APPEND_REMARK = 23] = "APPEND_REMARK", E[E.INSERT_SHEET = 24] = "INSERT_SHEET", E[E.READ_IN_DEPTH = 25] = "READ_IN_DEPTH", E[E.PREVIEW = 26] = "PREVIEW", E[E.CREATE_MARKDOWN = 27] = "CREATE_MARKDOWN";
	}(o$10 || (o$10 = {})), function(E) {
		E.LOADING = "loading", E.SUCCESS = "success", E.NOMORE = "nomore", E.ERROR = "error";
	}(i$11 || (i$11 = {})), function(E) {
		E[E.START = -1] = "START", E[E.IN_PROGRESS = 0] = "IN_PROGRESS", E[E.FINISH = 1] = "FINISH", E[E.ERROR = 2] = "ERROR", E[E.STOP = 3] = "STOP", E[E.IN_THINKING = 4] = "IN_THINKING";
	}(M$2 || (M$2 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.TEXT_MARKDOWN = 1] = "TEXT_MARKDOWN", E[E.DOCUMENT = 2] = "DOCUMENT", E[E.TASK_CARD = 4] = "TASK_CARD", E[E.SLIDE_TEMPLATES = 5] = "SLIDE_TEMPLATES", E[E.RECOMMENDED_QUESTION = 6] = "RECOMMENDED_QUESTION", E[E.RECOMMENDED_COMMAND = 7] = "RECOMMENDED_COMMAND", E[E.RECOMMENDED_SUMARRY = 8] = "RECOMMENDED_SUMARRY", E[E.AUTH_TIP = 9] = "AUTH_TIP", E[E.MINIPROGRAM_IMPORT_DOC = 10] = "MINIPROGRAM_IMPORT_DOC", E[E.TEXT_SELECTION = 11] = "TEXT_SELECTION", E[E.RESUME_WELCOME = 12] = "RESUME_WELCOME";
	}(c$5 || (c$5 = {})), function(E) {
		E[E.HISTORY_MESSAGE = 0] = "HISTORY_MESSAGE", E[E.COMMERCIALIZE_NOTIFICATION = 1] = "COMMERCIALIZE_NOTIFICATION";
	}(P$4 || (P$4 = {})), function(E) {
		E[E.LINK = -1] = "LINK", E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.DOC = 1] = "DOC", E[E.SHEET = 2] = "SHEET", E[E.SLIDE = 3] = "SLIDE", E[E.FORM = 4] = "FORM", E[E.MINDMAP = 5] = "MINDMAP", E[E.SMART_CANVAS = 6] = "SMART_CANVAS", E[E.SMART_SHEET = 7] = "SMART_SHEET", E[E.RESUME = 8] = "RESUME", E[E.FLOW_CHART = 9] = "FLOW_CHART", E[E.PDF = 10] = "PDF", E[E.IMAGE = 11] = "IMAGE", E[E.FOLDER = 12] = "FOLDER", E[E.MARKDOWN = 13] = "MARKDOWN", E[E.WIKI = 20] = "WIKI";
	}(L$4 || (L$4 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.LIKE = 1] = "LIKE", E[E.DISLIKE = 2] = "DISLIKE";
	}(d$3 || (d$3 = {})), function(E) {
		E.PLAN = "plan", E.RECALL = "recall", E.CITING = "citing";
	}(u$6 || (u$6 = {})), function(E) {
		E.WECHAT = "wechat", E.DOCS = "docs", E.WENKU = "wenku", E.LINK = "link";
	}(l$7 || (l$7 = {})), function(E) {
		E.messageStatus = "messageStatus", E.renderId = "renderId", E.customDescription = "customDescription";
	}(s$8 || (s$8 = {})), function(E) {
		E[E.READ_IN_DEPTH_MODE_NORMAL = 0] = "READ_IN_DEPTH_MODE_NORMAL", E[E.READ_IN_DEPTH_MODE_PAPER = 1] = "READ_IN_DEPTH_MODE_PAPER", E[E.READ_IN_DEPTH_MODE_RESEARCH = 2] = "READ_IN_DEPTH_MODE_RESEARCH", E[E.READ_IN_DEPTH_MODE_FINANCIAL_REPORT = 3] = "READ_IN_DEPTH_MODE_FINANCIAL_REPORT", E[E.READ_IN_DEPTH_MODE_BOOK = 4] = "READ_IN_DEPTH_MODE_BOOK", E[E.READ_IN_DEPTH_MODE_POLICY = 5] = "READ_IN_DEPTH_MODE_POLICY", E[E.READ_IN_DEPTH_MODE_MIND = 6] = "READ_IN_DEPTH_MODE_MIND", E[E.READ_IN_DEPTH_MODE_SUMMARY = 7] = "READ_IN_DEPTH_MODE_SUMMARY", E[E.READ_IN_DEPTH = 8] = "READ_IN_DEPTH";
	}(U$3 || (U$3 = {})), function(E) {
		E.UPLOADING = "uploading", E.UPLOAD_SUCCESS = "upload_success", E.UPLOAD_FAILED = "upload_failed";
	}(m$4 || (m$4 = {})), function(E) {
		E.PREPARE = "prepare", E.EMBEDDING = "embedding", E.EMBEDDING_SUCCESS = "embedding_success", E.EMBEDDING_FAILED = "embedding_failed";
	}(F$4 || (F$4 = {})), function(E) {
		E.UPLOAD = "Upload", E.IMPORT = "Import";
	}(f$6 || (f$6 = {})), F$4.PREPARE, F$4.EMBEDDING, m$4.UPLOADING, F$4.EMBEDDING_SUCCESS, m$4.UPLOAD_SUCCESS, F$4.EMBEDDING_FAILED, m$4.UPLOAD_FAILED, F$4.EMBEDDING_SUCCESS, m$4.UPLOAD_SUCCESS, F$4.EMBEDDING_FAILED, m$4.UPLOAD_FAILED, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$13 = {}, L$4.DOC, "文档"), L$4.SHEET, "表格"), L$4.SLIDE, "幻灯片"), L$4.FORM, "收集表"), L$4.MINDMAP, "思维导图"), L$4.SMART_CANVAS, "智能文档"), L$4.SMART_SHEET, "智能表格"), L$4.RESUME, "简历"), L$4.FLOW_CHART, "流程图"), L$4.PDF, "PDF"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$13, L$4.IMAGE, "图片"), L$4.FOLDER, "文件夹"), L$4.LINK, "链接"), L$4.MARKDOWN, "Markdown"), L$4.WIKI, "空间"), function(E) {
		E.SLEEP = "sleep", E.STAND_BY = "standBy", E.WRITING = "writing", E.INPUT_COMPLETE = "inputComplete", E.EDIT_COMPLETE = "editComplete";
	}(H$3 || (H$3 = {})), function(E) {
		E.IDLE = "idle", E.WRITING = "writing", E.RE_WRITING = "reWriting", E.CONTINUE_WRITING = "continueWriting", E.STOPPED = "stopped";
	}(p$4 || (p$4 = {})), function(E) {
		E.IN_CONTEXT = "inContext", E.ON_BOARD = "onBoard";
	}(W$3 || (W$3 = {})), function(E) {
		E[E.TBD = -1] = "TBD", E[E.LIKE = 0] = "LIKE", E[E.UNLIKE = 1] = "UNLIKE";
	}(B$4 || (B$4 = {})), function(E) {
		E.WRITE = "write", E.WRITE_FROM_EMPTY = "writeFromEmpty", E.SELECTION = "selection", E.COMPLETED = "completed";
	}(g$3 || (g$3 = {})), function(E) {
		E.TO_SLEEP = "toSleep", E.TO_STAND_BY = "toStandBy", E.TO_WRITING = "toWriting", E.TO_EDIT_COMPLETE = "toEditComplete", E.TO_INPUT_COMPLETE = "toInputComplete", E.BACK_TO_STAND_BY = "backToStandBy", E.AI_BE_WAKE = "aiBeWake";
	}(k$1 || (k$1 = {})), (h$5 || (h$5 = {})).POLISHING = "polishing", (G$3 || (G$3 = {})).AIModalWrite = "AIModalWrite", function(E) {
		E.SNAPSHOT_EXTRACT_TEXT = "snapshot_extract_text", E.WORDS_EXPLAIN = "words_explain", E.WORDS_TRANSLATE = "words_translate";
	}(K$2 || (K$2 = {})), function(E) {
		E.CREATE_SLIDE = "createSlide", E.DEFAULT = "default";
	}(b$6 || (b$6 = {})), function(E) {
		E[E.PaymentByPrice = 0] = "PaymentByPrice", E[E.LimitedFree = 1] = "LimitedFree", E[E.FreeForVIP = 2] = "FreeForVIP", E[E.NeedVIPAndPay = 3] = "NeedVIPAndPay", E[E.Free = 4] = "Free", E[E.FreeForSuperVIP = 5] = "FreeForSuperVIP", E[E.ChargedByUsage = 6] = "ChargedByUsage", E[E.InAppPurchased = 7] = "InAppPurchased", E[E.NoRequirementType = 10] = "NoRequirementType";
	}(y$1 || (y$1 = {})), function(E) {
		E.TEXT_INPUT = "text", E.OPTION_INPUT = "option", E.TEXT_LABEL = "label", E.TEXT_INPUT_VALUE = "text-input-value";
	}(w$4 || (w$4 = {})), function(E) {
		E.SUMMARY = "summary", E.DEEPREAD = "deepread", E.MINDMAP = "mindMap", E.FILEQA = "fileQa", E.CHAT = "chat", E.BEAUTIFY = "beautify";
	}(V$2 || (V$2 = {})), function(E) {
		E[E.SidebarRead = 1] = "SidebarRead", E[E.AIWriting = 2] = "AIWriting", E[E.GeneratePPT = 3] = "GeneratePPT", E[E.GenerateMindMap = 4] = "GenerateMindMap", E[E.GeneratePageModal = 5] = "GeneratePageModal", E[E.SidebarNote = 6] = "SidebarNote", E[E.Rating = 7] = "Rating", E[E.FullReview = 8] = "FullReview", E[E.ChangeFont = 9] = "ChangeFont", E[E.ChangeThemeColor = 10] = "ChangeThemeColor", E[E.ChangeTemplate = 11] = "ChangeTemplate", E[E.DataQA = 12] = "DataQA", E[E.GenerateChart = 13] = "GenerateChart", E[E.Beautify = 14] = "Beautify";
	}(Y$1 || (Y$1 = {})), function(E) {
		E.MARKDOWN_SEARCH_REF = "tdocs-ai-search-ref", E.MARKDOWN_SEARCH_REF_TEXT = "tdocs-ai-search-ref-text", E.MARKDOWN_SEARCH_REF_CITATIOIN = "tdocs-ai-search-ref-citation";
	}(v$3 || (v$3 = {})), function(E) {
		E.MARKDOWN_LINK_CARD = "tdocs-link-card", E.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER = "tdocs-excel-chart-image-exchanger";
	}(x$2 || (x$2 = {})), (X$2 || (X$2 = {})).MARKDOWN_TABLE_PREVIEW = "tdocs-table-preview", function(E) {
		E[E.PBDEFAULT = 0] = "PBDEFAULT", E[E.Area = 1] = "Area", E[E.Area3D = 2] = "Area3D", E[E.Line = 3] = "Line", E[E.Line3D = 4] = "Line3D", E[E.HighLowCloseStock = 5] = "HighLowCloseStock", E[E.Radar = 6] = "Radar", E[E.Scatter = 7] = "Scatter", E[E.Pie = 8] = "Pie", E[E.Pie3D = 9] = "Pie3D", E[E.Doughnut = 10] = "Doughnut", E[E.ClusteredBar = 11] = "ClusteredBar", E[E.ClusteredBar3D = 12] = "ClusteredBar3D", E[E.ClusteredColumn = 13] = "ClusteredColumn", E[E.ClusteredColumn3D = 14] = "ClusteredColumn3D", E[E.PieOfPie = 15] = "PieOfPie", E[E.Surface = 16] = "Surface", E[E.Surface3D = 17] = "Surface3D", E[E.Bubble = 18] = "Bubble", E[E.CustomCombo = 19] = "CustomCombo", E[E.BoxWhisker = 20] = "BoxWhisker", E[E.Column3D = 21] = "Column3D", E[E.Funnel = 22] = "Funnel", E[E.ParetoLine = 23] = "ParetoLine", E[E.RegionMap = 24] = "RegionMap", E[E.Sunburst = 25] = "Sunburst", E[E.Treemap = 26] = "Treemap", E[E.Waterfall = 27] = "Waterfall", E[E.WordCloud = 28] = "WordCloud", E[E.StackedBar = 29] = "StackedBar", E[E.PercentStackedBar = 30] = "PercentStackedBar", E[E.StackedBar3D = 31] = "StackedBar3D", E[E.PercentStackedBar3D = 32] = "PercentStackedBar3D", E[E.StackedColumn = 33] = "StackedColumn", E[E.PercentStackedColumn = 34] = "PercentStackedColumn", E[E.StackedColumn3D = 35] = "StackedColumn3D", E[E.PercentStackedColumn3D = 36] = "PercentStackedColumn3D", E[E.StackedLine = 37] = "StackedLine", E[E.PercentStackedLine = 38] = "PercentStackedLine", E[E.MarkerLine = 39] = "MarkerLine", E[E.StackedMarkerLine = 40] = "StackedMarkerLine", E[E.PercentStackedMarkerLine = 41] = "PercentStackedMarkerLine", E[E.StackedArea = 42] = "StackedArea", E[E.PercentStackedArea = 43] = "PercentStackedArea", E[E.StackedArea3D = 44] = "StackedArea3D", E[E.PercentStackedArea3D = 45] = "PercentStackedArea3D", E[E.BarOfPie = 46] = "BarOfPie", E[E.Histogram = 47] = "Histogram", E[E.SmoothLineAndMarkerScatter = 48] = "SmoothLineAndMarkerScatter", E[E.SmoothLineScatter = 49] = "SmoothLineScatter", E[E.StraightLineAndMarkerScatter = 50] = "StraightLineAndMarkerScatter", E[E.StraightLineScatter = 51] = "StraightLineScatter", E[E.Bubble3D = 52] = "Bubble3D", E[E.OpenHighLowCloseStock = 53] = "OpenHighLowCloseStock", E[E.VolumeHighLowCloseStock = 54] = "VolumeHighLowCloseStock", E[E.VolumeOpenHighLowCloseStock = 55] = "VolumeOpenHighLowCloseStock", E[E.WireframeSurface = 56] = "WireframeSurface", E[E.WireframeSurface3D = 57] = "WireframeSurface3D", E[E.MarkerRadar = 58] = "MarkerRadar", E[E.FilledRadar = 59] = "FilledRadar", E[E.ClusteredColumnAndLineCombo = 60] = "ClusteredColumnAndLineCombo", E[E.ClusteredColumnAndLineOnSecondaryAxisCombo = 61] = "ClusteredColumnAndLineOnSecondaryAxisCombo", E[E.StackedAreaAndClusteredColumnCombo = 62] = "StackedAreaAndClusteredColumnCombo";
	}(j$3 || (j$3 = {})), function(E) {
		E.CONTROL = "control", E.THINKING = "thinking", E.CONTENT = "content", E.REFERENCES = "references", E.BUTTON = "button", E.SUGGESTION = "suggestion", E.FUNCTION_CALL = "functionCall", E.ERROR = "error", E.DONE = "done", E.STOP = "stop", E.DESCRIPTION = "description";
	}(Q$2 || (Q$2 = {})), function(E) {
		E[E.BASED_ON_UNSPECIFIED = 0] = "BASED_ON_UNSPECIFIED", E[E.BASED_ON_NETWORK = 1] = "BASED_ON_NETWORK", E[E.BASED_ON_TOPIC = 2] = "BASED_ON_TOPIC";
	}(q$3 || (q$3 = {})), function(E) {
		E[E.FULLSCREEN = 12] = "FULLSCREEN", E[E.SUMMARY = 13] = "SUMMARY", E[E.NEWSLIDE = 14] = "NEWSLIDE";
	}(Z$3 || (Z$3 = {})), function(E) {
		E[E.ITEM_TYPE_UNKNOW = 0] = "ITEM_TYPE_UNKNOW", E[E.ITEM_TYPE_CONV = 1] = "ITEM_TYPE_CONV", E[E.ITEM_TYPE_GROUP = 2] = "ITEM_TYPE_GROUP";
	}(J$2 || (J$2 = {})), function(E) {
		E.OPEN_AI_ASSISTANT = "openAiAssistant", E.CREATE_DOC_TYPE = "createDocType", E.SEND_COMMAND_ID = "sendCommandId", E.DEFAULT_AI_TAB = "defaultAITab", E.GENERATE_AI = "AIGenerate", E.DEEP_READ_TAB = "deepReadType", E.NO_PROMOTION = "no_promotion", E.EXPAND_TYPE = "expand_type", E.ACTIVEFEATURE = "activeFeature", E.FROM_PAGE = "from_page", E.AID_POSITION = "aid_position", E.SHOW_LAYOUT = "show_layout";
	}(z$3 || (z$3 = {})), ($$2 || ($$2 = {})).RESUME = "airesume", function(E) {
		E.ASSISTANT = "aicv_assistant", E.AI_WRITING = "aicv_aiwriting", E.AI_OTHER = "aicv_other";
	}(EE || (EE = {})), window.ai_version = _E(_E({}, window.ai_version || {}), {}, { interface: "1.164.0 - January 22, 2026 14:10:13" });
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/unsupportedIterableToArray-ebb39036.js
function r$11(r, t) {
	(null == t || t > r.length) && (t = r.length);
	for (var n = 0, e = Array(t); n < t; n++) e[n] = r[n];
	return e;
}
function t$10(t, n) {
	if (t) {
		if ("string" == typeof t) return r$11(t, n);
		var e = {}.toString.call(t).slice(8, -1);
		return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? r$11(t, n) : void 0;
	}
}
var init_unsupportedIterableToArray_ebb39036 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/slicedToArray-e715395f.js
function t$9(t, e) {
	return function(r) {
		if (Array.isArray(r)) return r;
	}(t) || function(r, t) {
		var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != e) {
			var n, o, a, l, u = [], i = !0, f = !1;
			try {
				if (a = (e = e.call(r)).next, 0 === t) {
					if (Object(e) !== e) return;
					i = !1;
				} else for (; !(i = (n = a.call(e)).done) && (u.push(n.value), u.length !== t); i = !0);
			} catch (r) {
				f = !0, o = r;
			} finally {
				try {
					if (!i && null != e.return && (l = e.return(), Object(l) !== l)) return;
				} finally {
					if (f) throw o;
				}
			}
			return u;
		}
	}(t, e) || t$10(t, e) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_slicedToArray_e715395f = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/locales/index.js
var t$8, n$12, a, o$9;
var init_locales = __esmMin((() => {
	init_defineProperty_28d1b327();
	t$8 = {
		document: { title: { "ai-search": "AI搜索" } },
		searchBox: {
			hunyuan: "混元",
			hunyuanTip: "适合大部分任务",
			deepSeek: "DeepSeek-V3.1",
			deepSeekTip: "多种场景回答更精炼",
			hunyuanT1: "混元（T1）",
			hunyuanT1Tip: "混元深度思考模式",
			deepSeekThinking: "DeepSeek-V3.1-Thinking",
			deepSeekThinkingTip: "更快深度思考推理",
			mydoc: "全部文档",
			partDocs: "指定范围",
			network: "全网资料",
			wiki: "指定空间",
			currentWiki: "当前空间",
			history: "AI 搜索历史",
			clearHistory: "清空记录",
			hideHistory: "隐藏",
			showMore: "显示更多",
			"placeholder-space": "根据你的空间、文档或全网资料，为你提供答案",
			placeholder: "根据你的文档或全网资料，为你提供答案",
			aiCreating: "AI创作中...",
			append: "继续提问...",
			"hold-to-speak": "按住 说话"
		},
		"base-on": "基于{{range}}",
		"switch-search-range": "切换搜索范围",
		share: {
			to: "分享到",
			wx: "微信",
			qq: "QQ",
			qqzone: "QQ空间",
			"wx-moments": "朋友圈",
			"wx-work": "企业微信",
			clipboard: "复制链接"
		},
		universalSearchActions: {
			feedback: {
				"unlike-toast": "感谢反馈!",
				"pull-panel-title": "反馈问题",
				submit: "提交"
			},
			share: "分享",
			"share-to": "分享到",
			createAsDocumentTitle: "用搜索结果创建文档",
			saveAsDocument: "保存为文档",
			doc: "在线文档",
			sheet: "在线表格",
			slide: "在线幻灯片",
			smartCanvas: "智能文档",
			mindMap: "思维导图"
		},
		reference: {
			"open-document": "打开文档",
			"open-link": "打开链接",
			"save-as-document": "保存为文档",
			"reference-count": "引用 {{count}} 篇资料作为参考",
			"reference-count-full": "共参考 {{count}} 篇参考资料",
			saveAsDoc: "保存为文档",
			saveToSpace: "添加至空间",
			"reference-title": "参考资料"
		},
		referenceSources: {
			link: "网页链接",
			wechat: "微信公众号",
			docs: "在线文档",
			wenku: "腾讯文库"
		},
		authCard: {
			title: "授权",
			"title-desc": "这么做可能会将你的敏感信息提供给此网站或应用，我们会采用严格措施确保其安全，不会用于模型训练。",
			"content-title": "授权AI文档助手使用你的腾讯文档权限",
			"content-title-desc": "你可以随时在隐私>AI文档助手开关查看或关闭访问权限",
			"list-item": {
				doc: "查看、编辑在线文档内容",
				sheet: "查看、编辑在线表格内容",
				slide: "查看、编辑在线幻灯片内容",
				smartCanvas: "查看、编辑智能文档内容",
				mindMap: "查看、编辑思维导图内容",
				pdf: "查看PDF内容",
				voiceNotes: "查看、编辑速记内容",
				form: "查看、编辑收集表内容",
				smartsheet: "查看、编辑智能表格内容"
			},
			"scope-desc": "请你知悉，启用该功能后，AI文档助手将检索你的文档（包括但不限于你创建、有编辑或查看权限），并依据你输入的指令生成特定内容，AI文档助手处理的文档中可能包含个人信息（含敏感个人信息）或其他数据，使用该功能意味着你理解并授权该数据处理行为。我们仅依据你的指示处理有关数据，请你注意不要侵犯他人的隐私与个人信息权益。若你希望AI文档助手对上述权限文档进行搜索并生成内容，你应保证你对其所包含的任何内容的任何形式使用均已取得所有必要的合法权利。",
			"agree-button": "同意授权",
			"agree-desc": "我已阅读并同意腾讯文档的",
			and: "和",
			serviceAgreement: "服务协议",
			privacyAgreement: "隐私政策"
		},
		"search-import-card": {
			"card-title": "初始化配置",
			"vip-importing-tips": "正在根据你的全部文档建立AI检索",
			"none-vip-importing-tips": "正在根据你的最近10篇文档建立AI检索",
			"analysis-tips": "AI助手正在解析文档...",
			"indexing-tips": "根据你的提问进行AI检索",
			"generate-tips": "生成AI搜索结果",
			"upgrade-vip-tips": "升级SVIP解锁AI搜索全部文档能力",
			"mini-card": {
				"init-tips": "初始化配置中...",
				"indexing-tips": "正在建立AI检索",
				collapse: "收起"
			}
		},
		message: {
			"recommend-questions-tips": "你可能想问：",
			"copy-success": "复制成功"
		},
		errorMessage: {
			commonError: "请求失败",
			searchNotFound: "在最近的10篇文档中,没有找到相关内容",
			searchNotFoundVip: "在文档中没有找到相关内容",
			searchNotFoundUniversalRecommend: "试试全网搜",
			searchNotFoundVipRecommend: "升级SVIP解锁AI搜索全部文档能力",
			sensitiveError: "亲爱的用户你好，让我们换个话题吧",
			"mike-unauthorized": "未授权麦克风",
			"mike-failed-to-get": "获取麦克风失败"
		},
		"message-buttons": {
			"create-slide": "生成PPT",
			"create-mindmap": "生成思维导图",
			"create-flow-chart": "生成流程图"
		},
		"files-message": { title: "已为你生成文档:" },
		"category-name": {
			mindMap: "思维导图",
			flowChart: "流程图"
		},
		toast: {
			"copy-success": "复制成功",
			"create-file-failed": "创建{{type}}失败，请尝试重新生成"
		},
		slide: { "template-modal": {
			title: "选择模板",
			"footer-btn-text": "继续生成"
		} },
		"function-call": {
			slide: { "not-support-case-of-slide": "请告诉我您的PPT主题是什么，明确主题后，我们再一起开始吧！" },
			mind: { "not-support-case-of-mind": "请告诉我您的思维导图主题是什么，明确主题后，我们再一起开始吧！" },
			flow: { "not-support-case-of-flow": "请告诉我您的流程图主题是什么，明确主题后，我们再一起开始吧！" },
			default: "请告诉我您的主题是什么，明确主题后，我们再一起开始吧！"
		},
		"ai-content-notice": "内容由AI生成，仅供参考",
		"ux-atom": {
			"uploader-box": {
				"online-tencent-docs": "腾讯文档",
				"local-file": "本地文件",
				link: "链接",
				"text-input": "输入文本",
				"beautify-ppt": "上传已有PPT",
				image: "图片",
				"online-tencent-docs-desc": "选择腾讯文档作为参考资料",
				"local-file-desc": "支持{{ format }}等格式",
				"link-desc": "上传网页链接作为参考材料",
				"text-input-desc": "复制长文内容，生成PPT",
				"beautify-ppt-desc": "上传PPT，自动美化排版样式",
				"beautify-ppt-tag": "智能美化",
				"image-desc": "支持图片格式",
				"beautify-ppt-error": "上传失败",
				"beautify-ppt-loading": "PPT上传中...",
				"text-input-placeholder": "在此输入或粘贴文本内容(提纲/文档/参考资料),支持最多50000的长文本内容",
				"text-input-max-count": "文本内容长度不能超过{{ count }}",
				"send-failed-due-to-attachment": "存在上传/解析失败文件，请检查后重试"
			},
			"uploader-selector": { "attachment-upload-tips": "上传材料" },
			"upload-size-imit": "已过滤超出{{size}}MB的文档",
			"add-link": {
				"tips-msg": "请输入正确的链接格式",
				placeholder: "粘贴或输入链接"
			},
			confirm: "确定",
			cancel: "取消"
		}
	};
	n$12 = {
		document: { title: { "ai-search": "AI搜索" } },
		searchBox: {
			hunyuan: "混元",
			hunyuanTip: "適合大部分任務",
			deepSeek: "DeepSeek-V3.1",
			deepSeekTip: "多種情境回應更精煉",
			deepSeekThinking: "DeepSeek-V3.1-Thinking",
			deepSeekThinkingTip: "更快速的深度思考與推理",
			mydoc: "我的文檔",
			partDocs: "指定範圍",
			network: "全網資料",
			wiki: "指定空間",
			currentWiki: "當前空間",
			history: "AI搜索歷史",
			clearHistory: "清空記錄",
			hideHistory: "隱藏",
			showMore: "顯示更多",
			"placeholder-space": "根據你的空間、文檔或全網資料，爲你提供答案",
			placeholder: "根據你的文檔或全網資料，爲你提供答案",
			aiCreating: "AI創作...",
			append: "繼續提問…",
			"hold-to-speak": "按住 說話"
		},
		"base-on": "基於{{range}}",
		"switch-search-range": "切換搜索範圍",
		share: {
			to: "分享到",
			wx: "微信",
			qq: "QQ",
			qqzone: "QQ空間",
			"wx-moments": "朋友圈",
			"wx-work": "企業微信",
			clipboard: "複製鏈接"
		},
		universalSearchActions: {
			feedback: {
				"unlike-toast": "感謝反饋!",
				"pull-panel-title": "反饋問題",
				submit: "提交"
			},
			share: "分享",
			"share-to": "分享到",
			createAsDocumentTitle: "用搜索結果創建文檔",
			saveAsDocument: "保存為文件",
			doc: "在線文檔",
			sheet: "在線表格",
			slide: "在線幻燈片",
			smartCanvas: "智能文檔",
			mindMap: "思維導圖"
		},
		reference: {
			"open-document": "打開文檔",
			"open-link": "打開連結",
			"save-as-document": "保存為文檔",
			"reference-count": "引用 {{count}} 篇資料作為參考",
			"reference-count-full": "共參考 {{count}} 篇參考資料",
			saveAsDoc: "保存為文檔",
			saveToSpace: "添加至空間",
			"reference-title": "參考資料"
		},
		referenceSources: {
			link: "網頁連結",
			wechat: "微信公眾號",
			docs: "線上文件",
			wenku: "騰訊文庫"
		},
		authCard: {
			title: "授權",
			"title-desc": "這麼做可能會將你的敏感信息提供給此網站或應用，我們會採用嚴格措施確保其安全，不會用於模型訓練。",
			"content-title": "授權AI文檔助手使用你的騰訊文檔權限",
			"content-title-desc": "你可以隨時在隱私>AI文檔助手開關查看或關閉訪問權限",
			"list-item": {
				doc: "查看、編輯在線文檔內容",
				sheet: "查看、編輯在線表格內容",
				slide: "查看、編輯在線幻燈片內容",
				smartCanvas: "查看、編輯智能文檔內容",
				mindMap: "查看、編輯思維導圖內容",
				pdf: "查看PDF內容",
				voiceNotes: "查看、編輯速記內容",
				form: "查看、編輯收集表內容",
				smartsheet: "查看、編輯智慧表格內容"
			},
			"scope-desc": "請你知悉，啓用該功能後，AI文檔助手將檢索你的文檔（包括但不限於你創建、有編輯或查看權限），並依據你輸入的指令生成特定內容，AI文檔助手處理的文檔中可能包含個人信息（含敏感個人信息）或其他數據，使用該功能意味着你理解並授權該數據處理行爲。我們僅依據你的指示處理有關數據，請你注意不要侵犯他人的隱私與個人信息權益。若你希望AI文檔助手對上述權限文檔進行搜索並生成內容，你應保證你對其所包含的任何內容的任何形式使用均已取得所有必要的合法權利。",
			"agree-button": "同意授權",
			"agree-desc": "我已閱讀並同意騰訊文檔的",
			serviceAgreement: "服務協議",
			and: "和",
			privacyAgreement: "隱私政策"
		},
		"search-import-card": {
			"card-title": "初始化配置",
			"vip-importing-tips": "正在根據你的全部文檔建立AI檢索",
			"none-vip-importing-tips": "正在根據你的最近10篇文檔建立AI檢索",
			"analysis-tips": "AI助手正在解析文檔...",
			"indexing-tips": "根據你的提問進行AI檢索",
			"generate-tips": "生成AI搜索結果",
			"upgrade-vip-tips": "升級SVIP解鎖AI搜索全部文檔能力",
			"mini-card": {
				"init-tips": "初始化配置中...",
				"indexing-tips": "正在建立AI檢索",
				collapse: "收起"
			}
		},
		message: {
			"recommend-questions-tips": "你可能想問：",
			"copy-success": "複製成功"
		},
		errorMessage: {
			commonError: "請求失敗",
			searchNotFound: "在最近的10篇文檔中,沒有找到相關內容",
			searchNotFoundVip: "在文檔中沒有找到相關內容",
			searchNotFoundUniversalRecommend: "試試全網搜",
			searchNotFoundVipRecommend: "升級SVIP解鎖AI搜索全部文檔能力",
			sensitiveError: "親愛的用戶你好，讓我們換個話題吧",
			"mike-unauthorized": "未授權麥克風",
			"mike-failed-to-get": "獲取麥克風失敗"
		},
		"message-buttons": {
			"create-slide": "生成PPT",
			"create-mindmap": "生成思维导图",
			"create-flow-chart": "生成流程圖"
		},
		"files-message": { title: "已為你生成文檔:" },
		"category-name": {
			mindMap: "思維導圖",
			flowChart: "流程圖"
		},
		toast: {
			"copy-success": "複製成功",
			"create-file-failed": "創建{{type}}失敗，請嘗試重新生成"
		},
		slide: { "template-modal": {
			title: "選擇模板",
			"footer-btn-text": "繼續生成"
		} },
		"function-call": {
			slide: { "not-support-case-of-slide": "請告訴我您的PPT主題是什麼，明確主題後，我們再一起開始吧！" },
			mind: { "not-support-case-of-mind": "請告訴我您的思維導圖主題是什麼，明確主題後，我們再一起開始吧！" },
			flow: { "not-support-case-of-flow": "請告訴我您的流程圖主題是什麼，明確主題後，我們再一起開始吧！" },
			default: "請告訴我您的主題是什麼，明確主題後，我們再一起開始吧！"
		},
		"ai-content-notice": "內容由AI生成，僅供參考",
		"ux-atom": {
			"uploader-box": {
				"online-tencent-docs": "騰訊文檔",
				"local-file": "本地文件",
				link: "鏈接",
				"text-input": "輸入文本",
				"beautify-ppt": "上傳已有PPT",
				image: "圖片",
				"online-tencent-docs-desc": "選擇騰訊文檔作為參考資料",
				"local-file-desc": "支持{{ format }}等格式",
				"link-desc": "上傳網頁鏈接作為參考材料",
				"text-input-desc": "複製長文內容，生成PPT",
				"beautify-ppt-desc": "上傳PPT，自動美化排版樣式",
				"beautify-ppt-tag": "智能美化",
				"image-desc": "支持圖片格式",
				"beautify-ppt-error": "上傳失敗",
				"beautify-ppt-loading": "PPT上傳中...",
				"text-input-placeholder": "在此輸入或粘貼文本內容(提綱/文檔/參考資料),支持最多50000的長文本內容",
				"text-input-max-count": "文本內容長度不能超過{{ count }}",
				"send-failed-due-to-attachment": "存在上傳/解析失敗文件，請檢查後重試"
			},
			"uploader-selector": { "attachment-upload-tips": "上傳材料" },
			"upload-size-imit": "已過濾超過{{size}}MB的文件",
			"add-link": {
				"tips-msg": "請輸入正確的連結格式",
				placeholder: "貼上或輸入連結"
			},
			confirm: "確定",
			cancel: "取消"
		}
	};
	a = "ai-component-mobile";
	o$9 = {
		"en-US": e$14({}, a, {
			document: { title: { "ai-search": "AI Search" } },
			searchBox: {
				hunyuan: "Hunyuan",
				hunyuanTip: "Suitable for most tasks",
				deepSeek: "DeepSeek-V3.1",
				deepSeekTip: "More concise answers across various scenarios",
				hunyuanT1: "Hunyuan (T1)",
				hunyuanT1Tip: "Hunyuan deep thinking mode",
				deepSeekThinking: "DeepSeek-V3.1-Thinking",
				deepSeekThinkingTip: "Faster deep thinking and reasoning",
				mydoc: "My docs",
				partDocs: "Specify docs",
				network: "Web",
				wiki: "wiki",
				currentWiki: "Current Space",
				history: "AI search history",
				clearHistory: "Clear history",
				hideHistory: "Hide",
				showMore: "Show more",
				"placeholder-space": "Based on your space, documents or materials across the entire web, we will provide you with answers",
				placeholder: "Provide answers for you based on your document or the whole network data",
				aiCreating: "AI is creating...",
				append: "Continue asking...",
				"hold-to-speak": "Hold to speak"
			},
			"base-on": "base on {{range}}",
			"switch-search-range ": "switch Range",
			share: {
				to: "Share to",
				wx: "WeChat",
				qq: "QQ",
				qqzone: "QQ Zone",
				"wx-moments": "WeChat Moments",
				"wx-work": "WeChat Work",
				clipboard: "Copy Link"
			},
			universalSearchActions: {
				feedback: {
					"unlike-toast": "Thank you for feedback!",
					"pull-panel-title": "Feedback",
					submit: "Submit"
				},
				share: "Share",
				"share-to": "share to",
				createAsDocumentTitle: "Create document with search results",
				saveAsDocument: "Save as doc",
				doc: "Document",
				sheet: "Sheet",
				slide: "Slide",
				smartCanvas: "Smart Canvas",
				mindMap: "Mind Map"
			},
			reference: {
				"open-document": "Open document",
				"open-link": "Open Link",
				"save-as-document": "Save as document",
				"reference-count": "Reference {{count}} articles as reference",
				"reference-count-full": "Total reference {{count}} articles",
				saveAsDoc: "Save as document",
				saveToSpace: "Save to space",
				"reference-title": "Reference"
			},
			referenceSources: {
				link: "Web Link",
				wechat: "WeChat Official Account",
				docs: "Online Documents",
				wenku: "Tencent Wenku"
			},
			authCard: {
				title: "Authorization",
				"title-desc": "This may provide your sensitive information to this website or application, we will use strict measures to ensure its security, not used for model training.",
				"content-title": "Authorize \"AI document assistant\" to use your Tencent document permissions, please confirm you have the right to authorize the following:",
				"content-title-desc": "You can view or close access permissions at Privacy > AI document assistant switch at any time",
				"list-item": {
					doc: "View and edit online document content",
					sheet: "View and edit online spreadsheet content",
					slide: "View and edit online slide content",
					smartCanvas: "View and edit smart canvas content",
					mindMap: "View and edit mind map content",
					pdf: "View PDF content",
					voiceNotes: "View and edit voice notes content",
					form: "View and edit form content",
					smartsheet: "View and edit smart sheet content"
				},
				"scope-desc": "Please be informed that after enabling this function, the AI Document Assistant will retrieve your documents (including but not limited to those created by you, with editing or viewing permissions), and generate specific content based on the instructions you input. The documents processed by the AI Document Assistant may contain personal information (including sensitive personal information) or other data. Using this function means that you understand and authorize the data processing behavior. We only process the relevant data in accordance with your instructions. Please be careful not to infringe upon others' privacy and personal information rights. If you wish the AI Document assistant to search for and generate content for the above-mentioned permission documents, you should ensure that you have obtained all necessary legal rights for any form of use of any content contained therein.",
				"agree-button": "Agree to authorize",
				"agree-desc": "I have read and agree to Tencent document's",
				serviceAgreement: "Service Agreement",
				and: "and",
				privacyAgreement: "Privacy Policy"
			},
			"search-import-card": {
				"card-title": "Initialization configuration",
				"vip-importing-tips": "Building AI retrieval based on all your documents",
				"none-vip-importing-tips": "Building AI retrieval based on your recent 10 documents",
				"analysis-tips": "AI assistant is parsing documents...",
				"indexing-tips": "AI retrieval based on your question",
				"generate-tips": "Generating AI search results",
				"upgrade-vip-tips": "Upgrade SVIP to unlock AI search for all documents",
				"mini-card": {
					"init-tips": "Initializing configuration...",
					"indexing-tips": "Building AI search",
					collapse: "Collapse"
				}
			},
			message: {
				"recommend-questions-tips": "You may want to ask:",
				"copy-success": "Copied successfully"
			},
			errorMessage: {
				commonError: "Request failed",
				searchNotFound: "No related content found in the last 10 viewed documents.",
				searchNotFoundVip: "No related content found in your documents.",
				searchNotFoundUniversalRecommend: "Try global web search",
				searchNotFoundVipRecommend: "Upgrade SVIP to unlock AI search for all documents.",
				sensitiveError: "Dear user, let's change the topic.",
				"mike-unauthorized": "Microphone Unauthorized",
				"mike-failed-to-get": "Failed to Access Microphone"
			},
			"message-buttons": {
				"create-slide": "Generate PPT",
				"create-mindmap": "Generate Mind Map",
				"create-flow-chart": "Generate Flow Chart"
			},
			"files-message": { title: "Generated documents for you:" },
			"category-name": {
				mindMap: "Mind Map",
				flowChart: "Flow Chart"
			},
			toast: {
				"copy-success": "Copied successfully",
				"create-file-failed": "Create {{type}} failed, please try again"
			},
			slide: { "template-modal": {
				title: "Select Template",
				"footer-btn-text": "Continue"
			} },
			"function-call": {
				slide: { "not-support-case-of-slide": "Please tell me your PPT theme, after clarifying the theme, we will start together!" },
				mind: { "not-support-case-of-mind": "Please tell me your mind map theme, after clarifying the theme, we will start together!" },
				flow: { "not-support-case-of-flow": "Please tell me your flow chart theme, after clarifying the theme, we will start together!" },
				default: "Please tell me what your topic is. After clarifying the topic, let's start together!"
			},
			"ux-atom": {
				"uploader-box": {
					"online-tencent-docs": "Tencent Docs",
					"local-file": "Local File",
					link: "Link",
					"text-input": "Text input",
					"beautify-ppt": "Upload existing PPT",
					image: "Image",
					"online-tencent-docs-desc": "Select Tencent Docs as reference material",
					"local-file-desc": "Supports {{ format }} and other formats",
					"link-desc": "Upload web link as reference material",
					"text-input-desc": "Copy long text content to generate PPT",
					"beautify-ppt-desc": "Upload PPT to beautify",
					"beautify-ppt-tag": "Smart Beautify",
					"image-desc": "Supports image formats",
					"beautify-ppt-error": "Upload failed",
					"beautify-ppt-loading": "PPT uploading...",
					"text-input-placeholder": "Input or paste text content (outline/document/reference material), supports up to 50000 long text content",
					"text-input-max-count": "The text content length cannot exceed {{ count }}",
					"send-failed-due-to-attachment": "There are files that failed to upload/parse, please check and try again"
				},
				"uploader-selector": { "attachment-upload-tips": "Upload" },
				"upload-size-imit": "Filtered out documents larger than {{size}}MB",
				"add-link": {
					"tips-msg": "Please enter a valid link format",
					placeholder: "Paste or enter a link"
				},
				confirm: "Confirm",
				cancel: "Cancel"
			},
			desktop: { "create-tab": {
				slide: {
					placeholder: "Input the topic of the Slide you want to create",
					"tab-header": {
						theme: "Topic",
						template: "Template"
					},
					upload: "Upload template",
					more: "More",
					"based-on-attachment": "Create a Slide based on the above materials",
					template: { title: "Quick Actions" },
					"customer-effect": "Customize generation effects",
					"voice-desc": "Voice description Slide requirements, for example:",
					"voice-placeholder": "Write a Slide introducing Tencent Docs, with 10 pages, in a tech style"
				},
				doc: {
					"create-title": "Create a document",
					placeholder: "Input the topic of the document you want to create",
					"based-on-attachment": "Create a document based on the above materials",
					"voice-desc": "Voice description document requirements, for example:",
					"voice-placeholder": "Write a document introducing AI creation, with a word count of 1000 words"
				},
				mind: {
					"create-title": "Create a mind map",
					placeholder: "Input the topic of the mind map you want to create",
					"based-on-attachment": "Create a mind map based on the above materials",
					"voice-desc": "Voice description mind map requirements, for example:",
					"voice-placeholder": "Write a mind map introducing Tencent Docs industry analysis report"
				},
				common: { "create-fail": "Creation failed" }
			} },
			file: { status: {
				uploading: "Uploading",
				"upload-success": "Upload successful",
				"upload-failed": "Document upload failed, please retry",
				prepare: "Pending parsing",
				embedding: "Parsing",
				"embedding-success": "Parsing successful",
				"embedding-failed": "Parse failed, please retry"
			} },
			"ai-content-notice": "Content generated by AI, for reference only"
		}),
		"zh-CN": e$14({}, a, t$8),
		"zh-HK": e$14({}, a, n$12)
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-33302b4d.js
function c$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		r && (n = n.filter((function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		}))), t.push.apply(t, n);
	}
	return t;
}
function i$10(r) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? c$4(Object(n), !0).forEach((function(t) {
			e$14(r, t, n[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(n)) : c$4(Object(n)).forEach((function(e) {
			Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(n, e));
		}));
	}
	return r;
}
var s$7;
var init_index_33302b4d = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_locales();
	init_esm$3();
	initI18n({
		resources: o$9,
		ns: a
	});
	s$7 = function(e, r) {
		return translate(e, i$10(i$10({}, r), {}, { ns: a }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/style-inject.es-3984fa0f.js
function e$12(e, t) {
	void 0 === t && (t = {});
	var d = t.insertAt;
	if (e && "undefined" != typeof document) {
		var n = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
		s.type = "text/css", "top" === d && n.firstChild ? n.insertBefore(s, n.firstChild) : n.appendChild(s), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(document.createTextNode(e));
	}
}
var init_style_inject_es_3984fa0f = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-24c917bb.js
var import_react$24, s$6, f$5, p$3;
var init_index_24c917bb = __esmMin((() => {
	init_slicedToArray_e715395f();
	init_defineProperty_28d1b327();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$4();
	init_esm$2();
	init_index_54f3d2bb();
	init_esm$9();
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-reference-item {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 20px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  color: #666;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  margin: 0 2px;\n  position: relative;\n  top: -1px;\n  transition: all 0.2s;\n}\n.ai-component-mobile-reference-item:hover {\n  background-color: var(--feedback-active, rgba(6, 15, 26, 0.1));\n}\n.ai-component-mobile-reference-modal.dui-m-bottommodal {\n  width: 100vw;\n  margin-bottom: 0;\n  border-radius: 16px 16px 0px 0px;\n  padding: 0;\n  padding-bottom: env(safe-area-inset-bottom);\n}\n.ai-component-mobile-reference-modal.dui-m-bottommodal .dui-m-bottommodal-header {\n  width: 100%;\n  padding: 2px 0 16px;\n  pointer-events: none;\n}\n.ai-component-mobile-reference-modal.dui-m-bottommodal .dui-m-bottommodal-content {\n  margin: 0;\n  padding: 16px 24px 32px;\n  box-sizing: border-box;\n}\n.ai-component-mobile-reference-modal.dui-m-bottommodal .dui-m-bottommodal-footer {\n  padding: 0 16px;\n  margin: 0;\n}\n.ai-component-mobile-reference-modal-content-title {\n  overflow: hidden;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-family: \"PingFang SC\";\n  font-size: 17px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n  /* 141.176% */\n  margin-bottom: 8px;\n}\n.ai-component-mobile-reference-modal-content-content {\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 22px;\n  overflow-wrap: break-word;\n  word-break: break-word;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  display: -webkit-box;\n  -webkit-line-clamp: 12;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ai-component-mobile-reference-modal-content-info {\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n}\n.ai-component-mobile-reference-modal-content-info img {\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.ai-component-mobile-reference-modal-content-info-left,\n.ai-component-mobile-reference-modal-content-info-right {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  /* 133.333% */\n}\n.ai-component-mobile-reference-modal-content-info-left {\n  display: flex;\n  align-items: center;\n}\n.ai-component-mobile-reference-modal-footer {\n  width: 100%;\n}\n.ai-component-mobile-reference-modal-footer-action {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-self: stretch;\n  gap: 12px;\n}\n.ai-component-mobile-reference-modal-footer-action span {\n  display: flex;\n  height: 48px;\n  justify-content: center;\n  align-items: center;\n  flex: 1 0 0;\n  border-radius: 12px;\n  background: var(--tsp-fill-medium, rgba(29, 79, 106, 0.08));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  text-align: center;\n  font-family: \"PingFang SC\";\n  font-size: 17px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n}\n.ai-component-mobile-reference-modal-footer-action span:last-child {\n  background: var(--Intent-Accent-default, #0073FF);\n  color: var(--text-text-white, #FFF);\n}\n");
	s$6 = e$14(e$14(e$14(e$14({}, l$7.LINK, s$7("referenceSources.link")), l$7.WECHAT, s$7("referenceSources.wechat")), l$7.DOCS, s$7("referenceSources.docs")), l$7.WENKU, s$7("referenceSources.wenku"));
	f$5 = function(e) {
		try {
			return e.publishTime ? new Intl.DateTimeFormat("zh-CN", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			}).format(/* @__PURE__ */ new Date(1e3 * Number(e.publishTime))).replace(/\//g, "-") : "";
		} catch (e) {
			return console.error("【MobileReferencePopover】getDateStr error:", e), "";
		}
	};
	p$3 = function(n) {
		var m = n.text, p = n.references, d = n.handlers, b = m.split(","), g = G$4(p.items || []).referencesWithSource, u = p.citations || [], x = S$4.isSupportSpace();
		return import_react$24.createElement(import_react$24.Fragment, null, b.map((function(n) {
			var i = t$9(n.split("-"), 2), m = i[0], p = i[1], b = g[parseInt(m, 10) - 1];
			if (!b) return null;
			var v = u[parseInt(p, 10) - 1];
			return import_react$24.createElement("div", {
				key: "".concat(m, "-").concat(p),
				className: "ai-component-mobile-reference-item",
				onClick: function() {
					null != d && d.onReferenceOpen && function(e, n, r) {
						var i = "ai-component-mobile-reference-modal-content", m = s$6[e.source];
						e.source === l$7.DOCS && (m = T$3(e.url, e.ext).docTypeLabel);
						var p, b = "";
						x && (e.source === l$7.DOCS || e.isSavable) ? b = s$7("reference.saveToSpace") : e.isSavable && (b = s$7("reference.save-as-document")), BottomModal_default.show({
							className: "ai-component-mobile-reference-modal",
							style: { paddingTop: 14 },
							title: "".concat(s$7("reference.reference-title")).concat(r),
							content: import_react$24.createElement("div", { className: i }, import_react$24.createElement("div", { className: "".concat(i, "-title") }, e.title), import_react$24.createElement("div", { className: "".concat(i, "-content") }, e.abstract || (null == n ? void 0 : n.content)), import_react$24.createElement("div", { className: "".concat(i, "-info") }, import_react$24.createElement("div", { className: "".concat(i, "-info-left") }, import_react$24.createElement("img", {
								src: e.icon,
								alt: ""
							}), " ", m), import_react$24.createElement("div", { className: "".concat(i, "-info-right") }, f$5(e)))),
							primaryActionClassName: "ai-component-mobile-reference-modal-footer",
							primaryAction: import_react$24.createElement("div", { className: "ai-component-mobile-reference-modal-footer-action" }, import_react$24.createElement("span", { onClick: function() {
								var n;
								null === (n = d.onReferenceOpen) || void 0 === n || n.call(d, e);
							} }, e.source === l$7.DOCS ? s$7("reference.open-document") : s$7("reference.open-link")), b && import_react$24.createElement("span", { onClick: function() {
								var n;
								null === (n = d.onReferenceSave) || void 0 === n || n.call(d, e);
							} }, b))
						}), e.isSavable && (null === (p = d.onReferenceSaveShow) || void 0 === p || p.call(d));
					}(b, v, m);
				}
			}, import_react$24.createElement("span", null, m));
		})));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/extends-559f37d0.js
function n$11() {
	return n$11 = Object.assign ? Object.assign.bind() : function(n) {
		for (var r = 1; r < arguments.length; r++) {
			var a = arguments[r];
			for (var t in a) ({}).hasOwnProperty.call(a, t) && (n[t] = a[t]);
		}
		return n;
	}, n$11.apply(null, arguments);
}
var init_extends_559f37d0 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/markdown-render/index.js
var import_react$23, f;
var init_markdown_render = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_esm$2();
	init_index_54f3d2bb();
	init_esm$9();
	init_index_24c917bb();
	init_extends_559f37d0();
	init_slicedToArray_e715395f();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_style_inject_es_3984fa0f();
	e$12(".ai-mobile-table-preview {\n  width: calc(100vw - 96px);\n  height: calc(100vh - 40px);\n  max-width: 1080px;\n  min-width: 830px;\n  max-height: 680px;\n  min-height: 560px;\n  padding: 20px 0 0 0;\n  box-sizing: border-box;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.ai-mobile-table-preview.dui-modal .dui-modal-close {\n  top: 12px;\n}\n.ai-mobile-table-preview-title {\n  padding: 0 20px;\n}\n.ai-mobile-table-preview-container {\n  padding: 45px 97px;\n  border-top: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  border-bottom: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  height: calc(100% - 90px);\n  width: calc(100% - 194px);\n  box-sizing: content-box;\n  position: relative;\n}\n.ai-mobile-table-preview-content {\n  position: absolute;\n  height: calc(100% - 90px);\n  width: calc(100% - 194px);\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  overflow: auto;\n}\n.ai-mobile-table-preview-content .ai-markdown-card {\n  margin: auto;\n}\n.ai-mobile-table-preview-content .markdown-card {\n  transition: transform 0.3s ease;\n}\n.ai-mobile-table-preview-content::-webkit-scrollbar {\n  display: none;\n}\n.ai-mobile-table-preview-footer {\n  height: 72px;\n  width: 100%;\n  display: flex;\n  padding: 0 24px;\n  justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  gap: 16px;\n}\n.ai-mobile-table-preview-footer button {\n  width: 92px;\n  height: 36px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.ai-mobile-table-preview-copy-table.ai-mobile-table-preview-content {\n  position: absolute;\n  top: -10000px;\n  left: -10000px;\n}\n.ai-mobile-table-preview-copy-table.ai-mobile-table-preview-content .ai-markdown-card th {\n  background: none;\n}\n.ai-mobile-table-preview .dui-modal-content {\n  flex: 1;\n}\n");
	e$12("@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card {\n  word-break: break-word;\n  white-space: wrap;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 16px;\n  line-height: 1.75;\n  font-weight: 400;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card-dot * {\n  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > :first-child {\n  margin-top: 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > :last-child {\n  margin-bottom: 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h1 {\n  font-size: 24px;\n  line-height: 1.6;\n  margin: 24px 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h2,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h3 {\n  font-size: 18px;\n  line-height: 22px;\n  margin: 16px 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h4,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h5,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card h6 {\n  font-size: 16px;\n  line-height: 1.75;\n  margin: 16px 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card p {\n  font-size: 16px;\n  line-height: 1.75;\n  margin: 8px 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card ol {\n  padding-left: 24px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card ol > li {\n  margin: 8px 0;\n  margin-left: 8px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card ol > li::marker {\n  font-weight: bold;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card ul {\n  list-style-position: outside;\n  padding-left: 24px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card ul > li {\n  margin: 8px 0;\n  margin-left: 8px;\n  list-style-type: disc;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card hr {\n  margin: 16px 0;\n  border: none;\n  border-top: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card pre {\n  margin: 16px 0;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table {\n  min-width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 20px;\n  margin: 8px 0;\n  box-sizing: border-box;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr td:not(:last-child),\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr th:not(:last-child) {\n  border-right: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-bottom: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr td:last-child,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr th:last-child {\n  border-bottom: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr:first-child th:first-child {\n  border-top-left-radius: 20px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr:first-child th:last-child {\n  border-top-right-radius: 20px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr:last-child td:first-child {\n  border-bottom-left-radius: 20px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr:last-child td:last-child {\n  border-bottom-right-radius: 20px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card table tr:last-child td {\n  border-bottom: unset;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card th {\n  background: var(--bg-lv2-weak, #f3f5f7);\n  white-space: nowrap;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card th,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card td {\n  padding: 10px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card tr {\n  transition: background 0.3s ease;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card .markdown-excel-chart img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h1 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h2 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h3 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h4 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h5 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > h6 > img,\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card > p > img {\n  width: 100%;\n  border-radius: 4px;\n}\n.ai-component-mobile-markdown-renderer .ai-component-common-markdown-card strong {\n  font-weight: bold;\n}\n.__DARK__ .ai-component-mobile-markdown-renderer .ai-component-common-markdown-card th {\n  background: #0a0805;\n  white-space: nowrap;\n}\n.__DARK__ .ai-component-mobile-markdown-renderer .ai-component-common-markdown-card th,\n.__DARK__ .ai-component-mobile-markdown-renderer .ai-component-common-markdown-card td {\n  border: 1px solid #efefef;\n  padding: 10px;\n}\n.__DARK__ .ai-component-mobile-markdown-renderer .ai-component-common-markdown-card tr:nth-child(even) {\n  background: #0a0805;\n}\n");
	f = De$1({
		inlineComponents: e$14(e$14(e$14({}, v$3.MARKDOWN_SEARCH_REF, p$3), v$3.MARKDOWN_SEARCH_REF_TEXT, (function() {
			return null;
		})), v$3.MARKDOWN_SEARCH_REF_CITATIOIN, (function() {
			return null;
		})),
		blockComponents: e$14(e$14({}, x$2.MARKDOWN_LINK_CARD, (function() {
			return null;
		})), x$2.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER, (function() {
			return null;
		})),
		tableComponents: e$14({}, X$2.MARKDOWN_TABLE_PREVIEW, (function(n) {
			var o = n.tableProps, r = n.visible, a = n.onHide, m = n.onConfirm, d = n.btnText, h = n.title, f = n.insertAble, g = (0, import_react$23.createRef)(), x = (0, import_react$23.createRef)(), v = t$9((0, import_react$23.useState)(1), 2), _ = v[0], y = v[1];
			return (0, import_react$23.useEffect)((function() {
				if (r) {
					var n = function() {
						var n = g.current, e = x.current;
						if (n && e) {
							var o = n.offsetWidth, r = e.offsetWidth, a = n.offsetHeight, m = e.offsetHeight, i = Math.min(r / o, m / a);
							if (i < 1) return;
							y(i);
						}
					};
					n();
					var e = new ResizeObserver((function() {
						n();
					}));
					return x.current && e.observe(x.current), function() {
						e.disconnect();
					};
				}
			}), [
				x,
				g,
				r
			]), r ? import_react$23.createElement(Modal_default, {
				className: "ai-mobile-table-preview",
				title: import_react$23.createElement("div", { className: "ai-mobile-table-preview-title" }, h),
				visible: r,
				onCancel: a,
				footer: null,
				style: { padding: "24px 24px 0" }
			}, import_react$23.createElement("div", { className: "ai-mobile-table-preview-container" }, import_react$23.createElement("div", {
				ref: x,
				className: "ai-table-preview-content"
			}, import_react$23.createElement("div", {
				style: { transform: "scale(".concat(_, ")") },
				className: "ai-markdown-card"
			}, import_react$23.createElement("table", o)))), import_react$23.createElement("div", { className: "ai-mobile-table-preview-footer" }, import_react$23.createElement(a$11, {
				text: s$7("markdown.table.preview.footer-copy"),
				onClick: function() {
					var n, e;
					if (g.current) {
						var o = document.createRange();
						o.selectNode(g.current), null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges(), null === (e = window.getSelection()) || void 0 === e || e.addRange(o), document.execCommand("copy"), Snackbar_default.show({
							message: s$7("message.copy-success"),
							type: "success"
						});
					}
				}
			}), f && import_react$23.createElement(a$11, {
				text: d || "",
				type: "primary",
				onClick: m
			})), import_react$23.createElement("div", { className: "ai-mobile-table-preview-copy-table ai-mobile-table-preview-content" }, import_react$23.createElement("div", { className: "ai-markdown-card" }, import_react$23.createElement("table", n$11({ ref: g }, o))))) : null;
		})),
		snackbar: Snackbar_default
	}, "ai-component-mobile-markdown-renderer");
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/with-thinking/index.js
var import_react$22, r;
var init_with_thinking = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_esm$2();
	init_esm$9();
	init_markdown_render();
	r = m$5({
		loadingElement: import_react$22.createElement(Loading_default, {
			visible: !0,
			style: {
				width: 14,
				height: 14
			}
		}),
		markdownComponent: f
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-c2e6551b.js
var import_react$21, import_classnames$11, s$4, v$2, f$4, m$1;
var init_index_c2e6551b = __esmMin((() => {
	init_slicedToArray_e715395f();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_esm$1();
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
	init_purify_es();
	init_lodash();
	init_esm$9();
	init_style_inject_es_3984fa0f();
	(function(t) {
		t.TEXT_INPUT = "text", t.OPTION_INPUT = "option", t.TEXT_LABEL = "label", t.TEXT_INPUT_VALUE = "text-input-value";
	})(s$4 || (s$4 = {}));
	v$2 = function(t) {
		return "Backspace" === t.key || "Delete" === t.key;
	};
	f$4 = function(t, n) {
		var e = JSON.parse(decodeURIComponent(t.dataset.inputOptions || "[]")), o = t.dataset.value, a = function(t) {
			var n = t.getBoundingClientRect(), e = window.scrollX || window.pageXOffset, o = window.scrollY || window.pageYOffset;
			return {
				top: n.top + o,
				left: n.left + e
			};
		}(t), i = a.left, l = a.top, r = document.createElement("div");
		r.style.position = "fixed", r.style.left = "".concat(i, "px"), r.style.top = "".concat(l, "px"), r.style.top = "".concat(l, "px"), r.id = "ai-component-mobile-template-input-options-root", document.body.appendChild(r), t.className += " ai-component-mobile-template-input__slot-option--active";
		var u = Array.from(new Map(e.map((function(t) {
			return [t.id, t];
		}))).values()), p = ActionSheet_default.show({
			options: u.map((function(t) {
				return {
					id: t.id,
					title: t.label
				};
			})),
			onClickAction: function(e) {
				var o = u.find((function(t) {
					return t.value === e;
				}));
				o && (t.dataset.value = o.value, t.innerText = o.label, n?.(o), p());
			},
			selectedIds: o ? [o] : []
		}).close;
	};
	e$12(".ai-component-mobile-template-input {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.2;\n  min-height: 48px;\n  max-height: 180px;\n  cursor: text;\n  overflow-y: auto;\n  position: relative;\n  z-index: 3;\n}\n.ai-component-mobile-template-input span[data-active='true'] {\n  border: 1px solid var(--accent-default, #1e6fff);\n}\n.ai-component-mobile-template-input[data-empty='true']::after {\n  content: attr(placeholder);\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n}\n.ai-component-mobile-template-input__left-operation-area {\n  display: flex;\n  justify-content: flex-start;\n}\n.ai-component-mobile-template-input__chooseBtn {\n  margin-right: 8px;\n}\n.ai-component-mobile-template-input > * {\n  vertical-align: middle;\n}\n.ai-component-mobile-template-input__input {\n  word-break: break-all;\n  cursor: text;\n  caret-color: #1e6fff;\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-style: normal;\n  font-weight: 400;\n  outline: none;\n  display: inline-block;\n  width: 100%;\n  flex: 1;\n}\n.ai-component-mobile-template-input__input[data-empty='true']:after {\n  content: attr(placeholder);\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-mobile-template-input__con-left {\n  flex: 1;\n  max-height: 300px;\n  overflow: auto;\n  display: flex;\n  align-items: center;\n}\n.ai-component-mobile-template-input__setBox {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ai-component-mobile-template-input__send {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-mobile-template-input__divider {\n  width: 1px;\n  height: 16px;\n  background: var(--Border-medium, rgba(0, 0, 0, 0.08));\n  margin: 0 8px;\n}\n.ai-component-mobile-template-input__upload {\n  display: flex;\n  width: 24px;\n  height: 24px;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-mobile-template-input__pre {\n  float: left;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 28px;\n}\n.ai-component-mobile-template-input__icon {\n  width: 24px;\n  height: 24px;\n  cursor: default;\n  margin-right: 4px;\n  user-select: none;\n}\n.ai-component-mobile-template-input__label {\n  position: relative;\n  display: block;\n  background: linear-gradient(230deg, #1AFABF -6.03%, #05C5FF 21.83%, #0597FF 46.35%, #09B5FF 95.57%);\n  padding: 2px 4px;\n  border-radius: 4px;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0 4px;\n  height: 22px;\n  cursor: pointer;\n  text-indent: 0;\n}\n.ai-component-mobile-template-input__label-bg {\n  background: var(--bg-lv4-default, #fff);\n  position: absolute;\n  top: 1px;\n  bottom: 1px;\n  left: 1px;\n  right: 1px;\n  border-radius: 3px;\n}\n.ai-component-mobile-template-input__label-text {\n  background: linear-gradient(230deg, #1AFABF -6.03%, #05C5FF 21.83%, #0597FF 46.35%, #09B5FF 95.57%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  color: transparent;\n  line-height: 26px;\n  z-index: 1;\n}\n.ai-component-mobile-template-input__slot-text,\n.ai-component-mobile-template-input__slot-option {\n  word-break: break-all;\n  display: inline-flex;\n  min-height: 20px;\n  line-height: 20px;\n  border-radius: var(---, 4px);\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background: var(--fill-weak, #f9fafb);\n  color: var(--text-ultrastrong, var(--text-ultrastrong, rgba(0, 0, 0, 0.88)));\n  padding: 2px 4px;\n  margin: 0 4px;\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  cursor: text;\n  text-indent: 0;\n  box-sizing: content-box;\n}\n.ai-component-mobile-template-input__slot-text[data-input-name=\"slide_attachment_template_options\"],\n.ai-component-mobile-template-input__slot-option[data-input-name=\"slide_attachment_template_options\"] {\n  display: inline;\n  line-height: 28px;\n}\n.ai-component-mobile-template-input__slot-option {\n  cursor: pointer;\n  padding: 2px 2px 2px 4px;\n}\n.ai-component-mobile-template-input__slot-option-icon {\n  width: 16px;\n  height: 16px;\n  pointer-events: none;\n}\n.ai-component-mobile-template-input__slot-option--active::after {\n  transform: rotate(180deg);\n}\n.ai-component-mobile-template-input__slot-text > div {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  outline: none;\n}\n.ai-component-mobile-template-input__slot-text > div[data-placeholder]:empty:after {\n  content: attr(data-placeholder);\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-componnet-mobile-template-options {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n");
	m$1 = (0, import_react$21.forwardRef)((function(e, c) {
		var d = e.disabled, m = e.allowEmptyBr, g = void 0 === m || m, x = e.canDeleteTextInputValue, b = void 0 !== x && x, T = e.placeholder, y = e.onCompositionStart, _ = e.onCompositionEnd, h = e.onInput, w = e.onFocus, E = e.onBlur, C = e.onClick, N = e.onEnter, I = e.wholeContentEditable, P = void 0 !== I && I, A = e.preventScrollOnFocus, U = void 0 !== A && A, k = (0, import_react$21.useRef)(!1), O = (0, import_react$21.useRef)(null), S = (0, import_react$21.useRef)(!1), F = (0, import_react$21.useRef)(!1), X = (0, import_react$21.useRef)(), L = function(n) {
			var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
			if (O.current) {
				var o = purify.sanitize(n.value || "");
				O.current.innerHTML = o.split(/({{\..*?}})/).map((function(e) {
					var a = t$9(/^{{\.(.*?)}}$/.exec(e) || [], 2)[1];
					if (a) {
						var i, l = null === (i = n.valueOptions) || void 0 === i ? void 0 : i.find((function(t) {
							return t.name === a;
						}));
						if (l) {
							var r, u;
							if (l.type === s$4.OPTION_INPUT) X.current = (null === (r = l.options) || void 0 === r ? void 0 : r.find((function(t) {
								return t.value === l.value;
							}))) || (null === (u = l.options) || void 0 === u ? void 0 : u.find((function(t) {
								return t.value === l.defaultValue;
							})));
							return function(t) {
								return t.type === s$4.TEXT_INPUT ? "<span\n    data-input-type=\"".concat(s$4.TEXT_INPUT, "\"\n    data-input-name=\"").concat(t.name, "\"\n    data-default-value=\"").concat(t.defaultValue, "\"\n    class=\"ai-component-mobile-template-input__slot-text\"\n    contenteditable=\"false\"\n  ><div\n      tabindex=\"-1\"\n      data-input-type=\"").concat(s$4.TEXT_INPUT_VALUE, "\"\n      contenteditable=\"false\"\n      data-placeholder=\"").concat(t.defaultValue, "\"\n    >").concat(t.value || "", "</div></span>") : t.type === s$4.OPTION_INPUT ? "<span\n    data-input-type=\"".concat(s$4.OPTION_INPUT, "\"\n    data-input-name=\"").concat(t.name, "\"\n    data-default-value=\"").concat(t.defaultValue, "\"\n    data-input-options=\"").concat(encodeURIComponent(JSON.stringify(t.options)), "\"\n    data-value=\"").concat(t.value || t.defaultValue, "\"\n    class=\"ai-component-mobile-template-input__slot-option\"\n    contenteditable=\"false\"\n  >").concat(null === (n = t.options.find((function(n) {
									return n.value === t.value;
								})) || t.options.find((function(n) {
									return n.value === t.defaultValue;
								}))) || void 0 === n ? void 0 : n.label, "<img src=\"").concat("data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eicon_thirdary_arrow_fill_down%3c/title%3e %3cg id='%e8%a7%86%e8%a7%89' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='03_%e8%af%84%e8%ae%ba_%e8%af%84%e8%ae%ba%e5%bd%92%e6%a1%a3' transform='translate(-348.000000%2c -134.000000)'%3e %3cg id='icon_thirdary_arrow_fill_down' transform='translate(348.000000%2c 134.000000)'%3e %3cg id='PC/%e5%9f%ba%e7%a1%80/%e7%ae%ad%e5%a4%b4/%e4%b8%8a' transform='translate(6.000000%2c 6.000000) scale(1%2c -1) rotate(-360.000000) translate(-6.000000%2c -6.000000) '%3e %3crect id='%e7%9f%a9%e5%bd%a2' x='0' y='0' width='12' height='12' rx='1.5'%3e%3c/rect%3e %3cpath d='M6.16%2c4.21333333 L8.76%2c7.68 C8.82627417%2c7.76836556 8.80836556%2c7.89372583 8.72%2c7.96 C8.68538077%2c7.98596443 8.64327404%2c8 8.6%2c8 L3.4%2c8 C3.28954305%2c8 3.2%2c7.91045695 3.2%2c7.8 C3.2%2c7.75672596 3.21403557%2c7.71461923 3.24%2c7.68 L5.84%2c4.21333333 C5.90627417%2c4.12496777 6.03163444%2c4.10705916 6.12%2c4.17333333 C6.13516113%2c4.18470418 6.14862915%2c4.1981722 6.16%2c4.21333333 Z' id='%e4%b8%89%e8%a7%92%e5%bd%a2' fill='%2381868F'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e", "\" class=\"ai-component-mobile-template-input__slot-option-icon\" /></span>") : t.type === s$4.TEXT_LABEL ? "<span\n    data-input-type=\"".concat(s$4.TEXT_LABEL, "\"\n    data-default-value=\"").concat(t.defaultValue, "\"\n    data-input-name=\"").concat(t.name, "\"\n    class=\"ai-component-mobile-template-input__slot-label\"\n    contenteditable=\"true\"\n  >").concat(t.value || t.defaultValue, "</span>") : "";
								var n;
							}(l);
						}
						return "";
					}
					return e;
				})).join(""), B(), e && z();
			}
		};
		(0, import_react$21.useImperativeHandle)(c, (function() {
			return {
				focus: z,
				setContent: function(t, n) {
					L(t, n);
				},
				blur: function() {
					var t;
					return null === (t = O.current) || void 0 === t ? void 0 : t.blur();
				},
				getRef: function() {
					return O;
				},
				getCurrentSelectOption: function() {
					return X.current;
				}
			};
		}));
		var D = function(t, n) {
			var e;
			return 0 === t.startOffset && (null === (e = n.previousElementSibling) || void 0 === e || null === (e = e.dataset) || void 0 === e ? void 0 : e.inputType) === s$4.TEXT_INPUT;
		}, V = function(t) {
			var n = t.target.parentElement;
			if ("Tab" === t.key) return t.preventDefault(), void function(t) {
				var n, e = Array.prototype.filter.call((null === (n = O.current) || void 0 === n ? void 0 : n.childNodes) || [], (function(t) {
					var n;
					return (null === (n = t.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT;
				})), o = e.length, a = e.indexOf(t);
				if (-1 !== a) if (a !== o - 1) {
					var i = e[(a + 1) % e.length];
					j(i, "end");
				} else K();
			}(n);
			"ArrowUp" !== t.key && "ArrowDown" !== t.key || t.preventDefault(), v$2(t) && !b && (n.innerText || t.preventDefault());
		}, R = (0, import_react$21.useCallback)((function() {
			var t = O.current;
			return null != t && t.childNodes.length ? Array.prototype.map.call(null == t ? void 0 : t.childNodes, (function(t) {
				var n, e;
				return (null == t || null === (n = t.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT ? t.textContent || (null === (e = t.dataset) || void 0 === e ? void 0 : e.defaultValue) : (null == t ? void 0 : t.textContent) || "";
			})).join("") : (null == t ? void 0 : t.textContent) || "";
		}), []), B = function() {
			if (O.current) {
				var t, n, e = R(), o = "" === e || "​" === e;
				if (O.current.dataset.empty = String(o), o && requestAnimationFrame((function() {
					var t;
					"" === (null === (t = O.current) || void 0 === t ? void 0 : t.textContent) && (O.current.textContent = "​");
				})), !k.current) {
					var a = e.replace(/* @__PURE__ */ new RegExp("​", "g"), "");
					h?.(escape(a), (t = O.current, n = {
						value: (null == t ? void 0 : t.textContent) || "",
						valueOptions: []
					}, null != t && t.childNodes.length ? (n.value = "", t?.childNodes.forEach((function(t) {
						var e, o, a, i, l, r, u, p, c = t;
						return null != c && null !== (e = c.dataset) && void 0 !== e && e.inputType ? (n.value += "{{.".concat(null == c || null === (o = c.dataset) || void 0 === o ? void 0 : o.inputName, "}}"), n.valueOptions.push({
							name: (null == c || null === (a = c.dataset) || void 0 === a ? void 0 : a.inputName) || "",
							type: null == c || null === (i = c.dataset) || void 0 === i ? void 0 : i.inputType,
							defaultValue: (null == c || null === (l = c.dataset) || void 0 === l ? void 0 : l.defaultValue) || "",
							value: (null == c || null === (r = c.dataset) || void 0 === r ? void 0 : r.inputType) === s$4.OPTION_INPUT ? null == c ? void 0 : c.dataset.value : (null == c ? void 0 : c.textContent) || "",
							options: null != c && null !== (u = c.dataset) && void 0 !== u && u.inputOptions ? JSON.parse(decodeURIComponent(null == c || null === (p = c.dataset) || void 0 === p ? void 0 : p.inputOptions)) : void 0
						})) : n.value += null == c ? void 0 : c.textContent;
					})), n) : n));
				}
			}
		}, j = function(t) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "start", e = null == t ? void 0 : t.childNodes[0];
			e?.focus({ preventScroll: !!U || !ua.isIOS });
			var o, a = new Range();
			a.setStart(e, "end" === n && null !== (o = e.textContent) && void 0 !== o && o.length ? 1 : 0), a.collapse();
			var i = window.getSelection();
			i?.removeAllRanges(), i?.addRange(a);
		}, K = function() {
			var t, n;
			if (O.current) {
				null === (t = O.current) || void 0 === t || t.focus({ preventScroll: !!U || !ua.isIOS });
				var e = new Range();
				e.setStart(O.current, null === (n = O.current) || void 0 === n ? void 0 : n.childNodes.length), e.collapse();
				var o = window.getSelection();
				o?.removeAllRanges(), o?.addRange(e);
			}
		}, z = function() {
			var t;
			if (O.current) {
				var n = Array.prototype.find.call((null === (t = O.current) || void 0 === t ? void 0 : t.childNodes) || [], (function(t) {
					var n;
					return (null === (n = t.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT;
				}));
				n ? j(n, "end") : K();
			}
		};
		return import_react$21.createElement("div", {
			className: (0, import_classnames$11.default)("ai-component-mobile-template-input"),
			ref: O,
			spellCheck: !1,
			"data-empty": "true",
			placeholder: T,
			contentEditable: !d,
			onCompositionStart: function(t) {
				k.current = !0, y?.(t);
			},
			onCompositionEnd: function(t) {
				var n = function() {
					k.current = !1, _?.(t), B();
				};
				ua.isSafari ? setTimeout((function() {
					n();
				}), 20) : n();
			},
			onFocus: function(t) {
				var n, e, o, a;
				(ua.isIOS && setTimeout((function() {
					var t;
					window.scrollTo(0, document.documentElement.scrollHeight - ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.height) || 0));
				}), 100), F.current = (null === (n = t.target.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT_VALUE, (null === (e = t.target.dataset) || void 0 === e ? void 0 : e.inputType) === s$4.TEXT_INPUT_VALUE) && (t.target.setAttribute("contenteditable", "true"), (null === (o = t.target.parentElement) || void 0 === o || null === (o = o.dataset) || void 0 === o ? void 0 : o.inputType) === s$4.TEXT_INPUT && (null === (a = t.target.parentElement) || void 0 === a || a.setAttribute("data-active", "true")));
				S.current || null == w || w(), S.current = !0, P && z();
			},
			onBlur: function(t) {
				var n;
				if (setTimeout((function() {
					S.current || null == E || E();
				})), (null === (n = t.target.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT_VALUE) {
					var e, o;
					if (t.target.setAttribute("contenteditable", "false"), (null === (e = t.target.parentElement) || void 0 === e || null === (e = e.dataset) || void 0 === e ? void 0 : e.inputType) === s$4.TEXT_INPUT) null === (o = t.target.parentElement) || void 0 === o || o.setAttribute("data-active", "false");
					t.target.textContent || (t.target.innerHTML = "");
				}
				S.current = !1;
			},
			onInput: B,
			onClick: function(t) {
				C?.(t);
				var n = t.target;
				if (n.dataset.inputType === s$4.OPTION_INPUT && (t.preventDefault(), t.stopPropagation(), f$4(n, (function(t) {
					X.current = t, B();
				}))), n.dataset.inputType === s$4.TEXT_LABEL) {
					t.preventDefault(), t.stopPropagation();
					var e = new Range();
					e.selectNode(n);
					var o = window.getSelection();
					o?.removeAllRanges(), o?.addRange(e);
				}
			},
			onPaste: function(t) {
				var n;
				if ((null === (n = t.target) || void 0 === n || null === (n = n.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT_VALUE) {
					var e = t.target;
					if (!e.textContent) return t.preventDefault(), e.textContent = t.clipboardData.getData("text/plain"), e.parentElement && j(e.parentElement, "end"), void B();
				}
				t.preventDefault(), t.stopPropagation();
				var o = t.clipboardData.getData("text/plain");
				document.execCommand("insertText", !1, o);
			},
			onKeyDown: function(t) {
				var n;
				if ("Enter" === t.key && !k.current) {
					var e, o = {
						altKey: t.altKey,
						ctrlKey: t.ctrlKey,
						shiftKey: t.shiftKey,
						metaKey: t.metaKey
					};
					N?.(o), F.current && t.preventDefault();
					var a, i = "true" === (null === (e = O.current) || void 0 === e ? void 0 : e.dataset.empty);
					if (!g && i && O.current && (O.current.innerHTML = ""), function(t) {
						return "Enter" === t.key && function(t) {
							return t.shiftKey || t.ctrlKey || t.metaKey;
						}(t);
					}(t)) t.preventDefault(), t.stopPropagation(), "true" !== (null === (a = O.current) || void 0 === a ? void 0 : a.dataset.empty) && document.execCommand("insertText", !1, "\n");
				}
				if ("Tab" === t.key && !F.current) {
					var l = window.getSelection();
					if (null != l && l.rangeCount) {
						var r, u = l.getRangeAt(0);
						if (u.startContainer === O.current && u.startOffset === (null === (r = O.current) || void 0 === r ? void 0 : r.childNodes.length)) {
							var p;
							t.preventDefault();
							var c = Array.prototype.find.call((null === (p = O.current) || void 0 === p ? void 0 : p.childNodes) || [], (function(t) {
								var n;
								return (null === (n = t.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT;
							}));
							c && j(c, "end");
							return;
						}
					}
				}
				(null === (n = t.target) || void 0 === n || null === (n = n.dataset) || void 0 === n ? void 0 : n.inputType) === s$4.TEXT_INPUT_VALUE && V(t);
				var d = window.getSelection();
				if (null == d || !d.rangeCount) return null;
				var f = d.getRangeAt(0), m = f.startContainer, x = null == m ? void 0 : m.previousElementSibling, b = null == m ? void 0 : m.nextElementSibling;
				"ArrowRight" === t.key && function(t, n) {
					var e, o;
					return t.startOffset === (null === (e = n.textContent) || void 0 === e ? void 0 : e.length) && (null === (o = n.nextElementSibling) || void 0 === o || null === (o = o.dataset) || void 0 === o ? void 0 : o.inputType) === s$4.TEXT_INPUT;
				}(f, m) ? (t.preventDefault(), j(b, "start")) : "ArrowLeft" === t.key && D(f, m) ? (t.preventDefault(), j(x, "end")) : v$2(t) && function(t, n, e, o) {
					if (D(o, n) && "" !== (null == e ? void 0 : e.textContent)) t.preventDefault(), j(e, "end");
				}(t, m, x, f);
			},
			style: { outline: "none" }
		});
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-9822dcca.js
function e$9(t, e, r, n, o, i, a) {
	try {
		var u = t[i](a), c = u.value;
	} catch (t) {
		r(t);
		return;
	}
	u.done ? e(c) : Promise.resolve(c).then(n, o);
}
function r$9(t) {
	return function() {
		var r = this, n = arguments;
		return new Promise((function(o, i) {
			var a = t.apply(r, n);
			function u(t) {
				e$9(a, o, i, u, c, "next", t);
			}
			function c(t) {
				e$9(a, o, i, u, c, "throw", t);
			}
			u(void 0);
		}));
	};
}
function o$6(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function i$8(t) {
	if (t.__esModule) return t;
	var e = t.default;
	if ("function" == typeof e) {
		var r = function t() {
			return this instanceof t ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
		};
		r.prototype = e.prototype;
	} else r = {};
	return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach((function(e) {
		var n = Object.getOwnPropertyDescriptor(t, e);
		Object.defineProperty(r, e, n.get ? n : {
			enumerable: !0,
			get: function() {
				return t[e];
			}
		});
	})), r;
}
var n$9, a$8, u$5, c$3, f$3, l$6, s$3;
var init_index_9822dcca = __esmMin((() => {
	init_defineProperty_28d1b327();
	n$9 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
	a$8 = { exports: {} };
	u$5 = { exports: {} };
	(function(t) {
		function e(r) {
			return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t;
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
			}, t.exports.__esModule = !0, t.exports.default = t.exports, e(r);
		}
		t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(u$5);
	c$3 = u$5.exports;
	(function(t) {
		var e = c$3.default;
		function r() {
			/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
			t.exports = r = function() {
				return o;
			}, t.exports.__esModule = !0, t.exports.default = t.exports;
			var n, o = {}, i = Object.prototype, a = i.hasOwnProperty, u = Object.defineProperty || function(t, e, r) {
				t[e] = r.value;
			}, c = "function" == typeof Symbol ? Symbol : {}, f = c.iterator || "@@iterator", l = c.asyncIterator || "@@asyncIterator", s = c.toStringTag || "@@toStringTag";
			function h(t, e, r) {
				return Object.defineProperty(t, e, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}), t[e];
			}
			try {
				h({}, "");
			} catch (n) {
				h = function(t, e, r) {
					return t[e] = r;
				};
			}
			function p(t, e, r, n) {
				var o = e && e.prototype instanceof b ? e : b, i = Object.create(o.prototype);
				return u(i, "_invoke", { value: T(t, r, new M(n || [])) }), i;
			}
			function y(t, e, r) {
				try {
					return {
						type: "normal",
						arg: t.call(e, r)
					};
				} catch (t) {
					return {
						type: "throw",
						arg: t
					};
				}
			}
			o.wrap = p;
			var d = "suspendedStart", v = "suspendedYield", g = "executing", m = "completed", w = {};
			function b() {}
			function x() {}
			function _() {}
			var L = {};
			h(L, f, (function() {
				return this;
			}));
			var E = Object.getPrototypeOf, O = E && E(E(F([])));
			O && O !== i && a.call(O, f) && (L = O);
			var j = _.prototype = b.prototype = Object.create(L);
			function P(t) {
				[
					"next",
					"throw",
					"return"
				].forEach((function(e) {
					h(t, e, (function(t) {
						return this._invoke(e, t);
					}));
				}));
			}
			function S(t, r) {
				function n(o, i, u, c) {
					var f = y(t[o], t, i);
					if ("throw" !== f.type) {
						var l = f.arg, s = l.value;
						return s && "object" == e(s) && a.call(s, "__await") ? r.resolve(s.__await).then((function(t) {
							n("next", t, u, c);
						}), (function(t) {
							n("throw", t, u, c);
						})) : r.resolve(s).then((function(t) {
							l.value = t, u(l);
						}), (function(t) {
							return n("throw", t, u, c);
						}));
					}
					c(f.arg);
				}
				var o;
				u(this, "_invoke", { value: function(t, e) {
					function i() {
						return new r((function(r, o) {
							n(t, e, r, o);
						}));
					}
					return o = o ? o.then(i, i) : i();
				} });
			}
			function T(t, e, r) {
				var o = d;
				return function(i, a) {
					if (o === g) throw Error("Generator is already running");
					if (o === m) {
						if ("throw" === i) throw a;
						return {
							value: n,
							done: !0
						};
					}
					for (r.method = i, r.arg = a;;) {
						var u = r.delegate;
						if (u) {
							var c = k(u, r);
							if (c) {
								if (c === w) continue;
								return c;
							}
						}
						if ("next" === r.method) r.sent = r._sent = r.arg;
						else if ("throw" === r.method) {
							if (o === d) throw o = m, r.arg;
							r.dispatchException(r.arg);
						} else "return" === r.method && r.abrupt("return", r.arg);
						o = g;
						var f = y(t, e, r);
						if ("normal" === f.type) {
							if (o = r.done ? m : v, f.arg === w) continue;
							return {
								value: f.arg,
								done: r.done
							};
						}
						"throw" === f.type && (o = m, r.method = "throw", r.arg = f.arg);
					}
				};
			}
			function k(t, e) {
				var r = e.method, o = t.iterator[r];
				if (o === n) return e.delegate = null, "throw" === r && t.iterator.return && (e.method = "return", e.arg = n, k(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + r + "' method")), w;
				var i = y(o, t.iterator, e.arg);
				if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, w;
				var a = i.arg;
				return a ? a.done ? (e[t.resultName] = a.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = n), e.delegate = null, w) : a : (e.method = "throw", e.arg = /* @__PURE__ */ new TypeError("iterator result is not an object"), e.delegate = null, w);
			}
			function G(t) {
				var e = { tryLoc: t[0] };
				1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
			}
			function N(t) {
				var e = t.completion || {};
				e.type = "normal", delete e.arg, t.completion = e;
			}
			function M(t) {
				this.tryEntries = [{ tryLoc: "root" }], t.forEach(G, this), this.reset(!0);
			}
			function F(t) {
				if (t || "" === t) {
					var r = t[f];
					if (r) return r.call(t);
					if ("function" == typeof t.next) return t;
					if (!isNaN(t.length)) {
						var o = -1, i = function e() {
							for (; ++o < t.length;) if (a.call(t, o)) return e.value = t[o], e.done = !1, e;
							return e.value = n, e.done = !0, e;
						};
						return i.next = i;
					}
				}
				throw new TypeError(e(t) + " is not iterable");
			}
			return x.prototype = _, u(j, "constructor", {
				value: _,
				configurable: !0
			}), u(_, "constructor", {
				value: x,
				configurable: !0
			}), x.displayName = h(_, s, "GeneratorFunction"), o.isGeneratorFunction = function(t) {
				var e = "function" == typeof t && t.constructor;
				return !!e && (e === x || "GeneratorFunction" === (e.displayName || e.name));
			}, o.mark = function(t) {
				return Object.setPrototypeOf ? Object.setPrototypeOf(t, _) : (t.__proto__ = _, h(t, s, "GeneratorFunction")), t.prototype = Object.create(j), t;
			}, o.awrap = function(t) {
				return { __await: t };
			}, P(S.prototype), h(S.prototype, l, (function() {
				return this;
			})), o.AsyncIterator = S, o.async = function(t, e, r, n, i) {
				void 0 === i && (i = Promise);
				var a = new S(p(t, e, r, n), i);
				return o.isGeneratorFunction(e) ? a : a.next().then((function(t) {
					return t.done ? t.value : a.next();
				}));
			}, P(j), h(j, s, "Generator"), h(j, f, (function() {
				return this;
			})), h(j, "toString", (function() {
				return "[object Generator]";
			})), o.keys = function(t) {
				var e = Object(t), r = [];
				for (var n in e) r.push(n);
				return r.reverse(), function t() {
					for (; r.length;) {
						var n = r.pop();
						if (n in e) return t.value = n, t.done = !1, t;
					}
					return t.done = !0, t;
				};
			}, o.values = F, M.prototype = {
				constructor: M,
				reset: function(t) {
					if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(N), !t) for (var e in this) "t" === e.charAt(0) && a.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = n);
				},
				stop: function() {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ("throw" === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function(t) {
					if (this.done) throw t;
					var e = this;
					function r(r, o) {
						return u.type = "throw", u.arg = t, e.next = r, o && (e.method = "next", e.arg = n), !!o;
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var i = this.tryEntries[o], u = i.completion;
						if ("root" === i.tryLoc) return r("end");
						if (i.tryLoc <= this.prev) {
							var c = a.call(i, "catchLoc"), f = a.call(i, "finallyLoc");
							if (c && f) {
								if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
								if (this.prev < i.finallyLoc) return r(i.finallyLoc);
							} else if (c) {
								if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
							} else {
								if (!f) throw Error("try statement without catch or finally");
								if (this.prev < i.finallyLoc) return r(i.finallyLoc);
							}
						}
					}
				},
				abrupt: function(t, e) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var n = this.tryEntries[r];
						if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
							var o = n;
							break;
						}
					}
					o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
					var i = o ? o.completion : {};
					return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, w) : this.complete(i);
				},
				complete: function(t, e) {
					if ("throw" === t.type) throw t.arg;
					return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), w;
				},
				finish: function(t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), N(r), w;
					}
				},
				catch: function(t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ("throw" === n.type) {
								var o = n.arg;
								N(r);
							}
							return o;
						}
					}
					throw Error("illegal catch attempt");
				},
				delegateYield: function(t, e, r) {
					return this.delegate = {
						iterator: F(t),
						resultName: e,
						nextLoc: r
					}, "next" === this.method && (this.arg = n), w;
				}
			}, o;
		}
		t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(a$8);
	f$3 = (0, a$8.exports)();
	l$6 = f$3;
	try {
		regeneratorRuntime = f$3;
	} catch (e) {
		"object" === ("undefined" == typeof globalThis ? "undefined" : t$12(globalThis)) ? globalThis.regeneratorRuntime = f$3 : Function("r", "regeneratorRuntime = r")(f$3);
	}
	s$3 = o$6(l$6);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/ux-atom/index.js
function z$2(e, o) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var t = Object.getOwnPropertySymbols(e);
		o && (t = t.filter((function(o) {
			return Object.getOwnPropertyDescriptor(e, o).enumerable;
		}))), n.push.apply(n, t);
	}
	return n;
}
function R$2(o) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? z$2(Object(t), !0).forEach((function(n) {
			e$14(o, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : z$2(Object(t)).forEach((function(e) {
			Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(t, e));
		}));
	}
	return o;
}
var import_react$20, import_classnames$10, D$2, F, P$3, O$1, E$4, A$2, N$2, B$3, Z$2, j$2, H$2, V$1, I$4, U$2, _$1, G$2, W;
var init_ux_atom = __esmMin((() => {
	init_index_c2e6551b();
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$9();
	import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_index_9822dcca();
	init_esm$6();
	init_esm$4();
	init_esm$2();
	init_index_54f3d2bb();
	init_esm$5();
	init_purify_es();
	e$12(".ai-component-mobile-textarea {\n  border: unset;\n  width: 100%;\n  min-height: 44px;\n  resize: none;\n  outline: none;\n  background-color: transparent;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 24px;\n  transition: height 0.1s ease;\n}\n.ai-component-mobile-textarea.ai-component-mobile-textarea-bordered {\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 12px;\n  padding: 8px;\n  box-sizing: border-box;\n}\n.ai-component-mobile-textarea-empty::placeholder {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-mobile-textarea::-webkit-scrollbar {\n  width: 8px;\n}\n.ai-component-mobile-textarea::-webkit-scrollbar-thumb {\n  background-color: var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 5px;\n}\n");
	D$2 = "ai-component-mobile-textarea";
	F = function(l) {
		var r = l.placeholder, c = l.onChange, s = l.value, m = l.minRows, u = void 0 === m ? 3 : m, f = l.maxRows, v = void 0 === f ? 6 : f, b = l.disableAutoHeight, x = void 0 !== b && b, g = l.bordered, w = void 0 !== g && g, L = l.style, C = void 0 === L ? {} : L, S = l.maxCount, k = void 0 === S ? 5e4 : S, y = l.onFocus, M = l.onBlur, F = (0, import_react$20.useRef)(null), O = t$9((0, import_react$20.useState)(s || ""), 2), E = O[0], A = O[1], T = t$9((0, import_react$20.useState)(!s), 2), B = T[0], Z = T[1];
		(0, import_react$20.useEffect)((function() {
			s && s !== E && (A(s), c?.(s));
		}), [s]);
		return (0, import_react$20.useEffect)((function() {
			(function() {
				if (!x) {
					var e = F.current;
					if (e) {
						e.style.height = "auto";
						var o = parseInt(getComputedStyle(e).lineHeight), n = o * u, t = o * v, i = e.scrollHeight;
						i <= n ? (e.style.height = "".concat(n, "px"), e.style.overflowY = "hidden") : i <= t ? (e.style.height = "".concat(i, "px"), e.style.overflowY = "hidden") : (e.style.height = "".concat(t, "px"), e.style.overflowY = "auto");
					}
				}
			})();
		}), [
			E,
			u,
			v
		]), (0, import_react$20.useEffect)((function() {
			void 0 !== s && (A(s), Z("" === s.trim()));
		}), [s]), import_react$20.createElement("textarea", {
			ref: F,
			className: (0, import_classnames$10.default)("".concat(D$2), e$14(e$14({}, "".concat(D$2, "-empty"), B), "".concat(D$2, "-bordered"), w)),
			placeholder: r,
			value: E,
			onChange: function(e) {
				var o = e.target.value;
				if (o.length > k) return Snackbar_default.show({
					message: s$7("ux-atom.uploader-box.text-input-max-count", { count: k }),
					type: "error"
				}), void A(o.slice(0, k));
				A(o), Z("" === o.trim()), c?.(o);
			},
			onFocus: function() {
				y?.();
			},
			onBlur: function() {
				M?.();
			},
			rows: u,
			style: C
		});
	};
	P$3 = function(e) {
		return e[e.Doc = 0] = "Doc", e[e.Sheet = 1] = "Sheet", e[e.Form = 2] = "Form", e[e.Folder = 3] = "Folder", e[e.Slide = 4] = "Slide", e[e.Note = 5] = "Note", e[e.Pdf = 6] = "Pdf", e[e.MiniProgram = 7] = "MiniProgram", e[e.Aio = 7] = "Aio", e[e.SmartCanvas = 8] = "SmartCanvas", e[e.SmartSheet = 9] = "SmartSheet", e[e.Unknown = 10] = "Unknown", e[e.Resume = 11] = "Resume", e[e.Board = 12] = "Board", e[e.Ofd = 13] = "Ofd", e[e.Markdown = 14] = "Markdown", e[e.Drawing = 89] = "Drawing", e[e.Mind = 90] = "Mind", e[e.FlowChart = 91] = "FlowChart", e[e.Flowchart = 91] = "Flowchart", e[e.File = 100] = "File", e[e.Drive = 101] = "Drive", e[e.Rec = 102] = "Rec", e[e.Addon = 110] = "Addon", e[e.LocalFile = -201] = "LocalFile", e[e.Derivative = 111] = "Derivative", e;
	}({});
	O$1 = [
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		"application/vnd.ms-powerpoint",
		"application/vnd.openxmlformats-officedocument.presentationml.template",
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
		"application/ksdps",
		"application/ksdpt",
		"application/vnd.ms-powerpoint.presentation.macroEnabled.12",
		"application/vnd.ms-powerpoint.template.macroEnabled.12",
		"application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
	];
	P$3.Doc, P$3.Doc, P$3.Doc, P$3.Doc, P$3.Doc, P$3.Doc, P$3.Doc, P$3.Doc, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Sheet, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.Slide, P$3.FlowChart, P$3.FlowChart, P$3.Mind, P$3.Mind, P$3.Pdf, P$3.Markdown, P$3.Markdown, P$3.Doc;
	j$2 = function(e) {
		return e.Doc = "application/vnd.tdocs-apps.doc", e.Sheet = "application/vnd.tdocs-apps.sheet", e.Form = "application/vnd.tdocs-apps.form", e.Folder = "application/vnd.tdocs-apps.folder", e.CollaborationSpace = "application/vnd.tdocs-apps.collaboration-space", e.CollaborationSpaceRoot = "application/vnd.tdocs-apps.collaboration-space-root", e.SharedFolder = "application/vnd.tdocs-apps.shared-folder", e.Share = "application/vnd.tdocs-apps.share-folder", e.Slide = "application/vnd.tdocs-apps.slide", e.Pdf = "application/pdf", e.Aio = "application/vnd.tdocs-apps.aio", e.SmartCanvas = "application/vnd.tdocs-apps.smartcanvas", e.SmartSheet = "application/vnd.tdocs-apps.smartsheet", e.Mind = "application/vnd.tdocs-apps.mind", e.FlowChart = "application/vnd.tdocs-apps.flowchart", e.Board = "application/vnd.tdocs-apps.board", e.Rec = "application/vnd.tdocs-apps.rec", e.Word = "application/vnd.ms-word", e.Excel = "application/vnd.ms-excel", e.Powerpoint = "application/vnd.ms-powerpoint", e.Txt = "text/plain", e.Pixso = "application/vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed", e.Boardmix = "application/vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853", e.Zhiying = "application/vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60", e.Code = "code", e.Default = "application/vnd.tdocs-apps.default", e.Image = "image", e.Audio = "audio", e.Video = "video", e.Zip = "application/zip", e.Ofd = "application/vnd.tdocs-apps.ofd", e.DriveOfd = "application/ofd", e.Markdown = "application/vnd.tdocs-apps.markdown", e.Markdown_ASCII = "text/markdown", e.Markdown_UTF8 = "text/markdown; charset=utf-8", e.XMind = "xmind", e.Visio = "visio", e.Safe = "application/vnd.tdocs-apps.safe-folder", e.WikiSpace = "application/vnd.tdocs-apps.wiki-space", e.Webpage = "application/vnd.tdocs-webpage", e.Derivative_Query = "application/vnd.tdocs-apps.derivative.query", e.Derivative_Form = "application/vnd.tdocs-apps.derivative.form", e.Device = "application/vnd.tdocs-apps.device", e;
	}({});
	H$2 = function(e) {
		return e.Doc = "doc", e.Sheet = "sheet", e.Form = "form", e.Folder = "folder", e.Slide = "slide", e.Note = "note", e.Pdf = "pdf", e.MiniProgram = "aio", e.Aio = "aio", e.Unknown = "unknown", e.Resume = "resume", e.Ofd = "ofd", e.RelationGraph = "relationGraph", e.Mind = "mind", e.FlowChart = "flowchart", e.Board = "board", e.Markdown = "markdown", e.File = "file", e.Drive = "drive", e.SogouSpeech = "rec", e.Addon = "addon", e.SmartCanvas = "smartcanvas", e.SmartSheet = "smartsheet", e.LocalFile = "local_file", e.Derivative = "derivative", e;
	}({});
	(E$4 = {})[P$3.Doc] = j$2.Doc, E$4[P$3.Sheet] = j$2.Sheet, E$4[P$3.Slide] = j$2.Slide, E$4[P$3.Form] = j$2.Form, E$4[P$3.SmartCanvas] = j$2.SmartCanvas, E$4[P$3.SmartSheet] = j$2.SmartSheet, E$4[P$3.Mind] = j$2.Mind, E$4[P$3.FlowChart] = j$2.FlowChart, E$4[P$3.Rec] = j$2.Rec, E$4[P$3.Pdf] = j$2.Pdf, E$4[P$3.Aio] = j$2.Aio, E$4[P$3.Board] = j$2.Board, E$4[P$3.Ofd] = j$2.Ofd, E$4[P$3.Markdown] = j$2.Markdown, P$3.Doc, j$2.Ofd, j$2.DriveOfd, P$3.Ofd, P$3.Sheet, P$3.Slide, j$2.Form, P$3.Form, j$2.SmartCanvas, P$3.SmartCanvas, j$2.SmartSheet, P$3.SmartSheet, j$2.Doc, P$3.Doc, j$2.Sheet, P$3.Sheet, j$2.Slide, P$3.Slide, j$2.Mind, P$3.Mind, j$2.FlowChart, P$3.FlowChart, j$2.Board, P$3.Board, P$3.Markdown, P$3.Doc, P$3.Doc, j$2.Pdf, P$3.Pdf, P$3.FlowChart, P$3.Mind, j$2.Folder, P$3.Folder, j$2.Derivative_Form, P$3.Derivative, j$2.Derivative_Query, P$3.Derivative, (A$2 = {})[H$2.Doc] = j$2.Word, A$2[H$2.Sheet] = j$2.Excel, A$2[H$2.Slide] = j$2.Powerpoint, A$2[H$2.Mind] = j$2.XMind, A$2[H$2.FlowChart] = j$2.Visio, (N$2 = {})[P$3.Doc] = H$2.Doc, N$2[P$3.Sheet] = H$2.Sheet, N$2[P$3.Form] = H$2.Form, N$2[P$3.Folder] = H$2.Folder, N$2[P$3.Slide] = H$2.Slide, N$2[P$3.Note] = H$2.Note, N$2[P$3.Pdf] = H$2.Pdf, N$2[P$3.MiniProgram] = H$2.MiniProgram, N$2[P$3.SmartCanvas] = H$2.SmartCanvas, N$2[P$3.SmartSheet] = H$2.SmartSheet, N$2[P$3.Unknown] = H$2.Unknown, N$2[P$3.Resume] = H$2.Resume, N$2[P$3.Board] = H$2.Board, N$2[P$3.Ofd] = H$2.Ofd, N$2[P$3.Markdown] = H$2.Markdown, N$2[P$3.Drawing] = H$2.RelationGraph, N$2[P$3.Mind] = H$2.Mind, N$2[P$3.FlowChart] = H$2.FlowChart, N$2[P$3.File] = H$2.File, N$2[P$3.Drive] = H$2.Drive, N$2[P$3.Rec] = H$2.SogouSpeech, N$2[P$3.Addon] = H$2.Addon, N$2[P$3.LocalFile] = H$2.LocalFile, N$2[P$3.Derivative] = H$2.Derivative, (B$3 = {})[H$2.Doc] = j$2.Doc, B$3[H$2.Sheet] = j$2.Sheet, B$3[H$2.Slide] = j$2.Slide, B$3[H$2.Form] = j$2.Form, B$3[H$2.SmartCanvas] = j$2.SmartCanvas, B$3[H$2.SmartSheet] = j$2.SmartSheet, B$3[H$2.Mind] = j$2.Mind, B$3[H$2.FlowChart] = j$2.FlowChart, B$3[H$2.Pdf] = j$2.Pdf, B$3[H$2.Aio] = j$2.Aio, B$3[H$2.Board] = j$2.Board, B$3[H$2.Ofd] = j$2.Ofd, B$3[H$2.Markdown] = j$2.Markdown, B$3[H$2.SogouSpeech] = j$2.Rec, H$2.Drive, H$2.Drive, H$2.Drive, j$2.Form, H$2.Form, j$2.SmartCanvas, H$2.SmartCanvas, j$2.SmartSheet, H$2.SmartSheet, j$2.Doc, H$2.Doc, j$2.Sheet, H$2.Sheet, j$2.Slide, H$2.Slide, j$2.Mind, H$2.Mind, j$2.FlowChart, H$2.FlowChart, j$2.Board, H$2.Board, H$2.Drive, H$2.Drive, j$2.Pdf, H$2.Pdf, H$2.FlowChart, H$2.Mind, H$2.Drive, H$2.Drive, H$2.Drive, j$2.Ofd, H$2.Ofd, j$2.Markdown, H$2.Markdown, j$2.Rec, H$2.SogouSpeech, (Z$2 = {})[H$2.Doc] = P$3.Doc, Z$2[H$2.Sheet] = P$3.Sheet, Z$2[H$2.Form] = P$3.Form, Z$2[H$2.Folder] = P$3.Folder, Z$2[H$2.Slide] = P$3.Slide, Z$2[H$2.Note] = P$3.Note, Z$2[H$2.Pdf] = P$3.Pdf, Z$2[H$2.MiniProgram] = P$3.MiniProgram, Z$2[H$2.SmartCanvas] = P$3.SmartCanvas, Z$2[H$2.SmartSheet] = P$3.SmartSheet, Z$2[H$2.Unknown] = P$3.Unknown, Z$2[H$2.Resume] = P$3.Resume, Z$2[H$2.Board] = P$3.Board, Z$2[H$2.Ofd] = P$3.Ofd, Z$2[H$2.Markdown] = P$3.Markdown, Z$2[H$2.RelationGraph] = P$3.Drawing, Z$2[H$2.Mind] = P$3.Mind, Z$2[H$2.FlowChart] = P$3.FlowChart, Z$2[H$2.File] = P$3.File, Z$2[H$2.Drive] = P$3.Drive, Z$2[H$2.SogouSpeech] = P$3.Rec, Z$2[H$2.Addon] = P$3.Addon, Z$2[H$2.LocalFile] = P$3.LocalFile;
	e$12(".ai-component-mobile-add-link-modal-form {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n.ai-component-mobile-add-link-modal-form-input {\n  width: 100%;\n}\n.ai-component-mobile-add-link-modal-form-input > input {\n  background-color: var(--bg-lv2-medium, #18191a);\n  color: var(--text-strong, #fff);\n}\n.ai-component-mobile-add-link-modal-form-input > input::placeholder {\n  color: var(--text-strong, #fff);\n}\n.ai-component-mobile-add-link-modal-form-buttons {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding-bottom: 20px;\n}\n.ai-component-mobile-add-link-modal-form-buttons .ai-component-mobile-uploader-selector-confirm-button {\n  flex: 1;\n  width: auto;\n  padding: 6px;\n}\n.ai-component-mobile-add-link-modal-form > div {\n  margin-bottom: 0;\n}\n.ai-component-mobile-add-link-modal .dui-modal-footer {\n  margin-top: 0;\n}\n");
	I$4 = function(e) {
		var t = e.onChange, l = e.onConfirm, r = e.close, p = t$9((0, import_react$20.useState)(""), 2), s = p[0], u = p[1];
		return (0, import_react$20.useEffect)((function() {
			t?.(s);
		}), [s]), import_react$20.createElement("div", { className: "ai-component-mobile-text-panel" }, import_react$20.createElement(F, {
			placeholder: s$7("ux-atom.uploader-box.text-input-placeholder"),
			disableAutoHeight: !0,
			onChange: u
		}), import_react$20.createElement("div", { className: "ai-component-mobile-uploader-selector-buttons" }, import_react$20.createElement(Button_default, {
			type: "plain",
			className: "ai-component-mobile-uploader-selector-confirm-button",
			onClick: function() {
				u(""), r?.();
			}
		}, s$7("ux-atom.cancel")), import_react$20.createElement(Button_default, {
			type: "primary",
			className: "ai-component-mobile-uploader-selector-confirm-button",
			disabled: !s.trim().length,
			onClick: function() {
				l?.(), r?.();
			}
		}, s$7("ux-atom.confirm"))));
	};
	e$12(".ai-component-mobile-uploader-selector li.dui-menu-item {\n  padding: 9px 16px;\n}\n.ai-component-mobile-uploader-selector-icon {\n  box-sizing: content-box;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  padding: 4px;\n  justify-content: center;\n  align-items: center;\n  margin-right: 4px;\n  cursor: pointer;\n  filter: var(--icon-invert);\n}\n.ai-component-mobile-uploader-selector-icon:hover {\n  border-radius: 24px;\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-mobile-uploader-selector-icon-disable {\n  opacity: 0.5;\n}\n.ai-component-mobile-uploader-selector-dropdown .dui-tooltip-wrapper {\n  display: block;\n}\n.ai-component-mobile-uploader-selector-buttons {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding-bottom: 20px;\n}\n.ai-component-mobile-uploader-selector-confirm-button {\n  flex: 1;\n  width: auto;\n  padding: 6px auto;\n  height: 44px;\n  border-radius: 12px;\n}\n.ai-component-mobile-uploader-selector-text-modal {\n  width: 840px;\n}\n.ai-component-mobile-uploader-selector-text-modal .ai-component-mobile-textarea {\n  padding: 6px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  height: 420px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-mobile-uploader-selector-menu-item-title,\n.ai-component-mobile-uploader-selector-menu-item-description {\n  margin-left: 30px;\n}\n.ai-component-mobile-text-panel {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  box-sizing: border-box;\n  padding: 0 16px 20px;\n}\n.ai-component-mobile-text-panel textarea {\n  height: 40vh;\n}\n"), function(e) {
		e.Online = "online", e.Local = "local", e.Url = "url", e.Text = "text", e.BeautifyPPT = "beautifyPPT", e.Image = "image";
	}(V$1 || (V$1 = {}));
	U$2 = "ai-component-mobile-uploader-selector-modal";
	_$1 = (0, import_react$20.forwardRef)((function(e, r) {
		var b, D, F, P, E, A, N, T, B, Z, j, H, z, _, G, W, Y, Q = e.className, X = e.onChange, q = e.onGetFileTaskManager, $ = e.menuItem, J = void 0 === $ ? [
			V$1.Online,
			V$1.Local,
			V$1.Url
		] : $, K = e.type, ee = void 0 === K ? "icon" : K, oe = e.children, ne = e.disabled, te = e.hasTips, ie = void 0 === te || te, ae = e.tipsTxt, le = e.maxSize, re = e.mimeTypes, ce = e.supportTypes, de = e.onUpload, pe = e.initialFiles, se = e.onConfirmUploaderItem, me = e.handleStorageOverflow, ue = (0, import_react$20.useRef)(""), fe = Me$1({
			initialFiles: pe,
			useEmbedding: !0,
			maxSize: le,
			mimeTypes: re,
			supportTypes: ce,
			onUpload: function(e, o) {
				de?.(e, o);
			},
			onLocalTaskInit: function(e) {
				console.log("tasks", e);
			},
			onSizeLimit: function(e) {
				Snackbar_default.show({
					message: s$7("ux-atom.upload-size-imit", { size: e }),
					type: "error"
				});
			}
		}), ve = fe.selectOnlineDoc, he = fe.uploadLocalDoc, be = fe.onAddLinkSuccess, xe = fe.importLocalFiles, ge = fe.fileTasks, we = fe.fileTaskManager, Le = (b = { onConfirm: function(e) {
			return be(e);
		} }, D = b.onConfirm, F = b.onCancel, P = (0, import_react$20.useRef)((function() {})), E = (0, import_react$20.useRef)((function() {})), A = (0, import_react$20.useState)(""), N = t$9(A, 2), T = N[0], B = N[1], Z = (0, import_react$20.useState)(""), j = t$9(Z, 2), H = j[0], z = j[1], _ = function(e) {
			B(e);
		}, G = (0, import_react$20.useMemo)((function() {
			return import_react$20.createElement("div", { className: "ai-component-mobile-add-link-modal-form" }, import_react$20.createElement(Input_default, {
				className: "ai-component-mobile-add-link-modal-form-input",
				placeholder: s$7("ux-atom.add-link.placeholder"),
				onChange: _,
				errorTip: H,
				autoFocus: !0
			}), import_react$20.createElement("div", { className: "ai-component-mobile-add-link-modal-form-buttons" }, import_react$20.createElement(Button_default, {
				onClick: W,
				className: "ai-component-mobile-uploader-selector-confirm-button"
			}, s$7("ux-atom.cancel")), import_react$20.createElement(Button_default, {
				onClick: Y,
				type: "primary",
				className: "ai-component-mobile-uploader-selector-confirm-button"
			}, s$7("ux-atom.confirm"))));
		}), [
			T,
			H,
			F,
			D
		]), W = function() {
			var e;
			F?.(), null === (e = P.current) || void 0 === e || e.call(P);
		}, Y = function() {
			var e, o;
			/^https?:\/\/([\w-]+\.)+[\w-]+/.test(T) ? (D?.(T), null === (e = P.current) || void 0 === e || e.call(P)) : (z(s$7("ux-atom.add-link.tips-msg")), null === (o = E.current) || void 0 === o || o.call(E, {
				visible: !0,
				content: G
			}));
		}, {
			show: function(e) {
				var o = PullPanel_default.show(R$2(R$2({
					className: "ai-component-mobile-add-link-modal",
					zIndex: 1e4,
					maskClosable: !0,
					onClose: F,
					okText: "",
					title: s$7("ux-atom.uploader-box.link"),
					onOk: Y,
					onCancel: F
				}, e), {}, { content: G })), n = o.close, t = o.update;
				P.current = n, E.current = t;
			},
			close: P.current,
			update: E.current
		}).show;
		(0, import_react$20.useImperativeHandle)(r, (function() {
			return {
				uploadLocalDoc: he,
				selectOnlineDoc: ve
			};
		})), (0, import_react$20.useEffect)((function() {
			we && q(we);
		}), [we, q]), (0, import_react$20.useEffect)((function() {
			X(ge);
		}), [ge]);
		var Ce = function() {
			var e = new TextEncoder(), o = ue.current.slice(0, 120), n = e.encode(ue.current).buffer, t = new Blob([n], { type: "text/plain" });
			he({ files: [new File([t], "".concat(o, ".txt"), {
				type: "text/plain",
				lastModified: Date.now()
			})] }), ue.current = "";
		};
		if (!J || 0 === J.length) return null;
		var Se, ke, ye = [
			{
				id: V$1.Online,
				label: s$7("ux-atom.uploader-box.online-tencent-docs"),
				description: s$7("ux-atom.uploader-box.online-tencent-docs-desc"),
				onClick: (ke = r$9(s$3.mark((function e() {
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: se?.("腾讯文档"), ve(!1);
							case 2:
							case "end": return e.stop();
						}
					}), e);
				}))), function() {
					return ke.apply(this, arguments);
				}),
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.6557 4.375L20.6759 8.10938L18.723 18.8691C18.6451 19.3073 18.2632 19.625 17.8188 19.625H12.3075L13.8586 11.7071L15.9758 11.707L12.6858 8.422L12.2505 10.3241L8.67581 10.331L9.95881 11.707L12.0426 11.7071L10.4934 19.625H4.29309C3.72321 19.625 3.28881 19.1116 3.38892 18.5498L5.7637 5.13083C5.84158 4.69262 6.22346 4.375 6.66785 4.375H16.6557ZM17.5418 18.375L18.5298 12.93L17.3421 12.9571L14.8868 12.957L13.8258 18.375H17.5418ZM4.68881 18.375L6.24881 9.56L9.41483 12.9571L10.5238 12.957L9.46381 18.375H4.68881ZM19.3238 8.559L16.1658 5.625H6.94481L6.33281 9.086L11.2538 9.076L11.9724 5.94321L18.5978 12.558L19.3238 8.559Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: V$1.Local,
				label: s$7("ux-atom.uploader-box.local-file"),
				description: s$7("ux-atom.uploader-box.local-file-desc", { format: O$1.some((function(e) {
					return null == ce ? void 0 : ce.includes(e);
				})) ? "ppt、pptx" : "doc、docx" }),
				onClick: (Se = r$9(s$3.mark((function e() {
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: se?.("本地文件"), he();
							case 2:
							case "end": return e.stop();
						}
					}), e);
				}))), function() {
					return Se.apply(this, arguments);
				}),
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.3823 7.74295C13.6105 7.94382 13.9041 8.05462 14.2082 8.05462H19.4889L19.4889 10.3217L7.85497 10.3217C7.50979 10.3217 7.22997 10.6015 7.22997 10.9467V16.4519C7.22997 17.2278 6.62517 17.8284 5.95093 17.8413L5.95094 17.8421C5.62177 17.7822 5.37232 17.4938 5.3728 17.1474L5.38783 6.35352L11.8036 6.35352L13.3823 7.74295ZM8.08546 17.8535L18.295 17.8535C18.9544 17.8535 19.489 17.3189 19.489 16.6595L19.4889 11.5717L8.47997 11.5717V16.4519C8.47997 16.9611 8.33583 17.4437 8.08546 17.8535ZM20.739 16.2052V16.6595C20.739 18.0093 19.6448 19.1035 18.295 19.1035L6.07797 19.1035C4.9971 19.1035 4.1213 18.2265 4.1228 17.1456L4.1382 6.07974C4.13896 5.54037 4.57642 5.10352 5.11579 5.10352L12.0171 5.10352C12.1836 5.10352 12.3443 5.16418 12.4692 5.27414L14.2082 6.80462H19.7614C20.3013 6.80462 20.7389 7.2423 20.7389 7.7822V10.8768C20.7415 10.8999 20.7429 10.9232 20.7429 10.9467V16.2052H20.739Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: V$1.Url,
				label: s$7("ux-atom.uploader-box.link"),
				description: s$7("ux-atom.uploader-box.link-desc"),
				onClick: function() {
					se?.("网页链接"), Le();
				},
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3etoolbar_add_link%3c/title%3e %3cg id='%e6%8e%a7%e4%bb%b6' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e7%bc%96%e7%bb%84' fill='%23464D5A' fill-rule='nonzero'%3e %3cg id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88'%3e %3cpath d='M12.9827282%2c9.67619386 C13.2460803%2c9.84342437 13.4961285%2c10.0426938 13.7267173%2c10.2732827 C15.4244276%2c11.9709929 15.4244276%2c14.723525 13.7267173%2c16.4212352 L11.4212352%2c18.7267173 C9.72352495%2c20.4244276 6.97099286%2c20.4244276 5.27328265%2c18.7267173 C3.57557245%2c17.0290071 3.57557245%2c14.276475 5.27328265%2c12.5787648 L7.09587091%2c10.7552556 C7.20873369%2c11.1904702 7.41684345%2c11.5873146 7.69662436%2c11.922213 L6.15716613%2c13.4626483 C4.94761129%2c14.6722032 4.94761129%2c16.633279 6.15716613%2c17.8428339 C7.32019963%2c19.0058674 9.17805657%2c19.0505994 10.394538%2c17.97703 L10.5373517%2c17.8428339 L12.8428339%2c15.5373517 C14.0058674%2c14.3743182 14.0505994%2c12.5164612 12.97703%2c11.2999798 L12.8428339%2c11.1571661 L12.7890474%2c11.1072562 C12.9251701%2c10.7646731 13%2c10.3910753 13%2c10 C13%2c9.89059808 12.994144%2c9.78256391 12.9827282%2c9.67619386 Z M18.7267173%2c5.27328265 C20.4244276%2c6.97099286 20.4244276%2c9.72352495 18.7267173%2c11.4212352 L17.1937153%2c12.9536176 C16.9039917%2c12.6431687 16.5491476%2c12.3942797 16.150947%2c12.2287143 L17.8428339%2c10.5373517 C19.0058674%2c9.37431818 19.0505994%2c7.51646124 17.97703%2c6.29997979 L17.8428339%2c6.15716613 C16.6798004%2c4.99413263 14.8219434%2c4.94940057 13.605462%2c6.02296996 L13.4626483%2c6.15716613 L11.1571661%2c8.46264832 C9.94761129%2c9.67220316 9.94761129%2c11.633279 11.1571661%2c12.8428339 C11.5056774%2c13.1913452 11.91658%2c13.4394393 12.35392%2c13.5871161 C12.1594788%2c13.9480465 12.0375095%2c14.3555659 12.0073481%2c14.7883822 C11.3736085%2c14.584716 10.7770134%2c14.2304481 10.2732827%2c13.7267173 C8.57557245%2c12.0290071 8.57557245%2c9.27647505 10.2732827%2c7.57876484 L12.5787648%2c5.27328265 C14.276475%2c3.57557245 17.0290071%2c3.57557245 18.7267173%2c5.27328265 Z'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: V$1.Text,
				label: s$7("ux-atom.uploader-box.text-input"),
				description: s$7("ux-atom.uploader-box.text-input-desc"),
				onClick: function() {
					se?.("输入文本");
					var e = PullPanel_default.show({
						title: s$7("ux-atom.uploader-box.text-input"),
						okText: "",
						style: { zIndex: 1e4 },
						content: import_react$20.createElement(I$4, {
							onChange: function(e) {
								ue.current = e;
							},
							onConfirm: Ce,
							close: function() {
								e?.();
							}
						}),
						className: "".concat(U$2, " ai-component-mobile-uploader-selector-text-panel")
					}).close;
				},
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.83929 5.83929V18.1607H18.1607V5.83929H5.83929ZM5.57143 4.5C4.97969 4.5 4.5 4.9797 4.5 5.57143V18.4286C4.5 19.0203 4.9797 19.5 5.57143 19.5H18.4286C19.0203 19.5 19.5 19.0203 19.5 18.4286V5.57143C19.5 4.97969 19.0203 4.5 18.4286 4.5H5.57143Z' fill='%2381868F'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.7069 16H8.5L11.3966 8H11.3966H12.6034H12.6035L15.5001 16H14.2932L13.6595 14.25H10.3405L9.7069 16ZM10.7931 13H13.207L12 9.66658L10.7931 13Z' fill='%2381868F'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: V$1.BeautifyPPT,
				label: s$7("ux-atom.uploader-box.beautify-ppt"),
				description: s$7("ux-atom.uploader-box.beautify-ppt-desc"),
				tag: s$7("ux-atom.uploader-box.beautify-ppt-tag"),
				onClick: function() {
					var e, o;
					se?.("美化PPT"), xe({
						maxNumber: 1,
						supportTypes: O$1,
						options: {
							style: "Silence",
							mode: f$6.IMPORT
						},
						onAfterInitTasks: (o = r$9(s$3.mark((function e() {
							return s$3.wrap((function(e) {
								for (;;) switch (e.prev = e.next) {
									case 0: Snackbar_default.show({
										message: s$7("ux-atom.uploader-box.beautify-ppt-loading"),
										type: "loading",
										autoClose: !1
									});
									case 1:
									case "end": return e.stop();
								}
							}), e);
						}))), function() {
							return o.apply(this, arguments);
						}),
						onTaskFinish: (e = r$9(s$3.mark((function e(o) {
							var n, t;
							return s$3.wrap((function(e) {
								for (;;) switch (e.prev = e.next) {
									case 0: o.currentTask.fileUrl ? (Snackbar_default.closeAll(!0), openUrl({ url: "".concat(o.currentTask.fileUrl, "?openAiAssistant=").concat(Y$1.Beautify) })) : (t = (null == o || null === (n = o.currentTask) || void 0 === n || null === (n = n.extra) || void 0 === n ? void 0 : n.code) || 0, Object.values(O$3).includes(t) && me?.(t), Snackbar_default.closeAll(!0), Snackbar_default.show({
										message: s$7("ux-atom.uploader-box.beautify-ppt-error"),
										type: "error"
									}));
									case 1:
									case "end": return e.stop();
								}
							}), e);
						}))), function(o) {
							return e.apply(this, arguments);
						})
					});
				},
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.6764 5.77207L15.5668 3.99121L16.4572 5.77207L18.2381 6.6625L16.4572 7.55293L15.5668 9.3338L14.6764 7.55293L12.8955 6.6625L14.6764 5.77207Z' fill='%23454D5A'/%3e%3cpath d='M5.99458 14.6765L6.6624 13.3408L7.33023 14.6765L8.66587 15.3443L7.33023 16.0121L6.6624 17.3478L5.99458 16.0121L4.65894 15.3443L5.99458 14.6765Z' fill='%23454D5A'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.55273 10.3867L10.3861 7.55339L11.27 8.43727L8.43662 11.2706L7.55273 10.3867Z' fill='%23454D5A'/%3e%3cpath d='M6.69405 4.43007L19.662 17.398L17.3978 19.6623L4.42978 6.69434L6.69405 4.43007Z' stroke='%23454D5A' stroke-width='1.25'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5437 9.16376L18.7781 17.3982L17.3978 18.7786L9.16327 10.5441L10.5437 9.16376ZM9.65977 8.27988L6.69405 5.31415L5.31367 6.69453L8.27939 9.66026L9.65977 8.27988ZM6.69405 3.54639L7.57793 4.43027L19.662 16.5144L20.5459 17.3982L19.662 18.2821L18.2816 19.6625L17.3978 20.5464L16.5139 19.6625L4.42978 7.57842L3.5459 6.69453L4.42978 5.81065L5.81016 4.43027L6.69405 3.54639ZM15.5668 3.99141L14.6764 5.77227L12.8955 6.6627L14.6764 7.55313L15.5668 9.33399L16.4572 7.55313L18.2381 6.6627L16.4572 5.77227L15.5668 3.99141ZM6.6624 13.341L5.99458 14.6767L4.65894 15.3445L5.99458 16.0123L6.6624 17.348L7.33023 16.0123L8.66587 15.3445L7.33023 14.6767L6.6624 13.341Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: V$1.Image,
				label: s$7("ux-atom.uploader-box.image"),
				description: s$7("ux-atom.uploader-box.image-desc"),
				onClick: function() {
					se?.("图片转思维导图");
					var e = document.getElementById("ai-component-mobile-img-to-mind-mount-dom");
					if (!e) {
						var o = document.createElement("div");
						o.id = "ai-component-mobile-img-to-mind-mount-dom", o.className = U$2, document.body.appendChild(o), e = o;
					}
					O$4.showImageToMindModal(e, (function() {
						e && e.remove();
					}));
				},
				icon: import_react$20.createElement(m$6, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.75 5.11328C4.19793 5.11354 3.75 5.56115 3.75 6.11328V17.8887L3.75488 17.9912C3.8029 18.4614 4.17726 18.8358 4.64746 18.8838L4.75 18.8887H19.25L19.3525 18.8838C19.8228 18.8359 20.1971 18.4615 20.2451 17.9912L20.25 17.8887V6.11328C20.25 5.561 19.8023 5.11328 19.25 5.11328H4.75ZM9.10156 12.0215C9.37264 11.751 9.81434 11.7597 10.0742 12.041L13.249 15.4805C13.4805 15.7312 13.8606 15.7762 14.1445 15.5869L15.3154 14.8066C15.574 14.6345 15.9165 14.6603 16.1465 14.8691L19 17.4629V17.6387H5V16.123L9.10156 12.0215ZM19 15.7734L16.9873 13.9443C16.3329 13.3496 15.3579 13.2763 14.6221 13.7666L13.8457 14.2832L10.9932 11.1934C10.2516 10.3901 8.98992 10.3648 8.2168 11.1377L5 14.3545V6.36328H19V15.7734ZM14.7773 7.53516C13.7353 7.64088 12.9219 8.5209 12.9219 9.59082L12.9326 9.80176C13.0384 10.8437 13.9185 11.6572 14.9883 11.6572L15.1992 11.6465C16.1718 11.5478 16.9452 10.7743 17.0439 9.80176L17.0547 9.59082C17.0547 8.44977 16.1293 7.52462 14.9883 7.52441L14.7773 7.53516ZM14.9883 8.77441C15.4389 8.77462 15.8047 9.14013 15.8047 9.59082C15.8045 10.0414 15.4388 10.407 14.9883 10.4072C14.5376 10.4072 14.172 10.0415 14.1719 9.59082C14.1719 9.14004 14.5375 8.77448 14.9883 8.77441Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			}
		], Me = null == J ? void 0 : J.map((function(e) {
			return ye.find((function(o) {
				return o.id === e;
			})) || null;
		})).filter((function(e) {
			return null !== e;
		})), De = null != ae ? ae : s$7("ux-atom.uploader-selector.attachment-upload-tips");
		return import_react$20.createElement(Tooltip_default, {
			disabled: !ie,
			title: De
		}, import_react$20.createElement("div", {
			className: "",
			onClick: function() {
				ActionSheet_default.show({ options: Me.map((function(e) {
					return {
						id: e.id,
						title: e.label,
						icon: e.icon,
						description: e.description,
						titleClassName: "ai-component-mobile-uploader-selector-menu-item-title",
						descriptionClassName: "ai-component-mobile-uploader-selector-menu-item-description",
						onClick: e.onClick
					};
				})) });
			}
		}, oe || ("text" === ee ? import_react$20.createElement("div", {
			className: (0, import_classnames$10.default)("ai-component-mobile-uploader-selector-text", Q),
			style: { padding: "0 12px" }
		}, import_react$20.createElement("span", { className: "ai-component-mobile-uploader-selector-label" }, s$7("ux-atom.uploader-selector.attachment-upload-tips"))) : import_react$20.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.7002 4.54C13.4202 2.82 16.2202 2.82 17.9402 4.54C19.6102 6.2 19.6602 8.87 18.1002 10.59L17.9402 10.76L12.3202 16.35C11.3102 17.35 9.68019 17.35 8.67019 16.35C7.70019 15.39 7.66019 13.85 8.54019 12.84L8.67019 12.71L14.2902 7.12C14.5802 6.83 15.0602 6.83 15.3502 7.12C15.6202 7.39 15.6402 7.8 15.4202 8.1L15.3502 8.18L9.73019 13.77C9.31019 14.19 9.31019 14.87 9.73019 15.29C10.1202 15.68 10.7402 15.71 11.1702 15.37L11.2602 15.29L16.8802 9.7C18.0202 8.57 18.0202 6.74 16.8802 5.6C15.7902 4.51 14.0402 4.47 12.9002 5.47L12.7602 5.6L7.14019 11.19C5.29019 13.03 5.29019 16.02 7.14019 17.87C8.94019 19.66 11.8202 19.71 13.6802 18.03L13.8502 17.87L19.4702 12.28C19.7602 11.99 20.2402 11.99 20.5302 12.28C20.8002 12.55 20.8202 12.96 20.6002 13.26L20.5302 13.34L14.9102 18.93C12.4702 21.36 8.52019 21.36 6.08019 18.93C3.70019 16.56 3.64019 12.75 5.90019 10.31L6.08019 10.12L11.7002 4.53V4.54Z' fill='%23464D5A'/%3e%3c/svg%3e",
			className: (0, import_classnames$10.default)("ai-component-mobile-uploader-selector-icon", Q, { "ai-component-mobile-uploader-selector-icon-disable": !!ne })
		}))));
	}));
	e$12(".ai-component-mobile-option-selector {\n  margin-bottom: 12px;\n  position: relative;\n  z-index: 2;\n}\n.ai-component-mobile-option-selector-header {\n  display: flex;\n  align-items: center;\n  margin: 6px 0 9px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-weight: 500;\n}\n.ai-component-mobile-option-selector-icon {\n  width: 20px;\n  height: 20px;\n  margin-right: 4px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-mobile-option-selector-title {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-weight: 400;\n}\n.ai-component-mobile-option-selector-options {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 12px;\n  overflow-x: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.ai-component-mobile-option-selector-options::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-mobile-option-selector-option {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  background-color: var(--tsp-fill-weak, #334d660f);\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  cursor: pointer;\n  transition: all 0.2s ease;\n  user-select: none;\n  white-space: nowrap;\n}\n.ai-component-mobile-option-selector-option-medium {\n  padding: 7px 11px;\n  font-size: 14px;\n}\n.ai-component-mobile-option-selector-option-selected {\n  border-color: var(--accent-default, #1e6fff);\n  background: var(--feedback-accent, #1e6fff14);\n}\n");
	G$2 = "ai-component-mobile-option-selector";
	W = function(t) {
		var l = t.item, r = t.value, c = t.disabled, d = void 0 !== c && c, p = t.onChange, s = t.className, m = t.optionSize, u = void 0 === m ? "medium" : m, f = t.allowClear, v = void 0 === f || f, x = t$9((0, import_react$20.useState)(r || ""), 2), g = x[0], w = x[1];
		(0, import_react$20.useEffect)((function() {
			w(r || "");
		}), [r]);
		return import_react$20.createElement("div", { className: (0, import_classnames$10.default)(G$2, s, e$14({}, "".concat(G$2, "-disabled"), d)) }, ((null == l ? void 0 : l.label) || (null == l ? void 0 : l.icon)) && import_react$20.createElement("div", { className: "".concat(G$2, "-header") }, (null == l ? void 0 : l.icon) && import_react$20.createElement(m$6, {
			src: l.icon,
			className: "".concat(G$2, "-icon"),
			size: 20
		}), (null == l ? void 0 : l.label) && import_react$20.createElement("span", { className: "".concat(G$2, "-title") }, l.label)), import_react$20.createElement("div", { className: "".concat(G$2, "-options") }, l.options.map((function(o) {
			return import_react$20.createElement("div", {
				key: o.value,
				className: (0, import_classnames$10.default)("".concat(G$2, "-option"), e$14(e$14({}, "".concat(G$2, "-option-selected"), g === o.value), "".concat(G$2, "-option-").concat(u), !0)),
				onClick: function() {
					return function(e) {
						if (!d) {
							if (e === g && v) return w(""), void (null == p || p("", l.key));
							w(e), p?.(e, l.key);
						}
					}(o.value);
				}
			}, o.label);
		}))));
	};
})), e$8;
var init_icon_modal_close_24_e8c49860 = __esmMin((() => {
	require_react();
	e$8 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_2340_1149)'%3e%3cg filter='url(%23filter0_b_2340_1149)'%3e%3ccircle cx='12' cy='12' r='12' fill='%23334D66' fill-opacity='0.06'/%3e%3c/g%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.28298 7.22703L7.22232 8.28769L10.9346 12L7.22232 15.7123L8.28298 16.773L11.9953 13.0607L15.7076 16.773L16.7683 15.7123L13.056 12L16.7683 8.28769L15.7076 7.22703L11.9953 10.9393L8.28298 7.22703Z' fill='black' fill-opacity='0.48'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_b_2340_1149' x='-24' y='-24' width='72' height='72' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeGaussianBlur in='BackgroundImageFix' stdDeviation='12'/%3e%3cfeComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_2340_1149'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_2340_1149' result='shape'/%3e%3c/filter%3e%3cclipPath id='clip0_2340_1149'%3e%3crect width='24' height='24' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/template-input-box/index.js
var import_react$18, import_classnames$9, s$2, b$2;
var init_template_input_box = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_index_c2e6551b();
	init_esm$2();
	init_icon_modal_close_24_e8c49860();
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_purify_es();
	e$12(".ai-component-mobile-template-input-box {\n  --input-border-radius: 16px;\n  border-radius: var(--input-border-radius);\n  background: var(--bg-lv2-default, #fff);\n  min-height: 26px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  height: 100%;\n  transition: all linear 0.3s;\n  box-shadow: 0px 8px 16px 1px rgba(0, 0, 0, 0.04);\n}\n.ai-component-mobile-template-input-box-border {\n  --input-border-radius: 16px;\n  border-radius: var(--input-border-radius);\n  background: var(--bg-lv2-default, #fff);\n  padding: 0;\n  min-height: 26px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n  border: 0.5px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  box-sizing: border-box;\n}\n.ai-component-mobile-template-input-box-header {\n  padding: 12px 16px 0;\n}\n.ai-component-mobile-template-input-box-textarea {\n  flex: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 12px 16px 0px;\n  position: relative;\n}\n.ai-component-mobile-template-input-box-textarea-clearable {\n  padding-right: 40px;\n}\n.ai-component-mobile-template-input-box-textarea .ai-component-mobile-template-input {\n  height: 100%;\n}\n.ai-component-mobile-template-input-box-textarea .ai-component-mobile-template-input-box-clear-button {\n  display: inline-block;\n  position: absolute;\n  right: 16px;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  z-index: 5;\n}\n.ai-component-mobile-template-input-box-footer {\n  flex: 0;\n  padding: 12px 16px;\n}\n.ai-component-mobile-template-input-box-file-list,\n.ai-component-mobile-template-input-box-textarea,\n.ai-component-mobile-template-input-box-footer {\n  z-index: 2;\n}\n.ai-component-mobile-template-input-box-file-list {\n  margin-bottom: 8px;\n}\n.ai-component-mobile-template-input-box-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 32px;\n}\n.ai-component-mobile-template-input-box-footer-actions {\n  flex: 1;\n  width: 100%;\n  max-width: calc(100% - 40px);\n}\n.ai-component-mobile-template-input-box-footer-actions-without-send {\n  max-width: 100%;\n}\n.ai-component-mobile-template-input-box-footer-right-send-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.__DARK__ .invert-on-dark {\n  filter: invert(1) hue-rotate(180deg);\n}\n");
	s$2 = "ai-component-mobile-template-input-box";
	b$2 = (0, import_react$18.forwardRef)((function(o, d) {
		var b = o.canSend, f = o.showSend, x = void 0 === f || f, v = o.customSendElement, h = o.customHeader, g = o.customFooter, w = o.className, C = o.placeholder, y = o.allowEmptyBr, k = o.domId, E = o.showClearButton, L = o.inputActive, N = o.onBlur, j = o.onSend, _ = o.onFocus, B = o.onClick, S = o.onEnter, z = o.onOutsideClick, A = o.onValueChange, O = o.onChange, T = o.handleClearBtnClick, D = (0, import_react$18.useRef)(null), I = t$9((0, import_react$18.useState)(!1), 2), P = I[0], M = I[1];
		(0, import_react$18.useImperativeHandle)(d, (function() {
			return {
				setContent: function(e, n) {
					var t;
					return null === (t = D.current) || void 0 === t ? void 0 : t.setContent(e, n);
				},
				focus: function() {
					var e;
					return null === (e = D.current) || void 0 === e ? void 0 : e.focus();
				},
				blur: function() {
					var e;
					return null === (e = D.current) || void 0 === e ? void 0 : e.blur();
				},
				getCurrentSelectOption: function() {
					var e;
					return null === (e = D.current) || void 0 === e ? void 0 : e.getCurrentSelectOption();
				}
			};
		}));
		return import_react$18.createElement(a$12, {
			onOutsideClick: function() {
				z?.();
			},
			excludeSelectors: [
				".dui-dropdown-content",
				"#Drive-Selector-Panel",
				".ai-component-mobile-add-link-modal",
				".dui-menu-submenu-wrapper"
			]
		}, import_react$18.createElement("div", { className: (0, import_classnames$9.default)("".concat(s$2, "-border"), w) }, import_react$18.createElement("div", {
			className: (0, import_classnames$9.default)(s$2),
			onClick: function() {
				B?.();
			},
			id: k
		}, h ? import_react$18.createElement("div", { className: "".concat(s$2, "-header") }, h) : null, import_react$18.createElement("div", { className: (0, import_classnames$9.default)("".concat(s$2, "-textarea"), E && P ? "".concat(s$2, "-textarea-clearable") : void 0) }, import_react$18.createElement(m$1, {
			onFocus: function() {
				_?.();
			},
			onBlur: function() {
				N?.();
			},
			ref: D,
			onInput: function(e, n) {
				M(!!e), O?.(e), A?.(n);
			},
			placeholder: C,
			allowEmptyBr: y,
			onEnter: S
		}), E && P ? import_react$18.createElement(m$6, {
			src: e$8,
			size: 24,
			className: "".concat(s$2, "-clear-button"),
			onClick: function(e) {
				var n;
				e.stopPropagation(), e.preventDefault(), null === (n = D.current) || void 0 === n || n.setContent({ value: "" }, L), T?.();
			}
		}) : null), import_react$18.createElement("div", { className: "".concat(s$2, "-footer") }, import_react$18.createElement("div", { className: (0, import_classnames$9.default)("".concat(s$2, "-footer-actions"), e$14({}, "".concat(s$2, "-footer-actions-without-send"), !x)) }, g), x ? v ? import_react$18.cloneElement(v, { onClick: j }) : import_react$18.createElement("div", { className: "".concat(s$2, "-footer-right-send-icon") }, import_react$18.createElement(m$6, {
			className: "invert-on-dark",
			src: b ? "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='16' cy='16' r='16' fill='black' fill-opacity='0.88' style='fill:black%3bfill-opacity:0.88%3b'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z' fill='white' style='fill:white%3bfill-opacity:1%3b'/%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.4'%3e%3ccircle cx='16' cy='16' r='16' fill='black' fill-opacity='0.88' style='fill:black%3bfill-opacity:0.88%3b'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z' fill='white' style='fill:white%3bfill-opacity:1%3b'/%3e%3c/g%3e%3c/svg%3e",
			displayType: "background",
			onClick: b ? j : void 0,
			size: 32
		})) : null))));
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/suggestions/index.js
var import_react$17, t;
var init_suggestions = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-suggestions {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 14px;\n  line-height: 1.75;\n}\n.ai-component-mobile-suggestions .ai-suggestion-item {\n  width: fit-content;\n  max-width: 100%;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  line-height: 16px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  border-radius: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  cursor: pointer;\n  user-select: none;\n}\n.ai-component-mobile-suggestions .ai-suggestion-item:hover {\n  background-color: var(--feedback-active, rgba(6, 15, 26, 0.1));\n}\n");
	t = function(i) {
		var t = i.questions, o = i.noTitle, r = void 0 !== o && o;
		if (0 === t.length) return null;
		return import_react$17.createElement("div", { className: "ai-component-mobile-suggestions" }, r ? null : import_react$17.createElement("div", null, s$7("message.recommend-questions-tips")), t.map((function(e, i) {
			return function(e, i) {
				return import_react$17.createElement("div", {
					className: "ai-suggestion-item",
					key: i,
					onClick: function() {
						var n;
						return null === (n = e.onClick) || void 0 === n ? void 0 : n.call(e, e.text);
					}
				}, e.text);
			}(e, i);
		})));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/toConsumableArray-d8de034d.js
function e$7(e) {
	return function(t) {
		if (Array.isArray(t)) return r$11(t);
	}(e) || function(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}(e) || t$10(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_toConsumableArray_d8de034d = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/search-share-panel/index.js
function E$3(e) {
	return E$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, E$3(e);
}
function P$2() {
	return P$2 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
		}
		return e;
	}, P$2.apply(null, arguments);
}
function A$1(e, t, r) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != E$3(e) || !e) return e;
			var r = e[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(e, t || "default");
				if ("object" != E$3(n)) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == E$3(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
function I$3(e) {
	return I$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, I$3(e);
}
function M$1() {
	return M$1 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
		}
		return e;
	}, M$1.apply(null, arguments);
}
function N$1(e, t, r) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != I$3(e) || !e) return e;
			var r = e[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(e, t || "default");
				if ("object" != I$3(n)) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == I$3(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
function D$1(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function F$3(e, r) {
	for (var n = 0; n < r.length; n++) {
		var o = r[n];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, r$13(o.key), o);
	}
}
function R$1(e, t, r) {
	return t && F$3(e.prototype, t), r && F$3(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function be(e) {
	var t = -1, r = e ? e.length : 0;
	for (this.clear(); ++t < r;) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
function ye(e) {
	var t = -1, r = e ? e.length : 0;
	for (this.clear(); ++t < r;) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
function me(e) {
	var t = -1, r = e ? e.length : 0;
	for (this.clear(); ++t < r;) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
function ve(e, t) {
	for (var r, n, o = e.length; o--;) if ((r = e[o][0]) === (n = t) || r != r && n != n) return o;
	return -1;
}
function ge(e, t) {
	var n;
	t = function(e, t) {
		if (Oe(e)) return !1;
		var n = t$12(e);
		if ("number" == n || "symbol" == n || "boolean" == n || null == e || Ee(e)) return !0;
		return W$2.test(e) || !U$1.test(e) || null != t && e in Object(t);
	}(t, e) ? [t] : Oe(n = t) ? n : Ce(n);
	for (var o = 0, i = t.length; null != e && o < i;) e = e[ke(t[o++])];
	return o && o == i ? e : void 0;
}
function _e(e) {
	if (!Se(e) || (t = e, oe && oe in t)) return !1;
	var t;
	return (function(e) {
		var t = Se(e) ? ce.call(e) : "";
		return t == V || t == Y;
	}(e) || function(e) {
		var t = !1;
		if (null != e && "function" != typeof e.toString) try {
			t = !!(e + "");
		} catch (e) {}
		return t;
	}(e) ? se : G$1).test(function(e) {
		if (null != e) {
			try {
				return ie.call(e);
			} catch (e) {}
			try {
				return e + "";
			} catch (e) {}
		}
		return "";
	}(e));
}
function we(e, t) {
	var n, o, i = e.__data__;
	return ("string" == (o = t$12(n = t)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? i["string" == typeof t ? "string" : "hash"] : i.map;
}
function xe(e, t) {
	var r = function(e, t) {
		return null == e ? void 0 : e[t];
	}(e, t);
	return _e(r) ? r : void 0;
}
function ke(e) {
	if ("string" == typeof e || Ee(e)) return e;
	var t = e + "";
	return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
}
function je(e, t) {
	if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
	var r = function() {
		var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
		if (i.has(o)) return i.get(o);
		var a = e.apply(this, n);
		return r.cache = i.set(o, a), a;
	};
	return r.cache = new (je.Cache || me)(), r;
}
function Se(e) {
	var t = t$12(e);
	return !!e && ("object" == t || "function" == t);
}
function Ee(e) {
	return "symbol" == t$12(e) || function(e) {
		return !!e && "object" == t$12(e);
	}(e) && "[object Symbol]" == ce.call(e);
}
function Re() {
	return Fe + "application_ai_chat@2x-44dc34175b.png";
}
function Be(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
	function r() {
		this.constructor = e;
	}
	$e(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Ye(e, t) {
	var r = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
	if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
		var o = 0;
		for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
	}
	return r;
}
function Ue(e, t, n, o) {
	var i, a = arguments.length, c = a < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
	if ("object" === ("undefined" == typeof Reflect ? "undefined" : t$12(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, o);
	else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (c = (a < 3 ? i(c) : a > 3 ? i(t, n, c) : i(t, n)) || c);
	return a > 3 && c && Object.defineProperty(t, n, c), c;
}
function We(e, t) {
	return function(r, n) {
		t(r, n, e);
	};
}
function Ze(e, t, n, o, i, a) {
	function c(e) {
		if (void 0 !== e && "function" != typeof e) throw new TypeError("Function expected");
		return e;
	}
	for (var s, u = o.kind, l = "getter" === u ? "get" : "setter" === u ? "set" : "value", f = !t && e ? o.static ? e : e.prototype : null, d = t || (f ? Object.getOwnPropertyDescriptor(f, o.name) : {}), p = !1, h = n.length - 1; h >= 0; h--) {
		var b = {};
		for (var y in o) b[y] = "access" === y ? {} : o[y];
		for (var y in o.access) b.access[y] = o.access[y];
		b.addInitializer = function(e) {
			if (p) throw new TypeError("Cannot add initializers after decoration has completed");
			a.push(c(e || null));
		};
		var m = (0, n[h])("accessor" === u ? {
			get: d.get,
			set: d.set
		} : d[l], b);
		if ("accessor" === u) {
			if (void 0 === m) continue;
			if (null === m || "object" !== t$12(m)) throw new TypeError("Object expected");
			(s = c(m.get)) && (d.get = s), (s = c(m.set)) && (d.set = s), (s = c(m.init)) && i.unshift(s);
		} else (s = c(m)) && ("field" === u ? i.unshift(s) : d[l] = s);
	}
	f && Object.defineProperty(f, o.name, d), p = !0;
}
function Xe(e, t, r) {
	for (var n = arguments.length > 2, o = 0; o < t.length; o++) r = n ? t[o].call(e, r) : t[o].call(e);
	return n ? r : void 0;
}
function qe(e) {
	return "symbol" === t$12(e) ? e : "".concat(e);
}
function Ge(e, t, n) {
	return "symbol" === t$12(t) && (t = t.description ? "[".concat(t.description, "]") : ""), Object.defineProperty(e, "name", {
		configurable: !0,
		value: n ? "".concat(n, " ", t) : t
	});
}
function He(e, t) {
	if ("object" === ("undefined" == typeof Reflect ? "undefined" : t$12(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
}
function Ke(e, t, r, n) {
	return new (r || (r = Promise))((function(o, i) {
		function a(e) {
			try {
				s(n.next(e));
			} catch (e) {
				i(e);
			}
		}
		function c(e) {
			try {
				s(n.throw(e));
			} catch (e) {
				i(e);
			}
		}
		function s(e) {
			var t;
			e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
				e(t);
			}))).then(a, c);
		}
		s((n = n.apply(e, t || [])).next());
	}));
}
function Qe(e, t) {
	var r, n, o, i = {
		label: 0,
		sent: function() {
			if (1 & o[0]) throw o[1];
			return o[1];
		},
		trys: [],
		ops: []
	}, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
	return a.next = c(0), a.throw = c(1), a.return = c(2), "function" == typeof Symbol && (a[Symbol.iterator] = function() {
		return this;
	}), a;
	function c(c) {
		return function(s) {
			return function(c) {
				if (r) throw new TypeError("Generator is already executing.");
				for (; a && (a = 0, c[0] && (i = 0)), i;) try {
					if (r = 1, n && (o = 2 & c[0] ? n.return : c[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, c[1])).done) return o;
					switch (n = 0, o && (c = [2 & c[0], o.value]), c[0]) {
						case 0:
						case 1:
							o = c;
							break;
						case 4: return i.label++, {
							value: c[1],
							done: !1
						};
						case 5:
							i.label++, n = c[1], c = [0];
							continue;
						case 7:
							c = i.ops.pop(), i.trys.pop();
							continue;
						default:
							if (!(o = i.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
								i = 0;
								continue;
							}
							if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
								i.label = c[1];
								break;
							}
							if (6 === c[0] && i.label < o[1]) {
								i.label = o[1], o = c;
								break;
							}
							if (o && i.label < o[2]) {
								i.label = o[2], i.ops.push(c);
								break;
							}
							o[2] && i.ops.pop(), i.trys.pop();
							continue;
					}
					c = t.call(e, i);
				} catch (e) {
					c = [6, e], n = 0;
				} finally {
					r = o = 0;
				}
				if (5 & c[0]) throw c[1];
				return {
					value: c[0] ? c[1] : void 0,
					done: !0
				};
			}([c, s]);
		};
	}
}
function et(e, t) {
	for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || Je(t, e, r);
}
function tt(e) {
	var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
	if (r) return r.call(e);
	if (e && "number" == typeof e.length) return { next: function() {
		return e && n >= e.length && (e = void 0), {
			value: e && e[n++],
			done: !e
		};
	} };
	throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function rt(e, t) {
	var r = "function" == typeof Symbol && e[Symbol.iterator];
	if (!r) return e;
	var n, o, i = r.call(e), a = [];
	try {
		for (; (void 0 === t || t-- > 0) && !(n = i.next()).done;) a.push(n.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			n && !n.done && (r = i.return) && r.call(i);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function nt() {
	for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(rt(arguments[t]));
	return e;
}
function ot() {
	for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
	var n = Array(e), o = 0;
	for (t = 0; t < r; t++) for (var i = arguments[t], a = 0, c = i.length; a < c; a++, o++) n[o] = i[a];
	return n;
}
function it(e, t, r) {
	if (r || 2 === arguments.length) for (var n, o = 0, i = t.length; o < i; o++) !n && o in t || (n || (n = Array.prototype.slice.call(t, 0, o)), n[o] = t[o]);
	return e.concat(n || Array.prototype.slice.call(t));
}
function at(e) {
	return this instanceof at ? (this.v = e, this) : new at(e);
}
function ct(e, t, r) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var n, o = r.apply(e, t || []), i = [];
	return n = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", (function(e) {
		return function(t) {
			return Promise.resolve(t).then(e, u);
		};
	})), n[Symbol.asyncIterator] = function() {
		return this;
	}, n;
	function a(e, t) {
		o[e] && (n[e] = function(t) {
			return new Promise((function(r, n) {
				i.push([
					e,
					t,
					r,
					n
				]) > 1 || c(e, t);
			}));
		}, t && (n[e] = t(n[e])));
	}
	function c(e, t) {
		try {
			(r = o[e](t)).value instanceof at ? Promise.resolve(r.value.v).then(s, u) : l(i[0][2], r);
		} catch (e) {
			l(i[0][3], e);
		}
		var r;
	}
	function s(e) {
		c("next", e);
	}
	function u(e) {
		c("throw", e);
	}
	function l(e, t) {
		e(t), i.shift(), i.length && c(i[0][0], i[0][1]);
	}
}
function st(e) {
	var t = {}, r;
	return n("next"), n("throw", (function(e) {
		throw e;
	})), n("return"), t[Symbol.iterator] = function() {
		return this;
	}, t;
	function n(n, o) {
		t[n] = e[n] ? function(t) {
			return (r = !r) ? {
				value: at(e[n](t)),
				done: !1
			} : o ? o(t) : t;
		} : o;
	}
}
function ut(e) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var t, r = e[Symbol.asyncIterator];
	return r ? r.call(e) : (e = tt(e), t = {}, n("next"), n("throw"), n("return"), t[Symbol.asyncIterator] = function() {
		return this;
	}, t);
	function n(r) {
		t[r] = e[r] && function(t) {
			return new Promise((function(n, o) {
				(function(e, t, r, n) {
					Promise.resolve(n).then((function(t) {
						e({
							value: t,
							done: r
						});
					}), t);
				})(n, o, (t = e[r](t)).done, t.value);
			}));
		};
	}
}
function lt(e, t) {
	return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
}
function pt(e) {
	if (e && e.__esModule) return e;
	var t = {};
	if (null != e) for (var r = dt(e), n = 0; n < r.length; n++) "default" !== r[n] && Je(t, e, r[n]);
	return ft(t, e), t;
}
function ht(e) {
	return e && e.__esModule ? e : { default: e };
}
function bt(e, t, r, n) {
	if ("a" === r && !n) throw new TypeError("Private accessor was defined without a getter");
	if ("function" == typeof t ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e);
}
function yt(e, t, r, n, o) {
	if ("m" === n) throw new TypeError("Private method is not writable");
	if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
	if ("function" == typeof t ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return "a" === n ? o.call(e, r) : o ? o.value = r : t.set(e, r), r;
}
function mt(e, t) {
	if (null === t || "object" !== t$12(t) && "function" != typeof t) throw new TypeError("Cannot use 'in' operator on non-object");
	return "function" == typeof e ? t === e : e.has(t);
}
function vt(e, t, n) {
	if (null != t) {
		if ("object" !== t$12(t) && "function" != typeof t) throw new TypeError("Object expected.");
		var o, i;
		if (n) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			o = t[Symbol.asyncDispose];
		}
		if (void 0 === o) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			o = t[Symbol.dispose], n && (i = o);
		}
		if ("function" != typeof o) throw new TypeError("Object not disposable.");
		i && (o = function() {
			try {
				i.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		}), e.stack.push({
			value: t,
			dispose: o,
			async: n
		});
	} else n && e.stack.push({ async: !0 });
	return t;
}
function _t(e) {
	function t(t) {
		e.error = e.hasError ? new gt(t, e.error, "An error was suppressed during disposal.") : t, e.hasError = !0;
	}
	var r, n = 0;
	return function o() {
		for (; r = e.stack.pop();) try {
			if (!r.async && 1 === n) return n = 0, e.stack.push(r), Promise.resolve().then(o);
			if (r.dispose) {
				var i = r.dispose.call(r.value);
				if (r.async) return n |= 2, Promise.resolve(i).then(o, (function(e) {
					return t(e), o();
				}));
			} else n |= 1;
		} catch (e) {
			t(e);
		}
		if (1 === n) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
		if (e.hasError) throw e.error;
	}();
}
function wt(e, t) {
	return "string" == typeof e && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, (function(e, r, n, o, i) {
		return r ? t ? ".jsx" : ".js" : !n || o && i ? n + o + "." + i.toLowerCase() + "js" : e;
	})) : e;
}
function Tt() {
	return xt || (xt = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.default = "0.106.9"), At;
}
function It() {
	return kt || (kt = 1, function(e) {
		Object.defineProperty(e, "__esModule", { value: !0 }), e.h = e.isScopedAttributeDisabled = void 0;
		var t = Ot, n = import_react$16.default, i = t.__importDefault(function() {
			if (Ct) return Pt;
			Ct = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
			return Pt.default = "data-duim-" + Ot.__importDefault(Tt()).default.replace(/\./g, "-"), Pt;
		}());
		e.isScopedAttributeDisabled = function() {
			var e, t;
			"object" === ("undefined" == typeof window ? "undefined" : t$12(window)) && (e = window.__dui_disable_scoped_attribute__);
			"object" === t$12(n$9) && (t = n$9.__dui_disable_scoped_attribute__);
			return Boolean(e || t);
		}(), e.h = function(r, o) {
			for (var a = [], c = 2; c < arguments.length; c++) a[c - 2] = arguments[c];
			var s = o;
			return null != o && o.className && "string" == typeof r && !e.isScopedAttributeDisabled && (s[i.default] = o.className), n.createElement.apply(void 0, t.__spreadArrays([r, s], a));
		};
	}(Et)), Et;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
function tr() {
	if (Vt) return Bt;
	Vt = 1;
	return Bt = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}
function or() {
	if (Kt) return Nt.exports;
	if (Kt = 1, false);
	else Nt.exports = function() {
		if (Ht) return Gt;
		Ht = 1;
		var e = tr();
		function t() {}
		function r() {}
		return r.resetWarningCache = t, Gt = function() {
			function n(t, r, n, o, i, a) {
				if (a !== e) {
					var c = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
					throw c.name = "Invariant Violation", c;
				}
			}
			function o() {
				return n;
			}
			n.isRequired = n;
			var i = {
				array: n,
				bigint: n,
				bool: n,
				func: n,
				number: n,
				object: n,
				string: n,
				symbol: n,
				any: n,
				arrayOf: o,
				element: n,
				elementType: n,
				instanceOf: o,
				node: n,
				objectOf: o,
				oneOf: o,
				oneOfType: o,
				shape: o,
				exact: o,
				checkPropTypes: r,
				resetWarningCache: t
			};
			return i.PropTypes = i, i;
		};
	}()();
	return Nt.exports;
}
function hr() {
	if (sr) return pr;
	sr = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.shallowEqual = pr.isBrowser = pr.wrapWithConfigDefaults = pr.inject = pr.assert = pr.createStringParamFunc = pr.canBeDivided = pr.roundByStep = pr.castInto = pr.trueFn = pr.falseFn = pr.emptyFn = void 0;
	var e = Ot;
	return pr.emptyFn = function() {}, pr.falseFn = function() {
		return !1;
	}, pr.trueFn = function() {
		return !0;
	}, pr.castInto = function(e, t) {
		return e > t[1] ? t[1] : e < t[0] ? t[0] : e;
	}, pr.roundByStep = function e(t, r) {
		if (t < 0) return -e(-t, r);
		var n = t % r;
		return n < r / 2 ? t - n : t - n + r;
	}, pr.canBeDivided = function(e, t) {
		var r = e / t;
		return (r | 0) === r;
	}, pr.createStringParamFunc = function(e) {
		return function() {
			for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
			var n = t.map((function(e) {
				return Number(e);
			}));
			return e.apply(void 0, n);
		};
	}, pr.assert = function(e, t) {
		if (!e) throw new Error(t);
	}, pr.inject = function(e, t) {
		var r = function() {
			for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
			var o = e.apply(null, r);
			return !1 !== o && t(), o;
		};
		return r.__dui_injected_fn__ = !0, r;
	}, pr.wrapWithConfigDefaults = function(t) {
		var r = {}, n = function(n) {
			return t(e.__assign(e.__assign({}, r), n));
		};
		return n.configDefaults = function(e) {
			r = e;
		}, n;
	}, pr.isBrowser = "undefined" != typeof window && "undefined" != typeof document, pr.shallowEqual = function(e, t) {
		if (e === t) return !0;
		if (t$12(e) !== t$12(t)) return !1;
		if ("object" !== t$12(e) || null === e || "object" !== t$12(t) || null === t) return !1;
		var n = Object.keys(e), o = Object.keys(t);
		return n.length === o.length && n.every((function(r) {
			return e[r] === t[r];
		}));
	}, pr;
}
function br() {
	if (ur) return dr;
	ur = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.injectStyle = void 0;
	var e = Ot.__importDefault(Tt()), t = It(), r = hr(), i = new (function() {
		function e() {
			var e = r.isBrowser ? window : n$9;
			e.__duim_style_registry__ = e.__duim_style_registry__ || {}, this.registry = e.__duim_style_registry__;
		}
		return Object.defineProperty(e.prototype, "length", {
			get: function() {
				return Object.keys(this.registry).length;
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.set = function(e, t) {
			this.registry[e] = t;
		}, e.prototype.get = function(e) {
			return this.registry[e];
		}, e.prototype.add = function(e, t) {
			this.registry[e] || (this.registry[e] = []), this.registry[e].push(t);
		}, e;
	}())();
	dr.injectStyle = function(n, o) {
		var s = e.default + "-" + n;
		if (Array.isArray(i.get(s))) return i.add(s, "1"), void function(e) {
			if (!r.isBrowser || !i.length || !Array.isArray(i.get(e))) return;
			var t = i.get(e).length;
			setTimeout((function() {
				i.get(e).length > t || console.warn("[DUI-MOBILE] " + e + " 重复引入了 " + t + " 次");
			}), a);
		}(s);
		i.set(s, ["1"]);
		var u = c(n);
		u.length > 1 && function(e, t) {
			if (!r.isBrowser) return;
			setTimeout((function() {
				c(e).length > t.length || console.warn("[DUI-MOBILE] " + e + " 存在多个版本:  " + t.join("  "));
			}), a);
		}(n, u);
		var l = t.isScopedAttributeDisabled ? n : s;
		if (r.isBrowser) (f = document.createElement("style")).setAttribute("type", "text/css"), f.setAttribute("data-duim-key", l), f.innerText = o, document.head.appendChild(f);
		else if ("function" == typeof injectContentBeforeRoot) {
			var f = "<style type=\"text/css\" data-duim-key=\"" + l + "\">" + o + "</style>";
			injectContentBeforeRoot(f);
		}
	};
	var a = 3e3;
	function c(e) {
		return i.length ? Object.getOwnPropertyNames(i.registry).filter((function(t) {
			return -1 !== t.indexOf(e);
		})).map((function(e) {
			return e.split("-")[0];
		})) : [];
	}
	return dr;
}
function yr() {
	if (lr) return ar;
	lr = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.createThemedClassNames = ar.consumeTheme = void 0;
	var e = Ot, t = It().h, r = e.__importStar(import_react$16.default), n = e.__importDefault(import_classnames$8.default);
	ir || (ir = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), "function" != typeof String.prototype.padStart && (String.prototype.padStart = function(e, t) {
		return e |= 0, t = String(void 0 !== t ? t : " "), this.length > e ? String(this) : ((e -= this.length) > t.length && (t += t.repeat(e / t.length)), t.slice(0, e) + String(this));
	})), br().injectStyle("common/global.css", "[data-duim-0-106-9]{-webkit-tap-highlight-color:transparent}");
	var o = r.createContext(null);
	function i(e) {
		return function() {
			for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
			return function(e, t) {
				if (!t || !e) return t;
				var r = t.split(/\s+/);
				return r.concat.apply(r, r.map((function(t) {
					return e[t];
				})).filter((function(e) {
					return e;
				}))).join(" ");
			}(e, n.default.apply(void 0, t));
		};
	}
	return ar.consumeTheme = function(e) {
		return t(o.Consumer, null, (function(t) {
			return e(i(t));
		}));
	}, ar.createThemedClassNames = i, ar.default = o, ar;
}
function tn() {
	if (Ar) return Pr;
	Ar = 1;
	var e = function() {
		if (Er) return Sr;
		Er = 1;
		return Sr = "object" == t$12(n$9) && n$9 && n$9.Object === Object && n$9;
	}(), t = "object" == ("undefined" == typeof self ? "undefined" : t$12(self)) && self && self.Object === Object && self;
	return Pr = e || t || Function("return this")();
}
function rn() {
	if (Ir) return Tr;
	Ir = 1;
	return Tr = tn().Symbol;
}
function nn() {
	if (Rr) return Fr;
	Rr = 1;
	var e = rn(), t = function() {
		if (Nr) return Mr;
		Nr = 1;
		var e = rn(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, o = e ? e.toStringTag : void 0;
		return Mr = function(e) {
			var t = r.call(e, o), i = e[o];
			try {
				e[o] = void 0;
				var a = !0;
			} catch (e) {}
			var c = n.call(e);
			return a && (t ? e[o] = i : delete e[o]), c;
		};
	}(), r = function() {
		if (Dr) return Lr;
		Dr = 1;
		var e = Object.prototype.toString;
		return Lr = function(t) {
			return e.call(t);
		};
	}(), n = e ? e.toStringTag : void 0;
	return Fr = function(e) {
		return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : n && n in Object(e) ? t(e) : r(e);
	};
}
function on() {
	if ($r) return zr;
	return $r = 1, zr = function(e) {
		return null != e && "object" == t$12(e);
	};
}
function an() {
	if (Ur) return Yr;
	Ur = 1;
	var e = function() {
		if (Vr) return Br;
		Vr = 1;
		var e = nn(), t = on();
		return Br = function(r) {
			return t(r) && "[object Arguments]" == e(r);
		};
	}(), t = on(), r = Object.prototype, n = r.hasOwnProperty, o = r.propertyIsEnumerable;
	return Yr = e(function() {
		return arguments;
	}()) ? e : function(e) {
		return t(e) && n.call(e, "callee") && !o.call(e, "callee");
	};
}
function cn() {
	if (qr) return Xr;
	qr = 1;
	var e = rn(), t = an(), r = function() {
		if (Zr) return Wr;
		Zr = 1;
		return Wr = Array.isArray;
	}(), n = e ? e.isConcatSpreadable : void 0;
	return Xr = function(e) {
		return r(e) || t(e) || !!(n && e && e[n]);
	};
}
function sn() {
	if (Hr) return Gr;
	Hr = 1;
	var e = Or ? jr : (Or = 1, jr = function(e, t) {
		for (var r = -1, n = t.length, o = e.length; ++r < n;) e[o + r] = t[r];
		return e;
	}), t = cn();
	return Gr = function r(n, o, i, a, c) {
		var s = -1, u = n.length;
		for (i || (i = t), c || (c = []); ++s < u;) {
			var l = n[s];
			o > 0 && i(l) ? o > 1 ? r(l, o - 1, i, a, c) : e(c, l) : a || (c[c.length] = l);
		}
		return c;
	}, Gr;
}
function un() {
	if (Qr) return Kr;
	Qr = 1;
	var e = sn();
	return Kr = function(t) {
		return (null == t ? 0 : t.length) ? e(t, 1) : [];
	};
}
function ln() {
	return Jr || (Jr = 1, function(e) {
		Object.defineProperty(e, "__esModule", { value: !0 }), e.showWithTransition = e.ShowCloseContext = void 0;
		var t = Ot, n = It().h, o = t.__importStar(import_react$16.default), i = t.__importDefault(import_react_dom$1.default), a = hr(), c = t.__importDefault(un());
		e.ShowCloseContext = o.createContext(a.emptyFn), e.showWithTransition = function(o) {
			var s, u = o.Component, l = o.transitionDuration, f = o.autoClose, d = o.props, p = o.forcedProps, h = o.injectClosePropNames, b = void 0 === h ? [] : h, y = o.deepInjectClosePaths, m = void 0 === y ? [] : y, v = o.contexts, g = void 0 === v ? [] : v, _ = document.createElement("div");
			document.body.appendChild(_);
			var w = !1;
			k(d);
			var x = t.__assign(t.__assign(t.__assign({}, d), p), { visible: !0 });
			function C(e, t) {
				var r = e[t] || a.emptyFn;
				r.__dui_injected_fn__ || (e[t] = a.inject(r, j));
			}
			function k(e) {
				b.forEach((function(t) {
					C(e, t);
				})), m.forEach((function(t) {
					for (var n = t.split("."), o = n.pop(), i = [e], a = function(e) {
						var t = c.default(i.map((function(t) {
							return t[e];
						})).filter((function(e) {
							return e;
						})));
						if (!t.length) return { value: void 0 };
						i = t;
					}, s = 0, u = n; s < u.length; s++) {
						var l = a(u[s]);
						if ("object" === t$12(l)) return l.value;
					}
					i.forEach((function(e) {
						C(e, o);
					}));
				}));
			}
			function j() {
				w || (w = !0, clearTimeout(s), S(x = t.__assign(t.__assign({}, x), { visible: !1 })), setTimeout((function() {
					i.default.unmountComponentAtNode(_), _.remove();
				}), l + 20));
			}
			var O = [{
				provider: e.ShowCloseContext.Provider,
				value: j
			}].concat(g);
			function S(e) {
				i.default.render(function(e, t) {
					return e.reduce((function(e, t) {
						var r = t.provider, o = t.value;
						return n(r, { value: o }, e);
					}), t);
				}(O, n(u, t.__assign({}, e))), _);
			}
			return S(x), f && (s = setTimeout(j, d.duration || 2e3)), {
				update: function(e) {
					w || (k(x = t.__assign(t.__assign(t.__assign(t.__assign({}, x), e), p), { visible: !0 })), S(x));
				},
				close: j
			};
		};
	}(en)), en;
}
function pn() {
	if (fn) return dn;
	fn = 1, Object.defineProperty(dn, "__esModule", { value: !0 }), dn.PreventScrollPenetrateContainer = dn.preventSelfScrollPenetrate = void 0;
	var e = Ot, t = It().h, r = e.__importStar(import_react$16.default);
	function n(e, t) {
		return e && e !== t && t.contains(e) ? e.scrollHeight > e.clientHeight ? e : n(e.parentNode, t) : t;
	}
	function o(e) {
		var t = e.container, r = e.direction, o = void 0 === r ? "y" : r, i = e.stopPropagationBorder, a = void 0 === i ? null : i, c = e.touchStartEvent;
		if (t && !t.__preventSelfScrollPenetrate) {
			var s, u, l, f = null, d = function(e) {
				f = null;
				var r = e.touches[0];
				s = r.screenX, u = r.screenY, l = n(e.target, t);
			};
			t.addEventListener("touchstart", d), t.addEventListener("touchmove", (function(e) {
				var r = e.touches[0], n = r.screenX - s, i = r.screenY - u;
				if ((Math.abs(n) > Math.abs(i) ? "x" : "y") === o) {
					var c = "x" === o && 0 === l.scrollLeft, d = "x" === o && l.scrollLeft === l.scrollWidth - l.offsetWidth, p = "y" === o && 0 === l.scrollTop, h = "y" === o && l.scrollTop === l.scrollHeight - l.offsetHeight, b = c || p ? "lower" : d || h ? "upper" : null;
					("x" === o ? n > 0 && c || n < 0 && d : i > 0 && p || i < 0 && h) ? (e.cancelable && e.preventDefault(), f !== b && (t.dispatchEvent(new TouchEvent("touchstart", e)), f = b), a === b && e.stopPropagation()) : e.stopPropagation();
				}
			}), { passive: !1 }), c && t.contains(c.target) && d(c), t.__preventSelfScrollPenetrate = !0;
		}
	}
	dn.preventSelfScrollPenetrate = o;
	return dn.PreventScrollPenetrateContainer = function(n) {
		function i() {
			var e = null !== n && n.apply(this, arguments) || this;
			return e.domRef = r.createRef(), e.isInnerScroll = !1, e.startScreenX = -1, e.startScreenY = -1, e.handleTouchStart = function(t) {
				var r = e.domRef.current;
				if (r) {
					var n = t.composedPath(), i = t.touches[0];
					e.startScreenX = i.screenX, e.startScreenY = i.screenY;
					for (var a = 0, c = n; a < c.length; a++) {
						var s = c[a];
						if (!r.contains(s)) return void (e.isInnerScroll = !1);
						if (s.scrollHeight > s.clientHeight) return e.isInnerScroll = !0, void o({
							container: s,
							touchStartEvent: t
						});
					}
					e.isInnerScroll = !1;
				}
			}, e.handleTouchMove = function(t) {
				if (!e.isInnerScroll) {
					var r, n, o, i, a = t.touches[0];
					if (!("stylus" === a.touchType && (r = e.startScreenX, n = e.startScreenY, o = a.screenX, i = a.screenY, Math.sqrt(Math.pow(r - o, 2) + Math.pow(n - i, 2)) < 10))) t.cancelable && t.preventDefault();
				}
			}, e;
		}
		return e.__extends(i, n), i.prototype.componentDidMount = function() {
			if (!this.props.disabled) {
				var e = this.domRef.current;
				e.addEventListener("touchstart", this.handleTouchStart), e.addEventListener("touchmove", this.handleTouchMove, { passive: !1 });
			}
		}, i.prototype.render = function() {
			var r = this.props;
			r.disabled;
			var n = r.children, o = e.__rest(r, ["disabled", "children"]);
			return t("div", e.__assign({}, o, { ref: this.domRef }), n);
		}, i;
	}(r.Component), dn;
}
function yn() {
	if (hn) return bn;
	function e() {
		var e = document.body;
		return e.__dui_visible_snackbars__ = e.__dui_visible_snackbars__ || [], e.__dui_visible_snackbars__;
	}
	return hn = 1, Object.defineProperty(bn, "__esModule", { value: !0 }), bn.hasVisibleInstances = bn.closeById = bn.closeAll = bn.updateVisibleSnackbars = void 0, bn.updateVisibleSnackbars = function(t) {
		var r = t.props.visible, n = function(t) {
			return e().findIndex((function(e) {
				return e.instance === t;
			}));
		}(t), o = e();
		if (r && -1 === n) (function(t) {
			var r = e(), n = t.props.id;
			if (n) {
				var o = r.findIndex((function(e) {
					return e.instance.props.id === n;
				}));
				if (o >= 0) return r[o];
			}
			var i = r.findIndex((function(e) {
				return e.instance.props.autoClose;
			}));
			return i >= 0 ? r[i] : null;
		})(t)?.instance.handleClose(), o.push({ instance: t });
		r || -1 === n || o.splice(n, 1);
	}, bn.closeAll = function(e) {
		document.body.__dui_visible_snackbars__?.filter((function(t) {
			var r = t.instance.props, n = r.autoClose, o = r.closable;
			return e || n || o;
		})).forEach((function(e) {
			return e.instance.handleClose();
		}));
	}, bn.closeById = function(e) {
		document.body.__dui_visible_snackbars__?.filter((function(t) {
			return t.instance.props.id === e;
		})).forEach((function(e) {
			return e.instance.handleClose();
		}));
	}, bn.hasVisibleInstances = function() {
		var e;
		return Boolean(null === (e = document.body.__dui_visible_snackbars__) || void 0 === e ? void 0 : e.length);
	}, bn;
}
function xn() {
	if (vn) return _n;
	vn = 1, Object.defineProperty(_n, "__esModule", { value: !0 }), _n.Button = void 0;
	var e = Ot.__importDefault(function() {
		if (mn) return wn;
		mn = 1, Object.defineProperty(wn, "__esModule", { value: !0 });
		var e = Ot, t = It().h, r = e.__importStar(import_react$16.default), n = yr(), o = function(r) {
			function o() {
				var n = null !== r && r.apply(this, arguments) || this;
				return n.themedRender = function(r) {
					var o, i = n.props, a = i.prefixCls, c = i.className, s = i.style, u = i.type, l = i.size, f = i.disabled, d = i.testId, p = e.__rest(i, [
						"prefixCls",
						"className",
						"style",
						"type",
						"size",
						"disabled",
						"testId"
					]), h = r(a, c, ((o = {})[a + "-type-" + u] = u, o[a + "-size-" + l] = l, o[a + "-disabled"] = f, o));
					return t("button", e.__assign({}, p, {
						className: h,
						style: s,
						disabled: f,
						"data-testid": d
					}), n.props.children);
				}, n;
			}
			return e.__extends(o, r), o.prototype.render = function() {
				return n.consumeTheme(this.themedRender);
			}, o;
		}(r.Component);
		return wn.default = o, o.defaultProps = {
			prefixCls: "dui-m-button",
			type: "default",
			size: "default"
		}, wn;
	}());
	return _n.Button = e.default, br().injectStyle("components/Button/style/index.css", "[data-duim-0-106-9~=\"dui-m-button\"]{outline:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:4px;font-size:14px;font-weight:500;border:1px solid transparent}[data-duim-0-106-9~=\"dui-m-button\"]:disabled{color:var(--text-weak,rgba(0,0,0,.24));background:var(--tsp-fill-weak,rgba(51,77,102,.06));border-color:transparent;pointer-events:none}[data-duim-0-106-9~=\"dui-m-button-type-default\"]{background:var(--bg-lv4-default,#fff);color:var(--text-link,#175ceb)}[data-duim-0-106-9~=\"dui-m-button-type-default\"]:active{background:var(--bg-lv4-medium,#f3f5f7)}[data-duim-0-106-9~=\"dui-m-button-type-plain\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-duim-0-106-9~=\"dui-m-button-type-plain\"]:active{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-duim-0-106-9~=\"dui-m-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-duim-0-106-9~=\"dui-m-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-duim-0-106-9~=\"dui-m-button-type-warning\"]{background:var(--critical-default,#ff4747);color:var(--text-white,#fff)}[data-duim-0-106-9~=\"dui-m-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-duim-0-106-9~=\"dui-m-button-type-hollow\"]{background:#fff;color:var(--accent-default,#1e6fff);border-color:var(--accent-default,#1e6fff)}[data-duim-0-106-9~=\"dui-m-button-type-hollow\"]:active{opacity:.5}[data-duim-0-106-9~=\"dui-m-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-duim-0-106-9~=\"dui-m-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-duim-0-106-9~=\"dui-m-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-duim-0-106-9~=\"dui-m-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-duim-0-106-9~=\"dui-m-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:var(--bg-lv4-default,#fff)}[data-duim-0-106-9~=\"dui-m-button-type-golden-outline\"]:active{opacity:.5}[data-duim-0-106-9~=\"dui-m-button-size-large\"]{min-width:160px;height:44px;padding:0 30px;font-size:17px}[data-duim-0-106-9~=\"dui-m-button-size-small\"]{min-width:52px;height:28px;padding:0 8px;font-size:12px}[data-duim-0-106-9~=\"dui-m-button-size-default\"]{height:32px;padding:0 7px;min-width:56px}"), _n.default = e.default, _n;
}
function Cn() {
	return gn || (gn = 1, function(e) {
		Object.defineProperty(e, "__esModule", { value: !0 }), e.isActionArray = e.SNACKBAR_TRANSITION_DURATION = void 0;
		var t = Ot, n = It().h, o = t.__importStar(import_react$16.default), i = t.__importDefault(import_react_dom$1.default), a = hr(), c = (gr || (gr = 1, Object.defineProperty(xr, "__esModule", { value: !0 }), xr.decideKeepDom = void 0, xr.decideKeepDom = function(e, t) {
			var r = this, n = !t && this._ALC_HELPER_prevVisible;
			return this._ALC_HELPER_prevVisible = t, !!t || !!n && (setTimeout((function() {
				r.forceUpdate();
			}), e), !0);
		}), xr), s = t.__importDefault(function() {
			if (Cr) return kr;
			Cr = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
			var e = Ot, t = It().h, r = e.__importStar(import_react$16.default), n = e.__importStar(or());
			br().injectStyle("components/Loading/style/spin.css", "[data-duim-0-106-9~=\"dui-m-spin\"]{position:relative;width:100%;height:100%}[data-duim-0-106-9~=\"dui-m-spin-container\"]{position:absolute;left:50%;top:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:48px;height:48px}[data-duim-0-106-9~=\"dui-m-spin-circle\"]{border-radius:50%;width:100%;height:100%;-webkit-animation:dui-m-spin-rotate .8s linear infinite;animation:dui-m-spin-rotate .8s linear infinite;-webkit-box-sizing:border-box;box-sizing:border-box}[data-duim-0-106-9~=\"dui-m-spin-circle-light\"]{border:4px solid hsla(0,0%,100%,.4);border-top-color:#fff}[data-duim-0-106-9~=\"dui-m-spin-circle-dark\"]{border:4px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.32)}[data-duim-0-106-9~=\"dui-m-spin-circle-primary\"]{border:4px solid rgba(30,111,255,.24);border-top:4px solid var(--accent-default,#1e6fff)}@-webkit-keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
			var o = yr(), i = function(n) {
				function i() {
					var e = null !== n && n.apply(this, arguments) || this;
					return e.rootRef = r.createRef(), e.themedRender = function(r) {
						var n = e.props, o = n.prefixCls, i = n.className, a = n.style, c = n.type, s = n.circleClassName, u = n.circleStyle, l = r(o, i), f = r(o + "-circle", o + "-circle-" + c, s);
						return t("div", {
							className: l,
							style: a,
							ref: e.rootRef
						}, t("div", {
							className: r(o + "-container"),
							style: e.calcContainerTransform()
						}, t("div", {
							className: f,
							style: u
						})));
					}, e;
				}
				return e.__extends(i, n), i.prototype.calcContainerTransform = function() {
					var e = this.rootRef.current;
					if (e) {
						var t = e.clientWidth, r = e.clientHeight;
						return { transform: "translate(-50%,-50%) scale(" + Math.min(t, r) / 48 + ")" };
					}
				}, i.prototype.componentDidMount = function() {
					this.forceUpdate();
				}, i.prototype.render = function() {
					return o.consumeTheme(this.themedRender);
				}, i;
			}(r.PureComponent);
			return kr.default = i, i.defaultProps = {
				prefixCls: "dui-m-spin",
				type: "dark"
			}, i.propTypes = {
				prefixCls: n.string,
				style: n.object,
				className: n.string,
				type: n.oneOf([
					"light",
					"dark",
					"primary"
				]),
				circleClassName: n.string,
				circleStyle: n.object
			}, kr;
		}()), u = yr(), f = ln(), p = pn(), h = yn(), b = t.__importDefault(xn());
		function y(e) {
			return Array.isArray(e) && e.length > 0 && e[0].text;
		}
		e.SNACKBAR_TRANSITION_DURATION = 200, e.isActionArray = y;
		var m = function(a) {
			function l() {
				var r = null !== a && a.apply(this, arguments) || this;
				return r.prevTouchScreenY = 0, r.handleTouchStart = function(e) {
					var t = r.getValidTouch(e);
					t && (r.prevTouchScreenY = t.screenY);
				}, r.handleTouchMove = function(e) {
					var t = r.getValidTouch(e);
					if (t) return r.prevTouchScreenY - t.screenY > 8 ? r.context() : void (r.prevTouchScreenY = t.screenY);
				}, r.handleClickAction = function() {
					r.props.onClickAction(), r.handleClose();
				}, r.handleClickClose = function() {
					r.props.onClickClose(), r.handleClose();
				}, r.handleClose = function() {
					r.props.onClose();
				}, r.themedRender = function(o) {
					var a, s = r.props, u = s.prefixCls, l = s.className, f = s.style, d = s.children, h = s.message, b = s.placement, y = s.visible, m = s.type, v = s.zIndex, g = s.testId, _ = s.closable, w = o(u, l, u + "-" + b, u + "-" + m, ((a = {})[u + "-hidden"] = !y, a[u + "-override-icon"] = r.renderUserSetIcon(o), a)), x = o(u + "-message");
					return c.decideKeepDom.call(r, e.SNACKBAR_TRANSITION_DURATION, y) ? i.default.createPortal(n(p.PreventScrollPenetrateContainer, {
						className: w,
						style: t.__assign({ zIndex: v }, f),
						onTouchStart: r.handleTouchStart,
						onTouchMove: r.handleTouchMove,
						"data-testid": g
					}, r.renderIcon(o), n("span", { className: x }, d || h), r.renderAction(o), _ && n("div", {
						className: o(u + "-close"),
						onClick: r.handleClickClose
					})), document.body) : null;
				}, r;
			}
			return t.__extends(l, a), l.prototype.componentDidMount = function() {
				h.updateVisibleSnackbars(this);
			}, l.prototype.componentDidUpdate = function() {
				h.updateVisibleSnackbars(this);
			}, l.prototype.getValidTouch = function(e) {
				var t = this.props, r = t.autoClose;
				return t.visible && r ? e.touches.item(0) : null;
			}, l.prototype.render = function() {
				return u.consumeTheme(this.themedRender);
			}, l.prototype.renderAction = function(e) {
				var t = this, r = this.props, o = r.prefixCls, i = r.action;
				return i ? y(i) ? n("span", { className: e(o + "-actions") }, i.map((function(r, i) {
					return n(b.default, {
						key: i,
						className: e(o + "-action"),
						onClick: function() {
							var e;
							null === (e = r.onClick) || void 0 === e || e.call(r), t.handleClose();
						}
					}, r.text);
				}))) : n(b.default, {
					className: e(o + "-action"),
					onClick: this.handleClickAction
				}, i) : null;
			}, l.prototype.renderUserSetIcon = function(e) {
				var t = this.props, i = t.prefixCls, a = t.type, c = t.icon;
				return c ? o.isValidElement(c) ? n("div", { className: e(i + "-icon-container") }, c) : "object" === t$12(c) && c[a] ? n("div", { className: e(i + "-icon-container") }, c[a]) : null : null;
			}, l.prototype.renderIcon = function(e) {
				var t = this.props, r = t.prefixCls, o = t.spinType, i = t.type;
				return this.renderUserSetIcon(e) || ("loading" === i ? n(s.default, {
					type: o,
					className: e(r + "-loading-indicator"),
					circleClassName: e(r + "-loading-indicator-circle")
				}) : null);
			}, l.contextType = f.ShowCloseContext, l;
		}(o.Component);
		e.default = m, m.defaultProps = {
			prefixCls: "dui-m-snackbar",
			placement: "top",
			onClickAction: a.emptyFn,
			type: "info",
			spinType: "primary",
			closable: !1,
			onClose: a.emptyFn,
			onClickClose: a.emptyFn
		};
	}(wr)), wr;
}
function In(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), r.push.apply(r, n);
	}
	return r;
}
function Mn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = null != arguments[t] ? arguments[t] : {};
		t % 2 ? In(Object(r), !0).forEach((function(t) {
			e$14(e, t, r[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : In(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
var import_react$15, import_react$16, import_react_dom$1, import_classnames$8, import_dayjs_min, S$2, T$1, L$3, z$1, $$1, B$2, V, Y, U$1, W$2, Z$1, X$1, q$2, G$1, H$1, K$1, Q$1, J$1, ee, te, re, ne, oe, ie, ae, ce, se, ue, le, fe, de, pe, he, Ce, Oe, Pe, Ae, Te, Ie, Me, Ne, Le, De, Fe, ze, $e, Ve, Je, ft, dt, gt, xt, Ct, kt, Ot, St, Et, Pt, At, Nt, Bt, Vt, Gt, Ht, Kt, ir, ar, cr, sr, ur, lr, fr, dr, pr, mr, vr, gr, _r, wr, xr, Cr, kr, jr, Or, Sr, Er, Pr, Ar, Tr, Ir, Mr, Nr, Lr, Dr, Fr, Rr, zr, $r, Br, Vr, Yr, Ur, Wr, Zr, Xr, qr, Gr, Hr, Kr, Qr, Jr, en, fn, dn, hn, bn, mn, vn, gn, _n, wn, kn, jn, On, Sn, En, Pn, An, Tn, Nn, Ln, Dn;
var init_search_share_panel = __esmMin((() => {
	init_extends_559f37d0();
	init_defineProperty_28d1b327();
	init_index_9822dcca();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_esm$7();
	init_index_33302b4d();
	init_esm$4();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_es();
	init_lodash();
	init_toConsumableArray_d8de034d();
	init_esm$1();
	init_style_inject_es_3984fa0f();
	T$1 = function(e) {
		return import_react$15.createElement("svg", P$2({
			width: 32,
			height: 32,
			viewBox: "0 0 32 32",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$15.createElement("g", {
			clipPath: "url(#paint0_angular_75918_153039_clip_path)",
			"data-figma-skip-parse": "true"
		}, import_react$15.createElement("g", { transform: "matrix(0.009 -0.01425 0.0138064 0.00871982 18.25 13.7502)" }, import_react$15.createElement("foreignObject", {
			x: -1100.61,
			y: -1100.61,
			width: 2201.22,
			height: 2201.22
		}, import_react$15.createElement("div", {
			xmlns: "http://www.w3.org/1999/xhtml",
			style: {
				background: "conic-gradient(from 90deg,rgba(0, 202, 246, 0.7831) 0deg,rgba(0, 202, 246, 0) 102.446deg,rgba(1, 234, 182, 0) 142.329deg,rgba(1, 234, 182, 1) 191.636deg,rgba(0, 202, 246, 1) 331.622deg,rgba(0, 202, 246, 0.7831) 360deg)",
				height: "100%",
				width: "100%",
				opacity: 1
			}
		})))), import_react$15.createElement("path", {
			d: "M14.0185 27.633C12.7083 27.633 11.4482 27.3285 10.3016 26.7193C8.0001 25.4963 6.46176 23.2079 5.96848 20.2769C5.49193 17.4451 6.05567 14.3314 7.5546 11.5115C9.05353 8.69155 11.3192 6.48317 13.9337 5.29358C16.639 4.06219 19.3968 4.0586 21.6971 5.28163C23.9987 6.50467 25.537 8.79308 26.0303 11.7241C26.5068 14.5559 25.9431 17.6696 24.4442 20.4895C22.9452 23.3094 20.6795 25.5178 18.065 26.7074C16.7082 27.3249 15.3371 27.6342 14.0185 27.6342V27.633ZM17.9778 6.39956C16.9447 6.39956 15.859 6.6468 14.7746 7.14007C12.565 8.14573 10.6385 10.0364 9.34735 12.4634C8.05743 14.8903 7.56774 17.5454 7.97144 19.9389C8.35722 22.2333 9.52411 24.0045 11.2548 24.9254C12.9866 25.8463 15.1066 25.8224 17.2242 24.8585C19.4338 23.8529 21.3603 21.9622 22.6514 19.5352C23.9413 17.1083 24.431 14.4532 24.0273 12.0597C23.6415 9.7641 22.4746 7.99404 20.744 7.07319C19.8996 6.6241 18.962 6.39956 17.9778 6.39956Z",
			"data-figma-gradient-fill": "{\"type\":\"GRADIENT_ANGULAR\",\"stops\":[{\"color\":{\"r\":0.0,\"g\":0.79215687513351440,\"b\":0.96470588445663452,\"a\":0.0},\"position\":0.28457152843475342},{\"color\":{\"r\":0.0039215688593685627,\"g\":0.91764706373214722,\"b\":0.71372550725936890,\"a\":0.0},\"position\":0.39535894989967346},{\"color\":{\"r\":0.0039215688593685627,\"g\":0.91764706373214722,\"b\":0.71372550725936890,\"a\":1.0},\"position\":0.53232300281524658},{\"color\":{\"r\":0.0,\"g\":0.79215687513351440,\"b\":0.96470588445663452,\"a\":1.0},\"position\":0.92117291688919067}],\"stopsVar\":[{\"color\":{\"r\":0.0,\"g\":0.79215687513351440,\"b\":0.96470588445663452,\"a\":0.0},\"position\":0.28457152843475342},{\"color\":{\"r\":0.0039215688593685627,\"g\":0.91764706373214722,\"b\":0.71372550725936890,\"a\":0.0},\"position\":0.39535894989967346},{\"color\":{\"r\":0.0039215688593685627,\"g\":0.91764706373214722,\"b\":0.71372550725936890,\"a\":1.0},\"position\":0.53232300281524658},{\"color\":{\"r\":0.0,\"g\":0.79215687513351440,\"b\":0.96470588445663452,\"a\":1.0},\"position\":0.92117291688919067}],\"transform\":{\"m00\":18.0,\"m01\":27.612758636474609,\"m02\":-4.5564093589782715,\"m10\":-28.50,\"m11\":17.439634323120117,\"m12\":19.280427932739258},\"opacity\":1.0,\"blendMode\":\"NORMAL\",\"visible\":true}",
			style: {}
		}), import_react$15.createElement("path", {
			d: "M22.2488 23.6943C23.1908 23.6943 23.9544 22.9307 23.9544 21.9888C23.9544 21.0468 23.1908 20.2832 22.2488 20.2832C21.3069 20.2832 20.5433 21.0468 20.5433 21.9888C20.5433 22.9307 21.3069 23.6943 22.2488 23.6943Z",
			fill: "#00EEDE",
			style: A$1(A$1({ fill: "#00EEDE" }, "fill", "color(display-p3 0.0000 0.9333 0.8706)"), "fillOpacity", 1)
		}), import_react$15.createElement("path", {
			d: "M16 30.25C8.14226 30.25 1.75 23.8577 1.75 16C1.75 8.14226 8.14226 1.75 16 1.75C23.8577 1.75 30.25 8.14226 30.25 16C30.25 23.8577 23.8577 30.25 16 30.25ZM16 4.0193C9.39395 4.0193 4.0193 9.39395 4.0193 16C4.0193 22.606 9.39395 27.9807 16 27.9807C22.606 27.9807 27.9807 22.606 27.9807 16C27.9807 9.39395 22.606 4.0193 16 4.0193Z",
			fill: "url(#paint1_linear_75918_153039)",
			style: {}
		}), import_react$15.createElement("defs", null, S$2 || (S$2 = import_react$15.createElement("clipPath", { id: "paint0_angular_75918_153039_clip_path" }, import_react$15.createElement("path", { d: "M14.0185 27.633C12.7083 27.633 11.4482 27.3285 10.3016 26.7193C8.0001 25.4963 6.46176 23.2079 5.96848 20.2769C5.49193 17.4451 6.05567 14.3314 7.5546 11.5115C9.05353 8.69155 11.3192 6.48317 13.9337 5.29358C16.639 4.06219 19.3968 4.0586 21.6971 5.28163C23.9987 6.50467 25.537 8.79308 26.0303 11.7241C26.5068 14.5559 25.9431 17.6696 24.4442 20.4895C22.9452 23.3094 20.6795 25.5178 18.065 26.7074C16.7082 27.3249 15.3371 27.6342 14.0185 27.6342V27.633ZM17.9778 6.39956C16.9447 6.39956 15.859 6.6468 14.7746 7.14007C12.565 8.14573 10.6385 10.0364 9.34735 12.4634C8.05743 14.8903 7.56774 17.5454 7.97144 19.9389C8.35722 22.2333 9.52411 24.0045 11.2548 24.9254C12.9866 25.8463 15.1066 25.8224 17.2242 24.8585C19.4338 23.8529 21.3603 21.9622 22.6514 19.5352C23.9413 17.1083 24.431 14.4532 24.0273 12.0597C23.6415 9.7641 22.4746 7.99404 20.744 7.07319C19.8996 6.6241 18.962 6.39956 17.9778 6.39956Z" }))), import_react$15.createElement("linearGradient", {
			id: "paint1_linear_75918_153039",
			x1: 8.87679,
			y1: 28.3378,
			x2: 23.1232,
			y2: 3.66099,
			gradientUnits: "userSpaceOnUse"
		}, import_react$15.createElement("stop", {
			stopColor: "#00E9A6",
			style: A$1(A$1({ stopColor: "#00E9A6" }, "stopColor", "color(display-p3 0.0000 0.9137 0.6510)"), "stopOpacity", 1)
		}), import_react$15.createElement("stop", {
			offset: .5,
			stopColor: "#00EEDE",
			style: A$1(A$1({ stopColor: "#00EEDE" }, "stopColor", "color(display-p3 0.0000 0.9333 0.8706)"), "stopOpacity", 1)
		}), import_react$15.createElement("stop", {
			offset: 1,
			stopColor: "#00CAF6",
			style: A$1(A$1({ stopColor: "#00CAF6" }, "stopColor", "color(display-p3 0.0000 0.7922 0.9647)"), "stopOpacity", 1)
		}))));
	};
	L$3 = function(e) {
		return import_react$15.createElement("svg", M$1({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$15.createElement("path", {
			d: "M12.5 2.5L3.5 12L12.5 21.5",
			stroke: "#454D5A",
			style: N$1(N$1({ stroke: "#454D5A" }, "stroke", "color(display-p3 0.2706 0.3020 0.3529)"), "strokeOpacity", 1),
			strokeWidth: 1.5,
			strokeLinejoin: "round"
		}));
	};
	z$1 = { exports: {} };
	(function(e, t) {
		var n = "__lodash_hash_undefined__", i = 9007199254740991, a = "[object Arguments]", c = "[object Function]", s = "[object Object]", u = /^\[object .+?Constructor\]$/, l = /^(?:0|[1-9]\d*)$/, f = {};
		f["[object Float32Array]"] = f["[object Float64Array]"] = f["[object Int8Array]"] = f["[object Int16Array]"] = f["[object Int32Array]"] = f["[object Uint8Array]"] = f["[object Uint8ClampedArray]"] = f["[object Uint16Array]"] = f["[object Uint32Array]"] = !0, f[a] = f["[object Array]"] = f["[object ArrayBuffer]"] = f["[object Boolean]"] = f["[object DataView]"] = f["[object Date]"] = f["[object Error]"] = f[c] = f["[object Map]"] = f["[object Number]"] = f[s] = f["[object RegExp]"] = f["[object Set]"] = f["[object String]"] = f["[object WeakMap]"] = !1;
		var d = "object" == t$12(n$9) && n$9 && n$9.Object === Object && n$9, p = "object" == ("undefined" == typeof self ? "undefined" : t$12(self)) && self && self.Object === Object && self, h = d || p || Function("return this")(), b = t && !t.nodeType && t, y = b && e && !e.nodeType && e, m = y && y.exports === b, v = m && d.process, g = function() {
			try {
				return y && y.require && y.require("util").types || v && v.binding && v.binding("util");
			} catch (e) {}
		}(), _ = g && g.isTypedArray;
		var w, x, C, k = Array.prototype, j = Function.prototype, O = Object.prototype, S = h["__core-js_shared__"], E = j.toString, P = O.hasOwnProperty, A = (w = /[^.]+$/.exec(S && S.keys && S.keys.IE_PROTO || "")) ? "Symbol(src)_1." + w : "", T = O.toString, I = E.call(Object), M = RegExp("^" + E.call(P).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), N = m ? h.Buffer : void 0, L = h.Symbol, D = h.Uint8Array, F = N ? N.allocUnsafe : void 0, R = (x = Object.getPrototypeOf, C = Object, function(e) {
			return x(C(e));
		}), z = Object.create, $ = O.propertyIsEnumerable, B = k.splice, V = L ? L.toStringTag : void 0, Y = function() {
			try {
				var e = be(Object, "defineProperty");
				return e({}, "", {}), e;
			} catch (e) {}
		}(), U = N ? N.isBuffer : void 0, W = Math.max, Z = Date.now, X = be(h, "Map"), q = be(Object, "create"), G = function() {
			function e() {}
			return function(t) {
				if (!Se(t)) return {};
				if (z) return z(t);
				e.prototype = t;
				var r = new e();
				return e.prototype = void 0, r;
			};
		}();
		function H(e) {
			var t = -1, r = null == e ? 0 : e.length;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function K(e) {
			var t = -1, r = null == e ? 0 : e.length;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function Q(e) {
			var t = -1, r = null == e ? 0 : e.length;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function J(e) {
			var t = this.__data__ = new K(e);
			this.size = t.size;
		}
		function ee(e, t) {
			var r = xe(e), n = !r && we(e), o = !r && !n && ke(e), i = !r && !n && !o && Pe(e), a = r || n || o || i, c = a ? function(e, t) {
				for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
				return n;
			}(e.length, String) : [], s = c.length;
			for (var u in e) !t && !P.call(e, u) || a && ("length" == u || o && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || ye(u, s)) || c.push(u);
			return c;
		}
		function te(e, t, r) {
			(void 0 !== r && !_e(e[t], r) || void 0 === r && !(t in e)) && oe(e, t, r);
		}
		function re(e, t, r) {
			var n = e[t];
			P.call(e, t) && _e(n, r) && (void 0 !== r || t in e) || oe(e, t, r);
		}
		function ne(e, t) {
			for (var r = e.length; r--;) if (_e(e[r][0], t)) return r;
			return -1;
		}
		function oe(e, t, r) {
			"__proto__" == t && Y ? Y(e, t, {
				configurable: !0,
				enumerable: !0,
				value: r,
				writable: !0
			}) : e[t] = r;
		}
		H.prototype.clear = function() {
			this.__data__ = q ? q(null) : {}, this.size = 0;
		}, H.prototype.delete = function(e) {
			var t = this.has(e) && delete this.__data__[e];
			return this.size -= t ? 1 : 0, t;
		}, H.prototype.get = function(e) {
			var t = this.__data__;
			if (q) {
				var r = t[e];
				return r === n ? void 0 : r;
			}
			return P.call(t, e) ? t[e] : void 0;
		}, H.prototype.has = function(e) {
			var t = this.__data__;
			return q ? void 0 !== t[e] : P.call(t, e);
		}, H.prototype.set = function(e, t) {
			var r = this.__data__;
			return this.size += this.has(e) ? 0 : 1, r[e] = q && void 0 === t ? n : t, this;
		}, K.prototype.clear = function() {
			this.__data__ = [], this.size = 0;
		}, K.prototype.delete = function(e) {
			var t = this.__data__, r = ne(t, e);
			return !(r < 0) && (r == t.length - 1 ? t.pop() : B.call(t, r, 1), --this.size, !0);
		}, K.prototype.get = function(e) {
			var t = this.__data__, r = ne(t, e);
			return r < 0 ? void 0 : t[r][1];
		}, K.prototype.has = function(e) {
			return ne(this.__data__, e) > -1;
		}, K.prototype.set = function(e, t) {
			var r = this.__data__, n = ne(r, e);
			return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
		}, Q.prototype.clear = function() {
			this.size = 0, this.__data__ = {
				hash: new H(),
				map: new (X || K)(),
				string: new H()
			};
		}, Q.prototype.delete = function(e) {
			var t = he(this, e).delete(e);
			return this.size -= t ? 1 : 0, t;
		}, Q.prototype.get = function(e) {
			return he(this, e).get(e);
		}, Q.prototype.has = function(e) {
			return he(this, e).has(e);
		}, Q.prototype.set = function(e, t) {
			var r = he(this, e), n = r.size;
			return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
		}, J.prototype.clear = function() {
			this.__data__ = new K(), this.size = 0;
		}, J.prototype.delete = function(e) {
			var t = this.__data__, r = t.delete(e);
			return this.size = t.size, r;
		}, J.prototype.get = function(e) {
			return this.__data__.get(e);
		}, J.prototype.has = function(e) {
			return this.__data__.has(e);
		}, J.prototype.set = function(e, t) {
			var r = this.__data__;
			if (r instanceof K) {
				var n = r.__data__;
				if (!X || n.length < 199) return n.push([e, t]), this.size = ++r.size, this;
				r = this.__data__ = new Q(n);
			}
			return r.set(e, t), this.size = r.size, this;
		};
		var ie, ae = function(e, t, r) {
			for (var n = -1, o = Object(e), i = r(e), a = i.length; a--;) {
				var c = i[ie ? a : ++n];
				if (!1 === t(o[c], c, o)) break;
			}
			return e;
		};
		function ce(e) {
			return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : V && V in Object(e) ? function(e) {
				var t = P.call(e, V), r = e[V];
				try {
					e[V] = void 0;
					var n = !0;
				} catch (e) {}
				var o = T.call(e);
				n && (t ? e[V] = r : delete e[V]);
				return o;
			}(e) : function(e) {
				return T.call(e);
			}(e);
		}
		function se(e) {
			return Ee(e) && ce(e) == a;
		}
		function ue(e) {
			return !(!Se(e) || function(e) {
				return !!A && A in e;
			}(e)) && (je(e) ? M : u).test(function(e) {
				if (null != e) {
					try {
						return E.call(e);
					} catch (e) {}
					try {
						return e + "";
					} catch (e) {}
				}
				return "";
			}(e));
		}
		function le(e) {
			if (!Se(e)) return function(e) {
				var t = [];
				if (null != e) for (var r in Object(e)) t.push(r);
				return t;
			}(e);
			var t = me(e), r = [];
			for (var n in e) ("constructor" != n || !t && P.call(e, n)) && r.push(n);
			return r;
		}
		function fe(e, t, r, n, o) {
			e !== t && ae(t, (function(i, a) {
				if (o || (o = new J()), Se(i)) (function(e, t, r, n, o, i, a) {
					var c = ve(e, r), u = ve(t, r), l = a.get(u);
					if (l) return void te(e, r, l);
					var f = i ? i(c, u, r + "", e, t, a) : void 0, d = void 0 === f;
					if (d) {
						var p = xe(u), h = !p && ke(u), b = !p && !h && Pe(u);
						f = u, p || h || b ? xe(c) ? f = c : Ee(_ = c) && Ce(_) ? f = function(e, t) {
							var r = -1, n = e.length;
							t || (t = Array(n));
							for (; ++r < n;) t[r] = e[r];
							return t;
						}(c) : h ? (d = !1, f = function(e, t) {
							if (t) return e.slice();
							var r = e.length, n = F ? F(r) : new e.constructor(r);
							return e.copy(n), n;
						}(u, !0)) : b ? (d = !1, y = u, m = (v = y.buffer, g = new v.constructor(v.byteLength), new D(g).set(new D(v)), g), f = new y.constructor(m, y.byteOffset, y.length)) : f = [] : function(e) {
							if (!Ee(e) || ce(e) != s) return !1;
							var t = R(e);
							if (null === t) return !0;
							var r = P.call(t, "constructor") && t.constructor;
							return "function" == typeof r && r instanceof r && E.call(r) == I;
						}(u) || we(u) ? (f = c, we(c) ? f = function(e) {
							return function(e, t, r, n) {
								var o = !r;
								r || (r = {});
								var i = -1, a = t.length;
								for (; ++i < a;) {
									var c = t[i], s = n ? n(r[c], e[c], c, r, e) : void 0;
									void 0 === s && (s = e[c]), o ? oe(r, c, s) : re(r, c, s);
								}
								return r;
							}(e, Ae(e));
						}(c) : Se(c) && !je(c) || (f = function(e) {
							return "function" != typeof e.constructor || me(e) ? {} : G(R(e));
						}(u))) : d = !1;
					}
					var y, m, v, g;
					var _;
					d && (a.set(u, f), o(f, u, n, i, a), a.delete(u));
					te(e, r, f);
				})(e, t, a, r, fe, n, o);
				else {
					var c = n ? n(ve(e, a), i, a + "", e, t, o) : void 0;
					void 0 === c && (c = i), te(e, a, c);
				}
			}), Ae);
		}
		function de(e, t) {
			return ge(function(e, t, r) {
				return t = W(void 0 === t ? e.length - 1 : t, 0), function() {
					for (var n = arguments, o = -1, i = W(n.length - t, 0), a = Array(i); ++o < i;) a[o] = n[t + o];
					o = -1;
					for (var c = Array(t + 1); ++o < t;) c[o] = n[o];
					return c[t] = r(a), function(e, t, r) {
						switch (r.length) {
							case 0: return e.call(t);
							case 1: return e.call(t, r[0]);
							case 2: return e.call(t, r[0], r[1]);
							case 3: return e.call(t, r[0], r[1], r[2]);
						}
						return e.apply(t, r);
					}(e, this, c);
				};
			}(e, t, Me), e + "");
		}
		var pe = Y ? function(e, t) {
			return Y(e, "toString", {
				configurable: !0,
				enumerable: !1,
				value: (r = t, function() {
					return r;
				}),
				writable: !0
			});
			var r;
		} : Me;
		function he(e, t) {
			var n, o, i = e.__data__;
			return ("string" == (o = t$12(n = t)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? i["string" == typeof t ? "string" : "hash"] : i.map;
		}
		function be(e, t) {
			var r = function(e, t) {
				return null == e ? void 0 : e[t];
			}(e, t);
			return ue(r) ? r : void 0;
		}
		function ye(e, t) {
			var n = t$12(e);
			return !!(t = null == t ? i : t) && ("number" == n || "symbol" != n && l.test(e)) && e > -1 && e % 1 == 0 && e < t;
		}
		function me(e) {
			var t = e && e.constructor;
			return e === ("function" == typeof t && t.prototype || O);
		}
		function ve(e, t) {
			if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t];
		}
		var ge = function(e) {
			var t = 0, r = 0;
			return function() {
				var n = Z(), o = 16 - (n - r);
				if (r = n, o > 0) {
					if (++t >= 800) return arguments[0];
				} else t = 0;
				return e.apply(void 0, arguments);
			};
		}(pe);
		function _e(e, t) {
			return e === t || e != e && t != t;
		}
		var we = se(function() {
			return arguments;
		}()) ? se : function(e) {
			return Ee(e) && P.call(e, "callee") && !$.call(e, "callee");
		}, xe = Array.isArray;
		function Ce(e) {
			return null != e && Oe(e.length) && !je(e);
		}
		var ke = U || function() {
			return !1;
		};
		function je(e) {
			if (!Se(e)) return !1;
			var t = ce(e);
			return t == c || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t;
		}
		function Oe(e) {
			return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i;
		}
		function Se(e) {
			var t = t$12(e);
			return null != e && ("object" == t || "function" == t);
		}
		function Ee(e) {
			return null != e && "object" == t$12(e);
		}
		var Pe = _ ? function(e) {
			return function(t) {
				return e(t);
			};
		}(_) : function(e) {
			return Ee(e) && Oe(e.length) && !!f[ce(e)];
		};
		function Ae(e) {
			return Ce(e) ? ee(e, !0) : le(e);
		}
		var Te, Ie = (Te = function(e, t, r) {
			fe(e, t, r);
		}, de((function(e, t) {
			var n = -1, o = t.length, i = o > 1 ? t[o - 1] : void 0, a = o > 2 ? t[2] : void 0;
			for (i = Te.length > 3 && "function" == typeof i ? (o--, i) : void 0, a && function(e, t, n) {
				if (!Se(n)) return !1;
				var o = t$12(t);
				return !!("number" == o ? Ce(n) && ye(t, n.length) : "string" == o && t in n) && _e(n[t], e);
			}(t[0], t[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o;) {
				var c = t[n];
				c && Te(e, c, n, i);
			}
			return e;
		})));
		function Me(e) {
			return e;
		}
		e.exports = Ie;
	})(z$1, z$1.exports);
	$$1 = o$6(z$1.exports);
	B$2 = "__lodash_hash_undefined__";
	V = "[object Function]";
	Y = "[object GeneratorFunction]";
	U$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
	W$2 = /^\w*$/;
	Z$1 = /^\./;
	X$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	q$2 = /\\(\\)?/g;
	G$1 = /^\[object .+?Constructor\]$/;
	H$1 = "object" == t$12(n$9) && n$9 && n$9.Object === Object && n$9;
	K$1 = "object" == ("undefined" == typeof self ? "undefined" : t$12(self)) && self && self.Object === Object && self;
	Q$1 = H$1 || K$1 || Function("return this")();
	ee = Array.prototype;
	te = Function.prototype;
	re = Object.prototype;
	ne = Q$1["__core-js_shared__"];
	oe = (J$1 = /[^.]+$/.exec(ne && ne.keys && ne.keys.IE_PROTO || "")) ? "Symbol(src)_1." + J$1 : "";
	ie = te.toString;
	ae = re.hasOwnProperty;
	ce = re.toString;
	se = RegExp("^" + ie.call(ae).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	ue = Q$1.Symbol;
	le = ee.splice;
	fe = xe(Q$1, "Map");
	de = xe(Object, "create");
	pe = ue ? ue.prototype : void 0;
	he = pe ? pe.toString : void 0;
	be.prototype.clear = function() {
		this.__data__ = de ? de(null) : {};
	}, be.prototype.delete = function(e) {
		return this.has(e) && delete this.__data__[e];
	}, be.prototype.get = function(e) {
		var t = this.__data__;
		if (de) {
			var r = t[e];
			return r === B$2 ? void 0 : r;
		}
		return ae.call(t, e) ? t[e] : void 0;
	}, be.prototype.has = function(e) {
		var t = this.__data__;
		return de ? void 0 !== t[e] : ae.call(t, e);
	}, be.prototype.set = function(e, t) {
		return this.__data__[e] = de && void 0 === t ? B$2 : t, this;
	}, ye.prototype.clear = function() {
		this.__data__ = [];
	}, ye.prototype.delete = function(e) {
		var t = this.__data__, r = ve(t, e);
		return !(r < 0) && (r == t.length - 1 ? t.pop() : le.call(t, r, 1), !0);
	}, ye.prototype.get = function(e) {
		var t = this.__data__, r = ve(t, e);
		return r < 0 ? void 0 : t[r][1];
	}, ye.prototype.has = function(e) {
		return ve(this.__data__, e) > -1;
	}, ye.prototype.set = function(e, t) {
		var r = this.__data__, n = ve(r, e);
		return n < 0 ? r.push([e, t]) : r[n][1] = t, this;
	}, me.prototype.clear = function() {
		this.__data__ = {
			hash: new be(),
			map: new (fe || ye)(),
			string: new be()
		};
	}, me.prototype.delete = function(e) {
		return we(this, e).delete(e);
	}, me.prototype.get = function(e) {
		return we(this, e).get(e);
	}, me.prototype.has = function(e) {
		return we(this, e).has(e);
	}, me.prototype.set = function(e, t) {
		return we(this, e).set(e, t), this;
	};
	Ce = je((function(e) {
		var t;
		e = null == (t = e) ? "" : function(e) {
			if ("string" == typeof e) return e;
			if (Ee(e)) return he ? he.call(e) : "";
			var t = e + "";
			return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
		}(t);
		var r = [];
		return Z$1.test(e) && r.push(""), e.replace(X$1, (function(e, t, n, o) {
			r.push(n ? o.replace(q$2, "$1") : t || e);
		})), r;
	}));
	je.Cache = me;
	Oe = Array.isArray;
	Pe = o$6((function(e, t, r) {
		var n = null == e ? void 0 : ge(e, t);
		return void 0 === n ? r : n;
	}));
	Ae = { exports: {} };
	(function(e, t) {
		var n = 9007199254740991, i = "[object Map]", a = "[object Promise]", c = "[object Set]", s = "[object WeakMap]", u = "[object DataView]", l = /^\[object .+?Constructor\]$/, f = "object" == t$12(n$9) && n$9 && n$9.Object === Object && n$9, d = "object" == ("undefined" == typeof self ? "undefined" : t$12(self)) && self && self.Object === Object && self, p = f || d || Function("return this")(), h = t && !t.nodeType && t, b = h && e && !e.nodeType && e, y = b && b.exports === h;
		var m, v, g = Function.prototype, _ = Object.prototype, w = p["__core-js_shared__"], x = function() {
			var e = /[^.]+$/.exec(w && w.keys && w.keys.IE_PROTO || "");
			return e ? "Symbol(src)_1." + e : "";
		}(), C = g.toString, k = _.hasOwnProperty, j = _.toString, O = RegExp("^" + C.call(k).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), S = y ? p.Buffer : void 0, E = _.propertyIsEnumerable, P = S ? S.isBuffer : void 0, A = (m = Object.keys, v = Object, function(e) {
			return m(v(e));
		}), T = Y(p, "DataView"), I = Y(p, "Map"), M = Y(p, "Promise"), N = Y(p, "Set"), L = Y(p, "WeakMap"), D = !E.call({ valueOf: 1 }, "valueOf"), F = W(T), R = W(I), z = W(M), $ = W(N), B = W(L);
		function V(e) {
			if (!K(e) || function(e) {
				return !!x && x in e;
			}(e)) return !1;
			return (H(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "");
				} catch (e) {}
				return t;
			}(e) ? O : l).test(W(e));
		}
		function Y(e, t) {
			var r = function(e, t) {
				return null == e ? void 0 : e[t];
			}(e, t);
			return V(r) ? r : void 0;
		}
		var U = function(e) {
			return j.call(e);
		};
		function W(e) {
			if (null != e) {
				try {
					return C.call(e);
				} catch (e) {}
				try {
					return e + "";
				} catch (e) {}
			}
			return "";
		}
		function Z(e) {
			return function(e) {
				return function(e) {
					return !!e && "object" == t$12(e);
				}(e) && q(e);
			}(e) && k.call(e, "callee") && (!E.call(e, "callee") || "[object Arguments]" == j.call(e));
		}
		(T && U(new T(/* @__PURE__ */ new ArrayBuffer(1))) != u || I && U(new I()) != i || M && U(M.resolve()) != a || N && U(new N()) != c || L && U(new L()) != s) && (U = function(e) {
			var t = j.call(e), r = "[object Object]" == t ? e.constructor : void 0, n = r ? W(r) : void 0;
			if (n) switch (n) {
				case F: return u;
				case R: return i;
				case z: return a;
				case $: return c;
				case B: return s;
			}
			return t;
		});
		var X = Array.isArray;
		function q(e) {
			return null != e && function(e) {
				return "number" == typeof e && e > -1 && e % 1 == 0 && e <= n;
			}(e.length) && !H(e);
		}
		var G = P || function() {
			return !1;
		};
		function H(e) {
			var t = K(e) ? j.call(e) : "";
			return "[object Function]" == t || "[object GeneratorFunction]" == t;
		}
		function K(e) {
			var t = t$12(e);
			return !!e && ("object" == t || "function" == t);
		}
		e.exports = function(e) {
			if (q(e) && (X(e) || "string" == typeof e || "function" == typeof e.splice || G(e) || Z(e))) return !e.length;
			var t = U(e);
			if (t == i || t == c) return !e.size;
			if (D || function(e) {
				var t = e && e.constructor;
				return e === ("function" == typeof t && t.prototype || _);
			}(e)) return !A(e).length;
			for (var r in e) if (k.call(e, r)) return !1;
			return !0;
		};
	})(Ae, Ae.exports);
	Te = o$6(Ae.exports);
	Ie = { exports: {} };
	(function(e, t) {
		var n = "__lodash_hash_undefined__", i = 9007199254740991, a = "[object Arguments]", c = "[object Boolean]", s = "[object Date]", u = "[object Function]", l = "[object GeneratorFunction]", f = "[object Map]", d = "[object Number]", p = "[object Object]", h = "[object Promise]", b = "[object RegExp]", y = "[object Set]", m = "[object String]", v = "[object Symbol]", g = "[object WeakMap]", _ = "[object ArrayBuffer]", w = "[object DataView]", x = "[object Float32Array]", C = "[object Float64Array]", k = "[object Int8Array]", j = "[object Int16Array]", O = "[object Int32Array]", S = "[object Uint8Array]", E = "[object Uint8ClampedArray]", P = "[object Uint16Array]", A = "[object Uint32Array]", T = /\w*$/, I = /^\[object .+?Constructor\]$/, M = /^(?:0|[1-9]\d*)$/, N = {};
		N[a] = N["[object Array]"] = N[_] = N[w] = N[c] = N[s] = N[x] = N[C] = N[k] = N[j] = N[O] = N[f] = N[d] = N[p] = N[b] = N[y] = N[m] = N[v] = N[S] = N[E] = N[P] = N[A] = !0, N["[object Error]"] = N[u] = N[g] = !1;
		var L = "object" == t$12(n$9) && n$9 && n$9.Object === Object && n$9, D = "object" == ("undefined" == typeof self ? "undefined" : t$12(self)) && self && self.Object === Object && self, F = L || D || Function("return this")(), R = t && !t.nodeType && t, z = R && e && !e.nodeType && e, $ = z && z.exports === R;
		function B(e, t) {
			return e.set(t[0], t[1]), e;
		}
		function V(e, t) {
			return e.add(t), e;
		}
		function Y(e, t, r, n) {
			var o = -1, i = e ? e.length : 0;
			for (n && i && (r = e[++o]); ++o < i;) r = t(r, e[o], o, e);
			return r;
		}
		function U(e) {
			var t = !1;
			if (null != e && "function" != typeof e.toString) try {
				t = !!(e + "");
			} catch (e) {}
			return t;
		}
		function W(e) {
			var t = -1, r = Array(e.size);
			return e.forEach((function(e, n) {
				r[++t] = [n, e];
			})), r;
		}
		function Z(e, t) {
			return function(r) {
				return e(t(r));
			};
		}
		function X(e) {
			var t = -1, r = Array(e.size);
			return e.forEach((function(e) {
				r[++t] = e;
			})), r;
		}
		var q = Array.prototype, G = Function.prototype, H = Object.prototype, K = F["__core-js_shared__"], Q = function() {
			var e = /[^.]+$/.exec(K && K.keys && K.keys.IE_PROTO || "");
			return e ? "Symbol(src)_1." + e : "";
		}(), J = G.toString, ee = H.hasOwnProperty, te = H.toString, re = RegExp("^" + J.call(ee).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ne = $ ? F.Buffer : void 0, oe = F.Symbol, ie = F.Uint8Array, ae = Z(Object.getPrototypeOf, Object), ce = Object.create, se = H.propertyIsEnumerable, ue = q.splice, le = Object.getOwnPropertySymbols, fe = ne ? ne.isBuffer : void 0, de = Z(Object.keys, Object), pe = Re(F, "DataView"), he = Re(F, "Map"), be = Re(F, "Promise"), ye = Re(F, "Set"), me = Re(F, "WeakMap"), ve = Re(Object, "create"), ge = Ye(pe), _e = Ye(he), we = Ye(be), xe = Ye(ye), Ce = Ye(me), ke = oe ? oe.prototype : void 0, je = ke ? ke.valueOf : void 0;
		function Oe(e) {
			var t = -1, r = e ? e.length : 0;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function Se(e) {
			var t = -1, r = e ? e.length : 0;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function Ee(e) {
			var t = -1, r = e ? e.length : 0;
			for (this.clear(); ++t < r;) {
				var n = e[t];
				this.set(n[0], n[1]);
			}
		}
		function Pe(e) {
			this.__data__ = new Se(e);
		}
		function Ae(e, t) {
			var n = We(e) || function(e) {
				return function(e) {
					return function(e) {
						return !!e && "object" == t$12(e);
					}(e) && Ze(e);
				}(e) && ee.call(e, "callee") && (!se.call(e, "callee") || te.call(e) == a);
			}(e) ? function(e, t) {
				for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
				return n;
			}(e.length, String) : [], o = n.length, i = !!o;
			for (var c in e) !t && !ee.call(e, c) || i && ("length" == c || Be(c, o)) || n.push(c);
			return n;
		}
		function Te(e, t, r) {
			var n = e[t];
			ee.call(e, t) && Ue(n, r) && (void 0 !== r || t in e) || (e[t] = r);
		}
		function Ie(e, t) {
			for (var r = e.length; r--;) if (Ue(e[r][0], t)) return r;
			return -1;
		}
		function Me(e, t, r, n, o, i, h) {
			var g;
			if (n && (g = i ? n(e, o, i, h) : n(e)), void 0 !== g) return g;
			if (!Ge(e)) return e;
			var I = We(e);
			if (I) {
				if (g = function(e) {
					var t = e.length, r = e.constructor(t);
					t && "string" == typeof e[0] && ee.call(e, "index") && (r.index = e.index, r.input = e.input);
					return r;
				}(e), !t) return function(e, t) {
					var r = -1, n = e.length;
					t || (t = Array(n));
					for (; ++r < n;) t[r] = e[r];
					return t;
				}(e, g);
			} else {
				var M = $e(e), L = M == u || M == l;
				if (Xe(e)) return function(e, t) {
					if (t) return e.slice();
					var r = new e.constructor(e.length);
					return e.copy(r), r;
				}(e, t);
				if (M == p || M == a || L && !i) {
					if (U(e)) return i ? e : {};
					if (g = function(e) {
						return "function" != typeof e.constructor || Ve(e) ? {} : (t = ae(e), Ge(t) ? ce(t) : {});
						var t;
					}(L ? {} : e), !t) return function(e, t) {
						return De(e, ze(e), t);
					}(e, function(e, t) {
						return e && De(t, He(t), e);
					}(g, e));
				} else {
					if (!N[M]) return i ? e : {};
					g = function(e, t, r, n) {
						var o = e.constructor;
						switch (t) {
							case _: return Le(e);
							case c:
							case s: return new o(+e);
							case w: return function(e, t) {
								var r = t ? Le(e.buffer) : e.buffer;
								return new e.constructor(r, e.byteOffset, e.byteLength);
							}(e, n);
							case x:
							case C:
							case k:
							case j:
							case O:
							case S:
							case E:
							case P:
							case A: return function(e, t) {
								var r = t ? Le(e.buffer) : e.buffer;
								return new e.constructor(r, e.byteOffset, e.length);
							}(e, n);
							case f: return function(e, t, r) {
								return Y(t ? r(W(e), !0) : W(e), B, new e.constructor());
							}(e, n, r);
							case d:
							case m: return new o(e);
							case b: return function(e) {
								var t = new e.constructor(e.source, T.exec(e));
								return t.lastIndex = e.lastIndex, t;
							}(e);
							case y: return function(e, t, r) {
								return Y(t ? r(X(e), !0) : X(e), V, new e.constructor());
							}(e, n, r);
							case v: return i = e, je ? Object(je.call(i)) : {};
						}
						var i;
					}(e, M, Me, t);
				}
			}
			h || (h = new Pe());
			var D = h.get(e);
			if (D) return D;
			if (h.set(e, g), !I) var F = r ? function(e) {
				return function(e, t, r) {
					var n = t(e);
					return We(e) ? n : function(e, t) {
						for (var r = -1, n = t.length, o = e.length; ++r < n;) e[o + r] = t[r];
						return e;
					}(n, r(e));
				}(e, He, ze);
			}(e) : He(e);
			return function(e, t) {
				for (var r = -1, n = e ? e.length : 0; ++r < n && !1 !== t(e[r], r, e););
			}(F || e, (function(o, i) {
				F && (o = e[i = o]), Te(g, i, Me(o, t, r, n, i, e, h));
			})), g;
		}
		function Ne(e) {
			return !(!Ge(e) || (t = e, Q && Q in t)) && (qe(e) || U(e) ? re : I).test(Ye(e));
			var t;
		}
		function Le(e) {
			var t = new e.constructor(e.byteLength);
			return new ie(t).set(new ie(e)), t;
		}
		function De(e, t, r, n) {
			r || (r = {});
			for (var o = -1, i = t.length; ++o < i;) {
				var a = t[o], c = n ? n(r[a], e[a], a, r, e) : void 0;
				Te(r, a, void 0 === c ? e[a] : c);
			}
			return r;
		}
		function Fe(e, t) {
			var n, o, i = e.__data__;
			return ("string" == (o = t$12(n = t)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? i["string" == typeof t ? "string" : "hash"] : i.map;
		}
		function Re(e, t) {
			var r = function(e, t) {
				return null == e ? void 0 : e[t];
			}(e, t);
			return Ne(r) ? r : void 0;
		}
		Oe.prototype.clear = function() {
			this.__data__ = ve ? ve(null) : {};
		}, Oe.prototype.delete = function(e) {
			return this.has(e) && delete this.__data__[e];
		}, Oe.prototype.get = function(e) {
			var t = this.__data__;
			if (ve) {
				var r = t[e];
				return r === n ? void 0 : r;
			}
			return ee.call(t, e) ? t[e] : void 0;
		}, Oe.prototype.has = function(e) {
			var t = this.__data__;
			return ve ? void 0 !== t[e] : ee.call(t, e);
		}, Oe.prototype.set = function(e, t) {
			return this.__data__[e] = ve && void 0 === t ? n : t, this;
		}, Se.prototype.clear = function() {
			this.__data__ = [];
		}, Se.prototype.delete = function(e) {
			var t = this.__data__, r = Ie(t, e);
			return !(r < 0) && (r == t.length - 1 ? t.pop() : ue.call(t, r, 1), !0);
		}, Se.prototype.get = function(e) {
			var t = this.__data__, r = Ie(t, e);
			return r < 0 ? void 0 : t[r][1];
		}, Se.prototype.has = function(e) {
			return Ie(this.__data__, e) > -1;
		}, Se.prototype.set = function(e, t) {
			var r = this.__data__, n = Ie(r, e);
			return n < 0 ? r.push([e, t]) : r[n][1] = t, this;
		}, Ee.prototype.clear = function() {
			this.__data__ = {
				hash: new Oe(),
				map: new (he || Se)(),
				string: new Oe()
			};
		}, Ee.prototype.delete = function(e) {
			return Fe(this, e).delete(e);
		}, Ee.prototype.get = function(e) {
			return Fe(this, e).get(e);
		}, Ee.prototype.has = function(e) {
			return Fe(this, e).has(e);
		}, Ee.prototype.set = function(e, t) {
			return Fe(this, e).set(e, t), this;
		}, Pe.prototype.clear = function() {
			this.__data__ = new Se();
		}, Pe.prototype.delete = function(e) {
			return this.__data__.delete(e);
		}, Pe.prototype.get = function(e) {
			return this.__data__.get(e);
		}, Pe.prototype.has = function(e) {
			return this.__data__.has(e);
		}, Pe.prototype.set = function(e, t) {
			var r = this.__data__;
			if (r instanceof Se) {
				var n = r.__data__;
				if (!he || n.length < 199) return n.push([e, t]), this;
				r = this.__data__ = new Ee(n);
			}
			return r.set(e, t), this;
		};
		var ze = le ? Z(le, Object) : function() {
			return [];
		}, $e = function(e) {
			return te.call(e);
		};
		function Be(e, t) {
			return !!(t = null == t ? i : t) && ("number" == typeof e || M.test(e)) && e > -1 && e % 1 == 0 && e < t;
		}
		function Ve(e) {
			var t = e && e.constructor;
			return e === ("function" == typeof t && t.prototype || H);
		}
		function Ye(e) {
			if (null != e) {
				try {
					return J.call(e);
				} catch (e) {}
				try {
					return e + "";
				} catch (e) {}
			}
			return "";
		}
		function Ue(e, t) {
			return e === t || e != e && t != t;
		}
		(pe && $e(new pe(/* @__PURE__ */ new ArrayBuffer(1))) != w || he && $e(new he()) != f || be && $e(be.resolve()) != h || ye && $e(new ye()) != y || me && $e(new me()) != g) && ($e = function(e) {
			var t = te.call(e), r = t == p ? e.constructor : void 0, n = r ? Ye(r) : void 0;
			if (n) switch (n) {
				case ge: return w;
				case _e: return f;
				case we: return h;
				case xe: return y;
				case Ce: return g;
			}
			return t;
		});
		var We = Array.isArray;
		function Ze(e) {
			return null != e && function(e) {
				return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i;
			}(e.length) && !qe(e);
		}
		var Xe = fe || function() {
			return !1;
		};
		function qe(e) {
			var t = Ge(e) ? te.call(e) : "";
			return t == u || t == l;
		}
		function Ge(e) {
			var t = t$12(e);
			return !!e && ("object" == t || "function" == t);
		}
		function He(e) {
			return Ze(e) ? Ae(e) : function(e) {
				if (!Ve(e)) return de(e);
				var t = [];
				for (var r in Object(e)) ee.call(e, r) && "constructor" != r && t.push(r);
				return t;
			}(e);
		}
		e.exports = function(e) {
			return Me(e, !0, !0);
		};
	})(Ie, Ie.exports);
	Me = o$6(Ie.exports);
	Ne = function() {
		function e() {
			D$1(this, e), e$14(this, "cache", void 0), this.cache = {};
		}
		return R$1(e, [
			{
				key: "bind",
				value: function(e) {
					$$1(this.cache, e);
				}
			},
			{
				key: "get",
				value: function(e) {
					return Pe(this.cache, e);
				}
			},
			{
				key: "clear",
				value: function() {
					this.cache = {};
				}
			},
			{
				key: "getAll",
				value: function() {
					return this.cache;
				}
			}
		]), e;
	}();
	Le = function() {
		function e() {
			D$1(this, e), e$14(this, "cache", void 0), this.cache = new Ne(), this.init();
		}
		return R$1(e, [
			{
				key: "bind",
				value: function(e) {
					Te(e) || this.cache.bind(e), this.saveToSessionStorage();
				}
			},
			{
				key: "clear",
				value: function() {
					this.cache.clear();
				}
			},
			{
				key: "getConfig",
				value: function(e) {
					var t = this.cache.get(e);
					return "object" === t$12(t) ? Me(t) : t;
				}
			},
			{
				key: "getAllConfig",
				value: function() {
					var e;
					return Me(null !== (e = this.cache.getAll()) && void 0 !== e ? e : {});
				}
			},
			{
				key: "saveToSessionStorage",
				value: function(e) {
					try {
						if ("undefined" != typeof self && self.sessionStorage) {
							var t, r = null !== (t = null != e ? e : this.cache.getAll()) && void 0 !== t ? t : {};
							return self.sessionStorage.setItem("configCache", JSON.stringify(r)), !0;
						}
					} catch (e) {
						console.error(e);
					}
					return !1;
				}
			},
			{
				key: "loadFromSessionStorage",
				value: function() {
					try {
						if ("undefined" == typeof self || !self.sessionStorage) throw new Error("browser is not support sessionStorage");
						var e = self.sessionStorage.getItem("configCache");
						if (e) return this.bind(JSON.parse(e)), !0;
					} catch (e) {
						console.error(e);
					}
					return !1;
				}
			},
			{
				key: "init",
				value: function() {
					if ("undefined" != typeof self) {
						var e = self.AppConfig;
						if ("object" === t$12(e)) {
							var t, n, o, i, a, c = e[t = "mode", i = null, (a = (n ? "?".concat(n.split("?")[1] || "") : null === (o = globalThis.location) || void 0 === o ? void 0 : o.search) || "") && (i = a.match(new RegExp("(\\?|&)".concat(t, "=([^&]*)(&|$)")))), i ? decodeURIComponent(i[2]) : ""] || e.normal;
							this.bind(c);
						} else console.error("加载 AppConfig 配置出错");
					}
				}
			}
		], [{
			key: "getInstance",
			value: function() {
				return this.instance || (this.instance = new e()), this.instance;
			}
		}]), e;
	}();
	e$14(Le, "instance", void 0), e$14(function() {
		function e() {
			D$1(this, e);
		}
		return R$1(e, null, [{
			key: "getKey",
			value: function(e) {
				if ("" === this.configName) throw new Error("子类未重命名configName!");
				return "".concat(this.configName, ".").concat(e);
			}
		}]), e;
	}(), "configName", "");
	De = Le.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	Fe = !!De && De.CDN_ORIGIN || "https://docs.gtimg.com/docs-design-resources";
	Fe += "/image/mobile/png@2x/";
	ze = {};
	$e = function(e, t) {
		return $e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}, $e(e, t);
	};
	Ve = function() {
		return Ve = Object.assign || function(e) {
			for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
			return e;
		}, Ve.apply(this, arguments);
	};
	Je = Object.create ? function(e, t, r, n) {
		void 0 === n && (n = r);
		var o = Object.getOwnPropertyDescriptor(t, r);
		o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {
			enumerable: !0,
			get: function() {
				return t[r];
			}
		}), Object.defineProperty(e, n, o);
	} : function(e, t, r, n) {
		void 0 === n && (n = r), e[n] = t[r];
	};
	ft = Object.create ? function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	} : function(e, t) {
		e.default = t;
	};
	dt = function(e) {
		return dt = Object.getOwnPropertyNames || function(e) {
			var t = [];
			for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[t.length] = r);
			return t;
		}, dt(e);
	};
	gt = "function" == typeof SuppressedError ? SuppressedError : function(e, t, r) {
		var n = new Error(r);
		return n.name = "SuppressedError", n.error = e, n.suppressed = t, n;
	};
	Ot = i$8(Object.freeze({
		__proto__: null,
		__extends: Be,
		get __assign() {
			return Ve;
		},
		__rest: Ye,
		__decorate: Ue,
		__param: We,
		__esDecorate: Ze,
		__runInitializers: Xe,
		__propKey: qe,
		__setFunctionName: Ge,
		__metadata: He,
		__awaiter: Ke,
		__generator: Qe,
		__createBinding: Je,
		__exportStar: et,
		__values: tt,
		__read: rt,
		__spread: nt,
		__spreadArrays: ot,
		__spreadArray: it,
		__await: at,
		__asyncGenerator: ct,
		__asyncDelegator: st,
		__asyncValues: ut,
		__makeTemplateObject: lt,
		__importStar: pt,
		__importDefault: ht,
		__classPrivateFieldGet: bt,
		__classPrivateFieldSet: yt,
		__classPrivateFieldIn: mt,
		__addDisposableResource: vt,
		__disposeResources: _t,
		__rewriteRelativeImportExtension: wt,
		default: {
			__extends: Be,
			__assign: Ve,
			__rest: Ye,
			__decorate: Ue,
			__param: We,
			__esDecorate: Ze,
			__runInitializers: Xe,
			__propKey: qe,
			__setFunctionName: Ge,
			__metadata: He,
			__awaiter: Ke,
			__generator: Qe,
			__createBinding: Je,
			__exportStar: et,
			__values: tt,
			__read: rt,
			__spread: nt,
			__spreadArrays: ot,
			__spreadArray: it,
			__await: at,
			__asyncGenerator: ct,
			__asyncDelegator: st,
			__asyncValues: ut,
			__makeTemplateObject: lt,
			__importStar: pt,
			__importDefault: ht,
			__classPrivateFieldGet: bt,
			__classPrivateFieldSet: yt,
			__classPrivateFieldIn: mt,
			__addDisposableResource: vt,
			__disposeResources: _t,
			__rewriteRelativeImportExtension: wt
		}
	}));
	St = {};
	Et = {};
	Pt = {};
	At = {};
	Nt = { exports: {} };
	ar = {};
	cr = {};
	dr = {};
	pr = {};
	Object.defineProperty(ze, "__esModule", { value: !0 });
	mr = ze.Divider = void 0;
	vr = Ot.__importDefault(function() {
		if (fr) return St;
		fr = 1, Object.defineProperty(St, "__esModule", { value: !0 });
		var e = Ot, t = It().h, r = e.__importStar(import_react$16.default), n = e.__importStar(or()), o = yr(), i = function(r) {
			function n() {
				var e = null !== r && r.apply(this, arguments) || this;
				return e.themedRender = function(r) {
					var n, o = e.props, i = o.prefixCls, a = o.className, c = o.style, s = o.dashed, u = o.children, l = o.orientation, f = o.textPosition, d = u && "horizontal" === l, p = r(i, a, i + "-" + l + (s ? "-dashed" : ""), ((n = {})[i + "-with-text"] = d, n)), h = r(i + "-text", [i + "-text-" + f]);
					return t("div", {
						className: p,
						style: c
					}, d ? t("span", { className: h }, u) : null);
				}, e;
			}
			return e.__extends(n, r), n.prototype.render = function() {
				return o.consumeTheme(this.themedRender);
			}, n;
		}(r.Component);
		return St.default = i, i.defaultProps = {
			prefixCls: "dui-m-divider",
			dashed: !1,
			orientation: "horizontal",
			textPosition: "center"
		}, i.propTypes = {
			prefixCls: n.string,
			style: n.object,
			className: n.string,
			dashed: n.bool,
			orientation: n.string,
			textPosition: n.string
		}, St;
	}());
	mr = ze.Divider = vr.default, br().injectStyle("components/Divider/style/index.css", "[data-duim-0-106-9~=\"dui-m-divider\"]{border:1px solid rgba(0,0,0,.04);position:relative}[data-duim-0-106-9~=\"dui-m-divider-horizontal\"],[data-duim-0-106-9~=\"dui-m-divider-horizontal-dashed\"]{display:block;width:100%;border-top:none;border-left:none;border-right:none;margin:8px 0}[data-duim-0-106-9~=\"dui-m-divider-horizontal-dashed\"]{border-bottom-style:dashed}[data-duim-0-106-9~=\"dui-m-divider-vertical\"],[data-duim-0-106-9~=\"dui-m-divider-vertical-dashed\"]{display:inline-block;border-left:none;border-top:none;border-bottom:none;margin:0 12px;height:1em}[data-duim-0-106-9~=\"dui-m-divider-vertical-dashed\"]{border-right-style:dashed}[data-duim-0-106-9~=\"dui-m-divider-with-text\"]{margin:15px 0}[data-duim-0-106-9~=\"dui-m-divider-text\"]{position:absolute;background:#fff;font-size:14px;color:#d0d0d0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding:0 6px}[data-duim-0-106-9~=\"dui-m-divider-text-center\"]{left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}[data-duim-0-106-9~=\"dui-m-divider-text-left\"]{left:24px}[data-duim-0-106-9~=\"dui-m-divider-text-right\"]{right:24px}"), ze.default = vr.default;
	_r = {};
	wr = {};
	xr = {};
	kr = {};
	en = {};
	dn = {};
	bn = {};
	_n = {};
	wn = {};
	jn = {};
	Object.defineProperty(_r, "__esModule", { value: !0 });
	On = _r.Snackbar = void 0;
	Sn = Ot;
	En = Sn.__importDefault(Cn());
	On = _r.Snackbar = En.default, br().injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}[data-duim-0-106-9~=\"dui-m-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;left:16px;right:16px;height:52px;padding:0 8px 0 12px;font-size:14px;color:var(--text-ultrastrong,rgba(0,0,0,.88));border-radius:8px;border:1px solid var(--border-weak,rgba(0,0,0,.04));-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);background-color:var(--bg-lv3-default,#fff);-webkit-box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08);box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08)}[data-duim-0-106-9~=\"dui-m-snackbar\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-duim-0-106-9~=\"dui-m-snackbar-icon-container\"],[data-duim-0-106-9~=\"dui-m-snackbar\"]:before{width:24px;height:24px;margin-right:4px}[data-duim-0-106-9~=\"dui-m-snackbar-override-icon\"]:before{display:none}[data-duim-0-106-9~=\"dui-m-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%231e6fff'/%3E%3Cpath fill='%23fff' d='M26 21v12h2v2h-8v-2h2V23h-2v-2h6zm-2-8a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'/%3E%3C/svg%3E\")}[data-duim-0-106-9~=\"dui-m-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%2304dd7d'/%3E%3Cpath fill='%23fff' d='M17.93 22l3.95 3.95 9.9-9.9 2.828 2.83L21.88 31.607l-6.778-6.78L17.93 22z'/%3E%3C/svg%3E\")}[data-duim-0-106-9~=\"dui-m-snackbar-error\"]:before,[data-duim-0-106-9~=\"dui-m-snackbar-warning\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%23fb4d3f'/%3E%3Cpath fill='%23fff' d='M24 29a3 3 0 1 1 0 6 3 3 0 1 1 0-6zm3-16l-1 14h-4l-1-14h6z'/%3E%3C/svg%3E\")}[data-duim-0-106-9~=\"dui-m-snackbar-loading\"]:before{content:none}[data-duim-0-106-9~=\"dui-m-snackbar-loading-indicator\"]{width:18px;height:18px;margin:0 7px 0 3px}[data-duim-0-106-9~=\"dui-m-snackbar-loading-indicator-circle\"]{border-width:8px}[data-duim-0-106-9~=\"dui-m-snackbar-top\"]{-webkit-animation-name:dui-m-snackbar-slide-in-top;animation-name:dui-m-snackbar-slide-in-top;top:16px;margin-top:env(safe-area-inset-top)}[data-duim-0-106-9~=\"dui-m-snackbar-top\"][data-duim-0-106-9~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}[data-duim-0-106-9~=\"dui-m-snackbar-bottom\"]{-webkit-animation-name:dui-m-snackbar-slide-in-bottom;animation-name:dui-m-snackbar-slide-in-bottom;bottom:16px;margin-bottom:env(safe-area-inset-bottom)}[data-duim-0-106-9~=\"dui-m-snackbar-bottom\"][data-duim-0-106-9~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}[data-duim-0-106-9~=\"dui-m-snackbar-message\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;text-overflow:ellipsis}[data-duim-0-106-9~=\"dui-m-snackbar-action\"]{min-width:0;font-weight:600}[data-duim-0-106-9~=\"dui-m-snackbar-actions\"]>[data-duim-0-106-9~=\"dui-m-snackbar-action\"]:not(:first-child){margin-left:6px}[data-duim-0-106-9~=\"dui-m-snackbar-close\"]{width:24px;height:24px;margin-left:4px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23000' fill-opacity='.16'/%3E%3Cpath fill-rule='evenodd' d='M10.833 10.832a.584.584 0 0 0 .004-.814L8.822 8.002l2.015-2.02a.584.584 0 0 0-.004-.814.58.58 0 0 0-.814-.004L7.999 7.18l-2.02-2.02c-.209-.209-.592-.218-.814.004s-.218.605-.004.818l2.02 2.02-2.02 2.02a.59.59 0 0 0 .004.814.593.593 0 0 0 .814.004l2.02-2.02 2.02 2.015a.58.58 0 0 0 .814-.004z' fill='%23fff'/%3E%3C/svg%3E\");background-size:16px;background-position:50%;background-repeat:no-repeat}[data-duim-0-106-9~=\"dui-m-snackbar-close\"]:active{opacity:.5}");
	Pn = Sn.__importDefault(function() {
		if (kn) return jn;
		kn = 1, Object.defineProperty(jn, "__esModule", { value: !0 });
		var e = Ot.__importStar(Cn()), t = ln();
		return jn.default = hr().wrapWithConfigDefaults((function(r) {
			return r.autoClose = "boolean" != typeof r.autoClose || r.autoClose, t.showWithTransition({
				Component: e.default,
				transitionDuration: e.SNACKBAR_TRANSITION_DURATION,
				autoClose: r.autoClose,
				props: r,
				injectClosePropNames: ["onClickAction", "onClose"],
				deepInjectClosePaths: e.isActionArray(r.action) ? ["action.onClick"] : [],
				contexts: r.contexts
			});
		})), jn;
	}());
	An = yn();
	En.default.show = Pn.default, En.default.closeAll = An.closeAll, En.default.closeById = An.closeById, En.default.hasVisibleInstances = An.hasVisibleInstances, _r.default = En.default;
	Tn = [
		{
			app: p$5.WX,
			type: u$8.WX,
			icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_wechat%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-489.000000%2c -1957.000000)'%3e %3cg id='icon/shareto/wechat' transform='translate(489.000000%2c 1957.000000)'%3e %3crect id='Rectangle' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cg id='%e5%be%ae%e4%bf%a1' stroke-width='1' fill-rule='evenodd' transform='translate(25.000000%2c 31.000000)' fill='%2305C060'%3e %3cpath d='M47.0286358%2c17.8165264 C47.7972055%2c17.8165264 48.5657752%2c17.8165264 49.334345%2c17.9420072 C47.1619591%2c8.07608173 36.6451022%2c0.766826923 24.5911058%2c0.766826923 C11.1332933%2c0.766826923 0.106670673%2c9.99750601 0.106670673%2c21.5338942 C0.106670673%2c28.2000601 3.69855769%2c33.8388522 9.84711538%2c38.0738281 L7.40808293%2c45.3830829 L15.9956731%2c41.1559495 C19.0699519%2c41.7990385 21.5089844%2c42.4342849 24.5832632%2c42.4342849 C25.3518329%2c42.4342849 26.1204026%2c42.4342849 27.0222957%2c42.3088041 C26.51253%2c40.6383413 26.253726%2c38.9757212 26.253726%2c37.1797776 C26.2615685%2c26.5374399 35.3667668%2c17.8165264 47.0286358%2c17.8165264 Z M33.8217849%2c11.1503606 C35.7432091%2c11.1503606 36.8960637%2c12.4286959 36.8960637%2c14.2246394 C36.8960637%2c16.0205829 35.6177284%2c17.2989183 33.8217849%2c17.2989183 C31.9003606%2c17.2989183 30.1044171%2c16.0127404 30.1044171%2c14.2246394 C30.1044171%2c12.3032151 32.0336839%2c11.1503606 33.8217849%2c11.1503606 L33.8217849%2c11.1503606 Z M16.8583534%2c16.8832632 C14.921244%2c16.8832632 13.1096154%2c15.6127704 13.1096154%2c13.8403546 C13.1096154%2c11.9346154 15.0467248%2c10.7974459 16.8583534%2c10.7974459 C18.669982%2c10.7974459 19.9561953%2c12.0679387 19.9561953%2c13.8403546 C19.9640024%2c15.620613 18.669982%2c16.8832632 16.8583534%2c16.8832632 Z' id='%e5%bd%a2%e7%8a%b6' fill-rule='nonzero'%3e%3c/path%3e %3cpath d='M69.3406851%2c36.9209736 C69.3406851%2c27.0472055 59.6002404%2c19.1027043 48.5736178%2c19.1027043 C36.9039063%2c19.1027043 27.6732272%2c27.1805288 27.6732272%2c36.9209736 C27.6732272%2c46.7947416 36.9039063%2c54.7392428 48.5736178%2c54.7392428 C51.0126502%2c54.7392428 53.4438401%2c54.0961538 55.8828726%2c53.4609075 L62.5490385%2c57.1782752 L60.753095%2c51.021875 C65.6233173%2c47.3045072 69.3406851%2c42.4342849 69.3406851%2c36.9209736 L69.3406851%2c36.9209736 Z M41.7741286%2c33.8466947 C40.621274%2c33.8466947 39.3350962%2c32.6938401 39.3350962%2c31.4076623 C39.3350962%2c30.2548077 40.6134315%2c28.9686298 41.7741286%2c28.9686298 C43.5700721%2c28.9686298 44.8484075%2c30.2469651 44.8484075%2c31.4076623 C44.8484075%2c32.6938401 43.6955529%2c33.8466947 41.7741286%2c33.8466947 Z M55.7338642%2c33.2506611 C54.5731671%2c33.2506611 53.2791466%2c32.105649 53.2791466%2c30.8429988 C53.2791466%2c29.6979868 54.5731671%2c28.4353365 55.7338642%2c28.4353365 C57.5454928%2c28.4353365 58.8316707%2c29.7058293 58.8316707%2c30.8429988 C58.8316707%2c32.1134916 57.5454928%2c33.2506611 55.7338642%2c33.2506611 Z' id='%e5%bd%a2%e7%8a%b6' fill-rule='nonzero'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
			text: s$7("share.wx")
		},
		{
			app: p$5.QQ,
			type: u$8.QQ,
			icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_qq%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cdefs%3e %3cpolygon id='path-1' points='0.000124602959 0.090624803 53.6513631 0.090624803 53.6513631 29.4569376 0.000124602959 29.4569376'%3e%3c/polygon%3e %3c/defs%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-303.000000%2c -1957.000000)'%3e %3cg id='icon/shareto/qq' transform='translate(303.000000%2c 1957.000000)'%3e %3crect id='Rectangle' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cg id='%e7%bc%96%e7%bb%84' stroke-width='1' fill-rule='evenodd' transform='translate(33.000000%2c 28.000000)'%3e %3cpath d='M26.8273529%2c63.0679236 C21.2697478%2c63.0679236 16.1687032%2c61.2078471 12.884321%2c58.4295541 C11.2164484%2c58.9278981 9.08284331%2c59.7299363 7.73619363%2c60.7241783 C6.58419363%2c61.5749299 6.7278879%2c62.4421911 6.93558217%2c62.7923567 C7.84707261%2c64.3303949 22.5754293%2c63.7743694 26.8273529%2c63.2953885 L26.8273529%2c63.0679236 Z' id='Fill-1' fill='%23F9AE08'%3e%3c/path%3e %3cpath d='M26.8273529%2c63.0679236 C32.3847541%2c63.0679236 37.4860025%2c61.2078471 40.7703847%2c58.4295541 C42.4382573%2c58.9278981 44.5718624%2c59.7299363 45.9185121%2c60.7241783 C47.0705121%2c61.5749299 46.9268178%2c62.4421911 46.7191236%2c62.7923567 C45.8076331%2c64.3303949 31.0794803%2c63.7743694 26.8273529%2c63.2953885 L26.8273529%2c63.0679236 Z' id='Fill-3' fill='%23F9AE08'%3e%3c/path%3e %3cpath d='M26.8595975%2c29.7603057 C36.0370752%2c29.6979363 43.3921834%2c27.9218344 45.884107%2c27.2402548 C46.4782471%2c27.0778089 46.7960051%2c26.7865478 46.7960051%2c26.7865478 C46.7982471%2c26.7029809 46.8341197%2c25.2927389 46.8341197%2c24.5650955 C46.8341197%2c12.3123567 41.049865%2c0.000713375796 26.8255592%2c0.000101910828 C12.6016611%2c0.000713375796 6.81740637%2c12.3123567 6.81740637%2c24.5650955 C6.81740637%2c25.292535 6.85307516%2c26.7029809 6.8553172%2c26.7865478 C6.8553172%2c26.7865478 7.11396688%2c27.0590573 7.58764841%2c27.1909299 C9.88859108%2c27.8311338 17.3818904%2c29.6965096 26.7919287%2c29.7603057 L26.8595975%2c29.7603057 Z' id='Fill-5' fill='black'%3e%3c/path%3e %3cg transform='translate(0.000000%2c 33.838675)'%3e %3cmask id='mask-2' fill='white'%3e %3cuse xlink:href='%23path-1'%3e%3c/use%3e %3c/mask%3e %3cg id='Clip-8'%3e%3c/g%3e %3cpath d='M51.7984%2c6.12893758 C51.2295338%2c4.29800764 50.4529732%2c2.1629758 49.6666293%2c0.112529936 C49.6666293%2c0.112529936 49.2141452%2c0.0566828025 48.9854573%2c0.123332484 C41.9293554%2c2.17275924 33.3767949%2c3.47925605 26.8593936%2c3.40037707 L26.7919287%2c3.40037707 C20.3110115%2c3.47844076 11.8163363%2c2.18702675 4.78387771%2c0.157370701 C4.51544459%2c0.0799184713 3.98469299%2c0.112529936 3.98469299%2c0.112529936 C3.19834904%2c2.1629758 2.42178854%2c4.29800764 1.85292229%2c6.12893758 C-0.859740127%2c14.8592306 0.0191388535%2c18.4721732 0.68828535%2c18.5528866 C2.12441274%2c18.7267465 6.27809427%2c11.981065 6.27809427%2c11.981065 C6.27809427%2c18.8355873 12.4665274%2c29.3603261 26.6376357%2c29.4569376 C26.7008204%2c29.4565299 26.9505019%2c29.4565299 27.0136866%2c29.4569376 C41.1847949%2c29.3603261 47.373228%2c18.8355873 47.373228%2c11.981065 C47.373228%2c11.981065 51.5269096%2c18.7267465 52.9632408%2c18.5528866 C53.6323873%2c18.4721732 54.5112662%2c14.8592306 51.7984%2c6.12893758' id='Fill-7' fill='black' mask='url(%23mask-2)'%3e%3c/path%3e %3c/g%3e %3cpath d='M21.7642599%2c18.1016662 C19.8348841%2c18.1884943 18.1859669%2c15.9904815 18.0826293%2c13.1962904 C17.9774573%2c10.4000611 19.4557758%2c8.06304204 21.3857631%2c7.97560255 C23.3133045%2c7.88958981 24.9609987%2c10.0867873 25.0657631%2c12.8822013 C25.1711389%2c15.6784306 23.6928204%2c18.0148382 21.7642599%2c18.1016662' id='Fill-9' fill='white'%3e%3c/path%3e %3cpath d='M35.5688968%2c13.1963108 C35.4653554%2c15.9905019 33.8162344%2c18.1885146 31.8872662%2c18.1016866 C29.9585019%2c18.0148586 28.4801834%2c15.678451 28.5855592%2c12.8820178 C28.6903236%2c10.0868076 30.3382217%2c7.88961019 32.2657631%2c7.97562293 C34.1957503%2c8.06306242 35.673865%2c10.4000815 35.5688968%2c13.1963108' id='Fill-11' fill='white'%3e%3c/path%3e %3cpath d='M38.9980331%2c22.0481223 C38.4823643%2c20.9057019 33.2891924%2c19.6330395 26.8600459%2c19.6330395 L26.7911541%2c19.6330395 C20.3620076%2c19.6330395 15.1688357%2c20.9057019 14.6533707%2c22.0481223 C14.6297274%2c22.0974471 14.6156637%2c22.152479 14.6156637%2c22.2105682 C14.6156637%2c22.2929121 14.6433834%2c22.367307 14.6865936%2c22.4302879 C15.1211414%2c23.0637656 20.8876637%2c26.1940586 26.7911541%2c26.1940586 L26.8600459%2c26.1940586 C32.7635363%2c26.1940586 38.5302624%2c23.0639694 38.9648102%2c22.4302879 C39.0080204%2c22.367307 39.0355363%2c22.2925045 39.0355363%2c22.2101605 C39.0355363%2c22.1518675 39.0212688%2c22.0974471 38.9980331%2c22.0481223' id='Fill-13' fill='%23F9AE08'%3e%3c/path%3e %3cpath d='M24.1360713%2c13.237014 C24.2245299%2c14.3411159 23.6189758%2c15.3219057 22.785549%2c15.4291159 C21.9508994%2c15.5363261 21.2034854%2c14.7281732 21.1146191%2c13.6236637 C21.0275873%2c12.5189503 21.6321223%2c11.5381605 22.4641223%2c11.4317656 C23.3001987%2c11.3243516 24.0488357%2c12.1329121 24.1360713%2c13.237014' id='Fill-15' fill='black'%3e%3c/path%3e %3cpath d='M29.4377172%2c13.6062369 C29.6079083%2c13.3007083 30.7696917%2c11.694186 33.1741758%2c12.2791541 C33.8060229%2c12.4328357 34.0978955%2c12.6588739 34.1596535%2c12.7477401 C34.250558%2c12.8792051 34.2754242%2c13.0661096 34.183093%2c13.3180331 C34.0004688%2c13.8167847 33.6231949%2c13.8033325 33.4138701%2c13.7057019 C33.2789401%2c13.642721 31.6041376%2c12.5267975 30.0616153%2c14.1918166 C29.9550166%2c14.3065682 29.7652586%2c14.3457019 29.5854879%2c14.2097529 C29.4055134%2c14.0736 29.3311185%2c13.7978293 29.4377172%2c13.6062369' id='Fill-17' fill='black'%3e%3c/path%3e %3cpath d='M26.8593936%2c36.8374217 L26.7919287%2c36.8374217 C22.3596229%2c36.8908229 16.9852535%2c36.3036127 11.7810752%2c35.2779822 C11.3353172%2c37.8577529 11.0662726%2c41.1003516 11.2974064%2c44.9672561 C11.8809478%2c54.7415236 17.6855847%2c60.8849121 26.6453809%2c60.9743898 L26.8273936%2c60.9743898 L27.0094064%2c60.9743898 C35.9689987%2c60.8849121 41.7736357%2c54.7415236 42.3573809%2c44.9672561 C42.5883108%2c41.0999439 42.3192662%2c37.8573452 41.8737121%2c35.2773707 C36.6683108%2c36.3036127 31.2929223%2c36.8910268 26.8593936%2c36.8374217' id='Fill-19' fill='white'%3e%3c/path%3e %3cpath d='M14.2339057%2c36.0197503 L14.2339057%2c45.6378904 C14.2339057%2c45.6378904 18.6403261%2c46.5269605 23.0548994%2c45.9116229 L23.0548994%2c37.0394701 C20.2582624%2c36.8813045 17.2419057%2c36.528693 14.2339057%2c36.0197503' id='Fill-21' fill='%23EA1C27'%3e%3c/path%3e %3cpath d='M46.7960051%2c26.7864662 C46.7960051%2c26.7864662 38.2253045%2c29.4919949 26.8595975%2c29.5692433 L26.7919287%2c29.5692433 C15.4447694%2c29.4924025 6.88446369%2c26.7956382 6.8553172%2c26.7864662 L3.98469299%2c33.9512051 C11.1647185%2c36.1159949 20.063572%2c37.5109503 26.7919287%2c37.4300331 L26.8593936%2c37.4300331 C33.5879541%2c37.511358 42.4859924%2c36.1161987 49.6666293%2c33.9512051 L46.7960051%2c26.7864662 Z' id='Fill-23' fill='%23EA1C27'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
			text: s$7("share.qq")
		},
		{
			app: p$5.WCOM,
			type: u$8.WX_WORK,
			icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_wechatwork%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cdefs%3e %3cpolygon id='path-1' points='0 0.0580011214 59.1880826 0.0580011214 59.1880826 54.623167 0 54.623167'%3e%3c/polygon%3e %3c/defs%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-1046.000000%2c -1957.000000)'%3e %3cg id='icon/shareto/wechatwork' transform='translate(1046.000000%2c 1957.000000)'%3e %3crect id='bg%e5%a4%87%e4%bb%bd-17' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cg id='%e7%bc%96%e7%bb%84' stroke-width='1' fill-rule='evenodd' transform='translate(24.000000%2c 30.000000)'%3e %3cg transform='translate(0.000000%2c 0.296852)'%3e %3cmask id='mask-2' fill='white'%3e %3cuse xlink:href='%23path-1'%3e%3c/use%3e %3c/mask%3e %3cg id='Clip-2'%3e%3c/g%3e %3cpath d='M13.5075986%2c48.7923156 C15.4064608%2c47.6786759 17.0872056%2c46.7225063 18.7363854%2c45.7149106 C19.8010817%2c45.0644599 20.8494636%2c44.8701049 22.0943284%2c45.2215753 C27.0872647%2c46.6292301 32.105382%2c46.6224915 37.1047022%2c45.2332791 C37.8775115%2c45.0183538 38.2410403%2c44.974021 38.2953037%2c45.9784247 C38.37794%2c47.5169499 39.4734919%2c48.4592877 40.8992345%2c49.3399143 C35.9630442%2c51.0781144 31.1190661%2c51.6328063 26.1559214%2c51.1050687 C24.579802%2c50.9376681 23.0185784%2c50.5993202 21.4644481%2c50.2737402 C20.6646845%2c50.1059849 19.9812502%2c50.2318901 19.2637683%2c50.6003842 C16.9070371%2c51.8104921 14.5198049%2c52.9613714 12.1577538%2c54.1626127 C11.1391636%2c54.6807743 10.1319226%2c54.8804492 9.17468893%2c54.1239545 C8.2607241%2c53.4011527 8.2908704%2c52.394621 8.52743018%2c51.3717748 C8.99132851%2c49.3697059 10.1588769%2c47.1977538 9.72335156%2c45.4155756 C9.31158859%2c43.7298655 7.15275898%2c42.5091178 5.87561992%2c40.9886804 C-3.36120585%2c29.9902468 -1.53859613%2c15.3320526 10.1532023%2c6.35590365 C22.0645367%2c-2.78941924 40.6885651%2c-1.88183833 51.5632215%2c8.47359243 C56.8487542%2c13.5069602 59.5516359%2c19.6748929 59.1487395%2c27.3129008 C57.4885651%2c26.0737107 55.8361933%2c25.7357175 53.925982%2c26.5553421 C53.8937077%2c22.1139057 52.7293513%2c18.0867149 49.9619211%2c14.6847939 C43.8971952%2c7.2301463 35.8268538%2c4.63118073 26.5095197%2c5.47173046 C20.9633102%2c5.97251367 15.9785311%2c8.04445101 11.8644481%2c11.8574257 C2.92802128%2c20.1409192 3.19047141%2c32.3345648 12.5861859%2c40.2038126 C14.4602217%2c41.7731934 14.9049682%2c43.2230531 14.1427989%2c45.3662775 C13.7966484%2c46.3391163 13.4022639%2c47.3385548 13.5075986%2c48.7923156' id='Fill-1' fill='%230079DD' mask='url(%23mask-2)'%3e%3c/path%3e %3c/g%3e %3cpath d='M71.4204345%2c44.1789744 C71.4267947%2c46.208707 70.1446904%2c47.8873238 67.9922447%2c48.2636205 C65.2840432%2c48.7370947 63.0103029%2c49.9433013 61.0571775%2c51.8102438 C60.4914911%2c52.3507492 59.9158741%2c52.7837919 59.2526555%2c52.1336959 C58.5575174%2c51.4523895 59.0806443%2c50.8554928 59.6023526%2c50.3373312 C61.5352623%2c48.4178986 62.6864962%2c46.1218147 63.1933087%2c43.4370208 C63.6121649%2c41.2182533 65.6259376%2c39.7673297 67.6489316%2c40.0198493 C69.876211%2c40.2982592 71.4136722%2c41.9931905 71.4204345%2c44.1789744' id='Fill-3' fill='%230182EF'%3e%3c/path%3e %3cpath d='M55.9248943%2c28.4404788 C57.835815%2c28.5458135 59.3750495%2c29.7406709 59.7396424%2c31.7462864 C60.2404256%2c34.4988207 61.4409576%2c36.8332082 63.3664194%2c38.8217999 C63.9125994%2c39.3860677 64.2860588%2c39.989703 63.6061711%2c40.6305778 C62.9791281%2c41.2217999 62.4028018%2c40.7830826 61.9303916%2c40.3007418 C59.9304507%2c38.2603694 57.4967578%2c37.1438924 54.699536%2c36.5913285 C52.5211999%2c36.1614778 51.2429969%2c34.06897 51.592694%2c31.9608571 C51.9643801%2c29.7193912 53.690167%2c28.3167016 55.9248943%2c28.4404788' id='Fill-5' fill='%232DBB01'%3e%3c/path%3e %3cpath d='M55.6493572%2c59.8800533 C53.6394857%2c59.8796985 52.0474065%2c58.7086035 51.6303236%2c56.623189 C51.0720851%2c53.8298685 49.9070194%2c51.4092981 47.8694843%2c49.4136131 C47.3484853%2c48.903254 47.0917098%2c48.3169972 47.673356%2c47.7307404 C48.2816019%2c47.1182385 48.8497709%2c47.4668716 49.3452342%2c47.9719107 C51.3423378%2c50.0083819 53.755815%2c51.1840875 56.56545%2c51.7157263 C58.6604404%2c52.1125935 60.0461061%2c54.1469366 59.8191222%2c56.1248884 C59.5680213%2c58.311027 57.8255652%2c59.8804079 55.6493572%2c59.8800533' id='Fill-7' fill='%23FA6501'%3e%3c/path%3e %3cpath d='M44.0151204%2c48.334482 C41.9843239%2c48.3025624 40.3216669%2c46.8413536 39.9936043%2c44.7995626 C39.6719255%2c42.7999764 40.6479563%2c40.783721 42.5602956%2c40.3286892 C45.6114556%2c39.6030501 48.3969735%2c38.5301965 50.6075839%2c36.2160248 C51.0643889%2c35.73794 51.6776001%2c35.7194976 52.1556849%2c36.2805734 C52.5933383%2c36.7944791 52.396146%2c37.2895877 51.9790631%2c37.6889375 C49.7677435%2c39.8062716 48.6335333%2c42.4375115 47.9873386%2c45.3922033 C47.5947274%2c47.1882134 45.7760189%2c48.361791 44.0151204%2c48.334482' id='Fill-9' fill='%23FECB01'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
			text: s$7("share.wx-work")
		},
		{
			app: p$5.WX,
			type: u$8.WX_CIRCLE,
			icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_ friendscircle%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-675.000000%2c -1957.000000)'%3e %3cg id='icon/shareto/friendscircle' transform='translate(674.000000%2c 1957.000000)'%3e %3crect id='Rectangle' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cg id='%e7%bc%96%e7%bb%84' stroke-width='1' fill-rule='evenodd' transform='translate(30.000000%2c 30.000000)'%3e %3cpath d='M20.97%2c37.9340898 L24.532%2c41.4950898 L24.9429948%2c41.9135576 L24.949%2c41.9130898 L25%2c41.9640898 L25%2c42 L25.035%2c41.9990898 L40.9678506%2c57.9318519 C37.5706549%2c59.2668574 33.8709448%2c60 30%2c60 C26.8534464%2c60 23.8200359%2c59.515577 20.9702787%2c58.6172411 L20.97%2c37.9340898 Z' id='%e8%b7%af%e5%be%84' fill='%2365CF21'%3e%3c/path%3e %3cpath d='M17.97%2c29.2750898 L17.9704119%2c57.4907912 C11.6947792%2c54.7407545 6.54118199%2c49.9048104 3.38664796%2c43.8599869 L17.97%2c29.2750898 Z' id='%e8%b7%af%e5%be%84' fill='%2399D120'%3e%3c/path%3e %3cpath d='M29.278%2c41.9990898 L57.5034509%2c42.0006568 C54.7587962%2c48.2820901 49.9253208%2c53.4419944 43.8810397%2c56.6023548 L29.278%2c41.9990898 Z' id='%e8%b7%af%e5%be%84' fill='%2302B1FE'%3e%3c/path%3e %3cpath d='M22.003%2c20.9990898 L2.05909358%2c40.9447812 C0.729828029%2c37.5539083 3.05533376e-13%2c33.8621844 3.05533376e-13%2c30 C3.05533376e-13%2c26.8644676 0.481035479%2c23.8412871 1.37333449%2c21.0002304 L22.003%2c20.9990898 Z' id='%e8%b7%af%e5%be%84' fill='%23FFC817'%3e%3c/path%3e %3cpath d='M57.9452303%2c19.0662552 C59.2717546%2c22.4541016 60%2c26.1420054 60%2c30 C60%2c33.1358998 59.5188518%2c36.1594213 58.6263519%2c39.0007682 L38.011%2c38.9990898 L57.9452303%2c19.0662552 Z' id='%e8%b7%af%e5%be%84' fill='%235282EF'%3e%3c/path%3e %3cpath d='M42.0425521%2c2.51489338 C48.3157874%2c5.26742914 53.466688%2c10.1047021 56.6185831%2c16.1500417 L42.042%2c30.7260898 L42.0425521%2c2.51489338 Z' id='%e8%b7%af%e5%be%84' fill='%236367F0'%3e%3c/path%3e %3cpath d='M30%2c8.17124146e-14 C33.1513442%2c8.17124146e-14 36.1892005%2c0.48589922 39.0427361%2c1.38686485 L39.042%2c21.9620898 L19.1154433%2c2.03556014 C22.4897867%2c0.721216564 26.1606688%2c8.17124146e-14 30%2c8.17124146e-14 Z' id='%e8%b7%af%e5%be%84' fill='%23FA5452'%3e%3c/path%3e %3cpath d='M16.1951978%2c3.35792243 L30.837%2c17.9990898 L25.297%2c17.9990898 L25.1501255%2c17.8529438 L25.003%2c17.9990898 L2.49611307%2c18.0003411 C5.18331817%2c11.8497753 9.87318238%2c6.77440814 15.7414798%2c3.59846542 L16.1951978%2c3.35792243 Z' id='%e8%b7%af%e5%be%84' fill='%23FF7612'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
			text: s$7("share.wx-moments")
		}
	].concat(e$7(!ua.isIOS || ua.isTencentDocsAppVersionAboveOrEqual("3.9.15") ? [{
		app: p$5.QQ,
		type: u$8.QZONE,
		icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_qzone%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-1417.000000%2c -1957.000000)'%3e %3cg id='icon/shareto/qzone' transform='translate(1417.000000%2c 1957.000000)'%3e %3crect id='Rectangle' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cpath d='M70.9900214%2c48.2815817 C70.6551734%2c48.2190885 70.3658387%2c48.0067092 70.2024483%2c47.7037637 L60.9599939%2c30.5440082 C60.7663817%2c30.1838179 60.3827694%2c30.0030514 60%2c30 C59.6172306%2c30.0030514 59.2334979%2c30.1838179 59.0400061%2c30.5440082 L49.7975517%2c47.7037637 C49.6341613%2c48.0067092 49.3448266%2c48.2190885 49.0099786%2c48.2815817 L29.8542901%2c51.8548016 C29.0354116%2c52.007617 28.7153735%2c53.0242301 29.2956081%2c53.6296331 L43.2295465%2c68.160768 C43.4762576%2c68.4179422 43.5896796%2c68.7775223 43.5362195%2c69.13222 L40.3523342%2c88.5679731 C40.2262695%2c89.4035756 41.0715169%2c90.0431545 41.8259784%2c89.6832083 L59.5154879%2c81.1674105 C59.6688846%2c81.0942984 59.8345627%2c81.0579254 60%2c81.0584136 C60.1654373%2c81.0579254 60.3311154%2c81.0942984 60.4845121%2c81.1674105 L78.1740216%2c89.6832083 C78.9284831%2c90.0431545 79.7736101%2c89.4035756 79.6476658%2c88.5679731 L77.2501494%2c73.9344323 C80.2657078%2c71.770483 81.7323684%2c69.9036205 81.9067157%2c69.626429 C82.1067094%2c69.3087145 81.9779958%2c69.0375038 81.9779958%2c69.0375038 C77.1195094%2c71.0844003 65.3144625%2c74.5260428 50.8169055%2c74.0239001 C49.0663285%2c73.9632377 47.3244206%2c73.7663597 46.348172%2c73.5866918 C45.3000412%2c73.3937196 45.1315938%2c72.2516318 45.7721516%2c71.706403 C49.8395732%2c68.244133 63.3752098%2c58.43331 63.5847156%2c58.2671904 C63.8311859%2c58.071655 63.843708%2c57.7857974 63.619272%2c57.5911164 C63.3052542%2c57.3186851 55.9057279%2c54.6744413 44.577728%2c56.4309642 C43.8037608%2c56.5509463 43.3489888%2c55.480384 44.1067013%2c55.0741781 C47.2985334%2c53.3628164 54.5747644%2c51.2485443 61.9813946%2c51.3098169 C67.156909%2c51.3525369 71.6273282%2c52.9237772 72.8937543%2c53.8720383 C73.5541791%2c54.3664914 73.4108964%2c54.9748237 72.8678671%2c55.4408375 C70.0815611%2c57.8316908 62.1769333%2c63.3882156 59.4161532%2c65.5343446 C59.0914193%2c65.7867586 59.2106209%2c66.1768529 59.5628073%2c66.3133126 C64.3045003%2c68.1510035 71.4057819%2c68.723573 76.4040593%2c68.7692224 L90.7043919%2c53.6296331 C91.2846265%2c53.0242301 90.9645884%2c52.007617 90.1457099%2c51.8548016 L70.9900214%2c48.2815817 Z' id='Fill-19' fill='%23FFB600' fill-rule='evenodd'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
		text: s$7("share.qqzone")
	}] : []), [{
		type: u$8.CLIPBOARD,
		icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='120px' height='120px' viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3eicon_shareto_link%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='%e8%a7%84%e5%88%99' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%85%be%e8%ae%af%e6%96%87%e6%a1%a3%e5%9b%be%e6%a0%87%e5%ba%93' transform='translate(-489.000000%2c -2150.000000)'%3e %3cg id='icon/shareto/link' transform='translate(489.000000%2c 2150.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2%e5%a4%87%e4%bb%bd-62' x='0' y='0' width='120' height='120' rx='16'%3e%3c/rect%3e %3cg id='%e7%bc%96%e7%bb%84-10' stroke-width='1' fill-rule='evenodd' transform='translate(60.000000%2c 60.000000) rotate(-315.000000) translate(-60.000000%2c -60.000000) translate(46.000000%2c 29.000000)' fill='%23464D5A'%3e %3cpath d='M14%2c24 C21.6275002%2c24 27.8303269%2c30.0997524 27.996578%2c37.687355 L28%2c38 L28%2c48 C28%2c55.7319865 21.7319865%2c62 14%2c62 C6.37249981%2c62 0.169673114%2c55.9002476 0.00342204548%2c48.312645 L1.81776476e-12%2c48 L1.81947926e-12%2c41 L4%2c41 L4%2c48 C4%2c53.5228475 8.4771525%2c58 14%2c58 C19.4292399%2c58 23.8479317%2c53.6733292 23.9961582%2c48.2799048 L24%2c48 L24%2c38 C24%2c32.5707601 19.6733292%2c28.1520683 14.2799048%2c28.0038418 L14%2c28 L14%2c24 Z M14%2c-1.8189894e-12 C21.6275002%2c-1.8189894e-12 27.8303269%2c6.09975237 27.996578%2c13.687355 L28%2c14 L28%2c21 L24%2c21 L24%2c14 C24%2c8.4771525 19.5228475%2c4 14%2c4 C8.57076009%2c4 4.15206828%2c8.32667079 4.0038418%2c13.7200952 L4%2c14 L4%2c24 C4%2c29.4292399 8.32667079%2c33.8479317 13.7200952%2c33.9961582 L14%2c34 L14%2c38 C6.37249981%2c38 0.169673114%2c31.9002476 0.00342204548%2c24.312645 L0%2c24 L0%2c14 C0%2c6.2680135 6.2680135%2c-1.8189894e-12 14%2c-1.8189894e-12 Z' id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
		text: s$7("share.clipboard")
	}]);
	e$12(".ai-search-share-panel {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-lv1-medium, #f3f5f7);\n  z-index: 100;\n}\n.ai-search-share-panel__titlebar {\n  height: 44px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 24px;\n  background-color: var(--bg-lv1-default, #ffffff);\n}\n.ai-search-share-panel__titlebar-back {\n  position: absolute;\n  left: 12px;\n  top: 6px;\n  height: 32px;\n  width: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ai-search-share-panel__titlebar-back-icon {\n  width: 24px;\n  height: 24px;\n}\n.ai-search-share-panel__titlebar-back-icon:active {\n  background: var(--tsp-fill-strong, rgba(61, 82, 102, 0.12));\n}\n.ai-search-share-panel__titlebar-title {\n  color: var(--text-ultrastrong);\n}\n.ai-search-share-panel__head {\n  display: flex;\n  gap: 12px;\n  padding: 0 24px;\n  height: 72px;\n  align-items: center;\n  background-color: var(--bg-lv1-default, #ffffff);\n}\n.ai-search-share-panel__head-share-icon {\n  width: 48px;\n  height: 48px;\n}\n.ai-search-share-panel__head-share-info {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 4px;\n}\n.ai-search-share-panel__head-share-info-title {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 17px;\n  font-weight: 400;\n  height: 24px;\n  line-height: 24px;\n}\n.ai-search-share-panel__head-share-info-sub {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  height: 16px;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  font-weight: 400;\n}\n.ai-search-share-panel__chanel-line {\n  margin-top: 12px;\n  padding: 0 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.ai-search-share-panel__chanel-line-content {\n  padding: 8px 16px;\n  background-color: var(--bg-lv1-default, #ffffff);\n  border-radius: 8px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.ai-search-share-panel__chanel-line-content-title {\n  height: 36px;\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-search-share-panel__share-list {\n  width: 100%;\n  display: flex;\n  gap: 32px;\n}\n.ai-search-share-panel__share-list-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  justify-content: center;\n}\n.ai-search-share-panel__share-list-item-icon {\n  width: 56px;\n  height: 56px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  border-radius: 8px;\n}\n.ai-search-share-panel__share-list-item-icon:active {\n  background: var(--tsp-fill-strong, rgba(61, 82, 102, 0.12));\n}\n.ai-search-share-panel__share-list-item-icon-img {\n  width: 100%;\n  height: 100%;\n}\n.ai-search-share-panel__share-list-item-icon-img.icon-CLIPBOARD {\n  filter: var(--icon-invert);\n}\n.ai-search-share-panel__share-list-item-label {\n  text-align: center;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n}\n");
	Nn = function() {
		var e = r$9(s$3.mark((function e(t) {
			var r, n;
			return s$3.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: return e.next = 2, fetch(t);
					case 2: return r = e.sent, e.next = 5, r.blob();
					case 5: return n = e.sent, e.abrupt("return", new Promise((function(e, t) {
						var r = new FileReader();
						r.onloadend = function() {
							e(r.result);
						}, r.onerror = t, r.readAsDataURL(n);
					})));
					case 7:
					case "end": return e.stop();
				}
			}), e);
		})));
		return function(t) {
			return e.apply(this, arguments);
		};
	}();
	Ln = function(e) {
		var t = e.shareUrl, r = e.shareTitle, n = e.shareDesc, o = e.visible, i = e.onClose, a = e.shareTime, u = e.userName, d = useWindowSize().width, b = (0, import_react$16.useCallback)(function() {
			var e = r$9(s$3.mark((function e(o) {
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.t0 = t, e.t1 = r, e.t2 = n, e.next = 5, Nn(Re());
						case 5: return e.t3 = e.sent, e.t4 = Re(), e.t5 = o, e.t6 = "pages/webview/webview?url=".concat(encodeURIComponent(t)), e.abrupt("return", {
							url: e.t0,
							title: e.t1,
							desc: e.t2,
							image: e.t3,
							image_url: e.t4,
							shareType: e.t5,
							mini_program_path: e.t6
						});
						case 10:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function(t) {
				return e.apply(this, arguments);
			};
		}(), [
			t,
			r,
			n
		]), g = function() {
			var e = r$9(s$3.mark((function e(r) {
				var n;
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (r.type !== u$8.CLIPBOARD) {
								e.next = 5;
								break;
							}
							r$14(t), On.show({
								message: s$7("toast.copy-success"),
								type: "success",
								duration: 2e3
							}), e.next = 9;
							break;
						case 5: return e.next = 7, b(r.type);
						case 7: n = e.sent, P$5(n);
						case 9: i?.();
						case 10:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function(t) {
				return e.apply(this, arguments);
			};
		}(), k = 1 + Math.floor((d - 56 - 56) / 88), j = chunk(Tn, k);
		return import_react$16.createElement(AnimatePresence, null, o && import_react$16.createElement(motion.div, {
			className: "ai-search-share-panel",
			initial: { x: "100%" },
			animate: { x: 0 },
			exit: { x: "100%" },
			transition: {
				duration: .2,
				ease: "easeIn"
			}
		}, import_react$16.createElement("div", { className: "ai-search-share-panel__titlebar" }, import_react$16.createElement("div", {
			className: "ai-search-share-panel__titlebar-back",
			onClick: i
		}, import_react$16.createElement(L$3, { className: "ai-search-share-panel__titlebar-back-icon" })), import_react$16.createElement("span", { className: "ai-search-share-panel__titlebar-title" }, s$7("universalSearchActions.share"))), import_react$16.createElement("div", { className: "ai-search-share-panel__head" }, import_react$16.createElement(T$1, {
			viewBox: "0 0 32 32",
			className: "ai-search-share-panel__head-share-icon"
		}), import_react$16.createElement("div", { className: "ai-search-share-panel__head-share-info" }, import_react$16.createElement("div", { className: "ai-search-share-panel__head-share-info-title" }, r), import_react$16.createElement("div", { className: "ai-search-share-panel__head-share-info-sub" }, import_react$16.createElement("span", null, u), import_react$16.createElement(mr, {
			orientation: "vertical",
			style: { margin: 0 }
		}), import_react$16.createElement("span", null, (0, import_dayjs_min.default)(Number(a)).format("YYYY-MM-DD HH:mm"))))), import_react$16.createElement("div", { className: "ai-search-share-panel__chanel-line" }, import_react$16.createElement("div", { className: "ai-search-share-panel__chanel-line-content" }, import_react$16.createElement("div", { className: "ai-search-share-panel__chanel-line-content-title" }, s$7("share.to")), j.map((function(e, t) {
			return import_react$16.createElement("div", {
				className: "ai-search-share-panel__share-list",
				key: t,
				style: Mn({ marginBottom: 6 }, 0 !== t ? { marginTop: 12 } : {})
			}, e.map((function(e) {
				return import_react$16.createElement("div", {
					className: "ai-search-share-panel__share-list-item",
					key: e.type,
					onClick: function() {
						return g(e);
					}
				}, import_react$16.createElement("div", { className: "ai-search-share-panel__share-list-item-icon" }, import_react$16.createElement("img", {
					className: "ai-search-share-panel__share-list-item-icon-img icon-".concat(e.type),
					src: e.icon
				})), import_react$16.createElement("div", { className: "ai-search-share-panel__share-list-item-label" }, e.text));
			})));
		}))))));
	};
	Dn = function(t) {
		var r = "ai-search-share-panel", n = document.getElementById(r);
		n || ((n = document.createElement("div")).id = r, document.body.appendChild(n));
		var o = function() {
			var e;
			null === (e = t.onClose) || void 0 === e || e.call(t), i(Mn(Mn({}, t), {}, { visible: !1 }));
		}, i = function(t) {
			import_react_dom$1.render(import_react$16.createElement(Ln, n$11({}, t, { onClose: o })), n);
		};
		i(Mn(Mn({}, t), {}, { visible: !0 }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/index-41de3dd7.js
var import_react$14, x$1, u$3, v$1, b$4, w$2, C$1, E;
var init_index_41de3dd7 = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$4();
	init_esm$2();
	init_style_inject_es_3984fa0f();
	init_toConsumableArray_d8de034d();
	init_index_9822dcca();
	init_slicedToArray_e715395f();
	init_esm$6();
	init_lodash();
	x$1 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.5126 4.65193C5.86662 4.65619 5.41828 4.8341 5.12839 5.12399C4.8385 5.41389 4.66058 5.86223 4.65633 6.5082C4.65205 7.15795 4.8262 7.96163 5.19137 8.87455C5.32538 9.2096 5.48356 9.55544 5.66493 9.90924C5.53315 10.3884 5.265 10.8091 4.90421 11.1277C4.55475 10.5166 4.26196 9.91677 4.03077 9.33879C3.62817 8.3323 3.40067 7.36301 3.40635 6.49997C3.41206 5.63316 3.65572 4.8289 4.24451 4.24011C4.83329 3.65132 5.63755 3.40767 6.50437 3.40196C7.3674 3.39628 8.33669 3.62378 9.34319 4.02638C11.3584 4.83247 13.6396 6.38734 15.735 8.48275C17.8304 10.5782 19.3853 12.8593 20.1914 14.8746C20.594 15.8811 20.8215 16.8503 20.8158 17.7134C20.8101 18.5802 20.5664 19.3844 19.9776 19.9732C19.3888 20.562 18.5846 20.8057 17.7178 20.8114C16.8547 20.8171 15.8854 20.5896 14.8789 20.187C13.713 19.7206 12.4581 19.0036 11.2016 18.0763C11.4213 17.7082 11.7319 17.4017 12.1031 17.1869C13.2293 18.0012 14.3351 18.6231 15.3432 19.0264C16.2561 19.3915 17.0598 19.5657 17.7095 19.5614C18.3555 19.5572 18.8039 19.3792 19.0937 19.0894C19.3836 18.7995 19.5616 18.3511 19.5658 17.7051C19.5701 17.0554 19.3959 16.2517 19.0308 15.3388C18.3013 13.5152 16.8562 11.3717 14.8511 9.36663C12.846 7.36154 10.7025 5.91641 8.87895 5.18697C7.96603 4.8218 7.16235 4.64765 6.5126 4.65193ZM8.5445 10.2052C8.4918 9.94169 8.11508 9.94169 8.06238 10.2052C7.67312 12.1515 6.15175 13.6729 4.20543 14.0621C3.94194 14.1148 3.94194 14.4916 4.20543 14.5443C6.15175 14.9335 7.67312 16.4549 8.06238 18.4012C8.11508 18.6647 8.4918 18.6647 8.5445 18.4012C8.93376 16.4549 10.4551 14.9335 12.4014 14.5443C12.6649 14.4916 12.6649 14.1148 12.4014 14.0621C10.4551 13.6729 8.93376 12.1515 8.5445 10.2052Z' fill='%23454D5A'/%3e%3c/svg%3e";
	e$12(".ai-sdk-commin-ai-search-import-card-file-list-wrapper {\n  max-height: 190px;\n  overflow: hidden;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: all var(--duration) linear;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 0;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file > span {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n");
	u$3 = "ai-sdk-commin-ai-search-import-card-file-list";
	v$1 = function(i) {
		var a = i.fileList, r = (0, import_react$14.useRef)(null);
		return (0, import_react$14.useEffect)((function() {
			var e = 1 * a.length, n = 28 * (a.length - 7);
			r.current && (r.current.style.setProperty("--duration", "".concat(e, "s")), setTimeout((function() {
				r.current && (r.current.style.transform = "translateY(-".concat(n, "px)"));
			}), 1e3));
		}), [a]), import_react$14.createElement("div", { className: "".concat(u$3, "-wrapper") }, import_react$14.createElement("div", {
			className: "".concat(u$3, "-content"),
			ref: r
		}, a.map((function(n) {
			var t = n.iconType, i = n.fileId, a = n.fileName;
			return import_react$14.createElement("div", {
				className: "".concat(u$3, "-file"),
				key: i
			}, import_react$14.createElement("img", { src: W$4[t] || W$4.default }), import_react$14.createElement("span", null, a));
		}))));
	};
	b$4 = function(e) {
		var r = t$9((0, import_react$14.useState)(0), 2), o = r[0], l = r[1], x = t$9((0, import_react$14.useState)([]), 2), u = x[0], v = x[1], w = t$9((0, import_react$14.useState)(0), 2), C = w[0], E = w[1], y = (0, import_react$14.useRef)(null), N = (0, import_react$14.useRef)(!1), H = l$10().getImportStatus;
		return (0, import_react$14.useEffect)((function() {
			return y.current = setInterval(r$9(s$3.mark((function n() {
				var t, i, a, r, o, c, p;
				return s$3.wrap((function(n) {
					for (;;) switch (n.prev = n.next) {
						case 0:
							if (!N.current) {
								n.next = 2;
								break;
							}
							return n.abrupt("return");
						case 2: return N.current = !0, n.next = 5, H();
						case 5: t = n.sent, i = t.completed, a = t.status, r = t.importedFileNames, o = void 0 === r ? [] : r, c = t.importedTotal, N.current = !1, l(null != i ? i : 0), v((function(e) {
							return uniqBy([].concat(e$7(e), e$7(o)), "fileId");
						})), E(null != c ? c : 0), a === s$10.success && (l(100), y.current && clearTimeout(y.current), null == e || null === (p = e.onFinished) || void 0 === p || p.call(e));
						case 16:
						case "end": return n.stop();
					}
				}), n);
			}))), 1e3), function() {
				y.current && clearTimeout(y.current);
			};
		}), []), {
			progress: o,
			files: u,
			importedTotal: C
		};
	};
	w$2 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.75 11.25V7H11.25V12.75H16V11.25H12.75Z' fill='%23454D5A'/%3e%3c/svg%3e";
	e$12(".ai-component-mobile-ai-search-import-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-top: 8px;\n}\n.ai-component-mobile-ai-search-import-content {\n  height: 432px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-mobile-ai-search-import-title {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  justify-content: space-between;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 22px;\n}\n.ai-component-mobile-ai-search-import-mini_wrapper {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n.ai-component-mobile-ai-search-import-mini_size {\n  display: flex;\n  gap: 2px;\n  padding: 4px 6px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  cursor: pointer;\n}\n.ai-component-mobile-ai-search-import-mini_size > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-mobile-ai-search-import-mini_size:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-mobile-ai-search-import-content_wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ai-component-mobile-ai-search-import-subtitle {\n  display: flex;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-component-mobile-ai-search-import-subtitle > img {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-mobile-ai-search-import-file_content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-left: 10px;\n  padding-left: 18px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n  font-size: 12px;\n  line-height: 16px;\n}\n.ai-component-mobile-ai-search-import-progress_wrapper {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-mobile-ai-search-import-progress {\n  flex: 1;\n  height: 4px;\n  border-radius: 4px;\n  background: var(--tsp-fill-medium, rgba(51, 77, 102, 0.08));\n  overflow: hidden;\n}\n.ai-component-mobile-ai-search-import-bar {\n  height: 100%;\n  background: var(--intent-accent-default, #1E6FFF);\n  transition: width 0.3s ease;\n}\n.ai-component-mobile-ai-search-import-files {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  height: 190px;\n}\n.ai-component-mobile-ai-search-import-file {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 0;\n}\n.ai-component-mobile-ai-search-import-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-mobile-ai-search-import-file > span {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-mobile-ai-search-import-line {\n  margin-left: 10px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n  height: 24px;\n}\n.ai-component-mobile-ai-search-import-vip {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 4px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-size: 12px;\n  line-height: 16px;\n  cursor: pointer;\n}\n.ai-component-mobile-ai-search-import-vip > img {\n  width: 16px;\n  height: 16px;\n}\n");
	C$1 = "ai-component-mobile-ai-search-import";
	E = function(n) {
		var i = b$4({ onFinished: n.onStartAISearch }), o = i.progress, c = i.files;
		(0, import_react$14.useEffect)((function() {
			v$4.aiLoadingShow();
		}), []);
		return import_react$14.createElement(m$7, {
			title: s$7("search-import-card.card-title"),
			onExpandChange: function(e) {
				var t;
				e && (null === (t = n.onStartAISearch) || void 0 === t || t.call(n));
			}
		}, import_react$14.createElement("div", { className: "".concat(C$1, "-wrapper") }, import_react$14.createElement("div", { className: "".concat(C$1, "-content") }, import_react$14.createElement("div", { className: "".concat(C$1, "-content_wrapper") }, import_react$14.createElement("div", { className: "".concat(C$1, "-subtitle") }, import_react$14.createElement("img", { src: x$1 }), import_react$14.createElement("span", null, s$7("search-import-card.vip-importing-tips"))), import_react$14.createElement("div", { className: "".concat(C$1, "-file_content") }, import_react$14.createElement("div", { className: "".concat(C$1, "-progress_wrapper") }, import_react$14.createElement("div", { className: "".concat(C$1, "-progress") }, import_react$14.createElement("div", {
			className: "".concat(C$1, "-bar"),
			style: { width: "".concat(o, "%") }
		})), import_react$14.createElement("span", null, o, "%")), import_react$14.createElement(v$1, { fileList: c }), import_react$14.createElement("div", { className: "".concat(C$1, "-file") }, import_react$14.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.4822 6.25L17.75 9.51777V17.75H6.25V6.25H14.4822ZM5 6C5 5.44772 5.44772 5 6 5H14.5858C14.851 5 15.1054 5.10536 15.2929 5.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V10H20V15H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V15H4V10H5V6ZM13.75 10H15V13H13.75V10ZM10.25 10H9V13H10.25V10Z' fill='%23454D5A'/%3e%3c/svg%3e" }), import_react$14.createElement("span", null, s$7("search-import-card.analysis-tips")))), import_react$14.createElement("div", { className: "".concat(C$1, "-subtitle") }, import_react$14.createElement("img", { src: w$2 }), import_react$14.createElement("span", null, s$7("search-import-card.indexing-tips"))), import_react$14.createElement("div", { className: "".concat(C$1, "-line") }), import_react$14.createElement("div", { className: "".concat(C$1, "-subtitle") }, import_react$14.createElement("img", { src: w$2 }), import_react$14.createElement("span", null, s$7("search-import-card.generate-tips")))))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/search-import-card/index.js
var import_react$13, s$1, m;
var init_search_import_card = __esmMin((() => {
	init_slicedToArray_e715395f();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_index_41de3dd7();
	init_style_inject_es_3984fa0f();
	e$12(".ai-sdk-commin-ai-search-import-mini-card-wrapper {\n  position: absolute;\n  bottom: 112px;\n  right: 0;\n  width: 208px;\n  padding: 12px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 16px;\n  background: var(--bg-lv4-default, #fff);\n}\n.ai-sdk-commin-ai-search-import-mini-card-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-mini-card-title-right {\n  display: flex;\n  gap: 4px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.ai-sdk-commin-ai-search-import-mini-card-arrow {\n  width: 24px;\n  height: 24px;\n  transition: all 0.3s ease-in-out;\n}\n.ai-sdk-commin-ai-search-import-mini-card-arrow-expand {\n  transform: rotate(180deg);\n}\n.ai-sdk-commin-ai-search-import-mini-card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 8px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-subtitle {\n  display: flex;\n  gap: 8px;\n  font-size: 14px;\n  line-height: 20px;\n  font-weight: 600;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-mini-card-subtitle > img {\n  width: 20px;\n  height: 20px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-files {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 4px 0 4px 18px;\n  margin-left: 10px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n}\n.ai-sdk-commin-ai-search-import-mini-card-progress_wrapper {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-sdk-commin-ai-search-import-mini-card-progress {\n  flex: 1;\n  height: 4px;\n  border-radius: 4px;\n  background: var(--tsp-fill-medium, rgba(51, 77, 102, 0.08));\n  overflow: hidden;\n}\n.ai-sdk-commin-ai-search-import-mini-card-bar {\n  height: 100%;\n  background: var(--intent-accent-default, #1E6FFF);\n  transition: width 0.3s ease;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file {\n  display: flex;\n  align-items: center;\n  padding: 2px 0;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file-text {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n");
	s$1 = "ai-sdk-commin-ai-search-import-mini-card";
	m = function(o) {
		var m = o.onFinished, d = t$9((0, import_react$13.useState)(!1), 2), p = d[0], h = d[1], x = b$4({ onFinished: function() {
			return null == m ? void 0 : m();
		} }), g = x.progress, f = x.files;
		return import_react$13.createElement("div", { className: "".concat(s$1, "-wrapper") }, import_react$13.createElement("div", { className: "".concat(s$1, "-title") }, import_react$13.createElement("span", null, s$7("search-import-card.mini-card.init-tips")), import_react$13.createElement("span", {
			className: "".concat(s$1, "-title-right"),
			onClick: function() {
				return h(!p);
			}
		}, import_react$13.createElement("span", null, p ? s$7("search-import-card.mini-card.collapse") : "".concat(g, "%")), import_react$13.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 15.625C12.1658 15.625 12.3247 15.5592 12.4419 15.4419L17.4419 10.4419L16.5581 9.55806L12 14.1161L7.44194 9.55806L6.55806 10.4419L11.5581 15.4419C11.6753 15.5592 11.8342 15.625 12 15.625Z' fill='%23454D5A' style='fill:%23454D5A%3bfill:color(display-p3 0.2706 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e",
			className: "".concat(s$1, "-arrow ").concat(p ? "".concat(s$1, "-arrow-expand") : "")
		}))), p ? import_react$13.createElement("div", { className: "".concat(s$1, "-content") }, import_react$13.createElement("div", { className: "".concat(s$1, "-subtitle") }, import_react$13.createElement("img", { src: x$1 }), import_react$13.createElement("span", null, s$7("search-import-card.mini-card.indexing-tips"))), import_react$13.createElement("div", { className: "".concat(s$1, "-files") }, import_react$13.createElement("div", { className: "".concat(s$1, "-progress_wrapper") }, import_react$13.createElement("div", { className: "".concat(s$1, "-progress") }, import_react$13.createElement("div", {
			className: "".concat(s$1, "-bar"),
			style: { width: "".concat(g, "%") }
		})), import_react$13.createElement("span", null, g, "%")), import_react$13.createElement(v$1, { fileList: f }))) : null);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/chunks/arrow_heavy_down_12-06baaeac.js
function r$7(t) {
	return r$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, r$7(t);
}
function e$4() {
	return e$4 = Object.assign ? Object.assign.bind() : function(t) {
		for (var r = 1; r < arguments.length; r++) {
			var e = arguments[r];
			for (var n in e) ({}).hasOwnProperty.call(e, n) && (t[n] = e[n]);
		}
		return t;
	}, e$4.apply(null, arguments);
}
function n$5(t, e, n) {
	return (e = function(t) {
		var e = function(t, e) {
			if ("object" != r$7(t) || !t) return t;
			var n = t[Symbol.toPrimitive];
			if (void 0 !== n) {
				var o = n.call(t, e || "default");
				if ("object" != r$7(o)) return o;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === e ? String : Number)(t);
		}(t, "string");
		return "symbol" == r$7(e) ? e : e + "";
	}(e)) in t ? Object.defineProperty(t, e, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = n, t;
}
var import_react$12, o$4;
var init_arrow_heavy_down_12_06baaeac = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	o$4 = function(r) {
		return import_react$12.createElement("svg", e$4({
			width: 12,
			height: 12,
			viewBox: "0 0 12 12",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, r), import_react$12.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5.55811 8.44194L2.55811 5.44194L3.44199 4.55806L6.00005 7.11612L8.55811 4.55806L9.44199 5.44194L6.44199 8.44194C6.19791 8.68602 5.80218 8.68602 5.55811 8.44194Z",
			fill: "#454D5A",
			style: n$5(n$5({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/model-selector/index.js
var import_react$11, import_classnames$7, u$2, b, f$1;
var init_model_selector = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$4();
	init_arrow_heavy_down_12_06baaeac();
	init_esm$9();
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-model-selector-button {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 12px;\n  line-height: 20px;\n  font-size: 14px;\n  font-weight: 400;\n  cursor: pointer;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.48));\n  background-color: var(--tsp-fill-material, rgba(255, 255, 255, 0.88));\n}\n.ai-component-mobile-model-selector-button-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-mobile-model-selector-button-arrow {\n  width: 12px;\n  height: 12px;\n}\n.ai-component-mobile-model-selector-button-arrow path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-mobile-model-selector-button-arrow.up {\n  transform: rotate(180deg);\n}\n.ai-component-mobile-model-selector-button-arrow.down {\n  transform: rotate(0deg);\n}\n.ai-component-mobile-model-selector-border {\n  border: 0.5px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 20px;\n  background: var(--bg-lv4-default, #fff);\n}\n");
	u$2 = "ai-component-mobile-model-selector";
	b = [
		{
			type: E$5.DEEPSEEK_V3_1_THINKING,
			query: "4",
			name: s$7("searchBox.deepSeekThinking"),
			desc: s$7("searchBox.deepSeekThinkingTip")
		},
		{
			type: E$5.DEEPSEEK_V3_1,
			query: "2",
			name: s$7("searchBox.deepSeek"),
			desc: s$7("searchBox.deepSeekTip")
		},
		{
			type: E$5.HUNYUAN,
			query: "1",
			name: s$7("searchBox.hunyuan"),
			desc: s$7("searchBox.hunyuanTip")
		},
		{
			type: E$5.HUNYUANT1,
			query: "3",
			name: s$7("searchBox.hunyuanT1"),
			desc: s$7("searchBox.hunyuanT1Tip")
		}
	];
	f$1 = function(a) {
		var i, d = a.disabled, f = void 0 !== d && d, h = a.onModelChange, y = a.modelList, x = void 0 === y ? b : y, g = a.initialType, v = a.bordered, k = void 0 === v || v, w = a.className, T = function(e) {
			return x.find((function(n) {
				return n.type === e;
			}));
		}, N = t$9((0, import_react$11.useState)(!1), 2), _ = N[0], j = N[1], q = _$5() || "", B = T(g || q), A = t$9((0, import_react$11.useState)((null == B ? void 0 : B.type) || x[0].type), 2), I = A[0], C = A[1];
		(0, import_react$11.useEffect)((function() {
			if (I !== g) {
				var e = T(I);
				h?.({
					type: e.type,
					query: e.query
				});
			}
		}), []);
		var U = function(e) {
			if (e !== I) {
				C(e);
				var n = T(e);
				h?.({
					type: n.type,
					query: n.query
				}), localStorage.setItem(s$9, e);
			}
		};
		return import_react$11.createElement("button", {
			className: (0, import_classnames$7.default)("".concat(u$2, "-button"), w, e$14(e$14({}, "".concat(u$2, "-disable"), f), "".concat(u$2, "-border"), k)),
			onClick: function() {
				f || (j(!0), ActionSheet_default.show({
					options: x.map((function(e) {
						return {
							id: e.type,
							title: e.name,
							description: e.desc
						};
					})),
					onClickAction: U,
					selectedIds: [I],
					onCancel: function() {
						return j(!1);
					}
				}));
			}
		}, import_react$11.createElement("div", { className: "".concat(u$2, "-button-text") }, null === (i = x.find((function(e) {
			return e.type === I;
		}))) || void 0 === i ? void 0 : i.name), import_react$11.createElement(o$4, { className: "".concat(u$2, "-button-arrow ").concat(_ ? "up" : "down") }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/range-selector/index.js
function E$2() {
	return E$2 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
		}
		return e;
	}, E$2.apply(null, arguments);
}
function y(e) {
	return y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, y(e);
}
function C() {
	return C = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
		}
		return e;
	}, C.apply(null, arguments);
}
function k(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != y(e) || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var i = n.call(e, t || "default");
				if ("object" != y(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == y(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var import_react$9, import_react$10, import_classnames$6, h$3, g$1, b$3, x, v, w$1, _$2, I$2, B$1, L$2, S, F$2, T;
var init_range_selector = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$4();
	init_arrow_heavy_down_12_06baaeac();
	init_esm$9();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	_$2 = function(e) {
		return import_react$9.createElement("svg", E$2({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), h$3 || (h$3 = import_react$9.createElement("path", {
			d: "M5.77323 4.51396C5.98674 4.20596 6.3377 4.02222 6.71247 4.02222H17.2789C17.6528 4.02222 18.0032 4.20519 18.2168 4.51212L20.6596 8.0211L12.0511 14.4502C11.619 14.7729 11.02 14.7496 10.6143 14.3942L3.3404 8.02333L5.77323 4.51396Z",
			fill: "url(#paint0_linear_96497_141066)"
		})), g$1 || (g$1 = import_react$9.createElement("g", { filter: "url(#filter0_d_96497_141066)" }, import_react$9.createElement("path", {
			d: "M7.0521 5.7934L6.52679 9.19921L12.0366 13.7354L17.4997 9.19921L16.9566 5.79059C16.9124 5.51321 16.6731 5.30908 16.3923 5.30908H7.61685C7.33489 5.30908 7.09508 5.51474 7.0521 5.7934Z",
			fill: "#CAEFFB"
		}))), b$3 || (b$3 = import_react$9.createElement("g", { filter: "url(#filter1_d_96497_141066)" }, import_react$9.createElement("path", {
			d: "M5.96751 7.00771L5.29688 11.292L12.1496 16.851L18.9442 11.292L18.2509 7.00486C18.2061 6.72808 17.9672 6.52466 17.6868 6.52466H6.53206C6.25059 6.52466 6.01104 6.72963 5.96751 7.00771Z",
			fill: "#ECFCFF"
		}))), x || (x = import_react$9.createElement("path", {
			d: "M20.6592 18.894C20.6591 19.4918 20.174 19.9771 19.5762 19.9771H4.42285C3.82506 19.9771 3.33989 19.4918 3.33984 18.894V8.021H20.6592V18.894Z",
			fill: "url(#paint1_linear_96497_141066)"
		})), v || (v = import_react$9.createElement("g", { filter: "url(#filter2_d_96497_141066)" }, import_react$9.createElement("path", {
			d: "M10.78 12.8957C10.8306 12.8704 10.8716 12.8294 10.8968 12.7788L11.7658 11.0409C11.8621 10.8484 12.1369 10.8484 12.2331 11.0409L13.1021 12.7788C13.1274 12.8294 13.1684 12.8704 13.2189 12.8957L14.9569 13.7646C15.1494 13.8609 15.1494 14.1357 14.9569 14.2319L13.2189 15.1009C13.1684 15.1262 13.1274 15.1672 13.1021 15.2177L12.2331 16.9557C12.1369 17.1482 11.8621 17.1482 11.7658 16.9557L10.8968 15.2177C10.8716 15.1672 10.8306 15.1262 10.78 15.1009L9.04207 14.2319C8.84953 14.1357 8.84953 13.8609 9.04207 13.7646L10.78 12.8957Z",
			fill: "#ECFCFF"
		}))), w$1 || (w$1 = import_react$9.createElement("defs", null, import_react$9.createElement("filter", {
			id: "filter0_d_96497_141066",
			x: 6.37441,
			y: 5.00432,
			width: 11.8872,
			height: 9.34056,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$9.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$9.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$9.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$9.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$9.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$9.createElement("filter", {
			id: "filter1_d_96497_141066",
			x: 5.14449,
			y: 6.2199,
			width: 14.5616,
			height: 11.2407,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$9.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$9.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$9.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$9.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$9.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$9.createElement("filter", {
			id: "filter2_d_96497_141066",
			x: 8.74529,
			y: 10.5917,
			width: 7.1179,
			height: 7.1179,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$9.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$9.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$9.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$9.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$9.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$9.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$9.createElement("linearGradient", {
			id: "paint0_linear_96497_141066",
			x1: 6.86176,
			y1: 4.02222,
			x2: 6.86176,
			y2: 15.0028,
			gradientUnits: "userSpaceOnUse"
		}, import_react$9.createElement("stop", { stopColor: "#2DA5EB" }), import_react$9.createElement("stop", {
			offset: 1,
			stopColor: "#2198EB"
		})), import_react$9.createElement("linearGradient", {
			id: "paint1_linear_96497_141066",
			x1: 11.4669,
			y1: 2.04297,
			x2: .518714,
			y2: 18.8778,
			gradientUnits: "userSpaceOnUse"
		}, import_react$9.createElement("stop", { stopColor: "#4DD1FF" }), import_react$9.createElement("stop", {
			offset: 1,
			stopColor: "#3CBFFF"
		})))));
	};
	e$12(".ai-component-mobile-search-box-select-button {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 12px;\n  line-height: 20px;\n  font-size: 14px;\n  font-weight: 400;\n  cursor: pointer;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.48));\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 20px;\n  background-color: var(--bg-lv4-default, rgba(255, 255, 255, 0.88));\n}\n.ai-component-mobile-search-box-select-button-text {\n  max-width: 130px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.ai-component-mobile-search-box-select-button-arrow {\n  width: 12px;\n  height: 12px;\n}\n.ai-component-mobile-search-box-select-button-arrow path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-mobile-search-box-select-button-arrow.up {\n  transform: rotate(180deg);\n}\n.ai-component-mobile-search-box-select-button-arrow.down {\n  transform: rotate(0deg);\n}\n");
	I$2 = function(e) {
		return import_react$9.createElement("svg", C({
			width: 16,
			height: 16,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$9.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5.6355 3.5L3.13534 6.16528C2.99897 6.31065 2.96198 6.52314 3.04119 6.70605C3.1204 6.88896 3.30068 7.00735 3.50001 7.00735H13V6.00735H4.65459L6.36484 4.18415L5.6355 3.5ZM10.3645 12.5037L12.8647 9.8387C13.001 9.69333 13.038 9.48083 12.9588 9.29792C12.8796 9.115 12.6993 8.9966 12.5 8.9966L3.00001 8.99661L3.00001 9.99661H11.3454L9.6352 11.8195L10.3645 12.5037Z",
			fill: "#454D5A",
			style: k(k({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$12(".ai-search-chat-range-tab-wrapper {\n  display: flex;\n  align-items: center;\n  padding: 12px 0;\n  margin-top: 20px;\n  border-bottom: 1px solid var(--separators-medium, rgba(0, 0, 0, 0.08));\n}\n.ai-search-chat-range-tab-title {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  margin-right: 8px;\n}\n.ai-search-chat-range-tab-menu-name {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  line-height: 30px;\n  padding: 0 16px;\n  height: 30px;\n}\n.ai-search-chat-range-tab-submenu.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-search-chat-range-tab-submenu.dui-menu-item::after {\n  margin-left: auto;\n}\n.ai-search-chat-range-tab-submenu .dui-menu-item-text-container {\n  font-size: 12px;\n}\n.ai-search-chat-range-tab-popup {\n  width: 200px;\n  border-radius: 8px;\n}\n.ai-search-chat-range-tab-label {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 0 8px;\n  line-height: 16px;\n  font-size: 12px;\n  font-weight: 400;\n  cursor: pointer;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  border-radius: 20px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  height: 28px;\n  border: 0;\n}\n.ai-search-chat-range-tab-label-arrow {\n  width: 16px;\n  height: 16px;\n}\n.ai-search-chat-range-tab-label-arrow path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64)) !important;\n}\n.ai-search-chat-range-tab-label:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-search-chat-range-tab-select li.dui-menu-item {\n  height: unset;\n  padding-left: 40px;\n  padding-right: 16px;\n  cursor: pointer;\n  justify-content: flex-start;\n  pointer-events: auto;\n}\n.ai-search-chat-range-tab-select li.dui-menu-item::before {\n  content: '';\n  left: 14px !important;\n}\n.ai-search-chat-range-tab-select li.space-menu-item .dui-menu-item-text-container {\n  line-height: 12px;\n}\n.ai-search-chat-range-tab-select li.space-menu-item::after {\n  margin-left: auto;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container {\n  display: flex;\n  align-items: center;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .select-right-icon {\n  margin-left: 4px;\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .select-right-icon:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .dui-trigger > div > div {\n  display: flex;\n  align-items: center;\n}\n.ai-search-chat-range-tab-select-name {\n  font-size: 12px;\n  line-height: 12px;\n  font-weight: 400;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-search-chat-range-tab-select-name-with-desc {\n  font-weight: 600;\n}\n.ai-search-chat-range-tab-select-desc {\n  margin-top: 2px;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n");
	B$1 = "ai-search-chat-range-tab";
	L$2 = function(e) {
		var t, n = E$6();
		return o$11("isEmbedded") && e === l$9.Topic ? s$7("searchBox.currentWiki") : null === (t = n.find((function(t) {
			return t.id === e;
		}))) || void 0 === t ? void 0 : t.name;
	};
	S = function(e) {
		var n = e.selectId, r = e.className, a = e.spaces, p = e.disabled, m = e.initWikiId, f = e.onClick, h = o$11("isEmbedded"), g = E$6(), b = function(e) {
			if (e !== l$9.Topic) {
				var i = e;
				if (i !== n && e.startsWith("".concat(l$9.Topic, "_"))) {
					var o = t$9(e.split("_"), 2), c = o[0], l = o[1], p = a.find((function(e) {
						return e.wikiId === l;
					}));
					if (p) return void (null == f || f(c, null == p ? void 0 : p.wikiId));
					i = c;
				}
				localStorage.setItem(C$3, i), f?.(i);
			} else v();
		}, x = function(e) {
			var t = a.find((function(t) {
				return t.wikiId === e;
			}));
			t && (f?.(l$9.Topic, null == t ? void 0 : t.wikiId), localStorage.setItem("tdocs-ai_range_type", e));
		}, v = function() {
			ActionSheet_default.show({
				options: a.map((function(e) {
					return {
						id: e.wikiId,
						title: e.title,
						icon: import_react$10.createElement(_$2, {
							viewBox: "0 0 24 24",
							className: "space-list-con-item-icon"
						})
					};
				})),
				onClickAction: x,
				selectedIds: []
			});
		}, w = function(e) {
			return e === l$9.Topic && !(null != a && a.length);
		};
		return import_react$10.createElement("div", { className: "".concat(B$1, "-wrapper") }, import_react$10.createElement("div", { className: "".concat(B$1, "-title") }, s$7("base-on", { range: L$2(n) })), import_react$10.createElement("button", {
			className: "".concat(B$1, "-label ").concat(r),
			onClick: function() {
				p || ActionSheet_default.show({
					options: g.map((function(e) {
						return h && m && e.id === l$9.Topic ? {
							id: "".concat(l$9.Topic, "_").concat(m),
							title: s$7("searchBox.currentWiki"),
							disabled: w(e.id),
							description: e.popContent
						} : {
							id: e.id,
							title: e.name,
							disabled: w(e.id),
							description: w(e.id) ? e.disabledPopContent : e.popContent
						};
					})),
					onClickAction: b,
					selectedIds: [n, "".concat(n, "_").concat(m)]
				});
			}
		}, import_react$10.createElement(I$2, { className: "".concat(B$1, "-label-arrow") }), import_react$10.createElement("div", { className: "".concat(B$1, "-label-text") }, s$7("switch-search-range"))));
	};
	F$2 = "ai-component-mobile-search-box-select";
	T = function(n) {
		var d = n.selectId, f = n.onSelect, h = n.onClick, g = n.className, b = n.disabled, x = n.wikiId, v = n.initWikiId, w = n.spaces, E = void 0 === w ? [] : w, y = n.isEmbedded, C = void 0 !== y && y, k = n.hasCurrentDoc, I = E$6(void 0 !== k && k), L = t$9((0, import_react$10.useState)(d || I[0].id), 2), S = L[0], T = L[1], j = t$9((0, import_react$10.useState)(!1), 2), A = j[0], M = j[1], G = t$9((0, import_react$10.useState)(""), 2), U = G[0], D = G[1];
		(0, import_react$10.useEffect)((function() {
			var e = o$11("range");
			!C || e !== l$9.Topic && e || !v || (T(l$9.Topic), f?.(l$9.Topic, v), D(v), h?.(l$9.Topic, v));
		}), [C, v]);
		var H = function(e) {
			if (e !== l$9.Topic) {
				var n = e, i = void 0;
				if (n !== S) {
					if (e.startsWith("".concat(l$9.Topic, "_"))) {
						var a = t$9(e.split("_"), 2), o = a[0], c = a[1];
						E.find((function(e) {
							return e.wikiId === c;
						})) && (n = o, i = c, D(c));
					} else D("");
					T(n), f?.(n, i);
				}
				h?.(n, i);
			} else W();
		}, P = function(e) {
			var t = E.find((function(t) {
				return t.wikiId === e;
			}));
			t && (T(l$9.Topic), f?.(l$9.Topic, t.wikiId), D(t.wikiId), h?.(l$9.Topic, t.wikiId));
		}, W = function() {
			ActionSheet_default.show({
				options: E.map((function(e) {
					return {
						id: e.wikiId,
						title: e.title,
						icon: import_react$10.createElement(_$2, {
							viewBox: "0 0 24 24",
							className: "space-list-con-item-icon"
						})
					};
				})),
				onClickAction: P,
				selectedIds: [U],
				onCancel: function() {
					return M(!1);
				}
			});
		};
		(0, import_react$10.useEffect)((function() {
			d && d !== S && T(d);
		}), [d, S]), (0, import_react$10.useEffect)((function() {
			x && x !== U && (D(x), f?.(S, x));
		}), [x]);
		var z, Z, R, V, $ = function(e) {
			return !(e !== l$9.Topic || null != E && E.length || C || v);
		};
		return import_react$10.createElement("button", {
			className: (0, import_classnames$6.default)("".concat(F$2, "-button"), g, e$14({}, "".concat(F$2, "-disable"), b)),
			onClick: function() {
				b || ActionSheet_default.show({
					options: I.map((function(e) {
						return C && v && e.id === l$9.Topic ? {
							id: "".concat(l$9.Topic, "_").concat(v),
							title: s$7("searchBox.currentWiki"),
							disabled: $(e.id),
							description: e.popContent
						} : {
							id: e.id,
							title: e.name,
							disabled: $(e.id),
							description: $(e.id) ? e.disabledPopContent : e.popContent
						};
					})),
					onClickAction: H,
					selectedIds: [S, "".concat(S, "_").concat(U)],
					onCancel: function() {
						return M(!1);
					}
				});
			}
		}, import_react$10.createElement("div", { className: "".concat(F$2, "-button-text") }, S === l$9.Topic && C && U ? s$7("searchBox.currentWiki") : S === l$9.Topic && U ? (R = U, null === (V = E.find((function(e) {
			return e.wikiId === R;
		}))) || void 0 === V ? void 0 : V.title) : (z = S, null === (Z = I.find((function(e) {
			return e.id === z;
		}))) || void 0 === Z ? void 0 : Z.name)), import_react$10.createElement(o$4, { className: "".concat(F$2, "-button-arrow ").concat(A ? "up" : "down") }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/search-box/index.js
function L$1(e) {
	return L$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, L$1(e);
}
function D() {
	return D = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
		}
		return e;
	}, D.apply(null, arguments);
}
function A(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != L$1(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var o = t.call(e, n || "default");
				if ("object" != L$1(o)) return o;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == L$1(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
var import_react$7, import_react$8, import_classnames$5, N, M, F$1, O, Z, j$1, H, P$1, B, U, q$1, I, G, R;
var init_search_box = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_model_selector();
	init_range_selector();
	init_index_33302b4d();
	init_esm$6();
	init_esm$4();
	init_esm$1();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_index_54f3d2bb();
	init_esm$9();
	init_style_inject_es_3984fa0f();
	init_index_9822dcca();
	N = "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='16' cy='16' r='16' fill='url(%23paint0_radial_1780_16652)' style=''/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z' fill='white' style='fill:white%3bfill-opacity:1%3b'/%3e%3cdefs%3e%3cradialGradient id='paint0_radial_1780_16652' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)'%3e%3cstop offset='0.327165' stop-color='%232C91FF' style='stop-color:%232C91FF%3bstop-color:color(display-p3 0.1725 0.5686 1.0000)%3bstop-opacity:1%3b'/%3e%3cstop offset='1' stop-color='%232175FF' style='stop-color:%232175FF%3bstop-color:color(display-p3 0.1294 0.4588 1.0000)%3bstop-opacity:1%3b'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e";
	M = "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.4'%3e%3ccircle cx='16' cy='16' r='16' fill='url(%23paint0_radial_1780_16679)' style=''/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z' fill='white' style='fill:white%3bfill-opacity:1%3b'/%3e%3c/g%3e%3cdefs%3e%3cradialGradient id='paint0_radial_1780_16679' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)'%3e%3cstop offset='0.327165' stop-color='%232C91FF' style='stop-color:%232C91FF%3bstop-color:color(display-p3 0.1725 0.5686 1.0000)%3bstop-opacity:1%3b'/%3e%3cstop offset='1' stop-color='%232175FF' style='stop-color:%232175FF%3bstop-color:color(display-p3 0.1294 0.4588 1.0000)%3bstop-opacity:1%3b'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e";
	F$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3e%3cpath fill='%23454D5A' fill-rule='evenodd' d='M6.5 8a5.5 5.5 0 1 1 11 0v3a5.5 5.5 0 1 1-11 0V8ZM12 4.5A3.5 3.5 0 0 0 8.5 8v3a3.5 3.5 0 1 0 7 0V8A3.5 3.5 0 0 0 12 4.5Z' clip-rule='evenodd'/%3e%3cpath fill='%23454D5A' fill-rule='evenodd' d='M4.912 13.645c1.273 2.829 3.986 4.744 7.09 4.744 3.1 0 5.812-1.913 7.086-4.739l1.824.822c-1.567 3.474-4.95 5.917-8.91 5.917-3.963 0-7.349-2.445-8.914-5.923l1.824-.82Z' clip-rule='evenodd'/%3e%3cpath fill='%23454D5A' d='M11 19.555h2v2.5h-2v-2.5Z'/%3e%3c/svg%3e";
	O = function(e) {
		return import_react$7.createElement("svg", D({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M11.1066 12.083L6.16369 17.0942L7.05705 17.9999L12 12.9887L16.943 18L17.8363 17.0943L12.8933 12.083L18 6.9057L17.1066 6L12 11.1773L6.89335 6.00009L6 6.90579L11.1066 12.083Z",
			fill: "#454D5A",
			style: A(A({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$12(".ai-component-mobile-search-box-file-list .file-item {\n  box-sizing: border-box;\n  max-width: 188px;\n  display: flex;\n  padding: 6px 8px;\n  align-items: center;\n  gap: 4px;\n  border-radius: 2px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background: var(--bg-lv1-default, #fff);\n  position: relative;\n  font-size: 10px;\n}\n.ai-component-mobile-search-box-file-list .file-item * {\n  box-sizing: border-box;\n}\n.ai-component-mobile-search-box-file-list .file-item--error {\n  border: 1px solid var(--text-critical, #eb3639);\n  background: var(--token-red-red-07, #fee);\n}\n.ai-component-mobile-search-box-file-list .file-item__delete-btn {\n  background: inherit;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ai-component-mobile-search-box-file-list .file-item__delete-btn-icon {\n  width: 1.6em;\n  height: 1.6em;\n  border-radius: 2px;\n}\n.ai-component-mobile-search-box-file-list .file-item__delete-btn-icon path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-mobile-search-box-file-list .file-item__progress {\n  position: absolute;\n  left: 0;\n  height: 100%;\n  background: var(--t-doc-light-tsp-fill-tsp-fill-accent-strong, rgba(30, 111, 255, 0.12));\n}\n.ai-component-mobile-search-box-file-list .file-item__icon {\n  width: 2em;\n  height: 2em;\n}\n.ai-component-mobile-search-box-file-list .file-item__name {\n  color: var(--t-doc-light-text-text-ultrastrong, var(--text-ultrastrong, rgba(0, 0, 0, 0.88)));\n  font-family: PingFang SC;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 100%;\n  margin: 0;\n}\n.ai-component-mobile-search-box-file-list .status--uploading {\n  background: var(--bg-lv1-default, #fff);\n}\n.ai-component-mobile-search-box-file-list .status--success:active {\n  background: var(--tsp-fill-weak, rgba(29, 79, 106, 0.06));\n}\n.ai-component-mobile-search-box-file-list .status--failed {\n  border: 1px solid var(--t-doc-light-text-text-critical, #eb3639);\n  background: var(--token-red-red-07, #fee);\n}\n");
	Z = function(e) {
		var n = e.fileTask, t = e.fileTaskManager, i = e.className, a = void 0 === i ? "" : i, c = e.disabled, r = void 0 !== c && c, l = n.getTask(), s = function() {
			var e, n;
			return l.status === m$4.UPLOADING ? import_react$8.createElement(Loading_default, {
				spinType: "primary",
				style: {
					width: "2em",
					height: "2em"
				}
			}) : import_react$8.createElement("img", {
				className: "file-item__icon",
				src: (null === (e = l.file) || void 0 === e ? void 0 : e.iconUrl) || _$6[(null === (n = l.file) || void 0 === n ? void 0 : n.type) || L$4.DOC]
			});
		};
		return r ? import_react$8.createElement("div", { className: "file-item ".concat(a) }, s(), import_react$8.createElement("p", { className: "file-item__name" }, l.metadata.name)) : import_react$8.createElement("div", { className: "file-item status--".concat(l.status, " ").concat(a) }, l.status === m$4.UPLOADING && import_react$8.createElement("div", {
			className: "file-item__progress",
			style: { width: "".concat(100 * (l.progress || 1), "%") }
		}), s(), import_react$8.createElement("p", { className: "file-item__name" }, l.metadata.name), import_react$8.createElement("div", { className: "file-item__delete-btn" }, import_react$8.createElement(O, {
			viewBox: "0 0 24 24",
			className: "file-item__delete-btn-icon",
			onClick: function() {
				t?.deleteFileTask(l.id);
			}
		})));
	};
	e$12(".ai-component-mobile-search-box-file-list {\n  display: flex;\n  justify-content: flex-start;\n  flex-wrap: nowrap;\n  gap: 4px var(---, 4px);\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-mobile-search-box-file-list::-webkit-scrollbar {\n  display: none;\n}\n");
	j$1 = function(e) {
		var n = e.fileTasks, t = e.fileTaskManager, i = e.className;
		return import_react$8.createElement("div", { className: (0, import_classnames$5.default)("".concat("ai-component-mobile-search-box", "-file-list"), i) }, null == n ? void 0 : n.slice().reverse().map((function(e) {
			return import_react$8.createElement(Z, {
				key: e.getTask().id,
				fileTask: e,
				fileTaskManager: t,
				className: "ai-action-file-item"
			});
		})));
	};
	e$12(".ai-component-mobile-search-box-components-input {\n  font-size: 14px;\n  line-height: 24px;\n  border: none;\n  padding: 0;\n  resize: none;\n  margin: 0;\n  outline: none;\n  cursor: text;\n  user-modify: read-write-plaintext-only;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  caret-color: var(--intent-accent-default, #1E6FFF);\n}\n.ai-component-mobile-search-box-components-input:empty::after {\n  content: attr(placeholder);\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n");
	H = (0, import_react$8.forwardRef)((function(e, t) {
		var i, p = t$9((0, import_react$8.useState)(null !== (i = e.inputValue) && void 0 !== i ? i : ""), 2), d = p[0], b = p[1], u = t$9((0, import_react$8.useState)(!1), 2), f = u[0], h = u[1], g = (0, import_react$8.useRef)(null);
		(0, import_react$8.useImperativeHandle)(t, (function() {
			return g.current;
		}));
		return (0, import_react$8.useEffect)((function() {
			g.current && (g.current.innerText = e.inputValue || "");
		}), []), (0, import_react$8.useEffect)((function() {
			var n;
			g.current && e.inputValue !== d && (g.current.innerText = e.inputValue || ""), b(null !== (n = e.inputValue) && void 0 !== n ? n : "");
		}), [e.inputValue, g]), (0, import_react$8.useEffect)((function() {
			var n;
			e.focus && (null === (n = g.current) || void 0 === n || n.focus());
		}), [e.focus, g]), import_react$8.createElement("div", {
			className: "".concat("ai-component-mobile-search-box-components-input", " ").concat(e.className),
			onInput: function() {
				var n, t, o, i = null !== (n = null === (t = g.current) || void 0 === t ? void 0 : t.textContent) && void 0 !== n ? n : "";
				b(i), null === (o = e.onChange) || void 0 === o || o.call(e, i), !i && g.current && (g.current.innerHTML = "");
			},
			ref: g,
			contentEditable: !e.disabled && "plaintext-only",
			placeholder: e.placeholder,
			onKeyDown: function(n) {
				var t;
				f || "Enter" !== n.key || n.shiftKey || (n.preventDefault(), null === (t = e.onEnter) || void 0 === t || t.call(e, d));
			},
			onFocus: e.onFocus,
			onBlur: e.onBlur,
			onCompositionStart: function() {
				return h(!0);
			},
			onCompositionEnd: function() {
				return h(!1);
			}
		});
	}));
	e$12(".ai-homepage-mobile-ai-search-voice-input-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 0.5px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  background: var(--tsp-fill-material, rgba(255, 255, 255, 0.88));\n  box-sizing: border-box;\n}\n.ai-homepage-mobile-ai-search-voice-input-icon {\n  width: 22px;\n  height: 22px;\n}\n.ai-homepage-mobile-ai-search-voice-input-input {\n  background-color: var(--bg-lv2-default, #fff);\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: calc(16px + env(safe-area-inset-bottom));\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  visibility: visible;\n  z-index: 1;\n}\n.ai-homepage-mobile-ai-search-voice-input-input-img {\n  width: 28px;\n  height: 28px;\n  filter: var(--icon-invert);\n}\n.ai-homepage-mobile-ai-search-voice-input-input-button {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n  height: 44px;\n  border-radius: 4px;\n  font-weight: 500;\n  font-size: 16px;\n  user-select: none;\n  -webkit-user-select: none;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n");
	B = "ai-homepage-mobile-ai-search-voice-input";
	(function(e) {
		e[e.SUCCESS = 1] = "SUCCESS", e[e.CANCEL = 0] = "CANCEL", e[e.TOO_SHORT = -1] = "TOO_SHORT", e[e.STOP = -2] = "STOP";
	})(P$1 || (P$1 = {}));
	U = function(e) {
		var t = e.setVoiceShow, i = e.onSend, r = e.setNativeVoiceShow, p = t$9((0, import_react$8.useState)(!1), 2), b = p[0], m = p[1], h = t$9((0, import_react$8.useState)(null), 2), g = h[0], v = h[1], x = (0, import_react$8.useRef)(null), w = (0, import_react$8.useRef)(null);
		(0, import_react$8.useEffect)((function() {
			if (g) x.current && x.current.addEventListener("touchmove", (function(e) {
				var n;
				null === (n = g.updateTouchEvent) || void 0 === n || n.call(g, e), e.preventDefault(), e.stopPropagation();
			}));
		}), [g]), (0, import_react$8.useEffect)((function() {
			var e, n, o, a = function() {
				var e = r$9(s$3.mark((function e() {
					var n;
					return s$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return e.next = 2, O$4.getAsrPanelExtension();
							case 2: n = e.sent, v(n);
							case 4:
							case "end": return e.stop();
						}
					}), e);
				})));
				return function() {
					return e.apply(this, arguments);
				};
			}(), c = function() {
				var e, n;
				null !== (e = window.mqq) && void 0 !== e && e.invoke ? null === (n = window.mqq) || void 0 === n || n.invoke("ui", "hideSpeechPanel", {}, (function() {
					r(!1), t(!1);
				})) : console.error("mqq.invoke is not defined");
			};
			return ua.isTencentDocsApp ? null !== (e = window.mqq) && void 0 !== e && e.invoke ? (n = function(e) {
				e.code === P$1.SUCCESS ? (i?.(e.text), r(!1)) : e.code === P$1.CANCEL && r(!1);
			}, null === (o = window.mqq) || void 0 === o || o.invoke("ui", "showSpeechPanel", {}, (function(e) {
				n(e);
			}))) : console.error("mqq.invoke is not defined") : a(), function() {
				c();
			};
		}), []);
		var y = function() {
			g && g.show({ sendText: function(e) {
				var n = e.text;
				i?.(n), t(!1);
			} });
		};
		return ua.isTencentDocsApp ? null : import_react$8.createElement("div", { className: "".concat(B, "-input") }, import_react$8.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8 13.5H6.5V15H8V13.5Z' fill='black'/%3e%3cpath d='M9.5 13.5H14V15H9.5V13.5Z' fill='black'/%3e%3cpath d='M11 10H9.5V11.5H11V10Z' fill='black'/%3e%3cpath d='M15.5 13.5H17V15H15.5V13.5Z' fill='black'/%3e%3cpath d='M8 10H6.5V11.5H8V10Z' fill='black'/%3e%3cpath d='M15.5 10H17V11.5H15.5V10Z' fill='black'/%3e%3cpath d='M14 10H12.5V11.5H14V10Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.5 6C20.0523 6 20.5 6.44772 20.5 7V18C20.5 18.5523 20.0523 19 19.5 19H4C3.44772 19 3 18.5523 3 18V7C3 6.44772 3.44772 6 4 6H19.5ZM19 7.5H4.5V17.5H19V7.5Z' fill='black'/%3e%3c/svg%3e",
			className: "".concat(B, "-input-img"),
			onClick: function() {
				return t(!1);
			}
		}), import_react$8.createElement("span", {
			className: "".concat(B, "-input-button"),
			ref: x,
			onTouchStart: function(e) {
				var n;
				e.preventDefault(), e.stopPropagation(), b ? Snackbar_default.show({
					type: "error",
					message: s$7("errorMessage.mike-unauthorized"),
					duration: 2e3
				}) : (null !== (n = window) && void 0 !== n && n.ai_recording_auth && (w.current = window.setTimeout((function() {
					y();
				}), 300)), navigator.mediaDevices.getUserMedia({ audio: !0 }).then((function() {
					window.ai_recording_auth = !0;
				})).catch((function(e) {
					console.error(e), m(!0), Snackbar_default.show({
						type: "error",
						message: s$7("errorMessage.mike-failed-to-get"),
						duration: 2e3
					});
				})));
			},
			onTouchEnd: function() {
				var e;
				w.current && clearTimeout(w.current), null == g || null === (e = g.touchEndHandler) || void 0 === e || e.call(g);
			}
		}, s$7("searchBox.hold-to-speak")));
	};
	e$12(".ai-component-mobile-search-box-search-frame-wrapper {\n  margin: 16px 16px 0;\n  border-radius: 16px;\n  background: var(--bg-lv3-default, #fff);\n  border: 1.5px solid rgba(134, 163, 251, 0.4);\n}\n.ai-component-mobile-search-box-search-frame-file-task {\n  margin-bottom: 12px;\n}\n.ai-component-mobile-search-box-search-frame-focus {\n  border: 1.5px solid rgba(134, 163, 251, 0.4);\n}\n.ai-component-mobile-search-box-search-frame-content {\n  padding: 12px;\n}\n.ai-component-mobile-search-box-search-frame-content-input-wrapper {\n  display: flex;\n  align-items: flex-start;\n  max-height: calc(100vh - 300px);\n  min-height: 46px;\n  overflow: auto;\n}\n.ai-component-mobile-search-box-search-frame-content-input {\n  flex: 1;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  border: none;\n  padding: 0 4px;\n  resize: none;\n  margin: 0;\n  outline: none;\n  cursor: text;\n  font-size: 16px;\n  line-height: 160%;\n  min-height: 46px;\n}\n.ai-component-mobile-search-box-search-frame-content-input:empty::after {\n  content: attr(placeholder);\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-mobile-search-box-search-frame-content-footer {\n  display: flex;\n  padding: 12px 0 0;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n.ai-component-mobile-search-box-search-frame-content-footer .ai-component-mobile-search-box-search-options {\n  flex: 1;\n  width: 200px;\n}\n.ai-component-mobile-search-box-search-frame-content-footer .ai-component-mobile-search-box-search-options .ai-component-mobile-search-box-select-button {\n  max-width: 140px;\n}\n.ai-component-mobile-search-box-search-frame-content-footer-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.ai-component-mobile-search-box-search-frame-content-footer-right {\n  display: flex;\n  align-items: center;\n}\n");
	q$1 = "ai-component-mobile-search-box-search-frame";
	I = function(t) {
		var i, r, u, x = t$9((0, import_react$8.useState)(t.focus), 2), y = x[0], k = x[1], _ = t$9((0, import_react$8.useState)(!1), 2), T$5 = _[0], S = _[1], L = t$9((0, import_react$8.useState)(!1), 2), D = L[0], A = L[1], Z = t$9((0, import_react$8.useState)(l$9.TDocs), 2), P = Z[0], B = Z[1], G = t$9((0, import_react$8.useState)(_$5()), 2), R = G[0], z = G[1], K = t$9((0, import_react$8.useState)(null !== (i = t.inputValue) && void 0 !== i ? i : ""), 2), $ = K[0], J = K[1], X = t$9((0, import_react$8.useState)(""), 2), Y = X[0], ee = X[1], ne = p$6(!0).spaces, te = S$4.isSupportSpace(), oe = (0, import_react$8.useRef)(null), ie = (0, import_react$8.useRef)(null);
		(0, import_react$8.useEffect)((function() {
			t.inputValue && J(t.inputValue);
		}), [t.inputValue]);
		var ae = function(e) {
			var n = null != e ? e : $;
			n && t.onSend({
				model: R,
				range: P,
				inputValue: n,
				wikiId: Y
			});
		}, ce = function() {
			k(!0);
		};
		e$15(oe, (function() {
			k(!1);
		}));
		var re, le, se = function() {
			ua.isTencentDocsApp ? A(!0) : S(!0);
		};
		return import_react$8.createElement("div", {
			className: (0, import_classnames$5.default)("".concat(q$1, "-wrapper"), e$14({}, "".concat(q$1, "-focus"), !!y), t.className),
			onClick: ce,
			ref: oe
		}, t.title && import_react$8.createElement("div", null, t.title), import_react$8.createElement("div", { className: "".concat(q$1, "-content") }, !(null == t || null === (r = t.fileTasks) || void 0 === r || !r.length) && import_react$8.createElement(j$1, {
			fileTasks: t.fileTasks,
			fileTaskManager: t.fileTaskManager,
			className: "".concat(q$1, "-file-task")
		}), import_react$8.createElement("div", { className: "".concat(q$1, "-content-input-wrapper") }, $ ? null : import_react$8.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23paint0_angular_817_69395_clip_path)' data-figma-skip-parse='true'%3e%3cg transform='matrix(0.006 -0.0095 0.00920425 0.00581321 13.5 10.5)'%3e%3cforeignObject x='-1100.61' y='-1100.61' width='2201.22' height='2201.22'%3e%3cdiv xmlns='http://www.w3.org/1999/xhtml' style='background:conic-gradient(from 90deg%2crgba(0%2c 202%2c 246%2c 0.7831) 0deg%2crgba(0%2c 202%2c 246%2c 0) 102.446deg%2crgba(1%2c 234%2c 182%2c 0) 142.329deg%2crgba(1%2c 234%2c 182%2c 1) 191.636deg%2crgba(0%2c 202%2c 246%2c 1) 331.622deg%2crgba(0%2c 202%2c 246%2c 0.7831) 360deg)%3bheight:100%25%3bwidth:100%25%3bopacity:1'%3e%3c/div%3e%3c/foreignObject%3e%3c/g%3e%3c/g%3e%3cpath d='M10.679 19.7552C9.80555 19.7552 8.96551 19.5521 8.20112 19.1461C6.66675 18.3307 5.64119 16.8051 5.31234 14.8511C4.99464 12.9632 5.37047 10.8874 6.36975 9.00747C7.36904 7.12754 8.87952 5.65528 10.6225 4.86222C12.426 4.04129 14.2645 4.03891 15.7981 4.85426C17.3325 5.66962 18.358 7.19522 18.6869 9.14921C19.0046 11.0371 18.6287 13.1129 17.6295 14.9928C16.6302 16.8728 15.1197 18.345 13.3767 19.1381C12.4722 19.5498 11.5581 19.756 10.679 19.756V19.7552ZM13.3186 5.59955C12.6298 5.59955 11.906 5.76437 11.1831 6.09322C9.71 6.76366 8.42566 8.02411 7.56492 9.64208C6.70497 11.2601 6.37851 13.0301 6.64764 14.6258C6.90483 16.1554 7.68276 17.3362 8.83652 17.9501C9.99108 18.564 11.4044 18.5481 12.8162 17.9055C14.2892 17.2351 15.5736 15.9746 16.4343 14.3566C17.2942 12.7387 17.6207 10.9686 17.3516 9.37295C17.0944 7.84257 16.3164 6.66253 15.1627 6.04863C14.5997 5.74924 13.9747 5.59955 13.3186 5.59955Z' data-figma-gradient-fill='%7b%26%2334%3btype%26%2334%3b:%26%2334%3bGRADIENT_ANGULAR%26%2334%3b%2c%26%2334%3bstops%26%2334%3b:%5b%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0%2c%26%2334%3bg%26%2334%3b:0.79215687513351440%2c%26%2334%3bb%26%2334%3b:0.96470588445663452%2c%26%2334%3ba%26%2334%3b:0.0%7d%2c%26%2334%3bposition%26%2334%3b:0.28457152843475342%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0039215688593685627%2c%26%2334%3bg%26%2334%3b:0.91764706373214722%2c%26%2334%3bb%26%2334%3b:0.71372550725936890%2c%26%2334%3ba%26%2334%3b:0.0%7d%2c%26%2334%3bposition%26%2334%3b:0.39535894989967346%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0039215688593685627%2c%26%2334%3bg%26%2334%3b:0.91764706373214722%2c%26%2334%3bb%26%2334%3b:0.71372550725936890%2c%26%2334%3ba%26%2334%3b:1.0%7d%2c%26%2334%3bposition%26%2334%3b:0.53232300281524658%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0%2c%26%2334%3bg%26%2334%3b:0.79215687513351440%2c%26%2334%3bb%26%2334%3b:0.96470588445663452%2c%26%2334%3ba%26%2334%3b:1.0%7d%2c%26%2334%3bposition%26%2334%3b:0.92117291688919067%7d%5d%2c%26%2334%3bstopsVar%26%2334%3b:%5b%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0%2c%26%2334%3bg%26%2334%3b:0.79215687513351440%2c%26%2334%3bb%26%2334%3b:0.96470588445663452%2c%26%2334%3ba%26%2334%3b:0.0%7d%2c%26%2334%3bposition%26%2334%3b:0.28457152843475342%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0039215688593685627%2c%26%2334%3bg%26%2334%3b:0.91764706373214722%2c%26%2334%3bb%26%2334%3b:0.71372550725936890%2c%26%2334%3ba%26%2334%3b:0.0%7d%2c%26%2334%3bposition%26%2334%3b:0.39535894989967346%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0039215688593685627%2c%26%2334%3bg%26%2334%3b:0.91764706373214722%2c%26%2334%3bb%26%2334%3b:0.71372550725936890%2c%26%2334%3ba%26%2334%3b:1.0%7d%2c%26%2334%3bposition%26%2334%3b:0.53232300281524658%7d%2c%7b%26%2334%3bcolor%26%2334%3b:%7b%26%2334%3br%26%2334%3b:0.0%2c%26%2334%3bg%26%2334%3b:0.79215687513351440%2c%26%2334%3bb%26%2334%3b:0.96470588445663452%2c%26%2334%3ba%26%2334%3b:1.0%7d%2c%26%2334%3bposition%26%2334%3b:0.92117291688919067%7d%5d%2c%26%2334%3btransform%26%2334%3b:%7b%26%2334%3bm00%26%2334%3b:12.0%2c%26%2334%3bm01%26%2334%3b:18.408504486083984%2c%26%2334%3bm02%26%2334%3b:-1.7042524814605713%2c%26%2334%3bm10%26%2334%3b:-19.0%2c%26%2334%3bm11%26%2334%3b:11.626423835754395%2c%26%2334%3bm12%26%2334%3b:14.186789512634277%7d%2c%26%2334%3bopacity%26%2334%3b:1.0%2c%26%2334%3bblendMode%26%2334%3b:%26%2334%3bNORMAL%26%2334%3b%2c%26%2334%3bvisible%26%2334%3b:true%7d' style=''/%3e%3cpath d='M16.1659 17.1295C16.7939 17.1295 17.3029 16.6205 17.3029 15.9925C17.3029 15.3645 16.7939 14.8555 16.1659 14.8555C15.5379 14.8555 15.0289 15.3645 15.0289 15.9925C15.0289 16.6205 15.5379 17.1295 16.1659 17.1295Z' fill='%2300EEDE' style='fill:%2300EEDE%3bfill:color(display-p3 0.0000 0.9333 0.8706)%3bfill-opacity:1%3b'/%3e%3cpath d='M12 21.5C6.7615 21.5 2.5 17.2385 2.5 12C2.5 6.7615 6.7615 2.5 12 2.5C17.2385 2.5 21.5 6.7615 21.5 12C21.5 17.2385 17.2385 21.5 12 21.5ZM12 4.01287C7.59597 4.01287 4.01287 7.59597 4.01287 12C4.01287 16.404 7.59597 19.9871 12 19.9871C16.404 19.9871 19.9871 16.404 19.9871 12C19.9871 7.59597 16.404 4.01287 12 4.01287Z' fill='url(%23paint1_linear_817_69395)' style=''/%3e%3cdefs%3e%3cclipPath id='paint0_angular_817_69395_clip_path'%3e%3cpath d='M10.679 19.7552C9.80555 19.7552 8.96551 19.5521 8.20112 19.1461C6.66675 18.3307 5.64119 16.8051 5.31234 14.8511C4.99464 12.9632 5.37047 10.8874 6.36975 9.00747C7.36904 7.12754 8.87952 5.65528 10.6225 4.86222C12.426 4.04129 14.2645 4.03891 15.7981 4.85426C17.3325 5.66962 18.358 7.19522 18.6869 9.14921C19.0046 11.0371 18.6287 13.1129 17.6295 14.9928C16.6302 16.8728 15.1197 18.345 13.3767 19.1381C12.4722 19.5498 11.5581 19.756 10.679 19.756V19.7552ZM13.3186 5.59955C12.6298 5.59955 11.906 5.76437 11.1831 6.09322C9.71 6.76366 8.42566 8.02411 7.56492 9.64208C6.70497 11.2601 6.37851 13.0301 6.64764 14.6258C6.90483 16.1554 7.68276 17.3362 8.83652 17.9501C9.99108 18.564 11.4044 18.5481 12.8162 17.9055C14.2892 17.2351 15.5736 15.9746 16.4343 14.3566C17.2942 12.7387 17.6207 10.9686 17.3516 9.37295C17.0944 7.84257 16.3164 6.66253 15.1627 6.04863C14.5997 5.74924 13.9747 5.59955 13.3186 5.59955Z'/%3e%3c/clipPath%3e%3clinearGradient id='paint1_linear_817_69395' x1='7.25119' y1='20.2252' x2='16.7488' y2='3.77399' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300E9A6' style='stop-color:%2300E9A6%3bstop-color:color(display-p3 0.0000 0.9137 0.6510)%3bstop-opacity:1%3b'/%3e%3cstop offset='0.5' stop-color='%2300EEDE' style='stop-color:%2300EEDE%3bstop-color:color(display-p3 0.0000 0.9333 0.8706)%3bstop-opacity:1%3b'/%3e%3cstop offset='1' stop-color='%2300CAF6' style='stop-color:%2300CAF6%3bstop-color:color(display-p3 0.0000 0.7922 0.9647)%3bstop-opacity:1%3b'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" }), import_react$8.createElement(H, {
			ref: ie,
			className: "".concat(q$1, "-content-input"),
			placeholder: null !== (u = t.placeholder) && void 0 !== u ? u : s$7(te ? "searchBox.placeholder-space" : "searchBox.placeholder"),
			onEnter: ae,
			onChange: function(e) {
				return J(e);
			},
			focus: t.focus,
			inputValue: t.inputValue
		})), import_react$8.createElement("div", { className: "".concat(q$1, "-content-footer") }, import_react$8.createElement("div", { className: "".concat(q$1, "-content-footer-left") }, import_react$8.createElement(T, {
			onSelect: function(e, n) {
				ce(), ee(n || ""), B(e);
			},
			onClick: function(e) {
				var n;
				return null === (n = t.onRangeClick) || void 0 === n ? void 0 : n.call(t, e);
			},
			wikiId: Y,
			initWikiId: t.initWikiId,
			spaces: ne,
			isEmbedded: t.isEmbedded
		}), import_react$8.createElement(f$1, { onModelChange: function(e) {
			return z(e.type);
		} })), import_react$8.createElement("div", { className: "".concat(q$1, "-content-footer-right") }, $ ? import_react$8.createElement("img", {
			src: (le = (null === (re = t.fileTaskManager) || void 0 === re ? void 0 : re.getFileData()) || [], [l$9.PART_DOCS].includes(P) && !le.length || P === l$9.Topic && !Y ? M : N),
			onClick: function() {
				return ae();
			}
		}) : !D && ua.isTencentDocsApp ? import_react$8.createElement("img", {
			src: F$1,
			className: "".concat(q$1, "-icon"),
			onClick: function() {
				return se();
			}
		}) : T$5 || ua.isTencentDocsApp ? null : import_react$8.createElement("img", {
			src: F$1,
			className: "".concat(q$1, "-icon"),
			onClick: function() {
				return se();
			}
		}))), T$5 || D ? import_react$8.createElement(U, {
			onSend: function(e) {
				e && (J(e), ae(e));
			},
			setVoiceShow: function(e) {
				var n;
				e || null === (n = ie.current) || void 0 === n || n.focus();
				S(e);
			},
			setNativeVoiceShow: function(e) {
				var n;
				e || null === (n = ie.current) || void 0 === n || n.focus();
				A(e);
			}
		}) : null));
	};
	e$12(".ai-component-mobile-search-box-append-search-wrapper {\n  display: flex;\n  padding: 12px;\n  border-radius: 12px;\n  border: 1.5px solid var(--Border-strong, rgba(0, 0, 0, 0.12));\n  border-bottom: 0;\n  color: var(--Text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-mobile-search-box-append-search-icon {\n  border-radius: 50%;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n}\n.ai-component-mobile-search-box-append-search-voice {\n  position: relative;\n  visibility: hidden;\n}\n.ai-component-mobile-search-box-append-search-content {\n  flex-direction: column;\n  gap: 12px;\n  border-left: none;\n  border-right: none;\n  border-bottom: none;\n  box-shadow: 0px -5px 12px -4px var(--border-medium, rgba(0, 0, 0, 0.08));\n}\n.ai-component-mobile-search-box-append-search-focus {\n  border: 1.5px solid rgba(134, 163, 251, 0.4);\n}\n.ai-component-mobile-search-box-append-search-input {\n  padding: 4px 0;\n  width: 100%;\n  max-height: 30vh;\n  overflow-y: auto;\n}\n.ai-component-mobile-search-box-append-search-button {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.ai-component-mobile-search-box-append-search-button-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.ai-component-mobile-search-box-append-search-send {\n  width: 32px;\n  height: 32px;\n  cursor: pointer;\n}\n");
	G = "ai-component-mobile-search-box-append-search";
	R = function(t) {
		var i = t.isGenerating, c = t.fileTaskManager, r = t.fileTasks, b = t.selectOnlineDoc, m = t.onStop, u = t.onSend, f = t.range, g = t.wikiId, v = t.onWikiChange, y = t.onModelChange, k = t.onRangeChange, E = t.className, _ = t.onFocusChange, T$6 = t.model, S = t.spaces, F = t$9((0, import_react$8.useState)(!1), 2), L = F[0], D = F[1], O = t$9((0, import_react$8.useState)(""), 2), Z = O[0], P = O[1], q = t$9((0, import_react$8.useState)(!1), 2), I = q[0], R = q[1], W = t$9((0, import_react$8.useState)(!1), 2), K = W[0], $ = W[1], J = function(e) {
			var n, t = null != e ? e : Z;
			i ? m?.() : t && (![l$9.PART_DOCS].includes(f) || null != c && c.getFileData().length) && (f !== l$9.Topic || g) && (u?.(t, null !== (n = null == c ? void 0 : c.getFileData()) && void 0 !== n ? n : []), P(""));
		}, Q = function(e) {
			e === l$9.PART_DOCS ? b(!0) : c?.clearFileTask(), k?.(e);
		}, X = !Z && !i;
		(0, import_react$8.useEffect)((function() {
			var e;
			i && ua.isTencentDocsApp && (null === (e = window.mqq) || void 0 === e || e.invoke("ui", "hideSpeechPanel"));
		}), [i]);
		return K ? import_react$8.createElement(U, {
			setVoiceShow: R,
			setNativeVoiceShow: $,
			onSend: function(e) {
				J(e), P(e);
			}
		}) : import_react$8.createElement("div", { className: (0, import_classnames$5.default)("".concat(G, "-wrapper ").concat(G, "-content"), e$14(e$14(e$14({}, "".concat(G, "-focus"), !!L), "".concat(G, "-disable"), i), "".concat(G, "-voice"), I), E) }, I ? import_react$8.createElement(U, {
			setVoiceShow: R,
			setNativeVoiceShow: $,
			onSend: function(e) {
				J(e), P(e);
			}
		}) : import_react$8.createElement(import_react$8.Fragment, null, !!r.length && import_react$8.createElement(j$1, {
			fileTasks: r,
			fileTaskManager: c,
			className: "ai-action-file-list"
		}), import_react$8.createElement(H, {
			className: "".concat(G, "-input"),
			onChange: function(e) {
				return P(e);
			},
			placeholder: s$7(i ? "searchBox.aiCreating" : "searchBox.append"),
			onFocus: function() {
				D(!0), _?.(!0);
			},
			onBlur: function() {
				D(!1), _?.(!1);
			},
			onEnter: function() {
				return J();
			},
			disabled: i,
			inputValue: Z
		}), import_react$8.createElement("div", { className: "".concat(G, "-button") }, import_react$8.createElement("div", { className: "".concat(G, "-button-left") }, import_react$8.createElement(T, {
			disabled: i,
			selectId: f,
			onClick: function(e, n) {
				Q?.(e), v?.(n || "");
			},
			spaces: S,
			wikiId: g,
			initWikiId: o$11("wikiId"),
			isEmbedded: !!o$11("isEmbedded")
		}), import_react$8.createElement(f$1, {
			onModelChange: function(e) {
				var n = e.type;
				y?.(n);
			},
			initialType: T$6,
			disabled: i
		})), X ? import_react$8.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.2825 13.7185C12.6075 14.0435 12.8655 14.4298 13.0414 14.8544C13.2172 15.2789 13.3072 15.7339 13.3072 16.1934C13.3072 16.6528 13.2172 17.1078 13.0414 17.5323C12.8655 17.9569 12.6075 18.3432 12.2825 18.6682L10.1612 16.5469C9.9659 16.3517 9.9659 16.0351 10.1612 15.8398L12.2825 13.7185ZM14.8423 11.1587C15.1859 10.8151 15.7474 10.8124 16.0511 11.1917C16.5223 11.78 16.9088 12.4332 17.1984 13.1322C17.6004 14.1028 17.8081 15.1429 17.8081 16.1934C17.8081 17.2439 17.6004 18.284 17.1984 19.2545C16.9088 19.9535 16.5223 20.6067 16.0511 21.1951C15.7474 21.5744 15.1859 21.5717 14.8423 21.228V21.228C14.4987 20.8844 14.5045 20.3304 14.7963 19.9418C15.0491 19.6051 15.2674 19.2431 15.4479 18.8616L15.5722 18.5812C15.8466 17.9187 16.0052 17.2147 16.0404 16.5L16.0473 16.1934C16.0473 15.4765 15.9243 14.7657 15.6834 14.0921L15.5722 13.8055C15.3711 13.3202 15.1103 12.8631 14.7963 12.4449C14.5045 12.0563 14.4987 11.5023 14.8423 11.1587V11.1587ZM18.4023 7.59863C18.7324 7.26856 19.2699 7.26682 19.5778 7.61763C20.5153 8.68566 21.2727 9.90163 21.8181 11.2181C22.4714 12.7953 22.8076 14.4862 22.8076 16.1934C22.8076 17.9005 22.4714 19.5914 21.8181 21.1687C21.2727 22.4851 20.5153 23.7011 19.5778 24.7691C19.2699 25.1199 18.7324 25.1182 18.4023 24.7881V24.7881C18.0723 24.458 18.075 23.9248 18.3795 23.5711C19.0415 22.8023 19.5975 21.9477 20.0317 21.0299L20.2568 20.5216C20.7541 19.3209 21.0403 18.0446 21.1041 16.7492L21.1172 16.1934C21.1172 14.8938 20.8938 13.6054 20.457 12.3844L20.2568 11.8651C19.7964 10.7536 19.1621 9.72469 18.3795 8.81568C18.075 8.46192 18.0723 7.92871 18.4023 7.59863V7.59863Z' fill='black' fill-opacity='0.88' style='fill:black%3bfill-opacity:0.88%3b'/%3e%3c/svg%3e",
			className: "".concat(G, "-icon"),
			onClick: function() {
				ua.isTencentDocsApp ? $(!0) : R(!0);
			}
		}) : import_react$8.createElement("img", {
			onClick: function() {
				return J();
			},
			src: i ? "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='16' cy='16' r='16' fill='url(%23paint0_radial_1099_129880)' style=''/%3e%3cpath d='M10 12C10 10.8954 10.8954 10 12 10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V12Z' fill='white' style='fill:white%3bfill-opacity:1%3b'/%3e%3cdefs%3e%3cradialGradient id='paint0_radial_1099_129880' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)'%3e%3cstop offset='0.327165' stop-color='%232C91FF' style='stop-color:%232C91FF%3bstop-color:color(display-p3 0.1725 0.5686 1.0000)%3bstop-opacity:1%3b'/%3e%3cstop offset='1' stop-color='%232175FF' style='stop-color:%232175FF%3bstop-color:color(display-p3 0.1294 0.4588 1.0000)%3bstop-opacity:1%3b'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e" : Z && (![l$9.PART_DOCS].includes(f) || null != c && c.getFileData().length) && (f !== l$9.Topic || g) ? N : M,
			className: "".concat(G, "-send")
		}))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/reference/index.js
var import_react$6, import_classnames$4, b$1;
var init_reference = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_index_24c917bb();
	init_index_33302b4d();
	init_esm$4();
	init_esm$2();
	init_index_54f3d2bb();
	init_esm$9();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-collapse-card-content .ai-component-mobile-search-reference-wrapper-content {\n  margin-top: 12px;\n}\n.ai-component-mobile-collapse-card-content .ai-component-mobile-with-thinking-factory_thinking_content {\n  margin-top: 12px;\n}\n.ai-component-mobile-search-reference-wrapper {\n  position: relative;\n  min-width: 231px;\n}\n.ai-component-mobile-search-reference-wrapper-content {\n  border-left: 2px solid #d9d9d9;\n  padding-left: 4px;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-icon {\n  width: 16px;\n  height: 16px;\n  margin: 0 2px;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-icon.hide {\n  display: none;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-item {\n  height: 36px;\n  padding: 0 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  color: var(--text-link, #175ceb);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  overflow: hidden;\n  border-radius: 8px;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-item .ai-search-item__left {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  gap: 4px;\n  user-select: none;\n  overflow: hidden;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-item .ai-search-item__left .ai-search-item_icon {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-mobile-search-reference-wrapper .ai-search-item .ai-search-item__left > span {\n  flex: 1;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n");
	b$1 = function(u) {
		var b = u.references, g = u.className, x = u.titleTips, v = u.referenceProcesses, w = u.onReferenceOpen, C = u.onReferenceSave, E = u.onReferenceSaveShow, k = u.onReferenceExpandChange, _ = (0, import_react$6.useMemo)((function() {
			return G$4(b);
		}), [b]).referencesWithSource, N = S$4.isSupportSpace();
		return import_react$6.createElement(l$8, { case: void 0 }, import_react$6.createElement(l$8.Case, { case: Boolean((null == v ? void 0 : v.message) && (null == v ? void 0 : v.step) !== u$6.CITING) }, import_react$6.createElement(m$8, {
			visible: !0,
			tips: null == v ? void 0 : v.message
		})), import_react$6.createElement(l$8.Case, { case: !b.length }, null), import_react$6.createElement(l$8.Default, null, import_react$6.createElement("div", { className: (0, import_classnames$4.default)("ai-component-mobile-search-reference-wrapper", g) }, import_react$6.createElement(m$7, {
			title: s$7("reference.reference-count", { count: b.length }),
			expand: !1,
			fullContent: !0,
			tips: x,
			onExpandChange: k
		}, import_react$6.createElement("div", { className: "ai-component-mobile-search-reference-wrapper-content" }, _.map((function(n, r) {
			return import_react$6.createElement("li", {
				className: (0, import_classnames$4.default)("ai-search-item"),
				key: n.title + r,
				onClick: function(r) {
					r.stopPropagation(), r.preventDefault(), function(n) {
						var r = "ai-component-mobile-reference-modal-content", i = s$6[n.source];
						n.source === l$7.DOCS && (i = T$3(n.url, n.ext).docTypeLabel);
						var o = "";
						N && (n.source === l$7.DOCS || n.isSavable) ? o = s$7("reference.saveToSpace") : n.isSavable && (o = s$7("reference.save-as-document")), BottomModal_default.show({
							className: "ai-component-mobile-reference-modal",
							style: { paddingTop: 14 },
							title: "".concat(s$7("reference.reference-title")).concat(n.index),
							content: import_react$6.createElement("div", { className: r }, import_react$6.createElement("div", { className: "".concat(r, "-title") }, n.title), import_react$6.createElement("div", { className: "".concat(r, "-content") }, n.abstract), import_react$6.createElement("div", { className: "".concat(r, "-info") }, import_react$6.createElement("div", { className: "".concat(r, "-info-left") }, import_react$6.createElement("img", {
								src: n.icon,
								alt: ""
							}), " ", i), import_react$6.createElement("div", { className: "".concat(r, "-info-right") }, f$5(n)))),
							primaryActionClassName: "ai-component-mobile-reference-modal-footer",
							primaryAction: import_react$6.createElement("div", { className: "ai-component-mobile-reference-modal-footer-action" }, import_react$6.createElement("span", { onClick: function() {
								w?.(n);
							} }, n.source === l$7.DOCS ? s$7("reference.open-document") : s$7("reference.open-link")), o && import_react$6.createElement("span", { onClick: function() {
								E?.(), C?.(n);
							} }, o))
						});
					}(n);
				}
			}, import_react$6.createElement("span", { className: "ai-search-item__left" }, import_react$6.createElement("img", {
				src: n.icon || "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3elist_24_link_blue%3c/title%3e %3cg id='%e9%a1%b5%e9%9d%a2-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e8%b5%84%e6%ba%90_%e9%93%be%e6%8e%a5%e5%a4%9a%e6%80%81%e5%88%87%e6%8d%a2' transform='translate(-17.000000%2c -176.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84' transform='translate(17.000000%2c 128.000000)'%3e %3cg transform='translate(0.000000%2c 48.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' x='0' y='0' width='24' height='24' rx='2'%3e%3c/rect%3e %3cpath d='M6.28556158%2c12 C6.54856135%2c12.2629998 6.54856135%2c12.6894066 6.28556158%2c12.9524064 L5.33315518%2c13.9048128 L5.33315518%2c13.9048128 C4.01815635%2c15.2198116 4.01815635%2c17.351846 5.33315518%2c18.6668448 C6.59555405%2c19.9292437 8.61093287%2c19.9797397 9.93357014%2c18.8183327 L10.0951872%2c18.6668448 L12.9524064%2c15.8096256 C14.2674052%2c14.4946268 14.2674052%2c12.3625924 12.9524064%2c11.0475936 C12.7895162%2c10.8847034 12.6140894%2c10.7419906 12.4292319%2c10.6194552 L13.3949063%2c9.6527821 C13.5726629%2c9.7860541 13.7431481%2c9.93352246 13.9048128%2c10.0951872 C15.7458112%2c11.9361856 15.7458112%2c14.9210337 13.9048128%2c16.762032 L11.0475936%2c19.6192512 C9.20659523%2c21.4602496 6.22174714%2c21.4602496 4.38074877%2c19.6192512 C2.53975041%2c17.7782529 2.53975041%2c14.7934048 4.38074877%2c12.9524064 L5.33315518%2c12 C5.59615494%2c11.7370002 6.02256181%2c11.7370002 6.28556158%2c12 Z M12.9524064%2c4.38074877 C14.7934048%2c2.53975041 17.7782529%2c2.53975041 19.6192512%2c4.38074877 C21.4602496%2c6.22174714 21.4602496%2c9.20659523 19.6192512%2c11.0475936 L18.6668448%2c12 C18.4038451%2c12.2629998 17.9774382%2c12.2629998 17.7144384%2c12 C17.4514387%2c11.7370002 17.4514387%2c11.3105934 17.7144384%2c11.0475936 L18.6668448%2c10.0951872 L18.6668448%2c10.0951872 C19.9818437%2c8.78018836 19.9818437%2c6.64815401 18.6668448%2c5.33315518 C17.4044459%2c4.0707563 15.3890671%2c4.02026034 14.0664299%2c5.18166731 L13.9048128%2c5.33315518 L11.0475936%2c8.19037439 C9.73259477%2c9.50537322 9.73259477%2c11.6374076 11.0475936%2c12.9524064 C11.2108231%2c13.1156359 11.3866416%2c13.2586039 11.5719236%2c13.3813104 L10.6061821%2c14.3480337 C10.428033%2c14.2145478 10.2571819%2c14.0668075 10.0951872%2c13.9048128 C8.25418883%2c12.0638144 8.25418883%2c9.07896635 10.0951872%2c7.23796798 L12.9524064%2c4.38074877 Z' id='%e5%bd%a2%e7%8a%b6' fill='%231E6FFF'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
				className: (0, import_classnames$4.default)("ai-search-item_icon", { "ai-search-item_icon__link": n.source === l$7.LINK }),
				alt: ""
			}), import_react$6.createElement("span", null, "".concat(n.title))));
		})))))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/auth-card/index.js
function s(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		n && (a = a.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, a);
	}
	return t;
}
function d$1(n) {
	for (var t = 1; t < arguments.length; t++) {
		var a = null != arguments[t] ? arguments[t] : {};
		t % 2 ? s(Object(a), !0).forEach((function(t) {
			e$14(n, t, a[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(a)) : s(Object(a)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(a, e));
		}));
	}
	return n;
}
var import_react$5, import_classnames$3, p, h$1, u;
var init_auth_card = __esmMin((() => {
	init_defineProperty_28d1b327();
	init_slicedToArray_e715395f();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$5();
	init_esm$9();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-auth-card {\n  display: flex;\n  padding: 20px 16px;\n  flex-direction: column;\n  border-radius: 16px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  box-sizing: border-box;\n}\n.ai-component-mobile-auth-card-title-main {\n  display: flex;\n  align-items: center;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.ai-component-mobile-auth-card-title-main img {\n  width: 28px;\n  height: 28px;\n  margin-right: 4px;\n}\n.ai-component-mobile-auth-card-title-desc {\n  margin-top: 8px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 26px;\n}\n.ai-component-mobile-auth-card-divider {\n  height: 1px;\n  background-color: var(--border-strong, rgba(0, 0, 0, 0.24));\n  margin: 20px 0;\n}\n.ai-component-mobile-auth-card-content-checkbox {\n  margin-right: 8px;\n}\n.ai-component-mobile-auth-card-content-checkbox .dui-m-checkbox-label {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-component-mobile-auth-card-content-checkbox .dui-checkbox-icon {\n  top: 3px;\n}\n.ai-component-mobile-auth-card-content-checkbox .dui-checkbox-label {\n  line-height: 24px;\n}\n.ai-component-mobile-auth-card-content-desc {\n  margin-top: 6px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  margin-left: 30px;\n  margin-bottom: 16px;\n}\n.ai-component-mobile-auth-card-content-wrapper {\n  max-height: 190px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  row-gap: 12px;\n  margin-top: 20px;\n}\n.ai-component-mobile-auth-card-content-scope-desc {\n  margin-left: 24px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-mobile-auth-card-content-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-left: 26px;\n}\n.ai-component-mobile-auth-card-content-list-item {\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n}\n.ai-component-mobile-auth-card-content-list-item img {\n  position: relative;\n  top: 3px;\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.ai-component-mobile-auth-card-content-list-item-not-checked {\n  opacity: 0.5 !important;\n}\n.ai-component-mobile-auth-card-footer {\n  margin-bottom: 16px;\n  margin-top: 30px;\n  display: flex;\n  justify-content: center;\n}\n.ai-component-mobile-auth-card-footer .dui-button {\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-component-mobile-auth-card-agree {\n  color: var(--text-muted, rgba(0, 0, 0, 0.48));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 18px;\n  display: flex;\n  align-items: center;\n}\n.ai-component-mobile-auth-card-agree > div {\n  display: inline-block;\n}\n.ai-component-mobile-auth-card-agree .dui-m-checkbox-icon {\n  top: -2px;\n}\n.ai-component-mobile-auth-card-agree * {\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-mobile-auth-card-agree-link {\n  font-family: \"PingFang SC\";\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n}\n");
	p = "ai-component-mobile";
	h$1 = [
		{
			id: "smartsheet",
			label: s$7("authCard.list-item.smartsheet")
		},
		{
			id: "smartCanvas",
			label: s$7("authCard.list-item.smartCanvas")
		},
		{
			id: "sheet",
			label: s$7("authCard.list-item.sheet")
		},
		{
			id: "slide",
			label: s$7("authCard.list-item.slide")
		},
		{
			id: "doc",
			label: s$7("authCard.list-item.doc")
		},
		{
			id: "form",
			label: s$7("authCard.list-item.form")
		},
		{
			id: "mindMap",
			label: s$7("authCard.list-item.mindMap")
		},
		{
			id: "pdf",
			label: s$7("authCard.list-item.pdf")
		},
		{
			id: "voiceNotes",
			label: s$7("authCard.list-item.voiceNotes")
		}
	];
	u = function(m) {
		var s = m.onAgree, g = t$9((0, import_react$5.useState)(!1), 2), f = g[0], b = g[1], v = t$9((0, import_react$5.useState)({
			doc: !0,
			sheet: !0,
			slide: !0,
			smartCanvas: !0,
			mindMap: !0,
			pdf: !0,
			form: !0,
			smartSheet: !0
		}), 2), y = v[0], C = v[1], w = Object.values(y).every(Boolean), k = function(e) {
			openUrl({ url: e });
		}, E = function(e) {
			e.preventDefault(), e.stopPropagation(), b(!f);
		};
		return import_react$5.createElement("div", { className: "".concat(p, "-auth-card") }, import_react$5.createElement("div", { className: "".concat(p, "-auth-card-title") }, import_react$5.createElement("div", { className: "".concat(p, "-auth-card-title-main") }, import_react$5.createElement("span", null, s$7("authCard.title"))), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-title-desc") }, s$7("authCard.title-desc"), " ", s$7("authCard.content-title-desc"))), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-divider") }), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-content") }, import_react$5.createElement(Checkbox_default, {
			shape: "circle",
			className: "".concat(p, "-auth-card-content-checkbox"),
			iconStyle: {
				width: 18,
				height: 18
			},
			checked: w,
			onChange: function(e) {
				C(e ? {
					doc: !0,
					sheet: !0,
					slide: !0,
					smartCanvas: !0,
					mindMap: !0,
					pdf: !0,
					form: !0,
					smartSheet: !0
				} : {
					doc: !1,
					sheet: !1,
					slide: !1,
					smartCanvas: !1,
					mindMap: !1,
					pdf: !1,
					form: !0,
					smartSheet: !0
				});
			}
		}, s$7("authCard.content-title")), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-content-wrapper") }, import_react$5.createElement("div", { className: "".concat(p, "-auth-card-content-list") }, h$1.map((function(n, a) {
			return import_react$5.createElement("div", {
				className: (0, import_classnames$3.default)("".concat(p, "-auth-card-content-list-item"), e$14({}, "".concat(p, "-auth-card-content-list-item-not-checked"), !y[n.id])),
				key: a,
				onClick: function() {
					t = n.id, C(d$1(d$1({}, y), {}, e$14({}, t, !y[t])));
					return;
					var t;
				}
			}, import_react$5.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.0304 7.53039L10.5001 17.0607L4.96973 11.5304L6.03039 10.4697L10.5001 14.9394L18.9697 6.46973L20.0304 7.53039Z' fill='%23454D5A'/%3e%3c/svg%3e" }), n.label);
		}))), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-content-scope-desc") }, s$7("authCard.scope-desc")))), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-footer") }, import_react$5.createElement(Button_default, {
			type: "primary",
			style: {
				width: 200,
				borderRadius: 12,
				height: 40
			},
			onClick: function() {
				w && f && s?.();
			},
			disabled: !w || !f
		}, s$7("authCard.agree-button"))), import_react$5.createElement("div", { className: "".concat(p, "-auth-card-agree") }, import_react$5.createElement(Checkbox_default, {
			shape: "circle",
			checked: f,
			labelClickable: !1,
			onClick: E
		}, import_react$5.createElement("span", { onClick: E }, s$7("authCard.agree-desc")), import_react$5.createElement("span", {
			className: "".concat(p, "-auth-card-agree-link"),
			onMouseDown: function() {
				return k("https://docs.qq.com/doc/DZHVMdVRPS0lQeWRD?pub=1&dver=2.1.0");
			}
		}, "\xA0", s$7("authCard.serviceAgreement")), import_react$5.createElement("span", { style: { margin: "0 4px" } }, s$7("authCard.and")), import_react$5.createElement("span", {
			className: "".concat(p, "-auth-card-agree-link"),
			onMouseDown: function() {
				return k("https://docs.qq.com/doc/p/30cb57a3280b16bd48fb49001022ada97479339a");
			}
		}, s$7("authCard.privacyAgreement")))));
	};
})), import_react$4, E$1, h, S$1, g, I$1, _;
var init_error_message = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_auth_card();
	init_esm$4();
	init_esm$2();
	init_index_33302b4d();
	init_index_9822dcca();
	init_slicedToArray_e715395f();
	init_suggestions();
	init_index_41de3dd7();
	init_esm$5();
	require_classnames();
	E$1 = function(r) {
		var n = r.message.error, t = (void 0 === n ? {} : n).message, o = void 0 === t ? s$7("errorMessage.commonError") : t;
		return import_react$4.createElement("div", null, o);
	};
	h = function(o) {
		var c = o.props, i = t$9((0, import_react$4.useState)(v$5.getInstance().isSVIP()), 2), v = i[0], E = i[1], h = function() {
			var e = r$9(s$3.mark((function e() {
				var r;
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, v$5.getInstance().checkIsSVIP();
						case 2: r = e.sent, E(r);
						case 4:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}();
		(0, import_react$4.useEffect)((function() {
			v$4.aiSearchResultPageShow(), v$4.aiSearchNoResultByMine(), h();
		}), []);
		var S = function() {
			var e;
			v$4.aiTryWebWhenNoResultByMine(), null == c || null === (e = c.onGotoGlobalWebSearch) || void 0 === e || e.call(c);
		}, g = (0, import_react$4.useMemo)((function() {
			return [{
				text: s$7("errorMessage.searchNotFoundUniversalRecommend"),
				onClick: S
			}];
		}), [v]), I = (0, import_react$4.useMemo)((function() {
			return s$7("errorMessage.searchNotFoundVip");
		}), [v]);
		return import_react$4.createElement(import_react$4.Fragment, null, import_react$4.createElement("div", null, I), import_react$4.createElement(t, {
			questions: g,
			noTitle: !0
		}));
	};
	S$1 = function() {
		return import_react$4.createElement("div", null, s$7("errorMessage.sensitiveError"));
	};
	g = function(e) {
		var r = e.props;
		return (0, import_react$4.useEffect)((function() {
			var e;
			null == r || null === (e = r.onStorageOverflow) || void 0 === e || e.call(r);
		}), []), null;
	};
	I$1 = function(e) {
		var r = e.props;
		return (0, import_react$4.useEffect)((function() {
			var e;
			null == r || null === (e = r.onUseLimit) || void 0 === e || e.call(r);
		}), []), null;
	};
	_ = function(r) {
		var n, t, a, s = r.message, u$10 = r.errorMessageProps;
		return import_react$4.createElement(l$8, { case: null === (n = s.error) || void 0 === n ? void 0 : n.code }, import_react$4.createElement(l$8.Case, { case: _$7.NOT_FOUND }, import_react$4.createElement(h, { props: null == u$10 ? void 0 : u$10[_$7.NOT_FOUND] })), import_react$4.createElement(l$8.Case, { case: _$7.SENSITIVE_BLOCK }, import_react$4.createElement(S$1, null)), import_react$4.createElement(l$8.Case, { case: _$7.USER_STORAGE_OVERFLOW }, import_react$4.createElement(g, { props: null == u$10 ? void 0 : u$10[_$7.USER_STORAGE_OVERFLOW] })), import_react$4.createElement(l$8.Case, { case: _$7.AI_USE_LIMIT }, import_react$4.createElement(I$1, { props: null == u$10 ? void 0 : u$10[_$7.AI_USE_LIMIT] })), import_react$4.createElement(l$8.Case, { case: E$7.NoAuth }, import_react$4.createElement(u, { onAgree: null == s || null === (t = s.errorUtils) || void 0 === t ? void 0 : t.onStart })), import_react$4.createElement(l$8.Case, { case: E$7.NoImport }, import_react$4.createElement(E, { onStartAISearch: null == s || null === (a = s.errorUtils) || void 0 === a ? void 0 : a.onStart })), import_react$4.createElement(l$8.Default, null, import_react$4.createElement(E$1, { message: s })));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/feedback/index.js
var import_react$3, u$1, m$2;
var init_feedback = __esmMin((() => {
	init_index_9822dcca();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	init_esm$6();
	init_esm$2();
	init_icon_modal_close_24_e8c49860();
	init_esm$9();
	u$1 = function(r) {
		var l = r.inputId, u = r.outputId, m = r.category, d = r.close, p = r.callback, f = u$7(), b = f.feedback, k = f.evaluateList, h = f.setFeedback, v = f.setEvaluateList, g = u$9().feedbackRequest, x = function() {
			var a = r$9(s$3.mark((function e() {
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, g({
							evaluate: k,
							inputId: l,
							outputId: u,
							category: m,
							additionalComments: b
						});
						case 2: p(), d();
						case 4:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return a.apply(this, arguments);
			};
		}();
		return import_react$3.createElement(import_react$3.Fragment, null, import_react$3.createElement(d$4, {
			setFeedback: h,
			setEvaluateList: v,
			feedback: b,
			evaluateList: k
		}), import_react$3.createElement("div", { className: "ai-mobile-feedback-footer" }, import_react$3.createElement(Button_default, {
			disabled: !(b || k.length > 1),
			className: "ai-mobile-feedback-footer-button",
			onClick: x
		}, s$7("universalSearchActions.feedback.submit"))));
	};
	m$2 = function(e, t, c, o, i) {
		var s = PullPanel_default.show({
			pullable: !1,
			panelHeight: "65vh",
			title: s$7("universalSearchActions.feedback.pull-panel-title"),
			headerStyle: {
				padding: "0px 16px 0",
				height: 56
			},
			cancelText: " ",
			okText: import_react$3.createElement("img", {
				src: e$8,
				onClick: function() {
					return s();
				}
			}),
			className: "ai-mobile-feedback-pull-panel",
			mask: !0,
			content: import_react$3.createElement(u$1, {
				inputId: e,
				outputId: t,
				category: c,
				actionType: i,
				close: function() {
					return s();
				},
				callback: o
			})
		}).close;
	};
})), import_react$2, P, j, L, q, z, W$1, K, Q, $, J, X;
var init_message = __esmMin((() => {
	init_extends_559f37d0();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_error_message();
	init_markdown_render();
	init_reference();
	init_suggestions();
	init_with_thinking();
	init_esm$2();
	init_index_54f3d2bb();
	init_lodash();
	init_index_33302b4d();
	init_esm$5();
	init_style_inject_es_3984fa0f();
	init_slicedToArray_e715395f();
	init_esm$6();
	init_esm$4();
	init_esm$9();
	init_defineProperty_28d1b327();
	init_index_9822dcca();
	init_esm$8();
	init_feedback();
	require_classnames();
	P = (0, import_react$2.createContext)("");
	e$12(".ai-component-mobile-files-message-title {\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-weight: 400;\n  margin-bottom: 10px;\n}\n.ai-component-mobile-files-message-list {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.ai-component-mobile-files-message-item {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.ai-component-mobile-files-message-item img {\n  width: 20px;\n  height: 20px;\n  margin-right: 5px;\n}\n.ai-component-mobile-files-message-item-name {\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--text-link, #0060FD);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n");
	j = function(e) {
		var n = e.files, i = e.title;
		if (null == n || !n.length) return null;
		return import_react$2.createElement("div", { className: "ai-component-mobile-files-message" }, import_react$2.createElement("div", { className: "ai-component-mobile-files-message-title" }, i || s$7("files-message.title")), import_react$2.createElement("div", { className: "ai-component-mobile-files-message-list" }, n.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: "ai-component-mobile-files-message-item",
				onClick: function() {
					var t;
					(t = null == e ? void 0 : e.url) && openUrl({ url: t });
				}
			}, import_react$2.createElement("img", {
				src: e.iconUrl,
				alt: e.name
			}), import_react$2.createElement("div", { className: "ai-component-mobile-files-message-item-name" }, e.name));
		}))));
	};
	L = function(e) {
		var n, i, r, l = e.message;
		return l.functionCall ? import_react$2.createElement(l$8, { case: void 0 }, import_react$2.createElement(l$8.Case, { case: "createDocuments" === l.functionCall.name && "slide" === (null === (n = l.functionCall.parameter) || void 0 === n ? void 0 : n.category) }, import_react$2.createElement("div", null, s$7("function-call.slide.not-support-case-of-slide"))), import_react$2.createElement(l$8.Case, { case: "createDocuments" === l.functionCall.name && "mind" === (null === (i = l.functionCall.parameter) || void 0 === i ? void 0 : i.category) }, import_react$2.createElement("div", null, s$7("function-call.mind.not-support-case-of-mind"))), import_react$2.createElement(l$8.Case, { case: "createDocuments" === l.functionCall.name && "flowchart" === (null === (r = l.functionCall.parameter) || void 0 === r ? void 0 : r.category) }, import_react$2.createElement("div", null, s$7("function-call.flow.not-support-case-of-flow"))), import_react$2.createElement(l$8.Case, { case: "createDocuments" === l.functionCall.name }, import_react$2.createElement("div", null, s$7("function-call.default")))) : null;
	};
	e$12(".ai-component-pc-message-buttons-button {\n  background-color: var(--bg-lv1-default, #fff);\n  border-radius: 8px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  text-align: center;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n  cursor: pointer;\n}\n.ai-component-pc-message-buttons-divider {\n  margin: 28px 0 4px;\n  height: 1px;\n  background-color: rgba(0, 0, 0, 0.24);\n}\n");
	z = function(e) {
		var n = e.message, i = e.handleCreateSlide, r = e.handleCreateMindMap, l = e.handleCreateFlowChart;
		if (!("buttons" in n)) return null;
		var o = n.buttons, a = void 0 === o ? [] : o;
		return import_react$2.createElement("div", null, a.map((function(e) {
			return import_react$2.createElement(Button_default, {
				className: "ai-component-pc-message-buttons-button",
				key: e.type,
				onClick: function() {
					return function(e) {
						switch (e) {
							case o$10.CREATE_SLIDE:
								i?.();
								break;
							case o$10.CREATE_MINDMAP:
								r?.();
								break;
							case o$10.CREATE_FLOW_CHART: l?.();
						}
					}(e.type);
				}
			}, (n = e.type, e$14(e$14(e$14({}, o$10.CREATE_SLIDE, s$7("message-buttons.create-slide")), o$10.CREATE_MINDMAP, s$7("message-buttons.create-mindmap")), o$10.CREATE_FLOW_CHART, s$7("message-buttons.create-flow-chart"))[n] || ""));
			var n;
		})), import_react$2.createElement("div", { className: "ai-component-pc-message-buttons-divider" }));
	};
	(function(e) {
		e.MIND = "https://docs.qq.com/mind/viewer/", e.FLOWCHART = "https://docs.qq.com/flowchart/viewer/";
	})(q || (q = {}));
	W$1 = function(e) {
		var n, a, c, s = e.message, d = e.markdownText, f = (0, import_react$2.useRef)(null), p = t$9((0, import_react$2.useState)(void 0), 2), g = p[0], h = p[1], v = (0, import_react$2.useContext)(P), x = null !== (n = s.description) && void 0 !== n && n.isMindOutline ? q.MIND : q.FLOWCHART, _ = s.messageStatus === M$2.FINISH, C = !!("buttons" in s);
		return (0, import_react$2.useEffect)((function() {
			var e;
			if (C) {
				var t, n;
				e = function(e) {
					var t = e.data;
					if ("SEND_DATA" === (null == t ? void 0 : t.command)) {
						var n, i;
						if ("0" !== (null == t || null === (n = t.params) || void 0 === n ? void 0 : n.code)) {
							var r, l = null !== (r = s.description) && void 0 !== r && r.isMindOutline ? s$7("category-name.mindMap") : s$7("category-name.flowChart");
							Snackbar_default.show({
								message: s$7("toast.create-file-failed", { type: l }),
								type: "error"
							});
							return;
						}
						h(null == t || null === (i = t.params) || void 0 === i ? void 0 : i.data);
					}
				}, window.addEventListener("message", e);
				var i = null === (t = f.current) || void 0 === t || null === (n = t.getIframe) || void 0 === n ? void 0 : n.call(t);
				setTimeout((function() {
					var e;
					i && (null === (e = i.contentWindow) || void 0 === e || e.postMessage({ command: "GET_DATA" }, "https://docs.qq.com"));
				}), 200);
			}
			return function() {
				e && window.removeEventListener("message", e);
			};
		}), [C]), import_react$2.createElement(import_react$2.Fragment, null, s.messageStatus === M$2.IN_PROGRESS || s.messageStatus === M$2.FINISH ? import_react$2.createElement(T$4, {
			type: x,
			value: (c = d, null !== (a = s.description) && void 0 !== a && a.isMindOutline && (c = ae$1(c)), c),
			done: _,
			origin: "https://docs.qq.com",
			ref: f
		}) : null, import_react$2.createElement(z, {
			message: s,
			handleCreateMindMap: function() {
				C$4.createMindMap({
					originChartData: g,
					text: d,
					conversationId: v,
					parentMessageId: s.parentMessageId || ""
				});
			},
			handleCreateFlowChart: function() {
				C$4.createFlowChart({
					originChartData: g,
					text: d,
					conversationId: v,
					parentMessageId: s.parentMessageId || ""
				});
			}
		}));
	};
	K = Pn$1({
		Snackbar: Snackbar_default,
		Tooltip: Tooltip_default,
		Modal: Modal_default
	});
	Q = function(e) {
		var n, c, s, d = e.message, f = e.markdownText, u = e.onEditOutline, p = e.isHistoryMessage, g = t$9((0, import_react$2.useState)(!1), 2), v = g[0], x = g[1], _ = (0, import_react$2.useRef)(null), C = (0, import_react$2.useRef)(), y = (0, import_react$2.useContext)(P), S = (0, import_react$2.useRef)(null), b = (0, import_react$2.useMemo)((function() {
			var e;
			return (null === (e = f.match(/^#(?!#)\s*(.+?)(?:\s*#*)?$/m)) || void 0 === e || null === (e = e[1]) || void 0 === e ? void 0 : e.trim()) || "";
		}), [f]);
		o$12(v, {
			container: S.current,
			onConfirm: function(e) {
				var t = null == e ? void 0 : e.id, n = !(null == e || !e.isCustom);
				t && E({
					id: t,
					isCustom: n,
					isCustomTemplate: n
				}, !0);
			},
			showNavigation: !0,
			useOutlinePreview: !0,
			showImageGeneration: !1,
			useModal: !0,
			aid: getAidForReport({
				position: "chatfloat",
				feature: "template",
				apprec1: "thumbnail",
				apprec2: "aislide",
				apprec4: "slide"
			}),
			aidOptions: {
				position: "chatfloat",
				feature: "space",
				apprec1: "createppt"
			},
			query: b,
			handleVisibleChange: x
		});
		var E = function(e, t) {
			C$4.createSlide({
				templateInfo: e,
				enableImageGeneration: t,
				text: f,
				messageId: d.id,
				parentMessageId: d.parentMessageId || "",
				conversationId: y,
				onError: function() {
					x(!1);
				},
				onSuccess: function() {
					x(!1);
				}
			});
		}, F = null !== (n = d.description) && void 0 !== n && n.isDocOutline ? q$4.DOC : q$4.PPT, A = (0, import_react$2.useMemo)((function() {
			return d.messageStatus === M$2.IN_PROGRESS;
		}), [d.messageStatus]), G = d.messageStatus === M$2.ERROR ? "" : (null == d || null === (c = d.content) || void 0 === c ? void 0 : c.text) || "", O = function() {
			var e = r$9(s$3.mark((function e() {
				var t, n, i;
				return s$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (C.current) {
								e.next = 7;
								break;
							}
							return e.next = 3, O$4.getSlideOutlineExtension();
						case 3: C.current = e.sent, C.current.updateOption({
							id: null == d ? void 0 : d.id,
							content: f
						}), i = (null == d || null === (t = d.description) || void 0 === t ? void 0 : t.slidePageCount) && (null == d || null === (n = d.description) || void 0 === n ? void 0 : n.slidePageCount) <= 5 && (null == d ? void 0 : d.description.slidePageCount) > 0 || !1, C.current.show({
							id: null == d ? void 0 : d.id,
							container: _.current,
							showCover: !i,
							showToc: !i,
							loading: A,
							showFooter: !i,
							onChange: u
						});
						case 7:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}();
		return (0, import_react$2.useEffect)((function() {
			C.current && C.current.updateOption({
				id: null == d ? void 0 : d.id,
				content: f
			});
		}), [f]), (0, import_react$2.useEffect)((function() {
			var e;
			null === (e = C.current) || void 0 === e || e.updateOption({
				id: null == d ? void 0 : d.id,
				loading: A
			});
		}), [A]), (0, import_react$2.useEffect)((function() {
			F === q$4.PPT && G && _.current && O();
		}), [e, F]), G ? import_react$2.createElement(import_react$2.Fragment, null, F === q$4.PPT ? import_react$2.createElement("div", { ref: _ }) : import_react$2.createElement(K, {
			value: f,
			readonly: d.messageStatus === M$2.IN_PROGRESS || p,
			onChange: function(e) {
				u?.(e.text);
			},
			config: { writingInfo: { templateID: (null === (s = d.description) || void 0 === s ? void 0 : s.genre) || "" } },
			type: F
		}), import_react$2.createElement(z, {
			message: d,
			handleCreateSlide: function() {
				x(!0);
			}
		}), import_react$2.createElement("div", { ref: S })) : null;
	};
	e$12(".ai-component-pc-message-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.88));\n}\n");
	e$12(".ai-component-mobile-universal-search-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 12px;\n}\n.ai-component-mobile-universal-search-actions__dropdown {\n  width: 200px;\n  border-radius: 4px;\n  background: var(--bg-lv4-default, #fff);\n  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 6px 2px rgba(0, 0, 0, 0.04), 0px 6px 32px 2px rgba(0, 0, 0, 0.16);\n  backdrop-filter: blur(8px);\n  padding: 8px 0;\n}\n.ai-component-mobile-universal-search-actions__dropdown-title {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  padding: 0px 16px 0 19px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n}\n.ai-component-mobile-universal-search-actions__dropdown-menu-item {\n  padding: 0px 16px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: 30px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-mobile-universal-search-actions__dropdown-menu-item img {\n  margin-right: 8px;\n}\n.ai-component-mobile-universal-search-actions__button {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  background: linear-gradient(257deg, #db94ff 0%, #5179ff 45.66%, #5ab0ff 100%);\n  color: var(--text-white, #fff);\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  min-width: 116px;\n  padding: 5px 6px;\n  user-select: none;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-doc {\n  margin-right: 4px;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-doc path {\n  fill: #fff;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-arrow-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-arrow {\n  width: 16px;\n  height: 16px;\n  margin-left: 4px;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-arrow path {\n  fill: #fff !important;\n}\n.ai-component-mobile-universal-search-actions__button .button-menu-arrow.button-menu-arrow-active {\n  transform: rotate(180deg);\n}\n.ai-component-mobile-universal-search-actions__left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-mobile-universal-search-actions__left .button-item {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  border-radius: 2px;\n  cursor: pointer;\n  padding: 2px;\n  user-select: none;\n}\n.ai-component-mobile-universal-search-actions__left .button-item .feedback-active-icon path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-mobile-universal-search-actions__left img {\n  width: 20px;\n  height: 20px;\n}\n");
	$ = [
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51698)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51698)'/%3e%3cg filter='url(%23filter0_d_2519_51698)'%3e%3crect x='6.6875' y='15.9062' width='8.74998' height='1.71875' fill='%23B3D9FF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51698)'%3e%3crect x='6.68762' y='12.9375' width='8.74998' height='1.71875' fill='%23D3F3FF'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51698' x='6.42083' y='15.3729' width='10.35' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51698' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51698' x='6.42096' y='12.4042' width='10.35' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51698' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51698' x1='20.75' y1='10.214' x2='18.4467' y2='10.214' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%231E6FFF'/%3e%3cstop offset='1' stop-color='%23144DEB'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51698' x1='19.1464' y1='-2.44868' x2='1.21081' y2='19.2317' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2334A4FF'/%3e%3cstop offset='0.999235' stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: s$7("universalSearchActions.doc"),
			type: o$10.CREATE_DOC
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51687)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51687)'/%3e%3cg filter='url(%23filter0_d_2519_51687)'%3e%3crect x='11.6875' y='15.9062' width='4.375' height='1.71875' fill='%23A3F0D4'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51687)'%3e%3crect x='6.0625' y='15.9062' width='4.375' height='1.71875' fill='%23A3F0D4'/%3e%3c/g%3e%3cg filter='url(%23filter2_d_2519_51687)'%3e%3crect x='11.6875' y='12.9375' width='4.375' height='1.71875' fill='%23E0FBF1'/%3e%3c/g%3e%3cg filter='url(%23filter3_d_2519_51687)'%3e%3crect x='6.0625' y='12.9375' width='4.375' height='1.71875' fill='%23E0FBF1'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51687' x='11.4208' y='15.3729' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51687' x='5.79583' y='15.3729' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter2_d_2519_51687' x='11.4208' y='12.4042' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter3_d_2519_51687' x='5.79583' y='12.4042' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51687' x1='20.75' y1='11.8888' x2='17.5231' y2='11.8888' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23008F4B'/%3e%3cstop offset='1' stop-color='%2300833C'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51687' x1='8.57043' y1='-3.27294' x2='-4.6893' y2='12.6985' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300D689'/%3e%3cstop offset='1' stop-color='%2300AA5B'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: s$7("universalSearchActions.sheet"),
			type: o$10.CREATE_SHEET
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51673)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51673)'/%3e%3cg filter='url(%23filter0_d_2519_51673)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.4402 13.8892C15.4402 13.8845 15.4402 13.8797 15.4402 13.8749C15.4402 13.8702 15.4402 13.8654 15.4402 13.8606V13.8892ZM15.4375 14.0312C15.3552 16.3751 13.4286 18.2499 11.0639 18.2499C8.64687 18.2499 6.6875 16.2912 6.6875 13.8749C6.6875 11.511 8.56295 9.58497 10.9075 9.50269V14.0312H15.4375Z' fill='%23FFD7BF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51673)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.3708 13.0938C15.048 11.3038 13.636 9.89225 11.8455 9.56958V13.0938H15.3708Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51673' x='6.42083' y='8.96935' width='10.3527' height='10.3473' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51673' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51673' x='11.5788' y='9.03625' width='5.12527' height='5.12417' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.457456 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51673' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51673' x1='20.75' y1='11.4806' x2='18.3746' y2='11.4806' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23EB4825'/%3e%3cstop offset='1' stop-color='%23EB3319'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51673' x1='4.89364' y1='-1.47234' x2='-4.96774' y2='17.0364' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FF8246'/%3e%3cstop offset='1' stop-color='%23FF5E2F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: s$7("universalSearchActions.slide"),
			type: o$10.CREATE_SLIDE
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2572_52172)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2572_52172)'/%3e%3cg filter='url(%23filter0_d_2572_52172)'%3e%3cpath d='M6.6875 9.8125H8.25V17.9375H6.6875V9.8125Z' fill='%23ECFCFF'/%3e%3cpath d='M8.25 9.8125H9.8125V11.3691H8.25V9.8125Z' fill='%23ECFCFF'/%3e%3cpath d='M8.25 16.3809H9.8125V17.9375L8.25 17.9375V16.3809Z' fill='%23ECFCFF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2572_52172)'%3e%3cpath d='M15.4375 9.8125H13.875V17.9375H15.4375V9.8125Z' fill='%23CAEFFB'/%3e%3cpath d='M13.875 9.8125H12.3125V11.3691H13.875V9.8125Z' fill='%23CAEFFB'/%3e%3cpath d='M13.875 16.3809H12.3125V17.9375L13.875 17.9375V16.3809Z' fill='%23CAEFFB'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2572_52172' x='5.83417' y='8.10583' width='8.245' height='13.245' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='1.70667' dy='0.853333'/%3e%3cfeGaussianBlur stdDeviation='1.28'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2572_52172' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2572_52172' x='11.4592' y='8.10583' width='8.245' height='13.245' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='1.70667' dy='0.853333'/%3e%3cfeGaussianBlur stdDeviation='1.28'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2572_52172' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2572_52172' x1='9.5467' y1='7.3125' x2='9.5467' y2='21.1605' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%232DA5EB'/%3e%3cstop offset='1' stop-color='%232198EB'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2572_52172' x1='11.1878' y1='-5.5' x2='-6.3416' y2='11.7784' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%234DD1FF'/%3e%3cstop offset='1' stop-color='%233CBFFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: s$7("universalSearchActions.smartCanvas"),
			type: o$10.CREATE_SMART_CANVAS
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg filter='url(%23filter0_i_2519_51653)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51653)'/%3e%3c/g%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51653)'/%3e%3cg filter='url(%23filter1_d_2519_51653)'%3e%3cpath d='M14.3438 10.5936V11.8556H11.3367C10.1814 11.8556 9.2449 12.7597 9.2449 13.8749C9.2449 14.9768 10.1593 15.8726 11.2956 15.8937L11.3367 15.8941H14.3438V17.1561H11.3367C9.45939 17.1561 7.9375 15.6871 7.9375 13.8749C7.9375 12.0808 9.4291 10.623 11.2805 10.5941L11.3367 10.5936H14.3438Z' fill='%23E5D7FF'/%3e%3c/g%3e%3cg filter='url(%23filter2_d_2519_51653)'%3e%3crect x='6.6875' y='12.1561' width='3.4375' height='3.4375' rx='1.71875' fill='white'/%3e%3c/g%3e%3cg filter='url(%23filter3_d_2519_51653)'%3e%3cellipse cx='14.3438' cy='11.2186' rx='1.09375' ry='1.09375' fill='white'/%3e%3c/g%3e%3cg filter='url(%23filter4_d_2519_51653)'%3e%3ccircle cx='14.3438' cy='16.5311' r='1.09375' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_i_2519_51653' x='6.6875' y='7.3125' width='14.7292' height='13.4375' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.666667'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0'/%3e%3cfeBlend mode='normal' in2='shape' result='effect1_innerShadow_2519_51653'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51653' x='7.71528' y='10.1492' width='7.73958' height='7.89583' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.537255 0 0 0 0 0.329412 0 0 0 0 0.729412 0 0 0 0.68 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter2_d_2519_51653' x='6.6875' y='12.1561' width='4.77083' height='4.77083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.666667' dy='0.666667'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter3_d_2519_51653' x='13.0278' y='9.68043' width='3.52083' height='3.52083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter4_d_2519_51653' x='13.0278' y='14.9929' width='3.52083' height='3.52083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51653' x1='20.75' y1='12.6624' x2='17.8851' y2='12.6624' gradientUnits='userSpaceOnUse'%3e%3cstop offset='0.000628278' stop-color='%23A55BF5'/%3e%3cstop offset='1' stop-color='%23833FDF'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51653' x1='7.11465' y1='-0.348246' x2='-0.460364' y2='16.7565' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23C87FFA'/%3e%3cstop offset='1' stop-color='%23A55BF5'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: s$7("universalSearchActions.mindMap"),
			type: o$10.CREATE_MINDMAP
		}
	];
	J = function(e) {
		var n = e.onMainCreateButtonClick, i = e.onRewrite, l = e.onCopy, o = e.onShare, a = e.message, c = e.shouldHideRewrite, s = void 0 !== c && c, d = e.shouldHideSave, f = e.shouldHideFeedback, u = e.shouldHideCopy, p = e.shouldHideShare, g = t$9((0, import_react$2.useState)(!1), 2), h = g[0], x = g[1];
		return a && a.messageStatus === M$2.FINISH ? import_react$2.createElement("div", { className: "ai-component-mobile-universal-search-actions" }, import_react$2.createElement("div", { className: "ai-component-mobile-universal-search-actions__left" }, !u && import_react$2.createElement("span", { className: "button-item" }, import_react$2.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18 4.5H10C9.17157 4.5 8.5 5.17157 8.5 6V7H14C15.6569 7 17 8.34315 17 10V15.5H18C18.8284 15.5 19.5 14.8284 19.5 14V6C19.5 5.17157 18.8284 4.5 18 4.5ZM17 17V18C17 19.6569 15.6569 21 14 21H6C4.34315 21 3 19.6569 3 18V10C3 8.34315 4.34315 7 6 7H7V6C7 4.34315 8.34315 3 10 3H18C19.6569 3 21 4.34315 21 6V14C21 15.6569 19.6569 17 18 17H17ZM4.5 10C4.5 9.17157 5.17157 8.5 6 8.5H14C14.8284 8.5 15.5 9.17157 15.5 10V18C15.5 18.8284 14.8284 19.5 14 19.5H6C5.17157 19.5 4.5 18.8284 4.5 18V10Z' fill='%23454D5A'/%3e%3c/svg%3e",
			onClick: function() {
				return null == l ? void 0 : l(a);
			}
		})), !s && import_react$2.createElement("span", { className: "button-item" }, import_react$2.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.6051 5.02647C12.9915 4.56849 11.269 4.68416 9.73113 5.35378C8.43759 5.91702 7.34197 6.84287 6.57185 8.01145L7.78945 8.72169C8.35021 9.04879 8.30841 9.87238 7.71741 10.141L4.6594 11.531C4.15563 11.76 3.5771 11.4206 3.53112 10.8692L3.25298 7.53318C3.19919 6.88801 3.89408 6.44948 4.4533 6.77568L5.27457 7.25473C6.2061 5.81195 7.54586 4.66927 9.1323 3.9785C10.9883 3.17033 13.0672 3.03073 15.0146 3.58347C16.9621 4.13621 18.6576 5.3471 19.8123 7.00982C20.9671 8.67253 21.5095 10.6842 21.3473 12.702C21.1852 14.7199 20.3283 16.6191 18.9228 18.076C17.5173 19.5329 15.6502 20.4574 13.6394 20.692C11.6287 20.9266 9.59886 20.4568 7.89573 19.3625C6.19261 18.2683 4.92158 16.6173 4.29923 14.691L5.72659 14.2299C6.24225 15.8259 7.29538 17.1939 8.70655 18.1005C10.1177 19.0072 11.7996 19.3965 13.4656 19.2021C15.1316 19.0078 16.6787 18.2417 17.8433 17.0346C19.0078 15.8274 19.7178 14.2538 19.8522 12.5819C19.9866 10.9099 19.5371 9.24312 18.5803 7.86544C17.6235 6.48777 16.2186 5.48446 14.6051 5.02647Z' fill='%23454D5A' style='fill:%23454D5A%3bfill:color(display-p3 0.2706 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e",
			onClick: function() {
				return null == i ? void 0 : i(a);
			}
		})), !f && import_react$2.createElement("span", { className: "button-item" }, h ? import_react$2.createElement(m$6, {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.5 3.65015H7.22132C5.85769 3.65015 4.66605 4.56815 4.31977 5.88707C3.70448 8.23057 2.7997 11.6746 2.59944 12.4256C2.1088 14.2655 3.49562 16.0704 5.39968 16.0704H8.94947C8.72718 16.5708 8.55369 17.0755 8.42899 17.5704C7.77372 20.1709 8.46534 22.5001 10.5 22.5001C12.5836 22.5001 13.037 21.2221 13.5346 19.8195C13.7365 19.2503 13.9457 18.6607 14.2741 18.1275C14.9698 16.9982 15.6477 16.4835 16.5 16.2524V3.65015ZM18 16.0754C18.1605 16.0716 18.327 16.0703 18.5 16.0703C20.1568 16.0702 21.5 14.7271 21.5 13.0703V6.65015C21.5 4.99329 20.1569 3.65015 18.5 3.65015H18V16.0754Z' fill='%23454D5A'/%3e%3c/svg%3e",
			size: 20,
			onClick: function() {
				return x(!1);
			}
		}) : import_react$2.createElement(m$6, {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.59944 12.4256C2.1088 14.2655 3.49562 16.0704 5.39968 16.0704H8.94947C8.72718 16.5708 8.55369 17.0755 8.42899 17.5704C7.77372 20.1709 8.46534 22.5001 10.5 22.5001C12.5836 22.5001 13.037 21.2221 13.5346 19.8195C13.7365 19.2503 13.9457 18.6607 14.2741 18.1275C15.4348 16.2433 16.5462 16.0701 18.5 16.0703C20.1568 16.0702 21.5 14.7271 21.5 13.0703V6.65015C21.5 4.99329 20.1569 3.65015 18.5 3.65015H7.22132C5.85769 3.65015 4.66605 4.56815 4.31977 5.88707C3.70448 8.23057 2.7997 11.6746 2.59944 12.4256ZM20 13.0703C20 13.8986 19.3284 14.5703 18.4999 14.5703C18.3362 14.5703 18.169 14.5653 18 14.5594V5.15015H18.5C19.3284 5.15015 20 5.82172 20 6.65015V13.0703ZM16.5 5.15015V14.5866C16.3227 14.612 16.1487 14.6499 15.9798 14.7053C14.0562 15.3363 12.8537 17.2757 12.2047 19.0829C12.1726 19.1723 12.1415 19.2626 12.1105 19.3528C11.8254 20.1815 11.5437 21.0001 10.5 21.0001C10.0207 21.0001 9.85026 20.5602 9.76233 20.1468C9.41369 18.5077 10.1805 16.876 10.8852 15.3765C11.0136 15.1032 11.14 14.8342 11.2572 14.5704H5.39968C4.48112 14.5704 3.8121 13.6997 4.04879 12.8121C4.25003 12.0575 5.15591 8.6092 5.77059 6.26799C5.94353 5.60931 6.53851 5.15015 7.22132 5.15015H16.5Z' fill='%23454D5A'/%3e%3c/svg%3e",
			size: 20,
			onClick: function() {
				return m$2(a.id, a.parentMessageId, A$4(R$3.SOURCE_DESKTOP), (function() {
					x(!h), Snackbar_default.show({
						message: s$7("universalSearchActions.feedback.unlike-toast"),
						type: "success",
						duration: 2e3
					});
				}));
			}
		})), !p && import_react$2.createElement("span", {
			className: "button-item",
			onClick: function() {
				return null == o ? void 0 : o(a);
			}
		}, import_react$2.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.28454 16.9356C10.3143 15.8771 12.344 15.5464 12.344 15.5464V18.2957C12.344 19.6436 13.9835 20.3075 14.9213 19.3394L20.9779 13.0874C22.1049 11.924 22.1049 10.076 20.9779 8.91264L14.9213 2.66057C13.9835 1.69246 12.344 2.35637 12.344 3.70425V7.35085C12.344 7.35085 8.28454 7.35085 4.73253 10.3731C1.81907 13.4117 1.79686 16.9674 2.16266 19.1436C2.33338 20.1593 3.50665 20.4598 4.30039 19.8035C5.50398 18.8083 7.13739 17.5338 8.28454 16.9356ZM13.844 3.70422L19.9005 9.9563C20.464 10.538 20.464 11.462 19.9005 12.0437L13.844 18.2957L13.844 13.7821C13.844 13.7821 9.99993 14 7.59095 15.6056L7.42774 15.7143C5.1619 17.2244 4.72736 17.514 3.57749 18.4557C3.33652 16.5308 3.53814 13.7861 5.81526 11.4112C7.38918 9.76959 10.0818 9.03406 12.294 8.85564C12.6427 8.82751 12.997 8.83021 13.3498 8.8329C13.5151 8.83416 13.6801 8.83542 13.844 8.8335V3.70422Z' fill='%23454D5A'/%3e%3c/svg%3e" }), import_react$2.createElement("span", null, s$7("universalSearchActions.share"))), !d && import_react$2.createElement("span", {
			className: "button-item",
			onClick: function(e) {
				var t = e.target;
				null != t && t.closest(".button-menu-arrow-container") || (e.stopPropagation(), e.preventDefault(), n?.(a));
			}
		}, import_react$2.createElement(m$6, {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 4.5H18C18.2761 4.5 18.5 4.72386 18.5 5V19C18.5 19.2761 18.2761 19.5 18 19.5H5C4.72386 19.5 4.5 19.2761 4.5 19V5C4.5 4.72386 4.72386 4.5 5 4.5ZM3 5C3 3.89543 3.89543 3 5 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H5C3.89543 21 3 20.1046 3 19V5ZM7 12.751C7 13.1652 7.33579 13.501 7.75 13.501H15.2491C15.6633 13.501 15.9991 13.1652 15.9991 12.751C15.9991 12.3368 15.6633 12.001 15.2491 12.001H7.75C7.33579 12.001 7 12.3368 7 12.751ZM7 16.0024C7 15.5882 7.33579 15.2524 7.75 15.2524H15.2491C15.6633 15.2524 15.9991 15.5882 15.9991 16.0024C15.9991 16.4167 15.6633 16.7524 15.2491 16.7524H7.75C7.33579 16.7524 7 16.4167 7 16.0024Z' fill='%23454D5A' style='fill:%23454D5A%3bfill:color(display-p3 0.2706 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e",
			size: 20
		}), import_react$2.createElement("span", null, s$7("universalSearchActions.saveAsDocument"))))) : null;
	};
	X = function(n) {
		var i, r$15, l, o, m, g, h, v, C, y, b = n.isHistoryMessage, E = n.conversationId, F = n.message, B = n.action, M = n.isSelectionMode, H = n.recommendQuestionProps, A = n.referenceProps, k = n.errorMessageProps, G = n.editProps, O = (null == F || null === (i = F.extraContent) || void 0 === i || null === (i = i.modelThinking) || void 0 === i ? void 0 : i.thinkingContent) || "", I = null == F || null === (r$15 = F.extraContent) || void 0 === r$15 || null === (r$15 = r$15.modelThinking) || void 0 === r$15 ? void 0 : r$15.thinkingDuration, V = (null == F || null === (l = F.content) || void 0 === l ? void 0 : l.text) || "", D = (null === (o = F.references) || void 0 === o ? void 0 : o.items) || [], R = (null === (m = F.references) || void 0 === m ? void 0 : m.processes) || void 0, U = {
			onReferenceSaveShow: A.onReferenceSaveShow,
			onReferenceExpandChange: A.onReferenceExpandChange,
			onReferenceOpen: A.onReferenceOpen,
			onReferenceSave: A.onReferenceSave
		}, T = (H || {}).onClickRecommendQuestion, Z = (0, import_react$2.useMemo)((function() {
			return (F.suggestedReplies || []).map((function(e) {
				return {
					text: e,
					onClick: function() {
						T?.(e);
					}
				};
			}));
		}), [F.suggestedReplies, T]);
		return import_react$2.createElement(P.Provider, { value: E }, import_react$2.createElement("div", { className: "ai-component-pc-message-wrapper" }, import_react$2.createElement(n$14, { condition: F.messageStatus !== M$2.ERROR }, import_react$2.createElement(n$14.Success, null, import_react$2.createElement(l$8, { case: void 0 }, import_react$2.createElement(l$8.Case, { case: Boolean(null === (g = F.content) || void 0 === g ? void 0 : g.files) }, import_react$2.createElement(j, {
			title: null == F ? void 0 : F.filesContentTitle,
			files: null === (h = F.content) || void 0 === h || null === (h = h.files) || void 0 === h ? void 0 : h.items
		})), import_react$2.createElement(l$8.Case, { case: !isEmpty(F.functionCall) }, import_react$2.createElement(L, { message: F })), import_react$2.createElement(l$8.Default, null, import_react$2.createElement(b$1, n$11({
			referenceProcesses: R,
			references: D
		}, A)), import_react$2.createElement(m$8, { message: F }), import_react$2.createElement(r, {
			isFinished: !0,
			thinkingMd: O,
			thinkingDuration: I,
			message: F,
			dot: F.messageStatus === M$2.IN_THINKING
		}, import_react$2.createElement(l$8, { case: void 0 }, import_react$2.createElement(l$8.Case, { case: Boolean(null === (v = F.description) || void 0 === v ? void 0 : v.editable) }, import_react$2.createElement(Q, {
			message: F,
			markdownText: V,
			onEditOutline: null == G ? void 0 : G.onEditOutline,
			isHistoryMessage: b
		})), import_react$2.createElement(l$8.Case, { case: Boolean((null === (C = F.description) || void 0 === C ? void 0 : C.isMindOutline) || (null === (y = F.description) || void 0 === y ? void 0 : y.isFlowchartOutline)) }, import_react$2.createElement(W$1, {
			message: F,
			markdownText: V
		})), import_react$2.createElement(l$8.Default, null, import_react$2.createElement(f, {
			md: V,
			message: F,
			handlers: U,
			dot: F.messageStatus === M$2.IN_PROGRESS
		})))), B || null, M ? null : import_react$2.createElement(t, { questions: Z })))), import_react$2.createElement(n$14.Fail, null, import_react$2.createElement(_, {
			message: F,
			errorMessageProps: k
		})))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/ai-content-notice/index.js
var import_react$1, import_classnames, i, c;
var init_ai_content_notice = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_index_33302b4d();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-mobile-content-notice {\n  position: absolute;\n  bottom: 12px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-mobile-content-notice__text {\n  color: var(--text-weak, rgba(0, 0, 0, 0.24));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n");
	i = "ai-component-mobile";
	c = function(o) {
		var c = o.className;
		return import_react$1.createElement("div", { className: (0, import_classnames.default)("".concat(i, "-content-notice"), c) }, import_react$1.createElement("div", { className: "".concat(i, "-content-notice__text") }, s$7("ai-content-notice")));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-component-mobil_0b2a0614912606ccc9843cb70ef522a9/node_modules/@tencent/ai-component-mobile/dist/esm/ai-auth-modal/index.js
function r$1(t) {
	var a = "ai-auth-modal-container", m = document.querySelector(".".concat(a));
	m || ((m = document.createElement("div")).className = a, document.body.appendChild(m));
	import_react_dom.render(import_react.createElement(d, {
		visible: !0,
		scene: null == t ? void 0 : t.scene,
		title: null == t ? void 0 : t.title,
		content: null == t ? void 0 : t.content,
		desc: null == t ? void 0 : t.desc,
		onClose: function() {
			var n;
			null == t || null === (n = t.onClose) || void 0 === n || n.call(t), (0, import_react_dom.unmountComponentAtNode)(m);
		},
		onConsent: function() {
			var n;
			null == t || null === (n = t.onConsent) || void 0 === n || n.call(t), (0, import_react_dom.unmountComponentAtNode)(m);
		}
	}), m);
}
var import_react, import_react_dom, d;
var init_ai_auth_modal = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_esm$2();
	init_esm$9();
	init_style_inject_es_3984fa0f();
	e$12(".ai-component-common-auth-modal {\n  max-width: calc(100vw - 32px);\n}\n.ai-component-common-auth-modal .dui-m-modal-title {\n  padding: 0;\n}\n.ai-component-common-auth-modal .dui-m-modal-content {\n  text-align: left;\n  padding: 0;\n  margin-bottom: 0;\n}\n.ai-component-common-auth-modal .dui-m-divider-horizontal {\n  margin: 4px 0;\n  border: 1px solid var(--border-weak, rgba(0, 0, 0, 0.04));\n}\n.ai-component-common-auth-modal .dui-m-checkbox-icon {\n  border: 1px solid var(--border-ultrastrong, rgba(0, 0, 0, 0.16));\n}\n");
	d = x$3({
		Modal: Modal_default,
		Button: Button_default,
		Checkbox: Checkbox_default,
		Divider: Divider_default
	});
}));
//#endregion
__esmMin((() => {
	init_with_thinking();
	init_ux_atom();
	init_template_input_box();
	init_suggestions();
	init_search_share_panel();
	init_search_import_card();
	init_search_box();
	init_reference();
	init_range_selector();
	init_model_selector();
	init_message();
	init_markdown_render();
	init_locales();
	init_feedback();
	init_error_message();
	init_auth_card();
	init_ai_content_notice();
	init_ai_auth_modal();
}))();
export { c as AIContentNotice, m as AISearchImportMiniCard, E as AISearchImportModelCard, d as AiAuthModal, R as AppendSearch, u as AuthCard, $ as DOC_LIST, a as LOCALES_NS, b as MODEL_LIST, _ as MobileErrorMessage, f as MobileMarkdownRender, X as MobileMessage, K as MobileOutline, J as MobileUniversalSearchActions, r as MobileWithThinking, f$1 as ModelSelector, W as OptionSelector, T as RangeSelector, S as RangeTab, b$1 as References, I as SearchFrame, Ln as SearchSharePanel, t as Suggestions, m$1 as TemplateInput, b$2 as TemplateInputBox, F as Textarea, _$1 as UploaderSelector, U as VoiceInput, r$1 as showAiAuthModal, m$2 as showFeedbackPullPanel, Dn as showSearchSharePanel };
