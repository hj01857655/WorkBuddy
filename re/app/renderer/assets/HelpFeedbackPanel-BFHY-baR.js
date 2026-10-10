import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, HF as DEBUG_HUB_EVENT, K2 as init_environment, O1 as useTranslation, Q2 as isOverseas, UF as init_debug_hub_event, V3 as useAdapter, dz as init_use_product_feature, fz as useProductFeature, krt as Button, m5 as init_src, n4 as resolveProductVersion } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { s as triggerCheckForUpdates, t as init_update_toast } from "./update-toast-CQ2GsaP4.js";
import { t as init_HelpFeedbackPanel$1 } from "./HelpFeedbackPanel-DSuuk64D.js";
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-official-account.jpg
var qrcode_workbuddy_official_account_default;
var init_qrcode_workbuddy_official_account = __esmMin((() => {
	qrcode_workbuddy_official_account_default = "" + new URL("qrcode-workbuddy-official-account-D1-ZA3Oa.jpg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-tencent-channel.png
var qrcode_workbuddy_tencent_channel_default;
var init_qrcode_workbuddy_tencent_channel = __esmMin((() => {
	qrcode_workbuddy_tencent_channel_default = "" + new URL("qrcode-workbuddy-tencent-channel-CZJ1kNkO.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-video-account.jpg
var qrcode_workbuddy_video_account_default;
var init_qrcode_workbuddy_video_account = __esmMin((() => {
	qrcode_workbuddy_video_account_default = "" + new URL("qrcode-workbuddy-video-account-D4GHmKfO.jpg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/CrashTestModal.tsx
function CrashTestModal({ visible, onClose }) {
	const [results, setResults] = (0, import_react$2.useState)([]);
	const addResult = (0, import_react$2.useCallback)((msg) => {
		setResults((prev) => [...prev, `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
	}, []);
	const handleTrigger = (0, import_react$2.useCallback)((type, isRendererSide) => {
		if (isRendererSide) {
			if (type === "renderer_js_error_exception") {
				addResult("⏳ 正在触发 renderer uncaught exception…");
				setTimeout(() => {
					throw new Error("[CrashTest] renderer_js_error: uncaught exception");
				}, 100);
				setTimeout(() => addResult("✅ renderer uncaught exception 已触发，请检查 Crash-Log 目录"), 200);
			} else if (type === "renderer_js_error_rejection") {
				addResult("⏳ 正在触发 renderer unhandled rejection…");
				setTimeout(() => {
					Promise.reject(/* @__PURE__ */ new Error("[CrashTest] renderer_js_error: unhandled rejection"));
				}, 100);
				setTimeout(() => addResult("✅ renderer unhandled rejection 已触发，请检查 Crash-Log 目录"), 200);
			}
		} else {
			addResult(`⏳ 正在发送 ${type} 到主进程…`);
			try {
				const w = window;
				if (typeof w.__debugCrashTest === "function") w.__debugCrashTest(type).then(() => addResult(`✅ ${type} 已在主进程触发，请检查 Crash-Log 目录`)).catch((err) => addResult(`❌ ${type} 主进程调用失败: ${err.message}`));
				else addResult("❌ 当前环境不支持主进程 Crash Test（非 Desktop 或 preload 未加载）");
			} catch (err) {
				addResult(`❌ 调用异常: ${err}`);
			}
		}
	}, [addResult]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		style: overlayStyle$1,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			style: modalStyle$1,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					style: headerStyle$1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						style: {
							fontSize: 16,
							fontWeight: 600
						},
						children: "🐛 Crash Test Panel"
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
						style: closeButtonStyle$1,
						onClick: onClose,
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					style: {
						padding: "0 16px 8px",
						fontSize: 11,
						color: "#888"
					},
					children: "触发各种 CrashType 以验证 Crash Reporter 落盘和上报通路。触发后请到 Crash-Log 目录查看 JSON 文件。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					style: {
						padding: "0 16px 12px",
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: CRASH_TYPES.map(({ type, label, desc, color, isRendererSide }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
						style: {
							...buttonStyle$1,
							borderLeft: `3px solid ${color}`
						},
						onClick: () => handleTrigger(type, isRendererSide),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							style: {
								fontWeight: 500,
								fontSize: 13
							},
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							style: {
								fontSize: 11,
								color: "#888",
								marginTop: 2
							},
							children: desc
						})]
					}, type))
				}),
				results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					style: logStyle,
					children: results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						style: {
							fontSize: 11,
							fontFamily: "monospace"
						},
						children: r
					}, i))
				})
			]
		})
	});
}
var import_react$2, import_jsx_runtime$2, CRASH_TYPES, overlayStyle$1, modalStyle$1, headerStyle$1, closeButtonStyle$1, buttonStyle$1, logStyle;
var init_CrashTestModal = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$2 = require_jsx_runtime();
	CRASH_TYPES = [
		{
			type: "renderer_js_error_exception",
			label: "Renderer JS Error (throw)",
			desc: "在渲染进程抛出 uncaught exception",
			color: "#e8912d",
			isRendererSide: true
		},
		{
			type: "renderer_js_error_rejection",
			label: "Renderer JS Error (rejection)",
			desc: "在渲染进程触发 unhandled rejection",
			color: "#e8912d",
			isRendererSide: true
		},
		{
			type: "uncaught_exception",
			label: "Main: Uncaught Exception",
			desc: "在主进程抛出未捕获异常",
			color: "#e05d44",
			isRendererSide: false
		},
		{
			type: "unhandled_rejection",
			label: "Main: Unhandled Rejection",
			desc: "在主进程触发 Promise rejection",
			color: "#e05d44",
			isRendererSide: false
		},
		{
			type: "child_process_crash",
			label: "Main: Child Process Crash",
			desc: "主进程 spawn 子进程后 SIGKILL",
			color: "#cc317c",
			isRendererSide: false
		}
	];
	overlayStyle$1 = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 99999
	};
	modalStyle$1 = {
		backgroundColor: "var(--cb-bg-primary, #1e1e1e)",
		borderRadius: 8,
		width: 420,
		maxHeight: "80vh",
		overflow: "auto",
		border: "1px solid var(--cb-border, #3c3c3c)",
		boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
	};
	headerStyle$1 = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "14px 16px 8px",
		color: "var(--cb-text-primary, #d2d3e0)"
	};
	closeButtonStyle$1 = {
		background: "none",
		border: "none",
		color: "var(--cb-text-secondary, #858699)",
		cursor: "pointer",
		fontSize: 16,
		padding: 4
	};
	buttonStyle$1 = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		padding: "10px 12px",
		background: "var(--cb-bg-secondary, #2d2d2d)",
		border: "1px solid var(--cb-border, #3c3c3c)",
		borderRadius: 6,
		cursor: "pointer",
		color: "var(--cb-text-primary, #d2d3e0)",
		textAlign: "left",
		width: "100%"
	};
	logStyle = {
		padding: "8px 16px 12px",
		borderTop: "1px solid var(--cb-border, #3c3c3c)",
		maxHeight: 150,
		overflow: "auto",
		display: "flex",
		flexDirection: "column",
		gap: 4,
		color: "var(--cb-text-secondary, #858699)"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/debug-hub-entries.ts
/**
* Debug Hub 入口注册表。新增业务调试入口时在此数组追加一项即可。
*/
function buildDebugHubEntries(options) {
	return [{
		id: "crash-test",
		title: "Crash Test Panel",
		description: "触发各种 CrashType，验证 Crash Reporter 落盘和上报通路",
		color: "#e05d44",
		onSelect: options.onOpenCrashTest
	}, {
		id: "tencent-docs-debug",
		title: "腾讯文档调试",
		description: "在线文档灰度环境、本地 static_dir / editor_sdk 替换、模拟右键打开文档",
		color: "#f0a020",
		disabled: !options.isDesktop,
		disabledReason: "仅 Desktop 可用",
		onSelect: options.onOpenTencentDocsDebug
	}];
}
var init_debug_hub_entries = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/DebugHubModal.tsx
function DebugHubModal({ visible, entries, onClose }) {
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: overlayStyle,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			style: modalStyle,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					style: headerStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						style: {
							fontSize: 16,
							fontWeight: 600
						},
						children: "🛠 调试入口"
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						type: "button",
						style: closeButtonStyle,
						onClick: onClose,
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					style: {
						padding: "0 16px 8px",
						fontSize: 11,
						color: "#888"
					},
					children: "选择要打开的调试工具。入口隐藏，普通用户不可见。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					style: {
						padding: "0 16px 12px",
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
						type: "button",
						style: {
							...buttonStyle,
							borderLeft: `3px solid ${entry.color}`,
							opacity: entry.disabled ? .5 : 1,
							cursor: entry.disabled ? "not-allowed" : "pointer"
						},
						disabled: entry.disabled,
						onClick: () => {
							if (entry.disabled) return;
							entry.onSelect();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							style: {
								fontWeight: 500,
								fontSize: 13
							},
							children: entry.title
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							style: {
								fontSize: 11,
								color: "#888",
								marginTop: 2
							},
							children: entry.disabled && entry.disabledReason ? `${entry.description}（${entry.disabledReason}）` : entry.description
						})]
					}, entry.id))
				})
			]
		})
	});
}
var import_jsx_runtime$1, overlayStyle, modalStyle, headerStyle, closeButtonStyle, buttonStyle;
var init_DebugHubModal = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	overlayStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 99999
	};
	modalStyle = {
		backgroundColor: "var(--cb-bg-primary, #1e1e1e)",
		borderRadius: 8,
		width: 420,
		maxHeight: "80vh",
		overflow: "auto",
		border: "1px solid var(--cb-border, #3c3c3c)",
		boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
	};
	headerStyle = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "14px 16px 8px",
		color: "var(--cb-text-primary, #d2d3e0)"
	};
	closeButtonStyle = {
		background: "none",
		border: "none",
		color: "var(--cb-text-secondary, #858699)",
		cursor: "pointer",
		fontSize: 16,
		padding: 4
	};
	buttonStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		padding: "10px 12px",
		background: "var(--cb-bg-secondary, #2d2d2d)",
		border: "1px solid var(--cb-border, #3c3c3c)",
		borderRadius: 6,
		color: "var(--cb-text-primary, #d2d3e0)",
		textAlign: "left",
		width: "100%"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/HelpFeedbackPanel.tsx
function HelpFeedbackPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [debugHubVisible, setDebugHubVisible] = (0, import_react.useState)(false);
	const [crashTestVisible, setCrashTestVisible] = (0, import_react.useState)(false);
	const [productName, setProductName] = (0, import_react.useState)("");
	const [productVersion, setProductVersion] = (0, import_react.useState)(null);
	const [officialWebsite, setOfficialWebsite] = (0, import_react.useState)();
	const isLocalMode = adapter?.environmentType === "local";
	const overseas = isOverseas();
	const showAboutQRCodes = useProductFeature("ShowAboutQRCodes", { mode: "enable" });
	const showLegalLinks = useProductFeature("DisableLoginLegalLinks");
	(0, import_react.useEffect)(() => {
		const handler = () => setDebugHubVisible(true);
		window.addEventListener(DEBUG_HUB_EVENT, handler);
		return () => window.removeEventListener(DEBUG_HUB_EVENT, handler);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([
			resolveProductVersion(),
			adapter?.getProductName?.(),
			adapter?.getProductLinks?.()
		]).then(([version, name, links]) => {
			if (cancelled) return;
			setProductVersion(version);
			if (name) setProductName(name);
			setOfficialWebsite(links?.officialWebsite);
		}).catch((error) => {
			console.warn("[HelpFeedbackPanel] load about info failed:", error);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter]);
	const openExternal = (0, import_react.useCallback)((url) => {
		if (!url) return;
		if (isLocalMode) {
			adapter?.emit("open-external", url);
			return;
		}
		window.open(url, "_blank");
	}, [adapter, isLocalMode]);
	const handlePrivacyPolicy = (0, import_react.useCallback)(() => {
		openExternal(overseas ? "https://www.workbuddy.ai/document/privacy-policy" : "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966");
	}, [openExternal, overseas]);
	const handleServiceAgreement = (0, import_react.useCallback)(() => {
		openExternal(overseas ? "https://www.workbuddy.ai/document/term" : "https://rule.tencent.com/rule/202603180001");
	}, [openExternal, overseas]);
	const debugHubEntries = buildDebugHubEntries({
		onOpenCrashTest: (0, import_react.useCallback)(() => {
			setDebugHubVisible(false);
			setCrashTestVisible(true);
		}, []),
		onOpenTencentDocsDebug: (0, import_react.useCallback)(() => {
			setDebugHubVisible(false);
			const bridge = window.__openTencentDocsDebugPanel;
			if (typeof bridge !== "function") {
				console.warn("[DebugHub] Tencent Docs debug panel is only available on Desktop");
				return;
			}
			bridge().catch((error) => {
				console.error("[DebugHub] Failed to open Tencent Docs debug panel:", error);
			});
		}, []),
		isDesktop: isLocalMode
	});
	const formattedProductVersion = (0, import_react.useMemo)(() => {
		if (!productVersion) return;
		return productVersion.startsWith("v") ? productVersion : `v${productVersion}`;
	}, [productVersion]);
	const actionRows = (0, import_react.useMemo)(() => [{
		key: "version",
		label: t("settings.about.currentVersion"),
		value: formattedProductVersion,
		actionText: isLocalMode ? t("settings.about.checkUpdates") : void 0,
		onClick: isLocalMode ? triggerCheckForUpdates : void 0
	}, officialWebsite && productName && {
		key: "officialWebsite",
		label: t("settings.about.aboutProduct", { name: productName }),
		actionText: t("settings.about.openOfficialWebsite"),
		onClick: () => openExternal(officialWebsite)
	}].filter(Boolean), [
		formattedProductVersion,
		isLocalMode,
		officialWebsite,
		openExternal,
		productName,
		t
	]);
	const qrItems = (0, import_react.useMemo)(() => [
		{
			key: "officialAccount",
			label: t("settings.about.officialAccount"),
			src: qrcode_workbuddy_official_account_default
		},
		{
			key: "videoAccount",
			label: t("settings.about.videoAccount"),
			src: qrcode_workbuddy_video_account_default
		},
		{
			key: "tencentChannel",
			label: t("settings.about.tencentChannel"),
			src: qrcode_workbuddy_tencent_channel_default
		}
	], [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "help-feedback-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "help-feedback-panel__card",
				children: actionRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "help-feedback-panel__card-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "help-feedback-panel__card-label",
						children: [row.label, row.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "help-feedback-panel__card-value",
							children: row.value
						})]
					}), row.actionText && row.onClick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "medium",
						className: "help-feedback-panel__action-button",
						onClick: row.onClick,
						children: row.actionText
					})]
				}, row.key))
			}),
			showAboutQRCodes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "help-feedback-panel__follow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "help-feedback-panel__follow-title",
					children: t("settings.about.followUs")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "help-feedback-panel__qr-list",
					children: qrItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "help-feedback-panel__qr-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "help-feedback-panel__qr-label",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "help-feedback-panel__qr-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "help-feedback-panel__qr",
								src: item.src,
								alt: item.label
							})
						})]
					}, item.key))
				})]
			}),
			showLegalLinks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "help-feedback-panel__footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "help-feedback-panel__footer-link",
						onClick: handlePrivacyPolicy,
						role: "button",
						tabIndex: 0,
						onKeyDown: (e) => e.key === "Enter" && handlePrivacyPolicy(),
						children: t("settings.helpFeedback.privacyPolicy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "help-feedback-panel__footer-divider",
						children: "|"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "help-feedback-panel__footer-link",
						onClick: handleServiceAgreement,
						role: "button",
						tabIndex: 0,
						onKeyDown: (e) => e.key === "Enter" && handleServiceAgreement(),
						children: t("settings.helpFeedback.serviceAgreement")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugHubModal, {
				visible: debugHubVisible,
				entries: debugHubEntries,
				onClose: () => setDebugHubVisible(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrashTestModal, {
				visible: crashTestVisible,
				onClose: () => setCrashTestVisible(false)
			})
		]
	});
}
var import_react, import_jsx_runtime, CRASH_TEST_EVENT;
var init_HelpFeedbackPanel = __esmMin((() => {
	init_HelpFeedbackPanel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_qrcode_workbuddy_official_account();
	init_qrcode_workbuddy_tencent_channel();
	init_qrcode_workbuddy_video_account();
	init_contexts();
	init_use_product_feature();
	init_useI18n();
	init_environment();
	init_update_toast();
	init_debug_hub_event();
	init_CrashTestModal();
	init_debug_hub_entries();
	init_DebugHubModal();
	import_jsx_runtime = require_jsx_runtime();
	CRASH_TEST_EVENT = DEBUG_HUB_EVENT;
}));
//#endregion
init_debug_hub_event();
init_HelpFeedbackPanel();
export { CRASH_TEST_EVENT, DEBUG_HUB_EVENT, HelpFeedbackPanel };
