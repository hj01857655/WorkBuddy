import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { XM as useMainRouteActive, bQ as init_use_ima_enabled, iC as ImaLibraryView, tC as init_ima$1, xQ as useImaEnabled } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as init_app_shell } from "./app-shell-DgGkIrlT.js";
//#region ../../packages/agent-ui/src/pages/ima.tsx
function ImaPage() {
	const { libraryEnabled: imaEnabled } = useImaEnabled();
	const active = useMainRouteActive();
	if (!imaEnabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaLibraryView, { visible: active });
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_app_shell();
	init_ima$1();
	init_use_ima_enabled();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ImaPage };
