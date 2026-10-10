import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $k as init_skills, Ay as init_expert, C6 as init__esm5, E6 as Subscription, JU as init_task_starter_input_store, KU as deepLinkSwitchModel$, UU as createExpertMode$, WU as createSkillMode$, YU as newSkillCreated$, ad as init_common, cW as normalizeExternalInputBlocks, d0 as useModuleHost, eA as buildCreateSkillModeBlocks, iW as publishInputDraftIntent, pb as buildCreateExpertModeBlocks, rW as init_input_draft_intents, sW as init_input_blocks, tA as buildNewSkillCreatedBlocks } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/input-intents/use-adapter-input-intent-bridge.ts
function mapInsertRequestToBlocks(request) {
	return normalizeExternalInputBlocks([...request.contentBlocks, ...request.promptText ? [{
		type: "text",
		text: request.promptText
	}] : []]);
}
function extractPlaybookMeta(request) {
	return request._meta?.playbookMeta;
}
/** 将 adapter.requestInsertContentBlocks 旧事件总线收口到通用 InputDraftIntent。 */
function useAdapterInputIntentBridge(adapter) {
	(0, import_react$1.useEffect)(() => adapter?.onInsertContentBlocksRequest?.((request) => {
		const blocks = mapInsertRequestToBlocks(request);
		const playbookMeta = extractPlaybookMeta(request);
		if (request.clearFirst) {
			publishInputDraftIntent({
				kind: "set-blocks",
				blocks,
				clearStoredDraft: true,
				playbookMeta
			});
			return;
		}
		publishInputDraftIntent({
			kind: "insert-blocks",
			blocks,
			playbookMeta
		});
	}), [adapter]);
}
var import_react$1;
var init_use_adapter_input_intent_bridge = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_input_blocks();
	init_input_draft_intents();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/input-intents/use-task-starter-input-intent-bridge.ts
function startTaskStarterInputIntentBridge() {
	if (bridgeSubscription) return;
	const subscription = new Subscription();
	subscription.add(createSkillMode$.subscribe((payload) => {
		if (!payload) return;
		createSkillMode$.next(null);
		publishInputDraftIntent({
			kind: "set-blocks",
			blocks: buildCreateSkillModeBlocks(payload)
		});
	}));
	subscription.add(createExpertMode$.subscribe((payload) => {
		if (!payload) return;
		createExpertMode$.next(null);
		publishInputDraftIntent({
			kind: "set-blocks",
			blocks: buildCreateExpertModeBlocks(payload)
		});
	}));
	subscription.add(newSkillCreated$.subscribe((payload) => {
		if (!payload) return;
		publishInputDraftIntent({
			kind: "set-blocks",
			blocks: buildNewSkillCreatedBlocks(payload)
		});
	}));
	subscription.add(deepLinkSwitchModel$.subscribe((modelId) => {
		if (!modelId) return;
		deepLinkSwitchModel$.next(null);
		publishInputDraftIntent({
			kind: "patch-config",
			modelId
		});
	}));
	bridgeSubscription = subscription;
}
function stopTaskStarterInputIntentBridge() {
	bridgeSubscription?.unsubscribe();
	bridgeSubscription = void 0;
}
/** 集中把旧 TaskStarter subject 桥接到通用 InputDraftIntent。 */
function useTaskStarterInputIntentBridge() {
	(0, import_react.useEffect)(() => {
		bridgeRefCount += 1;
		startTaskStarterInputIntentBridge();
		return () => {
			bridgeRefCount -= 1;
			if (bridgeRefCount <= 0) {
				bridgeRefCount = 0;
				stopTaskStarterInputIntentBridge();
			}
		};
	}, []);
}
var import_react, bridgeRefCount, bridgeSubscription;
var init_use_task_starter_input_intent_bridge = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init__esm5();
	init_expert();
	init_skills();
	init_input_draft_intents();
	init_task_starter_input_store();
	bridgeRefCount = 0;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/input-intents/services.tsx
function InputIntentsServices() {
	useAdapterInputIntentBridge(useModuleHost().adapter);
	useTaskStarterInputIntentBridge();
	return null;
}
//#endregion
__esmMin((() => {
	init_common();
	init_use_adapter_input_intent_bridge();
	init_use_task_starter_input_intent_bridge();
}))();
export { InputIntentsServices };
