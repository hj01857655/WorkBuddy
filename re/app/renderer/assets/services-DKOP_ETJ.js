import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, I$ as init_connector_navigate, L$ as registerConnectorNavigateHandler, M3 as useOptionalImaApiBridge, O1 as useTranslation, TZ as init_connector, _$ as init_library_connector_id, bQ as init_use_ima_enabled, cG as useOneidConnectorGate, cK as imaAuthStore, d0 as useModuleHost, h$ as IMA_MCP_CONNECTOR_ID, j3 as init_ima_api_context, l0 as init_module_host_context, lK as init_ima_auth_store, m$ as IMA_B_END_CONNECTOR_ID, n$ as IMA_AUTO_CONNECT_TOAST_KEY, o$ as connectorStore, qG as ImaConnectorAuthModal, sG as init_use_oneid_connector_gate, tC as init_ima, uK as selectPersonalAuthed, xQ as useImaEnabled } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/ima/services.tsx
/**
* IMA 启动时授权状态同步服务。
*
* 挂载后立即将 adapter + bridge 注入 imaAuthStore 并触发 checkAuthStatus，
* 确保 ima-mcp connector 的 everConnected/headers 在应用启动时就被正确设置。
*
* 防重入：init() 内部在 adapter/bridge 变化且 authStatus==='not_connected' 时
* 已自行调用 checkAuthStatus；这里仅在 init 未自行触发时补调一次，避免并发双重调用。
*/
function ImaServices() {
	const host = useModuleHost();
	const t = useTranslation();
	const bridge = useOptionalImaApiBridge();
	const { connectorEnabled, isPersonalUser } = useImaEnabled();
	const imaOneidGate = useOneidConnectorGate("ima");
	const enterpriseGate = imaOneidGate.enterpriseGate && !isPersonalUser;
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const isLocalMode = host.environmentType === "local";
	const navigation = host.navigation;
	(0, import_react.useEffect)(() => {
		if (!bridge) return;
		const connectorId = enterpriseGate && imaOneidGate.status === "enabled" ? IMA_B_END_CONNECTOR_ID : IMA_MCP_CONNECTOR_ID;
		const statusBeforeInit = imaAuthStore.getState().authStatus;
		imaAuthStore.getState().init(host.adapter, bridge, connectorId);
		if (statusBeforeInit !== "not_connected") imaAuthStore.getState().checkAuthStatus().catch(() => {});
		if (connectorId !== "ima-mcp") imaAuthStore.getState().checkAuthStatus({ personalScope: true }).catch(() => {});
	}, [
		host.adapter,
		bridge,
		enterpriseGate,
		imaOneidGate.status
	]);
	(0, import_react.useEffect)(() => registerConnectorNavigateHandler({
		connectorId: IMA_MCP_CONNECTOR_ID,
		moduleId: "ima",
		allowAutoConnect: true,
		resolve: (request) => {
			if (!request.needsAuth || !isLocalMode || !connectorEnabled) return "unhandled";
			if (selectPersonalAuthed(imaAuthStore.getState())) return "unhandled";
			if (enterpriseGate) return {
				status: "handled",
				run: () => {
					request.onBeforeNavigate?.();
					setAuthModalOpen(true);
				}
			};
			return {
				status: "handled",
				run: () => {
					request.onBeforeNavigate?.();
					navigation.navigate("/library/ima");
				}
			};
		}
	}), [
		connectorEnabled,
		enterpriseGate,
		isLocalMode,
		navigation
	]);
	(0, import_react.useEffect)(() => registerConnectorNavigateHandler({
		connectorId: IMA_B_END_CONNECTOR_ID,
		moduleId: "ima",
		allowAutoConnect: true,
		resolve: (request) => {
			if (!enterpriseGate) return "unhandled";
			if (imaOneidGate.status === "checking") return {
				status: "blocked",
				run: () => toast({
					message: t("libraryOnboarding.checking"),
					type: "plain"
				})
			};
			if (imaOneidGate.status === "disabled") return {
				status: "handled",
				run: () => {
					request.onBeforeNavigate?.();
					imaOneidGate.openOnboarding();
				}
			};
			return "unhandled";
		}
	}), [
		imaOneidGate,
		enterpriseGate,
		t
	]);
	if (!authModalOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaConnectorAuthModal, {
		open: authModalOpen,
		onClose: () => setAuthModalOpen(false),
		onAuthed: () => {
			(async () => {
				await imaAuthStore.getState().checkAuthStatus({
					silent: false,
					force: true,
					personalScope: true
				});
				await connectorStore.getState().autoEnableMcpConnectorToggle(IMA_MCP_CONNECTOR_ID, IMA_AUTO_CONNECT_TOAST_KEY);
			})().catch((error) => {
				console.warn("[ImaServices] connector auth follow-up failed:", error);
			});
		}
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_ima();
	init_ima_api_context();
	init_ima_auth_store();
	init_use_ima_enabled();
	init_use_oneid_connector_gate();
	init_useI18n();
	init_module_host_context();
	init_connector();
	init_connector_navigate();
	init_library_connector_id();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ImaServices };
