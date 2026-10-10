import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { FK as init_conversations, Gt as DEFAULT_CONVERSATION_EMBED_EMPTY_PROVIDERS, I1 as t, N1 as onLocaleChange, Wt as ConversationEmbedEmptyView, c3 as getWb, in as ConversationEngineView, j1 as init_i18n, jt as init_conversation, k1 as getLocale, l2 as WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, l3 as init_wb_singleton } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ds as compressImageToTarget, Ea as subscribeEditCommand, Ev as require_react, Hc as init_content_block, Ic as createImageBlock, Os as init_image_compress, Ta as init_wb_edit_command_bridge, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as extensionOf, c as normalizeOfficeFilePath, i as useOfficeServices, o as supportsOfficeAiChat, s as fileNameFromPath } from "./bootstrap-D7qmlJvj.js";
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-file-attachment-block.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
init_content_block();
init_image_compress();
init_wb_edit_command_bridge();
init_wb_singleton();
init_i18n();
init_conversations();
init_conversation();
/**
* 首轮附件气泡：把 Office 窗当前文件作为 resource_link 附在首条消息上。
*
* 这样用户回主客户端看这条任务时，对话流里同样能定位到这个文件；模型侧
* `materializeConversationRuntimePrompt` 会把本地 resource_link 展开成
* `@<绝对路径>`，AI 也就知道在聊哪个文件。
*/
function getOfficeFileIconKind(fileName) {
	const extension = fileName.split(".").pop()?.toLowerCase();
	if (extension === "pdf") return "pdf";
	if (extension === "doc" || extension === "docx") return "word";
	if (extension === "ppt" || extension === "pptx") return "presentation";
	if (extension === "xls" || extension === "xlsx" || extension === "csv") return "spreadsheet";
	if (extension === "md" || extension === "markdown") return "markdown";
	if (extension === "html" || extension === "htm") return "html";
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"svg",
		"ico",
		"avif"
	].includes(extension ?? "")) return "image";
	if ([
		"mp4",
		"webm",
		"ogv",
		"m4v",
		"mov",
		"3gp"
	].includes(extension ?? "")) return "video";
	if ([
		"mp3",
		"wav",
		"aac",
		"flac",
		"ogg",
		"m4a",
		"opus",
		"wma"
	].includes(extension ?? "")) return "audio";
	return "default";
}
function toOfficeFileUri(filePath) {
	const normalized = normalizeOfficeFilePath(filePath);
	if (!normalized) return "";
	return normalized.startsWith("/") ? `file://${normalized}` : `file:///${normalized}`;
}
function createOfficeFileAttachmentBlock(filePath) {
	const normalized = normalizeOfficeFilePath(filePath);
	if (!normalized) return null;
	const fileName = fileNameFromPath(normalized);
	const extension = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() : void 0;
	return {
		type: "resource_link",
		uri: toOfficeFileUri(normalized),
		name: fileName,
		title: fileName,
		_meta: {
			displayAsContext: false,
			displayAsPhrase: true,
			icon: "file",
			iconKind: getOfficeFileIconKind(fileName),
			extension,
			mentionType: "file",
			type: "file",
			filePath: normalized,
			path: normalized,
			relativePath: normalized,
			fileName,
			filename: fileName,
			displayText: fileName
		}
	};
}
function isSameFileAttachment(block, filePath) {
	if (!block || typeof block !== "object") return false;
	const candidate = block;
	if (candidate.type !== "resource_link") return false;
	const normalized = normalizeOfficeFilePath(filePath);
	const metaPath = candidate._meta?.filePath;
	if (typeof metaPath === "string" && normalizeOfficeFilePath(metaPath) === normalized) return true;
	return candidate.uri === toOfficeFileUri(normalized);
}
/**
* 把当前文件附件插到首条消息最前面。
*
* 用户已经手动引用过同一个文件时不重复插入，否则气泡会出现两次。
*/
function withOfficeFileAttachment(blocks, filePath) {
	const attachment = createOfficeFileAttachmentBlock(filePath);
	if (!attachment) return [...blocks];
	if (blocks.some((block) => isSameFileAttachment(block, filePath))) return [...blocks];
	return [attachment, ...blocks];
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-ai-file-context.ts
var MB = 1048576;
var OFFICE_IMAGE_READ_LIMIT_BYTES = 10 * MB;
var OFFICE_IMAGE_SEND_LIMIT_BYTES = 5 * MB;
var MIME_BY_EXTENSION = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif",
	webp: "image/webp",
	bmp: "image/bmp",
	svg: "image/svg+xml",
	ico: "image/x-icon",
	avif: "image/avif"
};
function base64ToFile(base64, fileName, mimeType) {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return new File([bytes], fileName, { type: mimeType });
}
function readFileAsBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("读取图片失败"));
		reader.onload = () => {
			const value = typeof reader.result === "string" ? reader.result : "";
			resolve(value.includes(",") ? value.slice(value.indexOf(",") + 1) : value);
		};
		reader.readAsDataURL(file);
	});
}
async function createOfficeImageContextBlock(filePath, deps) {
	const fileName = fileNameFromPath(filePath);
	const mimeType = MIME_BY_EXTENSION[extensionOf(filePath)] ?? "image/png";
	const size = await deps.getSize(filePath);
	if (!Number.isFinite(size) || size <= 0 || size > OFFICE_IMAGE_READ_LIMIT_BYTES) throw new Error(t("office.ai.imageTooLarge", { limit: OFFICE_IMAGE_READ_LIMIT_BYTES / MB }));
	const rawBase64 = await deps.readBase64(filePath);
	let imageFile = base64ToFile(rawBase64, fileName, mimeType);
	let imageBase64 = rawBase64;
	try {
		imageFile = (await compressImageToTarget(imageFile)).file;
		imageBase64 = await readFileAsBase64(imageFile);
	} catch {}
	if (imageFile.size > OFFICE_IMAGE_SEND_LIMIT_BYTES) throw new Error(t("office.ai.imageCompressedTooLarge", { limit: OFFICE_IMAGE_SEND_LIMIT_BYTES / MB }));
	return createImageBlock(imageBase64, imageFile.type || mimeType, filePath, {
		icon: "image",
		filename: fileName,
		blockStatus: "completed",
		meta: {
			filePath,
			originalFilename: fileName,
			source: "office-active-file"
		}
	});
}
/**
* 为 Office 空态首发补齐当前文件上下文。
*
* 普通文件只需要可定位的 resource_link；图片额外追加视觉 block。
* 任何准备失败都抛给空态发送流程，由其保留草稿并展示明确错误。
*/
async function prepareOfficeAiFileContext(blocks, filePath, kind, deps) {
	const withFile = withOfficeFileAttachment(blocks, filePath);
	if (kind === "image") {
		const image = await createOfficeImageContextBlock(filePath, deps);
		return {
			blocks: [image, ...withFile],
			displayBlocks: [image, ...blocks]
		};
	}
	return {
		blocks: withFile,
		displayBlocks: withFile
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-quick-prompts.ts
init_i18n();
var WORD_EXTS = /* @__PURE__ */ new Set([
	"doc",
	"dot",
	"wps",
	"wpt",
	"docx",
	"dotx",
	"docm",
	"dotm"
]);
var EXCEL_EXTS = /* @__PURE__ */ new Set([
	"xls",
	"xlt",
	"xlsx",
	"xltx",
	"xlsm",
	"xltm",
	"csv"
]);
var PPT_EXTS = /* @__PURE__ */ new Set([
	"ppt",
	"pps",
	"pot",
	"pptx",
	"pptm",
	"ppsx",
	"ppsm",
	"potx",
	"potm"
]);
var MARKDOWN_EXTS = /* @__PURE__ */ new Set(["md", "markdown"]);
var HTML_EXTS = /* @__PURE__ */ new Set(["html", "htm"]);
var IMAGE_EXTS = /* @__PURE__ */ new Set([
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"svg",
	"ico",
	"avif"
]);
var AUDIO_EXTS = /* @__PURE__ */ new Set([
	"mp3",
	"wav",
	"aac",
	"flac",
	"ogg",
	"m4a",
	"opus",
	"wma"
]);
function resolveOfficeQuickPromptCategory(filePath) {
	const ext = extensionOf(filePath);
	if (!ext) return "none";
	if (WORD_EXTS.has(ext)) return "word";
	if (EXCEL_EXTS.has(ext)) return "excel";
	if (PPT_EXTS.has(ext)) return "ppt";
	if (ext === "pdf") return "pdf";
	if (MARKDOWN_EXTS.has(ext)) return "markdown";
	if (HTML_EXTS.has(ext)) return "html";
	if (ext === "txt") return "text";
	if (IMAGE_EXTS.has(ext)) return "image";
	if (AUDIO_EXTS.has(ext)) return "audio";
	return "none";
}
var QUICK_PROMPTS = {
	word: [
		{
			id: "summarize",
			labelKey: "office.prompt.word.summarize.label",
			promptKey: "office.prompt.word.summarize.text"
		},
		{
			id: "proofread",
			labelKey: "office.prompt.word.proofread.label",
			promptKey: "office.prompt.word.proofread.text"
		},
		{
			id: "polish",
			labelKey: "office.prompt.word.polish.label",
			promptKey: "office.prompt.word.polish.text"
		},
		{
			id: "outline",
			labelKey: "office.prompt.word.outline.label",
			promptKey: "office.prompt.word.outline.text"
		}
	],
	excel: [
		{
			id: "summarize",
			labelKey: "office.prompt.excel.summarize.label",
			promptKey: "office.prompt.excel.summarize.text"
		},
		{
			id: "analyze",
			labelKey: "office.prompt.excel.analyze.label",
			promptKey: "office.prompt.excel.analyze.text"
		},
		{
			id: "formula",
			labelKey: "office.prompt.excel.formula.label",
			promptKey: "office.prompt.excel.formula.text"
		},
		{
			id: "clean",
			labelKey: "office.prompt.excel.clean.label",
			promptKey: "office.prompt.excel.clean.text"
		}
	],
	ppt: [
		{
			id: "summarize",
			labelKey: "office.prompt.ppt.summarize.label",
			promptKey: "office.prompt.ppt.summarize.text"
		},
		{
			id: "speech",
			labelKey: "office.prompt.ppt.speech.label",
			promptKey: "office.prompt.ppt.speech.text"
		},
		{
			id: "polish",
			labelKey: "office.prompt.ppt.polish.label",
			promptKey: "office.prompt.ppt.polish.text"
		},
		{
			id: "structure",
			labelKey: "office.prompt.ppt.structure.label",
			promptKey: "office.prompt.ppt.structure.text"
		}
	],
	pdf: [
		{
			id: "summarize",
			labelKey: "office.prompt.pdf.summarize.label",
			promptKey: "office.prompt.pdf.summarize.text"
		},
		{
			id: "extract",
			labelKey: "office.prompt.pdf.extract.label",
			promptKey: "office.prompt.pdf.extract.text"
		},
		{
			id: "outline",
			labelKey: "office.prompt.pdf.outline.label",
			promptKey: "office.prompt.pdf.outline.text"
		},
		{
			id: "qa",
			labelKey: "office.prompt.pdf.qa.label",
			promptKey: "office.prompt.pdf.qa.text"
		}
	],
	markdown: [
		{
			id: "summarize",
			labelKey: "office.prompt.word.summarize.label",
			promptKey: "office.prompt.word.summarize.text"
		},
		{
			id: "proofread",
			labelKey: "office.prompt.word.proofread.label",
			promptKey: "office.prompt.word.proofread.text"
		},
		{
			id: "polish",
			labelKey: "office.prompt.markdown.polish.label",
			promptKey: "office.prompt.markdown.polish.text"
		}
	],
	html: [{
		id: "summarize",
		labelKey: "office.prompt.html.summarize.label",
		promptKey: "office.prompt.html.summarize.text"
	}, {
		id: "improve",
		labelKey: "office.prompt.html.improve.label",
		promptKey: "office.prompt.html.improve.text"
	}],
	text: [
		{
			id: "summarize",
			labelKey: "office.prompt.text.summarize.label",
			promptKey: "office.prompt.text.summarize.text"
		},
		{
			id: "proofread",
			labelKey: "office.prompt.text.proofread.label",
			promptKey: "office.prompt.text.proofread.text"
		},
		{
			id: "extract",
			labelKey: "office.prompt.text.extract.label",
			promptKey: "office.prompt.text.extract.text"
		},
		{
			id: "translate",
			labelKey: "office.prompt.text.translate.label",
			promptKey: "office.prompt.text.translate.text"
		}
	],
	image: [
		{
			id: "describe",
			labelKey: "office.prompt.image.describe.label",
			promptKey: "office.prompt.image.describe.text"
		},
		{
			id: "ocr",
			labelKey: "office.prompt.image.ocr.label",
			promptKey: "office.prompt.image.ocr.text"
		},
		{
			id: "analyze",
			labelKey: "office.prompt.image.analyze.label",
			promptKey: "office.prompt.image.analyze.text"
		},
		{
			id: "qa",
			labelKey: "office.prompt.image.qa.label",
			promptKey: "office.prompt.image.qa.text"
		}
	],
	audio: [
		{
			id: "trim",
			labelKey: "office.prompt.audio.trim.label",
			promptKey: "office.prompt.audio.trim.text"
		},
		{
			id: "compress",
			labelKey: "office.prompt.audio.compress.label",
			promptKey: "office.prompt.audio.compress.text"
		},
		{
			id: "speed",
			labelKey: "office.prompt.audio.speed.label",
			promptKey: "office.prompt.audio.speed.text"
		}
	],
	none: []
};
function resolveOfficeQuickPrompts(filePath) {
	return QUICK_PROMPTS[resolveOfficeQuickPromptCategory(filePath)].map((definition) => ({
		id: definition.id,
		label: t(definition.labelKey),
		prompt: t(definition.promptKey)
	}));
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-chat-conversations.tsx
init_i18n();
var OFFICE_EDIT_COMMAND_PROVIDER = { subscribe: subscribeEditCommand };
/**
* 独立窗口面板的能力裁剪：
* - 没有第三栏承载详情面板
* - 隐藏依赖第三栏的“查看所有产物 / 查看所有变更”
* - 工作模式保留，与主窗口输入框使用同一套 provider
* 输入框其余能力全部保留。
*/
var OFFICE_EMBED_BASE = {
	detailPanel: false,
	artifactViewAllActions: false,
	artifactMaxDisplayItems: null,
	designOptionsChips: false,
	featureModule: "office",
	welcomeMode: "working"
};
var OFFICE_EMPTY_INPUT_PROVIDERS = [
	...DEFAULT_CONVERSATION_EMBED_EMPTY_PROVIDERS,
	"mode",
	"enhance"
];
function directoryOf(filePath) {
	const normalized = filePath.replace(/\\/g, "/");
	const index = normalized.lastIndexOf("/");
	return index > 0 ? normalized.slice(0, index) : normalized;
}
function OfficeChatConversation({ tab, binding, active, hostActions, onCreated, onStartIntentClaimed, spaceLibraryAttachmentEnabled }) {
	const containerRef = (0, import_react.useRef)(null);
	const { fileIO } = useOfficeServices();
	const [locale, setLocale] = (0, import_react.useState)(() => getLocale());
	(0, import_react.useEffect)(() => onLocaleChange(setLocale), []);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		let wb;
		try {
			wb = getWb();
		} catch {
			return;
		}
		const subscribe = (subscriptionActive) => {
			Promise.resolve(wb.invoke(WB_CONVERSATION_EVENT_SUBSCRIPTION_CHANNEL, {
				event: "requestUpdate",
				conversationId: binding.conversationId,
				active: subscriptionActive
			})).catch(() => void 0);
		};
		subscribe(true);
		return () => subscribe(false);
	}, [active, binding.conversationId]);
	const embed = (0, import_react.useMemo)(() => ({
		...OFFICE_EMBED_BASE,
		registerAsCurrent: active,
		editCommandProvider: OFFICE_EDIT_COMMAND_PROVIDER,
		hostActions,
		spaceLibraryAttachmentEnabled
	}), [
		active,
		hostActions,
		spaceLibraryAttachmentEnabled
	]);
	const quickPrompts = (0, import_react.useMemo)(() => resolveOfficeQuickPrompts(tab.filePath), [locale, tab.filePath]);
	const transformBlocks = (0, import_react.useCallback)(async (blocks, context) => {
		if (context.mode === "quick") return blocks;
		if (tab.kind === "image" && !fileIO) throw new Error(t("office.error.imageReadFailed"));
		return prepareOfficeAiFileContext(blocks, tab.filePath, tab.kind, {
			getSize: (path) => fileIO?.getSize(path) ?? Promise.reject(new Error(t("office.error.imageReadFailed"))),
			readBase64: (path) => fileIO?.readBase64(path) ?? Promise.reject(new Error(t("office.error.imageReadFailed")))
		});
	}, [
		fileIO,
		tab.filePath,
		tab.kind
	]);
	const handleCreated = (0, import_react.useCallback)((result) => onCreated(tab, result), [onCreated, tab]);
	const handleStartIntentClaimed = (0, import_react.useCallback)(() => onStartIntentClaimed(tab.id), [onStartIntentClaimed, tab.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "office-shell__chat-conversation",
		"data-conversation-id": binding.conversationId,
		"data-active": active ? "true" : "false",
		hidden: !active,
		children: binding.created ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationEngineView, {
			conversationId: binding.conversationId,
			embed,
			startIntentToken: binding.startIntentToken,
			onStartIntentClaimed: handleStartIntentClaimed
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationEmbedEmptyView, {
			conversationId: binding.conversationId,
			enabledProviders: OFFICE_EMPTY_INPUT_PROVIDERS,
			welcomeMode: "working",
			registerAsCurrent: active,
			editCommandProvider: OFFICE_EDIT_COMMAND_PROVIDER,
			embed,
			includeTeamExperts: true,
			featureModule: "office",
			cwd: directoryOf(tab.filePath),
			heading: t("office.chat.emptyTitle"),
			hint: t("office.chat.emptyHint"),
			placeholder: t("office.chat.placeholder"),
			quickPrompts,
			transformBlocks,
			onCreated: handleCreated
		})
	});
}
function OfficeChatConversations({ tabs, activeTabId, bindings, hostActions, onCreated, onStartIntentClaimed, spaceLibraryAttachmentEnabled }) {
	const activeTab = tabs.find((tab) => tab.id === activeTabId && bindings[tab.id] && supportsOfficeAiChat(tab.kind));
	if (!activeTab) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeChatConversation, {
		tab: activeTab,
		binding: bindings[activeTab.id],
		active: true,
		hostActions,
		onCreated,
		onStartIntentClaimed,
		spaceLibraryAttachmentEnabled
	});
}
//#endregion
export { OfficeChatConversations };
