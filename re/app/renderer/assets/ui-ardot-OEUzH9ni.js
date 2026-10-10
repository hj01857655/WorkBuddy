import { n as __esmMin, o as __toCommonJS, r as __exportAll, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Dv as require_dist, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/_chunks/dep-03138308.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (e.indexOf(n) >= 0) continue;
		t[n] = r[n];
	}
	return t;
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
var classnames, classNames;
var init_dep_03138308 = __esmMin((() => {
	classnames = { exports: {} };
	/*!
	Copyright (c) 2017 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
	*/
	(function(module) {
		(function() {
			"use strict";
			var hasOwn = {}.hasOwnProperty;
			function classNames() {
				var classes = [];
				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!arg) continue;
					var argType = typeof arg;
					if (argType === "string" || argType === "number") classes.push(arg);
					else if (Array.isArray(arg) && arg.length) {
						var inner = classNames.apply(null, arg);
						if (inner) classes.push(inner);
					} else if (argType === "object") {
						for (var key in arg) if (hasOwn.call(arg, key) && arg[key]) classes.push(key);
					}
				}
				return classes.join(" ");
			}
			if (module.exports) {
				classNames.default = classNames;
				module.exports = classNames;
			} else window.classNames = classNames;
		})();
	})(classnames);
	classNames = classnames.exports;
})), import_react$36, DEFAULT_LOCALE, ConfigContext;
var init_config_context = __esmMin((() => {
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_LOCALE = "zh-CN";
	ConfigContext = /*#__PURE__*/ (0, import_react$36.createContext)({
		classPrefix: "t",
		locale: DEFAULT_LOCALE
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/util/use-config.js
var import_react$35, useConfig;
var init_use_config = __esmMin((() => {
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_config_context();
	useConfig = (function() {
		return (0, import_react$35.useContext)(ConfigContext);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/util/use-common-classname.js
function useCommonClassName() {
	var classPrefix = useConfig().classPrefix;
	return (0, import_react$34.useMemo)(function() {
		return {
			SIZE: {
				"default": "",
				xs: "".concat(classPrefix, "-size-xs"),
				small: "".concat(classPrefix, "-size-s"),
				medium: "".concat(classPrefix, "-size-m"),
				large: "".concat(classPrefix, "-size-l"),
				xl: "".concat(classPrefix, "-size-xl"),
				block: "".concat(classPrefix, "-size-full-width")
			},
			STATUS: {
				loading: "".concat(classPrefix, "-is-loading"),
				disabled: "".concat(classPrefix, "-is-disabled"),
				focused: "".concat(classPrefix, "-is-focused"),
				success: "".concat(classPrefix, "-is-success"),
				error: "".concat(classPrefix, "-is-error"),
				warning: "".concat(classPrefix, "-is-warning"),
				selected: "".concat(classPrefix, "-is-selected"),
				active: "".concat(classPrefix, "-is-active"),
				checked: "".concat(classPrefix, "-is-checked"),
				current: "".concat(classPrefix, "-is-current"),
				hidden: "".concat(classPrefix, "-is-hidden"),
				visible: "".concat(classPrefix, "-is-visible"),
				expanded: "".concat(classPrefix, "-is-expanded"),
				indeterminate: "".concat(classPrefix, "-is-indeterminate")
			}
		};
	}, [classPrefix]);
}
var import_react$34;
var init_use_common_classname = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	init_use_config();
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/util/use-size-props.js
function useSizeProps(size) {
	var COMMON_SIZE_CLASS_NAMES = useCommonClassName().SIZE;
	if (typeof size === "undefined") return {};
	if (!(size in COMMON_SIZE_CLASS_NAMES)) return {
		className: "",
		style: { fontSize: size }
	};
	return {
		className: COMMON_SIZE_CLASS_NAMES[size],
		style: {}
	};
}
var init_use_size_props = __esmMin((() => {
	init_use_common_classname();
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/util/check-url-and-load.js
function loadStylesheet() {
	var styleSheetId = "__TDESIGN_ICON_STYLE__";
	var iconStyleString = "@keyframes t-spin {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n  .t-icon {\n    display: inline-block;\n    vertical-align: middle;\n    width: 1em;\n    height: 1em;\n  }\n  .t-icon::before {\n    font-family: unset;\n  }\n  .t-icon-loading {\n    animation: t-spin 1s linear infinite;\n  }\n  .t-icon.t-size-s,\n  i.t-size-s {\n    font-size: 14px;\n  }\n  .t-icon.t-size-m,\n  i.t-size-m {\n    font-size: 16px;\n  }\n  .t-icon.t-size-l,\n  i.t-size-l {\n    font-size: 18px;\n  }\n  ";
	if (!document || document.getElementById(styleSheetId)) return;
	var styleSheet = document.createElement("style");
	styleSheet.setAttribute("id", styleSheetId);
	styleSheet.innerHTML = iconStyleString;
	document.head.appendChild(styleSheet);
}
var init_check_url_and_load = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/icon.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function render(node, id, rootProps) {
	var _strokeColor$, _fillColor$;
	var _rootProps$strokeColo = rootProps.strokeColor, strokeColor = _rootProps$strokeColo === void 0 ? "currentColor" : _rootProps$strokeColo, _rootProps$strokeWidt = rootProps.strokeWidth, strokeWidth = _rootProps$strokeWidt === void 0 ? 2 : _rootProps$strokeWidt, _rootProps$fillColor = rootProps.fillColor, fillColor = _rootProps$fillColor === void 0 ? "transparent" : _rootProps$fillColor, resetRootProps = _objectWithoutProperties(rootProps, _excluded);
	var filledColor;
	if (!rootProps.fillColor) filledColor = "currentColor";
	else filledColor = Array.isArray(fillColor) ? fillColor[0] : fillColor;
	var childProps = {
		strokeWidth,
		strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
		strokeColor2: Array.isArray(strokeColor) ? (_strokeColor$ = strokeColor[1]) !== null && _strokeColor$ !== void 0 ? _strokeColor$ : strokeColor[0] : strokeColor,
		fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
		fillColor2: Array.isArray(fillColor) ? (_fillColor$ = fillColor[1]) !== null && _fillColor$ !== void 0 ? _fillColor$ : fillColor[0] : fillColor,
		filledColor
	};
	return /*#__PURE__*/ (0, import_react$32.createElement)(node.tag, _objectSpread$28(_objectSpread$28({ key: id }, node.attrs), resetRootProps), (node.children || []).map(function(child, index) {
		return childRender(child, childProps, index);
	}));
}
function childRender(node, childProps, index) {
	var processedAttrs = {};
	if (node.attrs) for (var _i = 0, _Object$entries = Object.entries(node.attrs); _i < _Object$entries.length; _i++) {
		var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
		if (typeof value === "string" && value.startsWith("props.")) processedAttrs[key] = childProps[value.split(".")[1]];
		else processedAttrs[key] = value;
	}
	return /*#__PURE__*/ (0, import_react$32.createElement)(node.tag, _objectSpread$28({ key: index }, processedAttrs), (node.children || []).map(function(child, index2) {
		return childRender(child, childProps, index2);
	}));
}
var import_react$32, _excluded, _excluded2, IconBase;
var init_icon = __esmMin((() => {
	init_dep_03138308();
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_use_size_props();
	init_check_url_and_load();
	_excluded = [
		"strokeColor",
		"strokeWidth",
		"fillColor"
	];
	_excluded2 = [
		"icon",
		"id",
		"className",
		"size",
		"style"
	];
	IconBase = /*#__PURE__*/ (0, import_react$32.forwardRef)(function(props, ref) {
		var icon = props.icon, id = props.id, className = props.className, size = props.size, style = props.style, restProps = _objectWithoutProperties(props, _excluded2);
		var _useSizeProps = useSizeProps(size), sizeClassName = _useSizeProps.className, sizeStyle = _useSizeProps.style;
		var cls = classNames("t-icon", "t-icon-".concat(id), className, sizeClassName);
		(0, import_react$32.useEffect)(function() {
			loadStylesheet();
		}, []);
		return render(icon, "".concat(id), _objectSpread$28({
			ref,
			className: cls,
			style: _objectSpread$28(_objectSpread$28({ fill: "none" }, style), sizeStyle)
		}, restProps));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/add.js
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$31, element$27, AddIcon;
var init_add = __esmMin((() => {
	init_dep_03138308();
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$27 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "add" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M12 5L12 19M19 12L5 12",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	AddIcon = /*#__PURE__*/ (0, import_react$31.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$31.createElement)(IconBase, _objectSpread$27(_objectSpread$27({}, props), {}, {
			id: "add",
			ref,
			icon: element$27
		}));
	});
	AddIcon.displayName = "AddIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/browse-off.js
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$30, element$26, BrowseOffIcon;
var init_browse_off = __esmMin((() => {
	init_dep_03138308();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$26 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "browse-off" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M13.1758 8.17578C14.4396 8.56376 15.4368 9.56096 15.8247 10.8247M21.2858 15.2856C22.0085 14.2983 22.5776 13.1913 22.9578 12C21.4771 7.36017 17.131 4 12.0001 4C11.3698 4 10.7513 4.05072 10.1484 4.1483M5.80747 5.80786C3.57225 7.23888 1.86478 9.42193 1.04199 12.0001C2.52275 16.6399 6.86881 20.0001 11.9997 20.0001C14.2796 20.0001 16.4045 19.3367 18.1919 18.1923L5.80747 5.80786ZM8 12.0003C8 10.8957 8.44771 9.89573 9.17157 9.17188L14.8284 14.8287C14.1046 15.5526 13.1046 16.0003 12 16.0003C9.79086 16.0003 8 14.2094 8 12.0003Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.9996 21L3 3",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	BrowseOffIcon = /*#__PURE__*/ (0, import_react$30.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$30.createElement)(IconBase, _objectSpread$26(_objectSpread$26({}, props), {}, {
			id: "browse-off",
			ref,
			icon: element$26
		}));
	});
	BrowseOffIcon.displayName = "BrowseOffIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/browse.js
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$29, element$25, BrowseIcon;
var init_browse = __esmMin((() => {
	init_dep_03138308();
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$25 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": {
				"id": "browse",
				"clipPath": "url(#clip0_543_7945)"
			},
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M11.9997 4C6.86881 4 2.52275 7.36017 1.04199 12C2.52275 16.6398 6.86881 20 11.9997 20C17.1306 20 21.4766 16.6398 22.9574 12C21.4766 7.36017 17.1306 4 11.9997 4Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "fill2",
						"fill": "props.fillColor2",
						"d": "M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M11.9997 4C6.86881 4 2.52275 7.36017 1.04199 12C2.52275 16.6398 6.86881 20 11.9997 20C17.1306 20 21.4766 16.6398 22.9574 12C21.4766 7.36017 17.1306 4 11.9997 4Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	BrowseIcon = /*#__PURE__*/ (0, import_react$29.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$29.createElement)(IconBase, _objectSpread$25(_objectSpread$25({}, props), {}, {
			id: "browse",
			ref,
			icon: element$25
		}));
	});
	BrowseIcon.displayName = "BrowseIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/check-circle-filled.js
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$28, element$24, CheckCircleFilledIcon;
var init_check_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$24 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM7.49985 10.5858L10.4999 13.5858L16.4999 7.58578L17.9141 8.99999L10.4999 16.4142L6.08564 12L7.49985 10.5858Z"
			}
		}]
	};
	CheckCircleFilledIcon = /*#__PURE__*/ (0, import_react$28.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$28.createElement)(IconBase, _objectSpread$24(_objectSpread$24({}, props), {}, {
			id: "check-circle-filled",
			ref,
			icon: element$24
		}));
	});
	CheckCircleFilledIcon.displayName = "CheckCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/chevron-down.js
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$27, element$23, ChevronDownIcon;
var init_chevron_down = __esmMin((() => {
	init_dep_03138308();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$23 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-down" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M17.5 9.5L12 15L6.5 9.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronDownIcon = /*#__PURE__*/ (0, import_react$27.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$27.createElement)(IconBase, _objectSpread$23(_objectSpread$23({}, props), {}, {
			id: "chevron-down",
			ref,
			icon: element$23
		}));
	});
	ChevronDownIcon.displayName = "ChevronDownIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/chevron-left.js
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$26, element$22, ChevronLeftIcon;
var init_chevron_left = __esmMin((() => {
	init_dep_03138308();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$22 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-left" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M14.5 17.5L9 12L14.5 6.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronLeftIcon = /*#__PURE__*/ (0, import_react$26.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$26.createElement)(IconBase, _objectSpread$22(_objectSpread$22({}, props), {}, {
			id: "chevron-left",
			ref,
			icon: element$22
		}));
	});
	ChevronLeftIcon.displayName = "ChevronLeftIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/chevron-right.js
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$25, element$21, ChevronRightIcon;
var init_chevron_right = __esmMin((() => {
	init_dep_03138308();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$21 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-right" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M9.5 17.5L15 12L9.5 6.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronRightIcon = /*#__PURE__*/ (0, import_react$25.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$25.createElement)(IconBase, _objectSpread$21(_objectSpread$21({}, props), {}, {
			id: "chevron-right",
			ref,
			icon: element$21
		}));
	});
	ChevronRightIcon.displayName = "ChevronRightIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/close-circle-filled.js
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$24, element$20, CloseCircleFilledIcon;
var init_close_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$20 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM8.81753 7.40346L11.9999 10.5858L15.1815 7.40414L16.5957 8.81835L13.4141 12L16.5957 15.1816L15.1815 16.5958L11.9999 13.4142L8.81753 16.5965L7.40332 15.1823L10.5856 12L7.40332 8.81767L8.81753 7.40346Z"
			}
		}]
	};
	CloseCircleFilledIcon = /*#__PURE__*/ (0, import_react$24.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$24.createElement)(IconBase, _objectSpread$20(_objectSpread$20({}, props), {}, {
			id: "close-circle-filled",
			ref,
			icon: element$20
		}));
	});
	CloseCircleFilledIcon.displayName = "CloseCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/close.js
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$23, element$19, CloseIcon;
var init_close = __esmMin((() => {
	init_dep_03138308();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$19 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "close" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.9503 7.05029L12.0005 12M12.0005 12L7.05078 16.9498M12.0005 12L16.9503 16.9498M12.0005 12L7.05078 7.05029",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	CloseIcon = /*#__PURE__*/ (0, import_react$23.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$23.createElement)(IconBase, _objectSpread$19(_objectSpread$19({}, props), {}, {
			id: "close",
			ref,
			icon: element$19
		}));
	});
	CloseIcon.displayName = "CloseIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/delete.js
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$22, element$18, DeleteIcon;
var init_delete = __esmMin((() => {
	init_dep_03138308();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$18 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "delete" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M5 5H19L18.5 22H5.5L5 5Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M21 5H3M5 5H19L18.5 22H5.5L5 5ZM8.5 2H15.5V5H8.5V2Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M12 9V18",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	DeleteIcon = /*#__PURE__*/ (0, import_react$22.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$22.createElement)(IconBase, _objectSpread$18(_objectSpread$18({}, props), {}, {
			id: "delete",
			ref,
			icon: element$18
		}));
	});
	DeleteIcon.displayName = "DeleteIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/download.js
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$21, element$17, DownloadIcon;
var init_download = __esmMin((() => {
	init_dep_03138308();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$17 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "download" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.5 10.5L12 15L7.5 10.5M12 13.75V4",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.5 15V20H3.5V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	DownloadIcon = /*#__PURE__*/ (0, import_react$21.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$21.createElement)(IconBase, _objectSpread$17(_objectSpread$17({}, props), {}, {
			id: "download",
			ref,
			icon: element$17
		}));
	});
	DownloadIcon.displayName = "DownloadIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/error-circle-filled.js
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$20, element$16, ErrorCircleFilledIcon;
var init_error_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$16 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM11.0001 14H13.0001V6.49998H11.0001V14ZM13.004 15.5H11.0001V17.5039H13.004V15.5Z"
			}
		}]
	};
	ErrorCircleFilledIcon = /*#__PURE__*/ (0, import_react$20.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$20.createElement)(IconBase, _objectSpread$16(_objectSpread$16({}, props), {}, {
			id: "error-circle-filled",
			ref,
			icon: element$16
		}));
	});
	ErrorCircleFilledIcon.displayName = "ErrorCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/file-excel.js
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$19, element$15, FileExcelIcon;
var init_file_excel = __esmMin((() => {
	init_dep_03138308();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$15 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-excel" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M14 11L14 11.6465C14 11.918 13.8896 12.1779 13.6941 12.3664L12 14M10 11L10 11.6465C10 11.918 10.1104 12.1779 10.3059 12.3664L12 14M12 14L10.3059 15.6336C10.1104 15.8221 10 16.082 10 16.3535L10 17M12 14L13.6941 15.6336C13.8896 15.8221 14 16.082 14 16.3535V17",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FileExcelIcon = /*#__PURE__*/ (0, import_react$19.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$19.createElement)(IconBase, _objectSpread$15(_objectSpread$15({}, props), {}, {
			id: "file-excel",
			ref,
			icon: element$15
		}));
	});
	FileExcelIcon.displayName = "FileExcelIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/file-pdf.js
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$18, element$14, FilePdfIcon;
var init_file_pdf = __esmMin((() => {
	init_dep_03138308();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$14 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-pdf" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M20 10V7L15 2H4V22H20M14 2V8H20",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M7 16V13H9.71428C9.87208 13 10 13.1279 10 13.2857V15.7143C10 15.8721 9.87208 16 9.71428 16H7ZM7 16V19M20.6667 13H18.2857C18.1279 13 18 13.1279 18 13.2857V16M18 16H20.6667M18 16V19M12.5 13V19H15.2143C15.3721 19 15.5 18.8721 15.5 18.7143V13.2857C15.5 13.1279 15.3721 13 15.2143 13H12.5Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	FilePdfIcon = /*#__PURE__*/ (0, import_react$18.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$18.createElement)(IconBase, _objectSpread$14(_objectSpread$14({}, props), {}, {
			id: "file-pdf",
			ref,
			icon: element$14
		}));
	});
	FilePdfIcon.displayName = "FilePdfIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/file-powerpoint.js
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$17, element$13, FilePowerpointIcon;
var init_file_powerpoint = __esmMin((() => {
	init_dep_03138308();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$13 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-powerpoint" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M10 14.6V11H13C13.5523 11 14 11.4477 14 12V13.6C14 14.1523 13.5523 14.6 13 14.6H10ZM10 14.6V17",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FilePowerpointIcon = /*#__PURE__*/ (0, import_react$17.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$17.createElement)(IconBase, _objectSpread$13(_objectSpread$13({}, props), {}, {
			id: "file-powerpoint",
			ref,
			icon: element$13
		}));
	});
	FilePowerpointIcon.displayName = "FilePowerpointIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/file-word.js
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$16, element$12, FileWordIcon;
var init_file_word = __esmMin((() => {
	init_dep_03138308();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$12 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-word" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M9 12L9 16C9 16.5523 9.44772 17 10 17H12M12 17L12 12M12 17H14C14.5523 17 15 16.5523 15 16V12",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FileWordIcon = /*#__PURE__*/ (0, import_react$16.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$16.createElement)(IconBase, _objectSpread$12(_objectSpread$12({}, props), {}, {
			id: "file-word",
			ref,
			icon: element$12
		}));
	});
	FileWordIcon.displayName = "FileWordIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/file.js
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$15, element$11, FileIcon;
var init_file = __esmMin((() => {
	init_dep_03138308();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$11 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "fill1",
					"fill": "props.fillColor1",
					"d": "M4 22H20V8H14V2H4V22Z"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	FileIcon = /*#__PURE__*/ (0, import_react$15.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$15.createElement)(IconBase, _objectSpread$11(_objectSpread$11({}, props), {}, {
			id: "file",
			ref,
			icon: element$11
		}));
	});
	FileIcon.displayName = "FileIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/help-circle-filled.js
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$14, element$10, HelpCircleFilledIcon;
var init_help_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$10 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11.8265 11.8902C12.2582 11.3593 12.8004 10.9159 13.2365 10.5723C13.7034 10.2045 14.0002 9.63718 14.0002 9C14.0002 7.89543 13.1048 7 12.0002 7C11.131 7 10.3888 7.5551 10.1138 8.33325L9.78055 9.27609L7.89487 8.6096L8.22811 7.66676C8.77675 6.11451 10.2571 5 12.0002 5C14.2094 5 16.0002 6.79086 16.0002 9C16.0002 10.2759 15.4018 11.4125 14.4742 12.1433C14.0426 12.4834 13.6573 12.8088 13.3783 13.1519C13.1038 13.4896 13.0002 13.762 13.0002 14V15.25H11.0002V14C11.0002 13.1334 11.3905 12.4265 11.8265 11.8902ZM11.0001 18.2539V16.25H13.004V18.2539H11.0001Z"
			}
		}]
	};
	HelpCircleFilledIcon = /*#__PURE__*/ (0, import_react$14.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$14.createElement)(IconBase, _objectSpread$10(_objectSpread$10({}, props), {}, {
			id: "help-circle-filled",
			ref,
			icon: element$10
		}));
	});
	HelpCircleFilledIcon.displayName = "HelpCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/image-error.js
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$13, element$9, ImageErrorIcon;
var init_image_error = __esmMin((() => {
	init_dep_03138308();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$9 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "image-error" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M21 11V3H3V21H11M13 14L9 10L3.5 15.5M17.75 8.25C17.75 9.35457 16.8546 10.25 15.75 10.25C14.6454 10.25 13.75 9.35457 13.75 8.25C13.75 7.14543 14.6454 6.25 15.75 6.25C16.8546 6.25 17.75 7.14543 17.75 8.25Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M21.8287 16.1719L19.0003 19.0003M19.0003 19.0003L16.1719 21.8287M19.0003 19.0003L16.1719 16.1719M19.0003 19.0003L21.8287 21.8287",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ImageErrorIcon = /*#__PURE__*/ (0, import_react$13.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$13.createElement)(IconBase, _objectSpread$9(_objectSpread$9({}, props), {}, {
			id: "image-error",
			ref,
			icon: element$9
		}));
	});
	ImageErrorIcon.displayName = "ImageErrorIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/image.js
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$12, element$8, ImageIcon;
var init_image = __esmMin((() => {
	init_dep_03138308();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$8 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "image" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M3 21H20L9 10L3 16V21Z"
					}
				},
				{
					"tag": "circle",
					"attrs": {
						"id": "fill2",
						"cx": 15.75,
						"cy": 8.25,
						"r": 2,
						"fill": "props.fillColor2"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M3 16V3H21V21H20M3 16V21H20M3 16L9 10L20 21",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "circle",
					"attrs": {
						"id": "stroke2",
						"cx": 15.75,
						"cy": 8.25,
						"r": 2,
						"stroke": "props.strokeColor2",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ImageIcon = /*#__PURE__*/ (0, import_react$12.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$12.createElement)(IconBase, _objectSpread$8(_objectSpread$8({}, props), {}, {
			id: "image",
			ref,
			icon: element$8
		}));
	});
	ImageIcon.displayName = "ImageIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/info-circle-filled.js
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$11, element$7, InfoCircleFilledIcon;
var init_info_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$7 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM10.996 8.50002V6.49611H12.9999V8.50002H10.996ZM12.9999 10L12.9999 17.5H10.9999V10L12.9999 10Z"
			}
		}]
	};
	InfoCircleFilledIcon = /*#__PURE__*/ (0, import_react$11.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$11.createElement)(IconBase, _objectSpread$7(_objectSpread$7({}, props), {}, {
			id: "info-circle-filled",
			ref,
			icon: element$7
		}));
	});
	InfoCircleFilledIcon.displayName = "InfoCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/mirror.js
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$10, element$6, MirrorIcon;
var init_mirror = __esmMin((() => {
	init_dep_03138308();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$6 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "mirror" },
			"children": [
				{
					"tag": "g",
					"attrs": { "id": "fill1" },
					"children": [{
						"tag": "path",
						"attrs": {
							"fill": "props.fillColor1",
							"d": "M8 8.5V17.5H3L8 8.5Z"
						}
					}, {
						"tag": "path",
						"attrs": {
							"fill": "props.fillColor1",
							"d": "M16 8.5V17.5H21L16 8.5Z"
						}
					}]
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M12 3L12 21",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "g",
					"attrs": { "id": "stroke1" },
					"children": [{
						"tag": "path",
						"attrs": {
							"stroke": "props.strokeColor1",
							"d": "M8 8.5V17.5H3L8 8.5Z",
							"strokeLinecap": "square",
							"strokeWidth": "props.strokeWidth"
						}
					}, {
						"tag": "path",
						"attrs": {
							"stroke": "props.strokeColor1",
							"d": "M16 8.5V17.5H21L16 8.5Z",
							"strokeLinecap": "square",
							"strokeWidth": "props.strokeWidth"
						}
					}]
				}
			]
		}]
	};
	MirrorIcon = /*#__PURE__*/ (0, import_react$10.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$10.createElement)(IconBase, _objectSpread$6(_objectSpread$6({}, props), {}, {
			id: "mirror",
			ref,
			icon: element$6
		}));
	});
	MirrorIcon.displayName = "MirrorIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/rotation.js
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$9, element$5, RotationIcon;
var init_rotation = __esmMin((() => {
	init_dep_03138308();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$5 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "rotation" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M12 20C12 15.5818 8.41828 12 4 12M3 3V21H21",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	RotationIcon = /*#__PURE__*/ (0, import_react$9.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$9.createElement)(IconBase, _objectSpread$5(_objectSpread$5({}, props), {}, {
			id: "rotation",
			ref,
			icon: element$5
		}));
	});
	RotationIcon.displayName = "RotationIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/time-filled.js
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$8, element$4, TimeFilledIcon;
var init_time_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$4 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12.9999 5.49999H10.9999L10.9998 12.4142L14.9999 16.4142L16.4141 15L12.9999 11.5858V5.49999Z"
			}
		}]
	};
	TimeFilledIcon = /*#__PURE__*/ (0, import_react$8.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$8.createElement)(IconBase, _objectSpread$4(_objectSpread$4({}, props), {}, {
			id: "time-filled",
			ref,
			icon: element$4
		}));
	});
	TimeFilledIcon.displayName = "TimeFilledIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/upload.js
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$7, element$3, UploadIcon;
var init_upload = __esmMin((() => {
	init_dep_03138308();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$3 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "upload" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.5 8.5L12 4L7.5 8.5M12 5.25V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.5 15V20H3.5V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	UploadIcon = /*#__PURE__*/ (0, import_react$7.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$7.createElement)(IconBase, _objectSpread$3(_objectSpread$3({}, props), {}, {
			id: "upload",
			ref,
			icon: element$3
		}));
	});
	UploadIcon.displayName = "UploadIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/video.js
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$6, element$2, VideoIcon;
var init_video = __esmMin((() => {
	init_dep_03138308();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$2 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "video" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M3 3H21V21H3V3Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "fill2",
						"fill": "props.fillColor2",
						"d": "M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M3 3H21V21H3V3Z",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	VideoIcon = /*#__PURE__*/ (0, import_react$6.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$6.createElement)(IconBase, _objectSpread$2(_objectSpread$2({}, props), {}, {
			id: "video",
			ref,
			icon: element$2
		}));
	});
	VideoIcon.displayName = "VideoIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/zoom-in.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$5, element$1, ZoomInIcon;
var init_zoom_in = __esmMin((() => {
	init_dep_03138308();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$1 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "zoom-in" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM15.8033 15.8033L21.1066 21.1066",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M10.5 13.5V10.5M10.5 10.5L10.5 7.5M10.5 10.5H7.5M10.5 10.5H13.5",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ZoomInIcon = /*#__PURE__*/ (0, import_react$5.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$5.createElement)(IconBase, _objectSpread$1(_objectSpread$1({}, props), {}, {
			id: "zoom-in",
			ref,
			icon: element$1
		}));
	});
	ZoomInIcon.displayName = "ZoomInIcon";
}));
//#endregion
//#region ../../node_modules/.pnpm/tdesign-icons-react@0.6.4_@_e0373ed633904aaf793824182e870ebe/node_modules/tdesign-icons-react/esm/components/zoom-out.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$4, element, ZoomOutIcon;
var init_zoom_out = __esmMin((() => {
	init_dep_03138308();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "zoom-out" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM15.8033 15.8033L21.1066 21.1066",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M7.5 10.5H10.5L13.5 10.5",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ZoomOutIcon = /*#__PURE__*/ (0, import_react$4.forwardRef)(function(props, ref) {
		return /*#__PURE__*/ (0, import_react$4.createElement)(IconBase, _objectSpread(_objectSpread({}, props), {}, {
			id: "zoom-out",
			ref,
			icon: element
		}));
	});
	ZoomOutIcon.displayName = "ZoomOutIcon";
}));
var init_esm = __esmMin((() => {
	init_icon();
	init_dep_03138308();
	init_use_config();
	init_use_size_props();
	init_config_context();
	init_use_common_classname();
	init_add();
	init_browse_off();
	init_browse();
	init_check_circle_filled();
	init_chevron_down();
	init_chevron_left();
	init_chevron_right();
	init_close_circle_filled();
	init_close();
	init_delete();
	init_download();
	init_error_circle_filled();
	init_file_excel();
	init_file_pdf();
	init_file_powerpoint();
	init_file_word();
	init_file();
	init_help_circle_filled();
	init_image_error();
	init_image();
	init_info_circle_filled();
	init_mirror();
	init_rotation();
	init_time_filled();
	init_upload();
	init_video();
	init_zoom_in();
	init_zoom_out();
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6_644c5cf25075b1ba0645a99a7b2b7915/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6_644c5cf25075b1ba0645a99a7b2b7915/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6_644c5cf25075b1ba0645a99a7b2b7915/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6_644c5cf25075b1ba0645a99a7b2b7915/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.20_immer@10.2.0_react@18.3.1/node_modules/zustand/esm/vanilla.js
var vanilla_exports = /* @__PURE__ */ __exportAll({
	createStore: () => createStore$1,
	default: () => vanilla
});
var createStoreImpl$1, createStore$1, vanilla;
var init_vanilla$1 = __esmMin((() => {
	createStoreImpl$1 = (createState) => {
		let state;
		const listeners = /* @__PURE__ */ new Set();
		const setState = (partial, replace) => {
			const nextState = typeof partial === "function" ? partial(state) : partial;
			if (!Object.is(nextState, state)) {
				const previousState = state;
				state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
				listeners.forEach((listener) => listener(state, previousState));
			}
		};
		const getState = () => state;
		const getInitialState = () => initialState;
		const subscribe = (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		};
		const destroy = () => {
			listeners.clear();
		};
		const api = {
			setState,
			getState,
			getInitialState,
			subscribe,
			destroy
		};
		const initialState = state = createState(setState, getState, api);
		return api;
	};
	createStore$1 = (createState) => createState ? createStoreImpl$1(createState) : createStoreImpl$1;
	vanilla = (createState) => {
		return createStore$1(createState);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.20_immer@10.2.0_react@18.3.1/node_modules/zustand/index.js
var require_zustand = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var vanilla = (init_vanilla$1(), __toCommonJS(vanilla_exports));
	var ReactExports = require_react();
	var useSyncExternalStoreExports = require_with_selector();
	var useDebugValue = ReactExports.useDebugValue;
	var useSyncExternalStoreWithSelector = useSyncExternalStoreExports.useSyncExternalStoreWithSelector;
	var identity = function identity(arg) {
		return arg;
	};
	function useStore(api, selector, equalityFn) {
		if (selector === void 0) selector = identity;
		var slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
		useDebugValue(slice);
		return slice;
	}
	var createImpl = function createImpl(createState) {
		var api = typeof createState === "function" ? vanilla.createStore(createState) : createState;
		var useBoundStore = function useBoundStore(selector, equalityFn) {
			return useStore(api, selector, equalityFn);
		};
		Object.assign(useBoundStore, api);
		return useBoundStore;
	};
	var create = function create(createState) {
		return createState ? createImpl(createState) : createImpl;
	};
	var react = (function(createState) {
		return create(createState);
	});
	exports.create = create;
	exports.default = react;
	exports.useStore = useStore;
	Object.keys(vanilla).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return vanilla[k];
			}
		});
	});
	module.exports = react;
	module.exports.create = create;
	module.exports.useStore = useStore;
	module.exports.createStore = vanilla.createStore;
	exports.default = module.exports;
}));
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.20_immer@10.2.0_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl, createStore;
var init_vanilla = __esmMin((() => {
	createStoreImpl = (createState) => {
		let state;
		const listeners = /* @__PURE__ */ new Set();
		const setState = (partial, replace) => {
			const nextState = typeof partial === "function" ? partial(state) : partial;
			if (!Object.is(nextState, state)) {
				const previousState = state;
				state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
				listeners.forEach((listener) => listener(state, previousState));
			}
		};
		const getState = () => state;
		const getInitialState = () => initialState;
		const subscribe = (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		};
		const destroy = () => {
			listeners.clear();
		};
		const api = {
			setState,
			getState,
			getInitialState,
			subscribe,
			destroy
		};
		const initialState = state = createState(setState, getState, api);
		return api;
	};
	createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/ardot-canvas.ts
function isVirtualMcpAppArtifactUri(path) {
	return path.startsWith("ardot://canvas/") || path.startsWith("mcp-app://");
}
/**
* 识别历史上错误落盘的 create_design 产物卡。
*
* 合法统一卡的 appId 是 open_design，仅用 sourceAppId=create_design 记录生产来源；
* 因此这里只检查顶层 appId，不会误伤规范化产物。
*/
function isNonReplayableArdotCreateDesignArtifact(meta) {
	if (!meta || typeof meta !== "object" || Array.isArray(meta)) return false;
	return meta.appId === "ardot/create_design";
}
/**
* 判断产物卡片是否应展示 Ardot 专属图标。
*
* 覆盖：存量 `ardot/canvas`、新 `mcp/app` + Ardot appId、以及 `ardot://canvas/...` URI。
*/
function isArdotArtifactIcon(item) {
	if (!item) return false;
	if (item.customType === "ardot/canvas") return true;
	if (item.customType === "mcp/app" && typeof item.mcpApp?.appId === "string" && ARDOT_DESIGN_APP_IDS.has(item.mcpApp.appId)) return true;
	return Boolean(extractArdotCanvasFileId({
		uri: item.uri,
		id: item.id
	}));
}
/**
* 从正式 Ardot artifact 中提取 fileId。
*
* 识别：
* - 存量 `ardot://canvas/<fileId>`
* - 统一写路径 `mcp-app://artifact/ardot/<fileId>`
*
* synthetic「新画布」item 的 id (`design-new-canvas:<sessionId>`) 不会进入这里。
* 不传 / 非 Ardot artifact / 解析失败 → undefined。
*/
function extractArdotCanvasFileId(input) {
	if (!input) return;
	const candidates = [typeof input.uri === "string" ? input.uri : void 0, typeof input.id === "string" ? input.id : void 0];
	for (const candidate of candidates) {
		if (!candidate) continue;
		if (candidate.startsWith("ardot://canvas/")) {
			const fileId = candidate.slice(15).trim();
			if (fileId.length > 0) return fileId;
			continue;
		}
		if (candidate.startsWith("mcp-app://artifact/ardot/")) {
			const raw = candidate.slice(25).trim();
			if (!raw) continue;
			try {
				const fileId = decodeURIComponent(raw).trim();
				if (fileId.length > 0) return fileId;
			} catch {
				if (raw.length > 0) return raw;
			}
		}
	}
}
/**
* 将不同版本的 Ardot artifact 归一化为当前 MCP Server 的 open_design 入参。
*
* 历史产物可能只有 `ardot://canvas/<fileId>`；统一写路径则为 `mcp/app` +
* `mcp-app://artifact/ardot/<fileId>` 或 toolResult.structuredContent.fileId。
* 回放只依赖稳定的 fileUrl/fileId，绝不复用 create_design 快照去重挂整页 Guest
* （否则每次切会话都会新建 300KB+ iframe，表现为卡死）。
*/
function resolveArdotArtifactReplayTarget(artifact) {
	const structured = artifact.mcpApp?.toolResult?.structuredContent;
	const fromText = extractArdotIdentityFromToolResult(artifact.mcpApp?.toolResult);
	const fileUrl = [
		artifact.ardotCanvas?.fileUrl,
		artifact.ardotCanvas?.fileId,
		typeof structured?.fileUrl === "string" ? structured.fileUrl : void 0,
		typeof structured?.fileId === "string" ? structured.fileId : void 0,
		fromText?.fileUrl,
		fromText?.fileId,
		extractArdotCanvasFileId({
			uri: artifact.uri,
			id: artifact.id
		})
	].find((candidate) => typeof candidate === "string" && candidate.trim().length > 0)?.trim();
	if (!fileUrl) return;
	return {
		appId: "ardot/open_design",
		toolInput: { fileUrl }
	};
}
/**
* 从 ACP 包装 / 纯文本结果里抽出 fileId、fileUrl。
*
* 覆盖 #90171 合入后仍落错的历史卡：live 曾把 `{type,text}` 写成 structuredContent，
* URI 没有 fileId。点卡时必须从文案补身份；已有 structuredContent.fileId 的卡
* 走 candidates 前面的字段，不会被这段逻辑覆盖。
*/
function extractArdotIdentityFromToolResult(toolResult) {
	if (!toolResult) return;
	const nodes = [];
	if (toolResult.structuredContent) nodes.push(toolResult.structuredContent);
	if (toolResult.content !== void 0) nodes.push(toolResult.content);
	const texts = [];
	const fieldIdentities = [];
	const visit = (value, depth) => {
		if (depth > 5 || value == null) return;
		if (typeof value === "string") {
			texts.push(value);
			const trimmed = value.trim();
			if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
				visit(JSON.parse(trimmed), depth + 1);
			} catch {}
			return;
		}
		if (Array.isArray(value)) {
			for (const item of value) visit(item, depth + 1);
			return;
		}
		if (typeof value !== "object") return;
		const record = value;
		const fileId = typeof record.fileId === "string" && record.fileId.trim() ? record.fileId.trim() : void 0;
		const rawFileUrl = typeof record.fileUrl === "string" && record.fileUrl.trim() ? record.fileUrl.trim() : void 0;
		if (rawFileUrl || fileId) {
			const fileUrl = normalizeArdotOpenDesignFileUrl(rawFileUrl ?? fileId);
			const resolvedFileId = fileId ?? extractArdotOpenDesignFileId(fileUrl);
			fieldIdentities.push({
				...resolvedFileId ? { fileId: resolvedFileId } : {},
				fileUrl
			});
		}
		if (typeof record.text === "string") visit(record.text, depth + 1);
		if (record.content !== void 0) visit(record.content, depth + 1);
	};
	for (const node of nodes) visit(node, 0);
	if (fieldIdentities[0]) return fieldIdentities[0];
	for (const text of texts) {
		const trimmed = text.trim();
		if (trimmed.startsWith("{") || trimmed.startsWith("[")) continue;
		const created = CREATED_ARDOT_FILE_RE.exec(text);
		if (created?.[2] && created[3]) return {
			fileId: created[2],
			fileUrl: created[3].replace(/[.,;)}\]"']+$/u, "")
		};
		const opening = OPENING_ARDOT_FILE_RE.exec(text);
		if (opening?.[1]) return {
			fileId: opening[1],
			fileUrl: normalizeArdotOpenDesignFileUrl(opening[1])
		};
		const opened = OPEN_ARDOT_DESIGN_FILE_RE.exec(text);
		if (opened?.[1]) {
			const fileUrl = normalizeArdotOpenDesignFileUrl(opened[1].replace(/[.,;)}\]"']+$/u, ""));
			const fileId = extractArdotOpenDesignFileId(fileUrl);
			return {
				...fileId ? { fileId } : {},
				fileUrl
			};
		}
	}
}
/**
* 根据 fileId 构造 Ardot 站点的公开访问 URL。
*
* 用于分享场景：ardot 产物（`ardot://canvas/<fileId>`）是虚拟 URI，
* 无法直接在浏览器打开。分享卡片需要构造一个可公开访问的 http URL，
* 让用户点击后跳转到 Ardot 站点查看画布。
*
* 选用 `/file/<id>` 直链（而非 `/embed`）：
* - `/embed` 需要 postMessage 握手 + 授权 token 注入，仅适用于内嵌预览；
* - `/file/<id>` 是 Ardot 编辑器/查看器直链，适合分享页外部跳转。
*/
function buildArdotWebFileUrl(fileId) {
	return `${ARDOT_WEB_FILE_BASE_URL}${encodeURIComponent(fileId)}?from=workbuddy`;
}
/**
* 将裸 fileId 或已有 URL 归一为 open_design 可消费的 fileUrl（无分享 query）。
*/
function normalizeArdotOpenDesignFileUrl(fileUrl) {
	const trimmed = fileUrl.trim();
	if (!trimmed) return trimmed;
	if (/^\d+$/.test(trimmed)) return `${ARDOT_WEB_FILE_BASE_URL}${encodeURIComponent(trimmed)}`;
	return trimmed;
}
/**
* 从 `ardot/open_design` 的 `fileUrl` 入参解析 fileId。
*
* Ardot MCP server 的 open_design schema 是 `{ fileUrl: string }`,
* 其中 `fileUrl` 可以是纯数字 fileId,也可以是 `<host>/file/<id>`
* 形式的 URL。这里不校验 host,只抽取路径中的 `/file/<id>`,
* 供 UI 侧把 Agent live tool_call 的目标画布同步到已有正式 artifact。
*/
function extractArdotOpenDesignFileId(fileUrl) {
	if (typeof fileUrl !== "string") return;
	const trimmed = fileUrl.trim();
	if (!trimmed) return;
	if (/^\d+$/.test(trimmed)) return trimmed;
	try {
		const url = new URL(trimmed);
		return /^\/file\/(\d+)\/?$/.exec(url.pathname)?.[1];
	} catch {
		return;
	}
}
/**
* 判断一个 URL 是否是可直接嵌入的 ardot embed URL。
*
* 后端约定灵感 link 类型的 ardot 稿件下发格式：
*   `https://<ardot|test.ardot>.tencent.com/embed?host=workbuddy-playbook&viewer=0&file_id=<id>[&m=slide]`
*
* 只接受 pathname === '/embed'、hostname 命中白名单、协议为 https；
* 其他 link（普通外部网页 / 老 `/file/<id>` 编辑器直链 / 非灵感场景）不走
* 内嵌 ardot 分支，保留裸 iframe 预览路径。
*/
function isArdotEmbedUrl(url) {
	if (typeof url !== "string" || url.trim().length === 0) return false;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:") return false;
		if (!ARDOT_EMBED_HOSTNAMES.has(parsed.hostname)) return false;
		if (parsed.pathname !== "/embed") return false;
		const fileId = parsed.searchParams.get("file_id");
		return !!fileId && /^\d+$/.test(fileId);
	} catch {
		return false;
	}
}
function resolveArdotLastOpenedTarget(input) {
	if (input.appId !== "ardot/open_design" && input.appId !== "ardot/create_design") return;
	const fileId = extractArdotOpenDesignFileId(input.toolInput?.fileUrl);
	if (fileId) return {
		kind: "canvas",
		appId: "ardot/open_design",
		fileId,
		...input.targetArtifactId ? { artifactId: input.targetArtifactId } : {}
	};
	return {
		kind: "synthetic",
		appId: input.appId
	};
}
var ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE, ARDOT_CANVAS_URI_PREFIX, MCP_APP_ARDOT_ARTIFACT_URI_PREFIX, ARDOT_DESIGN_APP_IDS, CREATED_ARDOT_FILE_RE, OPENING_ARDOT_FILE_RE, OPEN_ARDOT_DESIGN_FILE_RE, ARDOT_WEB_FILE_BASE_URL, ARDOT_EMBED_HOSTNAMES;
var init_ardot_canvas = __esmMin((() => {
	ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE = "ardot/canvas";
	ARDOT_CANVAS_URI_PREFIX = "ardot://canvas/";
	MCP_APP_ARDOT_ARTIFACT_URI_PREFIX = "mcp-app://artifact/ardot/";
	ARDOT_DESIGN_APP_IDS = /* @__PURE__ */ new Set(["ardot/open_design", "ardot/create_design"]);
	CREATED_ARDOT_FILE_RE = /Created Ardot design file:\s*(.+?),\s*fileId\s+(\d+),\s*url\s+(https?:\/\/[^\s"'\\]+)/i;
	OPENING_ARDOT_FILE_RE = /\bOpening Ardot editor for file\s+(\d+)\b/i;
	OPEN_ARDOT_DESIGN_FILE_RE = /\bOpen Ardot design file:\s*(https?:\/\/[^\s"'\\]+|\d+)/i;
	ARDOT_WEB_FILE_BASE_URL = "https://ardot.tencent.com/file/";
	ARDOT_EMBED_HOSTNAMES = /* @__PURE__ */ new Set(["ardot.tencent.com", "test.ardot.tencent.com"]);
}));
//#endregion
//#region ../../packages/ardot-infra/src/service/ardot-auth.service.ts
var TAG, CONNECTOR_NAME, CONNECT_CODE, ArdotAuthService;
var init_ardot_auth_service = __esmMin((() => {
	TAG = "[ArdotAuthService]";
	CONNECTOR_NAME = "ardot";
	CONNECT_CODE = "shadow_account_grant";
	ArdotAuthService = class {
		constructor(adapter) {
			this.adapter = adapter;
		}
		connectorOauthStatus() {
			return this.invokeWithName("connectorOauthStatus");
		}
		connectorOauthAccessToken() {
			return this.invokeWithName("connectorOauthAccessToken");
		}
		connectorOauthRevoke() {
			return this.invokeWithName("connectorOauthRevoke");
		}
		connectorOauthConnect() {
			return this.resolve("connectorOauthConnect").call(this.adapter, CONNECTOR_NAME, { code: CONNECT_CODE });
		}
		invokeWithName(method) {
			return this.resolve(method).call(this.adapter, CONNECTOR_NAME);
		}
		resolve(method) {
			if (!this.adapter) throw new Error(`${TAG} adapter is not provided`);
			const fn = this.adapter[method];
			if (typeof fn !== "function") throw new Error(`${TAG} adapter.${String(method)} is not available`);
			return fn;
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/service/index.ts
var init_service = __esmMin((() => {
	init_ardot_auth_service();
}));
//#endregion
//#region ../../packages/ardot-infra/src/state/ardot-auth.store.ts
var DEFAULT_SKEW_MS, _deferredCancelCleanup, _cancelPrevented, ardotAuthStore;
var init_ardot_auth_store = __esmMin((() => {
	init_vanilla();
	DEFAULT_SKEW_MS = 6e5;
	_cancelPrevented = false;
	ardotAuthStore = createStore((set, get) => ({
		accessToken: void 0,
		expireAt: void 0,
		visible: false,
		setToken: ({ accessToken, expireAt }) => {
			set({
				accessToken,
				expireAt
			});
		},
		clearToken: () => {
			set({
				accessToken: void 0,
				expireAt: void 0
			});
		},
		isValid: (skewMs = DEFAULT_SKEW_MS) => {
			const { accessToken, expireAt } = get();
			if (!accessToken) return false;
			if (expireAt === void 0) return true;
			return Date.now() + skewMs < expireAt;
		},
		close: () => {
			_cancelPrevented = _deferredCancelCleanup !== void 0;
			if (_deferredCancelCleanup !== void 0) {
				try {
					_deferredCancelCleanup();
				} catch {}
				_deferredCancelCleanup = void 0;
			}
			set({ visible: false });
		},
		handleAuthResult: ({ status }) => {
			if (status === "unbound") set({ visible: true });
		},
		setDeferredCancelCleanup: (cleanup) => {
			if (_deferredCancelCleanup !== void 0) try {
				_deferredCancelCleanup();
			} catch {}
			_deferredCancelCleanup = cleanup;
			_cancelPrevented = false;
		},
		markCancelFired: () => {
			_deferredCancelCleanup = void 0;
		},
		wasCancelPrevented: () => _cancelPrevented
	}));
}));
//#endregion
//#region ../../packages/ardot-infra/src/state/index.ts
var init_state = __esmMin((() => {
	init_ardot_auth_store();
}));
//#endregion
//#region ../../packages/ardot-infra/src/hooks/use-ardot-auth.ts
function useArdotAuth(adapter) {
	const service = (0, import_react$2.useMemo)(() => new ArdotAuthService(adapter), [adapter]);
	const checkAuth = (0, import_react$2.useCallback)(async () => {
		const status = toStatus(unwrap(await service.connectorOauthStatus(), "checkAuth"));
		if (status.status === "connected" && status.accessToken) cacheToken({
			accessToken: status.accessToken,
			expireAt: status.expireAt
		});
		return status;
	}, [service]);
	const refreshToken = (0, import_react$2.useCallback)(async () => {
		const token = toAccessToken(unwrap(await service.connectorOauthAccessToken(), "refreshToken"));
		cacheToken(token);
		return token;
	}, [service]);
	const getToken = (0, import_react$2.useCallback)(async () => {
		const state = ardotAuthStore.getState();
		if (state.isValid() && state.accessToken) return {
			accessToken: state.accessToken,
			expireAt: state.expireAt
		};
		return refreshToken();
	}, [refreshToken]);
	const authConnector = (0, import_react$2.useCallback)(async () => {
		const token = toAccessToken(unwrap(await service.connectorOauthConnect(), "authConnector"));
		cacheToken(token);
		return token;
	}, [service]);
	const authRevoke = (0, import_react$2.useCallback)(async () => {
		const data = unwrap(await service.connectorOauthRevoke(), "authRevoke");
		ardotAuthStore.getState().clearToken();
		return toRevokeResult(data);
	}, [service]);
	return (0, import_react$2.useMemo)(() => ({
		checkAuth,
		getToken,
		refreshToken,
		authConnector,
		authRevoke
	}), [
		checkAuth,
		getToken,
		refreshToken,
		authConnector,
		authRevoke
	]);
}
function unwrap(resp, verb) {
	if (resp.code !== 0 || resp.data === void 0 || resp.data === null) throw new ArdotAuthError(verb, resp);
	return resp.data;
}
function toStatus(data) {
	return {
		status: data.status,
		accessToken: data.access_token,
		connectedAt: secondsToMs(data.connected_at),
		expireAt: secondsToMs(data.expire_at),
		expiresIn: data.expires_in
	};
}
function toAccessToken(data) {
	return {
		accessToken: data.access_token,
		expireAt: secondsToMs(data.expire_at)
	};
}
function toRevokeResult(data) {
	return {
		status: data.status,
		revokedCount: data.revoked_count
	};
}
function secondsToMs(seconds) {
	if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return;
	return seconds * 1e3;
}
function cacheToken(token) {
	ardotAuthStore.getState().setToken({
		accessToken: token.accessToken,
		expireAt: token.expireAt
	});
}
var import_react$2, ArdotAuthError;
var init_use_ardot_auth = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_service();
	init_state();
	ArdotAuthError = class extends Error {
		constructor(verb, resp) {
			const parts = [`[useArdotAuth] ${verb} failed`, `code=${resp.code}`];
			if (resp.msg) parts.push(`msg=${resp.msg}`);
			if (resp.requestId) parts.push(`requestId=${resp.requestId}`);
			super(parts.join(" "));
			this.name = "ArdotAuthError";
			this.code = resp.code;
			this.msg = resp.msg;
			this.requestId = resp.requestId;
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_ardot_auth();
}));
//#endregion
//#region ../../packages/ardot-infra/src/types/index.ts
var init_types$1 = __esmMin((() => {})), ARDOT_AUTH_I18N_KEYS;
var init_auth_i18n = __esmMin((() => {
	ARDOT_AUTH_I18N_KEYS = {
		title: "ardotAuth.title",
		description: "ardotAuth.description",
		tipRegister: "ardotAuth.tip.register",
		tipFiles: "ardotAuth.tip.files",
		tipRefs: "ardotAuth.tip.refs",
		tipShareInfo: "ardotAuth.tip.shareInfo",
		btnCancel: "ardotAuth.btn.cancel",
		btnAuthorize: "ardotAuth.btn.authorize",
		btnAuthorizing: "ardotAuth.btn.authorizing",
		closeAriaLabel: "ardotAuth.aria.close",
		dialogAriaLabel: "ardotAuth.aria.dialog",
		defaultTargetAppName: "ardotAuth.defaultTargetAppName",
		agreementPrefix: "ardotAuth.agreement.prefix",
		agreementPolicy: "ardotAuth.agreement.policy",
		agreementPrivacy: "ardotAuth.agreement.privacy",
		agreementAnd: "ardotAuth.agreement.and",
		agreementCheckboxAriaLabel: "ardotAuth.agreement.checkboxAriaLabel"
	};
	ARDOT_AUTH_I18N_KEYS.title, ARDOT_AUTH_I18N_KEYS.description, ARDOT_AUTH_I18N_KEYS.tipRegister, ARDOT_AUTH_I18N_KEYS.tipFiles, ARDOT_AUTH_I18N_KEYS.tipRefs, ARDOT_AUTH_I18N_KEYS.tipShareInfo, ARDOT_AUTH_I18N_KEYS.btnCancel, ARDOT_AUTH_I18N_KEYS.btnAuthorize, ARDOT_AUTH_I18N_KEYS.btnAuthorizing, ARDOT_AUTH_I18N_KEYS.closeAriaLabel, ARDOT_AUTH_I18N_KEYS.dialogAriaLabel, ARDOT_AUTH_I18N_KEYS.defaultTargetAppName, ARDOT_AUTH_I18N_KEYS.agreementPrefix, ARDOT_AUTH_I18N_KEYS.agreementPolicy, ARDOT_AUTH_I18N_KEYS.agreementPrivacy, ARDOT_AUTH_I18N_KEYS.agreementAnd, ARDOT_AUTH_I18N_KEYS.agreementCheckboxAriaLabel, ARDOT_AUTH_I18N_KEYS.title, ARDOT_AUTH_I18N_KEYS.description, ARDOT_AUTH_I18N_KEYS.tipRegister, ARDOT_AUTH_I18N_KEYS.tipFiles, ARDOT_AUTH_I18N_KEYS.tipRefs, ARDOT_AUTH_I18N_KEYS.tipShareInfo, ARDOT_AUTH_I18N_KEYS.btnCancel, ARDOT_AUTH_I18N_KEYS.btnAuthorize, ARDOT_AUTH_I18N_KEYS.btnAuthorizing, ARDOT_AUTH_I18N_KEYS.closeAriaLabel, ARDOT_AUTH_I18N_KEYS.dialogAriaLabel, ARDOT_AUTH_I18N_KEYS.defaultTargetAppName, ARDOT_AUTH_I18N_KEYS.agreementPrefix, ARDOT_AUTH_I18N_KEYS.agreementPolicy, ARDOT_AUTH_I18N_KEYS.agreementPrivacy, ARDOT_AUTH_I18N_KEYS.agreementAnd, ARDOT_AUTH_I18N_KEYS.agreementCheckboxAriaLabel;
}));
var init_auth_content = __esmMin((() => {
	require_react();
	init_auth_i18n();
	require_jsx_runtime();
}));
var init_auth_modal = __esmMin((() => {
	require_react();
	require_react_dom();
	init_auth_content();
	init_auth_i18n();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/ardot-infra/src/ui/index.ts
var init_ui = __esmMin((() => {
	init_auth_modal();
	init_auth_content();
	init_auth_i18n();
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/constants.ts
function readEnvOverride() {
	try {
		const value = ((typeof import_dist.default !== "undefined" ? import_dist.default : void 0)?.env)?.VITE_ARDOT_DEV_BASE_URL;
		if (typeof value === "string" && value.trim().length > 0) return value.trim();
	} catch {}
}
function readWindowOverride() {
	if (typeof window === "undefined") return;
	const value = window.__ardotDevBaseUrl;
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
/**
* 运行时解析 ardot base URL。优先级：`window.__ardotDevBaseUrl` >
* `import.meta.env.VITE_ARDOT_DEV_BASE_URL` > `ARDOT_BASE_URL`。
*/
function resolveArdotBaseUrl() {
	return readWindowOverride() ?? readEnvOverride() ?? "https://ardot.tencent.com";
}
/**
* 运行时解析 ardot origin —— postMessage 安全校验用。跟随
* `resolveArdotBaseUrl()`；解析失败回退到默认 origin。
*/
function resolveArdotOrigin() {
	try {
		return new URL(resolveArdotBaseUrl()).origin;
	} catch {
		return new URL(ARDOT_BASE_URL).origin;
	}
}
var import_dist, ARDOT_BASE_URL;
var init_constants = __esmMin((() => {
	import_dist = /* @__PURE__ */ __toESM(require_dist());
	ARDOT_BASE_URL = "https://ardot.tencent.com";
	new URL(ARDOT_BASE_URL).origin;
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/embed-host.ts
var DEFAULT_TIMEOUT_MS, ArdotEmbedHost;
var init_embed_host = __esmMin((() => {
	init_constants();
	DEFAULT_TIMEOUT_MS = 3e4;
	ArdotEmbedHost = class {
		constructor(iframe, options) {
			this.requestSeq = 0;
			this.pending = /* @__PURE__ */ new Map();
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.disposed = false;
			this.iframe = iframe;
			this.timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
			this.allowedOrigin = options?.targetOrigin ?? resolveArdotOrigin();
			this.handleMessageBound = this.handleMessage.bind(this);
			window.addEventListener("message", this.handleMessageBound);
		}
		/**
		* 发送 command 并等 response。抛错场景：timeout / iframe 返回 error / dispose
		*
		* `options.timeoutMs` 覆盖实例级超时：SAVE_TOKENS 用短超时靠轮询探测就绪，
		* RESUME_AFTER_AUTH 触发 ardot 端 React 重渲染进 AgentModeApp 才应答，需更宽松的窗口。
		*/
		execute(method, params, options) {
			if (this.disposed) return Promise.reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] execute after dispose: ${method}`));
			const timeoutMs = options?.timeoutMs ?? this.timeoutMs;
			return new Promise((resolve, reject) => {
				const id = ++this.requestSeq;
				const timer = setTimeout(() => {
					if (this.pending.has(id)) {
						this.pending.delete(id);
						reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] request timeout: ${method}`));
					}
				}, timeoutMs);
				this.pending.set(id, {
					resolve,
					reject,
					timer
				});
				const msg = {
					type: "embed:command",
					id,
					method,
					params
				};
				this.iframe.contentWindow?.postMessage(msg, this.allowedOrigin);
			});
		}
		/** 订阅 iframe 侧事件；返回 unsubscribe。 */
		onEvent(event, handler) {
			let handlers = this.eventHandlers.get(event);
			if (!handlers) {
				handlers = /* @__PURE__ */ new Set();
				this.eventHandlers.set(event, handlers);
			}
			handlers.add(handler);
			return () => {
				this.eventHandlers.get(event)?.delete(handler);
			};
		}
		/**
		* host → guest 事件推送（fire-and-forget，无 response）。
		*
		* 与 execute 的区别：execute 走 command/response 应答式；sendEvent 走
		* embed:event 单向广播。cocraft 侧 `EmbedGuestAdapter.handleMessage`
		* 收到 `embed:event` 会分发给对应 event 的所有订阅者，不会返回响应。
		*
		* 用于推送 HOST_CONTEXT_CHANGED 等主题/展示态变化，不用等 iframe 处理完。
		*/
		sendEvent(event, data) {
			if (this.disposed) return;
			const msg = {
				type: "embed:event",
				event,
				data
			};
			this.iframe.contentWindow?.postMessage(msg, this.allowedOrigin);
		}
		dispose() {
			if (this.disposed) return;
			this.disposed = true;
			window.removeEventListener("message", this.handleMessageBound);
			this.pending.forEach(({ reject, timer }) => {
				clearTimeout(timer);
				reject(/* @__PURE__ */ new Error("[ArdotEmbedHost] disposed"));
			});
			this.pending.clear();
			this.eventHandlers.clear();
		}
		handleMessage(event) {
			if (event.source !== this.iframe.contentWindow) return;
			if (event.origin !== this.allowedOrigin) return;
			const data = event.data;
			if (!data || typeof data !== "object" || typeof data.type !== "string") return;
			if (data.type === "embed:response") {
				const pending = this.pending.get(data.id);
				if (!pending) return;
				clearTimeout(pending.timer);
				this.pending.delete(data.id);
				if (data.error) pending.reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] guest error: ${data.error.code} ${data.error.message}`));
				else pending.resolve(data.data);
				return;
			}
			if (data.type === "embed:event") this.eventHandlers.get(data.event)?.forEach((handler) => {
				try {
					handler(data.data);
				} catch (e) {
					console.error("[ArdotEmbedHost] event handler threw", e);
				}
			});
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/index.ts
var init_embed = __esmMin((() => {
	init_constants();
	init_embed_host();
}));
//#endregion
//#region ../../packages/ardot-infra/src/design-feature-override.ts
/**
* 读取当前进程 `globalThis` 上的 override 值。跨端复用同一实现,避免任一端
* 出现『读到 truthy 就放行』或『严格 === true』的语义分裂。
*
* 语义:仅在 override === true(严格布尔)时视为放开;其它值(undefined /
* 字符串 'true' / 1 等)一律视为未设置,保持默认的 EnableArdot 判定。
*/
function hasArdotDesignUngateOverride() {
	try {
		if (typeof globalThis === "undefined") return false;
		return globalThis[ARDOT_DESIGN_UNGATE_GLOBAL_KEY] === true;
	} catch {
		return false;
	}
}
/**
* Ardot 设计入口最终判定。renderer(UI) 与 desktop 主进程(daemon 校验) 共同 owner:
*   - override === true → 直接放行(内部灰度通道,SSOT 仍在 EnableArdot)
*   - 否则严格判断 productFeatures?.EnableArdot === true
*
* 后续新增日志 / 多层灰度 / 到期兜底等分支时,只需要改这一份实现,renderer 与
* daemon 侧自动同步。
*/
function isEnableArdotDesignEnabled(productFeatures) {
	if (hasArdotDesignUngateOverride()) return true;
	return productFeatures?.[ENABLE_ARDOT_DESIGN_FEATURE] === true;
}
var ENABLE_ARDOT_DESIGN_FEATURE, ARDOT_DESIGN_UNGATE_GLOBAL_KEY;
var init_design_feature_override = __esmMin((() => {
	ENABLE_ARDOT_DESIGN_FEATURE = "EnableArdot";
	ARDOT_DESIGN_UNGATE_GLOBAL_KEY = "__ARDOT_DESIGN_UNGATE__";
}));
//#endregion
//#region ../../packages/ardot-infra/src/index.ts
var init_src = __esmMin((() => {
	init_service();
	init_state();
	init_hooks();
	init_types$1();
	init_ui();
	init_embed();
	init_design_feature_override();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/core.js
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
var $ZodAsyncError, $ZodEncodeError, globalConfig;
var init_core$1 = __esmMin((() => {
	Object.freeze({ status: "aborted" });
	$ZodAsyncError = class extends Error {
		constructor() {
			super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
		}
	};
	$ZodEncodeError = class extends Error {
		constructor(name) {
			super(`Encountered unidirectional transform during encode: ${name}`);
			this.name = "ZodEncodeError";
		}
	};
	globalConfig = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepString = step.toString();
	let stepDecCount = (stepString.split(".")[1] || "").length;
	if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
		const match = stepString.match(/\d?e-(\d?)/);
		if (match?.[1]) stepDecCount = Number.parseInt(match[1]);
	}
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	return o;
}
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
var EVALUATING, captureStackTrace, allowsEval, propertyKeyTypes, NUMBER_FORMAT_RANGES;
var init_util = __esmMin((() => {
	EVALUATING = Symbol("evaluating");
	captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
	allowsEval = cached(() => {
		if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
		try {
			new Function("");
			return true;
		} catch (_) {
			return false;
		}
	});
	propertyKeyTypes = /* @__PURE__ */ new Set([
		"string",
		"number",
		"symbol"
	]);
	NUMBER_FORMAT_RANGES = {
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/errors.js
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues });
		else if (issue.code === "invalid_element") processError({ issues: issue.issues });
		else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
		else {
			let curr = fieldErrors;
			let i = 0;
			while (i < issue.path.length) {
				const el = issue.path[i];
				if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
				else {
					curr[el] = curr[el] || { _errors: [] };
					curr[el]._errors.push(mapper(issue));
				}
				curr = curr[el];
				i++;
			}
		}
	};
	processError(error);
	return fieldErrors;
}
var initializer$1, $ZodError, $ZodRealError;
var init_errors$1 = __esmMin((() => {
	init_core$1();
	init_util();
	initializer$1 = (inst, def) => {
		inst.name = "$ZodError";
		Object.defineProperty(inst, "_zod", {
			value: inst._zod,
			enumerable: false
		});
		Object.defineProperty(inst, "issues", {
			value: def,
			enumerable: false
		});
		inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
		Object.defineProperty(inst, "toString", {
			value: () => inst.message,
			enumerable: false
		});
	};
	$ZodError = $constructor("$ZodError", initializer$1);
	$ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/parse.js
var _parse, _parseAsync, _safeParse, safeParse$1, _safeParseAsync, safeParseAsync$1, _encode, _decode, _encodeAsync, _decodeAsync, _safeEncode, _safeDecode, _safeEncodeAsync, _safeDecodeAsync;
var init_parse$1 = __esmMin((() => {
	init_core$1();
	init_errors$1();
	init_util();
	_parse = (_Err) => (schema, value, _ctx, _params) => {
		const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		if (result.issues.length) {
			const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, _params?.callee);
			throw e;
		}
		return result.value;
	};
	_parseAsync = (_Err) => async (schema, value, _ctx, params) => {
		const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		if (result.issues.length) {
			const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, params?.callee);
			throw e;
		}
		return result.value;
	};
	_safeParse = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		return result.issues.length ? {
			success: false,
			error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		} : {
			success: true,
			data: result.value
		};
	};
	safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
	_safeParseAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		return result.issues.length ? {
			success: false,
			error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		} : {
			success: true,
			data: result.value
		};
	};
	safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
	_encode = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
		return _parse(_Err)(schema, value, ctx);
	};
	_decode = (_Err) => (schema, value, _ctx) => {
		return _parse(_Err)(schema, value, _ctx);
	};
	_encodeAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
		return _parseAsync(_Err)(schema, value, ctx);
	};
	_decodeAsync = (_Err) => async (schema, value, _ctx) => {
		return _parseAsync(_Err)(schema, value, _ctx);
	};
	_safeEncode = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
		return _safeParse(_Err)(schema, value, ctx);
	};
	_safeDecode = (_Err) => (schema, value, _ctx) => {
		return _safeParse(_Err)(schema, value, _ctx);
	};
	_safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
		return _safeParseAsync(_Err)(schema, value, ctx);
	};
	_safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
		return _safeParseAsync(_Err)(schema, value, _ctx);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/regexes.js
function emoji() {
	return new RegExp(_emoji$1, "u");
}
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var cuid, cuid2, ulid, xid, ksuid, nanoid, duration$1, guid, uuid, email, _emoji$1, ipv4, ipv6, cidrv4, cidrv6, base64, base64url, e164, dateSource, date$1, string$1, integer, number$1, boolean$1, _null$2, lowercase, uppercase;
var init_regexes = __esmMin((() => {
	cuid = /^[cC][^\s-]{8,}$/;
	cuid2 = /^[0-9a-z]+$/;
	ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
	xid = /^[0-9a-vA-V]{20}$/;
	ksuid = /^[A-Za-z0-9]{27}$/;
	nanoid = /^[a-zA-Z0-9_-]{21}$/;
	duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
	guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
	uuid = (version) => {
		if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
		return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
	};
	email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
	_emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
	ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
	ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
	cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
	cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
	base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
	base64url = /^[A-Za-z0-9_-]*$/;
	e164 = /^\+[1-9]\d{6,14}$/;
	dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
	date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
	string$1 = (params) => {
		const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
		return new RegExp(`^${regex}$`);
	};
	integer = /^-?\d+$/;
	number$1 = /^-?\d+(?:\.\d+)?$/;
	boolean$1 = /^(?:true|false)$/i;
	_null$2 = /^null$/i;
	lowercase = /^[^A-Z]*$/;
	uppercase = /^[^a-z]*$/;
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/checks.js
var $ZodCheck, numericOriginMap, $ZodCheckLessThan, $ZodCheckGreaterThan, $ZodCheckMultipleOf, $ZodCheckNumberFormat, $ZodCheckMaxLength, $ZodCheckMinLength, $ZodCheckLengthEquals, $ZodCheckStringFormat, $ZodCheckRegex, $ZodCheckLowerCase, $ZodCheckUpperCase, $ZodCheckIncludes, $ZodCheckStartsWith, $ZodCheckEndsWith, $ZodCheckOverwrite;
var init_checks$1 = __esmMin((() => {
	init_core$1();
	init_regexes();
	init_util();
	$ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
		var _a;
		inst._zod ?? (inst._zod = {});
		inst._zod.def = def;
		(_a = inst._zod).onattach ?? (_a.onattach = []);
	});
	numericOriginMap = {
		number: "number",
		bigint: "bigint",
		object: "date"
	};
	$ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
		$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			if (def.value < curr) {
				if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			}
		});
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
			payload.issues.push({
				origin,
				code: "too_big",
				maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
		$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			if (def.value > curr) {
				if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			}
		});
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
			payload.issues.push({
				origin,
				code: "too_small",
				minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
		$ZodCheck.init(inst, def);
		inst._zod.onattach.push((inst) => {
			var _a;
			(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
		});
		inst._zod.check = (payload) => {
			if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
			if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
			payload.issues.push({
				origin: typeof payload.value,
				code: "not_multiple_of",
				divisor: def.value,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
		$ZodCheck.init(inst, def);
		def.format = def.format || "float64";
		const isInt = def.format?.includes("int");
		const origin = isInt ? "int" : "number";
		const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.format = def.format;
			bag.minimum = minimum;
			bag.maximum = maximum;
			if (isInt) bag.pattern = integer;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (isInt) {
				if (!Number.isInteger(input)) {
					payload.issues.push({
						expected: origin,
						format: def.format,
						code: "invalid_type",
						continue: false,
						input,
						inst
					});
					return;
				}
				if (!Number.isSafeInteger(input)) {
					if (input > 0) payload.issues.push({
						input,
						code: "too_big",
						maximum: Number.MAX_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					else payload.issues.push({
						input,
						code: "too_small",
						minimum: Number.MIN_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					return;
				}
			}
			if (input < minimum) payload.issues.push({
				origin: "number",
				input,
				code: "too_small",
				minimum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
			if (input > maximum) payload.issues.push({
				origin: "number",
				input,
				code: "too_big",
				maximum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
			if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.length <= def.maximum) return;
			const origin = getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_big",
				maximum: def.maximum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
			if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.length >= def.minimum) return;
			const origin = getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_small",
				minimum: def.minimum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
		var _a;
		$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.minimum = def.length;
			bag.maximum = def.length;
			bag.length = def.length;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			const length = input.length;
			if (length === def.length) return;
			const origin = getLengthableOrigin(input);
			const tooBig = length > def.length;
			payload.issues.push({
				origin,
				...tooBig ? {
					code: "too_big",
					maximum: def.length
				} : {
					code: "too_small",
					minimum: def.length
				},
				inclusive: true,
				exact: true,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
		var _a, _b;
		$ZodCheck.init(inst, def);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.format = def.format;
			if (def.pattern) {
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(def.pattern);
			}
		});
		if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: def.format,
				input: payload.value,
				...def.pattern ? { pattern: def.pattern.toString() } : {},
				inst,
				continue: !def.abort
			});
		});
		else (_b = inst._zod).check ?? (_b.check = () => {});
	});
	$ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
		$ZodCheckStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: payload.value,
				pattern: def.pattern.toString(),
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
		def.pattern ?? (def.pattern = lowercase);
		$ZodCheckStringFormat.init(inst, def);
	});
	$ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
		def.pattern ?? (def.pattern = uppercase);
		$ZodCheckStringFormat.init(inst, def);
	});
	$ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
		$ZodCheck.init(inst, def);
		const escapedRegex = escapeRegex(def.includes);
		const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
		def.pattern = pattern;
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.includes(def.includes, def.position)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: def.includes,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
		$ZodCheck.init(inst, def);
		const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.startsWith(def.prefix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: def.prefix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
		$ZodCheck.init(inst, def);
		const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.endsWith(def.suffix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: def.suffix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
		$ZodCheck.init(inst, def);
		inst._zod.check = (payload) => {
			payload.value = def.tx(payload.value);
		};
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/doc.js
var Doc;
var init_doc = __esmMin((() => {
	Doc = class {
		constructor(args = []) {
			this.content = [];
			this.indent = 0;
			if (this) this.args = args;
		}
		indented(fn) {
			this.indent += 1;
			fn(this);
			this.indent -= 1;
		}
		write(arg) {
			if (typeof arg === "function") {
				arg(this, { execution: "sync" });
				arg(this, { execution: "async" });
				return;
			}
			const lines = arg.split("\n").filter((x) => x);
			const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
			const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
			for (const line of dedented) this.content.push(line);
		}
		compile() {
			const F = Function;
			const args = this?.args;
			const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
			return new F(...args, lines.join("\n"));
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/versions.js
var version;
var init_versions = __esmMin((() => {
	version = {
		major: 4,
		minor: 3,
		patch: 6
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/schemas.js
function isValidBase64(data) {
	if (data === "") return true;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
function handlePropertyResult(result, final, key, input, isOptionalOut) {
	if (result.issues.length) {
		if (isOptionalOut && !(key in input)) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (result.value === void 0) {
		if (key in input) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
function handleOptionalResult(result, input) {
	if (result.issues.length && input === void 0) return {
		issues: [],
		value: void 0
	};
	return result;
}
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
var $ZodType, $ZodString, $ZodStringFormat, $ZodGUID, $ZodUUID, $ZodEmail, $ZodURL, $ZodEmoji, $ZodNanoID, $ZodCUID, $ZodCUID2, $ZodULID, $ZodXID, $ZodKSUID, $ZodISODateTime, $ZodISODate, $ZodISOTime, $ZodISODuration, $ZodIPv4, $ZodIPv6, $ZodCIDRv4, $ZodCIDRv6, $ZodBase64, $ZodBase64URL, $ZodE164, $ZodJWT, $ZodNumber, $ZodNumberFormat, $ZodBoolean, $ZodNull, $ZodUnknown, $ZodNever, $ZodArray, $ZodObject, $ZodObjectJIT, $ZodUnion, $ZodDiscriminatedUnion, $ZodIntersection, $ZodRecord, $ZodEnum, $ZodLiteral, $ZodTransform, $ZodOptional, $ZodExactOptional, $ZodNullable, $ZodDefault, $ZodPrefault, $ZodNonOptional, $ZodCatch, $ZodPipe, $ZodReadonly, $ZodCustom;
var init_schemas$1 = __esmMin((() => {
	init_checks$1();
	init_core$1();
	init_doc();
	init_parse$1();
	init_regexes();
	init_util();
	init_versions();
	$ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
		var _a;
		inst ?? (inst = {});
		inst._zod.def = def;
		inst._zod.bag = inst._zod.bag || {};
		inst._zod.version = version;
		const checks = [...inst._zod.def.checks ?? []];
		if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
		for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
		if (checks.length === 0) {
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			inst._zod.deferred?.push(() => {
				inst._zod.run = inst._zod.parse;
			});
		} else {
			const runChecks = (payload, checks, ctx) => {
				let isAborted = aborted(payload);
				let asyncResult;
				for (const ch of checks) {
					if (ch._zod.def.when) {
						if (!ch._zod.def.when(payload)) continue;
					} else if (isAborted) continue;
					const currLen = payload.issues.length;
					const _ = ch._zod.check(payload);
					if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
					if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
						await _;
						if (payload.issues.length === currLen) return;
						if (!isAborted) isAborted = aborted(payload, currLen);
					});
					else {
						if (payload.issues.length === currLen) continue;
						if (!isAborted) isAborted = aborted(payload, currLen);
					}
				}
				if (asyncResult) return asyncResult.then(() => {
					return payload;
				});
				return payload;
			};
			const handleCanaryResult = (canary, payload, ctx) => {
				if (aborted(canary)) {
					canary.aborted = true;
					return canary;
				}
				const checkResult = runChecks(payload, checks, ctx);
				if (checkResult instanceof Promise) {
					if (ctx.async === false) throw new $ZodAsyncError();
					return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
				}
				return inst._zod.parse(checkResult, ctx);
			};
			inst._zod.run = (payload, ctx) => {
				if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
				if (ctx.direction === "backward") {
					const canary = inst._zod.parse({
						value: payload.value,
						issues: []
					}, {
						...ctx,
						skipChecks: true
					});
					if (canary instanceof Promise) return canary.then((canary) => {
						return handleCanaryResult(canary, payload, ctx);
					});
					return handleCanaryResult(canary, payload, ctx);
				}
				const result = inst._zod.parse(payload, ctx);
				if (result instanceof Promise) {
					if (ctx.async === false) throw new $ZodAsyncError();
					return result.then((result) => runChecks(result, checks, ctx));
				}
				return runChecks(result, checks, ctx);
			};
		}
		defineLazy(inst, "~standard", () => ({
			validate: (value) => {
				try {
					const r = safeParse$1(inst, value);
					return r.success ? { value: r.data } : { issues: r.error?.issues };
				} catch (_) {
					return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
				}
			},
			vendor: "zod",
			version: 1
		}));
	});
	$ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
		inst._zod.parse = (payload, _) => {
			if (def.coerce) try {
				payload.value = String(payload.value);
			} catch (_) {}
			if (typeof payload.value === "string") return payload;
			payload.issues.push({
				expected: "string",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	$ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
		$ZodCheckStringFormat.init(inst, def);
		$ZodString.init(inst, def);
	});
	$ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
		def.pattern ?? (def.pattern = guid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
		if (def.version) {
			const v = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[def.version];
			if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
			def.pattern ?? (def.pattern = uuid(v));
		} else def.pattern ?? (def.pattern = uuid());
		$ZodStringFormat.init(inst, def);
	});
	$ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
		def.pattern ?? (def.pattern = email);
		$ZodStringFormat.init(inst, def);
	});
	$ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			try {
				const trimmed = payload.value.trim();
				const url = new URL(trimmed);
				if (def.hostname) {
					def.hostname.lastIndex = 0;
					if (!def.hostname.test(url.hostname)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid hostname",
						pattern: def.hostname.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
				if (def.protocol) {
					def.protocol.lastIndex = 0;
					if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid protocol",
						pattern: def.protocol.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
				if (def.normalize) payload.value = url.href;
				else payload.value = trimmed;
				return;
			} catch (_) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	$ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
		def.pattern ?? (def.pattern = emoji());
		$ZodStringFormat.init(inst, def);
	});
	$ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
		def.pattern ?? (def.pattern = nanoid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
		def.pattern ?? (def.pattern = cuid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
		def.pattern ?? (def.pattern = cuid2);
		$ZodStringFormat.init(inst, def);
	});
	$ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
		def.pattern ?? (def.pattern = ulid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
		def.pattern ?? (def.pattern = xid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
		def.pattern ?? (def.pattern = ksuid);
		$ZodStringFormat.init(inst, def);
	});
	$ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
		def.pattern ?? (def.pattern = datetime$1(def));
		$ZodStringFormat.init(inst, def);
	});
	$ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
		def.pattern ?? (def.pattern = date$1);
		$ZodStringFormat.init(inst, def);
	});
	$ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
		def.pattern ?? (def.pattern = time$1(def));
		$ZodStringFormat.init(inst, def);
	});
	$ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
		def.pattern ?? (def.pattern = duration$1);
		$ZodStringFormat.init(inst, def);
	});
	$ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
		def.pattern ?? (def.pattern = ipv4);
		$ZodStringFormat.init(inst, def);
		inst._zod.bag.format = `ipv4`;
	});
	$ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
		def.pattern ?? (def.pattern = ipv6);
		$ZodStringFormat.init(inst, def);
		inst._zod.bag.format = `ipv6`;
		inst._zod.check = (payload) => {
			try {
				new URL(`http://[${payload.value}]`);
			} catch {
				payload.issues.push({
					code: "invalid_format",
					format: "ipv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	$ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
		def.pattern ?? (def.pattern = cidrv4);
		$ZodStringFormat.init(inst, def);
	});
	$ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
		def.pattern ?? (def.pattern = cidrv6);
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			const parts = payload.value.split("/");
			try {
				if (parts.length !== 2) throw new Error();
				const [address, prefix] = parts;
				if (!prefix) throw new Error();
				const prefixNum = Number(prefix);
				if (`${prefixNum}` !== prefix) throw new Error();
				if (prefixNum < 0 || prefixNum > 128) throw new Error();
				new URL(`http://[${address}]`);
			} catch {
				payload.issues.push({
					code: "invalid_format",
					format: "cidrv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	$ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
		def.pattern ?? (def.pattern = base64);
		$ZodStringFormat.init(inst, def);
		inst._zod.bag.contentEncoding = "base64";
		inst._zod.check = (payload) => {
			if (isValidBase64(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
		def.pattern ?? (def.pattern = base64url);
		$ZodStringFormat.init(inst, def);
		inst._zod.bag.contentEncoding = "base64url";
		inst._zod.check = (payload) => {
			if (isValidBase64URL(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
		def.pattern ?? (def.pattern = e164);
		$ZodStringFormat.init(inst, def);
	});
	$ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (isValidJWT(payload.value, def.alg)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	$ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Number(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
			const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
			payload.issues.push({
				expected: "number",
				code: "invalid_type",
				input,
				inst,
				...received ? { received } : {}
			});
			return payload;
		};
	});
	$ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
		$ZodCheckNumberFormat.init(inst, def);
		$ZodNumber.init(inst, def);
	});
	$ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = boolean$1;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Boolean(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "boolean") return payload;
			payload.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	$ZodNull = /*@__PURE__*/ $constructor("$ZodNull", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.pattern = _null$2;
		inst._zod.values = /* @__PURE__ */ new Set([null]);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (input === null) return payload;
			payload.issues.push({
				expected: "null",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	$ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload) => payload;
	});
	$ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			payload.issues.push({
				expected: "never",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	$ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!Array.isArray(input)) {
				payload.issues.push({
					expected: "array",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = Array(input.length);
			const proms = [];
			for (let i = 0; i < input.length; i++) {
				const item = input[i];
				const result = def.element._zod.run({
					value: item,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
				else handleArrayResult(result, payload, i);
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	$ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
		$ZodType.init(inst, def);
		if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
			const sh = def.shape;
			Object.defineProperty(def, "shape", { get: () => {
				const newSh = { ...sh };
				Object.defineProperty(def, "shape", { value: newSh });
				return newSh;
			} });
		}
		const _normalized = cached(() => normalizeDef(def));
		defineLazy(inst._zod, "propValues", () => {
			const shape = def.shape;
			const propValues = {};
			for (const key in shape) {
				const field = shape[key]._zod;
				if (field.values) {
					propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
					for (const v of field.values) propValues[key].add(v);
				}
			}
			return propValues;
		});
		const isObject$2 = isObject;
		const catchall = def.catchall;
		let value;
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject$2(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = {};
			const proms = [];
			const shape = value.shape;
			for (const key of value.keys) {
				const el = shape[key];
				const isOptionalOut = el._zod.optout === "optional";
				const r = el._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalOut);
			}
			if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
			return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
		};
	});
	$ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
		$ZodObject.init(inst, def);
		const superParse = inst._zod.parse;
		const _normalized = cached(() => normalizeDef(def));
		const generateFastpass = (shape) => {
			const doc = new Doc([
				"shape",
				"payload",
				"ctx"
			]);
			const normalized = _normalized.value;
			const parseStr = (key) => {
				const k = esc(key);
				return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
			};
			doc.write(`const input = payload.value;`);
			const ids = Object.create(null);
			let counter = 0;
			for (const key of normalized.keys) ids[key] = `key_${counter++}`;
			doc.write(`const newResult = {};`);
			for (const key of normalized.keys) {
				const id = ids[key];
				const k = esc(key);
				const isOptionalOut = shape[key]?._zod?.optout === "optional";
				doc.write(`const ${id} = ${parseStr(key)};`);
				if (isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			}
			doc.write(`payload.value = newResult;`);
			doc.write(`return payload;`);
			const fn = doc.compile();
			return (payload, ctx) => fn(shape, payload, ctx);
		};
		let fastpass;
		const isObject$1 = isObject;
		const jit = !globalConfig.jitless;
		const fastEnabled = jit && allowsEval.value;
		const catchall = def.catchall;
		let value;
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject$1(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
				if (!fastpass) fastpass = generateFastpass(def.shape);
				payload = fastpass(payload, ctx);
				if (!catchall) return payload;
				return handleCatchall([], input, payload, ctx, value, inst);
			}
			return superParse(payload, ctx);
		};
	});
	$ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
		defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
		defineLazy(inst._zod, "values", () => {
			if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
		});
		defineLazy(inst._zod, "pattern", () => {
			if (def.options.every((o) => o._zod.pattern)) {
				const patterns = def.options.map((o) => o._zod.pattern);
				return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
			}
		});
		const single = def.options.length === 1;
		const first = def.options[0]._zod.run;
		inst._zod.parse = (payload, ctx) => {
			if (single) return first(payload, ctx);
			let async = false;
			const results = [];
			for (const option of def.options) {
				const result = option._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) {
					results.push(result);
					async = true;
				} else {
					if (result.issues.length === 0) return result;
					results.push(result);
				}
			}
			if (!async) return handleUnionResults(results, payload, inst, ctx);
			return Promise.all(results).then((results) => {
				return handleUnionResults(results, payload, inst, ctx);
			});
		};
	});
	$ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
		def.inclusive = false;
		$ZodUnion.init(inst, def);
		const _super = inst._zod.parse;
		defineLazy(inst._zod, "propValues", () => {
			const propValues = {};
			for (const option of def.options) {
				const pv = option._zod.propValues;
				if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
				for (const [k, v] of Object.entries(pv)) {
					if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
					for (const val of v) propValues[k].add(val);
				}
			}
			return propValues;
		});
		const disc = cached(() => {
			const opts = def.options;
			const map = /* @__PURE__ */ new Map();
			for (const o of opts) {
				const values = o._zod.propValues?.[def.discriminator];
				if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
				for (const v of values) {
					if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
					map.set(v, o);
				}
			}
			return map;
		});
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!isObject(input)) {
				payload.issues.push({
					code: "invalid_type",
					expected: "object",
					input,
					inst
				});
				return payload;
			}
			const opt = disc.value.get(input?.[def.discriminator]);
			if (opt) return opt._zod.run(payload, ctx);
			if (def.unionFallback) return _super(payload, ctx);
			payload.issues.push({
				code: "invalid_union",
				errors: [],
				note: "No matching discriminator",
				discriminator: def.discriminator,
				input,
				path: [def.discriminator],
				inst
			});
			return payload;
		};
	});
	$ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			const left = def.left._zod.run({
				value: input,
				issues: []
			}, ctx);
			const right = def.right._zod.run({
				value: input,
				issues: []
			}, ctx);
			if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
				return handleIntersectionResults(payload, left, right);
			});
			return handleIntersectionResults(payload, left, right);
		};
	});
	$ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!isPlainObject(input)) {
				payload.issues.push({
					expected: "record",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			const proms = [];
			const values = def.keyType._zod.values;
			if (values) {
				payload.value = {};
				const recordKeys = /* @__PURE__ */ new Set();
				for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
					recordKeys.add(typeof key === "number" ? key.toString() : key);
					const result = def.valueType._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => {
						if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
						payload.value[key] = result.value;
					}));
					else {
						if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
						payload.value[key] = result.value;
					}
				}
				let unrecognized;
				for (const key in input) if (!recordKeys.has(key)) {
					unrecognized = unrecognized ?? [];
					unrecognized.push(key);
				}
				if (unrecognized && unrecognized.length > 0) payload.issues.push({
					code: "unrecognized_keys",
					input,
					inst,
					keys: unrecognized
				});
			} else {
				payload.value = {};
				for (const key of Reflect.ownKeys(input)) {
					if (key === "__proto__") continue;
					let keyResult = def.keyType._zod.run({
						value: key,
						issues: []
					}, ctx);
					if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
						const retryResult = def.keyType._zod.run({
							value: Number(key),
							issues: []
						}, ctx);
						if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (retryResult.issues.length === 0) keyResult = retryResult;
					}
					if (keyResult.issues.length) {
						if (def.mode === "loose") payload.value[key] = input[key];
						else payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
							input: key,
							path: [key],
							inst
						});
						continue;
					}
					const result = def.valueType._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => {
						if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
						payload.value[keyResult.value] = result.value;
					}));
					else {
						if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
						payload.value[keyResult.value] = result.value;
					}
				}
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	$ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
		$ZodType.init(inst, def);
		const values = getEnumValues(def.entries);
		const valuesSet = new Set(values);
		inst._zod.values = valuesSet;
		inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (valuesSet.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values,
				input,
				inst
			});
			return payload;
		};
	});
	$ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
		$ZodType.init(inst, def);
		if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
		const values = new Set(def.values);
		inst._zod.values = values;
		inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (values.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values: def.values,
				input,
				inst
			});
			return payload;
		};
	});
	$ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
			const _out = def.transform(payload.value, payload);
			if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
				payload.value = output;
				return payload;
			});
			if (_out instanceof Promise) throw new $ZodAsyncError();
			payload.value = _out;
			return payload;
		};
	});
	$ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		inst._zod.optout = "optional";
		defineLazy(inst._zod, "values", () => {
			return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
		});
		defineLazy(inst._zod, "pattern", () => {
			const pattern = def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (def.innerType._zod.optin === "optional") {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, payload.value));
				return handleOptionalResult(result, payload.value);
			}
			if (payload.value === void 0) return payload;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	$ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
		$ZodOptional.init(inst, def);
		defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
		inst._zod.parse = (payload, ctx) => {
			return def.innerType._zod.run(payload, ctx);
		};
	});
	$ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
		defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		defineLazy(inst._zod, "pattern", () => {
			const pattern = def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
		});
		defineLazy(inst._zod, "values", () => {
			return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (payload.value === null) return payload;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	$ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) {
				payload.value = def.defaultValue;
				/**
				* $ZodDefault returns the default value immediately in forward direction.
				* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
				return payload;
			}
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
			return handleDefaultResult(result, def);
		};
	});
	$ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
		$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) payload.value = def.defaultValue;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	$ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "values", () => {
			const v = def.innerType._zod.values;
			return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
			return handleNonOptionalResult(result, inst);
		};
	});
	$ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
		defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => {
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
				}
				return payload;
			});
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
			}
			return payload;
		};
	});
	$ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "values", () => def.in._zod.values);
		defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") {
				const right = def.out._zod.run(payload, ctx);
				if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
				return handlePipeResult(right, def.in, ctx);
			}
			const left = def.in._zod.run(payload, ctx);
			if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
			return handlePipeResult(left, def.out, ctx);
		};
	});
	$ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
		$ZodType.init(inst, def);
		defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
		defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
		defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then(handleReadonlyResult);
			return handleReadonlyResult(result);
		};
	});
	$ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
		$ZodCheck.init(inst, def);
		$ZodType.init(inst, def);
		inst._zod.parse = (payload, _) => {
			return payload;
		};
		inst._zod.check = (payload) => {
			const input = payload.value;
			const r = def.fn(input);
			if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
			handleRefineResult(r, payload, input, inst);
		};
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/registries.js
function registry() {
	return new $ZodRegistry();
}
var _a, $ZodRegistry, globalRegistry;
var init_registries = __esmMin((() => {
	$ZodRegistry = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
		}
		add(schema, ..._meta) {
			const meta = _meta[0];
			this._map.set(schema, meta);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
			return this;
		}
		clear() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
			return this;
		}
		remove(schema) {
			const meta = this._map.get(schema);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
			this._map.delete(schema);
			return this;
		}
		get(schema) {
			const p = schema._zod.parent;
			if (p) {
				const pm = { ...this.get(p) ?? {} };
				delete pm.id;
				const f = {
					...pm,
					...this._map.get(schema)
				};
				return Object.keys(f).length ? f : void 0;
			}
			return this._map.get(schema);
		}
		has(schema) {
			return this._map.has(schema);
		}
	};
	(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
	globalRegistry = globalThis.__zod_globalRegistry;
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _null$1(Class, params) {
	return new Class({
		type: "null",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	});
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
var init_api = __esmMin((() => {
	init_checks$1();
	init_util();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && result.schema._prefault) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) defs[seen.defId] = seen.def;
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) {
		if (ctx.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
	}
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
var createToJSONSchemaMethod, createStandardJSONSchemaMethod;
var init_to_json_schema = __esmMin((() => {
	init_registries();
	createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
		const ctx = initializeContext({
			...params,
			processors
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
	createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
		const { libraryOptions, target } = params ?? {};
		const ctx = initializeContext({
			...libraryOptions ?? {},
			target,
			io,
			processors
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/json-schema-processors.js
var formatMap, stringProcessor, numberProcessor, booleanProcessor, nullProcessor, neverProcessor, unknownProcessor, enumProcessor, literalProcessor, customProcessor, transformProcessor, arrayProcessor, objectProcessor, unionProcessor, intersectionProcessor, recordProcessor, nullableProcessor, nonoptionalProcessor, defaultProcessor, prefaultProcessor, catchProcessor, pipeProcessor, readonlyProcessor, optionalProcessor;
var init_json_schema_processors = __esmMin((() => {
	init_to_json_schema();
	init_util();
	formatMap = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	};
	stringProcessor = (schema, ctx, _json, _params) => {
		const json = _json;
		json.type = "string";
		const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
		if (typeof minimum === "number") json.minLength = minimum;
		if (typeof maximum === "number") json.maxLength = maximum;
		if (format) {
			json.format = formatMap[format] ?? format;
			if (json.format === "") delete json.format;
			if (format === "time") delete json.format;
		}
		if (contentEncoding) json.contentEncoding = contentEncoding;
		if (patterns && patterns.size > 0) {
			const regexes = [...patterns];
			if (regexes.length === 1) json.pattern = regexes[0].source;
			else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
				...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: regex.source
			}))];
		}
	};
	numberProcessor = (schema, ctx, _json, _params) => {
		const json = _json;
		const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
		if (typeof format === "string" && format.includes("int")) json.type = "integer";
		else json.type = "number";
		if (typeof exclusiveMinimum === "number") {
			if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
		}
		if (typeof minimum === "number") {
			json.minimum = minimum;
			if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
				if (exclusiveMinimum >= minimum) delete json.minimum;
				else delete json.exclusiveMinimum;
			}
		}
		if (typeof exclusiveMaximum === "number") {
			if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
		}
		if (typeof maximum === "number") {
			json.maximum = maximum;
			if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
				if (exclusiveMaximum <= maximum) delete json.maximum;
				else delete json.exclusiveMaximum;
			}
		}
		if (typeof multipleOf === "number") json.multipleOf = multipleOf;
	};
	booleanProcessor = (_schema, _ctx, json, _params) => {
		json.type = "boolean";
	};
	nullProcessor = (_schema, ctx, json, _params) => {
		if (ctx.target === "openapi-3.0") {
			json.type = "string";
			json.nullable = true;
			json.enum = [null];
		} else json.type = "null";
	};
	neverProcessor = (_schema, _ctx, json, _params) => {
		json.not = {};
	};
	unknownProcessor = (_schema, _ctx, _json, _params) => {};
	enumProcessor = (schema, _ctx, json, _params) => {
		const def = schema._zod.def;
		const values = getEnumValues(def.entries);
		if (values.every((v) => typeof v === "number")) json.type = "number";
		if (values.every((v) => typeof v === "string")) json.type = "string";
		json.enum = values;
	};
	literalProcessor = (schema, ctx, json, _params) => {
		const def = schema._zod.def;
		const vals = [];
		for (const val of def.values) if (val === void 0) {
			if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
		} else if (typeof val === "bigint") {
			if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
		} else vals.push(val);
		if (vals.length === 0) {} else if (vals.length === 1) {
			const val = vals[0];
			json.type = val === null ? "null" : typeof val;
			if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
			else json.const = val;
		} else {
			if (vals.every((v) => typeof v === "number")) json.type = "number";
			if (vals.every((v) => typeof v === "string")) json.type = "string";
			if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
			if (vals.every((v) => v === null)) json.type = "null";
			json.enum = vals;
		}
	};
	customProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	};
	transformProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	};
	arrayProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		const { minimum, maximum } = schema._zod.bag;
		if (typeof minimum === "number") json.minItems = minimum;
		if (typeof maximum === "number") json.maxItems = maximum;
		json.type = "array";
		json.items = process(def.element, ctx, {
			...params,
			path: [...params.path, "items"]
		});
	};
	objectProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		json.type = "object";
		json.properties = {};
		const shape = def.shape;
		for (const key in shape) json.properties[key] = process(shape[key], ctx, {
			...params,
			path: [
				...params.path,
				"properties",
				key
			]
		});
		const allKeys = new Set(Object.keys(shape));
		const requiredKeys = new Set([...allKeys].filter((key) => {
			const v = def.shape[key]._zod;
			if (ctx.io === "input") return v.optin === void 0;
			else return v.optout === void 0;
		}));
		if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
		if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
		else if (!def.catchall) {
			if (ctx.io === "output") json.additionalProperties = false;
		} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	};
	unionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const isExclusive = def.inclusive === false;
		const options = def.options.map((x, i) => process(x, ctx, {
			...params,
			path: [
				...params.path,
				isExclusive ? "oneOf" : "anyOf",
				i
			]
		}));
		if (isExclusive) json.oneOf = options;
		else json.anyOf = options;
	};
	intersectionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const a = process(def.left, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				0
			]
		});
		const b = process(def.right, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				1
			]
		});
		const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
		json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
	};
	recordProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		json.type = "object";
		const keyType = def.keyType;
		const patterns = keyType._zod.bag?.patterns;
		if (def.mode === "loose" && patterns && patterns.size > 0) {
			const valueSchema = process(def.valueType, ctx, {
				...params,
				path: [
					...params.path,
					"patternProperties",
					"*"
				]
			});
			json.patternProperties = {};
			for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
		} else {
			if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
				...params,
				path: [...params.path, "propertyNames"]
			});
			json.additionalProperties = process(def.valueType, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		}
		const keyValues = keyType._zod.values;
		if (keyValues) {
			const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
			if (validKeyValues.length > 0) json.required = validKeyValues;
		}
	};
	nullableProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const inner = process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		if (ctx.target === "openapi-3.0") {
			seen.ref = def.innerType;
			json.nullable = true;
		} else json.anyOf = [inner, { type: "null" }];
	};
	nonoptionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	defaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		json.default = JSON.parse(JSON.stringify(def.defaultValue));
	};
	prefaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
	};
	catchProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		let catchValue;
		try {
			catchValue = def.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		json.default = catchValue;
	};
	pipeProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
		process(innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = innerType;
	};
	readonlyProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		json.readOnly = true;
	};
	optionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		process(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/index.js
var init_core = __esmMin((() => {
	init_core$1();
	init_parse$1();
	init_errors$1();
	init_schemas$1();
	init_checks$1();
	init_versions();
	init_util();
	init_regexes();
	init_registries();
	init_doc();
	init_api();
	init_to_json_schema();
	init_json_schema_processors();
	init_to_json_schema();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/checks.js
var init_checks = __esmMin((() => {
	init_core();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/iso.js
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
var ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration;
var init_iso = __esmMin((() => {
	init_core();
	init_schemas();
	ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
		$ZodISODateTime.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
		$ZodISODate.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
		$ZodISOTime.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
		$ZodISODuration.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
})), initializer, ZodRealError;
var init_errors = __esmMin((() => {
	init_core();
	init_util();
	initializer = (inst, issues) => {
		$ZodError.init(inst, issues);
		inst.name = "ZodError";
		Object.defineProperties(inst, {
			format: { value: (mapper) => formatError(inst, mapper) },
			flatten: { value: (mapper) => flattenError(inst, mapper) },
			addIssue: { value: (issue) => {
				inst.issues.push(issue);
				inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
			} },
			addIssues: { value: (issues) => {
				inst.issues.push(...issues);
				inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
			} },
			isEmpty: { get() {
				return inst.issues.length === 0;
			} }
		});
	};
	$constructor("ZodError", initializer);
	ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/parse.js
var parse, parseAsync, safeParse, safeParseAsync, encode, decode, encodeAsync, decodeAsync, safeEncode, safeDecode, safeEncodeAsync, safeDecodeAsync;
var init_parse = __esmMin((() => {
	init_core();
	init_errors();
	parse = /* @__PURE__ */ _parse(ZodRealError);
	parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
	safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
	safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
	encode = /* @__PURE__ */ _encode(ZodRealError);
	decode = /* @__PURE__ */ _decode(ZodRealError);
	encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
	decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
	safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
	safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
	safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
	safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/schemas.js
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
function _null(params) {
	return /* @__PURE__ */ _null$1(ZodNull, params);
}
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
function object(shape, params) {
	const def = {
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	};
	return new ZodObject(def);
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: unknown(),
		...normalizeParams(params)
	});
}
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
function record(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function _enum(values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
function custom(fn, _params) {
	return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
	return /* @__PURE__ */ _superRefine(fn);
}
function preprocess(fn, schema) {
	return pipe(transform(fn), schema);
}
var ZodType, _ZodString, ZodString, ZodStringFormat, ZodEmail, ZodGUID, ZodUUID, ZodURL, ZodEmoji, ZodNanoID, ZodCUID, ZodCUID2, ZodULID, ZodXID, ZodKSUID, ZodIPv4, ZodIPv6, ZodCIDRv4, ZodCIDRv6, ZodBase64, ZodBase64URL, ZodE164, ZodJWT, ZodNumber, ZodNumberFormat, ZodBoolean, ZodNull, ZodUnknown, ZodNever, ZodArray, ZodObject, ZodUnion, ZodDiscriminatedUnion, ZodIntersection, ZodRecord, ZodEnum, ZodLiteral, ZodTransform, ZodOptional, ZodExactOptional, ZodNullable, ZodDefault, ZodPrefault, ZodNonOptional, ZodCatch, ZodPipe, ZodReadonly, ZodCustom;
var init_schemas = __esmMin((() => {
	init_core();
	init_json_schema_processors();
	init_to_json_schema();
	init_checks();
	init_iso();
	init_parse();
	ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
		$ZodType.init(inst, def);
		Object.assign(inst["~standard"], { jsonSchema: {
			input: createStandardJSONSchemaMethod(inst, "input"),
			output: createStandardJSONSchemaMethod(inst, "output")
		} });
		inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
		inst.def = def;
		inst.type = def.type;
		Object.defineProperty(inst, "_def", { value: def });
		inst.check = (...checks) => {
			return inst.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		};
		inst.with = inst.check;
		inst.clone = (def, params) => clone(inst, def, params);
		inst.brand = () => inst;
		inst.register = ((reg, meta) => {
			reg.add(inst, meta);
			return inst;
		});
		inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
		inst.safeParse = (data, params) => safeParse(inst, data, params);
		inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
		inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
		inst.spa = inst.safeParseAsync;
		inst.encode = (data, params) => encode(inst, data, params);
		inst.decode = (data, params) => decode(inst, data, params);
		inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
		inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
		inst.safeEncode = (data, params) => safeEncode(inst, data, params);
		inst.safeDecode = (data, params) => safeDecode(inst, data, params);
		inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
		inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
		inst.refine = (check, params) => inst.check(refine(check, params));
		inst.superRefine = (refinement) => inst.check(superRefine(refinement));
		inst.overwrite = (fn) => inst.check(/* @__PURE__ */ _overwrite(fn));
		inst.optional = () => optional(inst);
		inst.exactOptional = () => exactOptional(inst);
		inst.nullable = () => nullable(inst);
		inst.nullish = () => optional(nullable(inst));
		inst.nonoptional = (params) => nonoptional(inst, params);
		inst.array = () => array(inst);
		inst.or = (arg) => union([inst, arg]);
		inst.and = (arg) => intersection(inst, arg);
		inst.transform = (tx) => pipe(inst, transform(tx));
		inst.default = (def) => _default(inst, def);
		inst.prefault = (def) => prefault(inst, def);
		inst.catch = (params) => _catch(inst, params);
		inst.pipe = (target) => pipe(inst, target);
		inst.readonly = () => readonly(inst);
		inst.describe = (description) => {
			const cl = inst.clone();
			globalRegistry.add(cl, { description });
			return cl;
		};
		Object.defineProperty(inst, "description", {
			get() {
				return globalRegistry.get(inst)?.description;
			},
			configurable: true
		});
		inst.meta = (...args) => {
			if (args.length === 0) return globalRegistry.get(inst);
			const cl = inst.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		};
		inst.isOptional = () => inst.safeParse(void 0).success;
		inst.isNullable = () => inst.safeParse(null).success;
		inst.apply = (fn) => fn(inst);
		return inst;
	});
	_ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
		$ZodString.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
		const bag = inst._zod.bag;
		inst.format = bag.format ?? null;
		inst.minLength = bag.minimum ?? null;
		inst.maxLength = bag.maximum ?? null;
		inst.regex = (...args) => inst.check(/* @__PURE__ */ _regex(...args));
		inst.includes = (...args) => inst.check(/* @__PURE__ */ _includes(...args));
		inst.startsWith = (...args) => inst.check(/* @__PURE__ */ _startsWith(...args));
		inst.endsWith = (...args) => inst.check(/* @__PURE__ */ _endsWith(...args));
		inst.min = (...args) => inst.check(/* @__PURE__ */ _minLength(...args));
		inst.max = (...args) => inst.check(/* @__PURE__ */ _maxLength(...args));
		inst.length = (...args) => inst.check(/* @__PURE__ */ _length(...args));
		inst.nonempty = (...args) => inst.check(/* @__PURE__ */ _minLength(1, ...args));
		inst.lowercase = (params) => inst.check(/* @__PURE__ */ _lowercase(params));
		inst.uppercase = (params) => inst.check(/* @__PURE__ */ _uppercase(params));
		inst.trim = () => inst.check(/* @__PURE__ */ _trim());
		inst.normalize = (...args) => inst.check(/* @__PURE__ */ _normalize(...args));
		inst.toLowerCase = () => inst.check(/* @__PURE__ */ _toLowerCase());
		inst.toUpperCase = () => inst.check(/* @__PURE__ */ _toUpperCase());
		inst.slugify = () => inst.check(/* @__PURE__ */ _slugify());
	});
	ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
		$ZodString.init(inst, def);
		_ZodString.init(inst, def);
		inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
		inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
		inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
		inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
		inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
		inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
		inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
		inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
		inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
		inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
		inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
		inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
		inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
		inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
		inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
		inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
		inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
		inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
		inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
		inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
		inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
		inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
		inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
		inst.datetime = (params) => inst.check(datetime(params));
		inst.date = (params) => inst.check(date(params));
		inst.time = (params) => inst.check(time(params));
		inst.duration = (params) => inst.check(duration(params));
	});
	ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
		$ZodStringFormat.init(inst, def);
		_ZodString.init(inst, def);
	});
	ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
		$ZodEmail.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
		$ZodGUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
		$ZodUUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
		$ZodURL.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
		$ZodEmoji.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
		$ZodNanoID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
		$ZodCUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
		$ZodCUID2.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
		$ZodULID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
		$ZodXID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
		$ZodKSUID.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
		$ZodIPv4.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
		$ZodIPv6.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
		$ZodCIDRv4.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
		$ZodCIDRv6.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
		$ZodBase64.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
		$ZodBase64URL.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
		$ZodE164.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
		$ZodJWT.init(inst, def);
		ZodStringFormat.init(inst, def);
	});
	ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
		$ZodNumber.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
		inst.gt = (value, params) => inst.check(/* @__PURE__ */ _gt(value, params));
		inst.gte = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
		inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
		inst.lt = (value, params) => inst.check(/* @__PURE__ */ _lt(value, params));
		inst.lte = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
		inst.max = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
		inst.int = (params) => inst.check(int(params));
		inst.safe = (params) => inst.check(int(params));
		inst.positive = (params) => inst.check(/* @__PURE__ */ _gt(0, params));
		inst.nonnegative = (params) => inst.check(/* @__PURE__ */ _gte(0, params));
		inst.negative = (params) => inst.check(/* @__PURE__ */ _lt(0, params));
		inst.nonpositive = (params) => inst.check(/* @__PURE__ */ _lte(0, params));
		inst.multipleOf = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
		inst.step = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
		inst.finite = () => inst;
		const bag = inst._zod.bag;
		inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
		inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
		inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
		inst.isFinite = true;
		inst.format = bag.format ?? null;
	});
	ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
		$ZodNumberFormat.init(inst, def);
		ZodNumber.init(inst, def);
	});
	ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
		$ZodBoolean.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
	});
	ZodNull = /*@__PURE__*/ $constructor("ZodNull", (inst, def) => {
		$ZodNull.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
	});
	ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
		$ZodUnknown.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
	});
	ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
		$ZodNever.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
	});
	ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
		$ZodArray.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
		inst.element = def.element;
		inst.min = (minLength, params) => inst.check(/* @__PURE__ */ _minLength(minLength, params));
		inst.nonempty = (params) => inst.check(/* @__PURE__ */ _minLength(1, params));
		inst.max = (maxLength, params) => inst.check(/* @__PURE__ */ _maxLength(maxLength, params));
		inst.length = (len, params) => inst.check(/* @__PURE__ */ _length(len, params));
		inst.unwrap = () => inst.element;
	});
	ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
		$ZodObjectJIT.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
		defineLazy(inst, "shape", () => {
			return def.shape;
		});
		inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
		inst.catchall = (catchall) => inst.clone({
			...inst._zod.def,
			catchall
		});
		inst.passthrough = () => inst.clone({
			...inst._zod.def,
			catchall: unknown()
		});
		inst.loose = () => inst.clone({
			...inst._zod.def,
			catchall: unknown()
		});
		inst.strict = () => inst.clone({
			...inst._zod.def,
			catchall: never()
		});
		inst.strip = () => inst.clone({
			...inst._zod.def,
			catchall: void 0
		});
		inst.extend = (incoming) => {
			return extend(inst, incoming);
		};
		inst.safeExtend = (incoming) => {
			return safeExtend(inst, incoming);
		};
		inst.merge = (other) => merge(inst, other);
		inst.pick = (mask) => pick(inst, mask);
		inst.omit = (mask) => omit(inst, mask);
		inst.partial = (...args) => partial(ZodOptional, inst, args[0]);
		inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
	});
	ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
		$ZodUnion.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
		inst.options = def.options;
	});
	ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("ZodDiscriminatedUnion", (inst, def) => {
		ZodUnion.init(inst, def);
		$ZodDiscriminatedUnion.init(inst, def);
	});
	ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
		$ZodIntersection.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
	});
	ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
		$ZodRecord.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
		inst.keyType = def.keyType;
		inst.valueType = def.valueType;
	});
	ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
		$ZodEnum.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
		inst.enum = def.entries;
		inst.options = Object.values(def.entries);
		const keys = new Set(Object.keys(def.entries));
		inst.extract = (values, params) => {
			const newEntries = {};
			for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new ZodEnum({
				...def,
				checks: [],
				...normalizeParams(params),
				entries: newEntries
			});
		};
		inst.exclude = (values, params) => {
			const newEntries = { ...def.entries };
			for (const value of values) if (keys.has(value)) delete newEntries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new ZodEnum({
				...def,
				checks: [],
				...normalizeParams(params),
				entries: newEntries
			});
		};
	});
	ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
		$ZodLiteral.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
		inst.values = new Set(def.values);
		Object.defineProperty(inst, "value", { get() {
			if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return def.values[0];
		} });
	});
	ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
		$ZodTransform.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
		inst._zod.parse = (payload, _ctx) => {
			if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
			payload.addIssue = (issue$1) => {
				if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
				else {
					const _issue = issue$1;
					if (_issue.fatal) _issue.continue = false;
					_issue.code ?? (_issue.code = "custom");
					_issue.input ?? (_issue.input = payload.value);
					_issue.inst ?? (_issue.inst = inst);
					payload.issues.push(issue(_issue));
				}
			};
			const output = def.transform(payload.value, payload);
			if (output instanceof Promise) return output.then((output) => {
				payload.value = output;
				return payload;
			});
			payload.value = output;
			return payload;
		};
	});
	ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
		$ZodOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
		$ZodExactOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
		$ZodNullable.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
		$ZodDefault.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeDefault = inst.unwrap;
	});
	ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
		$ZodPrefault.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
		$ZodNonOptional.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
		$ZodCatch.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeCatch = inst.unwrap;
	});
	ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
		$ZodPipe.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
		inst.in = def.in;
		inst.out = def.out;
	});
	ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
		$ZodReadonly.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
		$ZodCustom.init(inst, def);
		ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/compat.js
var init_compat = __esmMin((() => {
	init_core();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js
var init_external = __esmMin((() => {
	init_core();
	init_schemas();
	init_checks();
	init_errors();
	init_parse();
	init_compat();
	init_json_schema_processors();
	init_registries();
	init_checks();
	init_iso();
	init_schemas();
	init_util();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/index.js
var init_classic = __esmMin((() => {
	init_external();
}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/index.js
var init_v4 = __esmMin((() => {
	init_classic();
})), RELATED_TASK_META_KEY, AssertObjectSchema, ProgressTokenSchema, CursorSchema, TaskMetadataSchema, RelatedTaskMetadataSchema, RequestMetaSchema, BaseRequestParamsSchema, TaskAugmentedRequestParamsSchema, isTaskAugmentedRequestParams, RequestSchema, NotificationsParamsSchema, NotificationSchema, ResultSchema, RequestIdSchema, JSONRPCRequestSchema, isJSONRPCRequest, JSONRPCNotificationSchema, isJSONRPCNotification, JSONRPCResultResponseSchema, isJSONRPCResultResponse, ErrorCode, JSONRPCErrorResponseSchema, isJSONRPCErrorResponse, JSONRPCMessageSchema, EmptyResultSchema, CancelledNotificationParamsSchema, CancelledNotificationSchema, IconSchema, IconsSchema, BaseMetadataSchema, ImplementationSchema, FormElicitationCapabilitySchema, ElicitationCapabilitySchema, ClientTasksCapabilitySchema, ServerTasksCapabilitySchema, ClientCapabilitiesSchema, InitializeRequestParamsSchema, InitializeRequestSchema, ServerCapabilitiesSchema, InitializeResultSchema, InitializedNotificationSchema, PingRequestSchema, ProgressSchema, ProgressNotificationParamsSchema, ProgressNotificationSchema, PaginatedRequestParamsSchema, PaginatedRequestSchema, PaginatedResultSchema, TaskStatusSchema, TaskSchema, CreateTaskResultSchema, TaskStatusNotificationParamsSchema, TaskStatusNotificationSchema, GetTaskRequestSchema, GetTaskResultSchema, GetTaskPayloadRequestSchema, ListTasksRequestSchema, ListTasksResultSchema, CancelTaskRequestSchema, CancelTaskResultSchema, ResourceContentsSchema, TextResourceContentsSchema, Base64Schema, BlobResourceContentsSchema, RoleSchema, AnnotationsSchema, ResourceSchema, ResourceTemplateSchema, ListResourcesRequestSchema, ListResourcesResultSchema, ListResourceTemplatesRequestSchema, ListResourceTemplatesResultSchema, ResourceRequestParamsSchema, ReadResourceRequestParamsSchema, ReadResourceRequestSchema, ReadResourceResultSchema, ResourceListChangedNotificationSchema, SubscribeRequestParamsSchema, SubscribeRequestSchema, UnsubscribeRequestParamsSchema, UnsubscribeRequestSchema, ResourceUpdatedNotificationParamsSchema, ResourceUpdatedNotificationSchema, PromptArgumentSchema, PromptSchema, ListPromptsRequestSchema, ListPromptsResultSchema, GetPromptRequestParamsSchema, GetPromptRequestSchema, TextContentSchema, ImageContentSchema, AudioContentSchema, ToolUseContentSchema, EmbeddedResourceSchema, ResourceLinkSchema, ContentBlockSchema, PromptMessageSchema, GetPromptResultSchema, PromptListChangedNotificationSchema, ToolAnnotationsSchema, ToolExecutionSchema, ToolSchema, ListToolsRequestSchema, ListToolsResultSchema, CallToolResultSchema, CallToolRequestParamsSchema, CallToolRequestSchema, ToolListChangedNotificationSchema, LoggingLevelSchema, SetLevelRequestParamsSchema, SetLevelRequestSchema, LoggingMessageNotificationParamsSchema, LoggingMessageNotificationSchema, ModelHintSchema, ModelPreferencesSchema, ToolChoiceSchema, ToolResultContentSchema, SamplingContentSchema, SamplingMessageContentBlockSchema, SamplingMessageSchema, CreateMessageRequestParamsSchema, CreateMessageRequestSchema, CreateMessageResultSchema, CreateMessageResultWithToolsSchema, BooleanSchemaSchema, StringSchemaSchema, NumberSchemaSchema, UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema, LegacyTitledEnumSchemaSchema, SingleSelectEnumSchemaSchema, UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema, MultiSelectEnumSchemaSchema, EnumSchemaSchema, PrimitiveSchemaDefinitionSchema, ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema, ElicitRequestParamsSchema, ElicitRequestSchema, ElicitationCompleteNotificationParamsSchema, ElicitationCompleteNotificationSchema, ElicitResultSchema, ResourceTemplateReferenceSchema, PromptReferenceSchema, CompleteRequestParamsSchema, CompleteRequestSchema, CompleteResultSchema, RootSchema, ListRootsRequestSchema, ListRootsResultSchema, RootsListChangedNotificationSchema, McpError, UrlElicitationRequiredError;
var init_types = __esmMin((() => {
	init_v4();
	RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task";
	AssertObjectSchema = custom((v) => v !== null && (typeof v === "object" || typeof v === "function"));
	ProgressTokenSchema = union([string(), number().int()]);
	CursorSchema = string();
	looseObject({
		/**
		* Requested duration in milliseconds to retain task from creation.
		*/
		ttl: number().optional(),
		/**
		* Time in milliseconds to wait between task status requests.
		*/
		pollInterval: number().optional()
	});
	TaskMetadataSchema = object({ ttl: number().optional() });
	RelatedTaskMetadataSchema = object({ taskId: string() });
	RequestMetaSchema = looseObject({
		/**
		* If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
		*/
		progressToken: ProgressTokenSchema.optional(),
		/**
		* If specified, this request is related to the provided task.
		*/
		[RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
	});
	BaseRequestParamsSchema = object({ 
	/**
	* See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
	*/
_meta: RequestMetaSchema.optional() });
	TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({ 
	/**
	* If specified, the caller is requesting task-augmented execution for this request.
	* The request will return a CreateTaskResult immediately, and the actual result can be
	* retrieved later via tasks/result.
	*
	* Task augmentation is subject to capability negotiation - receivers MUST declare support
	* for task augmentation of specific request types in their capabilities.
	*/
task: TaskMetadataSchema.optional() });
	isTaskAugmentedRequestParams = (value) => TaskAugmentedRequestParamsSchema.safeParse(value).success;
	RequestSchema = object({
		method: string(),
		params: BaseRequestParamsSchema.loose().optional()
	});
	NotificationsParamsSchema = object({ 
	/**
	* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
	* for notes on _meta usage.
	*/
_meta: RequestMetaSchema.optional() });
	NotificationSchema = object({
		method: string(),
		params: NotificationsParamsSchema.loose().optional()
	});
	ResultSchema = looseObject({ 
	/**
	* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
	* for notes on _meta usage.
	*/
_meta: RequestMetaSchema.optional() });
	RequestIdSchema = union([string(), number().int()]);
	JSONRPCRequestSchema = object({
		jsonrpc: literal("2.0"),
		id: RequestIdSchema,
		...RequestSchema.shape
	}).strict();
	isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
	JSONRPCNotificationSchema = object({
		jsonrpc: literal("2.0"),
		...NotificationSchema.shape
	}).strict();
	isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
	JSONRPCResultResponseSchema = object({
		jsonrpc: literal("2.0"),
		id: RequestIdSchema,
		result: ResultSchema
	}).strict();
	isJSONRPCResultResponse = (value) => JSONRPCResultResponseSchema.safeParse(value).success;
	(function(ErrorCode) {
		ErrorCode[ErrorCode["ConnectionClosed"] = -32e3] = "ConnectionClosed";
		ErrorCode[ErrorCode["RequestTimeout"] = -32001] = "RequestTimeout";
		ErrorCode[ErrorCode["ParseError"] = -32700] = "ParseError";
		ErrorCode[ErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
		ErrorCode[ErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
		ErrorCode[ErrorCode["InvalidParams"] = -32602] = "InvalidParams";
		ErrorCode[ErrorCode["InternalError"] = -32603] = "InternalError";
		ErrorCode[ErrorCode["UrlElicitationRequired"] = -32042] = "UrlElicitationRequired";
	})(ErrorCode || (ErrorCode = {}));
	JSONRPCErrorResponseSchema = object({
		jsonrpc: literal("2.0"),
		id: RequestIdSchema.optional(),
		error: object({
			/**
			* The error type that occurred.
			*/
			code: number().int(),
			/**
			* A short description of the error. The message SHOULD be limited to a concise single sentence.
			*/
			message: string(),
			/**
			* Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
			*/
			data: unknown().optional()
		})
	}).strict();
	isJSONRPCErrorResponse = (value) => JSONRPCErrorResponseSchema.safeParse(value).success;
	JSONRPCMessageSchema = union([
		JSONRPCRequestSchema,
		JSONRPCNotificationSchema,
		JSONRPCResultResponseSchema,
		JSONRPCErrorResponseSchema
	]);
	union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]);
	EmptyResultSchema = ResultSchema.strict();
	CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
		/**
		* The ID of the request to cancel.
		*
		* This MUST correspond to the ID of a request previously issued in the same direction.
		*/
		requestId: RequestIdSchema.optional(),
		/**
		* An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
		*/
		reason: string().optional()
	});
	CancelledNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/cancelled"),
		params: CancelledNotificationParamsSchema
	});
	IconSchema = object({
		/**
		* URL or data URI for the icon.
		*/
		src: string(),
		/**
		* Optional MIME type for the icon.
		*/
		mimeType: string().optional(),
		/**
		* Optional array of strings that specify sizes at which the icon can be used.
		* Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
		*
		* If not provided, the client should assume that the icon can be used at any size.
		*/
		sizes: array(string()).optional(),
		/**
		* Optional specifier for the theme this icon is designed for. `light` indicates
		* the icon is designed to be used with a light background, and `dark` indicates
		* the icon is designed to be used with a dark background.
		*
		* If not provided, the client should assume the icon can be used with any theme.
		*/
		theme: _enum(["light", "dark"]).optional()
	});
	IconsSchema = object({ 
	/**
	* Optional set of sized icons that the client can display in a user interface.
	*
	* Clients that support rendering icons MUST support at least the following MIME types:
	* - `image/png` - PNG images (safe, universal compatibility)
	* - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
	*
	* Clients that support rendering icons SHOULD also support:
	* - `image/svg+xml` - SVG images (scalable but requires security precautions)
	* - `image/webp` - WebP images (modern, efficient format)
	*/
icons: array(IconSchema).optional() });
	BaseMetadataSchema = object({
		/** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
		name: string(),
		/**
		* Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
		* even by those unfamiliar with domain-specific terminology.
		*
		* If not provided, the name should be used for display (except for Tool,
		* where `annotations.title` should be given precedence over using `name`,
		* if present).
		*/
		title: string().optional()
	});
	ImplementationSchema = BaseMetadataSchema.extend({
		...BaseMetadataSchema.shape,
		...IconsSchema.shape,
		version: string(),
		/**
		* An optional URL of the website for this implementation.
		*/
		websiteUrl: string().optional(),
		/**
		* An optional human-readable description of what this implementation does.
		*
		* This can be used by clients or servers to provide context about their purpose
		* and capabilities. For example, a server might describe the types of resources
		* or tools it provides, while a client might describe its intended use case.
		*/
		description: string().optional()
	});
	FormElicitationCapabilitySchema = intersection(object({ applyDefaults: boolean().optional() }), record(string(), unknown()));
	ElicitationCapabilitySchema = preprocess((value) => {
		if (value && typeof value === "object" && !Array.isArray(value)) {
			if (Object.keys(value).length === 0) return { form: {} };
		}
		return value;
	}, intersection(object({
		form: FormElicitationCapabilitySchema.optional(),
		url: AssertObjectSchema.optional()
	}), record(string(), unknown()).optional()));
	ClientTasksCapabilitySchema = looseObject({
		/**
		* Present if the client supports listing tasks.
		*/
		list: AssertObjectSchema.optional(),
		/**
		* Present if the client supports cancelling tasks.
		*/
		cancel: AssertObjectSchema.optional(),
		/**
		* Capabilities for task creation on specific request types.
		*/
		requests: looseObject({
			/**
			* Task support for sampling requests.
			*/
			sampling: looseObject({ createMessage: AssertObjectSchema.optional() }).optional(),
			/**
			* Task support for elicitation requests.
			*/
			elicitation: looseObject({ create: AssertObjectSchema.optional() }).optional()
		}).optional()
	});
	ServerTasksCapabilitySchema = looseObject({
		/**
		* Present if the server supports listing tasks.
		*/
		list: AssertObjectSchema.optional(),
		/**
		* Present if the server supports cancelling tasks.
		*/
		cancel: AssertObjectSchema.optional(),
		/**
		* Capabilities for task creation on specific request types.
		*/
		requests: looseObject({ 
		/**
		* Task support for tool requests.
		*/
tools: looseObject({ call: AssertObjectSchema.optional() }).optional() }).optional()
	});
	ClientCapabilitiesSchema = object({
		/**
		* Experimental, non-standard capabilities that the client supports.
		*/
		experimental: record(string(), AssertObjectSchema).optional(),
		/**
		* Present if the client supports sampling from an LLM.
		*/
		sampling: object({
			/**
			* Present if the client supports context inclusion via includeContext parameter.
			* If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
			*/
			context: AssertObjectSchema.optional(),
			/**
			* Present if the client supports tool use via tools and toolChoice parameters.
			*/
			tools: AssertObjectSchema.optional()
		}).optional(),
		/**
		* Present if the client supports eliciting user input.
		*/
		elicitation: ElicitationCapabilitySchema.optional(),
		/**
		* Present if the client supports listing roots.
		*/
		roots: object({ 
		/**
		* Whether the client supports issuing notifications for changes to the roots list.
		*/
listChanged: boolean().optional() }).optional(),
		/**
		* Present if the client supports task creation.
		*/
		tasks: ClientTasksCapabilitySchema.optional(),
		/**
		* Extensions that the client supports. Keys are extension identifiers (vendor-prefix/extension-name).
		*/
		extensions: record(string(), AssertObjectSchema).optional()
	});
	InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
		/**
		* The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
		*/
		protocolVersion: string(),
		capabilities: ClientCapabilitiesSchema,
		clientInfo: ImplementationSchema
	});
	InitializeRequestSchema = RequestSchema.extend({
		method: literal("initialize"),
		params: InitializeRequestParamsSchema
	});
	ServerCapabilitiesSchema = object({
		/**
		* Experimental, non-standard capabilities that the server supports.
		*/
		experimental: record(string(), AssertObjectSchema).optional(),
		/**
		* Present if the server supports sending log messages to the client.
		*/
		logging: AssertObjectSchema.optional(),
		/**
		* Present if the server supports sending completions to the client.
		*/
		completions: AssertObjectSchema.optional(),
		/**
		* Present if the server offers any prompt templates.
		*/
		prompts: object({ 
		/**
		* Whether this server supports issuing notifications for changes to the prompt list.
		*/
listChanged: boolean().optional() }).optional(),
		/**
		* Present if the server offers any resources to read.
		*/
		resources: object({
			/**
			* Whether this server supports clients subscribing to resource updates.
			*/
			subscribe: boolean().optional(),
			/**
			* Whether this server supports issuing notifications for changes to the resource list.
			*/
			listChanged: boolean().optional()
		}).optional(),
		/**
		* Present if the server offers any tools to call.
		*/
		tools: object({ 
		/**
		* Whether this server supports issuing notifications for changes to the tool list.
		*/
listChanged: boolean().optional() }).optional(),
		/**
		* Present if the server supports task creation.
		*/
		tasks: ServerTasksCapabilitySchema.optional(),
		/**
		* Extensions that the server supports. Keys are extension identifiers (vendor-prefix/extension-name).
		*/
		extensions: record(string(), AssertObjectSchema).optional()
	});
	InitializeResultSchema = ResultSchema.extend({
		/**
		* The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
		*/
		protocolVersion: string(),
		capabilities: ServerCapabilitiesSchema,
		serverInfo: ImplementationSchema,
		/**
		* Instructions describing how to use the server and its features.
		*
		* This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
		*/
		instructions: string().optional()
	});
	InitializedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/initialized"),
		params: NotificationsParamsSchema.optional()
	});
	PingRequestSchema = RequestSchema.extend({
		method: literal("ping"),
		params: BaseRequestParamsSchema.optional()
	});
	ProgressSchema = object({
		/**
		* The progress thus far. This should increase every time progress is made, even if the total is unknown.
		*/
		progress: number(),
		/**
		* Total number of items to process (or total progress required), if known.
		*/
		total: optional(number()),
		/**
		* An optional message describing the current progress.
		*/
		message: optional(string())
	});
	ProgressNotificationParamsSchema = object({
		...NotificationsParamsSchema.shape,
		...ProgressSchema.shape,
		/**
		* The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
		*/
		progressToken: ProgressTokenSchema
	});
	ProgressNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/progress"),
		params: ProgressNotificationParamsSchema
	});
	PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({ 
	/**
	* An opaque token representing the current pagination position.
	* If provided, the server should return results starting after this cursor.
	*/
cursor: CursorSchema.optional() });
	PaginatedRequestSchema = RequestSchema.extend({ params: PaginatedRequestParamsSchema.optional() });
	PaginatedResultSchema = ResultSchema.extend({ 
	/**
	* An opaque token representing the pagination position after the last returned result.
	* If present, there may be more results available.
	*/
nextCursor: CursorSchema.optional() });
	TaskStatusSchema = _enum([
		"working",
		"input_required",
		"completed",
		"failed",
		"cancelled"
	]);
	TaskSchema = object({
		taskId: string(),
		status: TaskStatusSchema,
		/**
		* Time in milliseconds to keep task results available after completion.
		* If null, the task has unlimited lifetime until manually cleaned up.
		*/
		ttl: union([number(), _null()]),
		/**
		* ISO 8601 timestamp when the task was created.
		*/
		createdAt: string(),
		/**
		* ISO 8601 timestamp when the task was last updated.
		*/
		lastUpdatedAt: string(),
		pollInterval: optional(number()),
		/**
		* Optional diagnostic message for failed tasks or other status information.
		*/
		statusMessage: optional(string())
	});
	CreateTaskResultSchema = ResultSchema.extend({ task: TaskSchema });
	TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema);
	TaskStatusNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/tasks/status"),
		params: TaskStatusNotificationParamsSchema
	});
	GetTaskRequestSchema = RequestSchema.extend({
		method: literal("tasks/get"),
		params: BaseRequestParamsSchema.extend({ taskId: string() })
	});
	GetTaskResultSchema = ResultSchema.merge(TaskSchema);
	GetTaskPayloadRequestSchema = RequestSchema.extend({
		method: literal("tasks/result"),
		params: BaseRequestParamsSchema.extend({ taskId: string() })
	});
	ResultSchema.loose();
	ListTasksRequestSchema = PaginatedRequestSchema.extend({ method: literal("tasks/list") });
	ListTasksResultSchema = PaginatedResultSchema.extend({ tasks: array(TaskSchema) });
	CancelTaskRequestSchema = RequestSchema.extend({
		method: literal("tasks/cancel"),
		params: BaseRequestParamsSchema.extend({ taskId: string() })
	});
	CancelTaskResultSchema = ResultSchema.merge(TaskSchema);
	ResourceContentsSchema = object({
		/**
		* The URI of this resource.
		*/
		uri: string(),
		/**
		* The MIME type of this resource, if known.
		*/
		mimeType: optional(string()),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	TextResourceContentsSchema = ResourceContentsSchema.extend({ 
	/**
	* The text of the item. This must only be set if the item can actually be represented as text (not binary data).
	*/
text: string() });
	Base64Schema = string().refine((val) => {
		try {
			atob(val);
			return true;
		} catch {
			return false;
		}
	}, { message: "Invalid Base64 string" });
	BlobResourceContentsSchema = ResourceContentsSchema.extend({ 
	/**
	* A base64-encoded string representing the binary data of the item.
	*/
blob: Base64Schema });
	RoleSchema = _enum(["user", "assistant"]);
	AnnotationsSchema = object({
		/**
		* Intended audience(s) for the resource.
		*/
		audience: array(RoleSchema).optional(),
		/**
		* Importance hint for the resource, from 0 (least) to 1 (most).
		*/
		priority: number().min(0).max(1).optional(),
		/**
		* ISO 8601 timestamp for the most recent modification.
		*/
		lastModified: datetime({ offset: true }).optional()
	});
	ResourceSchema = object({
		...BaseMetadataSchema.shape,
		...IconsSchema.shape,
		/**
		* The URI of this resource.
		*/
		uri: string(),
		/**
		* A description of what this resource represents.
		*
		* This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
		*/
		description: optional(string()),
		/**
		* The MIME type of this resource, if known.
		*/
		mimeType: optional(string()),
		/**
		* The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
		*
		* This can be used by Hosts to display file sizes and estimate context window usage.
		*/
		size: optional(number()),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: optional(looseObject({}))
	});
	ResourceTemplateSchema = object({
		...BaseMetadataSchema.shape,
		...IconsSchema.shape,
		/**
		* A URI template (according to RFC 6570) that can be used to construct resource URIs.
		*/
		uriTemplate: string(),
		/**
		* A description of what this template is for.
		*
		* This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
		*/
		description: optional(string()),
		/**
		* The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
		*/
		mimeType: optional(string()),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: optional(looseObject({}))
	});
	ListResourcesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/list") });
	ListResourcesResultSchema = PaginatedResultSchema.extend({ resources: array(ResourceSchema) });
	ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/templates/list") });
	ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({ resourceTemplates: array(ResourceTemplateSchema) });
	ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({ 
	/**
	* The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
	*
	* @format uri
	*/
uri: string() });
	ReadResourceRequestParamsSchema = ResourceRequestParamsSchema;
	ReadResourceRequestSchema = RequestSchema.extend({
		method: literal("resources/read"),
		params: ReadResourceRequestParamsSchema
	});
	ReadResourceResultSchema = ResultSchema.extend({ contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema])) });
	ResourceListChangedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/resources/list_changed"),
		params: NotificationsParamsSchema.optional()
	});
	SubscribeRequestParamsSchema = ResourceRequestParamsSchema;
	SubscribeRequestSchema = RequestSchema.extend({
		method: literal("resources/subscribe"),
		params: SubscribeRequestParamsSchema
	});
	UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema;
	UnsubscribeRequestSchema = RequestSchema.extend({
		method: literal("resources/unsubscribe"),
		params: UnsubscribeRequestParamsSchema
	});
	ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({ 
	/**
	* The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
	*/
uri: string() });
	ResourceUpdatedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/resources/updated"),
		params: ResourceUpdatedNotificationParamsSchema
	});
	PromptArgumentSchema = object({
		/**
		* The name of the argument.
		*/
		name: string(),
		/**
		* A human-readable description of the argument.
		*/
		description: optional(string()),
		/**
		* Whether this argument must be provided.
		*/
		required: optional(boolean())
	});
	PromptSchema = object({
		...BaseMetadataSchema.shape,
		...IconsSchema.shape,
		/**
		* An optional description of what this prompt provides
		*/
		description: optional(string()),
		/**
		* A list of arguments to use for templating the prompt.
		*/
		arguments: optional(array(PromptArgumentSchema)),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: optional(looseObject({}))
	});
	ListPromptsRequestSchema = PaginatedRequestSchema.extend({ method: literal("prompts/list") });
	ListPromptsResultSchema = PaginatedResultSchema.extend({ prompts: array(PromptSchema) });
	GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
		/**
		* The name of the prompt or prompt template.
		*/
		name: string(),
		/**
		* Arguments to use for templating the prompt.
		*/
		arguments: record(string(), string()).optional()
	});
	GetPromptRequestSchema = RequestSchema.extend({
		method: literal("prompts/get"),
		params: GetPromptRequestParamsSchema
	});
	TextContentSchema = object({
		type: literal("text"),
		/**
		* The text content of the message.
		*/
		text: string(),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	ImageContentSchema = object({
		type: literal("image"),
		/**
		* The base64-encoded image data.
		*/
		data: Base64Schema,
		/**
		* The MIME type of the image. Different providers may support different image types.
		*/
		mimeType: string(),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	AudioContentSchema = object({
		type: literal("audio"),
		/**
		* The base64-encoded audio data.
		*/
		data: Base64Schema,
		/**
		* The MIME type of the audio. Different providers may support different audio types.
		*/
		mimeType: string(),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	ToolUseContentSchema = object({
		type: literal("tool_use"),
		/**
		* The name of the tool to invoke.
		* Must match a tool name from the request's tools array.
		*/
		name: string(),
		/**
		* Unique identifier for this tool call.
		* Used to correlate with ToolResultContent in subsequent messages.
		*/
		id: string(),
		/**
		* Arguments to pass to the tool.
		* Must conform to the tool's inputSchema.
		*/
		input: record(string(), unknown()),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	EmbeddedResourceSchema = object({
		type: literal("resource"),
		resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
		/**
		* Optional annotations for the client.
		*/
		annotations: AnnotationsSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	ResourceLinkSchema = ResourceSchema.extend({ type: literal("resource_link") });
	ContentBlockSchema = union([
		TextContentSchema,
		ImageContentSchema,
		AudioContentSchema,
		ResourceLinkSchema,
		EmbeddedResourceSchema
	]);
	PromptMessageSchema = object({
		role: RoleSchema,
		content: ContentBlockSchema
	});
	GetPromptResultSchema = ResultSchema.extend({
		/**
		* An optional description for the prompt.
		*/
		description: string().optional(),
		messages: array(PromptMessageSchema)
	});
	PromptListChangedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/prompts/list_changed"),
		params: NotificationsParamsSchema.optional()
	});
	ToolAnnotationsSchema = object({
		/**
		* A human-readable title for the tool.
		*/
		title: string().optional(),
		/**
		* If true, the tool does not modify its environment.
		*
		* Default: false
		*/
		readOnlyHint: boolean().optional(),
		/**
		* If true, the tool may perform destructive updates to its environment.
		* If false, the tool performs only additive updates.
		*
		* (This property is meaningful only when `readOnlyHint == false`)
		*
		* Default: true
		*/
		destructiveHint: boolean().optional(),
		/**
		* If true, calling the tool repeatedly with the same arguments
		* will have no additional effect on the its environment.
		*
		* (This property is meaningful only when `readOnlyHint == false`)
		*
		* Default: false
		*/
		idempotentHint: boolean().optional(),
		/**
		* If true, this tool may interact with an "open world" of external
		* entities. If false, the tool's domain of interaction is closed.
		* For example, the world of a web search tool is open, whereas that
		* of a memory tool is not.
		*
		* Default: true
		*/
		openWorldHint: boolean().optional()
	});
	ToolExecutionSchema = object({ 
	/**
	* Indicates the tool's preference for task-augmented execution.
	* - "required": Clients MUST invoke the tool as a task
	* - "optional": Clients MAY invoke the tool as a task or normal request
	* - "forbidden": Clients MUST NOT attempt to invoke the tool as a task
	*
	* If not present, defaults to "forbidden".
	*/
taskSupport: _enum([
		"required",
		"optional",
		"forbidden"
	]).optional() });
	ToolSchema = object({
		...BaseMetadataSchema.shape,
		...IconsSchema.shape,
		/**
		* A human-readable description of the tool.
		*/
		description: string().optional(),
		/**
		* A JSON Schema 2020-12 object defining the expected parameters for the tool.
		* Must have type: 'object' at the root level per MCP spec.
		*/
		inputSchema: object({
			type: literal("object"),
			properties: record(string(), AssertObjectSchema).optional(),
			required: array(string()).optional()
		}).catchall(unknown()),
		/**
		* An optional JSON Schema 2020-12 object defining the structure of the tool's output
		* returned in the structuredContent field of a CallToolResult.
		* Must have type: 'object' at the root level per MCP spec.
		*/
		outputSchema: object({
			type: literal("object"),
			properties: record(string(), AssertObjectSchema).optional(),
			required: array(string()).optional()
		}).catchall(unknown()).optional(),
		/**
		* Optional additional tool information.
		*/
		annotations: ToolAnnotationsSchema.optional(),
		/**
		* Execution-related properties for this tool.
		*/
		execution: ToolExecutionSchema.optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	ListToolsRequestSchema = PaginatedRequestSchema.extend({ method: literal("tools/list") });
	ListToolsResultSchema = PaginatedResultSchema.extend({ tools: array(ToolSchema) });
	CallToolResultSchema = ResultSchema.extend({
		/**
		* A list of content objects that represent the result of the tool call.
		*
		* If the Tool does not define an outputSchema, this field MUST be present in the result.
		* For backwards compatibility, this field is always present, but it may be empty.
		*/
		content: array(ContentBlockSchema).default([]),
		/**
		* An object containing structured tool output.
		*
		* If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
		*/
		structuredContent: record(string(), unknown()).optional(),
		/**
		* Whether the tool call ended in an error.
		*
		* If not set, this is assumed to be false (the call was successful).
		*
		* Any errors that originate from the tool SHOULD be reported inside the result
		* object, with `isError` set to true, _not_ as an MCP protocol-level error
		* response. Otherwise, the LLM would not be able to see that an error occurred
		* and self-correct.
		*
		* However, any errors in _finding_ the tool, an error indicating that the
		* server does not support tool calls, or any other exceptional conditions,
		* should be reported as an MCP error response.
		*/
		isError: boolean().optional()
	});
	CallToolResultSchema.or(ResultSchema.extend({ toolResult: unknown() }));
	CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
		/**
		* The name of the tool to call.
		*/
		name: string(),
		/**
		* Arguments to pass to the tool.
		*/
		arguments: record(string(), unknown()).optional()
	});
	CallToolRequestSchema = RequestSchema.extend({
		method: literal("tools/call"),
		params: CallToolRequestParamsSchema
	});
	ToolListChangedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/tools/list_changed"),
		params: NotificationsParamsSchema.optional()
	});
	object({
		/**
		* If true, the list will be refreshed automatically when a list changed notification is received.
		* The callback will be called with the updated list.
		*
		* If false, the callback will be called with null items, allowing manual refresh.
		*
		* @default true
		*/
		autoRefresh: boolean().default(true),
		/**
		* Debounce time in milliseconds for list changed notification processing.
		*
		* Multiple notifications received within this timeframe will only trigger one refresh.
		* Set to 0 to disable debouncing.
		*
		* @default 300
		*/
		debounceMs: number().int().nonnegative().default(300)
	});
	LoggingLevelSchema = _enum([
		"debug",
		"info",
		"notice",
		"warning",
		"error",
		"critical",
		"alert",
		"emergency"
	]);
	SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({ 
	/**
	* The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
	*/
level: LoggingLevelSchema });
	SetLevelRequestSchema = RequestSchema.extend({
		method: literal("logging/setLevel"),
		params: SetLevelRequestParamsSchema
	});
	LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
		/**
		* The severity of this log message.
		*/
		level: LoggingLevelSchema,
		/**
		* An optional name of the logger issuing this message.
		*/
		logger: string().optional(),
		/**
		* The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
		*/
		data: unknown()
	});
	LoggingMessageNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/message"),
		params: LoggingMessageNotificationParamsSchema
	});
	ModelHintSchema = object({ 
	/**
	* A hint for a model name.
	*/
name: string().optional() });
	ModelPreferencesSchema = object({
		/**
		* Optional hints to use for model selection.
		*/
		hints: array(ModelHintSchema).optional(),
		/**
		* How much to prioritize cost when selecting a model.
		*/
		costPriority: number().min(0).max(1).optional(),
		/**
		* How much to prioritize sampling speed (latency) when selecting a model.
		*/
		speedPriority: number().min(0).max(1).optional(),
		/**
		* How much to prioritize intelligence and capabilities when selecting a model.
		*/
		intelligencePriority: number().min(0).max(1).optional()
	});
	ToolChoiceSchema = object({ 
	/**
	* Controls when tools are used:
	* - "auto": Model decides whether to use tools (default)
	* - "required": Model MUST use at least one tool before completing
	* - "none": Model MUST NOT use any tools
	*/
mode: _enum([
		"auto",
		"required",
		"none"
	]).optional() });
	ToolResultContentSchema = object({
		type: literal("tool_result"),
		toolUseId: string().describe("The unique identifier for the corresponding tool call."),
		content: array(ContentBlockSchema).default([]),
		structuredContent: object({}).loose().optional(),
		isError: boolean().optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	SamplingContentSchema = discriminatedUnion("type", [
		TextContentSchema,
		ImageContentSchema,
		AudioContentSchema
	]);
	SamplingMessageContentBlockSchema = discriminatedUnion("type", [
		TextContentSchema,
		ImageContentSchema,
		AudioContentSchema,
		ToolUseContentSchema,
		ToolResultContentSchema
	]);
	SamplingMessageSchema = object({
		role: RoleSchema,
		content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
		messages: array(SamplingMessageSchema),
		/**
		* The server's preferences for which model to select. The client MAY modify or omit this request.
		*/
		modelPreferences: ModelPreferencesSchema.optional(),
		/**
		* An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
		*/
		systemPrompt: string().optional(),
		/**
		* A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
		* The client MAY ignore this request.
		*
		* Default is "none". Values "thisServer" and "allServers" are soft-deprecated. Servers SHOULD only use these values if the client
		* declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.
		*/
		includeContext: _enum([
			"none",
			"thisServer",
			"allServers"
		]).optional(),
		temperature: number().optional(),
		/**
		* The requested maximum number of tokens to sample (to prevent runaway completions).
		*
		* The client MAY choose to sample fewer tokens than the requested maximum.
		*/
		maxTokens: number().int(),
		stopSequences: array(string()).optional(),
		/**
		* Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
		*/
		metadata: AssertObjectSchema.optional(),
		/**
		* Tools that the model may use during generation.
		* The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
		*/
		tools: array(ToolSchema).optional(),
		/**
		* Controls how the model uses tools.
		* The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
		* Default is `{ mode: "auto" }`.
		*/
		toolChoice: ToolChoiceSchema.optional()
	});
	CreateMessageRequestSchema = RequestSchema.extend({
		method: literal("sampling/createMessage"),
		params: CreateMessageRequestParamsSchema
	});
	CreateMessageResultSchema = ResultSchema.extend({
		/**
		* The name of the model that generated the message.
		*/
		model: string(),
		/**
		* The reason why sampling stopped, if known.
		*
		* Standard values:
		* - "endTurn": Natural end of the assistant's turn
		* - "stopSequence": A stop sequence was encountered
		* - "maxTokens": Maximum token limit was reached
		*
		* This field is an open string to allow for provider-specific stop reasons.
		*/
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens"
		]).or(string())),
		role: RoleSchema,
		/**
		* Response content. Single content block (text, image, or audio).
		*/
		content: SamplingContentSchema
	});
	CreateMessageResultWithToolsSchema = ResultSchema.extend({
		/**
		* The name of the model that generated the message.
		*/
		model: string(),
		/**
		* The reason why sampling stopped, if known.
		*
		* Standard values:
		* - "endTurn": Natural end of the assistant's turn
		* - "stopSequence": A stop sequence was encountered
		* - "maxTokens": Maximum token limit was reached
		* - "toolUse": The model wants to use one or more tools
		*
		* This field is an open string to allow for provider-specific stop reasons.
		*/
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens",
			"toolUse"
		]).or(string())),
		role: RoleSchema,
		/**
		* Response content. May be a single block or array. May include ToolUseContent if stopReason is "toolUse".
		*/
		content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
	});
	BooleanSchemaSchema = object({
		type: literal("boolean"),
		title: string().optional(),
		description: string().optional(),
		default: boolean().optional()
	});
	StringSchemaSchema = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		minLength: number().optional(),
		maxLength: number().optional(),
		format: _enum([
			"email",
			"uri",
			"date",
			"date-time"
		]).optional(),
		default: string().optional()
	});
	NumberSchemaSchema = object({
		type: _enum(["number", "integer"]),
		title: string().optional(),
		description: string().optional(),
		minimum: number().optional(),
		maximum: number().optional(),
		default: number().optional()
	});
	UntitledSingleSelectEnumSchemaSchema = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		default: string().optional()
	});
	TitledSingleSelectEnumSchemaSchema = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		oneOf: array(object({
			const: string(),
			title: string()
		})),
		default: string().optional()
	});
	LegacyTitledEnumSchemaSchema = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		enumNames: array(string()).optional(),
		default: string().optional()
	});
	SingleSelectEnumSchemaSchema = union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]);
	UntitledMultiSelectEnumSchemaSchema = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({
			type: literal("string"),
			enum: array(string())
		}),
		default: array(string()).optional()
	});
	TitledMultiSelectEnumSchemaSchema = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({ anyOf: array(object({
			const: string(),
			title: string()
		})) }),
		default: array(string()).optional()
	});
	MultiSelectEnumSchemaSchema = union([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema]);
	EnumSchemaSchema = union([
		LegacyTitledEnumSchemaSchema,
		SingleSelectEnumSchemaSchema,
		MultiSelectEnumSchemaSchema
	]);
	PrimitiveSchemaDefinitionSchema = union([
		EnumSchemaSchema,
		BooleanSchemaSchema,
		StringSchemaSchema,
		NumberSchemaSchema
	]);
	ElicitRequestFormParamsSchema = TaskAugmentedRequestParamsSchema.extend({
		/**
		* The elicitation mode.
		*
		* Optional for backward compatibility. Clients MUST treat missing mode as "form".
		*/
		mode: literal("form").optional(),
		/**
		* The message to present to the user describing what information is being requested.
		*/
		message: string(),
		/**
		* A restricted subset of JSON Schema.
		* Only top-level properties are allowed, without nesting.
		*/
		requestedSchema: object({
			type: literal("object"),
			properties: record(string(), PrimitiveSchemaDefinitionSchema),
			required: array(string()).optional()
		})
	});
	ElicitRequestURLParamsSchema = TaskAugmentedRequestParamsSchema.extend({
		/**
		* The elicitation mode.
		*/
		mode: literal("url"),
		/**
		* The message to present to the user explaining why the interaction is needed.
		*/
		message: string(),
		/**
		* The ID of the elicitation, which must be unique within the context of the server.
		* The client MUST treat this ID as an opaque value.
		*/
		elicitationId: string(),
		/**
		* The URL that the user should navigate to.
		*/
		url: string().url()
	});
	ElicitRequestParamsSchema = union([ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema]);
	ElicitRequestSchema = RequestSchema.extend({
		method: literal("elicitation/create"),
		params: ElicitRequestParamsSchema
	});
	ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({ 
	/**
	* The ID of the elicitation that completed.
	*/
elicitationId: string() });
	ElicitationCompleteNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/elicitation/complete"),
		params: ElicitationCompleteNotificationParamsSchema
	});
	ElicitResultSchema = ResultSchema.extend({
		/**
		* The user action in response to the elicitation.
		* - "accept": User submitted the form/confirmed the action
		* - "decline": User explicitly decline the action
		* - "cancel": User dismissed without making an explicit choice
		*/
		action: _enum([
			"accept",
			"decline",
			"cancel"
		]),
		/**
		* The submitted form data, only present when action is "accept".
		* Contains values matching the requested schema.
		* Per MCP spec, content is "typically omitted" for decline/cancel actions.
		* We normalize null to undefined for leniency while maintaining type compatibility.
		*/
		content: preprocess((val) => val === null ? void 0 : val, record(string(), union([
			string(),
			number(),
			boolean(),
			array(string())
		])).optional())
	});
	ResourceTemplateReferenceSchema = object({
		type: literal("ref/resource"),
		/**
		* The URI or URI template of the resource.
		*/
		uri: string()
	});
	PromptReferenceSchema = object({
		type: literal("ref/prompt"),
		/**
		* The name of the prompt or prompt template
		*/
		name: string()
	});
	CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
		ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
		/**
		* The argument's information
		*/
		argument: object({
			/**
			* The name of the argument
			*/
			name: string(),
			/**
			* The value of the argument to use for completion matching.
			*/
			value: string()
		}),
		context: object({ 
		/**
		* Previously-resolved variables in a URI template or prompt.
		*/
arguments: record(string(), string()).optional() }).optional()
	});
	CompleteRequestSchema = RequestSchema.extend({
		method: literal("completion/complete"),
		params: CompleteRequestParamsSchema
	});
	CompleteResultSchema = ResultSchema.extend({ completion: looseObject({
		/**
		* An array of completion values. Must not exceed 100 items.
		*/
		values: array(string()).max(100),
		/**
		* The total number of completion options available. This can exceed the number of values actually sent in the response.
		*/
		total: optional(number().int()),
		/**
		* Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
		*/
		hasMore: optional(boolean())
	}) });
	RootSchema = object({
		/**
		* The URI identifying the root. This *must* start with file:// for now.
		*/
		uri: string().startsWith("file://"),
		/**
		* An optional name for the root.
		*/
		name: string().optional(),
		/**
		* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
		* for notes on _meta usage.
		*/
		_meta: record(string(), unknown()).optional()
	});
	ListRootsRequestSchema = RequestSchema.extend({
		method: literal("roots/list"),
		params: BaseRequestParamsSchema.optional()
	});
	ListRootsResultSchema = ResultSchema.extend({ roots: array(RootSchema) });
	RootsListChangedNotificationSchema = NotificationSchema.extend({
		method: literal("notifications/roots/list_changed"),
		params: NotificationsParamsSchema.optional()
	});
	union([
		PingRequestSchema,
		InitializeRequestSchema,
		CompleteRequestSchema,
		SetLevelRequestSchema,
		GetPromptRequestSchema,
		ListPromptsRequestSchema,
		ListResourcesRequestSchema,
		ListResourceTemplatesRequestSchema,
		ReadResourceRequestSchema,
		SubscribeRequestSchema,
		UnsubscribeRequestSchema,
		CallToolRequestSchema,
		ListToolsRequestSchema,
		GetTaskRequestSchema,
		GetTaskPayloadRequestSchema,
		ListTasksRequestSchema,
		CancelTaskRequestSchema
	]);
	union([
		CancelledNotificationSchema,
		ProgressNotificationSchema,
		InitializedNotificationSchema,
		RootsListChangedNotificationSchema,
		TaskStatusNotificationSchema
	]);
	union([
		EmptyResultSchema,
		CreateMessageResultSchema,
		CreateMessageResultWithToolsSchema,
		ElicitResultSchema,
		ListRootsResultSchema,
		GetTaskResultSchema,
		ListTasksResultSchema,
		CreateTaskResultSchema
	]);
	union([
		PingRequestSchema,
		CreateMessageRequestSchema,
		ElicitRequestSchema,
		ListRootsRequestSchema,
		GetTaskRequestSchema,
		GetTaskPayloadRequestSchema,
		ListTasksRequestSchema,
		CancelTaskRequestSchema
	]);
	union([
		CancelledNotificationSchema,
		ProgressNotificationSchema,
		LoggingMessageNotificationSchema,
		ResourceUpdatedNotificationSchema,
		ResourceListChangedNotificationSchema,
		ToolListChangedNotificationSchema,
		PromptListChangedNotificationSchema,
		TaskStatusNotificationSchema,
		ElicitationCompleteNotificationSchema
	]);
	union([
		EmptyResultSchema,
		InitializeResultSchema,
		CompleteResultSchema,
		GetPromptResultSchema,
		ListPromptsResultSchema,
		ListResourcesResultSchema,
		ListResourceTemplatesResultSchema,
		ReadResourceResultSchema,
		CallToolResultSchema,
		ListToolsResultSchema,
		GetTaskResultSchema,
		ListTasksResultSchema,
		CreateTaskResultSchema
	]);
	McpError = class McpError extends Error {
		constructor(code, message, data) {
			super(`MCP error ${code}: ${message}`);
			this.code = code;
			this.data = data;
			this.name = "McpError";
		}
		/**
		* Factory method to create the appropriate error type based on the error code and data
		*/
		static fromError(code, message, data) {
			if (code === ErrorCode.UrlElicitationRequired && data) {
				const errorData = data;
				if (errorData.elicitations) return new UrlElicitationRequiredError(errorData.elicitations, message);
			}
			return new McpError(code, message, data);
		}
	};
	UrlElicitationRequiredError = class extends McpError {
		constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
			super(ErrorCode.UrlElicitationRequired, message, { elicitations });
		}
		get elicitations() {
			return this.data?.elicitations ?? [];
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/mcp-apps/persisted-panel-reuse.ts
function readString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/** 从 URL / 路径中抽出末段，便于 `https://…/file/123` 与裸 `123` 对齐。 */
function pathTail(value) {
	try {
		const tail = (value.includes("://") ? new URL(value).pathname : value).split("/").filter(Boolean).pop();
		return tail && tail !== value ? tail : void 0;
	} catch {
		return;
	}
}
/**
* 从 toolInput / toolResult 收集稳定身份 token（vendor 无关）。
* 同时保留原值与 path tail，避免 URL 与裸 id 对不上。
*/
function collectMcpAppInstanceIdentityTokens(params) {
	const tokens = /* @__PURE__ */ new Set();
	const sources = [params.toolInput, params.toolResult?.structuredContent];
	for (const source of sources) {
		if (!source) continue;
		for (const key of IDENTITY_KEYS) {
			const value = readString(source[key]);
			if (!value) continue;
			tokens.add(value);
			const tail = pathTail(value);
			if (tail) tokens.add(tail);
		}
	}
	return tokens;
}
function identitiesOverlap(left, right) {
	if (left.size === 0 || right.size === 0) return false;
	for (const token of left) if (right.has(token)) return true;
	return false;
}
/**
* 在会话已有 panel View 中查找可复用实例。
* 不要求 `panelVisible`：隐藏后再点产物卡应 reopen，而不是重复挂载。
*/
function findReusablePersistedPanelView(records, query) {
	const requestedIdentity = collectMcpAppInstanceIdentityTokens({
		toolInput: query.toolInput,
		toolResult: query.toolResult
	});
	const sameApp = records.filter((record) => record.appId === query.appId && (record.surface === void 0 || record.surface === "panel"));
	if (sameApp.length === 0) return;
	if (requestedIdentity.size === 0) return sameApp[0];
	return sameApp.find((record) => identitiesOverlap(requestedIdentity, collectMcpAppInstanceIdentityTokens({
		toolInput: record.toolInput,
		toolResult: record.latestToolResult
	})));
}
/**
* 回放 / Guest 切到 open_design 时的复用。
*
* 通用规则仍禁止跨 appId。Ardot 的 create/open 共用同一份 editor.html，
* live create 成功后 Guest 会再要一扇 open_design；若新建实例，
* panel 互斥会把已有 fileId 的 create 藏掉，新实例首帧只有 {fileUrl}，画布空白。
*/
function findReusableArdotDesignPanelView(records, query) {
	const sameApp = findReusablePersistedPanelView(records, query);
	if (sameApp) return sameApp;
	if (query.appId !== ARDOT_OPEN_DESIGN_APP_ID$1) return;
	return findReusablePersistedPanelView(records, {
		...query,
		appId: ARDOT_CREATE_DESIGN_APP_ID$1
	});
}
var IDENTITY_KEYS, ARDOT_CREATE_DESIGN_APP_ID$1, ARDOT_OPEN_DESIGN_APP_ID$1;
var init_persisted_panel_reuse = __esmMin((() => {
	IDENTITY_KEYS = [
		"stableId",
		"fileId",
		"id",
		"fileUrl",
		"publicUrl",
		"uri"
	];
	ARDOT_CREATE_DESIGN_APP_ID$1 = "ardot/create_design";
	ARDOT_OPEN_DESIGN_APP_ID$1 = "ardot/open_design";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/ardot/canvas-controller.ts
function findArdotCanvasArtifactIdByOpenDesignFileUrl(artifacts, params) {
	if (params.appId !== "ardot/open_design") return;
	const fileId = extractArdotOpenDesignFileId(params.toolInput?.fileUrl);
	return fileId ? findArdotCanvasArtifactIdByFileId(artifacts, fileId) : void 0;
}
function isArdotCanvasArtifactItem(item) {
	if (item.type !== "custom-artifact") return false;
	if (item.customType === "ardot/canvas") return true;
	if (item.customType !== "mcp/app") return false;
	const appId = item.mcpApp?.appId;
	if (typeof appId === "string" && ARDOT_DESIGN_CANVAS_APP_IDS.has(appId)) return true;
	return Boolean(extractArdotCanvasFileId({
		uri: "uri" in item ? item.uri : void 0,
		id: item.id
	}));
}
function findArdotCanvasArtifactIdByFileId(artifacts, fileId) {
	return artifacts.find((item) => {
		if (!isArdotCanvasArtifactItem(item)) return false;
		return extractArdotCanvasFileId({
			uri: "uri" in item ? item.uri : void 0,
			id: item.id
		}) === fileId;
	})?.id;
}
function findExistingSessionArdotCanvasArtifactId(artifacts, sessionId, currentSelectedArtifactId) {
	const sessionCanvases = artifacts.filter((item) => item.sessionId === sessionId && isArdotCanvasArtifactItem(item));
	if (sessionCanvases.length === 0) return;
	if (currentSelectedArtifactId && sessionCanvases.some((item) => item.id === currentSelectedArtifactId)) return currentSelectedArtifactId;
	return sessionCanvases[0]?.id;
}
var ARDOT_OPEN_DESIGN_APP_ID, ARDOT_CREATE_DESIGN_APP_ID, ARDOT_DESIGN_CANVAS_APP_IDS, DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX;
var init_canvas_controller = __esmMin((() => {
	init_ardot_canvas();
	ARDOT_OPEN_DESIGN_APP_ID = "ardot/open_design";
	ARDOT_CREATE_DESIGN_APP_ID = "ardot/create_design";
	ARDOT_DESIGN_CANVAS_APP_IDS = /* @__PURE__ */ new Set([ARDOT_OPEN_DESIGN_APP_ID, ARDOT_CREATE_DESIGN_APP_ID]);
	DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX = "design-new-canvas";
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/ardot-panel-replay.ts
/**
* 将 Ardot 产物归一化为标准 MCP Apps panel 回放参数。
*
* 必须走 `openPersistedMcpAppView`（coordinator + RuntimeLayer），
* 不能走 `mcpAppsHostState.openApp` / `openArdotApp`：后者只维护旧 Ardot
* keep-alive 桥，不会 `openHostRequested` → 标准 panel slot 为空，
* 右侧只剩空的 `artifact-body`。
*/
function resolveArdotPersistedPanelReplay(artifact) {
	if (artifact.type !== "custom-artifact" || !artifact.sessionId) return;
	const openDesign = resolveArdotArtifactReplayTarget({
		id: artifact.id,
		uri: "uri" in artifact ? artifact.uri : void 0,
		ardotCanvas: artifact.ardotCanvas,
		mcpApp: artifact.mcpApp
	});
	if (!openDesign) return;
	const fileUrl = normalizeArdotOpenDesignFileUrl(openDesign.toolInput.fileUrl);
	const fileId = extractArdotOpenDesignFileId(fileUrl) ?? fileUrl;
	const toolResult = ensureArdotOpenDesignToolResult(artifact.mcpApp?.toolResult ?? artifact.ardotCanvas?.toolResult, fileId, fileUrl);
	return {
		sessionId: artifact.sessionId,
		appId: ARDOT_OPEN_DESIGN_APP_ID,
		toolInput: {
			fileId,
			fileUrl
		},
		toolResult
	};
}
function isAcpContentShaped(record) {
	const type = record.type;
	return (type === "text" || type === "content") && typeof record.fileId !== "string" && typeof record.fileUrl !== "string";
}
function normalizeArdotReplayContent(content, fileUrl) {
	if (Array.isArray(content) && content.every((item) => CallToolResultSchema.safeParse({ content: [item] }).success)) return content;
	return [{
		type: "text",
		text: `Open Ardot design file: ${fileUrl}`
	}];
}
/**
* 历史卡可能把 ACP `{type,text}` 当成 structuredContent 落盘。
* 回放时必须改写成带 fileId/fileUrl 的 open_design 结果；toolInput 也会携带
* 同一份身份，兼容分别从输入和结果读取画布 ID 的 Guest。
*
* trace 里的 content 也可能是 ACP `{ type: "content", content: ... }`，
* 该形状不是合法的 MCP CallToolResult。若原样交给 AppBridge，整条
* ui/notifications/tool-result 会在 schema 校验时被拒绝，Guest 最终停在欢迎页。
* 已有 fileId/fileUrl 的快照保留业务字段，仅修正不合法的 content。
*/
function ensureArdotOpenDesignToolResult(persisted, fileId, fileUrl) {
	const structured = persisted?.structuredContent;
	const hasFile = typeof structured?.fileId === "string" || typeof structured?.fileUrl === "string";
	const content = normalizeArdotReplayContent(persisted?.content, fileUrl);
	const base = structured && !isAcpContentShaped(structured) ? structured : {};
	return {
		...persisted ?? {},
		content,
		structuredContent: hasFile ? structured : {
			...base,
			_tool: "open_design",
			toolName: "open_design",
			fileId,
			fileUrl
		}
	};
}
var init_ardot_panel_replay = __esmMin((() => {
	init_types();
	init_canvas_controller();
	init_ardot_canvas();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/ardot-design-feature.ts
var init_ardot_design_feature = __esmMin((() => {
	init_design_feature_override();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/ardot-background-bootstrap.ts
function resolveArdotOpenTargetSession(currentSessionId, targetSessionId) {
	const sessionId = targetSessionId ?? currentSessionId;
	return {
		sessionId,
		isForegroundSession: !!sessionId && sessionId === currentSessionId
	};
}
//#endregion
export { ToolListChangedNotificationSchema as $, init_info_circle_filled as $t, ImplementationSchema as A, ChevronDownIcon as An, normalizeArdotOpenDesignFileUrl as At, ListToolsResultSchema as B, ZoomInIcon as Bt, CreateMessageRequestSchema as C, init_close as Cn, extractArdotIdentityFromToolResult as Ct, GetTaskPayloadRequestSchema as D, init_chevron_right as Dn, isArdotEmbedUrl as Dt, ErrorCode as E, ChevronRightIcon as En, isArdotArtifactIcon as Et, ListResourceTemplatesResultSchema as F, init_browse as Fn, require_with_selector as Ft, PromptListChangedNotificationSchema as G, init_upload as Gt, McpError as H, VideoIcon as Ht, ListResourcesRequestSchema as I, BrowseOffIcon as In, require_shim as It, ReadResourceResultSchema as J, RotationIcon as Jt, RELATED_TASK_META_KEY as K, TimeFilledIcon as Kt, ListResourcesResultSchema as L, init_browse_off as Ln, init_esm as Lt, ListPromptsRequestSchema as M, CheckCircleFilledIcon as Mn, createStore as Mt, ListPromptsResultSchema as N, init_check_circle_filled as Nn, init_vanilla as Nt, GetTaskRequestSchema as O, ChevronLeftIcon as On, isNonReplayableArdotCreateDesignArtifact as Ot, ListResourceTemplatesRequestSchema as P, BrowseIcon as Pn, require_zustand as Pt, TaskStatusNotificationSchema as Q, InfoCircleFilledIcon as Qt, ListTasksRequestSchema as R, AddIcon as Rn, ZoomOutIcon as Rt, ContentBlockSchema as S, CloseIcon as Sn, extractArdotCanvasFileId as St, EmbeddedResourceSchema as T, init_close_circle_filled as Tn, init_ardot_canvas as Tt, PingRequestSchema as U, init_video as Ut, LoggingMessageNotificationSchema as V, init_zoom_in as Vt, ProgressNotificationSchema as W, UploadIcon as Wt, ResourceLinkSchema as X, MirrorIcon as Xt, RequestIdSchema as Y, init_rotation as Yt, ResourceListChangedNotificationSchema as Z, init_mirror as Zt, CallToolRequestSchema as _, init_error_circle_filled as _n, useArdotAuth as _t, ARDOT_CREATE_DESIGN_APP_ID as a, init_help_circle_filled as an, isJSONRPCResultResponse as at, CancelTaskResultSchema as b, DeleteIcon as bn, MCP_APP_ARDOT_ARTIFACT_URI_PREFIX as bt, DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX as c, FileWordIcon as cn, init_parse$1 as ct, findExistingSessionArdotCanvasArtifactId as d, init_file_powerpoint as dn, ENABLE_ARDOT_DESIGN_FEATURE as dt, ImageIcon as en, ToolSchema as et, init_canvas_controller as f, FilePdfIcon as fn, init_design_feature_override as ft, init_persisted_panel_reuse as g, ErrorCircleFilledIcon as gn, init_use_ardot_auth as gt, findReusableArdotDesignPanelView as h, init_file_excel as hn, init_embed_host as ht, resolveArdotPersistedPanelReplay as i, HelpCircleFilledIcon as in, isJSONRPCRequest as it, JSONRPCMessageSchema as j, init_chevron_down as jn, resolveArdotLastOpenedTarget as jt, GetTaskResultSchema as k, init_chevron_left as kn, isVirtualMcpAppArtifactUri as kt, findArdotCanvasArtifactIdByFileId as l, init_file_word as ln, safeParse$1 as lt, collectMcpAppInstanceIdentityTokens as m, FileExcelIcon as mn, ArdotEmbedHost as mt, init_ardot_design_feature as n, ImageErrorIcon as nn, isJSONRPCErrorResponse as nt, ARDOT_DESIGN_CANVAS_APP_IDS as o, FileIcon as on, isTaskAugmentedRequestParams as ot, isArdotCanvasArtifactItem as p, init_file_pdf as pn, isEnableArdotDesignEnabled as pt, ReadResourceRequestSchema as q, init_time_filled as qt, init_ardot_panel_replay as r, init_image_error as rn, isJSONRPCNotification as rt, ARDOT_OPEN_DESIGN_APP_ID as s, init_file as sn, init_core as st, resolveArdotOpenTargetSession as t, init_image as tn, init_types as tt, findArdotCanvasArtifactIdByOpenDesignFileUrl as u, FilePowerpointIcon as un, init_src as ut, CallToolResultSchema as v, DownloadIcon as vn, ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE as vt, CreateTaskResultSchema as w, CloseCircleFilledIcon as wn, extractArdotOpenDesignFileId as wt, CancelledNotificationSchema as x, init_delete as xn, buildArdotWebFileUrl as xt, CancelTaskRequestSchema as y, init_download as yn, ARDOT_CANVAS_URI_PREFIX as yt, ListTasksResultSchema as z, init_add as zn, init_zoom_out as zt };
