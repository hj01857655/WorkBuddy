const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_handler_registry = require("./handler-registry.js");
const require_contract = require("./contract2.js");
const require_traceparent = require("./traceparent.js");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_os = require("node:os");
node_os = require_rolldown_runtime.__toESM(node_os);
let node_buffer = require("node:buffer");
//#region ../../packages/workbuddy-server/src/applications/contract.ts
/**
* `applications:` 组的契约 —— 应用空间自己的 RPC。
*
* 三条 builtin MCP 通道从 `connector:` 搬过来，判据是**主语**：`installBuiltinMcp` 说的是
* 「这个 Buddy 应用要装它依赖的能力」，主语是应用，MCP 只是那个能力今天的形态。放进
* `mcp:` 会让那一组重新变成「什么都往里塞」—— 它管的是「这台 MCP 本身」，不是「谁依赖它」。
*/
var APPLICATIONS_RPC_CHANNELS = {
	INSTALL_BUILTIN_MCP: "applications:installBuiltinMcp",
	PREPARE_BUILTIN_MCP_AUTHORIZE_URL: "applications:prepareBuiltinMcpAuthorizeUrl",
	DISCONNECT_BUILTIN_MCP: "applications:disconnectBuiltinMcp"
};
//#endregion
//#region ../../packages/workbuddy-server/src/migration/handlers.ts
require_code_cache.init_esm$6();
var ARCHIVED_SYNC_STATUS_UPDATE_CHANNEL = "archivedSyncStatusUpdate";
var MIGRATION_REPLAY_ARCHIVED_CHANNEL = "migration:replayArchived";
function registerMigrationHandlers(registry, deps) {
	registry.handle(require_handler_registry.MIGRATION_RPC_CHANNELS.GET_HISTORY_STATUS, async () => deps.getHistoryStatus());
	registry.handle(require_handler_registry.MIGRATION_RPC_CHANNELS.GET_PENDING_LOCAL_STORAGE_MIGRATION, async () => deps.getPendingLocalStorageMigration?.());
	registry.handle(require_handler_registry.MIGRATION_RPC_CHANNELS.COMPLETE_LOCAL_STORAGE_MIGRATION, async (payload) => {
		if (!deps.completeLocalStorageMigration) return;
		deps.completeLocalStorageMigration(readLocalStorageApplyResult(payload));
	});
	registry.handle(MIGRATION_REPLAY_ARCHIVED_CHANNEL, async (payload) => {
		if (!deps.replayArchived) return {
			applied: 0,
			missing: []
		};
		return deps.replayArchived(readReplayArchiveIds(payload));
	});
}
function registerMigrationRuntimeHandlers(endpoint, deps) {
	registerMigrationHandlers(endpoint, deps);
	const disposeArchivedSyncListener = deps.getArchivedSyncService().onComplete((result) => {
		try {
			pushArchivedSyncStatusUpdate(endpoint, result);
		} catch (err) {
			deps.logger?.warn("[MainBootstrap] Failed to push archivedSyncStatusUpdate:", err);
		}
	});
	if (deps.deferredHistory) {
		deps.logger?.info("[MainBootstrap] History migration is running in background");
		try {
			pushMigrationHistoryStatusUpdate(endpoint, {
				phase: "running",
				timestamp: (deps.now ?? Date.now)()
			});
		} catch (err) {
			deps.logger?.warn("[MainBootstrap] Failed to push running migration status:", err);
		}
		deps.deferredHistory.then((result) => {
			deps.logger?.info(`[MainBootstrap] Background history migration finished: success=${String(result.success)}, message=${String(result.message)}`);
			try {
				pushMigrationHistoryStatusUpdate(endpoint, deps.getHistoryStatus());
			} catch (err) {
				deps.logger?.warn("[MainBootstrap] Failed to push final migration status:", err);
			}
			Promise.resolve(deps.flushMonitor?.()).catch(() => {});
		}).catch((err) => {
			deps.logger?.error("[MainBootstrap] Background history migration failed:", err);
			try {
				pushMigrationHistoryStatusUpdate(endpoint, {
					phase: "failed",
					error: err instanceof Error ? err.message : String(err),
					timestamp: (deps.now ?? Date.now)()
				});
			} catch {}
		});
	} else try {
		pushMigrationHistoryStatusUpdate(endpoint, deps.getHistoryStatus());
	} catch (err) {
		deps.logger?.warn("[MainBootstrap] Failed to push initial migration status:", err);
	}
	return disposeArchivedSyncListener;
}
function pushMigrationHistoryStatusUpdate(publisher, status) {
	publisher.push(require_handler_registry.MIGRATION_RPC_CHANNELS.HISTORY_STATUS_UPDATE, status);
}
function pushArchivedSyncStatusUpdate(publisher, result) {
	publisher.push(ARCHIVED_SYNC_STATUS_UPDATE_CHANNEL, result);
}
function readLocalStorageApplyResult(payload) {
	const record = payload && typeof payload === "object" ? payload : {};
	return {
		appliedKeys: Array.isArray(record.appliedKeys) ? record.appliedKeys.filter((key) => typeof key === "string") : [],
		skippedKeys: readSkippedKeys(record.skippedKeys)
	};
}
function readSkippedKeys(value) {
	if (!value || typeof value !== "object") return {};
	const result = {};
	for (const [key, reason] of Object.entries(value)) if (typeof reason === "string") result[key] = reason;
	return result;
}
function readReplayArchiveIds(payload) {
	const rawIds = payload && typeof payload === "object" ? payload.ids : void 0;
	if (!Array.isArray(rawIds)) return;
	const ids = rawIds.filter((id) => typeof id === "string" && id.length > 0);
	return ids.length > 0 ? ids : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/service-handlers.ts
/**
* renderer 侧追加的哨兵末参 key（见 workbuddy-app service-proxy.ts）。
* **必须与那边的 TRACE_META_ARG_KEY 保持一致**。
*/
var TRACE_META_ARG_KEY = "__wbTraceMeta";
/**
* 从 RPC args 提取上游 W3C traceparent，返回 traceparent + 剔除哨兵后的 cleanedArgs。
* renderer service-proxy 两种载体：
* - 对象首参：`args[0]._meta['codebuddy.ai'].traceparent`（不改 args）
* - 非对象首参 / 无参：哨兵末参 `{ [TRACE_META_ARG_KEY]: traceparent }`（提取后从 args 剔除，
*   不让它进业务方法）
*/
function extractUpstreamTraceparent(args) {
	const first = args[0];
	if (first && typeof first === "object") {
		const tp = (first._meta?.["codebuddy.ai"])?.traceparent;
		if (typeof tp === "string") return {
			traceparent: tp,
			cleanedArgs: args
		};
	}
	const last = args[args.length - 1];
	if (last && typeof last === "object" && !Array.isArray(last)) {
		const tp = last[TRACE_META_ARG_KEY];
		if (typeof tp === "string") return {
			traceparent: tp,
			cleanedArgs: args.slice(0, -1)
		};
	}
	return { cleanedArgs: args };
}
function registerServiceHandlers(server, serviceName, service, options) {
	const logger = require_code_cache.createWorkbuddyScopedLogger("service-rpc");
	const channelMap = options?.channelMap;
	const excluded = new Set(options?.excludeMethods ?? []);
	const traceSpanPrefix = options?.traceSpanPrefix;
	const methods = [];
	const seen = /* @__PURE__ */ new Set();
	function collect(keys) {
		for (const method of keys) {
			if (method === "constructor" || excluded.has(method) || seen.has(method)) continue;
			seen.add(method);
			const fn = service[method];
			if (typeof fn !== "function") continue;
			const channel = channelMap?.[method] ?? `${serviceName}:${method}`;
			methods.push(method);
			server.handle(channel, async (...args) => {
				const start = performance.now();
				const invoke = async (callArgs) => {
					try {
						const result = await fn.apply(service, callArgs);
						const duration = (performance.now() - start).toFixed(1);
						logger.info(`${channel} OK ${duration}ms`);
						return result;
					} catch (error) {
						const duration = (performance.now() - start).toFixed(1);
						const message = error instanceof Error ? error.message : error;
						logger.error(`${channel} FAIL ${duration}ms`, message);
						throw error;
					}
				};
				if (!traceSpanPrefix) return invoke(args);
				const { traceparent, cleanedArgs } = extractUpstreamTraceparent(args);
				const parsed = require_traceparent.parseTraceparent(traceparent);
				const parentCtx = parsed ? require_code_cache.trace.setSpanContext(require_code_cache.ROOT_CONTEXT, {
					traceId: parsed.traceId,
					spanId: parsed.spanId,
					traceFlags: parsed.flags ?? require_code_cache.TraceFlags.SAMPLED,
					isRemote: true
				}) : require_code_cache.ROOT_CONTEXT;
				const span = require_code_cache.trace.getTracer("workbuddy-server").startSpan(`${traceSpanPrefix}.${method}`, { kind: require_code_cache.SpanKind.CLIENT }, parentCtx);
				return require_code_cache.context.with(require_code_cache.trace.setSpan(require_code_cache.context.active(), span), async () => {
					try {
						const result = await invoke(cleanedArgs);
						span.setStatus({ code: require_code_cache.SpanStatusCode.OK });
						return result;
					} catch (error) {
						span.recordException(error);
						span.setStatus({
							code: require_code_cache.SpanStatusCode.ERROR,
							message: error instanceof Error ? error.message : String(error)
						});
						throw error;
					} finally {
						span.end();
					}
				});
			});
		}
	}
	collect(Object.keys(service));
	let proto = Object.getPrototypeOf(service);
	while (proto && proto !== Object.prototype) {
		collect(Object.getOwnPropertyNames(proto));
		proto = Object.getPrototypeOf(proto);
	}
	logger.info(`${serviceName} registered (${methods.length} methods)`);
}
//#endregion
//#region ../../packages/workbuddy-server/src/ima/handlers.ts
function createImaServiceObject(deps) {
	const ima = deps.imaService;
	/**
	* inflight 去重：按参数 key 区分，不同 params（如不同 sessionId）各自独立。
	* 仅当完全相同参数的请求仍在途时才复用 promise。
	*/
	const inflightAuthStatusMap = /* @__PURE__ */ new Map();
	return {
		authStart: (params) => ima.auth.start(params),
		authStatus: (params) => {
			if (deps.getNetworkGate?.()?.shouldSkip()) return Promise.resolve(null);
			const key = params ? JSON.stringify(params) : "";
			const inflight = inflightAuthStatusMap.get(key);
			if (inflight) return inflight;
			const promise = ima.auth.status(params);
			inflightAuthStatusMap.set(key, promise);
			promise.finally(() => {
				inflightAuthStatusMap.delete(key);
			}).catch(() => {});
			return promise;
		},
		authRefresh: () => ima.auth.refresh(),
		authLogout: async (params) => {
			const result = await ima.auth.logout(params);
			ima.notifyAuthChanged(false);
			return result;
		},
		kbList: (params) => ima.kb.list(params ?? {}),
		kbSearch: (params) => ima.kb.search(params),
		kbInfoByShareLink: ({ shareLink }) => ima.kb.getInfoByShareLink(shareLink),
		filesList: (params) => ima.files.list(params),
		filesSearch: (params) => ima.files.search(params),
		filesViewUrl: ({ fileId }) => ima.files.getViewUrl(fileId),
		filesDownloadUrl: ({ fileId }) => ima.files.getDownloadUrl(fileId),
		filesContent: ({ url }) => ima.files.getContent(url),
		filesBlob: ({ url }) => ima.files.getBlob(url),
		filesUpload: (params) => ima.files.upload({
			kbId: params.kbId,
			folderId: params.folderId,
			filename: params.filename,
			overwrite: params.overwrite,
			tags: params.tags,
			mimeType: params.mimeType,
			content: new Uint8Array(node_buffer.Buffer.from(params.contentBase64, "base64")),
			idempotencyKey: params.idempotencyKey
		}),
		filesCancelUpload: async ({ uploadId }) => {
			deps.logger?.info("[ImaService] upload cancel requested (soft):", { uploadId });
			return { cancelled: Boolean(uploadId) };
		},
		filesUploadByPath: async (params) => {
			const uploadId = params.uploadId;
			const result = await ima.files.uploadByPath({
				filePath: params.filePath,
				kbId: params.kbId,
				folderId: params.folderId,
				filename: params.filename,
				onProgress: uploadId ? ({ stage, percent, loaded, total }) => {
					ima.notifyUploadProgress({
						uploadId,
						stage,
						percent,
						loaded,
						total
					});
				} : void 0
			});
			return {
				fileId: result.fileId,
				kbId: result.kbId,
				folderId: result.folderId,
				name: result.name,
				size: result.size
			};
		}
	};
}
var IMA_CHANNEL_MAP = {
	authStart: "ima:auth:start",
	authStatus: "ima:auth:status",
	authRefresh: "ima:auth:refresh",
	authLogout: "ima:auth:logout",
	kbList: "ima:kb:list",
	kbSearch: "ima:kb:search",
	kbInfoByShareLink: "ima:kb:info-by-share-link",
	filesList: "ima:files:list",
	filesSearch: "ima:files:search",
	filesViewUrl: "ima:files:view-url",
	filesDownloadUrl: "ima:files:download-url",
	filesContent: "ima:files:content",
	filesBlob: "ima:files:blob",
	filesUpload: "ima:files:upload",
	filesCancelUpload: "ima:files:cancel-upload",
	filesUploadByPath: "ima:files:upload-by-path"
};
function registerImaHandlers(registry, deps) {
	registerServiceHandlers(registry, "ima", createImaServiceObject(deps), { channelMap: IMA_CHANNEL_MAP });
}
function registerImaRuntimeHandlers(registry, deps) {
	Promise.resolve(deps.cellDeps).then((cellDeps) => {
		registerImaHandlers(registry, {
			imaService: cellDeps.imaService,
			logger: deps.logger,
			getNetworkGate: deps.getNetworkGate
		});
	}).catch((error) => {
		deps.logger?.error("[ImaService] registration failed:", String(error));
	});
}
function registerImaUploadProgressEventBridge(publisher, deps) {
	deps.imaService.onUploadProgress((payload) => {
		publisher.push(require_handler_registry.IMA_RPC_CHANNELS.UPLOAD_PROGRESS, payload);
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/application-manifest/application-manifest.ts
/**
* Application Manifest — 会话内「应用清单」`applications.yaml` 的读写工具模块
*
* 通用模块（不依赖任何 Service 实例，纯函数 + 文件 I/O，形态对齐
* `sites/site-history.ts`），供两条链路共用：
*  - 开通云服务：`activate` 起始读清单判断情况 A/B/C；情况 A 在云服务绑定成功后追加。
*  - 发布应用：发布为应用后把 `{name, locator}` 追加进清单（需求 §0.3 ②）。
*
* ## 落点（需求 §4.1）
* `<会话文件夹>/.workbuddy/applications.yaml`。其中 `<会话文件夹>` = 会话工作区
* （`session.cwd`，如 `~/WorkBuddy/2026-08-18-13-07-32/`），由调用方以 `sessionDir`
* 显式传入——本模块**不解析 cwd / session**，只在其后拼 `.workbuddy/applications.yaml`。
* `.workbuddy/` 与文件均**按需懒创建**（首次 append 时 `mkdir -p` + 创建）。
*
* ## 语义与硬约束
* - **读**永不抛：文件不存在 / 空 / 解析失败一律返回 `[]`（乐观快路；防重复的权威
*   兜底在后端两接口的幂等，本地文件不可靠，需求 §8）。
* - **追加幂等**：按 `locator` 去重，已存在则不写盘、`added:false`。
* - **原子写**：同目录写临时文件再 `rename`，避免半截文件。
* - **安全（需求 §4.5）**：序列化走字段白名单，只输出 `{name, locator}`；读回 / 写入
*   前对每条净化——`locator` 必须 `wbapp_` 前缀且形如 id、`name` 去控制字符并截断，
*   杜绝任何密钥 / 环境 id / 长文 / YAML 注入落盘。
*/
var import_dist = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_log_acl_guard.require_dist());
/** 会话级数据目录名（需求 §4.1；与 `memory/` 同级）。 */
var MANIFEST_DIR_NAME = ".workbuddy";
/** 清单文件名。 */
var MANIFEST_FILE_NAME = "applications.yaml";
/** 单个应用的隐藏 `.genie` 标记文件扩展名（落点在工作空间根目录，与 `.workbuddy/` 同级）。 */
var GENIE_FILE_EXT = ".genie";
/** `locator` 合法形态：`wbapp_` 前缀 + id 字符集（后端签发，见需求 §1）。 */
var LOCATOR_RE = /^wbapp_[A-Za-z0-9_-]+$/;
/** `locator` 长度上限（防异常长值落盘）。 */
var LOCATOR_MAX_LENGTH = 128;
/** `name` 展示名长度上限（截断防长文 / 注入）。 */
var NAME_MAX_LENGTH = 100;
/**
* 拼出清单文件绝对路径：`<sessionDir>/.workbuddy/applications.yaml`。
* `sessionDir` 由调用方传入（通常 = `workspaceRoot`），空则报错（接线缺陷应尽早暴露）。
*/
function getApplicationsManifestPath(sessionDir) {
	if (!sessionDir || !sessionDir.trim()) throw new Error("getApplicationsManifestPath: sessionDir is required.");
	return node_path.join(node_path.resolve(sessionDir), MANIFEST_DIR_NAME, MANIFEST_FILE_NAME);
}
/**
* 统一「会话文件夹」解析口径，两条链路共用，避免各写一份。
* 优先会话工作区根 `workspaceRoot`（需求语义的「会话文件夹」），缺失时回落应用源码根
* `directory`（单会话单目录场景下二者一致）。都没有则报错。
*/
function resolveManifestSessionDir(opts) {
	const workspaceRoot = opts.workspaceRoot?.trim();
	if (workspaceRoot) return node_path.resolve(workspaceRoot);
	const directory = opts.directory?.trim();
	if (directory) return node_path.resolve(directory);
	throw new Error("resolveManifestSessionDir: neither workspaceRoot nor directory was provided.");
}
/**
* 读取清单。文件不存在 / 空 / 解析失败 / 结构非法一律返回 `[]`（永不抛）。
* 读回时对每条净化 + 按 `locator` 去重（防手工编辑引入重复 / 脏数据）。
*/
function readApplications(sessionDir) {
	const filePath = getApplicationsManifestPath(sessionDir);
	let raw;
	try {
		raw = node_fs.readFileSync(filePath, "utf-8");
	} catch {
		return [];
	}
	let parsed;
	try {
		parsed = import_dist.parse(raw);
	} catch {
		return [];
	}
	const list = parsed?.applications;
	if (!Array.isArray(list)) return [];
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	for (const item of list) {
		const entry = normalizeEntry(item);
		if (!entry || seen.has(entry.locator)) continue;
		seen.add(entry.locator);
		result.push(entry);
	}
	return result;
}
/**
* 追加一条应用记录（幂等）。
*
* - 已存在同 `locator` → 不写盘，返回 `{ added:false }`（符合「一应用至多一条」，需求 §4.2）。
* - 首次写入时懒创建 `.workbuddy/` 目录与文件，原子写盘。
* - 入参非法（`locator` 不形如 `wbapp_...` / 净化后 `name` 为空）直接抛错——这是调用方
*   的编程错误，应尽早暴露而非静默写脏数据。
*/
function appendApplication(sessionDir, entry) {
	const locator = typeof entry?.locator === "string" ? entry.locator.trim() : "";
	if (!isValidLocator(locator)) throw new Error(`appendApplication: invalid locator "${entry?.locator ?? ""}"; expected a "wbapp_" id.`);
	const name = sanitizeName(typeof entry?.name === "string" ? entry.name : "");
	if (!name) throw new Error("appendApplication: name is required and must be non-empty after sanitization.");
	const existing = readApplications(sessionDir);
	if (existing.some((item) => item.locator === locator)) return {
		added: false,
		entries: existing
	};
	const entries = [...existing, {
		name,
		locator
	}];
	writeApplications(sessionDir, entries);
	return {
		added: true,
		entries
	};
}
/**
* 按 `locator` 新增或更新应用展示名。
*
* 只供调用方已经拿到明确“替换已有应用”语义时使用；普通重发应继续调用
* {@link appendApplication}，避免模型每轮重新概括的 `appName` 让名称漂移。
*/
function upsertApplication(sessionDir, entry) {
	const locator = typeof entry?.locator === "string" ? entry.locator.trim() : "";
	if (!isValidLocator(locator)) throw new Error(`upsertApplication: invalid locator "${entry?.locator ?? ""}"; expected a "wbapp_" id.`);
	const name = sanitizeName(typeof entry?.name === "string" ? entry.name : "");
	if (!name) throw new Error("upsertApplication: name is required and must be non-empty after sanitization.");
	const existing = readApplications(sessionDir);
	const index = existing.findIndex((item) => item.locator === locator);
	if (index < 0) {
		const entries = [...existing, {
			name,
			locator
		}];
		writeApplications(sessionDir, entries);
		return {
			added: true,
			updated: false,
			entries
		};
	}
	if (existing[index]?.name === name) return {
		added: false,
		updated: false,
		entries: existing
	};
	const entries = existing.map((item, itemIndex) => itemIndex === index ? {
		name,
		locator
	} : item);
	writeApplications(sessionDir, entries);
	return {
		added: false,
		updated: true,
		entries
	};
}
/**
* 写单个应用的隐藏 `.genie` 标记文件：`<sessionDir>/.<appId>.genie`（yaml 格式）。
*
* 与 `applications.yaml`（清单）不同，这是一个应用一个文件、落在工作空间根目录的
* 独立隐藏标记，供 `present_files` 交付为产物。文件名以 `.` 打头，避免在文件树里
* 干扰用户。
*
* ## 字段边界：只落「本地事实」，不落会变的状态
*
* 落 `appId` / `name` / `localDir` / `appType` 四个字段，它们的共同点是**写入那一刻
* 即确定、且云端拿不到**：
*
* - `appId`：全链路定位应用的唯一入参（文件名里也有，内容里再放一份便于直接读）。
* - `name`：产物卡片展示名。
* - `localDir`：应用工程目录绝对路径。**这是本文件存在的关键理由之一** ——
*   它是 `sites:deploy` 的 `directory`（必填）、静态 HTML 就地编辑与预览地址反解
*   的依据，而云端应用详情接口刻意不返回它（见 `application-detail-api.ts`）。
* - `appType`：应用形态（`web` / `miniprogram`），由模型按用户诉求判定，一次写定。
* - `entryHtml`：入口页面相对路径。**同目录多应用时唯一的区分依据** —— 目录里并列
*   躺着 `a.html` / `b.html` 时磁盘上推不出映射，只有发布意图知道（见 types.ts）。
*
* ⚠️ `entryHtml` 的值来自模型入参，因此**必须净化**（见 `sanitizeEntryHtml`）：
* 它会被读侧拼进预览地址，`../../` 之类的穿越值会让预览指到工程目录外的文件。
*
* **刻意不落**发布态 / 云服务态 / 预览地址：
* - 发布态与云服务态会变（别的设备发布、云服务逾期），各有真接口
*   （`getApplicationDetail`），这里再放一份必然打架；
* - 预览地址按 PRD §3.2.3「每次打开应用空间实时给，拿不到就不给」，落盘会过期。
*
* - 幂等覆盖：重复写同一 `appId` 内容收敛到最新。
* - 入参非法（`appId` 不形如 `wbapp_...` / 净化后 `name` 为空）直接抛错，与
*   `appendApplication` 同口径，属调用方编程错误，应尽早暴露。
*
* @returns 写入文件的绝对路径（供上层回传，用于投影产物）。
*/
function writeApplicationGenieFile(sessionDir, entry) {
	const appId = typeof entry?.appId === "string" ? entry.appId.trim() : "";
	if (!isValidLocator(appId)) throw new Error(`writeApplicationGenieFile: invalid appId "${entry?.appId ?? ""}"; expected a "wbapp_" id.`);
	const name = sanitizeName(typeof entry?.name === "string" ? entry.name : "");
	if (!name) throw new Error("writeApplicationGenieFile: name is required and must be non-empty after sanitization.");
	const localDir = typeof entry?.localDir === "string" && entry.localDir.trim() ? node_path.resolve(entry.localDir.trim()) : void 0;
	const appType = typeof entry?.appType === "string" && entry.appType.trim() ? entry.appType.trim() : void 0;
	const entryHtml = sanitizeEntryHtml(entry?.entryHtml);
	const filePath = node_path.join(node_path.resolve(sessionDir), `.${appId}${GENIE_FILE_EXT}`);
	atomicWriteFile(filePath, import_dist.stringify({
		appId,
		name,
		...localDir ? { localDir } : {},
		...appType ? { appType } : {},
		...entryHtml ? { entryHtml } : {}
	}));
	return filePath;
}
/**
* 净化入口页面相对路径（读写两侧共用，保证「写进去的」与「读出来的」同一口径）。
*
* 值来自模型入参且最终会被拼进预览地址，因此按白名单收口，非法一律返回 undefined：
*
* 1. **拒绝绝对路径与盘符**（`/etc/passwd`、`C:\x`）—— 入口只能在工程目录内；
* 2. **拒绝任何 `..` 段** —— 路径穿越；`a/../../b` 这类绕过也在此拦下；
* 3. **拒绝 URL**（含 `://` 或以 `//` 开头）—— 预览地址由 localDir 派生，不接受外链；
* 4. 只接受 `.htm` / `.html` 结尾 —— 入口要能被预览区直接加载，给 `.py` 只会加载失败。
*
* 分隔符统一成 `/`：写入侧可能来自 Windows（`sub\b.html`），读侧按 `/` 比较。
*/
function sanitizeEntryHtml(value) {
	if (typeof value !== "string") return;
	const normalized = value.trim().replace(/\\/g, "/");
	if (!normalized) return;
	if (normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized) || normalized.includes("://")) return;
	if (normalized.split("/").some((segment) => segment === "..")) return;
	if (!/\.html?$/i.test(normalized)) return;
	return normalized;
}
/**
* 在工作空间根下建立 `appId → localDir` 索引（#109383 后续：让未发布应用也能发布）。
*
* ## 为什么需要它
*
* `localDir` 是 `sites:deploy` 的 `directory`（必填），而**云端刻意不返回**该字段
* （见 `writeApplicationGenieFile` 的字段边界说明）。daemon 侧原本只从部署历史补
* （`findDeployRecordByAppId().absolutePath`），于是「开了云服务但从没发布」的应用
* 永远拿不到 `localDir` —— 应用列表里没法给它「发布应用」入口，点了也必然失败。
*
* `.{appId}.genie` 正是为此存在的本地事实载体：写入时 `localDir` 直接取自
* `sites:deploy` 的 `directory`（`cloud-service-service` 的 `options.directory`），
* 语义与发布入参完全一致，不是近似替代。
*
* ## 为什么是「扫一次建索引」而不是「按 appId 逐个查」
*
* 一次应用列表可能有几十个应用缺 `localDir`，逐个查会退化成
* `O(应用数 × 会话目录数)` 次 `stat`。这里对每个会话目录只做一次 `readdir`，
* 整体是 `O(会话目录数)`，与应用数无关。
*
* ## 边界
*
* - 只扫 `workspaceRoot` 下**一层**子目录：会话工作区就在这一层（`~/WorkBuddy/<时间戳>/`），
*   递归下去会走进用户工程的 `node_modules` 之类，代价不可控。
* - 用户把会话建在自定义目录时扫不到 —— 那种应用只能靠部署历史那条路，
*   这是有意的取舍：宁可少给入口，不可给一个点了必失败的按钮。
* - **永不抛**：目录不存在 / 无权限 / 文件损坏都只是「查不到」，
*   不能让一个坏文件把整个应用列表打挂。
*/
function buildApplicationLocalDirIndex(workspaceRoot) {
	const index = /* @__PURE__ */ new Map();
	const root = typeof workspaceRoot === "string" ? workspaceRoot.trim() : "";
	if (!root) return index;
	let sessionDirs;
	try {
		sessionDirs = node_fs.readdirSync(node_path.resolve(root), { withFileTypes: true });
	} catch {
		return index;
	}
	for (const dirent of sessionDirs) {
		if (!dirent.isDirectory()) continue;
		const sessionDir = node_path.join(node_path.resolve(root), dirent.name);
		let files;
		try {
			files = node_fs.readdirSync(sessionDir);
		} catch {
			continue;
		}
		for (const fileName of files) {
			if (!fileName.startsWith(".wbapp_") || !fileName.endsWith(GENIE_FILE_EXT)) continue;
			const record = readApplicationGenieFile(node_path.join(sessionDir, fileName));
			if (!record?.localDir) continue;
			if (!index.has(record.appId)) index.set(record.appId, record.localDir);
		}
	}
	return index;
}
/**
* 读取单个 `.{appId}.genie` 文件（**永不抛**，与 `readApplications` 同口径）。
*
* 文件不存在 / 空 / YAML 非法 / `appId` 不合法一律返回 `undefined`。
* `localDir` 只在确实是绝对路径时才回传 —— 相对路径无法直接喂给 `sites:deploy`，
* 而这里没有可靠的基准目录去解析它，返回一个拼错的路径比不返回更糟。
*/
function readApplicationGenieFile(filePath) {
	let raw;
	try {
		raw = node_fs.readFileSync(filePath, "utf8");
	} catch {
		return;
	}
	let parsed;
	try {
		parsed = import_dist.parse(raw);
	} catch {
		return;
	}
	if (!parsed || typeof parsed !== "object") return;
	const record = parsed;
	const appId = typeof record.appId === "string" ? record.appId.trim() : "";
	if (!isValidLocator(appId)) return;
	const name = sanitizeName(typeof record.name === "string" ? record.name : "");
	const rawLocalDir = typeof record.localDir === "string" ? record.localDir.trim() : "";
	const localDir = rawLocalDir && node_path.isAbsolute(rawLocalDir) ? rawLocalDir : void 0;
	const appType = typeof record.appType === "string" && record.appType.trim() ? record.appType.trim() : void 0;
	const entryHtml = sanitizeEntryHtml(record.entryHtml);
	return {
		appId,
		name,
		...localDir ? { localDir } : {},
		...appType ? { appType } : {},
		...entryHtml ? { entryHtml } : {}
	};
}
/**
* 移除一条应用记录（幂等）。
*
* 供「云端应用已被删除」的清理路径使用：目标应用在云端被删后，本地清单里的残留
* `locator` 会让后续发布继续命中它、把内容发到已删除的应用上。移除后清单为空时
* 保留 `applications: []`，与 `readApplications` 的「空清单」口径一致。
*
* - 不存在同 `locator` → 不写盘，返回 `{ removed:false }`。
*/
function removeApplication(sessionDir, locator) {
	const target = typeof locator === "string" ? locator.trim() : "";
	if (!target) return {
		removed: false,
		entries: readApplications(sessionDir)
	};
	const existing = readApplications(sessionDir);
	const next = existing.filter((item) => item.locator !== target);
	if (next.length === existing.length) return {
		removed: false,
		entries: existing
	};
	writeApplications(sessionDir, next);
	return {
		removed: true,
		entries: next
	};
}
/** 覆盖写整份清单（内部用；对外只暴露幂等的 append，避免误覆盖）。 */
function writeApplications(sessionDir, entries) {
	const manifest = { applications: entries.map((item) => ({
		name: item.name,
		locator: item.locator
	})) };
	atomicWriteFile(getApplicationsManifestPath(sessionDir), import_dist.stringify(manifest));
}
/** 原子写：先写同目录临时文件再 `rename`（懒创建父目录）。 */
function atomicWriteFile(filePath, content) {
	const dir = node_path.dirname(filePath);
	node_fs.mkdirSync(dir, { recursive: true });
	const tmp = node_path.join(dir, `.${node_path.basename(filePath)}.${process.pid}.${Date.now()}.tmp`);
	try {
		node_fs.writeFileSync(tmp, content, "utf-8");
		node_fs.renameSync(tmp, filePath);
	} catch (error) {
		try {
			node_fs.unlinkSync(tmp);
		} catch {}
		throw error;
	}
}
/** 校验 + 净化一条来自文件的记录；非法返回 undefined（读侧丢弃该条）。 */
function normalizeEntry(item) {
	if (!item || typeof item !== "object") return;
	const record = item;
	const locator = typeof record.locator === "string" ? record.locator.trim() : "";
	if (!isValidLocator(locator)) return;
	const name = sanitizeName(typeof record.name === "string" ? record.name : "");
	if (!name) return;
	return {
		name,
		locator
	};
}
function isValidLocator(locator) {
	return locator.length <= LOCATOR_MAX_LENGTH && LOCATOR_RE.test(locator);
}
/** 净化展示名：去换行 / 控制字符 + trim + 截断（防长文 / YAML 注入）。 */
function sanitizeName(raw) {
	return raw.replace(/[\u0000-\u001F\u007F]+/g, " ").trim().slice(0, NAME_MAX_LENGTH).trim();
}
//#endregion
//#region ../../packages/workbuddy-server/src/automation/handlers.ts
function registerAutomationsHandlers(registry, deps) {
	const automationService = Promise.resolve(deps.services).then((services) => services.automation);
	require_handler_registry.handleRpc(registry, "automationGetSnapshot", async () => (await automationService).getSnapshot());
	require_handler_registry.handleRpc(registry, "automationUpdate", async (payload) => (await automationService).updateFromTool(payload));
	require_handler_registry.handleRpc(registry, "automationDelete", async (id) => (await automationService).deleteAutomation(id));
	require_handler_registry.handleRpc(registry, "automationTest", async (id) => (await automationService).testAutomation(id));
	require_handler_registry.handleRpc(registry, "automationArchiveInboxItem", async (itemId) => (await automationService).archiveInboxItem(itemId));
	require_handler_registry.handleRpc(registry, "automationDeleteInboxItem", async (itemId) => (await automationService).deleteInboxItem(itemId));
}
function registerAutomationEventBridge(publisher, deps) {
	deps.automationService.setSnapshotSink({ publishSnapshot: (snapshot) => {
		publisher.push(require_handler_registry.AUTOMATION_RPC_CHANNELS.SNAPSHOT_UPDATE, snapshot);
	} });
	deps.automationService.setSessionStartedSink({
		notifySessionPending: (sessionId) => {
			publisher.push(require_contract.SESSION_RPC_CHANNELS.NAVIGATE, {
				sessionId,
				source: "automation"
			});
		},
		notifySessionStarted: (event) => {
			publisher.push(require_contract.SESSION_RPC_CHANNELS.NAVIGATE, {
				sessionId: event.sessionId,
				cwd: event.cwd,
				title: event.automationName,
				source: "automation"
			});
		}
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/miniprogram/json-comments.ts
function stripJsonComments(source) {
	let result = "";
	let inString = false;
	let escaped = false;
	for (let index = 0; index < source.length; index++) {
		const char = source[index];
		const next = source[index + 1];
		if (inString) {
			result += char;
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === "\"") inString = false;
			continue;
		}
		if (char === "\"") {
			inString = true;
			result += char;
			continue;
		}
		if (char === "/" && next === "/") {
			const start = index;
			index += 2;
			while (index < source.length && source[index] !== "\r" && source[index] !== "\n") index++;
			result += " ".repeat(index - start);
			index--;
			continue;
		}
		if (char === "/" && next === "*") {
			const end = source.indexOf("*/", index + 2);
			if (end === -1) throw new SyntaxError(`Unterminated block comment at position ${index}`);
			result += source.slice(index, end + 2).replace(/[^\r\n]/g, " ");
			index = end + 1;
			continue;
		}
		result += char;
	}
	return result;
}
//#endregion
//#region ../../packages/workbuddy-server/src/miniprogram/project-locator.ts
var EXCLUDED_DIRECTORY_NAMES = /* @__PURE__ */ new Set([
	"node_modules",
	".git",
	"dist",
	"build",
	"out",
	"coverage",
	"tmp",
	"temp"
]);
/**
* 从传入目录本身或其一级子目录中定位唯一微信小程序工程；传入源码根时可匹配父工程。
*
* 工程必须同时具备合法 `project.config.json`，以及源码根下含非空 pages 数组的
* `app.json` 和 `app.wxss`。`miniprogramRoot` 只允许指向工程根内部的真实目录。
*/
async function locateMiniprogramProject(localDir, options = {}) {
	const root = node_path.resolve(localDir);
	const rootStat = await node_fs.promises.lstat(root).catch(() => void 0);
	if (!rootStat?.isDirectory() || rootStat.isSymbolicLink()) throw new Error(`小程序发布目录不存在、不是目录或为符号链接: ${root}`);
	const projectRoots = [root, ...await listEligibleChildDirectories(root)];
	const candidates = [];
	for (const projectRoot of projectRoots) {
		const candidate = await inspectProjectRoot(projectRoot, options.allowSourceRepair ?? false);
		if (candidate) candidates.push(candidate);
	}
	if (candidates.length === 0) {
		const parent = await inspectProjectRoot(node_path.dirname(root), options.allowSourceRepair ?? false, root);
		if (parent) candidates.push(parent);
	}
	const uniqueCandidates = [...new Map(candidates.map((candidate) => [candidate.sourceRoot, candidate])).values()];
	if (uniqueCandidates.length === 0) throw new Error(`未在 ${root} 或其一级子目录中找到微信小程序工程，也未在父目录找到匹配此源码目录的工程（需要 project.config.json、app.json 的 pages 数组和 app.wxss）`);
	if (uniqueCandidates.length > 1) throw new Error(`在 ${root} 中找到多个微信小程序候选，无法确定发布目标: ` + uniqueCandidates.map((candidate) => candidate.projectRoot).join(", "));
	return uniqueCandidates[0];
}
/** 一级子目录（排除构建产物与隐藏目录），顺序稳定。隐私草稿定位复用同一份排除口径。 */
async function listEligibleChildDirectories(root) {
	return (await node_fs.promises.readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && !entry.isSymbolicLink() && !isExcludedDirectory(entry.name)).map((entry) => node_path.join(root, entry.name)).sort();
}
async function inspectProjectRoot(projectRoot, allowSourceRepair, expectedSourceRoot) {
	const projectConfigPath = node_path.join(projectRoot, "project.config.json");
	if (!await isRegularFile(projectConfigPath)) return;
	let config;
	try {
		const source = await node_fs.promises.readFile(projectConfigPath, "utf8");
		const parsed = JSON.parse(allowSourceRepair ? stripJsonComments(source) : source);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
		config = parsed;
	} catch {
		return;
	}
	const configuredRoot = typeof config.miniprogramRoot === "string" ? config.miniprogramRoot.trim() : "";
	let sourceRoot = node_path.resolve(projectRoot, configuredRoot || ".");
	if (expectedSourceRoot && sourceRoot !== expectedSourceRoot) return;
	if (!isPathInside(projectRoot, sourceRoot) || !await isDirectoryWithoutSymlinkPath(projectRoot, sourceRoot, allowSourceRepair)) return;
	if (allowSourceRepair && !expectedSourceRoot && configuredRoot && !await node_fs.promises.lstat(node_path.join(sourceRoot, "app.json")).catch(() => void 0)) {
		const alternatives = [];
		for (const dir of [projectRoot, ...await listEligibleChildDirectories(projectRoot)]) if (await readMiniprogramEntryPage(dir, true)) alternatives.push(dir);
		if (alternatives.length > 1) throw new Error(`在 ${projectRoot} 中找到多个小程序源码目录，无法修复 miniprogramRoot`);
		if (alternatives.length === 1) sourceRoot = alternatives[0];
	}
	const entryPage = await readMiniprogramEntryPage(sourceRoot, allowSourceRepair);
	if (!entryPage) return;
	return {
		projectRoot,
		sourceRoot,
		projectConfigPath,
		entryPage
	};
}
async function readMiniprogramEntryPage(sourceRoot, allowComments) {
	const appJsonPath = node_path.join(sourceRoot, "app.json");
	if (!await isRegularFile(appJsonPath) || !await isRegularFile(node_path.join(sourceRoot, "app.wxss"))) return;
	try {
		const source = await node_fs.promises.readFile(appJsonPath, "utf8");
		const parsed = JSON.parse(allowComments ? stripJsonComments(source) : source);
		if (!Array.isArray(parsed.pages) || parsed.pages.length === 0 || !parsed.pages.every((page) => typeof page === "string" && page.trim().length > 0)) return;
		return parsed.pages[0].trim();
	} catch {
		return;
	}
}
async function isRegularFile(filePath) {
	const stat = await node_fs.promises.lstat(filePath).catch(() => void 0);
	return !!stat?.isFile() && !stat.isSymbolicLink();
}
async function isDirectoryWithoutSymlinkPath(projectRoot, target, allowMissing = false) {
	const relative = node_path.relative(projectRoot, target);
	const segments = relative ? relative.split(node_path.sep) : [];
	let current = projectRoot;
	for (const segment of segments) {
		current = node_path.join(current, segment);
		const stat = await node_fs.promises.lstat(current).catch(() => void 0);
		if (!stat) return allowMissing;
		if (!stat.isDirectory() || stat.isSymbolicLink()) return false;
	}
	return true;
}
function isPathInside(root, target) {
	const relative = node_path.relative(root, target);
	return relative === "" || !relative.startsWith(`..${node_path.sep}`) && relative !== ".." && !node_path.isAbsolute(relative);
}
function isExcludedDirectory(name) {
	return name.startsWith(".") || EXCLUDED_DIRECTORY_NAMES.has(name.toLowerCase());
}
//#endregion
//#region ../../packages/workbuddy-server/src/applications/handlers.ts
function registerApplicationsHandlers(registry, deps) {
	const builtinMcp = () => {
		if (!deps.builtinMcp) throw new Error("应用依赖装卸能力未就绪（builtinMcp 未注入）");
		return deps.builtinMcp;
	};
	registry.handle(APPLICATIONS_RPC_CHANNELS.INSTALL_BUILTIN_MCP, async (args) => builtinMcp().install(requireInstallParams(args)));
	registry.handle(APPLICATIONS_RPC_CHANNELS.PREPARE_BUILTIN_MCP_AUTHORIZE_URL, async (args) => builtinMcp().prepareAuthorizeUrl(requireApplicationId(args)));
	registry.handle(APPLICATIONS_RPC_CHANNELS.DISCONNECT_BUILTIN_MCP, async (args) => builtinMcp().disconnect(requireApplicationId(args)));
}
/** `applicationId` 既可能是裸串（老调用点），也可能包在对象里。 */
function requireApplicationId(args) {
	const value = typeof args === "string" ? args : args?.applicationId;
	if (typeof value !== "string" || !value.trim()) throw new Error("该 applications: 调用需要 applicationId");
	return value;
}
function requireInstallParams(args) {
	const params = args;
	if (!params?.builtin) throw new Error("applications:installBuiltinMcp 需要 builtin");
	return {
		applicationId: requireApplicationId(params),
		...params.resourceSnapshotKey ? { resourceSnapshotKey: params.resourceSnapshotKey } : {},
		builtin: params.builtin
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/miniprogram/privacy-draft.ts
/**
* AI 写在小程序工程目录里的隐私指引草稿 `.<applicationId>.privacy.json`。
*
* 这份文件由提示词要求模型生成，因此**可能不存在、也可能写歪**：整条链路是纯增强，
* 任何失败都只意味着「前端少一次预填」，绝不能冒泡成错误把用户的手工填写堵死。
* 所以本模块对外只有「拿到草稿」与「没有草稿」两种结果，不抛错。
*/
/** 草稿文件名直接由 `applicationId` 拼出，必须先校验形态挡住路径穿越。 */
var APPLICATION_ID_RE = /^wbapp_[A-Za-z0-9_-]+$/;
/** 会话根锚点之一：应用清单固定落在 `<sessionDir>/.workbuddy/applications.yaml`。 */
var MANIFEST_RELATIVE_PATH = node_path.join(".workbuddy", "applications.yaml");
/** 从 `localDir` 向上找会话根的层数上限。 */
var MAX_ANCHOR_DEPTH = 4;
/** 草稿正常只有几百字节；超限按畸形内容处理，不读进内存。 */
var MAX_DRAFT_BYTES = 262144;
/**
* 草稿文件名，与写入侧（AI 技能）约定为 `.<applicationId>.privacy.json`。
*
* `.` 开头是隐藏文件，不在用户的文件树里显眼。只影响文件名本身 ——
* 子目录扫描排除的是隐藏**目录**，不影响在普通目录里找隐藏文件。
*/
function draftFileName(applicationId) {
	return `.${applicationId}.privacy.json`;
}
/**
* 读取隐私草稿；找不到或内容不可用时返回 `null`。
*
* ## 为什么不直接用 `locateMiniprogramProject`
*
* 那个函数要求 `project.config.json` + `app.json` 的 pages + `app.wxss` 三件齐全，
* 且多候选时抛错。工程结构还没配全时我们仍然应该能读到草稿，所以这里只借它的
* 子目录排除口径，不走它的定位流程。
*
* ## 为什么要向上找
*
* `localDir` 是模型给的部署目录，**不一定是会话根**（sites 链路里 `workspaceRoot`
* 是 `/work/alpha` 而 `localDir` 是 `/work/alpha/site`）。模型可能把 JSON 写在会话根、
* 也可能写进工程子目录，只朝 `localDir` 往下找会漏掉「文件在上一层」的情况。
*/
async function readMiniprogramPrivacyDraft(input) {
	const applicationId = typeof input?.applicationId === "string" ? input.applicationId.trim() : "";
	const rawLocalDir = typeof input?.localDir === "string" ? input.localDir.trim() : "";
	if (!APPLICATION_ID_RE.test(applicationId) || !rawLocalDir) return null;
	const localDir = node_path.resolve(rawLocalDir);
	if (!await isDirectory(localDir)) return null;
	for (const directory of await resolveSearchOrder(localDir, applicationId)) {
		const draft = await readDraftFile(node_path.join(directory, draftFileName(applicationId)));
		if (draft) return draft;
	}
	return null;
}
/**
* 候选目录的查找顺序（命中即停）。
*
* 先查最可能的 `localDir` 自身，再查会话根，然后才展开子目录扫描 —— 文件名带
* `wbapp_` 随机 id，多处同时命中几乎不可能；真撞上了按本顺序取第一个，不报错。
* 与 `locateMiniprogramProject` 的「多候选抛错」不同：这是可选增强，稳定优于严格。
*/
async function resolveSearchOrder(localDir, applicationId) {
	const sessionRoot = await findSessionRoot(localDir, applicationId);
	const parent = node_path.dirname(localDir);
	const directCandidates = [
		localDir,
		sessionRoot,
		withinHomeBoundary(parent) ? parent : void 0
	];
	const scanRoots = [localDir, sessionRoot];
	const childCandidates = (await Promise.all(dedupe(scanRoots).map((root) => listEligibleChildDirectories(root).catch(() => [])))).flat();
	return dedupe([...directCandidates, ...childCandidates]);
}
/**
* 从 `localDir` 向上锚定会话根：`.{appId}.genie` 与 `.workbuddy/applications.yaml`
* 都写在会话根，前者更精准（文件名里直接带 applicationId）。
*
* 边界是层数上限加用户 home / 文件系统根，避免一路走到 `/` 去扫无关目录。
*/
async function findSessionRoot(localDir, applicationId) {
	let current = localDir;
	for (let depth = 0; depth <= MAX_ANCHOR_DEPTH; depth += 1) {
		if (await isRegularFile(node_path.join(current, `.${applicationId}.genie`)) || await isRegularFile(node_path.join(current, MANIFEST_RELATIVE_PATH))) return current;
		const parent = node_path.dirname(current);
		if (parent === current || !withinHomeBoundary(parent)) return;
		current = parent;
	}
}
/** 读并解析单个草稿文件；不存在、超限、非 JSON 或结构不符一律返回 `undefined`。 */
async function readDraftFile(filePath) {
	const stat = await node_fs.promises.lstat(filePath).catch(() => void 0);
	if (!stat?.isFile() || stat.isSymbolicLink() || stat.size > MAX_DRAFT_BYTES) return;
	let parsed;
	try {
		parsed = JSON.parse(await node_fs.promises.readFile(filePath, "utf8"));
	} catch {
		return;
	}
	if (!Array.isArray(parsed)) return;
	const entries = [];
	for (const item of parsed) {
		if (!item || typeof item !== "object" || Array.isArray(item)) continue;
		const entry = {};
		for (const [key, value] of Object.entries(item)) if (typeof value === "string" && value.trim()) entry[key] = value.trim();
		if (Object.keys(entry).length > 0) entries.push(entry);
	}
	return entries;
}
async function isDirectory(directory) {
	const stat = await node_fs.promises.lstat(directory).catch(() => void 0);
	return !!stat?.isDirectory() && !stat.isSymbolicLink();
}
/**
* 向上探测不得到达文件系统根、用户 home 或 home 的任何上层目录。
*
* 判据是「该目录是否包含 home」而不是「是否位于 home 之下」：工作区可以挂在
* home 之外（`/Volumes/...`、临时目录），按后者会把这些路径一律判成越界。
*/
function withinHomeBoundary(directory) {
	if (directory === node_path.parse(directory).root) return false;
	const home = node_os.homedir();
	if (!home) return true;
	const relative = node_path.relative(directory, home);
	return !(relative === "" || !relative.startsWith("..") && !node_path.isAbsolute(relative));
}
function dedupe(values) {
	return [...new Set(values.filter((value) => Boolean(value)))];
}
//#endregion
//#region ../../packages/workbuddy-server/src/miniprogram/handlers.ts
function registerMiniprogramHandlers(registry, deps) {
	registry.handle("miniprogram:publish", async (input) => deps.miniprogramPublishService.publish(input));
	registry.handle("miniprogram:read-privacy-draft", async (input) => (deps.readPrivacyDraft ?? readMiniprogramPrivacyDraft)(input));
}
//#endregion
//#region ../../packages/workbuddy-server/src/applications/application-type.ts
var MAX_DESCRIPTOR_BYTES = 131072;
function readSmallFile(filePath) {
	try {
		const stat = node_fs.statSync(filePath);
		if (!stat.isFile() || stat.size > MAX_DESCRIPTOR_BYTES) return;
		return node_fs.readFileSync(filePath, "utf8");
	} catch {
		return;
	}
}
/**
* 从本地工程入口识别应用形态。
*
* 只使用微信小程序的强特征，不从应用名、发布 URL 或 TCB Provider
* 反推。没有本地目录时返回 unknown，让管理页 fail closed，避免把跨设备
* 的小程序误标为网站。
*/
function detectLocalApplicationType(localDir) {
	const root = localDir?.trim();
	if (!root) return "unknown";
	try {
		if (!node_fs.statSync(root).isDirectory()) return "unknown";
	} catch {
		return "unknown";
	}
	const projectConfig = readSmallFile(node_path.join(root, "project.config.json"));
	if (projectConfig) try {
		const parsed = JSON.parse(projectConfig);
		if (parsed.compileType === "miniprogram" || typeof parsed.miniprogramRoot === "string") return "wechat-mini-program";
	} catch {}
	const appJson = readSmallFile(node_path.join(root, "app.json"));
	if (appJson && node_fs.existsSync(node_path.join(root, "app.wxss"))) try {
		const parsed = JSON.parse(appJson);
		if (Array.isArray(parsed.pages)) return "wechat-mini-program";
	} catch {}
	return "web";
}
//#endregion
//#region ../../packages/workbuddy-server/src/applications/application-list-projector.ts
function projectApplicationType(appType, localDir) {
	if (appType === "miniprogram") return "wechat-mini-program";
	if (appType === "web") return "web";
	return detectLocalApplicationType(localDir);
}
function toEpochMs(value) {
	const epochMs = Date.parse(value);
	return Number.isNaN(epochMs) ? 0 : epochMs;
}
function toNullableEpochMs(value) {
	if (value === null) return null;
	const epochMs = Date.parse(value);
	return Number.isNaN(epochMs) ? null : epochMs;
}
function projectPublish(publish) {
	return {
		status: publish.status,
		shareLink: publish.shareLink,
		sandboxId: publish.sandboxId,
		publishedAt: toNullableEpochMs(publish.publishedAt),
		unpublishedAt: toNullableEpochMs(publish.unpublishedAt)
	};
}
function projectLatestTask(latestTask) {
	if (latestTask === null) return null;
	return {
		taskConversationId: latestTask.taskConversationId,
		title: latestTask.title,
		updatedAt: toEpochMs(latestTask.updatedAt),
		deleted: latestTask.deleted
	};
}
/**
* 单条投影。**导出**是因为「查单个应用」（`sites:getApplication`）与列表共用同一份
* 字段口径与剥离规则 —— 两处各写一份必然漂移，尤其是
* `deployConversationId` 这类**绝不能透传给 renderer** 的字段（见 types.ts 注释）。
*/
function projectApplicationListItem(item, lookupLocalDir) {
	const cloudService = item.cloudService === null ? null : {
		resourceId: item.cloudService.resourceId,
		endpoint: item.cloudService.endpoint,
		status: item.cloudService.status,
		billingStatus: item.cloudService.billingStatus
	};
	const localDir = lookupLocalDir(item.id) ?? null;
	return {
		appId: item.id,
		appName: item.name,
		applicationType: projectApplicationType(item.appType, localDir),
		createdAt: toEpochMs(item.createdAt),
		updatedAt: toEpochMs(item.updatedAt),
		publish: projectPublish(item.publish),
		latestTask: projectLatestTask(item.latestTask),
		taskCount: item.taskCount,
		cloudService,
		localDir,
		miniprogramPublished: item.miniprogram?.published === true,
		miniprogramFormalPublished: item.miniprogram?.formalPublished === true
	};
}
function projectApplicationList(response, lookupLocalDir) {
	return {
		items: response.items.map((item) => projectApplicationListItem(item, lookupLocalDir)),
		total: response.total,
		hasMore: response.hasMore
	};
}
/**
* 单应用详情投影（`GET /applications/detail` → renderer 口径）。
*
* **刻意不复用 `projectApplicationListItem`**：详情接口不返回
* `latestTask` / `taskCount`，套用列表投影就得给它们编一个 `null` / `0`，
* 而 `taskCount: 0` 在渲染层看起来和「这个应用真的一个任务都没有」无法区分。
* 少字段就少字段，不造假数据。
*
* 与列表投影共享的部分只有时间转换与 publish / cloudService 的字段口径 ——
* 那几个 helper 已在本文件内复用，不会漂移。
*/
function projectApplicationDetail(detail, lookupLocalDir) {
	const localDir = lookupLocalDir(detail.id) ?? null;
	return {
		appId: detail.id,
		appName: detail.name,
		applicationType: projectApplicationType(detail.appType, localDir),
		domain: detail.domain || null,
		createdAt: toEpochMs(detail.createdAt),
		updatedAt: toEpochMs(detail.updatedAt),
		publish: projectPublish(detail.publish),
		cloudService: detail.cloudService === null ? null : {
			resourceId: detail.cloudService.resourceId,
			endpoint: detail.cloudService.endpoint,
			status: detail.cloudService.status,
			billingStatus: detail.cloudService.billingStatus
		},
		localDir
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/sites/handlers.ts
/**
* 云端「应用不存在」的业务错误码。
*
* 删除链路靠它把「云端已经没有这条应用」收敛成幂等成功 —— 那是正常业务态，
* 不是故障。与 `application-api-client.ts` 里同名常量取值一致（那边用于把
* `getApplicationDetail` 的 18301 翻译成 `undefined`）。
*/
var APPLICATION_NOT_FOUND_CODE = 18301;
function registerSitesHandlers(registry, deps) {
	const { sitesDeployService } = deps;
	registry.handle("sites:getApplicationList", async (args) => {
		if (!deps.applicationApiClient) throw new Error("应用列表能力未就绪（applicationApiClient 未注入）");
		const response = await deps.applicationApiClient.listApplications(args ?? {});
		let genieIndex;
		const lookupLocalDir = (appId) => {
			const fromHistory = deps.findDeployRecordByAppId?.(appId)?.absolutePath;
			if (fromHistory) return fromHistory;
			const workspaceRoot = deps.resolveWorkspaceRoot?.();
			if (!workspaceRoot) return null;
			genieIndex ??= buildApplicationLocalDirIndex(workspaceRoot);
			return genieIndex.get(appId) ?? null;
		};
		return projectApplicationList(response, lookupLocalDir);
	});
	/**
	* 查单个应用的当前状态（发布态 / 云服务态），#89098。
	*
	* 存在的理由：发布弹窗打开时必须**先知道现在是什么状态**才能决定展示
	* 「立即发布」还是「链接 + 下线/更新」。此前渲染层只能读产物上的静态
	* `release`（写入方 `present_app_files` 未落地 → 恒为空），于是每个应用都
	* 被判成「从未发布」，点开弹窗就直接重新部署了一遍。
	*
	* 实现走 `getApplicationDetail`（`GET /applications/detail`，一次往返）。
	* **不再扫列表**：那是本接口上线前的权宜之计，`5 页 × 200 条` 的扫描上界
	* 一旦被应用数量突破就永久失败，且每次开弹窗要打最多 5 个请求。
	*
	* 返回 `null` = 云端确实没有这个应用（如仅本地登记过、还没 resolve 到云端）。
	* 该分支由 client 把云端 `18301` 翻译而来，**不是**吞错误：
	* 「不存在」是确定的未发布，而 `18302`（不属于当前用户）等仍原样抛出。
	* **查询失败一律抛错**，不吞成 `null`：调用方要能区分「没有」和「查不到」，
	* 后者必须让用户看到「状态未知」而不是被当成未发布。
	*/
	registry.handle("sites:getApplication", async (args) => {
		const appId = args?.appId;
		if (!appId) throw new Error("sites:getApplication 需要 appId");
		if (!deps.applicationApiClient?.getApplicationDetail) throw new Error("应用查询能力未就绪（applicationApiClient 未注入）");
		const detail = await deps.applicationApiClient.getApplicationDetail(appId);
		if (!detail) return null;
		return projectApplicationDetail(detail, (id) => deps.findDeployRecordByAppId?.(id)?.absolutePath ?? null);
	});
	registry.handle("sites:deploy", async (args) => sitesDeployService.deploySite({
		localDir: args.directory,
		language: args.language,
		port: args.port,
		installCmd: args.installCmd,
		startCmd: args.startCmd,
		workspaceRoot: args.cwd,
		taskSessionId: args.taskSessionId,
		triggerType: args.triggerType,
		appName: args.appName,
		appId: args.appId,
		deployConversationId: args.deployConversationId
	}));
	/**
	* 取消发布 / 销毁（会话维度）。
	*
	* ## 为什么这里要顺带写云端发布态（#109383 后续）
	*
	* 本 RPC 早于 #89098 的云端应用体系，主键是 `conversationId`；而云端发布态按
	* `appId` 记。应用主页卡片的取消发布走的正是这条（`cancelDeploy` 下线 release
	* → 本 RPC 写本地下线记录），**全程没人通知云端**，于是 release 已失效、
	* `GET /applications` 却仍返回 `publish.status = published` —— 用户在应用管理页
	* 看到「已发布」和一个点开是死链的地址，还会被引导去点「取消发布」，
	* 那条编排又会对已失效的 release 重复 cancel。
	*
	* 所以这里按 `conversationId` 反查 `appId`，补上第三步。
	*
	* ## 失败为什么不阻断
	*
	* 到这一步 release 已经下线（本地态也已翻转），下线目标事实上达成了。为一次
	* 云端状态同步把整个操作判失败，用户会重试，而重试会对已失效 release 再 cancel
	* 一次（`10001:artifact release is not available`）。漏写云端态的后果只是列表
	* 状态过期，与「操作报错 + 重试踩错误码」不成比例。
	*
	* legacy 记录（无 appId）与云端能力未注入时直接跳过：它们本就没有云端应用。
	*/
	registry.handle("sites:destroy", async (args) => {
		if (args.conversationId) {
			if (args.localOnly) sitesDeployService.markUnpublishedLocally(args.conversationId);
			else await sitesDeployService.cancelArtifactRelease(args.conversationId);
			await syncCloudUnpublishByConversation(args.conversationId);
		} else if (args.spaceKey) await sitesDeployService.destroy(args.spaceKey);
		else throw new Error("conversationId or spaceKey is required");
		return { success: true };
	});
	/**
	* 按部署会话反查应用并写云端「已下线」发布态。**尽力而为，绝不抛错**（理由见
	* `sites:destroy` 注释）。
	*
	* 直接调 `applicationApiClient.unpublishApplication` 而**不是**走
	* `unpublishOrchestrator`：编排器的第一步是下线 release，而本函数的调用点
	* release 已经下线了，再走一遍必然撞 `10001:artifact release is not available`。
	* 这里要的只是编排器的第 2 步。
	*/
	async function syncCloudUnpublishByConversation(conversationId) {
		try {
			const appId = deps.findAppIdByConversationId?.(conversationId);
			if (!appId) return;
			if (!deps.applicationApiClient?.unpublishApplication) return;
			await deps.applicationApiClient.unpublishApplication(appId);
		} catch (error) {
			deps.logger?.warn("[sites:destroy] sync cloud unpublish state failed (release already down)", {
				conversationId,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	registry.handle("sites:createWorkspace", async () => sitesDeployService.createGenieWorkspace());
	registry.handle("sites:getDeployHistory", async (args) => sitesDeployService.getDeployHistory(args?.workspaceRoot, args?.taskSessionIds, args?.conversationIds));
	registry.handle("sites:queryShareLink", async (args) => {
		const rawPath = node_path.default.resolve(args.filePath);
		if (!deps.exists(rawPath)) return { shareLink: null };
		const dirPath = deps.isFile(rawPath) ? node_path.default.dirname(rawPath) : rawPath;
		return { shareLink: deps.findLatestDeployRecord(dirPath)?.shareLink || null };
	});
	/**
	* 取消发布（#89098）。
	*
	* **入参只有 appId**，刻意不收 `taskConversationId`：管理页没有任务上下文，
	* 让「不该传」由结构保证而不是靠人记得别传（docs 09 §2.1）。
	*
	* ⚠️ 取消发布**不要**用 `sites:destroy` —— 传 spaceKey 会销毁沙箱，与
	* 「取消发布后云服务不受影响、链接地址保留占用」完全相反。
	*/
	registry.handle("sites:unpublishApplication", async (args) => {
		const appId = args?.appId;
		if (!appId) throw new Error("sites:unpublishApplication 需要 appId");
		if (!deps.unpublishOrchestrator) throw new Error("取消发布能力未就绪（unpublishOrchestrator 未注入）");
		return deps.unpublishOrchestrator.run(appId);
	});
	/**
	* 删除应用 —— **终态，不可恢复**（#89098）。
	*
	* 直接转发 `POST /applications/delete`，云端一次调用级联：终止发布 +
	* 解绑云服务 + 释放子域名 + 软删应用。
	*
	* ## 为什么这条**不要**编排器（与 `sites:unpublishApplication` 不对称，是刻意的）
	*
	* 取消发布必须在 daemon 侧编排两步（先 `cancelArtifactRelease` 下线沙箱 release、
	* 再写云端发布态），因为云端那个接口只改发布态、不碰沙箱 release，漏了第一步就是
	* 「库里说未发布、线上链接还能打开」。
	*
	* 删除不同：云端**自己**就会终止发布（`PublishService.Unpublish`）并释放
	* agentos 域名绑定，级联在服务端一个事务序列里完成。daemon 再补一次
	* `cancelArtifactRelease` 属于重复下线，会撞
	* `10001:artifact release is not available`（那个错误码就是重复 cancel 触发的）。
	*
	* ⚠️ 也**不要**顺手补 `sites:destroy({ spaceKey })`：那是物理销毁沙箱，
	* 而云端删除的语义是「解绑待回收」（docs §5.3），前端话术已按此写。
	*
	* 出参**原样透传**四个布尔位（`deleted` / `unpublished` / `cloudServiceUnbound` /
	* `domainReleased`），不做任何投影：它们没有内部字段需要剥离，且渲染层要靠
	* 它们区分「本次真删了」与「早就删过了」（幂等命中时全为 false，**那是成功**）。
	*
	* ## 本地副作用：摘掉应用清单里的残留记录（#89098 删除链路加固）
	*
	* 应用清单 `applications.yaml` 里若残留该应用的 `locator`，同一工作区下次发布会
	* `resolveDeployApplication` 命中它、把内容发到已删除的应用上（和发布侧「发现被删
	* → 回落新建」互为兜底）。按 `findDeployRecordByAppId` 反查 `workspacePath` 定位；
	* 反查不到（只开过云服务、从未发布的应用）就跳过，交给发布侧兜底。
	*
	* 同一处还会补写本地下线记录（#110745）：云端删除的级联包含终止发布，
	* 链接已下架，而本机的「已发布」判定只认 unpublish-records，不补就与云端相反。
	*
	* 清理**必须放在云端删除成功之后**：先摘本地、云端再失败，用户会看到「产物列没了
	* 但应用还在」的更糟状态。清理失败一律**吞掉**：删除已经在云端生效，把旁路失败
	* 冒泡成 RPC 失败只会诱导用户重试一个终态操作。
	*
	* ## 不摘产物索引（#104174，反转 #101265）
	*
	* 产物列的「应用」条目来自本地 `artifact-index/<sessionId>.json` 的 `type: 'app'`
	* 记录。删除应用**刻意不摘**这条记录：卡片要保留在对话里，用户点卡片时由应用空间
	* 的云端状态查询（`useAppReleaseQuery` 拿 `notFound`）落到「应用已删除」兜底页。
	*/
	registry.handle("sites:deleteApplication", async (args) => {
		const appId = args?.appId;
		if (!appId) throw new Error("sites:deleteApplication 需要 appId");
		if (!deps.applicationApiClient?.deleteApplication) throw new Error("删除应用能力未就绪（applicationApiClient 未注入）");
		const result = await deps.applicationApiClient.deleteApplication(appId).catch((error) => {
			if (error?.code !== APPLICATION_NOT_FOUND_CODE) throw error;
			deps.logger?.warn("[sites:deleteApplication] application already gone on cloud, treating as success", { appId });
			return {
				applicationId: appId,
				deleted: false,
				unpublished: false,
				cloudServiceUnbound: false,
				domainReleased: false
			};
		});
		try {
			const record = deps.findDeployRecordByAppId?.(appId);
			const workspacePath = record?.workspacePath;
			if (workspacePath) deps.sitesDeployService.removeDeployApplication?.(appId, { workspaceRoot: workspacePath });
			if (record?.conversationId) deps.sitesDeployService.markUnpublishedLocally(record.conversationId);
		} catch (error) {
			deps.logger?.warn("[sites:deleteApplication] remove local application manifest entry failed", {
				appId,
				error: error instanceof Error ? error.message : String(error)
			});
		}
		return result;
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/runtime-handlers.ts
function registerWorkbuddyMainRuntimeHandlers(endpoint, deps) {
	const disposeMigrationRuntimeHandlers = registerMigrationRuntimeHandlers(endpoint, deps.migration);
	if (deps.imaUploadProgress) registerImaUploadProgressEventBridge(endpoint, deps.imaUploadProgress);
	return () => {
		disposeMigrationRuntimeHandlers();
	};
}
function registerWorkbuddyBackgroundRuntimeHandlers(endpoint, deps) {
	if (deps.automation) registerAutomationEventBridge(endpoint, deps.automation);
	if (deps.miniprogram) registerMiniprogramHandlers(endpoint, deps.miniprogram);
	if (deps.sites) registerSitesHandlers(endpoint, deps.sites);
	if (deps.applications) registerApplicationsHandlers(endpoint, deps.applications);
	if (deps.imaUploadProgress) registerImaUploadProgressEventBridge(endpoint, deps.imaUploadProgress);
}
//#endregion
Object.defineProperty(exports, "appendApplication", {
	enumerable: true,
	get: function() {
		return appendApplication;
	}
});
Object.defineProperty(exports, "isRegularFile", {
	enumerable: true,
	get: function() {
		return isRegularFile;
	}
});
Object.defineProperty(exports, "listEligibleChildDirectories", {
	enumerable: true,
	get: function() {
		return listEligibleChildDirectories;
	}
});
Object.defineProperty(exports, "locateMiniprogramProject", {
	enumerable: true,
	get: function() {
		return locateMiniprogramProject;
	}
});
Object.defineProperty(exports, "readApplicationGenieFile", {
	enumerable: true,
	get: function() {
		return readApplicationGenieFile;
	}
});
Object.defineProperty(exports, "readApplications", {
	enumerable: true,
	get: function() {
		return readApplications;
	}
});
Object.defineProperty(exports, "registerAutomationsHandlers", {
	enumerable: true,
	get: function() {
		return registerAutomationsHandlers;
	}
});
Object.defineProperty(exports, "registerImaRuntimeHandlers", {
	enumerable: true,
	get: function() {
		return registerImaRuntimeHandlers;
	}
});
Object.defineProperty(exports, "registerServiceHandlers", {
	enumerable: true,
	get: function() {
		return registerServiceHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddyBackgroundRuntimeHandlers", {
	enumerable: true,
	get: function() {
		return registerWorkbuddyBackgroundRuntimeHandlers;
	}
});
Object.defineProperty(exports, "registerWorkbuddyMainRuntimeHandlers", {
	enumerable: true,
	get: function() {
		return registerWorkbuddyMainRuntimeHandlers;
	}
});
Object.defineProperty(exports, "removeApplication", {
	enumerable: true,
	get: function() {
		return removeApplication;
	}
});
Object.defineProperty(exports, "resolveManifestSessionDir", {
	enumerable: true,
	get: function() {
		return resolveManifestSessionDir;
	}
});
Object.defineProperty(exports, "stripJsonComments", {
	enumerable: true,
	get: function() {
		return stripJsonComments;
	}
});
Object.defineProperty(exports, "upsertApplication", {
	enumerable: true,
	get: function() {
		return upsertApplication;
	}
});
Object.defineProperty(exports, "writeApplicationGenieFile", {
	enumerable: true,
	get: function() {
		return writeApplicationGenieFile;
	}
});
