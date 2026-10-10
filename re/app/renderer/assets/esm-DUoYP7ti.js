import { n as __esmMin, o as __toCommonJS, r as __exportAll, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $st as init_tslib_es6, Bct as isWindows, Dct as isPC, Ect as isMobileQQBrowser, Fct as isTencentDocsApp, Gst as __generator, Hst as __awaiter, Jst as __read, Mct as isQQMiniProgram, Nct as isQQMobileDocsClient, Oct as isPCTencentDocsClient, Qst as __values, Sct as isMacAppStoreTencentDocsClient, Uct as isWxMiniProgram, Vst as __assign, Xst as __spreadArray, act as init_esm$8, flt as _createClass, gct as isHarmony, hlt as init_classCallCheck, jct as isQQDesktopDocsClient, mct as isElectronTencentDocsClient, mlt as _classCallCheck, nct as esm_exports, oct as ua, plt as init_createClass, rct as init_esm$7, uct as isAndroid, wct as isMobile, xct as isMac, yct as isIOS } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Dv as require_dist, Eg as omit, Ev as require_react, Jh as init_lodash, Qg as isEmpty, Tv as require_jsx_runtime, cv as init_space_separated_tokens, dv as init_comma_separated_tokens, pv as stringify, uv as stringify$1, wg as omitBy } from "./lib-chat-ui-D8Ji0f8n.js";
import { $C as f$3, $x as E$4, AC as N$1, AS as init_esm_browser, DC as F, DS as t$13, Dw as h$3, EC as EE, ES as o$14, FC as init_esm$12, Gw as tdw, Hw as n$12, IC as l$4, IS as E$3, Iw as o$13, Jw as translate, Kw as init_esm$11, LC as m$3, LS as O$2, Lw as d$1, MC as c$7, MS as v4, NC as eE, NS as c$8, OC as H$1, PC as i$6, Pw as i$7, QC as t$12, Qx as init_esm$9, RS as _$2, Sw as h$1, TC as A$1, TS as n$11, Uw as r$7, Ww as init_tencent_doc_report_es, Yw as initI18n, Zx as require_dist$1, _w as init__create_for_of_iterator_helper_loose, aw as LoadType, bC as _$4, cw as tdw$1, dS as g$2, dw as openUrl, fS as h$2, fw as init_pure$1, gw as _create_for_of_iterator_helper_loose, jC as Z$1, kC as M$2, lS as S$1, lw as init_esm$10, mS as m$2, nw as init_dist$8, sw as init_tencent_doc_report_es$1, tw as v$2, uS as _$3, vC as E$2, ww as S, yS as O$1 } from "./smartsheet-context-BgZsCXEw.js";
import { a as axios, i as init_axios } from "./vendor-http-msDtQjHY.js";
import { A as visit, C as VFile, N as remarkParse, O as init_unist_util_visit, S as init_vfile, c as whitespace, d as svg, f as hastToReact, g as init_remark_rehype, j as init_remark_parse, l as html, m as find, s as init_hast_util_whitespace, u as init_property_information, v as remarkRehype, x as unified, y as init_unified } from "./vendor-markdown-xvj5Od6x.js";
import { t as require_prop_types } from "./prop-types-Bsrd3Dp5.js";
import { t as require_react_is } from "./react-is-B-HABSz1.js";
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/core/DndContext.js
var import_react$48, DndContext;
var init_DndContext = __esmMin((() => {
	import_react$48 = /* @__PURE__ */ __toESM(require_react(), 1);
	DndContext = (0, import_react$48.createContext)({ dragDropManager: void 0 });
}));
//#endregion
//#region ../../node_modules/.pnpm/redux@4.2.1/node_modules/redux/es/redux.js
/**
* Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
*
* Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
* during build.
* @param {number} code
*/
function formatProdErrorMessage(code) {
	return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
}
/**
* @param {any} obj The object to inspect.
* @returns {boolean} True if the argument appears to be a plain object.
*/
function isPlainObject(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	var proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto;
}
/**
* @deprecated
*
* **We recommend using the `configureStore` method
* of the `@reduxjs/toolkit` package**, which replaces `createStore`.
*
* Redux Toolkit is our recommended approach for writing Redux logic today,
* including store setup, reducers, data fetching, and more.
*
* **For more details, please read this Redux docs page:**
* **https://redux.js.org/introduction/why-rtk-is-redux-today**
*
* `configureStore` from Redux Toolkit is an improved version of `createStore` that
* simplifies setup and helps avoid common bugs.
*
* You should not be using the `redux` core package by itself today, except for learning purposes.
* The `createStore` method from the core `redux` package will not be removed, but we encourage
* all users to migrate to using Redux Toolkit for all Redux code.
*
* If you want to use `createStore` without this visual deprecation warning, use
* the `legacy_createStore` import instead:
*
* `import { legacy_createStore as createStore} from 'redux'`
*
*/
function createStore(reducer, preloadedState, enhancer) {
	var _ref2;
	if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") throw new Error(formatProdErrorMessage(0));
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = void 0;
	}
	if (typeof enhancer !== "undefined") {
		if (typeof enhancer !== "function") throw new Error(formatProdErrorMessage(1));
		return enhancer(createStore)(reducer, preloadedState);
	}
	if (typeof reducer !== "function") throw new Error(formatProdErrorMessage(2));
	var currentReducer = reducer;
	var currentState = preloadedState;
	var currentListeners = [];
	var nextListeners = currentListeners;
	var isDispatching = false;
	/**
	* This makes a shallow copy of currentListeners so we can use
	* nextListeners as a temporary list while dispatching.
	*
	* This prevents any bugs around consumers calling
	* subscribe/unsubscribe in the middle of a dispatch.
	*/
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
	}
	/**
	* Reads the state tree managed by the store.
	*
	* @returns {any} The current state tree of your application.
	*/
	function getState() {
		if (isDispatching) throw new Error(formatProdErrorMessage(3));
		return currentState;
	}
	/**
	* Adds a change listener. It will be called any time an action is dispatched,
	* and some part of the state tree may potentially have changed. You may then
	* call `getState()` to read the current state tree inside the callback.
	*
	* You may call `dispatch()` from a change listener, with the following
	* caveats:
	*
	* 1. The subscriptions are snapshotted just before every `dispatch()` call.
	* If you subscribe or unsubscribe while the listeners are being invoked, this
	* will not have any effect on the `dispatch()` that is currently in progress.
	* However, the next `dispatch()` call, whether nested or not, will use a more
	* recent snapshot of the subscription list.
	*
	* 2. The listener should not expect to see all state changes, as the state
	* might have been updated multiple times during a nested `dispatch()` before
	* the listener is called. It is, however, guaranteed that all subscribers
	* registered before the `dispatch()` started will be called with the latest
	* state by the time it exits.
	*
	* @param {Function} listener A callback to be invoked on every dispatch.
	* @returns {Function} A function to remove this change listener.
	*/
	function subscribe(listener) {
		if (typeof listener !== "function") throw new Error(formatProdErrorMessage(4));
		if (isDispatching) throw new Error(formatProdErrorMessage(5));
		var isSubscribed = true;
		ensureCanMutateNextListeners();
		nextListeners.push(listener);
		return function unsubscribe() {
			if (!isSubscribed) return;
			if (isDispatching) throw new Error(formatProdErrorMessage(6));
			isSubscribed = false;
			ensureCanMutateNextListeners();
			var index = nextListeners.indexOf(listener);
			nextListeners.splice(index, 1);
			currentListeners = null;
		};
	}
	/**
	* Dispatches an action. It is the only way to trigger a state change.
	*
	* The `reducer` function, used to create the store, will be called with the
	* current state tree and the given `action`. Its return value will
	* be considered the **next** state of the tree, and the change listeners
	* will be notified.
	*
	* The base implementation only supports plain object actions. If you want to
	* dispatch a Promise, an Observable, a thunk, or something else, you need to
	* wrap your store creating function into the corresponding middleware. For
	* example, see the documentation for the `redux-thunk` package. Even the
	* middleware will eventually dispatch plain object actions using this method.
	*
	* @param {Object} action A plain object representing “what changed”. It is
	* a good idea to keep actions serializable so you can record and replay user
	* sessions, or use the time travelling `redux-devtools`. An action must have
	* a `type` property which may not be `undefined`. It is a good idea to use
	* string constants for action types.
	*
	* @returns {Object} For convenience, the same action object you dispatched.
	*
	* Note that, if you use a custom middleware, it may wrap `dispatch()` to
	* return something else (for example, a Promise you can await).
	*/
	function dispatch(action) {
		if (!isPlainObject(action)) throw new Error(formatProdErrorMessage(7));
		if (typeof action.type === "undefined") throw new Error(formatProdErrorMessage(8));
		if (isDispatching) throw new Error(formatProdErrorMessage(9));
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		} finally {
			isDispatching = false;
		}
		var listeners = currentListeners = nextListeners;
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			listener();
		}
		return action;
	}
	/**
	* Replaces the reducer currently used by the store to calculate the state.
	*
	* You might need this if your app implements code splitting and you want to
	* load some of the reducers dynamically. You might also need this if you
	* implement a hot reloading mechanism for Redux.
	*
	* @param {Function} nextReducer The reducer for the store to use instead.
	* @returns {void}
	*/
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== "function") throw new Error(formatProdErrorMessage(10));
		currentReducer = nextReducer;
		dispatch({ type: ActionTypes.REPLACE });
	}
	/**
	* Interoperability point for observable/reactive libraries.
	* @returns {observable} A minimal observable of state changes.
	* For more information, see the observable proposal:
	* https://github.com/tc39/proposal-observable
	*/
	function observable() {
		var _ref;
		var outerSubscribe = subscribe;
		return _ref = { 
		/**
		* The minimal observable subscription method.
		* @param {Object} observer Any object that can be used as an observer.
		* The observer object should have a `next` method.
		* @returns {subscription} An object with an `unsubscribe` method that can
		* be used to unsubscribe the observable from the store, and prevent further
		* emission of values from the observable.
		*/
subscribe: function subscribe(observer) {
			if (typeof observer !== "object" || observer === null) throw new Error(formatProdErrorMessage(11));
			function observeState() {
				if (observer.next) observer.next(getState());
			}
			observeState();
			return { unsubscribe: outerSubscribe(observeState) };
		} }, _ref[$$observable] = function() {
			return this;
		}, _ref;
	}
	dispatch({ type: ActionTypes.INIT });
	return _ref2 = {
		dispatch,
		subscribe,
		getState,
		replaceReducer
	}, _ref2[$$observable] = observable, _ref2;
}
var $$observable, randomString, ActionTypes;
var init_redux = __esmMin((() => {
	$$observable = (function() {
		return typeof Symbol === "function" && Symbol.observable || "@@observable";
	})();
	randomString = function randomString() {
		return Math.random().toString(36).substring(7).split("").join(".");
	};
	ActionTypes = {
		INIT: "@@redux/INIT" + randomString(),
		REPLACE: "@@redux/REPLACE" + randomString(),
		PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
			return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+invariant@4.0.2/node_modules/@react-dnd/invariant/dist/index.js
/**
* Use invariant() to assert state which your program assumes to be true.
*
* Provide sprintf-style format (only %s is supported) and arguments
* to provide information about what broke and what you were
* expecting.
*
* The invariant message will be stripped in production, but the invariant
* will remain to ensure logic does not differ in production.
*/ function invariant(condition, format, ...args) {
	if (isProduction()) {
		if (format === void 0) throw new Error("invariant requires an error message argument");
	}
	if (!condition) {
		let error;
		if (format === void 0) error = /* @__PURE__ */ new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			let argIndex = 0;
			error = new Error(format.replace(/%s/g, function() {
				return args[argIndex++];
			}));
			error.name = "Invariant Violation";
		}
		error.framesToPop = 1;
		throw error;
	}
}
function isProduction() {
	return typeof import_dist$1.default !== "undefined" && true;
}
var import_dist$1;
var init_dist$7 = __esmMin((() => {
	import_dist$1 = /* @__PURE__ */ __toESM(require_dist(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/js_utils.js
/**
* drop-in replacement for _.get
* @param obj
* @param path
* @param defaultValue
*/ function get(obj, path, defaultValue) {
	return path.split(".").reduce((a, c) => a && a[c] ? a[c] : defaultValue || null, obj);
}
/**
* drop-in replacement for _.without
*/ function without(items, item) {
	return items.filter((i) => i !== item);
}
/**
* drop-in replacement for _.isString
* @param input
*/ function isObject(input) {
	return typeof input === "object";
}
/**
* replacement for _.xor
* @param itemsA
* @param itemsB
*/ function xor(itemsA, itemsB) {
	const map = /* @__PURE__ */ new Map();
	const insertItem = (item) => {
		map.set(item, map.has(item) ? map.get(item) + 1 : 1);
	};
	itemsA.forEach(insertItem);
	itemsB.forEach(insertItem);
	const result = [];
	map.forEach((count, key) => {
		if (count === 1) result.push(key);
	});
	return result;
}
/**
* replacement for _.intersection
* @param itemsA
* @param itemsB
*/ function intersection(itemsA, itemsB) {
	return itemsA.filter((t) => itemsB.indexOf(t) > -1);
}
var init_js_utils = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/types.js
var INIT_COORDS, BEGIN_DRAG, PUBLISH_DRAG_SOURCE, HOVER, DROP, END_DRAG;
var init_types$5 = __esmMin((() => {
	INIT_COORDS = "dnd-core/INIT_COORDS";
	BEGIN_DRAG = "dnd-core/BEGIN_DRAG";
	PUBLISH_DRAG_SOURCE = "dnd-core/PUBLISH_DRAG_SOURCE";
	HOVER = "dnd-core/HOVER";
	DROP = "dnd-core/DROP";
	END_DRAG = "dnd-core/END_DRAG";
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/local/setClientOffset.js
function setClientOffset(clientOffset, sourceClientOffset) {
	return {
		type: INIT_COORDS,
		payload: {
			sourceClientOffset: sourceClientOffset || null,
			clientOffset: clientOffset || null
		}
	};
}
var init_setClientOffset = __esmMin((() => {
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/beginDrag.js
function createBeginDrag(manager) {
	return function beginDrag(sourceIds = [], options = { publishSource: true }) {
		const { publishSource = true, clientOffset, getSourceClientOffset } = options;
		const monitor = manager.getMonitor();
		const registry = manager.getRegistry();
		manager.dispatch(setClientOffset(clientOffset));
		verifyInvariants$1(sourceIds, monitor, registry);
		const sourceId = getDraggableSource(sourceIds, monitor);
		if (sourceId == null) {
			manager.dispatch(ResetCoordinatesAction);
			return;
		}
		let sourceClientOffset = null;
		if (clientOffset) {
			if (!getSourceClientOffset) throw new Error("getSourceClientOffset must be defined");
			verifyGetSourceClientOffsetIsFunction(getSourceClientOffset);
			sourceClientOffset = getSourceClientOffset(sourceId);
		}
		manager.dispatch(setClientOffset(clientOffset, sourceClientOffset));
		const item = registry.getSource(sourceId).beginDrag(monitor, sourceId);
		if (item == null) return;
		verifyItemIsObject(item);
		registry.pinSource(sourceId);
		const itemType = registry.getSourceType(sourceId);
		return {
			type: BEGIN_DRAG,
			payload: {
				itemType,
				item,
				sourceId,
				clientOffset: clientOffset || null,
				sourceClientOffset: sourceClientOffset || null,
				isSourcePublic: !!publishSource
			}
		};
	};
}
function verifyInvariants$1(sourceIds, monitor, registry) {
	invariant(!monitor.isDragging(), "Cannot call beginDrag while dragging.");
	sourceIds.forEach(function(sourceId) {
		invariant(registry.getSource(sourceId), "Expected sourceIds to be registered.");
	});
}
function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset) {
	invariant(typeof getSourceClientOffset === "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function verifyItemIsObject(item) {
	invariant(isObject(item), "Item must be an object.");
}
function getDraggableSource(sourceIds, monitor) {
	let sourceId = null;
	for (let i = sourceIds.length - 1; i >= 0; i--) if (monitor.canDragSource(sourceIds[i])) {
		sourceId = sourceIds[i];
		break;
	}
	return sourceId;
}
var ResetCoordinatesAction;
var init_beginDrag = __esmMin((() => {
	init_dist$7();
	init_js_utils();
	init_setClientOffset();
	init_types$5();
	ResetCoordinatesAction = {
		type: INIT_COORDS,
		payload: {
			clientOffset: null,
			sourceClientOffset: null
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/drop.js
function _defineProperty$4(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectSpread$3(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
			return Object.getOwnPropertyDescriptor(source, sym).enumerable;
		}));
		ownKeys.forEach(function(key) {
			_defineProperty$4(target, key, source[key]);
		});
	}
	return target;
}
function createDrop(manager) {
	return function drop(options = {}) {
		const monitor = manager.getMonitor();
		const registry = manager.getRegistry();
		verifyInvariants(monitor);
		getDroppableTargets(monitor).forEach((targetId, index) => {
			const dropResult = determineDropResult(targetId, index, registry, monitor);
			const action = {
				type: DROP,
				payload: { dropResult: _objectSpread$3({}, options, dropResult) }
			};
			manager.dispatch(action);
		});
	};
}
function verifyInvariants(monitor) {
	invariant(monitor.isDragging(), "Cannot call drop while not dragging.");
	invariant(!monitor.didDrop(), "Cannot call drop twice during one drag operation.");
}
function determineDropResult(targetId, index, registry, monitor) {
	const target = registry.getTarget(targetId);
	let dropResult = target ? target.drop(monitor, targetId) : void 0;
	verifyDropResultType(dropResult);
	if (typeof dropResult === "undefined") dropResult = index === 0 ? {} : monitor.getDropResult();
	return dropResult;
}
function verifyDropResultType(dropResult) {
	invariant(typeof dropResult === "undefined" || isObject(dropResult), "Drop result must either be an object or undefined.");
}
function getDroppableTargets(monitor) {
	const targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);
	targetIds.reverse();
	return targetIds;
}
var init_drop = __esmMin((() => {
	init_dist$7();
	init_js_utils();
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/endDrag.js
function createEndDrag(manager) {
	return function endDrag() {
		const monitor = manager.getMonitor();
		const registry = manager.getRegistry();
		verifyIsDragging(monitor);
		const sourceId = monitor.getSourceId();
		if (sourceId != null) {
			registry.getSource(sourceId, true).endDrag(monitor, sourceId);
			registry.unpinSource();
		}
		return { type: END_DRAG };
	};
}
function verifyIsDragging(monitor) {
	invariant(monitor.isDragging(), "Cannot call endDrag while not dragging.");
}
var init_endDrag = __esmMin((() => {
	init_dist$7();
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/matchesType.js
function matchesType(targetType, draggedItemType) {
	if (draggedItemType === null) return targetType === null;
	return Array.isArray(targetType) ? targetType.some((t) => t === draggedItemType) : targetType === draggedItemType;
}
var init_matchesType = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/hover.js
function createHover(manager) {
	return function hover(targetIdsArg, { clientOffset } = {}) {
		verifyTargetIdsIsArray(targetIdsArg);
		const targetIds = targetIdsArg.slice(0);
		const monitor = manager.getMonitor();
		const registry = manager.getRegistry();
		removeNonMatchingTargetIds(targetIds, registry, monitor.getItemType());
		checkInvariants(targetIds, monitor, registry);
		hoverAllTargets(targetIds, monitor, registry);
		return {
			type: HOVER,
			payload: {
				targetIds,
				clientOffset: clientOffset || null
			}
		};
	};
}
function verifyTargetIdsIsArray(targetIdsArg) {
	invariant(Array.isArray(targetIdsArg), "Expected targetIds to be an array.");
}
function checkInvariants(targetIds, monitor, registry) {
	invariant(monitor.isDragging(), "Cannot call hover while not dragging.");
	invariant(!monitor.didDrop(), "Cannot call hover after drop.");
	for (let i = 0; i < targetIds.length; i++) {
		const targetId = targetIds[i];
		invariant(targetIds.lastIndexOf(targetId) === i, "Expected targetIds to be unique in the passed array.");
		invariant(registry.getTarget(targetId), "Expected targetIds to be registered.");
	}
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
	for (let i = targetIds.length - 1; i >= 0; i--) {
		const targetId = targetIds[i];
		if (!matchesType(registry.getTargetType(targetId), draggedItemType)) targetIds.splice(i, 1);
	}
}
function hoverAllTargets(targetIds, monitor, registry) {
	targetIds.forEach(function(targetId) {
		registry.getTarget(targetId).hover(monitor, targetId);
	});
}
var init_hover = __esmMin((() => {
	init_dist$7();
	init_matchesType();
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/publishDragSource.js
function createPublishDragSource(manager) {
	return function publishDragSource() {
		if (manager.getMonitor().isDragging()) return { type: PUBLISH_DRAG_SOURCE };
	};
}
var init_publishDragSource = __esmMin((() => {
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/dragDrop/index.js
function createDragDropActions(manager) {
	return {
		beginDrag: createBeginDrag(manager),
		publishDragSource: createPublishDragSource(manager),
		hover: createHover(manager),
		drop: createDrop(manager),
		endDrag: createEndDrag(manager)
	};
}
var init_dragDrop = __esmMin((() => {
	init_beginDrag();
	init_drop();
	init_endDrag();
	init_hover();
	init_publishDragSource();
	init_types$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/classes/DragDropManagerImpl.js
var DragDropManagerImpl;
var init_DragDropManagerImpl = __esmMin((() => {
	init_dragDrop();
	DragDropManagerImpl = class {
		receiveBackend(backend) {
			this.backend = backend;
		}
		getMonitor() {
			return this.monitor;
		}
		getBackend() {
			return this.backend;
		}
		getRegistry() {
			return this.monitor.registry;
		}
		getActions() {
			const manager = this;
			const { dispatch } = this.store;
			function bindActionCreator(actionCreator) {
				return (...args) => {
					const action = actionCreator.apply(manager, args);
					if (typeof action !== "undefined") dispatch(action);
				};
			}
			const actions = createDragDropActions(this);
			return Object.keys(actions).reduce((boundActions, key) => {
				const action = actions[key];
				boundActions[key] = bindActionCreator(action);
				return boundActions;
			}, {});
		}
		dispatch(action) {
			this.store.dispatch(action);
		}
		constructor(store, monitor) {
			this.isSetUp = false;
			this.handleRefCountChange = () => {
				const shouldSetUp = this.store.getState().refCount > 0;
				if (this.backend) {
					if (shouldSetUp && !this.isSetUp) {
						this.backend.setup();
						this.isSetUp = true;
					} else if (!shouldSetUp && this.isSetUp) {
						this.backend.teardown();
						this.isSetUp = false;
					}
				}
			};
			this.store = store;
			this.monitor = monitor;
			store.subscribe(this.handleRefCountChange);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/coords.js
/**
* Coordinate addition
* @param a The first coordinate
* @param b The second coordinate
*/ function add(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	};
}
/**
* Coordinate subtraction
* @param a The first coordinate
* @param b The second coordinate
*/ function subtract(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
/**
* Returns the cartesian distance of the drag source component's position, based on its position
* at the time when the current drag operation has started, and the movement difference.
*
* Returns null if no item is being dragged.
*
* @param state The offset state to compute from
*/ function getSourceClientOffset(state) {
	const { clientOffset, initialClientOffset, initialSourceClientOffset } = state;
	if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) return null;
	return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
}
/**
* Determines the x,y offset between the client offset and the initial client offset
*
* @param state The offset state to compute from
*/ function getDifferenceFromInitialOffset(state) {
	const { clientOffset, initialClientOffset } = state;
	if (!clientOffset || !initialClientOffset) return null;
	return subtract(clientOffset, initialClientOffset);
}
var init_coords = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/dirtiness.js
/**
* Determines if the given handler IDs are dirty or not.
*
* @param dirtyIds The set of dirty handler ids
* @param handlerIds The set of handler ids to check
*/ function areDirty(dirtyIds, handlerIds) {
	if (dirtyIds === NONE) return false;
	if (dirtyIds === ALL || typeof handlerIds === "undefined") return true;
	return intersection(handlerIds, dirtyIds).length > 0;
}
var NONE, ALL;
var init_dirtiness = __esmMin((() => {
	init_js_utils();
	NONE = [];
	ALL = [];
	NONE.__IS_NONE__ = true;
	ALL.__IS_ALL__ = true;
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/classes/DragDropMonitorImpl.js
var DragDropMonitorImpl;
var init_DragDropMonitorImpl = __esmMin((() => {
	init_dist$7();
	init_coords();
	init_dirtiness();
	init_matchesType();
	DragDropMonitorImpl = class {
		subscribeToStateChange(listener, options = {}) {
			const { handlerIds } = options;
			invariant(typeof listener === "function", "listener must be a function.");
			invariant(typeof handlerIds === "undefined" || Array.isArray(handlerIds), "handlerIds, when specified, must be an array of strings.");
			let prevStateId = this.store.getState().stateId;
			const handleChange = () => {
				const state = this.store.getState();
				const currentStateId = state.stateId;
				try {
					if (!(currentStateId === prevStateId || currentStateId === prevStateId + 1 && !areDirty(state.dirtyHandlerIds, handlerIds))) listener();
				} finally {
					prevStateId = currentStateId;
				}
			};
			return this.store.subscribe(handleChange);
		}
		subscribeToOffsetChange(listener) {
			invariant(typeof listener === "function", "listener must be a function.");
			let previousState = this.store.getState().dragOffset;
			const handleChange = () => {
				const nextState = this.store.getState().dragOffset;
				if (nextState === previousState) return;
				previousState = nextState;
				listener();
			};
			return this.store.subscribe(handleChange);
		}
		canDragSource(sourceId) {
			if (!sourceId) return false;
			const source = this.registry.getSource(sourceId);
			invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
			if (this.isDragging()) return false;
			return source.canDrag(this, sourceId);
		}
		canDropOnTarget(targetId) {
			if (!targetId) return false;
			const target = this.registry.getTarget(targetId);
			invariant(target, `Expected to find a valid target. targetId=${targetId}`);
			if (!this.isDragging() || this.didDrop()) return false;
			return matchesType(this.registry.getTargetType(targetId), this.getItemType()) && target.canDrop(this, targetId);
		}
		isDragging() {
			return Boolean(this.getItemType());
		}
		isDraggingSource(sourceId) {
			if (!sourceId) return false;
			const source = this.registry.getSource(sourceId, true);
			invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
			if (!this.isDragging() || !this.isSourcePublic()) return false;
			if (this.registry.getSourceType(sourceId) !== this.getItemType()) return false;
			return source.isDragging(this, sourceId);
		}
		isOverTarget(targetId, options = { shallow: false }) {
			if (!targetId) return false;
			const { shallow } = options;
			if (!this.isDragging()) return false;
			const targetType = this.registry.getTargetType(targetId);
			const draggedItemType = this.getItemType();
			if (draggedItemType && !matchesType(targetType, draggedItemType)) return false;
			const targetIds = this.getTargetIds();
			if (!targetIds.length) return false;
			const index = targetIds.indexOf(targetId);
			if (shallow) return index === targetIds.length - 1;
			else return index > -1;
		}
		getItemType() {
			return this.store.getState().dragOperation.itemType;
		}
		getItem() {
			return this.store.getState().dragOperation.item;
		}
		getSourceId() {
			return this.store.getState().dragOperation.sourceId;
		}
		getTargetIds() {
			return this.store.getState().dragOperation.targetIds;
		}
		getDropResult() {
			return this.store.getState().dragOperation.dropResult;
		}
		didDrop() {
			return this.store.getState().dragOperation.didDrop;
		}
		isSourcePublic() {
			return Boolean(this.store.getState().dragOperation.isSourcePublic);
		}
		getInitialClientOffset() {
			return this.store.getState().dragOffset.initialClientOffset;
		}
		getInitialSourceClientOffset() {
			return this.store.getState().dragOffset.initialSourceClientOffset;
		}
		getClientOffset() {
			return this.store.getState().dragOffset.clientOffset;
		}
		getSourceClientOffset() {
			return getSourceClientOffset(this.store.getState().dragOffset);
		}
		getDifferenceFromInitialOffset() {
			return getDifferenceFromInitialOffset(this.store.getState().dragOffset);
		}
		constructor(store, registry) {
			this.store = store;
			this.registry = registry;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/makeRequestCall.js
function makeRequestCallFromTimer(callback) {
	return function requestCall() {
		const timeoutHandle = setTimeout(handleTimer, 0);
		const intervalHandle = setInterval(handleTimer, 50);
		function handleTimer() {
			clearTimeout(timeoutHandle);
			clearInterval(intervalHandle);
			callback();
		}
	};
}
function makeRequestCallFromMutationObserver(callback) {
	let toggle = 1;
	const observer = new BrowserMutationObserver(callback);
	const node = document.createTextNode("");
	observer.observe(node, { characterData: true });
	return function requestCall() {
		toggle = -toggle;
		node.data = toggle;
	};
}
var scope, BrowserMutationObserver, makeRequestCall;
var init_makeRequestCall = __esmMin((() => {
	scope = typeof globalThis !== "undefined" ? globalThis : self;
	BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
	makeRequestCall = typeof BrowserMutationObserver === "function" ? makeRequestCallFromMutationObserver : makeRequestCallFromTimer;
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/AsapQueue.js
var AsapQueue;
var init_AsapQueue = __esmMin((() => {
	init_makeRequestCall();
	AsapQueue = class {
		enqueueTask(task) {
			const { queue: q, requestFlush } = this;
			if (!q.length) {
				requestFlush();
				this.flushing = true;
			}
			q[q.length] = task;
		}
		constructor() {
			this.queue = [];
			this.pendingErrors = [];
			this.flushing = false;
			this.index = 0;
			this.capacity = 1024;
			this.flush = () => {
				const { queue: q } = this;
				while (this.index < q.length) {
					const currentIndex = this.index;
					this.index++;
					q[currentIndex].call();
					if (this.index > this.capacity) {
						for (let scan = 0, newLength = q.length - this.index; scan < newLength; scan++) q[scan] = q[scan + this.index];
						q.length -= this.index;
						this.index = 0;
					}
				}
				q.length = 0;
				this.index = 0;
				this.flushing = false;
			};
			this.registerPendingError = (err) => {
				this.pendingErrors.push(err);
				this.requestErrorThrow();
			};
			this.requestFlush = makeRequestCall(this.flush);
			this.requestErrorThrow = makeRequestCallFromTimer(() => {
				if (this.pendingErrors.length) throw this.pendingErrors.shift();
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/RawTask.js
var RawTask;
var init_RawTask = __esmMin((() => {
	RawTask = class {
		call() {
			try {
				this.task && this.task();
			} catch (error) {
				this.onError(error);
			} finally {
				this.task = null;
				this.release(this);
			}
		}
		constructor(onError, release) {
			this.onError = onError;
			this.release = release;
			this.task = null;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/TaskFactory.js
var TaskFactory;
var init_TaskFactory = __esmMin((() => {
	init_RawTask();
	TaskFactory = class {
		create(task) {
			const tasks = this.freeTasks;
			const t1 = tasks.length ? tasks.pop() : new RawTask(this.onError, (t) => tasks[tasks.length] = t);
			t1.task = task;
			return t1;
		}
		constructor(onError) {
			this.onError = onError;
			this.freeTasks = [];
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/asap.js
/**
* Calls a task as soon as possible after returning, in its own event, with priority
* over other events like animation, reflow, and repaint. An error thrown from an
* event will not interrupt, nor even substantially slow down the processing of
* other events, but will be rather postponed to a lower priority event.
* @param {{call}} task A callable object, typically a function that takes no
* arguments.
*/ function asap(task) {
	asapQueue.enqueueTask(taskFactory.create(task));
}
var asapQueue, taskFactory;
var init_asap = __esmMin((() => {
	init_AsapQueue();
	init_TaskFactory();
	asapQueue = new AsapQueue();
	taskFactory = new TaskFactory(asapQueue.registerPendingError);
}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/types.js
var init_types$4 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+asap@5.0.2/node_modules/@react-dnd/asap/dist/index.js
var init_dist$6 = __esmMin((() => {
	init_asap();
	init_AsapQueue();
	init_TaskFactory();
	init_types$4();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/actions/registry.js
function addSource(sourceId) {
	return {
		type: ADD_SOURCE,
		payload: { sourceId }
	};
}
function addTarget(targetId) {
	return {
		type: ADD_TARGET,
		payload: { targetId }
	};
}
function removeSource(sourceId) {
	return {
		type: REMOVE_SOURCE,
		payload: { sourceId }
	};
}
function removeTarget(targetId) {
	return {
		type: REMOVE_TARGET,
		payload: { targetId }
	};
}
var ADD_SOURCE, ADD_TARGET, REMOVE_SOURCE, REMOVE_TARGET;
var init_registry = __esmMin((() => {
	ADD_SOURCE = "dnd-core/ADD_SOURCE";
	ADD_TARGET = "dnd-core/ADD_TARGET";
	REMOVE_SOURCE = "dnd-core/REMOVE_SOURCE";
	REMOVE_TARGET = "dnd-core/REMOVE_TARGET";
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/contracts.js
function validateSourceContract(source) {
	invariant(typeof source.canDrag === "function", "Expected canDrag to be a function.");
	invariant(typeof source.beginDrag === "function", "Expected beginDrag to be a function.");
	invariant(typeof source.endDrag === "function", "Expected endDrag to be a function.");
}
function validateTargetContract(target) {
	invariant(typeof target.canDrop === "function", "Expected canDrop to be a function.");
	invariant(typeof target.hover === "function", "Expected hover to be a function.");
	invariant(typeof target.drop === "function", "Expected beginDrag to be a function.");
}
function validateType(type, allowArray) {
	if (allowArray && Array.isArray(type)) {
		type.forEach((t) => validateType(t, false));
		return;
	}
	invariant(typeof type === "string" || typeof type === "symbol", allowArray ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
var init_contracts = __esmMin((() => {
	init_dist$7();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/interfaces.js
var HandlerRole;
var init_interfaces$1 = __esmMin((() => {
	(function(HandlerRole) {
		HandlerRole["SOURCE"] = "SOURCE";
		HandlerRole["TARGET"] = "TARGET";
	})(HandlerRole || (HandlerRole = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/getNextUniqueId.js
function getNextUniqueId() {
	return nextUniqueId++;
}
var nextUniqueId;
var init_getNextUniqueId = __esmMin((() => {
	nextUniqueId = 0;
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/classes/HandlerRegistryImpl.js
function getNextHandlerId(role) {
	const id = getNextUniqueId().toString();
	switch (role) {
		case HandlerRole.SOURCE: return `S${id}`;
		case HandlerRole.TARGET: return `T${id}`;
		default: throw new Error(`Unknown Handler Role: ${role}`);
	}
}
function parseRoleFromHandlerId(handlerId) {
	switch (handlerId[0]) {
		case "S": return HandlerRole.SOURCE;
		case "T": return HandlerRole.TARGET;
		default: throw new Error(`Cannot parse handler ID: ${handlerId}`);
	}
}
function mapContainsValue(map, searchValue) {
	const entries = map.entries();
	let isDone = false;
	do {
		const { done, value: [, value] } = entries.next();
		if (value === searchValue) return true;
		isDone = !!done;
	} while (!isDone);
	return false;
}
var HandlerRegistryImpl;
var init_HandlerRegistryImpl = __esmMin((() => {
	init_dist$6();
	init_dist$7();
	init_registry();
	init_contracts();
	init_interfaces$1();
	init_getNextUniqueId();
	HandlerRegistryImpl = class {
		addSource(type, source) {
			validateType(type);
			validateSourceContract(source);
			const sourceId = this.addHandler(HandlerRole.SOURCE, type, source);
			this.store.dispatch(addSource(sourceId));
			return sourceId;
		}
		addTarget(type, target) {
			validateType(type, true);
			validateTargetContract(target);
			const targetId = this.addHandler(HandlerRole.TARGET, type, target);
			this.store.dispatch(addTarget(targetId));
			return targetId;
		}
		containsHandler(handler) {
			return mapContainsValue(this.dragSources, handler) || mapContainsValue(this.dropTargets, handler);
		}
		getSource(sourceId, includePinned = false) {
			invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
			return includePinned && sourceId === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(sourceId);
		}
		getTarget(targetId) {
			invariant(this.isTargetId(targetId), "Expected a valid target ID.");
			return this.dropTargets.get(targetId);
		}
		getSourceType(sourceId) {
			invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
			return this.types.get(sourceId);
		}
		getTargetType(targetId) {
			invariant(this.isTargetId(targetId), "Expected a valid target ID.");
			return this.types.get(targetId);
		}
		isSourceId(handlerId) {
			return parseRoleFromHandlerId(handlerId) === HandlerRole.SOURCE;
		}
		isTargetId(handlerId) {
			return parseRoleFromHandlerId(handlerId) === HandlerRole.TARGET;
		}
		removeSource(sourceId) {
			invariant(this.getSource(sourceId), "Expected an existing source.");
			this.store.dispatch(removeSource(sourceId));
			asap(() => {
				this.dragSources.delete(sourceId);
				this.types.delete(sourceId);
			});
		}
		removeTarget(targetId) {
			invariant(this.getTarget(targetId), "Expected an existing target.");
			this.store.dispatch(removeTarget(targetId));
			this.dropTargets.delete(targetId);
			this.types.delete(targetId);
		}
		pinSource(sourceId) {
			const source = this.getSource(sourceId);
			invariant(source, "Expected an existing source.");
			this.pinnedSourceId = sourceId;
			this.pinnedSource = source;
		}
		unpinSource() {
			invariant(this.pinnedSource, "No source is pinned at the time.");
			this.pinnedSourceId = null;
			this.pinnedSource = null;
		}
		addHandler(role, type, handler) {
			const id = getNextHandlerId(role);
			this.types.set(id, type);
			if (role === HandlerRole.SOURCE) this.dragSources.set(id, handler);
			else if (role === HandlerRole.TARGET) this.dropTargets.set(id, handler);
			return id;
		}
		constructor(store) {
			this.types = /* @__PURE__ */ new Map();
			this.dragSources = /* @__PURE__ */ new Map();
			this.dropTargets = /* @__PURE__ */ new Map();
			this.pinnedSourceId = null;
			this.pinnedSource = null;
			this.store = store;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/utils/equality.js
/**
* Determine if two cartesian coordinate offsets are equal
* @param offsetA
* @param offsetB
*/ function areCoordsEqual(offsetA, offsetB) {
	if (!offsetA && !offsetB) return true;
	else if (!offsetA || !offsetB) return false;
	else return offsetA.x === offsetB.x && offsetA.y === offsetB.y;
}
/**
* Determines if two arrays of items are equal
* @param a The first array of items
* @param b The second array of items
*/ function areArraysEqual(a, b, isEqual = strictEquality) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; ++i) if (!isEqual(a[i], b[i])) return false;
	return true;
}
var strictEquality;
var init_equality = __esmMin((() => {
	strictEquality = (a, b) => a === b;
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/dirtyHandlerIds.js
function reduce$5(_state = NONE, action) {
	switch (action.type) {
		case HOVER: break;
		case ADD_SOURCE:
		case ADD_TARGET:
		case REMOVE_TARGET:
		case REMOVE_SOURCE: return NONE;
		case BEGIN_DRAG:
		case PUBLISH_DRAG_SOURCE:
		case END_DRAG:
		case DROP:
		default: return ALL;
	}
	const { targetIds = [], prevTargetIds = [] } = action.payload;
	const result = xor(targetIds, prevTargetIds);
	if (!(result.length > 0 || !areArraysEqual(targetIds, prevTargetIds))) return NONE;
	const prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
	const innermostTargetId = targetIds[targetIds.length - 1];
	if (prevInnermostTargetId !== innermostTargetId) {
		if (prevInnermostTargetId) result.push(prevInnermostTargetId);
		if (innermostTargetId) result.push(innermostTargetId);
	}
	return result;
}
var init_dirtyHandlerIds = __esmMin((() => {
	init_dragDrop();
	init_registry();
	init_dirtiness();
	init_equality();
	init_js_utils();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/dragOffset.js
function _defineProperty$3(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectSpread$2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
			return Object.getOwnPropertyDescriptor(source, sym).enumerable;
		}));
		ownKeys.forEach(function(key) {
			_defineProperty$3(target, key, source[key]);
		});
	}
	return target;
}
function reduce$4(state = initialState$2, action) {
	const { payload } = action;
	switch (action.type) {
		case INIT_COORDS:
		case BEGIN_DRAG: return {
			initialSourceClientOffset: payload.sourceClientOffset,
			initialClientOffset: payload.clientOffset,
			clientOffset: payload.clientOffset
		};
		case HOVER:
			if (areCoordsEqual(state.clientOffset, payload.clientOffset)) return state;
			return _objectSpread$2({}, state, { clientOffset: payload.clientOffset });
		case END_DRAG:
		case DROP: return initialState$2;
		default: return state;
	}
}
var initialState$2;
var init_dragOffset = __esmMin((() => {
	init_dragDrop();
	init_equality();
	initialState$2 = {
		initialSourceClientOffset: null,
		initialClientOffset: null,
		clientOffset: null
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/dragOperation.js
function _defineProperty$2(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectSpread$1(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
			return Object.getOwnPropertyDescriptor(source, sym).enumerable;
		}));
		ownKeys.forEach(function(key) {
			_defineProperty$2(target, key, source[key]);
		});
	}
	return target;
}
function reduce$3(state = initialState$1, action) {
	const { payload } = action;
	switch (action.type) {
		case BEGIN_DRAG: return _objectSpread$1({}, state, {
			itemType: payload.itemType,
			item: payload.item,
			sourceId: payload.sourceId,
			isSourcePublic: payload.isSourcePublic,
			dropResult: null,
			didDrop: false
		});
		case PUBLISH_DRAG_SOURCE: return _objectSpread$1({}, state, { isSourcePublic: true });
		case HOVER: return _objectSpread$1({}, state, { targetIds: payload.targetIds });
		case REMOVE_TARGET:
			if (state.targetIds.indexOf(payload.targetId) === -1) return state;
			return _objectSpread$1({}, state, { targetIds: without(state.targetIds, payload.targetId) });
		case DROP: return _objectSpread$1({}, state, {
			dropResult: payload.dropResult,
			didDrop: true,
			targetIds: []
		});
		case END_DRAG: return _objectSpread$1({}, state, {
			itemType: null,
			item: null,
			sourceId: null,
			dropResult: null,
			didDrop: false,
			isSourcePublic: null,
			targetIds: []
		});
		default: return state;
	}
}
var initialState$1;
var init_dragOperation = __esmMin((() => {
	init_dragDrop();
	init_registry();
	init_js_utils();
	initialState$1 = {
		itemType: null,
		item: null,
		sourceId: null,
		targetIds: [],
		dropResult: null,
		didDrop: false,
		isSourcePublic: null
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/refCount.js
function reduce$2(state = 0, action) {
	switch (action.type) {
		case ADD_SOURCE:
		case ADD_TARGET: return state + 1;
		case REMOVE_SOURCE:
		case REMOVE_TARGET: return state - 1;
		default: return state;
	}
}
var init_refCount = __esmMin((() => {
	init_registry();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/stateId.js
function reduce$1(state = 0) {
	return state + 1;
}
var init_stateId = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/reducers/index.js
function _defineProperty$1(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
			return Object.getOwnPropertyDescriptor(source, sym).enumerable;
		}));
		ownKeys.forEach(function(key) {
			_defineProperty$1(target, key, source[key]);
		});
	}
	return target;
}
function reduce(state = {}, action) {
	return {
		dirtyHandlerIds: reduce$5(state.dirtyHandlerIds, {
			type: action.type,
			payload: _objectSpread({}, action.payload, { prevTargetIds: get(state, "dragOperation.targetIds", []) })
		}),
		dragOffset: reduce$4(state.dragOffset, action),
		refCount: reduce$2(state.refCount, action),
		dragOperation: reduce$3(state.dragOperation, action),
		stateId: reduce$1(state.stateId)
	};
}
var init_reducers = __esmMin((() => {
	init_js_utils();
	init_dirtyHandlerIds();
	init_dragOffset();
	init_dragOperation();
	init_refCount();
	init_stateId();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/createDragDropManager.js
function createDragDropManager(backendFactory, globalContext = void 0, backendOptions = {}, debugMode = false) {
	const store = makeStoreInstance(debugMode);
	const monitor = new DragDropMonitorImpl(store, new HandlerRegistryImpl(store));
	const manager = new DragDropManagerImpl(store, monitor);
	const backend = backendFactory(manager, globalContext, backendOptions);
	manager.receiveBackend(backend);
	return manager;
}
function makeStoreInstance(debugMode) {
	const reduxDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;
	return createStore(reduce, debugMode && reduxDevTools && reduxDevTools({
		name: "dnd-core",
		instanceId: "dnd-core"
	}));
}
var init_createDragDropManager = __esmMin((() => {
	init_redux();
	init_DragDropManagerImpl();
	init_DragDropMonitorImpl();
	init_HandlerRegistryImpl();
	init_reducers();
}));
//#endregion
//#region ../../node_modules/.pnpm/dnd-core@16.0.1/node_modules/dnd-core/dist/index.js
var init_dist$5 = __esmMin((() => {
	init_createDragDropManager();
	init_interfaces$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/core/DndProvider.js
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i = 0;
	for (; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function getDndContextValue(props) {
	if ("manager" in props) return [{ dragDropManager: props.manager }, false];
	return [createSingletonDndContext(props.backend, props.context, props.options, props.debugMode), !props.context];
}
function createSingletonDndContext(backend, context = getGlobalContext(), options, debugMode) {
	const ctx = context;
	if (!ctx[INSTANCE_SYM]) ctx[INSTANCE_SYM] = { dragDropManager: createDragDropManager(backend, context, options, debugMode) };
	return ctx[INSTANCE_SYM];
}
function getGlobalContext() {
	return typeof globalThis !== "undefined" ? globalThis : window;
}
var import_jsx_runtime, import_react$47, refCount, INSTANCE_SYM, DndProvider;
var init_DndProvider = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	init_dist$5();
	import_react$47 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_DndContext();
	refCount = 0;
	INSTANCE_SYM = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
	DndProvider = /*#__PURE__*/ (0, import_react$47.memo)(function DndProvider(_param) {
		var { children } = _param;
		const [manager, isGlobalInstance] = getDndContextValue(_objectWithoutProperties(_param, ["children"]));
		/**
		* If the global context was used to store the DND context
		* then where theres no more references to it we should
		* clean it up to avoid memory leaks
		*/ (0, import_react$47.useEffect)(() => {
			if (isGlobalInstance) {
				const context = getGlobalContext();
				++refCount;
				return () => {
					if (--refCount === 0) context[INSTANCE_SYM] = null;
				};
			}
		}, []);
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DndContext.Provider, {
			value: manager,
			children
		});
	});
}));
var init_DragPreviewImage = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/core/index.js
var init_core = __esmMin((() => {
	init_DndContext();
	init_DndProvider();
	init_DragPreviewImage();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/types.js
var init_types$3 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			for (i = length; i-- !== 0;) {
				var key = keys[i];
				if (!equal(a[key], b[key])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useIsomorphicLayoutEffect.js
var import_react$45, useIsomorphicLayoutEffect;
var init_useIsomorphicLayoutEffect = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react(), 1);
	useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react$45.useLayoutEffect : import_react$45.useEffect;
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useCollector.js
/**
*
* @param monitor The monitor to collect state from
* @param collect The collecting function
* @param onUpdate A method to invoke when updates occur
*/ function useCollector(monitor, collect, onUpdate) {
	const [collected, setCollected] = (0, import_react$44.useState)(() => collect(monitor));
	const updateCollected = (0, import_react$44.useCallback)(() => {
		const nextValue = collect(monitor);
		if (!(0, import_fast_deep_equal.default)(collected, nextValue)) {
			setCollected(nextValue);
			if (onUpdate) onUpdate();
		}
	}, [
		collected,
		monitor,
		onUpdate
	]);
	useIsomorphicLayoutEffect(updateCollected);
	return [collected, updateCollected];
}
var import_fast_deep_equal, import_react$44;
var init_useCollector = __esmMin((() => {
	import_fast_deep_equal = /* @__PURE__ */ __toESM(require_fast_deep_equal(), 1);
	import_react$44 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useIsomorphicLayoutEffect();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useMonitorOutput.js
function useMonitorOutput(monitor, collect, onCollect) {
	const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
	useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
		const handlerId = monitor.getHandlerId();
		if (handlerId == null) return;
		return monitor.subscribeToStateChange(updateCollected, { handlerIds: [handlerId] });
	}, [monitor, updateCollected]);
	return collected;
}
var init_useMonitorOutput = __esmMin((() => {
	init_useCollector();
	init_useIsomorphicLayoutEffect();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useCollectedProps.js
function useCollectedProps(collector, monitor, connector) {
	return useMonitorOutput(monitor, collector || (() => ({})), () => connector.reconnect());
}
var init_useCollectedProps = __esmMin((() => {
	init_useMonitorOutput();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useOptionalFactory.js
function useOptionalFactory(arg, deps) {
	const memoDeps = [...deps || []];
	if (deps == null && typeof arg !== "function") memoDeps.push(arg);
	return (0, import_react$43.useMemo)(() => {
		return typeof arg === "function" ? arg() : arg;
	}, memoDeps);
}
var import_react$43;
var init_useOptionalFactory = __esmMin((() => {
	import_react$43 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/connectors.js
function useConnectDragSource(connector) {
	return (0, import_react$42.useMemo)(() => connector.hooks.dragSource(), [connector]);
}
function useConnectDragPreview(connector) {
	return (0, import_react$42.useMemo)(() => connector.hooks.dragPreview(), [connector]);
}
var import_react$42;
var init_connectors$2 = __esmMin((() => {
	import_react$42 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/DragSourceMonitorImpl.js
var isCallingCanDrag, isCallingIsDragging, DragSourceMonitorImpl;
var init_DragSourceMonitorImpl = __esmMin((() => {
	init_dist$7();
	isCallingCanDrag = false;
	isCallingIsDragging = false;
	DragSourceMonitorImpl = class {
		receiveHandlerId(sourceId) {
			this.sourceId = sourceId;
		}
		getHandlerId() {
			return this.sourceId;
		}
		canDrag() {
			invariant(!isCallingCanDrag, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
			try {
				isCallingCanDrag = true;
				return this.internalMonitor.canDragSource(this.sourceId);
			} finally {
				isCallingCanDrag = false;
			}
		}
		isDragging() {
			if (!this.sourceId) return false;
			invariant(!isCallingIsDragging, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
			try {
				isCallingIsDragging = true;
				return this.internalMonitor.isDraggingSource(this.sourceId);
			} finally {
				isCallingIsDragging = false;
			}
		}
		subscribeToStateChange(listener, options) {
			return this.internalMonitor.subscribeToStateChange(listener, options);
		}
		isDraggingSource(sourceId) {
			return this.internalMonitor.isDraggingSource(sourceId);
		}
		isOverTarget(targetId, options) {
			return this.internalMonitor.isOverTarget(targetId, options);
		}
		getTargetIds() {
			return this.internalMonitor.getTargetIds();
		}
		isSourcePublic() {
			return this.internalMonitor.isSourcePublic();
		}
		getSourceId() {
			return this.internalMonitor.getSourceId();
		}
		subscribeToOffsetChange(listener) {
			return this.internalMonitor.subscribeToOffsetChange(listener);
		}
		canDragSource(sourceId) {
			return this.internalMonitor.canDragSource(sourceId);
		}
		canDropOnTarget(targetId) {
			return this.internalMonitor.canDropOnTarget(targetId);
		}
		getItemType() {
			return this.internalMonitor.getItemType();
		}
		getItem() {
			return this.internalMonitor.getItem();
		}
		getDropResult() {
			return this.internalMonitor.getDropResult();
		}
		didDrop() {
			return this.internalMonitor.didDrop();
		}
		getInitialClientOffset() {
			return this.internalMonitor.getInitialClientOffset();
		}
		getInitialSourceClientOffset() {
			return this.internalMonitor.getInitialSourceClientOffset();
		}
		getSourceClientOffset() {
			return this.internalMonitor.getSourceClientOffset();
		}
		getClientOffset() {
			return this.internalMonitor.getClientOffset();
		}
		getDifferenceFromInitialOffset() {
			return this.internalMonitor.getDifferenceFromInitialOffset();
		}
		constructor(manager) {
			this.sourceId = null;
			this.internalMonitor = manager.getMonitor();
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/DropTargetMonitorImpl.js
var isCallingCanDrop, DropTargetMonitorImpl;
var init_DropTargetMonitorImpl = __esmMin((() => {
	init_dist$7();
	isCallingCanDrop = false;
	DropTargetMonitorImpl = class {
		receiveHandlerId(targetId) {
			this.targetId = targetId;
		}
		getHandlerId() {
			return this.targetId;
		}
		subscribeToStateChange(listener, options) {
			return this.internalMonitor.subscribeToStateChange(listener, options);
		}
		canDrop() {
			if (!this.targetId) return false;
			invariant(!isCallingCanDrop, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
			try {
				isCallingCanDrop = true;
				return this.internalMonitor.canDropOnTarget(this.targetId);
			} finally {
				isCallingCanDrop = false;
			}
		}
		isOver(options) {
			if (!this.targetId) return false;
			return this.internalMonitor.isOverTarget(this.targetId, options);
		}
		getItemType() {
			return this.internalMonitor.getItemType();
		}
		getItem() {
			return this.internalMonitor.getItem();
		}
		getDropResult() {
			return this.internalMonitor.getDropResult();
		}
		didDrop() {
			return this.internalMonitor.didDrop();
		}
		getInitialClientOffset() {
			return this.internalMonitor.getInitialClientOffset();
		}
		getInitialSourceClientOffset() {
			return this.internalMonitor.getInitialSourceClientOffset();
		}
		getSourceClientOffset() {
			return this.internalMonitor.getSourceClientOffset();
		}
		getClientOffset() {
			return this.internalMonitor.getClientOffset();
		}
		getDifferenceFromInitialOffset() {
			return this.internalMonitor.getDifferenceFromInitialOffset();
		}
		constructor(manager) {
			this.targetId = null;
			this.internalMonitor = manager.getMonitor();
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/registration.js
function registerTarget(type, target, manager) {
	const registry = manager.getRegistry();
	const targetId = registry.addTarget(type, target);
	return [targetId, () => registry.removeTarget(targetId)];
}
function registerSource(type, source, manager) {
	const registry = manager.getRegistry();
	const sourceId = registry.addSource(type, source);
	return [sourceId, () => registry.removeSource(sourceId)];
}
var init_registration = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@react-dnd+shallowequal@4.0.2/node_modules/@react-dnd/shallowequal/dist/index.js
function shallowEqual(objA, objB, compare, compareContext) {
	let compareResult = compare ? compare.call(compareContext, objA, objB) : void 0;
	if (compareResult !== void 0) return !!compareResult;
	if (objA === objB) return true;
	if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) return false;
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;
	const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	for (let idx = 0; idx < keysA.length; idx++) {
		const key = keysA[idx];
		if (!bHasOwnProperty(key)) return false;
		const valueA = objA[key];
		const valueB = objB[key];
		compareResult = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
		if (compareResult === false || compareResult === void 0 && valueA !== valueB) return false;
	}
	return true;
}
var init_dist$4 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/isRef.js
function isRef(obj) {
	return obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, "current");
}
var init_isRef = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/wrapConnectorHooks.js
function throwIfCompositeComponentElement(element) {
	if (typeof element.type === "string") return;
	const displayName = element.type.displayName || element.type.name || "the component";
	throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${displayName} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function wrapHookToRecognizeElement(hook) {
	return (elementOrNode = null, options = null) => {
		if (!(0, import_react$41.isValidElement)(elementOrNode)) {
			const node = elementOrNode;
			hook(node, options);
			return node;
		}
		const element = elementOrNode;
		throwIfCompositeComponentElement(element);
		return cloneWithRef(element, options ? (node) => hook(node, options) : hook);
	};
}
function wrapConnectorHooks(hooks) {
	const wrappedHooks = {};
	Object.keys(hooks).forEach((key) => {
		const hook = hooks[key];
		if (key.endsWith("Ref")) wrappedHooks[key] = hooks[key];
		else {
			const wrappedHook = wrapHookToRecognizeElement(hook);
			wrappedHooks[key] = () => wrappedHook;
		}
	});
	return wrappedHooks;
}
function setRef(ref, node) {
	if (typeof ref === "function") ref(node);
	else ref.current = node;
}
function cloneWithRef(element, newRef) {
	const previousRef = element.ref;
	invariant(typeof previousRef !== "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs");
	if (!previousRef) return (0, import_react$41.cloneElement)(element, { ref: newRef });
	else return (0, import_react$41.cloneElement)(element, { ref: (node) => {
		setRef(previousRef, node);
		setRef(newRef, node);
	} });
}
var import_react$41;
var init_wrapConnectorHooks = __esmMin((() => {
	init_dist$7();
	import_react$41 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/SourceConnector.js
var SourceConnector;
var init_SourceConnector = __esmMin((() => {
	init_dist$4();
	init_isRef();
	init_wrapConnectorHooks();
	SourceConnector = class {
		receiveHandlerId(newHandlerId) {
			if (this.handlerId === newHandlerId) return;
			this.handlerId = newHandlerId;
			this.reconnect();
		}
		get connectTarget() {
			return this.dragSource;
		}
		get dragSourceOptions() {
			return this.dragSourceOptionsInternal;
		}
		set dragSourceOptions(options) {
			this.dragSourceOptionsInternal = options;
		}
		get dragPreviewOptions() {
			return this.dragPreviewOptionsInternal;
		}
		set dragPreviewOptions(options) {
			this.dragPreviewOptionsInternal = options;
		}
		reconnect() {
			const didChange = this.reconnectDragSource();
			this.reconnectDragPreview(didChange);
		}
		reconnectDragSource() {
			const dragSource = this.dragSource;
			const didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
			if (didChange) this.disconnectDragSource();
			if (!this.handlerId) return didChange;
			if (!dragSource) {
				this.lastConnectedDragSource = dragSource;
				return didChange;
			}
			if (didChange) {
				this.lastConnectedHandlerId = this.handlerId;
				this.lastConnectedDragSource = dragSource;
				this.lastConnectedDragSourceOptions = this.dragSourceOptions;
				this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
			}
			return didChange;
		}
		reconnectDragPreview(forceDidChange = false) {
			const dragPreview = this.dragPreview;
			const didChange = forceDidChange || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
			if (didChange) this.disconnectDragPreview();
			if (!this.handlerId) return;
			if (!dragPreview) {
				this.lastConnectedDragPreview = dragPreview;
				return;
			}
			if (didChange) {
				this.lastConnectedHandlerId = this.handlerId;
				this.lastConnectedDragPreview = dragPreview;
				this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
				this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
			}
		}
		didHandlerIdChange() {
			return this.lastConnectedHandlerId !== this.handlerId;
		}
		didConnectedDragSourceChange() {
			return this.lastConnectedDragSource !== this.dragSource;
		}
		didConnectedDragPreviewChange() {
			return this.lastConnectedDragPreview !== this.dragPreview;
		}
		didDragSourceOptionsChange() {
			return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
		}
		didDragPreviewOptionsChange() {
			return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
		}
		disconnectDragSource() {
			if (this.dragSourceUnsubscribe) {
				this.dragSourceUnsubscribe();
				this.dragSourceUnsubscribe = void 0;
			}
		}
		disconnectDragPreview() {
			if (this.dragPreviewUnsubscribe) {
				this.dragPreviewUnsubscribe();
				this.dragPreviewUnsubscribe = void 0;
				this.dragPreviewNode = null;
				this.dragPreviewRef = null;
			}
		}
		get dragSource() {
			return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
		}
		get dragPreview() {
			return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
		}
		clearDragSource() {
			this.dragSourceNode = null;
			this.dragSourceRef = null;
		}
		clearDragPreview() {
			this.dragPreviewNode = null;
			this.dragPreviewRef = null;
		}
		constructor(backend) {
			this.hooks = wrapConnectorHooks({
				dragSource: (node, options) => {
					this.clearDragSource();
					this.dragSourceOptions = options || null;
					if (isRef(node)) this.dragSourceRef = node;
					else this.dragSourceNode = node;
					this.reconnectDragSource();
				},
				dragPreview: (node, options) => {
					this.clearDragPreview();
					this.dragPreviewOptions = options || null;
					if (isRef(node)) this.dragPreviewRef = node;
					else this.dragPreviewNode = node;
					this.reconnectDragPreview();
				}
			});
			this.handlerId = null;
			this.dragSourceRef = null;
			this.dragSourceOptionsInternal = null;
			this.dragPreviewRef = null;
			this.dragPreviewOptionsInternal = null;
			this.lastConnectedHandlerId = null;
			this.lastConnectedDragSource = null;
			this.lastConnectedDragSourceOptions = null;
			this.lastConnectedDragPreview = null;
			this.lastConnectedDragPreviewOptions = null;
			this.backend = backend;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/TargetConnector.js
var TargetConnector;
var init_TargetConnector = __esmMin((() => {
	init_dist$4();
	init_isRef();
	init_wrapConnectorHooks();
	TargetConnector = class {
		get connectTarget() {
			return this.dropTarget;
		}
		reconnect() {
			const didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
			if (didChange) this.disconnectDropTarget();
			const dropTarget = this.dropTarget;
			if (!this.handlerId) return;
			if (!dropTarget) {
				this.lastConnectedDropTarget = dropTarget;
				return;
			}
			if (didChange) {
				this.lastConnectedHandlerId = this.handlerId;
				this.lastConnectedDropTarget = dropTarget;
				this.lastConnectedDropTargetOptions = this.dropTargetOptions;
				this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
			}
		}
		receiveHandlerId(newHandlerId) {
			if (newHandlerId === this.handlerId) return;
			this.handlerId = newHandlerId;
			this.reconnect();
		}
		get dropTargetOptions() {
			return this.dropTargetOptionsInternal;
		}
		set dropTargetOptions(options) {
			this.dropTargetOptionsInternal = options;
		}
		didHandlerIdChange() {
			return this.lastConnectedHandlerId !== this.handlerId;
		}
		didDropTargetChange() {
			return this.lastConnectedDropTarget !== this.dropTarget;
		}
		didOptionsChange() {
			return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
		}
		disconnectDropTarget() {
			if (this.unsubscribeDropTarget) {
				this.unsubscribeDropTarget();
				this.unsubscribeDropTarget = void 0;
			}
		}
		get dropTarget() {
			return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
		}
		clearDropTarget() {
			this.dropTargetRef = null;
			this.dropTargetNode = null;
		}
		constructor(backend) {
			this.hooks = wrapConnectorHooks({ dropTarget: (node, options) => {
				this.clearDropTarget();
				this.dropTargetOptions = options;
				if (isRef(node)) this.dropTargetRef = node;
				else this.dropTargetNode = node;
				this.reconnect();
			} });
			this.handlerId = null;
			this.dropTargetRef = null;
			this.dropTargetOptionsInternal = null;
			this.lastConnectedHandlerId = null;
			this.lastConnectedDropTarget = null;
			this.lastConnectedDropTargetOptions = null;
			this.backend = backend;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/internals/index.js
var init_internals = __esmMin((() => {
	init_DragSourceMonitorImpl();
	init_DropTargetMonitorImpl();
	init_registration();
	init_SourceConnector();
	init_TargetConnector();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDragDropManager.js
/**
* A hook to retrieve the DragDropManager from Context
*/ function useDragDropManager() {
	const { dragDropManager } = (0, import_react$40.useContext)(DndContext);
	invariant(dragDropManager != null, "Expected drag drop context");
	return dragDropManager;
}
var import_react$40;
var init_useDragDropManager = __esmMin((() => {
	init_dist$7();
	import_react$40 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useDragSourceConnector.js
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
	const manager = useDragDropManager();
	const connector = (0, import_react$39.useMemo)(() => new SourceConnector(manager.getBackend()), [manager]);
	useIsomorphicLayoutEffect(() => {
		connector.dragSourceOptions = dragSourceOptions || null;
		connector.reconnect();
		return () => connector.disconnectDragSource();
	}, [connector, dragSourceOptions]);
	useIsomorphicLayoutEffect(() => {
		connector.dragPreviewOptions = dragPreviewOptions || null;
		connector.reconnect();
		return () => connector.disconnectDragPreview();
	}, [connector, dragPreviewOptions]);
	return connector;
}
var import_react$39;
var init_useDragSourceConnector = __esmMin((() => {
	import_react$39 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internals();
	init_useDragDropManager();
	init_useIsomorphicLayoutEffect();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useDragSourceMonitor.js
function useDragSourceMonitor() {
	const manager = useDragDropManager();
	return (0, import_react$38.useMemo)(() => new DragSourceMonitorImpl(manager), [manager]);
}
var import_react$38;
var init_useDragSourceMonitor = __esmMin((() => {
	import_react$38 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internals();
	init_useDragDropManager();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/DragSourceImpl.js
var DragSourceImpl;
var init_DragSourceImpl = __esmMin((() => {
	DragSourceImpl = class {
		beginDrag() {
			const spec = this.spec;
			const monitor = this.monitor;
			let result = null;
			if (typeof spec.item === "object") result = spec.item;
			else if (typeof spec.item === "function") result = spec.item(monitor);
			else result = {};
			return result !== null && result !== void 0 ? result : null;
		}
		canDrag() {
			const spec = this.spec;
			const monitor = this.monitor;
			if (typeof spec.canDrag === "boolean") return spec.canDrag;
			else if (typeof spec.canDrag === "function") return spec.canDrag(monitor);
			else return true;
		}
		isDragging(globalMonitor, target) {
			const spec = this.spec;
			const monitor = this.monitor;
			const { isDragging } = spec;
			return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
		}
		endDrag() {
			const spec = this.spec;
			const monitor = this.monitor;
			const connector = this.connector;
			const { end } = spec;
			if (end) end(monitor.getItem(), monitor);
			connector.reconnect();
		}
		constructor(spec, monitor, connector) {
			this.spec = spec;
			this.monitor = monitor;
			this.connector = connector;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useDragSource.js
function useDragSource(spec, monitor, connector) {
	const handler = (0, import_react$37.useMemo)(() => new DragSourceImpl(spec, monitor, connector), [monitor, connector]);
	(0, import_react$37.useEffect)(() => {
		handler.spec = spec;
	}, [spec]);
	return handler;
}
var import_react$37;
var init_useDragSource = __esmMin((() => {
	import_react$37 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_DragSourceImpl();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useDragType.js
function useDragType(spec) {
	return (0, import_react$36.useMemo)(() => {
		const result = spec.type;
		invariant(result != null, "spec.type must be defined");
		return result;
	}, [spec]);
}
var import_react$36;
var init_useDragType = __esmMin((() => {
	init_dist$7();
	import_react$36 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useRegisteredDragSource.js
function useRegisteredDragSource(spec, monitor, connector) {
	const manager = useDragDropManager();
	const handler = useDragSource(spec, monitor, connector);
	const itemType = useDragType(spec);
	useIsomorphicLayoutEffect(function registerDragSource() {
		if (itemType != null) {
			const [handlerId, unregister] = registerSource(itemType, handler, manager);
			monitor.receiveHandlerId(handlerId);
			connector.receiveHandlerId(handlerId);
			return unregister;
		}
	}, [
		manager,
		monitor,
		connector,
		handler,
		itemType
	]);
}
var init_useRegisteredDragSource = __esmMin((() => {
	init_internals();
	init_useDragDropManager();
	init_useIsomorphicLayoutEffect();
	init_useDragSource();
	init_useDragType();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/useDrag.js
/**
* useDragSource hook
* @param sourceSpec The drag source specification (object or function, function preferred)
* @param deps The memoization deps array to use when evaluating spec changes
*/ function useDrag(specArg, deps) {
	const spec = useOptionalFactory(specArg, deps);
	invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
	const monitor = useDragSourceMonitor();
	const connector = useDragSourceConnector(spec.options, spec.previewOptions);
	useRegisteredDragSource(spec, monitor, connector);
	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDragSource(connector),
		useConnectDragPreview(connector)
	];
}
var init_useDrag$1 = __esmMin((() => {
	init_dist$7();
	init_useCollectedProps();
	init_useOptionalFactory();
	init_connectors$2();
	init_useDragSourceConnector();
	init_useDragSourceMonitor();
	init_useRegisteredDragSource();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrag/index.js
var init_useDrag = __esmMin((() => {
	init_useDrag$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDragLayer.js
/**
* useDragLayer Hook
* @param collector The property collector
*/ function useDragLayer(collect) {
	const monitor = useDragDropManager().getMonitor();
	const [collected, updateCollected] = useCollector(monitor, collect);
	(0, import_react$35.useEffect)(() => monitor.subscribeToOffsetChange(updateCollected));
	(0, import_react$35.useEffect)(() => monitor.subscribeToStateChange(updateCollected));
	return collected;
}
var import_react$35;
var init_useDragLayer = __esmMin((() => {
	import_react$35 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useCollector();
	init_useDragDropManager();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/connectors.js
function useConnectDropTarget(connector) {
	return (0, import_react$34.useMemo)(() => connector.hooks.dropTarget(), [connector]);
}
var import_react$34;
var init_connectors$1 = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useDropTargetConnector.js
function useDropTargetConnector(options) {
	const manager = useDragDropManager();
	const connector = (0, import_react$33.useMemo)(() => new TargetConnector(manager.getBackend()), [manager]);
	useIsomorphicLayoutEffect(() => {
		connector.dropTargetOptions = options || null;
		connector.reconnect();
		return () => connector.disconnectDropTarget();
	}, [options]);
	return connector;
}
var import_react$33;
var init_useDropTargetConnector = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internals();
	init_useDragDropManager();
	init_useIsomorphicLayoutEffect();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useDropTargetMonitor.js
function useDropTargetMonitor() {
	const manager = useDragDropManager();
	return (0, import_react$32.useMemo)(() => new DropTargetMonitorImpl(manager), [manager]);
}
var import_react$32;
var init_useDropTargetMonitor = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internals();
	init_useDragDropManager();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useAccept.js
/**
* Internal utility hook to get an array-version of spec.accept.
* The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
* @param spec
*/ function useAccept(spec) {
	const { accept } = spec;
	return (0, import_react$31.useMemo)(() => {
		invariant(spec.accept != null, "accept must be defined");
		return Array.isArray(accept) ? accept : [accept];
	}, [accept]);
}
var import_react$31;
var init_useAccept = __esmMin((() => {
	init_dist$7();
	import_react$31 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/DropTargetImpl.js
var DropTargetImpl;
var init_DropTargetImpl = __esmMin((() => {
	DropTargetImpl = class {
		canDrop() {
			const spec = this.spec;
			const monitor = this.monitor;
			return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
		}
		hover() {
			const spec = this.spec;
			const monitor = this.monitor;
			if (spec.hover) spec.hover(monitor.getItem(), monitor);
		}
		drop() {
			const spec = this.spec;
			const monitor = this.monitor;
			if (spec.drop) return spec.drop(monitor.getItem(), monitor);
		}
		constructor(spec, monitor) {
			this.spec = spec;
			this.monitor = monitor;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useDropTarget.js
function useDropTarget(spec, monitor) {
	const dropTarget = (0, import_react$30.useMemo)(() => new DropTargetImpl(spec, monitor), [monitor]);
	(0, import_react$30.useEffect)(() => {
		dropTarget.spec = spec;
	}, [spec]);
	return dropTarget;
}
var import_react$30;
var init_useDropTarget = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_DropTargetImpl();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useRegisteredDropTarget.js
function useRegisteredDropTarget(spec, monitor, connector) {
	const manager = useDragDropManager();
	const dropTarget = useDropTarget(spec, monitor);
	const accept = useAccept(spec);
	useIsomorphicLayoutEffect(function registerDropTarget() {
		const [handlerId, unregister] = registerTarget(accept, dropTarget, manager);
		monitor.receiveHandlerId(handlerId);
		connector.receiveHandlerId(handlerId);
		return unregister;
	}, [
		manager,
		monitor,
		dropTarget,
		connector,
		accept.map((a) => a.toString()).join("|")
	]);
}
var init_useRegisteredDropTarget = __esmMin((() => {
	init_internals();
	init_useDragDropManager();
	init_useIsomorphicLayoutEffect();
	init_useAccept();
	init_useDropTarget();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/useDrop.js
/**
* useDropTarget Hook
* @param spec The drop target specification (object or function, function preferred)
* @param deps The memoization deps array to use when evaluating spec changes
*/ function useDrop(specArg, deps) {
	const spec = useOptionalFactory(specArg, deps);
	const monitor = useDropTargetMonitor();
	const connector = useDropTargetConnector(spec.options);
	useRegisteredDropTarget(spec, monitor, connector);
	return [useCollectedProps(spec.collect, monitor, connector), useConnectDropTarget(connector)];
}
var init_useDrop$1 = __esmMin((() => {
	init_useCollectedProps();
	init_useOptionalFactory();
	init_connectors$1();
	init_useDropTargetConnector();
	init_useDropTargetMonitor();
	init_useRegisteredDropTarget();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/useDrop/index.js
var init_useDrop = __esmMin((() => {
	init_useDrop$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/hooks/index.js
var init_hooks = __esmMin((() => {
	init_types$3();
	init_useDrag();
	init_useDragDropManager();
	init_useDragLayer();
	init_useDrop();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/types/connectors.js
var init_connectors = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/types/monitors.js
var init_monitors = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/types/options.js
var init_options = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/types/index.js
var init_types$2 = __esmMin((() => {
	init_connectors();
	init_monitors();
	init_options();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd@16.0.1_@types+hoi_1e56f363d5e51aa0a44518f1e9628ac7/node_modules/react-dnd/dist/index.js
var init_dist$3 = __esmMin((() => {
	init_core();
	init_hooks();
	init_types$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/interfaces.js
var ListenerType;
var init_interfaces = __esmMin((() => {
	(function(ListenerType) {
		ListenerType["mouse"] = "mouse";
		ListenerType["touch"] = "touch";
		ListenerType["keyboard"] = "keyboard";
	})(ListenerType || (ListenerType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/OptionsReader.js
var OptionsReader;
var init_OptionsReader = __esmMin((() => {
	OptionsReader = class {
		get delay() {
			var _delay;
			return (_delay = this.args.delay) !== null && _delay !== void 0 ? _delay : 0;
		}
		get scrollAngleRanges() {
			return this.args.scrollAngleRanges;
		}
		get getDropTargetElementsAtPoint() {
			return this.args.getDropTargetElementsAtPoint;
		}
		get ignoreContextMenu() {
			var _ignoreContextMenu;
			return (_ignoreContextMenu = this.args.ignoreContextMenu) !== null && _ignoreContextMenu !== void 0 ? _ignoreContextMenu : false;
		}
		get enableHoverOutsideTarget() {
			var _enableHoverOutsideTarget;
			return (_enableHoverOutsideTarget = this.args.enableHoverOutsideTarget) !== null && _enableHoverOutsideTarget !== void 0 ? _enableHoverOutsideTarget : false;
		}
		get enableKeyboardEvents() {
			var _enableKeyboardEvents;
			return (_enableKeyboardEvents = this.args.enableKeyboardEvents) !== null && _enableKeyboardEvents !== void 0 ? _enableKeyboardEvents : false;
		}
		get enableMouseEvents() {
			var _enableMouseEvents;
			return (_enableMouseEvents = this.args.enableMouseEvents) !== null && _enableMouseEvents !== void 0 ? _enableMouseEvents : false;
		}
		get enableTouchEvents() {
			var _enableTouchEvents;
			return (_enableTouchEvents = this.args.enableTouchEvents) !== null && _enableTouchEvents !== void 0 ? _enableTouchEvents : true;
		}
		get touchSlop() {
			return this.args.touchSlop || 0;
		}
		get delayTouchStart() {
			var ref, ref1;
			var ref2, ref3;
			return (ref3 = (ref2 = (ref = this.args) === null || ref === void 0 ? void 0 : ref.delayTouchStart) !== null && ref2 !== void 0 ? ref2 : (ref1 = this.args) === null || ref1 === void 0 ? void 0 : ref1.delay) !== null && ref3 !== void 0 ? ref3 : 0;
		}
		get delayMouseStart() {
			var ref, ref4;
			var ref5, ref6;
			return (ref6 = (ref5 = (ref = this.args) === null || ref === void 0 ? void 0 : ref.delayMouseStart) !== null && ref5 !== void 0 ? ref5 : (ref4 = this.args) === null || ref4 === void 0 ? void 0 : ref4.delay) !== null && ref6 !== void 0 ? ref6 : 0;
		}
		get window() {
			if (this.context && this.context.window) return this.context.window;
			else if (typeof window !== "undefined") return window;
		}
		get document() {
			var ref;
			if ((ref = this.context) === null || ref === void 0 ? void 0 : ref.document) return this.context.document;
			if (this.window) return this.window.document;
		}
		get rootElement() {
			var ref;
			return ((ref = this.args) === null || ref === void 0 ? void 0 : ref.rootElement) || this.document;
		}
		constructor(args, context) {
			this.args = args;
			this.context = context;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/utils/math.js
function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));
}
function inAngleRanges(x1, y1, x2, y2, angleRanges) {
	if (!angleRanges) return false;
	const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
	for (let i = 0; i < angleRanges.length; ++i) {
		const ar = angleRanges[i];
		if (ar && (ar.start == null || angle >= ar.start) && (ar.end == null || angle <= ar.end)) return true;
	}
	return false;
}
var init_math = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/utils/predicates.js
/**
* Only touch events and mouse events where the left button is pressed should initiate a drag.
* @param {MouseEvent | TouchEvent} e The event
*/ function eventShouldStartDrag(e) {
	return e.button === void 0 || e.button === MouseButton.Left;
}
/**
* Only touch events and mouse events where the left mouse button is no longer held should end a drag.
* It's possible the user mouse downs with the left mouse button, then mouse down and ups with the right mouse button.
* We don't want releasing the right mouse button to end the drag.
* @param {MouseEvent | TouchEvent} e The event
*/ function eventShouldEndDrag(e) {
	return e.buttons === void 0 || (e.buttons & MouseButtons.Left) === 0;
}
function isTouchEvent(e) {
	return !!e.targetTouches;
}
var MouseButtons, MouseButton;
var init_predicates = __esmMin((() => {
	MouseButtons = {
		Left: 1,
		Right: 2,
		Center: 4
	};
	MouseButton = {
		Left: 0,
		Center: 1,
		Right: 2
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/utils/offsets.js
function getNodeClientOffset(node) {
	const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
	if (!el) return;
	const { top, left } = el.getBoundingClientRect();
	return {
		x: left,
		y: top
	};
}
function getEventClientTouchOffset(e, lastTargetTouchFallback) {
	if (e.targetTouches.length === 1) return getEventClientOffset(e.targetTouches[0]);
	else if (lastTargetTouchFallback && e.touches.length === 1) {
		if (e.touches[0].target === lastTargetTouchFallback.target) return getEventClientOffset(e.touches[0]);
	}
}
function getEventClientOffset(e, lastTargetTouchFallback) {
	if (isTouchEvent(e)) return getEventClientTouchOffset(e, lastTargetTouchFallback);
	else return {
		x: e.clientX,
		y: e.clientY
	};
}
var ELEMENT_NODE;
var init_offsets = __esmMin((() => {
	init_predicates();
	ELEMENT_NODE = 1;
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/utils/supportsPassive.js
var supportsPassive;
var init_supportsPassive = __esmMin((() => {
	supportsPassive = (() => {
		let supported = false;
		try {
			addEventListener("test", () => {}, Object.defineProperty({}, "passive", { get() {
				supported = true;
				return true;
			} }));
		} catch (e) {}
		return supported;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/TouchBackendImpl.js
var eventNames, TouchBackendImpl;
var init_TouchBackendImpl = __esmMin((() => {
	init_dist$7();
	init_interfaces();
	init_OptionsReader();
	init_math();
	init_offsets();
	init_predicates();
	init_supportsPassive();
	eventNames = {
		[ListenerType.mouse]: {
			start: "mousedown",
			move: "mousemove",
			end: "mouseup",
			contextmenu: "contextmenu"
		},
		[ListenerType.touch]: {
			start: "touchstart",
			move: "touchmove",
			end: "touchend"
		},
		[ListenerType.keyboard]: { keydown: "keydown" }
	};
	TouchBackendImpl = class TouchBackendImpl {
		/**
		* Generate profiling statistics for the HTML5Backend.
		*/ profile() {
			var ref;
			return {
				sourceNodes: this.sourceNodes.size,
				sourcePreviewNodes: this.sourcePreviewNodes.size,
				sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
				targetNodes: this.targetNodes.size,
				dragOverTargetIds: ((ref = this.dragOverTargetIds) === null || ref === void 0 ? void 0 : ref.length) || 0
			};
		}
		get document() {
			return this.options.document;
		}
		setup() {
			const root = this.options.rootElement;
			if (!root) return;
			invariant(!TouchBackendImpl.isSetUp, "Cannot have two Touch backends at the same time.");
			TouchBackendImpl.isSetUp = true;
			this.addEventListener(root, "start", this.getTopMoveStartHandler());
			this.addEventListener(root, "start", this.handleTopMoveStartCapture, true);
			this.addEventListener(root, "move", this.handleTopMove);
			this.addEventListener(root, "move", this.handleTopMoveCapture, true);
			this.addEventListener(root, "end", this.handleTopMoveEndCapture, true);
			if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) this.addEventListener(root, "contextmenu", this.handleTopMoveEndCapture);
			if (this.options.enableKeyboardEvents) this.addEventListener(root, "keydown", this.handleCancelOnEscape, true);
		}
		teardown() {
			const root = this.options.rootElement;
			if (!root) return;
			TouchBackendImpl.isSetUp = false;
			this._mouseClientOffset = {};
			this.removeEventListener(root, "start", this.handleTopMoveStartCapture, true);
			this.removeEventListener(root, "start", this.handleTopMoveStart);
			this.removeEventListener(root, "move", this.handleTopMoveCapture, true);
			this.removeEventListener(root, "move", this.handleTopMove);
			this.removeEventListener(root, "end", this.handleTopMoveEndCapture, true);
			if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) this.removeEventListener(root, "contextmenu", this.handleTopMoveEndCapture);
			if (this.options.enableKeyboardEvents) this.removeEventListener(root, "keydown", this.handleCancelOnEscape, true);
			this.uninstallSourceNodeRemovalObserver();
		}
		addEventListener(subject, event, handler, capture = false) {
			const options = supportsPassive ? {
				capture,
				passive: false
			} : capture;
			this.listenerTypes.forEach(function(listenerType) {
				const evt = eventNames[listenerType][event];
				if (evt) subject.addEventListener(evt, handler, options);
			});
		}
		removeEventListener(subject, event, handler, capture = false) {
			const options = supportsPassive ? {
				capture,
				passive: false
			} : capture;
			this.listenerTypes.forEach(function(listenerType) {
				const evt = eventNames[listenerType][event];
				if (evt) subject.removeEventListener(evt, handler, options);
			});
		}
		connectDragSource(sourceId, node) {
			const handleMoveStart = this.handleMoveStart.bind(this, sourceId);
			this.sourceNodes.set(sourceId, node);
			this.addEventListener(node, "start", handleMoveStart);
			return () => {
				this.sourceNodes.delete(sourceId);
				this.removeEventListener(node, "start", handleMoveStart);
			};
		}
		connectDragPreview(sourceId, node, options) {
			this.sourcePreviewNodeOptions.set(sourceId, options);
			this.sourcePreviewNodes.set(sourceId, node);
			return () => {
				this.sourcePreviewNodes.delete(sourceId);
				this.sourcePreviewNodeOptions.delete(sourceId);
			};
		}
		connectDropTarget(targetId, node) {
			const root = this.options.rootElement;
			if (!this.document || !root) return () => {};
			const handleMove = (e) => {
				if (!this.document || !root || !this.monitor.isDragging()) return;
				let coords;
				/**
				* Grab the coordinates for the current mouse/touch position
				*/ switch (e.type) {
					case eventNames.mouse.move:
						coords = {
							x: e.clientX,
							y: e.clientY
						};
						break;
					case eventNames.touch.move:
						var ref, ref1;
						coords = {
							x: ((ref = e.touches[0]) === null || ref === void 0 ? void 0 : ref.clientX) || 0,
							y: ((ref1 = e.touches[0]) === null || ref1 === void 0 ? void 0 : ref1.clientY) || 0
						};
				}
				/**
				* Use the coordinates to grab the element the drag ended on.
				* If the element is the same as the target node (or any of it's children) then we have hit a drop target and can handle the move.
				*/ const droppedOn = coords != null ? this.document.elementFromPoint(coords.x, coords.y) : void 0;
				const childMatch = droppedOn && node.contains(droppedOn);
				if (droppedOn === node || childMatch) return this.handleMove(e, targetId);
			};
			/**
			* Attaching the event listener to the body so that touchmove will work while dragging over multiple target elements.
			*/ this.addEventListener(this.document.body, "move", handleMove);
			this.targetNodes.set(targetId, node);
			return () => {
				if (this.document) {
					this.targetNodes.delete(targetId);
					this.removeEventListener(this.document.body, "move", handleMove);
				}
			};
		}
		getTopMoveStartHandler() {
			if (!this.options.delayTouchStart && !this.options.delayMouseStart) return this.handleTopMoveStart;
			return this.handleTopMoveStartDelay;
		}
		installSourceNodeRemovalObserver(node) {
			this.uninstallSourceNodeRemovalObserver();
			this.draggedSourceNode = node;
			this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
				if (node && !node.parentElement) {
					this.resurrectSourceNode();
					this.uninstallSourceNodeRemovalObserver();
				}
			});
			if (!node || !node.parentElement) return;
			this.draggedSourceNodeRemovalObserver.observe(node.parentElement, { childList: true });
		}
		resurrectSourceNode() {
			if (this.document && this.draggedSourceNode) {
				this.draggedSourceNode.style.display = "none";
				this.draggedSourceNode.removeAttribute("data-reactid");
				this.document.body.appendChild(this.draggedSourceNode);
			}
		}
		uninstallSourceNodeRemovalObserver() {
			if (this.draggedSourceNodeRemovalObserver) this.draggedSourceNodeRemovalObserver.disconnect();
			this.draggedSourceNodeRemovalObserver = void 0;
			this.draggedSourceNode = void 0;
		}
		constructor(manager, context, options) {
			this.getSourceClientOffset = (sourceId) => {
				const element = this.sourceNodes.get(sourceId);
				return element && getNodeClientOffset(element);
			};
			this.handleTopMoveStartCapture = (e) => {
				if (!eventShouldStartDrag(e)) return;
				this.moveStartSourceIds = [];
			};
			this.handleMoveStart = (sourceId) => {
				if (Array.isArray(this.moveStartSourceIds)) this.moveStartSourceIds.unshift(sourceId);
			};
			this.handleTopMoveStart = (e) => {
				if (!eventShouldStartDrag(e)) return;
				const clientOffset = getEventClientOffset(e);
				if (clientOffset) {
					if (isTouchEvent(e)) this.lastTargetTouchFallback = e.targetTouches[0];
					this._mouseClientOffset = clientOffset;
				}
				this.waitingForDelay = false;
			};
			this.handleTopMoveStartDelay = (e) => {
				if (!eventShouldStartDrag(e)) return;
				const delay = e.type === eventNames.touch.start ? this.options.delayTouchStart : this.options.delayMouseStart;
				this.timeout = setTimeout(this.handleTopMoveStart.bind(this, e), delay);
				this.waitingForDelay = true;
			};
			this.handleTopMoveCapture = () => {
				this.dragOverTargetIds = [];
			};
			this.handleMove = (_evt, targetId) => {
				if (this.dragOverTargetIds) this.dragOverTargetIds.unshift(targetId);
			};
			this.handleTopMove = (e1) => {
				if (this.timeout) clearTimeout(this.timeout);
				if (!this.document || this.waitingForDelay) return;
				const { moveStartSourceIds, dragOverTargetIds } = this;
				const enableHoverOutsideTarget = this.options.enableHoverOutsideTarget;
				const clientOffset = getEventClientOffset(e1, this.lastTargetTouchFallback);
				if (!clientOffset) return;
				if (this._isScrolling || !this.monitor.isDragging() && inAngleRanges(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y, this.options.scrollAngleRanges)) {
					this._isScrolling = true;
					return;
				}
				if (!this.monitor.isDragging() && this._mouseClientOffset.hasOwnProperty("x") && moveStartSourceIds && distance(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y) > (this.options.touchSlop ? this.options.touchSlop : 0)) {
					this.moveStartSourceIds = void 0;
					this.actions.beginDrag(moveStartSourceIds, {
						clientOffset: this._mouseClientOffset,
						getSourceClientOffset: this.getSourceClientOffset,
						publishSource: false
					});
				}
				if (!this.monitor.isDragging()) return;
				const sourceNode = this.sourceNodes.get(this.monitor.getSourceId());
				this.installSourceNodeRemovalObserver(sourceNode);
				this.actions.publishDragSource();
				if (e1.cancelable) e1.preventDefault();
				const dragOverTargetNodes = (dragOverTargetIds || []).map((key) => this.targetNodes.get(key)).filter((e) => !!e);
				const elementsAtPoint = this.options.getDropTargetElementsAtPoint ? this.options.getDropTargetElementsAtPoint(clientOffset.x, clientOffset.y, dragOverTargetNodes) : this.document.elementsFromPoint(clientOffset.x, clientOffset.y);
				const elementsAtPointExtended = [];
				for (const nodeId in elementsAtPoint) {
					if (!elementsAtPoint.hasOwnProperty(nodeId)) continue;
					let currentNode = elementsAtPoint[nodeId];
					if (currentNode != null) elementsAtPointExtended.push(currentNode);
					while (currentNode) {
						currentNode = currentNode.parentElement;
						if (currentNode && elementsAtPointExtended.indexOf(currentNode) === -1) elementsAtPointExtended.push(currentNode);
					}
				}
				const orderedDragOverTargetIds = elementsAtPointExtended.filter((node) => dragOverTargetNodes.indexOf(node) > -1).map((node) => this._getDropTargetId(node)).filter((node) => !!node).filter((id, index, ids) => ids.indexOf(id) === index);
				if (enableHoverOutsideTarget) for (const targetId in this.targetNodes) {
					const targetNode = this.targetNodes.get(targetId);
					if (sourceNode && targetNode && targetNode.contains(sourceNode) && orderedDragOverTargetIds.indexOf(targetId) === -1) {
						orderedDragOverTargetIds.unshift(targetId);
						break;
					}
				}
				orderedDragOverTargetIds.reverse();
				this.actions.hover(orderedDragOverTargetIds, { clientOffset });
			};
			/**
			*
			* visible for testing
			*/ this._getDropTargetId = (node) => {
				const keys = this.targetNodes.keys();
				let next = keys.next();
				while (next.done === false) {
					const targetId = next.value;
					if (node === this.targetNodes.get(targetId)) return targetId;
					else next = keys.next();
				}
			};
			this.handleTopMoveEndCapture = (e) => {
				this._isScrolling = false;
				this.lastTargetTouchFallback = void 0;
				if (!eventShouldEndDrag(e)) return;
				if (!this.monitor.isDragging() || this.monitor.didDrop()) {
					this.moveStartSourceIds = void 0;
					return;
				}
				if (e.cancelable) e.preventDefault();
				this._mouseClientOffset = {};
				this.uninstallSourceNodeRemovalObserver();
				this.actions.drop();
				this.actions.endDrag();
			};
			this.handleCancelOnEscape = (e) => {
				if (e.key === "Escape" && this.monitor.isDragging()) {
					this._mouseClientOffset = {};
					this.uninstallSourceNodeRemovalObserver();
					this.actions.endDrag();
				}
			};
			this.options = new OptionsReader(options, context);
			this.actions = manager.getActions();
			this.monitor = manager.getMonitor();
			this.sourceNodes = /* @__PURE__ */ new Map();
			this.sourcePreviewNodes = /* @__PURE__ */ new Map();
			this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map();
			this.targetNodes = /* @__PURE__ */ new Map();
			this.listenerTypes = [];
			this._mouseClientOffset = {};
			this._isScrolling = false;
			if (this.options.enableMouseEvents) this.listenerTypes.push(ListenerType.mouse);
			if (this.options.enableTouchEvents) this.listenerTypes.push(ListenerType.touch);
			if (this.options.enableKeyboardEvents) this.listenerTypes.push(ListenerType.keyboard);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/index.js
var TouchBackend;
var init_dist$2 = __esmMin((() => {
	init_TouchBackendImpl();
	init_interfaces();
	init_TouchBackendImpl();
	TouchBackend = function createBackend(manager, context = {}, options = {}) {
		return new TouchBackendImpl(manager, context, options);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-html5-backend@16.0.1/node_modules/react-dnd-html5-backend/dist/getEmptyImage.js
function getEmptyImage() {
	if (!emptyImage) {
		emptyImage = new Image();
		emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	}
	return emptyImage;
}
var emptyImage;
var init_getEmptyImage = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/react-dnd-html5-backend@16.0.1/node_modules/react-dnd-html5-backend/dist/index.js
var init_dist$1 = __esmMin((() => {
	init_getEmptyImage();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-error-boundary@5.0.0_@types+react@18.3.20_react@18.3.1/node_modules/react-error-boundary/dist/react-error-boundary.esm.js
function hasArrayChanged() {
	let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	let b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
var import_react$29, ErrorBoundaryContext, initialState, ErrorBoundary;
var init_react_error_boundary_esm = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	ErrorBoundaryContext = (0, import_react$29.createContext)(null);
	initialState = {
		didCatch: false,
		error: null
	};
	ErrorBoundary = class extends import_react$29.Component {
		constructor(props) {
			super(props);
			this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
			this.state = initialState;
		}
		static getDerivedStateFromError(error) {
			return {
				didCatch: true,
				error
			};
		}
		resetErrorBoundary() {
			const { error } = this.state;
			if (error !== null) {
				var _this$props$onReset, _this$props;
				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
				(_this$props$onReset = (_this$props = this.props).onReset) === null || _this$props$onReset === void 0 || _this$props$onReset.call(_this$props, {
					args,
					reason: "imperative-api"
				});
				this.setState(initialState);
			}
		}
		componentDidCatch(error, info) {
			var _this$props$onError, _this$props2;
			(_this$props$onError = (_this$props2 = this.props).onError) === null || _this$props$onError === void 0 || _this$props$onError.call(_this$props2, error, info);
		}
		componentDidUpdate(prevProps, prevState) {
			const { didCatch } = this.state;
			const { resetKeys } = this.props;
			if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
				var _this$props$onReset2, _this$props3;
				(_this$props$onReset2 = (_this$props3 = this.props).onReset) === null || _this$props$onReset2 === void 0 || _this$props$onReset2.call(_this$props3, {
					next: resetKeys,
					prev: prevProps.resetKeys,
					reason: "keys"
				});
				this.setState(initialState);
			}
		}
		render() {
			const { children, fallbackRender, FallbackComponent, fallback } = this.props;
			const { didCatch, error } = this.state;
			let childToRender = children;
			if (didCatch) {
				const props = {
					error,
					resetErrorBoundary: this.resetErrorBoundary
				};
				if (typeof fallbackRender === "function") childToRender = fallbackRender(props);
				else if (FallbackComponent) childToRender = (0, import_react$29.createElement)(FallbackComponent, props);
				else if (fallback !== void 0) childToRender = fallback;
				else throw error;
			}
			return (0, import_react$29.createElement)(ErrorBoundaryContext.Provider, { value: {
				didCatch,
				error,
				resetErrorBoundary: this.resetErrorBoundary
			} }, childToRender);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-markdown@8.0.7_@types_9b81c168892d6e7c50d5f23dcfb3ff43/node_modules/react-markdown/lib/uri-transformer.js
/**
* @param {string} uri
* @returns {string}
*/
function uriTransformer(uri) {
	const url = (uri || "").trim();
	const first = url.charAt(0);
	if (first === "#" || first === "/") return url;
	const colon = url.indexOf(":");
	if (colon === -1) return url;
	let index = -1;
	while (++index < protocols.length) {
		const protocol = protocols[index];
		if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) return url;
	}
	index = url.indexOf("?");
	if (index !== -1 && colon > index) return url;
	index = url.indexOf("#");
	if (index !== -1 && colon > index) return url;
	return "javascript:void(0)";
}
var protocols;
var init_uri_transformer = __esmMin((() => {
	protocols = [
		"http",
		"https",
		"mailto",
		"tel"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/react-markdown@8.0.7_@types_9b81c168892d6e7c50d5f23dcfb3ff43/node_modules/react-markdown/lib/rehype-filter.js
/**
* @typedef {import('unist').Node} Node
* @typedef {import('hast').Root} Root
* @typedef {import('hast').Element} Element
*
* @callback AllowElement
* @param {Element} element
* @param {number} index
* @param {Element|Root} parent
* @returns {boolean|undefined}
*
* @typedef Options
* @property {Array<string>} [allowedElements]
* @property {Array<string>} [disallowedElements=[]]
* @property {AllowElement} [allowElement]
* @property {boolean} [unwrapDisallowed=false]
*/
/**
* @type {import('unified').Plugin<[Options], Root>}
*/
function rehypeFilter(options) {
	if (options.allowedElements && options.disallowedElements) throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");
	if (options.allowedElements || options.disallowedElements || options.allowElement) return (tree) => {
		visit(tree, "element", (node, index, parent_) => {
			const parent = parent_;
			/** @type {boolean|undefined} */
			let remove;
			if (options.allowedElements) remove = !options.allowedElements.includes(node.tagName);
			else if (options.disallowedElements) remove = options.disallowedElements.includes(node.tagName);
			if (!remove && options.allowElement && typeof index === "number") remove = !options.allowElement(node, index, parent);
			if (remove && typeof index === "number") {
				if (options.unwrapDisallowed && node.children) parent.children.splice(index, 1, ...node.children);
				else parent.children.splice(index, 1);
				return index;
			}
		});
	};
}
var init_rehype_filter = __esmMin((() => {
	init_unist_util_visit();
}));
//#endregion
//#region ../../node_modules/.pnpm/inline-style-parser@0.1.1/node_modules/inline-style-parser/index.js
var require_inline_style_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;
	var TRIM_REGEX = /^\s+|\s+$/g;
	var NEWLINE = "\n";
	var FORWARD_SLASH = "/";
	var ASTERISK = "*";
	var EMPTY_STRING = "";
	var TYPE_COMMENT = "comment";
	var TYPE_DECLARATION = "declaration";
	/**
	* @param {String} style
	* @param {Object} [options]
	* @return {Object[]}
	* @throws {TypeError}
	* @throws {Error}
	*/
	module.exports = function(style, options) {
		if (typeof style !== "string") throw new TypeError("First argument must be a string");
		if (!style) return [];
		options = options || {};
		/**
		* Positional.
		*/
		var lineno = 1;
		var column = 1;
		/**
		* Update lineno and column based on `str`.
		*
		* @param {String} str
		*/
		function updatePosition(str) {
			var lines = str.match(NEWLINE_REGEX);
			if (lines) lineno += lines.length;
			var i = str.lastIndexOf(NEWLINE);
			column = ~i ? str.length - i : column + str.length;
		}
		/**
		* Mark position and patch `node.position`.
		*
		* @return {Function}
		*/
		function position() {
			var start = {
				line: lineno,
				column
			};
			return function(node) {
				node.position = new Position(start);
				whitespace();
				return node;
			};
		}
		/**
		* Store position information for a node.
		*
		* @constructor
		* @property {Object} start
		* @property {Object} end
		* @property {undefined|String} source
		*/
		function Position(start) {
			this.start = start;
			this.end = {
				line: lineno,
				column
			};
			this.source = options.source;
		}
		/**
		* Non-enumerable source string.
		*/
		Position.prototype.content = style;
		var errorsList = [];
		/**
		* Error `msg`.
		*
		* @param {String} msg
		* @throws {Error}
		*/
		function error(msg) {
			var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
			err.reason = msg;
			err.filename = options.source;
			err.line = lineno;
			err.column = column;
			err.source = style;
			if (options.silent) errorsList.push(err);
			else throw err;
		}
		/**
		* Match `re` and return captures.
		*
		* @param {RegExp} re
		* @return {undefined|Array}
		*/
		function match(re) {
			var m = re.exec(style);
			if (!m) return;
			var str = m[0];
			updatePosition(str);
			style = style.slice(str.length);
			return m;
		}
		/**
		* Parse whitespace.
		*/
		function whitespace() {
			match(WHITESPACE_REGEX);
		}
		/**
		* Parse comments.
		*
		* @param {Object[]} [rules]
		* @return {Object[]}
		*/
		function comments(rules) {
			var c;
			rules = rules || [];
			while (c = comment()) if (c !== false) rules.push(c);
			return rules;
		}
		/**
		* Parse comment.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function comment() {
			var pos = position();
			if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
			var i = 2;
			while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
			i += 2;
			if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
			var str = style.slice(2, i - 2);
			column += 2;
			updatePosition(str);
			style = style.slice(i);
			column += 2;
			return pos({
				type: TYPE_COMMENT,
				comment: str
			});
		}
		/**
		* Parse declaration.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function declaration() {
			var pos = position();
			var prop = match(PROPERTY_REGEX);
			if (!prop) return;
			comment();
			if (!match(COLON_REGEX)) return error("property missing ':'");
			var val = match(VALUE_REGEX);
			var ret = pos({
				type: TYPE_DECLARATION,
				property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			match(SEMICOLON_REGEX);
			return ret;
		}
		/**
		* Parse declarations.
		*
		* @return {Object[]}
		*/
		function declarations() {
			var decls = [];
			comments(decls);
			var decl;
			while (decl = declaration()) if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
			return decls;
		}
		whitespace();
		return declarations();
	};
	/**
	* Trim `str`.
	*
	* @param {String} str
	* @return {String}
	*/
	function trim(str) {
		return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/style-to-object@0.4.4/node_modules/style-to-object/index.js
var require_style_to_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_inline_style_parser();
	/**
	* Parses inline style to object.
	*
	* @example
	* // returns { 'line-height': '42' }
	* StyleToObject('line-height: 42;');
	*
	* @param  {String}      style      - The inline style.
	* @param  {Function}    [iterator] - The iterator function.
	* @return {null|Object}
	*/
	function StyleToObject(style, iterator) {
		var output = null;
		if (!style || typeof style !== "string") return output;
		var declaration;
		var declarations = parse(style);
		var hasIterator = typeof iterator === "function";
		var property;
		var value;
		for (var i = 0, len = declarations.length; i < len; i++) {
			declaration = declarations[i];
			property = declaration.property;
			value = declaration.value;
			if (hasIterator) iterator(property, value, declaration);
			else if (value) {
				output || (output = {});
				output[property] = value;
			}
		}
		return output;
	}
	module.exports = StyleToObject;
	module.exports.default = StyleToObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/style-to-object@0.4.4/node_modules/style-to-object/index.mjs
var import_style_to_object, style_to_object_default;
var init_style_to_object = __esmMin((() => {
	import_style_to_object = /* @__PURE__ */ __toESM(require_style_to_object(), 1);
	style_to_object_default = import_style_to_object.default;
}));
//#endregion
//#region ../../node_modules/.pnpm/react-markdown@8.0.7_@types_9b81c168892d6e7c50d5f23dcfb3ff43/node_modules/react-markdown/lib/ast-to-react.js
/**
* @param {Context} context
* @param {Element|Root} node
*/
function childrenToReact(context, node) {
	/** @type {Array<ReactNode>} */
	const children = [];
	let childIndex = -1;
	/** @type {Comment|Doctype|Element|Raw|Text} */
	let child;
	while (++childIndex < node.children.length) {
		child = node.children[childIndex];
		if (child.type === "element") children.push(toReact(context, child, childIndex, node));
		else if (child.type === "text") {
			if (node.type !== "element" || !tableElements.has(node.tagName) || !whitespace(child)) children.push(child.value);
		} else if (child.type === "raw" && !context.options.skipHtml) children.push(child.value);
	}
	return children;
}
/**
* @param {Context} context
* @param {Element} node
* @param {number} index
* @param {Element|Root} parent
*/
function toReact(context, node, index, parent) {
	const options = context.options;
	const transform = options.transformLinkUri === void 0 ? uriTransformer : options.transformLinkUri;
	const parentSchema = context.schema;
	/** @type {ReactMarkdownNames} */
	const name = node.tagName;
	/** @type {Record<string, unknown>} */
	const properties = {};
	let schema = parentSchema;
	/** @type {string} */
	let property;
	if (parentSchema.space === "html" && name === "svg") {
		schema = svg;
		context.schema = schema;
	}
	if (node.properties) {
		for (property in node.properties) if (own$1.call(node.properties, property)) addProperty(properties, property, node.properties[property], context);
	}
	if (name === "ol" || name === "ul") context.listDepth++;
	const children = childrenToReact(context, node);
	if (name === "ol" || name === "ul") context.listDepth--;
	context.schema = parentSchema;
	const position = node.position || {
		start: {
			line: null,
			column: null,
			offset: null
		},
		end: {
			line: null,
			column: null,
			offset: null
		}
	};
	const component = options.components && own$1.call(options.components, name) ? options.components[name] : name;
	const basic = typeof component === "string" || component === import_react$28.Fragment;
	if (!import_react_is.isValidElementType(component)) throw new TypeError(`Component for name \`${name}\` not defined or is not renderable`);
	properties.key = index;
	if (name === "a" && options.linkTarget) properties.target = typeof options.linkTarget === "function" ? options.linkTarget(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null) : options.linkTarget;
	if (name === "a" && transform) properties.href = transform(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null);
	if (!basic && name === "code" && parent.type === "element" && parent.tagName !== "pre") properties.inline = true;
	if (!basic && (name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6")) properties.level = Number.parseInt(name.charAt(1), 10);
	if (name === "img" && options.transformImageUri) properties.src = options.transformImageUri(String(properties.src || ""), String(properties.alt || ""), typeof properties.title === "string" ? properties.title : null);
	if (!basic && name === "li" && parent.type === "element") {
		const input = getInputElement(node);
		properties.checked = input && input.properties ? Boolean(input.properties.checked) : null;
		properties.index = getElementsBeforeCount(parent, node);
		properties.ordered = parent.tagName === "ol";
	}
	if (!basic && (name === "ol" || name === "ul")) {
		properties.ordered = name === "ol";
		properties.depth = context.listDepth;
	}
	if (name === "td" || name === "th") {
		if (properties.align) {
			if (!properties.style) properties.style = {};
			properties.style.textAlign = properties.align;
			delete properties.align;
		}
		if (!basic) properties.isHeader = name === "th";
	}
	if (!basic && name === "tr" && parent.type === "element") properties.isHeader = Boolean(parent.tagName === "thead");
	if (options.sourcePos) properties["data-sourcepos"] = flattenPosition(position);
	if (!basic && options.rawSourcePos) properties.sourcePosition = node.position;
	if (!basic && options.includeElementIndex) {
		properties.index = getElementsBeforeCount(parent, node);
		properties.siblingCount = getElementsBeforeCount(parent);
	}
	if (!basic) properties.node = node;
	return children.length > 0 ? import_react$28.createElement(component, properties, children) : import_react$28.createElement(component, properties);
}
/**
* @param {Element|Root} node
* @returns {Element?}
*/
function getInputElement(node) {
	let index = -1;
	while (++index < node.children.length) {
		const child = node.children[index];
		if (child.type === "element" && child.tagName === "input") return child;
	}
	return null;
}
/**
* @param {Element|Root} parent
* @param {Element} [node]
* @returns {number}
*/
function getElementsBeforeCount(parent, node) {
	let index = -1;
	let count = 0;
	while (++index < parent.children.length) {
		if (parent.children[index] === node) break;
		if (parent.children[index].type === "element") count++;
	}
	return count;
}
/**
* @param {Record<string, unknown>} props
* @param {string} prop
* @param {unknown} value
* @param {Context} ctx
*/
function addProperty(props, prop, value, ctx) {
	const info = find(ctx.schema, prop);
	let result = value;
	if (result === null || result === void 0 || result !== result) return;
	if (Array.isArray(result)) result = info.commaSeparated ? stringify(result) : stringify$1(result);
	if (info.property === "style" && typeof result === "string") result = parseStyle(result);
	if (info.space && info.property) props[own$1.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
	else if (info.attribute) props[info.attribute] = result;
}
/**
* @param {string} value
* @returns {Record<string, string>}
*/
function parseStyle(value) {
	/** @type {Record<string, string>} */
	const result = {};
	try {
		style_to_object_default(value, iterator);
	} catch {}
	return result;
	/**
	* @param {string} name
	* @param {string} v
	*/
	function iterator(name, v) {
		const k = name.slice(0, 4) === "-ms-" ? `ms-${name.slice(4)}` : name;
		result[k.replace(/-([a-z])/g, styleReplacer)] = v;
	}
}
/**
* @param {unknown} _
* @param {string} $1
*/
function styleReplacer(_, $1) {
	return $1.toUpperCase();
}
/**
* @param {Position|{start: {line: null, column: null, offset: null}, end: {line: null, column: null, offset: null}}} pos
* @returns {string}
*/
function flattenPosition(pos) {
	return [
		pos.start.line,
		":",
		pos.start.column,
		"-",
		pos.end.line,
		":",
		pos.end.column
	].map(String).join("");
}
var import_react$28, import_react_is, own$1, tableElements;
var init_ast_to_react = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_is = /* @__PURE__ */ __toESM(require_react_is(), 1);
	init_hast_util_whitespace();
	init_property_information();
	init_space_separated_tokens();
	init_comma_separated_tokens();
	init_style_to_object();
	init_uri_transformer();
	own$1 = {}.hasOwnProperty;
	tableElements = /* @__PURE__ */ new Set([
		"table",
		"thead",
		"tbody",
		"tfoot",
		"tr"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-markdown@8.0.7_@types_9b81c168892d6e7c50d5f23dcfb3ff43/node_modules/react-markdown/lib/react-markdown.js
/**
* React component to render markdown.
*
* @param {ReactMarkdownOptions} options
* @returns {ReactElement}
*/
function ReactMarkdown(options) {
	for (const key in deprecated) if (own.call(deprecated, key) && own.call(options, key)) {
		const deprecation = deprecated[key];
		console.warn(`[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : "remove"} \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`);
		delete deprecated[key];
	}
	const processor = unified().use(remarkParse).use(options.remarkPlugins || []).use(remarkRehype, {
		...options.remarkRehypeOptions,
		allowDangerousHtml: true
	}).use(options.rehypePlugins || []).use(rehypeFilter, options);
	const file = new VFile();
	if (typeof options.children === "string") file.value = options.children;
	else if (options.children !== void 0 && options.children !== null) console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`);
	const hastNode = processor.runSync(processor.parse(file), file);
	if (hastNode.type !== "root") throw new TypeError("Expected a `root` node");
	/** @type {ReactElement} */
	let result = import_react$27.createElement(import_react$27.Fragment, {}, childrenToReact({
		options,
		schema: html,
		listDepth: 0
	}, hastNode));
	if (options.className) result = import_react$27.createElement("div", { className: options.className }, result);
	return result;
}
var import_react$27, import_prop_types, own, changelog, deprecated;
var init_react_markdown$1 = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_vfile();
	init_unified();
	init_remark_parse();
	init_remark_rehype();
	import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
	init_property_information();
	init_rehype_filter();
	init_ast_to_react();
	own = {}.hasOwnProperty;
	changelog = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md";
	deprecated = {
		plugins: {
			to: "remarkPlugins",
			id: "change-plugins-to-remarkplugins"
		},
		renderers: {
			to: "components",
			id: "change-renderers-to-components"
		},
		astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
		allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
		escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
		source: {
			to: "children",
			id: "change-source-to-children"
		},
		allowNode: {
			to: "allowElement",
			id: "replace-allownode-allowedtypes-and-disallowedtypes"
		},
		allowedTypes: {
			to: "allowedElements",
			id: "replace-allownode-allowedtypes-and-disallowedtypes"
		},
		disallowedTypes: {
			to: "disallowedElements",
			id: "replace-allownode-allowedtypes-and-disallowedtypes"
		},
		includeNodeIndex: {
			to: "includeElementIndex",
			id: "change-includenodeindex-to-includeelementindex"
		}
	};
	ReactMarkdown.propTypes = {
		children: import_prop_types.default.string,
		className: import_prop_types.default.string,
		allowElement: import_prop_types.default.func,
		allowedElements: import_prop_types.default.arrayOf(import_prop_types.default.string),
		disallowedElements: import_prop_types.default.arrayOf(import_prop_types.default.string),
		unwrapDisallowed: import_prop_types.default.bool,
		remarkPlugins: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.object,
			import_prop_types.default.func,
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
				import_prop_types.default.bool,
				import_prop_types.default.string,
				import_prop_types.default.object,
				import_prop_types.default.func,
				import_prop_types.default.arrayOf(import_prop_types.default.any)
			]))
		])),
		rehypePlugins: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.object,
			import_prop_types.default.func,
			import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
				import_prop_types.default.bool,
				import_prop_types.default.string,
				import_prop_types.default.object,
				import_prop_types.default.func,
				import_prop_types.default.arrayOf(import_prop_types.default.any)
			]))
		])),
		sourcePos: import_prop_types.default.bool,
		rawSourcePos: import_prop_types.default.bool,
		skipHtml: import_prop_types.default.bool,
		includeElementIndex: import_prop_types.default.bool,
		transformLinkUri: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.bool]),
		linkTarget: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
		transformImageUri: import_prop_types.default.func,
		components: import_prop_types.default.object
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-markdown@8.0.7_@types_9b81c168892d6e7c50d5f23dcfb3ff43/node_modules/react-markdown/index.js
var init_react_markdown = __esmMin((() => {
	init_uri_transformer();
	init_react_markdown$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/typeof-0dbfa870.js
function o$12(t) {
	return o$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, o$12(t);
}
var init_typeof_0dbfa870 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/index-a3cfc692.js
function r$6(t, r, e, n, o, i, a) {
	try {
		var u = t[i](a), c = u.value;
	} catch (t) {
		e(t);
		return;
	}
	u.done ? r(c) : Promise.resolve(c).then(n, o);
}
function e$13(t) {
	return function() {
		var e = this, n = arguments;
		return new Promise((function(o, i) {
			var a = t.apply(e, n);
			function u(t) {
				r$6(a, o, i, u, c, "next", t);
			}
			function c(t) {
				r$6(a, o, i, u, c, "throw", t);
			}
			u(void 0);
		}));
	};
}
function o$11(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var i$5, a$8, u$7, c$6, f$2, l$3;
var init_index_a3cfc692 = __esmMin((() => {
	init_typeof_0dbfa870();
	i$5 = { exports: {} };
	a$8 = { exports: {} };
	(function(t) {
		function r(e) {
			return t.exports = r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t;
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
			}, t.exports.__esModule = !0, t.exports.default = t.exports, r(e);
		}
		t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(a$8);
	u$7 = a$8.exports;
	(function(t) {
		var r = u$7.default;
		function e() {
			/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
			t.exports = e = function() {
				return o;
			}, t.exports.__esModule = !0, t.exports.default = t.exports;
			var n, o = {}, i = Object.prototype, a = i.hasOwnProperty, u = Object.defineProperty || function(t, r, e) {
				t[r] = e.value;
			}, c = "function" == typeof Symbol ? Symbol : {}, f = c.iterator || "@@iterator", l = c.asyncIterator || "@@asyncIterator", s = c.toStringTag || "@@toStringTag";
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
				var o = r && r.prototype instanceof x ? r : x, i = Object.create(o.prototype);
				return u(i, "_invoke", { value: P(t, e, new F(n || [])) }), i;
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
			var d = "suspendedStart", v = "suspendedYield", g = "executing", m = "completed", w = {};
			function x() {}
			function b() {}
			function L() {}
			var _ = {};
			h(_, f, (function() {
				return this;
			}));
			var E = Object.getPrototypeOf, j = E && E(E(M([])));
			j && j !== i && a.call(j, f) && (_ = j);
			var O = L.prototype = x.prototype = Object.create(_);
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
			function T(t, e) {
				function n(o, i, u, c) {
					var f = y(t[o], t, i);
					if ("throw" !== f.type) {
						var l = f.arg, s = l.value;
						return s && "object" == r(s) && a.call(s, "__await") ? e.resolve(s.__await).then((function(t) {
							n("next", t, u, c);
						}), (function(t) {
							n("throw", t, u, c);
						})) : e.resolve(s).then((function(t) {
							l.value = t, u(l);
						}), (function(t) {
							return n("throw", t, u, c);
						}));
					}
					c(f.arg);
				}
				var o;
				u(this, "_invoke", { value: function(t, r) {
					function i() {
						return new e((function(e, o) {
							n(t, r, e, o);
						}));
					}
					return o = o ? o.then(i, i) : i();
				} });
			}
			function P(t, r, e) {
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
					for (e.method = i, e.arg = a;;) {
						var u = e.delegate;
						if (u) {
							var c = k(u, e);
							if (c) {
								if (c === w) continue;
								return c;
							}
						}
						if ("next" === e.method) e.sent = e._sent = e.arg;
						else if ("throw" === e.method) {
							if (o === d) throw o = m, e.arg;
							e.dispatchException(e.arg);
						} else "return" === e.method && e.abrupt("return", e.arg);
						o = g;
						var f = y(t, r, e);
						if ("normal" === f.type) {
							if (o = e.done ? m : v, f.arg === w) continue;
							return {
								value: f.arg,
								done: e.done
							};
						}
						"throw" === f.type && (o = m, e.method = "throw", e.arg = f.arg);
					}
				};
			}
			function k(t, r) {
				var e = r.method, o = t.iterator[e];
				if (o === n) return r.delegate = null, "throw" === e && t.iterator.return && (r.method = "return", r.arg = n, k(t, r), "throw" === r.method) || "return" !== e && (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + e + "' method")), w;
				var i = y(o, t.iterator, r.arg);
				if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, w;
				var a = i.arg;
				return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = n), r.delegate = null, w) : a : (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("iterator result is not an object"), r.delegate = null, w);
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
					var e = t[f];
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
			return b.prototype = L, u(O, "constructor", {
				value: L,
				configurable: !0
			}), u(L, "constructor", {
				value: b,
				configurable: !0
			}), b.displayName = h(L, s, "GeneratorFunction"), o.isGeneratorFunction = function(t) {
				var r = "function" == typeof t && t.constructor;
				return !!r && (r === b || "GeneratorFunction" === (r.displayName || r.name));
			}, o.mark = function(t) {
				return Object.setPrototypeOf ? Object.setPrototypeOf(t, L) : (t.__proto__ = L, h(t, s, "GeneratorFunction")), t.prototype = Object.create(O), t;
			}, o.awrap = function(t) {
				return { __await: t };
			}, S(T.prototype), h(T.prototype, l, (function() {
				return this;
			})), o.AsyncIterator = T, o.async = function(t, r, e, n, i) {
				void 0 === i && (i = Promise);
				var a = new T(p(t, r, e, n), i);
				return o.isGeneratorFunction(r) ? a : a.next().then((function(t) {
					return t.done ? t.value : a.next();
				}));
			}, S(O), h(O, s, "Generator"), h(O, f, (function() {
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
						return u.type = "throw", u.arg = t, r.next = e, o && (r.method = "next", r.arg = n), !!o;
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var i = this.tryEntries[o], u = i.completion;
						if ("root" === i.tryLoc) return e("end");
						if (i.tryLoc <= this.prev) {
							var c = a.call(i, "catchLoc"), f = a.call(i, "finallyLoc");
							if (c && f) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
								if (this.prev < i.finallyLoc) return e(i.finallyLoc);
							} else if (c) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
							} else {
								if (!f) throw Error("try statement without catch or finally");
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
					return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, w) : this.complete(i);
				},
				complete: function(t, r) {
					if ("throw" === t.type) throw t.arg;
					return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), w;
				},
				finish: function(t) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var e = this.tryEntries[r];
						if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), N(e), w;
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
					}, "next" === this.method && (this.arg = n), w;
				}
			}, o;
		}
		t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(i$5);
	c$6 = (0, i$5.exports)();
	f$2 = c$6;
	try {
		regeneratorRuntime = c$6;
	} catch (r) {
		"object" === ("undefined" == typeof globalThis ? "undefined" : o$12(globalThis)) ? globalThis.regeneratorRuntime = c$6 : Function("r", "regeneratorRuntime = r")(c$6);
	}
	l$3 = o$11(f$2);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/toPropertyKey-c7d670ac.js
function t$11(t) {
	var i = function(t, i) {
		if ("object" != o$12(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var o = e.call(t, i || "default");
			if ("object" != o$12(o)) return o;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === i ? String : Number)(t);
	}(t, "string");
	return "symbol" == o$12(i) ? i : i + "";
}
var init_toPropertyKey_c7d670ac = __esmMin((() => {
	init_typeof_0dbfa870();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/createClass-2e0257aa.js
function r$5(e, r) {
	if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}
function t$10(r, t) {
	for (var n = 0; n < t.length; n++) {
		var o = t[n];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(r, t$11(o.key), o);
	}
}
function n$10(e, r, n) {
	return r && t$10(e.prototype, r), n && t$10(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
var init_createClass_2e0257aa = __esmMin((() => {
	init_toPropertyKey_c7d670ac();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.4.2_@_8c56b09a1ad3a662b74f968ca8850106/node_modules/@tencent/txdocs-aid/lib/esm/filetype.js
/**
* 获取上报用的 filetype
*/
function getFileTypeForReport$1() {
	return getFileTypeStrForReport$1();
}
function getFileTypeStrForReport$1() {
	var _a, _b, _c;
	return ((_c = (_b = (_a = getBasicClientVars$1()) === null || _a === void 0 ? void 0 : _a.docInfo) === null || _b === void 0 ? void 0 : _b.padInfo) === null || _c === void 0 ? void 0 : _c.padType) || getClientVars$1().padType;
}
function getBasicClientVars$1() {
	return window.basicClientVars;
}
function getClientVars$1() {
	var _a;
	return (_a = window.clientVars) !== null && _a !== void 0 ? _a : {};
}
var init_filetype$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.4.2_@_8c56b09a1ad3a662b74f968ca8850106/node_modules/@tencent/txdocs-aid/lib/esm/get-and-decompose-aid.js
function mapsMatch$1(maps, deftValue) {
	for (var i = 0; i < maps.length; i++) {
		var _a = __read(maps[i], 2), func = _a[0], value = _a[1];
		if (typeof func === "function" && func() || func) return value;
	}
	return deftValue;
}
function getQuery$1(key) {
	var m = null;
	var location = window.location;
	if (location) m = location.search.match(new RegExp("(\\?|&)" + key + "=([^&]*)(#|&|$)"));
	return !m ? "" : decodeURIComponent(m[2]);
}
function getSystem$1() {
	return mapsMatch$1([
		[isAndroid(), SYSTEMS$1.AN],
		[isIOS(), SYSTEMS$1.IOS],
		[isWindows(), SYSTEMS$1.WD],
		[isMac(), SYSTEMS$1.MAC],
		[isHarmony(), SYSTEMS$1.HMOS]
	], AID_PREFIX$1.DEFAULT);
}
function getPlatform$1() {
	return mapsMatch$1([
		[isQQDesktopDocsClient() || isQQMobileDocsClient(), PLATFORMS$1.QQMini],
		[isMobileQQBrowser(), PLATFORMS$1.QBH5],
		[isWxMiniProgram(), PLATFORMS$1.WXSP],
		[isQQMiniProgram() && getQuery$1("qqapp") === "form", PLATFORMS$1.QQSJB],
		[isQQMiniProgram() && getQuery$1("qqapp") === "clock", PLATFORMS$1.QQDK],
		[isQQMiniProgram() && getQuery$1("qqapp") === "jielong", PLATFORMS$1.QQJL],
		[isQQMiniProgram(), PLATFORMS$1.QQSP],
		[isMacAppStoreTencentDocsClient(), PLATFORMS$1.APP],
		[isPCTencentDocsClient() || isElectronTencentDocsClient(), PLATFORMS$1.DESK],
		[isTencentDocsApp(), PLATFORMS$1.APP],
		[isMobile(), PLATFORMS$1.H5],
		[isPC(), PLATFORMS$1.WEB]
	], AID_PREFIX$1.DEFAULT);
}
function joinApprecString$1(apprecArray) {
	var _a = __read(apprecArray, 4), apprec1 = _a[0], apprec2 = _a[1], apprec3 = _a[2], apprec4 = _a[3];
	apprec4 = getFileTypeForReport$1() || apprec4;
	if (!apprec1 && (apprec2 || apprec3 || apprec4)) apprec1 = "null";
	if (!apprec2 && (apprec3 || apprec4)) apprec2 = "null";
	if (!apprec3 && apprec4) apprec3 = "null";
	var apprecString = [
		apprec1,
		apprec2,
		apprec3,
		apprec4
	].filter(function(apprec) {
		return !!apprec;
	}).join("_");
	apprecString = apprecString ? "_" + apprecString : "";
	return apprecString;
}
/**
* 生成 aid 的函数，必要的参数为触发位置和功能，系统和平台默认添加
* @param aidOptions aid 配置选项
* @param useAidOptionsSystemInfo 是否使用 aidOptions 中的 system 和 plat 信息，默认为 false
*/
function getAidForReport$1(aidOptions, useAidOptionsSystemInfo) {
	if (useAidOptionsSystemInfo === void 0) useAidOptionsSystemInfo = false;
	var system = useAidOptionsSystemInfo && aidOptions.system ? aidOptions.system : systemCache$1 = systemCache$1 !== null && systemCache$1 !== void 0 ? systemCache$1 : getSystem$1();
	var plat = useAidOptionsSystemInfo && aidOptions.plat ? aidOptions.plat : platformCache$1 = platformCache$1 !== null && platformCache$1 !== void 0 ? platformCache$1 : getPlatform$1();
	var position = aidOptions.position, feature = aidOptions.feature, apprec1 = aidOptions.apprec1, apprec2 = aidOptions.apprec2, apprec3 = aidOptions.apprec3, apprec4 = aidOptions.apprec4;
	if (!verifyAidOptions$1(aidOptions)) {
		console.error("aid options 参数值校验失败，拒绝生成aid");
		return "";
	}
	var apprecString = joinApprecString$1([
		apprec1,
		apprec2,
		apprec3,
		apprec4
	]);
	return (aidOptions.prefix ? aidOptions.prefix : getPrefix$1()) + "_" + system + "_" + plat + "_" + position + "_" + feature + apprecString;
}
function getPrefix$1() {
	var _a, _b, _c, _d, _e;
	var result = AID_PREFIX$1.DOCS;
	var pathName = "";
	var hostName = "";
	try {
		pathName = ((_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.pathname) || "";
		hostName = ((_d = (_c = window.top) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.hostname) || "";
	} catch (error) {
		console.error("window.top?.location error :", error);
		pathName = "";
		hostName = "";
	}
	if (pathName.length === 0 && hostName.length === 0) try {
		var referrerStr = window.document.referrer;
		var url = new URL(referrerStr);
		pathName = url.pathname;
		hostName = url.host;
	} catch (error) {
		console.error("window.document.referrer error :", error);
		pathName = "";
		hostName = "";
	}
	if (pathName.length === 0 && hostName.length === 0) return result;
	if (hostName !== "docs.qq.com") return result;
	try {
		if (pathName && pathName.length > 0 && pathName.indexOf("/local_edit") !== -1) result = AID_PREFIX$1.LOCAL;
		else if (isTxCloud$1(pathName)) result = AID_PREFIX$1.CLOUD;
		else if (!((_e = window.top) === null || _e === void 0 ? void 0 : _e.basicClientVars)) result = AID_PREFIX$1.APPOP;
	} catch (error) {
		console.log("离线包文档 basicClientVars error:", error);
	}
	return result;
}
function isTxCloud$1(pathName) {
	var _a, _b, _c, _d;
	var result = false;
	try {
		result = pathName && pathName.length > 0 && (pathName.indexOf("/document") !== -1 || pathName.indexOf("/pdf") !== -1) || !!((_d = (_c = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.basicClientVars) === null || _b === void 0 ? void 0 : _b.docInfo) === null || _c === void 0 ? void 0 : _c.cosInfo) === null || _d === void 0 ? void 0 : _d.driveExt);
	} catch (error) {
		console.log("isTxCloud error:", error);
	}
	return result;
}
/**
* 校验 aid options 参数
* 校验不通过 console.error 出来对应错误提示，且返回false
*
* 现在需要校验的逻辑比较少，后续增多可以考虑用策略模式等
* @param aidOptions
*/
function verifyAidOptions$1(aidOptions) {
	/**
	* 所有参数值若不是undefined 则为string 且不应该带有下划线
	* 这里就不单独校验 position 和 feature 为undefined的情况，因为ts就可以check了
	*/
	var hasStringError = false;
	Object.entries(aidOptions).forEach(function(_a) {
		var _b = __read(_a, 2), key = _b[0], value = _b[1];
		if (typeof value === "undefined") return;
		if (typeof value !== "string") {
			console.error("aidOptions." + key + " 应为 string 类型 却收到：" + typeof value);
			hasStringError = true;
			return;
		}
		if (value.includes("_")) {
			console.error("aidOptions." + key + " 的值：" + value + "不应该带有下划线");
			hasStringError = true;
		}
	});
	if (hasStringError) return false;
	return true;
}
var systemCache$1, platformCache$1, SYSTEMS$1, PLATFORMS$1, AID_PREFIX$1, POSITIONS$1, decomposeAid$1, POSITIONS_WEIYUN$1;
var init_get_and_decompose_aid$1 = __esmMin((() => {
	init_tslib_es6();
	init_pure$1();
	init_filetype$1();
	(function(SYSTEMS) {
		SYSTEMS["AN"] = "an";
		SYSTEMS["IOS"] = "ios";
		SYSTEMS["MAC"] = "mac";
		SYSTEMS["WD"] = "wd";
		SYSTEMS["HMOS"] = "hmos";
		SYSTEMS["UNKNOWN"] = "";
	})(SYSTEMS$1 || (SYSTEMS$1 = {}));
	(function(PLATFORMS) {
		PLATFORMS["WXSP"] = "wxsp";
		PLATFORMS["QQSP"] = "qqsp";
		PLATFORMS["QQSJB"] = "qqsjb";
		PLATFORMS["QQDK"] = "qqdk";
		PLATFORMS["QQJL"] = "qqjl";
		PLATFORMS["DESK"] = "desk";
		PLATFORMS["H5"] = "h5";
		PLATFORMS["QBH5"] = "qbh5";
		PLATFORMS["WEB"] = "web";
		PLATFORMS["APP"] = "app";
		PLATFORMS["QQMini"] = "qqmini";
		PLATFORMS["UNKNOWN"] = "";
	})(PLATFORMS$1 || (PLATFORMS$1 = {}));
	(function(AID_PREFIX) {
		AID_PREFIX["DOCS"] = "txdocs";
		AID_PREFIX["CLOUD"] = "txcloud";
		AID_PREFIX["LOCAL"] = "txlocal";
		AID_PREFIX["APPOP"] = "txappop";
		AID_PREFIX["DEFAULT"] = "default";
	})(AID_PREFIX$1 || (AID_PREFIX$1 = {}));
	(function(POSITIONS) {
		POSITIONS["APPSREC"] = "appsrec";
		POSITIONS["CAPSULE"] = "capsule";
		POSITIONS["CATALOGUE"] = "catalogue";
		POSITIONS["CLOUDPLAY"] = "cloudplay";
		POSITIONS["FILTERPANEL"] = "filterpanel";
		POSITIONS["HOMEPAGE"] = "homepage";
		POSITIONS["MORESETTING"] = "moresetting";
		POSITIONS["MYTAB"] = "mytab";
		POSITIONS["NOTIFY"] = "notify";
		POSITIONS["OPERATE"] = "operate";
		POSITIONS["PAYPAGE"] = "paypage";
		POSITIONS["PERSNLPANEL"] = "persnlpanel";
		POSITIONS["PUSH"] = "push";
		POSITIONS["TITLEBAR"] = "titlebar";
		POSITIONS["TOOLBAR"] = "toolbar";
		POSITIONS["WXGZH"] = "wxgzh";
		POSITIONS["UPLOAD"] = "upload";
		POSITIONS["IMPORT"] = "import";
		POSITIONS["TIPS"] = "tips";
		POSITIONS["TYPEFACE"] = "typeface";
		POSITIONS["ACTIVITY"] = "activity";
		POSITIONS["DETAIL"] = "detail";
		POSITIONS["LIST"] = "list";
		POSITIONS["SPACE"] = "space";
		POSITIONS["LEFUPCOR"] = "lefupcor";
		POSITIONS["LISTRIGCLK"] = "listrigclk";
		POSITIONS["LISTRIGUPCOR"] = "listrigupcor";
		POSITIONS["LISTSHARERECEIVE"] = "listsharereceive";
		POSITIONS["DRIVEDETAILRIGUPCOR"] = "drivedetailrigupcor";
		POSITIONS["DRIVEDETAIL"] = "drivedetail";
		POSITIONS["FOLDERLIST"] = "folderlist";
		POSITIONS["QQNOTICE"] = "qqnotice";
		POSITIONS["COLLECTATM"] = "collectatm";
		POSITIONS["TEMPLATEMALL"] = "templatemall";
		POSITIONS["SIDEBAR"] = "sidebar";
		POSITIONS["FORMCOUNT"] = "formcount";
		POSITIONS["COMMON"] = "common";
		POSITIONS["HOVER"] = "hover";
		POSITIONS["QQLOCALBAR"] = "qqlocalbar";
		POSITIONS["TBSLOCALBAR"] = "tbslocalbar";
		POSITIONS["DEFAULT"] = "default";
		POSITIONS["RIGLOWCOR"] = "riglowcor";
		POSITIONS["CHAT"] = "chat";
		POSITIONS["VIP_CENTER"] = "vipcenter";
		POSITIONS["DETAILRIGUPCOR"] = "detailrigupcor";
		POSITIONS["COMMENT"] = "comment";
		POSITIONS["ACCMANAGE"] = "accmanage";
		POSITIONS["SHARE"] = "share";
		POSITIONS["SHAREPANEL"] = "sharepanel";
		POSITIONS["MTGSHAREDLIST"] = "mtgsharedlist";
		POSITIONS["NAMEPLATE"] = "nameplate";
		POSITIONS["CHATNEWS"] = "chatnews";
		POSITIONS["EDITFORM"] = "editform";
		POSITIONS["SIDEBARTHUM"] = "sidebarthum";
		POSITIONS["RIGHTMENU"] = "rightmenu";
		POSITIONS["APPTOOLPANEL"] = "apptoolpanel";
		POSITIONS["PICTOOLBAR"] = "pictoolbar";
		POSITIONS["PICRIGHTMENU"] = "picrightmenu";
		POSITIONS["PICPREVIEW"] = "picpreview";
		POSITIONS["LEFUPCORNEW"] = "lefupcornew";
		POSITIONS["LEFUPCORIMPORT"] = "lefupcorimport";
		POSITIONS["DETAILNEW"] = "detailnew";
		POSITIONS["DRAG"] = "drag";
		POSITIONS["VIPCENAVATAR"] = "vipcenavatar";
		POSITIONS["CONVERSION"] = "conversion";
		POSITIONS["UNKNOWN"] = "";
	})(POSITIONS$1 || (POSITIONS$1 = {}));
	decomposeAid$1 = function(aid) {
		var aidDecomposed = {
			prefix: AID_PREFIX$1.DEFAULT,
			system: SYSTEMS$1.UNKNOWN,
			plat: PLATFORMS$1.UNKNOWN,
			position: POSITIONS$1.UNKNOWN,
			feature: "",
			apprec1: void 0,
			apprec2: void 0,
			apprec3: void 0,
			apprec4: void 0
		};
		try {
			var aidArr = aid.split("_");
			if (!aidArr.length || aidArr.length < 5) return;
			aidDecomposed.prefix = aidArr[0];
			aidDecomposed.system = aidArr[1];
			aidDecomposed.plat = aidArr[2];
			aidDecomposed.position = aidArr[3];
			aidDecomposed.feature = aidArr[4];
			if (aidArr[5] && aidArr[5] !== "null") aidDecomposed.apprec1 = aidArr[5];
			if (aidArr[6] && aidArr[6] !== "null") aidDecomposed.apprec2 = aidArr[6];
			if (aidArr[7] && aidArr[7] !== "null") aidDecomposed.apprec3 = aidArr[7];
			if (aidArr[8] && aidArr[8] !== "null") aidDecomposed.apprec4 = aidArr[8];
			return aidDecomposed;
		} catch (e) {
			return;
		}
	};
	(function(POSITIONS_WEIYUN) {
		POSITIONS_WEIYUN["LIST"] = "list";
		POSITIONS_WEIYUN["RECENT"] = "recent";
		POSITIONS_WEIYUN["DOCUMENT"] = "document";
		POSITIONS_WEIYUN["PHOTO"] = "photo";
		POSITIONS_WEIYUN["UNKNOWN"] = "";
	})(POSITIONS_WEIYUN$1 || (POSITIONS_WEIYUN$1 = {}));
})), DEFAULT_AID_SELECTOR_VALUE$1, AID_SELECTOR_WEIGHTS$1, VipLevels;
var init_multidimensional_config$1 = __esmMin((() => {
	init_tslib_es6();
	init_axios();
	init_tencent_doc_report_es();
	init_get_and_decompose_aid$1();
	DEFAULT_AID_SELECTOR_VALUE$1 = "default";
	AID_SELECTOR_WEIGHTS$1 = {
		prefix: 1,
		system: 1,
		plat: 1,
		position: 1,
		feature: 1,
		apprec1: 1,
		apprec2: 1,
		apprec3: 1
	};
	(function(VipLevels) {
		VipLevels["NO_VIP"] = "noVip";
		VipLevels["VIP"] = "vip";
		VipLevels["SVIP"] = "svip";
		VipLevels["SVIP_PLUS"] = "svip_plus";
	})(VipLevels || (VipLevels = {}));
	(function() {
		function MultidimensionalConfigForAid(params) {
			this.wuJiDBConfig = params.wuJiDBConfig;
		}
		MultidimensionalConfigForAid.prototype.get = function(params) {
			return __awaiter(this, void 0, void 0, function() {
				var res;
				return __generator(this, function(_a) {
					switch (_a.label) {
						case 0: return [4, this.getTheOneWithHighestPriority(params)];
						case 1:
							res = _a.sent();
							tdw({
								opername: "MultidimensionalConfigForAid",
								module: "txdocsAid",
								action: "get",
								wuJiDBConfig: JSON.stringify(this.wuJiDBConfig),
								aid: params.aid,
								res: JSON.stringify(res)
							});
							return [2, res];
					}
				});
			});
		};
		MultidimensionalConfigForAid.prototype.getTheOneWithHighestPriority = function(params) {
			var _a;
			return __awaiter(this, void 0, void 0, function() {
				var destructedAid, filterInString, data, res;
				return __generator(this, function(_b) {
					switch (_b.label) {
						case 0:
							destructedAid = decomposeAid$1(params.aid);
							if (!destructedAid) return [2, void 0];
							filterInString = this.getFilterByAid(destructedAid, params.vipLevel);
							if (!filterInString) return [2, void 0];
							if (params === null || params === void 0 ? void 0 : params.extra) filterInString = "" + filterInString + this.getExtraFilter(params.extra);
							return [4, this.getDataFromWuJi({
								size: "total",
								filter: filterInString
							})];
						case 1:
							data = (_b.sent() || {}).data;
							if (!(data === null || data === void 0 ? void 0 : data.length)) return [2, void 0];
							res = (_a = this.findTheLineHasMostPriority({
								lines: data,
								destructedAid
							})) === null || _a === void 0 ? void 0 : _a[0];
							return [2, res];
					}
				});
			});
		};
		/**
		* 找出优先级最高的那行配置
		* 优先级规则
		* 1. 命中的 aid 配置的权重总和，权重值越高，优先级越高
		* 2. priority 字段配置的优先级，数字越大优先级越高
		* 3. 配置的 自增id，id越大优先级越高 （越晚配置的越优先）
		* @param lines
		*/
		MultidimensionalConfigForAid.prototype.findTheLineHasMostPriority = function(params) {
			var _this = this;
			var lines = params.lines, destructedAid = params.destructedAid;
			if (!lines.length) return;
			var newLines = __spreadArray([], __read(lines));
			newLines.sort(function(a, b) {
				/**
				* 规则 1
				*/
				var weightDiff = _this.countWeightOfLine({
					line: b,
					destructedAid
				}) - _this.countWeightOfLine({
					line: a,
					destructedAid
				});
				if (weightDiff !== 0) return weightDiff;
				/**
				* 如果规则 1 的优先级相同，再用规则 2 排序
				*/
				var priorityDiff = (b.priority || 0) - (a.priority || 0);
				if (priorityDiff !== 0) return priorityDiff;
				/**
				* 如果规则 2 的优先级相同，再用规则 3 排序
				*/
				return b.id - a.id;
			});
			return newLines;
		};
		MultidimensionalConfigForAid.prototype.countWeightOfLine = function(params) {
			var line = params.line, destructedAid = params.destructedAid;
			var cnt = 0;
			Object.keys(AID_SELECTOR_WEIGHTS$1).forEach(function(k) {
				if (line[k] !== DEFAULT_AID_SELECTOR_VALUE$1 && line[k] === destructedAid[k]) cnt += AID_SELECTOR_WEIGHTS$1[k];
			});
			return cnt;
		};
		MultidimensionalConfigForAid.prototype.getFilterByAid = function(destructedAid, vipLevel) {
			var filter = Object.entries(destructedAid).reduce(function(pre, curr) {
				var _a = __read(curr, 2), k = _a[0], v = _a[1];
				pre[k] = [DEFAULT_AID_SELECTOR_VALUE$1];
				if (v) pre[k].push(v);
				return pre;
			}, {});
			if (vipLevel) filter.vipLevel = [DEFAULT_AID_SELECTOR_VALUE$1, vipLevel];
			return Object.entries(filter).map(function(curr) {
				var _a = __read(curr, 2), k = _a[0], v = _a[1];
				var s = k;
				s = s + "=[" + v.map(function(subS) {
					return "\"" + subS + "\"";
				}).join(",") + "]";
				return s;
			}).join("&");
		};
		MultidimensionalConfigForAid.prototype.getDataFromWuJi = function(params) {
			return __awaiter(this, void 0, void 0, function() {
				var result;
				return __generator(this, function(_a) {
					switch (_a.label) {
						case 0:
							_a.trys.push([
								0,
								2,
								,
								3
							]);
							return [4, axios.get("https://v.qq.com/cache/wuji/object", { params: __assign(__assign({}, this.wuJiDBConfig), params) })];
						case 1:
							result = _a.sent();
							return [2, result.data];
						case 2:
							_a.sent();
							console.error("从无极拉取数据失败，请检查参数： params", params);
							return [2, void 0];
						case 3: return [2];
					}
				});
			});
		};
		MultidimensionalConfigForAid.prototype.getExtraFilter = function(extra) {
			var e_2, _a;
			var filterInString = "";
			try {
				try {
					for (var _b = __values(Object.keys(extra)), _c = _b.next(); !_c.done; _c = _b.next()) {
						var key = _c.value;
						filterInString = filterInString + "&" + key + "=[\"default\",\"" + extra[key] + "\"]";
					}
				} catch (e_2_1) {
					e_2 = { error: e_2_1 };
				} finally {
					try {
						if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
					} finally {
						if (e_2) throw e_2.error;
					}
				}
			} catch (e) {}
			return filterInString;
		};
		return MultidimensionalConfigForAid;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.4.2_@_8c56b09a1ad3a662b74f968ca8850106/node_modules/@tencent/txdocs-aid/lib/esm/index.js
var init_esm$6 = __esmMin((() => {
	init_get_and_decompose_aid$1();
	init_multidimensional_config$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/vip-service/index.js
var p$3, u$6;
var init_vip_service = __esmMin((() => {
	init_index_a3cfc692();
	init_createClass_2e0257aa();
	init_esm$9();
	init_dist$8();
	init_esm$10();
	init_esm$6();
	p$3 = {
		name: "docs-component-modal-to-pay",
		loadType: LoadType.ON_DEMAND
	};
	u$6 = function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [{
			key: "aiUseLimitError",
			value: (o = e$13(l$3.mark((function e() {
				var n, r;
				return l$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, h$1.getInstance().isShowAIAssistantRemainTimes();
						case 2:
							if (e.sent) {
								e.next = 5;
								break;
							}
							return e.abrupt("return");
						case 5: return e.next = 7, v$2.getInstance().extensionService.addExtensionConfig([p$3]);
						case 7: return e.next = 9, v$2.getInstance().getExtension(p$3.name);
						case 9: n = e.sent, r = getAidForReport$1({
							position: "aidesktop",
							feature: "aihelper",
							apprec1: "aisearch",
							apprec2: "createdoc"
						}), n.show({
							source: r,
							clickCb: function() {
								openUrl({ url: "https://docs.qq.com/vip/smart-assistant-pay?aid=".concat(r) });
							}
						});
						case 12:
						case "end": return e.stop();
					}
				}), e);
			}))), function() {
				return o.apply(this, arguments);
			})
		}]);
		var o;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/utils/url/index.js
var e$12, i$4, a$7, s$6, c$5;
var init_url = __esmMin((() => {
	e$12 = {
		conversation: "/v1/ai/copilot/conversations/",
		actionStream: "/api/ai/v1/copilot/streamactions",
		groups: "/v1/ai/history/groups",
		groupConversations: "/v1/ai/history/group/:groupId",
		deleteGroups: "/v1/ai/history/aisearch",
		deleteGroup: "/v1/ai/history/group/:groupId",
		conversationList: "/v1/ai/history/conversations"
	};
	i$4 = {
		createEmptyDoc: "/api/create/file/empty",
		createTemplateSlide: "/api/create/file/from/template"
	};
	a$7 = "/v1/ai/operation/userfeedback";
	s$6 = {
		spaceList: "/api/space/info/list",
		createWiki: "/api/space/wiki/create",
		spacePermission: "/api/permission/batch_get_attribute"
	};
	c$5 = function(e, i) {
		return e.replace(/:(\w+)/g, (function(e, a) {
			return a in i ? i[a] : ":".concat(a);
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/defineProperty-ba606e08.js
function r$4(r, t, o) {
	return (t = t$11(t)) in r ? Object.defineProperty(r, t, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : r[t] = o, r;
}
var init_defineProperty_ba606e08 = __esmMin((() => {
	init_toPropertyKey_c7d670ac();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/locales/index.js
var s$5, r$3, a$6, o$10;
var init_locales = __esmMin((() => {
	init_defineProperty_ba606e08();
	s$5 = {
		"ai-search-result": "腾讯文档AI搜索结果",
		share: {
			"share-link": "分享链接",
			generated: "已经生成",
			copy: "复制"
		},
		message: {
			"share-error": "此内容违反腾讯文档社区公约，暂时无法分享",
			"share-copy-success": "分享链接已复制"
		},
		action: { delete: "删除" },
		error: {
			"file-type-unsupported": "格式暂不支持",
			"file-not-owner": "非当前用户所用"
		},
		"online-size-limit": "已过滤超出{{size}}M的文档",
		"save-place": "云文档",
		"save-wiki-place": "空间",
		"save-service": { reference: { "save-to": "保存到" } }
	};
	r$3 = {
		"ai-search-result": "騰訊文檔AI搜索結果",
		share: {
			"share-link": "分享鏈接",
			generated: "已經生成",
			copy: "複製"
		},
		message: {
			"share-error": "此內容違反騰訊文檔社區公約，暫時無法分享",
			"share-copy-success": "分享鏈接已複製"
		},
		action: { delete: "删除" },
		error: {
			"file-type-unsupported": "格式暫不支持",
			"file-not-owner": "非當前用戶所用"
		},
		"online-size-limit": "已過濾超出{{size}}M的文檔",
		"save-place": "雲端文件",
		"save-wiki-place": "空間",
		"save-service": { reference: { "save-to": "保存到" } }
	};
	a$6 = "ai-common-hooks";
	o$10 = {
		"en-US": r$4({}, a$6, {
			"ai-search-result": "Tencent Document AI search result",
			share: {
				"share-link": "share link",
				generated: "has been generated",
				copy: "Copy"
			},
			message: {
				"share-error": "This content violates the Tencent Docs Community convention and cannot be shared temporarily.",
				"share-copy-success": "The sharing link has been copied"
			},
			action: { delete: "Delete" },
			error: {
				"file-type-unsupported": "Format not supported",
				"file-not-owner": "Not used by the current user"
			},
			"online-size-limit": "Documents exceeding {{size}}M have been filtered",
			"save-place": "Cloud Docs",
			"save-wiki-place": "Space",
			"save-service": { reference: { "save-to": "Save to" } }
		}),
		"zh-CN": r$4({}, a$6, s$5),
		"zh-HK": r$4({}, a$6, r$3)
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/utils/i18n/index.js
function c$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter((function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function s$4(r) {
	for (var t = 1; t < arguments.length; t++) {
		var o = null != arguments[t] ? arguments[t] : {};
		t % 2 ? c$4(Object(o), !0).forEach((function(t) {
			r$4(r, t, o[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : c$4(Object(o)).forEach((function(e) {
			Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e));
		}));
	}
	return r;
}
var i$3;
var init_i18n = __esmMin((() => {
	init_defineProperty_ba606e08();
	init_locales();
	init_esm$11();
	initI18n({
		resources: o$10,
		ns: a$6
	});
	i$3 = function(e, r) {
		return translate(e, s$4(s$4({}, r), {}, { ns: a$6 }));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/unsupportedIterableToArray-ebb39036.js
function r$2(r, t) {
	(null == t || t > r.length) && (t = r.length);
	for (var n = 0, e = Array(t); n < t; n++) e[n] = r[n];
	return e;
}
function t$9(t, n) {
	if (t) {
		if ("string" == typeof t) return r$2(t, n);
		var e = {}.toString.call(t).slice(8, -1);
		return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? r$2(t, n) : void 0;
	}
}
var init_unsupportedIterableToArray_ebb39036 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/slicedToArray-e715395f.js
function t$8(t, e) {
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
	}(t, e) || t$9(t, e) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_slicedToArray_e715395f = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-visibility-change/index.js
var import_react$26, n$9;
var init_use_visibility_change = __esmMin((() => {
	init_slicedToArray_e715395f();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	n$9 = function() {
		var r = t$8((0, import_react$26.useState)("visible" === document.visibilityState), 2), o = r[0], s = r[1];
		return (0, import_react$26.useEffect)((function() {
			var i = function() {
				s("visible" === document.visibilityState);
			};
			return document.addEventListener("visibilitychange", i), function() {
				document.removeEventListener("visibilitychange", i);
			};
		}), []), o;
	};
}));
var init_use_vip_type = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-space/index.js
var import_react$24, p$2;
var init_use_space = __esmMin((() => {
	init_index_a3cfc692();
	init_slicedToArray_e715395f();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_url();
	init_esm$9();
	p$2 = function() {
		var p = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], d = t$8((0, import_react$24.useState)([]), 2), l = d[0], v = d[1];
		(0, import_react$24.useEffect)((function() {
			p && m();
		}), []);
		var m = function() {
			var t = e$13(l$3.mark((function r() {
				var t, e;
				return l$3.wrap((function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0:
							if (S.isSupportSpace()) {
								r.next = 2;
								break;
							}
							return r.abrupt("return");
						case 2: return r.next = 4, b({});
						case 4: t = r.sent, e = t.spaceInfos, v(void 0 === e ? [] : e);
						case 8:
						case "end": return r.stop();
					}
				}), r);
			})));
			return function() {
				return t.apply(this, arguments);
			};
		}(), h = function() {
			var t = e$13(l$3.mark((function r() {
				return l$3.wrap((function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0: return r.next = 2, m();
						case 2:
						case "end": return r.stop();
					}
				}), r);
			})));
			return function() {
				return t.apply(this, arguments);
			};
		}(), x = function() {
			var t = e$13(l$3.mark((function r(t) {
				var e, u;
				return l$3.wrap((function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0:
							if (e = t || o$13("wikiId")) {
								r.next = 3;
								break;
							}
							return r.abrupt("return");
						case 3: return r.next = 5, y({ id: e });
						case 5: return u = r.sent, r.abrupt("return", u);
						case 7:
						case "end": return r.stop();
					}
				}), r);
			})));
			return function(r) {
				return t.apply(this, arguments);
			};
		}(), b = function() {
			var t = e$13(l$3.mark((function r(t) {
				var e, u, s, c, p, f, d;
				return l$3.wrap((function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0: return e = t.descending, u = t.orderBy, s = t.queryBy, c = t.num, r.prev = 1, r.next = 4, d$1({
							url: s$6.spaceList,
							method: "post",
							data: {
								descending: e,
								orderBy: u,
								queryBy: s,
								num: c
							},
							config: { params: { xsrf: r$7() } }
						});
						case 4: return f = r.sent, d = f.data, r.abrupt("return", null !== (p = null == d ? void 0 : d.result) && void 0 !== p ? p : {});
						case 9: return r.prev = 9, r.t0 = r.catch(1), console.log("接口调用失败"), r.abrupt("return", {});
						case 13:
						case "end": return r.stop();
					}
				}), r, null, [[1, 9]]);
			})));
			return function(r) {
				return t.apply(this, arguments);
			};
		}(), y = function() {
			var t = e$13(l$3.mark((function r(t) {
				var e, u, s, c;
				return l$3.wrap((function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0: return e = t.id, r.prev = 1, r.next = 4, d$1({
							url: s$6.spacePermission,
							method: "post",
							data: { docs: [{ id: e }] },
							config: { params: { xsrf: r$7() } }
						});
						case 4: return s = r.sent, c = s.data, r.abrupt("return", !(null == c || null === (u = c.result) || void 0 === u || null === (u = u.attribute_info) || void 0 === u || null === (u = u[e]) || void 0 === u || !u.can_edit));
						case 9: return r.prev = 9, r.t0 = r.catch(1), console.log("接口调用失败"), r.abrupt("return", !1);
						case 13:
						case "end": return r.stop();
					}
				}), r, null, [[1, 9]]);
			})));
			return function(r) {
				return t.apply(this, arguments);
			};
		}();
		return {
			spaces: l,
			getSpacePermission: x,
			updateSpaces: h
		};
	};
}));
var init_use_scroll_bottom = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-outside-click/index.js
var import_react$22, e$9;
var init_use_outside_click = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	e$9 = function(e, r, c, o) {
		var u = (0, import_react$22.useCallback)((function(t) {
			var n = null;
			if (null != o && o.length) {
				var c = t.target;
				if (o.some((function(t) {
					return c.closest(t);
				}))) return;
			}
			(n = "string" == typeof e ? document.getElementById(e) : e.current) && !n.contains(t.target) && r(t);
		}), [r, e]);
		(0, import_react$22.useEffect)((function() {
			var t = c ? document.getElementById(c) : document;
			return t?.addEventListener("click", u), function() {
				t?.removeEventListener("click", u);
			};
		}), [c, u]);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-horizontal-scroll/index.js
var import_react$21, t$5;
var init_use_horizontal_scroll = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	t$5 = function(t) {
		(0, import_react$21.useEffect)((function() {
			var e = t.current, r = function(t) {
				0 !== t.deltaY && (e.scrollLeft += t.deltaY, e.scrollLeft += t.deltaX, t.preventDefault());
			};
			return e && e.addEventListener("wheel", r), function() {
				e && e.removeEventListener("wheel", r);
			};
		}), [t]);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/chunks/toConsumableArray-d8de034d.js
function e$7(e) {
	return function(t) {
		if (Array.isArray(t)) return r$2(t);
	}(e) || function(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}(e) || t$9(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_toConsumableArray_d8de034d = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/doc-type.js
var DocType$1;
var init_doc_type$1 = __esmMin((() => {
	DocType$1 = /*#__PURE__*/ function(DocType) {
		DocType[DocType["Doc"] = 0] = "Doc";
		DocType[DocType["Sheet"] = 1] = "Sheet";
		DocType[DocType["Form"] = 2] = "Form";
		DocType[DocType["Folder"] = 3] = "Folder";
		DocType[DocType["Slide"] = 4] = "Slide";
		DocType[DocType["Note"] = 5] = "Note";
		DocType[DocType["Pdf"] = 6] = "Pdf";
		DocType[DocType["MiniProgram"] = 7] = "MiniProgram";
		DocType[DocType["Aio"] = 7] = "Aio";
		DocType[DocType["SmartCanvas"] = 8] = "SmartCanvas";
		DocType[DocType["SmartSheet"] = 9] = "SmartSheet";
		DocType[DocType["Unknown"] = 10] = "Unknown";
		DocType[DocType["Resume"] = 11] = "Resume";
		DocType[DocType["Board"] = 12] = "Board";
		DocType[DocType["Ofd"] = 13] = "Ofd";
		DocType[DocType["Markdown"] = 14] = "Markdown";
		DocType[DocType["Drawing"] = 89] = "Drawing";
		DocType[DocType["Mind"] = 90] = "Mind";
		DocType[DocType["FlowChart"] = 91] = "FlowChart";
		DocType[DocType["Flowchart"] = 91] = "Flowchart";
		DocType[DocType["File"] = 100] = "File";
		DocType[DocType["Drive"] = 101] = "Drive";
		DocType[DocType["Rec"] = 102] = "Rec";
		DocType[DocType["Addon"] = 110] = "Addon";
		DocType[DocType["LocalFile"] = -201] = "LocalFile";
		DocType[DocType["Derivative"] = 111] = "Derivative";
		return DocType;
	}({});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/enumerate.js
var WordMimeTypes$1, ExcelMimeTypes$1, PowerPointMimeTypes$1, TextMimeTypes$1, CodeMimeTypes$1, ImageMimeTypes$1, AudioMimeTypes$1, VideoMimeTypes$1, archiveMimeTypes, flowChatMimeTypes$1, mindMimeTypes$1, MarkdownMimeTypes$1, OfdMimeTypes;
var init_enumerate$1 = __esmMin((() => {
	WordMimeTypes$1 = [
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/kswps",
		"application/kswpt",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		"application/vnd.ms-word.document.macroEnabled.12",
		"application/vnd.ms-word.template.macroEnabled.12"
	];
	ExcelMimeTypes$1 = [
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		"text/csv",
		"text/csv; charset=utf-8",
		"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
		"application/vnd.ms-excel.sheet.macroEnabled.12",
		"application/vnd.ms-excel.template.macroEnabled.12",
		"application/kset",
		"application/ksett"
	];
	PowerPointMimeTypes$1 = [
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
	TextMimeTypes$1 = [
		"text/lrc",
		"text/asp; charset=utf-8",
		"application/x-msdownload",
		"text/richtext; charset=utf-8",
		"text/plain",
		"text/plain; charset=utf-8",
		"text/xml",
		"text/html",
		"text/html; charset=utf-8",
		"text/markdown"
	];
	CodeMimeTypes$1 = [
		"text/x-c; charset=utf-8",
		"text/x-c; charset=utf-8",
		"text/x-chdr",
		"text/x-asm; charset=utf-8",
		"text/x-java-source; charset=utf-8",
		"text/javascript",
		"text/x-go"
	];
	ImageMimeTypes$1 = [
		"image/x-sony-arw",
		"image/bmp",
		"image/vnd.zbrush.pcx",
		"image/x-pcx",
		"image/tiff",
		"image/gif",
		"image/x-exif",
		"image/exif",
		"image/jpeg",
		"image/vnd.fpx",
		"image/svg+xml",
		"image/vnd.adobe.photoshop",
		"image/x-cdr",
		"image/x-photo-cd",
		"image/vnd.dxf",
		"image/x-ufo",
		"application/postscript",
		"image/png",
		"image/wmf",
		"image/webp",
		"image/x-tga"
	];
	AudioMimeTypes$1 = [
		"audio/mpeg",
		"audio/aac",
		"audio/x-flac",
		"audio/amr",
		"audio/AMR",
		"audio/mp4",
		"audio/x-ms-wma",
		"audio/x-wav",
		"audio/x-cd",
		"audio/x-wave",
		"audio/x-aiff",
		"audio/midi",
		"audio/x-realaudio",
		"audio/realaudio",
		"audio/x-twinvq",
		"audio/oggvorbis",
		"audio/ogg",
		"audio/x-ape",
		"audio/webm",
		"audio/mpeg-4"
	];
	VideoMimeTypes$1 = [
		"video/mp4",
		"video/3gpp",
		"video/x-ms-asf",
		"video/x-msvideo",
		"video/dv",
		"video/x-flv",
		"video/x-f4v",
		"application/vnd.apple.mpegurl",
		"video/x-matroska",
		"video/quicktime",
		"video/mpeg",
		"video/mp2t",
		"application/vnd.rn-realmedia",
		"audio/x-pn-realaudio",
		"video/x-ms-wmv",
		"video/dat",
		"video/webm",
		"video/x-ms-vob"
	];
	archiveMimeTypes = [
		"application/zip",
		"application/vnd.rar",
		"application/x-rar-compressed",
		"application/x-compress",
		"application/x-7z-compressed"
	];
	flowChatMimeTypes$1 = [
		"application/vnd.ms-visio.drawing",
		"application/x-visio",
		"application/vnd.ms-visio.drawing.main+xml"
	];
	mindMimeTypes$1 = ["application/vnd.pos"];
	MarkdownMimeTypes$1 = [
		"application/vnd.tdocs-apps.markdown",
		"text/markdown",
		"text/markdown; charset=utf-8"
	];
	OfdMimeTypes = ["application/vnd.tdocs-apps.ofd", "application/ofd"];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/ext.js
var init_ext = __esmMin((() => {}));
var init_ext_to_doctype$1 = __esmMin((() => {
	init_doc_type$1();
	DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Doc, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Sheet, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.Slide, DocType$1.FlowChart, DocType$1.FlowChart, DocType$1.Mind, DocType$1.Mind, DocType$1.Pdf, DocType$1.Markdown, DocType$1.Markdown, DocType$1.Doc;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/ext-to-mimetype.js
var init_ext_to_mimetype = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/mime-type.js
var MimeType$1;
var init_mime_type$1 = __esmMin((() => {
	MimeType$1 = /*#__PURE__*/ function(MimeType) {
		MimeType["Doc"] = "application/vnd.tdocs-apps.doc";
		MimeType["Sheet"] = "application/vnd.tdocs-apps.sheet";
		MimeType["Form"] = "application/vnd.tdocs-apps.form";
		MimeType["Folder"] = "application/vnd.tdocs-apps.folder";
		MimeType["CollaborationSpace"] = "application/vnd.tdocs-apps.collaboration-space";
		MimeType["CollaborationSpaceRoot"] = "application/vnd.tdocs-apps.collaboration-space-root";
		MimeType["SharedFolder"] = "application/vnd.tdocs-apps.shared-folder";
		MimeType["Share"] = "application/vnd.tdocs-apps.share-folder";
		MimeType["Slide"] = "application/vnd.tdocs-apps.slide";
		MimeType["Pdf"] = "application/pdf";
		MimeType["Aio"] = "application/vnd.tdocs-apps.aio";
		MimeType["SmartCanvas"] = "application/vnd.tdocs-apps.smartcanvas";
		MimeType["SmartSheet"] = "application/vnd.tdocs-apps.smartsheet";
		MimeType["Mind"] = "application/vnd.tdocs-apps.mind";
		MimeType["FlowChart"] = "application/vnd.tdocs-apps.flowchart";
		MimeType["Board"] = "application/vnd.tdocs-apps.board";
		MimeType["Rec"] = "application/vnd.tdocs-apps.rec";
		MimeType["Word"] = "application/vnd.ms-word";
		MimeType["Excel"] = "application/vnd.ms-excel";
		MimeType["Powerpoint"] = "application/vnd.ms-powerpoint";
		MimeType["Txt"] = "text/plain";
		MimeType["Pixso"] = "application/vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed";
		MimeType["Boardmix"] = "application/vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853";
		MimeType["Zhiying"] = "application/vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60";
		MimeType["Code"] = "code";
		MimeType["Default"] = "application/vnd.tdocs-apps.default";
		MimeType["Image"] = "image";
		MimeType["Audio"] = "audio";
		MimeType["Video"] = "video";
		MimeType["Zip"] = "application/zip";
		MimeType["Ofd"] = "application/vnd.tdocs-apps.ofd";
		MimeType["DriveOfd"] = "application/ofd";
		MimeType["Markdown"] = "application/vnd.tdocs-apps.markdown";
		MimeType["Markdown_ASCII"] = "text/markdown";
		MimeType["Markdown_UTF8"] = "text/markdown; charset=utf-8";
		MimeType["XMind"] = "xmind";
		MimeType["Visio"] = "visio";
		MimeType["Safe"] = "application/vnd.tdocs-apps.safe-folder";
		MimeType["WikiSpace"] = "application/vnd.tdocs-apps.wiki-space";
		MimeType["Webpage"] = "application/vnd.tdocs-webpage";
		MimeType["Derivative_Query"] = "application/vnd.tdocs-apps.derivative.query";
		MimeType["Derivative_Form"] = "application/vnd.tdocs-apps.derivative.form";
		MimeType["Device"] = "application/vnd.tdocs-apps.device";
		return MimeType;
	}({});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/pad-type.js
var PadType$1;
var init_pad_type$1 = __esmMin((() => {
	PadType$1 = /*#__PURE__*/ function(PadType) {
		PadType["Doc"] = "doc";
		PadType["Sheet"] = "sheet";
		PadType["Form"] = "form";
		PadType["Folder"] = "folder";
		PadType["Slide"] = "slide";
		PadType["Note"] = "note";
		PadType["Pdf"] = "pdf";
		PadType["MiniProgram"] = "aio";
		PadType["Aio"] = "aio";
		PadType["Unknown"] = "unknown";
		PadType["Resume"] = "resume";
		PadType["Ofd"] = "ofd";
		PadType["RelationGraph"] = "relationGraph";
		PadType["Mind"] = "mind";
		PadType["FlowChart"] = "flowchart";
		PadType["Board"] = "board";
		PadType["Markdown"] = "markdown";
		PadType["File"] = "file";
		PadType["Drive"] = "drive";
		PadType["SogouSpeech"] = "rec";
		PadType["Addon"] = "addon";
		PadType["SmartCanvas"] = "smartcanvas";
		PadType["SmartSheet"] = "smartsheet";
		PadType["LocalFile"] = "local_file";
		PadType["Derivative"] = "derivative";
		return PadType;
	}({});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/constant/types.js
function _typeof(obj) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
		return typeof obj;
	} : function(obj) {
		return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	}, _typeof(obj);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(arg) {
	var key = _toPrimitive(arg, "string");
	return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
	if (_typeof(input) !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (_typeof(res) !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
var _docTypeToMimeTypeMap, _drivePadTypeToMimeTy, _docTypeToPadTypeMap, _padTypeToMimeTypeMap, _padTypeToDocTypeMap, docTypeToMimeTypeMap$1, padTypeToMimeTypeMap$1;
var init_types$1 = __esmMin((() => {
	init_doc_type$1();
	init_enumerate$1();
	init_mime_type$1();
	init_pad_type$1();
	docTypeToMimeTypeMap$1 = (_docTypeToMimeTypeMap = {}, _defineProperty(_docTypeToMimeTypeMap, DocType$1.Doc, MimeType$1.Doc), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Sheet, MimeType$1.Sheet), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Slide, MimeType$1.Slide), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Form, MimeType$1.Form), _defineProperty(_docTypeToMimeTypeMap, DocType$1.SmartCanvas, MimeType$1.SmartCanvas), _defineProperty(_docTypeToMimeTypeMap, DocType$1.SmartSheet, MimeType$1.SmartSheet), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Mind, MimeType$1.Mind), _defineProperty(_docTypeToMimeTypeMap, DocType$1.FlowChart, MimeType$1.FlowChart), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Rec, MimeType$1.Rec), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Pdf, MimeType$1.Pdf), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Aio, MimeType$1.Aio), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Board, MimeType$1.Board), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Ofd, MimeType$1.Ofd), _defineProperty(_docTypeToMimeTypeMap, DocType$1.Markdown, MimeType$1.Markdown), _docTypeToMimeTypeMap);
	DocType$1.Doc, MimeType$1.Ofd, MimeType$1.DriveOfd, DocType$1.Ofd, DocType$1.Sheet, DocType$1.Slide, MimeType$1.Form, DocType$1.Form, MimeType$1.SmartCanvas, DocType$1.SmartCanvas, MimeType$1.SmartSheet, DocType$1.SmartSheet, MimeType$1.Doc, DocType$1.Doc, MimeType$1.Sheet, DocType$1.Sheet, MimeType$1.Slide, DocType$1.Slide, MimeType$1.Mind, DocType$1.Mind, MimeType$1.FlowChart, DocType$1.FlowChart, MimeType$1.Board, DocType$1.Board, DocType$1.Markdown, DocType$1.Doc, DocType$1.Doc, MimeType$1.Pdf, DocType$1.Pdf, DocType$1.FlowChart, DocType$1.Mind, MimeType$1.Folder, DocType$1.Folder, MimeType$1.Derivative_Form, DocType$1.Derivative, MimeType$1.Derivative_Query, DocType$1.Derivative;
	_drivePadTypeToMimeTy = {}, _defineProperty(_drivePadTypeToMimeTy, PadType$1.Doc, MimeType$1.Word), _defineProperty(_drivePadTypeToMimeTy, PadType$1.Sheet, MimeType$1.Excel), _defineProperty(_drivePadTypeToMimeTy, PadType$1.Slide, MimeType$1.Powerpoint), _defineProperty(_drivePadTypeToMimeTy, PadType$1.Mind, MimeType$1.XMind), _defineProperty(_drivePadTypeToMimeTy, PadType$1.FlowChart, MimeType$1.Visio);
	_docTypeToPadTypeMap = {}, _defineProperty(_docTypeToPadTypeMap, DocType$1.Doc, PadType$1.Doc), _defineProperty(_docTypeToPadTypeMap, DocType$1.Sheet, PadType$1.Sheet), _defineProperty(_docTypeToPadTypeMap, DocType$1.Form, PadType$1.Form), _defineProperty(_docTypeToPadTypeMap, DocType$1.Folder, PadType$1.Folder), _defineProperty(_docTypeToPadTypeMap, DocType$1.Slide, PadType$1.Slide), _defineProperty(_docTypeToPadTypeMap, DocType$1.Note, PadType$1.Note), _defineProperty(_docTypeToPadTypeMap, DocType$1.Pdf, PadType$1.Pdf), _defineProperty(_docTypeToPadTypeMap, DocType$1.MiniProgram, PadType$1.MiniProgram), _defineProperty(_docTypeToPadTypeMap, DocType$1.SmartCanvas, PadType$1.SmartCanvas), _defineProperty(_docTypeToPadTypeMap, DocType$1.SmartSheet, PadType$1.SmartSheet), _defineProperty(_docTypeToPadTypeMap, DocType$1.Unknown, PadType$1.Unknown), _defineProperty(_docTypeToPadTypeMap, DocType$1.Resume, PadType$1.Resume), _defineProperty(_docTypeToPadTypeMap, DocType$1.Board, PadType$1.Board), _defineProperty(_docTypeToPadTypeMap, DocType$1.Ofd, PadType$1.Ofd), _defineProperty(_docTypeToPadTypeMap, DocType$1.Markdown, PadType$1.Markdown), _defineProperty(_docTypeToPadTypeMap, DocType$1.Drawing, PadType$1.RelationGraph), _defineProperty(_docTypeToPadTypeMap, DocType$1.Mind, PadType$1.Mind), _defineProperty(_docTypeToPadTypeMap, DocType$1.FlowChart, PadType$1.FlowChart), _defineProperty(_docTypeToPadTypeMap, DocType$1.File, PadType$1.File), _defineProperty(_docTypeToPadTypeMap, DocType$1.Drive, PadType$1.Drive), _defineProperty(_docTypeToPadTypeMap, DocType$1.Rec, PadType$1.SogouSpeech), _defineProperty(_docTypeToPadTypeMap, DocType$1.Addon, PadType$1.Addon), _defineProperty(_docTypeToPadTypeMap, DocType$1.LocalFile, PadType$1.LocalFile), _defineProperty(_docTypeToPadTypeMap, DocType$1.Derivative, PadType$1.Derivative);
	padTypeToMimeTypeMap$1 = (_padTypeToMimeTypeMap = {}, _defineProperty(_padTypeToMimeTypeMap, PadType$1.Doc, MimeType$1.Doc), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Sheet, MimeType$1.Sheet), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Slide, MimeType$1.Slide), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Form, MimeType$1.Form), _defineProperty(_padTypeToMimeTypeMap, PadType$1.SmartCanvas, MimeType$1.SmartCanvas), _defineProperty(_padTypeToMimeTypeMap, PadType$1.SmartSheet, MimeType$1.SmartSheet), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Mind, MimeType$1.Mind), _defineProperty(_padTypeToMimeTypeMap, PadType$1.FlowChart, MimeType$1.FlowChart), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Pdf, MimeType$1.Pdf), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Aio, MimeType$1.Aio), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Board, MimeType$1.Board), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Ofd, MimeType$1.Ofd), _defineProperty(_padTypeToMimeTypeMap, PadType$1.Markdown, MimeType$1.Markdown), _defineProperty(_padTypeToMimeTypeMap, PadType$1.SogouSpeech, MimeType$1.Rec), _padTypeToMimeTypeMap);
	PadType$1.Drive, PadType$1.Drive, PadType$1.Drive, MimeType$1.Form, PadType$1.Form, MimeType$1.SmartCanvas, PadType$1.SmartCanvas, MimeType$1.SmartSheet, PadType$1.SmartSheet, MimeType$1.Doc, PadType$1.Doc, MimeType$1.Sheet, PadType$1.Sheet, MimeType$1.Slide, PadType$1.Slide, MimeType$1.Mind, PadType$1.Mind, MimeType$1.FlowChart, PadType$1.FlowChart, MimeType$1.Board, PadType$1.Board, PadType$1.Drive, PadType$1.Drive, MimeType$1.Pdf, PadType$1.Pdf, PadType$1.FlowChart, PadType$1.Mind, PadType$1.Drive, PadType$1.Drive, PadType$1.Drive, MimeType$1.Ofd, PadType$1.Ofd, MimeType$1.Markdown, PadType$1.Markdown, MimeType$1.Rec, PadType$1.SogouSpeech;
	_padTypeToDocTypeMap = {}, _defineProperty(_padTypeToDocTypeMap, PadType$1.Doc, DocType$1.Doc), _defineProperty(_padTypeToDocTypeMap, PadType$1.Sheet, DocType$1.Sheet), _defineProperty(_padTypeToDocTypeMap, PadType$1.Form, DocType$1.Form), _defineProperty(_padTypeToDocTypeMap, PadType$1.Folder, DocType$1.Folder), _defineProperty(_padTypeToDocTypeMap, PadType$1.Slide, DocType$1.Slide), _defineProperty(_padTypeToDocTypeMap, PadType$1.Note, DocType$1.Note), _defineProperty(_padTypeToDocTypeMap, PadType$1.Pdf, DocType$1.Pdf), _defineProperty(_padTypeToDocTypeMap, PadType$1.MiniProgram, DocType$1.MiniProgram), _defineProperty(_padTypeToDocTypeMap, PadType$1.SmartCanvas, DocType$1.SmartCanvas), _defineProperty(_padTypeToDocTypeMap, PadType$1.SmartSheet, DocType$1.SmartSheet), _defineProperty(_padTypeToDocTypeMap, PadType$1.Unknown, DocType$1.Unknown), _defineProperty(_padTypeToDocTypeMap, PadType$1.Resume, DocType$1.Resume), _defineProperty(_padTypeToDocTypeMap, PadType$1.Board, DocType$1.Board), _defineProperty(_padTypeToDocTypeMap, PadType$1.Ofd, DocType$1.Ofd), _defineProperty(_padTypeToDocTypeMap, PadType$1.Markdown, DocType$1.Markdown), _defineProperty(_padTypeToDocTypeMap, PadType$1.RelationGraph, DocType$1.Drawing), _defineProperty(_padTypeToDocTypeMap, PadType$1.Mind, DocType$1.Mind), _defineProperty(_padTypeToDocTypeMap, PadType$1.FlowChart, DocType$1.FlowChart), _defineProperty(_padTypeToDocTypeMap, PadType$1.File, DocType$1.File), _defineProperty(_padTypeToDocTypeMap, PadType$1.Drive, DocType$1.Drive), _defineProperty(_padTypeToDocTypeMap, PadType$1.SogouSpeech, DocType$1.Rec), _defineProperty(_padTypeToDocTypeMap, PadType$1.Addon, DocType$1.Addon), _defineProperty(_padTypeToDocTypeMap, PadType$1.LocalFile, DocType$1.LocalFile);
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/util.js
var init_util$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/detect-methods.js
var init_detect_methods$1 = __esmMin((() => {
	init_types$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@2._4b98d64b9671e9ce46c2d57bf060ef0c/node_modules/@tencent/docs-mime-types/dist/esm/index.js
var init_esm$5 = __esmMin((() => {
	init_doc_type$1();
	init_enumerate$1();
	init_ext();
	init_ext_to_doctype$1();
	init_ext_to_mimetype();
	init_mime_type$1();
	init_pad_type$1();
	init_types$1();
	init_detect_methods$1();
	init_util$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/svg/cdn.js
var require_cdn$8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/tencent-docs/svg/";
		return {
			"-resume": p + "-resume.svg",
			"application-json": p + "application-json.svg",
			"application-ofd": p + "application-ofd.svg",
			"application-pdf": p + "application-pdf.svg",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel.svg",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint.svg",
			"application-vnd.ms-word": p + "application-vnd.ms-word.svg",
			"application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed": p + "application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed.svg",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c.svg",
			"application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60": p + "application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60.svg",
			"application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853": p + "application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853.svg",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3.svg",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board.svg",
			"application-vnd.tdocs-apps.collaboration-space-root": p + "application-vnd.tdocs-apps.collaboration-space-root.svg",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space.svg",
			"application-vnd.tdocs-apps.cooperation-space": p + "application-vnd.tdocs-apps.cooperation-space.svg",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default.svg",
			"application-vnd.tdocs-apps.derivative.form": p + "application-vnd.tdocs-apps.derivative.form.svg",
			"application-vnd.tdocs-apps.derivative.query": p + "application-vnd.tdocs-apps.derivative.query.svg",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc.svg",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart.svg",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder.svg",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form.svg",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown.svg",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind.svg",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes.svg",
			"application-vnd.tdocs-apps.ofd": p + "application-vnd.tdocs-apps.ofd.svg",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page.svg",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec.svg",
			"application-vnd.tdocs-apps.safe-folder": p + "application-vnd.tdocs-apps.safe-folder.svg",
			"application-vnd.tdocs-apps.share-folder": p + "application-vnd.tdocs-apps.share-folder.svg",
			"application-vnd.tdocs-apps.shared-folder": p + "application-vnd.tdocs-apps.shared-folder.svg",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet.svg",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide.svg",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas.svg",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet.svg",
			"application-vnd.tdocs-apps.teamcheck": p + "application-vnd.tdocs-apps.teamcheck.svg",
			"application-vnd.tdocs-apps.teamcollect": p + "application-vnd.tdocs-apps.teamcollect.svg",
			"application-vnd.tdocs-apps.teamjob": p + "application-vnd.tdocs-apps.teamjob.svg",
			"application-vnd.tdocs-apps.teamjoin": p + "application-vnd.tdocs-apps.teamjoin.svg",
			"application-vnd.tdocs-apps.teamnotice": p + "application-vnd.tdocs-apps.teamnotice.svg",
			"application-vnd.tdocs-apps.teamscore": p + "application-vnd.tdocs-apps.teamscore.svg",
			"application-vnd.tdocs-apps.teamsign": p + "application-vnd.tdocs-apps.teamsign.svg",
			"application-vnd.tdocs-apps.teamvote": p + "application-vnd.tdocs-apps.teamvote.svg",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space.svg",
			"application-vnd.tdocs-webpage": p + "application-vnd.tdocs-webpage.svg",
			"application-zip": p + "application-zip.svg",
			"application_vnd_tdocs_apps_notes": p + "application_vnd_tdocs_apps_notes.svg",
			"application_vnd_tdocs_apps_upload_folder": p + "application_vnd_tdocs_apps_upload_folder.svg",
			"audio": p + "audio.svg",
			"cad": p + "cad.svg",
			"code": p + "code.svg",
			"drive-excel": p + "drive-excel.svg",
			"drive-powerpoint": p + "drive-powerpoint.svg",
			"drive-word": p + "drive-word.svg",
			"ebook": p + "ebook.svg",
			"icon-test-app": p + "icon-test-app.svg",
			"icon_quick": p + "icon_quick.svg",
			"image": p + "image.svg",
			"system_file_manager": p + "system_file_manager.svg",
			"text": p + "text.svg",
			"video": p + "video.svg",
			"visio": p + "visio.svg",
			"xmind": p + "xmind.svg"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/miniprogram/share-placeholder/cdn.js
var require_cdn$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/miniprogram/share-placeholder/";
		return {
			"application-pdf": p + "application-pdf@3x.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel@3x.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint@3x.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word@3x.png",
			"application-vnd.tdocs-apps-addon": p + "application-vnd.tdocs-apps-addon@3x.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board@3x.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default@3x.png",
			"application-vnd.tdocs-apps.derivative.form": p + "application-vnd.tdocs-apps.derivative.form@3x.png",
			"application-vnd.tdocs-apps.derivative.query": p + "application-vnd.tdocs-apps.derivative.query@3x.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc@3x.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart@3x.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form@3x.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown@3x.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind@3x.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes@3x.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page@3x.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec@3x.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet@3x.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide@3x.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas@3x.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet@3x.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space@3x.png",
			"application_tencentlibrarydoc": p + "application_tencentlibrarydoc@3x.png",
			"application_tencentlibrarypdf": p + "application_tencentlibrarypdf@3x.png",
			"application_tencentlibraryppt": p + "application_tencentlibraryppt@3x.png",
			"application_tencentlibrarysheet": p + "application_tencentlibrarysheet@3x.png",
			"audio": p + "audio@3x.png",
			"b_application-addon": p + "b_application-addon@3x.png",
			"b_application-audio": p + "b_application-audio@3x.png",
			"b_application-board": p + "b_application-board@3x.png",
			"b_application-default": p + "b_application-default@3x.png",
			"b_application-doc": p + "b_application-doc@3x.png",
			"b_application-flowchart": p + "b_application-flowchart@3x.png",
			"b_application-form": p + "b_application-form@3x.png",
			"b_application-image": p + "b_application-image@3x.png",
			"b_application-lide": p + "b_application-lide@3x.png",
			"b_application-mind": p + "b_application-mind@3x.png",
			"b_application-pdf": p + "b_application-pdf@3x.png",
			"b_application-rec": p + "b_application-rec@3x.png",
			"b_application-sheet": p + "b_application-sheet@3x.png",
			"b_application-slide": p + "b_application-slide@3x.png",
			"b_application-smartcanvas": p + "b_application-smartcanvas@3x.png",
			"b_application-smartsheet": p + "b_application-smartsheet@3x.png",
			"b_application-video": p + "b_application-video@3x.png",
			"image": p + "image@3x.png",
			"video": p + "video@3x.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/miniprogram/structured-cover/cdn.js
var require_cdn$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/miniprogram/structured-cover/";
		return {
			"application-pdf": p + "application-pdf@3x.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel@3x.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint@3x.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word@3x.png",
			"application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed": p + "application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed@3x.png",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c@3x.png",
			"application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60": p + "application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60@3x.png",
			"application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853": p + "application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853@3x.png",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3@3x.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board@3x.png",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space@3x.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default@3x.png",
			"application-vnd.tdocs-apps.derivative.form": p + "application-vnd.tdocs-apps.derivative.form@3x.png",
			"application-vnd.tdocs-apps.derivative.query": p + "application-vnd.tdocs-apps.derivative.query@3x.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc@3x.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart@3x.png",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder@3x.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form@3x.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown@3x.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind@3x.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes@3x.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page@3x.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec@3x.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet@3x.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide@3x.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas@3x.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet@3x.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space@3x.png",
			"application_camera": p + "application_camera@3x.png",
			"application_ofd": p + "application_ofd@3x.png",
			"audio": p + "audio@3x.png",
			"code": p + "code@3x.png",
			"cv": p + "cv@3x.png",
			"image": p + "image@3x.png",
			"remove_handwriting": p + "remove_handwriting@3x.png",
			"text": p + "text@3x.png",
			"video": p + "video@3x.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/miniprogram/structured-message/cdn.js
var require_cdn$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/miniprogram/structured-message/";
		return {
			"application-pdf": p + "application-pdf@3x.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel@3x.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint@3x.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word@3x.png",
			"application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed": p + "application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed@3x.png",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c@3x.png",
			"application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60": p + "application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60@3x.png",
			"application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853": p + "application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853@3x.png",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3@3x.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board@3x.png",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space@3x.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default@3x.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc@3x.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart@3x.png",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder@3x.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form@3x.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown@3x.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind@3x.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes@3x.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page@3x.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec@3x.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet@3x.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide@3x.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas@3x.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet@3x.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space@3x.png",
			"application_ofd": p + "application_ofd@3x.png",
			"audio": p + "audio@3x.png",
			"code": p + "code@3x.png",
			"image": p + "image@3x.png",
			"text": p + "text@3x.png",
			"video": p + "video@3x.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/png-200px/cdn.js
var require_cdn$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/tencent-docs/png-200px/";
		return {
			"application-json": p + "application-json.png",
			"application-ofd": p + "application-ofd.png",
			"application-pdf": p + "application-pdf.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word.png",
			"application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed": p + "application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed.png",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c.png",
			"application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60": p + "application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60.png",
			"application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853": p + "application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853.png",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board.png",
			"application-vnd.tdocs-apps.collaboration-space-root": p + "application-vnd.tdocs-apps.collaboration-space-root.png",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space.png",
			"application-vnd.tdocs-apps.cooperation-space": p + "application-vnd.tdocs-apps.cooperation-space.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default.png",
			"application-vnd.tdocs-apps.derivative.form": p + "application-vnd.tdocs-apps.derivative.form.png",
			"application-vnd.tdocs-apps.derivative.query": p + "application-vnd.tdocs-apps.derivative.query.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart.png",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes.png",
			"application-vnd.tdocs-apps.ofd": p + "application-vnd.tdocs-apps.ofd.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec.png",
			"application-vnd.tdocs-apps.safe-folder": p + "application-vnd.tdocs-apps.safe-folder.png",
			"application-vnd.tdocs-apps.share-folder": p + "application-vnd.tdocs-apps.share-folder.png",
			"application-vnd.tdocs-apps.shared-folder": p + "application-vnd.tdocs-apps.shared-folder.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet.png",
			"application-vnd.tdocs-apps.teamcheck": p + "application-vnd.tdocs-apps.teamcheck.png",
			"application-vnd.tdocs-apps.teamcollect": p + "application-vnd.tdocs-apps.teamcollect.png",
			"application-vnd.tdocs-apps.teamjob": p + "application-vnd.tdocs-apps.teamjob.png",
			"application-vnd.tdocs-apps.teamjoin": p + "application-vnd.tdocs-apps.teamjoin.png",
			"application-vnd.tdocs-apps.teamnotice": p + "application-vnd.tdocs-apps.teamnotice.png",
			"application-vnd.tdocs-apps.teamscore": p + "application-vnd.tdocs-apps.teamscore.png",
			"application-vnd.tdocs-apps.teamsign": p + "application-vnd.tdocs-apps.teamsign.png",
			"application-vnd.tdocs-apps.teamvote": p + "application-vnd.tdocs-apps.teamvote.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space.png",
			"application-vnd.tdocs-webpage": p + "application-vnd.tdocs-webpage.png",
			"application-zip": p + "application-zip.png",
			"application_vnd_tdocs_apps_space": p + "application_vnd_tdocs_apps_space@3x.png",
			"application_vnd_tdocs_apps_upload_folder": p + "application_vnd_tdocs_apps_upload_folder.png",
			"audio": p + "audio.png",
			"code": p + "code.png",
			"drive-excel": p + "drive-excel.png",
			"drive-powerpoint": p + "drive-powerpoint.png",
			"drive-word": p + "drive-word.png",
			"image": p + "image.png",
			"text": p + "text.png",
			"video": p + "video.png",
			"visio": p + "visio.png",
			"xmind": p + "xmind.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/png@3x/cdn.js
var require_cdn$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/tencent-docs/png@3x/";
		return {
			"application-json": p + "application-json@3x.png",
			"application-ofd": p + "application-ofd@3x.png",
			"application-pdf": p + "application-pdf@3x.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel@3x.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint@3x.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word@3x.png",
			"application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed": p + "application-vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed@3x.png",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c@3x.png",
			"application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60": p + "application-vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60@3x.png",
			"application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853": p + "application-vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853@3x.png",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3@3x.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board.png",
			"application-vnd.tdocs-apps.collaboration-space-root": p + "application-vnd.tdocs-apps.collaboration-space-root.png",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space@3x.png",
			"application-vnd.tdocs-apps.cooperation-space": p + "application-vnd.tdocs-apps.cooperation-space@3x.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default@3x.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc@3x.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart@3x.png",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder@3x.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form@3x.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown@3x.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind@3x.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes@3x.png",
			"application-vnd.tdocs-apps.ofd": p + "application-vnd.tdocs-apps.ofd@3x.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page@3x.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec@3x.png",
			"application-vnd.tdocs-apps.safe-folder": p + "application-vnd.tdocs-apps.safe-folder.png",
			"application-vnd.tdocs-apps.share-folder": p + "application-vnd.tdocs-apps.share-folder@3x.png",
			"application-vnd.tdocs-apps.shared-folder": p + "application-vnd.tdocs-apps.shared-folder.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet@3x.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide@3x.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas@3x.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet@3x.png",
			"application-vnd.tdocs-apps.teamcheck": p + "application-vnd.tdocs-apps.teamcheck@3x.png",
			"application-vnd.tdocs-apps.teamcollect": p + "application-vnd.tdocs-apps.teamcollect@3x.png",
			"application-vnd.tdocs-apps.teamjob": p + "application-vnd.tdocs-apps.teamjob@3x.png",
			"application-vnd.tdocs-apps.teamjoin": p + "application-vnd.tdocs-apps.teamjoin@3x.png",
			"application-vnd.tdocs-apps.teamnotice": p + "application-vnd.tdocs-apps.teamnotice@3x.png",
			"application-vnd.tdocs-apps.teamscore": p + "application-vnd.tdocs-apps.teamscore@3x.png",
			"application-vnd.tdocs-apps.teamsign": p + "application-vnd.tdocs-apps.teamsign@3x.png",
			"application-vnd.tdocs-apps.teamvote": p + "application-vnd.tdocs-apps.teamvote@3x.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space@3x.png",
			"application-vnd.tdocs-webpage": p + "application-vnd.tdocs-webpage@3x.png",
			"application-zip": p + "application-zip@3x.png",
			"application_vnd_tdocs_apps_upload_folder": p + "application_vnd_tdocs_apps_upload_folder@3x.png",
			"audio": p + "audio@3x.png",
			"cad": p + "cad@3x.png",
			"code": p + "code@3x.png",
			"drive-excel": p + "drive-excel@3x.png",
			"drive-powerpoint": p + "drive-powerpoint@3x.png",
			"drive-word": p + "drive-word@3x.png",
			"ebook": p + "ebook@3x.png",
			"icon_quick": p + "icon_quick@3x.png",
			"image": p + "image@3x.png",
			"text": p + "text@3x.png",
			"video": p + "video@3x.png",
			"visio": p + "visio@3x.png",
			"xmind": p + "xmind@3x.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/tencent-docs/favicon/cdn.js
var require_cdn$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/tencent-docs/favicon/";
		return {
			"application-json": p + "application-json.png",
			"application-ofd": p + "application-ofd.png",
			"application-pdf": p + "application-pdf.png",
			"application-vnd.ms-excel": p + "application-vnd.ms-excel.png",
			"application-vnd.ms-powerpoint": p + "application-vnd.ms-powerpoint.png",
			"application-vnd.ms-word": p + "application-vnd.ms-word.png",
			"application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c": p + "application-vnd.tdocs-addon-image.84e7b8f3a6b542b380cd984b94b1752c.png",
			"application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3": p + "application-vnd.tdocs-addon-image.f87386fee10348178ee65f8eedc4b2f3.png",
			"application-vnd.tdocs-apps.board": p + "application-vnd.tdocs-apps.board.png",
			"application-vnd.tdocs-apps.collaboration-space": p + "application-vnd.tdocs-apps.collaboration-space.png",
			"application-vnd.tdocs-apps.default": p + "application-vnd.tdocs-apps.default.png",
			"application-vnd.tdocs-apps.doc": p + "application-vnd.tdocs-apps.doc.png",
			"application-vnd.tdocs-apps.flowchart": p + "application-vnd.tdocs-apps.flowchart.png",
			"application-vnd.tdocs-apps.folder": p + "application-vnd.tdocs-apps.folder.png",
			"application-vnd.tdocs-apps.form": p + "application-vnd.tdocs-apps.form.png",
			"application-vnd.tdocs-apps.markdown": p + "application-vnd.tdocs-apps.markdown.png",
			"application-vnd.tdocs-apps.mind": p + "application-vnd.tdocs-apps.mind.png",
			"application-vnd.tdocs-apps.notes": p + "application-vnd.tdocs-apps.notes.png",
			"application-vnd.tdocs-apps.ofd": p + "application-vnd.tdocs-apps.ofd.png",
			"application-vnd.tdocs-apps.page": p + "application-vnd.tdocs-apps.page.png",
			"application-vnd.tdocs-apps.rec": p + "application-vnd.tdocs-apps.rec.png",
			"application-vnd.tdocs-apps.safe-folder": p + "application-vnd.tdocs-apps.safe-folder.png",
			"application-vnd.tdocs-apps.share-folder": p + "application-vnd.tdocs-apps.share-folder.png",
			"application-vnd.tdocs-apps.shared-folder": p + "application-vnd.tdocs-apps.shared-folder.png",
			"application-vnd.tdocs-apps.sheet": p + "application-vnd.tdocs-apps.sheet.png",
			"application-vnd.tdocs-apps.slide": p + "application-vnd.tdocs-apps.slide.png",
			"application-vnd.tdocs-apps.smartcanvas": p + "application-vnd.tdocs-apps.smartcanvas.png",
			"application-vnd.tdocs-apps.smartsheet": p + "application-vnd.tdocs-apps.smartsheet.png",
			"application-vnd.tdocs-apps.wiki-space": p + "application-vnd.tdocs-apps.wiki-space.png",
			"application-vnd.tdocs-webpage": p + "application-vnd.tdocs-webpage.png",
			"application-zip": p + "application-zip.png",
			"application_vnd_tdocs_apps_ai": p + "application_vnd_tdocs_apps_ai.png",
			"application_vnd_tdocs_apps_upload_folder": p + "application_vnd_tdocs_apps_upload_folder.png",
			"application_vnd_tdocsspace": p + "application_vnd_tdocsspace.png",
			"audio": p + "audio.png",
			"code": p + "code.png",
			"drive-excel": p + "drive-excel.png",
			"drive-powerpoint": p + "drive-powerpoint.png",
			"drive-word": p + "drive-word.png",
			"image": p + "image.png",
			"smartsheet-form": p + "smartsheet-form.png",
			"smartsheet_query_120": p + "smartsheet_query_120.png",
			"smartsheet_query_64": p + "smartsheet_query_64.png",
			"text": p + "text.png",
			"video": p + "video.png",
			"visio": p + "visio.png",
			"xmind": p + "xmind.png"
		};
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/private-tdocs/png-200px/cdn.js
var require_cdn$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/private-tdocs/png-200px/";
		return { "application-vnd.tdocs-apps.collaboration-space-root": p + "application-vnd.tdocs-apps.collaboration-space-root.png" };
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-design-resour_054612c2a7960800a2400a6b15a62135/node_modules/@tencent/docs-design-resources/document-management/private-tdocs/svg/cdn.js
var require_cdn = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var __importDefault = function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var npmConfig = __importDefault((init_esm$7(), __toCommonJS(esm_exports))).default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	exports.default = (function() {
		var p = (npmConfig === null || npmConfig === void 0 ? void 0 : npmConfig.CDN_ORIGIN) || "https://docs.gtimg.com/docs-design-resources";
		p = p + "/document-management/private-tdocs/svg/";
		return { "application-vnd.tdocs-apps.collaboration-space-root": p + "application-vnd.tdocs-apps.collaboration-space-root.svg" };
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/util/icons.js
var import_cdn, import_cdn$1, import_cdn$2, import_cdn$3, import_cdn$4, import_cdn$5, import_cdn$6, import_cdn$7, import_cdn$8, iconUrl, sharePlaceholderUrl, structuredCoverUrl, structuredMessageUrl, iconPngUrl, faviconUrl, privateTDocsUrl, privateTDocsSvgUrl, iconPng3xUrl;
var init_icons = __esmMin((() => {
	import_cdn = /* @__PURE__ */ __toESM(require_cdn$8());
	import_cdn$1 = /* @__PURE__ */ __toESM(require_cdn$7());
	import_cdn$2 = /* @__PURE__ */ __toESM(require_cdn$6());
	import_cdn$3 = /* @__PURE__ */ __toESM(require_cdn$5());
	import_cdn$4 = /* @__PURE__ */ __toESM(require_cdn$4());
	import_cdn$5 = /* @__PURE__ */ __toESM(require_cdn$3());
	import_cdn$6 = /* @__PURE__ */ __toESM(require_cdn$2());
	import_cdn$7 = /* @__PURE__ */ __toESM(require_cdn$1());
	import_cdn$8 = /* @__PURE__ */ __toESM(require_cdn());
	iconUrl = import_cdn.default;
	sharePlaceholderUrl = import_cdn$1.default;
	structuredCoverUrl = import_cdn$2.default;
	structuredMessageUrl = import_cdn$3.default;
	iconPngUrl = import_cdn$4.default;
	faviconUrl = import_cdn$6.default;
	privateTDocsUrl = import_cdn$7.default;
	privateTDocsSvgUrl = import_cdn$8.default;
	iconPng3xUrl = import_cdn$5.default;
})), matchExtensionNameToMimetype, matchMimeTypeToUrl, matchMimeTypeToStructuredMessageUrl, matchMimeTypeToStructuredCoverUrl, matchMimeTypeToSharePlaceholderUrl, matchMimeTypeToPngUrl, matchMimeTypeToFavicon, defaultFileIconUrl, cdnDomain, fileIconSvgPath, fileIconPngPath;
var init_const = __esmMin((() => {
	init_esm$5();
	init_icons();
	matchExtensionNameToMimetype = [
		{
			reg: /doc|dot|wps|wpt|docx|dotx|docm|dotm/,
			result: MimeType$1.Word
		},
		{
			reg: /xls|xlt|xlsx|xltx|csv|xlsb|xlsm|xltm|et|ett|ets/,
			result: MimeType$1.Excel
		},
		{
			reg: /pptx|ppt|pot|potx|pps|ppsx|dps|dpt|pptm|potm|ppsm/,
			result: MimeType$1.Powerpoint
		},
		{
			reg: /lrc|asp|bat|bas|prg|cmd|rtf|txt|log|xml|htm|html/,
			result: MimeType$1.Txt
		},
		{
			reg: /^(raw|bmp|pcx|tiff|gif|exif|jpeg|jpg|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|png|wmf|webp|tga)/,
			result: MimeType$1.Image
		},
		{
			reg: /zip|7z|rar/,
			result: MimeType$1.Zip
		},
		{
			reg: /^(mp3|acc|flac|amr|m4a|m4b|wma|wav|cd|wave|aiff|midi|ra|vqf|ogg|ape|weba|aac|flac|mpeg-4|realaudio)/,
			result: MimeType$1.Audio
		},
		{
			reg: /^(mp4|3gp|asf|avi|dv|flv|f4v|m3u8|mkv|qt|mov|mpg|mpeg|mts|vob|wmv|rm|m4v|asx|dat|rmvb)/,
			result: MimeType$1.Video
		},
		{
			reg: /^(c|cpp|h|asm|s|java|js|jsx|ts|tsx|go|py|md|sh|asp|jsp|php|sql|json|kt|yaml|rust|rs|swift|dart|cs)/,
			result: MimeType$1.Code
		},
		{
			reg: /pdf/,
			result: MimeType$1.Pdf
		},
		{
			reg: /vsdx|vsd/,
			result: MimeType$1.Visio
		},
		{
			reg: /pos|xmind/,
			result: MimeType$1.XMind
		},
		{
			reg: /ofd/,
			result: MimeType$1.Ofd
		}
	];
	matchMimeTypeToUrl = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: iconUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: iconUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: iconUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: iconUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: CodeMimeTypes$1,
			result: iconUrl.code
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: iconUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: iconUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: iconUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: iconUrl.text
		},
		{
			mimeTypes: [MimeType$1.Folder],
			result: iconUrl["application-vnd.tdocs-apps.folder"]
		},
		{
			mimeTypes: archiveMimeTypes,
			result: iconUrl["application-zip"]
		},
		{
			mimeTypes: [MimeType$1.CollaborationSpaceRoot],
			result: privateTDocsSvgUrl["application-vnd.tdocs-apps.collaboration-space-root"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: iconUrl["application-ofd"]
		},
		{
			mimeTypes: [MimeType$1.WikiSpace],
			result: iconUrl["application-vnd.tdocs-apps.wiki-space"]
		},
		{
			mimeTypes: mindMimeTypes$1,
			result: iconUrl["application-vnd.tdocs-apps.mind"]
		}
	];
	matchMimeTypeToStructuredMessageUrl = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: structuredCoverUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: structuredMessageUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: structuredMessageUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: structuredMessageUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: structuredMessageUrl.text
		},
		{
			mimeTypes: [MimeType$1.Folder],
			result: structuredMessageUrl["application-vnd.tdocs-apps.folder"]
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: structuredMessageUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: structuredMessageUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: structuredMessageUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: structuredMessageUrl.application_ofd
		},
		{
			mimeTypes: [MimeType$1.WikiSpace],
			result: structuredMessageUrl["application-vnd.tdocs-apps.wiki-space"]
		}
	];
	matchMimeTypeToStructuredCoverUrl = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: structuredCoverUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: structuredCoverUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: structuredCoverUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: structuredCoverUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: structuredCoverUrl.text
		},
		{
			mimeTypes: [MimeType$1.Folder],
			result: structuredCoverUrl["application-vnd.tdocs-apps.folder"]
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: structuredCoverUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: structuredCoverUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: structuredCoverUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: structuredCoverUrl.application_ofd
		},
		{
			mimeTypes: [MimeType$1.WikiSpace],
			result: structuredCoverUrl["application-vnd.tdocs-apps.wiki-space"]
		},
		{
			mimeTypes: [MimeType$1.Derivative_Query],
			result: structuredCoverUrl["application-vnd.tdocs-apps.derivative.form"]
		},
		{
			mimeTypes: [MimeType$1.Derivative_Query],
			result: structuredCoverUrl["application-vnd.tdocs-apps.derivative.query"]
		}
	];
	matchMimeTypeToSharePlaceholderUrl = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: sharePlaceholderUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			reg: /addon/i,
			result: sharePlaceholderUrl["application-vnd.tdocs-apps-addon"]
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: sharePlaceholderUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: sharePlaceholderUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: sharePlaceholderUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: sharePlaceholderUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: sharePlaceholderUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: sharePlaceholderUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: sharePlaceholderUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: sharePlaceholderUrl["application-pdf"]
		},
		{
			mimeTypes: [MimeType$1.WikiSpace],
			result: sharePlaceholderUrl["application-vnd.tdocs-apps.wiki-space"]
		}
	];
	matchMimeTypeToPngUrl = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: iconPngUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: iconPngUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: iconPngUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: iconPngUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: iconPngUrl.text
		},
		{
			mimeTypes: CodeMimeTypes$1,
			result: iconPngUrl.code
		},
		{
			mimeTypes: [MimeType$1.Folder],
			result: iconPngUrl["application-vnd.tdocs-apps.folder"]
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: iconPngUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: iconPngUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: iconPngUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: archiveMimeTypes,
			result: iconPngUrl["application-zip"]
		},
		{
			mimeTypes: [MimeType$1.CollaborationSpaceRoot],
			result: privateTDocsUrl["application-vnd.tdocs-apps.collaboration-space-root"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: iconPngUrl["application-ofd"]
		},
		{
			mimeTypes: [MimeType$1.WikiSpace],
			result: iconPngUrl["application-vnd.tdocs-apps.wiki-space"]
		},
		{
			mimeTypes: [MimeType$1.Derivative_Query],
			result: iconPngUrl["application-vnd.tdocs-apps.derivative.query"]
		},
		{
			mimeTypes: [MimeType$1.Derivative_Form],
			result: iconPngUrl["application-vnd.tdocs-apps.derivative.form"]
		},
		{
			mimeTypes: flowChatMimeTypes$1,
			result: iconPngUrl.visio
		},
		{
			mimeTypes: mindMimeTypes$1,
			result: iconPngUrl.xmind
		}
	];
	iconPng3xUrl["application-vnd.tdocs-apps.markdown"], iconPng3xUrl.image, iconPng3xUrl.audio, iconPng3xUrl.video, iconPng3xUrl.text, iconPng3xUrl.code, MimeType$1.Folder, iconPng3xUrl["application-vnd.tdocs-apps.folder"], iconPng3xUrl["application-vnd.ms-word"], iconPng3xUrl["application-vnd.ms-excel"], iconPng3xUrl["application-vnd.ms-powerpoint"], iconPng3xUrl["application-zip"], MimeType$1.CollaborationSpaceRoot, privateTDocsUrl["application-vnd.tdocs-apps.collaboration-space-root"], iconPng3xUrl["application-ofd"], MimeType$1.WikiSpace, iconPng3xUrl["application-vnd.tdocs-apps.wiki-space"], iconPng3xUrl.visio, iconPng3xUrl.xmind;
	matchMimeTypeToFavicon = [
		{
			mimeTypes: MarkdownMimeTypes$1,
			result: faviconUrl["application-vnd.tdocs-apps.markdown"]
		},
		{
			mimeTypes: ImageMimeTypes$1,
			result: faviconUrl.image
		},
		{
			mimeTypes: AudioMimeTypes$1,
			result: faviconUrl.audio
		},
		{
			mimeTypes: VideoMimeTypes$1,
			result: faviconUrl.video
		},
		{
			mimeTypes: TextMimeTypes$1,
			result: faviconUrl.text
		},
		{
			mimeTypes: CodeMimeTypes$1,
			result: faviconUrl.code
		},
		{
			mimeTypes: WordMimeTypes$1,
			result: faviconUrl["application-vnd.ms-word"]
		},
		{
			mimeTypes: ExcelMimeTypes$1,
			result: faviconUrl["application-vnd.ms-excel"]
		},
		{
			mimeTypes: PowerPointMimeTypes$1,
			result: faviconUrl["application-vnd.ms-powerpoint"]
		},
		{
			mimeTypes: [MimeType$1.Doc],
			result: faviconUrl["application-vnd.tdocs-apps.doc"]
		},
		{
			mimeTypes: [MimeType$1.Sheet],
			result: faviconUrl["application-vnd.tdocs-apps.sheet"]
		},
		{
			mimeTypes: [MimeType$1.Slide],
			result: faviconUrl["application-vnd.tdocs-apps.slide"]
		},
		{
			mimeTypes: [MimeType$1.Pdf],
			result: faviconUrl["application-pdf"]
		},
		{
			mimeTypes: [MimeType$1.Mind],
			result: faviconUrl["application-vnd.tdocs-apps.mind"]
		},
		{
			mimeTypes: [MimeType$1.FlowChart],
			result: faviconUrl["application-vnd.tdocs-apps.flowchart"]
		},
		{
			mimeTypes: archiveMimeTypes,
			result: faviconUrl["application-zip"]
		},
		{
			mimeTypes: OfdMimeTypes,
			result: faviconUrl["application-ofd"]
		}
	];
	defaultFileIconUrl = iconUrl["application-vnd.tdocs-apps.default"];
	iconPngUrl["application-vnd.tdocs-apps.default"];
	iconUrl["application-vnd.tdocs-apps.folder"];
	structuredMessageUrl["application-vnd.tdocs-apps.default"];
	structuredCoverUrl["application-vnd.tdocs-apps.default"];
	sharePlaceholderUrl["application-vnd.tdocs-apps.default"];
	sharePlaceholderUrl["application-vnd.tdocs-apps-addon"];
	faviconUrl["application-vnd.tdocs-apps.default"];
	cdnDomain = "https://docs.gtimg.com/docs-design-resources/document-management/";
	fileIconSvgPath = "tencent-docs/svg/";
	fileIconPngPath = "tencent-docs/png-200px/";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/util/match-machine.js
var MatchMachine;
var init_match_machine = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	MatchMachine = /*#__PURE__*/ function() {
		/**
		* 规则匹配机
		*
		* 主要用于：
		*   匹配 mimeType，并根据 mimeType 返回 icon;
		*   根据文件扩展名推断 Mimetype;
		*
		* 首先试图根据精准匹配规则寻找匹配结果；若无精准匹配结果则试图寻找模糊匹配结果；若无则返回默认结果
		*/
		function MatchMachine(preciseMatchMap, fuzzyMatchRules) {
			_classCallCheck(this, MatchMachine);
			this.preciseMatchMap = preciseMatchMap;
			this.fuzzyMatchRules = fuzzyMatchRules;
		}
		/** 匹配并返回结果 */
		_createClass(MatchMachine, [{
			key: "run",
			value: function run(str) {
				if (typeof str !== "string") {
					console.warn("file-icon match with none-string parameter");
					return;
				}
				/**
				* 由于图片资源是放在cdn上的，并且是以mimeType来命名，名字如果是application/pdf的话，就会把application变成一个文件路径，资源最后是叫pdf.svg。
				* 为了要兼容这个特殊的逻辑，将图片资源的名字改成application-pdf.svg。
				* 这里单独转换一下 mimeType 中的 '/' -> '-' 来完全匹配
				*/
				var transformStr = str.replace("/", "-");
				var mapResult = this.preciseMatchMap[transformStr];
				if (mapResult) return mapResult;
				var matchResult = this.fuzzyMatchRules.find(function(rule) {
					if (rule.mimeTypes) return rule.mimeTypes.includes(str);
					if (rule.reg) return rule.reg.test(str);
				});
				return matchResult === null || matchResult === void 0 ? void 0 : matchResult.result;
			}
		}]);
		return MatchMachine;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/util/utils.js
/**
* 适配没有 mimeType 的存量文件、mimeType 为 folder 的特殊文件夹。
* 主要用于工具包入口函数推断和处理 mimeType
* 如果匹配不到返回 undefined, 主调方需要处理 undefined 的情况
*/
function mimetypeAdaptor(_ref) {
	var docType = _ref.docType, mimeTypeInput = _ref.mimeType, _ref$isCollaboration = _ref.isCollaboration, isCollaboration = _ref$isCollaboration === void 0 ? false : _ref$isCollaboration, ext = _ref.extensionName, padType = _ref.padType;
	var extensionName = ext === null || ext === void 0 ? void 0 : ext.toLocaleLowerCase();
	var mimeType = validateMimeType({
		docType,
		mimeType: mimeTypeInput,
		extensionName,
		padType
	});
	if (!mimeType) mimeType = inferMimetype(docType, padType, extensionName);
	if (mimeType === MimeType$1.Folder) mimeType = correctFolderMimetype(isCollaboration);
	return mimeType;
}
/**
* 通过 docType、padType 文件扩展名 推断 mimeType
*
* 主要用于存量文件没有 mimeType 和传入未知的 mimeType 的情景
*/
function inferMimetype(docType, padType, extensionName) {
	if (isDrive(docType, padType) && extensionName) {
		var _extensionName;
		if (((_extensionName = extensionName) === null || _extensionName === void 0 ? void 0 : _extensionName.charAt(0)) === ".") extensionName = extensionName.substring(1);
		return new MatchMachine({}, matchExtensionNameToMimetype).run(extensionName) || MimeType$1.Default;
	}
	/**
	* 补充folder 推断的逻辑 
	*/
	if (docType === DocType$1.Folder) return MimeType$1.Folder;
	return docTypeToMimeTypeMap$1[docType] || padTypeToMimeTypeMap$1[padType];
}
function isDrive(docType, padType) {
	/**
	* 本地文件也是 Drive 文件
	**/
	if (docType) return docType === DocType$1.Drive || docType === DocType$1.LocalFile;
	if (padType) return padType.indexOf(PadType$1.Drive) > -1;
	return false;
}
/**
* 正规化文件夹的 mimeType，根据 isCollaboration（可能后面还有其他不同的特殊文件夹flag）返回对应的 mimeType。
*
* 主要用于适配存量文件夹中 mimeType 为 folder 的协作空间（可能后面还有用其他flag来标记的特殊文件夹）
* 工具包中对不同文件夹使用不同 mimeType 进行标记和区分
*/
function correctFolderMimetype(isCollaboration) {
	if (isCollaboration) return MimeType$1.CollaborationSpace;
	return MimeType$1.Folder;
}
/**
*  参数检测
*  如果接口返回错误了，则不要白屏
*/
function validateMimeType(params) {
	if ((params.docType === void 0 || params.docType === DocType$1.Unknown) && !params.padType && !params.mimeType) return MimeType$1.Default;
	if (isDrive(params.docType, params.padType) && !params.extensionName && !params.mimeType) return MimeType$1.Default;
	return params.mimeType;
}
var getConcatUrl;
var init_utils = __esmMin((() => {
	init_const();
	init_match_machine();
	init_file_icon_url();
	init_esm$5();
	getConcatUrl = function getConcatUrl(mimeType, format) {
		if (format === FileIconFormat.PNG) return cdnDomain + fileIconPngPath + mimeType.replace("/", "-") + ".png";
		return cdnDomain + fileIconSvgPath + mimeType.replace("/", "-") + ".svg";
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/lib/file-icon-url.js
/**
* 获取文件 icon 的 URL
*/
function getFileIconURL(_ref) {
	var mimeType = _ref.mimeType, docType = _ref.docType, padType = _ref.padType, extensionName = _ref.extensionName, _ref$isCollaboration = _ref.isCollaboration, isCollaboration = _ref$isCollaboration === void 0 ? false : _ref$isCollaboration, size = _ref.size, _ref$format = _ref.format, format = _ref$format === void 0 ? FileIconFormat.SVG : _ref$format;
	mimeType = mimetypeAdaptor({
		mimeType,
		docType,
		padType,
		isCollaboration,
		extensionName
	});
	if (!size) {
		var _concatUrl = getConcatUrl(mimeType, format);
		return {
			target: (format === FileIconFormat.PNG ? fileIconPngMm : fileIconSvgMm).run(mimeType) || _concatUrl,
			fallback: defaultFileIconUrl
		};
	}
	var suffix = "?imageView2/1/w/".concat(size);
	var concatUrl = "".concat(cdnDomain + fileIconPngPath + mimeType, ".png");
	return {
		target: (fileIconPngMm.run(mimeType) || concatUrl) + suffix,
		fallback: defaultFileIconUrl + suffix
	};
}
var FileIconFormat, fileIconSvgMm, fileIconPngMm;
var init_file_icon_url = __esmMin((() => {
	init_const();
	init_utils();
	init_match_machine();
	init_icons();
	FileIconFormat = /*#__PURE__*/ function(FileIconFormat) {
		FileIconFormat["SVG"] = "svg";
		FileIconFormat["PNG"] = "png";
		return FileIconFormat;
	}({});
	fileIconSvgMm = new MatchMachine(iconUrl, matchMimeTypeToUrl);
	fileIconPngMm = new MatchMachine(iconPngUrl, matchMimeTypeToPngUrl);
	new MatchMachine(structuredMessageUrl, matchMimeTypeToStructuredMessageUrl);
	new MatchMachine(structuredCoverUrl, matchMimeTypeToStructuredCoverUrl);
	new MatchMachine(sharePlaceholderUrl, matchMimeTypeToSharePlaceholderUrl);
	new MatchMachine(faviconUrl, matchMimeTypeToFavicon);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useMountedState.js
function useMountedState() {
	var mountedRef = (0, import_react$20.useRef)(false);
	var get = (0, import_react$20.useCallback)(function() {
		return mountedRef.current;
	}, []);
	(0, import_react$20.useEffect)(function() {
		mountedRef.current = true;
		return function() {
			mountedRef.current = false;
		};
	}, []);
	return get;
}
var import_react$20;
var init_useMountedState = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useAsyncFn.js
function useAsyncFn(fn, deps, initialState) {
	if (deps === void 0) deps = [];
	if (initialState === void 0) initialState = { loading: false };
	var lastCallId = (0, import_react$19.useRef)(0);
	var isMounted = useMountedState();
	var _a = (0, import_react$19.useState)(initialState), state = _a[0], set = _a[1];
	return [state, (0, import_react$19.useCallback)(function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var callId = ++lastCallId.current;
		if (!state.loading) set(function(prevState) {
			return __assign(__assign({}, prevState), { loading: true });
		});
		return fn.apply(void 0, args).then(function(value) {
			isMounted() && callId === lastCallId.current && set({
				value,
				loading: false
			});
			return value;
		}, function(error) {
			isMounted() && callId === lastCallId.current && set({
				error,
				loading: false
			});
			return error;
		});
	}, deps)];
}
var import_react$19;
var init_useAsyncFn = __esmMin((() => {
	init_tslib_es6();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_useMountedState();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/misc/util.js
function on(obj) {
	var args = [];
	for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
	if (obj && obj.addEventListener) obj.addEventListener.apply(obj, args);
}
function off(obj) {
	var args = [];
	for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
	if (obj && obj.removeEventListener) obj.removeEventListener.apply(obj, args);
}
var isBrowser;
var init_util = __esmMin((() => {
	isBrowser = typeof window !== "undefined";
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useTimeoutFn.js
function useTimeoutFn(fn, ms) {
	if (ms === void 0) ms = 0;
	var ready = (0, import_react$18.useRef)(false);
	var timeout = (0, import_react$18.useRef)();
	var callback = (0, import_react$18.useRef)(fn);
	var isReady = (0, import_react$18.useCallback)(function() {
		return ready.current;
	}, []);
	var set = (0, import_react$18.useCallback)(function() {
		ready.current = false;
		timeout.current && clearTimeout(timeout.current);
		timeout.current = setTimeout(function() {
			ready.current = true;
			callback.current();
		}, ms);
	}, [ms]);
	var clear = (0, import_react$18.useCallback)(function() {
		ready.current = null;
		timeout.current && clearTimeout(timeout.current);
	}, []);
	(0, import_react$18.useEffect)(function() {
		callback.current = fn;
	}, [fn]);
	(0, import_react$18.useEffect)(function() {
		set();
		return clear;
	}, [ms]);
	return [
		isReady,
		clear,
		set
	];
}
var import_react$18;
var init_useTimeoutFn = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useDebounce.js
function useDebounce(fn, ms, deps) {
	if (ms === void 0) ms = 0;
	if (deps === void 0) deps = [];
	var _a = useTimeoutFn(fn, ms), isReady = _a[0], cancel = _a[1], reset = _a[2];
	(0, import_react$17.useEffect)(reset, deps);
	return [isReady, cancel];
}
var import_react$17;
var init_useDebounce = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useTimeoutFn();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useEffectOnce.js
var import_react$16, useEffectOnce;
var init_useEffectOnce = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	useEffectOnce = function(effect) {
		(0, import_react$16.useEffect)(effect, []);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useUnmount.js
var import_react$15, useUnmount;
var init_useUnmount = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_useEffectOnce();
	useUnmount = function(fn) {
		var fnRef = (0, import_react$15.useRef)(fn);
		fnRef.current = fn;
		useEffectOnce(function() {
			return function() {
				return fnRef.current();
			};
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useRafState.js
var import_react$14, useRafState;
var init_useRafState = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_useUnmount();
	useRafState = function(initialState) {
		var frame = (0, import_react$14.useRef)(0);
		var _a = (0, import_react$14.useState)(initialState), state = _a[0], setState = _a[1];
		var setRafState = (0, import_react$14.useCallback)(function(value) {
			cancelAnimationFrame(frame.current);
			frame.current = requestAnimationFrame(function() {
				setState(value);
			});
		}, []);
		useUnmount(function() {
			cancelAnimationFrame(frame.current);
		});
		return [state, setRafState];
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/useWindowSize.js
var import_react$13, useWindowSize;
var init_useWindowSize = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_useRafState();
	init_util();
	useWindowSize = function(_a) {
		var _b = _a === void 0 ? {} : _a, _c = _b.initialWidth, initialWidth = _c === void 0 ? Infinity : _c, _d = _b.initialHeight, initialHeight = _d === void 0 ? Infinity : _d, onChange = _b.onChange;
		var _e = useRafState({
			width: isBrowser ? window.innerWidth : initialWidth,
			height: isBrowser ? window.innerHeight : initialHeight
		}), state = _e[0], setState = _e[1];
		(0, import_react$13.useEffect)(function() {
			if (isBrowser) {
				var handler_1 = function() {
					var width = window.innerWidth;
					var height = window.innerHeight;
					setState({
						width,
						height
					});
					if (onChange) onChange(width, height);
				};
				on(window, "resize", handler_1);
				return function() {
					off(window, "resize", handler_1);
				};
			}
		}, []);
		return state;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-use@17.6.1_@types+rea_3e017adf184a98b13c78970a5cb2167c/node_modules/react-use/esm/index.js
var init_esm$4 = __esmMin((() => {
	init_useAsyncFn();
	init_util();
	init_useMountedState();
	init_useDebounce();
	init_useEffectOnce();
	init_useRafState();
	init_useUnmount();
	init_useTimeoutFn();
	init_useWindowSize();
}));
var init_file_icon_factory = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/lib/file-icon.js
var init_file_icon = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/lib/file-icon-base64.js
var init_file_icon_base64 = __esmMin((() => {
	init_esm$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-scenario-comp_ea8eb1c56b480f2138953130f2eb6ec0/node_modules/@tencent/docs-scenario-components-file-icon/dist/esm/index.js
var init_esm$3 = __esmMin((() => {
	init_file_icon_url();
	init_file_icon();
	init_const();
	init_file_icon_base64();
	init_file_icon_factory();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@3._dbb34626c5760f03074e24baadb78d26/node_modules/@tencent/docs-mime-types/dist/constant/doc-type.js
var DocType;
var init_doc_type = __esmMin((() => {
	DocType = /*#__PURE__*/ function(DocType) {
		/** Doc 文档类型. */ DocType[DocType["Doc"] = 0] = "Doc";
		/** Sheet 表格类型. */ DocType[DocType["Sheet"] = 1] = "Sheet";
		/** 表单类型. */ DocType[DocType["Form"] = 2] = "Form";
		/** 文件夹类型. */ DocType[DocType["Folder"] = 3] = "Folder";
		/** Slide 幻灯片类型. */ DocType[DocType["Slide"] = 4] = "Slide";
		/**
		* 笔记类型.
		* @deprecated 一般不再使用
		*/ DocType[DocType["Note"] = 5] = "Note";
		/** PDF 文档. */ DocType[DocType["Pdf"] = 6] = "Pdf";
		/** 小程序类型. */ DocType[DocType["MiniProgram"] = 7] = "MiniProgram";
		/**
		* 小程序类型.
		* @deprecated 请使用 {@link MiniProgram}
		*/ DocType[DocType["Aio"] = 7] = "Aio";
		/** 智能文档. */ DocType[DocType["SmartCanvas"] = 8] = "SmartCanvas";
		/** 智能表格. */ DocType[DocType["SmartSheet"] = 9] = "SmartSheet";
		/** 未知类型. */ DocType[DocType["Unknown"] = 10] = "Unknown";
		/** 简历. */ DocType[DocType["Resume"] = 11] = "Resume";
		/** 白板. */ DocType[DocType["Board"] = 12] = "Board";
		/** OFD 国家标准版式文档 */ DocType[DocType["Ofd"] = 13] = "Ofd";
		/** Markdown */ DocType[DocType["Markdown"] = 14] = "Markdown";
		/**
		* 关系图类型 (本质是幻灯片).
		* @deprecated 一般不再使用
		*/ DocType[DocType["Drawing"] = 89] = "Drawing";
		/** 思维导图类型. */ DocType[DocType["Mind"] = 90] = "Mind";
		/** 流程图类型. */ DocType[DocType["FlowChart"] = 91] = "FlowChart";
		/**
		* 流程图类型.
		* @deprecated 请使用 {@link FlowChart}
		*/ DocType[DocType["Flowchart"] = 91] = "Flowchart";
		/**
		* 普通文件类型.
		* @deprecated 请使用 {@link Drive}
		*/ DocType[DocType["File"] = 100] = "File";
		/** Drive 云文件. */ DocType[DocType["Drive"] = 101] = "Drive";
		/** 语音速记. */ DocType[DocType["Rec"] = 102] = "Rec";
		/**
		* 开平插件文件类型.
		* @deprecated 请使用 {@link Drive}
		*/ DocType[DocType["Addon"] = 110] = "Addon";
		/** 本地文件. 仅在桌面端列表页内使用. */ DocType[DocType["LocalFile"] = -201] = "LocalFile";
		/**
		* 品类衍生物
		* 如智能表格的查询页、表单页
		* 可用 mime_type 判断衍生物的具体类型
		*/ DocType[DocType["Derivative"] = 111] = "Derivative";
		/**
		* 语音速记
		* 跟 {@link Rec} 有不一样的生成路径，App -> 速记 -> 录音/上传音视频
		*/ DocType[DocType["Notes"] = 112] = "Notes";
		/** 网页 */ DocType[DocType["Page"] = 113] = "Page";
		return DocType;
	}({});
})), WordMimeTypes, ExcelMimeTypes, PowerPointMimeTypes, TextMimeTypes, CodeMimeTypes, ImageMimeTypes, AudioMimeTypes, VideoMimeTypes, flowChatMimeTypes, mindMimeTypes;
var init_enumerate = __esmMin((() => {
	WordMimeTypes = [
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/kswps",
		"application/kswpt",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		"application/vnd.ms-word.document.macroEnabled.12",
		"application/vnd.ms-word.template.macroEnabled.12"
	];
	ExcelMimeTypes = [
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		"text/csv",
		"text/csv; charset=utf-8",
		"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
		"application/vnd.ms-excel.sheet.macroEnabled.12",
		"application/vnd.ms-excel.template.macroEnabled.12",
		"application/kset",
		"application/ksett"
	];
	PowerPointMimeTypes = [
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
	TextMimeTypes = [
		"text/lrc",
		"text/asp; charset=utf-8",
		"application/x-msdownload",
		"text/richtext; charset=utf-8",
		"text/plain",
		"text/plain; charset=utf-8",
		"text/xml",
		"text/html",
		"text/html; charset=utf-8",
		"text/markdown"
	];
	CodeMimeTypes = [
		"text/x-c; charset=utf-8",
		"text/x-c; charset=utf-8",
		"text/x-chdr",
		"text/x-asm; charset=utf-8",
		"text/x-java-source; charset=utf-8",
		"text/javascript",
		"text/x-go"
	];
	ImageMimeTypes = [
		"image/x-sony-arw",
		"image/bmp",
		"image/vnd.zbrush.pcx",
		"image/x-pcx",
		"image/tiff",
		"image/gif",
		"image/x-exif",
		"image/exif",
		"image/jpeg",
		"image/vnd.fpx",
		"image/svg+xml",
		"image/vnd.adobe.photoshop",
		"image/x-cdr",
		"image/x-photo-cd",
		"image/vnd.dxf",
		"image/x-ufo",
		"application/postscript",
		"image/png",
		"image/wmf",
		"image/webp",
		"image/x-tga"
	];
	AudioMimeTypes = [
		"audio/mpeg",
		"audio/aac",
		"audio/x-flac",
		"audio/amr",
		"audio/AMR",
		"audio/mp4",
		"audio/x-ms-wma",
		"audio/x-wav",
		"audio/x-cd",
		"audio/x-wave",
		"audio/x-aiff",
		"audio/midi",
		"audio/x-realaudio",
		"audio/realaudio",
		"audio/x-twinvq",
		"audio/oggvorbis",
		"audio/ogg",
		"audio/x-ape",
		"audio/webm",
		"audio/mpeg-4"
	];
	VideoMimeTypes = [
		"video/mp4",
		"video/3gpp",
		"video/x-ms-asf",
		"video/x-msvideo",
		"video/dv",
		"video/x-flv",
		"video/x-f4v",
		"application/vnd.apple.mpegurl",
		"video/x-matroska",
		"video/quicktime",
		"video/mpeg",
		"video/mp2t",
		"application/vnd.rn-realmedia",
		"audio/x-pn-realaudio",
		"video/x-ms-wmv",
		"video/dat",
		"video/webm",
		"video/x-ms-vob"
	];
	flowChatMimeTypes = [
		"application/vnd.ms-visio.drawing",
		"application/x-visio",
		"application/vnd.ms-visio.drawing.main+xml"
	];
	mindMimeTypes = ["application/vnd.pos"];
}));
var init_ext_to_doctype = __esmMin((() => {
	init_doc_type();
	DocType.Doc, DocType.Doc, DocType.Doc, DocType.Doc, DocType.Doc, DocType.Doc, DocType.Doc, DocType.Doc, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Sheet, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.Slide, DocType.FlowChart, DocType.FlowChart, DocType.Mind, DocType.Mind, DocType.Pdf, DocType.Markdown, DocType.Markdown, DocType.Doc, DocType.Notes, DocType.Page;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@3._dbb34626c5760f03074e24baadb78d26/node_modules/@tencent/docs-mime-types/dist/constant/mime-type.js
var MimeType;
var init_mime_type = __esmMin((() => {
	MimeType = /*#__PURE__*/ function(MimeType) {
		/** 自研 doc 在线文档 */ MimeType["Doc"] = "application/vnd.tdocs-apps.doc";
		/** 自研 sheet 在线表格 */ MimeType["Sheet"] = "application/vnd.tdocs-apps.sheet";
		/** 在线收集表 */ MimeType["Form"] = "application/vnd.tdocs-apps.form";
		/** 文件夹 */ MimeType["Folder"] = "application/vnd.tdocs-apps.folder";
		/** 共享文件夹 */ MimeType["CollaborationSpace"] = "application/vnd.tdocs-apps.collaboration-space";
		/** 共享文件夹顶层 */ MimeType["CollaborationSpaceRoot"] = "application/vnd.tdocs-apps.collaboration-space-root";
		/** 共享文件夹(私有化) */ MimeType["SharedFolder"] = "application/vnd.tdocs-apps.shared-folder";
		/** 与我共享文件夹 */ MimeType["Share"] = "application/vnd.tdocs-apps.share-folder";
		/** 自研 slide 在线 PPT */ MimeType["Slide"] = "application/vnd.tdocs-apps.slide";
		/** 在线 PDF */ MimeType["Pdf"] = "application/pdf";
		/** MINIPROGRAM */ MimeType["Aio"] = "application/vnd.tdocs-apps.aio";
		/** 智能画布 */ MimeType["SmartCanvas"] = "application/vnd.tdocs-apps.smartcanvas";
		/** 智能表格 */ MimeType["SmartSheet"] = "application/vnd.tdocs-apps.smartsheet";
		/** 在线思维导图 */ MimeType["Mind"] = "application/vnd.tdocs-apps.mind";
		/** 在线流程图 */ MimeType["FlowChart"] = "application/vnd.tdocs-apps.flowchart";
		/** 智能白板 */ MimeType["Board"] = "application/vnd.tdocs-apps.board";
		/** 语音速记 */ MimeType["Rec"] = "application/vnd.tdocs-apps.rec";
		/** 导入的 word 文档 */ MimeType["Word"] = "application/vnd.ms-word";
		/** 导入的 excel 文档 */ MimeType["Excel"] = "application/vnd.ms-excel";
		/** 导入的 powerpoint 文档 */ MimeType["Powerpoint"] = "application/vnd.ms-powerpoint";
		/** 导入的纯文本 */ MimeType["Txt"] = "text/plain";
		/** 第三方插件 pixso */ MimeType["Pixso"] = "application/vnd.tdocs-addon-image.236b7f64e91e40b584f2aae0517ee1ed";
		/** 第三方插件 boardmix */ MimeType["Boardmix"] = "application/vnd.tdocs-addon-image.e3e96c1968114db986a9229003965853";
		/** 第三方插件 智影 */ MimeType["Zhiying"] = "application/vnd.tdocs-addon-image.9e2c26161b684629a9bf29e52efa6c60";
		/** 代码文件 */ MimeType["Code"] = "code";
		MimeType["Default"] = "application/vnd.tdocs-apps.default";
		/** 图片的 MimeType 仅用于 icon 匹配，其他场景不适用 */ MimeType["Image"] = "image";
		/** 音频的 MimeType 仅用于 icon 匹配，其他场景不适用 */ MimeType["Audio"] = "audio";
		/** 视频的 MimeType 仅用于 icon 匹配，其他场景不适用 */ MimeType["Video"] = "video";
		/** 压缩包 */ MimeType["Zip"] = "application/zip";
		/** 在线OFD */ MimeType["Ofd"] = "application/vnd.tdocs-apps.ofd";
		/** Drive OFD */ MimeType["DriveOfd"] = "application/ofd";
		/** Markdown */ MimeType["Markdown"] = "application/vnd.tdocs-apps.markdown";
		/** 文本类型Markdown */ MimeType["Markdown_ASCII"] = "text/markdown";
		/** 文本utf-8 Markdown */ MimeType["Markdown_UTF8"] = "text/markdown; charset=utf-8";
		/** 本地的 思维导图 仅用于 icon 匹配，其他场景均不适用 */ MimeType["XMind"] = "xmind";
		/** 本地的 流程图 仅用于 icon 匹配，其他场景均不适用 */ MimeType["Visio"] = "visio";
		/** 加密文件夹 */ MimeType["Safe"] = "application/vnd.tdocs-apps.safe-folder";
		/** 空间 */ MimeType["WikiSpace"] = "application/vnd.tdocs-apps.wiki-space";
		/** 网页链接 */ MimeType["Webpage"] = "application/vnd.tdocs-webpage";
		/** 智能表格衍生物-查询页 */ MimeType["Derivative_Query"] = "application/vnd.tdocs-apps.derivative.query";
		/** 智能表格衍生物-表单页 */ MimeType["Derivative_Form"] = "application/vnd.tdocs-apps.derivative.form";
		/** 我的设备 */ MimeType["Device"] = "application/vnd.tdocs-apps.device";
		/** 团队 - 通知公告 */ MimeType["TeamNotice"] = "application/vnd.tdocs-apps.teamnotice";
		/** 团队 - 作业布置 */ MimeType["TeamJob"] = "application/vnd.tdocs-apps.teamjob";
		/** 团队 - 打卡签到 */ MimeType["TeamSign"] = "application/vnd.tdocs-apps.teamsign";
		/** 团队 - 信息收集 */ MimeType["TeamCollect"] = "application/vnd.tdocs-apps.teamcollect";
		/** 团队 - 信息核查 */ MimeType["TeamCheck"] = "application/vnd.tdocs-apps.teamcheck";
		/** 团队 - 成绩查询 */ MimeType["TeamScore"] = "application/vnd.tdocs-apps.teamscore";
		/** 团队 - 接龙登记 */ MimeType["TeamJoin"] = "application/vnd.tdocs-apps.teamjoin";
		/** 团队 - 投票评选 */ MimeType["TeamVote"] = "application/vnd.tdocs-apps.teamvote";
		/** 轻创作 - 语音速记 */ MimeType["Notes"] = "application/vnd.tdocs-apps.notes";
		/** 网页 */ MimeType["Page"] = "application/vnd.tdocs-apps.page";
		return MimeType;
	}({});
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@3._dbb34626c5760f03074e24baadb78d26/node_modules/@tencent/docs-mime-types/dist/constant/pad-type.js
var PadType;
var init_pad_type = __esmMin((() => {
	PadType = /*#__PURE__*/ function(PadType) {
		/** Doc 文档类型. */ PadType["Doc"] = "doc";
		/** Sheet 表格类型. */ PadType["Sheet"] = "sheet";
		/** 表单类型. */ PadType["Form"] = "form";
		/** 文件夹类型. */ PadType["Folder"] = "folder";
		/** Slide 幻灯片类型. */ PadType["Slide"] = "slide";
		/** 笔记类型. */ PadType["Note"] = "note";
		/** PDF 类型. */ PadType["Pdf"] = "pdf";
		/** 小程序类型. */ PadType["MiniProgram"] = "aio";
		/**
		* 小程序类型.
		* @deprecated 请使用 {@link MiniProgram}
		*/ PadType["Aio"] = "aio";
		/** 未知类型. */ PadType["Unknown"] = "unknown";
		PadType["Resume"] = "resume";
		PadType["Ofd"] = "ofd";
		/** 关系图类型 (本质是幻灯片). */ PadType["RelationGraph"] = "relationGraph";
		/** 思维导图类型. */ PadType["Mind"] = "mind";
		/** 流程图类型. */ PadType["FlowChart"] = "flowchart";
		/** 智能白板. */ PadType["Board"] = "board";
		/** Markdown */ PadType["Markdown"] = "markdown";
		/** 常规文件类型. 例如图片, 音视频, Office 文档, 压缩包等其他文件. */ PadType["File"] = "file";
		/** Drive 文件类型. */ PadType["Drive"] = "drive";
		/** 语音速记类型. */ PadType["SogouSpeech"] = "rec";
		/**
		* 开平插件文件类型.
		* @deprecated 后续都走 Drive 体系.
		*/ PadType["Addon"] = "addon";
		/** 腾讯文档 SmartCanvas */ PadType["SmartCanvas"] = "smartcanvas";
		/** 腾讯文档 smartsheet */ PadType["SmartSheet"] = "smartsheet";
		/** 本地文件 */ PadType["LocalFile"] = "local_file";
		/**
		* 衍生物，例如智能表格查询页、表单
		* 可结合 mimeType 进一步区分具体类型
		*/ PadType["Derivative"] = "derivative";
		/** 轻创作 - 语音速记 */ PadType["Notes"] = "notes";
		/** 网页 */ PadType["Page"] = "page";
		return PadType;
	}({});
})), _obj, _obj1, _obj2, _obj3, mimeTypeToPadType, _obj4;
var init_types = __esmMin((() => {
	init_doc_type();
	init_enumerate();
	init_mime_type();
	init_pad_type();
	_obj = {};
	_obj[DocType.Doc] = MimeType.Doc, _obj[DocType.Sheet] = MimeType.Sheet, _obj[DocType.Form] = MimeType.Form, _obj[DocType.Folder] = MimeType.Folder, _obj[DocType.Slide] = MimeType.Slide, _obj[DocType.Pdf] = MimeType.Pdf, _obj[DocType.MiniProgram] = MimeType.Aio, _obj[DocType.SmartCanvas] = MimeType.SmartCanvas, _obj[DocType.SmartSheet] = MimeType.SmartSheet, _obj[DocType.Board] = MimeType.Board, _obj[DocType.Ofd] = MimeType.Ofd, _obj[DocType.Markdown] = MimeType.Markdown, _obj[DocType.Mind] = MimeType.Mind, _obj[DocType.FlowChart] = MimeType.FlowChart, _obj[DocType.Rec] = MimeType.Rec, _obj[DocType.Notes] = MimeType.Notes, _obj[DocType.Page] = MimeType.Page;
	DocType.Doc, MimeType.Ofd, MimeType.DriveOfd, DocType.Ofd, DocType.Sheet, DocType.Slide, MimeType.Form, DocType.Form, MimeType.SmartCanvas, DocType.SmartCanvas, MimeType.SmartSheet, DocType.SmartSheet, MimeType.Doc, DocType.Doc, MimeType.Sheet, DocType.Sheet, MimeType.Slide, DocType.Slide, MimeType.Mind, DocType.Mind, MimeType.FlowChart, DocType.FlowChart, MimeType.Board, DocType.Board, DocType.Markdown, DocType.Doc, DocType.Doc, MimeType.Pdf, DocType.Pdf, DocType.FlowChart, DocType.Mind, MimeType.Folder, DocType.Folder, MimeType.Derivative_Form, DocType.Derivative, MimeType.Derivative_Query, DocType.Derivative, MimeType.TeamNotice, DocType.Form, MimeType.TeamJob, DocType.Form, MimeType.TeamSign, DocType.Form, MimeType.TeamCollect, DocType.Form, MimeType.TeamCheck, DocType.Form, MimeType.TeamScore, DocType.Form, MimeType.TeamJoin, DocType.Form, MimeType.TeamVote, DocType.Form, MimeType.Notes, DocType.Notes, MimeType.Page, DocType.Page;
	_obj1 = {};
	_obj1[PadType.Doc] = MimeType.Word, _obj1[PadType.Sheet] = MimeType.Excel, _obj1[PadType.Slide] = MimeType.Powerpoint, _obj1[PadType.Mind] = MimeType.XMind, _obj1[PadType.FlowChart] = MimeType.Visio;
	_obj2 = {};
	_obj2[DocType.Doc] = PadType.Doc, _obj2[DocType.Sheet] = PadType.Sheet, _obj2[DocType.Form] = PadType.Form, _obj2[DocType.Folder] = PadType.Folder, _obj2[DocType.Slide] = PadType.Slide, _obj2[DocType.Note] = PadType.Note, _obj2[DocType.Pdf] = PadType.Pdf, _obj2[DocType.MiniProgram] = PadType.MiniProgram, _obj2[DocType.SmartCanvas] = PadType.SmartCanvas, _obj2[DocType.SmartSheet] = PadType.SmartSheet, _obj2[DocType.Unknown] = PadType.Unknown, _obj2[DocType.Resume] = PadType.Resume, _obj2[DocType.Board] = PadType.Board, _obj2[DocType.Ofd] = PadType.Ofd, _obj2[DocType.Markdown] = PadType.Markdown, _obj2[DocType.Drawing] = PadType.RelationGraph, _obj2[DocType.Mind] = PadType.Mind, _obj2[DocType.FlowChart] = PadType.FlowChart, _obj2[DocType.File] = PadType.File, _obj2[DocType.Drive] = PadType.Drive, _obj2[DocType.Rec] = PadType.SogouSpeech, _obj2[DocType.Addon] = PadType.Addon, _obj2[DocType.LocalFile] = PadType.LocalFile, _obj2[DocType.Derivative] = PadType.Derivative, _obj2[DocType.Notes] = PadType.Notes, _obj2[DocType.Page] = PadType.Page;
	_obj3 = {};
	_obj3[PadType.Doc] = MimeType.Doc, _obj3[PadType.Sheet] = MimeType.Sheet, _obj3[PadType.Slide] = MimeType.Slide, _obj3[PadType.Form] = MimeType.Form, _obj3[PadType.SmartCanvas] = MimeType.SmartCanvas, _obj3[PadType.SmartSheet] = MimeType.SmartSheet, _obj3[PadType.Mind] = MimeType.Mind, _obj3[PadType.FlowChart] = MimeType.FlowChart, _obj3[PadType.Pdf] = MimeType.Pdf, _obj3[PadType.Aio] = MimeType.Aio, _obj3[PadType.Board] = MimeType.Board, _obj3[PadType.Ofd] = MimeType.Ofd, _obj3[PadType.Markdown] = MimeType.Markdown, _obj3[PadType.SogouSpeech] = MimeType.Rec, _obj3[PadType.Notes] = MimeType.Notes, _obj3[PadType.Page] = MimeType.Page;
	mimeTypeToPadType = [
		[WordMimeTypes, PadType.Drive],
		[ExcelMimeTypes, PadType.Drive],
		[PowerPointMimeTypes, PadType.Drive],
		[[MimeType.Form], PadType.Form],
		[[MimeType.SmartCanvas], PadType.SmartCanvas],
		[[MimeType.SmartSheet], PadType.SmartSheet],
		[[MimeType.Doc], PadType.Doc],
		[[MimeType.Sheet], PadType.Sheet],
		[[MimeType.Slide], PadType.Slide],
		[[MimeType.Mind], PadType.Mind],
		[[MimeType.FlowChart], PadType.FlowChart],
		[[MimeType.Board], PadType.Board],
		[CodeMimeTypes, PadType.Drive],
		[TextMimeTypes, PadType.Drive],
		[[MimeType.Pdf], PadType.Pdf],
		[flowChatMimeTypes, PadType.FlowChart],
		[mindMimeTypes, PadType.Mind],
		[ImageMimeTypes, PadType.Drive],
		[VideoMimeTypes, PadType.Drive],
		[AudioMimeTypes, PadType.Drive],
		[[MimeType.Ofd], PadType.Ofd],
		[[MimeType.Markdown], PadType.Markdown],
		[[MimeType.Rec], PadType.SogouSpeech],
		[[MimeType.TeamNotice], PadType.Form],
		[[MimeType.TeamJob], PadType.Form],
		[[MimeType.TeamSign], PadType.Form],
		[[MimeType.TeamCollect], PadType.Form],
		[[MimeType.TeamCheck], PadType.Form],
		[[MimeType.TeamScore], PadType.Form],
		[[MimeType.TeamJoin], PadType.Form],
		[[MimeType.TeamVote], PadType.Form],
		[[MimeType.Notes], PadType.Notes],
		[[MimeType.Page], PadType.Page]
	];
	_obj4 = {};
	_obj4[PadType.Doc] = DocType.Doc, _obj4[PadType.Sheet] = DocType.Sheet, _obj4[PadType.Form] = DocType.Form, _obj4[PadType.Folder] = DocType.Folder, _obj4[PadType.Slide] = DocType.Slide, _obj4[PadType.Note] = DocType.Note, _obj4[PadType.Pdf] = DocType.Pdf, _obj4[PadType.MiniProgram] = DocType.MiniProgram, _obj4[PadType.SmartCanvas] = DocType.SmartCanvas, _obj4[PadType.SmartSheet] = DocType.SmartSheet, _obj4[PadType.Unknown] = DocType.Unknown, _obj4[PadType.Resume] = DocType.Resume, _obj4[PadType.Board] = DocType.Board, _obj4[PadType.Ofd] = DocType.Ofd, _obj4[PadType.Markdown] = DocType.Markdown, _obj4[PadType.RelationGraph] = DocType.Drawing, _obj4[PadType.Mind] = DocType.Mind, _obj4[PadType.FlowChart] = DocType.FlowChart, _obj4[PadType.File] = DocType.File, _obj4[PadType.Drive] = DocType.Drive, _obj4[PadType.SogouSpeech] = DocType.Rec, _obj4[PadType.Addon] = DocType.Addon, _obj4[PadType.LocalFile] = DocType.LocalFile, _obj4[PadType.Notes] = DocType.Notes, _obj4[PadType.Page] = DocType.Page;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@3._dbb34626c5760f03074e24baadb78d26/node_modules/@tencent/docs-mime-types/dist/detect-methods.js
var getPadTypeFromMimeType;
var init_detect_methods = __esmMin((() => {
	init__create_for_of_iterator_helper_loose();
	init_pad_type();
	init_types();
	getPadTypeFromMimeType = function(mimeType) {
		for (var _iterator = _create_for_of_iterator_helper_loose(mimeTypeToPadType), _step; !(_step = _iterator()).done;) {
			var _step_value = _step.value, mimeTypeItem = _step_value[0], padType = _step_value[1];
			if (mimeTypeItem.includes(mimeType)) return padType;
		}
		return PadType.Drive;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+docs-mime-types@3._dbb34626c5760f03074e24baadb78d26/node_modules/@tencent/docs-mime-types/dist/index.js
var init_dist = __esmMin((() => {
	init_doc_type();
	init_enumerate();
	init_ext_to_doctype();
	init_mime_type();
	init_pad_type();
	init_types();
	init_detect_methods();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/action-service/index.js
function I(_, E) {
	var T = Object.keys(_);
	if (Object.getOwnPropertySymbols) {
		var e = Object.getOwnPropertySymbols(_);
		E && (e = e.filter((function(E) {
			return Object.getOwnPropertyDescriptor(_, E).enumerable;
		}))), T.push.apply(T, e);
	}
	return T;
}
function C$2(E) {
	for (var T = 1; T < arguments.length; T++) {
		var e = null != arguments[T] ? arguments[T] : {};
		T % 2 ? I(Object(e), !0).forEach((function(T) {
			r$4(E, T, e[T]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(E, Object.getOwnPropertyDescriptors(e)) : I(Object(e)).forEach((function(_) {
			Object.defineProperty(E, _, Object.getOwnPropertyDescriptor(e, _));
		}));
	}
	return E;
}
function i$2(_) {
	return u$4.apply(this, arguments);
}
function u$4() {
	return (u$4 = e$13(l$3.mark((function _(E) {
		var T;
		return l$3.wrap((function(_) {
			for (;;) switch (_.prev = _.next) {
				case 0: return _.next = 2, d$1({
					url: "".concat(c$3, "?xsrf=").concat(r$7()),
					data: E,
					method: "post"
				});
				case 2: return T = _.sent, _.abrupt("return", T.data);
				case 4:
				case "end": return _.stop();
			}
		}), _);
	})))).apply(this, arguments);
}
var O, a$5, c$3, o$8, P$1, M$1, s$3;
var init_action_service = __esmMin((() => {
	init_defineProperty_ba606e08();
	init_createClass_2e0257aa();
	init_index_a3cfc692();
	init_esm$9();
	init_vip_service();
	init_dist$8();
	init_esm$10();
	init_esm$6();
	(function(_) {
		_[_.ACTION_TYPE_RECOMMEND_INSTRUCTION = 10001] = "ACTION_TYPE_RECOMMEND_INSTRUCTION", _[_.ACTION_TYPE_GENERATE_IMAGE = 10002] = "ACTION_TYPE_GENERATE_IMAGE", _[_.ACTION_TYPE_SEARCH_IMAGE = 10003] = "ACTION_TYPE_SEARCH_IMAGE", _[_.ACTION_TYPE_GENERATE_DOCUMENT = 10004] = "ACTION_TYPE_GENERATE_DOCUMENT", _[_.ACTION_TYPE_MODIFY_CONTENT = 10005] = "ACTION_TYPE_MODIFY_CONTENT", _[_.ACTION_TYPE_SUMMARY_CONTENT = 10006] = "ACTION_TYPE_SUMMARY_CONTENT", _[_.ACTION_TYPE_TRANSLATE = 10007] = "ACTION_TYPE_TRANSLATE", _[_.ACTION_TYPE_READ_IN_DEPTH = 10011] = "ACTION_TYPE_READ_IN_DEPTH", _[_.ACTION_TYPE_AI_GENERATE = 10012] = "ACTION_TYPE_AI_GENERATE", _[_.ACTION_TYPE_EXPAND = 10013] = "ACTION_TYPE_EXPAND", _[_.ACTION_TYPE_PREAPARE_QA = 10014] = "ACTION_TYPE_PREAPARE_QA", _[_.ACTION_TYPE_QUESTION_RECOMMEND = 10015] = "ACTION_TYPE_QUESTION_RECOMMEND", _[_.ACTION_TYPE_MIND_EXPAND_NODE = 10017] = "ACTION_TYPE_MIND_EXPAND_NODE", _[_.ACTION_TYPE_GENERATE_TABLE_FORMULA = 10018] = "ACTION_TYPE_GENERATE_TABLE_FORMULA", _[_.ACTION_TYPE_CORRECT_TABLE_FORMULA = 10019] = "ACTION_TYPE_CORRECT_TABLE_FORMULA", _[_.ACTION_TYPE_GEN_SLIDE_PAGE = 10021] = "ACTION_TYPE_GEN_SLIDE_PAGE", _[_.ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE = 10023] = "ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE", _[_.ACTION_TYPE_OPTIMIZE_PROMPT = 10024] = "ACTION_TYPE_OPTIMIZE_PROMPT", _[_.ACTION_TYPE_GEN_SLIDE_PAGE_MULTI = 10025] = "ACTION_TYPE_GEN_SLIDE_PAGE_MULTI", _[_.ACTION_TYPE_MATCH_TEMPLATE_TAGS = 10027] = "ACTION_TYPE_MATCH_TEMPLATE_TAGS";
	})(O || (O = {})), function(_) {
		_.ACTION_NAME_RECOMMEND_INSTRUCTION = "recommend_instruction", _.ACTION_NAME_GENERATE_IMAGE = "generate_image", _.ACTION_NAME_SEARCH_IMAGE = "search_image", _.ACTION_NAME_GENERATE_DOCUMENT = "generate_document", _.ACTION_NAME_MODIFY_CONTENT = "modify_content", _.ACTION_NAME_SUMMARY_CONTENT = "summary_content", _.ACTION_NAME_TRANSLATE = "translate", _.ACTION_NAME_READ_IN_DEPTH = "read_in_depth", _.ACTION_NAME_AI_GENERATE = "ai_generate", _.ACTION_NAME_EXPAND = "expand", _.ACTION_NAME_PREAPARE_QA = "prepare_qa", _.ACTION_NAME_QUESTION_RECOMMEND = "question_recommend", _.ACTION_TYPE_MIND_EXPAND_NODE = "mind_expand_node", _.ACTION_NAME_GENERATE_TABLE_FORMULA = "generate_table_formula", _.ACTION_NAME_CORRECT_TABLE_FORMULA = "correct_table_formula", _.ACTION_TYPE_GEN_SLIDE_PAGE = "gen_slide_page", _.ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE = "create_file", _.ACTION_TYPE_OPTIMIZE_PROMPT = "optimize_prompt", _.ACTION_TYPE_GEN_SLIDE_PAGE_MULTI = "gen_slide_page_multi", _.ACTION_TYPE_MATCH_TEMPLATE_TAGS = "match_template_tags";
	}(a$5 || (a$5 = {}));
	c$3 = "/api/ai/v1/copilot/actions";
	o$8 = "/v1/ai/action/view/support";
	P$1 = "/v1/ai/action/image/extract/text";
	M$1 = "/v1/ai/action/questions/recommend";
	s$3 = function() {
		return n$10((function _() {
			r$5(this, _);
		}), null, [
			{
				key: "getPrepareQa",
				value: (R = e$13(l$3.mark((function _(E) {
					var T;
					return l$3.wrap((function(_) {
						for (;;) switch (_.prev = _.next) {
							case 0: return _.next = 2, i$2({
								action_type: O.ACTION_TYPE_PREAPARE_QA,
								action_name: "prepare_for_qa",
								prepare_for_qa: C$2({}, E)
							});
							case 2: return T = _.sent, _.abrupt("return", T);
							case 4:
							case "end": return _.stop();
						}
					}), _);
				}))), function(_) {
					return R.apply(this, arguments);
				})
			},
			{
				key: "isSupportAIView",
				value: (p = e$13(l$3.mark((function _(E) {
					var T;
					return l$3.wrap((function(_) {
						for (;;) switch (_.prev = _.next) {
							case 0: return _.next = 2, d$1({
								url: "".concat(o$8, "?xsrf=").concat(r$7()),
								data: E,
								method: "post"
							});
							case 2: return T = _.sent, _.abrupt("return", T.data);
							case 4:
							case "end": return _.stop();
						}
					}), _);
				}))), function(_) {
					return p.apply(this, arguments);
				})
			},
			{
				key: "getRecommendQuestionsAction",
				value: (s = e$13(l$3.mark((function E(T) {
					var e;
					return l$3.wrap((function(E) {
						for (;;) switch (E.prev = E.next) {
							case 0: return E.next = 2, i$2({
								action_type: O.ACTION_TYPE_QUESTION_RECOMMEND,
								action_name: (t = O.ACTION_TYPE_QUESTION_RECOMMEND, A = void 0, (r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(A = {}, O.ACTION_TYPE_RECOMMEND_INSTRUCTION, a$5.ACTION_NAME_RECOMMEND_INSTRUCTION), O.ACTION_TYPE_GENERATE_IMAGE, a$5.ACTION_NAME_GENERATE_IMAGE), O.ACTION_TYPE_SEARCH_IMAGE, a$5.ACTION_NAME_SEARCH_IMAGE), O.ACTION_TYPE_GENERATE_DOCUMENT, a$5.ACTION_NAME_GENERATE_DOCUMENT), O.ACTION_TYPE_MODIFY_CONTENT, a$5.ACTION_NAME_MODIFY_CONTENT), O.ACTION_TYPE_SUMMARY_CONTENT, a$5.ACTION_NAME_SUMMARY_CONTENT), O.ACTION_TYPE_TRANSLATE, a$5.ACTION_NAME_TRANSLATE), O.ACTION_TYPE_READ_IN_DEPTH, a$5.ACTION_NAME_READ_IN_DEPTH), O.ACTION_TYPE_AI_GENERATE, a$5.ACTION_NAME_AI_GENERATE), O.ACTION_TYPE_EXPAND, a$5.ACTION_NAME_EXPAND), r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(A, O.ACTION_TYPE_MIND_EXPAND_NODE, a$5.ACTION_TYPE_MIND_EXPAND_NODE), O.ACTION_TYPE_PREAPARE_QA, a$5.ACTION_NAME_PREAPARE_QA), O.ACTION_TYPE_QUESTION_RECOMMEND, a$5.ACTION_NAME_QUESTION_RECOMMEND), O.ACTION_TYPE_GENERATE_TABLE_FORMULA, a$5.ACTION_NAME_GENERATE_TABLE_FORMULA), O.ACTION_TYPE_CORRECT_TABLE_FORMULA, a$5.ACTION_NAME_CORRECT_TABLE_FORMULA), O.ACTION_TYPE_GEN_SLIDE_PAGE, a$5.ACTION_TYPE_GEN_SLIDE_PAGE), O.ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE, a$5.ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE), O.ACTION_TYPE_OPTIMIZE_PROMPT, a$5.ACTION_TYPE_OPTIMIZE_PROMPT), O.ACTION_TYPE_GEN_SLIDE_PAGE_MULTI, a$5.ACTION_TYPE_GEN_SLIDE_PAGE_MULTI), O.ACTION_TYPE_MATCH_TEMPLATE_TAGS, a$5.ACTION_TYPE_MATCH_TEMPLATE_TAGS))[t] || ""),
								question_recommend: {
									file_id: T.fileId,
									sheet_id: T.sheetId
								}
							});
							case 2: return e = E.sent, E.abrupt("return", e);
							case 4:
							case "end": return E.stop();
						}
						var t, A;
					}), E);
				}))), function(_) {
					return s.apply(this, arguments);
				})
			},
			{
				key: "extractTextFromImage",
				value: (u = e$13(l$3.mark((function _(E) {
					var T;
					return l$3.wrap((function(_) {
						for (;;) switch (_.prev = _.next) {
							case 0: return _.next = 2, d$1({
								url: "".concat(P$1, "?xsrf=").concat(r$7()),
								data: E,
								method: "post"
							});
							case 2: return T = _.sent, _.abrupt("return", T.data);
							case 4:
							case "end": return _.stop();
						}
					}), _);
				}))), function(_) {
					return u.apply(this, arguments);
				})
			},
			{
				key: "getRecommendQuestions",
				value: (c = e$13(l$3.mark((function _(E, T) {
					var e;
					return l$3.wrap((function(_) {
						for (;;) switch (_.prev = _.next) {
							case 0: return _.next = 2, d$1({
								url: "".concat(M$1, "?xsrf=").concat(r$7()),
								data: E,
								method: "post",
								config: { headers: { "X-AI-Channel": T || "" } }
							});
							case 2: return e = _.sent, _.abrupt("return", e.data);
							case 4:
							case "end": return _.stop();
						}
					}), _);
				}))), function(_, E) {
					return c.apply(this, arguments);
				})
			},
			{
				key: "createEmptyPPT",
				value: (I = e$13(l$3.mark((function _(E) {
					var T, e;
					return l$3.wrap((function(_) {
						for (;;) switch (_.prev = _.next) {
							case 0: return _.prev = 0, _.next = 3, i$2({
								action_type: O.ACTION_TYPE_CREATE_DOCUMENT_WITH_MESSAGE,
								action_name: "create_file",
								create_file: {
									title: E,
									templateId: "29000",
									isCustom: !1,
									category: 2,
									content_type: 4
								}
							});
							case 3: return e = _.sent, console.log("res", e), (null == e ? void 0 : e.retcode) === _$2.AI_USE_LIMIT && u$6.aiUseLimitError(), _.abrupt("return", (null == e || null === (T = e.result) || void 0 === T || null === (T = T.create_file) || void 0 === T ? void 0 : T.doc_url) || "");
							case 9: return _.prev = 9, _.t0 = _.catch(0), _.abrupt("return", "");
							case 12:
							case "end": return _.stop();
						}
					}), _, null, [[0, 9]]);
				}))), function(_) {
					return I.apply(this, arguments);
				})
			}
		]);
		var I, c, u, s, p, R;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-file-import/index.js
function X(e, t) {
	if (t && ("object" == o$12(t) || "function" == typeof t)) return t;
	if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
	return function(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}(e);
}
function Y(e) {
	return Y = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, Y(e);
}
function ee$1(e, t) {
	return ee$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, ee$1(e, t);
}
function te(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ee$1(e, t);
}
function se(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function ae(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? se(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : se(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function ue(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function le$1(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? ue(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ue(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function fe() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (e) {}
	return (fe = function() {
		return !!e;
	})();
}
function de(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function ve(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? de(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : de(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function he() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (e) {}
	return (he = function() {
		return !!e;
	})();
}
function ye(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function be(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? ye(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ye(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function ke() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (e) {}
	return (ke = function() {
		return !!e;
	})();
}
function Se(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function De(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Se(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Se(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function xe(e) {
	return e.flatMap((function(e) {
		var t = getPadTypeFromMimeType(e);
		return "doc" === t ? ["tencentdoc", "doc"] : "sheet" === t ? ["tencentsheet", "sheet"] : "slide" === t ? ["tencentslide", "slide"] : [t];
	}));
}
function Ue(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function Fe(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Ue(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ue(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function Ie(e) {
	return Ae.apply(this, arguments);
}
function Ae() {
	return Ae = e$13(l$3.mark((function e(t) {
		var i, o, s, a, c, u, l, f, d;
		return l$3.wrap((function(e) {
			for (;;) switch (e.prev = e.next) {
				case 0: return i = t.id, o = t.errorInfo, s = t.taskMap, a = t.fileTaskManager, c = void 0 === a ? oe : a, e.next = 3, v$2.getInstance().checkIsSVIP();
				case 3:
					u = e.sent, l = {
						errorType: o.status,
						message: o.message
					}, f = {}, d = function() {
						s.forEach((function(e) {
							var t, n = null === (t = e.getTask().errorInfo) || void 0 === t ? void 0 : t.errorType;
							n !== Te.OverLimit && n !== Te.UserSizeLimit || e.retryTask();
						}));
					}, e.t0 = o.status, e.next = e.t0 === Te.OverLimit ? 10 : e.t0 === Te.UserSizeLimit ? 15 : e.t0 === Te.Cancel ? 17 : e.t0 === Te.NetWorkError || e.t0 === Te.OfflineError ? 18 : 20;
					break;
				case 10:
					if (u) {
						e.next = 13;
						break;
					}
					return f = {
						showType: Oe.VIP,
						button: {
							text: "开通会员",
							onClick: function(e) {
								var t, n = null === (t = s.get(i)) || void 0 === t || null === (t = t.getTask()) || void 0 === t || null === (t = t.file) || void 0 === t ? void 0 : t.type;
								O$1.payVIP({
									aid: getAidForReport$1({
										feature: n === c$7.PDF ? "uploadoverlimit" : "importoverlimit",
										position: e || "chatfloat",
										apprec4: h$2[n] || h$2[c$7.UNSPECIFIED]
									}),
									successHandler: d
								});
							}
						}
					}, e.abrupt("break", 22);
				case 13:
				case 20: return f = { button: {
					text: "删除",
					onClick: function() {
						s.delete(i), c.deleteFileTask(i);
					}
				} }, e.abrupt("break", 22);
				case 15: return f = {
					showType: Oe.VIP,
					button: {
						text: u ? "立刻扩容" : "开通会员",
						onClick: function() {
							var e = e$13(l$3.mark((function e(t) {
								var n, o;
								return l$3.wrap((function(e) {
									for (;;) switch (e.prev = e.next) {
										case 0: return o = null === (n = s.get(i)) || void 0 === n || null === (n = n.getTask()) || void 0 === n || null === (n = n.file) || void 0 === n ? void 0 : n.type, e.next = 3, O$1.getStorageOverflowExtension();
										case 3: e.sent.show({
											errorCode: O$2.OWNER_OVERFLOW,
											aidOptions: {
												position: t || "chatfloat",
												feature: "space",
												apprec1: o === c$7.PDF ? "upload" : "import",
												apprec4: h$2[o] || h$2[c$7.UNSPECIFIED]
											},
											onSuccess: d,
											payComponentOptions: { onSuccess: d }
										});
										case 5:
										case "end": return e.stop();
									}
								}), e);
							})));
							return function(t) {
								return e.apply(this, arguments);
							};
						}()
					}
				}, e.abrupt("break", 22);
				case 17: return e.abrupt("break", 22);
				case 18: return f = { button: {
					text: "重试",
					onClick: function() {
						var e;
						null === (e = s.get(i)) || void 0 === e || e.retryTask();
					}
				} }, e.abrupt("break", 22);
				case 22: return e.abrupt("return", Fe(Fe({}, l), f));
				case 23:
				case "end": return e.stop();
			}
		}), e);
	}))), Ae.apply(this, arguments);
}
function _e(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function Ne(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? _e(Object(r), !0).forEach((function(n) {
			r$4(e, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _e(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
var import_react$11, K, Z, ne$1, re, ie, oe, ce, pe, me, ge$1, Oe, Pe, Te, Ee, we, Ce, je, Le, Me;
var init_use_file_import = __esmMin((() => {
	init_toConsumableArray_d8de034d();
	init_defineProperty_ba606e08();
	init_index_a3cfc692();
	init_slicedToArray_e715395f();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_esm$9();
	init_esm$12();
	init_esm$3();
	init_esm$8();
	init_dist();
	init_createClass_2e0257aa();
	init_typeof_0dbfa870();
	init_esm_browser();
	init_action_service();
	init_lodash();
	init_i18n();
	init_dist$8();
	init_esm$6();
	init_esm$10();
	c$7.DOC, c$7.PDF, c$7.SLIDE, c$7.MINDMAP, c$7.SMART_CANVAS;
	K = [
		MimeType.Doc,
		MimeType.Slide,
		MimeType.Pdf,
		MimeType.Mind,
		MimeType.SmartCanvas,
		MimeType.Folder,
		MimeType.Sheet
	];
	Z = [].concat(e$7(PowerPointMimeTypes), e$7(WordMimeTypes), e$7(TextMimeTypes), e$7(mindMimeTypes), [MimeType.Pdf, ".xmind"]);
	MimeType.Doc, MimeType.Pdf;
	[].concat(e$7(WordMimeTypes), [MimeType.Pdf]);
	MimeType.Slide;
	e$7(PowerPointMimeTypes);
	ne$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3etoolbar_add_link%3c/title%3e %3cg id='%e6%8e%a7%e4%bb%b6' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e7%bc%96%e7%bb%84' fill='%23464D5A' fill-rule='nonzero'%3e %3cg id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88'%3e %3cpath d='M12.9827282%2c9.67619386 C13.2460803%2c9.84342437 13.4961285%2c10.0426938 13.7267173%2c10.2732827 C15.4244276%2c11.9709929 15.4244276%2c14.723525 13.7267173%2c16.4212352 L11.4212352%2c18.7267173 C9.72352495%2c20.4244276 6.97099286%2c20.4244276 5.27328265%2c18.7267173 C3.57557245%2c17.0290071 3.57557245%2c14.276475 5.27328265%2c12.5787648 L7.09587091%2c10.7552556 C7.20873369%2c11.1904702 7.41684345%2c11.5873146 7.69662436%2c11.922213 L6.15716613%2c13.4626483 C4.94761129%2c14.6722032 4.94761129%2c16.633279 6.15716613%2c17.8428339 C7.32019963%2c19.0058674 9.17805657%2c19.0505994 10.394538%2c17.97703 L10.5373517%2c17.8428339 L12.8428339%2c15.5373517 C14.0058674%2c14.3743182 14.0505994%2c12.5164612 12.97703%2c11.2999798 L12.8428339%2c11.1571661 L12.7890474%2c11.1072562 C12.9251701%2c10.7646731 13%2c10.3910753 13%2c10 C13%2c9.89059808 12.994144%2c9.78256391 12.9827282%2c9.67619386 Z M18.7267173%2c5.27328265 C20.4244276%2c6.97099286 20.4244276%2c9.72352495 18.7267173%2c11.4212352 L17.1937153%2c12.9536176 C16.9039917%2c12.6431687 16.5491476%2c12.3942797 16.150947%2c12.2287143 L17.8428339%2c10.5373517 C19.0058674%2c9.37431818 19.0505994%2c7.51646124 17.97703%2c6.29997979 L17.8428339%2c6.15716613 C16.6798004%2c4.99413263 14.8219434%2c4.94940057 13.605462%2c6.02296996 L13.4626483%2c6.15716613 L11.1571661%2c8.46264832 C9.94761129%2c9.67220316 9.94761129%2c11.633279 11.1571661%2c12.8428339 C11.5056774%2c13.1913452 11.91658%2c13.4394393 12.35392%2c13.5871161 C12.1594788%2c13.9480465 12.0375095%2c14.3555659 12.0073481%2c14.7883822 C11.3736085%2c14.584716 10.7770134%2c14.2304481 10.2732827%2c13.7267173 C8.57557245%2c12.0290071 8.57557245%2c9.27647505 10.2732827%2c7.57876484 L12.5787648%2c5.27328265 C14.276475%2c3.57557245 17.0290071%2c3.57557245 18.7267173%2c5.27328265 Z'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";
	re = function() {
		return n$10((function e() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
			r$5(this, e), this.embeddingQueue = [], this.embeddingCount = 0, this.embeddingLimit = t;
		}), [{
			key: "addEmbedding",
			value: (e = e$13(l$3.mark((function e(t) {
				var n, i, o = this;
				return l$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (!(this.embeddingCount >= this.embeddingLimit)) {
								e.next = 3;
								break;
							}
							return e.next = 3, new Promise((function(e) {
								return o.embeddingQueue.push(e);
							}));
						case 3: return this.embeddingCount += 1, e.next = 6, t();
						case 6: return n = e.sent, this.embeddingCount -= 1, this.embeddingQueue.length && (i = this.embeddingQueue.shift()) && i(), e.abrupt("return", n);
						case 10:
						case "end": return e.stop();
					}
				}), e, this);
			}))), function(t) {
				return e.apply(this, arguments);
			})
		}]);
		var e;
	}();
	ie = function() {
		return n$10((function e() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 50, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5, i = arguments.length > 3 ? arguments[3] : void 0;
			r$5(this, e), this.fileTasks = [], this.listeners = [], this.fileLimit = t, this.useEmbedding = n, this.embeddingManager = new re(r), this.onRemoveTaskFileCb = i;
		}), [
			{
				key: "addFileTask",
				value: (o = e$13(l$3.mark((function e(t, n) {
					var i, o = arguments;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (i = o.length > 2 && void 0 !== o[2] && o[2], null != n && n.length && (this.fileTasks = this.fileTasks.filter((function(e) {
									var t;
									return !n.includes(null == e || null === (t = e.getTask()) || void 0 === t || null === (t = t.file) || void 0 === t ? void 0 : t.type);
								}))), this.fileTasks.unshift(t), t.getTask().status !== l$4.UPLOAD_SUCCESS || i) {
									e.next = 7;
									break;
								}
								return e.next = 7, this.addEmbedding(t);
							case 7: this.notifyChange();
							case 8:
							case "end": return e.stop();
						}
					}), e, this);
				}))), function(e, t) {
					return o.apply(this, arguments);
				})
			},
			{
				key: "replaceFileTask",
				value: (t = e$13(l$3.mark((function e(t) {
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return this.fileTasks = [], e.next = 3, this.addFileTask(t);
							case 3:
							case "end": return e.stop();
						}
					}), e, this);
				}))), function(e) {
					return t.apply(this, arguments);
				})
			},
			{
				key: "deleteFileTask",
				value: function(e) {
					var t, n = 0;
					this.fileTasks.some((function(t, r) {
						return t.getTask().id === e && (n = r, t.cancelTask(), !0);
					}));
					var o = t$8(this.fileTasks.splice(n, 1), 1)[0];
					null === (t = this.onRemoveTaskFileCb) || void 0 === t || t.call(this, o), this.notifyChange();
				}
			},
			{
				key: "getAllFileTasks",
				value: function() {
					return this.fileTasks;
				}
			},
			{
				key: "clearFileTask",
				value: function() {
					this.fileTasks = [], this.notifyChange();
				}
			},
			{
				key: "notifyChange",
				value: function() {
					var e = this;
					this.listeners.forEach((function(t) {
						t(e.fileTasks);
					}));
				}
			},
			{
				key: "addListener",
				value: function(e) {
					this.listeners.push(e);
				}
			},
			{
				key: "removeListener",
				value: function(e) {
					this.listeners = this.listeners.filter((function(t) {
						return t !== e;
					}));
				}
			},
			{
				key: "getFileData",
				value: function(e) {
					var t = e || function() {
						return !0;
					};
					return this.fileTasks.filter(t).map((function(e) {
						var t;
						return null === (t = e.getTask()) || void 0 === t ? void 0 : t.file;
					})).filter(Boolean);
				}
			},
			{
				key: "getUploadedFileData",
				value: function() {
					return this.useEmbedding ? this.getFileData((function(e) {
						return e.getTask().status === F.EMBEDDING_SUCCESS;
					})) : this.getFileData((function(e) {
						return e.getTask().status === l$4.UPLOAD_SUCCESS;
					}));
				}
			},
			{
				key: "isAllSuccess",
				value: function() {
					return this.useEmbedding ? this.fileTasks.every((function(e) {
						return e.getTask().status === F.EMBEDDING_SUCCESS;
					})) : this.fileTasks.every((function(e) {
						return e.getTask().status === l$4.UPLOAD_SUCCESS;
					}));
				}
			},
			{
				key: "getUploadFileCount",
				value: function() {
					var e = this.getFileData((function(e) {
						return e.getTask().status !== l$4.UPLOAD_FAILED;
					}));
					return this.fileLimit - e.length;
				}
			},
			{
				key: "getUseEmbedding",
				value: function() {
					return this.useEmbedding;
				}
			},
			{
				key: "addEmbedding",
				value: (e = e$13(l$3.mark((function e(t) {
					var i, o, s;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.useEmbedding) {
									e.next = 2;
									break;
								}
								return e.abrupt("return");
							case 2:
								if ((i = function(e) {
									t.updateTask({ status: e });
								})(F.PREPARE), o = t.getTask() || {}, s = o.file) {
									e.next = 7;
									break;
								}
								return e.abrupt("return");
							case 7: return e.next = 9, this.embeddingManager.addEmbedding((function() {
								return new Promise(function() {
									var e = e$13(l$3.mark((function e(t, n) {
										var o, a;
										return l$3.wrap((function(e) {
											for (;;) switch (e.prev = e.next) {
												case 0: return i(F.EMBEDDING), o = "link" === s.source ? { externalUrl: s.url } : { fileId: s.id }, e.prev = 2, e.next = 5, s$3.getPrepareQa(o);
												case 5:
													(a = e.sent) && isEmpty(null == a ? void 0 : a.prepare_for_qa) ? (i(F.EMBEDDING_SUCCESS), t("")) : (i(F.EMBEDDING_FAILED), n("")), e.next = 12;
													break;
												case 9: e.prev = 9, e.t0 = e.catch(2), i(F.EMBEDDING_FAILED);
												case 12:
												case "end": return e.stop();
											}
										}), e, null, [[2, 9]]);
									})));
									return function(t, n) {
										return e.apply(this, arguments);
									};
								}());
							}));
							case 9: i(F.EMBEDDING_SUCCESS);
							case 10:
							case "end": return e.stop();
						}
					}), e, this);
				}))), function(t) {
					return e.apply(this, arguments);
				})
			},
			{
				key: "getAllEmbeddingFinish",
				value: function() {
					return this.fileTasks.every((function(e) {
						return H$1.FileFinishStatus.includes(e.getTask().status);
					}));
				}
			},
			{
				key: "getAllEmbeddingSuccess",
				value: function() {
					return this.fileTasks.every((function(e) {
						return e.getTask().status === F.EMBEDDING_SUCCESS || e.getTask().status === l$4.UPLOAD_SUCCESS;
					}));
				}
			}
		]);
		var e, t, o;
	}();
	oe = new ie();
	ce = function() {
		return n$10((function e(t) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : oe;
			r$5(this, e), this.task = ae({
				id: v4(),
				status: l$4.UPLOADING,
				progress: 0
			}, t), this.manager = n, this.executeTask();
		}), [
			{
				key: "toJSON",
				value: function() {
					return {
						task: this.task,
						manager: void 0
					};
				}
			},
			{
				key: "getTask",
				value: function() {
					return this.task;
				}
			},
			{
				key: "updateTask",
				value: (e = e$13(l$3.mark((function e(t) {
					var n;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (n = t.status, this.task = ae(ae({}, this.task), t), this.notifyChange(), n !== l$4.UPLOAD_SUCCESS) {
									e.next = 6;
									break;
								}
								return e.next = 6, this.manager.addEmbedding(this);
							case 6:
							case "end": return e.stop();
						}
					}), e, this);
				}))), function(t) {
					return e.apply(this, arguments);
				})
			},
			{
				key: "notifyChange",
				value: function() {
					this.manager.notifyChange();
				}
			}
		]);
		var e;
	}();
	pe = function() {
		function e(t) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : oe, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l$4.UPLOADING;
			r$5(this, e);
			var i, o, s, a = le$1(le$1({}, t), {}, {
				source: "link",
				iconUrl: ne$1
			});
			return i = this, o = e, s = [{
				id: t.id,
				metadata: {
					name: t.name,
					id: t.id,
					icon: ne$1,
					url: a.url,
					data: a
				},
				file: a,
				status: r
			}, n], o = Y(o), X(i, fe() ? Reflect.construct(o, s || [], Y(i).constructor) : o.apply(i, s));
		}
		return te(e, ce), n$10(e, [
			{
				key: "executeTask",
				value: function() {
					H$1.FileFinishStatus.includes(this.task.status) || this.updateTask({ status: l$4.UPLOAD_SUCCESS });
				}
			},
			{
				key: "retryTask",
				value: function() {}
			},
			{
				key: "cancelTask",
				value: function() {}
			}
		]);
	}();
	me = function() {
		function e(t) {
			var n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : oe;
			r$5(this, e);
			var i, o, s, a = t.fileModel.docType ? _$3[m$2(t.fileModel.docType)] : void 0;
			return i = this, o = e, s = [{
				id: t.id,
				metadata: {
					name: t.fileModel.file.name.replace(/(?!^)\.(?!pdf$)[^/.]+$/, ""),
					docType: t.fileModel.docType
				},
				file: ve(ve({}, t.fileModel.file), {}, { iconUrl: a })
			}, r], o = Y(o), (n = X(i, he() ? Reflect.construct(o, s || [], Y(i).constructor) : o.apply(i, s))).importComponentTask = t, n;
		}
		return te(e, ce), n$10(e, [
			{
				key: "executeTask",
				value: function() {}
			},
			{
				key: "retryTask",
				value: function() {
					var e, t;
					this.updateTask({
						status: l$4.UPLOADING,
						progress: 0,
						errorInfo: void 0
					}), null === (e = (t = this.importComponentTask).restart) || void 0 === e || e.call(t);
				}
			},
			{
				key: "cancelTask",
				value: function() {
					var e, t;
					null === (e = (t = this.importComponentTask).cancel) || void 0 === e || e.call(t);
				}
			}
		]);
	}();
	Ee = function() {
		function e(t) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : oe, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l$4.UPLOADING;
			r$5(this, e);
			var i, o, s, a = be(be({}, t), {}, {
				url: S$1(t.url),
				source: "online"
			});
			return i = this, o = e, s = [{
				id: t.id,
				metadata: {
					name: t.name,
					id: t.id,
					icon: t.iconUrl,
					url: a.url,
					data: a
				},
				file: a,
				status: r
			}, n], o = Y(o), X(i, ke() ? Reflect.construct(o, s || [], Y(i).constructor) : o.apply(i, s));
		}
		return te(e, ce), n$10(e, [
			{
				key: "executeTask",
				value: function() {
					var e, t, n = this;
					((null === (e = this.task) || void 0 === e ? void 0 : e.file) || {}).type !== c$7.UNSPECIFIED || (null === (t = this.task) || void 0 === t ? void 0 : t.status) === l$4.UPLOAD_SUCCESS ? H$1.FileFinishStatus.includes(this.task.status) || this.updateTask({ status: l$4.UPLOAD_SUCCESS }) : this.updateTask({
						status: l$4.UPLOAD_FAILED,
						errorInfo: {
							message: i$3("error.file-type-unsupported"),
							button: {
								text: i$3("action.delete"),
								onClick: function() {
									n.manager.deleteFileTask(n.task.id);
								}
							}
						}
					});
				}
			},
			{
				key: "retryTask",
				value: function() {}
			},
			{
				key: "cancelTask",
				value: function() {}
			}
		]);
	}();
	(function(e) {
		e.UPLOADING = "uploading", e.UPLOAD_SUCCESS = "upload_success", e.UPLOAD_FAILED = "upload_failed";
	})(ge$1 || (ge$1 = {})), function(e) {
		e.DEFAULT = "default", e.VIP = "vip";
	}(Oe || (Oe = {})), function(e) {
		e.Initial = "Initial", e.Ready = "Ready", e.Progress = "Progress", e.Error = "Error", e.Pause = "Pause", e.Success = "Success", e.Restart = "Restart", e.Delete = "Delete";
	}(Pe || (Pe = {})), function(e) {
		e.UploadError = "UploadError", e.ImportError = "ImportError", e.CosUploadError = "CosUploadError", e.NetWorkError = "NetWorkError", e.UserSizeLimit = "UserSizeLimit", e.CollaboratorSizeLimit = "CollaboratorSizeLimit", e.OverLimit = "OverLimit", e.FileType = "FileType", e.Cancel = "Cancel", e.Unknown = "Unknown", e.NeedPassword = "NeedPassword", e.PasswordError = "PasswordError", e.OfflineError = "OfflineError";
	}(Te || (Te = {}));
	we = function() {
		var e = e$13(l$3.mark((function e(t) {
			var n, i, o, s, a, c, u, l;
			return l$3.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: return n = t.maxNumber, i = void 0 === n ? 50 : n, o = t.supportTypes, s = void 0 === o ? Z : o, a = t.onAfterInitTasks, c = t.onTaskFinish, u = t.options, l = void 0 === u ? {} : u, e.next = 3, v$2.getInstance().getExtension(f$3.name);
					case 3: e.sent.mixedExecute(De({
						style: "Silence",
						mode: m$3.IMPORT,
						maxUploadNumber: i,
						multiple: i > 1,
						accept: s,
						onAfterInitTasks: a,
						onTaskFinish: c
					}, l));
					case 5:
					case "end": return e.stop();
				}
			}), e);
		})));
		return function(t) {
			return e.apply(this, arguments);
		};
	}();
	Ce = {
		name: "docs-component-drive-selector-pc",
		loadType: LoadType.ON_DEMAND
	};
	je = {
		name: "docs-component-drive-selector-mobile",
		loadType: LoadType.ON_DEMAND
	};
	Le = function() {
		var e = e$13(l$3.mark((function e(t) {
			var n, i, o, s, a, c, u, l, f, d;
			return l$3.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: return n = t.onConfirm, i = t.mimeTypes, o = void 0 === i ? K : i, s = t.maxNumber, a = void 0 === s ? 50 : s, c = t.enabledFolder, u = void 0 !== c && c, e.next = 3, v$2.getInstance().extensionService.addExtensionConfig(ua.isMobile ? [je] : [Ce]);
					case 3: return e.next = 5, v$2.getInstance().getExtension(ua.isMobile ? je.name : Ce.name);
					case 5: l = e.sent, f = S.isSupportSpace(), d = [
						"Recent",
						"MyDoc",
						"Collection",
						f ? "WikiSpace" : ""
					].filter(Boolean), l.showFilesSelector({
						target: xe(o),
						tabs: d,
						permissions: ["canRead"],
						enabledFolder: u,
						maxNumber: a,
						className: "ai-pc-docs-component-drive-selector",
						onOk: n,
						onDisabled: function(e) {
							return (null == e ? void 0 : e.docType) === DocType.Drive && i$3("error.file-type-unsupported");
						},
						style: { zIndex: 1e4 }
					});
					case 9:
					case "end": return e.stop();
				}
			}), e);
		})));
		return function(t) {
			return e.apply(this, arguments);
		};
	}();
	Me = function(u) {
		var v = u.onUpload, h = u.onLocalTaskInit, m = u.maxSize, y = void 0 === m ? 50 : m, g = u.supportTypes, P = void 0 === g ? Z : g, D = u.mimeTypes, w = void 0 === D ? K : D, C = u.onlineFileSizeLimit, j = void 0 === C ? 100 : C, x = u.useEmbedding, L = void 0 !== x && x, U = u.onSizeLimit, F = u.handleLocalFileError, I = u.onRemoveTaskFileCb, A = u.initialFiles, N = t$8((0, import_react$11.useState)([]), 2), M = N[0], R = N[1], z = t$8((0, import_react$11.useState)(!1), 2), G = z[0], V = z[1], Q = t$8((0, import_react$11.useState)(!0), 2), $ = Q[0], q = Q[1], J = t$8((0, import_react$11.useState)(), 2), X = J[0], Y = J[1], ee = (0, import_react$11.useRef)(/* @__PURE__ */ new Map());
		return (0, import_react$11.useEffect)((function() {
			if (ua.isSafari || ua.isIOS) try {
				v$2.getInstance().getExtension(f$3.name);
			} catch (e) {
				console.error("预加载DC组件失败:", e);
			}
		}), []), (0, import_react$11.useEffect)((function() {
			var t = new ie(y, L, 5, I);
			t?.addListener((function(n) {
				R(e$7(n)), q(t.getUploadFileCount() > 0);
				V(t.getFileData((function(e) {
					return e.getTask().status === l$4.UPLOADING;
				})).length > 0);
			})), Y(t);
		}), [
			y,
			L,
			I
		]), (0, import_react$11.useLayoutEffect)((function() {
			0 !== (null == A ? void 0 : A.length) && A && (X?.clearFileTask(), (A.length > y ? A.slice(0, y) : A).forEach((function(e) {
				return null == X ? void 0 : X.addFileTask(new Ee(e, X, l$4.UPLOAD_SUCCESS));
			})));
		}), [
			A,
			y,
			X
		]), {
			fileTasks: M,
			fileTaskManager: X,
			isUploading: G,
			canAddFile: $,
			selectOnlineDoc: function(e, t, i) {
				var o;
				Le({
					enabledFolder: e,
					maxNumber: null == X ? void 0 : X.getUploadFileCount(),
					mimeTypes: w,
					onConfirm: (o = e$13(l$3.mark((function n(o) {
						var s, a, c;
						return l$3.wrap((function(n) {
							for (;;) switch (n.prev = n.next) {
								case 0: a = 1048576 * j, c = null === (s = o.filter((function(e) {
									var t;
									return !((null !== (t = e.size) && void 0 !== t ? t : 0) > a && (U?.(j), 1));
								}))) || void 0 === s ? void 0 : s.map((function(e) {
									var t, n = getFileIconURL({ mimeType: e.mimeType });
									return {
										id: e.id,
										name: e.displayName || e.title,
										type: g$2(e.mimeType),
										iconUrl: n.target || n.fallback,
										url: S$1(e.url),
										size: null !== (t = e.size) && void 0 !== t ? t : 0,
										topic_id: (null == e ? void 0 : e.topId) || void 0
									};
								})), t && X?.clearFileTask(), c.forEach((function(t) {
									X?.addFileTask(new Ee(t, X, l$4.UPLOAD_SUCCESS), [], e);
								})), v?.(c, "online"), i?.(c);
								case 6:
								case "end": return n.stop();
							}
						}), n);
					}))), function(e) {
						return o.apply(this, arguments);
					})
				});
			},
			uploadLocalDoc: function() {
				var e, i, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
					files: [],
					style: "Silence",
					mode: m$3.IMPORT
				}, s = o.files, a = void 0 === s ? [] : s, c = o.style, u = void 0 === c ? "Silence" : c, p = o.mode, d = {
					style: u,
					mode: void 0 === p ? m$3.IMPORT : p
				};
				a.length && (d.files = a), we({
					maxNumber: null == X ? void 0 : X.getUploadFileCount(),
					supportTypes: P,
					onAfterInitTasks: (i = e$13(l$3.mark((function e(t) {
						return l$3.wrap((function(e) {
							for (;;) switch (e.prev = e.next) {
								case 0: t.currentFileTasks.forEach((function(e) {
									var t = new me(e, X);
									ee.current.set(e.id, t), X?.addFileTask(t);
								})), h?.((null == X ? void 0 : X.getAllFileTasks()) || []);
								case 3:
								case "end": return e.stop();
							}
						}), e);
					}))), function(e) {
						return i.apply(this, arguments);
					}),
					onTaskFinish: (e = e$13(l$3.mark((function e(n) {
						var i, o, s, a, c, u, p, d, h, m, y, b, k, g, P, T;
						return l$3.wrap((function(e) {
							for (;;) switch (e.prev = e.next) {
								case 0:
									if (o = n.currentTask, s = o.id, a = o.fileId, c = o.fileUrl, u = o.status, p = o.extra, d = o.fileModel, h = r$4(r$4(r$4({}, Pe.Success, l$4.UPLOAD_SUCCESS), Pe.Progress, l$4.UPLOADING), Pe.Error, l$4.UPLOAD_FAILED), m = h[u] || l$4.UPLOAD_FAILED, y = ee.current.get(s || ""), b = (null == y ? void 0 : y.getTask()) || {}, k = b.metadata, g = {}, m !== l$4.UPLOAD_FAILED) {
										e.next = 13;
										break;
									}
									return e.next = 10, Ie({
										id: s || "",
										errorInfo: p,
										taskMap: ee.current,
										fileTaskManager: X
									});
								case 10: P = e.sent, g = { errorInfo: P }, ua.isMobile && F?.(P);
								case 13:
									if (void 0 !== (null == k ? void 0 : k.docType)) {
										e.next = 15;
										break;
									}
									return e.abrupt("return");
								case 15: T = {
									id: a,
									type: m$2(k.docType),
									name: k.name,
									url: S$1(c),
									source: "local",
									size: (null == d || null === (i = d.file) || void 0 === i ? void 0 : i.size) || 0
								}, m === l$4.UPLOAD_SUCCESS && (console.log("上传了", T), v?.([T], "local")), y?.updateTask(Ne({
									status: m,
									file: T
								}, g));
								case 18:
								case "end": return e.stop();
							}
						}), e);
					}))), function(t) {
						return e.apply(this, arguments);
					}),
					options: d
				});
			},
			importLocalFiles: we,
			onAddLinkSuccess: function(e) {
				var t = {
					id: e,
					name: e,
					type: c$7.LINK,
					url: e
				};
				v?.([t], "link"), X?.addFileTask(new pe(t, X));
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-feedback/index.js
var u$3;
var init_use_feedback = __esmMin((() => {
	init_index_a3cfc692();
	init_url();
	init_esm$9();
	u$3 = function() {
		return { feedbackRequest: function() {
			var u = e$13(l$3.mark((function t(u) {
				var o, i, c, p, s, m;
				return l$3.wrap((function(t) {
					for (;;) switch (t.prev = t.next) {
						case 0: return o = u.evaluate, i = u.actionType, c = u.inputId, p = u.outputId, s = u.category, m = u.additionalComments, t.prev = 1, t.next = 4, d$1({
							url: a$7,
							method: "post",
							data: {
								evaluate: o,
								action_type: i,
								input_id: c,
								output_id: p,
								category: s,
								additional_comments: m
							},
							config: { params: { xsrf: r$7() } }
						});
						case 4: return t.abrupt("return", !0);
						case 7: return t.prev = 7, t.t0 = t.catch(1), t.abrupt("return", !1);
						case 10:
						case "end": return t.stop();
					}
				}), t, null, [[1, 7]]);
			})));
			return function(t) {
				return u.apply(this, arguments);
			};
		}() };
	};
}));
var init_use_fake_progress = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/use-dynamic-class-listener/index.js
var import_react$9, e$5;
var init_use_dynamic_class_listener = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	e$5 = function(e, n) {
		(0, import_react$9.useEffect)((function() {
			var t, r = function(t) {
				n(e.flatMap((function(t) {
					return Array.from(document.getElementsByClassName(t));
				})).some((function(e) {
					return e.contains(t.target);
				})), t);
			};
			return document.addEventListener("click", r, !0), (t = new MutationObserver((function() {}))).observe(document.body, {
				subtree: !0,
				childList: !0,
				attributes: !0,
				attributeFilter: ["class"]
			}), function() {
				var e;
				document.removeEventListener("click", r, !0), null === (e = t) || void 0 === e || e.disconnect();
			};
		}), [e, n]);
	};
}));
var init_use_group_conversation_history = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/universal-search/use-groups/index.js
var import_react$7, u$2;
var init_use_groups = __esmMin((() => {
	init_index_a3cfc692();
	init_slicedToArray_e715395f();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_esm$9();
	init_url();
	u$2 = function() {
		var u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, f = u.limit, p = u.offset, l = t$8(import_react$7.useState([]), 2), d = l[0], h = l[1], v = t$8((0, import_react$7.useState)(!0), 2), x = v[0], j = v[1], k = function() {
			var n = e$13(l$3.mark((function t() {
				var n, o, e, a;
				return l$3.wrap((function(t) {
					for (;;) switch (t.prev = t.next) {
						case 0: return n = f || p ? new URLSearchParams({
							limit: f ? "".concat(f) : "",
							offset: "".concat(p)
						}).toString() : "", t.next = 3, d$1({
							url: "".concat(e$12.groups, "?xsrf=").concat(r$7(), "&").concat(n),
							method: "get",
							data: {}
						});
						case 3: o = t.sent, e = (null == o ? void 0 : o.data) || { groups: [] }, a = e.groups, h(a), j(!1);
						case 7:
						case "end": return t.stop();
					}
				}), t);
			})));
			return function() {
				return n.apply(this, arguments);
			};
		}();
		return (0, import_react$7.useEffect)((function() {
			k();
		}), []), {
			groups: d,
			isFetching: x
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/universal-search/use-clear-groups/index.js
var a$1;
var init_use_clear_groups = __esmMin((() => {
	init_index_a3cfc692();
	init_esm$9();
	init_url();
	a$1 = function() {
		return {
			deleteGroups: function() {
				var u = e$13(l$3.mark((function t() {
					return l$3.wrap((function(t) {
						for (;;) switch (t.prev = t.next) {
							case 0: return t.next = 2, d$1({
								url: "".concat(e$12.deleteGroups, "?xsrf=").concat(r$7()),
								method: "delete",
								data: {}
							});
							case 2:
							case "end": return t.stop();
						}
					}), t);
				})));
				return function() {
					return u.apply(this, arguments);
				};
			}(),
			deleteGroup: function() {
				var a = e$13(l$3.mark((function t(a) {
					return l$3.wrap((function(t) {
						for (;;) switch (t.prev = t.next) {
							case 0: return t.next = 2, d$1({
								url: "".concat(c$5(e$12.deleteGroup, { groupId: a }), "?xsrf=").concat(r$7()),
								method: "delete",
								data: {}
							});
							case 2: return t.abrupt("return", t.sent);
							case 3:
							case "end": return t.stop();
						}
					}), t);
				})));
				return function(t) {
					return a.apply(this, arguments);
				};
			}()
		};
	};
}));
var init_use_auto_scroll = __esmMin((() => {
	require_react();
}));
var init_use_mobile_auto_scroll = __esmMin((() => {
	require_react();
}));
var init_use_search_chat = __esmMin((() => {
	require_react();
	init_esm$12();
	init_dist();
	init_dist$8();
	init_esm$10();
	init_esm$6();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/universal-search/file-path/index.js
var init_file_path = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/search-import/index.js
var import_react$3, s$1, u, c$1, i$1, o$2, p$1, f$1, l$1;
var init_search_import = __esmMin((() => {
	init_index_a3cfc692();
	init_slicedToArray_e715395f();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_esm$9();
	u = "/api/aisearch/import/user/status";
	c$1 = "/api/aisearch/import/user/cancel";
	i$1 = "/api/aisearch/user/import/exist";
	(function(t) {
		t[t.unknow = 0] = "unknow", t[t.start = 1] = "start", t[t.progress = 2] = "progress", t[t.success = 3] = "success", t[t.failed = 4] = "failed", t[t.cancelled = 5] = "cancelled";
	})(s$1 || (s$1 = {}));
	o$2 = function() {
		var e = e$13(l$3.mark((function t() {
			var e, n, s, c, i, o, p, f, l, m = arguments;
			return l$3.wrap((function(t) {
				for (;;) switch (t.prev = t.next) {
					case 0: return e = m.length > 0 && void 0 !== m[0] ? m[0] : {}, t.prev = 1, t.next = 4, d$1({
						url: u,
						data: e
					});
					case 4: return n = t.sent, s = n.data, c = (null == s ? void 0 : s.result) || {}, i = c.status, o = void 0 === i ? 0 : i, p = c.completed, f = c.files, l = c.imported_total, t.abrupt("return", {
						status: o,
						completed: p,
						importedFileNames: null == f ? void 0 : f.map((function(t) {
							return {
								ext: t.ext,
								fileId: t.file_id,
								fileName: t.file_name,
								iconType: t.ext.replace("tencent", "").replace("smartcanvas", "aio")
							};
						})),
						importedTotal: l
					});
					case 10: return t.prev = 10, t.t0 = t.catch(1), t.abrupt("return", { status: 0 });
					case 13:
					case "end": return t.stop();
				}
			}), t, null, [[1, 10]]);
		})));
		return function() {
			return e.apply(this, arguments);
		};
	}();
	p$1 = function() {
		var e = e$13(l$3.mark((function t() {
			var e, n, s, u;
			return l$3.wrap((function(t) {
				for (;;) switch (t.prev = t.next) {
					case 0: return t.prev = 0, t.next = 3, d$1({
						url: i$1,
						data: {}
					});
					case 3: return e = t.sent, n = e.data, s = (null == n ? void 0 : n.result) || {}, u = s.is_exist, t.abrupt("return", Boolean(u));
					case 9: return t.prev = 9, t.t0 = t.catch(0), t.abrupt("return", !1);
					case 12:
					case "end": return t.stop();
				}
			}), t, null, [[0, 9]]);
		})));
		return function() {
			return e.apply(this, arguments);
		};
	}();
	f$1 = function() {
		var e = e$13(l$3.mark((function t() {
			return l$3.wrap((function(t) {
				for (;;) switch (t.prev = t.next) {
					case 0: return t.next = 2, d$1({
						url: c$1,
						data: {}
					});
					case 2: return t.abrupt("return", t.sent);
					case 3:
					case "end": return t.stop();
				}
			}), t);
		})));
		return function() {
			return e.apply(this, arguments);
		};
	}();
	l$1 = function() {
		var u = t$8((0, import_react$3.useState)(!1), 2), c = u[0], i = u[1], m = t$8((0, import_react$3.useState)(!1), 2), d = m[0], v = m[1], h = function() {
			var e = e$13(l$3.mark((function t() {
				var e, n, a = arguments;
				return l$3.wrap((function(t) {
					for (;;) switch (t.prev = t.next) {
						case 0: return e = a.length > 0 && void 0 !== a[0] ? a[0] : {}, t.next = 3, o$2(e);
						case 3: return (n = t.sent).status === s$1.success ? i(!1) : i(!0), v(!0), t.abrupt("return", n);
						case 7:
						case "end": return t.stop();
					}
				}), t);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}();
		return {
			isImporting: c,
			getImportStatus: h,
			hasImportExist: function() {
				var e = e$13(l$3.mark((function t() {
					var e;
					return l$3.wrap((function(t) {
						for (;;) switch (t.prev = t.next) {
							case 0: return t.next = 2, p$1();
							case 2:
								if (t.t1 = e = t.sent, t.t0 = null !== t.t1, !t.t0) {
									t.next = 6;
									break;
								}
								t.t0 = void 0 !== e;
							case 6:
								if (!t.t0) {
									t.next = 10;
									break;
								}
								t.t2 = e, t.next = 11;
								break;
							case 10: t.t2 = !1;
							case 11: t.t2 ? h() : v(!0);
							case 13:
							case "end": return t.stop();
						}
					}), t);
				})));
				return function() {
					return e.apply(this, arguments);
				};
			}(),
			cancelImport: function() {
				var e = e$13(l$3.mark((function t() {
					return l$3.wrap((function(t) {
						for (;;) switch (t.prev = t.next) {
							case 0: return t.next = 2, f$1();
							case 2:
							case "end": return t.stop();
						}
					}), t);
				})));
				return function() {
					return e.apply(this, arguments);
				};
			}(),
			setImporting: i,
			checkFinished: d
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+fetch-event-source@0.1.0/node_modules/@tencent/fetch-event-source/lib/esm/parse.js
async function getBytes(response, onChunk) {
	var _a;
	const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
	if (reader) {
		let result = await reader.read();
		while (!result.done) {
			onChunk(result.value);
			result = await reader.read();
		}
	} else onChunk(new Uint8Array(await response.arrayBuffer()));
}
function getLines(onLine) {
	let buffer;
	let position;
	let fieldLength;
	let discardTrailingNewline = false;
	return function onChunk(arr) {
		if (buffer === void 0) {
			buffer = arr;
			position = 0;
			fieldLength = -1;
		} else buffer = concat(buffer, arr);
		const bufLength = buffer.length;
		let lineStart = 0;
		while (position < bufLength) {
			if (discardTrailingNewline) {
				if (buffer[position] === 10) lineStart = ++position;
				discardTrailingNewline = false;
			}
			let lineEnd = -1;
			for (; position < bufLength && lineEnd === -1; ++position) switch (buffer[position]) {
				case 58:
					if (fieldLength === -1) fieldLength = position - lineStart;
					break;
				case 13: discardTrailingNewline = true;
				case 10: lineEnd = position;
			}
			if (lineEnd === -1) break;
			onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
			lineStart = position;
			fieldLength = -1;
		}
		if (lineStart === bufLength) buffer = void 0;
		else if (lineStart !== 0) {
			buffer = buffer.subarray(lineStart);
			position -= lineStart;
		}
	};
}
function getMessages(onId, onRetry, onMessage) {
	let message = newMessage();
	const decoder = new TextDecoder();
	return function onLine(line, fieldLength) {
		if (line.length === 0) {
			onMessage === null || onMessage === void 0 || onMessage(message);
			message = newMessage();
		} else if (fieldLength > 0) {
			const field = decoder.decode(line.subarray(0, fieldLength));
			const valueOffset = fieldLength + (line[fieldLength + 1] === 32 ? 2 : 1);
			const value = decoder.decode(line.subarray(valueOffset));
			switch (field) {
				case "data":
					message.data = message.data ? message.data + "\n" + value : value;
					break;
				case "event":
					message.event = value;
					break;
				case "id":
					onId(message.id = value);
					break;
				case "retry":
					const retry = parseInt(value, 10);
					if (!isNaN(retry)) onRetry(message.retry = retry);
			}
		}
	};
}
function concat(a, b) {
	const res = new Uint8Array(a.length + b.length);
	res.set(a);
	res.set(b, a.length);
	return res;
}
function newMessage() {
	return {
		data: "",
		event: "",
		id: "",
		retry: void 0
	};
}
var init_parse = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+fetch-event-source@0.1.0/node_modules/@tencent/fetch-event-source/lib/esm/fetch.js
function fetchEventSource(input, _a) {
	var { signal: inputSignal, headers: inputHeaders, onopen: inputOnOpen, onmessage, onclose, onerror, openWhenHidden, fetch: inputFetch } = _a, rest = __rest(_a, [
		"signal",
		"headers",
		"onopen",
		"onmessage",
		"onclose",
		"onerror",
		"openWhenHidden",
		"fetch"
	]);
	return new Promise((resolve, reject) => {
		const headers = Object.assign({}, inputHeaders);
		if (!headers.accept) headers.accept = EventStreamContentType;
		let curRequestController;
		function onVisibilityChange() {
			curRequestController.abort();
			if (!document.hidden) create();
		}
		if (!openWhenHidden) document.addEventListener("visibilitychange", onVisibilityChange);
		let retryInterval = DefaultRetryInterval;
		let retryTimer = 0;
		function dispose() {
			document.removeEventListener("visibilitychange", onVisibilityChange);
			window.clearTimeout(retryTimer);
			curRequestController.abort();
		}
		inputSignal === null || inputSignal === void 0 || inputSignal.addEventListener("abort", () => {
			dispose();
			resolve();
		});
		const fetch = inputFetch !== null && inputFetch !== void 0 ? inputFetch : window.fetch;
		const onopen = inputOnOpen !== null && inputOnOpen !== void 0 ? inputOnOpen : defaultOnOpen;
		async function create() {
			var _a;
			curRequestController = new AbortController();
			try {
				const response = await fetch(input, Object.assign(Object.assign({}, rest), {
					headers,
					signal: curRequestController.signal
				}));
				await onopen(response);
				await getBytes(response, getLines(getMessages((id) => {
					if (id) headers[LastEventId] = id;
					else delete headers[LastEventId];
				}, (retry) => {
					retryInterval = retry;
				}, onmessage)));
				onclose === null || onclose === void 0 || onclose();
				dispose();
				resolve();
			} catch (err) {
				if (!curRequestController.signal.aborted) try {
					const interval = (_a = onerror === null || onerror === void 0 ? void 0 : onerror(err)) !== null && _a !== void 0 ? _a : retryInterval;
					window.clearTimeout(retryTimer);
					retryTimer = window.setTimeout(create, interval);
				} catch (innerErr) {
					dispose();
					reject(innerErr);
				}
			}
		}
		create();
	});
}
function defaultOnOpen(response) {
	const contentType = response.headers.get("content-type");
	if (!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith("text/event-stream"))) throw new Error(`Expected content-type to be ${EventStreamContentType}, Actual: ${contentType}`);
}
var __rest, EventStreamContentType, DefaultRetryInterval, LastEventId;
var init_fetch = __esmMin((() => {
	init_parse();
	__rest = function(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	};
	EventStreamContentType = "text/event-stream";
	DefaultRetryInterval = 1e3;
	LastEventId = "last-event-id";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+fetch-event-source@0.1.0/node_modules/@tencent/fetch-event-source/lib/esm/index.js
var init_esm$2 = __esmMin((() => {
	init_fetch();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/sse/split-paragraph/index.js
var e;
var init_split_paragraph = __esmMin((() => {
	init_createClass_2e0257aa();
	e = function() {
		return n$10((function t() {
			r$5(this, t), this.rawString = "", this.combineWithMinLength = function(t) {
				for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20, e = [], i = "", r = 0; r < t.length; r++) (i += t[r]).length >= n && /[。！!?？\n]$/.test(i) && (e.push(i), i = "");
				if (i.length > 0) if ("\n" === i) {
					var h = e.pop();
					e.push(h + i);
				} else e.push(i);
				return e;
			};
		}), [
			{
				key: "add",
				value: function(t) {
					this.rawString += t;
				}
			},
			{
				key: "getSentences",
				value: function() {
					if (this.rawString.length < 20) return [];
					var t = this.rawString.split(/([。！!?？\n])/).filter((function(t) {
						return !!t;
					}));
					if (t.length > 1) {
						if (/([。！!?？\n])$/.test(t[t.length - 1])) {
							var n = this.combineWithMinLength(t);
							return n.join("").length < 20 ? [] : (this.rawString = "", n);
						}
						var e = this.combineWithMinLength(t.slice(0, t.length - 1));
						return e.join("").length < 20 ? [] : (this.rawString = t[t.length - 1], e);
					}
					return [];
				}
			},
			{
				key: "getRemainSentence",
				value: function() {
					return this.rawString;
				}
			},
			{
				key: "clearRemainSentence",
				value: function() {
					this.rawString = "";
				}
			}
		]);
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/sse/worker/index.js
var n$1;
var init_worker = __esmMin((() => {
	init_toConsumableArray_d8de034d();
	init_createClass_2e0257aa();
	n$1 = function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [{
			key: "createWorker",
			value: function(e) {
				var t = 30;
				(e || {}).useFastSchedule && (t = 0);
				var r = "let timer;\n    self.addEventListener('message', function(e) {\n      if (e.data === 'start') {\n        if (!timer) {\n          timer = this.setInterval(() => this.self.postMessage('tick'), ".concat(t, ");\n        }\n      }\n      if (e.data === 'stop') {\n        clearInterval(timer);\n        timer = undefined;\n      }\n    });"), n = new Blob([r], { type: "application/javascript" }), a = URL.createObjectURL(n);
				return new Worker(a, { type: "module" });
			}
		}, {
			key: "initWorkerSchedule",
			value: function(t) {
				var r, n = this, a = [], s = !1, o = null, i = function() {
					s = !0, o && (o.postMessage("stop"), o.terminate(), o = null);
				};
				return {
					stop: i,
					addTask: function(u) {
						Array.isArray(u) ? a.push.apply(a, e$7(u)) : a.push(u), o ? o.postMessage("start") : ((o = n.createWorker(t)).postMessage("start"), o.onmessage = function(e) {
							if (!s && o && "tick" === e.data) {
								try {
									var t = a.shift();
									t?.cb(null == t ? void 0 : t.data);
								} catch (e) {
									i();
								}
								var n;
								if (!a.length) o.postMessage("stop"), null === (n = r) || void 0 === n || n();
							}
						}, o.onerror = function(e) {
							o && (o.terminate(), o = null, console.error("worker error: ", e));
						});
					},
					setDown: function(e) {
						r = e, a.length || (e(), i());
					}
				};
			}
		}]);
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/sse/index.js
function w(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function j$1(t) {
	for (var n = 1; n < arguments.length; n++) {
		var r = null != arguments[n] ? arguments[n] : {};
		n % 2 ? w(Object(r), !0).forEach((function(n) {
			r$4(t, n, r[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
		}));
	}
	return t;
}
var E$1, g$1, A, P, _$1;
var init_sse = __esmMin((() => {
	init_defineProperty_ba606e08();
	init_index_a3cfc692();
	init_createClass_2e0257aa();
	init_esm$9();
	init_esm$12();
	init_esm$2();
	init_lodash();
	init_split_paragraph();
	init_worker();
	(function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [{
			key: "call",
			value: (e = e$13(l$3.mark((function e(t, r) {
				var o, i, a, c, u, l, s, d, f, p, h, v, m;
				return l$3.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return o = t.apiPath, i = t.data, a = t.config, u = (c = void 0 === a ? {} : a).modelType, l = c.useFastSchedule, s = c.scenario, d = void 0 === s ? "resume" : s, f = c.channel, p = void 0 === f ? "tencentdocs" : f, h = c.enableTextSplit, v = void 0 === h || h, m = c.fileId, _$1.setScenario(d), _$1.setChannel(p), _$1.setSplitSentenceOn(v), m && _$1.setCurrentFileId(m), e.next = 8, _$1.call(o, i, r, {
							modelType: u,
							useFastSchedule: l
						});
						case 8:
						case "end": return e.stop();
					}
				}), e);
			}))), function(t, n) {
				return e.apply(this, arguments);
			})
		}, {
			key: "stop",
			value: function() {
				_$1.stop();
			}
		}]);
		var e;
	})();
	A = [
		"onopen",
		"onerror",
		"ontimeout",
		"onclose",
		"timeout"
	];
	(function(e) {
		e.THINKING = "thinking", e.NETWORK = "network";
	})(g$1 || (g$1 = {}));
	P = function(e, t) {
		return {
			code: e,
			message: t
		};
	};
	_$1 = function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [
			{
				key: "setScenario",
				value: function(e) {
					this.scenario = e;
				}
			},
			{
				key: "setCurrentFileId",
				value: function(e) {
					this.currentFileId = e;
				}
			},
			{
				key: "setChannel",
				value: function(e) {
					this.channel = e;
				}
			},
			{
				key: "setSplitSentenceOn",
				value: function(e) {
					this.splitSentenceOn = e;
				}
			},
			{
				key: "call",
				value: (a = e$13(l$3.mark((function r(o, a, c, u) {
					var y, N, E, C, R, k, A, w, _, x, H, K, U, F, D, G, X, M, W = this;
					return l$3.wrap((function(r) {
						for (;;) switch (r.prev = r.next) {
							case 0: y = n$1.initWorkerSchedule({ useFastSchedule: null == u ? void 0 : u.useFastSchedule }), N = y.addTask, E = y.stop, C = y.setDown, R = "httpHeader" in a ? a.httpHeader : void 0, this.stopRender = E, this.abortController = new AbortController(), k = !1, this.currentTraceId = "", A = function(e) {
								var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).forceCallback, n = void 0 !== t && t;
								(W.currentTraceId || n) && c({
									type: Z$1.ERROR,
									data: e
								});
							}, w = (u || {}).needSpaceId, _ = void 0 === w || w, x = (null == u ? void 0 : u.modelType) || _$4(), H = x === E$2.DEEPSEEK_V3_1_THINKING || x === E$2.HUNYUANT1, K = x === E$2.HUNYUANT1 ? E$2.HUNYUAN : x, U = (null == a ? void 0 : a.selectedPipelineTypes) || [], F = null == U ? void 0 : U.includes(g$1.THINKING), D = null == U ? void 0 : U.includes(g$1.NETWORK), G = h$3(), X = new e(), M = new e(), this.fetchEventSourceWithTimeout("".concat(o, "?xsrf=").concat(r$7()), {
								headers: omitBy(j$1(j$1({
									"X-AI-Scenario": this.scenario,
									"X-AI-Channel": this.channel,
									"X-AI-Model": G ? "" : K,
									"X-AI-Thinking": String(G ? F : H),
									"X-AI-Online": G ? String(D) : "",
									"X-AI-SPACE": _ ? this.getCurrentSpaceId() : ""
								}, this.currentFileId ? { "X-AI-File-Id": this.currentFileId } : {}), R || {}), (function(e, t) {
									return "X-AI-Scenario" === t && e === A$1.SOURCE_SPACE;
								})),
								method: "POST",
								body: JSON.stringify(j$1({}, omit(a, "httpHeader"))),
								timeout: 12e4,
								fetch: this.getFetchObject(),
								signal: this.abortController.signal,
								openWhenHidden: !0,
								onopen: function() {
									var e = e$13(l$3.mark((function e(t) {
										var r, o, i, a;
										return l$3.wrap((function(e) {
											for (;;) switch (e.prev = e.next) {
												case 0:
													if (W.currentTraceId = null === (r = t.headers) || void 0 === r || null === (o = r.get) || void 0 === o ? void 0 : o.call(r, "X-Trace-Id"), 501 !== t.status) {
														e.next = 4;
														break;
													}
													return A({
														code: _$2.SENSITIVE_BLOCK,
														message: ""
													}, { forceCallback: !0 }), e.abrupt("return");
												case 4:
													if (200 === t.status) {
														e.next = 7;
														break;
													}
													return k = !0, e.abrupt("return", Promise.reject());
												case 7:
													if ("application/json" !== t.headers.get("content-type")) {
														e.next = 25;
														break;
													}
													return k = !0, e.prev = 10, e.next = 13, t.clone().json();
												case 13:
													if (i = e.sent, a = P(i.code, i.message), i.code !== _$2.UNAUTHORIZED) {
														e.next = 18;
														break;
													}
													return c({
														type: Z$1.ERROR,
														data: {
															code: _$2.JSON_SSE_NO_AUTH,
															message: ""
														}
													}), e.abrupt("return");
												case 18:
													console.log("error", a), A(a), e.next = 25;
													break;
												case 22: return e.prev = 22, e.t0 = e.catch(10), e.abrupt("return", Promise.reject());
												case 25: return e.abrupt("return", Promise.resolve());
												case 26:
												case "end": return e.stop();
											}
										}), e, null, [[10, 22]]);
									})));
									return function(t) {
										return e.apply(this, arguments);
									};
								}(),
								onmessage: function(t) {
									var n, r = t.event, o = t.data, i = t$12(o) || {}, a = i.references, u = void 0 === a ? {} : a, l = i.content, s = void 0 === l ? {} : l, d = i.controlMessage, p = i.buttons, h = i.suggestedResponses, v = i.error, m = i.functionCall, y = i.describe, O = i.thinking, I = r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4({}, Z$1.CONTROL, (function() {
										return c({
											type: Z$1.CONTROL,
											data: d
										});
									})), Z$1.THINKING, (function() {
										return W.handleThinkEvent(X, O, (function(e) {
											return N({ cb: function() {
												c({
													type: Z$1.THINKING,
													data: e
												});
											} });
										}));
									})), Z$1.CONTENT, (function() {
										return W.handleContentEvent(X, (function(e) {
											return c({
												type: Z$1.THINKING,
												data: e
											});
										}), M, s, (function(e) {
											return N({ cb: function() {
												c({
													type: Z$1.CONTENT,
													data: e
												});
											} });
										}));
									})), Z$1.REFERENCES, (function() {
										return W.handleReferencesEvent(u, (function() {
											return c({
												type: Z$1.REFERENCES,
												data: u
											});
										}));
									})), Z$1.BUTTON, (function() {
										return N({ cb: function() {
											return c({
												type: Z$1.BUTTON,
												data: p
											});
										} });
									})), Z$1.SUGGESTION, (function() {
										return N({ cb: function() {
											return c({
												type: Z$1.SUGGESTION,
												data: h
											});
										} });
									})), Z$1.FUNCTION_CALL, (function() {
										return c({
											type: Z$1.FUNCTION_CALL,
											data: j$1(j$1({}, m), {}, { parameter: t$12(m.parameter) || {} })
										});
									})), Z$1.DESCRIPTION, (function() {
										(null != y && y.isFlowchartOutline || null != y && y.isMindOutline || null != y && y.editable) && (W.splitSentenceOn = !1), c({
											type: Z$1.DESCRIPTION,
											data: y || {}
										});
									})), Z$1.ERROR, (function() {
										var e;
										null === (e = W.stopRender) || void 0 === e || e.call(W), k = !0, A(P(null == v ? void 0 : v.code, null == v ? void 0 : v.message));
									}));
									return null === (n = I[r]) || void 0 === n ? void 0 : n.call(I);
								},
								onerror: function(e) {
									throw e;
								},
								ontimeout: function() {
									k = !0, A(P(_$2.TIMEOUT, "")), W.stop();
								},
								onclose: function() {
									C((function() {
										if (W.resetAbortController(), !k) {
											var e = M.getRemainSentence();
											e && (c({
												type: Z$1.CONTENT,
												data: {
													content: { text: e },
													status: i$6.IN_PROGRESS,
													type: M$2.TEXT_MARKDOWN
												}
											}), M.clearRemainSentence()), c({
												type: Z$1.DONE,
												data: null
											});
										}
									}));
								}
							}).catch((function() {
								k = !0, A(P(_$2.FAIL, ""));
							})), this.abortController.signal.addEventListener("abort", (function() {
								k || c({
									type: Z$1.STOP,
									data: null
								});
							}));
							case 19:
							case "end": return r.stop();
						}
					}), r, this);
				}))), function(e, t, n, r) {
					return a.apply(this, arguments);
				})
			},
			{
				key: "resetAbortController",
				value: function() {
					this.abortController = null;
				}
			},
			{
				key: "getCurrentSpaceId",
				value: function() {
					var e, t, n, r = null === (e = window) || void 0 === e || null === (e = e.basicClientVars) || void 0 === e ? void 0 : e.docInfo;
					return "application/vnd.tdocs-apps.wiki-space" === (null == r ? void 0 : r.mimeType) && "folder" === (null == r || null === (t = r.padInfo) || void 0 === t ? void 0 : t.padType) ? null == r || null === (n = r.padInfo) || void 0 === n ? void 0 : n.padId : void 0;
				}
			}
		]);
		var a;
	}();
	E$1 = _$1, _$1.stopRender = null, _$1.currentTraceId = null, _$1.abortController = null, _$1.splitSentenceOn = !0, _$1.stop = function() {
		var e, t;
		E$1.abortController && (E$1.abortController.abort(), null === (e = (t = E$1).stopRender) || void 0 === e || e.call(t), E$1.stopRender = null, E$1.resetAbortController());
	}, _$1.handleThinkEvent = function(e, t, n) {
		if ("content" in t) {
			var r = t.content, o = [];
			if (t$13(r) || n$11(r) || o$14(r)) o = [e.getRemainSentence(), r].filter(Boolean), e.clearRemainSentence();
			else e.add(r), o = e.getSentences();
			o.forEach((function(e) {
				return n({
					content: { text: e },
					thinkingCost: void 0,
					status: i$6.IN_THINKING,
					type: M$2.TEXT_MARKDOWN
				});
			}));
		} else {
			var i = t.thinkingCost;
			n({
				content: { text: "" },
				thinkingCost: i,
				status: i$6.IN_THINKING,
				type: M$2.TEXT_MARKDOWN
			});
		}
	}, _$1.handleContentEvent = function(e, t, n, r, o) {
		var i = e.getRemainSentence();
		if (i && (t({
			content: { text: i },
			thinkingCost: void 0,
			status: i$6.IN_THINKING,
			type: M$2.TEXT_MARKDOWN
		}), e.clearRemainSentence()), r.type === M$2.TEXT_MARKDOWN) {
			var l = r.content, s = (void 0 === l ? {} : l).text;
			if (!s) return;
			var d = [];
			if (t$13(s) || n$11(s) || o$14(s)) E$1.splitSentenceOn ? (d = [n.getRemainSentence(), s].filter(Boolean), n.clearRemainSentence()) : d = [s];
			else if (E$1.splitSentenceOn) n.add(s), d = n.getSentences();
			else d = function(e, t) {
				for (var n = [], r = 0; r < e.length;) n.push(e.substr(r, t)), r += t;
				return n;
			}(s, Math.max(Math.floor(s.length / 20), 3));
			d.forEach((function(e) {
				return o(j$1(j$1({}, r), {}, { content: { text: e } }));
			}));
		} else o(r);
	}, _$1.handleReferencesEvent = function(e, t) {
		console.log("references:", e), t();
	}, _$1.getFetchObject = function() {
		var e;
		return (null === (e = window.AI_SPACE) || void 0 === e ? void 0 : e.fetch) || window.fetch;
	}, _$1.fetchEventSourceWithTimeout = function(e, t) {
		var n = t.onopen, r = t.onerror, o = t.ontimeout, i = t.onclose, a = t.timeout, c = function(e, t) {
			if (null == e) return {};
			var n, r, o = function(e, t) {
				if (null == e) return {};
				var n = {};
				for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
					if (t.includes(r)) continue;
					n[r] = e[r];
				}
				return n;
			}(e, t);
			if (Object.getOwnPropertySymbols) {
				var i = Object.getOwnPropertySymbols(e);
				for (r = 0; r < i.length; r++) n = i[r], t.includes(n) || {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
			}
			return o;
		}(t, A), u = setTimeout(o, a);
		return fetchEventSource(e, j$1(j$1({}, c), {}, {
			onerror: function(e) {
				return clearTimeout(u), null == r ? void 0 : r(e);
			},
			onopen: function(e) {
				return clearTimeout(u), n(e);
			},
			onclose: function() {
				clearTimeout(u), i?.();
			}
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/message-sse/index.js
function m$1(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function E(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? m$1(Object(n), !0).forEach((function(t) {
			r$4(e, t, n[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m$1(Object(n)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		}));
	}
	return e;
}
var v$1;
var init_message_sse = __esmMin((() => {
	init_typeof_0dbfa870();
	init_index_a3cfc692();
	init_defineProperty_ba606e08();
	init_createClass_2e0257aa();
	init_esm$9();
	init_esm$12();
	init_sse();
	init_vip_service();
	init_dist$8();
	init_esm$10();
	init_esm$6();
	v$1 = function() {
		return n$10((function e() {
			var t = this;
			r$5(this, e), this.onMessage = function() {}, this.parentMessageId = "", this.handleControlEvent = function(e, n) {
				n.id = e.messageId, n.role = N$1.BOT, n.createTime = e.createTime, n.messageStatus = i$6.START, t.parentMessageId = e.parentMessageId, t.onMessage({
					id: n.id,
					message: n,
					conversationId: e.conversationId,
					parentMessageId: e.parentMessageId,
					groupId: e.groupId
				});
			}, this.handleThinkingEvent = function(e, n) {
				var r, s = e.type, o = void 0 === s ? M$2.TEXT_MARKDOWN : s, a = e.content, i = e.thinkingCost;
				n.contentType = o, n.messageStatus = i$6.IN_THINKING, n.extraContent = { modelThinking: {
					thinkingContent: t.getThinkingContent(n, a),
					thinkingDuration: i || (null === (r = n.extraContent) || void 0 === r || null === (r = r.modelThinking) || void 0 === r ? void 0 : r.thinkingDuration)
				} }, t.sendMessage(n);
			}, this.handleContentEvent = function(e, n) {
				var r = e.type, s = void 0 === r ? M$2.TEXT_MARKDOWN : r, o = e.content;
				n.contentType = s, n.messageStatus = i$6.IN_PROGRESS, n.parentMessageId = t.parentMessageId, n.content = t.getMessageContent(n, o), t.sendMessage(n);
			}, this.handleReferencesEvent = function(e, n) {
				n.messageStatus = i$6.IN_PROGRESS, n.references = e, t.sendMessage(n);
			}, this.handleButtonEvent = function(e, n) {
				n.buttons = e.items, t.sendMessage(n);
			}, this.handleSuggestionEvent = function(e, n) {
				n.suggestedReplies = e, t.sendMessage(n);
			}, this.handleFunctionCallEvent = function(e, n) {
				if (e.name) return n.functionCall = e, void t.sendMessage(n);
			}, this.handleDescriptionEvent = function(e, n) {
				n.description = E(E({}, n.description || {}), e || {}), t.sendMessage(n);
			}, this.handleDoneEvent = function(e) {
				e.messageStatus = i$6.FINISH, t.sendMessage(e);
			}, this.handleStopEvent = function(e) {
				t.isEmptyMessage(e.content) || (e.messageStatus = i$6.STOP, t.sendMessage(e));
			}, this.handleErrorEvent = function(e, n) {
				var r = e.code, s = e.message;
				r !== _$2.JSON_SSE_NO_AUTH ? (n.messageStatus = i$6.ERROR, n.error = {
					code: r,
					message: s
				}, t.sendMessage(n), t.handleCreateError(r)) : t.sendNoAuthMessage();
			}, this.sendNoAuthMessage = function() {
				t.onMessage({
					id: "error",
					message: {
						error: {
							code: E$3.NoAuth,
							message: ""
						},
						id: "error",
						messageStatus: i$6.ERROR
					}
				});
			};
		}), [
			{
				key: "fire",
				value: (v = e$13(l$3.mark((function e(t, s, o, a) {
					var i, c = this;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: this.onMessage = o, i = c$8(""), _$1.call(t, s, (function(e) {
								var t, n, s = (r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(r$4(t = {}, Z$1.CONTROL, (function() {
									return c.handleControlEvent(e.data, i);
								})), Z$1.THINKING, (function() {
									return c.handleThinkingEvent(e.data, i);
								})), Z$1.CONTENT, (function() {
									return c.handleContentEvent(e.data, i);
								})), Z$1.REFERENCES, (function() {
									return c.handleReferencesEvent(e.data, i);
								})), Z$1.BUTTON, (function() {
									return c.handleButtonEvent(e.data, i);
								})), Z$1.SUGGESTION, (function() {
									return c.handleSuggestionEvent(e.data, i);
								})), Z$1.FUNCTION_CALL, (function() {
									return c.handleFunctionCallEvent(e.data, i);
								})), Z$1.DONE, (function() {
									return c.handleDoneEvent(i);
								})), Z$1.STOP, (function() {
									return c.handleStopEvent(i);
								})), Z$1.ERROR, (function() {
									return c.handleErrorEvent(e.data, i);
								})), r$4(t, Z$1.DESCRIPTION, (function() {
									return c.handleDescriptionEvent(e.data, i);
								})));
								null === (n = s[e.type]) || void 0 === n || n.call(s);
							}), a);
							case 3:
							case "end": return e.stop();
						}
					}), e, this);
				}))), function(e, t, n, r) {
					return v.apply(this, arguments);
				})
			},
			{
				key: "isEmptyMessage",
				value: function(t) {
					return !t || "object" === o$12(t) && null !== t && "text" in t && 0 === t.text.trim().length;
				}
			},
			{
				key: "getThinkingContent",
				value: function(e, t) {
					if (e.contentType === M$2.TEXT_MARKDOWN) {
						var n, r = t;
						return ((null === (n = e.extraContent) || void 0 === n || null === (n = n.modelThinking) || void 0 === n ? void 0 : n.thinkingContent) || "") + r.text;
					}
					return t.text;
				}
			},
			{
				key: "getMessageContent",
				value: function(e, t) {
					if (e.contentType === M$2.TEXT_MARKDOWN) {
						var n = t;
						return { text: e.content.text + n.text };
					}
					return t;
				}
			},
			{
				key: "sendMessage",
				value: function(e, t, n, r) {
					this.onMessage({
						id: e.id,
						message: E({}, e),
						conversationId: t,
						parentMessageId: n,
						groupId: r
					});
				}
			},
			{
				key: "handleCreateError",
				value: (m = e$13(l$3.mark((function e(t) {
					var r, s;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								e.t0 = t, e.next = e.t0 === _$2.USER_STORAGE_OVERFLOW || e.t0 === _$2.OWNER_OVERFLOW || e.t0 === _$2.COLLABORATE_OVERFLOW ? 3 : e.t0 === _$2.AI_USE_LIMIT ? 9 : 11;
								break;
							case 3: return e.next = 5, O$1.getStorageOverflowExtension();
							case 5: return r = e.sent, s = t === _$2.USER_STORAGE_OVERFLOW ? _$2.OWNER_OVERFLOW : t, r.show({
								errorCode: s,
								skipAlertModal: !1,
								payComponentOptions: { disableMobilePaymentConfirmModal: !0 }
							}), e.abrupt("break", 12);
							case 9: return u$6.aiUseLimitError(), e.abrupt("break", 12);
							case 11: throw new Error("unhandled create error");
							case 12:
							case "end": return e.stop();
						}
					}), e);
				}))), function(e) {
					return m.apply(this, arguments);
				})
			}
		]);
		var m, v;
	}();
}));
var init_use_universal_search = __esmMin((() => {
	require_react();
	init_esm$12();
	init_dist$8();
	init_esm$10();
	init_esm$6();
}));
var init_universal_search = __esmMin((() => {
	init_use_group_conversation_history();
	init_use_groups();
	init_use_clear_groups();
	init_use_auto_scroll();
	init_use_mobile_auto_scroll();
	init_use_search_chat();
	init_file_path();
	init_use_universal_search();
	require_react();
	init_esm$12();
	init_dist();
	init_dist$8();
	init_esm$10();
	init_esm$6();
}));
//#endregion
//#region ../../node_modules/.pnpm/entities@3.0.1/node_modules/entities/lib/maps/entities.json
var entities_exports = /* @__PURE__ */ __exportAll({
	AElig: () => "Æ",
	AMP: () => "&",
	Aacute: () => "Á",
	Abreve: () => "Ă",
	Acirc: () => "Â",
	Acy: () => "А",
	Afr: () => Afr,
	Agrave: () => "À",
	Alpha: () => "Α",
	Amacr: () => "Ā",
	And: () => "⩓",
	Aogon: () => "Ą",
	Aopf: () => Aopf,
	ApplyFunction: () => "⁡",
	Aring: () => "Å",
	Ascr: () => Ascr,
	Assign: () => "≔",
	Atilde: () => "Ã",
	Auml: () => "Ä",
	Backslash: () => "∖",
	Barv: () => "⫧",
	Barwed: () => "⌆",
	Bcy: () => "Б",
	Because: () => "∵",
	Bernoullis: () => "ℬ",
	Beta: () => "Β",
	Bfr: () => Bfr,
	Bopf: () => Bopf,
	Breve: () => "˘",
	Bscr: () => "ℬ",
	Bumpeq: () => "≎",
	CHcy: () => "Ч",
	COPY: () => "©",
	Cacute: () => "Ć",
	Cap: () => "⋒",
	CapitalDifferentialD: () => "ⅅ",
	Cayleys: () => "ℭ",
	Ccaron: () => "Č",
	Ccedil: () => "Ç",
	Ccirc: () => "Ĉ",
	Cconint: () => "∰",
	Cdot: () => "Ċ",
	Cedilla: () => "¸",
	CenterDot: () => "·",
	Cfr: () => "ℭ",
	Chi: () => "Χ",
	CircleDot: () => "⊙",
	CircleMinus: () => "⊖",
	CirclePlus: () => "⊕",
	CircleTimes: () => "⊗",
	ClockwiseContourIntegral: () => "∲",
	CloseCurlyDoubleQuote: () => "”",
	CloseCurlyQuote: () => "’",
	Colon: () => "∷",
	Colone: () => "⩴",
	Congruent: () => "≡",
	Conint: () => "∯",
	ContourIntegral: () => "∮",
	Copf: () => "ℂ",
	Coproduct: () => "∐",
	CounterClockwiseContourIntegral: () => "∳",
	Cross: () => "⨯",
	Cscr: () => Cscr,
	Cup: () => "⋓",
	CupCap: () => "≍",
	DD: () => "ⅅ",
	DDotrahd: () => "⤑",
	DJcy: () => "Ђ",
	DScy: () => "Ѕ",
	DZcy: () => "Џ",
	Dagger: () => "‡",
	Darr: () => "↡",
	Dashv: () => "⫤",
	Dcaron: () => "Ď",
	Dcy: () => "Д",
	Del: () => "∇",
	Delta: () => "Δ",
	Dfr: () => Dfr,
	DiacriticalAcute: () => "´",
	DiacriticalDot: () => "˙",
	DiacriticalDoubleAcute: () => "˝",
	DiacriticalGrave: () => "`",
	DiacriticalTilde: () => "˜",
	Diamond: () => "⋄",
	DifferentialD: () => "ⅆ",
	Dopf: () => Dopf,
	Dot: () => "¨",
	DotDot: () => "⃜",
	DotEqual: () => "≐",
	DoubleContourIntegral: () => "∯",
	DoubleDot: () => "¨",
	DoubleDownArrow: () => "⇓",
	DoubleLeftArrow: () => "⇐",
	DoubleLeftRightArrow: () => "⇔",
	DoubleLeftTee: () => "⫤",
	DoubleLongLeftArrow: () => "⟸",
	DoubleLongLeftRightArrow: () => "⟺",
	DoubleLongRightArrow: () => "⟹",
	DoubleRightArrow: () => "⇒",
	DoubleRightTee: () => "⊨",
	DoubleUpArrow: () => "⇑",
	DoubleUpDownArrow: () => "⇕",
	DoubleVerticalBar: () => "∥",
	DownArrow: () => "↓",
	DownArrowBar: () => "⤓",
	DownArrowUpArrow: () => "⇵",
	DownBreve: () => "̑",
	DownLeftRightVector: () => "⥐",
	DownLeftTeeVector: () => "⥞",
	DownLeftVector: () => "↽",
	DownLeftVectorBar: () => "⥖",
	DownRightTeeVector: () => "⥟",
	DownRightVector: () => "⇁",
	DownRightVectorBar: () => "⥗",
	DownTee: () => "⊤",
	DownTeeArrow: () => "↧",
	Downarrow: () => "⇓",
	Dscr: () => Dscr,
	Dstrok: () => "Đ",
	ENG: () => "Ŋ",
	ETH: () => "Ð",
	Eacute: () => "É",
	Ecaron: () => "Ě",
	Ecirc: () => "Ê",
	Ecy: () => "Э",
	Edot: () => "Ė",
	Efr: () => Efr,
	Egrave: () => "È",
	Element: () => "∈",
	Emacr: () => "Ē",
	EmptySmallSquare: () => "◻",
	EmptyVerySmallSquare: () => "▫",
	Eogon: () => "Ę",
	Eopf: () => Eopf,
	Epsilon: () => "Ε",
	Equal: () => "⩵",
	EqualTilde: () => "≂",
	Equilibrium: () => "⇌",
	Escr: () => "ℰ",
	Esim: () => "⩳",
	Eta: () => "Η",
	Euml: () => "Ë",
	Exists: () => "∃",
	ExponentialE: () => "ⅇ",
	Fcy: () => "Ф",
	Ffr: () => Ffr,
	FilledSmallSquare: () => "◼",
	FilledVerySmallSquare: () => "▪",
	Fopf: () => Fopf,
	ForAll: () => "∀",
	Fouriertrf: () => "ℱ",
	Fscr: () => "ℱ",
	GJcy: () => "Ѓ",
	GT: () => ">",
	Gamma: () => "Γ",
	Gammad: () => "Ϝ",
	Gbreve: () => "Ğ",
	Gcedil: () => "Ģ",
	Gcirc: () => "Ĝ",
	Gcy: () => "Г",
	Gdot: () => "Ġ",
	Gfr: () => Gfr,
	Gg: () => "⋙",
	Gopf: () => Gopf,
	GreaterEqual: () => "≥",
	GreaterEqualLess: () => "⋛",
	GreaterFullEqual: () => "≧",
	GreaterGreater: () => "⪢",
	GreaterLess: () => "≷",
	GreaterSlantEqual: () => "⩾",
	GreaterTilde: () => "≳",
	Gscr: () => Gscr,
	Gt: () => "≫",
	HARDcy: () => "Ъ",
	Hacek: () => "ˇ",
	Hat: () => "^",
	Hcirc: () => "Ĥ",
	Hfr: () => "ℌ",
	HilbertSpace: () => "ℋ",
	Hopf: () => "ℍ",
	HorizontalLine: () => "─",
	Hscr: () => "ℋ",
	Hstrok: () => "Ħ",
	HumpDownHump: () => "≎",
	HumpEqual: () => "≏",
	IEcy: () => "Е",
	IJlig: () => "Ĳ",
	IOcy: () => "Ё",
	Iacute: () => "Í",
	Icirc: () => "Î",
	Icy: () => "И",
	Idot: () => "İ",
	Ifr: () => "ℑ",
	Igrave: () => "Ì",
	Im: () => "ℑ",
	Imacr: () => "Ī",
	ImaginaryI: () => "ⅈ",
	Implies: () => "⇒",
	Int: () => "∬",
	Integral: () => "∫",
	Intersection: () => "⋂",
	InvisibleComma: () => "⁣",
	InvisibleTimes: () => "⁢",
	Iogon: () => "Į",
	Iopf: () => Iopf,
	Iota: () => "Ι",
	Iscr: () => "ℐ",
	Itilde: () => "Ĩ",
	Iukcy: () => "І",
	Iuml: () => "Ï",
	Jcirc: () => "Ĵ",
	Jcy: () => "Й",
	Jfr: () => Jfr,
	Jopf: () => Jopf,
	Jscr: () => Jscr,
	Jsercy: () => "Ј",
	Jukcy: () => "Є",
	KHcy: () => "Х",
	KJcy: () => "Ќ",
	Kappa: () => "Κ",
	Kcedil: () => "Ķ",
	Kcy: () => "К",
	Kfr: () => Kfr,
	Kopf: () => Kopf,
	Kscr: () => Kscr,
	LJcy: () => "Љ",
	LT: () => "<",
	Lacute: () => "Ĺ",
	Lambda: () => "Λ",
	Lang: () => "⟪",
	Laplacetrf: () => "ℒ",
	Larr: () => "↞",
	Lcaron: () => "Ľ",
	Lcedil: () => "Ļ",
	Lcy: () => "Л",
	LeftAngleBracket: () => "⟨",
	LeftArrow: () => "←",
	LeftArrowBar: () => "⇤",
	LeftArrowRightArrow: () => "⇆",
	LeftCeiling: () => "⌈",
	LeftDoubleBracket: () => "⟦",
	LeftDownTeeVector: () => "⥡",
	LeftDownVector: () => "⇃",
	LeftDownVectorBar: () => "⥙",
	LeftFloor: () => "⌊",
	LeftRightArrow: () => "↔",
	LeftRightVector: () => "⥎",
	LeftTee: () => "⊣",
	LeftTeeArrow: () => "↤",
	LeftTeeVector: () => "⥚",
	LeftTriangle: () => "⊲",
	LeftTriangleBar: () => "⧏",
	LeftTriangleEqual: () => "⊴",
	LeftUpDownVector: () => "⥑",
	LeftUpTeeVector: () => "⥠",
	LeftUpVector: () => "↿",
	LeftUpVectorBar: () => "⥘",
	LeftVector: () => "↼",
	LeftVectorBar: () => "⥒",
	Leftarrow: () => "⇐",
	Leftrightarrow: () => "⇔",
	LessEqualGreater: () => "⋚",
	LessFullEqual: () => "≦",
	LessGreater: () => "≶",
	LessLess: () => "⪡",
	LessSlantEqual: () => "⩽",
	LessTilde: () => "≲",
	Lfr: () => Lfr,
	Ll: () => "⋘",
	Lleftarrow: () => "⇚",
	Lmidot: () => "Ŀ",
	LongLeftArrow: () => "⟵",
	LongLeftRightArrow: () => "⟷",
	LongRightArrow: () => "⟶",
	Longleftarrow: () => "⟸",
	Longleftrightarrow: () => "⟺",
	Longrightarrow: () => "⟹",
	Lopf: () => Lopf,
	LowerLeftArrow: () => "↙",
	LowerRightArrow: () => "↘",
	Lscr: () => "ℒ",
	Lsh: () => "↰",
	Lstrok: () => "Ł",
	Lt: () => "≪",
	Map: () => "⤅",
	Mcy: () => "М",
	MediumSpace: () => " ",
	Mellintrf: () => "ℳ",
	Mfr: () => Mfr,
	MinusPlus: () => "∓",
	Mopf: () => Mopf,
	Mscr: () => "ℳ",
	Mu: () => "Μ",
	NJcy: () => "Њ",
	Nacute: () => "Ń",
	Ncaron: () => "Ň",
	Ncedil: () => "Ņ",
	Ncy: () => "Н",
	NegativeMediumSpace: () => "​",
	NegativeThickSpace: () => "​",
	NegativeThinSpace: () => "​",
	NegativeVeryThinSpace: () => "​",
	NestedGreaterGreater: () => "≫",
	NestedLessLess: () => "≪",
	NewLine: () => "\n",
	Nfr: () => Nfr,
	NoBreak: () => "⁠",
	NonBreakingSpace: () => "\xA0",
	Nopf: () => "ℕ",
	Not: () => "⫬",
	NotCongruent: () => "≢",
	NotCupCap: () => "≭",
	NotDoubleVerticalBar: () => "∦",
	NotElement: () => "∉",
	NotEqual: () => "≠",
	NotEqualTilde: () => NotEqualTilde,
	NotExists: () => "∄",
	NotGreater: () => "≯",
	NotGreaterEqual: () => "≱",
	NotGreaterFullEqual: () => NotGreaterFullEqual,
	NotGreaterGreater: () => NotGreaterGreater,
	NotGreaterLess: () => "≹",
	NotGreaterSlantEqual: () => NotGreaterSlantEqual,
	NotGreaterTilde: () => "≵",
	NotHumpDownHump: () => NotHumpDownHump,
	NotHumpEqual: () => NotHumpEqual,
	NotLeftTriangle: () => "⋪",
	NotLeftTriangleBar: () => NotLeftTriangleBar,
	NotLeftTriangleEqual: () => "⋬",
	NotLess: () => "≮",
	NotLessEqual: () => "≰",
	NotLessGreater: () => "≸",
	NotLessLess: () => NotLessLess,
	NotLessSlantEqual: () => NotLessSlantEqual,
	NotLessTilde: () => "≴",
	NotNestedGreaterGreater: () => NotNestedGreaterGreater,
	NotNestedLessLess: () => NotNestedLessLess,
	NotPrecedes: () => "⊀",
	NotPrecedesEqual: () => NotPrecedesEqual,
	NotPrecedesSlantEqual: () => "⋠",
	NotReverseElement: () => "∌",
	NotRightTriangle: () => "⋫",
	NotRightTriangleBar: () => NotRightTriangleBar,
	NotRightTriangleEqual: () => "⋭",
	NotSquareSubset: () => NotSquareSubset,
	NotSquareSubsetEqual: () => "⋢",
	NotSquareSuperset: () => NotSquareSuperset,
	NotSquareSupersetEqual: () => "⋣",
	NotSubset: () => NotSubset,
	NotSubsetEqual: () => "⊈",
	NotSucceeds: () => "⊁",
	NotSucceedsEqual: () => NotSucceedsEqual,
	NotSucceedsSlantEqual: () => "⋡",
	NotSucceedsTilde: () => NotSucceedsTilde,
	NotSuperset: () => NotSuperset,
	NotSupersetEqual: () => "⊉",
	NotTilde: () => "≁",
	NotTildeEqual: () => "≄",
	NotTildeFullEqual: () => "≇",
	NotTildeTilde: () => "≉",
	NotVerticalBar: () => "∤",
	Nscr: () => Nscr,
	Ntilde: () => "Ñ",
	Nu: () => "Ν",
	OElig: () => "Œ",
	Oacute: () => "Ó",
	Ocirc: () => "Ô",
	Ocy: () => "О",
	Odblac: () => "Ő",
	Ofr: () => Ofr,
	Ograve: () => "Ò",
	Omacr: () => "Ō",
	Omega: () => "Ω",
	Omicron: () => "Ο",
	Oopf: () => Oopf,
	OpenCurlyDoubleQuote: () => "“",
	OpenCurlyQuote: () => "‘",
	Or: () => "⩔",
	Oscr: () => Oscr,
	Oslash: () => "Ø",
	Otilde: () => "Õ",
	Otimes: () => "⨷",
	Ouml: () => "Ö",
	OverBar: () => "‾",
	OverBrace: () => "⏞",
	OverBracket: () => "⎴",
	OverParenthesis: () => "⏜",
	PartialD: () => "∂",
	Pcy: () => "П",
	Pfr: () => Pfr,
	Phi: () => "Φ",
	Pi: () => "Π",
	PlusMinus: () => "±",
	Poincareplane: () => "ℌ",
	Popf: () => "ℙ",
	Pr: () => "⪻",
	Precedes: () => "≺",
	PrecedesEqual: () => "⪯",
	PrecedesSlantEqual: () => "≼",
	PrecedesTilde: () => "≾",
	Prime: () => "″",
	Product: () => "∏",
	Proportion: () => "∷",
	Proportional: () => "∝",
	Pscr: () => Pscr,
	Psi: () => "Ψ",
	QUOT: () => "\"",
	Qfr: () => Qfr,
	Qopf: () => "ℚ",
	Qscr: () => Qscr,
	RBarr: () => "⤐",
	REG: () => "®",
	Racute: () => "Ŕ",
	Rang: () => "⟫",
	Rarr: () => "↠",
	Rarrtl: () => "⤖",
	Rcaron: () => "Ř",
	Rcedil: () => "Ŗ",
	Rcy: () => "Р",
	Re: () => "ℜ",
	ReverseElement: () => "∋",
	ReverseEquilibrium: () => "⇋",
	ReverseUpEquilibrium: () => "⥯",
	Rfr: () => "ℜ",
	Rho: () => "Ρ",
	RightAngleBracket: () => "⟩",
	RightArrow: () => "→",
	RightArrowBar: () => "⇥",
	RightArrowLeftArrow: () => "⇄",
	RightCeiling: () => "⌉",
	RightDoubleBracket: () => "⟧",
	RightDownTeeVector: () => "⥝",
	RightDownVector: () => "⇂",
	RightDownVectorBar: () => "⥕",
	RightFloor: () => "⌋",
	RightTee: () => "⊢",
	RightTeeArrow: () => "↦",
	RightTeeVector: () => "⥛",
	RightTriangle: () => "⊳",
	RightTriangleBar: () => "⧐",
	RightTriangleEqual: () => "⊵",
	RightUpDownVector: () => "⥏",
	RightUpTeeVector: () => "⥜",
	RightUpVector: () => "↾",
	RightUpVectorBar: () => "⥔",
	RightVector: () => "⇀",
	RightVectorBar: () => "⥓",
	Rightarrow: () => "⇒",
	Ropf: () => "ℝ",
	RoundImplies: () => "⥰",
	Rrightarrow: () => "⇛",
	Rscr: () => "ℛ",
	Rsh: () => "↱",
	RuleDelayed: () => "⧴",
	SHCHcy: () => "Щ",
	SHcy: () => "Ш",
	SOFTcy: () => "Ь",
	Sacute: () => "Ś",
	Sc: () => "⪼",
	Scaron: () => "Š",
	Scedil: () => "Ş",
	Scirc: () => "Ŝ",
	Scy: () => "С",
	Sfr: () => Sfr,
	ShortDownArrow: () => "↓",
	ShortLeftArrow: () => "←",
	ShortRightArrow: () => "→",
	ShortUpArrow: () => "↑",
	Sigma: () => "Σ",
	SmallCircle: () => "∘",
	Sopf: () => Sopf,
	Sqrt: () => "√",
	Square: () => "□",
	SquareIntersection: () => "⊓",
	SquareSubset: () => "⊏",
	SquareSubsetEqual: () => "⊑",
	SquareSuperset: () => "⊐",
	SquareSupersetEqual: () => "⊒",
	SquareUnion: () => "⊔",
	Sscr: () => Sscr,
	Star: () => "⋆",
	Sub: () => "⋐",
	Subset: () => "⋐",
	SubsetEqual: () => "⊆",
	Succeeds: () => "≻",
	SucceedsEqual: () => "⪰",
	SucceedsSlantEqual: () => "≽",
	SucceedsTilde: () => "≿",
	SuchThat: () => "∋",
	Sum: () => "∑",
	Sup: () => "⋑",
	Superset: () => "⊃",
	SupersetEqual: () => "⊇",
	Supset: () => "⋑",
	THORN: () => "Þ",
	TRADE: () => "™",
	TSHcy: () => "Ћ",
	TScy: () => "Ц",
	Tab: () => "	",
	Tau: () => "Τ",
	Tcaron: () => "Ť",
	Tcedil: () => "Ţ",
	Tcy: () => "Т",
	Tfr: () => Tfr,
	Therefore: () => "∴",
	Theta: () => "Θ",
	ThickSpace: () => ThickSpace,
	ThinSpace: () => " ",
	Tilde: () => "∼",
	TildeEqual: () => "≃",
	TildeFullEqual: () => "≅",
	TildeTilde: () => "≈",
	Topf: () => Topf,
	TripleDot: () => "⃛",
	Tscr: () => Tscr,
	Tstrok: () => "Ŧ",
	Uacute: () => "Ú",
	Uarr: () => "↟",
	Uarrocir: () => "⥉",
	Ubrcy: () => "Ў",
	Ubreve: () => "Ŭ",
	Ucirc: () => "Û",
	Ucy: () => "У",
	Udblac: () => "Ű",
	Ufr: () => Ufr,
	Ugrave: () => "Ù",
	Umacr: () => "Ū",
	UnderBar: () => "_",
	UnderBrace: () => "⏟",
	UnderBracket: () => "⎵",
	UnderParenthesis: () => "⏝",
	Union: () => "⋃",
	UnionPlus: () => "⊎",
	Uogon: () => "Ų",
	Uopf: () => Uopf,
	UpArrow: () => "↑",
	UpArrowBar: () => "⤒",
	UpArrowDownArrow: () => "⇅",
	UpDownArrow: () => "↕",
	UpEquilibrium: () => "⥮",
	UpTee: () => "⊥",
	UpTeeArrow: () => "↥",
	Uparrow: () => "⇑",
	Updownarrow: () => "⇕",
	UpperLeftArrow: () => "↖",
	UpperRightArrow: () => "↗",
	Upsi: () => "ϒ",
	Upsilon: () => "Υ",
	Uring: () => "Ů",
	Uscr: () => Uscr,
	Utilde: () => "Ũ",
	Uuml: () => "Ü",
	VDash: () => "⊫",
	Vbar: () => "⫫",
	Vcy: () => "В",
	Vdash: () => "⊩",
	Vdashl: () => "⫦",
	Vee: () => "⋁",
	Verbar: () => "‖",
	Vert: () => "‖",
	VerticalBar: () => "∣",
	VerticalLine: () => "|",
	VerticalSeparator: () => "❘",
	VerticalTilde: () => "≀",
	VeryThinSpace: () => " ",
	Vfr: () => Vfr,
	Vopf: () => Vopf,
	Vscr: () => Vscr,
	Vvdash: () => "⊪",
	Wcirc: () => "Ŵ",
	Wedge: () => "⋀",
	Wfr: () => Wfr,
	Wopf: () => Wopf,
	Wscr: () => Wscr,
	Xfr: () => Xfr,
	Xi: () => "Ξ",
	Xopf: () => Xopf,
	Xscr: () => Xscr,
	YAcy: () => "Я",
	YIcy: () => "Ї",
	YUcy: () => "Ю",
	Yacute: () => "Ý",
	Ycirc: () => "Ŷ",
	Ycy: () => "Ы",
	Yfr: () => Yfr,
	Yopf: () => Yopf,
	Yscr: () => Yscr,
	Yuml: () => "Ÿ",
	ZHcy: () => "Ж",
	Zacute: () => "Ź",
	Zcaron: () => "Ž",
	Zcy: () => "З",
	Zdot: () => "Ż",
	ZeroWidthSpace: () => "​",
	Zeta: () => "Ζ",
	Zfr: () => "ℨ",
	Zopf: () => "ℤ",
	Zscr: () => Zscr,
	aacute: () => "á",
	abreve: () => "ă",
	ac: () => "∾",
	acE: () => acE,
	acd: () => "∿",
	acirc: () => "â",
	acute: () => "´",
	acy: () => "а",
	aelig: () => "æ",
	af: () => "⁡",
	afr: () => afr,
	agrave: () => "à",
	alefsym: () => "ℵ",
	aleph: () => "ℵ",
	alpha: () => "α",
	amacr: () => "ā",
	amalg: () => "⨿",
	amp: () => "&",
	and: () => "∧",
	andand: () => "⩕",
	andd: () => "⩜",
	andslope: () => "⩘",
	andv: () => "⩚",
	ang: () => "∠",
	ange: () => "⦤",
	angle: () => "∠",
	angmsd: () => "∡",
	angmsdaa: () => "⦨",
	angmsdab: () => "⦩",
	angmsdac: () => "⦪",
	angmsdad: () => "⦫",
	angmsdae: () => "⦬",
	angmsdaf: () => "⦭",
	angmsdag: () => "⦮",
	angmsdah: () => "⦯",
	angrt: () => "∟",
	angrtvb: () => "⊾",
	angrtvbd: () => "⦝",
	angsph: () => "∢",
	angst: () => "Å",
	angzarr: () => "⍼",
	aogon: () => "ą",
	aopf: () => aopf,
	ap: () => "≈",
	apE: () => "⩰",
	apacir: () => "⩯",
	ape: () => "≊",
	apid: () => "≋",
	apos: () => "'",
	approx: () => "≈",
	approxeq: () => "≊",
	aring: () => "å",
	ascr: () => ascr,
	ast: () => "*",
	asymp: () => "≈",
	asympeq: () => "≍",
	atilde: () => "ã",
	auml: () => "ä",
	awconint: () => "∳",
	awint: () => "⨑",
	bNot: () => "⫭",
	backcong: () => "≌",
	backepsilon: () => "϶",
	backprime: () => "‵",
	backsim: () => "∽",
	backsimeq: () => "⋍",
	barvee: () => "⊽",
	barwed: () => "⌅",
	barwedge: () => "⌅",
	bbrk: () => "⎵",
	bbrktbrk: () => "⎶",
	bcong: () => "≌",
	bcy: () => "б",
	bdquo: () => "„",
	becaus: () => "∵",
	because: () => "∵",
	bemptyv: () => "⦰",
	bepsi: () => "϶",
	bernou: () => "ℬ",
	beta: () => "β",
	beth: () => "ℶ",
	between: () => "≬",
	bfr: () => bfr,
	bigcap: () => "⋂",
	bigcirc: () => "◯",
	bigcup: () => "⋃",
	bigodot: () => "⨀",
	bigoplus: () => "⨁",
	bigotimes: () => "⨂",
	bigsqcup: () => "⨆",
	bigstar: () => "★",
	bigtriangledown: () => "▽",
	bigtriangleup: () => "△",
	biguplus: () => "⨄",
	bigvee: () => "⋁",
	bigwedge: () => "⋀",
	bkarow: () => "⤍",
	blacklozenge: () => "⧫",
	blacksquare: () => "▪",
	blacktriangle: () => "▴",
	blacktriangledown: () => "▾",
	blacktriangleleft: () => "◂",
	blacktriangleright: () => "▸",
	blank: () => "␣",
	blk12: () => "▒",
	blk14: () => "░",
	blk34: () => "▓",
	block: () => "█",
	bne: () => bne,
	bnequiv: () => bnequiv,
	bnot: () => "⌐",
	bopf: () => bopf,
	bot: () => "⊥",
	bottom: () => "⊥",
	bowtie: () => "⋈",
	boxDL: () => "╗",
	boxDR: () => "╔",
	boxDl: () => "╖",
	boxDr: () => "╓",
	boxH: () => "═",
	boxHD: () => "╦",
	boxHU: () => "╩",
	boxHd: () => "╤",
	boxHu: () => "╧",
	boxUL: () => "╝",
	boxUR: () => "╚",
	boxUl: () => "╜",
	boxUr: () => "╙",
	boxV: () => "║",
	boxVH: () => "╬",
	boxVL: () => "╣",
	boxVR: () => "╠",
	boxVh: () => "╫",
	boxVl: () => "╢",
	boxVr: () => "╟",
	boxbox: () => "⧉",
	boxdL: () => "╕",
	boxdR: () => "╒",
	boxdl: () => "┐",
	boxdr: () => "┌",
	boxh: () => "─",
	boxhD: () => "╥",
	boxhU: () => "╨",
	boxhd: () => "┬",
	boxhu: () => "┴",
	boxminus: () => "⊟",
	boxplus: () => "⊞",
	boxtimes: () => "⊠",
	boxuL: () => "╛",
	boxuR: () => "╘",
	boxul: () => "┘",
	boxur: () => "└",
	boxv: () => "│",
	boxvH: () => "╪",
	boxvL: () => "╡",
	boxvR: () => "╞",
	boxvh: () => "┼",
	boxvl: () => "┤",
	boxvr: () => "├",
	bprime: () => "‵",
	breve: () => "˘",
	brvbar: () => "¦",
	bscr: () => bscr,
	bsemi: () => "⁏",
	bsim: () => "∽",
	bsime: () => "⋍",
	bsol: () => "\\",
	bsolb: () => "⧅",
	bsolhsub: () => "⟈",
	bull: () => "•",
	bullet: () => "•",
	bump: () => "≎",
	bumpE: () => "⪮",
	bumpe: () => "≏",
	bumpeq: () => "≏",
	cacute: () => "ć",
	cap: () => "∩",
	capand: () => "⩄",
	capbrcup: () => "⩉",
	capcap: () => "⩋",
	capcup: () => "⩇",
	capdot: () => "⩀",
	caps: () => caps,
	caret: () => "⁁",
	caron: () => "ˇ",
	ccaps: () => "⩍",
	ccaron: () => "č",
	ccedil: () => "ç",
	ccirc: () => "ĉ",
	ccups: () => "⩌",
	ccupssm: () => "⩐",
	cdot: () => "ċ",
	cedil: () => "¸",
	cemptyv: () => "⦲",
	cent: () => "¢",
	centerdot: () => "·",
	cfr: () => cfr,
	chcy: () => "ч",
	check: () => "✓",
	checkmark: () => "✓",
	chi: () => "χ",
	cir: () => "○",
	cirE: () => "⧃",
	circ: () => "ˆ",
	circeq: () => "≗",
	circlearrowleft: () => "↺",
	circlearrowright: () => "↻",
	circledR: () => "®",
	circledS: () => "Ⓢ",
	circledast: () => "⊛",
	circledcirc: () => "⊚",
	circleddash: () => "⊝",
	cire: () => "≗",
	cirfnint: () => "⨐",
	cirmid: () => "⫯",
	cirscir: () => "⧂",
	clubs: () => "♣",
	clubsuit: () => "♣",
	colon: () => ":",
	colone: () => "≔",
	coloneq: () => "≔",
	comma: () => ",",
	commat: () => "@",
	comp: () => "∁",
	compfn: () => "∘",
	complement: () => "∁",
	complexes: () => "ℂ",
	cong: () => "≅",
	congdot: () => "⩭",
	conint: () => "∮",
	copf: () => copf,
	coprod: () => "∐",
	copy: () => "©",
	copysr: () => "℗",
	crarr: () => "↵",
	cross: () => "✗",
	cscr: () => cscr,
	csub: () => "⫏",
	csube: () => "⫑",
	csup: () => "⫐",
	csupe: () => "⫒",
	ctdot: () => "⋯",
	cudarrl: () => "⤸",
	cudarrr: () => "⤵",
	cuepr: () => "⋞",
	cuesc: () => "⋟",
	cularr: () => "↶",
	cularrp: () => "⤽",
	cup: () => "∪",
	cupbrcap: () => "⩈",
	cupcap: () => "⩆",
	cupcup: () => "⩊",
	cupdot: () => "⊍",
	cupor: () => "⩅",
	cups: () => cups,
	curarr: () => "↷",
	curarrm: () => "⤼",
	curlyeqprec: () => "⋞",
	curlyeqsucc: () => "⋟",
	curlyvee: () => "⋎",
	curlywedge: () => "⋏",
	curren: () => "¤",
	curvearrowleft: () => "↶",
	curvearrowright: () => "↷",
	cuvee: () => "⋎",
	cuwed: () => "⋏",
	cwconint: () => "∲",
	cwint: () => "∱",
	cylcty: () => "⌭",
	dArr: () => "⇓",
	dHar: () => "⥥",
	dagger: () => "†",
	daleth: () => "ℸ",
	darr: () => "↓",
	dash: () => "‐",
	dashv: () => "⊣",
	dbkarow: () => "⤏",
	dblac: () => "˝",
	dcaron: () => "ď",
	dcy: () => "д",
	dd: () => "ⅆ",
	ddagger: () => "‡",
	ddarr: () => "⇊",
	ddotseq: () => "⩷",
	default: () => entities_default,
	deg: () => "°",
	delta: () => "δ",
	demptyv: () => "⦱",
	dfisht: () => "⥿",
	dfr: () => dfr,
	dharl: () => "⇃",
	dharr: () => "⇂",
	diam: () => "⋄",
	diamond: () => "⋄",
	diamondsuit: () => "♦",
	diams: () => "♦",
	die: () => "¨",
	digamma: () => "ϝ",
	disin: () => "⋲",
	div: () => "÷",
	divide: () => "÷",
	divideontimes: () => "⋇",
	divonx: () => "⋇",
	djcy: () => "ђ",
	dlcorn: () => "⌞",
	dlcrop: () => "⌍",
	dollar: () => "$",
	dopf: () => dopf,
	dot: () => "˙",
	doteq: () => "≐",
	doteqdot: () => "≑",
	dotminus: () => "∸",
	dotplus: () => "∔",
	dotsquare: () => "⊡",
	doublebarwedge: () => "⌆",
	downarrow: () => "↓",
	downdownarrows: () => "⇊",
	downharpoonleft: () => "⇃",
	downharpoonright: () => "⇂",
	drbkarow: () => "⤐",
	drcorn: () => "⌟",
	drcrop: () => "⌌",
	dscr: () => dscr,
	dscy: () => "ѕ",
	dsol: () => "⧶",
	dstrok: () => "đ",
	dtdot: () => "⋱",
	dtri: () => "▿",
	dtrif: () => "▾",
	duarr: () => "⇵",
	duhar: () => "⥯",
	dwangle: () => "⦦",
	dzcy: () => "џ",
	dzigrarr: () => "⟿",
	eDDot: () => "⩷",
	eDot: () => "≑",
	eacute: () => "é",
	easter: () => "⩮",
	ecaron: () => "ě",
	ecir: () => "≖",
	ecirc: () => "ê",
	ecolon: () => "≕",
	ecy: () => "э",
	edot: () => "ė",
	ee: () => "ⅇ",
	efDot: () => "≒",
	efr: () => efr,
	eg: () => "⪚",
	egrave: () => "è",
	egs: () => "⪖",
	egsdot: () => "⪘",
	el: () => "⪙",
	elinters: () => "⏧",
	ell: () => "ℓ",
	els: () => "⪕",
	elsdot: () => "⪗",
	emacr: () => "ē",
	empty: () => "∅",
	emptyset: () => "∅",
	emptyv: () => "∅",
	emsp: () => " ",
	emsp13: () => " ",
	emsp14: () => " ",
	eng: () => "ŋ",
	ensp: () => " ",
	eogon: () => "ę",
	eopf: () => eopf,
	epar: () => "⋕",
	eparsl: () => "⧣",
	eplus: () => "⩱",
	epsi: () => "ε",
	epsilon: () => "ε",
	epsiv: () => "ϵ",
	eqcirc: () => "≖",
	eqcolon: () => "≕",
	eqsim: () => "≂",
	eqslantgtr: () => "⪖",
	eqslantless: () => "⪕",
	equals: () => "=",
	equest: () => "≟",
	equiv: () => "≡",
	equivDD: () => "⩸",
	eqvparsl: () => "⧥",
	erDot: () => "≓",
	erarr: () => "⥱",
	escr: () => "ℯ",
	esdot: () => "≐",
	esim: () => "≂",
	eta: () => "η",
	eth: () => "ð",
	euml: () => "ë",
	euro: () => "€",
	excl: () => "!",
	exist: () => "∃",
	expectation: () => "ℰ",
	exponentiale: () => "ⅇ",
	fallingdotseq: () => "≒",
	fcy: () => "ф",
	female: () => "♀",
	ffilig: () => "ﬃ",
	fflig: () => "ﬀ",
	ffllig: () => "ﬄ",
	ffr: () => ffr,
	filig: () => "ﬁ",
	fjlig: () => "fj",
	flat: () => "♭",
	fllig: () => "ﬂ",
	fltns: () => "▱",
	fnof: () => "ƒ",
	fopf: () => fopf,
	forall: () => "∀",
	fork: () => "⋔",
	forkv: () => "⫙",
	fpartint: () => "⨍",
	frac12: () => "½",
	frac13: () => "⅓",
	frac14: () => "¼",
	frac15: () => "⅕",
	frac16: () => "⅙",
	frac18: () => "⅛",
	frac23: () => "⅔",
	frac25: () => "⅖",
	frac34: () => "¾",
	frac35: () => "⅗",
	frac38: () => "⅜",
	frac45: () => "⅘",
	frac56: () => "⅚",
	frac58: () => "⅝",
	frac78: () => "⅞",
	frasl: () => "⁄",
	frown: () => "⌢",
	fscr: () => fscr,
	gE: () => "≧",
	gEl: () => "⪌",
	gacute: () => "ǵ",
	gamma: () => "γ",
	gammad: () => "ϝ",
	gap: () => "⪆",
	gbreve: () => "ğ",
	gcirc: () => "ĝ",
	gcy: () => "г",
	gdot: () => "ġ",
	ge: () => "≥",
	gel: () => "⋛",
	geq: () => "≥",
	geqq: () => "≧",
	geqslant: () => "⩾",
	ges: () => "⩾",
	gescc: () => "⪩",
	gesdot: () => "⪀",
	gesdoto: () => "⪂",
	gesdotol: () => "⪄",
	gesl: () => gesl,
	gesles: () => "⪔",
	gfr: () => gfr,
	gg: () => "≫",
	ggg: () => "⋙",
	gimel: () => "ℷ",
	gjcy: () => "ѓ",
	gl: () => "≷",
	glE: () => "⪒",
	gla: () => "⪥",
	glj: () => "⪤",
	gnE: () => "≩",
	gnap: () => "⪊",
	gnapprox: () => "⪊",
	gne: () => "⪈",
	gneq: () => "⪈",
	gneqq: () => "≩",
	gnsim: () => "⋧",
	gopf: () => gopf,
	grave: () => "`",
	gscr: () => "ℊ",
	gsim: () => "≳",
	gsime: () => "⪎",
	gsiml: () => "⪐",
	gt: () => ">",
	gtcc: () => "⪧",
	gtcir: () => "⩺",
	gtdot: () => "⋗",
	gtlPar: () => "⦕",
	gtquest: () => "⩼",
	gtrapprox: () => "⪆",
	gtrarr: () => "⥸",
	gtrdot: () => "⋗",
	gtreqless: () => "⋛",
	gtreqqless: () => "⪌",
	gtrless: () => "≷",
	gtrsim: () => "≳",
	gvertneqq: () => gvertneqq,
	gvnE: () => gvnE,
	hArr: () => "⇔",
	hairsp: () => " ",
	half: () => "½",
	hamilt: () => "ℋ",
	hardcy: () => "ъ",
	harr: () => "↔",
	harrcir: () => "⥈",
	harrw: () => "↭",
	hbar: () => "ℏ",
	hcirc: () => "ĥ",
	hearts: () => "♥",
	heartsuit: () => "♥",
	hellip: () => "…",
	hercon: () => "⊹",
	hfr: () => hfr,
	hksearow: () => "⤥",
	hkswarow: () => "⤦",
	hoarr: () => "⇿",
	homtht: () => "∻",
	hookleftarrow: () => "↩",
	hookrightarrow: () => "↪",
	hopf: () => hopf,
	horbar: () => "―",
	hscr: () => hscr,
	hslash: () => "ℏ",
	hstrok: () => "ħ",
	hybull: () => "⁃",
	hyphen: () => "‐",
	iacute: () => "í",
	ic: () => "⁣",
	icirc: () => "î",
	icy: () => "и",
	iecy: () => "е",
	iexcl: () => "¡",
	iff: () => "⇔",
	ifr: () => ifr,
	igrave: () => "ì",
	ii: () => "ⅈ",
	iiiint: () => "⨌",
	iiint: () => "∭",
	iinfin: () => "⧜",
	iiota: () => "℩",
	ijlig: () => "ĳ",
	imacr: () => "ī",
	image: () => "ℑ",
	imagline: () => "ℐ",
	imagpart: () => "ℑ",
	imath: () => "ı",
	imof: () => "⊷",
	imped: () => "Ƶ",
	incare: () => "℅",
	infin: () => "∞",
	infintie: () => "⧝",
	inodot: () => "ı",
	int: () => "∫",
	intcal: () => "⊺",
	integers: () => "ℤ",
	intercal: () => "⊺",
	intlarhk: () => "⨗",
	intprod: () => "⨼",
	iocy: () => "ё",
	iogon: () => "į",
	iopf: () => iopf,
	iota: () => "ι",
	iprod: () => "⨼",
	iquest: () => "¿",
	iscr: () => iscr,
	isin: () => "∈",
	isinE: () => "⋹",
	isindot: () => "⋵",
	isins: () => "⋴",
	isinsv: () => "⋳",
	isinv: () => "∈",
	it: () => "⁢",
	itilde: () => "ĩ",
	iukcy: () => "і",
	iuml: () => "ï",
	jcirc: () => "ĵ",
	jcy: () => "й",
	jfr: () => jfr,
	jmath: () => "ȷ",
	jopf: () => jopf,
	jscr: () => jscr,
	jsercy: () => "ј",
	jukcy: () => "є",
	kappa: () => "κ",
	kappav: () => "ϰ",
	kcedil: () => "ķ",
	kcy: () => "к",
	kfr: () => kfr,
	kgreen: () => "ĸ",
	khcy: () => "х",
	kjcy: () => "ќ",
	kopf: () => kopf,
	kscr: () => kscr,
	lAarr: () => "⇚",
	lArr: () => "⇐",
	lAtail: () => "⤛",
	lBarr: () => "⤎",
	lE: () => "≦",
	lEg: () => "⪋",
	lHar: () => "⥢",
	lacute: () => "ĺ",
	laemptyv: () => "⦴",
	lagran: () => "ℒ",
	lambda: () => "λ",
	lang: () => "⟨",
	langd: () => "⦑",
	langle: () => "⟨",
	lap: () => "⪅",
	laquo: () => "«",
	larr: () => "←",
	larrb: () => "⇤",
	larrbfs: () => "⤟",
	larrfs: () => "⤝",
	larrhk: () => "↩",
	larrlp: () => "↫",
	larrpl: () => "⤹",
	larrsim: () => "⥳",
	larrtl: () => "↢",
	lat: () => "⪫",
	latail: () => "⤙",
	late: () => "⪭",
	lates: () => lates,
	lbarr: () => "⤌",
	lbbrk: () => "❲",
	lbrace: () => "{",
	lbrack: () => "[",
	lbrke: () => "⦋",
	lbrksld: () => "⦏",
	lbrkslu: () => "⦍",
	lcaron: () => "ľ",
	lcedil: () => "ļ",
	lceil: () => "⌈",
	lcub: () => "{",
	lcy: () => "л",
	ldca: () => "⤶",
	ldquo: () => "“",
	ldquor: () => "„",
	ldrdhar: () => "⥧",
	ldrushar: () => "⥋",
	ldsh: () => "↲",
	le: () => "≤",
	leftarrow: () => "←",
	leftarrowtail: () => "↢",
	leftharpoondown: () => "↽",
	leftharpoonup: () => "↼",
	leftleftarrows: () => "⇇",
	leftrightarrow: () => "↔",
	leftrightarrows: () => "⇆",
	leftrightharpoons: () => "⇋",
	leftrightsquigarrow: () => "↭",
	leftthreetimes: () => "⋋",
	leg: () => "⋚",
	leq: () => "≤",
	leqq: () => "≦",
	leqslant: () => "⩽",
	les: () => "⩽",
	lescc: () => "⪨",
	lesdot: () => "⩿",
	lesdoto: () => "⪁",
	lesdotor: () => "⪃",
	lesg: () => lesg,
	lesges: () => "⪓",
	lessapprox: () => "⪅",
	lessdot: () => "⋖",
	lesseqgtr: () => "⋚",
	lesseqqgtr: () => "⪋",
	lessgtr: () => "≶",
	lesssim: () => "≲",
	lfisht: () => "⥼",
	lfloor: () => "⌊",
	lfr: () => lfr,
	lg: () => "≶",
	lgE: () => "⪑",
	lhard: () => "↽",
	lharu: () => "↼",
	lharul: () => "⥪",
	lhblk: () => "▄",
	ljcy: () => "љ",
	ll: () => "≪",
	llarr: () => "⇇",
	llcorner: () => "⌞",
	llhard: () => "⥫",
	lltri: () => "◺",
	lmidot: () => "ŀ",
	lmoust: () => "⎰",
	lmoustache: () => "⎰",
	lnE: () => "≨",
	lnap: () => "⪉",
	lnapprox: () => "⪉",
	lne: () => "⪇",
	lneq: () => "⪇",
	lneqq: () => "≨",
	lnsim: () => "⋦",
	loang: () => "⟬",
	loarr: () => "⇽",
	lobrk: () => "⟦",
	longleftarrow: () => "⟵",
	longleftrightarrow: () => "⟷",
	longmapsto: () => "⟼",
	longrightarrow: () => "⟶",
	looparrowleft: () => "↫",
	looparrowright: () => "↬",
	lopar: () => "⦅",
	lopf: () => lopf,
	loplus: () => "⨭",
	lotimes: () => "⨴",
	lowast: () => "∗",
	lowbar: () => "_",
	loz: () => "◊",
	lozenge: () => "◊",
	lozf: () => "⧫",
	lpar: () => "(",
	lparlt: () => "⦓",
	lrarr: () => "⇆",
	lrcorner: () => "⌟",
	lrhar: () => "⇋",
	lrhard: () => "⥭",
	lrm: () => "‎",
	lrtri: () => "⊿",
	lsaquo: () => "‹",
	lscr: () => lscr,
	lsh: () => "↰",
	lsim: () => "≲",
	lsime: () => "⪍",
	lsimg: () => "⪏",
	lsqb: () => "[",
	lsquo: () => "‘",
	lsquor: () => "‚",
	lstrok: () => "ł",
	lt: () => "<",
	ltcc: () => "⪦",
	ltcir: () => "⩹",
	ltdot: () => "⋖",
	lthree: () => "⋋",
	ltimes: () => "⋉",
	ltlarr: () => "⥶",
	ltquest: () => "⩻",
	ltrPar: () => "⦖",
	ltri: () => "◃",
	ltrie: () => "⊴",
	ltrif: () => "◂",
	lurdshar: () => "⥊",
	luruhar: () => "⥦",
	lvertneqq: () => lvertneqq,
	lvnE: () => lvnE,
	mDDot: () => "∺",
	macr: () => "¯",
	male: () => "♂",
	malt: () => "✠",
	maltese: () => "✠",
	map: () => "↦",
	mapsto: () => "↦",
	mapstodown: () => "↧",
	mapstoleft: () => "↤",
	mapstoup: () => "↥",
	marker: () => "▮",
	mcomma: () => "⨩",
	mcy: () => "м",
	mdash: () => "—",
	measuredangle: () => "∡",
	mfr: () => mfr,
	mho: () => "℧",
	micro: () => "µ",
	mid: () => "∣",
	midast: () => "*",
	midcir: () => "⫰",
	middot: () => "·",
	minus: () => "−",
	minusb: () => "⊟",
	minusd: () => "∸",
	minusdu: () => "⨪",
	mlcp: () => "⫛",
	mldr: () => "…",
	mnplus: () => "∓",
	models: () => "⊧",
	mopf: () => mopf,
	mp: () => "∓",
	mscr: () => mscr,
	mstpos: () => "∾",
	mu: () => "μ",
	multimap: () => "⊸",
	mumap: () => "⊸",
	nGg: () => nGg,
	nGt: () => nGt,
	nGtv: () => nGtv,
	nLeftarrow: () => "⇍",
	nLeftrightarrow: () => "⇎",
	nLl: () => nLl,
	nLt: () => nLt,
	nLtv: () => nLtv,
	nRightarrow: () => "⇏",
	nVDash: () => "⊯",
	nVdash: () => "⊮",
	nabla: () => "∇",
	nacute: () => "ń",
	nang: () => nang,
	nap: () => "≉",
	napE: () => napE,
	napid: () => napid,
	napos: () => "ŉ",
	napprox: () => "≉",
	natur: () => "♮",
	natural: () => "♮",
	naturals: () => "ℕ",
	nbsp: () => "\xA0",
	nbump: () => nbump,
	nbumpe: () => nbumpe,
	ncap: () => "⩃",
	ncaron: () => "ň",
	ncedil: () => "ņ",
	ncong: () => "≇",
	ncongdot: () => ncongdot,
	ncup: () => "⩂",
	ncy: () => "н",
	ndash: () => "–",
	ne: () => "≠",
	neArr: () => "⇗",
	nearhk: () => "⤤",
	nearr: () => "↗",
	nearrow: () => "↗",
	nedot: () => nedot,
	nequiv: () => "≢",
	nesear: () => "⤨",
	nesim: () => nesim,
	nexist: () => "∄",
	nexists: () => "∄",
	nfr: () => nfr,
	ngE: () => ngE,
	nge: () => "≱",
	ngeq: () => "≱",
	ngeqq: () => ngeqq,
	ngeqslant: () => ngeqslant,
	nges: () => nges,
	ngsim: () => "≵",
	ngt: () => "≯",
	ngtr: () => "≯",
	nhArr: () => "⇎",
	nharr: () => "↮",
	nhpar: () => "⫲",
	ni: () => "∋",
	nis: () => "⋼",
	nisd: () => "⋺",
	niv: () => "∋",
	njcy: () => "њ",
	nlArr: () => "⇍",
	nlE: () => nlE,
	nlarr: () => "↚",
	nldr: () => "‥",
	nle: () => "≰",
	nleftarrow: () => "↚",
	nleftrightarrow: () => "↮",
	nleq: () => "≰",
	nleqq: () => nleqq,
	nleqslant: () => nleqslant,
	nles: () => nles,
	nless: () => "≮",
	nlsim: () => "≴",
	nlt: () => "≮",
	nltri: () => "⋪",
	nltrie: () => "⋬",
	nmid: () => "∤",
	nopf: () => nopf,
	not: () => "¬",
	notin: () => "∉",
	notinE: () => notinE,
	notindot: () => notindot,
	notinva: () => "∉",
	notinvb: () => "⋷",
	notinvc: () => "⋶",
	notni: () => "∌",
	notniva: () => "∌",
	notnivb: () => "⋾",
	notnivc: () => "⋽",
	npar: () => "∦",
	nparallel: () => "∦",
	nparsl: () => nparsl,
	npart: () => npart,
	npolint: () => "⨔",
	npr: () => "⊀",
	nprcue: () => "⋠",
	npre: () => npre,
	nprec: () => "⊀",
	npreceq: () => npreceq,
	nrArr: () => "⇏",
	nrarr: () => "↛",
	nrarrc: () => nrarrc,
	nrarrw: () => nrarrw,
	nrightarrow: () => "↛",
	nrtri: () => "⋫",
	nrtrie: () => "⋭",
	nsc: () => "⊁",
	nsccue: () => "⋡",
	nsce: () => nsce,
	nscr: () => nscr,
	nshortmid: () => "∤",
	nshortparallel: () => "∦",
	nsim: () => "≁",
	nsime: () => "≄",
	nsimeq: () => "≄",
	nsmid: () => "∤",
	nspar: () => "∦",
	nsqsube: () => "⋢",
	nsqsupe: () => "⋣",
	nsub: () => "⊄",
	nsubE: () => nsubE,
	nsube: () => "⊈",
	nsubset: () => nsubset,
	nsubseteq: () => "⊈",
	nsubseteqq: () => nsubseteqq,
	nsucc: () => "⊁",
	nsucceq: () => nsucceq,
	nsup: () => "⊅",
	nsupE: () => nsupE,
	nsupe: () => "⊉",
	nsupset: () => nsupset,
	nsupseteq: () => "⊉",
	nsupseteqq: () => nsupseteqq,
	ntgl: () => "≹",
	ntilde: () => "ñ",
	ntlg: () => "≸",
	ntriangleleft: () => "⋪",
	ntrianglelefteq: () => "⋬",
	ntriangleright: () => "⋫",
	ntrianglerighteq: () => "⋭",
	nu: () => "ν",
	num: () => "#",
	numero: () => "№",
	numsp: () => " ",
	nvDash: () => "⊭",
	nvHarr: () => "⤄",
	nvap: () => nvap,
	nvdash: () => "⊬",
	nvge: () => nvge,
	nvgt: () => nvgt,
	nvinfin: () => "⧞",
	nvlArr: () => "⤂",
	nvle: () => nvle,
	nvlt: () => nvlt,
	nvltrie: () => nvltrie,
	nvrArr: () => "⤃",
	nvrtrie: () => nvrtrie,
	nvsim: () => nvsim,
	nwArr: () => "⇖",
	nwarhk: () => "⤣",
	nwarr: () => "↖",
	nwarrow: () => "↖",
	nwnear: () => "⤧",
	oS: () => "Ⓢ",
	oacute: () => "ó",
	oast: () => "⊛",
	ocir: () => "⊚",
	ocirc: () => "ô",
	ocy: () => "о",
	odash: () => "⊝",
	odblac: () => "ő",
	odiv: () => "⨸",
	odot: () => "⊙",
	odsold: () => "⦼",
	oelig: () => "œ",
	ofcir: () => "⦿",
	ofr: () => ofr,
	ogon: () => "˛",
	ograve: () => "ò",
	ogt: () => "⧁",
	ohbar: () => "⦵",
	ohm: () => "Ω",
	oint: () => "∮",
	olarr: () => "↺",
	olcir: () => "⦾",
	olcross: () => "⦻",
	oline: () => "‾",
	olt: () => "⧀",
	omacr: () => "ō",
	omega: () => "ω",
	omicron: () => "ο",
	omid: () => "⦶",
	ominus: () => "⊖",
	oopf: () => oopf,
	opar: () => "⦷",
	operp: () => "⦹",
	oplus: () => "⊕",
	or: () => "∨",
	orarr: () => "↻",
	ord: () => "⩝",
	order: () => "ℴ",
	orderof: () => "ℴ",
	ordf: () => "ª",
	ordm: () => "º",
	origof: () => "⊶",
	oror: () => "⩖",
	orslope: () => "⩗",
	orv: () => "⩛",
	oscr: () => "ℴ",
	oslash: () => "ø",
	osol: () => "⊘",
	otilde: () => "õ",
	otimes: () => "⊗",
	otimesas: () => "⨶",
	ouml: () => "ö",
	ovbar: () => "⌽",
	par: () => "∥",
	para: () => "¶",
	parallel: () => "∥",
	parsim: () => "⫳",
	parsl: () => "⫽",
	part: () => "∂",
	pcy: () => "п",
	percnt: () => "%",
	period: () => ".",
	permil: () => "‰",
	perp: () => "⊥",
	pertenk: () => "‱",
	pfr: () => pfr,
	phi: () => "φ",
	phiv: () => "ϕ",
	phmmat: () => "ℳ",
	phone: () => "☎",
	pi: () => "π",
	pitchfork: () => "⋔",
	piv: () => "ϖ",
	planck: () => "ℏ",
	planckh: () => "ℎ",
	plankv: () => "ℏ",
	plus: () => "+",
	plusacir: () => "⨣",
	plusb: () => "⊞",
	pluscir: () => "⨢",
	plusdo: () => "∔",
	plusdu: () => "⨥",
	pluse: () => "⩲",
	plusmn: () => "±",
	plussim: () => "⨦",
	plustwo: () => "⨧",
	pm: () => "±",
	pointint: () => "⨕",
	popf: () => popf,
	pound: () => "£",
	pr: () => "≺",
	prE: () => "⪳",
	prap: () => "⪷",
	prcue: () => "≼",
	pre: () => "⪯",
	prec: () => "≺",
	precapprox: () => "⪷",
	preccurlyeq: () => "≼",
	preceq: () => "⪯",
	precnapprox: () => "⪹",
	precneqq: () => "⪵",
	precnsim: () => "⋨",
	precsim: () => "≾",
	prime: () => "′",
	primes: () => "ℙ",
	prnE: () => "⪵",
	prnap: () => "⪹",
	prnsim: () => "⋨",
	prod: () => "∏",
	profalar: () => "⌮",
	profline: () => "⌒",
	profsurf: () => "⌓",
	prop: () => "∝",
	propto: () => "∝",
	prsim: () => "≾",
	prurel: () => "⊰",
	pscr: () => pscr,
	psi: () => "ψ",
	puncsp: () => " ",
	qfr: () => qfr,
	qint: () => "⨌",
	qopf: () => qopf,
	qprime: () => "⁗",
	qscr: () => qscr,
	quaternions: () => "ℍ",
	quatint: () => "⨖",
	quest: () => "?",
	questeq: () => "≟",
	quot: () => "\"",
	rAarr: () => "⇛",
	rArr: () => "⇒",
	rAtail: () => "⤜",
	rBarr: () => "⤏",
	rHar: () => "⥤",
	race: () => race,
	racute: () => "ŕ",
	radic: () => "√",
	raemptyv: () => "⦳",
	rang: () => "⟩",
	rangd: () => "⦒",
	range: () => "⦥",
	rangle: () => "⟩",
	raquo: () => "»",
	rarr: () => "→",
	rarrap: () => "⥵",
	rarrb: () => "⇥",
	rarrbfs: () => "⤠",
	rarrc: () => "⤳",
	rarrfs: () => "⤞",
	rarrhk: () => "↪",
	rarrlp: () => "↬",
	rarrpl: () => "⥅",
	rarrsim: () => "⥴",
	rarrtl: () => "↣",
	rarrw: () => "↝",
	ratail: () => "⤚",
	ratio: () => "∶",
	rationals: () => "ℚ",
	rbarr: () => "⤍",
	rbbrk: () => "❳",
	rbrace: () => "}",
	rbrack: () => "]",
	rbrke: () => "⦌",
	rbrksld: () => "⦎",
	rbrkslu: () => "⦐",
	rcaron: () => "ř",
	rcedil: () => "ŗ",
	rceil: () => "⌉",
	rcub: () => "}",
	rcy: () => "р",
	rdca: () => "⤷",
	rdldhar: () => "⥩",
	rdquo: () => "”",
	rdquor: () => "”",
	rdsh: () => "↳",
	real: () => "ℜ",
	realine: () => "ℛ",
	realpart: () => "ℜ",
	reals: () => "ℝ",
	rect: () => "▭",
	reg: () => "®",
	rfisht: () => "⥽",
	rfloor: () => "⌋",
	rfr: () => rfr,
	rhard: () => "⇁",
	rharu: () => "⇀",
	rharul: () => "⥬",
	rho: () => "ρ",
	rhov: () => "ϱ",
	rightarrow: () => "→",
	rightarrowtail: () => "↣",
	rightharpoondown: () => "⇁",
	rightharpoonup: () => "⇀",
	rightleftarrows: () => "⇄",
	rightleftharpoons: () => "⇌",
	rightrightarrows: () => "⇉",
	rightsquigarrow: () => "↝",
	rightthreetimes: () => "⋌",
	ring: () => "˚",
	risingdotseq: () => "≓",
	rlarr: () => "⇄",
	rlhar: () => "⇌",
	rlm: () => "‏",
	rmoust: () => "⎱",
	rmoustache: () => "⎱",
	rnmid: () => "⫮",
	roang: () => "⟭",
	roarr: () => "⇾",
	robrk: () => "⟧",
	ropar: () => "⦆",
	ropf: () => ropf,
	roplus: () => "⨮",
	rotimes: () => "⨵",
	rpar: () => ")",
	rpargt: () => "⦔",
	rppolint: () => "⨒",
	rrarr: () => "⇉",
	rsaquo: () => "›",
	rscr: () => rscr,
	rsh: () => "↱",
	rsqb: () => "]",
	rsquo: () => "’",
	rsquor: () => "’",
	rthree: () => "⋌",
	rtimes: () => "⋊",
	rtri: () => "▹",
	rtrie: () => "⊵",
	rtrif: () => "▸",
	rtriltri: () => "⧎",
	ruluhar: () => "⥨",
	rx: () => "℞",
	sacute: () => "ś",
	sbquo: () => "‚",
	sc: () => "≻",
	scE: () => "⪴",
	scap: () => "⪸",
	scaron: () => "š",
	sccue: () => "≽",
	sce: () => "⪰",
	scedil: () => "ş",
	scirc: () => "ŝ",
	scnE: () => "⪶",
	scnap: () => "⪺",
	scnsim: () => "⋩",
	scpolint: () => "⨓",
	scsim: () => "≿",
	scy: () => "с",
	sdot: () => "⋅",
	sdotb: () => "⊡",
	sdote: () => "⩦",
	seArr: () => "⇘",
	searhk: () => "⤥",
	searr: () => "↘",
	searrow: () => "↘",
	sect: () => "§",
	semi: () => ";",
	seswar: () => "⤩",
	setminus: () => "∖",
	setmn: () => "∖",
	sext: () => "✶",
	sfr: () => sfr,
	sfrown: () => "⌢",
	sharp: () => "♯",
	shchcy: () => "щ",
	shcy: () => "ш",
	shortmid: () => "∣",
	shortparallel: () => "∥",
	shy: () => "­",
	sigma: () => "σ",
	sigmaf: () => "ς",
	sigmav: () => "ς",
	sim: () => "∼",
	simdot: () => "⩪",
	sime: () => "≃",
	simeq: () => "≃",
	simg: () => "⪞",
	simgE: () => "⪠",
	siml: () => "⪝",
	simlE: () => "⪟",
	simne: () => "≆",
	simplus: () => "⨤",
	simrarr: () => "⥲",
	slarr: () => "←",
	smallsetminus: () => "∖",
	smashp: () => "⨳",
	smeparsl: () => "⧤",
	smid: () => "∣",
	smile: () => "⌣",
	smt: () => "⪪",
	smte: () => "⪬",
	smtes: () => smtes,
	softcy: () => "ь",
	sol: () => "/",
	solb: () => "⧄",
	solbar: () => "⌿",
	sopf: () => sopf,
	spades: () => "♠",
	spadesuit: () => "♠",
	spar: () => "∥",
	sqcap: () => "⊓",
	sqcaps: () => sqcaps,
	sqcup: () => "⊔",
	sqcups: () => sqcups,
	sqsub: () => "⊏",
	sqsube: () => "⊑",
	sqsubset: () => "⊏",
	sqsubseteq: () => "⊑",
	sqsup: () => "⊐",
	sqsupe: () => "⊒",
	sqsupset: () => "⊐",
	sqsupseteq: () => "⊒",
	squ: () => "□",
	square: () => "□",
	squarf: () => "▪",
	squf: () => "▪",
	srarr: () => "→",
	sscr: () => sscr,
	ssetmn: () => "∖",
	ssmile: () => "⌣",
	sstarf: () => "⋆",
	star: () => "☆",
	starf: () => "★",
	straightepsilon: () => "ϵ",
	straightphi: () => "ϕ",
	strns: () => "¯",
	sub: () => "⊂",
	subE: () => "⫅",
	subdot: () => "⪽",
	sube: () => "⊆",
	subedot: () => "⫃",
	submult: () => "⫁",
	subnE: () => "⫋",
	subne: () => "⊊",
	subplus: () => "⪿",
	subrarr: () => "⥹",
	subset: () => "⊂",
	subseteq: () => "⊆",
	subseteqq: () => "⫅",
	subsetneq: () => "⊊",
	subsetneqq: () => "⫋",
	subsim: () => "⫇",
	subsub: () => "⫕",
	subsup: () => "⫓",
	succ: () => "≻",
	succapprox: () => "⪸",
	succcurlyeq: () => "≽",
	succeq: () => "⪰",
	succnapprox: () => "⪺",
	succneqq: () => "⪶",
	succnsim: () => "⋩",
	succsim: () => "≿",
	sum: () => "∑",
	sung: () => "♪",
	sup: () => "⊃",
	sup1: () => "¹",
	sup2: () => "²",
	sup3: () => "³",
	supE: () => "⫆",
	supdot: () => "⪾",
	supdsub: () => "⫘",
	supe: () => "⊇",
	supedot: () => "⫄",
	suphsol: () => "⟉",
	suphsub: () => "⫗",
	suplarr: () => "⥻",
	supmult: () => "⫂",
	supnE: () => "⫌",
	supne: () => "⊋",
	supplus: () => "⫀",
	supset: () => "⊃",
	supseteq: () => "⊇",
	supseteqq: () => "⫆",
	supsetneq: () => "⊋",
	supsetneqq: () => "⫌",
	supsim: () => "⫈",
	supsub: () => "⫔",
	supsup: () => "⫖",
	swArr: () => "⇙",
	swarhk: () => "⤦",
	swarr: () => "↙",
	swarrow: () => "↙",
	swnwar: () => "⤪",
	szlig: () => "ß",
	target: () => "⌖",
	tau: () => "τ",
	tbrk: () => "⎴",
	tcaron: () => "ť",
	tcedil: () => "ţ",
	tcy: () => "т",
	tdot: () => "⃛",
	telrec: () => "⌕",
	tfr: () => tfr,
	there4: () => "∴",
	therefore: () => "∴",
	theta: () => "θ",
	thetasym: () => "ϑ",
	thetav: () => "ϑ",
	thickapprox: () => "≈",
	thicksim: () => "∼",
	thinsp: () => " ",
	thkap: () => "≈",
	thksim: () => "∼",
	thorn: () => "þ",
	tilde: () => "˜",
	times: () => "×",
	timesb: () => "⊠",
	timesbar: () => "⨱",
	timesd: () => "⨰",
	tint: () => "∭",
	toea: () => "⤨",
	top: () => "⊤",
	topbot: () => "⌶",
	topcir: () => "⫱",
	topf: () => topf,
	topfork: () => "⫚",
	tosa: () => "⤩",
	tprime: () => "‴",
	trade: () => "™",
	triangle: () => "▵",
	triangledown: () => "▿",
	triangleleft: () => "◃",
	trianglelefteq: () => "⊴",
	triangleq: () => "≜",
	triangleright: () => "▹",
	trianglerighteq: () => "⊵",
	tridot: () => "◬",
	trie: () => "≜",
	triminus: () => "⨺",
	triplus: () => "⨹",
	trisb: () => "⧍",
	tritime: () => "⨻",
	trpezium: () => "⏢",
	tscr: () => tscr,
	tscy: () => "ц",
	tshcy: () => "ћ",
	tstrok: () => "ŧ",
	twixt: () => "≬",
	twoheadleftarrow: () => "↞",
	twoheadrightarrow: () => "↠",
	uArr: () => "⇑",
	uHar: () => "⥣",
	uacute: () => "ú",
	uarr: () => "↑",
	ubrcy: () => "ў",
	ubreve: () => "ŭ",
	ucirc: () => "û",
	ucy: () => "у",
	udarr: () => "⇅",
	udblac: () => "ű",
	udhar: () => "⥮",
	ufisht: () => "⥾",
	ufr: () => ufr,
	ugrave: () => "ù",
	uharl: () => "↿",
	uharr: () => "↾",
	uhblk: () => "▀",
	ulcorn: () => "⌜",
	ulcorner: () => "⌜",
	ulcrop: () => "⌏",
	ultri: () => "◸",
	umacr: () => "ū",
	uml: () => "¨",
	uogon: () => "ų",
	uopf: () => uopf,
	uparrow: () => "↑",
	updownarrow: () => "↕",
	upharpoonleft: () => "↿",
	upharpoonright: () => "↾",
	uplus: () => "⊎",
	upsi: () => "υ",
	upsih: () => "ϒ",
	upsilon: () => "υ",
	upuparrows: () => "⇈",
	urcorn: () => "⌝",
	urcorner: () => "⌝",
	urcrop: () => "⌎",
	uring: () => "ů",
	urtri: () => "◹",
	uscr: () => uscr,
	utdot: () => "⋰",
	utilde: () => "ũ",
	utri: () => "▵",
	utrif: () => "▴",
	uuarr: () => "⇈",
	uuml: () => "ü",
	uwangle: () => "⦧",
	vArr: () => "⇕",
	vBar: () => "⫨",
	vBarv: () => "⫩",
	vDash: () => "⊨",
	vangrt: () => "⦜",
	varepsilon: () => "ϵ",
	varkappa: () => "ϰ",
	varnothing: () => "∅",
	varphi: () => "ϕ",
	varpi: () => "ϖ",
	varpropto: () => "∝",
	varr: () => "↕",
	varrho: () => "ϱ",
	varsigma: () => "ς",
	varsubsetneq: () => varsubsetneq,
	varsubsetneqq: () => varsubsetneqq,
	varsupsetneq: () => varsupsetneq,
	varsupsetneqq: () => varsupsetneqq,
	vartheta: () => "ϑ",
	vartriangleleft: () => "⊲",
	vartriangleright: () => "⊳",
	vcy: () => "в",
	vdash: () => "⊢",
	vee: () => "∨",
	veebar: () => "⊻",
	veeeq: () => "≚",
	vellip: () => "⋮",
	verbar: () => "|",
	vert: () => "|",
	vfr: () => vfr,
	vltri: () => "⊲",
	vnsub: () => vnsub,
	vnsup: () => vnsup,
	vopf: () => vopf,
	vprop: () => "∝",
	vrtri: () => "⊳",
	vscr: () => vscr,
	vsubnE: () => vsubnE,
	vsubne: () => vsubne,
	vsupnE: () => vsupnE,
	vsupne: () => vsupne,
	vzigzag: () => "⦚",
	wcirc: () => "ŵ",
	wedbar: () => "⩟",
	wedge: () => "∧",
	wedgeq: () => "≙",
	weierp: () => "℘",
	wfr: () => wfr,
	wopf: () => wopf,
	wp: () => "℘",
	wr: () => "≀",
	wreath: () => "≀",
	wscr: () => wscr,
	xcap: () => "⋂",
	xcirc: () => "◯",
	xcup: () => "⋃",
	xdtri: () => "▽",
	xfr: () => xfr,
	xhArr: () => "⟺",
	xharr: () => "⟷",
	xi: () => "ξ",
	xlArr: () => "⟸",
	xlarr: () => "⟵",
	xmap: () => "⟼",
	xnis: () => "⋻",
	xodot: () => "⨀",
	xopf: () => xopf,
	xoplus: () => "⨁",
	xotime: () => "⨂",
	xrArr: () => "⟹",
	xrarr: () => "⟶",
	xscr: () => xscr,
	xsqcup: () => "⨆",
	xuplus: () => "⨄",
	xutri: () => "△",
	xvee: () => "⋁",
	xwedge: () => "⋀",
	yacute: () => "ý",
	yacy: () => "я",
	ycirc: () => "ŷ",
	ycy: () => "ы",
	yen: () => "¥",
	yfr: () => yfr,
	yicy: () => "ї",
	yopf: () => yopf,
	yscr: () => yscr,
	yucy: () => "ю",
	yuml: () => "ÿ",
	zacute: () => "ź",
	zcaron: () => "ž",
	zcy: () => "з",
	zdot: () => "ż",
	zeetrf: () => "ℨ",
	zeta: () => "ζ",
	zfr: () => zfr,
	zhcy: () => "ж",
	zigrarr: () => "⇝",
	zopf: () => zopf,
	zscr: () => zscr,
	zwj: () => "‍",
	zwnj: () => "‌"
}), acE, Afr, afr, Aopf, aopf, Ascr, ascr, Bfr, bfr, bne, bnequiv, Bopf, bopf, bscr, caps, cfr, copf, Cscr, cscr, cups, Dfr, dfr, Dopf, dopf, Dscr, dscr, Efr, efr, Eopf, eopf, Ffr, ffr, Fopf, fopf, fscr, gesl, Gfr, gfr, Gopf, gopf, Gscr, gvertneqq, gvnE, hfr, hopf, hscr, ifr, Iopf, iopf, iscr, Jfr, jfr, Jopf, jopf, Jscr, jscr, Kfr, kfr, Kopf, kopf, Kscr, kscr, lates, lesg, Lfr, lfr, Lopf, lopf, lscr, lvertneqq, lvnE, Mfr, mfr, Mopf, mopf, mscr, nang, napE, napid, nbump, nbumpe, ncongdot, nedot, nesim, Nfr, nfr, ngE, ngeqq, ngeqslant, nges, nGg, nGt, nGtv, nlE, nleqq, nleqslant, nles, nLl, nLt, nLtv, nopf, NotEqualTilde, NotGreaterFullEqual, NotGreaterGreater, NotGreaterSlantEqual, NotHumpDownHump, NotHumpEqual, notindot, notinE, NotLeftTriangleBar, NotLessLess, NotLessSlantEqual, NotNestedGreaterGreater, NotNestedLessLess, NotPrecedesEqual, NotRightTriangleBar, NotSquareSubset, NotSquareSuperset, NotSubset, NotSucceedsEqual, NotSucceedsTilde, NotSuperset, nparsl, npart, npreceq, npre, nrarrc, nrarrw, nsce, Nscr, nscr, nsubE, nsubset, nsubseteqq, nsucceq, nsupE, nsupset, nsupseteqq, nvap, nvge, nvgt, nvle, nvlt, nvltrie, nvrtrie, nvsim, Ofr, ofr, Oopf, oopf, Oscr, Pfr, pfr, popf, Pscr, pscr, Qfr, qfr, qopf, Qscr, qscr, race, rfr, ropf, rscr, Sfr, sfr, smtes, Sopf, sopf, sqcaps, sqcups, Sscr, sscr, Tfr, tfr, ThickSpace, Topf, topf, Tscr, tscr, Ufr, ufr, Uopf, uopf, Uscr, uscr, varsubsetneq, varsubsetneqq, varsupsetneq, varsupsetneqq, Vfr, vfr, vnsub, vnsup, Vopf, vopf, Vscr, vscr, vsubnE, vsubne, vsupnE, vsupne, Wfr, wfr, Wopf, wopf, Wscr, wscr, Xfr, xfr, Xopf, xopf, Xscr, xscr, Yfr, yfr, Yopf, yopf, Yscr, yscr, zfr, zopf, Zscr, zscr, entities_default;
var init_entities = __esmMin((() => {
	acE = "∾̳";
	Afr = "𝔄";
	afr = "𝔞";
	Aopf = "𝔸";
	aopf = "𝕒";
	Ascr = "𝒜";
	ascr = "𝒶";
	Bfr = "𝔅";
	bfr = "𝔟";
	bne = "=⃥";
	bnequiv = "≡⃥";
	Bopf = "𝔹";
	bopf = "𝕓";
	bscr = "𝒷";
	caps = "∩︀";
	cfr = "𝔠";
	copf = "𝕔";
	Cscr = "𝒞";
	cscr = "𝒸";
	cups = "∪︀";
	Dfr = "𝔇";
	dfr = "𝔡";
	Dopf = "𝔻";
	dopf = "𝕕";
	Dscr = "𝒟";
	dscr = "𝒹";
	Efr = "𝔈";
	efr = "𝔢";
	Eopf = "𝔼";
	eopf = "𝕖";
	Ffr = "𝔉";
	ffr = "𝔣";
	Fopf = "𝔽";
	fopf = "𝕗";
	fscr = "𝒻";
	gesl = "⋛︀";
	Gfr = "𝔊";
	gfr = "𝔤";
	Gopf = "𝔾";
	gopf = "𝕘";
	Gscr = "𝒢";
	gvertneqq = "≩︀";
	gvnE = "≩︀";
	hfr = "𝔥";
	hopf = "𝕙";
	hscr = "𝒽";
	ifr = "𝔦";
	Iopf = "𝕀";
	iopf = "𝕚";
	iscr = "𝒾";
	Jfr = "𝔍";
	jfr = "𝔧";
	Jopf = "𝕁";
	jopf = "𝕛";
	Jscr = "𝒥";
	jscr = "𝒿";
	Kfr = "𝔎";
	kfr = "𝔨";
	Kopf = "𝕂";
	kopf = "𝕜";
	Kscr = "𝒦";
	kscr = "𝓀";
	lates = "⪭︀";
	lesg = "⋚︀";
	Lfr = "𝔏";
	lfr = "𝔩";
	Lopf = "𝕃";
	lopf = "𝕝";
	lscr = "𝓁";
	lvertneqq = "≨︀";
	lvnE = "≨︀";
	Mfr = "𝔐";
	mfr = "𝔪";
	Mopf = "𝕄";
	mopf = "𝕞";
	mscr = "𝓂";
	nang = "∠⃒";
	napE = "⩰̸";
	napid = "≋̸";
	nbump = "≎̸";
	nbumpe = "≏̸";
	ncongdot = "⩭̸";
	nedot = "≐̸";
	nesim = "≂̸";
	Nfr = "𝔑";
	nfr = "𝔫";
	ngE = "≧̸";
	ngeqq = "≧̸";
	ngeqslant = "⩾̸";
	nges = "⩾̸";
	nGg = "⋙̸";
	nGt = "≫⃒";
	nGtv = "≫̸";
	nlE = "≦̸";
	nleqq = "≦̸";
	nleqslant = "⩽̸";
	nles = "⩽̸";
	nLl = "⋘̸";
	nLt = "≪⃒";
	nLtv = "≪̸";
	nopf = "𝕟";
	NotEqualTilde = "≂̸";
	NotGreaterFullEqual = "≧̸";
	NotGreaterGreater = "≫̸";
	NotGreaterSlantEqual = "⩾̸";
	NotHumpDownHump = "≎̸";
	NotHumpEqual = "≏̸";
	notindot = "⋵̸";
	notinE = "⋹̸";
	NotLeftTriangleBar = "⧏̸";
	NotLessLess = "≪̸";
	NotLessSlantEqual = "⩽̸";
	NotNestedGreaterGreater = "⪢̸";
	NotNestedLessLess = "⪡̸";
	NotPrecedesEqual = "⪯̸";
	NotRightTriangleBar = "⧐̸";
	NotSquareSubset = "⊏̸";
	NotSquareSuperset = "⊐̸";
	NotSubset = "⊂⃒";
	NotSucceedsEqual = "⪰̸";
	NotSucceedsTilde = "≿̸";
	NotSuperset = "⊃⃒";
	nparsl = "⫽⃥";
	npart = "∂̸";
	npreceq = "⪯̸";
	npre = "⪯̸";
	nrarrc = "⤳̸";
	nrarrw = "↝̸";
	nsce = "⪰̸";
	Nscr = "𝒩";
	nscr = "𝓃";
	nsubE = "⫅̸";
	nsubset = "⊂⃒";
	nsubseteqq = "⫅̸";
	nsucceq = "⪰̸";
	nsupE = "⫆̸";
	nsupset = "⊃⃒";
	nsupseteqq = "⫆̸";
	nvap = "≍⃒";
	nvge = "≥⃒";
	nvgt = ">⃒";
	nvle = "≤⃒";
	nvlt = "<⃒";
	nvltrie = "⊴⃒";
	nvrtrie = "⊵⃒";
	nvsim = "∼⃒";
	Ofr = "𝔒";
	ofr = "𝔬";
	Oopf = "𝕆";
	oopf = "𝕠";
	Oscr = "𝒪";
	Pfr = "𝔓";
	pfr = "𝔭";
	popf = "𝕡";
	Pscr = "𝒫";
	pscr = "𝓅";
	Qfr = "𝔔";
	qfr = "𝔮";
	qopf = "𝕢";
	Qscr = "𝒬";
	qscr = "𝓆";
	race = "∽̱";
	rfr = "𝔯";
	ropf = "𝕣";
	rscr = "𝓇";
	Sfr = "𝔖";
	sfr = "𝔰";
	smtes = "⪬︀";
	Sopf = "𝕊";
	sopf = "𝕤";
	sqcaps = "⊓︀";
	sqcups = "⊔︀";
	Sscr = "𝒮";
	sscr = "𝓈";
	Tfr = "𝔗";
	tfr = "𝔱";
	ThickSpace = "  ";
	Topf = "𝕋";
	topf = "𝕥";
	Tscr = "𝒯";
	tscr = "𝓉";
	Ufr = "𝔘";
	ufr = "𝔲";
	Uopf = "𝕌";
	uopf = "𝕦";
	Uscr = "𝒰";
	uscr = "𝓊";
	varsubsetneq = "⊊︀";
	varsubsetneqq = "⫋︀";
	varsupsetneq = "⊋︀";
	varsupsetneqq = "⫌︀";
	Vfr = "𝔙";
	vfr = "𝔳";
	vnsub = "⊂⃒";
	vnsup = "⊃⃒";
	Vopf = "𝕍";
	vopf = "𝕧";
	Vscr = "𝒱";
	vscr = "𝓋";
	vsubnE = "⫋︀";
	vsubne = "⊊︀";
	vsupnE = "⫌︀";
	vsupne = "⊋︀";
	Wfr = "𝔚";
	wfr = "𝔴";
	Wopf = "𝕎";
	wopf = "𝕨";
	Wscr = "𝒲";
	wscr = "𝓌";
	Xfr = "𝔛";
	xfr = "𝔵";
	Xopf = "𝕏";
	xopf = "𝕩";
	Xscr = "𝒳";
	xscr = "𝓍";
	Yfr = "𝔜";
	yfr = "𝔶";
	Yopf = "𝕐";
	yopf = "𝕪";
	Yscr = "𝒴";
	yscr = "𝓎";
	zfr = "𝔷";
	zopf = "𝕫";
	Zscr = "𝒵";
	zscr = "𝓏";
	entities_default = {
		Aacute: "Á",
		aacute: "á",
		Abreve: "Ă",
		abreve: "ă",
		ac: "∾",
		acd: "∿",
		acE,
		Acirc: "Â",
		acirc: "â",
		acute: "´",
		Acy: "А",
		acy: "а",
		AElig: "Æ",
		aelig: "æ",
		af: "⁡",
		Afr,
		afr,
		Agrave: "À",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		Alpha: "Α",
		alpha: "α",
		Amacr: "Ā",
		amacr: "ā",
		amalg: "⨿",
		amp: "&",
		AMP: "&",
		andand: "⩕",
		And: "⩓",
		and: "∧",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angmsd: "∡",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		Aogon: "Ą",
		aogon: "ą",
		Aopf,
		aopf,
		apacir: "⩯",
		ap: "≈",
		apE: "⩰",
		ape: "≊",
		apid: "≋",
		apos: "'",
		ApplyFunction: "⁡",
		approx: "≈",
		approxeq: "≊",
		Aring: "Å",
		aring: "å",
		Ascr,
		ascr,
		Assign: "≔",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		Backslash: "∖",
		Barv: "⫧",
		barvee: "⊽",
		barwed: "⌅",
		Barwed: "⌆",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		Bcy: "Б",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		because: "∵",
		Because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		Bernoullis: "ℬ",
		Beta: "Β",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		Bfr,
		bfr,
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne,
		bnequiv,
		bNot: "⫭",
		bnot: "⌐",
		Bopf,
		bopf,
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxbox: "⧉",
		boxdl: "┐",
		boxdL: "╕",
		boxDl: "╖",
		boxDL: "╗",
		boxdr: "┌",
		boxdR: "╒",
		boxDr: "╓",
		boxDR: "╔",
		boxh: "─",
		boxH: "═",
		boxhd: "┬",
		boxHd: "╤",
		boxhD: "╥",
		boxHD: "╦",
		boxhu: "┴",
		boxHu: "╧",
		boxhU: "╨",
		boxHU: "╩",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxul: "┘",
		boxuL: "╛",
		boxUl: "╜",
		boxUL: "╝",
		boxur: "└",
		boxuR: "╘",
		boxUr: "╙",
		boxUR: "╚",
		boxv: "│",
		boxV: "║",
		boxvh: "┼",
		boxvH: "╪",
		boxVh: "╫",
		boxVH: "╬",
		boxvl: "┤",
		boxvL: "╡",
		boxVl: "╢",
		boxVL: "╣",
		boxvr: "├",
		boxvR: "╞",
		boxVr: "╟",
		boxVR: "╠",
		bprime: "‵",
		breve: "˘",
		Breve: "˘",
		brvbar: "¦",
		bscr,
		Bscr: "ℬ",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsolb: "⧅",
		bsol: "\\",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		Bumpeq: "≎",
		bumpeq: "≏",
		Cacute: "Ć",
		cacute: "ć",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		cap: "∩",
		Cap: "⋒",
		capcup: "⩇",
		capdot: "⩀",
		CapitalDifferentialD: "ⅅ",
		caps,
		caret: "⁁",
		caron: "ˇ",
		Cayleys: "ℭ",
		ccaps: "⩍",
		Ccaron: "Č",
		ccaron: "č",
		Ccedil: "Ç",
		ccedil: "ç",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cconint: "∰",
		ccups: "⩌",
		ccupssm: "⩐",
		Cdot: "Ċ",
		cdot: "ċ",
		cedil: "¸",
		Cedilla: "¸",
		cemptyv: "⦲",
		cent: "¢",
		centerdot: "·",
		CenterDot: "·",
		cfr,
		Cfr: "ℭ",
		CHcy: "Ч",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		Chi: "Χ",
		chi: "χ",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		CircleDot: "⊙",
		circledR: "®",
		circledS: "Ⓢ",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		cir: "○",
		cirE: "⧃",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		clubs: "♣",
		clubsuit: "♣",
		colon: ":",
		Colon: "∷",
		Colone: "⩴",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		Congruent: "≡",
		conint: "∮",
		Conint: "∯",
		ContourIntegral: "∮",
		copf,
		Copf: "ℂ",
		coprod: "∐",
		Coproduct: "∐",
		copy: "©",
		COPY: "©",
		copysr: "℗",
		CounterClockwiseContourIntegral: "∳",
		crarr: "↵",
		cross: "✗",
		Cross: "⨯",
		Cscr,
		cscr,
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		cupbrcap: "⩈",
		cupcap: "⩆",
		CupCap: "≍",
		cup: "∪",
		Cup: "⋓",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups,
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		dagger: "†",
		Dagger: "‡",
		daleth: "ℸ",
		darr: "↓",
		Darr: "↡",
		dArr: "⇓",
		dash: "‐",
		Dashv: "⫤",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		Dcaron: "Ď",
		dcaron: "ď",
		Dcy: "Д",
		dcy: "д",
		ddagger: "‡",
		ddarr: "⇊",
		DD: "ⅅ",
		dd: "ⅆ",
		DDotrahd: "⤑",
		ddotseq: "⩷",
		deg: "°",
		Del: "∇",
		Delta: "Δ",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		Dfr,
		dfr,
		dHar: "⥥",
		dharl: "⇃",
		dharr: "⇂",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		diam: "⋄",
		diamond: "⋄",
		Diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		DifferentialD: "ⅆ",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		DJcy: "Ђ",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		Dopf,
		dopf,
		Dot: "¨",
		dot: "˙",
		DotDot: "⃜",
		doteq: "≐",
		doteqdot: "≑",
		DotEqual: "≐",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrowBar: "⤓",
		downarrow: "↓",
		DownArrow: "↓",
		Downarrow: "⇓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVectorBar: "⥖",
		DownLeftVector: "↽",
		DownRightTeeVector: "⥟",
		DownRightVectorBar: "⥗",
		DownRightVector: "⇁",
		DownTeeArrow: "↧",
		DownTee: "⊤",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		Dscr,
		dscr,
		DScy: "Ѕ",
		dscy: "ѕ",
		dsol: "⧶",
		Dstrok: "Đ",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		DZcy: "Џ",
		dzcy: "џ",
		dzigrarr: "⟿",
		Eacute: "É",
		eacute: "é",
		easter: "⩮",
		Ecaron: "Ě",
		ecaron: "ě",
		Ecirc: "Ê",
		ecirc: "ê",
		ecir: "≖",
		ecolon: "≕",
		Ecy: "Э",
		ecy: "э",
		eDDot: "⩷",
		Edot: "Ė",
		edot: "ė",
		eDot: "≑",
		ee: "ⅇ",
		efDot: "≒",
		Efr,
		efr,
		eg: "⪚",
		Egrave: "È",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		Element: "∈",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		Emacr: "Ē",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		EmptySmallSquare: "◻",
		emptyv: "∅",
		EmptyVerySmallSquare: "▫",
		emsp13: " ",
		emsp14: " ",
		emsp: " ",
		ENG: "Ŋ",
		eng: "ŋ",
		ensp: " ",
		Eogon: "Ę",
		eogon: "ę",
		Eopf,
		eopf,
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		Equal: "⩵",
		equals: "=",
		EqualTilde: "≂",
		equest: "≟",
		Equilibrium: "⇌",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erarr: "⥱",
		erDot: "≓",
		escr: "ℯ",
		Escr: "ℰ",
		esdot: "≐",
		Esim: "⩳",
		esim: "≂",
		Eta: "Η",
		eta: "η",
		ETH: "Ð",
		eth: "ð",
		Euml: "Ë",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		Exists: "∃",
		expectation: "ℰ",
		exponentiale: "ⅇ",
		ExponentialE: "ⅇ",
		fallingdotseq: "≒",
		Fcy: "Ф",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		Ffr,
		ffr,
		filig: "ﬁ",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		Fopf,
		fopf,
		forall: "∀",
		ForAll: "∀",
		fork: "⋔",
		forkv: "⫙",
		Fouriertrf: "ℱ",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		fscr,
		Fscr: "ℱ",
		gacute: "ǵ",
		Gamma: "Γ",
		gamma: "γ",
		Gammad: "Ϝ",
		gammad: "ϝ",
		gap: "⪆",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gcy: "Г",
		gcy: "г",
		Gdot: "Ġ",
		gdot: "ġ",
		ge: "≥",
		gE: "≧",
		gEl: "⪌",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		gescc: "⪩",
		ges: "⩾",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl,
		gesles: "⪔",
		Gfr,
		gfr,
		gg: "≫",
		Gg: "⋙",
		ggg: "⋙",
		gimel: "ℷ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		gla: "⪥",
		gl: "≷",
		glE: "⪒",
		glj: "⪤",
		gnap: "⪊",
		gnapprox: "⪊",
		gne: "⪈",
		gnE: "≩",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		Gopf,
		gopf,
		grave: "`",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr,
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		gtcc: "⪧",
		gtcir: "⩺",
		gt: ">",
		GT: ">",
		Gt: "≫",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq,
		gvnE,
		Hacek: "ˇ",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		harrcir: "⥈",
		harr: "↔",
		hArr: "⇔",
		harrw: "↭",
		Hat: "^",
		hbar: "ℏ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		hfr,
		Hfr: "ℌ",
		HilbertSpace: "ℋ",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		hopf,
		Hopf: "ℍ",
		horbar: "―",
		HorizontalLine: "─",
		hscr,
		Hscr: "ℋ",
		hslash: "ℏ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		hybull: "⁃",
		hyphen: "‐",
		Iacute: "Í",
		iacute: "í",
		ic: "⁣",
		Icirc: "Î",
		icirc: "î",
		Icy: "И",
		icy: "и",
		Idot: "İ",
		IEcy: "Е",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		ifr,
		Ifr: "ℑ",
		Igrave: "Ì",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Imacr: "Ī",
		imacr: "ī",
		image: "ℑ",
		ImaginaryI: "ⅈ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		Im: "ℑ",
		imof: "⊷",
		imped: "Ƶ",
		Implies: "⇒",
		incare: "℅",
		"in": "∈",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		intcal: "⊺",
		int: "∫",
		Int: "∬",
		integers: "ℤ",
		Integral: "∫",
		intercal: "⊺",
		Intersection: "⋂",
		intlarhk: "⨗",
		intprod: "⨼",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		IOcy: "Ё",
		iocy: "ё",
		Iogon: "Į",
		iogon: "į",
		Iopf,
		iopf,
		Iota: "Ι",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		iscr,
		Iscr: "ℐ",
		isin: "∈",
		isindot: "⋵",
		isinE: "⋹",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Iukcy: "І",
		iukcy: "і",
		Iuml: "Ï",
		iuml: "ï",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Jcy: "Й",
		jcy: "й",
		Jfr,
		jfr,
		jmath: "ȷ",
		Jopf,
		jopf,
		Jscr,
		jscr,
		Jsercy: "Ј",
		jsercy: "ј",
		Jukcy: "Є",
		jukcy: "є",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		Kcy: "К",
		kcy: "к",
		Kfr,
		kfr,
		kgreen: "ĸ",
		KHcy: "Х",
		khcy: "х",
		KJcy: "Ќ",
		kjcy: "ќ",
		Kopf,
		kopf,
		Kscr,
		kscr,
		lAarr: "⇚",
		Lacute: "Ĺ",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		Lambda: "Λ",
		lambda: "λ",
		lang: "⟨",
		Lang: "⟪",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		Laplacetrf: "ℒ",
		laquo: "«",
		larrb: "⇤",
		larrbfs: "⤟",
		larr: "←",
		Larr: "↞",
		lArr: "⇐",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		latail: "⤙",
		lAtail: "⤛",
		lat: "⪫",
		late: "⪭",
		lates,
		lbarr: "⤌",
		lBarr: "⤎",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		Lcy: "Л",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		le: "≤",
		lE: "≦",
		LeftAngleBracket: "⟨",
		LeftArrowBar: "⇤",
		leftarrow: "←",
		LeftArrow: "←",
		Leftarrow: "⇐",
		LeftArrowRightArrow: "⇆",
		leftarrowtail: "↢",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVectorBar: "⥙",
		LeftDownVector: "⇃",
		LeftFloor: "⌊",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		leftrightarrow: "↔",
		LeftRightArrow: "↔",
		Leftrightarrow: "⇔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		LeftRightVector: "⥎",
		LeftTeeArrow: "↤",
		LeftTee: "⊣",
		LeftTeeVector: "⥚",
		leftthreetimes: "⋋",
		LeftTriangleBar: "⧏",
		LeftTriangle: "⊲",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVectorBar: "⥘",
		LeftUpVector: "↿",
		LeftVectorBar: "⥒",
		LeftVector: "↼",
		lEg: "⪋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		lescc: "⪨",
		les: "⩽",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg,
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		LessLess: "⪡",
		lesssim: "≲",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		Lfr,
		lfr,
		lg: "≶",
		lgE: "⪑",
		lHar: "⥢",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		LJcy: "Љ",
		ljcy: "љ",
		llarr: "⇇",
		ll: "≪",
		Ll: "⋘",
		llcorner: "⌞",
		Lleftarrow: "⇚",
		llhard: "⥫",
		lltri: "◺",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		lmoustache: "⎰",
		lmoust: "⎰",
		lnap: "⪉",
		lnapprox: "⪉",
		lne: "⪇",
		lnE: "≨",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		longleftarrow: "⟵",
		LongLeftArrow: "⟵",
		Longleftarrow: "⟸",
		longleftrightarrow: "⟷",
		LongLeftRightArrow: "⟷",
		Longleftrightarrow: "⟺",
		longmapsto: "⟼",
		longrightarrow: "⟶",
		LongRightArrow: "⟶",
		Longrightarrow: "⟹",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		Lopf,
		lopf,
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		lscr,
		Lscr: "ℒ",
		lsh: "↰",
		Lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		Lstrok: "Ł",
		lstrok: "ł",
		ltcc: "⪦",
		ltcir: "⩹",
		lt: "<",
		LT: "<",
		Lt: "≪",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		ltrPar: "⦖",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq,
		lvnE,
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		Map: "⤅",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		Mcy: "М",
		mcy: "м",
		mdash: "—",
		mDDot: "∺",
		measuredangle: "∡",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr,
		mfr,
		mho: "℧",
		micro: "µ",
		midast: "*",
		midcir: "⫰",
		mid: "∣",
		middot: "·",
		minusb: "⊟",
		minus: "−",
		minusd: "∸",
		minusdu: "⨪",
		MinusPlus: "∓",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		Mopf,
		mopf,
		mp: "∓",
		mscr,
		Mscr: "ℳ",
		mstpos: "∾",
		Mu: "Μ",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nabla: "∇",
		Nacute: "Ń",
		nacute: "ń",
		nang,
		nap: "≉",
		napE,
		napid,
		napos: "ŉ",
		napprox: "≉",
		natural: "♮",
		naturals: "ℕ",
		natur: "♮",
		nbsp: "\xA0",
		nbump,
		nbumpe,
		ncap: "⩃",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot,
		ncup: "⩂",
		Ncy: "Н",
		ncy: "н",
		ndash: "–",
		nearhk: "⤤",
		nearr: "↗",
		neArr: "⇗",
		nearrow: "↗",
		ne: "≠",
		nedot,
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		nequiv: "≢",
		nesear: "⤨",
		nesim,
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: "\n",
		nexist: "∄",
		nexists: "∄",
		Nfr,
		nfr,
		ngE,
		nge: "≱",
		ngeq: "≱",
		ngeqq,
		ngeqslant,
		nges,
		nGg,
		ngsim: "≵",
		nGt,
		ngt: "≯",
		ngtr: "≯",
		nGtv,
		nharr: "↮",
		nhArr: "⇎",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		NJcy: "Њ",
		njcy: "њ",
		nlarr: "↚",
		nlArr: "⇍",
		nldr: "‥",
		nlE,
		nle: "≰",
		nleftarrow: "↚",
		nLeftarrow: "⇍",
		nleftrightarrow: "↮",
		nLeftrightarrow: "⇎",
		nleq: "≰",
		nleqq,
		nleqslant,
		nles,
		nless: "≮",
		nLl,
		nlsim: "≴",
		nLt,
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nLtv,
		nmid: "∤",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		nopf,
		Nopf: "ℕ",
		Not: "⫬",
		not: "¬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde,
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual,
		NotGreaterGreater,
		NotGreaterLess: "≹",
		NotGreaterSlantEqual,
		NotGreaterTilde: "≵",
		NotHumpDownHump,
		NotHumpEqual,
		notin: "∉",
		notindot,
		notinE,
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		NotLeftTriangleBar,
		NotLeftTriangle: "⋪",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess,
		NotLessSlantEqual,
		NotLessTilde: "≴",
		NotNestedGreaterGreater,
		NotNestedLessLess,
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		NotPrecedes: "⊀",
		NotPrecedesEqual,
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangleBar,
		NotRightTriangle: "⋫",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset,
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset,
		NotSquareSupersetEqual: "⋣",
		NotSubset,
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual,
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde,
		NotSuperset,
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		nparallel: "∦",
		npar: "∦",
		nparsl,
		npart,
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		nprec: "⊀",
		npreceq,
		npre,
		nrarrc,
		nrarr: "↛",
		nrArr: "⇏",
		nrarrw,
		nrightarrow: "↛",
		nRightarrow: "⇏",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce,
		Nscr,
		nscr,
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE,
		nsube: "⊈",
		nsubset,
		nsubseteq: "⊈",
		nsubseteqq,
		nsucc: "⊁",
		nsucceq,
		nsup: "⊅",
		nsupE,
		nsupe: "⊉",
		nsupset,
		nsupseteq: "⊉",
		nsupseteqq,
		ntgl: "≹",
		Ntilde: "Ñ",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		Nu: "Ν",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvap,
		nvdash: "⊬",
		nvDash: "⊭",
		nVdash: "⊮",
		nVDash: "⊯",
		nvge,
		nvgt,
		nvHarr: "⤄",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle,
		nvlt,
		nvltrie,
		nvrArr: "⤃",
		nvrtrie,
		nvsim,
		nwarhk: "⤣",
		nwarr: "↖",
		nwArr: "⇖",
		nwarrow: "↖",
		nwnear: "⤧",
		Oacute: "Ó",
		oacute: "ó",
		oast: "⊛",
		Ocirc: "Ô",
		ocirc: "ô",
		ocir: "⊚",
		Ocy: "О",
		ocy: "о",
		odash: "⊝",
		Odblac: "Ő",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		OElig: "Œ",
		oelig: "œ",
		ofcir: "⦿",
		Ofr,
		ofr,
		ogon: "˛",
		Ograve: "Ò",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		Omacr: "Ō",
		omacr: "ō",
		Omega: "Ω",
		omega: "ω",
		Omicron: "Ο",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		Oopf,
		oopf,
		opar: "⦷",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		operp: "⦹",
		oplus: "⊕",
		orarr: "↻",
		Or: "⩔",
		or: "∨",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oS: "Ⓢ",
		Oscr,
		oscr: "ℴ",
		Oslash: "Ø",
		oslash: "ø",
		osol: "⊘",
		Otilde: "Õ",
		otilde: "õ",
		otimesas: "⨶",
		Otimes: "⨷",
		otimes: "⊗",
		Ouml: "Ö",
		ouml: "ö",
		ovbar: "⌽",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		para: "¶",
		parallel: "∥",
		par: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		PartialD: "∂",
		Pcy: "П",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		Pfr,
		pfr,
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		Pi: "Π",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plus: "+",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		PlusMinus: "±",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		Poincareplane: "ℌ",
		pointint: "⨕",
		popf,
		Popf: "ℙ",
		pound: "£",
		prap: "⪷",
		Pr: "⪻",
		pr: "≺",
		prcue: "≼",
		precapprox: "⪷",
		prec: "≺",
		preccurlyeq: "≼",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		pre: "⪯",
		prE: "⪳",
		precsim: "≾",
		prime: "′",
		Prime: "″",
		primes: "ℙ",
		prnap: "⪹",
		prnE: "⪵",
		prnsim: "⋨",
		prod: "∏",
		Product: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		Proportional: "∝",
		Proportion: "∷",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		Pscr,
		pscr,
		Psi: "Ψ",
		psi: "ψ",
		puncsp: " ",
		Qfr,
		qfr,
		qint: "⨌",
		qopf,
		Qopf: "ℚ",
		qprime: "⁗",
		Qscr,
		qscr,
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		quot: "\"",
		QUOT: "\"",
		rAarr: "⇛",
		race,
		Racute: "Ŕ",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		rang: "⟩",
		Rang: "⟫",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarr: "→",
		Rarr: "↠",
		rArr: "⇒",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		Rarrtl: "⤖",
		rarrtl: "↣",
		rarrw: "↝",
		ratail: "⤚",
		rAtail: "⤜",
		ratio: "∶",
		rationals: "ℚ",
		rbarr: "⤍",
		rBarr: "⤏",
		RBarr: "⤐",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		Rcy: "Р",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		Re: "ℜ",
		rect: "▭",
		reg: "®",
		REG: "®",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		rfisht: "⥽",
		rfloor: "⌋",
		rfr,
		Rfr: "ℜ",
		rHar: "⥤",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		RightAngleBracket: "⟩",
		RightArrowBar: "⇥",
		rightarrow: "→",
		RightArrow: "→",
		Rightarrow: "⇒",
		RightArrowLeftArrow: "⇄",
		rightarrowtail: "↣",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVectorBar: "⥕",
		RightDownVector: "⇂",
		RightFloor: "⌋",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		RightTeeArrow: "↦",
		RightTee: "⊢",
		RightTeeVector: "⥛",
		rightthreetimes: "⋌",
		RightTriangleBar: "⧐",
		RightTriangle: "⊳",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVectorBar: "⥔",
		RightUpVector: "↾",
		RightVectorBar: "⥓",
		RightVector: "⇀",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoustache: "⎱",
		rmoust: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		ropf,
		Ropf: "ℝ",
		roplus: "⨮",
		rotimes: "⨵",
		RoundImplies: "⥰",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		Rrightarrow: "⇛",
		rsaquo: "›",
		rscr,
		Rscr: "ℛ",
		rsh: "↱",
		Rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		RuleDelayed: "⧴",
		ruluhar: "⥨",
		rx: "℞",
		Sacute: "Ś",
		sacute: "ś",
		sbquo: "‚",
		scap: "⪸",
		Scaron: "Š",
		scaron: "š",
		Sc: "⪼",
		sc: "≻",
		sccue: "≽",
		sce: "⪰",
		scE: "⪴",
		Scedil: "Ş",
		scedil: "ş",
		Scirc: "Ŝ",
		scirc: "ŝ",
		scnap: "⪺",
		scnE: "⪶",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		Scy: "С",
		scy: "с",
		sdotb: "⊡",
		sdot: "⋅",
		sdote: "⩦",
		searhk: "⤥",
		searr: "↘",
		seArr: "⇘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		Sfr,
		sfr,
		sfrown: "⌢",
		sharp: "♯",
		SHCHcy: "Щ",
		shchcy: "щ",
		SHcy: "Ш",
		shcy: "ш",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		shortmid: "∣",
		shortparallel: "∥",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		shy: "­",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		SmallCircle: "∘",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes,
		SOFTcy: "Ь",
		softcy: "ь",
		solbar: "⌿",
		solb: "⧄",
		sol: "/",
		Sopf,
		sopf,
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps,
		sqcup: "⊔",
		sqcups,
		Sqrt: "√",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		square: "□",
		Square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		squarf: "▪",
		squ: "□",
		squf: "▪",
		srarr: "→",
		Sscr,
		sscr,
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		Star: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		sub: "⊂",
		Sub: "⋐",
		subdot: "⪽",
		subE: "⫅",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		subset: "⊂",
		Subset: "⋐",
		subseteq: "⊆",
		subseteqq: "⫅",
		SubsetEqual: "⊆",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succapprox: "⪸",
		succ: "≻",
		succcurlyeq: "≽",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		SuchThat: "∋",
		sum: "∑",
		Sum: "∑",
		sung: "♪",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		sup: "⊃",
		Sup: "⋑",
		supdot: "⪾",
		supdsub: "⫘",
		supE: "⫆",
		supe: "⊇",
		supedot: "⫄",
		Superset: "⊃",
		SupersetEqual: "⊇",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		supset: "⊃",
		Supset: "⋑",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swarhk: "⤦",
		swarr: "↙",
		swArr: "⇙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		Tab: "	",
		target: "⌖",
		Tau: "Τ",
		tau: "τ",
		tbrk: "⎴",
		Tcaron: "Ť",
		tcaron: "ť",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcy: "Т",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		Tfr,
		tfr,
		there4: "∴",
		therefore: "∴",
		Therefore: "∴",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		ThickSpace,
		ThinSpace: " ",
		thinsp: " ",
		thkap: "≈",
		thksim: "∼",
		THORN: "Þ",
		thorn: "þ",
		tilde: "˜",
		Tilde: "∼",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		timesbar: "⨱",
		timesb: "⊠",
		times: "×",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		topbot: "⌶",
		topcir: "⫱",
		top: "⊤",
		Topf,
		topf,
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		trade: "™",
		TRADE: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		TripleDot: "⃛",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		Tscr,
		tscr,
		TScy: "Ц",
		tscy: "ц",
		TSHcy: "Ћ",
		tshcy: "ћ",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Uacute: "Ú",
		uacute: "ú",
		uarr: "↑",
		Uarr: "↟",
		uArr: "⇑",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		ubrcy: "ў",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Ucirc: "Û",
		ucirc: "û",
		Ucy: "У",
		ucy: "у",
		udarr: "⇅",
		Udblac: "Ű",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		Ufr,
		ufr,
		Ugrave: "Ù",
		ugrave: "ù",
		uHar: "⥣",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		Umacr: "Ū",
		umacr: "ū",
		uml: "¨",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		uogon: "ų",
		Uopf,
		uopf,
		UpArrowBar: "⤒",
		uparrow: "↑",
		UpArrow: "↑",
		Uparrow: "⇑",
		UpArrowDownArrow: "⇅",
		updownarrow: "↕",
		UpDownArrow: "↕",
		Updownarrow: "⇕",
		UpEquilibrium: "⥮",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		upsi: "υ",
		Upsi: "ϒ",
		upsih: "ϒ",
		Upsilon: "Υ",
		upsilon: "υ",
		UpTeeArrow: "↥",
		UpTee: "⊥",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		Uring: "Ů",
		uring: "ů",
		urtri: "◹",
		Uscr,
		uscr,
		utdot: "⋰",
		Utilde: "Ũ",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		Uuml: "Ü",
		uuml: "ü",
		uwangle: "⦧",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		varr: "↕",
		vArr: "⇕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq,
		varsubsetneqq,
		varsupsetneq,
		varsupsetneqq,
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		vBar: "⫨",
		Vbar: "⫫",
		vBarv: "⫩",
		Vcy: "В",
		vcy: "в",
		vdash: "⊢",
		vDash: "⊨",
		Vdash: "⊩",
		VDash: "⊫",
		Vdashl: "⫦",
		veebar: "⊻",
		vee: "∨",
		Vee: "⋁",
		veeeq: "≚",
		vellip: "⋮",
		verbar: "|",
		Verbar: "‖",
		vert: "|",
		Vert: "‖",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr,
		vfr,
		vltri: "⊲",
		vnsub,
		vnsup,
		Vopf,
		vopf,
		vprop: "∝",
		vrtri: "⊳",
		Vscr,
		vscr,
		vsubnE,
		vsubne,
		vsupnE,
		vsupne,
		Vvdash: "⊪",
		vzigzag: "⦚",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		wedbar: "⩟",
		wedge: "∧",
		Wedge: "⋀",
		wedgeq: "≙",
		weierp: "℘",
		Wfr,
		wfr,
		Wopf,
		wopf,
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		Wscr,
		wscr,
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		Xfr,
		xfr,
		xharr: "⟷",
		xhArr: "⟺",
		Xi: "Ξ",
		xi: "ξ",
		xlarr: "⟵",
		xlArr: "⟸",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		Xopf,
		xopf,
		xoplus: "⨁",
		xotime: "⨂",
		xrarr: "⟶",
		xrArr: "⟹",
		Xscr,
		xscr,
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		Yacute: "Ý",
		yacute: "ý",
		YAcy: "Я",
		yacy: "я",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Ycy: "Ы",
		ycy: "ы",
		yen: "¥",
		Yfr,
		yfr,
		YIcy: "Ї",
		yicy: "ї",
		Yopf,
		yopf,
		Yscr,
		yscr,
		YUcy: "Ю",
		yucy: "ю",
		yuml: "ÿ",
		Yuml: "Ÿ",
		Zacute: "Ź",
		zacute: "ź",
		Zcaron: "Ž",
		zcaron: "ž",
		Zcy: "З",
		zcy: "з",
		Zdot: "Ż",
		zdot: "ż",
		zeetrf: "ℨ",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		zeta: "ζ",
		zfr,
		Zfr: "ℨ",
		ZHcy: "Ж",
		zhcy: "ж",
		zigrarr: "⇝",
		zopf,
		Zopf: "ℤ",
		Zscr,
		zscr,
		zwj: "‍",
		zwnj: "‌"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/common/entities.js
var require_entities = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (init_entities(), __toCommonJS(entities_exports).default);
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/P/regex.js
var require_regex$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/encode.js
var require_encode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var encodeCache = {};
	function getEncodeCache(exclude) {
		var i, ch, cache = encodeCache[exclude];
		if (cache) return cache;
		cache = encodeCache[exclude] = [];
		for (i = 0; i < 128; i++) {
			ch = String.fromCharCode(i);
			if (/^[0-9a-z]$/i.test(ch)) cache.push(ch);
			else cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
		}
		for (i = 0; i < exclude.length; i++) cache[exclude.charCodeAt(i)] = exclude[i];
		return cache;
	}
	function encode(string, exclude, keepEscaped) {
		var i, l, code, nextCode, cache, result = "";
		if (typeof exclude !== "string") {
			keepEscaped = exclude;
			exclude = encode.defaultChars;
		}
		if (typeof keepEscaped === "undefined") keepEscaped = true;
		cache = getEncodeCache(exclude);
		for (i = 0, l = string.length; i < l; i++) {
			code = string.charCodeAt(i);
			if (keepEscaped && code === 37 && i + 2 < l) {
				if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
					result += string.slice(i, i + 3);
					i += 2;
					continue;
				}
			}
			if (code < 128) {
				result += cache[code];
				continue;
			}
			if (code >= 55296 && code <= 57343) {
				if (code >= 55296 && code <= 56319 && i + 1 < l) {
					nextCode = string.charCodeAt(i + 1);
					if (nextCode >= 56320 && nextCode <= 57343) {
						result += encodeURIComponent(string[i] + string[i + 1]);
						i++;
						continue;
					}
				}
				result += "%EF%BF%BD";
				continue;
			}
			result += encodeURIComponent(string[i]);
		}
		return result;
	}
	encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
	encode.componentChars = "-_.!~*'()";
	module.exports = encode;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/decode.js
var require_decode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var decodeCache = {};
	function getDecodeCache(exclude) {
		var i, ch, cache = decodeCache[exclude];
		if (cache) return cache;
		cache = decodeCache[exclude] = [];
		for (i = 0; i < 128; i++) {
			ch = String.fromCharCode(i);
			cache.push(ch);
		}
		for (i = 0; i < exclude.length; i++) {
			ch = exclude.charCodeAt(i);
			cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
		}
		return cache;
	}
	function decode(string, exclude) {
		var cache;
		if (typeof exclude !== "string") exclude = decode.defaultChars;
		cache = getDecodeCache(exclude);
		return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
			var i, l, b1, b2, b3, b4, chr, result = "";
			for (i = 0, l = seq.length; i < l; i += 3) {
				b1 = parseInt(seq.slice(i + 1, i + 3), 16);
				if (b1 < 128) {
					result += cache[b1];
					continue;
				}
				if ((b1 & 224) === 192 && i + 3 < l) {
					b2 = parseInt(seq.slice(i + 4, i + 6), 16);
					if ((b2 & 192) === 128) {
						chr = b1 << 6 & 1984 | b2 & 63;
						if (chr < 128) result += "��";
						else result += String.fromCharCode(chr);
						i += 3;
						continue;
					}
				}
				if ((b1 & 240) === 224 && i + 6 < l) {
					b2 = parseInt(seq.slice(i + 4, i + 6), 16);
					b3 = parseInt(seq.slice(i + 7, i + 9), 16);
					if ((b2 & 192) === 128 && (b3 & 192) === 128) {
						chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
						if (chr < 2048 || chr >= 55296 && chr <= 57343) result += "���";
						else result += String.fromCharCode(chr);
						i += 6;
						continue;
					}
				}
				if ((b1 & 248) === 240 && i + 9 < l) {
					b2 = parseInt(seq.slice(i + 4, i + 6), 16);
					b3 = parseInt(seq.slice(i + 7, i + 9), 16);
					b4 = parseInt(seq.slice(i + 10, i + 12), 16);
					if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
						chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
						if (chr < 65536 || chr > 1114111) result += "����";
						else {
							chr -= 65536;
							result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
						}
						i += 9;
						continue;
					}
				}
				result += "�";
			}
			return result;
		});
	}
	decode.defaultChars = ";/?:@&=+$,#";
	decode.componentChars = "";
	module.exports = decode;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/format.js
var require_format = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function format(url) {
		var result = "";
		result += url.protocol || "";
		result += url.slashes ? "//" : "";
		result += url.auth ? url.auth + "@" : "";
		if (url.hostname && url.hostname.indexOf(":") !== -1) result += "[" + url.hostname + "]";
		else result += url.hostname || "";
		result += url.port ? ":" + url.port : "";
		result += url.pathname || "";
		result += url.search || "";
		result += url.hash || "";
		return result;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function Url() {
		this.protocol = null;
		this.slashes = null;
		this.auth = null;
		this.port = null;
		this.hostname = null;
		this.hash = null;
		this.search = null;
		this.pathname = null;
	}
	var protocolPattern = /^([a-z0-9.+-]+:)/i;
	var portPattern = /:[0-9]*$/;
	var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
	var unwise = [
		"{",
		"}",
		"|",
		"\\",
		"^",
		"`"
	].concat([
		"<",
		">",
		"\"",
		"`",
		" ",
		"\r",
		"\n",
		"	"
	]);
	var autoEscape = ["'"].concat(unwise);
	var nonHostChars = [
		"%",
		"/",
		"?",
		";",
		"#"
	].concat(autoEscape);
	var hostEndingChars = [
		"/",
		"?",
		"#"
	];
	var hostnameMaxLen = 255;
	var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
	var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
	var hostlessProtocol = {
		"javascript": true,
		"javascript:": true
	};
	var slashedProtocol = {
		"http": true,
		"https": true,
		"ftp": true,
		"gopher": true,
		"file": true,
		"http:": true,
		"https:": true,
		"ftp:": true,
		"gopher:": true,
		"file:": true
	};
	function urlParse(url, slashesDenoteHost) {
		if (url && url instanceof Url) return url;
		var u = new Url();
		u.parse(url, slashesDenoteHost);
		return u;
	}
	Url.prototype.parse = function(url, slashesDenoteHost) {
		var i, l, lowerProto, hec, slashes, rest = url;
		rest = rest.trim();
		if (!slashesDenoteHost && url.split("#").length === 1) {
			var simplePath = simplePathPattern.exec(rest);
			if (simplePath) {
				this.pathname = simplePath[1];
				if (simplePath[2]) this.search = simplePath[2];
				return this;
			}
		}
		var proto = protocolPattern.exec(rest);
		if (proto) {
			proto = proto[0];
			lowerProto = proto.toLowerCase();
			this.protocol = proto;
			rest = rest.substr(proto.length);
		}
		if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
			slashes = rest.substr(0, 2) === "//";
			if (slashes && !(proto && hostlessProtocol[proto])) {
				rest = rest.substr(2);
				this.slashes = true;
			}
		}
		if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
			var hostEnd = -1;
			for (i = 0; i < hostEndingChars.length; i++) {
				hec = rest.indexOf(hostEndingChars[i]);
				if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
			}
			var auth, atSign;
			if (hostEnd === -1) atSign = rest.lastIndexOf("@");
			else atSign = rest.lastIndexOf("@", hostEnd);
			if (atSign !== -1) {
				auth = rest.slice(0, atSign);
				rest = rest.slice(atSign + 1);
				this.auth = auth;
			}
			hostEnd = -1;
			for (i = 0; i < nonHostChars.length; i++) {
				hec = rest.indexOf(nonHostChars[i]);
				if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
			}
			if (hostEnd === -1) hostEnd = rest.length;
			if (rest[hostEnd - 1] === ":") hostEnd--;
			var host = rest.slice(0, hostEnd);
			rest = rest.slice(hostEnd);
			this.parseHost(host);
			this.hostname = this.hostname || "";
			var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
			if (!ipv6Hostname) {
				var hostparts = this.hostname.split(/\./);
				for (i = 0, l = hostparts.length; i < l; i++) {
					var part = hostparts[i];
					if (!part) continue;
					if (!part.match(hostnamePartPattern)) {
						var newpart = "";
						for (var j = 0, k = part.length; j < k; j++) if (part.charCodeAt(j) > 127) newpart += "x";
						else newpart += part[j];
						if (!newpart.match(hostnamePartPattern)) {
							var validParts = hostparts.slice(0, i);
							var notHost = hostparts.slice(i + 1);
							var bit = part.match(hostnamePartStart);
							if (bit) {
								validParts.push(bit[1]);
								notHost.unshift(bit[2]);
							}
							if (notHost.length) rest = notHost.join(".") + rest;
							this.hostname = validParts.join(".");
							break;
						}
					}
				}
			}
			if (this.hostname.length > hostnameMaxLen) this.hostname = "";
			if (ipv6Hostname) this.hostname = this.hostname.substr(1, this.hostname.length - 2);
		}
		var hash = rest.indexOf("#");
		if (hash !== -1) {
			this.hash = rest.substr(hash);
			rest = rest.slice(0, hash);
		}
		var qm = rest.indexOf("?");
		if (qm !== -1) {
			this.search = rest.substr(qm);
			rest = rest.slice(0, qm);
		}
		if (rest) this.pathname = rest;
		if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = "";
		return this;
	};
	Url.prototype.parseHost = function(host) {
		var port = portPattern.exec(host);
		if (port) {
			port = port[0];
			if (port !== ":") this.port = port.substr(1);
			host = host.substr(0, host.length - port.length);
		}
		if (host) this.hostname = host;
	};
	module.exports = urlParse;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/index.js
var require_mdurl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.encode = require_encode();
	module.exports.decode = require_decode();
	module.exports.format = require_format();
	module.exports.parse = require_parse();
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/properties/Any/regex.js
var require_regex$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cc/regex.js
var require_regex$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[\0-\x1F\x7F-\x9F]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cf/regex.js
var require_regex$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Z/regex.js
var require_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/index.js
var require_uc_micro = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.Any = require_regex$3();
	exports.Cc = require_regex$2();
	exports.Cf = require_regex$1();
	exports.P = require_regex$4();
	exports.Z = require_regex();
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/common/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	function _class(obj) {
		return Object.prototype.toString.call(obj);
	}
	function isString(obj) {
		return _class(obj) === "[object String]";
	}
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	function has(object, key) {
		return _hasOwnProperty.call(object, key);
	}
	function assign(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			if (!source) return;
			if (typeof source !== "object") throw new TypeError(source + "must be object");
			Object.keys(source).forEach(function(key) {
				obj[key] = source[key];
			});
		});
		return obj;
	}
	function arrayReplaceAt(src, pos, newElements) {
		return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
	}
	function isValidEntityCode(c) {
		if (c >= 55296 && c <= 57343) return false;
		if (c >= 64976 && c <= 65007) return false;
		if ((c & 65535) === 65535 || (c & 65535) === 65534) return false;
		if (c >= 0 && c <= 8) return false;
		if (c === 11) return false;
		if (c >= 14 && c <= 31) return false;
		if (c >= 127 && c <= 159) return false;
		if (c > 1114111) return false;
		return true;
	}
	function fromCodePoint(c) {
		if (c > 65535) {
			c -= 65536;
			var surrogate1 = 55296 + (c >> 10), surrogate2 = 56320 + (c & 1023);
			return String.fromCharCode(surrogate1, surrogate2);
		}
		return String.fromCharCode(c);
	}
	var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
	var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi");
	var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
	var entities = require_entities();
	function replaceEntityPattern(match, name) {
		var code;
		if (has(entities, name)) return entities[name];
		if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
			code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
			if (isValidEntityCode(code)) return fromCodePoint(code);
		}
		return match;
	}
	function unescapeMd(str) {
		if (str.indexOf("\\") < 0) return str;
		return str.replace(UNESCAPE_MD_RE, "$1");
	}
	function unescapeAll(str) {
		if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) return str;
		return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
			if (escaped) return escaped;
			return replaceEntityPattern(match, entity);
		});
	}
	var HTML_ESCAPE_TEST_RE = /[&<>"]/;
	var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
	var HTML_REPLACEMENTS = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	};
	function replaceUnsafeChar(ch) {
		return HTML_REPLACEMENTS[ch];
	}
	function escapeHtml(str) {
		if (HTML_ESCAPE_TEST_RE.test(str)) return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
		return str;
	}
	var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
	function escapeRE(str) {
		return str.replace(REGEXP_ESCAPE_RE, "\\$&");
	}
	function isSpace(code) {
		switch (code) {
			case 9:
			case 32: return true;
		}
		return false;
	}
	function isWhiteSpace(code) {
		if (code >= 8192 && code <= 8202) return true;
		switch (code) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 32:
			case 160:
			case 5760:
			case 8239:
			case 8287:
			case 12288: return true;
		}
		return false;
	}
	var UNICODE_PUNCT_RE = require_regex$4();
	function isPunctChar(ch) {
		return UNICODE_PUNCT_RE.test(ch);
	}
	function isMdAsciiPunct(ch) {
		switch (ch) {
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 123:
			case 124:
			case 125:
			case 126: return true;
			default: return false;
		}
	}
	function normalizeReference(str) {
		str = str.trim().replace(/\s+/g, " ");
		if ("ẞ".toLowerCase() === "Ṿ") str = str.replace(/ẞ/g, "ß");
		return str.toLowerCase().toUpperCase();
	}
	exports.lib = {};
	exports.lib.mdurl = require_mdurl();
	exports.lib.ucmicro = require_uc_micro();
	exports.assign = assign;
	exports.isString = isString;
	exports.has = has;
	exports.unescapeMd = unescapeMd;
	exports.unescapeAll = unescapeAll;
	exports.isValidEntityCode = isValidEntityCode;
	exports.fromCodePoint = fromCodePoint;
	exports.escapeHtml = escapeHtml;
	exports.arrayReplaceAt = arrayReplaceAt;
	exports.isSpace = isSpace;
	exports.isWhiteSpace = isWhiteSpace;
	exports.isMdAsciiPunct = isMdAsciiPunct;
	exports.isPunctChar = isPunctChar;
	exports.escapeRE = escapeRE;
	exports.normalizeReference = normalizeReference;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/helpers/parse_link_label.js
var require_parse_link_label = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function parseLinkLabel(state, start, disableNested) {
		var level, found, marker, prevPos, labelEnd = -1, max = state.posMax, oldPos = state.pos;
		state.pos = start + 1;
		level = 1;
		while (state.pos < max) {
			marker = state.src.charCodeAt(state.pos);
			if (marker === 93) {
				level--;
				if (level === 0) {
					found = true;
					break;
				}
			}
			prevPos = state.pos;
			state.md.inline.skipToken(state);
			if (marker === 91) {
				if (prevPos === state.pos - 1) level++;
				else if (disableNested) {
					state.pos = oldPos;
					return -1;
				}
			}
		}
		if (found) labelEnd = state.pos;
		state.pos = oldPos;
		return labelEnd;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/helpers/parse_link_destination.js
var require_parse_link_destination = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var unescapeAll = require_utils().unescapeAll;
	module.exports = function parseLinkDestination(str, start, max) {
		var code, level, pos = start, result = {
			ok: false,
			pos: 0,
			lines: 0,
			str: ""
		};
		if (str.charCodeAt(pos) === 60) {
			pos++;
			while (pos < max) {
				code = str.charCodeAt(pos);
				if (code === 10) return result;
				if (code === 60) return result;
				if (code === 62) {
					result.pos = pos + 1;
					result.str = unescapeAll(str.slice(start + 1, pos));
					result.ok = true;
					return result;
				}
				if (code === 92 && pos + 1 < max) {
					pos += 2;
					continue;
				}
				pos++;
			}
			return result;
		}
		level = 0;
		while (pos < max) {
			code = str.charCodeAt(pos);
			if (code === 32) break;
			if (code < 32 || code === 127) break;
			if (code === 92 && pos + 1 < max) {
				if (str.charCodeAt(pos + 1) === 32) break;
				pos += 2;
				continue;
			}
			if (code === 40) {
				level++;
				if (level > 32) return result;
			}
			if (code === 41) {
				if (level === 0) break;
				level--;
			}
			pos++;
		}
		if (start === pos) return result;
		if (level !== 0) return result;
		result.str = unescapeAll(str.slice(start, pos));
		result.pos = pos;
		result.ok = true;
		return result;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/helpers/parse_link_title.js
var require_parse_link_title = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var unescapeAll = require_utils().unescapeAll;
	module.exports = function parseLinkTitle(str, start, max) {
		var code, marker, lines = 0, pos = start, result = {
			ok: false,
			pos: 0,
			lines: 0,
			str: ""
		};
		if (pos >= max) return result;
		marker = str.charCodeAt(pos);
		if (marker !== 34 && marker !== 39 && marker !== 40) return result;
		pos++;
		if (marker === 40) marker = 41;
		while (pos < max) {
			code = str.charCodeAt(pos);
			if (code === marker) {
				result.pos = pos + 1;
				result.lines = lines;
				result.str = unescapeAll(str.slice(start + 1, pos));
				result.ok = true;
				return result;
			} else if (code === 40 && marker === 41) return result;
			else if (code === 10) lines++;
			else if (code === 92 && pos + 1 < max) {
				pos++;
				if (str.charCodeAt(pos) === 10) lines++;
			}
			pos++;
		}
		return result;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/helpers/index.js
var require_helpers = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.parseLinkLabel = require_parse_link_label();
	exports.parseLinkDestination = require_parse_link_destination();
	exports.parseLinkTitle = require_parse_link_title();
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/renderer.js
/**
* class Renderer
*
* Generates HTML from parsed token stream. Each instance has independent
* copy of rules. Those can be rewritten with ease. Also, you can add new
* rules if you create plugin and adds new token types.
**/
var require_renderer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign = require_utils().assign;
	var unescapeAll = require_utils().unescapeAll;
	var escapeHtml = require_utils().escapeHtml;
	var default_rules = {};
	default_rules.code_inline = function(tokens, idx, options, env, slf) {
		var token = tokens[idx];
		return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
	};
	default_rules.code_block = function(tokens, idx, options, env, slf) {
		var token = tokens[idx];
		return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
	};
	default_rules.fence = function(tokens, idx, options, env, slf) {
		var token = tokens[idx], info = token.info ? unescapeAll(token.info).trim() : "", langName = "", langAttrs = "", highlighted, i, arr, tmpAttrs, tmpToken;
		if (info) {
			arr = info.split(/(\s+)/g);
			langName = arr[0];
			langAttrs = arr.slice(2).join("");
		}
		if (options.highlight) highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
		else highlighted = escapeHtml(token.content);
		if (highlighted.indexOf("<pre") === 0) return highlighted + "\n";
		if (info) {
			i = token.attrIndex("class");
			tmpAttrs = token.attrs ? token.attrs.slice() : [];
			if (i < 0) tmpAttrs.push(["class", options.langPrefix + langName]);
			else {
				tmpAttrs[i] = tmpAttrs[i].slice();
				tmpAttrs[i][1] += " " + options.langPrefix + langName;
			}
			tmpToken = { attrs: tmpAttrs };
			return "<pre><code" + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n";
		}
		return "<pre><code" + slf.renderAttrs(token) + ">" + highlighted + "</code></pre>\n";
	};
	default_rules.image = function(tokens, idx, options, env, slf) {
		var token = tokens[idx];
		token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
		return slf.renderToken(tokens, idx, options);
	};
	default_rules.hardbreak = function(tokens, idx, options) {
		return options.xhtmlOut ? "<br />\n" : "<br>\n";
	};
	default_rules.softbreak = function(tokens, idx, options) {
		return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
	};
	default_rules.text = function(tokens, idx) {
		return escapeHtml(tokens[idx].content);
	};
	default_rules.html_block = function(tokens, idx) {
		return tokens[idx].content;
	};
	default_rules.html_inline = function(tokens, idx) {
		return tokens[idx].content;
	};
	/**
	* new Renderer()
	*
	* Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
	**/
	function Renderer() {
		/**
		* Renderer#rules -> Object
		*
		* Contains render rules for tokens. Can be updated and extended.
		*
		* ##### Example
		*
		* ```javascript
		* var md = require('markdown-it')();
		*
		* md.renderer.rules.strong_open  = function () { return '<b>'; };
		* md.renderer.rules.strong_close = function () { return '</b>'; };
		*
		* var result = md.renderInline(...);
		* ```
		*
		* Each rule is called as independent static function with fixed signature:
		*
		* ```javascript
		* function my_token_render(tokens, idx, options, env, renderer) {
		*   // ...
		*   return renderedHTML;
		* }
		* ```
		*
		* See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
		* for more details and examples.
		**/
		this.rules = assign({}, default_rules);
	}
	/**
	* Renderer.renderAttrs(token) -> String
	*
	* Render token attributes to string.
	**/
	Renderer.prototype.renderAttrs = function renderAttrs(token) {
		var i, l, result;
		if (!token.attrs) return "";
		result = "";
		for (i = 0, l = token.attrs.length; i < l; i++) result += " " + escapeHtml(token.attrs[i][0]) + "=\"" + escapeHtml(token.attrs[i][1]) + "\"";
		return result;
	};
	/**
	* Renderer.renderToken(tokens, idx, options) -> String
	* - tokens (Array): list of tokens
	* - idx (Numbed): token index to render
	* - options (Object): params of parser instance
	*
	* Default token renderer. Can be overriden by custom function
	* in [[Renderer#rules]].
	**/
	Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
		var nextToken, result = "", needLf = false, token = tokens[idx];
		if (token.hidden) return "";
		if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) result += "\n";
		result += (token.nesting === -1 ? "</" : "<") + token.tag;
		result += this.renderAttrs(token);
		if (token.nesting === 0 && options.xhtmlOut) result += " /";
		if (token.block) {
			needLf = true;
			if (token.nesting === 1) {
				if (idx + 1 < tokens.length) {
					nextToken = tokens[idx + 1];
					if (nextToken.type === "inline" || nextToken.hidden) needLf = false;
					else if (nextToken.nesting === -1 && nextToken.tag === token.tag) needLf = false;
				}
			}
		}
		result += needLf ? ">\n" : ">";
		return result;
	};
	/**
	* Renderer.renderInline(tokens, options, env) -> String
	* - tokens (Array): list on block tokens to render
	* - options (Object): params of parser instance
	* - env (Object): additional data from parsed input (references, for example)
	*
	* The same as [[Renderer.render]], but for single token of `inline` type.
	**/
	Renderer.prototype.renderInline = function(tokens, options, env) {
		var type, result = "", rules = this.rules;
		for (var i = 0, len = tokens.length; i < len; i++) {
			type = tokens[i].type;
			if (typeof rules[type] !== "undefined") result += rules[type](tokens, i, options, env, this);
			else result += this.renderToken(tokens, i, options);
		}
		return result;
	};
	/** internal
	* Renderer.renderInlineAsText(tokens, options, env) -> String
	* - tokens (Array): list on block tokens to render
	* - options (Object): params of parser instance
	* - env (Object): additional data from parsed input (references, for example)
	*
	* Special kludge for image `alt` attributes to conform CommonMark spec.
	* Don't try to use it! Spec requires to show `alt` content with stripped markup,
	* instead of simple escaping.
	**/
	Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
		var result = "";
		for (var i = 0, len = tokens.length; i < len; i++) if (tokens[i].type === "text") result += tokens[i].content;
		else if (tokens[i].type === "image") result += this.renderInlineAsText(tokens[i].children, options, env);
		else if (tokens[i].type === "softbreak") result += "\n";
		return result;
	};
	/**
	* Renderer.render(tokens, options, env) -> String
	* - tokens (Array): list on block tokens to render
	* - options (Object): params of parser instance
	* - env (Object): additional data from parsed input (references, for example)
	*
	* Takes token stream and generates HTML. Probably, you will never need to call
	* this method directly.
	**/
	Renderer.prototype.render = function(tokens, options, env) {
		var i, len, type, result = "", rules = this.rules;
		for (i = 0, len = tokens.length; i < len; i++) {
			type = tokens[i].type;
			if (type === "inline") result += this.renderInline(tokens[i].children, options, env);
			else if (typeof rules[type] !== "undefined") result += rules[type](tokens, i, options, env, this);
			else result += this.renderToken(tokens, i, options, env);
		}
		return result;
	};
	module.exports = Renderer;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/ruler.js
/**
* class Ruler
*
* Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
* [[MarkdownIt#inline]] to manage sequences of functions (rules):
*
* - keep rules in defined order
* - assign the name to each rule
* - enable/disable rules
* - add/replace rules
* - allow assign rules to additional named chains (in the same)
* - cacheing lists of active rules
*
* You will not need use this class directly until write plugins. For simple
* rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
* [[MarkdownIt.use]].
**/
var require_ruler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* new Ruler()
	**/
	function Ruler() {
		this.__rules__ = [];
		this.__cache__ = null;
	}
	Ruler.prototype.__find__ = function(name) {
		for (var i = 0; i < this.__rules__.length; i++) if (this.__rules__[i].name === name) return i;
		return -1;
	};
	Ruler.prototype.__compile__ = function() {
		var self = this;
		var chains = [""];
		self.__rules__.forEach(function(rule) {
			if (!rule.enabled) return;
			rule.alt.forEach(function(altName) {
				if (chains.indexOf(altName) < 0) chains.push(altName);
			});
		});
		self.__cache__ = {};
		chains.forEach(function(chain) {
			self.__cache__[chain] = [];
			self.__rules__.forEach(function(rule) {
				if (!rule.enabled) return;
				if (chain && rule.alt.indexOf(chain) < 0) return;
				self.__cache__[chain].push(rule.fn);
			});
		});
	};
	/**
	* Ruler.at(name, fn [, options])
	* - name (String): rule name to replace.
	* - fn (Function): new rule function.
	* - options (Object): new rule options (not mandatory).
	*
	* Replace rule by name with new function & options. Throws error if name not
	* found.
	*
	* ##### Options:
	*
	* - __alt__ - array with names of "alternate" chains.
	*
	* ##### Example
	*
	* Replace existing typographer replacement rule with new one:
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* md.core.ruler.at('replacements', function replace(state) {
	*   //...
	* });
	* ```
	**/
	Ruler.prototype.at = function(name, fn, options) {
		var index = this.__find__(name);
		var opt = options || {};
		if (index === -1) throw new Error("Parser rule not found: " + name);
		this.__rules__[index].fn = fn;
		this.__rules__[index].alt = opt.alt || [];
		this.__cache__ = null;
	};
	/**
	* Ruler.before(beforeName, ruleName, fn [, options])
	* - beforeName (String): new rule will be added before this one.
	* - ruleName (String): name of added rule.
	* - fn (Function): rule function.
	* - options (Object): rule options (not mandatory).
	*
	* Add new rule to chain before one with given name. See also
	* [[Ruler.after]], [[Ruler.push]].
	*
	* ##### Options:
	*
	* - __alt__ - array with names of "alternate" chains.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
	*   //...
	* });
	* ```
	**/
	Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
		var index = this.__find__(beforeName);
		var opt = options || {};
		if (index === -1) throw new Error("Parser rule not found: " + beforeName);
		this.__rules__.splice(index, 0, {
			name: ruleName,
			enabled: true,
			fn,
			alt: opt.alt || []
		});
		this.__cache__ = null;
	};
	/**
	* Ruler.after(afterName, ruleName, fn [, options])
	* - afterName (String): new rule will be added after this one.
	* - ruleName (String): name of added rule.
	* - fn (Function): rule function.
	* - options (Object): rule options (not mandatory).
	*
	* Add new rule to chain after one with given name. See also
	* [[Ruler.before]], [[Ruler.push]].
	*
	* ##### Options:
	*
	* - __alt__ - array with names of "alternate" chains.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* md.inline.ruler.after('text', 'my_rule', function replace(state) {
	*   //...
	* });
	* ```
	**/
	Ruler.prototype.after = function(afterName, ruleName, fn, options) {
		var index = this.__find__(afterName);
		var opt = options || {};
		if (index === -1) throw new Error("Parser rule not found: " + afterName);
		this.__rules__.splice(index + 1, 0, {
			name: ruleName,
			enabled: true,
			fn,
			alt: opt.alt || []
		});
		this.__cache__ = null;
	};
	/**
	* Ruler.push(ruleName, fn [, options])
	* - ruleName (String): name of added rule.
	* - fn (Function): rule function.
	* - options (Object): rule options (not mandatory).
	*
	* Push new rule to the end of chain. See also
	* [[Ruler.before]], [[Ruler.after]].
	*
	* ##### Options:
	*
	* - __alt__ - array with names of "alternate" chains.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* md.core.ruler.push('my_rule', function replace(state) {
	*   //...
	* });
	* ```
	**/
	Ruler.prototype.push = function(ruleName, fn, options) {
		var opt = options || {};
		this.__rules__.push({
			name: ruleName,
			enabled: true,
			fn,
			alt: opt.alt || []
		});
		this.__cache__ = null;
	};
	/**
	* Ruler.enable(list [, ignoreInvalid]) -> Array
	* - list (String|Array): list of rule names to enable.
	* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	*
	* Enable rules with given names. If any rule name not found - throw Error.
	* Errors can be disabled by second param.
	*
	* Returns list of found rule names (if no exception happened).
	*
	* See also [[Ruler.disable]], [[Ruler.enableOnly]].
	**/
	Ruler.prototype.enable = function(list, ignoreInvalid) {
		if (!Array.isArray(list)) list = [list];
		var result = [];
		list.forEach(function(name) {
			var idx = this.__find__(name);
			if (idx < 0) {
				if (ignoreInvalid) return;
				throw new Error("Rules manager: invalid rule name " + name);
			}
			this.__rules__[idx].enabled = true;
			result.push(name);
		}, this);
		this.__cache__ = null;
		return result;
	};
	/**
	* Ruler.enableOnly(list [, ignoreInvalid])
	* - list (String|Array): list of rule names to enable (whitelist).
	* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	*
	* Enable rules with given names, and disable everything else. If any rule name
	* not found - throw Error. Errors can be disabled by second param.
	*
	* See also [[Ruler.disable]], [[Ruler.enable]].
	**/
	Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
		if (!Array.isArray(list)) list = [list];
		this.__rules__.forEach(function(rule) {
			rule.enabled = false;
		});
		this.enable(list, ignoreInvalid);
	};
	/**
	* Ruler.disable(list [, ignoreInvalid]) -> Array
	* - list (String|Array): list of rule names to disable.
	* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	*
	* Disable rules with given names. If any rule name not found - throw Error.
	* Errors can be disabled by second param.
	*
	* Returns list of found rule names (if no exception happened).
	*
	* See also [[Ruler.enable]], [[Ruler.enableOnly]].
	**/
	Ruler.prototype.disable = function(list, ignoreInvalid) {
		if (!Array.isArray(list)) list = [list];
		var result = [];
		list.forEach(function(name) {
			var idx = this.__find__(name);
			if (idx < 0) {
				if (ignoreInvalid) return;
				throw new Error("Rules manager: invalid rule name " + name);
			}
			this.__rules__[idx].enabled = false;
			result.push(name);
		}, this);
		this.__cache__ = null;
		return result;
	};
	/**
	* Ruler.getRules(chainName) -> Array
	*
	* Return array of active functions (rules) for given chain name. It analyzes
	* rules configuration, compiles caches if not exists and returns result.
	*
	* Default chain name is `''` (empty string). It can't be skipped. That's
	* done intentionally, to keep signature monomorphic for high speed.
	**/
	Ruler.prototype.getRules = function(chainName) {
		if (this.__cache__ === null) this.__compile__();
		return this.__cache__[chainName] || [];
	};
	module.exports = Ruler;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/normalize.js
var require_normalize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NEWLINES_RE = /\r\n?|\n/g;
	var NULL_RE = /\0/g;
	module.exports = function normalize(state) {
		var str = state.src.replace(NEWLINES_RE, "\n");
		str = str.replace(NULL_RE, "�");
		state.src = str;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/block.js
var require_block = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function block(state) {
		var token;
		if (state.inlineMode) {
			token = new state.Token("inline", "", 0);
			token.content = state.src;
			token.map = [0, 1];
			token.children = [];
			state.tokens.push(token);
		} else state.md.block.parse(state.src, state.md, state.env, state.tokens);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/inline.js
var require_inline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function inline(state) {
		var tokens = state.tokens, tok, i = 0, l = tokens.length;
		for (; i < l; i++) {
			tok = tokens[i];
			if (tok.type === "inline") state.md.inline.parse(tok.content, state.md, state.env, tok.children);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/linkify.js
var require_linkify$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayReplaceAt = require_utils().arrayReplaceAt;
	function isLinkOpen(str) {
		return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
		return /^<\/a\s*>/i.test(str);
	}
	module.exports = function linkify(state) {
		var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos, level, htmlLinkLevel, url, fullUrl, urlText, blockTokens = state.tokens, links;
		if (!state.md.options.linkify) return;
		for (j = 0, l = blockTokens.length; j < l; j++) {
			if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) continue;
			tokens = blockTokens[j].children;
			htmlLinkLevel = 0;
			for (i = tokens.length - 1; i >= 0; i--) {
				currentToken = tokens[i];
				if (currentToken.type === "link_close") {
					i--;
					while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") i--;
					continue;
				}
				if (currentToken.type === "html_inline") {
					if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) htmlLinkLevel--;
					if (isLinkClose(currentToken.content)) htmlLinkLevel++;
				}
				if (htmlLinkLevel > 0) continue;
				if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
					text = currentToken.content;
					links = state.md.linkify.match(text);
					nodes = [];
					level = currentToken.level;
					lastPos = 0;
					if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") links = links.slice(1);
					for (ln = 0; ln < links.length; ln++) {
						url = links[ln].url;
						fullUrl = state.md.normalizeLink(url);
						if (!state.md.validateLink(fullUrl)) continue;
						urlText = links[ln].text;
						if (!links[ln].schema) urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
						else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
						else urlText = state.md.normalizeLinkText(urlText);
						pos = links[ln].index;
						if (pos > lastPos) {
							token = new state.Token("text", "", 0);
							token.content = text.slice(lastPos, pos);
							token.level = level;
							nodes.push(token);
						}
						token = new state.Token("link_open", "a", 1);
						token.attrs = [["href", fullUrl]];
						token.level = level++;
						token.markup = "linkify";
						token.info = "auto";
						nodes.push(token);
						token = new state.Token("text", "", 0);
						token.content = urlText;
						token.level = level;
						nodes.push(token);
						token = new state.Token("link_close", "a", -1);
						token.level = --level;
						token.markup = "linkify";
						token.info = "auto";
						nodes.push(token);
						lastPos = links[ln].lastIndex;
					}
					if (lastPos < text.length) {
						token = new state.Token("text", "", 0);
						token.content = text.slice(lastPos);
						token.level = level;
						nodes.push(token);
					}
					blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
				}
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/replacements.js
var require_replacements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
	var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
	var SCOPED_ABBR_RE = /\((c|tm|r)\)/gi;
	var SCOPED_ABBR = {
		c: "©",
		r: "®",
		tm: "™"
	};
	function replaceFn(match, name) {
		return SCOPED_ABBR[name.toLowerCase()];
	}
	function replace_scoped(inlineTokens) {
		var i, token, inside_autolink = 0;
		for (i = inlineTokens.length - 1; i >= 0; i--) {
			token = inlineTokens[i];
			if (token.type === "text" && !inside_autolink) token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
			if (token.type === "link_open" && token.info === "auto") inside_autolink--;
			if (token.type === "link_close" && token.info === "auto") inside_autolink++;
		}
	}
	function replace_rare(inlineTokens) {
		var i, token, inside_autolink = 0;
		for (i = inlineTokens.length - 1; i >= 0; i--) {
			token = inlineTokens[i];
			if (token.type === "text" && !inside_autolink) {
				if (RARE_RE.test(token.content)) token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–");
			}
			if (token.type === "link_open" && token.info === "auto") inside_autolink--;
			if (token.type === "link_close" && token.info === "auto") inside_autolink++;
		}
	}
	module.exports = function replace(state) {
		var blkIdx;
		if (!state.md.options.typographer) return;
		for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
			if (state.tokens[blkIdx].type !== "inline") continue;
			if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) replace_scoped(state.tokens[blkIdx].children);
			if (RARE_RE.test(state.tokens[blkIdx].content)) replace_rare(state.tokens[blkIdx].children);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/smartquotes.js
var require_smartquotes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isWhiteSpace = require_utils().isWhiteSpace;
	var isPunctChar = require_utils().isPunctChar;
	var isMdAsciiPunct = require_utils().isMdAsciiPunct;
	var QUOTE_TEST_RE = /['"]/;
	var QUOTE_RE = /['"]/g;
	var APOSTROPHE = "’";
	function replaceAt(str, index, ch) {
		return str.slice(0, index) + ch + str.slice(index + 1);
	}
	function process_inlines(tokens, state) {
		var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar, isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace, canOpen, canClose, j, isSingle, stack = [], openQuote, closeQuote;
		for (i = 0; i < tokens.length; i++) {
			token = tokens[i];
			thisLevel = tokens[i].level;
			for (j = stack.length - 1; j >= 0; j--) if (stack[j].level <= thisLevel) break;
			stack.length = j + 1;
			if (token.type !== "text") continue;
			text = token.content;
			pos = 0;
			max = text.length;
			OUTER: while (pos < max) {
				QUOTE_RE.lastIndex = pos;
				t = QUOTE_RE.exec(text);
				if (!t) break;
				canOpen = canClose = true;
				pos = t.index + 1;
				isSingle = t[0] === "'";
				lastChar = 32;
				if (t.index - 1 >= 0) lastChar = text.charCodeAt(t.index - 1);
				else for (j = i - 1; j >= 0; j--) {
					if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
					if (!tokens[j].content) continue;
					lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
					break;
				}
				nextChar = 32;
				if (pos < max) nextChar = text.charCodeAt(pos);
				else for (j = i + 1; j < tokens.length; j++) {
					if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
					if (!tokens[j].content) continue;
					nextChar = tokens[j].content.charCodeAt(0);
					break;
				}
				isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
				isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
				isLastWhiteSpace = isWhiteSpace(lastChar);
				isNextWhiteSpace = isWhiteSpace(nextChar);
				if (isNextWhiteSpace) canOpen = false;
				else if (isNextPunctChar) {
					if (!(isLastWhiteSpace || isLastPunctChar)) canOpen = false;
				}
				if (isLastWhiteSpace) canClose = false;
				else if (isLastPunctChar) {
					if (!(isNextWhiteSpace || isNextPunctChar)) canClose = false;
				}
				if (nextChar === 34 && t[0] === "\"") {
					if (lastChar >= 48 && lastChar <= 57) canClose = canOpen = false;
				}
				if (canOpen && canClose) {
					canOpen = isLastPunctChar;
					canClose = isNextPunctChar;
				}
				if (!canOpen && !canClose) {
					if (isSingle) token.content = replaceAt(token.content, t.index, APOSTROPHE);
					continue;
				}
				if (canClose) for (j = stack.length - 1; j >= 0; j--) {
					item = stack[j];
					if (stack[j].level < thisLevel) break;
					if (item.single === isSingle && stack[j].level === thisLevel) {
						item = stack[j];
						if (isSingle) {
							openQuote = state.md.options.quotes[2];
							closeQuote = state.md.options.quotes[3];
						} else {
							openQuote = state.md.options.quotes[0];
							closeQuote = state.md.options.quotes[1];
						}
						token.content = replaceAt(token.content, t.index, closeQuote);
						tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
						pos += closeQuote.length - 1;
						if (item.token === i) pos += openQuote.length - 1;
						text = token.content;
						max = text.length;
						stack.length = j;
						continue OUTER;
					}
				}
				if (canOpen) stack.push({
					token: i,
					pos: t.index,
					single: isSingle,
					level: thisLevel
				});
				else if (canClose && isSingle) token.content = replaceAt(token.content, t.index, APOSTROPHE);
			}
		}
	}
	module.exports = function smartquotes(state) {
		var blkIdx;
		if (!state.md.options.typographer) return;
		for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
			if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) continue;
			process_inlines(state.tokens[blkIdx].children, state);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/text_join.js
var require_text_join = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function text_join(state) {
		var j, l, tokens, curr, max, last, blockTokens = state.tokens;
		for (j = 0, l = blockTokens.length; j < l; j++) {
			if (blockTokens[j].type !== "inline") continue;
			tokens = blockTokens[j].children;
			max = tokens.length;
			for (curr = 0; curr < max; curr++) if (tokens[curr].type === "text_special") tokens[curr].type = "text";
			for (curr = last = 0; curr < max; curr++) if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
			else {
				if (curr !== last) tokens[last] = tokens[curr];
				last++;
			}
			if (curr !== last) tokens.length = last;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/token.js
var require_token = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* class Token
	**/
	/**
	* new Token(type, tag, nesting)
	*
	* Create new token and fill passed properties.
	**/
	function Token(type, tag, nesting) {
		/**
		* Token#type -> String
		*
		* Type of the token (string, e.g. "paragraph_open")
		**/
		this.type = type;
		/**
		* Token#tag -> String
		*
		* html tag name, e.g. "p"
		**/
		this.tag = tag;
		/**
		* Token#attrs -> Array
		*
		* Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
		**/
		this.attrs = null;
		/**
		* Token#map -> Array
		*
		* Source map info. Format: `[ line_begin, line_end ]`
		**/
		this.map = null;
		/**
		* Token#nesting -> Number
		*
		* Level change (number in {-1, 0, 1} set), where:
		*
		* -  `1` means the tag is opening
		* -  `0` means the tag is self-closing
		* - `-1` means the tag is closing
		**/
		this.nesting = nesting;
		/**
		* Token#level -> Number
		*
		* nesting level, the same as `state.level`
		**/
		this.level = 0;
		/**
		* Token#children -> Array
		*
		* An array of child nodes (inline and img tokens)
		**/
		this.children = null;
		/**
		* Token#content -> String
		*
		* In a case of self-closing tag (code, html, fence, etc.),
		* it has contents of this tag.
		**/
		this.content = "";
		/**
		* Token#markup -> String
		*
		* '*' or '_' for emphasis, fence string for fence, etc.
		**/
		this.markup = "";
		/**
		* Token#info -> String
		*
		* Additional information:
		*
		* - Info string for "fence" tokens
		* - The value "auto" for autolink "link_open" and "link_close" tokens
		* - The string value of the item marker for ordered-list "list_item_open" tokens
		**/
		this.info = "";
		/**
		* Token#meta -> Object
		*
		* A place for plugins to store an arbitrary data
		**/
		this.meta = null;
		/**
		* Token#block -> Boolean
		*
		* True for block-level tokens, false for inline tokens.
		* Used in renderer to calculate line breaks
		**/
		this.block = false;
		/**
		* Token#hidden -> Boolean
		*
		* If it's true, ignore this element when rendering. Used for tight lists
		* to hide paragraphs.
		**/
		this.hidden = false;
	}
	/**
	* Token.attrIndex(name) -> Number
	*
	* Search attribute index by name.
	**/
	Token.prototype.attrIndex = function attrIndex(name) {
		var attrs, i, len;
		if (!this.attrs) return -1;
		attrs = this.attrs;
		for (i = 0, len = attrs.length; i < len; i++) if (attrs[i][0] === name) return i;
		return -1;
	};
	/**
	* Token.attrPush(attrData)
	*
	* Add `[ name, value ]` attribute to list. Init attrs if necessary
	**/
	Token.prototype.attrPush = function attrPush(attrData) {
		if (this.attrs) this.attrs.push(attrData);
		else this.attrs = [attrData];
	};
	/**
	* Token.attrSet(name, value)
	*
	* Set `name` attribute to `value`. Override old value if exists.
	**/
	Token.prototype.attrSet = function attrSet(name, value) {
		var idx = this.attrIndex(name), attrData = [name, value];
		if (idx < 0) this.attrPush(attrData);
		else this.attrs[idx] = attrData;
	};
	/**
	* Token.attrGet(name)
	*
	* Get the value of attribute `name`, or null if it does not exist.
	**/
	Token.prototype.attrGet = function attrGet(name) {
		var idx = this.attrIndex(name), value = null;
		if (idx >= 0) value = this.attrs[idx][1];
		return value;
	};
	/**
	* Token.attrJoin(name, value)
	*
	* Join value to existing attribute via space. Or create new attribute if not
	* exists. Useful to operate with token classes.
	**/
	Token.prototype.attrJoin = function attrJoin(name, value) {
		var idx = this.attrIndex(name);
		if (idx < 0) this.attrPush([name, value]);
		else this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
	};
	module.exports = Token;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_core/state_core.js
var require_state_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Token = require_token();
	function StateCore(src, md, env) {
		this.src = src;
		this.env = env;
		this.tokens = [];
		this.inlineMode = false;
		this.md = md;
	}
	StateCore.prototype.Token = Token;
	module.exports = StateCore;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/parser_core.js
/** internal
* class Core
*
* Top-level rules executor. Glues block/inline parsers and does intermediate
* transformations.
**/
var require_parser_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Ruler = require_ruler();
	var _rules = [
		["normalize", require_normalize()],
		["block", require_block()],
		["inline", require_inline()],
		["linkify", require_linkify$1()],
		["replacements", require_replacements()],
		["smartquotes", require_smartquotes()],
		["text_join", require_text_join()]
	];
	/**
	* new Core()
	**/
	function Core() {
		/**
		* Core#ruler -> Ruler
		*
		* [[Ruler]] instance. Keep configuration of core rules.
		**/
		this.ruler = new Ruler();
		for (var i = 0; i < _rules.length; i++) this.ruler.push(_rules[i][0], _rules[i][1]);
	}
	/**
	* Core.process(state)
	*
	* Executes core chain rules.
	**/
	Core.prototype.process = function(state) {
		var i, l, rules = this.ruler.getRules("");
		for (i = 0, l = rules.length; i < l; i++) rules[i](state);
	};
	Core.prototype.State = require_state_core();
	module.exports = Core;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/table.js
var require_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	function getLine(state, line) {
		var pos = state.bMarks[line] + state.tShift[line], max = state.eMarks[line];
		return state.src.slice(pos, max);
	}
	function escapedSplit(str) {
		var result = [], pos = 0, max = str.length, ch, isEscaped = false, lastPos = 0, current = "";
		ch = str.charCodeAt(pos);
		while (pos < max) {
			if (ch === 124) {
				if (!isEscaped) {
					result.push(current + str.substring(lastPos, pos));
					current = "";
					lastPos = pos + 1;
				} else {
					current += str.substring(lastPos, pos - 1);
					lastPos = pos;
				}
			}
			isEscaped = ch === 92;
			pos++;
			ch = str.charCodeAt(pos);
		}
		result.push(current + str.substring(lastPos));
		return result;
	}
	module.exports = function table(state, startLine, endLine, silent) {
		var ch, lineText, pos, i, l, nextLine, columns, columnCount, token, aligns, t, tableLines, tbodyLines, oldParentType, terminate, terminatorRules, firstCh, secondCh;
		if (startLine + 2 > endLine) return false;
		nextLine = startLine + 1;
		if (state.sCount[nextLine] < state.blkIndent) return false;
		if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
		pos = state.bMarks[nextLine] + state.tShift[nextLine];
		if (pos >= state.eMarks[nextLine]) return false;
		firstCh = state.src.charCodeAt(pos++);
		if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) return false;
		if (pos >= state.eMarks[nextLine]) return false;
		secondCh = state.src.charCodeAt(pos++);
		if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) return false;
		if (firstCh === 45 && isSpace(secondCh)) return false;
		while (pos < state.eMarks[nextLine]) {
			ch = state.src.charCodeAt(pos);
			if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) return false;
			pos++;
		}
		lineText = getLine(state, startLine + 1);
		columns = lineText.split("|");
		aligns = [];
		for (i = 0; i < columns.length; i++) {
			t = columns[i].trim();
			if (!t) {
				if (i === 0 || i === columns.length - 1) continue;
				else return false;
			}
			if (!/^:?-+:?$/.test(t)) return false;
			if (t.charCodeAt(t.length - 1) === 58) aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
			else if (t.charCodeAt(0) === 58) aligns.push("left");
			else aligns.push("");
		}
		lineText = getLine(state, startLine).trim();
		if (lineText.indexOf("|") === -1) return false;
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		columns = escapedSplit(lineText);
		if (columns.length && columns[0] === "") columns.shift();
		if (columns.length && columns[columns.length - 1] === "") columns.pop();
		columnCount = columns.length;
		if (columnCount === 0 || columnCount !== aligns.length) return false;
		if (silent) return true;
		oldParentType = state.parentType;
		state.parentType = "table";
		terminatorRules = state.md.block.ruler.getRules("blockquote");
		token = state.push("table_open", "table", 1);
		token.map = tableLines = [startLine, 0];
		token = state.push("thead_open", "thead", 1);
		token.map = [startLine, startLine + 1];
		token = state.push("tr_open", "tr", 1);
		token.map = [startLine, startLine + 1];
		for (i = 0; i < columns.length; i++) {
			token = state.push("th_open", "th", 1);
			if (aligns[i]) token.attrs = [["style", "text-align:" + aligns[i]]];
			token = state.push("inline", "", 0);
			token.content = columns[i].trim();
			token.children = [];
			token = state.push("th_close", "th", -1);
		}
		token = state.push("tr_close", "tr", -1);
		token = state.push("thead_close", "thead", -1);
		for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
			if (state.sCount[nextLine] < state.blkIndent) break;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) break;
			lineText = getLine(state, nextLine).trim();
			if (!lineText) break;
			if (state.sCount[nextLine] - state.blkIndent >= 4) break;
			columns = escapedSplit(lineText);
			if (columns.length && columns[0] === "") columns.shift();
			if (columns.length && columns[columns.length - 1] === "") columns.pop();
			if (nextLine === startLine + 2) {
				token = state.push("tbody_open", "tbody", 1);
				token.map = tbodyLines = [startLine + 2, 0];
			}
			token = state.push("tr_open", "tr", 1);
			token.map = [nextLine, nextLine + 1];
			for (i = 0; i < columnCount; i++) {
				token = state.push("td_open", "td", 1);
				if (aligns[i]) token.attrs = [["style", "text-align:" + aligns[i]]];
				token = state.push("inline", "", 0);
				token.content = columns[i] ? columns[i].trim() : "";
				token.children = [];
				token = state.push("td_close", "td", -1);
			}
			token = state.push("tr_close", "tr", -1);
		}
		if (tbodyLines) {
			token = state.push("tbody_close", "tbody", -1);
			tbodyLines[1] = nextLine;
		}
		token = state.push("table_close", "table", -1);
		tableLines[1] = nextLine;
		state.parentType = oldParentType;
		state.line = nextLine;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/code.js
var require_code = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function code(state, startLine, endLine) {
		var nextLine, last, token;
		if (state.sCount[startLine] - state.blkIndent < 4) return false;
		last = nextLine = startLine + 1;
		while (nextLine < endLine) {
			if (state.isEmpty(nextLine)) {
				nextLine++;
				continue;
			}
			if (state.sCount[nextLine] - state.blkIndent >= 4) {
				nextLine++;
				last = nextLine;
				continue;
			}
			break;
		}
		state.line = last;
		token = state.push("code_block", "code", 0);
		token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
		token.map = [startLine, state.line];
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/fence.js
var require_fence = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function fence(state, startLine, endLine, silent) {
		var marker, len, params, nextLine, mem, token, markup, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		if (pos + 3 > max) return false;
		marker = state.src.charCodeAt(pos);
		if (marker !== 126 && marker !== 96) return false;
		mem = pos;
		pos = state.skipChars(pos, marker);
		len = pos - mem;
		if (len < 3) return false;
		markup = state.src.slice(mem, pos);
		params = state.src.slice(pos, max);
		if (marker === 96) {
			if (params.indexOf(String.fromCharCode(marker)) >= 0) return false;
		}
		if (silent) return true;
		nextLine = startLine;
		for (;;) {
			nextLine++;
			if (nextLine >= endLine) break;
			pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
			max = state.eMarks[nextLine];
			if (pos < max && state.sCount[nextLine] < state.blkIndent) break;
			if (state.src.charCodeAt(pos) !== marker) continue;
			if (state.sCount[nextLine] - state.blkIndent >= 4) continue;
			pos = state.skipChars(pos, marker);
			if (pos - mem < len) continue;
			pos = state.skipSpaces(pos);
			if (pos < max) continue;
			haveEndMarker = true;
			break;
		}
		len = state.sCount[startLine];
		state.line = nextLine + (haveEndMarker ? 1 : 0);
		token = state.push("fence", "code", 0);
		token.info = params;
		token.content = state.getLines(startLine + 1, nextLine, len, true);
		token.markup = markup;
		token.map = [startLine, state.line];
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/blockquote.js
var require_blockquote = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	module.exports = function blockquote(state, startLine, endLine, silent) {
		var adjustTab, ch, i, initial, l, lastLineEmpty, lines, nextLine, offset, oldBMarks, oldBSCount, oldIndent, oldParentType, oldSCount, oldTShift, spaceAfterMarker, terminate, terminatorRules, token, isOutdented, oldLineMax = state.lineMax, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		if (state.src.charCodeAt(pos) !== 62) return false;
		if (silent) return true;
		oldBMarks = [];
		oldBSCount = [];
		oldSCount = [];
		oldTShift = [];
		terminatorRules = state.md.block.ruler.getRules("blockquote");
		oldParentType = state.parentType;
		state.parentType = "blockquote";
		for (nextLine = startLine; nextLine < endLine; nextLine++) {
			isOutdented = state.sCount[nextLine] < state.blkIndent;
			pos = state.bMarks[nextLine] + state.tShift[nextLine];
			max = state.eMarks[nextLine];
			if (pos >= max) break;
			if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
				initial = state.sCount[nextLine] + 1;
				if (state.src.charCodeAt(pos) === 32) {
					pos++;
					initial++;
					adjustTab = false;
					spaceAfterMarker = true;
				} else if (state.src.charCodeAt(pos) === 9) {
					spaceAfterMarker = true;
					if ((state.bsCount[nextLine] + initial) % 4 === 3) {
						pos++;
						initial++;
						adjustTab = false;
					} else adjustTab = true;
				} else spaceAfterMarker = false;
				offset = initial;
				oldBMarks.push(state.bMarks[nextLine]);
				state.bMarks[nextLine] = pos;
				while (pos < max) {
					ch = state.src.charCodeAt(pos);
					if (isSpace(ch)) {
						if (ch === 9) offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
						else offset++;
					} else break;
					pos++;
				}
				lastLineEmpty = pos >= max;
				oldBSCount.push(state.bsCount[nextLine]);
				state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
				oldSCount.push(state.sCount[nextLine]);
				state.sCount[nextLine] = offset - initial;
				oldTShift.push(state.tShift[nextLine]);
				state.tShift[nextLine] = pos - state.bMarks[nextLine];
				continue;
			}
			if (lastLineEmpty) break;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) {
				state.lineMax = nextLine;
				if (state.blkIndent !== 0) {
					oldBMarks.push(state.bMarks[nextLine]);
					oldBSCount.push(state.bsCount[nextLine]);
					oldTShift.push(state.tShift[nextLine]);
					oldSCount.push(state.sCount[nextLine]);
					state.sCount[nextLine] -= state.blkIndent;
				}
				break;
			}
			oldBMarks.push(state.bMarks[nextLine]);
			oldBSCount.push(state.bsCount[nextLine]);
			oldTShift.push(state.tShift[nextLine]);
			oldSCount.push(state.sCount[nextLine]);
			state.sCount[nextLine] = -1;
		}
		oldIndent = state.blkIndent;
		state.blkIndent = 0;
		token = state.push("blockquote_open", "blockquote", 1);
		token.markup = ">";
		token.map = lines = [startLine, 0];
		state.md.block.tokenize(state, startLine, nextLine);
		token = state.push("blockquote_close", "blockquote", -1);
		token.markup = ">";
		state.lineMax = oldLineMax;
		state.parentType = oldParentType;
		lines[1] = state.line;
		for (i = 0; i < oldTShift.length; i++) {
			state.bMarks[i + startLine] = oldBMarks[i];
			state.tShift[i + startLine] = oldTShift[i];
			state.sCount[i + startLine] = oldSCount[i];
			state.bsCount[i + startLine] = oldBSCount[i];
		}
		state.blkIndent = oldIndent;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/hr.js
var require_hr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	module.exports = function hr(state, startLine, endLine, silent) {
		var marker, cnt, ch, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		marker = state.src.charCodeAt(pos++);
		if (marker !== 42 && marker !== 45 && marker !== 95) return false;
		cnt = 1;
		while (pos < max) {
			ch = state.src.charCodeAt(pos++);
			if (ch !== marker && !isSpace(ch)) return false;
			if (ch === marker) cnt++;
		}
		if (cnt < 3) return false;
		if (silent) return true;
		state.line = startLine + 1;
		token = state.push("hr", "hr", 0);
		token.map = [startLine, state.line];
		token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/list.js
var require_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	function skipBulletListMarker(state, startLine) {
		var marker, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine], ch;
		marker = state.src.charCodeAt(pos++);
		if (marker !== 42 && marker !== 45 && marker !== 43) return -1;
		if (pos < max) {
			ch = state.src.charCodeAt(pos);
			if (!isSpace(ch)) return -1;
		}
		return pos;
	}
	function skipOrderedListMarker(state, startLine) {
		var ch, start = state.bMarks[startLine] + state.tShift[startLine], pos = start, max = state.eMarks[startLine];
		if (pos + 1 >= max) return -1;
		ch = state.src.charCodeAt(pos++);
		if (ch < 48 || ch > 57) return -1;
		for (;;) {
			if (pos >= max) return -1;
			ch = state.src.charCodeAt(pos++);
			if (ch >= 48 && ch <= 57) {
				if (pos - start >= 10) return -1;
				continue;
			}
			if (ch === 41 || ch === 46) break;
			return -1;
		}
		if (pos < max) {
			ch = state.src.charCodeAt(pos);
			if (!isSpace(ch)) return -1;
		}
		return pos;
	}
	function markTightParagraphs(state, idx) {
		var i, l, level = state.level + 2;
		for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
			state.tokens[i + 2].hidden = true;
			state.tokens[i].hidden = true;
			i += 2;
		}
	}
	module.exports = function list(state, startLine, endLine, silent) {
		var ch, contentStart, i, indent, indentAfterMarker, initial, isOrdered, itemLines, l, listLines, listTokIdx, markerCharCode, markerValue, max, offset, oldListIndent, oldParentType, oldSCount, oldTShift, oldTight, pos, posAfterMarker, prevEmptyEnd, start, terminate, terminatorRules, token, nextLine = startLine, isTerminatingParagraph = false, tight = true;
		if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
		if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) return false;
		if (silent && state.parentType === "paragraph") {
			if (state.sCount[nextLine] >= state.blkIndent) isTerminatingParagraph = true;
		}
		if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
			isOrdered = true;
			start = state.bMarks[nextLine] + state.tShift[nextLine];
			markerValue = Number(state.src.slice(start, posAfterMarker - 1));
			if (isTerminatingParagraph && markerValue !== 1) return false;
		} else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) isOrdered = false;
		else return false;
		if (isTerminatingParagraph) {
			if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
		}
		if (silent) return true;
		markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
		listTokIdx = state.tokens.length;
		if (isOrdered) {
			token = state.push("ordered_list_open", "ol", 1);
			if (markerValue !== 1) token.attrs = [["start", markerValue]];
		} else token = state.push("bullet_list_open", "ul", 1);
		token.map = listLines = [nextLine, 0];
		token.markup = String.fromCharCode(markerCharCode);
		prevEmptyEnd = false;
		terminatorRules = state.md.block.ruler.getRules("list");
		oldParentType = state.parentType;
		state.parentType = "list";
		while (nextLine < endLine) {
			pos = posAfterMarker;
			max = state.eMarks[nextLine];
			initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
			while (pos < max) {
				ch = state.src.charCodeAt(pos);
				if (ch === 9) offset += 4 - (offset + state.bsCount[nextLine]) % 4;
				else if (ch === 32) offset++;
				else break;
				pos++;
			}
			contentStart = pos;
			if (contentStart >= max) indentAfterMarker = 1;
			else indentAfterMarker = offset - initial;
			if (indentAfterMarker > 4) indentAfterMarker = 1;
			indent = initial + indentAfterMarker;
			token = state.push("list_item_open", "li", 1);
			token.markup = String.fromCharCode(markerCharCode);
			token.map = itemLines = [nextLine, 0];
			if (isOrdered) token.info = state.src.slice(start, posAfterMarker - 1);
			oldTight = state.tight;
			oldTShift = state.tShift[nextLine];
			oldSCount = state.sCount[nextLine];
			oldListIndent = state.listIndent;
			state.listIndent = state.blkIndent;
			state.blkIndent = indent;
			state.tight = true;
			state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
			state.sCount[nextLine] = offset;
			if (contentStart >= max && state.isEmpty(nextLine + 1)) state.line = Math.min(state.line + 2, endLine);
			else state.md.block.tokenize(state, nextLine, endLine, true);
			if (!state.tight || prevEmptyEnd) tight = false;
			prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
			state.blkIndent = state.listIndent;
			state.listIndent = oldListIndent;
			state.tShift[nextLine] = oldTShift;
			state.sCount[nextLine] = oldSCount;
			state.tight = oldTight;
			token = state.push("list_item_close", "li", -1);
			token.markup = String.fromCharCode(markerCharCode);
			nextLine = state.line;
			itemLines[1] = nextLine;
			if (nextLine >= endLine) break;
			if (state.sCount[nextLine] < state.blkIndent) break;
			if (state.sCount[nextLine] - state.blkIndent >= 4) break;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) break;
			if (isOrdered) {
				posAfterMarker = skipOrderedListMarker(state, nextLine);
				if (posAfterMarker < 0) break;
				start = state.bMarks[nextLine] + state.tShift[nextLine];
			} else {
				posAfterMarker = skipBulletListMarker(state, nextLine);
				if (posAfterMarker < 0) break;
			}
			if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) break;
		}
		if (isOrdered) token = state.push("ordered_list_close", "ol", -1);
		else token = state.push("bullet_list_close", "ul", -1);
		token.markup = String.fromCharCode(markerCharCode);
		listLines[1] = nextLine;
		state.line = nextLine;
		state.parentType = oldParentType;
		if (tight) markTightParagraphs(state, listTokIdx);
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/reference.js
var require_reference = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var normalizeReference = require_utils().normalizeReference;
	var isSpace = require_utils().isSpace;
	module.exports = function reference(state, startLine, _endLine, silent) {
		var ch, destEndPos, destEndLineNo, endLine, href, i, l, label, labelEnd, oldParentType, res, start, str, terminate, terminatorRules, title, lines = 0, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine], nextLine = startLine + 1;
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		if (state.src.charCodeAt(pos) !== 91) return false;
		while (++pos < max) if (state.src.charCodeAt(pos) === 93 && state.src.charCodeAt(pos - 1) !== 92) {
			if (pos + 1 === max) return false;
			if (state.src.charCodeAt(pos + 1) !== 58) return false;
			break;
		}
		endLine = state.lineMax;
		terminatorRules = state.md.block.ruler.getRules("reference");
		oldParentType = state.parentType;
		state.parentType = "reference";
		for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
			if (state.sCount[nextLine] - state.blkIndent > 3) continue;
			if (state.sCount[nextLine] < 0) continue;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) break;
		}
		str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
		max = str.length;
		for (pos = 1; pos < max; pos++) {
			ch = str.charCodeAt(pos);
			if (ch === 91) return false;
			else if (ch === 93) {
				labelEnd = pos;
				break;
			} else if (ch === 10) lines++;
			else if (ch === 92) {
				pos++;
				if (pos < max && str.charCodeAt(pos) === 10) lines++;
			}
		}
		if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) return false;
		for (pos = labelEnd + 2; pos < max; pos++) {
			ch = str.charCodeAt(pos);
			if (ch === 10) lines++;
			else if (isSpace(ch)) {} else break;
		}
		res = state.md.helpers.parseLinkDestination(str, pos, max);
		if (!res.ok) return false;
		href = state.md.normalizeLink(res.str);
		if (!state.md.validateLink(href)) return false;
		pos = res.pos;
		lines += res.lines;
		destEndPos = pos;
		destEndLineNo = lines;
		start = pos;
		for (; pos < max; pos++) {
			ch = str.charCodeAt(pos);
			if (ch === 10) lines++;
			else if (isSpace(ch)) {} else break;
		}
		res = state.md.helpers.parseLinkTitle(str, pos, max);
		if (pos < max && start !== pos && res.ok) {
			title = res.str;
			pos = res.pos;
			lines += res.lines;
		} else {
			title = "";
			pos = destEndPos;
			lines = destEndLineNo;
		}
		while (pos < max) {
			ch = str.charCodeAt(pos);
			if (!isSpace(ch)) break;
			pos++;
		}
		if (pos < max && str.charCodeAt(pos) !== 10) {
			if (title) {
				title = "";
				pos = destEndPos;
				lines = destEndLineNo;
				while (pos < max) {
					ch = str.charCodeAt(pos);
					if (!isSpace(ch)) break;
					pos++;
				}
			}
		}
		if (pos < max && str.charCodeAt(pos) !== 10) return false;
		label = normalizeReference(str.slice(1, labelEnd));
		if (!label) return false;
		/*istanbul ignore if*/
		if (silent) return true;
		if (typeof state.env.references === "undefined") state.env.references = {};
		if (typeof state.env.references[label] === "undefined") state.env.references[label] = {
			title,
			href
		};
		state.parentType = oldParentType;
		state.line = startLine + lines + 1;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/common/html_blocks.js
var require_html_blocks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"address",
		"article",
		"aside",
		"base",
		"basefont",
		"blockquote",
		"body",
		"caption",
		"center",
		"col",
		"colgroup",
		"dd",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"iframe",
		"legend",
		"li",
		"link",
		"main",
		"menu",
		"menuitem",
		"nav",
		"noframes",
		"ol",
		"optgroup",
		"option",
		"p",
		"param",
		"section",
		"source",
		"summary",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"track",
		"ul"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/common/html_re.js
var require_html_re = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>";
	var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
	var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?][\\s\\S]*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)");
	var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");
	module.exports.HTML_TAG_RE = HTML_TAG_RE;
	module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/html_block.js
var require_html_block = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var block_names = require_html_blocks();
	var HTML_OPEN_CLOSE_TAG_RE = require_html_re().HTML_OPEN_CLOSE_TAG_RE;
	var HTML_SEQUENCES = [
		[
			/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
			/<\/(script|pre|style|textarea)>/i,
			true
		],
		[
			/^<!--/,
			/-->/,
			true
		],
		[
			/^<\?/,
			/\?>/,
			true
		],
		[
			/^<![A-Z]/,
			/>/,
			true
		],
		[
			/^<!\[CDATA\[/,
			/\]\]>/,
			true
		],
		[
			new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"),
			/^$/,
			true
		],
		[
			new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"),
			/^$/,
			false
		]
	];
	module.exports = function html_block(state, startLine, endLine, silent) {
		var i, nextLine, token, lineText, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		if (!state.md.options.html) return false;
		if (state.src.charCodeAt(pos) !== 60) return false;
		lineText = state.src.slice(pos, max);
		for (i = 0; i < HTML_SEQUENCES.length; i++) if (HTML_SEQUENCES[i][0].test(lineText)) break;
		if (i === HTML_SEQUENCES.length) return false;
		if (silent) return HTML_SEQUENCES[i][2];
		nextLine = startLine + 1;
		if (!HTML_SEQUENCES[i][1].test(lineText)) for (; nextLine < endLine; nextLine++) {
			if (state.sCount[nextLine] < state.blkIndent) break;
			pos = state.bMarks[nextLine] + state.tShift[nextLine];
			max = state.eMarks[nextLine];
			lineText = state.src.slice(pos, max);
			if (HTML_SEQUENCES[i][1].test(lineText)) {
				if (lineText.length !== 0) nextLine++;
				break;
			}
		}
		state.line = nextLine;
		token = state.push("html_block", "", 0);
		token.map = [startLine, nextLine];
		token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/heading.js
var require_heading = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	module.exports = function heading(state, startLine, endLine, silent) {
		var ch, level, tmp, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		ch = state.src.charCodeAt(pos);
		if (ch !== 35 || pos >= max) return false;
		level = 1;
		ch = state.src.charCodeAt(++pos);
		while (ch === 35 && pos < max && level <= 6) {
			level++;
			ch = state.src.charCodeAt(++pos);
		}
		if (level > 6 || pos < max && !isSpace(ch)) return false;
		if (silent) return true;
		max = state.skipSpacesBack(max, pos);
		tmp = state.skipCharsBack(max, 35, pos);
		if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) max = tmp;
		state.line = startLine + 1;
		token = state.push("heading_open", "h" + String(level), 1);
		token.markup = "########".slice(0, level);
		token.map = [startLine, state.line];
		token = state.push("inline", "", 0);
		token.content = state.src.slice(pos, max).trim();
		token.map = [startLine, state.line];
		token.children = [];
		token = state.push("heading_close", "h" + String(level), -1);
		token.markup = "########".slice(0, level);
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/lheading.js
var require_lheading = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function lheading(state, startLine, endLine) {
		var content, terminate, i, l, token, pos, max, level, marker, nextLine = startLine + 1, oldParentType, terminatorRules = state.md.block.ruler.getRules("paragraph");
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		oldParentType = state.parentType;
		state.parentType = "paragraph";
		for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
			if (state.sCount[nextLine] - state.blkIndent > 3) continue;
			if (state.sCount[nextLine] >= state.blkIndent) {
				pos = state.bMarks[nextLine] + state.tShift[nextLine];
				max = state.eMarks[nextLine];
				if (pos < max) {
					marker = state.src.charCodeAt(pos);
					if (marker === 45 || marker === 61) {
						pos = state.skipChars(pos, marker);
						pos = state.skipSpaces(pos);
						if (pos >= max) {
							level = marker === 61 ? 1 : 2;
							break;
						}
					}
				}
			}
			if (state.sCount[nextLine] < 0) continue;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) break;
		}
		if (!level) return false;
		content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
		state.line = nextLine + 1;
		token = state.push("heading_open", "h" + String(level), 1);
		token.markup = String.fromCharCode(marker);
		token.map = [startLine, state.line];
		token = state.push("inline", "", 0);
		token.content = content;
		token.map = [startLine, state.line - 1];
		token.children = [];
		token = state.push("heading_close", "h" + String(level), -1);
		token.markup = String.fromCharCode(marker);
		state.parentType = oldParentType;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/paragraph.js
var require_paragraph = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function paragraph(state, startLine, endLine) {
		var content, terminate, i, l, token, oldParentType, nextLine = startLine + 1, terminatorRules = state.md.block.ruler.getRules("paragraph");
		oldParentType = state.parentType;
		state.parentType = "paragraph";
		for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
			if (state.sCount[nextLine] - state.blkIndent > 3) continue;
			if (state.sCount[nextLine] < 0) continue;
			terminate = false;
			for (i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			if (terminate) break;
		}
		content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
		state.line = nextLine;
		token = state.push("paragraph_open", "p", 1);
		token.map = [startLine, state.line];
		token = state.push("inline", "", 0);
		token.content = content;
		token.map = [startLine, state.line];
		token.children = [];
		token = state.push("paragraph_close", "p", -1);
		state.parentType = oldParentType;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_block/state_block.js
var require_state_block = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Token = require_token();
	var isSpace = require_utils().isSpace;
	function StateBlock(src, md, env, tokens) {
		var ch, s, start, pos, len, indent, offset, indent_found;
		this.src = src;
		this.md = md;
		this.env = env;
		this.tokens = tokens;
		this.bMarks = [];
		this.eMarks = [];
		this.tShift = [];
		this.sCount = [];
		this.bsCount = [];
		this.blkIndent = 0;
		this.line = 0;
		this.lineMax = 0;
		this.tight = false;
		this.ddIndent = -1;
		this.listIndent = -1;
		this.parentType = "root";
		this.level = 0;
		this.result = "";
		s = this.src;
		indent_found = false;
		for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
			ch = s.charCodeAt(pos);
			if (!indent_found) {
				if (isSpace(ch)) {
					indent++;
					if (ch === 9) offset += 4 - offset % 4;
					else offset++;
					continue;
				} else indent_found = true;
			}
			if (ch === 10 || pos === len - 1) {
				if (ch !== 10) pos++;
				this.bMarks.push(start);
				this.eMarks.push(pos);
				this.tShift.push(indent);
				this.sCount.push(offset);
				this.bsCount.push(0);
				indent_found = false;
				indent = 0;
				offset = 0;
				start = pos + 1;
			}
		}
		this.bMarks.push(s.length);
		this.eMarks.push(s.length);
		this.tShift.push(0);
		this.sCount.push(0);
		this.bsCount.push(0);
		this.lineMax = this.bMarks.length - 1;
	}
	StateBlock.prototype.push = function(type, tag, nesting) {
		var token = new Token(type, tag, nesting);
		token.block = true;
		if (nesting < 0) this.level--;
		token.level = this.level;
		if (nesting > 0) this.level++;
		this.tokens.push(token);
		return token;
	};
	StateBlock.prototype.isEmpty = function isEmpty(line) {
		return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
	};
	StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
		for (var max = this.lineMax; from < max; from++) if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) break;
		return from;
	};
	StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
		var ch;
		for (var max = this.src.length; pos < max; pos++) {
			ch = this.src.charCodeAt(pos);
			if (!isSpace(ch)) break;
		}
		return pos;
	};
	StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
		if (pos <= min) return pos;
		while (pos > min) if (!isSpace(this.src.charCodeAt(--pos))) return pos + 1;
		return pos;
	};
	StateBlock.prototype.skipChars = function skipChars(pos, code) {
		for (var max = this.src.length; pos < max; pos++) if (this.src.charCodeAt(pos) !== code) break;
		return pos;
	};
	StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
		if (pos <= min) return pos;
		while (pos > min) if (code !== this.src.charCodeAt(--pos)) return pos + 1;
		return pos;
	};
	StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
		var i, lineIndent, ch, first, last, queue, lineStart, line = begin;
		if (begin >= end) return "";
		queue = new Array(end - begin);
		for (i = 0; line < end; line++, i++) {
			lineIndent = 0;
			lineStart = first = this.bMarks[line];
			if (line + 1 < end || keepLastLF) last = this.eMarks[line] + 1;
			else last = this.eMarks[line];
			while (first < last && lineIndent < indent) {
				ch = this.src.charCodeAt(first);
				if (isSpace(ch)) {
					if (ch === 9) lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
					else lineIndent++;
				} else if (first - lineStart < this.tShift[line]) lineIndent++;
				else break;
				first++;
			}
			if (lineIndent > indent) queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
			else queue[i] = this.src.slice(first, last);
		}
		return queue.join("");
	};
	StateBlock.prototype.Token = Token;
	module.exports = StateBlock;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/parser_block.js
/** internal
* class ParserBlock
*
* Block-level tokenizer.
**/
var require_parser_block = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Ruler = require_ruler();
	var _rules = [
		[
			"table",
			require_table(),
			["paragraph", "reference"]
		],
		["code", require_code()],
		[
			"fence",
			require_fence(),
			[
				"paragraph",
				"reference",
				"blockquote",
				"list"
			]
		],
		[
			"blockquote",
			require_blockquote(),
			[
				"paragraph",
				"reference",
				"blockquote",
				"list"
			]
		],
		[
			"hr",
			require_hr(),
			[
				"paragraph",
				"reference",
				"blockquote",
				"list"
			]
		],
		[
			"list",
			require_list(),
			[
				"paragraph",
				"reference",
				"blockquote"
			]
		],
		["reference", require_reference()],
		[
			"html_block",
			require_html_block(),
			[
				"paragraph",
				"reference",
				"blockquote"
			]
		],
		[
			"heading",
			require_heading(),
			[
				"paragraph",
				"reference",
				"blockquote"
			]
		],
		["lheading", require_lheading()],
		["paragraph", require_paragraph()]
	];
	/**
	* new ParserBlock()
	**/
	function ParserBlock() {
		/**
		* ParserBlock#ruler -> Ruler
		*
		* [[Ruler]] instance. Keep configuration of block rules.
		**/
		this.ruler = new Ruler();
		for (var i = 0; i < _rules.length; i++) this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
	}
	ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
		var ok, i, prevLine, rules = this.ruler.getRules(""), len = rules.length, line = startLine, hasEmptyLines = false, maxNesting = state.md.options.maxNesting;
		while (line < endLine) {
			state.line = line = state.skipEmptyLines(line);
			if (line >= endLine) break;
			if (state.sCount[line] < state.blkIndent) break;
			if (state.level >= maxNesting) {
				state.line = endLine;
				break;
			}
			prevLine = state.line;
			for (i = 0; i < len; i++) {
				ok = rules[i](state, line, endLine, false);
				if (ok) {
					if (prevLine >= state.line) throw new Error("block rule didn't increment state.line");
					break;
				}
			}
			if (!ok) throw new Error("none of the block rules matched");
			state.tight = !hasEmptyLines;
			if (state.isEmpty(state.line - 1)) hasEmptyLines = true;
			line = state.line;
			if (line < endLine && state.isEmpty(line)) {
				hasEmptyLines = true;
				line++;
				state.line = line;
			}
		}
	};
	/**
	* ParserBlock.parse(str, md, env, outTokens)
	*
	* Process input string and push block tokens into `outTokens`
	**/
	ParserBlock.prototype.parse = function(src, md, env, outTokens) {
		var state;
		if (!src) return;
		state = new this.State(src, md, env, outTokens);
		this.tokenize(state, state.line, state.lineMax);
	};
	ParserBlock.prototype.State = require_state_block();
	module.exports = ParserBlock;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/text.js
var require_text = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isTerminatorChar(ch) {
		switch (ch) {
			case 10:
			case 33:
			case 35:
			case 36:
			case 37:
			case 38:
			case 42:
			case 43:
			case 45:
			case 58:
			case 60:
			case 61:
			case 62:
			case 64:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 123:
			case 125:
			case 126: return true;
			default: return false;
		}
	}
	module.exports = function text(state, silent) {
		var pos = state.pos;
		while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) pos++;
		if (pos === state.pos) return false;
		if (!silent) state.pending += state.src.slice(state.pos, pos);
		state.pos = pos;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/linkify.js
var require_linkify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
	module.exports = function linkify(state, silent) {
		var pos, max, match, proto, link, url, fullUrl, token;
		if (!state.md.options.linkify) return false;
		if (state.linkLevel > 0) return false;
		pos = state.pos;
		max = state.posMax;
		if (pos + 3 > max) return false;
		if (state.src.charCodeAt(pos) !== 58) return false;
		if (state.src.charCodeAt(pos + 1) !== 47) return false;
		if (state.src.charCodeAt(pos + 2) !== 47) return false;
		match = state.pending.match(SCHEME_RE);
		if (!match) return false;
		proto = match[1];
		link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
		if (!link) return false;
		url = link.url;
		if (url.length <= proto.length) return false;
		url = url.replace(/\*+$/, "");
		fullUrl = state.md.normalizeLink(url);
		if (!state.md.validateLink(fullUrl)) return false;
		if (!silent) {
			state.pending = state.pending.slice(0, -proto.length);
			token = state.push("link_open", "a", 1);
			token.attrs = [["href", fullUrl]];
			token.markup = "linkify";
			token.info = "auto";
			token = state.push("text", "", 0);
			token.content = state.md.normalizeLinkText(url);
			token = state.push("link_close", "a", -1);
			token.markup = "linkify";
			token.info = "auto";
		}
		state.pos += url.length - proto.length;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/newline.js
var require_newline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	module.exports = function newline(state, silent) {
		var pmax, max, ws, pos = state.pos;
		if (state.src.charCodeAt(pos) !== 10) return false;
		pmax = state.pending.length - 1;
		max = state.posMax;
		if (!silent) {
			if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
				if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
					ws = pmax - 1;
					while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
					state.pending = state.pending.slice(0, ws);
					state.push("hardbreak", "br", 0);
				} else {
					state.pending = state.pending.slice(0, -1);
					state.push("softbreak", "br", 0);
				}
			} else state.push("softbreak", "br", 0);
		}
		pos++;
		while (pos < max && isSpace(state.src.charCodeAt(pos))) pos++;
		state.pos = pos;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/escape.js
var require_escape = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSpace = require_utils().isSpace;
	var ESCAPED = [];
	for (var i = 0; i < 256; i++) ESCAPED.push(0);
	"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
		ESCAPED[ch.charCodeAt(0)] = 1;
	});
	module.exports = function escape(state, silent) {
		var ch1, ch2, origStr, escapedStr, token, pos = state.pos, max = state.posMax;
		if (state.src.charCodeAt(pos) !== 92) return false;
		pos++;
		if (pos >= max) return false;
		ch1 = state.src.charCodeAt(pos);
		if (ch1 === 10) {
			if (!silent) state.push("hardbreak", "br", 0);
			pos++;
			while (pos < max) {
				ch1 = state.src.charCodeAt(pos);
				if (!isSpace(ch1)) break;
				pos++;
			}
			state.pos = pos;
			return true;
		}
		escapedStr = state.src[pos];
		if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
			ch2 = state.src.charCodeAt(pos + 1);
			if (ch2 >= 56320 && ch2 <= 57343) {
				escapedStr += state.src[pos + 1];
				pos++;
			}
		}
		origStr = "\\" + escapedStr;
		if (!silent) {
			token = state.push("text_special", "", 0);
			if (ch1 < 256 && ESCAPED[ch1] !== 0) token.content = escapedStr;
			else token.content = origStr;
			token.markup = origStr;
			token.info = "escape";
		}
		state.pos = pos + 1;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/backticks.js
var require_backticks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function backtick(state, silent) {
		var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength, pos = state.pos;
		if (state.src.charCodeAt(pos) !== 96) return false;
		start = pos;
		pos++;
		max = state.posMax;
		while (pos < max && state.src.charCodeAt(pos) === 96) pos++;
		marker = state.src.slice(start, pos);
		openerLength = marker.length;
		if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
			if (!silent) state.pending += marker;
			state.pos += openerLength;
			return true;
		}
		matchEnd = pos;
		while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
			matchEnd = matchStart + 1;
			while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) matchEnd++;
			closerLength = matchEnd - matchStart;
			if (closerLength === openerLength) {
				if (!silent) {
					token = state.push("code_inline", "code", 0);
					token.markup = marker;
					token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
				}
				state.pos = matchEnd;
				return true;
			}
			state.backticks[closerLength] = matchStart;
		}
		state.backticksScanned = true;
		if (!silent) state.pending += marker;
		state.pos += openerLength;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/strikethrough.js
var require_strikethrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.tokenize = function strikethrough(state, silent) {
		var i, scanned, token, len, ch, start = state.pos, marker = state.src.charCodeAt(start);
		if (silent) return false;
		if (marker !== 126) return false;
		scanned = state.scanDelims(state.pos, true);
		len = scanned.length;
		ch = String.fromCharCode(marker);
		if (len < 2) return false;
		if (len % 2) {
			token = state.push("text", "", 0);
			token.content = ch;
			len--;
		}
		for (i = 0; i < len; i += 2) {
			token = state.push("text", "", 0);
			token.content = ch + ch;
			state.delimiters.push({
				marker,
				length: 0,
				token: state.tokens.length - 1,
				end: -1,
				open: scanned.can_open,
				close: scanned.can_close
			});
		}
		state.pos += scanned.length;
		return true;
	};
	function postProcess(state, delimiters) {
		var i, j, startDelim, endDelim, token, loneMarkers = [], max = delimiters.length;
		for (i = 0; i < max; i++) {
			startDelim = delimiters[i];
			if (startDelim.marker !== 126) continue;
			if (startDelim.end === -1) continue;
			endDelim = delimiters[startDelim.end];
			token = state.tokens[startDelim.token];
			token.type = "s_open";
			token.tag = "s";
			token.nesting = 1;
			token.markup = "~~";
			token.content = "";
			token = state.tokens[endDelim.token];
			token.type = "s_close";
			token.tag = "s";
			token.nesting = -1;
			token.markup = "~~";
			token.content = "";
			if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") loneMarkers.push(endDelim.token - 1);
		}
		while (loneMarkers.length) {
			i = loneMarkers.pop();
			j = i + 1;
			while (j < state.tokens.length && state.tokens[j].type === "s_close") j++;
			j--;
			if (i !== j) {
				token = state.tokens[j];
				state.tokens[j] = state.tokens[i];
				state.tokens[i] = token;
			}
		}
	}
	module.exports.postProcess = function strikethrough(state) {
		var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
		postProcess(state, state.delimiters);
		for (curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess(state, tokens_meta[curr].delimiters);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/emphasis.js
var require_emphasis = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.tokenize = function emphasis(state, silent) {
		var i, scanned, token, start = state.pos, marker = state.src.charCodeAt(start);
		if (silent) return false;
		if (marker !== 95 && marker !== 42) return false;
		scanned = state.scanDelims(state.pos, marker === 42);
		for (i = 0; i < scanned.length; i++) {
			token = state.push("text", "", 0);
			token.content = String.fromCharCode(marker);
			state.delimiters.push({
				marker,
				length: scanned.length,
				token: state.tokens.length - 1,
				end: -1,
				open: scanned.can_open,
				close: scanned.can_close
			});
		}
		state.pos += scanned.length;
		return true;
	};
	function postProcess(state, delimiters) {
		var i = delimiters.length - 1, startDelim, endDelim, token, ch, isStrong;
		for (; i >= 0; i--) {
			startDelim = delimiters[i];
			if (startDelim.marker !== 95 && startDelim.marker !== 42) continue;
			if (startDelim.end === -1) continue;
			endDelim = delimiters[startDelim.end];
			isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1;
			ch = String.fromCharCode(startDelim.marker);
			token = state.tokens[startDelim.token];
			token.type = isStrong ? "strong_open" : "em_open";
			token.tag = isStrong ? "strong" : "em";
			token.nesting = 1;
			token.markup = isStrong ? ch + ch : ch;
			token.content = "";
			token = state.tokens[endDelim.token];
			token.type = isStrong ? "strong_close" : "em_close";
			token.tag = isStrong ? "strong" : "em";
			token.nesting = -1;
			token.markup = isStrong ? ch + ch : ch;
			token.content = "";
			if (isStrong) {
				state.tokens[delimiters[i - 1].token].content = "";
				state.tokens[delimiters[startDelim.end + 1].token].content = "";
				i--;
			}
		}
	}
	module.exports.postProcess = function emphasis(state) {
		var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
		postProcess(state, state.delimiters);
		for (curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess(state, tokens_meta[curr].delimiters);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/link.js
var require_link = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var normalizeReference = require_utils().normalizeReference;
	var isSpace = require_utils().isSpace;
	module.exports = function link(state, silent) {
		var attrs, code, label, labelEnd, labelStart, pos, res, ref, token, href = "", title = "", oldPos = state.pos, max = state.posMax, start = state.pos, parseReference = true;
		if (state.src.charCodeAt(state.pos) !== 91) return false;
		labelStart = state.pos + 1;
		labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
		if (labelEnd < 0) return false;
		pos = labelEnd + 1;
		if (pos < max && state.src.charCodeAt(pos) === 40) {
			parseReference = false;
			pos++;
			for (; pos < max; pos++) {
				code = state.src.charCodeAt(pos);
				if (!isSpace(code) && code !== 10) break;
			}
			if (pos >= max) return false;
			start = pos;
			res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
			if (res.ok) {
				href = state.md.normalizeLink(res.str);
				if (state.md.validateLink(href)) pos = res.pos;
				else href = "";
				start = pos;
				for (; pos < max; pos++) {
					code = state.src.charCodeAt(pos);
					if (!isSpace(code) && code !== 10) break;
				}
				res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
				if (pos < max && start !== pos && res.ok) {
					title = res.str;
					pos = res.pos;
					for (; pos < max; pos++) {
						code = state.src.charCodeAt(pos);
						if (!isSpace(code) && code !== 10) break;
					}
				}
			}
			if (pos >= max || state.src.charCodeAt(pos) !== 41) parseReference = true;
			pos++;
		}
		if (parseReference) {
			if (typeof state.env.references === "undefined") return false;
			if (pos < max && state.src.charCodeAt(pos) === 91) {
				start = pos + 1;
				pos = state.md.helpers.parseLinkLabel(state, pos);
				if (pos >= 0) label = state.src.slice(start, pos++);
				else pos = labelEnd + 1;
			} else pos = labelEnd + 1;
			if (!label) label = state.src.slice(labelStart, labelEnd);
			ref = state.env.references[normalizeReference(label)];
			if (!ref) {
				state.pos = oldPos;
				return false;
			}
			href = ref.href;
			title = ref.title;
		}
		if (!silent) {
			state.pos = labelStart;
			state.posMax = labelEnd;
			token = state.push("link_open", "a", 1);
			token.attrs = attrs = [["href", href]];
			if (title) attrs.push(["title", title]);
			state.linkLevel++;
			state.md.inline.tokenize(state);
			state.linkLevel--;
			token = state.push("link_close", "a", -1);
		}
		state.pos = pos;
		state.posMax = max;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/image.js
var require_image = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var normalizeReference = require_utils().normalizeReference;
	var isSpace = require_utils().isSpace;
	module.exports = function image(state, silent) {
		var attrs, code, content, label, labelEnd, labelStart, pos, ref, res, title, token, tokens, start, href = "", oldPos = state.pos, max = state.posMax;
		if (state.src.charCodeAt(state.pos) !== 33) return false;
		if (state.src.charCodeAt(state.pos + 1) !== 91) return false;
		labelStart = state.pos + 2;
		labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
		if (labelEnd < 0) return false;
		pos = labelEnd + 1;
		if (pos < max && state.src.charCodeAt(pos) === 40) {
			pos++;
			for (; pos < max; pos++) {
				code = state.src.charCodeAt(pos);
				if (!isSpace(code) && code !== 10) break;
			}
			if (pos >= max) return false;
			start = pos;
			res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
			if (res.ok) {
				href = state.md.normalizeLink(res.str);
				if (state.md.validateLink(href)) pos = res.pos;
				else href = "";
			}
			start = pos;
			for (; pos < max; pos++) {
				code = state.src.charCodeAt(pos);
				if (!isSpace(code) && code !== 10) break;
			}
			res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
			if (pos < max && start !== pos && res.ok) {
				title = res.str;
				pos = res.pos;
				for (; pos < max; pos++) {
					code = state.src.charCodeAt(pos);
					if (!isSpace(code) && code !== 10) break;
				}
			} else title = "";
			if (pos >= max || state.src.charCodeAt(pos) !== 41) {
				state.pos = oldPos;
				return false;
			}
			pos++;
		} else {
			if (typeof state.env.references === "undefined") return false;
			if (pos < max && state.src.charCodeAt(pos) === 91) {
				start = pos + 1;
				pos = state.md.helpers.parseLinkLabel(state, pos);
				if (pos >= 0) label = state.src.slice(start, pos++);
				else pos = labelEnd + 1;
			} else pos = labelEnd + 1;
			if (!label) label = state.src.slice(labelStart, labelEnd);
			ref = state.env.references[normalizeReference(label)];
			if (!ref) {
				state.pos = oldPos;
				return false;
			}
			href = ref.href;
			title = ref.title;
		}
		if (!silent) {
			content = state.src.slice(labelStart, labelEnd);
			state.md.inline.parse(content, state.md, state.env, tokens = []);
			token = state.push("image", "img", 0);
			token.attrs = attrs = [["src", href], ["alt", ""]];
			token.children = tokens;
			token.content = content;
			if (title) attrs.push(["title", title]);
		}
		state.pos = pos;
		state.posMax = max;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/autolink.js
var require_autolink = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
	var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
	module.exports = function autolink(state, silent) {
		var url, fullUrl, token, ch, start, max, pos = state.pos;
		if (state.src.charCodeAt(pos) !== 60) return false;
		start = state.pos;
		max = state.posMax;
		for (;;) {
			if (++pos >= max) return false;
			ch = state.src.charCodeAt(pos);
			if (ch === 60) return false;
			if (ch === 62) break;
		}
		url = state.src.slice(start + 1, pos);
		if (AUTOLINK_RE.test(url)) {
			fullUrl = state.md.normalizeLink(url);
			if (!state.md.validateLink(fullUrl)) return false;
			if (!silent) {
				token = state.push("link_open", "a", 1);
				token.attrs = [["href", fullUrl]];
				token.markup = "autolink";
				token.info = "auto";
				token = state.push("text", "", 0);
				token.content = state.md.normalizeLinkText(url);
				token = state.push("link_close", "a", -1);
				token.markup = "autolink";
				token.info = "auto";
			}
			state.pos += url.length + 2;
			return true;
		}
		if (EMAIL_RE.test(url)) {
			fullUrl = state.md.normalizeLink("mailto:" + url);
			if (!state.md.validateLink(fullUrl)) return false;
			if (!silent) {
				token = state.push("link_open", "a", 1);
				token.attrs = [["href", fullUrl]];
				token.markup = "autolink";
				token.info = "auto";
				token = state.push("text", "", 0);
				token.content = state.md.normalizeLinkText(url);
				token = state.push("link_close", "a", -1);
				token.markup = "autolink";
				token.info = "auto";
			}
			state.pos += url.length + 2;
			return true;
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/html_inline.js
var require_html_inline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var HTML_TAG_RE = require_html_re().HTML_TAG_RE;
	function isLinkOpen(str) {
		return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
		return /^<\/a\s*>/i.test(str);
	}
	function isLetter(ch) {
		var lc = ch | 32;
		return lc >= 97 && lc <= 122;
	}
	module.exports = function html_inline(state, silent) {
		var ch, match, max, token, pos = state.pos;
		if (!state.md.options.html) return false;
		max = state.posMax;
		if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) return false;
		ch = state.src.charCodeAt(pos + 1);
		if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) return false;
		match = state.src.slice(pos).match(HTML_TAG_RE);
		if (!match) return false;
		if (!silent) {
			token = state.push("html_inline", "", 0);
			token.content = match[0];
			if (isLinkOpen(token.content)) state.linkLevel++;
			if (isLinkClose(token.content)) state.linkLevel--;
		}
		state.pos += match[0].length;
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/entity.js
var require_entity = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var entities = require_entities();
	var has = require_utils().has;
	var isValidEntityCode = require_utils().isValidEntityCode;
	var fromCodePoint = require_utils().fromCodePoint;
	var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
	var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
	module.exports = function entity(state, silent) {
		var ch, code, match, token, pos = state.pos, max = state.posMax;
		if (state.src.charCodeAt(pos) !== 38) return false;
		if (pos + 1 >= max) return false;
		ch = state.src.charCodeAt(pos + 1);
		if (ch === 35) {
			match = state.src.slice(pos).match(DIGITAL_RE);
			if (match) {
				if (!silent) {
					code = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
					token = state.push("text_special", "", 0);
					token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(65533);
					token.markup = match[0];
					token.info = "entity";
				}
				state.pos += match[0].length;
				return true;
			}
		} else {
			match = state.src.slice(pos).match(NAMED_RE);
			if (match) {
				if (has(entities, match[1])) {
					if (!silent) {
						token = state.push("text_special", "", 0);
						token.content = entities[match[1]];
						token.markup = match[0];
						token.info = "entity";
					}
					state.pos += match[0].length;
					return true;
				}
			}
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/balance_pairs.js
var require_balance_pairs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function processDelimiters(delimiters) {
		var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx, isOddMatch, lastJump, openersBottom = {}, max = delimiters.length;
		if (!max) return;
		var headerIdx = 0;
		var lastTokenIdx = -2;
		var jumps = [];
		for (closerIdx = 0; closerIdx < max; closerIdx++) {
			closer = delimiters[closerIdx];
			jumps.push(0);
			if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) headerIdx = closerIdx;
			lastTokenIdx = closer.token;
			closer.length = closer.length || 0;
			if (!closer.close) continue;
			if (!openersBottom.hasOwnProperty(closer.marker)) openersBottom[closer.marker] = [
				-1,
				-1,
				-1,
				-1,
				-1,
				-1
			];
			minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
			openerIdx = headerIdx - jumps[headerIdx] - 1;
			newMinOpenerIdx = openerIdx;
			for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
				opener = delimiters[openerIdx];
				if (opener.marker !== closer.marker) continue;
				if (opener.open && opener.end < 0) {
					isOddMatch = false;
					if (opener.close || closer.open) {
						if ((opener.length + closer.length) % 3 === 0) {
							if (opener.length % 3 !== 0 || closer.length % 3 !== 0) isOddMatch = true;
						}
					}
					if (!isOddMatch) {
						lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
						jumps[closerIdx] = closerIdx - openerIdx + lastJump;
						jumps[openerIdx] = lastJump;
						closer.open = false;
						opener.end = closerIdx;
						opener.close = false;
						newMinOpenerIdx = -1;
						lastTokenIdx = -2;
						break;
					}
				}
			}
			if (newMinOpenerIdx !== -1) openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
		}
	}
	module.exports = function link_pairs(state) {
		var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
		processDelimiters(state.delimiters);
		for (curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) processDelimiters(tokens_meta[curr].delimiters);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/fragments_join.js
var require_fragments_join = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function fragments_join(state) {
		var curr, last, level = 0, tokens = state.tokens, max = state.tokens.length;
		for (curr = last = 0; curr < max; curr++) {
			if (tokens[curr].nesting < 0) level--;
			tokens[curr].level = level;
			if (tokens[curr].nesting > 0) level++;
			if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
			else {
				if (curr !== last) tokens[last] = tokens[curr];
				last++;
			}
		}
		if (curr !== last) tokens.length = last;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/rules_inline/state_inline.js
var require_state_inline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Token = require_token();
	var isWhiteSpace = require_utils().isWhiteSpace;
	var isPunctChar = require_utils().isPunctChar;
	var isMdAsciiPunct = require_utils().isMdAsciiPunct;
	function StateInline(src, md, env, outTokens) {
		this.src = src;
		this.env = env;
		this.md = md;
		this.tokens = outTokens;
		this.tokens_meta = Array(outTokens.length);
		this.pos = 0;
		this.posMax = this.src.length;
		this.level = 0;
		this.pending = "";
		this.pendingLevel = 0;
		this.cache = {};
		this.delimiters = [];
		this._prev_delimiters = [];
		this.backticks = {};
		this.backticksScanned = false;
		this.linkLevel = 0;
	}
	StateInline.prototype.pushPending = function() {
		var token = new Token("text", "", 0);
		token.content = this.pending;
		token.level = this.pendingLevel;
		this.tokens.push(token);
		this.pending = "";
		return token;
	};
	StateInline.prototype.push = function(type, tag, nesting) {
		if (this.pending) this.pushPending();
		var token = new Token(type, tag, nesting);
		var token_meta = null;
		if (nesting < 0) {
			this.level--;
			this.delimiters = this._prev_delimiters.pop();
		}
		token.level = this.level;
		if (nesting > 0) {
			this.level++;
			this._prev_delimiters.push(this.delimiters);
			this.delimiters = [];
			token_meta = { delimiters: this.delimiters };
		}
		this.pendingLevel = this.level;
		this.tokens.push(token);
		this.tokens_meta.push(token_meta);
		return token;
	};
	StateInline.prototype.scanDelims = function(start, canSplitWord) {
		var pos = start, lastChar, nextChar, count, can_open, can_close, isLastWhiteSpace, isLastPunctChar, isNextWhiteSpace, isNextPunctChar, left_flanking = true, right_flanking = true, max = this.posMax, marker = this.src.charCodeAt(start);
		lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
		while (pos < max && this.src.charCodeAt(pos) === marker) pos++;
		count = pos - start;
		nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
		isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
		isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
		isLastWhiteSpace = isWhiteSpace(lastChar);
		isNextWhiteSpace = isWhiteSpace(nextChar);
		if (isNextWhiteSpace) left_flanking = false;
		else if (isNextPunctChar) {
			if (!(isLastWhiteSpace || isLastPunctChar)) left_flanking = false;
		}
		if (isLastWhiteSpace) right_flanking = false;
		else if (isLastPunctChar) {
			if (!(isNextWhiteSpace || isNextPunctChar)) right_flanking = false;
		}
		if (!canSplitWord) {
			can_open = left_flanking && (!right_flanking || isLastPunctChar);
			can_close = right_flanking && (!left_flanking || isNextPunctChar);
		} else {
			can_open = left_flanking;
			can_close = right_flanking;
		}
		return {
			can_open,
			can_close,
			length: count
		};
	};
	StateInline.prototype.Token = Token;
	module.exports = StateInline;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/parser_inline.js
/** internal
* class ParserInline
*
* Tokenizes paragraph content.
**/
var require_parser_inline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Ruler = require_ruler();
	var _rules = [
		["text", require_text()],
		["linkify", require_linkify()],
		["newline", require_newline()],
		["escape", require_escape()],
		["backticks", require_backticks()],
		["strikethrough", require_strikethrough().tokenize],
		["emphasis", require_emphasis().tokenize],
		["link", require_link()],
		["image", require_image()],
		["autolink", require_autolink()],
		["html_inline", require_html_inline()],
		["entity", require_entity()]
	];
	var _rules2 = [
		["balance_pairs", require_balance_pairs()],
		["strikethrough", require_strikethrough().postProcess],
		["emphasis", require_emphasis().postProcess],
		["fragments_join", require_fragments_join()]
	];
	/**
	* new ParserInline()
	**/
	function ParserInline() {
		var i;
		/**
		* ParserInline#ruler -> Ruler
		*
		* [[Ruler]] instance. Keep configuration of inline rules.
		**/
		this.ruler = new Ruler();
		for (i = 0; i < _rules.length; i++) this.ruler.push(_rules[i][0], _rules[i][1]);
		/**
		* ParserInline#ruler2 -> Ruler
		*
		* [[Ruler]] instance. Second ruler used for post-processing
		* (e.g. in emphasis-like rules).
		**/
		this.ruler2 = new Ruler();
		for (i = 0; i < _rules2.length; i++) this.ruler2.push(_rules2[i][0], _rules2[i][1]);
	}
	ParserInline.prototype.skipToken = function(state) {
		var ok, i, pos = state.pos, rules = this.ruler.getRules(""), len = rules.length, maxNesting = state.md.options.maxNesting, cache = state.cache;
		if (typeof cache[pos] !== "undefined") {
			state.pos = cache[pos];
			return;
		}
		if (state.level < maxNesting) for (i = 0; i < len; i++) {
			state.level++;
			ok = rules[i](state, true);
			state.level--;
			if (ok) {
				if (pos >= state.pos) throw new Error("inline rule didn't increment state.pos");
				break;
			}
		}
		else state.pos = state.posMax;
		if (!ok) state.pos++;
		cache[pos] = state.pos;
	};
	ParserInline.prototype.tokenize = function(state) {
		var ok, i, prevPos, rules = this.ruler.getRules(""), len = rules.length, end = state.posMax, maxNesting = state.md.options.maxNesting;
		while (state.pos < end) {
			prevPos = state.pos;
			if (state.level < maxNesting) for (i = 0; i < len; i++) {
				ok = rules[i](state, false);
				if (ok) {
					if (prevPos >= state.pos) throw new Error("inline rule didn't increment state.pos");
					break;
				}
			}
			if (ok) {
				if (state.pos >= end) break;
				continue;
			}
			state.pending += state.src[state.pos++];
		}
		if (state.pending) state.pushPending();
	};
	/**
	* ParserInline.parse(str, md, env, outTokens)
	*
	* Process input string and push inline tokens into `outTokens`
	**/
	ParserInline.prototype.parse = function(str, md, env, outTokens) {
		var i, rules, len;
		var state = new this.State(str, md, env, outTokens);
		this.tokenize(state);
		rules = this.ruler2.getRules("");
		len = rules.length;
		for (i = 0; i < len; i++) rules[i](state);
	};
	ParserInline.prototype.State = require_state_inline();
	module.exports = ParserInline;
}));
//#endregion
//#region ../../node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/lib/re.js
var require_re = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(opts) {
		var re = {};
		opts = opts || {};
		re.src_Any = require_regex$3().source;
		re.src_Cc = require_regex$2().source;
		re.src_Z = require_regex().source;
		re.src_P = require_regex$4().source;
		re.src_ZPCc = [
			re.src_Z,
			re.src_P,
			re.src_Cc
		].join("|");
		re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
		var text_separators = "[><｜]";
		re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
		re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
		re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
		re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
		re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
		re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + "|[()[\\]{}.,\"'?!\\-;]).|\\[(?:(?!" + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + "|[}]).)*\\}|\\\"(?:(?!" + re.src_ZCc + "|[\"]).)+\\\"|\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
		re.src_email_name = "[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\\"\\.a-zA-Z0-9_]*";
		re.src_xn = "xn--[a-z0-9\\-]{1,59}";
		re.src_domain_root = "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
		re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
		re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
		re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
		re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
		re.src_host_strict = re.src_host + re.src_host_terminator;
		re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
		re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
		re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
		re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
		re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
		re.tpl_email_fuzzy = "(^|" + text_separators + "|\"|\\(|" + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
		re.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
		re.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
		return re;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/index.js
var require_linkify_it = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function assign(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			if (!source) return;
			Object.keys(source).forEach(function(key) {
				obj[key] = source[key];
			});
		});
		return obj;
	}
	function _class(obj) {
		return Object.prototype.toString.call(obj);
	}
	function isString(obj) {
		return _class(obj) === "[object String]";
	}
	function isObject(obj) {
		return _class(obj) === "[object Object]";
	}
	function isRegExp(obj) {
		return _class(obj) === "[object RegExp]";
	}
	function isFunction(obj) {
		return _class(obj) === "[object Function]";
	}
	function escapeRE(str) {
		return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
	}
	var defaultOptions = {
		fuzzyLink: true,
		fuzzyEmail: true,
		fuzzyIP: false
	};
	function isOptionsObj(obj) {
		return Object.keys(obj || {}).reduce(function(acc, k) {
			return acc || defaultOptions.hasOwnProperty(k);
		}, false);
	}
	var defaultSchemas = {
		"http:": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.http) self.re.http = new RegExp("^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, "i");
			if (self.re.http.test(tail)) return tail.match(self.re.http)[0].length;
			return 0;
		} },
		"https:": "http:",
		"ftp:": "http:",
		"//": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.no_http) self.re.no_http = new RegExp("^" + self.re.src_auth + "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path, "i");
			if (self.re.no_http.test(tail)) {
				if (pos >= 3 && text[pos - 3] === ":") return 0;
				if (pos >= 3 && text[pos - 3] === "/") return 0;
				return tail.match(self.re.no_http)[0].length;
			}
			return 0;
		} },
		"mailto:": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.mailto) self.re.mailto = new RegExp("^" + self.re.src_email_name + "@" + self.re.src_host_strict, "i");
			if (self.re.mailto.test(tail)) return tail.match(self.re.mailto)[0].length;
			return 0;
		} }
	};
	var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
	var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
	function resetScanCache(self) {
		self.__index__ = -1;
		self.__text_cache__ = "";
	}
	function createValidator(re) {
		return function(text, pos) {
			var tail = text.slice(pos);
			if (re.test(tail)) return tail.match(re)[0].length;
			return 0;
		};
	}
	function createNormalizer() {
		return function(match, self) {
			self.normalize(match);
		};
	}
	function compile(self) {
		var re = self.re = require_re()(self.__opts__);
		var tlds = self.__tlds__.slice();
		self.onCompile();
		if (!self.__tlds_replaced__) tlds.push(tlds_2ch_src_re);
		tlds.push(re.src_xn);
		re.src_tlds = tlds.join("|");
		function untpl(tpl) {
			return tpl.replace("%TLDS%", re.src_tlds);
		}
		re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
		re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
		re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
		re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
		var aliases = [];
		self.__compiled__ = {};
		function schemaError(name, val) {
			throw new Error("(LinkifyIt) Invalid schema \"" + name + "\": " + val);
		}
		Object.keys(self.__schemas__).forEach(function(name) {
			var val = self.__schemas__[name];
			if (val === null) return;
			var compiled = {
				validate: null,
				link: null
			};
			self.__compiled__[name] = compiled;
			if (isObject(val)) {
				if (isRegExp(val.validate)) compiled.validate = createValidator(val.validate);
				else if (isFunction(val.validate)) compiled.validate = val.validate;
				else schemaError(name, val);
				if (isFunction(val.normalize)) compiled.normalize = val.normalize;
				else if (!val.normalize) compiled.normalize = createNormalizer();
				else schemaError(name, val);
				return;
			}
			if (isString(val)) {
				aliases.push(name);
				return;
			}
			schemaError(name, val);
		});
		aliases.forEach(function(alias) {
			if (!self.__compiled__[self.__schemas__[alias]]) return;
			self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
			self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
		});
		self.__compiled__[""] = {
			validate: null,
			normalize: createNormalizer()
		};
		var slist = Object.keys(self.__compiled__).filter(function(name) {
			return name.length > 0 && self.__compiled__[name];
		}).map(escapeRE).join("|");
		self.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "i");
		self.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
		self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
		self.re.pretest = RegExp("(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@", "i");
		resetScanCache(self);
	}
	/**
	* class Match
	*
	* Match result. Single element of array, returned by [[LinkifyIt#match]]
	**/
	function Match(self, shift) {
		var start = self.__index__, end = self.__last_index__, text = self.__text_cache__.slice(start, end);
		/**
		* Match#schema -> String
		*
		* Prefix (protocol) for matched string.
		**/
		this.schema = self.__schema__.toLowerCase();
		/**
		* Match#index -> Number
		*
		* First position of matched string.
		**/
		this.index = start + shift;
		/**
		* Match#lastIndex -> Number
		*
		* Next position after matched string.
		**/
		this.lastIndex = end + shift;
		/**
		* Match#raw -> String
		*
		* Matched string.
		**/
		this.raw = text;
		/**
		* Match#text -> String
		*
		* Notmalized text of matched string.
		**/
		this.text = text;
		/**
		* Match#url -> String
		*
		* Normalized url of matched string.
		**/
		this.url = text;
	}
	function createMatch(self, shift) {
		var match = new Match(self, shift);
		self.__compiled__[match.schema].normalize(match, self);
		return match;
	}
	/**
	* class LinkifyIt
	**/
	/**
	* new LinkifyIt(schemas, options)
	* - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
	* - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	*
	* Creates new linkifier instance with optional additional schemas.
	* Can be called without `new` keyword for convenience.
	*
	* By default understands:
	*
	* - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
	* - "fuzzy" links and emails (example.com, foo@bar.com).
	*
	* `schemas` is an object, where each key/value describes protocol/rule:
	*
	* - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
	*   for example). `linkify-it` makes shure that prefix is not preceeded with
	*   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
	* - __value__ - rule to check tail after link prefix
	*   - _String_ - just alias to existing rule
	*   - _Object_
	*     - _validate_ - validator function (should return matched length on success),
	*       or `RegExp`.
	*     - _normalize_ - optional function to normalize text & url of matched result
	*       (for example, for @twitter mentions).
	*
	* `options`:
	*
	* - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
	* - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
	*   like version numbers. Default `false`.
	* - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
	*
	**/
	function LinkifyIt(schemas, options) {
		if (!(this instanceof LinkifyIt)) return new LinkifyIt(schemas, options);
		if (!options) {
			if (isOptionsObj(schemas)) {
				options = schemas;
				schemas = {};
			}
		}
		this.__opts__ = assign({}, defaultOptions, options);
		this.__index__ = -1;
		this.__last_index__ = -1;
		this.__schema__ = "";
		this.__text_cache__ = "";
		this.__schemas__ = assign({}, defaultSchemas, schemas);
		this.__compiled__ = {};
		this.__tlds__ = tlds_default;
		this.__tlds_replaced__ = false;
		this.re = {};
		compile(this);
	}
	/** chainable
	* LinkifyIt#add(schema, definition)
	* - schema (String): rule name (fixed pattern prefix)
	* - definition (String|RegExp|Object): schema definition
	*
	* Add new rule definition. See constructor description for details.
	**/
	LinkifyIt.prototype.add = function add(schema, definition) {
		this.__schemas__[schema] = definition;
		compile(this);
		return this;
	};
	/** chainable
	* LinkifyIt#set(options)
	* - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	*
	* Set recognition options for links without schema.
	**/
	LinkifyIt.prototype.set = function set(options) {
		this.__opts__ = assign(this.__opts__, options);
		return this;
	};
	/**
	* LinkifyIt#test(text) -> Boolean
	*
	* Searches linkifiable pattern and returns `true` on success or `false` on fail.
	**/
	LinkifyIt.prototype.test = function test(text) {
		this.__text_cache__ = text;
		this.__index__ = -1;
		if (!text.length) return false;
		var m, ml, me, len, shift, next, re, tld_pos, at_pos;
		if (this.re.schema_test.test(text)) {
			re = this.re.schema_search;
			re.lastIndex = 0;
			while ((m = re.exec(text)) !== null) {
				len = this.testSchemaAt(text, m[2], re.lastIndex);
				if (len) {
					this.__schema__ = m[2];
					this.__index__ = m.index + m[1].length;
					this.__last_index__ = m.index + m[0].length + len;
					break;
				}
			}
		}
		if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
			tld_pos = text.search(this.re.host_fuzzy_test);
			if (tld_pos >= 0) {
				if (this.__index__ < 0 || tld_pos < this.__index__) {
					if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
						shift = ml.index + ml[1].length;
						if (this.__index__ < 0 || shift < this.__index__) {
							this.__schema__ = "";
							this.__index__ = shift;
							this.__last_index__ = ml.index + ml[0].length;
						}
					}
				}
			}
		}
		if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
			at_pos = text.indexOf("@");
			if (at_pos >= 0) {
				if ((me = text.match(this.re.email_fuzzy)) !== null) {
					shift = me.index + me[1].length;
					next = me.index + me[0].length;
					if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
						this.__schema__ = "mailto:";
						this.__index__ = shift;
						this.__last_index__ = next;
					}
				}
			}
		}
		return this.__index__ >= 0;
	};
	/**
	* LinkifyIt#pretest(text) -> Boolean
	*
	* Very quick check, that can give false positives. Returns true if link MAY BE
	* can exists. Can be used for speed optimization, when you need to check that
	* link NOT exists.
	**/
	LinkifyIt.prototype.pretest = function pretest(text) {
		return this.re.pretest.test(text);
	};
	/**
	* LinkifyIt#testSchemaAt(text, name, position) -> Number
	* - text (String): text to scan
	* - name (String): rule (schema) name
	* - position (Number): text offset to check from
	*
	* Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
	* at given position. Returns length of found pattern (0 on fail).
	**/
	LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
		if (!this.__compiled__[schema.toLowerCase()]) return 0;
		return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};
	/**
	* LinkifyIt#match(text) -> Array|null
	*
	* Returns array of found link descriptions or `null` on fail. We strongly
	* recommend to use [[LinkifyIt#test]] first, for best speed.
	*
	* ##### Result match description
	*
	* - __schema__ - link schema, can be empty for fuzzy links, or `//` for
	*   protocol-neutral  links.
	* - __index__ - offset of matched text
	* - __lastIndex__ - index of next char after mathch end
	* - __raw__ - matched text
	* - __text__ - normalized text
	* - __url__ - link, generated from matched text
	**/
	LinkifyIt.prototype.match = function match(text) {
		var shift = 0, result = [];
		if (this.__index__ >= 0 && this.__text_cache__ === text) {
			result.push(createMatch(this, shift));
			shift = this.__last_index__;
		}
		var tail = shift ? text.slice(shift) : text;
		while (this.test(tail)) {
			result.push(createMatch(this, shift));
			tail = tail.slice(this.__last_index__);
			shift += this.__last_index__;
		}
		if (result.length) return result;
		return null;
	};
	/**
	* LinkifyIt#matchAtStart(text) -> Match|null
	*
	* Returns fully-formed (not fuzzy) link if it starts at the beginning
	* of the string, and null otherwise.
	**/
	LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
		this.__text_cache__ = text;
		this.__index__ = -1;
		if (!text.length) return null;
		var m = this.re.schema_at_start.exec(text);
		if (!m) return null;
		var len = this.testSchemaAt(text, m[2], m[0].length);
		if (!len) return null;
		this.__schema__ = m[2];
		this.__index__ = m.index + m[1].length;
		this.__last_index__ = m.index + m[0].length + len;
		return createMatch(this, 0);
	};
	/** chainable
	* LinkifyIt#tlds(list [, keepOld]) -> this
	* - list (Array): list of tlds
	* - keepOld (Boolean): merge with current list if `true` (`false` by default)
	*
	* Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
	* to avoid false positives. By default this algorythm used:
	*
	* - hostname with any 2-letter root zones are ok.
	* - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
	*   are ok.
	* - encoded (`xn--...`) root zones are ok.
	*
	* If list is replaced, then exact match for 2-chars root zones will be checked.
	**/
	LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
		list = Array.isArray(list) ? list : [list];
		if (!keepOld) {
			this.__tlds__ = list.slice();
			this.__tlds_replaced__ = true;
			compile(this);
			return this;
		}
		this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
			return el !== arr[idx - 1];
		}).reverse();
		compile(this);
		return this;
	};
	/**
	* LinkifyIt#normalize(match)
	*
	* Default normalizer (if schema does not define it's own).
	**/
	LinkifyIt.prototype.normalize = function normalize(match) {
		if (!match.schema) match.url = "http://" + match.url;
		if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) match.url = "mailto:" + match.url;
	};
	/**
	* LinkifyIt#onCompile()
	*
	* Override to modify basic RegExp-s.
	**/
	LinkifyIt.prototype.onCompile = function onCompile() {};
	module.exports = LinkifyIt;
}));
//#endregion
//#region ../../node_modules/.pnpm/punycode@1.4.1/node_modules/punycode/punycode.js
var require_punycode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! https://mths.be/punycode v1.4.1 by @mathias */
	(function(root) {
		/** Detect free variables */
		var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
		var freeModule = typeof module == "object" && module && !module.nodeType && module;
		var freeGlobal = typeof globalThis == "object" && globalThis;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) root = freeGlobal;
		/**
		* The `punycode` object.
		* @name punycode
		* @type Object
		*/
		var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
			"overflow": "Overflow: input needs wider integers to process",
			"not-basic": "Illegal input >= 0x80 (not a basic code point)",
			"invalid-input": "Invalid input"
		}, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
		/**
		* A generic error utility function.
		* @private
		* @param {String} type The error type.
		* @returns {Error} Throws a `RangeError` with the applicable error message.
		*/
		function error(type) {
			throw new RangeError(errors[type]);
		}
		/**
		* A generic `Array#map` utility function.
		* @private
		* @param {Array} array The array to iterate over.
		* @param {Function} callback The function that gets called for every array
		* item.
		* @returns {Array} A new array of values returned by the callback function.
		*/
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) result[length] = fn(array[length]);
			return result;
		}
		/**
		* A simple `Array#map`-like wrapper to work with domain name strings or email
		* addresses.
		* @private
		* @param {String} domain The domain name or email address.
		* @param {Function} callback The function that gets called for every
		* character.
		* @returns {Array} A new string of characters returned by the callback
		* function.
		*/
		function mapDomain(string, fn) {
			var parts = string.split("@");
			var result = "";
			if (parts.length > 1) {
				result = parts[0] + "@";
				string = parts[1];
			}
			string = string.replace(regexSeparators, ".");
			var encoded = map(string.split("."), fn).join(".");
			return result + encoded;
		}
		/**
		* Creates an array containing the numeric code points of each Unicode
		* character in the string. While JavaScript uses UCS-2 internally,
		* this function will convert a pair of surrogate halves (each of which
		* UCS-2 exposes as separate characters) into a single code point,
		* matching UTF-16.
		* @see `punycode.ucs2.encode`
		* @see <https://mathiasbynens.be/notes/javascript-encoding>
		* @memberOf punycode.ucs2
		* @name decode
		* @param {String} string The Unicode input string (UCS-2).
		* @returns {Array} The new array of code points.
		*/
		function ucs2decode(string) {
			var output = [], counter = 0, length = string.length, value, extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 55296 && value <= 56319 && counter < length) {
					extra = string.charCodeAt(counter++);
					if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
					else {
						output.push(value);
						counter--;
					}
				} else output.push(value);
			}
			return output;
		}
		/**
		* Creates a string based on an array of numeric code points.
		* @see `punycode.ucs2.decode`
		* @memberOf punycode.ucs2
		* @name encode
		* @param {Array} codePoints The array of numeric code points.
		* @returns {String} The new Unicode string (UCS-2).
		*/
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = "";
				if (value > 65535) {
					value -= 65536;
					output += stringFromCharCode(value >>> 10 & 1023 | 55296);
					value = 56320 | value & 1023;
				}
				output += stringFromCharCode(value);
				return output;
			}).join("");
		}
		/**
		* Converts a basic code point into a digit/integer.
		* @see `digitToBasic()`
		* @private
		* @param {Number} codePoint The basic numeric code point value.
		* @returns {Number} The numeric value of a basic code point (for use in
		* representing integers) in the range `0` to `base - 1`, or `base` if
		* the code point does not represent a value.
		*/
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) return codePoint - 22;
			if (codePoint - 65 < 26) return codePoint - 65;
			if (codePoint - 97 < 26) return codePoint - 97;
			return base;
		}
		/**
		* Converts a digit/integer into a basic code point.
		* @see `basicToDigit()`
		* @private
		* @param {Number} digit The numeric value of a basic code point.
		* @returns {Number} The basic code point whose value (when used for
		* representing integers) is `digit`, which needs to be in the range
		* `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		* used; else, the lowercase form is used. The behavior is undefined
		* if `flag` is non-zero and `digit` has no uppercase form.
		*/
		function digitToBasic(digit, flag) {
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
		/**
		* Bias adaptation function as per section 3.4 of RFC 3492.
		* https://tools.ietf.org/html/rfc3492#section-3.4
		* @private
		*/
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; delta > baseMinusTMin * tMax >> 1; k += base) delta = floor(delta / baseMinusTMin);
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
		/**
		* Converts a Punycode string of ASCII-only symbols to a string of Unicode
		* symbols.
		* @memberOf punycode
		* @param {String} input The Punycode string of ASCII-only symbols.
		* @returns {String} The resulting string of Unicode symbols.
		*/
		function decode(input) {
			var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic = input.lastIndexOf(delimiter), j, index, oldi, w, k, digit, t, baseMinusT;
			if (basic < 0) basic = 0;
			for (j = 0; j < basic; ++j) {
				if (input.charCodeAt(j) >= 128) error("not-basic");
				output.push(input.charCodeAt(j));
			}
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
				for (oldi = i, w = 1, k = base;; k += base) {
					if (index >= inputLength) error("invalid-input");
					digit = basicToDigit(input.charCodeAt(index++));
					if (digit >= base || digit > floor((maxInt - i) / w)) error("overflow");
					i += digit * w;
					t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
					if (digit < t) break;
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) error("overflow");
					w *= baseMinusT;
				}
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
				if (floor(i / out) > maxInt - n) error("overflow");
				n += floor(i / out);
				i %= out;
				output.splice(i++, 0, n);
			}
			return ucs2encode(output);
		}
		/**
		* Converts a string of Unicode symbols (e.g. a domain name label) to a
		* Punycode string of ASCII-only symbols.
		* @memberOf punycode
		* @param {String} input The string of Unicode symbols.
		* @returns {String} The resulting Punycode string of ASCII-only symbols.
		*/
		function encode(input) {
			var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
			input = ucs2decode(input);
			inputLength = input.length;
			n = initialN;
			delta = 0;
			bias = initialBias;
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 128) output.push(stringFromCharCode(currentValue));
			}
			handledCPCount = basicLength = output.length;
			if (basicLength) output.push(delimiter);
			while (handledCPCount < inputLength) {
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) m = currentValue;
				}
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) error("overflow");
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue < n && ++delta > maxInt) error("overflow");
					if (currentValue == n) {
						for (q = delta, k = base;; k += base) {
							t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) break;
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
				++delta;
				++n;
			}
			return output.join("");
		}
		/**
		* Converts a Punycode string representing a domain name or an email address
		* to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		* it doesn't matter if you call it on a string that has already been
		* converted to Unicode.
		* @memberOf punycode
		* @param {String} input The Punycoded domain name or email address to
		* convert to Unicode.
		* @returns {String} The Unicode representation of the given Punycode
		* string.
		*/
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		}
		/**
		* Converts a Unicode string representing a domain name or an email address to
		* Punycode. Only the non-ASCII parts of the domain name will be converted,
		* i.e. it doesn't matter if you call it with a domain that's already in
		* ASCII.
		* @memberOf punycode
		* @param {String} input The domain name or email address to convert, as a
		* Unicode string.
		* @returns {String} The Punycode representation of the given domain name or
		* email address.
		*/
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
			});
		}
		/** Define the public API */
		punycode = {
			/**
			* A string representing the current Punycode.js version number.
			* @memberOf punycode
			* @type String
			*/
			"version": "1.4.1",
			/**
			* An object of methods to convert from JavaScript's internal character
			* representation (UCS-2) to Unicode code points, and back.
			* @see <https://mathiasbynens.be/notes/javascript-encoding>
			* @memberOf punycode
			* @type Object
			*/
			"ucs2": {
				"decode": ucs2decode,
				"encode": ucs2encode
			},
			"decode": decode,
			"encode": encode,
			"toASCII": toASCII,
			"toUnicode": toUnicode
		};
		/** Expose `punycode` */
		if (typeof define == "function" && typeof define.amd == "object" && define.amd) define("punycode", function() {
			return punycode;
		});
		else if (freeExports && freeModule) {
			if (module.exports == freeExports) freeModule.exports = punycode;
			else for (key in punycode) punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
		} else root.punycode = punycode;
	})(exports);
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/presets/default.js
var require_default = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		options: {
			html: false,
			xhtmlOut: false,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 100
		},
		components: {
			core: {},
			block: {},
			inline: {}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/presets/zero.js
var require_zero = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		options: {
			html: false,
			xhtmlOut: false,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: ["paragraph"] },
			inline: {
				rules: ["text"],
				rules2: ["balance_pairs", "fragments_join"]
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/presets/commonmark.js
var require_commonmark = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		options: {
			html: true,
			xhtmlOut: true,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: [
				"blockquote",
				"code",
				"fence",
				"heading",
				"hr",
				"html_block",
				"lheading",
				"list",
				"reference",
				"paragraph"
			] },
			inline: {
				rules: [
					"autolink",
					"backticks",
					"emphasis",
					"entity",
					"escape",
					"html_inline",
					"image",
					"link",
					"newline",
					"text"
				],
				rules2: [
					"balance_pairs",
					"emphasis",
					"fragments_join"
				]
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var helpers = require_helpers();
	var Renderer = require_renderer();
	var ParserCore = require_parser_core();
	var ParserBlock = require_parser_block();
	var ParserInline = require_parser_inline();
	var LinkifyIt = require_linkify_it();
	var mdurl = require_mdurl();
	var punycode = require_punycode();
	var config = {
		default: require_default(),
		zero: require_zero(),
		commonmark: require_commonmark()
	};
	var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
	var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
	function validateLink(url) {
		var str = url.trim().toLowerCase();
		return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) ? true : false : true;
	}
	var RECODE_HOSTNAME_FOR = [
		"http:",
		"https:",
		"mailto:"
	];
	function normalizeLink(url) {
		var parsed = mdurl.parse(url, true);
		if (parsed.hostname) {
			if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) try {
				parsed.hostname = punycode.toASCII(parsed.hostname);
			} catch (er) {}
		}
		return mdurl.encode(mdurl.format(parsed));
	}
	function normalizeLinkText(url) {
		var parsed = mdurl.parse(url, true);
		if (parsed.hostname) {
			if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) try {
				parsed.hostname = punycode.toUnicode(parsed.hostname);
			} catch (er) {}
		}
		return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + "%");
	}
	/**
	* class MarkdownIt
	*
	* Main parser/renderer class.
	*
	* ##### Usage
	*
	* ```javascript
	* // node.js, "classic" way:
	* var MarkdownIt = require('markdown-it'),
	*     md = new MarkdownIt();
	* var result = md.render('# markdown-it rulezz!');
	*
	* // node.js, the same, but with sugar:
	* var md = require('markdown-it')();
	* var result = md.render('# markdown-it rulezz!');
	*
	* // browser without AMD, added to "window" on script load
	* // Note, there are no dash.
	* var md = window.markdownit();
	* var result = md.render('# markdown-it rulezz!');
	* ```
	*
	* Single line rendering, without paragraph wrap:
	*
	* ```javascript
	* var md = require('markdown-it')();
	* var result = md.renderInline('__markdown-it__ rulezz!');
	* ```
	**/
	/**
	* new MarkdownIt([presetName, options])
	* - presetName (String): optional, `commonmark` / `zero`
	* - options (Object)
	*
	* Creates parser instanse with given config. Can be called without `new`.
	*
	* ##### presetName
	*
	* MarkdownIt provides named presets as a convenience to quickly
	* enable/disable active syntax rules and options for common use cases.
	*
	* - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
	*   configures parser to strict [CommonMark](http://commonmark.org/) mode.
	* - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
	*   similar to GFM, used when no preset name given. Enables all available rules,
	*   but still without html, typographer & autolinker.
	* - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
	*   all rules disabled. Useful to quickly setup your config via `.enable()`.
	*   For example, when you need only `bold` and `italic` markup and nothing else.
	*
	* ##### options:
	*
	* - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
	*   That's not safe! You may need external sanitizer to protect output from XSS.
	*   It's better to extend features via plugins, instead of enabling HTML.
	* - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
	*   (`<br />`). This is needed only for full CommonMark compatibility. In real
	*   world you will need HTML output.
	* - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
	* - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
	*   Can be useful for external highlighters.
	* - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
	* - __typographer__  - `false`. Set `true` to enable [some language-neutral
	*   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
	*   quotes beautification (smartquotes).
	* - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
	*   pairs, when typographer enabled and smartquotes on. For example, you can
	*   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
	*   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
	* - __highlight__ - `null`. Highlighter function for fenced code blocks.
	*   Highlighter `function (str, lang)` should return escaped HTML. It can also
	*   return empty string if the source was not changed and should be escaped
	*   externaly. If result starts with <pre... internal wrapper is skipped.
	*
	* ##### Example
	*
	* ```javascript
	* // commonmark mode
	* var md = require('markdown-it')('commonmark');
	*
	* // default mode
	* var md = require('markdown-it')();
	*
	* // enable everything
	* var md = require('markdown-it')({
	*   html: true,
	*   linkify: true,
	*   typographer: true
	* });
	* ```
	*
	* ##### Syntax highlighting
	*
	* ```js
	* var hljs = require('highlight.js') // https://highlightjs.org/
	*
	* var md = require('markdown-it')({
	*   highlight: function (str, lang) {
	*     if (lang && hljs.getLanguage(lang)) {
	*       try {
	*         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
	*       } catch (__) {}
	*     }
	*
	*     return ''; // use external default escaping
	*   }
	* });
	* ```
	*
	* Or with full wrapper override (if you need assign class to `<pre>`):
	*
	* ```javascript
	* var hljs = require('highlight.js') // https://highlightjs.org/
	*
	* // Actual default values
	* var md = require('markdown-it')({
	*   highlight: function (str, lang) {
	*     if (lang && hljs.getLanguage(lang)) {
	*       try {
	*         return '<pre class="hljs"><code>' +
	*                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
	*                '</code></pre>';
	*       } catch (__) {}
	*     }
	*
	*     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	*   }
	* });
	* ```
	*
	**/
	function MarkdownIt(presetName, options) {
		if (!(this instanceof MarkdownIt)) return new MarkdownIt(presetName, options);
		if (!options) {
			if (!utils.isString(presetName)) {
				options = presetName || {};
				presetName = "default";
			}
		}
		/**
		* MarkdownIt#inline -> ParserInline
		*
		* Instance of [[ParserInline]]. You may need it to add new rules when
		* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
		* [[MarkdownIt.enable]].
		**/
		this.inline = new ParserInline();
		/**
		* MarkdownIt#block -> ParserBlock
		*
		* Instance of [[ParserBlock]]. You may need it to add new rules when
		* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
		* [[MarkdownIt.enable]].
		**/
		this.block = new ParserBlock();
		/**
		* MarkdownIt#core -> Core
		*
		* Instance of [[Core]] chain executor. You may need it to add new rules when
		* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
		* [[MarkdownIt.enable]].
		**/
		this.core = new ParserCore();
		/**
		* MarkdownIt#renderer -> Renderer
		*
		* Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
		* rules for new token types, generated by plugins.
		*
		* ##### Example
		*
		* ```javascript
		* var md = require('markdown-it')();
		*
		* function myToken(tokens, idx, options, env, self) {
		*   //...
		*   return result;
		* };
		*
		* md.renderer.rules['my_token'] = myToken
		* ```
		*
		* See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
		**/
		this.renderer = new Renderer();
		/**
		* MarkdownIt#linkify -> LinkifyIt
		*
		* [linkify-it](https://github.com/markdown-it/linkify-it) instance.
		* Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
		* rule.
		**/
		this.linkify = new LinkifyIt();
		/**
		* MarkdownIt#validateLink(url) -> Boolean
		*
		* Link validation function. CommonMark allows too much in links. By default
		* we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
		* except some embedded image types.
		*
		* You can change this behaviour:
		*
		* ```javascript
		* var md = require('markdown-it')();
		* // enable everything
		* md.validateLink = function () { return true; }
		* ```
		**/
		this.validateLink = validateLink;
		/**
		* MarkdownIt#normalizeLink(url) -> String
		*
		* Function used to encode link url to a machine-readable format,
		* which includes url-encoding, punycode, etc.
		**/
		this.normalizeLink = normalizeLink;
		/**
		* MarkdownIt#normalizeLinkText(url) -> String
		*
		* Function used to decode link url to a human-readable format`
		**/
		this.normalizeLinkText = normalizeLinkText;
		/**
		* MarkdownIt#utils -> utils
		*
		* Assorted utility functions, useful to write plugins. See details
		* [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
		**/
		this.utils = utils;
		/**
		* MarkdownIt#helpers -> helpers
		*
		* Link components parser functions, useful to write plugins. See details
		* [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
		**/
		this.helpers = utils.assign({}, helpers);
		this.options = {};
		this.configure(presetName);
		if (options) this.set(options);
	}
	/** chainable
	* MarkdownIt.set(options)
	*
	* Set parser options (in the same format as in constructor). Probably, you
	* will never need it, but you can change options after constructor call.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')()
	*             .set({ html: true, breaks: true })
	*             .set({ typographer, true });
	* ```
	*
	* __Note:__ To achieve the best possible performance, don't modify a
	* `markdown-it` instance options on the fly. If you need multiple configurations
	* it's best to create multiple instances and initialize each with separate
	* config.
	**/
	MarkdownIt.prototype.set = function(options) {
		utils.assign(this.options, options);
		return this;
	};
	/** chainable, internal
	* MarkdownIt.configure(presets)
	*
	* Batch load of all options and compenent settings. This is internal method,
	* and you probably will not need it. But if you will - see available presets
	* and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
	*
	* We strongly recommend to use presets instead of direct config loads. That
	* will give better compatibility with next versions.
	**/
	MarkdownIt.prototype.configure = function(presets) {
		var self = this, presetName;
		if (utils.isString(presets)) {
			presetName = presets;
			presets = config[presetName];
			if (!presets) throw new Error("Wrong `markdown-it` preset \"" + presetName + "\", check name");
		}
		if (!presets) throw new Error("Wrong `markdown-it` preset, can't be empty");
		if (presets.options) self.set(presets.options);
		if (presets.components) Object.keys(presets.components).forEach(function(name) {
			if (presets.components[name].rules) self[name].ruler.enableOnly(presets.components[name].rules);
			if (presets.components[name].rules2) self[name].ruler2.enableOnly(presets.components[name].rules2);
		});
		return this;
	};
	/** chainable
	* MarkdownIt.enable(list, ignoreInvalid)
	* - list (String|Array): rule name or list of rule names to enable
	* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	*
	* Enable list or rules. It will automatically find appropriate components,
	* containing rules with given names. If rule not found, and `ignoreInvalid`
	* not set - throws exception.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')()
	*             .enable(['sub', 'sup'])
	*             .disable('smartquotes');
	* ```
	**/
	MarkdownIt.prototype.enable = function(list, ignoreInvalid) {
		var result = [];
		if (!Array.isArray(list)) list = [list];
		[
			"core",
			"block",
			"inline"
		].forEach(function(chain) {
			result = result.concat(this[chain].ruler.enable(list, true));
		}, this);
		result = result.concat(this.inline.ruler2.enable(list, true));
		var missed = list.filter(function(name) {
			return result.indexOf(name) < 0;
		});
		if (missed.length && !ignoreInvalid) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
		return this;
	};
	/** chainable
	* MarkdownIt.disable(list, ignoreInvalid)
	* - list (String|Array): rule name or list of rule names to disable.
	* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	*
	* The same as [[MarkdownIt.enable]], but turn specified rules off.
	**/
	MarkdownIt.prototype.disable = function(list, ignoreInvalid) {
		var result = [];
		if (!Array.isArray(list)) list = [list];
		[
			"core",
			"block",
			"inline"
		].forEach(function(chain) {
			result = result.concat(this[chain].ruler.disable(list, true));
		}, this);
		result = result.concat(this.inline.ruler2.disable(list, true));
		var missed = list.filter(function(name) {
			return result.indexOf(name) < 0;
		});
		if (missed.length && !ignoreInvalid) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
		return this;
	};
	/** chainable
	* MarkdownIt.use(plugin, params)
	*
	* Load specified plugin with given params into current parser instance.
	* It's just a sugar to call `plugin(md, params)` with curring.
	*
	* ##### Example
	*
	* ```javascript
	* var iterator = require('markdown-it-for-inline');
	* var md = require('markdown-it')()
	*             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
	*               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
	*             });
	* ```
	**/
	MarkdownIt.prototype.use = function(plugin) {
		var args = [this].concat(Array.prototype.slice.call(arguments, 1));
		plugin.apply(plugin, args);
		return this;
	};
	/** internal
	* MarkdownIt.parse(src, env) -> Array
	* - src (String): source string
	* - env (Object): environment sandbox
	*
	* Parse input string and return list of block tokens (special token type
	* "inline" will contain list of inline tokens). You should not call this
	* method directly, until you write custom renderer (for example, to produce
	* AST).
	*
	* `env` is used to pass data between "distributed" rules and return additional
	* metadata like reference info, needed for the renderer. It also can be used to
	* inject data in specific cases. Usually, you will be ok to pass `{}`,
	* and then pass updated object to renderer.
	**/
	MarkdownIt.prototype.parse = function(src, env) {
		if (typeof src !== "string") throw new Error("Input data should be a String");
		var state = new this.core.State(src, this, env);
		this.core.process(state);
		return state.tokens;
	};
	/**
	* MarkdownIt.render(src [, env]) -> String
	* - src (String): source string
	* - env (Object): environment sandbox
	*
	* Render markdown string into html. It does all magic for you :).
	*
	* `env` can be used to inject additional metadata (`{}` by default).
	* But you will not need it with high probability. See also comment
	* in [[MarkdownIt.parse]].
	**/
	MarkdownIt.prototype.render = function(src, env) {
		env = env || {};
		return this.renderer.render(this.parse(src, env), this.options, env);
	};
	/** internal
	* MarkdownIt.parseInline(src, env) -> Array
	* - src (String): source string
	* - env (Object): environment sandbox
	*
	* The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
	* block tokens list with the single `inline` element, containing parsed inline
	* tokens in `children` property. Also updates `env` object.
	**/
	MarkdownIt.prototype.parseInline = function(src, env) {
		var state = new this.core.State(src, this, env);
		state.inlineMode = true;
		this.core.process(state);
		return state.tokens;
	};
	/**
	* MarkdownIt.renderInline(src [, env]) -> String
	* - src (String): source string
	* - env (Object): environment sandbox
	*
	* Similar to [[MarkdownIt.render]] but for single paragraph content. Result
	* will NOT be wrapped into `<p>` tags.
	**/
	MarkdownIt.prototype.renderInline = function(src, env) {
		env = env || {};
		return this.renderer.render(this.parseInline(src, env), this.options, env);
	};
	module.exports = MarkdownIt;
}));
//#endregion
//#region ../../node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/index.js
var require_markdown_it = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_lib();
}));
var init_use_share_message = __esmMin((() => {
	require_dist$1();
	require_markdown_it();
	Array.prototype;
	Function.prototype;
	Array.isArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/template-selector/index.js
var import_react, o;
var init_template_selector = __esmMin((() => {
	init_index_a3cfc692();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_esm$9();
	o = function(o) {
		var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, l = (0, import_react.useRef)(null);
		(0, import_react.useEffect)((function() {
			(function() {
				var t = e$13(l$3.mark((function e() {
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (e.prev = 0, l.current) {
									e.next = 5;
									break;
								}
								return e.next = 4, O$1.getTemplateSelectorExtension();
							case 4: l.current = e.sent;
							case 5:
								e.next = 10;
								break;
							case 7: e.prev = 7, e.t0 = e.catch(0), console.error("Failed to preload template selector:", e.t0);
							case 10:
							case "end": return e.stop();
						}
					}), e, null, [[0, 7]]);
				})));
				return function() {
					return t.apply(this, arguments);
				};
			})()();
		}), []);
		var u = (0, import_react.useCallback)(e$13(l$3.mark((function e() {
			var t, n;
			return l$3.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0:
						if (e.prev = 0, l.current) {
							e.next = 5;
							break;
						}
						return e.next = 4, O$1.getTemplateSelectorExtension();
					case 4: l.current = e.sent;
					case 5:
						if (t = l.current) {
							e.next = 9;
							break;
						}
						return console.error("TemplateSelector extension not available"), e.abrupt("return");
					case 9:
						t.show(s), e.next = 16;
						break;
					case 12: e.prev = 12, e.t0 = e.catch(0), console.error("Failed to show template selector:", e.t0), null === (n = s.handleVisibleChange) || void 0 === n || n.call(s, !1);
					case 16:
					case "end": return e.stop();
				}
			}), e, null, [[0, 12]]);
		}))), [s]), i = (0, import_react.useCallback)(e$13(l$3.mark((function e() {
			var t, n;
			return l$3.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: try {
						l.current && (null === (t = (n = l.current).hide) || void 0 === t || t.call(n));
					} catch (e) {
						console.error("Failed to hide template selector:", e);
					}
					case 1:
					case "end": return e.stop();
				}
			}), e);
		}))), []);
		return (0, import_react.useEffect)((function() {
			return o && u(), function() {
				i();
			};
		}), [
			o,
			u,
			i
		]), {
			showTemplateSelector: u,
			hideTemplateSelector: i
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/save-service/index.js
var init_save_service = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/recommend-template-service/index.js
function c(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), r.push.apply(r, n);
	}
	return r;
}
function p(e) {
	for (var r = 1; r < arguments.length; r++) {
		var n = null != arguments[r] ? arguments[r] : {};
		r % 2 ? c(Object(n), !0).forEach((function(r) {
			r$4(e, r, n[r]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		}));
	}
	return e;
}
var l, m, d, f, y;
var init_recommend_template_service = __esmMin((() => {
	init_toConsumableArray_d8de034d();
	init_defineProperty_ba606e08();
	init_index_a3cfc692();
	init_createClass_2e0257aa();
	init_esm$9();
	init_lodash();
	(function(e) {
		e[e.PaymentByPrice = 0] = "PaymentByPrice", e[e.LimitedFree = 1] = "LimitedFree", e[e.FreeForVIP = 2] = "FreeForVIP", e[e.NeedVIPAndPay = 3] = "NeedVIPAndPay", e[e.Free = 4] = "Free", e[e.FreeForSuperVIP = 5] = "FreeForSuperVIP", e[e.ChargedByUsage = 6] = "ChargedByUsage", e[e.InAppPurchased = 7] = "InAppPurchased", e[e.NoRequirementType = 10] = "NoRequirementType";
	})(l || (l = {}));
	m = "/api/v6/mallrecommend/template/by-query?xsrf=".concat(n$12("TOK"));
	d = "/v2/mall/marketing/items_detail?xsrf=".concat(n$12("TOK"));
	f = ["gscffgrjf3gmikgcdhxarmf7rc", "me4eeazhwp8n7pdt9ows768t1y"];
	y = function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [
			{
				key: "getRecommendTemplate",
				value: (l = e$13(l$3.mark((function e(t) {
					var r, a, i, u, s, c, l, d, f, y, v, h, b;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return r = t.query, a = t.limit, i = t.offset, u = t.requirementTypes, e.prev = 1, e.next = 4, d$1({
								url: m,
								method: "post",
								data: {
									query: r,
									limit: a,
									offset: i,
									requirement_types: u
								}
							});
							case 4:
								if (c = e.sent, null != (l = c.data) && null !== (s = l.result) && void 0 !== s && null !== (s = s.items) && void 0 !== s && s.length && 0 === (null == l ? void 0 : l.retcode)) {
									e.next = 8;
									break;
								}
								throw new Error("recommend template donot get a good result");
							case 8: return d = l.result, f = d.items, y = void 0 === f ? [] : f, v = d.prices, h = void 0 === v ? [] : v, e.abrupt("return", y.map((function(e) {
								var t, r = h.find((function(t) {
									return t.item_id === e.id;
								}));
								return p(p({}, e), {}, { requirements: null == r || null === (t = r.requirements) || void 0 === t ? void 0 : t.type });
							})));
							case 12: return e.prev = 12, e.t0 = e.catch(1), console.error(e.t0), e.next = 17, this.getBackupTemplateData(p({}, t));
							case 17: return b = e.sent, e.abrupt("return", b);
							case 19:
							case "end": return e.stop();
						}
					}), e, this, [[1, 12]]);
				}))), function(e) {
					return l.apply(this, arguments);
				})
			},
			{
				key: "getTemplatesDetail",
				value: (c = e$13(l$3.mark((function e(t) {
					var r, a;
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return e.prev = 0, e.next = 3, d$1({
								url: d,
								method: "post",
								data: {
									ids: t,
									xsrf: n$12("TOK")
								}
							});
							case 3: return r = e.sent, a = r.data, e.abrupt("return", 0 === (null == a ? void 0 : a.retcode) && a.result.detail ? a.result.detail : []);
							case 8: return e.prev = 8, e.t0 = e.catch(0), console.error("fail to fetch template detail", e.t0), e.abrupt("return", []);
							case 12:
							case "end": return e.stop();
						}
					}), e, null, [[0, 8]]);
				}))), function(e) {
					return c.apply(this, arguments);
				})
			},
			{
				key: "getTemplateByTopic",
				value: (t = e$13(l$3.mark((function t(r) {
					var a, i, u, c;
					return l$3.wrap((function(t) {
						for (;;) switch (t.prev = t.next) {
							case 0: return t.next = 2, d$1({
								url: "/v2/mall/marketing/topics_detail",
								method: "post",
								data: p({}, omit(r, "limit"))
							});
							case 2:
								if (a = t.sent, i = a.data, null != (u = null == i ? void 0 : i.result) && u.detail) {
									t.next = 7;
									break;
								}
								return t.abrupt("return", []);
							case 7:
								if (c = u.detail.reduce((function(t, r) {
									var n = r || {}, a = n.items, i = void 0 === a ? [] : a, u = n.prices, o = void 0 === u ? [] : u, s = i.map((function(e) {
										var t, r = o.find((function(t) {
											return t.item_id === e.id || t.itemId === e.id;
										}));
										return p(p({}, e), {}, { requirements: null == r || null === (t = r.requirements) || void 0 === t ? void 0 : t.type });
									}));
									return [].concat(e$7(t), e$7(s));
								}), []), !r.limit) {
									t.next = 10;
									break;
								}
								return t.abrupt("return", c.slice(0, r.limit));
							case 10: return t.abrupt("return", c);
							case 11:
							case "end": return t.stop();
						}
					}), t);
				}))), function(e) {
					return t.apply(this, arguments);
				})
			},
			{
				key: "getBackupTemplateData",
				value: function(e) {
					var t = e.limit, r = void 0 === t ? 0 : t, n = e.requirementTypes, a = Math.ceil(r / 2), i = f.map((function(e) {
						return {
							id: e,
							limit: a,
							offset: 0
						};
					}));
					return this.getTemplateByTopic({
						limits: i,
						requirement_types: n,
						limit: r
					});
				}
			}
		]);
		var t, c, l;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/history-service/index.js
var init_history_service = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/doc-universal-service/index.js
var init_doc_universal_service = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/create-service/index.js
function _(e, t) {
	var o = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), o.push.apply(o, n);
	}
	return o;
}
function h(t) {
	for (var o = 1; o < arguments.length; o++) {
		var n = null != arguments[o] ? arguments[o] : {};
		o % 2 ? _(Object(n), !0).forEach((function(o) {
			r$4(t, o, n[o]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
		}));
	}
	return t;
}
var g, R, C;
var init_create_service = __esmMin((() => {
	init_defineProperty_ba606e08();
	init_index_a3cfc692();
	init_createClass_2e0257aa();
	init_url();
	init_esm$9();
	init_esm$12();
	init_esm$10();
	init_esm$6();
	init_message_sse();
	init_dist$8();
	(function(e) {
		e[e.TEXT_TYPE_DEFAULT = 0] = "TEXT_TYPE_DEFAULT", e[e.TEXT_TYPE_MARKDOWN = 1] = "TEXT_TYPE_MARKDOWN", e[e.TEXT_TYPE_SELF_DEVELOPED = 2] = "TEXT_TYPE_SELF_DEVELOPED";
	})(g || (g = {})), function(e) {
		e.UNSPECIFIED = "unspecified", e.DOC = "doc", e.SLIDE = "slide", e.SHEET = "sheet", e.FORM = "form", e.MINDMAP = "mind", e.SMART_SHEET = "smartsheet", e.SMART_CANVAS = "smartcanvas", e.FLOW_CHART = "flowchart", e.MARKDOWN = "markdown", e.RESUME = "resume";
	}(R || (R = {}));
	C = function() {
		return n$10((function e() {
			r$5(this, e);
		}), null, [
			{
				key: "createSlide",
				value: function(e) {
					var t = this, o = e.templateInfo, n = e.enableImageGeneration, r = e.text, s = e.messageId, c = e.conversationId, i = e.parentMessageId, l = e.onError, E = e.onSuccess, p = e.onCb, d = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.SLIDE,
								fileText: r,
								formJson: void 0,
								textType: g.TEXT_TYPE_MARKDOWN,
								createSlide: {
									templateId: o.id,
									isCustom: o.isCustom,
									isCustomTemplate: o.isCustom,
									enableImageGeneration: n
								},
								outlineKey: s
							}
						},
						conversationId: c,
						parentMessageId: i,
						author: { role: N$1.USER }
					};
					p ? p?.(d) : this.messageSSE.fire("".concat(e$12.conversation).concat(c), d, (function(e) {
						t.createCallback(e, l, E, {
							no_promotion: "1",
							AIGenerate: "1",
							expand_type: "1"
						});
					}));
				}
			},
			{
				key: "createMindMap",
				value: function(e) {
					var t = this, o = e.originChartData, n = e.text, r = e.conversationId, s = e.parentMessageId, c = e.onError, i = e.onSuccess, l = e.onCb, E = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.MINDMAP,
								fileText: o || n,
								formJson: void 0,
								textType: o ? g.TEXT_TYPE_SELF_DEVELOPED : g.TEXT_TYPE_MARKDOWN
							}
						},
						conversationId: r,
						parentMessageId: s,
						author: { role: N$1.USER }
					};
					l ? l?.(E) : this.messageSSE.fire("".concat(e$12.conversation).concat(r), E, (function(e) {
						t.createCallback(e, c, i);
					}));
				}
			},
			{
				key: "createFlowChart",
				value: function(e) {
					var t = this, o = e.originChartData, n = e.text, r = e.conversationId, s = e.parentMessageId, c = e.onError, i = e.onSuccess, l = e.onCb, E = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.FLOW_CHART,
								fileText: o || n,
								formJson: void 0,
								textType: o ? g.TEXT_TYPE_SELF_DEVELOPED : g.TEXT_TYPE_MARKDOWN
							}
						},
						conversationId: r,
						parentMessageId: s,
						author: { role: N$1.USER }
					};
					l ? l?.(E) : this.messageSSE.fire("".concat(e$12.conversation).concat(r), E, (function(e) {
						t.createCallback(e, c, i);
					}));
				}
			},
			{
				key: "createSheet",
				value: function(e) {
					var t = this, o = e.text, n = e.conversationId, r = e.parentMessageId, s = e.onError, c = e.onSuccess, i = e.onCb, l = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.SHEET,
								fileText: o,
								textType: g.TEXT_TYPE_MARKDOWN
							},
							author: { role: N$1.USER }
						},
						conversationId: n,
						parentMessageId: r,
						author: { role: N$1.USER }
					};
					i ? i?.(l) : this.messageSSE.fire("".concat(e$12.conversation).concat(n), l, (function(e) {
						t.createCallback(e, s, c);
					}));
				}
			},
			{
				key: "createForm",
				value: function(e) {
					var t = this, o = e.text, n = e.formJson, r = e.conversationId, s = e.parentMessageId, c = e.onError, i = e.onSuccess, l = e.onCb, E = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.FORM,
								fileText: o,
								formJson: n,
								textType: g.TEXT_TYPE_MARKDOWN
							},
							author: { role: N$1.USER }
						},
						conversationId: r,
						parentMessageId: s,
						author: { role: N$1.USER }
					};
					l ? l?.(E) : this.messageSSE.fire("".concat(e$12.conversation).concat(r), E, (function(e) {
						t.createCallback(e, c, i);
					}));
				}
			},
			{
				key: "createResume",
				value: function(e) {
					var t = this, o = e.resumeJson, n = e.conversationId, r = e.parentMessageId, s = e.onError, c = e.onSuccess, i = e.onCb, l = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.RESUME,
								resumeJson: o
							},
							author: { role: N$1.USER }
						},
						conversationId: n,
						parentMessageId: r,
						author: { role: N$1.USER }
					};
					i ? i?.(l) : this.messageSSE.fire("".concat(e$12.conversation).concat(n), l, (function(e) {
						t.createCallback(e, s, c, {
							aid_position: EE.RESUME,
							show_layout: "true",
							from_page: window.location.href.indexOf("docs.qq.com/ai") > -1 ? eE.ASSISTANT : eE.AI_OTHER
						});
					}));
				}
			},
			{
				key: "createSmartCanvas",
				value: function(e) {
					var t = this, o = e.text, n = e.messageId, r = e.conversationId, s = e.parentMessageId, c = e.onError, i = e.onSuccess, l = e.onCb, E = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.SMART_CANVAS,
								fileText: o,
								outlineKey: n,
								textType: g.TEXT_TYPE_MARKDOWN
							},
							author: { role: N$1.USER }
						},
						conversationId: r,
						parentMessageId: s,
						author: { role: N$1.USER }
					};
					l ? l?.(E) : this.messageSSE.fire("".concat(e$12.conversation).concat(r), E, (function(e) {
						t.createCallback(e, c, i);
					}));
				}
			},
			{
				key: "createDoc",
				value: function(e) {
					var t = this, o = e.text, n = e.messageId, r = e.conversationId, s = e.parentMessageId, c = e.onError, i = e.onSuccess, l = e.onCb, E = {
						action: {
							type: E$4.CREATE_FILE,
							createFile: {
								category: R.DOC,
								fileText: o,
								textType: g.TEXT_TYPE_MARKDOWN,
								outlineKey: n
							},
							author: { role: N$1.USER }
						},
						conversationId: r,
						parentMessageId: s,
						author: { role: N$1.USER }
					};
					l ? l?.(E) : this.messageSSE.fire("".concat(e$12.conversation).concat(r), E, (function(e) {
						t.createCallback(e, c, i);
					}));
				}
			},
			{
				key: "createEmptyDoc",
				value: (c = e$13(l$3.mark((function e(t) {
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return e.abrupt("return", d$1({
								url: "".concat(i$4.createEmptyDoc, "?xsrf=").concat(r$7()),
								method: "post",
								data: {
									name: t,
									ext: "tencentdoc",
									create_source: 10102
								}
							}));
							case 1:
							case "end": return e.stop();
						}
					}), e);
				}))), function(e) {
					return c.apply(this, arguments);
				})
			},
			{
				key: "createEmptyMind",
				value: (e = e$13(l$3.mark((function e(t) {
					return l$3.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: return e.abrupt("return", d$1({
								url: "".concat(i$4.createEmptyDoc, "?xsrf=").concat(r$7()),
								method: "post",
								data: {
									name: t,
									ext: "mind",
									create_source: 10102
								}
							}));
							case 1:
							case "end": return e.stop();
						}
					}), e);
				}))), function(t) {
					return e.apply(this, arguments);
				})
			}
		]);
		var e, c;
	}();
	C.messageSSE = new v$1(), C.createCallback = function(t, o, n, r) {
		var a, s, u, E;
		(null === (a = t.message) || void 0 === a ? void 0 : a.messageStatus) === i$6.ERROR && ((null === (u = t.message) || void 0 === u || null === (u = u.error) || void 0 === u ? void 0 : u.code) === _$2.AI_USE_LIMIT && O$1.modalToPay(getAidForReport$1({
			position: "aidesktop",
			feature: "aihelper",
			apprec1: "aisearch",
			apprec2: "createdoc"
		})), o?.());
		if ((null === (s = t.message) || void 0 === s ? void 0 : s.messageStatus) === i$6.FINISH) if ((null === (E = t.message) || void 0 === E || null === (E = E.content) || void 0 === E || null === (E = E.files) || void 0 === E || null === (E = E.items) || void 0 === E ? void 0 : E.length) > 0) {
			var p, f, T = (null === (p = t.message) || void 0 === p ? void 0 : p.content).files.items[0], v = h({}, r);
			if (v = T.type === c$7.SLIDE ? h(h({}, v), {}, {
				AIGenerate: "1",
				no_promotion: "1",
				expand_type: "1"
			}) : T.needExpand ? h(h({}, v), {}, r$4({}, "AIGenerate", "1")) : h(h({}, v), {}, r$4({}, "no_promotion", "1")), null == T || !T.url) return;
			openUrl({ url: i$7(null !== (f = null == T ? void 0 : T.url) && void 0 !== f ? f : "", v) }), n?.();
		} else o?.();
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+ai-common-hooks@3._051ec9b41bd09f23a0dcd2c273cdf836/node_modules/@tencent/ai-common-hooks/dist/esm/index.js
var init_esm$1 = __esmMin((() => {
	init_vip_service();
	init_url();
	init_i18n();
	init_use_visibility_change();
	init_use_vip_type();
	init_use_space();
	init_use_scroll_bottom();
	init_use_outside_click();
	init_use_horizontal_scroll();
	init_use_file_import();
	init_use_feedback();
	init_use_fake_progress();
	init_use_dynamic_class_listener();
	init_universal_search();
	init_use_universal_search();
	init_use_share_message();
	init_use_search_chat();
	init_use_mobile_auto_scroll();
	init_use_groups();
	init_use_group_conversation_history();
	init_use_clear_groups();
	init_use_auto_scroll();
	init_file_path();
	init_template_selector();
	init_sse();
	init_worker();
	init_split_paragraph();
	init_search_import();
	init_save_service();
	init_recommend_template_service();
	init_message_sse();
	init_locales();
	init_history_service();
	init_doc_universal_service();
	init_create_service();
	init_action_service();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.3.11__cd1e6f95d53456f66bd6020af241dde7/node_modules/@tencent/txdocs-aid/lib/esm/filetype.js
/**
* 获取上报用的 filetype
*/
function getFileTypeForReport() {
	return getFileTypeStrForReport();
}
function getFileTypeStrForReport() {
	var _a, _b, _c;
	return ((_c = (_b = (_a = getBasicClientVars()) === null || _a === void 0 ? void 0 : _a.docInfo) === null || _b === void 0 ? void 0 : _b.padInfo) === null || _c === void 0 ? void 0 : _c.padType) || getClientVars().padType;
}
function getBasicClientVars() {
	return window.basicClientVars;
}
function getClientVars() {
	var _a;
	return (_a = window.clientVars) !== null && _a !== void 0 ? _a : {};
}
var init_filetype = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.3.11__cd1e6f95d53456f66bd6020af241dde7/node_modules/@tencent/txdocs-aid/lib/esm/get-and-decompose-aid.js
function mapsMatch(maps, deftValue) {
	for (var i = 0; i < maps.length; i++) {
		var _a = __read(maps[i], 2), func = _a[0], value = _a[1];
		if (typeof func === "function" && func() || func) return value;
	}
	return deftValue;
}
function getQuery(key) {
	var m = null;
	var location = window.location;
	if (location) m = location.search.match(new RegExp("(\\?|&)" + key + "=([^&]*)(#|&|$)"));
	return !m ? "" : decodeURIComponent(m[2]);
}
function getSystem() {
	return mapsMatch([
		[isAndroid(), SYSTEMS.AN],
		[isIOS(), SYSTEMS.IOS],
		[isWindows(), SYSTEMS.WD],
		[isMac(), SYSTEMS.MAC],
		[isHarmony(), SYSTEMS.HMOS]
	], AID_PREFIX.DEFAULT);
}
function getPlatform() {
	return mapsMatch([
		[isQQDesktopDocsClient() || isQQMobileDocsClient(), PLATFORMS.QQMini],
		[isMobileQQBrowser(), PLATFORMS.QBH5],
		[isWxMiniProgram(), PLATFORMS.WXSP],
		[isQQMiniProgram() && getQuery("qqapp") === "form", PLATFORMS.QQSJB],
		[isQQMiniProgram() && getQuery("qqapp") === "clock", PLATFORMS.QQDK],
		[isQQMiniProgram() && getQuery("qqapp") === "jielong", PLATFORMS.QQJL],
		[isQQMiniProgram(), PLATFORMS.QQSP],
		[isMacAppStoreTencentDocsClient(), PLATFORMS.APP],
		[isPCTencentDocsClient() || isElectronTencentDocsClient(), PLATFORMS.DESK],
		[isTencentDocsApp(), PLATFORMS.APP],
		[isMobile(), PLATFORMS.H5],
		[isPC(), PLATFORMS.WEB]
	], AID_PREFIX.DEFAULT);
}
function joinApprecString(apprecArray) {
	var _a = __read(apprecArray, 4), apprec1 = _a[0], apprec2 = _a[1], apprec3 = _a[2], apprec4 = _a[3];
	apprec4 = getFileTypeForReport() || apprec4;
	if (!apprec1 && (apprec2 || apprec3 || apprec4)) apprec1 = "null";
	if (!apprec2 && (apprec3 || apprec4)) apprec2 = "null";
	if (!apprec3 && apprec4) apprec3 = "null";
	var apprecString = [
		apprec1,
		apprec2,
		apprec3,
		apprec4
	].filter(function(apprec) {
		return !!apprec;
	}).join("_");
	apprecString = apprecString ? "_" + apprecString : "";
	return apprecString;
}
/**
* 生成 aid 的函数，必要的参数为触发位置和功能，系统和平台默认添加
*/
function getAidForReport(aidOptions) {
	systemCache = systemCache !== null && systemCache !== void 0 ? systemCache : getSystem();
	platformCache = platformCache !== null && platformCache !== void 0 ? platformCache : getPlatform();
	var position = aidOptions.position, feature = aidOptions.feature, apprec1 = aidOptions.apprec1, apprec2 = aidOptions.apprec2, apprec3 = aidOptions.apprec3, apprec4 = aidOptions.apprec4;
	if (!verifyAidOptions(aidOptions)) {
		console.error("aid options 参数值校验失败，拒绝生成aid");
		return "";
	}
	var apprecString = joinApprecString([
		apprec1,
		apprec2,
		apprec3,
		apprec4
	]);
	return (aidOptions.prefix ? aidOptions.prefix : getPrefix()) + "_" + systemCache + "_" + platformCache + "_" + position + "_" + feature + apprecString;
}
function getPrefix() {
	var _a, _b, _c, _d, _e;
	var result = AID_PREFIX.DOCS;
	var pathName = "";
	var hostName = "";
	try {
		pathName = ((_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.pathname) || "";
		hostName = ((_d = (_c = window.top) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.hostname) || "";
	} catch (error) {
		console.error("window.top?.location error :", error);
		pathName = "";
		hostName = "";
	}
	if (pathName.length === 0 && hostName.length === 0) try {
		var referrerStr = window.document.referrer;
		var url = new URL(referrerStr);
		pathName = url.pathname;
		hostName = url.host;
	} catch (error) {
		console.error("window.document.referrer error :", error);
		pathName = "";
		hostName = "";
	}
	if (pathName.length === 0 && hostName.length === 0) return result;
	if (hostName !== "docs.qq.com") return result;
	try {
		if (pathName && pathName.length > 0 && pathName.indexOf("/local_edit") !== -1) result = AID_PREFIX.LOCAL;
		else if (isTxCloud(pathName)) result = AID_PREFIX.CLOUD;
		else if (!((_e = window.top) === null || _e === void 0 ? void 0 : _e.basicClientVars)) result = AID_PREFIX.APPOP;
	} catch (error) {
		console.log("离线包文档 basicClientVars error:", error);
	}
	return result;
}
function isTxCloud(pathName) {
	var _a, _b, _c, _d;
	var result = false;
	try {
		result = pathName && pathName.length > 0 && (pathName.indexOf("/document") !== -1 || pathName.indexOf("/pdf") !== -1) || !!((_d = (_c = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.basicClientVars) === null || _b === void 0 ? void 0 : _b.docInfo) === null || _c === void 0 ? void 0 : _c.cosInfo) === null || _d === void 0 ? void 0 : _d.driveExt);
	} catch (error) {
		console.log("isTxCloud error:", error);
	}
	return result;
}
/**
* 校验 aid options 参数
* 校验不通过 console.error 出来对应错误提示，且返回false
*
* 现在需要校验的逻辑比较少，后续增多可以考虑用策略模式等
* @param aidOptions
*/
function verifyAidOptions(aidOptions) {
	/**
	* 所有参数值若不是undefined 则为string 且不应该带有下划线
	* 这里就不单独校验 position 和 feature 为undefined的情况，因为ts就可以check了
	*/
	var hasStringError = false;
	Object.entries(aidOptions).forEach(function(_a) {
		var _b = __read(_a, 2), key = _b[0], value = _b[1];
		if (typeof value === "undefined") return;
		if (typeof value !== "string") {
			console.error("aidOptions." + key + " 应为 string 类型 却收到：" + typeof value);
			hasStringError = true;
			return;
		}
		if (value.includes("_")) {
			console.error("aidOptions." + key + " 的值：" + value + "不应该带有下划线");
			hasStringError = true;
		}
	});
	if (hasStringError) return false;
	return true;
}
var systemCache, platformCache, SYSTEMS, PLATFORMS, AID_PREFIX, POSITIONS, decomposeAid, POSITIONS_WEIYUN;
var init_get_and_decompose_aid = __esmMin((() => {
	init_tslib_es6();
	init_pure$1();
	init_filetype();
	(function(SYSTEMS) {
		SYSTEMS["AN"] = "an";
		SYSTEMS["IOS"] = "ios";
		SYSTEMS["MAC"] = "mac";
		SYSTEMS["WD"] = "wd";
		SYSTEMS["HMOS"] = "hmos";
		SYSTEMS["UNKNOWN"] = "";
	})(SYSTEMS || (SYSTEMS = {}));
	(function(PLATFORMS) {
		PLATFORMS["WXSP"] = "wxsp";
		PLATFORMS["QQSP"] = "qqsp";
		PLATFORMS["QQSJB"] = "qqsjb";
		PLATFORMS["QQDK"] = "qqdk";
		PLATFORMS["QQJL"] = "qqjl";
		PLATFORMS["DESK"] = "desk";
		PLATFORMS["H5"] = "h5";
		PLATFORMS["QBH5"] = "qbh5";
		PLATFORMS["WEB"] = "web";
		PLATFORMS["APP"] = "app";
		PLATFORMS["QQMini"] = "qqmini";
		PLATFORMS["UNKNOWN"] = "";
	})(PLATFORMS || (PLATFORMS = {}));
	(function(AID_PREFIX) {
		AID_PREFIX["DOCS"] = "txdocs";
		AID_PREFIX["CLOUD"] = "txcloud";
		AID_PREFIX["LOCAL"] = "txlocal";
		AID_PREFIX["APPOP"] = "txappop";
		AID_PREFIX["DEFAULT"] = "default";
	})(AID_PREFIX || (AID_PREFIX = {}));
	(function(POSITIONS) {
		POSITIONS["APPSREC"] = "appsrec";
		POSITIONS["CAPSULE"] = "capsule";
		POSITIONS["CATALOGUE"] = "catalogue";
		POSITIONS["CLOUDPLAY"] = "cloudplay";
		POSITIONS["FILTERPANEL"] = "filterpanel";
		POSITIONS["HOMEPAGE"] = "homepage";
		POSITIONS["MORESETTING"] = "moresetting";
		POSITIONS["MYTAB"] = "mytab";
		POSITIONS["NOTIFY"] = "notify";
		POSITIONS["OPERATE"] = "operate";
		POSITIONS["PAYPAGE"] = "paypage";
		POSITIONS["PERSNLPANEL"] = "persnlpanel";
		POSITIONS["PUSH"] = "push";
		POSITIONS["TITLEBAR"] = "titlebar";
		POSITIONS["TOOLBAR"] = "toolbar";
		POSITIONS["WXGZH"] = "wxgzh";
		POSITIONS["UPLOAD"] = "upload";
		POSITIONS["IMPORT"] = "import";
		POSITIONS["TIPS"] = "tips";
		POSITIONS["TYPEFACE"] = "typeface";
		POSITIONS["ACTIVITY"] = "activity";
		POSITIONS["DETAIL"] = "detail";
		POSITIONS["LIST"] = "list";
		POSITIONS["SPACE"] = "space";
		POSITIONS["LEFUPCOR"] = "lefupcor";
		POSITIONS["LISTRIGCLK"] = "listrigclk";
		POSITIONS["LISTRIGUPCOR"] = "listrigupcor";
		POSITIONS["LISTSHARERECEIVE"] = "listsharereceive";
		POSITIONS["DRIVEDETAILRIGUPCOR"] = "drivedetailrigupcor";
		POSITIONS["DRIVEDETAIL"] = "drivedetail";
		POSITIONS["FOLDERLIST"] = "folderlist";
		POSITIONS["QQNOTICE"] = "qqnotice";
		POSITIONS["COLLECTATM"] = "collectatm";
		POSITIONS["TEMPLATEMALL"] = "templatemall";
		POSITIONS["SIDEBAR"] = "sidebar";
		POSITIONS["FORMCOUNT"] = "formcount";
		POSITIONS["COMMON"] = "common";
		POSITIONS["HOVER"] = "hover";
		POSITIONS["QQLOCALBAR"] = "qqlocalbar";
		POSITIONS["TBSLOCALBAR"] = "tbslocalbar";
		POSITIONS["DEFAULT"] = "default";
		POSITIONS["RIGLOWCOR"] = "riglowcor";
		POSITIONS["CHAT"] = "chat";
		POSITIONS["VIP_CENTER"] = "vipcenter";
		POSITIONS["DETAILRIGUPCOR"] = "detailrigupcor";
		POSITIONS["COMMENT"] = "comment";
		POSITIONS["ACCMANAGE"] = "accmanage";
		POSITIONS["SHARE"] = "share";
		POSITIONS["SHAREPANEL"] = "sharepanel";
		POSITIONS["MTGSHAREDLIST"] = "mtgsharedlist";
		POSITIONS["NAMEPLATE"] = "nameplate";
		POSITIONS["CHATNEWS"] = "chatnews";
		POSITIONS["EDITFORM"] = "editform";
		POSITIONS["SIDEBARTHUM"] = "sidebarthum";
		POSITIONS["RIGHTMENU"] = "rightmenu";
		POSITIONS["APPTOOLPANEL"] = "apptoolpanel";
		POSITIONS["PICTOOLBAR"] = "pictoolbar";
		POSITIONS["PICRIGHTMENU"] = "picrightmenu";
		POSITIONS["PICPREVIEW"] = "picpreview";
		POSITIONS["LEFUPCORNEW"] = "lefupcornew";
		POSITIONS["LEFUPCORIMPORT"] = "lefupcorimport";
		POSITIONS["DETAILNEW"] = "detailnew";
		POSITIONS["DRAG"] = "drag";
		POSITIONS["VIPCENAVATAR"] = "vipcenavatar";
		POSITIONS["CONVERSION"] = "conversion";
		POSITIONS["UNKNOWN"] = "";
	})(POSITIONS || (POSITIONS = {}));
	decomposeAid = function(aid) {
		var aidDecomposed = {
			prefix: AID_PREFIX.DEFAULT,
			system: SYSTEMS.UNKNOWN,
			plat: PLATFORMS.UNKNOWN,
			position: POSITIONS.UNKNOWN,
			feature: "",
			apprec1: void 0,
			apprec2: void 0,
			apprec3: void 0,
			apprec4: void 0
		};
		try {
			var aidArr = aid.split("_");
			if (!aidArr.length || aidArr.length < 5) return;
			aidDecomposed.prefix = aidArr[0];
			aidDecomposed.system = aidArr[1];
			aidDecomposed.plat = aidArr[2];
			aidDecomposed.position = aidArr[3];
			aidDecomposed.feature = aidArr[4];
			if (aidArr[5] && aidArr[5] !== "null") aidDecomposed.apprec1 = aidArr[5];
			if (aidArr[6] && aidArr[6] !== "null") aidDecomposed.apprec2 = aidArr[6];
			if (aidArr[7] && aidArr[7] !== "null") aidDecomposed.apprec3 = aidArr[7];
			if (aidArr[8] && aidArr[8] !== "null") aidDecomposed.apprec4 = aidArr[8];
			return aidDecomposed;
		} catch (e) {
			return;
		}
	};
	(function(POSITIONS_WEIYUN) {
		POSITIONS_WEIYUN["LIST"] = "list";
		POSITIONS_WEIYUN["RECENT"] = "recent";
		POSITIONS_WEIYUN["DOCUMENT"] = "document";
		POSITIONS_WEIYUN["PHOTO"] = "photo";
		POSITIONS_WEIYUN["UNKNOWN"] = "";
	})(POSITIONS_WEIYUN || (POSITIONS_WEIYUN = {}));
})), DEFAULT_AID_SELECTOR_VALUE, AID_SELECTOR_WEIGHTS;
var init_multidimensional_config = __esmMin((() => {
	init_tslib_es6();
	init_axios();
	init_tencent_doc_report_es$1();
	init_get_and_decompose_aid();
	DEFAULT_AID_SELECTOR_VALUE = "default";
	AID_SELECTOR_WEIGHTS = {
		prefix: 1,
		system: 1,
		plat: 1,
		position: 1,
		feature: 1,
		apprec1: 1,
		apprec2: 1,
		apprec3: 1
	};
	(function() {
		function MultidimensionalConfigForAid(params) {
			this.wuJiDBConfig = params.wuJiDBConfig;
		}
		MultidimensionalConfigForAid.prototype.get = function(params) {
			return __awaiter(this, void 0, void 0, function() {
				var res;
				return __generator(this, function(_a) {
					switch (_a.label) {
						case 0: return [4, this.getTheOneWithHighestPriority(params)];
						case 1:
							res = _a.sent();
							tdw$1({
								opername: "MultidimensionalConfigForAid",
								module: "txdocsAid",
								action: "get",
								wuJiDBConfig: JSON.stringify(this.wuJiDBConfig),
								aid: params.aid,
								res: JSON.stringify(res)
							});
							return [2, res];
					}
				});
			});
		};
		MultidimensionalConfigForAid.prototype.getTheOneWithHighestPriority = function(params) {
			var _a;
			return __awaiter(this, void 0, void 0, function() {
				var destructedAid, filterInString, data, res;
				return __generator(this, function(_b) {
					switch (_b.label) {
						case 0:
							destructedAid = decomposeAid(params.aid);
							if (!destructedAid) return [2, void 0];
							filterInString = this.getFilterByAid(destructedAid);
							if (!filterInString) return [2, void 0];
							if (params === null || params === void 0 ? void 0 : params.extra) filterInString = "" + filterInString + this.getExtraFilter(params.extra);
							return [4, this.getDataFromWuJi({
								size: "total",
								filter: filterInString
							})];
						case 1:
							data = (_b.sent() || {}).data;
							if (!(data === null || data === void 0 ? void 0 : data.length)) return [2, void 0];
							res = (_a = this.findTheLineHasMostPriority({
								lines: data,
								destructedAid
							})) === null || _a === void 0 ? void 0 : _a[0];
							return [2, res];
					}
				});
			});
		};
		/**
		* 找出优先级最高的那行配置
		* 优先级规则
		* 1. 命中的 aid 配置的权重总和，权重值越高，优先级越高
		* 2. priority 字段配置的优先级，数字越大优先级越高
		* 3. 配置的 自增id，id越大优先级越高 （越晚配置的越优先）
		* @param lines
		*/
		MultidimensionalConfigForAid.prototype.findTheLineHasMostPriority = function(params) {
			var _this = this;
			var lines = params.lines, destructedAid = params.destructedAid;
			if (!lines.length) return;
			var newLines = __spreadArray([], __read(lines));
			newLines.sort(function(a, b) {
				/**
				* 规则 1
				*/
				var weightDiff = _this.countWeightOfLine({
					line: b,
					destructedAid
				}) - _this.countWeightOfLine({
					line: a,
					destructedAid
				});
				if (weightDiff !== 0) return weightDiff;
				/**
				* 如果规则 1 的优先级相同，再用规则 2 排序
				*/
				var priorityDiff = (b.priority || 0) - (a.priority || 0);
				if (priorityDiff !== 0) return priorityDiff;
				/**
				* 如果规则 2 的优先级相同，再用规则 3 排序
				*/
				return b.id - a.id;
			});
			return newLines;
		};
		MultidimensionalConfigForAid.prototype.countWeightOfLine = function(params) {
			var line = params.line, destructedAid = params.destructedAid;
			var cnt = 0;
			Object.keys(AID_SELECTOR_WEIGHTS).forEach(function(k) {
				if (line[k] !== DEFAULT_AID_SELECTOR_VALUE && line[k] === destructedAid[k]) cnt += AID_SELECTOR_WEIGHTS[k];
			});
			return cnt;
		};
		MultidimensionalConfigForAid.prototype.getFilterByAid = function(destructedAid) {
			var filter = Object.entries(destructedAid).reduce(function(pre, curr) {
				var _a = __read(curr, 2), k = _a[0], v = _a[1];
				pre[k] = [DEFAULT_AID_SELECTOR_VALUE];
				if (v) pre[k].push(v);
				return pre;
			}, {});
			return Object.entries(filter).map(function(curr) {
				var _a = __read(curr, 2), k = _a[0], v = _a[1];
				var s = k;
				s = s + "=[" + v.map(function(subS) {
					return "\"" + subS + "\"";
				}).join(",") + "]";
				return s;
			}).join("&");
		};
		MultidimensionalConfigForAid.prototype.getDataFromWuJi = function(params) {
			return __awaiter(this, void 0, void 0, function() {
				var result;
				return __generator(this, function(_a) {
					switch (_a.label) {
						case 0:
							_a.trys.push([
								0,
								2,
								,
								3
							]);
							return [4, axios.get("https://v.qq.com/cache/wuji/object", { params: __assign(__assign({}, this.wuJiDBConfig), params) })];
						case 1:
							result = _a.sent();
							return [2, result.data];
						case 2:
							_a.sent();
							console.error("从无极拉取数据失败，请检查参数： params", params);
							return [2, void 0];
						case 3: return [2];
					}
				});
			});
		};
		MultidimensionalConfigForAid.prototype.getExtraFilter = function(extra) {
			var e_2, _a;
			var filterInString = "";
			try {
				try {
					for (var _b = __values(Object.keys(extra)), _c = _b.next(); !_c.done; _c = _b.next()) {
						var key = _c.value;
						filterInString = filterInString + "&" + key + "=[\"default\",\"" + extra[key] + "\"]";
					}
				} catch (e_2_1) {
					e_2 = { error: e_2_1 };
				} finally {
					try {
						if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
					} finally {
						if (e_2) throw e_2.error;
					}
				}
			} catch (e) {}
			return filterInString;
		};
		return MultidimensionalConfigForAid;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+txdocs-aid@0.3.11__cd1e6f95d53456f66bd6020af241dde7/node_modules/@tencent/txdocs-aid/lib/esm/index.js
var init_esm = __esmMin((() => {
	init_get_and_decompose_aid();
	init_multidimensional_config();
}));
//#endregion
export { getEmptyImage as $, PowerPointMimeTypes as A, t$5 as B, Ee as C, init_action_service as D, init_use_file_import as E, init_useDebounce as F, init_use_visibility_change as G, init_use_outside_click as H, useDebounce as I, ReactMarkdown as J, n$9 as K, init_useAsyncFn as L, init_esm$4 as M, init_useWindowSize as N, s$3 as O, useWindowSize as P, init_dist$1 as Q, useAsyncFn as R, u$3 as S, Te as T, init_use_space as U, e$9 as V, p$2 as W, ErrorBoundary as X, init_react_markdown$1 as Y, init_react_error_boundary_esm as Z, init_use_groups as _, C as a, useDrop as at, init_use_dynamic_class_listener as b, l as c, init_useDrag$1 as ct, o as d, useDragDropManager as dt, init_getEmptyImage as et, init_search_import as f, DndProvider as ft, init_use_clear_groups as g, a$1 as h, init_esm$1 as i, init_useDrop$1 as it, init_enumerate as j, init_dist as k, y as l, useDrag as lt, s$1 as m, getAidForReport as n, init_dist$2 as nt, init_create_service as o, init_useDragLayer as ot, l$1 as p, init_DndProvider as pt, init_react_markdown as q, init_get_and_decompose_aid as r, init_dist$3 as rt, init_recommend_template_service as s, useDragLayer as st, init_esm as t, TouchBackend as tt, init_template_selector as u, init_useDragDropManager as ut, u$2 as v, Me as w, init_use_feedback as x, e$5 as y, init_use_horizontal_scroll as z };
