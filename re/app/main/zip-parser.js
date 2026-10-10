const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_adm_zip$1 = require("./adm-zip.js");
require("./contract5.js");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_crypto = require("node:crypto");
node_crypto = require_rolldown_runtime.__toESM(node_crypto);
//#region ../../packages/workbuddy-server/src/wechat-chat-history/zip-parser.ts
/**
* `聊天记录.zip` → metadata + truncated transcript parser.
*
* Parses the WeChat share ZIP layout:
*
* ```
* 聊天记录_<timestamp>.zip
* ├── *.txt                                     # UTF-8 plain text
* ├── source.json                               # WeCom only
* └── <媒体目录>/                                # name follows the client UI language
*     ├── 微信图片_*.jpg
*     ├── 微信视频_*.mp4
*     ├── 聊天记录_*.zip                          # nested share
*     └── ...
* ```
*
* Behavior:
* - Picks the transcript by structure, never by file name: a root-level `.txt`
*   wins, so Simplified/Traditional Chinese and English exports all work.
*   Entries inside any subdirectory count as media.
* - Reads the txt as UTF-8 (strips a leading BOM if present).
* - Counts messages by matching Chinese `YYYY年M月D日 H:M(:S)?` or English
*   `YYYY-M-D H:M(:S)?` date-stamp lines — robust to nested `[聊天记录]`
*   blocks because each merged-forward message still carries its own date-stamp
*   line. If no date-stamp exists, falls back to per-message-forward bullet
*   lines like `·[图片] x.jpg` or `·text`.
* - First-sender / first-message-at: walks the first 100 non-empty lines and
*   reports the first sender ⟶ date pair. Bracket-only lines (`[聊天记录]`,
*   `[聊天記錄]`, `[Chat History]`, `[图片]`, …) are skipped.
* - Truncates the inlined transcript at `maxChatHistoryChars` characters,
*   preferring a paragraph break (`\n\n`) or a date-stamp line start within
*   the 500 characters before the cap. Appends
*   `\n\n[truncated; full transcript at: <zipPath>]`.
*
* The parser extracts safe ZIP entries to a WorkBuddy-managed temp directory so
* media files and the full transcript remain available to the model when needed.
* The parser never throws — invalid input maps to `{ valid: false, reason }`.
*/
var import_adm_zip = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_adm_zip$1.require_adm_zip());
var DATE_STAMP_PATTERN = [String.raw`(?:\d{4}年\d{1,2}月\d{1,2}日|\d{4}-\d{1,2}-\d{1,2})`, String.raw`\s+\d{1,2}:\d{1,2}(?::\d{1,2})?`].join("");
/** Per-line regex matching a `YYYY年M月D日 H:M(:S)?` or `YYYY-M-D H:M(:S)?` stamp. */
var DATE_LINE_RE = new RegExp(String.raw`^\s*${DATE_STAMP_PATTERN}\s*$`);
/** Multiline version used to count message occurrences across the whole txt. */
var DATE_LINE_GLOBAL_RE = new RegExp(String.raw`^\s*${DATE_STAMP_PATTERN}\s*$`, "gm");
/** Per-message forward item line like `·[图片] x.jpg`, `· [文件] x.zip`, or `•text`. */
var BULLET_MESSAGE_LINE_RE = /^\s*[·•]\s*\S.*$/gm;
/**
* 整行只有一个方括号标记，例如嵌套转发的 `[聊天记录]` / `[聊天記錄]` / `[Chat History]`，
* 或消息体占位 `[图片]` / `[Image]`。标记文案跟界面语言走，只比字面量会让非简中导出把
* 标记当成第一个发送者名字，所以按「整行被方括号包住」判定。
*/
var BRACKET_ONLY_LINE_RE = /^\[[^\]]*\]$/;
var TRUNCATION_SUFFIX_PREFIX = "\n\n[truncated; full transcript at: ";
var TRUNCATION_SUFFIX_SUFFIX = "]";
var DEFAULT_MAX_CHAT_HISTORY_CHARS = 6e4;
var MAX_HEADER_SCAN_LINES = 100;
var TRUNCATION_LOOKBACK_CHARS = 500;
/**
* 资源类型只认行里的 `<x>_id=` 字段名：字段名是协议级的，不随客户端界面语言变，而
* `[文档]` / `[会议]` 这类标签只有简中写法，繁中和英文导出匹配不上。
*/
var ONLINE_RESOURCE_RULES_BY_ID_KEY = {
	doc_id: {
		type: "doc",
		skill: "wecomcli-doc"
	},
	file_id: {
		type: "disk",
		skill: "wecomcli-disk"
	},
	schedule_id: {
		type: "calendar",
		skill: "wecomcli-calendar"
	},
	todo_id: {
		type: "todo",
		skill: "wecomcli-todo"
	},
	meeting_id: {
		type: "meeting",
		skill: "wecomcli-meeting"
	}
};
var MEETING_MINUTES_RULE = {
	type: "meeting_minutes",
	skill: "wecomcli-meeting"
};
/** 一行里的资源 id。值在空白 / `,` / `&` 处截断，否则会把 URL 后续参数一起吞进来。 */
var ONLINE_RESOURCE_ID_RE = new RegExp(String.raw`\b(${Object.keys(ONLINE_RESOURCE_RULES_BY_ID_KEY).join("|")})=([^\s,&]+)`);
var MEET_CODE_RE = /\bmeet_code=([^\s,&]+)/;
/**
* 六种资源里只有五个不同的 id 字段名：会议和智能纪要共用 `meeting_id`，唯一的协议级区分
* 是纪要的链接带 `meet_code`。缺 `meet_code` 时只剩标签可用，所以仅这一处歧义仍看简中标签。
*/
var MEETING_MINUTES_LABEL = "智能纪要";
function resolveOnlineResourceRule(idKey, line, meetCode) {
	const rule = ONLINE_RESOURCE_RULES_BY_ID_KEY[idKey];
	if (idKey !== "meeting_id") return rule;
	return meetCode || line.includes(MEETING_MINUTES_LABEL) ? MEETING_MINUTES_RULE : rule;
}
var MIME_BY_EXT = {
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	webp: "image/webp",
	heic: "image/heic",
	mp4: "video/mp4",
	mov: "video/quicktime",
	m4a: "audio/mp4",
	mp3: "audio/mpeg",
	pdf: "application/pdf",
	zip: "application/zip",
	doc: "application/msword",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	xls: "application/vnd.ms-excel",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	ppt: "application/vnd.ms-powerpoint",
	pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	txt: "text/plain",
	csv: "text/csv"
};
function guessMime(name) {
	const dot = name.lastIndexOf(".");
	if (dot < 0 || dot === name.length - 1) return;
	return MIME_BY_EXT[name.slice(dot + 1).toLowerCase()];
}
function basename(zipEntryName) {
	const idx = zipEntryName.lastIndexOf("/");
	return idx < 0 ? zipEntryName : zipEntryName.slice(idx + 1);
}
function isTxtEntryName(entryName) {
	return basename(entryName).toLowerCase().endsWith(".txt");
}
/**
* 转发协议给正文的文件名，按客户端界面语言取其一。命中即正文，不必再看位置——这是三种
* 语种里最强的信号，也是「一批附件里正文排在后面」时唯一可靠的判据（#113033）。
*/
var TRANSCRIPT_FILE_NAMES = /* @__PURE__ */ new Set([
	"聊天记录.txt",
	"聊天記錄.txt",
	"Chat History.txt"
]);
function isTranscriptFileName(entryName) {
	return TRANSCRIPT_FILE_NAMES.has(basename(entryName).toLowerCase());
}
function isRootEntry(entryName) {
	return !normalizeEntryName(entryName).includes("/");
}
/**
* 媒体条目 = 落在任意子目录里的条目。转发协议的根目录只放正文 `.txt` 和 `source.json`，
* 媒体一律在一个单独目录下，而那个目录名跟着客户端界面语言变（简中两种写法、繁中、英文
* 各不相同）。枚举目录名必然漏掉某个语种，漏掉时该语种导出的图片、视频、附件会一个都收
* 集不到，所以按结构判定。
*/
function isMediaEntry(entryName) {
	return !isRootEntry(entryName);
}
/**
* 找出聊天记录正文，优先级：协议文件名 → 根目录 `.txt` → 第一个 `.txt`。
*
* 媒体目录里的 `.txt` 是用户转发的附件文档——逐条转发一批文件时附件很可能排在正文之前，
* 取「第一个 .txt」会把某个附件当成正文，消息数变 0、注入模型的也是错内容（#113033）。
* 后两层是兜底：文件名换了写法（新语种、改版）时降级成「取根目录那份」，而不是把整个
* 包判成不是聊天记录。
*/
function findTranscriptEntry(entries) {
	const txtEntries = entries.filter((entry) => !entry.isDirectory && isTxtEntryName(entry.entryName));
	return txtEntries.find((entry) => isTranscriptFileName(entry.entryName)) ?? txtEntries.find((entry) => isRootEntry(entry.entryName)) ?? txtEntries[0];
}
function countMessages(text) {
	const dateLineCount = text.match(DATE_LINE_GLOBAL_RE)?.length ?? 0;
	if (dateLineCount > 0) return dateLineCount;
	return text.match(BULLET_MESSAGE_LINE_RE)?.length ?? 0;
}
function extractWecomOnlineResources(text) {
	const resources = [];
	const seen = /* @__PURE__ */ new Set();
	for (const rawLine of text.split(/\r?\n/)) {
		const line = rawLine.trim();
		const idMatch = ONLINE_RESOURCE_ID_RE.exec(line);
		if (!idMatch) continue;
		const [, idKey, id] = idMatch;
		const lineMeetCode = MEET_CODE_RE.exec(line)?.[1];
		const rule = resolveOnlineResourceRule(idKey, line, lineMeetCode);
		const key = `${rule.type}:${id}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const meetCode = rule.type === "meeting_minutes" ? lineMeetCode : void 0;
		resources.push({
			type: rule.type,
			id,
			label: line.slice(0, 500),
			skill: rule.skill,
			...meetCode ? { meetCode } : {}
		});
	}
	return resources;
}
/**
* Extract the first sender / first message timestamp from the txt by walking
* the first ~100 non-empty lines and finding the first `<name>` ⟶ `<date>` pair.
*
* `[聊天记录]` block markers (which may appear before the first sender on
* nested shares) are skipped.
*/
function readFirstMessageHeader(text) {
	const lines = text.split(/\r?\n/);
	const upper = Math.min(lines.length, MAX_HEADER_SCAN_LINES);
	for (let i = 0; i < upper; i++) {
		const candidate = lines[i].trim();
		if (!candidate) continue;
		if (BRACKET_ONLY_LINE_RE.test(candidate)) continue;
		if (DATE_LINE_RE.test(candidate)) continue;
		const lookaheadUpper = Math.min(lines.length, i + 10);
		for (let j = i + 1; j < lookaheadUpper; j++) {
			const next = lines[j].trim();
			if (!next) continue;
			if (DATE_LINE_RE.test(next)) return {
				firstSenderName: candidate,
				firstMessageAt: next
			};
			break;
		}
	}
	return {};
}
/**
* Choose a safe truncation point within `[ideal - 500, ideal]` characters.
*
* Preference order:
*  1. Position just after a paragraph break (`\n\n`)
*  2. Position just before a date-stamp line start
*  3. The cap itself (hard cut)
*/
function findTruncationCut(text, ideal) {
	const lo = Math.max(0, ideal - TRUNCATION_LOOKBACK_CHARS);
	const window = text.slice(lo, ideal);
	const paraIdx = window.lastIndexOf("\n\n");
	if (paraIdx >= 0) return lo + paraIdx + 2;
	const lineStarts = [];
	{
		lineStarts.push(0);
		let pos = 0;
		while (pos < window.length) {
			const nl = window.indexOf("\n", pos);
			if (nl < 0) break;
			lineStarts.push(nl + 1);
			pos = nl + 1;
		}
	}
	for (let i = lineStarts.length - 1; i >= 0; i--) {
		const lineStart = lineStarts[i];
		const nextNl = window.indexOf("\n", lineStart);
		const line = window.slice(lineStart, nextNl < 0 ? void 0 : nextNl);
		if (DATE_LINE_RE.test(line.trim())) return lo + lineStart;
	}
	return ideal;
}
function truncateChatHistory(raw, maxChars, zipPath) {
	if (raw.length <= maxChars) return {
		text: raw,
		truncated: false
	};
	const cut = findTruncationCut(raw, maxChars);
	return {
		text: `${raw.slice(0, cut).replace(/\s+$/u, "")}${`${TRUNCATION_SUFFIX_PREFIX}${zipPath}${TRUNCATION_SUFFIX_SUFFIX}`}`,
		truncated: true
	};
}
function getFileSize(filePath) {
	try {
		return node_fs.statSync(filePath).size;
	} catch {
		return 0;
	}
}
/**
* 解包目录按来源命名（`wecom-chat-history-…` / `wechat-chat-history-…`）。
*
* 两个来源共用同一个临时根目录，目录名是用户在文件管理器里唯一能分辨来源的地方——
* 企微转发的内容落进 `wechat-` 目录会被当成微信的。
*/
function createExtractionDir(filePath, source, extractionRootDir) {
	const rand = node_crypto.randomBytes(4).toString("hex");
	const rootDir = extractionRootDir || node_path.dirname(filePath);
	return node_path.join(rootDir, `${source}-chat-history-${Date.now()}-${rand}`);
}
/**
* Resolve a ZIP entry into the extraction root without allowing path escape.
* ZIP names may be attacker-controlled, so reject absolute paths, traversal
* markers, Windows separators, and null bytes before resolving. The final
* relative-path check is defense-in-depth after `path.resolve()`.
*/
function resolveZipEntryTarget(rootDir, entryName) {
	const parts = entryName.split("/").filter(Boolean);
	if (parts.length === 0 || node_path.isAbsolute(entryName)) return;
	if (parts.some((part) => part === "." || part === ".." || part.includes("\\") || part.includes("\0"))) return;
	const target = node_path.resolve(rootDir, ...parts);
	const relative = node_path.relative(rootDir, target);
	if (!relative || relative.startsWith("..") || node_path.isAbsolute(relative)) return;
	return target;
}
function extractZipEntries(entries, rootDir) {
	node_fs.mkdirSync(rootDir, { recursive: true });
	for (const entry of entries) {
		const target = resolveZipEntryTarget(rootDir, entry.entryName);
		if (!target) throw new Error(`Unsafe ZIP entry path: ${entry.entryName}`);
		if (entry.isDirectory) {
			node_fs.mkdirSync(target, { recursive: true });
			continue;
		}
		node_fs.mkdirSync(node_path.dirname(target), { recursive: true });
		node_fs.writeFileSync(target, entry.getData(), { mode: 384 });
	}
}
function getExtractedEntryPath(rootDir, entryName) {
	return resolveZipEntryTarget(rootDir, entryName);
}
function normalizeEntryName(entryName) {
	return entryName.replace(/\\/g, "/").replace(/^\.\//, "");
}
function readChatHistorySource(entries) {
	const sourceEntry = entries.find((entry) => !entry.isDirectory && normalizeEntryName(entry.entryName) === "source.json");
	if (!sourceEntry) return "wechat";
	try {
		return JSON.parse(sourceEntry.getData().toString("utf-8").replace(/^\uFEFF/, "")).source === "wecom" ? "wecom" : "wechat";
	} catch {
		return "wechat";
	}
}
function buildInvalid(filePath, reason, source = "wechat") {
	return {
		valid: false,
		fileName: basename(filePath),
		fileSize: getFileSize(filePath),
		source,
		metadata: {
			messageCount: 0,
			mediaFiles: []
		},
		extractionStatus: "failed",
		reason
	};
}
/**
* Parse the WeChat share ZIP at `filePath` and return metadata + truncated txt.
* Never throws — ZIP-level errors map to `valid: false`.
*/
function parseChatRecordZipInternal(input, extractEntriesToDisk) {
	const { filePath, extractionRootDir } = input;
	const maxChars = input.maxChatHistoryChars ?? 6e4;
	let zip;
	try {
		zip = new import_adm_zip.default(filePath);
	} catch {
		return buildInvalid(filePath, "corrupted", input.source);
	}
	let entries;
	try {
		entries = zip.getEntries();
	} catch {
		return buildInvalid(filePath, "corrupted", input.source);
	}
	const source = input.source ?? readChatHistorySource(entries);
	const txtEntry = findTranscriptEntry(entries);
	if (!txtEntry) return buildInvalid(filePath, "not-wechat-zip", source);
	let txtBuffer;
	try {
		txtBuffer = txtEntry.getData();
	} catch {
		return buildInvalid(filePath, "corrupted", source);
	}
	let txt = txtBuffer.toString("utf-8");
	if (txt.charCodeAt(0) === 65279) txt = txt.slice(1);
	const extractedDirPath = extractEntriesToDisk ? createExtractionDir(filePath, source, extractionRootDir) : void 0;
	if (extractedDirPath) try {
		extractZipEntries(entries, extractedDirPath);
	} catch {
		try {
			node_fs.rmSync(extractedDirPath, {
				force: true,
				recursive: true
			});
		} catch {}
		return buildInvalid(filePath, "corrupted", source);
	}
	const mediaFiles = entries.filter((e) => !e.isDirectory && isMediaEntry(e.entryName)).flatMap((e) => {
		const name = basename(e.entryName);
		const mediaPath = extractedDirPath ? getExtractedEntryPath(extractedDirPath, e.entryName) : void 0;
		return [{
			name,
			size: e.header.size,
			mime: guessMime(name),
			...mediaPath ? { path: mediaPath } : {}
		}];
	});
	const messageCount = countMessages(txt);
	const { firstSenderName, firstMessageAt } = readFirstMessageHeader(txt);
	const onlineResources = extractWecomOnlineResources(txt);
	const metadata = {
		messageCount,
		firstSenderName,
		firstMessageAt,
		mediaFiles,
		...onlineResources.length > 0 ? { onlineResources } : {}
	};
	const transcriptFileName = basename(txtEntry.entryName) || "chat-history.txt";
	const transcriptPath = extractedDirPath ? getExtractedEntryPath(extractedDirPath, txtEntry.entryName) ?? node_path.join(extractedDirPath, transcriptFileName) : filePath;
	const { text: chatHistoryText, truncated } = truncateChatHistory(txt, maxChars, transcriptPath);
	return {
		valid: true,
		fileName: basename(filePath),
		fileSize: getFileSize(filePath),
		source,
		metadata,
		extractionStatus: extractedDirPath ? "ready" : "pending",
		extractedDirPath: extractedDirPath ?? "",
		chatHistoryText,
		truncated
	};
}
function parseChatRecordZipMetadataOnly(input) {
	return parseChatRecordZipInternal(input, false);
}
function parseChatRecordZip(input) {
	return parseChatRecordZipInternal(input, true);
}
var extractChatRecordZip = parseChatRecordZip;
//#endregion
Object.defineProperty(exports, "DEFAULT_MAX_CHAT_HISTORY_CHARS", {
	enumerable: true,
	get: function() {
		return DEFAULT_MAX_CHAT_HISTORY_CHARS;
	}
});
Object.defineProperty(exports, "extractChatRecordZip", {
	enumerable: true,
	get: function() {
		return extractChatRecordZip;
	}
});
Object.defineProperty(exports, "extractWecomOnlineResources", {
	enumerable: true,
	get: function() {
		return extractWecomOnlineResources;
	}
});
Object.defineProperty(exports, "parseChatRecordZipMetadataOnly", {
	enumerable: true,
	get: function() {
		return parseChatRecordZipMetadataOnly;
	}
});
