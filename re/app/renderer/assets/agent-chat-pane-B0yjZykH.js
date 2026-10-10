import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { AO as init_tab_registry, E1 as init_useI18n, O1 as useTranslation, Qw as init_colleague_navigation_bus, Yw as colleagueConversationPatches$, jO as resolveAssistantChatIds } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { b as init_colleagues_panel, h as init_colleague_chat_page, m as ColleagueChatPage } from "./colleagues-panel-CnECQHCz.js";
import { a as init_claw_agent_chat_topbar, i as ClawAgentChatTopbar, n as getEnterpriseWelcomeMessage, r as init_enterprise_annotations, t as getEnterpriseFollowUpQuestions } from "./claw-BDhV8Q05.js";
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/agent-chat-pane.less
var init_agent_chat_pane$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/assistant-duration-policy.ts
/** 云助理与普通助理隐藏不准确耗时；独立企业智能体保留现有耗时。 */
function shouldHideAssistantDuration(kind) {
	return kind !== "enterprise";
}
var init_assistant_duration_policy = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/agent-chat-pane.tsx
/** 按主对话同款规则计算内容最大宽度，避免宽屏下消息和输入框铺满整行。 */
function computeAgentChatMaxContentWidth(containerWidth) {
	if (containerWidth <= 1200) return DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH;
	if (containerWidth <= 1600) return containerWidth * .65;
	if (containerWidth <= 2e3) return containerWidth * .6;
	return Math.min(containerWidth * .55, 1400);
}
/** 云助理 / 普通助理 tab 的真实对话区，复用老同事对话页和产物预览能力。 */
function AgentChatPane({ agent, kind, isActive, specialists, avatar, avatarVariant, openTarget, onChatTargetReady, onSessionDeleted, showModelSelector }) {
	const t = useTranslation();
	const specialistDisplayMap = import_react.useMemo(() => buildAgentDisplayInfoMap(specialists), [specialists]);
	const resolveExpertName = import_react.useCallback((expertId) => specialistDisplayMap.get(expertId)?.name, [specialistDisplayMap]);
	const resolveExpertDisplayInfo = import_react.useCallback((expertId) => specialistDisplayMap.get(expertId), [specialistDisplayMap]);
	const paneRef = import_react.useRef(null);
	const chatPageRef = import_react.useRef(null);
	const initialTargetRef = import_react.useRef(isSameAgentTarget(agent, openTarget?.agentId) ? openTarget : void 0);
	const appliedTargetSeqRef = import_react.useRef(initialTargetRef.current?.seq);
	const appliedTargetIdentityRef = import_react.useRef(getSessionTargetIdentity(agent, initialTargetRef.current));
	const pendingTargetIdentityRef = import_react.useRef();
	const ignoredOpenTargetSeqRef = import_react.useRef();
	const resetTargetTracking = import_react.useCallback((ignoredOpenTargetSeq) => {
		appliedTargetSeqRef.current = void 0;
		appliedTargetIdentityRef.current = void 0;
		pendingTargetIdentityRef.current = void 0;
		ignoredOpenTargetSeqRef.current = ignoredOpenTargetSeq;
	}, []);
	const initialChatIds = initialTargetRef.current ? resolveAssistantChatIds(initialTargetRef.current) : void 0;
	const [chatInstanceId, setChatInstanceId] = import_react.useState(initialChatIds?.instanceId ?? null);
	const [chatRuntimeId, setChatRuntimeId] = import_react.useState(initialTargetRef.current?.runtimeId ?? null);
	const [chatSessionId, setChatSessionId] = import_react.useState(initialChatIds?.sessionId ?? null);
	const [chatSessionStatus, setChatSessionStatus] = import_react.useState(initialTargetRef.current?.sessionStatus ?? null);
	const isEnterprise = kind === "enterprise";
	const name = getAgentName(agent);
	const title = getAgentTitle(agent);
	const welcomeMessage = isEnterprise ? getEnterpriseWelcomeMessage(agent) : void 0;
	const followUpQuestions = isEnterprise ? getEnterpriseFollowUpQuestions(agent) : void 0;
	const description = getAgentDescription(agent);
	const tags = getAgentTags(agent);
	const isCloudAssistant = kind === "cloud";
	const [contentMaxWidth, setContentMaxWidth] = import_react.useState(DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH);
	const [creatingConversation, setCreatingConversation] = import_react.useState(false);
	import_react.useEffect(() => {
		const el = paneRef.current;
		if (!el || typeof ResizeObserver === "undefined") return;
		const updateContentMaxWidth = (width) => {
			const nextWidth = computeAgentChatMaxContentWidth(width);
			setContentMaxWidth((prev) => Math.abs(prev - nextWidth) < 1 ? prev : nextWidth);
		};
		updateContentMaxWidth(el.getBoundingClientRect().width);
		const observer = new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect.width;
			if (typeof width === "number") updateContentMaxWidth(width);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const paneStyle = import_react.useMemo(() => ({ "--claw-agent-chat-content-max-width": `${contentMaxWidth}px` }), [contentMaxWidth]);
	const hasPendingOpenTarget = Boolean(openTarget && isSameAgentTarget(agent, openTarget.agentId) && appliedTargetSeqRef.current !== openTarget.seq && ignoredOpenTargetSeqRef.current !== openTarget.seq);
	const pendingChatIds = hasPendingOpenTarget && openTarget ? resolveAssistantChatIds(openTarget) : void 0;
	const renderedInstanceId = hasPendingOpenTarget ? pendingChatIds?.instanceId ?? null : chatInstanceId;
	const renderedRuntimeId = hasPendingOpenTarget ? openTarget?.runtimeId ?? null : chatRuntimeId;
	const renderedSessionId = hasPendingOpenTarget ? pendingChatIds?.sessionId ?? null : chatSessionId;
	const renderedSessionStatus = hasPendingOpenTarget ? openTarget?.sessionStatus ?? null : chatSessionStatus;
	import_react.useEffect(() => {
		const targetIdentity = getSessionTargetIdentity(agent, openTarget);
		if (!openTarget || !isSameAgentTarget(agent, openTarget.agentId) || appliedTargetSeqRef.current === openTarget.seq || ignoredOpenTargetSeqRef.current === openTarget.seq || targetIdentity !== void 0 && targetIdentity === appliedTargetIdentityRef.current || targetIdentity !== void 0 && targetIdentity === pendingTargetIdentityRef.current) return;
		const targetSeq = openTarget.seq;
		pendingTargetIdentityRef.current = targetIdentity;
		const chatIds = resolveAssistantChatIds(openTarget);
		setChatInstanceId(chatIds?.instanceId ?? null);
		setChatRuntimeId(openTarget.runtimeId ?? null);
		setChatSessionId(chatIds?.sessionId ?? null);
		setChatSessionStatus(openTarget.sessionStatus ?? null);
		const restartTarget = chatIds ? {
			agentId: agent.id,
			instanceId: chatIds.instanceId,
			runtimeId: openTarget.runtimeId ?? null,
			sessionId: chatIds.sessionId,
			sessionStatus: openTarget.sessionStatus ?? null
		} : {
			agentId: agent.id,
			target: "new",
			...openTarget.exclusive === true ? { exclusive: true } : {}
		};
		const restartPromise = chatPageRef.current?.restart(restartTarget);
		if (!restartPromise) {
			if (pendingTargetIdentityRef.current === targetIdentity) pendingTargetIdentityRef.current = void 0;
			return;
		}
		restartPromise.then(() => {
			if (pendingTargetIdentityRef.current !== targetIdentity) return;
			appliedTargetSeqRef.current = targetSeq;
			appliedTargetIdentityRef.current = targetIdentity;
			pendingTargetIdentityRef.current = void 0;
		}).catch((error) => {
			if (pendingTargetIdentityRef.current === targetIdentity) pendingTargetIdentityRef.current = void 0;
			console.warn("[AgentChatPane] restart from open target failed", error);
		});
	}, [agent, openTarget]);
	const handleCreateConversation = import_react.useCallback(() => {
		if (creatingConversation) return;
		setCreatingConversation(true);
		resetTargetTracking(openTarget?.seq);
		setChatInstanceId(null);
		setChatRuntimeId(null);
		setChatSessionId(null);
		setChatSessionStatus(null);
		const restartPromise = chatPageRef.current?.restart({
			agentId: agent.id,
			target: "new",
			exclusive: true
		});
		if (!restartPromise) {
			setCreatingConversation(false);
			return;
		}
		restartPromise.catch((error) => {
			console.warn("[AgentChatPane] create conversation failed", error);
		}).finally(() => {
			setCreatingConversation(false);
		});
	}, [
		agent.id,
		creatingConversation,
		openTarget?.seq,
		resetTargetTracking
	]);
	import_react.useEffect(() => {
		const sub = colleagueConversationPatches$.subscribe((patch) => {
			if (patch.type !== "remove-session") return;
			if (!chatSessionId || patch.sessionId !== chatSessionId) return;
			resetTargetTracking();
			setChatInstanceId(null);
			setChatRuntimeId(null);
			setChatSessionId(null);
			setChatSessionStatus(null);
			chatPageRef.current?.clear().catch((error) => {
				console.warn("[AgentChatPane] clear after session deleted failed", error);
			});
			onSessionDeleted?.({
				agentId: agent.id,
				instanceId: chatInstanceId ?? void 0,
				sessionId: patch.sessionId
			});
		});
		return () => sub.unsubscribe();
	}, [
		agent.id,
		chatInstanceId,
		chatSessionId,
		onSessionDeleted,
		resetTargetTracking
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: paneRef,
		className: "claw-agent-chat-pane",
		style: paneStyle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueChatPage, {
			ref: chatPageRef,
			agentId: agent.id,
			model: agent.model || DEFAULT_CLOUD_AGENT_MODEL,
			name,
			title,
			description,
			tags,
			avatar: avatar ?? agent.avatar,
			avatarLabel: name.slice(0, 1),
			avatarVariant,
			initialInstanceId: renderedInstanceId ?? void 0,
			initialRuntimeId: renderedRuntimeId,
			initialSessionId: renderedSessionId ?? void 0,
			initialSessionStatus: renderedSessionStatus,
			initialExclusive: initialTargetRef.current?.exclusive === true,
			enableColleagueMention: isCloudAssistant,
			isCloudAssistant,
			hideTurnFoldDuration: shouldHideAssistantDuration(kind),
			colleagueSuggestionAgents: isCloudAssistant ? specialists : void 0,
			resolveExpertName,
			resolveExpertDisplayInfo,
			showPreparingOverlayOnFirstSend: true,
			isEnterprise,
			agentRole: isCloudAssistant ? "orchestrator" : "specialist",
			welcomeMessage,
			followUpQuestions,
			showModelSelector,
			onInstanceReady: ({ instanceId, runtimeId, sessionId, exclusive }) => {
				setChatInstanceId(instanceId);
				setChatRuntimeId(runtimeId ?? null);
				if (sessionId) {
					setChatSessionId(sessionId);
					if (exclusive === true) colleagueConversationPatches$.next({
						type: "append-session",
						instanceId,
						agentId: agent.id,
						session: {
							sessionId,
							sessionStatus: "ACTIVE"
						},
						pendingUntil: Date.now() + 8e3
					});
				}
				onChatTargetReady?.({
					agentId: agent.id,
					instanceId,
					runtimeId: runtimeId ?? null,
					sessionId,
					sessionStatus: chatSessionStatus
				});
			},
			onBack: () => {},
			variant: "floating",
			artifactPanelMode: "app-global",
			appDetailPanelActive: isActive,
			renderTopbar: ({ showDetailPanel, toggleDetailPanel }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawAgentChatTopbar, {
				showDetailPanel,
				onToggleDetailPanel: toggleDetailPanel,
				onCreateConversation: handleCreateConversation,
				creatingConversation
			}),
			placeholder: t("colleagues.chat.placeholder", { name })
		})
	});
}
function getSessionTargetIdentity(agent, target) {
	const chatIds = target ? resolveAssistantChatIds(target) : void 0;
	if (!chatIds) return;
	return `${agent.id}:${chatIds.instanceId}:${target?.runtimeId ?? ""}:${chatIds.sessionId}`;
}
function isSameAgentTarget(agent, targetAgentId) {
	if (!targetAgentId) return false;
	return targetAgentId === agent.id || targetAgentId === agent.agentId;
}
function asRecord(value) {
	return value && typeof value === "object" ? value : {};
}
function firstNonEmptyString(...values) {
	for (const value of values) if (typeof value === "string" && value.trim()) return value.trim();
}
function getAgentNickname(agent) {
	const raw = agent;
	return firstNonEmptyString(raw.nickname, raw.nickName, raw.displayName, agent.agentName);
}
function buildAgentDisplayInfoMap(agents) {
	const map = /* @__PURE__ */ new Map();
	for (const agent of agents ?? []) {
		const info = {
			name: getAgentNickname(agent),
			avatarUrl: agent.avatar || void 0
		};
		for (const id of [agent.id, agent.agentId]) if (id) map.set(id, info);
	}
	return map;
}
function getAgentManifest(agent) {
	return agent.currentVersion?.manifest;
}
function getAgentName(agent) {
	return getAgentNickname(agent) || agent.agentId || `Agent ${agent.id}`;
}
function getAgentTitle(agent) {
	const title = asRecord(asRecord(getAgentManifest(agent)).annotations)[COLLEAGUE_TITLE_ANNOTATION_KEY];
	return typeof title === "string" && title.trim() ? title.trim() : "\xA0";
}
function getAgentDescription(agent) {
	const manifestDescription = asRecord(getAgentManifest(agent)).description;
	return agent.description || (typeof manifestDescription === "string" ? manifestDescription : "");
}
function getAgentTags(agent) {
	const tags = [agent.model, agent.currentVersionNumber].filter((tag) => Boolean(tag));
	return tags.length > 0 ? tags : ["Cloud Agent"];
}
var import_react, import_jsx_runtime, DEFAULT_CLOUD_AGENT_MODEL, COLLEAGUE_TITLE_ANNOTATION_KEY, DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH;
//#endregion
__esmMin((() => {
	init_colleagues_panel();
	init_agent_chat_pane$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_colleague_chat_page();
	init_colleague_navigation_bus();
	init_assistant_duration_policy();
	init_claw_agent_chat_topbar();
	init_enterprise_annotations();
	init_tab_registry();
	import_jsx_runtime = require_jsx_runtime();
	DEFAULT_CLOUD_AGENT_MODEL = "claude-4";
	COLLEAGUE_TITLE_ANNOTATION_KEY = "agent-title";
	DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH = 832;
}))();
export { AgentChatPane };
