const require_zip_parser = require("./zip-parser.js");
//#region ../../packages/workbuddy-server/src/wechat-chat-history/service.ts
var DEFAULT_ENSURE_TIMEOUT_MS = 6e4;
var COMPLETED_TASK_TTL_MS = 18e5;
var extractionTasks = /* @__PURE__ */ new Map();
function taskSnapshot(task) {
	if (task.result) return task.result;
	if (task.status === "ready") return {
		chipId: task.chipId,
		status: "failed",
		error: "missing ready result"
	};
	return {
		chipId: task.chipId,
		status: task.status,
		error: task.error
	};
}
/**
* 把同一次解析的产物摊平成解压结果：元信息和正文都来自这一遍读包，调用方不必再解析。
*/
function toExtractionResult(task, parsed) {
	const base = {
		chipId: task.chipId,
		fileSize: parsed.fileSize,
		source: parsed.source
	};
	if (!parsed.valid) return {
		...base,
		status: "failed",
		error: parsed.reason,
		parseReason: parsed.reason
	};
	if (!parsed.extractedDirPath) return {
		...base,
		status: "failed",
		error: "missing-extracted-dir"
	};
	return {
		...base,
		status: "ready",
		extractedDirPath: parsed.extractedDirPath,
		mediaFiles: parsed.metadata.mediaFiles,
		metadata: parsed.metadata,
		chatHistoryText: parsed.chatHistoryText,
		truncated: parsed.truncated
	};
}
function completeTask(task, result) {
	task.status = result.status;
	task.error = result.status === "ready" ? void 0 : result.error;
	task.result = result;
	scheduleCompletedTaskCleanup(task);
	return result;
}
function scheduleCompletedTaskCleanup(task) {
	if (task.cleanupTimer) clearTimeout(task.cleanupTimer);
	const timer = setTimeout(() => {
		if (extractionTasks.get(task.chipId) === task) extractionTasks.delete(task.chipId);
	}, COMPLETED_TASK_TTL_MS);
	if (typeof timer.unref === "function") timer.unref();
	task.cleanupTimer = timer;
}
function createWorkbuddyWechatChatHistoryService(deps = {}) {
	const logger = deps.logger;
	const getOrCreateTask = (params) => {
		const existing = extractionTasks.get(params.chipId);
		if (existing) return existing;
		const task = {
			chipId: params.chipId,
			filePath: params.filePath,
			extractionRootDir: params.extractionRootDir,
			source: params.source,
			maxChatHistoryChars: params.maxChatHistoryChars,
			status: "pending"
		};
		extractionTasks.set(params.chipId, task);
		return task;
	};
	const runExtraction = (task) => {
		if (task.promise) return task.promise;
		task.status = "extracting";
		logger?.info?.("[WechatChatHistory] extraction started", {
			chipId: task.chipId,
			filePath: task.filePath
		});
		task.promise = new Promise((resolve) => {
			setImmediate(() => {
				try {
					const result = completeTask(task, toExtractionResult(task, require_zip_parser.extractChatRecordZip({
						filePath: task.filePath,
						extractionRootDir: task.extractionRootDir,
						source: task.source,
						maxChatHistoryChars: task.maxChatHistoryChars
					})));
					if (result.status === "ready") logger?.info?.("[WechatChatHistory] extraction completed", {
						chipId: task.chipId,
						extractedDirPath: result.extractedDirPath,
						mediaCount: result.mediaFiles.length,
						messageCount: result.metadata?.messageCount,
						source: result.source
					});
					else logger?.warn?.("[WechatChatHistory] extraction failed", {
						chipId: task.chipId,
						error: result.error
					});
					resolve(result);
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					logger?.error?.("[WechatChatHistory] extraction threw unexpectedly", error);
					resolve(completeTask(task, {
						chipId: task.chipId,
						status: "failed",
						error: message
					}));
				}
			});
		});
		return task.promise;
	};
	return {
		async parseZipMetadata(params) {
			try {
				const result = require_zip_parser.parseChatRecordZipMetadataOnly({
					filePath: params.filePath,
					maxChatHistoryChars: params.maxChatHistoryChars,
					extractionRootDir: params.extractionRootDir,
					source: params.source
				});
				if (!result.valid) logger?.info?.("[WechatChatHistory] parseZipMetadata rejected", {
					filePath: params.filePath,
					reason: result.reason
				});
				else logger?.info?.("[WechatChatHistory] parseZipMetadata ok", {
					filePath: params.filePath,
					messageCount: result.metadata?.messageCount,
					mediaCount: result.metadata?.mediaFiles.length,
					extractionStatus: result.extractionStatus,
					truncated: result.truncated
				});
				return result;
			} catch (error) {
				logger?.error?.("[WechatChatHistory] parseZipMetadata threw unexpectedly", error);
				return {
					valid: false,
					fileName: params.filePath.split("/").pop() ?? params.filePath,
					fileSize: 0,
					source: params.source ?? "wechat",
					metadata: {
						messageCount: 0,
						mediaFiles: []
					},
					extractionStatus: "failed",
					reason: "corrupted"
				};
			}
		},
		async startExtraction(params) {
			const task = getOrCreateTask(params);
			if (task.status === "ready" || task.status === "failed") return taskSnapshot(task);
			runExtraction(task).catch(() => void 0);
			return taskSnapshot(task);
		},
		async getExtractionStatus(params) {
			const task = extractionTasks.get(params.chipId);
			if (!task) return {
				chipId: params.chipId,
				status: "pending"
			};
			return taskSnapshot(task);
		},
		async ensureExtracted(params) {
			const task = getOrCreateTask(params);
			if (task.status === "ready" || task.status === "failed") return taskSnapshot(task);
			const extraction = runExtraction(task);
			const timeoutMs = params.timeoutMs ?? DEFAULT_ENSURE_TIMEOUT_MS;
			let timeout;
			const timeoutResult = new Promise((resolve) => {
				timeout = setTimeout(() => {
					logger?.warn?.("[WechatChatHistory] ensure extraction timeout", {
						chipId: params.chipId,
						timeoutMs
					});
					resolve({
						chipId: params.chipId,
						status: "extracting"
					});
				}, timeoutMs);
			});
			const result = await Promise.race([extraction, timeoutResult]);
			if (timeout) clearTimeout(timeout);
			return result;
		}
	};
}
//#endregion
Object.defineProperty(exports, "createWorkbuddyWechatChatHistoryService", {
	enumerable: true,
	get: function() {
		return createWorkbuddyWechatChatHistoryService;
	}
});
