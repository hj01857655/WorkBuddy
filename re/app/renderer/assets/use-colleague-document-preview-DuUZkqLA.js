import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ji as init_attachment_preview_cache, O3 as init_document_preview_context, Wi as init_attachment_preview, YT as isSafeUserAttachmentUrl, ZT as readUserAttachmentUrl, k3 as useOptionalDocumentPreviewBridge, qi as getColleagueAttachmentPreviewFile } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-colleague-document-preview.ts
function getExtension(filePath) {
	const cleanPath = filePath.replace(/[?#].*$/, "");
	const idx = cleanPath.lastIndexOf(".");
	return idx >= 0 ? cleanPath.slice(idx + 1).toLowerCase() : "";
}
function isColleagueSdkDocumentPreviewPath(filePath) {
	if (!filePath) return false;
	return COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS.has(getExtension(filePath));
}
function getSafePreviewFilename(filePath) {
	const rawName = filePath.replace(/[?#].*$/, "").split("/").filter(Boolean).pop() || "document";
	try {
		return decodeURIComponent(rawName).replace(/[/\\]/g, "_");
	} catch {
		return rawName.replace(/[/\\]/g, "_");
	}
}
function uint8ArrayToBase64(bytes) {
	const chunkSize = 32768;
	let binary = "";
	for (let i = 0; i < bytes.length; i += chunkSize) binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
	return btoa(binary);
}
function isTooLargeError(error) {
	const message = (error instanceof Error ? error.message : String(error ?? "")).toLowerCase();
	return message.includes("exceeds preview size limit") || message.includes("content is too large");
}
function colleaguePreviewTooLargeResult(size) {
	return {
		success: false,
		error: COLLEAGUE_DOCUMENT_PREVIEW_TOO_LARGE_ERROR,
		previewTooLarge: true,
		previewSizeLimit: COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES,
		previewSizeBytes: typeof size === "number" && size > 0 ? size : void 0
	};
}
/**
* 读取同事助理文档预览字节。缓存 File / Content-Length 超 50MB 时不读正文。
*/
async function loadColleagueDocumentBytes(params) {
	const { filePath, cachedFile, readFileWithFormat } = params;
	if (cachedFile) {
		if (cachedFile.size > 52428800) return {
			ok: false,
			tooLarge: true,
			size: cachedFile.size
		};
		const content = new Uint8Array(await cachedFile.arrayBuffer());
		if (content.byteLength > 52428800) return {
			ok: false,
			tooLarge: true,
			size: content.byteLength
		};
		return {
			ok: true,
			content
		};
	}
	try {
		let content;
		if (isSafeUserAttachmentUrl(filePath)) content = await readUserAttachmentUrl(filePath, "bytes");
		else if (readFileWithFormat) content = await readFileWithFormat(filePath, "bytes");
		else throw new Error("Document reader is unavailable");
		if (!(content instanceof Uint8Array)) throw new Error("Unexpected document content");
		if (content.byteLength > 52428800) return {
			ok: false,
			tooLarge: true,
			size: content.byteLength
		};
		return {
			ok: true,
			content
		};
	} catch (error) {
		if (isTooLargeError(error)) return {
			ok: false,
			tooLarge: true
		};
		throw error;
	}
}
/** 为同事助理 doc/docx/ppt/pptx/pdf 远端产物提供 Desktop 腾讯文档 SDK 预览 URL。 */
function useColleagueDocumentPreview(readFileWithFormat) {
	const previewDocumentFromContent = useOptionalDocumentPreviewBridge()?.previewDocumentFromContent;
	const getPreviewUrl = (0, import_react.useCallback)(async (filePath) => {
		if (!isColleagueSdkDocumentPreviewPath(filePath)) return {
			success: false,
			error: "Use built-in preview fallback"
		};
		if (!previewDocumentFromContent) return {
			success: false,
			error: "Document preview bridge is unavailable"
		};
		if (!isSafeUserAttachmentUrl(filePath) && !readFileWithFormat) return {
			success: false,
			error: "Document reader is unavailable"
		};
		const loaded = await loadColleagueDocumentBytes({
			filePath,
			cachedFile: getColleagueAttachmentPreviewFile(filePath),
			readFileWithFormat
		});
		if (!loaded.ok) return colleaguePreviewTooLargeResult(loaded.size);
		return previewDocumentFromContent({
			filename: getSafePreviewFilename(filePath),
			contentBase64: uint8ArrayToBase64(loaded.content)
		});
	}, [previewDocumentFromContent, readFileWithFormat]);
	return (0, import_react.useMemo)(() => previewDocumentFromContent ? getPreviewUrl : void 0, [getPreviewUrl, previewDocumentFromContent]);
}
var import_react, COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS, COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES, COLLEAGUE_DOCUMENT_PREVIEW_TOO_LARGE_ERROR;
var init_use_colleague_document_preview = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_document_preview_context();
	init_attachment_preview();
	init_attachment_preview_cache();
	COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS = /* @__PURE__ */ new Set([
		"doc",
		"docx",
		"ppt",
		"pptx",
		"pdf"
	]);
	COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES = 52428800;
	COLLEAGUE_DOCUMENT_PREVIEW_TOO_LARGE_ERROR = "Document exceeds preview size limit";
}));
//#endregion
export { isColleagueSdkDocumentPreviewPath as n, useColleagueDocumentPreview as r, init_use_colleague_document_preview as t };
