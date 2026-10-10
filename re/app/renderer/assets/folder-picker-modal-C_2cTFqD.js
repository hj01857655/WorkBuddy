const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./locale-utils-TanlkH9x.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./locale-utils-DQSZKef0.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { CS as init_file_icons, E as init_contexts, E1 as init_useI18n, G as useCurrentAccount, I1 as t, K1 as IMAGE_EXTENSIONS, O1 as useTranslation, Q as init_app_providers, SQ as init_use_is_enterprise_admin, SS as getFileIcon, UR as useTencentDocsFacade, V3 as useAdapter, VR as init_services, X1 as init_file_config, X5 as Checkbox, XG as init_use_floating_layer, ZG as useFloatingLayer, _ as FileType, c as tencentDocsStore, c7 as Modal, dW as useOneidAppStatus, et as useAgentServices, f as ROOT_FOLDER_ID, gS as formatRelativeTime, hS as init_top_progress_banner, iU as init_telemetry, j1 as init_i18n, krt as Button, l as useTencentDocsStore, lU as reportSaveToTdocPopShow, m as init_constants, m5 as init_src, mS as TopProgressBanner, pG as useOneidSource, q1 as IMAGE_MIME_TYPES, s as init_store, uG as init_use_oneid_applications, uW as init_use_oneid_app_status, v as ListType, vS as init_file_utils, wQ as useIsEnterpriseEdition, x as init_types } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Hf as CircleCheckBig, Kh as require_react_dom, Ov as __vitePreload, Qf as ChevronRight, Qu as Pencil, Tv as require_jsx_runtime, Ul as require_client, Wf as CircleAlert, Xd as FolderPlus, Yl as init_lucide_react, eu as X, gd as Loader, gu as Trash2, ja as MentionSkeleton, ji as ConfirmDialog, kv as init_preload_helper, mf as Download, s as Breadcrumb, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { $ as netDriveServiceStore, H as formatFileSize, K as validateFileName, Q as init_netdrive_service, U as init_utils, W as mapDirEntryToFileItem, Z as getNetDriveAppId, dt as buildHtmlDependencyZip, ft as buildHtmlSiteZip, pt as init_share_html_zip, q as batchGetNicknames } from "./locale-utils-TanlkH9x.js";
import { i as useNetDriveContext, r as init_netdrive_store_context, t as init_cloud_file_constants } from "./cloud-file-constants-C-3tulP1.js";
import { i as init_store$1, o as loadStorageCapacity, s as myFilesStore } from "./store-B9VMId-K.js";
import { Z as init_no_knowledge_base_update } from "./api-BdQlPhCp.js";
import { i as useUploadQueue, n as init_use_upload_queue, r as setLastUploadFolder, t as getLastUploadFolder } from "./use-upload-queue-DwfNivwj.js";
import { _ as createFile, a as VirtualList, b as init_file_service, d as AuthGuide, f as init_auth_guide, i as useFileList, l as EmptyState, n as useTdocCheckAuthGate, o as init_file_list, r as init_use_file_list, t as init_use_tdoc_check_auth_gate, u as init_empty_state } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
import { a as init_utils$1, f as init_file_type_icon, n as formatTime, u as FileTypeIcon } from "./utils-C65Aew35.js";
import { n as init_oneid_activation_guide, t as OneidActivationGuide } from "./oneid-activation-guide-DuXXdo_H.js";
//#region ../../packages/agent-ui/src/utils/markdown-image-uploader.ts
/** 判定路径是否为"非本地"引用，无需上传 */
function isExternalRef(rawPath) {
	if (!rawPath) return true;
	const trimmed = rawPath.trim();
	if (!trimmed) return true;
	if (/^(local-)?file:/i.test(trimmed)) return false;
	if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return true;
	if (trimmed.startsWith("//")) return true;
	if (trimmed.startsWith("#")) return true;
	return false;
}
/** 取扩展名（小写、去除 query/hash） */
function getExt(rawPath) {
	const base = rawPath.split("#")[0].split("?")[0].split(/[\\/]/).pop() ?? "";
	const idx = base.lastIndexOf(".");
	return idx >= 0 ? base.slice(idx + 1).toLowerCase() : "";
}
/** 是否是受支持的图片扩展名 */
function isImageExt(rawPath) {
	return MARKDOWN_IMAGE_EXTENSIONS.has(getExt(rawPath));
}
/** 取文件名（不含 query/hash） */
function getBaseName(rawPath) {
	const base = rawPath.split("#")[0].split("?")[0].replace(/\\/g, "/").split("/").pop() ?? "";
	try {
		return decodeURIComponent(base);
	} catch {
		return base;
	}
}
/** 把 file:// 或 local-file:// URI 形式或带反斜杠的路径归一为 POSIX 风格的本地路径片段 */
function stripFileUri(rawPath) {
	let p = rawPath.replace(/\\/g, "/");
	if (/^local-file:\/\//i.test(p)) p = p.replace(/^local-file:\/\//i, "");
	else if (/^file:\/\//i.test(p)) {
		p = p.replace(/^file:\/\/(localhost)?/i, "");
		if (/^\/[a-zA-Z]:\//.test(p)) p = p.slice(1);
	}
	return p;
}
/**
* 把图片路径解析为绝对路径（相对于 Markdown 所在目录）。
* 已是绝对路径（以 `/` 开头）则原样返回；Windows 盘符 `C:\\` 同样视为绝对路径。
*/
function resolveMarkdownAssetPath(rawPath, markdownFilePath) {
	const filePart = (() => {
		try {
			return decodeURI(rawPath);
		} catch {
			return rawPath;
		}
	})().split("#")[0].split("?")[0];
	const normalized = stripFileUri(filePart);
	if (/^agent:\/\//i.test(markdownFilePath)) {
		const resolvedAgentPath = resolveMarkdownAssetPath(normalized, markdownFilePath.replace(/^agent:\/\//i, ""));
		return `agent://${resolvedAgentPath.startsWith("/") ? "" : "/"}${resolvedAgentPath}`;
	}
	if (normalized.startsWith("/") || /^[a-zA-Z]:\//.test(normalized)) return normalized;
	const mdBase = stripFileUri(markdownFilePath);
	const mdDir = mdBase.replace(/\/[^/]*$/, "");
	if (!mdDir || mdDir === mdBase) return normalized;
	const segments = [];
	for (const seg of `${mdDir}/${normalized}`.split("/")) {
		if (!seg || seg === ".") continue;
		if (seg === "..") {
			segments.pop();
			continue;
		}
		segments.push(seg);
	}
	return `/${segments.join("/")}`;
}
/**
* 推断图片 MIME 类型，便于 uploader 在缺省 contentType 时使用。
* 不在已知映射内时返回空串。
*/
function getImageMimeType(rawPath) {
	const ext = getExt(rawPath);
	if (ext === "ico") return "image/x-icon";
	return IMAGE_MIME_TYPES[ext] ?? "";
}
/**
* 扫描 Markdown 文本中所有本地图片引用（去重）。
*
* 解析两类语法：
*  - Markdown 图片：`![alt](path "title")` —— 兼容标题与转义括号；
*  - 内嵌 HTML：`<img ... src="path" ...>` —— 单双引号皆可。
*
* 返回值按出现顺序，但保证同一 `originalPath` 仅出现一次。
*/
function extractMarkdownImagePaths(markdown) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	const mdImageRe = /!\[[^\]]*\]\(\s*([^()\s"']+)(?:\s+"[^"]*")?\s*\)/g;
	let match;
	while ((match = mdImageRe.exec(markdown)) !== null) {
		const raw = match[1];
		if (!seen.has(raw)) {
			seen.add(raw);
			result.push(raw);
		}
	}
	const htmlImgRe = /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
	while ((match = htmlImgRe.exec(markdown)) !== null) {
		const raw = match[1] ?? match[2] ?? "";
		if (raw && !seen.has(raw)) {
			seen.add(raw);
			result.push(raw);
		}
	}
	return result;
}
/** 用云端 URL 在文本中替换原始路径；仅替换被识别的图片引用位置，避免误伤普通文本。 */
function applyReplacements(markdown, replacements) {
	if (replacements.size === 0) return markdown;
	let out = markdown;
	out = out.replace(/(!\[[^\]]*\]\(\s*)([^()\s"']+)((?:\s+"[^"]*")?\s*\))/g, (full, prefix, url, suffix) => {
		const replaced = replacements.get(url);
		return replaced ? `${prefix}${replaced}${suffix}` : full;
	});
	out = out.replace(/(<img\b[^>]*?\bsrc\s*=\s*)("([^"]+)"|'([^']+)')/gi, (full, prefix, _wrapped, dq, sq) => {
		const url = dq ?? sq ?? "";
		const replaced = replacements.get(url);
		if (!replaced) return full;
		const quote = dq !== void 0 ? "\"" : "'";
		return `${prefix}${quote}${replaced}${quote}`;
	});
	return out;
}
/**
* Markdown 本地图片预处理主入口。
*
* 流程：
*  1. 抽取所有图片路径；
*  2. 过滤掉非本地引用 / 非图片扩展名；
*  3. 并行读取本地 Blob 并上传，得到云端 URL；
*  4. 替换文本中的本地路径。
*
* 单张失败不会抛错，会记录到 `warnings`，原路径保留。
*/
async function processMarkdownImages(options) {
	const { markdown, markdownFilePath, readImageBlob, uploadImage } = options;
	const warnings = [];
	const replacements = /* @__PURE__ */ new Map();
	if (!markdown) return {
		content: markdown,
		replacements,
		warnings
	};
	const candidates = extractMarkdownImagePaths(markdown).filter((p) => !isExternalRef(p)).filter((p) => {
		if (isImageExt(p)) return true;
		warnings.push(`skip non-image extension: ${p}`);
		return false;
	});
	if (candidates.length === 0) return {
		content: markdown,
		replacements,
		warnings
	};
	const tasks = candidates.map(async (originalPath) => {
		const resolvedPath = resolveMarkdownAssetPath(originalPath, markdownFilePath);
		let blob;
		try {
			blob = await readImageBlob(resolvedPath);
		} catch (err) {
			warnings.push(`read image failed: ${resolvedPath} (${err.message})`);
			return;
		}
		if (!blob) {
			warnings.push(`read image returned null: ${resolvedPath}`);
			return;
		}
		try {
			const url = await uploadImage(blob, originalPath, resolvedPath);
			if (url) replacements.set(originalPath, url);
			else warnings.push(`upload returned empty url: ${resolvedPath}`);
		} catch (err) {
			warnings.push(`upload failed: ${resolvedPath} (${err.message})`);
		}
	});
	await Promise.all(tasks);
	return {
		content: applyReplacements(markdown, replacements),
		replacements,
		warnings
	};
}
/** 仅用于上层判定的工具：扩展名是否被视为 Markdown */
function isMarkdownPath(filePath) {
	const ext = getExt(filePath);
	return ext === "md" || ext === "markdown";
}
/** 给单测/外部消费的 helper：取上传图片所用的文件名 */
function getMarkdownImageUploadName(rawPath) {
	return getBaseName(rawPath) || "image";
}
/**
* Markdown 上传前的本地图片预处理（带后端上传回调的高层封装）。
*
* 把本地图片优先经 SpaceEngine 图床（uploadShareImage）上传，失败回退网盘（uploadShareFile），
* 再把原文里的本地路径替换为云端 URL。任意图片失败不阻断整体；无任何 uploader 时原样返回。
*
* 被「分享弹窗上传」（use-share-file）与「更新至在线版本」（detail-panel-wrapper.handleSyncPublish）
* 两条上传链共用，保证两边 MD 图片处理行为一致。
*/
async function preprocessMarkdownImagesWithBackend(params) {
	const { markdownFilePath, markdownBlob, backend, readImageBlob, onWarn } = params;
	const warn = onWarn ?? ((m) => console.warn("[markdownImage]", m));
	const text = await markdownBlob.text();
	if (!backend.uploadShareImage && !backend.uploadShareFile) {
		warn("preprocessMarkdownImages: no uploader available, skip");
		return {
			blob: markdownBlob,
			replaced: 0
		};
	}
	const result = await processMarkdownImages({
		markdown: text,
		markdownFilePath,
		readImageBlob,
		uploadImage: async (imageBlob, originalPath, resolvedPath) => {
			const fileName = getMarkdownImageUploadName(originalPath);
			const mimeType = getImageMimeType(originalPath);
			const blobForUpload = mimeType && imageBlob instanceof Blob && imageBlob.type !== mimeType ? new Blob([imageBlob], { type: mimeType }) : imageBlob;
			if (backend.uploadShareImage) try {
				const imageRes = await backend.uploadShareImage(blobForUpload, fileName, mimeType || blobForUpload.type || "");
				if (imageRes?.url) return imageRes.url;
				warn(`uploadShareImage returned empty, fallback to uploadShareFile: ${resolvedPath}`);
			} catch (err) {
				warn(`uploadShareImage threw, fallback to uploadShareFile: ${resolvedPath} (${err.message})`);
			}
			if (!backend.uploadShareFile) throw new Error("uploadShareImage failed and uploadShareFile unavailable");
			const uploadRes = await backend.uploadShareFile({
				file: blobForUpload,
				filePath: resolvedPath,
				fileName,
				createShare: false
			});
			if (!uploadRes.success) throw new Error(uploadRes.error || "uploadShareFile failed");
			return uploadRes.downloadUrl || uploadRes.shareUrl || uploadRes.url || "";
		}
	});
	for (const warning of result.warnings) warn(`markdown image preprocess: ${warning}`);
	if (result.replacements.size === 0) return {
		blob: markdownBlob,
		replaced: 0
	};
	return {
		blob: new Blob([result.content], { type: markdownBlob.type || "text/markdown" }),
		replaced: result.replacements.size
	};
}
var MARKDOWN_IMAGE_EXTENSIONS;
var init_markdown_image_uploader = __esmMin((() => {
	init_file_config();
	MARKDOWN_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
		...IMAGE_EXTENSIONS,
		"svg",
		"bmp",
		"ico"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/publish-utils.ts
function normalizePublishPath(filePath) {
	let normalized = filePath.replace(/\\/g, "/");
	if (normalized.startsWith("file://")) normalized = normalized.slice(7);
	return normalized;
}
/** 获取文件扩展名 */
function getFileExtension(filePath) {
	return normalizePublishPath(filePath).toLowerCase().split(".").pop() ?? "";
}
function isKnowledgeFile(filePath) {
	return KNOWLEDGE_EXTENSIONS.has(getFileExtension(filePath));
}
function isHtmlFile(filePath) {
	return HTML_EXTENSIONS.has(getFileExtension(filePath));
}
/** 对 Blob 计算 SHA-256 hex 指纹，用于检测文件是否更新 */
async function computeBlobHash(blob) {
	const buffer = await blob.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
/** 获取 localStorage key */
function getCacheKey(taskId, filePath) {
	return `${PUBLISH_CACHE_PREFIX}${taskId ?? ""}_${normalizePublishPath(filePath)}`;
}
function getPublishCache(taskId, filePath) {
	try {
		const raw = localStorage.getItem(getCacheKey(taskId, filePath));
		if (!raw) return null;
		const record = JSON.parse(raw);
		return {
			...record,
			entryFilePath: record.entryFilePath ? normalizePublishPath(record.entryFilePath) : void 0,
			bundleHtmlPaths: record.bundleHtmlPaths?.map(normalizePublishPath)
		};
	} catch {
		return null;
	}
}
function savePublishCache(taskId, filePath, record, aliasPaths = []) {
	try {
		const normalizedEntryPath = normalizePublishPath(record.entryFilePath ?? filePath);
		const normalizedBundleHtmlPaths = Array.from(/* @__PURE__ */ new Set([
			...(record.bundleHtmlPaths ?? []).map(normalizePublishPath),
			...aliasPaths.map(normalizePublishPath).filter(isHtmlFile),
			...isHtmlFile(normalizedEntryPath) ? [normalizedEntryPath] : []
		]));
		const normalizedRecord = {
			...record,
			entryFilePath: isHtmlFile(normalizedEntryPath) ? normalizedEntryPath : void 0,
			bundleHtmlPaths: normalizedBundleHtmlPaths.length > 0 ? normalizedBundleHtmlPaths : void 0
		};
		const cachePaths = Array.from(/* @__PURE__ */ new Set([normalizePublishPath(filePath), ...normalizedBundleHtmlPaths]));
		for (const cachePath of cachePaths) localStorage.setItem(getCacheKey(taskId, cachePath), JSON.stringify(normalizedRecord));
	} catch {}
}
/**
* 删除发布缓存（与 savePublishCache 对称清理）。
*
* 场景：缓存的 nodeId 在云端已被删除，覆盖上传必然失败且会形成死循环，
* 此时须把该 (taskId, filePath) 及其 bundle 别名 key 一并清除，
* 下次分享才能走「全新创建上传」而非继续复用失效 nodeId。
*
* @param taskId 任务 id（与写入时保持一致）
* @param filePath 主文件路径
* @param aliasPaths bundle 内共享同一发布态的其他 HTML 路径（写入时的 bundleHtmlPaths）
*/
function removePublishCache(taskId, filePath, aliasPaths = []) {
	try {
		const cachePaths = Array.from(/* @__PURE__ */ new Set([normalizePublishPath(filePath), ...aliasPaths.map(normalizePublishPath)]));
		for (const cachePath of cachePaths) localStorage.removeItem(getCacheKey(taskId, cachePath));
	} catch {}
}
async function buildHtmlUpload(readFileAsync, filePath, blob, listDir) {
	const normalizedFilePath = normalizePublishPath(filePath);
	if (!isHtmlFile(normalizedFilePath)) {
		const contentHash = await computeBlobHash(blob);
		return {
			blob,
			fileName: decodeURIComponent(normalizedFilePath.split("/").pop() || "file"),
			contentHash
		};
	}
	const htmlBundlePaths = /* @__PURE__ */ new Set([normalizedFilePath]);
	const textResult = await readFileAsync(normalizedFilePath, "text");
	if (!textResult?.success || typeof textResult.content !== "string") {
		const contentHash = await computeBlobHash(blob);
		return {
			blob,
			fileName: decodeURIComponent(normalizedFilePath.split("/").pop() || "file"),
			contentHash,
			entryFilePath: normalizedFilePath,
			bundleHtmlPaths: [normalizedFilePath]
		};
	}
	const readBlob = async (fp) => {
		const r = await readFileAsync(fp, "blob");
		return r?.success && r.content instanceof Blob ? r.content : null;
	};
	const readText = async (fp) => {
		const r = await readFileAsync(fp, "text");
		return r?.success && typeof r.content === "string" ? r.content : null;
	};
	const zipResult = listDir ? await buildHtmlSiteZip({
		entryPath: normalizedFilePath,
		entryBlob: blob,
		entryText: textResult.content,
		readBlob,
		readText,
		listHtmlFiles: listDir
	}) : await buildHtmlDependencyZip({
		entryPath: normalizedFilePath,
		entryBlob: blob,
		entryText: textResult.content,
		readBlob
	});
	if (!zipResult) {
		const contentHash = await computeBlobHash(blob);
		return {
			blob,
			fileName: decodeURIComponent(normalizedFilePath.split("/").pop() || "file"),
			contentHash,
			entryFilePath: normalizedFilePath,
			bundleHtmlPaths: [normalizedFilePath]
		};
	}
	for (const dependencyPath of zipResult.dependencyPaths) if (isHtmlFile(dependencyPath)) htmlBundlePaths.add(normalizePublishPath(dependencyPath));
	const contentHash = await computeBlobHash(zipResult.blob);
	return {
		blob: zipResult.blob,
		fileName: zipResult.fileName,
		contentHash,
		entryFilePath: normalizedFilePath,
		bundleHtmlPaths: [...htmlBundlePaths]
	};
}
/**
* 取缓存里"上次分享时的本地版本基线 hash"。
*
* 优先返回 `lastUploadedLocalHash`（迁移后的新基线：上传前原始本地 Blob 的指纹）；
* 若缓存里没有该字段（老缓存 / 首次分享时还没写入），回退到 `contentHash`，保证迁移期
* 老用户行为与旧流程一致——仍按"上传 blob hash"对比，第二次分享后即被新基线接管。
*
* 调用方应传入 `currentLocalHash`（即"当前本地原文"的 hash），与本函数返回值比较：
*  - 相同 → 本地内容自上次分享后未变，直接复用缓存链接，**不弹覆盖弹窗**；
*  - 不同 → 本地内容已变，弹 `onConfirmOverwrite` 询问是否覆盖。
*/
function getPublishedLocalHash(cache) {
	if (!cache) return;
	return cache.lastUploadedLocalHash ?? cache.contentHash;
}
var KNOWLEDGE_EXTENSIONS, HTML_EXTENSIONS, PUBLISH_CACHE_PREFIX;
var init_publish_utils = __esmMin((() => {
	init_share_html_zip();
	KNOWLEDGE_EXTENSIONS = /* @__PURE__ */ new Set([
		"html",
		"htm",
		"md",
		"csv"
	]);
	HTML_EXTENSIONS = /* @__PURE__ */ new Set(["html", "htm"]);
	PUBLISH_CACHE_PREFIX = "wb_kupload_";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/hooks/use-create-folder.ts
function useCreateFolder({ onSuccess, onError, netDriveStore: storeOverride } = {}) {
	const store = storeOverride ?? netDriveServiceStore;
	const t = useTranslation();
	const [loading, setLoading] = (0, import_react$17.useState)(false);
	const [error, setError] = (0, import_react$17.useState)(null);
	const lockRef = (0, import_react$17.useRef)(false);
	return {
		createFolder: (0, import_react$17.useCallback)(async (parentId, name) => {
			if (lockRef.current) return false;
			const trimmedName = name.trim();
			if (!trimmedName) {
				const emptyMsg = t("myFiles.error.folderNameEmpty");
				setError(emptyMsg);
				onError?.(emptyMsg);
				toast.error(emptyMsg);
				return false;
			}
			const invalidMsg = validateFileName(trimmedName, t);
			if (invalidMsg) {
				setError(invalidMsg);
				onError?.(invalidMsg);
				toast.error(invalidMsg);
				return false;
			}
			lockRef.current = true;
			setLoading(true);
			setError(null);
			try {
				const newFolderId = (await store.getState().getClient().dir.create({
					parentID: parentId || void 0,
					name: trimmedName,
					appId: getNetDriveAppId(store)
				}))?.fileID ?? "";
				onSuccess?.(newFolderId, trimmedName);
				return true;
			} catch (err) {
				const msg = err?.message || t("myFiles.error.createFolderFailed");
				setError(msg);
				onError?.(msg);
				toast.error(msg);
				return false;
			} finally {
				setLoading(false);
				lockRef.current = false;
			}
		}, [onSuccess, onError]),
		loading,
		error,
		clearError: (0, import_react$17.useCallback)(() => {
			setError(null);
		}, [])
	};
}
var import_react$17;
var init_use_create_folder = __esmMin((() => {
	init_src$1();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_netdrive_service();
	init_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/hooks/use-modal-navigation.ts
/** 格式化面包屑为可读字符串，方便日志展示 */
function fmtBreadcrumbs(bc) {
	return bc.map((b) => `${b.name}(${b.id || "root"})`).join(" / ");
}
function navReducer(state, action) {
	switch (action.type) {
		case "SET_LOADING": return {
			...state,
			loading: action.loading
		};
		case "SET_LOADING_MORE": return {
			...state,
			loadingMore: action.loadingMore
		};
		case "SET_ITEMS": return {
			...state,
			items: action.items,
			nextCursor: action.nextCursor,
			hasMore: action.hasMore,
			loading: false,
			loadingMore: false,
			error: null
		};
		case "APPEND_ITEMS": return {
			...state,
			items: [...state.items, ...action.items],
			nextCursor: action.nextCursor,
			hasMore: action.hasMore,
			loading: false,
			loadingMore: false
		};
		case "UPDATE_AUTHOR_NAMES": {
			const { authorMap } = action;
			return {
				...state,
				items: state.items.map((f) => f._authorId && authorMap[f._authorId] && !f.updatedByName ? {
					...f,
					updatedByName: authorMap[f._authorId]
				} : f)
			};
		}
		case "ENTER_FOLDER": {
			const rootName = state.breadcrumbs[0]?.name || t("myFiles.selector.rootFolder");
			const newBreadcrumbs = action.resetBreadcrumbs ? [{
				id: "",
				name: rootName
			}, {
				id: action.folderId,
				name: action.folderName
			}] : [...state.breadcrumbs, {
				id: action.folderId,
				name: action.folderName
			}];
			console.log("[ModalNav][reducer] ENTER_FOLDER folderId=%s folderName=%s reset=%s | before=%s | after=%s", action.folderId, action.folderName, !!action.resetBreadcrumbs, fmtBreadcrumbs(state.breadcrumbs), fmtBreadcrumbs(newBreadcrumbs));
			return {
				...state,
				currentFolderId: action.folderId,
				breadcrumbs: newBreadcrumbs,
				items: [],
				loading: true,
				loadingMore: false,
				hasMore: false,
				nextCursor: "",
				error: null
			};
		}
		case "NAVIGATE_TO_BREADCRUMB": {
			const targetBreadcrumbs = state.breadcrumbs.slice(0, action.index + 1);
			const target = targetBreadcrumbs[targetBreadcrumbs.length - 1];
			console.log("[ModalNav][reducer] NAVIGATE_TO_BREADCRUMB index=%d targetId=%s | before=%s | after=%s", action.index, target?.id, fmtBreadcrumbs(state.breadcrumbs), fmtBreadcrumbs(targetBreadcrumbs));
			return {
				...state,
				currentFolderId: target.id,
				breadcrumbs: targetBreadcrumbs,
				items: [],
				loading: true,
				loadingMore: false,
				hasMore: false,
				nextCursor: "",
				error: null
			};
		}
		case "SET_ERROR": return {
			...state,
			error: action.error,
			loading: false,
			loadingMore: false
		};
		case "RESET":
			console.log("[ModalNav][reducer] RESET folderId=%s | breadcrumbs=%s", action.folderId, fmtBreadcrumbs(action.breadcrumbs));
			return {
				currentFolderId: action.folderId,
				breadcrumbs: action.breadcrumbs,
				items: [],
				loading: true,
				loadingMore: false,
				hasMore: false,
				nextCursor: "",
				error: null
			};
		default: return state;
	}
}
function useModalNavigation({ enabled, defaultFolderId, folderOnly, netDriveStore: storeOverride, useLastFolderCache = true, rootFolderLabel }) {
	const store = storeOverride ?? netDriveServiceStore;
	const rootLabel = rootFolderLabel || t("myFiles.selector.rootFolder");
	const [state, dispatch] = (0, import_react$16.useReducer)(navReducer, {
		...INITIAL_STATE,
		breadcrumbs: [{
			id: "",
			name: rootLabel
		}]
	});
	const abortRef = (0, import_react$16.useRef)(null);
	const initializedRef = (0, import_react$16.useRef)(false);
	const loadFiles = (0, import_react$16.useCallback)(async (folderId, cursor) => {
		abortRef.current?.abort();
		abortRef.current = new AbortController();
		console.log("[ModalNav][loadFiles] folderId=%s cursor=%s", folderId, cursor || "(first page)");
		if (cursor) dispatch({
			type: "SET_LOADING_MORE",
			loadingMore: true
		});
		else dispatch({
			type: "SET_LOADING",
			loading: true
		});
		try {
			const storeState = store.getState();
			if (!storeState.adapter) {
				console.warn("[NetDrive] NetDriveService 尚未初始化，返回空列表");
				dispatch({
					type: "SET_ITEMS",
					items: [],
					nextCursor: "",
					hasMore: false
				});
				return;
			}
			const response = await storeState.getClient().dir.list({
				parentID: folderId || void 0,
				limit: 50,
				...cursor ? { cursor } : {},
				orderBy: 1,
				ascending: false,
				...folderOnly ? { entryKind: 1 } : {}
			});
			const items = response.entries.map(mapDirEntryToFileItem);
			console.log("[ModalNav][loadFiles] folderId=%s => %d items, nextCursor=%s", folderId, items.length, response.nextCursor || "(none)");
			if (cursor) dispatch({
				type: "APPEND_ITEMS",
				items,
				nextCursor: response.nextCursor,
				hasMore: !!response.nextCursor
			});
			else dispatch({
				type: "SET_ITEMS",
				items,
				nextCursor: response.nextCursor,
				hasMore: !!response.nextCursor
			});
			const idsToResolve = items.filter((f) => f._authorId && typeof f._authorId === "string").map((f) => f._authorId);
			const uniqueIds = [...new Set(idsToResolve)];
			if (uniqueIds.length > 0) batchGetNicknames(uniqueIds, void 0, store).then((nickMap) => {
				if (Object.keys(nickMap).length > 0) dispatch({
					type: "UPDATE_AUTHOR_NAMES",
					authorMap: nickMap
				});
			}).catch(() => {});
		} catch (err) {
			if (err?.name !== "AbortError") {
				console.error("[NetDrive] 加载文件列表失败:", err);
				if (folderId && !cursor) {
					console.warn("[ModalNav][loadFiles] 目录 %s 加载失败，可能已被删除，回退到根目录", folderId);
					try {
						localStorage.removeItem("myFiles.lastUploadFolderId");
						localStorage.removeItem("myFiles.lastUploadFolderName");
					} catch {}
					dispatch({
						type: "RESET",
						folderId: "",
						breadcrumbs: [{
							id: "",
							name: rootLabel
						}]
					});
					try {
						const rootState = store.getState();
						if (rootState.adapter) {
							const rootResponse = await rootState.getClient().dir.list({
								parentID: void 0,
								limit: 50,
								orderBy: 1,
								ascending: false,
								...folderOnly ? { entryKind: 1 } : {}
							});
							const rootItems = rootResponse.entries.map(mapDirEntryToFileItem);
							dispatch({
								type: "SET_ITEMS",
								items: rootItems,
								nextCursor: rootResponse.nextCursor,
								hasMore: !!rootResponse.nextCursor
							});
							const rootIds = rootItems.filter((f) => f._authorId && typeof f._authorId === "string").map((f) => f._authorId);
							const rootUniqueIds = [...new Set(rootIds)];
							if (rootUniqueIds.length > 0) batchGetNicknames(rootUniqueIds, void 0, store).then((nickMap) => {
								if (Object.keys(nickMap).length > 0) dispatch({
									type: "UPDATE_AUTHOR_NAMES",
									authorMap: nickMap
								});
							}).catch(() => {});
						} else dispatch({
							type: "SET_ITEMS",
							items: [],
							nextCursor: "",
							hasMore: false
						});
					} catch (rootErr) {
						console.error("[ModalNav][loadFiles] 根目录也加载失败:", rootErr);
						dispatch({
							type: "SET_ERROR",
							error: rootErr?.message ?? "加载文件列表失败"
						});
					}
					return;
				}
				dispatch({
					type: "SET_ERROR",
					error: err?.message ?? "加载文件列表失败"
				});
			}
		}
	}, [folderOnly]);
	const lastLoadedFolderRef = (0, import_react$16.useRef)(null);
	const prevFolderRef = (0, import_react$16.useRef)(null);
	const loadFilesRef = (0, import_react$16.useRef)(loadFiles);
	loadFilesRef.current = loadFiles;
	(0, import_react$16.useEffect)(() => {
		if (!enabled) {
			initializedRef.current = false;
			lastLoadedFolderRef.current = null;
			loadingMoreLockRef.current = false;
			prevFolderRef.current = null;
			return;
		}
		if (initializedRef.current) return;
		initializedRef.current = true;
		const lastFolder = useLastFolderCache ? getLastUploadFolder() : null;
		const initFolderId = defaultFolderId ?? lastFolder?.id ?? "";
		const initBreadcrumbs = [{
			id: "",
			name: rootLabel
		}];
		if (initFolderId && lastFolder?.name) initBreadcrumbs.push({
			id: initFolderId,
			name: lastFolder.name
		});
		console.log("[ModalNav][init] defaultFolderId=%s useLastFolderCache=%s localStorage=%o => initFolderId=%s breadcrumbs=%s", defaultFolderId, useLastFolderCache, lastFolder, initFolderId, fmtBreadcrumbs(initBreadcrumbs));
		lastLoadedFolderRef.current = initFolderId;
		dispatch({
			type: "RESET",
			folderId: initFolderId,
			breadcrumbs: initBreadcrumbs
		});
		loadFilesRef.current(initFolderId);
		return () => {
			abortRef.current?.abort();
		};
	}, [
		enabled,
		defaultFolderId,
		useLastFolderCache
	]);
	(0, import_react$16.useEffect)(() => {
		if (!enabled || !initializedRef.current) return;
		if (prevFolderRef.current === null) {
			prevFolderRef.current = state.currentFolderId;
			console.log("[ModalNav][folderChange] INIT record folderId=%s breadcrumbs=%s", state.currentFolderId, fmtBreadcrumbs(state.breadcrumbs));
			return;
		}
		if (prevFolderRef.current === state.currentFolderId) return;
		if (lastLoadedFolderRef.current === state.currentFolderId) {
			console.log("[ModalNav][folderChange] SKIP (same as lastLoaded) folderId=%s breadcrumbs=%s", state.currentFolderId, fmtBreadcrumbs(state.breadcrumbs));
			prevFolderRef.current = state.currentFolderId;
			return;
		}
		console.log("[ModalNav][folderChange] LOAD folderId=%s (prev=%s) breadcrumbs=%s", state.currentFolderId, prevFolderRef.current, fmtBreadcrumbs(state.breadcrumbs));
		prevFolderRef.current = state.currentFolderId;
		lastLoadedFolderRef.current = state.currentFolderId;
		loadFilesRef.current(state.currentFolderId);
	}, [state.currentFolderId, enabled]);
	const enterFolder = (0, import_react$16.useCallback)((folder, fromSearch) => {
		if (!folder.isFolder) return;
		console.log("[ModalNav][action] enterFolder id=%s name=%s fromSearch=%s", folder.id, folder.name, !!fromSearch);
		dispatch({
			type: "ENTER_FOLDER",
			folderId: folder.id,
			folderName: folder.name,
			resetBreadcrumbs: fromSearch
		});
	}, []);
	const navigateToBreadcrumb = (0, import_react$16.useCallback)((index) => {
		console.log("[ModalNav][action] navigateToBreadcrumb index=%d", index);
		dispatch({
			type: "NAVIGATE_TO_BREADCRUMB",
			index
		});
	}, []);
	const loadingMoreLockRef = (0, import_react$16.useRef)(false);
	return {
		state,
		enterFolder,
		navigateToBreadcrumb,
		loadMore: (0, import_react$16.useCallback)(async () => {
			if (loadingMoreLockRef.current) return;
			if (state.loading || state.loadingMore || !state.hasMore || !state.nextCursor) return;
			loadingMoreLockRef.current = true;
			try {
				await loadFiles(state.currentFolderId, state.nextCursor);
			} finally {
				loadingMoreLockRef.current = false;
			}
		}, [
			state.loading,
			state.loadingMore,
			state.hasMore,
			state.nextCursor,
			state.currentFolderId,
			loadFiles
		]),
		refresh: (0, import_react$16.useCallback)(() => {
			loadFiles(state.currentFolderId);
		}, [state.currentFolderId, loadFiles])
	};
}
var import_react$16, INITIAL_STATE;
var init_use_modal_navigation = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_netdrive_service();
	init_cloud_file_constants();
	init_utils();
	init_use_upload_queue();
	INITIAL_STATE = {
		currentFolderId: "",
		breadcrumbs: [{
			id: "",
			name: t("myFiles.selector.rootFolder")
		}],
		items: [],
		loading: false,
		loadingMore: false,
		hasMore: false,
		nextCursor: "",
		error: null
	};
})), import_jsx_runtime$11, FileRow;
var init_file_row = __esmMin((() => {
	require_react();
	init_file_icons();
	init_file_utils();
	import_jsx_runtime$11 = require_jsx_runtime();
	FileRow = ({ item, selected, onToggleSelect, onEnter, onContextMenu }) => {
		const handleContextMenu = (event) => {
			onContextMenu?.(item, event);
		};
		/** 点击整行（除 radio 外）= 进入子目录 */
		const handleRowClick = () => {
			if (item.isFolder) onEnter?.();
		};
		/** 点击 radio = 切换选中（不进入） */
		const handleRadioClick = (e) => {
			e.stopPropagation();
			if (!item.isFolder) return;
			onToggleSelect?.();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: [
				"file-row",
				item.isFolder ? "file-row--clickable" : "file-row--file",
				selected ? "file-row--selected" : ""
			].filter(Boolean).join(" "),
			onClick: handleRowClick,
			onContextMenu: handleContextMenu,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: ["file-row__radio", selected ? "file-row__radio--checked" : ""].filter(Boolean).join(" "),
					onClick: handleRadioClick,
					role: "radio",
					"aria-checked": selected ? "true" : "false",
					"aria-label": item.isFolder ? `选择 ${item.name}` : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "file-row__name-cell",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "file-row__icon",
						children: getFileIcon(item.name, 20, item.type)
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: "file-row__name",
						title: item.name,
						children: item.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: "file-row__owner",
					children: item.updatedByName || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: "file-row__time",
					children: item.updatedAt > 0 ? formatRelativeTime(item.updatedAt) : "—"
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/file-breadcrumb.tsx
var import_react$14, import_jsx_runtime$10, FileBreadcrumb;
var init_file_breadcrumb = __esmMin((() => {
	init_src$1();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$10 = require_jsx_runtime();
	FileBreadcrumb = ({ items, onNavigate }) => {
		const breadcrumbItems = (0, import_react$14.useMemo)(() => items.map((item, index) => ({
			id: `${item.id}-${index}`,
			label: item.name,
			onClick: index < items.length - 1 ? () => onNavigate(index) : void 0
		})), [items, onNavigate]);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Breadcrumb, {
			items: breadcrumbItems,
			ariaLabel: "文件夹路径"
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/folder-browser/index.tsx
var import_react$13, import_jsx_runtime$9, FolderBrowser;
var init_folder_browser = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_no_knowledge_base_update();
	init_file_breadcrumb();
	import_jsx_runtime$9 = require_jsx_runtime();
	FolderBrowser = ({ breadcrumbs, onBreadcrumbNavigate, items, loading = false, error = null, loadingMore = false, onScroll, renderRow, listFooter, onSearch, searchResults = null, emptyText, extraHeaderColumn, hideEmpty = false, listRef }) => {
		const t = useTranslation();
		const [searchKeyword, setSearchKeyword] = (0, import_react$13.useState)("");
		const searchTimerRef = (0, import_react$13.useRef)(null);
		(0, import_react$13.useEffect)(() => {
			if (searchResults === null && searchKeyword) setSearchKeyword("");
		}, [searchResults]);
		const handleSearchChange = (0, import_react$13.useCallback)((e) => {
			const value = e.target.value;
			setSearchKeyword(value);
			if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
			if (!value.trim()) {
				onSearch?.("");
				return;
			}
			searchTimerRef.current = setTimeout(() => {
				onSearch?.(value.trim());
			}, 300);
		}, [onSearch]);
		/** 清空搜索框并退出搜索模式 */
		const handleClearSearch = (0, import_react$13.useCallback)(() => {
			if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
			setSearchKeyword("");
			onSearch?.("");
		}, [onSearch]);
		const displayItems = searchResults !== null ? searchResults : items;
		const isSearchMode = searchResults !== null;
		const isEmpty = !loading && !error && displayItems.length === 0 && !hideEmpty;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "upload-modal__breadcrumb",
			children: [!isSearchMode && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FileBreadcrumb, {
				items: breadcrumbs,
				onNavigate: onBreadcrumbNavigate
			}), onSearch && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "upload-modal__search-box",
				style: { marginLeft: "auto" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("svg", {
						className: "upload-modal__search-icon",
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("circle", {
							cx: "11",
							cy: "11",
							r: "8"
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("path", { d: "m21 21-4.35-4.35" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("input", {
						type: "text",
						className: "upload-modal__search-input",
						placeholder: t("myFiles.browser.searchPlaceholder"),
						value: searchKeyword,
						onChange: handleSearchChange
					}),
					searchKeyword && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
						type: "button",
						className: "upload-modal__search-clear",
						onClick: handleClearSearch,
						children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("path", { d: "M18 6L6 18M6 6l12 12" })
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "upload-modal__list-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "upload-modal__list-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "upload-modal__list-header-name",
						children: t("myFiles.browser.headerName")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "upload-modal__list-header-owner",
						children: t("myFiles.browser.headerOwner")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "upload-modal__list-header-time",
						children: t("myFiles.browser.headerTime")
					}),
					extraHeaderColumn
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "upload-modal__file-list",
				ref: listRef,
				onScroll,
				children: [
					loading && items.length === 0 && !isSearchMode && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "upload-modal__loading",
						children: t("myFiles.common.loading")
					}),
					error && !loading && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "upload-modal__empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
							src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
							alt: "",
							"aria-hidden": "true",
							width: 64,
							height: 64,
							draggable: false
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { children: error })]
					}),
					isEmpty && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "upload-modal__empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
							src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
							alt: "",
							"aria-hidden": "true",
							width: 64,
							height: 64,
							draggable: false
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { children: emptyText || t("myFiles.browser.emptyFolder") })]
					}),
					displayItems.map(renderRow),
					listFooter,
					loadingMore && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "upload-modal__loading-more",
						children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { children: t("myFiles.common.loadingMore") })
					})
				]
			})]
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/conflict-modal.less
var init_conflict_modal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/conflict-modal.tsx
var import_react$12, import_jsx_runtime$8, AlertIcon, ConflictModal;
var init_conflict_modal = __esmMin((() => {
	init_conflict_modal$1();
	init_src();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_file_icons();
	import_jsx_runtime$8 = require_jsx_runtime();
	AlertIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
		className: "conflict-modal__alert-icon",
		"aria-hidden": true,
		children: "!"
	});
	ConflictModal = ({ visible, fileName, fileType, mode = "upload", showApplyToAll = false, onOverwrite, onKeepBoth, onGoBack, onClose }) => {
		const showOverwrite = mode !== "move";
		const t = useTranslation();
		const [applyToAll, setApplyToAll] = (0, import_react$12.useState)(false);
		(0, import_react$12.useEffect)(() => {
			setApplyToAll(false);
		}, [fileName]);
		const handleOpenChange = (0, import_react$12.useCallback)((open) => {
			if (!open) onClose();
		}, [onClose]);
		const footerExtra = /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
			variant: "ghost",
			onClick: () => onGoBack(applyToAll),
			children: t("myFiles.conflict.skip")
		});
		const footerContent = /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [showOverwrite && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
			variant: "grey",
			onClick: () => onOverwrite(applyToAll),
			children: t("myFiles.conflict.overwrite")
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
			variant: "primary",
			onClick: () => onKeepBoth(applyToAll),
			children: t("myFiles.conflict.keepBoth")
		})] });
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(Modal, {
			open: visible,
			onOpenChange: handleOpenChange,
			title: t("myFiles.conflict.title"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(AlertIcon, {}),
			description: t("myFiles.conflict.desc"),
			variant: "confirm",
			size: "small",
			footer: footerContent,
			footerExtra,
			footerAlign: "between",
			className: "conflict-modal",
			wrapClassName: "conflict-modal-overlay",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "conflict-modal__file-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
					className: "conflict-modal__file-icon",
					children: getFileIcon(fileName, 24, fileType)
				}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
					className: "conflict-modal__file-name",
					title: fileName,
					children: fileName
				})]
			}), showApplyToAll && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Checkbox, {
				className: "conflict-modal__apply-all",
				size: "small",
				checked: applyToAll,
				onChange: (e) => setApplyToAll(e.target.checked),
				label: t("myFiles.conflict.applyToAll")
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/upload-modal.less
var init_upload_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/hooks/use-file-operations.ts
/** Web 环境下通过 <a> 标签触发浏览器下载 */
function triggerBrowserDownload(url, filename) {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
/**
* 从 SDK 错误对象中提取用户可读的错误消息。
* SDK 抛出的 DriveSDKError 子类含 code（对应 retcode）和 message（对应 msg）。
* 如果存在 code 则拼入提示，帮助定位问题。
*/
function extractSdkErrorMessage(err, fallback) {
	return err?.message || fallback;
}
function useFileOperations({ adapter, onSuccess, onError, netDriveStore: storeOverride, filesStore: filesStoreOverride }) {
	const store = storeOverride ?? netDriveServiceStore;
	const filesStore = filesStoreOverride ?? myFilesStore;
	const t = useTranslation();
	const [loading, setLoading] = (0, import_react$11.useState)({
		rename: false,
		download: false,
		delete: false
	});
	const [error, setError] = (0, import_react$11.useState)(null);
	const [downloadState, setDownloadState] = (0, import_react$11.useState)({
		fileName: "",
		percent: 0,
		status: "idle"
	});
	const renameLockRef = (0, import_react$11.useRef)(false);
	const deleteLockRef = (0, import_react$11.useRef)(false);
	const downloadAbortRef = (0, import_react$11.useRef)(null);
	const cancelDownload = (0, import_react$11.useCallback)(() => {
		console.log("[CancelDebug][use-file-operations] cancelDownload CALLED", {
			hasController: !!downloadAbortRef.current,
			aborted: downloadAbortRef.current?.signal.aborted
		});
		if (downloadAbortRef.current) {
			downloadAbortRef.current.abort();
			downloadAbortRef.current = null;
		}
	}, []);
	return {
		renameItem: (0, import_react$11.useCallback)(async (item, newName) => {
			if (renameLockRef.current) return false;
			const trimmedName = newName.trim();
			if (!trimmedName) {
				setError(t("myFiles.error.nameEmpty"));
				onError?.(t("myFiles.error.nameEmpty"));
				return false;
			}
			const invalidMsg = validateFileName(trimmedName, t);
			if (invalidMsg) {
				setError(invalidMsg);
				onError?.(invalidMsg);
				return false;
			}
			if (trimmedName === item.name) return true;
			renameLockRef.current = true;
			setLoading((prev) => ({
				...prev,
				rename: true
			}));
			setError(null);
			try {
				await store.getState().getClient().dir.rename({
					fileID: item.id,
					newName: trimmedName
				});
				onSuccess?.();
				return true;
			} catch (err) {
				const errMsg = extractSdkErrorMessage(err, t("myFiles.rename.failed"));
				setError(errMsg);
				onError?.(errMsg);
				toast.error(errMsg);
				return false;
			} finally {
				setLoading((prev) => ({
					...prev,
					rename: false
				}));
				renameLockRef.current = false;
			}
		}, [onSuccess, onError]),
		downloadItem: (0, import_react$11.useCallback)(async (item) => {
			if (item.isFolder) {
				setError(t("myFiles.error.folderNotSupported"));
				onError?.(t("myFiles.error.folderNotSupported"));
				return false;
			}
			if (downloadAbortRef.current) {
				console.log("[CancelDebug][use-file-operations] downloadItem aborting previous download");
				downloadAbortRef.current.abort();
			}
			const controller = new AbortController();
			downloadAbortRef.current = controller;
			console.log("[CancelDebug][use-file-operations] downloadItem START", {
				id: item.id,
				name: item.name,
				size: item.size
			});
			setLoading((prev) => ({
				...prev,
				download: true
			}));
			setError(null);
			try {
				const result = await store.getState().getClient().file.download({ fileID: item.id });
				if (!result?.url) {
					setError(t("myFiles.error.downloadLinkFailed"));
					onError?.(t("myFiles.error.downloadLinkFailed"));
					return false;
				}
				if (adapter.environmentType === "local" && adapter.saveFileToLocal) {
					let progressStarted = false;
					const saveResult = await adapter.saveFileToLocal(result.url, item.name, {
						onStart: () => {
							if (!progressStarted) {
								progressStarted = true;
								setDownloadState({
									fileName: item.name,
									percent: 0,
									status: "downloading"
								});
							}
						},
						onProgress: (percent) => {
							if (!progressStarted) {
								progressStarted = true;
								setDownloadState({
									fileName: item.name,
									percent: 0,
									status: "downloading"
								});
							}
							const displayPercent = percent >= 100 ? 100 : Math.floor(Math.max(0, percent));
							setDownloadState((prev) => ({
								...prev,
								percent: displayPercent
							}));
						},
						totalBytesHint: item.size,
						signal: controller.signal
					});
					if (saveResult.error === "User cancelled") {
						console.log("[CancelDebug][use-file-operations] downloadItem got User cancelled", {
							id: item.id,
							signalAborted: controller.signal.aborted
						});
						setDownloadState({
							fileName: "",
							percent: 0,
							status: "idle"
						});
						return false;
					}
					if (!saveResult.success) {
						setDownloadState({
							fileName: "",
							percent: 0,
							status: "idle"
						});
						throw new Error(saveResult.error || t("myFiles.download.failed"));
					}
					setDownloadState({
						fileName: "",
						percent: 0,
						status: "idle"
					});
					toast.success(t("myFiles.progress.downloading", { name: item.name }));
				} else triggerBrowserDownload(result.url, item.name);
				return true;
			} catch (err) {
				const errMsg = extractSdkErrorMessage(err, t("myFiles.download.failed"));
				setError(errMsg);
				onError?.(errMsg);
				toast.error(errMsg);
				setDownloadState({
					fileName: "",
					percent: 0,
					status: "idle"
				});
				return false;
			} finally {
				setLoading((prev) => ({
					...prev,
					download: false
				}));
				if (downloadAbortRef.current === controller) downloadAbortRef.current = null;
			}
		}, [adapter, onError]),
		cancelDownload,
		downloadState,
		deleteItem: (0, import_react$11.useCallback)(async (item) => {
			if (deleteLockRef.current) return false;
			deleteLockRef.current = true;
			setLoading((prev) => ({
				...prev,
				delete: true
			}));
			setError(null);
			try {
				await store.getState().getClient().dir.trash({ fileID: item.id });
				onSuccess?.();
				loadStorageCapacity(() => store.getState().getClient(), filesStore).catch(() => {});
				return true;
			} catch (err) {
				const errMsg = extractSdkErrorMessage(err, t("myFiles.delete.failed"));
				setError(errMsg);
				onError?.(errMsg);
				toast.error(errMsg);
				return false;
			} finally {
				setLoading((prev) => ({
					...prev,
					delete: false
				}));
				deleteLockRef.current = false;
			}
		}, [onSuccess, onError]),
		loading,
		error,
		clearError: (0, import_react$11.useCallback)(() => {
			setError(null);
		}, [])
	};
}
var import_react$11;
var init_use_file_operations = __esmMin((() => {
	init_src$1();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_netdrive_service();
	init_store$1();
	init_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/utils/mime-utils.ts
function getMimeTypeFromFilename(filename) {
	const dot = filename.lastIndexOf(".");
	if (dot < 0) return "application/octet-stream";
	return MIME_MAP[filename.slice(dot).toLowerCase()] || "application/octet-stream";
}
var MIME_MAP;
var init_mime_utils = __esmMin((() => {
	MIME_MAP = {
		".doc": "application/msword",
		".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		".xls": "application/vnd.ms-excel",
		".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		".ppt": "application/vnd.ms-powerpoint",
		".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		".pdf": "application/pdf",
		".rtf": "application/rtf",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".webp": "image/webp",
		".svg": "image/svg+xml",
		".bmp": "image/bmp",
		".txt": "text/plain",
		".md": "text/markdown",
		".csv": "text/csv",
		".json": "application/json",
		".mp3": "audio/mpeg",
		".wav": "audio/wav",
		".mp4": "video/mp4",
		".mov": "video/quicktime",
		".zip": "application/zip",
		".7z": "application/x-7z-compressed",
		".rar": "application/vnd.rar",
		".tar": "application/x-tar",
		".gz": "application/gzip"
	};
})), import_jsx_runtime$7, ContextMenu;
var init_context_menu = __esmMin((() => {
	init_lucide_react();
	require_react();
	init_useI18n();
	import_jsx_runtime$7 = require_jsx_runtime();
	ContextMenu = ({ visible, x, y, item, onRename, onDownload, onDelete, onClose }) => {
		if (!visible || !item) return null;
		const t = useTranslation();
		const handleRename = () => {
			onRename(item);
			onClose();
		};
		const handleDownload = () => {
			onDownload(item);
			onClose();
		};
		const handleDelete = () => {
			onDelete(item);
			onClose();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "upload-modal__context-menu",
			style: {
				left: x,
				top: y
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "upload-modal__context-menu-item",
					onClick: handleRename,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Pencil, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("myFiles.contextMenu.rename") })]
				}),
				!item.isFolder && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "upload-modal__context-menu-item",
					onClick: handleDownload,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Download, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("myFiles.contextMenu.download") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "upload-modal__context-menu-item upload-modal__context-menu-item--danger",
					onClick: handleDelete,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Trash2, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("myFiles.contextMenu.delete") })]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/upload-queue.tsx
function StatusIcon({ status }) {
	switch (status) {
		case "pending": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: "upload-modal__status-icon upload-modal__status-icon--pending" });
		case "uploading": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Loader, {
			size: 14,
			className: "upload-modal__status-icon upload-modal__status-icon--uploading"
		});
		case "success": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CircleCheckBig, {
			size: 14,
			className: "upload-modal__status-icon upload-modal__status-icon--success"
		});
		case "error": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CircleAlert, {
			size: 14,
			className: "upload-modal__status-icon upload-modal__status-icon--error"
		});
		case "conflict": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CircleAlert, {
			size: 14,
			className: "upload-modal__status-icon upload-modal__status-icon--conflict"
		});
		default: return null;
	}
}
var import_jsx_runtime$6, UploadQueue, UploadQueueItem;
var init_upload_queue = __esmMin((() => {
	init_lucide_react();
	require_react();
	init_useI18n();
	init_utils();
	import_jsx_runtime$6 = require_jsx_runtime();
	UploadQueue = ({ items, onRemove }) => {
		const t = useTranslation();
		if (items.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "upload-modal__queue",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "upload-modal__queue-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "upload-modal__queue-title",
					children: t("myFiles.upload.title", { count: items.length })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "upload-modal__queue-list",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(UploadQueueItem, {
					item,
					onRemove
				}, item.id))
			})]
		});
	};
	UploadQueueItem = ({ item, onRemove }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: `upload-modal__queue-item upload-modal__queue-item--${item.status}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "upload-modal__queue-item-info",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(StatusIcon, { status: item.status }),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "upload-modal__queue-item-name",
							title: item.fileName,
							children: item.fileName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "upload-modal__queue-item-size",
							children: formatFileSize(item.size)
						})
					]
				}),
				(item.status === "uploading" || item.status === "pending") && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "upload-modal__queue-item-percent",
					children: item.status === "uploading" ? `${item.progress}%` : t("myFiles.upload.pending")
				}),
				item.status === "error" && item.error && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "upload-modal__queue-item-error",
					children: item.error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					className: "upload-modal__queue-item-remove",
					onClick: () => onRemove(item.id),
					title: t("myFiles.upload.remove"),
					children: item.status === "uploading" ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(X, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Trash2, { size: 12 })
				})
			]
		});
	};
})), import_react_dom$1, import_jsx_runtime$5, UploadModalView;
var init_upload_modal_view = __esmMin((() => {
	init_upload_modal$2();
	init_lucide_react();
	require_react();
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_file_icons();
	init_file_row();
	init_folder_browser();
	init_conflict_modal();
	init_context_menu();
	init_upload_queue();
	import_jsx_runtime$5 = require_jsx_runtime();
	UploadModalView = ({ visible, overlayZIndex, title, labels, onClose, directory, fileInputRef, onFileInputChange, uploadQueue, showUploadQueue, onRemoveUploadItem, creatingFolderDisabled, onCreateFolder, confirmDisabled, onConfirm, saving, newFolder, contextMenu, conflict, beforeContent }) => {
		if (!visible) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_jsx_runtime$5.Fragment, { children: beforeContent });
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [beforeContent, (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "upload-modal-overlay",
			style: { zIndex: overlayZIndex },
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "upload-modal",
				onClick: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "upload-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
							className: "upload-modal__header-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h3", {
								className: "upload-modal__title",
								children: title
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							type: "button",
							className: "upload-modal__close",
							onClick: onClose,
							"aria-label": labels.close,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
									d: "M2.626 2.626a.6.6 0 0 1 .849 0L8 7.152l4.525-4.526a.6.6 0 0 1 .849.849L8.848 8l4.526 4.525a.6.6 0 0 1-.849.849L8 8.848l-4.525 4.526a.6.6 0 0 1-.849-.849L7.152 8 2.626 3.475a.6.6 0 0 1 0-.849z",
									fill: "currentColor"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FolderBrowser, {
						breadcrumbs: directory.breadcrumbs,
						onBreadcrumbNavigate: directory.onBreadcrumbNavigate,
						items: directory.items,
						loading: directory.loading,
						error: directory.error,
						loadingMore: directory.loadingMore,
						onScroll: directory.onScroll,
						listRef: directory.listRef,
						hideEmpty: directory.hideEmpty,
						onSearch: directory.onSearch,
						searchResults: directory.searchResults,
						renderRow: (item) => directory.rename?.item.id === item.id ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "upload-modal__rename-row",
							children: [getFileIcon(item.name, 20, item.type), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("input", {
								className: "upload-modal__rename-input",
								type: "text",
								value: directory.rename.value,
								onChange: (event) => directory.rename?.onChange(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") directory.rename?.onConfirm();
									if (event.key === "Escape") directory.rename?.onCancel();
								},
								onBlur: directory.rename.onConfirm,
								autoFocus: true
							})]
						}, item.id) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FileRow, {
							item,
							selected: directory.selectedFolderId === item.id,
							onToggleSelect: item.isFolder ? () => directory.onFolderSelect(item) : void 0,
							onEnter: item.isFolder ? () => directory.onFolderEnter(item) : void 0,
							onContextMenu: directory.onContextMenu
						}, item.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						className: "upload-modal__file-select-input",
						multiple: true,
						onChange: onFileInputChange
					}),
					showUploadQueue && uploadQueue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(UploadQueue, {
						items: uploadQueue,
						onRemove: onRemoveUploadItem
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "upload-modal__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
							className: "upload-modal__btn-create-folder",
							onClick: onCreateFolder,
							disabled: creatingFolderDisabled,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FolderPlus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: labels.newFolder })]
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "upload-modal__footer-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
								className: "upload-modal__btn-cancel",
								onClick: onClose,
								children: labels.cancel
							}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
								className: "upload-modal__btn-upload",
								disabled: confirmDisabled,
								onClick: onConfirm,
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: saving ? labels.saving : labels.confirm })
							})]
						})]
					}),
					newFolder && (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "cfp-folder-modal-overlay",
						onClick: newFolder.onCancel,
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "cfp-folder-modal",
							onClick: (event) => event.stopPropagation(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
									className: "cfp-folder-modal__header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", {
										className: "cfp-folder-modal__title",
										children: labels.newFolder
									}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
										className: "cfp-folder-modal__close",
										onClick: newFolder.onCancel,
										children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
												d: "M18 6L6 18M6 6l12 12",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round"
											})
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
									className: "cfp-folder-modal__body",
									children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("input", {
										ref: newFolder.inputRef,
										type: "text",
										className: "cfp-folder-modal__input",
										value: newFolder.value,
										onChange: (event) => newFolder.onChange(event.target.value),
										onKeyDown: (event) => {
											if (event.key === "Enter") newFolder.onConfirm();
											if (event.key === "Escape") newFolder.onCancel();
										},
										placeholder: labels.folderNamePlaceholder,
										autoFocus: true,
										disabled: newFolder.loading
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
									className: "cfp-folder-modal__footer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
										className: "cfp-folder-modal__btn cfp-folder-modal__btn--cancel",
										onClick: newFolder.onCancel,
										disabled: newFolder.loading,
										children: labels.cancel
									}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
										className: "cfp-folder-modal__btn cfp-folder-modal__btn--confirm",
										onClick: newFolder.onConfirm,
										disabled: !newFolder.value.trim() || newFolder.loading,
										children: newFolder.loading ? labels.creating : labels.create
									})]
								})
							]
						})
					}), document.body),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ContextMenu, { ...contextMenu }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ConflictModal, { ...conflict })
				]
			})
		}), document.body)] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/upload-modal.tsx
/** 安全 decode 文件名：如果是 URI 编码的则 decode，否则原样返回 */
function safeDecodeFileName(name) {
	if (!name || !name.includes("%")) return name;
	try {
		return decodeURIComponent(name);
	} catch {
		return name;
	}
}
var import_react$7, import_jsx_runtime$4, UploadModal;
var init_upload_modal$1 = __esmMin((() => {
	init_upload_modal$2();
	init_src$1();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_floating_layer();
	init_useI18n();
	init_use_create_folder();
	init_use_file_operations();
	init_use_modal_navigation();
	init_use_upload_queue();
	init_netdrive_store_context();
	init_mime_utils();
	init_top_progress_banner();
	init_upload_modal_view();
	import_jsx_runtime$4 = require_jsx_runtime();
	init_preload_helper();
	UploadModal = ({ visible, onClose, onUploadComplete, defaultFolderId, projectId, fileInfo, onSaveFile, onUploadToDrive, onViewSuccess, title: customTitle, rootFolderLabel }) => {
		const adapter = useAdapter();
		const t = useTranslation();
		const { netDriveStore } = useNetDriveContext();
		const overlayZIndex = useFloatingLayer(visible, { base: 1e4 });
		const modalTitle = customTitle || t("myFiles.save.title");
		const isProject = Boolean(projectId);
		const getSuccessMessage = (0, import_react$7.useCallback)((uploadedFileName) => isProject ? t("myFiles.save.successProject", { name: uploadedFileName }) : t("myFiles.save.success", { name: uploadedFileName }), [isProject, t]);
		const getBatchSuccessMessage = (0, import_react$7.useCallback)((successCount) => isProject ? t("myFiles.save.batchSuccessProject", { count: successCount }) : t("myFiles.save.batchSuccess", { count: successCount }), [isProject, t]);
		const getBatchSuccessWithSkippedMessage = (0, import_react$7.useCallback)((successCount, skippedCount) => isProject ? t("myFiles.save.batchSuccessWithSkippedProject", {
			count: successCount,
			skipped: skippedCount
		}) : t("myFiles.save.batchSuccessWithSkipped", {
			count: successCount,
			skipped: skippedCount
		}), [isProject, t]);
		const normalizedFileInfo = (0, import_react$7.useMemo)(() => {
			if (!fileInfo) return;
			return {
				...fileInfo,
				name: safeDecodeFileName(fileInfo.name)
			};
		}, [fileInfo]);
		const onViewSuccessRef = (0, import_react$7.useRef)(onViewSuccess);
		(0, import_react$7.useEffect)(() => {
			onViewSuccessRef.current = onViewSuccess;
		}, [onViewSuccess]);
		const { state: nav, enterFolder, navigateToBreadcrumb, loadMore, refresh } = useModalNavigation({
			enabled: visible,
			defaultFolderId,
			netDriveStore,
			rootFolderLabel
		});
		(0, import_react$7.useEffect)(() => {
			if (!visible || !adapter) return;
			const storeState = netDriveStore.getState();
			const targetProjectId = projectId ?? storeState.currentProjectId;
			if (storeState.initialized && storeState.tokenInfo && storeState.currentProjectId === targetProjectId) return;
			console.log("[UploadModal] NetDriveService 尚未初始化，自动初始化...", { projectId: targetProjectId });
			storeState.initialize(adapter, targetProjectId).then(() => {
				console.log("[UploadModal] NetDriveService 初始化成功，刷新列表");
				refresh();
			}).catch((err) => {
				console.error("[UploadModal] NetDriveService 初始化失败:", err);
			});
		}, [
			visible,
			adapter,
			refresh,
			projectId,
			netDriveStore
		]);
		const [selectedFolder, setSelectedFolder] = (0, import_react$7.useState)(null);
		const [searchResults, setSearchResults] = (0, import_react$7.useState)(null);
		const searchCursorRef = (0, import_react$7.useRef)("");
		const [searchHasMore, setSearchHasMore] = (0, import_react$7.useState)(false);
		const [searchLoadingMore, setSearchLoadingMore] = (0, import_react$7.useState)(false);
		const searchLoadingLockRef = (0, import_react$7.useRef)(false);
		const searchKeywordRef = (0, import_react$7.useRef)("");
		const handleSearchTrigger = (0, import_react$7.useCallback)(async (keyword) => {
			searchKeywordRef.current = keyword;
			if (!keyword) {
				setSearchResults(null);
				searchCursorRef.current = "";
				setSearchHasMore(false);
				return;
			}
			const storeState = netDriveStore.getState();
			if (!storeState.initialized) return;
			try {
				const result = await storeState.getClient().search.file({
					keywords: [keyword],
					parentID: void 0,
					limit: 20
				});
				const { mapDirEntryToFileItem } = await __vitePreload(async () => {
					const { mapDirEntryToFileItem } = await import("./locale-utils-TanlkH9x.js").then((n) => (n.U(), n.G));
					return { mapDirEntryToFileItem };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
				const { batchGetNicknames } = await __vitePreload(async () => {
					const { batchGetNicknames } = await import("./locale-utils-TanlkH9x.js").then((n) => (n.Q(), n.et));
					return { batchGetNicknames };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
				const items = result.hits.map((h) => mapDirEntryToFileItem(h));
				items.sort((a, b) => {
					const ta = a.updatedAt < 0xe8d4a51000 ? a.updatedAt * 1e3 : a.updatedAt;
					return (b.updatedAt < 0xe8d4a51000 ? b.updatedAt * 1e3 : b.updatedAt) - ta;
				});
				setSearchResults(items);
				const nc = result.nextCursor || "";
				searchCursorRef.current = nc;
				setSearchHasMore(nc !== "");
				const idsToResolve = items.filter((f) => f._authorId && typeof f._authorId === "string").map((f) => f._authorId);
				const uniqueIds = [...new Set(idsToResolve)];
				if (uniqueIds.length > 0) batchGetNicknames(uniqueIds, void 0, netDriveStore).then((nickMap) => {
					if (Object.keys(nickMap).length > 0) setSearchResults((prev) => prev?.map((f) => f._authorId && nickMap[f._authorId] && !f.updatedByName ? {
						...f,
						updatedByName: nickMap[f._authorId]
					} : f) ?? null);
				}).catch(() => {});
			} catch {
				setSearchResults([]);
				searchCursorRef.current = "";
				setSearchHasMore(false);
			}
		}, [netDriveStore]);
		/** 搜索模式下加载更多结果 */
		const loadMoreSearch = (0, import_react$7.useCallback)(async () => {
			if (searchLoadingLockRef.current || !searchCursorRef.current || !searchKeywordRef.current) return;
			searchLoadingLockRef.current = true;
			setSearchLoadingMore(true);
			try {
				const storeState = netDriveStore.getState();
				if (!storeState.initialized) return;
				const result = await storeState.getClient().search.file({
					keywords: [searchKeywordRef.current],
					parentID: void 0,
					limit: 20,
					cursor: searchCursorRef.current
				});
				const { mapDirEntryToFileItem } = await __vitePreload(async () => {
					const { mapDirEntryToFileItem } = await import("./locale-utils-TanlkH9x.js").then((n) => (n.U(), n.G));
					return { mapDirEntryToFileItem };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
				const { batchGetNicknames } = await __vitePreload(async () => {
					const { batchGetNicknames } = await import("./locale-utils-TanlkH9x.js").then((n) => (n.Q(), n.et));
					return { batchGetNicknames };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
				const items = result.hits.map((h) => mapDirEntryToFileItem(h));
				setSearchResults((prev) => [...prev || [], ...items].sort((a, b) => {
					const ta = a.updatedAt < 0xe8d4a51000 ? a.updatedAt * 1e3 : a.updatedAt;
					return (b.updatedAt < 0xe8d4a51000 ? b.updatedAt * 1e3 : b.updatedAt) - ta;
				}));
				const nc = result.nextCursor || "";
				searchCursorRef.current = nc;
				setSearchHasMore(nc !== "");
				const idsToResolve = items.filter((f) => f._authorId && typeof f._authorId === "string").map((f) => f._authorId);
				const uniqueIds = [...new Set(idsToResolve)];
				if (uniqueIds.length > 0) batchGetNicknames(uniqueIds, void 0, netDriveStore).then((nickMap) => {
					if (Object.keys(nickMap).length > 0) setSearchResults((prev) => prev?.map((f) => f._authorId && nickMap[f._authorId] && !f.updatedByName ? {
						...f,
						updatedByName: nickMap[f._authorId]
					} : f) ?? null);
				}).catch(() => {});
			} catch {
				setSearchHasMore(false);
			} finally {
				setSearchLoadingMore(false);
				searchLoadingLockRef.current = false;
			}
		}, [netDriveStore]);
		const queueRef = (0, import_react$7.useRef)([]);
		const { queue: uploadQueue, addFiles, startUpload, removeItem, resolveConflict, isUploading, overallProgress, clearCompleted, reset: resetUploadQueue } = useUploadQueue({
			targetFolderId: selectedFolder?.id ?? nav.currentFolderId,
			onUploadComplete: () => {
				refresh();
				onUploadComplete?.();
				if (normalizedFileInfo) {
					const successItems = queueRef.current.filter((it) => it.status === "success");
					const successCount = successItems.length;
					const requestedCount = normalizedFileInfo.count ?? 1;
					const skippedCount = Math.max(0, requestedCount - successCount);
					const successItemWithId = successItems.find((it) => !!it.uploadedFileId);
					const uploadedFileId = successItemWithId?.uploadedFileId;
					const uploadedFileName = successItemWithId?.fileName ?? normalizedFileInfo.name;
					if (successCount === 0) {
						clearCompleted();
						onClose();
						return;
					}
					let message;
					if (requestedCount === 1) message = getSuccessMessage(uploadedFileName);
					else if (skippedCount > 0) message = getBatchSuccessWithSkippedMessage(successCount, skippedCount);
					else message = getBatchSuccessMessage(successCount);
					toast({
						message,
						type: "success",
						duration: 5e3,
						offset: 56,
						action: onViewSuccessRef.current ? {
							label: t("myFiles.save.view"),
							onClick: () => {
								onViewSuccessRef.current?.({
									fileId: uploadedFileId,
									fileName: uploadedFileName
								});
							}
						} : void 0
					});
					clearCompleted();
					onClose();
				}
			},
			netDriveStore
		});
		queueRef.current = uploadQueue;
		const { createFolder, loading: isCreatingFolderLoading } = useCreateFolder({
			onSuccess: () => {
				refresh();
			},
			netDriveStore
		});
		const { renameItem, downloadItem, deleteItem } = useFileOperations({
			adapter,
			onSuccess: () => {
				refresh();
			},
			netDriveStore
		});
		const [isCreatingFolder, setIsCreatingFolder] = (0, import_react$7.useState)(false);
		const [newFolderName, setNewFolderName] = (0, import_react$7.useState)("");
		const newFolderInputRef = (0, import_react$7.useRef)(null);
		/** 点击新建文件夹：设置默认名称并全选 */
		const handleCreateFolderClick = (0, import_react$7.useCallback)(() => {
			setIsCreatingFolder(true);
			setNewFolderName(t("myFiles.newFolder"));
			setTimeout(() => {
				newFolderInputRef.current?.focus();
				newFolderInputRef.current?.select();
			}, 0);
		}, []);
		const [renamingItem, setRenamingItem] = (0, import_react$7.useState)(null);
		const [renameValue, setRenameValue] = (0, import_react$7.useState)("");
		const [contextMenu, setContextMenu] = (0, import_react$7.useState)({
			visible: false,
			x: 0,
			y: 0,
			item: null
		});
		const [isSavingFile, setIsSavingFile] = (0, import_react$7.useState)(false);
		const [serverConflict, setServerConflict] = (0, import_react$7.useState)(null);
		/** 分片读取取消标志：弹窗关闭或用户取消时置 true，中断循环 */
		const chunkedCancelledRef = (0, import_react$7.useRef)(false);
		const fileInputRef = (0, import_react$7.useRef)(null);
		const fileListRef = (0, import_react$7.useRef)(null);
		const handleScroll = (0, import_react$7.useCallback)((e) => {
			const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
			if (scrollHeight - scrollTop - clientHeight >= 100) return;
			if (searchResults !== null) {
				if (searchHasMore && !searchLoadingMore && !searchLoadingLockRef.current) loadMoreSearch();
				return;
			}
			if (!nav.hasMore || nav.loading || nav.loadingMore) return;
			loadMore();
		}, [
			nav.hasMore,
			nav.loading,
			nav.loadingMore,
			loadMore,
			searchResults,
			searchHasMore,
			searchLoadingMore,
			loadMoreSearch
		]);
		/** 搜索结果排序后用于展示（加载更多后统一排序，确保时间顺序正确） */
		const sortedSearchResults = (0, import_react$7.useMemo)(() => {
			if (!searchResults) return null;
			return [...searchResults].sort((a, b) => {
				const ta = a.updatedAt < 0xe8d4a51000 ? a.updatedAt * 1e3 : a.updatedAt;
				return (b.updatedAt < 0xe8d4a51000 ? b.updatedAt * 1e3 : b.updatedAt) - ta;
			});
		}, [searchResults]);
		(0, import_react$7.useEffect)(() => {
			if (!visible) {
				chunkedCancelledRef.current = true;
				resetUploadQueue();
				setIsSavingFile(false);
				setServerConflict(null);
				setSelectedFolder(null);
			}
		}, [visible, resetUploadQueue]);
		/** 进入子目录（点击右侧箭头） */
		const handleFolderEnter = (0, import_react$7.useCallback)((folder) => {
			if (!folder.isFolder) return;
			setSelectedFolder(null);
			const isFromSearch = searchResults !== null;
			setSearchResults(null);
			enterFolder(folder, isFromSearch);
		}, [
			enterFolder,
			nav.breadcrumbs,
			searchResults
		]);
		/** 选中文件夹（点击行体）— toggle 模式 */
		const handleFolderSelect = (0, import_react$7.useCallback)((folder) => {
			if (!folder.isFolder) return;
			setSelectedFolder((prev) => prev?.id === folder.id ? null : {
				id: folder.id,
				name: folder.name
			});
		}, []);
		/** 面包屑导航 */
		const handleBreadcrumbNavigate = (0, import_react$7.useCallback)((index) => {
			setSelectedFolder(null);
			navigateToBreadcrumb(index);
		}, [navigateToBreadcrumb, nav.breadcrumbs]);
		/** input[file] onChange */
		const handleFileInputChange = (0, import_react$7.useCallback)((e) => {
			const selectedFiles = Array.from(e.target.files ?? []);
			if (selectedFiles.length > 0) addFiles(selectedFiles);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}, [addFiles]);
		/** 取消单个上传项 */
		const handleRemoveUploadItem = (0, import_react$7.useCallback)((id) => {
			removeItem(id);
		}, [removeItem]);
		const isServerConflictResult = (0, import_react$7.useCallback)((result) => {
			const text = [
				result.code,
				result.message,
				result.error,
				result.stage
			].filter(Boolean).join(" ").toLowerCase();
			return text.includes("同名") || text.includes("conflict") || text.includes("exist") || text.includes("same name") || text.includes("duplicate");
		}, []);
		const runServerUpload = (0, import_react$7.useCallback)(async (uploadType) => {
			if (!normalizedFileInfo || !onUploadToDrive) return;
			const dirId = selectedFolder?.id ?? nav.currentFolderId;
			if (!dirId) {
				toast.error(t("myFiles.save.dirUnavailable"));
				return;
			}
			setIsSavingFile(true);
			setServerConflict(null);
			try {
				const result = await onUploadToDrive({
					dirId,
					uploadType,
					sizeHint: normalizedFileInfo.size
				});
				if (result.ok) {
					const displayName = safeDecodeFileName(result.fileName || normalizedFileInfo.name);
					const uploadedFileId = result.fileId;
					toast({
						message: getSuccessMessage(displayName),
						type: "success",
						duration: 5e3,
						offset: 56,
						action: onViewSuccessRef.current ? {
							label: t("myFiles.save.view"),
							onClick: () => {
								onViewSuccessRef.current?.({
									fileId: uploadedFileId,
									fileName: displayName
								});
							}
						} : void 0
					});
					refresh();
					onUploadComplete?.();
					onClose();
					return;
				}
				if (uploadType === "ask" && isServerConflictResult(result)) {
					setServerConflict(result);
					return;
				}
				toast.error(result.error || result.message || t("myFiles.save.failed"));
			} catch (err) {
				console.error("Failed to save file by upload-to-drive:", err);
				toast.error(err instanceof Error ? err.message : t("myFiles.save.failed"));
			} finally {
				setIsSavingFile(false);
			}
		}, [
			normalizedFileInfo,
			isServerConflictResult,
			nav.currentFolderId,
			onClose,
			onUploadComplete,
			onUploadToDrive,
			refresh,
			selectedFolder
		]);
		/** 开始上传/保存 */
		const handleStartAction = (0, import_react$7.useCallback)(async () => {
			const currentBreadcrumb = nav.breadcrumbs[nav.breadcrumbs.length - 1];
			if (currentBreadcrumb) setLastUploadFolder(currentBreadcrumb.id, currentBreadcrumb.name);
			if (normalizedFileInfo && onUploadToDrive) await runServerUpload("ask");
			else if (normalizedFileInfo?.localFilePath && adapter?.readFileChunked && !normalizedFileInfo.localFilePath.startsWith("agent://")) {
				chunkedCancelledRef.current = false;
				setIsSavingFile(true);
				try {
					const CHUNK_SIZE = 10485760;
					const chunks = [];
					let offset = 0;
					let done = false;
					while (!done) {
						if (chunkedCancelledRef.current) break;
						const chunk = await adapter.readFileChunked({
							filePath: normalizedFileInfo.localFilePath,
							offset,
							chunkSize: CHUNK_SIZE,
							sessionId: normalizedFileInfo.sessionId,
							allowedDirs: [normalizedFileInfo.localFilePath]
						});
						if (chunkedCancelledRef.current) break;
						if (chunk.bytesRead > 0) {
							const binaryStr = atob(chunk.data);
							const bytes = new Uint8Array(binaryStr.length);
							for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
							chunks.push(bytes);
						}
						offset += chunk.bytesRead;
						done = chunk.done;
					}
					if (!chunkedCancelledRef.current) {
						const blob = new Blob(chunks);
						const file = new File([blob], normalizedFileInfo.name, { type: getMimeTypeFromFilename(normalizedFileInfo.name) });
						addFiles([file]);
						await startUpload();
					}
				} catch (err) {
					if (!chunkedCancelledRef.current) {
						console.error("Failed to read file in chunks:", err);
						toast.error(err instanceof Error ? err.message : t("myFiles.save.failed"));
					}
				} finally {
					setIsSavingFile(false);
				}
			} else if (normalizedFileInfo && onSaveFile) {
				setIsSavingFile(true);
				try {
					const result = await onSaveFile();
					const files = Array.isArray(result) ? result : [result];
					if (files.length === 0) throw new Error("No files to upload");
					addFiles(files);
					await startUpload();
				} catch (err) {
					console.error("Failed to save file:", err);
					toast.error(t("myFiles.save.failed"));
				} finally {
					setIsSavingFile(false);
				}
			} else await startUpload();
		}, [
			normalizedFileInfo,
			onSaveFile,
			onUploadToDrive,
			addFiles,
			startUpload,
			nav.breadcrumbs,
			runServerUpload,
			adapter,
			t
		]);
		/** 右键菜单 */
		const handleContextMenu = (0, import_react$7.useCallback)((item, event) => {
			event.preventDefault();
			event.stopPropagation();
			setContextMenu({
				visible: true,
				x: event.clientX,
				y: event.clientY,
				item
			});
		}, []);
		/** 关闭右键菜单 */
		const handleCloseContextMenu = (0, import_react$7.useCallback)(() => {
			setContextMenu((prev) => ({
				...prev,
				visible: false,
				item: null
			}));
		}, []);
		/** 右键菜单 - 重命名（进入 inline 编辑模式） */
		const handleRenameStart = (0, import_react$7.useCallback)((item) => {
			setRenamingItem(item);
			setRenameValue(item.name);
		}, []);
		/** 重命名确认 */
		const handleRenameConfirm = (0, import_react$7.useCallback)(async () => {
			if (!renamingItem) return;
			if (renameValue.trim() && renameValue.trim() !== renamingItem.name) await renameItem(renamingItem, renameValue.trim());
			setRenamingItem(null);
			setRenameValue("");
		}, [
			renamingItem,
			renameValue,
			renameItem
		]);
		/** 重命名取消 */
		const handleRenameCancel = (0, import_react$7.useCallback)(() => {
			setRenamingItem(null);
			setRenameValue("");
		}, []);
		/** 右键菜单 - 下载 */
		const handleDownload = (0, import_react$7.useCallback)((item) => {
			downloadItem(item);
		}, [downloadItem]);
		/** 右键菜单 - 删除 */
		const handleDelete = (0, import_react$7.useCallback)((item) => {
			deleteItem(item);
		}, [deleteItem]);
		/** 新建文件夹确认 */
		const handleCreateFolderConfirm = (0, import_react$7.useCallback)(async () => {
			if (!newFolderName.trim()) {
				setIsCreatingFolder(false);
				setNewFolderName("");
				return;
			}
			if (await createFolder(nav.currentFolderId, newFolderName)) {
				setIsCreatingFolder(false);
				setNewFolderName("");
			}
		}, [
			newFolderName,
			createFolder,
			nav.currentFolderId
		]);
		/** 新建文件夹取消 */
		const handleCreateFolderCancel = (0, import_react$7.useCallback)(() => {
			setIsCreatingFolder(false);
			setNewFolderName("");
		}, []);
		(0, import_react$7.useEffect)(() => {
			if (!contextMenu.visible) return;
			const handleClick = () => handleCloseContextMenu();
			document.addEventListener("click", handleClick);
			return () => document.removeEventListener("click", handleClick);
		}, [contextMenu.visible, handleCloseContextMenu]);
		const hasPendingFiles = uploadQueue.some((item) => item.status === "pending");
		const hasQueuedFiles = uploadQueue.length > 0;
		const conflictItem = uploadQueue.find((item) => item.status === "conflict");
		const conflictFileName = conflictItem?.fileName ?? (serverConflict ? normalizedFileInfo?.name ?? "" : "");
		const saveBanner = /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TopProgressBanner, {
			visible: !!normalizedFileInfo && (isUploading || isSavingFile),
			action: "save",
			fileName: normalizedFileInfo?.name ?? "",
			percent: overallProgress > 0 ? overallProgress : -1,
			onCancel: () => {
				console.log("[CancelDebug][upload-modal] banner onCancel CLICK → resetUploadQueue + setIsSavingFile(false)");
				chunkedCancelledRef.current = true;
				resetUploadQueue();
				setIsSavingFile(false);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(UploadModalView, {
			visible,
			overlayZIndex,
			title: modalTitle,
			labels: {
				close: t("myFiles.common.close"),
				newFolder: t("myFiles.newFolder"),
				cancel: t("myFiles.common.cancel"),
				confirm: t("myFiles.common.confirm"),
				saving: t("myFiles.save.saving"),
				creating: t("myFiles.common.creating"),
				create: t("myFiles.common.create"),
				folderNamePlaceholder: t("myFiles.folder.namePlaceholder")
			},
			onClose,
			directory: {
				breadcrumbs: nav.breadcrumbs,
				items: nav.items,
				loading: nav.loading,
				error: nav.error,
				loadingMore: nav.loadingMore || searchLoadingMore,
				searchResults: sortedSearchResults,
				selectedFolderId: selectedFolder?.id ?? null,
				hideEmpty: isCreatingFolder,
				listRef: fileListRef,
				onBreadcrumbNavigate: handleBreadcrumbNavigate,
				onSearch: handleSearchTrigger,
				onScroll: handleScroll,
				onFolderSelect: handleFolderSelect,
				onFolderEnter: handleFolderEnter,
				onContextMenu: handleContextMenu,
				rename: renamingItem ? {
					item: renamingItem,
					value: renameValue,
					onChange: setRenameValue,
					onConfirm: handleRenameConfirm,
					onCancel: handleRenameCancel
				} : void 0
			},
			fileInputRef,
			onFileInputChange: handleFileInputChange,
			uploadQueue,
			showUploadQueue: !normalizedFileInfo,
			onRemoveUploadItem: handleRemoveUploadItem,
			creatingFolderDisabled: isUploading || isSavingFile || isCreatingFolderLoading,
			onCreateFolder: handleCreateFolderClick,
			confirmDisabled: (normalizedFileInfo ? hasQueuedFiles : !hasPendingFiles) || isUploading || isSavingFile,
			onConfirm: handleStartAction,
			saving: isUploading || isSavingFile,
			newFolder: isCreatingFolder ? {
				value: newFolderName,
				loading: isCreatingFolderLoading,
				inputRef: newFolderInputRef,
				onChange: setNewFolderName,
				onConfirm: handleCreateFolderConfirm,
				onCancel: handleCreateFolderCancel
			} : void 0,
			contextMenu: {
				visible: contextMenu.visible,
				x: contextMenu.x,
				y: contextMenu.y,
				item: contextMenu.item,
				onRename: handleRenameStart,
				onDownload: handleDownload,
				onDelete: handleDelete,
				onClose: handleCloseContextMenu
			},
			conflict: {
				visible: !!conflictItem || !!serverConflict,
				fileName: conflictFileName,
				conflictInfo: conflictItem?.conflictInfo,
				onOverwrite: () => {
					if (serverConflict) {
						runServerUpload("overwrite");
						return;
					}
					if (conflictItem) resolveConflict(conflictItem.id, "overwrite");
				},
				onKeepBoth: () => {
					if (serverConflict) {
						runServerUpload("rename");
						return;
					}
					if (conflictItem) resolveConflict(conflictItem.id, "keep-both");
				},
				onViewChanges: () => {},
				onGoBack: () => {
					if (serverConflict) {
						setServerConflict(null);
						return;
					}
					if (conflictItem) resolveConflict(conflictItem.id, "skip");
				},
				onClose: () => {
					if (serverConflict) {
						setServerConflict(null);
						return;
					}
					if (conflictItem) resolveConflict(conflictItem.id, "skip");
				}
			},
			beforeContent: saveBanner
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/upload-modal/index.ts
var init_upload_modal = __esmMin((() => {
	init_upload_modal$1();
	init_upload_modal_view();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/confirm-overwrite-dialog.tsx
function OverwriteConfirmContent({ fileName, portalContainer, onConfirm, onClose }) {
	const [visible, setVisible] = (0, import_react$6.useState)(true);
	const handleConfirm = () => {
		setVisible(false);
		onConfirm();
	};
	const handleClose = () => {
		setVisible(false);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ConfirmDialog, {
		visible,
		title: t("shareFile.overwriteTitle", { fileName }),
		content: t("shareFile.overwriteContent", { fileName }),
		confirmText: t("shareFile.confirmOverwrite"),
		cancelText: t("common.cancel"),
		confirmButtonColor: "#00C29A",
		portalContainer,
		disableOverlayClose: true,
		onConfirm: handleConfirm,
		onClose: handleClose
	});
}
/**
* 显示覆盖上传确认弹窗
* @param fileName 文件名
* @param portalContainer Portal 挂载目标容器，默认 document.body
* @returns Promise<boolean> — true 表示用户同意覆盖，false 表示取消
*/
function showOverwriteConfirmDialog(fileName, portalContainer) {
	return new Promise((resolve) => {
		const container = document.createElement("div");
		container.id = "overwrite-confirm-dialog-root";
		(portalContainer ?? document.body).appendChild(container);
		const root = (0, import_client.createRoot)(container);
		const cleanup = () => {
			root.unmount();
			container.remove();
		};
		const handleConfirm = () => {
			cleanup();
			resolve(true);
		};
		const handleClose = () => {
			cleanup();
			resolve(false);
		};
		root.render(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(OverwriteConfirmContent, {
			fileName,
			portalContainer,
			onConfirm: handleConfirm,
			onClose: handleClose
		}));
	});
}
var import_react$6, import_client, import_jsx_runtime$3;
var init_confirm_overwrite_dialog = __esmMin((() => {
	init_src$1();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_i18n();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tdoc-license.ts
/** 把后端 license_status 数字映射成业务枚举。 */
function mapStatus(raw) {
	switch (raw) {
		case 1: return "expiring";
		case 2: return "expired";
		case 3: return "none";
		default: return "normal";
	}
}
/** 把 license_expired_time 兼容字符串/数字解析为秒级时间戳。 */
function parseExpiredTime(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const num = Number(value);
		return Number.isFinite(num) ? num : 0;
	}
	return 0;
}
/** 把后端原始返回解析为业务 license 信息。 */
function buildLicenseInfo(result) {
	const raw = result ?? {};
	return {
		status: mapStatus(raw.license_status),
		isDocAdmin: !!raw.is_doc_admin,
		expiredTimeSec: parseExpiredTime(raw.license_expired_time),
		licenseType: typeof raw.license_type === "number" ? raw.license_type : 0,
		raw
	};
}
/** 清掉某企业的 license 缓存与在途请求（手动 refetch 时强制走真实网络）。 */
function invalidateLicenseCache(enterpriseId) {
	licenseCacheById.delete(enterpriseId);
	inflightLicenseById.delete(enterpriseId);
}
async function fetchLicenseDeduped(facade, enterpriseId) {
	const cached = licenseCacheById.get(enterpriseId);
	if (cached && Date.now() - cached.at < LICENSE_CACHE_TTL_MS) return cached.info;
	const existing = inflightLicenseById.get(enterpriseId);
	if (existing) return existing;
	const promise = (async () => {
		const info = buildLicenseInfo(await facade.getTdocsLicense({ enterpriseId }));
		licenseCacheById.set(enterpriseId, {
			at: Date.now(),
			info
		});
		return info;
	})().finally(() => {
		if (inflightLicenseById.get(enterpriseId) === promise) inflightLicenseById.delete(enterpriseId);
	});
	inflightLicenseById.set(enterpriseId, promise);
	return promise;
}
/**
* 拉取并解析腾讯文档 license 信息。
*
* @param enterpriseId      当前企业 ID（缺失时直接置为未加载状态）
*/
function useTdocLicense(enterpriseId) {
	const facade = useAgentServices()?.tencentDocs;
	const [loading, setLoading] = (0, import_react$5.useState)(false);
	const [info, setInfo] = (0, import_react$5.useState)(null);
	const [error, setError] = (0, import_react$5.useState)(null);
	const [nonce, setNonce] = (0, import_react$5.useState)(0);
	(0, import_react$5.useEffect)(() => {
		const id = enterpriseId?.trim() ?? "";
		if (!id) {
			setInfo(null);
			setError(null);
			return;
		}
		if (!facade?.getTdocsLicense) {
			console.warn("[TencentDocs] tencentDocs facade not available");
			return;
		}
		let cancelled = false;
		setLoading(true);
		setError(null);
		fetchLicenseDeduped(facade, id).then((next) => {
			if (cancelled) return;
			setInfo(next);
		}).catch((err) => {
			if (cancelled) return;
			console.warn("[TencentDocs][license] failed:", err);
			setError(err instanceof Error ? err.message : String(err));
			setInfo(null);
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		facade,
		enterpriseId,
		nonce
	]);
	return {
		loading,
		info,
		error,
		refetch: (0, import_react$5.useCallback)(() => {
			const id = enterpriseId?.trim() ?? "";
			if (id) invalidateLicenseCache(id);
			setNonce((n) => n + 1);
		}, [enterpriseId])
	};
}
/**
* 把秒级时间戳格式化为 "YYYY-MM-DD HH:mm"，用于横幅文案。
* 解析失败时返回空字符串，调用方需自行兜底。
*/
function formatTdocExpireTime(expiredTimeSec) {
	if (!expiredTimeSec || expiredTimeSec <= 0) return "";
	const date = /* @__PURE__ */ new Date(expiredTimeSec * 1e3);
	if (Number.isNaN(date.getTime())) return "";
	const pad = (n) => n.toString().padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
var import_react$5, LICENSE_CACHE_TTL_MS, inflightLicenseById, licenseCacheById;
var init_use_tdoc_license = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_app_providers();
	LICENSE_CACHE_TTL_MS = 5e3;
	inflightLicenseById = /* @__PURE__ */ new Map();
	licenseCacheById = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/license-banner.tsx
var import_react$4, import_jsx_runtime$2, RENEW_URL, LicenseBanner;
var init_license_banner = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_oneid_applications();
	init_useI18n();
	init_use_tdoc_license();
	import_jsx_runtime$2 = require_jsx_runtime();
	RENEW_URL = "https://saas.docs.qq.com/scenario/saas-website-payment.html?from=management&page_type=renew&source=ad_yindao&feature=admin_button";
	LicenseBanner = ({ info }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const currentAccount = useCurrentAccount();
		const tencentDocsFacade = useOneidSource();
		const openExternal = (0, import_react$4.useCallback)((url) => {
			if (adapter?.openExternal) adapter.openExternal(url).catch((err) => {
				console.error("[TencentDocs] openExternal failed:", err);
				window.open(url, "_blank", "noopener,noreferrer");
			});
			else window.open(url, "_blank", "noopener,noreferrer");
		}, [adapter]);
		/**
		* 「去分配」CTA：打开腾讯文档管理后台。
		*
		* 与右上角三个点菜单的「管理后台」入口走同一条链路 ——
		* 调 `tencentDocs.oneidGetSSOLoginLink({ module: 'admin' })` 拿一次性
		* SSO 免登链接，失败时降级到 `https://saas.docs.qq.com/`。
		*/
		const handleAssign = (0, import_react$4.useCallback)(async () => {
			const enterpriseId = (currentAccount?.enterpriseId ?? "").trim();
			const fallbackUrl = "https://saas.docs.qq.com/";
			if (!enterpriseId || !tencentDocsFacade?.oneidGetSSOLoginLink) {
				console.warn("[TencentDocs][LicenseBanner] missing enterpriseId or tencentDocs facade, fallback to", fallbackUrl);
				openExternal(fallbackUrl);
				return;
			}
			try {
				const resp = await tencentDocsFacade.oneidGetSSOLoginLink({
					enterpriseId,
					module: "admin"
				});
				const link = (resp?.link ?? "").trim();
				if (!link) {
					console.warn("[TencentDocs][LicenseBanner] oneidGetSSOLoginLink empty link, resp =", resp);
					openExternal(fallbackUrl);
					return;
				}
				openExternal(link);
			} catch (err) {
				console.error("[TencentDocs][LicenseBanner] oneidGetSSOLoginLink failed:", err);
				openExternal(fallbackUrl);
			}
		}, [
			tencentDocsFacade,
			currentAccount,
			openExternal
		]);
		if (!info) return null;
		const { status, isDocAdmin, expiredTimeSec } = info;
		if (status === "normal") return null;
		let message = "";
		let ctaText = "";
		let ctaUrl = "";
		let ctaOnClick = null;
		let tone = "warning";
		if (status === "expiring") {
			const time = formatTdocExpireTime(expiredTimeSec);
			if (isDocAdmin) {
				message = t("tdoc.license.expiring.admin", { time });
				ctaText = t("tdoc.license.cta.renew");
				ctaUrl = RENEW_URL;
			} else message = t("tdoc.license.expiring.member", { time });
			tone = "warning";
		} else if (status === "expired") {
			if (isDocAdmin) {
				message = t("tdoc.license.expired.admin");
				ctaText = t("tdoc.license.cta.renew");
				ctaUrl = RENEW_URL;
			} else message = t("tdoc.license.expired.member");
			tone = "danger";
		} else if (status === "none") {
			if (isDocAdmin) {
				message = t("tdoc.license.none.admin");
				ctaText = t("tdoc.license.cta.assign");
				ctaOnClick = () => {
					handleAssign().catch(() => void 0);
				};
			} else message = t("tdoc.license.none.member");
			tone = "danger";
		}
		const hasCta = !!ctaText && (!!ctaUrl || !!ctaOnClick);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: `tencent-docs-panel__license-banner tencent-docs-panel__license-banner--${tone}`,
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "tencent-docs-panel__license-banner__icon",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
								x1: "12",
								y1: "8",
								x2: "12",
								y2: "12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
								x1: "12",
								y1: "16",
								x2: "12.01",
								y2: "16"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "tencent-docs-panel__license-banner__msg",
					children: message
				}),
				hasCta && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					className: "tencent-docs-panel__license-banner__cta",
					onClick: () => {
						if (ctaOnClick) ctaOnClick();
						else if (ctaUrl) openExternal(ctaUrl);
					},
					children: ctaText
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tdoc-personal-license.ts
/**
* 拉取并缓存当前用户的腾讯文档个人许可证状态。
*
* @param enterpriseId   当前企业 ID（缺失时直接保持 null 不发请求）
* @param enabled        是否需要发起查询。一般传入「企业 license 是否处于
*                       none 状态」作为开关，避免 license=normal 时多余请求。
*/
function useTdocPersonalLicense(enterpriseId, enabled) {
	const facade = useAgentServices()?.tencentDocs;
	const [loading, setLoading] = (0, import_react$3.useState)(false);
	const [hasValidLicense, setHasValidLicense] = (0, import_react$3.useState)(null);
	const [error, setError] = (0, import_react$3.useState)(null);
	const [nonce, setNonce] = (0, import_react$3.useState)(0);
	(0, import_react$3.useEffect)(() => {
		if (!enabled) {
			setHasValidLicense(null);
			setError(null);
			return;
		}
		const id = enterpriseId?.trim() ?? "";
		if (!id) {
			setHasValidLicense(null);
			setError(null);
			return;
		}
		if (!facade?.verifyPersonalLicense) {
			console.warn("[TencentDocs] tencentDocs facade not available");
			setHasValidLicense(false);
			setError(null);
			return;
		}
		let cancelled = false;
		setLoading(true);
		setError(null);
		(async () => {
			try {
				const result = await facade.verifyPersonalLicense({ enterpriseId: id });
				if (cancelled) return;
				setHasValidLicense(result?.has_valid_license === true);
			} catch (err) {
				if (cancelled) return;
				console.warn("[TencentDocs][verify-personal-license] failed:", err);
				setError(err instanceof Error ? err.message : String(err));
				setHasValidLicense(false);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		facade,
		enterpriseId,
		enabled,
		nonce
	]);
	return {
		loading,
		hasValidLicense,
		error,
		refetch: (0, import_react$3.useCallback)(() => {
			setNonce((n) => n + 1);
		}, [])
	};
}
var import_react$3;
var init_use_tdoc_personal_license = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_app_providers();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-picker-modal/folder-picker-modal.less
var init_folder_picker_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-picker-modal/folder-picker-modal-view.tsx
var import_react$2, import_react_dom, import_jsx_runtime$1, FolderPickerModalView;
var init_folder_picker_modal_view = __esmMin((() => {
	init_folder_picker_modal$2();
	init_lucide_react();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_utils$1();
	init_empty_state();
	init_file_list();
	init_file_type_icon();
	import_jsx_runtime$1 = require_jsx_runtime();
	FolderPickerModalView = ({ visible, title, confirmText, labels, onClose, onConfirm, activeTab, onTabChange, rootLabel, folderPath, files, selectedFolderId, loading, loadingMore, hasMore, error, onFolderEnter, onFolderPick, onNavigateToFolder, onLoadMore, onRetry, blockingContent, banner, accessGranted, newFolderDisabled = false, confirmDisabled = false, newFolderDisabledTitle, onNewFolder, newFolder }) => {
		(0, import_react$2.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (event) => {
				if (event.key === "Escape" && !newFolder) onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			visible,
			onClose,
			newFolder
		]);
		const handleOverlayClick = (0, import_react$2.useCallback)((event) => {
			if (event.target === event.currentTarget) onClose();
		}, [onClose]);
		const columns = (0, import_react$2.useMemo)(() => [
			{
				key: "name",
				label: labels.name,
				flex: "1 1 auto",
				render: (file) => {
					const isPicked = selectedFolderId === file.file_id;
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "folder-picker-modal__name-cell",
						children: [
							file.is_folder && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: `folder-picker-modal__radio${isPicked ? " folder-picker-modal__radio--checked" : ""}`,
								"aria-label": isPicked ? labels.cancel : labels.pickFolder,
								"aria-pressed": isPicked,
								onClick: (event) => {
									event.stopPropagation();
									onFolderPick(file);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "folder-picker-modal__radio-dot" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FileTypeIcon, {
								type: file.type,
								ext: file.ext,
								isFolder: file.is_folder,
								size: 24
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "folder-picker-modal__name",
								title: file.title,
								children: file.title
							})
						]
					});
				}
			},
			{
				key: "owner",
				label: labels.owner,
				flex: "0 0 140px",
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "folder-picker-modal__cell-text",
					title: file.owner_name,
					children: file.owner_name || "-"
				})
			},
			{
				key: "modified",
				label: labels.lastEdited,
				flex: "0 0 180px",
				render: (file) => {
					const timestamp = file.last_modify_time || file.access_time;
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "folder-picker-modal__modified-cell",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "folder-picker-modal__cell-text",
							children: timestamp ? formatTime(timestamp) : "-"
						}), file.is_folder ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronRight, {
							className: "folder-picker-modal__row-chevron",
							size: 16,
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "folder-picker-modal__row-chevron-placeholder",
							"aria-hidden": true
						})]
					});
				}
			}
		], [
			labels,
			onFolderPick,
			selectedFolderId
		]);
		const rowClassName = (0, import_react$2.useCallback)((file) => {
			if (!file.is_folder) return "folder-picker-modal__row folder-picker-modal__row--file";
			return `folder-picker-modal__row folder-picker-modal__row--folder${selectedFolderId === file.file_id ? " folder-picker-modal__row--picked" : ""}`;
		}, [selectedFolderId]);
		if (!visible) return null;
		const directoryContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			banner,
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "folder-picker-modal__tabs folder-picker-modal__tabs--hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: `folder-picker-modal__tab ${activeTab === "drive" ? "folder-picker-modal__tab--active" : ""}`,
					onClick: () => onTabChange("drive"),
					children: labels.tabDrive
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: `folder-picker-modal__tab folder-picker-modal__tab--hidden ${activeTab === "space" ? "folder-picker-modal__tab--active" : ""}`,
					onClick: () => onTabChange("space"),
					children: labels.tabSpace
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "folder-picker-modal__location",
				children: folderPath.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "folder-picker-modal__location-current",
					children: rootLabel
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "folder-picker-modal__location-item folder-picker-modal__location-item--clickable",
					onClick: () => onNavigateToFolder("root"),
					children: rootLabel
				}), folderPath.map((item, index) => {
					const isLast = index === folderPath.length - 1;
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_react$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "folder-picker-modal__location-sep",
						children: "/"
					}), isLast ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "folder-picker-modal__location-current",
						children: item.name
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						type: "button",
						className: "folder-picker-modal__location-item folder-picker-modal__location-item--clickable",
						onClick: () => onNavigateToFolder(item.id),
						children: item.name
					})] }, item.id);
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "folder-picker-modal__body",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VirtualList, {
					data: files,
					columns,
					rowKey: (file) => file.file_id,
					loading,
					loadingMore,
					hasMore,
					error,
					onRowClick: onFolderEnter,
					onLoadMore,
					onRetry,
					loadingMoreText: labels.loadingMore,
					rowClassName,
					renderEmpty: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EmptyState, { type: "no-files" }),
					renderError: (message, retry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tdoc-file-list__error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-icon",
								children: "⚠️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-message",
								children: message
							}),
							retry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								className: "tdoc-file-list__error-retry",
								onClick: retry,
								children: labels.retry
							})
						]
					})
				})
			})
		] });
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "folder-picker-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "folder-picker-modal",
				role: "dialog",
				"aria-modal": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "folder-picker-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "folder-picker-modal__title",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "folder-picker-modal__close",
							onClick: onClose,
							"aria-label": labels.close,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(X, { size: 16 })
						})]
					}),
					blockingContent ?? directoryContent,
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "folder-picker-modal__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
							type: "button",
							className: "folder-picker-modal__new-folder",
							onClick: onNewFolder,
							disabled: !accessGranted || newFolderDisabled,
							title: newFolderDisabledTitle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								"aria-hidden": true,
								children: "＋"
							}), labels.newFolder]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "folder-picker-modal__footer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "folder-picker-modal__cancel-btn",
								onClick: onClose,
								children: labels.cancel
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "folder-picker-modal__confirm-btn",
								onClick: onConfirm,
								disabled: !accessGranted || confirmDisabled,
								children: confirmText
							})]
						})]
					})
				]
			})
		}), newFolder && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "folder-picker-modal-overlay folder-picker-modal-overlay--nested",
			onClick: (event) => {
				if (event.target === event.currentTarget) newFolder.onCancel();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "new-folder-modal",
				role: "dialog",
				"aria-modal": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "new-folder-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "new-folder-modal__title",
							children: labels.newFolder
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "folder-picker-modal__close",
							onClick: newFolder.onCancel,
							"aria-label": labels.close,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(X, { size: 16 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "new-folder-modal__body",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
							ref: newFolder.inputRef,
							type: "text",
							className: "new-folder-modal__input",
							placeholder: labels.newFolderPrompt,
							value: newFolder.value,
							maxLength: 36,
							disabled: newFolder.loading,
							onChange: (event) => newFolder.onChange(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									newFolder.onConfirm();
								}
								if (event.key === "Escape") {
									event.preventDefault();
									newFolder.onCancel();
								}
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "new-folder-modal__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "folder-picker-modal__cancel-btn",
							onClick: newFolder.onCancel,
							disabled: newFolder.loading,
							children: labels.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "folder-picker-modal__confirm-btn",
							onClick: newFolder.onConfirm,
							disabled: newFolder.loading || !newFolder.value.trim(),
							children: labels.confirm
						})]
					})
				]
			})
		})] }), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-picker-modal/use-select-input-on-open.ts
/** 弹窗每次从关闭切换为打开时，聚焦并全选输入框一次。 */
function useSelectInputOnOpen(open, inputRef) {
	(0, import_react$1.useEffect)(() => {
		if (!open) return;
		const id = setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		}, 0);
		return () => clearTimeout(id);
	}, [open, inputRef]);
}
var import_react$1;
var init_use_select_input_on_open = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-picker-modal/folder-picker-modal.tsx
var import_react, import_jsx_runtime, ROOT_LABEL_KEY, TAB_LIST_TYPE, FolderPickerModal;
var init_folder_picker_modal$1 = __esmMin((() => {
	init_src$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_useI18n();
	init_services();
	init_file_service();
	init_constants();
	init_use_file_list();
	init_use_tdoc_check_auth_gate();
	init_use_tdoc_license();
	init_use_tdoc_personal_license();
	init_store();
	init_telemetry();
	init_types();
	init_auth_guide();
	init_license_banner();
	init_oneid_activation_guide();
	init_folder_picker_modal_view();
	init_use_select_input_on_open();
	import_jsx_runtime = require_jsx_runtime();
	ROOT_LABEL_KEY = {
		drive: "tdoc.folderPicker.rootDrive",
		space: "tdoc.folderPicker.rootSpace"
	};
	TAB_LIST_TYPE = {
		drive: ListType.MY_DOC,
		space: ListType.COLLABORATION_LIST
	};
	FolderPickerModal = ({ visible, onClose, onSelect, title, confirmText }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const tencentDocs = useTencentDocsFacade();
		const currentAccount = useCurrentAccount();
		const [activeTab, setActiveTab] = (0, import_react.useState)("drive");
		const [creatingFolder, setCreatingFolder] = (0, import_react.useState)(false);
		const [pickedFolder, setPickedFolder] = (0, import_react.useState)(null);
		const [newFolderInput, setNewFolderInput] = (0, import_react.useState)(null);
		const newFolderInputRef = (0, import_react.useRef)(null);
		const authStatus = useTencentDocsStore((state) => state.authStatus);
		const authError = useTencentDocsStore((state) => state.authError);
		const authorizeUrl = useTencentDocsStore((state) => state.authorizeUrl);
		const isAuthorized = authStatus === "connected";
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const oneidStatus = useOneidAppStatus("doc");
		const triggerCheckAuth = useTdocCheckAuthGate();
		const isAccessGranted = isEnterpriseEdition ? oneidStatus.status === "enabled" : isAuthorized;
		const licenseInfo = useTdocLicense(currentAccount?.enterpriseId).info;
		const personalLicense = useTdocPersonalLicense(currentAccount?.enterpriseId, isEnterpriseEdition);
		const isLicenseNone = personalLicense.hasValidLicense === false;
		const bannerLicenseInfo = (0, import_react.useMemo)(() => {
			if (!isEnterpriseEdition) return null;
			if (isLicenseNone) return licenseInfo ? {
				...licenseInfo,
				status: "none"
			} : {
				status: "none",
				isDocAdmin: false,
				expiredTimeSec: 0,
				licenseType: 0,
				raw: {}
			};
			if (!licenseInfo) return null;
			if (licenseInfo.status === "none" && personalLicense.hasValidLicense === true) return {
				...licenseInfo,
				status: "normal"
			};
			return licenseInfo;
		}, [
			isEnterpriseEdition,
			isLicenseNone,
			licenseInfo,
			personalLicense.hasValidLicense
		]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			tencentDocsStore.getState().setAdapter(adapter);
			tencentDocsStore.getState().setFacade(tencentDocs);
			triggerCheckAuth();
			return () => {
				tencentDocsStore.getState().stopPolling();
			};
		}, [
			visible,
			adapter,
			tencentDocs,
			triggerCheckAuth
		]);
		(0, import_react.useEffect)(() => {
			if (visible && isAccessGranted) reportSaveToTdocPopShow(adapter);
		}, [
			visible,
			isAccessGranted,
			adapter
		]);
		(0, import_react.useEffect)(() => {
			if (visible) {
				setActiveTab("drive");
				setPickedFolder(null);
			}
		}, [visible]);
		const fileList = useFileList({
			listType: TAB_LIST_TYPE[activeTab],
			enabled: isAccessGranted
		});
		(0, import_react.useEffect)(() => {
			setPickedFolder(null);
		}, [fileList.currentFolderId, activeTab]);
		const handleFolderEnter = (0, import_react.useCallback)((file) => {
			if (file.is_folder) fileList.enterFolder(file.file_id, file.title);
		}, [fileList]);
		const handlePickFolder = (0, import_react.useCallback)((file) => {
			if (!file.is_folder) return;
			setPickedFolder((previous) => previous?.id === file.file_id ? null : {
				id: file.file_id,
				name: file.title
			});
		}, []);
		const rootLabel = t(ROOT_LABEL_KEY[activeTab]);
		const confirmSelection = (0, import_react.useMemo)(() => {
			const path = fileList.folderPath;
			if (pickedFolder) return {
				folder_id: pickedFolder.id,
				name: pickedFolder.name,
				tab: activeTab,
				pathDepth: path.length + 1
			};
			if (path.length === 0) return {
				folder_id: ROOT_FOLDER_ID,
				name: rootLabel,
				tab: activeTab,
				pathDepth: 0
			};
			const tail = path[path.length - 1];
			return {
				folder_id: tail.id,
				name: tail.name,
				tab: activeTab,
				pathDepth: path.length
			};
		}, [
			pickedFolder,
			fileList.folderPath,
			rootLabel,
			activeTab
		]);
		const handleConfirm = (0, import_react.useCallback)(() => {
			onSelect(confirmSelection);
			onClose();
		}, [
			confirmSelection,
			onSelect,
			onClose
		]);
		const handleTabChange = (0, import_react.useCallback)((tab) => {
			if (tab !== activeTab) setActiveTab(tab);
		}, [activeTab]);
		const handleCreateFolder = (0, import_react.useCallback)(() => {
			if (!creatingFolder) setNewFolderInput(t("tdoc.folderPicker.newFolderDefaultName"));
		}, [creatingFolder, t]);
		const handleCancelNewFolder = (0, import_react.useCallback)(() => {
			setNewFolderInput(null);
		}, []);
		const handleConfirmNewFolder = (0, import_react.useCallback)(async () => {
			const name = newFolderInput?.trim();
			if (!name || creatingFolder) return;
			setCreatingFolder(true);
			try {
				await createFile(tencentDocs, {
					name,
					type: FileType.FOLDER,
					folder_id: fileList.currentFolderId ?? void 0
				});
				await fileList.loadFiles();
				toast({
					message: t("tdoc.folderPicker.newFolderSuccess"),
					type: "success"
				});
				setNewFolderInput(null);
			} catch (error) {
				console.error("[FolderPickerModal] create folder failed:", error);
				toast({
					message: t("tdoc.folderPicker.newFolderFailed"),
					type: "error"
				});
			} finally {
				setCreatingFolder(false);
			}
		}, [
			tencentDocs,
			fileList,
			t,
			newFolderInput,
			creatingFolder
		]);
		useSelectInputOnOpen(newFolderInput !== null, newFolderInputRef);
		let blockingContent;
		if (isEnterpriseEdition) {
			if (oneidStatus.status === "checking") blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "folder-picker-modal__auth-loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
			});
			else if (oneidStatus.status !== "enabled") blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "folder-picker-modal__auth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneidActivationGuide, {
					appType: "doc",
					activationCode: oneidStatus.activationCode,
					appName: oneidStatus.appName,
					onActivated: () => {
						oneidStatus.refresh().catch(() => void 0);
					}
				})
			});
		} else if (authStatus === "checking") blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "folder-picker-modal__auth-loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
		});
		else if (!isAuthorized) blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "folder-picker-modal__auth",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuide, {
				authStatus,
				error: authError,
				authorizeUrl,
				onAuthorize: () => tencentDocsStore.getState().startAuthorization(),
				onRetry: triggerCheckAuth,
				authSource: "file_upload"
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPickerModalView, {
			visible,
			title: title ?? t("tdoc.folderPicker.title"),
			confirmText: confirmText ?? t("common.confirm"),
			labels: {
				close: t("common.close"),
				cancel: t("common.cancel"),
				confirm: t("common.confirm"),
				newFolder: t("tdoc.folderPicker.newFolder"),
				newFolderPrompt: t("tdoc.folderPicker.newFolderPrompt"),
				tabDrive: t("tdoc.folderPicker.tabDrive"),
				tabSpace: t("tdoc.folderPicker.tabSpace"),
				name: t("tdoc.name"),
				owner: t("tdoc.owner"),
				lastEdited: t("tdoc.folderPicker.lastEdited"),
				pickFolder: t("tdoc.folderPicker.pickFolder"),
				loadingMore: t("common.loadingMore"),
				retry: t("tdoc.error.retry")
			},
			onClose,
			onConfirm: handleConfirm,
			activeTab,
			onTabChange: handleTabChange,
			rootLabel,
			folderPath: fileList.folderPath,
			files: fileList.files,
			selectedFolderId: pickedFolder?.id ?? null,
			loading: fileList.loading,
			loadingMore: fileList.loadingMore,
			hasMore: fileList.hasMore,
			error: fileList.error,
			onFolderEnter: handleFolderEnter,
			onFolderPick: handlePickFolder,
			onNavigateToFolder: fileList.navigateToFolder,
			onLoadMore: fileList.loadMore,
			onRetry: fileList.loadFiles,
			blockingContent,
			banner: isEnterpriseEdition && bannerLicenseInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseBanner, { info: bannerLicenseInfo }) : void 0,
			accessGranted: isAccessGranted,
			newFolderDisabled: creatingFolder || activeTab === "space" || isLicenseNone,
			confirmDisabled: isLicenseNone,
			newFolderDisabledTitle: activeTab === "space" ? t("tdoc.folderPicker.newFolderDisabledInSpace") : void 0,
			onNewFolder: handleCreateFolder,
			newFolder: newFolderInput === null ? void 0 : {
				value: newFolderInput,
				loading: creatingFolder,
				onChange: setNewFolderInput,
				onConfirm: handleConfirmNewFolder,
				onCancel: handleCancelNewFolder,
				inputRef: newFolderInputRef
			}
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-picker-modal/index.ts
var init_folder_picker_modal = __esmMin((() => {
	init_folder_picker_modal$1();
	init_folder_picker_modal_view();
}));
//#endregion
export { useCreateFolder as A, init_markdown_image_uploader as B, FolderBrowser as C, init_use_modal_navigation as D, init_file_row as E, init_publish_utils as F, preprocessMarkdownImagesWithBackend as H, isHtmlFile as I, isKnowledgeFile as L, computeBlobHash as M, getPublishCache as N, useModalNavigation as O, getPublishedLocalHash as P, removePublishCache as R, init_conflict_modal as S, FileRow as T, isMarkdownPath as V, UploadModalView as _, init_folder_picker_modal_view as a, init_mime_utils as b, LicenseBanner as c, useTdocLicense as d, init_confirm_overwrite_dialog as f, init_upload_modal$1 as g, UploadModal as h, FolderPickerModalView as i, buildHtmlUpload as j, init_use_create_folder as k, init_license_banner as l, init_upload_modal as m, FolderPickerModal as n, init_use_tdoc_personal_license as o, showOverwriteConfirmDialog as p, init_folder_picker_modal$1 as r, useTdocPersonalLicense as s, init_folder_picker_modal as t, init_use_tdoc_license as u, init_upload_modal_view as v, init_folder_browser as w, ConflictModal as x, getMimeTypeFromFilename as y, savePublishCache as z };
