import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Bv as openPurchaseModal, C3 as useLocation, Ck as GenieEmbed, D1 as useI18n, E as init_contexts, E1 as init_useI18n, Ek as resolveGenieUrl, HT as useGenieSpaceItems, Iv as init_purchase, J3 as useConversations, K2 as init_environment, K3 as init_conversations_context, L3 as init_account_context, PC as init_hooks, Qrt as init_common, R1 as toZhEnLocale, R3 as useAccount, S1 as useTheme, Sk as notifyGenieTheme, UT as genieEmbedNavStore, V3 as useAdapter, VT as init_genie_space_store, WT as init_genie_embed_nav_store, XM as useMainRouteActive, _p as init_genie_project$1, ck as init_genie_embed, dB as useMacFullscreen, e4 as isWorkBuddyDesktop, fk as GENIE_BUTTON, gC as useWorkBuddyTopBarVisible, hC as useTopBarRootClassName, j1 as init_i18n, jw as useGenieAgentEnabled, pC as init_workbuddy_topbar, pk as GENIE_EMBED_EVENT, qm as projectHandoffStore, uB as init_use_mac_fullscreen, uC as SidebarExpandButton, uk as useGenieEmbedTelemetry, vk as GENIE_SHARE_STAGE, w3 as useNavigate, x1 as init_useTheme, xk as normalizeGenieTheme, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Dv as require_dist, Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as init_app_shell } from "./app-shell-DgGkIrlT.js";
//#region ../../packages/agent-ui/src/components/main-content-core/persistent-genie-host.less
var init_persistent_genie_host = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/genie-wx-share-bridge.ts
/** 生成一次分享的关联 ID（shareInvocationId + stage 去重）。 */
function createShareInvocationId() {
	try {
		if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	} catch {}
	return `share_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
/** bizType → linkType（不含敏感信息，仅类型枚举）。 */
function deriveShareLinkType(bizType) {
	switch (bizType) {
		case "artifact": return "preview";
		case "conversation": return "conversation";
		case "genie_web": return "published";
		default: return;
	}
}
/**
* Handles the Genie-only share bridge after PersistentGenieHost has accepted
* the webview message. The host, rather than the embedded app, owns isGenie.
*/
async function handleGenieWxShareRequest({ message, wxShareHandler, sendResponse, telemetry }) {
	const { requestId, data: shareParams } = message;
	if (!requestId || !shareParams || typeof shareParams !== "object") {
		if (requestId) sendResponse(requestId, {
			success: false,
			errcode: "INVALID_PARAMS",
			errmsg: "missing requestId or share params"
		});
		return;
	}
	const shareInfo = {
		shareInvocationId: createShareInvocationId(),
		channel: "wechat",
		shareAction: "channel_share",
		linkType: deriveShareLinkType(shareParams.bizType),
		scene: shareParams.scene
	};
	const reportResult = (resultFlag, status) => {
		try {
			telemetry?.onResult?.({
				...shareInfo,
				resultFlag,
				status
			});
		} catch {}
	};
	try {
		telemetry?.onStart?.(shareInfo);
	} catch {}
	if (typeof wxShareHandler !== "function") {
		reportResult(false, "failed");
		sendResponse(requestId, {
			success: false,
			errcode: "NO_HANDLER",
			errmsg: "wxShareHandler is not injected in this host"
		});
		return;
	}
	try {
		const result = await wxShareHandler({
			...shareParams,
			isGenie: true
		});
		if (!result || typeof result !== "object" || typeof result.success !== "boolean") {
			reportResult(false, "failed");
			sendResponse(requestId, {
				success: false,
				errcode: "INVALID_RESULT",
				errmsg: "wxShareHandler returned malformed result"
			});
			return;
		}
		reportResult(result.success, result.success ? "success" : "failed");
		sendResponse(requestId, {
			success: result.success,
			errcode: result.errcode,
			errmsg: result.errmsg
		});
	} catch (err) {
		reportResult(false, "failed");
		sendResponse(requestId, {
			success: false,
			errcode: "EXCEPTION",
			errmsg: err instanceof Error ? err.message : String(err)
		});
	}
}
var init_genie_wx_share_bridge = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/use-genie-embed-nav.ts
/** 将桥接路径归一为可比较的 pathname，忽略 query/hash 差异。 */
function normalizeGenieNavigationPath(path) {
	const pathname = path.split(/[?#]/, 1)[0] || "/";
	return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
/** 匹配入站路径时消费当前宿主意图；不匹配则保留它。 */
function consumeHostNavigationIntent(hostNavigationIntent, geniePath) {
	if (hostNavigationIntent !== normalizeGenieNavigationPath(geniePath)) return {
		confirmed: false,
		remainingIntent: hostNavigationIntent
	};
	return {
		confirmed: true,
		remainingIntent: null
	};
}
/** 从 subPath 中提取项目 ID，用于识别跨项目跳转 */
function extractGenieProjectId(sub) {
	const m = sub.match(/^\/project\/([^/?#]+)/);
	if (!m || m[1] === "loading") return null;
	return m[1];
}
/**
* 判定 Genie 视图子路径从 prevSub → nextSub 是否需要整页 reload iframe。
*  - isCrossProjectSwitch：真实项目 A → 另一个真实项目 B（两端都是真实项目且不同）。
*  - isLeaveProjectToHome：从真实项目回首页 '/'。
*  - isEnterProjectFromHome：从历史内嵌首页状态进入项目页。
*/
function computeProjectSwitchReload(prevSub, nextSub) {
	const prevProjectId = extractGenieProjectId(prevSub);
	const nextProjectId = extractGenieProjectId(nextSub);
	return {
		isCrossProjectSwitch: nextProjectId !== null && prevProjectId !== null && prevProjectId !== nextProjectId,
		isLeaveProjectToHome: prevProjectId !== null && nextSub === "/",
		isEnterProjectFromHome: prevSub === "/" && nextProjectId !== null
	};
}
function useGenieEmbedNav({ visible, webviewRef }) {
	const location = useLocation();
	const [pendingGeniePath, setPendingGeniePath] = (0, import_react$4.useState)(null);
	const hostNavigationIntentRef = (0, import_react$4.useRef)(null);
	const skipHostIntentForPathRef = (0, import_react$4.useRef)(null);
	const wasVisibleRef = (0, import_react$4.useRef)(visible);
	const registerHostNavigationIntent = (0, import_react$4.useCallback)((path) => {
		hostNavigationIntentRef.current = normalizeGenieNavigationPath(path);
	}, []);
	const getHostNavigationIntent = (0, import_react$4.useCallback)(() => hostNavigationIntentRef.current, []);
	const confirmHostNavigationIntent = (0, import_react$4.useCallback)((path) => {
		const result = consumeHostNavigationIntent(hostNavigationIntentRef.current, path);
		hostNavigationIntentRef.current = result.remainingIntent;
		return result.confirmed;
	}, []);
	const acceptGenieUserNavigation = (0, import_react$4.useCallback)((path) => {
		hostNavigationIntentRef.current = null;
		skipHostIntentForPathRef.current = normalizeGenieNavigationPath(path);
	}, []);
	const sendGenieNavigation = (0, import_react$4.useCallback)((path) => {
		registerHostNavigationIntent(path);
		webviewRef.current?.sendMessage("genie:navigate-to", { path });
	}, [registerHostNavigationIntent, webviewRef]);
	(0, import_react$4.useEffect)(() => {
		wasVisibleRef.current = visible;
	}, [visible]);
	(0, import_react$4.useEffect)(() => () => {
		hostNavigationIntentRef.current = null;
		skipHostIntentForPathRef.current = null;
	}, []);
	(0, import_react$4.useEffect)(() => {
		const consume = () => {
			const path = genieEmbedNavStore.getState().pendingPath;
			if (path) {
				registerHostNavigationIntent(path);
				setPendingGeniePath(path);
				genieEmbedNavStore.getState().setPendingPath(null);
			}
		};
		consume();
		const unsubscribe = genieEmbedNavStore.subscribe(consume);
		return () => {
			unsubscribe();
		};
	}, [registerHostNavigationIntent]);
	const genieSubPath = (0, import_react$4.useMemo)(() => {
		if (!visible) return "/";
		if (pendingGeniePath) return pendingGeniePath;
		if (location.pathname.includes("/genie")) return location.pathname.slice(location.pathname.indexOf("/genie") + 6) || "/";
		return "/";
	}, [
		visible,
		pendingGeniePath,
		location.pathname
	]);
	const lockedGenieSrcRef = (0, import_react$4.useRef)(void 0);
	const lockedGenieSubPathRef = (0, import_react$4.useRef)(null);
	const [genieSrcForceTick, setGenieSrcForceTick] = (0, import_react$4.useState)(0);
	const genieSrc = (0, import_react$4.useMemo)(() => {
		if (!visible) return lockedGenieSrcRef.current;
		if (lockedGenieSrcRef.current && lockedGenieSubPathRef.current) {
			const { isCrossProjectSwitch, isLeaveProjectToHome, isEnterProjectFromHome } = computeProjectSwitchReload(lockedGenieSubPathRef.current, genieSubPath);
			if (!isCrossProjectSwitch && !isLeaveProjectToHome && !isEnterProjectFromHome) return lockedGenieSrcRef.current;
			lockedGenieSrcRef.current = void 0;
			lockedGenieSubPathRef.current = null;
		}
		const base = resolveGenieUrl();
		const full = (base.endsWith("/") ? base : base + "/") + (genieSubPath === "/" || !genieSubPath.startsWith("/") ? "" : genieSubPath.slice(1));
		lockedGenieSrcRef.current = full;
		lockedGenieSubPathRef.current = genieSubPath;
		return full;
	}, [
		visible,
		genieSubPath,
		genieSrcForceTick
	]);
	const prevGenieSubPathRef = (0, import_react$4.useRef)(genieSubPath);
	(0, import_react$4.useEffect)(() => {
		if (!visible || !webviewRef.current) return;
		if (prevGenieSubPathRef.current === genieSubPath) return;
		const prevSub = prevGenieSubPathRef.current;
		prevGenieSubPathRef.current = genieSubPath;
		if (skipHostIntentForPathRef.current === normalizeGenieNavigationPath(genieSubPath)) {
			skipHostIntentForPathRef.current = null;
			return;
		}
		if (genieSubPath !== "/") sendGenieNavigation(genieSubPath);
		else registerHostNavigationIntent(genieSubPath);
		const { isCrossProjectSwitch, isLeaveProjectToHome, isEnterProjectFromHome } = computeProjectSwitchReload(prevSub, genieSubPath);
		if (isCrossProjectSwitch || isLeaveProjectToHome || isEnterProjectFromHome) {
			lockedGenieSrcRef.current = void 0;
			lockedGenieSubPathRef.current = null;
			setGenieSrcForceTick((t) => t + 1);
		}
	}, [
		visible,
		genieSubPath,
		registerHostNavigationIntent,
		sendGenieNavigation
	]);
	(0, import_react$4.useEffect)(() => {
		if (!pendingGeniePath) return;
		if (webviewRef.current) sendGenieNavigation(pendingGeniePath);
		const expectedPath = pendingGeniePath === "/" ? "/genie" : `/genie${pendingGeniePath}`;
		if (location.pathname === expectedPath) setPendingGeniePath(null);
	}, [
		pendingGeniePath,
		sendGenieNavigation,
		location.pathname
	]);
	return {
		pendingGeniePath,
		genieSrc,
		genieProjectId: (0, import_react$4.useMemo)(() => extractGenieProjectId(genieSubPath), [genieSubPath]),
		sendGenieNavigation,
		getHostNavigationIntent,
		confirmHostNavigationIntent,
		acceptGenieUserNavigation
	};
}
var import_react$4;
var init_use_genie_embed_nav = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_genie_embed_nav_store();
	init_genie_embed();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/use-genie-embed-nav-reverse.ts
/**
* 宿主已有导航意图时，只接受与其 pathname 相同的 iframe 回报；
* 没有意图时保留 iframe 自主导航。
*/
function shouldAcceptGenieUrlChange(hostNavigationIntent, geniePath) {
	return !hostNavigationIntent || normalizeGenieNavigationPath(hostNavigationIntent) === normalizeGenieNavigationPath(geniePath);
}
/** 普通任务切换尚未提交前，拒绝旧 Genie 数据写回宿主状态。 */
function shouldAcceptGenieReverseWrite(pendingTaskId) {
	return pendingTaskId === null;
}
/** 从 Genie 内部 path 中提取项目 ID（约定 projectId === conversationId） */
function extractProjectIdFromGeniePath(geniePath) {
	const m = geniePath.match(/^\/project\/([^/?#]+)/);
	return m ? m[1] : null;
}
function useGenieEmbedNavReverse({ visible, getHostNavigationIntent, confirmHostNavigationIntent, acceptGenieUserNavigation }) {
	const navigate = useNavigate();
	const location = useLocation();
	const conversationsContext = useConversations();
	const genieSpaceItems = useGenieSpaceItems();
	(0, import_react$3.useEffect)(() => {
		if (!visible) return;
		const pendingTaskId = genieEmbedNavStore.getState().pendingTaskId;
		if (!shouldAcceptGenieReverseWrite(pendingTaskId)) return;
		if (!location.pathname.includes("/genie")) return;
		const projectId = location.pathname.match(/\/genie\/project\/([^/?#]+)/)?.[1];
		if (!projectId) return;
		if (conversationsContext?.currentConversation?.id === projectId) return;
		const matched = conversationsContext?.conversations?.find((c) => c.id === projectId && c.conversationOrigin === "genie") ?? genieSpaceItems.find((c) => c.id === projectId);
		if (matched) {
			const matchedMessages = matched.messages ?? [];
			conversationsContext?.setCurrentConversation?.({
				...matched,
				messages: matchedMessages
			});
		}
	}, [
		visible,
		location.pathname,
		conversationsContext,
		genieSpaceItems
	]);
	return {
		handleGenieUrlChange: (0, import_react$3.useCallback)((geniePath) => {
			if (!geniePath || !visible) return;
			const pendingTaskId = genieEmbedNavStore.getState().pendingTaskId;
			if (!shouldAcceptGenieReverseWrite(pendingTaskId)) return;
			const hostNavigationIntent = getHostNavigationIntent();
			if (!shouldAcceptGenieUrlChange(hostNavigationIntent, geniePath)) return;
			if (hostNavigationIntent && !confirmHostNavigationIntent(geniePath)) return;
			if (!hostNavigationIntent) acceptGenieUserNavigation(geniePath);
			const projectId = extractProjectIdFromGeniePath(geniePath);
			if (projectId) {
				const matched = (conversationsContext?.conversations ?? []).find((c) => c.id === projectId && c.conversationOrigin === "genie") ?? genieSpaceItems.find((c) => c.id === projectId);
				if (matched && conversationsContext?.currentConversation?.id !== projectId) {
					const matchedMessages = matched.messages ?? [];
					conversationsContext?.setCurrentConversation?.({
						...matched,
						messages: matchedMessages
					});
				}
			} else if (conversationsContext?.currentConversation) conversationsContext?.setCurrentConversation?.(null);
			const expectedHostPath = `/genie${geniePath}`;
			if (!location.pathname.endsWith(expectedHostPath) && location.pathname !== expectedHostPath) navigate(expectedHostPath, { replace: true });
		}, [
			visible,
			conversationsContext,
			genieSpaceItems,
			location.pathname,
			navigate,
			getHostNavigationIntent,
			confirmHostNavigationIntent,
			acceptGenieUserNavigation
		]),
		handleRequestHostNavigate: (0, import_react$3.useCallback)((data) => {
			const route = data?.route;
			const params = data?.params;
			if (params?.action === "purchase") {
				openPurchaseModal({
					url: route ?? "/pricing?embed=1",
					source: "cloud_service"
				});
				return;
			}
			if (route === "genie-home") {
				navigate("/genie");
				conversationsContext?.setCurrentConversation?.(null);
				return;
			}
			if (route === "/new-task" || route === "/") {
				navigate("/");
				conversationsContext?.setCurrentConversation?.(null);
				if (params?.category === "code-development") conversationsContext?.setSelectedWelcomeMode?.("code");
			} else if (route) navigate(route);
		}, [navigate, conversationsContext])
	};
}
var import_react$3;
var init_use_genie_embed_nav_reverse = __esmMin((() => {
	init_common();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_conversations_context();
	init_genie_embed_nav_store();
	init_genie_space_store();
	init_purchase();
	init_use_genie_embed_nav();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/use-genie-initial-message-handoff.ts
/**
* 将宿主侧 projectHandoffStore 中的首条消息投递给 Genie iframe。
*
* projectHandoffStore 是 WorkBuddy 宿主内存，Genie 是独立 iframe 应用，无法直接读取。
* 创建 Genie 项目后，必须由宿主通过 `genie:set-initial-message` 跨 iframe 投递，
* 否则项目页拿不到首条消息，会停在空白会话（#3345）。
*/
function useGenieInitialMessageHandoff({ visible, genieProjectId, webviewRef }) {
	const deliveredInitialMsgRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Set());
	const deliveringInitialMsgRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Set());
	const retryTimersRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Map());
	const pruneDeliveredProjects = (0, import_react$2.useCallback)((projectId) => {
		deliveredInitialMsgRef.current.add(projectId);
		if (deliveredInitialMsgRef.current.size > 100) {
			const oldestProjectId = deliveredInitialMsgRef.current.values().next().value;
			if (oldestProjectId && oldestProjectId !== projectId) deliveredInitialMsgRef.current.delete(oldestProjectId);
		}
	}, []);
	const clearRetryTimers = (0, import_react$2.useCallback)((projectId) => {
		const timers = retryTimersRef.current.get(projectId);
		if (timers) {
			timers.forEach((timer) => window.clearTimeout(timer));
			retryTimersRef.current.delete(projectId);
		}
	}, []);
	const markDelivered = (0, import_react$2.useCallback)((projectId) => {
		pruneDeliveredProjects(projectId);
		deliveringInitialMsgRef.current.delete(projectId);
		clearRetryTimers(projectId);
		projectHandoffStore.getState().getAndClearInitialMessage(projectId);
	}, [clearRetryTimers, pruneDeliveredProjects]);
	const acknowledgeInitialMessage = (0, import_react$2.useCallback)((projectId) => {
		if (!projectId) return;
		markDelivered(projectId);
	}, [markDelivered]);
	const deliverInitialMessage = (0, import_react$2.useCallback)((projectId, options = {}) => {
		if (!projectId || deliveredInitialMsgRef.current.has(projectId)) return;
		const sendOnce = (fallbackBlocks) => {
			const blocks = projectHandoffStore.getState().initialMessages[projectId] ?? fallbackBlocks;
			const webview = webviewRef.current;
			if (!webview || !blocks || blocks.length === 0) return false;
			try {
				webview.sendMessage("genie:set-initial-message", {
					projectId,
					contentBlocks: blocks
				});
				return true;
			} catch {
				return false;
			}
		};
		const initialBlocks = projectHandoffStore.getState().initialMessages[projectId];
		if (!initialBlocks || initialBlocks.length === 0) return;
		if (options.immediate) {
			sendOnce(initialBlocks);
			return;
		}
		if (deliveringInitialMsgRef.current.has(projectId)) return;
		deliveringInitialMsgRef.current.add(projectId);
		const timers = [];
		const lastRetryDelay = INITIAL_MESSAGE_RETRY_DELAYS_MS[INITIAL_MESSAGE_RETRY_DELAYS_MS.length - 1];
		for (const delay of INITIAL_MESSAGE_RETRY_DELAYS_MS) {
			const timer = window.setTimeout(() => {
				if (deliveredInitialMsgRef.current.has(projectId)) return;
				sendOnce(initialBlocks);
				if (delay === lastRetryDelay) {
					deliveringInitialMsgRef.current.delete(projectId);
					clearRetryTimers(projectId);
				}
			}, delay);
			timers.push(timer);
		}
		retryTimersRef.current.set(projectId, timers);
	}, [clearRetryTimers, webviewRef]);
	(0, import_react$2.useEffect)(() => {
		if (visible && genieProjectId) deliverInitialMessage(genieProjectId);
	}, [
		visible,
		genieProjectId,
		deliverInitialMessage
	]);
	(0, import_react$2.useEffect)(() => () => {
		retryTimersRef.current.forEach((timers) => {
			timers.forEach((timer) => window.clearTimeout(timer));
		});
		retryTimersRef.current.clear();
	}, []);
	return {
		deliverInitialMessage,
		acknowledgeInitialMessage
	};
}
var import_react$2, INITIAL_MESSAGE_RETRY_DELAYS_MS;
var init_use_genie_initial_message_handoff = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_genie_project$1();
	INITIAL_MESSAGE_RETRY_DELAYS_MS = [
		0,
		300,
		1e3,
		2e3,
		4e3
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/PersistentGenieHost.tsx
function PersistentGenieHost({ visible, onToggleSidebar }) {
	const adapter = useAdapter();
	const { account } = useAccount();
	const conversationsContext = useConversations();
	const { theme: globalTheme } = useTheme();
	const { locale } = useI18n();
	const genieLocale = toZhEnLocale(locale) === "en" ? "en-US" : "zh-CN";
	const { enabled: genieFeatureEnabled, loading: genieFeatureLoading } = useGenieAgentEnabled();
	const shouldMount = genieFeatureEnabled && !genieFeatureLoading;
	const genieWebviewRef = (0, import_react$1.useRef)(null);
	const hostPlatform = (0, import_react$1.useMemo)(() => {
		try {
			const p = typeof import_dist.default !== "undefined" && import_dist.default?.platform;
			if (p === "darwin" || p === "win32" || p === "linux") return p;
		} catch {}
		if (typeof navigator !== "undefined") {
			const ua = navigator.userAgent || "";
			if (/Mac OS X|Macintosh/i.test(ua)) return "darwin";
			if (/Windows/i.test(ua)) return "win32";
			if (/Linux/i.test(ua)) return "linux";
		}
	}, []);
	const isDesktopHost = adapter?.environmentType === "local";
	const isHostMacFullscreen = useMacFullscreen(adapter);
	const genieAuthData = (0, import_react$1.useMemo)(() => {
		if (!account) return null;
		return {
			uid: account.uid,
			name: account.name || account.displayName || account.uid,
			type: account.type
		};
	}, [
		account?.uid,
		account?.name,
		account?.displayName,
		account?.type
	]);
	const [genieAuthWithToken, setGenieAuthWithToken] = (0, import_react$1.useState)(null);
	const [authRefreshKey, setAuthRefreshKey] = (0, import_react$1.useState)(0);
	(0, import_react$1.useEffect)(() => {
		if (!genieAuthData) {
			setGenieAuthWithToken(null);
			return;
		}
		let cancelled = false;
		(async () => {
			let token;
			let extraInfo = {};
			try {
				const buddyAPI = window.buddyAPI;
				if (typeof buddyAPI?.getToken === "function") {
					token = await buddyAPI.getToken();
					const buddyAccount = await buddyAPI.authGetAccount?.();
					if (buddyAccount) extraInfo = {
						email: buddyAccount.email || buddyAccount.mail,
						avatar: buddyAccount.avatar || buddyAccount.avatarUrl,
						name: buddyAccount.name || buddyAccount.displayName || buddyAccount.nickName
					};
				}
			} catch {}
			if (!token && typeof adapter?.getToken === "function") try {
				const t = await adapter.getToken();
				if (t) token = t;
			} catch (err) {
				console.warn("[PersistentGenieHost] adapter.getToken failed:", String(err));
			}
			if (!token && adapter) try {
				const acc = await adapter.getAccount();
				if (acc) {
					token = acc.token || acc.accessToken;
					extraInfo = {
						email: acc.email,
						avatar: acc.avatar || acc.avatarUrl
					};
				}
			} catch {}
			if (!token && !isWorkBuddyDesktop()) try {
				const res = await fetch("/console/as/genie/embed-token", {
					method: "GET",
					credentials: "include",
					headers: { Accept: "application/json" }
				});
				if (res.ok) {
					const body = await res.json();
					const data = body?.data ?? body;
					if (data?.token) {
						token = data.token;
						if (data.uid) extraInfo = {
							...extraInfo,
							uid: data.uid
						};
					}
				} else console.warn("[PersistentGenieHost] embed-token request failed:", res.status);
			} catch (err) {
				console.warn("[PersistentGenieHost] embed-token request error:", String(err));
			}
			if (!cancelled) setGenieAuthWithToken({
				...genieAuthData,
				...extraInfo,
				token
			});
		})();
		return () => {
			cancelled = true;
		};
	}, [
		genieAuthData,
		adapter,
		authRefreshKey
	]);
	const [needsGenieHostTopbar, setNeedsGenieHostTopbar] = (0, import_react$1.useState)(true);
	const { pendingGeniePath, genieSrc, genieProjectId, getHostNavigationIntent, confirmHostNavigationIntent, acceptGenieUserNavigation } = useGenieEmbedNav({
		visible,
		webviewRef: genieWebviewRef
	});
	const { deliverInitialMessage, acknowledgeInitialMessage } = useGenieInitialMessageHandoff({
		visible,
		genieProjectId,
		webviewRef: genieWebviewRef
	});
	const [hasEverEnteredGenie, setHasEverEnteredGenie] = (0, import_react$1.useState)(false);
	(0, import_react$1.useEffect)(() => {
		if (!hasEverEnteredGenie && visible) setHasEverEnteredGenie(true);
	}, [visible, hasEverEnteredGenie]);
	const genieReport = useGenieEmbedTelemetry();
	const { handleGenieUrlChange, handleRequestHostNavigate } = useGenieEmbedNavReverse({
		visible,
		getHostNavigationIntent,
		confirmHostNavigationIntent,
		acceptGenieUserNavigation
	});
	const handleGenieMessage = (0, import_react$1.useCallback)((message) => {
		switch (message.type) {
			case "genie:bridge-ready":
				deliverInitialMessage(genieProjectId, { immediate: true });
				break;
			case "genie:webview-ready":
				deliverInitialMessage(genieProjectId, { immediate: true });
				break;
			case "genie:initial-message-received": {
				const projectId = message.data?.projectId;
				acknowledgeInitialMessage(projectId);
				break;
			}
			case "genie:navigate":
				if (message.data?.url) adapter?.openExternal?.(message.data.url);
				break;
			case "genie:toggle-sidebar":
				onToggleSidebar?.();
				break;
			case "genie:request-auth":
				console.warn("[PersistentGenieHost] Embedded page requested auth refresh");
				setAuthRefreshKey((k) => k + 1);
				break;
			case "genie:auth-failed":
				console.warn("[PersistentGenieHost] Embedded page reported auth failure:", {
					reason: message.data?.reason,
					status: message.data?.status,
					url: message.data?.url
				});
				setAuthRefreshKey((k) => k + 1);
				break;
			case "genie:request-host-state":
				try {
					genieWebviewRef.current?.sendMessage("genie:set-host-state", {
						sidebarCollapsed: conversationsContext?.sidebarCollapsed ?? false,
						platform: hostPlatform,
						isDesktop: isDesktopHost,
						isFullscreen: isHostMacFullscreen
					});
				} catch (err) {
					console.warn("[PersistentGenieHost] reply host-state failed:", err);
				}
				break;
			case "genie:set-needs-host-topbar": {
				const needs = message.data?.needs;
				if (typeof needs === "boolean") setNeedsGenieHostTopbar(needs);
				break;
			}
			case "genie:url-change": {
				const geniePath = message.data?.path;
				handleGenieUrlChange(geniePath);
				break;
			}
			case "genie:request-host-navigate":
				handleRequestHostNavigate(message.data);
				break;
			case "genie:open-external": {
				const url = message.data?.url;
				if (typeof url === "string" && url) adapter?.openExternal?.(url)?.catch?.((err) => {
					console.warn("[PersistentGenieHost] openExternal failed:", err);
				});
				break;
			}
			case "genie:wx-share-request": {
				const wxShareHandler = window.__wxShareHandler;
				handleGenieWxShareRequest({
					message,
					wxShareHandler,
					sendResponse: (requestId, response) => {
						try {
							genieWebviewRef.current?.sendMessage("genie:wx-share-response", {
								requestId,
								data: response
							});
						} catch (err) {
							console.warn("[PersistentGenieHost] reply wx-share-response failed:", err);
						}
					},
					telemetry: {
						onStart: (info) => genieReport(GENIE_EMBED_EVENT.PAGE_BUTTON_CLICK, {
							button: GENIE_BUTTON.SHARE_CHANNEL_CLICK,
							stage: GENIE_SHARE_STAGE.START,
							shareInvocationId: info.shareInvocationId,
							channel: info.channel,
							shareAction: info.shareAction,
							linkType: info.linkType,
							scene: info.scene
						}),
						onResult: (info) => genieReport(GENIE_EMBED_EVENT.PAGE_BUTTON_CLICK, {
							button: GENIE_BUTTON.SHARE_RESULT,
							stage: GENIE_SHARE_STAGE.RESULT,
							shareInvocationId: info.shareInvocationId,
							channel: info.channel,
							shareAction: info.shareAction,
							linkType: info.linkType,
							scene: info.scene,
							result_flag: info.resultFlag,
							status: info.status
						})
					}
				});
				break;
			}
			case "genie:set-sidebar-collapsed": {
				const wantCollapsed = message.data?.collapsed;
				if (typeof wantCollapsed === "boolean") {
					if (wantCollapsed !== (conversationsContext?.sidebarCollapsed ?? false)) onToggleSidebar?.();
				}
				break;
			}
		}
	}, [
		adapter,
		onToggleSidebar,
		conversationsContext?.sidebarCollapsed,
		hostPlatform,
		isDesktopHost,
		isHostMacFullscreen,
		handleGenieUrlChange,
		handleRequestHostNavigate,
		acknowledgeInitialMessage,
		deliverInitialMessage,
		genieProjectId,
		genieReport
	]);
	const handleGenieReady = (0, import_react$1.useCallback)(() => {
		const sidebarCollapsed = conversationsContext?.sidebarCollapsed ?? false;
		genieWebviewRef.current?.sendMessage("genie:init", {
			theme: normalizeGenieTheme(globalTheme),
			locale: genieLocale
		});
		genieWebviewRef.current?.sendMessage("genie:set-host-state", {
			sidebarCollapsed,
			platform: hostPlatform,
			isDesktop: isDesktopHost,
			isFullscreen: isHostMacFullscreen
		});
		if (pendingGeniePath) genieWebviewRef.current?.sendMessage("genie:navigate-to", { path: pendingGeniePath });
		deliverInitialMessage(genieProjectId);
	}, [
		globalTheme,
		genieLocale,
		conversationsContext?.sidebarCollapsed,
		hostPlatform,
		isDesktopHost,
		isHostMacFullscreen,
		pendingGeniePath,
		genieProjectId,
		deliverInitialMessage
	]);
	const [forceRepaintForTheme, setForceRepaintForTheme] = (0, import_react$1.useState)(false);
	const prevThemeRef = (0, import_react$1.useRef)(globalTheme);
	(0, import_react$1.useEffect)(() => {
		const webview = genieWebviewRef.current;
		if (!webview) return;
		notifyGenieTheme(webview, globalTheme);
		if (prevThemeRef.current !== globalTheme && !visible) {
			setForceRepaintForTheme(true);
			const timer = window.setTimeout(() => setForceRepaintForTheme(false), 800);
			prevThemeRef.current = globalTheme;
			return () => window.clearTimeout(timer);
		}
		prevThemeRef.current = globalTheme;
	}, [globalTheme]);
	(0, import_react$1.useEffect)(() => {
		const webview = genieWebviewRef.current;
		if (!webview) return;
		try {
			webview.sendMessage("genie:set-locale", { locale: genieLocale });
		} catch (err) {
			console.warn("[PersistentGenieHost] Failed to sync locale:", err);
		}
	}, [genieLocale]);
	(0, import_react$1.useEffect)(() => {
		const webview = genieWebviewRef.current;
		if (!webview) return;
		try {
			webview.sendMessage("genie:set-host-state", {
				sidebarCollapsed: conversationsContext?.sidebarCollapsed ?? false,
				platform: hostPlatform,
				isDesktop: isDesktopHost,
				isFullscreen: isHostMacFullscreen
			});
		} catch (err) {
			console.warn("[PersistentGenieHost] Failed to sync host state:", err);
		}
	}, [
		conversationsContext?.sidebarCollapsed,
		hostPlatform,
		isDesktopHost,
		isHostMacFullscreen
	]);
	if (!shouldMount) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "main-content main-content--genie",
		style: isDesktopHost ? void 0 : visible ? void 0 : forceRepaintForTheme ? {
			position: "absolute",
			inset: 0,
			visibility: "hidden",
			pointerEvents: "none",
			opacity: 0,
			zIndex: -1
		} : { display: "none" },
		"aria-hidden": !visible,
		children: [visible && needsGenieHostTopbar && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GenieEmbedTopbarSlim, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "genie-main-page",
			children: (isDesktopHost ? hasEverEnteredGenie && visible : hasEverEnteredGenie) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GenieEmbed, {
				ref: genieWebviewRef,
				className: "genie-webview",
				src: genieSrc,
				authData: genieAuthWithToken,
				initialTheme: normalizeGenieTheme(globalTheme),
				initialLocale: genieLocale,
				onReady: handleGenieReady,
				onMessage: handleGenieMessage
			})
		})]
	});
}
var import_dist, import_react$1, import_jsx_runtime$1, GenieEmbedTopbarSlim;
var init_PersistentGenieHost = __esmMin((() => {
	import_dist = /* @__PURE__ */ __toESM(require_dist());
	init_persistent_genie_host();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_account_context();
	init_conversations_context();
	init_hooks();
	init_use_mac_fullscreen();
	init_i18n();
	init_useI18n();
	init_environment();
	init_useTheme();
	init_genie_embed();
	init_workbuddy_topbar();
	init_genie_wx_share_bridge();
	init_use_genie_embed_nav();
	init_use_genie_embed_nav_reverse();
	init_use_genie_initial_message_handoff();
	import_jsx_runtime$1 = require_jsx_runtime();
	GenieEmbedTopbarSlim = () => {
		const sidebarCollapsed = useConversations()?.sidebarCollapsed ?? false;
		const topbarRootClassName = useTopBarRootClassName();
		if (!(useWorkBuddyTopBarVisible() && sidebarCollapsed)) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: `${topbarRootClassName} workbuddy-topbar--genie-slim`,
			style: { flexShrink: 0 },
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "workbuddy-topbar-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/genie-project.tsx
function GenieProjectPage() {
	const active = useMainRouteActive();
	const conversationsContext = useConversations();
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		if (location.pathname.startsWith("/genie/project/")) conversationsContext?.setShowDetailPanel?.(false);
	}, [location.pathname, conversationsContext?.setShowDetailPanel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistentGenieHost, {
		visible: active,
		onToggleSidebar: conversationsContext?.onToggleSidebar
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_app_shell();
	init_PersistentGenieHost();
	init_contexts();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { GenieProjectPage };
