import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Dv as require_dist } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../node_modules/.pnpm/i18next@25.10.10_@typescript+typescript6@6.0.1/node_modules/i18next/dist/esm/i18next.js
function createProxy() {
	const state = [];
	const handler = Object.create(null);
	let proxy;
	handler.get = (target, key) => {
		proxy?.revoke?.();
		if (key === PATH_KEY) return state;
		state.push(key);
		proxy = Proxy.revocable(target, handler);
		return proxy.proxy;
	};
	return Proxy.revocable(Object.create(null), handler).proxy;
}
function keysFromSelector(selector, opts) {
	const { [PATH_KEY]: path } = selector(createProxy());
	const keySeparator = opts?.keySeparator ?? ".";
	const nsSeparator = opts?.nsSeparator ?? ":";
	if (path.length > 1 && nsSeparator) {
		const ns = opts?.ns;
		const nsArray = Array.isArray(ns) ? ns : null;
		if (nsArray && nsArray.length > 1 && nsArray.slice(1).includes(path[0])) return `${path[0]}${nsSeparator}${path.slice(1).join(keySeparator)}`;
	}
	return path.join(keySeparator);
}
var import_dist, isString, defer, makeString, copy, lastOfPathSeparatorRegExp, cleanKey, canNotTraverseDeeper, getLastOfPath, setPath, pushPath, getPath, getPathWithDefaults, deepExtend, regexEscape, _entityMap, escape, RegExpCache, chars, looksLikeObjectPathRegExpCache, looksLikeObjectPath, deepFind, getCleanedCode, consoleLogger, Logger, baseLogger, EventEmitter, ResourceStore, postProcessor, PATH_KEY, checkedLoadedFor, shouldHandleAsObject, Translator, LanguageUtil, suffixesOrder, dummyRule, PluralResolver, deepFindWithDefaults, regexSafe, Interpolator, parseFormatStr, createCachedFormatter, createNonCachedFormatter, Formatter, removePending, Connector, get, transformOptions, noop, bindMemberFunctions, SUPPORT_NOTICE_KEY, getSupportNoticeShown, setSupportNoticeShown, usesLocize, I18n, instance;
var init_i18next = __esmMin((() => {
	import_dist = /* @__PURE__ */ __toESM(require_dist());
	isString = (obj) => typeof obj === "string";
	defer = () => {
		let res;
		let rej;
		const promise = new Promise((resolve, reject) => {
			res = resolve;
			rej = reject;
		});
		promise.resolve = res;
		promise.reject = rej;
		return promise;
	};
	makeString = (object) => {
		if (object == null) return "";
		return "" + object;
	};
	copy = (a, s, t) => {
		a.forEach((m) => {
			if (s[m]) t[m] = s[m];
		});
	};
	lastOfPathSeparatorRegExp = /###/g;
	cleanKey = (key) => key && key.indexOf("###") > -1 ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
	canNotTraverseDeeper = (object) => !object || isString(object);
	getLastOfPath = (object, path, Empty) => {
		const stack = !isString(path) ? path : path.split(".");
		let stackIndex = 0;
		while (stackIndex < stack.length - 1) {
			if (canNotTraverseDeeper(object)) return {};
			const key = cleanKey(stack[stackIndex]);
			if (!object[key] && Empty) object[key] = new Empty();
			if (Object.prototype.hasOwnProperty.call(object, key)) object = object[key];
			else object = {};
			++stackIndex;
		}
		if (canNotTraverseDeeper(object)) return {};
		return {
			obj: object,
			k: cleanKey(stack[stackIndex])
		};
	};
	setPath = (object, path, newValue) => {
		const { obj, k } = getLastOfPath(object, path, Object);
		if (obj !== void 0 || path.length === 1) {
			obj[k] = newValue;
			return;
		}
		let e = path[path.length - 1];
		let p = path.slice(0, path.length - 1);
		let last = getLastOfPath(object, p, Object);
		while (last.obj === void 0 && p.length) {
			e = `${p[p.length - 1]}.${e}`;
			p = p.slice(0, p.length - 1);
			last = getLastOfPath(object, p, Object);
			if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") last.obj = void 0;
		}
		last.obj[`${last.k}.${e}`] = newValue;
	};
	pushPath = (object, path, newValue, concat) => {
		const { obj, k } = getLastOfPath(object, path, Object);
		obj[k] = obj[k] || [];
		obj[k].push(newValue);
	};
	getPath = (object, path) => {
		const { obj, k } = getLastOfPath(object, path);
		if (!obj) return void 0;
		if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
		return obj[k];
	};
	getPathWithDefaults = (data, defaultData, key) => {
		const value = getPath(data, key);
		if (value !== void 0) return value;
		return getPath(defaultData, key);
	};
	deepExtend = (target, source, overwrite) => {
		for (const prop in source) if (prop !== "__proto__" && prop !== "constructor") {
			if (prop in target) {
				if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
					if (overwrite) target[prop] = source[prop];
				} else deepExtend(target[prop], source[prop], overwrite);
			} else target[prop] = source[prop];
		}
		return target;
	};
	regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	_entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	};
	escape = (data) => {
		if (isString(data)) return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
		return data;
	};
	RegExpCache = class {
		constructor(capacity) {
			this.capacity = capacity;
			this.regExpMap = /* @__PURE__ */ new Map();
			this.regExpQueue = [];
		}
		getRegExp(pattern) {
			const regExpFromCache = this.regExpMap.get(pattern);
			if (regExpFromCache !== void 0) return regExpFromCache;
			const regExpNew = new RegExp(pattern);
			if (this.regExpQueue.length === this.capacity) this.regExpMap.delete(this.regExpQueue.shift());
			this.regExpMap.set(pattern, regExpNew);
			this.regExpQueue.push(pattern);
			return regExpNew;
		}
	};
	chars = [
		" ",
		",",
		"?",
		"!",
		";"
	];
	looksLikeObjectPathRegExpCache = new RegExpCache(20);
	looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
		nsSeparator = nsSeparator || "";
		keySeparator = keySeparator || "";
		const possibleChars = chars.filter((c) => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
		if (possibleChars.length === 0) return true;
		const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
		let matched = !r.test(key);
		if (!matched) {
			const ki = key.indexOf(keySeparator);
			if (ki > 0 && !r.test(key.substring(0, ki))) matched = true;
		}
		return matched;
	};
	deepFind = (obj, path, keySeparator = ".") => {
		if (!obj) return void 0;
		if (obj[path]) {
			if (!Object.prototype.hasOwnProperty.call(obj, path)) return void 0;
			return obj[path];
		}
		const tokens = path.split(keySeparator);
		let current = obj;
		for (let i = 0; i < tokens.length;) {
			if (!current || typeof current !== "object") return;
			let next;
			let nextPath = "";
			for (let j = i; j < tokens.length; ++j) {
				if (j !== i) nextPath += keySeparator;
				nextPath += tokens[j];
				next = current[nextPath];
				if (next !== void 0) {
					if ([
						"string",
						"number",
						"boolean"
					].indexOf(typeof next) > -1 && j < tokens.length - 1) continue;
					i += j - i + 1;
					break;
				}
			}
			current = next;
		}
		return current;
	};
	getCleanedCode = (code) => code?.replace(/_/g, "-");
	consoleLogger = {
		type: "logger",
		log(args) {
			this.output("log", args);
		},
		warn(args) {
			this.output("warn", args);
		},
		error(args) {
			this.output("error", args);
		},
		output(type, args) {
			console?.[type]?.apply?.(console, args);
		}
	};
	Logger = class Logger {
		constructor(concreteLogger, options = {}) {
			this.init(concreteLogger, options);
		}
		init(concreteLogger, options = {}) {
			this.prefix = options.prefix || "i18next:";
			this.logger = concreteLogger || consoleLogger;
			this.options = options;
			this.debug = options.debug;
		}
		log(...args) {
			return this.forward(args, "log", "", true);
		}
		warn(...args) {
			return this.forward(args, "warn", "", true);
		}
		error(...args) {
			return this.forward(args, "error", "");
		}
		deprecate(...args) {
			return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
		}
		forward(args, lvl, prefix, debugOnly) {
			if (debugOnly && !this.debug) return null;
			if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
			return this.logger[lvl](args);
		}
		create(moduleName) {
			return new Logger(this.logger, {
				prefix: `${this.prefix}:${moduleName}:`,
				...this.options
			});
		}
		clone(options) {
			options = options || this.options;
			options.prefix = options.prefix || this.prefix;
			return new Logger(this.logger, options);
		}
	};
	baseLogger = new Logger();
	EventEmitter = class {
		constructor() {
			this.observers = {};
		}
		on(events, listener) {
			events.split(" ").forEach((event) => {
				if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
				const numListeners = this.observers[event].get(listener) || 0;
				this.observers[event].set(listener, numListeners + 1);
			});
			return this;
		}
		off(event, listener) {
			if (!this.observers[event]) return;
			if (!listener) {
				delete this.observers[event];
				return;
			}
			this.observers[event].delete(listener);
		}
		emit(event, ...args) {
			if (this.observers[event]) Array.from(this.observers[event].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(...args);
			});
			if (this.observers["*"]) Array.from(this.observers["*"].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer.apply(observer, [event, ...args]);
			});
		}
	};
	ResourceStore = class extends EventEmitter {
		constructor(data, options = {
			ns: ["translation"],
			defaultNS: "translation"
		}) {
			super();
			this.data = data || {};
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			if (this.options.ignoreJSONStructure === void 0) this.options.ignoreJSONStructure = true;
		}
		addNamespaces(ns) {
			if (this.options.ns.indexOf(ns) < 0) this.options.ns.push(ns);
		}
		removeNamespaces(ns) {
			const index = this.options.ns.indexOf(ns);
			if (index > -1) this.options.ns.splice(index, 1);
		}
		getResource(lng, ns, key, options = {}) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
			let path;
			if (lng.indexOf(".") > -1) path = lng.split(".");
			else {
				path = [lng, ns];
				if (key) {
					if (Array.isArray(key)) path.push(...key);
					else if (isString(key) && keySeparator) path.push(...key.split(keySeparator));
					else path.push(key);
				}
			}
			const result = getPath(this.data, path);
			if (!result && !ns && !key && lng.indexOf(".") > -1) {
				lng = path[0];
				ns = path[1];
				key = path.slice(2).join(".");
			}
			if (result || !ignoreJSONStructure || !isString(key)) return result;
			return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
		}
		addResource(lng, ns, key, value, options = { silent: false }) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			let path = [lng, ns];
			if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
			if (lng.indexOf(".") > -1) {
				path = lng.split(".");
				value = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			setPath(this.data, path, value);
			if (!options.silent) this.emit("added", lng, ns, key, value);
		}
		addResources(lng, ns, resources, options = { silent: false }) {
			for (const m in resources) if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], { silent: true });
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		addResourceBundle(lng, ns, resources, deep, overwrite, options = {
			silent: false,
			skipCopy: false
		}) {
			let path = [lng, ns];
			if (lng.indexOf(".") > -1) {
				path = lng.split(".");
				deep = resources;
				resources = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			let pack = getPath(this.data, path) || {};
			if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
			if (deep) deepExtend(pack, resources, overwrite);
			else pack = {
				...pack,
				...resources
			};
			setPath(this.data, path, pack);
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		removeResourceBundle(lng, ns) {
			if (this.hasResourceBundle(lng, ns)) delete this.data[lng][ns];
			this.removeNamespaces(ns);
			this.emit("removed", lng, ns);
		}
		hasResourceBundle(lng, ns) {
			return this.getResource(lng, ns) !== void 0;
		}
		getResourceBundle(lng, ns) {
			if (!ns) ns = this.options.defaultNS;
			return this.getResource(lng, ns);
		}
		getDataByLanguage(lng) {
			return this.data[lng];
		}
		hasLanguageSomeTranslations(lng) {
			const data = this.getDataByLanguage(lng);
			return !!(data && Object.keys(data) || []).find((v) => data[v] && Object.keys(data[v]).length > 0);
		}
		toJSON() {
			return this.data;
		}
	};
	postProcessor = {
		processors: {},
		addPostProcessor(module) {
			this.processors[module.name] = module;
		},
		handle(processors, value, key, options, translator) {
			processors.forEach((processor) => {
				value = this.processors[processor]?.process(value, key, options, translator) ?? value;
			});
			return value;
		}
	};
	PATH_KEY = Symbol("i18next/PATH_KEY");
	checkedLoadedFor = {};
	shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
	Translator = class Translator extends EventEmitter {
		constructor(services, options = {}) {
			super();
			copy([
				"resourceStore",
				"languageUtils",
				"pluralResolver",
				"interpolator",
				"backendConnector",
				"i18nFormat",
				"utils"
			], services, this);
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			this.logger = baseLogger.create("translator");
		}
		changeLanguage(lng) {
			if (lng) this.language = lng;
		}
		exists(key, o = { interpolation: {} }) {
			const opt = { ...o };
			if (key == null) return false;
			const resolved = this.resolve(key, opt);
			if (resolved?.res === void 0) return false;
			const isObject = shouldHandleAsObject(resolved.res);
			if (opt.returnObjects === false && isObject) return false;
			return true;
		}
		extractFromKey(key, opt) {
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			let namespaces = opt.ns || this.options.defaultNS || [];
			const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
			const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
			if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
				const m = key.match(this.interpolator.nestingRegexp);
				if (m && m.length > 0) return {
					key,
					namespaces: isString(namespaces) ? [namespaces] : namespaces
				};
				const parts = key.split(nsSeparator);
				if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
				key = parts.join(keySeparator);
			}
			return {
				key,
				namespaces: isString(namespaces) ? [namespaces] : namespaces
			};
		}
		translate(keys, o, lastKey) {
			let opt = typeof o === "object" ? { ...o } : o;
			if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) opt = this.options.overloadTranslationOptionHandler(arguments);
			if (typeof opt === "object") opt = { ...opt };
			if (!opt) opt = {};
			if (keys == null) return "";
			if (typeof keys === "function") keys = keysFromSelector(keys, {
				...this.options,
				...opt
			});
			if (!Array.isArray(keys)) keys = [String(keys)];
			keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : String(k));
			const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			const { key, namespaces } = this.extractFromKey(keys[keys.length - 1], opt);
			const namespace = namespaces[namespaces.length - 1];
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const lng = opt.lng || this.language;
			const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
			if (lng?.toLowerCase() === "cimode") {
				if (appendNamespaceToCIMode) {
					if (returnDetails) return {
						res: `${namespace}${nsSeparator}${key}`,
						usedKey: key,
						exactUsedKey: key,
						usedLng: lng,
						usedNS: namespace,
						usedParams: this.getUsedParamsDetails(opt)
					};
					return `${namespace}${nsSeparator}${key}`;
				}
				if (returnDetails) return {
					res: key,
					usedKey: key,
					exactUsedKey: key,
					usedLng: lng,
					usedNS: namespace,
					usedParams: this.getUsedParamsDetails(opt)
				};
				return key;
			}
			const resolved = this.resolve(keys, opt);
			let res = resolved?.res;
			const resUsedKey = resolved?.usedKey || key;
			const resExactUsedKey = resolved?.exactUsedKey || key;
			const noObject = [
				"[object Number]",
				"[object Function]",
				"[object RegExp]"
			];
			const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
			const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
			const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
			const hasDefaultValue = Translator.hasDefaultValue(opt);
			const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
			const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, { ordinal: false }) : "";
			const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
			const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
			let resForObjHndl = res;
			if (handleAsObjectInI18nFormat && !res && hasDefaultValue) resForObjHndl = defaultValue;
			const handleAsObject = shouldHandleAsObject(resForObjHndl);
			const resType = Object.prototype.toString.apply(resForObjHndl);
			if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
				if (!opt.returnObjects && !this.options.returnObjects) {
					if (!this.options.returnedObjectHandler) this.logger.warn("accessing an object - but returnObjects options is not enabled!");
					const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
						...opt,
						ns: namespaces
					}) : `key '${key} (${this.language})' returned an object instead of string.`;
					if (returnDetails) {
						resolved.res = r;
						resolved.usedParams = this.getUsedParamsDetails(opt);
						return resolved;
					}
					return r;
				}
				if (keySeparator) {
					const resTypeIsArray = Array.isArray(resForObjHndl);
					const copy = resTypeIsArray ? [] : {};
					const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
					for (const m in resForObjHndl) if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
						const deepKey = `${newKeyToUse}${keySeparator}${m}`;
						if (hasDefaultValue && !res) copy[m] = this.translate(deepKey, {
							...opt,
							defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
							joinArrays: false,
							ns: namespaces
						});
						else copy[m] = this.translate(deepKey, {
							...opt,
							joinArrays: false,
							ns: namespaces
						});
						if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
					}
					res = copy;
				}
			} else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
				res = res.join(joinArrays);
				if (res) res = this.extendTranslation(res, keys, opt, lastKey);
			} else {
				let usedDefault = false;
				let usedKey = false;
				if (!this.isValidLookup(res) && hasDefaultValue) {
					usedDefault = true;
					res = defaultValue;
				}
				if (!this.isValidLookup(res)) {
					usedKey = true;
					res = key;
				}
				const resForMissing = (opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && usedKey ? void 0 : res;
				const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
				if (usedKey || usedDefault || updateMissing) {
					this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
					if (keySeparator) {
						const fk = this.resolve(key, {
							...opt,
							keySeparator: false
						});
						if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
					}
					let lngs = [];
					const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
					if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) for (let i = 0; i < fallbackLngs.length; i++) lngs.push(fallbackLngs[i]);
					else if (this.options.saveMissingTo === "all") lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
					else lngs.push(opt.lng || this.language);
					const send = (l, k, specificDefaultValue) => {
						const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
						if (this.options.missingKeyHandler) this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
						else if (this.backendConnector?.saveMissing) this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
						this.emit("missingKey", l, namespace, k, res);
					};
					if (this.options.saveMissing) {
						if (this.options.saveMissingPlurals && needsPluralHandling) lngs.forEach((language) => {
							const suffixes = this.pluralResolver.getSuffixes(language, opt);
							if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) suffixes.push(`${this.options.pluralSeparator}zero`);
							suffixes.forEach((suffix) => {
								send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
							});
						});
						else send(lngs, key, defaultValue);
					}
				}
				res = this.extendTranslation(res, keys, opt, resolved, lastKey);
				if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}${nsSeparator}${key}`;
				if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
			}
			if (returnDetails) {
				resolved.res = res;
				resolved.usedParams = this.getUsedParamsDetails(opt);
				return resolved;
			}
			return res;
		}
		extendTranslation(res, key, opt, resolved, lastKey) {
			if (this.i18nFormat?.parse) res = this.i18nFormat.parse(res, {
				...this.options.interpolation.defaultVariables,
				...opt
			}, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved });
			else if (!opt.skipInterpolation) {
				if (opt.interpolation) this.interpolator.init({
					...opt,
					interpolation: {
						...this.options.interpolation,
						...opt.interpolation
					}
				});
				const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
				let nestBef;
				if (skipOnVariables) {
					const nb = res.match(this.interpolator.nestingRegexp);
					nestBef = nb && nb.length;
				}
				let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
				if (this.options.interpolation.defaultVariables) data = {
					...this.options.interpolation.defaultVariables,
					...data
				};
				res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
				if (skipOnVariables) {
					const na = res.match(this.interpolator.nestingRegexp);
					const nestAft = na && na.length;
					if (nestBef < nestAft) opt.nest = false;
				}
				if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
				if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
					if (lastKey?.[0] === args[0] && !opt.context) {
						this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
						return null;
					}
					return this.translate(...args, key);
				}, opt);
				if (opt.interpolation) this.interpolator.reset();
			}
			const postProcess = opt.postProcess || this.options.postProcess;
			const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
			if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
				i18nResolved: {
					...resolved,
					usedParams: this.getUsedParamsDetails(opt)
				},
				...opt
			} : opt, this);
			return res;
		}
		resolve(keys, opt = {}) {
			let found;
			let usedKey;
			let exactUsedKey;
			let usedLng;
			let usedNS;
			if (isString(keys)) keys = [keys];
			if (Array.isArray(keys)) keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : k);
			keys.forEach((k) => {
				if (this.isValidLookup(found)) return;
				const extracted = this.extractFromKey(k, opt);
				const key = extracted.key;
				usedKey = key;
				let namespaces = extracted.namespaces;
				if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
				const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
				const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
				const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
				const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
				namespaces.forEach((ns) => {
					if (this.isValidLookup(found)) return;
					usedNS = ns;
					if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
						checkedLoadedFor[`${codes[0]}-${ns}`] = true;
						this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
					}
					codes.forEach((code) => {
						if (this.isValidLookup(found)) return;
						usedLng = code;
						const finalKeys = [key];
						if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
						else {
							let pluralSuffix;
							if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
							const zeroSuffix = `${this.options.pluralSeparator}zero`;
							const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
							if (needsPluralHandling) {
								if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
								finalKeys.push(key + pluralSuffix);
								if (needsZeroSuffixLookup) finalKeys.push(key + zeroSuffix);
							}
							if (needsContextHandling) {
								const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
								finalKeys.push(contextKey);
								if (needsPluralHandling) {
									if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
									finalKeys.push(contextKey + pluralSuffix);
									if (needsZeroSuffixLookup) finalKeys.push(contextKey + zeroSuffix);
								}
							}
						}
						let possibleKey;
						while (possibleKey = finalKeys.pop()) if (!this.isValidLookup(found)) {
							exactUsedKey = possibleKey;
							found = this.getResource(code, ns, possibleKey, opt);
						}
					});
				});
			});
			return {
				res: found,
				usedKey,
				exactUsedKey,
				usedLng,
				usedNS
			};
		}
		isValidLookup(res) {
			return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
		}
		getResource(code, ns, key, options = {}) {
			if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
			return this.resourceStore.getResource(code, ns, key, options);
		}
		getUsedParamsDetails(options = {}) {
			const optionsKeys = [
				"defaultValue",
				"ordinal",
				"context",
				"replace",
				"lng",
				"lngs",
				"fallbackLng",
				"ns",
				"keySeparator",
				"nsSeparator",
				"returnObjects",
				"returnDetails",
				"joinArrays",
				"postProcess",
				"interpolation"
			];
			const useOptionsReplaceForData = options.replace && !isString(options.replace);
			let data = useOptionsReplaceForData ? options.replace : options;
			if (useOptionsReplaceForData && typeof options.count !== "undefined") data.count = options.count;
			if (this.options.interpolation.defaultVariables) data = {
				...this.options.interpolation.defaultVariables,
				...data
			};
			if (!useOptionsReplaceForData) {
				data = { ...data };
				for (const key of optionsKeys) delete data[key];
			}
			return data;
		}
		static hasDefaultValue(options) {
			const prefix = "defaultValue";
			for (const option in options) if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, 12) && void 0 !== options[option]) return true;
			return false;
		}
	};
	LanguageUtil = class {
		constructor(options) {
			this.options = options;
			this.supportedLngs = this.options.supportedLngs || false;
			this.logger = baseLogger.create("languageUtils");
		}
		getScriptPartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || code.indexOf("-") < 0) return null;
			const p = code.split("-");
			if (p.length === 2) return null;
			p.pop();
			if (p[p.length - 1].toLowerCase() === "x") return null;
			return this.formatLanguageCode(p.join("-"));
		}
		getLanguagePartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || code.indexOf("-") < 0) return code;
			const p = code.split("-");
			return this.formatLanguageCode(p[0]);
		}
		formatLanguageCode(code) {
			if (isString(code) && code.indexOf("-") > -1) {
				let formattedCode;
				try {
					formattedCode = Intl.getCanonicalLocales(code)[0];
				} catch (e) {}
				if (formattedCode && this.options.lowerCaseLng) formattedCode = formattedCode.toLowerCase();
				if (formattedCode) return formattedCode;
				if (this.options.lowerCaseLng) return code.toLowerCase();
				return code;
			}
			return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
		}
		isSupportedCode(code) {
			if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) code = this.getLanguagePartFromCode(code);
			return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
		}
		getBestMatchFromCodes(codes) {
			if (!codes) return null;
			let found;
			codes.forEach((code) => {
				if (found) return;
				const cleanedLng = this.formatLanguageCode(code);
				if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
			});
			if (!found && this.options.supportedLngs) codes.forEach((code) => {
				if (found) return;
				const lngScOnly = this.getScriptPartFromCode(code);
				if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
				const lngOnly = this.getLanguagePartFromCode(code);
				if (this.isSupportedCode(lngOnly)) return found = lngOnly;
				found = this.options.supportedLngs.find((supportedLng) => {
					if (supportedLng === lngOnly) return supportedLng;
					if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0) return;
					if (supportedLng.indexOf("-") > 0 && lngOnly.indexOf("-") < 0 && supportedLng.substring(0, supportedLng.indexOf("-")) === lngOnly) return supportedLng;
					if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
				});
			});
			if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
			return found;
		}
		getFallbackCodes(fallbacks, code) {
			if (!fallbacks) return [];
			if (typeof fallbacks === "function") fallbacks = fallbacks(code);
			if (isString(fallbacks)) fallbacks = [fallbacks];
			if (Array.isArray(fallbacks)) return fallbacks;
			if (!code) return fallbacks.default || [];
			let found = fallbacks[code];
			if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
			if (!found) found = fallbacks[this.formatLanguageCode(code)];
			if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
			if (!found) found = fallbacks.default;
			return found || [];
		}
		toResolveHierarchy(code, fallbackCode) {
			const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
			const codes = [];
			const addCode = (c) => {
				if (!c) return;
				if (this.isSupportedCode(c)) codes.push(c);
				else this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
			};
			if (isString(code) && (code.indexOf("-") > -1 || code.indexOf("_") > -1)) {
				if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
				if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
				if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
			} else if (isString(code)) addCode(this.formatLanguageCode(code));
			fallbackCodes.forEach((fc) => {
				if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
			});
			return codes;
		}
	};
	suffixesOrder = {
		zero: 0,
		one: 1,
		two: 2,
		few: 3,
		many: 4,
		other: 5
	};
	dummyRule = {
		select: (count) => count === 1 ? "one" : "other",
		resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
	};
	PluralResolver = class {
		constructor(languageUtils, options = {}) {
			this.languageUtils = languageUtils;
			this.options = options;
			this.logger = baseLogger.create("pluralResolver");
			this.pluralRulesCache = {};
		}
		clearCache() {
			this.pluralRulesCache = {};
		}
		getRule(code, options = {}) {
			const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
			const type = options.ordinal ? "ordinal" : "cardinal";
			const cacheKey = JSON.stringify({
				cleanedCode,
				type
			});
			if (cacheKey in this.pluralRulesCache) return this.pluralRulesCache[cacheKey];
			let rule;
			try {
				rule = new Intl.PluralRules(cleanedCode, { type });
			} catch (err) {
				if (typeof Intl === "undefined") {
					this.logger.error("No Intl support, please use an Intl polyfill!");
					return dummyRule;
				}
				if (!code.match(/-|_/)) return dummyRule;
				const lngPart = this.languageUtils.getLanguagePartFromCode(code);
				rule = this.getRule(lngPart, options);
			}
			this.pluralRulesCache[cacheKey] = rule;
			return rule;
		}
		needsPlural(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			return rule?.resolvedOptions().pluralCategories.length > 1;
		}
		getPluralFormsOfKey(code, key, options = {}) {
			return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
		}
		getSuffixes(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			if (!rule) return [];
			return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
		}
		getSuffix(code, count, options = {}) {
			const rule = this.getRule(code, options);
			if (rule) return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
			this.logger.warn(`no plural rule found for: ${code}`);
			return this.getSuffix("dev", count, options);
		}
	};
	deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
		let path = getPathWithDefaults(data, defaultData, key);
		if (!path && ignoreJSONStructure && isString(key)) {
			path = deepFind(data, key, keySeparator);
			if (path === void 0) path = deepFind(defaultData, key, keySeparator);
		}
		return path;
	};
	regexSafe = (val) => val.replace(/\$/g, "$$$$");
	Interpolator = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("interpolator");
			this.options = options;
			this.format = options?.interpolation?.format || ((value) => value);
			this.init(options);
		}
		init(options = {}) {
			if (!options.interpolation) options.interpolation = { escapeValue: true };
			const { escape: escape$1, escapeValue, useRawValueToEscape, prefix, prefixEscaped, suffix, suffixEscaped, formatSeparator, unescapeSuffix, unescapePrefix, nestingPrefix, nestingPrefixEscaped, nestingSuffix, nestingSuffixEscaped, nestingOptionsSeparator, maxReplaces, alwaysFormat } = options.interpolation;
			this.escape = escape$1 !== void 0 ? escape$1 : escape;
			this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
			this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
			this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
			this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
			this.formatSeparator = formatSeparator || ",";
			this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix || "-";
			this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix || "";
			this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
			this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
			this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
			this.maxReplaces = maxReplaces || 1e3;
			this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
			this.resetRegExp();
		}
		reset() {
			if (this.options) this.init(this.options);
		}
		resetRegExp() {
			const getOrResetRegExp = (existingRegExp, pattern) => {
				if (existingRegExp?.source === pattern) {
					existingRegExp.lastIndex = 0;
					return existingRegExp;
				}
				return new RegExp(pattern, "g");
			};
			this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
			this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
			this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
		}
		interpolate(str, data, lng, options) {
			let match;
			let value;
			let replaces;
			const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
			const handleFormat = (key) => {
				if (key.indexOf(this.formatSeparator) < 0) {
					const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
					return this.alwaysFormat ? this.format(path, void 0, lng, {
						...options,
						...data,
						interpolationkey: key
					}) : path;
				}
				const p = key.split(this.formatSeparator);
				const k = p.shift().trim();
				const f = p.join(this.formatSeparator).trim();
				return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
					...options,
					...data,
					interpolationkey: k
				});
			};
			this.resetRegExp();
			const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
			const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
			[{
				regex: this.regexpUnescape,
				safeValue: (val) => regexSafe(val)
			}, {
				regex: this.regexp,
				safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
			}].forEach((todo) => {
				replaces = 0;
				while (match = todo.regex.exec(str)) {
					const matchedVar = match[1].trim();
					value = handleFormat(matchedVar);
					if (value === void 0) {
						if (typeof missingInterpolationHandler === "function") {
							const temp = missingInterpolationHandler(str, match, options);
							value = isString(temp) ? temp : "";
						} else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) value = "";
						else if (skipOnVariables) {
							value = match[0];
							continue;
						} else {
							this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
							value = "";
						}
					} else if (!isString(value) && !this.useRawValueToEscape) value = makeString(value);
					const safeValue = todo.safeValue(value);
					str = str.replace(match[0], safeValue);
					if (skipOnVariables) {
						todo.regex.lastIndex += value.length;
						todo.regex.lastIndex -= match[0].length;
					} else todo.regex.lastIndex = 0;
					replaces++;
					if (replaces >= this.maxReplaces) break;
				}
			});
			return str;
		}
		nest(str, fc, options = {}) {
			let match;
			let value;
			let clonedOptions;
			const handleHasOptions = (key, inheritedOptions) => {
				const sep = this.nestingOptionsSeparator;
				if (key.indexOf(sep) < 0) return key;
				const c = key.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
				let optionsString = `{${c[1]}`;
				key = c[0];
				optionsString = this.interpolate(optionsString, clonedOptions);
				const matchedSingleQuotes = optionsString.match(/'/g);
				const matchedDoubleQuotes = optionsString.match(/"/g);
				if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) optionsString = optionsString.replace(/'/g, "\"");
				try {
					clonedOptions = JSON.parse(optionsString);
					if (inheritedOptions) clonedOptions = {
						...inheritedOptions,
						...clonedOptions
					};
				} catch (e) {
					this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
					return `${key}${sep}${optionsString}`;
				}
				if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
				return key;
			};
			while (match = this.nestingRegexp.exec(str)) {
				let formatters = [];
				clonedOptions = { ...options };
				clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
				clonedOptions.applyPostProcessor = false;
				delete clonedOptions.defaultValue;
				const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
				if (keyEndIndex !== -1) {
					formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
					match[1] = match[1].slice(0, keyEndIndex);
				}
				value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
				if (value && match[0] === str && !isString(value)) return value;
				if (!isString(value)) value = makeString(value);
				if (!value) {
					this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
					value = "";
				}
				if (formatters.length) value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
					...options,
					interpolationkey: match[1].trim()
				}), value.trim());
				str = str.replace(match[0], value);
				this.regexp.lastIndex = 0;
			}
			return str;
		}
	};
	parseFormatStr = (formatStr) => {
		let formatName = formatStr.toLowerCase().trim();
		const formatOptions = {};
		if (formatStr.indexOf("(") > -1) {
			const p = formatStr.split("(");
			formatName = p[0].toLowerCase().trim();
			const optStr = p[1].substring(0, p[1].length - 1);
			if (formatName === "currency" && optStr.indexOf(":") < 0) {
				if (!formatOptions.currency) formatOptions.currency = optStr.trim();
			} else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
				if (!formatOptions.range) formatOptions.range = optStr.trim();
			} else optStr.split(";").forEach((opt) => {
				if (opt) {
					const [key, ...rest] = opt.split(":");
					const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
					const trimmedKey = key.trim();
					if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
					if (val === "false") formatOptions[trimmedKey] = false;
					if (val === "true") formatOptions[trimmedKey] = true;
					if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
				}
			});
		}
		return {
			formatName,
			formatOptions
		};
	};
	createCachedFormatter = (fn) => {
		const cache = {};
		return (v, l, o) => {
			let optForCache = o;
			if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) optForCache = {
				...optForCache,
				[o.interpolationkey]: void 0
			};
			const key = l + JSON.stringify(optForCache);
			let frm = cache[key];
			if (!frm) {
				frm = fn(getCleanedCode(l), o);
				cache[key] = frm;
			}
			return frm(v);
		};
	};
	createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
	Formatter = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("formatter");
			this.options = options;
			this.init(options);
		}
		init(services, options = { interpolation: {} }) {
			this.formatSeparator = options.interpolation.formatSeparator || ",";
			const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
			this.formats = {
				number: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				currency: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, {
						...opt,
						style: "currency"
					});
					return (val) => formatter.format(val);
				}),
				datetime: cf((lng, opt) => {
					const formatter = new Intl.DateTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				relativetime: cf((lng, opt) => {
					const formatter = new Intl.RelativeTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val, opt.range || "day");
				}),
				list: cf((lng, opt) => {
					const formatter = new Intl.ListFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				})
			};
		}
		add(name, fc) {
			this.formats[name.toLowerCase().trim()] = fc;
		}
		addCached(name, fc) {
			this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
		}
		format(value, format, lng, options = {}) {
			const formats = format.split(this.formatSeparator);
			if (formats.length > 1 && formats[0].indexOf("(") > 1 && formats[0].indexOf(")") < 0 && formats.find((f) => f.indexOf(")") > -1)) {
				const lastIndex = formats.findIndex((f) => f.indexOf(")") > -1);
				formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
			}
			return formats.reduce((mem, f) => {
				const { formatName, formatOptions } = parseFormatStr(f);
				if (this.formats[formatName]) {
					let formatted = mem;
					try {
						const valOptions = options?.formatParams?.[options.interpolationkey] || {};
						const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
						formatted = this.formats[formatName](mem, l, {
							...formatOptions,
							...options,
							...valOptions
						});
					} catch (error) {
						this.logger.warn(error);
					}
					return formatted;
				} else this.logger.warn(`there was no format function for ${formatName}`);
				return mem;
			}, value);
		}
	};
	removePending = (q, name) => {
		if (q.pending[name] !== void 0) {
			delete q.pending[name];
			q.pendingCount--;
		}
	};
	Connector = class extends EventEmitter {
		constructor(backend, store, services, options = {}) {
			super();
			this.backend = backend;
			this.store = store;
			this.services = services;
			this.languageUtils = services.languageUtils;
			this.options = options;
			this.logger = baseLogger.create("backendConnector");
			this.waitingReads = [];
			this.maxParallelReads = options.maxParallelReads || 10;
			this.readingCalls = 0;
			this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
			this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
			this.state = {};
			this.queue = [];
			this.backend?.init?.(services, options.backend, options);
		}
		queueLoad(languages, namespaces, options, callback) {
			const toLoad = {};
			const pending = {};
			const toLoadLanguages = {};
			const toLoadNamespaces = {};
			languages.forEach((lng) => {
				let hasAllNamespaces = true;
				namespaces.forEach((ns) => {
					const name = `${lng}|${ns}`;
					if (!options.reload && this.store.hasResourceBundle(lng, ns)) this.state[name] = 2;
					else if (this.state[name] < 0);
					else if (this.state[name] === 1) {
						if (pending[name] === void 0) pending[name] = true;
					} else {
						this.state[name] = 1;
						hasAllNamespaces = false;
						if (pending[name] === void 0) pending[name] = true;
						if (toLoad[name] === void 0) toLoad[name] = true;
						if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
					}
				});
				if (!hasAllNamespaces) toLoadLanguages[lng] = true;
			});
			if (Object.keys(toLoad).length || Object.keys(pending).length) this.queue.push({
				pending,
				pendingCount: Object.keys(pending).length,
				loaded: {},
				errors: [],
				callback
			});
			return {
				toLoad: Object.keys(toLoad),
				pending: Object.keys(pending),
				toLoadLanguages: Object.keys(toLoadLanguages),
				toLoadNamespaces: Object.keys(toLoadNamespaces)
			};
		}
		loaded(name, err, data) {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			if (err) this.emit("failedLoading", lng, ns, err);
			if (!err && data) this.store.addResourceBundle(lng, ns, data, void 0, void 0, { skipCopy: true });
			this.state[name] = err ? -1 : 2;
			if (err && data) this.state[name] = 0;
			const loaded = {};
			this.queue.forEach((q) => {
				pushPath(q.loaded, [lng], ns);
				removePending(q, name);
				if (err) q.errors.push(err);
				if (q.pendingCount === 0 && !q.done) {
					Object.keys(q.loaded).forEach((l) => {
						if (!loaded[l]) loaded[l] = {};
						const loadedKeys = q.loaded[l];
						if (loadedKeys.length) loadedKeys.forEach((n) => {
							if (loaded[l][n] === void 0) loaded[l][n] = true;
						});
					});
					q.done = true;
					if (q.errors.length) q.callback(q.errors);
					else q.callback();
				}
			});
			this.emit("loaded", loaded);
			this.queue = this.queue.filter((q) => !q.done);
		}
		read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
			if (!lng.length) return callback(null, {});
			if (this.readingCalls >= this.maxParallelReads) {
				this.waitingReads.push({
					lng,
					ns,
					fcName,
					tried,
					wait,
					callback
				});
				return;
			}
			this.readingCalls++;
			const resolver = (err, data) => {
				this.readingCalls--;
				if (this.waitingReads.length > 0) {
					const next = this.waitingReads.shift();
					this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
				}
				if (err && data && tried < this.maxRetries) {
					setTimeout(() => {
						this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
					}, wait);
					return;
				}
				callback(err, data);
			};
			const fc = this.backend[fcName].bind(this.backend);
			if (fc.length === 2) {
				try {
					const r = fc(lng, ns);
					if (r && typeof r.then === "function") r.then((data) => resolver(null, data)).catch(resolver);
					else resolver(null, r);
				} catch (err) {
					resolver(err);
				}
				return;
			}
			return fc(lng, ns, resolver);
		}
		prepareLoading(languages, namespaces, options = {}, callback) {
			if (!this.backend) {
				this.logger.warn("No backend was added via i18next.use. Will not load resources.");
				return callback && callback();
			}
			if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
			if (isString(namespaces)) namespaces = [namespaces];
			const toLoad = this.queueLoad(languages, namespaces, options, callback);
			if (!toLoad.toLoad.length) {
				if (!toLoad.pending.length) callback();
				return null;
			}
			toLoad.toLoad.forEach((name) => {
				this.loadOne(name);
			});
		}
		load(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, {}, callback);
		}
		reload(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, { reload: true }, callback);
		}
		loadOne(name, prefix = "") {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			this.read(lng, ns, "read", void 0, void 0, (err, data) => {
				if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
				if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
				this.loaded(name, err, data);
			});
		}
		saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
			if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
				this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
				return;
			}
			if (key === void 0 || key === null || key === "") return;
			if (this.backend?.create) {
				const opts = {
					...options,
					isUpdate
				};
				const fc = this.backend.create.bind(this.backend);
				if (fc.length < 6) try {
					let r;
					if (fc.length === 5) r = fc(languages, namespace, key, fallbackValue, opts);
					else r = fc(languages, namespace, key, fallbackValue);
					if (r && typeof r.then === "function") r.then((data) => clb(null, data)).catch(clb);
					else clb(null, r);
				} catch (err) {
					clb(err);
				}
				else fc(languages, namespace, key, fallbackValue, clb, opts);
			}
			if (!languages || !languages[0]) return;
			this.store.addResource(languages[0], namespace, key, fallbackValue);
		}
	};
	get = () => ({
		debug: false,
		initAsync: true,
		ns: ["translation"],
		defaultNS: ["translation"],
		fallbackLng: ["dev"],
		fallbackNS: false,
		supportedLngs: false,
		nonExplicitSupportedLngs: false,
		load: "all",
		preload: false,
		simplifyPluralSuffix: true,
		keySeparator: ".",
		nsSeparator: ":",
		pluralSeparator: "_",
		contextSeparator: "_",
		partialBundledLanguages: false,
		saveMissing: false,
		updateMissing: false,
		saveMissingTo: "fallback",
		saveMissingPlurals: true,
		missingKeyHandler: false,
		missingInterpolationHandler: false,
		postProcess: false,
		postProcessPassResolved: false,
		returnNull: false,
		returnEmptyString: true,
		returnObjects: false,
		joinArrays: false,
		returnedObjectHandler: false,
		parseMissingKeyHandler: false,
		appendNamespaceToMissingKey: false,
		appendNamespaceToCIMode: false,
		overloadTranslationOptionHandler: (args) => {
			let ret = {};
			if (typeof args[1] === "object") ret = args[1];
			if (isString(args[1])) ret.defaultValue = args[1];
			if (isString(args[2])) ret.tDescription = args[2];
			if (typeof args[2] === "object" || typeof args[3] === "object") {
				const options = args[3] || args[2];
				Object.keys(options).forEach((key) => {
					ret[key] = options[key];
				});
			}
			return ret;
		},
		interpolation: {
			escapeValue: true,
			format: (value) => value,
			prefix: "{{",
			suffix: "}}",
			formatSeparator: ",",
			unescapePrefix: "-",
			nestingPrefix: "$t(",
			nestingSuffix: ")",
			nestingOptionsSeparator: ",",
			maxReplaces: 1e3,
			skipOnVariables: true
		},
		cacheInBuiltFormats: true
	});
	transformOptions = (options) => {
		if (isString(options.ns)) options.ns = [options.ns];
		if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
		if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
		if (options.supportedLngs?.indexOf?.("cimode") < 0) options.supportedLngs = options.supportedLngs.concat(["cimode"]);
		if (typeof options.initImmediate === "boolean") options.initAsync = options.initImmediate;
		return options;
	};
	noop = () => {};
	bindMemberFunctions = (inst) => {
		Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).forEach((mem) => {
			if (typeof inst[mem] === "function") inst[mem] = inst[mem].bind(inst);
		});
	};
	SUPPORT_NOTICE_KEY = "__i18next_supportNoticeShown";
	getSupportNoticeShown = () => {
		if (typeof globalThis !== "undefined" && !!globalThis[SUPPORT_NOTICE_KEY]) return true;
		if (typeof import_dist.default !== "undefined" && {}.I18NEXT_NO_SUPPORT_NOTICE) return true;
		if (typeof import_dist.default !== "undefined" && true) return true;
		return false;
	};
	setSupportNoticeShown = () => {
		if (typeof globalThis !== "undefined") globalThis[SUPPORT_NOTICE_KEY] = true;
	};
	usesLocize = (inst) => {
		if (inst?.modules?.backend?.name?.indexOf("Locize") > 0) return true;
		if (inst?.modules?.backend?.constructor?.name?.indexOf("Locize") > 0) return true;
		if (inst?.options?.backend?.backends) {
			if (inst.options.backend.backends.some((b) => b?.name?.indexOf("Locize") > 0 || b?.constructor?.name?.indexOf("Locize") > 0)) return true;
		}
		if (inst?.options?.backend?.projectId) return true;
		if (inst?.options?.backend?.backendOptions) {
			if (inst.options.backend.backendOptions.some((b) => b?.projectId)) return true;
		}
		return false;
	};
	I18n = class I18n extends EventEmitter {
		constructor(options = {}, callback) {
			super();
			this.options = transformOptions(options);
			this.services = {};
			this.logger = baseLogger;
			this.modules = { external: [] };
			bindMemberFunctions(this);
			if (callback && !this.isInitialized && !options.isClone) {
				if (!this.options.initAsync) {
					this.init(options, callback);
					return this;
				}
				setTimeout(() => {
					this.init(options, callback);
				}, 0);
			}
		}
		init(options = {}, callback) {
			this.isInitializing = true;
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			if (options.defaultNS == null && options.ns) {
				if (isString(options.ns)) options.defaultNS = options.ns;
				else if (options.ns.indexOf("translation") < 0) options.defaultNS = options.ns[0];
			}
			const defOpts = get();
			this.options = {
				...defOpts,
				...this.options,
				...transformOptions(options)
			};
			this.options.interpolation = {
				...defOpts.interpolation,
				...this.options.interpolation
			};
			if (options.keySeparator !== void 0) this.options.userDefinedKeySeparator = options.keySeparator;
			if (options.nsSeparator !== void 0) this.options.userDefinedNsSeparator = options.nsSeparator;
			if (typeof this.options.overloadTranslationOptionHandler !== "function") this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
			if (this.options.showSupportNotice !== false && !usesLocize(this) && !getSupportNoticeShown()) {
				if (typeof console !== "undefined" && typeof console.info !== "undefined") console.info("🌐 i18next is made possible by our own product, Locize — consider powering your project with managed localization (AI, CDN, integrations): https://locize.com 💙");
				setSupportNoticeShown();
			}
			const createClassOnDemand = (ClassOrObject) => {
				if (!ClassOrObject) return null;
				if (typeof ClassOrObject === "function") return new ClassOrObject();
				return ClassOrObject;
			};
			if (!this.options.isClone) {
				if (this.modules.logger) baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
				else baseLogger.init(null, this.options);
				let formatter;
				if (this.modules.formatter) formatter = this.modules.formatter;
				else formatter = Formatter;
				const lu = new LanguageUtil(this.options);
				this.store = new ResourceStore(this.options.resources, this.options);
				const s = this.services;
				s.logger = baseLogger;
				s.resourceStore = this.store;
				s.languageUtils = lu;
				s.pluralResolver = new PluralResolver(lu, {
					prepend: this.options.pluralSeparator,
					simplifyPluralSuffix: this.options.simplifyPluralSuffix
				});
				if (this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format) this.logger.deprecate(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
				if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
					s.formatter = createClassOnDemand(formatter);
					if (s.formatter.init) s.formatter.init(s, this.options);
					this.options.interpolation.format = s.formatter.format.bind(s.formatter);
				}
				s.interpolator = new Interpolator(this.options);
				s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) };
				s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
				s.backendConnector.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				if (this.modules.languageDetector) {
					s.languageDetector = createClassOnDemand(this.modules.languageDetector);
					if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
				}
				if (this.modules.i18nFormat) {
					s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
					if (s.i18nFormat.init) s.i18nFormat.init(this);
				}
				this.translator = new Translator(this.services, this.options);
				this.translator.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				this.modules.external.forEach((m) => {
					if (m.init) m.init(this);
				});
			}
			this.format = this.options.interpolation.format;
			if (!callback) callback = noop;
			if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
				const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
				if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
			}
			if (!this.services.languageDetector && !this.options.lng) this.logger.warn("init: no languageDetector is used and no lng is defined");
			[
				"getResource",
				"hasResourceBundle",
				"getResourceBundle",
				"getDataByLanguage"
			].forEach((fcName) => {
				this[fcName] = (...args) => this.store[fcName](...args);
			});
			[
				"addResource",
				"addResources",
				"addResourceBundle",
				"removeResourceBundle"
			].forEach((fcName) => {
				this[fcName] = (...args) => {
					this.store[fcName](...args);
					return this;
				};
			});
			const deferred = defer();
			const load = () => {
				const finish = (err, t) => {
					this.isInitializing = false;
					if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
					this.isInitialized = true;
					if (!this.options.isClone) this.logger.log("initialized", this.options);
					this.emit("initialized", this.options);
					deferred.resolve(t);
					callback(err, t);
				};
				if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
				this.changeLanguage(this.options.lng, finish);
			};
			if (this.options.resources || !this.options.initAsync) load();
			else setTimeout(load, 0);
			return deferred;
		}
		loadResources(language, callback = noop) {
			let usedCallback = callback;
			const usedLng = isString(language) ? language : this.language;
			if (typeof language === "function") usedCallback = language;
			if (!this.options.resources || this.options.partialBundledLanguages) {
				if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
				const toLoad = [];
				const append = (lng) => {
					if (!lng) return;
					if (lng === "cimode") return;
					this.services.languageUtils.toResolveHierarchy(lng).forEach((l) => {
						if (l === "cimode") return;
						if (toLoad.indexOf(l) < 0) toLoad.push(l);
					});
				};
				if (!usedLng) this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => append(l));
				else append(usedLng);
				this.options.preload?.forEach?.((l) => append(l));
				this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
					if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
					usedCallback(e);
				});
			} else usedCallback(null);
		}
		reloadResources(lngs, ns, callback) {
			const deferred = defer();
			if (typeof lngs === "function") {
				callback = lngs;
				lngs = void 0;
			}
			if (typeof ns === "function") {
				callback = ns;
				ns = void 0;
			}
			if (!lngs) lngs = this.languages;
			if (!ns) ns = this.options.ns;
			if (!callback) callback = noop;
			this.services.backendConnector.reload(lngs, ns, (err) => {
				deferred.resolve();
				callback(err);
			});
			return deferred;
		}
		use(module) {
			if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
			if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
			if (module.type === "backend") this.modules.backend = module;
			if (module.type === "logger" || module.log && module.warn && module.error) this.modules.logger = module;
			if (module.type === "languageDetector") this.modules.languageDetector = module;
			if (module.type === "i18nFormat") this.modules.i18nFormat = module;
			if (module.type === "postProcessor") postProcessor.addPostProcessor(module);
			if (module.type === "formatter") this.modules.formatter = module;
			if (module.type === "3rdParty") this.modules.external.push(module);
			return this;
		}
		setResolvedLanguage(l) {
			if (!l || !this.languages) return;
			if (["cimode", "dev"].indexOf(l) > -1) return;
			for (let li = 0; li < this.languages.length; li++) {
				const lngInLngs = this.languages[li];
				if (["cimode", "dev"].indexOf(lngInLngs) > -1) continue;
				if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
					this.resolvedLanguage = lngInLngs;
					break;
				}
			}
			if (!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l)) {
				this.resolvedLanguage = l;
				this.languages.unshift(l);
			}
		}
		changeLanguage(lng, callback) {
			this.isLanguageChangingTo = lng;
			const deferred = defer();
			this.emit("languageChanging", lng);
			const setLngProps = (l) => {
				this.language = l;
				this.languages = this.services.languageUtils.toResolveHierarchy(l);
				this.resolvedLanguage = void 0;
				this.setResolvedLanguage(l);
			};
			const done = (err, l) => {
				if (l) {
					if (this.isLanguageChangingTo === lng) {
						setLngProps(l);
						this.translator.changeLanguage(l);
						this.isLanguageChangingTo = void 0;
						this.emit("languageChanged", l);
						this.logger.log("languageChanged", l);
					}
				} else this.isLanguageChangingTo = void 0;
				deferred.resolve((...args) => this.t(...args));
				if (callback) callback(err, (...args) => this.t(...args));
			};
			const setLng = (lngs) => {
				if (!lng && !lngs && this.services.languageDetector) lngs = [];
				const fl = isString(lngs) ? lngs : lngs && lngs[0];
				const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
				if (l) {
					if (!this.language) setLngProps(l);
					if (!this.translator.language) this.translator.changeLanguage(l);
					this.services.languageDetector?.cacheUserLanguage?.(l);
				}
				this.loadResources(l, (err) => {
					done(err, l);
				});
			};
			if (!lng && this.services.languageDetector && !this.services.languageDetector.async) setLng(this.services.languageDetector.detect());
			else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
				if (this.services.languageDetector.detect.length === 0) this.services.languageDetector.detect().then(setLng);
				else this.services.languageDetector.detect(setLng);
			} else setLng(lng);
			return deferred;
		}
		getFixedT(lng, ns, keyPrefix) {
			const fixedT = (key, opts, ...rest) => {
				let o;
				if (typeof opts !== "object") o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
				else o = { ...opts };
				o.lng = o.lng || fixedT.lng;
				o.lngs = o.lngs || fixedT.lngs;
				o.ns = o.ns || fixedT.ns;
				if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
				const selectorOpts = {
					...this.options,
					...o
				};
				if (typeof o.keyPrefix === "function") o.keyPrefix = keysFromSelector(o.keyPrefix, selectorOpts);
				const keySeparator = this.options.keySeparator || ".";
				let resultKey;
				if (o.keyPrefix && Array.isArray(key)) resultKey = key.map((k) => {
					if (typeof k === "function") k = keysFromSelector(k, selectorOpts);
					return `${o.keyPrefix}${keySeparator}${k}`;
				});
				else {
					if (typeof key === "function") key = keysFromSelector(key, selectorOpts);
					resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
				}
				return this.t(resultKey, o);
			};
			if (isString(lng)) fixedT.lng = lng;
			else fixedT.lngs = lng;
			fixedT.ns = ns;
			fixedT.keyPrefix = keyPrefix;
			return fixedT;
		}
		t(...args) {
			return this.translator?.translate(...args);
		}
		exists(...args) {
			return this.translator?.exists(...args);
		}
		setDefaultNamespace(ns) {
			this.options.defaultNS = ns;
		}
		hasLoadedNamespace(ns, options = {}) {
			if (!this.isInitialized) {
				this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
				return false;
			}
			if (!this.languages || !this.languages.length) {
				this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
				return false;
			}
			const lng = options.lng || this.resolvedLanguage || this.languages[0];
			const fallbackLng = this.options ? this.options.fallbackLng : false;
			const lastLng = this.languages[this.languages.length - 1];
			if (lng.toLowerCase() === "cimode") return true;
			const loadNotPending = (l, n) => {
				const loadState = this.services.backendConnector.state[`${l}|${n}`];
				return loadState === -1 || loadState === 0 || loadState === 2;
			};
			if (options.precheck) {
				const preResult = options.precheck(this, loadNotPending);
				if (preResult !== void 0) return preResult;
			}
			if (this.hasResourceBundle(lng, ns)) return true;
			if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
			if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
			return false;
		}
		loadNamespaces(ns, callback) {
			const deferred = defer();
			if (!this.options.ns) {
				if (callback) callback();
				return Promise.resolve();
			}
			if (isString(ns)) ns = [ns];
			ns.forEach((n) => {
				if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
			});
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		loadLanguages(lngs, callback) {
			const deferred = defer();
			if (isString(lngs)) lngs = [lngs];
			const preloaded = this.options.preload || [];
			const newLngs = lngs.filter((lng) => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
			if (!newLngs.length) {
				if (callback) callback();
				return Promise.resolve();
			}
			this.options.preload = preloaded.concat(newLngs);
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		dir(lng) {
			if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
			if (!lng) return "rtl";
			try {
				const l = new Intl.Locale(lng);
				if (l && l.getTextInfo) {
					const ti = l.getTextInfo();
					if (ti && ti.direction) return ti.direction;
				}
			} catch (e) {}
			const rtlLngs = [
				"ar",
				"shu",
				"sqr",
				"ssh",
				"xaa",
				"yhd",
				"yud",
				"aao",
				"abh",
				"abv",
				"acm",
				"acq",
				"acw",
				"acx",
				"acy",
				"adf",
				"ads",
				"aeb",
				"aec",
				"afb",
				"ajp",
				"apc",
				"apd",
				"arb",
				"arq",
				"ars",
				"ary",
				"arz",
				"auz",
				"avl",
				"ayh",
				"ayl",
				"ayn",
				"ayp",
				"bbz",
				"pga",
				"he",
				"iw",
				"ps",
				"pbt",
				"pbu",
				"pst",
				"prp",
				"prd",
				"ug",
				"ur",
				"ydd",
				"yds",
				"yih",
				"ji",
				"yi",
				"hbo",
				"men",
				"xmn",
				"fa",
				"jpr",
				"peo",
				"pes",
				"prs",
				"dv",
				"sam",
				"ckb"
			];
			const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
			if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
			return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
		}
		static createInstance(options = {}, callback) {
			const instance = new I18n(options, callback);
			instance.createInstance = I18n.createInstance;
			return instance;
		}
		cloneInstance(options = {}, callback = noop) {
			const forkResourceStore = options.forkResourceStore;
			if (forkResourceStore) delete options.forkResourceStore;
			const mergedOptions = {
				...this.options,
				...options,
				isClone: true
			};
			const clone = new I18n(mergedOptions);
			if (options.debug !== void 0 || options.prefix !== void 0) clone.logger = clone.logger.clone(options);
			[
				"store",
				"services",
				"language"
			].forEach((m) => {
				clone[m] = this[m];
			});
			clone.services = { ...this.services };
			clone.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			if (forkResourceStore) {
				const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
					prev[l] = { ...this.store.data[l] };
					prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
						acc[n] = { ...prev[l][n] };
						return acc;
					}, prev[l]);
					return prev;
				}, {});
				clone.store = new ResourceStore(clonedData, mergedOptions);
				clone.services.resourceStore = clone.store;
			}
			if (options.interpolation) {
				const mergedInterpolation = {
					...get().interpolation,
					...this.options.interpolation,
					...options.interpolation
				};
				const mergedForInterpolator = {
					...mergedOptions,
					interpolation: mergedInterpolation
				};
				clone.services.interpolator = new Interpolator(mergedForInterpolator);
			}
			clone.translator = new Translator(clone.services, mergedOptions);
			clone.translator.on("*", (event, ...args) => {
				clone.emit(event, ...args);
			});
			clone.init(mergedOptions, callback);
			clone.translator.options = mergedOptions;
			clone.translator.backendConnector.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			return clone;
		}
		toJSON() {
			return {
				options: this.options,
				store: this.store,
				language: this.language,
				languages: this.languages,
				resolvedLanguage: this.resolvedLanguage
			};
		}
	};
	instance = I18n.createInstance();
	instance.createInstance;
	instance.dir;
	instance.init;
	instance.loadResources;
	instance.reloadResources;
	instance.use;
	instance.changeLanguage;
	instance.getFixedT;
	instance.t;
	instance.exists;
	instance.setDefaultNamespace;
	instance.hasLoadedNamespace;
	instance.loadNamespaces;
	instance.loadLanguages;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseFor.js
var require__createBaseFor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Creates a base function for methods like `_.forIn` and `_.forOwn`.
	*
	* @private
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {Function} Returns the new base function.
	*/
	function createBaseFor(fromRight) {
		return function(object, iteratee, keysFunc) {
			var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
			while (length--) {
				var key = props[fromRight ? length : ++index];
				if (iteratee(iterable[key], key, iterable) === false) break;
			}
			return object;
		};
	}
	module.exports = createBaseFor;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFor.js
var require__baseFor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__createBaseFor()();
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTimes.js
var require__baseTimes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* The base implementation of `_.times` without support for iteratee shorthands
	* or max array length checks.
	*
	* @private
	* @param {number} n The number of times to invoke `iteratee`.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the array of results.
	*/
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	module.exports = baseTimes;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js
var require__freeGlobal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js
var require__root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var freeGlobal = require__freeGlobal();
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	module.exports = freeGlobal || freeSelf || Function("return this")();
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js
var require__Symbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__root().Symbol;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js
var require__getRawTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var nativeObjectToString = objectProto.toString;
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
	/**
	* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the raw `toStringTag`.
	*/
	function getRawTag(value) {
		var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
		try {
			value[symToStringTag] = void 0;
			var unmasked = true;
		} catch (e) {}
		var result = nativeObjectToString.call(value);
		if (unmasked) {
			if (isOwn) value[symToStringTag] = tag;
			else delete value[symToStringTag];
		}
		return result;
	}
	module.exports = getRawTag;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js
var require__objectToString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var nativeObjectToString = Object.prototype.toString;
	/**
	* Converts `value` to a string using `Object.prototype.toString`.
	*
	* @private
	* @param {*} value The value to convert.
	* @returns {string} Returns the converted string.
	*/
	function objectToString(value) {
		return nativeObjectToString.call(value);
	}
	module.exports = objectToString;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js
var require__baseGetTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	var getRawTag = require__getRawTag();
	var objectToString = require__objectToString();
	/** `Object#toString` result references. */
	var nullTag = "[object Null]";
	var undefinedTag = "[object Undefined]";
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
	/**
	* The base implementation of `getTag` without fallbacks for buggy environments.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	function baseGetTag(value) {
		if (value == null) return value === void 0 ? undefinedTag : nullTag;
		return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}
	module.exports = baseGetTag;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js
var require_isObjectLike = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return value != null && typeof value == "object";
	}
	module.exports = isObjectLike;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js
var require__baseIsArguments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	/**
	* The base implementation of `_.isArguments`.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*/
	function baseIsArguments(value) {
		return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	module.exports = baseIsArguments;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js
var require_isArguments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseIsArguments = require__baseIsArguments();
	var isObjectLike = require_isObjectLike();
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	module.exports = baseIsArguments(function() {
		return arguments;
	}()) ? baseIsArguments : function(value) {
		return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js
var require_isArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Array.isArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubFalse.js
var require_stubFalse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This method returns `false`.
	*
	* @static
	* @memberOf _
	* @since 4.13.0
	* @category Util
	* @returns {boolean} Returns `false`.
	* @example
	*
	* _.times(2, _.stubFalse);
	* // => [false, false]
	*/
	function stubFalse() {
		return false;
	}
	module.exports = stubFalse;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isBuffer.js
var require_isBuffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var root = require__root();
	var stubFalse = require_stubFalse();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Built-in value references. */
	var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0;
	module.exports = (Buffer ? Buffer.isBuffer : void 0) || stubFalse;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js
var require__isIndex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	* Checks if `value` is a valid array-like index.
	*
	* @private
	* @param {*} value The value to check.
	* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	*/
	function isIndex(value, length) {
		var type = typeof value;
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	module.exports = isIndex;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js
var require_isLength = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	module.exports = isLength;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsTypedArray.js
var require__baseIsTypedArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var isLength = require_isLength();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var arrayTag = "[object Array]";
	var boolTag = "[object Boolean]";
	var dateTag = "[object Date]";
	var errorTag = "[object Error]";
	var funcTag = "[object Function]";
	var mapTag = "[object Map]";
	var numberTag = "[object Number]";
	var objectTag = "[object Object]";
	var regexpTag = "[object RegExp]";
	var setTag = "[object Set]";
	var stringTag = "[object String]";
	var weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]";
	var dataViewTag = "[object DataView]";
	var float32Tag = "[object Float32Array]";
	var float64Tag = "[object Float64Array]";
	var int8Tag = "[object Int8Array]";
	var int16Tag = "[object Int16Array]";
	var int32Tag = "[object Int32Array]";
	var uint8Tag = "[object Uint8Array]";
	var uint8ClampedTag = "[object Uint8ClampedArray]";
	var uint16Tag = "[object Uint16Array]";
	var uint32Tag = "[object Uint32Array]";
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	/**
	* The base implementation of `_.isTypedArray` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	*/
	function baseIsTypedArray(value) {
		return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	module.exports = baseIsTypedArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseUnary.js
var require__baseUnary = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* The base implementation of `_.unary` without support for storing metadata.
	*
	* @private
	* @param {Function} func The function to cap arguments for.
	* @returns {Function} Returns the new capped function.
	*/
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	module.exports = baseUnary;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nodeUtil.js
var require__nodeUtil = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var freeGlobal = require__freeGlobal();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Detect free variable `process` from Node.js. */
	var freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process;
	module.exports = function() {
		try {
			var types = freeModule && freeModule.require && freeModule.require("util").types;
			if (types) return types;
			return freeProcess && freeProcess.binding && freeProcess.binding("util");
		} catch (e) {}
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isTypedArray.js
var require_isTypedArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseIsTypedArray = require__baseIsTypedArray();
	var baseUnary = require__baseUnary();
	var nodeUtil = require__nodeUtil();
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	module.exports = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayLikeKeys.js
var require__arrayLikeKeys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseTimes = require__baseTimes();
	var isArguments = require_isArguments();
	var isArray = require_isArray();
	var isBuffer = require_isBuffer();
	var isIndex = require__isIndex();
	var isTypedArray = require_isTypedArray();
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* Creates an array of the enumerable property names of the array-like `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @param {boolean} inherited Specify returning inherited property names.
	* @returns {Array} Returns the array of property names.
	*/
	function arrayLikeKeys(value, inherited) {
		var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
		for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
		return result;
	}
	module.exports = arrayLikeKeys;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isPrototype.js
var require__isPrototype = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/**
	* Checks if `value` is likely a prototype object.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	*/
	function isPrototype(value) {
		var Ctor = value && value.constructor;
		return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
	}
	module.exports = isPrototype;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overArg.js
var require__overArg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Creates a unary function that invokes `func` with its argument transformed.
	*
	* @private
	* @param {Function} func The function to wrap.
	* @param {Function} transform The argument transform.
	* @returns {Function} Returns the new function.
	*/
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg));
		};
	}
	module.exports = overArg;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeys.js
var require__nativeKeys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__overArg()(Object.keys, Object);
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeys.js
var require__baseKeys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isPrototype = require__isPrototype();
	var nativeKeys = require__nativeKeys();
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeys(object) {
		if (!isPrototype(object)) return nativeKeys(object);
		var result = [];
		for (var key in Object(object)) if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
		return result;
	}
	module.exports = baseKeys;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js
var require_isObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return value != null && (type == "object" || type == "function");
	}
	module.exports = isObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js
var require_isFunction = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var isObject = require_isObject();
	/** `Object#toString` result references. */
	var asyncTag = "[object AsyncFunction]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	var proxyTag = "[object Proxy]";
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		if (!isObject(value)) return false;
		var tag = baseGetTag(value);
		return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	module.exports = isFunction;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLike.js
var require_isArrayLike = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isFunction = require_isFunction();
	var isLength = require_isLength();
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	module.exports = isArrayLike;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keys.js
var require_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeKeys = require__arrayLikeKeys();
	var baseKeys = require__baseKeys();
	var isArrayLike = require_isArrayLike();
	/**
	* Creates an array of the own enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects. See the
	* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* for more details.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keys(new Foo);
	* // => ['a', 'b'] (iteration order is not guaranteed)
	*
	* _.keys('hi');
	* // => ['0', '1']
	*/
	function keys(object) {
		return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	module.exports = keys;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js
var require_identity = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This method returns the first argument it receives.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Util
	* @param {*} value Any value.
	* @returns {*} Returns `value`.
	* @example
	*
	* var object = { 'a': 1 };
	*
	* console.log(_.identity(object) === object);
	* // => true
	*/
	function identity(value) {
		return value;
	}
	module.exports = identity;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_trimmedEndIndex.js
var require__trimmedEndIndex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to match a single whitespace character. */
	var reWhitespace = /\s/;
	/**
	* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	* character of `string`.
	*
	* @private
	* @param {string} string The string to inspect.
	* @returns {number} Returns the index of the last non-whitespace character.
	*/
	function trimmedEndIndex(string) {
		var index = string.length;
		while (index-- && reWhitespace.test(string.charAt(index)));
		return index;
	}
	module.exports = trimmedEndIndex;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTrim.js
var require__baseTrim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var trimmedEndIndex = require__trimmedEndIndex();
	/** Used to match leading whitespace. */
	var reTrimStart = /^\s+/;
	/**
	* The base implementation of `_.trim`.
	*
	* @private
	* @param {string} string The string to trim.
	* @returns {string} Returns the trimmed string.
	*/
	function baseTrim(string) {
		return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
	}
	module.exports = baseTrim;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js
var require_isSymbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var symbolTag = "[object Symbol]";
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
	}
	module.exports = isSymbol;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toNumber.js
var require_toNumber = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseTrim = require__baseTrim();
	var isObject = require_isObject();
	var isSymbol = require_isSymbol();
	/** Used as references for various `Number` constants. */
	var NAN = NaN;
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	/**
	* Converts `value` to a number.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {number} Returns the number.
	* @example
	*
	* _.toNumber(3.2);
	* // => 3.2
	*
	* _.toNumber(Number.MIN_VALUE);
	* // => 5e-324
	*
	* _.toNumber(Infinity);
	* // => Infinity
	*
	* _.toNumber('3.2');
	* // => 3.2
	*/
	function toNumber(value) {
		if (typeof value == "number") return value;
		if (isSymbol(value)) return NAN;
		if (isObject(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject(other) ? other + "" : other;
		}
		if (typeof value != "string") return value === 0 ? value : +value;
		value = baseTrim(value);
		var isBinary = reIsBinary.test(value);
		return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	module.exports = toNumber;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js
var require__coreJsData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__root()["__core-js_shared__"];
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js
var require__isMasked = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var coreJsData = require__coreJsData();
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	module.exports = isMasked;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js
var require__toSource = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to convert.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	module.exports = toSource;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js
var require__baseIsNative = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isFunction = require_isFunction();
	var isMasked = require__isMasked();
	var isObject = require_isObject();
	var toSource = require__toSource();
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	var objectProto = Object.prototype;
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	module.exports = baseIsNative;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js
var require__getValue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	module.exports = getValue;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js
var require__getNative = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseIsNative = require__baseIsNative();
	var getValue = require__getValue();
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	module.exports = getNative;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js
var require__defineProperty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getNative = require__getNative();
	module.exports = function() {
		try {
			var func = getNative(Object, "defineProperty");
			func({}, "", {});
			return func;
		} catch (e) {}
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js
var require__baseAssignValue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defineProperty = require__defineProperty();
	/**
	* The base implementation of `assignValue` and `assignMergeValue` without
	* value checks.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {string} key The key of the property to assign.
	* @param {*} value The value to assign.
	*/
	function baseAssignValue(object, key, value) {
		if (key == "__proto__" && defineProperty) defineProperty(object, key, {
			"configurable": true,
			"enumerable": true,
			"value": value,
			"writable": true
		});
		else object[key] = value;
	}
	module.exports = baseAssignValue;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js
var require_eq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	module.exports = eq;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assignValue.js
var require__assignValue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseAssignValue = require__baseAssignValue();
	var eq = require_eq();
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* Assigns `value` to `key` of `object` if the existing value is not equivalent
	* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {string} key The key of the property to assign.
	* @param {*} value The value to assign.
	*/
	function assignValue(object, key, value) {
		var objValue = object[key];
		if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
	}
	module.exports = assignValue;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_copyObject.js
var require__copyObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assignValue = require__assignValue();
	var baseAssignValue = require__baseAssignValue();
	/**
	* Copies properties of `source` to `object`.
	*
	* @private
	* @param {Object} source The object to copy properties from.
	* @param {Array} props The property identifiers to copy.
	* @param {Object} [object={}] The object to copy properties to.
	* @param {Function} [customizer] The function to customize copied values.
	* @returns {Object} Returns `object`.
	*/
	function copyObject(source, props, object, customizer) {
		var isNew = !object;
		object || (object = {});
		var index = -1, length = props.length;
		while (++index < length) {
			var key = props[index];
			var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
			if (newValue === void 0) newValue = source[key];
			if (isNew) baseAssignValue(object, key, newValue);
			else assignValue(object, key, newValue);
		}
		return object;
	}
	module.exports = copyObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_apply.js
var require__apply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
	module.exports = apply;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overRest.js
var require__overRest = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var apply = require__apply();
	var nativeMax = Math.max;
	/**
	* A specialized version of `baseRest` which transforms the rest array.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @param {Function} transform The rest array transform.
	* @returns {Function} Returns the new function.
	*/
	function overRest(func, start, transform) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = transform(array);
			return apply(func, this, otherArgs);
		};
	}
	module.exports = overRest;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/constant.js
var require_constant = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Creates a function that returns `value`.
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Util
	* @param {*} value The value to return from the new function.
	* @returns {Function} Returns the new constant function.
	* @example
	*
	* var objects = _.times(2, _.constant({ 'a': 1 }));
	*
	* console.log(objects);
	* // => [{ 'a': 1 }, { 'a': 1 }]
	*
	* console.log(objects[0] === objects[1]);
	* // => true
	*/
	function constant(value) {
		return function() {
			return value;
		};
	}
	module.exports = constant;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSetToString.js
var require__baseSetToString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constant = require_constant();
	var defineProperty = require__defineProperty();
	var identity = require_identity();
	module.exports = !defineProperty ? identity : function(func, string) {
		return defineProperty(func, "toString", {
			"configurable": true,
			"enumerable": false,
			"value": constant(string),
			"writable": true
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_shortOut.js
var require__shortOut = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800;
	var HOT_SPAN = 16;
	var nativeNow = Date.now;
	/**
	* Creates a function that'll short out and invoke `identity` instead
	* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	* milliseconds.
	*
	* @private
	* @param {Function} func The function to restrict.
	* @returns {Function} Returns the new shortable function.
	*/
	function shortOut(func) {
		var count = 0, lastCalled = 0;
		return function() {
			var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
			lastCalled = stamp;
			if (remaining > 0) {
				if (++count >= HOT_COUNT) return arguments[0];
			} else count = 0;
			return func.apply(void 0, arguments);
		};
	}
	module.exports = shortOut;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToString.js
var require__setToString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseSetToString = require__baseSetToString();
	module.exports = require__shortOut()(baseSetToString);
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseRest.js
var require__baseRest = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var identity = require_identity();
	var overRest = require__overRest();
	var setToString = require__setToString();
	/**
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		return setToString(overRest(func, start, identity), func + "");
	}
	module.exports = baseRest;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIterateeCall.js
var require__isIterateeCall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var eq = require_eq();
	var isArrayLike = require_isArrayLike();
	var isIndex = require__isIndex();
	var isObject = require_isObject();
	/**
	* Checks if the given arguments are from an iteratee call.
	*
	* @private
	* @param {*} value The potential iteratee value argument.
	* @param {*} index The potential iteratee index or key argument.
	* @param {*} object The potential iteratee object argument.
	* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	*  else `false`.
	*/
	function isIterateeCall(value, index, object) {
		if (!isObject(object)) return false;
		var type = typeof index;
		if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
		return false;
	}
	module.exports = isIterateeCall;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createAssigner.js
var require__createAssigner = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseRest = require__baseRest();
	var isIterateeCall = require__isIterateeCall();
	/**
	* Creates a function like `_.assign`.
	*
	* @private
	* @param {Function} assigner The function to assign values.
	* @returns {Function} Returns the new assigner function.
	*/
	function createAssigner(assigner) {
		return baseRest(function(object, sources) {
			var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
			customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
			if (guard && isIterateeCall(sources[0], sources[1], guard)) {
				customizer = length < 3 ? void 0 : customizer;
				length = 1;
			}
			object = Object(object);
			while (++index < length) {
				var source = sources[index];
				if (source) assigner(object, source, index, customizer);
			}
			return object;
		});
	}
	module.exports = createAssigner;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js
var require__isKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isArray = require_isArray();
	var isSymbol = require_isSymbol();
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
	var reIsPlainProp = /^\w*$/;
	/**
	* Checks if `value` is a property name and not a property path.
	*
	* @private
	* @param {*} value The value to check.
	* @param {Object} [object] The object to query keys on.
	* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	*/
	function isKey(value, object) {
		if (isArray(value)) return false;
		var type = typeof value;
		if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
		return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}
	module.exports = isKey;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js
var require__nativeCreate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(Object, "create");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js
var require__hashClear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var nativeCreate = require__nativeCreate();
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
		this.size = 0;
	}
	module.exports = hashClear;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js
var require__hashDelete = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		var result = this.has(key) && delete this.__data__[key];
		this.size -= result ? 1 : 0;
		return result;
	}
	module.exports = hashDelete;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js
var require__hashGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var nativeCreate = require__nativeCreate();
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	module.exports = hashGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js
var require__hashHas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var nativeCreate = require__nativeCreate();
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	module.exports = hashHas;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js
var require__hashSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var nativeCreate = require__nativeCreate();
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		this.size += this.has(key) ? 0 : 1;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	module.exports = hashSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js
var require__Hash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hashClear = require__hashClear();
	var hashDelete = require__hashDelete();
	var hashGet = require__hashGet();
	var hashHas = require__hashHas();
	var hashSet = require__hashSet();
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	module.exports = Hash;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js
var require__listCacheClear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
		this.size = 0;
	}
	module.exports = listCacheClear;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js
var require__assocIndexOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var eq = require_eq();
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	module.exports = assocIndexOf;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js
var require__listCacheDelete = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assocIndexOf = require__assocIndexOf();
	/** Built-in value references. */
	var splice = Array.prototype.splice;
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		--this.size;
		return true;
	}
	module.exports = listCacheDelete;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js
var require__listCacheGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assocIndexOf = require__assocIndexOf();
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	module.exports = listCacheGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js
var require__listCacheHas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assocIndexOf = require__assocIndexOf();
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	module.exports = listCacheHas;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js
var require__listCacheSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assocIndexOf = require__assocIndexOf();
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) {
			++this.size;
			data.push([key, value]);
		} else data[index][1] = value;
		return this;
	}
	module.exports = listCacheSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js
var require__ListCache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var listCacheClear = require__listCacheClear();
	var listCacheDelete = require__listCacheDelete();
	var listCacheGet = require__listCacheGet();
	var listCacheHas = require__listCacheHas();
	var listCacheSet = require__listCacheSet();
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	module.exports = ListCache;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js
var require__Map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(require__root(), "Map");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js
var require__mapCacheClear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Hash = require__Hash();
	var ListCache = require__ListCache();
	var Map = require__Map();
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.size = 0;
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	module.exports = mapCacheClear;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js
var require__isKeyable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	module.exports = isKeyable;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js
var require__getMapData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isKeyable = require__isKeyable();
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	module.exports = getMapData;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js
var require__mapCacheDelete = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getMapData = require__getMapData();
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		var result = getMapData(this, key)["delete"](key);
		this.size -= result ? 1 : 0;
		return result;
	}
	module.exports = mapCacheDelete;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js
var require__mapCacheGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getMapData = require__getMapData();
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	module.exports = mapCacheGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js
var require__mapCacheHas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getMapData = require__getMapData();
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	module.exports = mapCacheHas;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js
var require__mapCacheSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getMapData = require__getMapData();
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		var data = getMapData(this, key), size = data.size;
		data.set(key, value);
		this.size += data.size == size ? 0 : 1;
		return this;
	}
	module.exports = mapCacheSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js
var require__MapCache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var mapCacheClear = require__mapCacheClear();
	var mapCacheDelete = require__mapCacheDelete();
	var mapCacheGet = require__mapCacheGet();
	var mapCacheHas = require__mapCacheHas();
	var mapCacheSet = require__mapCacheSet();
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	module.exports = MapCache;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js
var require_memoize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var MapCache = require__MapCache();
	/** Error message constants. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/**
	* Creates a function that memoizes the result of `func`. If `resolver` is
	* provided, it determines the cache key for storing the result based on the
	* arguments provided to the memoized function. By default, the first argument
	* provided to the memoized function is used as the map cache key. The `func`
	* is invoked with the `this` binding of the memoized function.
	*
	* **Note:** The cache is exposed as the `cache` property on the memoized
	* function. Its creation may be customized by replacing the `_.memoize.Cache`
	* constructor with one whose instances implement the
	* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	* method interface of `clear`, `delete`, `get`, `has`, and `set`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to have its output memoized.
	* @param {Function} [resolver] The function to resolve the cache key.
	* @returns {Function} Returns the new memoized function.
	* @example
	*
	* var object = { 'a': 1, 'b': 2 };
	* var other = { 'c': 3, 'd': 4 };
	*
	* var values = _.memoize(_.values);
	* values(object);
	* // => [1, 2]
	*
	* values(other);
	* // => [3, 4]
	*
	* object.a = 2;
	* values(object);
	* // => [1, 2]
	*
	* // Modify the result cache.
	* values.cache.set(object, ['a', 'b']);
	* values(object);
	* // => ['a', 'b']
	*
	* // Replace `_.memoize.Cache`.
	* _.memoize.Cache = WeakMap;
	*/
	function memoize(func, resolver) {
		if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
		var memoized = function() {
			var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
			if (cache.has(key)) return cache.get(key);
			var result = func.apply(this, args);
			memoized.cache = cache.set(key, result) || cache;
			return result;
		};
		memoized.cache = new (memoize.Cache || MapCache)();
		return memoized;
	}
	memoize.Cache = MapCache;
	module.exports = memoize;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js
var require__memoizeCapped = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var memoize = require_memoize();
	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;
	/**
	* A specialized version of `_.memoize` which clears the memoized function's
	* cache when it exceeds `MAX_MEMOIZE_SIZE`.
	*
	* @private
	* @param {Function} func The function to have its output memoized.
	* @returns {Function} Returns the new memoized function.
	*/
	function memoizeCapped(func) {
		var result = memoize(func, function(key) {
			if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
			return key;
		});
		var cache = result.cache;
		return result;
	}
	module.exports = memoizeCapped;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js
var require__stringToPath = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var memoizeCapped = require__memoizeCapped();
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	module.exports = memoizeCapped(function(string) {
		var result = [];
		if (string.charCodeAt(0) === 46) result.push("");
		string.replace(rePropName, function(match, number, quote, subString) {
			result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js
var require__arrayMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* A specialized version of `_.map` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the new mapped array.
	*/
	function arrayMap(array, iteratee) {
		var index = -1, length = array == null ? 0 : array.length, result = Array(length);
		while (++index < length) result[index] = iteratee(array[index], index, array);
		return result;
	}
	module.exports = arrayMap;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js
var require__baseToString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	var arrayMap = require__arrayMap();
	var isArray = require_isArray();
	var isSymbol = require_isSymbol();
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0;
	var symbolToString = symbolProto ? symbolProto.toString : void 0;
	/**
	* The base implementation of `_.toString` which doesn't convert nullish
	* values to empty strings.
	*
	* @private
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	*/
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isArray(value)) return arrayMap(value, baseToString) + "";
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	module.exports = baseToString;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js
var require_toString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseToString = require__baseToString();
	/**
	* Converts `value` to a string. An empty string is returned for `null`
	* and `undefined` values. The sign of `-0` is preserved.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to convert.
	* @returns {string} Returns the converted string.
	* @example
	*
	* _.toString(null);
	* // => ''
	*
	* _.toString(-0);
	* // => '-0'
	*
	* _.toString([1, 2, 3]);
	* // => '1,2,3'
	*/
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	module.exports = toString;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js
var require__castPath = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isArray = require_isArray();
	var isKey = require__isKey();
	var stringToPath = require__stringToPath();
	var toString = require_toString();
	/**
	* Casts `value` to a path array if it's not one.
	*
	* @private
	* @param {*} value The value to inspect.
	* @param {Object} [object] The object to query keys on.
	* @returns {Array} Returns the cast property path array.
	*/
	function castPath(value, object) {
		if (isArray(value)) return value;
		return isKey(value, object) ? [value] : stringToPath(toString(value));
	}
	module.exports = castPath;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js
var require__toKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isSymbol = require_isSymbol();
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	/**
	* Converts `value` to a string key if it's not a string or symbol.
	*
	* @private
	* @param {*} value The value to inspect.
	* @returns {string|symbol} Returns the key.
	*/
	function toKey(value) {
		if (typeof value == "string" || isSymbol(value)) return value;
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	module.exports = toKey;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js
var require__arrayPush = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	module.exports = arrayPush;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/now.js
var require_now = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var root = require__root();
	/**
	* Gets the timestamp of the number of milliseconds that have elapsed since
	* the Unix epoch (1 January 1970 00:00:00 UTC).
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Date
	* @returns {number} Returns the timestamp.
	* @example
	*
	* _.defer(function(stamp) {
	*   console.log(_.now() - stamp);
	* }, _.now());
	* // => Logs the number of milliseconds it took for the deferred invocation.
	*/
	var now = function() {
		return root.Date.now();
	};
	module.exports = now;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/debounce.js
var require_debounce = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_isObject();
	var now = require_now();
	var toNumber = require_toNumber();
	/** Error message constants. */
	var FUNC_ERROR_TEXT = "Expected a function";
	var nativeMax = Math.max;
	var nativeMin = Math.min;
	/**
	* Creates a debounced function that delays invoking `func` until after `wait`
	* milliseconds have elapsed since the last time the debounced function was
	* invoked. The debounced function comes with a `cancel` method to cancel
	* delayed `func` invocations and a `flush` method to immediately invoke them.
	* Provide `options` to indicate whether `func` should be invoked on the
	* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	* with the last arguments provided to the debounced function. Subsequent
	* calls to the debounced function return the result of the last `func`
	* invocation.
	*
	* **Note:** If `leading` and `trailing` options are `true`, `func` is
	* invoked on the trailing edge of the timeout only if the debounced function
	* is invoked more than once during the `wait` timeout.
	*
	* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	* until to the next tick, similar to `setTimeout` with a timeout of `0`.
	*
	* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	* for details over the differences between `_.debounce` and `_.throttle`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to debounce.
	* @param {number} [wait=0] The number of milliseconds to delay.
	* @param {Object} [options={}] The options object.
	* @param {boolean} [options.leading=false]
	*  Specify invoking on the leading edge of the timeout.
	* @param {number} [options.maxWait]
	*  The maximum time `func` is allowed to be delayed before it's invoked.
	* @param {boolean} [options.trailing=true]
	*  Specify invoking on the trailing edge of the timeout.
	* @returns {Function} Returns the new debounced function.
	* @example
	*
	* // Avoid costly calculations while the window size is in flux.
	* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	*
	* // Invoke `sendMail` when clicked, debouncing subsequent calls.
	* jQuery(element).on('click', _.debounce(sendMail, 300, {
	*   'leading': true,
	*   'trailing': false
	* }));
	*
	* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	* var source = new EventSource('/stream');
	* jQuery(source).on('message', debounced);
	*
	* // Cancel the trailing debounced invocation.
	* jQuery(window).on('popstate', debounced.cancel);
	*/
	function debounce(func, wait, options) {
		var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = "maxWait" in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		function invokeFunc(time) {
			var args = lastArgs, thisArg = lastThis;
			lastArgs = lastThis = void 0;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}
		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}
		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
			return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
		}
		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
		}
		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) return trailingEdge(time);
			timerId = setTimeout(timerExpired, remainingWait(time));
		}
		function trailingEdge(time) {
			timerId = void 0;
			if (trailing && lastArgs) return invokeFunc(time);
			lastArgs = lastThis = void 0;
			return result;
		}
		function cancel() {
			if (timerId !== void 0) clearTimeout(timerId);
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = void 0;
		}
		function flush() {
			return timerId === void 0 ? result : trailingEdge(now());
		}
		function debounced() {
			var time = now(), isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === void 0) return leadingEdge(lastCallTime);
				if (maxing) {
					clearTimeout(timerId);
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}
	module.exports = debounce;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/throttle.js
var require_throttle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var debounce = require_debounce();
	var isObject = require_isObject();
	/** Error message constants. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/**
	* Creates a throttled function that only invokes `func` at most once per
	* every `wait` milliseconds. The throttled function comes with a `cancel`
	* method to cancel delayed `func` invocations and a `flush` method to
	* immediately invoke them. Provide `options` to indicate whether `func`
	* should be invoked on the leading and/or trailing edge of the `wait`
	* timeout. The `func` is invoked with the last arguments provided to the
	* throttled function. Subsequent calls to the throttled function return the
	* result of the last `func` invocation.
	*
	* **Note:** If `leading` and `trailing` options are `true`, `func` is
	* invoked on the trailing edge of the timeout only if the throttled function
	* is invoked more than once during the `wait` timeout.
	*
	* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	* until to the next tick, similar to `setTimeout` with a timeout of `0`.
	*
	* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	* for details over the differences between `_.throttle` and `_.debounce`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to throttle.
	* @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	* @param {Object} [options={}] The options object.
	* @param {boolean} [options.leading=true]
	*  Specify invoking on the leading edge of the timeout.
	* @param {boolean} [options.trailing=true]
	*  Specify invoking on the trailing edge of the timeout.
	* @returns {Function} Returns the new throttled function.
	* @example
	*
	* // Avoid excessively updating the position while scrolling.
	* jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	*
	* // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	* var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	* jQuery(element).on('click', throttled);
	*
	* // Cancel the trailing throttled invocation.
	* jQuery(window).on('popstate', throttled.cancel);
	*/
	function throttle(func, wait, options) {
		var leading = true, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		if (isObject(options)) {
			leading = "leading" in options ? !!options.leading : leading;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		return debounce(func, wait, {
			"leading": leading,
			"maxWait": wait,
			"trailing": trailing
		});
	}
	module.exports = throttle;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackClear.js
var require__stackClear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ListCache = require__ListCache();
	/**
	* Removes all key-value entries from the stack.
	*
	* @private
	* @name clear
	* @memberOf Stack
	*/
	function stackClear() {
		this.__data__ = new ListCache();
		this.size = 0;
	}
	module.exports = stackClear;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackDelete.js
var require__stackDelete = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Removes `key` and its value from the stack.
	*
	* @private
	* @name delete
	* @memberOf Stack
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function stackDelete(key) {
		var data = this.__data__, result = data["delete"](key);
		this.size = data.size;
		return result;
	}
	module.exports = stackDelete;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackGet.js
var require__stackGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Gets the stack value for `key`.
	*
	* @private
	* @name get
	* @memberOf Stack
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function stackGet(key) {
		return this.__data__.get(key);
	}
	module.exports = stackGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackHas.js
var require__stackHas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Checks if a stack value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Stack
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function stackHas(key) {
		return this.__data__.has(key);
	}
	module.exports = stackHas;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackSet.js
var require__stackSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ListCache = require__ListCache();
	var Map = require__Map();
	var MapCache = require__MapCache();
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	/**
	* Sets the stack `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Stack
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the stack cache instance.
	*/
	function stackSet(key, value) {
		var data = this.__data__;
		if (data instanceof ListCache) {
			var pairs = data.__data__;
			if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
				pairs.push([key, value]);
				this.size = ++data.size;
				return this;
			}
			data = this.__data__ = new MapCache(pairs);
		}
		data.set(key, value);
		this.size = data.size;
		return this;
	}
	module.exports = stackSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Stack.js
var require__Stack = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ListCache = require__ListCache();
	var stackClear = require__stackClear();
	var stackDelete = require__stackDelete();
	var stackGet = require__stackGet();
	var stackHas = require__stackHas();
	var stackSet = require__stackSet();
	/**
	* Creates a stack cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Stack(entries) {
		var data = this.__data__ = new ListCache(entries);
		this.size = data.size;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	module.exports = Stack;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Uint8Array.js
var require__Uint8Array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__root().Uint8Array;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetAllKeys.js
var require__baseGetAllKeys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayPush = require__arrayPush();
	var isArray = require_isArray();
	/**
	* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	* `keysFunc` and `symbolsFunc` to get the enumerable property names and
	* symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Function} keysFunc The function to get the keys of `object`.
	* @param {Function} symbolsFunc The function to get the symbols of `object`.
	* @returns {Array} Returns the array of property names and symbols.
	*/
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		var result = keysFunc(object);
		return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	module.exports = baseGetAllKeys;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayFilter.js
var require__arrayFilter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* A specialized version of `_.filter` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {Array} Returns the new filtered array.
	*/
	function arrayFilter(array, predicate) {
		var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) result[resIndex++] = value;
		}
		return result;
	}
	module.exports = arrayFilter;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubArray.js
var require_stubArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This method returns a new empty array.
	*
	* @static
	* @memberOf _
	* @since 4.13.0
	* @category Util
	* @returns {Array} Returns the new empty array.
	* @example
	*
	* var arrays = _.times(2, _.stubArray);
	*
	* console.log(arrays);
	* // => [[], []]
	*
	* console.log(arrays[0] === arrays[1]);
	* // => false
	*/
	function stubArray() {
		return [];
	}
	module.exports = stubArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbols.js
var require__getSymbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayFilter = require__arrayFilter();
	var stubArray = require_stubArray();
	/** Built-in value references. */
	var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	module.exports = !nativeGetSymbols ? stubArray : function(object) {
		if (object == null) return [];
		object = Object(object);
		return arrayFilter(nativeGetSymbols(object), function(symbol) {
			return propertyIsEnumerable.call(object, symbol);
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeys.js
var require__getAllKeys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetAllKeys = require__baseGetAllKeys();
	var getSymbols = require__getSymbols();
	var keys = require_keys();
	/**
	* Creates an array of own enumerable property names and symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names and symbols.
	*/
	function getAllKeys(object) {
		return baseGetAllKeys(object, keys, getSymbols);
	}
	module.exports = getAllKeys;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_DataView.js
var require__DataView = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(require__root(), "DataView");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Promise.js
var require__Promise = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(require__root(), "Promise");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Set.js
var require__Set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(require__root(), "Set");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_WeakMap.js
var require__WeakMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__getNative()(require__root(), "WeakMap");
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getTag.js
var require__getTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DataView = require__DataView();
	var Map = require__Map();
	var Promise = require__Promise();
	var Set = require__Set();
	var WeakMap = require__WeakMap();
	var baseGetTag = require__baseGetTag();
	var toSource = require__toSource();
	/** `Object#toString` result references. */
	var mapTag = "[object Map]";
	var objectTag = "[object Object]";
	var promiseTag = "[object Promise]";
	var setTag = "[object Set]";
	var weakMapTag = "[object WeakMap]";
	var dataViewTag = "[object DataView]";
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView);
	var mapCtorString = toSource(Map);
	var promiseCtorString = toSource(Promise);
	var setCtorString = toSource(Set);
	var weakMapCtorString = toSource(WeakMap);
	/**
	* Gets the `toStringTag` of `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	var getTag = baseGetTag;
	if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) getTag = function(value) {
		var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	module.exports = getTag;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSlice.js
var require__baseSlice = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* The base implementation of `_.slice` without an iteratee call guard.
	*
	* @private
	* @param {Array} array The array to slice.
	* @param {number} [start=0] The start position.
	* @param {number} [end=array.length] The end position.
	* @returns {Array} Returns the slice of `array`.
	*/
	function baseSlice(array, start, end) {
		var index = -1, length = array.length;
		if (start < 0) start = -start > length ? 0 : length + start;
		end = end > length ? length : end;
		if (end < 0) end += length;
		length = start > end ? 0 : end - start >>> 0;
		start >>>= 0;
		var result = Array(length);
		while (++index < length) result[index] = array[index + start];
		return result;
	}
	module.exports = baseSlice;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasUnicode.js
var require__hasUnicode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
	/**
	* Checks if `string` contains Unicode symbols.
	*
	* @private
	* @param {string} string The string to inspect.
	* @returns {boolean} Returns `true` if a symbol is found, else `false`.
	*/
	function hasUnicode(string) {
		return reHasUnicode.test(string);
	}
	module.exports = hasUnicode;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_asciiToArray.js
var require__asciiToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Converts an ASCII `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function asciiToArray(string) {
		return string.split("");
	}
	module.exports = asciiToArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_unicodeToArray.js
var require__unicodeToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to compose unicode character classes. */
	var rsAstralRange = "\\ud800-\\udfff";
	var rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
	var rsVarRange = "\\ufe0e\\ufe0f";
	/** Used to compose unicode capture groups. */
	var rsAstral = "[" + rsAstralRange + "]";
	var rsCombo = "[" + rsComboRange + "]";
	var rsFitz = "\\ud83c[\\udffb-\\udfff]";
	var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
	var rsNonAstral = "[^" + rsAstralRange + "]";
	var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
	var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
	var rsZWJ = "\\u200d";
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + "?";
	var rsOptVar = "[" + rsVarRange + "]?";
	var rsOptJoin = "(?:" + rsZWJ + "(?:" + [
		rsNonAstral,
		rsRegional,
		rsSurrPair
	].join("|") + ")" + rsOptVar + reOptMod + ")*";
	var rsSeq = rsOptVar + reOptMod + rsOptJoin;
	var rsSymbol = "(?:" + [
		rsNonAstral + rsCombo + "?",
		rsCombo,
		rsRegional,
		rsSurrPair,
		rsAstral
	].join("|") + ")";
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
	/**
	* Converts a Unicode `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function unicodeToArray(string) {
		return string.match(reUnicode) || [];
	}
	module.exports = unicodeToArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToArray.js
var require__stringToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiToArray = require__asciiToArray();
	var hasUnicode = require__hasUnicode();
	var unicodeToArray = require__unicodeToArray();
	/**
	* Converts `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function stringToArray(string) {
		return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
	}
	module.exports = stringToArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js
var require__baseGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var castPath = require__castPath();
	var toKey = require__toKey();
	/**
	* The base implementation of `_.get` without support for default values.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @returns {*} Returns the resolved value.
	*/
	function baseGet(object, path) {
		path = castPath(path, object);
		var index = 0, length = path.length;
		while (object != null && index < length) object = object[toKey(path[index++])];
		return index && index == length ? object : void 0;
	}
	module.exports = baseGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/get.js
var require_get = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGet = require__baseGet();
	/**
	* Gets the value at `path` of `object`. If the resolved value is
	* `undefined`, the `defaultValue` is returned in its place.
	*
	* @static
	* @memberOf _
	* @since 3.7.0
	* @category Object
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @param {*} [defaultValue] The value returned for `undefined` resolved values.
	* @returns {*} Returns the resolved value.
	* @example
	*
	* var object = { 'a': [{ 'b': { 'c': 3 } }] };
	*
	* _.get(object, 'a[0].b.c');
	* // => 3
	*
	* _.get(object, ['a', '0', 'b', 'c']);
	* // => 3
	*
	* _.get(object, 'a.b.c', 'default');
	* // => 'default'
	*/
	function get(object, path, defaultValue) {
		var result = object == null ? void 0 : baseGet(object, path);
		return result === void 0 ? defaultValue : result;
	}
	module.exports = get;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayEach.js
var require__arrayEach = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* A specialized version of `_.forEach` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns `array`.
	*/
	function arrayEach(array, iteratee) {
		var index = -1, length = array == null ? 0 : array.length;
		while (++index < length) if (iteratee(array[index], index, array) === false) break;
		return array;
	}
	module.exports = arrayEach;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssign.js
var require__baseAssign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject();
	var keys = require_keys();
	/**
	* The base implementation of `_.assign` without support for multiple sources
	* or `customizer` functions.
	*
	* @private
	* @param {Object} object The destination object.
	* @param {Object} source The source object.
	* @returns {Object} Returns `object`.
	*/
	function baseAssign(object, source) {
		return object && copyObject(source, keys(source), object);
	}
	module.exports = baseAssign;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeysIn.js
var require__nativeKeysIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This function is like
	* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* except that it includes inherited enumerable properties.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function nativeKeysIn(object) {
		var result = [];
		if (object != null) for (var key in Object(object)) result.push(key);
		return result;
	}
	module.exports = nativeKeysIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeysIn.js
var require__baseKeysIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_isObject();
	var isPrototype = require__isPrototype();
	var nativeKeysIn = require__nativeKeysIn();
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeysIn(object) {
		if (!isObject(object)) return nativeKeysIn(object);
		var isProto = isPrototype(object), result = [];
		for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
		return result;
	}
	module.exports = baseKeysIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keysIn.js
var require_keysIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeKeys = require__arrayLikeKeys();
	var baseKeysIn = require__baseKeysIn();
	var isArrayLike = require_isArrayLike();
	/**
	* Creates an array of the own and inherited enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keysIn(new Foo);
	* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	*/
	function keysIn(object) {
		return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	module.exports = keysIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignIn.js
var require__baseAssignIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject();
	var keysIn = require_keysIn();
	/**
	* The base implementation of `_.assignIn` without support for multiple sources
	* or `customizer` functions.
	*
	* @private
	* @param {Object} object The destination object.
	* @param {Object} source The source object.
	* @returns {Object} Returns `object`.
	*/
	function baseAssignIn(object, source) {
		return object && copyObject(source, keysIn(source), object);
	}
	module.exports = baseAssignIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneBuffer.js
var require__cloneBuffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var root = require__root();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Built-in value references. */
	var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0;
	var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
	/**
	* Creates a clone of  `buffer`.
	*
	* @private
	* @param {Buffer} buffer The buffer to clone.
	* @param {boolean} [isDeep] Specify a deep clone.
	* @returns {Buffer} Returns the cloned buffer.
	*/
	function cloneBuffer(buffer, isDeep) {
		if (isDeep) return buffer.slice();
		var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
		buffer.copy(result);
		return result;
	}
	module.exports = cloneBuffer;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_copyArray.js
var require__copyArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Copies the values of `source` to `array`.
	*
	* @private
	* @param {Array} source The array to copy values from.
	* @param {Array} [array=[]] The array to copy values to.
	* @returns {Array} Returns `array`.
	*/
	function copyArray(source, array) {
		var index = -1, length = source.length;
		array || (array = Array(length));
		while (++index < length) array[index] = source[index];
		return array;
	}
	module.exports = copyArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_copySymbols.js
var require__copySymbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject();
	var getSymbols = require__getSymbols();
	/**
	* Copies own symbols of `source` to `object`.
	*
	* @private
	* @param {Object} source The object to copy symbols from.
	* @param {Object} [object={}] The object to copy symbols to.
	* @returns {Object} Returns `object`.
	*/
	function copySymbols(source, object) {
		return copyObject(source, getSymbols(source), object);
	}
	module.exports = copySymbols;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getPrototype.js
var require__getPrototype = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__overArg()(Object.getPrototypeOf, Object);
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbolsIn.js
var require__getSymbolsIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayPush = require__arrayPush();
	var getPrototype = require__getPrototype();
	var getSymbols = require__getSymbols();
	var stubArray = require_stubArray();
	module.exports = !Object.getOwnPropertySymbols ? stubArray : function(object) {
		var result = [];
		while (object) {
			arrayPush(result, getSymbols(object));
			object = getPrototype(object);
		}
		return result;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_copySymbolsIn.js
var require__copySymbolsIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject();
	var getSymbolsIn = require__getSymbolsIn();
	/**
	* Copies own and inherited symbols of `source` to `object`.
	*
	* @private
	* @param {Object} source The object to copy symbols from.
	* @param {Object} [object={}] The object to copy symbols to.
	* @returns {Object} Returns `object`.
	*/
	function copySymbolsIn(source, object) {
		return copyObject(source, getSymbolsIn(source), object);
	}
	module.exports = copySymbolsIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeysIn.js
var require__getAllKeysIn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetAllKeys = require__baseGetAllKeys();
	var getSymbolsIn = require__getSymbolsIn();
	var keysIn = require_keysIn();
	/**
	* Creates an array of own and inherited enumerable property names and
	* symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names and symbols.
	*/
	function getAllKeysIn(object) {
		return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}
	module.exports = getAllKeysIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_initCloneArray.js
var require__initCloneArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to check objects for own properties. */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	* Initializes an array clone.
	*
	* @private
	* @param {Array} array The array to clone.
	* @returns {Array} Returns the initialized clone.
	*/
	function initCloneArray(array) {
		var length = array.length, result = new array.constructor(length);
		if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
			result.index = array.index;
			result.input = array.input;
		}
		return result;
	}
	module.exports = initCloneArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneArrayBuffer.js
var require__cloneArrayBuffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Uint8Array = require__Uint8Array();
	/**
	* Creates a clone of `arrayBuffer`.
	*
	* @private
	* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	* @returns {ArrayBuffer} Returns the cloned array buffer.
	*/
	function cloneArrayBuffer(arrayBuffer) {
		var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		return result;
	}
	module.exports = cloneArrayBuffer;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneDataView.js
var require__cloneDataView = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var cloneArrayBuffer = require__cloneArrayBuffer();
	/**
	* Creates a clone of `dataView`.
	*
	* @private
	* @param {Object} dataView The data view to clone.
	* @param {boolean} [isDeep] Specify a deep clone.
	* @returns {Object} Returns the cloned data view.
	*/
	function cloneDataView(dataView, isDeep) {
		var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}
	module.exports = cloneDataView;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneRegExp.js
var require__cloneRegExp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	/**
	* Creates a clone of `regexp`.
	*
	* @private
	* @param {Object} regexp The regexp to clone.
	* @returns {Object} Returns the cloned regexp.
	*/
	function cloneRegExp(regexp) {
		var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		result.lastIndex = regexp.lastIndex;
		return result;
	}
	module.exports = cloneRegExp;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneSymbol.js
var require__cloneSymbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0;
	var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
	/**
	* Creates a clone of the `symbol` object.
	*
	* @private
	* @param {Object} symbol The symbol object to clone.
	* @returns {Object} Returns the cloned symbol object.
	*/
	function cloneSymbol(symbol) {
		return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	module.exports = cloneSymbol;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cloneTypedArray.js
var require__cloneTypedArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var cloneArrayBuffer = require__cloneArrayBuffer();
	/**
	* Creates a clone of `typedArray`.
	*
	* @private
	* @param {Object} typedArray The typed array to clone.
	* @param {boolean} [isDeep] Specify a deep clone.
	* @returns {Object} Returns the cloned typed array.
	*/
	function cloneTypedArray(typedArray, isDeep) {
		var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	module.exports = cloneTypedArray;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_initCloneByTag.js
var require__initCloneByTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var cloneArrayBuffer = require__cloneArrayBuffer();
	var cloneDataView = require__cloneDataView();
	var cloneRegExp = require__cloneRegExp();
	var cloneSymbol = require__cloneSymbol();
	var cloneTypedArray = require__cloneTypedArray();
	/** `Object#toString` result references. */
	var boolTag = "[object Boolean]";
	var dateTag = "[object Date]";
	var mapTag = "[object Map]";
	var numberTag = "[object Number]";
	var regexpTag = "[object RegExp]";
	var setTag = "[object Set]";
	var stringTag = "[object String]";
	var symbolTag = "[object Symbol]";
	var arrayBufferTag = "[object ArrayBuffer]";
	var dataViewTag = "[object DataView]";
	var float32Tag = "[object Float32Array]";
	var float64Tag = "[object Float64Array]";
	var int8Tag = "[object Int8Array]";
	var int16Tag = "[object Int16Array]";
	var int32Tag = "[object Int32Array]";
	var uint8Tag = "[object Uint8Array]";
	var uint8ClampedTag = "[object Uint8ClampedArray]";
	var uint16Tag = "[object Uint16Array]";
	var uint32Tag = "[object Uint32Array]";
	/**
	* Initializes an object clone based on its `toStringTag`.
	*
	* **Note:** This function only supports cloning values with tags of
	* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	*
	* @private
	* @param {Object} object The object to clone.
	* @param {string} tag The `toStringTag` of the object to clone.
	* @param {boolean} [isDeep] Specify a deep clone.
	* @returns {Object} Returns the initialized clone.
	*/
	function initCloneByTag(object, tag, isDeep) {
		var Ctor = object.constructor;
		switch (tag) {
			case arrayBufferTag: return cloneArrayBuffer(object);
			case boolTag:
			case dateTag: return new Ctor(+object);
			case dataViewTag: return cloneDataView(object, isDeep);
			case float32Tag:
			case float64Tag:
			case int8Tag:
			case int16Tag:
			case int32Tag:
			case uint8Tag:
			case uint8ClampedTag:
			case uint16Tag:
			case uint32Tag: return cloneTypedArray(object, isDeep);
			case mapTag: return new Ctor();
			case numberTag:
			case stringTag: return new Ctor(object);
			case regexpTag: return cloneRegExp(object);
			case setTag: return new Ctor();
			case symbolTag: return cloneSymbol(object);
		}
	}
	module.exports = initCloneByTag;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseCreate.js
var require__baseCreate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_isObject();
	/** Built-in value references. */
	var objectCreate = Object.create;
	module.exports = function() {
		function object() {}
		return function(proto) {
			if (!isObject(proto)) return {};
			if (objectCreate) return objectCreate(proto);
			object.prototype = proto;
			var result = new object();
			object.prototype = void 0;
			return result;
		};
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_initCloneObject.js
var require__initCloneObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseCreate = require__baseCreate();
	var getPrototype = require__getPrototype();
	var isPrototype = require__isPrototype();
	/**
	* Initializes an object clone.
	*
	* @private
	* @param {Object} object The object to clone.
	* @returns {Object} Returns the initialized clone.
	*/
	function initCloneObject(object) {
		return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
	}
	module.exports = initCloneObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsMap.js
var require__baseIsMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getTag = require__getTag();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var mapTag = "[object Map]";
	/**
	* The base implementation of `_.isMap` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a map, else `false`.
	*/
	function baseIsMap(value) {
		return isObjectLike(value) && getTag(value) == mapTag;
	}
	module.exports = baseIsMap;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isMap.js
var require_isMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseIsMap = require__baseIsMap();
	var baseUnary = require__baseUnary();
	var nodeUtil = require__nodeUtil();
	var nodeIsMap = nodeUtil && nodeUtil.isMap;
	module.exports = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsSet.js
var require__baseIsSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getTag = require__getTag();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var setTag = "[object Set]";
	/**
	* The base implementation of `_.isSet` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a set, else `false`.
	*/
	function baseIsSet(value) {
		return isObjectLike(value) && getTag(value) == setTag;
	}
	module.exports = baseIsSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSet.js
var require_isSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseIsSet = require__baseIsSet();
	var baseUnary = require__baseUnary();
	var nodeUtil = require__nodeUtil();
	var nodeIsSet = nodeUtil && nodeUtil.isSet;
	module.exports = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseClone.js
var require__baseClone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stack = require__Stack();
	var arrayEach = require__arrayEach();
	var assignValue = require__assignValue();
	var baseAssign = require__baseAssign();
	var baseAssignIn = require__baseAssignIn();
	var cloneBuffer = require__cloneBuffer();
	var copyArray = require__copyArray();
	var copySymbols = require__copySymbols();
	var copySymbolsIn = require__copySymbolsIn();
	var getAllKeys = require__getAllKeys();
	var getAllKeysIn = require__getAllKeysIn();
	var getTag = require__getTag();
	var initCloneArray = require__initCloneArray();
	var initCloneByTag = require__initCloneByTag();
	var initCloneObject = require__initCloneObject();
	var isArray = require_isArray();
	var isBuffer = require_isBuffer();
	var isMap = require_isMap();
	var isObject = require_isObject();
	var isSet = require_isSet();
	var keys = require_keys();
	var keysIn = require_keysIn();
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;
	var CLONE_FLAT_FLAG = 2;
	var CLONE_SYMBOLS_FLAG = 4;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var arrayTag = "[object Array]";
	var boolTag = "[object Boolean]";
	var dateTag = "[object Date]";
	var errorTag = "[object Error]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	var mapTag = "[object Map]";
	var numberTag = "[object Number]";
	var objectTag = "[object Object]";
	var regexpTag = "[object RegExp]";
	var setTag = "[object Set]";
	var stringTag = "[object String]";
	var symbolTag = "[object Symbol]";
	var weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]";
	var dataViewTag = "[object DataView]";
	var float32Tag = "[object Float32Array]";
	var float64Tag = "[object Float64Array]";
	var int8Tag = "[object Int8Array]";
	var int16Tag = "[object Int16Array]";
	var int32Tag = "[object Int32Array]";
	var uint8Tag = "[object Uint8Array]";
	var uint8ClampedTag = "[object Uint8ClampedArray]";
	var uint16Tag = "[object Uint16Array]";
	var uint32Tag = "[object Uint32Array]";
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
	/**
	* The base implementation of `_.clone` and `_.cloneDeep` which tracks
	* traversed objects.
	*
	* @private
	* @param {*} value The value to clone.
	* @param {boolean} bitmask The bitmask flags.
	*  1 - Deep clone
	*  2 - Flatten inherited properties
	*  4 - Clone symbols
	* @param {Function} [customizer] The function to customize cloning.
	* @param {string} [key] The key of `value`.
	* @param {Object} [object] The parent object of `value`.
	* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	* @returns {*} Returns the cloned value.
	*/
	function baseClone(value, bitmask, customizer, key, object, stack) {
		var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
		if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
		if (result !== void 0) return result;
		if (!isObject(value)) return value;
		var isArr = isArray(value);
		if (isArr) {
			result = initCloneArray(value);
			if (!isDeep) return copyArray(value, result);
		} else {
			var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
			if (isBuffer(value)) return cloneBuffer(value, isDeep);
			if (tag == objectTag || tag == argsTag || isFunc && !object) {
				result = isFlat || isFunc ? {} : initCloneObject(value);
				if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
			} else {
				if (!cloneableTags[tag]) return object ? value : {};
				result = initCloneByTag(value, tag, isDeep);
			}
		}
		stack || (stack = new Stack());
		var stacked = stack.get(value);
		if (stacked) return stacked;
		stack.set(value, result);
		if (isSet(value)) value.forEach(function(subValue) {
			result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
		});
		else if (isMap(value)) value.forEach(function(subValue, key) {
			result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
		});
		var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
		arrayEach(props || value, function(subValue, key) {
			if (props) {
				key = subValue;
				subValue = value[key];
			}
			assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
		});
		return result;
	}
	module.exports = baseClone;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/cloneDeep.js
var require_cloneDeep = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseClone = require__baseClone();
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;
	var CLONE_SYMBOLS_FLAG = 4;
	/**
	* This method is like `_.clone` except that it recursively clones `value`.
	*
	* @static
	* @memberOf _
	* @since 1.0.0
	* @category Lang
	* @param {*} value The value to recursively clone.
	* @returns {*} Returns the deep cloned value.
	* @see _.clone
	* @example
	*
	* var objects = [{ 'a': 1 }, { 'b': 2 }];
	*
	* var deep = _.cloneDeep(objects);
	* console.log(deep[0] === objects[0]);
	* // => false
	*/
	function cloneDeep(value) {
		return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}
	module.exports = cloneDeep;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assignMergeValue.js
var require__assignMergeValue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseAssignValue = require__baseAssignValue();
	var eq = require_eq();
	/**
	* This function is like `assignValue` except that it doesn't assign
	* `undefined` values.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {string} key The key of the property to assign.
	* @param {*} value The value to assign.
	*/
	function assignMergeValue(object, key, value) {
		if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
	}
	module.exports = assignMergeValue;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLikeObject.js
var require_isArrayLikeObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isArrayLike = require_isArrayLike();
	var isObjectLike = require_isObjectLike();
	/**
	* This method is like `_.isArrayLike` except that it also checks if `value`
	* is an object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array-like object,
	*  else `false`.
	* @example
	*
	* _.isArrayLikeObject([1, 2, 3]);
	* // => true
	*
	* _.isArrayLikeObject(document.body.children);
	* // => true
	*
	* _.isArrayLikeObject('abc');
	* // => false
	*
	* _.isArrayLikeObject(_.noop);
	* // => false
	*/
	function isArrayLikeObject(value) {
		return isObjectLike(value) && isArrayLike(value);
	}
	module.exports = isArrayLikeObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isPlainObject.js
var require_isPlainObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var getPrototype = require__getPrototype();
	var isObjectLike = require_isObjectLike();
	/** `Object#toString` result references. */
	var objectTag = "[object Object]";
	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	var objectProto = Object.prototype;
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	/**
	* Checks if `value` is a plain object, that is, an object created by the
	* `Object` constructor or one with a `[[Prototype]]` of `null`.
	*
	* @static
	* @memberOf _
	* @since 0.8.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	* }
	*
	* _.isPlainObject(new Foo);
	* // => false
	*
	* _.isPlainObject([1, 2, 3]);
	* // => false
	*
	* _.isPlainObject({ 'x': 0, 'y': 0 });
	* // => true
	*
	* _.isPlainObject(Object.create(null));
	* // => true
	*/
	function isPlainObject(value) {
		if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
		var proto = getPrototype(value);
		if (proto === null) return true;
		var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
		return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}
	module.exports = isPlainObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_safeGet.js
var require__safeGet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Gets the value at `key`, unless `key` is "__proto__" or "constructor".
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function safeGet(object, key) {
		if (key === "constructor" && typeof object[key] === "function") return;
		if (key == "__proto__") return;
		return object[key];
	}
	module.exports = safeGet;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toPlainObject.js
var require_toPlainObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject();
	var keysIn = require_keysIn();
	/**
	* Converts `value` to a plain object flattening inherited enumerable string
	* keyed properties of `value` to own properties of the plain object.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Lang
	* @param {*} value The value to convert.
	* @returns {Object} Returns the converted plain object.
	* @example
	*
	* function Foo() {
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.assign({ 'a': 1 }, new Foo);
	* // => { 'a': 1, 'b': 2 }
	*
	* _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	* // => { 'a': 1, 'b': 2, 'c': 3 }
	*/
	function toPlainObject(value) {
		return copyObject(value, keysIn(value));
	}
	module.exports = toPlainObject;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMergeDeep.js
var require__baseMergeDeep = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assignMergeValue = require__assignMergeValue();
	var cloneBuffer = require__cloneBuffer();
	var cloneTypedArray = require__cloneTypedArray();
	var copyArray = require__copyArray();
	var initCloneObject = require__initCloneObject();
	var isArguments = require_isArguments();
	var isArray = require_isArray();
	var isArrayLikeObject = require_isArrayLikeObject();
	var isBuffer = require_isBuffer();
	var isFunction = require_isFunction();
	var isObject = require_isObject();
	var isPlainObject = require_isPlainObject();
	var isTypedArray = require_isTypedArray();
	var safeGet = require__safeGet();
	var toPlainObject = require_toPlainObject();
	/**
	* A specialized version of `baseMerge` for arrays and objects which performs
	* deep merges and tracks traversed objects enabling objects with circular
	* references to be merged.
	*
	* @private
	* @param {Object} object The destination object.
	* @param {Object} source The source object.
	* @param {string} key The key of the value to merge.
	* @param {number} srcIndex The index of `source`.
	* @param {Function} mergeFunc The function to merge values.
	* @param {Function} [customizer] The function to customize assigned values.
	* @param {Object} [stack] Tracks traversed source values and their merged
	*  counterparts.
	*/
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
		var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
		if (stacked) {
			assignMergeValue(object, key, stacked);
			return;
		}
		var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
		var isCommon = newValue === void 0;
		if (isCommon) {
			var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
			newValue = srcValue;
			if (isArr || isBuff || isTyped) {
				if (isArray(objValue)) newValue = objValue;
				else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
				else if (isBuff) {
					isCommon = false;
					newValue = cloneBuffer(srcValue, true);
				} else if (isTyped) {
					isCommon = false;
					newValue = cloneTypedArray(srcValue, true);
				} else newValue = [];
			} else if (isPlainObject(srcValue) || isArguments(srcValue)) {
				newValue = objValue;
				if (isArguments(objValue)) newValue = toPlainObject(objValue);
				else if (!isObject(objValue) || isFunction(objValue)) newValue = initCloneObject(srcValue);
			} else isCommon = false;
		}
		if (isCommon) {
			stack.set(srcValue, newValue);
			mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
			stack["delete"](srcValue);
		}
		assignMergeValue(object, key, newValue);
	}
	module.exports = baseMergeDeep;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMerge.js
var require__baseMerge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stack = require__Stack();
	var assignMergeValue = require__assignMergeValue();
	var baseFor = require__baseFor();
	var baseMergeDeep = require__baseMergeDeep();
	var isObject = require_isObject();
	var keysIn = require_keysIn();
	var safeGet = require__safeGet();
	/**
	* The base implementation of `_.merge` without support for multiple sources.
	*
	* @private
	* @param {Object} object The destination object.
	* @param {Object} source The source object.
	* @param {number} srcIndex The index of `source`.
	* @param {Function} [customizer] The function to customize merged values.
	* @param {Object} [stack] Tracks traversed source values and their merged
	*  counterparts.
	*/
	function baseMerge(object, source, srcIndex, customizer, stack) {
		if (object === source) return;
		baseFor(source, function(srcValue, key) {
			stack || (stack = new Stack());
			if (isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
			else {
				var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
				if (newValue === void 0) newValue = srcValue;
				assignMergeValue(object, key, newValue);
			}
		}, keysIn);
	}
	module.exports = baseMerge;
}));
//#endregion
//#region ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/merge.js
var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseMerge = require__baseMerge();
	module.exports = require__createAssigner()(function(object, source, srcIndex) {
		baseMerge(object, source, srcIndex);
	});
}));
//#endregion
export { init_i18next as $, require__setToString as A, require__baseKeys as B, require__arrayMap as C, require__createAssigner as D, require__isKey as E, require_toNumber as F, require__isIndex as G, require_isTypedArray as H, require_identity as I, require_isArguments as J, require_isBuffer as K, require_keys as L, require__copyObject as M, require__assignValue as N, require__isIterateeCall as O, require_eq as P, require__baseFor as Q, require_isArrayLike as R, require_toString as S, require__MapCache as T, require__baseUnary as U, require__isPrototype as V, require_isLength as W, require__baseGetTag as X, require_isObjectLike as Y, require__Symbol as Z, require_throttle as _, require__getAllKeysIn as a, require__toKey as b, require__baseGet as c, require__baseSlice as d, instance as et, require__getTag as f, require__Stack as g, require__Uint8Array as h, require_cloneDeep as i, require__overRest as j, require__baseRest as k, require__stringToArray as l, require__getAllKeys as m, require_isPlainObject as n, require__copyArray as o, require__Set as p, require_isArray as q, require_isArrayLikeObject as r, require_get as s, require_merge as t, require__hasUnicode as u, require_debounce as v, require_memoize as w, require__castPath as x, require__arrayPush as y, require_isObject as z };
