import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $r as WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, AQ as isTencentDocsWebUrl, B3 as init_adapter_context, DQ as init_tencent_docs_url, Gr as applyLocalFileOpenCheckResult, Hn as init_use_conversation_document_selection, I1 as t, JT as init_user_attachment_preview, Kr as init_apply_local_file_open_check_result, Lu as init_markdown_link_router, Ps as conversationExtensions, QT as resolveAttachmentTarget, Qd as init_selection_quote, Ru as routeConversationMarkdownLink, Un as useTencentDocsConversationDocumentSelectionBridge, Urt as filePathToFileUrl, V3 as useAdapter, Wrt as init_file_path, YT as isSafeUserAttachmentUrl, c3 as getWb, d0 as useModuleHost, ef as selectionQuotePhraseRenderer, ei as WORKBUDDY_JUMP_TO_CONVERSATION_REASONS, fr as init_conversation_phrase_renderer, j1 as init_i18n, jt as init_conversation, kQ as isTencentDocsUrl, ks as resetConversationControllerCache, ku as ConversationViewActionsProvider, l0 as init_module_host_context, l3 as init_wb_singleton, ni as init_jump_to_conversation_payload, pr as tencentDocsConversationPhraseRenderer, ti as WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as navigateMainWindow } from "./main-window-navigator-Bs0zgdJ1.js";
import { OfficeAgentHost } from "./office-agent-host-CuCdMk4S.js";
import { c as normalizeOfficeFilePath, i as useOfficeServices, n as replayPendingOfficeSelection, r as setOfficeSelectionBridgeReady } from "./bootstrap-D7qmlJvj.js";
//#region ../../packages/workbuddy-app/src/office-shell/cloud-upload/office-tencent-docs-free-login-open.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
init_src();
init_adapter_context();
init_i18n();
init_markdown_link_router();
init_jump_to_conversation_payload();
init_conversation();
init_wb_singleton();
var OFFICE_TDOC_DEBUG_LOG = "[OfficeTdocDebug]";
function summarizeUrl(url) {
	try {
		const parsed = new URL(url);
		return {
			protocol: parsed.protocol.replace(/:$/, ""),
			host: parsed.host,
			pathname: parsed.pathname,
			hasQuery: parsed.search.length > 0,
			hasHash: parsed.hash.length > 0
		};
	} catch {
		return {
			parseError: true,
			length: url.length
		};
	}
}
function describeError(error) {
	return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}
/**
* 在 Office Tab 内以免登态打开腾讯文档（上传成功 / 历史 chip 点击共用）。
*
* Office 与主窗共享 Primary session；`prepareEnterpriseDocPreview` 写入账号级
* `tdoc-preview` partition 后，Office webview 可直接复用该免登态。
*
* 免登的关键是写 partition cookie，不是 URL 形态；换票只是为了在只有 `tdoc://fileId`
* 时补出一个可访问的 http URL。
*
* @param docUrl 可访问的 http(s) 腾讯文档 URL
* @param open   实际打开动作（上传对话框用 wb.windows.open，对话 chip 用 openUrlInTab）
*/
async function openOfficeTencentDocWithFreeLogin(docUrl, open, options = {}) {
	const wb = getWb();
	let openUrl = docUrl;
	console.info(`${OFFICE_TDOC_DEBUG_LOG} open requested`, {
		url: summarizeUrl(docUrl),
		hasFileId: Boolean(options.fileId)
	});
	let enterprisePreviewReady = false;
	try {
		const prep = await wb.tencentDocs.prepareEnterpriseDocPreview();
		enterprisePreviewReady = prep.ok;
		console.info(`${OFFICE_TDOC_DEBUG_LOG} prepareEnterpriseDocPreview result`, {
			ok: prep.ok,
			hasLoginStatus: Boolean(prep.ok && prep.loginStatus),
			reason: prep.ok ? void 0 : prep.reason
		});
	} catch (error) {
		console.warn(`${OFFICE_TDOC_DEBUG_LOG} prepareEnterpriseDocPreview failed`, { error: describeError(error) });
	}
	if (!enterprisePreviewReady) try {
		const previewUrl = await wb.tencentDocs.getPreviewUrl({
			file: {
				file_id: options.fileId,
				url: docUrl
			},
			type: "openOriginalFile"
		});
		if (previewUrl) openUrl = previewUrl;
		console.info(`${OFFICE_TDOC_DEBUG_LOG} consumer preview url resolved`, {
			input: summarizeUrl(docUrl),
			output: summarizeUrl(openUrl),
			hasFileId: Boolean(options.fileId),
			changed: openUrl !== docUrl
		});
	} catch (error) {
		console.warn(`${OFFICE_TDOC_DEBUG_LOG} consumer preview url failed`, {
			input: summarizeUrl(docUrl),
			hasFileId: Boolean(options.fileId),
			error: describeError(error)
		});
	}
	console.info(`${OFFICE_TDOC_DEBUG_LOG} opening url in office tab`, { url: summarizeUrl(openUrl) });
	open(openUrl);
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-conversation-account-lifecycle.ts
/**
* 生成 Office Conversation Controller 的账号作用域。
*
* loading 是首次恢复的中间态，不参与切换判定；其他非登录态需要保留各自身份，
* 以便登出、过期和重新登录都能清理旧账号 Controller。
*/
function resolveOfficeConversationAccountIdentity(status, profile) {
	if (status === "loading") return;
	if (status !== "authenticated" || !profile) return status;
	return `${profile.uid ?? ""}|${profile.enterpriseId ?? ""}`;
}
/** 首次拿到账号不重置；已知身份发生变化时才清理旧 Controller。 */
function shouldResetOfficeConversationControllers(previousIdentity, nextIdentity) {
	return previousIdentity !== void 0 && previousIdentity !== nextIdentity;
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-conversation-account-gate.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* 让账号切换与 Conversation Controller 重建形成有序事务。
*
* 身份变化的首帧先返回空树，使旧 View 在 commit 阶段卸载；随后 layout effect
* 清理旧 Controller，下一次同步 render 才允许新 View 挂载。不能把 reset 放在
* 普通 effect 中，否则新 View 可能先复用旧 Controller，再被迟到的 reset 销毁。
*/
function OfficeConversationAccountGate({ status, profile, children }) {
	const identity = resolveOfficeConversationAccountIdentity(status, profile);
	const [appliedIdentity, setAppliedIdentity] = (0, import_react.useState)(identity);
	(0, import_react.useLayoutEffect)(() => {
		if (!identity || appliedIdentity === identity) return;
		if (shouldResetOfficeConversationControllers(appliedIdentity, identity)) resetConversationControllerCache();
		setAppliedIdentity(identity);
	}, [appliedIdentity, identity]);
	if (status !== "authenticated" || !profile || !identity || appliedIdentity !== identity) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-conversation-view-actions.ts
/**
* Office 独立窗口的对话宿主动作。
*
* 主窗把文件开在详情面板里，Office 窗没有第三栏，改为在本窗新开 Tab。
* 新 Tab 走它自己的会话（与「一个 Tab 一个会话」一致），不复用当前对话。
*/
init_tencent_docs_url();
init_user_attachment_preview();
/** 腾讯文档 chip 点击打开全链路日志统一前缀，便于按此过滤排查。 */
var TDOC_OPEN_LOG = "[OfficeTdocOpen]";
function decodeUriComponentSafe(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function isHttpUrl(value) {
	return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}
function getMetaString(meta, key) {
	const value = meta[key];
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function getBlockUri(block) {
	if (!isRecord(block)) return;
	const { uri } = block;
	return typeof uri === "string" && uri.trim() ? uri.trim() : void 0;
}
function getBlockMeta(block) {
	if (!isRecord(block) || !isRecord(block._meta)) return {};
	const topLevel = block._meta;
	const codebuddyMeta = isRecord(topLevel["codebuddy.ai"]) ? topLevel["codebuddy.ai"] : {};
	return {
		...isRecord(codebuddyMeta.meta) ? codebuddyMeta.meta : {},
		...codebuddyMeta,
		...topLevel
	};
}
function resolvePrivateTencentDocsFileId(href, fallback) {
	try {
		return new URL(href).searchParams.get("_fid") || fallback;
	} catch {
		return fallback;
	}
}
/** `_fid` 仅用于前端识别同一文档，不应透传给腾讯文档换票接口。 */
function removePrivateTencentDocsFileId(href) {
	try {
		const parsed = new URL(href);
		parsed.searchParams.delete("_fid");
		return parsed.toString().replace(/\?$/, "");
	} catch {
		return href;
	}
}
/**
* 给免登短链补 `_fid`，供 Office browser tab 侧同文档识别与去重。
* 与主窗 `decorateTencentDocsLoginUrl` 同义；这里内联一份，避免跨包 import
* 拖入 detail-panel/facade 依赖（Office 只需要纯 URL 变换）。
*/
function decorateTencentDocsLoginUrl(url, fileId) {
	const trimmedFileId = fileId?.trim();
	if (!url || !trimmedFileId) return url;
	try {
		const parsed = new URL(url.startsWith("//") ? `https:${url}` : url);
		if (!parsed.searchParams.has("_fid")) parsed.searchParams.set("_fid", trimmedFileId);
		return parsed.toString();
	} catch {
		return url;
	}
}
function isTencentDocsConnectorMeta(meta) {
	const mentionType = getMetaString(meta, "mentionType") ?? getMetaString(meta, "type");
	const providerId = getMetaString(meta, "providerId");
	const connectorId = getMetaString(meta, "connectorId");
	return mentionType === "tencent-doc" || providerId === "tencent-docs-personal" || providerId === "tencent-docs-enterprise" || connectorId === "tencent-docs" || connectorId === "tencent-docs-oa";
}
function isTencentLexiangMeta(meta) {
	return (getMetaString(meta, "mentionType") ?? getMetaString(meta, "type")) === "tencent-lexiang";
}
/**
* 从腾讯文档 ContentBlock 提取 `{ fileId, url }`。
*
* 对话里的腾讯文档 chip 实际形态是 `uri = tdoc://<fileId>`，原始 http 链接放在
* `_meta.fileUrl`（云端回显可能被裁剪只剩 uri）。字段优先级与主窗
* `extractTencentDocFromContentBlock` 对齐，但只做纯字段解析，不依赖账号/分类服务。
*/
function extractOfficeTencentDocTarget(block, meta) {
	const uri = getBlockUri(block);
	const url = getMetaString(meta, "fileUrl") ?? getMetaString(meta, "rawUrl") ?? getMetaString(meta, "url") ?? (isHttpUrl(uri) ? uri : void 0);
	return {
		fileId: getMetaString(meta, "fileId") ?? (uri?.startsWith("tdoc://") ? uri.slice(7).trim() || void 0 : void 0) ?? (url ? resolvePrivateTencentDocsFileId(url, void 0) : void 0),
		url
	};
}
/** 从 file:// URI 还原本地绝对路径；非 file 协议返回 null。 */
function filePathFromFileUri(uri) {
	if (!/^file:\/\//i.test(uri)) return null;
	const decoded = decodeUriComponentSafe(uri.slice(7));
	const normalized = /^\/[a-zA-Z]:/.test(decoded) ? decoded.slice(1) : decoded;
	return normalizeOfficeFilePath(normalized) || null;
}
/**
* 从产物 URI 还原可在本窗打开的绝对路径。
*
* 产物 URI 有三种形态：`file://` 绝对路径、agent 侧的 `agent://files/相对路径`，
* 以及已经是裸路径的历史数据。只认绝对路径——相对路径在独立窗没有工作区可以拼。
*/
function officeFilePathFromArtifactUri(uri) {
	if (!uri) return null;
	const fromFileUri = filePathFromFileUri(uri);
	if (fromFileUri) return fromFileUri;
	const raw = uri.startsWith("agent://files/") ? decodeUriComponentSafe(uri.slice(14)) : uri;
	if (raw.includes("://")) return null;
	const normalized = normalizeOfficeFilePath(raw);
	return normalized.startsWith("/") || /^[a-zA-Z]:\//.test(normalized) ? normalized : null;
}
/** 从对话里的 ContentBlock 取出可在 Office 窗打开的本地文件路径。 */
function resolveOfficeFilePathFromBlock(block, cwd) {
	if (!block || typeof block !== "object") return null;
	const candidate = block;
	if (candidate.type !== "resource_link" && candidate.type !== "image") return null;
	const meta = candidate._meta ?? {};
	if (meta.mentionType === "folder" || meta.type === "folder") return null;
	for (const key of [
		"filePath",
		"path",
		"relativePath"
	]) {
		const value = meta[key];
		if (typeof value === "string" && value.trim()) {
			const normalized = normalizeOfficeFilePath(value);
			if (normalized.startsWith("/") || /^[a-zA-Z]:\//.test(normalized)) return normalized;
			if (cwd && !normalized.includes("://")) return normalizeOfficeFilePath(`${cwd}/${normalized}`);
		}
	}
	if (typeof candidate.uri !== "string") return null;
	const fromFileUri = filePathFromFileUri(candidate.uri);
	if (fromFileUri) return fromFileUri;
	const normalizedUri = normalizeOfficeFilePath(candidate.uri);
	return cwd && normalizedUri && !normalizedUri.includes("://") ? normalizeOfficeFilePath(`${cwd}/${normalizedUri}`) : null;
}
function getOfficeLinkOpenMode(command) {
	if (command.forceOpenMode) return command.forceOpenMode;
	if (command.clickModifier?.metaKey || command.clickModifier?.ctrlKey) return;
	return "internal";
}
/**
* 构造 Office 窗的 ConversationViewActions。
*
* 返回值刻意用 unknown 收口：agent-ui 的完整契约含详情面板等 Office 不支持的部分，
* 这里只实现「能在本窗做的动作」，其余保持无操作。
*/
function createOfficeConversationViewActions(deps) {
	const artifactPathCache = /* @__PURE__ */ new Map();
	const openPath = (filePath) => {
		const normalized = filePath ? normalizeOfficeFilePath(filePath) : "";
		if (normalized) deps.openFiles([normalized]);
	};
	const isTencentDocsLikeUrl = (href) => isTencentDocsUrl(href, deps.tencentDocsEdition ?? null, deps.privateDocHost) || isTencentDocsWebUrl(href);
	/** 在本窗打开腾讯文档：能免登就免登（写 partition cookie），否则直开。 */
	const openTencentDocUrlWithFreeLogin = (href) => {
		if (deps.openTencentDocWithFreeLogin) deps.openTencentDocWithFreeLogin(href).catch((error) => {
			console.warn(`${TDOC_OPEN_LOG} free-login open failed, fallback openUrlInTab`, error);
			deps.openUrlInTab(href);
		});
		else deps.openUrlInTab(href);
	};
	const isEnterpriseEdition = deps.tencentDocsEdition === "ultimate" || deps.tencentDocsEdition === "exclusive";
	/**
	* 在本窗新 Tab 以免登态打开腾讯文档，按账号版本分流（与主窗
	* `openTencentDocFromChatChip` 对齐）。
	*
	* block 里存的 `_meta.fileUrl` **不可信**——历史数据可能存的是换票后的一次性 SSO
	* 登录短链（`oauth2.account.tencent.com/.../redirect?code=...`），过期后打开会卡在
	* OAuth 网关。所以只接受「真文档域」的存储 URL，其余靠 fileId 重新解析。
	*
	* - **企业版（旗舰 / 专享）**：webview 有账号级 partition 免登 cookie，用**原始文档
	*   直链**（saas.docs.qq.com/page/xxx 等）直接打开最快；缺可用直链时用
	*   `queryFileInfo(fileId)` 反查新鲜文档 URL。**全程不换票**——换票拿到的 OAuth
	*   redirect 需走完整 SSO 302 链，慢且易卡（#企业版 chip 卡在 oauth2.account.tencent.com）。
	* - **C 端**：无企业免登，用 `getPreviewUrl(fileId)` 换免登临时 URL。
	*
	* 免登靠把 cookie 写进 webview 的 `tdoc-preview` partition（openTencentDocWithFreeLogin）。
	*/
	const openTencentDocsByTarget = (target) => {
		const { fileId } = target;
		const cleanHref = target.url ? removePrivateTencentDocsFileId(target.url) : void 0;
		const trustedHref = cleanHref && isTencentDocsLikeUrl(cleanHref) ? cleanHref : void 0;
		const fail = () => deps.notifyError(t("tencentDocs.localFileOpen.previewOpenFailed"));
		const failWith = (reason) => {
			console.warn(`${TDOC_OPEN_LOG} open failed`, {
				reason,
				fileId
			});
			fail();
		};
		if (isEnterpriseEdition) {
			if (trustedHref) {
				openTencentDocUrlWithFreeLogin(trustedHref);
				return;
			}
			if (fileId && deps.queryTencentDocUrl) {
				deps.queryTencentDocUrl(fileId).then((resolvedUrl) => {
					if (resolvedUrl && isTencentDocsLikeUrl(resolvedUrl)) openTencentDocUrlWithFreeLogin(resolvedUrl);
					else failWith("enterprise-query-no-doc-url");
				}).catch((error) => {
					console.warn(`${TDOC_OPEN_LOG} enterprise queryFileInfo failed`, error);
					failWith("enterprise-query-threw");
				});
				return;
			}
			failWith("enterprise-no-fileid-or-query");
			return;
		}
		if (fileId && deps.getTencentDocsPreviewUrl) {
			deps.getTencentDocsPreviewUrl(fileId, "").then((loginUrl) => {
				if (loginUrl) openTencentDocUrlWithFreeLogin(decorateTencentDocsLoginUrl(loginUrl, fileId));
				else if (trustedHref) openTencentDocUrlWithFreeLogin(trustedHref);
				else failWith("consumer-preview-empty");
			}).catch((error) => {
				console.warn(`${TDOC_OPEN_LOG} consumer getPreviewUrl failed`, error);
				if (trustedHref) openTencentDocUrlWithFreeLogin(trustedHref);
				else failWith("consumer-preview-threw");
			});
			return;
		}
		if (trustedHref) openTencentDocUrlWithFreeLogin(trustedHref);
		else failWith("no-fileid-no-trusted-url");
	};
	const openTencentDocsUrl = (href, fileId) => {
		if (!isTencentDocsLikeUrl(href)) {
			deps.openUrlInTab(href);
			return;
		}
		const resolvedFileId = resolvePrivateTencentDocsFileId(href, fileId);
		openTencentDocsByTarget({
			fileId: resolvedFileId,
			url: href
		});
	};
	/**
	* 按 Office Tab 真正支持的协议打开直接目标。
	*
	* URL Tab 只接受 http(s)；file URI 和绝对路径必须进入文件 Tab。agent URI
	* 需要 artifactId 上下文反查，不能直接交给任一 Tab 后静默丢弃。
	*/
	const tryOpenDirectTarget = (target) => {
		const normalizedTarget = target?.trim();
		if (!normalizedTarget) return false;
		if (isHttpUrl(normalizedTarget)) {
			openTencentDocsUrl(normalizedTarget);
			return true;
		}
		const localPath = filePathFromFileUri(normalizedTarget) ?? officeFilePathFromArtifactUri(normalizedTarget);
		if (localPath && !/^agent:\/\//i.test(normalizedTarget)) {
			openPath(localPath);
			return true;
		}
		return false;
	};
	const openTarget = (target) => {
		if (!tryOpenDirectTarget(target)) deps.notifyError(t("office.error.artifactUnavailable"));
	};
	/**
	* 产物卡片点击。
	*
	* 主窗把它开在右侧产物栏，Office 窗没有那一栏，改成在本窗新开 Tab。卡片发来的命令
	* 通常只有 `{ view: 'artifacts', artifactId }`，没有 filePath —— 之前这里只认
	* filePath / url 两个分支，其余静默忽略，表现就是「点 AI 产物没反应」（#67931）。
	*
	* 两条反查都要留：`get` 走产物索引（拿得到 filePath / uri），`locate` 直接解 id
	* （无索引也能出路径，云端产物则给临时直链）。任何一条走不通都必须给用户回执，
	* 上一版就是三处静默 return 才导致「点了什么都没发生」查不出原因。
	*/
	const openArtifact = async (artifactId) => {
		const cachedPath = artifactPathCache.get(artifactId);
		if (cachedPath) {
			openPath(cachedPath);
			return;
		}
		const artifact = await deps.getArtifact(artifactId);
		const filePath = officeFilePathFromArtifactUri(artifact?.filePath) || officeFilePathFromArtifactUri(artifact?.uri);
		if (filePath) {
			artifactPathCache.set(artifactId, filePath);
			openPath(filePath);
			return;
		}
		if (tryOpenDirectTarget(artifact?.url)) return;
		const located = await deps.locateArtifact(artifactId);
		if (located?.type === "local") {
			const locatedPath = officeFilePathFromArtifactUri(located.path);
			if (locatedPath) {
				artifactPathCache.set(artifactId, locatedPath);
				openPath(locatedPath);
				return;
			}
		}
		if (located?.type === "url" && tryOpenDirectTarget(located.url)) return;
		deps.notifyError(t("office.error.artifactUnavailable"));
	};
	const openArtifactWithFeedback = (artifactId) => {
		openArtifact(artifactId).catch((error) => {
			deps.notifyError(error instanceof Error ? t("office.error.artifactOpenWithReason", { error: error.message }) : t("office.error.artifactOpenFailed"));
		});
	};
	return {
		detail: {
			open: (command) => {
				if (command.filePath) {
					if (!tryOpenDirectTarget(command.filePath)) openPath(command.filePath);
					return;
				}
				if (command.view === "preview") {
					if (command.url && isTencentDocsLikeUrl(command.url)) return;
					if (tryOpenDirectTarget(command.url)) return;
					if (command.artifactId) {
						openArtifactWithFeedback(command.artifactId);
						return;
					}
					deps.notifyError(t("office.error.artifactUnavailable"));
					return;
				}
				if (command.artifactId) {
					openArtifactWithFeedback(command.artifactId);
					return;
				}
				if (command.url && !tryOpenDirectTarget(command.url)) deps.notifyError(t("office.error.artifactUnavailable"));
			},
			toggle: () => {},
			close: () => {},
			isVisible: () => false,
			registerBeforeTargetChange: () => () => void 0
		},
		markdown: {
			openPath: (command) => {
				if (command.type === "directory" || command.type === "symbol") return;
				openPath(command.path);
			},
			openLink: (command) => {
				routeConversationMarkdownLink({
					...command,
					forceOpenMode: getOfficeLinkOpenMode(command)
				}, {
					handleAgentMail: () => false,
					handleTencentDocs: (cmd) => {
						if (!isTencentDocsLikeUrl(cmd.href)) return false;
						openTencentDocsUrl(cmd.href, cmd.fileId);
						return true;
					},
					openExternalUrl: deps.openExternalUrl,
					openPreview: deps.openUrlInTab,
					openWorkBuddyDeepLink: (url) => {
						deps.openExternalUrl(url);
						return true;
					}
				});
			},
			resolveCode: async () => "unknown"
		},
		result: {
			open: (target) => openTarget(target),
			tryOpen: (intent) => {
				if (!intent.targetFile) return false;
				return true;
			}
		},
		userContent: { tryOpen: async (block, context) => {
			const meta = getBlockMeta(block);
			const uri = getBlockUri(block);
			const isTencentDocsBlock = isTencentDocsConnectorMeta(meta) || uri?.startsWith("tdoc://") === true || (isHttpUrl(uri) ? isTencentDocsLikeUrl(uri) : false);
			const isTencentLexiangBlock = isTencentLexiangMeta(meta);
			if (isTencentDocsBlock || isTencentLexiangBlock) {
				if (context?.source !== "timeline") return false;
				if (isTencentDocsBlock) {
					const target = extractOfficeTencentDocTarget(block, meta);
					if (!target.fileId && !target.url) {
						console.warn(`${TDOC_OPEN_LOG} no fileId nor url in block`);
						return false;
					}
					openTencentDocsByTarget(target);
					return true;
				}
				const lexiangTarget = getMetaString(meta, "rawUrl") ?? getMetaString(meta, "url") ?? (isHttpUrl(uri) ? uri : void 0);
				if (!lexiangTarget) return false;
				deps.openUrlInTab(lexiangTarget);
				return true;
			}
			const filePath = resolveOfficeFilePathFromBlock(block, deps.cwd);
			if (filePath) {
				deps.openFiles([filePath]);
				return true;
			}
			const target = resolveAttachmentTarget(block);
			if (isSafeUserAttachmentUrl(target)) {
				deps.openUrlInTab(target);
				return true;
			}
			return false;
		} }
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-document-lease-send-policy.ts
init_i18n();
init_apply_local_file_open_check_result();
/** 构造 Office 文档租约发送门禁；独立导出以直接覆盖真实 policy 入参和决策。 */
function createOfficeDocumentLeaseSendPolicy(options) {
	const { conversationIds, activeConversationId, activeFilePath, activeKind, activeDocumentConsumerId, localDocs, notifyError, onJumpToSession } = options;
	return {
		id: "office-active-document-lease",
		order: -100,
		shouldRun: (context) => conversationIds.has(context.conversationId),
		beforeSend: async (context) => {
			if (!activeConversationId || context.conversationId !== activeConversationId || !activeFilePath) {
				notifyError(t("office.chat.activeFileChanged"));
				return {
					allow: false,
					silent: true
				};
			}
			if (activeKind !== "document" || !localDocs) return true;
			try {
				const ownership = await localDocs.checkOpen(activeFilePath, {
					sessionId: activeConversationId,
					consumerId: activeDocumentConsumerId,
					requireConsumerOwnership: true,
					source: "session-open"
				});
				if (!ownership.success || ownership.status === "pool-full") {
					notifyError(ownership.message || ownership.error || t("office.chat.documentSessionExpired"));
					return {
						allow: false,
						silent: true
					};
				}
				return applyLocalFileOpenCheckResult({
					result: ownership,
					filePath: activeFilePath,
					source: "session-open",
					requestSessionId: activeConversationId,
					currentSessionId: activeConversationId,
					requestConsumerId: activeDocumentConsumerId,
					requireConsumerOwnership: true,
					onJumpToSession
				}) === "proceed" ? true : {
					allow: false,
					silent: true
				};
			} catch {
				notifyError(t("office.chat.documentStatusUnavailable"));
				return {
					allow: false,
					silent: true
				};
			}
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-document-selection-bridge.tsx
init_wb_singleton();
init_selection_quote();
init_module_host_context();
init_conversation_phrase_renderer();
init_use_conversation_document_selection();
function OfficeDocumentSelectionBridge() {
	const documentSelectionDialog = useTencentDocsConversationDocumentSelectionBridge({ selectionSendOwner: "office" });
	const conversationExtensions = useModuleHost().wb.conversations.extensions;
	(0, import_react.useEffect)(() => conversationExtensions.inputPhraseRenderers.register({
		id: "tencent-docs.document-selection",
		order: 100,
		render: tencentDocsConversationPhraseRenderer
	}), [conversationExtensions]);
	(0, import_react.useEffect)(() => conversationExtensions.inputPhraseRenderers.register({
		id: "office.selection-quote",
		order: 110,
		render: selectionQuotePhraseRenderer
	}), [conversationExtensions]);
	(0, import_react.useEffect)(() => {
		setOfficeSelectionBridgeReady(true);
		const replay = () => {
			replayPendingOfficeSelection().catch(() => void 0);
		};
		const offCurrent = getWb().conversations.onCurrentChange?.(replay) ?? (() => void 0);
		replay();
		return () => {
			offCurrent();
			setOfficeSelectionBridgeReady(false);
		};
	}, []);
	return documentSelectionDialog;
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-jump-to-conversation.ts
init_file_path();
/**
* 执行 Office 冲突提示的「跳转查看」。
*
* 同一路径若由另一 Office Tab 持有编辑权，优先聚焦该 Tab；否则回主窗打开
* owner 会话及对应文件。返回 false 表示不是本桥消费的事件。
*/
async function handleOfficeJumpToConversation(data, deps) {
	const intent = data;
	if (intent?.source !== WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs || !intent.sessionId) return false;
	if (intent.filePath && deps.focusOfficeFile) {
		if (await deps.focusOfficeFile(intent.filePath, { onlyEditor: true }).catch(() => false)) return true;
	}
	await deps.navigateMainWindow({
		route: "conversation",
		payload: {
			conversationId: intent.sessionId,
			...intent.filePath ? {
				sidebarUrl: filePathToFileUrl(intent.filePath),
				sidebarFilePath: intent.filePath
			} : {}
		}
	});
	return true;
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-conversation-providers.tsx
init_wb_singleton();
init_i18n();
init_conversation();
init_jump_to_conversation_payload();
function directoryOf(filePath) {
	if (!filePath) return;
	const normalized = filePath.replace(/\\/g, "/");
	const index = normalized.lastIndexOf("/");
	return index > 0 ? normalized.slice(0, index) : normalized;
}
/**
* Office renderer 的 adapter 事件不会被主窗 App 里的监听器消费。
* 在本窗把「跳转查看」意图桥到窗口服务：优先聚焦已有 Office editor，
* 未命中才回主窗打开 owner 会话。
*/
function OfficeJumpToConversationBridge() {
	const adapter = useAdapter();
	(0, import_react.useEffect)(() => {
		if (!adapter?.on) return;
		return adapter.on(WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, (data) => {
			const windows = getWb().windows;
			handleOfficeJumpToConversation(data, {
				focusOfficeFile: windows.focusOfficeFile?.bind(windows),
				navigateMainWindow: (request) => navigateMainWindow(request, windows)
			}).catch(() => {
				toast.error(t("office.error.documentOpenFailed"));
			});
		});
	}, [adapter]);
	return null;
}
/** 从账号 profile 推导腾讯文档企业版本（与 deriveEffectiveEdition 对齐）。 */
function deriveTencentDocsEdition(profile) {
	const type = profile?.type;
	if (type === "ultimate" || type === "exclusive") return type;
	return profile?.enterpriseId?.trim() ? "exclusive" : null;
}
function OfficeConversationProviders({ openFiles, openUrlInTab, openExternalUrl, conversationIds, activeConversationId, activeFilePath, activeKind, activeDocumentConsumerId, children }) {
	const { localDocs, account } = useOfficeServices();
	const tencentDocsEdition = (0, import_react.useMemo)(() => deriveTencentDocsEdition(account.profile), [account.profile]);
	const getTencentDocsPreviewUrl = (0, import_react.useCallback)(async (fileId, href) => {
		const tencentDocs = getWb().tencentDocs;
		if (!tencentDocs?.getPreviewUrl) return href;
		return tencentDocs.getPreviewUrl({
			file: {
				file_id: fileId,
				url: href
			},
			type: "openOriginalFile",
			...activeConversationId ? { sessionId: activeConversationId } : {}
		});
	}, [activeConversationId]);
	const queryTencentDocUrl = (0, import_react.useCallback)(async (fileId) => {
		const tencentDocs = getWb().tencentDocs;
		if (!tencentDocs?.queryFileInfo) {
			console.warn("[OfficeTdocOpen] queryFileInfo unavailable");
			return;
		}
		try {
			const info = await tencentDocs.queryFileInfo({ file_id: fileId });
			return info?.tencent_doc_url?.trim() || info?.doc_url?.trim() || void 0;
		} catch (error) {
			console.warn("[OfficeTdocOpen] queryFileInfo failed", error);
			return;
		}
	}, []);
	const conversationIdSet = (0, import_react.useMemo)(() => new Set(conversationIds), [conversationIds]);
	(0, import_react.useEffect)(() => conversationExtensions.sendPolicies.register(createOfficeDocumentLeaseSendPolicy({
		conversationIds: conversationIdSet,
		activeConversationId,
		activeFilePath,
		activeKind,
		activeDocumentConsumerId,
		localDocs,
		notifyError: (message) => toast.error(message),
		onJumpToSession: (sessionId) => {
			const windows = getWb().windows;
			handleOfficeJumpToConversation({
				sessionId,
				filePath: activeFilePath,
				source: WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs,
				reason: WORKBUDDY_JUMP_TO_CONVERSATION_REASONS.alreadyActive
			}, {
				focusOfficeFile: windows.focusOfficeFile?.bind(windows),
				navigateMainWindow: (request) => navigateMainWindow(request, windows)
			}).catch(() => {
				toast.error(t("office.error.documentOpenFailed"));
			});
		}
	})), [
		activeConversationId,
		activeFilePath,
		activeKind,
		activeDocumentConsumerId,
		conversationIdSet,
		localDocs
	]);
	const viewActions = (0, import_react.useMemo)(() => createOfficeConversationViewActions({
		openFiles,
		openUrlInTab,
		openExternalUrl,
		cwd: directoryOf(activeFilePath),
		getArtifact: async (artifactId) => {
			try {
				return await getWb().artifacts.get({ artifactId }) ?? null;
			} catch {
				return null;
			}
		},
		locateArtifact: async (artifactId) => {
			try {
				return await getWb().artifacts.locate({ artifactId }) ?? null;
			} catch {
				return null;
			}
		},
		notifyError: (message) => toast.error(message),
		tencentDocsEdition,
		getTencentDocsPreviewUrl,
		openTencentDocWithFreeLogin: (docUrl) => openOfficeTencentDocWithFreeLogin(docUrl, openUrlInTab),
		queryTencentDocUrl
	}), [
		activeFilePath,
		openExternalUrl,
		openFiles,
		openUrlInTab,
		tencentDocsEdition,
		getTencentDocsPreviewUrl,
		queryTencentDocUrl
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeAgentHost, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationViewActionsProvider, {
		value: viewActions,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OfficeConversationAccountGate, {
			status: account.status,
			profile: account.profile,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeJumpToConversationBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeDocumentSelectionBridge, {}),
				children
			]
		})
	}) });
}
//#endregion
export { OfficeConversationProviders };
