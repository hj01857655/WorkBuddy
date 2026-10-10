import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { KX as useConversationEngineFeature, ad as init_common, d0 as useModuleHost, it as wechatChatHistoryPhraseRenderer, jY as init_product_features, rt as init_wechat_chat_history_phrase_renderer } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
import { r as startWechatChatHistoryInputBridge, t as init_wechat_chat_history_input_intent_bridge } from "./wechat-chat-history-input-intent-bridge-Dr4s6Mz4.js";
//#region ../../packages/agent-ui/src/modules/wechat-chat-history/services.tsx
function WechatChatHistoryServices() {
	const host = useModuleHost();
	const conversationEngineEnabled = useConversationEngineFeature();
	const inputPhraseRenderers = host.wb.conversations.extensions.inputPhraseRenderers;
	(0, import_react.useEffect)(() => inputPhraseRenderers.register({
		id: "wechat-chat-history",
		order: 200,
		render: wechatChatHistoryPhraseRenderer
	}), [inputPhraseRenderers]);
	(0, import_react.useEffect)(() => {
		if (conversationEngineEnabled === false) return;
		return startWechatChatHistoryInputBridge(() => host.navigation.currentPath);
	}, [conversationEngineEnabled, host.navigation]);
	return null;
}
var import_react;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_product_features();
	init_common();
	init_wechat_chat_history_phrase_renderer();
	init_wechat_chat_history_input_intent_bridge();
}))();
export { WechatChatHistoryServices };
