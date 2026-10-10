import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, F6 as init_src, J3 as useConversations, Q as init_app_providers, Q8 as BrowserPreview, V3 as useAdapter, tt as useAppProviders } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/app-shell/effects/use-browser-preview-surface-bridge.ts
function useBrowserPreviewSurfaceBridge(options) {
	const { provider, openSessionBrowser, closeSessionBrowser, activateSurface, deactivateSurface } = options;
	(0, import_react$2.useEffect)(() => {
		provider?.acknowledge({
			kind: "active",
			sessionId: options.currentSessionId
		});
	}, [options.currentSessionId, provider]);
	(0, import_react$2.useEffect)(() => {
		if (!provider) return;
		return provider.subscribe({
			open: (command) => {
				if (!options.currentSessionId || command.sessionId !== options.currentSessionId) return;
				openSessionBrowser(command.sessionId, command.url);
				activateSurface();
				provider.acknowledge({
					requestId: command.requestId,
					kind: "open",
					sessionId: options.currentSessionId
				});
			},
			close: (command) => {
				if (!options.currentSessionId || command.sessionId !== options.currentSessionId) return;
				closeSessionBrowser(command.sessionId);
				deactivateSurface();
				provider.acknowledge({
					requestId: command.requestId,
					kind: "close",
					sessionId: options.currentSessionId
				});
			}
		});
	}, [
		activateSurface,
		closeSessionBrowser,
		deactivateSurface,
		openSessionBrowser,
		options.currentSessionId,
		provider
	]);
}
var import_react$2;
var init_use_browser_preview_surface_bridge = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/browser-preview-surface-bridge-host.tsx
function BrowserPreviewSurfaceBridgeHost({ provider, openSessionBrowser, closeSessionBrowser }) {
	const adapter = useAdapter();
	const conversations = useConversations();
	const clearBrowserUrl = (0, import_react$1.useCallback)(() => {
		conversations.setBrowserUrl?.("");
		const sessionId = conversations.currentConversation?.id;
		if (sessionId) adapter.setBrowserUrlForSession?.(sessionId, "");
	}, [
		adapter,
		conversations.currentConversation?.id,
		conversations.setBrowserUrl
	]);
	useBrowserPreviewSurfaceBridge({
		provider,
		openSessionBrowser,
		closeSessionBrowser,
		activateSurface: (0, import_react$1.useCallback)(() => {
			clearBrowserUrl();
			conversations.setSelectedArtifactId?.(void 0);
			conversations.onSidebarViewChange?.("preview");
			conversations.showDetailPanelAsNeeded?.();
		}, [clearBrowserUrl, conversations]),
		deactivateSurface: (0, import_react$1.useCallback)(() => {
			conversations.setSelectedArtifactId?.(void 0);
			conversations.onSidebarViewChange?.("artifacts");
		}, [conversations]),
		currentSessionId: conversations.currentConversation?.id
	});
	return null;
}
var import_react$1;
var init_browser_preview_surface_bridge_host = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_browser_preview_surface_bridge();
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/session-browser-view-host.tsx
function createHostElement() {
	if (typeof document === "undefined") return null;
	const element = document.createElement("div");
	element.dataset.sessionBrowserViewHost = "true";
	Object.assign(element.style, {
		position: "relative",
		width: "100%",
		height: "100%",
		minWidth: "0",
		minHeight: "0"
	});
	return element;
}
/**
* Move a connected webview host atomically. Re-inserting a connected host with
* appendChild destroys Electron webview browsing contexts, so there is no
* destructive fallback when Chromium does not expose moveBefore.
*/
function moveHostElement(host, target) {
	if (host.parentElement === target) return true;
	if (host.ownerDocument !== target.ownerDocument) return false;
	const moveBefore = target.moveBefore;
	if (host.isConnected) {
		if (!target.isConnected || !moveBefore) return false;
		try {
			moveBefore.call(target, host, null);
			return true;
		} catch (error) {
			console.warn("[SessionBrowserViewHost] failed to move connected browser host", error);
			return false;
		}
	}
	target.appendChild(host);
	return true;
}
/**
* App-lifetime owner for Desktop IAB webviews.
*
* There is at most one entry per product session. Session switches only hide
* entries; explicit close or session eviction is what unmounts a webview.
*/
function SessionBrowserViewProvider({ children }) {
	const adapter = useAdapter();
	const surfaceProvider = useAppProviders()?.browserPreviewSurface;
	const [hostElement] = (0, import_react.useState)(createHostElement);
	const parkingElementRef = (0, import_react.useRef)(null);
	const targetRef = (0, import_react.useRef)(null);
	const [attachedSessionId, setAttachedSessionId] = (0, import_react.useState)(void 0);
	const [entries, setEntries] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	const [selectedSessionIds, setSelectedSessionIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const open = (0, import_react.useCallback)((sessionId, url) => {
		setEntries((previous) => {
			if (previous.get(sessionId)?.url === url) return previous;
			const next = new Map(previous);
			next.set(sessionId, {
				sessionId,
				url
			});
			return next;
		});
		setSelectedSessionIds((previous) => {
			if (previous.has(sessionId)) return previous;
			const next = new Set(previous);
			next.add(sessionId);
			return next;
		});
	}, []);
	const close = (0, import_react.useCallback)((sessionId) => {
		setEntries((previous) => {
			if (!previous.has(sessionId)) return previous;
			const next = new Map(previous);
			next.delete(sessionId);
			return next;
		});
		setSelectedSessionIds((previous) => {
			if (!previous.has(sessionId)) return previous;
			const next = new Set(previous);
			next.delete(sessionId);
			return next;
		});
	}, []);
	const select = (0, import_react.useCallback)((sessionId) => {
		setSelectedSessionIds((previous) => {
			if (previous.has(sessionId) || !entries.has(sessionId)) return previous;
			const next = new Set(previous);
			next.add(sessionId);
			return next;
		});
	}, [entries]);
	const deselect = (0, import_react.useCallback)((sessionId) => {
		setSelectedSessionIds((previous) => {
			if (!previous.has(sessionId)) return previous;
			const next = new Set(previous);
			next.delete(sessionId);
			return next;
		});
	}, []);
	const updateUrl = (0, import_react.useCallback)((sessionId, url) => {
		if (!url) return;
		setEntries((previous) => {
			const existing = previous.get(sessionId);
			if (!existing || existing.url === url) return previous;
			const next = new Map(previous);
			next.set(sessionId, {
				...existing,
				url
			});
			return next;
		});
	}, []);
	const park = (0, import_react.useCallback)(() => {
		if (hostElement && parkingElementRef.current) moveHostElement(hostElement, parkingElementRef.current);
	}, [hostElement]);
	const attach = (0, import_react.useCallback)((target, sessionId) => {
		if (!hostElement || moveHostElement(hostElement, target)) {
			targetRef.current = target;
			setAttachedSessionId(sessionId);
		}
	}, [hostElement]);
	const detach = (0, import_react.useCallback)((target) => {
		if (targetRef.current !== target) return;
		targetRef.current = null;
		setAttachedSessionId(void 0);
		park();
	}, [park]);
	const registerParkingElement = (0, import_react.useCallback)((element) => {
		parkingElementRef.current = element;
		if (element && !targetRef.current) park();
	}, [park]);
	(0, import_react.useLayoutEffect)(() => () => {
		targetRef.current = null;
		hostElement?.remove();
	}, [hostElement]);
	(0, import_react.useEffect)(() => adapter.on?.("session-evicted", (event) => {
		const sessionId = typeof event?.sessionId === "string" ? event.sessionId.trim() : "";
		if (sessionId) close(sessionId);
	}), [adapter, close]);
	const controller = (0, import_react.useMemo)(() => ({
		entries,
		selectedSessionIds,
		open,
		close,
		select,
		deselect,
		updateUrl
	}), [
		close,
		deselect,
		entries,
		open,
		select,
		selectedSessionIds,
		updateUrl
	]);
	const layoutController = (0, import_react.useMemo)(() => ({
		attach,
		detach
	}), [attach, detach]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionBrowserViewContext.Provider, {
		value: controller,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SessionBrowserViewLayoutContext.Provider, {
			value: layoutController,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserPreviewSurfaceBridgeHost, {
					provider: surfaceProvider,
					openSessionBrowser: open,
					closeSessionBrowser: close
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: registerParkingElement,
					"aria-hidden": "true",
					style: { display: "none" }
				}),
				hostElement ? (0, import_react_dom.createPortal)([...entries.values()].map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-session-browser-entry": entry.sessionId,
					style: {
						display: attachedSessionId === entry.sessionId ? "flex" : "none",
						width: "100%",
						height: "100%",
						minWidth: 0,
						minHeight: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserPreview, {
						environmentType: "local",
						useWebview: true,
						theme: "auto",
						browserSessionId: entry.sessionId,
						browserUrl: entry.url,
						onUrlChange: (url) => updateUrl(entry.sessionId, url)
					})
				}, entry.sessionId)), hostElement) : null
			]
		})
	});
}
/** Current session's browser state for DetailPanel/SidebarNext wiring. */
function useSessionBrowserView(sessionId) {
	const controller = (0, import_react.useContext)(SessionBrowserViewContext);
	const url = sessionId ? controller?.entries.get(sessionId)?.url : void 0;
	const selected = Boolean(sessionId && controller?.selectedSessionIds.has(sessionId));
	return (0, import_react.useMemo)(() => ({
		url,
		selected,
		select: () => {
			if (sessionId) controller?.select(sessionId);
		},
		deselect: () => {
			if (sessionId) controller?.deselect(sessionId);
		},
		close: () => {
			if (sessionId) controller?.close(sessionId);
		}
	}), [
		controller,
		selected,
		sessionId,
		url
	]);
}
/** Layout target for the stable app-owned browser host. */
function SessionBrowserViewSlot({ sessionId }) {
	const controller = (0, import_react.useContext)(SessionBrowserViewLayoutContext);
	const targetRef = (0, import_react.useRef)(null);
	const registerTarget = (0, import_react.useCallback)((target) => {
		const previous = targetRef.current;
		if (previous) controller?.detach(previous);
		targetRef.current = target;
		if (target) controller?.attach(target, sessionId);
	}, [controller, sessionId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: registerTarget,
		"data-session-browser-view-slot": sessionId,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			minWidth: 0,
			minHeight: 0
		}
	});
}
var import_react, import_react_dom, import_jsx_runtime, SessionBrowserViewContext, SessionBrowserViewLayoutContext;
var init_session_browser_view_host = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_app_providers();
	init_browser_preview_surface_bridge_host();
	import_jsx_runtime = require_jsx_runtime();
	SessionBrowserViewContext = (0, import_react.createContext)(null);
	SessionBrowserViewLayoutContext = (0, import_react.createContext)(null);
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/quick-ask-session-state.ts
/** 生成条目 id。格式对齐 `createBrowserTabId`（时间戳 + 序号 + 随机后缀）。 */
function createQuickAskId() {
	quickAskSeq += 1;
	const rand = Math.random().toString(36).slice(2, 8);
	return `quickAsk-${Date.now().toString(36)}-${quickAskSeq.toString(36)}-${rand}`;
}
/**
* 追加一条并激活。
*
* `title` 由调用方传入**已本地化**的文案，形如「快速问答：{划词内容}」。
* 标题带上划词原文而非固定字样，是为了让用户一眼看出这个 Tab 在聊什么
* （每个宿主会话只有一个 Tab，标题是它唯一的身份提示）。
* 原文的折行 / 压空白 / 截断由 `formatQuickAskQuoteForTitle` 负责 ——
* Tab 的原生 tooltip 直接用 `label`（`ArtifactTabsBar.tsx:443`），
* 不截断会 hover 弹出一整段。
*/
function addQuickAskSession(state, input) {
	const item = {
		id: input.id,
		ownerConversationId: input.ownerConversationId,
		title: input.title,
		quotedText: input.quotedText,
		...input.sourceMessageId ? { sourceMessageId: input.sourceMessageId } : {}
	};
	return {
		sessions: [...state.sessions, item],
		activeId: item.id
	};
}
/**
* 找出属于某个宿主会话的临时会话条目（「每会话一条」上限的判据）。
*
* 命中即复用（追加提问），未命中即新建。**不能**退化成「数组非空就复用」：
* 那正是「在会话 A 划词建了 Tab，切到 B 再划词却把提问追加进 A」这个 bug 的成因。
*
* 取最后一条而不是第一条：理论上同一 owner 只会有一条（真源与编排层双重把关），
* 万一因竞态出现两条，最近创建的那个才是用户正在看的窗口。
*/
function findQuickAskSessionByOwner(sessions, ownerConversationId) {
	if (!ownerConversationId) return;
	for (let index = sessions.length - 1; index >= 0; index -= 1) {
		const item = sessions[index];
		if (item?.ownerConversationId === ownerConversationId) return item;
	}
}
/**
* 挑出属于某个宿主会话的条目 —— 临时会话的**展示口径**。
*
* ## 为什么是「过滤展示」而不是「切走即归档」
*
* 产品口径已改（#100618）：临时会话**跨会话存活**，切走只是看不见，切回来必须
* 原样还在；**只有用户主动关闭 Tab** 才归档销毁（`handleQuickAskClose`）。
* 所以宿主会话切换时不能再去归档别人的条目，只能按 owner 把「当前会话看得见的」
* 那部分筛出来交给 DetailPanel。
*
* ⚠️ 传入的 `ownerConversationId` 必须与 DetailPanel 的 `resetKey`
* （`currentConversation?.id`）**同源同帧**。用路由 id（`activeConversationEngineId`）
* 会早一帧变化，出现「owner 已是 B、Tab 栈还是 A 的」窗口 —— 那一帧 A 的条目被筛掉，
* `isTabStillValid` 立刻把 A 的 Tab 判失效并从栈里剔除，切回 A 时 Tab 就没了。
*
* 空 `ownerConversationId`（首页 / 路由中间态）返回空数组：此时没有宿主会话，
* 不该把任何会话的临时 Tab 摊给它。条目本身仍留在真源里，切回去即恢复。
*/
function selectQuickAskSessionsForHost(sessions, ownerConversationId) {
	if (!sessions || sessions.length === 0 || !ownerConversationId) return [];
	return sessions.filter((item) => item.ownerConversationId === ownerConversationId);
}
/**
* 解析当前宿主会话该激活哪一条临时会话。
*
* `activeId` 是**全局**的（真源只有一个激活位），它可能指向别的会话的条目 ——
* 用户在 A 划词后切到 B 再划词，activeId 就是 B 那条。切回 A 时若直接把这个
* activeId 透给 DetailPanel，`deriveActiveTab` 找不到条目会返回 null，
* 表现为「Tab 在、内容空」。
*
* 因此这里做兜底：activeId 不属于本会话时，回落到本会话自己那条
* （「每会话最多一条」，取最后一条即最近创建的那条）。
*/
function resolveActiveQuickAskIdForHost(hostSessions, activeId) {
	if (activeId && hostSessions.some((item) => item.id === activeId)) return activeId;
	return hostSessions[hostSessions.length - 1]?.id;
}
/**
* 某个宿主会话当前是否还有存活的临时会话。
*
* 用途是**视图恢复的门禁**：`quickAsk` 这个 sidebarView 只有在条目仍存活时才值得
* 持久化 / 恢复。条目已被用户关掉却把视图恢复成 quickAsk，会落到「无 Tab、左栏被
* 压掉、主区一片空白」的死态。
*/
function hasQuickAskSessionForHost(sessions, ownerConversationId) {
	return !!findQuickAskSessionByOwner(sessions ?? [], ownerConversationId ?? "");
}
/**
* 移除一条。
*
* 关闭的是激活项时选相邻项：**右邻优先**（与浏览器页签一致，`closeBrowserTab`
* 同款语义）；已是最后一项则右邻不存在，退到左邻；全删完则激活 id 置空
* —— 置空这一步不能漏，否则 activeQuickAskId 会指向已删条目，
* `deriveActiveTab` 找不到条目返回 null，Tab 区看起来"卡住"。
*/
function removeQuickAskSession(state, id) {
	const index = state.sessions.findIndex((item) => item.id === id);
	if (index < 0) return state;
	const sessions = state.sessions.filter((item) => item.id !== id);
	if (state.activeId !== id) return {
		sessions,
		activeId: state.activeId
	};
	return {
		sessions,
		activeId: (sessions[index] ?? sessions[index - 1])?.id
	};
}
/** 回填内嵌会话 id（Task 23 创建会话后调用）。条目已不存在时原样返回。 */
function attachQuickAskConversation(state, id, conversationId) {
	if (!state.sessions.some((item) => item.id === id)) return state;
	return {
		...state,
		sessions: state.sessions.map((item) => item.id === id ? {
			...item,
			conversationId
		} : item)
	};
}
/**
* 刷新标题与划词原文（追加提问时调用）。
*
* 为什么追加也要改标题：每个宿主会话只有一个临时会话 Tab，标题是它唯一的
* 身份提示。用户连划三段追问后，标题若还停在第一段，就成了谎报。
* 让它跟着最新一次划词走，标题始终等于「当前在聊什么」。
*
* `quotedText` 一并更新：`deriveActiveTab` 用它做 descriptor 的 subtitle
* （`use-unified-tabs.ts:461`），留着旧值会和标题对不上。
*
* 条目已不存在（Tab 刚被关闭）时原样返回，不复活条目。
*/
function renameQuickAskSession(state, id, input) {
	const target = state.sessions.find((item) => item.id === id);
	if (!target || target.title === input.title && target.quotedText === input.quotedText) return state;
	return {
		...state,
		sessions: state.sessions.map((item) => item.id === id ? {
			...item,
			title: input.title,
			quotedText: input.quotedText
		} : item)
	};
}
var quickAskSeq;
var init_quick_ask_session_state = __esmMin((() => {
	quickAskSeq = 0;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/internal-browser-open.ts
function openPublishedArtifactInInternalBrowser(url, openInternalBrowser) {
	openInternalBrowser(url, { disposition: "new-tab" });
}
function applyInternalBrowserOpenDisposition(url, options, handlers) {
	if (options?.disposition === "new-tab") {
		handlers.addBrowserTab(url);
		return;
	}
	handlers.setBrowserUrl(url);
}
var init_internal_browser_open = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/read-allowed-dirs.ts
/**
* 从本地文件路径提取父目录，作为 daemon `fileRead` 的 `allowedDirs` 放行目录。
*
* 背景（issue #80331）：daemon 侧 `validatePath` 只放行 session.cwd + home + config + dev。
* Claw fullAccess 模式下 agent 可写到 session cwd 之外（如 Windows D 盘非 cwd 目录），
* 这些文件被点击预览（文件树 / diff / custom-artifact 等入口）时，若 caller 不显式带
* `allowedDirs`，daemon 会直接返回 `Access denied: path not in allowed directories`。
*
* 这里把待读文件的父目录作为额外放行目录透传给 daemon，使 cwd 外的用户/agent 产物可读。
* 放行父目录粒度（非文件本身），与 `local-file-preview` / `readFileByPath` /
* MediaPreview 的 `extraReadAllowedDirs` 语义对齐，也支持 HTML 同目录 CSS/JS 依赖读取。
*
* 刻意不依赖 `node:path`：agent-ui 是 renderer/browser 代码，跨 Web/Desktop 编译，
* 用手写分隔符探测比引入 path-browserify 更轻。与
* `packages/workbuddy-app/src/adapter/read-path-utils.ts` 的 `getParentDirForRead`、
* `use-artifacts-manager.ts` 的 `extractParentDir` 语义一致，修边界条件时请同步。
*
* 特殊情形：
* - `agent://` 沙盒相对路径：返回 undefined。这类路径由 daemon 经 session 通道解析，
*   不需要（也不能）用本地父目录放行。
* - 盘符根文件（`C:/x.txt` / `C:\x.txt`）：返回带分隔符的盘根（`C:/` / `C:\`），
*   不能返回 `C:`（daemon `path.normalize('C:')` 在 Windows 会得到 `C:.` 导致放行失效）。
* - POSIX 根文件（`/x.txt`）：返回 `/`。
* - 无分隔符（裸文件名 / drive-relative 如 `C:x.txt`）：返回 undefined。
*
* @param filePath 待读文件路径（支持 `file://` 前缀、Windows `\` 与 POSIX `/`）。
* @returns `{ allowedDirs: [父目录] }` 或 undefined（无法确定父目录 / agent:// 路径）。
*/
function buildReadAllowedDirsOption(filePath) {
	const parentDir = extractLocalParentDir(filePath);
	return parentDir ? { allowedDirs: [parentDir] } : void 0;
}
/**
* 从本地文件路径提取父目录字符串（file:// 前缀会被去除）。
* agent:// 路径 / 无分隔符 / 空值返回 undefined。
*/
function extractLocalParentDir(filePath) {
	if (typeof filePath !== "string" || filePath.trim().length === 0) return;
	if (filePath.startsWith("agent://")) return;
	let normalized = filePath;
	if (filePath.startsWith("file://")) try {
		const parsed = new URL(filePath);
		const pathname = decodeURIComponent(parsed.pathname);
		normalized = parsed.hostname && parsed.hostname !== "localhost" ? `//${parsed.hostname}${pathname}` : pathname;
	} catch {
		normalized = filePath.replace(/^file:\/\//, "");
		try {
			normalized = decodeURIComponent(normalized);
		} catch {}
	}
	const idx = Math.max(normalized.lastIndexOf("/"), normalized.lastIndexOf("\\"));
	if (idx < 0) return;
	const sep = normalized[idx];
	if (idx === 2 && /^[a-zA-Z]:$/.test(normalized.slice(0, 2))) return normalized.slice(0, 2) + sep;
	if (idx === 0) return sep;
	return normalized.slice(0, idx);
}
var init_read_allowed_dirs = __esmMin((() => {}));
//#endregion
export { SessionBrowserViewSlot as _, openPublishedArtifactInInternalBrowser as a, createQuickAskId as c, init_quick_ask_session_state as d, removeQuickAskSession as f, SessionBrowserViewProvider as g, selectQuickAskSessionsForHost as h, init_internal_browser_open as i, findQuickAskSessionByOwner as l, resolveActiveQuickAskIdForHost as m, init_read_allowed_dirs as n, addQuickAskSession as o, renameQuickAskSession as p, applyInternalBrowserOpenDisposition as r, attachQuickAskConversation as s, buildReadAllowedDirsOption as t, hasQuickAskSessionForHost as u, init_session_browser_view_host as v, useSessionBrowserView as y };
