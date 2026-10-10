import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { F6 as init_src, Grt as normalizeFileUrl, Hrt as useBrowserPreview, I1 as t, Irt as FileNotFoundError, N1 as onLocaleChange, T0 as init_app_core, Wrt as init_file_path, b0 as writeRendererLog, f3 as wb, j1 as init_i18n, k1 as getLocale, n8 as init_index_esm$1, r8 as serializeDocumentForSave, t8 as HtmlEditor$1, zZ as init_http_logger } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_StatusPlaceholder, t as StatusPlaceholder } from "./StatusPlaceholder-XN-A3Gzo.js";
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/selection-quote-conversation-input.ts
function getMatchingConversationInput(currentConversation, sessionId) {
	if (!sessionId || currentConversation?.info.id !== sessionId) return;
	return currentConversation.ui.input;
}
/**
* 选区引用未能走 Conversation 通道时的原因（issue #87140）。
*
* #90967 已让选区发送优先走 wb.conversations.current，但线上仍有落到 legacy
* pending 队列后静默丢失的样本，而现有日志不含 current 的取值，无法区分
* 「新引擎未挂载」和「当前会话不是预览所属会话」。
*/
function describeSelectionQuoteConversationMiss(currentConversation, sessionId) {
	if (!sessionId) return { reason: "missing-session-id" };
	if (!currentConversation) return { reason: "no-current-conversation" };
	if (currentConversation.info.id !== sessionId) return {
		reason: "current-conversation-mismatch",
		currentConversationId: currentConversation.info.id
	};
	return {
		reason: "input-unavailable",
		currentConversationId: currentConversation.info.id
	};
}
/** 新 Conversation Engine 已挂载当前会话时，直接从它的输入能力发送选区引用。 */
function trySendSelectionQuoteToCurrentConversation(currentConversation, sessionId, blocks) {
	const input = getMatchingConversationInput(currentConversation, sessionId);
	if (!input) return false;
	input.sendPrompt({ blocks }).then((result) => {
		if (result.ok) return;
		console.warn("[SelectionQuote] AI 编辑发送被当前会话拒绝", {
			sessionId,
			errorCode: result.error?.code
		});
		wb.ui?.toast?.({
			type: "error",
			message: t("error.unexpected.message")
		});
	}).catch((error) => {
		console.warn("[SelectionQuote] AI 编辑发送异常", {
			sessionId,
			error: error instanceof Error ? error.message : String(error)
		});
		wb.ui?.toast?.({
			type: "error",
			message: t("error.unexpected.message")
		});
	});
	return true;
}
/** 新 Conversation Engine 已挂载目标会话时，把内容块追加到它的草稿。 */
function tryInsertBlocksIntoCurrentConversation(currentConversation, sessionId, blocks) {
	const input = getMatchingConversationInput(currentConversation, sessionId);
	if (!input) return false;
	input.insertDraftBlocks(blocks, { focus: true });
	return true;
}
var init_selection_quote_conversation_input = __esmMin((() => {
	init_app_core();
	init_i18n();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+wb-library-report@0.3.1/node_modules/@tencent/wb-library-report/index.esm.js
/**
* 生成 request_id（UUID v4）
*
* 优先使用浏览器原生 crypto.randomUUID，不可用时回退到 Math.random 方案。
*/ function generateRequestId() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
/**
* 生成 ISO 8601 带时区的时间字符串
*
* 如 `2026-07-16T21:40:25+08:00`。
*/ function generateTime() {
	var date = /* @__PURE__ */ new Date();
	var tzOffset = -date.getTimezoneOffset();
	var sign = tzOffset >= 0 ? "+" : "-";
	var absOffset = Math.abs(tzOffset);
	var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
	var minutes = String(absOffset % 60).padStart(2, "0");
	var pad = function(n) {
		return String(n).padStart(2, "0");
	};
	return "".concat(date.getFullYear(), "-").concat(pad(date.getMonth() + 1), "-").concat(pad(date.getDate())) + "T".concat(pad(date.getHours()), ":").concat(pad(date.getMinutes()), ":").concat(pad(date.getSeconds())) + "".concat(sign).concat(hours, ":").concat(minutes);
}
/**
* 从全局环境获取用户 uin
*
* 读取 `window.userInfo.id`，非浏览器环境或未登录时返回空字符串。
*/ function getUin() {
	if (typeof window !== "undefined") {
		var userInfo = window.userInfo;
		if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.id) !== void 0 && (userInfo === null || userInfo === void 0 ? void 0 : userInfo.id) !== null) return String(userInfo.id);
	}
	return "";
}
/**
* 生成指定长度的随机字符串（字母 + 数字）
*
* 参考 alloy-report-sdk 的 randomStr 实现，用于生成 usermac 浏览器指纹串。
*/ function randomStr(len) {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var result = "";
	for (var i = 0; i < len; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
	return result;
}
function getUserMac() {
	try {
		if (typeof window === "undefined" || !window.localStorage) return randomStr(5);
		var mac = window.localStorage.getItem(USER_MAC_STORAGE_KEY);
		if (!mac) {
			mac = randomStr(5);
			window.localStorage.setItem(USER_MAC_STORAGE_KEY, mac);
		}
		return mac;
	} catch (e) {
		return randomStr(5);
	}
}
/**
* 检测当前运行平台
*
* 返回值：1=PC, 2=Android, 3=iOS, 4=其他, 5=Mac, 6=iPad
* 非浏览器环境（SSR 等）返回 4。
*/ function detectPlatform() {
	if (typeof navigator === "undefined") return 4;
	var ua = navigator.userAgent || "";
	var platform = navigator.platform || "";
	if (platform === "iPad" || platform === "MacIntel" && navigator.maxTouchPoints > 1) return 6;
	if (/iPhone|iPod/.test(ua) || platform === "iPhone") return 3;
	if (/Android/.test(ua)) return 2;
	if (/Mac/.test(platform) || /Macintosh/.test(ua)) return 5;
	if (/Win|Linux/.test(platform) || /Windows|Linux/.test(ua)) return 1;
	return 4;
}
function _array_like_to_array(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _array_with_holes(arr) {
	if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
	if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error);
		return;
	}
	if (info.done) resolve(value);
	else Promise.resolve(value).then(_next, _throw);
}
function _async_to_generator(fn) {
	return function() {
		var self = this, args = arguments;
		return new Promise(function(resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
			}
			_next(void 0);
		});
	};
}
function _class_call_check(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	return Constructor;
}
function _define_property(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _iterable_to_array(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
	var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
	if (_i == null) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _s, _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _non_iterable_rest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
			return Object.getOwnPropertyDescriptor(source, sym).enumerable;
		}));
		ownKeys.forEach(function(key) {
			_define_property(target, key, source[key]);
		});
	}
	return target;
}
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _object_spread_props(target, source) {
	source = source != null ? source : {};
	if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	else ownKeys(Object(source)).forEach(function(key) {
		Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	});
	return target;
}
function _sliced_to_array(arr, i) {
	return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
	return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _array_like_to_array(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(n);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
	var f, y, t, g, _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	};
	return g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (_) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
}
var DEFAULT_ENDPOINT, DEFAULT_GROUP_ID, DEFAULT_STREAM_ID, DEFAULT_ATTA_ID, DEFAULT_FLUSH_INTERVAL, DEFAULT_DEBOUNCE_DELAY, USER_MAC_STORAGE_KEY, BODY_SCHEMA, Reporter;
var init_index_esm = __esmMin((() => {
	DEFAULT_ENDPOINT = "https://trace.inlong.qq.com/atta2nd/dataproxy/message";
	DEFAULT_GROUP_ID = "gwe00035552313";
	DEFAULT_STREAM_ID = "swe00004734461";
	DEFAULT_ATTA_ID = "sa600047344";
	DEFAULT_FLUSH_INTERVAL = 5e3;
	DEFAULT_DEBOUNCE_DELAY = 1e3;
	USER_MAC_STORAGE_KEY = "library:usermac";
	BODY_SCHEMA = [
		{
			key: "opername",
			default: ""
		},
		{
			key: "module",
			default: ""
		},
		{
			key: "action",
			default: ""
		},
		{
			key: "uin",
			default: ""
		},
		{
			key: "platform",
			default: "0"
		},
		{
			key: "file_type",
			default: "0"
		},
		{
			key: "source1",
			default: "0"
		},
		{
			key: "source2",
			default: "0"
		},
		{
			key: "source3",
			default: "0"
		},
		{
			key: "obj1",
			default: ""
		},
		{
			key: "obj2",
			default: ""
		},
		{
			key: "obj3",
			default: ""
		},
		{
			key: "ver1",
			default: ""
		},
		{
			key: "ver2",
			default: ""
		},
		{
			key: "ver3",
			default: ""
		},
		{
			key: "ver4",
			default: ""
		},
		{
			key: "ver5",
			default: ""
		},
		{
			key: "ver6",
			default: ""
		},
		{
			key: "ver7",
			default: ""
		},
		{
			key: "ver8",
			default: ""
		},
		{
			key: "ver9",
			default: ""
		},
		{
			key: "ver10",
			default: ""
		},
		{
			key: "ver11",
			default: ""
		},
		{
			key: "ver12",
			default: ""
		},
		{
			key: "usermac",
			default: ""
		},
		{
			key: "enterprise_id",
			default: ""
		}
	];
	Reporter = /*#__PURE__*/ function() {
		function Reporter() {
			var _this = this;
			var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			_class_call_check(this, Reporter);
			_define_property(this, "options", void 0);
			_define_property(this, "queue", []);
			_define_property(this, "flushTimer", null);
			_define_property(this, "debounceTimer", null);
			_define_property(this, "status", "idle");
			_define_property(this, "platform", void 0);
			_define_property(this, "usermac", void 0);
			_define_property(this, "onVisibilityChange", function() {
				if (document.visibilityState === "hidden") {
					_this.pauseTimer();
					_this.sendBeacon();
				} else if (document.visibilityState === "visible") _this.resumeTimer();
			});
			_define_property(this, "onBeforeUnload", function() {
				_this.sendBeacon();
			});
			var _options_endpoint, _options_groupId, _options_streamId, _options_attaId, _options_batchSize, _options_flushInterval, _options_timeout, _options_maxRetries, _options_maxQueueSize, _options_debounceDelay, _options_debug;
			this.options = {
				endpoint: (_options_endpoint = options.endpoint) !== null && _options_endpoint !== void 0 ? _options_endpoint : DEFAULT_ENDPOINT,
				groupId: (_options_groupId = options.groupId) !== null && _options_groupId !== void 0 ? _options_groupId : DEFAULT_GROUP_ID,
				streamId: (_options_streamId = options.streamId) !== null && _options_streamId !== void 0 ? _options_streamId : DEFAULT_STREAM_ID,
				attaId: (_options_attaId = options.attaId) !== null && _options_attaId !== void 0 ? _options_attaId : DEFAULT_ATTA_ID,
				batchSize: (_options_batchSize = options.batchSize) !== null && _options_batchSize !== void 0 ? _options_batchSize : 5,
				flushInterval: (_options_flushInterval = options.flushInterval) !== null && _options_flushInterval !== void 0 ? _options_flushInterval : DEFAULT_FLUSH_INTERVAL,
				timeout: (_options_timeout = options.timeout) !== null && _options_timeout !== void 0 ? _options_timeout : 1e4,
				maxRetries: (_options_maxRetries = options.maxRetries) !== null && _options_maxRetries !== void 0 ? _options_maxRetries : 3,
				maxQueueSize: (_options_maxQueueSize = options.maxQueueSize) !== null && _options_maxQueueSize !== void 0 ? _options_maxQueueSize : 100,
				debounceDelay: (_options_debounceDelay = options.debounceDelay) !== null && _options_debounceDelay !== void 0 ? _options_debounceDelay : DEFAULT_DEBOUNCE_DELAY,
				debug: (_options_debug = options.debug) !== null && _options_debug !== void 0 ? _options_debug : false
			};
			this.platform = detectPlatform();
			this.usermac = getUserMac();
		}
		_create_class(Reporter, [
			{
				/** 初始化 SDK，启动定时上报 */ key: "init",
				value: function init() {
					if (this.status !== "idle") return;
					this.status = "running";
					this.startTimer();
					document.addEventListener("visibilitychange", this.onVisibilityChange);
					window.addEventListener("beforeunload", this.onBeforeUnload);
					this.log("reporter initialized");
				}
			},
			{
				/** 上报事件（推入队列，达到 batchSize 自动 flush） */ key: "report",
				value: function report(data) {
					if (this.status === "disposed") return;
					var _data_platform, _data_usermac;
					this.queue.push(_object_spread_props(_object_spread({}, data), {
						platform: (_data_platform = data.platform) !== null && _data_platform !== void 0 ? _data_platform : this.platform,
						usermac: (_data_usermac = data.usermac) !== null && _data_usermac !== void 0 ? _data_usermac : this.usermac
					}));
					if (this.queue.length > this.options.maxQueueSize) {
						var dropped = this.queue.length - this.options.maxQueueSize;
						this.queue.splice(0, dropped);
						this.log("queue overflow, dropped ".concat(dropped, " oldest events"));
					}
					this.log("event queued:", data.opername, data.action);
					if (this.queue.length >= this.options.batchSize) {
						this.clearDebounce();
						this.flush();
					} else this.scheduleDebounce();
				}
			},
			{
				key: "flush",
				value: /** 立即发送队列中的所有事件 */ function flush() {
					var _this = this;
					return _async_to_generator(function() {
						var batch, batches, totalSuccess, lastError, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, subBatch, result, err;
						return _ts_generator(this, function(_state) {
							switch (_state.label) {
								case 0:
									_this.clearDebounce();
									if (_this.queue.length === 0) return [2, {
										success: true,
										count: 0
									}];
									batch = _this.queue.splice(0, _this.options.batchSize);
									batches = _this.splitByUrlLength(batch);
									totalSuccess = 0;
									_iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
									_state.label = 1;
								case 1:
									_state.trys.push([
										1,
										6,
										7,
										8
									]);
									_iterator = batches[Symbol.iterator]();
									_state.label = 2;
								case 2:
									if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [3, 5];
									subBatch = _step.value;
									return [4, _this.sendWithRetry(subBatch)];
								case 3:
									result = _state.sent();
									if (result.success) totalSuccess += result.count;
									else lastError = result.error;
									_state.label = 4;
								case 4:
									_iteratorNormalCompletion = true;
									return [3, 2];
								case 5: return [3, 8];
								case 6:
									err = _state.sent();
									_didIteratorError = true;
									_iteratorError = err;
									return [3, 8];
								case 7:
									try {
										if (!_iteratorNormalCompletion && _iterator.return != null) _iterator.return();
									} finally {
										if (_didIteratorError) throw _iteratorError;
									}
									return [7];
								case 8: return [2, {
									success: lastError === void 0,
									count: totalSuccess,
									error: lastError
								}];
							}
						});
					})();
				}
			},
			{
				/** 销毁实例，清理定时器、监听和队列 */ key: "dispose",
				value: function dispose() {
					this.pauseTimer();
					document.removeEventListener("visibilitychange", this.onVisibilityChange);
					window.removeEventListener("beforeunload", this.onBeforeUnload);
					this.queue = [];
					this.status = "disposed";
					this.log("reporter disposed");
				}
			},
			{
				/** 获取当前状态 */ key: "getStatus",
				value: function getStatus() {
					return this.status;
				}
			},
			{
				/** 获取队列中待发送的事件数 */ key: "getQueueSize",
				value: function getQueueSize() {
					return this.queue.length;
				}
			},
			{
				key: "startTimer",
				value: function startTimer() {
					var _this = this;
					if (!this.flushTimer) this.flushTimer = setInterval(function() {
						_this.flush();
					}, this.options.flushInterval);
				}
			},
			{
				key: "pauseTimer",
				value: function pauseTimer() {
					if (this.flushTimer) {
						clearInterval(this.flushTimer);
						this.flushTimer = null;
					}
					this.clearDebounce();
				}
			},
			{
				key: "resumeTimer",
				value: function resumeTimer() {
					if (this.status === "running" && !this.flushTimer) this.startTimer();
				}
			},
			{
				/** report 后短延迟 flush，合并短时间内的多次上报 */ key: "scheduleDebounce",
				value: function scheduleDebounce() {
					var _this = this;
					this.clearDebounce();
					this.debounceTimer = setTimeout(function() {
						_this.debounceTimer = null;
						_this.flush();
					}, this.options.debounceDelay);
				}
			},
			{
				key: "clearDebounce",
				value: function clearDebounce() {
					if (this.debounceTimer) {
						clearTimeout(this.debounceTimer);
						this.debounceTimer = null;
					}
				}
			},
			{
				/** 按 BODY_SCHEMA 顺序将 IReportData 拼接为管道符 body 字符串 */ key: "buildBody",
				value: function buildBody(events) {
					return events.map(function(data) {
						return BODY_SCHEMA.map(function(param) {
							var key = param.key, defaultVal = param.default;
							var value = data[key];
							return value === void 0 || value === null ? defaultVal : String(value);
						}).join("|");
					}).join("\n");
				}
			},
			{
				/** 构建 InLong DataProxy 请求 query 参数 */ key: "buildQueryParams",
				value: function buildQueryParams(events) {
					var first = events[0];
					var params = {
						groupId: this.options.groupId,
						streamId: this.options.streamId,
						body: this.buildBody(events),
						cnt: String(events.length),
						request_id: generateRequestId(),
						time: generateTime()
					};
					if (first.uin) params.user_id = first.uin;
					return Object.entries(params).map(function(param) {
						var _param = _sliced_to_array(param, 2), k = _param[0], v = _param[1];
						return "".concat(k, "=").concat(encodeURIComponent(v));
					}).join("&");
				}
			},
			{
				/**
				* 按 URL 长度拆分批次，确保每个 JSONP 请求 URL 不超过 MAX_URL_LENGTH。
				* 防止批量上报时 URL 过长被截断。
				*/ key: "splitByUrlLength",
				value: function splitByUrlLength(events) {
					if (events.length <= 1) return [events];
					var batches = [];
					var current = [];
					var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
					try {
						for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var event = _step.value;
							var testBatch = _to_consumable_array(current).concat([event]);
							var params = this.buildQueryParams(testBatch);
							if (this.options.endpoint.length + params.length + 20 > 2e3 && current.length > 0) {
								batches.push(current);
								current = [event];
							} else current = testBatch;
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return != null) _iterator.return();
						} finally {
							if (_didIteratorError) throw _iteratorError;
						}
					}
					if (current.length > 0) batches.push(current);
					return batches;
				}
			},
			{
				key: "sendWithRetry",
				value: /** 带重试的发送 */ function sendWithRetry(events) {
					var _this = this;
					return _async_to_generator(function() {
						var _this_queue, uin, enrichedEvents, lastError, attempt, err;
						return _ts_generator(this, function(_state) {
							switch (_state.label) {
								case 0:
									uin = getUin();
									if (!!uin) return [3, 2];
									_this.log("uin not ready, waiting 2s to retry...");
									return [4, new Promise(function(resolve) {
										return setTimeout(resolve, 2e3);
									})];
								case 1:
									_state.sent();
									uin = getUin();
									if (uin) _this.log("uin retrieved after retry");
									_state.label = 2;
								case 2:
									enrichedEvents = uin ? events.map(function(e) {
										return e.uin ? e : _object_spread_props(_object_spread({}, e), { uin });
									}) : events;
									attempt = 0;
									_state.label = 3;
								case 3:
									if (!(attempt <= _this.options.maxRetries)) return [3, 8];
									_state.label = 4;
								case 4:
									_state.trys.push([
										4,
										6,
										,
										7
									]);
									return [4, _this.send(enrichedEvents)];
								case 5:
									_state.sent();
									_this.log("batch sent (".concat(events.length, " events)"));
									return [2, {
										success: true,
										count: events.length
									}];
								case 6:
									err = _state.sent();
									lastError = err;
									_this.log("attempt ".concat(attempt + 1, " failed: ").concat(lastError.message));
									return [3, 7];
								case 7:
									attempt++;
									return [3, 3];
								case 8:
									(_this_queue = _this.queue).unshift.apply(_this_queue, _to_consumable_array(events));
									return [2, {
										success: false,
										count: 0,
										error: lastError
									}];
							}
						});
					})();
				}
			},
			{
				/** 通过 JSONP 发送上报请求（绕过跨域限制） */ key: "send",
				value: function send(events) {
					var _this = this;
					return new Promise(function(resolve, reject) {
						var callbackName = "__report_cb_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2));
						var params = _this.buildQueryParams(events);
						var url = "".concat(_this.options.endpoint, "?").concat(params, "&callback=").concat(callbackName);
						var script = document.createElement("script");
						var settled = false;
						var cleanup = function() {
							delete window[callbackName];
							script.remove();
						};
						var timer = setTimeout(function() {
							if (!settled) {
								settled = true;
								cleanup();
								reject(/* @__PURE__ */ new Error("Request timeout"));
							}
						}, _this.options.timeout);
						window[callbackName] = function(data) {
							if (!settled) {
								settled = true;
								clearTimeout(timer);
								cleanup();
								if (data.code !== "0") {
									reject(new Error("InLong error ".concat(data.code, ": ").concat(data.msg)));
									return;
								}
								resolve();
							}
						};
						script.onerror = function() {
							if (!settled) {
								settled = true;
								clearTimeout(timer);
								cleanup();
								reject(/* @__PURE__ */ new Error("Network error"));
							}
						};
						script.src = url;
						document.head.appendChild(script);
					});
				}
			},
			{
				/**
				* 页面关闭/隐藏时用 sendBeacon 兜底发送，尽最大努力不丢数据。
				*
				* sendBeacon 是 fire-and-forget POST，不等待响应，不受页面卸载影响。
				* 使用 application/x-www-form-urlencoded 格式，不触发 CORS preflight。
				*/ key: "sendBeacon",
				value: function sendBeacon() {
					if (this.queue.length === 0) return;
					if (typeof navigator === "undefined" || !navigator.sendBeacon) return;
					var events = this.queue.splice(0);
					var uin = getUin();
					var enrichedEvents = uin ? events.map(function(e) {
						return e.uin ? e : _object_spread_props(_object_spread({}, e), { uin });
					}) : events;
					var batches = this.splitByUrlLength(enrichedEvents);
					var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
					try {
						for (var _iterator = batches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var batch = _step.value;
							var params = this.buildQueryParams(batch);
							var blob = new Blob([params], { type: "application/x-www-form-urlencoded" });
							navigator.sendBeacon(this.options.endpoint, blob);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return != null) _iterator.return();
						} finally {
							if (_didIteratorError) throw _iteratorError;
						}
					}
					this.log("sendBeacon: ".concat(enrichedEvents.length, " events"));
				}
			},
			{
				key: "log",
				value: function log(message) {
					for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
					if (this.options.debug) {
						var _console;
						(_console = console).log.apply(_console, ["[Reporter] ".concat(message)].concat(_to_consumable_array(args)));
					}
				}
			}
		]);
		return Reporter;
	}();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/reporter.ts
function ensureReporter() {
	if (initState === "ready") return reporterInstance;
	if (initState === "failed") return null;
	try {
		const reporter = new Reporter();
		reporter.init();
		reporterInstance = reporter;
		initState = "ready";
		return reporter;
	} catch (err) {
		initState = "failed";
		console.warn("[reporter] init failed, fallback to noop", err);
		return null;
	}
}
var reporterInstance, initState;
var init_reporter = __esmMin((() => {
	init_index_esm();
	reporterInstance = null;
	initState = "idle";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/html-editor-telemetry.ts
function fileNameFromPath(filePath) {
	const normalized = filePath.replace(/\\/g, "/");
	const idx = normalized.lastIndexOf("/");
	return idx === -1 ? normalized : normalized.slice(idx + 1);
}
function report(opername, module, action, extra) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername,
			module,
			action,
			source1: SOURCE1_WB_DESKTOP,
			source2: SOURCE2_LOCAL,
			...extra
		});
	} catch (err) {
		console.warn("[html-editor-telemetry] report failed", err);
	}
}
/** 上报 HTML 可视化编辑保存事件 */
function reportHtmlEditSession(payload) {
	const now = Date.now();
	if (lastEditSessionFilePath !== null && lastEditSessionFilePath !== payload.filePath) lastReportAtByFile.clear();
	lastEditSessionFilePath = payload.filePath;
	const last = lastReportAtByFile.get(payload.filePath);
	if (last !== void 0 && now - last < EDIT_SESSION_THROTTLE_MS) return;
	lastReportAtByFile.set(payload.filePath, now);
	report("edit", "detail_main", "edit_session", {
		file_type: FILE_TYPE_HTML,
		obj2: fileNameFromPath(payload.filePath),
		obj3: payload.filePath,
		...payload.uin ? { uin: payload.uin } : {},
		...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
	});
}
/** 上报点击进入 HTML 编辑态（顶部栏编辑按钮） */
function reportHtmlEnterEdit(payload) {
	report("html", "edit", "entry_click", {
		obj2: fileNameFromPath(payload.filePath),
		obj3: payload.filePath,
		...payload.uin ? { uin: payload.uin } : {},
		...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
	});
}
/** 上报点击 HTML 悬浮工具栏 AI 编辑入口 */
function reportHtmlToolbarAiEdit(payload) {
	report("html", "floating_toolbar", "ai_edit_click", {
		obj2: fileNameFromPath(payload.filePath),
		obj3: payload.filePath,
		...payload.uin ? { uin: payload.uin } : {},
		...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
	});
}
/** 上报发送 HTML AI 编辑指令 */
function reportHtmlSendAiPrompt(payload) {
	report("html", "ai_edit", "send", {
		obj2: fileNameFromPath(payload.filePath),
		obj3: payload.filePath,
		...payload.uin ? { uin: payload.uin } : {},
		...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
	});
}
/** 上报点击 HTML 预览更多菜单的刷新项 */
function reportHtmlRefreshClick(payload) {
	report("html", "refresh", "refresh_click", {
		obj2: fileNameFromPath(payload.filePath),
		obj3: payload.filePath,
		...payload.uin ? { uin: payload.uin } : {},
		...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
	});
}
/**
* 上报 HTML 详情页曝光事件。
* 仅在 WorkBuddy 桌面端调用（web / cloud 环境不触发）。
* eventcode = view-detail_page-expo
*/
function reportHtmlDetailPageExpo(payload) {
	const reporter = ensureReporter();
	if (!reporter) return;
	try {
		reporter.report({
			opername: "view",
			module: "detail_page",
			action: "expo",
			file_type: FILE_TYPE_HTML,
			source1: SOURCE1_WB_DESKTOP,
			source2: SOURCE2_LOCAL,
			obj2: payload.title ?? "",
			...payload.uin ? { uin: payload.uin } : {},
			...payload.enterpriseId ? { enterprise_id: payload.enterpriseId } : {}
		});
	} catch (err) {
		console.warn("[html-editor-telemetry] reportHtmlDetailPageExpo failed", err);
	}
}
var FILE_TYPE_HTML, SOURCE1_WB_DESKTOP, SOURCE2_LOCAL, EDIT_SESSION_THROTTLE_MS, lastReportAtByFile, lastEditSessionFilePath;
var init_html_editor_telemetry = __esmMin((() => {
	init_reporter();
	FILE_TYPE_HTML = 3;
	SOURCE1_WB_DESKTOP = 1;
	SOURCE2_LOCAL = 2;
	EDIT_SESSION_THROTTLE_MS = 6e5;
	lastReportAtByFile = /* @__PURE__ */ new Map();
	lastEditSessionFilePath = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/html-editor/html-editor.tsx
/** 把 agent-ui 的 locale 字符串归一化为 SDK 支持的三种语言（srcDoc iframe 内自动探测不可靠，务必显式传入） */
function mapLocale(locale) {
	const l = (locale || "").toLowerCase();
	if (l.startsWith("en")) return "en-US";
	if (l === "zh-hk" || l === "zh-tw" || l === "zh-mo") return "zh-HK";
	return "zh-CN";
}
function injectOfficeScrollbarStyle(root) {
	const doc = (root?.querySelector("iframe"))?.contentDocument;
	if (!doc?.head) return;
	let style = doc.getElementById(OFFICE_SCROLLBAR_STYLE_ID);
	if (!style) {
		style = doc.createElement("style");
		style.id = OFFICE_SCROLLBAR_STYLE_ID;
		doc.head.appendChild(style);
	}
	if (style.textContent !== OFFICE_SCROLLBAR_STYLE) style.textContent = OFFICE_SCROLLBAR_STYLE;
}
/** 把 SDK 的选区引用事件补齐 WorkBuddy 需要的 docType/htmlSelection 语义 */
function toHtmlSelectionQuoteEvent(event) {
	return {
		uri: event.uri,
		title: event.title,
		name: event.name,
		selectedText: event.selectedText,
		message: event.message,
		quoteRef: event.quoteRef,
		...event.screenshot ? { screenshot: event.screenshot } : {},
		...event.isMarquee ? { isMarquee: event.isMarquee } : {}
	};
}
var import_react$1, import_jsx_runtime$1, OFFICE_SCROLLBAR_STYLE_ID, OFFICE_SCROLLBAR_STYLE, HtmlEditor;
var init_html_editor$1 = __esmMin((() => {
	init_src();
	init_file_path();
	init_index_esm$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_http_logger();
	init_html_editor_telemetry();
	init_StatusPlaceholder();
	import_jsx_runtime$1 = require_jsx_runtime();
	OFFICE_SCROLLBAR_STYLE_ID = "workbuddy-office-html-scrollbar-style";
	OFFICE_SCROLLBAR_STYLE = `
html, body, * {
    scrollbar-gutter: stable !important;
    scrollbar-width: thin !important;
    scrollbar-color: transparent transparent !important;
}
html:hover,
body:hover,
body:hover * {
    scrollbar-color: rgba(0, 0, 0, 0.32) transparent !important;
}
*::-webkit-scrollbar {
    width: 12px !important;
    height: 12px !important;
}
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-corner {
    background: transparent !important;
}
*::-webkit-scrollbar-thumb {
    border: 3px solid transparent !important;
    border-radius: 999px !important;
    background-clip: padding-box !important;
    background-color: transparent !important;
}
html:hover::-webkit-scrollbar-thumb,
body:hover::-webkit-scrollbar-thumb,
body:hover *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.32) !important;
}
`;
	HtmlEditor = ({ filePath, sessionId, readFile, writeFile, editing = false, resolvePreviewUrl, onInsertSelectionQuote, onSendSelectionQuote, subscribeFileChange, onRegisterSave, enterpriseId, uin }) => {
		const readFileRef = (0, import_react$1.useRef)(readFile);
		readFileRef.current = readFile;
		const writeFileRef = (0, import_react$1.useRef)(writeFile);
		writeFileRef.current = writeFile;
		const resolvePreviewUrlRef = (0, import_react$1.useRef)(resolvePreviewUrl);
		resolvePreviewUrlRef.current = resolvePreviewUrl;
		const subscribeFileChangeRef = (0, import_react$1.useRef)(subscribeFileChange);
		subscribeFileChangeRef.current = subscribeFileChange;
		const insertRef = (0, import_react$1.useRef)(onInsertSelectionQuote);
		insertRef.current = onInsertSelectionQuote;
		const sendRef = (0, import_react$1.useRef)(onSendSelectionQuote);
		sendRef.current = onSendSelectionQuote;
		const filePathRef = (0, import_react$1.useRef)(filePath);
		filePathRef.current = filePath;
		const enterpriseIdRef = (0, import_react$1.useRef)(enterpriseId);
		enterpriseIdRef.current = enterpriseId;
		const uinRef = (0, import_react$1.useRef)(uin);
		uinRef.current = uin;
		const rootRef = (0, import_react$1.useRef)(null);
		(0, import_react$1.useEffect)(() => {
			if (document.body.dataset.officeShell !== "true") return;
			let rafId = 0;
			let attempt = 0;
			const inject = () => {
				injectOfficeScrollbarStyle(rootRef.current);
				attempt += 1;
				if (attempt < 20) rafId = window.requestAnimationFrame(inject);
			};
			rafId = window.requestAnimationFrame(inject);
			const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => injectOfficeScrollbarStyle(rootRef.current));
			if (rootRef.current) observer?.observe(rootRef.current, {
				childList: true,
				subtree: true
			});
			return () => {
				window.cancelAnimationFrame(rafId);
				observer?.disconnect();
			};
		}, [filePath, editing]);
		const [locale, setLocaleState] = (0, import_react$1.useState)(() => getLocale());
		(0, import_react$1.useEffect)(() => onLocaleChange((next) => setLocaleState(next)), []);
		const fs = (0, import_react$1.useMemo)(() => ({
			readFile: (path) => readFileRef.current(sessionId, path, "text"),
			writeFile: (path, content, opts) => writeFileRef.current(sessionId, path, content, opts),
			resolvePreviewUrl: resolvePreviewUrlRef.current ? (path) => resolvePreviewUrlRef.current(sessionId, path) : void 0,
			subscribeFileChange: subscribeFileChangeRef.current ? (path, cb) => subscribeFileChangeRef.current(path, cb) : void 0
		}), [sessionId]);
		const handleSelectionQuote = (0, import_react$1.useCallback)((event, mode) => {
			reportHtmlSendAiPrompt({
				filePath: filePathRef.current,
				enterpriseId: enterpriseIdRef.current,
				uin: uinRef.current
			});
			const normalized = toHtmlSelectionQuoteEvent(event);
			if (mode === "send") (sendRef.current ?? insertRef.current)?.(normalized);
			else (insertRef.current ?? sendRef.current)?.(normalized);
		}, []);
		const handleToolbarAction = (0, import_react$1.useCallback)((action) => {
			if (action === "ai_edit") reportHtmlToolbarAiEdit({
				filePath: filePathRef.current,
				enterpriseId: enterpriseIdRef.current,
				uin: uinRef.current
			});
		}, []);
		const renderError = (0, import_react$1.useCallback)((error, retry) => {
			console.warn("[HtmlEditor] load failed:", {
				filePath: error.filePath,
				kind: error.kind,
				error: error.message
			});
			try {
				writeRendererLog("html-editor", "error", `load failed ${JSON.stringify({
					filePath: error.filePath,
					kind: error.kind,
					message: error.message
				})}`);
			} catch {}
			if (error.kind === "file-missing") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FileNotFoundError, {});
			if (error.kind === "access-denied") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
				type: "error",
				title: t("htmlEditor.accessDenied.title"),
				description: t("htmlEditor.accessDenied.hint"),
				onRetry: retry
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
				type: "error",
				title: t("htmlEditor.loadError.title"),
				description: t("htmlEditor.loadError.hint"),
				onRetry: retry
			});
		}, []);
		const saveCurrentDocument = (0, import_react$1.useCallback)(async (targetPath) => {
			const iframe = rootRef.current?.querySelector("iframe");
			const content = serializeDocumentForSave(iframe?.contentDocument);
			if (content === null) throw new Error("HTML 编辑器内容尚未就绪");
			const savePath = normalizeFileUrl(targetPath ?? filePathRef.current);
			const result = await writeFileRef.current(sessionId, savePath, content, { allowedDirs: [savePath] });
			if (!result.success) throw new Error(result.error || "HTML 保存失败");
		}, [sessionId]);
		(0, import_react$1.useEffect)(() => {
			onRegisterSave?.(saveCurrentDocument);
			return () => onRegisterSave?.(null);
		}, [onRegisterSave, saveCurrentDocument]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			ref: rootRef,
			className: "html-editor__host",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(HtmlEditor$1, {
				filePath,
				fs,
				editing,
				injectPageNodeId: editing,
				locale: mapLocale(locale),
				injectDefaultTheme: false,
				hideComment: true,
				toolbarProps: { isInWorkbuddyDesktop: true },
				onSelectionQuote: handleSelectionQuote,
				onToolbarAction: handleToolbarAction,
				renderError
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/html-editor/html-editor-panel.less
var init_html_editor_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/html-editor/html-editor-panel.tsx
var import_react, import_jsx_runtime, HtmlEditorPanel;
var init_html_editor_panel = __esmMin((() => {
	init_html_editor_panel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_html_editor$1();
	import_jsx_runtime = require_jsx_runtime();
	HtmlEditorPanel = ({ filePath, sessionId, readFile, writeFile, initialMode = "edit", resolvePreviewUrl, onInsertSelectionQuote, onSendSelectionQuote, subscribeFileChange, onRegisterSave, enterpriseId, uin }) => {
		const { forceRefreshNonce, registerHtmlSave } = useBrowserPreview();
		const handleRegisterSave = (0, import_react.useCallback)((save) => {
			registerHtmlSave?.(save);
			onRegisterSave?.(save);
		}, [registerHtmlSave, onRegisterSave]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "html-editor-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "html-editor-panel__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlEditor, {
					filePath,
					sessionId,
					readFile,
					writeFile,
					editing: initialMode === "edit",
					resolvePreviewUrl,
					onInsertSelectionQuote,
					onSendSelectionQuote,
					subscribeFileChange,
					onRegisterSave: handleRegisterSave,
					enterpriseId,
					uin
				}, `${forceRefreshNonce}:${filePath}`)
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/html-editor/index.ts
var init_html_editor = __esmMin((() => {
	init_html_editor$1();
	init_html_editor_panel();
}));
//#endregion
export { reportHtmlDetailPageExpo as a, reportHtmlRefreshClick as c, describeSelectionQuoteConversationMiss as d, init_selection_quote_conversation_input as f, init_html_editor_telemetry as i, ensureReporter as l, trySendSelectionQuoteToCurrentConversation as m, HtmlEditorPanel as n, reportHtmlEditSession as o, tryInsertBlocksIntoCurrentConversation as p, init_html_editor_panel as r, reportHtmlEnterEdit as s, init_html_editor as t, init_reporter as u };
