import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as ConnectorTokenConfigModal } from "./connector-token-config-modal-B6jvBcOm.js";
import { m as setMcpTokenConfigHandler } from "./workbuddy-provider-BD7no46c.js";
//#region ../../packages/workbuddy-app/src/components/mcp-token-config-host/mcp-token-config-host.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_STATE = {
	visible: false,
	name: "",
	tokenConfig: null
};
function McpTokenConfigHost() {
	const [state, setState] = (0, import_react.useState)(EMPTY_STATE);
	const resolverRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setMcpTokenConfigHandler((request, resolve) => {
			resolverRef.current = resolve;
			setState({
				visible: true,
				name: request.name,
				tokenConfig: request.tokenConfig
			});
		});
		return () => {
			setMcpTokenConfigHandler(null);
		};
	}, []);
	const settle = (values) => {
		const resolve = resolverRef.current;
		resolverRef.current = null;
		setState(EMPTY_STATE);
		resolve?.(values);
	};
	if (!state.visible || !state.tokenConfig) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorTokenConfigModal, {
		visible: state.visible,
		configId: `custom-mcp:${state.name}`,
		tokenConfig: state.tokenConfig,
		onSave: (values) => {
			settle(values);
		},
		onCancel: () => {
			settle(null);
		}
	});
}
//#endregion
export { McpTokenConfigHost };
