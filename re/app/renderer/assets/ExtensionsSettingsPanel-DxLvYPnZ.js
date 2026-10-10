import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { B3 as init_adapter_context, E1 as init_useI18n, GX as useComputerUseFeature, LX as useBrowserUseFeature, Lnt as ChromeBrandIcon, O1 as useTranslation, O7 as Tag, P4 as init_types, R5 as Switch, V3 as useAdapter, V5 as message, XL as isMacOS, YL as init_system_platform, bI as SettingSection, jY as init_product_features, krt as Button, lnt as EdgeBrandIcon, ltt as QQBrowserBrandIcon, m5 as init_src, wq as useAgentTelemetry, xI as init_setting_section, xq as init_telemetry } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { c as init_disable_agent_teams, i as saveLocalSkillsMemoryEnabled, l as saveDisableAgentTeams, n as getLocalSkillsMemoryEnabled, o as DISABLE_AGENT_TEAMS_CHANGE_EVENT, r as init_local_skills_memory, s as getDisableAgentTeams, t as LOCAL_SKILLS_MEMORY_CHANGE_EVENT } from "./local-skills-memory-C3dXaNc1.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/browser-extension-install.ts
async function openBrowserExtensionStore(adapter, browser) {
	if (!adapter.openExternalInBrowser) throw new Error("Browser-specific opener is unavailable");
	await adapter.openExternalInBrowser(BROWSER_EXTENSION_STORE_URLS[browser], browser);
}
var WORKBUDDY_EXTENSION_ID_CHROME_WEB_STORE, WORKBUDDY_EXTENSION_ID_EDGE_ADDONS, WORKBUDDY_CHROME_WEB_STORE_URL, WORKBUDDY_EDGE_ADDONS_URL, BROWSER_EXTENSION_STORE_URLS, BROWSER_EXTENSION_INSTALL_TARGETS;
var init_browser_extension_install = __esmMin((() => {
	WORKBUDDY_EXTENSION_ID_CHROME_WEB_STORE = "ajnnogdfpilbhkeggdjlcokgglijmdde";
	WORKBUDDY_EXTENSION_ID_EDGE_ADDONS = "ndbfelmlimfjklodckmbalfioaehegpc";
	WORKBUDDY_CHROME_WEB_STORE_URL = `https://chromewebstore.google.com/detail/workbuddy/${WORKBUDDY_EXTENSION_ID_CHROME_WEB_STORE}`;
	WORKBUDDY_EDGE_ADDONS_URL = `https://microsoftedge.microsoft.com/addons/detail/workbuddy/${WORKBUDDY_EXTENSION_ID_EDGE_ADDONS}`;
	BROWSER_EXTENSION_STORE_URLS = {
		chrome: WORKBUDDY_CHROME_WEB_STORE_URL,
		edge: WORKBUDDY_EDGE_ADDONS_URL,
		"qq-browser": WORKBUDDY_CHROME_WEB_STORE_URL
	};
	BROWSER_EXTENSION_INSTALL_TARGETS = [
		{
			browser: "chrome",
			nameKey: "settings.agent.browserExtension.chrome.name",
			titleKey: "settings.agent.browserExtension.chrome.title",
			descriptionKey: "settings.agent.browserExtension.chrome.description"
		},
		{
			browser: "edge",
			nameKey: "settings.agent.browserExtension.edge.name",
			titleKey: "settings.agent.browserExtension.edge.title",
			descriptionKey: "settings.agent.browserExtension.edge.description"
		},
		{
			browser: "qq-browser",
			nameKey: "settings.agent.browserExtension.qqBrowser.name",
			titleKey: "settings.agent.browserExtension.qqBrowser.title",
			descriptionKey: "settings.agent.browserExtension.qqBrowser.description"
		}
	];
})), import_jsx_runtime$1, BROWSER_EXTENSION_INSTALL_ICONS;
var init_browser_extension_install_icons = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	BROWSER_EXTENSION_INSTALL_ICONS = {
		chrome: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChromeBrandIcon, { size: 36 }),
		edge: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EdgeBrandIcon, { size: 36 }),
		"qq-browser": /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(QQBrowserBrandIcon, { size: 36 })
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ExtensionsSettingsPanel.tsx
/**
* 单行设置：标题(+「禁用中」tag) + 描述 + 右侧按钮（对齐 settings-v2 行结构）。
*/
function ToggleRow({ title, description, off, disabled, onToggle }) {
	const t = useTranslation();
	const titleNode = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [title, off && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `extensions-settings-panel__tag cb-font-size-fixed`,
		children: t("settings.extensions.tag.disabled")
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
		plain: true,
		title: titleNode,
		description,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			danger: !off,
			size: "medium",
			disabled,
			onClick: onToggle,
			children: off ? t("settings.extensions.action.cancelDisable") : t("settings.extensions.action.disable")
		})
	});
}
/**
* 原生运行时插件行：未安装 →「安装」；安装中 → 转圈；失败 →「重试」+ 错误；
* 已安装 → 开关 + 版本；非交付平台 → 置灰「不可用」。
*/
function NativeRuntimeRow({ title, label, description, status, busy, onInstall, onToggle }) {
	const t = useTranslation();
	const state = status?.state ?? "not-installed";
	let action;
	if (state === "installed") action = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
		checked: status?.enabled ?? false,
		loading: busy,
		onChange: (event) => onToggle(event.target.checked),
		size: "large",
		"aria-label": label
	});
	else if (state === "unavailable") action = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "secondary",
		size: "medium",
		disabled: true,
		children: t("settings.agent.nativeRuntime.unavailable")
	});
	else if (state === "installing") action = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "primary",
		size: "medium",
		loading: true,
		children: t("settings.agent.nativeRuntime.installing")
	});
	else action = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "primary",
		size: "medium",
		loading: busy,
		disabled: !status,
		onClick: onInstall,
		children: state === "failed" ? t("settings.agent.nativeRuntime.retry") : t("settings.agent.nativeRuntime.install")
	});
	const extra = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [status?.installedVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "extensions-settings-panel__runtime-version",
		children: t("settings.agent.nativeRuntime.version", { version: status.installedVersion })
	}), state === "failed" && status?.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "extensions-settings-panel__runtime-error",
		children: t("settings.agent.nativeRuntime.installFailed", { error: status.error })
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
		plain: true,
		title,
		description: description === void 0 ? extra : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [description, extra] }),
		action
	});
}
function ExtensionsSettingsPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const { reportEvent, Events } = useAgentTelemetry();
	const [disableTeams, setDisableTeams] = (0, import_react.useState)(getDisableAgentTeams);
	(0, import_react.useEffect)(() => {
		const handler = (event) => {
			const detail = event.detail;
			if (detail && typeof detail.enabled === "boolean") setDisableTeams(detail.enabled);
		};
		window.addEventListener(DISABLE_AGENT_TEAMS_CHANGE_EVENT, handler);
		return () => window.removeEventListener(DISABLE_AGENT_TEAMS_CHANGE_EVENT, handler);
	}, []);
	const handleDisableTeamsToggle = (checked) => {
		setDisableTeams(checked);
		saveDisableAgentTeams(checked);
		try {
			adapter.emit("save-disable-agent-teams", { enabled: checked });
		} catch (error) {
			console.error("[ExtensionsSettingsPanel] emit save-disable-agent-teams failed:", error);
		}
	};
	const [localSkillsMemoryEnabled, setLocalSkillsMemoryEnabled] = (0, import_react.useState)(getLocalSkillsMemoryEnabled);
	(0, import_react.useEffect)(() => {
		const handler = (event) => {
			const detail = event.detail;
			if (detail && typeof detail.enabled === "boolean") setLocalSkillsMemoryEnabled(detail.enabled);
		};
		window.addEventListener(LOCAL_SKILLS_MEMORY_CHANGE_EVENT, handler);
		return () => window.removeEventListener(LOCAL_SKILLS_MEMORY_CHANGE_EVENT, handler);
	}, []);
	const handleLocalSkillsMemoryToggle = (checked) => {
		setLocalSkillsMemoryEnabled(checked);
		saveLocalSkillsMemoryEnabled(checked);
		try {
			adapter.emit("save-local-skills-memory", { enabled: checked });
		} catch (error) {
			console.error("[ExtensionsSettingsPanel] emit save-local-skills-memory failed:", error);
		}
	};
	const [nativeRuntime, setNativeRuntime] = (0, import_react.useState)();
	const [nativeRuntimeBusy, setNativeRuntimeBusy] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		if (!adapter.getNativeRuntimeStatus) return;
		let disposed = false;
		adapter.getNativeRuntimeStatus().then((status) => {
			if (!disposed) setNativeRuntime(status);
		}).catch((error) => {
			console.error("[ExtensionsSettingsPanel] getNativeRuntimeStatus failed:", error);
		});
		const unsubscribe = adapter.onNativeRuntimeChanged?.((status) => {
			if (!disposed) setNativeRuntime(status);
		});
		return () => {
			disposed = true;
			unsubscribe?.();
		};
	}, [adapter]);
	const runNativeRuntimeAction = (plugin, elementName, source, action) => {
		if (!action) return;
		reportEvent(Events.WebElementClick, {
			elementId: `settings_native_runtime_${plugin.replace("-", "_")}`,
			elementName,
			pageName: "settings_extensions",
			source
		});
		setNativeRuntimeBusy(plugin);
		action().then(setNativeRuntime).catch((error) => {
			console.error(`[ExtensionsSettingsPanel] native runtime ${source} failed:`, error);
		}).finally(() => {
			setNativeRuntimeBusy((current) => current === plugin ? void 0 : current);
		});
	};
	const installNativeRuntime = adapter.installNativeRuntime?.bind(adapter);
	const setNativeRuntimeEnabled = adapter.setNativeRuntimeEnabled?.bind(adapter);
	const handleNativeRuntimeInstall = (plugin, elementName) => {
		runNativeRuntimeAction(plugin, elementName, "install", installNativeRuntime ? () => installNativeRuntime(plugin) : void 0);
	};
	const handleNativeRuntimeToggle = (plugin, elementName, enabled) => {
		runNativeRuntimeAction(plugin, elementName, enabled ? "on" : "off", setNativeRuntimeEnabled ? () => setNativeRuntimeEnabled(plugin, enabled) : void 0);
	};
	const handleInstallBrowserExtension = (target) => {
		const browserName = t(target.nameKey);
		reportEvent(Events.WebElementClick, {
			elementId: `settings_install_workbuddy_browser_extension_${target.browser}`,
			elementName: `安装 WorkBuddy 浏览器插件 - ${browserName}`,
			pageName: "settings_extensions",
			source: target.browser
		});
		openBrowserExtensionStore(adapter, target.browser).catch((error) => {
			console.error(`[ExtensionsSettingsPanel] open extension store in ${target.browser} failed:`, error);
			message.error(t("settings.agent.browserExtension.openFailed", { browser: browserName }));
		});
	};
	const computerUseGroupRef = (0, import_react.useRef)(null);
	const scrollToComputerUseSettings = () => {
		computerUseGroupRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	const computerUseFlag = useComputerUseFeature();
	const browserUseFlag = useBrowserUseFeature();
	const showComputerUseSettings = adapter.environmentType === "local" && isMacOS() && computerUseFlag === true;
	const showBrowserUseSettings = adapter.environmentType === "local" && isMacOS() && browserUseFlag === true;
	const browserControlTitle = showComputerUseSettings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "extensions-settings-panel__browser-control-title",
		children: [
			t("settings.agent.browserControl.label"),
			t("settings.agent.browserControl.manageExtensions.before"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "extensions-settings-panel__inline-link-button",
				onClick: scrollToComputerUseSettings,
				children: t("settings.agent.browserControl.manageExtensions.link")
			}),
			t("settings.agent.browserControl.manageExtensions.after")
		]
	}) : t("settings.agent.browserControl.label");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "general-settings-panel extensions-settings-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "general-settings-panel__group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "general-settings-panel__group-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: t("settings.agent.disableTeams.label"),
						description: t("settings.agent.disableTeams.description"),
						off: disableTeams,
						onToggle: () => {
							const next = !disableTeams;
							reportEvent(Events.WebElementClick, {
								elementId: "settings_disable_agent_teams",
								elementName: "禁用智能体团队",
								pageName: "settings_extensions",
								source: next ? "on" : "off"
							});
							handleDisableTeamsToggle(next);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: t("settings.agent.localSkillsMemory.label"),
						description: t("settings.agent.localSkillsMemory.description"),
						off: !localSkillsMemoryEnabled,
						onToggle: () => {
							const next = !localSkillsMemoryEnabled;
							reportEvent(Events.WebElementClick, {
								elementId: "settings_local_skills_memory",
								elementName: "本地技能与记忆沉淀",
								pageName: "settings_extensions",
								source: next ? "on" : "off"
							});
							handleLocalSkillsMemoryToggle(next);
						}
					})]
				})
			}),
			showComputerUseSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: computerUseGroupRef,
				className: "general-settings-panel__group extensions-settings-panel__capability-group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "general-settings-panel__group-label extensions-settings-panel__capability-title",
					children: [t("settings.agent.computerUse.sectionTitle"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						size: "small",
						appearance: "outline",
						children: "Beta"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "general-settings-panel__group-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeRuntimeRow, {
						title: t("settings.agent.computerUse.label"),
						label: t("settings.agent.computerUse.label"),
						description: t("settings.agent.computerUse.description"),
						status: nativeRuntime?.plugins["computer-use"],
						busy: nativeRuntimeBusy === "computer-use",
						onInstall: () => handleNativeRuntimeInstall("computer-use", "电脑操控"),
						onToggle: (enabled) => handleNativeRuntimeToggle("computer-use", "电脑操控", enabled)
					})
				})]
			}),
			showBrowserUseSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "general-settings-panel__group extensions-settings-panel__capability-group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "general-settings-panel__group-label extensions-settings-panel__capability-title",
					children: [t("settings.agent.browserControl.sectionTitle"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						size: "small",
						appearance: "outline",
						children: "Beta"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "general-settings-panel__group-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeRuntimeRow, {
						label: t("settings.agent.browserControl.label"),
						status: nativeRuntime?.plugins["browser-use"],
						busy: nativeRuntimeBusy === "browser-use",
						onInstall: () => handleNativeRuntimeInstall("browser-use", "浏览器操控"),
						onToggle: (enabled) => handleNativeRuntimeToggle("browser-use", "浏览器操控", enabled),
						title: browserControlTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "extensions-settings-panel__browser-extension-list",
						children: BROWSER_EXTENSION_INSTALL_TARGETS.map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							plain: true,
							className: "extensions-settings-panel__browser-extension-item",
							icon: BROWSER_EXTENSION_INSTALL_ICONS[target.browser],
							title: t(target.titleKey),
							description: t(target.descriptionKey),
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								size: "medium",
								onClick: () => handleInstallBrowserExtension(target),
								children: t("settings.agent.browserExtension.install")
							})
						}, target.browser))
					})]
				})]
			})
		]
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_product_features();
	init_useI18n();
	init_telemetry();
	init_disable_agent_teams();
	init_local_skills_memory();
	init_system_platform();
	init_types();
	init_browser_extension_install();
	init_browser_extension_install_icons();
	init_setting_section();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ExtensionsSettingsPanel };
