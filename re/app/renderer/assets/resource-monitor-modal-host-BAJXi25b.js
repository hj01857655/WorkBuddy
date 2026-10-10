import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, $w as WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, Dz as useAssistantDisplay, E as init_contexts, E1 as init_useI18n, Ez as init_use_assistant_display, KF as humanizeBytes, O1 as useTranslation, PC as init_hooks, T1 as init_clipboard, V3 as useAdapter, V5 as message, eV as XCloseIcon, hnt as CopyIcon, krt as Button, m5 as init_src, qF as init_format_utils, tT as useBodyClassRefCount, w1 as copyToClipboard } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
/* empty css                          */
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/resource-monitor-bridge.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
/** 读取 preload 暴露的采样桥。Web 与未接线的旧版本返回 `null`，调用方据此整段不渲染。 */
function resolveResourceMonitorBridge() {
	const bridge = globalThis.__workbuddyResourceMonitor;
	if (!bridge || typeof bridge !== "object") return null;
	const candidate = bridge;
	if (typeof candidate.sample !== "function" || typeof candidate.subscribe !== "function") return null;
	return candidate;
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/format-resource.ts
var import_jsx_runtime = require_jsx_runtime();
init_src();
init_useI18n();
init_clipboard();
init_icons();
init_format_utils();
init_hooks();
/** 把 CPU 百分比格式化；`null` 走 unavailable 文案。 */
function formatCpuPercent(cpuPercent, unavailableLabel) {
	if (cpuPercent === null || !Number.isFinite(cpuPercent)) return unavailableLabel;
	return `${cpuPercent < 10 ? cpuPercent.toFixed(1) : Math.round(cpuPercent)}%`;
}
/** 「其他程序」内存占用；整机数据缺失时返回 null，不用估算值。 */
function resolveOtherAppsRss(snapshot) {
	const used = snapshot.machine.usedMemoryBytes;
	if (used === null || !Number.isFinite(used)) return null;
	return Math.max(0, used - snapshot.totalRssBytes);
}
/** 秒 → `2h 13m` / `3m 20s`，用于判断「是不是用久了才卡」。 */
function formatUptime(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "-";
	const total = Math.round(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	if (hours > 0) return `${hours}h ${minutes}m`;
	if (minutes > 0) return `${minutes}m ${total % 60}s`;
	return `${total}s`;
}
/**
* 显示宽度。CJK 在等宽字体里占两格，按 `length` 补空格会让整张表错位
* （「界面」是 2 个字符但占 4 格）。
*/
function displayWidth(value) {
	let width = 0;
	for (const char of value) {
		const code = char.codePointAt(0) ?? 0;
		width += code >= 4352 && code <= 4447 || code >= 11904 && code <= 42191 || code >= 44032 && code <= 55203 || code >= 63744 && code <= 64255 || code >= 65072 && code <= 65135 || code >= 65280 && code <= 65376 || code >= 65504 && code <= 65510 ? 2 : 1;
	}
	return width;
}
/** 右侧补空格对齐，让报告在等宽字体下成列。 */
function padEnd(value, width) {
	const pad = width - displayWidth(value);
	return pad > 0 ? value + " ".repeat(pad) : value;
}
function padStart(value, width) {
	const pad = width - displayWidth(value);
	return pad > 0 ? " ".repeat(pad) + value : value;
}
function buildDiagnosticsText(snapshot, labels, humanizeBytes) {
	const NA = labels.unavailable;
	const lines = [];
	const sampledAt = new Date(snapshot.sampledAt);
	lines.push(`## ${labels.productName || "WorkBuddy"} 资源占用诊断`);
	lines.push("");
	const env = snapshot.environment;
	lines.push("```");
	lines.push(`sampled_at   ${sampledAt.toISOString()}  (local ${sampledAt.toLocaleString()})`);
	if (env) {
		lines.push(`app_version  ${env.appVersion}${env.packaged ? "" : "  (dev build)"}`);
		lines.push(`os           ${env.os}`);
		lines.push(`uptime       ${formatUptime(env.uptimeSeconds)}`);
		lines.push(`load_avg     ${env.loadAverage === null ? NA : env.loadAverage.join(" / ")}`);
	} else {
		lines.push(`app_version  ${NA}`);
		lines.push(`os           ${NA}`);
	}
	const otherRss = resolveOtherAppsRss(snapshot);
	const totalMemory = snapshot.machine.totalMemoryBytes;
	lines.push(`cpu_cores    ${snapshot.machine.cpuCoreCount ?? NA}`);
	lines.push(`mem_total    ${totalMemory === null ? NA : humanizeBytes(totalMemory)}`);
	lines.push(`mem_wb       ${humanizeBytes(snapshot.totalRssBytes)}` + (totalMemory ? `  (${(snapshot.totalRssBytes / totalMemory * 100).toFixed(2)}% of machine)` : ""));
	lines.push(`mem_others   ${otherRss === null ? NA : humanizeBytes(otherRss)}`);
	lines.push(`cpu_wb       ${formatCpuPercent(snapshot.totalCpuPercent, NA)}${snapshot.cpuPartial ? "  (partial: some processes unavailable)" : ""}`);
	lines.push(`processes    ${snapshot.processCount}`);
	lines.push("```");
	lines.push("");
	lines.push("### 按模块");
	lines.push("");
	lines.push("```");
	lines.push(`${padEnd("module", 16)}${padStart("proc", 5)}${padStart("memory", 12)}${padStart("cpu", 10)}`);
	for (const usage of snapshot.modules) lines.push(padEnd(labels.categoryLabel(usage.category), 16) + padStart(String(usage.processCount), 5) + padStart(humanizeBytes(usage.rssBytes), 12) + padStart(formatCpuPercent(usage.cpuPercent, NA), 10) + (usage.cpuPartial ? "  *" : ""));
	lines.push("```");
	if (snapshot.processes.length > 0) {
		lines.push("");
		lines.push("### 进程明细");
		lines.push("");
		lines.push("```");
		lines.push(`${padStart("pid", 7)}  ${padEnd("module", 14)}${padStart("memory", 11)}${padStart("cpu", 9)}  command`);
		for (const detail of snapshot.processes) lines.push(padStart(String(detail.pid), 7) + "  " + padEnd(labels.categoryLabel(detail.category), 14) + padStart(humanizeBytes(detail.rssBytes), 11) + padStart(formatCpuPercent(detail.cpuPercent, NA), 9) + `  ${detail.commandLine}`);
		lines.push("```");
	}
	if (snapshot.cpuPartial) {
		lines.push("");
		lines.push("> `*` 标记的模块内存在 CPU 采样失败的进程，其 CPU 合计偏低。");
	}
	return lines.join("\n");
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/module-table.tsx
/**
* 按模块拆分的占用表格。列宽用 grid 固定，数值刷新时不能让列宽和行高跳动；
* CPU 为 null 渲染成不可用标记，绝不显示 0%。
*/
function ModuleTable({ modules }) {
	const t = useTranslation();
	const unavailable = t("settings.resourceMonitor.unavailable");
	if (modules.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wb-resource__table",
		role: "table",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-resource__row wb-resource__row--head",
			role: "row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "columnheader",
					children: t("settings.resourceMonitor.table.module")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "columnheader",
					children: t("settings.resourceMonitor.table.processCount")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "columnheader",
					children: t("settings.resourceMonitor.table.memory")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "columnheader",
					children: t("settings.resourceMonitor.table.cpu")
				})
			]
		}), modules.map((usage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-resource__row",
			role: "row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__cell-name",
					role: "cell",
					children: resolveCategoryLabel(t, usage.category)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__cell-num",
					role: "cell",
					children: t("settings.resourceMonitor.table.processUnit", { count: String(usage.processCount) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__cell-num",
					role: "cell",
					children: humanizeBytes(usage.rssBytes)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__cell-num",
					role: "cell",
					children: formatCpuPercent(usage.cpuPercent, unavailable)
				})
			]
		}, usage.category))]
	});
}
/** 分类 → 展示文案。枚举值是内部标识，文案走 i18n，改词不触碰分类规则。 */
function resolveCategoryLabel(t, category) {
	return t(`settings.resourceMonitor.category.${category}`);
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/copy-diagnostics-button.tsx
/**
* 复制诊断信息按钮。用户吐槽现场最有价值的动作是把现场带走，一段可粘贴的纯文本比截图
* 和让用户翻日志目录都现实。
*/
init_useI18n();
init_format_utils();
function CopyDiagnosticsButton({ snapshot, productName }) {
	const t = useTranslation();
	const handleClick = (0, import_react.useCallback)(async () => {
		const text = buildDiagnosticsText(snapshot, {
			unavailable: t("settings.resourceMonitor.unavailable"),
			categoryLabel: (category) => resolveCategoryLabel(t, category),
			productName
		}, humanizeBytes);
		if (await copyToClipboard(text)) message.success(t("settings.resourceMonitor.copySuccess"));
		else message.error(t("settings.resourceMonitor.copyFailed"));
	}, [
		snapshot,
		t,
		productName
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "wb-resource__copy",
		variant: "secondary",
		size: "small",
		leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon, {}),
		onClick: handleClick,
		children: t("settings.resourceMonitor.copyDiagnostics")
	});
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/resource-overview.tsx
/**
* 整机对照区块，回答「是不是你们占的」。视觉对齐 `storage/storage-overview.tsx`。
* 整机数据读不到时隐藏对照段只显示自身占用；CPU 采不到显示不可用标记而非 0%。
*/
init_useI18n();
init_format_utils();
function ResourceOverview({ snapshot, productName }) {
	const t = useTranslation();
	const unavailable = t("settings.resourceMonitor.unavailable");
	const selfLabel = productName ?? t("settings.resourceMonitor.legend.self");
	const totalMemory = snapshot.machine.totalMemoryBytes;
	const otherRss = resolveOtherAppsRss(snapshot);
	const hasComparison = totalMemory !== null && totalMemory > 0 && otherRss !== null;
	const toPercent = (value) => {
		if (totalMemory === null || totalMemory <= 0) return 0;
		return Math.max(0, Math.min(100, value / totalMemory * 100));
	};
	const selfPercent = toPercent(snapshot.totalRssBytes);
	const otherPercent = otherRss === null ? 0 : toPercent(otherRss);
	const cpuSelf = formatCpuPercent(snapshot.totalCpuPercent, unavailable);
	const freeMemory = totalMemory !== null && snapshot.machine.usedMemoryBytes !== null ? Math.max(0, totalMemory - snapshot.machine.usedMemoryBytes) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wb-resource__overview",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-resource__metric",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-resource__metric-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__metric-name",
					children: t("settings.resourceMonitor.memory")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__metric-value",
					children: hasComparison ? t("settings.resourceMonitor.memoryBreakdown", {
						name: selfLabel,
						self: humanizeBytes(snapshot.totalRssBytes),
						other: humanizeBytes(otherRss),
						free: freeMemory === null ? unavailable : humanizeBytes(freeMemory)
					}) : t("settings.resourceMonitor.memorySelfOnly", {
						name: selfLabel,
						self: humanizeBytes(snapshot.totalRssBytes)
					})
				})]
			}), hasComparison && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-resource__progress",
				role: "img",
				"aria-label": t("settings.resourceMonitor.progressAriaLabel"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__progress-seg wb-resource__progress-seg--self",
					style: { width: `${selfPercent}%` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__progress-seg wb-resource__progress-seg--other",
					style: { width: `${otherPercent}%` }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-resource__legend",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "self",
						label: selfLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "other",
						label: t("settings.resourceMonitor.legend.other")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "free",
						label: t("settings.resourceMonitor.legend.free")
					})
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-resource__metric",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-resource__metric-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__metric-name",
					children: t("settings.resourceMonitor.cpu")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-resource__metric-value",
					children: t("settings.resourceMonitor.cpuSelfOnly", {
						name: selfLabel,
						self: cpuSelf
					})
				})]
			}), snapshot.cpuPartial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wb-resource__hint",
				children: t("settings.resourceMonitor.cpuPartialHint")
			})]
		})]
	});
}
function LegendItem({ tone, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "wb-resource__legend-item",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `wb-resource__legend-dot wb-resource__legend-dot--${tone}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/use-product-name.ts
init_contexts();
init_use_assistant_display();
function useResourceProductName() {
	const adapter = useAdapter();
	const { name } = useAssistantDisplay(adapter);
	return name ? name : null;
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/use-resource-data.ts
/**
* 资源占用数据 hook。生命周期即「面板可见才采样」：挂载订阅（主进程启动周期采样），
* 卸载退订。这条约束不能破，否则诊断卡顿的功能自己成了卡顿来源。
*/
function useResourceData(bridge) {
	const [snapshot, setSnapshot] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		let unsubscribe = null;
		const attach = () => {
			if (unsubscribe || !mountedRef.current) return;
			bridge.sample().then((initial) => {
				if (mountedRef.current) {
					setSnapshot(initial);
					setLoading(false);
				}
			}).catch((err) => {
				if (mountedRef.current) {
					setError(String(err?.message ?? err));
					setLoading(false);
				}
			});
			unsubscribe = bridge.subscribe((next) => {
				if (!mountedRef.current) return;
				setSnapshot(next);
				setLoading(false);
				setError(null);
			});
		};
		const detach = () => {
			unsubscribe?.();
			unsubscribe = null;
		};
		const syncByVisibility = () => {
			if (typeof document === "undefined") {
				attach();
				return;
			}
			if (document.visibilityState === "hidden") detach();
			else attach();
		};
		syncByVisibility();
		document?.addEventListener?.("visibilitychange", syncByVisibility);
		return () => {
			mountedRef.current = false;
			document?.removeEventListener?.("visibilitychange", syncByVisibility);
			detach();
		};
	}, [bridge]);
	return {
		snapshot,
		loading,
		error
	};
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/index.tsx
init_useI18n();
function ResourceBody({ bridge }) {
	const t = useTranslation();
	const { snapshot, loading, error } = useResourceData(bridge);
	const productName = useResourceProductName();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wb-resource__card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-resource__card-title-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wb-resource__card-title",
					children: t("settings.resourceMonitor.cardTitle")
				}), snapshot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyDiagnosticsButton, {
					snapshot,
					productName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wb-resource__desc",
				children: productName ? t("settings.resourceMonitor.description", { name: productName }) : t("settings.resourceMonitor.descriptionNoBrand")
			}),
			loading && !snapshot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wb-resource__placeholder",
				children: t("settings.resourceMonitor.loading")
			}),
			error && !snapshot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wb-resource__error",
				role: "alert",
				children: t("settings.resourceMonitor.error")
			}),
			snapshot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceOverview, {
					snapshot,
					productName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "wb-resource__divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleTable, { modules: snapshot.modules })
			] })
		]
	});
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/resource-monitor-modal.tsx
init_useI18n();
function ResourceMonitorModal({ bridge, onClose }) {
	const t = useTranslation();
	useBodyClassRefCount(WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, true);
	(0, import_react.useEffect)(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "self-check-modal-overlay",
		onClick: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-modal",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "self-check-modal__close",
					onClick: onClose,
					"aria-label": t("common.close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XCloseIcon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "self-check-modal__header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "self-check-modal__title",
							children: t("settings.resourceMonitor.title")
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wb-resource wb-resource--modal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceBody, { bridge })
				})
			]
		})
	});
}
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/resource/resource-monitor-modal-host.tsx
/**
* 资源占用弹窗的常驻宿主，订阅菜单事件后开窗。形态对齐 self-check 的 modal host：
* host 常驻但不渲染内容，只在开窗时挂载弹窗，使采样随之启停、未打开时零开销。
*/
function ResourceMonitorModalHost({ onOpenFromMenu }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const bridge = (0, import_react.useMemo)(() => resolveResourceMonitorBridge(), []);
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	(0, import_react.useEffect)(() => {
		if (!onOpenFromMenu || !bridge) return;
		return onOpenFromMenu(() => setOpen(true));
	}, [onOpenFromMenu, bridge]);
	if (!open || !bridge) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceMonitorModal, {
		bridge,
		onClose: close
	});
}
//#endregion
export { ResourceMonitorModalHost };
