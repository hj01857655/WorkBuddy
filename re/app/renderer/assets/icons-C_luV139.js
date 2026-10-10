import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { cI as init_path_display, dI as isHostWindows, uI as isHostMac } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/icons.tsx
function getVisibleRuntimeTools() {
	return isHostWindows() ? RUNTIME_TOOLS.filter((tool) => tool.id !== "shell") : RUNTIME_TOOLS.filter((tool) => tool.id !== "gitbash" && (isHostMac() || tool.id !== "shell"));
}
var import_jsx_runtime, NodeJsIcon, PythonIcon, GitBashIcon, ShellIcon, RUNTIME_TOOLS;
var init_icons = __esmMin((() => {
	require_react();
	init_path_display();
	import_jsx_runtime = require_jsx_runtime();
	NodeJsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 2L3 7v10l9 5 9-5V7l-9-5z",
			fill: "#689F63"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "12",
			y: "15",
			textAnchor: "middle",
			fill: "white",
			fontSize: "8",
			fontWeight: "bold",
			children: "JS"
		})]
	});
	PythonIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 2C8 2 8.5 3.5 8.5 3.5V6H12v1H5.5S3 6.5 3 12s2 5.5 2 5.5h1.5v-2.5s-.2-2.5 2.5-2.5h4s2.5 0 2.5-2.5V5.5S16 2 12 2z",
			fill: "#3776AB"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 22c4 0 3.5-1.5 3.5-1.5V18H12v-1h6.5S21 17.5 21 12s-2-5.5-2-5.5h-1.5v2.5s.2 2.5-2.5 2.5h-4S8.5 11.5 8.5 14v4.5S8 22 12 22z",
			fill: "#FFD43B"
		})]
	});
	GitBashIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 2L2 12l10 10 10-10L12 2z",
			fill: "#F05032"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "12",
			y: "15",
			textAnchor: "middle",
			fill: "white",
			fontSize: "7",
			fontWeight: "bold",
			children: "G"
		})]
	});
	ShellIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "4",
				width: "18",
				height: "16",
				rx: "3",
				fill: "#24292F"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 9l3 3-3 3",
				stroke: "#FFFFFF",
				strokeWidth: "1.6",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 15h5",
				stroke: "#FFFFFF",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
	RUNTIME_TOOLS = [
		{
			id: "nodejs",
			name: "Node.js",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeJsIcon, {})
		},
		{
			id: "python",
			name: "Python",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PythonIcon, {})
		},
		{
			id: "gitbash",
			name: "Git Bash",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBashIcon, {})
		},
		{
			id: "shell",
			name: "Shell",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellIcon, {})
		}
	];
}));
//#endregion
export { init_icons as n, getVisibleRuntimeTools as t };
