import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { FQ as init_create_product_feature_hook, K2 as init_environment, PQ as createProductFeatureHook, e4 as isWorkBuddyDesktop } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { $ as netDriveServiceStore, Q as init_netdrive_service } from "./locale-utils-TanlkH9x.js";
import { i as init_store, s as myFilesStore } from "./store-B9VMId-K.js";
//#region ../../packages/agent-ui/src/hooks/use-tencent-netdrive-knowledge-feature.ts
/**
* 获取腾讯网盘知识库功能开关状态
*
* - WorkBuddy Desktop：以远端 TencentNetDriveKnowledge 配置为准（默认关闭）
* - Web 端：直接返回 true，由前端入口自身（如项目会话判定、知识库总开关）控制可见性
*
* @returns true 表示当前环境下网盘相关入口可见
*/
function useTencentNetDriveKnowledgeFeature() {
	const remoteEnabled = feature.useFeature() ?? false;
	if (!isWorkBuddyDesktop()) return true;
	return remoteEnabled;
}
var feature, resetTencentNetDriveKnowledgeFeatureCache;
var init_use_tencent_netdrive_knowledge_feature = __esmMin((() => {
	init_environment();
	init_create_product_feature_hook();
	feature = createProductFeatureHook({
		featureKey: "TencentNetDriveKnowledge",
		resolve: (features) => features.TencentNetDriveKnowledge === true,
		disableDelayMs: 2500
	});
	resetTencentNetDriveKnowledgeFeatureCache = feature.resetFeatureCache;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/netdrive-store-context.tsx
function getGlobalFallback() {
	if (!_globalFallback) _globalFallback = {
		netDriveStore: netDriveServiceStore,
		filesStore: myFilesStore
	};
	return _globalFallback;
}
/**
* 获取当前 context 中的 store 实例。
* 如果没有 Provider 包裹，返回全局默认实例。
*/
function useNetDriveContext() {
	const ctx = (0, import_react.useContext)(NetDriveStoreContext);
	if (ctx) return ctx;
	return getGlobalFallback();
}
var import_react, import_jsx_runtime, NetDriveStoreContext, _globalFallback, NetDriveStoreProvider;
var init_netdrive_store_context = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_netdrive_service();
	init_store();
	import_jsx_runtime = require_jsx_runtime();
	NetDriveStoreContext = (0, import_react.createContext)(null);
	_globalFallback = null;
	NetDriveStoreProvider = ({ value, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveStoreContext.Provider, {
		value,
		children
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/cloud-file-constants.ts
var init_cloud_file_constants = __esmMin((() => {}));
//#endregion
export { init_use_tencent_netdrive_knowledge_feature as a, useNetDriveContext as i, NetDriveStoreProvider as n, resetTencentNetDriveKnowledgeFeatureCache as o, init_netdrive_store_context as r, useTencentNetDriveKnowledgeFeature as s, init_cloud_file_constants as t };
