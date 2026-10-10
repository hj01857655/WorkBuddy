import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { G0 as createExtensionIframeHost, R0 as init_renderer } from "./ui-docs-viewer-Bo02yf1Q.js";
import { t as bootstrapIndependentWindow } from "./bootstrap-independent-window-C8q-1vR7.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import "./independent-window-qbsk1YYc.js";
//#region ../../packages/workbuddy-app/src/window-apps/extension-contribution/bootstrap.tsx
init_renderer();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var { Component: ExtensionIframeHost } = createExtensionIframeHost(import_react.default, { invoke: async (channel, context, ...args) => {
	const invoke = window.__wbInvoke;
	if (!invoke) throw new Error("独立窗口缺少 Desktop preload bridge");
	return invoke(channel, context, ...args);
} });
bootstrapIndependentWindow({
	appId: "extension-contribution",
	render: ({ initialPayload }) => {
		if (!initialPayload) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "窗口贡献参数不可用" });
		document.title = initialPayload.title;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: "100vw",
				height: "100vh"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtensionIframeHost, {
				extensionId: initialPayload.extensionId,
				extensionKind: initialPayload.extensionKind,
				url: initialPayload.entry,
				style: {
					width: "100%",
					height: "100%",
					border: 0
				}
			})
		});
	}
});
//#endregion
