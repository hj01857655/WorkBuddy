import { r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, $w as WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, HV as PendingIcon, I1 as t, PC as init_hooks, QV as LoaderIcon, RH as CheckIcon, RV as RefreshCwIcon, j1 as init_i18n, tT as useBodyClassRefCount, wH as CircleXIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { Mt as createStore, Nt as init_vanilla, Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
//#region ../../packages/agent-ui/src/components/network-check/store.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
init_src();
init_i18n();
init_icons();
init_hooks();
var import_zustand = require_zustand();
init_vanilla();
var initialState = {
	visible: false,
	running: false,
	result: null,
	error: null,
	runSeq: 0
};
var networkCheckStore = createStore((set, get) => ({
	...initialState,
	open: () => {
		set({ visible: true });
	},
	close: () => {
		set({ visible: false });
	},
	hydrate: (result) => {
		if (!result) return;
		const current = get().result;
		if (current && current.checkedAt >= result.checkedAt) return;
		set({
			result,
			error: null
		});
	},
	reset: () => {
		set({ ...initialState });
	},
	openAndRunIfNeeded: async (adapter) => {
		set({ visible: true });
		if (get().result || get().running) return;
		await get().run(adapter);
	},
	run: async (adapter) => {
		const nextSeq = get().runSeq + 1;
		set({
			running: true,
			error: null,
			runSeq: nextSeq
		});
		try {
			const result = await adapter.runDiagnostics();
			if (get().runSeq !== nextSeq) return;
			set({
				running: false,
				result,
				error: null
			});
		} catch (err) {
			if (get().runSeq !== nextSeq) return;
			set({
				running: false,
				error: err instanceof Error ? err.message : String(err)
			});
		}
	}
}));
/**
* React hook mirror of `networkCheckStore` — matches `useConnectorStore`.
*/
var useNetworkCheckStore = (selector) => (0, import_zustand.useStore)(networkCheckStore, selector);
//#endregion
//#region ../../packages/agent-ui/src/components/network-check/network-check-modal.tsx
var NetworkCheckModal = ({ adapter }) => {
	const visible = useNetworkCheckStore((state) => state.visible);
	const running = useNetworkCheckStore((state) => state.running);
	const result = useNetworkCheckStore((state) => state.result);
	const error = useNetworkCheckStore((state) => state.error);
	const close = useNetworkCheckStore((state) => state.close);
	const run = useNetworkCheckStore((state) => state.run);
	/**
	* 弹窗覆盖在 topbar 之上：打开时给 body 打标记，让 topbar 让出窗口拖拽区（#56837 同源）。
	*
	* Windows frameless 下 `.workbuddy-topbar` 是 `-webkit-app-region: drag !important`，
	* 原生窗口拖拽按**几何位置**判定，会把落入该区域的弹窗顶部控件（关闭按钮 / 重新检测）
	* 判为可拖拽并吞掉鼠标事件；给弹窗自身加 `no-drag` 压不过 topbar 的 `!important`，
	* 必须反向让 topbar 让出拖拽区。macOS 事件派发机制不同，不复现。
	*
	* 与 `self-check-modal`（MR #89876）完全同源修复 #77958。
	*/
	useBodyClassRefCount(WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, visible);
	const handleOverlayClick = (0, import_react.useCallback)((e) => {
		if (e.target === e.currentTarget) close();
	}, [close]);
	const handleRerun = (0, import_react.useCallback)(() => {
		run(adapter).catch(() => {});
	}, [adapter, run]);
	const handleOpenReportDirectory = (0, import_react.useCallback)(() => {
		if (!result?.report?.directory || !adapter.openReportDirectory) return;
		Promise.resolve(adapter.openReportDirectory(result.report.directory)).catch((err) => {
			const message = err instanceof Error ? err.message : String(err);
			toast({
				message: t("networkCheck.report.openFailed", { error: message }),
				type: "error"
			});
		});
	}, [adapter, result]);
	const handleRevealReportFile = (0, import_react.useCallback)(() => {
		if (!result?.report?.filePath || !adapter.revealReportFile) return;
		Promise.resolve(adapter.revealReportFile(result.report.filePath)).catch((err) => {
			const message = err instanceof Error ? err.message : String(err);
			toast({
				message: t("networkCheck.report.revealFailed", { error: message }),
				type: "error"
			});
		});
	}, [adapter, result]);
	const handleExportReport = (0, import_react.useCallback)(async () => {
		if (!result?.report?.content || !adapter.exportReport) return;
		const defaultFileName = suggestExportFileName(result.report.fileName);
		try {
			const saved = await adapter.exportReport(result.report.content, defaultFileName);
			if (saved?.filePath) toast({
				message: t("networkCheck.report.exportSuccess", { path: saved.filePath }),
				type: "info"
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			toast({
				message: t("networkCheck.report.exportFailed", { error: message }),
				type: "error"
			});
		}
	}, [adapter, result]);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [visible, close]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "network-check-modal-overlay",
		onClick: handleOverlayClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "network-check-modal",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "network-check-modal__close",
					onClick: close,
					"aria-label": t("networkCheck.close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 4L4 12M4 4L12 12",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "network-check-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "network-check-modal__heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "network-check-modal__title",
							children: t("networkCheck.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "network-check-modal__subtitle",
							children: getSubtitle({
								running,
								result,
								error
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "network-check-modal__actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "network-check-modal__rerun-btn",
							onClick: handleRerun,
							disabled: running,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCwIcon, { className: running ? "network-check-modal__spin" : void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? t("networkCheck.checking") : t("networkCheck.rerun") })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "network-check-modal__body",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "network-check-modal__error-banner",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewGroup, {
							running,
							result
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetGroup, { result }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecksGroup, {
							running,
							result
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportGroup, {
							result,
							canOpenDirectory: !!adapter.openReportDirectory,
							canRevealFile: !!adapter.revealReportFile,
							canExport: !!adapter.exportReport,
							onOpenDirectory: handleOpenReportDirectory,
							onRevealFile: handleRevealReportFile,
							onExport: handleExportReport
						})
					]
				})
			]
		})
	});
};
var OverviewGroup = ({ running, result }) => {
	let status;
	let description;
	if (running && !result) {
		status = "running";
		description = t("networkCheck.overview.summaryChecking");
	} else if (!result) {
		status = "pending";
		description = t("networkCheck.overview.summaryPending");
	} else {
		status = result.overallStatus;
		description = localizeSummary(result.overallSummary);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "network-check-modal__group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "network-check-modal__group-title",
			children: t("networkCheck.overview.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			title: t("networkCheck.overview.healthTitle"),
			description,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })
		})]
	});
};
var TargetGroup = ({ result }) => {
	const endpointValue = result?.target.endpoint;
	const endpointDesc = !result ? t("networkCheck.target.endpointPending") : result.target.baseEndpoint && result.target.baseEndpoint !== result.target.endpoint ? t("networkCheck.target.endpointOverride") : t("networkCheck.target.endpointResolved");
	const hostValue = result ? `${result.target.host}:${result.target.port}` : void 0;
	const hostDesc = result ? `${(result.target.protocol || "").toUpperCase()} · ${result.target.prefixPath || "—"} · ${result.target.platform || "—"}` : t("networkCheck.target.hostPending");
	const proxyValue = result ? localizeProxyModeWithUrl(result.target.proxyMode, result.target.proxyUrl) : void 0;
	const proxyDesc = !result ? t("networkCheck.target.proxyPending") : result.target.proxyUrl ? t("networkCheck.target.proxyResolvedDesc") : t("networkCheck.target.proxyNotConfiguredDesc");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "network-check-modal__group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "network-check-modal__group-title",
				children: t("networkCheck.target.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: t("networkCheck.target.endpoint"),
				description: endpointDesc,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueText, { value: endpointValue })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: t("networkCheck.target.host"),
				description: hostDesc,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueText, { value: hostValue })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: t("networkCheck.target.proxyMode"),
				description: proxyDesc,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueText, { value: proxyValue })
			})
		]
	});
};
var ChecksGroup = ({ running, result }) => {
	const items = [
		{
			key: "proxy",
			title: t("networkCheck.checks.proxy.title"),
			defaultDescription: t("networkCheck.checks.proxy.description")
		},
		{
			key: "hosts",
			title: t("networkCheck.checks.hosts.title"),
			defaultDescription: t("networkCheck.checks.hosts.description")
		},
		{
			key: "service",
			title: t("networkCheck.checks.service.title"),
			defaultDescription: t("networkCheck.checks.service.description")
		},
		{
			key: "tcp",
			title: t("networkCheck.checks.tcp.title"),
			defaultDescription: t("networkCheck.checks.tcp.description")
		},
		{
			key: "packetLoss",
			title: t("networkCheck.checks.packetLoss.title"),
			defaultDescription: t("networkCheck.checks.packetLoss.description")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "network-check-modal__group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "network-check-modal__group-title",
			children: t("networkCheck.checks.title")
		}), items.map((item) => {
			const check = result?.[item.key] ?? null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
				title: item.title,
				defaultDescription: item.defaultDescription,
				running: running && !check,
				check
			}, item.key);
		})]
	});
};
var ReportGroup = ({ result, canOpenDirectory, canRevealFile, canExport, onOpenDirectory, onRevealFile, onExport }) => {
	const directory = result?.report.directory;
	const fileName = result?.report.fileName;
	const hasReportContent = !!result?.report.content;
	const hasReportFile = !!result?.report.filePath && !result.report.error;
	const latestDescription = result?.report.error ? t("networkCheck.report.writeFailed", { error: result.report.error }) : fileName ?? t("networkCheck.report.filePending");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "network-check-modal__group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "network-check-modal__group-title",
				children: t("networkCheck.report.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: t("networkCheck.report.directoryLabel"),
				description: directory ?? t("networkCheck.report.directoryPending"),
				action: directory && canOpenDirectory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "network-check-modal__report-link",
					onClick: onOpenDirectory,
					children: t("networkCheck.report.openDirectory")
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: t("networkCheck.report.fileLabel"),
				description: latestDescription,
				action: hasReportFile && canRevealFile || hasReportContent && canExport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "network-check-modal__report-actions",
					children: [hasReportContent && canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "network-check-modal__report-link",
						onClick: onExport,
						children: t("networkCheck.report.export")
					}), hasReportFile && canRevealFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "network-check-modal__report-link",
						onClick: onRevealFile,
						children: t("networkCheck.report.locateFile")
					})]
				}) : void 0
			})
		]
	});
};
var Row = ({ title, description, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "network-check-modal__section",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "network-check-modal__section-main",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "network-check-modal__section-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "network-check-modal__section-title",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "network-check-modal__section-desc",
				children: description
			})]
		}), action !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "network-check-modal__section-action",
			children: action
		})]
	})
});
var ValueText = ({ value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	className: "network-check-modal__value",
	title: value || void 0,
	children: value ?? t("networkCheck.valuePlaceholder")
});
var CheckRow = ({ title, defaultDescription, running, check }) => {
	const status = running ? "running" : check ? check.status : "pending";
	const description = check ? localizeSummary(check.summary) : defaultDescription;
	const valueText = check ? localizeValue(check.value) : void 0;
	const durationText = typeof check?.durationMs === "number" ? t("networkCheck.durationMs", { ms: String(check.durationMs) }) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "network-check-modal__section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "network-check-modal__section-main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "network-check-modal__section-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "network-check-modal__section-title",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "network-check-modal__section-desc",
					children: description
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "network-check-modal__section-action",
				children: [
					valueText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "network-check-modal__value-meta",
						children: valueText
					}),
					durationText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "network-check-modal__value-meta",
						children: durationText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })
				]
			})]
		})
	});
};
var StatusBadge = ({ status }) => {
	const label = t(`networkCheck.badge.${status}`);
	let icon;
	switch (status) {
		case "success":
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {});
			break;
		case "error":
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleXIcon, {});
			break;
		case "running":
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderIcon, { className: "network-check-modal__spin" });
			break;
		case "warning":
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 12 12",
				fill: "currentColor",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 1.5l5.196 9H.804L6 1.5zm0 3.2L2.874 10h6.252L6 4.7zm-.65 1.9h1.3v2.1h-1.3V6.6zm0 2.6h1.3v1h-1.3v-1z" })
			});
			break;
		default: icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingIcon, {});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `network-check-modal__badge network-check-modal__badge--${status}`,
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
};
/**
* Localize a `summary` key produced by `NetworkDiagnosticsService`. Keeping
* the service locale-agnostic lets the same payload render correctly in any
* host that consumes it (Desktop, VSCode extension, web shells, …).
*/
function localizeSummary(summaryKey) {
	if (!summaryKey) return "";
	const key = `networkCheck.summary.${summaryKey}`;
	const translated = t(key);
	return translated === key ? summaryKey : translated;
}
/**
* Localize a `value` field. Handles a short list of well-known enum-ish
* values ("HTTP OK", "Ping unavailable", "N% loss") and passes everything
* else through verbatim (endpoints, host:port, durations, etc.).
*/
function localizeValue(value) {
	if (!value) return value;
	switch (value) {
		case "HTTP OK": return t("networkCheck.value.httpOk");
		case "HTTP Failed": return t("networkCheck.value.httpFailed");
		case "Ping unavailable": return t("networkCheck.value.pingUnavailable");
		case "Packet loss unavailable": return t("networkCheck.value.packetLossUnavailable");
	}
	const packetLossMatch = /^(\d+(?:\.\d+)?)% loss$/i.exec(value);
	if (packetLossMatch) return t("networkCheck.value.packetLossPercent", { percent: packetLossMatch[1] });
	return value;
}
/**
* Localize a proxy-mode label and optionally compose it with a resolved URL
* as "<Mode> · <URL>" — same format as the VSCode fork.
*/
function localizeProxyModeWithUrl(mode, url) {
	const localized = localizeProxyMode(mode);
	return url ? `${localized} · ${url}` : localized;
}
function localizeProxyMode(mode) {
	switch (mode) {
		case "VS Code http.proxy": return t("networkCheck.proxyMode.vscode");
		case "System Proxy": return t("networkCheck.proxyMode.system");
		case "Manual Proxy": return t("networkCheck.proxyMode.manual");
		case "No Proxy": return t("networkCheck.proxyMode.none");
		default: return mode;
	}
}
function getSubtitle({ running, result, error }) {
	if (running) return t("networkCheck.subtitleRunning");
	if (error) return t("networkCheck.subtitleError");
	if (result) return t("networkCheck.subtitleDone", { time: new Date(result.checkedAt).toLocaleString() });
	return t("networkCheck.subtitlePending");
}
/**
* Build a reasonable default filename for the "Export" save dialog. Appends
* `-export` to the original filename stem so the exported copy doesn't
* collide with the auto-generated report in the reports directory.
*/
function suggestExportFileName(originalFileName) {
	const base = originalFileName || "network-diagnostics-report.txt";
	return /\.txt$/i.test(base) ? base.replace(/\.txt$/i, "-export.txt") : `${base}-export.txt`;
}
//#endregion
//#region ../../packages/agent-ui/src/components/network-check/network-check-modal-host.tsx
/**
* Host component for the Network Check modal.
*
* Follows the same pattern as `ConnectorQrModalHost` — mounted once at the app
* root (e.g. in `main.tsx`), subscribes to the modal store, and bridges
* host-side "open the modal" events (menu clicks, etc) into the store.
*
* Renderers only need:
*   <NetworkCheckModalHost adapter={myHostAdapter} />
* and do not have to care about wiring up event listeners themselves.
*/
var NetworkCheckModalHost = ({ adapter }) => {
	(0, import_react.useEffect)(() => {
		if (!adapter.onOpenFromMenu) return;
		return adapter.onOpenFromMenu(() => {
			handleOpenFromMenu(adapter).catch(() => {});
		});
	}, [adapter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkCheckModal, { adapter });
};
async function handleOpenFromMenu(adapter) {
	const state = networkCheckStore.getState();
	if (adapter.getLatestResult && !state.result) try {
		const persisted = await adapter.getLatestResult();
		if (persisted) state.hydrate(persisted);
	} catch {}
	await networkCheckStore.getState().openAndRunIfNeeded(adapter);
}
//#endregion
//#region ../../packages/agent-ui/src/components/network-check/index.ts
var network_check_exports = /* @__PURE__ */ __exportAll({ NetworkCheckModalHost: () => NetworkCheckModalHost });
//#endregion
export { networkCheckStore as a, TargetGroup as i, ChecksGroup as n, OverviewGroup as r, network_check_exports as t };
