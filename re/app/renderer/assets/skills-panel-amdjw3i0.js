const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ui-docs-viewer-Bo02yf1Q.js","./rolldown-runtime-V4kyJ4NV.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./skills-market-C7W4i-y2.js","./standalone-skill-detail-modal-CjJ8dPut.js","./use-try-skill-DGODl3WX.js","./standalone-skill-detail-modal-AVvtj39s.css","./ArrowUpIcon-8ojowetW.js","./use-security-preference-DZ4XMBSm.js","./skills-market-DTB5imXM.css","./skills-0DwBiolT.js","./skills-yh6G89sD.js","./skills-BHEY4U-j.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons$1, $Z as init_mcp_server_loader, A7 as Input, AZ as inferConnectorKind, B$ as connectorNeedsInteractiveRepair, Bb as textMatchesKeyword, C$ as buildVisibleEnterpriseConfigs, C3 as useLocation, C6 as init__esm5, CZ as claimConnectorEntryShow, Cj as init_mcp, Crt as AddIcon, D$ as resolveNextPollIntervalSec, DZ as markLibraryAuthEntry, E as init_contexts, E$ as planRevocations, E1 as init_useI18n, EZ as init_telemetry_helpers, Ex as useMarketPageLoad, F$ as init_constants, G$ as isConnectorConnected, GG as init_use_debounced_value, H as init_auth_context, H$ as getConnectorReasonMessage, I$ as init_connector_navigate, J$ as isConnectorPending, K2 as init_environment, KG as useDebouncedValue, MJ as init_header_workbuddy, MK as useSelectedIndustryTemplate, MO as init_market_perf, NO as getMarketPageLoadStore, O$ as CONNECTOR_NO_AUTH, O1 as useTranslation, OZ as markTokenSchemaAuthEntry, Q as init_app_providers, QZ as getMcpServersDedupedWithMeta, R$ as requestConnectorNavigation, RQ as isIOAUser, Rb as filterConnectorsByKeyword, S$ as init_intent_write_guard, T$ as isEnterpriseConnectorId, T0 as init_app_core, T1 as init_clipboard, TD as readOfficeReturnIntent, TL as mcpListRefresh$, Tx as init_use_market_page_load, U as useAccountService, U$ as init_connector_display, V$ as getConnectorErrorDisplayKind, WH as AddCircleIcon, XV as McpIcon, XZ as init_tencent_docs_id, ZZ as getMcpServersDeduped, _$ as init_library_connector_id, _N as init_use_narrow_layout, _Q as useConnectorPolicy, a$ as clearUserInitiatedConnect, ad as init_common, b$ as isLexiangConnector, bQ as init_use_ima_enabled, c$ as init_store, c1 as init_polling_interval, cG as useOneidConnectorGate, cH as GithubIcon, cQ as getConnectorsText, d$ as showFirstMcpAuthFailureToast, d0 as useModuleHost, dC as SidebarNewTaskButton, dG as refreshOneidApplications, dQ as isConnectorVersionIncompatible, e4 as isWorkBuddyDesktop, eQ as mergeMcpDescription, et as useAgentServices, f0 as useOptionalModuleHost, f3 as wb, fQ as isConnectorVisible, gQ as init_use_vpc_connector_policy, hC as useTopBarRootClassName, hQ as useEnterpriseConnectorsHidden, i$ as applyConnectorStateChange, i7 as Tooltip, iQ as useAutoDisconnectBannedConnectors, iR as useNamedPageShow, j1 as init_i18n, jY as init_product_features, jx as init_industry, k1 as getLocale, krt as Button, l$ as peekUserInitiatedConnect, lQ as goSetting, lz as useSettings, m5 as init_src, mG as init_router, n1 as init_use_poll_scheduler, nQ as useCancellableConnecting, nR as init_use_named_page_show, o$ as connectorStore, oH as GongfengIcon, oQ as getAppearConnectorTypes, p$ as useConnectorStore, pC as init_workbuddy_topbar, pG as useOneidSource, pQ as init_use_enterprise_connector_configs, qnt as BackChevronIcon, r1 as usePollScheduler, rQ as init_use_visible_mcp_connectors, rZ as useMcpHubFeature, s$ as consumeMcpAuthTimeoutToastSuppression, s1 as applyPollJitter, sG as init_use_oneid_connector_gate, sQ as getConnectorVersionIncompatibilityLabel, sz as init_SettingsContext, tQ as init_use_cancellable_connecting, u$ as shouldEmitFailureToast, uC as SidebarExpandButton, uG as init_use_oneid_applications, uH as FigmaIcon, uQ as init_utils, v$ as isImaConnector, vH as CnbIcon, vN as useNarrowLayout, w$ as init_enterprise_connector_core, w1 as copyToClipboard, w6 as BehaviorSubject, wD as init_office_return_intent, wL as init_extension_refresh_events, wZ as init_entry_show_rate_limit, x$ as createIntentWriteGuard, xQ as useImaEnabled, xq as init_telemetry, y$ as isImaKnowledgeConnectorId, y2 as WB_MCP_CHANGED, z$ as connectorNeedsAuthorize, zb as init_keyword_match } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Ov as __vitePreload, Tv as require_jsx_runtime, at as SearchInput, ja as MentionSkeleton, ji as ConfirmDialog, kv as init_preload_helper, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_context } from "./context-BN2Z33cf.js";
import { n as shouldRefreshOneidApplications, t as init_oneid_refresh_throttle } from "./oneid-refresh-throttle-BJmehuxm.js";
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-panel.less
var init_connector_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ConnectorsPanel/ConnectorsPanel.less
var init_ConnectorsPanel$2 = __esmMin((() => {})), import_jsx_runtime$10, BackIcon, PlusIcon, XCircleIcon, MessageIcon, SettingsIcon, FolderIcon;
var init_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$10 = require_jsx_runtime();
	BackIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("polyline", { points: "15 18 9 12 15 6" })
	});
	PlusIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("line", {
			x1: "12",
			y1: "5",
			x2: "12",
			y2: "19"
		}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("line", {
			x1: "5",
			y1: "12",
			x2: "19",
			y2: "12"
		})]
	});
	XCircleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("line", {
				x1: "15",
				y1: "9",
				x2: "9",
				y2: "15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("line", {
				x1: "9",
				y1: "9",
				x2: "15",
				y2: "15"
			})
		]
	});
	MessageIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
	});
	SettingsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
	});
	FolderIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ConnectorsPanel/ConnectorsPanel.tsx
/**
* 连接器 Logo 组件
* @param type - 连接器类型 (github, figma, gongfeng, cnb)
* @param className - 额外的 CSS 类名
*/
function ConnectorLogo({ type, className }) {
	const iconMap = {
		github: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(GithubIcon, {
			width: 24,
			height: 24
		}),
		figma: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FigmaIcon, {
			width: 24,
			height: 24
		}),
		gongfeng: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(GongfengIcon, {
			width: 24,
			height: 24
		}),
		cnb: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CnbIcon, {
			width: 24,
			height: 24
		})
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
		className: `connectors-panel__logo connectors-panel__logo--${type} ${className || ""}`,
		children: iconMap[type] || "?"
	});
}
/**
* 连接器详情页
* 支持两种使用方式：
* 1. 在 Settings Modal 中：自动使用 useSettings() 的 switchTab/closeSettings
* 2. 在 Connector Panel 中：通过 onBack/onClose props 传入回调
*/
function ConnectorDetailSetting({ connector, onBack, onClose }) {
	const { user, type, oauthAppName } = connector;
	const allRepositories = useConnectorStore((state) => state.connectors[type]?.allRepositories ?? []);
	let switchTab;
	let closeSettings;
	try {
		const settings = useSettings();
		switchTab = settings.switchTab;
		closeSettings = settings.closeSettings;
	} catch {}
	const handleBack = () => {
		if (onBack) onBack();
		else if (switchTab) switchTab("connectors");
	};
	const handleClose = () => {
		if (onClose) onClose();
		else if (closeSettings) closeSettings();
	};
	const [dialogVisible, setDialogVisible] = (0, import_react$11.useState)(false);
	const [getUserStatus, setGetUserStatus] = (0, import_react$11.useState)(user ? "success" : "loading");
	const [getReposStatus, setGetReposStatus] = (0, import_react$11.useState)(type !== "github" || allRepositories.length ? "success" : "loading");
	const isIntermediate = type === "github" && getReposStatus === "noAuth";
	const connectorsText = getConnectorsText();
	const connectorName = connectorsText[connector.type]?.title ?? connector.displayName ?? connector.type;
	const t = useTranslation();
	const handleTryItOut = () => {
		connectorStore.getState().useConnectorPrompt(connectorsText[type]?.prompt || "");
		handleClose();
	};
	const handleRevoke = async () => {
		try {
			await connectorStore.getState().revokeAll(type);
			setDialogVisible(false);
			handleBack();
		} catch (error) {
			toast.error(t("connectors.revokeFail"));
		}
	};
	const handleAddRepository = () => {
		goSetting({
			type,
			appName: oauthAppName
		});
		const pollInterval = 3e3;
		const maxAttempts = 100;
		let attempts = 0;
		const poll = async () => {
			attempts++;
			try {
				await connectorStore.getState().getAllRepositories(type);
				setGetReposStatus("success");
			} catch (error) {
				if (attempts < maxAttempts) setTimeout(poll, pollInterval);
			}
		};
		setTimeout(poll, pollInterval);
	};
	(0, import_react$11.useEffect)(() => {
		(async () => {
			if (connectorStore.getState().connectors[type]?.user) return;
			try {
				await connectorStore.getState().getUser(type);
				setGetUserStatus("success");
			} catch (error) {
				const code = error?.response?.data?.code;
				if (CONNECTOR_NO_AUTH.includes(code)) {
					handleBack();
					return;
				}
				toast.error(t("connectors.getUserFail"));
				setGetUserStatus("fail");
			}
		})();
	}, [user, type]);
	(0, import_react$11.useEffect)(() => {
		if (type !== "github") {
			setGetReposStatus("success");
			return;
		}
		(async () => {
			try {
				await connectorStore.getState().getAllRepositories(type);
				setGetReposStatus("success");
			} catch (error) {
				const code = error?.response?.data?.code;
				if (code === 10098 || CONNECTOR_NO_AUTH.includes(code)) {
					setGetReposStatus("noAuth");
					return;
				}
				setGetReposStatus("success");
			}
		})();
	}, [type]);
	const Intermediate = () => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "connectors-panel__intermediate-alert",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "connectors-panel__intermediate-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "connectors-panel__intermediate-title",
						children: connectorsText[type]?.repoNeedAuth
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "connectors-panel__intermediate-desc",
						children: connectorsText[type]?.repoNeedAuthDesc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
						className: "connectors-panel__btn connectors-panel__btn--primary",
						onClick: handleAddRepository,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(PlusIcon, {}), connectorsText[type]?.addRepo]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", { className: "connectors-panel__section-divider" }),
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "connectors-panel__danger-zone",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
					className: "connectors-panel__section-title",
					style: { color: "#EF4444" },
					children: t("connectors.dangerZone")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
					className: "connectors-panel__danger-desc",
					children: connectorsText[type]?.dangerZoneDesc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
					className: "connectors-panel__btn connectors-panel__btn--danger",
					onClick: () => setDialogVisible(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(XCircleIcon, {}), t("connectors.revokeAccess")]
				})
			]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		className: "connectors-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "connectors-panel__detail-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
					className: "connectors-panel__back-btn",
					onClick: handleBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(BackIcon, {}), t("connectors.back")]
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
					className: "connectors-panel__detail-title",
					children: connectorName
				})]
			}),
			getUserStatus === "loading" || getReposStatus === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MentionSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "connectors-panel__scroll-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "connectors-panel__detail-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ConnectorLogo, { type: connector.type }), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "connectors-panel__detail-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "connectors-panel__detail-name",
							children: connectorName
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
							className: `connectors-panel__detail-status connectors-panel__detail-status--${connector.status}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { className: "connectors-panel__status-dot" }), t("connectors.connectedAs", { username: user?.name || "" })]
						})]
					})]
				}), isIntermediate ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Intermediate, {}) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "connectors-panel__action-buttons",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
							className: "connectors-panel__btn connectors-panel__btn--try",
							onClick: handleTryItOut,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MessageIcon, {}), t("connectors.tryItOut")]
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
							className: "connectors-panel__btn connectors-panel__btn--secondary",
							onClick: () => goSetting({
								type,
								appName: oauthAppName
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SettingsIcon, {}), t("connectors.config")]
						})]
					}),
					type === "github" && allRepositories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "connectors-panel__section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
								className: "connectors-panel__section-header",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
									className: "connectors-panel__section-title",
									children: connectorsText[type]?.authedRepos ?? t("connectors.authedRepos")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
								className: "connectors-panel__repo-hint",
								children: connectorsText[type]?.addRepoDesc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
								className: "connectors-panel__repo-list",
								children: allRepositories.map((repo, index) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
									className: "connectors-panel__repo-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "connectors-panel__repo-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FolderIcon, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
										className: "connectors-panel__repo-name",
										children: repo.name
									})]
								}, `${repo.name}-${index}`))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", { className: "connectors-panel__section-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "connectors-panel__danger-zone",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
								className: "connectors-panel__section-title",
								style: { color: "#EF4444" },
								children: t("connectors.dangerZone")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
								className: "connectors-panel__danger-desc",
								children: connectorsText[type]?.dangerZoneDesc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
								className: "connectors-panel__btn connectors-panel__btn--danger",
								onClick: () => setDialogVisible(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(XCircleIcon, {}), t("connectors.revokeAccess")]
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ConfirmDialog, {
				visible: dialogVisible,
				title: t("connectors.revokeAccess"),
				content: t("connectors.revokeAccessDesc"),
				onConfirm: () => handleRevoke(),
				onClose: () => setDialogVisible(false),
				confirmText: t("connectors.revokeAccessConform"),
				cancelText: t("connectors.revokeAccessCancel")
			})
		]
	});
}
var import_react$11, import_jsx_runtime$9;
var init_ConnectorsPanel$1 = __esmMin((() => {
	init_ConnectorsPanel$2();
	init_src$1();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_constants();
	init_store();
	init_utils();
	init_icons$1();
	init_SettingsContext();
	init_icons();
	import_jsx_runtime$9 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ConnectorsPanel/index.ts
var init_ConnectorsPanel = __esmMin((() => {
	init_ConnectorsPanel$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/services/hooks/use-custom-connector-policy.ts
/**
* 广播最新策略快照到所有订阅方。
* 任一消费方主动 refresh 拿到新快照后调用，让其它订阅方即时跟进。
*/
function publishCustomConnectorPolicy(snapshot) {
	customConnectorPolicy$.next(snapshot);
}
/**
* 订阅企业成员自定义连接器策略快照。
*
* **频率控制**：
* - 每次组件 mount 都调 `refreshCustomConnectorPolicy()`（绕主进程缓存）拉后端最新状态。
* - mount 时先订阅 subject 的 latest 值作为初始 state（重 mount 第一帧即真实策略 → 不闪烁）。
* - 调用方主动 `refresh()`（保存前 last-mile check）同样绕缓存强刷并广播给所有订阅方。
*
* @returns
* - `policy`：当前策略快照（capability-missing 时为 undefined）
* - `canAdd`：是否显示 / 允许新增自定义连接器（已封装首帧防闪现的三态逻辑，消费方直接用）
* - `refresh`：主动绕缓存拉取最新策略并广播；返回最新快照（facade 不存在 / 失败时返回 undefined）
*/
function useCustomConnectorPolicy() {
	const facade = useAgentServices()?.enterprisePolicy;
	const facadeRef = (0, import_react$10.useRef)(facade);
	facadeRef.current = facade;
	const { account } = useAccountService();
	const isEnterpriseAccount = !!account?.enterpriseId;
	const [policy, setPolicy] = (0, import_react$10.useState)(() => customConnectorPolicy$.value);
	const [loading, setLoading] = (0, import_react$10.useState)(() => customConnectorPolicyLoading$.value);
	(0, import_react$10.useEffect)(() => {
		const subPolicy = customConnectorPolicy$.subscribe(setPolicy);
		const subLoading = customConnectorPolicyLoading$.subscribe(setLoading);
		return () => {
			subPolicy.unsubscribe();
			subLoading.unsubscribe();
		};
	}, []);
	(0, import_react$10.useEffect)(() => {
		if (!facade) {
			publishCustomConnectorPolicy(void 0);
			customConnectorPolicyLoading$.next(false);
			return;
		}
		if (customConnectorPolicy$.value === void 0) customConnectorPolicyLoading$.next(isEnterpriseAccount);
		let disposed = false;
		facade.refreshCustomConnectorPolicy().then((snapshot) => {
			if (!disposed) publishCustomConnectorPolicy(snapshot);
		}).catch((error) => {
			console.warn("[useCustomConnectorPolicy] refreshCustomConnectorPolicy failed:", error);
		}).finally(() => {
			customConnectorPolicyLoading$.next(false);
		});
		return () => {
			disposed = true;
		};
	}, [facade, isEnterpriseAccount]);
	const refresh = (0, import_react$10.useCallback)(async () => {
		const f = facadeRef.current;
		if (!f) return;
		try {
			const next = await f.refreshCustomConnectorPolicy();
			if (next) publishCustomConnectorPolicy(next);
			return next;
		} catch (error) {
			console.warn("[useCustomConnectorPolicy] refresh failed:", error);
			return;
		}
	}, []);
	return {
		policy,
		canAdd: computeCanAdd(policy, loading),
		refresh
	};
}
/**
* 三态判定「是否显示 / 允许新增自定义连接器」：
*   - loading（有 facade 且首次未拿到结果）→ false（悲观隐藏，消除首帧闪现）
*   - 已拿到快照 → 按 `snapshot.allowed`
*   - 无快照且非 loading（capability-missing）→ true（放行兜底，避免误禁）
*/
function computeCanAdd(policy, loading) {
	if (loading) return false;
	if (policy) return policy.allowed;
	return true;
}
var import_react$10, customConnectorPolicy$, customConnectorPolicyLoading$;
var init_use_custom_connector_policy = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init__esm5();
	init_auth_context();
	init_app_providers();
	customConnectorPolicy$ = new BehaviorSubject(void 0);
	customConnectorPolicyLoading$ = new BehaviorSubject(false);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-modal.less
var init_mcp_modal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-config-editor.less
var init_mcp_config_editor$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-config-sanitizer.ts
function isPlainObject$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* 检测并修复 `mcpServers.mcpServers` 嵌套：将内层条目 hoist 到外层同级。
* 同名条目以**外层为准**，保护用户已有配置。
*/
function sanitizeMcpConfig(parsed) {
	if (!isPlainObject$1(parsed)) return {
		sanitized: parsed,
		modified: false
	};
	const mcpServers = parsed.mcpServers;
	if (!isPlainObject$1(mcpServers)) return {
		sanitized: parsed,
		modified: false
	};
	const nested = mcpServers.mcpServers;
	if (!isPlainObject$1(nested)) return {
		sanitized: parsed,
		modified: false
	};
	for (const [name, entry] of Object.entries(nested)) if (!(name in mcpServers)) mcpServers[name] = entry;
	delete mcpServers.mcpServers;
	return {
		sanitized: parsed,
		modified: true
	};
}
var init_mcp_config_sanitizer = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-config-validator.ts
function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function validateMcpConfig(parsed) {
	if (!isPlainObject(parsed)) return {
		valid: false,
		messageKey: "mcp.invalidSchema.notObject"
	};
	if (!("mcpServers" in parsed)) return {
		valid: false,
		messageKey: "mcp.invalidSchema.missingMcpServers"
	};
	const mcpServers = parsed.mcpServers;
	if (!isPlainObject(mcpServers)) return {
		valid: false,
		messageKey: "mcp.invalidSchema.mcpServersNotObject"
	};
	for (const [name, entry] of Object.entries(mcpServers)) {
		if (!isPlainObject(entry)) return {
			valid: false,
			messageKey: "mcp.invalidSchema.invalidServerEntry",
			params: { name }
		};
		if ("mcpServers" in entry) return {
			valid: false,
			messageKey: "mcp.invalidSchema.nestedMcpServers",
			params: { name }
		};
	}
	return { valid: true };
}
var init_mcp_config_validator = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-monaco-editor.tsx
/**
* ⚠️ 必须在动态 import monaco 相关 chunk 之前执行。
* monaco 间接依赖 vscode-textmate，其 DebugFlags 在模块求值时会执行：
*   (typeof process !== 'undefined') && !!process.env['VSCODE_TEXTMATE_DEBUG']
* 在渲染进程运行时里 `process` 存在但 `process.env` 为 undefined，
* 读取会抛 "Cannot read properties of undefined (reading 'VSCODE_TEXTMATE_DEBUG')"。
* 这里仅在缺失时补空对象兜底，不覆盖任何已有值。
* 放在 agent-ui 侧（本包会随渲染进程编译）且在 import() 之前调用，
* 确保早于 vscode-textmate 求值——比放在预构建的 context-viewer-components 更可靠。
*/
function ensureProcessEnvShim() {
	try {
		const g = globalThis;
		if (typeof g.process === "undefined") g.process = {};
		if (typeof g.process.env === "undefined") g.process.env = {};
	} catch {}
}
var import_react$9, import_jsx_runtime$8, McpMonacoEditor;
var init_mcp_monaco_editor = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$8 = require_jsx_runtime();
	init_preload_helper();
	ensureProcessEnvShim();
	McpMonacoEditor = import_react$9.memo(({ value, onChange, onMount, readOnly = false, className }) => {
		const editorRef = (0, import_react$9.useRef)(null);
		const [MonacoEditor, setMonacoEditor] = import_react$9.useState(null);
		const [loading, setLoading] = import_react$9.useState(true);
		const [error, setError] = import_react$9.useState("");
		import_react$9.useEffect(() => {
			let cancelled = false;
			(async () => {
				try {
					ensureProcessEnvShim();
					const { MonacoEditor: ME } = await __vitePreload(async () => {
						const { MonacoEditor: ME } = await import("./ui-docs-viewer-Bo02yf1Q.js").then((n) => (n.n(), n.t));
						return { MonacoEditor: ME };
					}, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url);
					if (!cancelled) {
						setMonacoEditor(() => ME);
						setLoading(false);
					}
				} catch (err) {
					if (!cancelled) {
						setError(err instanceof Error ? err.message : "Failed to load Monaco Editor");
						setLoading(false);
					}
				}
			})();
			return () => {
				cancelled = true;
			};
		}, []);
		const handleMount = (0, import_react$9.useCallback)((editor, monaco) => {
			editorRef.current = editor;
			onMount?.(editor, monaco);
		}, [onMount]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className,
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				style: { color: "#999" },
				children: "Loading editor..."
			})
		});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className,
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				style: { color: "#d32f2f" },
				children: ["Error: ", error]
			})
		});
		if (!MonacoEditor) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(MonacoEditor, {
			value,
			language: "json",
			height: "100%",
			readOnly,
			minimap: false,
			lineNumbers: "on",
			wordWrap: "on",
			fontSize: 13,
			onChange,
			onMount: handleMount,
			options: {
				scrollBeyondLastLine: false,
				automaticLayout: true,
				padding: {
					top: 8,
					bottom: 8
				}
			}
		});
	});
	McpMonacoEditor.displayName = "McpMonacoEditor";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-config-editor.tsx
/** 自定义 MCP 的配置页：直接编辑 `mcp.json` 原文。 */
function McpConfigEditor({ visible, onBack, onSave }) {
	const { adapter } = useModuleHost();
	const t = useTranslation();
	const { refresh: refreshCustomConnectorPolicy } = useCustomConnectorPolicy();
	const [loading, setLoading] = (0, import_react$8.useState)(false);
	const [saving, setSaving] = (0, import_react$8.useState)(false);
	const [filePath, setFilePath] = (0, import_react$8.useState)("");
	const [originalContent, setOriginalContent] = (0, import_react$8.useState)("");
	const [modifiedContent, setModifiedContent] = (0, import_react$8.useState)("");
	const [hasChanges, setHasChanges] = (0, import_react$8.useState)(false);
	const loadConfig = (0, import_react$8.useCallback)(async () => {
		setLoading(true);
		try {
			const result = await wb.mcp.configuration();
			setFilePath(result.filePath);
			setOriginalContent(result.content);
			setModifiedContent(result.content);
			setHasChanges(false);
		} catch (error) {
			console.error("Failed to load MCP config:", error);
			toast.error(t("mcp.loadConfigError"));
		} finally {
			setLoading(false);
		}
	}, [t]);
	const handleSave = (0, import_react$8.useCallback)(async () => {
		const policy = await refreshCustomConnectorPolicy();
		if (policy && !policy.allowed) {
			toast.error(t("connectorPanel.customConnectorDisabled"));
			return;
		}
		const wasEmpty = modifiedContent.trim() === "";
		const contentToParse = wasEmpty ? "{\"mcpServers\":{}}" : modifiedContent;
		let parsed;
		try {
			parsed = JSON.parse(contentToParse);
		} catch {
			toast.error(t("mcp.invalidJson"));
			return;
		}
		const { sanitized, modified } = sanitizeMcpConfig(parsed);
		const validation = validateMcpConfig(sanitized);
		if (!validation.valid) {
			toast.error(t(validation.messageKey, validation.params));
			return;
		}
		const contentToSave = modified || wasEmpty ? JSON.stringify(sanitized, null, 2) : modifiedContent;
		if (modified || wasEmpty) setModifiedContent(contentToSave);
		setSaving(true);
		try {
			const saveResult = await wb.mcp.saveConfiguration(contentToSave);
			if (!saveResult.ok) throw new Error(saveResult.message);
			setOriginalContent(contentToSave);
			setHasChanges(false);
			toast.success(t("mcp.saveSuccess"));
			onSave?.();
		} catch (error) {
			console.error("Failed to save MCP config:", error);
			toast.error(error instanceof Error && error.message ? error.message : t("mcp.saveError"));
		} finally {
			setSaving(false);
		}
	}, [
		modifiedContent,
		onSave,
		refreshCustomConnectorPolicy,
		t
	]);
	const handleContentChange = (0, import_react$8.useCallback)((newContent) => {
		setModifiedContent(newContent);
		setHasChanges(newContent !== originalContent);
	}, [originalContent]);
	const handleBack = (0, import_react$8.useCallback)(() => {
		if (!hasChanges || window.confirm(t("mcp.unsavedChanges"))) onBack();
	}, [
		hasChanges,
		onBack,
		t
	]);
	/**
	* 注册自定义粘贴处理器：webview 里浏览器 clipboard API 可能被安全策略挡住，
	* 改走 adapter 提供的宿主剪贴板。
	*/
	const handleEditorMount = (0, import_react$8.useCallback)((editor, monaco) => {
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, async () => {
			try {
				let clipboardText = "";
				if (adapter?.clipboardReadText) clipboardText = await adapter.clipboardReadText();
				else try {
					clipboardText = await navigator.clipboard.readText();
				} catch (browserError) {
					console.warn("[McpConfigEditor] Browser clipboard API failed:", browserError);
				}
				if (!clipboardText || !editor) return;
				const selection = editor.getSelection();
				if (!selection) return;
				editor.executeEdits("paste", [{
					range: selection,
					text: clipboardText,
					forceMoveMarkers: true
				}]);
				const model = editor.getModel();
				if (model) editor.setPosition(model.getPositionAt(model.getOffsetAt(selection.getStartPosition()) + clipboardText.length));
			} catch (error) {
				console.error("[McpConfigEditor] Paste failed:", error);
			}
		});
	}, [adapter]);
	(0, import_react$8.useEffect)(() => {
		if (visible) loadConfig();
	}, [visible, loadConfig]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: "mcp-config-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "mcp-config-editor-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("button", {
					className: "mcp-config-editor-back",
					onClick: handleBack,
					title: t("common.back"),
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(BackChevronIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("mcp.backToList") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "mcp-config-editor-header-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "medium",
						onClick: handleBack,
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
						type: "button",
						variant: "primary",
						size: "medium",
						onClick: handleSave,
						loading: saving,
						disabled: !hasChanges || loading,
						children: t("common.save")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "mcp-config-editor-path",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("span", {
						className: "mcp-config-editor-path-label",
						children: [t("mcp.configPath"), ":"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "mcp-config-editor-path-value",
						children: filePath
					}),
					hasChanges && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "mcp-config-editor-unsaved",
						children: t("mcp.hasUnsavedChanges")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "mcp-config-editor-body",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "mcp-config-editor-loading",
					children: [t("common.loading"), "..."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "mcp-config-editor-monaco-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(McpMonacoEditor, {
						value: modifiedContent,
						onChange: (value) => handleContentChange(value || ""),
						onMount: handleEditorMount
					})
				})
			})
		]
	});
}
var import_react$8, import_jsx_runtime$7;
var init_mcp_config_editor = __esmMin((() => {
	init_mcp_config_editor$1();
	init_src$1();
	init_src();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_useI18n();
	init_use_custom_connector_policy();
	init_context();
	init_mcp_config_sanitizer();
	init_mcp_config_validator();
	init_mcp_monaco_editor();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-panel.less
var init_mcp_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-toggle-state.ts
/** 连接和待认证都允许撤回启用意图；仅当前开关写操作未完成时锁定。 */
function getMcpToggleState(server, operationPending, trustPending = false) {
	if (trustPending) return {
		checked: false,
		disabled: true
	};
	return {
		checked: typeof server.disabled === "boolean" ? !server.disabled : server.status !== "disabled",
		disabled: operationPending
	};
}
/** 普通开关取反当前意图；Trust 按钮可显式要求保持启用并继续连接。 */
function getNextMcpEnabled(server) {
	return !getMcpToggleState(server, false).checked;
}
var init_mcp_toggle_state = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-panel.tsx
function hideBuiltinArdotMcpServer(servers) {
	return (servers ?? []).filter((server) => server.name !== BUILTIN_ARDOT_MCP_SERVER_NAME$1);
}
function assertMcpOperation(result) {
	if (!result.ok) throw new Error(result.message || "MCP operation failed");
}
async function connectMcp(server) {
	const result = await wb.mcp.connect(server.id, { interactive: true });
	if (!result.ok && result.state === "unauthorized" && server.authMode === "oauth") {
		const { authorizeUrl } = await wb.mcp.beginAuthorization(server.id);
		await wb.shell.openExternal(authorizeUrl);
		return;
	}
	assertMcpOperation(result);
}
var import_react$7, import_jsx_runtime$6, DEFAULT_MCP_MARKET_URL, DEFAULT_MCP_DOCUMENT_URL, MCP_HUB_URL_INTERNAL, MCP_HUB_URL_EXTERNAL, BUILTIN_ARDOT_MCP_SERVER_NAME$1, ICON_COLORS$1, getIconColor$1, ChevronIcon, RefreshIcon$1, DeleteIcon, ExternalLinkIcon, CopyIcon, ToggleSwitch, McpCardSkeleton, SKELETON_COUNT$1, McpPanel;
var init_mcp_panel = __esmMin((() => {
	init_mcp_panel$1();
	init_src$1();
	init_src();
	init_mcp();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_icons$1();
	init_product_features();
	init_use_poll_scheduler();
	init_useI18n();
	init_clipboard();
	init_extension_refresh_events();
	init_context();
	init_intent_write_guard();
	init_utils();
	init_mcp_config_editor();
	init_mcp_server_loader();
	init_mcp_toggle_state();
	import_jsx_runtime$6 = require_jsx_runtime();
	DEFAULT_MCP_MARKET_URL = "https://cnb.cool/codebuddy/mcp-market";
	DEFAULT_MCP_DOCUMENT_URL = "https://cloud.tencent.com/document/product/1749/116012#390560ab-3081-45d6-9013-757be61e2e91";
	MCP_HUB_URL_INTERNAL = "https://knot.woa.com/mcp/market";
	MCP_HUB_URL_EXTERNAL = "https://cloud.tencent.com/developer/mcp";
	BUILTIN_ARDOT_MCP_SERVER_NAME$1 = "ardot";
	ICON_COLORS$1 = [
		"#6366f1",
		"#8b5cf6",
		"#ec4899",
		"#f97316",
		"#14b8a6",
		"#3b82f6",
		"#10b981",
		"#f43f5e",
		"#06b6d4",
		"#a855f7"
	];
	getIconColor$1 = (name) => {
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = (hash << 5) - hash + name.charCodeAt(i);
			hash |= 0;
		}
		return ICON_COLORS$1[Math.abs(hash) % ICON_COLORS$1.length];
	};
	ChevronIcon = ({ expanded }) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: `mcp-chevron ${expanded ? "mcp-chevron--expanded" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
			d: "M6 4L10 8L6 12",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	RefreshIcon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
			d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C10.0503 2 11.8645 3.00442 12.9497 4.55",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
			d: "M14 2V5.5H10.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	DeleteIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M2 4H14",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
	ExternalLinkIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M10 2H14V6",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				d: "M6.66667 9.33333L14 2",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
	CopyIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("rect", {
			x: "5",
			y: "5",
			width: "9",
			height: "9",
			rx: "1",
			stroke: "currentColor",
			strokeWidth: "1.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
			d: "M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})]
	});
	ToggleSwitch = ({ checked, onChange, disabled }) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
		className: `mcp-toggle ${checked ? "mcp-toggle--checked" : ""} ${disabled ? "mcp-toggle--disabled" : ""}`,
		onClick: onChange,
		disabled,
		type: "button",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: "mcp-toggle-thumb" })
	});
	McpCardSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
		className: "mcp-item mcp-item--skeleton",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "mcp-item-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "mcp-skeleton-block mcp-skeleton-block--chevron" }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "mcp-skeleton-block mcp-skeleton-block--icon" }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					style: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						gap: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "mcp-skeleton-block mcp-skeleton-block--name" }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "mcp-skeleton-block mcp-skeleton-block--tools" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "mcp-skeleton-block mcp-skeleton-block--toggle" })
			]
		})
	});
	SKELETON_COUNT$1 = 4;
	McpPanel = ({ visible, active, isModal = false, onOpenConfig }) => {
		const { adapter, accountInfo } = useModuleHost();
		const mcpHubEnabled = useMcpHubFeature() === true;
		const t = useTranslation();
		const isIOA = isIOAUser(accountInfo?.enterpriseId ?? "");
		const [loading, setLoading] = (0, import_react$7.useState)(false);
		const [servers, setServers] = (0, import_react$7.useState)([]);
		const [expandedServers, setExpandedServers] = (0, import_react$7.useState)(/* @__PURE__ */ new Set());
		const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react$7.useState)(false);
		const [serverToDelete, setServerToDelete] = (0, import_react$7.useState)(null);
		const [showConfigEditor, setShowConfigEditor] = (0, import_react$7.useState)(false);
		const [searchText, setSearchText] = (0, import_react$7.useState)("");
		const [togglingServers, setTogglingServers] = (0, import_react$7.useState)(/* @__PURE__ */ new Set());
		const [togglingTools, setTogglingTools] = (0, import_react$7.useState)(/* @__PURE__ */ new Set());
		const [warningDismissed, setWarningDismissed] = (0, import_react$7.useState)(false);
		const [oauthAuthorizingServers, setOauthAuthorizingServers] = (0, import_react$7.useState)(/* @__PURE__ */ new Set());
		const togglingServersRef = (0, import_react$7.useRef)(togglingServers);
		togglingServersRef.current = togglingServers;
		const togglingToolsRef = (0, import_react$7.useRef)(togglingTools);
		togglingToolsRef.current = togglingTools;
		const oauthAuthorizingServersRef = (0, import_react$7.useRef)(oauthAuthorizingServers);
		oauthAuthorizingServersRef.current = oauthAuthorizingServers;
		const serverSyncEpochRef = (0, import_react$7.useRef)(0);
		const serverIntentGuardRef = (0, import_react$7.useRef)(createIntentWriteGuard());
		const toolIntentGuardRef = (0, import_react$7.useRef)(createIntentWriteGuard());
		(0, import_react$7.useEffect)(() => {
			const serverGuard = serverIntentGuardRef.current;
			const toolGuard = toolIntentGuardRef.current;
			return () => {
				serverGuard.clearAll();
				toolGuard.clearAll();
			};
		}, []);
		/**
		* 快照合并（乐观层已移除）：custom MCP 的用户意图（mcp.json 的 disabled /
		* disabledTools）由 daemon 在 toggle RPC 入口同步落盘。`status` 还会受 trust-pending
		* 等运行态影响，因此开关以 `disabled` 字段为准。唯一要防的是**乱序读**：
		* 发起/生成于意图写入之前的快照（旧 #60895「开关闪回」的根因）按读序护栏跳过
		* 对应条目（保留本地直写），下一次快照自然收敛。
		*/
		const mergeServersWithOptimisticState = (0, import_react$7.useCallback)((incomingServers, previousServers, requestStartedAt) => {
			const serverGuard = serverIntentGuardRef.current;
			const toolGuard = toolIntentGuardRef.current;
			const previousServerMap = new Map(previousServers.map((server) => [server.name, server]));
			const result = [];
			for (const server of incomingServers) {
				const previousServer = previousServerMap.get(server.name);
				if (!previousServer) {
					result.push(server);
					continue;
				}
				if (serverGuard.isStale(server.name, requestStartedAt)) {
					result.push(previousServer);
					continue;
				}
				if (!server.tools?.length || !previousServer.tools?.length) {
					result.push(server);
					continue;
				}
				const previousToolMap = new Map(previousServer.tools.map((tool) => [tool.name, tool]));
				let anyToolKept = false;
				const mergedTools = server.tools.map((tool) => {
					const toolKey = `${server.name}/${tool.name}`;
					if (previousToolMap.has(tool.name) && toolGuard.isStale(toolKey, requestStartedAt)) {
						anyToolKept = true;
						return previousToolMap.get(tool.name);
					}
					return tool;
				});
				result.push(anyToolKept ? {
					...server,
					tools: mergedTools
				} : server);
			}
			return result;
		}, []);
		/**
		* 加载 MCP 服务器列表（静默模式不显示 loading 骨架屏）
		*/
		const loadServers = (0, import_react$7.useCallback)(async (silent = false) => {
			const syncEpoch = ++serverSyncEpochRef.current;
			if (!silent) setLoading(true);
			try {
				const { servers: result, requestStartedAt } = await getMcpServersDedupedWithMeta(wb.mcp, { caller: "mcp-panel:load" });
				const fetchedServers = hideBuiltinArdotMcpServer(result);
				if (syncEpoch !== serverSyncEpochRef.current) {
					console.log("[McpPanel] Ignoring stale loadServers result");
					return true;
				}
				setServers((prev) => mergeServersWithOptimisticState(fetchedServers, prev, requestStartedAt));
				return true;
			} catch (error) {
				console.error("Failed to load MCP servers:", error);
				if (!silent) toast.error(t("mcp.loadError"));
				return false;
			} finally {
				if (!silent) setLoading(false);
			}
		}, [mergeServersWithOptimisticState, t]);
		(0, import_react$7.useEffect)(() => {
			if (visible && active) loadServers();
		}, [
			visible,
			active,
			loadServers
		]);
		(0, import_react$7.useEffect)(() => {
			const sub = mcpListRefresh$.subscribe(() => {
				loadServers(true);
			});
			return () => sub.unsubscribe();
		}, [loadServers]);
		(0, import_react$7.useEffect)(() => {
			return wb.on(WB_MCP_CHANGED, () => {
				getMcpServersDedupedWithMeta(wb.mcp, {
					caller: "mcp-panel:changed",
					force: true
				}).then(({ servers: result, requestStartedAt }) => {
					const visibleUpdatedServers = hideBuiltinArdotMcpServer(result);
					++serverSyncEpochRef.current;
					setOauthAuthorizingServers((prev) => {
						const next = new Set(prev);
						for (const server of visibleUpdatedServers) if (server.status !== "connecting") next.delete(server.name);
						return next;
					});
					setServers((prev) => mergeServersWithOptimisticState(visibleUpdatedServers, prev, requestStartedAt));
				}).catch(() => void 0);
			});
		}, [mergeServersWithOptimisticState]);
		const hasConnecting = (0, import_react$7.useMemo)(() => servers.some((s) => s.status === "connecting"), [servers]);
		usePollScheduler({
			enabled: hasConnecting && visible,
			intervalMs: 5e3,
			immediate: false,
			pauseWhenDocumentHidden: true,
			maxDurationMs: 6e4,
			run: () => loadServers(true)
		});
		const filteredServers = (0, import_react$7.useMemo)(() => {
			const keyword = searchText.trim().toLowerCase();
			if (!keyword) return servers;
			return servers.filter((s) => s.name.toLowerCase().includes(keyword) || s.description?.toLowerCase().includes(keyword));
		}, [servers, searchText]);
		const statusSummary = (0, import_react$7.useMemo)(() => {
			return {
				enabled: servers.filter((s) => s.status === "connected" || s.status === "connecting" || s.status === "idle").length,
				error: servers.filter((s) => s.status === "disconnected" || !!s.error && s.status !== "connecting").length
			};
		}, [servers]);
		const TOOLS_LIMIT = 80;
		const enabledToolsCount = (0, import_react$7.useMemo)(() => {
			let count = 0;
			for (const server of servers) {
				if (server.status === "disabled") continue;
				for (const tool of server.tools ?? []) if (tool.enabled !== false) count++;
			}
			return count;
		}, [servers]);
		/**
		* 切换展开/折叠
		*/
		const toggleExpanded = (0, import_react$7.useCallback)((server) => {
			const serverName = server.name;
			const opening = !expandedServers.has(serverName);
			setExpandedServers((prev) => {
				const next = new Set(prev);
				if (next.has(serverName)) next.delete(serverName);
				else next.add(serverName);
				return next;
			});
			if (opening) wb.mcp.describe(server.id).then((description) => {
				setServers((prev) => prev.map((item) => item.id === server.id ? mergeMcpDescription(item, description) : item));
			}).catch((error) => {
				console.warn(`[McpPanel] describe(${server.id}) failed:`, error);
			});
		}, [expandedServers]);
		/**
		* 切换服务器启用/禁用状态
		*/
		const setServerEnabled = (0, import_react$7.useCallback)(async (server, e, newEnabled, approveFirst = false) => {
			e.stopPropagation();
			if (togglingServersRef.current.has(server.name)) return;
			const nextTogglingServers = new Set(togglingServersRef.current);
			nextTogglingServers.add(server.name);
			togglingServersRef.current = nextTogglingServers;
			setTogglingServers(nextTogglingServers);
			serverIntentGuardRef.current.mark(server.name);
			const intermediateStatus = newEnabled ? "connecting" : "disabled";
			setServers((prev) => prev.map((s) => s.name === server.name ? {
				...s,
				status: intermediateStatus,
				disabled: !newEnabled,
				error: void 0
			} : s));
			try {
				if (approveFirst) assertMcpOperation(await wb.mcp.approve({
					id: server.id,
					configHash: server.configHash ?? ""
				}));
				assertMcpOperation(await wb.mcp.setEnabled(server.id, newEnabled));
				if (newEnabled) await connectMcp(server);
			} catch (error) {
				console.error("Failed to toggle server:", error);
				toast.error(t("mcp.toggleError"));
				serverIntentGuardRef.current.clear(server.name);
				await loadServers();
			} finally {
				const nextTogglingServers = new Set(togglingServersRef.current);
				nextTogglingServers.delete(server.name);
				togglingServersRef.current = nextTogglingServers;
				setTogglingServers(nextTogglingServers);
			}
		}, [loadServers, t]);
		const handleToggleServer = (0, import_react$7.useCallback)((server, e) => setServerEnabled(server, e, getNextMcpEnabled(server)), [setServerEnabled]);
		const handleTrustServer = (0, import_react$7.useCallback)((server, e) => setServerEnabled(server, e, true, true), [setServerEnabled]);
		/**
		* 重新连接服务器
		*
		* OAuth 场景下 connect 返回时可能只代表授权流程开始，OAuth 仍在进行中。
		* 因此不立即调用 loadServers()，而是依赖 onMcpServerChange 事件推送 + 轮询兜底。
		* 如果 OAuth 出错，延迟检查服务器状态后再决定是否提示用户。
		*/
		const handleReconnect = (0, import_react$7.useCallback)(async (server, e) => {
			e.stopPropagation();
			const isAuthorizing = oauthAuthorizingServersRef.current.has(server.name);
			const needsAuth = server.needsAuth || server.error?.includes("401") || server.error?.toLowerCase().includes("auth");
			if (isAuthorizing && needsAuth) {
				console.log(`[McpPanel] Server ${server.name} is already authorizing, skip duplicate request`);
				return;
			}
			if (needsAuth) {
				const nextAuthorizingServers = new Set(oauthAuthorizingServersRef.current);
				nextAuthorizingServers.add(server.name);
				oauthAuthorizingServersRef.current = nextAuthorizingServers;
				setOauthAuthorizingServers(nextAuthorizingServers);
			}
			setServers((prev) => prev.map((s) => s.name === server.name ? {
				...s,
				status: "connecting",
				error: void 0
			} : s));
			try {
				await connectMcp(server);
			} catch (error) {
				console.error("Failed to reconnect server:", error);
				if (!needsAuth) toast.error(t("mcp.reconnectError"));
				else {
					const nextAuthorizingServers = new Set(oauthAuthorizingServersRef.current);
					nextAuthorizingServers.delete(server.name);
					oauthAuthorizingServersRef.current = nextAuthorizingServers;
					setOauthAuthorizingServers(nextAuthorizingServers);
					setTimeout(async () => {
						try {
							const latestServer = (await getMcpServersDeduped(wb.mcp, { caller: "mcp-panel:reconnect-check" }))?.find((s) => s.name === server.name);
							if (latestServer && latestServer.status !== "connected" && latestServer.status !== "connecting") toast.error(t("mcp.reconnectError"));
						} catch {}
					}, 3e3);
				}
			}
		}, [t, mergeServersWithOptimisticState]);
		/**
		* 删除服务器
		*/
		const handleDelete = (0, import_react$7.useCallback)(async () => {
			if (!serverToDelete) return;
			try {
				assertMcpOperation(await wb.mcp.remove(serverToDelete.id));
				toast.success(t("mcp.deleteSuccess"));
				setShowDeleteConfirm(false);
				setServerToDelete(null);
				await loadServers();
			} catch (error) {
				console.error("Failed to delete server:", error);
				toast.error(t("mcp.deleteError"));
			}
		}, [
			serverToDelete,
			loadServers,
			t
		]);
		/**
		* 切换单个工具的启用/禁用状态
		*/
		const handleToggleTool = (0, import_react$7.useCallback)(async (server, toolName) => {
			const serverName = server.name;
			const toolKey = `${serverName}/${toolName}`;
			if (togglingToolsRef.current.has(toolKey)) return;
			const nextTogglingTools = new Set(togglingToolsRef.current);
			nextTogglingTools.add(toolKey);
			togglingToolsRef.current = nextTogglingTools;
			setTogglingTools(nextTogglingTools);
			toolIntentGuardRef.current.mark(toolKey);
			setServers((prev) => prev.map((s) => {
				if (s.name !== serverName) return s;
				return {
					...s,
					tools: s.tools?.map((tool) => {
						if (tool.name !== toolName) return tool;
						return {
							...tool,
							enabled: tool.enabled === false ? true : false
						};
					})
				};
			}));
			try {
				const tool = server.tools?.find((candidate) => candidate.name === toolName);
				assertMcpOperation(await wb.mcp.setToolEnabled({
					id: server.id,
					toolName,
					enabled: tool?.enabled === false
				}));
			} catch {
				toast.error(t("mcp.toggleToolError"));
				toolIntentGuardRef.current.clear(toolKey);
				await loadServers(true);
			} finally {
				const nextTogglingTools = new Set(togglingToolsRef.current);
				nextTogglingTools.delete(toolKey);
				togglingToolsRef.current = nextTogglingTools;
				setTogglingTools(nextTogglingTools);
			}
		}, [loadServers, t]);
		/**
		* 打开配置编辑器
		*/
		const handleOpenConfig = (0, import_react$7.useCallback)(() => {
			onOpenConfig?.();
			setShowConfigEditor(true);
		}, [onOpenConfig]);
		/**
		* 打开 MCP 市场
		*/
		const handleOpenMarket = (0, import_react$7.useCallback)(async () => {
			let marketUrl = DEFAULT_MCP_MARKET_URL;
			try {
				const links = await adapter?.getProductLinks?.();
				if (links?.mcpMarketUrl) marketUrl = links.mcpMarketUrl;
			} catch (error) {
				console.warn("Failed to get MCP market URL from adapter:", error);
			}
			if (adapter?.openExternal) adapter.openExternal(marketUrl);
			else window.open(marketUrl, "_blank");
		}, [adapter]);
		/**
		* 打开 MCP Hub（区分司内/司外）
		*/
		const handleOpenHub = (0, import_react$7.useCallback)(() => {
			const hubUrl = isIOA ? MCP_HUB_URL_INTERNAL : MCP_HUB_URL_EXTERNAL;
			if (adapter?.openExternal) adapter.openExternal(hubUrl);
			else window.open(hubUrl, "_blank");
		}, [adapter, isIOA]);
		/**
		* 打开 MCP 文档
		*/
		const handleTroubleshooting = (0, import_react$7.useCallback)(async () => {
			let docUrl = DEFAULT_MCP_DOCUMENT_URL;
			try {
				const links = await adapter?.getProductLinks?.();
				if (links?.mcpDocumentUrl) docUrl = links.mcpDocumentUrl;
			} catch (error) {
				console.warn("Failed to get MCP document URL from adapter:", error);
			}
			if (adapter?.openExternal) adapter.openExternal(docUrl);
			else window.open(docUrl, "_blank");
		}, [adapter]);
		/**
		* 复制错误日志
		*/
		const handleCopyLog = (0, import_react$7.useCallback)(async (error) => {
			if (await copyToClipboard(error)) toast.success(t("common.copied"));
			else {
				console.error("Failed to copy to clipboard");
				toast.error(t("common.copyFailed") || "Copy failed");
			}
		}, [t]);
		const getStatusColor = (status) => {
			switch (status) {
				case "connected": return "#52c41a";
				case "connecting": return "#faad14";
				case "disconnected": return "#ff6b6b";
				case "idle":
				case "disabled": return "#8c8c8c";
			}
		};
		const getServerInitial = (name) => name.charAt(0).toUpperCase();
		const renderServerItem = (server) => {
			const isExpanded = expandedServers.has(server.name);
			const isConnecting = server.status === "connecting";
			const hasError = !!server.error;
			const hasTools = server.tools && server.tools.length > 0;
			const toolCount = server.tools?.length ?? 0;
			const enabledCount = server.tools?.filter((tool) => tool.enabled !== false).length ?? 0;
			const promptCount = server.prompts?.length ?? 0;
			const resourceCount = (server.resources?.length ?? 0) + (server.resourceTemplates?.length ?? 0);
			const hasItems = hasTools || promptCount > 0 || resourceCount > 0;
			const needsAuth = server.needsAuth || server.error?.includes("401") || server.error?.toLowerCase().includes("auth");
			const canDelete = server.editable;
			const canManageServer = server.editable;
			const iconColor = getIconColor$1(server.name);
			const displayName = server.name;
			const sourcePlugin = server.sourcePluginName;
			const sourcePluginTitle = server.sourceMarketplaceName && sourcePlugin ? `${server.sourceMarketplaceName}/${sourcePlugin}` : sourcePlugin;
			const needsApproval = server.trusted === false;
			const toggleState = getMcpToggleState(server, togglingServers.has(server.name), needsApproval);
			const isEnabled = toggleState.checked;
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: `mcp-item ${hasError ? "mcp-item--error" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-item-header",
						onClick: () => toggleExpanded(server),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronIcon, { expanded: isExpanded }),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
								className: "mcp-item-icon",
								style: { background: iconColor },
								children: server.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
									src: server.logoUrl,
									alt: "",
									width: 18,
									height: 18,
									style: { borderRadius: 4 },
									draggable: false
								}) : getServerInitial(server.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "mcp-item-info",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
									className: "mcp-item-name",
									title: displayName,
									children: [displayName, /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
										className: `mcp-item-status ${isConnecting ? "mcp-item-status--connecting" : ""}`,
										style: { backgroundColor: getStatusColor(server.status) }
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
									className: "mcp-item-meta",
									children: [
										sourcePlugin && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
											className: "mcp-item-source",
											title: sourcePluginTitle,
											children: t("mcp.fromPlugin", { plugin: sourcePlugin })
										}), "  "] }),
										toolCount > 0 ? t("mcp.toolsEnabled", {
											enabled: String(enabledCount),
											total: String(toolCount)
										}) : t("mcp.tools"),
										(promptCount > 0 || resourceCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: ["  ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
											className: "mcp-item-meta-extra",
											children: t("mcp.promptsAndResources", {
												prompts: String(promptCount),
												resources: String(resourceCount)
											})
										})] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "mcp-item-actions",
								onClick: (e) => e.stopPropagation(),
								children: [
									needsApproval && canDelete && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
										className: "mcp-item-action",
										onClick: (e) => {
											e.stopPropagation();
											setServerToDelete(server);
											setShowDeleteConfirm(true);
										},
										title: t("common.delete"),
										children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DeleteIcon, {})
									}),
									!needsApproval && canManageServer && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [isExpanded && isEnabled && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
										className: `mcp-item-action ${isConnecting ? "mcp-item-action--spinning" : ""}`,
										onClick: (e) => handleReconnect(server, e),
										title: t("mcp.reconnect"),
										disabled: isConnecting,
										children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RefreshIcon$1, {})
									}), isExpanded && canDelete && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
										className: "mcp-item-action",
										onClick: (e) => {
											e.stopPropagation();
											setServerToDelete(server);
											setShowDeleteConfirm(true);
										},
										title: t("common.delete"),
										children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DeleteIcon, {})
									})] }),
									canManageServer && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ToggleSwitch, {
										checked: toggleState.checked,
										onChange: () => handleToggleServer(server, { stopPropagation: () => {} }),
										disabled: toggleState.disabled
									})
								]
							})
						]
					}),
					needsApproval && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-item-approval",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "mcp-item-approval-text",
							children: t("mcp.approvalRequired")
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "mcp-item-approval-actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
								className: "mcp-item-approval-btn mcp-item-approval-btn--approve",
								onClick: (e) => {
									e.stopPropagation();
									handleTrustServer(server, e);
								},
								children: t("mcp.approve")
							})
						})]
					}),
					hasError && !needsAuth && !needsApproval && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-item-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "mcp-item-error-content",
							children: server.error
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "mcp-item-error-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
									className: "mcp-item-error-link",
									onClick: (e) => handleReconnect(server, e),
									children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RefreshIcon$1, {}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("mcp.reconnect") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
									className: "mcp-item-error-link",
									onClick: handleTroubleshooting,
									children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ExternalLinkIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("mcp.troubleshooting") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
									className: "mcp-item-error-link",
									onClick: () => handleCopyLog(server.error),
									children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CopyIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("mcp.copyLog") })]
								})
							]
						})]
					}),
					needsAuth && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-item-auth",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: "mcp-item-auth-dot" }),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
								className: "mcp-item-auth-text",
								children: t("mcp.needsAuth")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "small",
								onClick: (e) => {
									e.stopPropagation();
									handleReconnect(server, e);
								},
								disabled: oauthAuthorizingServers.has(server.name),
								children: oauthAuthorizingServers.has(server.name) ? t("mcp.authorizing") : t("mcp.connect")
							})
						]
					}),
					isExpanded && hasItems && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-item-tools",
						children: [
							server.tools?.map((tool) => {
								const toolKey = `${server.name}/${tool.name}`;
								const isToggling = togglingTools.has(toolKey);
								const isDisabled = tool.enabled === false;
								return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
									type: "button",
									className: `mcp-item-tool ${isDisabled ? "mcp-item-tool--disabled" : ""} ${isToggling ? "mcp-item-tool--toggling" : ""}`,
									title: tool.description,
									disabled: isToggling || !isEnabled,
									onClick: () => handleToggleTool(server, tool.name),
									children: tool.name
								}, `tool:${tool.name}`);
							}),
							server.prompts?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
								className: "mcp-item-tool mcp-item-tool--readonly",
								title: p.description,
								children: p.name
							}, `prompt:${p.name}`)),
							server.resources?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
								className: "mcp-item-tool mcp-item-tool--readonly",
								title: r.description ?? r.uri,
								children: r.name ?? r.uri
							}, `resource:${r.uri}`)),
							server.resourceTemplates?.map((rt) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
								className: "mcp-item-tool mcp-item-tool--readonly",
								title: rt.description ?? rt.uriTemplate,
								children: rt.name ?? rt.uriTemplate
							}, `resourceTemplate:${rt.uriTemplate}`))
						]
					})
				]
			}, server.name);
		};
		if (!visible) return null;
		if (showConfigEditor) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "mcp-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(McpConfigEditor, {
				visible: showConfigEditor,
				onBack: () => {
					setShowConfigEditor(false);
					loadServers();
				},
				onSave: () => loadServers()
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "mcp-panel",
			children: [
				!isModal && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "mcp-panel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-panel-header-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h2", {
							className: "mcp-panel-title",
							children: t("mcp.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
							className: "mcp-panel-subtitle",
							children: t("mcp.empty.description")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-panel-header-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "medium",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AddIcon, {}),
							onClick: handleOpenConfig,
							children: t("mcp.addServer")
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "medium",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ExternalLinkIcon, {}),
							onClick: handleOpenMarket,
							children: "MCP Market"
						})]
					})]
				}),
				isModal && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "mcp-panel-modal-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "medium",
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AddIcon, {}),
						onClick: handleOpenConfig,
						children: t("mcp.addServer")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "mcp-panel-search",
					style: {
						display: "flex",
						alignItems: "center",
						gap: "8px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						style: { flex: 1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SearchInput, {
							placeholder: t("mcp.searchPlaceholder"),
							value: searchText,
							onChange: (value) => setSearchText(value),
							size: "small",
							clearable: true
						})
					}), mcpHubEnabled && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "medium",
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ExternalLinkIcon, {}),
						onClick: handleOpenHub,
						style: {
							whiteSpace: "nowrap",
							flexShrink: 0
						},
						children: "MCP Hub"
					})]
				}),
				servers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "mcp-panel-section-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h3", {
							className: "mcp-panel-section-title",
							children: t("mcp.myMcp")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "mcp-installed-badge",
							children: filteredServers.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
							className: "mcp-panel-status-summary",
							children: [
								statusSummary.enabled,
								" ",
								t("mcp.statusEnabled"),
								statusSummary.error > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
									className: "status-count-error",
									children: [
										statusSummary.error,
										" ",
										t("mcp.statusFailed")
									]
								})] })
							]
						})
					]
				}),
				enabledToolsCount > TOOLS_LIMIT && !warningDismissed && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "mcp-tools-warning",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-tools-warning-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "mcp-tools-warning-icon",
							children: "⚠"
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "mcp-tools-warning-text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: t("mcp.toolsLimitWarning.title") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: t("mcp.toolsLimitWarning.description", { limit: String(TOOLS_LIMIT) }) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
						type: "button",
						className: "mcp-tools-warning-dismiss",
						onClick: () => setWarningDismissed(true),
						children: t("mcp.toolsLimitWarning.dismiss")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "mcp-panel-content",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: "mcp-panel-list",
						children: Array.from({ length: SKELETON_COUNT$1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(McpCardSkeleton, {}, i))
					}) : filteredServers.length === 0 && servers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "mcp-panel-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(McpIcon, {
								width: 48,
								height: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
								className: "mcp-panel-empty-title",
								children: t("mcp.empty.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
								className: "mcp-panel-empty-desc",
								children: t("mcp.empty.description")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "medium",
								onClick: handleOpenConfig,
								children: t("mcp.addServer")
							})
						]
					}) : filteredServers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: "mcp-panel-empty",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
							className: "mcp-panel-empty-desc",
							children: t("mcp.searchEmpty")
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: "mcp-panel-list",
						children: filteredServers.map(renderServerItem)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConfirmDialog, {
					visible: showDeleteConfirm,
					title: t("mcp.deleteConfirm.title"),
					content: t("mcp.deleteConfirm.description", { name: serverToDelete?.name ?? "" }),
					confirmText: t("common.delete"),
					cancelText: t("common.cancel"),
					confirmVariant: "danger",
					onConfirm: handleDelete,
					onClose: () => {
						setShowDeleteConfirm(false);
						setServerToDelete(null);
					}
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/mcp/mcp-modal.tsx
var import_react$6, import_react_dom$1, import_jsx_runtime$5, BUILTIN_ARDOT_MCP_SERVER_NAME, CloseIcon$1, McpModal;
var init_mcp_modal = __esmMin((() => {
	init_mcp_modal$1();
	init_src();
	init_mcp();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_app_core();
	init_icons$1();
	init_useI18n();
	init_polling_interval();
	init_context();
	init_mcp_config_editor();
	init_mcp_panel();
	init_mcp_server_loader();
	import_jsx_runtime$5 = require_jsx_runtime();
	BUILTIN_ARDOT_MCP_SERVER_NAME = "ardot";
	CloseIcon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
			d: "M12 4L4 12M4 4L12 12",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	McpModal = ({ visible, onClose }) => {
		const [showConfigEditor, setShowConfigEditor] = (0, import_react$6.useState)(false);
		const t = useTranslation();
		const { reporter } = useModuleHost();
		const { reportEvent, Events } = reporter;
		const reportEventRef = (0, import_react$6.useRef)(reportEvent);
		reportEventRef.current = reportEvent;
		const EventsRef = (0, import_react$6.useRef)(Events);
		EventsRef.current = Events;
		const knownServerNamesRef = (0, import_react$6.useRef)(null);
		const reportedServerNamesRef = (0, import_react$6.useRef)(/* @__PURE__ */ new Set());
		const customMcpConnectStartTimesRef = (0, import_react$6.useRef)(/* @__PURE__ */ new Map());
		(0, import_react$6.useEffect)(() => {
			if (!visible) {
				knownServerNamesRef.current = null;
				reportedServerNamesRef.current.clear();
				customMcpConnectStartTimesRef.current.clear();
				return;
			}
			const getMcpServers = () => getMcpServersDeduped(wb.mcp, { caller: "mcp-modal:track" });
			const processServers = (servers) => {
				if (knownServerNamesRef.current === null) return;
				const filteredServers = (servers ?? []).filter((s) => s.name !== BUILTIN_ARDOT_MCP_SERVER_NAME);
				const known = knownServerNamesRef.current;
				const reported = reportedServerNamesRef.current;
				const startTimes = customMcpConnectStartTimesRef.current;
				for (const server of filteredServers) {
					if (known.has(server.name)) continue;
					if (reported.has(server.name)) continue;
					if (server.status === "connecting") {
						if (!startTimes.has(server.name)) startTimes.set(server.name, Date.now());
					} else if (server.status === "connected") {
						const startTime = startTimes.get(server.name);
						const cost = startTime ? Date.now() - startTime : void 0;
						const toolCount = server.tools?.length ?? 0;
						const successAt = Date.now();
						reportEventRef.current(EventsRef.current.CustomMcpConnectSuccess, {
							mcpId: server.id,
							mcpName: server.name,
							toolCount,
							cost,
							successAt
						});
						reportEventRef.current(EventsRef.current.ConnectorAuthResult, {
							entry: "management_page",
							connectorId: server.id,
							connectorName: server.name,
							connectorType: "customMCP",
							isOfficial: false,
							isSuccessful: true,
							status: "success",
							cost: cost ?? 0,
							isReconnect: false,
							resultAt: successAt
						});
						reported.add(server.name);
						startTimes.delete(server.name);
					}
				}
			};
			let cancelled = false;
			const initKnown = async () => {
				try {
					const result = await getMcpServers();
					if (cancelled) return;
					const filtered = (result ?? []).filter((s) => s.name !== BUILTIN_ARDOT_MCP_SERVER_NAME);
					knownServerNamesRef.current = new Set(filtered.map((s) => s.name));
				} catch (err) {
					console.warn("[McpModal] init known servers failed:", err);
					knownServerNamesRef.current = /* @__PURE__ */ new Set();
				}
			};
			initKnown();
			let pollTimer = null;
			const scheduleFallbackPoll = () => {
				pollTimer = setTimeout(() => {
					if (cancelled || knownServerNamesRef.current !== null) return;
					getMcpServers().then((result) => {
						if (cancelled) return;
						processServers(result);
					}).catch((err) => {
						console.warn("[McpModal] fallback poll getMcpServers failed:", err);
					}).finally(() => {
						if (!cancelled && knownServerNamesRef.current === null) scheduleFallbackPoll();
					});
				}, applyPollJitter(5e3));
			};
			scheduleFallbackPoll();
			const unsubscribe = wb.on(WB_MCP_CHANGED, () => {
				getMcpServersDeduped(wb.mcp, {
					caller: "mcp-modal:changed",
					force: true
				}).then(processServers).catch(() => void 0);
			});
			return () => {
				cancelled = true;
				if (pollTimer) clearTimeout(pollTimer);
				unsubscribe?.();
			};
		}, [visible]);
		(0, import_react$6.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, onClose]);
		(0, import_react$6.useEffect)(() => {
			if (!visible) setShowConfigEditor(false);
		}, [visible]);
		const handleOverlayClick = (0, import_react$6.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		if (!visible) return null;
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "mcp-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "mcp-modal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "mcp-modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "mcp-modal-header-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
							className: "mcp-modal-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(McpIcon, {
								width: 20,
								height: 20
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "mcp-modal-header-text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", {
								className: "mcp-modal-title",
								children: t("mcp.modal.title")
							}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
								className: "mcp-modal-subtitle",
								children: t("mcp.modal.subtitle")
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "mcp-modal-header-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
							type: "button",
							variant: "secondary",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AddIcon, {}),
							onClick: () => setShowConfigEditor(true),
							children: t("mcp.addServer")
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							className: "mcp-modal-close",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CloseIcon$1, {})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "mcp-modal-body",
					children: showConfigEditor ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "mcp-panel",
						style: { height: "100%" },
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(McpConfigEditor, {
							visible: showConfigEditor,
							onBack: () => setShowConfigEditor(false)
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(McpPanel, {
						visible,
						active: visible,
						isModal: true,
						onOpenConfig: () => setShowConfigEditor(true)
					})
				})]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-card-action.tsx
/**
* 连接器卡片右侧操作按钮。
*
* 只负责按连接状态切换图标与视觉状态，连接、取消、试用的业务处理仍由页面传入。
*/
function ConnectorCardAction(props) {
	const { cancelLabel, connectLabel, isCancellable, onCancel, status } = props;
	const isTryLoading = props.kind === "installed" && props.isTryLoading;
	if (status === "connecting" && !isTryLoading) {
		const className = isCancellable ? "connector-connect-btn connector-connect-btn--loading connector-connect-btn--cancellable" : "connector-connect-btn connector-connect-btn--loading";
		const label = isCancellable ? cancelLabel : connectLabel;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
			type: "button",
			className,
			onClick: isCancellable ? onCancel : void 0,
			disabled: !isCancellable,
			title: label,
			"aria-label": label,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "connector-connect-btn__loading-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ConnectorLoadingIcon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "connector-connect-btn__cancel-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ConnectorCancelIcon, {})
			})]
		});
	}
	if (props.kind === "installed") {
		if (status === "unauthorized" || status === "error") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
			content: props.retryLabel,
			placement: "top",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				type: "button",
				className: "connector-connect-btn",
				onClick: props.onRetry,
				"aria-label": props.retryLabel,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ConnectorAddIcon, {})
			})
		});
		if (props.hasConnectedIndicator && props.hasTryExample) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
			content: props.tryItOutLabel,
			placement: "top",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				type: "button",
				className: "connector-connect-btn connector-connect-btn--try",
				onClick: props.onTry,
				disabled: props.isTryLoading,
				"aria-label": props.tryItOutLabel,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ConnectorTryIcon, {})
			})
		});
		return null;
	}
	const isReconnect = status === "error";
	const actionLabel = isReconnect ? props.reconnectLabel : connectLabel;
	const actionIcon = isReconnect ? props.refreshIcon : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ConnectorAddIcon, {});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
		type: "button",
		className: "connector-connect-btn",
		onClick: props.onConnect,
		title: actionLabel,
		"aria-label": actionLabel,
		"data-track-id": "connector_connect",
		"data-track-name": "连接",
		"data-track-props": props.connectTrackingProps,
		children: actionIcon
	});
}
var import_jsx_runtime$4, ConnectorAddIcon, ConnectorLoadingIcon, ConnectorTryIcon, ConnectorCancelIcon;
var init_connector_card_action = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$4 = require_jsx_runtime();
	ConnectorAddIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		className: "connector-connect-btn__icon-add",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M8.6 8.6V13H7.4V8.6H3V7.4H7.4V3H8.6V7.4H13V8.6H8.6Z",
			fill: "currentColor",
			fillOpacity: "1",
			fillRule: "evenodd"
		})
	});
	ConnectorLoadingIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		className: "connector-connect-btn__icon-loading",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M8.6 1.5V5.5H7.4V1.5H8.6ZM10.4649 7.2697L13.9291 5.2697L13.329 4.2305L9.8649 6.2305L10.4649 7.2697ZM5.5351 7.2698L2.07097 5.2698L2.67097 4.2305L6.1351 6.2305L5.5351 7.2698ZM9.8649 9.7697L13.329 11.7697L13.9291 10.7305L10.4649 8.7305L9.8649 9.7697ZM6.1351 9.7697L2.67097 11.7697L2.07097 10.7305L5.5351 8.7305L6.1351 9.7697ZM8.6 10.5V14.5H7.4V10.5H8.6Z",
			fill: "currentColor",
			fillOpacity: "1",
			fillRule: "evenodd"
		})
	});
	ConnectorTryIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		className: "connector-connect-btn__icon-try",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M8 0.7791C8.0348 0.7791 8.0704 0.7791 8.1067 0.7791C8.8002 0.7786 9.7597 0.7779 10.7255 0.949C11.7418 1.1293 12.8344 1.5106 13.666 2.3427C15.0589 3.7368 15.2265 5.6176 15.2265 7.0595C15.2265 8.5013 15.0587 10.3812 13.666 11.7753C12.8674 12.5745 11.867 12.9615 10.914 13.1512C9.965 13.3402 9.0187 13.3417 8.3046 13.3397C8.0717 13.3391 7.7519 13.4804 7.342 13.8739C6.9436 14.2562 6.5385 14.8018 6.1394 15.4286L5.1267 14.7841C5.5446 14.1275 6.0099 13.4881 6.5107 13.0077C6.9991 12.5388 7.6082 12.1378 8.3076 12.1395C9.0267 12.1415 9.8625 12.1372 10.6796 11.9745C11.4926 11.8126 12.2424 11.5024 12.8173 10.9276C13.8464 9.8976 14.0273 8.4574 14.0273 7.0595C14.0273 5.6616 13.8463 4.2214 12.8173 3.1913C12.2298 2.6034 11.4112 2.2894 10.5166 2.1308C9.6542 1.9779 8.7854 1.9782 8.0786 1.9784L8 1.9784L7.921 1.9784C7.2145 1.9782 6.3454 1.9779 5.4834 2.1308C4.5887 2.2894 3.7701 2.6033 3.1824 3.1913C2.1535 4.2214 1.9726 5.6616 1.9726 7.0595C1.9727 8.4573 2.1536 9.8976 3.1824 10.9276C3.8228 11.5683 4.6817 11.8792 5.5986 12.0233L5.5058 12.6161L5.4121 13.2089C4.3631 13.0439 3.2234 12.6654 2.3339 11.7753C0.9412 10.3812 0.7734 8.5013 0.7734 7.0595C0.7734 5.6176 0.941 3.7368 2.3339 2.3427C3.1654 1.5107 4.2572 1.1293 5.2734 0.949C6.239 0.7778 7.1987 0.7786 7.8923 0.7791C7.9289 0.7791 7.9648 0.7791 8 0.7791ZM11.2772 8.7571L9.2055 7.9275Q9.1632 7.9106 9.0821 7.8789Q8.7781 7.7601 8.6527 7.6837Q8.2385 7.4314 8.2387 6.9986Q8.2389 6.5658 8.6533 6.3138Q8.7787 6.2375 9.0828 6.119Q9.164 6.0874 9.2062 6.0705L11.2776 5.2429L11.7228 6.3573L10.1157 6.9994L11.7233 7.6431L11.2772 8.7571ZM5.976 8.4987V5.4987H4.776V8.4987H5.976Z",
			fill: "currentColor",
			fillOpacity: "1",
			fillRule: "evenodd"
		})
	});
	ConnectorCancelIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		className: "connector-connect-btn__icon-cancel",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M15 8Q15 5.1005 12.9497 3.0503Q10.8995 1 8 1Q5.1005 1 3.0503 3.0503Q1 5.1005 1 8Q1 10.8995 3.0503 12.9497Q5.1005 15 8 15Q9.2074 15 10.345 14.5955Q11.4826 14.1911 12.4189 13.4289L11.5685 12.5784Q10.0372 13.8 8 13.8Q5.5976 13.8 3.8988 12.1012Q2.2 10.4024 2.2 8Q2.2 5.5976 3.8988 3.8988Q5.5976 2.2 8 2.2Q10.4024 2.2 12.1012 3.8988Q13.8 5.5976 13.8 8Q13.8 10.052 12.5606 11.5907L13.4109 12.441Q14.1815 11.502 14.5908 10.3584Q15 9.2147 15 8ZM10.9243 10.0757L8.8485 8L10.9243 5.9243L10.0757 5.0757L8 7.1515L5.9243 5.0757L5.0757 5.9243L7.1515 8L5.0757 10.0757L5.9243 10.9243L8 8.8485L10.0757 10.9243L10.9243 10.0757Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-grouping.ts
/**
* 判断 connector 是否归入「已连接」组（管理页 installed 区）。
*
* 规则（与 connector-menu-item 的开关渲染语义对齐，plan §2.3）：
*   - bound=true：已进入开关管理生命周期（曾完整接入且未解绑），即使当前
*     授权或网络异常也留在已连接组，用户视角是「已添加，只是当前未授权/出错」
*   - connected / pending：当前正在使用或正在连接 → 归入已连接组
*   - enabled=true：用户明确开启（正常情况下蕴含 bound，防御性保留）
*
* 仅当 unbind 主动解绑（bound 清 false）或确实从未接入过时，connector 才会
* 回到「可用」组。
*
* Issue #46965：用户绕过 WorkBuddy 直接 `lark-cli auth logout` 后，飞书在两端 UI
* 都应显示「已添加但未授权」，而非管理页变成「从未连接」、菜单显示关闭开关的状态错配。
* bound 不表示有凭据，凭据丢失只体现为 connected=false / reason。
*/
function isInstalledConnector(state) {
	if (!state) return false;
	return state.bound === true || state.connected === true || state.pending === true || state.enabled === true;
}
var init_connector_grouping = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-overlay-scrollbar.tsx
/** 覆盖式滚动滑块：不占用滚动容器的内容空间，支持 hover 展示与 pointer 拖拽。 */
function ConnectorOverlayScrollbar({ scrollRef, topInset, bottomInset, className }) {
	const dragRef = (0, import_react$4.useRef)(null);
	const [thumb, setThumb] = (0, import_react$4.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react$4.useState)(false);
	const updateThumb = (0, import_react$4.useCallback)(() => {
		const scrollElement = scrollRef.current;
		if (!scrollElement || scrollElement.scrollHeight <= scrollElement.clientHeight) {
			setThumb(null);
			return;
		}
		const height = Math.min(MAX_THUMB_HEIGHT, Math.max(MIN_THUMB_HEIGHT, scrollElement.clientHeight * scrollElement.clientHeight / scrollElement.scrollHeight));
		const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
		const maxThumbTop = Math.max(topInset, scrollElement.clientHeight - bottomInset - height);
		setThumb({
			height,
			top: scrollElement.offsetTop + topInset + (maxThumbTop - topInset) * scrollElement.scrollTop / maxScrollTop
		});
	}, [
		bottomInset,
		scrollRef,
		topInset
	]);
	(0, import_react$4.useLayoutEffect)(() => {
		updateThumb();
	}, [updateThumb]);
	(0, import_react$4.useEffect)(() => {
		const scrollElement = scrollRef.current;
		if (!scrollElement) return;
		const resizeObserver = new ResizeObserver(updateThumb);
		resizeObserver.observe(scrollElement);
		scrollElement.addEventListener("scroll", updateThumb);
		window.addEventListener("resize", updateThumb);
		return () => {
			resizeObserver.disconnect();
			scrollElement.removeEventListener("scroll", updateThumb);
			window.removeEventListener("resize", updateThumb);
		};
	}, [scrollRef, updateThumb]);
	const handlePointerDown = (0, import_react$4.useCallback)((event) => {
		const scrollElement = scrollRef.current;
		if (!scrollElement || !thumb) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		dragRef.current = {
			pointerId: event.pointerId,
			startClientY: event.clientY,
			startScrollTop: scrollElement.scrollTop
		};
		setIsDragging(true);
		event.preventDefault();
	}, [scrollRef, thumb]);
	const handlePointerMove = (0, import_react$4.useCallback)((event) => {
		const scrollElement = scrollRef.current;
		const drag = dragRef.current;
		if (!scrollElement || !drag || drag.pointerId !== event.pointerId || !thumb) return;
		const trackHeight = scrollElement.clientHeight - topInset - bottomInset - thumb.height;
		const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
		if (trackHeight > 0 && maxScrollTop > 0) scrollElement.scrollTop = drag.startScrollTop + (event.clientY - drag.startClientY) * maxScrollTop / trackHeight;
		event.preventDefault();
	}, [
		bottomInset,
		scrollRef,
		thumb,
		topInset
	]);
	const handlePointerEnd = (0, import_react$4.useCallback)((event) => {
		if (dragRef.current?.pointerId !== event.pointerId) return;
		dragRef.current = null;
		setIsDragging(false);
	}, []);
	if (!thumb) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: `${className}${isDragging ? " is-dragging" : ""}`,
		role: "scrollbar",
		"aria-controls": scrollRef.current?.id,
		"aria-orientation": "vertical",
		"aria-valuemin": 0,
		"aria-valuemax": Math.max(0, (scrollRef.current?.scrollHeight ?? 0) - (scrollRef.current?.clientHeight ?? 0)),
		"aria-valuenow": scrollRef.current?.scrollTop ?? 0,
		onPointerDown: handlePointerDown,
		onPointerMove: handlePointerMove,
		onPointerUp: handlePointerEnd,
		onPointerCancel: handlePointerEnd,
		style: {
			height: thumb.height,
			transform: `translateY(${thumb.top}px)`
		}
	});
}
var import_react$4, import_jsx_runtime$3, MAX_THUMB_HEIGHT, MIN_THUMB_HEIGHT;
var init_connector_overlay_scrollbar = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$3 = require_jsx_runtime();
	MAX_THUMB_HEIGHT = 350;
	MIN_THUMB_HEIGHT = 24;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-search-bar.tsx
var import_react$3, import_jsx_runtime$2, DEBOUNCE_DELAY, ConnectorSearchBar;
var init_connector_search_bar = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_use_debounced_value();
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	DEBOUNCE_DELAY = 200;
	ConnectorSearchBar = ({ value, onChange, placeholder }) => {
		const t = useTranslation();
		const [localValue, setLocalValue] = (0, import_react$3.useState)(value);
		const isComposingRef = (0, import_react$3.useRef)(false);
		const debouncedValue = useDebouncedValue(localValue, DEBOUNCE_DELAY);
		(0, import_react$3.useEffect)(() => {
			setLocalValue(value);
		}, [value]);
		(0, import_react$3.useEffect)(() => {
			if (!isComposingRef.current && debouncedValue !== value) onChange(debouncedValue);
		}, [debouncedValue]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "ec-search-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Input.Search, {
				value: localValue,
				onChange: (e) => setLocalValue(e.target.value),
				onCompositionStart: () => {
					isComposingRef.current = true;
				},
				onCompositionEnd: (e) => {
					const nextValue = e.currentTarget.value;
					isComposingRef.current = false;
					setLocalValue(nextValue);
					if (nextValue !== value) onChange(nextValue);
				},
				placeholder: placeholder ?? t("connectorPanel.searchPlaceholder"),
				allowClear: true,
				clearAriaLabel: t("connectorPanel.searchClear") || "Clear search"
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/use-enterprise-connector-sync.ts
function useEnterpriseConnectorSync({ enabled }) {
	const host = useModuleHost();
	const facade = host.facades.connector;
	const connectorManager = host.connectorManager;
	const [enterpriseConnectors, setEnterpriseConnectors] = (0, import_react$2.useState)([]);
	const [loading, setLoading] = (0, import_react$2.useState)(false);
	const hiddenNamesRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Set());
	const disconnectedRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Set());
	const pollIntervalSecRef = (0, import_react$2.useRef)(60);
	const fetchEnterprise = (0, import_react$2.useCallback)(async () => {
		if (!facade?.registry2cList) return;
		setLoading(true);
		try {
			const result = await facade.registry2cList({ scope: "enterprise" });
			const plan = planRevocations(result.revoked, disconnectedRef.current);
			for (const name of plan.hiddenNames) hiddenNamesRef.current.add(name);
			for (const name of plan.namesToDisconnect) {
				disconnectedRef.current.add(name);
				try {
					await connectorManager?.disconnect(name);
				} catch (e) {
					console.warn(`${TAG} disconnect failed for ${name}:`, e);
				}
			}
			pollIntervalSecRef.current = resolveNextPollIntervalSec(pollIntervalSecRef.current, result.nextPollIntervalSec);
			setEnterpriseConnectors(buildVisibleEnterpriseConfigs(result.list, hiddenNamesRef.current));
		} catch (e) {
			console.warn(`${TAG} registry2cList failed:`, e);
		} finally {
			setLoading(false);
		}
	}, [facade, connectorManager]);
	(0, import_react$2.useEffect)(() => {
		if (!enabled) return;
		let cancelled = false;
		let timer = null;
		const loop = async () => {
			await fetchEnterprise();
			if (cancelled) return;
			timer = setTimeout(loop, pollIntervalSecRef.current * 1e3);
		};
		loop().catch(() => {});
		return () => {
			cancelled = true;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		};
	}, [enabled, fetchEnterprise]);
	return {
		enterpriseConnectors,
		loading,
		refresh: fetchEnterprise
	};
}
var import_react$2, TAG;
var init_use_enterprise_connector_sync = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_enterprise_connector_core();
	TAG = "[EnterpriseConnectorSync]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/panel/connector-panel.tsx
function getTryExamples(connector) {
	return connector.examples ?? [];
}
/**
* 从新契约三事实（bound/enabled/connected + reason）+ 本端 pending 派生卡片展示态。
* 仅用于视觉分支（状态点 / 操作按钮 / 红字），不参与「连接 vs 开关」判定。
*/
function deriveConnectorCardStatus(state) {
	if (isConnectorPending(state)) return "connecting";
	if (state?.reason) return connectorNeedsAuthorize(state) ? "unauthorized" : "error";
	return isConnectorConnected(state) ? "connected" : "disconnected";
}
var import_react$1, import_react_dom, import_jsx_runtime$1, ICON_COLORS, getIconColor, RefreshIcon, CloseIcon, ChevronExpandIcon, ConnectorDetailTipIcon, ConnectorDetailFlowIcon, ConnectorDetailTryIcon, ConnectorDetailLoadingIcon, ConnectorDetailConnectIcon, ConnectorDetailUnbindIcon, ConnectorCardSkeleton, ConnectorEmptyIcon, SKELETON_COUNT, CONNECTOR_LOAD_TIMEOUT_MS, ConnectorPanel;
var init_connector_panel = __esmMin((() => {
	init_connector_panel$1();
	init_ConnectorsPanel$2();
	init_src$1();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_header_workbuddy();
	init_icons$1();
	init_ConnectorsPanel();
	init_workbuddy_topbar();
	init_use_ima_enabled();
	init_use_market_page_load();
	init_use_named_page_show();
	init_use_narrow_layout();
	init_use_oneid_applications();
	init_use_oneid_connector_gate();
	init_use_vpc_connector_policy();
	init_i18n();
	init_useI18n();
	init_office_return_intent();
	init_router();
	init_use_custom_connector_policy();
	init_telemetry();
	init_keyword_match();
	init_market_perf();
	init_common();
	init_connector_display();
	init_connector_navigate();
	init_context();
	init_enterprise_connector_core();
	init_entry_show_rate_limit();
	init_mcp_modal();
	init_mcp_server_loader();
	init_store();
	init_telemetry_helpers();
	init_use_cancellable_connecting();
	init_use_enterprise_connector_configs();
	init_use_visible_mcp_connectors();
	init_utils();
	init_library_connector_id();
	init_tencent_docs_id();
	init_connector_card_action();
	init_connector_grouping();
	init_connector_overlay_scrollbar();
	init_connector_search_bar();
	init_oneid_refresh_throttle();
	init_use_enterprise_connector_sync();
	import_jsx_runtime$1 = require_jsx_runtime();
	ICON_COLORS = [
		"#6366f1",
		"#8b5cf6",
		"#ec4899",
		"#f97316",
		"#14b8a6",
		"#3b82f6",
		"#10b981",
		"#f43f5e",
		"#06b6d4",
		"#a855f7"
	];
	getIconColor = (name) => {
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = (hash << 5) - hash + name.charCodeAt(i);
			hash |= 0;
		}
		return ICON_COLORS[Math.abs(hash) % ICON_COLORS.length];
	};
	RefreshIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		className: "connector-connect-btn__icon-refresh",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C10.0503 2 11.8645 3.00442 12.9497 4.55",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M14 2V5.5H10.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	ChevronExpandIcon = ({ expanded }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		style: {
			transition: "transform 0.2s",
			transform: expanded ? "rotate(180deg)" : "none"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("polyline", { points: "6 9 12 15 18 9" })
	});
	ConnectorDetailTipIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		viewBox: "0 0 16 15.7568",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M2 0.4243L3.4142 1.8385 M14 0.4243L12.5858 1.8385 M0 6.9243H2 M14 6.9243H16",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "butt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M6 9.3885 Q5.0713 8.8521 4.5362 7.9243 Q4 6.9962 4 5.9243 Q4 4.2678 5.1714 3.096 Q6.3432 1.9243 8 1.9243 Q9.6568 1.9243 10.8286 3.096 Q12 4.2678 12 5.9243 Q12 6.9962 11.4639 7.9244 Q10.9733 8.7749 10.15 9.2944 Q10 9.55 10 10.6436 Q10 11.55 9.394 11.7535 Q9.15 11.82 8.7575 11.6137 L6 10.9244",
				stroke: "currentColor",
				strokeWidth: "1.05",
				strokeLinecap: "butt",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M6 12.6241L10 13.6241 M6 14.4244L9 15.1744",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "butt"
			})
		]
	});
	ConnectorDetailFlowIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
		className: "connector-detail-flow-icon",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {})
		]
	});
	ConnectorDetailTryIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		viewBox: "0 0 14.4531 14.6504",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M4.86 14.079 C5.72 12.849 6.52 11.959 7.53 11.959 C9.58 11.959 11.34 11.709 12.47 10.569 C13.65 9.389 13.85 7.839 13.85 6.279 C13.85 4.719 13.65 3.169 12.47 1.989 C11.27 0.799 9.39 0.599 7.23 0.599 C5.07 0.599 3.18 0.799 1.98 1.989 C0.80 3.169 0.60 4.719 0.60 6.279 C0.60 7.839 0.80 9.389 1.98 10.569 C2.65 11.239 3.63 11.669 4.73 11.839",
				stroke: "currentColor",
				strokeWidth: "1.05",
				strokeLinecap: "butt",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M4.603 4.72V7.72",
				stroke: "currentColor",
				strokeWidth: "1.05",
				strokeLinecap: "butt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M10.727 5.021L8.13 6.22L10.727 7.421",
				stroke: "currentColor",
				strokeWidth: "1.05",
				strokeLinecap: "butt",
				strokeLinejoin: "round"
			})
		]
	});
	ConnectorDetailLoadingIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		className: "connector-detail-btn__icon-loading",
		viewBox: "0 0 11.8582 13",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M5.929 0V4 M8.094 5.25L11.558 3.25 M3.764 5.25L0.3 3.25 M8.094 7.75L11.558 9.75 M3.764 7.75L0.3 9.75 M5.929 9V13",
			stroke: "currentColor",
			strokeWidth: "1.05",
			strokeLinecap: "butt"
		})
	});
	ConnectorDetailConnectIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		viewBox: "0 0 15.1719 14.6025",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("g", {
			transform: "translate(0.0212574 0.0174506)",
			stroke: "currentColor",
			strokeWidth: "1.05",
			strokeLinecap: "butt",
			strokeLinejoin: "round",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M8.885 8.0462 C8.938 7.485 8.846 6.906 8.5935 6.439 C8.3408 5.972 7.9248 5.535 7.2658 5.1549 C6.6068 4.7745 6.0214 4.585 5.4845 4.599 C4.9475 4.6134 4.438 4.797 3.9754 5.088 C3.066 5.661 2.346 6.629 1.7347 7.6879 C1.1235 8.7469 0.645 9.857 0.6029 10.6229 C0.573 11.160 0.665 11.695 0.938 12.199 C1.2108 12.703 1.626 13.145 2.2658 13.5147 C2.9058 13.8845 3.503 14.076 4.0471 14.0668 C4.591 14.057 5.101 13.871 5.5563 13.584 C6.245 13.150 6.817 12.496 7.2626 11.7284" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M8.885 8.0462 C8.938 7.485 8.846 6.906 8.5935 6.439 C8.3408 5.972 7.9248 5.535 7.2658 5.1549 C6.6068 4.7745 6.0214 4.585 5.4845 4.599 C4.9475 4.6134 4.438 4.797 3.9754 5.088 C3.066 5.661 2.346 6.629 1.7347 7.6879 C1.1235 8.7469 0.645 9.857 0.6029 10.6229 C0.573 11.160 0.665 11.695 0.938 12.199 C1.2108 12.703 1.626 13.145 2.2658 13.5147 C2.9058 13.8845 3.503 14.076 4.0471 14.0668 C4.591 14.057 5.101 13.871 5.5563 13.584 C6.245 13.150 6.817 12.496 7.2626 11.7284",
				transform: "rotate(180 7.56485 7.284)"
			})]
		})
	});
	ConnectorDetailUnbindIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		viewBox: "0 0 15.8208 14.7305",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("g", {
			transform: "matrix(0.866025 0.5 -0.5 0.866025 4.57577 -3.12676)",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "butt",
			strokeLinejoin: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M5.3942 5.895V3.26 Q5.3942 0.6 8.0542 0.6 Q10.7142 0.6 10.7142 3.26 V5.895" }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M5.3942 9.035V11.67 Q5.3942 14.33 8.0542 14.33 Q10.7142 14.33 10.7142 11.67 V9.035" }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M1.4273 3.4069L3.6331 5.6127 M14.7724 3.4069L12.5666 5.6127 M0 7.4647H3.5658 M12.6338 7.4647H16.1996 M1.6368 11.651L3.7945 9.3982 M14.5628 11.651L12.4051 9.3982" })
			]
		})
	});
	ConnectorCardSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "connector-card connector-card--skeleton",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "connector-skeleton connector-skeleton--icon" }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "connector-card-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "connector-skeleton connector-skeleton--name" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "connector-skeleton connector-skeleton--desc" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "connector-skeleton connector-skeleton--action" })
		]
	});
	ConnectorEmptyIcon = ({ width = 48, height = 48 }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width,
		height,
		viewBox: "0 0 48 48",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("rect", {
				x: "8",
				y: "8",
				width: "32",
				height: "32",
				rx: "8",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M20 20L28 28M28 20L20 28",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				cx: "24",
				cy: "24",
				r: "8",
				stroke: "currentColor",
				strokeWidth: "2"
			})
		]
	});
	SKELETON_COUNT = 9;
	CONNECTOR_LOAD_TIMEOUT_MS = 2e4;
	ConnectorPanel = ({ visible, active, isModal = false, hideHeader, headerLeft, onCustomConnectorRef }) => {
		const { adapter, accountInfo, reporter, wb } = useModuleHost();
		const moduleHost = useOptionalModuleHost();
		const location = useLocation();
		useNamedPageShow({
			active: !!(visible && active),
			elementId: "connector_page_show",
			elementName: "连接器列表页面"
		});
		const { reportEvent, Events } = reporter;
		const t = useTranslation();
		const isLocalMode = adapter?.environmentType === "local";
		const topBarRootClassName = useTopBarRootClassName();
		const { screenWidth } = useNarrowLayout();
		const isTopbarNarrow = screenWidth > 0 && screenWidth < 980;
		const { canAdd: canAddConnector, refresh: refreshCustomConnectorPolicy } = useCustomConnectorPolicy();
		const { connectorEnabled: imaConnectorEnabled } = useImaEnabled();
		const vpcConnectorPolicy = useConnectorPolicy();
		useAutoDisconnectBannedConnectors();
		const tdocOneidGate = useOneidConnectorGate("doc");
		const lexiangOneidGate = useOneidConnectorGate("lexiang");
		const imaOneidGate = useOneidConnectorGate("ima");
		const oneidSource = useOneidSource();
		const oneidEnterpriseId = accountInfo?.enterpriseId ?? "";
		const oneidAccountUid = accountInfo?.userId ?? "";
		const oneidRefreshEnabled = !!oneidSource && (tdocOneidGate.enterpriseGate || lexiangOneidGate.enterpriseGate);
		const lastOneidRefreshAtRef = (0, import_react$1.useRef)(0);
		const lastOneidWindowRefreshAtRef = (0, import_react$1.useRef)(0);
		const refreshOneidApplicationsIfStale = (0, import_react$1.useCallback)(async (lastRefreshAtRef = lastOneidRefreshAtRef) => {
			if (!oneidRefreshEnabled) return false;
			const now = Date.now();
			if (!shouldRefreshOneidApplications(lastRefreshAtRef.current, now)) return false;
			lastRefreshAtRef.current = now;
			await refreshOneidApplications(oneidSource, oneidEnterpriseId, oneidAccountUid);
			return true;
		}, [
			oneidRefreshEnabled,
			oneidSource,
			oneidEnterpriseId,
			oneidAccountUid
		]);
		const [loading, setLoading] = (0, import_react$1.useState)(false);
		const [loadFailed, setLoadFailed] = (0, import_react$1.useState)(false);
		const [networkEnv, setNetworkEnv] = (0, import_react$1.useState)();
		const catalog = useConnectorStore((state) => state.mcpConnectorConfigs);
		const connectors = (0, import_react$1.useMemo)(() => vpcConnectorPolicy.filterAllowed(catalog), [catalog, vpcConnectorPolicy]);
		const connectorStates = useConnectorStore((state) => state.mcpConnectorStates);
		const cancellableIds = useCancellableConnecting(connectorStates);
		const [searchText, setSearchText] = (0, import_react$1.useState)("");
		const [showMcpModal, setShowMcpModal] = (0, import_react$1.useState)(false);
		const [detailConnector, setDetailConnector] = (0, import_react$1.useState)(null);
		const [detailExpanded, setDetailExpanded] = (0, import_react$1.useState)(false);
		const [tryLoading, setTryLoading] = (0, import_react$1.useState)(false);
		const [unbindingConnectorId, setUnbindingConnectorId] = (0, import_react$1.useState)(null);
		const unbindingConnectorIdsRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Set());
		const detailBodyRef = (0, import_react$1.useRef)(null);
		const detailToolsRef = (0, import_react$1.useRef)(null);
		const [detailShowTopFade, setDetailShowTopFade] = (0, import_react$1.useState)(false);
		const [detailShowBottomFade, setDetailShowBottomFade] = (0, import_react$1.useState)(false);
		const updateDetailFades = (0, import_react$1.useCallback)(() => {
			const el = detailBodyRef.current;
			if (!el) return;
			setDetailShowTopFade(el.scrollTop > 0);
			setDetailShowBottomFade(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
		}, []);
		const handleDetailBodyScroll = (0, import_react$1.useCallback)(() => {
			updateDetailFades();
		}, [updateDetailFades]);
		const openDetailModal = (0, import_react$1.useCallback)((connector) => {
			const githubConnected = connectorStatesRef.current[connector.id]?.connected === true;
			if (connector.id === "github" && githubConnected && !isLocalMode) {
				connectorStore.getState().setConnectStatus("github", "connected");
				const platformConnector = connectorStore.getState().connectors.github;
				setPlatformDetailConnector(platformConnector ? {
					...platformConnector,
					status: "connected"
				} : {
					type: "github",
					displayName: connector.name,
					description: connector.description ?? "",
					status: "connected",
					enabled: true,
					hasConnected: true,
					selectedRepositories: [],
					prompt: "",
					url: "",
					oauthClientId: "",
					oauthRedirectUrl: "",
					oauthAppName: ""
				});
				return;
			}
			setDetailConnector(connector);
			setDetailExpanded(false);
			setDetailShowTopFade(false);
			setDetailShowBottomFade(false);
			reportEvent(Events.ConnectorDetailShow, {
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				daysSinceConnected: 0
			});
		}, [reportEvent, Events]);
		const [showPlatformDisconnectConfirm, setShowPlatformDisconnectConfirm] = (0, import_react$1.useState)(false);
		const [platformConnectorToDisconnect, setPlatformConnectorToDisconnect] = (0, import_react$1.useState)(null);
		const [platformDetailConnector, setPlatformDetailConnector] = (0, import_react$1.useState)(null);
		const platformConnectors = useConnectorStore((state) => state.connectors);
		const appearConnectorTypes = (0, import_react$1.useMemo)(() => getAppearConnectorTypes(accountInfo?.enterpriseId), [accountInfo?.enterpriseId]);
		const connectorsText = (0, import_react$1.useMemo)(() => getConnectorsText(), []);
		const adapterRef = (0, import_react$1.useRef)(adapter);
		adapterRef.current = adapter;
		(0, import_react$1.useEffect)(() => {
			adapter?.getProductConfig?.().then((cfg) => {
				setNetworkEnv(cfg?.networkEnvironment);
			});
		}, [adapter]);
		const loadConnectors = (0, import_react$1.useCallback)(async (silent = false) => {
			if (!silent) {
				setLoading(true);
				setLoadFailed(false);
			}
			let timeoutId;
			try {
				if (!await Promise.race([connectorStore.getState().loadMcpConnectors(), new Promise((_, reject) => {
					timeoutId = setTimeout(() => reject(/* @__PURE__ */ new Error(`[ConnectorPanel] load timeout after ${CONNECTOR_LOAD_TIMEOUT_MS}ms`)), CONNECTOR_LOAD_TIMEOUT_MS);
				})])) throw new Error("Failed to load connectors");
				return true;
			} catch (err) {
				console.error("[ConnectorPanel] loadConnectors:error", { error: err instanceof Error ? err.message : String(err) });
				if (!silent) {
					setLoadFailed(true);
					toast.error(t("connectorPanel.loadError"));
				}
				return false;
			} finally {
				if (timeoutId !== void 0) clearTimeout(timeoutId);
				if (!silent) setLoading(false);
			}
		}, [t]);
		(0, import_react$1.useEffect)(() => {
			if (visible && active) {
				const hasData = connectors.length > 0 || Object.keys(connectorStates).length > 0;
				loadConnectors(hasData);
				refreshOneidApplicationsIfStale().catch(() => void 0);
			}
		}, [
			visible,
			active,
			adapter,
			loadConnectors,
			refreshOneidApplicationsIfStale
		]);
		(0, import_react$1.useEffect)(() => {
			if (!oneidRefreshEnabled || !visible) return;
			const handleFocus = () => {
				if (document.visibilityState !== "visible") return;
				refreshOneidApplicationsIfStale(lastOneidWindowRefreshAtRef).then((didRefresh) => {
					if (!didRefresh) return;
					return loadConnectors(true);
				}).catch(() => void 0);
			};
			window.addEventListener("focus", handleFocus);
			document.addEventListener("visibilitychange", handleFocus);
			return () => {
				window.removeEventListener("focus", handleFocus);
				document.removeEventListener("visibilitychange", handleFocus);
			};
		}, [
			oneidRefreshEnabled,
			visible,
			refreshOneidApplicationsIfStale,
			loadConnectors
		]);
		(0, import_react$1.useEffect)(() => {
			if (detailBodyRef.current) detailBodyRef.current.scrollTop = 0;
			requestAnimationFrame(updateDetailFades);
		}, [detailConnector, updateDetailFades]);
		(0, import_react$1.useEffect)(() => {
			requestAnimationFrame(updateDetailFades);
		}, [detailExpanded, updateDetailFades]);
		const hasReportedShowRef = (0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {
			if (!visible || !active) {
				hasReportedShowRef.current = false;
				return;
			}
			if (hasReportedShowRef.current) return;
			if (connectors.length === 0) return;
			hasReportedShowRef.current = true;
			const visibleConnectors = connectors.filter((c) => c.id !== "ima-mcp" && vpcConnectorPolicy.isConnectorAllowed(c.id) && isConnectorVisible(c.visibleIn, networkEnv, accountInfo?.enterpriseId, accountInfo?.type));
			const connectedCount = visibleConnectors.filter((c) => isConnectorConnected(connectorStates[c.id])).length;
			reportEvent(Events.ConnectorManagementShow, {
				referURL: "plugins_panel",
				connectedCount,
				availableCount: visibleConnectors.length,
				customCount: 0
			});
		}, [
			visible,
			active,
			connectors,
			connectorStates,
			networkEnv,
			accountInfo?.enterpriseId,
			accountInfo?.type,
			reportEvent,
			Events,
			vpcConnectorPolicy
		]);
		(0, import_react$1.useEffect)(() => {
			if (!visible || !active || connectors.length === 0) return;
			const visibleConnectors = connectors.filter((c) => c.id !== "ima-mcp" && vpcConnectorPolicy.isConnectorAllowed(c.id) && isConnectorVisible(c.visibleIn, networkEnv, accountInfo?.enterpriseId, accountInfo?.type));
			if (visibleConnectors.length === 0 || !claimConnectorEntryShow("management_page")) return;
			const totalCount = visibleConnectors.length;
			visibleConnectors.forEach((connector, index) => {
				const isConnected = isConnectorConnected(connectorStates[connector.id]);
				reportEvent(Events.ConnectorEntryShow, {
					entry: "management_page",
					connectorId: connector.id,
					connectorName: connector.name,
					connectorType: inferConnectorKind(connector),
					isConnected,
					position: index + 1,
					totalCount,
					isOfficial: true
				});
			});
		}, [
			visible,
			active,
			connectors,
			connectorStates,
			networkEnv,
			accountInfo?.enterpriseId,
			accountInfo?.type,
			reportEvent,
			Events,
			vpcConnectorPolicy
		]);
		const prevConnectingIdsRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Set());
		(0, import_react$1.useEffect)(() => {
			const currentConnectingIds = /* @__PURE__ */ new Set();
			for (const [id, state] of Object.entries(connectorStates)) if (isConnectorPending(state)) currentConnectingIds.add(id);
			for (const id of prevConnectingIdsRef.current) if (!currentConnectingIds.has(id)) {
				const currentState = connectorStates[id];
				if (isConnectorConnected(currentState) && peekUserInitiatedConnect(id)) {
					const config = connectors.find((c) => c.id === id);
					if (config) {
						toast.success(t("connectorPanel.connectSuccess", { name: config.name }));
						clearUserInitiatedConnect(id);
					}
					continue;
				}
				if (!shouldEmitFailureToast(currentState, {
					suppressed: consumeMcpAuthTimeoutToastSuppression(id),
					isUserInitiated: peekUserInitiatedConnect(id)
				}).emit) continue;
				const config = connectors.find((c) => c.id === id);
				if (config) {
					showFirstMcpAuthFailureToast(config.name, getConnectorReasonMessage(currentState));
					clearUserInitiatedConnect(id);
				}
			}
			prevConnectingIdsRef.current = currentConnectingIds;
		}, [
			connectorStates,
			connectors,
			t
		]);
		const filteredConnectors = (0, import_react$1.useMemo)(() => {
			const visibleConnectors = connectors.filter((c) => {
				if (isEnterpriseConnectorId(c.id)) return false;
				if (isImaConnector(c.id) && !imaConnectorEnabled) return false;
				if (!vpcConnectorPolicy.isConnectorAllowed(c.id)) return false;
				return isConnectorVisible(c.visibleIn, networkEnv, accountInfo?.enterpriseId, accountInfo?.type);
			});
			const keyword = searchText.trim().toLowerCase();
			if (!keyword) return visibleConnectors;
			return visibleConnectors.filter((c) => {
				const name = c.name.toLowerCase();
				const desc = c.description?.toLowerCase() ?? "";
				return textMatchesKeyword(name, keyword) || textMatchesKeyword(desc, keyword);
			});
		}, [
			connectors,
			searchText,
			networkEnv,
			accountInfo?.enterpriseId,
			accountInfo?.type,
			imaConnectorEnabled,
			vpcConnectorPolicy
		]);
		const filteredConnectorsRef = (0, import_react$1.useRef)(filteredConnectors);
		filteredConnectorsRef.current = filteredConnectors;
		const connectorStatesRef = (0, import_react$1.useRef)(connectorStates);
		connectorStatesRef.current = connectorStates;
		const visibleConnectorCount = (0, import_react$1.useMemo)(() => connectors.filter((c) => {
			if (isImaConnector(c.id) && !imaConnectorEnabled) return false;
			if (!vpcConnectorPolicy.isConnectorAllowed(c.id)) return false;
			return isConnectorVisible(c.visibleIn, networkEnv, accountInfo?.enterpriseId, accountInfo?.type);
		}).length, [
			connectors,
			networkEnv,
			accountInfo?.enterpriseId,
			accountInfo?.type,
			imaConnectorEnabled,
			vpcConnectorPolicy
		]);
		const getStatus = (0, import_react$1.useCallback)((connectorId) => deriveConnectorCardStatus(connectorStates[connectorId]), [connectorStates]);
		const installedConnectors = (0, import_react$1.useMemo)(() => filteredConnectors.filter((connector) => isInstalledConnector(connectorStates[connector.id])), [filteredConnectors, connectorStates]);
		const availableConnectors = (0, import_react$1.useMemo)(() => filteredConnectors.filter((connector) => !isInstalledConnector(connectorStates[connector.id])), [filteredConnectors, connectorStates]);
		useMarketPageLoad({
			tab: "connectors",
			active: !!(visible && active),
			store: getMarketPageLoadStore(),
			loading,
			loadFailed,
			itemCount: installedConnectors.length + availableConnectors.length
		});
		const enterpriseHidden = useEnterpriseConnectorsHidden();
		const { enterpriseConnectors } = useEnterpriseConnectorSync({ enabled: visible && active && !enterpriseHidden });
		const enterpriseGroupConnectors = (0, import_react$1.useMemo)(() => {
			const existingIds = new Set(filteredConnectors.map((connector) => connector.id));
			return enterpriseConnectors.filter((connector) => connector.id && !existingIds.has(connector.id));
		}, [enterpriseConnectors, filteredConnectors]);
		const filteredEnterpriseConnectors = (0, import_react$1.useMemo)(() => filterConnectorsByKeyword(enterpriseGroupConnectors, searchText), [enterpriseGroupConnectors, searchText]);
		const hasEnterpriseConnectorTab = enterpriseGroupConnectors.length > 0;
		const [activeConnectorTab, setActiveConnectorTab] = (0, import_react$1.useState)("official");
		(0, import_react$1.useEffect)(() => {
			if (!hasEnterpriseConnectorTab && activeConnectorTab === "enterprise") setActiveConnectorTab("official");
		}, [hasEnterpriseConnectorTab, activeConnectorTab]);
		const filteredPlatformConnectors = (0, import_react$1.useMemo)(() => {
			const keyword = searchText.trim().toLowerCase();
			const platformList = appearConnectorTypes.map((type) => platformConnectors[type]).filter(Boolean);
			if (!keyword) return platformList;
			return platformList.filter((c) => {
				const text = connectorsText[c.type];
				const type = c.type.toLowerCase();
				const title = text?.title?.toLowerCase() ?? "";
				const desc = text?.desc?.toLowerCase() ?? "";
				return textMatchesKeyword(type, keyword) || textMatchesKeyword(title, keyword) || textMatchesKeyword(desc, keyword);
			});
		}, [
			platformConnectors,
			appearConnectorTypes,
			searchText,
			connectorsText
		]);
		/**
		* Issue #33295: 上报连接器入口点击事件（connector_entry_click）。
		* 在 handleConnectConnector 入口处统一调用，所有分支（含跳走的腾讯文档/乐享）都上报。
		*/
		const reportConnectorClick = (0, import_react$1.useCallback)((connector) => {
			const list = filteredConnectorsRef.current;
			const states = connectorStatesRef.current;
			const position = list.findIndex((c) => c.id === connector.id) + 1;
			const isReconnect = states[connector.id]?.bound === true;
			reportEvent(Events.ConnectorEntryClick, {
				entry: "management_page",
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				isOfficial: true,
				isReconnect,
				position,
				clickAt: Date.now()
			});
		}, [reportEvent, Events]);
		/**
		* Issue #33295: 上报连接结果事件（connector_auth_result）。
		* 在 handleConnectConnector / handleConnectWithConfig 各分支结束时调用。
		*
		* 注：IMA 跳走到资料库页面后的真实连接发生在另一个页面，
		* 不在 ConnectorPanel 上报，避免重复或归因错误。
		*/
		const reportConnectorResult = (0, import_react$1.useCallback)((connector, params) => {
			const errorMessage = params.errorMessage;
			let errorCode;
			if (!params.success) {
				if (errorMessage) {
					const normalized = errorMessage.split(":")[0]?.trim().slice(0, 64);
					errorCode = normalized && normalized.length > 0 ? normalized : "connect_failed";
				} else errorCode = "connect_failed";
			}
			reportEvent(Events.ConnectorAuthResult, {
				entry: "management_page",
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				isOfficial: true,
				isSuccessful: params.success,
				status: params.success ? "success" : "failed",
				errorCode,
				errorMessage,
				cost: Date.now() - params.startTime,
				isReconnect: params.isReconnect,
				resultAt: Date.now()
			});
		}, [reportEvent, Events]);
		/**
		* Issue #33295: 上报连接器解绑事件（connector_unbind）。
		* 在详情弹窗"重置/解绑"按钮的成功/失败/异常分支调用。
		*
		* 字段说明：
		* - days_since_connected: 新契约不再携带 lastConnectedAt 时间戳，统一上报 0
		* - invoke_count_since_connected: issue 标记为可选，端侧无统计，暂不传
		*/
		const reportConnectorUnbind = (0, import_react$1.useCallback)((connector, params) => {
			const daysSinceConnected = 0;
			const errorMessage = params.errorMessage;
			let errorCode;
			if (!params.success) {
				if (errorMessage) {
					const normalized = errorMessage.split(":")[0]?.trim().slice(0, 64);
					errorCode = normalized && normalized.length > 0 ? normalized : "unbind_failed";
				} else errorCode = "unbind_failed";
			}
			reportEvent(Events.ConnectorUnbind, {
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				isSuccessful: params.success,
				daysSinceConnected,
				errorCode,
				unbindAt: Date.now()
			});
		}, [reportEvent, Events]);
		const handleConnectConnector = (0, import_react$1.useCallback)(async (connector) => {
			reportConnectorClick(connector);
			const startTime = Date.now();
			const isReconnect = connectorStatesRef.current[connector.id]?.bound === true;
			const navNeedsAuth = connectorStore.getState().mcpConnectorStates[connector.id]?.bound !== true;
			if (requestConnectorNavigation({
				connectorId: connector.id,
				needsAuth: navNeedsAuth,
				onBeforeNavigate: () => {
					setDetailConnector(null);
					markLibraryAuthEntry(connector.id, "management_page");
				}
			}) !== "unhandled") return;
			try {
				markLibraryAuthEntry(connector.id, "management_page");
				markTokenSchemaAuthEntry(connector.id, "management_page");
				const result = await connectorStore.getState().connectConnector(connector.id);
				if (result.viaForm) {
					if (result.success) {
						clearUserInitiatedConnect(connector.id);
						toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
						reportConnectorResult(connector, {
							startTime,
							isReconnect,
							success: true
						});
					} else if (result.cancelled) reportConnectorResult(connector, {
						startTime,
						isReconnect,
						success: false,
						errorMessage: "user_cancelled"
					});
					else {
						toast.error(t("connectorPanel.namedConnectError", {
							name: connector.name,
							error: result.error || "Token invalid"
						}));
						reportConnectorResult(connector, {
							startTime,
							isReconnect,
							success: false,
							errorMessage: result.error
						});
					}
					return;
				}
				if (!result.success && !result.error) {
					if (result.needsAuth && navNeedsAuth && connector.authMode !== "token") toast({
						message: t("connectorPanel.redirectAuth"),
						type: "plain"
					});
					return;
				}
				if (result.success) {
					clearUserInitiatedConnect(connector.id);
					toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
				} else if (result.error && !result.cancelled) toast.error(t("connectorPanel.namedConnectError", {
					name: connector.name,
					error: result.error
				}));
				reportConnectorResult(connector, {
					startTime,
					isReconnect,
					success: result.success,
					errorMessage: result.error
				});
			} catch (err) {
				connectorStore.getState().loadMcpConnectors();
				toast.error(t("connectorPanel.namedConnectError", {
					name: connector.name,
					error: err?.message || "Unknown error"
				}));
				reportConnectorResult(connector, {
					startTime,
					isReconnect,
					success: false,
					errorMessage: err?.message
				});
			}
		}, [
			t,
			reportConnectorClick,
			reportConnectorResult
		]);
		const handleRepairConnector = (0, import_react$1.useCallback)(async (connector) => {
			reportConnectorClick(connector);
			const startTime = Date.now();
			markLibraryAuthEntry(connector.id, "management_page");
			markTokenSchemaAuthEntry(connector.id, "management_page");
			try {
				const result = await connectorStore.getState().repairConnector(connector.id);
				if (result.success) toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
				else if (result.needsAuth && connector.authMode !== "token") toast({
					message: t("connectorPanel.redirectAuth"),
					type: "plain"
				});
				else if (result.error && !result.cancelled) toast.error(t("connectorPanel.namedConnectError", {
					name: connector.name,
					error: result.error
				}));
				reportConnectorResult(connector, {
					startTime,
					isReconnect: true,
					success: result.success,
					errorMessage: result.error
				});
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				toast.error(t("connectorPanel.namedConnectError", {
					name: connector.name,
					error: message
				}));
				reportConnectorResult(connector, {
					startTime,
					isReconnect: true,
					success: false,
					errorMessage: message
				});
			}
		}, [
			reportConnectorClick,
			reportConnectorResult,
			t
		]);
		const openCustomConnectorModal = (0, import_react$1.useCallback)(() => {
			setShowMcpModal(true);
			(async () => {
				let customCount = 0;
				let enabledCount = 0;
				try {
					const customServers = (await getMcpServersDeduped(wb.mcp, { caller: "connector-panel:counter" }) ?? []).filter((s) => s.name !== "ardot");
					customCount = customServers.length;
					enabledCount = customServers.filter((s) => s.disabled !== true).length;
				} catch (err) {
					console.warn("[ConnectorPanel] custom_mcp_entry_click: getMcpServers failed:", err);
				}
				reportEvent(Events.CustomMcpEntryClick, {
					customCount,
					enabledCount,
					clickAt: Date.now()
				});
			})();
		}, [reportEvent, Events]);
		const handleOpenCustomConnector = (0, import_react$1.useCallback)(() => {
			refreshCustomConnectorPolicy().then((snapshot) => {
				if (snapshot && !snapshot.allowed) {
					toast.error(t("connectorPanel.customConnectorDisabled"));
					return;
				}
				openCustomConnectorModal();
			}).catch(() => {
				openCustomConnectorModal();
			});
		}, [
			refreshCustomConnectorPolicy,
			openCustomConnectorModal,
			t
		]);
		(0, import_react$1.useEffect)(() => {
			if (onCustomConnectorRef) onCustomConnectorRef.current = handleOpenCustomConnector;
			return () => {
				if (onCustomConnectorRef) onCustomConnectorRef.current = null;
			};
		}, [onCustomConnectorRef, handleOpenCustomConnector]);
		const handleDisconnectPlatformConnector = (0, import_react$1.useCallback)(async () => {
			if (!platformConnectorToDisconnect) return;
			try {
				await connectorStore.getState().revokeAll(platformConnectorToDisconnect.type);
				toast.success(t("connectorPanel.disconnectSuccess", { name: connectorsText[platformConnectorToDisconnect.type]?.title || platformConnectorToDisconnect.type }));
				setShowPlatformDisconnectConfirm(false);
				setPlatformConnectorToDisconnect(null);
			} catch (error) {
				toast.error(t("connectorPanel.disconnectError", { error: error?.message || "Unknown error" }));
			}
		}, [
			platformConnectorToDisconnect,
			connectorsText,
			t
		]);
		/**
		* 用户主动取消进行中的 connector 连接（CLI auth 等待 / OAuth 等待回调）。
		* Issue #42056：避免干等 5 分钟超时。
		* Issue #70002：用户主动取消是明确的授权失败信号，补上报 auth_result(failed, user_cancelled)。
		* panel 不维护 pending Map，startTime 取此刻，cost 归零。
		*
		* 取消意图直接写入共享 Store，面板和输入框同步撤下 pending。
		*/
		const handleCancelConnect = (0, import_react$1.useCallback)(async (connector) => {
			const startTime = Date.now();
			const isReconnect = connectorStore.getState().mcpConnectorStates[connector.id]?.bound === true;
			try {
				const result = await connectorStore.getState().cancelMcpConnector(connector.id);
				if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: connector.name }));
				else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
			} catch (error) {
				console.warn("[ConnectorPanel] cancelMcpConnector failed:", error);
			}
			reportConnectorResult(connector, {
				startTime,
				isReconnect,
				success: false,
				errorMessage: "user_cancelled"
			});
		}, [t, reportConnectorResult]);
		/**
		* 复用详情页既有的「去试试」操作；卡片气泡按钮仅调用此回调，不新增连接器业务分支。
		*/
		const handleTryConnector = (0, import_react$1.useCallback)(async (connector, _isConnected, selectedPrompt) => {
			const examples = getTryExamples(connector);
			if (!examples || examples.length === 0) return;
			const prompt = selectedPrompt ?? examples[Math.floor(Math.random() * examples.length)];
			setTryLoading(true);
			const trySuccess = await connectorStore.getState().autoEnableMcpConnectorToggle(connector.id, "", { silent: true });
			setTryLoading(false);
			if (!trySuccess) {
				setDetailConnector(null);
				const latest = connectorStore.getState().mcpConnectorStates[connector.id];
				if (latest?.pending === true) return;
				if (connectorNeedsInteractiveRepair(latest)) {
					await handleRepairConnector(connector);
					return;
				}
				await handleConnectConnector(connector);
				return;
			}
			setDetailConnector(null);
			try {
				const officeReturn = readOfficeReturnIntent(location.state);
				if (officeReturn && moduleHost?.officeInputReturn) {
					await moduleHost.officeInputReturn.send({
						returnWindowId: officeReturn.returnWindowId,
						conversationId: officeReturn.returnConversationId,
						contentBlocks: [{
							type: "text",
							text: prompt
						}],
						connectorIds: [connector.id]
					});
					return;
				}
				await wb.conversations.prepareInput({
					target: { type: "new" },
					contentBlocks: [{
						type: "text",
						text: prompt
					}],
					connectorIds: [connector.id]
				});
			} catch (error) {
				console.warn("[ConnectorPanel] prepare connector input failed:", error);
				toast.error(t("connectorPanel.connectError", { error: error instanceof Error ? error.message : String(error) }));
			}
		}, [
			handleConnectConnector,
			handleRepairConnector,
			location.state,
			moduleHost?.officeInputReturn,
			t,
			wb
		]);
		const renderIcon = (0, import_react$1.useCallback)((connector) => {
			if (connector.icon) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: connector.icon,
				alt: "",
				style: {
					width: "100%",
					height: "100%",
					objectFit: "cover",
					borderRadius: "50%"
				},
				draggable: false
			});
			return connector.name.charAt(0).toUpperCase();
		}, []);
		const renderInstalledCard = (connector, isFirst = false) => {
			const status = getStatus(connector.id);
			const state = connectorStates[connector.id];
			const isConnecting = status === "connecting";
			const dotStatus = status === "error" || status === "connecting" || status === "unauthorized" ? status : "connected";
			const isCancellable = isConnecting && cancellableIds.has(connector.id);
			const hasConnectedIndicator = true;
			const isIncompatible = isConnectorVersionIncompatible(connector);
			const incompatLabel = getConnectorVersionIncompatibilityLabel(connector);
			const errorKind = getConnectorErrorDisplayKind(state?.reason);
			const retryLabel = errorKind === "authorize" ? t("connectorPanel.reauthorize") : errorKind === "configure" ? t("connectorPanel.configure") : t("connectorPanel.reconnect");
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `connector-card connector-card--installed${isIncompatible ? " connector-card--incompatible" : ""}`,
				onClick: () => {
					if (!isConnecting) openDetailModal(connector);
				},
				"data-market-perf": isFirst ? "first-item" : void 0,
				"data-track-id": "connector_card_click",
				"data-track-name": "点击连接器",
				"data-track-props": JSON.stringify({ source: connector.id }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-card-icon",
						style: connector.icon ? void 0 : { background: getIconColor(connector.name) },
						children: renderIcon(connector)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "connector-card-main",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "connector-card-name-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "connector-card-name",
								children: connector.name
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: `connector-card-status-dot connector-card-status-dot--${dotStatus}` })]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "connector-card-desc",
							children: isIncompatible ? incompatLabel : connector.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-card-action",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorCardAction, {
							kind: "installed",
							status,
							isCancellable,
							connectLabel: t("connectorPanel.connect"),
							cancelLabel: t("connectorPanel.cancelConnect"),
							hasConnectedIndicator,
							hasTryExample: getTryExamples(connector).length > 0,
							isTryLoading: tryLoading,
							tryItOutLabel: t("connectorPanel.goToChat"),
							retryLabel,
							onCancel: () => handleCancelConnect(connector),
							onRetry: () => handleRepairConnector(connector),
							onTry: () => handleTryConnector(connector, status === "connected")
						})
					})
				]
			}, connector.id);
		};
		const renderAvailableCard = (connector, isFirst = false) => {
			if (isConnectorVersionIncompatible(connector)) return null;
			const status = getStatus(connector.id);
			const isConnecting = status === "connecting";
			const isError = status === "error";
			const isCancellable = isConnecting && cancellableIds.has(connector.id);
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `connector-card connector-card--available ${isError ? "connector-card--error" : ""}`,
				onClick: () => {
					if (!isConnecting) openDetailModal(connector);
				},
				"data-market-perf": isFirst ? "first-item" : void 0,
				"data-track-id": "connector_card_click",
				"data-track-name": "点击连接器",
				"data-track-props": JSON.stringify({ source: connector.id }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-card-icon",
						style: connector.icon ? void 0 : { background: getIconColor(connector.name) },
						children: renderIcon(connector)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "connector-card-main",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "connector-card-name-row",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "connector-card-name",
								children: connector.name
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "connector-card-desc",
							children: connector.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-card-action",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorCardAction, {
							kind: "available",
							status,
							isCancellable,
							connectLabel: t("connectorPanel.connect"),
							cancelLabel: t("connectorPanel.cancelConnect"),
							refreshIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RefreshIcon, {}),
							reconnectLabel: t("connectorPanel.reconnect"),
							connectTrackingProps: JSON.stringify({
								source: connector.id,
								type: "connect"
							}),
							onConnect: () => handleConnectConnector(connector),
							onCancel: () => handleCancelConnect(connector)
						})
					})
				]
			}, connector.id);
		};
		if (!visible) return null;
		if (platformDetailConnector) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "connector-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "connector-panel-detail-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailSetting, {
					connector: platformDetailConnector,
					onBack: () => {
						setPlatformDetailConnector(null);
						loadConnectors(true);
					},
					onClose: () => {
						setPlatformDetailConnector(null);
					}
				})
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "connector-panel",
			children: [
				headerLeft && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
					className: `${topBarRootClassName} ec-topbar`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ec-topbar__left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarNewTaskButton, {}),
							headerLeft
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ec-topbar__right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorSearchBar, {
							value: searchText,
							onChange: setSearchText
						}), canAddConnector && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
							content: isTopbarNarrow ? t("connectorPanel.customConnector") : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "secondary",
								iconOnly: isTopbarNarrow,
								"aria-label": t("connectorPanel.customConnector"),
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddCircleIcon, {}),
								onClick: handleOpenCustomConnector,
								children: !isTopbarNarrow && t("connectorPanel.customConnector")
							})
						})]
					})]
				}),
				!isModal && !hideHeader && !headerLeft && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "connector-panel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "connector-panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
							className: "connector-panel-title",
							children: t("connectorPanel.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "connector-panel-subtitle",
							children: t("connectorPanel.subtitle")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-panel-toolbar",
						children: canAddConnector && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							size: "small",
							variant: "grey",
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddCircleIcon, {}),
							onClick: handleOpenCustomConnector,
							children: t("connectorPanel.customConnector")
						})
					})]
				}),
				isModal && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "connector-panel-modal-toolbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-panel-search",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorSearchBar, {
							value: searchText,
							onChange: setSearchText
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "connector-panel-content",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-grid",
						children: Array.from({ length: SKELETON_COUNT }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorCardSkeleton, {}, index))
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [hasEnterpriseConnectorTab && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "connector-tab-bar",
						role: "tablist",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": activeConnectorTab === "official",
							className: `connector-tab-item${activeConnectorTab === "official" ? " connector-tab-item--active" : ""}`,
							onClick: () => setActiveConnectorTab("official"),
							children: t("connectorPanel.tab.official")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": activeConnectorTab === "enterprise",
							className: `connector-tab-item${activeConnectorTab === "enterprise" ? " connector-tab-item--active" : ""}`,
							onClick: () => setActiveConnectorTab("enterprise"),
							children: t("connectorPanel.tab.enterprise")
						})]
					}), hasEnterpriseConnectorTab && activeConnectorTab === "enterprise" ? filteredEnterpriseConnectors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-panel-empty",
						"data-market-perf": "empty",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "connector-panel-empty-desc",
							children: t("connectorPanel.empty.noResult")
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-grid",
						children: filteredEnterpriseConnectors.map((connector) => isInstalledConnector(connectorStates[connector.id]) ? renderInstalledCard(connector) : renderAvailableCard(connector))
					}) : filteredConnectors.length === 0 && visibleConnectorCount === 0 && (isLocalMode || filteredPlatformConnectors.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "connector-panel-empty",
						"data-market-perf": "empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorEmptyIcon, {
								width: 48,
								height: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
								className: "connector-panel-empty-title",
								children: t("connectorPanel.empty.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
								className: "connector-panel-empty-desc",
								children: t("connectorPanel.empty.description")
							})
						]
					}) : filteredConnectors.length === 0 && (isLocalMode || filteredPlatformConnectors.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-panel-empty",
						"data-market-perf": "empty",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "connector-panel-empty-desc",
							children: t("connectorPanel.empty.noResult")
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-grid",
						children: isLocalMode ? filteredConnectors.map((connector, index) => isInstalledConnector(connectorStates[connector.id]) ? renderInstalledCard(connector, index === 0) : renderAvailableCard(connector, index === 0)) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [installedConnectors.map((connector, index) => renderInstalledCard(connector, index === 0)), availableConnectors.map((connector, index) => renderAvailableCard(connector, installedConnectors.length === 0 && index === 0))] })
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
					visible: showPlatformDisconnectConfirm,
					title: t("connectorPanel.disconnect"),
					content: t("connectorPanel.disconnectConfirm", { name: platformConnectorToDisconnect ? connectorsText[platformConnectorToDisconnect.type]?.title || platformConnectorToDisconnect.type : "" }),
					confirmText: t("connectorPanel.disconnect"),
					cancelText: t("common.cancel"),
					confirmVariant: "danger",
					onConfirm: handleDisconnectPlatformConnector,
					onClose: () => {
						setShowPlatformDisconnectConfirm(false);
						setPlatformConnectorToDisconnect(null);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(McpModal, {
					visible: showMcpModal,
					onClose: () => {
						setShowMcpModal(false);
						loadConnectors(true);
					}
				}),
				detailConnector && (() => {
					const status = getStatus(detailConnector.id);
					const state = connectorStates[detailConnector.id];
					const isConnected = status === "connected";
					const needsRepair = connectorNeedsInteractiveRepair(state);
					const hasEverConnected = isInstalledConnector(state);
					const repairKind = needsRepair ? getConnectorErrorDisplayKind(state?.reason) : void 0;
					const repairLabel = repairKind === "authorize" ? t("connectorPanel.reauthorize") : repairKind === "configure" ? t("connectorPanel.configure") : t("connectorPanel.reconnect");
					const isUnbinding = unbindingConnectorId === detailConnector.id;
					const tools = state?.tools ?? [];
					const tryExamples = getTryExamples(detailConnector).slice(0, 10);
					return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "connector-detail-overlay connector-detail-modal-overlay",
						onClick: (e) => {
							if (e.target === e.currentTarget) setDetailConnector(null);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "connector-detail-modal connector-detail-modal--connected",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									className: "connector-detail-close",
									onClick: () => setDetailConnector(null),
									type: "button",
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CloseIcon, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: `connector-detail-modal-fade${detailShowTopFade ? " is-visible" : ""}`,
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: `connector-detail-modal-bottom-fade${detailShowBottomFade ? " is-visible" : ""}`,
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "connector-detail-modal-body",
									ref: detailBodyRef,
									onScroll: handleDetailBodyScroll,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
											className: "connector-detail-flow",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
													className: "connector-detail-flow-avatar connector-detail-flow-avatar--workbuddy",
													children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
														src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_100_1124)'%3e%3crect%20width='24'%20height='24'%20rx='5.14286'%20fill='url(%23paint0_linear_100_1124)'/%3e%3cg%20filter='url(%23filter0_f_100_1124)'%3e%3ccircle%20cx='18.3915'%20cy='24.4723'%20r='7.30463'%20fill='%23FFE355'%20fill-opacity='0.49'/%3e%3c/g%3e%3cpath%20d='M16.8325%201.49185C17.0548%201.29241%2017.0679%201.2839%2017.2311%201.27411C17.4955%201.25478%2017.7382%201.38174%2018.1504%201.75707C19.1137%202.63236%2020.4543%204.4325%2021.2883%205.96929L21.6111%206.5655L22.0665%206.79192C22.5058%207.01393%2023.2257%207.46951%2023.5267%207.71363C23.6628%207.82617%2023.6824%207.82826%2023.8239%207.77323C24.4626%207.52448%2025.3778%207.85405%2026.1849%208.62819C26.9115%209.32456%2027.608%2010.5149%2027.8746%2011.508C27.9135%2011.6679%2027.9648%2012.0114%2027.9836%2012.2671C28.0444%2013.1656%2027.7559%2013.8837%2027.201%2014.2085C27.088%2014.2738%2027.0807%2014.2915%2027.0838%2014.5739C27.1094%2015.9195%2026.746%2017.2627%2026.0174%2018.5725C25.1949%2020.0431%2023.7309%2021.5646%2021.749%2022.9978C20.6847%2023.7724%2018.1656%2025.2395%2017.027%2025.7546C14.2996%2026.9824%2012.1128%2027.4537%2010.2136%2027.221C9.08082%2027.0837%207.7985%2026.6415%207.03988%2026.1283C6.84042%2025.9904%206.80877%2025.9813%206.65653%2026.0248C5.8443%2026.2581%204.78008%2025.779%203.87639%2024.7759C3.51596%2024.3748%202.93382%2023.3904%202.74525%2022.8636C2.30913%2021.6307%202.39666%2020.5184%202.97762%2019.8539C3.12772%2019.6828%203.13247%2019.6752%203.0997%2019.3877C3.04555%2018.9166%203.02112%2018.219%203.04586%2017.769L3.06482%2017.3487L2.43386%2016.2324C1.45682%2014.4939%200.836658%2013.0338%200.597232%2011.9185C0.470862%2011.307%200.478498%2011.036%200.633714%2010.8352C0.728206%2010.7139%201.03828%2010.588%201.41189%2010.519C2.35259%2010.354%204.40363%2010.504%206.68539%2010.9068L6.92189%2010.9473L7.44287%2010.4864C8.30763%209.72042%208.88266%209.29135%209.94174%208.63098C11.0456%207.94031%2012.2916%207.37199%2013.6946%206.9221L14.1444%206.77741L14.392%206.12815C15.278%203.78949%2016.1856%202.0654%2016.8325%201.49185ZM9.41133%2013.476C8.41006%2014.054%207.90943%2014.3432%207.54156%2014.6671C6.05186%2015.9789%205.49506%2018.0569%206.12928%2019.9378C6.28591%2020.4021%206.57475%2020.9027%207.15249%2021.9034C7.73039%2022.9043%208.01983%2023.4053%208.34364%2023.7732C9.65542%2025.2628%2011.7334%2025.8196%2013.6143%2025.1854C14.0788%2025.0288%2014.5795%2024.7398%2015.5808%2024.1617L21.3402%2020.8365C22.3412%2020.2586%2022.8421%2019.9692%2023.2099%2019.6454C24.6996%2018.3336%2025.2564%2016.2556%2024.6222%2014.3747C24.4656%2013.9103%2024.1764%2013.4093%2023.5985%2012.4083C23.0207%2011.4075%2022.7316%2010.9071%2022.4079%2010.5393C21.0961%209.04964%2019.0181%208.49284%2017.1372%209.12707C16.6728%209.28371%2016.1717%209.57283%2015.1707%2010.1508L9.41133%2013.476Z'%20fill='url(%23paint1_linear_100_1124)'/%3e%3crect%20x='9.9668'%20y='17.5005'%20width='2.27533'%20height='4.72569'%20rx='1.13767'%20transform='rotate(-30%209.9668%2017.5005)'%20fill='white'/%3e%3crect%20x='16.1055'%20y='13.9562'%20width='2.27533'%20height='4.72569'%20rx='1.13767'%20transform='rotate(-30%2016.1055%2013.9562)'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_100_1124'%20x='4.84364'%20y='10.9244'%20width='27.0959'%20height='27.0958'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='3.12164'%20result='effect1_foregroundBlur_100_1124'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_100_1124'%20x1='12'%20y1='0'%20x2='12'%20y2='24'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%230EC8A9'/%3e%3cstop%20offset='1'%20stop-color='%2301C886'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_100_1124'%20x1='8.92652'%20y1='6.00417'%20x2='19.5466'%20y2='24.3986'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='white'%20stop-opacity='0.8'/%3e%3cstop%20offset='0.437689'%20stop-color='white'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_100_1124'%3e%3crect%20width='24'%20height='24'%20rx='5.14286'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
														alt: "WorkBuddy",
														draggable: false
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailFlowIcon, {}),
												/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
													className: "connector-detail-flow-avatar connector-detail-flow-avatar--connector",
													style: detailConnector.icon ? void 0 : { background: getIconColor(detailConnector.name) },
													children: renderIcon(detailConnector)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("h3", {
											className: "connector-detail-name",
											children: [
												t("connectorPanel.connect"),
												" ",
												detailConnector.name
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
											className: "connector-detail-desc",
											children: detailConnector.description
										}),
										isConnectorVersionIncompatible(detailConnector) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
											className: "connector-detail-version-banner",
											children: getConnectorVersionIncompatibilityLabel(detailConnector)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
											className: "connector-detail-actions",
											children: [
												hasEverConnected && !needsRepair && tryExamples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
													className: `connector-detail-btn connector-detail-btn--try${tryLoading ? " connector-detail-btn--try-loading" : ""}`,
													type: "button",
													disabled: tryLoading,
													onClick: () => handleTryConnector(detailConnector, isConnected),
													children: [tryLoading ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailLoadingIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailTryIcon, {}), tryLoading ? t("connectorPanel.connectingShort") : t("connectorPanel.tryItOut")]
												}),
												hasEverConnected && needsRepair && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
													className: "connector-detail-btn connector-detail-btn--try",
													type: "button",
													onClick: () => {
														setDetailConnector(null);
														handleRepairConnector(detailConnector);
													},
													"data-track-id": "connector_connect",
													"data-track-name": repairLabel,
													"data-track-props": JSON.stringify({
														source: detailConnector.id,
														type: "repair"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailConnectIcon, {}), repairLabel]
												}),
												hasEverConnected ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
													className: "connector-detail-btn connector-detail-btn--reset",
													type: "button",
													disabled: isUnbinding,
													"aria-busy": isUnbinding,
													"data-track-id": "connector_disconnect",
													"data-track-name": "断开连接",
													"data-track-props": JSON.stringify({
														source: detailConnector.id,
														type: "disconnect"
													}),
													onClick: async () => {
														if (unbindingConnectorIdsRef.current.has(detailConnector.id)) return;
														const oneidGate = detailConnector.id === "tencent-docs-oa" ? tdocOneidGate : detailConnector.id === "ima-mcp-oa" ? imaOneidGate : isLexiangConnector(detailConnector.id) ? lexiangOneidGate : null;
														if (oneidGate?.enterpriseGate) {
															const message = oneidGate.canManageApp ? t("libraryOnboarding.unbindBlocked") : t("libraryOnboarding.unbindBlockedNonAdmin");
															toast.error(message);
															reportConnectorUnbind(detailConnector, {
																success: false,
																errorMessage: message
															});
															return;
														}
														unbindingConnectorIdsRef.current.add(detailConnector.id);
														setUnbindingConnectorId(detailConnector.id);
														try {
															const state = await wb.connectors.unbind(detailConnector.id);
															applyConnectorStateChange(state);
															toast.success(isImaKnowledgeConnectorId(detailConnector.id) ? t("connectors.ima.unbindSuccess") : t("connectorPanel.resetSuccess", { name: detailConnector.name }));
															setDetailConnector(null);
															reportConnectorUnbind(detailConnector, { success: true });
														} catch (error) {
															toast.error(t("connectorPanel.resetError", { error: error?.message || "Unknown error" }));
															reportConnectorUnbind(detailConnector, {
																success: false,
																errorMessage: error?.message
															});
														} finally {
															unbindingConnectorIdsRef.current.delete(detailConnector.id);
															setUnbindingConnectorId((current) => current === detailConnector.id ? null : current);
														}
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailUnbindIcon, {}), isUnbinding ? t("connectorPanel.resetting") : t("connectorPanel.reset")]
												}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
													className: "connector-detail-btn connector-detail-btn--try",
													type: "button",
													disabled: isConnectorVersionIncompatible(detailConnector),
													onClick: () => {
														setDetailConnector(null);
														handleConnectConnector(detailConnector);
													},
													"data-track-id": "connector_connect",
													"data-track-name": "连接",
													"data-track-props": JSON.stringify({
														source: detailConnector.id,
														type: "connect"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailConnectIcon, {}), t("connectorPanel.connect")]
												})
											]
										}),
										tryExamples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
											className: "connector-detail-examples",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
												className: "connector-detail-examples-title",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailTipIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("connectorPanel.tryItLikeThis") })]
											}), tryExamples.map((example, index) => {
												const quotedExample = getLocale().startsWith("zh") ? `“${example}”` : `"${example}"`;
												return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
													className: "connector-detail-example",
													type: "button",
													disabled: tryLoading || needsRepair,
													onClick: () => handleTryConnector(detailConnector, isConnected, example),
													children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: quotedExample }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorDetailTryIcon, {})]
												}, `${detailConnector.id}-${index}`);
											})]
										}),
										hasEverConnected && tools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
											className: "connector-detail-expand",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
												className: "connector-detail-expand-btn",
												type: "button",
												onClick: () => setDetailExpanded(!detailExpanded),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronExpandIcon, { expanded: detailExpanded }),
													" ",
													t("connectorPanel.showDetails")
												]
											}), detailExpanded && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
												className: "connector-detail-tools-wrapper",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
													id: "connector-detail-tools",
													className: "connector-detail-tools",
													ref: detailToolsRef,
													children: tools.map((tool, idx) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
														className: "connector-detail-tool-item",
														children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
															className: "connector-detail-tool-name",
															children: tool.name
														}), tool.description && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
															className: "connector-detail-tool-desc",
															children: tool.description
														})]
													}, idx))
												}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorOverlayScrollbar, {
													scrollRef: detailToolsRef,
													topInset: 12,
													bottomInset: 12,
													className: "connector-detail-tools-scroll-thumb"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorOverlayScrollbar, {
									scrollRef: detailBodyRef,
									topInset: 48,
									bottomInset: 30,
									className: "connector-detail-modal-scroll-thumb"
								})
							]
						})
					}), document.body);
				})()
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/skills-panel.tsx
function SkillsPanel(props) {
	const industryTemplate = useSelectedIndustryTemplate();
	const industryDesktop = !!(industryTemplate && isWorkBuddyDesktop());
	const templateId = industryTemplate?.templateId;
	const [downgraded, setDowngraded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDowngraded(false);
	}, [templateId, industryDesktop]);
	const handleDowngrade = (0, import_react.useCallback)(() => {
		setDowngraded(true);
	}, []);
	if (!industryDesktop || downgraded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyGeneralSkillsPanel, { ...props })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyIndustrySkillsPanel, {
			...props,
			templateId,
			onDowngrade: handleDowngrade
		})
	});
}
var import_react, import_jsx_runtime, LazyIndustrySkillsPanel, LazyGeneralSkillsPanel;
var init_skills_panel = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_environment();
	init_industry();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	LazyIndustrySkillsPanel = import_react.lazy(() => __vitePreload(() => import("./skills-market-C7W4i-y2.js").then((module) => ({ default: module.SkillsMarket })), __vite__mapDeps([6,1,0,2,3,4,5,7,8,9,10,11,12]), import.meta.url));
	LazyGeneralSkillsPanel = import_react.lazy(() => __vitePreload(() => import("./skills-0DwBiolT.js").then((module) => ({ default: module.SkillsPanel })), __vite__mapDeps([13,1,0,2,3,4,5,8,10,14,15]), import.meta.url));
}));
//#endregion
export { McpModal as a, useCustomConnectorPolicy as c, init_connector_panel as i, init_skills_panel as n, init_mcp_modal as o, ConnectorPanel as r, init_use_custom_connector_policy as s, SkillsPanel as t };
