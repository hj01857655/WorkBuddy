import { n as __esmMin, o as __toCommonJS, r as __exportAll, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $st as init_tslib_es6, Jst as __read, Vst as __assign, Wst as __extends, Xst as __spreadArray, Yst as __rest, Zst as __spreadArrays, act as init_esm$1, oct as ua } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom, qh as require_classnames } from "./lib-chat-ui-D8Ji0f8n.js";
import { Qw as instance, Zw as init_i18next, iw as init_i18nextBrowserLanguageDetector, rw as Browser } from "./smartsheet-context-BgZsCXEw.js";
import { t as require_prop_types } from "./prop-types-Bsrd3Dp5.js";
import { r as require_assignWith, t as require_set } from "./set-Bj3O4Hf3.js";
import { t as require_flatten } from "./flatten-U66TSkUJ.js";
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/polyfill.js
var init_polyfill = __esmMin((() => {
	if (typeof String.prototype.padStart !== "function") String.prototype.padStart = function padStart(maxLength, fillString) {
		maxLength = maxLength >> 0;
		fillString = String(typeof fillString !== "undefined" ? fillString : " ");
		if (this.length > maxLength) return String(this);
		else {
			maxLength = maxLength - this.length;
			if (maxLength > fillString.length) fillString += fillString.repeat(maxLength / fillString.length);
			return fillString.slice(0, maxLength) + String(this);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/common/version.js
var version_default;
var init_version = __esmMin((() => {
	version_default = "1.9.0";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/common/attribute.js
var attribute_default;
var init_attribute = __esmMin((() => {
	init_version();
	attribute_default = "data-duim-" + version_default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/createElement.js
function h(type, props) {
	var children = [];
	for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
	var mergedProps = props;
	if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !isScopedAttributeDisabled) mergedProps[attribute_default] = props.className;
	return import_react$55.createElement.apply(void 0, __spreadArrays([type, mergedProps], children));
}
function shouldDisableScopedAttribute() {
	var windowDisable;
	if (typeof window === "object") windowDisable = window.__dui_disable_scoped_attribute__;
	var globalDisable;
	if (typeof globalThis === "object") globalDisable = globalThis.__dui_disable_scoped_attribute__;
	return Boolean(windowDisable || globalDisable);
}
var import_react$55, isScopedAttributeDisabled;
var init_createElement = __esmMin((() => {
	init_tslib_es6();
	import_react$55 = /* @__PURE__ */ __toESM(require_react());
	init_attribute();
	isScopedAttributeDisabled = shouldDisableScopedAttribute();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/helper.js
function emptyFn() {}
function inject(originalFn, additionalFn) {
	var newFn = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var result = originalFn.apply(null, args);
		if (result !== false) additionalFn();
		return result;
	};
	newFn.__dui_injected_fn__ = true;
	return newFn;
}
function wrapWithConfigDefaults(originalFn) {
	var defaultConfig = {};
	function configDefaults(defaults) {
		defaultConfig = defaults;
	}
	var wrappedFn = function(passedConfig) {
		return originalFn(__assign(__assign({}, defaultConfig), passedConfig));
	};
	wrappedFn.configDefaults = configDefaults;
	return wrappedFn;
}
var isBrowser$1;
var init_helper = __esmMin((() => {
	init_tslib_es6();
	isBrowser$1 = typeof window !== "undefined" && typeof document !== "undefined";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/style.js
function injectStyle(fileKey, css) {
	var key = version_default + "-" + fileKey;
	if (Array.isArray(styleRegistryManage.get(key))) {
		styleRegistryManage.add(key, bundledBy);
		warnRedundantInject(key);
		return;
	}
	styleRegistryManage.set(key, [bundledBy]);
	var versions = getFileVersions(fileKey);
	if (versions.length > 1) warnMultipleVersions(fileKey, versions);
	var domKey = isScopedAttributeDisabled ? fileKey : key;
	if (isBrowser$1) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type", "text/css");
		styleElement.setAttribute("data-duim-key", domKey);
		styleElement.innerText = css;
		var currentVersionElementSelector = isScopedAttributeDisabled ? "style[data-duim-key]" : "style[data-duim-key|=\"" + version_default + "\"]";
		var existingElements = document.head.querySelectorAll(currentVersionElementSelector);
		if (existingElements.length > 0) {
			existingElements[existingElements.length - 1].after(styleElement);
			return;
		}
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (typeof injectContentBeforeRoot === "function") {
		var styleElement = "<style type=\"text/css\" data-duim-key=\"" + domKey + "\">" + css + "</style>";
		injectContentBeforeRoot(styleElement);
	}
}
function warnRedundantInject(key) {
	if (!isBrowser$1 || !styleRegistryManage.length || !Array.isArray(styleRegistryManage.get(key))) return;
	var count = styleRegistryManage.get(key).length;
	setTimeout(function() {
		if (styleRegistryManage.get(key).length > count) return;
		console.warn("[DUI] " + key + " 重复引入了 " + count + " 次");
	}, CONSOLE_DEBOUNCE);
}
function warnMultipleVersions(fileKey, versions) {
	if (!isBrowser$1) return;
	setTimeout(function() {
		if (getFileVersions(fileKey).length > versions.length) return;
		console.warn("[DUI] " + fileKey + " 存在多个版本:  " + versions.join("  "));
	}, CONSOLE_DEBOUNCE);
}
function getFileVersions(fileKey) {
	if (!styleRegistryManage.length) return [];
	return Object.getOwnPropertyNames(styleRegistryManage.registry).filter(function(k) {
		return k.indexOf(fileKey) !== -1;
	}).map(function(k) {
		return k.split("-")[0];
	});
}
var bundledBy, styleRegistryManage, CONSOLE_DEBOUNCE;
var init_style = __esmMin((() => {
	init_version();
	init_createElement();
	init_helper();
	bundledBy = "1";
	styleRegistryManage = new (function() {
		function StyleRegistryManage() {
			var globalObj = isBrowser$1 ? window : globalThis;
			globalObj.__duim_style_registry__ = globalObj.__duim_style_registry__ || {};
			this.registry = globalObj.__duim_style_registry__;
		}
		Object.defineProperty(StyleRegistryManage.prototype, "length", {
			get: function() {
				return Object.keys(this.registry).length;
			},
			enumerable: false,
			configurable: true
		});
		StyleRegistryManage.prototype.set = function(key, bundledsBy) {
			this.registry[key] = bundledsBy;
		};
		StyleRegistryManage.prototype.get = function(key) {
			return this.registry[key];
		};
		StyleRegistryManage.prototype.add = function(key, bundledBy) {
			if (!this.registry[key]) this.registry[key] = [];
			this.registry[key].push(bundledBy);
		};
		return StyleRegistryManage;
	}())();
	CONSOLE_DEBOUNCE = 3e3;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/theme.js
function consumeTheme(renderProp) {
	return h(ThemeContext.Consumer, null, function(themeConfig) {
		return renderProp(createThemedClassNames(themeConfig));
	});
}
function appendThemeClassNames(themeConfig, className) {
	if (!className || !themeConfig) return className;
	var currentClassList = className.split(/\s+/);
	return currentClassList.concat.apply(currentClassList, currentClassList.map(function(name) {
		return themeConfig[name];
	}).filter(function(name) {
		return name;
	})).join(" ");
}
function createThemedClassNames(themeConfig) {
	return (function() {
		var classes = [];
		for (var _i = 0; _i < arguments.length; _i++) classes[_i] = arguments[_i];
		return appendThemeClassNames(themeConfig, import_classnames.default.apply(void 0, classes));
	});
}
var import_react$54, import_classnames, ThemeContext;
var init_theme = __esmMin((() => {
	init_style();
	init_createElement();
	import_react$54 = /* @__PURE__ */ __toESM(require_react());
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_polyfill();
	injectStyle("common/global.css", "[data-duim-1-9-0]{-webkit-tap-highlight-color:transparent}.__DARK__{--duim-invert-filter:invert() hue-rotate(180deg) brightness(120%) grayscale();--duim-blur-minor-bg-color:rgba(28,29,31,0.92);--duim-blur-major-bg-color:rgba(36,37,41,0.72);--duim-mask-color:rgba(0,0,0,0.65)}");
	ThemeContext = import_react$54.createContext(null);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Button/Button.js
var import_react$53, Button;
var init_Button$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	Button = function(_super) {
		__extends(Button, _super);
		function Button() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, type = _b.type, size = _b.size, disabled = _b.disabled, testId = _b.testId, rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"type",
					"size",
					"disabled",
					"testId"
				]);
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-type-" + type] = type, _a[prefixCls + "-size-" + size] = size, _a[prefixCls + "-disabled"] = disabled, _a));
				return h("button", __assign({}, rest, {
					className: classes,
					style,
					disabled,
					"data-testid": testId
				}), _this.props.children);
			};
			return _this;
		}
		Button.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Button;
	}(import_react$53.Component);
	Button.defaultProps = {
		prefixCls: "dui-m-button",
		type: "default",
		size: "default"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Button/index.js
var Button_default;
var init_Button = __esmMin((() => {
	init_style();
	init_Button$1();
	injectStyle("components/Button/style/index.css", "[data-duim-1-9-0~=\"dui-m-button\"]{outline:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:8px;font-size:14px;font-weight:500;border:1px solid transparent}[data-duim-1-9-0~=\"dui-m-button\"]:disabled{border-color:transparent;pointer-events:none}[data-duim-1-9-0~=\"dui-m-button-type-default\"]{background:var(--bg-lv4-default,#fff);color:var(--text-link,#175ceb)}[data-duim-1-9-0~=\"dui-m-button-type-default\"]:active{background:var(--bg-lv4-medium,#f3f5f7)}[data-duim-1-9-0~=\"dui-m-button-type-default\"]:disabled{background:var(--bg-lv4-default,#fff);color:var(--accent-disabled,#c2d8ff)}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]:active{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));background:var(--tsp-fill-weak,rgba(51,77,102,.06))}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]:disabled{color:hsla(0,0%,100%,.5);background:var(--accent-disabled,#c2d8ff)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]{background:var(--critical-default,#ff4747);color:var(--text-white,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]:disabled{color:var(--text-white,#fff);background:var(--critical-disabled,#fcc)}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]{background:#fff;color:var(--accent-default,#1e6fff);border-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]:disabled{border-color:var(--accent-default,#1e6fff);opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:rgba(0,0,0,.88)}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]:disabled{opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]:disabled{opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:var(--bg-lv4-default,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]:disabled{border-color:#db8f1c;opacity:.4}[data-duim-1-9-0~=\"dui-m-button-size-large\"]{min-width:160px;height:48px;padding:0 30px;font-size:17px;border-radius:12px}[data-duim-1-9-0~=\"dui-m-button-size-small\"]{min-width:52px;height:28px;padding:0 8px;font-size:12px}[data-duim-1-9-0~=\"dui-m-button-size-default\"]{height:32px;padding:0 7px;min-width:56px}");
	Button_default = Button;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/keepDom.js
function decideKeepDom(animationDuration, visible) {
	var _this = this;
	var willLeave = !visible && this._ALC_HELPER_prevVisible;
	this._ALC_HELPER_prevVisible = visible;
	if (visible) return true;
	if (!willLeave) return false;
	setTimeout(function() {
		_this.forceUpdate();
	}, animationDuration);
	return true;
}
var init_keepDom = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/preventScrollPenetrate.js
function getScrollParent(node, container) {
	if (!node || node === container || !container.contains(node)) return container;
	if (node.scrollHeight > node.clientHeight) return node;
	else return getScrollParent(node.parentNode, container);
}
function preventSelfScrollPenetrate(_a) {
	var container = _a.container, _b = _a.direction, direction = _b === void 0 ? "y" : _b, _c = _a.stopPropagationBorder, stopPropagationBorder = _c === void 0 ? null : _c, touchStartEvent = _a.touchStartEvent;
	if (!container || container.__preventSelfScrollPenetrate) return;
	var prevX;
	var prevY;
	var reachBorderInScroll = null;
	var scrollParent;
	var handleTouchStart = function(event) {
		reachBorderInScroll = null;
		var touch = event.touches[0];
		prevX = touch.screenX;
		prevY = touch.screenY;
		scrollParent = getScrollParent(event.target, container);
	};
	var handleTouchMove = function(event) {
		var touch = event.touches[0];
		var deltaX = touch.screenX - prevX;
		var deltaY = touch.screenY - prevY;
		if ((Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y") !== direction || !scrollParent) return;
		var isAtLowerX = direction === "x" && scrollParent.scrollLeft === 0;
		var isAtUpperX = direction === "x" && scrollParent.scrollLeft === scrollParent.scrollWidth - scrollParent.offsetWidth;
		var isAtLowerY = direction === "y" && scrollParent.scrollTop === 0;
		var isAtUpperY = direction === "y" && scrollParent.scrollTop === scrollParent.scrollHeight - scrollParent.offsetHeight;
		var isScrollingBeyondBorder = direction === "x" ? deltaX > 0 && isAtLowerX || deltaX < 0 && isAtUpperX : deltaY > 0 && isAtLowerY || deltaY < 0 && isAtUpperY;
		var currentBorder = isAtLowerX || isAtLowerY ? "lower" : isAtUpperX || isAtUpperY ? "upper" : null;
		if (isScrollingBeyondBorder) {
			event.cancelable && event.preventDefault();
			if (reachBorderInScroll !== currentBorder) {
				container.dispatchEvent(new TouchEvent("touchstart", event));
				reachBorderInScroll = currentBorder;
			}
			stopPropagationBorder === currentBorder && event.stopPropagation();
		} else event.stopPropagation();
	};
	container.addEventListener("touchstart", handleTouchStart);
	container.addEventListener("touchmove", handleTouchMove, { passive: false });
	if (touchStartEvent && container.contains(touchStartEvent.target)) handleTouchStart(touchStartEvent);
	container.__preventSelfScrollPenetrate = true;
}
function calcDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
var import_react$52, STYLUS_TOUCH_MOVE_CLICK_DISTANCE, PreventScrollPenetrateContainer;
var init_preventScrollPenetrate = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$52 = /* @__PURE__ */ __toESM(require_react());
	STYLUS_TOUCH_MOVE_CLICK_DISTANCE = 10;
	PreventScrollPenetrateContainer = function(_super) {
		__extends(PreventScrollPenetrateContainer, _super);
		function PreventScrollPenetrateContainer() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.domRef = import_react$52.createRef();
			_this.isInnerScroll = false;
			_this.startScreenX = -1;
			_this.startScreenY = -1;
			_this.handleTouchStart = function(event) {
				var container = _this.domRef.current;
				if (!container) return;
				var path = event.composedPath();
				var touch = event.touches[0];
				_this.startScreenX = touch.screenX;
				_this.startScreenY = touch.screenY;
				for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
					var elem = path_1[_i];
					if (!container.contains(elem)) {
						_this.isInnerScroll = false;
						return;
					}
					if (elem.scrollHeight > elem.clientHeight) {
						_this.isInnerScroll = true;
						preventSelfScrollPenetrate({
							container: elem,
							touchStartEvent: event
						});
						return;
					}
				}
				_this.isInnerScroll = false;
			};
			_this.handleTouchMove = function(event) {
				if (_this.isInnerScroll) return;
				var touch = event.touches[0];
				if (touch.touchType === "stylus" && calcDistance(_this.startScreenX, _this.startScreenY, touch.screenX, touch.screenY) < STYLUS_TOUCH_MOVE_CLICK_DISTANCE) return;
				event.cancelable && event.preventDefault();
			};
			return _this;
		}
		PreventScrollPenetrateContainer.prototype.componentDidMount = function() {
			if (this.props.disabled) return;
			var container = this.domRef.current;
			container.addEventListener("touchstart", this.handleTouchStart);
			container.addEventListener("touchmove", this.handleTouchMove, { passive: false });
		};
		PreventScrollPenetrateContainer.prototype.render = function() {
			var _a = this.props;
			_a.disabled;
			var children = _a.children, rest = __rest(_a, ["disabled", "children"]);
			return h("div", __assign({}, rest, { ref: this.domRef }), children);
		};
		return PreventScrollPenetrateContainer;
	}(import_react$52.Component);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/stylusAdapter.js
var import_react$51, TouchType, StylusAdapter, WithStylusClick;
var init_stylusAdapter = __esmMin((() => {
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
	init_esm$1();
	(function(TouchType) {
		TouchType["direct"] = "direct";
		TouchType["stylus"] = "stylus";
	})(TouchType || (TouchType = {}));
	StylusAdapter = function() {
		function StylusAdapter() {}
		StylusAdapter.supportStylus = function(event, callback) {
			if (!this.isIPadStylusTouch(event)) return;
			if (event.nativeEvent.type === "touchstart") {
				this.startPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				return;
			}
			if (event.nativeEvent.type === "touchend") {
				var endPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				if (this.isEqualPos(this.startPos, endPos) && callback) callback();
				event.preventDefault();
			}
		};
		StylusAdapter.startPos = [0, 0];
		StylusAdapter.isIPadStylusTouch = function(event) {
			return ua.isIPad && event.changedTouches[0] && event.changedTouches[0].touchType === TouchType.stylus;
		};
		StylusAdapter.isEqualPos = function(pos1, pos2) {
			return Math.abs(pos1[0] - pos2[0]) < 10 && Math.abs(pos1[1] - pos2[1]) < 10;
		};
		return StylusAdapter;
	}();
	WithStylusClick = function(_a) {
		var children = _a.children, clickHandler = _a.clickHandler;
		return import_react$51.cloneElement(children, {
			onClick: clickHandler,
			onTouchStart: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			},
			onTouchEnd: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/common/wording.js
var languages, translationMap;
var init_wording = __esmMin((() => {
	languages = [
		"en",
		"zh-CN",
		"th",
		"vi",
		"ms",
		"tl-PH",
		"id-ID",
		"es-MX",
		"de",
		"ja",
		"zh-HK"
	];
	translationMap = {
		avatar: [
			"Avatar",
			"头像",
			"รูปโปรไฟล์",
			"Ảnh hồ sơ",
			"Foto Profil",
			"Profile Photo",
			"Foto Profil",
			"Foto del perfil",
			"Profilfoto",
			"プロフィール写真",
			"頭像"
		],
		ok: [
			"OK",
			"确定",
			"ตกลง",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"確定"
		],
		cancel: [
			"Cancel",
			"取消",
			"ยกเลิก",
			"Hủy",
			"Batalkan",
			"Kanselahin",
			"Batalkan",
			"Cancelar",
			"Abbrechen",
			"キャンセルする",
			"取消"
		],
		select: [
			"Select",
			"请选择",
			"โปรดเลือก",
			"Vui lòng lựa chọn",
			"Sila pilih",
			"Pumili",
			"Silakan pilih",
			"Por favor selecciona",
			"Bitte auswählen",
			"選択してください",
			"請選擇"
		],
		search: [
			"Search",
			"搜索",
			"ค้นหา",
			"Tìm kiếm",
			"Cari",
			"Paghahanap",
			"Mencari",
			"Buscar",
			"Suchen",
			"検索",
			"搜尋"
		],
		loadingFailed: [
			"Loading Failed",
			"加载失败",
			"โหลดไม่สำเร็จ",
			"Tải không thành công",
			"Memuatkan tidak berjaya",
			"Hindi matagumpay ang pag-load",
			"Gagal memuat",
			"Error al cargar",
			"Laden erfolglos",
			"読み込みに失敗しました",
			"載入失敗"
		],
		title: [
			"Title",
			"标题",
			"ชื่อเรื่อง",
			"Tiêu đề",
			"Tajuk",
			"Pamagat",
			"Gelar",
			"Título",
			"Titel",
			"タイトル",
			"標題"
		],
		done: [
			"Done",
			"完成",
			"เสร็จสิ้น",
			"Hoàn thành",
			"Selesai",
			"Tapos na",
			"Selesai",
			"Listo",
			"Erledigt",
			"完了",
			"完成"
		],
		saveImage: [
			"Save Image",
			"保存图片",
			"บันทึกรูปภาพ",
			"Lưu ảnh",
			"Simpan foto",
			"I-save ang larawan",
			"Simpan foto",
			"Guadar foto",
			"Foto speichern",
			"写真を保存する",
			"儲存圖片"
		],
		saveImageSucceeded: [
			"Saving Image Succeeded",
			"保存图片成功",
			"บันทึกภาพสำเร็จแล้ว",
			"Hình ảnh đã được lưu thành công",
			"Gambar berjaya disimpan",
			"Matagumpay na na-save ang larawan",
			"Sukses menyimpan gambar",
			"Imagen guardada con éxito",
			"Bild erfolgreich gespeichert",
			"画像は保存されました",
			"儲存圖片成功"
		],
		saveImageFailed: [
			"Saving Image Failed",
			"保存图片失败",
			"การบันทึกภาพล้มเหลว",
			"Không thể lưu hình ảnh",
			"Gagal menyimpan gambar",
			"Nabigong i-save ang larawan",
			"Gagal menyimpan gambar",
			"Error al guardar la imagen",
			"Bild konnte nicht gespeichert werden",
			"画像の保存に失敗しました",
			"儲存圖片失敗"
		],
		yearPostfix: [
			"",
			"年",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"年"
		],
		monthPostfix: [
			"",
			"月",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"月"
		],
		dayPostfix: [
			"",
			"日",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"日"
		],
		hourPosfix: [
			"H",
			"时",
			"h",
			"giờ",
			"h",
			"h",
			"h",
			"h",
			"h",
			"時",
			"時"
		],
		minutePostfix: [
			"M",
			"分",
			"m",
			"phút",
			"m",
			"m",
			"m",
			"m",
			"m",
			"分",
			"分"
		],
		secondPostfix: [
			"S",
			"秒",
			"s",
			"giây",
			"s",
			"s",
			"s",
			"s",
			"s",
			"秒",
			"秒"
		],
		yearMonthFormat: [
			"MM/YYYY",
			"YYYY年 M月",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"YYYY/MM",
			"YYYY年 M月"
		]
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/common/locale.js
function i18n(key) {
	return i18nInstance.t(key);
}
var import_assignWith, import_set, detector, resources, i18nInstance;
var init_locale = __esmMin((() => {
	import_assignWith = /* @__PURE__ */ __toESM(require_assignWith());
	import_set = /* @__PURE__ */ __toESM(require_set());
	init_i18next();
	init_i18nextBrowserLanguageDetector();
	init_wording();
	detector = new Browser();
	if (!(typeof window === "undefined")) detector.addDetector({
		name: "userAgent",
		lookup: function() {
			var match = navigator.userAgent.match(/language\/([a-zA-Z'-_]+)/i);
			if (match) return match[1].replace("_", "-");
		}
	});
	resources = {};
	languages.forEach(function(lang, index) {
		var translation = (0, import_assignWith.default)({}, translationMap, function(objectValue, sourceValue) {
			return sourceValue[index];
		});
		(0, import_set.default)(resources, [lang, "translation"], translation);
	});
	i18nInstance = instance.createInstance();
	i18nInstance.use(detector).init({
		resources,
		fallbackLng: {
			"zh-TW": ["zh-HK", "zh-CN"],
			fil: ["tl-PH"],
			id: ["id-ID"],
			es: ["es-MX"],
			default: ["zh-CN"]
		},
		detection: {
			order: [
				"querystring",
				"userAgent",
				"cookie",
				"navigator"
			],
			lookupCookie: "language",
			caches: []
		}
	});
})), import_react$50, import_react_dom$7, Modal;
var init_Modal$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$50 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$7 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Button();
	init_keepDom();
	init_theme();
	init_preventScrollPenetrate();
	init_stylusAdapter();
	init_locale();
	Modal = function(_super) {
		__extends(Modal, _super);
		function Modal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.handleCancel = function(e) {
				_this.props.onCancel(e);
			};
			_this.handleOk = function(e) {
				var _a = _this.props, okDisabled = _a.okDisabled, onOk = _a.onOk;
				if (okDisabled) return;
				onOk(e);
			};
			_this.handleClose = function(e) {
				var _a = _this.props, onClose = _a.onClose, onCancel = _a.onCancel;
				(onClose || onCancel)(e);
			};
			_this.handleMaskClick = function(e) {
				var _a = _this.props, maskClosable = _a.maskClosable, onClickMask = _a.onClickMask;
				if (maskClosable === true) _this.handleClose(e);
				onClickMask(e);
			};
			_this.handleModalClick = function(e) {
				e.stopPropagation();
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, title = _c.title, content = _c.content, visible = _c.visible, closable = _c.closable, mask = _c.mask, children = _c.children, destroyOnClose = _c.destroyOnClose, maskStyle = _c.maskStyle, zIndex = _c.zIndex, titleAlignment = _c.titleAlignment, testId = _c.testId, containerDom = _c.containerDom, disablePreventScroll = _c.disablePreventScroll;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-no-mask"] = !mask, _a));
				var maskClasses = classNames(prefixCls + "-mask", (_b = {}, _b[prefixCls + "-mask-display"] = mask, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var titleClasses = classNames(prefixCls + "-title", prefixCls + "-title-" + titleAlignment);
				if (destroyOnClose && !decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom$7.createPortal(h(PreventScrollPenetrateContainer, {
					className: maskClasses,
					style: __assign({ zIndex }, maskStyle),
					onClick: _this.handleMaskClick,
					disabled: disablePreventScroll
				}, h("div", {
					className: classes,
					style: __assign({ overflow: "initial" }, style),
					onClick: _this.handleModalClick,
					"data-testid": testId
				}, title ? h("div", { className: titleClasses }, title) : null, h("div", { className: classNames(prefixCls + "-content") }, content || children), _this.renderFooter(classNames), closable ? h(WithStylusClick, { clickHandler: _this.handleClose }, h("div", { className: classNames(prefixCls + "-close") })) : null)), containerDom || document.body);
			};
			return _this;
		}
		Modal.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Modal.prototype.renderFooter = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, footer = _a.footer, okText = _a.okText, cancelText = _a.cancelText, actions = _a.actions, okStyle = _a.okStyle, cancelStyle = _a.cancelStyle, footerType = _a.footerType, okButtonType = _a.okButtonType, okDisabled = _a.okDisabled;
			if (footer === null) return null;
			if (footer) return footer;
			if (actions) return h("div", { className: classNames(prefixCls + "-actions") }, actions.map(function(a, index) {
				return h(WithStylusClick, {
					clickHandler: a.onClick,
					key: index
				}, h(Button_default, null, a.text));
			}));
			var isVerticalFooter = footerType === "vertical";
			var buttonSize = isVerticalFooter ? "large" : "default";
			var okButton = h(WithStylusClick, { clickHandler: this.handleOk }, h(Button_default, {
				type: okButtonType || (isVerticalFooter ? "primary" : "default"),
				style: okStyle,
				size: buttonSize,
				disabled: okDisabled
			}, okText));
			var cancelButton = cancelText ? h(WithStylusClick, { clickHandler: this.handleCancel }, h(Button_default, {
				type: isVerticalFooter ? "plain" : "default",
				style: cancelStyle,
				size: buttonSize
			}, cancelText)) : null;
			return h("div", { className: classNames(isVerticalFooter ? prefixCls + "-footer-vertical" : prefixCls + "-footer") }, cancelButton, okButton);
		};
		return Modal;
	}(import_react$50.Component);
	Modal.defaultProps = {
		prefixCls: "dui-m-modal",
		title: "",
		content: "",
		footer: "",
		onCancel: emptyFn,
		onOk: emptyFn,
		cancelText: i18n("cancel"),
		okText: i18n("ok"),
		visible: false,
		mask: true,
		destroyOnClose: false,
		onClickMask: emptyFn,
		maskClosable: false,
		titleAlignment: "center",
		footerType: "horizontal",
		closable: false
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/utils/show.js
function showWithTransition(_a) {
	var Component = _a.Component, transitionDuration = _a.transitionDuration, autoClose = _a.autoClose, props = _a.props, forcedProps = _a.forcedProps, _b = _a.injectClosePropNames, injectClosePropNames = _b === void 0 ? [] : _b, _c = _a.deepInjectClosePaths, deepInjectClosePaths = _c === void 0 ? [] : _c, _d = _a.contexts, contexts = _d === void 0 ? [] : _d;
	var div = document.createElement("div");
	document.body.appendChild(div);
	var timer;
	var closed = false;
	injectClose(props);
	var currentProps = __assign(__assign(__assign({}, props), forcedProps), { visible: true });
	function overrideSingle(obj, key) {
		var originalValue = obj[key] || emptyFn;
		if (originalValue.__dui_injected_fn__) return;
		obj[key] = inject(originalValue, close);
	}
	function injectClose(propsToInject) {
		injectClosePropNames.forEach(function(key) {
			overrideSingle(propsToInject, key);
		});
		deepInjectClosePaths.forEach(function(path) {
			var segments = path.split(".");
			var finalKey = segments.pop();
			var objectWalkers = [propsToInject];
			var _loop_1 = function(seg) {
				var nextLevelObjects = (0, import_flatten.default)(objectWalkers.map(function(obj) {
					return obj[seg];
				}).filter(function(value) {
					return value;
				}));
				if (!nextLevelObjects.length) return { value: void 0 };
				objectWalkers = nextLevelObjects;
			};
			for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
				var seg = segments_1[_i];
				var state_1 = _loop_1(seg);
				if (typeof state_1 === "object") return state_1.value;
			}
			objectWalkers.forEach(function(obj) {
				overrideSingle(obj, finalKey);
			});
		});
	}
	function update(newProps) {
		if (closed) return;
		currentProps = __assign(__assign(__assign(__assign({}, currentProps), newProps), forcedProps), { visible: true });
		injectClose(currentProps);
		render(currentProps);
	}
	function close() {
		if (closed) return;
		closed = true;
		clearTimeout(timer);
		currentProps = __assign(__assign({}, currentProps), { visible: false });
		render(currentProps);
		setTimeout(function() {
			import_react_dom$6.unmountComponentAtNode(div);
			div.remove();
		}, transitionDuration + 20);
	}
	var effectiveContexts = [{
		provider: ShowCloseContext.Provider,
		value: close
	}].concat(contexts);
	function render(props) {
		import_react_dom$6.render(composeContexts(effectiveContexts, h(Component, __assign({}, props))), div);
	}
	render(currentProps);
	if (autoClose) timer = setTimeout(close, props.duration || 2e3);
	return {
		update,
		close
	};
}
function composeContexts(contexts, children) {
	return contexts.reduce(function(child, _a) {
		var Provider = _a.provider, value = _a.value;
		return h(Provider, { value }, child);
	}, children);
}
var import_react$49, import_react_dom$6, import_flatten, ShowCloseContext;
var init_show$5 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$6 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	import_flatten = /* @__PURE__ */ __toESM(require_flatten());
	ShowCloseContext = import_react$49.createContext(emptyFn);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Modal/confirm.js
var confirm_default;
var init_confirm = __esmMin((() => {
	init_Modal$1();
	init_show$5();
	init_helper();
	confirm_default = wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		return showWithTransition({
			Component: Modal,
			transitionDuration: 200,
			autoClose: false,
			props: config,
			forcedProps: { destroyOnClose: true },
			injectClosePropNames: [
				"onOk",
				"onCancel",
				"onClose"
			],
			deepInjectClosePaths: ["actions.onClick"],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Modal/index.js
var Modal_default;
var init_Modal = __esmMin((() => {
	init_style();
	init_Modal$1();
	init_confirm();
	injectStyle("components/Modal/style/index.css", "@-webkit-keyframes dui-m-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-m-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-m-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-duim-1-9-0~=\"dui-m-modal\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:320px;min-height:160px;padding-top:36px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:8px;border:none;background-color:var(--bg-lv3-default,#fff);pointer-events:auto;-webkit-animation:dui-m-modal-pop-up .2s ease-out;animation:dui-m-modal-pop-up .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;position:relative;color:var(--text-ultrastrong,rgba(0,0,0,.9));opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}[data-duim-1-9-0~=\"dui-m-modal-hidden\"]{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1);pointer-events:none}[data-duim-1-9-0~=\"dui-m-modal-no-mask\"]{-webkit-box-shadow:0 8px 32px 0 rgba(0,0,0,.16);box-shadow:0 8px 32px 0 rgba(0,0,0,.16);border:1px solid var(--border-medium,rgba(0,0,0,.08));background-color:var(--bg-lv3-default,#fff)}@supports ((-webkit-backdrop-filter:blur(23px)) or (backdrop-filter:blur(23px))){[data-duim-1-9-0~=\"dui-m-modal-no-mask\"]{background-color:var(--duim-blur-minor-bg-color,hsla(0,0%,100%,.92));-webkit-backdrop-filter:blur(23px);backdrop-filter:blur(23px)}}[data-duim-1-9-0~=\"dui-m-modal-mask\"]{position:fixed;z-index:9998;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-animation:dui-m-modal-fade-in .2s linear;animation:dui-m-modal-fade-in .2s linear;-webkit-transition:all .2s linear;transition:all .2s linear}[data-duim-1-9-0~=\"dui-m-modal-mask-display\"]{pointer-events:auto;background-color:rgba(0,0,0,.3)}[data-duim-1-9-0~=\"dui-m-modal-mask-hidden\"]{opacity:0;visibility:hidden}[data-duim-1-9-0~=\"dui-m-modal-title\"]{-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:500;font-size:18px;margin-bottom:16px;padding:0 24px;width:100%;line-height:22px}[data-duim-1-9-0~=\"dui-m-modal-title-center\"]{text-align:center}[data-duim-1-9-0~=\"dui-m-modal-title-left\"]{text-align:left}[data-duim-1-9-0~=\"dui-m-modal-content\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:stretch;-webkit-align-items:stretch;align-items:stretch;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:16px;line-height:24px;padding:0 24px;width:100%;margin-bottom:36px;text-align:center}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"],[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]{position:relative;display:inline-block;border:none;border-radius:0;font-size:17px;font-weight:400;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-modal-footer\"],[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 8px 8px;overflow:hidden}[data-duim-1-9-0~=\"dui-m-modal-footer\"]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}[data-duim-1-9-0~=\"dui-m-modal-footer\"]:before{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);top:0;left:0;z-index:1}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:56px}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]:last-child{font-weight:500}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));background:var(--bg-lv1-default,#fff)}[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-flow:column-reverse nowrap;flex-flow:column-reverse nowrap;padding:0 30px 30px}[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]>[data-duim-1-9-0~=\"dui-m-button\"]:not(:last-child){margin-top:12px}[data-duim-1-9-0~=\"dui-m-modal-actions\"]{width:100%;border-radius:0 0 8px 8px;overflow:hidden}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"]{width:100%;height:44px}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"]:after{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);top:0;left:0}[data-duim-1-9-0~=\"dui-m-modal-close\"]{position:absolute;width:32px;height:32px;bottom:-56px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='none' fill-rule='evenodd'%3E%3Ccircle stroke='%23fff' stroke-width='3' cx='32' cy='32' r='30.5'/%3E%3Cpath d='M41.627 19l2.828 2.828-9.9 9.9 9.9 9.899-2.828 2.828-9.899-9.9-9.9 9.9L19 41.627l9.9-9.899-9.9-9.9L21.828 19l9.9 9.9 9.899-9.9z' fill='%23fff'/%3E%3C/svg%3E\");background-size:contain;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-modal-close\"]:active{opacity:.5}");
	Modal.confirm = confirm_default;
	Modal_default = Modal;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Loading/Spin.js
var import_react$48, VIEW_BOX_SIZE, Spin;
var init_Spin = __esmMin((() => {
	init_style();
	init_createElement();
	init_tslib_es6();
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	injectStyle("components/Loading/style/spin.css", "[data-duim-1-9-0~=\"dui-m-spin\"]{position:relative;width:100%;height:100%}[data-duim-1-9-0~=\"dui-m-spin-container\"]{position:absolute;left:50%;top:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:48px;height:48px}[data-duim-1-9-0~=\"dui-m-spin-circle\"]{border-radius:50%;width:100%;height:100%;-webkit-animation:dui-m-spin-rotate .8s linear infinite;animation:dui-m-spin-rotate .8s linear infinite;-webkit-box-sizing:border-box;box-sizing:border-box}[data-duim-1-9-0~=\"dui-m-spin-circle-light\"]{border:4px solid hsla(0,0%,100%,.4);border-top-color:#fff}[data-duim-1-9-0~=\"dui-m-spin-circle-dark\"]{border:4px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.32)}[data-duim-1-9-0~=\"dui-m-spin-circle-primary\"]{border:4px solid rgba(30,111,255,.24);border-top:4px solid var(--accent-default,#1e6fff)}@-webkit-keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
	VIEW_BOX_SIZE = 48;
	Spin = function(_super) {
		__extends(Spin, _super);
		function Spin() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = import_react$48.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, type = _a.type, circleClassName = _a.circleClassName, circleStyle = _a.circleStyle;
				var cls = classNames(prefixCls, className);
				var circleCls = classNames(prefixCls + "-circle", prefixCls + "-circle-" + type, circleClassName);
				return h("div", {
					className: cls,
					style,
					ref: _this.rootRef
				}, h("div", {
					className: classNames(prefixCls + "-container"),
					style: _this.calcContainerTransform()
				}, h("div", {
					className: circleCls,
					style: circleStyle
				})));
			};
			return _this;
		}
		Spin.prototype.calcContainerTransform = function() {
			var rootDom = this.rootRef.current;
			if (!rootDom) return;
			var width = rootDom.clientWidth, height = rootDom.clientHeight;
			return { transform: "translate(-50%,-50%) scale(" + Math.min(width, height) / VIEW_BOX_SIZE + ")" };
		};
		Spin.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Spin.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Spin;
	}(import_react$48.PureComponent);
	Spin.defaultProps = {
		prefixCls: "dui-m-spin",
		type: "dark"
	};
})), import_react$47, import_react_dom$5, Loading;
var init_Loading$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$5 = /* @__PURE__ */ __toESM(require_react_dom());
	init_Spin();
	init_keepDom();
	init_theme();
	init_preventScrollPenetrate();
	Loading = function(_super) {
		__extends(Loading, _super);
		function Loading() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, tip = _c.tip, visible = _c.visible, children = _c.children, embedded = _c.embedded, tipStyle = _c.tipStyle, zIndex = _c.zIndex, tipClassName = _c.tipClassName, maskClassName = _c.maskClassName, maskStyle = _c.maskStyle;
				var type = children ? "wrap" : embedded ? "embedded" : "fixed";
				var cls = classNames(prefixCls, className, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-hidden"] = !visible && !embedded, _a));
				var maskCls = classNames(prefixCls + "-mask", prefixCls + "-mask-" + type, maskClassName, (_b = {}, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var containerCls = classNames(prefixCls + "-container", prefixCls + "-container-" + type);
				var defaultSpinSize = {
					width: "48px",
					height: "48px"
				};
				var tipElement = tip ? h("div", {
					className: classNames(prefixCls + "-tip", tipClassName),
					style: tipStyle
				}, tip) : null;
				if (type === "wrap") return h("div", { className: containerCls }, children, h("div", {
					className: maskCls,
					style: maskStyle,
					"aria-hidden": !visible
				}, h("div", {
					className: cls,
					style
				}, h(Spin, {
					style: defaultSpinSize,
					type: _this.getUserSetSpinType() || "dark"
				}), tipElement)));
				if (type === "embedded") return h("div", {
					className: cls,
					style: __assign(__assign({}, defaultSpinSize), style)
				}, h(Spin, { type: _this.getUserSetSpinType() || "dark" }));
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom$5.createPortal(h(PreventScrollPenetrateContainer, {
					className: containerCls,
					style: { zIndex },
					"aria-hidden": !visible
				}, h("div", {
					className: maskCls,
					style: maskStyle
				}), h("div", {
					className: cls,
					style
				}, h(Spin, {
					style: defaultSpinSize,
					type: _this.getUserSetSpinType() || "light"
				}), tipElement)), document.body);
			};
			return _this;
		}
		Loading.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Loading.prototype.getUserSetSpinType = function() {
			return this.props.spinType || (document.documentElement.classList.contains("__DARK__") ? "light" : void 0);
		};
		return Loading;
	}(import_react$47.Component);
	Loading.defaultProps = {
		prefixCls: "dui-m-loading",
		visible: false,
		embedded: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Loading/show.js
var show_default$4;
var init_show$4 = __esmMin((() => {
	init_Loading$1();
	init_show$5();
	init_helper();
	show_default$4 = wrapWithConfigDefaults(function(config) {
		if (config === void 0) config = {};
		return showWithTransition({
			Component: Loading,
			transitionDuration: 200,
			autoClose: false,
			forcedProps: { embedded: false },
			props: config,
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Loading/index.js
var Loading_default;
var init_Loading = __esmMin((() => {
	init_style();
	init_show$4();
	init_Loading$1();
	injectStyle("components/Loading/style/index.css", "@-webkit-keyframes dui-m-loading-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-loading-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-m-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-m-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes dui-m-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-m-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-duim-1-9-0~=\"dui-m-loading-wrap\"] [data-duim-1-9-0~=\"dui-m-loading-tip\"]{color:rgba(0,0,0,.8)}[data-duim-1-9-0~=\"dui-m-loading-fixed\"]{background:rgba(0,0,0,.8);-webkit-animation:dui-m-loading-pop-up .2s ease-out;animation:dui-m-loading-pop-up .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-fixed\"],[data-duim-1-9-0~=\"dui-m-loading-wrap\"]{-webkit-box-sizing:border-box;box-sizing:border-box;min-width:130px;min-height:130px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:26px 21px 22px;border-radius:4px}[data-duim-1-9-0~=\"dui-m-loading-hidden\"]{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}[data-duim-1-9-0~=\"dui-m-loading-container\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}[data-duim-1-9-0~=\"dui-m-loading-container-fixed\"]{position:fixed;z-index:9999;top:0;left:0;right:0;bottom:0}[data-duim-1-9-0~=\"dui-m-loading-container-wrap\"]{position:relative}[data-duim-1-9-0~=\"dui-m-loading-mask\"]{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;left:0;top:0;width:100%;height:100%;background-color:var(--duim-mask-color,hsla(0,0%,100%,.65));-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-mask-fixed\"]{z-index:-1;-webkit-animation:dui-m-loading-fade-in .2s ease-out;animation:dui-m-loading-fade-in .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-mask-hidden\"]{opacity:0}[data-duim-1-9-0~=\"dui-m-loading-tip\"]{color:#fff;font-size:14px;margin-top:18px;line-height:16px}");
	Loading.show = show_default$4;
	Loading_default = Loading;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Form/context.js
var import_react$46, FormItemContext;
var init_context = __esmMin((() => {
	import_react$46 = /* @__PURE__ */ __toESM(require_react());
	FormItemContext = import_react$46.createContext({ status: "default" });
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Input/Input.js
var import_react$45, Input;
var init_Input$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_context();
	init_theme();
	Input = function(_super) {
		__extends(Input, _super);
		function Input() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.leftIconRef = import_react$45.createRef();
			_this.rightIconsRef = import_react$45.createRef();
			_this.state = { value: _this.props.defaultValue };
			_this.handleChange = function(e) {
				if (_this.props.disabled) return;
				var value = e.target.value;
				_this.props.onChange(value, e);
				_this.setState({ value });
			};
			_this.preventLoseFocus = function(e) {
				e.preventDefault();
			};
			_this.handleClear = function() {
				_this.setState({ value: "" }, function() {
					_this.props.onChange("");
				});
			};
			_this.themedRender = function(classNames) {
				var _a, _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, disabled = _b.disabled, underline = _b.underline;
				_b.icon;
				var leftIcon = _b.leftIcon;
				_b.onClickIcon;
				var onClickLeftIcon = _b.onClickLeftIcon;
				_b.onChange;
				var inputStyle = _b.inputStyle;
				_b.showClear;
				var forcedValue = _b.value;
				_b.defaultValue;
				var inputRef = _b.inputRef, inputClassName = _b.inputClassName, testId = _b.testId, errorTip = _b.errorTip, rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"disabled",
					"underline",
					"icon",
					"leftIcon",
					"onClickIcon",
					"onClickLeftIcon",
					"onChange",
					"inputStyle",
					"showClear",
					"value",
					"defaultValue",
					"inputRef",
					"inputClassName",
					"testId",
					"errorTip"
				]);
				var stateValue = _this.state.value;
				var status = _this.status;
				var value = typeof forcedValue === "string" ? forcedValue : stateValue;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a));
				var inputClasses = classNames(prefixCls + "-input", inputClassName, prefixCls + "-input-" + status, prefixCls + "-input-" + (underline ? "underline" : "normal"));
				var indicatorClasses = classNames(prefixCls + "-indicator", prefixCls + "-indicator-" + status);
				var errorTipCls = classNames(prefixCls + "-error-text");
				var clearVisible = !!(value && !disabled);
				return h("div", {
					className: classes,
					style,
					"data-testid": testId
				}, _this.renderSingleIcon(classNames, {
					prop: leftIcon,
					description: "left",
					handler: onClickLeftIcon,
					ref: _this.leftIconRef
				}), h("input", __assign({
					className: inputClasses,
					style: __assign(__assign({}, _this.getIconPaddings()), inputStyle),
					onChange: _this.handleChange,
					value,
					disabled,
					ref: inputRef
				}, rest)), underline ? h("span", { className: indicatorClasses }) : null, _this.renderRightIcons(classNames, clearVisible), errorTip && h("div", { className: errorTipCls }, errorTip));
			};
			return _this;
		}
		Object.defineProperty(Input.prototype, "status", {
			get: function() {
				if (this.props.errorTip) return "error";
				return this.context.status;
			},
			enumerable: false,
			configurable: true
		});
		Input.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Input.prototype.getIconPaddings = function() {
			var leftIconDom = this.leftIconRef.current;
			var rightIconsDom = this.rightIconsRef.current;
			var result = {};
			var gap = 2;
			if (leftIconDom) result.paddingLeft = leftIconDom.getBoundingClientRect().width + gap + "px";
			if (rightIconsDom) result.paddingRight = rightIconsDom.getBoundingClientRect().width + gap + "px";
			return result;
		};
		Input.prototype.renderSingleIcon = function(classNames, _a) {
			var _b;
			var prop = _a.prop, description = _a.description, handler = _a.handler, ref = _a.ref;
			var _c = this.props, prefixCls = _c.prefixCls, underline = _c.underline;
			var classes = classNames(prefixCls + "-icon", (_b = {}, _b[prefixCls + "-icon-" + description] = description, _b[prefixCls + "-icon-clickable"] = handler, _b[prefixCls + "-icon-underline"] = underline, _b));
			return prop ? h("div", {
				className: classes,
				onMouseDown: this.preventLoseFocus,
				onClick: handler,
				ref
			}, typeof prop === "string" ? h("span", {
				className: classNames(prefixCls + "-icon-img"),
				style: { backgroundImage: "url(\"" + prop + "\")" }
			}) : prop) : null;
		};
		Input.prototype.renderRightIcons = function(classNames, clearVisible) {
			var _a, _b;
			var _c = this.props, prefixCls = _c.prefixCls, showClear = _c.showClear, icon = _c.icon, onClickIcon = _c.onClickIcon, underline = _c.underline;
			var clearClasses = classNames(prefixCls + "-clear", prefixCls + "-icon-clickable", (_a = {}, _a[prefixCls + "-clear-visible"] = clearVisible, _a[prefixCls + "-icon"] = !underline, _a[prefixCls + "-clear-underline"] = underline, _a));
			var containerClasses = classNames(prefixCls + "-icon-container", (_b = {}, _b[prefixCls + "-icon-container-underline"] = underline, _b));
			return showClear || icon ? h("div", {
				className: containerClasses,
				ref: this.rightIconsRef
			}, showClear ? h("span", {
				className: clearClasses,
				onMouseDown: this.preventLoseFocus,
				onClick: this.handleClear
			}) : null, this.renderSingleIcon(classNames, {
				prop: icon,
				handler: onClickIcon
			})) : null;
		};
		Input.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Input.contextType = FormItemContext;
		return Input;
	}(import_react$45.Component);
	Input.defaultProps = {
		prefixCls: "dui-m-input",
		onChange: emptyFn,
		showClear: false,
		defaultValue: ""
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Input/Password.js
var import_react$44, openEyeUrl, closedEyeUrl, Password;
var init_Password = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_Input$1();
	init_theme();
	openEyeUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMS4zMzMiIGhlaWdodD0iMjEuMzMzIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTYgNmg0djRINnptMCAwIi8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9IkIiPjxwYXRoIGQ9Ik04IDZjLTEuMTAyIDAtMiAuODk4LTIgMnMuODk4IDIgMiAyIDItLjg5OCAyLTItLjg5OC0yLTItMnptMCAwIi8+PC9jbGlwUGF0aD48L2RlZnM+PHBhdGggZD0iTTggNGMxLjM2IDAgMi44MTYuNjY0IDQuMjIzIDEuOTIyLjYzLjU2MyAxLjE3MiAxLjE4IDEuNjMgMS44NTJMMTQgOGExMC4wNSAxMC4wNSAwIDAgMS0xLjc3NyAyLjA3OEMxMC44MTYgMTEuMzM2IDkuMzYgMTIgOCAxMmMtMS4zMSAwLTIuNzEtLjYxNy00LjA2Ni0xLjc4NWwtLjE1Ni0uMTM3YTEwLjA5IDEwLjA5IDAgMCAxLTEuNjMtMS44NTJMMiA4YTEwLjA1IDEwLjA1IDAgMCAxIDEuNzc3LTIuMDc4QzUuMTggNC42NjQgNi42NCA0IDggNHptMCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYig1MC41ODg5ODklLDUyLjU0OTc0NCUsNTYuMDc5MTAyJSkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48ZyBjbGlwLXBhdGg9InVybCgjQikiPjxwYXRoIGQ9Ik0zLjUgMy41aDl2OWgtOXptMCAwIiBmaWxsPSJyZ2IoNTAuNTg4OTg5JSw1Mi41NDk3NDQlLDU2LjA3OTEwMiUpIi8+PC9nPjwvZz48L3N2Zz4=";
	closedEyeUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMS4zMzMiIGhlaWdodD0iMjEuMzMzIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTEgNWgxNHY4SDF6bTAgMCIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJCIj48cGF0aCBkPSJNMTMuNTMgNS43NzdsMS4zODcgMS40NDVhMTAuMDMgMTAuMDMgMCAwIDEtMS43ODkgMS4zNjNsMS4yMzggMi4xNDUtMS43MzQgMS0xLjMyNC0yLjI5M0E5Ljc3IDkuNzcgMCAwIDEgOSA5Ljk1djIuNTVIN1Y5Ljk1Yy0uNzk3LS4wNzgtMS41Ny0uMjUtMi4zMS0uNTEyTDMuMzY3IDExLjczbC0xLjczNC0xTDIuODcgOC41ODZhOS43MyA5LjczIDAgMCAxLTEuNjItMS4yMTFsLS4xNjgtLjE1MkwyLjQ3IDUuNzc3QTcuOTYgNy45NiAwIDAgMCA4IDhhNy45NiA3Ljk2IDAgMCAwIDUuMzgzLTIuMDgyem0wIDAiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjQSkiPjxnIGNsaXAtcGF0aD0idXJsKCNCKSI+PHBhdGggZD0iTS0xLjQxOCAzLjI3N2gxOC44MzZWMTVILTEuNDE4em0wIDAiIGZpbGw9InJnYig1MC41ODg5ODklLDUyLjU0OTc0NCUsNTYuMDc5MTAyJSkiLz48L2c+PC9nPjwvc3ZnPg==";
	Password = function(_super) {
		__extends(Password, _super);
		function Password() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.inputRef = import_react$44.createRef();
			_this.state = { passwordVisible: false };
			_this.refDom = function(dom) {
				_this.inputRef.current = dom;
				var propRef = _this.props.inputRef;
				if (!propRef) return;
				if (typeof propRef === "function") propRef(dom);
				else propRef.current = dom;
			};
			_this.togglePasswordVisibility = function() {
				var dom = _this.inputRef.current;
				var selectionStart = dom.selectionStart, selectionEnd = dom.selectionEnd;
				_this.setState(function(prevState) {
					return { passwordVisible: !prevState.passwordVisible };
				}, function() {
					setTimeout(function() {
						dom.setSelectionRange(selectionStart, selectionEnd);
					}, 0);
				});
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, showToggle = _a.showToggle, rest = __rest(_a, ["showToggle"]);
				var passwordVisible = _this.state.passwordVisible;
				return h(Input, __assign({
					icon: showToggle ? passwordVisible ? openEyeUrl : closedEyeUrl : void 0,
					inputStyle: { letterSpacing: passwordVisible ? "2px" : "4px" },
					onClickIcon: _this.togglePasswordVisibility,
					type: passwordVisible ? "text" : "password",
					inputRef: _this.refDom
				}, rest));
			};
			return _this;
		}
		Password.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Password;
	}(import_react$44.Component);
	Password.defaultProps = { showToggle: true };
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Input/Search.js
var import_react$43, searchUrl, Search;
var init_Search = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	init_Input$1();
	init_theme();
	init_locale();
	searchUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTIgNGE3IDcgMCAwIDEgNyA3YzAgMS44NTQtLjcyMSAzLjU0LTEuODk3IDQuNzkybDMuNzU2IDMuNzU2LTEuMDYxIDEuMDYxLTMuODM3LTMuODM3QTYuOTcgNi45NyAwIDAgMSAxMiAxOGE3IDcgMCAxIDEgMC0xNHptMCAxLjVhNS41IDUuNSAwIDEgMCAwIDExIDUuNSA1LjUgMCAxIDAgMC0xMXoiIGZpbGw9IiNjYmNkZDEiLz48L3N2Zz4=";
	Search = function(_super) {
		__extends(Search, _super);
		function Search() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a = _this.props, className = _a.className, rest = __rest(_a, ["className"]);
				return h(Input, __assign({}, rest, {
					className: classNames(className, "dui-m-input-search"),
					showClear: true,
					leftIcon: searchUrl
				}));
			};
			return _this;
		}
		Search.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Search;
	}(import_react$43.Component);
	Search.defaultProps = { placeholder: i18n("search") };
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Input/index.js
var Input_default;
var init_Input = __esmMin((() => {
	init_style();
	init_Input$1();
	init_Password();
	init_Search();
	injectStyle("components/Input/style/index.css", "[data-duim-1-9-0~=\"dui-m-input\"]{position:relative;-webkit-tap-highlight-color:transparent}[data-duim-1-9-0~=\"dui-m-input-disabled\"]{opacity:.33}[data-duim-1-9-0~=\"dui-m-input-input\"]{outline:none;line-height:20px;font-size:17px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;caret-color:var(--accent-default,#1e6fff);color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-input-input\"]::-webkit-input-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-duim-1-9-0~=\"dui-m-input-input\"]::-moz-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-duim-1-9-0~=\"dui-m-input-input\"]::placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-duim-1-9-0~=\"dui-m-input-input-normal\"]{padding:7px 11px;border:1px solid transparent;border-radius:12px;background:var(--tsp-fill-weak,rgba(51,77,102,.06))}[data-duim-1-9-0~=\"dui-m-input-input-underline\"]{padding:6px 0;border:none;border-radius:0;border-bottom:1px solid var(--border-strong,rgba(0,0,0,.12));background:transparent}[data-duim-1-9-0~=\"dui-m-input-input-underline\"]:focus{border-bottom-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-input-input-error\"]{border-color:#ff7272}[data-duim-1-9-0~=\"dui-m-input-input-error\"][data-duim-1-9-0~=\"dui-m-input-input-underline\"]{border-color:transparent transparent #ff7272}[data-duim-1-9-0~=\"dui-m-input-input\"]:focus+[data-duim-1-9-0~=\"dui-m-input-indicator\"]{-webkit-transform:scaleX(1);transform:scaleX(1)}[data-duim-1-9-0~=\"dui-m-input-indicator\"]{position:absolute;display:inline-block;left:0;bottom:-1px;width:100%;height:2px;background:var(--accent-default,#1e6fff);-webkit-transform-origin:left center;transform-origin:left center;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;-webkit-transform:scaleX(0);transform:scaleX(0)}[data-duim-1-9-0~=\"dui-m-input-indicator-error\"]{background:#ff7272}[data-duim-1-9-0~=\"dui-m-input-clear\"]{display:inline-block;width:16px;height:16px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill-rule='evenodd' d='M6.015 5.13l3.447 3.447-.884.884L5.13 6.015 1.684 9.462.8 8.578 4.247 5.13.8 1.684 1.684.8 5.13 4.247 8.578.8l.884.884L6.015 5.13z' opacity='.237'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;visibility:hidden;-webkit-filter:var(--duim-invert-filter,none);filter:var(--duim-invert-filter,none)}[data-duim-1-9-0~=\"dui-m-input-clear-visible\"]{visibility:visible}[data-duim-1-9-0~=\"dui-m-input-icon-container\"],[data-duim-1-9-0~=\"dui-m-input-icon-left\"]{position:absolute;height:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}[data-duim-1-9-0~=\"dui-m-input-icon\"],[data-duim-1-9-0~=\"dui-m-input-icon-container\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}[data-duim-1-9-0~=\"dui-m-input-icon\"]{width:30px;height:100%;border-radius:1px}[data-duim-1-9-0~=\"dui-m-input-icon-container\"]{right:0}[data-duim-1-9-0~=\"dui-m-input-icon-container-underline\"]>:not(:last-child){margin-right:7px}[data-duim-1-9-0~=\"dui-m-input-icon-underline\"]{width:auto;height:auto}[data-duim-1-9-0~=\"dui-m-input-icon-img\"]{display:inline-block;width:16px;height:16px;background-size:cover;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-input-icon-left\"]{left:0}[data-duim-1-9-0~=\"dui-m-input-icon-right\"]{height:100%;right:0}[data-duim-1-9-0~=\"dui-m-input-error-text\"]{color:var(--text-error,#eb3639);font-size:12px;line-height:16px;position:absolute;top:100%;left:0;margin-top:4px}[data-duim-1-9-0~=\"dui-m-input-search\"] [data-duim-1-9-0~=\"dui-m-input-icon-left\"]{width:auto}[data-duim-1-9-0~=\"dui-m-input-search\"] [data-duim-1-9-0~=\"dui-m-input-icon-img\"]{width:24px;height:24px;margin:0 2px 0 7px}[data-duim-1-9-0~=\"dui-m-input-search\"] [data-duim-1-9-0~=\"dui-m-input-clear\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' opacity='.4'/%3E%3Cpath fill='%23fff' d='M20.728 8l2.828 2.828-4.95 4.95 4.95 4.95-2.828 2.828-4.95-4.95-4.95 4.95L8 20.728l4.949-4.95L8 10.828 10.828 8l4.95 4.949L20.728 8z'/%3E%3C/svg%3E\");background-size:contain;width:16px;height:16px;margin-right:11px}");
	Input.Password = Password;
	Input.Search = Search;
	Input_default = Input;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Checkbox/util.js
function renderChildren(props, checkedValues, handleSingleChange, Component, itemStyle) {
	var children = props.children;
	var options = props.options || [];
	var disabled = props.disabled;
	var style = __assign({ paddingBottom: 22 }, itemStyle);
	if (options.length) return options.map(function(option, index) {
		if (typeof option === "string") return h(Component, {
			key: index,
			value: option,
			onChange: handleSingleChange,
			checked: checkedValues.indexOf(option) !== -1,
			disabled,
			style: __assign({}, style)
		}, option);
		else return h(Component, __assign({}, option, {
			key: index,
			value: option.value,
			onChange: handleSingleChange,
			checked: checkedValues.indexOf(option.value) !== -1,
			disabled: option.disabled || disabled,
			style: __assign(__assign({}, style), option.style)
		}), option.label);
	});
	return import_react$42.Children.map(children, function(child) {
		return import_react$42.cloneElement(child, {
			checked: checkedValues.indexOf(child.props.value) !== -1,
			onChange: handleSingleChange,
			disabled: child.props.disabled || disabled,
			style: __assign(__assign({}, style), child.props.style)
		});
	});
}
var import_react$42;
var init_util = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Divider/Divider.js
var import_react$41, import_prop_types$2, Divider;
var init_Divider$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$2 = /* @__PURE__ */ __toESM(require_prop_types());
	init_theme();
	Divider = function(_super) {
		__extends(Divider, _super);
		function Divider() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, dashed = _b.dashed, children = _b.children, orientation = _b.orientation, textPosition = _b.textPosition;
				var containsText = children && orientation === "horizontal";
				var classes = classNames(prefixCls, className, prefixCls + "-" + orientation + (dashed ? "-dashed" : ""), (_a = {}, _a[prefixCls + "-with-text"] = containsText, _a));
				var textClasses = classNames(prefixCls + "-text", [prefixCls + "-text-" + textPosition]);
				return h("div", {
					className: classes,
					style
				}, containsText ? h("span", { className: textClasses }, children) : null);
			};
			return _this;
		}
		Divider.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Divider;
	}(import_react$41.Component);
	Divider.defaultProps = {
		prefixCls: "dui-m-divider",
		dashed: false,
		orientation: "horizontal",
		textPosition: "center"
	};
	Divider.propTypes = {
		prefixCls: import_prop_types$2.string,
		style: import_prop_types$2.object,
		className: import_prop_types$2.string,
		dashed: import_prop_types$2.bool,
		orientation: import_prop_types$2.string,
		textPosition: import_prop_types$2.string
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Divider/index.js
var Divider_default;
var init_Divider = __esmMin((() => {
	init_style();
	init_Divider$1();
	injectStyle("components/Divider/style/index.css", "[data-duim-1-9-0~=\"dui-m-divider\"]{border:1px solid var(--border-weak,rgba(0,0,0,.04));position:relative}[data-duim-1-9-0~=\"dui-m-divider-horizontal\"],[data-duim-1-9-0~=\"dui-m-divider-horizontal-dashed\"]{display:block;width:100%;border-top:none;border-left:none;border-right:none;margin:8px 0}[data-duim-1-9-0~=\"dui-m-divider-horizontal-dashed\"]{border-bottom-style:dashed}[data-duim-1-9-0~=\"dui-m-divider-vertical\"],[data-duim-1-9-0~=\"dui-m-divider-vertical-dashed\"]{display:inline-block;border-left:none;border-top:none;border-bottom:none;margin:0 12px;height:1em}[data-duim-1-9-0~=\"dui-m-divider-vertical-dashed\"]{border-right-style:dashed}[data-duim-1-9-0~=\"dui-m-divider-with-text\"]{margin:15px 0}[data-duim-1-9-0~=\"dui-m-divider-text\"]{position:absolute;background:#fff;font-size:14px;color:#d0d0d0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding:0 6px}[data-duim-1-9-0~=\"dui-m-divider-text-center\"]{left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}[data-duim-1-9-0~=\"dui-m-divider-text-left\"]{left:24px}[data-duim-1-9-0~=\"dui-m-divider-text-right\"]{right:24px}");
	Divider_default = Divider;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/ActionSheet/Item.js
var import_react$40, Item;
var init_Item = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	Item = function(_super) {
		__extends(Item, _super);
		function Item() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = import_react$40.createRef();
			_this.handleClick = function() {
				var _a = _this.props, onClick = _a.onClick, id = _a.id;
				if (_a.disabled) return;
				onClick(id);
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, description = _c.description, selected = _c.selected, title = _c.title, id = _c.id, disabled = _c.disabled, descriptionStyle = _c.descriptionStyle, titleStyle = _c.titleStyle, selectable = _c.selectable, titleClassName = _c.titleClassName, descriptionClassName = _c.descriptionClassName, icon = _c.icon;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-selected"] = selected, _a[prefixCls + "-disabled"] = disabled, _a[prefixCls + "-with-icon"] = icon, _a));
				var containerClasses = classNames(prefixCls + "-container", (_b = {}, _b[prefixCls + "-container-with-desc"] = description, _b[prefixCls + "-container-selectable"] = selectable, _b));
				return h("li", {
					className: classes,
					style,
					onClick: _this.handleClick,
					ref: _this.ref
				}, _this.renderIcon(classNames), h("span", { className: containerClasses }, h("span", {
					className: classNames(prefixCls + "-title", titleClassName),
					style: titleStyle
				}, title || id), description ? h("span", {
					className: classNames(prefixCls + "-desc", descriptionClassName),
					style: descriptionStyle
				}, description) : null));
			};
			return _this;
		}
		Item.prototype.componentDidMount = function() {
			if (this.props.scrollIntoView) this.ref.current.scrollIntoView();
		};
		Item.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Item.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, icon = _a.icon;
			if (!icon) return null;
			return h("div", {
				className: classNames(prefixCls + "-icon"),
				style: typeof icon === "string" ? { backgroundImage: "url(\"" + icon + "\")" } : void 0
			}, import_react$40.isValidElement(icon) && icon);
		};
		return Item;
	}(import_react$40.Component);
	Item.defaultProps = {
		prefixCls: "dui-m-actionsheet-item",
		onClick: emptyFn,
		id: "",
		selected: false,
		disabled: false
	};
})), import_react$39, import_react_dom$4, ActionSheet;
var init_ActionSheet$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Item();
	init_keepDom();
	init_theme();
	init_preventScrollPenetrate();
	init_locale();
	init_Button();
	ActionSheet = function(_super) {
		__extends(ActionSheet, _super);
		function ActionSheet() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.disabledClick = true;
			_this.filterInvalidClick = function(e) {
				if (_this.disabledClick) e.stopPropagation();
			};
			_this.themedRender = function(classNames) {
				var _a, _b, _c;
				var _d = _this.props, prefixCls = _d.prefixCls, className = _d.className, style = _d.style, visible = _d.visible, onCancel = _d.onCancel, containerStyle = _d.containerStyle, zIndex = _d.zIndex, testId = _d.testId, type = _d.type, mask = _d.mask, preventScrollPenetrate = _d.preventScrollPenetrate, onClickMask = _d.onClickMask;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a));
				var maskClasses = classNames(prefixCls + "-mask", (_b = {}, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var containerClasses = classNames(prefixCls + "-container", (_c = {}, _c[prefixCls + "-container-no-mask"] = !mask, _c));
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom$4.createPortal(h(PreventScrollPenetrateContainer, {
					disabled: typeof preventScrollPenetrate === "boolean" ? !preventScrollPenetrate : !mask,
					className: containerClasses,
					style: __assign({ zIndex }, containerStyle),
					onClickCapture: _this.filterInvalidClick
				}, mask && h("div", {
					className: maskClasses,
					onClick: onClickMask || onCancel
				}), h(PreventScrollPenetrateContainer, {
					disabled: typeof preventScrollPenetrate === "boolean" ? !preventScrollPenetrate : mask,
					className: classes,
					style,
					"data-testid": testId
				}, type === "basic" ? _this.renderBasicPanelContent(classNames) : _this.renderComplexPanelContent(classNames))), document.body);
			};
			return _this;
		}
		ActionSheet.prototype.componentDidMount = function() {
			var _this = this;
			setTimeout(function() {
				_this.disabledClick = false;
			}, 200);
		};
		ActionSheet.prototype.handleClickAction = function(id, callback) {
			callback === null || callback === void 0 || callback(id);
			this.props.onClickAction(id);
		};
		ActionSheet.prototype.renderBasicPanelContent = function(classNames) {
			var _this = this;
			var _a = this.props, prefixCls = _a.prefixCls, options = _a.options, cancelText = _a.cancelText, selectedIds = _a.selectedIds, onCancel = _a.onCancel, title = _a.title;
			var scrollIndex = -1;
			return h(import_react$39.Fragment, null, h("div", { className: classNames(prefixCls + "-options") }, typeof title === "string" && h(Item, {
				id: title,
				className: classNames(prefixCls + "-option-title"),
				titleClassName: classNames(prefixCls + "-option-title-main"),
				disabled: true
			}), options.map(function(o, i) {
				var isSelected = selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds.includes(o.id);
				if (isSelected && scrollIndex === -1) scrollIndex = i;
				return h(Item, __assign({}, o, {
					key: o.id,
					selected: isSelected,
					selectable: Boolean(selectedIds),
					onClick: function(id) {
						return _this.handleClickAction(id, o.onClick);
					},
					scrollIntoView: i === scrollIndex
				}));
			})), h(Item, {
				title: cancelText,
				onClick: onCancel,
				className: classNames(prefixCls + "-cancel")
			}));
		};
		ActionSheet.prototype.renderComplexPanelContent = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, onCancel = _a.onCancel, title = _a.title, headerAction = _a.headerAction, content = _a.content, onClickHeaderAction = _a.onClickHeaderAction, primaryAction = _a.primaryAction, onClickPrimaryAction = _a.onClickPrimaryAction, secondaryAction = _a.secondaryAction, onClickSecondaryAction = _a.onClickSecondaryAction, headerClassName = _a.headerClassName, headerStyle = _a.headerStyle, footerClassName = _a.footerClassName, footerStyle = _a.footerStyle, closeClassName = _a.closeClassName, closeStyle = _a.closeStyle, contentClassName = _a.contentClassName, contentStyle = _a.contentStyle;
			return h(import_react$39.Fragment, null, h("div", {
				className: classNames(prefixCls + "-header", headerClassName),
				style: headerStyle
			}, headerAction && h("div", {
				className: classNames(prefixCls + "-header-action"),
				onClick: onClickHeaderAction
			}, headerAction), title && h("div", { className: classNames(prefixCls + "-header-title") }, title), h("div", {
				className: classNames(prefixCls + "-header-close", closeClassName),
				style: closeStyle,
				onClick: onCancel
			})), h("div", {
				className: classNames(prefixCls + "-content", contentClassName),
				style: contentStyle
			}, content), primaryAction && h("div", {
				className: classNames(prefixCls + "-footer", footerClassName),
				style: footerStyle
			}, h("div", {
				className: classNames(prefixCls + "-footer-primary-action"),
				onClick: onClickPrimaryAction
			}, typeof primaryAction === "string" ? h(Button_default, {
				type: "primary",
				size: "large"
			}, primaryAction) : primaryAction), secondaryAction && h("div", {
				className: classNames(prefixCls + "-footer-secondary-action"),
				onClick: onClickSecondaryAction
			}, secondaryAction)));
		};
		ActionSheet.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return ActionSheet;
	}(import_react$39.Component);
	ActionSheet.defaultProps = {
		prefixCls: "dui-m-actionsheet",
		onClickAction: emptyFn,
		onCancel: emptyFn,
		options: [],
		cancelText: i18n("cancel"),
		type: "basic",
		mask: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/ActionSheet/show.js
var show_default$3;
var init_show$3 = __esmMin((() => {
	init_ActionSheet$1();
	init_show$5();
	init_helper();
	show_default$3 = wrapWithConfigDefaults(function(config) {
		config.onClickMask = config.onClickMask || config.onCancel;
		return showWithTransition({
			Component: ActionSheet,
			transitionDuration: 200,
			autoClose: false,
			props: config,
			injectClosePropNames: [
				"onCancel",
				"onClickAction",
				"onClickHeaderAction",
				"onClickPrimaryAction",
				"onClickSecondaryAction",
				"onClickMask"
			],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/ActionSheet/index.js
var ActionSheet_default;
var init_ActionSheet = __esmMin((() => {
	init_style();
	init_show$3();
	init_ActionSheet$1();
	init_Item();
	injectStyle("components/ActionSheet/style/index.css", "@-webkit-keyframes dui-m-actionsheet-slide-in{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes dui-m-actionsheet-slide-in{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes dui-m-actionsheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-actionsheet-fade-in{0%{opacity:0}to{opacity:1}}[data-duim-1-9-0~=\"dui-m-actionsheet\"]{-webkit-box-sizing:border-box;box-sizing:border-box;list-style:none;margin:0;position:absolute;bottom:0;left:0;width:100%;background:var(--bg-lv3-default,#fff);-webkit-animation:dui-m-actionsheet-slide-in .2s ease-out;animation:dui-m-actionsheet-slide-in .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:16px 16px 0 0;overflow:hidden;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards;-webkit-animation-delay:10ms;animation-delay:10ms;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;padding:0 0 env(safe-area-inset-bottom);max-height:calc(100vh - 142px);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-shadow:0 8px 32px rgba(0,0,0,.16);box-shadow:0 8px 32px rgba(0,0,0,.16);pointer-events:auto}[data-duim-1-9-0~=\"dui-m-actionsheet-hidden\"]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:hidden}[data-duim-1-9-0~=\"dui-m-actionsheet-container\"]{position:fixed;z-index:10001;left:0;top:0;width:100%;height:100%}[data-duim-1-9-0~=\"dui-m-actionsheet-container-no-mask\"]{pointer-events:none}[data-duim-1-9-0~=\"dui-m-actionsheet-mask\"]{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);-webkit-animation:dui-m-actionsheet-fade-in .2s linear;animation:dui-m-actionsheet-fade-in .2s linear;-webkit-transition:all .2s linear;transition:all .2s linear}[data-duim-1-9-0~=\"dui-m-actionsheet-mask-hidden\"]{opacity:0;visibility:hidden}[data-duim-1-9-0~=\"dui-m-actionsheet-cancel\"]{margin-top:10px;position:relative}[data-duim-1-9-0~=\"dui-m-actionsheet-cancel\"]:after{content:\"\";display:block;width:100%;height:10px;position:absolute;top:-10px;left:0;background:var(--bg-lv4-medium,#f3f5f7);pointer-events:none}[data-duim-1-9-0~=\"dui-m-actionsheet-options\"]{max-height:425px;overflow:auto}[data-duim-1-9-0~=\"dui-m-actionsheet-header\"],[data-duim-1-9-0~=\"dui-m-actionsheet-item-container\"]{display:-webkit-box;display:-webkit-flex;display:flex;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:56px}[data-duim-1-9-0~=\"dui-m-actionsheet-header\"]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:16px 16px 15px;border-bottom:1px solid var(--border-medium,rgba(0,0,0,.08));font-size:17px}[data-duim-1-9-0~=\"dui-m-actionsheet-header-action\"]{position:absolute;left:16px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:var(--text-link,#175ceb)}[data-duim-1-9-0~=\"dui-m-actionsheet-header-action\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-actionsheet-header-title\"]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-weight:500;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-actionsheet-header-close\"]{position:absolute;right:16px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg clip-path='url(%23A)'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23334d66' fill-opacity='.06'/%3E%3Cpath fill-rule='evenodd' d='M8.283 7.227L7.222 8.288 10.935 12l-3.712 3.712 1.061 1.061 3.712-3.712 3.712 3.712 1.061-1.061L13.056 12l3.712-3.712-1.061-1.061-3.712 3.712-3.712-3.712z' fill-opacity='.48'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='A'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E\");width:24px;height:24px;background-size:contain;background-repeat:no-repeat;background-position:50%;-webkit-filter:var(--duim-invert-filter,none);filter:var(--duim-invert-filter,none)}[data-duim-1-9-0~=\"dui-m-actionsheet-header-close\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-actionsheet-content\"]{width:100%;overflow:auto}[data-duim-1-9-0~=\"dui-m-actionsheet-footer\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}[data-duim-1-9-0~=\"dui-m-actionsheet-footer-primary-action\"] [data-duim-1-9-0~=\"dui-m-button\"]{min-width:200px}[data-duim-1-9-0~=\"dui-m-actionsheet-footer-primary-action\"]{margin:24px}[data-duim-1-9-0~=\"dui-m-actionsheet-footer-secondary-action\"]{color:var(--text-link,#175ceb);font-size:14px;line-height:20px;margin-bottom:24px}[data-duim-1-9-0~=\"dui-m-actionsheet-footer-secondary-action\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]{background:var(--bg-lv3-default,#fff);color:var(--text-ultrastrong,rgba(0,0,0,.9));position:relative}[data-duim-1-9-0~=\"dui-m-actionsheet-item-container\"]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:16px 30px}[data-duim-1-9-0~=\"dui-m-actionsheet-item-container-with-desc\"]{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin-left:30px;min-height:72px;padding:14px 30px 14px 0}[data-duim-1-9-0~=\"dui-m-actionsheet-item-container-selectable\"]{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin-left:52px;padding-right:14px;padding-left:0}[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]:not([data-duim-1-9-0~=\"dui-m-actionsheet-cancel\"]):not(:first-child)>[data-duim-1-9-0~=\"dui-m-actionsheet-item-container\"]:before{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);top:0;left:0}[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]:not([data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"]):active{background:var(--border-weak,rgba(0,0,0,.04))}[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]:not([data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"]):active+[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]>[data-duim-1-9-0~=\"dui-m-actionsheet-item-container\"]:before,[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]:not([data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"]):active>[data-duim-1-9-0~=\"dui-m-actionsheet-item-container\"]:before{visibility:hidden}[data-duim-1-9-0~=\"dui-m-actionsheet-item-title\"]{font-size:17px}[data-duim-1-9-0~=\"dui-m-actionsheet-item-desc\"]{font-size:14px;color:var(--text-weak,rgba(0,0,0,.26))}[data-duim-1-9-0~=\"dui-m-actionsheet-item-icon\"],[data-duim-1-9-0~=\"dui-m-actionsheet-item-selected\"]:after{position:absolute;width:24px;height:24px;top:0;bottom:0;margin:auto;background-size:contain;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-actionsheet-item-icon\"],[data-duim-1-9-0~=\"dui-m-actionsheet-item\"]:not([data-duim-1-9-0~=\"dui-m-actionsheet-item-with-icon\"])[data-duim-1-9-0~=\"dui-m-actionsheet-item-selected\"]:after{left:16px}[data-duim-1-9-0~=\"dui-m-actionsheet-item-selected\"]:after{content:\"\";display:block;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M19.138 40.18l3.446-3.446.804-.797-.003-.004 19.796-19.795-4.243-4.243-19.795 19.796-9.898-9.897L5 26.042 19.138 40.18z' fill='%231e6fff' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-actionsheet-item-with-icon\"][data-duim-1-9-0~=\"dui-m-actionsheet-item-selected\"]:after{right:16px}[data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"] [data-duim-1-9-0~=\"dui-m-actionsheet-item-desc\"],[data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"] [data-duim-1-9-0~=\"dui-m-actionsheet-item-icon\"],[data-duim-1-9-0~=\"dui-m-actionsheet-item-disabled\"] [data-duim-1-9-0~=\"dui-m-actionsheet-item-title\"]{opacity:.3}[data-duim-1-9-0~=\"dui-m-actionsheet-option-title-main\"]{opacity:1!important;color:var(--text-medium,rgba(0,0,0,.56));font-size:14px}");
	ActionSheet.show = show_default$3;
	ActionSheet.Item = Item;
	ActionSheet_default = ActionSheet;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Checkbox/Checkbox.js
var import_react$38, Checkbox;
var init_Checkbox$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	Checkbox = function(_super) {
		__extends(Checkbox, _super);
		function Checkbox() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { checked: Boolean(_this.props.defaultChecked) };
			_this.handleChange = function(e) {
				var props = _this.props;
				if (props.disabled) return;
				if (!("checked" in props)) _this.setState({ checked: e.target.checked });
				props.onChange(e.target.checked, {
					target: __assign(__assign({}, props), { checked: e.target.checked }),
					stopPropagation: e.stopPropagation.bind(e),
					preventDefault: e.preventDefault.bind(e),
					nativeEvent: e.nativeEvent
				});
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, children = _c.children, disabled = _c.disabled, iconClassName = _c.iconClassName, iconStyle = _c.iconStyle, labelClassName = _c.labelClassName, labelStyle = _c.labelStyle, hollow = _c.hollow, labelClickable = _c.labelClickable, shape = _c.shape, fillType = _c.fillType, rest = __rest(_c, [
					"prefixCls",
					"className",
					"style",
					"children",
					"disabled",
					"iconClassName",
					"iconStyle",
					"labelClassName",
					"labelStyle",
					"hollow",
					"labelClickable",
					"shape",
					"fillType"
				]);
				var checked = "checked" in _this.props ? _this.props.checked : _this.state.checked;
				var classes = classNames(prefixCls, className, prefixCls + "-" + (hollow ? "hollow" : "normal"), prefixCls + "-" + fillType, (_a = {}, _a[prefixCls + "-checked"] = checked, _a[prefixCls + "-disabled"] = disabled, _a));
				var inputClasses = classNames(prefixCls + "-input", (_b = {}, _b[prefixCls + "-input-full"] = labelClickable, _b));
				var iconClasses = classNames(prefixCls + "-icon", prefixCls + "-icon-" + shape, iconClassName);
				var labelClasses = classNames(prefixCls + "-label", labelClassName);
				return h("div", {
					className: classes,
					style
				}, h("input", __assign({}, rest, {
					type: "checkbox",
					className: inputClasses,
					onChange: _this.handleChange,
					disabled
				})), h("span", {
					className: iconClasses,
					style: iconStyle
				}), h("div", {
					className: labelClasses,
					style: labelStyle
				}, children));
			};
			return _this;
		}
		Checkbox.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Checkbox;
	}(import_react$38.Component);
	Checkbox.defaultProps = {
		prefixCls: "dui-m-checkbox",
		onChange: emptyFn,
		disabled: false,
		hollow: false,
		labelClickable: true,
		shape: "square",
		fillType: "tick"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Checkbox/Group.js
var import_react$37, import_prop_types$1, Group;
var init_Group = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types());
	init_util();
	init_helper();
	init_Checkbox$1();
	init_theme();
	Group = function(_super) {
		__extends(Group, _super);
		function Group() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { values: _this.props.defaultValues || [] };
			_this.handleSingleChange = function(checked, e) {
				if (_this.props.disabled) return;
				var checkedValues = _this.state.values;
				var newValues = [];
				if (checkedValues.indexOf(e.target.value) >= 0 && !checked) {
					newValues = checkedValues.filter(function(v) {
						return v !== e.target.value;
					});
					_this.setState({ values: newValues });
					_this.props.onChange(newValues, e);
				} else if (checkedValues.indexOf(e.target.value) === -1 && checked) {
					newValues = checkedValues.concat(e.target.value);
					_this.setState({ values: newValues });
					_this.props.onChange(newValues, e);
				}
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, itemStyle = _a.itemStyle;
				return h("div", {
					className: classNames(prefixCls, className),
					style
				}, renderChildren(_this.props, _this.state.values, _this.handleSingleChange, Checkbox, itemStyle));
			};
			return _this;
		}
		Group.getDerivedStateFromProps = function(props, state) {
			if ("values" in props) return { values: props.values };
			return null;
		};
		Group.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Group;
	}(import_react$37.Component);
	Group.defaultProps = {
		prefixCls: "dui-m-checkbox-group",
		disabled: false,
		onChange: emptyFn
	};
	Group.propTypes = {
		prefixCls: import_prop_types$1.string,
		style: import_prop_types$1.object,
		className: import_prop_types$1.string,
		options: import_prop_types$1.array,
		disabled: import_prop_types$1.bool,
		values: import_prop_types$1.array,
		children: import_prop_types$1.node,
		defaultValues: import_prop_types$1.array,
		onChange: import_prop_types$1.func,
		itemStyle: import_prop_types$1.object
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Checkbox/index.js
var Checkbox_default;
var init_Checkbox = __esmMin((() => {
	init_style();
	init_Checkbox$1();
	init_Group();
	injectStyle("components/Checkbox/style/index.css", "[data-duim-1-9-0~=\"dui-m-checkbox\"]{position:relative;padding-left:30px;font-size:16px;line-height:22px;-webkit-tap-highlight-color:transparent;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-checkbox-disabled\"]{pointer-events:none}[data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{position:absolute;z-index:1;left:0;top:1px;width:20px;height:20px;border:1px solid var(--border-ultrastrong,rgba(0,0,0,.16));-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-checkbox-icon-square\"]{border-radius:1px}[data-duim-1-9-0~=\"dui-m-checkbox-icon-circle\"]{border-radius:50%}[data-duim-1-9-0~=\"dui-m-checkbox-input\"]:active+[data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{border-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-checkbox-normal\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{background-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{background-color:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"],[data-duim-1-9-0~=\"dui-m-checkbox-checked\"]:active [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{border-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{content:\"\";display:block}[data-duim-1-9-0~=\"dui-m-checkbox-tick\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{width:100%;height:100%;background-size:12px 10px;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-checkbox-dash\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{width:10px;height:2px}[data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon-circle\"]:after{background-size:11px 9px}[data-duim-1-9-0~=\"dui-m-checkbox-normal\"][data-duim-1-9-0~=\"dui-m-checkbox-tick\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='18'%3E%3Cpath d='M8.432 12.857L21.405 0 24 2.57 8.432 18 0 9.643l2.595-2.57z' fill='%23fff' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-tick\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='18'%3E%3Cpath d='M8.432 12.857L21.405 0 24 2.57 8.432 18 0 9.643l2.595-2.57z' fill='%231E6FFF' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-checkbox-normal\"][data-duim-1-9-0~=\"dui-m-checkbox-dash\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-dash\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-checkbox-disabled\"] [data-duim-1-9-0~=\"dui-m-checkbox-label\"]{opacity:.36}[data-duim-1-9-0~=\"dui-m-checkbox-disabled\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"],[data-duim-1-9-0~=\"dui-m-checkbox-disabled\"]:active [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{border-color:var(--border-weak,rgba(0,0,0,.04))}[data-duim-1-9-0~=\"dui-m-checkbox-normal\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{background:var(--border-weak,rgba(0,0,0,.04));border-color:transparent}[data-duim-1-9-0~=\"dui-m-checkbox-normal\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='18'%3E%3Cpath d='M8.432 12.857L21.405 0 24 2.57 8.432 18 0 9.643l2.595-2.57z' fill='%23fff' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-tick\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{background:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-tick\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='18'%3E%3Cpath d='M8.432 12.857L21.405 0 24 2.57 8.432 18 0 9.643l2.595-2.57z' opacity='.08' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-dash\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]{background:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-checkbox-hollow\"][data-duim-1-9-0~=\"dui-m-checkbox-disabled\"][data-duim-1-9-0~=\"dui-m-checkbox-dash\"][data-duim-1-9-0~=\"dui-m-checkbox-checked\"] [data-duim-1-9-0~=\"dui-m-checkbox-icon\"]:after{background:var(--border-weak,rgba(0,0,0,.04))}[data-duim-1-9-0~=\"dui-m-checkbox-input\"]{position:absolute;z-index:2;margin:0;opacity:0;left:0;top:0;width:20px;height:22px}[data-duim-1-9-0~=\"dui-m-checkbox-input-full\"]{width:100%;height:100%}");
	Checkbox.Group = Group;
	Checkbox_default = Checkbox;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Snackbar/queue.js
function getVisibleSnackbars() {
	var host = document.body;
	host.__dui_visible_snackbars__ = host.__dui_visible_snackbars__ || [];
	return host.__dui_visible_snackbars__;
}
function getIndexOf(instance) {
	return getVisibleSnackbars().findIndex(function(elem) {
		return elem.instance === instance;
	});
}
function findReplaceableSnackbar(newInstance) {
	var visibleSnackbars = getVisibleSnackbars();
	var id = newInstance.props.id;
	if (id) {
		var sameIdIndex = visibleSnackbars.findIndex(function(elem) {
			return elem.instance.props.id === id;
		});
		if (sameIdIndex >= 0) return visibleSnackbars[sameIdIndex];
	}
	var autoCloseIndex = visibleSnackbars.findIndex(function(elem) {
		return elem.instance.props.autoClose;
	});
	if (autoCloseIndex >= 0) return visibleSnackbars[autoCloseIndex];
	return null;
}
function updateVisibleSnackbars(instance) {
	var visible = instance.props.visible;
	var index = getIndexOf(instance);
	var visibleSnackbars = getVisibleSnackbars();
	if (visible && index === -1) {
		var replacedSnackbar = findReplaceableSnackbar(instance);
		replacedSnackbar === null || replacedSnackbar === void 0 || replacedSnackbar.instance.handleClose();
		visibleSnackbars.push({ instance });
		var event_1 = new CustomEvent("duim-snackbar-show", { detail: instance.props });
		document.dispatchEvent(event_1);
	}
	if (!visible && index !== -1) visibleSnackbars.splice(index, 1);
}
function closeAll(force) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		var _b = _a.instance.props, autoClose = _b.autoClose, closable = _b.closable;
		return force || autoClose || closable;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function closeById(id) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		return _a.instance.props.id === id;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function hasVisibleInstances() {
	var _a;
	return Boolean((_a = document.body.__dui_visible_snackbars__) === null || _a === void 0 ? void 0 : _a.length);
}
var init_queue = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Snackbar/Snackbar.js
function isActionArray(action) {
	return Array.isArray(action) && action.length > 0 && action[0].text;
}
var import_react$36, import_react_dom$3, Snackbar;
var init_Snackbar$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$3 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_keepDom();
	init_Spin();
	init_theme();
	init_show$5();
	init_preventScrollPenetrate();
	init_queue();
	init_Button();
	Snackbar = function(_super) {
		__extends(Snackbar, _super);
		function Snackbar() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.prevTouchScreenY = 0;
			_this.handleTouchStart = function(e) {
				var touch = _this.getValidTouch(e);
				if (!touch) return;
				_this.prevTouchScreenY = touch.screenY;
			};
			_this.handleTouchMove = function(e) {
				var touch = _this.getValidTouch(e);
				if (!touch) return;
				if (_this.prevTouchScreenY - touch.screenY > 8) return _this.context();
				_this.prevTouchScreenY = touch.screenY;
			};
			_this.handleClickAction = function() {
				_this.props.onClickAction();
				_this.handleClose();
			};
			_this.handleClickClose = function() {
				_this.props.onClickClose();
				_this.handleClose();
			};
			_this.handleClose = function() {
				_this.props.onClose();
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, children = _b.children, message = _b.message, placement = _b.placement, visible = _b.visible, type = _b.type, zIndex = _b.zIndex, testId = _b.testId, closable = _b.closable;
				var classes = classNames(prefixCls, className, prefixCls + "-" + placement, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-override-icon"] = _this.renderUserSetIcon(classNames), _a));
				var messageClasses = classNames(prefixCls + "-message");
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom$3.createPortal(h(PreventScrollPenetrateContainer, {
					className: classes,
					style: __assign({ zIndex }, style),
					onTouchStart: _this.handleTouchStart,
					onTouchMove: _this.handleTouchMove,
					"data-testid": testId
				}, _this.renderIcon(classNames), h("span", { className: messageClasses }, children || message), _this.renderAction(classNames), closable && h("div", {
					className: classNames(prefixCls + "-close"),
					onClick: _this.handleClickClose
				})), document.body);
			};
			return _this;
		}
		Snackbar.prototype.componentDidMount = function() {
			updateVisibleSnackbars(this);
		};
		Snackbar.prototype.componentDidUpdate = function() {
			updateVisibleSnackbars(this);
		};
		Snackbar.prototype.getValidTouch = function(e) {
			var _a = this.props, autoClose = _a.autoClose;
			if (!_a.visible || !autoClose) return null;
			return e.touches.item(0);
		};
		Snackbar.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Snackbar.prototype.renderAction = function(classNames) {
			var _this = this;
			var _a = this.props, prefixCls = _a.prefixCls, action = _a.action;
			if (!action) return null;
			if (isActionArray(action)) return h("span", { className: classNames(prefixCls + "-actions") }, action.map(function(a, index) {
				return h(Button_default, {
					key: index,
					className: classNames(prefixCls + "-action"),
					onClick: function() {
						var _a;
						(_a = a.onClick) === null || _a === void 0 || _a.call(a);
						_this.handleClose();
					}
				}, a.text);
			}));
			return h(Button_default, {
				className: classNames(prefixCls + "-action"),
				onClick: this.handleClickAction
			}, action);
		};
		Snackbar.prototype.renderUserSetIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, type = _a.type, icon = _a.icon;
			if (!icon) return null;
			if (import_react$36.isValidElement(icon)) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon);
			if (typeof icon === "object" && icon[type]) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon[type]);
			return null;
		};
		Snackbar.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, spinType = _a.spinType, type = _a.type;
			var userSetIcon = this.renderUserSetIcon(classNames);
			if (userSetIcon) return userSetIcon;
			return type === "loading" ? h(Spin, {
				type: spinType,
				className: classNames(prefixCls + "-loading-indicator"),
				circleClassName: classNames(prefixCls + "-loading-indicator-circle")
			}) : null;
		};
		Snackbar.contextType = ShowCloseContext;
		return Snackbar;
	}(import_react$36.Component);
	Snackbar.defaultProps = {
		prefixCls: "dui-m-snackbar",
		placement: "top",
		onClickAction: emptyFn,
		type: "info",
		spinType: "primary",
		closable: false,
		onClose: emptyFn,
		onClickClose: emptyFn
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Snackbar/show.js
var show_default$2;
var init_show$2 = __esmMin((() => {
	init_Snackbar$1();
	init_show$5();
	init_helper();
	show_default$2 = wrapWithConfigDefaults(function(config) {
		config.autoClose = typeof config.autoClose === "boolean" ? config.autoClose : true;
		return showWithTransition({
			Component: Snackbar,
			transitionDuration: 200,
			autoClose: config.autoClose,
			props: config,
			injectClosePropNames: ["onClickAction", "onClose"],
			deepInjectClosePaths: isActionArray(config.action) ? ["action.onClick"] : [],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Snackbar/index.js
var Snackbar_default;
var init_Snackbar = __esmMin((() => {
	init_style();
	init_Snackbar$1();
	init_show$2();
	init_queue();
	injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}[data-duim-1-9-0~=\"dui-m-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;left:16px;right:16px;height:52px;padding:0 8px 0 12px;font-size:14px;color:var(--text-ultrastrong,rgba(0,0,0,.9));border-radius:8px;border:1px solid var(--border-weak,rgba(0,0,0,.04));-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);background-color:var(--bg-lv3-default,#fff);-webkit-box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08);box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08)}[data-duim-1-9-0~=\"dui-m-snackbar\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-duim-1-9-0~=\"dui-m-snackbar-icon-container\"],[data-duim-1-9-0~=\"dui-m-snackbar\"]:before{width:24px;height:24px;margin-right:4px}[data-duim-1-9-0~=\"dui-m-snackbar-override-icon\"]:before{display:none}[data-duim-1-9-0~=\"dui-m-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%231e6fff'/%3E%3Cpath fill='%23fff' d='M26 21v12h2v2h-8v-2h2V23h-2v-2h6zm-2-8a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%2304dd7d'/%3E%3Cpath fill='%23fff' d='M17.93 22l3.95 3.95 9.9-9.9 2.828 2.83L21.88 31.607l-6.778-6.78L17.93 22z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-error\"]:before,[data-duim-1-9-0~=\"dui-m-snackbar-warning\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%23fb4d3f'/%3E%3Cpath fill='%23fff' d='M24 29a3 3 0 1 1 0 6 3 3 0 1 1 0-6zm3-16l-1 14h-4l-1-14h6z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-loading\"]:before{content:none}[data-duim-1-9-0~=\"dui-m-snackbar-loading-indicator\"]{width:18px;height:18px;margin:0 7px 0 3px}[data-duim-1-9-0~=\"dui-m-snackbar-loading-indicator-circle\"]{border-width:8px}[data-duim-1-9-0~=\"dui-m-snackbar-top\"]{-webkit-animation-name:dui-m-snackbar-slide-in-top;animation-name:dui-m-snackbar-slide-in-top;top:16px;margin-top:env(safe-area-inset-top)}[data-duim-1-9-0~=\"dui-m-snackbar-top\"][data-duim-1-9-0~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}[data-duim-1-9-0~=\"dui-m-snackbar-bottom\"]{-webkit-animation-name:dui-m-snackbar-slide-in-bottom;animation-name:dui-m-snackbar-slide-in-bottom;bottom:16px;margin-bottom:env(safe-area-inset-bottom)}[data-duim-1-9-0~=\"dui-m-snackbar-bottom\"][data-duim-1-9-0~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}[data-duim-1-9-0~=\"dui-m-snackbar-message\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;text-overflow:ellipsis}[data-duim-1-9-0~=\"dui-m-snackbar-action\"]{min-width:0;font-weight:600}[data-duim-1-9-0~=\"dui-m-snackbar-actions\"]>[data-duim-1-9-0~=\"dui-m-snackbar-action\"]:not(:first-child){margin-left:6px}[data-duim-1-9-0~=\"dui-m-snackbar-close\"]{width:24px;height:24px;margin-left:4px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23000' fill-opacity='.16'/%3E%3Cpath fill-rule='evenodd' d='M10.833 10.832a.584.584 0 0 0 .004-.814L8.822 8.002l2.015-2.02a.584.584 0 0 0-.004-.814.58.58 0 0 0-.814-.004L7.999 7.18l-2.02-2.02c-.209-.209-.592-.218-.814.004s-.218.605-.004.818l2.02 2.02-2.02 2.02a.59.59 0 0 0 .004.814.593.593 0 0 0 .814.004l2.02-2.02 2.02 2.015a.58.58 0 0 0 .814-.004z' fill='%23fff'/%3E%3C/svg%3E\");background-size:16px;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-snackbar-close\"]:active{opacity:.5}");
	Snackbar.show = show_default$2;
	Snackbar.closeAll = closeAll;
	Snackbar.closeById = closeById;
	Snackbar.hasVisibleInstances = hasVisibleInstances;
	Snackbar_default = Snackbar;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-soft-keyboard@1.15.3/node_modules/@tencent/docs-soft-keyboard/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, e) {
		"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("SoftKeyboard", [], e) : "object" == typeof exports ? exports.SoftKeyboard = e() : t.SoftKeyboard = e();
	})(window, (function() {
		return function(t) {
			var e = {};
			function n(o) {
				if (e[o]) return e[o].exports;
				var i = e[o] = {
					i: o,
					l: !1,
					exports: {}
				};
				return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
			}
			return n.m = t, n.c = e, n.d = function(t, e, o) {
				n.o(t, e) || Object.defineProperty(t, e, {
					enumerable: !0,
					get: o
				});
			}, n.r = function(t) {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
			}, n.t = function(t, e) {
				if (1 & e && (t = n(t)), 8 & e) return t;
				if (4 & e && "object" == typeof t && t && t.__esModule) return t;
				var o = Object.create(null);
				if (n.r(o), Object.defineProperty(o, "default", {
					enumerable: !0,
					value: t
				}), 2 & e && "string" != typeof t) for (var i in t) n.d(o, i, function(e) {
					return t[e];
				}.bind(null, i));
				return o;
			}, n.n = function(t) {
				var e = t && t.__esModule ? function() {
					return t.default;
				} : function() {
					return t;
				};
				return n.d(e, "a", e), e;
			}, n.o = function(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}, n.p = "", n(n.s = 3);
		}([
			function(t, e, n) {
				"use strict";
				Object.defineProperty(e, "__esModule", { value: !0 }), e.isAndroid = /android|adr/i.test(navigator.userAgent), e.isIOS = /(iphone|ipad|ipod)/i.test(navigator.userAgent), e.isHarmony = /openharmony/i.test(navigator.userAgent), e.isTimOrQQFamily = /qq|(tim|mit)\//i.test(navigator.userAgent), e.isQQMiniProgram = /qq\/|tim/i.test(navigator.userAgent) && /miniprogram|miniapp(?!enable)/i.test(navigator.userAgent), e.isIPadEmulatedMac = /mac os x/i.test(navigator.userAgent) && /version\/\S+ safari\/\S+$/.test(navigator.userAgent) && navigator.maxTouchPoints > 1, e.isVersionAboveOrEqual = function(t, e) {
					var n, o, i;
					try {
						var r = null === (n = new RegExp("\\b" + t + "\\/((\\d+)(\\.\\d+)+)").exec(navigator.userAgent)) || void 0 === n ? void 0 : n[1];
						if (!r) return !1;
						for (var s = r.split(".").map(Number), u = e.split(".").map(Number), a = 0; a < Math.max(s.length, u.length); a += 1) {
							var c = null !== (o = s[a]) && void 0 !== o ? o : 0, l = null !== (i = u[a]) && void 0 !== i ? i : 0;
							if (c !== l) return c > l;
						}
						return !0;
					} catch (e) {
						return console.warn("dark-mode", "在 " + navigator.userAgent + " 中查找并判断 " + t + " 的版本号失败", e), !1;
					}
				};
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				});
				Object.defineProperty(e, "__esModule", { value: !0 });
				var r = n(6), s = n(2);
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "BaseDetector", e.isSupported = e.isInitiallySupported(), e.hasDetected = !1, e.internalOnChange = function() {
							e.isSupported = !0, e.hasDetected = !0;
						}, e.on("change", e.internalOnChange), e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						throw Error("BaseDetector::isInitiallySupported should not be called!");
					}, e.prototype.dispose = function() {
						this.isSupported = !1;
					}, Object.defineProperty(e.prototype, "topWindow", {
						get: function() {
							return s.getTopWindow();
						},
						enumerable: !0,
						configurable: !0
					}), e;
				}(r.EventEmitter);
			},
			function(t, e, n) {
				"use strict";
				Object.defineProperty(e, "__esModule", { value: !0 }), e.traverseAncestorWindows = function(t) {
					var e, n = window;
					try {
						for (; n.parent !== n && (null === (e = n.parent) || void 0 === e ? void 0 : e.document);) t(n = n.parent);
					} catch (t) {}
				}, e.getTopWindow = function() {
					var t = window;
					return e.traverseAncestorWindows((function(e) {
						return t = e;
					})), t;
				};
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(4), u = r(n(5)), a = r(n(7)), c = r(n(8)), l = r(n(9)), d = r(n(10)), p = r(n(11)), f = r(n(12)), h = function(t) {
					function e() {
						var n, o, i, r, s = t.call(this) || this;
						s.detectors = [
							new c.default(),
							new d.default(),
							new l.default(),
							new p.default(),
							new u.default(),
							new a.default()
						], s.forceEmitOnFocus = !1, s.heightInViewport = 0, s.heightOutOfViewport = 0, s.scrollFix = f.default, s.initBodyEvent = function() {
							document.body.addEventListener("focusin", s.internalOnWindowFocus);
						}, s.onChange = function(t, e, n) {
							s.emit("detector-change", t);
							var o = s.detectors.find((function(t) {
								return t.hasDetected;
							}));
							o && t !== o || (console.log("SoftKeyboard #" + s.id + " onChange:", t, {
								isSupported: t.isSupported,
								heightInViewport: e,
								heightOutOfViewport: n
							}), null != e && (s.heightInViewport = Math.round(e)), null != n && (s.heightOutOfViewport = Math.round(n)), s.emit("change", s));
						}, s.internalOnWindowFocus = function(t) {
							(null == t ? void 0 : t.target) instanceof HTMLElement && t.target.matches("input,textarea,[contenteditable=\"contenteditable\"],[contenteditable=\"true\"]") && (!s.isSupported && s.forceEmitOnFocus && s.emit("change", s), setTimeout((function() {
								s.supportedDetectors.length && !s.activeDetectors.length && (s.supportedDetectors.forEach((function(t) {
									return t.isSupported = !1;
								})), s.emit("change", s));
							}), 1e3));
						}, s.id = null !== (o = null === (n = window.__softKeyboardInstances) || void 0 === n ? void 0 : n.length) && void 0 !== o ? o : 0, window.__softKeyboardInstances = (null !== (i = window.__softKeyboardInstances) && void 0 !== i ? i : []).concat(s), window.__softKeyboardDisposeAllInstances = e.disposeAll;
						try {
							s.constructorStack = null === (r = Error().stack) || void 0 === r ? void 0 : r.split(/\n\s+/).slice(1).join("\n");
						} catch (t) {}
						return "loading" === document.readyState ? window.addEventListener("load", s.initBodyEvent) : s.initBodyEvent(), s.detectors.forEach((function(t) {
							t.on("change", s.onChange.bind(s, t));
						})), window.addEventListener("beforeunload", (function() {
							return s.dispose();
						})), s;
					}
					return i(e, t), e.disposeAll = function() {
						var t;
						null === (t = window.__softKeyboardInstances) || void 0 === t || t.forEach((function(t) {
							return t.dispose();
						}));
					}, Object.defineProperty(e.prototype, "isSupported", {
						get: function() {
							return !!this.detectors.find((function(t) {
								return t.isSupported;
							}));
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "supportedDetectors", {
						get: function() {
							return this.detectors.filter((function(t) {
								return t.isSupported;
							}));
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "activeDetectors", {
						get: function() {
							return this.detectors.filter((function(t) {
								return t.hasDetected;
							}));
						},
						enumerable: !0,
						configurable: !0
					}), e.prototype.dispose = function() {
						var t, e, n = this;
						this.detectors.forEach((function(t) {
							t.dispose();
						})), null === (t = document.body) || void 0 === t || t.removeEventListener("focusin", this.internalOnWindowFocus), window.__softKeyboardInstances = (null !== (e = window.__softKeyboardInstances) && void 0 !== e ? e : []).filter((function(t) {
							return t !== n;
						}));
					}, e;
				}(s.EventEmitter);
				e.SoftKeyboard = h;
				e.default = new h();
			},
			function(t, e, n) {
				"use strict";
				var o, i = "object" == typeof Reflect ? Reflect : null, r = i && "function" == typeof i.apply ? i.apply : function(t, e, n) {
					return Function.prototype.apply.call(t, e, n);
				};
				o = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(t) {
					return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
				} : function(t) {
					return Object.getOwnPropertyNames(t);
				};
				var s = Number.isNaN || function(t) {
					return t != t;
				};
				function u() {
					u.init.call(this);
				}
				t.exports = u, u.EventEmitter = u, u.prototype._events = void 0, u.prototype._eventsCount = 0, u.prototype._maxListeners = void 0;
				var a = 10;
				function c(t) {
					if ("function" != typeof t) throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof t);
				}
				function l(t) {
					return void 0 === t._maxListeners ? u.defaultMaxListeners : t._maxListeners;
				}
				function d(t, e, n, o) {
					var i, r, s, u;
					if (c(n), void 0 === (r = t._events) ? (r = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== r.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), r = t._events), s = r[e]), void 0 === s) s = r[e] = n, ++t._eventsCount;
					else if ("function" == typeof s ? s = r[e] = o ? [n, s] : [s, n] : o ? s.unshift(n) : s.push(n), (i = l(t)) > 0 && s.length > i && !s.warned) {
						s.warned = !0;
						var a = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
						a.name = "MaxListenersExceededWarning", a.emitter = t, a.type = e, a.count = s.length, u = a, console && console.warn && console.warn(u);
					}
					return t;
				}
				function p() {
					if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
				}
				function f(t, e, n) {
					var o = {
						fired: !1,
						wrapFn: void 0,
						target: t,
						type: e,
						listener: n
					}, i = p.bind(o);
					return i.listener = n, o.wrapFn = i, i;
				}
				function h(t, e, n) {
					var o = t._events;
					if (void 0 === o) return [];
					var i = o[e];
					return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function(t) {
						for (var e = new Array(t.length), n = 0; n < e.length; ++n) e[n] = t[n].listener || t[n];
						return e;
					}(i) : y(i, i.length);
				}
				function v(t) {
					var e = this._events;
					if (void 0 !== e) {
						var n = e[t];
						if ("function" == typeof n) return 1;
						if (void 0 !== n) return n.length;
					}
					return 0;
				}
				function y(t, e) {
					for (var n = new Array(e), o = 0; o < e; ++o) n[o] = t[o];
					return n;
				}
				Object.defineProperty(u, "defaultMaxListeners", {
					enumerable: !0,
					get: function() {
						return a;
					},
					set: function(t) {
						if ("number" != typeof t || t < 0 || s(t)) throw new RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + t + ".");
						a = t;
					}
				}), u.init = function() {
					void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
				}, u.prototype.setMaxListeners = function(t) {
					if ("number" != typeof t || t < 0 || s(t)) throw new RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + t + ".");
					return this._maxListeners = t, this;
				}, u.prototype.getMaxListeners = function() {
					return l(this);
				}, u.prototype.emit = function(t) {
					for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
					var o = "error" === t, i = this._events;
					if (void 0 !== i) o = o && void 0 === i.error;
					else if (!o) return !1;
					if (o) {
						var s;
						if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
						var u = /* @__PURE__ */ new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
						throw u.context = s, u;
					}
					var a = i[t];
					if (void 0 === a) return !1;
					if ("function" == typeof a) r(a, this, e);
					else {
						var c = a.length, l = y(a, c);
						for (n = 0; n < c; ++n) r(l[n], this, e);
					}
					return !0;
				}, u.prototype.addListener = function(t, e) {
					return d(this, t, e, !1);
				}, u.prototype.on = u.prototype.addListener, u.prototype.prependListener = function(t, e) {
					return d(this, t, e, !0);
				}, u.prototype.once = function(t, e) {
					return c(e), this.on(t, f(this, t, e)), this;
				}, u.prototype.prependOnceListener = function(t, e) {
					return c(e), this.prependListener(t, f(this, t, e)), this;
				}, u.prototype.removeListener = function(t, e) {
					var n, o, i, r, s;
					if (c(e), void 0 === (o = this._events)) return this;
					if (void 0 === (n = o[t])) return this;
					if (n === e || n.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete o[t], o.removeListener && this.emit("removeListener", t, n.listener || e));
					else if ("function" != typeof n) {
						for (i = -1, r = n.length - 1; r >= 0; r--) if (n[r] === e || n[r].listener === e) {
							s = n[r].listener, i = r;
							break;
						}
						if (i < 0) return this;
						0 === i ? n.shift() : function(t, e) {
							for (; e + 1 < t.length; e++) t[e] = t[e + 1];
							t.pop();
						}(n, i), 1 === n.length && (o[t] = n[0]), void 0 !== o.removeListener && this.emit("removeListener", t, s || e);
					}
					return this;
				}, u.prototype.off = u.prototype.removeListener, u.prototype.removeAllListeners = function(t) {
					var e, n, o;
					if (void 0 === (n = this._events)) return this;
					if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[t]), this;
					if (0 === arguments.length) {
						var i, r = Object.keys(n);
						for (o = 0; o < r.length; ++o) "removeListener" !== (i = r[o]) && this.removeAllListeners(i);
						return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
					}
					if ("function" == typeof (e = n[t])) this.removeListener(t, e);
					else if (void 0 !== e) for (o = e.length - 1; o >= 0; o--) this.removeListener(t, e[o]);
					return this;
				}, u.prototype.listeners = function(t) {
					return h(this, t, !0);
				}, u.prototype.rawListeners = function(t) {
					return h(this, t, !1);
				}, u.listenerCount = function(t, e) {
					return "function" == typeof t.listenerCount ? t.listenerCount(e) : v.call(t, e);
				}, u.prototype.listenerCount = v, u.prototype.eventNames = function() {
					return this._eventsCount > 0 ? o(this._events) : [];
				};
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(0);
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "TencentDocsAppDetector", e.isKeyboardVisible = !1, e.heightToWebViewTop = window.innerHeight, e.onKeyboardHeightChange = function(t, n, o, i) {
							if (e.isKeyboardVisible = t, e.heightToWebViewTop = i, e.isKeyboardVisible) {
								var r = window.innerHeight - Math.round(e.heightToWebViewTop / window.devicePixelRatio);
								e.emit("change", r, 0);
							} else e.emit("change", 0, 0);
						}, e.onResize = function() {
							if (e.isKeyboardVisible) {
								var t = window.innerHeight - Math.round(e.heightToWebViewTop / window.devicePixelRatio);
								e.emit("change", t, 0);
							}
						}, e.isInitiallySupported() ? (window.__softKeyboardDocsAppDetectorCallback = e.onKeyboardHeightChange, window.mqq.invoke("docx", "setSoftKeyboardVisibilityCallback", { callback: "__softKeyboardDocsAppDetectorCallback" }), window.addEventListener("resize", e.onResize), e) : e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						return s.isAndroid && s.isVersionAboveOrEqual("TencentDocs", "2.21.5") && !s.isVersionAboveOrEqual("TencentDocs", "2.22.0") && !!window.mqq;
					}, e.prototype.dispose = function() {
						t.prototype.dispose.call(this), delete window.__softKeyboardDocsAppDetectorCallback;
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				Object.defineProperty(e, "__esModule", { value: !0 });
				e.EventEmitter = function() {
					function t() {
						this.listenersMap = {};
					}
					return t.prototype.dispose = function() {
						this.listenersMap = {};
					}, t.prototype.on = function(t, e) {
						var n;
						this.listenersMap[t] = (null !== (n = this.listenersMap[t]) && void 0 !== n ? n : []).concat([e]);
					}, t.prototype.off = function(t, e) {
						var n;
						this.listenersMap[t] = (null !== (n = this.listenersMap[t]) && void 0 !== n ? n : []).filter((function(t) {
							return t !== e;
						}));
					}, t.prototype.once = function(t, e) {
						var n = this;
						this.on(t, (function() {
							for (var o = [], i = 0; i < arguments.length; i++) o[i] = arguments[i];
							n.off(t, e), e.apply(void 0, o);
						}));
					}, t.prototype.emit = function(t) {
						for (var e, n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
						null === (e = this.listenersMap[t]) || void 0 === e || e.forEach((function(t) {
							try {
								t.apply(void 0, n);
							} catch (t) {
								console.error("Error in soft-keyboard event:", t);
							}
						}));
					}, t;
				}();
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "IFrameDetector", e.height = 0, e.handleMessage = function(t) {
							var n, o, i;
							"soft_keyboard_change" === (null === (n = t.data) || void 0 === n ? void 0 : n.name) && e.emit("change", null === (o = t.data) || void 0 === o ? void 0 : o.heightInViewport, null === (i = t.data) || void 0 === i ? void 0 : i.heightOutOfViewport);
						}, e.topWindow.addEventListener("message", e.handleMessage), window.addEventListener("beforeunload", (function() {
							return e.dispose();
						})), e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						return window.top !== window;
					}, e.prototype.dispose = function() {
						t.prototype.dispose.call(this), this.topWindow.removeEventListener("message", this.handleMessage);
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(0);
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "QBrowserDetector", e.height = 0, e.onQBrowserKeyboardHeightChange = function(t) {
							e.height = parseInt(t.height, 10), e.emit("change", e.height, 0);
						}, document.addEventListener("qbrowserKeyboardHeightChange", e.onQBrowserKeyboardHeightChange), e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						return s.isIOS && s.isTimOrQQFamily && !s.isQQMiniProgram;
					}, e.prototype.dispose = function() {
						t.prototype.dispose.call(this), document.removeEventListener("qbrowserKeyboardHeightChange", this.onQBrowserKeyboardHeightChange);
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(0);
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "VirtualKeyboardDetector", e.lastVirtualKeyboardHeight = 0, e.onVirtualKeyboardChange = function(t) {
							t.target.boundingRect.height !== e.lastVirtualKeyboardHeight && (e.lastVirtualKeyboardHeight = t.target.boundingRect.height, e.emit("change", e.lastVirtualKeyboardHeight, 0));
						}, e.isInitiallySupported() ? (navigator.virtualKeyboard.overlaysContent = !0, e.topWindow.navigator.virtualKeyboard.addEventListener("geometrychange", e.onVirtualKeyboardChange), e) : e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						var t;
						return "virtualKeyboard" in this.topWindow.navigator && "function" == typeof (null === (t = this.topWindow.navigator.virtualKeyboard) || void 0 === t ? void 0 : t.addEventListener) && !s.isHarmony;
					}, e.prototype.dispose = function() {
						t.prototype.dispose.call(this), this.isInitiallySupported() && this.topWindow.navigator.virtualKeyboard.removeEventListener("geometrychange", this.onVirtualKeyboardChange);
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(0);
				e.default = function(t) {
					function e() {
						var e, n, o = t.call(this) || this;
						return o.type = "VisualViewportDetector", o.windowWidth = o.topWindow.innerWidth, o.windowMaxHeight = o.topWindow.innerHeight, o.visualViewportHeight = o.windowMaxHeight, o.previousHeightIn = 0, o.previousHeightOut = 0, o.onVisualViewportChange = function(t) {
							var e = o.topWindow, n = e.innerWidth, i = e.innerHeight, r = e.visualViewport;
							o.windowMaxHeight = Math.max(o.windowMaxHeight, i), o.visualViewportHeight = r.height;
							var s = Math.round(o.windowMaxHeight - i);
							(o.windowWidth !== n || i > o.windowMaxHeight) && (o.windowWidth = n, o.windowMaxHeight = i, s = 0);
							var u = Math.round(i - o.visualViewportHeight);
							u > 43 && u <= 44 && (u = 0), !(o.hasDetected || u > 0 || s > 0) || o.previousHeightIn === u && o.previousHeightOut === s || (o.emit("change", u, s), o.previousHeightIn = u, o.previousHeightOut = s);
						}, o.isInitiallySupported() ? (null === (e = o.topWindow.visualViewport) || void 0 === e || e.addEventListener("resize", o.onVisualViewportChange), null === (n = o.topWindow.visualViewport) || void 0 === n || n.addEventListener("scroll", o.onVisualViewportChange), o) : o;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						return (s.isIOS || s.isIPadEmulatedMac) && "visualViewport" in this.topWindow;
					}, e.prototype.dispose = function() {
						var e, n;
						t.prototype.dispose.call(this), this.isInitiallySupported() && (null === (e = this.topWindow.visualViewport) || void 0 === e || e.removeEventListener("resize", this.onVisualViewportChange), null === (n = this.topWindow.visualViewport) || void 0 === n || n.removeEventListener("scroll", this.onVisualViewportChange));
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				var o, i = this && this.__extends || (o = function(t, e) {
					return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
						t.__proto__ = e;
					} || function(t, e) {
						for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					})(t, e);
				}, function(t, e) {
					function n() {
						this.constructor = t;
					}
					o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
				}), r = this && this.__importDefault || function(t) {
					return t && t.__esModule ? t : { default: t };
				};
				Object.defineProperty(e, "__esModule", { value: !0 });
				var s = n(0);
				e.default = function(t) {
					function e() {
						var e = t.call(this) || this;
						return e.type = "WindowResizeDetector", e.windowWidth = e.topWindow.innerWidth, e.windowMaxHeight = e.topWindow.innerHeight, e.previousHeight = 0, e.onResize = function() {
							var t = e.topWindow, n = t.innerWidth, o = t.innerHeight;
							if (e.windowWidth !== n || o > e.windowMaxHeight) return e.windowWidth = n, e.windowMaxHeight = o, void e.updateHeight(0);
							var i = e.windowMaxHeight - o;
							e.updateHeight(i < 120 ? 0 : i);
						}, e.topWindow.addEventListener("resize", e.onResize), e;
					}
					return i(e, t), e.prototype.isInitiallySupported = function() {
						var t;
						return s.isHarmony || s.isAndroid && !(null === (t = navigator.virtualKeyboard) || void 0 === t ? void 0 : t.overlaysContent);
					}, e.prototype.dispose = function() {
						t.prototype.dispose.call(this), this.topWindow.removeEventListener("resize", this.onResize);
					}, e.prototype.updateHeight = function(t) {
						this.previousHeight !== t && (this.previousHeight = t, this.emit("change", 0, t));
					}, e;
				}(r(n(1)).default);
			},
			function(t, e, n) {
				"use strict";
				Object.defineProperty(e, "__esModule", { value: !0 });
				var o = n(2), i = n(0);
				e.default = new (function() {
					function t() {
						var t = this;
						this.isEnabled = !1, this.fixScrollX = 0, this.fixScrollY = 0, this.isScrollingBack = !1, this.isIOSFocusScroll = !1, this.iOSFocusScrollTimeout = null, this.enableScrollFix = function(e, n) {
							void 0 === e && (e = window.scrollX), void 0 === n && (n = window.scrollY), t.isEnabled && t.disableScrollFix(), t.isEnabled = !0, t.fixScrollX = e, t.fixScrollY = n, t.styleNode = document.createElement("style"), t.styleNode.innerHTML = "/* Auto-injected by @tencent/docs-soft-keyboard enableScrollFix() */ html { touch-action: none; overflow: hidden !important }", document.head.appendChild(t.styleNode), t.topWindow.addEventListener("focus", t.onWindowFocus, !0), t.topWindow.addEventListener("scroll", t.onWindowScroll, !0);
						}, this.disableScrollFix = function() {
							t.isEnabled && (t.isEnabled = !1, t.styleNode && document.head.removeChild(t.styleNode), t.topWindow.removeEventListener("focus", t.onWindowFocus, !0), t.topWindow.removeEventListener("scroll", t.onWindowScroll, !0));
						}, this.inverseScrollBack = function() {
							t.isScrollingBack = !0, t.topWindow.scrollTo(t.fixScrollX, t.fixScrollY);
						}, this.onWindowScroll = function() {
							t.isScrollingBack || (t.isIOSFocusScroll ? t.inverseScrollBack() : t.topWindow.scrollTo(t.fixScrollX, t.fixScrollY));
						}, this.onWindowFocus = function() {
							i.isIOS && (t.iOSFocusScrollTimeout && (clearTimeout(t.iOSFocusScrollTimeout), t.iOSFocusScrollTimeout = null), t.isIOSFocusScroll = !0, t.iOSFocusScrollTimeout = setTimeout((function() {
								t.isIOSFocusScroll = !1;
							}), 500));
						};
					}
					return Object.defineProperty(t.prototype, "topWindow", {
						get: function() {
							return o.getTopWindow();
						},
						enumerable: !0,
						configurable: !0
					}), t;
				}())();
			}
		]);
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/phy-touch@0.1.1/node_modules/phy-touch/index.js
var require_phy_touch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		"use strict";
		if (!Date.now) Date.now = function() {
			return (/* @__PURE__ */ new Date()).getTime();
		};
		var vendors = ["webkit", "moz"];
		for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
			var vp = vendors[i];
			window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
			window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
		}
		if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
			var lastTime = 0;
			window.requestAnimationFrame = function(callback) {
				var now = Date.now();
				var nextTime = Math.max(lastTime + 16, now);
				return setTimeout(function() {
					callback(lastTime = nextTime);
				}, nextTime - now);
			};
			window.cancelAnimationFrame = clearTimeout;
		}
	})();
	(function() {
		function bind(element, type, callback) {
			element.addEventListener(type, callback, false);
		}
		function ease(x) {
			return Math.sqrt(1 - Math.pow(x - 1, 2));
		}
		function reverseEase(y) {
			return 1 - Math.sqrt(1 - y * y);
		}
		function preventDefaultTest(el, exceptions) {
			for (var i in exceptions) if (exceptions[i].test(el[i])) return true;
			return false;
		}
		var PhyTouch = function(option) {
			this.reverse = this._getValue(option.reverse, false);
			this.element = typeof option.touch === "string" ? document.querySelector(option.touch) : option.touch;
			this.target = this._getValue(option.target, this.element);
			var followersArr = this._getValue(option.followers, []);
			this.followers = followersArr.map(function(follower) {
				return {
					element: typeof follower.element === "string" ? document.querySelector(follower.element) : follower.element,
					offset: follower.offset
				};
			});
			this.vertical = this._getValue(option.vertical, true);
			this.property = option.property;
			this.tickID = 0;
			this.value = this._getValue(option.value, this.target[this.property]);
			this.target[this.property] = this.value;
			this.followers.forEach(function(follower) {
				follower.element[this.property] = this.value + follower.offset;
			}.bind(this));
			this.fixed = this._getValue(option.fixed, false);
			this.sensitivity = this._getValue(option.sensitivity, 1);
			this.moveFactor = this._getValue(option.moveFactor, 1);
			this.factor = this._getValue(option.factor, 1);
			this.outFactor = this._getValue(option.outFactor, .3);
			this.min = option.min;
			this.max = option.max;
			this.deceleration = this._getValue(option.deceleration, 6e-4);
			this.maxRegion = this._getValue(option.maxRegion, 600);
			this.springMaxRegion = this._getValue(option.springMaxRegion, 60);
			this.maxSpeed = option.maxSpeed;
			this.hasMaxSpeed = !(this.maxSpeed === void 0);
			this.lockDirection = this._getValue(option.lockDirection, true);
			var noop = function() {};
			var alwaysTrue = function() {
				return true;
			};
			this.change = option.change || noop;
			this.touchEnd = option.touchEnd || noop;
			this.touchStart = option.touchStart || noop;
			this.touchMove = option.touchMove || noop;
			this.touchCancel = option.touchCancel || noop;
			this.reboundEnd = option.reboundEnd || noop;
			this.animationEnd = option.animationEnd || noop;
			this.correctionEnd = option.correctionEnd || noop;
			this.tap = option.tap || noop;
			this.pressMove = option.pressMove || noop;
			this.shouldRebound = option.shouldRebound || alwaysTrue;
			this.preventDefault = this._getValue(option.preventDefault, true);
			this.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };
			this.hasMin = !(this.min === void 0);
			this.hasMax = !(this.max === void 0);
			this.isTouchStart = false;
			this.step = option.step;
			this.inertia = this._getValue(option.inertia, true);
			this._calculateIndex();
			this.eventTarget = window;
			if (option.bindSelf) this.eventTarget = this.element;
			this._moveHandler = this._move.bind(this);
			bind(this.element, "touchstart", this._start.bind(this));
			bind(this.eventTarget, "touchend", this._end.bind(this));
			bind(this.eventTarget, "touchcancel", this._cancel.bind(this));
			this.eventTarget.addEventListener("touchmove", this._moveHandler, {
				passive: false,
				capture: false
			});
			this.x1 = this.x2 = this.y1 = this.y2 = null;
		};
		PhyTouch.prototype = {
			isAtMax: function() {
				return this.hasMax && this.target[this.property] >= this.max;
			},
			isAtMin: function() {
				return this.hasMin && this.target[this.property] <= this.min;
			},
			_getValue: function(obj, defaultValue) {
				return obj === void 0 ? defaultValue : obj;
			},
			stop: function() {
				cancelAnimationFrame(this.tickID);
				this._calculateIndex();
			},
			_start: function(evt) {
				this.isTouchStart = true;
				this.touchStart.call(this, evt, this.target[this.property]);
				cancelAnimationFrame(this.tickID);
				this._calculateIndex();
				this.startTime = (/* @__PURE__ */ new Date()).getTime();
				this.x1 = this.preX = evt.touches[0].pageX;
				this.y1 = this.preY = evt.touches[0].pageY;
				this.start = this.vertical ? this.preY : this.preX;
				this._firstTouchMove = true;
				this._preventMove = false;
			},
			_move: function(evt) {
				if (this.isTouchStart) {
					var len = evt.touches.length, currentX = evt.touches[0].pageX, currentY = evt.touches[0].pageY;
					if (this._firstTouchMove && this.lockDirection) {
						var dDis = Math.abs(currentX - this.x1) - Math.abs(currentY - this.y1);
						if (dDis > 0 && this.vertical) this._preventMove = true;
						else if (dDis < 0 && !this.vertical) this._preventMove = true;
						this._firstTouchMove = false;
					}
					if (!this._preventMove) {
						var d = (this.vertical ? currentY - this.preY : currentX - this.preX) * this.sensitivity;
						var f = this.moveFactor;
						if (this.isAtMax() && (this.reverse ? -d : d) > 0) f = this.outFactor;
						else if (this.isAtMin() && (this.reverse ? -d : d) < 0) f = this.outFactor;
						d *= f;
						this.preX = currentX;
						this.preY = currentY;
						if (!this.fixed) {
							var detalD = this.reverse ? -d : d;
							this.target[this.property] += detalD;
							this.followers.forEach(function(follower) {
								follower.element[this.property] += detalD;
							}.bind(this));
						}
						this.change.call(this, this.target[this.property]);
						var timestamp = (/* @__PURE__ */ new Date()).getTime();
						if (timestamp - this.startTime > 300) {
							this.startTime = timestamp;
							this.start = this.vertical ? this.preY : this.preX;
						}
						this.touchMove.call(this, evt, this.target[this.property]);
					}
					if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) evt.preventDefault();
					if (len === 1) {
						if (this.x2 !== null) {
							evt.deltaX = currentX - this.x2;
							evt.deltaY = currentY - this.y2;
						} else {
							evt.deltaX = 0;
							evt.deltaY = 0;
						}
						this.pressMove.call(this, evt, this.target[this.property]);
					}
					this.x2 = currentX;
					this.y2 = currentY;
				}
			},
			_cancel: function(evt) {
				var current = this.target[this.property];
				this.touchCancel.call(this, evt, current);
				this._end(evt);
			},
			to: function(v, time, user_ease, callback) {
				this._to(v, this._getValue(time, 600), user_ease || ease, this.change, function(value) {
					this._calculateIndex();
					this.reboundEnd.call(this, value);
					this.animationEnd.call(this, value);
					callback && callback.call(this, value);
				}.bind(this));
			},
			_calculateIndex: function() {
				if (this.hasMax && this.hasMin) this.currentPage = Math.round((this.max - this.target[this.property]) / this.step);
			},
			_end: function(evt) {
				if (this.isTouchStart) {
					this.isTouchStart = false;
					var self = this, current = this.target[this.property], triggerTap = Math.abs(evt.changedTouches[0].pageX - this.x1) < 30 && Math.abs(evt.changedTouches[0].pageY - this.y1) < 30;
					if (triggerTap) this.tap.call(this, evt, current);
					if (this.touchEnd.call(this, evt, current, this.currentPage) === false) return;
					if (this.hasMax && current > this.max) {
						if (!this.shouldRebound(current)) return;
						this._to(this.max, 200, ease, this.change, function(value) {
							this.reboundEnd.call(this, value);
							this.animationEnd.call(this, value);
						}.bind(this));
					} else if (this.hasMin && current < this.min) {
						if (!this.shouldRebound(current)) return;
						this._to(this.min, 200, ease, this.change, function(value) {
							this.reboundEnd.call(this, value);
							this.animationEnd.call(this, value);
						}.bind(this));
					} else if (this.inertia && !triggerTap && !this._preventMove && !this.fixed) {
						var dt = (/* @__PURE__ */ new Date()).getTime() - this.startTime;
						if (dt < 300) {
							var distance = ((this.vertical ? evt.changedTouches[0].pageY : evt.changedTouches[0].pageX) - this.start) * this.sensitivity, speed = Math.abs(distance) / dt, actualSpeed = this.factor * speed;
							if (this.hasMaxSpeed && actualSpeed > this.maxSpeed) actualSpeed = this.maxSpeed;
							var direction = distance < 0 ? -1 : 1;
							if (this.reverse) direction = -direction;
							var destination = current + actualSpeed * actualSpeed / (2 * this.deceleration) * direction;
							var tRatio = 1;
							if (destination < this.min) {
								if (destination < this.min - this.maxRegion) {
									tRatio = reverseEase((current - this.min + this.springMaxRegion) / (current - destination));
									destination = this.min - this.springMaxRegion;
								} else {
									tRatio = reverseEase((current - this.min + this.springMaxRegion * (this.min - destination) / this.maxRegion) / (current - destination));
									destination = this.min - this.springMaxRegion * (this.min - destination) / this.maxRegion;
								}
							} else if (destination > this.max) {
								if (destination > this.max + this.maxRegion) {
									tRatio = reverseEase((this.max + this.springMaxRegion - current) / (destination - current));
									destination = this.max + this.springMaxRegion;
								} else {
									tRatio = reverseEase((this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion - current) / (destination - current));
									destination = this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion;
								}
							}
							var duration = Math.round(speed / self.deceleration) * tRatio;
							if (!isNaN(destination)) self._to(Math.round(destination), duration, ease, self.change, function(value) {
								if (self.hasMax && self.target[self.property] > self.max) {
									if (!this.shouldRebound(self.target[self.property])) return;
									cancelAnimationFrame(self.tickID);
									self._to(self.max, 600, ease, self.change, self.animationEnd);
								} else if (self.hasMin && self.target[self.property] < self.min) {
									if (!this.shouldRebound(self.target[self.property])) return;
									cancelAnimationFrame(self.tickID);
									self._to(self.min, 600, ease, self.change, self.animationEnd);
								} else if (self.step) self._correction();
								else self.animationEnd.call(self, value);
								self.change.call(this, value);
							});
						} else self._correction();
					} else self._correction();
				}
				this.x1 = this.x2 = this.y1 = this.y2 = null;
			},
			_to: function(value, time, ease, onChange, onEnd) {
				var el = this.target, property = this.property;
				var followers = this.followers;
				var current = el[property];
				var dv = value - current;
				var beginTime = +/* @__PURE__ */ new Date();
				var self = this;
				var toTick = function() {
					var dt = +/* @__PURE__ */ new Date() - beginTime;
					if (dt >= time) {
						el[property] = value;
						onChange && onChange.call(self, value);
						onEnd && onEnd.call(self, value);
						return;
					}
					var nextPosition = dv * ease(dt / time) + current;
					el[property] = nextPosition;
					followers.forEach(function(follower) {
						follower.element[property] = nextPosition + follower.offset;
					});
					self.tickID = requestAnimationFrame(toTick);
					onChange && onChange.call(self, el[property]);
				};
				toTick();
			},
			_correction: function() {
				if (this.step === void 0) return;
				var value = this.target[this.property];
				var rpt = Math.floor(Math.abs(value / this.step));
				var dy = value % this.step;
				if (Math.abs(dy) > this.step / 2) this._to((value < 0 ? -1 : 1) * (rpt + 1) * this.step, 400, ease, this.change, function(value) {
					this._calculateIndex();
					this.correctionEnd.call(this, value);
					this.animationEnd.call(this, value);
				}.bind(this));
				else this._to((value < 0 ? -1 : 1) * rpt * this.step, 400, ease, this.change, function(value) {
					this._calculateIndex();
					this.correctionEnd.call(this, value);
					this.animationEnd.call(this, value);
				}.bind(this));
			}
		};
		if (typeof module !== "undefined" && typeof exports === "object") module.exports = PhyTouch;
		else window.PhyTouch = PhyTouch;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/css3transform@1.2.3/node_modules/css3transform/dist/css3transform.js
var require_css3transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var DEG_TO_RAD = .017453292519943295;
		var Matrix3D = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
			this.elements = window.Float32Array ? /* @__PURE__ */ new Float32Array(16) : [];
			var te = this.elements;
			te[0] = n11 !== void 0 ? n11 : 1;
			te[4] = n12 || 0;
			te[8] = n13 || 0;
			te[12] = n14 || 0;
			te[1] = n21 || 0;
			te[5] = n22 !== void 0 ? n22 : 1;
			te[9] = n23 || 0;
			te[13] = n24 || 0;
			te[2] = n31 || 0;
			te[6] = n32 || 0;
			te[10] = n33 !== void 0 ? n33 : 1;
			te[14] = n34 || 0;
			te[3] = n41 || 0;
			te[7] = n42 || 0;
			te[11] = n43 || 0;
			te[15] = n44 !== void 0 ? n44 : 1;
		};
		Matrix3D.prototype = {
			set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
				var te = this.elements;
				te[0] = n11;
				te[4] = n12;
				te[8] = n13;
				te[12] = n14;
				te[1] = n21;
				te[5] = n22;
				te[9] = n23;
				te[13] = n24;
				te[2] = n31;
				te[6] = n32;
				te[10] = n33;
				te[14] = n34;
				te[3] = n41;
				te[7] = n42;
				te[11] = n43;
				te[15] = n44;
				return this;
			},
			identity: function() {
				this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
				return this;
			},
			multiplyMatrices: function(a, be) {
				var ae = a.elements;
				var te = this.elements;
				var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
				var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
				var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
				var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
				var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
				var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
				var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
				var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];
				te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
				te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
				te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
				te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
				te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
				te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
				te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
				te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
				te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
				te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
				te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
				te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
				te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
				te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
				te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
				te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
				return this;
			},
			epsilon: function(value) {
				return Math.abs(value) < 1e-10 ? 0 : value;
			},
			_arrayWrap: function(arr) {
				return window.Float32Array ? new Float32Array(arr) : arr;
			},
			appendTransform: function(x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {
				var rx = rotateX * DEG_TO_RAD;
				var cosx = this.epsilon(Math.cos(rx));
				var sinx = this.epsilon(Math.sin(rx));
				var ry = rotateY * DEG_TO_RAD;
				var cosy = this.epsilon(Math.cos(ry));
				var siny = this.epsilon(Math.sin(ry));
				var rz = rotateZ * DEG_TO_RAD;
				var cosz = this.epsilon(Math.cos(rz * -1));
				var sinz = this.epsilon(Math.sin(rz * -1));
				this.multiplyMatrices(this, this._arrayWrap([
					1,
					0,
					0,
					x,
					0,
					cosx,
					sinx,
					y,
					0,
					-sinx,
					cosx,
					z,
					0,
					0,
					0,
					1
				]));
				this.multiplyMatrices(this, this._arrayWrap([
					cosy,
					0,
					siny,
					0,
					0,
					1,
					0,
					0,
					-siny,
					0,
					cosy,
					0,
					0,
					0,
					0,
					1
				]));
				this.multiplyMatrices(this, this._arrayWrap([
					cosz * scaleX,
					sinz * scaleY,
					0,
					0,
					-sinz * scaleX,
					cosz * scaleY,
					0,
					0,
					0,
					0,
					1 * scaleZ,
					0,
					0,
					0,
					0,
					1
				]));
				if (skewX || skewY) this.multiplyMatrices(this, this._arrayWrap([
					this.epsilon(Math.cos(skewX * DEG_TO_RAD)),
					this.epsilon(Math.sin(skewX * DEG_TO_RAD)),
					0,
					0,
					-1 * this.epsilon(Math.sin(skewY * DEG_TO_RAD)),
					this.epsilon(Math.cos(skewY * DEG_TO_RAD)),
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					1
				]));
				if (originX || originY || originZ) {
					this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
					this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
					this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
				}
				return this;
			}
		};
		var Matrix2D = function(a, b, c, d, tx, ty) {
			this.a = a == null ? 1 : a;
			this.b = b || 0;
			this.c = c || 0;
			this.d = d == null ? 1 : d;
			this.tx = tx || 0;
			this.ty = ty || 0;
			return this;
		};
		Matrix2D.prototype = {
			identity: function() {
				this.a = this.d = 1;
				this.b = this.c = this.tx = this.ty = 0;
				return this;
			},
			appendTransform: function(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
				if (rotation % 360) {
					var r = rotation * DEG_TO_RAD;
					var cos = Math.cos(r);
					var sin = Math.sin(r);
				} else {
					cos = 1;
					sin = 0;
				}
				if (skewX || skewY) {
					skewX *= DEG_TO_RAD;
					skewY *= DEG_TO_RAD;
					this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
					this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
				} else this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
				if (originX || originY) {
					this.tx -= originX * this.a + originY * this.c;
					this.ty -= originX * this.b + originY * this.d;
				}
				return this;
			},
			append: function(a, b, c, d, tx, ty) {
				var a1 = this.a;
				var b1 = this.b;
				var c1 = this.c;
				var d1 = this.d;
				this.a = a * a1 + b * c1;
				this.b = a * b1 + b * d1;
				this.c = c * a1 + d * c1;
				this.d = c * b1 + d * d1;
				this.tx = tx * a1 + ty * c1 + this.tx;
				this.ty = tx * b1 + ty * d1 + this.ty;
				return this;
			},
			initialize: function(a, b, c, d, tx, ty) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.tx = tx;
				this.ty = ty;
				return this;
			},
			setValues: function(a, b, c, d, tx, ty) {
				this.a = a == null ? 1 : a;
				this.b = b || 0;
				this.c = c || 0;
				this.d = d == null ? 1 : d;
				this.tx = tx || 0;
				this.ty = ty || 0;
				return this;
			},
			copy: function(matrix) {
				return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
			}
		};
		function observe(target, props, callback) {
			for (var i = 0, len = props.length; i < len; i++) {
				var prop = props[i];
				watch(target, prop, callback);
			}
		}
		function watch(target, prop, callback) {
			Object.defineProperty(target, prop, {
				get: function() {
					return this["_" + prop];
				},
				set: function(value) {
					this["_" + prop] = value;
					callback();
				}
			});
		}
		function isElement(o) {
			return typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
		}
		function Transform(obj, notPerspective) {
			if (obj.___mixCSS3Transform) return;
			var observeProps = [
				"translateX",
				"translateY",
				"translateZ",
				"scaleX",
				"scaleY",
				"scaleZ",
				"rotateX",
				"rotateY",
				"rotateZ",
				"skewX",
				"skewY",
				"originX",
				"originY",
				"originZ"
			], objIsElement = isElement(obj);
			if (!notPerspective) observeProps.push("perspective");
			obj.___mixCSS3Transform = true;
			observe(obj, observeProps, function() {
				var mtx = obj.matrix3d.identity().appendTransform(obj.translateX, obj.translateY, obj.translateZ, obj.scaleX, obj.scaleY, obj.scaleZ, obj.rotateX, obj.rotateY, obj.rotateZ, obj.skewX, obj.skewY, obj.originX, obj.originY, obj.originZ);
				var transform = (notPerspective ? "" : "perspective(" + obj.perspective + "px) ") + "matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
				if (objIsElement) obj.style.transform = obj.style.msTransform = obj.style.OTransform = obj.style.MozTransform = obj.style.webkitTransform = transform;
				else obj.transform = transform;
			});
			obj.matrix3d = new Matrix3D();
			if (!notPerspective) obj.perspective = 500;
			obj.scaleX = obj.scaleY = obj.scaleZ = 1;
			obj.translateX = obj.translateY = obj.translateZ = obj.rotateX = obj.rotateY = obj.rotateZ = obj.skewX = obj.skewY = obj.originX = obj.originY = obj.originZ = 0;
		}
		Transform.getMatrix3D = function(option) {
			var defaultOption = {
				translateX: 0,
				translateY: 0,
				translateZ: 0,
				rotateX: 0,
				rotateY: 0,
				rotateZ: 0,
				skewX: 0,
				skewY: 0,
				originX: 0,
				originY: 0,
				originZ: 0,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1
			};
			for (var key in option) if (option.hasOwnProperty(key)) defaultOption[key] = option[key];
			return new Matrix3D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.translateZ, defaultOption.scaleX, defaultOption.scaleY, defaultOption.scaleZ, defaultOption.rotateX, defaultOption.rotateY, defaultOption.rotateZ, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY, defaultOption.originZ).elements;
		};
		Transform.getMatrix2D = function(option) {
			var defaultOption = {
				translateX: 0,
				translateY: 0,
				rotation: 0,
				skewX: 0,
				skewY: 0,
				originX: 0,
				originY: 0,
				scaleX: 1,
				scaleY: 1
			};
			for (var key in option) if (option.hasOwnProperty(key)) defaultOption[key] = option[key];
			return new Matrix2D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.scaleX, defaultOption.scaleY, defaultOption.rotation, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY);
		};
		if ("undefined" != typeof module) module.exports = Transform;
		else window.Transform = Transform;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/PullPanel/interface.js
var PullStage;
var init_interface = __esmMin((() => {
	(function(PullStage) {
		PullStage[PullStage["HALF"] = 0] = "HALF";
		PullStage[PullStage["FULL"] = 1] = "FULL";
	})(PullStage || (PullStage = {}));
})), import_react$35, import_react_dom$2, import_dist, import_phy_touch, import_css3transform, TRIGGER_STAGE_SWITCH_GAP, HALF_PANEL_RATIO, FULL_PANEL_RATIO, BIG_HEADER_HEIGHT, SMALL_HEADER_HEIGHT, SINGLE_STAGE_PANEL_MARGIN, PullPanel;
var init_PullPanel$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	import_dist = require_dist();
	import_phy_touch = /* @__PURE__ */ __toESM(require_phy_touch());
	import_css3transform = /* @__PURE__ */ __toESM(require_css3transform());
	init_esm$1();
	init_interface();
	init_keepDom();
	init_helper();
	init_theme();
	init_preventScrollPenetrate();
	init_stylusAdapter();
	init_locale();
	TRIGGER_STAGE_SWITCH_GAP = 40;
	HALF_PANEL_RATIO = .5;
	FULL_PANEL_RATIO = .8;
	BIG_HEADER_HEIGHT = 72;
	SMALL_HEADER_HEIGHT = 56;
	SINGLE_STAGE_PANEL_MARGIN = 24;
	PullPanel = function(_super) {
		__extends(PullPanel, _super);
		function PullPanel() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.panelRef = import_react$35.createRef();
			_this.headerRef = import_react$35.createRef();
			_this.maskRef = import_react$35.createRef();
			_this.contentRef = import_react$35.createRef();
			_this.fixedContentRef = import_react$35.createRef();
			_this.inShowAnimation = false;
			_this.softKeyboard = null;
			_this.keyboardInView = 0;
			_this.state = { pullStage: _this.props.initialPullStage };
			_this.handleClickMask = function() {
				if (_this.props.maskClosable && !_this.inShowAnimation) _this.requestHide();
			};
			_this.handleMoveStop = function() {
				var _a = _this.props, visible = _a.visible, pullable = _a.pullable;
				if (!visible || !pullable || !_this.touch) return;
				if (_this.hasMultiplePullStages) {
					_this.handleMultiStageMoveStop();
					return;
				}
				if (_this.currentValue > TRIGGER_STAGE_SWITCH_GAP) _this.requestHide();
				else _this.scrollToShowPosition();
			};
			_this.preventDefault = function(e) {
				e.preventDefault();
			};
			_this.handleOrientationChange = function() {
				var handler = function() {
					var _a = _this.defaultHeights, panelMaxHeight = _a.panelMaxHeight, showTranslate = _a.showTranslate;
					var visible = _this.props.visible;
					if (_this.touch) _this.touch.max = panelMaxHeight;
					if (visible) {
						_this.currentValue = showTranslate;
						if (_this.hasMultiplePullStages) {
							_this.switchPullStage(PullStage.FULL);
							return;
						}
					}
					_this.forceUpdate();
				};
				if (ua.isIOS) setTimeout(handler, 0);
				else handler();
			};
			_this.handleKeyboardHeightChange = function(keyboard) {
				var _a;
				if (!_this.props.visible) {
					_this.keyboardInView = 0;
					return;
				}
				var heightInViewport = keyboard.heightInViewport;
				var input = document.activeElement;
				if (input && heightInViewport > 0 && ((_a = _this.panelRef.current) === null || _a === void 0 ? void 0 : _a.contains(input)) && window.innerHeight - input.getBoundingClientRect().bottom < heightInViewport) _this.keyboardInView = heightInViewport;
				else _this.keyboardInView = 0;
				_this.scrollToShowPosition();
			};
			_this.themedRender = function(classNames) {
				var _a, _b, _c;
				var _d = _this.props, prefixCls = _d.prefixCls, className = _d.className, style = _d.style, children = _d.children, visible = _d.visible, pullable = _d.pullable, containerStyle = _d.containerStyle, contentStyle = _d.contentStyle, zIndex = _d.zIndex, destroyOnClose = _d.destroyOnClose, containerClassName = _d.containerClassName, contentClassName = _d.contentClassName, content = _d.content, fixedContent = _d.fixedContent;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-pullable"] = pullable, _a));
				var maskClasses = classNames(prefixCls + "-mask", (_b = {}, _b[prefixCls + "-mask-hidden"] = !_this.isMaskVisible, _b));
				var containerClasses = classNames(prefixCls + "-container", containerClassName, (_c = {}, _c[prefixCls + "-container-hidden"] = !visible, _c));
				var renderedChildren = children || content;
				if (destroyOnClose && !decideKeepDom.call(_this, 300, visible)) renderedChildren = null;
				var _e = _this.getHeightRelatedStyle(), panelHeightStyle = _e.panelHeightStyle, contentHeightStyle = _e.contentHeightStyle;
				return import_react_dom$2.createPortal(h("div", {
					className: containerClasses,
					style: __assign({ zIndex }, containerStyle)
				}, h(WithStylusClick, { clickHandler: _this.handleClickMask }, h("div", {
					className: maskClasses,
					ref: _this.maskRef
				})), h("div", {
					className: classes,
					style: __assign(__assign({}, panelHeightStyle), style),
					ref: _this.panelRef
				}, _this.renderHeader(classNames), h("div", {
					className: classNames(prefixCls + "-content", contentClassName),
					style: __assign(__assign({}, contentHeightStyle), contentStyle),
					ref: _this.contentRef
				}, renderedChildren)), _this.shouldRenderFixedContent && h("div", {
					className: classNames(prefixCls + "-fixed-content"),
					ref: _this.fixedContentRef
				}, fixedContent)), document.body);
			};
			return _this;
		}
		PullPanel.getDerivedStateFromProps = function(props, state) {
			if (props.currentPullStage !== void 0) return { pullStage: props.currentPullStage };
			return null;
		};
		Object.defineProperty(PullPanel.prototype, "currentValue", {
			get: function() {
				var touch = this.touch;
				return touch.target[touch.property];
			},
			set: function(value) {
				var touch = this.touch;
				touch.target[touch.property] = value;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "keyboardTranslate", {
			get: function() {
				return this.keyboardInView + this.props.offset;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "minValue", {
			get: function() {
				return 0 - this.keyboardTranslate;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "hasMultiplePullStages", {
			get: function() {
				return this.props.pullable && this.props.pullStages === "multiple";
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "canPullHeaderOnly", {
			get: function() {
				return this.hasMultiplePullStages || this.props.pullHeaderOnly;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "shouldRenderFixedContent", {
			get: function() {
				return this.props.fixedContent;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "defaultHeights", {
			get: function() {
				var _a = this.props.pullStageHeights, halfPanelRatio = _a[0], fullPanelRatio = _a[1];
				var panelMaxHeight = this.hasMultiplePullStages ? window.innerHeight * fullPanelRatio : window.innerHeight - SINGLE_STAGE_PANEL_MARGIN;
				return {
					panelHalfHeight: window.innerHeight * halfPanelRatio,
					panelMaxHeight,
					showTranslate: this.minValue
				};
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "multipleStageHeights", {
			get: function() {
				var _a = this.defaultHeights, panelHalfHeight = _a.panelHalfHeight, panelFullHeight = _a.panelMaxHeight;
				var fullTranslate = _a.showTranslate;
				var halfTranslate = panelFullHeight - panelHalfHeight - this.keyboardTranslate;
				var headerDom = this.headerRef.current;
				var headerHeight = headerDom ? headerDom.clientHeight : this.props.pullable ? BIG_HEADER_HEIGHT : SMALL_HEADER_HEIGHT;
				var contentLimitedHeight = panelHalfHeight - headerHeight;
				return {
					panelHalfHeight,
					panelFullHeight,
					pullStageTranslates: [halfTranslate, fullTranslate],
					contentLimitedHeight,
					headerHeight
				};
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(PullPanel.prototype, "isMaskVisible", {
			get: function() {
				var _a = this.props, mask = _a.mask, visible = _a.visible, pullable = _a.pullable, pullStages = _a.pullStages;
				if (!visible) return false;
				if (typeof mask === "boolean") return mask;
				return pullable && pullStages === "single";
			},
			enumerable: false,
			configurable: true
		});
		PullPanel.prototype.getHeightRelatedStyle = function() {
			var _a;
			var fixedContentHeight;
			if (this.shouldRenderFixedContent) fixedContentHeight = (_a = this.fixedContentRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight;
			if (this.hasMultiplePullStages) {
				var pullStage = this.state.pullStage;
				var _b = this.multipleStageHeights, contentLimitedHeight = _b.contentLimitedHeight, panelFullHeight = _b.panelFullHeight;
				return {
					contentHeightStyle: {
						maxHeight: pullStage === PullStage.FULL ? void 0 : contentLimitedHeight,
						paddingBottom: fixedContentHeight
					},
					panelHeightStyle: { height: panelFullHeight }
				};
			}
			var _c = this.defaultHeights, panelMaxHeight = _c.panelMaxHeight, panelHalfHeight = _c.panelHalfHeight;
			var _d = this.props, panelHeight = _d.panelHeight, pullable = _d.pullable;
			return {
				contentHeightStyle: { paddingBottom: fixedContentHeight },
				panelHeightStyle: {
					maxHeight: panelMaxHeight,
					height: panelHeight || (pullable ? void 0 : panelHalfHeight)
				}
			};
		};
		PullPanel.prototype.moveTo = function(destination, callback, needAnimation) {
			if (needAnimation === void 0) needAnimation = true;
			var touch = this.touch;
			touch.stop();
			touch._preventMove = true;
			touch.to(destination, needAnimation ? 300 : 0, void 0, function() {
				touch._preventMove = false;
				callback && callback();
			});
		};
		PullPanel.prototype.scrollToHidePosition = function(callback) {
			var panelDom = this.panelRef.current;
			if (!panelDom) return;
			this.moveTo(panelDom.clientHeight, callback);
		};
		PullPanel.prototype.scrollToShowPosition = function(callback, needAnimation) {
			var _this = this;
			if (needAnimation === void 0) needAnimation = true;
			var pullStage = this.state.pullStage;
			var targetTranslate = this.hasMultiplePullStages ? this.multipleStageHeights.pullStageTranslates[pullStage] : this.defaultHeights.showTranslate;
			if (this.currentValue === targetTranslate) return;
			if (this.hasMultiplePullStages) this.setPullStage(pullStage);
			this.inShowAnimation = true;
			this.moveTo(targetTranslate, function() {
				_this.inShowAnimation = false;
				callback && callback();
			}, needAnimation);
		};
		PullPanel.prototype.requestHide = function() {
			var _a = this.props, onCancel = _a.onCancel, onOk = _a.onOk;
			(_a.onClose || onCancel || onOk)();
		};
		PullPanel.prototype.handleMultiStageMoveStop = function() {
			var moveStartStage = this.state.pullStage;
			var moveEndTranslate = this.currentValue;
			var _a = this.multipleStageHeights.pullStageTranslates, halfTranslate = _a[0], fullTranslate = _a[1];
			if (moveEndTranslate > halfTranslate + TRIGGER_STAGE_SWITCH_GAP) return this.requestHide();
			if (moveStartStage === PullStage.FULL) {
				if (moveEndTranslate === fullTranslate) return;
				if (moveEndTranslate > fullTranslate + TRIGGER_STAGE_SWITCH_GAP) return this.switchPullStage(PullStage.HALF);
				return this.switchPullStage(PullStage.FULL);
			}
			if (moveStartStage === PullStage.HALF) {
				if (moveEndTranslate === halfTranslate) return;
				if (moveEndTranslate < halfTranslate - TRIGGER_STAGE_SWITCH_GAP) return this.switchPullStage(PullStage.FULL);
				return this.switchPullStage(PullStage.HALF);
			}
		};
		PullPanel.prototype.switchPullStage = function(pullStage) {
			if (!this.hasMultiplePullStages) return;
			this.setPullStage(pullStage);
			this.moveToStage(pullStage);
		};
		PullPanel.prototype.moveToStage = function(pullStage) {
			if (!this.hasMultiplePullStages) return;
			var translate = this.multipleStageHeights.pullStageTranslates[pullStage];
			this.moveTo(translate);
		};
		PullPanel.prototype.setPullStage = function(pullStage) {
			this.setState({ pullStage });
			this.props.onPullStageChange(pullStage);
		};
		PullPanel.prototype.initKeyboardDetection = function() {
			this.clearKeyboardDetection();
			this.softKeyboard = new import_dist.SoftKeyboard();
			this.softKeyboard.on("change", this.handleKeyboardHeightChange);
		};
		PullPanel.prototype.clearKeyboardDetection = function() {
			var _a;
			(_a = this.softKeyboard) === null || _a === void 0 || _a.dispose();
			this.keyboardInView = 0;
		};
		PullPanel.prototype.componentDidMount = function() {
			var _this = this;
			var panelDom = this.panelRef.current;
			(0, import_css3transform.default)(panelDom);
			this.maskRef.current.addEventListener("touchmove", this.preventDefault);
			window.addEventListener("resize", this.handleOrientationChange);
			var _a = this.props, visible = _a.visible, pullable = _a.pullable, animateOnMount = _a.animateOnMount, enableKeyboardDetection = _a.enableKeyboardDetection, preventScrollPenetrate = _a.preventScrollPenetrate, preventTouchMove = _a.preventTouchMove;
			if (enableKeyboardDetection) this.initKeyboardDetection();
			this.touch = new import_phy_touch.default({
				touch: this.canPullHeaderOnly ? this.headerRef.current : panelDom,
				target: panelDom,
				property: "translateY",
				max: this.defaultHeights.panelMaxHeight,
				min: 0,
				value: panelDom.clientHeight,
				touchEnd: this.handleMoveStop,
				touchCancel: this.handleMoveStop,
				animationEnd: this.handleMoveStop,
				fixed: !pullable,
				shouldRebound: function() {
					return _this.props.visible;
				},
				bindSelf: true,
				preventDefault: this.canPullHeaderOnly
			});
			Object.defineProperty(this.touch, "min", { get: function() {
				return _this.minValue;
			} });
			this.touch.fixed = preventTouchMove;
			if (visible) this.scrollToShowPosition(function() {
				return _this.shouldRenderFixedContent && !_this.hasMultiplePullStages && _this.forceUpdate();
			}, animateOnMount);
			if (preventScrollPenetrate) preventSelfScrollPenetrate({
				container: this.contentRef.current,
				direction: "y",
				stopPropagationBorder: "upper"
			});
		};
		PullPanel.prototype.componentWillUnmount = function() {
			this.maskRef.current.removeEventListener("touchmove", this.preventDefault);
			window.removeEventListener("resize", this.handleOrientationChange);
			this.touch = null;
			this.clearKeyboardDetection();
		};
		PullPanel.prototype.componentDidUpdate = function(prevProps) {
			var _this = this;
			if (prevProps.preventTouchMove !== this.props.preventTouchMove) this.touch.fixed = this.props.preventTouchMove;
			if (prevProps.visible && !this.props.visible) return this.scrollToHidePosition(function() {
				_this.touch && (_this.touch._preventMove = true);
			});
			if (!prevProps.visible && this.props.visible) return this.scrollToShowPosition(function() {
				_this.touch._preventMove = false;
			});
			if (!prevProps.enableKeyboardDetection && this.props.enableKeyboardDetection) this.initKeyboardDetection();
			if (prevProps.enableKeyboardDetection && !this.props.enableKeyboardDetection) this.clearKeyboardDetection();
			if (prevProps.currentPullStage !== this.props.currentPullStage || prevProps.offset !== this.props.offset) this.moveToStage(this.state.pullStage);
		};
		PullPanel.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		PullPanel.prototype.renderHeader = function(classNames) {
			var _a, _b;
			var _c = this.props, prefixCls = _c.prefixCls, okText = _c.okText, onOk = _c.onOk, title = _c.title, headerStyle = _c.headerStyle, cancelText = _c.cancelText, onCancel = _c.onCancel, header = _c.header, description = _c.description, showHeaderBorder = _c.showHeaderBorder, headerSize = _c.headerSize, headerClassName = _c.headerClassName;
			var headerPostfix = description ? "with-desc" : headerSize;
			var headerClasses = classNames(prefixCls + "-header", prefixCls + "-header-" + headerPostfix, headerClassName, (_a = {}, _a[prefixCls + "-header-show-border"] = showHeaderBorder, _a));
			var titleClassName = classNames(prefixCls + "-header-title", (_b = {}, _b[prefixCls + "-header-title-with-desc"] = description, _b[prefixCls + "-header-title-centered"] = cancelText && okText, _b));
			return h("div", {
				className: headerClasses,
				ref: this.headerRef,
				style: headerStyle
			}, header ? header : h(import_react$35.Fragment, null, cancelText && h(WithStylusClick, { clickHandler: onCancel }, h("span", { className: classNames(prefixCls + "-header-cancel") }, cancelText)), h("span", { className: titleClassName }, h("span", null, title), description && h("span", { className: classNames(prefixCls + "-header-desc") }, description)), okText && h(WithStylusClick, { clickHandler: onOk }, h("span", { className: classNames(prefixCls + "-header-ok") }, okText))));
		};
		return PullPanel;
	}(import_react$35.Component);
	PullPanel.defaultProps = {
		prefixCls: "dui-m-pullpanel",
		title: i18n("title"),
		okText: i18n("done"),
		cancelText: "",
		onOk: emptyFn,
		destroyOnClose: false,
		pullable: true,
		animateOnMount: true,
		showHeaderBorder: true,
		headerSize: "big",
		enableKeyboardDetection: false,
		maskClosable: true,
		preventScrollPenetrate: true,
		pullStages: "single",
		initialPullStage: PullStage.HALF,
		onPullStageChange: emptyFn,
		pullStageHeights: [HALF_PANEL_RATIO, FULL_PANEL_RATIO],
		offset: 0
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/PullPanel/show.js
var show_default$1;
var init_show$1 = __esmMin((() => {
	init_PullPanel$1();
	init_show$5();
	init_helper();
	show_default$1 = wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		return showWithTransition({
			Component: PullPanel,
			transitionDuration: 300,
			autoClose: false,
			props: config,
			forcedProps: { destroyOnClose: true },
			injectClosePropNames: [
				"onOk",
				"onCancel",
				"onClose"
			],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/PullPanel/index.js
var PullPanel_default;
var init_PullPanel = __esmMin((() => {
	init_style();
	init_PullPanel$1();
	init_show$1();
	injectStyle("components/PullPanel/style/index.css", "@-webkit-keyframes dui-m-pullpanel-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-pullpanel-fade-in{0%{opacity:0}to{opacity:1}}[data-duim-1-9-0~=\"dui-m-pullpanel\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;left:0;right:0;bottom:0;background:var(--bg-lv3-default,#fff);pointer-events:auto;padding:0 env(safe-area-inset-right) 0 env(safe-area-inset-left);-webkit-box-shadow:0 -5px 20px 0 rgba(0,0,0,.14);box-shadow:0 -5px 20px 0 rgba(0,0,0,.14);border-radius:16px 16px 0 0;-webkit-user-select:none;-moz-user-select:none;user-select:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:stretch;-webkit-align-items:stretch;align-items:stretch}[data-duim-1-9-0~=\"dui-m-pullpanel\"]:after{content:\"\";width:100%;height:300px;position:absolute;bottom:-300px;left:0;background:inherit}[data-duim-1-9-0~=\"dui-m-pullpanel-pullable\"]:before{content:\"\";display:block;position:absolute;width:60px;height:5px;border-radius:2.5px;left:0;right:0;top:5px;margin:auto;background:var(--border-medium,rgba(0,0,0,.08))}[data-duim-1-9-0~=\"dui-m-pullpanel-container\"],[data-duim-1-9-0~=\"dui-m-pullpanel-mask\"]{left:0;right:0;top:0;bottom:0}[data-duim-1-9-0~=\"dui-m-pullpanel-container\"]{position:fixed;z-index:9997;-webkit-transition-property:visibility;transition-property:visibility;-webkit-transition-duration:.3s;transition-duration:.3s;pointer-events:none;-webkit-tap-highlight-color:transparent}[data-duim-1-9-0~=\"dui-m-pullpanel-container-hidden\"]{visibility:hidden}[data-duim-1-9-0~=\"dui-m-pullpanel-mask\"]{position:absolute;background:rgba(0,0,0,.3);-webkit-animation:dui-m-pullpanel-fade-in .3s linear;animation:dui-m-pullpanel-fade-in .3s linear;-webkit-transition-property:visibility,opacity;transition-property:visibility,opacity;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:linear;transition-timing-function:linear;pointer-events:auto}[data-duim-1-9-0~=\"dui-m-pullpanel-mask-hidden\"]{opacity:0;visibility:hidden;pointer-events:none}[data-duim-1-9-0~=\"dui-m-pullpanel-header\"]{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:var(--text-ultrastrong,rgba(0,0,0,.9));font-size:17px;font-weight:500;padding:16px 16px 0;-webkit-flex-shrink:0;flex-shrink:0}[data-duim-1-9-0~=\"dui-m-pullpanel-header-big\"]{height:72px}[data-duim-1-9-0~=\"dui-m-pullpanel-header-small\"]{height:56px}[data-duim-1-9-0~=\"dui-m-pullpanel-header-with-desc\"]{height:84px}[data-duim-1-9-0~=\"dui-m-pullpanel-header-show-border\"]:after{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);width:200vw;left:-50vw;bottom:0}[data-duim-1-9-0~=\"dui-m-pullpanel-header-cancel\"],[data-duim-1-9-0~=\"dui-m-pullpanel-header-ok\"]{color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-pullpanel-header-cancel\"]:active,[data-duim-1-9-0~=\"dui-m-pullpanel-header-ok\"]:active{opacity:.6}[data-duim-1-9-0~=\"dui-m-pullpanel-header-cancel\"]{font-weight:400}[data-duim-1-9-0~=\"dui-m-pullpanel-header-title\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;font-size:20px;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}[data-duim-1-9-0~=\"dui-m-pullpanel-header-title-centered\"]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}[data-duim-1-9-0~=\"dui-m-pullpanel-header-desc\"]{font-size:12px;font-weight:400;color:var(--text-medium,rgba(0,0,0,.56));margin-top:4px}[data-duim-1-9-0~=\"dui-m-pullpanel-content\"]{-webkit-box-sizing:border-box;box-sizing:border-box;overflow:auto;-webkit-overflow-scrolling:touch;padding-bottom:env(safe-area-inset-bottom);-webkit-box-flex:1;-webkit-flex:1;flex:1;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-pullpanel-fixed-content\"]{z-index:1;position:absolute;bottom:0;left:0;right:0;pointer-events:auto}");
	PullPanel.show = show_default$1;
	PullPanel_default = PullPanel;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Tooltip/Tooltip.js
var import_react$34, import_react_dom$1, import_prop_types, TOOLTIP_GAP, Tooltip;
var init_Tooltip$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
	init_helper();
	init_theme();
	TOOLTIP_GAP = 11;
	Tooltip = function(_super) {
		__extends(Tooltip, _super);
		function Tooltip() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = import_react$34.createRef();
			_this.overlayContainerRef = import_react$34.createRef();
			_this.state = { currentVisible: !!_this.props.defaultVisible };
			_this.show = function() {
				if (_this.props.disabled) return;
				_this.setState({ currentVisible: true }, function() {
					_this.props.onVisibleChange(true);
				});
			};
			_this.hide = function() {
				if (!_this.isVisible()) return;
				_this.setState({ currentVisible: false }, function() {
					_this.props.onVisibleChange(false);
				});
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, className = _b.className, style = _b.style, prefixCls = _b.prefixCls, title = _b.title, placement = _b.placement, children = _b.children, arrowClassName = _b.arrowClassName, overlayClassName = _b.overlayClassName, overlayStyle = _b.overlayStyle, arrowStyle = _b.arrowStyle, offset = _b.offset, zIndex = _b.zIndex;
				var wrapperCls = classNames(prefixCls, className, prefixCls + "-wrapper");
				var overlayCls = classNames(prefixCls + "-content", overlayClassName);
				var overlayStyleWithOffset = __assign(__assign({}, overlayStyle), { transform: "translate" + (placement === "top" || placement === "bottom" ? "X" : "Y") + "(" + offset + "px)" });
				var arrowCls = classNames(prefixCls + "-arrow", arrowClassName, prefixCls + "-arrow-" + placement);
				var overlayContainerCls = classNames(prefixCls + "-container", (_a = {}, _a[prefixCls + "-container-visible"] = _this.isVisible(), _a));
				var overlayContainerStyle = _this.calcOverlayContainerPosition();
				return h("div", {
					className: wrapperCls,
					style,
					onTouchStart: _this.show,
					ref: _this.rootRef
				}, children, import_react_dom$1.createPortal(h("div", {
					className: overlayContainerCls,
					ref: _this.overlayContainerRef,
					style: __assign({ zIndex }, overlayContainerStyle)
				}, h("div", {
					className: overlayCls,
					style: overlayStyleWithOffset
				}, title), h("div", {
					className: arrowCls,
					style: arrowStyle
				})), document.body));
			};
			return _this;
		}
		Tooltip.getDerivedStateFromProps = function(props, state) {
			if (props.disabled) return { currentVisible: false };
			return null;
		};
		Tooltip.prototype.isVisible = function() {
			var _a = this.props, forceVisible = _a.visible;
			if (_a.disabled) return false;
			var stateVisible = this.state.currentVisible;
			return typeof forceVisible === "boolean" ? forceVisible : stateVisible;
		};
		Tooltip.prototype.calcOverlayContainerPosition = function() {
			var rootDom = this.rootRef.current;
			var containerDom = this.overlayContainerRef.current;
			if (!rootDom || !containerDom) return {
				left: "0px",
				top: "0px"
			};
			var _a = rootDom.getBoundingClientRect(), leftX = _a.left, rightX = _a.right, topY = _a.top, bottomY = _a.bottom;
			var _b = containerDom.getBoundingClientRect(), width = _b.width, height = _b.height;
			var _c = this.props, placement = _c.placement, containerOffsetX = _c.containerOffsetX, containerOffsetY = _c.containerOffsetY;
			var centerX = (leftX + rightX) / 2;
			var centerY = (topY + bottomY) / 2;
			var resultLeft = window.pageXOffset + containerOffsetX;
			var resultTop = window.pageYOffset + containerOffsetY;
			if (placement === "bottom") {
				resultLeft += centerX - width / 2;
				resultTop += bottomY + TOOLTIP_GAP;
			} else if (placement === "top") {
				resultLeft += centerX - width / 2;
				resultTop += topY - TOOLTIP_GAP - height;
			} else if (placement === "left") {
				resultLeft += leftX - TOOLTIP_GAP - width;
				resultTop += centerY - height / 2;
			} else if (placement === "right") {
				resultLeft += rightX + TOOLTIP_GAP;
				resultTop += centerY - height / 2;
			}
			return {
				left: resultLeft + "px",
				top: resultTop + "px"
			};
		};
		Tooltip.prototype.componentDidMount = function() {
			this.forceUpdate();
			document.addEventListener("touchmove", this.hide);
			document.addEventListener("touchend", this.hide);
			document.addEventListener("touchcancel", this.hide);
		};
		Tooltip.prototype.componentWillUnmount = function() {
			document.removeEventListener("touchmove", this.hide);
			document.removeEventListener("touchend", this.hide);
			document.removeEventListener("touchcancel", this.hide);
		};
		Tooltip.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Tooltip;
	}(import_react$34.Component);
	Tooltip.defaultProps = {
		prefixCls: "dui-m-tooltip",
		title: "",
		placement: "bottom",
		onVisibleChange: emptyFn,
		disabled: false,
		offset: 0,
		containerOffsetX: 0,
		containerOffsetY: 0
	};
	Tooltip.propTypes = {
		prefixCls: import_prop_types.string,
		style: import_prop_types.object,
		className: import_prop_types.string,
		placement: import_prop_types.string,
		title: import_prop_types.node,
		defaultVisible: import_prop_types.bool,
		visible: import_prop_types.bool,
		onVisibleChange: import_prop_types.func,
		overlayStyle: import_prop_types.object,
		overlayClassName: import_prop_types.string,
		disabled: import_prop_types.bool,
		arrowStyle: import_prop_types.object,
		arrowClassName: import_prop_types.string,
		offset: import_prop_types.number,
		containerOffsetX: import_prop_types.number,
		containerOffsetY: import_prop_types.number,
		zIndex: import_prop_types.number
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/Tooltip/index.js
var Tooltip_default;
var init_Tooltip = __esmMin((() => {
	init_style();
	init_Tooltip$1();
	injectStyle("components/Tooltip/style/index.css", "[data-duim-1-9-0~=\"dui-m-tooltip\"]{-webkit-user-select:none;-moz-user-select:none;user-select:none}[data-duim-1-9-0~=\"dui-m-tooltip-wrapper\"]{display:inline-block;position:relative}[data-duim-1-9-0~=\"dui-m-tooltip-container\"]{position:absolute;visibility:hidden;-webkit-transition-property:opacity,visibility;transition-property:opacity,visibility;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:linear;transition-timing-function:linear;z-index:9995;opacity:0;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-size:medium}[data-duim-1-9-0~=\"dui-m-tooltip-container-visible\"]{visibility:visible;opacity:1}[data-duim-1-9-0~=\"dui-m-tooltip-content\"]{display:inline-block;padding:8px 12px;font-size:14px;line-height:20px;border:1px solid var(--border-medium,rgba(0,0,0,.08));border-radius:8px;background:var(--bg-lv3-default,#fff);color:var(--text-ultrastrong,rgba(0,0,0,.9));-webkit-box-shadow:0 4px 10px 0 rgba(0,0,0,.16);box-shadow:0 4px 10px 0 rgba(0,0,0,.16);word-break:break-word}[data-duim-1-9-0~=\"dui-m-tooltip-arrow\"]{position:absolute;border-left:1px solid var(--border-medium,rgba(0,0,0,.08));border-top:1px solid var(--border-medium,rgba(0,0,0,.08));border-top-left-radius:3px;border-right:1px solid transparent;border-bottom:1px solid transparent;width:9px;height:9px;background:var(--bg-lv3-default,#fff)}[data-duim-1-9-0~=\"dui-m-tooltip-arrow-top\"]{margin-top:-1px;top:100%;left:50%;-webkit-transform:translate(-50%,-50%) rotate(225deg);transform:translate(-50%,-50%) rotate(225deg)}[data-duim-1-9-0~=\"dui-m-tooltip-arrow-right\"]{margin-right:-1px;top:50%;right:100%;-webkit-transform:translate(50%,-50%) rotate(-45deg);transform:translate(50%,-50%) rotate(-45deg)}[data-duim-1-9-0~=\"dui-m-tooltip-arrow-bottom\"]{margin-bottom:-1px;bottom:100%;left:50%;-webkit-transform:translate(-50%,50%) rotate(45deg);transform:translate(-50%,50%) rotate(45deg)}[data-duim-1-9-0~=\"dui-m-tooltip-arrow-left\"]{margin-left:-1px;top:50%;left:100%;-webkit-transform:translate(-50%,-50%) rotate(135deg);transform:translate(-50%,-50%) rotate(135deg)}");
	Tooltip_default = Tooltip;
})), import_react$33, import_react_dom, BottomModal;
var init_BottomModal$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_theme();
	init_preventScrollPenetrate();
	init_keepDom();
	init_Button();
	BottomModal = function(_super) {
		__extends(BottomModal, _super);
		function BottomModal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a, _b, _c;
				var _d = _this.props, prefixCls = _d.prefixCls, className = _d.className, style = _d.style, visible = _d.visible, zIndex = _d.zIndex, testId = _d.testId, mask = _d.mask, preventScrollPenetrate = _d.preventScrollPenetrate, content = _d.content, closeClassName = _d.closeClassName, closeStyle = _d.closeStyle, onClose = _d.onClose;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a));
				var maskClasses = classNames(prefixCls + "-mask", (_b = {}, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var containerClasses = classNames(prefixCls + "-container", (_c = {}, _c[prefixCls + "-container-no-mask"] = !mask, _c));
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom.createPortal(h(PreventScrollPenetrateContainer, {
					disabled: typeof preventScrollPenetrate === "boolean" ? !preventScrollPenetrate : !mask,
					className: containerClasses,
					style: { zIndex }
				}, mask && h("div", { className: maskClasses }), h(PreventScrollPenetrateContainer, {
					disabled: typeof preventScrollPenetrate === "boolean" ? !preventScrollPenetrate : mask,
					className: classes,
					style,
					"data-testid": testId
				}, h("div", {
					className: classNames(prefixCls + "-close", closeClassName),
					style: closeStyle,
					onClick: onClose
				}), _this.renderHeader(classNames), content && h("div", { className: classNames(prefixCls + "-content") }, content), _this.renderFooter(classNames))), document.body);
			};
			return _this;
		}
		BottomModal.prototype.renderHeader = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, title = _a.title, headerClassName = _a.headerClassName, headerStyle = _a.headerStyle, headerType = _a.headerType, icon = _a.icon, titleClassName = _a.titleClassName, titleStyle = _a.titleStyle, description = _a.description, descriptionClassName = _a.descriptionClassName, descriptionStyle = _a.descriptionStyle;
			if (!(title || icon || description)) return null;
			var titleElement = title && h("div", {
				className: classNames(prefixCls + "-header-title", prefixCls + "-header-title-" + headerType, titleClassName),
				style: titleStyle
			}, title);
			var descElement = description && h("div", {
				className: classNames(prefixCls + "-header-desc", prefixCls + "-header-desc-" + headerType, descriptionClassName),
				style: descriptionStyle
			}, description);
			var iconElement = icon && h("div", {
				className: classNames(prefixCls + "-header-icon", prefixCls + "-header-icon-" + headerType),
				style: typeof icon === "string" ? { backgroundImage: "url(\"" + icon + "\")" } : void 0
			}, typeof icon !== "string" && icon);
			var headerCls = classNames(prefixCls + "-header", prefixCls + "-header-" + headerType, headerClassName);
			if (headerType === "spread") return h("div", {
				className: headerCls,
				style: headerStyle
			}, iconElement, titleElement, descElement);
			if (headerType === "compact") return h("div", {
				className: headerCls,
				style: headerStyle
			}, iconElement, (titleElement || descElement) && h("div", { className: classNames(prefixCls + "-header-text-container") }, titleElement, descElement));
			return null;
		};
		BottomModal.prototype.renderFooter = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, primaryAction = _a.primaryAction, onClickPrimaryAction = _a.onClickPrimaryAction, secondaryAction = _a.secondaryAction, onClickSecondaryAction = _a.onClickSecondaryAction, footerClassName = _a.footerClassName, footerStyle = _a.footerStyle, primaryActionButtonType = _a.primaryActionButtonType, primaryActionClassName = _a.primaryActionClassName, primaryActionStyle = _a.primaryActionStyle, secondaryActionClassName = _a.secondaryActionClassName, secondaryActionStyle = _a.secondaryActionStyle;
			return primaryAction && h("div", {
				className: classNames(prefixCls + "-footer", footerClassName),
				style: footerStyle
			}, h("div", {
				className: classNames(prefixCls + "-footer-primary-action", primaryActionClassName),
				style: primaryActionStyle,
				onClick: onClickPrimaryAction
			}, typeof primaryAction === "string" ? h(Button, {
				type: primaryActionButtonType,
				size: "large"
			}, primaryAction) : primaryAction), secondaryAction && h("div", {
				className: classNames(prefixCls + "-footer-secondary-action", secondaryActionClassName),
				style: secondaryActionStyle,
				onClick: onClickSecondaryAction
			}, secondaryAction));
		};
		BottomModal.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return BottomModal;
	}(import_react$33.Component);
	BottomModal.defaultProps = {
		prefixCls: "dui-m-bottommodal",
		mask: true,
		headerType: "spread",
		primaryActionButtonType: "primary"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/BottomModal/show.js
var show_default;
var init_show = __esmMin((() => {
	init_BottomModal$1();
	init_show$5();
	init_helper();
	show_default = wrapWithConfigDefaults(function(config) {
		return showWithTransition({
			Component: BottomModal,
			transitionDuration: 200,
			autoClose: false,
			props: config,
			injectClosePropNames: [
				"onClose",
				"onClickPrimaryAction",
				"onClickSecondaryAction"
			],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/components/BottomModal/index.js
var BottomModal_default;
var init_BottomModal = __esmMin((() => {
	init_style();
	init_BottomModal$1();
	init_show();
	injectStyle("components/BottomModal/style/index.css", "@-webkit-keyframes dui-m-buttommodal-slide-in{0%{-webkit-transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px));transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px))}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes dui-m-buttommodal-slide-in{0%{-webkit-transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px));transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px))}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes dui-m-buttommodal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-buttommodal-fade-in{0%{opacity:0}to{opacity:1}}[data-duim-1-9-0~=\"dui-m-bottommodal\"]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:32px;margin-bottom:32px;position:relative;z-index:1;width:calc(100vw - 32px);max-height:calc(100vh - 142px);border-radius:20px;background:var(--bg-lv3-default,#fff);-webkit-animation:dui-m-buttommodal-slide-in .2s ease-out;animation:dui-m-buttommodal-slide-in .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08);box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08);pointer-events:auto}[data-duim-1-9-0~=\"dui-m-bottommodal-hidden\"]{-webkit-transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px));transform:translate3d(0,100%,0) translateY(calc(env(safe-area-inset-bottom) + 32px))}[data-duim-1-9-0~=\"dui-m-bottommodal-container\"]{position:fixed;z-index:9998;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column;flex-flow:column;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}[data-duim-1-9-0~=\"dui-m-bottommodal-container-no-mask\"]{pointer-events:none}[data-duim-1-9-0~=\"dui-m-bottommodal-mask\"]{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);-webkit-animation:dui-m-buttommodal-fade-in .2s linear;animation:dui-m-buttommodal-fade-in .2s linear;-webkit-transition:all .2s linear;transition:all .2s linear}[data-duim-1-9-0~=\"dui-m-bottommodal-mask-hidden\"]{opacity:0;visibility:hidden}[data-duim-1-9-0~=\"dui-m-bottommodal-close\"],[data-duim-1-9-0~=\"dui-m-bottommodal-header-icon\"]{background-size:contain;background-repeat:no-repeat;background-position:50%}[data-duim-1-9-0~=\"dui-m-bottommodal-close\"]{position:absolute;top:12px;right:12px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg clip-path='url(%23A)'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23334d66' fill-opacity='.06'/%3E%3Cpath fill-rule='evenodd' d='M8.283 7.227L7.222 8.288 10.935 12l-3.712 3.712 1.061 1.061 3.712-3.712 3.712 3.712 1.061-1.061L13.056 12l3.712-3.712-1.061-1.061-3.712 3.712-3.712-3.712z' fill-opacity='.48'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='A'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E\");width:24px;height:24px;-webkit-filter:var(--duim-invert-filter,none);filter:var(--duim-invert-filter,none)}[data-duim-1-9-0~=\"dui-m-bottommodal-close\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-bottommodal-header\"]{display:-webkit-box;display:-webkit-flex;display:flex;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}[data-duim-1-9-0~=\"dui-m-bottommodal-header-spread\"]{-webkit-box-orient:vertical;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}[data-duim-1-9-0~=\"dui-m-bottommodal-header-compact\"],[data-duim-1-9-0~=\"dui-m-bottommodal-header-spread\"]{-webkit-box-direction:normal;-webkit-box-align:center;-webkit-align-items:center;align-items:center}[data-duim-1-9-0~=\"dui-m-bottommodal-header-compact\"]{-webkit-box-orient:horizontal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}[data-duim-1-9-0~=\"dui-m-bottommodal-header-icon-spread\"]{width:72px;height:72px;margin-bottom:8px}[data-duim-1-9-0~=\"dui-m-bottommodal-header-icon-compact\"]{width:32px;height:32px;margin-right:8px;-webkit-flex-shrink:0;flex-shrink:0}[data-duim-1-9-0~=\"dui-m-bottommodal-header-title\"]{color:var(--text-ultrastrong,rgba(0,0,0,.9));line-height:24px;margin-bottom:4px}[data-duim-1-9-0~=\"dui-m-bottommodal-header-title-spread\"]{font-size:18px;font-weight:600}[data-duim-1-9-0~=\"dui-m-bottommodal-header-title-compact\"]{font-size:17px;font-weight:500}[data-duim-1-9-0~=\"dui-m-bottommodal-header-desc\"]{color:var(--text-strong,rgba(0,0,0,.76))}[data-duim-1-9-0~=\"dui-m-bottommodal-header-desc-spread\"]{font-size:14px;line-height:20px;text-align:center}[data-duim-1-9-0~=\"dui-m-bottommodal-header-desc-compact\"]{font-size:12px;line-height:16px}[data-duim-1-9-0~=\"dui-m-bottommodal-content\"]{width:100%;overflow:auto;margin-top:24px;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-bottommodal-footer\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:24px}[data-duim-1-9-0~=\"dui-m-bottommodal-footer-primary-action\"] [data-duim-1-9-0~=\"dui-m-button\"]{min-width:200px}[data-duim-1-9-0~=\"dui-m-bottommodal-footer-secondary-action\"]{color:var(--text-link,#175ceb);font-size:14px;line-height:20px;margin-top:16px}[data-duim-1-9-0~=\"dui-m-bottommodal-footer-secondary-action\"]:active{opacity:.5}");
	BottomModal.show = show_default;
	BottomModal_default = BottomModal;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+dui-mobile@1.9.0_@_a4ad72a125eea3188deadca27b165e06/node_modules/@tencent/dui-mobile/esm/index.js
var init_esm = __esmMin((() => {
	init_polyfill();
	init_createElement();
	init_Button();
	init_style();
	init_theme();
	init_Modal();
	init_Loading();
	init_helper();
	init_show$5();
	init_Input();
	init_util();
	init_Divider();
	init_locale();
	init_ActionSheet();
	init_Checkbox();
	init_Snackbar();
	init_PullPanel();
	init_context();
	init_Tooltip();
	init_PullPanel$1();
	init_BottomModal();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/definitions.js
function loadFeatures(features) {
	for (var key in features) {
		var Component = features[key];
		if (Component !== null) featureDefinitions[key].Component = Component;
	}
}
var createDefinition, featureDefinitions;
var init_definitions = __esmMin((() => {
	createDefinition = function(propNames) {
		return { isEnabled: function(props) {
			return propNames.some(function(name) {
				return !!props[name];
			});
		} };
	};
	featureDefinitions = {
		measureLayout: createDefinition([
			"layout",
			"layoutId",
			"drag",
			"_layoutResetTransform"
		]),
		animation: createDefinition([
			"animate",
			"exit",
			"variants",
			"whileHover",
			"whileTap",
			"whileFocus",
			"whileDrag"
		]),
		exit: createDefinition(["exit"]),
		drag: createDefinition(["drag", "dragControls"]),
		focus: createDefinition(["whileFocus"]),
		hover: createDefinition([
			"whileHover",
			"onHoverStart",
			"onHoverEnd"
		]),
		tap: createDefinition([
			"whileTap",
			"onTap",
			"onTapStart",
			"onTapCancel"
		]),
		pan: createDefinition([
			"onPan",
			"onPanStart",
			"onPanSessionStart",
			"onPanEnd"
		]),
		layoutAnimation: createDefinition(["layout", "layoutId"])
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/hey-listen@1.0.8/node_modules/hey-listen/dist/hey-listen.es.js
var warning, invariant;
var init_hey_listen_es = __esmMin((() => {
	warning = function() {};
	invariant = function() {};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/LazyContext.js
var import_react$32, LazyContext;
var init_LazyContext = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	LazyContext = (0, import_react$32.createContext)({ strict: false });
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/use-features.js
/**
* Load features via renderless components based on the provided MotionProps.
*/
function useFeatures(props, visualElement, preloadedFeatures) {
	var features = [];
	(0, import_react$31.useContext)(LazyContext);
	if (!visualElement) return null;
	for (var i = 0; i < numFeatures; i++) {
		var name_1 = featureNames[i];
		var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component = _a.Component;
		/**
		* It might be possible in the future to use this moment to
		* dynamically request functionality. In initial tests this
		* was producing a lot of duplication amongst bundles.
		*/
		if (isEnabled(props) && Component) features.push(import_react$30.createElement(Component, __assign({ key: name_1 }, props, { visualElement })));
	}
	return features;
}
var import_react$30, import_react$31, featureNames, numFeatures;
var init_use_features = __esmMin((() => {
	init_tslib_es6();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_definitions();
	init_LazyContext();
	featureNames = Object.keys(featureDefinitions);
	numFeatures = featureNames.length;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/MotionConfigContext.js
var import_react$29, MotionConfigContext;
var init_MotionConfigContext = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	MotionConfigContext = (0, import_react$29.createContext)({
		transformPagePoint: function(p) {
			return p;
		},
		isStatic: false
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/MotionContext/index.js
function useVisualElementContext() {
	return (0, import_react$28.useContext)(MotionContext).visualElement;
}
var import_react$28, MotionContext;
var init_MotionContext = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	MotionContext = (0, import_react$28.createContext)({});
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/PresenceContext.js
var import_react$27, PresenceContext;
var init_PresenceContext = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	PresenceContext = (0, import_react$27.createContext)(null);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/use-constant.js
/**
* Creates a constant value over the lifecycle of a component.
*
* Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
* a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
* you can ensure that initialisers don't execute twice or more.
*/
function useConstant(init) {
	var ref = (0, import_react$26.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
var import_react$26;
var init_use_constant = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.js
/**
* When a component is the child of `AnimatePresence`, it can use `usePresence`
* to access information about whether it's still present in the React tree.
*
* ```jsx
* import { usePresence } from "framer-motion"
*
* export const Component = () => {
*   const [isPresent, safeToRemove] = usePresence()
*
*   useEffect(() => {
*     !isPresent && setTimeout(safeToRemove, 1000)
*   }, [isPresent])
*
*   return <div />
* }
* ```
*
* If `isPresent` is `false`, it means that a component has been removed the tree, but
* `AnimatePresence` won't really remove it until `safeToRemove` has been called.
*
* @public
*/
function usePresence() {
	var context = (0, import_react$25.useContext)(PresenceContext);
	if (context === null) return [true, null];
	var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
	var id = useUniqueId();
	(0, import_react$25.useEffect)(function() {
		return register(id);
	}, []);
	var safeToRemove = function() {
		return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
	};
	return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
function isPresent(context) {
	return context === null ? true : context.isPresent;
}
var import_react$25, counter, incrementId, useUniqueId;
var init_use_presence = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_PresenceContext();
	init_use_constant();
	counter = 0;
	incrementId = function() {
		return counter++;
	};
	useUniqueId = function() {
		return useConstant(incrementId);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/LayoutGroupContext.js
var import_react$24, LayoutGroupContext;
var init_LayoutGroupContext = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	LayoutGroupContext = (0, import_react$24.createContext)(null);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/is-browser.js
var isBrowser;
var init_is_browser = __esmMin((() => {
	isBrowser = typeof window !== "undefined";
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.js
var import_react$23, useIsomorphicLayoutEffect;
var init_use_isomorphic_effect = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_is_browser();
	useIsomorphicLayoutEffect = isBrowser ? import_react$23.useLayoutEffect : import_react$23.useEffect;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.js
function useLayoutId(_a) {
	var layoutId = _a.layoutId;
	var layoutGroupId = (0, import_react$22.useContext)(LayoutGroupContext);
	return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useVisualElement(Component, visualState, props, createVisualElement) {
	var config = (0, import_react$22.useContext)(MotionConfigContext);
	var lazyContext = (0, import_react$22.useContext)(LazyContext);
	var parent = useVisualElementContext();
	var presenceContext = (0, import_react$22.useContext)(PresenceContext);
	var layoutId = useLayoutId(props);
	var visualElementRef = (0, import_react$22.useRef)(void 0);
	/**
	* If we haven't preloaded a renderer, check to see if we have one lazy-loaded
	*/
	if (!createVisualElement) createVisualElement = lazyContext.renderer;
	if (!visualElementRef.current && createVisualElement) visualElementRef.current = createVisualElement(Component, {
		visualState,
		parent,
		props: __assign(__assign({}, props), { layoutId }),
		presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
		blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false
	});
	var visualElement = visualElementRef.current;
	useIsomorphicLayoutEffect(function() {
		if (!visualElement) return;
		visualElement.setProps(__assign(__assign(__assign({}, config), props), { layoutId }));
		visualElement.isPresent = isPresent(presenceContext);
		visualElement.isPresenceRoot = !parent || parent.presenceId !== (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id);
		/**
		* Fire a render to ensure the latest state is reflected on-screen.
		*/
		visualElement.syncRender();
	});
	(0, import_react$22.useEffect)(function() {
		var _a;
		if (!visualElement) return;
		/**
		* In a future refactor we can replace the features-as-components and
		* have this loop through them all firing "effect" listeners
		*/
		(_a = visualElement.animationState) === null || _a === void 0 || _a.animateChanges();
	});
	useIsomorphicLayoutEffect(function() {
		return function() {
			return visualElement === null || visualElement === void 0 ? void 0 : visualElement.notifyUnmount();
		};
	}, []);
	return visualElement;
}
var import_react$22;
var init_use_visual_element = __esmMin((() => {
	init_tslib_es6();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_PresenceContext();
	init_use_presence();
	init_LayoutGroupContext();
	init_MotionContext();
	init_use_isomorphic_effect();
	init_MotionConfigContext();
	init_LazyContext();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/is-ref-object.js
function isRefObject(ref) {
	return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
var init_is_ref_object = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.js
/**
* Creates a ref function that, when called, hydrates the provided
* external ref and VisualElement.
*/
function useMotionRef(visualState, visualElement, externalRef) {
	return (0, import_react$21.useCallback)(
		function(instance) {
			var _a;
			instance && ((_a = visualState.mount) === null || _a === void 0 || _a.call(visualState, instance));
			if (visualElement) instance ? visualElement.mount(instance) : visualElement.unmount();
			if (externalRef) {
				if (typeof externalRef === "function") externalRef(instance);
				else if (isRefObject(externalRef)) externalRef.current = instance;
			}
		},
		/**
		* Only pass a new ref callback to React if we've received a visual element
		* factory. Otherwise we'll be mounting/remounting every time externalRef
		* or other dependencies change.
		*/
		[visualElement]
	);
}
var import_react$21;
var init_use_motion_ref = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_is_ref_object();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/variants.js
/**
* Decides if the supplied variable is an array of variant labels
*/
function isVariantLabels(v) {
	return Array.isArray(v);
}
/**
* Decides if the supplied variable is variant label
*/
function isVariantLabel(v) {
	return typeof v === "string" || isVariantLabels(v);
}
/**
* Creates an object containing the latest state of every MotionValue on a VisualElement
*/
function getCurrent(visualElement) {
	var current = {};
	visualElement.forEachValue(function(value, key) {
		return current[key] = value.get();
	});
	return current;
}
/**
* Creates an object containing the latest velocity of every MotionValue on a VisualElement
*/
function getVelocity$1(visualElement) {
	var velocity = {};
	visualElement.forEachValue(function(value, key) {
		return velocity[key] = value.getVelocity();
	});
	return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
	var _a;
	if (currentValues === void 0) currentValues = {};
	if (currentVelocity === void 0) currentVelocity = {};
	if (typeof definition === "string") definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
	return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement, definition, custom) {
	var props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
function checkIfControllingVariants(props) {
	var _a;
	return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
	return Boolean(checkIfControllingVariants(props) || props.variants);
}
var init_variants = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/MotionContext/utils.js
function getCurrentTreeVariants(props, context) {
	if (checkIfControllingVariants(props)) {
		var initial = props.initial, animate = props.animate;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate) ? animate : void 0
		};
	}
	return props.inherit !== false ? context : {};
}
var init_utils$6 = __esmMin((() => {
	init_variants();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/MotionContext/create.js
function useCreateMotionContext(props, isStatic) {
	var _a = getCurrentTreeVariants(props, (0, import_react$20.useContext)(MotionContext)), initial = _a.initial, animate = _a.animate;
	return (0, import_react$20.useMemo)(
		function() {
			return {
				initial,
				animate
			};
		},
		/**
		* Only break memoisation in static mode
		*/
		isStatic ? [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)] : []
	);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}
var import_react$20;
var init_create = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_MotionContext();
	init_utils$6();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/index.js
/**
* Create a `motion` component.
*
* This function accepts a Component argument, which can be either a string (ie "div"
* for `motion.div`), or an actual React component.
*
* Alongside this is a config option which provides a way of rendering the provided
* component "offline", or outside the React render cycle.
*
* @internal
*/
function createMotionComponent(_a) {
	var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, useRender = _a.useRender, useVisualState = _a.useVisualState, Component = _a.Component;
	preloadedFeatures && loadFeatures(preloadedFeatures);
	function MotionComponent(props, externalRef) {
		/**
		* If we're rendering in a static environment, we only visually update the component
		* as a result of a React-rerender rather than interactions or animations. This
		* means we don't need to load additional memory structures like VisualElement,
		* or any gesture/animation features.
		*/
		var isStatic = (0, import_react$19.useContext)(MotionConfigContext).isStatic;
		var features = null;
		/**
		* Create the tree context. This is memoized and will only trigger renders
		* when the current tree variant changes in static mode.
		*/
		var context = useCreateMotionContext(props, isStatic);
		/**
		*
		*/
		var visualState = useVisualState(props, isStatic);
		if (!isStatic && isBrowser) {
			/**
			* Create a VisualElement for this component. A VisualElement provides a common
			* interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
			* providing a way of rendering to these APIs outside of the React render loop
			* for more performant animations and interactions
			*/
			context.visualElement = useVisualElement(Component, visualState, props, createVisualElement);
			/**
			* Load Motion gesture and animation features. These are rendered as renderless
			* components so each feature can optionally make use of React lifecycle methods.
			*
			* TODO: The intention is to move these away from a React-centric to a
			* VisualElement-centric lifecycle scheme.
			*/
			features = useFeatures(props, context.visualElement, preloadedFeatures);
		}
		/**
		* The mount order and hierarchy is specific to ensure our element ref
		* is hydrated by the time features fire their effects.
		*/
		return import_react$18.createElement(import_react$18.Fragment, null, import_react$18.createElement(MotionContext.Provider, { value: context }, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic)), features);
	}
	return (0, import_react$19.forwardRef)(MotionComponent);
}
var import_react$18, import_react$19;
var init_motion$1 = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_use_features();
	init_MotionConfigContext();
	init_MotionContext();
	init_use_visual_element();
	init_use_motion_ref();
	init_create();
	init_definitions();
	init_is_browser();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/motion-proxy.js
/**
* Convert any React component into a `motion` component. The provided component
* **must** use `React.forwardRef` to the underlying DOM component you want to animate.
*
* ```jsx
* const Component = React.forwardRef((props, ref) => {
*   return <div ref={ref} />
* })
*
* const MotionComponent = motion(Component)
* ```
*
* @public
*/
function createMotionProxy(createConfig) {
	function custom(Component, customMotionComponentConfig) {
		if (customMotionComponentConfig === void 0) customMotionComponentConfig = {};
		return createMotionComponent(createConfig(Component, customMotionComponentConfig));
	}
	/**
	* A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
	* Rather than generating them anew every render.
	*/
	var componentCache = /* @__PURE__ */ new Map();
	return new Proxy(custom, { 
	/**
	* Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
	* The prop name is passed through as `key` and we can use that to generate a `motion`
	* DOM component with that name.
	*/
get: function(_target, key) {
		/**
		* If this element doesn't exist in the component cache, create it and cache.
		*/
		if (!componentCache.has(key)) componentCache.set(key, custom(key));
		return componentCache.get(key);
	} });
}
var init_motion_proxy = __esmMin((() => {
	init_motion$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.js
var lowercaseSVGElements;
var init_lowercase_elements = __esmMin((() => {
	lowercaseSVGElements = [
		"animate",
		"circle",
		"defs",
		"desc",
		"ellipse",
		"g",
		"image",
		"line",
		"filter",
		"marker",
		"mask",
		"metadata",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"rect",
		"stop",
		"svg",
		"switch",
		"symbol",
		"text",
		"tspan",
		"use",
		"view"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.js
function isSVGComponent(Component) {
	if (typeof Component !== "string" || Component.includes("-")) return false;
	else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) return true;
	return false;
}
var init_is_svg_component = __esmMin((() => {
	init_lowercase_elements();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/scale-correction.js
/**
* @internal
*/
function addScaleCorrection(correctors) {
	for (var key in correctors) valueScaleCorrection[key] = correctors[key];
}
var valueScaleCorrection;
var init_scale_correction = __esmMin((() => {
	valueScaleCorrection = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/transform.js
/**
* A function to use with Array.sort to sort transform keys by their default order.
*/
function sortTransformProps(a, b) {
	return transformProps.indexOf(a) - transformProps.indexOf(b);
}
function isTransformProp(key) {
	return transformPropSet.has(key);
}
function isTransformOriginProp(key) {
	return transformOriginProps.has(key);
}
var transformAxes, order, transformProps, transformPropSet, transformOriginProps;
var init_transform = __esmMin((() => {
	transformAxes = [
		"",
		"X",
		"Y",
		"Z"
	];
	order = [
		"translate",
		"scale",
		"rotate",
		"skew"
	];
	transformProps = [
		"transformPerspective",
		"x",
		"y",
		"z"
	];
	order.forEach(function(operationKey) {
		return transformAxes.forEach(function(axesKey) {
			return transformProps.push(operationKey + axesKey);
		});
	});
	transformPropSet = new Set(transformProps);
	transformOriginProps = /* @__PURE__ */ new Set([
		"originX",
		"originY",
		"originZ"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.js
function isForcedMotionValue(key, _a) {
	var layout = _a.layout, layoutId = _a.layoutId;
	return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!valueScaleCorrection[key] || key === "opacity");
}
var init_is_forced_motion_value = __esmMin((() => {
	init_scale_correction();
	init_transform();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/value/utils/is-motion-value.js
var isMotionValue;
var init_is_motion_value = __esmMin((() => {
	isMotionValue = function(value) {
		return value !== null && typeof value === "object" && value.getVelocity;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/build-transform.js
/**
* Build a CSS transform style from individual x/y/scale etc properties.
*
* This outputs with a default order of transforms/scales/rotations, this can be customised by
* providing a transformTemplate function.
*/
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
	var transform = _a.transform, transformKeys = _a.transformKeys;
	var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
	var transformString = "";
	transformKeys.sort(sortTransformProps);
	var transformHasZ = false;
	var numTransformKeys = transformKeys.length;
	for (var i = 0; i < numTransformKeys; i++) {
		var key = transformKeys[i];
		transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
		if (key === "z") transformHasZ = true;
	}
	if (!transformHasZ && enableHardwareAcceleration) transformString += "translateZ(0)";
	else transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (allowTransformNone && transformIsDefault) transformString = "none";
	return transformString;
}
/**
* Build a transformOrigin style. Uses the same defaults as the browser for
* undefined origins.
*/
function buildTransformOrigin(_a) {
	var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
	return originX + " " + originY + " " + originZ;
}
var translateAlias;
var init_build_transform = __esmMin((() => {
	init_transform();
	translateAlias = {
		x: "translateX",
		y: "translateY",
		z: "translateZ",
		transformPerspective: "perspective"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.js
/**
* Returns true if the provided key is a CSS variable
*/
function isCSSVariable$1(key) {
	return key.startsWith("--");
}
var init_is_css_variable = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.js
var getValueAsType;
var init_get_as_type = __esmMin((() => {
	getValueAsType = function(value, type) {
		return type && typeof value === "number" ? type.transform(value) : value;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/utils.js
function isString(v) {
	return typeof v === "string";
}
var clamp$1, sanitize, floatRegex, colorRegex, singleColorRegex;
var init_utils$5 = __esmMin((() => {
	clamp$1 = function(min, max) {
		return function(v) {
			return Math.max(Math.min(v, max), min);
		};
	};
	sanitize = function(v) {
		return v % 1 ? Number(v.toFixed(5)) : v;
	};
	floatRegex = /(-)?([\d]*\.?[\d])+/g;
	colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
	singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/numbers/index.js
var number, alpha, scale;
var init_numbers = __esmMin((() => {
	init_tslib_es6();
	init_utils$5();
	number = {
		test: function(v) {
			return typeof v === "number";
		},
		parse: parseFloat,
		transform: function(v) {
			return v;
		}
	};
	alpha = __assign(__assign({}, number), { transform: clamp$1(0, 1) });
	scale = __assign(__assign({}, number), { default: 1 });
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/numbers/units.js
var createUnitType, degrees, percent, px, vh, vw, progressPercentage;
var init_units = __esmMin((() => {
	init_tslib_es6();
	init_utils$5();
	createUnitType = function(unit) {
		return {
			test: function(v) {
				return isString(v) && v.endsWith(unit) && v.split(" ").length === 1;
			},
			parse: parseFloat,
			transform: function(v) {
				return "" + v + unit;
			}
		};
	};
	degrees = createUnitType("deg");
	percent = createUnitType("%");
	px = createUnitType("px");
	vh = createUnitType("vh");
	vw = createUnitType("vw");
	progressPercentage = __assign(__assign({}, percent), {
		parse: function(v) {
			return percent.parse(v) / 100;
		},
		transform: function(v) {
			return percent.transform(v * 100);
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/color/utils.js
var isColorString, splitColor;
var init_utils$4 = __esmMin((() => {
	init_utils$5();
	isColorString = function(type, testProp) {
		return function(v) {
			return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
		};
	};
	splitColor = function(aName, bName, cName) {
		return function(v) {
			var _a;
			if (!isString(v)) return v;
			var _b = v.match(floatRegex), a = _b[0], b = _b[1], c = _b[2], alpha = _b[3];
			return _a = {}, _a[aName] = parseFloat(a), _a[bName] = parseFloat(b), _a[cName] = parseFloat(c), _a.alpha = alpha !== void 0 ? parseFloat(alpha) : 1, _a;
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/color/hsla.js
var hsla;
var init_hsla = __esmMin((() => {
	init_numbers();
	init_units();
	init_utils$5();
	init_utils$4();
	hsla = {
		test: isColorString("hsl", "hue"),
		parse: splitColor("hue", "saturation", "lightness"),
		transform: function(_a) {
			var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
			return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/color/rgba.js
var clampRgbUnit, rgbUnit, rgba;
var init_rgba = __esmMin((() => {
	init_tslib_es6();
	init_numbers();
	init_utils$5();
	init_utils$4();
	clampRgbUnit = clamp$1(0, 255);
	rgbUnit = __assign(__assign({}, number), { transform: function(v) {
		return Math.round(clampRgbUnit(v));
	} });
	rgba = {
		test: isColorString("rgb", "red"),
		parse: splitColor("red", "green", "blue"),
		transform: function(_a) {
			var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
			return "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/color/hex.js
function parseHex(v) {
	var r = "";
	var g = "";
	var b = "";
	var a = "";
	if (v.length > 5) {
		r = v.substr(1, 2);
		g = v.substr(3, 2);
		b = v.substr(5, 2);
		a = v.substr(7, 2);
	} else {
		r = v.substr(1, 1);
		g = v.substr(2, 1);
		b = v.substr(3, 1);
		a = v.substr(4, 1);
		r += r;
		g += g;
		b += b;
		a += a;
	}
	return {
		red: parseInt(r, 16),
		green: parseInt(g, 16),
		blue: parseInt(b, 16),
		alpha: a ? parseInt(a, 16) / 255 : 1
	};
}
var hex;
var init_hex = __esmMin((() => {
	init_rgba();
	init_utils$4();
	hex = {
		test: isColorString("#"),
		parse: parseHex,
		transform: rgba.transform
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/color/index.js
var color;
var init_color = __esmMin((() => {
	init_utils$5();
	init_hex();
	init_hsla();
	init_rgba();
	color = {
		test: function(v) {
			return rgba.test(v) || hex.test(v) || hsla.test(v);
		},
		parse: function(v) {
			if (rgba.test(v)) return rgba.parse(v);
			else if (hsla.test(v)) return hsla.parse(v);
			else return hex.parse(v);
		},
		transform: function(v) {
			return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/complex/index.js
function test(v) {
	var _a, _b, _c, _d;
	return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse$1(v) {
	var values = [];
	var numColors = 0;
	var colors = v.match(colorRegex);
	if (colors) {
		numColors = colors.length;
		v = v.replace(colorRegex, colorToken);
		values.push.apply(values, colors.map(color.parse));
	}
	var numbers = v.match(floatRegex);
	if (numbers) {
		v = v.replace(floatRegex, numberToken);
		values.push.apply(values, numbers.map(number.parse));
	}
	return {
		values,
		numColors,
		tokenised: v
	};
}
function parse(v) {
	return analyse$1(v).values;
}
function createTransformer(v) {
	var _a = analyse$1(v), values = _a.values, numColors = _a.numColors, tokenised = _a.tokenised;
	var numValues = values.length;
	return function(v) {
		var output = tokenised;
		for (var i = 0; i < numValues; i++) output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
		return output;
	};
}
function getAnimatableNone$1(v) {
	var parsed = parse(v);
	return createTransformer(v)(parsed.map(convertNumbersToZero));
}
var colorToken, numberToken, convertNumbersToZero, complex;
var init_complex = __esmMin((() => {
	init_color();
	init_numbers();
	init_utils$5();
	colorToken = "${c}";
	numberToken = "${n}";
	convertNumbersToZero = function(v) {
		return typeof v === "number" ? 0 : v;
	};
	complex = {
		test,
		parse,
		createTransformer,
		getAnimatableNone: getAnimatableNone$1
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/complex/filter.js
function applyDefaultFilter(v) {
	var _a = v.slice(0, -1).split("("), name = _a[0], value = _a[1];
	if (name === "drop-shadow") return v;
	var number = (value.match(floatRegex) || [])[0];
	if (!number) return v;
	var unit = value.replace(number, "");
	var defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit + ")";
}
var maxDefaults, functionRegex, filter;
var init_filter = __esmMin((() => {
	init_tslib_es6();
	init_complex();
	init_utils$5();
	maxDefaults = /* @__PURE__ */ new Set([
		"brightness",
		"contrast",
		"saturate",
		"opacity"
	]);
	functionRegex = /([a-z-]*)\(.*?\)/g;
	filter = __assign(__assign({}, complex), { getAnimatableNone: function(v) {
		var functions = v.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v;
	} });
}));
//#endregion
//#region ../../node_modules/.pnpm/style-value-types@4.1.4/node_modules/style-value-types/dist/es/index.js
var init_es$3 = __esmMin((() => {
	init_numbers();
	init_units();
	init_hsla();
	init_rgba();
	init_hex();
	init_color();
	init_complex();
	init_filter();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/type-int.js
var int;
var init_type_int = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	int = __assign(__assign({}, number), { transform: Math.round });
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/number.js
var numberValueTypes;
var init_number = __esmMin((() => {
	init_es$3();
	init_type_int();
	numberValueTypes = {
		borderWidth: px,
		borderTopWidth: px,
		borderRightWidth: px,
		borderBottomWidth: px,
		borderLeftWidth: px,
		borderRadius: px,
		radius: px,
		borderTopLeftRadius: px,
		borderTopRightRadius: px,
		borderBottomRightRadius: px,
		borderBottomLeftRadius: px,
		width: px,
		maxWidth: px,
		height: px,
		maxHeight: px,
		size: px,
		top: px,
		right: px,
		bottom: px,
		left: px,
		padding: px,
		paddingTop: px,
		paddingRight: px,
		paddingBottom: px,
		paddingLeft: px,
		margin: px,
		marginTop: px,
		marginRight: px,
		marginBottom: px,
		marginLeft: px,
		rotate: degrees,
		rotateX: degrees,
		rotateY: degrees,
		rotateZ: degrees,
		scale,
		scaleX: scale,
		scaleY: scale,
		scaleZ: scale,
		skew: degrees,
		skewX: degrees,
		skewY: degrees,
		distance: px,
		translateX: px,
		translateY: px,
		translateZ: px,
		x: px,
		y: px,
		z: px,
		perspective: px,
		transformPerspective: px,
		opacity: alpha,
		originX: progressPercentage,
		originY: progressPercentage,
		originZ: px,
		zIndex: int,
		fillOpacity: alpha,
		strokeOpacity: alpha,
		numOctaves: int
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/build-styles.js
function buildHTMLStyles(state, latestValues, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
	var _a;
	var style = state.style, vars = state.vars, transform = state.transform, transformKeys = state.transformKeys, transformOrigin = state.transformOrigin;
	transformKeys.length = 0;
	var hasTransform = false;
	var hasTransformOrigin = false;
	var transformIsNone = true;
	/**
	* Loop over all our latest animated values and decide whether to handle them
	* as a style or CSS variable.
	*
	* Transforms and transform origins are kept seperately for further processing.
	*/
	for (var key in latestValues) {
		var value = latestValues[key];
		/**
		* If this is a CSS variable we don't do any further processing.
		*/
		if (isCSSVariable$1(key)) {
			vars[key] = value;
			continue;
		}
		var valueType = numberValueTypes[key];
		var valueAsType = getValueAsType(value, valueType);
		if (isTransformProp(key)) {
			hasTransform = true;
			transform[key] = valueAsType;
			transformKeys.push(key);
			if (!transformIsNone) continue;
			if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0)) transformIsNone = false;
		} else if (isTransformOriginProp(key)) {
			transformOrigin[key] = valueAsType;
			hasTransformOrigin = true;
		} else if ((projection === null || projection === void 0 ? void 0 : projection.isHydrated) && (layoutState === null || layoutState === void 0 ? void 0 : layoutState.isHydrated) && valueScaleCorrection[key]) {
			var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
			/**
			* Scale-correctable values can define a number of other values to break
			* down into. For instance borderRadius needs applying to borderBottomLeftRadius etc
			*/
			var applyTo = valueScaleCorrection[key].applyTo;
			if (applyTo) {
				var num = applyTo.length;
				for (var i = 0; i < num; i++) style[applyTo[i]] = correctedValue;
			} else style[key] = correctedValue;
		} else style[key] = valueAsType;
	}
	if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
		style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : void 0);
		if (transformTemplate) style.transform = transformTemplate(transform, style.transform);
		style.transformOrigin = buildProjectionTransformOrigin(layoutState);
	} else {
		if (hasTransform) style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
		if (hasTransformOrigin) style.transformOrigin = buildTransformOrigin(transformOrigin);
	}
}
var init_build_styles = __esmMin((() => {
	init_scale_correction();
	init_build_transform();
	init_is_css_variable();
	init_transform();
	init_get_as_type();
	init_number();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.js
var createHtmlRenderState;
var init_create_render_state$1 = __esmMin((() => {
	createHtmlRenderState = function() {
		return {
			style: {},
			transform: {},
			transformKeys: [],
			transformOrigin: {},
			vars: {}
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/use-props.js
function copyRawValuesOnly(target, source, props) {
	for (var key in source) if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) target[key] = source[key];
}
function useInitialMotionValues(_a, visualState, isStatic) {
	var transformTemplate = _a.transformTemplate;
	return (0, import_react$17.useMemo)(function() {
		var state = createHtmlRenderState();
		buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, transformTemplate);
		var vars = state.vars, style = state.style;
		return __assign(__assign({}, vars), style);
	}, [visualState]);
}
function useStyle(props, visualState, isStatic) {
	var styleProp = props.style || {};
	var style = {};
	/**
	* Copy non-Motion Values straight into style
	*/
	copyRawValuesOnly(style, styleProp, props);
	Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
	if (props.transformValues) style = props.transformValues(style);
	return style;
}
function useHTMLProps(props, visualState, isStatic) {
	var htmlProps = {};
	var style = useStyle(props, visualState, isStatic);
	if (Boolean(props.drag)) {
		htmlProps.draggable = false;
		style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
		style.touchAction = props.drag === true ? "none" : "pan-" + (props.drag === "x" ? "y" : "x");
	}
	htmlProps.style = style;
	return htmlProps;
}
var import_react$17;
var init_use_props$1 = __esmMin((() => {
	init_tslib_es6();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_is_forced_motion_value();
	init_is_motion_value();
	init_build_styles();
	init_create_render_state$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/valid-prop.js
/**
* Check whether a prop name is a valid `MotionProp` key.
*
* @param key - Name of the property to check
* @returns `true` is key is a valid `MotionProp`.
*
* @public
*/
function isValidMotionProp(key) {
	return validMotionProps.has(key);
}
var validMotionProps;
var init_valid_prop = __esmMin((() => {
	validMotionProps = /* @__PURE__ */ new Set([
		"initial",
		"animate",
		"exit",
		"style",
		"variants",
		"transition",
		"transformTemplate",
		"transformValues",
		"custom",
		"inherit",
		"layout",
		"layoutId",
		"_layoutResetTransform",
		"onLayoutAnimationComplete",
		"onViewportBoxUpdate",
		"onLayoutMeasure",
		"onBeforeLayoutMeasure",
		"onAnimationStart",
		"onAnimationComplete",
		"onUpdate",
		"onDragStart",
		"onDrag",
		"onDragEnd",
		"onMeasureDragConstraints",
		"onDirectionLock",
		"onDragTransitionEnd",
		"drag",
		"dragControls",
		"dragListener",
		"dragConstraints",
		"dragDirectionLock",
		"_dragX",
		"_dragY",
		"dragElastic",
		"dragMomentum",
		"dragPropagation",
		"dragTransition",
		"whileDrag",
		"onPan",
		"onPanStart",
		"onPanEnd",
		"onPanSessionStart",
		"onTap",
		"onTapStart",
		"onTapCancel",
		"onHoverStart",
		"onHoverEnd",
		"whileFocus",
		"whileTap",
		"whileHover"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/@emotion+memoize@0.7.4/node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize(fn) {
	var cache = {};
	return function(arg) {
		if (cache[arg] === void 0) cache[arg] = fn(arg);
		return cache[arg];
	};
}
var init_memoize_browser_esm = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@emotion+is-prop-valid@0.8.8/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js
var is_prop_valid_browser_esm_exports = /* @__PURE__ */ __exportAll({ default: () => index });
var reactPropsRegex, index;
var init_is_prop_valid_browser_esm = __esmMin((() => {
	init_memoize_browser_esm();
	reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
	index = memoize(function(prop) {
		return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.js
function filterProps(props, isDom, forwardMotionProps) {
	var filteredProps = {};
	for (var key in props) if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key)) filteredProps[key] = props[key];
	return filteredProps;
}
var shouldForward, emotionIsPropValid_1;
var init_filter_props = __esmMin((() => {
	init_valid_prop();
	shouldForward = function(key) {
		return !isValidMotionProp(key);
	};
	/**
	* Emotion and Styled Components both allow users to pass through arbitrary props to their components
	* to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
	* of these should be passed to the underlying DOM node.
	*
	* However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
	* as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
	* passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
	* `@emotion/is-prop-valid`, however to fix this problem we need to use it.
	*
	* By making it an optionalDependency we can offer this functionality only in the situations where it's
	* actually required.
	*/
	try {
		emotionIsPropValid_1 = (init_is_prop_valid_browser_esm(), __toCommonJS(is_prop_valid_browser_esm_exports)).default;
		shouldForward = function(key) {
			if (key.startsWith("on")) return !isValidMotionProp(key);
			else return emotionIsPropValid_1(key);
		};
	} catch (_a) {}
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.js
function calcOrigin$1(origin, offset, size) {
	return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
/**
* The SVG transform origin defaults are different to CSS and is less intuitive,
* so we use the measured dimensions of the SVG to reconcile these.
*/
function calcSVGTransformOrigin(dimensions, originX, originY) {
	var pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
	var pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
	return pxOriginX + " " + pxOriginY;
}
var init_transform_origin = __esmMin((() => {
	init_es$3();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/path.js
/**
* Build SVG path properties. Uses the path's measured length to convert
* our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
* and stroke-dasharray attributes.
*
* This function is mutative to reduce per-frame GC.
*/
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
	if (spacing === void 0) spacing = 1;
	if (offset === void 0) offset = 0;
	if (useDashCase === void 0) useDashCase = true;
	var keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = progressToPixels(-offset, totalLength);
	var pathLength = progressToPixels(length, totalLength);
	var pathSpacing = progressToPixels(spacing, totalLength);
	attrs[keys.array] = pathLength + " " + pathSpacing;
}
var progressToPixels, dashKeys, camelKeys;
var init_path = __esmMin((() => {
	init_es$3();
	progressToPixels = function(progress, length) {
		return px.transform(progress * length);
	};
	dashKeys = {
		offset: "stroke-dashoffset",
		array: "stroke-dasharray"
	};
	camelKeys = {
		offset: "strokeDashoffset",
		array: "strokeDasharray"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.js
/**
* Build SVG visual attrbutes, like cx and style.transform
*/
function buildSVGAttrs(state, _a, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
	var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c;
	buildHTMLStyles(state, __rest(_a, [
		"attrX",
		"attrY",
		"originX",
		"originY",
		"pathLength",
		"pathSpacing",
		"pathOffset"
	]), projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
	state.attrs = state.style;
	state.style = {};
	var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
	/**
	* However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
	* and copy it into style.
	*/
	if (attrs.transform) {
		if (dimensions) style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : .5, originY !== void 0 ? originY : .5);
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (totalPathLength !== void 0 && pathLength !== void 0) buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
}
var init_build_attrs = __esmMin((() => {
	init_tslib_es6();
	init_build_styles();
	init_transform_origin();
	init_path();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.js
var createSvgRenderState;
var init_create_render_state = __esmMin((() => {
	init_tslib_es6();
	init_create_render_state$1();
	createSvgRenderState = function() {
		return __assign(__assign({}, createHtmlRenderState()), { attrs: {} });
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/use-props.js
function useSVGProps(props, visualState) {
	var visualProps = (0, import_react$16.useMemo)(function() {
		var state = createSvgRenderState();
		buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
		return __assign(__assign({}, state.attrs), { style: __assign({}, state.style) });
	}, [visualState]);
	if (props.style) {
		var rawStyles = {};
		copyRawValuesOnly(rawStyles, props.style, props);
		visualProps.style = __assign(__assign({}, rawStyles), visualProps.style);
	}
	return visualProps;
}
var import_react$16;
var init_use_props = __esmMin((() => {
	init_tslib_es6();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_use_props$1();
	init_build_attrs();
	init_create_render_state();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/use-render.js
function createUseRender(forwardMotionProps) {
	if (forwardMotionProps === void 0) forwardMotionProps = false;
	var useRender = function(Component, props, ref, _a, isStatic) {
		var latestValues = _a.latestValues;
		var visualProps = (isSVGComponent(Component) ? useSVGProps : useHTMLProps)(props, latestValues, isStatic);
		var filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
		var elementProps = __assign(__assign(__assign({}, filteredProps), visualProps), { ref });
		return (0, import_react$15.createElement)(Component, elementProps);
	};
	return useRender;
}
var import_react$15;
var init_use_render = __esmMin((() => {
	init_tslib_es6();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_use_props$1();
	init_filter_props();
	init_is_svg_component();
	init_use_props();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.js
var CAMEL_CASE_PATTERN, REPLACE_TEMPLATE, camelToDash;
var init_camel_to_dash = __esmMin((() => {
	CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
	REPLACE_TEMPLATE = "$1-$2";
	camelToDash = function(str) {
		return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/render.js
function renderHTML(element, _a) {
	var style = _a.style, vars = _a.vars;
	Object.assign(element.style, style);
	for (var key in vars) element.style.setProperty(key, vars[key]);
}
var init_render$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.js
var camelCaseAttributes;
var init_camel_case_attrs = __esmMin((() => {
	camelCaseAttributes = /* @__PURE__ */ new Set([
		"baseFrequency",
		"diffuseConstant",
		"kernelMatrix",
		"kernelUnitLength",
		"keySplines",
		"keyTimes",
		"limitingConeAngle",
		"markerHeight",
		"markerWidth",
		"numOctaves",
		"targetX",
		"targetY",
		"surfaceScale",
		"specularConstant",
		"specularExponent",
		"stdDeviation",
		"tableValues",
		"viewBox",
		"gradientTransform"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/render.js
function renderSVG(element, renderState) {
	renderHTML(element, renderState);
	for (var key in renderState.attrs) element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
}
var init_render$1 = __esmMin((() => {
	init_camel_to_dash();
	init_render$2();
	init_camel_case_attrs();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.js
function scrapeMotionValuesFromProps$1(props) {
	var style = props.style;
	var newValues = {};
	for (var key in style) if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) newValues[key] = style[key];
	return newValues;
}
var init_scrape_motion_values$1 = __esmMin((() => {
	init_is_forced_motion_value();
	init_is_motion_value();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.js
function scrapeMotionValuesFromProps(props) {
	var newValues = scrapeMotionValuesFromProps$1(props);
	for (var key in props) if (isMotionValue(props[key])) {
		var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
var init_scrape_motion_values = __esmMin((() => {
	init_is_motion_value();
	init_scrape_motion_values$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.js
function isAnimationControls(v) {
	return typeof v === "object" && typeof v.start === "function";
}
var init_is_animation_controls = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.js
var isKeyframesTarget;
var init_is_keyframes_target = __esmMin((() => {
	isKeyframesTarget = function(v) {
		return Array.isArray(v);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/resolve-value.js
var isCustomValue, resolveFinalValueInKeyframes;
var init_resolve_value = __esmMin((() => {
	init_is_keyframes_target();
	isCustomValue = function(v) {
		return Boolean(v && typeof v === "object" && v.mix && v.toValue);
	};
	resolveFinalValueInKeyframes = function(v) {
		return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.js
/**
* If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
*
* TODO: Remove and move to library
*
* @internal
*/
function resolveMotionValue(value) {
	var unwrappedValue = isMotionValue(value) ? value.get() : value;
	return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
var init_resolve_motion_value = __esmMin((() => {
	init_resolve_value();
	init_is_motion_value();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.js
function makeState(_a, props, context, presenceContext) {
	var scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
	var state = {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
		renderState: createRenderState()
	};
	if (onMount) state.mount = function(instance) {
		return onMount(props, instance, state);
	};
	return state;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	var values = {};
	var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
	var motionValues = scrapeMotionValues(props);
	for (var key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	var initial = props.initial, animate = props.animate;
	var isControllingVariants = checkIfControllingVariants(props);
	var isVariantNode = checkIfVariantNode(props);
	if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
		initial !== null && initial !== void 0 || (initial = context.initial);
		animate !== null && animate !== void 0 || (animate = context.animate);
	}
	var variantToSet = blockInitialAnimation || initial === false ? animate : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) (Array.isArray(variantToSet) ? variantToSet : [variantToSet]).forEach(function(definition) {
		var resolved = resolveVariantFromProps(props, definition);
		if (!resolved) return;
		var transitionEnd = resolved.transitionEnd;
		resolved.transition;
		var target = __rest(resolved, ["transitionEnd", "transition"]);
		for (var key in target) values[key] = target[key];
		for (var key in transitionEnd) values[key] = transitionEnd[key];
	});
	return values;
}
var import_react$14, makeUseVisualState;
var init_use_visual_state = __esmMin((() => {
	init_tslib_es6();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_is_animation_controls();
	init_PresenceContext();
	init_variants();
	init_use_constant();
	init_resolve_motion_value();
	init_MotionContext();
	makeUseVisualState = function(config) {
		return function(props, isStatic) {
			var context = (0, import_react$14.useContext)(MotionContext);
			var presenceContext = (0, import_react$14.useContext)(PresenceContext);
			return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function() {
				return makeState(config, props, context, presenceContext);
			});
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/config-motion.js
function isPath(element) {
	return element.tagName === "path";
}
var svgMotionConfig;
var init_config_motion$1 = __esmMin((() => {
	init_render$1();
	init_scrape_motion_values();
	init_use_visual_state();
	init_create_render_state();
	init_build_attrs();
	svgMotionConfig = { useVisualState: makeUseVisualState({
		scrapeMotionValuesFromProps,
		createRenderState: createSvgRenderState,
		onMount: function(props, instance, _a) {
			var renderState = _a.renderState, latestValues = _a.latestValues;
			try {
				renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
			} catch (e) {
				renderState.dimensions = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
			}
			if (isPath(instance)) renderState.totalPathLength = instance.getTotalLength();
			buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
			renderSVG(instance, renderState);
		}
	}) };
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/config-motion.js
var htmlMotionConfig;
var init_config_motion = __esmMin((() => {
	init_use_visual_state();
	init_scrape_motion_values$1();
	init_create_render_state$1();
	htmlMotionConfig = { useVisualState: makeUseVisualState({
		scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
		createRenderState: createHtmlRenderState
	}) };
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/create-config.js
function createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement) {
	var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
	var baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
	return __assign(__assign({}, baseConfig), {
		preloadedFeatures,
		useRender: createUseRender(forwardMotionProps),
		createVisualElement,
		Component
	});
}
var init_create_config = __esmMin((() => {
	init_tslib_es6();
	init_is_svg_component();
	init_use_render();
	init_config_motion$1();
	init_config_motion();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/types.js
var AnimationType;
var init_types$1 = __esmMin((() => {
	(function(AnimationType) {
		AnimationType["Animate"] = "animate";
		AnimationType["Hover"] = "whileHover";
		AnimationType["Tap"] = "whileTap";
		AnimationType["Drag"] = "whileDrag";
		AnimationType["Focus"] = "whileFocus";
		AnimationType["Exit"] = "exit";
	})(AnimationType || (AnimationType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/events/use-dom-event.js
function addDomEvent(target, eventName, handler, options) {
	target.addEventListener(eventName, handler, options);
	return function() {
		return target.removeEventListener(eventName, handler, options);
	};
}
/**
* Attaches an event listener directly to the provided DOM element.
*
* Bypassing React's event system can be desirable, for instance when attaching non-passive
* event handlers.
*
* ```jsx
* const ref = useRef(null)
*
* useDomEvent(ref, 'wheel', onWheel, { passive: false })
*
* return <div ref={ref} />
* ```
*
* @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
* @param eventName - Name of the event you want listen for.
* @param handler - Function to fire when receiving the event.
* @param options - Options to pass to `Event.addEventListener`.
*
* @public
*/
function useDomEvent(ref, eventName, handler, options) {
	(0, import_react$13.useEffect)(function() {
		var element = ref.current;
		if (handler && element) return addDomEvent(element, eventName, handler, options);
	}, [
		ref,
		eventName,
		handler,
		options
	]);
}
var import_react$13;
var init_use_dom_event = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.js
/**
*
* @param props
* @param ref
* @internal
*/
function useFocusGesture(_a) {
	var whileFocus = _a.whileFocus, visualElement = _a.visualElement;
	var onFocus = function() {
		var _a;
		(_a = visualElement.animationState) === null || _a === void 0 || _a.setActive(AnimationType.Focus, true);
	};
	var onBlur = function() {
		var _a;
		(_a = visualElement.animationState) === null || _a === void 0 || _a.setActive(AnimationType.Focus, false);
	};
	useDomEvent(visualElement, "focus", whileFocus ? onFocus : void 0);
	useDomEvent(visualElement, "blur", whileFocus ? onBlur : void 0);
}
var init_use_focus_gesture = __esmMin((() => {
	init_types$1();
	init_use_dom_event();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/utils/event-type.js
function isMouseEvent(event) {
	if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) return !!(event.pointerType === "mouse");
	return event instanceof MouseEvent;
}
function isTouchEvent(event) {
	return !!event.touches;
}
var init_event_type = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/events/event-info.js
/**
* Filters out events not attached to the primary pointer (currently left mouse button)
* @param eventHandler
*/
function filterPrimaryPointer(eventHandler) {
	return function(event) {
		var isMouseEvent = event instanceof MouseEvent;
		if (!isMouseEvent || isMouseEvent && event.button === 0) eventHandler(event);
	};
}
function pointFromTouch(e, pointType) {
	if (pointType === void 0) pointType = "page";
	var point = e.touches[0] || e.changedTouches[0] || defaultPagePoint;
	return {
		x: point[pointType + "X"],
		y: point[pointType + "Y"]
	};
}
function pointFromMouse(point, pointType) {
	if (pointType === void 0) pointType = "page";
	return {
		x: point[pointType + "X"],
		y: point[pointType + "Y"]
	};
}
function extractEventInfo(event, pointType) {
	if (pointType === void 0) pointType = "page";
	return { point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType) };
}
function getViewportPointFromEvent(event) {
	return extractEventInfo(event, "client");
}
var defaultPagePoint, wrapHandler;
var init_event_info = __esmMin((() => {
	init_event_type();
	defaultPagePoint = {
		pageX: 0,
		pageY: 0
	};
	wrapHandler = function(handler, shouldFilterPrimaryPointer) {
		if (shouldFilterPrimaryPointer === void 0) shouldFilterPrimaryPointer = false;
		var listener = function(event) {
			return handler(event, extractEventInfo(event));
		};
		return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/events/utils.js
var supportsPointerEvents, supportsTouchEvents, supportsMouseEvents;
var init_utils$3 = __esmMin((() => {
	init_is_browser();
	supportsPointerEvents = function() {
		return isBrowser && window.onpointerdown === null;
	};
	supportsTouchEvents = function() {
		return isBrowser && window.ontouchstart === null;
	};
	supportsMouseEvents = function() {
		return isBrowser && window.onmousedown === null;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/events/use-pointer-event.js
function getPointerEventName(name) {
	if (supportsPointerEvents()) return name;
	else if (supportsTouchEvents()) return touchEventNames[name];
	else if (supportsMouseEvents()) return mouseEventNames[name];
	return name;
}
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
	return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}
var mouseEventNames, touchEventNames;
var init_use_pointer_event = __esmMin((() => {
	init_use_dom_event();
	init_event_info();
	init_utils$3();
	mouseEventNames = {
		pointerdown: "mousedown",
		pointermove: "mousemove",
		pointerup: "mouseup",
		pointercancel: "mousecancel",
		pointerover: "mouseover",
		pointerout: "mouseout",
		pointerenter: "mouseenter",
		pointerleave: "mouseleave"
	};
	touchEventNames = {
		pointerdown: "touchstart",
		pointermove: "touchmove",
		pointerup: "touchend",
		pointercancel: "touchcancel"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.js
function createLock(name) {
	var lock = null;
	return function() {
		var openLock = function() {
			lock = null;
		};
		if (lock === null) {
			lock = name;
			return openLock;
		}
		return false;
	};
}
function getGlobalLock(drag) {
	var lock = false;
	if (drag === "y") lock = globalVerticalLock();
	else if (drag === "x") lock = globalHorizontalLock();
	else {
		var openHorizontal_1 = globalHorizontalLock();
		var openVertical_1 = globalVerticalLock();
		if (openHorizontal_1 && openVertical_1) lock = function() {
			openHorizontal_1();
			openVertical_1();
		};
		else {
			if (openHorizontal_1) openHorizontal_1();
			if (openVertical_1) openVertical_1();
		}
	}
	return lock;
}
function isDragActive() {
	var openGestureLock = getGlobalLock(true);
	if (!openGestureLock) return true;
	openGestureLock();
	return false;
}
var globalHorizontalLock, globalVerticalLock;
var init_lock = __esmMin((() => {
	globalHorizontalLock = createLock("dragHorizontal");
	globalVerticalLock = createLock("dragVertical");
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.js
function createHoverEvent(visualElement, isActive, callback) {
	return function(event, info) {
		var _a;
		if (!isMouseEvent(event) || isDragActive()) return;
		callback === null || callback === void 0 || callback(event, info);
		(_a = visualElement.animationState) === null || _a === void 0 || _a.setActive(AnimationType.Hover, isActive);
	};
}
function useHoverGesture(_a) {
	var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement = _a.visualElement;
	usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement, true, onHoverStart) : void 0);
	usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement, false, onHoverEnd) : void 0);
}
var init_use_hover_gesture = __esmMin((() => {
	init_event_type();
	init_types$1();
	init_use_pointer_event();
	init_lock();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.js
var isNodeOrChild;
var init_is_node_or_child = __esmMin((() => {
	isNodeOrChild = function(parent, child) {
		if (!child) return false;
		else if (parent === child) return true;
		else return isNodeOrChild(parent, child.parentElement);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/use-unmount-effect.js
function useUnmountEffect(callback) {
	return (0, import_react$12.useEffect)(function() {
		return function() {
			return callback();
		};
	}, []);
}
var import_react$12;
var init_use_unmount_effect = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/clamp.js
var clamp;
var init_clamp = __esmMin((() => {
	clamp = function(min, max, v) {
		return Math.min(Math.max(v, min), max);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/utils/find-spring.js
function findSpring(_a) {
	var _b = _a.duration, duration = _b === void 0 ? 800 : _b, _c = _a.bounce, bounce = _c === void 0 ? .25 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0 : _d, _e = _a.mass, mass = _e === void 0 ? 1 : _e;
	var envelope;
	var derivative;
	warning(duration <= 1e4, "Spring duration must be 10 seconds or less");
	var dampingRatio = 1 - bounce;
	dampingRatio = clamp(minDamping, 1, dampingRatio);
	duration = clamp(minDuration, 10, duration / 1e3);
	if (dampingRatio < 1) {
		envelope = function(undampedFreq) {
			var exponentialDecay = undampedFreq * dampingRatio;
			var delta = exponentialDecay * duration;
			var a = exponentialDecay - velocity;
			var b = calcAngularFreq(undampedFreq, dampingRatio);
			var c = Math.exp(-delta);
			return safeMin - a / b * c;
		};
		derivative = function(undampedFreq) {
			var delta = undampedFreq * dampingRatio * duration;
			var d = delta * velocity + velocity;
			var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
			var f = Math.exp(-delta);
			var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
			return (-envelope(undampedFreq) + safeMin > 0 ? -1 : 1) * ((d - e) * f) / g;
		};
	} else {
		envelope = function(undampedFreq) {
			var a = Math.exp(-undampedFreq * duration);
			var b = (undampedFreq - velocity) * duration + 1;
			return -safeMin + a * b;
		};
		derivative = function(undampedFreq) {
			return Math.exp(-undampedFreq * duration) * ((velocity - undampedFreq) * (duration * duration));
		};
	}
	var initialGuess = 5 / duration;
	var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
	duration = duration * 1e3;
	if (isNaN(undampedFreq)) return {
		stiffness: 100,
		damping: 10,
		duration
	};
	else {
		var stiffness = Math.pow(undampedFreq, 2) * mass;
		return {
			stiffness,
			damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
			duration
		};
	}
}
function approximateRoot(envelope, derivative, initialGuess) {
	var result = initialGuess;
	for (var i = 1; i < rootIterations; i++) result = result - envelope(result) / derivative(result);
	return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
	return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var safeMin, minDuration, minDamping, rootIterations;
var init_find_spring = __esmMin((() => {
	init_hey_listen_es();
	init_clamp();
	safeMin = .001;
	minDuration = .01;
	minDamping = .05;
	rootIterations = 12;
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/generators/spring.js
function isSpringType(options, keys) {
	return keys.some(function(key) {
		return options[key] !== void 0;
	});
}
function getSpringOptions(options) {
	var springOptions = __assign({
		velocity: 0,
		stiffness: 100,
		damping: 10,
		mass: 1,
		isResolvedFromDuration: false
	}, options);
	if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
		var derived = findSpring(options);
		springOptions = __assign(__assign(__assign({}, springOptions), derived), {
			velocity: 0,
			mass: 1
		});
		springOptions.isResolvedFromDuration = true;
	}
	return springOptions;
}
function spring(_a) {
	var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options = __rest(_a, [
		"from",
		"to",
		"restSpeed",
		"restDelta"
	]);
	var state = {
		done: false,
		value: from
	};
	var _e = getSpringOptions(options), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, duration = _e.duration, isResolvedFromDuration = _e.isResolvedFromDuration;
	var resolveSpring = zero;
	var resolveVelocity = zero;
	function createSpring() {
		var initialVelocity = velocity ? -(velocity / 1e3) : 0;
		var initialDelta = to - from;
		var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
		var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
		restDelta !== null && restDelta !== void 0 || (restDelta = Math.abs(to - from) <= 1 ? .01 : .4);
		if (dampingRatio < 1) {
			var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
			resolveSpring = function(t) {
				var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
				return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
			};
			resolveVelocity = function(t) {
				var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
				return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
			};
		} else if (dampingRatio === 1) resolveSpring = function(t) {
			return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
		};
		else {
			var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
			resolveSpring = function(t) {
				var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
				var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
				return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
			};
		}
	}
	createSpring();
	return {
		next: function(t) {
			var current = resolveSpring(t);
			if (!isResolvedFromDuration) {
				var currentVelocity = resolveVelocity(t) * 1e3;
				var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
				var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
				state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
			} else state.done = t >= duration;
			state.value = state.done ? to : current;
			return state;
		},
		flipTarget: function() {
			var _a;
			velocity = -velocity;
			_a = [to, from], from = _a[0], to = _a[1];
			createSpring();
		}
	};
}
var durationKeys, physicsKeys, zero;
var init_spring = __esmMin((() => {
	init_tslib_es6();
	init_find_spring();
	durationKeys = ["duration", "bounce"];
	physicsKeys = [
		"stiffness",
		"damping",
		"mass"
	];
	spring.needsInterpolation = function(a, b) {
		return typeof a === "string" || typeof b === "string";
	};
	zero = function(_t) {
		return 0;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/progress.js
var progress;
var init_progress = __esmMin((() => {
	progress = function(from, to, value) {
		var toFromDifference = to - from;
		return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/mix.js
var mix;
var init_mix = __esmMin((() => {
	mix = function(from, to, progress) {
		return -progress * from + progress * to + from;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/mix-color.js
var mixLinearColor, colorTypes, getColorType, notAnimatable, mixColor;
var init_mix_color = __esmMin((() => {
	init_tslib_es6();
	init_mix();
	init_es$3();
	init_hey_listen_es();
	mixLinearColor = function(from, to, v) {
		var fromExpo = from * from;
		var toExpo = to * to;
		return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
	};
	colorTypes = [
		hex,
		rgba,
		hsla
	];
	getColorType = function(v) {
		return colorTypes.find(function(type) {
			return type.test(v);
		});
	};
	notAnimatable = function(color) {
		return "'" + color + "' is not an animatable color. Use the equivalent color code instead.";
	};
	mixColor = function(from, to) {
		var fromColorType = getColorType(from);
		var toColorType = getColorType(to);
		invariant(!!fromColorType, notAnimatable(from));
		invariant(!!toColorType, notAnimatable(to));
		invariant(fromColorType.transform === toColorType.transform, "Both colors must be hex/RGBA, OR both must be HSLA.");
		var fromColor = fromColorType.parse(from);
		var toColor = toColorType.parse(to);
		var blended = __assign({}, fromColor);
		var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
		return function(v) {
			for (var key in blended) if (key !== "alpha") blended[key] = mixFunc(fromColor[key], toColor[key], v);
			blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
			return fromColorType.transform(blended);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/inc.js
var isNum;
var init_inc = __esmMin((() => {
	isNum = function(v) {
		return typeof v === "number";
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/pipe.js
var combineFunctions, pipe;
var init_pipe = __esmMin((() => {
	combineFunctions = function(a, b) {
		return function(v) {
			return b(a(v));
		};
	};
	pipe = function() {
		var transformers = [];
		for (var _i = 0; _i < arguments.length; _i++) transformers[_i] = arguments[_i];
		return transformers.reduce(combineFunctions);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/mix-complex.js
function getMixer(origin, target) {
	if (isNum(origin)) return function(v) {
		return mix(origin, target, v);
	};
	else if (color.test(origin)) return mixColor(origin, target);
	else return mixComplex(origin, target);
}
function analyse(value) {
	var parsed = complex.parse(value);
	var numValues = parsed.length;
	var numNumbers = 0;
	var numRGB = 0;
	var numHSL = 0;
	for (var i = 0; i < numValues; i++) if (numNumbers || typeof parsed[i] === "number") numNumbers++;
	else if (parsed[i].hue !== void 0) numHSL++;
	else numRGB++;
	return {
		parsed,
		numNumbers,
		numRGB,
		numHSL
	};
}
var mixArray, mixObject, mixComplex;
var init_mix_complex = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_mix();
	init_mix_color();
	init_inc();
	init_pipe();
	init_hey_listen_es();
	mixArray = function(from, to) {
		var output = __spreadArray([], from);
		var numValues = output.length;
		var blendValue = from.map(function(fromThis, i) {
			return getMixer(fromThis, to[i]);
		});
		return function(v) {
			for (var i = 0; i < numValues; i++) output[i] = blendValue[i](v);
			return output;
		};
	};
	mixObject = function(origin, target) {
		var output = __assign(__assign({}, origin), target);
		var blendValue = {};
		for (var key in output) if (origin[key] !== void 0 && target[key] !== void 0) blendValue[key] = getMixer(origin[key], target[key]);
		return function(v) {
			for (var key in blendValue) output[key] = blendValue[key](v);
			return output;
		};
	};
	mixComplex = function(origin, target) {
		var template = complex.createTransformer(target);
		var originStats = analyse(origin);
		var targetStats = analyse(target);
		invariant(originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
		return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/interpolate.js
function detectMixerFactory(v) {
	if (typeof v === "number") return mixNumber;
	else if (typeof v === "string") {
		if (color.test(v)) return mixColor;
		else return mixComplex;
	} else if (Array.isArray(v)) return mixArray;
	else if (typeof v === "object") return mixObject;
}
function createMixers(output, ease, customMixer) {
	var mixers = [];
	var mixerFactory = customMixer || detectMixerFactory(output[0]);
	var numMixers = output.length - 1;
	for (var i = 0; i < numMixers; i++) {
		var mixer = mixerFactory(output[i], output[i + 1]);
		if (ease) {
			var easingFunction = Array.isArray(ease) ? ease[i] : ease;
			mixer = pipe(easingFunction, mixer);
		}
		mixers.push(mixer);
	}
	return mixers;
}
function fastInterpolate(_a, _b) {
	var from = _a[0], to = _a[1];
	var mixer = _b[0];
	return function(v) {
		return mixer(progress(from, to, v));
	};
}
function slowInterpolate(input, mixers) {
	var inputLength = input.length;
	var lastInputIndex = inputLength - 1;
	return function(v) {
		var mixerIndex = 0;
		var foundMixerIndex = false;
		if (v <= input[0]) foundMixerIndex = true;
		else if (v >= input[lastInputIndex]) {
			mixerIndex = lastInputIndex - 1;
			foundMixerIndex = true;
		}
		if (!foundMixerIndex) {
			var i = 1;
			for (; i < inputLength; i++) if (input[i] > v || i === lastInputIndex) break;
			mixerIndex = i - 1;
		}
		var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
		return mixers[mixerIndex](progressInRange);
	};
}
function interpolate(input, output, _a) {
	var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
	var inputLength = input.length;
	invariant(inputLength === output.length, "Both input and output ranges must be the same length");
	invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
	if (input[0] > input[inputLength - 1]) {
		input = [].concat(input);
		output = [].concat(output);
		input.reverse();
		output.reverse();
	}
	var mixers = createMixers(output, ease, mixer);
	var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
	return isClamp ? function(v) {
		return interpolator(clamp(input[0], input[inputLength - 1], v));
	} : interpolator;
}
var mixNumber;
var init_interpolate = __esmMin((() => {
	init_progress();
	init_mix();
	init_mix_color();
	init_mix_complex();
	init_es$3();
	init_clamp();
	init_pipe();
	init_hey_listen_es();
	mixNumber = function(from, to) {
		return function(p) {
			return mix(from, to, p);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/easing/utils.js
var reverseEasing, mirrorEasing, createExpoIn, createBackIn, createAnticipate;
var init_utils$2 = __esmMin((() => {
	reverseEasing = function(easing) {
		return function(p) {
			return 1 - easing(1 - p);
		};
	};
	mirrorEasing = function(easing) {
		return function(p) {
			return p <= .5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
		};
	};
	createExpoIn = function(power) {
		return function(p) {
			return Math.pow(p, power);
		};
	};
	createBackIn = function(power) {
		return function(p) {
			return p * p * ((power + 1) * p - power);
		};
	};
	createAnticipate = function(power) {
		var backEasing = createBackIn(power);
		return function(p) {
			return (p *= 2) < 1 ? .5 * backEasing(p) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/easing/index.js
var DEFAULT_OVERSHOOT_STRENGTH, BOUNCE_FIRST_THRESHOLD, BOUNCE_SECOND_THRESHOLD, BOUNCE_THIRD_THRESHOLD, linear, easeIn, easeOut, easeInOut, circIn, circOut, circInOut, backIn, backOut, backInOut, anticipate, ca, cb, cc, bounceOut, bounceIn, bounceInOut;
var init_easing$1 = __esmMin((() => {
	init_utils$2();
	DEFAULT_OVERSHOOT_STRENGTH = 1.525;
	BOUNCE_FIRST_THRESHOLD = 4 / 11;
	BOUNCE_SECOND_THRESHOLD = 8 / 11;
	BOUNCE_THIRD_THRESHOLD = 9 / 10;
	linear = function(p) {
		return p;
	};
	easeIn = createExpoIn(2);
	easeOut = reverseEasing(easeIn);
	easeInOut = mirrorEasing(easeIn);
	circIn = function(p) {
		return 1 - Math.sin(Math.acos(p));
	};
	circOut = reverseEasing(circIn);
	circInOut = mirrorEasing(circOut);
	backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
	backOut = reverseEasing(backIn);
	backInOut = mirrorEasing(backIn);
	anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
	ca = 4356 / 361;
	cb = 35442 / 1805;
	cc = 16061 / 1805;
	bounceOut = function(p) {
		if (p === 1 || p === 0) return p;
		var p2 = p * p;
		return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
	};
	bounceIn = reverseEasing(bounceOut);
	bounceInOut = function(p) {
		return p < .5 ? .5 * (1 - bounceOut(1 - p * 2)) : .5 * bounceOut(p * 2 - 1) + .5;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/generators/keyframes.js
function defaultEasing(values, easing) {
	return values.map(function() {
		return easing || easeInOut;
	}).splice(0, values.length - 1);
}
function defaultOffset(values) {
	var numValues = values.length;
	return values.map(function(_value, i) {
		return i !== 0 ? i / (numValues - 1) : 0;
	});
}
function convertOffsetToTimes(offset, duration) {
	return offset.map(function(o) {
		return o * duration;
	});
}
function keyframes$1(_a) {
	var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration = _d === void 0 ? 300 : _d;
	var state = {
		done: false,
		value: from
	};
	var values = Array.isArray(to) ? to : [from, to];
	var times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
	function createInterpolator() {
		return interpolate(times, values, { ease: Array.isArray(ease) ? ease : defaultEasing(values, ease) });
	}
	var interpolator = createInterpolator();
	return {
		next: function(t) {
			state.value = interpolator(t);
			state.done = t >= duration;
			return state;
		},
		flipTarget: function() {
			values.reverse();
			interpolator = createInterpolator();
		}
	};
}
var init_keyframes = __esmMin((() => {
	init_interpolate();
	init_easing$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/generators/decay.js
function decay(_a) {
	var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? .8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? .5 : _f, modifyTarget = _a.modifyTarget;
	var state = {
		done: false,
		value: from
	};
	var amplitude = power * velocity;
	var ideal = from + amplitude;
	var target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
	if (target !== ideal) amplitude = target - from;
	return {
		next: function(t) {
			var delta = -amplitude * Math.exp(-t / timeConstant);
			state.done = !(delta > restDelta || delta < -restDelta);
			state.value = state.done ? target : target + delta;
			return state;
		},
		flipTarget: function() {}
	};
}
var init_decay = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.js
function detectAnimationFromOptions(config) {
	if (Array.isArray(config.to)) return keyframes$1;
	else if (types[config.type]) return types[config.type];
	var keys = new Set(Object.keys(config));
	if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) return keyframes$1;
	else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) return spring;
	return keyframes$1;
}
var types;
var init_detect_animation_from_options = __esmMin((() => {
	init_spring();
	init_keyframes();
	init_decay();
	types = {
		keyframes: keyframes$1,
		spring,
		decay
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framesync@5.3.0/node_modules/framesync/dist/es/on-next-frame.js
var defaultTimestep, getCurrentTime, onNextFrame;
var init_on_next_frame = __esmMin((() => {
	defaultTimestep = 1 / 60 * 1e3;
	getCurrentTime = typeof performance !== "undefined" ? function() {
		return performance.now();
	} : function() {
		return Date.now();
	};
	onNextFrame = typeof window !== "undefined" ? function(callback) {
		return window.requestAnimationFrame(callback);
	} : function(callback) {
		return setTimeout(function() {
			return callback(getCurrentTime());
		}, defaultTimestep);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framesync@5.3.0/node_modules/framesync/dist/es/create-render-step.js
function createRenderStep(runNextFrame) {
	var toRun = [];
	var toRunNextFrame = [];
	var numToRun = 0;
	var isProcessing = false;
	var toKeepAlive = /* @__PURE__ */ new WeakSet();
	var step = {
		schedule: function(callback, keepAlive, immediate) {
			if (keepAlive === void 0) keepAlive = false;
			if (immediate === void 0) immediate = false;
			var addToCurrentFrame = immediate && isProcessing;
			var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
			if (keepAlive) toKeepAlive.add(callback);
			if (buffer.indexOf(callback) === -1) {
				buffer.push(callback);
				if (addToCurrentFrame && isProcessing) numToRun = toRun.length;
			}
			return callback;
		},
		cancel: function(callback) {
			var index = toRunNextFrame.indexOf(callback);
			if (index !== -1) toRunNextFrame.splice(index, 1);
			toKeepAlive.delete(callback);
		},
		process: function(frameData) {
			var _a;
			isProcessing = true;
			_a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
			toRunNextFrame.length = 0;
			numToRun = toRun.length;
			if (numToRun) for (var i = 0; i < numToRun; i++) {
				var callback = toRun[i];
				callback(frameData);
				if (toKeepAlive.has(callback)) {
					step.schedule(callback);
					runNextFrame();
				}
			}
			isProcessing = false;
		}
	};
	return step;
}
var init_create_render_step = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framesync@5.3.0/node_modules/framesync/dist/es/index.js
var maxElapsed, useDefaultElapsed, runNextFrame, isProcessing, frame, stepsOrder, steps, sync, cancelSync, flushSync, processStep, processFrame, startLoop, getFrameData;
var init_es$2 = __esmMin((() => {
	init_on_next_frame();
	init_create_render_step();
	maxElapsed = 40;
	useDefaultElapsed = true;
	runNextFrame = false;
	isProcessing = false;
	frame = {
		delta: 0,
		timestamp: 0
	};
	stepsOrder = [
		"read",
		"update",
		"preRender",
		"render",
		"postRender"
	];
	steps = /*#__PURE__*/ stepsOrder.reduce(function(acc, key) {
		acc[key] = createRenderStep(function() {
			return runNextFrame = true;
		});
		return acc;
	}, {});
	sync = /*#__PURE__*/ stepsOrder.reduce(function(acc, key) {
		var step = steps[key];
		acc[key] = function(process, keepAlive, immediate) {
			if (keepAlive === void 0) keepAlive = false;
			if (immediate === void 0) immediate = false;
			if (!runNextFrame) startLoop();
			return step.schedule(process, keepAlive, immediate);
		};
		return acc;
	}, {});
	cancelSync = /*#__PURE__*/ stepsOrder.reduce(function(acc, key) {
		acc[key] = steps[key].cancel;
		return acc;
	}, {});
	flushSync = /*#__PURE__*/ stepsOrder.reduce(function(acc, key) {
		acc[key] = function() {
			return steps[key].process(frame);
		};
		return acc;
	}, {});
	processStep = function(stepId) {
		return steps[stepId].process(frame);
	};
	processFrame = function(timestamp) {
		runNextFrame = false;
		frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
		frame.timestamp = timestamp;
		isProcessing = true;
		stepsOrder.forEach(processStep);
		isProcessing = false;
		if (runNextFrame) {
			useDefaultElapsed = false;
			onNextFrame(processFrame);
		}
	};
	startLoop = function() {
		runNextFrame = true;
		useDefaultElapsed = true;
		if (!isProcessing) onNextFrame(processFrame);
	};
	getFrameData = function() {
		return frame;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/utils/elapsed.js
function loopElapsed(elapsed, duration, delay) {
	if (delay === void 0) delay = 0;
	return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
	if (delay === void 0) delay = 0;
	if (isForwardPlayback === void 0) isForwardPlayback = true;
	return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
	return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
var init_elapsed = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/index.js
function animate(_a) {
	var _b, _c;
	var from = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest(_a, [
		"from",
		"autoplay",
		"driver",
		"elapsed",
		"repeat",
		"repeatType",
		"repeatDelay",
		"onPlay",
		"onStop",
		"onComplete",
		"onRepeat",
		"onUpdate"
	]);
	var to = options.to;
	var driverControls;
	var repeatCount = 0;
	var computedDuration = options.duration;
	var latest;
	var isComplete = false;
	var isForwardPlayback = true;
	var interpolateFromNumber;
	var animator = detectAnimationFromOptions(options);
	if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
		interpolateFromNumber = interpolate([0, 100], [from, to], { clamp: false });
		from = 0;
		to = 100;
	}
	var animation = animator(__assign(__assign({}, options), {
		from,
		to
	}));
	function repeat() {
		repeatCount++;
		if (repeatType === "reverse") {
			isForwardPlayback = repeatCount % 2 === 0;
			elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
		} else {
			elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
			if (repeatType === "mirror") animation.flipTarget();
		}
		isComplete = false;
		onRepeat && onRepeat();
	}
	function complete() {
		driverControls.stop();
		onComplete && onComplete();
	}
	function update(delta) {
		if (!isForwardPlayback) delta = -delta;
		elapsed += delta;
		if (!isComplete) {
			var state = animation.next(Math.max(0, elapsed));
			latest = state.value;
			if (interpolateFromNumber) latest = interpolateFromNumber(latest);
			isComplete = isForwardPlayback ? state.done : elapsed <= 0;
		}
		onUpdate === null || onUpdate === void 0 || onUpdate(latest);
		if (isComplete) {
			if (repeatCount === 0) computedDuration !== null && computedDuration !== void 0 || (computedDuration = elapsed);
			if (repeatCount < repeatMax) hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
			else complete();
		}
	}
	function play() {
		onPlay === null || onPlay === void 0 || onPlay();
		driverControls = driver(update);
		driverControls.start();
	}
	autoplay && play();
	return { stop: function() {
		onStop === null || onStop === void 0 || onStop();
		driverControls.stop();
	} };
}
var framesync;
var init_animations$1 = __esmMin((() => {
	init_tslib_es6();
	init_detect_animation_from_options();
	init_es$2();
	init_interpolate();
	init_elapsed();
	framesync = function(update) {
		var passTimestamp = function(_a) {
			var delta = _a.delta;
			return update(delta);
		};
		return {
			start: function() {
				return sync.update(passTimestamp, true);
			},
			stop: function() {
				return cancelSync.update(passTimestamp);
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/velocity-per-second.js
function velocityPerSecond(velocity, frameDuration) {
	return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
var init_velocity_per_second = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/animations/inertia.js
function inertia(_a) {
	var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? .8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
	var currentAnimation;
	function isOutOfBounds(v) {
		return min !== void 0 && v < min || max !== void 0 && v > max;
	}
	function boundaryNearest(v) {
		if (min === void 0) return max;
		if (max === void 0) return min;
		return Math.abs(min - v) < Math.abs(max - v) ? min : max;
	}
	function startAnimation(options) {
		currentAnimation === null || currentAnimation === void 0 || currentAnimation.stop();
		currentAnimation = animate(__assign(__assign({}, options), {
			driver,
			onUpdate: function(v) {
				var _a;
				onUpdate === null || onUpdate === void 0 || onUpdate(v);
				(_a = options.onUpdate) === null || _a === void 0 || _a.call(options, v);
			},
			onComplete
		}));
	}
	function startSpring(options) {
		startAnimation(__assign({
			type: "spring",
			stiffness: bounceStiffness,
			damping: bounceDamping,
			restDelta
		}, options));
	}
	if (isOutOfBounds(from)) startSpring({
		from,
		velocity,
		to: boundaryNearest(from)
	});
	else {
		var target = power * velocity + from;
		if (typeof modifyTarget !== "undefined") target = modifyTarget(target);
		var boundary_1 = boundaryNearest(target);
		var heading_1 = boundary_1 === min ? -1 : 1;
		var prev_1;
		var current_1;
		var checkBoundary = function(v) {
			prev_1 = current_1;
			current_1 = v;
			velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
			if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) startSpring({
				from: v,
				to: boundary_1,
				velocity
			});
		};
		startAnimation({
			type: "decay",
			from,
			velocity,
			timeConstant,
			power,
			restDelta,
			modifyTarget,
			onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
		});
	}
	return { stop: function() {
		return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
	} };
}
var init_inertia = __esmMin((() => {
	init_tslib_es6();
	init_animations$1();
	init_velocity_per_second();
	init_es$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/is-point.js
var isPoint;
var init_is_point = __esmMin((() => {
	isPoint = function(point) {
		return point.hasOwnProperty("x") && point.hasOwnProperty("y");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/is-point-3d.js
var isPoint3D;
var init_is_point_3d = __esmMin((() => {
	init_is_point();
	isPoint3D = function(point) {
		return isPoint(point) && point.hasOwnProperty("z");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/utils/distance.js
function distance(a, b) {
	if (isNum(a) && isNum(b)) return distance1D(a, b);
	else if (isPoint(a) && isPoint(b)) {
		var xDelta = distance1D(a.x, b.x);
		var yDelta = distance1D(a.y, b.y);
		var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
		return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
	}
}
var distance1D;
var init_distance = __esmMin((() => {
	init_is_point();
	init_is_point_3d();
	init_inc();
	distance1D = function(a, b) {
		return Math.abs(a - b);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/easing/cubic-bezier.js
function binarySubdivide(aX, aA, aB, mX1, mX2) {
	var currentX;
	var currentT;
	var i = 0;
	do {
		currentT = aA + (aB - aA) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - aX;
		if (currentX > 0) aB = currentT;
		else aA = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
	return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
	for (var i = 0; i < newtonIterations; ++i) {
		var currentSlope = getSlope(aGuessT, mX1, mX2);
		if (currentSlope === 0) return aGuessT;
		var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
		aGuessT -= currentX / currentSlope;
	}
	return aGuessT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return linear;
	var sampleValues = new Float32Array(kSplineTableSize);
	for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	function getTForX(aX) {
		var intervalStart = 0;
		var currentSample = 1;
		var lastSample = kSplineTableSize - 1;
		for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
		--currentSample;
		var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
		var guessForT = intervalStart + dist * kSampleStepSize;
		var initialSlope = getSlope(guessForT, mX1, mX2);
		if (initialSlope >= newtonMinSlope) return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
		else if (initialSlope === 0) return guessForT;
		else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
	}
	return function(t) {
		return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
	};
}
var a, b, c, calcBezier, getSlope, subdivisionPrecision, subdivisionMaxIterations, newtonIterations, newtonMinSlope, kSplineTableSize, kSampleStepSize;
var init_cubic_bezier = __esmMin((() => {
	init_easing$1();
	a = function(a1, a2) {
		return 1 - 3 * a2 + 3 * a1;
	};
	b = function(a1, a2) {
		return 3 * a2 - 6 * a1;
	};
	c = function(a1) {
		return 3 * a1;
	};
	calcBezier = function(t, a1, a2) {
		return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
	};
	getSlope = function(t, a1, a2) {
		return 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
	};
	subdivisionPrecision = 1e-7;
	subdivisionMaxIterations = 10;
	newtonIterations = 8;
	newtonMinSlope = .001;
	kSplineTableSize = 11;
	kSampleStepSize = 1 / (kSplineTableSize - 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/popmotion@9.3.6/node_modules/popmotion/dist/es/index.js
var init_es$1 = __esmMin((() => {
	init_animations$1();
	init_inertia();
	init_spring();
	init_keyframes();
	init_inc();
	init_clamp();
	init_distance();
	init_interpolate();
	init_is_point_3d();
	init_is_point();
	init_mix_color();
	init_mix_complex();
	init_mix();
	init_pipe();
	init_progress();
	init_es$2();
	init_velocity_per_second();
	init_easing$1();
	init_cubic_bezier();
	init_utils$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.js
/**
* @param handlers -
* @internal
*/
function useTapGesture(_a) {
	var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement = _a.visualElement;
	var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
	var isPressing = (0, import_react$11.useRef)(false);
	var cancelPointerEndListeners = (0, import_react$11.useRef)(null);
	function removePointerEndListener() {
		var _a;
		(_a = cancelPointerEndListeners.current) === null || _a === void 0 || _a.call(cancelPointerEndListeners);
		cancelPointerEndListeners.current = null;
	}
	function checkPointerEnd() {
		var _a;
		removePointerEndListener();
		isPressing.current = false;
		(_a = visualElement.animationState) === null || _a === void 0 || _a.setActive(AnimationType.Tap, false);
		return !isDragActive();
	}
	function onPointerUp(event, info) {
		if (!checkPointerEnd()) return;
		/**
		* We only count this as a tap gesture if the event.target is the same
		* as, or a child of, this component's element
		*/
		!isNodeOrChild(visualElement.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 || onTapCancel(event, info) : onTap === null || onTap === void 0 || onTap(event, info);
	}
	function onPointerCancel(event, info) {
		if (!checkPointerEnd()) return;
		onTapCancel === null || onTapCancel === void 0 || onTapCancel(event, info);
	}
	function onPointerDown(event, info) {
		var _a;
		removePointerEndListener();
		if (isPressing.current) return;
		isPressing.current = true;
		cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
		onTapStart === null || onTapStart === void 0 || onTapStart(event, info);
		(_a = visualElement.animationState) === null || _a === void 0 || _a.setActive(AnimationType.Tap, true);
	}
	usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : void 0);
	useUnmountEffect(removePointerEndListener);
}
var import_react$11;
var init_use_tap_gesture = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_is_node_or_child();
	init_use_pointer_event();
	init_use_unmount_effect();
	init_es$1();
	init_types$1();
	init_lock();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.js
var makeRenderlessComponent;
var init_make_renderless_component = __esmMin((() => {
	makeRenderlessComponent = function(hook) {
		return function(props) {
			hook(props);
			return null;
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/gestures.js
var gestureAnimations;
var init_gestures = __esmMin((() => {
	init_use_focus_gesture();
	init_use_hover_gesture();
	init_use_tap_gesture();
	init_make_renderless_component();
	gestureAnimations = {
		tap: makeRenderlessComponent(useTapGesture),
		focus: makeRenderlessComponent(useFocusGesture),
		hover: makeRenderlessComponent(useHoverGesture)
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/shallow-compare.js
function shallowCompare(next, prev) {
	if (!Array.isArray(prev)) return false;
	var prevLength = prev.length;
	if (prevLength !== next.length) return false;
	for (var i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
	return true;
}
var init_shallow_compare = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/time-conversion.js
var secondsToMilliseconds;
var init_time_conversion = __esmMin((() => {
	secondsToMilliseconds = function(seconds) {
		return seconds * 1e3;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/easing.js
var easingLookup, easingDefinitionToFunction, isEasingArray;
var init_easing = __esmMin((() => {
	init_tslib_es6();
	init_hey_listen_es();
	init_es$1();
	easingLookup = {
		linear,
		easeIn,
		easeInOut,
		easeOut,
		circIn,
		circInOut,
		circOut,
		backIn,
		backInOut,
		backOut,
		anticipate,
		bounceIn,
		bounceInOut,
		bounceOut
	};
	easingDefinitionToFunction = function(definition) {
		if (Array.isArray(definition)) {
			invariant(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
			var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
			return cubicBezier(x1, y1, x2, y2);
		} else if (typeof definition === "string") {
			invariant(easingLookup[definition] !== void 0, "Invalid easing type '" + definition + "'");
			return easingLookup[definition];
		}
		return definition;
	};
	isEasingArray = function(ease) {
		return Array.isArray(ease) && typeof ease[0] !== "number";
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/is-animatable.js
var isAnimatable;
var init_is_animatable = __esmMin((() => {
	init_es$3();
	isAnimatable = function(key, value) {
		if (key === "zIndex") return false;
		if (typeof value === "number" || Array.isArray(value)) return true;
		if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) return true;
		return false;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/default-transitions.js
var underDampedSpring, criticallyDampedSpring, linearTween, keyframes, defaultTransitions, getDefaultTransition;
var init_default_transitions = __esmMin((() => {
	init_tslib_es6();
	init_is_keyframes_target();
	underDampedSpring = function() {
		return {
			type: "spring",
			stiffness: 500,
			damping: 25,
			restDelta: .5,
			restSpeed: 10
		};
	};
	criticallyDampedSpring = function(to) {
		return {
			type: "spring",
			stiffness: 550,
			damping: to === 0 ? 2 * Math.sqrt(550) : 30,
			restDelta: .01,
			restSpeed: 10
		};
	};
	linearTween = function() {
		return {
			type: "keyframes",
			ease: "linear",
			duration: .3
		};
	};
	keyframes = function(values) {
		return {
			type: "keyframes",
			duration: .8,
			values
		};
	};
	defaultTransitions = {
		x: underDampedSpring,
		y: underDampedSpring,
		z: underDampedSpring,
		rotate: underDampedSpring,
		rotateX: underDampedSpring,
		rotateY: underDampedSpring,
		rotateZ: underDampedSpring,
		scaleX: criticallyDampedSpring,
		scaleY: criticallyDampedSpring,
		scale: criticallyDampedSpring,
		opacity: linearTween,
		backgroundColor: linearTween,
		color: linearTween,
		default: criticallyDampedSpring
	};
	getDefaultTransition = function(valueKey, to) {
		var transitionFactory;
		if (isKeyframesTarget(to)) transitionFactory = keyframes;
		else transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
		return __assign({ to }, transitionFactory(to));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/defaults.js
var defaultValueTypes, getDefaultValueType;
var init_defaults = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_number();
	defaultValueTypes = __assign(__assign({}, numberValueTypes), {
		color,
		backgroundColor: color,
		outlineColor: color,
		fill: color,
		stroke: color,
		borderColor: color,
		borderTopColor: color,
		borderRightColor: color,
		borderBottomColor: color,
		borderLeftColor: color,
		filter,
		WebkitFilter: filter
	});
	getDefaultValueType = function(key) {
		return defaultValueTypes[key];
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.js
function getAnimatableNone(key, value) {
	var _a;
	var defaultValueType = getDefaultValueType(key);
	if (defaultValueType !== filter) defaultValueType = complex;
	return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
var init_animatable_none = __esmMin((() => {
	init_es$3();
	init_defaults();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/animation/utils/transitions.js
/**
* Decide whether a transition is defined on a given Transition.
* This filters out orchestration options and returns true
* if any options are left.
*/
function isTransitionDefined(_a) {
	_a.when;
	_a.delay;
	_a.delayChildren;
	_a.staggerChildren;
	_a.staggerDirection;
	_a.repeat;
	_a.repeatType;
	_a.repeatDelay;
	_a.from;
	var transition = __rest(_a, [
		"when",
		"delay",
		"delayChildren",
		"staggerChildren",
		"staggerDirection",
		"repeat",
		"repeatType",
		"repeatDelay",
		"from"
	]);
	return !!Object.keys(transition).length;
}
/**
* Convert Framer Motion's Transition type into Popmotion-compatible options.
*/
function convertTransitionToAnimationOptions(_a) {
	var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest(_a, [
		"ease",
		"times",
		"yoyo",
		"flip",
		"loop"
	]);
	var options = __assign({}, transition);
	if (times) options["offset"] = times;
	/**
	* Convert any existing durations from seconds to milliseconds
	*/
	if (transition.duration) options["duration"] = secondsToMilliseconds(transition.duration);
	if (transition.repeatDelay) options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
	/**
	* Map easing names to Popmotion's easing functions
	*/
	if (ease) options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
	/**
	* Support legacy transition API
	*/
	if (transition.type === "tween") options.type = "keyframes";
	/**
	* TODO: These options are officially removed from the API.
	*/
	if (yoyo || loop || flip) {
		warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
		legacyRepeatWarning = true;
		if (yoyo) options.repeatType = "reverse";
		else if (loop) options.repeatType = "loop";
		else if (flip) options.repeatType = "mirror";
		options.repeat = loop || yoyo || flip || transition.repeat;
	}
	/**
	* TODO: Popmotion 9 has the ability to automatically detect whether to use
	* a keyframes or spring animation, but does so by detecting velocity and other spring options.
	* It'd be good to introduce a similar thing here.
	*/
	if (transition.type !== "spring") options.type = "keyframes";
	return options;
}
/**
* Get the delay for a value by checking Transition with decreasing specificity.
*/
function getDelayFromTransition(transition, key) {
	var _a;
	return (_a = (getValueTransition(transition, key) || {}).delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options) {
	if (Array.isArray(options.to) && options.to[0] === null) {
		options.to = __spreadArray([], __read(options.to));
		options.to[0] = options.from;
	}
	return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
	var _a;
	if (Array.isArray(options.to)) (_a = transition.duration) !== null && _a !== void 0 || (transition.duration = .8);
	hydrateKeyframes(options);
	/**
	* Get a default transition if none is determined to be defined.
	*/
	if (!isTransitionDefined(transition)) transition = __assign(__assign({}, transition), getDefaultTransition(key, options.to));
	return __assign(__assign({}, options), convertTransitionToAnimationOptions(transition));
}
/**
*
*/
function getAnimation(key, value, target, transition, onComplete) {
	var _a;
	var valueTransition = getValueTransition(transition, key);
	var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
	var isTargetAnimatable = isAnimatable(key, target);
	if (origin === "none" && isTargetAnimatable && typeof target === "string")
 /**
	* If we're trying to animate from "none", try and get an animatable version
	* of the target. This could be improved to work both ways.
	*/
	origin = getAnimatableNone(key, target);
	else if (isZero(origin) && typeof target === "string") origin = getZeroUnit(target);
	else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") target = getZeroUnit(origin);
	var isOriginAnimatable = isAnimatable(key, origin);
	warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key + " from \"" + origin + "\" to \"" + target + "\". " + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
	function start() {
		var options = {
			from: origin,
			to: target,
			velocity: value.getVelocity(),
			onComplete,
			onUpdate: function(v) {
				return value.set(v);
			}
		};
		return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign(__assign({}, options), valueTransition)) : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), {
			onUpdate: function(v) {
				var _a;
				options.onUpdate(v);
				(_a = valueTransition.onUpdate) === null || _a === void 0 || _a.call(valueTransition, v);
			},
			onComplete: function() {
				var _a;
				options.onComplete();
				(_a = valueTransition.onComplete) === null || _a === void 0 || _a.call(valueTransition);
			}
		}));
	}
	function set() {
		var _a;
		value.set(target);
		onComplete();
		(_a = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a === void 0 || _a.call(valueTransition);
		return { stop: function() {} };
	}
	return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
	return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
	return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
	return transition[key] || transition["default"] || transition;
}
/**
* Start animation on a MotionValue. This function is an interface between
* Framer Motion and Popmotion
*
* @internal
*/
function startAnimation(key, value, target, transition) {
	if (transition === void 0) transition = {};
	return value.start(function(onComplete) {
		var delayTimer;
		var controls;
		var animation = getAnimation(key, value, target, transition, onComplete);
		var delay = getDelayFromTransition(transition, key);
		var start = function() {
			return controls = animation();
		};
		if (delay) delayTimer = setTimeout(start, secondsToMilliseconds(delay));
		else start();
		return function() {
			clearTimeout(delayTimer);
			controls === null || controls === void 0 || controls.stop();
		};
	});
}
var legacyRepeatWarning;
var init_transitions = __esmMin((() => {
	init_tslib_es6();
	init_es$1();
	init_time_conversion();
	init_easing();
	init_is_animatable();
	init_default_transitions();
	init_hey_listen_es();
	init_animatable_none();
	legacyRepeatWarning = false;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/is-numerical-string.js
var isNumericalString;
var init_is_numerical_string = __esmMin((() => {
	isNumericalString = function(v) {
		return /^\-?\d*\.?\d+$/.test(v);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/array.js
function addUniqueItem(arr, item) {
	arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
	var index = arr.indexOf(item);
	index > -1 && arr.splice(index, 1);
}
var init_array = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/subscription-manager.js
var SubscriptionManager;
var init_subscription_manager = __esmMin((() => {
	init_array();
	SubscriptionManager = function() {
		function SubscriptionManager() {
			this.subscriptions = [];
		}
		SubscriptionManager.prototype.add = function(handler) {
			var _this = this;
			addUniqueItem(this.subscriptions, handler);
			return function() {
				return removeItem(_this.subscriptions, handler);
			};
		};
		SubscriptionManager.prototype.notify = function(a, b, c) {
			var numSubscriptions = this.subscriptions.length;
			if (!numSubscriptions) return;
			if (numSubscriptions === 1)
 /**
			* If there's only a single handler we can just call it without invoking a loop.
			*/
			this.subscriptions[0](a, b, c);
			else for (var i = 0; i < numSubscriptions; i++) {
				/**
				* Check whether the handler exists before firing as it's possible
				* the subscriptions were modified during this loop running.
				*/
				var handler = this.subscriptions[i];
				handler && handler(a, b, c);
			}
		};
		SubscriptionManager.prototype.getSize = function() {
			return this.subscriptions.length;
		};
		SubscriptionManager.prototype.clear = function() {
			this.subscriptions.length = 0;
		};
		return SubscriptionManager;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/value/index.js
/**
* @internal
*/
function motionValue(init) {
	return new MotionValue(init);
}
var isFloat, MotionValue;
var init_value = __esmMin((() => {
	init_es$2();
	init_es$1();
	init_subscription_manager();
	isFloat = function(value) {
		return !isNaN(parseFloat(value));
	};
	MotionValue = function() {
		/**
		* @param init - The initiating value
		* @param config - Optional configuration options
		*
		* -  `transformer`: A function to transform incoming values with.
		*
		* @internal
		*/
		function MotionValue(init) {
			var _this = this;
			/**
			* Duration, in milliseconds, since last updating frame.
			*
			* @internal
			*/
			this.timeDelta = 0;
			/**
			* Timestamp of the last time this `MotionValue` was updated.
			*
			* @internal
			*/
			this.lastUpdated = 0;
			/**
			* Functions to notify when the `MotionValue` updates.
			*
			* @internal
			*/
			this.updateSubscribers = new SubscriptionManager();
			/**
			* Functions to notify when the velocity updates.
			*
			* @internal
			*/
			this.velocityUpdateSubscribers = new SubscriptionManager();
			/**
			* Functions to notify when the `MotionValue` updates and `render` is set to `true`.
			*
			* @internal
			*/
			this.renderSubscribers = new SubscriptionManager();
			/**
			* Tracks whether this value can output a velocity. Currently this is only true
			* if the value is numerical, but we might be able to widen the scope here and support
			* other value types.
			*
			* @internal
			*/
			this.canTrackVelocity = false;
			this.updateAndNotify = function(v, render) {
				if (render === void 0) render = true;
				_this.prev = _this.current;
				_this.current = v;
				var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
				if (_this.lastUpdated !== timestamp) {
					_this.timeDelta = delta;
					_this.lastUpdated = timestamp;
					sync.postRender(_this.scheduleVelocityCheck);
				}
				if (_this.prev !== _this.current) _this.updateSubscribers.notify(_this.current);
				if (_this.velocityUpdateSubscribers.getSize()) _this.velocityUpdateSubscribers.notify(_this.getVelocity());
				if (render) _this.renderSubscribers.notify(_this.current);
			};
			/**
			* Schedule a velocity check for the next frame.
			*
			* This is an instanced and bound function to prevent generating a new
			* function once per frame.
			*
			* @internal
			*/
			this.scheduleVelocityCheck = function() {
				return sync.postRender(_this.velocityCheck);
			};
			/**
			* Updates `prev` with `current` if the value hasn't been updated this frame.
			* This ensures velocity calculations return `0`.
			*
			* This is an instanced and bound function to prevent generating a new
			* function once per frame.
			*
			* @internal
			*/
			this.velocityCheck = function(_a) {
				if (_a.timestamp !== _this.lastUpdated) {
					_this.prev = _this.current;
					_this.velocityUpdateSubscribers.notify(_this.getVelocity());
				}
			};
			this.hasAnimated = false;
			this.prev = this.current = init;
			this.canTrackVelocity = isFloat(this.current);
		}
		/**
		* Adds a function that will be notified when the `MotionValue` is updated.
		*
		* It returns a function that, when called, will cancel the subscription.
		*
		* When calling `onChange` inside a React component, it should be wrapped with the
		* `useEffect` hook. As it returns an unsubscribe function, this should be returned
		* from the `useEffect` function to ensure you don't add duplicate subscribers..
		*
		* @library
		*
		* ```jsx
		* function MyComponent() {
		*   const x = useMotionValue(0)
		*   const y = useMotionValue(0)
		*   const opacity = useMotionValue(1)
		*
		*   useEffect(() => {
		*     function updateOpacity() {
		*       const maxXY = Math.max(x.get(), y.get())
		*       const newOpacity = transform(maxXY, [0, 100], [1, 0])
		*       opacity.set(newOpacity)
		*     }
		*
		*     const unsubscribeX = x.onChange(updateOpacity)
		*     const unsubscribeY = y.onChange(updateOpacity)
		*
		*     return () => {
		*       unsubscribeX()
		*       unsubscribeY()
		*     }
		*   }, [])
		*
		*   return <Frame x={x} />
		* }
		* ```
		*
		* @motion
		*
		* ```jsx
		* export const MyComponent = () => {
		*   const x = useMotionValue(0)
		*   const y = useMotionValue(0)
		*   const opacity = useMotionValue(1)
		*
		*   useEffect(() => {
		*     function updateOpacity() {
		*       const maxXY = Math.max(x.get(), y.get())
		*       const newOpacity = transform(maxXY, [0, 100], [1, 0])
		*       opacity.set(newOpacity)
		*     }
		*
		*     const unsubscribeX = x.onChange(updateOpacity)
		*     const unsubscribeY = y.onChange(updateOpacity)
		*
		*     return () => {
		*       unsubscribeX()
		*       unsubscribeY()
		*     }
		*   }, [])
		*
		*   return <motion.div style={{ x }} />
		* }
		* ```
		*
		* @internalremarks
		*
		* We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
		*
		* ```jsx
		* useOnChange(x, () => {})
		* ```
		*
		* @param subscriber - A function that receives the latest value.
		* @returns A function that, when called, will cancel this subscription.
		*
		* @public
		*/
		MotionValue.prototype.onChange = function(subscription) {
			return this.updateSubscribers.add(subscription);
		};
		MotionValue.prototype.clearListeners = function() {
			this.updateSubscribers.clear();
		};
		/**
		* Adds a function that will be notified when the `MotionValue` requests a render.
		*
		* @param subscriber - A function that's provided the latest value.
		* @returns A function that, when called, will cancel this subscription.
		*
		* @internal
		*/
		MotionValue.prototype.onRenderRequest = function(subscription) {
			subscription(this.get());
			return this.renderSubscribers.add(subscription);
		};
		/**
		* Attaches a passive effect to the `MotionValue`.
		*
		* @internal
		*/
		MotionValue.prototype.attach = function(passiveEffect) {
			this.passiveEffect = passiveEffect;
		};
		/**
		* Sets the state of the `MotionValue`.
		*
		* @remarks
		*
		* ```jsx
		* const x = useMotionValue(0)
		* x.set(10)
		* ```
		*
		* @param latest - Latest value to set.
		* @param render - Whether to notify render subscribers. Defaults to `true`
		*
		* @public
		*/
		MotionValue.prototype.set = function(v, render) {
			if (render === void 0) render = true;
			if (!render || !this.passiveEffect) this.updateAndNotify(v, render);
			else this.passiveEffect(v, this.updateAndNotify);
		};
		/**
		* Returns the latest state of `MotionValue`
		*
		* @returns - The latest state of `MotionValue`
		*
		* @public
		*/
		MotionValue.prototype.get = function() {
			return this.current;
		};
		/**
		* @public
		*/
		MotionValue.prototype.getPrevious = function() {
			return this.prev;
		};
		/**
		* Returns the latest velocity of `MotionValue`
		*
		* @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
		*
		* @public
		*/
		MotionValue.prototype.getVelocity = function() {
			return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
		};
		/**
		* Registers a new animation to control this `MotionValue`. Only one
		* animation can drive a `MotionValue` at one time.
		*
		* ```jsx
		* value.start()
		* ```
		*
		* @param animation - A function that starts the provided animation
		*
		* @internal
		*/
		MotionValue.prototype.start = function(animation) {
			var _this = this;
			this.stop();
			return new Promise(function(resolve) {
				_this.hasAnimated = true;
				_this.stopAnimation = animation(resolve);
			}).then(function() {
				return _this.clearAnimation();
			});
		};
		/**
		* Stop the currently active animation.
		*
		* @public
		*/
		MotionValue.prototype.stop = function() {
			if (this.stopAnimation) this.stopAnimation();
			this.clearAnimation();
		};
		/**
		* Returns `true` if this value is currently animating.
		*
		* @public
		*/
		MotionValue.prototype.isAnimating = function() {
			return !!this.stopAnimation;
		};
		MotionValue.prototype.clearAnimation = function() {
			this.stopAnimation = null;
		};
		/**
		* Destroy and clean up subscribers to this `MotionValue`.
		*
		* The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
		* handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
		* created a `MotionValue` via the `motionValue` function.
		*
		* @public
		*/
		MotionValue.prototype.destroy = function() {
			this.updateSubscribers.clear();
			this.renderSubscribers.clear();
			this.stop();
		};
		return MotionValue;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/test.js
var testValueType;
var init_test = __esmMin((() => {
	testValueType = function(v) {
		return function(type) {
			return type.test(v);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.js
var auto;
var init_type_auto = __esmMin((() => {
	auto = {
		test: function(v) {
			return v === "auto";
		},
		parse: function(v) {
			return v;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.js
var dimensionValueTypes, findDimensionValueType;
var init_dimensions = __esmMin((() => {
	init_es$3();
	init_test();
	init_type_auto();
	dimensionValueTypes = [
		number,
		px,
		percent,
		degrees,
		vw,
		vh,
		auto
	];
	findDimensionValueType = function(v) {
		return dimensionValueTypes.find(testValueType(v));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/value-types/find.js
var valueTypes, findValueType;
var init_find = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_dimensions();
	init_test();
	valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
	findValueType = function(v) {
		return valueTypes.find(testValueType(v));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/setters.js
/**
* Set VisualElement's MotionValue, creating a new MotionValue for it if
* it doesn't exist.
*/
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue(value));
}
function setTarget(visualElement, definition) {
	var resolved = resolveVariant(visualElement, definition);
	var _a = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
	_a.transition;
	var target = __rest(_a, ["transitionEnd", "transition"]);
	target = __assign(__assign({}, target), transitionEnd);
	for (var key in target) setMotionValue(visualElement, key, resolveFinalValueInKeyframes(target[key]));
}
function checkTargetForNewValues(visualElement, target, origin) {
	var _a, _b, _c;
	var _d;
	var newValueKeys = Object.keys(target).filter(function(key) {
		return !visualElement.hasValue(key);
	});
	var numNewValues = newValueKeys.length;
	if (!numNewValues) return;
	for (var i = 0; i < numNewValues; i++) {
		var key = newValueKeys[i];
		var targetValue = target[key];
		var value = null;
		/**
		* If the target is a series of keyframes, we can use the first value
		* in the array. If this first value is null, we'll still need to read from the DOM.
		*/
		if (Array.isArray(targetValue)) value = targetValue[0];
		/**
		* If the target isn't keyframes, or the first keyframe was null, we need to
		* first check if an origin value was explicitly defined in the transition as "from",
		* if not read the value from the DOM. As an absolute fallback, take the defined target value.
		*/
		if (value === null) value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
		/**
		* If value is still undefined or null, ignore it. Preferably this would throw,
		* but this was causing issues in Framer.
		*/
		if (value === void 0 || value === null) continue;
		if (typeof value === "string" && isNumericalString(value)) value = parseFloat(value);
		else if (!findValueType(value) && complex.test(targetValue)) value = getAnimatableNone(key, targetValue);
		visualElement.addValue(key, motionValue(value));
		(_c = (_d = origin)[key]) !== null && _c !== void 0 || (_d[key] = value);
		visualElement.setBaseTarget(key, value);
	}
}
function getOriginFromTransition(key, transition) {
	if (!transition) return;
	return (transition[key] || transition["default"] || transition).from;
}
function getOrigin(target, transition, visualElement) {
	var _a, _b;
	var origin = {};
	for (var key in target) origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
	return origin;
}
var init_setters = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_is_numerical_string();
	init_resolve_value();
	init_value();
	init_animatable_none();
	init_find();
	init_variants();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/animation.js
/**
* @internal
*/
function animateVisualElement(visualElement, definition, options) {
	if (options === void 0) options = {};
	visualElement.notifyAnimationStart();
	var animation;
	if (Array.isArray(definition)) {
		var animations = definition.map(function(variant) {
			return animateVariant(visualElement, variant, options);
		});
		animation = Promise.all(animations);
	} else if (typeof definition === "string") animation = animateVariant(visualElement, definition, options);
	else animation = animateTarget(visualElement, typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition, options);
	return animation.then(function() {
		return visualElement.notifyAnimationComplete(definition);
	});
}
function animateVariant(visualElement, variant, options) {
	var _a;
	if (options === void 0) options = {};
	var resolved = resolveVariant(visualElement, variant, options.custom);
	var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement.getDefaultTransition() || {} : _b;
	if (options.transitionOverride) transition = options.transitionOverride;
	/**
	* If we have a variant, create a callback that runs it as an animation.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	var getAnimation = resolved ? function() {
		return animateTarget(visualElement, resolved, options);
	} : function() {
		return Promise.resolve();
	};
	/**
	* If we have children, create a callback that runs all their animations.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	var getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
		if (forwardDelay === void 0) forwardDelay = 0;
		var _a = transition.delayChildren, delayChildren = _a === void 0 ? 0 : _a, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
		return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
	} : function() {
		return Promise.resolve();
	};
	/**
	* If the transition explicitly defines a "when" option, we need to resolve either
	* this animation or all children animations before playing the other.
	*/
	var when = transition.when;
	if (when) {
		var _c = __read(when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation], 2), first = _c[0], last = _c[1];
		return first().then(last);
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
/**
* @internal
*/
function animateTarget(visualElement, definition, _a) {
	var _b;
	var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
	var _e = visualElement.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
	if (transitionOverride) transition = transitionOverride;
	var animations = [];
	var animationTypeState = type && ((_b = visualElement.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
	for (var key in target) {
		var value = visualElement.getValue(key);
		var valueTarget = target[key];
		if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) continue;
		var animation = startAnimation(key, value, valueTarget, __assign({ delay }, transition));
		animations.push(animation);
	}
	return Promise.all(animations).then(function() {
		transitionEnd && setTarget(visualElement, transitionEnd);
	});
}
function animateChildren(visualElement, variant, delayChildren, staggerChildren, staggerDirection, options) {
	if (delayChildren === void 0) delayChildren = 0;
	if (staggerChildren === void 0) staggerChildren = 0;
	if (staggerDirection === void 0) staggerDirection = 1;
	var animations = [];
	var maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
	var generateStaggerDuration = staggerDirection === 1 ? function(i) {
		if (i === void 0) i = 0;
		return i * staggerChildren;
	} : function(i) {
		if (i === void 0) i = 0;
		return maxStaggerDuration - i * staggerChildren;
	};
	Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
		animations.push(animateVariant(child, variant, __assign(__assign({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
			return child.notifyAnimationComplete(variant);
		}));
	});
	return Promise.all(animations);
}
function sortByTreeOrder(a, b) {
	return a.sortNodePosition(b);
}
/**
* Decide whether we should block this animation. Previously, we achieved this
* just by checking whether the key was listed in protectedKeys, but this
* posed problems if an animation was triggered by afterChildren and protectedKeys
* had been set to true in the meantime.
*/
function shouldBlockAnimation(_a, key) {
	var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
	var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
var init_animation = __esmMin((() => {
	init_tslib_es6();
	init_transitions();
	init_setters();
	init_variants();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/animation-state.js
function animateList(visualElement) {
	return function(animations) {
		return Promise.all(animations.map(function(_a) {
			var animation = _a.animation, options = _a.options;
			return animateVisualElement(visualElement, animation, options);
		}));
	};
}
function createAnimationState(visualElement) {
	var animate = animateList(visualElement);
	var state = createState();
	var allAnimatedKeys = {};
	var isInitialRender = true;
	/**
	* This function will be used to reduce the animation definitions for
	* each active animation type into an object of resolved values for it.
	*/
	var buildResolvedTypeValues = function(acc, definition) {
		var resolved = resolveVariant(visualElement, definition);
		if (resolved) {
			resolved.transition;
			var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
			acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
		}
		return acc;
	};
	function isAnimated(key) {
		return allAnimatedKeys[key] !== void 0;
	}
	/**
	* This just allows us to inject mocked animation functions
	* @internal
	*/
	function setAnimateFunction(makeAnimator) {
		animate = makeAnimator(visualElement);
	}
	/**
	* When we receive new props, we need to:
	* 1. Create a list of protected keys for each type. This is a directory of
	*    value keys that are currently being "handled" by types of a higher priority
	*    so that whenever an animation is played of a given type, these values are
	*    protected from being animated.
	* 2. Determine if an animation type needs animating.
	* 3. Determine if any values have been removed from a type and figure out
	*    what to animate those to.
	*/
	function animateChanges(options, changedActiveType) {
		var _a;
		var props = visualElement.getProps();
		var context = visualElement.getVariantContext(true) || {};
		/**
		* A list of animations that we'll build into as we iterate through the animation
		* types. This will get executed at the end of the function.
		*/
		var animations = [];
		/**
		* Keep track of which values have been removed. Then, as we hit lower priority
		* animation types, we can check if they contain removed values and animate to that.
		*/
		var removedKeys = /* @__PURE__ */ new Set();
		/**
		* A dictionary of all encountered keys. This is an object to let us build into and
		* copy it without iteration. Each time we hit an animation type we set its protected
		* keys - the keys its not allowed to animate - to the latest version of this object.
		*/
		var encounteredKeys = {};
		/**
		* If a variant has been removed at a given index, and this component is controlling
		* variant animations, we want to ensure lower-priority variants are forced to animate.
		*/
		var removedVariantIndex = Infinity;
		var _loop_1 = function(i) {
			var type = reversePriorityOrder[i];
			var typeState = state[type];
			var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
			var propIsVariant = isVariantLabel(prop);
			/**
			* If this type has *just* changed isActive status, set activeDelta
			* to that status. Otherwise set to null.
			*/
			var activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i;
			/**
			* If this prop is an inherited variant, rather than been set directly on the
			* component itself, we want to make sure we allow the parent to trigger animations.
			*
			* TODO: Can probably change this to a !isControllingVariants check
			*/
			var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			/**
			*
			*/
			if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
			/**
			* Set all encountered keys so far as the protected keys for this type. This will
			* be any key that has been animated or otherwise handled by active, higher-priortiy types.
			*/
			typeState.protectedKeys = __assign({}, encounteredKeys);
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") return "continue";
			/**
			* As we go look through the values defined on this type, if we detect
			* a changed value or a value that was removed in a higher priority, we set
			* this to true and add this prop to the animation list.
			*/
			var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
			/**
			* As animations can be set as variant lists, variants or target objects, we
			* coerce everything to an array if it isn't one already
			*/
			var definitionList = Array.isArray(prop) ? prop : [prop];
			/**
			* Build an object of all the resolved values. We'll use this in the subsequent
			* animateChanges calls to determine whether a value has changed.
			*/
			var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
			if (activeDelta === false) resolvedValues = {};
			/**
			* Now we need to loop through all the keys in the prev prop and this prop,
			* and decide:
			* 1. If the value has changed, and needs animating
			* 2. If it has been removed, and needs adding to the removedKeys set
			* 3. If it has been removed in a higher priority type and needs animating
			* 4. If it hasn't been removed in a higher priority but hasn't changed, and
			*    needs adding to the type's protectedKeys list.
			*/
			var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
			var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
			var markToAnimate = function(key) {
				shouldAnimateType = true;
				removedKeys.delete(key);
				typeState.needsAnimating[key] = true;
			};
			for (var key in allKeys) {
				var next = resolvedValues[key];
				var prev = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				/**
				* If the value has changed, we probably want to animate it.
				*/
				if (next !== prev) {
					/**
					* If both values are keyframes, we need to shallow compare them to
					* detect whether any value has changed. If it has, we animate it.
					*/
					if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
						if (!shallowCompare(next, prev)) markToAnimate(key);
						else
 /**
						* If it hasn't changed, we want to ensure it doesn't animate by
						* adding it to the list of protected keys.
						*/
						typeState.protectedKeys[key] = true;
					} else if (next !== void 0) markToAnimate(key);
					else removedKeys.add(key);
				} else if (next !== void 0 && removedKeys.has(key))
 /**
				* If next hasn't changed and it isn't undefined, we want to check if it's
				* been removed by a higher priority
				*/
				markToAnimate(key);
				else
 /**
				* If it hasn't changed, we add it to the list of protected values
				* to ensure it doesn't get animated.
				*/
				typeState.protectedKeys[key] = true;
			}
			/**
			* Update the typeState so next time animateChanges is called we can compare the
			* latest prop and resolvedValues to these.
			*/
			typeState.prevProp = prop;
			typeState.prevResolvedValues = resolvedValues;
			/**
			*
			*/
			if (typeState.isActive) encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
			if (isInitialRender && visualElement.blockInitialAnimation) shouldAnimateType = false;
			/**
			* If this is an inherited prop we want to hard-block animations
			* TODO: Test as this should probably still handle animations triggered
			* by removed values?
			*/
			if (shouldAnimateType && !isInherited) animations.push.apply(animations, __spreadArray([], __read(definitionList.map(function(animation) {
				return {
					animation,
					options: __assign({ type }, options)
				};
			}))));
		};
		/**
		* Iterate through all animation types in reverse priority order. For each, we want to
		* detect which values it's handling and whether or not they've changed (and therefore
		* need to be animated). If any values have been removed, we want to detect those in
		* lower priority props and flag for animation.
		*/
		for (var i = 0; i < numAnimationTypes; i++) _loop_1(i);
		allAnimatedKeys = __assign({}, encounteredKeys);
		/**
		* If there are some removed value that haven't been dealt with,
		* we need to create a new animation that falls back either to the value
		* defined in the style prop, or the last read value.
		*/
		if (removedKeys.size) {
			var fallbackAnimation_1 = {};
			removedKeys.forEach(function(key) {
				var fallbackTarget = visualElement.getBaseTarget(key);
				if (fallbackTarget !== void 0) fallbackAnimation_1[key] = fallbackTarget;
			});
			animations.push({ animation: fallbackAnimation_1 });
		}
		var shouldAnimate = Boolean(animations.length);
		if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) shouldAnimate = false;
		isInitialRender = false;
		return shouldAnimate ? animate(animations) : Promise.resolve();
	}
	/**
	* Change whether a certain animation type is active.
	*/
	function setActive(type, isActive, options) {
		var _a;
		if (state[type].isActive === isActive) return Promise.resolve();
		(_a = visualElement.variantChildren) === null || _a === void 0 || _a.forEach(function(child) {
			var _a;
			return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive);
		});
		state[type].isActive = isActive;
		return animateChanges(options, type);
	}
	return {
		isAnimated,
		animateChanges,
		setActive,
		setAnimateFunction,
		getState: function() {
			return state;
		}
	};
}
function variantsHaveChanged(prev, next) {
	if (typeof next === "string") return next !== prev;
	else if (isVariantLabels(next)) return !shallowCompare(next, prev);
	return false;
}
function createTypeState(isActive) {
	if (isActive === void 0) isActive = false;
	return {
		isActive,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
}
function createState() {
	var _a = {};
	return _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}
var variantPriorityOrder, reversePriorityOrder, numAnimationTypes;
var init_animation_state = __esmMin((() => {
	init_tslib_es6();
	init_is_animation_controls();
	init_is_keyframes_target();
	init_shallow_compare();
	init_animation();
	init_types$1();
	init_variants();
	variantPriorityOrder = [
		AnimationType.Animate,
		AnimationType.Hover,
		AnimationType.Tap,
		AnimationType.Drag,
		AnimationType.Focus,
		AnimationType.Exit
	];
	reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
	numAnimationTypes = variantPriorityOrder.length;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/animations.js
var import_react$10, animations;
var init_animations = __esmMin((() => {
	init_tslib_es6();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_is_animation_controls();
	init_use_presence();
	init_PresenceContext();
	init_animation_state();
	init_types$1();
	init_make_renderless_component();
	animations = {
		animation: makeRenderlessComponent(function(_a) {
			var visualElement = _a.visualElement, animate = _a.animate;
			/**
			* We dynamically generate the AnimationState manager as it contains a reference
			* to the underlying animation library. We only want to load that if we load this,
			* so people can optionally code split it out using the `m` component.
			*/
			visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
			/**
			* Subscribe any provided AnimationControls to the component's VisualElement
			*/
			if (isAnimationControls(animate)) (0, import_react$10.useEffect)(function() {
				return animate.subscribe(visualElement);
			}, [animate]);
		}),
		exit: makeRenderlessComponent(function(props) {
			var custom = props.custom, visualElement = props.visualElement;
			var _a = __read(usePresence(), 2), isPresent = _a[0], onExitComplete = _a[1];
			var presenceContext = (0, import_react$10.useContext)(PresenceContext);
			(0, import_react$10.useEffect)(function() {
				var _a, _b;
				var animation = (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
				!isPresent && (animation === null || animation === void 0 || animation.then(onExitComplete));
			}, [isPresent]);
		})
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/PanSession.js
function transformPoint(info, transformPagePoint) {
	return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function getPanInfo(_a, history) {
	var point = _a.point;
	return {
		point,
		delta: subtractPoint(point, lastDevicePoint(history)),
		offset: subtractPoint(point, startDevicePoint(history)),
		velocity: getVelocity(history, .1)
	};
}
function startDevicePoint(history) {
	return history[0];
}
function lastDevicePoint(history) {
	return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
	if (history.length < 2) return {
		x: 0,
		y: 0
	};
	var i = history.length - 1;
	var timestampedPoint = null;
	var lastPoint = lastDevicePoint(history);
	while (i >= 0) {
		timestampedPoint = history[i];
		if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) break;
		i--;
	}
	if (!timestampedPoint) return {
		x: 0,
		y: 0
	};
	var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
	if (time === 0) return {
		x: 0,
		y: 0
	};
	var currentVelocity = {
		x: (lastPoint.x - timestampedPoint.x) / time,
		y: (lastPoint.y - timestampedPoint.y) / time
	};
	if (currentVelocity.x === Infinity) currentVelocity.x = 0;
	if (currentVelocity.y === Infinity) currentVelocity.y = 0;
	return currentVelocity;
}
var PanSession;
var init_PanSession = __esmMin((() => {
	init_tslib_es6();
	init_event_type();
	init_event_info();
	init_es$2();
	init_time_conversion();
	init_use_pointer_event();
	init_es$1();
	PanSession = function() {
		function PanSession(event, handlers, _a) {
			var _this = this;
			var transformPagePoint = (_a === void 0 ? {} : _a).transformPagePoint;
			/**
			* @internal
			*/
			this.startEvent = null;
			/**
			* @internal
			*/
			this.lastMoveEvent = null;
			/**
			* @internal
			*/
			this.lastMoveEventInfo = null;
			/**
			* @internal
			*/
			this.handlers = {};
			this.updatePoint = function() {
				if (!(_this.lastMoveEvent && _this.lastMoveEventInfo)) return;
				var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
				var isPanStarted = _this.startEvent !== null;
				var isDistancePastThreshold = distance(info.offset, {
					x: 0,
					y: 0
				}) >= 3;
				if (!isPanStarted && !isDistancePastThreshold) return;
				var point = info.point;
				var timestamp = getFrameData().timestamp;
				_this.history.push(__assign(__assign({}, point), { timestamp }));
				var _a = _this.handlers, onStart = _a.onStart, onMove = _a.onMove;
				if (!isPanStarted) {
					onStart && onStart(_this.lastMoveEvent, info);
					_this.startEvent = _this.lastMoveEvent;
				}
				onMove && onMove(_this.lastMoveEvent, info);
			};
			this.handlePointerMove = function(event, info) {
				_this.lastMoveEvent = event;
				_this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint);
				if (isMouseEvent(event) && event.buttons === 0) {
					_this.handlePointerUp(event, info);
					return;
				}
				sync.update(_this.updatePoint, true);
			};
			this.handlePointerUp = function(event, info) {
				_this.end();
				var _a = _this.handlers, onEnd = _a.onEnd, onSessionEnd = _a.onSessionEnd;
				var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);
				if (_this.startEvent && onEnd) onEnd(event, panInfo);
				onSessionEnd && onSessionEnd(event, panInfo);
			};
			if (isTouchEvent(event) && event.touches.length > 1) return;
			this.handlers = handlers;
			this.transformPagePoint = transformPagePoint;
			var initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
			var point = initialInfo.point;
			var timestamp = getFrameData().timestamp;
			this.history = [__assign(__assign({}, point), { timestamp })];
			var onSessionStart = handlers.onSessionStart;
			onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
			this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
		}
		PanSession.prototype.updateHandlers = function(handlers) {
			this.handlers = handlers;
		};
		PanSession.prototype.end = function() {
			this.removeListeners && this.removeListeners();
			cancelSync.update(this.updatePoint);
		};
		return PanSession;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/noop.js
function noop(any) {
	return any;
}
var init_noop = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/geometry/index.js
/**
* Bounding boxes tend to be defined as top, left, right, bottom. For various operations
* it's easier to consider each axis individually. This function returns a bounding box
* as a map of single-axis min/max values.
*/
function convertBoundingBoxToAxisBox(_a) {
	var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
function convertAxisBoxToBoundingBox(_a) {
	var x = _a.x, y = _a.y;
	return {
		top: y.min,
		bottom: y.max,
		left: x.min,
		right: x.max
	};
}
/**
* Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
* provided by Framer to allow measured points to be corrected for device scaling. This is used
* when measuring DOM elements and DOM event points.
*/
function transformBoundingBox(_a, transformPoint) {
	var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
	if (transformPoint === void 0) transformPoint = noop;
	var topLeft = transformPoint({
		x: left,
		y: top
	});
	var bottomRight = transformPoint({
		x: right,
		y: bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
/**
* Create an empty axis box of zero size
*/
function axisBox() {
	return {
		x: {
			min: 0,
			max: 1
		},
		y: {
			min: 0,
			max: 1
		}
	};
}
function copyAxisBox(box) {
	return {
		x: __assign({}, box.x),
		y: __assign({}, box.y)
	};
}
function delta() {
	return {
		x: __assign({}, zeroDelta),
		y: __assign({}, zeroDelta)
	};
}
var zeroDelta;
var init_geometry = __esmMin((() => {
	init_tslib_es6();
	init_noop();
	zeroDelta = {
		translate: 0,
		scale: 1,
		origin: 0,
		originPoint: 0
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/each-axis.js
function eachAxis(handler) {
	return [handler("x"), handler("y")];
}
var init_each_axis = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.js
/**
* Apply constraints to a point. These constraints are both physical along an
* axis, and an elastic factor that determines how much to constrain the point
* by if it does lie outside the defined parameters.
*/
function applyConstraints(point, _a, elastic) {
	var min = _a.min, max = _a.max;
	if (min !== void 0 && point < min) point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
	else if (max !== void 0 && point > max) point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
	return point;
}
/**
* Calculates a min projection point based on a pointer, pointer progress
* within the drag target, and constraints.
*
* For instance if an element was 100px width, we were dragging from 0.25
* along this axis, the pointer is at 200px, and there were no constraints,
* we would calculate a min projection point of 175px.
*/
function calcConstrainedMinPoint(point, length, progress, constraints, elastic) {
	var min = point - length * progress;
	return constraints ? applyConstraints(min, constraints, elastic) : min;
}
/**
* Calculate constraints in terms of the viewport when defined relatively to the
* measured axis. This is measured from the nearest edge, so a max constraint of 200
* on an axis with a max value of 300 would return a constraint of 500 - axis length
*/
function calcRelativeAxisConstraints(axis, min, max) {
	return {
		min: min !== void 0 ? axis.min + min : void 0,
		max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
	};
}
/**
* Calculate constraints in terms of the viewport when
* defined relatively to the measured bounding box.
*/
function calcRelativeConstraints(layoutBox, _a) {
	var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
	return {
		x: calcRelativeAxisConstraints(layoutBox.x, left, right),
		y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
	};
}
/**
* Calculate viewport constraints when defined as another viewport-relative axis
*/
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
	var _a;
	var min = constraintsAxis.min - layoutAxis.min;
	var max = constraintsAxis.max - layoutAxis.max;
	if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) _a = __read([max, min], 2), min = _a[0], max = _a[1];
	return {
		min: layoutAxis.min + min,
		max: layoutAxis.min + max
	};
}
/**
* Calculate viewport constraints when defined as another viewport-relative box
*/
function calcViewportConstraints(layoutBox, constraintsBox) {
	return {
		x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
		y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
	};
}
/**
* Calculate the an axis position based on two axes and a progress value.
*/
function calcPositionFromProgress(axis, constraints, progress) {
	var axisLength = axis.max - axis.min;
	var min = mix(constraints.min, constraints.max - axisLength, progress);
	return {
		min,
		max: min + axisLength
	};
}
/**
* Rebase the calculated viewport constraints relative to the layout.min point.
*/
function rebaseAxisConstraints(layout, constraints) {
	var relativeConstraints = {};
	if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout.min;
	if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout.min;
	return relativeConstraints;
}
/**
* Accepts a dragElastic prop and returns resolved elastic values for each axis.
*/
function resolveDragElastic(dragElastic) {
	if (dragElastic === false) dragElastic = 0;
	else if (dragElastic === true) dragElastic = defaultElastic;
	return {
		x: resolveAxisElastic(dragElastic, "left", "right"),
		y: resolveAxisElastic(dragElastic, "top", "bottom")
	};
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
	return {
		min: resolvePointElastic(dragElastic, minLabel),
		max: resolvePointElastic(dragElastic, maxLabel)
	};
}
function resolvePointElastic(dragElastic, label) {
	var _a;
	return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
var defaultElastic;
var init_constraints = __esmMin((() => {
	init_tslib_es6();
	init_es$1();
	defaultElastic = .35;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/measure.js
/**
* Measure and return the element bounding box.
*
* We convert the box into an AxisBox2D to make it easier to work with each axis
* individually and programmatically.
*
* This function optionally accepts a transformPagePoint function which allows us to compensate
* for, for instance, measuring the element within a scaled plane like a Framer devivce preview component.
*/
function getBoundingBox(element, transformPagePoint) {
	return convertBoundingBoxToAxisBox(transformBoundingBox(element.getBoundingClientRect(), transformPagePoint));
}
var init_measure = __esmMin((() => {
	init_geometry();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/geometry/delta-calc.js
/**
* Returns true if the provided value is within maxDistance of the provided target
*/
function isNear(value, target, maxDistance) {
	if (target === void 0) target = 0;
	if (maxDistance === void 0) maxDistance = .01;
	return distance(value, target) < maxDistance;
}
function calcLength(axis) {
	return axis.max - axis.min;
}
/**
* Calculate a transform origin relative to the source axis, between 0-1, that results
* in an asthetically pleasing scale/transform needed to project from source to target.
*/
function calcOrigin(source, target) {
	var origin = .5;
	var sourceLength = calcLength(source);
	var targetLength = calcLength(target);
	if (targetLength > sourceLength) origin = progress(target.min, target.max - sourceLength, source.min);
	else if (sourceLength > targetLength) origin = progress(source.min, source.max - targetLength, target.min);
	return clampProgress(origin);
}
/**
* Update the AxisDelta with a transform that projects source into target.
*
* The transform `origin` is optional. If not provided, it'll be automatically
* calculated based on the relative positions of the two bounding boxes.
*/
function updateAxisDelta(delta, source, target, origin) {
	if (origin === void 0) origin = .5;
	delta.origin = origin;
	delta.originPoint = mix(source.min, source.max, delta.origin);
	delta.scale = calcLength(target) / calcLength(source);
	if (isNear(delta.scale, 1, 1e-4)) delta.scale = 1;
	delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
	if (isNear(delta.translate)) delta.translate = 0;
}
/**
* Update the BoxDelta with a transform that projects the source into the target.
*
* The transform `origin` is optional. If not provided, it'll be automatically
* calculated based on the relative positions of the two bounding boxes.
*/
function updateBoxDelta(delta, source, target, origin) {
	updateAxisDelta(delta.x, source.x, target.x, defaultOrigin(origin.originX));
	updateAxisDelta(delta.y, source.y, target.y, defaultOrigin(origin.originY));
}
/**
* Currently this only accepts numerical origins, measured as 0-1, but could
* accept pixel values by comparing to the target axis.
*/
function defaultOrigin(origin) {
	return typeof origin === "number" ? origin : .5;
}
function calcRelativeAxis(target, relative, parent) {
	target.min = parent.min + relative.min;
	target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
	calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
	calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}
var clampProgress;
var init_delta_calc = __esmMin((() => {
	init_es$1();
	clampProgress = function(v) {
		return clamp(0, 1, v);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.js
var compareByDepth;
var init_compare_by_depth = __esmMin((() => {
	compareByDepth = function(a, b) {
		return a.depth - b.depth;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/utils.js
function isProjecting(visualElement) {
	return visualElement.projection.isEnabled || visualElement.shouldResetTransform();
}
function collectProjectingAncestors(visualElement, ancestors) {
	if (ancestors === void 0) ancestors = [];
	var parent = visualElement.parent;
	if (parent) collectProjectingAncestors(parent, ancestors);
	if (isProjecting(visualElement)) ancestors.push(visualElement);
	return ancestors;
}
function collectProjectingChildren(visualElement) {
	var children = [];
	var addChild = function(child) {
		if (isProjecting(child)) children.push(child);
		child.children.forEach(addChild);
	};
	visualElement.children.forEach(addChild);
	return children.sort(compareByDepth);
}
/**
* Update the layoutState by measuring the DOM layout. This
* should be called after resetting any layout-affecting transforms.
*/
function updateLayoutMeasurement(visualElement) {
	if (visualElement.shouldResetTransform()) return;
	var layoutState = visualElement.getLayoutState();
	visualElement.notifyBeforeLayoutMeasure(layoutState.layout);
	layoutState.isHydrated = true;
	layoutState.layout = visualElement.measureViewportBox();
	layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
	visualElement.notifyLayoutMeasure(layoutState.layout, visualElement.prevViewportBox || layoutState.layout);
	sync.update(function() {
		return visualElement.rebaseProjectionTarget();
	});
}
/**
* Record the viewport box as it was before an expected mutation/re-render
*/
function snapshotViewportBox(visualElement) {
	if (visualElement.shouldResetTransform()) return;
	visualElement.prevViewportBox = visualElement.measureViewportBox(false);
	/**
	* Update targetBox to match the prevViewportBox. This is just to ensure
	* that targetBox is affected by scroll in the same way as the measured box
	*/
	visualElement.rebaseProjectionTarget(false, visualElement.prevViewportBox);
}
var init_utils$1 = __esmMin((() => {
	init_es$2();
	init_geometry();
	init_compare_by_depth();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/layout/utils.js
function tweenAxis(target, prev, next, p) {
	target.min = mix(prev.min, next.min, p);
	target.max = mix(prev.max, next.max, p);
}
function calcRelativeOffsetAxis(parent, child) {
	return {
		min: child.min - parent.min,
		max: child.max - parent.min
	};
}
function calcRelativeOffset(parent, child) {
	return {
		x: calcRelativeOffsetAxis(parent.x, child.x),
		y: calcRelativeOffsetAxis(parent.y, child.y)
	};
}
function checkIfParentHasChanged(prev, next) {
	var prevId = prev.getLayoutId();
	var nextId = next.getLayoutId();
	return prevId !== nextId || nextId === void 0 && prev !== next;
}
var init_utils = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/is-draggable.js
function isDraggable(visualElement) {
	var _a = visualElement.getProps(), drag = _a.drag, _dragX = _a._dragX;
	return drag && !_dragX;
}
var init_is_draggable = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/geometry/delta-apply.js
/**
* Reset an axis to the provided origin box.
*
* This is a mutative operation.
*/
function resetAxis(axis, originAxis) {
	axis.min = originAxis.min;
	axis.max = originAxis.max;
}
/**
* Reset a box to the provided origin box.
*
* This is a mutative operation.
*/
function resetBox(box, originBox) {
	resetAxis(box.x, originBox.x);
	resetAxis(box.y, originBox.y);
}
/**
* Scales a point based on a factor and an originPoint
*/
function scalePoint(point, scale, originPoint) {
	return originPoint + scale * (point - originPoint);
}
/**
* Applies a translate/scale delta to a point
*/
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale, originPoint) + translate;
}
/**
* Applies a translate/scale delta to an axis
*/
function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
	if (translate === void 0) translate = 0;
	if (scale === void 0) scale = 1;
	axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Applies a translate/scale delta to a box
*/
function applyBoxDelta(box, _a) {
	var x = _a.x, y = _a.y;
	applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
* Apply a transform to an axis from the latest resolved motion values.
* This function basically acts as a bridge between a flat motion value map
* and applyAxisDelta
*/
function applyAxisTransforms(final, axis, transforms, _a) {
	var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
	final.min = axis.min;
	final.max = axis.max;
	var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : .5;
	var originPoint = mix(axis.min, axis.max, axisOrigin);
	applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
* Apply a transform to a box from the latest resolved motion values.
*/
function applyBoxTransforms(finalBox, box, transforms) {
	applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
	applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
/**
* Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
*/
function removePointDelta(point, translate, scale, originPoint, boxScale) {
	point -= translate;
	point = scalePoint(point, 1 / scale, originPoint);
	if (boxScale !== void 0) point = scalePoint(point, 1 / boxScale, originPoint);
	return point;
}
/**
* Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
*/
function removeAxisDelta(axis, translate, scale, origin, boxScale) {
	if (translate === void 0) translate = 0;
	if (scale === void 0) scale = 1;
	if (origin === void 0) origin = .5;
	var originPoint = mix(axis.min, axis.max, origin) - translate;
	axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeAxisTransforms(axis, transforms, _a) {
	var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
	removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
/**
* Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeBoxTransforms(box, transforms) {
	removeAxisTransforms(box.x, transforms, xKeys);
	removeAxisTransforms(box.y, transforms, yKeys);
}
/**
* Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
* in a tree upon our box before then calculating how to project it into our desired viewport-relative box
*
* This is the final nested loop within updateLayoutDelta for future refactoring
*/
function applyTreeDeltas(box, treeScale, treePath) {
	var treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	var node;
	var delta;
	for (var i = 0; i < treeLength; i++) {
		node = treePath[i];
		delta = node.getLayoutState().delta;
		treeScale.x *= delta.x.scale;
		treeScale.y *= delta.y.scale;
		applyBoxDelta(box, delta);
		if (isDraggable(node)) applyBoxTransforms(box, box, node.getLatestValues());
	}
}
var xKeys, yKeys;
var init_delta_apply = __esmMin((() => {
	init_tslib_es6();
	init_es$1();
	init_is_draggable();
	xKeys = [
		"x",
		"scaleX",
		"originX"
	];
	yKeys = [
		"y",
		"scaleY",
		"originY"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/convert-to-relative.js
/**
* Returns a boolean stating whether or not we converted the projection
* to relative projection.
*/
function convertToRelativeProjection(visualElement, isLayoutDrag) {
	if (isLayoutDrag === void 0) isLayoutDrag = true;
	var projectionParent = visualElement.getProjectionParent();
	if (!projectionParent) return false;
	var offset;
	if (isLayoutDrag) {
		offset = calcRelativeOffset(projectionParent.projection.target, visualElement.projection.target);
		removeBoxTransforms(offset, projectionParent.getLatestValues());
	} else offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
	eachAxis(function(axis) {
		return visualElement.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
	});
	return true;
}
var init_convert_to_relative = __esmMin((() => {
	init_utils();
	init_each_axis();
	init_delta_apply();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/batch-layout.js
function pushJob(stack, job, pointer) {
	if (!stack[pointer]) stack[pointer] = [];
	stack[pointer].push(job);
}
function batchLayout(callback) {
	unresolvedJobs.add(callback);
	return function() {
		return unresolvedJobs.delete(callback);
	};
}
function flushLayout() {
	if (!unresolvedJobs.size) return;
	var pointer = 0;
	var reads = [[]];
	var writes = [];
	var setRead = function(job) {
		return pushJob(reads, job, pointer);
	};
	var setWrite = function(job) {
		pushJob(writes, job, pointer);
		pointer++;
	};
	/**
	* Resolve jobs into their array stacks
	*/
	unresolvedJobs.forEach(function(callback) {
		callback(setRead, setWrite);
		pointer = 0;
	});
	unresolvedJobs.clear();
	/**
	* Execute jobs
	*/
	var numStacks = writes.length;
	for (var i = 0; i <= numStacks; i++) {
		reads[i] && reads[i].forEach(executeJob);
		writes[i] && writes[i].forEach(executeJob);
	}
}
var unresolvedJobs, executeJob;
var init_batch_layout = __esmMin((() => {
	unresolvedJobs = /* @__PURE__ */ new Set();
	executeJob = function(job) {
		return job();
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.js
function shouldDrag(direction, drag, currentDirection) {
	return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
* Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
* than the provided threshold, return `null`.
*
* @param offset - The x/y offset from origin.
* @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
*/
function getCurrentDirection(offset, lockThreshold) {
	if (lockThreshold === void 0) lockThreshold = 10;
	var direction = null;
	if (Math.abs(offset.y) > lockThreshold) direction = "y";
	else if (Math.abs(offset.x) > lockThreshold) direction = "x";
	return direction;
}
var elementDragControls, lastPointerEvent, VisualElementDragControls;
var init_VisualElementDragControls = __esmMin((() => {
	init_tslib_es6();
	init_hey_listen_es();
	init_PanSession();
	init_lock();
	init_is_ref_object();
	init_use_pointer_event();
	init_use_dom_event();
	init_event_info();
	init_geometry();
	init_each_axis();
	init_constraints();
	init_measure();
	init_delta_calc();
	init_transitions();
	init_types$1();
	init_utils$1();
	init_es$1();
	init_convert_to_relative();
	init_utils();
	init_batch_layout();
	init_es$2();
	elementDragControls = /* @__PURE__ */ new WeakMap();
	VisualElementDragControls = function() {
		function VisualElementDragControls(_a) {
			var visualElement = _a.visualElement;
			/**
			* Track whether we're currently dragging.
			*
			* @internal
			*/
			this.isDragging = false;
			/**
			* The current direction of drag, or `null` if both.
			*
			* @internal
			*/
			this.currentDirection = null;
			/**
			* The permitted boundaries of travel, in pixels.
			*
			* @internal
			*/
			this.constraints = false;
			/**
			* The per-axis resolved elastic values.
			*
			* @internal
			*/
			this.elastic = axisBox();
			/**
			* A reference to the host component's latest props.
			*
			* @internal
			*/
			this.props = {};
			/**
			* @internal
			*/
			this.hasMutatedConstraints = false;
			/**
			* Track the initial position of the cursor relative to the dragging element
			* when dragging starts as a value of 0-1 on each axis. We then use this to calculate
			* an ideal bounding box for the VisualElement renderer to project into every frame.
			*
			* @internal
			*/
			this.cursorProgress = {
				x: .5,
				y: .5
			};
			this.originPoint = {};
			this.openGlobalLock = null;
			/**
			* @internal
			*/
			this.panSession = null;
			this.visualElement = visualElement;
			this.visualElement.enableLayoutProjection();
			elementDragControls.set(visualElement, this);
		}
		/**
		* Instantiate a PanSession for the drag gesture
		*
		* @public
		*/
		VisualElementDragControls.prototype.start = function(originEvent, _a) {
			var _this = this;
			var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
			var onSessionStart = function(event) {
				var _a;
				_this.stopMotion();
				/**
				* Save the initial point. We'll use this to calculate the pointer's position rather
				* than the one we receive when the gesture actually starts. By then, the pointer will
				* have already moved, and the perception will be of the pointer "slipping" across the element
				*/
				var initialPoint = getViewportPointFromEvent(event).point;
				(_a = _this.cancelLayout) === null || _a === void 0 || _a.call(_this);
				_this.cancelLayout = batchLayout(function(read, write) {
					var ancestors = collectProjectingAncestors(_this.visualElement);
					var children = collectProjectingChildren(_this.visualElement);
					var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
					var hasManuallySetCursorOrigin = false;
					/**
					* Apply a simple lock to the projection target. This ensures no animations
					* can run on the projection box while this lock is active.
					*/
					_this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
					write(function() {
						tree.forEach(function(element) {
							return element.resetTransform();
						});
					});
					read(function() {
						updateLayoutMeasurement(_this.visualElement);
						children.forEach(updateLayoutMeasurement);
					});
					write(function() {
						tree.forEach(function(element) {
							return element.restoreTransform();
						});
						if (snapToCursor) hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
					});
					read(function() {
						if (!Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag())) _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
						_this.visualElement.scheduleUpdateLayoutProjection();
						/**
						* When dragging starts, we want to find where the cursor is relative to the bounding box
						* of the element. Every frame, we calculate a new bounding box using this relative position
						* and let the visualElement renderer figure out how to reproject the element into this bounding
						* box.
						*
						* By doing it this way, rather than applying an x/y transform directly to the element,
						* we can ensure the component always visually sticks to the cursor as we'd expect, even
						* if the DOM element itself changes layout as a result of React updates the user might
						* make based on the drag position.
						*/
						var projection = _this.visualElement.projection;
						eachAxis(function(axis) {
							if (!hasManuallySetCursorOrigin) {
								var _a = projection.target[axis], min = _a.min, max = _a.max;
								_this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
							}
							/**
							* If we have external drag MotionValues, record their origin point. On pointermove
							* we'll apply the pan gesture offset directly to this value.
							*/
							var axisValue = _this.getAxisMotionValue(axis);
							if (axisValue) _this.originPoint[axis] = axisValue.get();
						});
					});
					write(function() {
						flushSync.update();
						flushSync.preRender();
						flushSync.render();
						flushSync.postRender();
					});
					read(function() {
						return _this.resolveDragConstraints();
					});
				});
			};
			var onStart = function(event, info) {
				var _a, _b, _c;
				var _d = _this.props, drag = _d.drag, dragPropagation = _d.dragPropagation;
				if (drag && !dragPropagation) {
					if (_this.openGlobalLock) _this.openGlobalLock();
					_this.openGlobalLock = getGlobalLock(drag);
					if (!_this.openGlobalLock) return;
				}
				flushLayout();
				_this.isDragging = true;
				_this.currentDirection = null;
				(_b = (_a = _this.props).onDragStart) === null || _b === void 0 || _b.call(_a, event, info);
				(_c = _this.visualElement.animationState) === null || _c === void 0 || _c.setActive(AnimationType.Drag, true);
			};
			var onMove = function(event, info) {
				var _a, _b, _c, _d;
				var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
				if (!dragPropagation && !_this.openGlobalLock) return;
				var offset = info.offset;
				if (dragDirectionLock && _this.currentDirection === null) {
					_this.currentDirection = getCurrentDirection(offset);
					if (_this.currentDirection !== null) (_b = (_a = _this.props).onDirectionLock) === null || _b === void 0 || _b.call(_a, _this.currentDirection);
					return;
				}
				_this.updateAxis("x", info.point, offset);
				_this.updateAxis("y", info.point, offset);
				(_d = (_c = _this.props).onDrag) === null || _d === void 0 || _d.call(_c, event, info);
				lastPointerEvent = event;
			};
			var onSessionEnd = function(event, info) {
				return _this.stop(event, info);
			};
			var transformPagePoint = this.props.transformPagePoint;
			this.panSession = new PanSession(originEvent, {
				onSessionStart,
				onStart,
				onMove,
				onSessionEnd
			}, { transformPagePoint });
		};
		VisualElementDragControls.prototype.resolveDragConstraints = function() {
			var _this = this;
			var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
			var layout = this.visualElement.getLayoutState().layoutCorrected;
			if (dragConstraints) this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
			else this.constraints = false;
			this.elastic = resolveDragElastic(dragElastic);
			/**
			* If we're outputting to external MotionValues, we want to rebase the measured constraints
			* from viewport-relative to component-relative.
			*/
			if (this.constraints && !this.hasMutatedConstraints) eachAxis(function(axis) {
				if (_this.getAxisMotionValue(axis)) _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
			});
		};
		VisualElementDragControls.prototype.resolveRefConstraints = function(layoutBox, constraints) {
			var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
			var constraintsElement = constraints.current;
			invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
			this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
			var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
			/**
			* If there's an onMeasureDragConstraints listener we call it and
			* if different constraints are returned, set constraints to that
			*/
			if (onMeasureDragConstraints) {
				var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
				this.hasMutatedConstraints = !!userConstraints;
				if (userConstraints) measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
			}
			return measuredConstraints;
		};
		VisualElementDragControls.prototype.cancelDrag = function() {
			var _a, _b;
			this.visualElement.unlockProjectionTarget();
			(_a = this.cancelLayout) === null || _a === void 0 || _a.call(this);
			this.isDragging = false;
			this.panSession && this.panSession.end();
			this.panSession = null;
			if (!this.props.dragPropagation && this.openGlobalLock) {
				this.openGlobalLock();
				this.openGlobalLock = null;
			}
			(_b = this.visualElement.animationState) === null || _b === void 0 || _b.setActive(AnimationType.Drag, false);
		};
		VisualElementDragControls.prototype.stop = function(event, info) {
			var _a, _b, _c;
			(_a = this.panSession) === null || _a === void 0 || _a.end();
			this.panSession = null;
			var isDragging = this.isDragging;
			this.cancelDrag();
			if (!isDragging) return;
			var velocity = info.velocity;
			this.animateDragEnd(velocity);
			(_c = (_b = this.props).onDragEnd) === null || _c === void 0 || _c.call(_b, event, info);
		};
		VisualElementDragControls.prototype.snapToCursor = function(point) {
			var _this = this;
			return eachAxis(function(axis) {
				var drag = _this.props.drag;
				if (!shouldDrag(axis, drag, _this.currentDirection)) return;
				var axisValue = _this.getAxisMotionValue(axis);
				if (axisValue) {
					var box = _this.visualElement.getLayoutState().layout;
					var length_1 = box[axis].max - box[axis].min;
					var center = box[axis].min + length_1 / 2;
					var offset = point[axis] - center;
					_this.originPoint[axis] = point[axis];
					axisValue.set(offset);
				} else {
					_this.cursorProgress[axis] = .5;
					return true;
				}
			}).includes(true);
		};
		/**
		* Update the specified axis with the latest pointer information.
		*/
		VisualElementDragControls.prototype.updateAxis = function(axis, point, offset) {
			var drag = this.props.drag;
			if (!shouldDrag(axis, drag, this.currentDirection)) return;
			return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
		};
		VisualElementDragControls.prototype.updateAxisMotionValue = function(axis, offset) {
			var axisValue = this.getAxisMotionValue(axis);
			if (!offset || !axisValue) return;
			var nextValue = this.originPoint[axis] + offset[axis];
			var update = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
			axisValue.set(update);
		};
		VisualElementDragControls.prototype.updateVisualElementAxis = function(axis, point) {
			var _a;
			var axisLayout = this.visualElement.getLayoutState().layout[axis];
			var axisLength = axisLayout.max - axisLayout.min;
			var axisProgress = this.cursorProgress[axis];
			var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
			this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
		};
		VisualElementDragControls.prototype.setProps = function(_a) {
			var _b = _a.drag, drag = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest(_a, [
				"drag",
				"dragDirectionLock",
				"dragPropagation",
				"dragConstraints",
				"dragElastic",
				"dragMomentum"
			]);
			this.props = __assign({
				drag,
				dragDirectionLock,
				dragPropagation,
				dragConstraints,
				dragElastic,
				dragMomentum
			}, remainingProps);
		};
		/**
		* Drag works differently depending on which props are provided.
		*
		* - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
		* - If the component will perform layout animations, we output the gesture to the component's
		*      visual bounding box
		* - Otherwise, we apply the delta to the x/y motion values.
		*/
		VisualElementDragControls.prototype.getAxisMotionValue = function(axis) {
			var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
			var dragKey = "_drag" + axis.toUpperCase();
			if (this.props[dragKey]) return this.props[dragKey];
			else if (!layout && layoutId === void 0) return this.visualElement.getValue(axis, 0);
		};
		VisualElementDragControls.prototype.isLayoutDrag = function() {
			return !this.getAxisMotionValue("x");
		};
		VisualElementDragControls.prototype.isExternalDrag = function() {
			var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
			return _dragX || _dragY;
		};
		VisualElementDragControls.prototype.animateDragEnd = function(velocity) {
			var _this = this;
			var _a = this.props, drag = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
			/**
			* Everything beyond the drag gesture should be performed with
			* relative projection so children stay in sync with their parent element.
			*/
			var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
			/**
			* If we had previously resolved constraints relative to the viewport,
			* we need to also convert those to a relative coordinate space for the animation
			*/
			var constraints = this.constraints || {};
			if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
				var projectionParent = this.visualElement.getProjectionParent();
				if (projectionParent) {
					var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
					eachAxis(function(axis) {
						var _a = relativeConstraints_1[axis], min = _a.min, max = _a.max;
						constraints[axis] = {
							min: isNaN(min) ? void 0 : min,
							max: isNaN(max) ? void 0 : max
						};
					});
				}
			}
			var momentumAnimations = eachAxis(function(axis) {
				var _a;
				if (!shouldDrag(axis, drag, _this.currentDirection)) return;
				var transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
				/**
				* Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
				* of spring animations so we should look into adding a disable spring option to `inertia`.
				* We could do something here where we affect the `bounceStiffness` and `bounceDamping`
				* using the value of `dragElastic`.
				*/
				var bounceStiffness = dragElastic ? 200 : 1e6;
				var bounceDamping = dragElastic ? 40 : 1e7;
				var inertia = __assign(__assign({
					type: "inertia",
					velocity: dragMomentum ? velocity[axis] : 0,
					bounceStiffness,
					bounceDamping,
					timeConstant: 750,
					restDelta: 1,
					restSpeed: 10
				}, dragTransition), transition);
				return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia) : _this.visualElement.startLayoutAnimation(axis, inertia, isRelative);
			});
			return Promise.all(momentumAnimations).then(function() {
				var _a, _b;
				(_b = (_a = _this.props).onDragTransitionEnd) === null || _b === void 0 || _b.call(_a);
			});
		};
		VisualElementDragControls.prototype.stopMotion = function() {
			var _this = this;
			eachAxis(function(axis) {
				var axisValue = _this.getAxisMotionValue(axis);
				axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
			});
		};
		VisualElementDragControls.prototype.startAxisValueAnimation = function(axis, transition) {
			var axisValue = this.getAxisMotionValue(axis);
			if (!axisValue) return;
			var currentValue = axisValue.get();
			axisValue.set(currentValue);
			axisValue.set(currentValue);
			return startAnimation(axis, axisValue, 0, transition);
		};
		VisualElementDragControls.prototype.scalePoint = function() {
			var _this = this;
			var _a = this.props, drag = _a.drag, dragConstraints = _a.dragConstraints;
			if (!isRefObject(dragConstraints) || !this.constraintsBox) return;
			this.stopMotion();
			var boxProgress = {
				x: 0,
				y: 0
			};
			eachAxis(function(axis) {
				boxProgress[axis] = calcOrigin(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
			});
			/**
			* For each axis, calculate the current progress of the layout axis within the constraints.
			* Then, using the latest layout and constraints measurements, reposition the new layout axis
			* proportionally within the constraints.
			*/
			this.updateConstraints(function() {
				eachAxis(function(axis) {
					if (!shouldDrag(axis, drag, null)) return;
					var _a = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a.min, max = _a.max;
					_this.visualElement.setProjectionTargetAxis(axis, min, max);
				});
			});
			/**
			* If any other draggable components are queuing the same tasks synchronously
			* this will wait until they've all been scheduled before flushing.
			*/
			setTimeout(flushLayout, 1);
		};
		VisualElementDragControls.prototype.updateConstraints = function(onReady) {
			var _this = this;
			this.cancelLayout = batchLayout(function(read, write) {
				var ancestors = collectProjectingAncestors(_this.visualElement);
				write(function() {
					return ancestors.forEach(function(element) {
						return element.resetTransform();
					});
				});
				read(function() {
					return updateLayoutMeasurement(_this.visualElement);
				});
				write(function() {
					return ancestors.forEach(function(element) {
						return element.restoreTransform();
					});
				});
				read(function() {
					_this.resolveDragConstraints();
				});
				if (onReady) write(onReady);
			});
		};
		VisualElementDragControls.prototype.mount = function(visualElement) {
			var _this = this;
			/**
			* Attach a pointerdown event listener on this DOM element to initiate drag tracking.
			*/
			var stopPointerListener = addPointerEvent(visualElement.getInstance(), "pointerdown", function(event) {
				var _a = _this.props, drag = _a.drag, _b = _a.dragListener;
				drag && (_b === void 0 || _b) && _this.start(event);
			});
			/**
			* Attach a window resize listener to scale the draggable target within its defined
			* constraints as the window resizes.
			*/
			var stopResizeListener = addDomEvent(window, "resize", function() {
				_this.scalePoint();
			});
			/**
			* Ensure drag constraints are resolved correctly relative to the dragging element
			* whenever its layout changes.
			*/
			var stopLayoutUpdateListener = visualElement.onLayoutUpdate(function() {
				if (_this.isDragging) _this.resolveDragConstraints();
			});
			/**
			* If the previous component with this same layoutId was dragging at the time
			* it was unmounted, we want to continue the same gesture on this component.
			*/
			var prevDragCursor = visualElement.prevDragCursor;
			if (prevDragCursor) this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
			/**
			* Return a function that will teardown the drag gesture
			*/
			return function() {
				stopPointerListener === null || stopPointerListener === void 0 || stopPointerListener();
				stopResizeListener === null || stopResizeListener === void 0 || stopResizeListener();
				stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 || stopLayoutUpdateListener();
				_this.cancelDrag();
			};
		};
		return VisualElementDragControls;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/drag/use-drag.js
/**
* A hook that allows an element to be dragged.
*
* @internal
*/
function useDrag(props) {
	var groupDragControls = props.dragControls, visualElement = props.visualElement;
	var transformPagePoint = (0, import_react$9.useContext)(MotionConfigContext).transformPagePoint;
	var dragControls = useConstant(function() {
		return new VisualElementDragControls({ visualElement });
	});
	dragControls.setProps(__assign(__assign({}, props), { transformPagePoint }));
	(0, import_react$9.useEffect)(function() {
		return groupDragControls && groupDragControls.subscribe(dragControls);
	}, [dragControls]);
	(0, import_react$9.useEffect)(function() {
		return dragControls.mount(visualElement);
	}, []);
}
var import_react$9;
var init_use_drag = __esmMin((() => {
	init_tslib_es6();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_MotionConfigContext();
	init_VisualElementDragControls();
	init_use_constant();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/gestures/use-pan-gesture.js
/**
*
* @param handlers -
* @param ref -
*
* @internalremarks
* Currently this sets new pan gesture functions every render. The memo route has been explored
* in the past but ultimately we're still creating new functions every render. An optimisation
* to explore is creating the pan gestures and loading them into a `ref`.
*
* @internal
*/
function usePanGesture(_a) {
	var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement = _a.visualElement;
	var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
	var panSession = (0, import_react$8.useRef)(null);
	var transformPagePoint = (0, import_react$8.useContext)(MotionConfigContext).transformPagePoint;
	var handlers = {
		onSessionStart: onPanSessionStart,
		onStart: onPanStart,
		onMove: onPan,
		onEnd: function(event, info) {
			panSession.current = null;
			onPanEnd && onPanEnd(event, info);
		}
	};
	(0, import_react$8.useEffect)(function() {
		if (panSession.current !== null) panSession.current.updateHandlers(handlers);
	});
	function onPointerDown(event) {
		panSession.current = new PanSession(event, handlers, { transformPagePoint });
	}
	usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
	useUnmountEffect(function() {
		return panSession.current && panSession.current.end();
	});
}
var import_react$8;
var init_use_pan_gesture = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_MotionConfigContext();
	init_use_unmount_effect();
	init_use_pointer_event();
	init_PanSession();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/drag.js
var drag;
var init_drag = __esmMin((() => {
	init_use_drag();
	init_use_pan_gesture();
	init_make_renderless_component();
	drag = {
		pan: makeRenderlessComponent(usePanGesture),
		drag: makeRenderlessComponent(useDrag)
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/components/AnimateSharedLayout/types.js
var Presence, VisibilityAction;
var init_types = __esmMin((() => {
	(function(Presence) {
		Presence[Presence["Entering"] = 0] = "Entering";
		Presence[Presence["Present"] = 1] = "Present";
		Presence[Presence["Exiting"] = 2] = "Exiting";
	})(Presence || (Presence = {}));
	(function(VisibilityAction) {
		VisibilityAction[VisibilityAction["Hide"] = 0] = "Hide";
		VisibilityAction[VisibilityAction["Show"] = 1] = "Show";
	})(VisibilityAction || (VisibilityAction = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.js
function isCSSVariable(value) {
	return typeof value === "string" && value.startsWith("var(--");
}
function parseCSSVariable(current) {
	var match = cssVariableRegex.exec(current);
	if (!match) return [,];
	var _a = __read(match, 3);
	return [_a[1], _a[2]];
}
function getVariableValue(current, element, depth) {
	if (depth === void 0) depth = 1;
	invariant(depth <= maxDepth, "Max CSS variable fallback depth detected in property \"" + current + "\". This may indicate a circular fallback dependency.");
	var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
	if (!token) return;
	var resolved = window.getComputedStyle(element).getPropertyValue(token);
	if (resolved) return resolved.trim();
	else if (isCSSVariable(fallback)) return getVariableValue(fallback, element, depth + 1);
	else return fallback;
}
/**
* Resolve CSS variables from
*
* @internal
*/
function resolveCSSVariables(visualElement, _a, transitionEnd) {
	var _b;
	var target = __rest(_a, []);
	var element = visualElement.getInstance();
	if (!(element instanceof HTMLElement)) return {
		target,
		transitionEnd
	};
	if (transitionEnd) transitionEnd = __assign({}, transitionEnd);
	visualElement.forEachValue(function(value) {
		var current = value.get();
		if (!isCSSVariable(current)) return;
		var resolved = getVariableValue(current, element);
		if (resolved) value.set(resolved);
	});
	for (var key in target) {
		var current = target[key];
		if (!isCSSVariable(current)) continue;
		var resolved = getVariableValue(current, element);
		if (!resolved) continue;
		target[key] = resolved;
		if (transitionEnd) (_b = transitionEnd[key]) !== null && _b !== void 0 || (transitionEnd[key] = current);
	}
	return {
		target,
		transitionEnd
	};
}
var cssVariableRegex, maxDepth;
var init_css_variables_conversion = __esmMin((() => {
	init_tslib_es6();
	init_hey_listen_es();
	cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
	maxDepth = 4;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/default-scale-correctors.js
function pixelsToPercent(pixels, axis) {
	return pixels / (axis.max - axis.min) * 100;
}
/**
* We always correct borderRadius as a percentage rather than pixels to reduce paints.
* For example, if you are projecting a box that is 100px wide with a 10px borderRadius
* into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
* borderRadius in both states. If we animate between the two in pixels that will trigger
* a paint each time. If we animate between the two in percentage we'll avoid a paint.
*/
function correctBorderRadius(latest, _layoutState, _a) {
	var target = _a.target;
	/**
	* If latest is a string, if it's a percentage we can return immediately as it's
	* going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
	*/
	if (typeof latest === "string") {
		if (px.test(latest)) latest = parseFloat(latest);
		else return latest;
	}
	/**
	* If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
	* pixel value as a percentage of each axis
	*/
	var x = pixelsToPercent(latest, target.x);
	var y = pixelsToPercent(latest, target.y);
	return x + "% " + y + "%";
}
function correctBoxShadow(latest, _a) {
	var delta = _a.delta, treeScale = _a.treeScale;
	var original = latest;
	/**
	* We need to first strip and store CSS variables from the string.
	*/
	var containsCSSVariables = latest.includes("var(");
	var cssVariables = [];
	if (containsCSSVariables) latest = latest.replace(cssVariableRegex, function(match) {
		cssVariables.push(match);
		return varToken;
	});
	var shadow = complex.parse(latest);
	if (shadow.length > 5) return original;
	var template = complex.createTransformer(latest);
	var offset = typeof shadow[0] !== "number" ? 1 : 0;
	var xScale = delta.x.scale * treeScale.x;
	var yScale = delta.y.scale * treeScale.y;
	shadow[0 + offset] /= xScale;
	shadow[1 + offset] /= yScale;
	/**
	* Ideally we'd correct x and y scales individually, but because blur and
	* spread apply to both we have to take a scale average and apply that instead.
	* We could potentially improve the outcome of this by incorporating the ratio between
	* the two scales.
	*/
	var averageScale = mix(xScale, yScale, .5);
	if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
	if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
	var output = template(shadow);
	if (containsCSSVariables) {
		var i_1 = 0;
		output = output.replace(varToken, function() {
			var cssVariable = cssVariables[i_1];
			i_1++;
			return cssVariable;
		});
	}
	return output;
}
var varToken, borderCorrectionDefinition, defaultScaleCorrectors;
var init_default_scale_correctors = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_es$1();
	init_css_variables_conversion();
	varToken = "_$css";
	borderCorrectionDefinition = { process: correctBorderRadius };
	defaultScaleCorrectors = {
		borderRadius: __assign(__assign({}, borderCorrectionDefinition), { applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		] }),
		borderTopLeftRadius: borderCorrectionDefinition,
		borderTopRightRadius: borderCorrectionDefinition,
		borderBottomLeftRadius: borderCorrectionDefinition,
		borderBottomRightRadius: borderCorrectionDefinition,
		boxShadow: { process: correctBoxShadow }
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/layout/Animate.js
function AnimateLayoutContextProvider(props) {
	var safeToRemove = __read(usePresence(), 2)[1];
	return import_react$7.createElement(Animate, __assign({}, props, { safeToRemove }));
}
function hasMoved(a, b) {
	return !isZeroBox(a) && !isZeroBox(b) && (!axisIsEqual(a.x, b.x) || !axisIsEqual(a.y, b.y));
}
function isZeroBox(a) {
	return axisIsEqual(a.x, zeroAxis) && axisIsEqual(a.y, zeroAxis);
}
function axisIsEqual(a, b) {
	return a.min === b.min && a.max === b.max;
}
function isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox) {
	return prevParent || !prevParent && !(originBox || targetBox);
}
var import_react$7, progressTarget, Animate, zeroAxis, defaultLayoutTransition;
var init_Animate = __esmMin((() => {
	init_tslib_es6();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_each_axis();
	init_transitions();
	init_utils();
	init_types();
	init_use_presence();
	init_geometry();
	init_scale_correction();
	init_default_scale_correctors();
	progressTarget = 1e3;
	Animate = function(_super) {
		__extends(Animate, _super);
		function Animate() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			/**
			* A mutable object that tracks the target viewport box
			* for the current animation frame.
			*/
			_this.frameTarget = axisBox();
			/**
			* The current animation target, we use this to check whether to start
			* a new animation or continue the existing one.
			*/
			_this.currentAnimationTarget = axisBox();
			/**
			* Track whether we're animating this axis.
			*/
			_this.isAnimating = {
				x: false,
				y: false
			};
			_this.stopAxisAnimation = {
				x: void 0,
				y: void 0
			};
			_this.isAnimatingTree = false;
			_this.animate = function(target, origin, _a) {
				if (_a === void 0) _a = {};
				var originBox = _a.originBox, targetBox = _a.targetBox, visibilityAction = _a.visibilityAction, shouldStackAnimate = _a.shouldStackAnimate, onComplete = _a.onComplete, prevParent = _a.prevParent, config = __rest(_a, [
					"originBox",
					"targetBox",
					"visibilityAction",
					"shouldStackAnimate",
					"onComplete",
					"prevParent"
				]);
				var _b = _this.props, visualElement = _b.visualElement, layout = _b.layout;
				/**
				* Early return if we've been instructed not to animate this render.
				*/
				if (shouldStackAnimate === false) {
					_this.isAnimatingTree = false;
					return _this.safeToRemove();
				}
				/**
				* Prioritise tree animations
				*/
				if (_this.isAnimatingTree && shouldStackAnimate !== true) return;
				else if (shouldStackAnimate) _this.isAnimatingTree = true;
				/**
				* Allow the measured origin (prev bounding box) and target (actual layout) to be
				* overridden by the provided config.
				*/
				origin = originBox || origin;
				target = targetBox || target;
				/**
				* If this element has a projecting parent, there's an opportunity to animate
				* it relatively to that parent rather than relatively to the viewport. This
				* allows us to add orchestrated animations.
				*/
				var isRelative = false;
				var projectionParent = visualElement.getProjectionParent();
				if (projectionParent) {
					var prevParentViewportBox = projectionParent.prevViewportBox;
					var parentLayout = projectionParent.getLayoutState().layout;
					/**
					* If we're being provided a previous parent VisualElement by AnimateSharedLayout
					*/
					if (prevParent) {
						/**
						* If we've been provided an explicit target box it means we're animating back
						* to this previous parent. So we can make a relative box by comparing to the previous
						* parent's layout
						*/
						if (targetBox) parentLayout = prevParent.getLayoutState().layout;
						/**
						* Likewise if we've been provided an explicit origin box it means we're
						* animating out from a different element. So we should figure out where that was
						* on screen relative to the new parent element.
						*/
						if (originBox && !checkIfParentHasChanged(prevParent, projectionParent) && prevParent.prevViewportBox) prevParentViewportBox = prevParent.prevViewportBox;
					}
					if (prevParentViewportBox && isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox)) {
						isRelative = true;
						origin = calcRelativeOffset(prevParentViewportBox, origin);
						target = calcRelativeOffset(parentLayout, target);
					}
				}
				var boxHasMoved = hasMoved(origin, target);
				var animations = eachAxis(function(axis) {
					var _a, _b;
					/**
					* If layout is set to "position", we can resize the origin box based on the target
					* box and only animate its position.
					*/
					if (layout === "position") {
						var targetLength = target[axis].max - target[axis].min;
						origin[axis].max = origin[axis].min + targetLength;
					}
					if (visualElement.projection.isTargetLocked) return;
					else if (visibilityAction !== void 0) visualElement.setVisibility(visibilityAction === VisibilityAction.Show);
					else if (boxHasMoved) return _this.animateAxis(axis, target[axis], origin[axis], __assign(__assign({}, config), { isRelative }));
					else {
						(_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 || _b.call(_a);
						return visualElement.setProjectionTargetAxis(axis, target[axis].min, target[axis].max, isRelative);
					}
				});
				visualElement.syncRender();
				/**
				* If this visualElement isn't present (ie it's been removed from the tree by the user but
				* kept in by the tree by AnimatePresence) then call safeToRemove when all axis animations
				* have successfully finished.
				*/
				return Promise.all(animations).then(function() {
					_this.isAnimatingTree = false;
					onComplete && onComplete();
					visualElement.notifyLayoutAnimationComplete();
				});
			};
			return _this;
		}
		Animate.prototype.componentDidMount = function() {
			var _this = this;
			var visualElement = this.props.visualElement;
			visualElement.animateMotionValue = startAnimation;
			visualElement.enableLayoutProjection();
			this.unsubLayoutReady = visualElement.onLayoutUpdate(this.animate);
			visualElement.layoutSafeToRemove = function() {
				return _this.safeToRemove();
			};
			addScaleCorrection(defaultScaleCorrectors);
		};
		Animate.prototype.componentWillUnmount = function() {
			var _this = this;
			this.unsubLayoutReady();
			eachAxis(function(axis) {
				var _a, _b;
				return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a);
			});
		};
		/**
		* TODO: This manually performs animations on the visualElement's layout progress
		* values. It'd be preferable to amend the startLayoutAxisAnimation
		* API to accept more custom animations like this.
		*/
		Animate.prototype.animateAxis = function(axis, target, origin, _a) {
			var _this = this;
			var _b, _c;
			var _d = _a === void 0 ? {} : _a, transition = _d.transition, isRelative = _d.isRelative;
			/**
			* If we're not animating to a new target, don't run this animation
			*/
			if (this.isAnimating[axis] && axisIsEqual(target, this.currentAnimationTarget[axis])) return;
			(_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 || _c.call(_b);
			this.isAnimating[axis] = true;
			var visualElement = this.props.visualElement;
			var frameTarget = this.frameTarget[axis];
			var layoutProgress = visualElement.getProjectionAnimationProgress()[axis];
			/**
			* Set layout progress back to 0. We set it twice to hard-reset any velocity that might
			* be re-incoporated into a subsequent spring animation.
			*/
			layoutProgress.clearListeners();
			layoutProgress.set(0);
			layoutProgress.set(0);
			/**
			* Create an animation function to run once per frame. This will tween the visual bounding box from
			* origin to target using the latest progress value.
			*/
			var frame = function() {
				tweenAxis(frameTarget, origin, target, layoutProgress.get() / progressTarget);
				visualElement.setProjectionTargetAxis(axis, frameTarget.min, frameTarget.max, isRelative);
			};
			frame();
			var unsubscribeProgress = layoutProgress.onChange(frame);
			this.stopAxisAnimation[axis] = function() {
				_this.isAnimating[axis] = false;
				layoutProgress.stop();
				unsubscribeProgress();
			};
			this.currentAnimationTarget[axis] = target;
			var layoutTransition = transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
			return startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, layoutTransition && getValueTransition(layoutTransition, "layout")).then(this.stopAxisAnimation[axis]);
		};
		Animate.prototype.safeToRemove = function() {
			var _a, _b;
			(_b = (_a = this.props).safeToRemove) === null || _b === void 0 || _b.call(_a);
		};
		Animate.prototype.render = function() {
			return null;
		};
		return Animate;
	}(import_react$7.Component);
	zeroAxis = {
		min: 0,
		max: 0
	};
	defaultLayoutTransition = {
		duration: .45,
		ease: [
			.4,
			0,
			.1,
			1
		]
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/batcher.js
/**
* Create a batcher to process VisualElements
*/
function createBatcher() {
	var queue = /* @__PURE__ */ new Set();
	return {
		add: function(child) {
			return queue.add(child);
		},
		flush: function(_a) {
			var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
			batchLayout(function(read, write) {
				var order = Array.from(queue).sort(compareByDepth);
				var ancestors = parent ? collectProjectingAncestors(parent) : [];
				write(function() {
					__spreadArray(__spreadArray([], __read(ancestors)), __read(order)).forEach(function(element) {
						return element.resetTransform();
					});
				});
				read(function() {
					order.forEach(updateLayoutMeasurement);
				});
				write(function() {
					ancestors.forEach(function(element) {
						return element.restoreTransform();
					});
					order.forEach(layoutReady);
				});
				read(function() {
					/**
					* After all children have started animating, ensure any Entering components are set to Present.
					* If we add deferred animations (set up all animations and then start them in two loops) this
					* could be moved to the start loop. But it needs to happen after all the animations configs
					* are generated in AnimateSharedLayout as this relies on presence data
					*/
					order.forEach(function(child) {
						if (child.isPresent) child.presence = Presence.Present;
					});
				});
				write(function() {
					/**
					* Starting these animations will have queued jobs on the frame loop. In some situations,
					* like when removing an element, these will be processed too late after the DOM is manipulated,
					* leaving a flash of incorrectly-projected content. By manually flushing these jobs
					* we ensure there's no flash.
					*/
					flushSync.preRender();
					flushSync.render();
				});
				read(function() {
					/**
					* Schedule a callback at the end of the following frame to assign the latest projection
					* box to the prevViewportBox snapshot. Once global batching is in place this could be run
					* synchronously. But for now it ensures that if any nested `AnimateSharedLayout` top-level
					* child attempts to calculate its previous relative position against a prevViewportBox
					* it will be against its latest projection box instead, as the snapshot is useless beyond this
					* render.
					*/
					sync.postRender(function() {
						return order.forEach(assignProjectionToSnapshot);
					});
					queue.clear();
				});
			});
			flushLayout();
		}
	};
}
function assignProjectionToSnapshot(child) {
	child.prevViewportBox = child.projection.target;
}
var defaultHandler;
var init_batcher = __esmMin((() => {
	init_tslib_es6();
	init_es$2();
	init_utils$1();
	init_batch_layout();
	init_compare_by_depth();
	init_types();
	defaultHandler = { layoutReady: function(child) {
		return child.notifyLayoutReady();
	} };
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/context/SharedLayoutContext.js
function isSharedLayout(context) {
	return !!context.forceUpdate;
}
var import_react$6, SharedLayoutContext, FramerTreeLayoutContext;
var init_SharedLayoutContext = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_batcher();
	SharedLayoutContext = (0, import_react$6.createContext)(createBatcher());
	FramerTreeLayoutContext = (0, import_react$6.createContext)(createBatcher());
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/layout/Measure.js
function MeasureContextProvider(props) {
	var syncLayout = (0, import_react$5.useContext)(SharedLayoutContext);
	var framerSyncLayout = (0, import_react$5.useContext)(FramerTreeLayoutContext);
	return import_react$5.createElement(Measure, __assign({}, props, {
		syncLayout,
		framerSyncLayout
	}));
}
var import_react$5, Measure;
var init_Measure = __esmMin((() => {
	init_tslib_es6();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_SharedLayoutContext();
	init_utils$1();
	Measure = function(_super) {
		__extends(Measure, _super);
		function Measure() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		/**
		* If this is a child of a SyncContext, register the VisualElement with it on mount.
		*/
		Measure.prototype.componentDidMount = function() {
			var _a = this.props, syncLayout = _a.syncLayout, framerSyncLayout = _a.framerSyncLayout, visualElement = _a.visualElement;
			isSharedLayout(syncLayout) && syncLayout.register(visualElement);
			isSharedLayout(framerSyncLayout) && framerSyncLayout.register(visualElement);
			visualElement.onUnmount(function() {
				if (isSharedLayout(syncLayout)) syncLayout.remove(visualElement);
				if (isSharedLayout(framerSyncLayout)) framerSyncLayout.remove(visualElement);
			});
		};
		/**
		* If this is a child of a SyncContext, notify it that it needs to re-render. It will then
		* handle the snapshotting.
		*
		* If it is stand-alone component, add it to the batcher.
		*/
		Measure.prototype.getSnapshotBeforeUpdate = function() {
			var _a = this.props, syncLayout = _a.syncLayout, visualElement = _a.visualElement;
			if (isSharedLayout(syncLayout)) syncLayout.syncUpdate();
			else {
				snapshotViewportBox(visualElement);
				syncLayout.add(visualElement);
			}
			return null;
		};
		Measure.prototype.componentDidUpdate = function() {
			var syncLayout = this.props.syncLayout;
			if (!isSharedLayout(syncLayout)) syncLayout.flush();
		};
		Measure.prototype.render = function() {
			return null;
		};
		return Measure;
	}(import_react$5.Component);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/motion/features/layout/index.js
var layoutAnimations;
var init_layout = __esmMin((() => {
	init_Animate();
	init_Measure();
	layoutAnimations = {
		measureLayout: MeasureContextProvider,
		layoutAnimation: AnimateLayoutContextProvider
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/state.js
function createLayoutState() {
	return {
		isHydrated: false,
		layout: axisBox(),
		layoutCorrected: axisBox(),
		treeScale: {
			x: 1,
			y: 1
		},
		delta: delta(),
		deltaFinal: delta(),
		deltaTransform: ""
	};
}
var createProjectionState, zeroLayout;
var init_state = __esmMin((() => {
	init_geometry();
	createProjectionState = function() {
		return {
			isEnabled: false,
			isHydrated: false,
			isTargetLocked: false,
			target: axisBox(),
			targetFinal: axisBox()
		};
	};
	zeroLayout = createLayoutState();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/utils/build-projection-transform.js
/**
* Build a transform style that takes a calculated delta between the element's current
* space on screen and projects it into the desired space.
*/
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
	var x = _a.x, y = _a.y;
	/**
	* The translations we use to calculate are always relative to the viewport coordinate space.
	* But when we apply scales, we also scale the coordinate space of an element and its children.
	* For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
	* to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
	*/
	var xTranslate = x.translate / treeScale.x;
	var yTranslate = y.translate / treeScale.y;
	var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
	if (latestTransform) {
		var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
		if (rotate) transform += "rotate(" + rotate + ") ";
		if (rotateX) transform += "rotateX(" + rotateX + ") ";
		if (rotateY) transform += "rotateY(" + rotateY + ") ";
	}
	transform += "scale(" + x.scale + ", " + y.scale + ")";
	return !latestTransform && transform === identityProjection ? "" : transform;
}
/**
* Take the calculated delta origin and apply it as a transform string.
*/
function buildLayoutProjectionTransformOrigin(_a) {
	var deltaFinal = _a.deltaFinal;
	return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
var identityProjection;
var init_build_projection_transform = __esmMin((() => {
	init_state();
	identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, {
		x: 1,
		y: 1
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/lifecycles.js
function createLifecycles() {
	var managers = names.map(function() {
		return new SubscriptionManager();
	});
	var propSubscriptions = {};
	var lifecycles = {
		clearAllListeners: function() {
			return managers.forEach(function(manager) {
				return manager.clear();
			});
		},
		updatePropListeners: function(props) {
			return names.forEach(function(name) {
				var _a;
				(_a = propSubscriptions[name]) === null || _a === void 0 || _a.call(propSubscriptions);
				var on = "on" + name;
				var propListener = props[on];
				if (propListener) propSubscriptions[name] = lifecycles[on](propListener);
			});
		}
	};
	managers.forEach(function(manager, i) {
		lifecycles["on" + names[i]] = function(handler) {
			return manager.add(handler);
		};
		lifecycles["notify" + names[i]] = function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return manager.notify.apply(manager, __spreadArray([], __read(args)));
		};
	});
	return lifecycles;
}
var names;
var init_lifecycles = __esmMin((() => {
	init_tslib_es6();
	init_subscription_manager();
	names = [
		"LayoutMeasure",
		"BeforeLayoutMeasure",
		"LayoutUpdate",
		"ViewportBoxUpdate",
		"Update",
		"Render",
		"AnimationComplete",
		"LayoutAnimationComplete",
		"AnimationStart",
		"SetAxisTarget",
		"Unmount"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/motion-values.js
function updateMotionValuesFromProps(element, next, prev) {
	var _a;
	for (var key in next) {
		var nextValue = next[key];
		var prevValue = prev[key];
		if (isMotionValue(nextValue))
 /**
		* If this is a motion value found in props or style, we want to add it
		* to our visual element's motion value map.
		*/
		element.addValue(key, nextValue);
		else if (isMotionValue(prevValue))
 /**
		* If we're swapping to a new motion value, create a new motion value
		* from that
		*/
		element.addValue(key, motionValue(nextValue));
		else if (prevValue !== nextValue) {
			/**
			* If this is a flat value that has changed, update the motion value
			* or create one if it doesn't exist. We only want to do this if we're
			* not handling the value with our animation state.
			*/
			if (element.hasValue(key)) {
				var existingValue = element.getValue(key);
				!existingValue.hasAnimated && existingValue.set(nextValue);
			} else element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
		}
	}
	for (var key in prev) if (next[key] === void 0) element.removeValue(key);
	return next;
}
var init_motion_values = __esmMin((() => {
	init_value();
	init_is_motion_value();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/projection.js
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
	var delta = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
	var target = _b.target;
	/**
	* Reset the corrected box with the latest values from box, as we're then going
	* to perform mutative operations on it.
	*/
	resetBox(layoutCorrected, layout);
	/**
	* Apply all the parent deltas to this box to produce the corrected box. This
	* is the layout box, as it will appear on screen as a result of the transforms of its parents.
	*/
	applyTreeDeltas(layoutCorrected, treeScale, treePath);
	/**
	* Update the delta between the corrected box and the target box before user-set transforms were applied.
	* This will allow us to calculate the corrected borderRadius and boxShadow to compensate
	* for our layout reprojection, but still allow them to be scaled correctly by the user.
	* It might be that to simplify this we may want to accept that user-set scale is also corrected
	* and we wouldn't have to keep and calc both deltas, OR we could support a user setting
	* to allow people to choose whether these styles are corrected based on just the
	* layout reprojection or the final bounding box.
	*/
	updateBoxDelta(delta, layoutCorrected, target, transformOrigin);
}
var init_projection = __esmMin((() => {
	init_delta_apply();
	init_delta_calc();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/utils/flat-tree.js
var FlatTree;
var init_flat_tree = __esmMin((() => {
	init_array();
	init_compare_by_depth();
	FlatTree = function() {
		function FlatTree() {
			this.children = [];
			this.isDirty = false;
		}
		FlatTree.prototype.add = function(child) {
			addUniqueItem(this.children, child);
			this.isDirty = true;
		};
		FlatTree.prototype.remove = function(child) {
			removeItem(this.children, child);
			this.isDirty = true;
		};
		FlatTree.prototype.forEach = function(callback) {
			this.isDirty && this.children.sort(compareByDepth);
			this.isDirty = false;
			this.children.forEach(callback);
		};
		return FlatTree;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/projection/relative-set.js
function setCurrentViewportBox(visualElement) {
	var projectionParent = visualElement.getProjectionParent();
	if (!projectionParent) {
		visualElement.rebaseProjectionTarget();
		return;
	}
	var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
	eachAxis(function(axis) {
		visualElement.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
	});
}
var init_relative_set = __esmMin((() => {
	init_utils();
	init_each_axis();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/index.js
function fireResolveRelativeTargetBox(child) {
	child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
	child.updateLayoutProjection();
}
var visualElement, variantProps, numVariantProps;
var init_render = __esmMin((() => {
	init_tslib_es6();
	init_es$2();
	init_es$1();
	init_types();
	init_each_axis();
	init_geometry();
	init_delta_apply();
	init_delta_calc();
	init_value();
	init_is_motion_value();
	init_build_projection_transform();
	init_animation_state();
	init_lifecycles();
	init_motion_values();
	init_projection();
	init_state();
	init_flat_tree();
	init_variants();
	init_relative_set();
	init_is_draggable();
	visualElement = function(_a) {
		var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps;
		return function(_a, options) {
			var parent = _a.parent, props = _a.props, presenceId = _a.presenceId, blockInitialAnimation = _a.blockInitialAnimation, visualState = _a.visualState;
			if (options === void 0) options = {};
			var latestValues = visualState.latestValues, renderState = visualState.renderState;
			/**
			* The instance of the render-specific node that will be hydrated by the
			* exposed React ref. So for example, this visual element can host a
			* HTMLElement, plain object, or Three.js object. The functions provided
			* in VisualElementConfig allow us to interface with this instance.
			*/
			var instance;
			/**
			* Manages the subscriptions for a visual element's lifecycle, for instance
			* onRender and onViewportBoxUpdate.
			*/
			var lifecycles = createLifecycles();
			/**
			*
			*/
			var projection = createProjectionState();
			/**
			* A reference to the nearest projecting parent. This is either
			* undefined if we haven't looked for the nearest projecting parent,
			* false if there is no parent performing layout projection, or a reference
			* to the projecting parent.
			*/
			var projectionParent;
			/**
			* This is a reference to the visual state of the "lead" visual element.
			* Usually, this will be this visual element. But if it shares a layoutId
			* with other visual elements, only one of them will be designated lead by
			* AnimateSharedLayout. All the other visual elements will take on the visual
			* appearance of the lead while they crossfade to it.
			*/
			var leadProjection = projection;
			var leadLatestValues = latestValues;
			var unsubscribeFromLeadVisualElement;
			/**
			* The latest layout measurements and calculated projections. This
			* is seperate from the target projection data in visualState as
			* many visual elements might point to the same piece of visualState as
			* a target, whereas they might each have different layouts and thus
			* projection calculations needed to project into the same viewport box.
			*/
			var layoutState = createLayoutState();
			/**
			*
			*/
			var crossfader;
			/**
			* Keep track of whether the viewport box has been updated since the
			* last time the layout projection was re-calculated.
			*/
			var hasViewportBoxUpdated = false;
			/**
			* A map of all motion values attached to this visual element. Motion
			* values are source of truth for any given animated value. A motion
			* value might be provided externally by the component via props.
			*/
			var values = /* @__PURE__ */ new Map();
			/**
			* A map of every subscription that binds the provided or generated
			* motion values onChange listeners to this visual element.
			*/
			var valueSubscriptions = /* @__PURE__ */ new Map();
			/**
			* A reference to the previously-provided motion values as returned
			* from scrapeMotionValuesFromProps. We use the keys in here to determine
			* if any motion values need to be removed after props are updated.
			*/
			var prevMotionValues = {};
			/**
			* x/y motion values that track the progress of initiated layout
			* animations.
			*
			* TODO: Target for removal
			*/
			var projectionTargetProgress;
			/**
			* When values are removed from all animation props we need to search
			* for a fallback value to animate to. These values are tracked in baseTarget.
			*/
			var baseTarget = __assign({}, latestValues);
			/**
			* On mount, this will be hydrated with a callback to disconnect
			* this visual element from its parent on unmount.
			*/
			var removeFromVariantTree;
			/**
			*
			*/
			function render() {
				if (!instance) return;
				if (element.isProjectionReady()) {
					/**
					* Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
					* This is the final box that we will then project into by calculating a transform delta and
					* applying it to the corrected box.
					*/
					applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
					/**
					* Update the delta between the corrected box and the final target box, after
					* user-set transforms are applied to it. This will be used by the renderer to
					* create a transform style that will reproject the element from its actual layout
					* into the desired bounding box.
					*/
					updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
				}
				triggerBuild();
				renderInstance(instance, renderState);
			}
			function triggerBuild() {
				var valuesToRender = latestValues;
				if (crossfader && crossfader.isActive()) {
					var crossfadedValues = crossfader.getCrossfadeState(element);
					if (crossfadedValues) valuesToRender = crossfadedValues;
				}
				build(element, renderState, valuesToRender, leadProjection, layoutState, options, props);
			}
			function update() {
				lifecycles.notifyUpdate(latestValues);
			}
			function updateLayoutProjection() {
				if (!element.isProjectionReady()) return;
				var delta = layoutState.delta, treeScale = layoutState.treeScale;
				var prevTreeScaleX = treeScale.x;
				var prevTreeScaleY = treeScale.y;
				var prevDeltaTransform = layoutState.deltaTransform;
				updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
				hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta);
				hasViewportBoxUpdated = false;
				var deltaTransform = buildLayoutProjectionTransform(delta, treeScale);
				if (deltaTransform !== prevDeltaTransform || prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) element.scheduleRender();
				layoutState.deltaTransform = deltaTransform;
			}
			function updateTreeLayoutProjection() {
				element.layoutTree.forEach(fireUpdateLayoutProjection);
			}
			/**
			*
			*/
			function bindToMotionValue(key, value) {
				var removeOnChange = value.onChange(function(latestValue) {
					latestValues[key] = latestValue;
					props.onUpdate && sync.update(update, false, true);
				});
				var removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
				valueSubscriptions.set(key, function() {
					removeOnChange();
					removeOnRenderRequest();
				});
			}
			/**
			* Any motion values that are provided to the element when created
			* aren't yet bound to the element, as this would technically be impure.
			* However, we iterate through the motion values and set them to the
			* initial values for this component.
			*
			* TODO: This is impure and we should look at changing this to run on mount.
			* Doing so will break some tests but this isn't neccessarily a breaking change,
			* more a reflection of the test.
			*/
			var initialMotionValues = scrapeMotionValuesFromProps(props);
			for (var key in initialMotionValues) {
				var value = initialMotionValues[key];
				if (latestValues[key] !== void 0 && isMotionValue(value)) value.set(latestValues[key], false);
			}
			/**
			* Determine what role this visual element should take in the variant tree.
			*/
			var isControllingVariants = checkIfControllingVariants(props);
			var isVariantNode = checkIfVariantNode(props);
			var element = __assign(__assign({
				treeType,
				/**
				* This is a mirror of the internal instance prop, which keeps
				* VisualElement type-compatible with React's RefObject.
				*/
				current: null,
				/**
				* The depth of this visual element within the visual element tree.
				*/
				depth: parent ? parent.depth + 1 : 0,
				parent,
				children: /* @__PURE__ */ new Set(),
				/**
				* An ancestor path back to the root visual element. This is used
				* by layout projection to quickly recurse back up the tree.
				*/
				path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
				layoutTree: parent ? parent.layoutTree : new FlatTree(),
				/**
				*
				*/
				presenceId,
				projection,
				/**
				* If this component is part of the variant tree, it should track
				* any children that are also part of the tree. This is essentially
				* a shadow tree to simplify logic around how to stagger over children.
				*/
				variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
				/**
				* Whether this instance is visible. This can be changed imperatively
				* by AnimateSharedLayout, is analogous to CSS's visibility in that
				* hidden elements should take up layout, and needs enacting by the configured
				* render function.
				*/
				isVisible: void 0,
				/**
				* Normally, if a component is controlled by a parent's variants, it can
				* rely on that ancestor to trigger animations further down the tree.
				* However, if a component is created after its parent is mounted, the parent
				* won't trigger that mount animation so the child needs to.
				*
				* TODO: This might be better replaced with a method isParentMounted
				*/
				manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
				/**
				* This can be set by AnimatePresence to force components that mount
				* at the same time as it to mount as if they have initial={false} set.
				*/
				blockInitialAnimation,
				/**
				* Determine whether this component has mounted yet. This is mostly used
				* by variant children to determine whether they need to trigger their
				* own animations on mount.
				*/
				isMounted: function() {
					return Boolean(instance);
				},
				mount: function(newInstance) {
					instance = element.current = newInstance;
					element.pointTo(element);
					if (isVariantNode && parent && !isControllingVariants) removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
					parent === null || parent === void 0 || parent.children.add(element);
				},
				/**
				*
				*/
				unmount: function() {
					cancelSync.update(update);
					cancelSync.render(render);
					cancelSync.preRender(element.updateLayoutProjection);
					valueSubscriptions.forEach(function(remove) {
						return remove();
					});
					element.stopLayoutAnimation();
					element.layoutTree.remove(element);
					removeFromVariantTree === null || removeFromVariantTree === void 0 || removeFromVariantTree();
					parent === null || parent === void 0 || parent.children.delete(element);
					unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 || unsubscribeFromLeadVisualElement();
					lifecycles.clearAllListeners();
				},
				/**
				* Add a child visual element to our set of children.
				*/
				addVariantChild: function(child) {
					var _a;
					var closestVariantNode = element.getClosestVariantNode();
					if (closestVariantNode) {
						(_a = closestVariantNode.variantChildren) === null || _a === void 0 || _a.add(child);
						return function() {
							return closestVariantNode.variantChildren.delete(child);
						};
					}
				},
				sortNodePosition: function(other) {
					/**
					* If these nodes aren't even of the same type we can't compare their depth.
					*/
					if (!sortNodePosition || treeType !== other.treeType) return 0;
					return sortNodePosition(element.getInstance(), other.getInstance());
				},
				/**
				* Returns the closest variant node in the tree starting from
				* this visual element.
				*/
				getClosestVariantNode: function() {
					return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
				},
				/**
				* A method that schedules an update to layout projections throughout
				* the tree. We inherit from the parent so there's only ever one
				* job scheduled on the next frame - that of the root visual element.
				*/
				scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
					return sync.preRender(element.updateTreeLayoutProjection, false, true);
				},
				/**
				* Expose the latest layoutId prop.
				*/
				getLayoutId: function() {
					return props.layoutId;
				},
				/**
				* Returns the current instance.
				*/
				getInstance: function() {
					return instance;
				},
				/**
				* Get/set the latest static values.
				*/
				getStaticValue: function(key) {
					return latestValues[key];
				},
				setStaticValue: function(key, value) {
					return latestValues[key] = value;
				},
				/**
				* Returns the latest motion value state. Currently only used to take
				* a snapshot of the visual element - perhaps this can return the whole
				* visual state
				*/
				getLatestValues: function() {
					return latestValues;
				},
				/**
				* Set the visiblity of the visual element. If it's changed, schedule
				* a render to reflect these changes.
				*/
				setVisibility: function(visibility) {
					if (element.isVisible === visibility) return;
					element.isVisible = visibility;
					element.scheduleRender();
				},
				/**
				* Make a target animatable by Popmotion. For instance, if we're
				* trying to animate width from 100px to 100vw we need to measure 100vw
				* in pixels to determine what we really need to animate to. This is also
				* pluggable to support Framer's custom value types like Color,
				* and CSS variables.
				*/
				makeTargetAnimatable: function(target, canMutate) {
					if (canMutate === void 0) canMutate = true;
					return makeTargetAnimatable(element, target, props, canMutate);
				},
				/**
				* Add a motion value and bind it to this visual element.
				*/
				addValue: function(key, value) {
					if (element.hasValue(key)) element.removeValue(key);
					values.set(key, value);
					latestValues[key] = value.get();
					bindToMotionValue(key, value);
				},
				/**
				* Remove a motion value and unbind any active subscriptions.
				*/
				removeValue: function(key) {
					var _a;
					values.delete(key);
					(_a = valueSubscriptions.get(key)) === null || _a === void 0 || _a();
					valueSubscriptions.delete(key);
					delete latestValues[key];
					removeValueFromRenderState(key, renderState);
				},
				/**
				* Check whether we have a motion value for this key
				*/
				hasValue: function(key) {
					return values.has(key);
				},
				/**
				* Get a motion value for this key. If called with a default
				* value, we'll create one if none exists.
				*/
				getValue: function(key, defaultValue) {
					var value = values.get(key);
					if (value === void 0 && defaultValue !== void 0) {
						value = motionValue(defaultValue);
						element.addValue(key, value);
					}
					return value;
				},
				/**
				* Iterate over our motion values.
				*/
				forEachValue: function(callback) {
					return values.forEach(callback);
				},
				/**
				* If we're trying to animate to a previously unencountered value,
				* we need to check for it in our state and as a last resort read it
				* directly from the instance (which might have performance implications).
				*/
				readValue: function(key) {
					var _a;
					return (_a = latestValues[key]) !== null && _a !== void 0 ? _a : readValueFromInstance(instance, key, options);
				},
				/**
				* Set the base target to later animate back to. This is currently
				* only hydrated on creation and when we first read a value.
				*/
				setBaseTarget: function(key, value) {
					baseTarget[key] = value;
				},
				/**
				* Find the base target for a value thats been removed from all animation
				* props.
				*/
				getBaseTarget: function(key) {
					if (getBaseTarget) {
						var target = getBaseTarget(props, key);
						if (target !== void 0 && !isMotionValue(target)) return target;
					}
					return baseTarget[key];
				}
			}, lifecycles), {
				/**
				* Build the renderer state based on the latest visual state.
				*/
				build: function() {
					triggerBuild();
					return renderState;
				},
				/**
				* Schedule a render on the next animation frame.
				*/
				scheduleRender: function() {
					sync.render(render, false, true);
				},
				/**
				* Synchronously fire render. It's prefered that we batch renders but
				* in many circumstances, like layout measurement, we need to run this
				* synchronously. However in those instances other measures should be taken
				* to batch reads/writes.
				*/
				syncRender: render,
				/**
				* Update the provided props. Ensure any newly-added motion values are
				* added to our map, old ones removed, and listeners updated.
				*/
				setProps: function(newProps) {
					props = newProps;
					lifecycles.updatePropListeners(newProps);
					prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps(props), prevMotionValues);
				},
				getProps: function() {
					return props;
				},
				/**
				* Returns the variant definition with a given name.
				*/
				getVariant: function(name) {
					var _a;
					return (_a = props.variants) === null || _a === void 0 ? void 0 : _a[name];
				},
				/**
				* Returns the defined default transition on this component.
				*/
				getDefaultTransition: function() {
					return props.transition;
				},
				/**
				* Used by child variant nodes to get the closest ancestor variant props.
				*/
				getVariantContext: function(startAtParent) {
					if (startAtParent === void 0) startAtParent = false;
					if (startAtParent) return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
					if (!isControllingVariants) {
						var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
						if (props.initial !== void 0) context_1.initial = props.initial;
						return context_1;
					}
					var context = {};
					for (var i = 0; i < numVariantProps; i++) {
						var name_1 = variantProps[i];
						var prop = props[name_1];
						if (isVariantLabel(prop) || prop === false) context[name_1] = prop;
					}
					return context;
				},
				/**
				* Enable layout projection for this visual element. Won't actually
				* occur until we also have hydrated layout measurements.
				*/
				enableLayoutProjection: function() {
					projection.isEnabled = true;
					element.layoutTree.add(element);
				},
				/**
				* Lock the projection target, for instance when dragging, so
				* nothing else can try and animate it.
				*/
				lockProjectionTarget: function() {
					projection.isTargetLocked = true;
				},
				unlockProjectionTarget: function() {
					element.stopLayoutAnimation();
					projection.isTargetLocked = false;
				},
				getLayoutState: function() {
					return layoutState;
				},
				setCrossfader: function(newCrossfader) {
					crossfader = newCrossfader;
				},
				isProjectionReady: function() {
					return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
				},
				/**
				* Start a layout animation on a given axis.
				*/
				startLayoutAnimation: function(axis, transition, isRelative) {
					if (isRelative === void 0) isRelative = false;
					var progress = element.getProjectionAnimationProgress()[axis];
					var _a = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a.min;
					var length = _a.max - min;
					progress.clearListeners();
					progress.set(min);
					progress.set(min);
					progress.onChange(function(v) {
						element.setProjectionTargetAxis(axis, v, v + length, isRelative);
					});
					return element.animateMotionValue(axis, progress, 0, transition);
				},
				/**
				* Stop layout animations.
				*/
				stopLayoutAnimation: function() {
					eachAxis(function(axis) {
						return element.getProjectionAnimationProgress()[axis].stop();
					});
				},
				/**
				* Measure the current viewport box with or without transforms.
				* Only measures axis-aligned boxes, rotate and skew must be manually
				* removed with a re-render to work.
				*/
				measureViewportBox: function(withTransform) {
					if (withTransform === void 0) withTransform = true;
					var viewportBox = measureViewportBox(instance, options);
					if (!withTransform) removeBoxTransforms(viewportBox, latestValues);
					return viewportBox;
				},
				/**
				* Get the motion values tracking the layout animations on each
				* axis. Lazy init if not already created.
				*/
				getProjectionAnimationProgress: function() {
					projectionTargetProgress || (projectionTargetProgress = {
						x: motionValue(0),
						y: motionValue(0)
					});
					return projectionTargetProgress;
				},
				/**
				* Update the projection of a single axis. Schedule an update to
				* the tree layout projection.
				*/
				setProjectionTargetAxis: function(axis, min, max, isRelative) {
					if (isRelative === void 0) isRelative = false;
					var target;
					if (isRelative) {
						if (!projection.relativeTarget) projection.relativeTarget = axisBox();
						target = projection.relativeTarget[axis];
					} else {
						projection.relativeTarget = void 0;
						target = projection.target[axis];
					}
					projection.isHydrated = true;
					target.min = min;
					target.max = max;
					hasViewportBoxUpdated = true;
					lifecycles.notifySetAxisTarget();
				},
				/**
				* Rebase the projection target on top of the provided viewport box
				* or the measured layout. This ensures that non-animating elements
				* don't fall out of sync differences in measurements vs projections
				* after a page scroll or other relayout.
				*/
				rebaseProjectionTarget: function(force, box) {
					if (box === void 0) box = layoutState.layout;
					var _a = element.getProjectionAnimationProgress(), x = _a.x, y = _a.y;
					var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();
					if (force || shouldRebase) eachAxis(function(axis) {
						var _a = box[axis], min = _a.min, max = _a.max;
						element.setProjectionTargetAxis(axis, min, max);
					});
				},
				/**
				* Notify the visual element that its layout is up-to-date.
				* Currently Animate.tsx uses this to check whether a layout animation
				* needs to be performed.
				*/
				notifyLayoutReady: function(config) {
					setCurrentViewportBox(element);
					element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
				},
				/**
				* Temporarily reset the transform of the instance.
				*/
				resetTransform: function() {
					return resetTransform(element, instance, props);
				},
				restoreTransform: function() {
					return restoreTransform(instance, renderState);
				},
				updateLayoutProjection,
				updateTreeLayoutProjection: function() {
					element.layoutTree.forEach(fireResolveRelativeTargetBox);
					/**
					* Schedule the projection updates at the end of the current preRender
					* step. This will ensure that all layout trees will first resolve
					* relative projection boxes into viewport boxes, and *then*
					* update projections.
					*/
					sync.preRender(updateTreeLayoutProjection, false, true);
				},
				getProjectionParent: function() {
					if (projectionParent === void 0) {
						var foundParent = false;
						for (var i = element.path.length - 1; i >= 0; i--) {
							var ancestor = element.path[i];
							if (ancestor.projection.isEnabled) {
								foundParent = ancestor;
								break;
							}
						}
						projectionParent = foundParent;
					}
					return projectionParent;
				},
				resolveRelativeTargetBox: function() {
					var relativeParent = element.getProjectionParent();
					if (!projection.relativeTarget || !relativeParent) return;
					calcRelativeBox(projection, relativeParent.projection);
					if (isDraggable(relativeParent)) {
						var target = projection.target;
						applyBoxTransforms(target, target, relativeParent.getLatestValues());
					}
				},
				shouldResetTransform: function() {
					return Boolean(props._layoutResetTransform);
				},
				/**
				*
				*/
				pointTo: function(newLead) {
					leadProjection = newLead.projection;
					leadLatestValues = newLead.getLatestValues();
					/**
					* Subscribe to lead component's layout animations
					*/
					unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 || unsubscribeFromLeadVisualElement();
					unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
						var _a;
						if (element.isPresent) element.presence = Presence.Present;
						else (_a = element.layoutSafeToRemove) === null || _a === void 0 || _a.call(element);
					}));
				},
				isPresent: true,
				presence: Presence.Entering
			});
			return element;
		};
	};
	variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
	numVariantProps = variantProps.length;
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.js
function removeNonTranslationalTransform(visualElement) {
	var removedTransforms = [];
	nonTranslationalTransformKeys.forEach(function(key) {
		var value = visualElement.getValue(key);
		if (value !== void 0) {
			removedTransforms.push([key, value.get()]);
			value.set(key.startsWith("scale") ? 1 : 0);
		}
	});
	if (removedTransforms.length) visualElement.syncRender();
	return removedTransforms;
}
/**
* Convert value types for x/y/width/height/top/left/bottom/right
*
* Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
*
* @internal
*/
function unitConversion(visualElement, target, origin, transitionEnd) {
	return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : {
		target,
		transitionEnd
	};
}
var positionalKeys, isPositionalKey, hasPositionalKey, setAndResetVelocity, isNumOrPxType, BoundingBoxDimension, getPosFromMatrix, getTranslateFromMatrix, transformKeys, nonTranslationalTransformKeys, positionalValues, convertChangedValueTypes, checkAndConvertChangedValueTypes;
var init_unit_conversion = __esmMin((() => {
	init_tslib_es6();
	init_es$3();
	init_is_keyframes_target();
	init_hey_listen_es();
	init_transform();
	init_dimensions();
	positionalKeys = /* @__PURE__ */ new Set([
		"width",
		"height",
		"top",
		"left",
		"right",
		"bottom",
		"x",
		"y"
	]);
	isPositionalKey = function(key) {
		return positionalKeys.has(key);
	};
	hasPositionalKey = function(target) {
		return Object.keys(target).some(isPositionalKey);
	};
	setAndResetVelocity = function(value, to) {
		value.set(to, false);
		value.set(to);
	};
	isNumOrPxType = function(v) {
		return v === number || v === px;
	};
	(function(BoundingBoxDimension) {
		BoundingBoxDimension["width"] = "width";
		BoundingBoxDimension["height"] = "height";
		BoundingBoxDimension["left"] = "left";
		BoundingBoxDimension["right"] = "right";
		BoundingBoxDimension["top"] = "top";
		BoundingBoxDimension["bottom"] = "bottom";
	})(BoundingBoxDimension || (BoundingBoxDimension = {}));
	getPosFromMatrix = function(matrix, pos) {
		return parseFloat(matrix.split(", ")[pos]);
	};
	getTranslateFromMatrix = function(pos2, pos3) {
		return function(_bbox, _a) {
			var transform = _a.transform;
			if (transform === "none" || !transform) return 0;
			var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
			if (matrix3d) return getPosFromMatrix(matrix3d[1], pos3);
			else {
				var matrix = transform.match(/^matrix\((.+)\)$/);
				if (matrix) return getPosFromMatrix(matrix[1], pos2);
				else return 0;
			}
		};
	};
	transformKeys = /* @__PURE__ */ new Set([
		"x",
		"y",
		"z"
	]);
	nonTranslationalTransformKeys = transformProps.filter(function(key) {
		return !transformKeys.has(key);
	});
	positionalValues = {
		width: function(_a) {
			var x = _a.x;
			return x.max - x.min;
		},
		height: function(_a) {
			var y = _a.y;
			return y.max - y.min;
		},
		top: function(_bbox, _a) {
			var top = _a.top;
			return parseFloat(top);
		},
		left: function(_bbox, _a) {
			var left = _a.left;
			return parseFloat(left);
		},
		bottom: function(_a, _b) {
			var y = _a.y;
			var top = _b.top;
			return parseFloat(top) + (y.max - y.min);
		},
		right: function(_a, _b) {
			var x = _a.x;
			var left = _b.left;
			return parseFloat(left) + (x.max - x.min);
		},
		x: getTranslateFromMatrix(4, 13),
		y: getTranslateFromMatrix(5, 14)
	};
	convertChangedValueTypes = function(target, visualElement, changedKeys) {
		var originBbox = visualElement.measureViewportBox();
		var element = visualElement.getInstance();
		var elementComputedStyle = getComputedStyle(element);
		var display = elementComputedStyle.display;
		var originComputedStyle = {
			top: elementComputedStyle.top,
			left: elementComputedStyle.left,
			bottom: elementComputedStyle.bottom,
			right: elementComputedStyle.right,
			transform: elementComputedStyle.transform
		};
		if (display === "none") visualElement.setStaticValue("display", target.display || "block");
		visualElement.syncRender();
		var targetBbox = visualElement.measureViewportBox();
		changedKeys.forEach(function(key) {
			setAndResetVelocity(visualElement.getValue(key), positionalValues[key](originBbox, originComputedStyle));
			target[key] = positionalValues[key](targetBbox, elementComputedStyle);
		});
		return target;
	};
	checkAndConvertChangedValueTypes = function(visualElement, target, origin, transitionEnd) {
		if (origin === void 0) origin = {};
		if (transitionEnd === void 0) transitionEnd = {};
		target = __assign({}, target);
		transitionEnd = __assign({}, transitionEnd);
		var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
		var removedTransformValues = [];
		var hasAttemptedToRemoveTransformValues = false;
		var changedValueTypeKeys = [];
		targetPositionalKeys.forEach(function(key) {
			var value = visualElement.getValue(key);
			if (!visualElement.hasValue(key)) return;
			var from = origin[key];
			var to = target[key];
			var fromType = findDimensionValueType(from);
			var toType;
			if (isKeyframesTarget(to)) {
				var numKeyframes = to.length;
				for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) if (!toType) {
					toType = findDimensionValueType(to[i]);
					invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
				} else invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
			} else toType = findDimensionValueType(to);
			if (fromType !== toType) {
				if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
					var current = value.get();
					if (typeof current === "string") value.set(parseFloat(current));
					if (typeof to === "string") target[key] = parseFloat(to);
					else if (Array.isArray(to) && toType === px) target[key] = to.map(parseFloat);
				} else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
					if (from === 0) value.set(toType.transform(from));
					else target[key] = fromType.transform(to);
				} else {
					if (!hasAttemptedToRemoveTransformValues) {
						removedTransformValues = removeNonTranslationalTransform(visualElement);
						hasAttemptedToRemoveTransformValues = true;
					}
					changedValueTypeKeys.push(key);
					transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
					setAndResetVelocity(value, to);
				}
			}
		});
		if (changedValueTypeKeys.length) {
			var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
			if (removedTransformValues.length) removedTransformValues.forEach(function(_a) {
				var _b = __read(_a, 2), key = _b[0], value = _b[1];
				visualElement.getValue(key).set(value);
			});
			visualElement.syncRender();
			return {
				target: convertedTarget,
				transitionEnd
			};
		} else return {
			target,
			transitionEnd
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.js
var parseDomVariant;
var init_parse_dom_variant = __esmMin((() => {
	init_css_variables_conversion();
	init_unit_conversion();
	parseDomVariant = function(visualElement, target, origin, transitionEnd) {
		var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
		target = resolved.target;
		transitionEnd = resolved.transitionEnd;
		return unitConversion(visualElement, target, origin, transitionEnd);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/html/visual-element.js
function getComputedStyle$1(element) {
	return window.getComputedStyle(element);
}
var htmlConfig, htmlVisualElement;
var init_visual_element$1 = __esmMin((() => {
	init_tslib_es6();
	init_render();
	init_setters();
	init_measure();
	init_build_styles();
	init_is_css_variable();
	init_parse_dom_variant();
	init_transform();
	init_scrape_motion_values$1();
	init_render$2();
	init_defaults();
	init_build_projection_transform();
	htmlConfig = {
		treeType: "dom",
		readValueFromInstance: function(domElement, key) {
			if (isTransformProp(key)) {
				var defaultType = getDefaultValueType(key);
				return defaultType ? defaultType.default || 0 : 0;
			} else {
				var computedStyle = getComputedStyle$1(domElement);
				return (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
			}
		},
		sortNodePosition: function(a, b) {
			/**
			* compareDocumentPosition returns a bitmask, by using the bitwise &
			* we're returning true if 2 in that bitmask is set to true. 2 is set
			* to true if b preceeds a.
			*/
			return a.compareDocumentPosition(b) & 2 ? 1 : -1;
		},
		getBaseTarget: function(props, key) {
			var _a;
			return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
		},
		measureViewportBox: function(element, _a) {
			var transformPagePoint = _a.transformPagePoint;
			return getBoundingBox(element, transformPagePoint);
		},
		/**
		* Reset the transform on the current Element. This is called as part
		* of a batched process across the entire layout tree. To remove this write
		* cycle it'd be interesting to see if it's possible to "undo" all the current
		* layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
		* works
		*/
		resetTransform: function(element, domElement, props) {
			var transformTemplate = props.transformTemplate;
			domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
			element.scheduleRender();
		},
		restoreTransform: function(instance, mutableState) {
			instance.style.transform = mutableState.style.transform;
		},
		removeValueFromRenderState: function(key, _a) {
			var vars = _a.vars, style = _a.style;
			delete vars[key];
			delete style[key];
		},
		/**
		* Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
		* can be animated by Motion.
		*/
		makeTargetAnimatable: function(element, _a, _b, isMounted) {
			var transformValues = _b.transformValues;
			if (isMounted === void 0) isMounted = true;
			var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
			var origin = getOrigin(target, transition || {}, element);
			/**
			* If Framer has provided a function to convert `Color` etc value types, convert them
			*/
			if (transformValues) {
				if (transitionEnd) transitionEnd = transformValues(transitionEnd);
				if (target) target = transformValues(target);
				if (origin) origin = transformValues(origin);
			}
			if (isMounted) {
				checkTargetForNewValues(element, target, origin);
				var parsed = parseDomVariant(element, target, origin, transitionEnd);
				transitionEnd = parsed.transitionEnd;
				target = parsed.target;
			}
			return __assign({
				transition,
				transitionEnd
			}, target);
		},
		scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
		build: function(element, renderState, latestValues, projection, layoutState, options, props) {
			if (element.isVisible !== void 0) renderState.style.visibility = element.isVisible ? "visible" : "hidden";
			var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
			buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
		},
		render: renderHTML
	};
	htmlVisualElement = visualElement(htmlConfig);
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/svg/visual-element.js
var svgVisualElement;
var init_visual_element = __esmMin((() => {
	init_tslib_es6();
	init_render();
	init_scrape_motion_values();
	init_visual_element$1();
	init_build_attrs();
	init_camel_to_dash();
	init_camel_case_attrs();
	init_transform();
	init_render$1();
	init_defaults();
	init_build_projection_transform();
	svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), {
		getBaseTarget: function(props, key) {
			return props[key];
		},
		readValueFromInstance: function(domElement, key) {
			var _a;
			if (isTransformProp(key)) return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
			key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
			return domElement.getAttribute(key);
		},
		scrapeMotionValuesFromProps,
		build: function(_element, renderState, latestValues, projection, layoutState, options, props) {
			var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
			buildSVGAttrs(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
		},
		render: renderSVG
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/create-visual-element.js
var createDomVisualElement;
var init_create_visual_element = __esmMin((() => {
	init_visual_element$1();
	init_visual_element();
	init_is_svg_component();
	createDomVisualElement = function(Component, options) {
		return isSVGComponent(Component) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/render/dom/motion.js
var featureBundle, motion;
var init_motion = __esmMin((() => {
	init_tslib_es6();
	init_motion_proxy();
	init_create_config();
	init_gestures();
	init_animations();
	init_drag();
	init_layout();
	init_create_visual_element();
	featureBundle = __assign(__assign(__assign(__assign({}, animations), gestureAnimations), drag), layoutAnimations);
	motion = /*@__PURE__*/ createMotionProxy(function(Component, config) {
		return createDomMotionConfig(Component, config, featureBundle, createDomVisualElement);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/utils/use-force-update.js
function useForceUpdate() {
	var unloadingRef = (0, import_react$4.useRef)(false);
	var _a = __read((0, import_react$4.useState)(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
	useUnmountEffect(function() {
		return unloadingRef.current = true;
	});
	return (0, import_react$4.useCallback)(function() {
		!unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
	}, [forcedRenderCount]);
}
var import_react$4;
var init_use_force_update = __esmMin((() => {
	init_tslib_es6();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_use_unmount_effect();
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js
function getPresenceId() {
	var id = presenceId;
	presenceId++;
	return id;
}
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
var import_react$2, import_react$3, presenceId, PresenceChild;
var init_PresenceChild = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_PresenceContext();
	init_use_constant();
	presenceId = 0;
	PresenceChild = function(_a) {
		var children = _a.children, initial = _a.initial, isPresent = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
		var presenceChildren = useConstant(newChildrenMap);
		var id = useConstant(getPresenceId);
		var context = (0, import_react$3.useMemo)(
			function() {
				return {
					id,
					initial,
					isPresent,
					custom,
					onExitComplete: function(childId) {
						presenceChildren.set(childId, true);
						var allComplete = true;
						presenceChildren.forEach(function(isComplete) {
							if (!isComplete) allComplete = false;
						});
						allComplete && (onExitComplete === null || onExitComplete === void 0 || onExitComplete());
					},
					register: function(childId) {
						presenceChildren.set(childId, false);
						return function() {
							return presenceChildren.delete(childId);
						};
					}
				};
			},
			/**
			* If the presence of a child affects the layout of the components around it,
			* we want to make a new context value to ensure they get re-rendered
			* so they can detect that layout change.
			*/
			presenceAffectsLayout ? void 0 : [isPresent]
		);
		(0, import_react$3.useMemo)(function() {
			presenceChildren.forEach(function(_, key) {
				return presenceChildren.set(key, false);
			});
		}, [isPresent]);
		/**
		* If there's no `motion` components to fire exit animations, we want to remove this
		* component immediately.
		*/
		import_react$2.useEffect(function() {
			!isPresent && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 || onExitComplete());
		}, [isPresent]);
		return import_react$2.createElement(PresenceContext.Provider, { value: context }, children);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/components/AnimatePresence/index.js
function getChildKey(child) {
	return child.key || "";
}
function updateChildLookup(children, allChildren) {
	children.forEach(function(child) {
		var key = getChildKey(child);
		allChildren.set(key, child);
	});
}
function onlyElements(children) {
	var filtered = [];
	import_react$1.Children.forEach(children, function(child) {
		if ((0, import_react$1.isValidElement)(child)) filtered.push(child);
	});
	return filtered;
}
var import_react, import_react$1, AnimatePresence;
var init_AnimatePresence = __esmMin((() => {
	init_tslib_es6();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_force_update();
	init_PresenceChild();
	init_SharedLayoutContext();
	AnimatePresence = function(_a) {
		var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
		var forceRender = useForceUpdate();
		var layoutContext = (0, import_react$1.useContext)(SharedLayoutContext);
		if (isSharedLayout(layoutContext)) forceRender = layoutContext.forceUpdate;
		var isInitialRender = (0, import_react$1.useRef)(true);
		var filteredChildren = onlyElements(children);
		var presentChildren = (0, import_react$1.useRef)(filteredChildren);
		var allChildren = (0, import_react$1.useRef)(/* @__PURE__ */ new Map()).current;
		var exiting = (0, import_react$1.useRef)(/* @__PURE__ */ new Set()).current;
		updateChildLookup(filteredChildren, allChildren);
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return import_react.createElement(import_react.Fragment, null, filteredChildren.map(function(child) {
				return import_react.createElement(PresenceChild, {
					key: getChildKey(child),
					isPresent: true,
					initial: initial ? void 0 : false,
					presenceAffectsLayout
				}, child);
			}));
		}
		var childrenToRender = __spreadArray([], __read(filteredChildren));
		var presentKeys = presentChildren.current.map(getChildKey);
		var targetKeys = filteredChildren.map(getChildKey);
		var numPresent = presentKeys.length;
		for (var i = 0; i < numPresent; i++) {
			var key = presentKeys[i];
			if (targetKeys.indexOf(key) === -1) exiting.add(key);
			else exiting.delete(key);
		}
		if (exitBeforeEnter && exiting.size) childrenToRender = [];
		exiting.forEach(function(key) {
			if (targetKeys.indexOf(key) !== -1) return;
			var child = allChildren.get(key);
			if (!child) return;
			var insertionIndex = presentKeys.indexOf(key);
			var onExit = function() {
				allChildren.delete(key);
				exiting.delete(key);
				var removeIndex = presentChildren.current.findIndex(function(presentChild) {
					return presentChild.key === key;
				});
				presentChildren.current.splice(removeIndex, 1);
				if (!exiting.size) {
					presentChildren.current = filteredChildren;
					forceRender();
					onExitComplete && onExitComplete();
				}
			};
			childrenToRender.splice(insertionIndex, 0, import_react.createElement(PresenceChild, {
				key: getChildKey(child),
				isPresent: false,
				onExitComplete: onExit,
				custom,
				presenceAffectsLayout
			}, child));
		});
		childrenToRender = childrenToRender.map(function(child) {
			var key = child.key;
			return exiting.has(key) ? child : import_react.createElement(PresenceChild, {
				key: getChildKey(child),
				isPresent: true,
				presenceAffectsLayout
			}, child);
		});
		presentChildren.current = childrenToRender;
		return import_react.createElement(import_react.Fragment, null, exiting.size ? childrenToRender : childrenToRender.map(function(child) {
			return (0, import_react$1.cloneElement)(child);
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/framer-motion@4.1.17_@types_46fc95eb18d2e768465a0fe6f8df4443/node_modules/framer-motion/dist/es/index.js
var init_es = __esmMin((() => {
	init_motion();
	init_motion_proxy();
	init_create_config();
	init_AnimatePresence();
	init_types();
	init_VisualElementDragControls();
	init_es$2();
	init_es$1();
	init_value();
	init_is_motion_value();
	init_transitions();
	init_SharedLayoutContext();
	init_MotionContext();
	init_transform();
	init_batcher();
	init_utils$1();
	init_MotionConfigContext();
	init_use_constant();
	init_LazyContext();
	init_definitions();
	init_animations();
	init_gestures();
	init_create_visual_element();
	init_drag();
	init_layout();
	init_resolve_motion_value();
	init_use_dom_event();
	init_use_isomorphic_effect();
	init_hey_listen_es();
	init_animation();
	init_setters();
	init_valid_prop();
	init_use_presence();
	init_batch_layout();
	init_motion$1();
	init_scale_correction();
	init_render();
	init_PresenceContext();
	init_LayoutGroupContext();
	init_flat_tree();
	init_geometry();
	init_use_visual_state();
}));
//#endregion
export { Loading_default as C, Button_default as D, init_Modal as E, init_Button as O, init_Input as S, Modal_default as T, ActionSheet_default as _, motion as a, init_Divider as b, init_BottomModal as c, PullPanel_default as d, init_PullPanel as f, init_Checkbox as g, Checkbox_default as h, init_motion as i, Tooltip_default as l, init_Snackbar as m, AnimatePresence as n, init_esm as o, Snackbar_default as p, init_AnimatePresence as r, BottomModal_default as s, init_es as t, init_Tooltip as u, init_ActionSheet as v, init_Loading as w, Input_default as x, Divider_default as y };
