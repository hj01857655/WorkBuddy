import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { IC as useInspirationCommunityFlag, PC as init_hooks, nb as init_discover_panel, tb as DiscoverPanel, x3 as Navigate, y3 as init_dist } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/pages/discover.tsx
function DiscoverPage() {
	if (useInspirationCommunityFlag()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/extension/community",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverPanel, {});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_dist();
	init_discover_panel();
	init_hooks();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { DiscoverPage };
