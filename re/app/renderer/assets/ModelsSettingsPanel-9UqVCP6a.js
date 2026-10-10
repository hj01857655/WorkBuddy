import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, A7 as Input, Av as tLocalized, Cv as getProviderModelOptions, Cy as init_icons, Dv as getProviderModelReasoningDefaults, E as init_contexts, E1 as init_useI18n, Ev as init_defaults, Gtt as KimiBrandIcon, H7 as EditToolIcon, J5 as Select, J9 as WbInfoIcon, K2 as init_environment, O1 as useTranslation, Q as init_app_providers, R5 as Switch, Sv as getProviderModelOption, T0 as init_app_core, Tnt as CirclePauseIcon, Tv as inferProviderIdFromLocalCustomModel, V3 as useAdapter, Vtt as LoadingIcon, X5 as Checkbox, X9 as WbCreditsIcon, Y2 as isHostWindows, _0 as init_log_sink, _nt as ConnectorTabIcon, _v as getKnownModelReasoningDefaults, _y as OpenAIIcon, ay as init_ollama, b0 as writeRendererLog, bv as getProviderDisplayName, c7 as Modal, dnt as DownloadTrayIcon, dy as FireworksAIIcon, dz as init_use_product_feature, et as useAgentServices, f3 as wb, fy as GLMIcon, fz as useProductFeature, gv as buildProviderModelDisplayName, gy as MistralIcon, hv as buildDefaultModelFormValue, hy as MinimaxIcon, i7 as Tooltip, iv as publishMemberCustomModelPolicy, iy as openrouter_default, krt as Button, kv as init_localized_text, ly as DeepSeekIcon, lz as useSettings, m5 as init_src, mv as useLocalCustomModelSettingsConfig, my as GroqIcon, nv as init_use_member_custom_model_policy, ny as tencent_cloud_default, oy as ollama_default, p7 as Popover, pnt as DeleteIcon, pv as init_useLocalCustomModelSettingsConfig, py as GeminiIcon, rv as memberCustomModelPolicy$, ry as init_openrouter, sz as init_SettingsContext, ty as init_tencent_cloud, uit as isValidLocalCustomModel, vv as getProviderById, vy as PerplexityIcon, w9 as WbUpdateIcon, wv as getProviders, xv as getProviderGroups, yv as getProviderCapabilityDefaults, yy as TogetherAIIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, _a as CloseIcon, aa as WbEyeCloseIcon, ji as ConfirmDialog, ra as WbEyeOpenIcon, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/ModelsSettingsPanel.less
var init_ModelsSettingsPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/model-config/auto-from-model-defaults.ts
/**
* Applies model option defaults that must be persisted with autoFromModel saves.
*/
function applyAutoFromModelOptionDefaults(model, option) {
	model.supportsToolCall = option?.supportsTools ?? true;
	model.supportsImages = option?.supportsImages ?? false;
	model.supportsReasoning = option?.supportsReasoning ?? false;
	model.maxInputTokens = option?.maxInputTokens;
	model.maxOutputTokens = option?.maxOutputTokens;
}
var init_auto_from_model_defaults = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/model-config/reasoning-effort-options.ts
function translateOrFallback(t, key, fallbackLabel) {
	const translated = t(key);
	return translated && translated !== key ? translated : fallbackLabel;
}
/**
* 统一设置页里的 reasoning effort 选项文案，避免默认档位下拉与支持档位复选框出现多处硬编码。
*/
function getReasoningEffortOptions(t) {
	return REASONING_EFFORT_META.map((item) => ({
		value: item.value,
		label: translateOrFallback(t, item.labelKey, item.fallbackLabel)
	}));
}
var REASONING_EFFORT_META;
var init_reasoning_effort_options = __esmMin((() => {
	REASONING_EFFORT_META = [
		{
			value: "low",
			labelKey: "settings.models.efforts.low",
			fallbackLabel: "Low"
		},
		{
			value: "medium",
			labelKey: "settings.models.efforts.medium",
			fallbackLabel: "Medium"
		},
		{
			value: "high",
			labelKey: "settings.models.efforts.high",
			fallbackLabel: "High"
		},
		{
			value: "xhigh",
			labelKey: "settings.models.efforts.xhigh",
			fallbackLabel: "X-High"
		},
		{
			value: "max",
			labelKey: "settings.models.efforts.max",
			fallbackLabel: "Max"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-models/use-local-models.ts
function useLocalModels() {
	const adapter = useAdapter();
	const [plan, setPlan] = (0, import_react$2.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react$2.useState)(true);
	const unsubscribeRef = (0, import_react$2.useRef)(null);
	(0, import_react$2.useEffect)(() => {
		if (!adapter?.getDeploymentPlan) {
			setIsLoading(false);
			return;
		}
		writeRendererLog("local-models", "info", "Loading deployment plan...");
		adapter.getDeploymentPlan().then((raw) => {
			const p = raw;
			if (p.hardwareEligible === false) {
				writeRendererLog("local-models", "info", "Hardware gate failed, hiding local models UI");
				setPlan(null);
			} else {
				setPlan(p);
				writeRendererLog("local-models", "info", `Deployment plan loaded: engine={ready=${p.engine.ready}, needsUpdate=${p.engine.needsUpdate}, keepAlive=${p.engine.keepAlive}}, models=${p.models.length}`);
			}
			setIsLoading(false);
		}).catch((error) => {
			writeRendererLog("local-models", "error", `Failed to load deployment plan: ${error}`);
			setIsLoading(false);
		});
	}, [adapter]);
	(0, import_react$2.useEffect)(() => {
		if (!adapter?.onDeploymentPlanUpdate) return;
		unsubscribeRef.current = adapter.onDeploymentPlanUpdate((raw) => {
			const p = raw;
			writeRendererLog("local-models", "info", `Plan broadcast received: engine.keepAlive=${p.engine?.keepAlive}`);
			setPlan((prev) => {
				if (prev && p.hardwareEligible !== false) {
					if (p.models?.some((m) => m.ready && m.enabled && !prev.models?.find((pm) => pm.id === m.id && pm.ready && pm.enabled))) window.dispatchEvent(new CustomEvent("agent-ui:local-model-toggled"));
				}
				return p.hardwareEligible === false ? null : p;
			});
		});
		return () => {
			unsubscribeRef.current?.();
			unsubscribeRef.current = null;
		};
	}, [adapter]);
	(0, import_react$2.useEffect)(() => {
		if (!plan || isLoading) return;
		if (plan.engine.ready) return;
		const enabledModels = plan.models.filter((m) => m.ready && m.enabled);
		if (enabledModels.length === 0) return;
		setPlan((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				models: prev.models.map((m) => m.ready && m.enabled ? {
					...m,
					enabled: false
				} : m)
			};
		});
		Promise.all(enabledModels.map((m) => adapter?.toggleLocalModelEnabled?.(m.id, false))).then(() => {
			window.dispatchEvent(new CustomEvent("agent-ui:local-model-toggled"));
		});
	}, [plan?.engine.ready, isLoading]);
	(0, import_react$2.useEffect)(() => {
		const handler = (e) => {
			const modelId = e?.detail?.id;
			if (!modelId || !adapter?.toggleLocalModelEnabled) return;
			setPlan((prev) => {
				if (!prev) return prev;
				const model = prev.models.find((m) => m.id === modelId);
				if (!model || !model.ready || !model.enabled) return prev;
				adapter.toggleLocalModelEnabled?.(modelId, false);
				return {
					...prev,
					models: prev.models.map((m) => m.id === modelId && m.ready && m.enabled ? {
						...m,
						enabled: false
					} : m)
				};
			});
		};
		window.addEventListener("agent-ui:custom-model-deleted", handler);
		return () => window.removeEventListener("agent-ui:custom-model-deleted", handler);
	}, [adapter]);
	return {
		plan,
		isLoading,
		startDownload: (0, import_react$2.useCallback)((modelId) => {
			if (!adapter?.startLocalModelDownload) return;
			writeRendererLog("local-models", "info", `startDownload: modelId=${modelId}`);
			setPlan((prev) => {
				if (!prev) return prev;
				const engineNeedsDeploy = !prev.engine.ready || prev.engine.needsUpdate;
				return {
					...prev,
					engine: engineNeedsDeploy ? {
						...prev.engine,
						deployStatus: prev.engine.deployStatus ?? {
							status: "downloading",
							progress: 0
						}
					} : prev.engine,
					models: prev.models.map((m) => m.id === modelId ? {
						...m,
						deployStatus: engineNeedsDeploy ? {
							status: "preparing_env",
							progress: 0
						} : {
							status: "downloading",
							progress: 0
						}
					} : m)
				};
			});
			adapter.startLocalModelDownload(modelId).catch((error) => {
				writeRendererLog("local-models", "error", `Failed to start download: modelId=${modelId}, error=${error}`);
			});
		}, [adapter]),
		pauseDownload: (0, import_react$2.useCallback)((modelId) => {
			if (!adapter?.pauseLocalModelDownload) return;
			writeRendererLog("local-models", "info", `pauseDownload: modelId=${modelId}`);
			adapter.pauseLocalModelDownload(modelId).catch((error) => {
				writeRendererLog("local-models", "error", `Failed to pause download: modelId=${modelId}, error=${error}`);
			});
		}, [adapter]),
		startEngineDownload: (0, import_react$2.useCallback)(() => {
			if (!adapter?.startLlamaServerDownload) return;
			writeRendererLog("local-models", "info", "startEngineDownload");
			setPlan((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					engine: {
						...prev.engine,
						deployStatus: prev.engine.deployStatus ?? {
							status: "downloading",
							progress: 0
						}
					}
				};
			});
			adapter.startLlamaServerDownload().catch((error) => {
				writeRendererLog("local-models", "error", `Failed to start engine download: ${error}`);
			});
		}, [adapter]),
		toggleEnabled: (0, import_react$2.useCallback)((modelId, enabled) => {
			if (!adapter?.toggleLocalModelEnabled) return;
			setPlan((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					models: prev.models.map((m) => {
						if (m.id === modelId && m.ready) return {
							...m,
							enabled
						};
						if (enabled && m.ready && m.enabled) return {
							...m,
							enabled: false
						};
						return m;
					})
				};
			});
			adapter.toggleLocalModelEnabled(modelId, enabled).then(() => {
				window.dispatchEvent(new CustomEvent("agent-ui:local-model-toggled"));
			}).catch((error) => {
				writeRendererLog("local-models", "error", `Failed to toggle model: modelId=${modelId}, error=${error}`);
			});
		}, [adapter]),
		toggleEngineKeepAlive: (0, import_react$2.useCallback)((keepAlive) => {
			if (!adapter?.setEngineKeepAlive) return;
			writeRendererLog("local-models", "info", `toggleEngineKeepAlive: keepAlive=${keepAlive}, current plan.engine.keepAlive=${plan?.engine?.keepAlive}`);
			setPlan((prev) => {
				if (!prev) return prev;
				let updatedPreview = prev.engine.launchArgsPreview;
				if (updatedPreview) {
					const sleepValue = keepAlive ? "-1" : "600";
					const idx = updatedPreview.indexOf("--sleep-idle-seconds");
					if (idx >= 0 && idx + 1 < updatedPreview.length) {
						updatedPreview = [...updatedPreview];
						updatedPreview[idx + 1] = sleepValue;
					}
				}
				return {
					...prev,
					engine: {
						...prev.engine,
						keepAlive,
						launchArgsPreview: updatedPreview
					}
				};
			});
			adapter.setEngineKeepAlive(keepAlive).catch((error) => {
				writeRendererLog("local-models", "error", `Failed to set engineKeepAlive: ${error}`);
			});
		}, [adapter, plan?.engine?.keepAlive]),
		deleteModel: (0, import_react$2.useCallback)((modelId) => {
			if (!adapter?.deleteLocalModel) return;
			writeRendererLog("local-models", "info", `deleteModel: modelId=${modelId}`);
			adapter.deleteLocalModel(modelId).then(() => {
				window.dispatchEvent(new CustomEvent("agent-ui:local-model-toggled"));
			}).catch((error) => {
				writeRendererLog("local-models", "error", `Failed to delete model: modelId=${modelId}, error=${error}`);
				const msg = error instanceof Error ? error.message : String(error);
				setPlan((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						models: prev.models.map((m) => m.id === modelId ? {
							...m,
							deleteError: msg
						} : m)
					};
				});
			});
		}, [adapter])
	};
}
var import_react$2;
var init_use_local_models = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_log_sink();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-models/LocalModelsSection.tsx
function getFailedStatusKey(reason) {
	if (reason === "verify_failed") return "settings.models.localModels.status.verifyFailed";
	if (reason === "extract_failed") return "settings.models.localModels.status.extractFailed";
	return "settings.models.localModels.status.failed";
}
function formatSpeed(bytesPerSec) {
	if (bytesPerSec >= 1048576) return `${(bytesPerSec / 1048576).toFixed(1)}MB/s`;
	return `${(bytesPerSec / 1024).toFixed(0)}KB/s`;
}
/**
* 本地模型列表面板
*/
function LocalModelsSection() {
	const t = useTranslation();
	const { plan, startDownload, pauseDownload, startEngineDownload, toggleEnabled, toggleEngineKeepAlive, deleteModel } = useLocalModels();
	if (!plan || plan.models.length === 0) return null;
	const engineDeploying = plan?.engine.deployStatus != null;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
		className: "models-settings-panel__section models-settings-panel__local-models-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "models-settings-panel__card models-settings-panel__local-models-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "models-settings-panel__card-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "models-settings-panel__card-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "models-settings-panel__card-label models-settings-panel__card-label--with-badge",
							children: [t("settings.models.localModels.title"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "models-settings-panel__beta-tag",
								children: "Beta"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "models-settings-panel__card-desc",
							children: t("settings.models.localModels.description")
						})]
					})
				}),
				plan && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RuntimeInfoBlock, {
					engine: plan.engine,
					t,
					onToggleEngineKeepAlive: toggleEngineKeepAlive
				}),
				plan && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "local-models-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "local-models-table__header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "local-models-table__col local-models-table__col--name",
								children: t("settings.models.localModels.columns.name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "local-models-table__col local-models-table__col--desc",
								children: t("settings.models.localModels.columns.description")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "local-models-table__col local-models-table__col--status",
								children: t("settings.models.localModels.columns.status")
							})
						]
					}), plan.models.map((model) => {
						const runningModel = plan.models.find((m) => m.ready && m.enabled && m.id !== model.id);
						return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalModelRow, {
							model,
							system: plan.system,
							engineVariant: plan.engine.variant,
							engineReady: plan.engine.ready,
							engineNeedsUpdate: plan.engine.needsUpdate,
							engineDeploying,
							runningModelName: runningModel?.name,
							onStartDownload: startDownload,
							onPauseDownload: pauseDownload,
							onStartEngineDownload: startEngineDownload,
							onToggleEnabled: toggleEnabled,
							onDeleteModel: deleteModel
						}, model.id);
					})]
				})
			]
		})
	});
}
function formatMB(mb) {
	if (mb >= 1024) {
		const gb = mb / 1024;
		return Number.isInteger(gb) ? `${gb}GB` : `${gb.toFixed(1)}GB`;
	}
	return `${mb}MB`;
}
/**
* 构建 requirements 详情 JSX，不满足项的实际值部分使用红色文字。
* 同时用于模型行 info icon tooltip 和启用确认弹窗。
*/
function buildRequirementsDetailJsx(req, system, engineVariant, t, fileSize) {
	const lines = [];
	if (fileSize && fileSize > 0) {
		const fileSizeMB = Math.round(fileSize / 1048576);
		lines.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			t("settings.models.localModels.runtime.fileSize"),
			": ",
			formatMB(fileSizeMB)
		] }, "fileSize"));
	}
	if (req.os || req.arch) lines.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
		t("settings.models.localModels.runtime.os"),
		": ",
		[req.os, req.arch].filter(Boolean).join(", ")
	] }, "os"));
	if (req.minMemoryGB !== void 0) {
		const memoryUnmet = system.memoryGB > 0 && system.memoryGB < req.minMemoryGB;
		lines.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			t("settings.models.localModels.runtime.memory"),
			": ",
			t("settings.models.localModels.runtime.minMemory", { value: req.minMemoryGB }),
			memoryUnmet && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				style: { color: "var(--wb-color-text-error-active, #b42c3f)" },
				children: [" ", t("settings.models.localModels.runtime.unmet", { actual: `${system.memoryGB}GB` })]
			})
		] }, "memory"));
	}
	if (engineVariant === "Intel-GPU" && (system.computeUnits ?? 0) > 0 && req.minComputeUnits !== void 0) {
		const actual = system.computeUnits ?? 0;
		const cuUnmet = actual > 0 && actual < req.minComputeUnits;
		lines.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			t("settings.models.localModels.runtime.computeUnits"),
			": ",
			t("settings.models.localModels.runtime.minComputeUnits", { value: req.minComputeUnits }),
			cuUnmet && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				style: { color: "var(--wb-color-text-error-active, #b42c3f)" },
				children: [" ", t("settings.models.localModels.runtime.unmet", { actual: `${actual} ${t("settings.models.localModels.runtime.cuUnit")}` })]
			})
		] }, "cu"));
	} else if (req.minVramMB !== void 0) {
		const actual = system.vramMB ?? 0;
		const vramUnmet = actual > 0 && actual < req.minVramMB;
		lines.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			t("settings.models.localModels.runtime.vram"),
			": ",
			t("settings.models.localModels.runtime.minVram", { value: Math.round(req.minVramMB / 1024) }),
			vramUnmet && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				style: { color: "var(--wb-color-text-error-active, #b42c3f)" },
				children: [" ", t("settings.models.localModels.runtime.unmet", { actual: formatMB(actual) })]
			})
		] }, "vram"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: { fontWeight: "normal" },
		children: lines
	});
}
function isRequirementsUnmet(req, system, engineVariant) {
	if (!req) return false;
	if (req.minMemoryGB !== void 0 && system.memoryGB > 0 && system.memoryGB < req.minMemoryGB) return true;
	if (engineVariant === "Intel-GPU" && (system.computeUnits ?? 0) > 0 && req.minComputeUnits !== void 0) {
		const actual = system.computeUnits ?? 0;
		if (actual > 0 && actual < req.minComputeUnits) return true;
	} else if (req.minVramMB !== void 0) {
		const actual = system.vramMB ?? 0;
		if (actual > 0 && actual < req.minVramMB) return true;
	}
	return false;
}
function RuntimeInfoBlock({ engine, t, onToggleEngineKeepAlive }) {
	const engineLabel = engine.variantDisplayName ?? engine.variant;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "local-models-runtime-info",
		children: (engine.ready || engine.variant) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "local-models-runtime-info__row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "local-models-runtime-info__item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "local-models-runtime-info__label",
						children: t("settings.models.localModels.runtime.engine")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "local-models-runtime-info__value",
						title: engine.launchArgsPreview?.length ? `${engine.variant}.${engine.currentVersion ?? ""}\n${engine.launchArgsPreview.join(" ")}` : `${engine.variant}.${engine.currentVersion ?? ""}`,
						children: engineLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EngineStatusText, {
						engine,
						t
					})
				]
			}), engine.ready && onToggleEngineKeepAlive && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "local-models-runtime-info__item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "local-models-runtime-info__label",
					children: t("settings.models.localModels.runtime.keepAlive")
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
					checked: engine.keepAlive ?? false,
					onChange: (e) => onToggleEngineKeepAlive(e.target.checked),
					size: "small"
				})]
			})]
		})
	});
}
function EngineStatusText({ engine, t }) {
	const ds = engine.deployStatus;
	if (!ds) {
		if (!engine.ready) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
			className: "local-models-runtime-info__unmet-hint",
			children: t("settings.models.localModels.runtime.notReady")
		});
		return null;
	}
	if (ds.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
		className: "local-models-table__status-failed",
		children: t(getFailedStatusKey(ds.reason))
	});
	if (ds.status === "downloading") {
		const speedText = ds.speed != null && ds.speed > 0 ? ` ${formatSpeed(ds.speed)},` : "";
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
			className: "local-models-table__status-text cb-shining-text",
			children: [
				t("settings.models.localModels.status.downloading"),
				speedText,
				" ",
				ds.progress.toFixed(0),
				"%"
			]
		});
	}
	const statusKey = ds.status === "extracting" ? "settings.models.localModels.status.extracting" : "settings.models.localModels.status.verifying";
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
		className: "local-models-table__status-text cb-shining-text",
		children: [t(statusKey), ds.status !== "extracting" && ` ${ds.progress.toFixed(0)}%`]
	});
}
function LocalModelRow({ model, system, engineVariant, engineReady, engineNeedsUpdate, engineDeploying, runningModelName, onStartDownload, onPauseDownload, onStartEngineDownload, onToggleEnabled, onDeleteModel }) {
	const t = useTranslation();
	const reqDetail = model.requirements ? buildRequirementsDetailJsx(model.requirements, system, engineVariant, t, model.fileSize) : void 0;
	const handleToggleEnabled = (0, import_react$1.useCallback)((modelId, enabled) => {
		const proceedToRunningCheck = () => {
			if (enabled && runningModelName) {
				Modal.confirm({
					title: t("settings.models.localModels.runtime.switchConfirm.title"),
					content: t("settings.models.localModels.runtime.switchConfirm.content", {
						current: runningModelName,
						target: model.name
					}),
					okText: t("settings.models.localModels.runtime.switchConfirm.ok"),
					cancelText: t("settings.models.localModels.runtime.switchConfirm.cancel"),
					onOk: () => onToggleEnabled(modelId, enabled)
				});
				return;
			}
			onToggleEnabled(modelId, enabled);
		};
		if (enabled && isRequirementsUnmet(model.requirements, system, engineVariant)) {
			Modal.confirm({
				title: t("settings.models.localModels.runtime.unmetConfirm.title"),
				content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { children: t("settings.models.localModels.runtime.unmetConfirm.content") }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					style: { marginTop: 8 },
					children: buildRequirementsDetailJsx(model.requirements, system, engineVariant, t, model.fileSize)
				})] }),
				okText: t("settings.models.localModels.runtime.unmetConfirm.ok"),
				cancelText: t("settings.models.localModels.runtime.unmetConfirm.cancel"),
				onOk: proceedToRunningCheck
			});
			return;
		}
		proceedToRunningCheck();
	}, [
		model.requirements,
		model.name,
		system,
		engineVariant,
		runningModelName,
		t,
		onToggleEnabled
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "local-models-table__row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "local-models-table__col local-models-table__col--name",
				children: [reqDetail && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Popover, {
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "local-models-table__req-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbInfoIcon, { size: "sm" })
					}),
					triggerMode: "hover",
					placement: "top",
					hasArrow: true,
					portalRoot: "inline",
					children: reqDetail
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "local-models-table__name-text",
					children: model.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "local-models-table__col local-models-table__col--desc",
				children: model.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "local-models-table__col local-models-table__col--status",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusCell, {
					model,
					engineReady,
					engineNeedsUpdate,
					engineDeploying,
					onStartDownload,
					onPauseDownload,
					onStartEngineDownload,
					onToggleEnabled: handleToggleEnabled,
					onDeleteModel,
					t
				})
			})
		]
	});
}
function StatusCell({ model, engineReady, engineNeedsUpdate, engineDeploying, onStartDownload, onPauseDownload, onStartEngineDownload, onToggleEnabled, onDeleteModel, t }) {
	const ds = model.deployStatus;
	if (ds) {
		if ("status" in ds) switch (ds.status) {
			case "preparing_env": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "local-models-table__status-text cb-shining-text",
				children: t("settings.models.localModels.status.preparingEngine")
			});
			case "downloading": {
				const speedText = ds.speed != null && ds.speed > 0 ? ` ${formatSpeed(ds.speed)},` : "";
				return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
					className: "local-models-table__status-loading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
						content: t("settings.models.localModels.runtime.pauseTooltip"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "local-models-runtime-info__icon-btn",
							onClick: () => onPauseDownload(model.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CirclePauseIcon, { size: "sm" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
						className: "local-models-table__status-text cb-shining-text",
						children: [
							t("settings.models.localModels.status.downloading"),
							speedText,
							" ",
							ds.progress.toFixed(0),
							"%"
						]
					})]
				});
			}
			case "verifying": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "local-models-table__status-text cb-shining-text",
				children: [
					t("settings.models.localModels.status.verifying"),
					" ",
					ds.progress.toFixed(0),
					"%"
				]
			});
			case "extracting": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "local-models-table__status-text cb-shining-text",
				children: t("settings.models.localModels.status.extracting")
			});
			case "failed": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "local-models-table__status-loading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
					content: t("settings.models.localModels.runtime.retryTooltip"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						type: "button",
						className: "local-models-runtime-info__icon-btn",
						onClick: () => onStartDownload(model.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, { size: "sm" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "local-models-table__status-failed",
					children: t(getFailedStatusKey(ds.reason))
				})]
			});
			case "paused": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: t("settings.models.localModels.status.continuePausedTooltip"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "local-models-runtime-info__icon-btn",
					onClick: () => onStartDownload(model.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, { size: "sm" })
				})
			});
		}
	}
	if (engineDeploying) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
		className: "local-models-table__status-text cb-shining-text",
		children: t("settings.models.localModels.status.preparingEngine")
	});
	if (!model.ready) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
		content: t("settings.models.localModels.runtime.downloadTooltip"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "local-models-runtime-info__icon-btn",
			onClick: () => onStartDownload(model.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, { size: "sm" })
		})
	});
	if (!engineReady) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
		content: t("settings.models.localModels.runtime.downloadTooltip"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "local-models-runtime-info__icon-btn",
			onClick: onStartEngineDownload,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadTrayIcon, { size: "sm" })
		})
	});
	const showModelUpdate = model.needsUpdate;
	const showEngineUpdate = !showModelUpdate && engineNeedsUpdate;
	const deleteTooltip = model.deleteError ? t("settings.models.localModels.status.deleteFailed") : t("settings.models.localModels.runtime.deleteTooltip");
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
		className: "local-models-table__downloaded-actions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
				checked: model.enabled,
				onChange: (e) => onToggleEnabled(model.id, e.target.checked),
				size: "small"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: deleteTooltip,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "local-models-runtime-info__icon-btn",
					onClick: () => onDeleteModel(model.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, { size: "sm" })
				})
			}),
			showModelUpdate && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: t("settings.models.localModels.status.update"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "local-models-runtime-info__icon-btn",
					onClick: () => onStartDownload(model.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbUpdateIcon, { size: "sm" })
				})
			}),
			showEngineUpdate && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: t("settings.models.localModels.runtime.updateEngineTooltip"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "local-models-runtime-info__icon-btn",
					onClick: onStartEngineDownload,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbUpdateIcon, { size: "sm" })
				})
			})
		]
	});
}
var import_react$1, import_jsx_runtime$1;
var init_LocalModelsSection = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_use_local_models();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-models/index.ts
var init_local_models = __esmMin((() => {
	init_LocalModelsSection();
	init_use_local_models();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ModelsSettingsPanel.tsx
/**
* Issue #75224：新增模型时的空表单初始值——不预选任何 provider。
* 此前默认预选腾讯云 Token Plan，海外版体验不佳；改为 Provider 展示为空，
* 由用户主动选择 provider 后（handleProviderSelect）再填充对应默认值。
*/
function buildEmptyModelFormState() {
	return {
		providerId: void 0,
		modelId: "",
		endpoint: "",
		apiKey: "",
		supportsToolCall: false,
		supportsImages: false,
		supportsReasoning: false,
		onlyReasoning: false,
		canDisableThinking: true,
		defaultEffort: "",
		supportedEfforts: [],
		useCustomProtocol: false,
		maxInputTokens: "",
		maxOutputTokens: ""
	};
}
function parseOptionalInteger(value) {
	if (!value.trim()) return;
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function formatTokenPresetLabel(value) {
	if (value >= 1024 && value % 1024 === 0) return `${value / 1024}K`;
	return String(value);
}
function isCustomEndpointValid(endpoint) {
	if (!endpoint.trim()) return true;
	try {
		const parsed = new URL(endpoint.trim());
		return parsed.protocol === "http:" || parsed.protocol === "https:";
	} catch {
		return false;
	}
}
function sanitizeApiKeyInput(apiKey) {
	return apiKey.replace(/\s+/gu, "");
}
function isApiKeyCharacterSetValid(apiKey) {
	if (!apiKey) return true;
	return API_KEY_VISIBLE_ASCII_PATTERN.test(apiKey);
}
function getTestConnectionErrorMessage(errorCode, t) {
	const key = errorCode ? `settings.models.testConnection.error.${errorCode}` : "settings.models.testConnection.defaultError";
	const translated = t(key);
	return translated === key ? t("settings.models.testConnection.defaultError") : translated;
}
function formatProviderLabel(provider) {
	return tLocalized(provider.displayName);
}
function getProviderIcon(provider) {
	if (provider.iconUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: provider.iconUrl,
		alt: "",
		className: "models-settings-panel__provider-icon-image"
	});
	if (provider.icon && PROVIDER_ICON_MAP[provider.icon]) return PROVIDER_ICON_MAP[provider.icon];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbCreditsIcon, {});
}
function getDefaultLocalCustomModelsDisplayPath() {
	const dataFolderName = document.body?.getAttribute("data-data-folder-name");
	const userDataDir = dataFolderName && dataFolderName.trim() ? dataFolderName.trim() : isWorkBuddy() ? ".workbuddy" : ".codebuddy";
	return (typeof navigator !== "undefined" ? navigator.platform.toLowerCase() : "").includes("win") ? `%USERPROFILE%\\${userDataDir}\\models.json` : `~/${userDataDir}/models.json`;
}
function formatLocalCustomModelsDisplayPath(filePath) {
	const normalizedPath = filePath.trim().replace(/\\/g, "/");
	if (!normalizedPath) return getDefaultLocalCustomModelsDisplayPath();
	const isWindows = (typeof navigator !== "undefined" ? navigator.platform.toLowerCase() : "").includes("win");
	const match = normalizedPath.match(/\/(\.[^/]+)\/models\.json$/);
	if (match) {
		const dirName = match[1];
		return isWindows ? `%USERPROFILE%\\${dirName}\\models.json` : `~/${dirName}/models.json`;
	}
	const homePathMatch = filePath.match(/^(?:[A-Za-z]:)?[\\/](?:Users|home)[\\/][^\\/]+[\\/](.+)$/);
	if (homePathMatch?.[1]) {
		const relativePath = homePathMatch[1].replace(/\\/g, "/");
		return isWindows ? `%USERPROFILE%\\${relativePath.replace(/\//g, "\\")}` : `~/${relativePath}`;
	}
	return filePath;
}
function toFileUrl(filePath) {
	const normalizedPath = filePath.replace(/\\/g, "/");
	const base = normalizedPath.startsWith("/") ? `file://${normalizedPath}` : `file:///${normalizedPath}`;
	return new URL(base).toString();
}
/**
* 把策略守卫拒绝时的 `reason` 映射成 `settings.models.policy.<reason>` i18n key。
*
* 与 `apps/workbuddy-desktop/src/main/runtime/member-custom-model-policy-types.ts`
* 中 `PolicyReason` 一一对应。`undefined` / 未识别值统一兜底到 `invalidMode`。
*/
function reasonToI18nKey(reason) {
	switch (reason) {
		case "DISABLED": return "settings.models.policy.disabled";
		case "NOT_IN_WHITELIST": return "settings.models.policy.notInWhitelist";
		case "IN_BLACKLIST": return "settings.models.policy.inBlacklist";
		default: return "settings.models.policy.invalidMode";
	}
}
/**
* 从守卫抛出的错误中尝试取出 `reason`。
* 主进程 `MemberCustomModelPolicyError.reason` 走 RPC 时会被序列化为普通对象的 `reason` 字段
* （error.code === 'MEMBER_CUSTOM_MODEL_POLICY_DENIED'）。
*/
function extractPolicyReason(error) {
	if (!error || typeof error !== "object") return;
	const { code, reason } = error;
	if (typeof reason !== "string") return;
	if (code === "MEMBER_CUSTOM_MODEL_POLICY_DENIED") return reason;
	return [
		"DISABLED",
		"NOT_IN_WHITELIST",
		"IN_BLACKLIST",
		"INVALID_MODE"
	].includes(reason) ? reason : void 0;
}
function ModelsSettingsPanel({ subRoute }) {
	const adapter = useAdapter();
	const t = useTranslation();
	const reasoningEffortOptions = (0, import_react.useMemo)(() => getReasoningEffortOptions(t), [t]);
	const { switchTab } = useSettings();
	const customModelSettingsConfig = useLocalCustomModelSettingsConfig(adapter);
	const enterprisePolicy = useAgentServices()?.enterprisePolicy;
	const [models, setModels] = (0, import_react.useState)([]);
	const [configPath, setConfigPath] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [editorVisible, setEditorVisible] = (0, import_react.useState)(false);
	const [editingModel, setEditingModel] = (0, import_react.useState)(null);
	const hideDefaultProvider = useProductFeature("CustomModelHideDefaultProvider", { mode: "enable" });
	const [formState, setFormState] = (0, import_react.useState)(hideDefaultProvider ? buildEmptyModelFormState() : buildDefaultModelFormValue());
	const [showApiKey, setShowApiKey] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isTestingConnection, setIsTestingConnection] = (0, import_react.useState)(false);
	const [testConnectionError, setTestConnectionError] = (0, import_react.useState)(null);
	const [testingModelId, setTestingModelId] = (0, import_react.useState)(null);
	const [failedConnectionModelIds, setFailedConnectionModelIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [pendingOverwriteRequest, setPendingOverwriteRequest] = (0, import_react.useState)(null);
	/**
	* 「企业成员个人自定义模型」策略快照。
	* - undefined：尚未拉取；按"允许"渲染避免初始闪烁，对应代码默认走 allowed 分支。
	* - allowed=false：UI 必须置灰 add / edit 入口、显示 banner、阻断保存。
	*
	* 直接订阅 renderer 侧共享 subject `memberCustomModelPolicy$`，与聊天输入区
	* 「模型下拉框」同源；本面板的刷新通过 `publishMemberCustomModelPolicy` 广播，
	* 任一处刷新都会让双方即时同步，避免跨组件树状态不一致。
	*/
	const [policy, setPolicy] = (0, import_react.useState)(() => memberCustomModelPolicy$.value);
	(0, import_react.useEffect)(() => {
		const sub = memberCustomModelPolicy$.subscribe(setPolicy);
		return () => sub.unsubscribe();
	}, []);
	const policyAllowed = policy?.allowed ?? true;
	const policyReasonKey = policy && !policy.allowed ? reasonToI18nKey(policy.reason) : void 0;
	const providerGroups = (0, import_react.useMemo)(() => getProviderGroups(customModelSettingsConfig), [customModelSettingsConfig]);
	const providers = (0, import_react.useMemo)(() => getProviders(customModelSettingsConfig), [customModelSettingsConfig]);
	const selectedProvider = (0, import_react.useMemo)(() => getProviderById(formState.providerId, customModelSettingsConfig), [customModelSettingsConfig, formState.providerId]);
	const selectedModelOption = (0, import_react.useMemo)(() => getProviderModelOption(formState.providerId, formState.modelId.trim(), customModelSettingsConfig), [
		customModelSettingsConfig,
		formState.modelId,
		formState.providerId
	]);
	const normalizedApiKey = (0, import_react.useMemo)(() => sanitizeApiKeyInput(formState.apiKey), [formState.apiKey]);
	const hasInvalidApiKeyCharacters = (0, import_react.useMemo)(() => selectedProvider?.authMode === "apiKey" && normalizedApiKey.length > 0 && !isApiKeyCharacterSetValid(normalizedApiKey), [normalizedApiKey, selectedProvider]);
	const providerSelectOptions = (0, import_react.useMemo)(() => providerGroups.flatMap((group) => {
		const groupProviders = providers.filter((provider) => provider.groupId === group.id).map((provider) => ({
			value: provider.id,
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "models-settings-panel__provider-option",
				children: [getProviderIcon(provider), formatProviderLabel(provider)]
			})
		}));
		if (groupProviders.length === 0) return [];
		return [{
			label: tLocalized(group.label),
			options: groupProviders
		}];
	}), [
		providerGroups,
		providers,
		t
	]);
	const sortedModels = (0, import_react.useMemo)(() => [...models].sort((left, right) => {
		const leftProvider = getProviderDisplayName(left, customModelSettingsConfig);
		const rightProvider = getProviderDisplayName(right, customModelSettingsConfig);
		if (leftProvider !== rightProvider) return leftProvider.localeCompare(rightProvider);
		return (left.name || left.id).localeCompare(right.name || right.id);
	}), [customModelSettingsConfig, models]);
	const loadModels = (0, import_react.useCallback)(async () => {
		if (!adapter?.getLocalCustomModels) {
			setIsLoading(false);
			return;
		}
		try {
			setIsLoading(true);
			const result = await adapter.getLocalCustomModels();
			setModels((result.models || []).filter(isValidLocalCustomModel));
			setConfigPath(result.path || "");
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to load local custom models:", error);
			toast.error(t("settings.models.toast.loadError"));
		} finally {
			setIsLoading(false);
		}
	}, [adapter, t]);
	(0, import_react.useEffect)(() => {
		loadModels();
	}, [loadModels]);
	(0, import_react.useEffect)(() => {
		const handler = () => {
			loadModels();
		};
		window.addEventListener("agent-ui:local-model-toggled", handler);
		return () => window.removeEventListener("agent-ui:local-model-toggled", handler);
	}, [loadModels]);
	(0, import_react.useEffect)(() => {
		if (!enterprisePolicy) return;
		let cancelled = false;
		const refresh = async () => {
			try {
				const next = await enterprisePolicy.refreshMemberCustomModelPolicy();
				if (!cancelled && next) publishMemberCustomModelPolicy(next);
			} catch (error) {
				console.warn("[ModelsSettingsPanel] Failed to load member custom model policy:", error);
			}
		};
		refresh();
		return () => {
			cancelled = true;
		};
	}, [enterprisePolicy]);
	const updateFormState = (0, import_react.useCallback)((patch) => {
		setFormState((prev) => ({
			...prev,
			...patch
		}));
		setTestConnectionError(null);
	}, []);
	const handleCreate = (0, import_react.useCallback)(() => {
		if (!policyAllowed) {
			toast.error(t(policyReasonKey ?? "settings.models.policy.invalidMode"));
			return;
		}
		setEditingModel(null);
		setFormState(hideDefaultProvider ? buildEmptyModelFormState() : buildDefaultModelFormValue(void 0, customModelSettingsConfig));
		setShowApiKey(false);
		setTestConnectionError(null);
		setEditorVisible(true);
	}, [
		customModelSettingsConfig,
		hideDefaultProvider,
		policyAllowed,
		policyReasonKey,
		t
	]);
	(0, import_react.useEffect)(() => {
		if (subRoute === "new" && !editorVisible) {
			handleCreate();
			switchTab("models");
		}
	}, [
		editorVisible,
		handleCreate,
		subRoute,
		switchTab
	]);
	(0, import_react.useEffect)(() => {
		if (!editorVisible) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") setEditorVisible(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [editorVisible]);
	const handleEdit = (0, import_react.useCallback)((model) => {
		if (!policyAllowed) {
			toast.error(t(policyReasonKey ?? "settings.models.policy.invalidMode"));
			return;
		}
		setFailedConnectionModelIds((previous) => {
			if (!previous.has(model.id)) return previous;
			const next = new Set(previous);
			next.delete(model.id);
			return next;
		});
		const providerId = inferProviderIdFromLocalCustomModel(model, customModelSettingsConfig);
		const provider = getProviderById(providerId, customModelSettingsConfig);
		const option = getProviderModelOption(providerId, model.id, customModelSettingsConfig);
		const providerCapabilityDefaults = getProviderCapabilityDefaults(provider);
		const knownReasoningDefaults = getKnownModelReasoningDefaults({
			providerId,
			modelId: model.id
		}, customModelSettingsConfig);
		const supportsReasoning = model.supportsReasoning ?? option?.supportsReasoning ?? (knownReasoningDefaults ? true : providerCapabilityDefaults.supportsReasoning);
		const reasoningDefaults = getProviderModelReasoningDefaults(provider, option, supportsReasoning);
		setEditingModel(model);
		setFormState({
			providerId,
			modelId: model.id,
			endpoint: model.url || provider?.endpoint || "",
			apiKey: model.apiKey || "",
			supportsToolCall: model.supportsToolCall ?? option?.supportsTools ?? providerCapabilityDefaults.supportsToolCall,
			supportsImages: model.supportsImages ?? option?.supportsImages ?? providerCapabilityDefaults.supportsImages,
			supportsReasoning,
			onlyReasoning: supportsReasoning ? model.onlyReasoning ?? reasoningDefaults.onlyReasoning : false,
			canDisableThinking: model.reasoning?.canDisableThinking ?? reasoningDefaults.canDisableThinking,
			defaultEffort: model.reasoning?.defaultEffort ?? model.reasoning?.effort ?? knownReasoningDefaults?.defaultEffort ?? reasoningDefaults.defaultEffort,
			supportedEfforts: model.reasoning?.supportedEfforts ? [...model.reasoning.supportedEfforts] : knownReasoningDefaults?.supportedEfforts ?? reasoningDefaults.supportedEfforts,
			useCustomProtocol: model.useCustomProtocol ?? false,
			maxInputTokens: model.maxInputTokens ? String(model.maxInputTokens) : "",
			maxOutputTokens: model.maxOutputTokens ? String(model.maxOutputTokens) : ""
		});
		setShowApiKey(false);
		setTestConnectionError(null);
		setEditorVisible(true);
	}, [
		customModelSettingsConfig,
		policyAllowed,
		policyReasonKey,
		t
	]);
	const handleProviderSelect = (0, import_react.useCallback)((providerId) => {
		setEditingModel(null);
		setFormState(buildDefaultModelFormValue(providerId, customModelSettingsConfig));
		setShowApiKey(false);
		setTestConnectionError(null);
	}, [customModelSettingsConfig]);
	(0, import_react.useEffect)(() => {
		if (!subRoute?.startsWith("edit/") || isLoading) return;
		const targetModelId = decodeURIComponent(subRoute.slice(5));
		const targetModel = models.find((model) => model.id === targetModelId);
		if (targetModel && (!editorVisible || editingModel?.id !== targetModel.id)) handleEdit(targetModel);
		switchTab("models");
	}, [
		editingModel?.id,
		editorVisible,
		handleEdit,
		isLoading,
		models,
		subRoute,
		switchTab
	]);
	const handleModelIdChange = (0, import_react.useCallback)((nextModelId) => {
		const provider = getProviderById(formState.providerId, customModelSettingsConfig);
		const option = getProviderModelOption(formState.providerId, nextModelId, customModelSettingsConfig);
		const knownReasoningDefaults = getKnownModelReasoningDefaults({
			providerId: formState.providerId,
			modelId: nextModelId
		}, customModelSettingsConfig);
		const nextSupportsReasoning = option?.supportsReasoning ?? (knownReasoningDefaults ? true : formState.supportsReasoning);
		const reasoningDefaults = knownReasoningDefaults ?? getProviderModelReasoningDefaults(provider, option, nextSupportsReasoning);
		updateFormState({
			modelId: nextModelId,
			supportsToolCall: option?.supportsTools ?? formState.supportsToolCall,
			supportsImages: option?.supportsImages ?? formState.supportsImages,
			supportsReasoning: nextSupportsReasoning,
			...nextSupportsReasoning ? {
				onlyReasoning: reasoningDefaults.onlyReasoning,
				defaultEffort: reasoningDefaults.defaultEffort,
				supportedEfforts: reasoningDefaults.supportedEfforts,
				canDisableThinking: reasoningDefaults.canDisableThinking
			} : {
				onlyReasoning: false,
				defaultEffort: "",
				supportedEfforts: [],
				canDisableThinking: true
			}
		});
	}, [
		customModelSettingsConfig,
		formState.providerId,
		formState.supportsImages,
		formState.supportsReasoning,
		formState.supportsToolCall,
		updateFormState
	]);
	const applyResult = (0, import_react.useCallback)((result) => {
		setModels((result.models || []).filter(isValidLocalCustomModel));
		setConfigPath(result.path || "");
		window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: result }));
	}, []);
	const buildSaveRequest = (0, import_react.useCallback)(() => {
		if (!selectedProvider) {
			toast.error(t("settings.models.toast.selectProvider"));
			return null;
		}
		const modelId = formState.modelId.trim();
		const endpoint = (selectedProvider.endpointMode === "readonly" ? selectedProvider.endpoint : formState.endpoint)?.trim() || "";
		const apiKey = sanitizeApiKeyInput(formState.apiKey);
		if (!modelId) {
			toast.error(t("settings.models.toast.modelRequired"));
			return null;
		}
		if (!endpoint) {
			toast.error(t("settings.models.toast.endpointRequired"));
			return null;
		}
		if (selectedProvider.endpointMode === "editable" && !isCustomEndpointValid(endpoint)) {
			toast.error(t("settings.models.toast.endpointInvalid"));
			return null;
		}
		if (selectedProvider.authMode === "apiKey" && !apiKey) {
			toast.error(t("settings.models.toast.apiKeyRequired"));
			return null;
		}
		if (selectedProvider.authMode === "apiKey" && !isApiKeyCharacterSetValid(apiKey)) {
			toast.error(t("settings.models.toast.apiKeyInvalid"));
			return null;
		}
		const baseModel = editingModel ? { ...editingModel } : {};
		const baseName = selectedModelOption?.displayName || modelId;
		const nextModel = {
			...baseModel,
			id: modelId,
			name: buildProviderModelDisplayName(selectedProvider, baseName),
			vendor: selectedProvider.vendor,
			url: endpoint,
			apiKey: selectedProvider.authMode === "none" ? void 0 : apiKey
		};
		if (selectedProvider.savePolicy === "autoFromModel") {
			applyAutoFromModelOptionDefaults(nextModel, selectedModelOption);
			const supportsReasoning = nextModel.supportsReasoning ?? false;
			const reasoningDefaults = getProviderModelReasoningDefaults(selectedProvider, selectedModelOption, supportsReasoning);
			nextModel.onlyReasoning = reasoningDefaults.onlyReasoning || void 0;
			nextModel.reasoning = reasoningDefaults.reasoning;
		} else if (selectedProvider.showCapabilitiesInForm) {
			nextModel.supportsToolCall = formState.supportsToolCall;
			nextModel.supportsImages = formState.supportsImages;
			nextModel.supportsReasoning = formState.supportsReasoning || !!getKnownModelReasoningDefaults({
				providerId: selectedProvider.id,
				modelId
			}, customModelSettingsConfig);
		}
		if (selectedProvider.showCapabilitiesInForm) {
			nextModel.useCustomProtocol = formState.useCustomProtocol;
			if (nextModel.supportsReasoning) {
				const knownReasoningDefaults = getKnownModelReasoningDefaults({
					providerId: selectedProvider.id,
					modelId
				}, customModelSettingsConfig);
				nextModel.onlyReasoning = formState.onlyReasoning || knownReasoningDefaults?.onlyReasoning || void 0;
				const reasoning = {};
				const defaultEffort = formState.defaultEffort || knownReasoningDefaults?.defaultEffort;
				const supportedEfforts = formState.supportedEfforts.length > 0 ? formState.supportedEfforts : knownReasoningDefaults?.supportedEfforts;
				if (defaultEffort) reasoning.defaultEffort = defaultEffort;
				if (supportedEfforts && supportedEfforts.length > 0) reasoning.supportedEfforts = supportedEfforts;
				if (!formState.canDisableThinking) reasoning.canDisableThinking = false;
				nextModel.reasoning = Object.keys(reasoning).length > 0 ? reasoning : void 0;
			} else {
				nextModel.onlyReasoning = void 0;
				nextModel.reasoning = void 0;
			}
		}
		if (selectedProvider.advancedConfigMode !== "hidden") {
			nextModel.maxInputTokens = parseOptionalInteger(formState.maxInputTokens);
			nextModel.maxOutputTokens = parseOptionalInteger(formState.maxOutputTokens);
		}
		return {
			model: nextModel,
			previousId: editingModel?.id,
			visible: true
		};
	}, [
		editingModel,
		formState.apiKey,
		formState.endpoint,
		formState.maxInputTokens,
		formState.maxOutputTokens,
		formState.modelId,
		formState.supportsImages,
		formState.supportsReasoning,
		formState.supportsToolCall,
		formState.useCustomProtocol,
		formState.onlyReasoning,
		formState.canDisableThinking,
		formState.defaultEffort,
		formState.supportedEfforts,
		selectedModelOption,
		selectedProvider,
		t
	]);
	const persistModel = (0, import_react.useCallback)(async (request) => {
		if (!adapter?.saveLocalCustomModel) {
			toast.error(t("settings.models.toast.unsupported"));
			return;
		}
		try {
			setIsSaving(true);
			const result = await adapter.saveLocalCustomModel(request);
			applyResult(result);
			setEditorVisible(false);
			setEditingModel(null);
			setPendingOverwriteRequest(null);
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to save local custom model:", error);
			const policyReason = extractPolicyReason(error);
			if (policyReason) {
				toast.error(t(reasonToI18nKey(policyReason)));
				setEditorVisible(false);
				setEditingModel(null);
				setPendingOverwriteRequest(null);
			} else toast.error(t("settings.models.toast.saveError"));
		} finally {
			setIsSaving(false);
		}
	}, [
		adapter,
		applyResult,
		t
	]);
	const handleSave = (0, import_react.useCallback)(async () => {
		const request = buildSaveRequest();
		if (!request) return;
		if (enterprisePolicy) try {
			const next = await enterprisePolicy.refreshMemberCustomModelPolicy();
			if (next) {
				publishMemberCustomModelPolicy(next);
				if (!next.allowed) {
					toast.error(t(reasonToI18nKey(next.reason)));
					setEditorVisible(false);
					setEditingModel(null);
					return;
				}
			}
		} catch (error) {
			console.warn("[ModelsSettingsPanel] last-mile policy check failed; continuing with main-side guard as fallback", error);
		}
		if (models.find((model) => model.id === request.model.id && model.id !== editingModel?.id)) {
			setPendingOverwriteRequest(request);
			return;
		}
		await persistModel(request);
	}, [
		buildSaveRequest,
		editingModel?.id,
		enterprisePolicy,
		models,
		persistModel,
		t
	]);
	const handleTestConnection = (0, import_react.useCallback)(async () => {
		const request = buildSaveRequest();
		if (!request) return;
		if (!adapter?.testLocalCustomModel) {
			setTestConnectionError(t("settings.models.testConnection.unsupported"));
			toast.error(t("settings.models.toast.testConnectionFailed"));
			return;
		}
		try {
			setIsTestingConnection(true);
			setTestConnectionError(null);
			const result = await adapter.testLocalCustomModel(request.model);
			if (result.ok) {
				toast.success(t("settings.models.toast.testConnectionSuccess"));
				return;
			}
			setTestConnectionError(getTestConnectionErrorMessage(result.errorCode, t));
			toast.error(t("settings.models.toast.testConnectionFailed"));
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to test local custom model connection:", error);
			setTestConnectionError(t("settings.models.testConnection.defaultError"));
			toast.error(t("settings.models.toast.testConnectionFailed"));
		} finally {
			setIsTestingConnection(false);
		}
	}, [
		adapter,
		buildSaveRequest,
		t
	]);
	const handleTestSavedModelConnection = (0, import_react.useCallback)(async (model) => {
		if (!adapter?.testLocalCustomModel || testingModelId) return;
		try {
			setTestingModelId(model.id);
			if ((await adapter.testLocalCustomModel(model)).ok) {
				setFailedConnectionModelIds((previous) => {
					const next = new Set(previous);
					next.delete(model.id);
					return next;
				});
				toast.success(t("settings.models.toast.testConnectionSuccess"));
				return;
			}
			setFailedConnectionModelIds((previous) => new Set(previous).add(model.id));
			toast.error(t("settings.models.toast.testConnectionFailed"));
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to test saved local custom model connection:", error);
			setFailedConnectionModelIds((previous) => new Set(previous).add(model.id));
			toast.error(t("settings.models.toast.testConnectionFailed"));
		} finally {
			setTestingModelId(null);
		}
	}, [
		adapter,
		t,
		testingModelId
	]);
	const handleDelete = (0, import_react.useCallback)(async () => {
		if (!deleteTarget) return;
		try {
			await wb.models.deleteCustom(deleteTarget.id);
			const result = await wb.models.customs();
			setModels(result.items.filter(isValidLocalCustomModel));
			window.dispatchEvent(new CustomEvent("agent-ui:custom-model-deleted", { detail: { id: deleteTarget.id } }));
			setDeleteTarget(null);
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to delete local custom model:", error);
			toast.error(t("settings.models.toast.deleteError"));
		}
	}, [deleteTarget, t]);
	const currentProviderOptions = (0, import_react.useMemo)(() => getProviderModelOptions(formState.providerId, customModelSettingsConfig), [customModelSettingsConfig, formState.providerId]);
	const modelSelectOptions = (0, import_react.useMemo)(() => {
		const currentValue = formState.modelId.trim();
		const items = currentProviderOptions.map((option) => ({
			value: option.model,
			label: option.displayName || option.model
		}));
		if (currentValue && !items.some((item) => item.value === currentValue)) items.unshift({
			value: currentValue,
			label: currentValue
		});
		return items;
	}, [currentProviderOptions, formState.modelId]);
	const configPathLabel = (0, import_react.useMemo)(() => formatLocalCustomModelsDisplayPath(configPath), [configPath]);
	const configPathTemplateParts = (0, import_react.useMemo)(() => {
		const pathToken = "__PATH__";
		const [before = "", after = ""] = t("settings.models.subtitleWithPath", { path: pathToken }).split(pathToken);
		return {
			before,
			after
		};
	}, [t]);
	const selectedProviderLinkLabel = (0, import_react.useMemo)(() => {
		if (!selectedProvider?.providerLinkUrl) return "";
		return t(selectedProvider.providerLinkKind === "purchase" ? "settings.models.providerLink.purchase" : "settings.models.providerLink.docs");
	}, [selectedProvider, t]);
	const openExternalUrl = (0, import_react.useCallback)(async (url) => {
		if (!url.trim()) return false;
		try {
			if (adapter?.openExternal) await adapter.openExternal(url);
			else window.open(url, "_blank", "noopener,noreferrer");
			return true;
		} catch (error) {
			console.error("[ModelsSettingsPanel] Failed to open external URL:", error);
			return false;
		}
	}, [adapter]);
	const handleOpenConfigFile = (0, import_react.useCallback)(async () => {
		if (!configPath.trim()) return;
		if (!adapter?.openLocalFile && !adapter?.openExternal) {
			toast.error(t("settings.models.toast.openFileError"));
			return;
		}
		try {
			if (adapter?.openLocalFile) {
				await adapter.openLocalFile(configPath, { createIfMissing: true });
				return;
			}
		} catch (error) {
			console.warn("[ModelsSettingsPanel] openLocalFile failed, falling back to file URL:", error);
		}
		if (await openExternalUrl(toFileUrl(configPath))) return;
		toast.error(t("settings.models.toast.openFileError"));
	}, [
		adapter,
		configPath,
		openExternalUrl,
		t
	]);
	const handleOpenProviderLink = (0, import_react.useCallback)(async () => {
		if (!selectedProvider?.providerLinkUrl) return;
		if (!await openExternalUrl(selectedProvider.providerLinkUrl)) toast.error(t("settings.models.toast.openProviderLinkError"));
	}, [
		openExternalUrl,
		selectedProvider,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "models-settings-panel",
		children: [
			!policyAllowed && policyReasonKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "models-settings-panel__policy-banner",
				role: "status",
				style: {
					padding: "8px 12px",
					marginBottom: "12px",
					borderRadius: "6px",
					background: "var(--cb-status-warning-background, rgba(255, 193, 7, 0.12))",
					color: "var(--cb-text-primary, inherit)",
					fontSize: "13px"
				},
				children: t(policyReasonKey)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "models-settings-panel__section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "models-settings-panel__card models-settings-panel__model-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "models-settings-panel__card-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "models-settings-panel__card-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "models-settings-panel__card-label",
								children: t("settings.models.title")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "models-settings-panel__card-desc",
								children: [
									configPathTemplateParts.before,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "models-settings-panel__card-link",
										onClick: handleOpenConfigFile,
										title: configPath,
										children: configPathLabel
									}),
									configPathTemplateParts.after
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "models-settings-panel__card-right",
							children: policyAllowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								className: "models-settings-panel__add-button",
								onClick: handleCreate,
								children: t("settings.models.add")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t(policyReasonKey ?? "settings.models.policy.invalidMode"),
								placement: "top",
								maxWidth: 320,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "medium",
									className: "models-settings-panel__add-button",
									onClick: handleCreate,
									disabled: true,
									children: t("settings.models.add")
								}) })
							})
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "models-settings-panel__divider" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "models-settings-panel__empty",
						children: t("settings.models.loading")
					})] }) : sortedModels.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "models-settings-panel__divider" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "models-settings-panel__list",
						children: sortedModels.map((model) => {
							const providerId = inferProviderIdFromLocalCustomModel(model, customModelSettingsConfig);
							const provider = getProviderById(providerId, customModelSettingsConfig);
							const providerName = provider ? formatProviderLabel(provider) : getProviderDisplayName(model, customModelSettingsConfig);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "models-settings-panel__row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "models-settings-panel__row-main",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "models-settings-panel__row-icon",
										children: getProviderIcon(provider ?? {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "models-settings-panel__row-text",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "models-settings-panel__row-name",
												children: model.name || model.id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "models-settings-panel__row-provider",
												title: providerName,
												children: providerName
											}),
											failedConnectionModelIds.has(model.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "models-settings-panel__connection-failed-badge",
												children: t("settings.models.toast.testConnectionFailed")
											}) : null
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "models-settings-panel__actions",
									children: [
										policyAllowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: t("common.edit"),
											placement: "top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "small",
												iconOnly: true,
												className: "models-settings-panel__action-button",
												onClick: () => handleEdit(model),
												"aria-label": t("common.edit"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditToolIcon, {})
											})
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: t("settings.models.actions.testConnection"),
											placement: "top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "small",
												iconOnly: true,
												className: ["models-settings-panel__action-button", testingModelId === model.id ? "models-settings-panel__action-button--testing" : ""].filter(Boolean).join(" "),
												onClick: () => handleTestSavedModelConnection(model),
												disabled: testingModelId !== null,
												"aria-label": t("settings.models.actions.testConnection"),
												children: testingModelId === model.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "models-settings-panel__test-loading-icon",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingIcon, {})
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorTabIcon, {})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: t("common.delete"),
											placement: "top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "small",
												iconOnly: true,
												className: "models-settings-panel__action-button",
												onClick: () => setDeleteTarget(model),
												"aria-label": t("common.delete"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon, {})
											})
										})
									]
								})]
							}, model.id);
						})
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModelsSection, {}),
			editorVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "models-settings-panel__editor-overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "models-settings-panel__editor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "models-settings-panel__editor-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "models-settings-panel__editor-title-group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "models-settings-panel__editor-title",
									children: editingModel ? t("settings.models.modal.editTitle") : t("settings.models.modal.addTitle")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								className: "models-settings-panel__editor-close",
								onClick: () => setEditorVisible(false),
								"aria-label": t("common.close"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "models-settings-panel__editor-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "models-settings-panel__field-grid models-settings-panel__field-grid--provider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "models-settings-panel__field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "models-settings-panel__field-header",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "models-settings-panel__label",
											children: t("settings.models.fields.provider")
										}), selectedProvider?.providerLinkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "models-settings-panel__field-link",
											onClick: handleOpenProviderLink,
											children: [selectedProviderLinkLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "models-settings-panel__field-link-icon",
												xmlns: "http://www.w3.org/2000/svg",
												width: "16",
												height: "16",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													fill: "currentColor",
													fillOpacity: "0.7",
													transform: "matrix(1 0 0 1 2.57586 2.39996)",
													d: "M9.8242 6.6L9.8242 5.109Q9.8243 3.3049 9.7462 2.7322Q9.7081 2.4536 9.6375 2.2353L0.8485 11.0243L0 10.1758L8.789 1.3868Q8.5706 1.3161 8.292 1.2781Q7.7193 1.1999 5.9153 1.2L4.4243 1.2L4.4243 0L5.9152 0Q7.8008 -0.0001 8.4543 0.0891Q9.5761 0.2422 10.179 0.8452Q10.782 1.4482 10.9351 2.5699Q11.0243 3.2234 11.0243 5.109L11.0243 6.6L9.8242 6.6Z",
													fillRule: "evenodd"
												})
											})]
										})]
									}), selectedProvider?.endpointMode === "readonly" && selectedProvider?.endpoint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: selectedProvider.endpoint,
										placement: "top",
										maxWidth: 420,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "models-settings-panel__provider-tooltip-target",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
												value: formState.providerId,
												options: providerSelectOptions,
												onChange: (nextProviderId) => {
													if (nextProviderId) handleProviderSelect(nextProviderId);
												},
												showSearch: providers.length > 6,
												placeholder: t("settings.models.fields.providerPlaceholder"),
												fullWidth: true,
												className: "models-settings-panel__provider-select"
											}, `provider-select-${editingModel?.id || "new"}-${formState.providerId || "none"}`)
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: formState.providerId,
										options: providerSelectOptions,
										onChange: (nextProviderId) => {
											if (nextProviderId) handleProviderSelect(nextProviderId);
										},
										showSearch: providers.length > 6,
										placeholder: t("settings.models.fields.providerPlaceholder"),
										fullWidth: true,
										className: "models-settings-panel__provider-select"
									}, `provider-select-${editingModel?.id || "new"}-${formState.providerId || "none"}`)]
								}), selectedProvider?.endpointMode === "editable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "models-settings-panel__field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "models-settings-panel__label",
										children: t("settings.models.fields.endpoint")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										status: !isCustomEndpointValid(formState.endpoint) ? "error" : void 0,
										value: formState.endpoint,
										onChange: (event) => updateFormState({ endpoint: event.target.value }),
										placeholder: t("settings.models.fields.endpointPlaceholder")
									})]
								})]
							}), editorVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "models-settings-panel__model-form-fields",
								children: [
									(selectedProvider?.authMode ?? "apiKey") === "apiKey" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "models-settings-panel__field models-settings-panel__field--api-key",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "models-settings-panel__label",
												children: t("settings.models.fields.apiKey")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "models-settings-panel__api-key-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "models-settings-panel__api-key-input",
													status: hasInvalidApiKeyCharacters ? "error" : void 0,
													value: formState.apiKey,
													type: showApiKey ? "text" : "password",
													onChange: (event) => updateFormState({ apiKey: sanitizeApiKeyInput(event.target.value) }),
													placeholder: t("settings.models.fields.apiKeyPlaceholder"),
													spellCheck: false,
													autoCapitalize: "off",
													autoCorrect: "off",
													suffix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														size: "small",
														variant: "ghost",
														iconOnly: true,
														className: "models-settings-panel__input-icon-button",
														onClick: () => setShowApiKey((prev) => !prev),
														"aria-label": showApiKey ? t("settings.models.actions.hide") : t("settings.models.actions.show"),
														title: showApiKey ? t("settings.models.actions.hide") : t("settings.models.actions.show"),
														children: showApiKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbEyeOpenIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbEyeCloseIcon, {})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "secondary",
													className: "models-settings-panel__editor-test-connection",
													onClick: handleTestConnection,
													leftIcon: isTestingConnection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "models-settings-panel__test-loading-icon",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingIcon, {})
													}) : void 0,
													disabled: isSaving || isTestingConnection,
													children: isTestingConnection ? t("settings.models.actions.testConnectionTesting") : t("settings.models.actions.testConnection")
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "models-settings-panel__api-key-feedback",
												children: hasInvalidApiKeyCharacters ? t("settings.models.validation.apiKeyCharacters") : testConnectionError
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "models-settings-panel__hint",
										children: t("settings.models.fields.noApiKeyNeeded")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "models-settings-panel__field models-settings-panel__field--model-id",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "models-settings-panel__label",
											children: t("settings.models.fields.modelId")
										}), selectedProvider?.modelInputMode === "selectOrInput" && currentProviderOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: formState.modelId,
											options: modelSelectOptions,
											onChange: (nextModelId) => {
												if (nextModelId) handleModelIdChange(nextModelId);
											},
											showSearch: currentProviderOptions.length > 6,
											searchPlaceholder: t("settings.models.modal.modelSearchPlaceholder"),
											placeholder: t("settings.models.fields.modelIdPlaceholder"),
											fullWidth: true,
											viewportPadding: isHostWindows() ? { top: 56 } : void 0,
											className: "models-settings-panel__model-select"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: formState.modelId,
											onChange: (event) => handleModelIdChange(event.target.value),
											placeholder: t("settings.models.fields.modelIdPlaceholder")
										})]
									}),
									selectedProvider && selectedProvider.advancedConfigMode !== "hidden" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "models-settings-panel__advanced",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "models-settings-panel__advanced-heading",
											children: t("settings.models.fields.advanced")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "models-settings-panel__advanced-body",
											children: [
												selectedProvider.showCapabilitiesInForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "models-settings-panel__checkbox-grid models-settings-panel__checkbox-grid--inline",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.supportsToolCall,
																onChange: (event) => updateFormState({ supportsToolCall: event.target.checked })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.toolsDescription"),
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.tools")
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.supportsImages,
																onChange: (event) => updateFormState({ supportsImages: event.target.checked })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.imagesDescription"),
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.images")
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.supportsReasoning,
																onChange: (event) => {
																	const checked = event.target.checked;
																	updateFormState({
																		supportsReasoning: checked,
																		...checked ? {} : {
																			onlyReasoning: false,
																			defaultEffort: "",
																			supportedEfforts: [],
																			canDisableThinking: true
																		}
																	});
																}
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.reasoningDescription"),
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.reasoning")
																})
															})]
														}),
														formState.supportsReasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.onlyReasoning,
																onChange: (event) => updateFormState({ onlyReasoning: event.target.checked })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.onlyReasoningDescription") ?? "Model only supports reasoning mode; UI hides the Off toggle.",
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.onlyReasoning") ?? "Reasoning only"
																})
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.canDisableThinking,
																onChange: (event) => updateFormState({ canDisableThinking: event.target.checked })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.canDisableThinkingDescription") ?? "Allow users to turn off reasoning. Disable for models like GPT-5 family that route through Responses API.",
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.canDisableThinking") ?? "Can disable thinking"
																})
															})]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.useCustomProtocol,
																onChange: (event) => updateFormState({ useCustomProtocol: event.target.checked })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																content: t("settings.models.capability.customProtocolDescription"),
																placement: "top",
																maxWidth: 320,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "models-settings-panel__checkbox-title",
																	children: t("settings.models.capability.customProtocol")
																})
															})]
														})
													]
												}),
												selectedProvider?.showCapabilitiesInForm && formState.supportsReasoning && formState.supportedEfforts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "models-settings-panel__hint",
													children: t("settings.models.fields.supportedEffortsEmptyHint")
												}),
												selectedProvider?.showCapabilitiesInForm && formState.supportsReasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "models-settings-panel__field",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "models-settings-panel__label",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
															content: t("settings.models.fields.defaultEffortDescription") ?? "Default reasoning effort when thinking is enabled. Empty = let request layer pick a default.",
															placement: "top",
															maxWidth: 320,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "models-settings-panel__tooltip-label",
																children: t("settings.models.fields.defaultEffort") ?? "Default effort"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
														value: formState.defaultEffort,
														options: [{
															value: "",
															label: t("settings.models.fields.defaultEffortAuto") ?? "Auto (use request-layer default)"
														}, ...reasoningEffortOptions.map((option) => ({
															value: option.value,
															label: option.label
														}))],
														onChange: (value) => updateFormState({ defaultEffort: value }),
														fullWidth: true,
														className: "models-settings-panel__effort-select"
													})]
												}),
												selectedProvider?.showCapabilitiesInForm && formState.supportsReasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "models-settings-panel__field",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "models-settings-panel__label",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
															content: t("settings.models.fields.supportedEffortsDescription") ?? "Effort levels shown in the model selector. Empty means only on/off is supported.",
															placement: "top",
															maxWidth: 320,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "models-settings-panel__tooltip-label",
																children: t("settings.models.fields.supportedEfforts") ?? "Supported efforts"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "models-settings-panel__checkbox-grid",
														children: reasoningEffortOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "models-settings-panel__checkbox-item",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: formState.supportedEfforts.includes(option.value),
																onChange: (event) => {
																	const next = event.target.checked ? [...formState.supportedEfforts, option.value] : formState.supportedEfforts.filter((value) => value !== option.value);
																	updateFormState({ supportedEfforts: next });
																}
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "models-settings-panel__checkbox-title",
																children: option.label
															})]
														}, option.value))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "models-settings-panel__number-grid",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "models-settings-panel__field",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "models-settings-panel__label",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																	content: t("settings.models.fields.maxInputTokensDescription"),
																	placement: "top",
																	maxWidth: 320,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "models-settings-panel__tooltip-label",
																		children: t("settings.models.fields.inputTokensShort")
																	})
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																type: "number",
																min: "0",
																step: "1",
																inputMode: "numeric",
																value: formState.maxInputTokens,
																placeholder: t("settings.models.fields.tokenLimitPlaceholder"),
																onChange: (event) => updateFormState({ maxInputTokens: event.target.value })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "models-settings-panel__quick-values",
																children: MAX_INPUT_TOKEN_PRESETS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	type: "button",
																	size: "small",
																	variant: formState.maxInputTokens === String(value) ? "secondary" : "ghost",
																	className: "models-settings-panel__quick-value",
																	onClick: () => updateFormState({ maxInputTokens: String(value) }),
																	children: formatTokenPresetLabel(value)
																}, `max-input-${value}`))
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "models-settings-panel__field",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "models-settings-panel__label",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
																	content: t("settings.models.fields.maxOutputTokensDescription"),
																	placement: "top",
																	maxWidth: 320,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "models-settings-panel__tooltip-label",
																		children: t("settings.models.fields.outputTokensShort")
																	})
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																type: "number",
																min: "0",
																step: "1",
																inputMode: "numeric",
																value: formState.maxOutputTokens,
																placeholder: t("settings.models.fields.tokenLimitPlaceholder"),
																onChange: (event) => updateFormState({ maxOutputTokens: event.target.value })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "models-settings-panel__quick-values",
																children: MAX_OUTPUT_TOKEN_PRESETS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	type: "button",
																	size: "small",
																	variant: formState.maxOutputTokens === String(value) ? "secondary" : "ghost",
																	className: "models-settings-panel__quick-value",
																	onClick: () => updateFormState({ maxOutputTokens: String(value) }),
																	children: formatTokenPresetLabel(value)
																}, `max-output-${value}`))
															})
														]
													})]
												})
											]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "models-settings-panel__editor-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "models-settings-panel__editor-cancel",
								onClick: () => setEditorVisible(false),
								disabled: isTestingConnection,
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								className: "models-settings-panel__editor-save",
								onClick: handleSave,
								loading: isSaving,
								disabled: isTestingConnection,
								children: t("common.save")
							})]
						})
					]
				})
			}),
			deleteTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "models-settings-panel__delete-overlay",
				onClick: () => setDeleteTarget(null),
				role: "presentation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "models-settings-panel__delete-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "models-delete-dialog-title",
					onClick: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "models-delete-dialog-title",
							className: "models-settings-panel__delete-title",
							children: t("settings.models.delete.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "models-settings-panel__delete-content",
							children: t("settings.models.delete.description", { model: deleteTarget.name || deleteTarget.id || "" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "models-settings-panel__delete-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "models-settings-panel__delete-cancel",
								onClick: () => setDeleteTarget(null),
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								danger: true,
								className: "models-settings-panel__delete-action",
								onClick: handleDelete,
								children: t("common.delete")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				visible: !!pendingOverwriteRequest,
				title: t("settings.models.overwrite.title"),
				content: t("settings.models.overwrite.description", { model: pendingOverwriteRequest?.model.id || "" }),
				confirmText: t("settings.models.overwrite.confirm"),
				cancelText: t("common.cancel"),
				onClose: () => setPendingOverwriteRequest(null),
				onConfirm: () => {
					if (pendingOverwriteRequest) persistModel(pendingOverwriteRequest);
				}
			})
		]
	});
}
var import_react, import_jsx_runtime, UPDATE_EVENT_NAME, MAX_INPUT_TOKEN_PRESETS, MAX_OUTPUT_TOKEN_PRESETS, API_KEY_VISIBLE_ASCII_PATTERN, PROVIDER_ICON_MAP;
//#endregion
__esmMin((() => {
	init_ModelsSettingsPanel$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_ollama();
	init_openrouter();
	init_tencent_cloud();
	init_contexts();
	init_use_product_feature();
	init_useI18n();
	init_app_providers();
	init_use_member_custom_model_policy();
	init_environment();
	init_icons();
	init_SettingsContext();
	init_auto_from_model_defaults();
	init_defaults();
	init_localized_text();
	init_reasoning_effort_options();
	init_useLocalCustomModelSettingsConfig();
	init_local_models();
	import_jsx_runtime = require_jsx_runtime();
	UPDATE_EVENT_NAME = "agent-ui:custom-models-updated";
	MAX_INPUT_TOKEN_PRESETS = [
		32768,
		65536,
		131072,
		262144
	];
	MAX_OUTPUT_TOKEN_PRESETS = [
		8192,
		16384,
		32768,
		65536
	];
	API_KEY_VISIBLE_ASCII_PATTERN = /^[\x21-\x7E]+$/;
	PROVIDER_ICON_MAP = {
		"tencent-cloud": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: tencent_cloud_default,
			alt: "",
			className: "models-settings-panel__provider-icon-image"
		}),
		"glm": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GLMIcon, {}),
		"kimi": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiBrandIcon, {}),
		"minimax": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimaxIcon, {}),
		"deepseek": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeepSeekIcon, {}),
		"openai": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenAIIcon, {}),
		"gemini": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeminiIcon, {}),
		"openrouter": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: openrouter_default,
			alt: "",
			className: "models-settings-panel__provider-icon-image"
		}),
		"mistral": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MistralIcon, {}),
		"groq": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroqIcon, {}),
		"together-ai": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TogetherAIIcon, {}),
		"fireworks-ai": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FireworksAIIcon, {}),
		"perplexity": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerplexityIcon, {}),
		"ollama": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: ollama_default,
			alt: "",
			className: "models-settings-panel__provider-icon-image"
		}),
		"custom": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbCreditsIcon, {})
	};
}))();
export { ModelsSettingsPanel };
