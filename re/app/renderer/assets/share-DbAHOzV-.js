const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./message-transforms-CWx9piuG.js","./rolldown-runtime-V4kyJ4NV.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./task-preview-DGZWOuZ1.js","./ui-docs-viewer-Bo02yf1Q.js","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./StatusPlaceholder-XN-A3Gzo.js","./StatusPlaceholder-Ds6ACyNM.css","./is-mobile-ua-C84jYYLX.js","./ua-BYWN4Nkx.js","./PreviewIframe-BKA-68n9.js","./task-preview-DAyJvbXv.css"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $K as artifactSourceTool, BK as isExplicitArtifactSourceTool, I1 as t, K2 as init_environment, Q2 as isOverseas, Qrt as init_common, RK as init_artifact, U2 as getSharePlatformId, VK as isHiddenArtifactPath, _s as SHARE_TASK_UPLOAD_ARTIFACTS_FAILED_CODE, fit as ImportLocalFileSource, hs as SHARE_TASK_TITLE_CONTAINS_SENSITIVE_CONTENT_CODE, j1 as init_i18n, m5 as init_src, rrt as getArtifactFileIconKind, us as SHARE_TASK_BUILD_TEMPLATE_FAILED_CODE, vs as SHARE_TASK_UPLOAD_TEMPLATE_FAILED_CODE, ws as init_share_selection_utils, ys as ShareTaskError } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ov as __vitePreload, kv as init_preload_helper, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { St as extractArdotCanvasFileId, Tt as init_ardot_canvas, wt as extractArdotOpenDesignFileId, xt as buildArdotWebFileUrl } from "./ui-ardot-OEUzH9ni.js";
import { at as showStorageQuotaExceededDialog, ct as init_share_client_metric, dt as buildHtmlDependencyZip, it as init_storage_quota_exceeded_dialog, ot as createShareClientStageTimer, pt as init_share_html_zip, v as partitionOverseasUnsupportedArtifacts, y as shouldUseKnowledgeUpload } from "./locale-utils-TanlkH9x.js";
import { r as normalizeMessages, t as init_message_transforms } from "./message-transforms-CWx9piuG.js";
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/artifact-upload.ts
init_preload_helper();
init_src$1();
init_src();
init_environment();
init_artifact();
init_ardot_canvas();
init_share_client_metric();
init_common();
init_share_selection_utils();
init_share_html_zip();
var queuedUploadTasks = [];
var activeUploadTaskCount = 0;
function drainUploadTaskQueue() {
	while (activeUploadTaskCount < 10 && queuedUploadTasks.length > 0) {
		const task = queuedUploadTasks.shift();
		if (!task) return;
		activeUploadTaskCount += 1;
		task.run().finally(() => {
			activeUploadTaskCount -= 1;
			drainUploadTaskQueue();
		}).catch(() => {});
	}
}
function scheduleUploadTask(task) {
	return new Promise((resolve, reject) => {
		queuedUploadTasks.push({ run: async () => {
			try {
				resolve(await task());
			} catch (error) {
				reject(error);
			}
		} });
		drainUploadTaskQueue();
	});
}
async function runInUploadWorkerPool(items, worker) {
	let cursor = 0;
	let fatalError;
	const workerCount = Math.min(10, items.length);
	const runNext = async () => {
		while (cursor < items.length && fatalError == null) {
			const index = cursor;
			cursor += 1;
			await scheduleUploadTask(async () => {
				if (fatalError != null) return;
				try {
					await worker(items[index]);
				} catch (error) {
					fatalError ??= error;
				}
			});
		}
	};
	await Promise.all(Array.from({ length: workerCount }, () => runNext()));
	if (fatalError != null) throw fatalError;
}
/**
* 通过进程级动态 worker pool 上传所有产物到知识空间，返回 path → { url, type } 映射。
* 同时在飞的上传最多 10 个，任一任务完成后立即调度下一项。
* 单个产物上传失败时该 path 不出现在返回 Map 中，整体不 reject。
*/
async function uploadArtifacts(artifacts, backendProvider, knowledgeOptions) {
	const results = /* @__PURE__ */ new Map();
	if (!backendProvider.uploadToKnowledge) {
		console.warn("[uploadArtifacts] uploadToKnowledge not available, skip all artifacts");
		return results;
	}
	await runInUploadWorkerPool(artifacts, async (artifact) => {
		if (!artifact.blob) return;
		try {
			let uploadBlob = artifact.blob;
			let uploadName = artifact.name;
			if (artifact.name.toLowerCase().endsWith(".html") && artifact.readBlob) {
				const htmlText = await artifact.blob.text();
				const zipResult = await buildHtmlDependencyZip({
					entryPath: artifact.path,
					entryBlob: artifact.blob,
					entryText: htmlText,
					readBlob: artifact.readBlob,
					entryName: artifact.name
				});
				if (zipResult) {
					const stem = artifact.name.replace(/\.html?$/i, "");
					uploadBlob = zipResult.blob;
					uploadName = `${stem}.zip`;
				}
			}
			const res = await backendProvider.uploadToKnowledge(uploadBlob, uploadName, knowledgeOptions);
			if (res && "errorCode" in res && res.errorCode === 619610) {
				console.warn("[uploadArtifacts] artifact title blocked by moderation:", artifact.name);
				throw new ShareTaskError(SHARE_TASK_TITLE_CONTAINS_SENSITIVE_CONTENT_CODE);
			}
			if (res && "url" in res && res.url) results.set(artifact.path, {
				url: res.url,
				type: "knowledge",
				nodeId: res.nodeId,
				nodeKind: res.nodeKind,
				size: artifact.blob?.size
			});
		} catch (err) {
			if (err instanceof ShareTaskError) throw err;
			console.warn("[uploadArtifacts] failed to upload artifact:", artifact.name, err);
		}
	});
	return results;
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/common/share-ardot-virtual.ts
var ARDOT_DESIGN_APP_IDS = /* @__PURE__ */ new Set(["ardot/create_design", "ardot/open_design"]);
/**
* 是否可作为分享卡片的 ArDot 虚拟产物。
*
* 覆盖：
* - 存量 `ardot_canvas`（`ardot://canvas/<fileId>`）
* - 新引擎统一写路径 `mcp_app` + ArDot appId / URI
*/
function isArdotVirtualShareArtifact(artifact) {
	if (artifact.type === "ardot_canvas") return Boolean(extractArdotCanvasFileId({ uri: artifact.uri }));
	if (artifact.type !== "mcp_app") return false;
	const appId = artifact._meta?.appId;
	if (typeof appId === "string" && ARDOT_DESIGN_APP_IDS.has(appId)) return true;
	return Boolean(extractArdotCanvasFileId({ uri: artifact.uri }));
}
/**
* 从会话产物列表中提取 ardot 画布等虚拟产物，构造为可直接注入 artifactUrlMap 的条目。
*
* ardot 产物的 uri 是虚拟 URI（不在 cwd 文件系统中），
* 无法通过 readCwdArtifacts 扫描或 uploadArtifacts 上传。但它们已有公开访问 URL
*（`https://ardot.tencent.com/file/<fileId>` 或 `_meta.publicUrl`），可直接作为分享卡片的跳转链接。
*
* 返回的条目由 createTemplateShare / createStaticShare 在 uploadArtifacts 之后
* merge 进 artifactUrlMap，使分享模板的 groupShareArtifacts 能将其归入 bottom 区展示。
*/
function collectArdotVirtualArtifacts(artifacts, messages) {
	const fileIdToRequestId = buildArdotFileIdRequestIdMap(messages);
	const result = [];
	for (const artifact of artifacts) {
		if (!isArdotVirtualShareArtifact(artifact)) continue;
		const fileId = resolveArdotShareFileId(artifact);
		if (!fileId) continue;
		const url = resolveArdotSharePublicUrl(artifact, fileId);
		if (!url) continue;
		const requestId = pickArtifactRequestId$1(artifact._meta) ?? fileIdToRequestId.get(fileId) ?? (artifact.title ? fileIdToRequestId.get(`__fileName__${artifact.title}`) : void 0);
		result.push({
			path: artifact.uri,
			name: artifact.title || artifact.name || "Ardot 画布",
			url,
			type: "ardot",
			iconKind: "ardot",
			size: artifact.size,
			requestId
		});
	}
	return result;
}
/** 从 mcp_app / ardot_canvas 解析 fileId */
function resolveArdotShareFileId(artifact) {
	const fromUri = extractArdotCanvasFileId({ uri: artifact.uri });
	if (fromUri) return fromUri;
	const stableId = artifact._meta?.stableId;
	if (typeof stableId === "string" && stableId.trim()) return stableId.trim();
	const toolResult = artifact._meta?.toolResult;
	if (toolResult && typeof toolResult === "object") {
		const fileId = toolResult.structuredContent?.fileId;
		if (typeof fileId === "string" || typeof fileId === "number") return String(fileId);
	}
}
/** 优先用入库时投影的 publicUrl，否则按 fileId 构造站点直链 */
function resolveArdotSharePublicUrl(artifact, fileId) {
	const publicUrl = artifact._meta?.publicUrl;
	if (typeof publicUrl === "string" && publicUrl.trim()) return publicUrl.trim();
	return buildArdotWebFileUrl(fileId);
}
/** 扫描 ardot create/open_design 工具调用，建立 fileId/fileName → requestId 映射 */
function buildArdotFileIdRequestIdMap(messages) {
	const map = /* @__PURE__ */ new Map();
	const fileNameToRequestId = /* @__PURE__ */ new Map();
	if (!messages) return map;
	for (const raw of messages) {
		const msg = raw;
		if (!msg.requestId || !Array.isArray(msg.content)) continue;
		for (const block of msg.content) {
			if (block.type !== "tool-call" || !block.tool) continue;
			const kind = resolveArdotDesignToolKind(block.tool.name || "");
			if (!kind) continue;
			const argsFileName = block.tool.args?.fileName;
			const hasFileName = typeof argsFileName === "string" && argsFileName.length > 0;
			const fileId = extractArdotToolCallFileId(kind, block.tool);
			if (fileId != null && map.has(fileId) && (!hasFileName || fileNameToRequestId.has(argsFileName))) continue;
			if (fileId && !map.has(fileId)) map.set(fileId, msg.requestId);
			if (hasFileName && !fileNameToRequestId.has(argsFileName)) fileNameToRequestId.set(argsFileName, msg.requestId);
		}
	}
	for (const [name, rid] of fileNameToRequestId.entries()) map.set(`__fileName__${name}`, rid);
	return map;
}
/**
* 识别 create_design / open_design 工具名。
*
* 兼容：mcp__ardot__*、ardot_*、connector-proxy 改写名、裸名。
*/
function resolveArdotDesignToolKind(toolName) {
	const normalized = toolName.trim().toLowerCase();
	if (!normalized) return;
	if (normalized === "create_design" || normalized.endsWith("__create_design") || normalized.endsWith("_create_design") || normalized.endsWith("/create_design")) return "create_design";
	if (normalized === "open_design" || normalized.endsWith("__open_design") || normalized.endsWith("_open_design") || normalized.endsWith("/open_design")) return "open_design";
}
/** 从 ardot 工具调用提取 fileId：create_design 取 result，open_design 取 args.fileUrl */
function extractArdotToolCallFileId(kind, tool) {
	if (kind === "create_design") return extractFileIdFromToolResult(tool.result);
	const fileUrl = tool.args?.fileUrl;
	if (typeof fileUrl === "string") return extractArdotOpenDesignFileId(fileUrl);
	if (typeof fileUrl === "number") return String(fileUrl);
}
/** 兼容旧扁平 result.fileId 与新 MCP structuredContent.fileId */
function extractFileIdFromToolResult(result) {
	if (!result || typeof result !== "object") return;
	const record = result;
	if (typeof record.fileId === "string" || typeof record.fileId === "number") return String(record.fileId);
	const structured = record.structuredContent;
	if (structured && typeof structured === "object") {
		const fileId = structured.fileId;
		if (typeof fileId === "string" || typeof fileId === "number") return String(fileId);
	}
}
/** 从 _meta 提取 requestId（容错 requestId / codebuddy.ai/requestId 两种 key） */
function pickArtifactRequestId$1(meta) {
	if (!meta) return;
	const candidate = meta.requestId ?? meta["codebuddy.ai/requestId"];
	return typeof candidate === "string" && candidate ? candidate : void 0;
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/dom-snapshot-share/share-cwd-artifacts.ts
/**
* 扫描工作目录，返回可上传的文件列表（两层深度，只处理含 html 的一级子目录）。
* cwd 不存在或 readDirByPath 不可用时返回 undefined。
*/
async function readCwdArtifacts(cwd, readDirByPath) {
	if (!cwd || !readDirByPath) return;
	const isHiddenFile = (name) => name.startsWith(".") || name === "Thumbs.db" || name === "desktop.ini";
	try {
		const dirResult = await readDirByPath(cwd);
		if (!dirResult.success || !dirResult.entries) return;
		const allFiles = [];
		for (const entry of dirResult.entries) {
			if (isHiddenFile(entry.name)) continue;
			if (entry.isFile) allFiles.push(entry);
			else if (entry.isDirectory) try {
				const subPath = entry.path || `${cwd}/${entry.name}`;
				const subResult = await readDirByPath(subPath);
				if (!subResult.success || !subResult.entries) continue;
				if (!subResult.entries.some((e) => e.isFile && /\.html?$/i.test(e.name))) continue;
				for (const subEntry of subResult.entries) if (subEntry.isFile && !isHiddenFile(subEntry.name)) {
					const ext = subEntry.name.slice(subEntry.name.lastIndexOf("."));
					const displayName = /^index\.html?$/i.test(subEntry.name) ? `${entry.name}${ext}` : subEntry.name;
					const absolutePath = subEntry.path || `${subPath}/${subEntry.name}`;
					allFiles.push({
						...subEntry,
						path: absolutePath,
						name: displayName
					});
				}
			} catch {}
		}
		return allFiles.length > 0 ? allFiles : void 0;
	} catch {
		return;
	}
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/common/share-task-utils.ts
/** 默认分享标题（当审核不通过或标题为空时使用的兜底标题） */
var DEFAULT_SHARE_TITLE = "Workbuddy Preview";
/** 分享文件过大的后端错误码 */
var SHARE_TASK_FILE_TOO_LARGE_CODE = 10001;
/** 替换分享 URL 中的 platform 参数为当前产品标识 */
function adaptShareUrl(url) {
	if (!url) return url;
	return url.replace(/([?&])platform=\w+/, `$1platform=${getSharePlatformId()}`);
}
/** 递归判断错误是否为「分享文件过大」错误（后端 code=10001，可能嵌套在 msg/message/error 中） */
function isShareTaskFileTooLargeError(error) {
	if (!error) return false;
	if (typeof error === "object") {
		const obj = error;
		if (obj.code === SHARE_TASK_FILE_TOO_LARGE_CODE) return true;
		return isShareTaskFileTooLargeError(obj.msg ?? obj.message ?? obj.error);
	}
	return false;
}
/**
* 收集选中消息的所有产物归属键。
*
* 消息侧 `requestId` 是 ACP 的 request id（`req-...`），而产物 `_meta.requestId`
* 存的是 traceId（= 消息 `extra.conversationRequestId` / `extra.traceId`），两者值域不同。
* 直接用 `m.requestId === a.requestId` 比会恒不等，导致部分选择时产物被整段丢弃（#99352）。
* 这里把两种维度的键都收进集合，产物命中任一即算归属。
*/
function collectMessageRequestIds(messages) {
	const ids = /* @__PURE__ */ new Set();
	for (const msg of messages) {
		if (msg.requestId) ids.add(msg.requestId);
		const extra = msg.extra;
		if (typeof extra?.conversationRequestId === "string" && extra.conversationRequestId) ids.add(extra.conversationRequestId);
		if (typeof extra?.traceId === "string" && extra.traceId) ids.add(extra.traceId);
	}
	return ids;
}
/** requestId → [startedAt, nextStartedAt) 时间窗，供 groupShareArtifacts 兜底归属。与对话流逻辑一致。 */
function buildMessageTimeWindows(messages) {
	const requestIdTimeMap = /* @__PURE__ */ new Map();
	for (const msg of messages) {
		if (!msg.requestId || typeof msg.createTime !== "number") continue;
		const existing = requestIdTimeMap.get(msg.requestId);
		if (existing === void 0 || msg.createTime < existing) requestIdTimeMap.set(msg.requestId, msg.createTime);
	}
	const sorted = [...requestIdTimeMap.entries()].sort((a, b) => a[1] - b[1]);
	return sorted.map(([requestId, startedAt], i) => ({
		requestId,
		startedAt,
		nextStartedAt: sorted[i + 1]?.[1]
	}));
}
/**
* createdAt 是否落入「选中轮次」的时间窗 [startedAt, nextStartedAt)。
*
* 时间窗须基于完整会话消息构建（窗边界为真实相邻轮），这里再要求命中的窗其 requestId
* 属于选区，避免选区不连续（跳选）时窗跨越未选中轮次、把中间轮产物误纳入（跨轮次泄露）。
*/
function isCreatedAtInSelectedWindow(createdAt, selectedRequestIds, windows) {
	if (typeof createdAt !== "number") return false;
	return windows.some((tw) => selectedRequestIds.has(tw.requestId) && createdAt >= tw.startedAt && (tw.nextStartedAt === void 0 || createdAt < tw.nextStartedAt));
}
/**
* 判定文件产物是否归属于当前选区（部分选择时使用）。
*
* 归属优先级：
* 1. 产物 requestId（traceId）命中选中消息的归属键集合 → 保留；
* 2. 命不中（含无 requestId 的孤儿产物：对应轮次不在快照 messages 里，如分会话产物）
*    → 回退到 createdAt 时间窗兜底，仅落入「选中轮次」的窗才保留。
*
* @param windows 须基于**完整会话消息**构建（非仅选区），否则跳选时窗会跨越未选中轮次导致泄露。
*/
function isFileArtifactInSelection(artifact, selectedRequestIds, windows) {
	if (artifact.requestId && selectedRequestIds.has(artifact.requestId)) return true;
	return isCreatedAtInSelectedWindow(artifact.createdAt, selectedRequestIds, windows);
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/common/share-icon-fill.ts
/**
* 分享产物图标 kind 回填
*
* 从 share-template-utils.ts 拆出（原文件超 utils 硬阈值 500）。
*/
/**
* 给文件产物 entry 补 iconKind（foundation ArtifactFileIconKind）。
*
* 文件产物的 entry 由 uploadArtifacts 返回（只有 url/type/size，无 iconKind）。
* 这里按 artifacts 入参的 name 推断 foundation kind 写入 entry.iconKind，
* 供分享模板按 kind 渲染图标，免去模板自行按扩展名推断（漂移根源）。
* 虚拟产物（ardot 等）的 iconKind 已在 merge 时带入，跳过。
*/
function fillFileIconKind(artifactUrlMap, artifacts) {
	const nameByPath = new Map(artifacts.map((a) => [a.path, a.name]));
	for (const [key, entry] of artifactUrlMap) {
		if (entry.iconKind) continue;
		const fileName = nameByPath.get(key) ?? key.replace(/[\\/]/g, "/").split("/").pop() ?? key;
		entry.iconKind = getArtifactFileIconKind(fileName);
	}
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/template-share/share-message-preparation.ts
async function prepareTemplateShareMessages(messages, messageFormat = "legacy-events") {
	if (messageFormat === "canonical") return [...messages];
	const { normalizeMessages } = await __vitePreload(async () => {
		const { normalizeMessages } = await import("./message-transforms-CWx9piuG.js").then((n) => (n.t(), n.n));
		return { normalizeMessages };
	}, __vite__mapDeps([0,1]), import.meta.url);
	return normalizeMessages(messages);
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/template-share/share-template-utils.ts
init_common();
init_share_selection_utils();
init_environment();
init_preload_helper();
/**
* 将消息中所有命中 artifactUrlMap 的本地路径替换为在线 URL。
*
* 遍历策略：递归 walk message 树，对所有 string 叶子值，
* 若其等于（或 basename 命中）artifactUrlMap 的 key，则替换为对应 url。
*/
function replaceLocalPathsInMessages(messages, artifactUrlMap) {
	if (artifactUrlMap.size === 0) return messages;
	const byBasename = /* @__PURE__ */ new Map();
	for (const [key, val] of artifactUrlMap) {
		const base = key.replace(/\\/g, "/").split("/").pop();
		if (base) byBasename.set(base, val.url);
	}
	const looksLikePath = (s) => /[\\/]/.test(s) || /^\.{1,2}\//.test(s) || /^~\//.test(s) || /^[A-Za-z]:[\\/]/.test(s);
	const resolve = (s) => {
		const hit = artifactUrlMap.get(s);
		if (hit) return hit.url;
		if (!looksLikePath(s)) return;
		const base = s.replace(/\\/g, "/").split("/").pop();
		return base ? byBasename.get(base) : void 0;
	};
	const walk = (node) => {
		if (typeof node === "string") return resolve(node) ?? node;
		if (Array.isArray(node)) return node.map(walk);
		if (node && typeof node === "object") {
			const out = {};
			for (const k of Object.keys(node)) out[k] = walk(node[k]);
			return out;
		}
		return node;
	};
	return messages.map((msg) => walk(msg));
}
/**
* 从当前宿主环境检测主题模式
*
* 优先级：data-vscode-theme-kind > body class (.light/.dark) > 默认 light
*/
function detectHostTheme() {
	const themeKind = document.documentElement.getAttribute("data-vscode-theme-kind");
	if (themeKind === "vscode-light") return "light";
	if (themeKind?.includes("dark")) return "dark";
	if (document.body.classList.contains("light") || document.documentElement.classList.contains("light")) return "light";
	if (document.body.classList.contains("dark") || document.documentElement.classList.contains("dark")) return "dark";
	return "light";
}
/**
* 模板分享流程：上传产物 → 构建 JSON → 调 backendProvider.uploadShareTemplate。
* 模板 HTML 走 CDN，分享数据分离为同级 conversation-data.json，落地页运行时 fetch 渲染。
*/
async function createTemplateShare(params) {
	const { messages, messageFormat = "legacy-events", artifacts, name, assistantName, shareCode, backendProvider, taskId, owner, showBottomArtifacts, isConversation, virtualArtifacts, messageTimeWindows, onProgress } = params;
	let uploadableArtifacts = artifacts;
	if (isOverseas()) {
		const { kept, dropped } = partitionOverseasUnsupportedArtifacts(artifacts, (a) => a.name);
		if (dropped.length > 0) console.warn("[createTemplateShare] skip overseas-unsupported artifacts (office/pdf):", dropped.map((d) => d.name).join(", "));
		uploadableArtifacts = kept;
	}
	onProgress?.({
		phase: "uploading-artifacts",
		artifactsDone: 0,
		artifactsTotal: uploadableArtifacts.length
	});
	const { uploadArtifacts } = await __vitePreload(async () => {
		const { uploadArtifacts } = await import("./artifact-upload-DJ6F0gdG.js");
		return { uploadArtifacts };
	}, [], import.meta.url);
	const artifactUploadTimer = createShareClientStageTimer("upload_knowledge", "conversation", name);
	let artifactUrlMap;
	try {
		artifactUrlMap = await uploadArtifacts(uploadableArtifacts, { uploadToKnowledge: backendProvider.uploadToKnowledge?.bind(backendProvider) }, {
			taskId,
			taskName: name,
			owner,
			ownerType: taskId ? 1 : 0,
			isConversation,
			supportShare: false,
			source: ImportLocalFileSource.LOCAL_CONVERSATION_SHARE,
			shouldHide: true
		});
	} catch (e) {
		artifactUploadTimer.end("failed", e instanceof Error ? e.message : String(e));
		throw e instanceof ShareTaskError ? e : new ShareTaskError(SHARE_TASK_UPLOAD_ARTIFACTS_FAILED_CODE, e instanceof Error ? e.message : String(e));
	}
	artifactUploadTimer.end(artifactUrlMap.size >= uploadableArtifacts.length ? "success" : "failed", artifactUrlMap.size < uploadableArtifacts.length ? `uploaded=${artifactUrlMap.size}/${uploadableArtifacts.length}` : void 0);
	onProgress?.({
		phase: "uploading-artifacts",
		artifactsDone: artifactUrlMap.size,
		artifactsTotal: uploadableArtifacts.length
	});
	fillFileIconKind(artifactUrlMap, uploadableArtifacts);
	const metaByPath = new Map(uploadableArtifacts.map((a) => [a.path, {
		requestId: a.requestId,
		createdAt: a.createdAt
	}]));
	for (const [key, entry] of artifactUrlMap) {
		const meta = metaByPath.get(key);
		if (meta) {
			if (meta.requestId) entry.requestId = meta.requestId;
			if (meta.createdAt != null) entry.createdAt = meta.createdAt;
		}
	}
	if (virtualArtifacts && virtualArtifacts.length > 0) {
		for (const va of virtualArtifacts) if (!artifactUrlMap.has(va.path)) artifactUrlMap.set(va.path, {
			url: va.url,
			type: va.type,
			iconKind: va.iconKind,
			name: va.name,
			size: va.size,
			requestId: va.requestId
		});
	}
	const __buildTimer = createShareClientStageTimer("build_html", "conversation", name);
	let shareData;
	try {
		const messagesWithUrls = replaceLocalPathsInMessages(await prepareTemplateShareMessages(messages, messageFormat), artifactUrlMap);
		shareData = {
			version: 1,
			name,
			assistantName,
			shareCode,
			theme: detectHostTheme(),
			messages: messagesWithUrls,
			artifactMap: Object.fromEntries(artifactUrlMap.entries()),
			showBottomArtifacts: showBottomArtifacts === true,
			messageTimeWindows
		};
	} catch (e) {
		__buildTimer.end("failed", e instanceof Error ? e.message : String(e));
		throw e instanceof ShareTaskError ? e : new ShareTaskError(SHARE_TASK_BUILD_TEMPLATE_FAILED_CODE, e instanceof Error ? e.message : String(e));
	}
	__buildTimer.end("success");
	onProgress?.({ phase: "uploading-html" });
	if (!backendProvider.uploadShareTemplate) throw new ShareTaskError(SHARE_TASK_UPLOAD_TEMPLATE_FAILED_CODE, "uploadShareTemplate is not available on backendProvider");
	const __templateTimer = createShareClientStageTimer("upload_template", "conversation", name);
	const uploadResult = await backendProvider.uploadShareTemplate({
		dataJson: JSON.stringify(shareData),
		name,
		shouldHide: true
	});
	if ("reason" in uploadResult) {
		__templateTimer.end("failed", uploadResult.reason);
		if (uploadResult.errorCode) throw new ShareTaskError(uploadResult.errorCode, uploadResult.reason);
		throw new ShareTaskError(SHARE_TASK_UPLOAD_TEMPLATE_FAILED_CODE, uploadResult.reason);
	}
	__templateTimer.end("success");
	const shareLink = uploadResult.shareLink || uploadResult.viewUrl;
	if (!shareLink) throw new ShareTaskError(SHARE_TASK_UPLOAD_TEMPLATE_FAILED_CODE, "uploadShareTemplate returned empty shareLink");
	if (uploadResult.nodeId && backendProvider.batchMoveKnowledgeNodes) {
		const artifactNodeIds = Array.from(artifactUrlMap.values()).filter((r) => r.type === "knowledge" && r.nodeId).map((r) => r.nodeId);
		if (artifactNodeIds.length > 0) backendProvider.batchMoveKnowledgeNodes(uploadResult.nodeId, artifactNodeIds).catch((err) => console.warn("[createTemplateShare] batchMove error:", err));
	}
	onProgress?.({ phase: "done" });
	return {
		success: true,
		shareLink,
		viewUrl: uploadResult?.viewUrl ?? shareLink
	};
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/template-share/share-selection-artifacts.ts
/**
* 选区分享的产物采集纯工具（新方案 createTemplateShare 用）。
*
* 自 use-share-selection-channels 抽离：从会话产物索引采集文件产物（读 blob）+ ardot 虚拟产物，
* 供 createTemplateShare 上传/注入。与 React 状态无关，让 hook 聚焦于流程编排。
*
* 注：旧的「读产物索引 + 走 uploadShareTaskFile 上传」逻辑（readShareArtifacts / uploadShareArtifacts）
* 由 hooks/share-selection-helpers.ts 的 fallback 路径承载，此处不再重复维护。
*/
init_preload_helper();
/**
* 将产物 uri 解析为可上传的本地文件绝对路径。
*
* 镜像 Desktop 主进程 extractFilePath 的解析规则（file:// / agent://files/ / 绝对路径），
* 但运行在 renderer/浏览器环境，故用 URL + decodeURIComponent 手工解析（不依赖 node 的 url 模块）。
* 逻辑类产物（ardot://canvas/... / file-changes://... / plan / tasks 等）无法解析为本地文件，
* 返回 undefined，由调用方跳过上传。
*/
function resolveArtifactFilePath(uri) {
	if (!uri) return;
	if (uri.startsWith("agent://files/")) return uri.slice(14);
	if (uri.startsWith("file://")) try {
		const parsed = new URL(uri);
		let p = decodeURIComponent(parsed.pathname);
		if (/^\/[a-zA-Z]:/.test(p)) p = p.slice(1);
		return p;
	} catch {
		const raw = uri.slice(7);
		try {
			return decodeURIComponent(raw);
		} catch {
			return raw;
		}
	}
	if (uri.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(uri)) return uri;
}
/** 从 _meta 提取 requestId（容错 requestId / codebuddy.ai/requestId 两种 key） */
function pickArtifactRequestId(meta) {
	if (!meta) return;
	const candidate = meta.requestId ?? meta["codebuddy.ai/requestId"];
	return typeof candidate === "string" && candidate ? candidate : void 0;
}
/** 从 artifactFacade 获取会话产物（与对话流同源）。文件产物读 blob；ardot_canvas / mcp_app(Ardot) 走 collectArdotVirtualArtifacts。 */
async function collectShareArtifacts(artifactFacade, sessionId, readFile, messages) {
	if (!sessionId || !artifactFacade) return {
		fileArtifacts: [],
		virtualArtifacts: []
	};
	let artifacts;
	try {
		artifacts = await artifactFacade.getSessionArtifacts(sessionId);
	} catch {
		return {
			fileArtifacts: [],
			virtualArtifacts: []
		};
	}
	if (!Array.isArray(artifacts) || artifacts.length === 0) return {
		fileArtifacts: [],
		virtualArtifacts: []
	};
	const fileArtifacts = [];
	const ardotArtifacts = [];
	for (const artifact of artifacts) {
		if (isHiddenArtifactPath(artifact.uri)) continue;
		if (!isExplicitArtifactSourceTool(artifactSourceTool(artifact))) continue;
		if (artifact.type === "ardot_canvas" || artifact.type === "mcp_app") {
			ardotArtifacts.push(artifact);
			continue;
		}
		if (artifact.type === "implementation-plan" || artifact.type === "task" || artifact.type === "overview" || artifact.type === "file-changes") continue;
		const filePath = resolveArtifactFilePath(artifact.uri);
		if (!filePath) continue;
		const requestId = pickArtifactRequestId(artifact._meta);
		const name = artifact.title || artifact.name || filePath.replace(/[\\/]/g, "/").split("/").pop() || "file";
		let blob;
		if (readFile) try {
			blob = (await readFile(sessionId, filePath, "blob"))?.content;
		} catch {}
		fileArtifacts.push({
			path: filePath,
			name,
			blob,
			requestId,
			createdAt: artifact.createdAt,
			readBlob: async (depPath) => {
				if (!readFile) return null;
				try {
					return (await readFile(sessionId, depPath, "blob"))?.content ?? null;
				} catch {
					return null;
				}
			}
		});
	}
	let virtualArtifacts = [];
	if (ardotArtifacts.length > 0) {
		const { collectArdotVirtualArtifacts } = await __vitePreload(async () => {
			const { collectArdotVirtualArtifacts } = await import("./share-ardot-virtual-Bwx9VJZj.js");
			return { collectArdotVirtualArtifacts };
		}, [], import.meta.url);
		virtualArtifacts = collectArdotVirtualArtifacts(ardotArtifacts, messages);
	}
	return {
		fileArtifacts,
		virtualArtifacts
	};
}
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/dom-serializer.ts
/**
* DOM 序列化工具
*
* 将已渲染的 React DOM 节点序列化为完整的单文件 HTML。
* 提取页面所有运行时 CSS（含 CSS Modules hash 类），内联进 HTML。
*
* 使用方式：
*   1. 在隐藏容器中渲染 ShareTaskPreview
*   2. 等 conversation-render 全量 DOM 和异步渲染内容稳定
*   3. 调用 serializeDomToHtml(container, name) 拿到完整 HTML
*/
/**
* 快照当前页面的关键 CSS 变量的**计算值**（resolved value）。
*
* - cb-chat-ui / 分享页变量：沿用旧逻辑，保证静态 HTML 保留宿主主题色。
* - conversation-render 变量：只抽取已计算好的 --cr-* 自有变量，不桥接到 --cb-*，
*   避免静态 HTML 脱离 Vite CSS 注入后丢失对话流颜色。
*
* 注意：cb-chat-ui 的 _theme-dark.scss 把变量定义在 `body { }` 上，
* 优先级高于 :root，所以快照也必须写在 body 上才能覆盖。
*/
function snapshotCssVariables() {
	const bodyEl = document.body;
	const computed = window.getComputedStyle(bodyEl);
	const vars = [
		"--cb-vscode-editor-background",
		"--cb-vscode-foreground",
		"--cb-vscode-widget-border",
		"--cb-vscode-titleBar-activeBackground",
		"--cb-vscode-descriptionForeground",
		"--cb-vscode-editorLineNumber-foreground",
		"--cb-vscode-sideBar-background",
		"--cb-vscode-input-background",
		"--cb-text-primary",
		"--cb-text-secondary",
		"--cb-text-muted",
		"--cb-bg-primary",
		"--cb-bg-secondary",
		"--cb-border",
		"--cb-button-primary",
		"--vscode-editor-background",
		"--vscode-editor-foreground",
		"--vscode-foreground",
		"--vscode-widget-border",
		"--cr-md-root",
		"--cr-text-primary",
		"--cr-text-secondary",
		"--cr-text-tertiary",
		"--cr-text-disabled",
		"--cr-text-link",
		"--cr-text-link-hover",
		"--cr-text-success",
		"--cr-text-error",
		"--cr-bg-primary",
		"--cr-bg-primary-default",
		"--cr-bg-secondary",
		"--cr-bg-tertiary",
		"--cr-bg-code",
		"--cr-bg-code-header",
		"--cr-bg-hover",
		"--cr-border-default",
		"--cr-border-strong",
		"--cr-icon-primary",
		"--cr-status-success",
		"--cr-status-error",
		"--cr-status-warning",
		"--cr-status-info",
		"--cr-error-color",
		"--cr-user-bubble-bg",
		"--cr-scrollbar-thumb",
		"--cr-scrollbar-thumb-hover",
		"--cr-brand-primary",
		"--cr-code-fg",
		"--cr-code-comment",
		"--cr-code-keyword",
		"--cr-code-entity",
		"--cr-code-constant",
		"--cr-code-string",
		"--cr-code-builtin",
		"--cr-code-tag"
	];
	const entries = [];
	for (const v of vars) {
		const val = computed.getPropertyValue(v).trim();
		if (val) entries.push(`  ${v}: ${val} !important;`);
	}
	if (entries.length === 0) return "";
	return `:root, body {\n${entries.join("\n")}\n}`;
}
/**
* 收集当前页面所有 <style> 标签和 <link rel="stylesheet"> 的 CSS 文本。
* 包含 CSS Modules 生成的 hash 类名样式。
*/
function collectPageStyles() {
	const parts = [];
	for (const el of document.querySelectorAll("style")) if (el.textContent) parts.push(el.textContent);
	for (const link of document.querySelectorAll("link[rel=\"stylesheet\"]")) try {
		for (const sheet of document.styleSheets) if (sheet.href === link.href) {
			const rules = Array.from(sheet.cssRules ?? []).map((r) => r.cssText).join("\n");
			if (rules) parts.push(rules);
		}
	} catch {}
	return parts.join("\n");
}
/**
* 将渲染完成的 DOM 节点序列化为完整单文件 HTML。
*
* @param rootEl 已渲染的根 DOM 节点（ShareTaskPreview 外层隐藏容器）
* @param name 分享名称（用于 <title>）
* @param artifactUrlMap 产物路径 → 可访问链接映射
* @param shareCode 任务分享码
* @param iconFontCss 内联图标字体的 @font-face CSS（由 inlineIconFontsCss 产出）
*/
/** 序列化元素的 class 和 data-* 属性为 HTML attribute 字符串 */
function serializeAttrs(el, allowList) {
	const parts = [];
	for (const attr of Array.from(el.attributes)) if (allowList.includes(attr.name) || attr.name.startsWith("data-")) parts.push(`${attr.name}="${attr.value.replace(/"/g, "&quot;")}"`);
	return parts.length ? " " + parts.join(" ") : "";
}
function serializeDomToHtml(rootEl, name, artifactUrlMap, shareCode, iconFontCss) {
	const escapedTitle = (name ? `${name} - WorkBuddy` : "WorkBuddy").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const htmlAttrs = serializeAttrs(document.documentElement, [
		"class",
		"lang",
		"style"
	]);
	const bodyAttrs = serializeAttrs(document.body, ["class", "style"]);
	const css = collectPageStyles();
	const cssVarsSnapshot = snapshotCssVariables();
	const stpContainer = rootEl.firstElementChild;
	if (!stpContainer) return "<!DOCTYPE html><html><body><p>No content</p></body></html>";
	const bodyHtml = cleanDomForStatic(stpContainer, artifactUrlMap);
	const artifactMapJson = artifactUrlMap && artifactUrlMap.size > 0 ? JSON.stringify(Object.fromEntries(artifactUrlMap.entries())) : "{}";
	return `<!DOCTYPE html>
<html lang="zh-CN"${htmlAttrs}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">${shareCode ? `\n  <meta name="workbuddy-task-share-code" content="${shareCode.replace(/"/g, "&quot;")}">` : ""}
  <script>window.__ARTIFACT_MAP__ = ${artifactMapJson};<\/script>
  <title>${escapedTitle}</title>
  <style>
    /* ── 覆盖主应用全局样式 ── */
    html, body { height: 100% !important; margin: 0 !important; overflow: auto !important; }
    #root { overflow: visible !important; height: auto !important; }
    /* 隐藏回到底部按钮 */
    .cr-scroll-to-bottom,
    .cr-message-list__bottom-mask { display: none !important; }
    /* 隐藏分享预览宿主控件，静态 HTML 只保留对话流和产物交互 */
    /* .stp-mobile-drawer：≤1536px 视口下会 fixed 到屏幕右侧外并带 -8px 阴影，
       投射到视口最右侧形成一条阴影，静态 HTML 用不到中/右列，直接隐藏 */
    .stp-middle, .stp-right, .stp-resize-divider,
    .stp-replay-bar, .stp-mobile-fab, .stp-mobile-nav-btn,
    .stp-mobile-drawer, .stp-mobile-drawer-mask { display: none !important; }
    /* 左列占满全宽，取消固定高度限制改为自动撑高 */
    .stp-container { height: auto !important; min-height: 100vh; }
    .stp-left {
      flex: 1 1 100% !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow: visible !important;
      height: auto !important;
      padding-bottom: 48px !important;
    }
    .stp-left__inner { height: auto !important; }
    .stp-left__messages {
      overflow: visible !important;
      height: auto !important;
      flex: none !important;
    }
    .cr-message-list-viewport,
    .cr-message-list,
    .cr-message-list__content {
      overflow: visible !important;
      height: auto !important;
      flex: none !important;
    }
    .cr-message-list__content {
      opacity: 1 !important;
      visibility: visible !important;
    }
    /* 静态 widget 容器：内联 widget_code 的隔离展示区，防溢出 + 自适应高度 */
    .stp-static-widget {
      width: 100%;
      margin: 12px 0;
      overflow: auto;
      border-radius: 8px;
    }
    .stp-static-widget > * { max-width: 100%; }
  </style>
  <style>${css}</style>
  <!-- 图标字体内联：放在收集 CSS 之后，覆盖原 @font-face 的失效 url，保证文件类型图标渲染 -->
  <style>${iconFontCss ?? ""}</style>
  <!-- 主题变量快照：放在最后确保覆盖主题 CSS 里的 body { --cb-vscode-* } 定义 -->
  <style>${cssVarsSnapshot}</style>
  <!-- 滚动条细化：覆盖主应用收集进来的较粗滚动条样式，改细 + 圆角 -->
  <style>
    *::-webkit-scrollbar { width: 8px !important; height: 8px !important; }
    *::-webkit-scrollbar-track { background: transparent !important; }
    *::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.4) !important;
      border-radius: 4px !important;
      border: 2px solid transparent !important;
      background-clip: padding-box !important;
    }
    *::-webkit-scrollbar-thumb:hover { background: rgba(128, 128, 128, 0.6) !important; }
    *::-webkit-scrollbar-corner { background: transparent !important; }
    * { scrollbar-width: thin !important; scrollbar-color: rgba(128,128,128,0.4) transparent !important; }
  </style>
</head>
<body${bodyAttrs}>
${bodyHtml}
<script>
(function() {
  // ── 工具函数 ──
  function setExpandableVisible(shell, visible, expandedClass) {
    if (!shell) return;
    if (expandedClass) {
      shell.classList.toggle(expandedClass, visible);
    }
    shell.style.display = '';
    shell.style.height = visible ? 'auto' : '0px';
    shell.style.visibility = visible ? 'visible' : 'hidden';
    shell.style.opacity = visible ? '1' : '0';
    shell.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  // ── 1. conversation-render 折叠块 ──
  document.addEventListener('click', function(e) {
    var crHeader = e.target && e.target.closest && e.target.closest('.cr-collapse__header');
    if (crHeader) {
      var crCollapse = crHeader.closest('.cr-collapse');
      var crContent = crCollapse && crCollapse.querySelector('.cr-collapse__content');
      if (crCollapse && crContent) {
        var nextCollapsed = !crCollapse.classList.contains('cr-collapse--collapsed');
        crCollapse.classList.toggle('cr-collapse--collapsed', nextCollapsed);
        crContent.style.display = nextCollapsed ? 'none' : '';
        crContent.style.height = nextCollapsed ? '0px' : 'auto';
        crContent.style.visibility = nextCollapsed ? 'hidden' : 'visible';
        crContent.style.opacity = nextCollapsed ? '0' : '1';
        crContent.setAttribute('aria-hidden', nextCollapsed ? 'true' : 'false');
        return;
      }
    }
  });

  // ── 2. conversation-render 工具内部展开 ──
  // ToolExpandable / ToolDisplayList 的展开状态由 React state 管理；
  // 静态 HTML 中补一层原生 toggle，让工具详情、参数和结果仍可展开查看。
  document.addEventListener('click', function(e) {
    var target = e.target;
    if (!target || !target.closest) return;

    var displayList = target.closest('.cr-tool-display-list--clickable');
    if (displayList && !target.closest('.cr-tool-display-list__detail-shell')) {
      var detailShell = displayList.querySelector('.cr-tool-display-list__detail-shell');
      if (detailShell) {
        var nextDisplayExpanded = !detailShell.classList.contains('cr-tool-display-list__detail-shell--expanded');
        setExpandableVisible(
          detailShell,
          nextDisplayExpanded,
          'cr-tool-display-list__detail-shell--expanded'
        );
        var displayHead = displayList.querySelector('.cr-tool-head');
        if (displayHead) {
          displayHead.classList.toggle('cr-tool-head--expanded', nextDisplayExpanded);
        }
        return;
      }
    }

    var toolHead = target.closest('.cr-tool-head--collapsible');
    if (!toolHead) return;
    if (target.closest('.cr-tool-head__actions')) return;

    var toolExp = toolHead.closest('.cr-tool-exp');
    var contentShell = toolExp && toolExp.querySelector('.cr-tool-exp__content-shell');
    if (!contentShell) return;
    var nextExpanded = !contentShell.classList.contains('cr-tool-exp__content-shell--expanded');
    toolHead.classList.toggle('cr-tool-head--expanded', nextExpanded);
    setExpandableVisible(contentShell, nextExpanded, 'cr-tool-exp__content-shell--expanded');
  });

  // ── 3. 产物点击 → postMessage 给外层 ──
  // 点击含 data-artifact-url 的元素时，向父窗口发送 artifactPreview.open
  document.addEventListener('click', function(e) {
    var el = e.target && e.target.closest && e.target.closest('[data-artifact-url]');
    if (!el) return;
    var type = el.getAttribute('data-artifact-type') || '';
    var nodeId = el.getAttribute('data-artifact-node-id') || '';
    var params;
    if (type === 'knowledge' && nodeId) {
      // 知识空间产物：传 nodeId、nodeKind、url、title（文件名）
      var knowledgeUrl = el.getAttribute('data-artifact-url') || '';
      var nodeKind = el.getAttribute('data-artifact-node-kind') || '';
      var sharePath = el.getAttribute('data-share') || '';
      var fileName = sharePath.replace(/\\\\/g, '/').split('/').pop() || '';
      var title = el.getAttribute('data-task-name') || fileName;
      params = [{ nodeId: nodeId, nodeKind: nodeKind, url: knowledgeUrl, title: title }];
    } else {
      // 网盘产物：传 shareCode + fileInfo
      var fileInfoStr = el.getAttribute('data-artifact-file-info') || '';
      var fileInfo;
      try { fileInfo = fileInfoStr ? JSON.parse(fileInfoStr) : undefined; } catch(e) {}
      var shareCodeEl = document.querySelector('meta[name="workbuddy-task-share-code"]');
      var shareCode = shareCodeEl ? shareCodeEl.getAttribute('content') : null;
      params = [{ shareCode: shareCode, fileInfo: fileInfo }];
    }
    try {
      // 知识空间产物走专用 method/id，其余走通用产物预览
      var isSpaceArtifact = type === 'knowledge';
      var method = isSpaceArtifact ? 'spaceArtifactPreview.open' : 'artifactPreview.open';
      var idPrefix = isSpaceArtifact ? 'space_artifact_preview_' : 'artifact_preview_';
      var msg = {
        type: 'rpc:request',
        id: idPrefix + Date.now(),
        method: method,
        params: params,
        timestamp: Date.now(),
      };
      console.log('[share-html] postMessage ' + method + ':', msg);
      window.parent.postMessage(msg, '*');
    } catch (err) {
      // 非 iframe 环境或跨域限制，忽略
    }
  });

  // ── 4. 页面加载完成 → 通知 host 当前 shareCode ──
  // 脚本在 </body> 前同步执行时 readyState='loading'，统一用 DOMContentLoaded 确保触发。
  var shareCodeMeta = document.querySelector('meta[name="workbuddy-task-share-code"]');
  var shareCode = shareCodeMeta ? shareCodeMeta.getAttribute('content') : null;
  if (shareCode) {
    function sendReadyMsg() {
      try {
        var msg = {
          type: 'rpc:request',
          id: 'task_share_ready_' + Date.now(),
          method: 'taskShare.ready',
          params: [{ shareCode: shareCode }],
          timestamp: Date.now(),
        };
        console.log('[share-html] postMessage taskShare.ready:', msg);
        window.parent.postMessage(msg, '*');
      } catch (err) {
        // 非 iframe 环境或跨域限制，忽略
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', sendReadyMsg);
    } else {
      sendReadyMsg();
    }
  }
})();
<\/script>
</body>
</html>`;
}
/**
* 清理 DOM 用于静态输出：
* - 移除 data-reactroot 等 React 运行时属性
* - 移除内联 event handler（onclick 等）
* - 注入产物 URL
* - 保留 conversation-render 原始渲染结果，隐藏 tool 只由 extension 处理
*/
function cleanDomForStatic(el, artifactUrlMap) {
	const clone = el.cloneNode(true);
	if (artifactUrlMap && artifactUrlMap.size > 0) injectArtifactUrls(clone, artifactUrlMap);
	for (const panel of Array.from(clone.querySelectorAll(".artifact-slot-panel"))) {
		const isInline = !!panel.closest("[data-inline-artifacts]");
		const isBottom = !!panel.closest("[data-bottom-artifacts]");
		if (isInline) {
			const actions = panel.querySelector(".artifact-slot-panel__actions");
			if (actions) actions.parentElement?.removeChild(actions);
			panel.style.marginTop = "12px";
		} else if (isBottom) {
			for (const chevron of Array.from(panel.querySelectorAll(".artifact-slot-panel__action-chevron"))) chevron.parentElement?.removeChild(chevron);
			const actions = panel.querySelector(".artifact-slot-panel__actions");
			const grid = panel.querySelector(".artifact-slot-panel__grid");
			if (actions && grid) {
				panel.insertBefore(actions, grid);
				actions.style.marginBottom = "8px";
			}
		}
	}
	cleanNode(clone);
	return clone.outerHTML;
}
/**
* 给产物卡片（.artifact-slot-panel__card）注入 data-artifact-* 属性。
* 卡片上已有 data-share（本地文件路径），用它与 artifactUrlMap key 直接匹配。
*
* 注入属性：
* - data-artifact-url      可访问链接
* - data-artifact-type     存储类型（knowledge / netdisk）
* - data-artifact-node-id  知识空间节点 ID（knowledge 类型）
* - data-artifact-node-kind 知识空间节点类型（knowledge 类型）
* - data-artifact-file-info 网盘文件信息 JSON（netdisk 类型）
*/
function injectArtifactUrls(root, artifactUrlMap) {
	const cards = root.querySelectorAll(".artifact-slot-panel__card");
	for (const card of Array.from(cards)) {
		const sharePath = card.getAttribute("data-share") || "";
		let result = artifactUrlMap.get(sharePath);
		if (!result) {
			const basename = sharePath.split("/").pop() || sharePath.split("\\").pop() || "";
			if (basename) for (const [key, val] of artifactUrlMap.entries()) {
				if (key.split("/").pop() === basename) {
					result = val;
					break;
				}
				const parts = key.replace(/\\/g, "/").split("/");
				const parentDir = parts.length >= 2 ? parts[parts.length - 2] : "";
				if (parentDir && parentDir === basename) {
					result = val;
					break;
				}
			}
		}
		if (result) {
			card.setAttribute("data-artifact-url", result.url);
			card.setAttribute("data-artifact-type", result.type);
			if (result.nodeId) card.setAttribute("data-artifact-node-id", result.nodeId);
			if (result.nodeKind) card.setAttribute("data-artifact-node-kind", result.nodeKind);
			if (result.fileInfo) card.setAttribute("data-artifact-file-info", JSON.stringify(result.fileInfo));
		}
	}
}
function cleanNode(node) {
	node.removeAttribute("data-reactroot");
	if (node.hasAttribute("data-static-widget")) return;
	for (const attr of Array.from(node.attributes)) if (attr.name.startsWith("on")) node.removeAttribute(attr.name);
	for (const child of Array.from(node.children)) cleanNode(child);
}
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/inline-fonts.ts
/**
* 图标字体内联工具
*
* 背景：导出的单文件 HTML 会被独立打开（非应用同源环境），DOM 序列化时 collectPageStyles
* 收集到的 `@font-face { src: url(打包后的字体URL) }` 此时加载不到 → 图标字体字形丢失
* （issue：对话流里文件引用卡片的 `<>` 等文件类型图标变空白）。
*
* 这里扫描页面所有 @font-face，将图标字体（ICON_FONT_FAMILIES）的 url 资源拉取并内联为
* data-URI 形式的 @font-face CSS，注入到导出 HTML 收集 CSS 之后覆盖原 url，使图标在任何
* 环境都能渲染。
*/
/**
* 需要内联的图标字体族（仅图标字体，避免把正文 web 字体也内联进来导致体积膨胀）。
* 文件类型图标（如 html 的 `<>`）走 seti 图标字体；codicon 为 VSCode 通用图标字体。
*/
var ICON_FONT_FAMILIES = ["seti", "codicon"];
/** ArrayBuffer → base64（分块避免超大栈调用） */
function arrayBufferToBase64(buf) {
	const bytes = new Uint8Array(buf);
	let binary = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary);
}
/** 拉取字体资源并转为 data-URI；失败返回空串 */
async function fetchFontAsDataUri(url) {
	try {
		const resp = await fetch(url);
		if (!resp.ok) return {
			dataUri: "",
			format: ""
		};
		const base64 = arrayBufferToBase64(await resp.arrayBuffer());
		const isWoff2 = /\.woff2(\?|#|$)/i.test(url);
		const mime = isWoff2 ? "font/woff2" : "font/woff";
		const format = isWoff2 ? "woff2" : "woff";
		return {
			dataUri: `data:${mime};base64,${base64}`,
			format
		};
	} catch {
		return {
			dataUri: "",
			format: ""
		};
	}
}
/**
* 扫描当前页面所有 @font-face，将图标字体（ICON_FONT_FAMILIES）内联为 data-URI 的
* @font-face CSS 字符串。失败/跨域的字体会被跳过，整体不抛错。
*/
async function inlineIconFontsCss() {
	const seen = /* @__PURE__ */ new Set();
	const tasks = [];
	for (const sheet of Array.from(document.styleSheets)) {
		let rules;
		try {
			rules = sheet.cssRules;
		} catch {
			continue;
		}
		if (!rules) continue;
		for (const rule of Array.from(rules)) {
			if (rule.type !== CSSRule.FONT_FACE_RULE) continue;
			const fontFaceRule = rule;
			const family = (fontFaceRule.style.getPropertyValue("font-family") || "").replace(/["']/g, "").trim();
			if (!ICON_FONT_FAMILIES.some((f) => family.toLowerCase().includes(f))) continue;
			const match = (fontFaceRule.style.getPropertyValue("src") || "").match(/url\(\s*["']?([^"')]+)["']?\s*\)/);
			if (!match) continue;
			let url = match[1];
			if (url.startsWith("data:")) continue;
			try {
				url = new URL(url, document.baseURI).href;
			} catch {}
			if (seen.has(url)) continue;
			seen.add(url);
			tasks.push(fetchFontAsDataUri(url).then(({ dataUri, format }) => dataUri ? `@font-face{font-family:"${family}";src:url(${dataUri}) format("${format}");font-weight:normal;font-style:normal;}` : ""));
		}
	}
	return (await Promise.all(tasks)).filter(Boolean).join("\n");
}
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/wait-for-mermaid-render.ts
/** 等待显式图表状态；超时拒绝导出，避免把永久 loading 写入静态分享。 */
async function waitForMermaidRender(container, timeoutMs) {
	const startedAt = Date.now();
	while (container.querySelector("[data-mermaid-render-state=\"pending\"]")) {
		const remainingMs = timeoutMs - (Date.now() - startedAt);
		if (remainingMs <= 0) throw new Error("Mermaid rendering timed out before HTML export");
		await new Promise((resolve) => setTimeout(resolve, Math.min(100, remainingMs)));
	}
}
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/render-to-html.ts
init_preload_helper();
function buildRequestIdArtifactsMap(messages, artifactUrlMap, allArtifacts) {
	const allEntries = allArtifacts.map((a) => {
		const uploaded = artifactUrlMap.get(a.path) ?? Array.from(artifactUrlMap.entries()).find(([key]) => key.split("/").pop() === a.name)?.[1];
		return {
			path: a.path,
			name: a.name,
			url: uploaded?.url ?? "",
			presented: false
		};
	});
	const presentedBasenames = /* @__PURE__ */ new Set();
	const newPresentedByRequest = /* @__PURE__ */ new Map();
	const orderedRequestIds = [];
	const seenRequestIds = /* @__PURE__ */ new Set();
	for (const msg of messages) {
		if (msg.messageType !== "assistant") continue;
		const reqId = msg.requestId || msg.id || "";
		if (!reqId) continue;
		if (!seenRequestIds.has(reqId)) {
			orderedRequestIds.push(reqId);
			seenRequestIds.add(reqId);
		}
		const content = Array.isArray(msg.content) ? msg.content : [];
		for (const block of content) {
			if (block.type !== "tool-call" || !block.tool) continue;
			const toolName = block.tool.name || "";
			const args = block.tool.args || {};
			let filePaths = [];
			if (toolName === "deliver_attachments") {
				const raw = args.attachments;
				if (Array.isArray(raw)) filePaths = raw.map((item) => typeof item === "string" ? item : String(item));
				else if (typeof raw === "string") try {
					filePaths = JSON.parse(raw);
				} catch {
					filePaths = [raw];
				}
			} else if (toolName === "present_files" || toolName === "PresentFiles") filePaths = [...Array.isArray(args.files) ? args.files : [], ...Array.isArray(args.paths) ? args.paths : []];
			else if (toolName === "write_to_file" || toolName === "write_file" || toolName === "create_file") {
				const fp = args.filePath || args.file_path || args.path || "";
				if (fp) filePaths = [fp];
			} else continue;
			if (filePaths.length === 0) continue;
			for (const filePath of filePaths) {
				if (filePath.startsWith("http://") || filePath.startsWith("https://") || filePath.startsWith("file://")) continue;
				const basename = filePath.split("/").pop() || filePath.split("\\").pop() || filePath;
				if (presentedBasenames.has(basename)) continue;
				let entry = allEntries.find((e) => e.name === basename);
				if (!entry) entry = allEntries.find((e) => {
					const parts = e.path.replace(/\\/g, "/").split("/");
					return (parts[parts.length - 2] ?? "") === basename && /\.html?$/i.test(e.name);
				});
				if (entry) {
					entry.presented = true;
					presentedBasenames.add(basename);
					presentedBasenames.add(entry.name);
					if (!newPresentedByRequest.has(reqId)) newPresentedByRequest.set(reqId, []);
					newPresentedByRequest.get(reqId).push(entry);
				}
			}
		}
	}
	const requestIdArtifactsMap = /* @__PURE__ */ new Map();
	for (const reqId of orderedRequestIds) {
		const newOnes = newPresentedByRequest.get(reqId) ?? [];
		if (newOnes.length === 0) continue;
		requestIdArtifactsMap.set(reqId, newOnes);
	}
	return {
		requestIdArtifactsMap,
		bottomArtifacts: allEntries.filter((e) => !presentedBasenames.has(e.name) && e.url)
	};
}
/**
* 渲染 ShareTaskPreview（forExport=true 模式）并序列化为静态 HTML 字符串。
*
* forExport=true 时：
* - enableMetaFold=false：所有 reasoning/tool-call 内容全量渲染到 DOM
* - 无回放逻辑，直接展示完整消息列表
* - 隐藏所有交互控件（回放进度条、产物 FAB 等）
*/
async function renderSharePreviewToHtml(params) {
	const { messages, name, artifactUrlMap, allArtifacts, shareCode, showBottomArtifacts = true } = params;
	const React = await __vitePreload(() => import("./lib-chat-ui-D8Ji0f8n.js").then((n) => /* @__PURE__ */ __toESM(n.Ev())), __vite__mapDeps([2,1,3]), import.meta.url);
	const ReactDOM = await __vitePreload(() => import("./lib-chat-ui-D8Ji0f8n.js").then((n) => /* @__PURE__ */ __toESM(n.Ul())), __vite__mapDeps([2,1,3]), import.meta.url);
	const { default: ShareTaskPreview } = await __vitePreload(async () => {
		const { default: ShareTaskPreview } = await import("./task-preview-DGZWOuZ1.js");
		return { default: ShareTaskPreview };
	}, __vite__mapDeps([4,1,5,2,3,6,7,8,9,10,11,12,0,13]), import.meta.url);
	const effectiveArtifacts = allArtifacts && allArtifacts.length > 0 ? allArtifacts : artifactUrlMap && artifactUrlMap.size > 0 ? Array.from(artifactUrlMap.keys()).map((path) => ({
		path,
		name: path.split("/").pop() || path
	})) : [];
	const { requestIdArtifactsMap, bottomArtifacts } = effectiveArtifacts.length > 0 ? buildRequestIdArtifactsMap(messages, artifactUrlMap ?? /* @__PURE__ */ new Map(), effectiveArtifacts) : {
		requestIdArtifactsMap: /* @__PURE__ */ new Map(),
		bottomArtifacts: []
	};
	const container = document.createElement("div");
	container.style.cssText = [
		"position:fixed",
		"top:0",
		"left:0",
		"width:1200px",
		"height:800px",
		"opacity:0",
		"pointer-events:none",
		"z-index:-1",
		"overflow:hidden"
	].join(";");
	document.body.appendChild(container);
	const root = ReactDOM.createRoot(container);
	try {
		const renderWaitMs = Math.min(300 + messages.length * 50, 5e3);
		await new Promise((resolve) => {
			root.render(React.createElement(ShareTaskPreview, {
				name,
				messages,
				artifacts: [],
				forExport: true,
				requestIdArtifactsMap,
				bottomArtifacts: showBottomArtifacts ? bottomArtifacts : []
			}));
			setTimeout(resolve, renderWaitMs);
		});
		await waitForMermaidRender(container, 3e4);
		return serializeDomToHtml(container, name, artifactUrlMap, shareCode, await inlineIconFontsCss());
	} finally {
		root.unmount();
		document.body.removeChild(container);
	}
}
//#endregion
//#region ../../packages/agent-ui/src/utils/share/dom-snapshot-share/static-share.ts
init_common();
init_message_transforms();
init_i18n();
init_storage_quota_exceeded_dialog();
/**
* 读取一批文件产物的 blob 内容，供 createStaticShare 上传/打包。
* 单个文件读取失败不抛出，仅该项 blob 为 undefined，避免影响其余产物。
*/
async function readArtifactBlobs(taskId, fileArtifacts, readFile) {
	return Promise.all(fileArtifacts.map(async (a) => {
		try {
			const res = await readFile?.(taskId, a.path, "blob");
			return {
				path: a.path,
				name: a.name,
				blob: res?.content,
				readBlob: async (depPath) => {
					try {
						return (await readFile?.(taskId, depPath, "blob"))?.content ?? null;
					} catch {
						return null;
					}
				}
			};
		} catch {
			return {
				path: a.path,
				name: a.name,
				blob: void 0
			};
		}
	}));
}
/**
* 静态 HTML 分享流程：上传产物 → 生成 HTML → 上传 HTML → 返回 shareLink。
*
* 由 EnableStaticHtmlShare feature flag 控制是否启用。
* 单个产物上传失败不阻断整体，对应节点 data-artifact-url 为空字符串。
*/
async function createStaticShare(params) {
	const { messages, artifacts, name, shareCode, backendProvider, taskId, owner, onProgress, showBottomArtifacts, virtualArtifacts } = params;
	onProgress?.({
		phase: "uploading-artifacts",
		artifactsDone: 0,
		artifactsTotal: artifacts.length
	});
	const artifactUrlMap = await uploadArtifacts(artifacts, { uploadToKnowledge: backendProvider.uploadToKnowledge?.bind(backendProvider) }, {
		taskId,
		taskName: name,
		owner,
		ownerType: taskId ? 1 : 0
	});
	onProgress?.({
		phase: "uploading-artifacts",
		artifactsDone: artifactUrlMap.size,
		artifactsTotal: artifacts.length
	});
	fillFileIconKind(artifactUrlMap, artifacts);
	if (virtualArtifacts && virtualArtifacts.length > 0) {
		for (const va of virtualArtifacts) if (!artifactUrlMap.has(va.path)) artifactUrlMap.set(va.path, {
			url: va.url,
			type: va.type,
			iconKind: va.iconKind,
			name: va.name,
			size: va.size,
			requestId: va.requestId
		});
	}
	onProgress?.({ phase: "generating-html" });
	const htmlStr = await renderSharePreviewToHtml({
		messages: normalizeMessages(messages),
		artifactUrlMap,
		allArtifacts: artifacts.map((a) => ({
			path: a.path,
			name: a.name
		})),
		name,
		shareCode,
		showBottomArtifacts
	});
	const htmlBlob = new Blob([htmlStr], { type: "text/html" });
	onProgress?.({ phase: "uploading-html" });
	if (!backendProvider.uploadToKnowledge) throw new Error("uploadToKnowledge is not available on backendProvider");
	const htmlFileName = `${name}.html`;
	const uploadOptions = {
		taskId,
		taskName: name,
		owner,
		ownerType: taskId ? 1 : 0
	};
	const uploadResult = await backendProvider.uploadToKnowledge(htmlBlob, htmlFileName, uploadOptions);
	const successResult = uploadResult && "url" in uploadResult ? uploadResult : null;
	const shareLink = successResult?.publishUrl || successResult?.url;
	if (!shareLink) {
		if (uploadResult && "errorCode" in uploadResult && uploadResult.errorCode === 20010) {
			showStorageQuotaExceededDialog();
			throw new Error("capacity_exceeded");
		}
		if (uploadResult && "errorCode" in uploadResult && uploadResult.errorCode === 56042) {
			toast.error(t("shareFile.formatUnsupported"));
			throw new Error("format_unsupported");
		}
		throw new Error("uploadToKnowledge did not return a valid url");
	}
	if (successResult?.nodeId && backendProvider.batchMoveKnowledgeNodes) {
		const artifactNodeIds = Array.from(artifactUrlMap.values()).filter((r) => r.type === "knowledge" && r.nodeId).map((r) => r.nodeId);
		if (artifactNodeIds.length > 0) backendProvider.batchMoveKnowledgeNodes(successResult.nodeId, artifactNodeIds).catch((err) => console.warn("[createStaticShare] batchMove error:", err));
	}
	onProgress?.({ phase: "done" });
	return {
		success: true,
		shareLink,
		viewUrl: successResult?.url ?? shareLink
	};
}
//#endregion
export { DEFAULT_SHARE_TITLE, adaptShareUrl, buildMessageTimeWindows, collectMessageRequestIds, collectShareArtifacts, createStaticShare, createTemplateShare, isFileArtifactInSelection, isShareTaskFileTooLargeError, isArdotVirtualShareArtifact as n, uploadArtifacts as r, readArtifactBlobs, readCwdArtifacts, shouldUseKnowledgeUpload, collectArdotVirtualArtifacts as t };
