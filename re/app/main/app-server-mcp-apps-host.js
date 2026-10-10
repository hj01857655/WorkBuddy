const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_handlers = require("./handlers.js");
const require_server_side_access_token = require("./server-side-access-token.js");
let url = require("url");
let node_fs = require("node:fs");
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
let node_os = require("node:os");
let node_crypto = require("node:crypto");
let node_http = require("node:http");
node_http = require_rolldown_runtime.__toESM(node_http);
let crypto = require("crypto");
//#region ../../packages/workbuddy-core/src/conversations/node/worker-extension-conversation.ts
/** 结构化判断会话是否具备 daemon 内部 worker extension 调用能力。 */
function isWorkerExtensionConversation(value) {
	if (value === null || typeof value !== "object" && typeof value !== "function") return false;
	return typeof value.callWorkerExtension === "function";
}
//#endregion
//#region ../../packages/workbuddy-server/src/ardot/constants.ts
var ARDOT_CONNECTOR_NAME = "ardot";
var ARDOT_MCP_CONFIG_ID = "custom-mcp:ardot";
var ARDOT_AUTH_READY_TTL_MS = 6e4;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/core.js
/** A special constant with type `never` */
var NEVER = Object.freeze({ status: "aborted" });
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
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
var globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
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
var EVALUATING = Symbol("evaluating");
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
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
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
var propertyKeyTypes = /* @__PURE__ */ new Set([
	"string",
	"number",
	"symbol"
]);
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
var NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
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
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/errors.js
var initializer$1 = (inst, def) => {
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
var $ZodError = $constructor("$ZodError", initializer$1);
var $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
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
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
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
var parse$1 = /* @__PURE__*/ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
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
var parseAsync$1 = /* @__PURE__*/ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
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
var safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
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
var safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
var _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
var duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
var uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
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
var string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
var integer = /^-?\d+$/;
var number$1 = /^-?\d+(?:\.\d+)?$/;
var boolean$1 = /^(?:true|false)$/i;
var _null$2 = /^null$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/checks.js
var $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
var $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
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
var $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
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
var $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
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
var $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
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
var $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
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
var $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
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
var $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
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
var $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
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
var $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
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
var $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
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
var $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
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
var $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
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
var $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/doc.js
var Doc = class {
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
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/versions.js
var version = {
	major: 4,
	minor: 3,
	patch: 6
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/schemas.js
var $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
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
var $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
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
var $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
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
var $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
var $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
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
var $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
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
var $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
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
var $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
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
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
var $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
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
var $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
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
var $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
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
var $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
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
var $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
var $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
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
var $ZodNull = /*@__PURE__*/ $constructor("$ZodNull", (inst, def) => {
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
var $ZodAny = /*@__PURE__*/ $constructor("$ZodAny", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
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
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
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
var $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
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
var $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
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
var $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
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
var $ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
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
var $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
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
var $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
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
var $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
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
var $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
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
var $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
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
function handleOptionalResult(result, input) {
	if (result.issues.length && input === void 0) return {
		issues: [],
		value: void 0
	};
	return result;
}
var $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
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
var $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
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
var $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
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
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
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
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
var $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
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
var $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
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
var $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
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
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
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
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
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
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
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
function _coercedNumber(Class, params) {
	return new Class({
		type: "number",
		coerce: true,
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
function _any(Class) {
	return new Class({ type: "any" });
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
function process$1(schema, ctx, _params = {
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
			process$1(parent, ctx, params);
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
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
var stringProcessor = (schema, ctx, _json, _params) => {
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
var numberProcessor = (schema, ctx, _json, _params) => {
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
var booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
};
var nullProcessor = (_schema, ctx, json, _params) => {
	if (ctx.target === "openapi-3.0") {
		json.type = "string";
		json.nullable = true;
		json.enum = [null];
	} else json.type = "null";
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
};
var voidProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
};
var enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
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
var nanProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
	const _json = json;
	const pattern = schema._zod.pattern;
	if (!pattern) throw new Error("Pattern not found in template literal");
	_json.type = "string";
	_json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
	const _json = json;
	const file = {
		type: "string",
		format: "binary",
		contentEncoding: "binary"
	};
	const { minimum, maximum, mime } = schema._zod.bag;
	if (minimum !== void 0) file.minLength = minimum;
	if (maximum !== void 0) file.maxLength = maximum;
	if (mime) {
		if (mime.length === 1) {
			file.contentMediaType = mime[0];
			Object.assign(_json, file);
		} else {
			Object.assign(_json, file);
			_json.anyOf = mime.map((m) => ({ contentMediaType: m }));
		}
	} else Object.assign(_json, file);
};
var successProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
var functionProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Function types cannot be represented in JSON Schema");
};
var transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
var mapProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
};
var setProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process$1(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
var objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process$1(shape[key], ctx, {
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
	} else if (def.catchall) json.additionalProperties = process$1(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
var unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process$1(x, ctx, {
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
var intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process$1(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process$1(def.right, ctx, {
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
var tupleProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "array";
	const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
	const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
	const prefixItems = def.items.map((x, i) => process$1(x, ctx, {
		...params,
		path: [
			...params.path,
			prefixPath,
			i
		]
	}));
	const rest = def.rest ? process$1(def.rest, ctx, {
		...params,
		path: [
			...params.path,
			restPath,
			...ctx.target === "openapi-3.0" ? [def.items.length] : []
		]
	}) : null;
	if (ctx.target === "draft-2020-12") {
		json.prefixItems = prefixItems;
		if (rest) json.items = rest;
	} else if (ctx.target === "openapi-3.0") {
		json.items = { anyOf: prefixItems };
		if (rest) json.items.anyOf.push(rest);
		json.minItems = prefixItems.length;
		if (!rest) json.maxItems = prefixItems.length;
	} else {
		json.items = prefixItems;
		if (rest) json.additionalItems = rest;
	}
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = keyType._zod.bag?.patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = process$1(def.valueType, ctx, {
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
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process$1(def.keyType, ctx, {
			...params,
			path: [...params.path, "propertyNames"]
		});
		json.additionalProperties = process$1(def.valueType, ctx, {
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
var nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
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
var pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
	const innerType = schema._zod.innerType;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
var allProcessors = {
	string: stringProcessor,
	number: numberProcessor,
	boolean: booleanProcessor,
	bigint: bigintProcessor,
	symbol: symbolProcessor,
	null: nullProcessor,
	undefined: undefinedProcessor,
	void: voidProcessor,
	never: neverProcessor,
	any: anyProcessor,
	unknown: unknownProcessor,
	date: dateProcessor,
	enum: enumProcessor,
	literal: literalProcessor,
	nan: nanProcessor,
	template_literal: templateLiteralProcessor,
	file: fileProcessor,
	success: successProcessor,
	custom: customProcessor,
	function: functionProcessor,
	transform: transformProcessor,
	map: mapProcessor,
	set: setProcessor,
	array: arrayProcessor,
	object: objectProcessor,
	union: unionProcessor,
	intersection: intersectionProcessor,
	tuple: tupleProcessor,
	record: recordProcessor,
	nullable: nullableProcessor,
	nonoptional: nonoptionalProcessor,
	default: defaultProcessor,
	prefault: prefaultProcessor,
	catch: catchProcessor,
	pipe: pipeProcessor,
	readonly: readonlyProcessor,
	promise: promiseProcessor,
	optional: optionalProcessor,
	lazy: lazyProcessor
};
function toJSONSchema(input, params) {
	if ("_idmap" in input) {
		const registry = input;
		const ctx = initializeContext({
			...params,
			processors: allProcessors
		});
		const defs = {};
		for (const entry of registry._idmap.entries()) {
			const [_, schema] = entry;
			process$1(schema, ctx);
		}
		const schemas = {};
		ctx.external = {
			registry,
			uri: params?.uri,
			defs
		};
		for (const entry of registry._idmap.entries()) {
			const [key, schema] = entry;
			extractDefs(ctx, schema);
			schemas[key] = finalize(ctx, schema);
		}
		if (Object.keys(defs).length > 0) schemas.__shared = { [ctx.target === "draft-2020-12" ? "$defs" : "definitions"]: defs };
		return { schemas };
	}
	const ctx = initializeContext({
		...params,
		processors: allProcessors
	});
	process$1(input, ctx);
	extractDefs(ctx, input);
	return finalize(ctx, input);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/iso.js
var ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
var ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
var ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/errors.js
var initializer = (inst, issues) => {
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
var ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/parse.js
var parse = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/schemas.js
var ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
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
/** @internal */
var _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
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
var ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
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
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
var ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function url$1(params) {
	return /* @__PURE__ */ _url(ZodURL, params);
}
var ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
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
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
var ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
var ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
var ZodNull = /*@__PURE__*/ $constructor("ZodNull", (inst, def) => {
	$ZodNull.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null(params) {
	return /* @__PURE__ */ _null$1(ZodNull, params);
}
var ZodAny = /*@__PURE__*/ $constructor("ZodAny", (inst, def) => {
	$ZodAny.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function any() {
	return /* @__PURE__ */ _any(ZodAny);
}
var ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
var ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
var ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
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
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
var ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
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
function object(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: unknown(),
		...normalizeParams(params)
	});
}
var ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
var ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
var ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
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
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
var ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
var ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
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
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
var ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
var ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
var ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
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
//#endregion
//#region ../../node_modules/.pnpm/@modelcontextprotocol+sdk@1.29.0_supports-color@10.2.2/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
var LATEST_PROTOCOL_VERSION = "2025-11-25";
var DEFAULT_NEGOTIATED_PROTOCOL_VERSION = "2025-03-26";
var SUPPORTED_PROTOCOL_VERSIONS = [
	LATEST_PROTOCOL_VERSION,
	"2025-06-18",
	"2025-03-26",
	"2024-11-05",
	"2024-10-07"
];
var RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task";
/**
* Assert 'object' type schema.
*
* @internal
*/
var AssertObjectSchema = custom((v) => v !== null && (typeof v === "object" || typeof v === "function"));
/**
* A progress token, used to associate progress notifications with the original request.
*/
var ProgressTokenSchema = union([string(), number().int()]);
/**
* An opaque token used to represent a cursor for pagination.
*/
var CursorSchema = string();
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
var TaskMetadataSchema = object({ ttl: number().optional() });
/**
* Metadata for associating messages with a task.
* Include this in the `_meta` field under the key `io.modelcontextprotocol/related-task`.
*/
var RelatedTaskMetadataSchema = object({ taskId: string() });
var RequestMetaSchema = looseObject({
	/**
	* If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
	*/
	progressToken: ProgressTokenSchema.optional(),
	/**
	* If specified, this request is related to the provided task.
	*/
	[RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
});
/**
* Common params for any request.
*/
var BaseRequestParamsSchema = object({ 
/**
* See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
*/
_meta: RequestMetaSchema.optional() });
/**
* Common params for any task-augmented request.
*/
var TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({ 
/**
* If specified, the caller is requesting task-augmented execution for this request.
* The request will return a CreateTaskResult immediately, and the actual result can be
* retrieved later via tasks/result.
*
* Task augmentation is subject to capability negotiation - receivers MUST declare support
* for task augmentation of specific request types in their capabilities.
*/
task: TaskMetadataSchema.optional() });
/**
* Checks if a value is a valid TaskAugmentedRequestParams.
* @param value - The value to check.
*
* @returns True if the value is a valid TaskAugmentedRequestParams, false otherwise.
*/
var isTaskAugmentedRequestParams = (value) => TaskAugmentedRequestParamsSchema.safeParse(value).success;
var RequestSchema = object({
	method: string(),
	params: BaseRequestParamsSchema.loose().optional()
});
var NotificationsParamsSchema = object({ 
/**
* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
* for notes on _meta usage.
*/
_meta: RequestMetaSchema.optional() });
var NotificationSchema = object({
	method: string(),
	params: NotificationsParamsSchema.loose().optional()
});
var ResultSchema = looseObject({ 
/**
* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
* for notes on _meta usage.
*/
_meta: RequestMetaSchema.optional() });
/**
* A uniquely identifying ID for a request in JSON-RPC.
*/
var RequestIdSchema = union([string(), number().int()]);
/**
* A request that expects a response.
*/
var JSONRPCRequestSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	...RequestSchema.shape
}).strict();
var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
/**
* A notification which does not expect a response.
*/
var JSONRPCNotificationSchema = object({
	jsonrpc: literal("2.0"),
	...NotificationSchema.shape
}).strict();
var isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
/**
* A successful (non-error) response to a request.
*/
var JSONRPCResultResponseSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	result: ResultSchema
}).strict();
/**
* Checks if a value is a valid JSONRPCResultResponse.
* @param value - The value to check.
*
* @returns True if the value is a valid JSONRPCResultResponse, false otherwise.
*/
var isJSONRPCResultResponse = (value) => JSONRPCResultResponseSchema.safeParse(value).success;
/**
* Error codes defined by the JSON-RPC specification.
*/
var ErrorCode;
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
/**
* A response to a request that indicates an error occurred.
*/
var JSONRPCErrorResponseSchema = object({
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
/**
* Checks if a value is a valid JSONRPCErrorResponse.
* @param value - The value to check.
*
* @returns True if the value is a valid JSONRPCErrorResponse, false otherwise.
*/
var isJSONRPCErrorResponse = (value) => JSONRPCErrorResponseSchema.safeParse(value).success;
var JSONRPCMessageSchema = union([
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResultResponseSchema,
	JSONRPCErrorResponseSchema
]);
union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]);
/**
* A response that indicates success but carries no data.
*/
var EmptyResultSchema = ResultSchema.strict();
var CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
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
/**
* This notification can be sent by either side to indicate that it is cancelling a previously-issued request.
*
* The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
*
* This notification indicates that the result will be unused, so any associated processing SHOULD cease.
*
* A client MUST NOT attempt to cancel its `initialize` request.
*/
var CancelledNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/cancelled"),
	params: CancelledNotificationParamsSchema
});
/**
* Base schema to add `icons` property.
*
*/
var IconsSchema = object({ 
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
icons: array(object({
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
})).optional() });
/**
* Base metadata interface for common properties across resources, tools, prompts, and implementations.
*/
var BaseMetadataSchema = object({
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
/**
* Describes the name and version of an MCP implementation.
*/
var ImplementationSchema = BaseMetadataSchema.extend({
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
var ElicitationCapabilitySchema = preprocess((value) => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		if (Object.keys(value).length === 0) return { form: {} };
	}
	return value;
}, intersection(object({
	form: intersection(object({ applyDefaults: boolean().optional() }), record(string(), unknown())).optional(),
	url: AssertObjectSchema.optional()
}), record(string(), unknown()).optional()));
/**
* Task capabilities for clients, indicating which request types support task creation.
*/
var ClientTasksCapabilitySchema = looseObject({
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
/**
* Task capabilities for servers, indicating which request types support task creation.
*/
var ServerTasksCapabilitySchema = looseObject({
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
/**
* Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
*/
var ClientCapabilitiesSchema = object({
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
var InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
	/**
	* The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
	*/
	protocolVersion: string(),
	capabilities: ClientCapabilitiesSchema,
	clientInfo: ImplementationSchema
});
/**
* This request is sent from the client to the server when it first connects, asking it to begin initialization.
*/
var InitializeRequestSchema = RequestSchema.extend({
	method: literal("initialize"),
	params: InitializeRequestParamsSchema
});
var isInitializeRequest = (value) => InitializeRequestSchema.safeParse(value).success;
/**
* Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
*/
var ServerCapabilitiesSchema = object({
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
/**
* After receiving an initialize request from the client, the server sends this response.
*/
var InitializeResultSchema = ResultSchema.extend({
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
/**
* This notification is sent from the client to the server after initialization has finished.
*/
var InitializedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/initialized"),
	params: NotificationsParamsSchema.optional()
});
var isInitializedNotification = (value) => InitializedNotificationSchema.safeParse(value).success;
/**
* A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
*/
var PingRequestSchema = RequestSchema.extend({
	method: literal("ping"),
	params: BaseRequestParamsSchema.optional()
});
var ProgressSchema = object({
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
var ProgressNotificationParamsSchema = object({
	...NotificationsParamsSchema.shape,
	...ProgressSchema.shape,
	/**
	* The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
	*/
	progressToken: ProgressTokenSchema
});
/**
* An out-of-band notification used to inform the receiver of a progress update for a long-running request.
*
* @category notifications/progress
*/
var ProgressNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/progress"),
	params: ProgressNotificationParamsSchema
});
var PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({ 
/**
* An opaque token representing the current pagination position.
* If provided, the server should return results starting after this cursor.
*/
cursor: CursorSchema.optional() });
var PaginatedRequestSchema = RequestSchema.extend({ params: PaginatedRequestParamsSchema.optional() });
var PaginatedResultSchema = ResultSchema.extend({ 
/**
* An opaque token representing the pagination position after the last returned result.
* If present, there may be more results available.
*/
nextCursor: CursorSchema.optional() });
/**
* The status of a task.
* */
var TaskStatusSchema = _enum([
	"working",
	"input_required",
	"completed",
	"failed",
	"cancelled"
]);
/**
* A pollable state object associated with a request.
*/
var TaskSchema = object({
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
/**
* Result returned when a task is created, containing the task data wrapped in a task field.
*/
var CreateTaskResultSchema = ResultSchema.extend({ task: TaskSchema });
/**
* Parameters for task status notification.
*/
var TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema);
/**
* A notification sent when a task's status changes.
*/
var TaskStatusNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tasks/status"),
	params: TaskStatusNotificationParamsSchema
});
/**
* A request to get the state of a specific task.
*/
var GetTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/get"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
/**
* The response to a tasks/get request.
*/
var GetTaskResultSchema = ResultSchema.merge(TaskSchema);
/**
* A request to get the result of a specific task.
*/
var GetTaskPayloadRequestSchema = RequestSchema.extend({
	method: literal("tasks/result"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
ResultSchema.loose();
/**
* A request to list tasks.
*/
var ListTasksRequestSchema = PaginatedRequestSchema.extend({ method: literal("tasks/list") });
/**
* The response to a tasks/list request.
*/
var ListTasksResultSchema = PaginatedResultSchema.extend({ tasks: array(TaskSchema) });
/**
* A request to cancel a specific task.
*/
var CancelTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/cancel"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
/**
* The response to a tasks/cancel request.
*/
var CancelTaskResultSchema = ResultSchema.merge(TaskSchema);
/**
* The contents of a specific resource or sub-resource.
*/
var ResourceContentsSchema = object({
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
var TextResourceContentsSchema = ResourceContentsSchema.extend({ 
/**
* The text of the item. This must only be set if the item can actually be represented as text (not binary data).
*/
text: string() });
/**
* A Zod schema for validating Base64 strings that is more performant and
* robust for very large inputs than the default regex-based check. It avoids
* stack overflows by using the native `atob` function for validation.
*/
var Base64Schema = string().refine((val) => {
	try {
		atob(val);
		return true;
	} catch {
		return false;
	}
}, { message: "Invalid Base64 string" });
var BlobResourceContentsSchema = ResourceContentsSchema.extend({ 
/**
* A base64-encoded string representing the binary data of the item.
*/
blob: Base64Schema });
/**
* The sender or recipient of messages and data in a conversation.
*/
var RoleSchema = _enum(["user", "assistant"]);
/**
* Optional annotations providing clients additional context about a resource.
*/
var AnnotationsSchema = object({
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
/**
* A known resource that the server is capable of reading.
*/
var ResourceSchema = object({
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
/**
* A template description for resources available on the server.
*/
var ResourceTemplateSchema = object({
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
/**
* Sent from the client to request a list of resources the server has.
*/
var ListResourcesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/list") });
/**
* The server's response to a resources/list request from the client.
*/
var ListResourcesResultSchema = PaginatedResultSchema.extend({ resources: array(ResourceSchema) });
/**
* Sent from the client to request a list of resource templates the server has.
*/
var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/templates/list") });
/**
* The server's response to a resources/templates/list request from the client.
*/
var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({ resourceTemplates: array(ResourceTemplateSchema) });
var ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({ 
/**
* The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
*
* @format uri
*/
uri: string() });
/**
* Parameters for a `resources/read` request.
*/
var ReadResourceRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to the server, to read a specific resource URI.
*/
var ReadResourceRequestSchema = RequestSchema.extend({
	method: literal("resources/read"),
	params: ReadResourceRequestParamsSchema
});
/**
* The server's response to a resources/read request from the client.
*/
var ReadResourceResultSchema = ResultSchema.extend({ contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema])) });
/**
* An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
*/
var ResourceListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/list_changed"),
	params: NotificationsParamsSchema.optional()
});
var SubscribeRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.
*/
var SubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/subscribe"),
	params: SubscribeRequestParamsSchema
});
var UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.
*/
var UnsubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/unsubscribe"),
	params: UnsubscribeRequestParamsSchema
});
/**
* Parameters for a `notifications/resources/updated` notification.
*/
var ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({ 
/**
* The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
*/
uri: string() });
/**
* A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.
*/
var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/updated"),
	params: ResourceUpdatedNotificationParamsSchema
});
/**
* Describes an argument that a prompt can accept.
*/
var PromptArgumentSchema = object({
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
/**
* A prompt or prompt template that the server offers.
*/
var PromptSchema = object({
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
/**
* Sent from the client to request a list of prompts and prompt templates the server has.
*/
var ListPromptsRequestSchema = PaginatedRequestSchema.extend({ method: literal("prompts/list") });
/**
* The server's response to a prompts/list request from the client.
*/
var ListPromptsResultSchema = PaginatedResultSchema.extend({ prompts: array(PromptSchema) });
/**
* Parameters for a `prompts/get` request.
*/
var GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
	/**
	* The name of the prompt or prompt template.
	*/
	name: string(),
	/**
	* Arguments to use for templating the prompt.
	*/
	arguments: record(string(), string()).optional()
});
/**
* Used by the client to get a prompt provided by the server.
*/
var GetPromptRequestSchema = RequestSchema.extend({
	method: literal("prompts/get"),
	params: GetPromptRequestParamsSchema
});
/**
* Text provided to or from an LLM.
*/
var TextContentSchema = object({
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
/**
* An image provided to or from an LLM.
*/
var ImageContentSchema = object({
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
/**
* An Audio provided to or from an LLM.
*/
var AudioContentSchema = object({
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
/**
* A tool call request from an assistant (LLM).
* Represents the assistant's request to use a tool.
*/
var ToolUseContentSchema = object({
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
/**
* The contents of a resource, embedded into a prompt or tool call result.
*/
var EmbeddedResourceSchema = object({
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
/**
* A content block that can be used in prompts and tool results.
*/
var ContentBlockSchema = union([
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ResourceSchema.extend({ type: literal("resource_link") }),
	EmbeddedResourceSchema
]);
/**
* Describes a message returned as part of a prompt.
*/
var PromptMessageSchema = object({
	role: RoleSchema,
	content: ContentBlockSchema
});
/**
* The server's response to a prompts/get request from the client.
*/
var GetPromptResultSchema = ResultSchema.extend({
	/**
	* An optional description for the prompt.
	*/
	description: string().optional(),
	messages: array(PromptMessageSchema)
});
/**
* An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
*/
var PromptListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/prompts/list_changed"),
	params: NotificationsParamsSchema.optional()
});
/**
* Additional properties describing a Tool to clients.
*
* NOTE: all properties in ToolAnnotations are **hints**.
* They are not guaranteed to provide a faithful description of
* tool behavior (including descriptive properties like `title`).
*
* Clients should never make tool use decisions based on ToolAnnotations
* received from untrusted servers.
*/
var ToolAnnotationsSchema = object({
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
/**
* Execution-related properties for a tool.
*/
var ToolExecutionSchema = object({ 
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
/**
* Definition for a tool the client can call.
*/
var ToolSchema = object({
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
/**
* Sent from the client to request a list of tools the server has.
*/
var ListToolsRequestSchema = PaginatedRequestSchema.extend({ method: literal("tools/list") });
/**
* The server's response to a tools/list request from the client.
*/
var ListToolsResultSchema = PaginatedResultSchema.extend({ tools: array(ToolSchema) });
/**
* The server's response to a tool call.
*/
var CallToolResultSchema = ResultSchema.extend({
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
/**
* Parameters for a `tools/call` request.
*/
var CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	/**
	* The name of the tool to call.
	*/
	name: string(),
	/**
	* Arguments to pass to the tool.
	*/
	arguments: record(string(), unknown()).optional()
});
/**
* Used by the client to invoke a tool provided by the server.
*/
var CallToolRequestSchema = RequestSchema.extend({
	method: literal("tools/call"),
	params: CallToolRequestParamsSchema
});
/**
* An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
*/
var ToolListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tools/list_changed"),
	params: NotificationsParamsSchema.optional()
});
/**
* Base schema for list changed subscription options (without callback).
* Used internally for Zod validation of autoRefresh and debounceMs.
*/
var ListChangedOptionsBaseSchema = object({
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
/**
* The severity of a log message.
*/
var LoggingLevelSchema = _enum([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency"
]);
/**
* Parameters for a `logging/setLevel` request.
*/
var SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({ 
/**
* The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
*/
level: LoggingLevelSchema });
/**
* A request from the client to the server, to enable or adjust logging.
*/
var SetLevelRequestSchema = RequestSchema.extend({
	method: literal("logging/setLevel"),
	params: SetLevelRequestParamsSchema
});
/**
* Parameters for a `notifications/message` notification.
*/
var LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
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
/**
* Notification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.
*/
var LoggingMessageNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/message"),
	params: LoggingMessageNotificationParamsSchema
});
/**
* The server's preferences for model selection, requested of the client during sampling.
*/
var ModelPreferencesSchema = object({
	/**
	* Optional hints to use for model selection.
	*/
	hints: array(object({ 
	/**
	* A hint for a model name.
	*/
name: string().optional() })).optional(),
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
/**
* Controls tool usage behavior in sampling requests.
*/
var ToolChoiceSchema = object({ 
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
/**
* The result of a tool execution, provided by the user (server).
* Represents the outcome of invoking a tool requested via ToolUseContent.
*/
var ToolResultContentSchema = object({
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
/**
* Basic content types for sampling responses (without tool use).
* Used for backwards-compatible CreateMessageResult when tools are not used.
*/
var SamplingContentSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema
]);
/**
* Content block types allowed in sampling messages.
* This includes text, image, audio, tool use requests, and tool results.
*/
var SamplingMessageContentBlockSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ToolUseContentSchema,
	ToolResultContentSchema
]);
/**
* Describes a message issued to or received from an LLM API.
*/
var SamplingMessageSchema = object({
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
	/**
	* See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
	* for notes on _meta usage.
	*/
	_meta: record(string(), unknown()).optional()
});
/**
* Parameters for a `sampling/createMessage` request.
*/
var CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
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
/**
* A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
*/
var CreateMessageRequestSchema = RequestSchema.extend({
	method: literal("sampling/createMessage"),
	params: CreateMessageRequestParamsSchema
});
/**
* The client's response to a sampling/create_message request from the server.
* This is the backwards-compatible version that returns single content (no arrays).
* Used when the request does not include tools.
*/
var CreateMessageResultSchema = ResultSchema.extend({
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
/**
* The client's response to a sampling/create_message request when tools were provided.
* This version supports array content for tool use flows.
*/
var CreateMessageResultWithToolsSchema = ResultSchema.extend({
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
/**
* Primitive schema definition for boolean fields.
*/
var BooleanSchemaSchema = object({
	type: literal("boolean"),
	title: string().optional(),
	description: string().optional(),
	default: boolean().optional()
});
/**
* Primitive schema definition for string fields.
*/
var StringSchemaSchema = object({
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
/**
* Primitive schema definition for number fields.
*/
var NumberSchemaSchema = object({
	type: _enum(["number", "integer"]),
	title: string().optional(),
	description: string().optional(),
	minimum: number().optional(),
	maximum: number().optional(),
	default: number().optional()
});
/**
* Schema for single-selection enumeration without display titles for options.
*/
var UntitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	default: string().optional()
});
/**
* Schema for single-selection enumeration with display titles for each option.
*/
var TitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	oneOf: array(object({
		const: string(),
		title: string()
	})),
	default: string().optional()
});
/**
* Union of all primitive schema definitions.
*/
var PrimitiveSchemaDefinitionSchema = union([
	union([
		object({
			type: literal("string"),
			title: string().optional(),
			description: string().optional(),
			enum: array(string()),
			enumNames: array(string()).optional(),
			default: string().optional()
		}),
		union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]),
		union([object({
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
		}), object({
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
		})])
	]),
	BooleanSchemaSchema,
	StringSchemaSchema,
	NumberSchemaSchema
]);
/**
* The parameters for a request to elicit additional information from the user via the client.
*/
var ElicitRequestParamsSchema = union([TaskAugmentedRequestParamsSchema.extend({
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
}), TaskAugmentedRequestParamsSchema.extend({
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
})]);
/**
* A request from the server to elicit user input via the client.
* The client should present the message and form fields to the user (form mode)
* or navigate to a URL (URL mode).
*/
var ElicitRequestSchema = RequestSchema.extend({
	method: literal("elicitation/create"),
	params: ElicitRequestParamsSchema
});
/**
* Parameters for a `notifications/elicitation/complete` notification.
*
* @category notifications/elicitation/complete
*/
var ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({ 
/**
* The ID of the elicitation that completed.
*/
elicitationId: string() });
/**
* A notification from the server to the client, informing it of a completion of an out-of-band elicitation request.
*
* @category notifications/elicitation/complete
*/
var ElicitationCompleteNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/elicitation/complete"),
	params: ElicitationCompleteNotificationParamsSchema
});
/**
* The client's response to an elicitation/create request from the server.
*/
var ElicitResultSchema = ResultSchema.extend({
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
/**
* A reference to a resource or resource template definition.
*/
var ResourceTemplateReferenceSchema = object({
	type: literal("ref/resource"),
	/**
	* The URI or URI template of the resource.
	*/
	uri: string()
});
/**
* Identifies a prompt.
*/
var PromptReferenceSchema = object({
	type: literal("ref/prompt"),
	/**
	* The name of the prompt or prompt template
	*/
	name: string()
});
/**
* Parameters for a `completion/complete` request.
*/
var CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
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
/**
* A request from the client to the server, to ask for completion options.
*/
var CompleteRequestSchema = RequestSchema.extend({
	method: literal("completion/complete"),
	params: CompleteRequestParamsSchema
});
function assertCompleteRequestPrompt(request) {
	if (request.params.ref.type !== "ref/prompt") throw new TypeError(`Expected CompleteRequestPrompt, but got ${request.params.ref.type}`);
}
function assertCompleteRequestResourceTemplate(request) {
	if (request.params.ref.type !== "ref/resource") throw new TypeError(`Expected CompleteRequestResourceTemplate, but got ${request.params.ref.type}`);
}
/**
* The server's response to a completion/complete request
*/
var CompleteResultSchema = ResultSchema.extend({ completion: looseObject({
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
/**
* Represents a root directory or file that the server can operate on.
*/
var RootSchema = object({
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
/**
* Sent from the server to request a list of root URIs from the client.
*/
var ListRootsRequestSchema = RequestSchema.extend({
	method: literal("roots/list"),
	params: BaseRequestParamsSchema.optional()
});
/**
* The client's response to a roots/list request from the server.
*/
var ListRootsResultSchema = ResultSchema.extend({ roots: array(RootSchema) });
/**
* A notification from the client to the server, informing it that the list of roots has changed.
*/
var RootsListChangedNotificationSchema = NotificationSchema.extend({
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
var McpError = class McpError extends Error {
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
/**
* Specialized error type when a tool requires a URL mode elicitation.
* This makes it nicer for the client to handle since there is specific data to work with instead of just a code to check against.
*/
var UrlElicitationRequiredError = class extends McpError {
	constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
		super(ErrorCode.UrlElicitationRequired, message, { elicitations });
	}
	get elicitations() {
		return this.data?.elicitations ?? [];
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/runtime-registry.ts
/**
* 当前进程的 MCP Apps Gateway 注册槽。
*
* WB Bridge 早于 MCP Apps Host 注册 channel，故 service 调用时惰性读取。
*/
var activeGateway;
function setMcpAppsServiceGateway(gateway) {
	activeGateway = gateway;
	return () => {
		if (activeGateway === gateway) activeGateway = void 0;
	};
}
function getMcpAppsServiceGateway() {
	return activeGateway;
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/diag.ts
/**
* MCP Apps 诊断日志。
*
* 写入 `{WORKBUDDY_CONFIG_DIR|/homedir/.workbuddy}/logs/mcp-apps-diag.log`，
* 覆盖 Host ↔ MCP Server 全链路，便于对照 App 命中、resourceUri、
* openHostApp、tools/call、resources/read 与 panel 打开失败原因。
*/
var MAX_STRING = 4e3;
var MAX_JSON = 12e3;
var MAX_ARRAY_PREVIEW = 40;
var writeEnabled = true;
var logFilePath;
/** 当前文件已占字节数。进程内自增，避免每条日志都 stat 一次。 */
var currentLogBytes = 0;
function resolveConfigDir() {
	const fromEnv = process.env.WORKBUDDY_CONFIG_DIR?.trim();
	if (fromEnv) return fromEnv;
	const folder = process.env.WORKBUDDY_DATA_FOLDER_NAME?.trim() || ".workbuddy";
	return (0, node_path.join)((0, node_os.homedir)(), folder);
}
function ensureLogPath() {
	if (logFilePath) return logFilePath;
	const dir = (0, node_path.join)(resolveConfigDir(), "logs");
	(0, node_fs.mkdirSync)(dir, { recursive: true });
	logFilePath = (0, node_path.join)(dir, "mcp-apps-diag.log");
	currentLogBytes = fileSizeOrZero(logFilePath);
	return logFilePath;
}
function fileSizeOrZero(path) {
	try {
		return (0, node_fs.statSync)(path).size;
	} catch {
		return 0;
	}
}
/**
* 写满则把当前文件转存为 `.old`，只保留一代历史。
*
* 无论成功与否都把计数清零，随后照常按原路径 append：
* - 多个 daemon 进程共写时，后到者 rename 撞 ENOENT，此时文件已被别人转走，
*   append 会新建一个空文件，计数本就该归零；
* - rename 真的失败（如 Windows 文件占用）时归零相当于再放行 10MB 才重试一次，
*   避免每写一行都重复 stat + rename。诊断日志回收不得反过来拖累被诊断的链路。
*/
function rotateIfFull(path, incomingBytes) {
	if (currentLogBytes + incomingBytes <= 10485760) return;
	try {
		(0, node_fs.renameSync)(path, path.replace(/(\.log)?$/, ".old.log"));
	} catch {}
	currentLogBytes = 0;
}
/** 截断长字符串，避免单行日志膨胀。 */
function truncateDiagText(value, max = MAX_STRING) {
	if (value === void 0) return "undefined";
	if (value === null) return "null";
	const text = typeof value === "string" ? value : String(value);
	if (text.length <= max) return text;
	return `${text.slice(0, max)}…(+${text.length - max} chars)`;
}
/** 安全序列化诊断字段；失败时退回 String。 */
function stringifyDiagValue(value, max = MAX_JSON) {
	if (value === void 0) return "undefined";
	if (typeof value === "string") return truncateDiagText(value, max);
	try {
		const seen = /* @__PURE__ */ new WeakSet();
		return truncateDiagText(JSON.stringify(value, (_key, current) => {
			if (typeof current === "bigint") return current.toString();
			if (typeof current === "function") return `[Function ${current.name || "anonymous"}]`;
			if (current && typeof current === "object") {
				if (seen.has(current)) return "[Circular]";
				seen.add(current);
				if (Array.isArray(current) && current.length > MAX_ARRAY_PREVIEW) return [...current.slice(0, MAX_ARRAY_PREVIEW), `…(+${current.length - MAX_ARRAY_PREVIEW} items)`];
			}
			return current;
		}) ?? "null", max);
	} catch (error) {
		return truncateDiagText(`[Unserializable: ${error instanceof Error ? error.message : String(error)}]`);
	}
}
function formatFields(fields) {
	if (!fields) return "";
	const parts = [];
	for (const [key, value] of Object.entries(fields)) {
		if (value === void 0) continue;
		parts.push(`${key}=${stringifyDiagValue(value)}`);
	}
	return parts.length > 0 ? ` ${parts.join(" ")}` : "";
}
/**
* 写一条诊断日志。同步 append，保证崩溃前尽量落盘。
* 可通过 `MCP_APPS_DIAG=0` 关闭。
*/
function mcpAppsDiag(event, fields) {
	if (!writeEnabled) return;
	if (process.env.MCP_APPS_DIAG === "0") {
		writeEnabled = false;
		return;
	}
	const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [pid=${process.pid}] ${event}${formatFields(fields)}\n`;
	try {
		const path = ensureLogPath();
		const bytes = Buffer.byteLength(line, "utf8");
		rotateIfFull(path, bytes);
		(0, node_fs.appendFileSync)(path, line, "utf8");
		currentLogBytes += bytes;
	} catch {}
}
/** 汇总 tool `_meta`，帮助判断为何未被识别为 MCP App。 */
function summarizeToolMeta(meta) {
	if (!meta || typeof meta !== "object" || Array.isArray(meta)) return { hasMeta: false };
	const record = meta;
	const keys = Object.keys(record);
	const ui = record.ui;
	const uiRecord = ui && typeof ui === "object" && !Array.isArray(ui) ? ui : void 0;
	const workbuddy = record.workbuddy;
	const workbuddyRecord = workbuddy && typeof workbuddy === "object" && !Array.isArray(workbuddy) ? workbuddy : void 0;
	const workbuddyUi = workbuddyRecord?.ui;
	return {
		hasMeta: true,
		metaKeys: keys,
		hasUi: Boolean(uiRecord),
		uiKeys: uiRecord ? Object.keys(uiRecord) : [],
		resourceUri: typeof uiRecord?.resourceUri === "string" ? uiRecord.resourceUri : typeof record["ui/resourceUri"] === "string" ? record["ui/resourceUri"] : void 0,
		visibility: uiRecord?.visibility,
		workbuddyKeys: workbuddyRecord ? Object.keys(workbuddyRecord) : [],
		workbuddyUi
	};
}
/** 汇总 CallTool / Resource 结果，避免把整页 HTML 打进日志。 */
function summarizeMcpResult(result) {
	if (!result || typeof result !== "object") return { type: typeof result };
	const record = result;
	const content = Array.isArray(record.content) ? record.content : void 0;
	const contents = Array.isArray(record.contents) ? record.contents : void 0;
	const contentTypes = (content ?? contents ?? []).map((entry) => {
		if (!entry || typeof entry !== "object") return typeof entry;
		const item = entry;
		const textLen = typeof item.text === "string" ? item.text.length : 0;
		const blobLen = typeof item.blob === "string" ? item.blob.length : 0;
		return {
			type: item.type,
			mimeType: item.mimeType,
			uri: item.uri,
			textLen,
			blobLen,
			metaKeys: item._meta && typeof item._meta === "object" ? Object.keys(item._meta) : []
		};
	});
	return {
		isError: record.isError === true,
		contentCount: content?.length ?? 0,
		contentsCount: contents?.length ?? 0,
		contentTypes,
		structuredContentKeys: record.structuredContent && typeof record.structuredContent === "object" ? Object.keys(record.structuredContent) : [],
		metaKeys: record._meta && typeof record._meta === "object" ? Object.keys(record._meta) : []
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/conversation-worker-extension-port.ts
var conversationResolver;
/**
* Conversation Engine 装配时注册 daemon 内部 resolver。
*
* 该窄口不进入 renderer wire，也不维护 conversationId 到 ACP sessionId 的副本；
* 真实 session binding 由 ConversationImpl 在发送时动态注入。
*/
function registerMcpAppsConversationResolver(resolver) {
	conversationResolver = resolver;
	return () => {
		if (conversationResolver === resolver) conversationResolver = void 0;
	};
}
async function callMcpAppsConversationWorkerExtension(conversationId, method, params) {
	if (!conversationResolver) throw new Error("Conversation Engine runtime is not ready");
	const conversation = await conversationResolver(conversationId);
	if (!isWorkerExtensionConversation(conversation)) throw new Error(`Conversation "${conversationId}" has no active local worker extension port`);
	return conversation.callWorkerExtension(method, params);
}
//#endregion
//#region ../../packages/workbuddy-server/src/ardot/access-token.ts
async function fetchArdotAccessToken(apiDeps, connectError, options) {
	let response = await require_server_side_access_token.requestServerSideAccessToken(ARDOT_CONNECTOR_NAME, apiDeps, options);
	if (response?.code !== 0) response = await require_server_side_access_token.requestServerSideAccessToken(ARDOT_CONNECTOR_NAME, apiDeps, {
		...options,
		route: "console"
	});
	const accessToken = response?.data?.access_token ?? response?.data?.token;
	if (response?.code !== 0 || typeof accessToken !== "string" || accessToken.length === 0) throw new Error(response?.msg || connectError || "Ardot access token is unavailable");
	const expireAtSeconds = response?.data?.expire_at;
	return {
		accessToken,
		...typeof expireAtSeconds === "number" && Number.isFinite(expireAtSeconds) ? { expireAt: expireAtSeconds * 1e3 } : {}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/ardot/mcp-app-policy.ts
/**
* Ardot Agent-live 与标准 MCP Apps 一致：Host 不再 bootstrap tools/call。
*
* 完整 CallToolResult 已由 Agent CLI 经 ACP `mcpUi.toolResult` 回灌
* （`notifyToolCallUpdate` → `pushToolResult`）。无 Agent toolCall 的 UI
* 打开（会话恢复 / synthetic 新画布）仍由调用方显式
* `openHostApp({ bootstrapToolCall: true })` 负责。
*/
function shouldHostBootstrapArdotMcpApp(_appId) {
	return false;
}
var ARDOT_OPEN_DESIGN_APP_ID$1 = "ardot/open_design";
function hasNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}
/**
* daemon 侧 Agent-live 准入保险。
*
* `open_design` 缺少 fileId/fileUrl 时创建出的 Guest 只能显示欢迎页，却会先取得
* panel 独占并停放有效画布。旧 renderer 或事件竞态绕过 UI 门禁时必须在这里拒绝。
*/
function shouldMaterializeArdotMcpApp(input) {
	if (input.appId !== ARDOT_OPEN_DESIGN_APP_ID$1) return true;
	return hasNonEmptyString(input.toolInput?.fileUrl) || hasNonEmptyString(input.toolInput?.fileId);
}
//#endregion
//#region ../../packages/workbuddy-server/src/ardot/tool-result-artifact-manager.ts
var ARDOT_CREATE_DESIGN_APP_ID = "ardot/create_design";
var ARDOT_OPEN_DESIGN_APP_ID = "ardot/open_design";
var ARDOT_APP_IDS = /* @__PURE__ */ new Set([ARDOT_CREATE_DESIGN_APP_ID, ARDOT_OPEN_DESIGN_APP_ID]);
var UNWRAP_MAX_DEPTH = 5;
/** `Created Ardot design file: <name>, fileId <id>, url <url>` */
var CREATED_ARDOT_FILE_RE = /Created Ardot design file:\s*(.+?),\s*fileId\s+(\d+),\s*url\s+(https?:\/\/[^\s"'\\]+)/i;
var FILE_ID_IN_TEXT_RE = /\bfileId\s+(\d+)\b/i;
var URL_IN_TEXT_RE = /\burl\s+(https?:\/\/[^\s"'\\]+)/i;
var OPENING_ARDOT_FILE_RE = /\bOpening Ardot editor for file\s+(\d+)\b/i;
var OPEN_ARDOT_DESIGN_FILE_RE = /\bOpen Ardot design file:\s*(https?:\/\/[^\s"'\\]+|\d+)/i;
var FILE_ID_IN_PATH_RE = /\/file\/(\d+)\/?$/;
function readNonEmptyString$1(value) {
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
function isRecord$2(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
/**
* ACP 内容块：不能当成 MCP structuredContent 业务对象展开。
* 有 fileId/fileUrl 的对象即使带 `type` 也按业务字段保留（不是纯包装）。
*/
function isAcpContentShaped(record) {
	const type = record.type;
	if (typeof type !== "string") return false;
	if (type !== "text" && type !== "content" && type !== "image" && type !== "audio" && type !== "resource" && type !== "resource_link") return false;
	return !readNonEmptyString$1(record.fileId) && !readNonEmptyString$1(record.fileUrl);
}
function collectIdentityCandidates(toolResult) {
	const candidates = [];
	if (toolResult.structuredContent !== void 0) candidates.push(toolResult.structuredContent);
	if (Array.isArray(toolResult.content)) candidates.push(...toolResult.content);
	return candidates;
}
function unwrapAcpLayers(value, depth = 0) {
	if (depth > UNWRAP_MAX_DEPTH || value == null) return [];
	const out = [value];
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
			out.push(...unwrapAcpLayers(JSON.parse(trimmed), depth + 1));
		} catch {}
		return out;
	}
	if (Array.isArray(value)) {
		for (const item of value) out.push(...unwrapAcpLayers(item, depth + 1));
		return out;
	}
	if (!isRecord$2(value)) return out;
	if (typeof value.text === "string") out.push(...unwrapAcpLayers(value.text, depth + 1));
	if (value.content !== void 0) out.push(...unwrapAcpLayers(value.content, depth + 1));
	return out;
}
function extractFileIdFromUrl(fileUrl) {
	try {
		const url = new URL(fileUrl);
		return FILE_ID_IN_PATH_RE.exec(url.pathname)?.[1];
	} catch {
		return /^\d+$/.test(fileUrl) ? fileUrl : void 0;
	}
}
function parseIdentityFromText(text) {
	const created = CREATED_ARDOT_FILE_RE.exec(text);
	if (created) {
		const fileName = created[1]?.trim();
		const fileId = created[2];
		const fileUrl = sanitizeCapturedUrl(created[3]);
		if (!fileUrl) return;
		return {
			...fileId ? { fileId } : {},
			fileUrl,
			...fileName ? { fileName } : {}
		};
	}
	const openingFileId = OPENING_ARDOT_FILE_RE.exec(text)?.[1];
	if (openingFileId) return {
		fileId: openingFileId,
		fileUrl: openingFileId
	};
	const openedFileUrl = sanitizeCapturedUrl(OPEN_ARDOT_DESIGN_FILE_RE.exec(text)?.[1]);
	if (openedFileUrl) {
		const openedFileId = extractFileIdFromUrl(openedFileUrl);
		return {
			...openedFileId ? { fileId: openedFileId } : {},
			fileUrl: openedFileUrl
		};
	}
	const fileId = FILE_ID_IN_TEXT_RE.exec(text)?.[1];
	const fileUrl = sanitizeCapturedUrl(URL_IN_TEXT_RE.exec(text)?.[1]);
	if (!fileUrl && !fileId) return;
	const url = fileUrl ?? fileId;
	if (!url) return;
	return {
		...fileId ? { fileId } : {},
		fileUrl: url
	};
}
function sanitizeCapturedUrl(value) {
	if (!value) return;
	return value.replace(/[.,;)}\]"']+$/u, "");
}
function identityFromRecord(data) {
	const fileId = readNonEmptyString$1(data.fileId);
	const fileUrl = readNonEmptyString$1(data.fileUrl) ?? fileId;
	if (!fileUrl) return;
	const fileName = readNonEmptyString$1(data.fileName);
	return {
		...fileId ? { fileId } : {},
		fileUrl,
		...fileName ? { fileName } : {}
	};
}
function completeIdentity(identity) {
	const fileId = identity.fileId ?? extractFileIdFromUrl(identity.fileUrl);
	return {
		...identity,
		...fileId ? { fileId } : {}
	};
}
/**
* 解析可回放的画布身份（写入侧 create→open 归一专用）。
*
* 相比 {@link parseArdotCanvasResult} 放宽两处，因为它们只服务标题投影、不构成回放身份：
* - 不要求 `fileName`：缺失只影响产物卡标题，不影响能否打开画布。
* - 不要求 `_tool` 已是 `open_design`：`create_design` 的结果正是要被归一的对象，
*   在这里拒绝会让产物卡以 `ardot/create_design` 落盘、标题退回工具名，且回放拿不到画布身份。
*
* 不变量（#90171 回归，禁止改回「只读 structuredContent.fileId」）：
* live 合成常把 ACP `{type,text}` 当成 structuredContent，fileId 只在
* `Created Ardot design file: <name>, fileId <id>, url <url>` 文本里。
* 必须拆开 ACP / JSON 包装再抽身份；只读字段会让 URI 退化成
* `mcp-app://tool-result/ardot%2Fcreate_design/<callId>`。
*
* 仅对 `ardot/create_design` / `ardot/open_design` 生效，其它 MCP App 不走这里。
*
* `toolInput` 与 Tool Result 合并：输入身份优先，结果可补充 fileName 或在输入为空时
* 从 `Opening Ardot editor for file <id>` 等文本恢复身份。
*
* `fileUrl` 优先于 `fileId`：前者可能指向 test 域，不能用 fileId 反推生产域 URL。
* 只有 fileId 时原样返回，`open_design` 的 schema 同时接受裸 fileId 与完整 URL。
*/
function resolveArdotReplayIdentity(appId, toolResult, toolInput) {
	if (!ARDOT_APP_IDS.has(appId) || toolResult.isError) return;
	const inputFileUrl = readNonEmptyString$1(toolInput?.fileUrl);
	const inputFileId = readNonEmptyString$1(toolInput?.fileId);
	let resultIdentity;
	for (const candidate of collectIdentityCandidates(toolResult)) {
		for (const node of unwrapAcpLayers(candidate)) {
			if (isRecord$2(node)) {
				const fromFields = identityFromRecord(node);
				if (fromFields) {
					resultIdentity = completeIdentity(fromFields);
					break;
				}
			}
			if (typeof node === "string") {
				const trimmed = node.trim();
				if (trimmed.startsWith("{") || trimmed.startsWith("[")) continue;
				const fromText = parseIdentityFromText(node);
				if (fromText) {
					resultIdentity = completeIdentity(fromText);
					break;
				}
			}
		}
		if (resultIdentity) break;
	}
	if (!inputFileUrl && !inputFileId) return resultIdentity;
	const fileId = inputFileId ?? resultIdentity?.fileId;
	return completeIdentity({
		...fileId ? { fileId } : {},
		fileUrl: inputFileUrl ?? resultIdentity?.fileUrl ?? inputFileId,
		...resultIdentity?.fileName ? { fileName: resultIdentity.fileName } : {}
	});
}
/**
* 用归一后的 `open_design` 身份重写 Tool Result，其余业务字段原样保留。
*
* ACP `{type,text}` 包装不是业务 structuredContent，不能直接展开到回放结果。
*/
function toArdotOpenDesignToolResult(toolResult, identity) {
	const structured = isRecord$2(toolResult.structuredContent) ? toolResult.structuredContent : void 0;
	const base = structured && !isAcpContentShaped(structured) ? structured : {};
	return {
		...toolResult,
		content: normalizeArdotReplayContent(toolResult.content, identity.fileUrl),
		structuredContent: {
			...base,
			_tool: "open_design",
			toolName: "open_design",
			...identity.fileId ? { fileId: identity.fileId } : {},
			fileUrl: identity.fileUrl,
			...identity.fileName ? { fileName: identity.fileName } : {}
		}
	};
}
function normalizeArdotReplayContent(content, fileUrl) {
	if (Array.isArray(content) && content.every((item) => CallToolResultSchema.safeParse({ content: [item] }).success)) return content;
	return [{
		type: "text",
		text: `Open Ardot design file: ${fileUrl}`
	}];
}
/**
* Ardot 产物决策适配器。
*
* create/open 只有拿到稳定画布身份后才允许产物落盘；否则 defer，避免产生
* `tool-result/ardot/create_design/<callId>` 临时卡。Guest 结果仍由调用方原样回灌。
*/
var resolveArdotMcpAppArtifactPersistDecision = (input) => {
	if (!ARDOT_APP_IDS.has(input.appId)) return;
	if (input.toolResult.isError) return {
		status: "ignore",
		reason: "tool_result_error"
	};
	const identity = resolveArdotReplayIdentity(input.appId, input.toolResult, input.toolInput);
	if (!identity) return {
		status: "defer",
		reason: "missing_replay_identity"
	};
	return {
		status: "ready",
		replay: {
			appId: ARDOT_OPEN_DESIGN_APP_ID,
			...input.appId !== ARDOT_OPEN_DESIGN_APP_ID ? { sourceAppId: input.appId } : {},
			toolInput: {
				...identity.fileId ? { fileId: identity.fileId } : {},
				fileUrl: identity.fileUrl
			},
			toolResult: toArdotOpenDesignToolResult(input.toolResult, identity),
			preferExisting: true,
			hostDefaultSurface: "panel",
			fallbackTitle: "Ardot 画布"
		}
	};
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/artifact-persist-policy.ts
/** 按注册顺序组合产品 resolver；首个认领者具有最终决定权。 */
function createMcpAppArtifactPersistResolver(resolvers) {
	return (input) => {
		for (const resolver of resolvers) {
			const decision = resolver(input);
			if (decision) return decision;
		}
	};
}
/** 未被产品 resolver 认领的标准 MCP App 使用 toolCallId 快照回放。 */
function resolveMcpAppArtifactPersistDecision(input, resolver) {
	return resolver?.(input) ?? {
		status: "ready",
		replay: {
			appId: input.appId,
			toolInput: input.toolInput ?? {},
			preferExisting: false
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/handlers.ts
var MCP_APPS_CHANNELS = {
	listApps: "mcpApps:listApps",
	ensureToolDiscovered: "mcpApps:ensureToolDiscovered",
	openHostApp: "mcpApps:openHostApp",
	closeHostApp: "mcpApps:closeHostApp",
	refreshToolResult: "mcpApps:refreshToolResult",
	awaitBootstrapToolResult: "mcpApps:awaitBootstrapToolResult",
	callTool: "mcpApps:callTool",
	readResource: "mcpApps:readResource",
	getToken: "mcpApps:getToken",
	appsChanged: "mcpApps:appsChanged",
	notifyToolCall: "mcpApps:notifyToolCall",
	notifyToolCallUpdate: "mcpApps:notifyToolCallUpdate",
	openHostRequested: "mcpApps:openHostRequested",
	recordModelContextUpdate: "mcpApps:recordModelContextUpdate",
	getModelContextUpdate: "mcpApps:getModelContextUpdate",
	getViewResource: "mcpApps:getViewResource",
	listTools: "mcpApps:listTools",
	listResources: "mcpApps:listResources",
	listResourceTemplates: "mcpApps:listResourceTemplates",
	listPrompts: "mcpApps:listPrompts"
};
function pushMcpAppsArtifactEvent(publisher, sessionId, event, artifact) {
	require_handlers.pushWorkbuddySessionExtNotification(publisher, sessionId, "_codebuddy.ai/artifact", {
		sessionId,
		event,
		artifact
	});
}
function registerMcpAppsHandlers(options) {
	const { registry, gateway, subscribeCatalog } = options;
	registry.handle(MCP_APPS_CHANNELS.listApps, async () => {
		const apps = await gateway.listApps();
		mcpAppsDiag("rpc.listApps", {
			count: Array.isArray(apps) ? apps.length : void 0,
			apps: Array.isArray(apps) ? apps.map((app) => ({
				mcpAppId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName,
				resourceUri: app.resourceUri
			})) : apps
		});
		return apps;
	});
	registry.handle(MCP_APPS_CHANNELS.ensureToolDiscovered, async (params) => {
		const typed = params && typeof params === "object" ? params : {};
		const appId = typeof typed.appId === "string" && typed.appId.length > 0 ? typed.appId : void 0;
		const prefixedToolName = typeof typed.prefixedToolName === "string" && typed.prefixedToolName.length > 0 ? typed.prefixedToolName : void 0;
		if (!appId && !prefixedToolName) return { found: false };
		return gateway.ensureToolDiscovered ? gateway.ensureToolDiscovered({
			appId,
			prefixedToolName
		}, { wait: false }) : { found: false };
	});
	registry.handle(MCP_APPS_CHANNELS.openHostApp, async (params) => {
		mcpAppsDiag("rpc.openHostApp", { params });
		return gateway.openHostApp(params ?? {});
	});
	registry.handle(MCP_APPS_CHANNELS.closeHostApp, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) return {
			ok: false,
			error: "appInstanceId required"
		};
		mcpAppsDiag("rpc.closeHostApp", { appInstanceId });
		gateway.closeInstance(appInstanceId);
		return { ok: true };
	});
	registry.handle(MCP_APPS_CHANNELS.refreshToolResult, async (appInstanceId, toolInput) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		const input = toolInput && typeof toolInput === "object" ? toolInput : void 0;
		mcpAppsDiag("rpc.refreshToolResult", {
			appInstanceId,
			toolInput: input
		});
		const result = await gateway.refreshToolResult(appInstanceId, input);
		mcpAppsDiag("rpc.refreshToolResult.result", {
			appInstanceId,
			result: summarizeMcpResult(result)
		});
		return result;
	});
	registry.handle(MCP_APPS_CHANNELS.awaitBootstrapToolResult, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.awaitBootstrapToolResult", { appInstanceId });
		const result = await gateway.awaitBootstrapToolResult(appInstanceId);
		mcpAppsDiag("rpc.awaitBootstrapToolResult.result", {
			appInstanceId,
			hasResult: result !== void 0 && result !== null,
			result: summarizeMcpResult(result)
		});
		return result;
	});
	registry.handle(MCP_APPS_CHANNELS.callTool, async (appInstanceId, toolName, args) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		if (typeof toolName !== "string" || toolName.length === 0) throw new Error("toolName required");
		const callArgs = args && typeof args === "object" ? args : void 0;
		mcpAppsDiag("rpc.callTool", {
			appInstanceId,
			toolName,
			args: callArgs,
			direction: "Host→daemon→MCP Server tools/call"
		});
		try {
			const result = await gateway.proxyAppToolCall(appInstanceId, toolName, callArgs);
			mcpAppsDiag("rpc.callTool.result", {
				appInstanceId,
				toolName,
				result: summarizeMcpResult(result)
			});
			return result;
		} catch (error) {
			mcpAppsDiag("rpc.callTool.error", {
				appInstanceId,
				toolName,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	});
	registry.handle(MCP_APPS_CHANNELS.readResource, async (appInstanceId, uri) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		if (typeof uri !== "string" || uri.length === 0) throw new Error("uri required");
		mcpAppsDiag("rpc.readResource", {
			appInstanceId,
			uri,
			direction: "Host→daemon→MCP Server resources/read"
		});
		try {
			const result = await gateway.proxyAppResourceRead(appInstanceId, uri);
			mcpAppsDiag("rpc.readResource.result", {
				appInstanceId,
				uri,
				result: summarizeMcpResult(result)
			});
			return result;
		} catch (error) {
			mcpAppsDiag("rpc.readResource.error", {
				appInstanceId,
				uri,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	});
	registry.handle(MCP_APPS_CHANNELS.getToken, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.getToken", { appInstanceId });
		return gateway.getToken(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.getViewResource, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.getViewResource", { appInstanceId });
		return gateway.getAppViewResource(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.listTools, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.listTools", { appInstanceId });
		return gateway.listAppTools(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.listResources, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.listResources", { appInstanceId });
		return gateway.listAppResources(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.listResourceTemplates, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.listResourceTemplates", { appInstanceId });
		return gateway.listAppResourceTemplates(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.listPrompts, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) throw new Error("appInstanceId required");
		mcpAppsDiag("rpc.listPrompts", { appInstanceId });
		return gateway.listAppPrompts(appInstanceId);
	});
	registry.handle(MCP_APPS_CHANNELS.notifyToolCall, async (params) => {
		const typed = params ?? {};
		mcpAppsDiag("rpc.notifyToolCall", {
			sessionId: typed.sessionId,
			projectId: typed.projectId,
			toolCallId: typed.toolCallId,
			prefixedToolName: typed.prefixedToolName,
			rawInput: typed.rawInput,
			conversationRequestId: typed.conversationRequestId
		});
		if (!typed.toolCallId || !typed.prefixedToolName) return { handled: false };
		const result = await gateway.handleAgentToolCall({
			sessionId: typed.sessionId,
			toolCallId: typed.toolCallId,
			prefixedToolName: typed.prefixedToolName,
			rawInput: typed.rawInput,
			conversationRequestId: typed.conversationRequestId
		});
		mcpAppsDiag("rpc.notifyToolCall.result", {
			toolCallId: typed.toolCallId,
			prefixedToolName: typed.prefixedToolName,
			result
		});
		return result;
	});
	registry.handle(MCP_APPS_CHANNELS.notifyToolCallUpdate, async (toolCallId, result) => {
		if (typeof toolCallId !== "string" || toolCallId.length === 0) return { handled: false };
		const typedResult = result && typeof result === "object" ? result : {};
		mcpAppsDiag("rpc.notifyToolCallUpdate", {
			toolCallId,
			result: summarizeMcpResult(typedResult)
		});
		return { handled: gateway.pushToolResult({ toolCallId }, typedResult) };
	});
	registry.handle(MCP_APPS_CHANNELS.recordModelContextUpdate, async (appInstanceId, update) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) return { handled: false };
		const typed = update && typeof update === "object" ? update : {};
		const content = Array.isArray(typed.content) ? typed.content.filter((entry) => Boolean(entry) && typeof entry === "object") : void 0;
		const structuredContent = typed.structuredContent && typeof typed.structuredContent === "object" && !Array.isArray(typed.structuredContent) ? typed.structuredContent : void 0;
		mcpAppsDiag("rpc.recordModelContextUpdate", {
			appInstanceId,
			contentCount: content?.length ?? 0,
			structuredContentKeys: structuredContent ? Object.keys(structuredContent) : []
		});
		return { handled: gateway.recordModelContextUpdate(appInstanceId, {
			...content ? { content } : {},
			...structuredContent ? { structuredContent } : {}
		}) };
	});
	registry.handle(MCP_APPS_CHANNELS.getModelContextUpdate, async (appInstanceId) => {
		if (typeof appInstanceId !== "string" || appInstanceId.length === 0) return null;
		const update = gateway.getModelContextUpdate(appInstanceId) ?? null;
		mcpAppsDiag("rpc.getModelContextUpdate", {
			appInstanceId,
			hasUpdate: update !== null
		});
		return update;
	});
	const unsubscribeCatalog = subscribeCatalog((apps) => {
		const list = Array.isArray(apps) ? apps : [];
		mcpAppsDiag("rpc.appsChanged.push", {
			count: list.length,
			apps: list.map((app) => ({
				mcpAppId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName
			}))
		});
		registry.push(MCP_APPS_CHANNELS.appsChanged, apps);
	});
	const unsubscribeOpenHostRequested = gateway.onOpenHostRequested((payload) => {
		mcpAppsDiag("rpc.openHostRequested.push", { payload });
		registry.push(MCP_APPS_CHANNELS.openHostRequested, payload);
	});
	return () => {
		unsubscribeCatalog();
		unsubscribeOpenHostRequested();
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/envd-files-url.ts
/**
* envd GET/POST /files 会按 username impersonate OS 用户。
*
* 后台 sandboxagent 固定带 `username=user`。项目 client / sandbox-preview 以前
* 漏了这个 query：JWT 是 admin，ListDir/POST 能过；GET 却以默认 user 读盘。
* `/root` 通常 0700，user 过不去 → envd 回 404（刚上传的 HTML 落在
* `/root/uploads/...`，预览空白）。
*
* `/root` 路径用 `root`，其余用 `user`。读写必须同一 username，否则 POST
* `/root/uploads` 带 `user` 会写失败。
*
* GET 还必须绕开 HTTP 缓存：落盘幂等探测会先对同一 URL GET 出 404，Chromium
* fetch 默认会把这份 404 缓存起来。写成功后预览再 GET，命中缓存 → 文件已在
* ListDir 里、预览却长时间空白（#104752 回归）。`cache:'no-store'` 挡 Chromium；
* `cb=` 挡中间代理把探测 404 当可缓存响应用。POST 不要带 cb，签名/排重按路径。
*/
function envdFilesUsername(path) {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return normalized === "/root" || normalized.startsWith("/root/") ? "root" : "user";
}
var ENVD_FILES_GET_CACHE = "no-store";
function buildEnvdFilesUrl(apiUrl, path) {
	return `${apiUrl}/files?path=${encodeURIComponent(path)}&username=${encodeURIComponent(envdFilesUsername(path))}`;
}
function buildEnvdFilesGetUrl(apiUrl, path, now = Date.now()) {
	return `${buildEnvdFilesUrl(apiUrl, path)}&cb=${now}`;
}
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/sandbox-preview-handler.ts
var ROUTE_PREFIX$2 = "/sandbox-preview/";
function buildSandboxPreviewFullPath(root, relPath) {
	const normalizedRoot = (root || "/workspace").replace(/\\/g, "/").replace(/\/+$/, "") || "/";
	const normalizedRel = relPath.replace(/\\/g, "/").replace(/^\/+/, "").replace(/\/+/g, "/");
	if (!normalizedRel) return normalizedRoot === "/" ? "/" : normalizedRoot;
	if (normalizedRoot === "/") return `/${normalizedRel}`;
	return `${normalizedRoot}/${normalizedRel}`;
}
/**
* HTML 预览 CSP（仅作用于 webview 内产物页面，不修改主窗口 CSP）。
*
* 与 MCP Apps 的 CSP 不同：这里没有 connector 声明的 connectDomains /
* resourceDomains，而是给一个宽松但有上限的基线，让常见可视化库（Chart.js、
* ECharts、Plotly 等）都能正常运行。
*
* 安全防护由三方面提供：
*   1. webview partition 隔离
*   2. loopback HTTP 端点（127.0.0.1）
*   3. mountId 已在 daemon 内存中验证
*/
var SANDBOX_PREVIEW_CSP = [
	"default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https:",
	"style-src 'self' 'unsafe-inline' blob: data: https:",
	"img-src 'self' blob: data: https:",
	"font-src 'self' blob: data: https:",
	"connect-src 'self' https: http://127.0.0.1:* ws://127.0.0.1:*",
	"worker-src 'self' blob: data: https:",
	"frame-src 'self' http://127.0.0.1:* https:"
].join("; ");
/**
* 需要从 envd 原始响应中移除的头（避免影响 webview 嵌入和 CSP）。
*
* content-encoding / content-length / transfer-encoding 必须一起剥掉：
* 全局 `fetch`（undici）请求时会自动带 Accept-Encoding，若 envd 返回 gzip/br 压缩内容，
* fetch 会自动解压 body（`resp.arrayBuffer()` 拿到的已是解压后明文），但 `resp.headers`
* 里的 content-encoding/content-length 仍是压缩前的原始值，原样转发会让 webview 按声明的
* 编码/长度去解码明文 body，触发 `net::ERR_CONTENT_DECODING_FAILED`（-330）。转发时必须让
* Node 用 `res.end(body)` 的实际字节数重新计算这些头。
*/
var STRIP_HEADERS = /* @__PURE__ */ new Set([
	"x-frame-options",
	"content-security-policy",
	"content-security-policy-report-only",
	"x-content-security-policy",
	"x-webkit-csp",
	"content-encoding",
	"content-length",
	"transfer-encoding"
]);
/**
* HTML entity 转义：将 & < > " ' 转为对应的实体引用，防止用户输入注入 HTML/JS。
* 注意：`code` 由调用方硬编码（仅限数字），不在此处转义。
*/
function escapeHtml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/**
* 错误页 HTML 模板。参数化：
*  - code: HTTP 状态码（仅限硬编码数字，不做转义）
*  - title: 错误标题（会做 HTML entity 转义）
*  - message: 错误描述（会做 HTML entity 转义）
*/
function buildErrorPage(code, title, message) {
	return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    display:flex;align-items:center;justify-content:center;min-height:100vh;
    margin:0;background:#f5f5f5;color:#333}
  .box{text-align:center;padding:2rem}
  h1{font-size:3rem;margin:0 0 0.5rem;color:#e74c3c}
  p{margin:0.5rem 0;color:#666}
</style>
</head>
<body><div class="box"><h1>${code}</h1><p><strong>${escapeHtml(title)}</strong></p><p>${escapeHtml(message)}</p></div></body>
</html>`;
}
var SandboxPreviewHandler = class {
	constructor(mountService, logger) {
		this.mountService = mountService;
		this.logger = logger;
	}
	tryHandle(req, res) {
		const reqUrl = req.url;
		if (!reqUrl || !reqUrl.startsWith(ROUTE_PREFIX$2)) return false;
		const rest = reqUrl.slice(17);
		const slashIdx = rest.indexOf("/");
		if (slashIdx < 1) {
			this.sendError(res, 400, "Bad Request", "Missing mountId in path");
			return true;
		}
		const mountId = rest.slice(0, slashIdx);
		let relPath;
		try {
			relPath = decodeURIComponent(rest.slice(slashIdx + 1).split("?")[0]);
		} catch {
			this.sendError(res, 400, "Bad Request", "Invalid URL encoding in path");
			return true;
		}
		if (!relPath) {
			this.sendError(res, 404, "Not Found", "No file path specified");
			return true;
		}
		const mount = this.mountService.resolve(mountId);
		if (!mount) {
			this.logger?.warn?.("[SandboxPreviewHandler] mount not found or expired", { mountId });
			this.sendError(res, 404, "Mount Expired", "The sandbox preview mount has expired or was not found. Please re-open the preview.");
			return true;
		}
		this.logger?.info?.("[SandboxPreviewHandler] request", {
			mountId,
			relPath,
			method: req.method
		});
		this.proxyRequest(mountId, mount, relPath, res);
		return true;
	}
	async proxyRequest(mountId, mount, relPath, res) {
		const fullPath = buildSandboxPreviewFullPath(mount.root, relPath);
		const envdUrl = buildEnvdFilesGetUrl(mount.apiBase, fullPath);
		this.logger?.info?.("[SandboxPreviewHandler] proxying", {
			mountId,
			fullPath
		});
		try {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), 3e4);
			let resp;
			try {
				resp = await fetch(envdUrl, {
					headers: { "X-Access-Token": mount.token },
					signal: controller.signal,
					cache: ENVD_FILES_GET_CACHE
				});
			} catch (err) {
				if (err.name === "AbortError") {
					this.logger?.warn?.("[SandboxPreviewHandler] request timeout", { envdUrl });
					this.sendError(res, 504, "Gateway Timeout", "Sandbox file request timed out.");
					return;
				}
				throw err;
			} finally {
				clearTimeout(timer);
			}
			if (!resp.ok) {
				const body = await resp.text().catch(() => "");
				this.logger?.warn?.("[SandboxPreviewHandler] upstream error", {
					mountId,
					status: resp.status,
					body: body.slice(0, 500)
				});
				if (resp.status === 404) this.sendError(res, 404, "File Not Found", `The file "${relPath}" was not found in the sandbox.`);
				else this.sendError(res, 502, "Bad Gateway", `Sandbox returned HTTP ${resp.status}.`);
				return;
			}
			const headers = {};
			resp.headers.forEach((value, key) => {
				if (STRIP_HEADERS.has(key.toLowerCase())) return;
				headers[key] = value;
			});
			headers["Content-Security-Policy"] = SANDBOX_PREVIEW_CSP;
			headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
			headers["Pragma"] = "no-cache";
			headers["Expires"] = "0";
			const body = Buffer.from(await resp.arrayBuffer());
			headers["Content-Length"] = String(body.length);
			res.writeHead(resp.status, headers);
			res.end(body);
		} catch (err) {
			if (!res.writableEnded) {
				this.logger?.error?.("[SandboxPreviewHandler] proxy error", {
					mountId,
					error: err.message
				});
				this.sendError(res, 502, "Proxy Error", "Failed to fetch file from sandbox.");
			}
		}
	}
	sendError(res, code, title, message) {
		if (res.writableEnded) return;
		const html = buildErrorPage(code, title, message);
		res.writeHead(code, {
			"Content-Type": "text/html; charset=utf-8",
			"Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
			"Cache-Control": "no-cache, no-store, must-revalidate"
		});
		res.end(html);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/sandbox-preview-mount.ts
/**
* SandboxPreviewMountService
*
* 管理 sandbox preview mount entry 内存映射。
* mountId → { apiBase, token, root, source, sessionId, expiresAt }
*
* mountId 由 registerMount 生成，不暴露 token 到 URL。
*/
/**
* 从 ACP link 中提取沙箱集群域名（去掉 host 第一段的 `<port>-<sandboxId>` 前缀）。
*
* 对齐 packages/agent-ui 的 cloud-agent-colleague-service.ts::getSandboxDomain 与
* packages/workbuddy-server 的 project-chat-service.ts::getFilesystem 域名推导逻辑
* ——不能对 link 字符串做整体端口替换（如 `65225-` → `49983-`），因为：
*   1. ACP 端口（JobProxyServerPort=65225）与 envd 数据面端口（E2BDataPlanePort=49983）
*      是沙箱镜像内两个独立监听端口，只是当前"泛子域名"URL 形态把端口号编码进了
*      host 第一段；一旦命中 sandbox-gateway 的 path-proxy 灰度形态，端口号会挪到
*      URL path 里，host 里根本不存在 `65225-` 子串，字符串替换会静默失效。
*   2. 已验证稳定的文件读取链路（CollabCloudE2BFilesystem / colleague envd fetch）
*      从不对 link 做端口替换，而是"提取域名 + 用已知 sandboxId 重建 49983- host"。
*/
function getSandboxDomain(link) {
	try {
		return new URL(link.replace(/^http:\/\//, "https://")).hostname.split(".").slice(1).join(".") || "e2b.dev";
	} catch {
		return "e2b.dev";
	}
}
/** sandboxId 缺失时从 link host 第一段解析（去掉端口号前缀），对齐 getSandboxId 的兜底逻辑。 */
function resolveSandboxId(sandboxId, link) {
	if (sandboxId) return sandboxId;
	try {
		return new URL(link.replace(/^http:\/\//, "https://")).hostname.split(".")[0].replace(/^\d+-/, "");
	} catch {
		return "";
	}
}
var SandboxPreviewMountService = class SandboxPreviewMountService {
	constructor() {
		this.mounts = /* @__PURE__ */ new Map();
	}
	static {
		this.MAX_MOUNT_ENTRIES = 200;
	}
	registerMount(params, getPort) {
		if (this.mounts.size >= SandboxPreviewMountService.MAX_MOUNT_ENTRIES) {
			const oldestKey = this.mounts.keys().next().value;
			if (oldestKey !== void 0) this.mounts.delete(oldestKey);
		}
		const mountId = (0, node_crypto.randomBytes)(16).toString("hex");
		const root = params.root || "/workspace";
		const link = params.sandbox.link;
		const domain = getSandboxDomain(link);
		const entry = {
			apiBase: `https://49983-${resolveSandboxId(params.sandbox.sandboxId, link)}.${domain}`,
			token: params.sandbox.token,
			root: root.startsWith("/") ? root : "/" + root,
			source: params.source,
			sessionId: params.sessionId,
			expiresAt: Date.now() + 864e5
		};
		this.mounts.set(mountId, entry);
		return {
			ok: true,
			mountId,
			baseUrl: `http://127.0.0.1:${getPort()}/sandbox-preview/${mountId}/`
		};
	}
	resolve(mountId) {
		const entry = this.mounts.get(mountId);
		if (!entry) return;
		if (Date.now() > entry.expiresAt) {
			this.mounts.delete(mountId);
			return;
		}
		this.mounts.delete(mountId);
		this.mounts.set(mountId, entry);
		return entry;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/local-file-viewer.ts
/**
* 本地文件查看器注入 —— 把 App 薄壳里的占位符换成 loopback viewer 地址。
*
* ## 为什么需要这层
* 有些 App 的查看器产物极大且用**相对路径**加载兄弟资源（Miora 画布查看器
* 11.6MB + wasm/js/png）。这类产物：
* - **不能内联**进 `resources/read`：宿主用 `document.write` 把 HTML 写进 iframe
*   （见 `sandbox-proxy.ts`，刻意不用 srcdoc），此时 `import.meta.url` 指向宿主
*   proxy 页地址，兄弟资源全部 404；且体积远超 Agent CLI 的 256KiB 预取阈值。
* - **不能由 App 自己拼地址**：App 是 Agent CLI 拉起的 stdio 子进程，拿不到 daemon
*   `StaticHtmlHttpServer` 的注册 token。
*
* 于是约定：App 返回几 KB 薄壳（iframe src 是占位符）+ 一份
* `_meta.workbuddy.ui.localFileViewer` 声明；宿主注册目录、拼 URL、替换占位符。
*
* ## 安全不变量（逐条对应 `local-file-viewer.spec.ts` 的用例）
* 注册目录 = 把该目录暴露到 loopback HTTP，且 `registerDir` 自身**不做任何路径
* 校验**。声明又来自 MCP Server（Manager 同时管理第三方 remote MCP）。所以：
*
* 1. **仅 bundled 内置 App 生效**：`runtimeSource !== 'session-stdio'` 一律忽略。
*    第三方 remote App 写同样的 `_meta` 不产生任何效果。
* 2. **查看器产物由宿主自行定位**：按 `serverId` 推导 bundled 目录，声明只能给
*    一个**文件名**（`viewerFile`；兼容旧 `viewerEntry` 时只取 basename）。
*    绝不使用声明给出的目录部分 —— 否则等于让声明方决定挂哪个目录。
* 3. **目标文件后缀白名单由宿主持有**（`TARGET_EXTENSIONS`），忽略声明里的
*    `extension` —— 否则声明 `.pem` 就能让宿主放行私钥目录。
* 4. **realpath 后复查后缀**：`bait.miora -> /etc/passwd` 这类 symlink 必须挡住，
*    否则「注册的目录」与「实际被服务的文件」不一致。
* 5. **必须是真实存在的普通文件**：不存在的路径不该导致目录注册。
* 6. **任何一步失败都保留占位符原样**，绝不替换成空串 —— 空 `src` 会让 iframe
*    加载宿主自身页面（同源），比白屏更难排查。
*/
/**
* 唯一被接受的占位符字面量。
*
* 声明方必须原样给出它 —— 不允许自定义，否则 App 可以要求宿主替换 HTML 里的任意
* 字符串（例如某段脚本常量），把注入能力变成任意内容改写。
*/
var LOCAL_FILE_VIEWER_PLACEHOLDER = "__WB_LOCAL_FILE_VIEWER_SRC__";
/**
* 允许被查看的目标文件后缀（宿主白名单，声明方无权扩展）。
*
* 目前只有 Miora 画布。新增前先想清楚：注册的是该文件**所在目录**，
* 目录内所有 `static-html-server.ts:ALLOWED_EXTENSIONS` 后缀的文件都会可读。
*/
var TARGET_EXTENSIONS = /* @__PURE__ */ new Set([".miora"]);
/** 查看器产物在 bundled marketplace 里的相对位置：`mcps/<serverId>/assets/<file>`。 */
var VIEWER_ASSET_SEGMENTS = [
	"plugins",
	"workbuddy-builtin",
	"mcps"
];
/**
* 校验并归一声明。返回 `undefined` 表示「不适用/不可信」，调用方应保持 HTML 原样。
*
* 与 `injectLocalFileViewerSrc` 分离，便于单测直接覆盖判定逻辑。
*/
function resolveLocalFileViewerPlan(params) {
	const { app, declaration, toolInput, resolveBundledAsset } = params;
	if (!declaration) return;
	const reject = (reason, extra) => {
		mcpAppsDiag("localFileViewer.reject", {
			reason,
			appId: app.mcpAppId,
			serverId: app.serverId,
			runtimeSource: app.runtimeSource,
			...extra
		});
	};
	if (app.runtimeSource !== "session-stdio") return reject("not_builtin_app");
	if (declaration.placeholder !== "__WB_LOCAL_FILE_VIEWER_SRC__") return reject("placeholder_mismatch", { placeholder: declaration.placeholder });
	if (!isSafeIdentifier(declaration.inputField)) return reject("unsafe_input_field", { inputField: declaration.inputField });
	if (!isSafePathSegment(app.serverId)) return reject("unsafe_server_id");
	const declaredViewer = declaration.viewerFile ?? declaration.viewerEntry;
	if (typeof declaredViewer !== "string" || declaredViewer.trim().length === 0) return reject("missing_viewer_file");
	const viewerFile = basenameOfAnyPlatform(declaredViewer.trim());
	if (!isSafePathSegment(viewerFile) || !viewerFile.toLowerCase().endsWith(".html")) return reject("unsafe_viewer_file", { viewerFile });
	const viewerEntry = resolveBundledAsset?.(...VIEWER_ASSET_SEGMENTS, app.serverId, "assets", viewerFile);
	if (!viewerEntry) return reject("viewer_asset_missing", {
		serverId: app.serverId,
		viewerFile
	});
	const targetPathRaw = Object.hasOwn(toolInput, declaration.inputField) ? toolInput[declaration.inputField] : void 0;
	if (typeof targetPathRaw !== "string" || targetPathRaw.trim().length === 0) return reject("missing_target_path", { inputField: declaration.inputField });
	return {
		viewerEntry,
		targetPathRaw: targetPathRaw.trim()
	};
}
/**
* 把薄壳里的占位符替换成 viewer 的 loopback 地址。
*
* 任何校验失败 / 依赖缺失都**原样返回入参 HTML**（不变量 6）—— 由 App 自己的
* 占位页或空 iframe 承担可见后果，宿主不制造"看起来成功但地址是空的"状态。
*/
async function injectLocalFileViewerSrc(params) {
	const { html, app, declaration, toolInput, deps } = params;
	if (!html.includes("__WB_LOCAL_FILE_VIEWER_SRC__")) return html;
	const plan = resolveLocalFileViewerPlan({
		app,
		declaration,
		toolInput,
		resolveBundledAsset: deps.resolveBundledAsset
	});
	if (!plan) return html;
	const server = deps.staticHtmlServer;
	if (!server) {
		mcpAppsDiag("localFileViewer.reject", {
			reason: "static_server_unavailable",
			appId: app.mcpAppId
		});
		return html;
	}
	const targetPath = await resolveTargetFile(plan.targetPathRaw, app.mcpAppId);
	if (!targetPath) return html;
	const port = server.getServerPort();
	if (!(port > 0)) {
		mcpAppsDiag("localFileViewer.reject", {
			reason: "port_not_ready",
			appId: app.mcpAppId
		});
		return html;
	}
	const viewerToken = server.registerDir(node_path.dirname(plan.viewerEntry));
	const assetsToken = server.registerDir(node_path.dirname(targetPath));
	const base = `http://127.0.0.1:${port}/static-html`;
	const assetsBase = `${base}/${assetsToken}`;
	const dataUrl = `${assetsBase}/${encodeURIComponent(node_path.basename(targetPath))}`;
	const query = new URLSearchParams({
		data: dataUrl,
		assetsBase
	});
	const viewerUrl = `${base}/${viewerToken}/${encodeURIComponent(node_path.basename(plan.viewerEntry))}?${query.toString()}`;
	mcpAppsDiag("localFileViewer.injected", {
		appId: app.mcpAppId,
		serverId: app.serverId,
		viewerFile: node_path.basename(plan.viewerEntry),
		targetFile: node_path.basename(targetPath)
	});
	return html.replaceAll(LOCAL_FILE_VIEWER_PLACEHOLDER, escapeHtmlAttribute(viewerUrl));
}
/**
* 校验目标文件：绝对路径 → 后缀白名单 → realpath → 复查后缀 → 必须是普通文件。
*
* 对应不变量 3/4/5。返回 `undefined` 即拒绝。
*/
async function resolveTargetFile(candidate, appId) {
	const reject = (reason, extra) => {
		mcpAppsDiag("localFileViewer.reject", {
			reason,
			appId,
			...extra
		});
	};
	if (!node_path.isAbsolute(candidate)) return reject("target_not_absolute");
	if (!TARGET_EXTENSIONS.has(node_path.extname(candidate).toLowerCase())) return reject("target_ext_not_allowed", { ext: node_path.extname(candidate) });
	const resolved = await (0, node_fs_promises.realpath)(candidate).catch(() => void 0);
	if (!resolved) return reject("target_unresolvable");
	if (!TARGET_EXTENSIONS.has(node_path.extname(resolved).toLowerCase())) return reject("target_ext_not_allowed_after_realpath", { ext: node_path.extname(resolved) });
	if (!(await (0, node_fs_promises.stat)(resolved).catch(() => void 0))?.isFile()) return reject("target_not_regular_file");
	return resolved;
}
/** 目录/文件名段安全性：拒绝 `.` / `..` / 隐藏文件与任何分隔符。 */
function isSafePathSegment(value) {
	return value !== "." && value !== ".." && !value.startsWith(".") && /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value);
}
/** 入参字段名安全性：普通标识符，挡掉 `__proto__` 之类。 */
function isSafeIdentifier(value) {
	return typeof value === "string" && /^[A-Za-z_][A-Za-z0-9_]*$/.test(value) && value !== "__proto__";
}
/**
* 取 basename，同时容忍 Windows 反斜杠。
*
* 不能只用 `path.basename`：daemon 可能跑在 POSIX 上而声明来自 Windows 侧配置，
* 此时 `path.basename('C:\\x\\a.html')` 会原样返回整串，`isSafePathSegment`
* 恰好因为含 `\` 而拒绝 —— 但那是"碰巧安全"。显式按两种分隔符切更可靠。
*/
function basenameOfAnyPlatform(value) {
	const parts = value.split(/[\\/]/);
	return parts[parts.length - 1] ?? value;
}
/** HTML 属性转义。URL 其余部分已 percent-encode，这里只处理属性语法字符。 */
function escapeHtmlAttribute(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/gateway.ts
/**
* AppGatewayService
*
* Central orchestrator for the Host-side MCP Apps lifecycle exposed to the
* renderer over Daemon. Responsibilities in this slice:
*
* - list app-capable tools directly from McpManager-owned controllers,
* - materialize an AppInstance (fetch HTML + metadata + stable loopback URL),
* - relay bridge messages between the renderer webview and the MCP server
*   (`tools/call`, `resources/read`).
*
* Agent Loop integration:
*   - `OpenHostAppParams.toolCallId` / `AppInstance.toolCallId` record the
*     Agent Runtime call identity for result correlation.
*   - Agent-driven opens always use `bootstrapToolCall = false`; the Host
*     never executes the same MCP Tool again.
*   - `pushToolResult` resolves the instance's `toolResultPromise` with the
*     original standard ToolResult, which is then delivered to the Guest.
*/
var DEFAULT_UNKNOWN_APP_RETRY_TIMEOUT_MS = 8e3;
/**
* 由本次 tool 入参派生出 UI resource 的缓存变体键。
*
* 绝大多数 App 的 `ui://` HTML 是静态的，同一 `resourceUri` 永远同一份内容，
* 按 appId + resourceUri 缓存即可。但有些 App 的 HTML 依赖入参 —— 例如 Miora
* viewer 会把「当前 `.miora` 的 loopback 地址」内联进它返回的薄壳。这类 App
* 若共用一个缓存条目，打开第二个画布时会拿到指向第一个画布的 HTML，且不报错。
*
* 这里不硬编码任何具体 App 或字段名：把整份入参归一后哈希，入参不同即不同变体。
* 入参为空时返回空串，缓存键退化成引入本维度之前的形态，既有 App 行为不变。
*/
function buildResolverVariantKey(toolInput) {
	const entries = Object.entries(toolInput).filter(([, value]) => value !== void 0).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0);
	if (entries.length === 0) return "";
	let serialized;
	try {
		serialized = JSON.stringify(entries);
	} catch {
		return (0, crypto.randomUUID)();
	}
	return (0, crypto.createHash)("sha1").update(serialized).digest("hex").slice(0, 16);
}
/**
* Extract top-level `default` values from a JSON Schema object. Used by
* `openHostApp` to pre-fill `tool-input` with schema-declared defaults so
* apps that consume `ui/notifications/tool-input` still render something
* useful when opened without caller-supplied arguments.
*
* Handles the three JSON-Schema shapes upstream MCP servers emit today
* (`zod-to-json-schema` + hand-written schemas):
*
*   1. Inline properties:                  `{ type:'object', properties:{ x:{ default:1 } } }`
*   2. `$ref` into `definitions`:          `{ $ref:'#/definitions/Foo', definitions:{ Foo:{ properties:{...} } } }`
*   3. `$ref` into `$defs` (Draft 2019+):  `{ $ref:'#/$defs/Foo',       $defs:{       Foo:{ properties:{...} } } }`
*
* Nested object defaults are passed through verbatim because Zod emits
* them on the enclosing property's `default` field — we only walk one
* level down into the resolved `properties` bag.
*/
function extractSchemaDefaults(schema) {
	if (!schema || typeof schema !== "object") return {};
	const properties = resolveSchemaProperties(schema);
	if (!properties) return {};
	const out = {};
	for (const [name, field] of Object.entries(properties)) if (field && typeof field === "object" && "default" in field) out[name] = field.default;
	return out;
}
/**
* Best-effort `properties` lookup that follows a single `$ref` into the
* schema's `definitions` / `$defs` bag. Returns `undefined` when the
* schema either has no top-level properties or points at something we
* don't recognize.
*/
function resolveSchemaProperties(schema) {
	const directProps = schema.properties;
	if (directProps && typeof directProps === "object") return directProps;
	const ref = schema.$ref;
	if (typeof ref !== "string") return;
	const match = /^#\/(definitions|\$defs)\/([^/]+)$/.exec(ref);
	if (!match) return;
	const bag = schema[match[1]];
	const target = bag && typeof bag === "object" ? bag[match[2]] : void 0;
	if (!target || typeof target !== "object") return;
	const resolved = target.properties;
	return resolved && typeof resolved === "object" ? resolved : void 0;
}
/**
* agent-cli 的 toolCallId 形如 `mcp__ardot__create_design_3`，序号按**单会话**
* 内工具调用递增，跨会话并不唯一。MCP Apps gateway 是进程级单例，若仅用
* toolCallId 做幂等键，新会话会撞上旧会话仍存活的实例（见 bad case：
* `handleAgentToolCall.idempotent` 误复用 → 画布不打开）。
*
* 有 sessionId 时用 `sessionId::toolCallId`；无 sessionId 时退回裸 toolCallId
*（兼容命令式打开 / 旧调用方）。
*/
function mcpAppToolCallIndexKey(sessionId, toolCallId) {
	return sessionId ? `${sessionId}::${toolCallId}` : toolCallId;
}
function isPersistedCallToolResult(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
var AppGatewayService = class AppGatewayService {
	static {
		this.PENDING_TOOL_RESULTS_LIMIT = 256;
	}
	static {
		this.ORPHAN_PUBLISHED_LIMIT = 256;
	}
	constructor(deps) {
		this.deps = deps;
		this.instances = /* @__PURE__ */ new Map();
		this.toolCallIdToInstanceId = /* @__PURE__ */ new Map();
		this.pendingToolResults = /* @__PURE__ */ new Map();
		this.orphanPublishedToolResults = /* @__PURE__ */ new Set();
		this.orphanToolResultObservations = /* @__PURE__ */ new Map();
		this.openHostRequestedListeners = /* @__PURE__ */ new Set();
		this.openHostAppPromises = /* @__PURE__ */ new Map();
		this.pendingOpenHostApps = /* @__PURE__ */ new Map();
		this.agentToolCallPromises = /* @__PURE__ */ new Map();
		this.toolDiscoveryPromises = /* @__PURE__ */ new Map();
		this.cachedPreloadUrl = void 0;
		this.port = deps.getHttpPort;
		this.deps.mcpManager.onDidChangeApps(() => {
			const apps = this.deps.mcpManager.listApps();
			const live = new Set(apps.map((a) => a.mcpAppId));
			for (const [id, inst] of [...this.instances]) if (!live.has(inst.appId)) {
				this.dropInstance(id);
				this.deps.resolver.invalidate(inst.appId);
			}
		});
	}
	/**
	* Internal helper: remove an instance and its `toolCallId` reverse
	* index entry (if any). Used by both user-initiated close and the
	* App-removal path.
	*/
	dropInstance(appInstanceId) {
		if (!this.instances.get(appInstanceId)) return;
		this.instances.delete(appInstanceId);
		for (const [toolCallId, mappedId] of this.toolCallIdToInstanceId) if (mappedId === appInstanceId) this.toolCallIdToInstanceId.delete(toolCallId);
	}
	listApps() {
		return [...this.deps.mcpManager.listApps()];
	}
	async ensureToolDiscovered(params, options) {
		const existing = this.resolveAppDefinition(params);
		if (existing) return {
			found: true,
			app: existing
		};
		const key = params.appId ? `app:${params.appId}` : `tool:${params.prefixedToolName ?? ""}`;
		const pending = this.toolDiscoveryPromises.get(key);
		if (pending) return options?.wait === false ? { found: false } : pending;
		const task = this.ensureToolDiscoveredUncached(params).finally(() => {
			if (this.toolDiscoveryPromises.get(key) === task) this.toolDiscoveryPromises.delete(key);
		});
		this.toolDiscoveryPromises.set(key, task);
		if (options?.wait === false) return { found: false };
		return task;
	}
	listInstances() {
		return [...this.instances.values()].map((inst) => this.toExternalInstance(inst));
	}
	/** 列出当前 App 所属 MCP Server 的 Tool，并恢复为 Server 原始名称。 */
	listAppTools(appInstanceId) {
		const instance = this.requireInstance(appInstanceId);
		return { tools: (this.resolveInstanceClientEntry(instance)?.tools ?? []).map((tool) => ({
			name: this.unrouteAppToolName(instance, tool.name),
			description: tool.description,
			inputSchema: tool.inputSchema ?? {
				type: "object",
				properties: {}
			},
			_meta: tool._meta
		})) };
	}
	listAppResources(appInstanceId) {
		return { resources: this.resolveInstanceClientEntry(this.requireInstance(appInstanceId))?.resources ?? [] };
	}
	listAppResourceTemplates(appInstanceId) {
		return { resourceTemplates: this.resolveInstanceClientEntry(this.requireInstance(appInstanceId))?.resourceTemplates ?? [] };
	}
	listAppPrompts(appInstanceId) {
		return { prompts: this.resolveInstanceClientEntry(this.requireInstance(appInstanceId))?.prompts ?? [] };
	}
	getInstance(appInstanceId) {
		return this.instances.get(appInstanceId);
	}
	getAppViewResource(appInstanceId) {
		const instance = this.requireInstance(appInstanceId);
		const app = this.deps.mcpManager.findAppById(instance.appId);
		if (!app) throw new Error(`App definition for instance ${appInstanceId} no longer exists`);
		return {
			resourceUri: app.resourceUri,
			html: instance.html,
			uiMetadata: instance.uiMetadata
		};
	}
	/**
	* 只带缓存 HTML、没带同源 `_meta.ui` 时的兜底（旧 transcript 形态）。
	*
	* 失败即返回 undefined：补取不到也要让缓存 HTML 渲染出来，不能把离线回放一起废掉。
	*/
	async recoverUiMetadataForCachedHtml(app, options) {
		try {
			return (await this.deps.resolver.resolve(app, options)).uiMetadata;
		} catch (error) {
			mcpAppsDiag("openHostApp.uiMetadataRecoverFailed", {
				appId: app.mcpAppId,
				resourceUri: app.resourceUri,
				error: error instanceof Error ? error.message : String(error)
			});
			return;
		}
	}
	/**
	* Open (or reopen) an instance for the given app.
	*
	* Timing (aligned with design.md §"Agent Opens MCP App"): the initial
	* tool call runs IN PARALLEL with the UI resource fetch and the
	* webview mount. We start the tool call as soon as the target MCP
	* server is known, then return the instance metadata to the renderer
	* as soon as the HTML is ready so the webview can begin loading
	* immediately. The renderer awaits the tool result separately via
	* `awaitBootstrapToolResult` once the app sends
	* `ui/notifications/initialized`.
	*/
	async openHostApp(params) {
		if (!params.toolCallId) return this.createHostApp(params);
		const indexKey = mcpAppToolCallIndexKey(params.sessionId, params.toolCallId);
		const existingId = this.toolCallIdToInstanceId.get(indexKey);
		const existing = existingId ? this.instances.get(existingId) : void 0;
		if (existing) {
			this.applyConversationRequestId(existing, params.conversationRequestId);
			const toolResult = isPersistedCallToolResult(params.toolResult) ? params.toolResult : void 0;
			if (toolResult) this.captureToolResult(existing, toolResult);
			return this.toOpenHostAppResult(existing);
		}
		const pending = this.openHostAppPromises.get(indexKey);
		if (pending) {
			this.adoptInFlightToolResult(params);
			return pending;
		}
		const task = this.createHostApp(params).finally(() => {
			if (this.openHostAppPromises.get(indexKey) === task) this.openHostAppPromises.delete(indexKey);
			this.pendingOpenHostApps.delete(indexKey);
		});
		this.openHostAppPromises.set(indexKey, task);
		return task;
	}
	async createHostApp(params) {
		mcpAppsDiag("openHostApp.start", {
			appId: params.appId,
			prefixedToolName: params.prefixedToolName,
			sessionId: params.sessionId,
			toolCallId: params.toolCallId,
			bootstrapToolCall: params.bootstrapToolCall !== false,
			toolInput: params.toolInput
		});
		const app = await this.resolveAppDefinitionOrRetry(params);
		if (!app) throw new Error("Unknown MCP App: provide a valid appId or prefixedToolName");
		mcpAppsDiag("openHostApp.appResolved", {
			appId: app.mcpAppId,
			prefixedToolName: app.prefixedToolName,
			resourceUri: app.resourceUri,
			serverId: app.serverId,
			toolMeta: summarizeToolMeta(app.toolMeta)
		});
		const toolInput = {
			...extractSchemaDefaults(app.inputSchema),
			...params.toolInput ?? {}
		};
		if (!(this.deps.agentToolCallPolicy?.shouldMaterialize?.({
			appId: app.mcpAppId,
			toolCallId: params.toolCallId,
			sessionId: params.sessionId,
			toolInput
		}) ?? true)) {
			mcpAppsDiag("openHostApp.deferred", {
				reason: "product_live_open_identity_incomplete",
				appId: app.mcpAppId,
				sessionId: params.sessionId,
				toolCallId: params.toolCallId,
				toolInputKeys: Object.keys(toolInput)
			});
			throw new Error(`MCP App identity incomplete: ${app.mcpAppId}`);
		}
		const appInstanceId = (0, crypto.randomUUID)();
		if (params.toolCallId) {
			const pendingContext = {
				app,
				appInstanceId,
				params,
				toolInput
			};
			const indexKey = mcpAppToolCallIndexKey(params.sessionId, params.toolCallId);
			this.pendingOpenHostApps.set(indexKey, pendingContext);
			const pendingResult = this.pendingToolResults.get(indexKey) ?? this.pendingToolResults.get(params.toolCallId);
			if (pendingResult) this.publishOrphanToolResult(params, pendingResult);
		}
		let toolResultPromise;
		let toolResultResolver;
		const persistedToolResult = isPersistedCallToolResult(params.toolResult) ? params.toolResult : void 0;
		if (params.bootstrapToolCall === false) {
			if (persistedToolResult) toolResultPromise = Promise.resolve(persistedToolResult);
			else if (params.toolCallId) toolResultPromise = new Promise((resolve) => {
				toolResultResolver = resolve;
			});
		} else toolResultPromise = this.invokeInitialTool(app, toolInput, params.sessionId, params.projectId).catch((error) => {
			const message = error instanceof Error ? error.message : String(error);
			this.deps.logger.warn(`[McpAppsGateway] Initial tool call for ${app.mcpAppId} failed: ${message}`);
			return {
				content: [{
					type: "text",
					text: `MCP Apps initial tool call error: ${message}`
				}],
				isError: true
			};
		});
		let resolved;
		let uiMetadataSource;
		try {
			const cachedHtml = typeof params.html === "string" && params.html.length > 0 ? params.html : void 0;
			const resolveOptions = {
				sessionId: params.sessionId,
				projectId: params.projectId,
				variantKey: buildResolverVariantKey(toolInput)
			};
			if (!cachedHtml) {
				resolved = await this.deps.resolver.resolve(app, resolveOptions);
				uiMetadataSource = "live-read";
			} else if (params.uiMetadata) {
				resolved = {
					html: cachedHtml,
					mimeType: "text/html;profile=mcp-app",
					uiMetadata: params.uiMetadata
				};
				uiMetadataSource = "snapshot";
			} else {
				const recovered = await this.recoverUiMetadataForCachedHtml(app, resolveOptions);
				resolved = {
					html: cachedHtml,
					mimeType: "text/html;profile=mcp-app",
					uiMetadata: recovered
				};
				uiMetadataSource = recovered ? "recovered" : "unavailable";
			}
		} catch (error) {
			this.publishOrphanToolResultFromParamsOrPending(params);
			throw error;
		}
		resolved = {
			...resolved,
			html: await injectLocalFileViewerSrc({
				html: resolved.html,
				app,
				declaration: resolved.workbuddyUiMetadata?.localFileViewer,
				toolInput,
				deps: {
					staticHtmlServer: this.deps.getStaticHtmlServer?.(),
					resolveBundledAsset: this.deps.resolveBundledAsset
				}
			})
		};
		const instance = this.buildInstance(appInstanceId, app, resolved, params, toolInput);
		instance.toolResultPromise = toolResultPromise;
		instance.toolResultResolver = toolResultResolver;
		if (persistedToolResult) {
			instance.toolResult = persistedToolResult;
			instance.toolResultObserved = true;
		} else if (toolResultPromise) toolResultPromise.then((result) => {
			if (this.instances.get(appInstanceId) === instance) this.captureToolResult(instance, result);
		});
		this.adoptOrphanToolResultObservation(instance);
		this.instances.set(appInstanceId, instance);
		if (params.toolCallId) {
			this.toolCallIdToInstanceId.set(mcpAppToolCallIndexKey(params.sessionId, params.toolCallId), appInstanceId);
			if (!persistedToolResult) this.drainPendingToolResult(params.sessionId, params.toolCallId);
		}
		mcpAppsDiag("openHostApp.created", {
			appInstanceId,
			appId: app.mcpAppId,
			prefixedToolName: app.prefixedToolName,
			resourceUri: app.resourceUri,
			htmlLen: resolved.html.length,
			toolCallId: params.toolCallId ?? "(none)",
			sessionId: params.sessionId,
			appUrl: instance.appUrl,
			sandboxUrl: instance.sandboxUrl,
			toolMeta: summarizeToolMeta(app.toolMeta),
			uiMetadata: instance.uiMetadata,
			uiMetadataSource,
			toolInput: instance.toolInput
		});
		return {
			appInstanceId,
			appId: app.mcpAppId,
			mcpAppName: app.mcpAppName,
			appUrl: instance.appUrl,
			sandboxUrl: instance.sandboxUrl,
			preloadUrl: instance.preloadUrl,
			uiMetadata: instance.uiMetadata,
			toolMeta: app.toolMeta,
			toolInput: instance.toolInput,
			toolResult: persistedToolResult
		};
	}
	/**
	* Wait for the initial tool call to complete for the given instance.
	*
	* Two production paths feed this promise (see `StoredInstance.
	* toolResultPromise`): host-driven bootstrap and adapter-driven
	* `pushToolResult`. Returns `undefined` only when the caller
	* explicitly passed `bootstrapToolCall: false` AND no
	* `pushToolResult` has landed yet — i.e. the externally-resolvable
	* promise is still pending (it resolves when the adapter delivers
	* `tool_call_update(completed)`).
	*
	* Rejects if the instance is unknown (e.g. closed by the user
	* before the renderer could ask).
	*/
	async awaitBootstrapToolResult(appInstanceId) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		if (!instance.toolResultPromise) return;
		return instance.toolResultPromise;
	}
	/**
	* Feed a tool result into an instance's `toolResultPromise`.
	*
	* Used by the Agent Loop adapter when a `tool_call_update(status=
	* completed)` arrives: the adapter forwards the result here via
	* RPC, and this routes it to the instance opened earlier for the
	* same `toolCallId`.
	*
	* Returns `true` when a matching instance was found and the
	* promise was resolved, `false` otherwise (unknown id, or a
	* previous result already settled the promise — re-entrant
	* `tool_call_update` notifications MUST NOT overwrite a settled
	* value, per the MCP Apps spec).
	*/
	pushToolResult(key, result) {
		const instance = this.findInstanceForPush(key);
		if (!instance) {
			if (key.toolCallId) {
				const bufferKey = mcpAppToolCallIndexKey(key.sessionId, key.toolCallId);
				this.bufferPendingToolResult(bufferKey, result);
				const pendingContext = this.findPendingOpenHostApp(key);
				if (pendingContext) this.publishOrphanToolResult(pendingContext.params, result);
				mcpAppsDiag("pushToolResult.buffered", {
					toolCallId: key.toolCallId,
					sessionId: key.sessionId,
					bufferKey,
					result: summarizeMcpResult(result)
				});
			} else mcpAppsDiag("pushToolResult.dropped", {
				key,
				result: summarizeMcpResult(result)
			});
			return false;
		}
		const normalizedResult = this.normalizeToolResultForGuest(instance, result);
		if (!instance.toolResultResolver) {
			if (!instance.toolResultObserved && !instance.toolResultObserverPromise) this.captureToolResult(instance, normalizedResult);
			mcpAppsDiag("pushToolResult.alreadySettled", {
				toolCallId: key.toolCallId,
				appInstanceId: instance.appInstanceId,
				appId: instance.appId
			});
			return false;
		}
		const resolver = instance.toolResultResolver;
		instance.toolResultResolver = void 0;
		resolver(normalizedResult);
		this.captureToolResult(instance, normalizedResult);
		mcpAppsDiag("pushToolResult.ok", {
			toolCallId: key.toolCallId,
			appInstanceId: instance.appInstanceId,
			appId: instance.appId,
			result: summarizeMcpResult(normalizedResult)
		});
		return true;
	}
	/**
	* Artifact observer 同时拥有产品结果归一规则；Gateway 只负责在 Guest 首包前调用。
	* 归一失败时保留原结果，不能让可选的产品增强阻断标准 MCP Apps 回灌。
	*/
	normalizeToolResultForGuest(instance, result) {
		return this.normalizeToolResultForApp(instance.appId, instance.toolInput, result);
	}
	normalizeToolResultForApp(appId, toolInput, result) {
		const observer = this.deps.toolResultObserver;
		if (!observer?.normalizeToolResult) return result;
		try {
			return observer.normalizeToolResult({
				appId,
				toolInput,
				toolResult: result
			});
		} catch (error) {
			this.deps.logger.warn(`[McpAppsGateway] normalize tool result failed for ${appId}:`, error);
			return result;
		}
	}
	/**
	* 补录对话轮次 id。若 ToolResult 已观察落盘但当时缺 requestId，优先走轻量 patch，
	* 避免非 Ardot 面板 App 整卡重写 + 再次 publish 导致 UI 抖动。
	*/
	applyConversationRequestId(instance, conversationRequestId) {
		if (!conversationRequestId || instance.conversationRequestId) return;
		instance.conversationRequestId = conversationRequestId;
		if (!instance.toolResultObserved || !instance.toolResult || instance.toolResultObserverPromise) return;
		const observer = this.deps.toolResultObserver;
		if (observer?.patchConversationRequestId) {
			const task = Promise.resolve(observer.patchConversationRequestId({
				appId: instance.appId,
				appInstanceId: instance.appInstanceId,
				sessionId: instance.sessionId,
				toolCallId: instance.toolCallId,
				toolInput: instance.toolInput,
				toolResult: instance.toolResult,
				toolMeta: instance.toolMeta,
				conversationRequestId
			})).catch((error) => {
				this.deps.logger.warn(`[McpAppsGateway] patch conversationRequestId failed for ${instance.appId}:`, error);
			});
			instance.toolResultObserverPromise = task.finally(() => {
				if (instance.toolResultObserverPromise === task) instance.toolResultObserverPromise = void 0;
			});
			return;
		}
		instance.toolResultObserved = false;
		this.captureToolResult(instance, instance.toolResult);
	}
	captureToolResult(instance, result) {
		instance.toolResult = result;
		if (instance.toolResultObserved || instance.toolResultObserverPromise) return;
		const observer = this.deps.toolResultObserver;
		if (!observer) return;
		const task = Promise.resolve(observer.onToolResult({
			appId: instance.appId,
			appInstanceId: instance.appInstanceId,
			sessionId: instance.sessionId,
			toolCallId: instance.toolCallId,
			toolInput: instance.toolInput,
			toolResult: result,
			toolMeta: instance.toolMeta,
			conversationRequestId: instance.conversationRequestId,
			...typeof instance.html === "string" && instance.html.length > 0 ? { html: instance.html } : {}
		})).then(() => {
			instance.toolResultObserved = true;
		}).catch((error) => {
			this.deps.logger.warn(`[McpAppsGateway] tool result observer failed for ${instance.appId}:`, error);
		}).finally(() => {
			if (instance.toolResultObserverPromise === task) instance.toolResultObserverPromise = void 0;
		});
		instance.toolResultObserverPromise = task;
	}
	bufferPendingToolResult(toolCallId, result) {
		if (this.pendingToolResults.size >= AppGatewayService.PENDING_TOOL_RESULTS_LIMIT) {
			const oldest = this.pendingToolResults.keys().next().value;
			if (oldest) this.pendingToolResults.delete(oldest);
		}
		this.pendingToolResults.set(toolCallId, result);
	}
	drainPendingToolResult(sessionId, toolCallId) {
		const indexKey = mcpAppToolCallIndexKey(sessionId, toolCallId);
		const pending = this.pendingToolResults.get(indexKey) ?? this.pendingToolResults.get(toolCallId);
		if (!pending) return;
		this.pendingToolResults.delete(indexKey);
		this.pendingToolResults.delete(toolCallId);
		this.pushToolResult({
			toolCallId,
			sessionId
		}, pending);
	}
	/**
	* 同一 toolCall 的 openHostApp 已在飞：后来的调用若带 ToolResult，先缓冲并
	* 立刻 publish 产物卡，不要等 hung 的 resources/read。
	*/
	adoptInFlightToolResult(params) {
		const toolResult = isPersistedCallToolResult(params.toolResult) ? params.toolResult : void 0;
		if (!toolResult || !params.toolCallId) return;
		const indexKey = mcpAppToolCallIndexKey(params.sessionId, params.toolCallId);
		this.bufferPendingToolResult(indexKey, toolResult);
		this.publishOrphanToolResult(params, toolResult);
		mcpAppsDiag("openHostApp.adoptInFlightToolResult", {
			sessionId: params.sessionId,
			toolCallId: params.toolCallId,
			appId: params.appId,
			prefixedToolName: params.prefixedToolName,
			result: summarizeMcpResult(toolResult)
		});
	}
	publishOrphanToolResultFromParamsOrPending(params) {
		const fromParams = isPersistedCallToolResult(params.toolResult) ? params.toolResult : void 0;
		const fromPending = params.toolCallId ? this.pendingToolResults.get(mcpAppToolCallIndexKey(params.sessionId, params.toolCallId)) ?? this.pendingToolResults.get(params.toolCallId) : void 0;
		const toolResult = fromParams ?? fromPending;
		if (!toolResult) return;
		this.publishOrphanToolResult(params, toolResult);
	}
	/**
	* 实例尚未落地（resolve 卡住或失败）时仍把 panel 产物卡写出去。
	* Ardot 用 fileId 做 URI，不依赖 appInstanceId。
	*/
	publishOrphanToolResult(params, toolResult) {
		const observer = this.deps.toolResultObserver;
		if (!observer || !params.sessionId) return;
		const pendingContext = params.toolCallId ? this.findPendingOpenHostApp({
			sessionId: params.sessionId,
			toolCallId: params.toolCallId
		}) : void 0;
		const app = pendingContext?.app ?? this.resolveAppDefinition(params);
		if (!app) return;
		const publishKey = params.toolCallId ? mcpAppToolCallIndexKey(params.sessionId, params.toolCallId) : `${params.sessionId}::${app.mcpAppId}`;
		if (this.orphanPublishedToolResults.has(publishKey)) return;
		this.orphanPublishedToolResults.add(publishKey);
		if (this.orphanPublishedToolResults.size > AppGatewayService.ORPHAN_PUBLISHED_LIMIT) {
			const oldest = this.orphanPublishedToolResults.values().next().value;
			if (oldest) {
				this.orphanPublishedToolResults.delete(oldest);
				this.orphanToolResultObservations.delete(oldest);
			}
		}
		const normalizedResult = this.normalizeToolResultForApp(app.mcpAppId, pendingContext?.toolInput ?? params.toolInput, toolResult);
		mcpAppsDiag("openHostApp.orphanToolResult", {
			sessionId: params.sessionId,
			toolCallId: params.toolCallId,
			appId: app.mcpAppId,
			result: summarizeMcpResult(normalizedResult)
		});
		const observation = {
			promise: Promise.resolve(),
			status: "pending"
		};
		observation.promise = Promise.resolve().then(() => observer.onToolResult({
			appId: app.mcpAppId,
			appInstanceId: pendingContext?.appInstanceId ?? params.toolCallId ?? "",
			sessionId: params.sessionId,
			toolCallId: params.toolCallId,
			toolInput: pendingContext?.toolInput ?? params.toolInput,
			toolResult: normalizedResult,
			toolMeta: app.toolMeta,
			conversationRequestId: params.conversationRequestId
		})).then(() => {
			observation.status = "succeeded";
		}).catch((error) => {
			observation.status = "failed";
			this.orphanPublishedToolResults.delete(publishKey);
			this.deps.logger.warn(`[McpAppsGateway] orphan tool result observer failed for ${app.mcpAppId}:`, error);
		});
		this.orphanToolResultObservations.set(publishKey, observation);
	}
	findPendingOpenHostApp(key) {
		if (!key.toolCallId) return;
		if (key.sessionId) {
			const scoped = this.pendingOpenHostApps.get(mcpAppToolCallIndexKey(key.sessionId, key.toolCallId));
			if (scoped) return scoped;
		}
		let matched;
		for (const context of this.pendingOpenHostApps.values()) if (context.params.toolCallId === key.toolCallId) matched = context;
		return matched;
	}
	adoptOrphanToolResultObservation(instance) {
		if (!instance.toolCallId) return;
		const publishKey = mcpAppToolCallIndexKey(instance.sessionId, instance.toolCallId);
		const observation = this.orphanToolResultObservations.get(publishKey);
		if (!observation) return;
		if (observation.status === "succeeded") {
			instance.toolResultObserved = true;
			this.orphanToolResultObservations.delete(publishKey);
			return;
		}
		if (observation.status === "failed") {
			this.orphanToolResultObservations.delete(publishKey);
			return;
		}
		const task = observation.promise.then(() => {
			if (observation.status === "succeeded") instance.toolResultObserved = true;
		}).finally(() => {
			if (instance.toolResultObserverPromise === task) instance.toolResultObserverPromise = void 0;
			this.orphanToolResultObservations.delete(publishKey);
			if (observation.status === "failed" && instance.toolResult && !instance.toolResultObserved) this.captureToolResult(instance, instance.toolResult);
		});
		instance.toolResultObserverPromise = task;
	}
	/**
	* Handle an Agent Loop `tool_call` notification forwarded from the
	* renderer adapter. Looks up the tool in McpManager's current objects:
	*
	* - If the tool is NOT app-capable, returns `{ handled: false }`
	*   and leaves no trace. This is by far the common case (most
	*   `tool_call` events are regular MCP tools, not apps).
	* - If app-capable, opens an instance via `openHostApp` with
	*   `bootstrapToolCall: false` (we expect the Agent to drive the
	*   tool call; we just wait for its result), records the
	*   `toolCallId -> instanceId` pairing, and broadcasts the
	*   instance descriptor to all `onOpenHostRequested` listeners
	*   so the renderer can pop the detail panel and mount the webview.
	*
	* Idempotent on `(sessionId, toolCallId)`: a second call for the
	* same pair returns the already-created instance without re-opening.
	* (Agents occasionally replay tool_call events; we don't want to
	* double-mount.) Identical `toolCallId` strings from **different**
	* sessions open separate instances — cli counters collide across
	* sessions by design.
	*/
	async handleAgentToolCall(params) {
		const indexKey = params.toolCallId ? mcpAppToolCallIndexKey(params.sessionId, params.toolCallId) : void 0;
		const pending = indexKey ? this.agentToolCallPromises.get(indexKey) : void 0;
		if (pending) return pending;
		const task = this.processAgentToolCall(params).finally(() => {
			if (indexKey && this.agentToolCallPromises.get(indexKey) === task) this.agentToolCallPromises.delete(indexKey);
		});
		if (indexKey) this.agentToolCallPromises.set(indexKey, task);
		return task;
	}
	async processAgentToolCall(params) {
		if (!params.toolCallId || !params.prefixedToolName) {
			mcpAppsDiag("handleAgentToolCall.invalid", { params });
			return { handled: false };
		}
		const indexKey = mcpAppToolCallIndexKey(params.sessionId, params.toolCallId);
		const existing = this.toolCallIdToInstanceId.get(indexKey);
		if (existing) {
			const instance = this.instances.get(existing);
			if (instance) {
				this.applyConversationRequestId(instance, params.conversationRequestId);
				mcpAppsDiag("handleAgentToolCall.idempotent", {
					toolCallId: params.toolCallId,
					sessionId: params.sessionId,
					indexKey,
					prefixedToolName: params.prefixedToolName,
					appInstanceId: existing,
					appId: instance.appId
				});
				return {
					handled: true,
					appInstanceId: existing,
					descriptor: this.toOpenHostAppResult(instance)
				};
			}
			this.toolCallIdToInstanceId.delete(indexKey);
		}
		const app = this.deps.mcpManager.findAppByToolName(params.prefixedToolName);
		if (!app) {
			this.ensureToolDiscovered({ prefixedToolName: params.prefixedToolName }).catch((error) => {
				const message = error instanceof Error ? error.message : String(error);
				this.deps.logger.warn(`[McpAppsGateway] ensureToolDiscovered failed: ${message}`);
				mcpAppsDiag("handleAgentToolCall.ensureToolDiscovered.error", {
					toolCallId: params.toolCallId,
					prefixedToolName: params.prefixedToolName,
					sessionId: params.sessionId,
					error: message
				});
			});
			mcpAppsDiag("handleAgentToolCall.catalogMiss", {
				toolCallId: params.toolCallId,
				prefixedToolName: params.prefixedToolName,
				sessionId: params.sessionId,
				catalogHit: false,
				reason: "tool_not_in_mcp_apps_catalog_missing_ui_resourceUri_or_unknown",
				liveApps: this.deps.mcpManager.listApps().map((item) => ({
					appId: item.mcpAppId,
					prefixedToolName: item.prefixedToolName,
					resourceUri: item.resourceUri
				})),
				rawInput: params.rawInput
			});
			return { handled: false };
		}
		if (!(this.deps.agentToolCallPolicy?.shouldMaterialize?.({
			appId: app.mcpAppId,
			toolCallId: params.toolCallId,
			sessionId: params.sessionId,
			toolInput: params.rawInput
		}) ?? true)) {
			mcpAppsDiag("handleAgentToolCall.deferred", {
				reason: "product_live_open_identity_incomplete",
				toolCallId: params.toolCallId,
				prefixedToolName: params.prefixedToolName,
				appId: app.mcpAppId,
				sessionId: params.sessionId,
				toolInputKeys: params.rawInput ? Object.keys(params.rawInput) : []
			});
			return { handled: false };
		}
		mcpAppsDiag("handleAgentToolCall.catalogHit", {
			toolCallId: params.toolCallId,
			prefixedToolName: params.prefixedToolName,
			catalogHit: true,
			appId: app.mcpAppId,
			resourceUri: app.resourceUri,
			toolMeta: summarizeToolMeta(app.toolMeta),
			sessionId: params.sessionId,
			rawInput: params.rawInput
		});
		const bootstrapToolCall = this.deps.agentToolCallPolicy?.shouldHostBootstrap({
			appId: app.mcpAppId,
			toolCallId: params.toolCallId,
			sessionId: params.sessionId,
			toolInput: params.rawInput
		}) ?? false;
		const descriptor = await this.openHostApp({
			prefixedToolName: app.prefixedToolName,
			sessionId: params.sessionId,
			projectId: params.projectId,
			toolCallId: params.toolCallId,
			toolInput: params.rawInput,
			bootstrapToolCall,
			conversationRequestId: params.conversationRequestId
		});
		this.drainPendingToolResult(params.sessionId, params.toolCallId);
		const payload = {
			...descriptor,
			toolCallId: params.toolCallId,
			sessionId: params.sessionId,
			projectId: params.projectId
		};
		this.emitOpenHostRequested(payload);
		mcpAppsDiag("handleAgentToolCall.opened", {
			toolCallId: params.toolCallId,
			appInstanceId: descriptor.appInstanceId,
			appId: descriptor.appId,
			sandboxUrl: descriptor.sandboxUrl,
			bootstrapToolCall
		});
		return {
			handled: true,
			appInstanceId: descriptor.appInstanceId,
			descriptor
		};
	}
	/**
	* Register a listener for gateway-initiated "please open this app"
	* events. Returns an unsubscribe function. The server handler
	* wiring connects this to the daemon server push channel.
	*/
	onOpenHostRequested(listener) {
		this.openHostRequestedListeners.add(listener);
		return () => {
			this.openHostRequestedListeners.delete(listener);
		};
	}
	emitOpenHostRequested(payload) {
		mcpAppsDiag("openHostRequested.emit", {
			listenerCount: this.openHostRequestedListeners.size,
			appInstanceId: payload.appInstanceId,
			appId: payload.appId,
			toolCallId: payload.toolCallId,
			sessionId: payload.sessionId,
			sandboxUrl: payload.sandboxUrl,
			toolMeta: summarizeToolMeta(payload.toolMeta)
		});
		for (const listener of this.openHostRequestedListeners) try {
			listener(payload);
		} catch (err) {
			this.deps.logger.warn("[McpAppsGateway] onOpenHostRequested listener threw:", err);
			mcpAppsDiag("openHostRequested.listenerError", { error: err instanceof Error ? err.message : String(err) });
		}
	}
	findInstanceForPush(key) {
		if (key.appInstanceId) return this.instances.get(key.appInstanceId);
		if (!key.toolCallId) return;
		const scopedId = this.toolCallIdToInstanceId.get(mcpAppToolCallIndexKey(key.sessionId, key.toolCallId));
		if (scopedId) {
			const scoped = this.instances.get(scopedId);
			if (scoped) return scoped;
		}
		let unsettled;
		let settled;
		for (const instance of this.instances.values()) {
			if (instance.toolCallId !== key.toolCallId) continue;
			if (key.sessionId && instance.sessionId && instance.sessionId !== key.sessionId) continue;
			if (instance.toolResultResolver) unsettled = instance;
			else settled = instance;
		}
		return unsettled ?? settled;
	}
	toOpenHostAppResult(instance) {
		const app = this.deps.mcpManager.findAppById(instance.appId);
		return {
			appInstanceId: instance.appInstanceId,
			appId: instance.appId,
			mcpAppName: app?.mcpAppName ?? instance.appId,
			appUrl: instance.appUrl,
			sandboxUrl: instance.sandboxUrl,
			preloadUrl: instance.preloadUrl,
			uiMetadata: instance.uiMetadata,
			toolMeta: app?.toolMeta,
			toolInput: instance.toolInput,
			toolResult: void 0
		};
	}
	/** Re-fetch the latest tool result for an already-open instance. */
	async refreshToolResult(appInstanceId, toolInput) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		const app = this.deps.mcpManager.findAppById(instance.appId);
		if (!app) throw new Error(`App definition for instance ${appInstanceId} no longer exists`);
		const input = toolInput ?? instance.toolInput;
		const result = await this.invokeInitialTool(app, input, instance.sessionId, instance.projectId);
		instance.toolInput = input;
		this.captureToolResult(instance, result);
		return result;
	}
	/** Route an app-visible native tool name to the app's own V2 server. */
	async proxyAppToolCall(appInstanceId, toolName, args) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) {
			mcpAppsDiag("proxyAppToolCall.unknownInstance", {
				appInstanceId,
				toolName
			});
			throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		}
		const app = this.deps.mcpManager.findAppById(instance.appId);
		if (!app) throw new Error(`App definition for instance ${appInstanceId} no longer exists`);
		mcpAppsDiag("proxyAppToolCall.start", {
			appInstanceId,
			appId: instance.appId,
			toolName,
			configId: app.configId,
			args,
			sessionId: instance.sessionId,
			direction: "Guest→Host→MCP Server tools/call"
		});
		try {
			const result = await this.deps.mcpManager.callAppTool(app.mcpAppId, toolName, args ?? {}, {
				sessionId: instance.sessionId,
				projectId: instance.projectId
			});
			mcpAppsDiag("proxyAppToolCall.ok", {
				appInstanceId,
				toolName,
				result: summarizeMcpResult(result)
			});
			return result;
		} catch (error) {
			mcpAppsDiag("proxyAppToolCall.error", {
				appInstanceId,
				toolName,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}
	unrouteAppToolName(instance, prefixedToolName) {
		const prefix = instance.toolName && instance.prefixedToolName.endsWith(instance.toolName) ? instance.prefixedToolName.slice(0, instance.prefixedToolName.length - instance.toolName.length) : "";
		return prefix && prefixedToolName.startsWith(prefix) ? prefixedToolName.slice(prefix.length) : prefixedToolName;
	}
	requireInstance(appInstanceId) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		return instance;
	}
	resolveInstanceClientEntry(instance) {
		const app = this.deps.mcpManager.findAppById(instance.appId);
		if (!app) return;
		return {
			tools: this.deps.mcpManager.listAppServerTools(app.mcpAppId).map((tool) => ({
				name: tool.name,
				description: tool.description,
				inputSchema: tool.inputSchema ?? {
					type: "object",
					properties: {}
				},
				_meta: tool._meta
			})),
			resources: [],
			resourceTemplates: [],
			prompts: []
		};
	}
	/** Proxy a `resources/read` from the app to its owning connector. */
	async proxyAppResourceRead(appInstanceId, uri) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) {
			mcpAppsDiag("proxyAppResourceRead.unknownInstance", {
				appInstanceId,
				uri
			});
			throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		}
		const app = this.deps.mcpManager.findAppById(instance.appId);
		if (!app) {
			mcpAppsDiag("proxyAppResourceRead.missingAppDef", {
				appInstanceId,
				uri,
				appId: instance.appId
			});
			throw new Error(`App definition for instance ${appInstanceId} no longer exists`);
		}
		mcpAppsDiag("proxyAppResourceRead.start", {
			appInstanceId,
			appId: app.mcpAppId,
			prefixedToolName: app.prefixedToolName,
			uri,
			direction: "Guest→Host→MCP Server resources/read"
		});
		try {
			const result = await this.deps.mcpManager.readAppResource(app.mcpAppId, uri, {
				sessionId: instance.sessionId,
				projectId: instance.projectId
			});
			mcpAppsDiag("proxyAppResourceRead.ok", {
				appInstanceId,
				uri,
				result: summarizeMcpResult(result)
			});
			return result;
		} catch (error) {
			mcpAppsDiag("proxyAppResourceRead.error", {
				appInstanceId,
				uri,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}
	/**
	* Record the latest `ui/update-model-context` payload for an
	* instance. The renderer bridge already fires the event and
	* inserts the content blocks into the composer; this call is the
	* main-side mirror so later surfaces (debug panel, history replay,
	* multi-window) can look up the same payload without round-tripping
	* through the renderer.
	*
	* Returns `true` when a matching instance was updated, `false`
	* when the instance is unknown (closed / never opened). Never
	* throws — the renderer best-effort fires this and a lost
	* update must not tear down the bridge.
	*/
	recordModelContextUpdate(appInstanceId, update) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) return false;
		instance.lastModelContextUpdate = {
			timestamp: Date.now(),
			...update.content ? { content: update.content } : {},
			...update.structuredContent ? { structuredContent: update.structuredContent } : {}
		};
		return true;
	}
	/**
	* Return the most recent `ui/update-model-context` payload for a
	* given instance, or `undefined` when the instance is unknown or
	* the app has not emitted any context updates yet.
	*/
	getModelContextUpdate(appInstanceId) {
		return this.instances.get(appInstanceId)?.lastModelContextUpdate;
	}
	async getToken(appInstanceId) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) throw new Error(`Unknown MCP App instance: ${appInstanceId}`);
		if (!this.deps.accessTokenProvider) throw new Error("MCP App access token provider is not configured");
		return this.deps.accessTokenProvider.getToken({
			appId: instance.appId,
			appInstanceId,
			sessionId: instance.sessionId
		});
	}
	closeInstance(appInstanceId) {
		const instance = this.instances.get(appInstanceId);
		if (!instance) {
			mcpAppsDiag("closeInstance.missing", { appInstanceId });
			return;
		}
		mcpAppsDiag("closeInstance", {
			appInstanceId,
			appId: instance.appId,
			sessionId: instance.sessionId,
			toolCallId: instance.toolCallId
		});
		this.dropInstance(appInstanceId);
		this.deps.resolver.invalidate(instance.appId);
	}
	resolveAppDefinition(params) {
		if (params.appId) return this.deps.mcpManager.findAppById(params.appId);
		if (params.prefixedToolName) return this.deps.mcpManager.findAppByToolName(params.prefixedToolName);
	}
	/**
	* Manager miss 时：建联 hook → 直接重查当前对象 → 有界等待变更，再查一次。
	* 历史产物点卡走这条路径；不要在查不到时立刻抛 Unknown MCP App。
	*/
	async resolveAppDefinitionOrRetry(params) {
		return (await this.ensureToolDiscovered(params)).app;
	}
	async ensureToolDiscoveredUncached(params) {
		this.logUnknownApp(params, "initial");
		if (this.deps.ensureUnknownAppReady) try {
			await this.deps.ensureUnknownAppReady({
				appId: params.appId,
				prefixedToolName: params.prefixedToolName
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.deps.logger.warn(`[McpAppsGateway] ensureUnknownAppReady failed: ${message}`);
			mcpAppsDiag("openHostApp.ensureUnknownAppReady.failed", {
				appId: params.appId,
				prefixedToolName: params.prefixedToolName,
				error: message
			});
		}
		const afterRefresh = this.resolveAppDefinition(params);
		if (afterRefresh) {
			mcpAppsDiag("openHostApp.unknownApp.recovered", {
				appId: afterRefresh.mcpAppId,
				via: "refresh"
			});
			return {
				found: true,
				app: afterRefresh
			};
		}
		const afterWait = await this.waitForAppDefinition(params);
		if (afterWait) {
			mcpAppsDiag("openHostApp.unknownApp.recovered", {
				appId: afterWait.mcpAppId,
				via: "manager.onDidChangeApps"
			});
			return {
				found: true,
				app: afterWait
			};
		}
		this.logUnknownApp(params, "retry");
		return { found: false };
	}
	waitForAppDefinition(params) {
		const timeoutMs = this.deps.unknownAppRetryTimeoutMs ?? DEFAULT_UNKNOWN_APP_RETRY_TIMEOUT_MS;
		const immediate = this.resolveAppDefinition(params);
		if (immediate) return Promise.resolve(immediate);
		return new Promise((resolve) => {
			const timer = setTimeout(() => {
				subscription.dispose();
				resolve(this.resolveAppDefinition(params));
			}, timeoutMs);
			const subscription = this.deps.mcpManager.onDidChangeApps(() => {
				const found = this.resolveAppDefinition(params);
				if (found) {
					clearTimeout(timer);
					subscription.dispose();
					resolve(found);
				}
			});
		});
	}
	logUnknownApp(params, attempt) {
		mcpAppsDiag("openHostApp.unknownApp", {
			attempt,
			appId: params.appId,
			prefixedToolName: params.prefixedToolName,
			catalogSize: this.deps.mcpManager.listApps().length,
			liveApps: this.deps.mcpManager.listApps().map((item) => item.mcpAppId)
		});
	}
	buildInstance(appInstanceId, app, resolved, params, toolInput) {
		const port = this.port();
		return {
			appInstanceId,
			appId: app.mcpAppId,
			serverId: app.serverId,
			toolName: app.toolName,
			prefixedToolName: app.prefixedToolName,
			sessionId: params.sessionId,
			projectId: params.projectId,
			toolCallId: params.toolCallId,
			...params.conversationRequestId ? { conversationRequestId: params.conversationRequestId } : {},
			appUrl: `http://127.0.0.1:${port}/mcp-apps/${appInstanceId}/app.html`,
			sandboxUrl: `http://127.0.0.1:${port}${require_handlers.MCP_APPS_SANDBOX_PROXY_PATH}`,
			preloadUrl: this.resolvePreloadUrl(),
			uiMetadata: resolved.uiMetadata,
			toolMeta: app.toolMeta,
			toolInput,
			toolResult: void 0,
			createdAt: Date.now(),
			html: resolved.html
		};
	}
	/**
	* Resolve the `file://` URL of the MCP Apps webview preload bridge.
	*
	* Prefers the caller-supplied override (tests, alternate packaging);
	* otherwise looks up `mcp-app-preload.js` via the shared bundled-
	* asset resolver, which handles both dev and packaged layouts.
	*
	* Resolved sources by environment:
	*   - dev: the build-time `syncBundledRuntimeAssets()` plugin
	*     (`electron.vite.config.ts`) copies the source preload script
	*     into `dist/resources/`. The resolver's
	*     `<root>/../resources/<seg>` candidate picks it up, with the
	*     source `resources/` folder remaining a fallback for
	*     uncompiled trees.
	*   - packaged: `electron-builder.config.js` ships the dist tree
	*     remapped to the app root, and the preload is additionally
	*     marked `asarUnpack` in `scripts/bundled-assets-manifest.js`
	*     so it is served from
	*     `<resourcesPath>/app.asar.unpacked/resources/mcp-app-preload.js`
	*     via the resolver's `app.asar.unpacked` candidates.
	*
	* When resolution fails, the warning below carries enough context
	* (`process.resourcesPath`) to triage the packaging regression in
	* a single log line. A missing preload silently manifests as
	* white-screened / data-less / `-32601` apps, so it is worth
	* emphasizing in logs.
	*/
	resolvePreloadUrl() {
		if (this.cachedPreloadUrl !== void 0) return this.cachedPreloadUrl ?? void 0;
		const override = this.deps.getPreloadUrl?.();
		if (typeof override === "string" && override.length > 0) {
			this.cachedPreloadUrl = override;
			return override;
		}
		try {
			const absolute = this.deps.resolveBundledAsset?.("mcp-app-preload.js");
			if (absolute) {
				const url$2 = (0, url.pathToFileURL)(absolute).toString();
				this.cachedPreloadUrl = url$2;
				return url$2;
			}
		} catch (error) {
			this.deps.logger.warn("[McpAppsGateway] Failed to resolve MCP App preload:", error);
		}
		const resourcesPathValue = process.resourcesPath;
		const resourcesPath = typeof resourcesPathValue === "string" && resourcesPathValue.length > 0 ? resourcesPathValue : "(unset)";
		this.deps.logger.warn(`[McpAppsGateway] mcp-app-preload.js not found; webview bridge will not work. process.resourcesPath=${resourcesPath}. Confirm \`dist/resources/mcp-app-preload.js\` is present after build (see \`scripts/bundled-assets-manifest.js\` → runtimeAssetFiles) and that the electron-builder asarUnpack entry is intact.`);
		this.cachedPreloadUrl = null;
	}
	/**
	* Perform the host-driven initial tool call. Tool authors who want
	* their app to render something meaningful without explicit agent
	* input should declare schema defaults — those are already merged
	* into `toolInput` by `openHostApp`.
	*/
	async invokeInitialTool(app, toolInput, sessionId, projectId) {
		mcpAppsDiag("invokeInitialTool.start", {
			appId: app.mcpAppId,
			prefixedToolName: app.prefixedToolName,
			toolInput,
			sessionId,
			direction: "Host→MCP Server tools/call (bootstrap)"
		});
		try {
			const result = await this.deps.mcpManager.callAppTool(app.mcpAppId, app.toolName, toolInput ?? {}, {
				sessionId,
				projectId
			});
			mcpAppsDiag("invokeInitialTool.ok", {
				appId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName,
				result: summarizeMcpResult(result)
			});
			if (result && typeof result === "object") return result;
			return { content: [{
				type: "text",
				text: typeof result === "string" ? result : JSON.stringify(result)
			}] };
		} catch (error) {
			mcpAppsDiag("invokeInitialTool.error", {
				appId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}
	toExternalInstance(instance) {
		const external = { ...instance };
		delete external.html;
		return external;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/http-server.ts
var ROUTE_PREFIX$1 = "/mcp-apps/";
var APP_HTML_SUFFIX = "/app.html";
/**
* Sanitize a domain entry before it is concatenated into a CSP header.
* Rejects anything containing characters that could:
*  - `;` or newlines: break out to a new CSP directive
*  - single/double quote: inject CSP keywords like `'unsafe-eval'`
*  - whitespace: inject multiple sources in one entry
*
* Mirrors `sanitizeCspDomains` in the official `basic-host` example.
*/
function sanitizeCspDomains(domains) {
	if (!Array.isArray(domains)) return [];
	return domains.filter((d) => typeof d === "string" && !/[;\r\n'" ]/.test(d));
}
/**
* Build a CSP header that matches the MCP Apps reference host
* (`ext-apps/examples/basic-host/serve.ts`). Directive rationale:
*
* - `default-src 'self' 'unsafe-inline'`: directives we don't name (e.g.
*   `manifest-src`, `prefetch-src`) inherit these.
* - `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: [resourceDomains]`:
*     * `'unsafe-inline'` works because no nonce/hash source is present
*       (CSP3 would otherwise ignore it). Required for Vite singlefile
*       bundles and runtime-injected inline scripts.
*     * `'unsafe-eval'` covers Vega / Cesium expression compilers and
*       (for back-compat) wasm instantiation.
*     * `blob:`/`data:` cover workers and base64-encoded module scripts.
* - `style-src 'self' 'unsafe-inline' blob: data: [resourceDomains]`: same
*   shape for `<style>` + CSS-in-JS + runtime-injected stylesheets.
* - `worker-src 'self' blob: [resourceDomains]`: CRITICAL for WebGL apps
*   like CesiumJS and libraries like PDF.js that spawn workers from the
*   app's declared resource hosts. Omitting `resourceDomains` here was
*   the root cause of `map-server` hanging on "Loading globe...".
* - `connect-src 'self' [connectDomains]`: fetch / XHR / WebSocket.
*   Intentionally NOT merged with `resourceDomains` — those two fields
*   are distinct in the MCP Apps spec.
* - `img-src` / `media-src` / `font-src`: same permissive baseline plus
*   the app's declared resource hosts.
* - `frame-src`: driven by `frameDomains`; otherwise denied.
* - `base-uri`: driven by `baseUriDomains`; otherwise denied to prevent
*   relative-URL hijacking.
* - `object-src 'none'`: legacy plugin surface fully blocked.
*
* Every host entry passed through `sanitizeCspDomains` so that a server
* declaring something like `"https://evil.com; script-src *"` can't
* inject new directives.
*/
function buildCsp(ui) {
	const resourceDomains = sanitizeCspDomains(ui?.csp?.resourceDomains).join(" ");
	const connectDomains = sanitizeCspDomains(ui?.csp?.connectDomains).join(" ");
	const frameDomains = sanitizeCspDomains(ui?.csp?.frameDomains).join(" ");
	const baseUriDomains = sanitizeCspDomains(ui?.csp?.baseUriDomains).join(" ");
	return [
		"default-src 'self' 'unsafe-inline'",
		`script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: ${resourceDomains}`.trim(),
		`style-src 'self' 'unsafe-inline' blob: data: ${resourceDomains}`.trim(),
		`img-src 'self' data: blob: ${resourceDomains}`.trim(),
		`font-src 'self' data: blob: ${resourceDomains}`.trim(),
		`media-src 'self' data: blob: ${resourceDomains}`.trim(),
		`connect-src 'self' ${connectDomains}`.trim(),
		`worker-src 'self' blob: ${resourceDomains}`.trim(),
		frameDomains ? `frame-src ${frameDomains}` : "frame-src 'none'",
		"object-src 'none'",
		baseUriDomains ? `base-uri ${baseUriDomains}` : "base-uri 'none'"
	].join("; ");
}
function extractInstanceIdFromPath(pathname) {
	if (!pathname.startsWith(ROUTE_PREFIX$1)) return;
	const rest = pathname.slice(10);
	if (!rest.endsWith(APP_HTML_SUFFIX)) return;
	const id = rest.slice(0, -9);
	return id.length > 0 ? id : void 0;
}
/**
* Internal store interface. The Gateway injects something that can look up
* instances and their current HTML payload.
*/
var McpAppsHttpServer = class {
	constructor(resolver, staticHtml, tmapProxy, sandboxPreview) {
		this.resolver = resolver;
		this.staticHtml = staticHtml;
		this.tmapProxy = tmapProxy;
		this.sandboxPreview = sandboxPreview;
		this.attached = false;
		this.previousListeners = [];
	}
	/**
	* Attach to an existing HTTP server, taking over `'request'` routing.
	*
	* Why we take over rather than just appending: the legacy local listener installs a
	* default listener that writes 404 for every request. If we also register
	* a `request` listener the default fires first and closes the response
	* before we can write to it. We therefore remove all existing listeners,
	* install a single combined one, and delegate to the originals when the
	* path is not ours.
	*/
	attach(server) {
		if (this.attached) return;
		this.attached = true;
		const existing = server.listeners("request");
		this.previousListeners = [...existing];
		server.removeAllListeners("request");
		this.combinedListener = (req, res) => {
			if (this.tmapProxy?.tryHandle(req, res)) return;
			if (this.staticHtml?.tryHandle(req, res)) return;
			if (this.sandboxPreview?.tryHandle(req, res)) return;
			if (this.tryHandleMcpAppsRequest(req, res)) return;
			for (const listener of this.previousListeners) {
				try {
					listener(req, res);
				} catch (err) {
					console.error("[McpAppsHttpServer] delegated listener threw:", err);
				}
				if (res.writableEnded) return;
			}
			if (!res.writableEnded) {
				res.writeHead(404);
				res.end();
			}
		};
		server.on("request", this.combinedListener);
	}
	/**
	* Returns true if the request was an MCP Apps route and the response
	* has been (or will be) handled by this server.
	*/
	tryHandleMcpAppsRequest(req, res) {
		try {
			const url = new URL(req.url || "/", "http://127.0.0.1");
			if (!url.pathname.startsWith(ROUTE_PREFIX$1)) return false;
			if (url.pathname === "/mcp-apps/sandbox-proxy.html") {
				let csp;
				const rawCsp = url.searchParams.get("csp");
				if (rawCsp) try {
					const parsed = JSON.parse(rawCsp);
					if (parsed && typeof parsed === "object") csp = parsed;
				} catch {
					res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
					res.end("Invalid MCP Apps CSP");
					return true;
				}
				res.writeHead(200, {
					"Content-Type": "text/html; charset=utf-8",
					"Content-Security-Policy": buildCsp({ csp }),
					"X-Content-Type-Options": "nosniff",
					"Cache-Control": "no-cache, no-store, must-revalidate"
				});
				res.end(require_handlers.MCP_APPS_SANDBOX_PROXY_HTML);
				return true;
			}
			const instanceId = extractInstanceIdFromPath(url.pathname);
			if (!instanceId) {
				res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
				res.end("Not Found");
				return true;
			}
			const instance = this.resolver.getInstance(instanceId);
			if (!instance || !instance.html) {
				res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
				res.end("MCP App instance not found or not loaded");
				return true;
			}
			const csp = buildCsp(instance.uiMetadata);
			res.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8",
				"Content-Security-Policy": csp,
				"X-Content-Type-Options": "nosniff",
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"Pragma": "no-cache",
				"Expires": "0"
			});
			res.end(instance.html);
			return true;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
			res.end(`MCP Apps HTTP error: ${message}`);
			return true;
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/resolver.ts
function pickHtmlContent(contents) {
	for (const entry of contents) {
		if (typeof entry.text === "string" && entry.text.length > 0) return {
			html: entry.text,
			mimeType: entry.mimeType || "text/html;profile=mcp-app"
		};
		if (typeof entry.blob === "string" && entry.blob.length > 0) try {
			return {
				html: Buffer.from(entry.blob, "base64").toString("utf-8"),
				mimeType: entry.mimeType || "text/html;profile=mcp-app"
			};
		} catch {}
	}
}
function buildResolverCacheKey(app, variantKey, projectId, sessionId) {
	return `${app.mcpAppId}|${app.resourceUri}|${variantKey}|${projectId ?? ""}|${sessionId ?? ""}`;
}
function findCachedResource(cache, app, variantKey, projectId, sessionId) {
	const exact = cache.get(buildResolverCacheKey(app, variantKey, projectId, sessionId));
	if (exact) return exact;
	const shared = cache.get(buildResolverCacheKey(app, variantKey, projectId, void 0));
	if (shared) return shared;
	const prefix = `${app.mcpAppId}|${app.resourceUri}|${variantKey}|`;
	const projectPrefix = `${prefix}${projectId ?? ""}|`;
	for (const [key, entry] of cache) if (key.startsWith(projectPrefix)) return entry;
	for (const [key, entry] of cache) if (key.startsWith(prefix)) return entry;
}
function extractResourceUiMetadata(contents) {
	for (const entry of contents) {
		const meta = entry._meta;
		if (!meta || typeof meta !== "object") continue;
		const ui = meta.ui;
		if (!ui || typeof ui !== "object") continue;
		return ui;
	}
}
/**
* 抽取 `_meta.workbuddy.ui` 下的宿主扩展（当前只有 `localFileViewer`）。
*
* 与 `extractResourceUiMetadata` 分开：`ui` 是 MCP Apps 规范字段，`workbuddy` 是
* WorkBuddy 私有命名空间（同 `surface-metadata.ts` 的约定）。这里只做**形状**归一，
* 不做任何信任判定 —— 值来自 MCP Server，安全校验全部在 `local-file-viewer.ts`。
*/
function extractWorkBuddyUiMetadata(contents) {
	for (const entry of contents) {
		const meta = entry._meta;
		if (!meta || typeof meta !== "object") continue;
		const workbuddy = meta.workbuddy;
		if (!workbuddy || typeof workbuddy !== "object") continue;
		const ui = workbuddy.ui;
		if (!ui || typeof ui !== "object") continue;
		return ui;
	}
}
var AppResolver = class {
	constructor(mcpManager) {
		this.mcpManager = mcpManager;
		this.cache = /* @__PURE__ */ new Map();
	}
	async resolve(app, options = {}) {
		const { bypassCache = false, sessionId, projectId, variantKey = "" } = options;
		const key = buildResolverCacheKey(app, variantKey, projectId, sessionId);
		if (!bypassCache) {
			const exactHit = this.cache.has(key);
			const cached = findCachedResource(this.cache, app, variantKey, projectId, sessionId);
			if (cached) {
				if (!exactHit) this.cache.set(key, cached);
				mcpAppsDiag("resolver.resolve.cacheHit", {
					appId: app.mcpAppId,
					prefixedToolName: app.prefixedToolName,
					resourceUri: app.resourceUri,
					htmlLen: cached.value.html.length,
					shared: !exactHit
				});
				return cached.value;
			}
		}
		mcpAppsDiag("resolver.resolve.start", {
			appId: app.mcpAppId,
			prefixedToolName: app.prefixedToolName,
			resourceUri: app.resourceUri,
			bypassCache,
			direction: "Host→MCP Server resources/read"
		});
		try {
			const result = await this.mcpManager.readAppResource(app.mcpAppId, app.resourceUri, {
				sessionId,
				projectId
			});
			const contents = Array.isArray(result.contents) ? result.contents : [];
			const html = pickHtmlContent(contents);
			if (!html) {
				mcpAppsDiag("resolver.resolve.empty", {
					appId: app.mcpAppId,
					resourceUri: app.resourceUri,
					result: summarizeMcpResult(result)
				});
				throw new Error(`UI resource "${app.resourceUri}" contains no readable HTML body`);
			}
			const resolved = {
				html: html.html,
				mimeType: html.mimeType,
				uiMetadata: extractResourceUiMetadata(contents),
				workbuddyUiMetadata: extractWorkBuddyUiMetadata(contents)
			};
			const entry = {
				value: resolved,
				fetchedAt: Date.now()
			};
			this.cache.set(key, entry);
			this.cache.set(buildResolverCacheKey(app, variantKey, projectId, void 0), entry);
			mcpAppsDiag("resolver.resolve.ok", {
				appId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName,
				resourceUri: app.resourceUri,
				contents: contents.length,
				htmlLen: resolved.html.length,
				mimeType: resolved.mimeType,
				uiMetadata: resolved.uiMetadata,
				result: summarizeMcpResult(result)
			});
			return resolved;
		} catch (error) {
			mcpAppsDiag("resolver.resolve.error", {
				appId: app.mcpAppId,
				prefixedToolName: app.prefixedToolName,
				resourceUri: app.resourceUri,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}
	invalidate(appId) {
		if (!appId) {
			this.cache.clear();
			return;
		}
		for (const key of [...this.cache.keys()]) if (key.startsWith(`${appId}|`)) this.cache.delete(key);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/session-runtime.ts
/**
* 把 MCP Apps Host 数据面请求路由到当前 Conversation 内 Agent CLI。
*
* 此类不 spawn stdio Server，也不保存 ACP session 映射；ConversationImpl
* 在每次发送时读取并注入真实 boundAcpSessionId。
*/
var SessionMcpAppsRuntime = class {
	constructor(options = {}) {
		this.callWorkerExtension = options.callWorkerExtension ?? callMcpAppsConversationWorkerExtension;
	}
	async callTool(app, toolName, args, conversationId) {
		const id = requireConversationId(app, conversationId);
		return this.callWorkerExtension(id, "_codebuddy.ai/mcpUiCallTool", {
			serverName: app.serverId,
			toolName,
			arguments: args
		});
	}
	async readResource(app, uri, conversationId) {
		const id = requireConversationId(app, conversationId);
		return this.callWorkerExtension(id, "_codebuddy.ai/mcpUiReadResource", {
			serverName: app.serverId,
			uri
		});
	}
};
function requireConversationId(app, conversationId) {
	if (!conversationId) throw new Error(`Local MCP App "${app.mcpAppId}" requires an active conversation`);
	return conversationId;
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/static-html-server.ts
/**
* StaticHtmlHttpServer
*
* Serves registered local directories over HTTP at `/static-html/<token>/<relPath>`.
* Designed to make HTML artifacts same-origin with the tmap proxy, avoiding
* cross-protocol (file:// vs http://) CORS issues.
*/
var ROUTE_PREFIX = "/static-html/";
var ALLOWED_EXTENSIONS = /* @__PURE__ */ new Set([
	".html",
	".htm",
	".js",
	".css",
	".json",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".svg",
	".ico",
	".webp",
	".woff",
	".woff2",
	".ttf",
	".eot",
	".wasm",
	".miora",
	".mp4",
	".webm",
	".mov",
	".avi",
	".mkv",
	".m4v",
	".ogv",
	".mp3",
	".wav",
	".ogg",
	".m4a",
	".aac",
	".flac",
	".opus",
	".glb",
	".gltf"
]);
var MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".htm": "text/html; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".webp": "image/webp",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".ttf": "font/ttf",
	".eot": "application/vnd.ms-fontobject",
	".wasm": "application/wasm",
	".miora": "application/vnd.miora.canvas",
	".mp4": "video/mp4",
	".webm": "video/webm",
	".mov": "video/quicktime",
	".avi": "video/x-msvideo",
	".mkv": "video/x-matroska",
	".m4v": "video/mp4",
	".ogv": "video/ogg",
	".mp3": "audio/mpeg",
	".wav": "audio/wav",
	".ogg": "audio/ogg",
	".m4a": "audio/mp4",
	".aac": "audio/aac",
	".flac": "audio/flac",
	".opus": "audio/opus",
	".glb": "model/gltf-binary",
	".gltf": "model/gltf+json"
};
var HTML_CSP = [
	"default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https: https://map.qq.com https://*.map.qq.com",
	`connect-src 'self' http://127.0.0.1:* https://*.map.qq.com https://mapapi.qq.com https://*.gtimg.com https://*.qpic.cn https://*.myapp.com https://*.app.workbuddy.link https://*.app-tencent.workbuddy.link https://*.app.workbuddy.host https://*.app-tencent.workbuddy.host https://*.beacon.qq.com https://svibeacon.onezapp.com`,
	"img-src 'self' data: blob: https: https://*.map.qq.com https://mapapi.qq.com https://*.gtimg.com https://*.qpic.cn https://*.myapp.com",
	"font-src 'self' data: blob: https: https://*.map.qq.com https://*.gtimg.com https://*.qpic.cn",
	"media-src 'self' data: blob: https: http://127.0.0.1:*",
	"worker-src 'self' blob: https: https://*.map.qq.com https://*.gtimg.com"
].join("; ");
/**
* 兜底修正调用方传入的目录路径。
*
* 历史坑（issue #86344）：调用方用 `new URL(fileUri).pathname` 取本地路径时，Windows 下会拿到
* `/D:/dir` 这种「盘符前多一个斜杠」的形态，`path.resolve('/D:/dir')` 会拼成 `d:\D:\dir`，
* 于是 `serveFile` 的越界守卫 realpath 失败 → 403，用户看到的就是一页 "Forbidden"。
* 调用方已修为 `fileURLToPath`，这里再兜一层，避免任何新调用方重新踩坑。
*
* 只在 win32 生效：POSIX 下 `/D:/x` 是合法目录名，不能改。
*/
function normalizeIncomingDir(dirPath) {
	if (process.platform === "win32" && /^[/\\][a-zA-Z]:[/\\]/.test(dirPath)) return dirPath.slice(1);
	return dirPath;
}
var StaticHtmlHttpServer = class {
	constructor(getPort, proxySecret) {
		this.getPort = getPort;
		this.proxySecret = proxySecret;
		this.registry = /* @__PURE__ */ new Map();
		this.dirToToken = /* @__PURE__ */ new Map();
	}
	registerDir(dirPath) {
		const normalized = node_path.resolve(normalizeIncomingDir(dirPath));
		const existing = this.dirToToken.get(normalized);
		if (existing) return existing;
		const token = (0, node_crypto.randomBytes)(8).toString("hex");
		this.registry.set(token, normalized);
		this.dirToToken.set(normalized, token);
		return token;
	}
	getServerPort() {
		return this.getPort();
	}
	tryHandle(req, res) {
		const reqUrl = req.url;
		if (!reqUrl || !reqUrl.startsWith(ROUTE_PREFIX)) return false;
		if (req.method === "OPTIONS") {
			res.writeHead(204, {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, OPTIONS",
				"Access-Control-Allow-Headers": "*"
			});
			res.end();
			return true;
		}
		const rest = reqUrl.slice(13);
		const slashIdx = rest.indexOf("/");
		if (slashIdx < 1) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
			return true;
		}
		const token = rest.slice(0, slashIdx);
		let relPath;
		try {
			relPath = decodeURIComponent(rest.slice(slashIdx + 1).split("?")[0]);
		} catch {
			res.writeHead(400, { "Content-Type": "text/plain" });
			res.end("Bad Request");
			return true;
		}
		const dirPath = this.registry.get(token);
		if (!dirPath) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
			return true;
		}
		this.serveFile(dirPath, relPath, res);
		return true;
	}
	async serveFile(dirPath, relPath, res) {
		try {
			const resolved = node_path.resolve(dirPath, relPath);
			const realResolved = await (0, node_fs_promises.realpath)(resolved).catch(() => null);
			const realBase = await (0, node_fs_promises.realpath)(dirPath).catch(() => dirPath);
			if (!realResolved || !realResolved.startsWith(realBase + node_path.sep) && realResolved !== realBase) {
				console.warn("[StaticHtmlHttpServer] blocked request", {
					dirPath,
					relPath,
					realBase,
					realResolved
				});
				res.writeHead(403, { "Content-Type": "text/plain" });
				res.end("Forbidden");
				return;
			}
			const ext = node_path.extname(realResolved).toLowerCase();
			if (!ALLOWED_EXTENSIONS.has(ext)) {
				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("Not Found");
				return;
			}
			let content = await (0, node_fs_promises.readFile)(realResolved);
			const headers = {
				"Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
				"X-Content-Type-Options": "nosniff",
				"Access-Control-Allow-Origin": "*",
				"Cache-Control": "no-cache, no-store, must-revalidate"
			};
			if (ext === ".html" || ext === ".htm") {
				const port = this.getPort();
				let text = content.toString("utf-8");
				if (port > 0) text = text.replaceAll("__WB_HTTP_PORT__", String(port));
				text = text.replaceAll("_TMapService?_wbt=__WB_TMAP_SECRET__", `_TMapService/_wbt/${this.proxySecret}`);
				text = text.replaceAll("__WB_TMAP_SECRET__", this.proxySecret);
				content = Buffer.from(text, "utf-8");
				headers["Content-Security-Policy"] = HTML_CSP;
			}
			res.writeHead(200, headers);
			res.end(content);
		} catch (err) {
			if (!res.writableEnded) {
				const code = err.code;
				if (code === "ENOENT" || code === "EISDIR") {
					res.writeHead(404, { "Content-Type": "text/plain" });
					res.end("Not Found");
				} else {
					res.writeHead(500, { "Content-Type": "text/plain" });
					res.end("Internal Server Error");
				}
			}
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/tmap-proxy.ts
var TMAP_SERVICE_PREFIX = "/_TMapService/";
var TMAP_TOKEN_SEGMENT = "/_wbt/";
var SAFE_RESPONSE_HEADERS = /* @__PURE__ */ new Set([
	"content-type",
	"content-encoding",
	"cache-control",
	"etag",
	"last-modified",
	"expires"
]);
/**
* Dev-mode TmapProxyFetch: bypasses WorkBuddy backend and hits Tencent Map APIs
* directly, injecting the provided API key.
*
* Sub-path routing mirrors the Nginx glKeyDelegate example:
*   (none / /)   → pr.map.qq.com/pingd?appid=jsapi_v3&key=...
*   /checkKey    → apikey.map.qq.com/mkey/index.php/mkey/check?key=...
*   /oversea     → overseactrl.map.qq.com (uses apikey param)
*   /service/... → apis.map.qq.com/ws/...?key=...
*/
function createDevTmapProxyFetch(apiKey) {
	return async ({ subPath, search }) => {
		let urlStr;
		const sub = subPath;
		if (!sub || sub === "/") urlStr = `https://pr.map.qq.com/pingd${search}${search ? "&" : "?"}appid=jsapi_v3&key=${apiKey}`;
		else if (sub === "/checkKey" || sub.startsWith("/checkKey/")) urlStr = `https://apikey.map.qq.com/mkey/index.php/mkey/check${search}${search ? "&" : "?"}key=${apiKey}`;
		else if (sub === "/oversea" || sub.startsWith("/oversea/")) urlStr = `https://overseactrl.map.qq.com${sub.slice(8) || "/"}${search}${search ? "&" : "?"}apikey=${apiKey}`;
		else if (sub === "/service" || sub.startsWith("/service/")) urlStr = `https://apis.map.qq.com/ws${sub.slice(8)}${search}${search ? "&" : "?"}key=${apiKey}`;
		else urlStr = `https://pr.map.qq.com/pingd${search}${search ? "&" : "?"}appid=jsapi_v3&key=${apiKey}`;
		const resp = await fetch(urlStr, {
			method: "GET",
			headers: {
				"User-Agent": "WorkBuddy-TmapDevProxy/1.0",
				"Accept-Encoding": "identity"
			}
		});
		const body = Buffer.from(await resp.arrayBuffer());
		const headers = {};
		resp.headers.forEach((value, key) => {
			headers[key] = value;
		});
		return {
			status: resp.status,
			headers,
			body
		};
	};
}
var TmapProxyHandler = class {
	constructor(fetch, proxySecret) {
		this.fetch = fetch;
		this.proxySecret = proxySecret;
	}
	tryHandle(req, res) {
		const reqUrl = req.url;
		if (!reqUrl || !isTmapServiceUrl(reqUrl)) return false;
		const method = (req.method ?? "GET").toUpperCase();
		if (method !== "GET" && method !== "HEAD") {
			res.writeHead(405, {
				"Content-Type": "text/plain",
				"Allow": "GET, HEAD"
			});
			res.end("Method Not Allowed");
			return true;
		}
		const url = new URL(reqUrl, "http://127.0.0.1");
		const afterBase = url.pathname.slice(13);
		if (!afterBase.startsWith(TMAP_TOKEN_SEGMENT)) {
			res.writeHead(403, { "Content-Type": "text/plain" });
			res.end("Forbidden");
			return true;
		}
		const afterToken = afterBase.slice(6);
		const slashIdx = afterToken.indexOf("/");
		const requestSecret = slashIdx === -1 ? afterToken : afterToken.slice(0, slashIdx);
		const subPath = slashIdx === -1 ? "" : afterToken.slice(slashIdx);
		if (requestSecret !== this.proxySecret) {
			res.writeHead(403, { "Content-Type": "text/plain" });
			res.end("Forbidden");
			return true;
		}
		const search = url.searchParams.toString();
		this.handleAsync({
			subPath,
			search: search ? `?${search}` : ""
		}, res);
		return true;
	}
	async handleAsync(proxyReq, res) {
		try {
			const result = await this.fetch(proxyReq);
			const headers = {};
			for (const [key, value] of Object.entries(result.headers)) if (SAFE_RESPONSE_HEADERS.has(key.toLowerCase())) headers[key] = value;
			res.writeHead(result.status, headers);
			res.end(result.body);
		} catch {
			if (!res.writableEnded) {
				res.writeHead(502, { "Content-Type": "text/plain" });
				res.end("Bad Gateway");
			}
		}
	}
};
/** Matches /_TMapService/_wbt/<token>/... */
function isTmapServiceUrl(url) {
	return url.startsWith(TMAP_SERVICE_PREFIX);
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/index.ts
/**
* MCP Apps Host entry point for WorkBuddy app-server.
*
* `createMcpAppsHost` wires up McpManager / resolver / gateway / HTTP server
* and registers the `mcpApps:*` RPC channels on the daemon server endpoint.
*
* The host is intentionally lazy and side-effect free until `start()` is
* called; this matches the rest of the bootstrap that lives in
* `src/main/bootstrap/main-bootstrap.ts`.
*/
function createMcpAppsHost(options) {
	const { mcpManager, server, httpServer, accessTokenProvider, agentToolCallPolicy, toolResultObserver, logger, resolveBundledAsset, tmapProxyFetch, ensureUnknownAppReady } = options;
	const proxySecret = (0, node_crypto.randomBytes)(16).toString("hex");
	const sessionRuntime = new SessionMcpAppsRuntime();
	const sessionExecutorRegistration = mcpManager.registerAppSessionExecutor(sessionRuntime);
	mcpAppsDiag("host.create", {
		phase: "bootstrap",
		architecture: "daemon",
		hasHttpServer: Boolean(httpServer),
		hasAccessTokenProvider: Boolean(accessTokenProvider),
		hasToolResultObserver: Boolean(toolResultObserver),
		hasPatchRequestId: typeof toolResultObserver?.patchConversationRequestId === "function",
		runtime: "McpManager"
	});
	const resolver = new AppResolver(mcpManager);
	const getHttpPort = () => {
		if (!httpServer) return 0;
		const addr = httpServer.address();
		if (addr && typeof addr === "object") return addr.port;
		return 0;
	};
	const staticHtmlServer = httpServer ? new StaticHtmlHttpServer(getHttpPort, proxySecret) : void 0;
	const gateway = new AppGatewayService({
		mcpManager,
		resolver,
		accessTokenProvider,
		agentToolCallPolicy,
		toolResultObserver,
		logger,
		getHttpPort,
		resolveBundledAsset,
		getStaticHtmlServer: () => staticHtmlServer,
		ensureUnknownAppReady
	});
	const clearServiceGateway = setMcpAppsServiceGateway(gateway);
	const devKey = process.env["TMAP_DEV_KEY"];
	const resolvedTmapFetch = devKey ? createDevTmapProxyFetch(devKey) : tmapProxyFetch;
	const tmapProxyHandler = resolvedTmapFetch ? new TmapProxyHandler(resolvedTmapFetch, proxySecret) : void 0;
	if (devKey) logger.warn("[McpAppsHost] TMAP_DEV_KEY detected — using direct Tencent Map proxy (dev mode only)");
	const sandboxPreviewMountService = httpServer ? new SandboxPreviewMountService() : void 0;
	const httpHost = new McpAppsHttpServer({ getInstance: (id) => gateway.getInstance(id) }, staticHtmlServer, tmapProxyHandler, sandboxPreviewMountService ? new SandboxPreviewHandler(sandboxPreviewMountService, logger) : void 0);
	if (httpServer) httpHost.attach(httpServer);
	else logger.warn("[McpAppsHost] No HTTP server available; webview URLs will fail to resolve.");
	const unregisterHandlers = registerMcpAppsHandlers({
		registry: server,
		gateway,
		subscribeCatalog: (listener) => {
			let published;
			const subscription = mcpManager.onDidChangeApps(() => {
				const apps = [...mcpManager.listApps()];
				const signature = JSON.stringify(apps);
				if (signature === published) return;
				published = signature;
				listener(apps);
			});
			return () => subscription.dispose();
		}
	});
	return {
		channels: MCP_APPS_CHANNELS,
		staticHtmlServer,
		sandboxPreviewMountService,
		getSandboxPreviewHttpPort: sandboxPreviewMountService ? getHttpPort : void 0,
		stop() {
			unregisterHandlers();
			sessionExecutorRegistration.dispose();
			clearServiceGateway();
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/surface-metadata.ts
var WORKBUDDY_META_KEY = "workbuddy";
var WORKBUDDY_UI_META_KEY = "ui";
function isRecord$1(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isSurface(value) {
	return value === "inline" || value === "panel";
}
function readWorkBuddyUiMeta(meta) {
	if (!isRecord$1(meta)) return;
	const workbuddy = meta[WORKBUDDY_META_KEY];
	if (!isRecord$1(workbuddy)) return;
	const raw = workbuddy[WORKBUDDY_UI_META_KEY];
	if (!isRecord$1(raw)) return;
	return { ...isSurface(raw.launchSurface) ? { launchSurface: raw.launchSurface } : {} };
}
function resolveMcpAppSurface(options) {
	const requested = readWorkBuddyUiMeta(options.requestMeta)?.launchSurface;
	const declared = readWorkBuddyUiMeta(options.toolMeta)?.launchSurface;
	return requested ?? declared ?? options.hostDefault ?? "inline";
}
var MCP_APP_TEXT_MAX_CHARS = 65536;
var MCP_APP_BLOB_MAX_CHARS = 4096;
var MCP_APP_STRING_MAX_CHARS = 16384;
var SENSITIVE_KEY_RE = /^(access[_-]?token|refresh[_-]?token|id[_-]?token|authorization|api[_-]?key|client[_-]?secret|secret|password|passwd|private[_-]?key)$/i;
var SIGNED_QUERY_PARAM_RE = /^(signature|sig|token|access_token|x-amz-signature|x-amz-credential|x-amz-security-token|Expires|OSSAccessKeyId)$/i;
/**
* 将任意标准 MCP App 的 Tool Result 保存为可回放快照。
*
* - panel：入库并 publish（产物卡可见）
* - inline：静默入库（不 publish，UI 不出卡），按 sessionId+toolCallId 可查，供重启兜底
*
* 不解析产品业务字段语义，但入库前做敏感字段剥离、字符串/blob 限幅与总量上限。
* 产品特有的回放身份与持久化时机由注入的 artifact resolver 决定。
*/
var McpAppToolResultArtifactManager = class {
	constructor(deps) {
		this.deps = deps;
		this.inFlight = /* @__PURE__ */ new Map();
	}
	/**
	* 复用写入侧的回放身份归一，让 live Guest 与最终产物卡收到同一份结果。
	*
	* resolver 返回 ready 时使用规范化结果；defer/ignore 时保持原始 Guest 结果，
	* 不能让可选的产品产物增强阻断标准 MCP Apps 回灌。
	*/
	normalizeToolResult(input) {
		const decision = this.resolveArtifactPersistDecision(input);
		return decision.status === "ready" ? decision.replay.toolResult ?? input.toolResult : input.toolResult;
	}
	onToolResult(input) {
		if (!input.sessionId || input.toolResult.isError) return Promise.resolve();
		const decision = this.resolveArtifactPersistDecision(input);
		if (decision.status !== "ready") return Promise.resolve();
		const replay = decision.replay;
		const surface = resolveMcpAppSurface({
			requestMeta: input.requestMeta,
			toolMeta: input.toolMeta,
			hostDefault: replay.hostDefaultSurface
		});
		const projection = projectMcpAppArtifact(replay.appId, replay.toolResult ?? input.toolResult);
		const uri = buildMcpAppArtifactUri(replay.appId, projection.stableId, input.toolCallId, input.appInstanceId);
		const inFlightKey = `${input.sessionId}:${uri}`;
		const existingInFlight = this.inFlight.get(inFlightKey);
		if (existingInFlight) return existingInFlight;
		const task = (surface === "panel" && replay.preferExisting && projection.stableId ? this.persistIfAbsent(input.sessionId, uri, input, projection, surface, replay) : this.persist(input.sessionId, uri, input, projection, surface, replay)).finally(() => {
			if (this.inFlight.get(inFlightKey) === task) this.inFlight.delete(inFlightKey);
		});
		this.inFlight.set(inFlightKey, task);
		return task;
	}
	/**
	* 已落盘产物仅补 requestId：不重写 toolInput/toolResult/html，避免二次 publish 抖动。
	*/
	async patchConversationRequestId(input) {
		if (!input.sessionId || !input.conversationRequestId) return;
		const decision = this.resolveArtifactPersistDecision(input);
		if (decision.status !== "ready") return;
		const replay = decision.replay;
		const projection = projectMcpAppArtifact(replay.appId, replay.toolResult ?? input.toolResult);
		const uri = buildMcpAppArtifactUri(replay.appId, projection.stableId, input.toolCallId, input.appInstanceId);
		const existing = await this.deps.findArtifactByUri(input.sessionId, uri);
		if (!existing) return;
		await this.patchMissingRequestId(input.sessionId, existing, input.conversationRequestId);
	}
	resolveArtifactPersistDecision(input) {
		try {
			return resolveMcpAppArtifactPersistDecision(input, this.deps.artifactPersistResolver);
		} catch (error) {
			this.deps.logger.warn("[McpAppToolResultArtifactManager] artifact resolver failed", {
				appId: input.appId,
				error
			});
			return {
				status: "ignore",
				reason: "resolver_error"
			};
		}
	}
	async persistIfAbsent(sessionId, uri, input, projection, surface, replay) {
		const existing = await this.deps.findArtifactByUri(sessionId, uri);
		if (existing) {
			await this.patchMissingRequestId(sessionId, existing, input.conversationRequestId);
			return;
		}
		return this.persist(sessionId, uri, input, projection, surface, replay);
	}
	/** 仅在索引缺 requestId 且本次带了 conversationRequestId 时补写，不改动其余字段。 */
	async patchMissingRequestId(sessionId, existing, conversationRequestId) {
		if (!conversationRequestId) return;
		const meta = existing._meta && typeof existing._meta === "object" ? existing._meta : void 0;
		if (typeof meta?.requestId === "string" ? meta.requestId : void 0) return;
		const patched = {
			...existing,
			updatedAt: Date.now(),
			_meta: {
				...meta ?? {},
				requestId: conversationRequestId
			}
		};
		try {
			await this.deps.recordArtifactFromEvent(sessionId, patched, "updated");
			if (meta?.launchSurface !== "inline") this.deps.publishArtifact(sessionId, "updated", patched);
		} catch (error) {
			this.deps.logger.warn("[McpAppToolResultArtifactManager] patch requestId failed", {
				sessionId,
				uri: existing.uri,
				error
			});
		}
	}
	async persist(sessionId, uri, input, projection, surface, replay) {
		const snapshot = sanitizeMcpAppReplaySnapshot({
			toolInput: replay.toolInput,
			toolResult: replay.toolResult ?? input.toolResult
		});
		if (!snapshot) {
			this.deps.logger.warn("[McpAppToolResultArtifactManager] skip oversized tool result snapshot", {
				sessionId,
				appId: replay.appId,
				uri
			});
			return;
		}
		let html;
		if (typeof input.html === "string" && input.html.length > 0) {
			if (safeJsonByteLength({
				toolInput: snapshot.toolInput,
				toolResult: snapshot.toolResult,
				html: input.html
			}) <= 262144) html = input.html;
		}
		const existing = await this.deps.findArtifactByUri(sessionId, uri);
		const now = Date.now();
		const event = existing ? "updated" : "created";
		const title = projection.title || replay.fallbackTitle || buildFallbackArtifactTitle(replay.appId);
		const artifact = {
			type: "mcp_app",
			uri,
			name: title,
			title,
			mimeType: "application/vnd.mcp.app+json",
			contentType: "mcp/app",
			createdAt: existing?.createdAt ?? now,
			updatedAt: now,
			_meta: {
				kind: "mcp/app",
				schemaVersion: 1,
				appId: replay.appId,
				...replay.sourceAppId ? { sourceAppId: replay.sourceAppId } : {},
				appInstanceId: input.appInstanceId,
				launchSurface: surface,
				...projection.stableId ? { stableId: projection.stableId } : {},
				...projection.publicUrl ? { publicUrl: projection.publicUrl } : {},
				...input.toolCallId ? { toolCallId: input.toolCallId } : {},
				...input.conversationRequestId ? { requestId: input.conversationRequestId } : {},
				...snapshot.truncated ? { truncated: true } : {},
				...html ? { html } : {},
				toolInput: snapshot.toolInput,
				toolResult: snapshot.toolResult
			}
		};
		try {
			await this.deps.recordArtifactFromEvent(sessionId, artifact, event);
			if (surface === "panel") this.deps.publishArtifact(sessionId, event, artifact);
			await this.pruneOldArtifacts(sessionId, uri);
		} catch (error) {
			this.deps.logger.warn("[McpAppToolResultArtifactManager] persist failed", error);
			throw error;
		}
	}
	async pruneOldArtifacts(sessionId, keepUri) {
		if (!this.deps.listArtifacts) return;
		const mcpApps = (await this.deps.listArtifacts(sessionId)).filter((item) => item.type === "mcp_app").slice().sort((a, b) => (b.updatedAt ?? b.createdAt ?? 0) - (a.updatedAt ?? a.createdAt ?? 0));
		if (mcpApps.length <= 50) return;
		const victims = mcpApps.slice(50).filter((item) => item.uri !== keepUri);
		for (const victim of victims) try {
			await this.deps.recordArtifactFromEvent(sessionId, { uri: victim.uri }, "deleted");
			this.deps.publishArtifact(sessionId, "deleted", {
				uri: victim.uri,
				type: "mcp_app"
			});
		} catch (error) {
			this.deps.logger.warn("[McpAppToolResultArtifactManager] prune failed", {
				sessionId,
				uri: victim.uri,
				error
			});
		}
	}
};
/** 结果与产品 resolver 都没有提供可读标题时，退回工具名。 */
function buildFallbackArtifactTitle(appId) {
	return appId.split("/").filter(Boolean).pop() ?? appId;
}
/** 投影 stableId / title / publicUrl（Ardot fileId 等）。 */
function projectMcpAppArtifact(appId, toolResult) {
	const appFamily = appId.split("/")[0] || appId;
	const meta = toolResult._meta;
	const artifactMeta = isRecord(meta) ? meta["workbuddy.ai/artifact"] : void 0;
	const explicitStableId = isRecord(artifactMeta) ? readNonEmptyString(artifactMeta.stableId) : void 0;
	const explicitTitle = isRecord(artifactMeta) ? readNonEmptyString(artifactMeta.title) : void 0;
	const structured = isRecord(toolResult.structuredContent) ? toolResult.structuredContent : void 0;
	const fileId = structured ? readNonEmptyString(structured.fileId) : void 0;
	const fileName = structured ? readNonEmptyString(structured.fileName) : void 0;
	const fileUrl = structured ? readNonEmptyString(structured.fileUrl) : void 0;
	return {
		appFamily,
		...explicitStableId || fileId ? { stableId: explicitStableId ?? fileId } : {},
		...explicitTitle || fileName ? { title: explicitTitle ?? fileName } : {},
		...fileUrl ? { publicUrl: fileUrl } : {}
	};
}
function buildMcpAppArtifactUri(appId, stableId, toolCallId, appInstanceId) {
	if (stableId) {
		const appFamily = appId.split("/")[0] || appId;
		return `mcp-app://artifact/${encodeURIComponent(appFamily)}/${encodeURIComponent(stableId)}`;
	}
	return `mcp-app://tool-result/${encodeURIComponent(appId)}/${encodeURIComponent(toolCallId ?? appInstanceId)}`;
}
/**
* 入库前清洗：剥离常见敏感键、截断超长 text/blob、去掉签名 URL 查询参数。
* 清洗后仍超总量上限则返回 undefined（拒绝入库）。
*/
function sanitizeMcpAppReplaySnapshot(input) {
	let truncated = false;
	const toolInput = sanitizeValue(input.toolInput, () => {
		truncated = true;
	});
	const toolResult = sanitizeValue(input.toolResult, () => {
		truncated = true;
	});
	if (safeJsonByteLength({
		toolInput,
		toolResult
	}) <= 262144) return {
		toolInput,
		toolResult,
		truncated
	};
	const compactedResult = compactToolResult(toolResult);
	truncated = true;
	if (safeJsonByteLength({
		toolInput,
		toolResult: compactedResult
	}) > 262144) return;
	return {
		toolInput,
		toolResult: compactedResult,
		truncated: true
	};
}
function compactToolResult(toolResult) {
	const content = Array.isArray(toolResult.content) ? toolResult.content : void 0;
	return {
		isError: toolResult.isError === true,
		content: content?.map((entry) => {
			if (!entry || typeof entry !== "object") return entry;
			const item = entry;
			return {
				type: item.type,
				mimeType: item.mimeType,
				uri: typeof item.uri === "string" ? redactUrl(item.uri) : item.uri,
				textLen: typeof item.text === "string" ? item.text.length : void 0,
				blobLen: typeof item.blob === "string" ? item.blob.length : void 0
			};
		}),
		structuredContentKeys: toolResult.structuredContent && typeof toolResult.structuredContent === "object" ? Object.keys(toolResult.structuredContent) : [],
		_meta: { compacted: true }
	};
}
function sanitizeValue(value, markTruncated, depth = 0) {
	if (value === null || value === void 0) return value;
	if (typeof value === "string") {
		const redacted = redactUrl(value);
		if (redacted.length > MCP_APP_STRING_MAX_CHARS) {
			markTruncated();
			return `${redacted.slice(0, MCP_APP_STRING_MAX_CHARS)}…(+${redacted.length - MCP_APP_STRING_MAX_CHARS})`;
		}
		return redacted;
	}
	if (typeof value !== "object") return value;
	if (depth > 12) {
		markTruncated();
		return "[MaxDepth]";
	}
	if (Array.isArray(value)) return value.map((item) => sanitizeValue(item, markTruncated, depth + 1));
	const record = value;
	const out = {};
	for (const [key, child] of Object.entries(record)) {
		if (SENSITIVE_KEY_RE.test(key)) {
			markTruncated();
			out[key] = "[REDACTED]";
			continue;
		}
		if (key === "text" && typeof child === "string") {
			if (child.length > MCP_APP_TEXT_MAX_CHARS) {
				markTruncated();
				out[key] = `${child.slice(0, MCP_APP_TEXT_MAX_CHARS)}…(+${child.length - MCP_APP_TEXT_MAX_CHARS})`;
			} else out[key] = child;
			continue;
		}
		if (key === "blob" && typeof child === "string") {
			if (child.length > MCP_APP_BLOB_MAX_CHARS) {
				markTruncated();
				out[key] = `blob(${child.length})`;
			} else out[key] = child;
			continue;
		}
		if ((key === "uri" || key === "url" || key.endsWith("Url") || key.endsWith("URL")) && typeof child === "string") {
			out[key] = redactUrl(child);
			continue;
		}
		out[key] = sanitizeValue(child, markTruncated, depth + 1);
	}
	return out;
}
function redactUrl(value) {
	if (!/^https?:\/\//i.test(value) || !value.includes("?")) return value;
	try {
		const url = new URL(value);
		let changed = false;
		for (const key of [...url.searchParams.keys()]) if (SIGNED_QUERY_PARAM_RE.test(key)) {
			url.searchParams.set(key, "[REDACTED]");
			changed = true;
		}
		return changed ? url.toString() : value;
	} catch {
		return value;
	}
}
function safeJsonByteLength(value) {
	try {
		return Buffer.byteLength(JSON.stringify(value) ?? "null", "utf8");
	} catch {
		return Number.POSITIVE_INFINITY;
	}
}
function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function readNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/unknown-app-ready.ts
/** 判断 openHost 目标是否是内置 Ardot MCP App，供建联 hook 使用。 */
function isArdotHostAppRef(input) {
	const appId = input.appId ?? "";
	const prefixed = input.prefixedToolName ?? "";
	return appId.startsWith("ardot/") || prefixed.includes("mcp__ardot__") || prefixed.startsWith("ardot_");
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/app-server-mcp-apps-host.ts
function listenOnLoopback(server) {
	return new Promise((resolve, reject) => {
		const cleanup = () => {
			server.off("error", onError);
			server.off("listening", onListening);
		};
		const onError = (error) => {
			cleanup();
			reject(error);
		};
		const onListening = () => {
			cleanup();
			resolve();
		};
		server.once("error", onError);
		server.once("listening", onListening);
		server.listen(0, "127.0.0.1");
	});
}
function closeHttpServer(server, logger) {
	server.close((error) => {
		if (error) logger.warn("[McpAppsHost] Dedicated HTTP server close failed", error);
	});
}
async function startWorkbuddyAppServerMcpAppsHost({ celljs, daemon, connectorOauthFetch, serverFetch, createMcpAppsHost, resolveBundledAsset, logger = console }) {
	const sharedHttpServer = daemon.server.getHttpServer();
	const ownedHttpServer = sharedHttpServer ? void 0 : node_http.createServer();
	if (ownedHttpServer) {
		await listenOnLoopback(ownedHttpServer);
		const address = ownedHttpServer.address();
		const port = address && typeof address === "object" ? address.port : void 0;
		logger.info("[McpAppsHost] Started dedicated HTTP server", { port });
	}
	const tmapProxyFetch = serverFetch ? (proxyReq) => {
		const session = celljs.authenticationManager?.currentSessionSubject?.getValue?.();
		const endpoint = (celljs.productManager.getEndpoint?.() ?? "").replace(/\/$/, "");
		const headers = {};
		if (session?.auth?.accessToken) headers["Authorization"] = `Bearer ${session.auth.accessToken}`;
		if (session?.account?.uid) headers["X-User-Id"] = session.account.uid;
		if (session?.account?.enterpriseId) {
			headers["X-Enterprise-Id"] = session.account.enterpriseId;
			headers["X-Tenant-Id"] = session.account.enterpriseId;
		}
		if (session?.auth?.domain) headers["X-Domain"] = session.auth.domain;
		const backendUrl = `${endpoint}/agenttool/glmap${proxyReq.subPath}${proxyReq.search}`;
		headers["Accept-Encoding"] = "identity";
		return serverFetch(backendUrl, {
			method: "GET",
			headers
		}).then(async (resp) => {
			const body = Buffer.from(await resp.arrayBuffer());
			const respHeaders = {};
			resp.headers.forEach((value, key) => {
				respHeaders[key] = value;
			});
			return {
				status: resp.status,
				headers: respHeaders,
				body
			};
		});
	} : void 0;
	const mcpAppToolResultArtifacts = new McpAppToolResultArtifactManager({
		findArtifactByUri: async (sessionId, uri) => {
			const service = daemon.getMediaArtifactService();
			return service ? await service.findArtifactByUri(sessionId, uri) : void 0;
		},
		recordArtifactFromEvent: async (sessionId, artifact, event) => {
			const service = daemon.getMediaArtifactService();
			if (service) await service.recordArtifactFromEvent(sessionId, artifact, event, { persistImmediately: true });
		},
		publishArtifact: (sessionId, event, artifact) => {
			pushMcpAppsArtifactEvent({ push: daemon.rawSink }, sessionId, event, artifact);
			daemon.notifyConversationArtifactUpdate(sessionId);
		},
		listArtifacts: async (sessionId) => {
			const service = daemon.getMediaArtifactService();
			if (!service) return [];
			return await service.getSessionArtifacts(sessionId);
		},
		artifactPersistResolver: createMcpAppArtifactPersistResolver([resolveArdotMcpAppArtifactPersistDecision]),
		logger
	});
	const ardotOauthApiDeps = {
		productManager: celljs.productManager,
		authenticationManager: celljs.authenticationManager,
		fetch: connectorOauthFetch
	};
	/**
	* 静态鉴权模式下用户手写的裸 token。命中时画布换票与建联都要让影子账号让位：
	* 影子账号只认正式 Ardot，其 token 注入测试环境画布会被判成 `authentication err`
	* （表现为画布「暂无权限」而 MCP 工具正常）。
	*/
	const resolveArdotStaticAuthToken$1 = () => require_server_side_access_token.resolveArdotStaticAuthToken(celljs.mcpManager.getUserOverride("ardot"));
	let handle;
	try {
		handle = createMcpAppsHost({
			mcpManager: celljs.mcpManager,
			server: daemon.server,
			httpServer: sharedHttpServer ?? ownedHttpServer,
			accessTokenProvider: { getToken: async () => {
				const staticToken = resolveArdotStaticAuthToken$1();
				if (!staticToken) return fetchArdotAccessToken(ardotOauthApiDeps);
				logger.info("[McpAppsHost] Ardot canvas token from mcp.json static override");
				return { accessToken: staticToken };
			} },
			agentToolCallPolicy: {
				shouldMaterialize: (input) => shouldMaterializeArdotMcpApp(input),
				shouldHostBootstrap: (input) => shouldHostBootstrapArdotMcpApp(input.appId)
			},
			toolResultObserver: {
				normalizeToolResult(input) {
					return mcpAppToolResultArtifacts.normalizeToolResult(input);
				},
				async onToolResult(input) {
					await mcpAppToolResultArtifacts.onToolResult(input);
				},
				async patchConversationRequestId(input) {
					await mcpAppToolResultArtifacts.patchConversationRequestId(input);
				}
			},
			logger,
			resolveBundledAsset,
			tmapProxyFetch,
			ensureUnknownAppReady: async (input) => {
				if (!isArdotHostAppRef(input)) return;
				const managedHeaders = {};
				if (!resolveArdotStaticAuthToken$1()) {
					const { accessToken } = await fetchArdotAccessToken(ardotOauthApiDeps);
					managedHeaders.Authorization = `Bearer ${accessToken}`;
				}
				celljs.firstPartyMcpProvider.setManagedHeaders("ardot", managedHeaders);
				const result = await celljs.mcpManager.connect(ARDOT_MCP_CONFIG_ID);
				if (!result.success) throw new Error(result.error || "Failed to reconnect Ardot MCP");
			}
		});
	} catch (error) {
		if (ownedHttpServer) closeHttpServer(ownedHttpServer, logger);
		throw error;
	}
	if (!ownedHttpServer) return handle;
	let stopped = false;
	return {
		channels: handle.channels,
		staticHtmlServer: handle.staticHtmlServer,
		sandboxPreviewMountService: handle.sandboxPreviewMountService,
		getSandboxPreviewHttpPort: handle.getSandboxPreviewHttpPort,
		stop() {
			if (stopped) return;
			stopped = true;
			try {
				handle.stop();
			} finally {
				closeHttpServer(ownedHttpServer, logger);
			}
		}
	};
}
async function startWorkbuddyAppServerDefaultMcpAppsHost(options) {
	return startWorkbuddyAppServerMcpAppsHost({
		...options,
		createMcpAppsHost: (hostOptions) => createMcpAppsHost(hostOptions)
	});
}
//#endregion
Object.defineProperty(exports, "$ZodObject", {
	enumerable: true,
	get: function() {
		return $ZodObject;
	}
});
Object.defineProperty(exports, "$ZodType", {
	enumerable: true,
	get: function() {
		return $ZodType;
	}
});
Object.defineProperty(exports, "$constructor", {
	enumerable: true,
	get: function() {
		return $constructor;
	}
});
Object.defineProperty(exports, "ARDOT_AUTH_READY_TTL_MS", {
	enumerable: true,
	get: function() {
		return ARDOT_AUTH_READY_TTL_MS;
	}
});
Object.defineProperty(exports, "ARDOT_CONNECTOR_NAME", {
	enumerable: true,
	get: function() {
		return ARDOT_CONNECTOR_NAME;
	}
});
Object.defineProperty(exports, "ARDOT_MCP_CONFIG_ID", {
	enumerable: true,
	get: function() {
		return ARDOT_MCP_CONFIG_ID;
	}
});
Object.defineProperty(exports, "CallToolRequestSchema", {
	enumerable: true,
	get: function() {
		return CallToolRequestSchema;
	}
});
Object.defineProperty(exports, "CallToolResultSchema", {
	enumerable: true,
	get: function() {
		return CallToolResultSchema;
	}
});
Object.defineProperty(exports, "CancelTaskRequestSchema", {
	enumerable: true,
	get: function() {
		return CancelTaskRequestSchema;
	}
});
Object.defineProperty(exports, "CancelTaskResultSchema", {
	enumerable: true,
	get: function() {
		return CancelTaskResultSchema;
	}
});
Object.defineProperty(exports, "CancelledNotificationSchema", {
	enumerable: true,
	get: function() {
		return CancelledNotificationSchema;
	}
});
Object.defineProperty(exports, "CompleteRequestSchema", {
	enumerable: true,
	get: function() {
		return CompleteRequestSchema;
	}
});
Object.defineProperty(exports, "CompleteResultSchema", {
	enumerable: true,
	get: function() {
		return CompleteResultSchema;
	}
});
Object.defineProperty(exports, "CreateMessageRequestSchema", {
	enumerable: true,
	get: function() {
		return CreateMessageRequestSchema;
	}
});
Object.defineProperty(exports, "CreateMessageResultSchema", {
	enumerable: true,
	get: function() {
		return CreateMessageResultSchema;
	}
});
Object.defineProperty(exports, "CreateMessageResultWithToolsSchema", {
	enumerable: true,
	get: function() {
		return CreateMessageResultWithToolsSchema;
	}
});
Object.defineProperty(exports, "CreateTaskResultSchema", {
	enumerable: true,
	get: function() {
		return CreateTaskResultSchema;
	}
});
Object.defineProperty(exports, "DEFAULT_NEGOTIATED_PROTOCOL_VERSION", {
	enumerable: true,
	get: function() {
		return DEFAULT_NEGOTIATED_PROTOCOL_VERSION;
	}
});
Object.defineProperty(exports, "ElicitRequestSchema", {
	enumerable: true,
	get: function() {
		return ElicitRequestSchema;
	}
});
Object.defineProperty(exports, "ElicitResultSchema", {
	enumerable: true,
	get: function() {
		return ElicitResultSchema;
	}
});
Object.defineProperty(exports, "EmptyResultSchema", {
	enumerable: true,
	get: function() {
		return EmptyResultSchema;
	}
});
Object.defineProperty(exports, "ErrorCode", {
	enumerable: true,
	get: function() {
		return ErrorCode;
	}
});
Object.defineProperty(exports, "GetPromptRequestSchema", {
	enumerable: true,
	get: function() {
		return GetPromptRequestSchema;
	}
});
Object.defineProperty(exports, "GetPromptResultSchema", {
	enumerable: true,
	get: function() {
		return GetPromptResultSchema;
	}
});
Object.defineProperty(exports, "GetTaskPayloadRequestSchema", {
	enumerable: true,
	get: function() {
		return GetTaskPayloadRequestSchema;
	}
});
Object.defineProperty(exports, "GetTaskRequestSchema", {
	enumerable: true,
	get: function() {
		return GetTaskRequestSchema;
	}
});
Object.defineProperty(exports, "GetTaskResultSchema", {
	enumerable: true,
	get: function() {
		return GetTaskResultSchema;
	}
});
Object.defineProperty(exports, "InitializeRequestSchema", {
	enumerable: true,
	get: function() {
		return InitializeRequestSchema;
	}
});
Object.defineProperty(exports, "InitializeResultSchema", {
	enumerable: true,
	get: function() {
		return InitializeResultSchema;
	}
});
Object.defineProperty(exports, "InitializedNotificationSchema", {
	enumerable: true,
	get: function() {
		return InitializedNotificationSchema;
	}
});
Object.defineProperty(exports, "JSONRPCMessageSchema", {
	enumerable: true,
	get: function() {
		return JSONRPCMessageSchema;
	}
});
Object.defineProperty(exports, "LATEST_PROTOCOL_VERSION", {
	enumerable: true,
	get: function() {
		return LATEST_PROTOCOL_VERSION;
	}
});
Object.defineProperty(exports, "ListChangedOptionsBaseSchema", {
	enumerable: true,
	get: function() {
		return ListChangedOptionsBaseSchema;
	}
});
Object.defineProperty(exports, "ListPromptsRequestSchema", {
	enumerable: true,
	get: function() {
		return ListPromptsRequestSchema;
	}
});
Object.defineProperty(exports, "ListPromptsResultSchema", {
	enumerable: true,
	get: function() {
		return ListPromptsResultSchema;
	}
});
Object.defineProperty(exports, "ListResourceTemplatesRequestSchema", {
	enumerable: true,
	get: function() {
		return ListResourceTemplatesRequestSchema;
	}
});
Object.defineProperty(exports, "ListResourceTemplatesResultSchema", {
	enumerable: true,
	get: function() {
		return ListResourceTemplatesResultSchema;
	}
});
Object.defineProperty(exports, "ListResourcesRequestSchema", {
	enumerable: true,
	get: function() {
		return ListResourcesRequestSchema;
	}
});
Object.defineProperty(exports, "ListResourcesResultSchema", {
	enumerable: true,
	get: function() {
		return ListResourcesResultSchema;
	}
});
Object.defineProperty(exports, "ListRootsResultSchema", {
	enumerable: true,
	get: function() {
		return ListRootsResultSchema;
	}
});
Object.defineProperty(exports, "ListTasksRequestSchema", {
	enumerable: true,
	get: function() {
		return ListTasksRequestSchema;
	}
});
Object.defineProperty(exports, "ListTasksResultSchema", {
	enumerable: true,
	get: function() {
		return ListTasksResultSchema;
	}
});
Object.defineProperty(exports, "ListToolsRequestSchema", {
	enumerable: true,
	get: function() {
		return ListToolsRequestSchema;
	}
});
Object.defineProperty(exports, "ListToolsResultSchema", {
	enumerable: true,
	get: function() {
		return ListToolsResultSchema;
	}
});
Object.defineProperty(exports, "LoggingLevelSchema", {
	enumerable: true,
	get: function() {
		return LoggingLevelSchema;
	}
});
Object.defineProperty(exports, "McpError", {
	enumerable: true,
	get: function() {
		return McpError;
	}
});
Object.defineProperty(exports, "NEVER", {
	enumerable: true,
	get: function() {
		return NEVER;
	}
});
Object.defineProperty(exports, "PingRequestSchema", {
	enumerable: true,
	get: function() {
		return PingRequestSchema;
	}
});
Object.defineProperty(exports, "ProgressNotificationSchema", {
	enumerable: true,
	get: function() {
		return ProgressNotificationSchema;
	}
});
Object.defineProperty(exports, "PromptListChangedNotificationSchema", {
	enumerable: true,
	get: function() {
		return PromptListChangedNotificationSchema;
	}
});
Object.defineProperty(exports, "RELATED_TASK_META_KEY", {
	enumerable: true,
	get: function() {
		return RELATED_TASK_META_KEY;
	}
});
Object.defineProperty(exports, "ReadResourceRequestSchema", {
	enumerable: true,
	get: function() {
		return ReadResourceRequestSchema;
	}
});
Object.defineProperty(exports, "ReadResourceResultSchema", {
	enumerable: true,
	get: function() {
		return ReadResourceResultSchema;
	}
});
Object.defineProperty(exports, "ResourceListChangedNotificationSchema", {
	enumerable: true,
	get: function() {
		return ResourceListChangedNotificationSchema;
	}
});
Object.defineProperty(exports, "SUPPORTED_PROTOCOL_VERSIONS", {
	enumerable: true,
	get: function() {
		return SUPPORTED_PROTOCOL_VERSIONS;
	}
});
Object.defineProperty(exports, "SetLevelRequestSchema", {
	enumerable: true,
	get: function() {
		return SetLevelRequestSchema;
	}
});
Object.defineProperty(exports, "TaskStatusNotificationSchema", {
	enumerable: true,
	get: function() {
		return TaskStatusNotificationSchema;
	}
});
Object.defineProperty(exports, "ToolListChangedNotificationSchema", {
	enumerable: true,
	get: function() {
		return ToolListChangedNotificationSchema;
	}
});
Object.defineProperty(exports, "ZodNumber", {
	enumerable: true,
	get: function() {
		return ZodNumber;
	}
});
Object.defineProperty(exports, "ZodOptional", {
	enumerable: true,
	get: function() {
		return ZodOptional;
	}
});
Object.defineProperty(exports, "_coercedNumber", {
	enumerable: true,
	get: function() {
		return _coercedNumber;
	}
});
Object.defineProperty(exports, "any", {
	enumerable: true,
	get: function() {
		return any;
	}
});
Object.defineProperty(exports, "array", {
	enumerable: true,
	get: function() {
		return array;
	}
});
Object.defineProperty(exports, "assertCompleteRequestPrompt", {
	enumerable: true,
	get: function() {
		return assertCompleteRequestPrompt;
	}
});
Object.defineProperty(exports, "assertCompleteRequestResourceTemplate", {
	enumerable: true,
	get: function() {
		return assertCompleteRequestResourceTemplate;
	}
});
Object.defineProperty(exports, "boolean", {
	enumerable: true,
	get: function() {
		return boolean;
	}
});
Object.defineProperty(exports, "clone", {
	enumerable: true,
	get: function() {
		return clone;
	}
});
Object.defineProperty(exports, "defineLazy", {
	enumerable: true,
	get: function() {
		return defineLazy;
	}
});
Object.defineProperty(exports, "fetchArdotAccessToken", {
	enumerable: true,
	get: function() {
		return fetchArdotAccessToken;
	}
});
Object.defineProperty(exports, "getMcpAppsServiceGateway", {
	enumerable: true,
	get: function() {
		return getMcpAppsServiceGateway;
	}
});
Object.defineProperty(exports, "isInitializeRequest", {
	enumerable: true,
	get: function() {
		return isInitializeRequest;
	}
});
Object.defineProperty(exports, "isInitializedNotification", {
	enumerable: true,
	get: function() {
		return isInitializedNotification;
	}
});
Object.defineProperty(exports, "isJSONRPCErrorResponse", {
	enumerable: true,
	get: function() {
		return isJSONRPCErrorResponse;
	}
});
Object.defineProperty(exports, "isJSONRPCNotification", {
	enumerable: true,
	get: function() {
		return isJSONRPCNotification;
	}
});
Object.defineProperty(exports, "isJSONRPCRequest", {
	enumerable: true,
	get: function() {
		return isJSONRPCRequest;
	}
});
Object.defineProperty(exports, "isJSONRPCResultResponse", {
	enumerable: true,
	get: function() {
		return isJSONRPCResultResponse;
	}
});
Object.defineProperty(exports, "isTaskAugmentedRequestParams", {
	enumerable: true,
	get: function() {
		return isTaskAugmentedRequestParams;
	}
});
Object.defineProperty(exports, "literal", {
	enumerable: true,
	get: function() {
		return literal;
	}
});
Object.defineProperty(exports, "looseObject", {
	enumerable: true,
	get: function() {
		return looseObject;
	}
});
Object.defineProperty(exports, "mcpAppsDiag", {
	enumerable: true,
	get: function() {
		return mcpAppsDiag;
	}
});
Object.defineProperty(exports, "normalizeParams", {
	enumerable: true,
	get: function() {
		return normalizeParams;
	}
});
Object.defineProperty(exports, "number", {
	enumerable: true,
	get: function() {
		return number;
	}
});
Object.defineProperty(exports, "object", {
	enumerable: true,
	get: function() {
		return object;
	}
});
Object.defineProperty(exports, "parse", {
	enumerable: true,
	get: function() {
		return parse$1;
	}
});
Object.defineProperty(exports, "parseAsync", {
	enumerable: true,
	get: function() {
		return parseAsync$1;
	}
});
Object.defineProperty(exports, "registerMcpAppsConversationResolver", {
	enumerable: true,
	get: function() {
		return registerMcpAppsConversationResolver;
	}
});
Object.defineProperty(exports, "safeParse", {
	enumerable: true,
	get: function() {
		return safeParse$1;
	}
});
Object.defineProperty(exports, "safeParseAsync", {
	enumerable: true,
	get: function() {
		return safeParseAsync$1;
	}
});
Object.defineProperty(exports, "startWorkbuddyAppServerDefaultMcpAppsHost", {
	enumerable: true,
	get: function() {
		return startWorkbuddyAppServerDefaultMcpAppsHost;
	}
});
Object.defineProperty(exports, "startWorkbuddyAppServerMcpAppsHost", {
	enumerable: true,
	get: function() {
		return startWorkbuddyAppServerMcpAppsHost;
	}
});
Object.defineProperty(exports, "string", {
	enumerable: true,
	get: function() {
		return string;
	}
});
Object.defineProperty(exports, "toJSONSchema", {
	enumerable: true,
	get: function() {
		return toJSONSchema;
	}
});
Object.defineProperty(exports, "url", {
	enumerable: true,
	get: function() {
		return url$1;
	}
});
