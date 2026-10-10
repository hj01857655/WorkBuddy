import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { EZ as init_telemetry_helpers, I1 as t, c$ as init_store, j1 as init_i18n, kZ as reportTokenSchemaAuthResult, o$ as connectorStore } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { c as subscribeTokenConfigRequest } from "./locale-utils-TanlkH9x.js";
import { t as ConnectorTokenConfigModal } from "./connector-token-config-modal-B6jvBcOm.js";
//#region ../../packages/workbuddy-app/src/components/connector-token-config-modal/token-save-flow.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
init_src();
init_i18n();
init_store();
init_telemetry_helpers();
/**
* 执行"保存 Token 配置并连接"流程。
*
* 顺序：
* 1. updateEnv(configId, envPayload)
*    - 失败：立即返回 update-env 阶段错误，不再 connect
* 2. connect(configId)
*    - `success: true` → `{ ok: true }`（已连上）
*    - `connecting: true` → `{ ok: true, pending: true }`（连接中，**不是失败**）
*    - 其余 `success: false` → connect 阶段失败
*
* **「连接中」判成失败的后果**：用户填对 token 也会看到「Failed to connect」（`error`
* 本来就是 undefined，只能落到兜底文案），而 daemon 那边 probe 随后连上、卡片转绿 ——
* 弹框报错和绿点同时存在，用户无从判断到底连上没有（实测 enterprise_context7：
* Modal 报错、日志 `state=ready success=true`）。
*
* 连接中之所以敢关掉表单：token 连接器连接失败时 daemon 会发
* `WB_CONNECTOR_TOKEN_CONFIG_REQUIRED(reason='connect-failed')` 重新弹表单并清空
* password 占位，改 token 的入口不会丢。
*
* 约束：
* - 若 envPayload 为空对象（用户未改 password + 没有新字段输入），也仍然调用
*   updateEnv（后端会视为 noop 合并，等价不变更），再 connect。保证
*   "已有保存值 → 直接点保存重连"也能跑通。
*/
async function runTokenConnectorSaveFlow(deps, configId, envPayload) {
	let updateResult;
	try {
		updateResult = await deps.updateEnv(configId, envPayload);
	} catch (err) {
		return {
			ok: false,
			stage: "update-env",
			error: err instanceof Error ? err.message : String(err)
		};
	}
	if (!updateResult.success) return {
		ok: false,
		stage: "update-env",
		error: updateResult.error ?? "Failed to save configuration"
	};
	let connectResult;
	try {
		connectResult = await deps.connect(configId);
	} catch (err) {
		return {
			ok: false,
			stage: "connect",
			error: err instanceof Error ? err.message : String(err)
		};
	}
	if (connectResult.success) return { ok: true };
	if (connectResult.connecting) return {
		ok: true,
		pending: true
	};
	return {
		ok: false,
		stage: "connect",
		error: connectResult.error ?? "Failed to connect"
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/connector-token-config-gate/connector-token-config-gate.tsx
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_STATE = {
	visible: false,
	configId: "",
	connectorName: "",
	tokenConfig: null,
	initialValues: void 0,
	hasSecretFields: void 0,
	initialSubmitError: void 0,
	startTime: 0
};
function ConnectorTokenConfigGate({ adapter }) {
	const [state, setState] = (0, import_react.useState)(EMPTY_STATE);
	const openingRef = (0, import_react.useRef)(null);
	const telemetryAdapter = adapter;
	(0, import_react.useEffect)(() => {
		const unsubscribe = subscribeTokenConfigRequest(async ({ configId, reason, errorMessage }) => {
			if (openingRef.current === configId) {
				if (reason === "connect-failed" && errorMessage) setState((prev) => prev.visible && prev.configId === configId ? {
					...prev,
					initialSubmitError: errorMessage
				} : prev);
				return;
			}
			openingRef.current = configId;
			try {
				const config = (await adapter.getConnectorConfigs()).find((c) => c.id === configId);
				if (!config || !config.tokenConfig) {
					console.warn("[ConnectorTokenConfigGate] no tokenConfig for", configId);
					openingRef.current = null;
					return;
				}
				const hasSecretFields = reason === "connect-failed" ? void 0 : config.tokenSecretFields;
				setState({
					visible: true,
					configId,
					connectorName: config.name ?? configId,
					tokenConfig: config.tokenConfig,
					initialValues: config.tokenValues,
					hasSecretFields,
					initialSubmitError: reason === "connect-failed" ? errorMessage : void 0,
					startTime: Date.now()
				});
			} catch (err) {
				console.error("[ConnectorTokenConfigGate] load config failed:", err);
				openingRef.current = null;
			}
		});
		return () => {
			unsubscribe();
		};
	}, [adapter]);
	const handleCancel = async () => {
		const { configId, connectorName, startTime } = state;
		openingRef.current = null;
		setState(EMPTY_STATE);
		if (!configId) return;
		try {
			const result = await connectorStore.getState().cancelMcpConnector(configId);
			if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: connectorName }));
			else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
		} catch (error) {
			console.warn("[ConnectorTokenConfigGate] cancelMcpConnector failed:", error);
		}
		reportTokenSchemaAuthResult(telemetryAdapter, configId, {
			success: false,
			startTime,
			errorMessage: "user_cancelled"
		});
	};
	const handleSave = async (envPayload) => {
		const { configId, connectorName, startTime } = state;
		const result = await runTokenConnectorSaveFlow({
			updateEnv: (id, env) => adapter.updateConnectorEnv(id, env),
			connect: (id) => connectorStore.getState().connectConnector(id)
		}, configId, envPayload);
		if (result.ok) {
			openingRef.current = null;
			setState(EMPTY_STATE);
			if (!result.pending) toast.success(t("connectorPanel.connectSuccess", { name: connectorName }));
			if (!result.pending) reportTokenSchemaAuthResult(telemetryAdapter, configId, {
				success: true,
				startTime
			});
			return;
		}
		reportTokenSchemaAuthResult(telemetryAdapter, configId, {
			success: false,
			startTime,
			errorMessage: result.error
		});
		throw new Error(result.error);
	};
	if (!state.visible || !state.tokenConfig) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorTokenConfigModal, {
		visible: state.visible,
		configId: state.configId,
		tokenConfig: state.tokenConfig,
		initialValues: state.initialValues,
		hasSecretFields: state.hasSecretFields,
		initialSubmitError: state.initialSubmitError,
		onSave: handleSave,
		onCancel: handleCancel
	});
}
//#endregion
export { ConnectorTokenConfigGate };
