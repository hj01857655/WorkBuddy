import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, dz as init_use_product_feature, fz as useProductFeature, gZ as useUpdateChangelogFeature, jY as init_product_features } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/update-toast/UpdateToast.less
var init_UpdateToast$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/update-toast/useUpdateToast.ts
function isForeignExplicitCheckTerminal(type, externalUpdate) {
	return externalUpdate || type === "ready" || type === "error" || type === "not-available" || type === "up-to-date" || type === "idle" || type === "disabled" || type === "uninitialized" || type === "arch-mismatch-available" || type === "arch-mismatch-ready" || type === "arch-mismatch-error";
}
/**
* 注册当前 renderer 的检查更新入口。
*
* 主窗口由 useUpdateToast 注册本地 Toast 流程；独立窗口可注册“投递到主窗口”的
* handler，确保更新提示只由主窗口展示。
*/
function registerUpdateCheckTrigger(cb) {
	_externalCheckCallback = cb;
	return () => {
		if (_externalCheckCallback === cb) _externalCheckCallback = null;
	};
}
/**
* 触发检查更新（供菜单等外部入口调用）
* 会立即让 UpdateToast 显示 checking 状态，同时通过 adapter 发送事件。
*/
function triggerCheckForUpdates() {
	_externalCheckCallback?.();
}
function useUpdateToast(adapter) {
	const [status, setStatus] = (0, import_react$1.useState)("hidden");
	const [downloadPercent, setDownloadPercent] = (0, import_react$1.useState)(0);
	const [hasReceivedProgress, setHasReceivedProgress] = (0, import_react$1.useState)(false);
	const [productVersion, setProductVersion] = (0, import_react$1.useState)(null);
	const [externalDestination, setExternalDestination] = (0, import_react$1.useState)(null);
	const [externalOpenFailed, setExternalOpenFailed] = (0, import_react$1.useState)(false);
	const internationalChangelogEnabled = useProductFeature("InternationalChangelog", {
		mode: "enable",
		defaultEnabled: false,
		missingKeyEnabled: false
	});
	const lastCheckRef = (0, import_react$1.useRef)(0);
	const dismissedExternalVersionRef = (0, import_react$1.useRef)(null);
	const statusRef = (0, import_react$1.useRef)("hidden");
	const userTriggeredRef = (0, import_react$1.useRef)(false);
	const foreignExplicitCheckRef = (0, import_react$1.useRef)(false);
	const checkTimeoutRef = (0, import_react$1.useRef)(null);
	const updateStatus = (0, import_react$1.useCallback)((newStatus) => {
		statusRef.current = newStatus;
		setStatus(newStatus);
	}, []);
	(0, import_react$1.useEffect)(() => {
		if (!adapter) return;
		let availableTimerId = null;
		const handleUpdateState = (state) => {
			if (!state || typeof state !== "object") return;
			const s = state;
			if (Boolean(s.forceUpgrade && typeof s.forceUpgrade === "object" && typeof s.forceUpgrade.targetVersion === "string" && s.forceUpgrade.targetVersion.trim())) {
				if (s.forceUpgrade?.action === "open-update-destination") {
					if (checkTimeoutRef.current) {
						clearTimeout(checkTimeoutRef.current);
						checkTimeoutRef.current = null;
					}
					userTriggeredRef.current = false;
					updateStatus("hidden");
					return;
				}
				const shouldKeepToastVisible = userTriggeredRef.current || statusRef.current === "checking" || statusRef.current === "downloading";
				if ((s.type === "downloading" || s.type === "downloaded") && shouldKeepToastVisible) {
					updateStatus("downloading");
					setProductVersion(s.update?.productVersion || s.update?.version || null);
					if (s.type === "downloaded") {
						setHasReceivedProgress(true);
						setDownloadPercent(100);
					} else if (s.progress?.percent !== void 0) {
						setHasReceivedProgress(true);
						setDownloadPercent(Math.round(s.progress.percent));
					}
					return;
				}
				if (s.type === "ready" || s.type === "error") {
					if (checkTimeoutRef.current) {
						clearTimeout(checkTimeoutRef.current);
						checkTimeoutRef.current = null;
					}
					userTriggeredRef.current = false;
					updateStatus("hidden");
					setDownloadPercent(0);
					setHasReceivedProgress(false);
					setProductVersion(null);
					return;
				}
				if (s.type === "checking" && shouldKeepToastVisible) updateStatus("checking");
				return;
			}
			const externalUpdate = (s.type === "available" || s.type === "available for download") && s.update?.action === "open-update-destination";
			const acceptExplicitHere = s.explicit === true && typeof document !== "undefined" && document.hasFocus();
			if (userTriggeredRef.current || acceptExplicitHere) {
				foreignExplicitCheckRef.current = false;
				if (acceptExplicitHere) userTriggeredRef.current = true;
			} else if (s.explicit === true || foreignExplicitCheckRef.current) {
				if (s.explicit === true) foreignExplicitCheckRef.current = true;
				if (isForeignExplicitCheckTerminal(s.type, externalUpdate)) foreignExplicitCheckRef.current = false;
				return;
			}
			if (externalUpdate) {
				const version = s.update?.productVersion || s.update?.version || null;
				if (!userTriggeredRef.current && version === dismissedExternalVersionRef.current) return;
				if (checkTimeoutRef.current) {
					clearTimeout(checkTimeoutRef.current);
					checkTimeoutRef.current = null;
				}
				userTriggeredRef.current = false;
				setProductVersion(version);
				setExternalDestination(s.update?.destination ?? "official-website");
				setExternalOpenFailed(Boolean(s.error));
				updateStatus("external-update-available");
				return;
			}
			if (s.type === "arch-mismatch-available") {
				userTriggeredRef.current = false;
				updateStatus("arch-mismatch-available");
				setDownloadPercent(0);
				setHasReceivedProgress(false);
				setProductVersion(s.update?.productVersion || s.update?.version || null);
				return;
			}
			if (s.type === "arch-mismatch-downloading") {
				userTriggeredRef.current = false;
				updateStatus("arch-mismatch-downloading");
				if (s.progress?.percent !== void 0) {
					setHasReceivedProgress(true);
					setDownloadPercent(Math.round(s.progress.percent));
				} else {
					setHasReceivedProgress(false);
					setDownloadPercent(0);
				}
				setProductVersion(s.update?.productVersion || s.update?.version || null);
				return;
			}
			if (s.type === "arch-mismatch-ready") {
				userTriggeredRef.current = false;
				updateStatus("arch-mismatch-ready");
				setDownloadPercent(100);
				setProductVersion(s.update?.productVersion || s.update?.version || null);
				return;
			}
			if (s.type === "arch-mismatch-error") {
				userTriggeredRef.current = false;
				updateStatus("arch-mismatch-error");
				return;
			}
			if (!userTriggeredRef.current) {
				if (s.type === "ready") {
					updateStatus("ready");
					setDownloadPercent(100);
					setProductVersion(s.update?.productVersion || s.update?.version || null);
				} else if (statusRef.current === "ready") updateStatus(s.type === "error" ? "error" : "hidden");
				return;
			}
			if (checkTimeoutRef.current && s.type !== "checking" && s.type !== "checking for updates") {
				clearTimeout(checkTimeoutRef.current);
				checkTimeoutRef.current = null;
			}
			switch (s.type) {
				case "checking":
				case "checking for updates":
					updateStatus("checking");
					break;
				case "available":
				case "available for download":
					setProductVersion(s.update?.productVersion || s.update?.version || null);
					if (availableTimerId) clearTimeout(availableTimerId);
					availableTimerId = setTimeout(() => {
						if (statusRef.current === "checking") {
							updateStatus("downloading");
							setDownloadPercent(0);
							setHasReceivedProgress(false);
						}
						availableTimerId = null;
					}, 1e3);
					break;
				case "downloading":
					if (availableTimerId) {
						clearTimeout(availableTimerId);
						availableTimerId = null;
					}
					updateStatus("downloading");
					if (s.progress?.percent !== void 0) {
						setHasReceivedProgress(true);
						setDownloadPercent(Math.round(s.progress.percent));
					}
					break;
				case "downloaded":
					if (availableTimerId) {
						clearTimeout(availableTimerId);
						availableTimerId = null;
					}
					updateStatus("downloading");
					setDownloadPercent(100);
					setHasReceivedProgress(true);
					setProductVersion(s.update?.productVersion || s.update?.version || null);
					break;
				case "ready":
					if (availableTimerId) {
						clearTimeout(availableTimerId);
						availableTimerId = null;
					}
					updateStatus("ready");
					setDownloadPercent(100);
					setProductVersion(s.update?.productVersion || s.update?.version || null);
					break;
				case "updating":
					if (availableTimerId) {
						clearTimeout(availableTimerId);
						availableTimerId = null;
					}
					updateStatus("downloading");
					setHasReceivedProgress(false);
					setProductVersion(s.update?.productVersion || s.update?.version || null);
					break;
				case "not-available":
				case "up-to-date":
					updateStatus("up-to-date");
					break;
				case "error":
					updateStatus("error");
					break;
				case "disabled":
				case "uninitialized":
					if (statusRef.current === "checking") updateStatus("up-to-date");
					break;
				case "idle": if (statusRef.current === "checking") {
					if (s.error) updateStatus("error");
					else updateStatus("up-to-date");
				}
			}
		};
		const unsub1 = adapter.on("update-state-changed", handleUpdateState);
		const unsub2 = adapter.on("update-state-response", handleUpdateState);
		return () => {
			unsub1();
			unsub2();
			if (availableTimerId) clearTimeout(availableTimerId);
		};
	}, [adapter]);
	const checkForUpdates = (0, import_react$1.useCallback)(() => {
		if (!adapter) return;
		const now = Date.now();
		if (now - lastCheckRef.current < CHECK_THROTTLE_MS) return;
		if (statusRef.current === "checking" || statusRef.current === "downloading" || statusRef.current === "arch-mismatch-downloading" || statusRef.current === "arch-mismatch-ready") return;
		lastCheckRef.current = now;
		userTriggeredRef.current = true;
		updateStatus("checking");
		adapter.emit("check-for-updates");
		setTimeout(() => {
			if (statusRef.current === "checking") adapter.emit("get-update-state");
		}, 2e3);
		if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
		checkTimeoutRef.current = setTimeout(() => {
			if (statusRef.current === "checking") updateStatus("error");
			checkTimeoutRef.current = null;
		}, 12e3);
	}, [adapter, updateStatus]);
	(0, import_react$1.useEffect)(() => registerUpdateCheckTrigger(checkForUpdates), [checkForUpdates]);
	(0, import_react$1.useEffect)(() => {
		if (status !== "up-to-date") return;
		userTriggeredRef.current = false;
		const timer = setTimeout(() => {
			updateStatus("hidden");
		}, UP_TO_DATE_AUTO_DISMISS_MS);
		return () => {
			clearTimeout(timer);
		};
	}, [status, updateStatus]);
	return {
		status,
		downloadPercent,
		hasReceivedProgress,
		productVersion,
		externalDestination,
		externalOpenFailed,
		checkForUpdates,
		dismiss: (0, import_react$1.useCallback)(() => {
			if (statusRef.current === "external-update-available") dismissedExternalVersionRef.current = productVersion;
			userTriggeredRef.current = false;
			updateStatus("hidden");
		}, [productVersion, updateStatus]),
		retry: (0, import_react$1.useCallback)(() => {
			lastCheckRef.current = 0;
			if (adapter) {
				userTriggeredRef.current = true;
				updateStatus("checking");
				adapter.emit("check-for-updates");
			}
		}, [adapter, updateStatus]),
		restartToUpdate: (0, import_react$1.useCallback)(() => {
			if (adapter) adapter.emit("quit-and-install");
		}, [adapter]),
		openUpdateDestination: (0, import_react$1.useCallback)(() => {
			if (adapter) adapter.emit("quit-and-install");
		}, [adapter]),
		downloadArchMismatch: (0, import_react$1.useCallback)(() => {
			if (adapter) {
				updateStatus("arch-mismatch-downloading");
				setDownloadPercent(0);
				setHasReceivedProgress(false);
				adapter.emit("arch-mismatch-download");
			}
		}, [adapter, updateStatus]),
		installArchMismatch: (0, import_react$1.useCallback)(() => {
			if (adapter) adapter.emit("arch-mismatch-install");
		}, [adapter]),
		openChangelog: (0, import_react$1.useCallback)(() => {
			const changelogUrl = internationalChangelogEnabled ? CHANGELOG_URL_INTERNATIONAL : CHANGELOG_URL_DOMESTIC;
			if (adapter?.environmentType === "local") adapter.emit("open-external", changelogUrl);
			else window.open(changelogUrl, "_blank");
		}, [adapter, internationalChangelogEnabled])
	};
}
var import_react$1, CHECK_THROTTLE_MS, UP_TO_DATE_AUTO_DISMISS_MS, CHANGELOG_URL_DOMESTIC, CHANGELOG_URL_INTERNATIONAL, _externalCheckCallback;
var init_useUpdateToast = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_product_feature();
	CHECK_THROTTLE_MS = 2e3;
	UP_TO_DATE_AUTO_DISMISS_MS = 3e3;
	CHANGELOG_URL_DOMESTIC = "https://www.codebuddy.cn/docs/workbuddy/Changelog";
	CHANGELOG_URL_INTERNATIONAL = "https://www.workbuddy.ai/docs/workbuddy/Changelog";
	_externalCheckCallback = null;
})), import_jsx_runtime, CloseIcon, SpinnerIcon, DownloadArrowIcon, UpgradeArrowIcon, CheckIcon, ErrorXIcon, UpdateToast;
var init_UpdateToast = __esmMin((() => {
	init_UpdateToast$1();
	require_react();
	init_product_features();
	init_useI18n();
	init_useUpdateToast();
	import_jsx_runtime = require_jsx_runtime();
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M18 6L6 18M6 6l12 12",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	SpinnerIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "update-toast-spinner",
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "7.5",
			cy: "7.5",
			r: "6",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeDasharray: "28 10"
		})
	});
	DownloadArrowIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 3v13m0 0l-5-5m5 5l5-5",
			stroke: "var(--cb-update-toast-brand, #4ECBA0)",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 20h14",
			stroke: "var(--cb-update-toast-brand, #4ECBA0)",
			strokeWidth: "2.5",
			strokeLinecap: "round"
		})]
	});
	UpgradeArrowIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 21V8m0 0l-5 5m5-5l5 5",
			stroke: "var(--cb-update-toast-brand, #4ECBA0)",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 4h14",
			stroke: "var(--cb-update-toast-brand, #4ECBA0)",
			strokeWidth: "2.5",
			strokeLinecap: "round"
		})]
	});
	CheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 24 24",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 13l4 4L19 7",
			stroke: "var(--cb-update-toast-brand, #4ECBA0)",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	ErrorXIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 24 24",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M18 6L6 18M6 6l12 12",
			stroke: "var(--cb-update-toast-error, #e06060)",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	UpdateToast = ({ adapter }) => {
		const t = useTranslation();
		const { status, downloadPercent, hasReceivedProgress, productVersion, externalDestination, externalOpenFailed, dismiss, retry, restartToUpdate, openUpdateDestination, downloadArchMismatch, installArchMismatch, openChangelog } = useUpdateToast(adapter);
		const isChangelogVisible = useUpdateChangelogFeature() === true;
		if (status === "hidden") return null;
		const externalMessageKey = externalOpenFailed ? "update.externalStoreOpenFailed" : externalDestination === "uos-store" ? "update.toast.externalUosAvailable" : externalDestination === "kylin-store" ? "update.toast.externalKylinAvailable" : "update.toast.externalWebsiteAvailable";
		const externalActionKey = externalOpenFailed ? "update.toast.retry" : externalDestination === "uos-store" ? "update.toast.openUosStore" : externalDestination === "kylin-store" ? "update.toast.openKylinStore" : "update.toast.openWebsite";
		const usesWideCard = status.startsWith("arch-mismatch-") || status === "external-update-available";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `update-toast update-toast--visible${usesWideCard ? " update-toast--arch-mismatch" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `update-toast-card${status === "up-to-date" ? " update-toast-card--up-to-date" : status === "error" || status === "arch-mismatch-error" ? " update-toast-card--error" : usesWideCard ? " update-toast-card--arch-mismatch" : ""}`,
				children: [
					status === "checking" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "update-toast-text",
							children: t("update.toast.checking")
						})]
					}),
					status === "downloading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadArrowIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "update-toast-text",
							children: hasReceivedProgress ? t("update.toast.downloading", { percent: String(downloadPercent) }) : t("update.toast.downloadingIndeterminate")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "update-toast-progress",
						children: hasReceivedProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-progress-fill",
							style: { width: `${downloadPercent}%` }
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "update-toast-progress-fill update-toast-progress-fill--indeterminate" })
					})] }),
					status === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeArrowIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text",
								children: t("update.toast.ready")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-right",
							children: [isChangelogVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "update-toast-btn-outline",
								onClick: openChangelog,
								children: t("update.toast.changelog")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "update-toast-btn-solid",
								onClick: restartToUpdate,
								children: t("update.toast.restart")
							})]
						})]
					})] }),
					status === "external-update-available" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeArrowIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text update-toast-text--multiline",
								children: t(externalMessageKey, { version: productVersion ?? "" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "update-toast-btn-solid",
								onClick: openUpdateDestination,
								children: t(externalActionKey)
							})
						})]
					})] }),
					status === "arch-mismatch-available" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeArrowIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text",
								title: t("update.toast.archMismatchAvailable"),
								children: t("update.toast.archMismatchAvailable")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "update-toast-btn-solid",
								onClick: downloadArchMismatch,
								children: t("update.toast.archMismatchUpgrade")
							})
						})]
					})] }),
					status === "arch-mismatch-downloading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadArrowIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "update-toast-text",
							children: hasReceivedProgress ? t("update.toast.archMismatchDownloading", { percent: String(downloadPercent) }) : t("update.toast.archMismatchDownloadingIndeterminate")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "update-toast-progress",
						children: hasReceivedProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-progress-fill",
							style: { width: `${downloadPercent}%` }
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "update-toast-progress-fill update-toast-progress-fill--indeterminate" })
					})] }),
					status === "arch-mismatch-ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeArrowIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text",
								children: t("update.toast.archMismatchReady")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "update-toast-btn-solid",
								onClick: installArchMismatch,
								children: t("update.toast.archMismatchInstall")
							})
						})]
					})] }),
					status === "arch-mismatch-error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorXIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text",
								children: t("update.toast.archMismatchFailed")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "update-toast-btn-text",
							onClick: downloadArchMismatch,
							children: t("update.toast.retry")
						})]
					})] }),
					status === "up-to-date" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "update-toast-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "update-toast-text",
							children: t("update.toast.upToDate")
						})]
					})] }),
					status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "update-toast-close",
						onClick: dismiss,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "update-toast-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "update-toast-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "update-toast-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorXIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "update-toast-text",
								children: t("update.toast.failed")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "update-toast-btn-text",
							onClick: retry,
							children: t("update.toast.retry")
						})]
					})] })
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/update-toast/index.ts
var update_toast_exports = /* @__PURE__ */ __exportAll({ UpdateToast: () => UpdateToast });
var init_update_toast = __esmMin((() => {
	init_UpdateToast();
	init_useUpdateToast();
}));
//#endregion
export { init_useUpdateToast as a, init_UpdateToast as i, update_toast_exports as n, registerUpdateCheckTrigger as o, UpdateToast as r, triggerCheckForUpdates as s, init_update_toast as t };
