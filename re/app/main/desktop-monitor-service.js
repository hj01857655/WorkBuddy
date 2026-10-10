const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_proxy_agents = require("./proxy-agents.js");
let electron = require("electron");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_crypto = require("node:crypto");
let events = require("events");
let child_process = require("child_process");
//#region ../../packages/monitor/src/common/types/metrics.ts
/**
* 指标类型
*/
var MetricType = /* @__PURE__ */ function(MetricType) {
	/** 计数器：单调递增，用于请求总数、错误总数 */
	MetricType["Counter"] = "counter";
	/** 瞬时值：可增可减，用于内存使用、CPU使用、队列长度 */
	MetricType["Gauge"] = "gauge";
	/** 直方图：值分布统计，用于延迟分布、响应时间分布 */
	MetricType["Histogram"] = "histogram";
	/** 可增减计数器：可增可减的计数器，用于活跃连接数、并发请求数 */
	MetricType["UpDownCounter"] = "updowncounter";
	return MetricType;
}({});
//#endregion
//#region ../../packages/monitor/src/common/interfaces/exporter.ts
/**
* Abstract base class implementing common exporter functionality
* Uses Template Method Pattern with hooks for subclass customization
*
* Provides:
* - Error handling and retry support
* - Status tracking (success/failure counts, timing)
* - Lifecycle management (initialize/shutdown)
* - Connection state tracking
*
* Subclasses implement:
* - onInitialize(): Setup resources (connections, file handles, etc.)
* - onShutdown(): Cleanup resources
* - onExport(metrics): Actual export logic
* - onFlush(): Flush pending data (optional)
*/
var AbstractExporter = class {
	constructor(name, enabled = true) {
		this.name = name;
		this.enabled = enabled;
		this.connected = false;
		this.initialized = false;
		this.successCount = 0;
		this.failureCount = 0;
		this.queueSize = 0;
		this.config = { enabled };
	}
	/**
	* Initialize the exporter
	* Template method that calls onInitialize() hook
	*/
	async initialize() {
		if (this.initialized) {
			this.logger?.info(`[${this.name}] Exporter already initialized`);
			return;
		}
		if (!this.enabled) {
			this.logger?.info(`[${this.name}] Exporter is disabled, skipping initialization`);
			return;
		}
		try {
			await this.onInitialize();
			this.initialized = true;
			this.connected = true;
			this.logger?.info(`[${this.name}] Exporter initialized successfully`);
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Initialization failed:`, error);
			throw error;
		}
	}
	/**
	* Shutdown the exporter gracefully
	* Template method that calls onShutdown() hook
	*/
	async shutdown() {
		if (!this.initialized) return;
		try {
			await this.flush();
			await this.onShutdown();
			this.connected = false;
			this.initialized = false;
			this.logger?.info(`[${this.name}] Exporter shutdown successfully`);
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Shutdown error:`, error);
			throw error;
		}
	}
	/**
	* Export metrics with automatic error handling
	* Template method that calls onExport() hook
	* Re-throws errors for retry logic in upper layers
	*/
	async export(metrics) {
		this.logger?.info(`[${this.name}] export() called with ${metrics?.length || 0} metrics, enabled: ${this.enabled}, initialized: ${this.initialized}`);
		if (!this.enabled || !this.initialized) {
			this.logger?.warn(`[${this.name}] Exporter not ready, enabled: ${this.enabled}, initialized: ${this.initialized}`);
			return;
		}
		if (!metrics || metrics.length === 0) {
			this.logger?.info(`[${this.name}] No metrics to export`);
			return;
		}
		this.queueSize = metrics.length;
		try {
			this.logger?.info(`[${this.name}] Calling onExport() with ${metrics.length} metrics...`);
			await this.onExport(metrics);
			this.successCount++;
			this.lastExportTime = Date.now();
			this.queueSize = 0;
			this.logger?.info(`[${this.name}] onExport() completed successfully`);
		} catch (error) {
			this.failureCount++;
			this.lastError = error;
			this.queueSize = 0;
			this.logger?.error(`[${this.name}] Export failed:`, error);
			throw error;
		}
	}
	/**
	* Flush pending metrics
	* Template method that calls onFlush() hook
	*/
	async flush() {
		if (!this.enabled || !this.initialized) return;
		try {
			await this.onFlush();
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Flush error:`, error);
		}
	}
	/**
	* Configure the exporter
	* Template method that calls onConfigure() hook
	*/
	configure(config) {
		this.config = config;
		this.onConfigure(config);
	}
	/**
	* Get current exporter status
	*/
	getStatus() {
		return {
			name: this.name,
			enabled: this.enabled,
			connected: this.connected,
			successCount: this.successCount,
			failureCount: this.failureCount,
			queueSize: this.queueSize,
			lastExportTime: this.lastExportTime,
			lastError: this.lastError
		};
	}
	/**
	* Check connection status
	*/
	isConnected() {
		return this.connected && this.initialized;
	}
	/**
	* Flush any pending/buffered data
	* Called during shutdown and manual flush operations
	* Default implementation is no-op (override if buffering is used)
	*/
	async onFlush() {}
	/**
	* Handle configuration updates
	* Called when configure() is invoked
	* Default implementation is no-op (override if needed)
	*/
	onConfigure(config) {}
};
//#endregion
//#region ../../packages/monitor/src/exporters/galileo/otel-mapper.ts
var OTelMapper = class {
	constructor(resourceConfig, options) {
		this.scopeName = "genie-monitor";
		this.scopeVersion = "1.0.0";
		this.histogramBounds = [
			1,
			2,
			5,
			10,
			20,
			50,
			100,
			200,
			500,
			1e3,
			2e3,
			5e3,
			1e4,
			2e4,
			3e4
		];
		this.useOtelJsonLogFields = options?.useOtelJsonLogFields === true;
		this.resource = { attributes: [
			{
				key: "target",
				value: { stringValue: resourceConfig.target }
			},
			{
				key: "type",
				value: { stringValue: "resource" }
			},
			{
				key: "env_name",
				value: { stringValue: resourceConfig.envName || "production" }
			},
			{
				key: "instance",
				value: { stringValue: resourceConfig.instance || this.generateInstanceId() }
			},
			{
				key: "namespace",
				value: { stringValue: resourceConfig.namespace || "Development" }
			},
			{
				key: "version",
				value: { stringValue: resourceConfig.version }
			},
			{
				key: "container_name",
				value: { stringValue: `genie.${resourceConfig.target}` }
			},
			{
				key: "ideType",
				value: { stringValue: resourceConfig.ideType }
			},
			{
				key: "ideVersion",
				value: { stringValue: resourceConfig.ideVersion }
			},
			{
				key: "os",
				value: { stringValue: resourceConfig.os }
			},
			{
				key: "ext1",
				value: { stringValue: resourceConfig.ext1 || "unknown" }
			}
		] };
	}
	/**
	* 转换指标批次为 OTel 格式（按 collector 分组）
	*/
	mapMetrics(metrics) {
		const metricsByCollector = this.groupMetricsByCollector(metrics);
		const scopeMetrics = [];
		for (const [collectorName, collectorMetrics] of metricsByCollector.entries()) {
			const scopeName = this.generateScopeName(collectorName);
			const groupedMetrics = this.groupMetricsByName(collectorMetrics);
			const otelMetrics = [];
			for (const [name, metricGroup] of groupedMetrics.entries()) {
				const otelMetric = this.mapMetricGroup(name, metricGroup);
				if (otelMetric) otelMetrics.push(otelMetric);
			}
			scopeMetrics.push({
				scope: {
					name: scopeName,
					version: this.scopeVersion
				},
				metrics: otelMetrics
			});
		}
		if (scopeMetrics.length === 0) scopeMetrics.push({
			scope: {
				name: this.scopeName,
				version: this.scopeVersion
			},
			metrics: []
		});
		return { resourceMetrics: [{
			resource: this.resource,
			scopeMetrics
		}] };
	}
	/**
	* 按 metadata.collector 分组
	*/
	groupMetricsByCollector(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			let collectorName = metric.metadata?.collector;
			if (!collectorName) collectorName = this.inferCollectorFromMetricName(metric.name);
			if (!groups.has(collectorName)) groups.set(collectorName, []);
			groups.get(collectorName).push(metric);
		}
		return groups;
	}
	/**
	* 从指标名称推断 Collector
	* 用于 fallback，当 metadata.collector 不存在时
	*/
	inferCollectorFromMetricName(metricName) {
		for (const [prefix, collector] of Object.entries({
			"genie.auth.": "AuthCollector",
			"genie.request.": "ChatRequestCollector",
			"genie.checkpoint.": "CheckpointCollector",
			"genie.completion.": "CompletionCollector",
			"genie.file.": "FileOperationCollector",
			"genie.ipc.": "IPCCollector",
			"genie.mcp.": "MCPCollector",
			"genie.page.": "PagePerformanceCollector",
			"genie.tool.": "ToolExecutionCollector",
			"genie.system.": "SystemCollector"
		})) if (metricName.startsWith(prefix)) return collector;
		return "unknown";
	}
	/**
	* 根据 Collector 名称生成 scopeName
	* 直接使用 collector 名称作为 scopeName
	*/
	generateScopeName(collectorName) {
		if (collectorName === "unknown") return "Custom_" + this.scopeName;
		return "Custom_" + collectorName;
	}
	/**
	* 按指标名称分组
	*/
	groupMetricsByName(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			if (!groups.has(metric.name)) groups.set(metric.name, []);
			groups.get(metric.name).push(metric);
		}
		return groups;
	}
	/**
	* 转换单个指标组
	*/
	mapMetricGroup(name, metrics) {
		if (metrics.length === 0) return null;
		switch (metrics[0].type) {
			case MetricType.Counter: return this.mapCounter(name, metrics);
			case MetricType.Gauge: return this.mapGauge(name, metrics);
			case MetricType.Histogram: return this.mapHistogram(name, metrics);
			case MetricType.UpDownCounter: return this.mapUpDownCounter(name, metrics);
			default: return null;
		}
	}
	/**
	* 转换 Counter 指标
	*/
	mapCounter(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			sum: {
				dataPoints,
				aggregationTemporality: 1,
				isMonotonic: true
			}
		};
	}
	/**
	* 转换 Gauge 指标
	*/
	mapGauge(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			gauge: { dataPoints }
		};
	}
	/**
	* 转换 Histogram 指标
	*/
	mapHistogram(name, metrics) {
		const dataPoints = this.aggregateHistogramData(metrics);
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			histogram: {
				dataPoints,
				aggregationTemporality: 1
			}
		};
	}
	/**
	* 转换 UpDownCounter 指标
	*/
	mapUpDownCounter(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			sum: {
				dataPoints,
				aggregationTemporality: 1,
				isMonotonic: false
			}
		};
	}
	/**
	* 聚合 Histogram 数据到桶中
	*/
	aggregateHistogramData(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			const key = this.getLabelKey(metric.labels);
			if (!groups.has(key)) groups.set(key, []);
			groups.get(key).push(metric);
		}
		const dataPoints = [];
		for (const [, groupMetrics] of groups.entries()) {
			const bucketCounts = new Array(this.histogramBounds.length + 1).fill(0);
			let sum = 0;
			let count = 0;
			for (const metric of groupMetrics) {
				const value = metric.value;
				sum += value;
				count++;
				let bucketIndex = this.histogramBounds.findIndex((bound) => value <= bound);
				if (bucketIndex === -1) bucketIndex = this.histogramBounds.length;
				bucketCounts[bucketIndex]++;
			}
			const latestTimestamp = Math.max(...groupMetrics.map((m) => m.timestamp));
			dataPoints.push({
				timeUnixNano: this.toNanoTimestamp(latestTimestamp),
				count: count.toString(),
				sum,
				bucketCounts: bucketCounts.map((c) => c.toString()),
				explicitBounds: this.histogramBounds,
				attributes: this.mapMetricAttributes(groupMetrics[0])
			});
		}
		return dataPoints;
	}
	/**
	* 将 metric 的 labels 和 attributes 合并转换为 OTel attributes
	*/
	mapMetricAttributes(metric) {
		const result = [];
		if (metric.labels) Object.entries(metric.labels).forEach(([key, value]) => {
			result.push({
				key,
				value: { stringValue: typeof value === "string" ? value : String(value) }
			});
		});
		if (metric.attributes) Object.entries(metric.attributes).forEach(([key, value]) => {
			if (typeof value === "string") result.push({
				key,
				value: { stringValue: value }
			});
			else if (typeof value === "number") {
				if (Number.isInteger(value)) result.push({
					key,
					value: { intValue: String(value) }
				});
				else result.push({
					key,
					value: { doubleValue: value }
				});
			} else if (typeof value === "boolean") result.push({
				key,
				value: { boolValue: value }
			});
			else result.push({
				key,
				value: { stringValue: String(value) }
			});
		});
		return result;
	}
	/**
	* 获取 label 的唯一键（用于分组）
	*/
	getLabelKey(labels) {
		return JSON.stringify(labels);
	}
	/**
	* 转换时间戳为纳秒
	*/
	toNanoTimestamp(milliseconds) {
		return Math.round(milliseconds * 1e6).toString();
	}
	/**
	* 获取指标描述
	*/
	getMetricDescription(name) {
		return {
			"genie.request.ipc_request.duration": "IPC request duration (UI to Node)",
			"genie.request.node_receive.duration": "Node receive processing delay",
			"genie.request.http_send.duration": "HTTP send duration to model API",
			"genie.request.model_ttfb": "Model Time To First Byte",
			"genie.request.model_stream.duration": "Model streaming duration",
			"genie.request.first_tool.latency": "First tool execution latency",
			"genie.request.tools_execution.duration": "All tools execution duration",
			"genie.request.ipc_response.duration": "IPC response duration (Node to UI)",
			"genie.request.success.total": "Total successful requests",
			"genie.request.failure.total": "Total failed requests",
			"genie.request.total": "Total requests",
			"genie.request.tool.duration": "Tool execution duration",
			"genie.request.tool.success.total": "Total successful tool executions",
			"genie.request.tool.failure.total": "Total failed tool executions",
			"genie.ipc.call.duration": "IPC call duration",
			"genie.ipc.call.success.total": "Total successful IPC calls",
			"genie.ipc.call.failure.total": "Total failed IPC calls",
			"genie.ipc.queue_depth": "IPC queue depth"
		}[name] || "";
	}
	/**
	* 获取指标单位
	*/
	getMetricUnit(name) {
		if (name.includes("duration") || name.includes("latency") || name.includes("ttfb")) return "ms";
		if (name.includes(".total")) return "1";
		if (name.includes("queue_depth")) return "1";
		return "";
	}
	/**
	* 生成实例 ID
	*/
	generateInstanceId() {
		return `instance-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	}
	/**
	* 更新 Resource 配置
	*/
	updateResource(config) {
		this.resource = { attributes: [
			{
				key: "target",
				value: { stringValue: config.target }
			},
			{
				key: "type",
				value: { stringValue: "resource" }
			},
			{
				key: "env_name",
				value: { stringValue: config.envName || "production" }
			},
			{
				key: "instance",
				value: { stringValue: config.instance || this.getCurrentInstance() }
			},
			{
				key: "namespace",
				value: { stringValue: config.namespace || "Development" }
			},
			{
				key: "version",
				value: { stringValue: config.version }
			},
			{
				key: "container_name",
				value: { stringValue: `genie.${config.target}` }
			},
			{
				key: "ideType",
				value: { stringValue: config.ideType }
			},
			{
				key: "ideVersion",
				value: { stringValue: config.ideVersion }
			},
			{
				key: "os",
				value: { stringValue: config.os }
			},
			{
				key: "ext1",
				value: { stringValue: config.ext1 || "unknown" }
			}
		] };
	}
	/**
	* 获取当前实例 ID
	*/
	getCurrentInstance() {
		return this.resource.attributes.find((attr) => attr.key === "instance")?.value.stringValue || this.generateInstanceId();
	}
	/**
	* 转换 Traces 为 OTel 格式
	* @param spans - Span 数组
	* @returns OTel Trace Export Request
	*/
	mapTraces(spans, defaultUid) {
		const firstSpan = spans[0] || {};
		const sessionId = firstSpan.sessionId || firstSpan.attributes?.sessionId || "unknown";
		const uid = firstSpan.uid || firstSpan.attributes?.uid || defaultUid || "unknown";
		const resourceAttributeMap = /* @__PURE__ */ new Map([
			["target", {
				key: "target",
				value: { stringValue: "TAMv2.codebuddy-web" }
			}],
			["session_id", {
				key: "session_id",
				value: { stringValue: sessionId }
			}],
			["type", {
				key: "type",
				value: { stringValue: "resource" }
			}],
			["uid", {
				key: "uid",
				value: { stringValue: uid }
			}],
			["ideType", {
				key: "ideType",
				value: { stringValue: "genie" }
			}],
			["ideVersion", {
				key: "ideVersion",
				value: { stringValue: "1.0.0" }
			}]
		]);
		for (const attr of this.resource.attributes) resourceAttributeMap.set(attr.key, {
			key: attr.key,
			value: { stringValue: attr.value.stringValue }
		});
		resourceAttributeMap.set("session_id", {
			key: "session_id",
			value: { stringValue: sessionId }
		});
		resourceAttributeMap.set("uid", {
			key: "uid",
			value: { stringValue: uid }
		});
		const resourceAttributes = [...resourceAttributeMap.values()];
		const otelSpans = spans.map((span) => {
			const startTimeUnixNano = this.toNanoTimestamp(span.startTime);
			const endTimeUnixNano = span.endTime ? this.toNanoTimestamp(span.endTime) : void 0;
			return {
				traceId: span.traceId,
				trace_id: span.traceId,
				spanId: span.spanId,
				span_id: span.spanId,
				parentSpanId: span.parentSpanId || void 0,
				parent_span_id: span.parentSpanId || void 0,
				name: span.name,
				kind: this.mapSpanKind(span.kind),
				startTimeUnixNano,
				start_time_unix_nano: startTimeUnixNano,
				endTimeUnixNano,
				end_time_unix_nano: endTimeUnixNano,
				attributes: this.mapSpanAttributes(span.attributes || {}),
				status: { code: span.status === "ok" ? 1 : span.status === "error" ? 2 : 0 },
				events: (span.events || []).map((event) => {
					const timeUnixNano = this.toNanoTimestamp(event.timestamp);
					return {
						name: event.name,
						timeUnixNano,
						time_unix_nano: timeUnixNano,
						attributes: this.mapSpanAttributes(event.attributes || {}),
						droppedAttributesCount: 0
					};
				}),
				links: span.links || [],
				droppedAttributesCount: 0,
				droppedEventsCount: 0,
				droppedLinksCount: 0
			};
		});
		return { resourceSpans: [{
			resource: {
				attributes: resourceAttributes,
				droppedAttributesCount: 0
			},
			scopeSpans: [{
				scope: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				spans: otelSpans
			}]
		}] };
	}
	/**
	* 转换 Logs 为 OTel 格式
	* @param logs - Log 数组
	* @returns OTel Log Export Request
	*/
	mapLogs(logs, defaultUid) {
		const firstLog = logs[0] || {};
		const uid = firstLog.attributes?.uid || defaultUid || "unknown";
		const sessionId = firstLog.attributes?.sessionId || "unknown";
		const version = firstLog.attributes?.ideVersion || "unknown";
		const resourceAttributes = [
			{
				key: "telemetry.sdk.language",
				value: { stringValue: "javascript" }
			},
			{
				key: "telemetry.sdk.name",
				value: { stringValue: "galileo" }
			},
			{
				key: "telemetry.sdk.version",
				value: { stringValue: "0.0.1" }
			},
			{
				key: "ideType",
				value: { stringValue: firstLog.attributes?.ideType || "unknown" }
			},
			{
				key: "ideVersion",
				value: { stringValue: version }
			},
			{
				key: "uid",
				value: { stringValue: uid }
			},
			{
				key: "session_id",
				value: { stringValue: sessionId }
			},
			...this.resource.attributes.map((attr) => ({
				key: attr.key,
				value: { stringValue: attr.value.stringValue }
			}))
		];
		const logRecords = logs.map((log) => {
			const logRecord = log;
			const rawAttributes = logRecord.attributes || {};
			const rawTraceId = logRecord.traceId || logRecord.trace_id || rawAttributes.trace_id || rawAttributes.traceId;
			const rawSpanId = logRecord.spanId || logRecord.span_id || rawAttributes.span_id || rawAttributes.spanId;
			const traceId = rawTraceId || "00000000000000000000000000000000";
			const spanId = rawSpanId || "0000000000000000";
			const timeUnixNano = this.toNanoTimestamp(log.timestamp);
			const severityNumber = this.mapLogSeverity(logRecord.level || "info");
			const severityText = (logRecord.level || "info").toUpperCase();
			const attributes = this.useOtelJsonLogFields && rawTraceId && rawSpanId ? {
				...rawAttributes,
				trace_id: traceId,
				span_id: spanId,
				traceId,
				spanId
			} : rawAttributes;
			return {
				traceId,
				trace_id: traceId,
				spanId,
				span_id: spanId,
				timeUnixNano,
				time_unix_nano: timeUnixNano,
				severityNumber,
				severity_number: severityNumber,
				severityText,
				severity_text: severityText,
				body: { stringValue: logRecord.message || "" },
				attributes: this.mapLogAttributes(attributes),
				flags: 1
			};
		});
		if (!this.useOtelJsonLogFields) return { resource_logs: [{
			resource: { attributes: this.toLegacyAttributes(resourceAttributes) },
			instrumentation_library_logs: [{
				instrumentation_library: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				log_records: logRecords.map((record) => ({
					trace_id: record.traceId,
					span_id: record.spanId,
					time_unix_nano: record.timeUnixNano,
					severity_number: record.severityNumber,
					severity_text: record.severityText,
					body: { string_value: record.body.stringValue },
					attributes: this.toLegacyAttributes(record.attributes),
					flags: record.flags
				}))
			}]
		}] };
		return { resourceLogs: [{
			resource: { attributes: resourceAttributes },
			scopeLogs: [{
				scope: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				logRecords
			}]
		}] };
	}
	/**
	* 映射 Span Kind
	*/
	mapSpanKind(kind) {
		return {
			"internal": 1,
			"server": 2,
			"client": 3,
			"producer": 4,
			"consumer": 5
		}[kind || "internal"] || 1;
	}
	/**
	* 映射 Span Attributes
	*/
	mapSpanAttributes(attributes) {
		return Object.entries(attributes).map(([key, value]) => ({
			key,
			value: this.mapAttributeValue(value)
		}));
	}
	/**
	* 映射 Log Attributes
	*/
	toLegacyAttributes(attributes) {
		return attributes.map((attr) => ({
			key: attr.key,
			value: { string_value: String(attr.value.stringValue ?? attr.value.intValue ?? attr.value.doubleValue ?? attr.value.boolValue ?? "") }
		}));
	}
	mapLogAttributes(attributes) {
		return Object.entries(attributes).map(([key, value]) => ({
			key,
			value: this.mapAttributeValue(value)
		}));
	}
	/**
	* 映射 Attribute Value
	*/
	mapAttributeValue(value) {
		if (typeof value === "string") return { stringValue: value };
		else if (typeof value === "number") {
			if (Number.isInteger(value)) return { intValue: String(value) };
			else return { doubleValue: value };
		} else if (typeof value === "boolean") return { boolValue: value };
		else return { stringValue: String(value) };
	}
	/**
	* 映射 Log Severity
	*/
	mapLogSeverity(level) {
		return {
			"trace": "SEVERITY_NUMBER_TRACE",
			"debug": "SEVERITY_NUMBER_DEBUG",
			"info": "SEVERITY_NUMBER_INFO",
			"warn": "SEVERITY_NUMBER_WARN",
			"error": "SEVERITY_NUMBER_ERROR",
			"fatal": "SEVERITY_NUMBER_FATAL"
		}[level.toLowerCase()] || "SEVERITY_NUMBER_INFO";
	}
};
//#endregion
//#region ../../packages/monitor/src/exporters/galileo-exporter.ts
/**
* Galileo Exporter
*
* 将监控指标导出到 Galileo 平台（腾讯内部 OTel 平台）
*
* 功能：
* - OTel 格式转换（使用 OTelMapper）
* - HTTP 批量导出（50 metrics/batch）
* - 指数退避重试（1s → 2s → 4s → 8s → 16s → 30s）
* - 连接健康检查
* - 队列管理和限流
*
* Endpoint: http://otlp.j.woa.com
*/
/**
* Galileo Exporter Implementation
*/
var GalileoExporter = class extends AbstractExporter {
	constructor(config, contextProvider, httpClient, logger) {
		super("GalileoExporter", config.enabled);
		this.exportQueue = [];
		this.isExporting = false;
		this.traceQueue = [];
		this.isExportingTraces = false;
		this.maxRetries = 3;
		this.retryDelay = 1e3;
		this.backoffMultiplier = 2;
		this.maxRetryDelay = 3e4;
		this.consecutiveFailures = 0;
		this.config = config;
		let resourceConfig = config.resource || {};
		if (contextProvider?.getEnvironmentInfo) resourceConfig = {
			...resourceConfig,
			...contextProvider.getEnvironmentInfo()
		};
		if (contextProvider?.getSystemContext) resourceConfig = {
			...resourceConfig,
			...contextProvider.getSystemContext()
		};
		this.mapper = new OTelMapper(resourceConfig, { useOtelJsonLogFields: config.useOtelJsonLogFields === true });
		this.httpClient = httpClient || this.createDefaultHttpClient();
		config.resource = resourceConfig;
		this.config = config;
		this.onConfigure(config);
		if (logger) {
			this.logger = logger;
			this.logger?.setContext?.("GalileoExporter");
		}
	}
	async onInitialize() {
		this.logger?.info(`[GalileoExporter] Initializing with endpoint: ${this.config.endpoint}`);
		if (!this.config.endpoint) throw new Error("Galileo endpoint is required");
		try {
			const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("Health check timeout after 3s")), 3e3));
			await Promise.race([this.healthCheck(), timeoutPromise]);
			this.logger?.info("[GalileoExporter] Health check passed");
		} catch (error) {
			this.logger?.warn("[GalileoExporter] Health check failed, will retry on export:", error);
		}
		this.startFlushTimer();
	}
	async onShutdown() {
		this.logger?.info("[GalileoExporter] Shutting down...");
		this.stopFlushTimer();
		if (this.exportQueue.length > 0) {
			this.logger?.info(`[GalileoExporter] Flushing ${this.exportQueue.length} remaining metrics...`);
			await this.flush();
		}
		this.logger?.info("[GalileoExporter] Shutdown complete");
	}
	async onExport(metrics) {
		this.logger?.info(`[GalileoExporter] onExport called with ${metrics.length} metrics`);
		this.exportQueue.push(...metrics);
		this.queueSize = this.exportQueue.length;
		this.logger?.info(`[GalileoExporter] Queue size: ${this.exportQueue.length}, batchSize: ${this.config.batchSize || 50}`);
		const batchSize = this.config.batchSize || 50;
		if (this.exportQueue.length >= batchSize && !this.isExporting) {
			this.logger?.info("[GalileoExporter] Queue reached batch size, flushing...");
			await this.flush();
		}
	}
	async onFlush() {
		if (this.exportQueue.length > 0 && !this.isExporting) {
			this.isExporting = true;
			try {
				const batchSize = this.config.batchSize || 50;
				while (this.exportQueue.length > 0) {
					const batch = this.exportQueue.splice(0, batchSize);
					this.queueSize = this.exportQueue.length;
					await this.exportBatch(batch);
				}
			} finally {
				this.isExporting = false;
			}
		}
		await this.flushTraces();
	}
	onConfigure(config) {
		const galileoConfig = config;
		this.maxRetries = galileoConfig.retryConfig?.maxRetries ?? 3;
		this.retryDelay = galileoConfig.retryConfig?.retryDelay ?? 1e3;
		this.backoffMultiplier = galileoConfig.retryConfig?.backoffMultiplier ?? 2;
		const calculatedMaxDelay = this.retryDelay * Math.pow(this.backoffMultiplier, this.maxRetries);
		this.maxRetryDelay = Math.min(calculatedMaxDelay, 3e4);
		if (galileoConfig.resource) this.mapper.updateResource(galileoConfig.resource);
		if (this.flushTimer) {
			this.stopFlushTimer();
			this.startFlushTimer();
		}
	}
	/**
	* 获取目标服务名称
	* 供 Collector 使用，避免硬编码服务名称
	*
	* ⚠️ 注意：不同运行模式的区分通过 mode 字段实现
	* - mode 通过 Aegis SDK 的 ext1 字段上报
	* - main → ext1: 'agents-web-app'
	* - widget → ext1: 'agent-manager'
	* - webview → ext1: 'vscode-chat'
	*
	* 在 Galileo 平台查询时可以通过 ext1 字段过滤不同来源的数据
	*/
	getTargetService() {
		return this.config.resource?.target || "TAMv2.codebuddy-web";
	}
	/**
	* 导出一批指标（带重试）
	*/
	async exportBatch(metrics) {
		let lastError;
		this.logger?.info(`[GalileoExporter] exportBatch called with ${metrics.length} metrics`);
		for (let attempt = 0; attempt <= this.maxRetries; attempt++) try {
			this.logger?.info(`[GalileoExporter] Converting ${metrics.length} metrics to OTel format...`);
			const otelData = this.mapper.mapMetrics(metrics);
			this.logger?.info(`[GalileoExporter] Converted to OTel format, resourceMetrics count: ${otelData.resourceMetrics?.length || 0}`);
			this.logger?.info("[GalileoExporter] Sending to Galileo...");
			await this.sendToGalileo(otelData);
			this.lastSuccessTime = Date.now();
			this.consecutiveFailures = 0;
			this.logger?.info(`[GalileoExporter] Successfully exported ${metrics.length} metrics`);
			return;
		} catch (error) {
			lastError = error;
			this.consecutiveFailures++;
			this.logger?.error(`[GalileoExporter] Export failed (attempt ${attempt + 1}/${this.maxRetries + 1}):`, error);
			if (attempt < this.maxRetries) {
				const delay = this.calculateRetryDelay(attempt);
				this.logger?.info(`[GalileoExporter] Retrying in ${delay}ms...`);
				await this.sleep(delay);
			}
		}
		throw lastError || /* @__PURE__ */ new Error("Export failed after all retries");
	}
	/**
	* 发送数据到 Galileo
	*/
	async sendToGalileo(data) {
		const url = `${this.config.endpoint}/v1/metrics`;
		const timeout = this.config.timeout || 3e4;
		this.logger?.info("[GalileoExporter] ✔️ sendToGalileo CALLED");
		this.logger?.info(`[GalileoExporter]   URL: ${url}`);
		this.logger?.info(`[GalileoExporter]   Timeout: ${timeout}ms`);
		const jsonData = JSON.stringify(data, null, 2);
		this.logger?.info(`[GalileoExporter]   FULL REQUEST DATA:\n${jsonData}`);
		try {
			this.logger?.info("[GalileoExporter] Making HTTP POST request...");
			const response = await this.httpClient.post(url, data, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout
			});
			this.logger?.info(`[GalileoExporter] Response status: ${response.status} ${response.statusText}`);
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}: ${response.statusText}`);
		} catch (error) {
			const errorCode = error.code;
			if (errorCode === "ECONNREFUSED") throw new Error(`Cannot connect to Galileo at ${this.config.endpoint}`);
			else if (errorCode === "ETIMEDOUT") throw new Error(`Request to Galileo timed out after ${timeout}ms`);
			else throw error;
		}
	}
	/**
	* 健康检查
	*/
	async healthCheck() {
		const url = `${this.config.endpoint}/health`;
		try {
			this.logger?.info(`[GalileoExporter] Starting health check to ${url}`);
			const response = await this.httpClient.post(url, {}, { timeout: 3e3 });
			this.logger?.info(`[GalileoExporter] Health check response status: ${response.status}`);
			if (response.status !== 200) throw new Error(`Health check failed with status ${response.status}`);
		} catch (error) {
			this.logger?.warn("[GalileoExporter] Health endpoint not available, will test on first export:", error);
			throw error;
		}
	}
	/**
	* 计算重试延迟（指数退避）
	*/
	calculateRetryDelay(attempt) {
		const delay = this.retryDelay * Math.pow(this.backoffMultiplier, attempt);
		return Math.min(delay, this.maxRetryDelay);
	}
	/**
	* Sleep 工具方法
	*/
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	/**
	* 启动定时 flush
	*/
	startFlushTimer() {
		const interval = this.config.flushInterval || 1e4;
		this.flushTimer = setInterval(async () => {
			try {
				await this.flush();
			} catch (error) {
				this.logger?.error("[GalileoExporter] Flush error:", error);
			}
		}, interval);
		this.logger?.info(`[GalileoExporter] Flush timer started (interval: ${interval}ms)`);
	}
	/**
	* 停止定时 flush
	*/
	stopFlushTimer() {
		if (this.flushTimer) {
			clearInterval(this.flushTimer);
			this.flushTimer = void 0;
			this.logger?.info("[GalileoExporter] Flush timer stopped");
		}
	}
	/**
	* 创建默认 HTTP Client（使用 fetch）
	*/
	createDefaultHttpClient() {
		return { async post(url, data, config) {
			const controller = new AbortController();
			const timeout = config?.timeout || 3e4;
			const timeoutId = setTimeout(() => {
				controller.abort();
			}, timeout);
			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...config?.headers || {}
					},
					body: JSON.stringify(data),
					signal: controller.signal
				});
				const responseData = await response.json().catch(() => ({}));
				return {
					status: response.status,
					statusText: response.statusText,
					data: responseData
				};
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				const errorName = error instanceof Error ? error.name : void 0;
				console.error("[GalileoExporter] HTTP request failed:", errorMsg);
				if (errorName === "AbortError") throw new Error(`Request timeout after ${timeout}ms`);
				throw error;
			} finally {
				clearTimeout(timeoutId);
			}
		} };
	}
	/**
	* 获取健康状态
	*/
	getHealth() {
		return {
			connected: this.connected,
			lastSuccessTime: this.lastSuccessTime,
			consecutiveFailures: this.consecutiveFailures
		};
	}
	/**
	* 获取队列信息
	*/
	getQueueInfo() {
		return {
			size: this.exportQueue.length,
			isExporting: this.isExporting
		};
	}
	/**
	* 设置 HTTP Client（用于测试）
	*/
	setHttpClient(client) {
		this.httpClient = client;
	}
	/**
	* 手动触发健康检查
	*/
	async checkHealth() {
		await this.healthCheck();
	}
	/**
	* 导出 Traces 到 Galileo
	* @param spans - Span 数组
	*/
	async exportTraces(spans) {
		if (!this.enabled) {
			this.logger?.warn("[GalileoExporter] Not enabled, skipping trace export");
			return;
		}
		if (!spans || spans.length === 0) return;
		this.logger?.info(`[GalileoExporter] exportTraces called with ${spans.length} spans`);
		this.traceQueue.push(...spans);
		if (this.connected && !this.isExportingTraces) await this.flushTraces();
	}
	/**
	* Flush Traces
	*/
	async flushTraces() {
		if (this.traceQueue.length === 0 || this.isExportingTraces) return;
		this.isExportingTraces = true;
		try {
			const batchSize = this.config.batchSize || 50;
			while (this.traceQueue.length > 0) {
				const batch = this.traceQueue.splice(0, batchSize);
				await this.exportTraceBatch(batch);
			}
		} finally {
			this.isExportingTraces = false;
		}
	}
	/**
	* 导出一批 Traces（带重试）
	*/
	async exportTraceBatch(spans) {
		let lastError;
		this.logger?.info(`[GalileoExporter] exportTraceBatch called with ${spans.length} spans`);
		for (let attempt = 0; attempt <= this.maxRetries; attempt++) try {
			const otelTraceData = this.mapper.mapTraces(spans, this.getUserId());
			this.logger?.info("[GalileoExporter] Converted to OTel Trace format");
			await this.sendTracesToGalileo(otelTraceData);
			this.lastSuccessTime = Date.now();
			this.consecutiveFailures = 0;
			this.logger?.info(`[GalileoExporter] Successfully exported ${spans.length} traces`);
			return;
		} catch (error) {
			lastError = error;
			this.consecutiveFailures++;
			this.logger?.error(`[GalileoExporter] Trace export failed (attempt ${attempt + 1}/${this.maxRetries + 1}):`, error);
			if (attempt < this.maxRetries) {
				const delay = this.calculateRetryDelay(attempt);
				this.logger?.info(`[GalileoExporter] Retrying in ${delay}ms...`);
				await this.sleep(delay);
			}
		}
		throw lastError || /* @__PURE__ */ new Error("Trace export failed after all retries");
	}
	/**
	* 发送 Traces 数据到 Galileo
	*/
	async sendTracesToGalileo(data) {
		const url = `${this.config.endpoint}/v1/traces`;
		const timeout = this.config.timeout || 3e4;
		this.logger?.info("[GalileoExporter] ✔️ sendTracesToGalileo CALLED");
		this.logger?.info(`[GalileoExporter]   URL: ${url}`);
		const jsonData = JSON.stringify(data, null, 2);
		this.logger?.info(`[GalileoExporter]   TRACE REQUEST DATA:\n${jsonData}`);
		try {
			const response = await this.httpClient.post(url, data, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout
			});
			this.logger?.info(`[GalileoExporter] Response status: ${response.status} ${response.statusText}`);
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}: ${response.statusText}`);
		} catch (error) {
			const errorCode = error.code;
			if (errorCode === "ECONNREFUSED") throw new Error(`Cannot connect to Galileo at ${this.config.endpoint}`);
			else if (errorCode === "ETIMEDOUT") throw new Error(`Request to Galileo timed out after ${timeout}ms`);
			else throw error;
		}
	}
	/**
	* 导出 Logs 到 Galileo
	* @param logs - Log 数组
	*/
	async exportLogs(logs) {
		if (!this.enabled || !this.connected) {
			if (logs && logs.length > 0) this.logger?.warn("[GalileoExporter] Not enabled or not connected, skipping log export");
			return;
		}
		if (!logs || logs.length === 0) return;
		this.logger?.info(`[GalileoExporter] Exporting ${logs.length} logs`);
		try {
			const otelLogData = this.mapper.mapLogs(logs, this.getUserId());
			const url = `${this.config.endpoint}/v1/logs`;
			const response = await this.httpClient.post(url, otelLogData, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout: this.config.timeout || 3e4
			});
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}`);
			this.logger?.info(`[GalileoExporter] ✓ Exported ${logs.length} logs`);
		} catch (error) {
			this.logger?.error("[GalileoExporter] Log export failed:", error);
			throw error;
		}
	}
	/**
	* 获取用户 ID（从缓存）
	* 优先级：
	* 1. 缓存的 userId (由 AuthenticationManager 订阅自动更新)
	* 2. 'unknown' (默认值)
	*/
	getUserId() {
		return this.config.userId || "unknown";
	}
};
//#endregion
//#region src/main/system/runtime/workbuddy-user-agent.ts
/**
* Electron User-Agent 规范化：保证腾讯文档 EditorSDK 能识别 WorkBuddy。
*
* SDK（slide/doc `pc~vendors`）判定：
*   `isWorkBuddy = /WorkBuddy(?:selfhost\d*|[-_]?ai)?\//i.test(userAgent)`
*
* 多开实例下 `app.setName("WorkBuddy [N]")` 后，Chromium 常把 UA 写成
* `WorkBuddy[N]/x.y.z`（无空格、无 `Brand/` token）。此时精确
* `replace(getName()/version → applicationName/version)` 会 miss，
* SDK 门禁失败 → pptx/docx 无「AI编辑」入口（#60902）。
*/
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
* 确保 UA 含有 `${applicationName}/` token（SDK isWorkBuddy 所需的 slash 形态）。
* 已含则原样返回；否则优先替换 `Brand[N]/ver` / `Brand [N]/ver`，再回退注入。
*/
function ensureApplicationUserAgentToken(userAgent, applicationName, version) {
	const brand = applicationName.trim();
	if (!brand || !userAgent) return userAgent;
	const token = `${brand}/${version}`;
	if (new RegExp(`${escapeRegExp(brand)}/`, "i").test(userAgent)) return userAgent;
	const instanceToken = new RegExp(`${escapeRegExp(brand)}\\s*\\[\\d+\\]\\/${escapeRegExp(version)}`, "i");
	if (instanceToken.test(userAgent)) return userAgent.replace(instanceToken, token);
	const plainToken = new RegExp(`${escapeRegExp(brand)}\\/${escapeRegExp(version)}`, "i");
	if (plainToken.test(userAgent)) return userAgent.replace(plainToken, token);
	if (/ Chrome\//i.test(userAgent)) return userAgent.replace(/ Chrome\//i, ` ${token} Chrome/`);
	return `${userAgent} ${token}`;
}
var init_workbuddy_user_agent = require_rolldown_runtime.__esmMin((() => {}));
//#endregion
//#region src/main/system/runtime/app-instance.ts
/**
* 把任意品牌名转成 Linux 合法的 ASCII slug（去重音、剔非字母数字、转小写）。
* 必须与打包端 electron-builder.config.js 的 asciiSlug + brandLinuxExecutableName
* 保持同一套规则，否则运行时 WM_CLASS 会与 .desktop 对不上。
*/
function asciiSlug(input) {
	return String(input || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "").trim();
}
/**
* 派生 Linux WM_CLASS：优先 product.linuxExecutableName（打包端 deb/desktop 用的正是它），
* 否则回退 applicationName / productName 的 ASCII slug。取不到合法 ASCII 名时返回 ''，
* 调用方跳过设置（保持 Electron 默认行为，不至于报错）。
*/
function deriveLinuxWmClass(product) {
	const normalized = ((product?.linuxExecutableName)?.trim() || asciiSlug(product?.applicationName) || asciiSlug(product?.productName)).toLowerCase();
	return /^[a-z0-9][a-z0-9+.-]*$/.test(normalized) ? normalized : "";
}
function removeLegacyProtocolRegistrations() {
	for (const scheme of LEGACY_SCHEMES_TO_REMOVE) electron.app.removeAsDefaultProtocolClient(scheme);
	if (process.platform === "darwin") unregisterAllWorkbuddyDeepLinksFromLaunchServices();
}
/**
* Asynchronously find all WorkBuddy app bundle paths registered in Launch Services
* that still have codebuddy:// bindings, and unregister them. Runs in background
* to avoid blocking app startup.
*
* After cleanup, re-registers the current app to restore workbuddy:// binding.
*/
function unregisterAllWorkbuddyDeepLinksFromLaunchServices() {
	const appMatch = process.execPath.match(/^(.+?\.app)\//);
	const currentBundlePath = appMatch ? appMatch[1] : "";
	try {
		(0, child_process.execFile)("/bin/sh", ["-c", `${LSREGISTER_PATH} -dump | grep -E "^(bundle id:|path:)" | grep -A 1 "bundle id:.*WorkBuddy" | grep "path:" | sort -u`], {
			encoding: "utf8",
			maxBuffer: 10485760
		}, (err, stdout) => {
			if (err || !stdout) return;
			const paths = [];
			for (const line of stdout.split("\n")) {
				const match = line.match(/^\s*path:\s*(.+?)\s*\(0x[0-9a-f]+\)\s*$/);
				if (!match) continue;
				const appPath = match[1].trim();
				if (_internalShouldPreserveLaunchServicesRegistration(appPath, currentBundlePath)) continue;
				if (appPath && !paths.includes(appPath)) paths.push(appPath);
			}
			if (paths.length === 0) return;
			for (const appPath of paths) try {
				(0, child_process.spawnSync)(LSREGISTER_PATH, ["-u", appPath], { timeout: 5e3 });
				console.log(`[LegacyProtocolCleanup] unregistered stale Launch Services entry: ${appPath}`);
			} catch {}
		});
	} catch {}
}
function _internalShouldPreserveLaunchServicesRegistration(appPath, currentBundlePath) {
	return Boolean(currentBundlePath && appPath === currentBundlePath) || appPath.endsWith(COMPUTER_USE_APP_SUFFIX);
}
function configureElectronApp() {
	try {
		process.env.WORKBUDDY_APP_PATH = electron.app.getAppPath();
	} catch {}
	const configDir = require_code_cache.getWorkbuddyConfigDir();
	process.env.CODEBUDDY_CONFIG_DIR = configDir;
	process.env.WORKBUDDY_CONFIG_DIR = configDir;
	process.env.WORKBUDDY_DATA_FOLDER_NAME = require_code_cache._internalGetDefaultConfigDirname();
	require_code_cache.ensureWorkbuddyBootstrapProductEnv();
	const product = require_code_cache.tryGetWorkbuddyBaseProductConfiguration();
	const productName = product?.productName?.trim();
	if (productName) {
		const instanceNumber = require_code_cache._internalDetectInstanceNumber();
		electron.app.setName(instanceNumber ? `${productName} [${instanceNumber}]` : productName);
	} else electron.app.setName(require_code_cache.getWorkbuddyAppName());
	const applicationName = product?.applicationName;
	if (applicationName?.trim()) {
		const version = electron.app.getVersion();
		const brand = applicationName.trim();
		electron.app.userAgentFallback = electron.app.userAgentFallback.replace(`${electron.app.getName()}/${version}`, `${brand}/${version}`);
		electron.app.userAgentFallback = ensureApplicationUserAgentToken(electron.app.userAgentFallback, brand, version);
	}
	process.env.WORKBUDDY_APPLICATION_NAME = applicationName?.trim() || "workbuddy";
	if (process.platform === "linux") {
		const wmClass = deriveLinuxWmClass(product);
		if (wmClass) electron.app.commandLine.appendSwitch("class", wmClass);
	}
	electron.app.setPath("userData", require_code_cache.getWorkbuddyUserDataDir());
	electron.app.setPath("sessionData", require_code_cache.getWorkbuddySessionDataDir());
	electron.app.setAppLogsPath(require_code_cache.getWorkbuddyLogsDir());
}
var LEGACY_SCHEMES_TO_REMOVE, COMPUTER_USE_APP_SUFFIX, LSREGISTER_PATH;
var init_app_instance = require_rolldown_runtime.__esmMin((() => {
	require_code_cache.init_workbuddy_paths();
	require_code_cache.init_workbuddy_product_config();
	init_workbuddy_user_agent();
	LEGACY_SCHEMES_TO_REMOVE = ["codebuddy"];
	COMPUTER_USE_APP_SUFFIX = "/WorkBuddy Computer Use.app";
	LSREGISTER_PATH = "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister";
}));
//#endregion
//#region src/main/system/install/pending-telemetry-cleaner.ts
require_code_cache.init_common$3();
/**
* Pending telemetry file cleaner.
*
* Cleans up files older than RETENTION_DAYS in the pending-telemetry directory.
* Covers all file types: install-*.json.reported, install-*.json.invalid,
* repair-*.json, update-*.json.reported, etc.
*
* Called once during DesktopMonitorService.start(), runs asynchronously
* via setImmediate to avoid blocking startup.
*/
var import_src = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_code_cache.require_src());
init_app_instance();
var cleanerLog = import_src.default.scope("pending-telemetry-cleaner");
/** File retention period in days */
var RETENTION_DAYS = 10;
var RETENTION_MS = 864e6;
function getPendingDir() {
	return require_code_cache.getWorkbuddyPendingTelemetryDir();
}
/**
* Delete files whose mtime exceeds RETENTION_DAYS.
* Non-blocking, errors are logged but never thrown.
*/
function cleanStalePendingTelemetry() {
	setImmediate(() => {
		try {
			const dir = getPendingDir();
			if (!node_fs.existsSync(dir)) return;
			const now = Date.now();
			const entries = node_fs.readdirSync(dir);
			let cleaned = 0;
			for (const entry of entries) {
				const filePath = node_path.join(dir, entry);
				try {
					const stat = node_fs.statSync(filePath);
					if (!stat.isFile()) continue;
					if (now - stat.mtimeMs > RETENTION_MS) {
						node_fs.unlinkSync(filePath);
						cleaned++;
					}
				} catch {}
			}
			if (cleaned > 0) cleanerLog.info(`Cleaned ${cleaned} stale pending-telemetry file(s) older than ${RETENTION_DAYS} days`);
		} catch (err) {
			cleanerLog.warn("cleanStalePendingTelemetry failed:", err);
		}
	});
}
//#endregion
//#region ../../packages/monitor/src/common/interfaces/collector.ts
var import_common = require_code_cache.require_common$1();
/**
* Abstract base collector implementation
* Provides common functionality for all collectors
*/
var AbstractCollector = class {
	constructor(name, enabled = true) {
		this.name = name;
		this.enabled = enabled;
		this.running = false;
		this.collectedCount = 0;
		this.errorCount = 0;
		this.config = { enabled };
	}
	async start() {
		if (this.running) return;
		if (!this.enabled) {
			this.logger?.info(`[${this.name}] Collector is disabled, skipping start`);
			return;
		}
		await this.onStart();
		this.running = true;
		this.logger?.info(`[${this.name}] Collector started`);
	}
	async stop() {
		if (!this.running) {
			await this.onStop();
			return;
		}
		await this.onStop();
		this.running = false;
		this.logger?.info(`[${this.name}] Collector stopped`);
	}
	async collect() {
		if (!this.enabled || !this.running) return [];
		try {
			const metrics = await this.onCollect();
			this.collectedCount += metrics.length;
			this.lastCollectTime = Date.now();
			return metrics;
		} catch (error) {
			this.errorCount++;
			this.lastError = error;
			this.logger?.error(`[${this.name}] Collection error:`, error);
			return [];
		}
	}
	configure(config) {
		this.config = config;
		this.onConfigure(config);
	}
	getStatus() {
		return {
			name: this.name,
			enabled: this.enabled,
			running: this.running,
			collectedCount: this.collectedCount,
			errorCount: this.errorCount,
			lastCollectTime: this.lastCollectTime,
			lastError: this.lastError
		};
	}
	isRunning() {
		return this.running;
	}
	/**
	* Hook: Called when configuration changes
	* Subclasses can override to handle config updates
	*/
	onConfigure(config) {}
	/**
	* Collect logs (default implementation returns empty array)
	* Subclasses can override to provide log collection functionality
	*/
	async collectLogs() {
		if (!this.enabled || !this.running) return [];
		try {
			return await this.onCollectLogs();
		} catch (error) {
			this.logger?.error(`[${this.name}] Log collection error:`, error);
			return [];
		}
	}
	/**
	* Hook: Called to collect logs
	* Subclasses can override to implement log collection logic
	* Default: returns empty array (no logs)
	*/
	async onCollectLogs() {
		return [];
	}
};
//#endregion
//#region ../../packages/monitor/src/common/utils/monitor-logger.ts
/**
* Monitor Logger
*
* 统一的日志抽象层，替代 console.log
* 支持日志级别过滤和环境配置
*/
/**
* 日志级别
*/
var LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["INFO"] = 1] = "INFO";
	LogLevel[LogLevel["WARN"] = 2] = "WARN";
	LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
	LogLevel[LogLevel["NONE"] = 4] = "NONE";
	return LogLevel;
}({});
/**
* Monitor Logger 实现
*/
var MonitorLogger = class MonitorLogger {
	constructor(config) {
		this.config = config;
		this.isProduction = (config.envName || process.env.NODE_ENV) === "production";
	}
	/**
	* 调试日志
	*/
	debug(message, ...args) {
		if (!this.shouldLog(0)) return;
		console.debug(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 信息日志
	*/
	info(message, ...args) {
		if (!this.shouldLog(1)) return;
		console.log(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 警告日志
	*/
	warn(message, ...args) {
		if (!this.shouldLog(2)) return;
		console.warn(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 错误日志
	*/
	error(message, error, ...args) {
		if (!this.shouldLog(3)) return;
		if (error instanceof Error) console.error(`[${this.config.component}] ${message}`, error.message, error.stack, ...args);
		else if (error) console.error(`[${this.config.component}] ${message}`, error, ...args);
		else console.error(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 判断是否应该记录日志
	*/
	shouldLog(level) {
		if (!this.config.enabled) return false;
		if (this.isProduction && this.config.disableDebugInProduction && level === 0) return false;
		return level >= this.config.minLevel;
	}
	/**
	* 更新配置
	*/
	updateConfig(config) {
		this.config = {
			...this.config,
			...config
		};
	}
	/**
	* 创建子日志记录器
	*/
	createChild(childName) {
		return new MonitorLogger({
			...this.config,
			component: `${this.config.component}:${childName}`
		});
	}
};
//#endregion
//#region ../../packages/monitor/src/utils/event-bus.ts
/**
* Monitor Event Bus
*
* 全局事件总线，用于监控系统的事件发射和监听
*
* 特点：
* - 异步事件发射（不阻塞主流程）
* - 错误隔离（监听器错误不影响业务）
* - 类型安全（TypeScript 类型定义）
*/
/**
* 监控事件总线
*
* 扩展自 Node.js EventEmitter，提供类型安全的事件发射和监听
*/
var MonitorEventBus = class extends events.EventEmitter {
	constructor() {
		super();
		this.logger = new MonitorLogger({
			component: "MonitorEventBus",
			minLevel: LogLevel.INFO,
			enabled: false
		});
		this.setMaxListeners(100);
	}
	/**
	* 异步发射事件
	*
	* 使用 setImmediate 确保事件处理不阻塞当前执行流程
	* 错误会被捕获并记录，不会影响业务逻辑
	*
	* @param event - 事件名称
	* @param payload - 事件 payload
	*/
	emitAsync(event, payload) {
		this.logger.info(`emitAsync called, event: ${String(event)}, listeners: ${this.listenerCount(event)}`);
		setImmediate(() => {
			try {
				this.logger.info(`Emitting event: ${String(event)} to ${this.listenerCount(event)} listeners`);
				this.emit(event, payload);
				this.logger.info(`Event emitted successfully: ${String(event)}`);
			} catch (error) {
				this.logger.error(`Error emitting event ${event}:`, error);
			}
		});
	}
	/**
	* 类型安全的事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	onMonitor(event, listener) {
		this.logger.info(`onMonitor called, event: ${String(event)}, total listeners after: ${this.listenerCount(event) + 1}`);
		return this.on(event, listener);
	}
	/**
	* 移除类型安全的事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	offMonitor(event, listener) {
		return this.off(event, listener);
	}
	/**
	* 一次性事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	onceMonitor(event, listener) {
		return this.once(event, listener);
	}
	/**
	* 获取事件统计信息
	*/
	getEventStats() {
		const stats = {};
		for (const event of this.eventNames()) stats[event] = this.listenerCount(event);
		return stats;
	}
	/**
	* 清理所有监听器
	*/
	clearAll() {
		this.removeAllListeners();
	}
};
/**
* 全局单例
*
* 整个应用共享同一个 EventBus 实例
*
* 使用 global 对象确保即使模块被重新加载（reload），也使用同一个实例
* 这解决了 VSCode reload 后事件监听器丢失的问题
*/
var GLOBAL_EVENT_BUS_KEY = "__GENIE_MONITOR_EVENT_BUS__";
function getOrCreateEventBus() {
	const globalObj = global;
	if (!globalObj[GLOBAL_EVENT_BUS_KEY]) globalObj[GLOBAL_EVENT_BUS_KEY] = new MonitorEventBus();
	return globalObj[GLOBAL_EVENT_BUS_KEY];
}
var monitorEventBus = getOrCreateEventBus();
//#endregion
//#region ../../packages/monitor/src/common/monitor-event-bridge.ts
/**
* Monitor Event Bridge
*
* 监控事件桥接层，连接业务代码和监控系统
*
* 职责:
* - 提供 DI 注入接口（@Autowired(MonitorEventBridgeService)）
* - 将业务代码的监控事件转发到全局 monitorEventBus
* - 作为业务代码和 EnhancedMonitor 之间的解耦层
*
* 架构:
* - 业务代码 → MonitorEventBridge.emit() → monitorEventBus
* - EnhancedMonitor 的 collectors 监听 monitorEventBus
* - 真正的监控系统由 EnhancedMonitor 实现（在 plugin-core/monitor-setup.ts 初始化）
*/
require_code_cache.init_common$2();
require_code_cache.init_decorateMetadata();
require_code_cache.init_decorate();
/**
* DI Token for MonitorEventBridgeService
*
* 注意: 为保持向后兼容，Token 名称仍为 'MonitorEventBridgeService'
* 业务代码使用 @Autowired(MonitorEventBridgeService) 注入
*/
var MonitorEventBridgeService = Symbol("MonitorEventBridgeService");
var MonitorEventBridge = class MonitorEventBridge {
	/**
	* Emit a monitoring event to the global event bus
	*
	* 事件流转:
	* Business Code → emit() → monitorEventBus → Collectors → Processors → Exporters
	*/
	emit(event, payload) {
		this.logger.debug(`[MonitorEventBridge] Forwarding event: ${String(event)}`);
		monitorEventBus.emitAsync(event, payload);
	}
};
require_code_cache.__decorate([(0, import_common.Autowired)(require_code_cache.Logger), require_code_cache.__decorateMetadata("design:type", typeof require_code_cache.Logger === "undefined" ? Object : require_code_cache.Logger)], MonitorEventBridge.prototype, "logger", void 0);
MonitorEventBridge = require_code_cache.__decorate([(0, import_common.Component)(MonitorEventBridgeService)], MonitorEventBridge);
Number.MAX_SAFE_INTEGER;
//#endregion
//#region src/main/features/monitor/collectors/chat-perf-collector.ts
/**
* ChatPerformanceCollector - 聊天性能监控（两个独立指标）
*
* 指标 1: chat.message_display — 发消息 → 用户消息呈现在屏幕上（首屏体验）
*   = sendMessage entry → api.prompt() RPC 发出（前置准备时间）
*   收集后立即上报（flushNow）
*   附带 main 进程 session 创建的详细耗时分解（从 session-create-timing store 获取）
*
* 指标 2: chat.first_response — 发消息 → 首个 assistant 回复上屏
*   包含指标1的时间 + 等待 LLM 首 token
*   60s 定时上报
*/
var MAX_PENDING_LOGS$3 = 200;
var ChatPerformanceCollector = class extends AbstractCollector {
	pendingLogs = [];
	/** 立即 flush 回调（由 DesktopMonitorService 注入） */
	onMessageDisplayRecorded;
	constructor() {
		super("ChatPerformanceCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 指标 1: 用户消息上屏耗时（首屏体验）— 收集后立即上报
	*
	* 从 session-create-timing store 中查找并附加 main 进程各阶段的详细耗时:
	* - is_cold_start: 是否为冷启动（需要 spawn sidecar）
	* - main_total_ms: main 进程 session 创建总耗时
	* - find_port_ms: 寻找空闲端口
	* - prepare_ms: 解析 CLI 路径 + 构建环境变量 + 写入 system prompt
	* - sidecar_ms: sidecar 启动/重连 + PTY 创建
	* - wait_for_port_ms: 等待 CLI HTTP 端口可达
	* - acp_connect_ms: ACP WebSocket 连接（含重试）
	* - session_load_ms: CLI 中 loadSession / resumeSession
	* - renderer_overhead_ms: 端到端总耗时减去 main 耗时（daemon RPC + React state update）
	*/
	recordMessageDisplay(data) {
		const totalMs = data.displayTime - data.sendTime;
		if (totalMs < 0 || totalMs > 6e4) {
			require_log_acl_guard.mainLog.warn(`[ChatPerfCollector] Invalid message_display: ${totalMs}ms, skipping`);
			return;
		}
		const breakdown = require_log_acl_guard.consumeSessionCreateTiming(data.sessionId);
		const breakdownSummary = breakdown ? ` [main=${breakdown.totalMs}ms: prepare=${breakdown.prepareMs}ms(env=${breakdown.envResolveMs}ms,write=${breakdown.writePromptMs}ms), sidecar=${breakdown.sidecarMs}ms, waitPort=${breakdown.waitForPortMs}ms, acp=${breakdown.acpConnectMs}ms, mcp=${breakdown.mcpAssembleMs}ms, load=${breakdown.sessionLoadMs}ms, cold=${breakdown.isColdStart}]` : "";
		require_log_acl_guard.mainLog.info(`[ChatPerfCollector] message_display: ${totalMs}ms${breakdownSummary}`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS$3) {
			const attributes = {
				event: "workbuddy.chat.message_display",
				session_id: data.sessionId,
				total_ms: totalMs
			};
			if (data.modelId) attributes.model_id = data.modelId;
			if (data.modeId) attributes.mode_id = data.modeId;
			if (breakdown) {
				attributes.is_cold_start = breakdown.isColdStart;
				attributes.main_total_ms = breakdown.totalMs;
				attributes.find_port_ms = breakdown.findPortMs;
				attributes.prepare_ms = breakdown.prepareMs;
				attributes.env_resolve_ms = breakdown.envResolveMs;
				attributes.write_prompt_ms = breakdown.writePromptMs;
				attributes.sidecar_ms = breakdown.sidecarMs;
				attributes.wait_for_port_ms = breakdown.waitForPortMs;
				attributes.acp_connect_ms = breakdown.acpConnectMs;
				attributes.mcp_assemble_ms = breakdown.mcpAssembleMs;
				attributes.session_load_ms = breakdown.sessionLoadMs;
				const rendererOverheadMs = totalMs - breakdown.totalMs;
				if (rendererOverheadMs >= 0) attributes.renderer_overhead_ms = Math.round(rendererOverheadMs);
			}
			this.pendingLogs.push({
				timestamp: Date.now(),
				level: "info",
				message: "chat.message_display",
				attributes
			});
		}
		this.onMessageDisplayRecorded?.();
	}
	/**
	* 指标 2: 首个 assistant 回复上屏耗时（包含指标1的时间）
	*/
	recordFirstResponse(data) {
		const totalMs = data.firstTokenTime - data.sendTime;
		const preparationMs = data.promptSentTime - data.sendTime;
		const ttfbMs = data.firstTokenTime - data.promptSentTime;
		if (totalMs < 0 || totalMs > 3e5 || preparationMs < 0 || ttfbMs < 0) {
			require_log_acl_guard.mainLog.warn(`[ChatPerfCollector] Invalid first_response: total=${totalMs}ms, prep=${preparationMs}ms, ttfb=${ttfbMs}ms, skipping`);
			return;
		}
		require_log_acl_guard.mainLog.info(`[ChatPerfCollector] first_response: total=${totalMs}ms, prep=${preparationMs}ms, ttfb=${ttfbMs}ms`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS$3) this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "chat.first_response",
			attributes: {
				event: "workbuddy.chat.first_response",
				session_id: data.sessionId,
				total_ms: totalMs,
				preparation_ms: preparationMs,
				ttfb_ms: ttfbMs,
				...data.modelId ? { model_id: data.modelId } : {},
				...data.modeId ? { mode_id: data.modeId } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/cli-health-collector.ts
/**
* CliHealthCollector - CLI 进程健康监控收集器
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
*
* 日志 attributes：
* - event: workbuddy.cli
* - action: start / crash / restart
* - duration_ms: 启动耗时
* - exit_code: 退出码
* - signal: 退出信号
*/
var CliHealthCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("CliHealthCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	recordCliStart(durationMs) {
		require_log_acl_guard.mainLog.info(`[CliHealthCollector] CLI started${durationMs !== void 0 ? `, duration=${durationMs}ms` : ""}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "cli.start",
			attributes: {
				event: "workbuddy.cli",
				action: "start",
				...durationMs !== void 0 ? { duration_ms: durationMs } : {}
			}
		});
	}
	recordCliCrash(exitCode, signal) {
		require_log_acl_guard.mainLog.warn(`[CliHealthCollector] CLI crashed, exitCode=${exitCode ?? "null"}, signal=${signal ?? "null"}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "error",
			message: "cli.crash",
			attributes: {
				event: "workbuddy.cli",
				action: "crash",
				...exitCode != null ? { exit_code: String(exitCode) } : {},
				...signal ? { signal } : {}
			}
		});
	}
	recordCliRestart() {
		require_log_acl_guard.mainLog.info("[CliHealthCollector] CLI restarted");
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "warn",
			message: "cli.restart",
			attributes: {
				event: "workbuddy.cli",
				action: "restart"
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/history-load-collector.ts
/**
* HistoryLoadCollector - 历史记录加载性能监控
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
*
* 3 段分时：
* - T1→T2: renderer_to_main_ms（渲染进程 → 主进程 IPC 开销）
* - T2→T3: load_and_render_ms（主进程加载 + CLI 回放 + 渲染完成）
* - T1→T3: total_ms（端到端总耗时）
*
* 日志 attributes：
* - event: workbuddy.history.load
* - session_id, request_id, total_ms, renderer_to_main_ms, load_and_render_ms
* - read_jsonl_ms, active_items, convert_ms, events, bytes, checkpoint_ms, main_push_ms, renderer_hydration_ms
* - renderer_get_session_ms, renderer_expert_hydration_ms, renderer_scene_template_ms
* - renderer_projection_replay_ms, renderer_store_switch_ms
* - renderer_replay_drain_ms, renderer_owner_rehydrate_ms, renderer_accumulator_reconcile_ms
* - renderer_team_runtime_ms, renderer_team_settle_ms, renderer_task_emit_ms, renderer_terminal_sweep_ms
* - message_count（可选）
*/
/** 最大待导出日志数 */
var MAX_PENDING_LOGS$2 = 100;
var HistoryLoadCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("HistoryLoadCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	recordHistoryLoadTiming(data) {
		const totalMs = data.hydrationCompleteTime - data.rendererLoadTime;
		const rendererToMainMs = data.mainLoadTime - data.rendererLoadTime;
		const loadAndRenderMs = data.hydrationCompleteTime - data.mainLoadTime;
		if (totalMs < 0 || totalMs > 12e4 || rendererToMainMs < 0 || loadAndRenderMs < 0) {
			require_log_acl_guard.mainLog.warn(`[HistoryLoadCollector] Invalid timing: total=${totalMs}ms, r2m=${rendererToMainMs}ms, load=${loadAndRenderMs}ms, skipping`);
			return;
		}
		const parts = [
			data.switchMode ? `mode=${data.switchMode}` : void 0,
			`total=${totalMs}ms`,
			`r2m=${rendererToMainMs}ms`,
			`load=${loadAndRenderMs}ms`,
			data.messageCount !== void 0 ? `msgs=${data.messageCount}` : void 0,
			data.readJsonlMs !== void 0 ? `readJsonl=${data.readJsonlMs}ms` : void 0,
			data.activeItems !== void 0 ? `activeItems=${data.activeItems}` : void 0,
			data.convertMs !== void 0 ? `convert=${data.convertMs}ms` : void 0,
			data.events !== void 0 ? `events=${data.events}` : void 0,
			data.bytes !== void 0 ? `bytes=${data.bytes}` : void 0,
			data.checkpointMs !== void 0 ? `checkpoint=${data.checkpointMs}ms` : void 0,
			data.mainPushMs !== void 0 ? `mainPush=${data.mainPushMs}ms` : void 0,
			data.rendererHydrationMs !== void 0 ? `rendererHydration=${data.rendererHydrationMs}ms` : void 0,
			data.rendererGetSessionMs !== void 0 ? `rendererGetSession=${data.rendererGetSessionMs}ms` : void 0,
			data.rendererExpertHydrationMs !== void 0 ? `rendererExpertHydration=${data.rendererExpertHydrationMs}ms` : void 0,
			data.rendererSceneTemplateMs !== void 0 ? `rendererSceneTemplate=${data.rendererSceneTemplateMs}ms` : void 0,
			data.rendererProjectionReplayMs !== void 0 ? `rendererProjectionReplay=${data.rendererProjectionReplayMs}ms` : void 0,
			data.rendererStoreSwitchMs !== void 0 ? `rendererStoreSwitch=${data.rendererStoreSwitchMs}ms` : void 0,
			data.rendererReplayDrainMs !== void 0 ? `rendererReplayDrain=${data.rendererReplayDrainMs}ms` : void 0,
			data.rendererOwnerRehydrateMs !== void 0 ? `rendererOwnerRehydrate=${data.rendererOwnerRehydrateMs}ms` : void 0,
			data.rendererAccumulatorReconcileMs !== void 0 ? `rendererAccumulatorReconcile=${data.rendererAccumulatorReconcileMs}ms` : void 0,
			data.rendererTeamRuntimeMs !== void 0 ? `rendererTeamRuntime=${data.rendererTeamRuntimeMs}ms` : void 0,
			data.rendererTeamSettleMs !== void 0 ? `rendererTeamSettle=${data.rendererTeamSettleMs}ms` : void 0,
			data.rendererTaskEmitMs !== void 0 ? `rendererTaskEmit=${data.rendererTaskEmitMs}ms` : void 0,
			data.rendererTerminalSweepMs !== void 0 ? `rendererTerminalSweep=${data.rendererTerminalSweepMs}ms` : void 0,
			data.requestId ? `requestId=${data.requestId}` : void 0
		].filter(Boolean);
		require_log_acl_guard.mainLog.info(`[HistoryLoadCollector] ${parts.join(", ")}`);
		if (this.pendingLogs.length >= MAX_PENDING_LOGS$2) return;
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "history.load",
			attributes: {
				event: "workbuddy.history.load",
				session_id: data.sessionId,
				...data.requestId ? { request_id: data.requestId } : {},
				...data.switchMode ? { switch_mode: data.switchMode } : {},
				total_ms: totalMs,
				renderer_to_main_ms: rendererToMainMs,
				load_and_render_ms: loadAndRenderMs,
				...data.messageCount !== void 0 ? { message_count: data.messageCount } : {},
				...data.readJsonlMs !== void 0 ? { read_jsonl_ms: data.readJsonlMs } : {},
				...data.activeItems !== void 0 ? { active_items: data.activeItems } : {},
				...data.convertMs !== void 0 ? { convert_ms: data.convertMs } : {},
				...data.events !== void 0 ? { events: data.events } : {},
				...data.bytes !== void 0 ? { bytes: data.bytes } : {},
				...data.checkpointMs !== void 0 ? { checkpoint_ms: data.checkpointMs } : {},
				...data.mainPushMs !== void 0 ? { main_push_ms: data.mainPushMs } : {},
				...data.rendererHydrationMs !== void 0 ? { renderer_hydration_ms: data.rendererHydrationMs } : {},
				...data.rendererGetSessionMs !== void 0 ? { renderer_get_session_ms: data.rendererGetSessionMs } : {},
				...data.rendererExpertHydrationMs !== void 0 ? { renderer_expert_hydration_ms: data.rendererExpertHydrationMs } : {},
				...data.rendererSceneTemplateMs !== void 0 ? { renderer_scene_template_ms: data.rendererSceneTemplateMs } : {},
				...data.rendererProjectionReplayMs !== void 0 ? { renderer_projection_replay_ms: data.rendererProjectionReplayMs } : {},
				...data.rendererStoreSwitchMs !== void 0 ? { renderer_store_switch_ms: data.rendererStoreSwitchMs } : {},
				...data.rendererReplayDrainMs !== void 0 ? { renderer_replay_drain_ms: data.rendererReplayDrainMs } : {},
				...data.rendererOwnerRehydrateMs !== void 0 ? { renderer_owner_rehydrate_ms: data.rendererOwnerRehydrateMs } : {},
				...data.rendererAccumulatorReconcileMs !== void 0 ? { renderer_accumulator_reconcile_ms: data.rendererAccumulatorReconcileMs } : {},
				...data.rendererTeamRuntimeMs !== void 0 ? { renderer_team_runtime_ms: data.rendererTeamRuntimeMs } : {},
				...data.rendererTeamSettleMs !== void 0 ? { renderer_team_settle_ms: data.rendererTeamSettleMs } : {},
				...data.rendererTaskEmitMs !== void 0 ? { renderer_task_emit_ms: data.rendererTaskEmitMs } : {},
				...data.rendererTerminalSweepMs !== void 0 ? { renderer_terminal_sweep_ms: data.rendererTerminalSweepMs } : {},
				...data.deferredDrainMs !== void 0 ? { deferred_drain_ms: data.deferredDrainMs } : {},
				...data.deferredBatchCount !== void 0 ? { deferred_batch_count: data.deferredBatchCount } : {},
				...data.deferredEventCount !== void 0 ? { deferred_event_count: data.deferredEventCount } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/market-page-load-collector.ts
/**
* MarketPageLoadCollector - 市场页（专家/技能/连接器）加载性能监控
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
*
* 日志 attributes：
* - event: workbuddy.market.page_load
* - tab, from, trigger, success, cache_hit, total_ms
* - error, t1_ms, fetch_ms, paint_ms, item_count（可选）
*/
var VALID_TABS = /* @__PURE__ */ new Set([
	"experts",
	"skills",
	"connectors"
]);
var VALID_TRIGGERS = /* @__PURE__ */ new Set([
	"menu_click",
	"deeplink",
	"back"
]);
/** 最大待导出日志数 */
var MAX_PENDING_LOGS$1 = 100;
var MarketPageLoadCollector = class extends AbstractCollector {
	pendingLogs = [];
	onRecorded;
	constructor() {
		super("MarketPageLoadCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	recordMarketPageLoad(data) {
		if (!VALID_TABS.has(data.tab)) {
			require_log_acl_guard.mainLog.warn(`[MarketPageLoadCollector] Invalid tab: ${data.tab}, skipping`);
			return false;
		}
		if (!VALID_TRIGGERS.has(data.trigger)) {
			require_log_acl_guard.mainLog.warn(`[MarketPageLoadCollector] Invalid trigger: ${data.trigger}, skipping`);
			return false;
		}
		if (data.total_ms < 0 || data.total_ms > 2e4) {
			require_log_acl_guard.mainLog.warn(`[MarketPageLoadCollector] Invalid total_ms: ${data.total_ms}, skipping`);
			return false;
		}
		const parts = [
			`tab=${data.tab}`,
			`from=${data.from}`,
			`trigger=${data.trigger}`,
			`success=${data.success}`,
			`cache_hit=${data.cache_hit}`,
			`total=${data.total_ms}ms`,
			data.error ? `error=${data.error}` : void 0,
			data.t1_ms !== void 0 ? `t1=${data.t1_ms}ms` : void 0,
			data.fetch_ms !== void 0 ? `fetch=${data.fetch_ms}ms` : void 0,
			data.paint_ms !== void 0 ? `paint=${data.paint_ms}ms` : void 0,
			data.item_count !== void 0 ? `items=${data.item_count}` : void 0
		].filter(Boolean);
		require_log_acl_guard.mainLog.info(`[MarketPageLoadCollector] ${parts.join(", ")}`);
		if (this.pendingLogs.length >= MAX_PENDING_LOGS$1) {
			require_log_acl_guard.mainLog.warn(`[MarketPageLoadCollector] Pending log buffer full (${MAX_PENDING_LOGS$1}), dropping sample`);
			return false;
		}
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "market.page_load",
			attributes: {
				event: "workbuddy.market.page_load",
				tab: data.tab,
				from: data.from,
				trigger: data.trigger,
				success: data.success,
				cache_hit: data.cache_hit,
				total_ms: data.total_ms,
				...data.error ? { error: data.error } : {},
				...data.t1_ms !== void 0 ? { t1_ms: data.t1_ms } : {},
				...data.fetch_ms !== void 0 ? { fetch_ms: data.fetch_ms } : {},
				...data.paint_ms !== void 0 ? { paint_ms: data.paint_ms } : {},
				...data.item_count !== void 0 ? { item_count: data.item_count } : {}
			}
		});
		this.onRecorded?.();
		return true;
	}
};
//#endregion
//#region src/main/features/monitor/collectors/migration-collector.ts
/**
* MigrationCollector - 历史记录迁移监控收集器
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
* 每个事件只上报一条日志，用 status 字段区分结果。
*
* 上报模式：
* - 每个子迁移上报 1 条：migration.{type}，status = success / failed / skipped
* - 整体汇总上报 1 条：migration.all，status = success / failed
*
* 日志 attributes：
* - event: workbuddy.migration
* - migration_type: all / history / automation / plan / ...
* - status: success / failed / skipped
* - duration_ms: 耗时
* - session_count: session 数量
* - is_incremental: 是否增量
* - error_message: 错误信息（截断 200 字符）
*/
var MigrationCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("MigrationCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 记录一次迁移结果（子迁移或汇总）
	*/
	recordMigration(record) {
		require_log_acl_guard.mainLog.info(`[MigrationCollector] ${record.type}: status=${record.status}, duration=${record.durationMs}ms${record.sessionCount ? ", sessions=" + record.sessionCount : ""}${record.error ? ", error=" + record.error.slice(0, 100) : ""}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: record.status === "failed" ? "error" : "info",
			message: `migration.${record.type}`,
			attributes: {
				event: "workbuddy.migration",
				migration_type: record.type,
				status: record.status,
				duration_ms: record.durationMs,
				is_incremental: String(record.isIncremental),
				...record.sessionCount !== void 0 ? { session_count: record.sessionCount } : {},
				...record.error ? { error_message: record.error.slice(0, 200) } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/telemetry/startup-perf-exporters.ts
/**
* StartupTelemetry Metric / Trace 出口。
*
* 复用 `DesktopMonitorService` 现成的信号出口，不另接 SDK：
* - **Metric**（2.3-B）：整启动 → `recordDuration('workbuddy.startup.total', totalMs)`，
*   E14 首屏可交互 → `recordDuration('workbuddy.startup.first_interactive', firstInteractiveMs)`，
*   各段 → `recordDuration('workbuddy.startup.phase', ms, {phase})` → Aegis。
* - **Trace**：跨进程对齐后的 mark → span 树（root=整启动，child=各 phase + 64 个 mark 点）
*   → `exportTraces` → 伽利略 /v1/traces。
*
* 仅在**持有 monitor 单例的 main 进程**调用有效；daemon 子进程无单例，须先把
* logFilePath 桥回 main 再由 main 重聚合调用（见 perf-marks.flushStartupPerf）。
* 全程吞异常，绝不阻塞启动。
*/
function createStartupTraceId() {
	return (0, node_crypto.randomBytes)(16).toString("hex");
}
function stableSpanId(traceId, ...parts) {
	return (0, node_crypto.createHash)("sha256").update([traceId, ...parts].join("\0")).digest("hex").slice(0, 16);
}
function getStartupRootSpanId(traceId) {
	return stableSpanId(traceId, "startup", "root");
}
function getStartupPhaseSpanId(traceId, phase) {
	return stableSpanId(traceId, "startup", "phase", phase || "unknown");
}
function getStartupMarkSpanId(traceId, mark) {
	return stableSpanId(traceId, "startup", "mark", mark.proc || "unknown", mark.id || "unknown", mark.key || "unknown");
}
/**
* 2.3-B · MetricExporter：整启动总耗时 + E8 首屏可交互 + 各段耗时打到 Aegis（recordDuration）。
* value 维度需 string，这里统一 String()。
*/
function exportStartupMetric(monitor, summary) {
	try {
		const appVersion = typeof monitor.getAppVersion === "function" ? monitor.getAppVersion() : void 0;
		const baseDims = {
			startup_type: String(summary.startupType),
			flow_type: String(summary.flowType),
			...appVersion ? { app_version: String(appVersion) } : {}
		};
		if (summary.totalMs > 0) monitor.recordDuration("workbuddy.startup.total", summary.totalMs, baseDims);
		if (typeof summary.firstInteractiveMs === "number" && summary.firstInteractiveMs > 0) monitor.recordDuration("workbuddy.startup.first_interactive", summary.firstInteractiveMs, baseDims);
		for (const [phase, ms] of Object.entries(summary.phases)) if (ms > 0) {
			monitor.recordDuration("workbuddy.startup.phase", ms, {
				...baseDims,
				phase
			});
			monitor.recordDuration(`workbuddy.startup.phase.${phase}`, ms, {
				...baseDims,
				phase
			});
		}
	} catch {}
}
/**
* 由对齐后的 mark 构造 span 树：root=整启动，child=各 phase，phase 下挂具体 mark 点。
* 无可定位 mark（absEpoch 全缺）时返回空数组。导出为纯函数，便于单测。
*/
function buildStartupSpans(marks, summary, target, traceId = createStartupTraceId()) {
	const located = marks.filter((m) => typeof m.absEpoch === "number").sort((a, b) => a.absEpoch - b.absEpoch);
	if (located.length === 0) return [];
	const rootSpanId = getStartupRootSpanId(traceId);
	const rootStart = Math.min(...located.map((m) => m.absEpoch));
	const rootEnd = Math.max(...located.map((m) => m.absEpoch));
	const baseAttrs = {
		"service.target": target,
		"startup.type": summary.startupType,
		"startup.flow_type": summary.flowType,
		"trpc.status_type": "success"
	};
	const spans = [{
		traceId,
		spanId: rootSpanId,
		name: "workbuddy.startup",
		kind: "internal",
		startTime: rootStart,
		endTime: rootEnd,
		attributes: {
			...baseAttrs,
			"startup.total_ms": summary.totalMs,
			...typeof summary.firstInteractiveMs === "number" ? { "startup.first_interactive_ms": summary.firstInteractiveMs } : {},
			"startup.total_marks": summary.totalMarks
		},
		status: "ok"
	}];
	const segBounds = /* @__PURE__ */ new Map();
	for (const m of located) {
		if (!m.phase) continue;
		const cur = segBounds.get(m.phase);
		if (cur) {
			cur.min = Math.min(cur.min, m.absEpoch);
			cur.max = Math.max(cur.max, m.absEpoch);
			cur.count += 1;
		} else segBounds.set(m.phase, {
			min: m.absEpoch,
			max: m.absEpoch,
			count: 1
		});
	}
	const phaseSpanIds = /* @__PURE__ */ new Map();
	for (const [phase, b] of segBounds) {
		const phaseSpanId = getStartupPhaseSpanId(traceId, phase);
		phaseSpanIds.set(phase, phaseSpanId);
		spans.push({
			traceId,
			spanId: phaseSpanId,
			parentSpanId: rootSpanId,
			name: `startup.${phase}`,
			kind: "internal",
			startTime: b.min,
			endTime: b.max,
			attributes: {
				...baseAttrs,
				"startup.phase": phase,
				"startup.phase_marks": b.count
			},
			status: "ok"
		});
	}
	const previousMarkByProc = /* @__PURE__ */ new Map();
	for (const m of located) {
		const prev = previousMarkByProc.get(m.proc);
		const markStart = prev?.absEpoch ?? m.absEpoch;
		const durationMs = Math.round((m.absEpoch - markStart) * 100) / 100;
		previousMarkByProc.set(m.proc, m);
		spans.push({
			traceId,
			spanId: getStartupMarkSpanId(traceId, m),
			parentSpanId: phaseSpanIds.get(m.phase) ?? rootSpanId,
			name: `startup.mark.${m.id || "unknown"}.${m.key || "unknown"}`,
			kind: "internal",
			startTime: markStart,
			endTime: m.absEpoch,
			attributes: {
				...baseAttrs,
				"startup.mark.id": m.id,
				"startup.mark.key": m.key,
				"startup.mark.duration_ms": durationMs,
				...prev ? { "startup.mark.prev_id": prev.id } : {},
				"startup.phase": m.phase,
				"startup.proc": m.proc
			},
			...m.id === "E14" ? { events: [{
				name: "首屏可交互",
				timestamp: m.absEpoch,
				attributes: {
					"startup.mark.id": m.id,
					"startup.mark.key": m.key,
					"startup.first_interactive": true
				}
			}] } : {},
			status: "ok"
		});
	}
	return spans;
}
/**
* 2.3-C · TraceExporter：把一次启动的 span 树上报伽利略。
*/
async function exportStartupTrace(monitor, session, traceId) {
	try {
		const target = monitor.getGalileoTarget();
		const spans = buildStartupSpans(session.marks, session.summary, target, traceId);
		if (spans.length === 0) return;
		await monitor.exportTraces(spans);
	} catch {}
}
//#endregion
//#region src/main/features/monitor/collectors/startup-perf-collector.ts
/**
* StartupPerfCollector — 启动性能上报（通道 A · 伽利略线上）
*
* 把启动性能 summary、原始 JSONL、per-mark 明细作为 `LogRecord`
* 推入伽利略上报管线。
*
* 接入方式与 `ChatPerformanceCollector` 完全一致：
*   pendingLogs(LogRecord[]) → onCollectLogs() → DesktopMonitorService
*   .collectAndExportLogs() → galileoExporter.exportLogs() / aegisExporter.exportLogs()
*
* 只要本 collector 被加进 `DesktopMonitorService.collectors[]`，就会被周期
* `collectAndExportLogs()` 自动收集并双通道上报，无需触碰 exporter / OTLP 底层。
*
* LogRecord → 伽利略平台映射：
*   - `message`        → 平台 message 列（这里固定 `startup.perf`）
*   - `attributes.*`   → 平台 `tags.*`（如 tags.startup_type / tags.total_ms / tags.phase_A_ms）
*/
var MAX_PENDING_LOGS = 100;
var MAX_STARTUP_JSONL_CHARS = 524288;
function buildTraceTags(traceId, _spanId) {
	return traceId ? { startup_trace_id: traceId } : {};
}
var StartupPerfCollector = class extends AbstractCollector {
	pendingLogs = [];
	/** 立即 flush 回调（由 DesktopMonitorService 注入，可选） */
	onStartupPerfRecorded;
	constructor() {
		super("StartupPerfCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 记录一次启动性能 summary，等待下一次周期 collect 时上报伽利略。
	*
	* 由 desktop 侧 startup summary 计算接桥调用（与通道 B 的 `logStartupPerf` 共用同一份 summary）。
	*/
	recordStartupPerf(summary, traceId) {
		const spanId = traceId ? getStartupRootSpanId(traceId) : void 0;
		const attributes = {
			event: "workbuddy.startup.perf",
			...buildTraceTags(traceId, spanId),
			startup_type: summary.startupType,
			flow_type: summary.flowType,
			total_ms: summary.totalMs,
			...typeof summary.firstInteractiveMs === "number" ? { first_interactive_ms: summary.firstInteractiveMs } : {},
			total_marks: summary.totalMarks
		};
		for (const [phase, durationMs] of Object.entries(summary.phases)) attributes[`phase_${phase}_ms`] = durationMs;
		require_log_acl_guard.mainLog.info(`[StartupPerfCollector] startup.perf: trace=${traceId ?? "-"} type=${summary.startupType} total=${summary.totalMs}ms firstInteractive=${summary.firstInteractiveMs ?? "-"}ms marks=${summary.totalMarks}`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS) this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "startup.perf",
			...traceId && spanId ? {
				traceId,
				spanId
			} : {},
			attributes
		});
		this.onStartupPerfRecorded?.();
	}
	/**
	* 记录原始 startup JSONL，供伽利略侧复制后直接丢进外部 startup-report.html 展示。
	*/
	recordStartupJsonl(jsonlText, summary, traceId) {
		if (this.pendingLogs.length >= MAX_PENDING_LOGS) return;
		const truncated = jsonlText.length > MAX_STARTUP_JSONL_CHARS;
		const jsonl = truncated ? jsonlText.slice(0, MAX_STARTUP_JSONL_CHARS) : jsonlText;
		const spanId = traceId ? getStartupRootSpanId(traceId) : void 0;
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "startup.jsonl",
			...traceId && spanId ? {
				traceId,
				spanId
			} : {},
			attributes: {
				event: "workbuddy.startup.jsonl",
				...buildTraceTags(traceId, spanId),
				startup_type: summary.startupType,
				flow_type: summary.flowType,
				total_ms: summary.totalMs,
				...typeof summary.firstInteractiveMs === "number" ? { first_interactive_ms: summary.firstInteractiveMs } : {},
				total_marks: summary.totalMarks,
				jsonl_bytes: Buffer.byteLength(jsonlText, "utf-8"),
				jsonl_lines: jsonlText.split("\n").filter(Boolean).length,
				jsonl_truncated: truncated,
				jsonl
			}
		});
		this.onStartupPerfRecorded?.();
	}
	/**
	* 2.3-A · LogExporter：每条对齐后的 mark → 1 条 `startup.mark` LogRecord。
	*
	* 比 summary 行更细粒度，支持在伽利略按 `tags.mark_id` / `tags.phase` 下钻单点耗时。
	* 受 MAX_PENDING_LOGS 限额保护（超出丢弃，避免撑爆 buffer）；version/platform 等
	* 环境字段由 GalileoExporter.resource 注入，这里不重复带。
	*/
	recordStartupMarks(marks, summary, traceId) {
		const now = Date.now();
		const located = marks.filter((m) => typeof m.absEpoch === "number");
		const startAbsEpoch = located.length > 0 ? Math.min(...located.map((m) => m.absEpoch)) : void 0;
		const roundMs = (value) => Math.round(value * 100) / 100;
		for (const m of marks) {
			if (this.pendingLogs.length >= MAX_PENDING_LOGS) break;
			const offsetMs = typeof m.absEpoch === "number" && startAbsEpoch !== void 0 ? roundMs(m.absEpoch - startAbsEpoch) : void 0;
			const spanId = traceId ? getStartupMarkSpanId(traceId, m) : void 0;
			this.pendingLogs.push({
				timestamp: typeof m.absEpoch === "number" ? Math.round(m.absEpoch) : now,
				level: "info",
				message: "startup.mark",
				...traceId && spanId ? {
					traceId,
					spanId
				} : {},
				attributes: {
					...buildTraceTags(traceId, spanId),
					mark_id: m.id,
					mark_key: m.key,
					phase: m.phase,
					proc: m.proc,
					startup_type: summary.startupType,
					flow_type: summary.flowType,
					...offsetMs !== void 0 ? {
						abs_epoch: offsetMs,
						offset_ms: offsetMs
					} : {},
					...typeof m.absEpoch === "number" ? { absolute_epoch_ms: Math.round(m.absEpoch) } : {},
					...m.id === "E14" && offsetMs !== void 0 ? {
						first_interactive_ms: offsetMs,
						is_first_interactive: true
					} : {}
				}
			});
		}
		this.onStartupPerfRecorded?.();
	}
};
//#endregion
//#region src/main/features/monitor/aegis-config.ts
/**
* 网络状态上报间隔常量已移除（issue #99946）。
*
* Aegis SDK 的 NETWORK 插件用 `eval Worker + setInterval` 每 5 分钟 spawn
* `cmd.exe /c ipconfig` 三进程链探测网络类型（挂机一天 864 次进程创建），
* 且 `netText.includes('以太网')` locale 硬编码导致非简中 Windows 的
* netType 全部误报。netType 一个遥测字段不值得这个开销。
*
* 修复：所有 product patch 不再配置 networkIntervalMin，AegisExporter 的
* opt-in 门禁（typeof networkIntervalMin === 'number'）使 network plugin
* 默认关闭，worker 不再 spawn。SDK 侧的根本修复（os.networkInterfaces()
* 替代 + locale 无关判定）另行跟进。
*/
/** Aegis SDK 上报请求超时（毫秒）：默认 1s（默认 200ms 在弱网下经常误判） */
var AEGIS_REPORT_TIMEOUT_MS = 1e3;
//#endregion
//#region src/main/features/monitor/exporters/aegis-exporter.ts
function pickDefinedExt(ext) {
	if (!ext) return {};
	const out = {};
	for (const key of Object.keys(ext)) {
		const value = ext[key];
		if (value !== void 0) out[key] = value;
	}
	return out;
}
var AEGIS_EXT_MAX_LEN = 1024;
/**
* Sanity-log 前缀白名单：匹配的 metric name 会在 reportEvent / reportTime 成功后
* 打 info 日志（除失败 warn 之外）。
*
* 目的：为**低频高价值**上报提供"数据的确经过 SDK 送出"的证据链，供以下场景使用：
*   - 首次冷启动后到 `~/Library/Logs/CodeBuddy/main.log`（macOS）/ 对应 Windows
*     位置 grep `[AegisExporter] sent`，验证上报未被静默丢弃
*   - CI e2e（打包 app 冷启动）把日志作为 artifact 上传，反查伽利略捞不到数据时
*     的丢失点在客户端还是平台侧
*
* 不放全量白名单是因为热路径 metric（如 wb.api.duration 每次 HTTP 都上报）成功
* 日志会污染 main.log 日志量。仅低频事件值得打点。
*
* 新增前缀标准：调用频率 < 每分钟 5 次 + 单次上报有 sanity/审计价值。
*/
var AEGIS_SANITY_LOG_PREFIXES = [
	"startup.",
	"main_process_",
	"wb.desktop.crash.",
	"wb.startup.",
	"workbuddy.perf."
];
function shouldSanityLog(name) {
	for (const prefix of AEGIS_SANITY_LOG_PREFIXES) if (name.startsWith(prefix)) return true;
	return false;
}
/**
* Pre-bootstrap buffer 容量上限。
*
* Aegis bootstrap() 在 monitorService.start() 中触发，而 start() 被推迟到
* daemon→main metric bridge 装配之后才调用（见 main-bootstrap.ts L692）。
* 中间窗口内（domain 注册的生命周期 metric / migration collector 等）
* 任何 reportEvent/reportTime/reportError/info 都会因 aegisInstance===null
* 而被静默丢弃。
*
* 这里把调用先暂存到内存 FIFO 队列，bootstrap 完成时 flush 一次：
*   - 200 条足够覆盖启动期所有业务 metric（实际观测 < 30 条）
*   - 超出 cap 时丢最旧（保留近期），避免泄漏内存
*   - 仅在 SDK 未就绪时累积；就绪后即直接 SDK 调用，不再入队
*/
var AEGIS_PENDING_BUFFER_CAP = 200;
function truncateJson(value, maxLen) {
	let json;
	try {
		json = JSON.stringify(value);
	} catch {
		return "";
	}
	if (!json) return "";
	return json.length <= maxLen ? json : `${json.slice(0, maxLen - 1)}…`;
}
var AegisExporter = class extends AbstractExporter {
	aegisInstance = null;
	bootstrapOptions;
	initPromise = null;
	/**
	* Renderer 推过来的 sessionId 暂存。
	*
	* 时序：renderer 的 Aegis 初始化结束后会把 sessionId IPC 给主进程，但此时主进程
	* Aegis 实例不一定就绪（initialize 异步、用户登录前可能未触发 bootstrap）。
	* 这里先暂存，onInitialize 完成后立即 apply 一次；后续如 renderer 重建 session
	* 再次 IPC 也会覆盖此字段并重新 apply。
	*/
	pendingRendererSessionId;
	/**
	* SDK 未就绪时的事件 FIFO 队列。bootstrap 完成时由 flushPendingCalls() 一次性 replay。
	* cap=AEGIS_PENDING_BUFFER_CAP，超出按先进先出丢弃最旧条目。
	*/
	pendingCalls = [];
	constructor() {
		super("AegisExporter", true);
	}
	/**
	* Aegis 通道初始化入口（与 base.initialize 不同，需传 options）。
	* - 重复调用幂等；并发调用合并到同一 promise
	* - 失败容忍：内部 try/catch，不抛错、不影响主进程启动
	*/
	async bootstrap(options) {
		if (this.connected) return;
		if (this.initPromise) return this.initPromise;
		if (options?.disabled) {
			require_log_acl_guard.mainLog.info("[AegisExporter] disabled by options, skipping");
			return;
		}
		if (!electron.app.isReady()) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] app not ready yet, skipping initialize");
			return;
		}
		if (options) this.bootstrapOptions = options;
		this.initPromise = this.initialize().catch((error) => {
			require_log_acl_guard.mainLog.warn("[AegisExporter] bootstrap failed (degraded to noop):", error);
		}).finally(() => {
			this.initPromise = null;
		});
		return this.initPromise;
	}
	async onInitialize() {
		const AegisCtor = await this.loadSdk();
		if (!AegisCtor) throw new Error("Aegis SDK not loaded");
		const options = this.bootstrapOptions;
		if (!options?.projectId || !options.reportUrl) throw new Error("Aegis projectId and reportUrl are required");
		const version = options.version ?? electron.app.getVersion();
		const environment = options.environment ?? (process.env.NODE_ENV === "development" ? "development" : "production");
		const processPerformanceEnabled = typeof options.processPerformanceIntervalMin === "number";
		const networkEnabled = typeof options.networkIntervalMin === "number";
		const processPerformanceIntervalMin = options.processPerformanceIntervalMin ?? 5;
		this.aegisInstance = new AegisCtor({
			id: options.projectId,
			version,
			uin: options.userId,
			uid: options.userId,
			hostUrl: options.reportUrl,
			compress: true,
			extField: {
				wb_process: "main",
				wb_version: version,
				appVersion: version,
				wb_env: environment,
				...options.patchName ? { wb_patch_name: options.patchName } : {}
			},
			env: environment,
			processPerformanceInterval: processPerformanceIntervalMin,
			networkInterval: options.networkIntervalMin,
			requestTimeout: AEGIS_REPORT_TIMEOUT_MS,
			plugin: {
				error: true,
				pv: true,
				processPerformance: processPerformanceEnabled,
				network: networkEnabled,
				crash: true,
				device: true,
				session: true
			}
		});
		require_log_acl_guard.mainLog.info("[AegisExporter] initialized", {
			appId: options.projectId,
			version,
			environment,
			hasUid: !!options.userId
		});
		try {
			this.aegisInstance?.reportEvent({
				name: "main_process_start",
				ext1: version,
				ext2: environment
			});
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] reportEvent main_process_start failed:", error);
		}
		if (this.pendingRendererSessionId) this.applySessionIdToInstance(this.pendingRendererSessionId);
		this.flushPendingCalls();
	}
	async onShutdown() {
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.destroy?.();
			require_log_acl_guard.mainLog.info("[AegisExporter] destroyed");
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] destroy failed:", error);
		} finally {
			this.aegisInstance = null;
		}
	}
	/**
	* AegisExporter 不消费 metrics 通道（SDK 已自动采集 Performance/Network/Crash/PV）。
	* 调用方应使用 reportEvent / reportTime / reportError 等事件式 API。
	*/
	async onExport(metrics) {
		if (metrics.length > 0) require_log_acl_guard.mainLog.warn("[AegisExporter] metrics export not supported, use reportEvent/reportTime/reportError instead", { droppedCount: metrics.length });
	}
	/**
	* 把 renderer 端 Aegis 的 sessionId 同步到主进程 Aegis 实例。
	*
	* 让 main / renderer 两个 SDK 实例在同一次会话里上报相同的 session.id，
	* 便于在伽利略后台按 session 维度聚合"同一次启动"的全部上报。
	*
	* 幂等：同一 sessionId 多次 apply 不会副作用；不同 sessionId 会覆盖前值。
	* 注意：electron-sdk 的 session 插件 onNewAegis 内部会先写一次自己生成的 ID，
	* 所以本方法必须晚于 SDK 实例化才生效；未就绪时会暂存到 onInitialize 末尾再 apply。
	*/
	applyRendererSessionId(sessionId) {
		if (!sessionId) return;
		this.pendingRendererSessionId = sessionId;
		if (!this.aegisInstance) return;
		this.applySessionIdToInstance(sessionId);
	}
	applySessionIdToInstance(sessionId) {
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.updateSnapshootInfo?.({ session: { id: sessionId } });
			require_log_acl_guard.mainLog.info("[AegisExporter] applyRendererSessionId", { sessionId });
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] applyRendererSessionId failed:", error);
		}
	}
	setUserId(userId) {
		if (this.bootstrapOptions) this.bootstrapOptions = {
			...this.bootstrapOptions,
			userId
		};
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.setConfig?.({ uid: userId });
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] setUserId failed:", error);
		}
	}
	reportEvent(name, ext) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "event",
				name,
				ext
			});
			if (shouldSanityLog(name)) require_log_acl_guard.mainLog.info(`[AegisExporter] queued event ${name} (pre-bootstrap, will flush after SDK ready)`);
			return;
		}
		try {
			this.aegisInstance.reportEvent({
				name,
				...pickDefinedExt(ext)
			});
			if (shouldSanityLog(name)) require_log_acl_guard.mainLog.info(`[AegisExporter] sent event ${name}${ext ? " ext=" + JSON.stringify(pickDefinedExt(ext)) : ""}`);
		} catch (error) {
			require_log_acl_guard.mainLog.warn(`[AegisExporter] reportEvent ${name} failed:`, error);
		}
	}
	reportTime(name, duration, ext) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "time",
				name,
				duration,
				ext
			});
			if (shouldSanityLog(name)) require_log_acl_guard.mainLog.info(`[AegisExporter] queued time ${name}=${duration}ms (pre-bootstrap, will flush after SDK ready)`);
			return;
		}
		try {
			this.aegisInstance.reportTime({
				name,
				duration,
				...pickDefinedExt(ext)
			});
			if (shouldSanityLog(name)) require_log_acl_guard.mainLog.info(`[AegisExporter] sent time ${name}=${duration}ms${ext ? " ext=" + JSON.stringify(pickDefinedExt(ext)) : ""}`);
		} catch (error) {
			require_log_acl_guard.mainLog.warn(`[AegisExporter] reportTime ${name} failed:`, error);
		}
	}
	reportError(err) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "error",
				err
			});
			return;
		}
		try {
			this.aegisInstance.error(err);
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] reportError failed:", error);
		}
	}
	info(msg) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "info",
				msg
			});
			return;
		}
		try {
			this.aegisInstance.info(msg);
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[AegisExporter] info failed:", error);
		}
	}
	/**
	* 把调用塞进 pre-bootstrap 队列（FIFO，超 cap 丢最旧）。
	*
	* 不在这里检查 disabled / aegisEnabled：bootstrap 中如果走 disabled 分支
	* 不会 flushPendingCalls，队列里的条目随 GC 释放即可。
	*/
	enqueuePending(call) {
		if (this.pendingCalls.length >= AEGIS_PENDING_BUFFER_CAP) this.pendingCalls.shift();
		this.pendingCalls.push(call);
	}
	/**
	* SDK 就绪后回放 pre-bootstrap 队列。
	*
	* 注意：必须在 aegisInstance 赋值之后调用，否则 reportEvent/reportTime
	* 内部会因 aegisInstance===null 再次入队，形成无限循环。
	*/
	flushPendingCalls() {
		if (this.pendingCalls.length === 0 || !this.aegisInstance) return;
		const drained = this.pendingCalls.splice(0, this.pendingCalls.length);
		const sanityCount = drained.reduce((n, c) => (c.kind === "event" || c.kind === "time") && shouldSanityLog(c.name) ? n + 1 : n, 0);
		require_log_acl_guard.mainLog.info(`[AegisExporter] flushing ${drained.length} pre-bootstrap calls${sanityCount > 0 ? ` (sanity=${sanityCount})` : ""}`);
		for (const call of drained) try {
			switch (call.kind) {
				case "event":
					this.aegisInstance.reportEvent({
						name: call.name,
						...pickDefinedExt(call.ext)
					});
					if (shouldSanityLog(call.name)) require_log_acl_guard.mainLog.info(`[AegisExporter] sent event ${call.name} (flushed)`);
					break;
				case "time":
					this.aegisInstance.reportTime({
						name: call.name,
						duration: call.duration,
						...pickDefinedExt(call.ext)
					});
					if (shouldSanityLog(call.name)) require_log_acl_guard.mainLog.info(`[AegisExporter] sent time ${call.name}=${call.duration}ms (flushed)`);
					break;
				case "error":
					this.aegisInstance.error(call.err);
					break;
				case "info": this.aegisInstance.info(call.msg);
			}
		} catch (error) {
			require_log_acl_guard.mainLog.warn(`[AegisExporter] flushPendingCalls ${call.kind} failed:`, error);
		}
	}
	/** 供单测验证 buffer 状态（不要在业务代码中使用）。 */
	getPendingCallsCountForTest() {
		return this.pendingCalls.length;
	}
	/** OTel LogRecord[] 翻译为 Aegis 事件并发送，与 GalileoExporter 双发。 */
	async exportLogs(records) {
		if (!this.aegisInstance || records.length === 0) return;
		for (const record of records) try {
			this.dispatchLogRecord(record);
		} catch (error) {
			require_log_acl_guard.mainLog.warn(`[AegisExporter] exportLogs item ${record.message} failed:`, error);
		}
	}
	dispatchLogRecord(record) {
		if (!this.aegisInstance) return;
		const attrs = record.attributes ?? {};
		const level = (record.level || "").toLowerCase();
		if (level === "error" || level === "fatal") {
			const payload = `${record.message} ${truncateJson(attrs, AEGIS_EXT_MAX_LEN)}`;
			this.aegisInstance.error(payload);
			return;
		}
		const traceFields = record.traceId && record.spanId ? {
			traceID: record.traceId,
			spanID: record.spanId,
			traceId: record.traceId,
			spanId: record.spanId,
			trace_id: record.traceId,
			span_id: record.spanId
		} : {};
		this.aegisInstance.reportEvent({
			name: record.message,
			ext1: String(attrs.status ?? attrs.event ?? ""),
			ext2: String(attrs.migration_type ?? attrs.type ?? ""),
			ext3: truncateJson(attrs, AEGIS_EXT_MAX_LEN),
			...traceFields,
			...attrs
		});
	}
	async loadSdk() {
		try {
			const sdkModule = await import("@tencent/aegis-electron-sdk-v2");
			const AegisCtor = sdkModule.default ?? sdkModule;
			if (typeof AegisCtor !== "function") {
				require_log_acl_guard.mainLog.warn("[AegisExporter] unexpected SDK shape", { keys: Object.keys(sdkModule) });
				return null;
			}
			return AegisCtor;
		} catch (error) {
			require_log_acl_guard.mainLog.error("[AegisExporter] load SDK failed:", error);
			return null;
		}
	}
};
//#endregion
//#region src/main/features/monitor/desktop-monitor-service.ts
/**
* 给 GalileoExporter 注入自定义 HTTPClient：通过 installUndiciProxyDispatcher() 走全局代理，
* 并打 [NetLog] 日志便于排查上报问题。
*/
function createDesktopGalileoHttpClient() {
	return { async post(url, data, config) {
		const controller = new AbortController();
		const timeout = config?.timeout || 3e4;
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const startedAt = Date.now();
		const proxyDesc = require_proxy_agents.describeProxyForLog(url);
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...config?.headers || {}
				},
				body: JSON.stringify(data),
				signal: controller.signal
			});
			const responseData = await response.json().catch(() => ({}));
			require_proxy_agents.logNetRequest({
				method: "POST",
				url,
				proxy: proxyDesc,
				status: response.status,
				durationMs: Date.now() - startedAt,
				source: "GalileoExporter"
			});
			return {
				status: response.status,
				statusText: response.statusText,
				data: responseData
			};
		} catch (error) {
			const normalized = (error instanceof Error ? error.name : void 0) === "AbortError" ? /* @__PURE__ */ new Error(`Request timeout after ${timeout}ms`) : error;
			require_proxy_agents.logNetRequest({
				method: "POST",
				url,
				proxy: proxyDesc,
				durationMs: Date.now() - startedAt,
				error: normalized,
				source: "GalileoExporter"
			});
			throw normalized;
		} finally {
			clearTimeout(timeoutId);
		}
	} };
}
/**
* GalileoExporter 的日志适配器：info / debug 刻意静音（exporter 每次入队、flush、
* 健康检查都会打 info，注入完整 logger 会按采样频率刷 main.log），只透出
* warn / error —— 即时上报（reportOtelLog / recordMetric）此前失败完全无声，
* 伽利略「查不到数据」时无法区分「没发出去」与「查询姿势不对」。
*/
function createGalileoExporterLogger() {
	return {
		info: () => void 0,
		debug: () => void 0,
		warn: (message, context) => require_log_acl_guard.mainLog.warn(`[GalileoExporter]${context ? ` [${context}]` : ""}`, message instanceof Error ? message.message : message),
		error: (message, context) => require_log_acl_guard.mainLog.error(`[GalileoExporter]${context ? ` [${context}]` : ""}`, message instanceof Error ? message.message : message)
	};
}
function isStartupTelemetryLog(_log) {
	return false;
}
var sharedInstance;
var DesktopMonitorService = class {
	galileoExporter;
	aegisExporter = new AegisExporter();
	galileoConfig = { enabled: false };
	resolvedGalileo = require_code_cache.resolveGalileoConfig(void 0, { platform: "ElectronApp" });
	reconfigureQueue = Promise.resolve();
	requestedGeneration = 0;
	getUserId;
	appVersion;
	migrationCollector;
	cliHealthCollector;
	chatPerfCollector;
	historyLoadCollector;
	marketPageLoadCollector;
	startupPerfCollector;
	collectors;
	/** loadSession 到达主进程的时间戳暂存。key 优先用 renderer 的 requestId，兼容旧调用退回 sessionId。 */
	mainLoadTimestamps = /* @__PURE__ */ new Map();
	enabled;
	aegisEnabled = false;
	patchName;
	collectTimer;
	started = false;
	collectInterval;
	processPerformanceIntervalMin;
	networkIntervalMin;
	constructor(config) {
		this.enabled = config?.enabled ?? true;
		this.collectInterval = config?.collectInterval ?? 6e4;
		this.getUserId = config?.getUserId;
		this.appVersion = config?.appVersion ?? electron.app.getVersion();
		this.applyGalileoConfig(config?.galileo ?? {
			enable: config?.enabled,
			endpoint: config?.galileoEndpoint,
			app: config?.app,
			server: config?.server,
			patchName: config?.patchName,
			processPerformanceIntervalMin: config?.processPerformanceIntervalMin,
			networkIntervalMin: config?.networkIntervalMin
		});
		this.migrationCollector = new MigrationCollector();
		this.cliHealthCollector = new CliHealthCollector();
		this.chatPerfCollector = new ChatPerformanceCollector();
		this.historyLoadCollector = new HistoryLoadCollector();
		this.marketPageLoadCollector = new MarketPageLoadCollector();
		this.startupPerfCollector = new StartupPerfCollector();
		this.chatPerfCollector.onMessageDisplayRecorded = () => {
			this.flushNow().catch((err) => {
				require_log_acl_guard.mainLog.warn("[DesktopMonitor] flushNow on display recorded failed:", err);
			});
		};
		this.startupPerfCollector.onStartupPerfRecorded = () => {
			this.flushNow().catch((err) => {
				require_log_acl_guard.mainLog.warn("[DesktopMonitor] flushNow on startup perf recorded failed:", err);
			});
		};
		this.marketPageLoadCollector.onRecorded = () => {
			this.flushNow().catch((err) => {
				require_log_acl_guard.mainLog.warn("[DesktopMonitor] flushNow on market page load failed:", err);
			});
		};
		this.collectors = [
			this.migrationCollector,
			this.cliHealthCollector,
			this.chatPerfCollector,
			this.historyLoadCollector,
			this.startupPerfCollector,
			this.marketPageLoadCollector
		];
	}
	reconfigureGalileo(config) {
		const next = require_code_cache.resolveGalileoConfig(config, { platform: "ElectronApp" });
		const generation = ++this.requestedGeneration;
		this.reconfigureQueue = this.reconfigureQueue.then(async () => {
			if (generation !== this.requestedGeneration) return;
			if (next.fingerprint === this.resolvedGalileo.fingerprint) return;
			if (this.started) {
				this.aegisEnabled = false;
				await this.collectAndExportLogs().catch(() => void 0);
				await this.shutdownGalileoExporters();
			}
			if (generation !== this.requestedGeneration) return;
			this.applyGalileoConfig(config);
			if (this.started) await this.startGalileoExporters();
		});
		return this.reconfigureQueue;
	}
	applyGalileoConfig(config) {
		this.resolvedGalileo = require_code_cache.resolveGalileoConfig(config, { platform: "ElectronApp" });
		this.patchName = config?.patchName;
		this.processPerformanceIntervalMin = config?.processPerformanceIntervalMin;
		this.networkIntervalMin = config?.networkIntervalMin;
		this.aegisEnabled = this.resolvedGalileo.canExportAegis;
		if (!this.resolvedGalileo.canExportOtlp) {
			this.galileoExporter = void 0;
			this.galileoConfig = {
				enabled: false,
				userId: this.getUserId?.()
			};
			if (this.resolvedGalileo.enabled) require_log_acl_guard.mainLog.warn(`[DesktopMonitor] Invalid Galileo config: ${this.resolvedGalileo.issues.join(",")}`);
			return;
		}
		this.galileoConfig = {
			enabled: true,
			endpoint: this.resolvedGalileo.endpoint,
			batchSize: 50,
			flushInterval: 3e4,
			timeout: 1e4,
			userId: this.getUserId?.(),
			useOtelJsonLogFields: true,
			resource: {
				target: this.resolvedGalileo.target,
				envName: electron.app.isPackaged ? "formal" : "test",
				namespace: process.env.NODE_ENV === "development" ? "Development" : "Production",
				instance: `desktop-${Date.now()}`,
				version: this.appVersion,
				ideType: "workbuddy-desktop",
				ideVersion: this.appVersion,
				os: `${process.platform}-${process.arch}`,
				ext1: "desktop"
			}
		};
		this.galileoExporter = new GalileoExporter(this.galileoConfig, void 0, createDesktopGalileoHttpClient(), createGalileoExporterLogger());
	}
	async startGalileoExporters() {
		if (this.aegisEnabled) await this.aegisExporter.bootstrap({
			projectId: this.resolvedGalileo.projectId,
			reportUrl: this.resolvedGalileo.collectUrl,
			version: this.appVersion,
			userId: this.getUserId?.(),
			patchName: this.patchName,
			processPerformanceIntervalMin: this.processPerformanceIntervalMin,
			networkIntervalMin: this.networkIntervalMin
		});
		await this.galileoExporter?.initialize();
	}
	async shutdownGalileoExporters() {
		const galileoExporter = this.galileoExporter;
		const aegisExporter = this.aegisExporter;
		this.galileoExporter = void 0;
		this.aegisExporter = new AegisExporter();
		await Promise.allSettled([galileoExporter?.shutdown(), aegisExporter.shutdown()]);
	}
	async start() {
		if (this.started || !this.enabled) return;
		this.startGalileoExporters().catch((error) => {
			require_log_acl_guard.mainLog.error("[DesktopMonitor] Exporter init failed (non-fatal):", error instanceof Error ? error.message : String(error));
		});
		for (const collector of this.collectors) try {
			await collector.start();
		} catch (error) {
			require_log_acl_guard.mainLog.error(`[DesktopMonitor] Collector ${collector.name} start failed:`, error instanceof Error ? error.message : String(error));
		}
		this.collectTimer = setInterval(() => {
			this.collectAndExportLogs().catch((err) => {
				require_log_acl_guard.mainLog.error("[DesktopMonitor] Collect/export error:", err instanceof Error ? err.message : String(err));
			});
		}, this.collectInterval);
		this.started = true;
		require_log_acl_guard.mainLog.info("[DesktopMonitor] Started");
		cleanStalePendingTelemetry();
	}
	async stop() {
		if (!this.started) return;
		if (this.collectTimer) {
			clearInterval(this.collectTimer);
			this.collectTimer = void 0;
		}
		try {
			await this.collectAndExportLogs();
			for (const collector of this.collectors) await collector.stop();
		} catch (error) {
			require_log_acl_guard.mainLog.error("[DesktopMonitor] Error during stop:", error instanceof Error ? error.message : String(error));
		}
		await this.shutdownGalileoExporters();
		this.started = false;
		require_log_acl_guard.mainLog.info("[DesktopMonitor] Stopped");
	}
	getMigrationCollector() {
		return this.migrationCollector;
	}
	getCliHealthCollector() {
		return this.cliHealthCollector;
	}
	getChatPerfCollector() {
		return this.chatPerfCollector;
	}
	getHistoryLoadCollector() {
		return this.historyLoadCollector;
	}
	getMarketPageLoadCollector() {
		return this.marketPageLoadCollector;
	}
	getStartupPerfCollector() {
		return this.startupPerfCollector;
	}
	recordMarketPageLoad(data) {
		if (!this.marketPageLoadCollector.recordMarketPageLoad(data)) return;
		this.recordDuration("workbuddy.market.page_load", data.total_ms, {
			ext1: data.tab,
			ext2: String(data.success),
			ext3: String(data.cache_hit)
		});
	}
	/**
	* 上报日志到伽利略 OTel /v1/logs。
	*
	* 默认只走 Galileo（CrashLogExporter、fs-protection、pending-telemetry 修复）。
	* 安装/更新耗时需要伽利略 UI 的 Aegis `tags.name` 看板时，显式传 `{ aegis: true }`。
	*/
	async exportCrashLogs(logs, options) {
		await this.exportLogsToGalileoAndAegis(logs, options);
	}
	/**
	* 轻量即时上报一条业务日志到伽利略 OTel /v1/logs。
	*
	* 只走 Galileo，不双发 Aegis `/collect`。威胁库 `sandbox.threat_database.*` 与
	* agent-cli `sandbox.*` 必须落在同一存储（见 threat-database-galileo.ts）；
	* daemon give-up 同样走这条 Galileo-only 通道。单列此方法是为了避免
	* exportCrashLogs 的历史命名误导调用方以为在做原生崩溃上报。
	* 上报失败不抛出，避免干扰业务主流程；失败必须打日志，否则调用方
	* （如 perf-metrics 采样回调）best-effort catch 后「伽利略查不到」无从归因。
	*/
	async reportOtelLog(record) {
		try {
			await this.exportLogsToGalileoAndAegis([record]);
		} catch (error) {
			const message = record.message;
			require_log_acl_guard.mainLog.warn("[DesktopMonitor] OTel log export failed:", typeof message === "string" ? message : "(unknown record)", error instanceof Error ? error.message : String(error));
		}
	}
	/**
	* 即时通道：默认只推 OTel /v1/logs。`options.aegis` 时再双发 Aegis reportEvent
	* （tags.name = message）。Galileo 失败向上抛，让安装/更新 pending 文件可以重试；
	* Aegis 失败只打日志。
	*/
	async exportLogsToGalileoAndAegis(logs, options) {
		const records = this.attachPatchName(logs);
		const galileo = this.galileoExporter && typeof this.galileoExporter.exportLogs === "function" ? this.galileoExporter.exportLogs(records) : Promise.resolve();
		const aegis = options?.aegis && this.aegisEnabled ? this.aegisExporter.exportLogs(records) : Promise.resolve();
		const [galileoResult, aegisResult] = await Promise.allSettled([galileo, aegis]);
		if (aegisResult.status === "rejected") {
			const err = aegisResult.reason;
			require_log_acl_guard.mainLog.warn("[DesktopMonitor] Aegis exportLogs failed:", err instanceof Error ? err.message : String(err));
		}
		if (galileoResult.status === "rejected") throw galileoResult.reason;
	}
	/**
	* collector 周期 flush 会把 patchName 写进 tags；exportCrashLogs / reportOtelLog
	* 是即时通道，这里对齐同一字段，否则安装/更新明细在伽利略里缺产品 patch 维度。
	*/
	attachPatchName(logs) {
		if (!this.patchName) return logs;
		return logs.map((log) => ({
			...log,
			attributes: {
				...log.attributes ?? {},
				patchName: this.patchName
			}
		}));
	}
	/** galileo exporter 是否已连接就绪，供 repair flush 等需要感知 ready 状态的调用方使用 */
	isGalileoConnected() {
		return !!this.galileoExporter?.isConnected();
	}
	/**
	* 上报 trace spans 到伽利略（POST /v1/traces）。
	* 复用 GalileoExporter 通道，避免在 main 进程另接 galileo-node-sdk。
	*/
	async exportTraces(spans) {
		if (this.galileoExporter && typeof this.galileoExporter.exportTraces === "function") await this.galileoExporter.exportTraces(spans);
	}
	/** 当前伽利略上报 target（= galileoConfig.resource.target），供手动打 span 时填充 attribute */
	getGalileoTarget() {
		return this.resolvedGalileo.target ?? "";
	}
	/** 当前 WorkBuddy 版本，供启动测速等上报维度使用。 */
	getAppVersion() {
		return this.appVersion;
	}
	/** 把 wb.metrics.record 的数值指标交给现有 GalileoExporter 批量队列。 */
	async recordMetric(metric) {
		if (!this.enabled || !this.galileoExporter) return;
		const item = {
			name: metric.name,
			value: metric.value,
			type: metric.kind === "counter" ? MetricType.Counter : MetricType.Histogram,
			timestamp: Date.now(),
			labels: { ...metric.labels },
			metadata: {
				source: "wb.metrics",
				collector: "wb.metrics",
				version: "1"
			}
		};
		try {
			await this.galileoExporter.export([item]);
		} catch (error) {
			require_log_acl_guard.mainLog.warn("[DesktopMonitor] Metric export failed:", metric.name, error instanceof Error ? error.message : String(error));
		}
	}
	/** 记录时延样本（duration ms）。维度 value 必须 string，调用方自行 String() 转换。 */
	recordDuration(metric, durationMs, dimensions) {
		if (!this.enabled || !this.aegisEnabled) return;
		this.aegisExporter.reportTime(metric, durationMs, this.normalizeDimensions(dimensions));
	}
	/** Counter 增量上报。count <= 0 直接忽略（OTel 规范：Counter 必须单调递增）。 */
	addCounter(metric, count, dimensions) {
		if (!this.enabled || !this.aegisEnabled || count <= 0) return;
		this.aegisExporter.reportEvent(metric, {
			...this.normalizeDimensions(dimensions),
			count
		});
	}
	/** 维度归一化：number/boolean/null/undefined → string 或丢空，避免 SDK 序列化静默丢字段。 */
	normalizeDimensions(dimensions) {
		const out = {};
		if (dimensions) for (const [k, v] of Object.entries(dimensions)) {
			if (v == null) continue;
			out[k] = typeof v === "string" ? v : String(v);
		}
		return out;
	}
	recordMainLoadTime(key) {
		this.mainLoadTimestamps.set(key, Date.now());
	}
	getAndClearMainLoadTime(key) {
		const t = this.mainLoadTimestamps.get(key);
		if (t) this.mainLoadTimestamps.delete(key);
		return t;
	}
	/** 立即采集并导出（用于 crash 等紧急场景，避免日志丢失） */
	async flushNow() {
		if (!this.started) return;
		await this.collectAndExportLogs();
	}
	async collectAndExportLogs() {
		if (this.getUserId) {
			const uid = this.getUserId();
			if (uid) {
				this.galileoConfig.userId = uid;
				this.aegisExporter.setUserId(uid);
			}
		}
		const allLogs = [];
		for (const collector of this.collectors) {
			if (!collector.isRunning()) continue;
			try {
				const logs = await collector.collectLogs();
				allLogs.push(...logs);
			} catch (error) {
				require_log_acl_guard.mainLog.error(`[DesktopMonitor] Collector ${collector.name} log collection error:`, error instanceof Error ? error.message : String(error));
			}
		}
		if (allLogs.length > 0) {
			if (this.patchName) for (const log of allLogs) {
				if (!log.attributes) log.attributes = {};
				log.attributes.patchName = this.patchName;
			}
			const aegisLogs = allLogs.filter((log) => !isStartupTelemetryLog(log));
			const [galileoResult, aegisResult] = await Promise.allSettled([this.galileoExporter?.exportLogs(allLogs) ?? Promise.resolve(), this.aegisEnabled && aegisLogs.length > 0 ? this.aegisExporter.exportLogs(aegisLogs) : Promise.resolve()]);
			if (galileoResult.status === "fulfilled") require_log_acl_guard.mainLog.info(`[DesktopMonitor] Exported ${allLogs.length} logs to Galileo`);
			else {
				const err = galileoResult.reason;
				require_log_acl_guard.mainLog.error(`[DesktopMonitor] Galileo export failed (${allLogs.length} logs):`, err instanceof Error ? err.message : String(err));
			}
			if (aegisResult.status === "rejected") {
				const err = aegisResult.reason;
				require_log_acl_guard.mainLog.warn(`[DesktopMonitor] Aegis export failed (${allLogs.length} logs):`, err instanceof Error ? err.message : String(err));
			}
		}
	}
	static setSharedInstance(instance) {
		sharedInstance = instance;
	}
	static getSharedInstance() {
		return sharedInstance;
	}
	/**
	* 同步用户 ID 到两条上报通道。
	* collectAndExportLogs() 每次会用 getUserId() 重新覆盖 galileoConfig.userId，
	* 所以这里主要服务于"未配置 getUserId、但手动调用 setUserId"的场景。
	*/
	setUserId(userId) {
		if (this.aegisEnabled) this.aegisExporter.setUserId(userId);
		this.galileoConfig.userId = userId;
	}
	reportAegisEvent(name, ext) {
		if (this.aegisEnabled) this.aegisExporter.reportEvent(name, ext);
	}
	/**
	* `WorkbuddyMonitorService.reportEvent` 的实现（与 recordDuration / addCounter 同属
	* RuntimeReporter 接口面）。
	*
	* ⚠️ 必须存在：monitor handler 走的是 `monitor?.reportEvent?.(...)`，只认这个名字。
	* fork 模式下 daemon 侧是 `remoteMonitorService.reportEvent` 桥回 main，最终仍落到
	* `reportAegisEvent`；但 in-process（evalMode / 单进程）路径拿到的是本单例，缺这个
	* 方法会让所有 `kind: 'event'` 上报静默丢弃（可选链直接短路，连报错都没有）。
	*/
	reportEvent(name, ext) {
		this.reportAegisEvent(name, ext);
	}
	/**
	* `WorkbuddyMonitorService.reportLog` 的实现：写一条伽利略 OTel 日志。
	*
	* 与 `reportEvent` 分别落两张表——event 进 Aegis `/collect` 自定义事件表（只能按
	* ext1~ext10 聚合，用于成功率看盘），log 进 Galileo `/v1/logs` 日志表（attributes
	* 不限字段 + 全文检索，用于精确排障）。
	*/
	reportLog(name, level, attributes) {
		this.reportOtelLog({
			timestamp: Date.now(),
			level,
			message: name,
			attributes
		}).catch(() => {});
	}
	reportAegisTime(name, durationMs, ext) {
		if (this.aegisEnabled) this.aegisExporter.reportTime(name, durationMs, ext);
	}
	reportAegisError(err) {
		if (this.aegisEnabled) this.aegisExporter.reportError(err);
	}
	isAegisInitialized() {
		return this.aegisExporter.isConnected();
	}
	/**
	* 把 renderer 端 Aegis 的 sessionId 同步给主进程 Aegis 实例，
	* 让两端在同一个 Galileo session 维度聚合（IPC: monitor:syncRendererSessionId）。
	*/
	applyRendererSessionId(sessionId) {
		if (!this.enabled || !this.aegisEnabled) return;
		this.aegisExporter.applyRendererSessionId(sessionId);
	}
};
//#endregion
Object.defineProperty(exports, "DesktopMonitorService", {
	enumerable: true,
	get: function() {
		return DesktopMonitorService;
	}
});
Object.defineProperty(exports, "configureElectronApp", {
	enumerable: true,
	get: function() {
		return configureElectronApp;
	}
});
Object.defineProperty(exports, "createStartupTraceId", {
	enumerable: true,
	get: function() {
		return createStartupTraceId;
	}
});
Object.defineProperty(exports, "exportStartupMetric", {
	enumerable: true,
	get: function() {
		return exportStartupMetric;
	}
});
Object.defineProperty(exports, "exportStartupTrace", {
	enumerable: true,
	get: function() {
		return exportStartupTrace;
	}
});
Object.defineProperty(exports, "init_app_instance", {
	enumerable: true,
	get: function() {
		return init_app_instance;
	}
});
Object.defineProperty(exports, "removeLegacyProtocolRegistrations", {
	enumerable: true,
	get: function() {
		return removeLegacyProtocolRegistrations;
	}
});
