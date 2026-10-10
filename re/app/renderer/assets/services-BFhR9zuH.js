import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { BM as useTencentLexiangEnabled, E1 as init_useI18n, EB as lexiangAuthStore, Fd as init_use_lexiang_library_mode, I$ as init_connector_navigate, Id as useLexiangLibraryMode, L$ as registerConnectorNavigateHandler, O1 as useTranslation, TB as init_lexiang_auth_store, XB as init_lexiang_auth_constants, cG as useOneidConnectorGate, d0 as useModuleHost, g$ as LEXIANG_MCP_CONNECTOR_ID, l0 as init_module_host_context, sG as init_use_oneid_connector_gate, zM as init_use_tencent_lexiang_enabled } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/lexiang/services.tsx
function LexiangServices() {
	const host = useModuleHost();
	const t = useTranslation();
	const lexiangOneidGate = useOneidConnectorGate("lexiang");
	const { enabled: lexiangEnabled } = useTencentLexiangEnabled();
	const lexiangLibraryMode = useLexiangLibraryMode();
	const isLocalMode = host.environmentType === "local";
	const shouldUseLexiangKnowledgeBase = lexiangEnabled && lexiangLibraryMode === "native";
	const navigation = host.navigation;
	(0, import_react.useEffect)(() => registerConnectorNavigateHandler({
		connectorId: LEXIANG_MCP_CONNECTOR_ID,
		moduleId: "lexiang",
		allowAutoConnect: true,
		resolve: (request) => {
			if (!request.needsAuth) return "unhandled";
			if (lexiangOneidGate.enterpriseGate) {
				if (lexiangOneidGate.status === "checking") return {
					status: "blocked",
					run: () => toast({
						message: t("libraryOnboarding.checking"),
						type: "plain"
					})
				};
				if (lexiangOneidGate.status === "disabled") return {
					status: "handled",
					run: () => {
						request.onBeforeNavigate?.();
						navigation.navigate("/library/lexiang");
					}
				};
				return "unhandled";
			}
			if (!request.needsAuth || !isLocalMode || !shouldUseLexiangKnowledgeBase) return "unhandled";
			if (lexiangAuthStore.getState().authStatus === "connected") return "unhandled";
			return {
				status: "handled",
				run: () => {
					request.onBeforeNavigate?.();
					navigation.navigate("/library/lexiang");
				}
			};
		}
	}), [
		isLocalMode,
		lexiangOneidGate.enterpriseGate,
		lexiangOneidGate.status,
		navigation,
		shouldUseLexiangKnowledgeBase,
		t
	]);
	return null;
}
var import_react;
//#endregion
__esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_lexiang_auth_constants();
	init_lexiang_auth_store();
	init_use_lexiang_library_mode();
	init_use_oneid_connector_gate();
	init_use_tencent_lexiang_enabled();
	init_useI18n();
	init_module_host_context();
	init_connector_navigate();
}))();
export { LexiangServices };
