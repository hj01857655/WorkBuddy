const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ui-docs-viewer-Bo02yf1Q.js","./rolldown-runtime-V4kyJ4NV.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, $B as init_icons, AZ as inferConnectorKind, CZ as claimConnectorEntryShow, Cy as init_icons$1, D1 as useI18n, DZ as markLibraryAuthEntry, E1 as init_useI18n, EZ as init_telemetry_helpers, H$ as getConnectorReasonMessage, I$ as init_connector_navigate, IV as SettingsIcon, IZ as init_deeplink_preselect_store, J$ as isConnectorPending, K2 as init_environment, OZ as markTokenSchemaAuthEntry, R$ as requestConnectorNavigation, RZ as useDeeplinkPreselectedConnectorIds, SH as CableIcon, U$ as init_connector_display, _$ as init_library_connector_id, a$ as clearUserInitiatedConnect, bQ as init_use_ima_enabled, c$ as init_store, d$ as showFirstMcpAuthFailureToast, d0 as useModuleHost, dQ as isConnectorVersionIncompatible, fQ as isConnectorVisible, gQ as init_use_vpc_connector_policy, l$ as peekUserInitiatedConnect, lz as useSettings, nQ as useCancellableConnecting, o$ as connectorStore, p$ as useConnectorStore, s$ as consumeMcpAuthTimeoutToastSuppression, sQ as getConnectorVersionIncompatibilityLabel, sz as init_SettingsContext, tQ as init_use_cancellable_connecting, u$ as shouldEmitFailureToast, uQ as init_utils, uy as DropdownArrowIcon, v$ as isImaConnector, w3 as useNavigate, wZ as init_entry_show_rate_limit, xQ as useImaEnabled, xq as init_telemetry, y3 as init_dist, yQ as useVpcConnectorPolicy, z$ as connectorNeedsAuthorize } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Ei as toast, Ev as require_react, Kh as require_react_dom, Ov as __vitePreload, Tv as require_jsx_runtime, kv as init_preload_helper, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_context, t as ConnectorContext } from "./context-BN2Z33cf.js";
//#region ../../packages/agent-ui/src/modules/connector/connector-capsule/connector-capsule.less
var init_connector_capsule$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/connector-capsule/connector-capsule-actions.less
var init_connector_capsule_actions = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/connector-capsule/connector-capsule.tsx
var import_react, import_react_dom, import_jsx_runtime, WorkBuddyConnectorIcon, MENU_MAX_HEIGHT, ConnectorCapsule;
var init_connector_capsule$1 = __esmMin((() => {
	init_connector_capsule$2();
	init_connector_capsule_actions();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_dist();
	init_icons();
	init_icons$1();
	init_SettingsContext();
	init_use_ima_enabled();
	init_use_vpc_connector_policy();
	init_useI18n();
	init_telemetry();
	init_environment();
	init_connector_display();
	init_connector_navigate();
	init_context();
	init_deeplink_preselect_store();
	init_entry_show_rate_limit();
	init_store();
	init_telemetry_helpers();
	init_use_cancellable_connecting();
	init_utils();
	init_library_connector_id();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	WorkBuddyConnectorIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.435199 0.715962)",
			d: "M7.5656 4.2827C8.2868 4.6991 8.7999 5.2128 9.1214 5.8068C9.4424 6.4 9.5528 7.0359 9.5284 7.6644C9.5192 7.8997 9.4911 8.1358 9.4474 8.3709L8.3226 7.7215C8.325 7.6869 8.3279 7.6525 8.3293 7.6183C8.3469 7.1636 8.2661 6.7484 8.0655 6.3778C7.8653 6.0082 7.5257 5.6444 6.966 5.3213C6.4063 4.9981 5.9214 4.8859 5.5013 4.8973C5.08 4.9089 4.68 5.0465 4.2951 5.2892C3.5056 5.787 2.8232 6.6961 2.254 7.6819C1.6848 8.6678 1.2387 9.7133 1.2024 10.6459C1.1847 11.1006 1.2655 11.5158 1.4661 11.8864C1.6663 12.256 2.0059 12.6198 2.5656 12.9429C3.1254 13.2661 3.6102 13.3783 4.0304 13.3669C4.4516 13.3553 4.8516 13.2177 5.2365 12.975C5.7924 12.6245 6.2937 12.0689 6.7412 11.4273L7.784 12.0294C7.2672 12.7855 6.6365 13.511 5.876 13.9904C5.3439 14.3258 4.738 14.5482 4.0638 14.5668C3.3886 14.5853 2.6872 14.3978 1.966 13.9815C1.2448 13.5651 0.7317 13.0514 0.4102 12.4574C0.0892 11.8642 -0.0211 11.2283 0.0033 10.5998C0.0512 9.3663 0.6211 8.1118 1.2154 7.0823C1.8098 6.0528 2.6114 4.932 3.6556 4.2738C4.1877 3.9384 4.7936 3.716 5.4678 3.6974C6.143 3.6789 6.8445 3.8663 7.5656 4.2827ZM13.1637 0.5865C13.8848 1.0029 14.3979 1.5167 14.7195 2.1106C15.0405 2.7038 15.1508 3.3397 15.1264 3.9683C15.0785 5.2017 14.5086 6.4563 13.9142 7.4858C13.3199 8.5153 12.5183 9.636 11.4741 10.2943C10.942 10.6296 10.3361 10.8521 9.6618 10.8706C8.9867 10.8892 8.2852 10.7017 7.5641 10.2853C6.8429 9.869 6.3298 9.3552 6.0083 8.7613C5.6873 8.1681 5.5769 7.5322 5.6013 6.9037C5.6105 6.6684 5.6386 6.4323 5.6823 6.1971L6.8071 6.8465C6.8046 6.8811 6.8018 6.9155 6.8004 6.9498C6.7828 7.4045 6.8636 7.8197 7.0642 8.1903C7.2643 8.5599 7.6039 8.9236 8.1637 9.2468C8.7234 9.5699 9.2083 9.6822 9.6284 9.6707C10.0497 9.6591 10.4496 9.5215 10.8346 9.2789C11.6241 8.7811 12.3065 7.872 12.8757 6.8862C13.4449 5.9003 13.8909 4.8548 13.9273 3.9221C13.945 3.4674 13.8642 3.0523 13.6636 2.6816C13.4634 2.3121 13.1238 1.9483 12.5641 1.6251C12.0043 1.3019 11.5195 1.1897 11.0993 1.2012C10.6781 1.2128 10.2781 1.3504 9.8932 1.593C9.3373 1.9435 8.836 2.4991 8.3884 3.1407L7.3456 2.5387C7.8624 1.7825 8.4932 1.057 9.2537 0.5776C9.7858 0.2422 10.3917 0.0198 11.0659 0.0013C11.7411 -0.0173 12.4425 0.1702 13.1637 0.5865Z",
			fillRule: "evenodd"
		})
	});
	MENU_MAX_HEIGHT = 420;
	ConnectorCapsule = ({ taskId, useConnectorPrompt, addContentBlocks, compact = false, extraConfigs }) => {
		const { adapter, accountInfo, reporter } = useModuleHost();
		const { reportEvent, Events } = reporter;
		const { openSettings } = useSettings();
		const navigate = useNavigate();
		const { t, locale } = useI18n();
		const isLocalMode = adapter?.environmentType === "local";
		const { connectorEnabled: imaConnectorEnabled } = useImaEnabled();
		const vpcConnectorPolicy = useVpcConnectorPolicy();
		const isMenuOpen = useConnectorStore((state) => state.isMenuOpen);
		const setMenuOpen = useConnectorStore((state) => state.setMenuOpen);
		const [detailConnector, setDetailConnector] = (0, import_react.useState)(null);
		const [detailRepos, setDetailRepos] = (0, import_react.useState)(null);
		const [detailLoading, setDetailLoading] = (0, import_react.useState)(false);
		const dropdownRef = (0, import_react.useRef)(null);
		const buttonRef = (0, import_react.useRef)(null);
		const menuListRef = (0, import_react.useRef)(null);
		const [isMenuListScrolled, setIsMenuListScrolled] = (0, import_react.useState)(false);
		const [isMenuListNotAtBottom, setIsMenuListNotAtBottom] = (0, import_react.useState)(false);
		const [menuMaxHeight, setMenuMaxHeight] = (0, import_react.useState)(MENU_MAX_HEIGHT);
		const [menuAlign, setMenuAlign] = (0, import_react.useState)("left");
		const [menuMaxWidth, setMenuMaxWidth] = (0, import_react.useState)(void 0);
		const [menuPortalStyle, setMenuPortalStyle] = (0, import_react.useState)(null);
		const contextValue = (0, import_react.useMemo)(() => ({ taskId }), [taskId]);
		const prevMenuOpenRef = (0, import_react.useRef)(false);
		const [snapshotMcpConfigs, setSnapshotMcpConfigs] = (0, import_react.useState)([]);
		const menuPosition = "top";
		const calculateMenuMaxHeight = (0, import_react.useCallback)(() => {
			if (!buttonRef.current) return;
			const buttonRect = buttonRef.current.getBoundingClientRect();
			let topbarBottom = 0;
			const topbarEl = document.querySelector(".workbuddy-topbar");
			if (topbarEl) {
				const r = topbarEl.getBoundingClientRect();
				topbarBottom = Math.max(0, r.bottom);
			}
			const margin = -8;
			const SAFE_TOP_PADDING = 8;
			const MIN_MENU_HEIGHT = 120;
			const usableAbove = buttonRect.top - topbarBottom - margin;
			const nextMaxHeight = Math.max(MIN_MENU_HEIGHT, Math.min(MENU_MAX_HEIGHT, usableAbove - SAFE_TOP_PADDING));
			setMenuMaxHeight(Math.min(nextMaxHeight, usableAbove));
			const SAFE_GUTTER = 8;
			const containerEl = buttonRef.current.closest("[class*=\"mainArea\"]");
			const containerRect = containerEl ? containerEl.getBoundingClientRect() : null;
			const containerLeft = containerRect ? containerRect.left : 0;
			const containerRight = containerRect ? containerRect.right : window.innerWidth;
			const containerWidth = containerRight - containerLeft;
			const nextMaxWidth = Math.max(160, containerWidth - 16);
			setMenuMaxWidth(nextMaxWidth);
			const ASSUMED_MENU_WIDTH = Math.min(220, nextMaxWidth);
			const wouldOverflowRight = buttonRect.left + ASSUMED_MENU_WIDTH > containerRight - SAFE_GUTTER;
			setMenuAlign(wouldOverflowRight ? "right" : "left");
			setMenuPortalStyle({
				bottom: Math.max(8, window.innerHeight - buttonRect.top + margin),
				...wouldOverflowRight ? {
					right: Math.max(SAFE_GUTTER, window.innerWidth - buttonRect.right),
					left: "auto"
				} : {
					left: Math.max(SAFE_GUTTER, buttonRect.left),
					right: "auto"
				}
			});
		}, []);
		const handleToggleMenu = (0, import_react.useCallback)(() => {
			if (!isMenuOpen) calculateMenuMaxHeight();
			setMenuOpen(!isMenuOpen);
		}, [
			calculateMenuMaxHeight,
			isMenuOpen,
			setMenuOpen
		]);
		(0, import_react.useLayoutEffect)(() => {
			if (isMenuOpen) calculateMenuMaxHeight();
		}, [calculateMenuMaxHeight, isMenuOpen]);
		(0, import_react.useEffect)(() => {
			if (!isMenuOpen) {
				setMenuPortalStyle(null);
				return;
			}
			window.addEventListener("resize", calculateMenuMaxHeight);
			window.addEventListener("scroll", calculateMenuMaxHeight, true);
			let rafId = null;
			let lastRectKey = "";
			const tick = () => {
				const btn = buttonRef.current;
				if (btn) {
					const r = btn.getBoundingClientRect();
					const key = `${r.top}|${r.left}|${r.right}|${r.bottom}|${window.innerWidth}|${window.innerHeight}`;
					if (key !== lastRectKey) {
						lastRectKey = key;
						calculateMenuMaxHeight();
					}
				}
				rafId = requestAnimationFrame(tick);
			};
			rafId = requestAnimationFrame(tick);
			return () => {
				window.removeEventListener("resize", calculateMenuMaxHeight);
				window.removeEventListener("scroll", calculateMenuMaxHeight, true);
				if (rafId !== null) cancelAnimationFrame(rafId);
			};
		}, [calculateMenuMaxHeight, isMenuOpen]);
		(0, import_react.useEffect)(() => {
			if (useConnectorPrompt) connectorStore.setState({ useConnectorPrompt });
		}, [useConnectorPrompt]);
		(0, import_react.useEffect)(() => {
			connectorStore.setState({ taskId });
		}, [taskId]);
		(0, import_react.useEffect)(() => {
			if (isLocalMode) connectorStore.setState({ openSettings: (_tab, _type) => {
				navigate("/connectors");
			} });
			else connectorStore.setState({ openSettings });
		}, [
			openSettings,
			isLocalMode,
			navigate
		]);
		(0, import_react.useEffect)(() => {
			if (addContentBlocks) connectorStore.setState({ addContentBlocks });
		}, [addContentBlocks]);
		(0, import_react.useEffect)(() => {
			connectorStore.getState().setAdapter(adapter);
		}, [adapter]);
		(0, import_react.useEffect)(() => {
			const handleClickOutside = (event) => {
				if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) setMenuOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [setMenuOpen]);
		(0, import_react.useEffect)(() => {
			if (isMenuOpen) {
				calculateMenuMaxHeight();
				requestAnimationFrame(() => {
					if (menuListRef.current) {
						menuListRef.current.scrollTop = 0;
						setIsMenuListScrolled(false);
						const el = menuListRef.current;
						setIsMenuListNotAtBottom(el.scrollHeight > el.clientHeight);
					}
				});
				const listEl = menuListRef.current;
				const handleListScroll = () => {
					if (menuListRef.current) {
						const el = menuListRef.current;
						setIsMenuListScrolled(el.scrollTop > 0);
						setIsMenuListNotAtBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
					}
				};
				listEl?.addEventListener("scroll", handleListScroll);
				return () => {
					listEl?.removeEventListener("scroll", handleListScroll);
				};
			}
		}, [isMenuOpen, snapshotMcpConfigs]);
		(0, import_react.useEffect)(() => {
			connectorStore.getState().loadMcpConnectors();
		}, [adapter, locale]);
		const accountUid = accountInfo?.userId;
		const lastAccountUidRef = (0, import_react.useRef)(accountUid);
		(0, import_react.useEffect)(() => {
			if (lastAccountUidRef.current === accountUid) return;
			lastAccountUidRef.current = accountUid;
			const timer = setTimeout(() => {
				connectorStore.getState().loadMcpConnectors();
			}, 1500);
			return () => clearTimeout(timer);
		}, [accountUid]);
		const [networkEnv, setNetworkEnv] = (0, import_react.useState)();
		(0, import_react.useEffect)(() => {
			adapter?.getProductConfig?.().then((cfg) => {
				setNetworkEnv(cfg?.networkEnvironment);
			});
		}, [adapter]);
		const mcpConfigs = useConnectorStore((state) => state.mcpConnectorConfigs);
		const mcpStatesRaw = useConnectorStore((state) => state.mcpConnectorStates);
		const mcpStates = (0, import_react.useMemo)(() => {
			if (!extraConfigs?.length) return mcpStatesRaw;
			const merged = { ...mcpStatesRaw };
			for (const c of extraConfigs) if (!merged[c.id]) merged[c.id] = {
				configId: c.id,
				bound: true,
				enabled: true,
				connected: true
			};
			return merged;
		}, [mcpStatesRaw, extraConfigs]);
		const cancellableMcpIds = useCancellableConnecting(mcpStates);
		const deeplinkPreselectedIds = useDeeplinkPreselectedConnectorIds();
		const prevConnectingIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
		(0, import_react.useEffect)(() => {
			const currentConnectingIds = /* @__PURE__ */ new Set();
			for (const [id, state] of Object.entries(mcpStates)) if (isConnectorPending(state)) currentConnectingIds.add(id);
			for (const id of prevConnectingIdsRef.current) if (!currentConnectingIds.has(id)) {
				const currentState = mcpStates[id];
				if (!shouldEmitFailureToast(currentState, {
					suppressed: consumeMcpAuthTimeoutToastSuppression(id),
					isUserInitiated: peekUserInitiatedConnect(id)
				}).emit) continue;
				const config = mcpConfigs.find((c) => c.id === id);
				if (config) {
					showFirstMcpAuthFailureToast(config.name, getConnectorReasonMessage(currentState));
					clearUserInitiatedConnect(id);
				}
			}
			prevConnectingIdsRef.current = currentConnectingIds;
		}, [
			mcpStates,
			mcpConfigs,
			t
		]);
		const visibleMcpConfigs = (0, import_react.useMemo)(() => {
			const filtered = mcpConfigs.filter((c) => {
				if (isImaConnector(c.id) && !imaConnectorEnabled) return false;
				if (!vpcConnectorPolicy.isConnectorAllowed(c.id)) return false;
				return isConnectorVisible(c.visibleIn, networkEnv, accountInfo?.enterpriseId, accountInfo?.type);
			});
			if (!extraConfigs?.length) return filtered;
			const existing = new Set(filtered.map((c) => c.id));
			const additional = extraConfigs.filter((c) => !existing.has(c.id));
			return [...filtered, ...additional];
		}, [
			mcpConfigs,
			networkEnv,
			accountInfo?.enterpriseId,
			accountInfo?.type,
			imaConnectorEnabled,
			vpcConnectorPolicy,
			extraConfigs
		]);
		const extraConfigIds = (0, import_react.useMemo)(() => new Set(extraConfigs?.map((c) => c.id) ?? []), [extraConfigs]);
		const activeMcpConnectors = (0, import_react.useMemo)(() => visibleMcpConfigs.filter((c) => mcpStates[c.id]?.connected === true || extraConfigIds.has(c.id)), [
			visibleMcpConfigs,
			mcpStates,
			extraConfigIds
		]);
		const sortedMcpConfigs = snapshotMcpConfigs;
		(0, import_react.useEffect)(() => {
			const justOpened = isMenuOpen && !prevMenuOpenRef.current;
			prevMenuOpenRef.current = isMenuOpen;
			if (!justOpened) return;
			connectorStore.getState().loadMcpConnectors();
			const getMcpPriority = (c) => {
				if (extraConfigIds.has(c.id)) return 0;
				if (mcpStates[c.id]?.connected === true) return 0;
				if (mcpStates[c.id]?.bound === true) return 1;
				return 2;
			};
			const sorted = [...visibleMcpConfigs].sort((a, b) => getMcpPriority(a) - getMcpPriority(b));
			const isConnectedSide = (c) => extraConfigIds.has(c.id) || mcpStates[c.id]?.bound === true || mcpStates[c.id]?.connected === true || mcpStates[c.id]?.pending === true;
			const connectedSide = sorted.filter(isConnectedSide);
			const unconnectedSide = sorted.filter((c) => !isConnectedSide(c));
			const limited = connectedSide.length >= 10 ? connectedSide : [...connectedSide, ...unconnectedSide.slice(0, 10 - connectedSide.length)];
			setSnapshotMcpConfigs(limited);
		}, [
			isMenuOpen,
			visibleMcpConfigs,
			mcpStates,
			extraConfigIds
		]);
		const sortedMcpConfigsRef = (0, import_react.useRef)(sortedMcpConfigs);
		sortedMcpConfigsRef.current = sortedMcpConfigs;
		const mcpStatesRef = (0, import_react.useRef)(mcpStates);
		mcpStatesRef.current = mcpStates;
		(0, import_react.useEffect)(() => {
			if (!isMenuOpen || sortedMcpConfigs.length === 0 || !claimConnectorEntryShow("chat_input")) return;
			const totalCount = sortedMcpConfigs.length;
			sortedMcpConfigs.forEach((connector, index) => {
				const isConnected = mcpStates[connector.id]?.connected === true;
				reportEvent(Events.ConnectorEntryShow, {
					entry: "chat_input",
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
			isMenuOpen,
			sortedMcpConfigs,
			mcpStates,
			reportEvent,
			Events
		]);
		/**
		* Issue #33295: 上报 chat_input 入口的连接器点击事件。
		* 覆盖 handleMcpConnect 的所有调用点（开关、首次连接按钮、卡片整体点击）。
		*/
		const reportConnectorClick = (0, import_react.useCallback)((connector) => {
			const list = sortedMcpConfigsRef.current;
			const states = mcpStatesRef.current;
			const position = list.findIndex((c) => c.id === connector.id) + 1;
			const isReconnect = states[connector.id]?.bound === true;
			reportEvent(Events.ConnectorEntryClick, {
				entry: "chat_input",
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
		* Issue #33295: 上报 chat_input 入口的连接结果。
		*/
		const reportConnectorResult = (0, import_react.useCallback)((connector, params) => {
			const errorMessage = params.errorMessage;
			let errorCode;
			if (!params.success) {
				if (errorMessage) {
					const normalized = errorMessage.split(":")[0]?.trim().slice(0, 64);
					errorCode = normalized && normalized.length > 0 ? normalized : "connect_failed";
				} else errorCode = "connect_failed";
			}
			reportEvent(Events.ConnectorAuthResult, {
				entry: "chat_input",
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
		const handleMcpConnect = (0, import_react.useCallback)(async (connector, needsAuth = false) => {
			reportConnectorClick(connector);
			const startTime = Date.now();
			const isReconnect = mcpStatesRef.current[connector.id]?.bound === true;
			if (!needsAuth) {
				if (await connectorStore.getState().autoEnableMcpConnectorToggle(connector.id, "", { silent: true })) {
					toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
					reportConnectorResult(connector, {
						startTime,
						isReconnect,
						success: true
					});
					return;
				}
				if (connectorStore.getState().mcpConnectorStates[connector.id]?.pending === true) return;
			}
			if (requestConnectorNavigation({
				connectorId: connector.id,
				needsAuth,
				onBeforeNavigate: () => {
					setMenuOpen(false);
					markLibraryAuthEntry(connector.id, "chat_input");
				}
			}) !== "unhandled") return;
			markLibraryAuthEntry(connector.id, "chat_input");
			markTokenSchemaAuthEntry(connector.id, "chat_input");
			const result = await connectorStore.getState().connectConnector(connector.id);
			if (result.viaForm) {
				if (result.success) {
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
				if (result.needsAuth && needsAuth && connector.authMode !== "token") toast({
					message: t("connectorPanel.redirectAuth"),
					type: "plain"
				});
				return;
			}
			if (result.success) {
				if (!needsAuth) toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
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
		}, [
			t,
			setMenuOpen,
			reportConnectorClick,
			reportConnectorResult
		]);
		const handleMcpRepair = (0, import_react.useCallback)(async (connector) => {
			reportConnectorClick(connector);
			markLibraryAuthEntry(connector.id, "chat_input");
			markTokenSchemaAuthEntry(connector.id, "chat_input");
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
		}, [reportConnectorClick, t]);
		const handleMcpDisconnect = (0, import_react.useCallback)(async (connector) => {
			const result = await connectorStore.getState().disconnectMcpConnector(connector.id);
			if (!result.success && result.error) toast.error(t("connectorPanel.disconnectError", { error: result.error }));
		}, [t]);
		/**
		* 用户主动取消进行中的 connector 连接（CLI auth / OAuth 等待）。
		* Issue #42056：connecting 状态下点 toggle = 取消，避免干等 5 分钟超时。
		* Issue #70002：用户主动取消是明确的授权失败信号，补上报 auth_result(failed, user_cancelled)。
		* capsule 不维护 pending Map，startTime 取此刻，cost 归零。
		*/
		const handleMcpCancelConnect = (0, import_react.useCallback)(async (connector) => {
			const startTime = Date.now();
			const isReconnect = connectorStore.getState().mcpConnectorStates[connector.id]?.bound === true;
			try {
				const result = await connectorStore.getState().cancelMcpConnector(connector.id);
				if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: connector.name }));
				else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
			} catch (error) {
				console.warn("[ConnectorCenter] cancelMcpConnector failed:", error);
			}
			reportConnectorResult(connector, {
				startTime,
				isReconnect,
				success: false,
				errorMessage: "user_cancelled"
			});
		}, [t, reportConnectorResult]);
		/** 打开有仓库能力（automation_source）的 connector 详情 */
		const handleOpenDetail = (0, import_react.useCallback)(async (connector) => {
			setDetailConnector(connector);
			setDetailRepos(null);
			setDetailLoading(true);
			setMenuOpen(false);
			try {
				const { getFacades } = await __vitePreload(async () => {
					const { getFacades } = await import("./ui-docs-viewer-Bo02yf1Q.js").then((n) => (n.Q(), n.J));
					return { getFacades };
				}, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url);
				const res = await getFacades()?.connector?.getRepoList?.(connector.id);
				const repos = res?.gongfengRepos ?? res?.cnbRepos ?? (res?.githubRepos ? Object.values(res.githubRepos).flat() : []);
				setDetailRepos(repos);
			} catch (err) {
				console.warn("[ConnectorCenter] getRepoList failed:", err);
				setDetailRepos([]);
			} finally {
				setDetailLoading(false);
			}
		}, [setMenuOpen]);
		const totalActiveCount = activeMcpConnectors.length;
		const renderMcpIcon = (connector, size = 16) => {
			if (connector.icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: connector.icon,
				alt: "",
				width: size,
				height: size,
				style: { borderRadius: 3 },
				draggable: false
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "connector-center__mcp-icon-fallback",
				style: {
					width: size,
					height: size,
					fontSize: size * .6
				},
				children: connector.name.charAt(0).toUpperCase()
			});
		};
		const getMcpStatusColor = (status) => {
			switch (status) {
				case "connected": return "#52c41a";
				case "connecting": return "#faad14";
				case "unauthorized": return "#faad14";
				case "error": return "#ff6b6b";
				case "disconnected": return "#8c8c8c";
				default: return "#8c8c8c";
			}
		};
		const getMcpDisplayStatus = (state) => {
			if (isConnectorPending(state)) return "connecting";
			if (state?.reason) return connectorNeedsAuthorize(state) ? "unauthorized" : "error";
			return state?.connected === true ? "connected" : "disconnected";
		};
		const renderMcpAction = (connector) => {
			const isProjectPublicConnector = extraConfigIds.has(connector.id);
			const state = mcpStates[connector.id];
			const bound = state?.bound === true || isProjectPublicConnector;
			const enabled = state?.enabled === true || isProjectPublicConnector;
			const pending = state?.pending === true;
			const connected = state?.connected === true || isProjectPublicConnector;
			const repairing = bound && pending && !!state?.reason;
			const isIncompatible = isConnectorVersionIncompatible(connector);
			if (deeplinkPreselectedIds.has(connector.id) && !connected && !pending && !isIncompatible) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "connector-center__mcp-action-connect connector-center__mcp-action-connect--authorize",
				"data-track-id": "agent_connector_entry_clicked",
				"data-track-name": "连接器入口",
				"data-track-props": JSON.stringify({
					source: connector.id,
					deeplink: true
				}),
				onClick: (e) => {
					e.stopPropagation();
					handleMcpRepair(connector);
				},
				children: t("connectors.authorizeButtonText")
			});
			if (pending && !bound) {
				if (!cancellableMcpIds.has(connector.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "connector-center__mcp-connecting-label",
					children: t("connectorPanel.connecting")
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "connector-center__mcp-connecting-label connector-center__mcp-connecting-label--cancellable",
					onClick: (e) => {
						e.stopPropagation();
						handleMcpCancelConnect(connector);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "connector-center__mcp-connecting-label-text",
						children: t("connectorPanel.connecting")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "connector-center__mcp-connecting-label-cancel",
						children: t("connectorPanel.cancelConnect")
					})]
				});
			}
			if (repairing) {
				const isCancellable = cancellableMcpIds.has(connector.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `connector-center__mcp-connecting-label${isCancellable ? " connector-center__mcp-connecting-label--cancellable" : ""}`,
					onClick: (e) => {
						e.stopPropagation();
						if (isCancellable) handleMcpCancelConnect(connector);
					},
					children: isCancellable ? t("connectorPanel.cancelConnect") : t("connectorPanel.connecting")
				});
			}
			if (isIncompatible && !enabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "connector-center__mcp-toggle connector-center__mcp-toggle--disabled",
				disabled: true,
				onClick: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "connector-center__mcp-toggle-thumb" })
			});
			if (bound) {
				if (enabled || pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "connector-center__mcp-toggle connector-center__mcp-toggle--checked",
					onClick: (e) => {
						e.stopPropagation();
						if (!isProjectPublicConnector) handleMcpDisconnect(connector);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "connector-center__mcp-toggle-thumb" })
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "connector-center__mcp-toggle",
					onClick: (e) => {
						e.stopPropagation();
						handleMcpConnect(connector);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "connector-center__mcp-toggle-thumb" })
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "connector-center__mcp-action-connect",
				"data-track-id": "agent_connector_entry_clicked",
				"data-track-name": "连接器入口",
				"data-track-props": JSON.stringify({ source: connector.id }),
				onClick: (e) => {
					e.stopPropagation();
					handleMcpConnect(connector, true);
				},
				children: t("connectors.connectButtonText")
			});
		};
		const renderConnectorButton = () => {
			if (totalActiveCount === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: buttonRef,
				className: `connector-center__btn connector-center__btn--one${isWorkBuddy() ? " connector-center__btn--wb-empty" : ""}${compact ? " connector-center__btn--compact" : ""}`,
				onClick: handleToggleMenu,
				children: isWorkBuddy() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyConnectorIcon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "connector-center__btn-text",
						children: t("connectors.capsuleTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownArrowIcon, {})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CableIcon, {})
			});
			const iconNodes = [];
			for (const connector of activeMcpConnectors) iconNodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "connector-center__active-icon",
				children: renderMcpIcon(connector, 16)
			}, `mcp-${connector.id}`));
			const MAX_VISIBLE_ICONS = 3;
			const visibleIconNodes = iconNodes.length > MAX_VISIBLE_ICONS ? iconNodes.slice(0, MAX_VISIBLE_ICONS) : iconNodes;
			const overflowCount = iconNodes.length - visibleIconNodes.length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				ref: buttonRef,
				className: `${totalActiveCount === 1 ? "connector-center__btn connector-center__btn--one" : "connector-center__btn connector-center__btn--active"}${compact ? " connector-center__btn--compact" : ""}`,
				onClick: () => setMenuOpen(!isMenuOpen),
				children: [visibleIconNodes, overflowCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "connector-center__overflow-count",
					"aria-label": `+${overflowCount}`,
					children: `+${overflowCount}`
				})]
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConnectorContext.Provider, {
			value: contextValue,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "connector-center",
				children: [renderConnectorButton(), isMenuOpen && menuPortalStyle && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: dropdownRef,
					className: `connector-center__popup-menu connector-center__popup-menu--show connector-center__popup-menu--portal connector-center__popup-menu--${menuPosition} connector-center__popup-menu--align-${menuAlign} connector-center__popup-menu--${locale === "en" ? "en" : "zh"}`,
					style: {
						maxHeight: menuMaxHeight,
						...menuMaxWidth ? { maxWidth: menuMaxWidth } : null,
						...menuPortalStyle
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `connector-center__menu-list-wrapper${isMenuListScrolled ? " connector-center__menu-list-wrapper--has-overflow" : ""}${isMenuListNotAtBottom ? " connector-center__menu-list-wrapper--has-overflow-bottom" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: menuListRef,
								className: "connector-center__menu-list",
								children: sortedMcpConfigs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: sortedMcpConfigs.map((connector) => {
									const mcpState = mcpStates[connector.id];
									const enabled = mcpState?.enabled === true;
									const bound = mcpState?.bound === true;
									const isPending = mcpState?.pending === true;
									const displayStatus = getMcpDisplayStatus(mcpState);
									const isIncompatible = isConnectorVersionIncompatible(connector);
									const incompatLabel = getConnectorVersionIncompatibilityLabel(connector);
									const canInteract = !isPending && (!isIncompatible || enabled);
									const hasRepoCapability = Array.isArray(connector.capabilities) && connector.capabilities.includes("code_repo");
									const item = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `connector-center__mcp-item${isIncompatible ? " connector-center__mcp-item--incompatible" : ""}`,
										style: canInteract ? { cursor: "pointer" } : { cursor: "not-allowed" },
										onClick: () => {
											if (!canInteract) return;
											if (hasRepoCapability && mcpState?.connected === true) {
												handleOpenDetail(connector);
												return;
											}
											if (enabled) {
												if (!extraConfigIds.has(connector.id)) handleMcpDisconnect(connector);
											} else handleMcpConnect(connector, !bound);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "connector-center__mcp-item-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "connector-center__mcp-item-icon",
													children: renderMcpIcon(connector, 20)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "connector-center__mcp-item-name",
													children: connector.name
												}),
												displayStatus !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `connector-center__mcp-status-dot${displayStatus === "connecting" ? " connector-center__mcp-status-dot--connecting" : ""}`,
													style: { backgroundColor: getMcpStatusColor(displayStatus) }
												})
											]
										}), renderMcpAction(connector)]
									}, connector.id);
									return isIncompatible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: incompatLabel,
										placement: "top",
										children: item
									}, connector.id) : item;
								}) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "connector-center__menu-divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "connector-center__menu-item",
							onClick: () => {
								setMenuOpen(false);
								navigate("/connectors");
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "connector-center__menu-item-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsIcon, {}), t("connectors.manage")]
							})
						})
					]
				}), document.body)]
			}), detailConnector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "connector-center__detail-overlay",
				onClick: () => setDetailConnector(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connector-center__detail-panel",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "connector-center__detail-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: detailConnector.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDetailConnector(null),
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connector-center__detail-body",
						children: [
							detailLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "var(--cb-text-secondary)" },
								children: t("common.loading")
							}),
							!detailLoading && detailRepos && detailRepos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "var(--cb-text-secondary)" },
								children: t("connectors.noAuthorizedRepos")
							}),
							!detailLoading && detailRepos && detailRepos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "connector-center__detail-repo-list",
								children: detailRepos.map((repo, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "connector-center__detail-repo-item",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: repo.name || repo.path_with_namespace || repo.web_url })
								}, repo.name || idx))
							})
						]
					})]
				})
			})]
		});
	};
}));
//#endregion
__esmMin((() => {
	init_connector_capsule$1();
}))();
export { ConnectorCapsule as ConnectorCenter };
