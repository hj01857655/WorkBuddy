import { $q as init_trace_api, Bq as setInstantSpanEmitter, CJ as baggageEntryMetadataFromString, Gq as init_span_timing_report, Jq as setSpanTimingReporter, Kq as reportSpanTiming, Nq as init_tracing, Qq as init_esm, TJ as DiagLogLevel, Wq as hrTimeToMs, Yq as spanStatusFromCode, _w as reportTime, aJ as context, bJ as ROOT_CONTEXT, dJ as SamplingDecision$1, eJ as trace, gJ as INVALID_SPAN_CONTEXT, hJ as isValidTraceId, lJ as SpanKind, mJ as isSpanContextValid, mw as isAegisInitialized, nJ as propagation, oJ as init_context_api, rJ as diag, sJ as SpanStatusCode, uw as init_browser, vJ as TraceFlags, xJ as createContextKey, zq as setDurableSpanEmitter } from "./ui-docs-viewer-Bo02yf1Q.js";
import { c as getActiveTraceparent, d as RENDERER_SERVICE_NAME, f as RENDERER_SERVICE_VERSION, l as getRendererTracer, p as buildRendererResourceAttributes, u as withActiveSpan } from "./workbuddy-provider-BD7no46c.js";
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
init_esm();
var SUPPRESS_TRACING_KEY = createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function suppressTracing(context) {
	return context.setValue(SUPPRESS_TRACING_KEY, true);
}
function isTracingSuppressed(context) {
	return context.getValue(SUPPRESS_TRACING_KEY) === true;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/baggage/constants.js
var BAGGAGE_HEADER = "baggage";
var BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/baggage/utils.js
init_esm();
var __read$8 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
function serializeKeyPairs(keyPairs) {
	return keyPairs.reduce(function(hValue, current) {
		var value = "" + hValue + (hValue !== "" ? "," : "") + current;
		return value.length > 8192 ? hValue : value;
	}, "");
}
function getKeyPairs(baggage) {
	return baggage.getAllEntries().map(function(_a) {
		var _b = __read$8(_a, 2), key = _b[0], value = _b[1];
		var entry = encodeURIComponent(key) + "=" + encodeURIComponent(value.value);
		if (value.metadata !== void 0) entry += ";" + value.metadata.toString();
		return entry;
	});
}
function parsePairKeyValue(entry) {
	var valueProps = entry.split(";");
	if (valueProps.length <= 0) return;
	var keyPairPart = valueProps.shift();
	if (!keyPairPart) return;
	var separatorIndex = keyPairPart.indexOf("=");
	if (separatorIndex <= 0) return;
	var key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
	var value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
	var metadata;
	if (valueProps.length > 0) metadata = baggageEntryMetadataFromString(valueProps.join(";"));
	return {
		key,
		value,
		metadata
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
init_esm();
/**
* Propagates {@link Baggage} through Context format propagation.
*
* Based on the Baggage specification:
* https://w3c.github.io/baggage/
*/
var W3CBaggagePropagator = function() {
	function W3CBaggagePropagator() {}
	W3CBaggagePropagator.prototype.inject = function(context, carrier, setter) {
		var baggage = propagation.getBaggage(context);
		if (!baggage || isTracingSuppressed(context)) return;
		var headerValue = serializeKeyPairs(getKeyPairs(baggage).filter(function(pair) {
			return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
		}).slice(0, 180));
		if (headerValue.length > 0) setter.set(carrier, BAGGAGE_HEADER, headerValue);
	};
	W3CBaggagePropagator.prototype.extract = function(context, carrier, getter) {
		var headerValue = getter.get(carrier, BAGGAGE_HEADER);
		var baggageString = Array.isArray(headerValue) ? headerValue.join(",") : headerValue;
		if (!baggageString) return context;
		var baggage = {};
		if (baggageString.length === 0) return context;
		baggageString.split(",").forEach(function(entry) {
			var keyPair = parsePairKeyValue(entry);
			if (keyPair) {
				var baggageEntry = { value: keyPair.value };
				if (keyPair.metadata) baggageEntry.metadata = keyPair.metadata;
				baggage[keyPair.key] = baggageEntry;
			}
		});
		if (Object.entries(baggage).length === 0) return context;
		return propagation.setBaggage(context, propagation.createBaggage(baggage));
	};
	W3CBaggagePropagator.prototype.fields = function() {
		return [BAGGAGE_HEADER];
	};
	return W3CBaggagePropagator;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/common/attributes.js
init_esm();
var __values$4 = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$7 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
function sanitizeAttributes(attributes) {
	var e_1, _a;
	var out = {};
	if (typeof attributes !== "object" || attributes == null) return out;
	try {
		for (var _b = __values$4(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
			var _d = __read$7(_c.value, 2), key = _d[0], val = _d[1];
			if (!isAttributeKey(key)) {
				diag.warn("Invalid attribute key: " + key);
				continue;
			}
			if (!isAttributeValue(val)) {
				diag.warn("Invalid attribute value set for key: " + key);
				continue;
			}
			if (Array.isArray(val)) out[key] = val.slice();
			else out[key] = val;
		}
	} catch (e_1_1) {
		e_1 = { error: e_1_1 };
	} finally {
		try {
			if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
		} finally {
			if (e_1) throw e_1.error;
		}
	}
	return out;
}
function isAttributeKey(key) {
	return typeof key === "string" && key.length > 0;
}
function isAttributeValue(val) {
	if (val == null) return true;
	if (Array.isArray(val)) return isHomogeneousAttributeValueArray(val);
	return isValidPrimitiveAttributeValue(val);
}
function isHomogeneousAttributeValueArray(arr) {
	var e_2, _a;
	var type;
	try {
		for (var arr_1 = __values$4(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
			var element = arr_1_1.value;
			if (element == null) continue;
			if (!type) {
				if (isValidPrimitiveAttributeValue(element)) {
					type = typeof element;
					continue;
				}
				return false;
			}
			if (typeof element === type) continue;
			return false;
		}
	} catch (e_2_1) {
		e_2 = { error: e_2_1 };
	} finally {
		try {
			if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
		} finally {
			if (e_2) throw e_2.error;
		}
	}
	return true;
}
function isValidPrimitiveAttributeValue(val) {
	switch (typeof val) {
		case "number":
		case "boolean":
		case "string": return true;
	}
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
init_esm();
/**
* Returns a function that logs an error using the provided logger, or a
* console logger if one was not provided.
*/
function loggingErrorHandler() {
	return function(ex) {
		diag.error(stringifyException(ex));
	};
}
/**
* Converts an exception into a string representation
* @param {Exception} ex
*/
function stringifyException(ex) {
	if (typeof ex === "string") return ex;
	else return JSON.stringify(flattenException(ex));
}
/**
* Flattens an exception into key-value pairs by traversing the prototype chain
* and coercing values to strings. Duplicate properties will not be overwritten;
* the first insert wins.
*/
function flattenException(ex) {
	var result = {};
	var current = ex;
	while (current !== null) {
		Object.getOwnPropertyNames(current).forEach(function(propertyName) {
			if (result[propertyName]) return;
			var value = current[propertyName];
			if (value) result[propertyName] = String(value);
		});
		current = Object.getPrototypeOf(current);
	}
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
/** The global error handler delegate */
var delegateHandler = loggingErrorHandler();
/**
* Return the global error handler
* @param {Exception} ex
*/
function globalErrorHandler(ex) {
	try {
		delegateHandler(ex);
	} catch (_a) {}
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/sampling.js
var TracesSamplerValues;
(function(TracesSamplerValues) {
	TracesSamplerValues["AlwaysOff"] = "always_off";
	TracesSamplerValues["AlwaysOn"] = "always_on";
	TracesSamplerValues["ParentBasedAlwaysOff"] = "parentbased_always_off";
	TracesSamplerValues["ParentBasedAlwaysOn"] = "parentbased_always_on";
	TracesSamplerValues["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
	TracesSamplerValues["TraceIdRatio"] = "traceidratio";
})(TracesSamplerValues || (TracesSamplerValues = {}));
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/environment.js
init_esm();
var DEFAULT_LIST_SEPARATOR = ",";
/**
* Environment interface to define all names
*/
var ENVIRONMENT_BOOLEAN_KEYS = ["OTEL_SDK_DISABLED"];
function isEnvVarABoolean(key) {
	return ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
}
var ENVIRONMENT_NUMBERS_KEYS = [
	"OTEL_BSP_EXPORT_TIMEOUT",
	"OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
	"OTEL_BSP_MAX_QUEUE_SIZE",
	"OTEL_BSP_SCHEDULE_DELAY",
	"OTEL_BLRP_EXPORT_TIMEOUT",
	"OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
	"OTEL_BLRP_MAX_QUEUE_SIZE",
	"OTEL_BLRP_SCHEDULE_DELAY",
	"OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
	"OTEL_ATTRIBUTE_COUNT_LIMIT",
	"OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
	"OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
	"OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
	"OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
	"OTEL_SPAN_EVENT_COUNT_LIMIT",
	"OTEL_SPAN_LINK_COUNT_LIMIT",
	"OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
	"OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
	"OTEL_EXPORTER_OTLP_TIMEOUT",
	"OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
	"OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
	"OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
	"OTEL_EXPORTER_JAEGER_AGENT_PORT"
];
function isEnvVarANumber(key) {
	return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
}
var ENVIRONMENT_LISTS_KEYS = [
	"OTEL_NO_PATCH_MODULES",
	"OTEL_PROPAGATORS",
	"OTEL_SEMCONV_STABILITY_OPT_IN"
];
function isEnvVarAList(key) {
	return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
}
var DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
/**
* Default environment variables
*/
var DEFAULT_ENVIRONMENT = {
	OTEL_SDK_DISABLED: false,
	CONTAINER_NAME: "",
	ECS_CONTAINER_METADATA_URI_V4: "",
	ECS_CONTAINER_METADATA_URI: "",
	HOSTNAME: "",
	KUBERNETES_SERVICE_HOST: "",
	NAMESPACE: "",
	OTEL_BSP_EXPORT_TIMEOUT: 3e4,
	OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
	OTEL_BSP_MAX_QUEUE_SIZE: 2048,
	OTEL_BSP_SCHEDULE_DELAY: 5e3,
	OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
	OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
	OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
	OTEL_BLRP_SCHEDULE_DELAY: 5e3,
	OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
	OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
	OTEL_EXPORTER_JAEGER_ENDPOINT: "",
	OTEL_EXPORTER_JAEGER_PASSWORD: "",
	OTEL_EXPORTER_JAEGER_USER: "",
	OTEL_EXPORTER_OTLP_ENDPOINT: "",
	OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
	OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
	OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
	OTEL_EXPORTER_OTLP_HEADERS: "",
	OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
	OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
	OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
	OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
	OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
	OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
	OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
	OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
	OTEL_LOG_LEVEL: DiagLogLevel.INFO,
	OTEL_NO_PATCH_MODULES: [],
	OTEL_PROPAGATORS: ["tracecontext", "baggage"],
	OTEL_RESOURCE_ATTRIBUTES: "",
	OTEL_SERVICE_NAME: "",
	OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
	OTEL_ATTRIBUTE_COUNT_LIMIT: 128,
	OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
	OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: 128,
	OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
	OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: 128,
	OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
	OTEL_SPAN_LINK_COUNT_LIMIT: 128,
	OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: 128,
	OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: 128,
	OTEL_TRACES_EXPORTER: "",
	OTEL_TRACES_SAMPLER: TracesSamplerValues.ParentBasedAlwaysOn,
	OTEL_TRACES_SAMPLER_ARG: "",
	OTEL_LOGS_EXPORTER: "",
	OTEL_EXPORTER_OTLP_INSECURE: "",
	OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
	OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
	OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
	OTEL_EXPORTER_OTLP_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_COMPRESSION: "",
	OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
	OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
	OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
	OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
	OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
	OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
	OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
	OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
	OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
	OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
	OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
	OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
	OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative",
	OTEL_SEMCONV_STABILITY_OPT_IN: []
};
/**
* @param key
* @param environment
* @param values
*/
function parseBoolean(key, environment, values) {
	if (typeof values[key] === "undefined") return;
	environment[key] = String(values[key]).toLowerCase() === "true";
}
/**
* Parses a variable as number with number validation
* @param name
* @param environment
* @param values
* @param min
* @param max
*/
function parseNumber(name, environment, values, min, max) {
	if (min === void 0) min = -Infinity;
	if (max === void 0) max = Infinity;
	if (typeof values[name] !== "undefined") {
		var value = Number(values[name]);
		if (!isNaN(value)) {
			if (value < min) environment[name] = min;
			else if (value > max) environment[name] = max;
			else environment[name] = value;
		}
	}
}
/**
* Parses list-like strings from input into output.
* @param name
* @param environment
* @param values
* @param separator
*/
function parseStringList(name, output, input, separator) {
	if (separator === void 0) separator = DEFAULT_LIST_SEPARATOR;
	var givenValue = input[name];
	if (typeof givenValue === "string") output[name] = givenValue.split(separator).map(function(v) {
		return v.trim();
	});
}
var logLevelMap = {
	ALL: DiagLogLevel.ALL,
	VERBOSE: DiagLogLevel.VERBOSE,
	DEBUG: DiagLogLevel.DEBUG,
	INFO: DiagLogLevel.INFO,
	WARN: DiagLogLevel.WARN,
	ERROR: DiagLogLevel.ERROR,
	NONE: DiagLogLevel.NONE
};
/**
* Environmentally sets log level if valid log level string is provided
* @param key
* @param environment
* @param values
*/
function setLogLevelFromEnv(key, environment, values) {
	var value = values[key];
	if (typeof value === "string") {
		var theLevel = logLevelMap[value.toUpperCase()];
		if (theLevel != null) environment[key] = theLevel;
	}
}
/**
* Parses environment values
* @param values
*/
function parseEnvironment(values) {
	var environment = {};
	for (var env in DEFAULT_ENVIRONMENT) {
		var key = env;
		switch (key) {
			case "OTEL_LOG_LEVEL":
				setLogLevelFromEnv(key, environment, values);
				break;
			default: if (isEnvVarABoolean(key)) parseBoolean(key, environment, values);
			else if (isEnvVarANumber(key)) parseNumber(key, environment, values);
			else if (isEnvVarAList(key)) parseStringList(key, environment, values);
			else {
				var value = values[key];
				if (typeof value !== "undefined" && value !== null) environment[key] = String(value);
			}
		}
	}
	return environment;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/platform/browser/globalThis.js
/**
* - globalThis (New standard)
* - self (Will return the current window instance for supported browsers)
* - window (fallback for older browser implementations)
* - global (NodeJS implementation)
* - <object> (When all else fails)
*/
/** only globals that common to node and browsers are allowed */
var _globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof globalThis === "object" ? globalThis : {};
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/platform/browser/environment.js
/**
* Gets the environment variables
*/
function getEnv() {
	var globalEnv = parseEnvironment(_globalThis);
	return Object.assign({}, DEFAULT_ENVIRONMENT, globalEnv);
}
function getEnvWithoutDefaults() {
	return parseEnvironment(_globalThis);
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/platform/browser/performance.js
var otperformance = performance;
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/version.js
var VERSION$1 = "1.30.1";
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+semantic-conventions@1.28.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js
var TMP_EXCEPTION_TYPE = "exception.type";
var TMP_EXCEPTION_MESSAGE = "exception.message";
var TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
/**
* The type of the exception (its fully-qualified class name, if applicable). The dynamic type of the exception should be preferred over the static type in languages that support it.
*
* @deprecated Use ATTR_EXCEPTION_TYPE.
*/
var SEMATTRS_EXCEPTION_TYPE = TMP_EXCEPTION_TYPE;
/**
* The exception message.
*
* @deprecated Use ATTR_EXCEPTION_MESSAGE.
*/
var SEMATTRS_EXCEPTION_MESSAGE = TMP_EXCEPTION_MESSAGE;
/**
* A stacktrace as a string in the natural representation for the language runtime. The representation is to be determined and documented by each language SIG.
*
* @deprecated Use ATTR_EXCEPTION_STACKTRACE.
*/
var SEMATTRS_EXCEPTION_STACKTRACE = TMP_EXCEPTION_STACKTRACE;
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+semantic-conventions@1.28.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js
var TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
var TMP_SERVICE_NAME = "service.name";
var TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
var TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
var TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
/**
* The name of the runtime of this process. For compiled native binaries, this SHOULD be the name of the compiler.
*
* @deprecated Use ATTR_PROCESS_RUNTIME_NAME in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
*/
var SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
/**
* Logical name of the service.
*
* Note: MUST be the same for all instances of horizontally scaled services. If the value was not specified, SDKs MUST fallback to `unknown_service:` concatenated with [`process.executable.name`](process.md#process), e.g. `unknown_service:bash`. If `process.executable.name` is not available, the value MUST be set to `unknown_service`.
*
* @deprecated Use ATTR_SERVICE_NAME.
*/
var SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
/**
* The name of the telemetry SDK as defined above.
*
* @deprecated Use ATTR_TELEMETRY_SDK_NAME.
*/
var SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
/**
* The language of the telemetry SDK.
*
* @deprecated Use ATTR_TELEMETRY_SDK_LANGUAGE.
*/
var SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
/**
* The version string of the telemetry SDK.
*
* @deprecated Use ATTR_TELEMETRY_SDK_VERSION.
*/
var SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
/**
* The language of the telemetry SDK.
*
* @deprecated Use TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS.
*/
var TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/platform/browser/sdk-info.js
var _a = {};
/** Constants describing the SDK in use */
var SDK_INFO = (_a[SEMRESATTRS_TELEMETRY_SDK_NAME] = "opentelemetry", _a[SEMRESATTRS_PROCESS_RUNTIME_NAME] = "browser", _a[SEMRESATTRS_TELEMETRY_SDK_LANGUAGE] = TELEMETRYSDKLANGUAGEVALUES_WEBJS, _a[SEMRESATTRS_TELEMETRY_SDK_VERSION] = VERSION$1, _a);
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/common/time.js
var NANOSECOND_DIGITS$1 = 9;
var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, 6);
var SECOND_TO_NANOSECONDS$1 = Math.pow(10, NANOSECOND_DIGITS$1);
/**
* Converts a number of milliseconds from epoch to HrTime([seconds, remainder in nanoseconds]).
* @param epochMillis
*/
function millisToHrTime(epochMillis) {
	var epochSeconds = epochMillis / 1e3;
	return [Math.trunc(epochSeconds), Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS)];
}
function getTimeOrigin() {
	var timeOrigin = otperformance.timeOrigin;
	if (typeof timeOrigin !== "number") {
		var perf = otperformance;
		timeOrigin = perf.timing && perf.timing.fetchStart;
	}
	return timeOrigin;
}
/**
* Returns an hrtime calculated via performance component.
* @param performanceNow
*/
function hrTime(performanceNow) {
	return addHrTimes(millisToHrTime(getTimeOrigin()), millisToHrTime(typeof performanceNow === "number" ? performanceNow : otperformance.now()));
}
/**
* Returns a duration of two hrTime.
* @param startTime
* @param endTime
*/
function hrTimeDuration(startTime, endTime) {
	var seconds = endTime[0] - startTime[0];
	var nanos = endTime[1] - startTime[1];
	if (nanos < 0) {
		seconds -= 1;
		nanos += SECOND_TO_NANOSECONDS$1;
	}
	return [seconds, nanos];
}
/**
* check if time is HrTime
* @param value
*/
function isTimeInputHrTime(value) {
	return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
/**
* check if input value is a correct types.TimeInput
* @param value
*/
function isTimeInput(value) {
	return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
}
/**
* Given 2 HrTime formatted times, return their sum as an HrTime.
*/
function addHrTimes(time1, time2) {
	var out = [time1[0] + time2[0], time1[1] + time2[1]];
	if (out[1] >= SECOND_TO_NANOSECONDS$1) {
		out[1] -= SECOND_TO_NANOSECONDS$1;
		out[0] += 1;
	}
	return out;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/ExportResult.js
var ExportResultCode;
(function(ExportResultCode) {
	ExportResultCode[ExportResultCode["SUCCESS"] = 0] = "SUCCESS";
	ExportResultCode[ExportResultCode["FAILED"] = 1] = "FAILED";
})(ExportResultCode || (ExportResultCode = {}));
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/propagation/composite.js
init_esm();
var __values$3 = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/** Combines multiple propagators into a single propagator. */
var CompositePropagator = function() {
	/**
	* Construct a composite propagator from a list of propagators.
	*
	* @param [config] Configuration object for composite propagator
	*/
	function CompositePropagator(config) {
		if (config === void 0) config = {};
		var _a;
		this._propagators = (_a = config.propagators) !== null && _a !== void 0 ? _a : [];
		this._fields = Array.from(new Set(this._propagators.map(function(p) {
			return typeof p.fields === "function" ? p.fields() : [];
		}).reduce(function(x, y) {
			return x.concat(y);
		}, [])));
	}
	/**
	* Run each of the configured propagators with the given context and carrier.
	* Propagators are run in the order they are configured, so if multiple
	* propagators write the same carrier key, the propagator later in the list
	* will "win".
	*
	* @param context Context to inject
	* @param carrier Carrier into which context will be injected
	*/
	CompositePropagator.prototype.inject = function(context, carrier, setter) {
		var e_1, _a;
		try {
			for (var _b = __values$3(this._propagators), _c = _b.next(); !_c.done; _c = _b.next()) {
				var propagator = _c.value;
				try {
					propagator.inject(context, carrier, setter);
				} catch (err) {
					diag.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
				}
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
	};
	/**
	* Run each of the configured propagators with the given context and carrier.
	* Propagators are run in the order they are configured, so if multiple
	* propagators write the same context key, the propagator later in the list
	* will "win".
	*
	* @param context Context to add values to
	* @param carrier Carrier from which to extract context
	*/
	CompositePropagator.prototype.extract = function(context, carrier, getter) {
		return this._propagators.reduce(function(ctx, propagator) {
			try {
				return propagator.extract(ctx, carrier, getter);
			} catch (err) {
				diag.warn("Failed to extract with " + propagator.constructor.name + ". Err: " + err.message);
			}
			return ctx;
		}, context);
	};
	CompositePropagator.prototype.fields = function() {
		return this._fields.slice();
	};
	return CompositePropagator;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/internal/validators.js
var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
var VALID_KEY = "[a-z]" + VALID_KEY_CHAR_RANGE + "{0,255}";
var VALID_VENDOR_KEY = "[a-z0-9]" + VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE + "{0,13}";
var VALID_KEY_REGEX = new RegExp("^(?:" + VALID_KEY + "|" + VALID_VENDOR_KEY + ")$");
var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
/**
* Key is opaque string up to 256 characters printable. It MUST begin with a
* lowercase letter, and can only contain lowercase letters a-z, digits 0-9,
* underscores _, dashes -, asterisks *, and forward slashes /.
* For multi-tenant vendor scenarios, an at sign (@) can be used to prefix the
* vendor name. Vendors SHOULD set the tenant ID at the beginning of the key.
* see https://www.w3.org/TR/trace-context/#key
*/
function validateKey(key) {
	return VALID_KEY_REGEX.test(key);
}
/**
* Value is opaque string up to 256 characters printable ASCII RFC0020
* characters (i.e., the range 0x20 to 0x7E) except comma , and =.
*/
function validateValue(value) {
	return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
var MAX_TRACE_STATE_ITEMS = 32;
var MAX_TRACE_STATE_LEN = 512;
var LIST_MEMBERS_SEPARATOR = ",";
var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
/**
* TraceState must be a class and not a simple object type because of the spec
* requirement (https://www.w3.org/TR/trace-context/#tracestate-field).
*
* Here is the list of allowed mutations:
* - New key-value pair should be added into the beginning of the list
* - The value of any key can be updated. Modified keys MUST be moved to the
* beginning of the list.
*/
var TraceState = function() {
	function TraceState(rawTraceState) {
		this._internalState = /* @__PURE__ */ new Map();
		if (rawTraceState) this._parse(rawTraceState);
	}
	TraceState.prototype.set = function(key, value) {
		var traceState = this._clone();
		if (traceState._internalState.has(key)) traceState._internalState.delete(key);
		traceState._internalState.set(key, value);
		return traceState;
	};
	TraceState.prototype.unset = function(key) {
		var traceState = this._clone();
		traceState._internalState.delete(key);
		return traceState;
	};
	TraceState.prototype.get = function(key) {
		return this._internalState.get(key);
	};
	TraceState.prototype.serialize = function() {
		var _this = this;
		return this._keys().reduce(function(agg, key) {
			agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
			return agg;
		}, []).join(LIST_MEMBERS_SEPARATOR);
	};
	TraceState.prototype._parse = function(rawTraceState) {
		if (rawTraceState.length > MAX_TRACE_STATE_LEN) return;
		this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce(function(agg, part) {
			var listMember = part.trim();
			var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
			if (i !== -1) {
				var key = listMember.slice(0, i);
				var value = listMember.slice(i + 1, part.length);
				if (validateKey(key) && validateValue(value)) agg.set(key, value);
			}
			return agg;
		}, /* @__PURE__ */ new Map());
		if (this._internalState.size > MAX_TRACE_STATE_ITEMS) this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
	};
	TraceState.prototype._keys = function() {
		return Array.from(this._internalState.keys()).reverse();
	};
	TraceState.prototype._clone = function() {
		var traceState = new TraceState();
		traceState._internalState = new Map(this._internalState);
		return traceState;
	};
	return TraceState;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
init_esm();
var TRACE_PARENT_HEADER = "traceparent";
var TRACE_STATE_HEADER = "tracestate";
var VERSION = "00";
var TRACE_PARENT_REGEX = /* @__PURE__ */ new RegExp("^\\s?((?!ff)[\\da-f]{2})-((?![0]{32})[\\da-f]{32})-((?![0]{16})[\\da-f]{16})-([\\da-f]{2})(-.*)?\\s?$");
/**
* Parses information from the [traceparent] span tag and converts it into {@link SpanContext}
* @param traceParent - A meta property that comes from server.
*     It should be dynamically generated server side to have the server's request trace Id,
*     a parent span Id that was set on the server's request span,
*     and the trace flags to indicate the server's sampling decision
*     (01 = sampled, 00 = not sampled).
*     for example: '{version}-{traceId}-{spanId}-{sampleDecision}'
*     For more information see {@link https://www.w3.org/TR/trace-context/}
*/
function parseTraceParent(traceParent) {
	var match = TRACE_PARENT_REGEX.exec(traceParent);
	if (!match) return null;
	if (match[1] === "00" && match[5]) return null;
	return {
		traceId: match[2],
		spanId: match[3],
		traceFlags: parseInt(match[4], 16)
	};
}
/**
* Propagates {@link SpanContext} through Trace Context format propagation.
*
* Based on the Trace Context specification:
* https://www.w3.org/TR/trace-context/
*/
var W3CTraceContextPropagator = function() {
	function W3CTraceContextPropagator() {}
	W3CTraceContextPropagator.prototype.inject = function(context, carrier, setter) {
		var spanContext = trace.getSpanContext(context);
		if (!spanContext || isTracingSuppressed(context) || !isSpanContextValid(spanContext)) return;
		var traceParent = VERSION + "-" + spanContext.traceId + "-" + spanContext.spanId + "-0" + Number(spanContext.traceFlags || TraceFlags.NONE).toString(16);
		setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
		if (spanContext.traceState) setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
	};
	W3CTraceContextPropagator.prototype.extract = function(context, carrier, getter) {
		var traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
		if (!traceParentHeader) return context;
		var traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
		if (typeof traceParent !== "string") return context;
		var spanContext = parseTraceParent(traceParent);
		if (!spanContext) return context;
		spanContext.isRemote = true;
		var traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
		if (traceStateHeader) {
			var state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
			spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
		}
		return trace.setSpanContext(context, spanContext);
	};
	W3CTraceContextPropagator.prototype.fields = function() {
		return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
	};
	return W3CTraceContextPropagator;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js
/**
* based on lodash in order to support esm builds without esModuleInterop.
* lodash is using MIT License.
**/
var objectTag = "[object Object]";
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var funcToString = Function.prototype.toString;
var objectCtorString = funcToString.call(Object);
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
var nativeObjectToString = objectProto.toString;
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
	if (!isObjectLike(value) || baseGetTag(value) !== objectTag) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}
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
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
	var unmasked = false;
	try {
		value[symToStringTag] = void 0;
		unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString.call(value);
	if (unmasked) {
		if (isOwn) value[symToStringTag] = tag;
		else delete value[symToStringTag];
	}
	return result;
}
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
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/merge.js
var MAX_LEVEL = 20;
/**
* Merges objects together
* @param args - objects / values to be merged
*/
function merge() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var result = args.shift();
	var objects = /* @__PURE__ */ new WeakMap();
	while (args.length > 0) result = mergeTwoObjects(result, args.shift(), 0, objects);
	return result;
}
function takeValue(value) {
	if (isArray(value)) return value.slice();
	return value;
}
/**
* Merges two objects
* @param one - first object
* @param two - second object
* @param level - current deep level
* @param objects - objects holder that has been already referenced - to prevent
* cyclic dependency
*/
function mergeTwoObjects(one, two, level, objects) {
	if (level === void 0) level = 0;
	var result;
	if (level > MAX_LEVEL) return;
	level++;
	if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) result = takeValue(two);
	else if (isArray(one)) {
		result = one.slice();
		if (isArray(two)) for (var i = 0, j = two.length; i < j; i++) result.push(takeValue(two[i]));
		else if (isObject(two)) {
			var keys = Object.keys(two);
			for (var i = 0, j = keys.length; i < j; i++) {
				var key = keys[i];
				result[key] = takeValue(two[key]);
			}
		}
	} else if (isObject(one)) {
		if (isObject(two)) {
			if (!shouldMerge(one, two)) return two;
			result = Object.assign({}, one);
			var keys = Object.keys(two);
			for (var i = 0, j = keys.length; i < j; i++) {
				var key = keys[i];
				var twoValue = two[key];
				if (isPrimitive(twoValue)) {
					if (typeof twoValue === "undefined") delete result[key];
					else result[key] = twoValue;
				} else {
					var obj1 = result[key];
					var obj2 = twoValue;
					if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) delete result[key];
					else {
						if (isObject(obj1) && isObject(obj2)) {
							var arr1 = objects.get(obj1) || [];
							var arr2 = objects.get(obj2) || [];
							arr1.push({
								obj: one,
								key
							});
							arr2.push({
								obj: two,
								key
							});
							objects.set(obj1, arr1);
							objects.set(obj2, arr2);
						}
						result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
					}
				}
			}
		} else result = two;
	}
	return result;
}
/**
* Function to check if object has been already reference
* @param obj
* @param key
* @param objects
*/
function wasObjectReferenced(obj, key, objects) {
	var arr = objects.get(obj[key]) || [];
	for (var i = 0, j = arr.length; i < j; i++) {
		var info = arr[i];
		if (info.key === key && info.obj === obj) return true;
	}
	return false;
}
function isArray(value) {
	return Array.isArray(value);
}
function isFunction(value) {
	return typeof value === "function";
}
function isObject(value) {
	return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
}
function isPrimitive(value) {
	return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
}
function shouldMerge(one, two) {
	if (!isPlainObject(one) || !isPlainObject(two)) return false;
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/promise.js
var Deferred = function() {
	function Deferred() {
		var _this = this;
		this._promise = new Promise(function(resolve, reject) {
			_this._resolve = resolve;
			_this._reject = reject;
		});
	}
	Object.defineProperty(Deferred.prototype, "promise", {
		get: function() {
			return this._promise;
		},
		enumerable: false,
		configurable: true
	});
	Deferred.prototype.resolve = function(val) {
		this._resolve(val);
	};
	Deferred.prototype.reject = function(err) {
		this._reject(err);
	};
	return Deferred;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/utils/callback.js
var __read$6 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$3 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
/**
* Bind the callback and only invoke the callback once regardless how many times `BindOnceFuture.call` is invoked.
*/
var BindOnceFuture = function() {
	function BindOnceFuture(_callback, _that) {
		this._callback = _callback;
		this._that = _that;
		this._isCalled = false;
		this._deferred = new Deferred();
	}
	Object.defineProperty(BindOnceFuture.prototype, "isCalled", {
		get: function() {
			return this._isCalled;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(BindOnceFuture.prototype, "promise", {
		get: function() {
			return this._deferred.promise;
		},
		enumerable: false,
		configurable: true
	});
	BindOnceFuture.prototype.call = function() {
		var _a;
		var _this = this;
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		if (!this._isCalled) {
			this._isCalled = true;
			try {
				Promise.resolve((_a = this._callback).call.apply(_a, __spreadArray$3([this._that], __read$6(args), false))).then(function(val) {
					return _this._deferred.resolve(val);
				}, function(err) {
					return _this._deferred.reject(err);
				});
			} catch (err) {
				this._deferred.reject(err);
			}
		}
		return this._deferred.promise;
	};
	return BindOnceFuture;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js
function intValue(charCode) {
	if (charCode >= 48 && charCode <= 57) return charCode - 48;
	if (charCode >= 97 && charCode <= 102) return charCode - 87;
	return charCode - 55;
}
function hexToBinary(hexStr) {
	var buf = new Uint8Array(hexStr.length / 2);
	var offset = 0;
	for (var i = 0; i < hexStr.length; i += 2) {
		var hi = intValue(hexStr.charCodeAt(i));
		var lo = intValue(hexStr.charCodeAt(i + 1));
		buf[offset++] = hi << 4 | lo;
	}
	return buf;
}
var SECOND_TO_NANOSECONDS = Math.pow(10, 9);
/**
* Convert hrTime to nanoseconds.
* @param time
*/
function hrTimeToNanoseconds(time) {
	return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+otlp-transfo_d80e203f86728e59dab009a676d67c4e/node_modules/@opentelemetry/otlp-transformer/build/esm/common/index.js
function hrTimeToNanos(hrTime) {
	var NANOSECONDS = BigInt(1e9);
	return BigInt(hrTime[0]) * NANOSECONDS + BigInt(hrTime[1]);
}
function toLongBits(value) {
	return {
		low: Number(BigInt.asUintN(32, value)),
		high: Number(BigInt.asUintN(32, value >> BigInt(32)))
	};
}
function encodeAsLongBits(hrTime) {
	return toLongBits(hrTimeToNanos(hrTime));
}
function encodeAsString(hrTime) {
	return hrTimeToNanos(hrTime).toString();
}
var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
function identity(value) {
	return value;
}
function optionalHexToBinary(str) {
	if (str === void 0) return void 0;
	return hexToBinary(str);
}
var DEFAULT_ENCODER = {
	encodeHrTime: encodeAsLongBits,
	encodeSpanContext: hexToBinary,
	encodeOptionalSpanContext: optionalHexToBinary
};
function getOtlpEncoder(options) {
	var _a, _b;
	if (options === void 0) return DEFAULT_ENCODER;
	var useLongBits = (_a = options.useLongBits) !== null && _a !== void 0 ? _a : true;
	var useHex = (_b = options.useHex) !== null && _b !== void 0 ? _b : false;
	return {
		encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
		encodeSpanContext: useHex ? identity : hexToBinary,
		encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+otlp-transfo_d80e203f86728e59dab009a676d67c4e/node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js
var __read$5 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
function createInstrumentationScope(scope) {
	return {
		name: scope.name,
		version: scope.version
	};
}
function toAttributes(attributes) {
	return Object.keys(attributes).map(function(key) {
		return toKeyValue(key, attributes[key]);
	});
}
function toKeyValue(key, value) {
	return {
		key,
		value: toAnyValue(value)
	};
}
function toAnyValue(value) {
	var t = typeof value;
	if (t === "string") return { stringValue: value };
	if (t === "number") {
		if (!Number.isInteger(value)) return { doubleValue: value };
		return { intValue: value };
	}
	if (t === "boolean") return { boolValue: value };
	if (value instanceof Uint8Array) return { bytesValue: value };
	if (Array.isArray(value)) return { arrayValue: { values: value.map(toAnyValue) } };
	if (t === "object" && value != null) return { kvlistValue: { values: Object.entries(value).map(function(_a) {
		var _b = __read$5(_a, 2), k = _b[0], v = _b[1];
		return toKeyValue(k, v);
	}) } };
	return {};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+otlp-transfo_d80e203f86728e59dab009a676d67c4e/node_modules/@opentelemetry/otlp-transformer/build/esm/trace/internal.js
function sdkSpanToOtlpSpan(span, encoder) {
	var _a;
	var ctx = span.spanContext();
	var status = span.status;
	return {
		traceId: encoder.encodeSpanContext(ctx.traceId),
		spanId: encoder.encodeSpanContext(ctx.spanId),
		parentSpanId: encoder.encodeOptionalSpanContext(span.parentSpanId),
		traceState: (_a = ctx.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
		name: span.name,
		kind: span.kind == null ? 0 : span.kind + 1,
		startTimeUnixNano: encoder.encodeHrTime(span.startTime),
		endTimeUnixNano: encoder.encodeHrTime(span.endTime),
		attributes: toAttributes(span.attributes),
		droppedAttributesCount: span.droppedAttributesCount,
		events: span.events.map(function(event) {
			return toOtlpSpanEvent(event, encoder);
		}),
		droppedEventsCount: span.droppedEventsCount,
		status: {
			code: status.code,
			message: status.message
		},
		links: span.links.map(function(link) {
			return toOtlpLink(link, encoder);
		}),
		droppedLinksCount: span.droppedLinksCount
	};
}
function toOtlpLink(link, encoder) {
	var _a;
	return {
		attributes: link.attributes ? toAttributes(link.attributes) : [],
		spanId: encoder.encodeSpanContext(link.context.spanId),
		traceId: encoder.encodeSpanContext(link.context.traceId),
		traceState: (_a = link.context.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
		droppedAttributesCount: link.droppedAttributesCount || 0
	};
}
function toOtlpSpanEvent(timedEvent, encoder) {
	return {
		attributes: timedEvent.attributes ? toAttributes(timedEvent.attributes) : [],
		name: timedEvent.name,
		timeUnixNano: encoder.encodeHrTime(timedEvent.time),
		droppedAttributesCount: timedEvent.droppedAttributesCount || 0
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+otlp-transfo_d80e203f86728e59dab009a676d67c4e/node_modules/@opentelemetry/otlp-transformer/build/esm/resource/internal.js
function createResource(resource) {
	return {
		attributes: toAttributes(resource.attributes),
		droppedAttributesCount: 0
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+otlp-transfo_d80e203f86728e59dab009a676d67c4e/node_modules/@opentelemetry/otlp-transformer/build/esm/trace/index.js
var __values$2 = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$4 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
function createExportTraceServiceRequest(spans, options) {
	return { resourceSpans: spanRecordsToResourceSpans(spans, getOtlpEncoder(options)) };
}
function createResourceMap(readableSpans) {
	var e_1, _a;
	var resourceMap = /* @__PURE__ */ new Map();
	try {
		for (var readableSpans_1 = __values$2(readableSpans), readableSpans_1_1 = readableSpans_1.next(); !readableSpans_1_1.done; readableSpans_1_1 = readableSpans_1.next()) {
			var record = readableSpans_1_1.value;
			var ilmMap = resourceMap.get(record.resource);
			if (!ilmMap) {
				ilmMap = /* @__PURE__ */ new Map();
				resourceMap.set(record.resource, ilmMap);
			}
			var instrumentationLibraryKey = record.instrumentationLibrary.name + "@" + (record.instrumentationLibrary.version || "") + ":" + (record.instrumentationLibrary.schemaUrl || "");
			var records = ilmMap.get(instrumentationLibraryKey);
			if (!records) {
				records = [];
				ilmMap.set(instrumentationLibraryKey, records);
			}
			records.push(record);
		}
	} catch (e_1_1) {
		e_1 = { error: e_1_1 };
	} finally {
		try {
			if (readableSpans_1_1 && !readableSpans_1_1.done && (_a = readableSpans_1.return)) _a.call(readableSpans_1);
		} finally {
			if (e_1) throw e_1.error;
		}
	}
	return resourceMap;
}
function spanRecordsToResourceSpans(readableSpans, encoder) {
	var resourceMap = createResourceMap(readableSpans);
	var out = [];
	var entryIterator = resourceMap.entries();
	var entry = entryIterator.next();
	while (!entry.done) {
		var _a = __read$4(entry.value, 2), resource = _a[0], ilmMap = _a[1];
		var scopeResourceSpans = [];
		var ilmIterator = ilmMap.values();
		var ilmEntry = ilmIterator.next();
		while (!ilmEntry.done) {
			var scopeSpans = ilmEntry.value;
			if (scopeSpans.length > 0) {
				var spans = scopeSpans.map(function(readableSpan) {
					return sdkSpanToOtlpSpan(readableSpan, encoder);
				});
				scopeResourceSpans.push({
					scope: createInstrumentationScope(scopeSpans[0].instrumentationLibrary),
					spans,
					schemaUrl: scopeSpans[0].instrumentationLibrary.schemaUrl
				});
			}
			ilmEntry = ilmIterator.next();
		}
		var transformedSpans = {
			resource: createResource(resource),
			scopeSpans: scopeResourceSpans,
			schemaUrl: void 0
		};
		out.push(transformedSpans);
		entry = entryIterator.next();
	}
	return out;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+resources@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/esm/platform/browser/default-service-name.js
function defaultServiceName() {
	return "unknown_service";
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+resources@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/esm/Resource.js
init_esm();
var __assign$1 = function() {
	__assign$1 = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign$1.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator = function(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	};
	return typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
};
var __read$3 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
/**
* A Resource describes the entity for which a signals (metrics or trace) are
* collected.
*/
var Resource = function() {
	function Resource(attributes, asyncAttributesPromise) {
		var _this = this;
		var _a;
		this._attributes = attributes;
		this.asyncAttributesPending = asyncAttributesPromise != null;
		this._syncAttributes = (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
		this._asyncAttributesPromise = asyncAttributesPromise === null || asyncAttributesPromise === void 0 ? void 0 : asyncAttributesPromise.then(function(asyncAttributes) {
			_this._attributes = Object.assign({}, _this._attributes, asyncAttributes);
			_this.asyncAttributesPending = false;
			return asyncAttributes;
		}, function(err) {
			diag.debug("a resource's async attributes promise rejected: %s", err);
			_this.asyncAttributesPending = false;
			return {};
		});
	}
	/**
	* Returns an empty Resource
	*/
	Resource.empty = function() {
		return Resource.EMPTY;
	};
	/**
	* Returns a Resource that identifies the SDK in use.
	*/
	Resource.default = function() {
		var _a;
		return new Resource((_a = {}, _a[SEMRESATTRS_SERVICE_NAME] = defaultServiceName(), _a[SEMRESATTRS_TELEMETRY_SDK_LANGUAGE] = SDK_INFO[SEMRESATTRS_TELEMETRY_SDK_LANGUAGE], _a[SEMRESATTRS_TELEMETRY_SDK_NAME] = SDK_INFO[SEMRESATTRS_TELEMETRY_SDK_NAME], _a[SEMRESATTRS_TELEMETRY_SDK_VERSION] = SDK_INFO[SEMRESATTRS_TELEMETRY_SDK_VERSION], _a));
	};
	Object.defineProperty(Resource.prototype, "attributes", {
		get: function() {
			var _a;
			if (this.asyncAttributesPending) diag.error("Accessing resource attributes before async attributes settled");
			return (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
		},
		enumerable: false,
		configurable: true
	});
	/**
	* Returns a promise that will never be rejected. Resolves when all async attributes have finished being added to
	* this Resource's attributes. This is useful in exporters to block until resource detection
	* has finished.
	*/
	Resource.prototype.waitForAsyncAttributes = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.asyncAttributesPending) return [3, 2];
						return [4, this._asyncAttributesPromise];
					case 1:
						_a.sent();
						_a.label = 2;
					case 2: return [2];
				}
			});
		});
	};
	/**
	* Returns a new, merged {@link Resource} by merging the current Resource
	* with the other Resource. In case of a collision, other Resource takes
	* precedence.
	*
	* @param other the Resource that will be merged with this.
	* @returns the newly merged Resource.
	*/
	Resource.prototype.merge = function(other) {
		var _this = this;
		var _a;
		if (!other) return this;
		var mergedSyncAttributes = __assign$1(__assign$1({}, this._syncAttributes), (_a = other._syncAttributes) !== null && _a !== void 0 ? _a : other.attributes);
		if (!this._asyncAttributesPromise && !other._asyncAttributesPromise) return new Resource(mergedSyncAttributes);
		return new Resource(mergedSyncAttributes, Promise.all([this._asyncAttributesPromise, other._asyncAttributesPromise]).then(function(_a) {
			var _b;
			var _c = __read$3(_a, 2), thisAsyncAttributes = _c[0], otherAsyncAttributes = _c[1];
			return __assign$1(__assign$1(__assign$1(__assign$1({}, _this._syncAttributes), thisAsyncAttributes), (_b = other._syncAttributes) !== null && _b !== void 0 ? _b : other.attributes), otherAsyncAttributes);
		}));
	};
	Resource.EMPTY = new Resource({});
	return Resource;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/enums.js
var ExceptionEventName = "exception";
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/Span.js
init_esm();
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __values$1 = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$2 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$2 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
/**
* This class represents a span.
*/
var Span = function() {
	/**
	* Constructs a new Span instance.
	*
	* @deprecated calling Span constructor directly is not supported. Please use tracer.startSpan.
	* */
	function Span(parentTracer, context, spanName, spanContext, kind, parentSpanId, links, startTime, _deprecatedClock, attributes) {
		if (links === void 0) links = [];
		this.attributes = {};
		this.links = [];
		this.events = [];
		this._droppedAttributesCount = 0;
		this._droppedEventsCount = 0;
		this._droppedLinksCount = 0;
		this.status = { code: SpanStatusCode.UNSET };
		this.endTime = [0, 0];
		this._ended = false;
		this._duration = [-1, -1];
		this.name = spanName;
		this._spanContext = spanContext;
		this.parentSpanId = parentSpanId;
		this.kind = kind;
		this.links = links;
		var now = Date.now();
		this._performanceStartTime = otperformance.now();
		this._performanceOffset = now - (this._performanceStartTime + getTimeOrigin());
		this._startTimeProvided = startTime != null;
		this.startTime = this._getTime(startTime !== null && startTime !== void 0 ? startTime : now);
		this.resource = parentTracer.resource;
		this.instrumentationLibrary = parentTracer.instrumentationLibrary;
		this._spanLimits = parentTracer.getSpanLimits();
		this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
		if (attributes != null) this.setAttributes(attributes);
		this._spanProcessor = parentTracer.getActiveSpanProcessor();
		this._spanProcessor.onStart(this, context);
	}
	Span.prototype.spanContext = function() {
		return this._spanContext;
	};
	Span.prototype.setAttribute = function(key, value) {
		if (value == null || this._isSpanEnded()) return this;
		if (key.length === 0) {
			diag.warn("Invalid attribute key: " + key);
			return this;
		}
		if (!isAttributeValue(value)) {
			diag.warn("Invalid attribute value set for key: " + key);
			return this;
		}
		if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
			this._droppedAttributesCount++;
			return this;
		}
		this.attributes[key] = this._truncateToSize(value);
		return this;
	};
	Span.prototype.setAttributes = function(attributes) {
		var e_1, _a;
		try {
			for (var _b = __values$1(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
				var _d = __read$2(_c.value, 2), k = _d[0], v = _d[1];
				this.setAttribute(k, v);
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		return this;
	};
	/**
	*
	* @param name Span Name
	* @param [attributesOrStartTime] Span attributes or start time
	*     if type is {@type TimeInput} and 3rd param is undefined
	* @param [timeStamp] Specified time stamp for the event
	*/
	Span.prototype.addEvent = function(name, attributesOrStartTime, timeStamp) {
		if (this._isSpanEnded()) return this;
		if (this._spanLimits.eventCountLimit === 0) {
			diag.warn("No events allowed.");
			this._droppedEventsCount++;
			return this;
		}
		if (this.events.length >= this._spanLimits.eventCountLimit) {
			if (this._droppedEventsCount === 0) diag.debug("Dropping extra events.");
			this.events.shift();
			this._droppedEventsCount++;
		}
		if (isTimeInput(attributesOrStartTime)) {
			if (!isTimeInput(timeStamp)) timeStamp = attributesOrStartTime;
			attributesOrStartTime = void 0;
		}
		var attributes = sanitizeAttributes(attributesOrStartTime);
		this.events.push({
			name,
			attributes,
			time: this._getTime(timeStamp),
			droppedAttributesCount: 0
		});
		return this;
	};
	Span.prototype.addLink = function(link) {
		this.links.push(link);
		return this;
	};
	Span.prototype.addLinks = function(links) {
		var _a;
		(_a = this.links).push.apply(_a, __spreadArray$2([], __read$2(links), false));
		return this;
	};
	Span.prototype.setStatus = function(status) {
		if (this._isSpanEnded()) return this;
		this.status = __assign({}, status);
		if (this.status.message != null && typeof status.message !== "string") {
			diag.warn("Dropping invalid status.message of type '" + typeof status.message + "', expected 'string'");
			delete this.status.message;
		}
		return this;
	};
	Span.prototype.updateName = function(name) {
		if (this._isSpanEnded()) return this;
		this.name = name;
		return this;
	};
	Span.prototype.end = function(endTime) {
		if (this._isSpanEnded()) {
			diag.error(this.name + " " + this._spanContext.traceId + "-" + this._spanContext.spanId + " - You can only call end() on a span once.");
			return;
		}
		this._ended = true;
		this.endTime = this._getTime(endTime);
		this._duration = hrTimeDuration(this.startTime, this.endTime);
		if (this._duration[0] < 0) {
			diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
			this.endTime = this.startTime.slice();
			this._duration = [0, 0];
		}
		if (this._droppedEventsCount > 0) diag.warn("Dropped " + this._droppedEventsCount + " events because eventCountLimit reached");
		this._spanProcessor.onEnd(this);
	};
	Span.prototype._getTime = function(inp) {
		if (typeof inp === "number" && inp <= otperformance.now()) return hrTime(inp + this._performanceOffset);
		if (typeof inp === "number") return millisToHrTime(inp);
		if (inp instanceof Date) return millisToHrTime(inp.getTime());
		if (isTimeInputHrTime(inp)) return inp;
		if (this._startTimeProvided) return millisToHrTime(Date.now());
		var msDuration = otperformance.now() - this._performanceStartTime;
		return addHrTimes(this.startTime, millisToHrTime(msDuration));
	};
	Span.prototype.isRecording = function() {
		return this._ended === false;
	};
	Span.prototype.recordException = function(exception, time) {
		var attributes = {};
		if (typeof exception === "string") attributes[SEMATTRS_EXCEPTION_MESSAGE] = exception;
		else if (exception) {
			if (exception.code) attributes[SEMATTRS_EXCEPTION_TYPE] = exception.code.toString();
			else if (exception.name) attributes[SEMATTRS_EXCEPTION_TYPE] = exception.name;
			if (exception.message) attributes[SEMATTRS_EXCEPTION_MESSAGE] = exception.message;
			if (exception.stack) attributes[SEMATTRS_EXCEPTION_STACKTRACE] = exception.stack;
		}
		if (attributes["exception.type"] || attributes["exception.message"]) this.addEvent(ExceptionEventName, attributes, time);
		else diag.warn("Failed to record an exception " + exception);
	};
	Object.defineProperty(Span.prototype, "duration", {
		get: function() {
			return this._duration;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Span.prototype, "ended", {
		get: function() {
			return this._ended;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Span.prototype, "droppedAttributesCount", {
		get: function() {
			return this._droppedAttributesCount;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Span.prototype, "droppedEventsCount", {
		get: function() {
			return this._droppedEventsCount;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Span.prototype, "droppedLinksCount", {
		get: function() {
			return this._droppedLinksCount;
		},
		enumerable: false,
		configurable: true
	});
	Span.prototype._isSpanEnded = function() {
		if (this._ended) diag.warn("Can not execute the operation on ended Span {traceId: " + this._spanContext.traceId + ", spanId: " + this._spanContext.spanId + "}");
		return this._ended;
	};
	Span.prototype._truncateToLimitUtil = function(value, limit) {
		if (value.length <= limit) return value;
		return value.substring(0, limit);
	};
	/**
	* If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
	* return string with truncated to {@code attributeValueLengthLimit} characters
	*
	* If the given attribute value is array of strings then
	* return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
	*
	* Otherwise return same Attribute {@code value}
	*
	* @param value Attribute value
	* @returns truncated attribute value if required, otherwise same value
	*/
	Span.prototype._truncateToSize = function(value) {
		var _this = this;
		var limit = this._attributeValueLengthLimit;
		if (limit <= 0) {
			diag.warn("Attribute value limit must be positive, got " + limit);
			return value;
		}
		if (typeof value === "string") return this._truncateToLimitUtil(value, limit);
		if (Array.isArray(value)) return value.map(function(val) {
			return typeof val === "string" ? _this._truncateToLimitUtil(val, limit) : val;
		});
		return value;
	};
	return Span;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/Sampler.js
/**
* A sampling decision that determines how a {@link Span} will be recorded
* and collected.
*/
var SamplingDecision;
(function(SamplingDecision) {
	/**
	* `Span.isRecording() === false`, span will not be recorded and all events
	* and attributes will be dropped.
	*/
	SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
	/**
	* `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
	* MUST NOT be set.
	*/
	SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
	/**
	* `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
	* MUST be set.
	*/
	SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {}));
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOffSampler.js
/** Sampler that samples no traces. */
var AlwaysOffSampler = function() {
	function AlwaysOffSampler() {}
	AlwaysOffSampler.prototype.shouldSample = function() {
		return { decision: SamplingDecision.NOT_RECORD };
	};
	AlwaysOffSampler.prototype.toString = function() {
		return "AlwaysOffSampler";
	};
	return AlwaysOffSampler;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOnSampler.js
/** Sampler that samples all traces. */
var AlwaysOnSampler = function() {
	function AlwaysOnSampler() {}
	AlwaysOnSampler.prototype.shouldSample = function() {
		return { decision: SamplingDecision.RECORD_AND_SAMPLED };
	};
	AlwaysOnSampler.prototype.toString = function() {
		return "AlwaysOnSampler";
	};
	return AlwaysOnSampler;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/ParentBasedSampler.js
init_esm();
/**
* A composite sampler that either respects the parent span's sampling decision
* or delegates to `delegateSampler` for root spans.
*/
var ParentBasedSampler = function() {
	function ParentBasedSampler(config) {
		var _a, _b, _c, _d;
		this._root = config.root;
		if (!this._root) {
			globalErrorHandler(/* @__PURE__ */ new Error("ParentBasedSampler must have a root sampler configured"));
			this._root = new AlwaysOnSampler();
		}
		this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler();
		this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler();
		this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler();
		this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler();
	}
	ParentBasedSampler.prototype.shouldSample = function(context, traceId, spanName, spanKind, attributes, links) {
		var parentContext = trace.getSpanContext(context);
		if (!parentContext || !isSpanContextValid(parentContext)) return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		if (parentContext.isRemote) {
			if (parentContext.traceFlags & TraceFlags.SAMPLED) return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
			return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		}
		if (parentContext.traceFlags & TraceFlags.SAMPLED) return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
	};
	ParentBasedSampler.prototype.toString = function() {
		return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
	};
	return ParentBasedSampler;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/TraceIdRatioBasedSampler.js
init_esm();
/** Sampler that samples a given fraction of traces based of trace id deterministically. */
var TraceIdRatioBasedSampler = function() {
	function TraceIdRatioBasedSampler(_ratio) {
		if (_ratio === void 0) _ratio = 0;
		this._ratio = _ratio;
		this._ratio = this._normalize(_ratio);
		this._upperBound = Math.floor(this._ratio * 4294967295);
	}
	TraceIdRatioBasedSampler.prototype.shouldSample = function(context, traceId) {
		return { decision: isValidTraceId(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD };
	};
	TraceIdRatioBasedSampler.prototype.toString = function() {
		return "TraceIdRatioBased{" + this._ratio + "}";
	};
	TraceIdRatioBasedSampler.prototype._normalize = function(ratio) {
		if (typeof ratio !== "number" || isNaN(ratio)) return 0;
		return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
	};
	TraceIdRatioBasedSampler.prototype._accumulate = function(traceId) {
		var accumulation = 0;
		for (var i = 0; i < traceId.length / 8; i++) {
			var pos = i * 8;
			var part = parseInt(traceId.slice(pos, pos + 8), 16);
			accumulation = (accumulation ^ part) >>> 0;
		}
		return accumulation;
	};
	return TraceIdRatioBasedSampler;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/config.js
init_esm();
var FALLBACK_OTEL_TRACES_SAMPLER = TracesSamplerValues.AlwaysOn;
var DEFAULT_RATIO = 1;
/**
* Load default configuration. For fields with primitive values, any user-provided
* value will override the corresponding default value. For fields with
* non-primitive values (like `spanLimits`), the user-provided value will be
* used to extend the default value.
*/
function loadDefaultConfig() {
	var env = getEnv();
	return {
		sampler: buildSamplerFromEnv(env),
		forceFlushTimeoutMillis: 3e4,
		generalLimits: {
			attributeValueLengthLimit: env.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
			attributeCountLimit: env.OTEL_ATTRIBUTE_COUNT_LIMIT
		},
		spanLimits: {
			attributeValueLengthLimit: env.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
			attributeCountLimit: env.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
			linkCountLimit: env.OTEL_SPAN_LINK_COUNT_LIMIT,
			eventCountLimit: env.OTEL_SPAN_EVENT_COUNT_LIMIT,
			attributePerEventCountLimit: env.OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
			attributePerLinkCountLimit: env.OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
		},
		mergeResourceWithDefaults: true
	};
}
/**
* Based on environment, builds a sampler, complies with specification.
* @param environment optional, by default uses getEnv(), but allows passing a value to reuse parsed environment
*/
function buildSamplerFromEnv(environment) {
	if (environment === void 0) environment = getEnv();
	switch (environment.OTEL_TRACES_SAMPLER) {
		case TracesSamplerValues.AlwaysOn: return new AlwaysOnSampler();
		case TracesSamplerValues.AlwaysOff: return new AlwaysOffSampler();
		case TracesSamplerValues.ParentBasedAlwaysOn: return new ParentBasedSampler({ root: new AlwaysOnSampler() });
		case TracesSamplerValues.ParentBasedAlwaysOff: return new ParentBasedSampler({ root: new AlwaysOffSampler() });
		case TracesSamplerValues.TraceIdRatio: return new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment));
		case TracesSamplerValues.ParentBasedTraceIdRatio: return new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment)) });
		default:
			diag.error("OTEL_TRACES_SAMPLER value \"" + environment.OTEL_TRACES_SAMPLER + " invalid, defaulting to " + FALLBACK_OTEL_TRACES_SAMPLER + "\".");
			return new AlwaysOnSampler();
	}
}
function getSamplerProbabilityFromEnv(environment) {
	if (environment.OTEL_TRACES_SAMPLER_ARG === void 0 || environment.OTEL_TRACES_SAMPLER_ARG === "") {
		diag.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to " + DEFAULT_RATIO + ".");
		return DEFAULT_RATIO;
	}
	var probability = Number(environment.OTEL_TRACES_SAMPLER_ARG);
	if (isNaN(probability)) {
		diag.error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is invalid, defaulting to " + DEFAULT_RATIO + ".");
		return DEFAULT_RATIO;
	}
	if (probability < 0 || probability > 1) {
		diag.error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is out of range ([0..1]), defaulting to " + DEFAULT_RATIO + ".");
		return DEFAULT_RATIO;
	}
	return probability;
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/utility.js
/**
* Function to merge Default configuration (as specified in './config') with
* user provided configurations.
*/
function mergeConfig(userConfig) {
	var perInstanceDefaults = { sampler: buildSamplerFromEnv() };
	var DEFAULT_CONFIG = loadDefaultConfig();
	var target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
	target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
	target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
	return target;
}
/**
* When general limits are provided and model specific limits are not,
* configures the model specific limits by using the values from the general ones.
* @param userConfig User provided tracer configuration
*/
function reconfigureLimits(userConfig) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
	var spanLimits = Object.assign({}, userConfig.spanLimits);
	var parsedEnvConfig = getEnvWithoutDefaults();
	/**
	* Reassign span attribute count limit to use first non null value defined by user or use default value
	*/
	spanLimits.attributeCountLimit = (_f = (_e = (_d = (_b = (_a = userConfig.spanLimits) === null || _a === void 0 ? void 0 : _a.attributeCountLimit) !== null && _b !== void 0 ? _b : (_c = userConfig.generalLimits) === null || _c === void 0 ? void 0 : _c.attributeCountLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _f !== void 0 ? _f : 128;
	/**
	* Reassign span attribute value length limit to use first non null value defined by user or use default value
	*/
	spanLimits.attributeValueLengthLimit = (_m = (_l = (_k = (_h = (_g = userConfig.spanLimits) === null || _g === void 0 ? void 0 : _g.attributeValueLengthLimit) !== null && _h !== void 0 ? _h : (_j = userConfig.generalLimits) === null || _j === void 0 ? void 0 : _j.attributeValueLengthLimit) !== null && _k !== void 0 ? _k : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _l !== void 0 ? _l : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _m !== void 0 ? _m : DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
	return Object.assign({}, userConfig, { spanLimits });
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/export/BatchSpanProcessorBase.js
init_esm();
/**
* Implementation of the {@link SpanProcessor} that batches spans exported by
* the SDK then pushes them to the exporter pipeline.
*/
var BatchSpanProcessorBase = function() {
	function BatchSpanProcessorBase(_exporter, config) {
		this._exporter = _exporter;
		this._isExporting = false;
		this._finishedSpans = [];
		this._droppedSpansCount = 0;
		var env = getEnv();
		this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
		this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
		this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
		this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
		this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
		if (this._maxExportBatchSize > this._maxQueueSize) {
			diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
			this._maxExportBatchSize = this._maxQueueSize;
		}
	}
	BatchSpanProcessorBase.prototype.forceFlush = function() {
		if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
		return this._flushAll();
	};
	BatchSpanProcessorBase.prototype.onStart = function(_span, _parentContext) {};
	BatchSpanProcessorBase.prototype.onEnd = function(span) {
		if (this._shutdownOnce.isCalled) return;
		if ((span.spanContext().traceFlags & TraceFlags.SAMPLED) === 0) return;
		this._addToBuffer(span);
	};
	BatchSpanProcessorBase.prototype.shutdown = function() {
		return this._shutdownOnce.call();
	};
	BatchSpanProcessorBase.prototype._shutdown = function() {
		var _this = this;
		return Promise.resolve().then(function() {
			return _this.onShutdown();
		}).then(function() {
			return _this._flushAll();
		}).then(function() {
			return _this._exporter.shutdown();
		});
	};
	/** Add a span in the buffer. */
	BatchSpanProcessorBase.prototype._addToBuffer = function(span) {
		if (this._finishedSpans.length >= this._maxQueueSize) {
			if (this._droppedSpansCount === 0) diag.debug("maxQueueSize reached, dropping spans");
			this._droppedSpansCount++;
			return;
		}
		if (this._droppedSpansCount > 0) {
			diag.warn("Dropped " + this._droppedSpansCount + " spans because maxQueueSize reached");
			this._droppedSpansCount = 0;
		}
		this._finishedSpans.push(span);
		this._maybeStartTimer();
	};
	/**
	* Send all spans to the exporter respecting the batch size limit
	* This function is used only on forceFlush or shutdown,
	* for all other cases _flush should be used
	* */
	BatchSpanProcessorBase.prototype._flushAll = function() {
		var _this = this;
		return new Promise(function(resolve, reject) {
			var promises = [];
			var count = Math.ceil(_this._finishedSpans.length / _this._maxExportBatchSize);
			for (var i = 0, j = count; i < j; i++) promises.push(_this._flushOneBatch());
			Promise.all(promises).then(function() {
				resolve();
			}).catch(reject);
		});
	};
	BatchSpanProcessorBase.prototype._flushOneBatch = function() {
		var _this = this;
		this._clearTimer();
		if (this._finishedSpans.length === 0) return Promise.resolve();
		return new Promise(function(resolve, reject) {
			var timer = setTimeout(function() {
				reject(/* @__PURE__ */ new Error("Timeout"));
			}, _this._exportTimeoutMillis);
			context.with(suppressTracing(context.active()), function() {
				var spans;
				if (_this._finishedSpans.length <= _this._maxExportBatchSize) {
					spans = _this._finishedSpans;
					_this._finishedSpans = [];
				} else spans = _this._finishedSpans.splice(0, _this._maxExportBatchSize);
				var doExport = function() {
					return _this._exporter.export(spans, function(result) {
						var _a;
						clearTimeout(timer);
						if (result.code === ExportResultCode.SUCCESS) resolve();
						else reject((_a = result.error) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Error("BatchSpanProcessor: span export failed"));
					});
				};
				var pendingResources = null;
				for (var i = 0, len = spans.length; i < len; i++) {
					var span = spans[i];
					if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
						pendingResources !== null && pendingResources !== void 0 || (pendingResources = []);
						pendingResources.push(span.resource.waitForAsyncAttributes());
					}
				}
				if (pendingResources === null) doExport();
				else Promise.all(pendingResources).then(doExport, function(err) {
					globalErrorHandler(err);
					reject(err);
				});
			});
		});
	};
	BatchSpanProcessorBase.prototype._maybeStartTimer = function() {
		var _this = this;
		if (this._isExporting) return;
		var flush = function() {
			_this._isExporting = true;
			_this._flushOneBatch().finally(function() {
				_this._isExporting = false;
				if (_this._finishedSpans.length > 0) {
					_this._clearTimer();
					_this._maybeStartTimer();
				}
			}).catch(function(e) {
				_this._isExporting = false;
				globalErrorHandler(e);
			});
		};
		if (this._finishedSpans.length >= this._maxExportBatchSize) return flush();
		if (this._timer !== void 0) return;
		this._timer = setTimeout(function() {
			return flush();
		}, this._scheduledDelayMillis);
		this._timer;
	};
	BatchSpanProcessorBase.prototype._clearTimer = function() {
		if (this._timer !== void 0) {
			clearTimeout(this._timer);
			this._timer = void 0;
		}
	};
	return BatchSpanProcessorBase;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/export/BatchSpanProcessor.js
var __extends$1 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var BatchSpanProcessor = function(_super) {
	__extends$1(BatchSpanProcessor, _super);
	function BatchSpanProcessor(_exporter, config) {
		var _this = _super.call(this, _exporter, config) || this;
		_this.onInit(config);
		return _this;
	}
	BatchSpanProcessor.prototype.onInit = function(config) {
		var _this = this;
		if ((config === null || config === void 0 ? void 0 : config.disableAutoFlushOnDocumentHide) !== true && typeof document !== "undefined") {
			this._visibilityChangeListener = function() {
				if (document.visibilityState === "hidden") _this.forceFlush().catch(function(error) {
					globalErrorHandler(error);
				});
			};
			this._pageHideListener = function() {
				_this.forceFlush().catch(function(error) {
					globalErrorHandler(error);
				});
			};
			document.addEventListener("visibilitychange", this._visibilityChangeListener);
			document.addEventListener("pagehide", this._pageHideListener);
		}
	};
	BatchSpanProcessor.prototype.onShutdown = function() {
		if (typeof document !== "undefined") {
			if (this._visibilityChangeListener) document.removeEventListener("visibilitychange", this._visibilityChangeListener);
			if (this._pageHideListener) document.removeEventListener("pagehide", this._pageHideListener);
		}
	};
	return BatchSpanProcessor;
}(BatchSpanProcessorBase);
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/RandomIdGenerator.js
var SPAN_ID_BYTES = 8;
var TRACE_ID_BYTES = 16;
var RandomIdGenerator = function() {
	function RandomIdGenerator() {
		/**
		* Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
		* characters corresponding to 128 bits.
		*/
		this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
		/**
		* Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
		* characters corresponding to 64 bits.
		*/
		this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
	}
	return RandomIdGenerator;
}();
var SHARED_CHAR_CODES_ARRAY = Array(32);
function getIdGenerator(bytes) {
	return function generateId() {
		for (var i = 0; i < bytes * 2; i++) {
			SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48;
			if (SHARED_CHAR_CODES_ARRAY[i] >= 58) SHARED_CHAR_CODES_ARRAY[i] += 39;
		}
		return String.fromCharCode.apply(null, SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2));
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/Tracer.js
init_esm();
/**
* This class represents a basic tracer.
*/
var Tracer = function() {
	/**
	* Constructs a new Tracer instance.
	*/
	function Tracer(instrumentationLibrary, config, _tracerProvider) {
		this._tracerProvider = _tracerProvider;
		var localConfig = mergeConfig(config);
		this._sampler = localConfig.sampler;
		this._generalLimits = localConfig.generalLimits;
		this._spanLimits = localConfig.spanLimits;
		this._idGenerator = config.idGenerator || new RandomIdGenerator();
		this.resource = _tracerProvider.resource;
		this.instrumentationLibrary = instrumentationLibrary;
	}
	/**
	* Starts a new Span or returns the default NoopSpan based on the sampling
	* decision.
	*/
	Tracer.prototype.startSpan = function(name, options, context$1) {
		var _a, _b, _c;
		if (options === void 0) options = {};
		if (context$1 === void 0) context$1 = context.active();
		if (options.root) context$1 = trace.deleteSpan(context$1);
		var parentSpan = trace.getSpan(context$1);
		if (isTracingSuppressed(context$1)) {
			diag.debug("Instrumentation suppressed, returning Noop Span");
			var nonRecordingSpan = trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
			return nonRecordingSpan;
		}
		var parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
		var spanId = this._idGenerator.generateSpanId();
		var traceId;
		var traceState;
		var parentSpanId;
		if (!parentSpanContext || !trace.isSpanContextValid(parentSpanContext)) traceId = this._idGenerator.generateTraceId();
		else {
			traceId = parentSpanContext.traceId;
			traceState = parentSpanContext.traceState;
			parentSpanId = parentSpanContext.spanId;
		}
		var spanKind = (_a = options.kind) !== null && _a !== void 0 ? _a : SpanKind.INTERNAL;
		var links = ((_b = options.links) !== null && _b !== void 0 ? _b : []).map(function(link) {
			return {
				context: link.context,
				attributes: sanitizeAttributes(link.attributes)
			};
		});
		var attributes = sanitizeAttributes(options.attributes);
		var samplingResult = this._sampler.shouldSample(context$1, traceId, name, spanKind, attributes, links);
		traceState = (_c = samplingResult.traceState) !== null && _c !== void 0 ? _c : traceState;
		var traceFlags = samplingResult.decision === SamplingDecision$1.RECORD_AND_SAMPLED ? TraceFlags.SAMPLED : TraceFlags.NONE;
		var spanContext = {
			traceId,
			spanId,
			traceFlags,
			traceState
		};
		if (samplingResult.decision === SamplingDecision$1.NOT_RECORD) {
			diag.debug("Recording is off, propagating context in a non-recording span");
			var nonRecordingSpan = trace.wrapSpanContext(spanContext);
			return nonRecordingSpan;
		}
		var initAttributes = sanitizeAttributes(Object.assign(attributes, samplingResult.attributes));
		return new Span(this, context$1, name, spanContext, spanKind, parentSpanId, links, options.startTime, void 0, initAttributes);
	};
	Tracer.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
		var opts;
		var ctx;
		var fn;
		if (arguments.length < 2) return;
		else if (arguments.length === 2) fn = arg2;
		else if (arguments.length === 3) {
			opts = arg2;
			fn = arg3;
		} else {
			opts = arg2;
			ctx = arg3;
			fn = arg4;
		}
		var parentContext = ctx !== null && ctx !== void 0 ? ctx : context.active();
		var span = this.startSpan(name, opts, parentContext);
		var contextWithSpanSet = trace.setSpan(parentContext, span);
		return context.with(contextWithSpanSet, fn, void 0, span);
	};
	/** Returns the active {@link GeneralLimits}. */
	Tracer.prototype.getGeneralLimits = function() {
		return this._generalLimits;
	};
	/** Returns the active {@link SpanLimits}. */
	Tracer.prototype.getSpanLimits = function() {
		return this._spanLimits;
	};
	Tracer.prototype.getActiveSpanProcessor = function() {
		return this._tracerProvider.getActiveSpanProcessor();
	};
	return Tracer;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/MultiSpanProcessor.js
var __values = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
* Implementation of the {@link SpanProcessor} that simply forwards all
* received events to a list of {@link SpanProcessor}s.
*/
var MultiSpanProcessor = function() {
	function MultiSpanProcessor(_spanProcessors) {
		this._spanProcessors = _spanProcessors;
	}
	MultiSpanProcessor.prototype.forceFlush = function() {
		var e_1, _a;
		var promises = [];
		try {
			for (var _b = __values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
				var spanProcessor = _c.value;
				promises.push(spanProcessor.forceFlush());
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		return new Promise(function(resolve) {
			Promise.all(promises).then(function() {
				resolve();
			}).catch(function(error) {
				globalErrorHandler(error || /* @__PURE__ */ new Error("MultiSpanProcessor: forceFlush failed"));
				resolve();
			});
		});
	};
	MultiSpanProcessor.prototype.onStart = function(span, context) {
		var e_2, _a;
		try {
			for (var _b = __values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) _c.value.onStart(span, context);
		} catch (e_2_1) {
			e_2 = { error: e_2_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_2) throw e_2.error;
			}
		}
	};
	MultiSpanProcessor.prototype.onEnd = function(span) {
		var e_3, _a;
		try {
			for (var _b = __values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) _c.value.onEnd(span);
		} catch (e_3_1) {
			e_3 = { error: e_3_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_3) throw e_3.error;
			}
		}
	};
	MultiSpanProcessor.prototype.shutdown = function() {
		var e_4, _a;
		var promises = [];
		try {
			for (var _b = __values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
				var spanProcessor = _c.value;
				promises.push(spanProcessor.shutdown());
			}
		} catch (e_4_1) {
			e_4 = { error: e_4_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_4) throw e_4.error;
			}
		}
		return new Promise(function(resolve, reject) {
			Promise.all(promises).then(function() {
				resolve();
			}, reject);
		});
	};
	return MultiSpanProcessor;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/export/NoopSpanProcessor.js
/** No-op implementation of SpanProcessor */
var NoopSpanProcessor = function() {
	function NoopSpanProcessor() {}
	NoopSpanProcessor.prototype.onStart = function(_span, _context) {};
	NoopSpanProcessor.prototype.onEnd = function(_span) {};
	NoopSpanProcessor.prototype.shutdown = function() {
		return Promise.resolve();
	};
	NoopSpanProcessor.prototype.forceFlush = function() {
		return Promise.resolve();
	};
	return NoopSpanProcessor;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-ba_e6e7b6b6d817ce552ed74ad5b04c04c8/node_modules/@opentelemetry/sdk-trace-base/build/esm/BasicTracerProvider.js
init_esm();
var __read$1 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$1 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var ForceFlushState;
(function(ForceFlushState) {
	ForceFlushState[ForceFlushState["resolved"] = 0] = "resolved";
	ForceFlushState[ForceFlushState["timeout"] = 1] = "timeout";
	ForceFlushState[ForceFlushState["error"] = 2] = "error";
	ForceFlushState[ForceFlushState["unresolved"] = 3] = "unresolved";
})(ForceFlushState || (ForceFlushState = {}));
/**
* This class represents a basic tracer provider which platform libraries can extend
*/
var BasicTracerProvider = function() {
	function BasicTracerProvider(config) {
		if (config === void 0) config = {};
		var _a, _b;
		this._registeredSpanProcessors = [];
		this._tracers = /* @__PURE__ */ new Map();
		var mergedConfig = merge({}, loadDefaultConfig(), reconfigureLimits(config));
		this.resource = (_a = mergedConfig.resource) !== null && _a !== void 0 ? _a : Resource.empty();
		if (mergedConfig.mergeResourceWithDefaults) this.resource = Resource.default().merge(this.resource);
		this._config = Object.assign({}, mergedConfig, { resource: this.resource });
		if ((_b = config.spanProcessors) === null || _b === void 0 ? void 0 : _b.length) {
			this._registeredSpanProcessors = __spreadArray$1([], __read$1(config.spanProcessors), false);
			this.activeSpanProcessor = new MultiSpanProcessor(this._registeredSpanProcessors);
		} else {
			var defaultExporter = this._buildExporterFromEnv();
			if (defaultExporter !== void 0) {
				var batchProcessor = new BatchSpanProcessor(defaultExporter);
				this.activeSpanProcessor = batchProcessor;
			} else this.activeSpanProcessor = new NoopSpanProcessor();
		}
	}
	BasicTracerProvider.prototype.getTracer = function(name, version, options) {
		var key = name + "@" + (version || "") + ":" + ((options === null || options === void 0 ? void 0 : options.schemaUrl) || "");
		if (!this._tracers.has(key)) this._tracers.set(key, new Tracer({
			name,
			version,
			schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl
		}, this._config, this));
		return this._tracers.get(key);
	};
	/**
	* @deprecated please use {@link TracerConfig} spanProcessors property
	* Adds a new {@link SpanProcessor} to this tracer.
	* @param spanProcessor the new SpanProcessor to be added.
	*/
	BasicTracerProvider.prototype.addSpanProcessor = function(spanProcessor) {
		if (this._registeredSpanProcessors.length === 0) this.activeSpanProcessor.shutdown().catch(function(err) {
			return diag.error("Error while trying to shutdown current span processor", err);
		});
		this._registeredSpanProcessors.push(spanProcessor);
		this.activeSpanProcessor = new MultiSpanProcessor(this._registeredSpanProcessors);
	};
	BasicTracerProvider.prototype.getActiveSpanProcessor = function() {
		return this.activeSpanProcessor;
	};
	/**
	* Register this TracerProvider for use with the OpenTelemetry API.
	* Undefined values may be replaced with defaults, and
	* null values will be skipped.
	*
	* @param config Configuration object for SDK registration
	*/
	BasicTracerProvider.prototype.register = function(config) {
		if (config === void 0) config = {};
		trace.setGlobalTracerProvider(this);
		if (config.propagator === void 0) config.propagator = this._buildPropagatorFromEnv();
		if (config.contextManager) context.setGlobalContextManager(config.contextManager);
		if (config.propagator) propagation.setGlobalPropagator(config.propagator);
	};
	BasicTracerProvider.prototype.forceFlush = function() {
		var timeout = this._config.forceFlushTimeoutMillis;
		var promises = this._registeredSpanProcessors.map(function(spanProcessor) {
			return new Promise(function(resolve) {
				var state;
				var timeoutInterval = setTimeout(function() {
					resolve(/* @__PURE__ */ new Error("Span processor did not completed within timeout period of " + timeout + " ms"));
					state = ForceFlushState.timeout;
				}, timeout);
				spanProcessor.forceFlush().then(function() {
					clearTimeout(timeoutInterval);
					if (state !== ForceFlushState.timeout) {
						state = ForceFlushState.resolved;
						resolve(state);
					}
				}).catch(function(error) {
					clearTimeout(timeoutInterval);
					state = ForceFlushState.error;
					resolve(error);
				});
			});
		});
		return new Promise(function(resolve, reject) {
			Promise.all(promises).then(function(results) {
				var errors = results.filter(function(result) {
					return result !== ForceFlushState.resolved;
				});
				if (errors.length > 0) reject(errors);
				else resolve();
			}).catch(function(error) {
				return reject([error]);
			});
		});
	};
	BasicTracerProvider.prototype.shutdown = function() {
		return this.activeSpanProcessor.shutdown();
	};
	/**
	* TS cannot yet infer the type of this.constructor:
	* https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
	* There is no need to override either of the getters in your child class.
	* The type of the registered component maps should be the same across all
	* classes in the inheritance tree.
	*/
	BasicTracerProvider.prototype._getPropagator = function(name) {
		var _a;
		return (_a = this.constructor._registeredPropagators.get(name)) === null || _a === void 0 ? void 0 : _a();
	};
	BasicTracerProvider.prototype._getSpanExporter = function(name) {
		var _a;
		return (_a = this.constructor._registeredExporters.get(name)) === null || _a === void 0 ? void 0 : _a();
	};
	BasicTracerProvider.prototype._buildPropagatorFromEnv = function() {
		var _this = this;
		var uniquePropagatorNames = Array.from(new Set(getEnv().OTEL_PROPAGATORS));
		var validPropagators = uniquePropagatorNames.map(function(name) {
			var propagator = _this._getPropagator(name);
			if (!propagator) diag.warn("Propagator \"" + name + "\" requested through environment variable is unavailable.");
			return propagator;
		}).reduce(function(list, item) {
			if (item) list.push(item);
			return list;
		}, []);
		if (validPropagators.length === 0) return;
		else if (uniquePropagatorNames.length === 1) return validPropagators[0];
		else return new CompositePropagator({ propagators: validPropagators });
	};
	BasicTracerProvider.prototype._buildExporterFromEnv = function() {
		var exporterName = getEnv().OTEL_TRACES_EXPORTER;
		if (exporterName === "none" || exporterName === "") return;
		var exporter = this._getSpanExporter(exporterName);
		if (!exporter) diag.error("Exporter \"" + exporterName + "\" requested through environment variable is unavailable.");
		return exporter;
	};
	BasicTracerProvider._registeredPropagators = /* @__PURE__ */ new Map([["tracecontext", function() {
		return new W3CTraceContextPropagator();
	}], ["baggage", function() {
		return new W3CBaggagePropagator();
	}]]);
	BasicTracerProvider._registeredExporters = /* @__PURE__ */ new Map();
	return BasicTracerProvider;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/StackContextManager.js
init_esm();
var __read = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
/**
* Stack Context Manager for managing the state in web
* it doesn't fully support the async calls though
*/
var StackContextManager = function() {
	function StackContextManager() {
		/**
		* whether the context manager is enabled or not
		*/
		this._enabled = false;
		/**
		* Keeps the reference to current context
		*/
		this._currentContext = ROOT_CONTEXT;
	}
	/**
	*
	* @param context
	* @param target Function to be executed within the context
	*/
	StackContextManager.prototype._bindFunction = function(context, target) {
		if (context === void 0) context = ROOT_CONTEXT;
		var manager = this;
		var contextWrapper = function() {
			var _this = this;
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return manager.with(context, function() {
				return target.apply(_this, args);
			});
		};
		Object.defineProperty(contextWrapper, "length", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: target.length
		});
		return contextWrapper;
	};
	/**
	* Returns the active context
	*/
	StackContextManager.prototype.active = function() {
		return this._currentContext;
	};
	/**
	* Binds a the certain context or the active one to the target function and then returns the target
	* @param context A context (span) to be bind to target
	* @param target a function or event emitter. When target or one of its callbacks is called,
	*  the provided context will be used as the active context for the duration of the call.
	*/
	StackContextManager.prototype.bind = function(context, target) {
		if (context === void 0) context = this.active();
		if (typeof target === "function") return this._bindFunction(context, target);
		return target;
	};
	/**
	* Disable the context manager (clears the current context)
	*/
	StackContextManager.prototype.disable = function() {
		this._currentContext = ROOT_CONTEXT;
		this._enabled = false;
		return this;
	};
	/**
	* Enables the context manager and creates a default(root) context
	*/
	StackContextManager.prototype.enable = function() {
		if (this._enabled) return this;
		this._enabled = true;
		this._currentContext = ROOT_CONTEXT;
		return this;
	};
	/**
	* Calls the callback function [fn] with the provided [context]. If [context] is undefined then it will use the window.
	* The context will be set as active
	* @param context
	* @param fn Callback function
	* @param thisArg optional receiver to be used for calling fn
	* @param args optional arguments forwarded to fn
	*/
	StackContextManager.prototype.with = function(context, fn, thisArg) {
		var args = [];
		for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
		var previousContext = this._currentContext;
		this._currentContext = context || ROOT_CONTEXT;
		try {
			return fn.call.apply(fn, __spreadArray([thisArg], __read(args), false));
		} finally {
			this._currentContext = previousContext;
		}
	};
	return StackContextManager;
}();
//#endregion
//#region ../../node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/WebTracerProvider.js
var __extends = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
/**
* This class represents a web tracer with {@link StackContextManager}
*/
var WebTracerProvider = function(_super) {
	__extends(WebTracerProvider, _super);
	/**
	* Constructs a new Tracer instance.
	* @param config Web Tracer config
	*/
	function WebTracerProvider(config) {
		if (config === void 0) config = {};
		var _this = _super.call(this, config) || this;
		if (config.contextManager) throw "contextManager should be defined in register method not in constructor";
		if (config.propagator) throw "propagator should be defined in register method not in constructor";
		return _this;
	}
	/**
	* Register this TracerProvider for use with the OpenTelemetry API.
	* Undefined values may be replaced with defaults, and
	* null values will be skipped.
	*
	* @param config Configuration object for SDK registration
	*/
	WebTracerProvider.prototype.register = function(config) {
		if (config === void 0) config = {};
		if (config.contextManager === void 0) config.contextManager = new StackContextManager();
		if (config.contextManager) config.contextManager.enable();
		_super.prototype.register.call(this, config);
	};
	return WebTracerProvider;
}(BasicTracerProvider);
//#endregion
//#region ../../packages/workbuddy-app/src/telemetry/renderer-trace-service.ts
init_span_timing_report();
init_tracing();
init_browser();
init_esm();
init_context_api();
init_trace_api();
/** 单次上报超时（ms），超时即放弃，不重试 */
var EXPORT_TIMEOUT_MS = 5e3;
/** 连续失败达到该次数后熔断 */
var MAX_CONSECUTIVE_FAILURES = 5;
/** 熔断静默时长（ms）：断网环境不再每 5s 打一次注定失败的请求 */
var CIRCUIT_OPEN_MS = 3e5;
/** 统一的失败原因，不透传原始网络错误对象（避免其堆栈进错误上报链路） */
var EXPORT_FAILED_MSG = "renderer otlp export failed";
/** sendBeacon 体积上限（Chromium 配额 64KB），超限直接放弃 */
var BEACON_MAX_BYTES = 61440;
var initialized = false;
var cachedProvider;
var disposeUnloadFlush;
function isRendererTracingReady() {
	return initialized && !!cachedProvider;
}
function forceFlushRendererTracing() {
	return cachedProvider?.forceFlush() ?? Promise.resolve();
}
async function shutdownRendererTracing() {
	setInstantSpanEmitter(void 0);
	setDurableSpanEmitter(void 0);
	setSpanTimingReporter(void 0);
	disposeUnloadFlush?.();
	disposeUnloadFlush = void 0;
	const provider = cachedProvider;
	cachedProvider = void 0;
	initialized = false;
	try {
		if (provider) {
			await provider.forceFlush().catch(() => void 0);
			await provider.shutdown().catch(() => void 0);
		}
	} finally {
		trace.disable();
		context.disable();
	}
}
/**
* 最小的 OTLP HTTP JSON exporter。
*
* 用 XHR 而非 fetch，三个原因：
* 1. aegis 的 XHR hook 会跳过带 `sendByAegis` 标记的请求，上报失败不会再被 aegis
*    当成 API 错误上报一次（fetch patch 没有这个后门，且其错误路径绕过 ignoreUrls，
*    形成"上报失败又被上报"的自噬噪音，见 issue 里的 `TypeError: Failed to fetch`）
* 2. XHR 没有 promise，网络失败走 onerror，不会冒成 unhandledrejection 被
*    main.tsx 的错误桥当成 RendererJSError 上报
* 3. XHR 默认 withCredentials=false 即匿名请求，与后端 `ACAO: *` 兼容；
*    fetch 还额外受 keepalive 64KB 配额限制，超限直接 `Failed to fetch`
*
* 失败一律静默：只回 FAILED 让 BatchSpanProcessor 丢弃这批 span，
* 连续失败 MAX_CONSECUTIVE_FAILURES 次后熔断 CIRCUIT_OPEN_MS。
*
* 关窗/reload（pagehide）走 sendBeacon 兜底，见 `postViaBeacon`。
*/
var RendererOtlpJsonExporter = class {
	constructor(url) {
		this.url = url;
		this.consecutiveFailures = 0;
		this.circuitOpenUntil = 0;
		this.unloading = false;
	}
	setUnloading(value) {
		this.unloading = value;
	}
	export(spans, resultCallback) {
		if (Date.now() < this.circuitOpenUntil) {
			resultCallback({ code: ExportResultCode.SUCCESS });
			return;
		}
		try {
			const otlpRequest = createExportTraceServiceRequest(spans, {
				useHex: true,
				useLongBits: false
			});
			const json = JSON.stringify(otlpRequest);
			if (this.unloading) {
				this.postViaBeacon(json, resultCallback);
				return;
			}
			this.post(new Blob([json], { type: "application/json" }), resultCallback);
		} catch {
			this.markFailure();
			resultCallback({
				code: ExportResultCode.FAILED,
				error: /* @__PURE__ */ new Error(EXPORT_FAILED_MSG)
			});
		}
	}
	/**
	* unload 阶段的唯一可靠通道：sendBeacon。
	*
	* - 同步交给浏览器网络栈后台发送，页面销毁也会发完（异步 XHR 会被取消，
	*   同步 XHR 自 Chromium M80 起在 page dismissal 阶段被直接拦截）
	* - 不经过 window.fetch / XMLHttpRequest，aegis 与 http-logger 都拦不到，天然静默
	* - 必须传 string 而非 Blob：string 的 Content-Type 是 text/plain（CORS 安全列表），
	*   no-cors 模式下不触发预检即可送达；带 application/json 的 Blob 会要求预检，
	*   而 beacon 是credentials=include，与后端 `ACAO: *` 冲突必然失败
	*   （已验证端点接受 text/plain 的 OTLP JSON）
	* - 返回 false 只代表未入队（多为超配额），不抛异常、不产生 rejection
	*/
	postViaBeacon(json, resultCallback) {
		let queued = false;
		try {
			queued = json.length <= BEACON_MAX_BYTES && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function" && navigator.sendBeacon(this.url, json);
		} catch {
			queued = false;
		}
		resultCallback(queued ? { code: ExportResultCode.SUCCESS } : {
			code: ExportResultCode.FAILED,
			error: /* @__PURE__ */ new Error(`${EXPORT_FAILED_MSG} (beacon)`)
		});
	}
	post(body, resultCallback) {
		const xhr = new XMLHttpRequest();
		xhr.sendByAegis = true;
		xhr.open("POST", this.url, true);
		xhr.timeout = EXPORT_TIMEOUT_MS;
		const fail = (reason) => {
			this.markFailure();
			resultCallback({
				code: ExportResultCode.FAILED,
				error: new Error(reason)
			});
		};
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				this.consecutiveFailures = 0;
				resultCallback({ code: ExportResultCode.SUCCESS });
				return;
			}
			fail(`${EXPORT_FAILED_MSG} (status=${xhr.status})`);
		};
		xhr.onerror = () => fail(EXPORT_FAILED_MSG);
		xhr.ontimeout = () => fail(`${EXPORT_FAILED_MSG} (timeout)`);
		xhr.onabort = () => fail(`${EXPORT_FAILED_MSG} (aborted)`);
		xhr.send(body);
	}
	markFailure() {
		this.consecutiveFailures += 1;
		if (this.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
			this.consecutiveFailures = 0;
			this.circuitOpenUntil = Date.now() + CIRCUIT_OPEN_MS;
		}
	}
	shutdown() {
		return Promise.resolve();
	}
	forceFlush() {
		return Promise.resolve();
	}
};
/**
* 每个 OTel span 结束时补一条 Aegis 自定义测速（metric = `wb.span.<spanName>`）。
*
* 只覆盖走 provider 的 span（tracer.startSpan / withActiveSpan / withChildSpan）。
* 手工 emitter span（emitPromptSpan / startPromptDurableSpan）绕过 provider 直接
* 调 exporter，由 agent-ui tracing.ts 的 emitter 包装层负责，两边不会重复上报。
*/
var AegisSpanTimingProcessor = class {
	onStart() {}
	onEnd(span) {
		const spanCtx = span.spanContext();
		reportSpanTiming({
			name: span.name,
			durationMs: hrTimeToMs(span.duration),
			traceId: spanCtx.traceId,
			spanId: spanCtx.spanId,
			status: spanStatusFromCode(span.status?.code),
			attributes: span.attributes
		});
	}
	shutdown() {
		return Promise.resolve();
	}
	forceFlush() {
		return Promise.resolve();
	}
};
async function initializeRendererTracing(options) {
	if (initialized) return;
	try {
		const endpoint = globalThis.__WORKBUDDY_TRACING_ENDPOINT__ || options.endpoint;
		const resource = new Resource(buildRendererResourceAttributes(options));
		const exporter = new RendererOtlpJsonExporter(endpoint);
		const provider = new WebTracerProvider({
			resource,
			spanProcessors: [new BatchSpanProcessor(exporter), new AegisSpanTimingProcessor()]
		});
		provider.register({ contextManager: new StackContextManager() });
		cachedProvider = provider;
		initialized = true;
		disposeUnloadFlush = installUnloadFlush(provider, exporter);
		setInstantSpanEmitter((input) => {
			try {
				return emitInstantSpan(input, resource, exporter);
			} catch {
				return;
			}
		});
		setDurableSpanEmitter((input) => startDurableSpan(input, resource, exporter));
		setSpanTimingReporter((metricName, durationMs, ext) => {
			if (!isAegisInitialized()) return;
			reportTime(metricName, durationMs, ext);
		});
	} catch (error) {
		console.warn("[RendererTracing] init failed (suppressed):", error);
	}
}
/**
* 关窗 / reload 时补发缓冲区里最后一批 span。
*
* 两个细节：
* 1. 必须 `capture: true` 挂在 window 上 —— BatchSpanProcessor 自己也监听 pagehide
*    做 forceFlush（监听在 document 上），capture 阶段 window 先于 document，
*    这样它那次 flush 也能落到已置位的 beacon 通道，而不是白发一次被取消的 XHR
* 2. forceFlush 的 promise 必须 catch —— 导出失败会 reject，漏掉就变成
*    unhandledrejection 被 main.tsx 的错误桥当成 RendererJSError 上报
*
* pageshow 复位：pagehide 后页面若被恢复（page cache），要退回常规 XHR 通道，
* 否则会一直受 beacon 的 64KB 配额限制。
*/
function installUnloadFlush(provider, exporter) {
	if (typeof window === "undefined") return () => void 0;
	const onPageHide = () => {
		exporter.setUnloading(true);
		provider.forceFlush().catch(() => void 0);
	};
	const onPageShow = () => exporter.setUnloading(false);
	window.addEventListener("pagehide", onPageHide, { capture: true });
	window.addEventListener("pageshow", onPageShow, { capture: true });
	return () => {
		window.removeEventListener("pagehide", onPageHide, { capture: true });
		window.removeEventListener("pageshow", onPageShow, { capture: true });
	};
}
var INSTANT_SPAN_LIBRARY = {
	name: RENDERER_SERVICE_NAME,
	version: RENDERER_SERVICE_VERSION
};
var instantSpanIdGen = new RandomIdGenerator();
/** 用给定 traceId 构造瞬时 span（start==end）直接走 exporter 导出，返回生成的 span 上下文。 */
function emitInstantSpan(input, resource, exporter) {
	const now = millisToHrTime(Date.now());
	const spanId = instantSpanIdGen.generateSpanId();
	const spanCtx = {
		traceId: input.traceId,
		spanId,
		traceFlags: TraceFlags.SAMPLED
	};
	const readable = {
		name: input.name,
		kind: SpanKind.INTERNAL,
		spanContext: () => spanCtx,
		parentSpanId: input.parentSpanId,
		startTime: now,
		endTime: now,
		status: { code: SpanStatusCode.OK },
		attributes: { ...input.attributes },
		links: [],
		events: [],
		duration: [0, 0],
		ended: true,
		resource,
		instrumentationLibrary: INSTANT_SPAN_LIBRARY,
		droppedAttributesCount: 0,
		droppedEventsCount: 0,
		droppedLinksCount: 0
	};
	exporter.export([readable], () => void 0);
	return spanCtx;
}
/**
* 起一个耗时 span：返回 handle，调用方在 span 生命周期内可 addEvent，
* 最后调 end 才真正构造 ReadableSpan 走 exporter。闭包持有独立 state，
* 每次 startDurableSpan 返回的 handle 之间无共享状态，并发安全。
*/
function startDurableSpan(input, resource, exporter) {
	const startTime = millisToHrTime(Date.now());
	const spanId = instantSpanIdGen.generateSpanId();
	const events = [];
	let ended = false;
	const attributes = { ...input.attributes };
	return {
		addEvent(name, attributes) {
			if (ended) return;
			events.push({
				name,
				time: millisToHrTime(Date.now()),
				attributes: attributes ? { ...attributes } : void 0
			});
		},
		setAttribute(name, value) {
			if (ended) return;
			attributes[name] = value;
		},
		setAttributes(attrs) {
			if (ended) return;
			Object.assign(attributes, attrs);
		},
		spanContext() {
			return {
				traceId: input.traceId,
				spanId,
				traceFlags: TraceFlags.SAMPLED
			};
		},
		end(status = "ok", errorMessage) {
			if (ended) return;
			ended = true;
			try {
				const endTime = millisToHrTime(Date.now());
				const spanCtx = {
					traceId: input.traceId,
					spanId,
					traceFlags: TraceFlags.SAMPLED
				};
				const readable = {
					name: input.name,
					kind: SpanKind.INTERNAL,
					spanContext: () => spanCtx,
					parentSpanId: input.parentSpanId,
					startTime,
					endTime,
					status: status === "ok" ? { code: SpanStatusCode.OK } : {
						code: SpanStatusCode.ERROR,
						message: errorMessage
					},
					attributes,
					links: [],
					events,
					duration: hrTimeDuration(startTime, endTime),
					ended: true,
					resource,
					instrumentationLibrary: INSTANT_SPAN_LIBRARY,
					droppedAttributesCount: 0,
					droppedEventsCount: 0,
					droppedLinksCount: 0
				};
				exporter.export([readable], () => void 0);
			} catch {}
		}
	};
}
//#endregion
export { context, forceFlushRendererTracing, getActiveTraceparent, getRendererTracer, initializeRendererTracing, isRendererTracingReady, shutdownRendererTracing, trace, withActiveSpan };
