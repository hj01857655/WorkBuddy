import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, O1 as useTranslation, R5 as Switch, V3 as useAdapter, YF as DEFAULT_BUNDLED_RUNTIME, eI as TOOL_CONFIG_KEY, m5 as init_src, oI as shouldDisableMacFileBackupForBundledRuntime, rI as init_constants } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_icons, t as getVisibleRuntimeTools } from "./icons-C_luV139.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/SoftwareConfigPanel.less
var init_SoftwareConfigPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SoftwareConfigPanel.tsx
/**
* Software Config Panel
*/
function SoftwareConfigPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [config, setConfig] = (0, import_react.useState)(DEFAULT_BUNDLED_RUNTIME);
	(0, import_react.useEffect)(() => {
		if (!adapter) return;
		const unsubscribe = adapter.on("bundled-runtime-config-result", (data) => {
			const result = data;
			if (result && typeof result === "object") setConfig({
				enabled: result.enabled !== false,
				tools: {
					node: result.tools?.node !== false,
					python: result.tools?.python !== false,
					gitBash: result.tools?.gitBash !== false,
					brokeredShell: result.tools?.brokeredShell !== false
				}
			});
		});
		adapter.emit("get-bundled-runtime-config");
		return unsubscribe;
	}, [adapter]);
	const saveConfig = (0, import_react.useCallback)((next) => {
		setConfig(next);
		adapter?.emit("save-bundled-runtime-config", next);
		if (shouldDisableMacFileBackupForBundledRuntime(next)) adapter?.emit("save-sandbox-rules-config", { fileBackup: { enabled: false } });
	}, [adapter]);
	const handleMasterToggle = (0, import_react.useCallback)((enabled) => {
		saveConfig({
			...config,
			enabled
		});
	}, [config, saveConfig]);
	const handleToolToggle = (0, import_react.useCallback)((toolId, enabled) => {
		const key = TOOL_CONFIG_KEY[toolId];
		if (!key) return;
		saveConfig({
			...config,
			tools: {
				...config.tools,
				[key]: enabled
			}
		});
	}, [config, saveConfig]);
	const isToolEnabled = (toolId) => {
		const key = TOOL_CONFIG_KEY[toolId];
		return key ? config.tools[key] !== false : true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "software-config-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "software-config-panel__section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "software-config-panel__section-title",
				children: t("settings.softwareConfig.workspaceDeps")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "software-config-panel__card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "software-config-panel__card-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "software-config-panel__card-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "software-config-panel__card-label",
							children: t("settings.softwareConfig.bundledRuntime")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "software-config-panel__card-desc",
							children: t("settings.softwareConfig.bundledRuntimeDesc")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "software-config-panel__card-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: config.enabled,
							onChange: (event) => handleMasterToggle(event.currentTarget.checked),
							size: "small"
						})
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "software-config-panel__section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "software-config-panel__section-title",
				children: t("settings.softwareConfig.runtimeTools")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "software-config-panel__card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "software-config-panel__table-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "software-config-panel__col-tool",
							children: t("settings.softwareConfig.colTool")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "software-config-panel__col-description",
							children: t("settings.softwareConfig.colDescription")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "software-config-panel__col-status",
							children: t("settings.softwareConfig.colStatus")
						})
					]
				}), getVisibleRuntimeTools().map((tool) => {
					const toolEnabled = isToolEnabled(tool.id);
					const effectiveEnabled = config.enabled && toolEnabled;
					const rowDisabled = !config.enabled;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `software-config-panel__table-row${rowDisabled ? " software-config-panel__table-row--disabled" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "software-config-panel__col-tool",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "software-config-panel__tool-icon",
									children: tool.icon
								}), tool.name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "software-config-panel__col-description",
								children: t(`settings.softwareConfig.desc.${tool.id}`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "software-config-panel__col-status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: effectiveEnabled,
									onChange: (event) => handleToolToggle(tool.id, event.currentTarget.checked),
									size: "small",
									disabled: rowDisabled
								})
							})
						]
					}, tool.id);
				})]
			})]
		})]
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_SoftwareConfigPanel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_constants();
	init_icons();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { SoftwareConfigPanel };
