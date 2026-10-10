import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Gs as subscribeWechatChatHistoryChipUpdateEvents, Ls as getWechatChatHistoryChipUpdate, RU as init_input_intents, Rs as init_wechat_chat_history_chip_store, Ws as subscribeWechatChatHistoryChipEvents, ct as buildWechatChatHistoryPhrase, iW as publishInputDraftIntent, lt as init_wechat_chat_history_phrase, zs as mergeWechatChatHistoryChipUpdate } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/agent-ui/src/modules/wechat-chat-history/input-intents/wechat-chat-history-input-intent-bridge.ts
function decodeConversationId(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return;
	}
}
/** 只识别新输入引擎的两个宿主；`/task/*` 等 MCC 路由继续交给原链路。 */
function resolveWechatChatHistoryInputTarget(pathname) {
	const normalizedPath = pathname.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
	if (normalizedPath === "/" || normalizedPath === "/home") return { type: "home" };
	const conversationMatch = normalizedPath.match(/^\/conversation\/([^/]+)$/);
	const conversationId = conversationMatch?.[1] ? decodeConversationId(conversationMatch[1]) : void 0;
	return conversationId ? {
		type: "conversation",
		conversationId
	} : void 0;
}
/**
* 把 Desktop 微信聊天记录事件转换成输入协议。
*
* 首次插入时固化目标，后续异步解析更新继续发给同一个输入宿主，避免切页后误更新。
*/
function startWechatChatHistoryInputBridge(getCurrentPath, dependencies = defaultDependencies) {
	const eventByChipId = /* @__PURE__ */ new Map();
	const targetByChipId = /* @__PURE__ */ new Map();
	const unsubscribeAppend = dependencies.subscribeAppend((event) => {
		const target = resolveWechatChatHistoryInputTarget(getCurrentPath());
		if (!target) return false;
		const mergedEvent = mergeWechatChatHistoryChipUpdate(event, dependencies.getUpdate(event.chipId));
		eventByChipId.set(event.chipId, mergedEvent);
		targetByChipId.set(event.chipId, target);
		dependencies.publish({
			kind: "insert-blocks",
			target,
			blocks: [buildWechatChatHistoryPhrase(mergedEvent)],
			position: "end",
			focus: true
		});
		return true;
	});
	const unsubscribeUpdate = dependencies.subscribeUpdate((update) => {
		const previousEvent = eventByChipId.get(update.chipId);
		const target = targetByChipId.get(update.chipId);
		if (!previousEvent || !target) return resolveWechatChatHistoryInputTarget(getCurrentPath()) !== void 0;
		const nextEvent = mergeWechatChatHistoryChipUpdate(previousEvent, update);
		eventByChipId.set(update.chipId, nextEvent);
		dependencies.publish({
			kind: "replace-block",
			target,
			uri: `${WECHAT_CHAT_HISTORY_URI_PREFIX}${update.chipId}`,
			block: buildWechatChatHistoryPhrase(nextEvent),
			focus: false
		});
		return true;
	});
	return () => {
		unsubscribeAppend();
		unsubscribeUpdate();
	};
}
var WECHAT_CHAT_HISTORY_URI_PREFIX, defaultDependencies;
var init_wechat_chat_history_input_intent_bridge = __esmMin((() => {
	init_wechat_chat_history_chip_store();
	init_input_intents();
	init_wechat_chat_history_phrase();
	WECHAT_CHAT_HISTORY_URI_PREFIX = "wechat-chat-history://";
	defaultDependencies = {
		publish: publishInputDraftIntent,
		getUpdate: getWechatChatHistoryChipUpdate,
		subscribeAppend: subscribeWechatChatHistoryChipEvents,
		subscribeUpdate: subscribeWechatChatHistoryChipUpdateEvents
	};
}));
//#endregion
export { resolveWechatChatHistoryInputTarget as n, startWechatChatHistoryInputBridge as r, init_wechat_chat_history_input_intent_bridge as t };
